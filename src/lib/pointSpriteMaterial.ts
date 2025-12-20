import * as THREE from 'three';
import { PARTICLE_NORMAL_TEX } from './waterParticleTextures';

export interface PointSpriteOptions {
  velocityStretch?: boolean;
  softParticles?: boolean;
}

type PointSpriteSunUniforms = {
  u_sunDir: { value: THREE.Vector3 };
  u_sunIntensity: { value: number };
  u_sunset: { value: number };
  u_particleNormalMap: { value: THREE.Texture };
};

type PointSpriteSoftUniforms = {
  u_depthTex: { value: THREE.Texture | null };
  u_hasDepth: { value: number };
  u_invResolution: { value: THREE.Vector2 };
  u_cameraNear: { value: number };
  u_cameraFar: { value: number };
  u_softness: { value: number };
  u_nearFade: { value: THREE.Vector2 };
  u_nearMin: { value: number };
};

type PointSpriteSunData = {
  sunDir: THREE.Vector3;
  sunIntensity: number;
  sunset: number;
  uniforms?: PointSpriteSunUniforms;
};

type PointSpriteUserData = {
  pointSpriteSun?: PointSpriteSunData;
  softParticleUniforms?: PointSpriteSoftUniforms;
};

function getPointSpriteSunData(material: THREE.PointsMaterial): PointSpriteSunData {
  const userData = material.userData as PointSpriteUserData;
  if (!userData.pointSpriteSun) {
    userData.pointSpriteSun = {
      sunDir: new THREE.Vector3(0, 1, 0),
      sunIntensity: 0,
      sunset: 0
    };
  }
  return userData.pointSpriteSun;
}

export function setPointSpriteSun(
  material: THREE.PointsMaterial,
  u: { sunDir: THREE.Vector3; sunIntensity: number; sunset: number }
): void {
  const data = getPointSpriteSunData(material);
  data.sunDir.copy(u.sunDir).normalize();
  data.sunIntensity = u.sunIntensity;
  data.sunset = u.sunset;

  if (data.uniforms) {
    data.uniforms.u_sunDir.value.copy(data.sunDir);
    data.uniforms.u_sunIntensity.value = data.sunIntensity;
    data.uniforms.u_sunset.value = data.sunset;
  }
}

