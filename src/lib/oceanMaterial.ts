import * as THREE from 'three';
import type { WaveComponent } from './spectrum';
import { clamp } from './math';
import { makeMicroNormalSet } from './microNormals';

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
      // Attach uniforms
      shader.uniforms.u_time = this.uniforms.u_time;
      shader.uniforms.u_origin = this.uniforms.u_origin;
      shader.uniforms.u_current = this.uniforms.u_current;
      shader.uniforms.u_tideHeight = this.uniforms.u_tideHeight;
      shader.uniforms.u_waveA = this.uniforms.u_waveA;
      shader.uniforms.u_waveB = this.uniforms.u_waveB;
      shader.uniforms.u_foamIntensity = this.uniforms.u_foamIntensity;
      shader.uniforms.u_foamSlopeStart = this.uniforms.u_foamSlopeStart;
      shader.uniforms.u_foamSlopeEnd = this.uniforms.u_foamSlopeEnd;
      shader.uniforms.u_waterClarity = this.uniforms.u_waterClarity;

      shader.uniforms.u_sunDir = this.uniforms.u_sunDir;
      shader.uniforms.u_sunColor = this.uniforms.u_sunColor;
      shader.uniforms.u_sunIntensity = this.uniforms.u_sunIntensity;

      shader.uniforms.u_reflectionMap = this.uniforms.u_reflectionMap;
      shader.uniforms.u_reflectionMatrix = this.uniforms.u_reflectionMatrix;
      shader.uniforms.u_reflectionStrength = this.uniforms.u_reflectionStrength;

      shader.uniforms.u_reflectionTexel = this.uniforms.u_reflectionTexel;
      shader.uniforms.u_reflectionBlur = this.uniforms.u_reflectionBlur;
      shader.uniforms.u_reflectionEdgeFade = this.uniforms.u_reflectionEdgeFade;

      shader.uniforms.u_foamMap = this.uniforms.u_foamMap;
      shader.uniforms.u_foamCenter = this.uniforms.u_foamCenter;
      shader.uniforms.u_foamWorldSize = this.uniforms.u_foamWorldSize;

      shader.uniforms.u_wind = this.uniforms.u_wind;
      shader.uniforms.u_microNormal1 = this.uniforms.u_microNormal1;
      shader.uniforms.u_microNormal2 = this.uniforms.u_microNormal2;
      shader.uniforms.u_microScale1 = this.uniforms.u_microScale1;
      shader.uniforms.u_microScale2 = this.uniforms.u_microScale2;
      shader.uniforms.u_microStrength = this.uniforms.u_microStrength;
      shader.uniforms.u_microFadeNear = this.uniforms.u_microFadeNear;
      shader.uniforms.u_microFadeFar = this.uniforms.u_microFadeFar;

      // Add varyings
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `#include <common>
        varying float vFoam;
        varying vec2 vWorldXZ;
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;

        varying vec4 vReflProj;

        uniform float u_time;
        uniform vec2 u_origin;
        uniform vec2 u_current;
        uniform float u_tideHeight;
        uniform mat4 u_reflectionMatrix;
        uniform vec4 u_waveA[${MAX_WAVES}];
        uniform vec4 u_waveB[${MAX_WAVES}];
        uniform float u_foamSlopeStart;
        uniform float u_foamSlopeEnd;`
      );

      // Inject displacement + normal override after begin_vertex
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        // Ocean Gerstner displacement in object space, driven by world-XZ (origin + local XZ)
        vec2 worldXZ = transformed.xz + u_origin;
        vWorldXZ = worldXZ;

        vec3 disp = vec3(0.0);
        float dxdx = 0.0;
        float dxdz = 0.0;
        float dzdx = 0.0;
        float dzdz = 0.0;
        float dydx = 0.0;
        float dydz = 0.0;

        for (int i = 0; i < ${MAX_WAVES}; i++) {
          vec2 dir = normalize(u_waveA[i].xy);
          float A = u_waveA[i].z;
          float k = u_waveA[i].w;
          float omega = u_waveB[i].x;
          float phase0 = u_waveB[i].y;
          float Q = u_waveB[i].z;

          float w = omega + k * dot(dir, u_current);
          float theta = k * dot(dir, worldXZ) - w * u_time + phase0;

          float s = sin(theta);
          float c = cos(theta);

          disp.y += A * s;
          disp.xz += dir * (Q * A * c);

          float WAk = Q * A * k;

          dxdx += -dir.x * dir.x * WAk * s;
          dxdz += -dir.x * dir.y * WAk * s;
          dzdx += -dir.y * dir.x * WAk * s;
          dzdz += -dir.y * dir.y * WAk * s;

          dydx += A * k * dir.x * c;
          dydz += A * k * dir.y * c;
        }

        transformed.xyz += disp;
        transformed.y += u_tideHeight;

        // Surface normal from analytic partial derivatives (object space)
        vec3 T = vec3(1.0 + dxdx, dydx, dzdx);
        vec3 B = vec3(dxdz, dydz, 1.0 + dzdz);
        vec3 n = normalize(cross(B, T));

        // Override vNormal (view space)
        vNormal = normalize(normalMatrix * n);

        // Also keep world normal + world pos for custom glint/shading
        vWorldNormal = normalize(mat3(modelMatrix) * n);
        vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;

        // World -> reflection UV projection (planar reflection RT)
        vReflProj = u_reflectionMatrix * vec4(vWorldPos, 1.0);

        float slope = 1.0 - n.y;
        float foamSlope = smoothstep(u_foamSlopeStart, u_foamSlopeEnd, slope);
        float foamCrest = smoothstep(0.0, 0.25, disp.y);
        vFoam = foamSlope * foamCrest;`
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `#include <common>
        varying float vFoam;
        varying vec2 vWorldXZ;
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;
        varying vec4 vReflProj;

        uniform float u_foamIntensity;
        uniform float u_time;
        uniform vec2 u_current;
        uniform float u_waterClarity;

        uniform sampler2D u_reflectionMap;
        uniform float u_reflectionStrength;
        uniform vec2 u_reflectionTexel;
        uniform float u_reflectionBlur;
        uniform float u_reflectionEdgeFade;

        uniform sampler2D u_foamMap;
        uniform vec2 u_foamCenter;
        uniform float u_foamWorldSize;

        uniform vec2 u_wind;
        uniform sampler2D u_microNormal1;
        uniform sampler2D u_microNormal2;
        uniform float u_microScale1;
        uniform float u_microScale2;
        uniform float u_microStrength;
        uniform float u_microFadeNear;
        uniform float u_microFadeFar;

        // World normal after micro-normal perturbation (written in normal pass).
        vec3 gWorldNormal;

        uniform vec3 u_sunDir;
        uniform vec3 u_sunColor;
        uniform float u_sunIntensity;`
      );

      // Milestone #3: micro normal injection. We perturb the view-space `normal` used by
      // the built-in PBR lighting pipeline, and also write a world-space version to
      // `gWorldNormal` for our custom planar reflection + sunglint logic.
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <normal_fragment_maps>',
        `#include <normal_fragment_maps>
        // --- Micro normals (capillary/wind ripples) ---
        vec3 NmacroW = normalize(vWorldNormal);

        // Wind-aligned coordinate frame (prevents obvious axis-aligned tiling).
        vec2 windV = u_wind;
        float windLen = length(windV);
        vec2 wDir = windLen > 1e-6 ? (windV / windLen) : vec2(1.0, 0.0);
        vec2 wPerp = vec2(-wDir.y, wDir.x);

        // Flow field for micro detail: mostly wind drift, a bit of surface current.
        vec2 flow = u_current * 0.18 + windV * 0.02;
        vec2 wpos = vWorldXZ + flow * u_time;
        vec2 p = vec2(dot(wpos, wDir), dot(wpos, wPerp));

        // Slight anisotropy suggests wind streaking.
        vec2 uv1 = vec2(p.x * u_microScale1 * 1.20, p.y * u_microScale1 * 0.70);
        vec2 uv2 = vec2(p.x * u_microScale2 * 0.85, p.y * u_microScale2 * 1.10) + vec2(31.7, -15.2);

        vec3 n1 = texture2D(u_microNormal1, uv1).xyz * 2.0 - 1.0;
        vec3 n2 = texture2D(u_microNormal2, uv2).xyz * 2.0 - 1.0;
        vec3 nTS = normalize(mix(n1, n2, 0.55));

        // Basis around macro normal (world space).
        vec3 up = vec3(0.0, 1.0, 0.0);
        vec3 T = cross(up, NmacroW);
        float t2 = dot(T, T);
        T = (t2 > 1e-8) ? normalize(T) : vec3(1.0, 0.0, 0.0);
        vec3 B = normalize(cross(NmacroW, T));

        vec3 NmicroW = normalize(T * nTS.x + B * nTS.y + NmacroW * nTS.z);

        // Fade micro detail with distance to prevent shimmering.
        float distXZ = length(cameraPosition.xz - vWorldPos.xz);
        float microFade = 1.0 - smoothstep(u_microFadeNear, u_microFadeFar, distXZ);
        float microAmt = clamp(u_microStrength, 0.0, 1.0) * microFade;

        // Wave slope-foam dampens micro facets (helps keep sunset highlight stable).
        microAmt *= (1.0 - clamp(vFoam, 0.0, 1.0) * 0.55);

        vec3 NfinalW = normalize(mix(NmacroW, NmicroW, microAmt));
        gWorldNormal = NfinalW;

        // Feed view-space normal back into the PBR lighting pipeline.
        normal = normalize(mat3(viewMatrix) * NfinalW);
        `
      );

      // Water tint / absorption + custom sunset glint.
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <opaque_fragment>',
        `// --- Foam (instantaneous + persistent field) ---
        float foamInstant = clamp(vFoam, 0.0, 1.0);

        vec2 fuv = (vWorldXZ - u_foamCenter) / max(1e-6, u_foamWorldSize) + vec2(0.5);
        float inFoam = step(0.0, fuv.x) * step(0.0, fuv.y) * step(fuv.x, 1.0) * step(fuv.y, 1.0);
        float foamPersist = texture2D(u_foamMap, fuv).r * inFoam;
        foamPersist = pow(clamp(foamPersist, 0.0, 1.0), 1.15);

        float foam = clamp((foamInstant * 0.55 + foamPersist * 1.10) * u_foamIntensity, 0.0, 1.0);

        // --- Water transmission tint (cheap absorption) ---
        float viewDist = length(vViewPosition);
        float absorb = mix(0.00052, 0.00018, clamp(u_waterClarity, 0.0, 1.0));
        float att = exp(-absorb * viewDist);
        vec3 deep = vec3(0.02, 0.10, 0.18);
        vec3 green = vec3(0.02, 0.19, 0.17);
        vec3 tint = mix(green, deep, clamp(u_waterClarity, 0.0, 1.0));
        outgoingLight = mix(tint, outgoingLight, clamp(0.50 + 0.50 * att, 0.0, 1.0));

        // --- Planar reflection (stable horizon/sky/objects) ---
        // Use the *macro* normal for the reflection UV distortion so it stays stable.
        vec3 Nmacro = normalize(vWorldNormal);
        // Use the micro-perturbed normal for small-facet sunglint.
        vec3 N = normalize(gWorldNormal);

        vec3 V = normalize(cameraPosition - vWorldPos);
        float ndvRaw = dot(Nmacro, V);
        float viewAbove = step(0.0, ndvRaw);
        float ndv = max(ndvRaw, 0.0);

        vec2 ruv = vReflProj.xy / max(vReflProj.w, 1e-6);
        // Subtle distortion from macro wave normal (kept small to avoid shimmer).
        ruv += Nmacro.xz * (0.03 + 0.02 * (1.0 - clamp(u_waterClarity, 0.0, 1.0))) * (1.0 - foam * 0.75);

        // Soft edge fade to prevent hard popping when the proj rect clips.
        float e = max(u_reflectionEdgeFade, 0.0001);
        float inBounds =
          smoothstep(0.0, e, ruv.x) * smoothstep(0.0, e, ruv.y) *
          (1.0 - smoothstep(1.0 - e, 1.0, ruv.x)) *
          (1.0 - smoothstep(1.0 - e, 1.0, ruv.y));

        vec3 reflCol = texture2D(u_reflectionMap, ruv).rgb;
        // Roughness-aware blur fallback (cheap 5-tap). Only enabled on High/Max.
        if (u_reflectionBlur > 0.001) {
          vec2 off = u_reflectionTexel * u_reflectionBlur;
          vec3 s1 = texture2D(u_reflectionMap, ruv + vec2(off.x, 0.0)).rgb;
          vec3 s2 = texture2D(u_reflectionMap, ruv - vec2(off.x, 0.0)).rgb;
          vec3 s3 = texture2D(u_reflectionMap, ruv + vec2(0.0, off.y)).rgb;
          vec3 s4 = texture2D(u_reflectionMap, ruv - vec2(0.0, off.y)).rgb;
          reflCol = reflCol * 0.40 + (s1 + s2 + s3 + s4) * 0.15;
        }

        // Water Fresnel (Schlick, F0 ~ 0.02 for IOR~1.33)
        float F0 = 0.020;
        float fresW = F0 + (1.0 - F0) * pow(1.0 - ndv, 5.0);

        float reflAmt = clamp(u_reflectionStrength, 0.0, 1.25) * fresW;
        reflAmt *= inBounds * viewAbove;
        // Foam kills coherent mirror reflection.
        reflAmt *= (1.0 - foam * 0.88);

        // Fresnel mix: grazing -> reflection dominates.
        outgoingLight = mix(outgoingLight, reflCol, clamp(reflAmt, 0.0, 1.0));

        // --- Foam (whitens crests) ---
        outgoingLight = mix(outgoingLight, vec3(1.0), foam * 0.95);

        // --- Sunset sunglint path (highlight spice) ---
        vec3 L = normalize(u_sunDir);

        // Use micro normals only partially so the "golden path" stays coherent.
        vec3 Ngl = normalize(mix(Nmacro, N, 0.85));

        vec3 R = reflect(-L, Ngl);
        float rv = max(dot(R, V), 0.0);

        float fres = pow(1.0 - ndv, 5.0);

        // Sharper when sun is low on the horizon
        float sunLow = clamp(1.0 - abs(L.y) * 2.2, 0.0, 1.0);
        float gloss = mix(180.0, 720.0, sunLow);
        float spec = pow(rv, gloss);

        // Foam reduces mirror glint
        spec *= mix(1.0, 0.30, foam);

        // Reduce glint slightly when planar reflection is already strong.
        float glintGate = mix(1.0, 0.55, clamp(reflAmt, 0.0, 1.0));

        // Final glint contribution
        vec3 sunCol = u_sunColor;
        outgoingLight += sunCol * (u_sunIntensity * 1.15) * spec * (0.30 + 0.70 * fres) * glintGate * viewAbove;

        // --- Underside surface glow (when the camera is underwater) ---
        // We don't attempt true refraction here (too heavy for mobile), but we do
        // add a physically-plausible "sun patch" and grazing sheen so the surface
        // reads correctly from below.
        float viewBelow = 1.0 - viewAbove;
        if (viewBelow > 0.5) {
          // Spec-like hotspot from the sun reflection direction.
          float rvUnder = max(dot(R, V), 0.0);
          float glossUnder = mix(120.0, 220.0, sunLow);
          float specUnder = pow(rvUnder, glossUnder);

          // A broader forward-scatter-ish glow when looking up.
          float upGlow = pow(max(dot(Nmacro, L), 0.0), 10.0);

          float underAmt = (specUnder * 0.55 + upGlow * 0.18) * u_sunIntensity;
          // Foam kills coherent highlights even from below.
          underAmt *= mix(1.0, 0.35, foam);

          // Slightly water-filtered (less saturated) sun color.
          vec3 sunW = mix(vec3(0.12, 0.24, 0.30), sunCol, 0.72);
          outgoingLight += sunW * underAmt;

          // Grazing sheen from below (total internal reflection vibe).
          float ndvUnder = clamp(-ndvRaw, 0.0, 1.0);
          float fresUnder = F0 + (1.0 - F0) * pow(1.0 - ndvUnder, 5.0);
          outgoingLight += sunW * fresUnder * u_sunIntensity * 0.08 * (1.0 - foam * 0.7);
        }

        #include <opaque_fragment>`
      );

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
