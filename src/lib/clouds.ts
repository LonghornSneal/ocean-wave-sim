import * as THREE from 'three';
import { clamp, lerp } from './math';
import type { QualityMode } from './ui';

export interface CloudUpdate {
  dt_s: number;
  time_s: number;
  center: THREE.Vector3;
  cloudCover: number; // 0..1
  windDirFrom_deg: number;
  windSpeed_mps: number;
  sunDir: THREE.Vector3;
  /** Sun color (already warmed by sun elevation in main.ts). */
  sunColor: THREE.Color;
  sunIntensity: number; // 0..1
  nightFactor: number; // 0..1
  /** 0..1 instantaneous lightning flash strength. */
  lightningFlash01: number;
  /** Direction from camera toward the active lightning flash (unit vector). */
  lightningDir: THREE.Vector3;
  storminess: number; // 0..1
  hurricaneIntensity: number; // 0..1
  precipIntensity: number; // 0..1
  quality: QualityMode;
}

export interface CloudDeckOptions {
  radius?: number;
  layerOffset?: number;
  densityScale?: number;
  opacityScale?: number;
  coverScale?: number;
  stormScale?: number;
  rainScale?: number;
  windScale?: number;
  stepsScale?: number;
}

/**
 * Volumetric-ish cloud dome.
 *
 * This replaces the old procedural canvas texture with a shader that does a
 * tiny raymarch through 3D fBm noise, plus a cheap self-shadow tap toward the sun.
 *
 * It's intentionally tuned for phone-friendly costs:
 * - step count scales with quality
 * - 4-octave fBm
 * - no screen-space raymarch; this is a sky dome shader
 */
export class CloudDeck {
  public readonly mesh: THREE.Mesh;

  private readonly uniforms: Record<string, { value: any }>;
  private readonly layerOffset: number;
  private readonly densityScale: number;
  private readonly opacityScale: number;
  private readonly coverScale: number;
  private readonly stormScale: number;
  private readonly rainScale: number;
  private readonly windScale: number;
  private readonly stepsScale: number;

  // State (no per-frame allocations)
  private opacity = 0;
  private readonly windOffset = new THREE.Vector2(0, 0);
  private readonly windDirXZ = new THREE.Vector2(1, 0);

  constructor(options: CloudDeckOptions = {}) {
    const radius = options.radius ?? 9000;
    this.layerOffset = options.layerOffset ?? 0.0;
    this.densityScale = options.densityScale ?? 1.0;
    this.opacityScale = options.opacityScale ?? 1.0;
    this.coverScale = options.coverScale ?? 1.0;
    this.stormScale = options.stormScale ?? 1.0;
    this.rainScale = options.rainScale ?? 1.0;
    this.windScale = options.windScale ?? 1.0;
    this.stepsScale = options.stepsScale ?? 1.0;

    const geo = new THREE.SphereGeometry(radius, 64, 32);

    this.uniforms = {
      u_time: { value: 0.0 },
      u_windOffset: { value: this.windOffset },
      u_windDirXZ: { value: this.windDirXZ },

      u_cover: { value: 0.25 },
      u_storm: { value: 0.0 },
      u_rain: { value: 0.0 },

      u_sunDir: { value: new THREE.Vector3(0, 1, 0) },
      u_sunColor: { value: new THREE.Color('#ffffff') },
      u_sunIntensity: { value: 1.0 },
      u_night: { value: 0.0 },
      u_lightning: { value: 0.0 },
      u_lightningDir: { value: new THREE.Vector3(0, 1, 0) },

      // Smoothed opacity derived from cover
      u_opacity: { value: 0.0 },
      u_layerOffset: { value: this.layerOffset },
      u_densityScale: { value: this.densityScale },

      // Ray steps (float for WebGL1 compatibility in break conditions)
      u_steps: { value: 8.0 }
    };

    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      // Cloud deck is a sky-layer. Disable depth testing so it can't get
      // occluded by the sky dome when the camera drifts (mobile often makes
      // this look like "no clouds").
      depthTest: false,
      side: THREE.BackSide,
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;

        varying vec3 vDir;

        uniform float u_time;
        uniform vec2  u_windOffset;
        uniform vec2  u_windDirXZ;

        uniform float u_cover;
        uniform float u_storm;
        uniform float u_rain;

        uniform vec3  u_sunDir;
        uniform vec3  u_sunColor;
        uniform float u_sunIntensity;
        uniform float u_night;
        uniform float u_lightning;
        uniform vec3  u_lightningDir;

        uniform float u_opacity;
        uniform float u_layerOffset;
        uniform float u_densityScale;
        uniform float u_steps;

        // ---- small 3D value noise + fBm ----
        float hash13(vec3 p) {
          return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
        }

        float noise3(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);

          float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
          float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
          float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
          float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
          float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
          float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
          float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
          float n111 = hash13(i + vec3(1.0, 1.0, 1.0));

          float n00 = mix(n000, n100, f.x);
          float n10 = mix(n010, n110, f.x);
          float n01 = mix(n001, n101, f.x);
          float n11 = mix(n011, n111, f.x);
          float n0  = mix(n00, n10, f.y);
          float n1  = mix(n01, n11, f.y);
          return mix(n0, n1, f.z);
        }

