import { clamp, degToRad, hash1, lerp, randn, smoothstep } from './math';
import { mulberry32 } from './prng';
import type { WaveBandMeta, WaveComponent } from './spectrum';

export const G = 9.81;
export const OMEGA_EARTH = 7.2921159e-5; // rad/s

const TIDE_BAND: WaveBandMeta = {
  label: 'tide',
  tags: ['tide'],
  crestSharpness: 0
};

const SEICHE_BAND: WaveBandMeta = {
  label: 'seiche',
  tags: ['seiche'],
  crestSharpness: 0
};

export interface WindInputs {
  /** Pressure drop across a distance, in hPa (hectopascal). */
  pressureDrop_hPa: number;
  /** Distance over which that pressure drop happens, in km. */
  pressureDropDistance_km: number;
  /** Latitude in degrees, used for Coriolis (geostrophic estimate). */
  latitude_deg: number;
  /** Air density (kg/m^3). */
  rhoAir: number;

  /**
   * Air - sea temperature difference (°C). Positive means air warmer than sea (more stable),
   * negative means sea warmer (more unstable, typically stronger near-surface wind for same pressure gradient).
   */
  airSeaTempDelta_C: number;

  /**
   * Empirical reduction from geostrophic wind to 10 m wind over water.
   * Typical 0.7–0.95 (friction + turning + ageostrophic effects).
   */
  boundaryLayerReduction: number;

  /** A gustiness factor (0..1) to introduce small oscillation in wind speed. */
  gustiness: number;

  /** Wind direction in degrees (meteorological "from"). We'll interpret as direction waves travel *toward* = +180. */
  windDirFrom_deg: number;
}

export interface StormInputs {
  /** Storm radius (km). We use this to estimate geometric fetch (straight-line). */
  stormRadius_km: number;
  /** How much of storm diameter is effectively producing waves (0..1). */
  fetchUtilization: number;
  /** Storm age / duration of steady wind (hours). */
  stormAge_h: number;
  /** Optional wind ramp-up time (hours) to reduce effective duration. */
  windRamp_h: number;
}

export interface OceanInputs {
  /** Mean water depth (m). */
  depth_m: number;
}

export interface DerivedWind {
  Ug: number;    // geostrophic estimate (m/s)
  U10: number;   // 10 m wind speed (m/s)
  Cd: number;    // drag coefficient (-)
  uStar: number; // friction velocity (m/s)
  windDirTo_rad: number; // direction waves travel toward (radians)
}

export interface WindSeaSpectrum {
  /** Peak period (s). */
  Tp_s: number;
  /** JONSWAP peak enhancement factor. */
  gamma: number;
  /** Directional spread (0..1). */
  directionalSpread: number;
}

/**
 * Compute the derived friction velocity etc from a known U10.
 * Useful when wind speed is computed by a weather/environment model rather than pressure gradient.
 */
export function computeDerivedFromU10(U10: number, windDirFrom_deg: number): DerivedWind {
  const U = Math.max(0, U10);
  const Cd = dragCoefficientCEM(U);
  const uStar = U * Math.sqrt(Cd);
  const windDirFrom = (windDirFrom_deg * Math.PI) / 180;
  const windDirTo = windDirFrom + Math.PI;
  return {
    Ug: U,
    U10: U,
    Cd,
    uStar,
    windDirTo_rad: windDirTo
  };
}

/**
 * Approximate wind-sea spectral parameters from U10 using PM/JONSWAP heuristics.
 * - PM peak frequency: fp ≈ 0.13 g / U10 (fully developed)
 * - gamma tapers toward 1 as winds strengthen (older seas)
 * - directional spread narrows with higher wind speeds
 */
export function buildWindSeaSpectrumFromU10(U10: number): WindSeaSpectrum {
  const U = clamp(U10, 0, 60);
  const Ueff = Math.max(1.0, U);
  const fp = 0.13 * G / Ueff;
  const Tp = 1.0 / fp;

  const gamma = clamp(1.0 + 4.5 * Math.exp(-U / 12.0), 1.0, 5.5);
  const directionalSpread = clamp(0.85 - 0.02 * U, 0.2, 0.85);

  return {
    Tp_s: clamp(Tp, 2.5, 18.0),
    gamma,
    directionalSpread
  };
}

/**
 * Compute a geostrophic wind estimate from a pressure drop and distance.
 * Ug ≈ (1/(rho * f)) * |∂p/∂n|
 */
