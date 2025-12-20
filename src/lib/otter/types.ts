import type * as THREE from 'three';

export type RigNodes = {
  body?: THREE.Object3D;
  neck?: THREE.Object3D;
  head?: THREE.Object3D;
  tail?: THREE.Object3D;
  flipperL?: THREE.Object3D;
  flipperR?: THREE.Object3D;
  eyeL?: THREE.Object3D;
  eyeR?: THREE.Object3D;
  whiskers?: THREE.Object3D;
};
