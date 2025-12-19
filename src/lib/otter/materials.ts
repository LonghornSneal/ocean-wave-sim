import * as THREE from 'three';
import { clamp, lerp } from '../math';
import type { OtterAppearanceMode } from '../otter';

export interface WetMaterialEntry {
  mat: THREE.MeshPhysicalMaterial;
  dryColor: THREE.Color;
  dryRoughness: number;
  dryClearcoat: number;
  dryClearcoatRoughness: number;
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
    const furColor = new THREE.Color(low ? '#6a4a2b' : (hi ? '#62462b' : '#5a4028'));
    const furShellColor = new THREE.Color('#6f5232');
    const eyeColor = new THREE.Color('#0a0a0a');
    const whiskerColor = new THREE.Color('#d9d1c5');

    furMat = new THREE.MeshPhysicalMaterial({
      color: furColor,
      roughness: low ? 0.96 : 0.92,
      metalness: 0.0,
      clearcoat: 0.10,
      clearcoatRoughness: 0.40,
      sheen: hi ? 1.0 : 0.75,
      sheenRoughness: 0.86,
      sheenColor: new THREE.Color('#caa46a')
    });
    furMat.flatShading = low;

    if (mid) {
      applyFurRimCheat(furMat, new THREE.Color('#e7c89a'), 0.22, 2.2);
    } else if (hi) {
      // Subtle rim so the otter stays readable against bright water/sky.
      applyFurRimCheat(furMat, new THREE.Color('#e7c89a'), 0.12, 2.6);
    }

    furShellMat = new THREE.MeshPhysicalMaterial({
      color: furShellColor,
      roughness: 0.98,
      metalness: 0.0,
      clearcoat: 0.05,
      clearcoatRoughness: 0.55,
      sheen: 0.9,
      sheenRoughness: 0.92,
      sheenColor: new THREE.Color('#caa46a')
    });
    furShellMat.flatShading = low;

    eyeMat = new THREE.MeshStandardMaterial({
      color: eyeColor,
      roughness: 0.55,
      metalness: 0.0
    });
    (eyeMat as any).flatShading = low;

    whiskMat = new THREE.MeshStandardMaterial({
      color: whiskerColor,
      roughness: 0.8,
      metalness: 0.0
    });

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
  wetMats.push({
    mat: furMat,
    dryColor: furMat.color.clone(),
    dryRoughness: furMat.roughness,
    dryClearcoat: furMat.clearcoat,
    dryClearcoatRoughness: furMat.clearcoatRoughness
  });
  if (hi) {
    wetMats.push({
      mat: furShellMat,
      dryColor: furShellMat.color.clone(),
      dryRoughness: furShellMat.roughness,
      dryClearcoat: furShellMat.clearcoat,
      dryClearcoatRoughness: furShellMat.clearcoatRoughness
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
    tmpWetCol.copy(e.dryColor).multiplyScalar(0.72);
    e.mat.color.copy(e.dryColor).lerp(tmpWetCol, ww);
    e.mat.roughness = lerp(e.dryRoughness, 0.38, ww);
    e.mat.clearcoat = lerp(e.dryClearcoat, 0.62, ww);
    e.mat.clearcoatRoughness = lerp(e.dryClearcoatRoughness, 0.18, ww);
  }
}

function applyFurRimCheat(
  mat: THREE.MeshPhysicalMaterial,
  rimColor: THREE.Color,
  strength: number,
  power: number
): void {
  mat.onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
    shader.uniforms.u_rimColor = { value: rimColor };
    shader.uniforms.u_rimStrength = { value: strength };
    shader.uniforms.u_rimPower = { value: power };

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
       uniform vec3 u_rimColor;
       uniform float u_rimStrength;
       uniform float u_rimPower;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <opaque_fragment>',
      `float _rim = pow(1.0 - saturate(dot(normalize(normal), normalize(vViewPosition))), u_rimPower);
       outgoingLight += u_rimColor * (u_rimStrength * _rim);
       #include <opaque_fragment>`
    );
  };

  mat.customProgramCacheKey = () => `otter_fur_rim_${strength.toFixed(3)}_${power.toFixed(3)}`;
}
