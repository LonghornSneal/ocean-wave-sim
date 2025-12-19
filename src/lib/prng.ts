/** Tiny deterministic PRNG + noise helpers (no external deps). */

export function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

export function fract(x: number): number {
  return x - Math.floor(x);
}

/** Mulberry32 PRNG. Returns a function that yields numbers in [0,1). */
export function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash a float into [0,1) (deterministic). */
export function hash1(n: number): number {
  // A common shader-style hash.
  return fract(Math.sin(n) * 43758.5453123);
}

/** Smoothstep interpolation. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** 1D value noise in [0,1). */
export function noise1(x: number, seed = 0): number {
  const i = Math.floor(x);
  const f = x - i;
  const a = hash1(i + seed * 101.13);
  const b = hash1(i + 1 + seed * 101.13);
  return a + (b - a) * smoothstep(0, 1, f);
}

/** Fractal Brownian motion (fBm) 1D noise in [0,1). */
export function fbm1(x: number, seed = 0, octaves = 4): number {
  let amp = 0.5;
  let freq = 1.0;
  let sum = 0.0;
  let norm = 0.0;
  for (let o = 0; o < octaves; o++) {
    sum += amp * noise1(x * freq, seed + o * 17.0);
    norm += amp;
    amp *= 0.5;
    freq *= 2.0;
  }
  return norm > 0 ? sum / norm : 0;
}
