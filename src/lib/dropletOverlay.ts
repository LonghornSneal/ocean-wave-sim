import * as THREE from 'three';

export const DropletOverlayShader = {
  uniforms: {
    tDiffuse: { value: null as any },
    tNormal: { value: null as any },
    u_resolution: { value: new THREE.Vector2(1, 1) },
    u_time: { value: 0.0 },
    u_strength: { value: 0.0 },
    u_tiling: { value: 1.9 },
    u_streak: { value: 0.65 },
    u_normalScale: { value: 0.018 },
    u_flow: { value: new THREE.Vector2(0.12, -1.0) },
    u_speed: { value: 0.35 }
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
    uniform sampler2D tNormal;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_strength;
    uniform float u_tiling;
    uniform float u_streak;
    uniform float u_normalScale;
    uniform vec2 u_flow;
    uniform float u_speed;

    varying vec2 vUv;

    float saturate(float x) { return clamp(x, 0.0, 1.0); }

    vec3 decodeNormal(vec4 n) {
      return normalize(n.xyz * 2.0 - 1.0);
    }

    void main() {
      vec4 base = texture2D(tDiffuse, vUv);
      float strength = saturate(u_strength);
      if (strength < 0.001) {
        gl_FragColor = base;
        return;
      }

      float aspect = max(1e-3, u_resolution.x / max(1.0, u_resolution.y));
      vec2 uv = vUv * vec2(aspect, 1.0);

      vec2 flow = normalize(u_flow + vec2(1e-4, 0.0));
      float t = u_time * u_speed;
      vec2 drift1 = flow * t * 0.18;
      vec2 drift2 = flow * t * 0.45;

      vec2 uv1 = uv * u_tiling + drift1;
      vec2 uv2 = uv * (u_tiling * 1.6) + drift2;

      vec4 n1 = texture2D(tNormal, uv1);
      vec4 n2 = texture2D(tNormal, uv2);

      vec3 n = normalize(decodeNormal(n1) + decodeNormal(n2) * 0.65);

      float a1 = n1.a;
      float a2 = n2.a;

      vec2 streakStep = flow * 0.035;
      float aStreak = max(a2, max(texture2D(tNormal, uv2 + streakStep).a, texture2D(tNormal, uv2 + streakStep * 2.0).a));
      float alpha = mix(a1, aStreak, saturate(u_streak));
      alpha = smoothstep(0.12, 0.75, alpha);

      float distort = u_normalScale * (0.4 + 0.6 * u_streak) * strength;
      vec2 offset = n.xy * distort;

      vec4 refr = texture2D(tDiffuse, vUv + offset);
      float blend = alpha * strength;
      vec3 col = mix(base.rgb, refr.rgb, blend);
      col += blend * 0.035;

      gl_FragColor = vec4(col, base.a);
    }
  `
} satisfies {
  uniforms: Record<string, { value: any }>;
  vertexShader: string;
  fragmentShader: string;
};
