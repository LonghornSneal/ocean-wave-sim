import * as THREE from 'three';
import type { WaveComponent } from './spectrum';
import { clamp, lerp } from './math';

// The ocean shader can run up to 32 Gerstner components, but the foam field only
// needs a subset to produce believable breaking patterns at a much lower cost.
const MAX_WAVES = 24;

export interface FoamFieldOptions {
  /** Render-target resolution (e.g. 256..512). */
  size: number;
  /** World-space coverage of the foam field (meters). */
  worldSize_m: number;
}

export interface FoamFieldUpdateOptions {
  dt_s: number;
  time_s: number;
  /** Desired center of the foam field in world XZ coordinates. */
  centerXZ: THREE.Vector2;
  waves: WaveComponent[];
  /** Same surface current used in the ocean shader (m/s). */
  currentXZ: THREE.Vector2;
  /** Wind direction (toward) in radians. */
  windDirTo_rad: number;
  windSpeed_mps: number;
  /** 0..1 */
  storminess: number;

  /** Optional wake injection (otter). */
  wakePosXZ?: THREE.Vector2;
  wakeDirXZ?: THREE.Vector2;
  wakeStrength?: number; // 0..1-ish
}

/**
 * Ping-pong persistent foam simulation (milestone #2).
 *
 * What it does:
 * - semi-Lagrangian advection by a simple surface flow (current + wind drift)
 * - exponential decay (dissipation)
 * - injection where waves are steep and cresting
 * - optional extra injection for a small wake around the otter
 */
export class FoamField {
  public readonly centerXZ = new THREE.Vector2(0, 0);
  public worldSize_m: number;

  private rtA: THREE.WebGLRenderTarget;
  private rtB: THREE.WebGLRenderTarget;
  private pingIsA = true;

  private readonly simScene = new THREE.Scene();
  private readonly simCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private readonly quad: THREE.Mesh;

  private readonly uniforms: Record<string, { value: any }>;
  private readonly mat: THREE.ShaderMaterial;

  private readonly tmpDelta = new THREE.Vector2();
  private readonly tmpFlow = new THREE.Vector2();
  private readonly tmpWind = new THREE.Vector2();
  private readonly tmpWakePos = new THREE.Vector2();
  private readonly tmpWakeDir = new THREE.Vector2(0, 1);

