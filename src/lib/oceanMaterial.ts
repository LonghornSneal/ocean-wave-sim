import * as THREE from 'three';
import type { WaveComponent } from './spectrum';
import { clamp } from './math';
import { makeMicroNormalSet } from './microNormals';
import { applyOceanMaterialShader } from './oceanMaterialShader';

export const MAX_WAVES = 32;

export interface OceanMaterialParams {
  /** Base water color (deep water). */
  waterColor: THREE.ColorRepresentation;
  /** Foam intensity (0..2). */
  foamIntensity: number;
  /** Foam slope start/end (controls how steep before foam appears). */
  foamSlopeStart: number;
  foamSlopeEnd: number;

  /** Initial wave list. */
  waves: WaveComponent[];
}

export interface OceanUniforms {
  u_time: { value: number };
  u_origin: { value: THREE.Vector2 };
  u_current: { value: THREE.Vector2 };
  u_tideHeight: { value: number };

  u_waveA: { value: THREE.Vector4[] };
  u_waveB: { value: THREE.Vector4[] };

  u_foamIntensity: { value: number };
  u_foamSlopeStart: { value: number };
  u_foamSlopeEnd: { value: number };

  /** 0..1 (0=turbid/greenish, 1=clear/blue). */
  u_waterClarity: { value: number };

  /** Sun direction in world space (points *toward* the sun). */
  u_sunDir: { value: THREE.Vector3 };
  /** Sun color (warm at sunset). */
  u_sunColor: { value: THREE.Color };
  /** 0..1 visibility/intensity factor for sun glint. */
  u_sunIntensity: { value: number };

  /** Planar reflection map (mirror camera RT). */
  u_reflectionMap: { value: THREE.Texture };
  /** World -> reflection UV projection matrix (bias * proj * view). */
  u_reflectionMatrix: { value: THREE.Matrix4 };
  /** 0..1 overall strength multiplier (Fresnel still applied in shader). */
  u_reflectionStrength: { value: number };

  /** Reflection texture texel size (1/px). */
  u_reflectionTexel: { value: THREE.Vector2 };
  /** Simple blur radius in texels (roughness-aware fallback). */
  u_reflectionBlur: { value: number };
  /** Edge fade in UV space (prevents hard pops when projection goes out of bounds). */
  u_reflectionEdgeFade: { value: number };

  /** Persistent foam field (ping-pong sim). */
  u_foamMap: { value: THREE.Texture };
  /** World-space XZ center of the foam map window. */
  u_foamCenter: { value: THREE.Vector2 };
  /** World-space coverage size of the foam map (meters). */
  u_foamWorldSize: { value: number };

  /** Wind velocity at sea surface (XZ, m/s). Used for micro ripples / capillary waves. */
  u_wind: { value: THREE.Vector2 };

  /** Micro normal textures (tileable). */
  u_microNormal1: { value: THREE.Texture };
  u_microNormal2: { value: THREE.Texture };

  /** Micro normal sampling scales (1/m). */
  u_microScale1: { value: number };
  u_microScale2: { value: number };

  /** 0..1-ish strength of micro normal influence (faded by distance). */
  u_microStrength: { value: number };
  /** Distance fade in meters. */
  u_microFadeNear: { value: number };
  u_microFadeFar: { value: number };
}

// 1x1 black fallback so the shader always has a valid sampler.
const FALLBACK_REFLECTION_TEX: THREE.DataTexture = (() => {
  const t = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1);
  t.needsUpdate = true;
  t.flipY = false;
  t.colorSpace = THREE.LinearSRGBColorSpace;
  t.minFilter = THREE.LinearFilter;
  t.magFilter = THREE.LinearFilter;
  return t;
})();

// 1x1 black fallback for foam.
const FALLBACK_FOAM_TEX: THREE.DataTexture = (() => {
  const t = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1);
  t.needsUpdate = true;
  t.flipY = false;
  t.colorSpace = THREE.LinearSRGBColorSpace;
  t.minFilter = THREE.LinearFilter;
  t.magFilter = THREE.LinearFilter;
  return t;
})();

// 1x1 flat normal fallback (0.5,0.5,1.0).
const FALLBACK_NORMAL_TEX: THREE.DataTexture = (() => {
  const t = new THREE.DataTexture(new Uint8Array([128, 128, 255, 255]), 1, 1);
  t.needsUpdate = true;
  t.flipY = false;
  // Normal maps should not be color-managed.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  t.colorSpace = ((THREE as any).NoColorSpace ?? THREE.LinearSRGBColorSpace) as any;
  t.minFilter = THREE.LinearFilter;
  t.magFilter = THREE.LinearFilter;
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  return t;
})();

