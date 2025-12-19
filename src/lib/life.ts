import * as THREE from 'three';
import { clamp, lerp } from './math';
import { mulberry32 } from './prng';

export type Biome = 'Tropical' | 'Temperate' | 'Polar';

export function biomeFor(latitude_deg: number, waterTemp_C: number): Biome {
  const absLat = Math.abs(latitude_deg);
  if (waterTemp_C >= 23 && absLat < 38) return 'Tropical';
  if (absLat > 60 || waterTemp_C < 4) return 'Polar';
  return 'Temperate';
}

export interface LifeParams {
  biome: Biome;
  coastProximity: number; // 0..1
  exoticEncounters: number; // 0..1
}

export interface LifeUpdate {
  dt_s: number;
  time_s: number;
  otterPos: THREE.Vector3;
  surfaceY: number;
  nightFactor: number; // 0..1
  storminess: number; // 0..1
}

/**
 * Lightweight procedural undersea life.
 * (Heuristic, but looks believable in motion.)
 */
export class OceanLife {
  public readonly group = new THREE.Group();

  private readonly rng = mulberry32(920155);
  private params: LifeParams;

  // Reusable colors (avoid per-frame allocations when biome changes)
  private readonly fishColTropical = new THREE.Color('#6cc6ff');
  private readonly fishColTemperate = new THREE.Color('#a7b2c9');
  private readonly fishColPolar = new THREE.Color('#c9d6ff');

  private fish: THREE.InstancedMesh;
  private fishCount: number;
  private fishPos: THREE.Vector3[];
  private fishVel: THREE.Vector3[];

  private readonly tmpObj = new THREE.Object3D();

  private glow: THREE.Points;
  private glowCount = 260;
  private glowPos: Float32Array;

  // A simple “dolphin breach” prop (surface encounter)
  private dolphin: THREE.Mesh;
  private dolphinTimer_s = 999;
  private dolphinActive_s = 0;

