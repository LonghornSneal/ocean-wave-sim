import * as THREE from 'three';
import { OceanMaterial } from '../lib/oceanMaterial';
import { FoamField } from '../lib/foamField';
import type { AppParams } from '../lib/ui';

export const segmentsForQuality = (q: AppParams['quality']): number => (
  q === 'Max' ? 340 : (q === 'High' ? 260 : (q === 'Medium' ? 180 : 128))
);

export const foamRTSizeForQuality = (q: AppParams['quality']): number => (
  q === 'Max' ? 512 : (q === 'High' ? 384 : 256)
);

export const foamWorldSizeForQuality = (q: AppParams['quality']): number => (
  q === 'Max' ? 300 : (q === 'High' ? 260 : (q === 'Medium' ? 220 : 180))
);

export function createOceanSurface(renderer: THREE.WebGLRenderer, scene: THREE.Scene, params: AppParams): {
  ocean: THREE.Mesh;
  oceanMat: OceanMaterial;
  foamField: FoamField;
} {
  const oceanGeo = new THREE.PlaneGeometry(12000, 12000, segmentsForQuality(params.quality), segmentsForQuality(params.quality));
  oceanGeo.rotateX(-Math.PI / 2);

  const oceanMat = new OceanMaterial({
    waterColor: new THREE.Color('#0a2a3a'),
    // Foam / choppiness are derived from weather & sea-state now (not direct inputs).
    foamIntensity: 1.1,
    foamSlopeStart: 0.18,
    foamSlopeEnd: 0.62,
    capillaryStrength: params.capillaryStrength,
    waves: []
  });

  const ocean = new THREE.Mesh(oceanGeo, oceanMat.material);
  ocean.frustumCulled = false;
  scene.add(ocean);

  const foamField = new FoamField(renderer, {
    size: foamRTSizeForQuality(params.quality),
    worldSize_m: foamWorldSizeForQuality(params.quality)
  });

  return { ocean, oceanMat, foamField };
}
