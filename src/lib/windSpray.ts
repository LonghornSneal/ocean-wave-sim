import * as THREE from 'three';
import { clamp, lerp } from './math';
import { mulberry32 } from './prng';

export interface WindSprayUpdate {
  dt_s: number;
  time_s: number;
  center: THREE.Vector3;
  surfaceY: number;
  windDirTo_rad: number;
  windSpeed_mps: number;
  gustiness: number;
  storminess: number;
  visible: boolean;
}

export class WindSpray {
  public readonly points: THREE.Points;

  private readonly rng = mulberry32(991771);
  private readonly max = 520;
  private readonly pos: Float32Array;
  private readonly vel: Float32Array;
  private readonly life: Float32Array;
  private readonly geo: THREE.BufferGeometry;
  private idx = 0;

  private gustTimer_s = 0;
  private gustActive_s = 0;
  private gustStrength = 0;

  constructor() {
    this.pos = new Float32Array(this.max * 3);
    this.vel = new Float32Array(this.max * 3);
    this.life = new Float32Array(this.max);

    this.geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(this.pos, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('position', posAttr);

    const mat = new THREE.PointsMaterial({
      color: new THREE.Color('#e6f4ff'),
      size: 0.12,
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

  public update(u: WindSprayUpdate): void {
    const dt = u.dt_s;
    const mat = this.points.material as THREE.PointsMaterial;

    if (!u.visible) {
      this.points.visible = false;
      mat.opacity = 0.0;
      return;
    }
    this.points.visible = true;

    // Sporadic gust pulses.
    this.gustTimer_s -= dt;
    this.gustActive_s = Math.max(0, this.gustActive_s - dt);
    if (this.gustTimer_s <= 0) {
      this.gustTimer_s = lerp(0.35, 1.45, this.rng());
      this.gustActive_s = lerp(0.18, 0.55, this.rng());
      this.gustStrength = lerp(0.35, 1.0, this.rng()) * clamp(u.gustiness + u.storminess * 0.5, 0, 1);
    }

    const gust = this.gustActive_s > 0 ? this.gustStrength : 0.0;
    const wind01 = clamp(u.windSpeed_mps / 26, 0, 1);
    const storm = clamp(u.storminess, 0, 1);

    const rate = lerp(6, 90, wind01) * (0.35 + 0.65 * (u.gustiness + gust)) * (0.45 + 0.55 * storm);
    const spawnN = Math.min(20, Math.floor(rate * dt));

    const toX = Math.cos(u.windDirTo_rad);
    const toZ = Math.sin(u.windDirTo_rad);
    const sideX = -toZ;
    const sideZ = toX;

    for (let i = 0; i < spawnN; i++) {
      this.spawn(u.center, u.surfaceY, toX, toZ, sideX, sideZ, wind01, gust, storm);
    }

    let any = false;
    for (let i = 0; i < this.max; i++) {
      if (this.life[i] <= 0) continue;
      any = true;
      this.life[i] -= dt;
      const ix = i * 3;
      // Gravity + slight wind lift.
      this.vel[ix + 1] -= (6.0 - 2.5 * gust) * dt;
      this.vel[ix + 0] += toX * (0.25 + 0.65 * wind01) * dt;
      this.vel[ix + 2] += toZ * (0.25 + 0.65 * wind01) * dt;

      this.pos[ix + 0] += this.vel[ix + 0] * dt;
      this.pos[ix + 1] += this.vel[ix + 1] * dt;
      this.pos[ix + 2] += this.vel[ix + 2] * dt;

      if (this.pos[ix + 1] < u.surfaceY - 0.1) this.life[i] = 0;
    }

    (this.geo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;

    const targetOpacity = any ? clamp(0.12 + 0.65 * (wind01 * 0.6 + gust * 0.7 + storm * 0.35), 0, 0.85) : 0;
    mat.opacity += (targetOpacity - mat.opacity) * clamp(dt * 3.0, 0, 1);
  }

  private spawn(
    center: THREE.Vector3,
    surfaceY: number,
    toX: number,
    toZ: number,
    sideX: number,
    sideZ: number,
    wind01: number,
    gust: number,
    storm: number
  ): void {
    const i = this.idx++ % this.max;
    this.life[i] = lerp(0.7, 1.6, this.rng()) * (0.55 + 0.45 * wind01);

    const ix = i * 3;
    const along = lerp(6, 26, this.rng()) * (0.55 + 0.45 * wind01);
    const side = (this.rng() * 2 - 1) * lerp(4, 14, this.rng());
    const lift = lerp(0.05, 0.55, this.rng()) + storm * 0.15;

    this.pos[ix + 0] = center.x + toX * along + sideX * side;
    this.pos[ix + 1] = surfaceY + lift;
    this.pos[ix + 2] = center.z + toZ * along + sideZ * side;

    const up = lerp(1.2, 4.8, this.rng()) * (0.4 + 0.6 * storm) * (0.65 + 0.35 * gust);
    const lateral = lerp(2.0, 8.0, this.rng()) * (0.35 + 0.65 * wind01) * (0.6 + 0.4 * gust);

    this.vel[ix + 0] = toX * lateral + sideX * (this.rng() * 2 - 1) * 0.6;
    this.vel[ix + 1] = up;
    this.vel[ix + 2] = toZ * lateral + sideZ * (this.rng() * 2 - 1) * 0.6;
  }
}
