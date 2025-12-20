import * as THREE from 'three';
import { clamp, lerp, smoothstep } from './math';
import { mulberry32 } from './prng';
import { enablePointSpriteAttributes } from './pointSpriteMaterial';
import { SOFT_SPRITE_ALPHA } from './waterParticleTextures';

export interface RainMistUpdate {
  dt_s: number;
  center: THREE.Vector3;
  otterPos: THREE.Vector3;
  surfaceY: number;
  windDirTo_rad: number;
  windSpeed_mps: number;
  rainIntensity: number;
  storminess: number;
  waterTemp_C: number;
  visible: boolean;
}

/** Low-lying mist quads that hover near the surface during rain. */
export class RainMist {
  public readonly points: THREE.Points;

  private readonly rng = mulberry32(422010);
  private readonly max: number;
  private readonly pos: Float32Array;
  private readonly vel: Float32Array;
  private readonly life: Float32Array;
  private readonly lifeMax: Float32Array;
  private readonly sizes: Float32Array;
  private readonly opacities: Float32Array;
  private readonly opacityBase: Float32Array;
  private readonly colors: Float32Array;
  private readonly geo: THREE.BufferGeometry;
  private readonly posAttr: THREE.BufferAttribute;
  private readonly sizeAttr: THREE.BufferAttribute;
  private readonly opacityAttr: THREE.BufferAttribute;
  private readonly colorAttr: THREE.BufferAttribute;
  private idx = 0;

  private readonly baseColor = new THREE.Color('#e4f2ff');
  private readonly warmTint = new THREE.Color('#fff1de');
  private readonly coolTint = new THREE.Color('#d6ecff');
  private readonly tmpColor = new THREE.Color();
  private readonly tmpCenter = new THREE.Vector3();

  constructor(quality: 'High' | 'Medium' | 'Low' | 'Max') {
    this.max = quality === 'Max' ? 420 : (quality === 'High' ? 320 : (quality === 'Medium' ? 240 : 160));
    this.pos = new Float32Array(this.max * 3);
    this.vel = new Float32Array(this.max * 3);
    this.life = new Float32Array(this.max);
    this.lifeMax = new Float32Array(this.max);
    this.sizes = new Float32Array(this.max);
    this.opacities = new Float32Array(this.max);
    this.opacityBase = new Float32Array(this.max);
    this.colors = new Float32Array(this.max * 3);

    this.geo = new THREE.BufferGeometry();
    this.posAttr = new THREE.BufferAttribute(this.pos, 3);
    this.posAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('position', this.posAttr);

    this.sizeAttr = new THREE.BufferAttribute(this.sizes, 1);
    this.sizeAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('aSize', this.sizeAttr);

    this.opacityAttr = new THREE.BufferAttribute(this.opacities, 1);
    this.opacityAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('aOpacity', this.opacityAttr);

    this.colorAttr = new THREE.BufferAttribute(this.colors, 3);
    this.colorAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('color', this.colorAttr);

    const mat = new THREE.PointsMaterial({
      color: new THREE.Color('#ffffff'),
      alphaMap: SOFT_SPRITE_ALPHA,
      size: 0.4,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      blending: THREE.NormalBlending,
      vertexColors: true
    });
    this.points = new THREE.Points(this.geo, mat);
    this.points.frustumCulled = false;
    enablePointSpriteAttributes(mat);
  }

  public dispose(): void {
    this.geo.dispose();
    (this.points.material as THREE.Material).dispose();
  }