export function geostrophicWind(params: WindInputs): number {
  const lat = (params.latitude_deg * Math.PI) / 180;
  const f = 2 * OMEGA_EARTH * Math.sin(lat);
  const dp = params.pressureDrop_hPa * 100; // hPa -> Pa
  const dx = Math.max(1e-3, params.pressureDropDistance_km * 1000); // km -> m
  const dpdn = dp / dx; // Pa/m
  if (Math.abs(f) < 1e-6) {
    // Near equator geostrophic approximation breaks down; fall back to a small f
    return Math.abs(dpdn) / (params.rhoAir * 1e-6);
  }
  return Math.abs(dpdn) / (params.rhoAir * Math.abs(f));
}

/**
 * Drag coefficient parameterization used in CEM (EM 1110-2-1100 Part II, Eq II-2-36 section).
 * Cd = 0.001 * (1.1 + 0.035 * U10) where U10 is in m/s.
 */
export function dragCoefficientCEM(U10: number): number {
  const Cd = 0.001 * (1.1 + 0.035 * U10);
  return clamp(Cd, 0.0008, 0.0045);
}

export function computeDerivedWind(params: WindInputs, time_s: number): DerivedWind {
  const Ug = geostrophicWind(params);

  // Empirical stability factor (simple, but captures direction: stable -> weaker near-surface wind).
  const stabilityFactor = clamp(1 - 0.03 * params.airSeaTempDelta_C, 0.65, 1.25);

  // Small gust oscillation (deterministic sinusoid, not noise).
  const gust = 1 + params.gustiness * 0.12 * Math.sin(time_s * 0.9) + params.gustiness * 0.06 * Math.sin(time_s * 2.2);

  const U10 = Math.max(0, Ug * params.boundaryLayerReduction * stabilityFactor * gust);

  const Cd = dragCoefficientCEM(U10);
  const uStar = U10 * Math.sqrt(Cd);

  const windDirFrom = (params.windDirFrom_deg * Math.PI) / 180;
  // Convert to "to" direction (where wind is blowing toward).
  const windDirTo = windDirFrom + Math.PI;

  return {
    Ug,
    U10,
    Cd,
    uStar,
    windDirTo_rad: windDirTo
  };
}

export interface WaveState {
  Hs_m: number;
  Tp_s: number;
  /** Effective fetch used after applying duration limit (m). */
  fetchEffective_m: number;
  /** Geometric fetch (m). */
  fetchGeom_m: number;
  /** Duration-equivalent fetch (m). */
  fetchFromDuration_m: number;
}

export interface TideInputs {
  /** Peak sea-level offset (m). */
  amplitude_m: number;
  /** Tide period (s). */
  period_s: number;
  /** Phase offset (radians). */
  phase_rad: number;
}

export interface TideState {
  /** Instantaneous sea-level offset (m). */
  height_m: number;
  /** Signed tidal current speed (m/s). */
  current_mps: number;
  /** Instantaneous phase (radians). */
  phase_rad: number;
}

const TIDE_REF_PERIOD_S = 12.42 * 3600;
const TIDE_CURRENT_PER_M = 0.04;

export function computeTide(inp: TideInputs, time_s: number): TideState {
  const amp = Math.max(0, inp.amplitude_m);
  const period = Math.max(1e-3, inp.period_s);
  const omega = (2 * Math.PI) / period;
  const phase = omega * time_s + inp.phase_rad;
  const height = amp * Math.sin(phase);

  const periodScale = clamp(TIDE_REF_PERIOD_S / period, 0.25, 4.0);
  const currentAmp = amp * TIDE_CURRENT_PER_M * periodScale;
  const current = currentAmp * Math.cos(phase);

  return { height_m: height, current_mps: current, phase_rad: phase };
}

export interface TideComponentInputs {
  /** Peak vertical amplitude (m). */
  amplitude_m: number;
  /** Oscillation period (s). */
  period_s: number;
  /** Mean water depth (m). */
  depth_m: number;
  /** Direction the tidal component travels toward (radians). */
  dirTo_rad: number;
  /** Phase offset (radians). */
  phase_rad: number;
}

