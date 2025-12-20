import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { makeMoonSprite, makeStars, makeSunSprite } from './skyHelpers';

export type AtmosphereRig = {
  fogAbove: THREE.FogExp2;
  fogUnder: THREE.FogExp2;
  underwaterDome: THREE.Mesh;
  sky: Sky;
  skyUniforms: Record<string, { value: any }>;
  sunLight: THREE.DirectionalLight;
  moonLight: THREE.DirectionalLight;
  ambient: THREE.HemisphereLight;
  lightningLight: THREE.DirectionalLight;
  otterFillLight: THREE.DirectionalLight;
  tmpSunColor: THREE.Color;
  sunWarmColor: THREE.Color;
  otterFillNightColor: THREE.Color;
  stars: THREE.Points;
  sunSprite: THREE.Sprite;
  moonSprite: THREE.Sprite;
};

export type SkyCloudSettings = {
  octaveScales: THREE.Vector3;
  octaveSpeeds: THREE.Vector3;
  intensity: number;
  ditherStrength: number;
};

export const DEFAULT_SKY_CLOUD_SETTINGS: SkyCloudSettings = {
  octaveScales: new THREE.Vector3(0.8, 2.1, 4.4),
  octaveSpeeds: new THREE.Vector3(0.015, 0.035, 0.07),
  intensity: 0.55,
  ditherStrength: 0.035
};

type AtmosphereOptions = {
  skyClouds?: Partial<SkyCloudSettings>;
};

function applySkyCloudShader(sky: Sky, settings: SkyCloudSettings): void {
  const material = sky.material as THREE.ShaderMaterial;
  const uniforms = material.uniforms as Record<string, { value: any }>;

  uniforms.u_cloudTime = { value: 0.0 };
  uniforms.u_cloudCover = { value: 0.0 };
  uniforms.u_cloudOctaveScales = { value: settings.octaveScales.clone() };
  uniforms.u_cloudOctaveSpeeds = { value: settings.octaveSpeeds.clone() };
  uniforms.u_cloudIntensity = { value: settings.intensity };
  uniforms.u_cloudDither = { value: settings.ditherStrength };

  if (!material.fragmentShader.includes('u_cloudOctaveScales')) {
    material.fragmentShader = material.fragmentShader
      .replace(
        'uniform vec3 up;',
        `uniform vec3 up;
        uniform float u_cloudTime;
        uniform float u_cloudCover;
        uniform vec3 u_cloudOctaveScales;
        uniform vec3 u_cloudOctaveSpeeds;
        uniform float u_cloudIntensity;
        uniform float u_cloudDither;`
      )
      .replace(
        'void main() {',
        `float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * 0.1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
        }

        vec2 mod289(vec2 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec3 mod289(vec3 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec3 permute(vec3 x) {
          return mod289(((x * 34.0) + 1.0) * x);
        }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
          m = m * m;
          m = m * m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.y = a0.y * x12.x + h.y * x12.y;
          g.z = a0.z * x12.z + h.z * x12.w;
          return 130.0 * dot(m, g);
        }

        mat2 rot2(float a) {
          float c = cos(a);
          float s = sin(a);
          return mat2(c, -s, s, c);
        }

        float fbmCloud(vec2 uv, vec3 scales, vec3 speeds, float t) {
          float n = 0.0;
          float w = 0.0;
          vec2 flow0 = vec2(0.83, 0.55);
          vec2 flow1 = vec2(-0.47, 0.88);
          vec2 flow2 = vec2(0.63, -0.42);

          vec2 p0 = rot2(0.15) * (uv * scales.x) + flow0 * (t * speeds.x);
          n += 0.55 * (0.5 + 0.5 * snoise(p0));
          w += 0.55;

          vec2 p1 = rot2(-0.37) * (uv * scales.y) + flow1 * (t * speeds.y);
          n += 0.30 * (0.5 + 0.5 * snoise(p1));
          w += 0.30;

          vec2 p2 = rot2(0.67) * (uv * scales.z) + flow2 * (t * speeds.z);
          n += 0.15 * (0.5 + 0.5 * snoise(p2));
          w += 0.15;

          return n / max(1e-4, w);
        }

        void main() {`
      )
      .replace(
        'vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );',
        `vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

        float cloudCover = clamp(u_cloudCover, 0.0, 1.0);
        vec2 cloudUV = direction.xz / max(0.25, abs(direction.y) + 0.35);
        float cloudNoise = fbmCloud(cloudUV, u_cloudOctaveScales, u_cloudOctaveSpeeds, u_cloudTime);
        float threshold = mix(0.78, 0.38, cloudCover);
        float softness = mix(0.10, 0.25, cloudCover);
        float cloudMask = smoothstep(threshold - softness, threshold + softness, cloudNoise);

        float horizon = smoothstep(-0.08, 0.20, direction.y);
        cloudMask *= horizon;

        // Screen-space dither to break up banding in smooth sky gradients.
        float dither = (hash12(gl_FragCoord.xy + u_cloudTime * 12.31) - 0.5) * u_cloudDither;
        cloudMask = clamp(cloudMask + dither, 0.0, 1.0);

        float cloudMix = cloudMask * u_cloudIntensity;
        vec3 cloudTint = mix(retColor, vec3(0.72, 0.75, 0.80), 0.65);
        retColor = mix(retColor, cloudTint, cloudMix);
        retColor *= (1.0 - cloudMix * 0.12);`
      );

    material.needsUpdate = true;
  }
}

