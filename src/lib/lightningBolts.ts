import * as THREE from 'three';
import { clamp, lerp } from './math';
import { mulberry32 } from './prng';

export type LightningBoltType = 'cloud' | 'ground';

export interface LightningSpawn {
  cameraPos: THREE.Vector3;
  flashDir: THREE.Vector3;
  storminess: number; // 0..1
  waterLevel: number;
  type?: LightningBoltType;
}

export interface LightningUpdate {
  dt_s: number;
}

type Bolt = {
  line: THREE.Line;
  impact: THREE.Mesh | null;
  life_s: number;
  age_s: number;
  active: boolean;
};

export class LightningBolts {
  public readonly group = new THREE.Group();

  private readonly rng = mulberry32(552901);
  private readonly bolts: Bolt[] = [];
  private readonly boltCount = 8;
  private readonly segments = 12;

  // Reusable temps
  private readonly tmpDir = new THREE.Vector3();
  private readonly tmpStart = new THREE.Vector3();
  private readonly tmpEnd = new THREE.Vector3();
  private readonly tmpUp = new THREE.Vector3();
  private readonly tmpRight = new THREE.Vector3();
  private readonly tmpPerp = new THREE.Vector3();
  private readonly tmpPos = new THREE.Vector3();

  constructor() {
    this.group.name = 'LightningBolts';
    const points = this.segments + 1;

    for (let i = 0; i < this.boltCount; i++) {
      const geom = new THREE.BufferGeometry();
      const positions = new Float32Array(points * 3);
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color('#e6f4ff'),
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending
      });

      const line = new THREE.Line(geom, mat);
      line.frustumCulled = false;
      line.visible = false;
      this.group.add(line);

      const impactGeo = new THREE.CircleGeometry(1.0, 16);
      const impactMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#e6f4ff'),
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
      const impact = new THREE.Mesh(impactGeo, impactMat);
      impact.rotation.x = -Math.PI / 2;
      impact.visible = false;
      impact.frustumCulled = false;
      this.group.add(impact);

