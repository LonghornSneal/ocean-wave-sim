import * as THREE from 'three';
import { CAUSTICS_TEX } from './causticsTexture';

/**
 * Underwater post-processing shader (milestone #4).
 *
 * Features (cheap-but-convincing):
 * - Beer–Lambert absorption + in-scattering (depth-based)
 * - sun shafts (small radial blur toward projected sun position)
 * - animated caustics projected in world XZ
 * - subtle refraction/distortion near the surface
 */
export const UnderwaterShader = {
  uniforms: {
    tDiffuse: { value: null as any },
    tDepth: { value: null as any },

    u_time: { value: 0.0 },
    /** 0..1 blend factor (0=disabled). */
    u_underwater: { value: 0.0 },

    u_hasDepth: { value: 1.0 },
    u_cameraNear: { value: 0.1 },
    u_cameraFar: { value: 1000.0 },
    u_invProj: { value: new THREE.Matrix4() },
    u_invView: { value: new THREE.Matrix4() },

    /** Sun in screen UV (0..1). */
    u_sunUv: { value: new THREE.Vector2(0.5, 0.5) },
    /** 0/1 flag for whether the sun is on-screen. */
    u_sunInView: { value: 1.0 },
    /** 0..1 */
    u_sunIntensity: { value: 1.0 },
    u_sunColor: { value: new THREE.Color('#ffffff') },

    /** 0..1 (0=turbid/greenish, 1=clear/blue). */
    u_clarity: { value: 0.7 },
    /** Approx surface height (tide). Used for caustics falloff / surface shimmer. */
    u_waterLevel: { value: 0.0 },

    u_resolution: { value: new THREE.Vector2(1, 1) },

    u_caustics: { value: CAUSTICS_TEX }
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    precision highp float;

    uniform sampler2D tDiffuse;
    uniform sampler2D tDepth;

    uniform float u_time;
    uniform float u_underwater;

    uniform float u_hasDepth;
    uniform float u_cameraNear;
    uniform float u_cameraFar;
    uniform mat4 u_invProj;
    uniform mat4 u_invView;

    uniform vec2 u_sunUv;
    uniform float u_sunInView;
    uniform float u_sunIntensity;
    uniform vec3 u_sunColor;

    uniform float u_clarity;
    uniform float u_waterLevel;
    uniform vec2 u_resolution;

    uniform sampler2D u_caustics;

    varying vec2 vUv;

    float saturate(float x) { return clamp(x, 0.0, 1.0); }

    // Reconstruct view-space position from depth.
    vec3 reconstructViewPos(vec2 uv, float depth01) {
      vec4 clip = vec4(uv * 2.0 - 1.0, depth01 * 2.0 - 1.0, 1.0);
      vec4 view = u_invProj * clip;
      return view.xyz / max(1e-6, view.w);
    }

    vec3 reconstructWorldPos(vec3 viewPos) {
      vec4 w = u_invView * vec4(viewPos, 1.0);
      return w.xyz;
    }

    float luma(vec3 c) {
      return dot(c, vec3(0.2126, 0.7152, 0.0722));
    }

    void main() {
      vec4 base = texture2D(tDiffuse, vUv);

      float uw = saturate(u_underwater);
      if (uw < 0.001) {
        gl_FragColor = base;
        return;
      }

      float hasDepth = step(0.5, u_hasDepth);
      float depth01 = hasDepth > 0.5 ? texture2D(tDepth, vUv).x : 1.0;

      vec3 viewPos = vec3(0.0, 0.0, -25.0);
      vec3 worldPos = vec3(0.0);
      float viewDist = 25.0;

      if (hasDepth > 0.5) {
        viewPos = reconstructViewPos(vUv, depth01);
        viewDist = length(viewPos);
        worldPos = reconstructWorldPos(viewPos);
      } else {
        // Fallback: a gentle depth gradient (still better than nothing).
        viewDist = mix(12.0, 120.0, saturate(vUv.y));
      }

      float clarity = saturate(u_clarity);

      // Approx depth below the surface (meters). Only meaningful when we have worldPos.
      float depthBelow = hasDepth > 0.5 ? max(0.0, u_waterLevel - worldPos.y) : 0.0;

      // --- Subtle refraction shimmer near the surface ---
      float surfaceProx = exp(-depthBelow * mix(0.35, 0.14, clarity));
      float distortAmt = uw * surfaceProx * 0.004;
      vec2 dUv = vUv;
      // Use caustics texture as a stable distortion noise.
      float dA = texture2D(u_caustics, vUv * 1.15 + vec2(u_time * 0.032, u_time * 0.021)).r;
      float dB = texture2D(u_caustics, vUv * 1.15 + vec2(-u_time * 0.027, u_time * 0.018) + vec2(0.37, 0.11)).r;
      dUv += (vec2(dA, dB) - 0.5) * distortAmt;
      vec3 col = texture2D(tDiffuse, dUv).rgb;

      // --- Beer–Lambert absorption + in-scattering ---
      // Tuned for meters-as-units.
      float absorb = mix(0.20, 0.075, clarity);
      float scatter = mix(0.33, 0.12, clarity);
      float att = exp(-absorb * viewDist);
      float sca = 1.0 - exp(-scatter * viewDist);

      // Water body scatter color (turbid -> greener, clear -> bluer).
      vec3 waterClear = vec3(0.06, 0.26, 0.36);
      vec3 waterTurbid = vec3(0.05, 0.20, 0.16);
      vec3 waterCol = mix(waterTurbid, waterClear, clarity);

      col = col * att + waterCol * sca * 0.88;

      // --- Caustics (projected in world XZ, fades quickly with depth) ---
      if (hasDepth > 0.5) {
        float sunI = saturate(u_sunIntensity);
        float caFade = exp(-depthBelow * mix(0.28, 0.10, clarity));
        float caStrength = uw * sunI * caFade * (0.20 + 0.80 * clarity);

        // World-space projected caustics. Two layers for richer motion.
        float s1 = mix(0.095, 0.13, clarity);
        float s2 = s1 * 1.47;

        vec2 uv1 = worldPos.xz * s1 + vec2(u_time * 0.055, -u_time * 0.043);
        vec2 uv2 = worldPos.xz * s2 + vec2(-u_time * 0.031, u_time * 0.062) + vec2(13.7, -8.2);

        float c1 = texture2D(u_caustics, uv1).r;
        float c2 = texture2D(u_caustics, uv2).r;
        float ca = pow(saturate(c1 * 0.72 + c2 * 0.28), 1.7);
        ca = smoothstep(0.22, 0.98, ca);

        // Caustics are warmer near sunset, but still water-filtered.
        vec3 caCol = mix(waterCol, u_sunColor, 0.72);
        col += caCol * ca * caStrength * 0.85;
      }

      // --- Sun shafts (cheap radial blur toward projected sun) ---
      float sunInView = saturate(u_sunInView);
      float sunI = saturate(u_sunIntensity);

      if (sunInView > 0.5 && sunI > 0.02) {
        vec2 delta = u_sunUv - vUv;
        float distToSun = length(delta);

        // Fade shafts as you get farther from the sun.
        float sunFall = exp(-distToSun * 3.3);

        // A little stronger in slightly turbid water.
        float turb = 1.0 - clarity;
        float shaftStrength = uw * sunI * (0.06 + 0.32 * turb);

        const int SAMPLES = 10;
        vec2 stepUV = delta * (0.85 / float(SAMPLES));
        vec2 uv = vUv;
        float acc = 0.0;
        float wsum = 0.0;

        for (int i = 0; i < SAMPLES; i++) {
          uv += stepUV;
          vec3 s = texture2D(tDiffuse, uv).rgb;
          float lum = luma(s);
          float b = smoothstep(0.62, 1.0, lum);
          float w = 1.0 - float(i) / float(SAMPLES);
          acc += b * w;
          wsum += w;
        }

        acc /= max(1e-6, wsum);

        vec3 shaftCol = mix(waterCol, u_sunColor, 0.62);
        col += shaftCol * acc * shaftStrength * sunFall;

        // Soft halo around the sun position.
        float halo = exp(-distToSun * distToSun * 55.0);
        col += shaftCol * halo * uw * sunI * 0.10;
      }

      // Clamp to avoid blowing out on mobile tone mapping.
      col = min(col, vec3(4.0));

      vec3 outCol = mix(base.rgb, col, uw);
      gl_FragColor = vec4(outCol, base.a);
    }
  `
} satisfies {
  uniforms: Record<string, { value: any }>;
  vertexShader: string;
  fragmentShader: string;
};
