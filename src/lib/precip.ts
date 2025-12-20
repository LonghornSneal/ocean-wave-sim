import * as THREE from 'three';
import { clamp, lerp } from './math';
import { mulberry32 } from './prng';
import { DROPLET_TEX, SNOW_TEX, SOFT_SPRITE_ALPHA } from './waterParticleTextures';

export type PrecipMode = 'None' | 'Rain' | 'Snow';

export interface PrecipUpdate {
  dt_s: number;
  time_s: number;
  cameraPos: THREE.Vector3;
  cameraQuat: THREE.Quaternion;
  windDirFrom_deg: number;
  intensity: number; // 0..1
  mode: PrecipMode;
  visible: boolean;
  surfaceY: number;
}

/** Simple precipitation particles around the camera. */
export class PrecipitationSystem {
  public readonly group = new THREE.Group();

  private readonly rng = mulberry32(188122);
  // Slightly darker than pure white so it reads against a bright sky.
  private readonly rainCol = new THREE.Color('#b8dcff');
  private readonly snowCol = new THREE.Color('#ffffff');
  private readonly warmTint = new THREE.Color('#fff1de');
  private readonly coolTint = new THREE.Color('#d6ecff');
  private readonly tmpColor = new THREE.Color();

  private count = 800;
  private positions: Float32Array;
  private velocities: Float32Array;
  private scaleX: Float32Array;
  private scaleY: Float32Array;
  private spin: Float32Array;
  private geo: THREE.PlaneGeometry;
  private mesh: THREE.InstancedMesh;
  private mode: PrecipMode = 'None';
  private seeded = false;

  private readonly tmpObj = new THREE.Object3D();
  private readonly fallDir = new THREE.Vector3();
  private readonly fallQuat = new THREE.Quaternion();
  private readonly up = new THREE.Vector3(0, 1, 0);