  constructor(params: LifeParams) {
    this.params = params;

    // Fish
    this.fishCount = 240;
    const fishGeo = new THREE.ConeGeometry(0.06, 0.22, 8, 1);
    fishGeo.rotateX(Math.PI * 0.5);
    const fishMat = new THREE.MeshStandardMaterial({
      color: params.biome === 'Tropical' ? new THREE.Color('#6cc6ff') : new THREE.Color('#a7b2c9'),
      roughness: 0.55,
      metalness: 0.05
    });
    this.fish = new THREE.InstancedMesh(fishGeo, fishMat, this.fishCount);
    this.fish.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.group.add(this.fish);

    this.fishPos = [];
    this.fishVel = [];
    for (let i = 0; i < this.fishCount; i++) {
      this.fishPos.push(new THREE.Vector3((this.rng() * 2 - 1) * 18, -2 - this.rng() * 8, (this.rng() * 2 - 1) * 18));
      this.fishVel.push(new THREE.Vector3((this.rng() * 2 - 1) * 0.6, 0, (this.rng() * 2 - 1) * 0.6));
    }

    // Bioluminescent plankton / particles (night only)
    this.glowPos = new Float32Array(this.glowCount * 3);
    for (let i = 0; i < this.glowCount; i++) {
      const ix = i * 3;
      this.glowPos[ix + 0] = (this.rng() * 2 - 1) * 22;
      this.glowPos[ix + 1] = -0.5 - this.rng() * 10;
      this.glowPos[ix + 2] = (this.rng() * 2 - 1) * 22;
    }
    const glowGeo = new THREE.BufferGeometry();
    const glowAttr = new THREE.BufferAttribute(this.glowPos, 3);
    glowAttr.setUsage(THREE.DynamicDrawUsage);
    glowGeo.setAttribute('position', glowAttr);
    const glowMat = new THREE.PointsMaterial({
      color: new THREE.Color('#74f7ff'),
      size: 0.08,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.glow = new THREE.Points(glowGeo, glowMat);
    this.group.add(this.glow);

    // Dolphin (simple stylized mesh)
    const dGeo = new THREE.CapsuleGeometry(0.2, 1.2, 8, 12);
    const dMat = new THREE.MeshStandardMaterial({ color: new THREE.Color('#6f7c8c'), roughness: 0.35, metalness: 0.05 });
    this.dolphin = new THREE.Mesh(dGeo, dMat);
    this.dolphin.visible = false;
    this.group.add(this.dolphin);
  }

  /** Reset transient life state (useful for “New game”). */
  public reset(): void {
    // Re-spawn fish + glow around the origin.
    const depthBase = lerp(2.0, 7.5, clamp(this.params.coastProximity, 0, 1));
    for (let i = 0; i < this.fishCount; i++) {
      this.fishPos[i].set((this.rng() * 2 - 1) * 18, -depthBase - this.rng() * 8, (this.rng() * 2 - 1) * 18);
      this.fishVel[i].set((this.rng() * 2 - 1) * 0.6, 0, (this.rng() * 2 - 1) * 0.6);
    }
    for (let i = 0; i < this.glowCount; i++) {
      const ix = i * 3;
      this.glowPos[ix + 0] = (this.rng() * 2 - 1) * 22;
      this.glowPos[ix + 1] = -0.5 - this.rng() * 10;
      this.glowPos[ix + 2] = (this.rng() * 2 - 1) * 22;
    }
    (this.glow.geometry as THREE.BufferGeometry).getAttribute('position').needsUpdate = true;

    this.dolphin.visible = false;
    this.dolphinTimer_s = 999;
    this.dolphinActive_s = 0;
  }

  public setParams(p: LifeParams): void {
    this.params = p;
    // Update fish tint subtly based on biome.
    const mat = this.fish.material as THREE.MeshStandardMaterial;
    if (p.biome === 'Tropical') mat.color.copy(this.fishColTropical);
    else if (p.biome === 'Polar') mat.color.copy(this.fishColPolar);
    else mat.color.copy(this.fishColTemperate);
  }

  public update(u: LifeUpdate): void {
    const { dt_s: dt, time_s: t } = u;
    const origin = u.otterPos;

    // Fish school swirls gently.
    const swirl = 0.55 + 0.55 * Math.sin(t * 0.22);
    const depthBase = lerp(2.0, 7.5, clamp(this.params.coastProximity, 0, 1));
    const bounds = lerp(22, 14, clamp(this.params.coastProximity, 0, 1));
    const tmp = this.tmpObj;

    for (let i = 0; i < this.fishCount; i++) {
      const p = this.fishPos[i];
      const v = this.fishVel[i];

      // Slight random turn
      v.x += (Math.sin(t * 0.7 + i) * 0.15) * dt;
      v.z += (Math.cos(t * 0.6 + i * 0.7) * 0.15) * dt;

      // Centering force
      v.x += (-p.x / bounds) * 0.18 * dt;
      v.z += (-p.z / bounds) * 0.18 * dt;

      // Speed clamp
      const sp = Math.hypot(v.x, v.z);
      const maxSp = lerp(0.9, 1.6, swirl);
      if (sp > maxSp) {
        v.x = (v.x / sp) * maxSp;
        v.z = (v.z / sp) * maxSp;
      }

      p.x += v.x * dt;
      p.z += v.z * dt;
      p.y = -depthBase - 0.6 * Math.sin(t * 0.9 + i * 0.25) - this.rng() * 0.08;

      // Wrap back into bounds
      if (p.x < -bounds) p.x = bounds;
      if (p.x > bounds) p.x = -bounds;
      if (p.z < -bounds) p.z = bounds;
      if (p.z > bounds) p.z = -bounds;

      // World transform
      const wx = origin.x + p.x;
      const wy = u.surfaceY + p.y;
      const wz = origin.z + p.z;

      tmp.position.set(wx, wy, wz);
      tmp.lookAt(wx + v.x, wy, wz + v.z);
      tmp.updateMatrix();
      this.fish.setMatrixAt(i, tmp.matrix);
    }
    this.fish.instanceMatrix.needsUpdate = true;

    // Glow points follow otter, visible mostly at night.
    const glowMat = this.glow.material as THREE.PointsMaterial;
    glowMat.opacity = lerp(glowMat.opacity, clamp(u.nightFactor * 0.85, 0, 0.85), clamp(dt * 0.8, 0, 1));
    const posAttr = (this.glow.geometry as THREE.BufferGeometry).getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < this.glowCount; i++) {
      const ix = i * 3;
      const x = this.glowPos[ix + 0];
      const y = this.glowPos[ix + 1];
      const z = this.glowPos[ix + 2];
      posAttr.setXYZ(i, origin.x + x, u.surfaceY + y, origin.z + z);
    }
    posAttr.needsUpdate = true;

    // Dolphin breach (surface) — rare, driven by exoticEncounterChance.
    const exotic = clamp(this.params.exoticEncounters, 0, 1);
    this.dolphinTimer_s -= dt;
    if (this.dolphinTimer_s <= 0 && exotic > 0.02) {
      // Chance scales with exotic + calm seas.
      const rate = exotic * lerp(0.0007, 0.00015, u.storminess); // events per second
      if (this.rng() < rate * dt * 60) {
        this.dolphinActive_s = lerp(1.6, 2.8, this.rng());
        this.dolphinTimer_s = lerp(15, 45, 1 - exotic) + this.rng() * 10;

        const ang = this.rng() * Math.PI * 2;
        const r = lerp(8, 22, this.rng());
        this.dolphin.position.set(origin.x + Math.cos(ang) * r, u.surfaceY - 0.4, origin.z + Math.sin(ang) * r);
        this.dolphin.rotation.set(0, ang + Math.PI, 0);
        this.dolphin.visible = true;
      }
    }

    if (this.dolphinActive_s > 0) {
      this.dolphinActive_s -= dt;
      const t01 = 1 - this.dolphinActive_s / 2.4;
      const hop = Math.sin(Math.PI * clamp(t01, 0, 1));
      this.dolphin.position.y = u.surfaceY + hop * 1.25;
      this.dolphin.rotation.x = -Math.PI * 0.15 + hop * Math.PI * 0.35;
      if (this.dolphinActive_s <= 0) this.dolphin.visible = false;
    }
  }
}
