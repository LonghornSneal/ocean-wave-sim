import * as THREE from 'three';
import { clamp } from './math';
import { mulberry32 } from './prng';
import { enablePointSpriteAttributes } from './pointSpriteMaterial';
import { SOFT_SPRITE_ALPHA, SPLASH_TEX } from './waterParticleTextures';

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
  private sizes: Float32Array;
  private opacities: Float32Array;
  private colors: Float32Array;
  private geo: THREE.BufferGeometry;
  private posAttr: THREE.BufferAttribute;
  private sizeAttr: THREE.BufferAttribute;
  private opacityAttr: THREE.BufferAttribute;
  private colorAttr: THREE.BufferAttribute;
  private idx = 0;

  private readonly baseColor = new THREE.Color('#ffffff');
  private readonly warmTint = new THREE.Color('#fff1de');
  private readonly coolTint = new THREE.Color('#d6ecff');
  private readonly tmpColor = new THREE.Color();

  constructor() {
    this.pos = new Float32Array(this.max * 3);
    this.vel = new Float32Array(this.max * 3);
    this.life = new Float32Array(this.max);
    this.sizes = new Float32Array(this.max);
    this.opacities = new Float32Array(this.max);
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
      map: SPLASH_TEX,
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
    enablePointSpriteAttributes(mat);
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
      // Gravity
      this.vel[ix + 1] -= 9.81 * dt;
      // Integrate
      this.pos[ix + 0] += this.vel[ix + 0] * dt;
      this.pos[ix + 1] += this.vel[ix + 1] * dt;
      this.pos[ix + 2] += this.vel[ix + 2] * dt;
      // Kill if below surface
      if (this.pos[ix + 1] < u.surfaceY - 0.1) this.life[i] = 0;
    }
    this.posAttr.needsUpdate = true;
    if (spawnN > 0) {
      this.sizeAttr.needsUpdate = true;
      this.colorAttr.needsUpdate = true;
    }
    if (spawnN > 0 || opacityDirty) this.opacityAttr.needsUpdate = true;

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

    this.applyVisual(i);
  }

  private applyVisual(i: number): void {
    this.sizes[i] = lerp(0.7, 1.4, this.rng());
    this.opacities[i] = lerp(0.65, 1.0, this.rng());

    const temp = this.rng() * 2 - 1;
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

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
