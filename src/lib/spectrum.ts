import { clamp, degToRad, randn } from './math';
import { G, buildWindSeaSpectrumFromU10, deriveSwellSeed, generateSwellSpectrum, solveWaveNumber } from './wavePhysics';

export interface SpectrumInputs {
  Hs_m: number;
  Tp_s: number;
  depth_m: number;

  /** Wind direction (toward) in radians. */
  windDirTo_rad: number;

  /** Optional U10 wind speed (m/s) to seed a wind-sea spectrum. */
  windSpeed_mps?: number;

  /** Number of Gerstner components. */
  waveCount: number;

  /** Directional spread (0..1). 0 = all aligned, 1 = wide. */
  directionalSpread: number;

  /** Peak enhancement factor for JONSWAP (≈1..7). 1 gives Pierson–Moskowitz-like shape. */
  gamma: number;

  /** Overall choppiness (0..2). */
  choppiness: number;

  /** Optional: capillary amplitude scale (m). */
  capillaryAmplitude_m?: number;

  /** Optional: capillary slope falloff exponent (>=0). */
  capillarySlopeFalloff?: number;

  /** Optional: capillary directional spread (0..1). 0 = wind-aligned. */
  capillaryDirectionalSpread?: number;

  /** Optional: capillary component count override. */
  capillaryWaveCount?: number;

  /** Seed for deterministic wave field. */
  seed: number;

  /** Optional: seed for swell band (separate from wind). */
  swellSeed?: number;

  /** Optional: swell direction (toward) in radians. If omitted, windDirTo_rad is used. */
  swellDirTo_rad?: number;

  /** Optional: fraction of total variance placed into the swell band (0..1). */
  swellVariance?: number;
}

export type WaveBandLabel = 'windSea' | 'windMid' | 'capillary' | 'swell' | 'tide' | 'seiche';

export type WaveBandTag =
  | 'wind'
  | 'swell'
  | 'capillary'
  | 'tide'
  | 'seiche'
  | 'foam'
  | 'event'
  | 'breaking'
  | 'cross'
  | 'counter'
  | 'primary';

export interface WaveBandMeta {
  label: WaveBandLabel;
  tags: WaveBandTag[];
  /** 0..1 crest sharpness for foam/event weighting. */
  crestSharpness: number;
  /** Optional absolute time window for band activity. */
  timeWindow_s?: { start_s: number; end_s: number };
}

export interface WaveComponent {
  dirX: number;
  dirZ: number;
  A: number;     // vertical amplitude (m)
  k: number;     // wave number (1/m)
  omega: number; // intrinsic angular freq (rad/s); negative marks standing seiche
  phase: number; // random phase (rad)
  Q: number;     // gerstner steepness/choppiness per-wave
  band: WaveBandMeta;
}

export type WaveTagMatchMode = 'any' | 'all';

export function waveHasAnyTag(wave: WaveComponent, tags: readonly WaveBandTag[]): boolean {
  if (tags.length === 0) return true;
  for (const tag of tags) {
    if (wave.band.tags.includes(tag)) return true;
  }
  return false;
}

export function waveHasAllTags(wave: WaveComponent, tags: readonly WaveBandTag[]): boolean {
  if (tags.length === 0) return true;
  for (const tag of tags) {
    if (!wave.band.tags.includes(tag)) return false;
  }
  return true;
}

export function waveMatchesTags(
  wave: WaveComponent,
  include?: readonly WaveBandTag[],
  exclude?: readonly WaveBandTag[],
  mode: WaveTagMatchMode = 'any'
): boolean {
  if (include && include.length) {
    const matches = mode === 'all' ? waveHasAllTags(wave, include) : waveHasAnyTag(wave, include);
    if (!matches) return false;
  }
  if (exclude && exclude.length && waveHasAnyTag(wave, exclude)) return false;
  return true;
}

