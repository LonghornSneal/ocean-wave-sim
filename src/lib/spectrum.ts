import { clamp, degToRad, randn } from './math';
import { G, solveWaveNumber } from './wavePhysics';

export interface SpectrumInputs {
  Hs_m: number;
  Tp_s: number;
  depth_m: number;

  /** Wind direction (toward) in radians. */
  windDirTo_rad: number;

  /** Number of Gerstner components. */
  waveCount: number;

  /** Directional spread (0..1). 0 = all aligned, 1 = wide. */
  directionalSpread: number;

  /** Peak enhancement factor for JONSWAP (≈1..7). 1 gives Pierson–Moskowitz-like shape. */
  gamma: number;

  /** Overall choppiness (0..2). */
  choppiness: number;

  /** Seed for deterministic wave field. */
  seed: number;

  /** Optional: swell direction (toward) in radians. If omitted, windDirTo_rad is used. */
  swellDirTo_rad?: number;

  /** Optional: fraction of total variance placed into the swell band (0..1). */
  swellVariance?: number;
}

export interface WaveComponent {
  dirX: number;
  dirZ: number;
  A: number;     // vertical amplitude (m)
  k: number;     // wave number (1/m)
  omega: number; // intrinsic angular freq (rad/s)
  phase: number; // random phase (rad)
  Q: number;     // gerstner steepness/choppiness per-wave
}

interface BandInputs {
  Hs_m: number;
  fp_hz: number;
  fmin_hz: number;
  fmax_hz: number;
  gamma: number;
  dirTo_rad: number;
  spread_rad: number;
  choppiness: number;
  depth_m: number;
  waveCount: number;
  seed: number;
  seedOffset: number;
}

/**
 * JONSWAP spectral density S(f) [m^2/Hz].
 *
 * Form: S(f) = α g^2 (2π)^-4 f^-5 exp[-5/4 (fp/f)^4] γ^r
 * where r = exp[-(f-fp)^2 / (2 σ^2 fp^2)] and σ = 0.07 (f<=fp) else 0.09.
 */
function jonswapS(f: number, fp: number, alpha: number, gamma: number): number {
  if (f <= 0) return 0;
  const sigma = f <= fp ? 0.07 : 0.09;
  const r = Math.exp(-Math.pow(f - fp, 2) / (2 * sigma * sigma * fp * fp));
  const pm = alpha * (G * G) * Math.pow(2 * Math.PI, -4) * Math.pow(f, -5) * Math.exp(-1.25 * Math.pow(fp / f, 4));
  return pm * Math.pow(gamma, r);
}

/**
 * Find α such that integral S(f) df = m0 = (Hs/4)^2
 */
function solveAlphaForHs(Hs: number, fp: number, gamma: number, fmin: number, fmax: number): number {
  const m0Target = Math.pow(Hs / 4, 2);
  if (m0Target <= 0) return 0;

  // Integrate with alpha = 1
  const N = 2048;
  const df = (fmax - fmin) / N;
  let m0Base = 0;
  for (let i = 0; i < N; i++) {
    const f = fmin + (i + 0.5) * df;
    m0Base += jonswapS(f, fp, 1.0, gamma) * df;
  }
  if (m0Base <= 1e-12) return 0;
  return m0Target / m0Base;
}

