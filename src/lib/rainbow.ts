import * as THREE from 'three';
import { clamp, lerp } from './math';

export interface RainbowUpdate {
  dt_s: number;
  center: THREE.Vector3;
  sunDir: THREE.Vector3;
  sunElevation_rad: number;
  precipIntensity: number; // 0..1
  cloudCover: number; // 0..1
}

export class RainbowArc {
  public readonly mesh: THREE.Mesh;
  private opacity = 0;
  private readonly tex: THREE.Texture;

  // Temps (avoid per-frame allocations)
  private readonly tmpAntiSun = new THREE.Vector3();

  constructor() {
    const tex = makeRainbowTexture();
    this.tex = tex;
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    // Ring segment facing camera-ish, we will orient each frame.
    const geo = new THREE.RingGeometry(35, 40, 96, 1, 0, Math.PI);
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.position.set(0, 20, 0);
  }

  public dispose(): void {
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.Material).dispose();
    this.tex.dispose();
  }

  public update(u: RainbowUpdate): void {
    const mat = this.mesh.material as THREE.MeshBasicMaterial;

    // Conditions: rain + sun low (but above horizon) + not fully overcast.
    const sunAlt = u.sunElevation_rad;
    const sunLow = clamp(1 - Math.abs(sunAlt - 0.18) / 0.25, 0, 1);
    const ok = u.precipIntensity > 0.12 && sunAlt > 0.02 && u.cloudCover < 0.85;
    const target = ok ? (sunLow * (1 - u.cloudCover) * clamp(u.precipIntensity, 0, 1)) : 0;
    this.opacity = lerp(this.opacity, target, clamp(u.dt_s * 1.0, 0, 1));
    mat.opacity = this.opacity * 0.55;

    // Place opposite the sun direction, near horizon.
    const antiSun = this.tmpAntiSun.copy(u.sunDir).multiplyScalar(-1);
    antiSun.y = 0.08;
    antiSun.normalize();

    this.mesh.position.copy(u.center).addScaledVector(antiSun, 220);
    this.mesh.position.y = u.center.y + 22;

    // Face toward camera center; rotate so arc stands up.
    this.mesh.lookAt(u.center);
    this.mesh.rotateX(Math.PI * 0.5);
  }
}

function makeRainbowTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 16;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createLinearGradient(0, 0, canvas.width, 0);
  g.addColorStop(0.00, 'rgba(255,0,0,0.0)');
  g.addColorStop(0.08, 'rgba(255,0,0,0.9)');
  g.addColorStop(0.22, 'rgba(255,165,0,0.9)');
  g.addColorStop(0.36, 'rgba(255,255,0,0.9)');
  g.addColorStop(0.50, 'rgba(0,255,0,0.9)');
  g.addColorStop(0.64, 'rgba(0,127,255,0.9)');
  g.addColorStop(0.78, 'rgba(75,0,130,0.9)');
  g.addColorStop(0.92, 'rgba(148,0,211,0.9)');
  g.addColorStop(1.00, 'rgba(148,0,211,0.0)');

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