        float fbm4(vec3 p) {
          float v = 0.0;
          float a = 0.5;
          v += a * noise3(p); p *= 2.02; a *= 0.5;
          v += a * noise3(p); p *= 2.03; a *= 0.5;
          v += a * noise3(p); p *= 2.01; a *= 0.5;
          v += a * noise3(p);
          return v;
        }

        // Cloud density proxy (0..1) from a 3D coordinate.
        float densityAt(vec3 p, float cover, float storm, float rain) {
          float overcast = clamp((cover - 0.50) / 0.50, 0.0, 1.0);
          float stratus  = clamp(overcast * 0.85 + rain * 0.65, 0.0, 1.0);
          float cumulus  = clamp((1.0 - overcast) * (1.0 - rain) * (1.0 - storm * 0.55), 0.0, 1.0);

          float freqX = mix(6.2, 2.4, stratus) + cumulus * 1.6;
          float freqY = mix(3.0, 1.2, stratus) + storm * 0.7;

          vec3 q = vec3(p.x * freqX, p.y * (0.55 + freqY), p.z * freqX);

          float base   = fbm4(q);
          float detail = fbm4(q * 2.15 + 17.0);
          float n = base * 0.65 + detail * 0.35;

          // Stratus banding / layering.
          vec3 qb = vec3(q.x * 0.55, q.y * (2.4 + stratus * 1.8), q.z * 0.55);
          float bands = fbm4(qb + vec3(0.0, u_time * 0.02, 0.0));
          n = mix(n, bands, stratus * 0.82) + cumulus * 0.10 * bands;

          float thr  = mix(0.44, 0.28, clamp(cover * 0.9 + storm * 0.45, 0.0, 1.0));
          float span = mix(0.62, 0.30, clamp(stratus * 0.9 + storm * 0.65, 0.0, 1.0));

          float v = clamp((n - thr) / max(1e-3, span), 0.0, 1.0);

          float harsh = mix(0.0, 0.22, storm);
          if (harsh > 0.001) {
            v = clamp(v + (v * (1.0 - v)) * harsh * 2.0, 0.0, 1.0);
          }

          // Slightly bias down so low cover is "wispy" rather than chunky blobs.
          v = pow(v, mix(1.55, 1.05, cover));
          return v;
        }