export function enablePointSpriteAttributes(material: THREE.PointsMaterial, options: PointSpriteOptions = {}): void {
  const defines = material.defines ? { ...material.defines } : {};
  if (options.velocityStretch) {
    defines.USE_VELOCITY_STRETCH = 1;
  } else {
    delete defines.USE_VELOCITY_STRETCH;
  }
  const useSoftParticles = !!options.softParticles;
  if (useSoftParticles) {
    defines.USE_SOFT_PARTICLES = 1;
  } else {
    delete defines.USE_SOFT_PARTICLES;
  }
  material.defines = Object.keys(defines).length ? defines : undefined;
  material.needsUpdate = true;

  const sunData = getPointSpriteSunData(material);
  material.onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
attribute float aSize;
attribute float aOpacity;
varying float vOpacity;
#ifdef USE_VELOCITY_STRETCH
attribute vec3 aVelocity;
attribute float aStretch;
varying float vStretch;
varying float vAngle;
#endif`
      )
      .replace(
        '#include <color_vertex>',
        `#include <color_vertex>
vOpacity = aOpacity;
#ifdef USE_VELOCITY_STRETCH
vec3 viewVel = (modelViewMatrix * vec4(aVelocity, 0.0)).xyz;
float speed = length(viewVel.xy);
vec2 dir = speed > 0.0001 ? (viewVel.xy / speed) : vec2(0.0, 1.0);
vAngle = atan(dir.y, dir.x) - 1.57079632679;
vStretch = aStretch;
#endif`
      )
      .replace('gl_PointSize = size;', 'gl_PointSize = size * aSize;');

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <color_pars_fragment>',
        `#include <color_pars_fragment>
varying float vOpacity;
uniform vec3 u_sunDir;
uniform float u_sunIntensity;
uniform float u_sunset;
uniform sampler2D u_particleNormalMap;
#ifdef USE_SOFT_PARTICLES
uniform sampler2D u_depthTex;
uniform float u_hasDepth;
uniform vec2 u_invResolution;
uniform float u_cameraNear;
uniform float u_cameraFar;
uniform float u_softness;
uniform vec2 u_nearFade;
uniform float u_nearMin;

float linearizeDepth(float depth) {
  float z = depth * 2.0 - 1.0;
  return (2.0 * u_cameraNear * u_cameraFar) / (u_cameraFar + u_cameraNear - z * (u_cameraFar - u_cameraNear));
}
#endif
#ifdef USE_VELOCITY_STRETCH
varying float vStretch;
varying float vAngle;
#endif`
      )
      .replace(
        '#include <map_particle_pars_fragment>',
        `#include <map_particle_pars_fragment>
#ifdef USE_VELOCITY_STRETCH
vec2 rotateSpriteUv(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c) * uv;
}
#endif`
      )
      .replace(
        '#include <map_particle_fragment>',
        `vec2 spriteUv = gl_PointCoord;
#ifdef USE_VELOCITY_STRETCH
vec2 centered = spriteUv - 0.5;
centered = rotateSpriteUv(centered, vAngle);
centered *= vec2(vStretch, 1.0 / max(vStretch, 0.0001));
spriteUv = centered + 0.5;
#endif

#ifdef USE_MAP
vec4 mapTexel = texture2D( map, spriteUv );
diffuseColor *= mapTexel;
#endif

#ifdef USE_ALPHAMAP
diffuseColor.a *= texture2D( alphaMap, spriteUv ).g;
#endif`
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
diffuseColor.a *= vOpacity;

vec3 n = texture2D(u_particleNormalMap, spriteUv).xyz * 2.0 - 1.0;
n = normalize(n);

vec3 sunDir = normalize((viewMatrix * vec4(u_sunDir, 0.0)).xyz);
float ndl = clamp(dot(n, sunDir), -1.0, 1.0);
float lit = clamp(0.5 + 0.5 * ndl, 0.0, 1.0);
float ndlPos = clamp(ndl, 0.0, 1.0);

float twilight = clamp(u_sunset, 0.0, 1.0);
vec3 warm = vec3(1.08, 0.92, 0.80);
vec3 cool = vec3(0.78, 0.88, 1.08);
vec3 tint = mix(cool, warm, lit);
tint = mix(vec3(1.0), tint, twilight);

float sunI = clamp(u_sunIntensity, 0.0, 1.0);
float shade = mix(0.88, 1.12, lit);
diffuseColor.rgb *= mix(vec3(1.0), tint * shade, sunI);

vec3 viewDir = vec3(0.0, 0.0, 1.0);
float ndotv = clamp(dot(n, viewDir), 0.0, 1.0);
vec3 halfDir = normalize(sunDir + viewDir);
float spec = pow(clamp(dot(n, halfDir), 0.0, 1.0), 28.0) * ndlPos;
float fresnel = pow(1.0 - ndotv, 3.0);
float highlight = (spec * 0.85 + fresnel * (0.2 + 0.8 * ndlPos)) * sunI;
diffuseColor.rgb += tint * highlight * diffuseColor.a;

#ifdef USE_SOFT_PARTICLES
float fragDepth = linearizeDepth(gl_FragCoord.z);
float nearEnd = max(u_nearFade.y, u_nearFade.x + 1e-3);
float nearFade = smoothstep(u_nearFade.x, nearEnd, fragDepth);
float nearFactor = mix(u_nearMin, 1.0, nearFade);
float depthFade = 1.0;
if (u_hasDepth > 0.5) {
  vec2 depthUv = clamp(gl_FragCoord.xy * u_invResolution, vec2(0.0), vec2(1.0));
  float sceneDepth = linearizeDepth(texture2D(u_depthTex, depthUv).x);
  float softRange = max(u_softness, 1e-4);
  depthFade = smoothstep(0.0, softRange, sceneDepth - fragDepth);
}
diffuseColor.a *= depthFade * nearFactor;
#endif`
      );

    shader.uniforms.u_sunDir = { value: sunData.sunDir.clone() };
    shader.uniforms.u_sunIntensity = { value: sunData.sunIntensity };
    shader.uniforms.u_sunset = { value: sunData.sunset };
    shader.uniforms.u_particleNormalMap = { value: PARTICLE_NORMAL_TEX };
    sunData.uniforms = shader.uniforms as PointSpriteSunUniforms;

    if (useSoftParticles) {
      shader.uniforms.u_depthTex = { value: null };
      shader.uniforms.u_hasDepth = { value: 0.0 };
      shader.uniforms.u_invResolution = { value: new THREE.Vector2(1, 1) };
      shader.uniforms.u_cameraNear = { value: 0.1 };
      shader.uniforms.u_cameraFar = { value: 1000.0 };
      shader.uniforms.u_softness = { value: 0.2 };
      shader.uniforms.u_nearFade = { value: new THREE.Vector2(0.4, 1.6) };
      shader.uniforms.u_nearMin = { value: 0.6 };
      (material.userData as PointSpriteUserData).softParticleUniforms = shader.uniforms as PointSpriteSoftUniforms;
    }
  };

  material.customProgramCacheKey = () => {
    const stretchKey = material.defines?.USE_VELOCITY_STRETCH ? 'stretch' : 'base';
    const softKey = material.defines?.USE_SOFT_PARTICLES ? 'soft' : 'nosoft';
    return `points_softsprite_attr_v6_${stretchKey}_${softKey}`;
  };
}
