import * as THREE from 'three';
import { mulberry32 } from './prng';

export interface MicroNormalTextureOptions {
  /** Power-of-two size (e.g. 128..512). */
  size: number;
  /** Deterministic seed. */
  seed: number;
  /** How many sine components to sum (more = richer noise). */
  components: number;
  /** Integer frequency range (cycles across the texture). */
  freqMin: number;
  freqMax: number;
  /** Slope-to-normal strength. */
  strength: number;
  /** Amplitude falloff power with frequency magnitude. */
  falloff: number;
}

interface SinComp {
  kx: number;
  ky: number;
  phase: number;
  amp: number;
}

function pickInt(rng: () => number, a: number, b: number): number {
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  return lo + Math.floor(rng() * (hi - lo + 1));
}

/**
 * Generate a *tileable* normal map suitable for water micro-detail.
 *
 * Implementation notes:
 * - Uses a sum of sine waves with integer frequencies so it tiles perfectly.
 * - Computes analytic gradients (no extra sampling) to produce a stable normal.
 */
export function makeMicroNormalTexture(opt: MicroNormalTextureOptions): THREE.DataTexture {
  const size = Math.max(32, Math.floor(opt.size));
  const rng = mulberry32(opt.seed);

  const comps: SinComp[] = [];
  const compCount = Math.max(4, Math.floor(opt.components));
  const fMin = Math.max(1, Math.floor(opt.freqMin));
  const fMax = Math.max(fMin, Math.floor(opt.freqMax));

  for (let i = 0; i < compCount; i++) {
    // Pick a non-zero integer frequency vector.
    let kx = 0;
    let ky = 0;
    for (let tries = 0; tries < 8 && kx === 0 && ky === 0; tries++) {
      kx = pickInt(rng, -fMax, fMax);
      ky = pickInt(rng, -fMax, fMax);
      if (Math.abs(kx) < fMin) kx = 0;
      if (Math.abs(ky) < fMin) ky = 0;
    }
    if (kx === 0 && ky === 0) kx = fMin;

    const phase = rng() * Math.PI * 2;
    const kLen = Math.sqrt(kx * kx + ky * ky);
    const amp = 1.0 / Math.pow(Math.max(1e-3, kLen), Math.max(0.1, opt.falloff));
    comps.push({ kx, ky, phase, amp });
  }

  // Normalize amplitude so the strength control is stable across settings.
  let ampSum = 0;
  for (const c of comps) ampSum += c.amp;
  const ampNorm = ampSum > 1e-6 ? 1 / ampSum : 1.0;
  for (const c of comps) c.amp *= ampNorm;

  const data = new Uint8Array(size * size * 4);
  const twoPi = Math.PI * 2;

  // Strength is applied to the gradient (slope) before normalization.
  const strength = Math.max(0, opt.strength);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;

      // Analytic gradient in normalized texture-space (u,v).
      let dhdu = 0;
      let dhdv = 0;

      for (const c of comps) {
        const arg = twoPi * (c.kx * u + c.ky * v) + c.phase;
        const ca = Math.cos(arg);
        // d/du sin(2π(kx u + ky v) + phase) = cos(arg) * 2π*kx
        dhdu += c.amp * ca * twoPi * c.kx;
        dhdv += c.amp * ca * twoPi * c.ky;
      }

      // Convert slope -> normal in the plane's local frame:
      // tangent = +X, bitangent = +Z, normal = +Y.
      let nx = -dhdu * strength;
      let ny = 1.0;
      let nz = -dhdv * strength;

      const invLen = 1 / Math.max(1e-9, Math.sqrt(nx * nx + ny * ny + nz * nz));
      nx *= invLen;
      ny *= invLen;
      nz *= invLen;

      // Encode to tangent-space normal map:
      // R = tangent (X), G = bitangent (Z), B = normal (Y)
      const r = Math.max(0, Math.min(255, Math.round((nx * 0.5 + 0.5) * 255)));
      const g = Math.max(0, Math.min(255, Math.round((nz * 0.5 + 0.5) * 255)));
      const b = Math.max(0, Math.min(255, Math.round((ny * 0.5 + 0.5) * 255)));

      const idx = (y * size + x) * 4;
      data[idx + 0] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  const tex = new THREE.DataTexture(data, size, size);
  tex.name = 'MicroNormalTexture';
  tex.flipY = false;
  // Normal maps must stay in linear space.
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

export function makeMicroNormalSet(): { ripples: THREE.DataTexture; capillary: THREE.DataTexture } {
  // A slightly softer ripple field and a sharper capillary field.
  const ripples = makeMicroNormalTexture({
    size: 256,
    seed: 1337421,
    components: 14,
    freqMin: 4,
    freqMax: 42,
    strength: 0.0075,
    falloff: 1.15
  });

  const capillary = makeMicroNormalTexture({
    size: 256,
    seed: 991103,
    components: 18,
    freqMin: 14,
    freqMax: 96,
    strength: 0.0105,
    falloff: 1.25
  });

  ripples.name = 'MicroNormal_Ripples';
  capillary.name = 'MicroNormal_Capillary';

  return { ripples, capillary };
}
