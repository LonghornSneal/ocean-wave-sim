import * as THREE from 'three';
import { clamp } from './math';
import { mulberry32 } from './prng';

export interface SplashUpdate {
  dt_s: number;
  origin: THREE.Vector3;
  surfaceY: number;
  slope: number; // 0..1+
  intensity: number; // 0..1
  windDirTo_rad: number;
  /** 0..1. Bias spawn toward the otter body for spray. */
  sprayBias01?: number;
}

export class SplashSystem {
  public readonly points: THREE.Points;
  private readonly rng = mulberry32(340001);

  private max = 220;
  private pos: Float32Array;
  private vel: Float32Array;
  private life: Float32Array;
  private geo: THREE.BufferGeometry;
  private idx = 0;

  constructor() {
    this.pos = new Float32Array(this.max * 3);
    this.vel = new Float32Array(this.max * 3);
    this.life = new Float32Array(this.max);

    this.geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(this.pos, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('position', posAttr);
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color('#ffffff'),
      size: 0.08,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.points = new THREE.Points(this.geo, mat);
    this.points.frustumCulled = false;
  }

  public dispose(): void {
    this.geo.dispose();
    (this.points.material as THREE.Material).dispose();
  }

  public update(u: SplashUpdate): void {
    const dt = u.dt_s;
    const mat = this.points.material as THREE.PointsMaterial;

    // Spawn rate based on steepness & intensity.
    const s = clamp((u.slope - 0.22) / 0.35, 0, 1);
    const spray = clamp(u.sprayBias01 ?? 0, 0, 1);
    const rate = (s * s) * lerp(10, 75, u.intensity) * (0.7 + 0.6 * spray); // particles per second

    const toX = Math.cos(u.windDirTo_rad);
    const toZ = Math.sin(u.windDirTo_rad);

    const bodyY = Math.max(u.surfaceY + 0.05, u.origin.y + 0.12);
    const spawnY = lerp(u.surfaceY + 0.05, bodyY, spray);
    const spawnN = Math.min(14, Math.floor(rate * dt));
    for (let i = 0; i < spawnN; i++) this.spawn(u.origin, spawnY, u.surfaceY, toX, toZ, u.intensity, spray);

    // Update all particles
    let any = false;
    for (let i = 0; i < this.max; i++) {
      if (this.life[i] <= 0) continue;
      any = true;
      this.life[i] -= dt;
      const ix = i * 3;
      // Gravity
      this.vel[ix + 1] -= 9.81 * dt;
      // Integrate
      this.pos[ix + 0] += this.vel[ix + 0] * dt;
      this.pos[ix + 1] += this.vel[ix + 1] * dt;
      this.pos[ix + 2] += this.vel[ix + 2] * dt;
      // Kill if below surface
      if (this.pos[ix + 1] < u.surfaceY - 0.1) this.life[i] = 0;
    }
    (this.geo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;

    const targetOpacity = any ? clamp(0.15 + 0.55 * u.intensity, 0, 0.85) : 0;
    mat.opacity += (targetOpacity - mat.opacity) * clamp(dt * 3.0, 0, 1);
  }

  private spawn(origin: THREE.Vector3, spawnY: number, surfaceY: number, toX: number, toZ: number, intensity: number, spray: number): void {
    const i = this.idx++ % this.max;
    this.life[i] = lerp(0.6, 1.4, this.rng()) * (0.6 + 0.4 * intensity);

    const ix = i * 3;
    const r = (this.rng() * 2 - 1) * 0.65;
    const r2 = (this.rng() * 2 - 1) * 0.65;
    this.pos[ix + 0] = origin.x + r;
    this.pos[ix + 1] = spawnY + (this.rng() * 2 - 1) * 0.06 * spray;
    this.pos[ix + 2] = origin.z + r2;

    // Eject up and slightly downwind
    const up = lerp(1.8, 6.5, this.rng()) * (0.5 + 0.5 * intensity);
    const lateral = lerp(0.2, 2.4, this.rng()) * intensity;
    this.vel[ix + 0] = toX * lateral + (this.rng() * 2 - 1) * 0.35;
    this.vel[ix + 1] = up;
    this.vel[ix + 2] = toZ * lateral + (this.rng() * 2 - 1) * 0.35;
  }
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