  public update(u: RainMistUpdate): void {
    const dt = u.dt_s;
    const mat = this.points.material as THREE.PointsMaterial;

    if (!u.visible) {
      this.points.visible = false;
      mat.opacity = 0.0;
      return;
    }
    this.points.visible = true;

    const rain01 = clamp(u.rainIntensity, 0, 1);
    const storm01 = clamp(u.storminess, 0, 1);
    const temp01 = smoothstep(6, 24, u.waterTemp_C);
    const mistSignal = clamp(rain01 * (0.55 + 0.45 * storm01) * (0.35 + 0.65 * temp01), 0, 1);

    const wind01 = clamp(u.windSpeed_mps / 20, 0, 1);
    const drift = lerp(0.12, 0.55, wind01) * (0.65 + 0.35 * mistSignal);
    const windX = Math.cos(u.windDirTo_rad) * drift;
    const windZ = Math.sin(u.windDirTo_rad) * drift;

    const spawnRate = lerp(8, 70, mistSignal) * (0.75 + 0.25 * wind01);
    const spawnN = Math.min(20, Math.floor(spawnRate * dt));

    this.tmpCenter.copy(u.center);
    const dist = this.tmpCenter.distanceTo(u.otterPos);
    const otterBias = clamp(1 - dist / 10, 0, 1);
    this.tmpCenter.lerp(u.otterPos, 0.35 * otterBias);

    for (let i = 0; i < spawnN; i++) {
      this.spawn(this.tmpCenter, u.surfaceY, windX, windZ, mistSignal, temp01);
    }

    let any = false;
    let opacityDirty = false;
    const maxRadius = lerp(8, 14, mistSignal);
    const maxRadiusSq = maxRadius * maxRadius;
    const maxLift = lerp(0.35, 0.85, mistSignal) + 0.25 * storm01;
    const jitter = 0.06 * (0.45 + 0.55 * wind01);
    const damp = Math.exp(-dt * lerp(0.7, 1.4, wind01));
    const verticalDamp = Math.exp(-dt * 1.2);

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
      if (this.life[i] <= 0) {
        this.life[i] = 0;
        if (this.opacities[i] !== 0) {
          this.opacities[i] = 0;
          opacityDirty = true;
        }
        continue;
      }

      const ix = i * 3;
      this.vel[ix + 0] = windX + (this.vel[ix + 0] - windX) * damp;
      this.vel[ix + 2] = windZ + (this.vel[ix + 2] - windZ) * damp;
      this.vel[ix + 1] *= verticalDamp;

      this.vel[ix + 0] += (this.rng() * 2 - 1) * jitter;
      this.vel[ix + 2] += (this.rng() * 2 - 1) * jitter;
      this.vel[ix + 1] += (this.rng() * 2 - 1) * jitter * 0.35;

      this.pos[ix + 0] += this.vel[ix + 0] * dt;
      this.pos[ix + 1] += this.vel[ix + 1] * dt;
      this.pos[ix + 2] += this.vel[ix + 2] * dt;

      const y = this.pos[ix + 1];
      if (y < u.surfaceY + 0.015 || y > u.surfaceY + maxLift) {
        this.life[i] = 0;
        if (this.opacities[i] !== 0) {
          this.opacities[i] = 0;
          opacityDirty = true;
        }
        continue;
      }

      const dx = this.pos[ix + 0] - u.center.x;
      const dz = this.pos[ix + 2] - u.center.z;
      if (dx * dx + dz * dz > maxRadiusSq) {
        this.life[i] = 0;
        if (this.opacities[i] !== 0) {
          this.opacities[i] = 0;
          opacityDirty = true;
        }
        continue;
      }

      const age = 1 - this.life[i] / Math.max(1e-4, this.lifeMax[i]);
      const fade = smoothstep(0.0, 0.18, age) * (1 - smoothstep(0.65, 1.0, age));
      const alpha = this.opacityBase[i] * fade;
      if (alpha !== this.opacities[i]) {
        this.opacities[i] = alpha;
        opacityDirty = true;
      }
    }

    this.posAttr.needsUpdate = true;
    if (spawnN > 0) {
      this.sizeAttr.needsUpdate = true;
      this.colorAttr.needsUpdate = true;
    }
    if (spawnN > 0 || opacityDirty) this.opacityAttr.needsUpdate = true;

    const targetOpacity = clamp(0.55 * mistSignal, 0, 0.65);
    mat.opacity += (targetOpacity - mat.opacity) * clamp(dt * 2.0, 0, 1);
    this.points.visible = any || mistSignal > 0.02;
  }

  private spawn(
    center: THREE.Vector3,
    surfaceY: number,
    windX: number,
    windZ: number,
    mistSignal: number,
    temp01: number
  ): void {
    const i = this.idx++ % this.max;
    const lifeT = Math.pow(this.rng(), 0.6);
    const life = lerp(0.45, 1.3, lifeT) * (0.7 + 0.4 * mistSignal);
    this.life[i] = life;
    this.lifeMax[i] = life;

    const ix = i * 3;
    const radius = lerp(3.0, 9.5, Math.pow(this.rng(), 0.65));
    const ang = this.rng() * Math.PI * 2;
    const jitter = (this.rng() * 2 - 1) * 0.4;
    const lift = lerp(0.03, 0.38, this.rng()) * (0.6 + 0.5 * mistSignal);

    this.pos[ix + 0] = center.x + Math.cos(ang) * radius + jitter;
    this.pos[ix + 1] = surfaceY + lift;
    this.pos[ix + 2] = center.z + Math.sin(ang) * radius + jitter;

    const lateral = lerp(0.02, 0.18, this.rng());
    this.vel[ix + 0] = windX * (0.5 + 0.5 * this.rng()) + (this.rng() * 2 - 1) * lateral;
    this.vel[ix + 1] = lerp(0.01, 0.08, this.rng());
    this.vel[ix + 2] = windZ * (0.5 + 0.5 * this.rng()) + (this.rng() * 2 - 1) * lateral;

    this.opacities[i] = 0;
    this.applyVisual(i, mistSignal, temp01);
  }

  private applyVisual(i: number, mistSignal: number, temp01: number): void {
    this.sizes[i] = lerp(0.7, 1.45, this.rng()) * lerp(0.8, 1.1, mistSignal);
    this.opacityBase[i] = lerp(0.35, 0.9, this.rng()) * lerp(0.6, 1.0, mistSignal);

    const tempBias = lerp(-0.15, 0.15, temp01);
    const temp = clamp(this.rng() * 2 - 1 + tempBias, -1, 1);
    const tempMix = Math.abs(temp) * 0.12;
    this.tmpColor.copy(this.baseColor);
    if (temp >= 0) this.tmpColor.lerp(this.warmTint, tempMix);
    else this.tmpColor.lerp(this.coolTint, tempMix);

    const ix = i * 3;
    this.colors[ix + 0] = this.tmpColor.r;
    this.colors[ix + 1] = this.tmpColor.g;
    this.colors[ix + 2] = this.tmpColor.b;
  }
}
