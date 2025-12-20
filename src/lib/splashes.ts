import * as THREE from 'three';
import { clamp } from './math';
import { mulberry32 } from './prng';
import { SOFT_SPRITE_ALPHA, SPLASH_TEX } from './waterParticleTextures';

export interface SplashUpdate {
  dt_s: number;
  camera: THREE.Camera;
  origin: THREE.Vector3;
  surfaceY: number;
  slope: number; // 0..1+
  intensity: number; // 0..1
  windDirTo_rad: number;
  /** 0..1. Bias spawn toward the otter body for spray. */
  sprayBias01?: number;
}

export type SplashConfig = {
  maxCount: number;
  cullDistance: number;
};

const SPLASH_STRIDE = 16;
const SPLASH_POS = 0;
const SPLASH_VEL = 3;
const SPLASH_LIFE = 6;
const SPLASH_DRAG = 7;
const SPLASH_SIZE = 8;
const SPLASH_OPACITY = 9;
const SPLASH_COLOR = 10;

export class SplashSystem {
  public readonly points: THREE.Points;
  private readonly rng = mulberry32(340001);

  private max: number;
  private data: Float32Array;
  private instanceBuffer: THREE.InstancedInterleavedBuffer;
  private geo: THREE.InstancedBufferGeometry;
  private idx = 0;

  private cullDistanceSq: number;
  private readonly boundsRadius = 12;
  private readonly frustum = new THREE.Frustum();
  private readonly frustumMatrix = new THREE.Matrix4();
  private readonly bounds = new THREE.Sphere();

  private readonly baseColor = new THREE.Color('#ffffff');
  private readonly warmTint = new THREE.Color('#fff1de');
  private readonly coolTint = new THREE.Color('#d6ecff');
  private readonly tmpColor = new THREE.Color();

