import * as THREE from 'three';
import { clamp, lerp } from '../math';
import type { OtterAppearanceMode } from '../otter';

export interface WetMaterialEntry {
  mat: THREE.MeshPhysicalMaterial;
  dryColor: THREE.Color;
  dryRoughness: number;
  wetRoughness: number;
  dryClearcoat: number;
  dryClearcoatRoughness: number;
  rainUniforms?: OtterRainUniforms;
}

type OtterMapMaterial = THREE.MeshStandardMaterial & Partial<THREE.MeshPhysicalMaterial>;

type OtterRainUniforms = {
  u_rainPulse: { value: number };
  u_rainTime: { value: number };
};

type OtterRimSettings = { color: THREE.Color; strength: number; power: number } | null;

const WET_COLOR_SCALE = 0.62;
const WET_CLEARCOAT_TARGET = 0.70;
const WET_CLEARCOAT_ROUGHNESS_TARGET = 0.12;
const RIM_COLOR = new THREE.Color('#e7c89a');

function ensureSrgbTexture(texture: THREE.Texture | null | undefined): void {
  if (!texture) return;
  if (texture.colorSpace !== THREE.SRGBColorSpace) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }
}

function copyMaterialMaps(target: OtterMapMaterial, source?: OtterMapMaterial | null): void {
  if (!source) return;

  if (source.map) {
    target.map = source.map;
    ensureSrgbTexture(target.map);
  }

  if (source.emissiveMap) {
    target.emissiveMap = source.emissiveMap;
    target.emissive.copy(source.emissive);
    target.emissiveIntensity = source.emissiveIntensity;
    ensureSrgbTexture(target.emissiveMap);
  }

  if (source.normalMap) {
    target.normalMap = source.normalMap;
    target.normalScale.copy(source.normalScale);
    target.normalMapType = source.normalMapType;
  }

  if (source.roughnessMap) target.roughnessMap = source.roughnessMap;
  if (source.metalnessMap) target.metalnessMap = source.metalnessMap;

  if (source.aoMap) {
    target.aoMap = source.aoMap;
    target.aoMapIntensity = source.aoMapIntensity;
  }

  if (source.alphaMap) target.alphaMap = source.alphaMap;

  if (source.bumpMap) {
    target.bumpMap = source.bumpMap;
    target.bumpScale = source.bumpScale;
  }

  if (source.displacementMap) {
    target.displacementMap = source.displacementMap;
    target.displacementScale = source.displacementScale;
    target.displacementBias = source.displacementBias;
  }

  const targetPhysical = (target as THREE.MeshPhysicalMaterial).isMeshPhysicalMaterial
    ? (target as THREE.MeshPhysicalMaterial)
    : null;
  const sourcePhysical = source as THREE.MeshPhysicalMaterial;

  if (targetPhysical) {
    if (sourcePhysical.specularIntensityMap) targetPhysical.specularIntensityMap = sourcePhysical.specularIntensityMap;

    if (sourcePhysical.specularColorMap) {
      targetPhysical.specularColorMap = sourcePhysical.specularColorMap;
      ensureSrgbTexture(targetPhysical.specularColorMap);
    }

    if (sourcePhysical.sheenColorMap) {
      targetPhysical.sheenColorMap = sourcePhysical.sheenColorMap;
      ensureSrgbTexture(targetPhysical.sheenColorMap);
    }

    if (sourcePhysical.sheenRoughnessMap) targetPhysical.sheenRoughnessMap = sourcePhysical.sheenRoughnessMap;
    if (sourcePhysical.clearcoatMap) targetPhysical.clearcoatMap = sourcePhysical.clearcoatMap;
    if (sourcePhysical.clearcoatRoughnessMap) targetPhysical.clearcoatRoughnessMap = sourcePhysical.clearcoatRoughnessMap;

    if (sourcePhysical.clearcoatNormalMap) {
      targetPhysical.clearcoatNormalMap = sourcePhysical.clearcoatNormalMap;
      targetPhysical.clearcoatNormalScale.copy(sourcePhysical.clearcoatNormalScale);
    }

    if (sourcePhysical.anisotropyMap) targetPhysical.anisotropyMap = sourcePhysical.anisotropyMap;
  }
}