export function buildTideComponent(inp: TideComponentInputs): WaveComponent {
  const amp = Math.max(0, inp.amplitude_m);
  const period = Math.max(1e-3, inp.period_s);
  const omega = (2 * Math.PI) / period;
  const k = Math.max(1e-6, solveWaveNumber(omega, inp.depth_m));
  const dirX = Math.cos(inp.dirTo_rad);
  const dirZ = Math.sin(inp.dirTo_rad);
  // Align tide wave phase with computeTide's sin(omega * t + phase_rad).
  const phase = Math.PI - inp.phase_rad;
  const Q = 0.0;

  return {
    dirX,
    dirZ,
    A: amp,
    k,
    omega,
    phase,
    Q,
    band: TIDE_BAND
  };
}

export interface SeicheInputs {
  /** Peak vertical amplitude at antinodes (m). */
  amplitude_m: number;
  /** Oscillation period (s). */
  period_s: number;
  /** Mean water depth (m). */
  depth_m: number;
  /** Axis direction the standing wave aligns with (radians, toward). */
  dirTo_rad: number;
  /** Optional: basin length (m) for setting the standing-wave wavelength. */
  basinLength_m?: number;
  /** Optional: standing-wave mode index (1 = fundamental). */
  mode?: number;
}

/**
 * Build a simple standing seiche as two opposing long-wave components.
 * We encode seiche components with negative omega so samplers can switch to cosine time.
 */
export function buildSeicheComponents(inp: SeicheInputs): WaveComponent[] {
  const amp = Math.max(0, inp.amplitude_m);
  if (amp <= 1e-6) return [];

  const period = Math.max(1e-3, inp.period_s);
  const omega = (2 * Math.PI) / period;

  let k = solveWaveNumber(omega, inp.depth_m);
  if (typeof inp.basinLength_m === 'number' && Number.isFinite(inp.basinLength_m) && inp.basinLength_m > 1) {
    const mode = Math.max(1, Math.round(inp.mode ?? 1));
    k = (mode * Math.PI) / inp.basinLength_m;
  }
  k = Math.max(1e-6, k);

  const dirX = Math.cos(inp.dirTo_rad);
  const dirZ = Math.sin(inp.dirTo_rad);

  const A = 0.5 * amp;
  const phase = 0.0;
  const Q = 0.0;
  const omegaMarked = -omega;

  return [
    { dirX, dirZ, A, k, omega: omegaMarked, phase, Q, band: SEICHE_BAND },
    { dirX: -dirX, dirZ: -dirZ, A, k, omega: omegaMarked, phase, Q, band: SEICHE_BAND }
  ];
}

export interface SwellSpectrumInputs {
  Tp_s: number;
  directionalSpread: number;
  swellVariance: number;
  /** Seed for deterministic swell spectrum (separate from wind). */
  seed: number;
}

export interface SwellSpectrum {
  Tp_s: number;
  fp_hz: number;
  fmin_hz: number;
  fmax_hz: number;
  spread_rad: number;
  seed: number;
}

/** Derive a stable swell seed so the swell band stays decorrelated from wind-sea. */
export function deriveSwellSeed(baseSeed: number): number {
  const mixed = hash1(baseSeed * 0.913 + 0.173);
  return Math.floor(mixed * 1e9) + 1;
}

/**
 * USACE CEM simplified deepwater growth (Eq II-2-36..II-2-39) as parsed from EM 1110-2-1100 (Part II).
 *
 * - Fetch-limited growth (Eq II-2-36):
 *   g Hm0 / u*^2 = 4.13e-2 * (g X / u*^2)^(1/2)
 *   g Tp  / u*   = 0.651   * (g X / u*^2)^(1/3)
 *
 * - Fully developed limits (Eq II-2-37):
 *   g Hm0 / u*^2 = 2.115e2
 *   g Tp  / u*   = 2.398e2
 *
 * - Duration -> equivalent fetch (Eq II-2-38):
 *   g X / u*^2 = 5.23e-3 * (g t / u*)^(3/2)
 *
 * - Shallow water period limit (Eq II-2-39):
 *   Tp <= 9.78 * sqrt(d/g)
 *
 * Additionally we cap Hs <= 0.6 d as suggested nearby in the CEM text.
 */