  constructor(config: SplashConfig) {
    const maxCount = Math.max(1, Math.floor(config.maxCount));
    this.max = maxCount;
    const cullDistance = Math.max(0, config.cullDistance);
    this.cullDistanceSq = cullDistance * cullDistance;

    this.data = new Float32Array(this.max * SPLASH_STRIDE);
    this.instanceBuffer = new THREE.InstancedInterleavedBuffer(this.data, SPLASH_STRIDE);
    this.instanceBuffer.setUsage(THREE.DynamicDrawUsage);

    this.geo = new THREE.InstancedBufferGeometry();
    this.geo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
    this.geo.setAttribute('iPos', new THREE.InterleavedBufferAttribute(this.instanceBuffer, 3, SPLASH_POS));
    this.geo.setAttribute('aSize', new THREE.InterleavedBufferAttribute(this.instanceBuffer, 1, SPLASH_SIZE));
    this.geo.setAttribute('aOpacity', new THREE.InterleavedBufferAttribute(this.instanceBuffer, 1, SPLASH_OPACITY));
    this.geo.setAttribute('color', new THREE.InterleavedBufferAttribute(this.instanceBuffer, 3, SPLASH_COLOR));
    this.geo.instanceCount = this.max;

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
    mat.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
attribute vec3 iPos;
attribute float aSize;
attribute float aOpacity;
varying float vOpacity;`
        )
        .replace(
          '#include <color_vertex>',
          `#include <color_vertex>
vOpacity = aOpacity;`
        )
        .replace('#include <begin_vertex>', 'vec3 transformed = iPos;')
        .replace('gl_PointSize = size;', 'gl_PointSize = size * aSize;');

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <color_pars_fragment>',
          `#include <color_pars_fragment>
varying float vOpacity;`
        )
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
diffuseColor.a *= vOpacity;`
        );
    };
    mat.customProgramCacheKey = () => 'points_softsprite_instanced_v1';

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

    if (!this.isVisible(u.camera, u.origin)) {
      this.points.visible = false;
      mat.opacity = 0.0;
      return;
    }
    this.points.visible = true;

    // Spawn rate based on steepness & intensity.
    const s = clamp((u.slope - 0.22) / 0.35, 0, 1);
    const spray = clamp(u.sprayBias01 ?? 0, 0, 1);
    const rate = (s * s) * lerp(18, 120, u.intensity) * (0.85 + 0.9 * spray); // particles per second

    const toX = Math.cos(u.windDirTo_rad);
    const toZ = Math.sin(u.windDirTo_rad);

    const bodyY = Math.max(u.surfaceY + 0.05, u.origin.y + 0.12);
    const spawnY = lerp(u.surfaceY + 0.05, bodyY, spray);
    const microBias = lerp(1.1, 1.8, u.intensity);
    const spawnN = Math.min(26, Math.floor(rate * dt * microBias));
    for (let i = 0; i < spawnN; i++) this.spawn(u.origin, spawnY, toX, toZ, u.intensity, spray);

    // Update all particles
    let any = false;
    const windSpeed = lerp(0.45, 2.1, u.intensity) * (0.65 + 0.35 * s);
    const windX = toX * windSpeed;
    const windZ = toZ * windSpeed;
    const turbAmp = 0.35 * dt;
    const surfaceEps = 0.006;
    const data = this.data;
    for (let i = 0; i < this.max; i++) {
      const base = i * SPLASH_STRIDE;
      const life = data[base + SPLASH_LIFE];
      if (life <= 0) {
        data[base + SPLASH_OPACITY] = 0;
        continue;
      }
      any = true;
      data[base + SPLASH_LIFE] = life - dt;
      let vx = data[base + SPLASH_VEL + 0];
      let vy = data[base + SPLASH_VEL + 1];
      let vz = data[base + SPLASH_VEL + 2];

      // Gravity
      vy -= 9.81 * dt;
      const drag = data[base + SPLASH_DRAG];
      const damp = Math.exp(-drag * dt);
      const verticalDamp = Math.exp(-drag * 0.85 * dt);
      // Wind-aligned drag to pull droplets toward the airflow.
      vx = windX + (vx - windX) * damp;
      vz = windZ + (vz - windZ) * damp;
      vy *= verticalDamp;
      // Light turbulence jitter.
      vx += (this.rng() * 2 - 1) * turbAmp;
      vz += (this.rng() * 2 - 1) * turbAmp;
      vy += (this.rng() * 2 - 1) * turbAmp * 0.4;

      data[base + SPLASH_VEL + 0] = vx;
      data[base + SPLASH_VEL + 1] = vy;
      data[base + SPLASH_VEL + 2] = vz;

      const px = data[base + SPLASH_POS + 0] + vx * dt;
      const py = data[base + SPLASH_POS + 1] + vy * dt;
      const pz = data[base + SPLASH_POS + 2] + vz * dt;

      data[base + SPLASH_POS + 0] = px;
      data[base + SPLASH_POS + 1] = py;
      data[base + SPLASH_POS + 2] = pz;

      // Kill if below surface
      if (py <= u.surfaceY + surfaceEps) data[base + SPLASH_LIFE] = 0;
    }

    this.instanceBuffer.needsUpdate = true;

    const targetOpacity = any ? clamp(0.15 + 0.55 * u.intensity, 0, 0.85) : 0;
    mat.opacity += (targetOpacity - mat.opacity) * clamp(dt * 3.0, 0, 1);
  }

  private isVisible(camera: THREE.Camera, origin: THREE.Vector3): boolean {
    if (this.cullDistanceSq > 0 && camera.position.distanceToSquared(origin) > this.cullDistanceSq) {
      return false;
    }

    this.frustumMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.frustumMatrix);
    this.bounds.center.copy(origin);
    this.bounds.radius = this.boundsRadius;
    return this.frustum.intersectsSphere(this.bounds);
  }

  private spawn(origin: THREE.Vector3, spawnY: number, toX: number, toZ: number, intensity: number, spray: number): void {
    const i = this.idx++ % this.max;
    const base = i * SPLASH_STRIDE;
    const lifeT = Math.pow(this.rng(), 1.6);
    this.data[base + SPLASH_LIFE] = lerp(0.22, 0.85, lifeT) * (0.55 + 0.35 * intensity);
    this.data[base + SPLASH_DRAG] = lerp(1.8, 3.8, Math.pow(this.rng(), 0.5));

    const r = (this.rng() * 2 - 1) * 0.65;
    const r2 = (this.rng() * 2 - 1) * 0.65;
    this.data[base + SPLASH_POS + 0] = origin.x + r;
    this.data[base + SPLASH_POS + 1] = spawnY + (this.rng() * 2 - 1) * 0.06 * spray;
    this.data[base + SPLASH_POS + 2] = origin.z + r2;

    // Eject up and slightly downwind
    const upT = Math.pow(this.rng(), 0.4);
    const up = lerp(0.6, 8.8, upT) * (0.4 + 0.6 * intensity);
    const lateralT = Math.pow(this.rng(), 0.8);
    const lateral = lerp(0.15, 3.0, lateralT) * (0.5 + 0.5 * intensity);
    this.data[base + SPLASH_VEL + 0] = toX * lateral + (this.rng() * 2 - 1) * 0.25;
    this.data[base + SPLASH_VEL + 1] = up;
    this.data[base + SPLASH_VEL + 2] = toZ * lateral + (this.rng() * 2 - 1) * 0.25;

    this.applyVisual(base);
  }

  private applyVisual(base: number): void {
    this.data[base + SPLASH_SIZE] = lerp(0.7, 1.4, this.rng());
    this.data[base + SPLASH_OPACITY] = lerp(0.65, 1.0, this.rng());

    const temp = this.rng() * 2 - 1;
    const tempMix = Math.abs(temp) * 0.12;
    this.tmpColor.copy(this.baseColor);
    if (temp >= 0) this.tmpColor.lerp(this.warmTint, tempMix);
    else this.tmpColor.lerp(this.coolTint, tempMix);

    this.data[base + SPLASH_COLOR + 0] = this.tmpColor.r;
    this.data[base + SPLASH_COLOR + 1] = this.tmpColor.g;
    this.data[base + SPLASH_COLOR + 2] = this.tmpColor.b;
  }
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