function buildBand(b: BandInputs): WaveComponent[] {
  const N = Math.max(0, Math.floor(b.waveCount));
  if (N <= 0) return [];

  const Hs = Math.max(0, b.Hs_m);
  const fp = Math.max(1e-6, b.fp_hz);

  const fmin = Math.max(0.01, Math.min(b.fmin_hz, b.fmax_hz * 0.999));
  const fmax = Math.max(fmin * 1.05, b.fmax_hz);

  const gamma = clamp(b.gamma, 1.0, 7.0);
  const alpha = solveAlphaForHs(Hs, fp, gamma, fmin, fmax);

  const logFmin = Math.log(fmin);
  const logFmax = Math.log(fmax);

  const comps: WaveComponent[] = [];
  for (let i = 0; i < N; i++) {
    const t = (i + 0.5) / N;
    // Log-spaced, with a tiny deterministic jitter to avoid repeated “signature” patterns.
    const baseF = Math.exp(logFmin + (logFmax - logFmin) * t);
    const fj = clamp(1 + 0.08 * randn(b.seed + b.seedOffset + i * 13.0, b.seed + b.seedOffset + i * 29.0), 0.75, 1.25);
    const f = clamp(baseF * fj, fmin, fmax);

    const omega = 2 * Math.PI * f;
    const k = solveWaveNumber(omega, b.depth_m);

    // For log spacing, approximate Δf by neighbor distance.
    const fPrev = Math.exp(logFmin + (logFmax - logFmin) * Math.max(0, (i - 0.5) / N));
    const fNext = Math.exp(logFmin + (logFmax - logFmin) * Math.min(1, (i + 1.5) / N));
    const df = Math.max(1e-6, 0.5 * (fNext - fPrev));

    const S = jonswapS(f, fp, alpha, gamma);
    const A = Math.sqrt(Math.max(0, 2 * S * df));

    const jitter = randn(b.seed + b.seedOffset + i * 17.0, b.seed + b.seedOffset + i * 37.0) * b.spread_rad;
    const theta = b.dirTo_rad + jitter;
    const dirX = Math.cos(theta);
    const dirZ = Math.sin(theta);

    const phase = 2 * Math.PI * (((b.seed + b.seedOffset + i * 91.0) * 0.0001) % 1);

    // Choppiness Q: keep below self-intersection.
    const safe = 1 / Math.max(1e-6, k * A * Math.max(1, N));
    const Q = clamp(b.choppiness * safe, 0, 1.0);

    comps.push({ dirX, dirZ, A, k, omega, phase, Q });
  }
  return comps;
}

/**
 * Build a stable set of Gerstner components whose amplitudes are derived from a JONSWAP-like spectrum
 * matching Hs and Tp, and whose directions are spread around the wind direction.
 */
