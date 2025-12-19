import * as THREE from 'three';
import { clamp, lerp } from './math';
import { mulberry32 } from './prng';
import { DROPLET_TEX } from './waterParticleTextures';

export type PrecipMode = 'None' | 'Rain' | 'Snow';

export interface PrecipUpdate {
  dt_s: number;
  time_s: number;
  cameraPos: THREE.Vector3;
  windDirFrom_deg: number;
  intensity: number; // 0..1
  mode: PrecipMode;
  visible: boolean;
}

/** Simple precipitation particles around the camera. */
export class PrecipitationSystem {
  public readonly group = new THREE.Group();

  private readonly rng = mulberry32(188122);
  // Slightly darker than pure white so it reads against a bright sky.
  private readonly rainCol = new THREE.Color('#b8dcff');
  private readonly snowCol = new THREE.Color('#ffffff');


  private count = 800;
  private positions: Float32Array;
  private velocities: Float32Array;
  private geo: THREE.BufferGeometry;
  private points: THREE.Points;

  constructor(quality: 'High' | 'Medium' | 'Low' | 'Max') {
    this.count = quality === 'Max' ? 1800 : (quality === 'High' ? 1200 : (quality === 'Medium' ? 800 : 450));

    this.positions = new Float32Array(this.count * 3);
    this.velocities = new Float32Array(this.count * 3);

    for (let i = 0; i < this.count; i++) {
      const ix = i * 3;
      this.positions[ix + 0] = (this.rng() * 2 - 1) * 18;
      this.positions[ix + 1] = this.rng() * 14 + 2;
      this.positions[ix + 2] = (this.rng() * 2 - 1) * 18;

      this.velocities[ix + 0] = 0;
      this.velocities[ix + 1] = -12;
      this.velocities[ix + 2] = 0;
    }

    this.geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(this.positions, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('position', posAttr);

    const mat = new THREE.PointsMaterial({
      color: new THREE.Color('#b8dcff'),
      map: DROPLET_TEX,
      // Use screen-space sizing so precipitation remains visible on high-DPR phones.
      // (With size attenuation, the drops can become effectively invisible.)
      size: 2.2,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      alphaTest: 0.02
    });
    this.points = new THREE.Points(this.geo, mat);
    this.points.frustumCulled = false;
    this.group.add(this.points);
  }

  public setQuality(q: 'High' | 'Medium' | 'Low' | 'Max'): void {
    // no-op for now (quality is set at construction).
    void q;
  }

  public dispose(): void {
    this.geo.dispose();
    (this.points.material as THREE.Material).dispose();
  }

  public update(u: PrecipUpdate): void {
    const mat = this.points.material as THREE.PointsMaterial;
    const desiredMap = u.mode === 'Rain' ? DROPLET_TEX : null;
    if (mat.map !== desiredMap) {
      mat.map = desiredMap;
      mat.needsUpdate = true;
    }

    if (!u.visible || u.intensity <= 0.01 || u.mode === 'None') {
      mat.opacity = lerp(mat.opacity, 0.0, clamp(u.dt_s * 2.2, 0, 1));
      return;
    }

    const inten = clamp(u.intensity, 0, 1);
    mat.opacity = lerp(mat.opacity, 0.0 + inten * (u.mode === 'Rain' ? 0.85 : 0.65), clamp(u.dt_s * 1.8, 0, 1));
    // Screen-space point size (pixels). Boost a bit with intensity.
    mat.size = u.mode === 'Rain' ? lerp(1.8, 3.0, inten) : lerp(2.4, 4.6, inten);
    mat.color.copy(u.mode === 'Rain' ? this.rainCol : this.snowCol);

    // Wind slant
    const wDir = (u.windDirFrom_deg * Math.PI) / 180;
    const windX = Math.cos(wDir + Math.PI) * (2.0 + inten * 7.0);
    const windZ = Math.sin(wDir + Math.PI) * (2.0 + inten * 7.0);

    const fall = u.mode === 'Rain' ? lerp(10, 32, inten) : lerp(1.8, 6.5, inten);

    const attr = this.geo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < this.count; i++) {
      const ix = i * 3;
      // Integrate
      this.positions[ix + 0] += (this.velocities[ix + 0] + windX) * u.dt_s;
      this.positions[ix + 1] += (-fall) * u.dt_s;
      this.positions[ix + 2] += (this.velocities[ix + 2] + windZ) * u.dt_s;

      // Wrap around a box centered on camera
      if (this.positions[ix + 1] < -2) {
        this.positions[ix + 0] = (this.rng() * 2 - 1) * 18;
        this.positions[ix + 1] = 12 + this.rng() * 6;
        this.positions[ix + 2] = (this.rng() * 2 - 1) * 18;
      }
      if (this.positions[ix + 0] < -20) this.positions[ix + 0] = 20;
      if (this.positions[ix + 0] > 20) this.positions[ix + 0] = -20;
      if (this.positions[ix + 2] < -20) this.positions[ix + 2] = 20;
      if (this.positions[ix + 2] > 20) this.positions[ix + 2] = -20;

      // Write world positions
      attr.setXYZ(i, u.cameraPos.x + this.positions[ix + 0], u.cameraPos.y + this.positions[ix + 1], u.cameraPos.z + this.positions[ix + 2]);
    }
    attr.needsUpdate = true;
  }
}
