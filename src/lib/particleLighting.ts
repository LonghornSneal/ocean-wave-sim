import * as THREE from 'three';
import { PARTICLE_NORMAL_TEX } from './waterParticleTextures';

type ParticleMeshSunUniforms = {
  u_sunDir: { value: THREE.Vector3 };
  u_sunIntensity: { value: number };
  u_sunset: { value: number };
  u_particleNormalMap: { value: THREE.Texture };
};

type ParticleMeshSunData = {
  sunDir: THREE.Vector3;
  sunIntensity: number;
  sunset: number;
  uniforms?: ParticleMeshSunUniforms;
};

type ParticleMeshUserData = {
  particleSun?: ParticleMeshSunData;
};

function getParticleMeshSunData(material: THREE.MeshBasicMaterial): ParticleMeshSunData {
  const userData = material.userData as ParticleMeshUserData;
  if (!userData.particleSun) {
    userData.particleSun = {
      sunDir: new THREE.Vector3(0, 1, 0),
      sunIntensity: 0,
      sunset: 0
    };
  }
  return userData.particleSun;
}

export function setParticleMeshSun(
  material: THREE.MeshBasicMaterial,
  u: { sunDir: THREE.Vector3; sunIntensity: number; sunset: number }
): void {
  const data = getParticleMeshSunData(material);
  data.sunDir.copy(u.sunDir).normalize();
  data.sunIntensity = u.sunIntensity;
  data.sunset = u.sunset;

  if (data.uniforms) {
    data.uniforms.u_sunDir.value.copy(data.sunDir);
    data.uniforms.u_sunIntensity.value = data.sunIntensity;
    data.uniforms.u_sunset.value = data.sunset;
  }
}

export function applyMeshParticleLighting(
  material: THREE.MeshBasicMaterial,
  shader: THREE.WebGLProgramParametersWithUniforms
): void {
  const sunData = getParticleMeshSunData(material);
  shader.vertexShader = shader.vertexShader
    .replace(
      '#include <common>',
      `#include <common>
varying vec3 vParticleViewPos;`
    )
    .replace(
      '#include <project_vertex>',
      `#include <project_vertex>
vParticleViewPos = -mvPosition.xyz;`
    );

  shader.fragmentShader = shader.fragmentShader
    .replace(
      '#include <common>',
      `#include <common>
uniform vec3 u_sunDir;
uniform float u_sunIntensity;
uniform float u_sunset;
uniform sampler2D u_particleNormalMap;
varying vec3 vParticleViewPos;`
    )
    .replace(
      'vec3 outgoingLight = reflectedLight.indirectDiffuse;',
      `vec3 outgoingLight = reflectedLight.indirectDiffuse;
vec3 viewDir = normalize(vParticleViewPos);
vec3 sunDir = normalize((viewMatrix * vec4(u_sunDir, 0.0)).xyz);
vec2 normalUv = vec2(0.5);
#ifdef USE_ALPHAMAP
  normalUv = vAlphaMapUv;
#elif defined(USE_MAP)
  normalUv = vMapUv;
#elif defined(USE_UV)
  normalUv = vUv;
#endif
vec3 n = texture2D(u_particleNormalMap, normalUv).xyz * 2.0 - 1.0;
n = normalize(n);
float ndotv = clamp(dot(n, viewDir), 0.0, 1.0);
float ndotl = clamp(dot(n, sunDir), 0.0, 1.0);
vec3 halfDir = normalize(sunDir + viewDir);
float spec = pow(clamp(dot(n, halfDir), 0.0, 1.0), 28.0) * ndotl;
float fresnel = pow(1.0 - ndotv, 3.0);
float sunI = clamp(u_sunIntensity, 0.0, 1.0);
vec3 warm = vec3(1.08, 0.92, 0.80);
vec3 cool = vec3(0.78, 0.88, 1.08);
vec3 highlightCol = mix(cool, warm, clamp(u_sunset, 0.0, 1.0));
float highlight = (spec * 0.85 + fresnel * (0.2 + 0.8 * ndotl)) * sunI;
outgoingLight += highlightCol * highlight * diffuseColor.a;`
    );

  shader.uniforms.u_sunDir = { value: sunData.sunDir.clone() };
  shader.uniforms.u_sunIntensity = { value: sunData.sunIntensity };
  shader.uniforms.u_sunset = { value: sunData.sunset };
  shader.uniforms.u_particleNormalMap = { value: PARTICLE_NORMAL_TEX };
  sunData.uniforms = shader.uniforms as ParticleMeshSunUniforms;
}
