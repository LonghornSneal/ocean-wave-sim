export const GradeShader = {
  uniforms: {
    tDiffuse: { value: null as any },
    toneMappingExposure: { value: 1.0 },
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
    uniform float u_vignette;
    uniform float u_saturation;
    uniform float u_contrast;
    uniform float u_warmth;

    varying vec2 vUv;

    #include <tonemapping_pars_fragment>

    void main() {
      vec4 col = texture2D(tDiffuse, vUv);

      // Tone map HDR -> display-referred.
      col.rgb = ACESFilmicToneMapping(col.rgb);

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

      col.rgb = clamp(col.rgb, 0.0, 1.0);
      gl_FragColor = col;
    }
  `
} satisfies {
  uniforms: Record<string, { value: any }>;
  vertexShader: string;
  fragmentShader: string;
};
