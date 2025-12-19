import { clamp } from './math';

export const G = 9.81;
export const OMEGA_EARTH = 7.2921159e-5; // rad/s

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
