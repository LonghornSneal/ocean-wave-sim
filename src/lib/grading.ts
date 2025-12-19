import * as THREE from 'three';

export const GradeShader = {
  uniforms: {
    tDiffuse: { value: null as any },
    u_time: { value: 0.0 },
    u_grain: { value: 0.03 },
    u_vignette: { value: 0.22 },
    u_saturation: { value: 1.08 },
    u_contrast: { value: 1.06 },
    u_warmth: { value: 0.0 }
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float u_time;
    uniform float u_grain;
    uniform float u_vignette;
    uniform float u_saturation;
    uniform float u_contrast;
    uniform float u_warmth;

    varying vec2 vUv;

    float hash(vec2 p) {
      // Simple, fast hash for grain.
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    void main() {
      vec4 col = texture2D(tDiffuse, vUv);

      // Contrast
      col.rgb = (col.rgb - 0.5) * u_contrast + 0.5;

      // Saturation
      float l = dot(col.rgb, vec3(0.2126, 0.7152, 0.0722));
      col.rgb = mix(vec3(l), col.rgb, u_saturation);

      // Warmth (sunset grade)
      col.rgb += u_warmth * vec3(0.06, 0.03, -0.02);

      // Vignette
      float d = distance(vUv, vec2(0.5));
      float vig = smoothstep(0.82, 0.35, d);
      col.rgb *= mix(1.0 - u_vignette, 1.0, vig);

      // Film grain (very subtle)
      float n = hash(vUv * vec2(1920.0, 1080.0) + u_time * 1.7);
      col.rgb += (n - 0.5) * (u_grain * 0.08);

      gl_FragColor = col;
    }
  `
} satisfies {
  uniforms: Record<string, { value: any }>;
  vertexShader: string;
  fragmentShader: string;
};
