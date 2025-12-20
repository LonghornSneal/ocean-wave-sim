import * as THREE from 'three';
import { clamp, lerp } from './math';
import { mulberry32 } from './prng';
import { enablePointSpriteAttributes, setPointSpriteSun } from './pointSpriteMaterial';
import { DROPLET_TEX, SOFT_SPRITE_ALPHA } from './waterParticleTextures';

export interface WindSprayUpdate {
  dt_s: number;
  time_s: number;
  center: THREE.Vector3;
  surfaceY: number;
  windDirTo_rad: number;
  windSpeed_mps: number;
  gustiness: number;
  storminess: number;
  cloudCover: number;
  sunDir: THREE.Vector3;
  sunIntensity: number;
  sunset: number;
  rogueIntensity?: number;
  visible: boolean;
}

export class WindSpray {
  public readonly points: THREE.Points;

  private readonly rng = mulberry32(991771);
  private readonly max = 520;
  private readonly pos: Float32Array;
  private readonly vel: Float32Array;
  private readonly life: Float32Array;
  private readonly sizes: Float32Array;
  private readonly stretches: Float32Array;
  private readonly opacities: Float32Array;
  private readonly colors: Float32Array;
  private readonly geo: THREE.BufferGeometry;
  private readonly posAttr: THREE.BufferAttribute;
  private readonly velAttr: THREE.BufferAttribute;
  private readonly sizeAttr: THREE.BufferAttribute;
  private readonly stretchAttr: THREE.BufferAttribute;
  private readonly opacityAttr: THREE.BufferAttribute;
  private readonly colorAttr: THREE.BufferAttribute;
  private idx = 0;

  private gustTimer_s = 0;
  private gustActive_s = 0;
  private gustStrength = 0;

  private readonly baseColor = new THREE.Color('#e6f4ff');
  private readonly warmTint = new THREE.Color('#fff1de');
  private readonly coolTint = new THREE.Color('#d6ecff');
  private readonly tmpColor = new THREE.Color();