// Generate micro normal textures once (module scope) to avoid per-instance allocations.
const MICRO_NORMALS = makeMicroNormalSet();

export class OceanMaterial {
  public readonly material: THREE.MeshPhysicalMaterial;
  private shader: THREE.Shader | null = null;
  public readonly uniforms: OceanUniforms;

  constructor(params: OceanMaterialParams) {
    // Prepare fixed-size arrays
    const waveA: THREE.Vector4[] = [];
    const waveB: THREE.Vector4[] = [];
    for (let i = 0; i < MAX_WAVES; i++) {
      waveA.push(new THREE.Vector4(1, 0, 0, 1)); // dirX, dirZ, A, k
      waveB.push(new THREE.Vector4(0, 0, 0, 0)); // omega, phase, Q, unused
    }

    this.uniforms = {
      u_time: { value: 0 },
      u_origin: { value: new THREE.Vector2(0, 0) },
      u_current: { value: new THREE.Vector2(0, 0) },
      u_tideHeight: { value: 0 },
      u_waveA: { value: waveA },
      u_waveB: { value: waveB },

      u_foamIntensity: { value: params.foamIntensity },
      u_foamSlopeStart: { value: params.foamSlopeStart },
      u_foamSlopeEnd: { value: params.foamSlopeEnd },

      u_waterClarity: { value: 0.7 },

      u_sunDir: { value: new THREE.Vector3(0.0, 1.0, 0.0) },
      u_sunColor: { value: new THREE.Color('#ffffff') },
      u_sunIntensity: { value: 1.0 },

      u_reflectionMap: { value: FALLBACK_REFLECTION_TEX },
      u_reflectionMatrix: { value: new THREE.Matrix4() },
      u_reflectionStrength: { value: 0.0 },

      u_reflectionTexel: { value: new THREE.Vector2(1, 1) },
      u_reflectionBlur: { value: 0.0 },
      u_reflectionEdgeFade: { value: 0.03 },

      u_foamMap: { value: FALLBACK_FOAM_TEX },
      u_foamCenter: { value: new THREE.Vector2(0, 0) },
      u_foamWorldSize: { value: 240.0 },

      // Milestone #3: micro-normal detail (ripples / capillary)
      u_wind: { value: new THREE.Vector2(0, 0) },

      u_microNormal1: { value: MICRO_NORMALS.ripples },
      u_microNormal2: { value: MICRO_NORMALS.capillary },

      // World-space sampling scales (1/m). Values are tuned for meter-scale world units.
      u_microScale1: { value: 0.28 },
      u_microScale2: { value: 0.85 },

      // Final mix strength (also faded by distance in shader).
      u_microStrength: { value: 0.08 },
      u_microFadeNear: { value: 70.0 },
      u_microFadeFar: { value: 320.0 }
    };

    // Physical water baseline. We add a custom sun-glint term in the shader for that
    // "golden path" reflection at sunset.
    this.material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(params.waterColor),
      roughness: 0.045,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      envMapIntensity: 1.25,
      ior: 1.333,
      reflectivity: 0.78
    });

    // Needed for underwater view.
    this.material.side = THREE.DoubleSide;

    // Assign initial wave data
    this.setWaves(params.waves);

    this.material.onBeforeCompile = (shader: THREE.Shader) => {
      applyOceanMaterialShader(shader, this.uniforms, MAX_WAVES);
      this.shader = shader;
    };

    this.material.customProgramCacheKey = () => 'OceanMaterial_v6_underwater_glow';

    this.setWaves(params.waves);
  }

  /**
   * Hard-assign a new wave list (also triggers shader recompile). Use rarely (e.g. when waveCount changes).
   */
  public setWaves(waves: WaveComponent[]): void {
    this.writeWaves(waves);
    this.material.needsUpdate = true;
  }

  /**
   * Update the wave uniform arrays in-place (no recompile). Safe to call every frame.
   */
  public writeWaves(waves: WaveComponent[]): void {
    const N = Math.min(waves.length, MAX_WAVES);
    for (let i = 0; i < MAX_WAVES; i++) {
      if (i < N) {
        const w = waves[i];
        this.uniforms.u_waveA.value[i].set(w.dirX, w.dirZ, w.A, w.k);
        this.uniforms.u_waveB.value[i].set(w.omega, w.phase, w.Q, 0);
      } else {
        this.uniforms.u_waveA.value[i].set(1, 0, 0, 1);
        this.uniforms.u_waveB.value[i].set(0, 0, 0, 0);
      }
    }
  }

  public update(dt_s: number, opts: {
    time_s: number;
    originXZ: THREE.Vector2;
    currentXZ: THREE.Vector2;
    tideHeight_m: number;
    waterClarity: number;
    foamIntensity: number;
    foamSlopeStart: number;
    foamSlopeEnd: number;

    // Milestone #3: micro normals
    windXZ: THREE.Vector2;
    microStrength: number;
    microFadeNear_m: number;
    microFadeFar_m: number;

    sunDir: THREE.Vector3;
    sunColor: THREE.Color;
    sunIntensity: number;
  }): void {
    this.uniforms.u_time.value = opts.time_s;
    this.uniforms.u_origin.value.copy(opts.originXZ);
    this.uniforms.u_current.value.copy(opts.currentXZ);
    this.uniforms.u_tideHeight.value = opts.tideHeight_m;

    this.uniforms.u_waterClarity.value = clamp(opts.waterClarity, 0, 1);

    this.uniforms.u_foamIntensity.value = clamp(opts.foamIntensity, 0, 3);
    this.uniforms.u_foamSlopeStart.value = clamp(opts.foamSlopeStart, 0, 2);
    this.uniforms.u_foamSlopeEnd.value = clamp(opts.foamSlopeEnd, 0, 2);

    // Micro normals: set wind and tuned strength / fade distances.
    this.uniforms.u_wind.value.copy(opts.windXZ);
    this.uniforms.u_microStrength.value = clamp(opts.microStrength, 0.0, 0.35);
    this.uniforms.u_microFadeNear.value = Math.max(1.0, opts.microFadeNear_m);
    this.uniforms.u_microFadeFar.value = Math.max(this.uniforms.u_microFadeNear.value + 1.0, opts.microFadeFar_m);

    this.uniforms.u_sunDir.value.copy(opts.sunDir).normalize();
    this.uniforms.u_sunColor.value.copy(opts.sunColor);
    this.uniforms.u_sunIntensity.value = clamp(opts.sunIntensity, 0, 1.5);

    // dt_s reserved for future temporal smoothing.
    void dt_s;

    if (this.shader) {
      // uniforms are referenced by pointer; nothing else required
    }
  }

  /**
   * Bind a planar reflection texture + matrix. Call whenever (re)creating the reflection system.
   * The matrix object can be updated in-place each frame (recommended).
   */
  public bindPlanarReflection(texture: THREE.Texture | null, textureMatrix: THREE.Matrix4 | null): void {
    this.uniforms.u_reflectionMap.value = texture ?? FALLBACK_REFLECTION_TEX;
    this.uniforms.u_reflectionMatrix.value = textureMatrix ?? new THREE.Matrix4();
  }

  /** Set reflection strength (0..1-ish). Fresnel is still applied in shader. */
  public setPlanarReflectionStrength(strength: number): void {
    this.uniforms.u_reflectionStrength.value = clamp(strength, 0, 1.25);
  }

  /**
   * Reflection sampling controls:
   * - texel: 1/RT size (used for cheap blur)
   * - blur: blur radius in texels
   * - edgeFade: UV fade width (prevents hard clipping pops)
   */
  public setPlanarReflectionSampling(opts: { texel?: number | THREE.Vector2; blur?: number; edgeFade?: number }): void {
    if (opts.texel !== undefined) {
      if (typeof opts.texel === 'number') {
        const t = Math.max(1e-6, opts.texel);
        this.uniforms.u_reflectionTexel.value.set(t, t);
      } else {
        this.uniforms.u_reflectionTexel.value.copy(opts.texel);
      }
    }
    if (opts.blur !== undefined) {
      this.uniforms.u_reflectionBlur.value = Math.max(0, opts.blur);
    }
    if (opts.edgeFade !== undefined) {
      this.uniforms.u_reflectionEdgeFade.value = clamp(opts.edgeFade, 0.0, 0.25);
    }
  }

  /** Bind a persistent foam texture (sim RT). */
  public bindFoamMap(texture: THREE.Texture | null): void {
    this.uniforms.u_foamMap.value = texture ?? FALLBACK_FOAM_TEX;
  }

  /** Update foam map sampling transform (world-space). */
  public setFoamFieldTransform(centerXZ: THREE.Vector2, worldSize_m: number): void {
    this.uniforms.u_foamCenter.value.copy(centerXZ);
    this.uniforms.u_foamWorldSize.value = Math.max(1e-3, worldSize_m);
  }
}
