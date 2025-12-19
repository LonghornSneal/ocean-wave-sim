import * as THREE from 'three';

export const HeightFogShader = {
  uniforms: {
    tDiffuse: { value: null as any },
    tDepth: { value: null as any },

    u_hasDepth: { value: 1.0 },
    u_invProj: { value: new THREE.Matrix4() },
    u_invView: { value: new THREE.Matrix4() },

    u_fogColor: { value: new THREE.Color('#6f8096') },
    u_density: { value: 0.000035 },
    u_height: { value: 0.0 },
    u_heightFalloff: { value: 0.015 },
    u_strength: { value: 1.0 },
    u_maxOpacity: { value: 0.35 }
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

    uniform float u_hasDepth;
    uniform mat4 u_invProj;
    uniform mat4 u_invView;

    uniform vec3 u_fogColor;
    uniform float u_density;
    uniform float u_height;
    uniform float u_heightFalloff;
    uniform float u_strength;
    uniform float u_maxOpacity;

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

    void main() {
      vec4 base = texture2D(tDiffuse, vUv);
      float strength = saturate(u_strength);
      if (strength < 0.001) {
        gl_FragColor = base;
        return;
      }

      float fogAmount = 0.0;

      if (u_hasDepth > 0.5) {
        float depth01 = texture2D(tDepth, vUv).x;
        vec3 viewPos = reconstructViewPos(vUv, depth01);
        float viewDist = length(viewPos);

        vec3 worldPos = reconstructWorldPos(viewPos);
        float height = max(worldPos.y - u_height, 0.0);
        float heightFactor = exp(-height * u_heightFalloff);

        float fog = 1.0 - exp(-u_density * viewDist * heightFactor);
        fogAmount = fog;
      } else {
        // Fallback: a gentle horizon gradient if depth isn't available.
        float horizon = smoothstep(0.0, 0.65, 1.0 - vUv.y);
        float fog = 1.0 - exp(-u_density * 6000.0);
        fogAmount = horizon * fog;
      }

      fogAmount = min(fogAmount, u_maxOpacity);

      vec3 col = mix(base.rgb, u_fogColor, fogAmount * strength);
      gl_FragColor = vec4(col, base.a);
    }
  `
} satisfies {
  uniforms: Record<string, { value: any }>;
  vertexShader: string;
  fragmentShader: string;
};