      this.bolts.push({ line, impact, life_s: 0.0, age_s: 0.0, active: false });
    }
  }

  public dispose(): void {
    for (const b of this.bolts) {
      b.line.geometry.dispose();
      (b.line.material as THREE.Material).dispose();
      b.impact?.geometry.dispose();
      if (b.impact) (b.impact.material as THREE.Material).dispose();
    }
  }

  public spawn(u: LightningSpawn): void {
    const bolt = this.allocBolt();
    if (!bolt) return;

    const storm = clamp(u.storminess, 0, 1);
    const kind: LightningBoltType = u.type ?? (this.rng() < lerp(0.45, 0.7, storm) ? 'ground' : 'cloud');

    const baseYaw = Math.atan2(u.flashDir.z, u.flashDir.x);
    const yaw = baseYaw + (this.rng() * 2 - 1) * lerp(0.35, 0.85, storm);
    const hx = Math.cos(yaw);
    const hz = Math.sin(yaw);

    if (kind === 'ground') {
      const dist = lerp(320, 1200, this.rng());
      const cloudBase = lerp(520, 180, storm) + lerp(-60, 80, this.rng());

      this.tmpStart
        .copy(u.cameraPos)
        .addScaledVector(this.tmpDir.set(hx, 0, hz), dist);
      this.tmpStart.y = u.waterLevel + cloudBase;

      this.tmpEnd.copy(this.tmpStart);
      this.tmpEnd.y = u.waterLevel - 0.25;
    } else {
      const distA = lerp(260, 880, this.rng());
      const distB = distA + lerp(180, 620, this.rng());
      const altA = lerp(240, 560, this.rng()) * lerp(1.0, 0.8, storm);
      const altB = altA + lerp(-120, 140, this.rng());

      const yawB = yaw + (this.rng() * 2 - 1) * lerp(0.6, 1.2, storm);
      const hxB = Math.cos(yawB);
      const hzB = Math.sin(yawB);

      this.tmpStart
        .copy(u.cameraPos)
        .addScaledVector(this.tmpDir.set(hx, 0, hz), distA);
      this.tmpStart.y = u.waterLevel + altA;

      this.tmpEnd
        .copy(u.cameraPos)
        .addScaledVector(this.tmpDir.set(hxB, 0, hzB), distB);
      this.tmpEnd.y = u.waterLevel + altB;
    }

    this.writeBoltGeometry(bolt.line.geometry as THREE.BufferGeometry, this.tmpStart, this.tmpEnd, kind);

    bolt.line.visible = true;
    const lineMat = bolt.line.material as THREE.LineBasicMaterial;
    lineMat.opacity = 1.0;

    if (bolt.impact) {
      if (kind === 'ground') {
        bolt.impact.visible = true;
        bolt.impact.position.set(this.tmpEnd.x, u.waterLevel + 0.02, this.tmpEnd.z);
        const scale = lerp(12, 32, this.rng()) * lerp(0.7, 1.1, storm);
        bolt.impact.scale.setScalar(scale);
        (bolt.impact.material as THREE.MeshBasicMaterial).opacity = 0.85;
      } else {
        bolt.impact.visible = false;
      }
    }

    bolt.life_s = lerp(0.16, 0.28, this.rng()) * (kind === 'ground' ? 1.2 : 0.9);
    bolt.age_s = 0.0;
    bolt.active = true;
  }

  public update(u: LightningUpdate): void {
    const dt = u.dt_s;
    for (const bolt of this.bolts) {
      if (!bolt.active) continue;
      bolt.age_s += dt;
      const t = bolt.age_s / Math.max(1e-6, bolt.life_s);
      if (t >= 1.0) {
        bolt.active = false;
        bolt.line.visible = false;
        if (bolt.impact) bolt.impact.visible = false;
        continue;
      }

      const fade = clamp(1.0 - t, 0, 1);
      const lineMat = bolt.line.material as THREE.LineBasicMaterial;
      lineMat.opacity = fade;
      if (bolt.impact) {
        const mat = bolt.impact.material as THREE.MeshBasicMaterial;
        mat.opacity = fade * 0.8;
      }
    }
  }

  private allocBolt(): Bolt | null {
    for (const b of this.bolts) {
      if (!b.active) return b;
    }
    // Reuse the oldest active bolt if all are in use.
    let oldest: Bolt | null = null;
    let age = -1;
    for (const b of this.bolts) {
      if (b.age_s > age) {
        age = b.age_s;
        oldest = b;
      }
    }
    return oldest;
  }

  private writeBoltGeometry(geom: THREE.BufferGeometry, start: THREE.Vector3, end: THREE.Vector3, kind: LightningBoltType): void {
    const pos = geom.getAttribute('position') as THREE.BufferAttribute;

    this.tmpDir.subVectors(end, start);
    const len = Math.max(1e-3, this.tmpDir.length());
    this.tmpDir.multiplyScalar(1 / len);

    // Build a local basis for jagged offsets.
    this.tmpUp.set(0, 1, 0);
    if (Math.abs(this.tmpDir.dot(this.tmpUp)) > 0.9) this.tmpUp.set(1, 0, 0);
    this.tmpRight.crossVectors(this.tmpDir, this.tmpUp).normalize();
    this.tmpPerp.crossVectors(this.tmpRight, this.tmpDir).normalize();

    const jagged = kind === 'ground' ? lerp(10, 32, this.rng()) : lerp(16, 38, this.rng());

    for (let i = 0; i <= this.segments; i++) {
      const t = i / this.segments;
      this.tmpPos.copy(start).lerp(end, t);

      const falloff = kind === 'ground' ? (1.0 - t) : Math.sin(Math.PI * t);
      const amp = jagged * falloff * (0.35 + 0.65 * this.rng());
      const jx = (this.rng() * 2 - 1) * amp;
      const jy = (this.rng() * 2 - 1) * amp * 0.55;

      this.tmpPos.addScaledVector(this.tmpRight, jx);
      this.tmpPos.addScaledVector(this.tmpPerp, jy);

      pos.setXYZ(i, this.tmpPos.x, this.tmpPos.y, this.tmpPos.z);
    }

    pos.needsUpdate = true;
  }
}