export function createAtmosphere(scene: THREE.Scene, options: AtmosphereOptions = {}): AtmosphereRig {
  // Fog objects (reused to avoid per-frame allocations)
  const fogAbove = new THREE.FogExp2(new THREE.Color('#6a7aa0'), 0.00004);
  const fogUnder = new THREE.FogExp2(new THREE.Color('#053044'), 0.03);

  // If the camera goes underwater (the otter sometimes looks down), the sky is hidden.
  // On devices where post FX can't run, that can make the world appear fully black.
  // We render a cheap background dome so underwater never becomes a "black screen".
  const underwaterDome = (() => {
    const geo = new THREE.SphereGeometry(9000, 16, 12);
    const mat = new THREE.MeshBasicMaterial({
      color: fogUnder.color.clone(),
      side: THREE.BackSide,
      depthWrite: false,
      depthTest: false
    });
    const m = new THREE.Mesh(geo, mat);
    m.visible = false;
    m.frustumCulled = false;
    m.renderOrder = -1000;
    return m;
  })();
  scene.add(underwaterDome);

  const sky = new Sky();
  sky.scale.setScalar(10000);
  sky.material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      'gl_FragColor = vec4( retColor, 1.0 );',
      'gl_FragColor = vec4( retColor, 1.0 );\n#include <tonemapping_fragment>\n#include <colorspace_fragment>'
    );
  };
  scene.add(sky);

  const skyUniforms = sky.material.uniforms as any;
  skyUniforms['turbidity'].value = 10;
  skyUniforms['rayleigh'].value = 2.3;
  skyUniforms['mieCoefficient'].value = 0.007;
  skyUniforms['mieDirectionalG'].value = 0.8;

  const skyClouds = {
    ...DEFAULT_SKY_CLOUD_SETTINGS,
    ...options.skyClouds
  };
  applySkyCloudShader(sky, skyClouds);

  const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
  sunLight.position.set(1, 1, 0);
  sunLight.castShadow = false;
  scene.add(sunLight);

  const moonLight = new THREE.DirectionalLight(0x9bb8ff, 0.25);
  moonLight.position.set(-1, 1, 0);
  scene.add(moonLight);

  const ambient = new THREE.HemisphereLight(0x88aaff, 0x0b1020, 0.55);
  scene.add(ambient);

  // Lightning flashes (superstorm). Directional light gives a broad, inexpensive
  // flash that reads well on the water.
  const lightningLight = new THREE.DirectionalLight(new THREE.Color('#e6f2ff'), 0.0);
  lightningLight.name = 'LightningLight';
  lightningLight.castShadow = false;
  scene.add(lightningLight);
  scene.add(lightningLight.target);

  // Camera-following fill light: keeps the otter readable on mobile (and in heavy
  // cloud / night scenes) without having to crank global exposure.
  const otterFillLight = new THREE.DirectionalLight(0xffffff, 0.0);
  otterFillLight.castShadow = false;
  scene.add(otterFillLight);
  scene.add(otterFillLight.target);

  // Temp colors (keep allocations out of the hot path)
  const tmpSunColor = new THREE.Color('#ffffff');
  // Warm tint used as the sun approaches the horizon.
  const sunWarmColor = new THREE.Color('#ffb26b');
  // Cooler tint for nighttime fill.
  const otterFillNightColor = new THREE.Color('#cfe7ff');

  const stars = makeStars(2500);
  scene.add(stars);

  const sunSprite = makeSunSprite();
  scene.add(sunSprite);

  const moonSprite = makeMoonSprite(0.5);
  scene.add(moonSprite);

  return {
    fogAbove,
    fogUnder,
    underwaterDome,
    sky,
    skyUniforms,
    sunLight,
    moonLight,
    ambient,
    lightningLight,
    otterFillLight,
    tmpSunColor,
    sunWarmColor,
    otterFillNightColor,
    stars,
    sunSprite,
    moonSprite
  };
}
