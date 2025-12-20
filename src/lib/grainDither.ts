import * as THREE from 'three';

export const GrainDitherShader = {
  uniforms: {
    tDiffuse: { value: null as any },
    u_resolution: { value: new THREE.Vector2(1, 1) },
    u_strength: { value: 0.0025 },
    u_time: { value: 0.0 }
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
    uniform vec2 u_resolution;
    uniform float u_strength;
    uniform float u_time;

    varying vec2 vUv;

    float interleavedGradientNoise(vec2 pix) {
      return fract(52.9829189 * fract(pix.x * 0.06711056 + pix.y * 0.00583715));
    }

    void main() {
      vec4 col = texture2D(tDiffuse, vUv);

      vec2 pix = floor(vUv * u_resolution);
      float n = interleavedGradientNoise(pix + u_time * 0.25);

      float luma = dot(col.rgb, vec3(0.2126, 0.7152, 0.0722));
      float darkMask = smoothstep(0.45, 0.0, clamp(luma, 0.0, 1.0));
      float amount = u_strength * mix(0.35, 1.0, darkMask);

      col.rgb += (n - 0.5) * amount;
      gl_FragColor = col;
    }
  `
} satisfies {
  uniforms: Record<string, { value: any }>;
  vertexShader: string;
  fragmentShader: string;
};
