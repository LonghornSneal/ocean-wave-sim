import * as THREE from 'three';
import { mulberry32 } from './prng';

export interface DropletNormalTextureOptions {
  /** Power-of-two size (e.g. 128..512). */
  size: number;
  /** Deterministic seed. */
  seed: number;
  /** Count of droplet blobs in the tile. */
  dropletCount: number;
  /** Min droplet radius in UV space (0..1). */
  minRadius: number;
  /** Max droplet radius in UV space (0..1). */
  maxRadius: number;
  /** Normal strength multiplier. */
  strength: number;
}

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

/** Toroidal distance on [0,1) to make the texture tile perfectly. */
function torusDelta(a: number, b: number): number {
  let d = a - b;
  d -= Math.round(d);
  return d;
}

export function makeDropletNormalTexture(opt: DropletNormalTextureOptions): THREE.DataTexture {
  const size = Math.max(32, Math.floor(opt.size));
  const dropletCount = Math.max(4, Math.floor(opt.dropletCount));
  const minR = Math.max(0.004, opt.minRadius);
  const maxR = Math.max(minR, opt.maxRadius);
  const rng = mulberry32(opt.seed);

  const blobs = new Float32Array(dropletCount * 4);
  for (let i = 0; i < dropletCount; i++) {
    const idx = i * 4;
    blobs[idx + 0] = rng();
    blobs[idx + 1] = rng();
    const t = Math.pow(rng(), 0.6);
    blobs[idx + 2] = minR + (maxR - minR) * t;
    blobs[idx + 3] = 0.65 + Math.pow(rng(), 1.4) * 1.6;
  }

  const heights = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      let h = 0;
      for (let i = 0; i < dropletCount; i++) {
        const idx = i * 4;
        const cx = blobs[idx + 0];
        const cy = blobs[idx + 1];
        const radius = blobs[idx + 2];
        const stretch = blobs[idx + 3];

        const dx = torusDelta(u, cx);
        const dy = torusDelta(v, cy);
        const rx = dx * stretch;
        const ry = dy / stretch;
        const r2 = (rx * rx + ry * ry) / Math.max(1e-6, radius * radius);
        const bump = Math.exp(-r2 * 4.2);
        h = Math.max(h, bump);
      }
      heights[y * size + x] = h;
    }
  }

  const data = new Uint8Array(size * size * 4);
  const strength = Math.max(0, opt.strength);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const x0 = (x - 1 + size) % size;
      const x1 = (x + 1) % size;
      const y0 = (y - 1 + size) % size;
      const y1 = (y + 1) % size;

      const hL = heights[y * size + x0];
      const hR = heights[y * size + x1];
      const hD = heights[y0 * size + x];
      const hU = heights[y1 * size + x];

      const dhdx = (hR - hL) * 0.5;
      const dhdy = (hU - hD) * 0.5;

      let nx = -dhdx * strength;
      let ny = -dhdy * strength;
      let nz = 1.0;

      const invLen = 1 / Math.max(1e-6, Math.sqrt(nx * nx + ny * ny + nz * nz));
      nx *= invLen;
      ny *= invLen;
      nz *= invLen;

      const idxOut = (y * size + x) * 4;
      data[idxOut + 0] = Math.round((nx * 0.5 + 0.5) * 255);
      data[idxOut + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      data[idxOut + 2] = Math.round((nz * 0.5 + 0.5) * 255);
      data[idxOut + 3] = Math.round(clamp01(heights[y * size + x] * 1.4) * 255);
    }
  }

  const tex = new THREE.DataTexture(data, size, size);
  tex.name = 'DropletNormalTexture';
  tex.flipY = false;
  // Normal/utility map: keep in linear space.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  tex.colorSpace = ((THREE as any).NoColorSpace ?? THREE.LinearSRGBColorSpace) as any;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

export const DROPLET_NORMAL_TEX: THREE.DataTexture = makeDropletNormalTexture({
  size: 256,
  seed: 443112,
  dropletCount: 42,
  minRadius: 0.02,
  maxRadius: 0.085,
  strength: 10.5
});
