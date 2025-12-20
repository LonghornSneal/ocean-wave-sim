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

export type OceanLodParams = {
  fadeNear_m: number;
  fadeFar_m: number;
  wavelengthLong_m: number;
  wavelengthShort_m: number;
  lowBoost: number;
};

export const oceanLodForQuality = (q: AppParams['quality']): OceanLodParams => {
  if (q === 'Low') {
    return {
      fadeNear_m: 350,
      fadeFar_m: 1400,
      wavelengthLong_m: 150,
      wavelengthShort_m: 60,
      lowBoost: 1.12
    };
  }
  if (q === 'Medium') {
    return {
      fadeNear_m: 500,
      fadeFar_m: 2000,
      wavelengthLong_m: 120,
      wavelengthShort_m: 48,
      lowBoost: 1.08
    };
  }
  if (q === 'High') {
    return {
      fadeNear_m: 650,
      fadeFar_m: 2600,
      wavelengthLong_m: 100,
      wavelengthShort_m: 40,
      lowBoost: 1.05
    };
  }
  return {
    fadeNear_m: 800,
    fadeFar_m: 3200,
    wavelengthLong_m: 90,
    wavelengthShort_m: 36,
    lowBoost: 1.03
  };
};

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