export function waveBandWeight(wave: WaveComponent, requiredTag?: WaveBandTag): number {
  const sharp = clamp(wave.band.crestSharpness, 0, 0.999);
  if (requiredTag && !wave.band.tags.includes(requiredTag)) return 0;
  return sharp;
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
  maxSteepness?: number;
  octaveCap?: number;
  octavePriority?: 'low' | 'high';
  freqJitter?: number;
  outputOrder?: 'low' | 'high';
  depth_m: number;
  waveCount: number;
  seed: number;
  seedOffset: number;
  band: WaveBandMeta;
}

interface CapillaryInputs {
  wavelengthMin_m: number;
  wavelengthMax_m: number;
  amplitude_m: number;
  slopeFalloff: number;
  dirTo_rad: number;
  spread_rad: number;
  choppiness: number;
  maxSteepness: number;
  octaveCap?: number;
  octavePriority?: 'low' | 'high';
  freqJitter?: number;
  outputOrder?: 'low' | 'high';
  depth_m: number;
  waveCount: number;
  seed: number;
  seedOffset: number;
  band: WaveBandMeta;
}

const CAPILLARY_SIGMA_NPM = 0.074;
const WATER_DENSITY_KGPM3 = 1000;
const CAPILLARY_SIGMA_OVER_RHO = CAPILLARY_SIGMA_NPM / WATER_DENSITY_KGPM3;
const CAPILLARY_REF_LAMBDA_M = 0.1;
const CAPILLARY_LAMBDA_MIN_M = 0.015;
const CAPILLARY_LAMBDA_MAX_M = 0.25;
const MAX_COMPONENT_STEEPNESS = 0.85;
const MAX_CAPILLARY_STEEPNESS = 0.65;

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

function allocateOctaveCounts(total: number, octaveCount: number, maxPerOctave: number, priority: 'low' | 'high'): number[] {
  const counts = new Array(octaveCount).fill(0);
  if (total <= 0 || octaveCount <= 0) return counts;

  const cap = Math.max(1, Math.floor(maxPerOctave));
  const base = Math.min(cap, Math.floor(total / octaveCount));
  for (let i = 0; i < octaveCount; i++) counts[i] = base;

  let remaining = total - base * octaveCount;
  if (remaining <= 0) return counts;

  const order = priority === 'high'
    ? (i: number) => octaveCount - 1 - i
    : (i: number) => i;

  let guard = 0;
  while (remaining > 0 && guard < octaveCount * cap * 2) {
    const o = order(guard % octaveCount);
    if (counts[o] < cap) {
      counts[o] += 1;
      remaining -= 1;
    }
    guard += 1;
  }

  return counts;
}

function capillaryOmega(k: number, depth_m: number): number {
  const h = Math.max(0.5, depth_m);
  const w2 = (G * k + CAPILLARY_SIGMA_OVER_RHO * k * k * k) * Math.tanh(k * h);
  return Math.sqrt(Math.max(0, w2));
}