export function predictWaveHsTpCEM(derived: DerivedWind, storm: StormInputs, ocean: OceanInputs): WaveState {
  const uStar = Math.max(1e-6, derived.uStar);

  const fetchGeom_m = Math.max(1.0, storm.stormRadius_km * 1000 * 2 * clamp(storm.fetchUtilization, 0.05, 1.0));

  const t_h = Math.max(0, storm.stormAge_h);
  // Reduce effective duration a little if wind ramps up instead of being instantly steady.
  const ramp = clamp(storm.windRamp_h, 0, 24);
  const tEff_h = Math.max(0, t_h - 0.5 * ramp);
  const t_s = tEff_h * 3600;

  // Eq II-2-38: convert duration to equivalent fetch X_dur.
  // gX/u*^2 = 5.23e-3 * (g t / u*)^(3/2)
  const nondimX_fromDuration = 5.23e-3 * Math.pow((G * t_s) / uStar, 1.5);
  const fetchFromDuration_m = (uStar * uStar / G) * nondimX_fromDuration;

  // Use whichever limits growth more (smaller nondimensional fetch).
  const fetchEffective_m = Math.max(1.0, Math.min(fetchGeom_m, fetchFromDuration_m));

  const nondimX = (G * fetchEffective_m) / (uStar * uStar);

  // Eq II-2-36
  let Hm0 = (uStar * uStar / G) * (4.13e-2 * Math.pow(nondimX, 0.5));
  let Tp = (uStar / G) * (0.651 * Math.pow(nondimX, 1 / 3));

  // Fully developed cap (Eq II-2-37)
  const Hm0_max = (uStar * uStar / G) * 2.115e2;
  const Tp_max = (uStar / G) * 2.398e2;
  Hm0 = Math.min(Hm0, Hm0_max);
  Tp = Math.min(Tp, Tp_max);

  // Shallow-water period cap (Eq II-2-39)
  const d = Math.max(0.5, ocean.depth_m);
  const Tp_shallow = 9.78 * Math.sqrt(d / G);
  Tp = Math.min(Tp, Tp_shallow);

  // Breaking-ish cap suggested in CEM (wave height <= 0.6 d)
  Hm0 = Math.min(Hm0, 0.6 * d);

  return {
    Hs_m: Hm0,
    Tp_s: Tp,
    fetchEffective_m,
    fetchGeom_m,
    fetchFromDuration_m
  };
}

/**
 * Build a swell-band configuration: long period, narrow spread, low-frequency.
 */
export function generateSwellSpectrum(inp: SwellSpectrumInputs): SwellSpectrum {
  const baseTp = clamp(inp.Tp_s, 3.0, 22.0);
  const swellVar = clamp(inp.swellVariance, 0.0, 1.0);
  const ds = clamp(inp.directionalSpread, 0.0, 1.0);

  const seed = Math.max(1, Math.floor(inp.seed));
  const jitter = randn(seed + 17.31, seed + 91.77) * 0.06;
  const Tp = clamp(baseTp * (1.55 + 0.65 * swellVar + jitter), 7.0, 24.0);
  const fp = 1 / Tp;

  let fmin = Math.max(0.008, fp * 0.55);
  let fmax = Math.max(fmin * 1.05, fp * 1.35);
  fmax = Math.min(fmax, 0.14);

  const spreadDeg = clamp(6 + 12 * (1 - swellVar) + 6 * ds, 4, 22);
  const spread = degToRad(spreadDeg);

  return {
    Tp_s: Tp,
    fp_hz: fp,
    fmin_hz: fmin,
    fmax_hz: fmax,
    spread_rad: spread,
    seed
  };
}

/**
 * Solve wave number k from dispersion: ω^2 = g k tanh(kh)
 * using Newton-Raphson, returning k (1/m).
 */
export function solveWaveNumber(omega: number, depth_m: number): number {
  const h = Math.max(0.5, depth_m);
  const w2 = omega * omega;

  // Deep water initial guess
  let k = Math.max(1e-6, w2 / G);

  for (let i = 0; i < 12; i++) {
    const kh = k * h;
    const t = Math.tanh(kh);
    const f = G * k * t - w2;
    const sech = 1 / Math.cosh(kh);
    const dt_dk = h * sech * sech;
    const df = G * (t + k * dt_dk);
    const step = f / Math.max(1e-9, df);
    k -= step;
    if (Math.abs(step) < 1e-7) break;
  }
  return Math.max(1e-6, k);
}

export interface SeismicPulseParams {
  amplitude_m: number;
  wavelength_m: number;
  depth_m: number;
  directionTo_rad: number;
  decayLength_m: number;
  /** Optional: choppiness/steepness factor (0..2). */
  choppiness?: number;
  /** Optional: phase offset in radians (defaults to crest at t=0). */
  phase_rad?: number;
  /** Optional: scale the physical group speed. */
  groupSpeedScale?: number;
}