  constructor(renderer: THREE.WebGLRenderer, opts: FoamFieldOptions) {
    const size = Math.max(64, Math.floor(opts.size));
    this.worldSize_m = Math.max(20, opts.worldSize_m);

    const canFloatRT =
      !!renderer.extensions.get('EXT_color_buffer_float') ||
      !!renderer.extensions.get('EXT_color_buffer_half_float');
    const type = canFloatRT ? THREE.HalfFloatType : THREE.UnsignedByteType;

    const makeRT = (): THREE.WebGLRenderTarget => {
      const rt = new THREE.WebGLRenderTarget(size, size, {
        format: THREE.RGBAFormat,
        type,
        depthBuffer: false,
        stencilBuffer: false,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter
      });
      rt.texture.name = 'FoamFieldRT';
      rt.texture.flipY = false;
      rt.texture.colorSpace = THREE.LinearSRGBColorSpace;
      rt.texture.generateMipmaps = false;
      rt.texture.wrapS = THREE.ClampToEdgeWrapping;
      rt.texture.wrapT = THREE.ClampToEdgeWrapping;
      return rt;
    };

    this.rtA = makeRT();
    this.rtB = makeRT();

    // Uniform arrays sized to MAX_WAVES to match the ocean material.
    const waveA: THREE.Vector4[] = [];
    const waveB: THREE.Vector4[] = [];
    for (let i = 0; i < MAX_WAVES; i++) {
      waveA.push(new THREE.Vector4(1, 0, 0, 1));
      waveB.push(new THREE.Vector4(0, 0, 0, 0));
    }

    this.uniforms = {
      u_prev: { value: this.rtA.texture },
      u_dt: { value: 0.016 },
      u_time: { value: 0 },
      u_worldSize: { value: this.worldSize_m },
      u_center: { value: new THREE.Vector2(0, 0) },
      u_recenterDeltaUV: { value: new THREE.Vector2(0, 0) },
      u_texel: { value: new THREE.Vector2(1 / size, 1 / size) },

      u_flow: { value: new THREE.Vector2(0, 0) },
      u_current: { value: new THREE.Vector2(0, 0) },

      // Injection/decay tuning (set per-frame based on weather)
      u_injectStrength: { value: 0.5 },
      u_decay: { value: 0.06 },
      u_slopeStart: { value: 0.26 },
      u_slopeEnd: { value: 0.52 },
      u_crestStart: { value: 0.18 },
      u_crestEnd: { value: 0.72 },

      // Optional wake injection (otter)
      u_wakePos: { value: new THREE.Vector2(0, 0) },
      u_wakeDir: { value: new THREE.Vector2(0, 1) },
      u_wakeStrength: { value: 0.0 },
      u_wakeRadius: { value: 1.6 },
      u_wakeLength: { value: 4.6 },

      u_waveA: { value: waveA },
      u_waveB: { value: waveB }
    };

    this.mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      depthTest: false,
      depthWrite: false,
      transparent: false,
      blending: THREE.NoBlending,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;

        uniform sampler2D u_prev;
        uniform float u_dt;
        uniform float u_time;
        uniform float u_worldSize;
        uniform vec2 u_center;
        uniform vec2 u_recenterDeltaUV;
        uniform vec2 u_texel;

        uniform vec2 u_flow;
        uniform vec2 u_current;

        uniform float u_injectStrength;
        uniform float u_decay;
        uniform float u_slopeStart;
        uniform float u_slopeEnd;
        uniform float u_crestStart;
        uniform float u_crestEnd;

        uniform vec2 u_wakePos;
        uniform vec2 u_wakeDir;
        uniform float u_wakeStrength;
        uniform float u_wakeRadius;
        uniform float u_wakeLength;

        uniform vec4 u_waveA[${MAX_WAVES}];
        uniform vec4 u_waveB[${MAX_WAVES}];

        float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * 0.1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
        }