function buildBand(b: BandInputs): WaveComponent[] {
  const targetN = Math.max(0, Math.floor(b.waveCount));
  if (targetN <= 0) return [];

  const Hs = Math.max(0, b.Hs_m);
  const fp = Math.max(1e-6, b.fp_hz);

  const fmin = Math.max(0.01, Math.min(b.fmin_hz, b.fmax_hz * 0.999));
  const fmax = Math.max(fmin * 1.05, b.fmax_hz);

  const gamma = clamp(b.gamma, 1.0, 7.0);
  const alpha = solveAlphaForHs(Hs, fp, gamma, fmin, fmax);
  const maxSteepness = clamp(b.maxSteepness ?? MAX_COMPONENT_STEEPNESS, 0.05, 1.0);

  const octaveCount = Math.max(1, Math.ceil(Math.log2(fmax / fmin)));
  const capPerOctave = Math.max(1, Math.floor(b.octaveCap ?? 8));
  const N = Math.min(targetN, octaveCount * capPerOctave);
  const octaveCounts = allocateOctaveCounts(N, octaveCount, capPerOctave, b.octavePriority ?? 'high');
  const octaveOrder = new Array(octaveCount).fill(0).map((_, i) => i);
  if ((b.outputOrder ?? 'high') === 'high') octaveOrder.reverse();
  const freqJitter = clamp(b.freqJitter ?? 0.08, 0, 0.35);
  const seedBase = b.seed + b.seedOffset;

  const comps: WaveComponent[] = [];
  let idx = 0;
  for (const octave of octaveOrder) {
    const count = octaveCounts[octave];
    if (count <= 0) continue;
    const f0 = fmin * Math.pow(2, octave);
    const f1 = Math.min(fmax, f0 * 2);
    const logF0 = Math.log(f0);
    const logF1 = Math.log(f1);
    for (let j = 0; j < count; j++) {
      const t = (j + 0.5) / count;
      // Log-spaced within the octave, with deterministic jitter to avoid repeats.
      const baseF = Math.exp(logF0 + (logF1 - logF0) * t);
      const fj = clamp(1 + freqJitter * randn(seedBase + idx * 13.0, seedBase + idx * 29.0), 0.75, 1.25);
      const f = clamp(baseF * fj, f0, f1);

      const omega = 2 * Math.PI * f;
      const k = solveWaveNumber(omega, b.depth_m);

      // For log spacing, approximate Δf by neighbor distance (per-octave).
      const fPrev = Math.exp(logF0 + (logF1 - logF0) * Math.max(0, (j - 0.5) / count));
      const fNext = Math.exp(logF0 + (logF1 - logF0) * Math.min(1, (j + 1.5) / count));
      const df = Math.max(1e-6, 0.5 * (fNext - fPrev));

      const S = jonswapS(f, fp, alpha, gamma);
      const A = Math.sqrt(Math.max(0, 2 * S * df));

      const jitter = randn(seedBase + idx * 17.0, seedBase + idx * 37.0) * b.spread_rad;
      const theta = b.dirTo_rad + jitter;
      const dirX = Math.cos(theta);
      const dirZ = Math.sin(theta);

      const phase = 2 * Math.PI * (((seedBase + idx * 91.0) * 0.0001) % 1);

      // Choppiness Q: keep below self-intersection.
      const safe = 1 / Math.max(1e-6, k * A * Math.max(1, N));
      let Q = clamp(b.choppiness * safe, 0, 1.0);
      const steepness = Q * k * A;
      if (steepness > maxSteepness) {
        Q = maxSteepness / Math.max(1e-6, k * A);
      }

      comps.push({ dirX, dirZ, A, k, omega, phase, Q, band: b.band });
      idx += 1;
    }
  }
  return comps;
}

function applyCrestSteepening(waves: WaveComponent[], strength: number, maxSteepness: number): WaveComponent[] {
  const s = clamp(strength, 0, 1);
  if (s <= 0 || waves.length === 0) return waves;

  const qBoost = 1 + 0.6 * s;
  const maxSteep = clamp(maxSteepness, 0.05, 1.0);

  return waves.map((w) => {
    let Q = clamp(w.Q * qBoost, 0, 1.0);
    const steepness = Q * w.k * w.A;
    if (steepness > maxSteep) {
      Q = maxSteep / Math.max(1e-6, w.k * w.A);
    }
    return { ...w, Q };
  });
}