export interface SeismicPulseComponent {
  dirX: number;
  dirZ: number;
  A: number;
  k: number;
  omega: number;
  phase: number;
  Q: number;
  groupSpeed_mps: number;
  decayLength_m: number;
}

export interface SeismicPulseState {
  component: SeismicPulseComponent;
  originXZ: { x: number; y: number };
  startTime_s: number;
  duration_s: number;
}

export function groupSpeedForWave(omega: number, k: number, depth_m: number): number {
  const h = Math.max(0.5, depth_m);
  const kh = k * h;
  const t = Math.tanh(kh);
  const sech = 1 / Math.cosh(kh);
  const term = t + kh * sech * sech;
  return 0.5 * G * term / Math.max(1e-6, omega);
}

export function buildSeismicPulse(p: SeismicPulseParams): SeismicPulseComponent {
  const A = Math.max(0, p.amplitude_m);
  const wavelength = Math.max(1e-3, p.wavelength_m);
  const k = (2 * Math.PI) / wavelength;
  const depth = Math.max(0.5, p.depth_m);
  const omega = Math.sqrt(G * k * Math.tanh(k * depth));

  const dirX = Math.cos(p.directionTo_rad);
  const dirZ = Math.sin(p.directionTo_rad);

  const phase = p.phase_rad ?? Math.PI * 0.5;
  const decayLength_m = Math.max(1.0, p.decayLength_m);

  const speedScale = clamp(p.groupSpeedScale ?? 1.0, 0.25, 4.0);
  const groupSpeed_mps = groupSpeedForWave(omega, k, depth) * speedScale;

  const chop = clamp(p.choppiness ?? 0.65, 0.0, 2.0);
  const safe = 1.0 / Math.max(1e-6, k * A);
  const Q = clamp(chop * safe, 0.0, 1.0);

  return {
    dirX,
    dirZ,
    A,
    k,
    omega,
    phase,
    Q,
    groupSpeed_mps,
    decayLength_m
  };
}

export function pulseWindow01(time_s: number, startTime_s: number, duration_s: number): number {
  const dur = Math.max(0.0, duration_s);
  if (dur <= 1e-4) return 0;
  const t = time_s - startTime_s;
  const fade = Math.min(2.5, dur * 0.2);
  const f = Math.min(fade, dur * 0.5);
  if (f <= 1e-4) return 0;
  const fadeIn = smoothstep(0.0, f, t);
  const fadeOut = 1.0 - smoothstep(dur - f, dur, t);
  return clamp(fadeIn * fadeOut, 0.0, 1.0);
}

export interface Vec2Like {
  x: number;
  y: number;
}

export interface RogueWaveSettings {
  enabled: boolean;
  /** Chance per minute (0..1). */
  chancePerMinute: number;
  /** Mean duration in seconds. */
  duration_s: number;
  /** Number of components to boost. */
  componentCount: number;
  /** Amplitude boost factor (0..2 = up to +200%). */
  ampBoost: number;
  /** Phase alignment strength (0..1). */
  phaseAlign: number;
}

export interface RogueWaveState {
  active: boolean;
  envelope: number;
  startTime_s: number;
  duration_s: number;
  timeLeft_s: number;
  ampScale: number[];
  phaseOffset: number[];
  componentIndices: number[];
}

export interface RogueWaveModulation {
  A: number;
  phase: number;
  Q: number;
}

function wrapAngleRad(a: number): number {
  let x = (a + Math.PI) % (Math.PI * 2);
  if (x < 0) x += Math.PI * 2;
  return x - Math.PI;
}

function rogueEnvelope(t01: number): number {
  const t = clamp(t01, 0, 1);
  const attack = 0.18;
  const release = 0.24;
  const a = smoothstep(0, attack, t);
  const r = 1 - smoothstep(1 - release, 1, t);
  return a * r;
}

type RogueComponent = {
  index: number;
  ampWeight: number;
  phaseOffset: number;
};