  constructor(quality: 'High' | 'Medium' | 'Low' | 'Max') {
    this.count = quality === 'Max' ? 1800 : (quality === 'High' ? 1200 : (quality === 'Medium' ? 800 : 450));

    this.positions = new Float32Array(this.count * 3);
    this.velocities = new Float32Array(this.count * 3);
    this.scaleX = new Float32Array(this.count);
    this.scaleY = new Float32Array(this.count);
    this.spin = new Float32Array(this.count);

    for (let i = 0; i < this.count; i++) {
      const ix = i * 3;
      this.positions[ix + 0] = (this.rng() * 2 - 1) * 18;
      this.positions[ix + 1] = this.rng() * 14 + 2;
      this.positions[ix + 2] = (this.rng() * 2 - 1) * 18;

      this.velocities[ix + 0] = 0;
      this.velocities[ix + 1] = -12;
      this.velocities[ix + 2] = 0;
    }

    this.geo = new THREE.PlaneGeometry(1, 1);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ffffff'),
      map: DROPLET_TEX,
      alphaMap: SOFT_SPRITE_ALPHA,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      side: THREE.DoubleSide
    });
    this.mesh = new THREE.InstancedMesh(this.geo, mat, this.count);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.group.add(this.mesh);

    for (let i = 0; i < this.count; i++) {
      this.resetSprite(i, 'Rain');
    }
    if (this.mesh.instanceColor) {
      this.mesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
      this.mesh.instanceColor.needsUpdate = true;
    }
  }

  public setQuality(q: 'High' | 'Medium' | 'Low' | 'Max'): void {
    // no-op for now (quality is set at construction).
    void q;
  }

  public dispose(): void {
    this.geo.dispose();
    (this.mesh.material as THREE.Material).dispose();
  }

  public update(u: PrecipUpdate): void {
    const mat = this.mesh.material as THREE.MeshBasicMaterial;
    const desiredMap = u.mode === 'Rain' ? DROPLET_TEX : (u.mode === 'Snow' ? SNOW_TEX : null);
    if (mat.map !== desiredMap) {
      mat.map = desiredMap;
      mat.needsUpdate = true;
    }

    if (!u.visible || u.intensity <= 0.01 || u.mode === 'None') {
      mat.opacity = lerp(mat.opacity, 0.0, clamp(u.dt_s * 2.2, 0, 1));
      if (mat.opacity < 0.002) this.mesh.visible = false;
      return;
    }

    this.mesh.visible = true;

    const inten = clamp(u.intensity, 0, 1);
    if (!this.seeded || this.mode !== u.mode) {
      this.seedParticles(u);
      this.mode = u.mode;
      this.seeded = true;
    }

    const useAdditive = u.mode === 'Rain';
    const desiredBlend = useAdditive ? THREE.AdditiveBlending : THREE.NormalBlending;
    if (mat.blending !== desiredBlend) {
      mat.blending = desiredBlend;
      mat.needsUpdate = true;
    }

    mat.opacity = lerp(mat.opacity, 0.0 + inten * (u.mode === 'Rain' ? 0.85 : 0.7), clamp(u.dt_s * 1.8, 0, 1));

    const sizeBias = u.mode === 'Rain' ? lerp(0.85, 1.15, inten) : lerp(0.9, 1.25, inten);

    // Wind slant
    const wDir = (u.windDirFrom_deg * Math.PI) / 180;
    const windX = Math.cos(wDir + Math.PI) * (2.0 + inten * 7.0);
    const windZ = Math.sin(wDir + Math.PI) * (2.0 + inten * 7.0);

    const fall = u.mode === 'Rain' ? lerp(10, 32, inten) : lerp(1.8, 6.5, inten);
    const surfacePad = u.mode === 'Rain' ? 0.05 : 0.08;

    this.fallDir.set(windX, -fall, windZ).normalize();
    this.fallQuat.setFromUnitVectors(this.up, this.fallDir);
    const fallY = Math.abs(this.fallDir.y);

    const tmp = this.tmpObj;
    const fallQuat = this.fallQuat;
    let colorDirty = false;

    for (let i = 0; i < this.count; i++) {
      const ix = i * 3;
      // Integrate
      this.positions[ix + 0] += (this.velocities[ix + 0] + windX) * u.dt_s;
      this.positions[ix + 1] += (-fall) * u.dt_s;
      this.positions[ix + 2] += (this.velocities[ix + 2] + windZ) * u.dt_s;

      const worldY = u.cameraPos.y + this.positions[ix + 1];
      const minWorldY = u.surfaceY + surfacePad + this.scaleY[i] * sizeBias * fallY * 0.5;
      if (worldY < minWorldY) {
        this.positions[ix + 0] = (this.rng() * 2 - 1) * 18;
        this.positions[ix + 1] = this.rng() * 14 + 2;
        this.positions[ix + 2] = (this.rng() * 2 - 1) * 18;
        this.resetSprite(i, u.mode);
        colorDirty = true;
      }
      if (this.positions[ix + 0] < -20) this.positions[ix + 0] = 20;
      if (this.positions[ix + 0] > 20) this.positions[ix + 0] = -20;
      if (this.positions[ix + 2] < -20) this.positions[ix + 2] = 20;
      if (this.positions[ix + 2] > 20) this.positions[ix + 2] = -20;

      const wx = u.cameraPos.x + this.positions[ix + 0];
      const wy = u.cameraPos.y + this.positions[ix + 1];
      const wz = u.cameraPos.z + this.positions[ix + 2];

      tmp.position.set(wx, wy, wz);
      tmp.quaternion.copy(fallQuat);
      tmp.rotateY(this.spin[i]);
      tmp.scale.set(this.scaleX[i] * sizeBias, this.scaleY[i] * sizeBias, 1.0);
      tmp.updateMatrix();
      this.mesh.setMatrixAt(i, tmp.matrix);
    }

    if (colorDirty && this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  private seedParticles(u: PrecipUpdate): void {
    for (let i = 0; i < this.count; i++) {
      const ix = i * 3;
      this.positions[ix + 0] = (this.rng() * 2 - 1) * 18;
      this.positions[ix + 1] = this.rng() * 14 + 2;
      this.positions[ix + 2] = (this.rng() * 2 - 1) * 18;

      this.velocities[ix + 0] = 0;
      this.velocities[ix + 1] = -12;
      this.velocities[ix + 2] = 0;

      this.resetSprite(i, u.mode);
    }

    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }

  private resetSprite(i: number, mode: PrecipMode): void {
    if (mode === 'Rain') {
      const base = lerp(0.04, 0.09, this.rng());
      const stretch = lerp(2.1, 3.4, this.rng());
      this.scaleX[i] = base;
      this.scaleY[i] = base * stretch;
      this.spin[i] = this.rng() * Math.PI * 2;
    } else {
      const base = lerp(0.05, 0.12, this.rng());
      const stretch = lerp(0.9, 1.35, this.rng());
      this.scaleX[i] = base;
      this.scaleY[i] = base * stretch;
      this.spin[i] = this.rng() * Math.PI * 2;
    }

    const baseCol = mode === 'Rain' ? this.rainCol : this.snowCol;
    const brightness = mode === 'Rain' ? lerp(0.55, 1.0, this.rng()) : lerp(0.65, 1.05, this.rng());
    const temp = this.rng() * 2 - 1;
    const tempMix = Math.abs(temp) * (mode === 'Rain' ? 0.1 : 0.12);
    this.tmpColor.copy(baseCol);
    if (temp >= 0) this.tmpColor.lerp(this.warmTint, tempMix);
    else this.tmpColor.lerp(this.coolTint, tempMix);
    this.tmpColor.multiplyScalar(brightness);
    this.mesh.setColorAt(i, this.tmpColor);
  }
}