        void main() {
          // Map previous texture into the new "window" and advect by flow.
          vec2 velUV = (u_flow * u_dt) / max(1e-6, u_worldSize);
          vec2 uvPrev = vUv + u_recenterDeltaUV - velUV;

          float inPrev = step(0.0, uvPrev.x) * step(0.0, uvPrev.y) * step(uvPrev.x, 1.0) * step(uvPrev.y, 1.0);

          // Mild directional smear along the flow to create streaky foam.
          vec2 fdir = normalize(u_flow + vec2(1e-5, 0.0));
          vec2 smear = fdir * u_texel * 1.25;
          float p0 = texture2D(u_prev, uvPrev).r;
          float p1 = texture2D(u_prev, uvPrev - smear).r;
          float p2 = texture2D(u_prev, uvPrev + smear).r;
          float prev = (p0 * 0.70 + p1 * 0.15 + p2 * 0.15) * inPrev;

          // Exponential decay.
          prev *= exp(-u_decay * u_dt);

          // World position for injection evaluation.
          vec2 worldXZ = u_center + (vUv - 0.5) * u_worldSize;

          // --- Wave breaking proxy (slope + cresting) ---
          float dydx = 0.0;
          float dydz = 0.0;
          float height = 0.0;
          float aSum = 0.0;

          for (int i = 0; i < ${MAX_WAVES}; i++) {
            vec2 dir = normalize(u_waveA[i].xy);
            float A = u_waveA[i].z;
            float k = u_waveA[i].w;
            float omega = u_waveB[i].x;
            float phase0 = u_waveB[i].y;

            float w = omega + k * dot(dir, u_current);
            float theta = k * dot(dir, worldXZ) - w * u_time + phase0;
            float s = sin(theta);
            float c = cos(theta);

            height += A * s;
            dydx += A * k * dir.x * c;
            dydz += A * k * dir.y * c;
            aSum += A;
          }

          float slope = length(vec2(dydx, dydz));
          float slopeGate = smoothstep(u_slopeStart, u_slopeEnd, slope);

          float crestNorm = height / max(0.001, aSum);
          float crestGate = smoothstep(u_crestStart, u_crestEnd, crestNorm);

          float breakMask = slopeGate * crestGate;

          // Add a little spatial noise so it doesn't look like a perfect analytic mask.
          float n = hash12(worldXZ * 0.08 + u_time * 0.04);
          breakMask *= smoothstep(0.15, 1.0, n);

          float foam = prev;
          foam += breakMask * u_injectStrength * u_dt;

          // --- Wake injection (optional) ---
          if (u_wakeStrength > 0.0001) {
            vec2 d = worldXZ - u_wakePos;
            vec2 wdir = normalize(u_wakeDir + vec2(1e-6, 0.0));
            vec2 wperp = vec2(-wdir.y, wdir.x);

            float along = dot(d, wdir);
            float back = max(0.0, -along);
            float side = dot(d, wperp);

            float wake = exp(-(side * side) / max(1e-4, (u_wakeRadius * u_wakeRadius)));
            wake *= exp(-(back * back) / max(1e-4, (u_wakeLength * u_wakeLength)));

            foam += wake * u_wakeStrength * u_dt;
          }

          foam = clamp(foam, 0.0, 1.0);
          gl_FragColor = vec4(foam, foam, foam, 1.0);
        }
      `
    });

    const quadGeo = new THREE.PlaneGeometry(2, 2);
    this.quad = new THREE.Mesh(quadGeo, this.mat);
    this.simScene.add(this.quad);

    // Clear both RTs to 0 once.
    const prevRT = renderer.getRenderTarget();
    renderer.setRenderTarget(this.rtA);
    renderer.clear();
    renderer.setRenderTarget(this.rtB);
    renderer.clear();
    renderer.setRenderTarget(prevRT);
  }

  public dispose(): void {
    this.rtA.dispose();
    this.rtB.dispose();
    this.mat.dispose();
    (this.quad.geometry as THREE.BufferGeometry).dispose();
  }

  /** Clear the simulation to 0 foam and reset center tracking. */
  public reset(renderer: THREE.WebGLRenderer, centerXZ?: THREE.Vector2): void {
    if (centerXZ) this.centerXZ.copy(centerXZ);
    else this.centerXZ.set(0, 0);

    this.pingIsA = true;
    this.uniforms.u_center.value.copy(this.centerXZ);
    this.uniforms.u_recenterDeltaUV.value.set(0, 0);

    const prevRT = renderer.getRenderTarget();
    renderer.setRenderTarget(this.rtA);
    renderer.clear();
    renderer.setRenderTarget(this.rtB);
    renderer.clear();
    renderer.setRenderTarget(prevRT);
  }

  public get texture(): THREE.Texture {
    return (this.pingIsA ? this.rtA : this.rtB).texture;
  }

  public setWorldSize(worldSize_m: number): void {
    this.worldSize_m = Math.max(20, worldSize_m);
    this.uniforms.u_worldSize.value = this.worldSize_m;
  }

  public setSize(size: number): void {
    const s = Math.max(64, Math.floor(size));
    this.rtA.setSize(s, s);
    this.rtB.setSize(s, s);
    this.uniforms.u_texel.value.set(1 / s, 1 / s);
  }

  /** Update wave uniforms in-place (no material recompile). */
  private writeWaves(waves: WaveComponent[]): void {
    const N = Math.min(waves.length, MAX_WAVES);
    const uA = this.uniforms.u_waveA.value as THREE.Vector4[];
    const uB = this.uniforms.u_waveB.value as THREE.Vector4[];
    for (let i = 0; i < MAX_WAVES; i++) {
      if (i < N) {
        const w = waves[i];
        uA[i].set(w.dirX, w.dirZ, w.A, w.k);
        uB[i].set(w.omega, w.phase, w.Q, 0);
      } else {
        uA[i].set(1, 0, 0, 1);
        uB[i].set(0, 0, 0, 0);
      }
    }
  }

  public update(renderer: THREE.WebGLRenderer, opt: FoamFieldUpdateOptions): void {
    const dt = clamp(opt.dt_s, 0.0, 0.05);
    if (dt <= 0) return;

    // Center recentering: keep foam field around the viewer/otter, but preserve world-space motion.
    this.tmpDelta.copy(opt.centerXZ).sub(this.centerXZ);
    const dUVx = this.tmpDelta.x / Math.max(1e-6, this.worldSize_m);
    const dUVy = this.tmpDelta.y / Math.max(1e-6, this.worldSize_m);
    this.uniforms.u_recenterDeltaUV.value.set(dUVx, dUVy);

    // Surface flow = current + small wind drift.
    this.tmpWind.set(Math.cos(opt.windDirTo_rad), Math.sin(opt.windDirTo_rad));
    const windDrift = clamp(opt.windSpeed_mps * 0.02, 0.0, 0.45);
    this.tmpWind.multiplyScalar(windDrift);
    this.tmpFlow.copy(opt.currentXZ).add(this.tmpWind);

    const storm = clamp(opt.storminess, 0, 1);
    const wind01 = clamp(opt.windSpeed_mps / 18, 0, 1);

    // "Cross sea" heuristic: if wave directions are scattered, collisions and
    // breaking (foam injection) increase, and the foam decays a bit faster.
    // Use energy-weighted mean direction length as a cheap proxy.
    let sx = 0;
    let sy = 0;
    let sw = 0;
    for (const w of opt.waves) {
      const weight = w.A_m * w.A_m;
      sx += Math.cos(w.dirTo_rad) * weight;
      sy += Math.sin(w.dirTo_rad) * weight;
      sw += weight;
    }
    const meanLen = sw > 1e-8 ? Math.sqrt(sx * sx + sy * sy) / sw : 1.0;
    const crossSea = clamp(1.0 - meanLen, 0, 1);

    // Tune injection/decay heuristically.
    this.uniforms.u_injectStrength.value = (0.22 + 0.78 * wind01) * (0.75 + 1.25 * storm) * (1.0 + 1.05 * crossSea);
    this.uniforms.u_decay.value = lerp(0.045, 0.085, storm) * (1.0 + 0.30 * crossSea);
    this.uniforms.u_slopeStart.value = lerp(0.30, 0.19, wind01);
    this.uniforms.u_slopeEnd.value = this.uniforms.u_slopeStart.value + lerp(0.20, 0.30, wind01);
    this.uniforms.u_crestStart.value = lerp(0.15, 0.08, wind01);
    this.uniforms.u_crestEnd.value = lerp(0.70, 0.52, wind01);

    // Optional wake.
    const wakeStrength = clamp(opt.wakeStrength ?? 0, 0, 1.5);
    if (wakeStrength > 0.0001 && opt.wakePosXZ && opt.wakeDirXZ) {
      this.tmpWakePos.copy(opt.wakePosXZ);
      this.tmpWakeDir.copy(opt.wakeDirXZ);
      if (this.tmpWakeDir.lengthSq() > 1e-8) this.tmpWakeDir.normalize();
      else this.tmpWakeDir.set(0, 1);

      this.uniforms.u_wakePos.value.copy(this.tmpWakePos);
      this.uniforms.u_wakeDir.value.copy(this.tmpWakeDir);
      this.uniforms.u_wakeStrength.value = wakeStrength;
    } else {
      this.uniforms.u_wakeStrength.value = 0.0;
    }

    // Core uniforms.
    this.uniforms.u_dt.value = dt;
    this.uniforms.u_time.value = opt.time_s;
    this.uniforms.u_center.value.copy(opt.centerXZ);
    this.uniforms.u_flow.value.copy(this.tmpFlow);
    this.uniforms.u_current.value.copy(opt.currentXZ);

    // Wave arrays.
    this.writeWaves(opt.waves);

    // Ping-pong.
    const src = this.pingIsA ? this.rtA : this.rtB;
    const dst = this.pingIsA ? this.rtB : this.rtA;
    this.uniforms.u_prev.value = src.texture;

    const prevRT = renderer.getRenderTarget();
    const prevXr = renderer.xr.enabled;

    renderer.xr.enabled = false;
    renderer.setRenderTarget(dst);
    renderer.render(this.simScene, this.simCam);
    renderer.setRenderTarget(prevRT);
    renderer.xr.enabled = prevXr;

    this.pingIsA = !this.pingIsA;
    this.centerXZ.copy(opt.centerXZ);
  }
}