        void main() {
          vec3 dir = normalize(vDir);

          // Kill clouds below the horizon; soften near the horizon.
          float horizon = smoothstep(-0.03, 0.22, dir.y);
          if (horizon <= 0.001 || u_opacity <= 0.001) {
            discard;
          }

          float cover = clamp(u_cover, 0.0, 1.0);
          float storm = clamp(max(u_storm, 0.0), 0.0, 1.0);
          float rain  = clamp(u_rain, 0.0, 1.0);

          // A slightly stronger "visual cover" than the raw input.
          float coverVis = clamp((cover - 0.06) / 0.94, 0.0, 1.0);

          // Sunset factor from sun elevation.
          float sunset = clamp(1.0 - clamp((u_sunDir.y + 0.02) / 0.32, 0.0, 1.0), 0.0, 1.0);

          // Base colors (matched to the old deck; now shaded in-shader).
          vec3 colDay    = vec3(1.0);
          vec3 colSunset = vec3(1.0, 0.824, 0.627);
          vec3 colNight  = vec3(0.420, 0.478, 0.651);

          vec3 baseCol = mix(colDay, colSunset, sunset * u_sunIntensity);
          baseCol = mix(baseCol, colNight, clamp(u_night, 0.0, 1.0));

          float darkness = clamp(storm * 0.70 + rain * 0.38, 0.0, 1.0);
          // Darken more aggressively in storms (the old deck could look too "day-bright").
          baseCol *= (1.0 - 0.78 * darkness);

          // Lightning: localized flash that silhouettes the underside/edges.
          float flash = clamp(u_lightning, 0.0, 1.0);
          vec3 ldir = normalize(u_lightningDir);
          float lAlign = pow(clamp(dot(dir, ldir), 0.0, 1.0), 10.0);
          // Global lift + strong local glow (so it doesn't brighten the whole dome).
          baseCol += flash * vec3(0.10, 0.12, 0.16);

          // Ray path gets longer toward the horizon.
          float path = clamp(1.0 / max(0.18, dir.y + 0.06), 0.85, 3.2);
          float thickness = mix(1.0, 1.35, clamp((cover - 0.35) / 0.65, 0.0, 1.0)) * path;
          thickness *= mix(1.0, 1.55, storm);

          // Wind drift in "noise space".
          vec3 wind = vec3(u_windOffset.x, 0.0, u_windOffset.y);

          // Raymarch with a fixed upper bound; dynamic early-exit via u_steps.
          const int MAX_STEPS = 10;

          float trans = 1.0;
          vec3  colAcc = vec3(0.0);

          vec3 sunDir = normalize(u_sunDir);
          float mu = clamp(dot(dir, sunDir), -1.0, 1.0);

          // Forward-scattering phase (cheap Henyey–Greenstein-ish).
          float g = 0.62;
          float phase = (1.0 - g*g) / pow(1.0 + g*g - 2.0*g*mu, 1.35);
          phase = clamp(phase, 0.0, 3.25);

          for (int i = 0; i < MAX_STEPS; i++) {
            float fi = float(i);
            if (fi >= u_steps) break;

            float h = (fi + 0.5) / max(1.0, u_steps);

            // A thin shell in noise-space: move along dir + a small vertical lift.
            vec3 p = dir * (2.6 + h * 1.9);
            p += wind * 18.0;
            p += vec3(0.0, u_time * 0.02, 0.0);
            p += vec3(0.0, h * 2.25, 0.0);
            p += vec3(0.0, u_layerOffset, 0.0);

            float dens = densityAt(p, cover, storm, rain) * u_densityScale;
            dens *= coverVis;
            dens *= horizon;

            // Step extinction (keep small so the (1-a) transmittance approximation is stable).
            float a = dens * (0.18 * thickness) / max(1.0, u_steps);
            a = clamp(a, 0.0, 0.33);

            // Cheap self-shadow: sample forward along sunDir in the same noise field.
            vec3 sp1 = p + sunDir * 0.35;
            vec3 sp2 = p + sunDir * 0.75;
            float sd1 = densityAt(sp1, cover, storm, rain);
            float sd2 = densityAt(sp2, cover, storm, rain);
            float occ = clamp(sd1 * 0.55 + sd2 * 0.45, 0.0, 1.0);
            float lightAtten = mix(1.0, 0.40, occ * (0.75 + 0.25 * storm));

            float edge = dens * (1.0 - dens);

            // Base cloud body.
            vec3 stepCol = baseCol;

            // --- Lightning glow ---
            // Edge term acts like a crude silhouette detector (bright rims).
            float edge01 = pow(clamp(edge * 4.0, 0.0, 1.0), 0.75);
            // Strongly localized to the flash direction, but keep a tiny ambient
            // contribution so the whole sky still "reads" as flashing.
            float bolt = flash * (0.12 + 0.88 * lAlign);
            // Blue-white storm lightning.
            vec3 boltCol = vec3(0.65, 0.78, 1.00);
            // Occlusion reduces interior glow so edges pop.
            float boltShade = (0.25 + 0.75 * (1.0 - occ));
            stepCol += boltCol * bolt * boltShade * (0.12 + 1.85 * edge01);

            // Sun lighting: warmed by u_sunColor (set in main.ts) + forward scattering.
            vec3 sunCol = u_sunColor;
            float sunPow = u_sunIntensity * (0.06 + 0.34 * phase);
            sunPow *= lightAtten;
            sunPow *= (0.55 + 0.45 * edge);
            stepCol += sunCol * sunPow;

            // Subtle underside glow at sunset, especially with thicker cover.
            stepCol += sunCol * (sunset * u_sunIntensity) * (0.04 + 0.10 * coverVis) * (1.0 - 0.75 * storm);

            // Accumulate with transmittance.
            colAcc += stepCol * a * trans;
            trans *= (1.0 - a);
            if (trans <= 0.02) break;
          }

          float alpha = (1.0 - trans) * u_opacity;
          alpha = clamp(alpha, 0.0, 0.96);

          // Extra horizon softening (prevents hard banding near y=0).
          alpha *= horizon;

          // Desaturate a bit in heavy storms (foggy / thick cloud base feel).
          float grey = dot(colAcc, vec3(0.299, 0.587, 0.114));
          colAcc = mix(colAcc, vec3(grey), storm * 0.22);

          gl_FragColor = vec4(colAcc, alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `
    });

    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    // Render before other transparents (sun/moon sprites) so those can still
    // sit "above" the cloud layer.
    this.mesh.renderOrder = -10;
  }

  public dispose(): void {
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.ShaderMaterial).dispose();
  }

  public update(u: CloudUpdate): void {
    // Follow camera so the dome feels infinite.
    this.mesh.position.copy(u.center);

    const cover = clamp(u.cloudCover * this.coverScale, 0, 1);
    const storm = clamp(Math.max(u.storminess, u.hurricaneIntensity) * this.stormScale, 0, 1);
    const rain = clamp(u.precipIntensity * this.rainScale, 0, 1);

    // Opacity ramps in with cover.
    const targetOpacity = clamp((cover - 0.08) / 0.92, 0, 1) * 0.92 * this.opacityScale;
    this.opacity = lerp(this.opacity, targetOpacity, clamp(u.dt_s * 0.8, 0, 1));

    // Wind: move *to* the wind direction.
    const dirTo = (u.windDirFrom_deg * Math.PI) / 180 + Math.PI;
    this.windDirXZ.set(Math.cos(dirTo), Math.sin(dirTo));

    // Subtle drift in noise-space to avoid motion sickness on mobile.
    const v = (0.000010 + u.windSpeed_mps * 0.0000022 * this.windScale) * (0.25 + 0.75 * cover);
    this.windOffset.x += this.windDirXZ.x * v * u.dt_s;
    this.windOffset.y += this.windDirXZ.y * v * u.dt_s * 0.35;

    // Quality → raymarch steps.
    const baseSteps = (u.quality === 'Low') ? 4 : (u.quality === 'Medium' ? 6 : (u.quality === 'High' ? 8 : 10));
    const steps = clamp(baseSteps * this.stepsScale, 3, 10);

    // Uniform updates (no allocations).
    this.uniforms.u_time.value = u.time_s;
    this.uniforms.u_cover.value = cover;
    this.uniforms.u_storm.value = storm;
    this.uniforms.u_rain.value = rain;
    this.uniforms.u_sunDir.value.copy(u.sunDir);
    this.uniforms.u_sunColor.value.copy(u.sunColor);
    this.uniforms.u_sunIntensity.value = clamp(u.sunIntensity, 0, 1);
    this.uniforms.u_night.value = clamp(u.nightFactor, 0, 1);
    this.uniforms.u_lightning.value = clamp(u.lightningFlash01, 0, 1);
    this.uniforms.u_lightningDir.value.copy(u.lightningDir).normalize();
    this.uniforms.u_opacity.value = this.opacity;
    this.uniforms.u_steps.value = steps;
  }
}