function selectRogueComponents(
  waves: WaveComponent[],
  count: number,
  rng: () => number,
  anchorXZ: Vec2Like,
  currentXZ: Vec2Like,
  peakTime_s: number,
  phaseAlign: number
): RogueComponent[] {
  const N = waves.length;
  if (N === 0 || count <= 0) return [];

  const weights = new Array(N).fill(0);
  const available: number[] = [];
  let maxW = 0;
  for (let i = 0; i < N; i++) {
    const w = waves[i];
    const tags = w.band.tags;
    const eligible = (tags.includes('wind') || tags.includes('swell'))
      && !tags.includes('capillary')
      && !tags.includes('tide')
      && !tags.includes('seiche');
    if (!eligible || w.omega < 0) continue;
    const energy = w.A * w.A;
    const longness = 1 / Math.max(0.06, w.k);
    const weight = Math.min(80, energy * longness);
    weights[i] = weight;
    if (weight > maxW) maxW = weight;
    available.push(i);
  }

  if (available.length === 0) return [];
  const want = Math.min(count, available.length);

  const selected: RogueComponent[] = [];
  for (let pick = 0; pick < want; pick++) {
    let total = 0;
    for (let i = 0; i < available.length; i++) {
      total += weights[available[i]];
    }
    if (total <= 1e-8) break;

    let r = rng() * total;
    let chosenIdx = available[available.length - 1];
    for (let i = 0; i < available.length; i++) {
      const idx = available[i];
      r -= weights[idx];
      if (r <= 0) {
        chosenIdx = idx;
        available.splice(i, 1);
        break;
      }
    }

    const w = waves[chosenIdx];
    const wNorm = maxW > 1e-6 ? clamp(weights[chosenIdx] / maxW, 0.2, 1) : 0.6;
    const ampWeight = lerp(0.78, 1.25, Math.pow(wNorm, 0.6)) * lerp(0.9, 1.1, rng());

    const dot = w.dirX * anchorXZ.x + w.dirZ * anchorXZ.y;
    const dotCur = w.dirX * currentXZ.x + w.dirZ * currentXZ.y;
    const wPhase = w.omega + w.k * dotCur;
    const thetaPeak = w.k * dot - wPhase * peakTime_s + w.phase;
    const targetPhase = Math.PI * 0.5;
    const rawOffset = wrapAngleRad(targetPhase - thetaPeak);
    const phaseOffset = rawOffset * clamp(phaseAlign, 0, 1);

    selected.push({ index: chosenIdx, ampWeight, phaseOffset });
  }

  return selected;
}

export function modulateWaveComponent(
  w: WaveComponent,
  index: number,
  waveCount: number,
  rogue: RogueWaveState | null | undefined,
  out: RogueWaveModulation
): RogueWaveModulation {
  let A = w.A;
  let phase = w.phase;
  let Q = w.Q;

  const skipRogue = w.band.tags.includes('tide') || w.band.tags.includes('seiche');
  if (!skipRogue && rogue?.active && rogue.envelope > 1e-5) {
    const ampScale = rogue.ampScale[index] ?? 1;
    const phaseOffset = rogue.phaseOffset[index] ?? 0;
    A *= ampScale;
    phase += phaseOffset;
  }

  const safeQ = 1 / Math.max(1e-6, w.k * A * Math.max(1, waveCount));
  Q = Math.min(Q, safeQ);

  out.A = A;
  out.phase = phase;
  out.Q = Q;
  return out;
}

export function applyRogueToWaves(
  waves: WaveComponent[],
  rogue: RogueWaveState | null | undefined,
  out: WaveComponent[] = []
): WaveComponent[] {
  const N = waves.length;
  const mod: RogueWaveModulation = { A: 0, phase: 0, Q: 0 };
  if (out.length !== N) out.length = N;

  for (let i = 0; i < N; i++) {
    const w = waves[i];
    const m = modulateWaveComponent(w, i, N, rogue, mod);
    if (!out[i]) {
      out[i] = {
        dirX: w.dirX,
        dirZ: w.dirZ,
        A: m.A,
        k: w.k,
        omega: w.omega,
        phase: m.phase,
        Q: m.Q,
        band: w.band
      };
    } else {
      out[i].dirX = w.dirX;
      out[i].dirZ = w.dirZ;
      out[i].A = m.A;
      out[i].k = w.k;
      out[i].omega = w.omega;
      out[i].phase = m.phase;
      out[i].Q = m.Q;
      out[i].band = w.band;
    }
  }

  return out;
}

export class RogueWaveScheduler {
  private rng = mulberry32(77821);
  private active = false;
  private startTime_s = 0;
  private duration_s = 0;
  private cooldown_s = 0;
  private waveCount = 0;
  private components: RogueComponent[] = [];