  constructor() {
    this.pos = new Float32Array(this.max * 3);
    this.vel = new Float32Array(this.max * 3);
    this.life = new Float32Array(this.max);
    this.sizes = new Float32Array(this.max);
    this.stretches = new Float32Array(this.max);
    this.opacities = new Float32Array(this.max);
    this.colors = new Float32Array(this.max * 3);

    this.geo = new THREE.BufferGeometry();
    this.posAttr = new THREE.BufferAttribute(this.pos, 3);
    this.posAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('position', this.posAttr);

    this.velAttr = new THREE.BufferAttribute(this.vel, 3);
    this.velAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('aVelocity', this.velAttr);

    this.sizeAttr = new THREE.BufferAttribute(this.sizes, 1);
    this.sizeAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('aSize', this.sizeAttr);

    this.stretchAttr = new THREE.BufferAttribute(this.stretches, 1);
    this.stretchAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('aStretch', this.stretchAttr);

    this.opacityAttr = new THREE.BufferAttribute(this.opacities, 1);
    this.opacityAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('aOpacity', this.opacityAttr);

    this.colorAttr = new THREE.BufferAttribute(this.colors, 3);
    this.colorAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('color', this.colorAttr);

    const mat = new THREE.PointsMaterial({
      color: new THREE.Color('#ffffff'),
      map: DROPLET_TEX,
      alphaMap: SOFT_SPRITE_ALPHA,
      size: 0.12,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
    this.points = new THREE.Points(this.geo, mat);
    this.points.frustumCulled = false;
    enablePointSpriteAttributes(mat, { velocityStretch: true });
  }

  public dispose(): void {
    this.geo.dispose();
    (this.points.material as THREE.Material).dispose();
  }

  public update(u: WindSprayUpdate): void {
    const dt = u.dt_s;
    const mat = this.points.material as THREE.PointsMaterial;
    setPointSpriteSun(mat, { sunDir: u.sunDir, sunIntensity: u.sunIntensity, sunset: u.sunset });

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
    const rogue = clamp(u.rogueIntensity ?? 0, 0, 1);

    const gustPulse = 1.0 + 2.4 * gust * gust;
    const baseRate = lerp(4, 68, wind01) * (0.25 + 0.6 * storm) * (0.25 + 0.75 * u.gustiness);
    const rate = baseRate * gustPulse * (0.9 + 0.6 * rogue);
    const spawnN = Math.min(24, Math.floor(rate * dt + this.rng() * 0.6));

    const toX = Math.cos(u.windDirTo_rad);
    const toZ = Math.sin(u.windDirTo_rad);
    const sideX = -toZ;
    const sideZ = toX;

    for (let i = 0; i < spawnN; i++) {
      this.spawn(u.center, u.surfaceY, toX, toZ, sideX, sideZ, wind01, gust, storm);
    }

    let any = false;
    let opacityDirty = false;
    for (let i = 0; i < this.max; i++) {
      if (this.life[i] <= 0) {
        if (this.opacities[i] !== 0) {
          this.opacities[i] = 0;
          opacityDirty = true;
        }
        continue;
      }
      any = true;
      this.life[i] -= dt;
      const ix = i * 3;
      // Gravity + slight wind lift.
      this.vel[ix + 1] -= (6.1 - 3.0 * gust - 0.8 * storm) * dt;
      const windPush = (0.28 + 0.85 * wind01) * (1.0 + 0.8 * gust);
      this.vel[ix + 0] += toX * windPush * dt;
      this.vel[ix + 2] += toZ * windPush * dt;

      this.pos[ix + 0] += this.vel[ix + 0] * dt;
      this.pos[ix + 1] += this.vel[ix + 1] * dt;
      this.pos[ix + 2] += this.vel[ix + 2] * dt;

      if (this.pos[ix + 1] < u.surfaceY - 0.1) {
        this.life[i] = 0;
      }
    }

    this.posAttr.needsUpdate = true;
    if (any) this.velAttr.needsUpdate = true;
    if (spawnN > 0) {
      this.sizeAttr.needsUpdate = true;
      this.stretchAttr.needsUpdate = true;
      this.colorAttr.needsUpdate = true;
    }
    if (spawnN > 0 || opacityDirty) this.opacityAttr.needsUpdate = true;

    const overcast = clamp(u.cloudCover, 0, 1);
    const lowLight = clamp(overcast * 0.6 + storm * 0.85, 0, 1);
    const lightScale = lerp(1.0, 0.55, lowLight);
    const targetOpacity = any
      ? clamp((0.12 + 0.65 * (wind01 * 0.6 + gust * 0.7 + storm * 0.35 + rogue * 0.45)) * lightScale, 0, 0.92)
      : 0;
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
    const along = lerp(8, 32, Math.pow(this.rng(), 0.65)) * (0.6 + 0.5 * wind01) * (0.8 + 0.6 * gust);
    const sideSpread = lerp(6, 18, Math.pow(this.rng(), 0.7)) * (0.65 + 0.35 * wind01);
    const side = (this.rng() * 2 - 1) * sideSpread;
    const lift = lerp(0.08, 0.7, this.rng()) + storm * 0.18 + gust * 0.12;

    this.pos[ix + 0] = center.x + toX * along + sideX * side;
    this.pos[ix + 1] = surfaceY + lift;
    this.pos[ix + 2] = center.z + toZ * along + sideZ * side;

    const up = lerp(1.3, 5.2, this.rng()) * (0.4 + 0.6 * storm) * (0.6 + 0.7 * gust);
    const lateral = lerp(2.4, 9.2, this.rng()) * (0.35 + 0.65 * wind01) * (0.7 + 0.8 * gust);
    const sideVel = (this.rng() * 2 - 1) * lerp(0.45, 1.1, this.rng()) * (0.6 + 0.4 * storm);

    this.vel[ix + 0] = toX * lateral + sideX * sideVel;
    this.vel[ix + 1] = up;
    this.vel[ix + 2] = toZ * lateral + sideZ * sideVel;

    this.applyVisual(i);
  }

  private applyVisual(i: number): void {
    const ix = i * 3;
    const speed = Math.hypot(this.vel[ix + 0], this.vel[ix + 1], this.vel[ix + 2]);
    const speed01 = clamp(speed / 10, 0, 1);
    this.sizes[i] = lerp(0.6, 1.2, this.rng());
    this.stretches[i] = lerp(1.2, 2.4, speed01) * lerp(0.9, 1.12, this.rng());
    this.opacities[i] = lerp(0.6, 1.0, this.rng());

    const temp = this.rng() * 2 - 1;
    const tempMix = Math.abs(temp) * 0.12;
    this.tmpColor.copy(this.baseColor);
    if (temp >= 0) this.tmpColor.lerp(this.warmTint, tempMix);
    else this.tmpColor.lerp(this.coolTint, tempMix);

    this.colors[ix + 0] = this.tmpColor.r;
    this.colors[ix + 1] = this.tmpColor.g;
    this.colors[ix + 2] = this.tmpColor.b;
  }
}