function buildCapillaryBand(c: CapillaryInputs): WaveComponent[] {
  const targetN = Math.max(0, Math.floor(c.waveCount));
  const amplitude = Math.max(0, c.amplitude_m);
  if (targetN <= 0 || amplitude <= 0) return [];

  const lambdaMin = Math.max(1e-4, Math.min(c.wavelengthMin_m, c.wavelengthMax_m * 0.999));
  const lambdaMax = Math.max(lambdaMin * 1.05, c.wavelengthMax_m);

  const slope = Math.max(0, c.slopeFalloff);
  const octaveCount = Math.max(1, Math.ceil(Math.log2(lambdaMax / lambdaMin)));
  const capPerOctave = Math.max(1, Math.floor(c.octaveCap ?? 6));
  const N = Math.min(targetN, octaveCount * capPerOctave);
  const capPriority = c.octavePriority ?? 'high';
  const allocPriority = capPriority === 'high' ? 'low' : 'high'; // wavelength octaves invert frequency
  const octaveCounts = allocateOctaveCounts(N, octaveCount, capPerOctave, allocPriority);
  const octaveOrder = new Array(octaveCount).fill(0).map((_, i) => i);
  if ((c.outputOrder ?? 'high') === 'low') octaveOrder.reverse();
  const ampScale = amplitude / Math.sqrt(Math.max(1, N));
  const kRef = (2 * Math.PI) / CAPILLARY_REF_LAMBDA_M;
  const maxSteepness = clamp(c.maxSteepness, 0.05, 1.0);
  const freqJitter = clamp(c.freqJitter ?? 0.12, 0, 0.45);
  const seedBase = c.seed + c.seedOffset;

  const comps: WaveComponent[] = [];
  let idx = 0;
  for (const octave of octaveOrder) {
    const count = octaveCounts[octave];
    if (count <= 0) continue;
    const l0 = lambdaMin * Math.pow(2, octave);
    const l1 = Math.min(lambdaMax, l0 * 2);
    const logL0 = Math.log(l0);
    const logL1 = Math.log(l1);
    for (let j = 0; j < count; j++) {
      const t = (j + 0.5) / count;
      const baseL = Math.exp(logL0 + (logL1 - logL0) * t);
      const lj = clamp(1 + freqJitter * randn(seedBase + idx * 11.0, seedBase + idx * 31.0), 0.75, 1.25);
      const lambda = clamp(baseL * lj, l0, l1);

      const k = (2 * Math.PI) / lambda;
      const omega = capillaryOmega(k, c.depth_m);
      const A = ampScale * Math.pow(k / kRef, -slope);

      const jitter = randn(seedBase + idx * 19.0, seedBase + idx * 43.0) * c.spread_rad;
      const theta = c.dirTo_rad + jitter;
      const dirX = Math.cos(theta);
      const dirZ = Math.sin(theta);

      const phase = 2 * Math.PI * (((seedBase + idx * 67.0) * 0.0001) % 1);

      const safe = 1 / Math.max(1e-6, k * A * Math.max(1, N));
      let Q = clamp(c.choppiness * safe, 0, 1.0);
      const steepness = Q * k * A;
      if (steepness > maxSteepness) {
        Q = maxSteepness / Math.max(1e-6, k * A);
      }

      comps.push({ dirX, dirZ, A, k, omega, phase, Q, band: c.band });
      idx += 1;
    }
  }
  return comps;
}

function tuneSwellVariance(base: number, swellCount: number, totalCount: number): number {
  const baseClamped = clamp(base, 0, 0.85);
  if (totalCount <= 0) return baseClamped;
  const share = clamp(swellCount / totalCount, 0, 1);
  // Cap swell energy when we don't have enough long-period components to carry it cleanly.
  const maxVar = clamp(0.25 + 0.95 * share, 0.25, 0.65);
  return Math.min(baseClamped, maxVar);
}

/**
 * Build a stable set of Gerstner components whose amplitudes are derived from a JONSWAP-like spectrum
 * matching Hs and Tp, and whose directions are spread around the wind direction.
 */