  private readonly state: RogueWaveState = {
    active: false,
    envelope: 0,
    startTime_s: 0,
    duration_s: 0,
    timeLeft_s: 0,
    ampScale: [],
    phaseOffset: [],
    componentIndices: []
  };

  public reset(seed?: number): void {
    if (seed !== undefined) {
      const s = Math.floor(seed) % 2147483647;
      this.rng = mulberry32(s <= 0 ? 1 : s);
    }
    this.active = false;
    this.startTime_s = 0;
    this.duration_s = 0;
    this.cooldown_s = 0;
    this.waveCount = 0;
    this.components = [];
    this.state.active = false;
    this.state.envelope = 0;
    this.state.startTime_s = 0;
    this.state.duration_s = 0;
    this.state.timeLeft_s = 0;
    this.state.componentIndices = [];
    this.state.ampScale = [];
    this.state.phaseOffset = [];
  }

  public update(
    dt_s: number,
    time_s: number,
    waves: WaveComponent[],
    currentXZ: Vec2Like,
    anchorXZ: Vec2Like,
    settings: RogueWaveSettings
  ): RogueWaveState {
    const enabled = settings.enabled;
    const N = waves.length;
    const chance = clamp(settings.chancePerMinute, 0, 1);
    const baseDuration = Math.max(2.0, settings.duration_s);
    const compCount = Math.max(1, Math.floor(settings.componentCount));
    const ampBoost = Math.max(0, settings.ampBoost);

    if (!enabled || N === 0) {
      this.active = false;
      this.cooldown_s = 0;
      this.state.active = false;
      this.state.envelope = 0;
      this.state.timeLeft_s = 0;
      this.state.componentIndices = [];
      return this.state;
    }

    if (this.active && this.waveCount !== N) {
      this.active = false;
      this.cooldown_s = Math.max(this.cooldown_s, this.duration_s * 0.4);
      this.state.active = false;
      this.state.envelope = 0;
      this.state.timeLeft_s = 0;
      this.state.componentIndices = [];
    }

    if (this.active) {
      const t = (time_s - this.startTime_s) / Math.max(1e-6, this.duration_s);
      if (t >= 1.0) {
        this.active = false;
        this.cooldown_s = Math.max(this.cooldown_s, this.duration_s * 0.45);
        this.state.active = false;
        this.state.envelope = 0;
        this.state.timeLeft_s = 0;
        this.state.componentIndices = [];
        return this.state;
      }

      const env = rogueEnvelope(t);
      this.state.active = true;
      this.state.envelope = env;
      this.state.startTime_s = this.startTime_s;
      this.state.duration_s = this.duration_s;
      this.state.timeLeft_s = Math.max(0, this.startTime_s + this.duration_s - time_s);
      this.state.componentIndices = this.components.map((c) => c.index);

      if (this.state.ampScale.length !== N) this.state.ampScale = new Array(N).fill(1);
      if (this.state.phaseOffset.length !== N) this.state.phaseOffset = new Array(N).fill(0);

      this.state.ampScale.fill(1);
      this.state.phaseOffset.fill(0);
      for (const c of this.components) {
        this.state.ampScale[c.index] = 1 + ampBoost * env * c.ampWeight;
        this.state.phaseOffset[c.index] = c.phaseOffset * env;
      }

      return this.state;
    }

    this.cooldown_s = Math.max(0, this.cooldown_s - dt_s);
    if (this.cooldown_s > 0 || chance <= 0) return this.state;

    const p = Math.min(1, (chance * dt_s) / 60);
    if (this.rng() < p) {
      const jitter = 0.4;
      const duration = baseDuration * lerp(1 - jitter, 1 + jitter, this.rng());
      this.duration_s = clamp(duration, 2.0, 90.0);
      this.startTime_s = time_s;
      this.active = true;
      this.waveCount = N;

      const peakTime_s = this.startTime_s + this.duration_s * 0.5;
      this.components = selectRogueComponents(
        waves,
        compCount,
        this.rng,
        anchorXZ,
        currentXZ,
        peakTime_s,
        clamp(settings.phaseAlign, 0, 1)
      );
      if (this.components.length === 0) {
        this.active = false;
        this.state.active = false;
        this.state.envelope = 0;
        this.state.timeLeft_s = 0;
        this.state.componentIndices = [];
        return this.state;
      }

      return this.update(dt_s, time_s, waves, currentXZ, anchorXZ, settings);
    }

    return this.state;
  }
}