function collectSourceMaterials(model: THREE.Object3D): Map<string, OtterMapMaterial> {
  const sources = new Map<string, OtterMapMaterial>();

  model.traverse((o: THREE.Object3D) => {
    const anyO = o as any;
    if (!anyO.isMesh) return;
    const mat = anyO.material as THREE.Material | THREE.Material[];
    const m0 = Array.isArray(mat) ? mat[0] : mat;
    const name = (m0 as any)?.name ?? '';
    if (!name || sources.has(name)) return;
    if ((m0 as any).isMeshStandardMaterial || (m0 as any).isMeshPhysicalMaterial) {
      sources.set(name, m0 as OtterMapMaterial);
    }
  });

  return sources;
}

function resolveBaseColor(source: OtterMapMaterial | null | undefined, fallback: THREE.Color): THREE.Color {
  if (source?.map) return source.color.clone();
  return fallback;
}

export function applyOtterMaterials(opts: {
  model: THREE.Object3D;
  mode: OtterAppearanceMode;
  wetMats: WetMaterialEntry[];
  wetness: number;
  tmpWetCol: THREE.Color;
}): void {
  const { model, mode, wetMats, wetness, tmpWetCol } = opts;
  wetMats.length = 0;

  const low = mode === 'Low';
  const mid = mode === 'Medium';
  const hi = mode === 'High';
  const rimSettings: OtterRimSettings = mid
    ? { color: RIM_COLOR, strength: 0.22, power: 2.2 }
    : (hi ? { color: RIM_COLOR, strength: 0.12, power: 2.6 } : null);

  const userData = (model as any).userData ?? ((model as any).userData = {});
  const cached = userData.otterMaterials as {
    mode: OtterAppearanceMode;
    furMat: THREE.MeshPhysicalMaterial;
    furShellMat: THREE.MeshPhysicalMaterial;
    eyeMat: THREE.MeshStandardMaterial;
    whiskMat: THREE.MeshStandardMaterial;
    furDry: { color: THREE.Color; roughness: number; clearcoat: number; clearcoatRoughness: number };
    furShellDry: { color: THREE.Color; roughness: number; clearcoat: number; clearcoatRoughness: number };
  } | undefined;

  let furMat: THREE.MeshPhysicalMaterial;
  let furShellMat: THREE.MeshPhysicalMaterial;
  let eyeMat: THREE.MeshStandardMaterial;
  let whiskMat: THREE.MeshStandardMaterial;

  if (cached && cached.mode === mode) {
    furMat = cached.furMat;
    furShellMat = cached.furShellMat;
    eyeMat = cached.eyeMat;
    whiskMat = cached.whiskMat;

    furMat.color.copy(cached.furDry.color);
    furMat.roughness = cached.furDry.roughness;
    furMat.clearcoat = cached.furDry.clearcoat;
    furMat.clearcoatRoughness = cached.furDry.clearcoatRoughness;

    furShellMat.color.copy(cached.furShellDry.color);
    furShellMat.roughness = cached.furShellDry.roughness;
    furShellMat.clearcoat = cached.furShellDry.clearcoat;
    furShellMat.clearcoatRoughness = cached.furShellDry.clearcoatRoughness;
  } else {
    // Slightly brighten the high-quality fur so it doesn't collapse into a
    // dark blob on mobile HDR/tone-mapped scenes.
    const sourceMats = collectSourceMaterials(model);
    const furSource = sourceMats.get('Fur') ?? null;
    const furShellSource = sourceMats.get('FurShell') ?? null;
    const eyeSource = sourceMats.get('Eye') ?? null;
    const whiskerSource = sourceMats.get('Whisker') ?? null;

    const furColor = resolveBaseColor(
      furSource,
      new THREE.Color(low ? '#6a4a2b' : (hi ? '#62462b' : '#5a4028'))
    );
    const furShellColor = resolveBaseColor(furShellSource, new THREE.Color('#6f5232'));
    const eyeColor = resolveBaseColor(eyeSource, new THREE.Color('#0a0a0a'));
    const whiskerColor = resolveBaseColor(whiskerSource, new THREE.Color('#d9d1c5'));

    furMat = new THREE.MeshPhysicalMaterial({
      color: furColor,
      roughness: low ? 0.88 : 0.82,
      metalness: 0.0,
      clearcoat: 0.18,
      clearcoatRoughness: 0.28,
      specularIntensity: 1.0,
      sheen: hi ? 1.0 : 0.75,
      sheenRoughness: 0.78,
      sheenColor: new THREE.Color('#caa46a')
    });
    furMat.flatShading = low;
    copyMaterialMaps(furMat, furSource);
    furMat.anisotropy = Math.max(furSource?.anisotropy ?? 0, low ? 0.0 : (hi ? 0.25 : 0.2));
    if (furSource?.anisotropyRotation !== undefined) furMat.anisotropyRotation = furSource.anisotropyRotation;

    furShellMat = new THREE.MeshPhysicalMaterial({
      color: furShellColor,
      roughness: 0.90,
      metalness: 0.0,
      clearcoat: 0.12,
      clearcoatRoughness: 0.32,
      specularIntensity: 0.95,
      sheen: 0.9,
      sheenRoughness: 0.84,
      sheenColor: new THREE.Color('#caa46a')
    });
    furShellMat.flatShading = low;
    copyMaterialMaps(furShellMat, furShellSource);
    furShellMat.anisotropy = Math.max(furShellSource?.anisotropy ?? 0, hi ? 0.18 : 0.0);
    if (furShellSource?.anisotropyRotation !== undefined) {
      furShellMat.anisotropyRotation = furShellSource.anisotropyRotation;
    }

    eyeMat = new THREE.MeshStandardMaterial({
      color: eyeColor,
      roughness: 0.55,
      metalness: 0.0
    });
    (eyeMat as any).flatShading = low;
    copyMaterialMaps(eyeMat, eyeSource);

    whiskMat = new THREE.MeshStandardMaterial({
      color: whiskerColor,
      roughness: 0.8,
      metalness: 0.0
    });
    copyMaterialMaps(whiskMat, whiskerSource);

    userData.otterMaterials = {
      mode,
      furMat,
      furShellMat,
      eyeMat,
      whiskMat,
      furDry: {
        color: furMat.color.clone(),
        roughness: furMat.roughness,
        clearcoat: furMat.clearcoat,
        clearcoatRoughness: furMat.clearcoatRoughness
      },
      furShellDry: {
        color: furShellMat.color.clone(),
        roughness: furShellMat.roughness,
        clearcoat: furShellMat.clearcoat,
        clearcoatRoughness: furShellMat.clearcoatRoughness
      }
    };
  }

  // Register wetness-driven materials (fur + shell)
  const furRain = applyOtterFurShader(furMat, rimSettings);
  const furShellRain = hi ? applyOtterFurShader(furShellMat, null) : null;

  wetMats.push({
    mat: furMat,
    dryColor: furMat.color.clone(),
    dryRoughness: furMat.roughness,
    wetRoughness: low ? 0.30 : 0.26,
    dryClearcoat: furMat.clearcoat,
    dryClearcoatRoughness: furMat.clearcoatRoughness,
    rainUniforms: furRain
  });
  if (hi) {
    wetMats.push({
      mat: furShellMat,
      dryColor: furShellMat.color.clone(),
      dryRoughness: furShellMat.roughness,
      wetRoughness: 0.32,
      dryClearcoat: furShellMat.clearcoat,
      dryClearcoatRoughness: furShellMat.clearcoatRoughness,
      rainUniforms: furShellRain ?? undefined
    });
  }

  // Apply to meshes based on original material names.
  model.traverse((o: THREE.Object3D) => {
    const anyO = o as any;
    if (!anyO.isMesh) return;
    const mat = anyO.material as THREE.Material | THREE.Material[];
    const m0 = Array.isArray(mat) ? mat[0] : mat;
    const name = (m0 as any)?.name ?? '';

    if (name === 'Eye') anyO.material = eyeMat;
    else if (name === 'Whisker') anyO.material = whiskMat;
    else if (name === 'FurShell') anyO.material = furShellMat;
    else anyO.material = furMat;
  });

  // Apply current wetness immediately.
  applyOtterWetness({ wetMats, wetness, tmpWetCol });
}

