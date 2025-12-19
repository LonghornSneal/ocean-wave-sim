import * as THREE from 'three';
import { mulberry32 } from './prng';

export interface CausticsTextureOptions {
  /** Power-of-two size (e.g. 128..512). */
  size: number;
  /** Deterministic seed. */
  seed: number;
  /** Grid resolution for Worley points (higher = smaller cells). */
  cells: number;
}

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

/** Toroidal distance on [0,1) to make the texture tile perfectly. */
function torusDelta(a: number, b: number): number {
  let d = a - b;
  // Wrap to [-0.5, 0.5]
  d -= Math.round(d);
  return d;
}

/**
 * Generate a tileable grayscale caustics texture.
 *
 * Implementation:
 * - Worley/cellular edges (via 1st/2nd nearest distance difference)
 * - Nonlinear shaping to create bright, thin filaments
 */
export function makeCausticsTexture(opt: CausticsTextureOptions): THREE.DataTexture {
  const size = Math.max(32, Math.floor(opt.size));
  const cells = Math.max(2, Math.floor(opt.cells));
  const rng = mulberry32(opt.seed);

  // One random point per cell.
  const ptsX = new Float32Array(cells * cells);
  const ptsY = new Float32Array(cells * cells);
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      const idx = j * cells + i;
      ptsX[idx] = rng();
      ptsY[idx] = rng();
    }
  }

  const data = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;

      const cx = Math.floor(u * cells);
      const cy = Math.floor(v * cells);

      // Find nearest + second-nearest site distances.
      let d1 = 1e9;
      let d2 = 1e9;

      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          let ix = cx + ox;
          let iy = cy + oy;
          // Wrap for tiling.
          ix = ((ix % cells) + cells) % cells;
          iy = ((iy % cells) + cells) % cells;

          const idx = iy * cells + ix;
          const pu = (ix + ptsX[idx]) / cells;
          const pv = (iy + ptsY[idx]) / cells;

          const du = torusDelta(u, pu);
          const dv = torusDelta(v, pv);
          const d = Math.sqrt(du * du + dv * dv);

          if (d < d1) {
            d2 = d1;
            d1 = d;
          } else if (d < d2) {
            d2 = d;
          }
        }
      }

      // Edge measure: small near cell borders, larger inside a cell.
      const edge = Math.max(0, d2 - d1);

      // Shape into bright filaments. These constants are tuned for ocean-scale caustics.
      let c = Math.exp(-edge * 42.0);
      c = Math.pow(c, 1.55);
      c = clamp01(c);

      // Slight contrast + bias to avoid a flat gray.
      c = clamp01((c - 0.18) * 1.28 + 0.18);

      const v8 = Math.max(0, Math.min(255, Math.round(c * 255)));
      const idxOut = (y * size + x) * 4;
      data[idxOut + 0] = v8;
      data[idxOut + 1] = v8;
      data[idxOut + 2] = v8;
      data[idxOut + 3] = 255;
    }
  }

  const tex = new THREE.DataTexture(data, size, size);
  tex.name = 'CausticsTexture';
  tex.flipY = false;
  // Utility map (no color management).
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

// Module-scope texture (generated once).
export const CAUSTICS_TEX: THREE.DataTexture = makeCausticsTexture({
  size: 256,
  seed: 771233,
  cells: 10
});
