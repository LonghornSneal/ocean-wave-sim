import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { OtterAppearanceMode } from '../otter';
import { loadGltfCached } from './loader';
import { applyOtterMaterials, type WetMaterialEntry } from './materials';
import { disposeObject3D } from './utils';

export function loadOtterModel(opts: {
  loader: GLTFLoader;
  url: string;
  ticket: number;
  isTicketCurrent: (ticket: number) => boolean;
  onLoaded: (gltf: GLTF) => void;
  onError: (err: unknown, url: string) => void;
}): void {
  loadGltfCached(opts.loader, opts.url)
    .then((gltf) => {
      if (!opts.isTicketCurrent(opts.ticket)) return;
      opts.onLoaded(gltf);
    })
    .catch((err) => {
      opts.onError(err, opts.url);
    });
}

export function applyOtterModel(opts: {
  gltf: GLTF;
  mode: OtterAppearanceMode;
  wantFur: boolean;
  group: THREE.Group;
  prevModel: THREE.Object3D | null;
  wetMats: WetMaterialEntry[];
  wetness: number;
  tmpWetCol: THREE.Color;
}): { model: THREE.Object3D; furObj: THREE.Object3D | null } {
  const { gltf, mode, wantFur, group, prevModel, wetMats, wetness, tmpWetCol } = opts;

  if (prevModel) {
    group.remove(prevModel);
  }

  // Remove placeholder (if any)
  const ph = group.getObjectByName('__placeholder');
  if (ph) {
    group.remove(ph);
    disposeObject3D(ph);
  }

  const scene = gltf.scene;
  scene.name = 'otterModel';

  // Rotate so its +Z becomes world +X (matches bodyForward basis).
  scene.rotation.y = -Math.PI / 2;

  // Global scale tweak by LOD.
  const s = mode === 'Low' ? 0.48 : mode === 'Medium' ? 0.50 : 0.52;
  scene.scale.setScalar(s);

  group.add(scene);

  const furObj = scene.getObjectByName('fur') || null;
  if (furObj) furObj.visible = wantFur;

  applyOtterMaterials({ model: scene, mode, wetMats, wetness, tmpWetCol });

  return { model: scene, furObj };
}