export function applyOtterWetness(opts: {
  wetMats: WetMaterialEntry[];
  wetness: number;
  tmpWetCol: THREE.Color;
}): void {
  const { wetMats, wetness, tmpWetCol } = opts;
  if (!wetMats.length) return;
  const ww = clamp(Math.pow(wetness, 1.18), 0, 1);

  for (const e of wetMats) {
    tmpWetCol.copy(e.dryColor).multiplyScalar(WET_COLOR_SCALE);
    e.mat.color.copy(e.dryColor).lerp(tmpWetCol, ww);
    e.mat.roughness = lerp(e.dryRoughness, e.wetRoughness, ww);
    e.mat.clearcoat = lerp(e.dryClearcoat, WET_CLEARCOAT_TARGET, ww);
    e.mat.clearcoatRoughness = lerp(e.dryClearcoatRoughness, WET_CLEARCOAT_ROUGHNESS_TARGET, ww);
  }
}

export function applyOtterRainFx(opts: {
  wetMats: WetMaterialEntry[];
  rainPulse: number;
  time_s: number;
}): void {
  const { wetMats, rainPulse, time_s } = opts;
  if (!wetMats.length) return;
  const pulse = clamp(rainPulse, 0, 1);

  for (const e of wetMats) {
    if (!e.rainUniforms) continue;
    e.rainUniforms.u_rainPulse.value = pulse;
    e.rainUniforms.u_rainTime.value = time_s;
  }
}