export function buildWaveComponents(inp: SpectrumInputs): WaveComponent[] {
  // We still return a single flat array of Gerstner components, but internally we
  // split the spectrum into two bands:
  // - wind sea: higher frequency, aligned with wind direction
  // - swell: lower frequency, more stable direction, smoother
  //
  // Ordering is intentional: wind sea FIRST so foam/wake sims that only sample the
  // first N waves still see the steep/high-frequency content.

  const N = Math.floor(clamp(inp.waveCount, 4, 48));
  const Hs = Math.max(0, inp.Hs_m);
  const Tp = Math.max(0.5, inp.Tp_s);
  const fp = 1 / Tp;

  // Split variance (m0), not Hs directly.
  const swellVar = clamp(inp.swellVariance ?? 0.33, 0.0, 0.85);
  const m0 = Math.pow(Hs / 4, 2);
  const m0S = m0 * swellVar;
  const m0W = Math.max(0, m0 - m0S);
  const HsS = 4 * Math.sqrt(Math.max(0, m0S));
  const HsW = 4 * Math.sqrt(Math.max(0, m0W));

  // Wave-count split (keep enough wind waves for breaking patterns).
  const Ns = Math.max(2, Math.min(N - 8, Math.round(N * 0.30)));
  const Nw = Math.max(4, N - Ns);

  // Direction spreads.
  // Use a much wider directional spread at high values so "cross seas" (waves
  // arriving from many headings) are possible.
  const ds = clamp(inp.directionalSpread, 0, 1);
  const spreadW = degToRad(10 + 110 * ds);
  const spreadS = degToRad(4 + 28 * ds);

  // Wind sea frequency range: around fp with a high-frequency tail.
  const fminW = Math.max(0.03, 0.25 * fp);
  const fmaxW = Math.max(fminW * 1.1, 8.0 * fp);

  // Swell: longer-period content below fp.
  const TpS = clamp(Tp * (1.35 + 0.45 * swellVar), 5.0, 22.0);
  const fpS = 1 / TpS;
  const fminS = Math.max(0.015, 0.18 * fpS);
  const fmaxS = Math.max(fminS * 1.1, Math.min(0.95 * fp, 1.6 * fpS));

  const gammaW = clamp(inp.gamma, 1.0, 7.0);
  const gammaS = clamp(1.0 + 0.25 * (gammaW - 1.0), 1.0, 2.0);

  const windDir = inp.windDirTo_rad;
  const swellDir = inp.swellDirTo_rad ?? inp.windDirTo_rad;

  const windChop = clamp(inp.choppiness, 0.0, 2.0);
  const swellChop = clamp(inp.choppiness * 0.55, 0.0, 1.25);

  // When directionalSpread is high we intentionally generate a "cross sea":
  // multiple wind-sea lobes (wind / cross / counter) so waves collide.
  const crossSea = clamp((ds - 0.55) / 0.45, 0, 1);

  let wind: WaveComponent[];

  if (crossSea < 0.01) {
    wind = buildBand({
      Hs_m: HsW,
      fp_hz: fp,
      fmin_hz: fminW,
      fmax_hz: fmaxW,
      gamma: gammaW,
      dirTo_rad: windDir,
      spread_rad: spreadW,
      choppiness: windChop,
      depth_m: inp.depth_m,
      waveCount: Nw,
      seed: inp.seed,
      seedOffset: 0
    });
  } else {
    // Split wind-sea variance into multiple directional lobes.
    // NOTE: Split variance (m0), not Hs, so the total Hs stays consistent.
    const lobes = [
      { dir: windDir, w: (1 - crossSea) * 1.0 + crossSea * 0.42, seedOffset: 0, chop: windChop },
      { dir: windDir + Math.PI * 0.5, w: crossSea * 0.22, seedOffset: 2000, chop: windChop * 0.95 },
      { dir: windDir - Math.PI * 0.5, w: crossSea * 0.22, seedOffset: 4000, chop: windChop * 0.95 },
      // Counter-wind lobe: smaller energy (opposing waves dissipate/break more).
      { dir: windDir + Math.PI, w: crossSea * 0.18, seedOffset: 6000, chop: windChop * 0.80 }
    ];

    const wSum = lobes.reduce((acc, l) => acc + Math.max(0, l.w), 0);
    const wNorm = wSum > 1e-6 ? 1.0 / wSum : 1.0;

    // Allocate wave counts deterministically.
    const rawCounts = lobes.map((l) => Nw * Math.max(0, l.w) * wNorm);
    const counts = rawCounts.map((c) => Math.max(1, Math.floor(c)));
    let remain = Nw - counts.reduce((a, b) => a + b, 0);
    // Distribute remaining components to the lobes with the biggest fractional parts.
    const fracs = rawCounts.map((c, i) => ({ i, f: c - Math.floor(c) }));
    fracs.sort((a, b) => b.f - a.f);
    let k = 0;
    while (remain > 0) {
      counts[fracs[k % fracs.length].i] += 1;
      remain--;
      k++;
    }
    // If we somehow over-allocated (rare edge case), pull back from smallest weights.
    while (remain < 0) {
      // Find a lobe with count > 1 and smallest weight.
      let best = -1;
      let bestW = Infinity;
      for (let i = 0; i < lobes.length; i++) {
        if (counts[i] > 1 && lobes[i].w < bestW) {
          best = i;
          bestW = lobes[i].w;
        }
      }
      if (best < 0) break;
      counts[best] -= 1;
      remain++;
    }

    // Split variance across lobes.
    wind = [];
    for (let i = 0; i < lobes.length; i++) {
      const l = lobes[i];
      const m0i = m0W * (Math.max(0, l.w) * wNorm);
      const Hsi = 4 * Math.sqrt(Math.max(0, m0i));
      if (Hsi <= 0 || counts[i] <= 0) continue;

      // Each lobe has a slightly *narrower* core than the global spread,
      // but crossSea increases the per-lobe spread so headings overlap.
      const spreadLocal = degToRad(12 + 80 * crossSea);

      wind.push(
        ...buildBand({
          Hs_m: Hsi,
          fp_hz: fp,
          fmin_hz: fminW,
          fmax_hz: fmaxW,
          gamma: gammaW,
          dirTo_rad: l.dir,
          spread_rad: spreadLocal,
          choppiness: clamp(l.chop, 0, 2.0),
          depth_m: inp.depth_m,
          waveCount: counts[i],
          seed: inp.seed,
          seedOffset: l.seedOffset
        })
      );
    }
  }

  const swell = buildBand({
    Hs_m: HsS,
    fp_hz: fpS,
    fmin_hz: fminS,
    fmax_hz: fmaxS,
    gamma: gammaS,
    dirTo_rad: swellDir,
    spread_rad: spreadS,
    choppiness: swellChop,
    depth_m: inp.depth_m,
    waveCount: Ns,
    seed: inp.seed,
    seedOffset: 10007
  });

  return [...wind, ...swell];
}
