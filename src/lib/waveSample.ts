import * as THREE from 'three';
import type { WaveComponent } from './spectrum';

export interface WaveSample {
  height_m: number;
  normal: THREE.Vector3;
  disp: THREE.Vector3;
  slope: number;
}

/**
 * Sample the exact same Gerstner stack used in the ocean shader at a world position.
 * This is used for the sea otter + splash particles.
 */
export function sampleGerstner(
  waves: WaveComponent[],
  worldXZ: THREE.Vector2,
  time_s: number,
  currentXZ: THREE.Vector2,
  tideHeight_m: number,
  out: WaveSample = {
    height_m: 0,
    normal: new THREE.Vector3(),
    disp: new THREE.Vector3(),
    slope: 0
  },
  tmpT: THREE.Vector3 = new THREE.Vector3(),
  tmpB: THREE.Vector3 = new THREE.Vector3()
): WaveSample {
  const disp = out.disp;
  disp.set(0, 0, 0);


  // Partial derivatives for normal reconstruction (matches shader)
  let dxdx = 0.0;
  let dxdz = 0.0;
  let dzdx = 0.0;
  let dzdz = 0.0;
  let dydx = 0.0;
  let dydz = 0.0;

  for (let i = 0; i < waves.length; i++) {
    const w = waves[i];
    const dirX = w.dirX;
    const dirZ = w.dirZ;
    const A = w.A;
    const k = w.k;
    const omega = w.omega;
    const phase0 = w.phase;
    const Q = w.Q;

    const dotCur = dirX * currentXZ.x + dirZ * currentXZ.y;
    const ww = omega + k * dotCur;
    const theta = k * (dirX * worldXZ.x + dirZ * worldXZ.y) - ww * time_s + phase0;

    const s = Math.sin(theta);
    const c = Math.cos(theta);

    disp.y += A * s;
    disp.x += dirX * (Q * A * c);
    disp.z += dirZ * (Q * A * c);

    const WAk = Q * A * k;

    dxdx += -dirX * dirX * WAk * s;
    dxdz += -dirX * dirZ * WAk * s;
    dzdx += -dirZ * dirX * WAk * s;
    dzdz += -dirZ * dirZ * WAk * s;

    dydx += A * k * dirX * c;
    dydz += A * k * dirZ * c;
  }

  const height = disp.y + tideHeight_m;

  tmpT.set(1.0 + dxdx, dydx, dzdx);
  tmpB.set(dxdz, dydz, 1.0 + dzdz);
  out.normal.crossVectors(tmpB, tmpT).normalize();

  out.slope = 1.0 - out.normal.y;
  out.height_m = height;

  return out;
}