export function buildWaveComponents(inp: SpectrumInputs): WaveComponent[] {
  // We still return a single flat array of Gerstner components, but internally we
  // split the spectrum into bands (wind sea, optional mid-wind, capillary, swell).
  // Ordering is intentional: wind bands (high->low) first so limited consumers keep
  // the important high-frequency gravity-wave content, then capillary, then swell.

  const N = Math.floor(clamp(inp.waveCount, 4, 48));
  const Hs = Math.max(0, inp.Hs_m);
  const Tp = Math.max(0.5, inp.Tp_s);
  const fp = 1 / Tp;
  const windSpeed = Math.max(0, inp.windSpeed_mps ?? 0);
  const windSpec = windSpeed > 0.75 ? buildWindSeaSpectrumFromU10(windSpeed) : null;
  const wind01 = clamp(windSpeed / 26.0, 0, 1);

  const swellVarInput = clamp(inp.swellVariance ?? 0.33, 0.0, 0.85);

  // Direction spreads.
  // Use a much wider directional spread at high values so "cross seas" (waves
  // arriving from many headings) are possible.
  const ds = clamp(inp.directionalSpread, 0, 1);
  const spreadW = degToRad(10 + 110 * ds);
  const capSpread01 = clamp(inp.capillaryDirectionalSpread ?? (0.12 + 0.38 * ds), 0, 1);
  const spreadC = degToRad(20 * capSpread01);

  const chop01 = clamp(inp.choppiness / 2.0, 0, 1);
  const capAmplitude = Math.max(0, inp.capillaryAmplitude_m ?? (0.0015 + 0.0025 * chop01));
  const capSlope = Math.max(0, inp.capillarySlopeFalloff ?? 1.2);
  const capCountTarget = inp.capillaryWaveCount ?? Math.round(N * 0.2);
  const capCountMax = Math.max(0, N - 6);
  const Nc = capAmplitude > 0 ? Math.max(0, Math.min(Math.floor(capCountTarget), capCountMax)) : 0;

  // Wave-count split (keep enough wind waves for breaking patterns).
  const Nrem = Math.max(0, N - Nc);
  const swellCountTarget = Math.round(Nrem * (0.18 + 0.12 * swellVarInput));
  const Ns = Math.max(2, Math.min(Nrem - 8, swellCountTarget));
  const NwBase = Math.max(4, Nrem - Ns);
  let Nmid = 0;
  if (windSpec && NwBase >= 6) {
    const targetMid = Math.round(NwBase * 0.28);
    Nmid = Math.min(Math.max(2, targetMid), NwBase - 4);
  }
  const Nw = Math.max(0, NwBase - Nmid);

  const swellVar = tuneSwellVariance(swellVarInput, Ns, Nrem);
  const m0 = Math.pow(Hs / 4, 2);
  const m0S = m0 * swellVar;
  const m0W = Math.max(0, m0 - m0S);
  const HsS = 4 * Math.sqrt(Math.max(0, m0S));
  const HsW = 4 * Math.sqrt(Math.max(0, m0W));

  let m0WMain = m0W;
  let HsWMain = HsW;
  let HsWMid = 0;
  if (windSpec && Nmid > 0) {
    const midVarFrac = clamp(0.12 + 0.18 * wind01, 0.1, 0.32);
    const m0Mid = m0W * midVarFrac;
    m0WMain = Math.max(0, m0W - m0Mid);
    HsWMid = 4 * Math.sqrt(Math.max(0, m0Mid));
    HsWMain = 4 * Math.sqrt(Math.max(0, m0WMain));
  }

  const swellSeed = inp.swellSeed ?? deriveSwellSeed(inp.seed);
  const swellSpec = generateSwellSpectrum({
    Tp_s: Tp,
    directionalSpread: ds,
    swellVariance: swellVar,
    seed: swellSeed
  });

  let fpS = swellSpec.fp_hz;
  let fminS = swellSpec.fmin_hz;
  let fmaxS = swellSpec.fmax_hz;
  const fmaxCap = 0.8 * fp;
  fmaxS = Math.min(fmaxS, fmaxCap);
  fminS = Math.min(fminS, fmaxS * 0.85);
  fminS = Math.max(0.008, fminS);
  fmaxS = Math.max(fmaxS, fminS * 1.05);
  fpS = clamp(fpS, fminS, fmaxS);

  // Wind sea frequency range: around fp with a high-frequency tail.
  const fminW = Math.max(0.03, 0.25 * fp, fmaxS * 1.1);
  const fmaxW = Math.max(fminW * 1.1, 8.0 * fp);

  const gammaW = clamp(inp.gamma, 1.0, 7.0);
  const gammaS = clamp(1.0 + 0.25 * (gammaW - 1.0), 1.0, 2.0);

  const windDir = inp.windDirTo_rad;
  const swellDir = inp.swellDirTo_rad ?? inp.windDirTo_rad;

  const windChop = clamp(inp.choppiness, 0.0, 2.0);
  const swellChop = clamp(inp.choppiness * 0.55, 0.0, 1.25);
  const capChop = clamp(inp.choppiness * 0.25, 0.0, 0.6);

  // When directionalSpread is high we intentionally generate a "cross sea":
  // multiple wind-sea lobes (wind / cross / counter) so waves collide.
  const crossSea = clamp((ds - 0.55) / 0.45, 0, 1);

  const crestStrength = windSpec ? clamp((windSpeed - 4.0) / 22.0, 0, 1) : 0;
  const midMaxSteep = clamp(MAX_COMPONENT_STEEPNESS + 0.12 * crestStrength, 0.05, 1.0);
  const crestWind = clamp(0.55 + 0.35 * wind01 + 0.2 * chop01 + 0.15 * crestStrength, 0.3, 0.95);
  const crestWindMid = clamp(crestWind + 0.08 * crestStrength, 0.35, 0.98);
  const crestSwell = clamp(0.18 + 0.25 * swellVar, 0.15, 0.55);
  const crestCapillary = clamp(0.12 + 0.28 * wind01, 0.1, 0.5);

  const bandWindPrimary: WaveBandMeta = {
    label: 'windSea',
    tags: ['wind', 'breaking', 'foam', 'event', 'primary'],
    crestSharpness: crestWind
  };
  const bandWindCross: WaveBandMeta = {
    label: 'windSea',
    tags: ['wind', 'breaking', 'foam', 'event', 'cross'],
    crestSharpness: crestWind * 0.95
  };
  const bandWindCounter: WaveBandMeta = {
    label: 'windSea',
    tags: ['wind', 'breaking', 'foam', 'event', 'counter'],
    crestSharpness: crestWind * 0.82
  };
  const bandWindMid: WaveBandMeta = {
    label: 'windMid',
    tags: ['wind', 'breaking', 'foam', 'event'],
    crestSharpness: crestWindMid
  };
  const bandCapillary: WaveBandMeta = {
    label: 'capillary',
    tags: ['capillary', 'wind'],
    crestSharpness: crestCapillary
  };
  const bandSwell: WaveBandMeta = {
    label: 'swell',
    tags: ['swell'],
    crestSharpness: crestSwell
  };
  let windMid: WaveComponent[] = [];
  if (windSpec && Nmid > 0 && HsWMid > 0) {
    const fpMid = 1 / windSpec.Tp_s;
    const fminMid = Math.max(0.05, 0.6 * fpMid);
    const fmaxMid = Math.max(fminMid * 1.1, 2.6 * fpMid);
    const dsMid = clamp(0.7 * windSpec.directionalSpread + 0.3 * ds, 0, 1);
    const spreadMid = degToRad(8 + 100 * dsMid);
    const windMidChop = clamp(windChop * (1.05 + 0.25 * crestStrength), 0.0, 2.4);

    windMid = buildBand({
      Hs_m: HsWMid,
      fp_hz: fpMid,
      fmin_hz: fminMid,
      fmax_hz: fmaxMid,
      gamma: windSpec.gamma,
      dirTo_rad: windDir,
      spread_rad: spreadMid,
      choppiness: windMidChop,
      maxSteepness: midMaxSteep,
      octaveCap: 8,
      octavePriority: 'high',
      freqJitter: 0.07,
      outputOrder: 'high',
      depth_m: inp.depth_m,
      waveCount: Nmid,
      seed: inp.seed,
      seedOffset: 7001,
      band: bandWindMid
    });
    windMid = applyCrestSteepening(windMid, crestStrength, midMaxSteep);
  }

  let wind: WaveComponent[];

  if (crossSea < 0.01) {
    wind = buildBand({
      Hs_m: HsWMain,
      fp_hz: fp,
      fmin_hz: fminW,
      fmax_hz: fmaxW,
      gamma: gammaW,
      dirTo_rad: windDir,
      spread_rad: spreadW,
      choppiness: windChop,
      maxSteepness: MAX_COMPONENT_STEEPNESS,
      octaveCap: 8,
      octavePriority: 'high',
      freqJitter: 0.08,
      outputOrder: 'high',
      depth_m: inp.depth_m,
      waveCount: Nw,
      seed: inp.seed,
      seedOffset: 0,
      band: bandWindPrimary
    });
  } else {
    // Split wind-sea variance into multiple directional lobes.
    // NOTE: Split variance (m0), not Hs, so the total Hs stays consistent.
    const lobes = [
      { dir: windDir, w: (1 - crossSea) * 1.0 + crossSea * 0.42, seedOffset: 0, chop: windChop, band: bandWindPrimary },
      { dir: windDir + Math.PI * 0.5, w: crossSea * 0.22, seedOffset: 2000, chop: windChop * 0.95, band: bandWindCross },
      { dir: windDir - Math.PI * 0.5, w: crossSea * 0.22, seedOffset: 4000, chop: windChop * 0.95, band: bandWindCross },
      // Counter-wind lobe: smaller energy (opposing waves dissipate/break more).
      { dir: windDir + Math.PI, w: crossSea * 0.18, seedOffset: 6000, chop: windChop * 0.80, band: bandWindCounter }
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
      const m0i = m0WMain * (Math.max(0, l.w) * wNorm);
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
          maxSteepness: MAX_COMPONENT_STEEPNESS,
          octaveCap: 8,
          octavePriority: 'high',
          freqJitter: 0.08,
          outputOrder: 'high',
          depth_m: inp.depth_m,
          waveCount: counts[i],
          seed: inp.seed,
          seedOffset: l.seedOffset,
          band: l.band
        })
      );
    }
  }

  const capillary = buildCapillaryBand({
    wavelengthMin_m: CAPILLARY_LAMBDA_MIN_M,
    wavelengthMax_m: CAPILLARY_LAMBDA_MAX_M,
    amplitude_m: capAmplitude,
    slopeFalloff: capSlope,
    dirTo_rad: windDir,
    spread_rad: spreadC,
    choppiness: capChop,
    maxSteepness: MAX_CAPILLARY_STEEPNESS,
    octaveCap: 4,
    octavePriority: 'high',
    freqJitter: 0.12,
    outputOrder: 'high',
    depth_m: inp.depth_m,
    waveCount: Nc,
    seed: inp.seed,
    seedOffset: 9001,
    band: bandCapillary
  });

  const swell = buildBand({
    Hs_m: HsS,
    fp_hz: fpS,
    fmin_hz: fminS,
    fmax_hz: fmaxS,
    gamma: gammaS,
    dirTo_rad: swellDir,
    spread_rad: swellSpec.spread_rad,
    choppiness: swellChop,
    maxSteepness: MAX_COMPONENT_STEEPNESS,
    octaveCap: 4,
    octavePriority: 'low',
    freqJitter: 0.05,
    outputOrder: 'high',
    depth_m: inp.depth_m,
    waveCount: Ns,
    seed: swellSeed,
    seedOffset: 0,
    band: bandSwell
  });

  const windAll = [...windMid, ...wind];
  windAll.sort((a, b) => b.omega - a.omega);
  capillary.sort((a, b) => b.omega - a.omega);
  swell.sort((a, b) => b.omega - a.omega);

  return [...windAll, ...capillary, ...swell];
}