function applyOtterFurShader(
  mat: THREE.MeshPhysicalMaterial,
  rim: OtterRimSettings
): OtterRainUniforms {
  const rainUniforms: OtterRainUniforms = {
    u_rainPulse: { value: 0 },
    u_rainTime: { value: 0 }
  };

  mat.onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
    shader.uniforms.u_rainPulse = rainUniforms.u_rainPulse;
    shader.uniforms.u_rainTime = rainUniforms.u_rainTime;
    if (rim) {
      shader.uniforms.u_rimColor = { value: rim.color };
      shader.uniforms.u_rimStrength = { value: rim.strength };
      shader.uniforms.u_rimPower = { value: rim.power };
    }

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
       uniform float u_rainPulse;
       uniform float u_rainTime;
       ${rim ? 'uniform vec3 u_rimColor; uniform float u_rimStrength; uniform float u_rimPower;' : ''}
       float otterHash12(vec2 p) {
         vec3 p3 = fract(vec3(p.xyx) * 0.1031);
         p3 += dot(p3, p3.yzx + 33.33);
         return fract((p3.x + p3.y) * p3.z);
       }`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <normal_fragment_maps>',
      `#include <normal_fragment_maps>
       vec3 otterUpView = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
       float otterTop = clamp(dot(normal, otterUpView), 0.0, 1.0);
       float otterRainPulse = clamp(u_rainPulse, 0.0, 1.0);
       float otterRainMask = smoothstep(0.15, 0.9, otterTop) * otterRainPulse;
       diffuseColor.rgb *= 1.0 - otterRainMask * 0.22;
       roughnessFactor = mix(roughnessFactor, max(0.045, roughnessFactor * 0.35), otterRainMask);`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <opaque_fragment>',
      `float otterSparkle = 0.0;
       if (otterRainMask > 0.001) {
         vec2 otterSparkleUv = gl_FragCoord.xy * 0.55 + vec2(u_rainTime * 37.0, u_rainTime * -29.0);
         float otterSparkleNoise = otterHash12(otterSparkleUv);
         float otterSparkleMask = smoothstep(0.986, 1.0, otterSparkleNoise);
         otterSparkle = otterSparkleMask * otterRainMask;
       }
       outgoingLight += otterSparkle * vec3(0.7, 0.78, 0.88) * 0.35;
       ${rim ? 'float _rim = pow(1.0 - saturate(dot(normalize(normal), normalize(vViewPosition))), u_rimPower);\n       outgoingLight += u_rimColor * (u_rimStrength * _rim);' : ''}
       #include <opaque_fragment>`
    );
  };

  const rimKey = rim ? `rim_${rim.strength.toFixed(3)}_${rim.power.toFixed(3)}` : 'norim';
  mat.customProgramCacheKey = () => `otter_fur_${rimKey}_rain_v1`;
  mat.needsUpdate = true;
  return rainUniforms;
}
