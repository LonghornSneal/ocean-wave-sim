import { clamp, degToRad, lerp } from './math';
import { fbm1, smoothstep } from './prng';
import { mulberry32 } from './prng';

export type PrecipType = 'None' | 'Rain' | 'Snow';

export interface WeatherInputs {
  latitude_deg: number;
  longitude_deg: number;
  dayOfYear: number;
  timeOfDay_h: number;

  /** 0=open ocean, 1=near shore. Impacts typical clouds + fetch. */
  coastProximity: number;

  /** User intent (percent inputs). */
  precipChance_pct: number;            // 0..100
  stormsIn2to4hChance_pct: number;     // 0..100
  verticalWindShear_mps: number;       // 0..30-ish
  hurricaneChanceAdjust_pct: number;   // -20..+20 (percentage points)
}

export interface WeatherResetSeed {
  latitude_deg: number;
  longitude_deg: number;
  dayOfYear: number;
  timeOfDay_h: number;
  /** Optional overrides to start in a particular "scene" (e.g. a thunderstorm demo). */
  force?: {
    cloudCover01?: number;
    precip01?: number;
    storm01?: number;
    hurricane01?: number;
    windSpeed_mps?: number;
    windDirFrom_deg?: number;
    gustiness01?: number;
    /** How long (in hours) the wind has been steady. Used as a proxy for wave growth. */
    steadyAge_h?: number;

    /** If set, start with an *active* storm envelope already in progress. */
    stormStrength01?: number;
    stormDirFrom_deg?: number;
    stormDuration_s?: number;
    stormActiveElapsed_s?: number;
  };
}

export interface WeatherState {
  airTemp_C: number;
  waterTemp_C: number;

  cloudCover: number; // 0..1
  visibility_km: number;
  precipType: PrecipType;
  precipIntensity: number; // 0..1

  storminess: number; // 0..1 (thunderstorm-ish)
  hurricaneIntensity: number; // 0..1 (tropical cyclone-ish)

  windSpeed_mps: number;
  windDirFrom_deg: number;
  gustiness: number; // 0..1
  gustStrength01: number; // 0..1
  gustFactor: number; // >= 1

  // Meta used by wave-growth model
  stormRadius_km: number;
  fetchUtilization: number;
  stormAge_h: number;
  windRamp_h: number;

  // Transients
  lightningRate_hz: number;
  hurricaneCategory: number;
  stateName: string;

  // Useful UI/logic readouts
  stormEta_h: number; // -1 if none scheduled
  stormDuration_s: number; // 0 if none scheduled/active
  stormChanceEffective_pct: number;
  hurricaneChanceEffective_pct: number;
}

function clampAngleDeg(a: number): number {
  let x = a % 360;
  if (x < 0) x += 360;
  return x;
}

function lerpAngleDeg(a: number, b: number, t: number): number {
  const da = ((b - a + 540) % 360) - 180;
  return clampAngleDeg(a + da * t);
}

function seasonalFactor(dayOfYear: number, latitude_deg: number): number {
  // +1 around local summer, -1 around local winter.
  const d = clamp(dayOfYear, 1, 365);
  const gamma = (2 * Math.PI * (d - 172)) / 365;
  const hemi = latitude_deg >= 0 ? 1 : -1;
  return Math.sin(gamma) * hemi;
}

function estimateWaterTempC(latitude_deg: number, dayOfYear: number): number {
  const lat = clamp(latitude_deg, -80, 80);
  const absLat = Math.abs(lat);

  // Base SST: warm near equator, cold near poles.
  // Heuristic (not a dataset).
  const base = lerp(28.0, -1.0, smoothstep(0, 80, absLat));

  // Seasonal swing small in tropics, larger mid-lats.
  const amp = lerp(1.5, 7.0, smoothstep(15, 60, absLat));
  const season = seasonalFactor(dayOfYear, lat);
  return clamp(base + amp * season, -1.8, 30);
}

function estimateAirTempC(
  waterTemp: number,
  latitude_deg: number,
  dayOfYear: number,
  timeOfDay_h: number,
  cloudCover: number
): number {
  const lat = clamp(latitude_deg, -80, 80);
  const absLat = Math.abs(lat);

  const ampSeason = lerp(2.0, 14.0, smoothstep(10, 65, absLat));
  const season = seasonalFactor(dayOfYear, lat);

  // Diurnal cycle peaks mid-afternoon; clouds reduce it.
  const hour = ((timeOfDay_h % 24) + 24) % 24;
  const diurnal = Math.sin(((hour - 14) / 24) * 2 * Math.PI);
  const ampDay = lerp(0.5, 3.5, smoothstep(0, 1, 1 - cloudCover));

  return waterTemp + ampSeason * season + ampDay * diurnal;
}

function prevailingWindFrom(latitude_deg: number): number {
  const lat = clamp(latitude_deg, -80, 80);
  const absLat = Math.abs(lat);

  // Rough planetary circulation:
  // 0–30: trades (easterly). 30–60: westerlies. 60+: polar easterlies.
  if (absLat < 30) {
    return lat >= 0 ? 45 : 135; // NE trades / SE trades
  }
  if (absLat < 60) {
    return 270; // westerlies
  }
  return 90; // polar easterlies
}

function stormSupportFactor(waterTemp_C: number, humidity: number): number {
  // Convective storms prefer warm, moist environments.
  const warm = smoothstep(16, 27, waterTemp_C);
  const moist = clamp(humidity, 0, 1);
  return clamp(0.12 + 0.88 * warm * moist, 0, 1);
}

function hurricanePotential(
  waterTemp_C: number,
  latitude_deg: number,
  humidity: number,
  verticalWindShear_mps: number,
  longNoise: number
): { chanceBase_pct: number; severity01: number } {
  const warm = smoothstep(25.5, 29.0, waterTemp_C);
  const tropical = smoothstep(35, 10, Math.abs(latitude_deg));
  const moist = clamp(humidity, 0, 1);

  // Low shear helps intensification.
  const shear = clamp(verticalWindShear_mps / 20, 0, 1);
  const shearFactor = 1 - shear;

  // Long-scale environmental noise (multi-day patterns).
  const env = clamp(0.55 + (longNoise - 0.5) * 0.8, 0, 1);

  const raw = clamp(warm * tropical * moist * Math.pow(shearFactor, 1.2) * env, 0, 1);
  const chanceBase_pct = clamp(raw * 100, 0, 95);
  const severity01 = clamp(0.18 + 0.82 * warm * Math.pow(shearFactor, 1.35), 0, 1);
  return { chanceBase_pct, severity01 };
}

export class WeatherSim {
  private time_s = 0;
  private rng = mulberry32(99122);

  // Smoothed fields
  private cloudCover = 0.25;
  private precip = 0.0;
  private storm = 0.0;
  private hurricane = 0.0;
  private windSpeed = 6.0;
  private windDirFrom = 250;
  private gustiness = 0.25;

  // How long has wind been steady? Used as duration proxy.
  private steadyAge_s = 0;

  // Storm scheduling (2–4h forecast-style)
  private scheduledStormEta_s = -1; // seconds until arrival; -1 = none
  private stormActive_s = 0;
  private stormDuration_s = 0;
  private stormStrength = 0;
  private stormDirFrom = 250;

  public reset(seed?: WeatherResetSeed): void {
    this.time_s = 0;
    this.cloudCover = 0.25;
    this.precip = 0;
    this.storm = 0;
    this.hurricane = 0;
    this.windSpeed = 6.0;
    this.gustiness = 0.25;
    this.steadyAge_s = 0;
    this.scheduledStormEta_s = -1;
    this.stormActive_s = 0;
    this.stormDuration_s = 0;
    this.stormStrength = 0;

    if (seed) {
      // Re-seed deterministic-ish based on lat/lon.
      const s = Math.floor((seed.latitude_deg * 1000 + seed.longitude_deg * 1000 + seed.dayOfYear * 17 + seed.timeOfDay_h * 13) % 2147483647);
      this.rng = mulberry32(s);
      this.windDirFrom = prevailingWindFrom(seed.latitude_deg);
      this.stormDirFrom = this.windDirFrom;
    }

    // Start with a non-zero "wind duration" memory so the ocean isn't glass-flat at t=0.
    // In the real world there is almost always residual sea/swell; starting at 0 makes
    // the wave-growth model take *hours* of real-time before any meaningful waves appear.
    //
    // We keep this deterministic by using the sim RNG (which is re-seeded by location/time).
    // Bias toward a handful of hours up to ~a day.
    const baseHours = 8.0 + this.rng() * 14.0; // 8..22 h
    this.steadyAge_s = baseHours * 3600;

    // Optional forced starting state (used for scripted scenes / demos).
    if (seed?.force) {
      const f = seed.force;

      if (f.cloudCover01 !== undefined) this.cloudCover = clamp(f.cloudCover01, 0, 1);
      if (f.precip01 !== undefined) this.precip = clamp(f.precip01, 0, 1);
      if (f.storm01 !== undefined) this.storm = clamp(f.storm01, 0, 1);
      if (f.hurricane01 !== undefined) this.hurricane = clamp(f.hurricane01, 0, 1);
      if (f.windSpeed_mps !== undefined) this.windSpeed = clamp(f.windSpeed_mps, 0, 75);
      if (f.windDirFrom_deg !== undefined) this.windDirFrom = clampAngleDeg(f.windDirFrom_deg);
      if (f.gustiness01 !== undefined) this.gustiness = clamp(f.gustiness01, 0, 1);
      if (f.steadyAge_h !== undefined) this.steadyAge_s = clamp(f.steadyAge_h, 0, 96) * 3600;

      // Force an in-progress storm envelope if requested.
      const wantActive = (f.stormActiveElapsed_s ?? 0) > 0;
      if (wantActive) {
        this.scheduledStormEta_s = -1;
        this.stormStrength = clamp(f.stormStrength01 ?? Math.max(0.0, this.storm), 0, 1);
        this.stormDirFrom = clampAngleDeg(f.stormDirFrom_deg ?? this.windDirFrom);
        this.stormDuration_s = Math.max(1, f.stormDuration_s ?? 2.0 * 3600);
        // stormActive_s is "elapsed time" into the storm.
        this.stormActive_s = Math.max(0.001, f.stormActiveElapsed_s ?? 0.001);
      }
    }
  }

  /** Update and return the current weather state. */
  public update(dt_s: number, inp: WeatherInputs): WeatherState {
    this.time_s += dt_s;

    const lat = clamp(inp.latitude_deg, -80, 80);
    const lon = clamp(inp.longitude_deg, -180, 180);
    const coast = clamp(inp.coastProximity, 0, 1);

    // Base temps
    const waterTemp = estimateWaterTempC(lat, inp.dayOfYear);

    // A derived, non-user "variability" (mid-lat is more synoptically active).
    const absLat = Math.abs(lat);
    const midLat = smoothstep(12, 55, absLat) * (1 - smoothstep(62, 80, absLat) * 0.55);
    const season = seasonalFactor(inp.dayOfYear, lat);
    const variability = clamp(0.20 + 0.55 * midLat + 0.20 * Math.abs(season) + 0.10 * coast, 0.12, 0.95);

    // Slow noise drivers (in hours) seeded by lat/lon
    const t_h = this.time_s / 3600;
    const seed = lat * 0.73 + lon * 0.19 + inp.dayOfYear * 0.013;
    const n1 = fbm1(t_h * 0.20 + seed * 0.1, seed, 4); // ~5h features
    const n2 = fbm1(t_h * 0.06 + seed * 0.2, seed + 11.7, 4); // ~16h
    const n3 = fbm1(t_h * 0.015 + seed * 0.7, seed + 33.1, 5); // multi-day-ish

    // User intent (0..1)
    const precipUser = clamp(inp.precipChance_pct / 100, 0, 1);
    const stormUser = clamp(inp.stormsIn2to4hChance_pct / 100, 0, 1);

    // Moisture proxy: warm water + user precip intent + coastal boost + noise
    const warmMoist = smoothstep(8, 26, waterTemp);
    const humidity = clamp(0.28 + 0.50 * warmMoist + 0.28 * precipUser + 0.12 * coast + (n2 - 0.5) * 0.18, 0, 1);

    // Cloud cover target: driven by humidity + synoptic variability
    const cloudSignal = 0.22 + 0.65 * humidity + 0.22 * midLat + (n2 - 0.5) * (0.75 * variability);
    const cloudTarget = clamp(smoothstep(0.35, 1.05, cloudSignal), 0, 1);

    // Precip intensity target: needs clouds + moisture + user precip intent
    const pSignal = cloudTarget + (precipUser - 0.5) * 0.85 + (n1 - 0.5) * 0.30 + humidity * 0.25;
    const precipTarget = clamp(smoothstep(0.92, 1.18, pSignal), 0, 1);

    // --- Storm scheduling (2–4 hrs) ---
    // Effective storm probability is capped by the *current* environment.
    const stormSupport = stormSupportFactor(waterTemp, humidity);
    // Clamp below 1 to avoid an infinite hazard rate.
    const stormChanceEff = clamp(stormUser * stormSupport * lerp(0.65, 1.0, variability), 0, 0.999);

    // If no storm is scheduled/active, “schedule” one with a hazard rate so the slider feels like a forecast.
    if (this.scheduledStormEta_s < 0 && this.stormActive_s <= 0) {
      // Interpret the slider as probability of a storm arriving in the next ~3 hours.
      const window_s = 3 * 3600;
      const lambda = stormChanceEff <= 0 ? 0 : (-Math.log(1 - stormChanceEff) / window_s);
      if (this.rng() < lambda * dt_s) {
        this.scheduledStormEta_s = lerp(2 * 3600, 4 * 3600, this.rng());
        this.stormStrength = clamp(0.25 + 0.75 * stormSupport + (this.rng() - 0.5) * 0.20, 0.15, 1.0);
        this.stormDuration_s = lerp(45 * 60, 3.0 * 3600, 0.35 + 0.65 * this.stormStrength);
        const prev = prevailingWindFrom(lat);
        this.stormDirFrom = clampAngleDeg(prev + (this.rng() * 2 - 1) * lerp(25, 85, this.stormStrength));
      }
    }

    // Storm approach factor: start showing 1–2h before arrival.
    let stormApproach = 0;
    if (this.scheduledStormEta_s >= 0) {
      this.scheduledStormEta_s -= dt_s;
      stormApproach = clamp(smoothstep(2 * 3600, 0, this.scheduledStormEta_s), 0, 1);

      if (this.scheduledStormEta_s <= 0) {
        // Storm has arrived.
        this.stormActive_s = 0.001;
        this.scheduledStormEta_s = -1;
      }
    }

    let activeStorm = 0;
    if (this.stormActive_s > 0) {
      this.stormActive_s += dt_s;
      const t = this.stormActive_s;
      const dur = Math.max(1e-3, this.stormDuration_s);
      // Simple envelope: ramp up in ~10min, then decay.
      const up = smoothstep(0, 10 * 60, t);
      const down = 1 - smoothstep(dur * 0.55, dur, t);
      activeStorm = clamp(up * down, 0, 1);
      if (t >= dur) {
        this.stormActive_s = 0;
        this.stormDuration_s = 0;
        this.stormStrength = 0;
      }
    }

    // Storm target (0..1) blends scheduled approach + active storm.
    const stormTarget = clamp(Math.max(stormApproach * this.stormStrength * 0.85, activeStorm * this.stormStrength), 0, 1);

    // --- Hurricane chance/intensity ---
    const shear_mps = clamp(inp.verticalWindShear_mps, 0, 30);
    const { chanceBase_pct, severity01 } = hurricanePotential(waterTemp, lat, humidity, shear_mps, n3);
    const chanceEff_pct = clamp(chanceBase_pct + clamp(inp.hurricaneChanceAdjust_pct, -20, 20), 0, 100);
    const chanceEff = chanceEff_pct / 100;

    // Smooth hurricane "presence" from the effective chance and long noise.
    // This is not a true climatology, but it behaves plausibly (rare outside tropics).
    const hSignal = chanceEff * clamp(0.55 + (n3 - 0.5) * 0.9, 0, 1);
    const hurricaneTarget = clamp(smoothstep(0.35, 0.75, hSignal), 0, 1);

    // --- Smooth fields ---
    const tauCloud = lerp(30, 10, variability);
    const tauPrecip = lerp(38, 12, variability);
    const tauStorm = lerp(55, 16, variability);
    const tauH = lerp(120, 30, variability);

    const kCloud = 1 - Math.exp(-dt_s / Math.max(1e-3, tauCloud));
    const kPrecip = 1 - Math.exp(-dt_s / Math.max(1e-3, tauPrecip));
    const kStorm = 1 - Math.exp(-dt_s / Math.max(1e-3, tauStorm));
    const kH = 1 - Math.exp(-dt_s / Math.max(1e-3, tauH));

    // Clouds: storm approach thickens the horizon deck.
    const cloudStormBoost = stormTarget * 0.55 + hurricaneTarget * 0.65;
    this.cloudCover = lerp(this.cloudCover, clamp(cloudTarget + cloudStormBoost, 0, 1), kCloud);

    // Precip increases with storms/hurricanes.
    const precipStormBoost = stormTarget * 0.65 + hurricaneTarget * 0.75;
    this.precip = lerp(this.precip, clamp(precipTarget + precipStormBoost, 0, 1), kPrecip);

    this.storm = lerp(this.storm, stormTarget, kStorm);
    this.hurricane = lerp(this.hurricane, hurricaneTarget, kH);

    // Wind: baseline by latitude + weather.
    const prev = prevailingWindFrom(lat);
    const dirNoise = (n2 - 0.5) * 40 * (0.2 + 0.8 * variability);
    const stormTurn = this.storm * 35;
    const hurricaneTurn = this.hurricane * 55;
    const windDirTarget = clampAngleDeg(prev + dirNoise + (stormTurn + hurricaneTurn) * (lat >= 0 ? 1 : -1));

    // As a storm approaches/arrives, wind tends to align to the storm system.
    const stormDirBlend = clamp(stormApproach * 0.75 + activeStorm * 1.0, 0, 1);
    const finalWindDir = lerpAngleDeg(windDirTarget, this.stormDirFrom, stormDirBlend);

    const midLatBoost = smoothstep(0, 1, Math.sin(degToRad(Math.min(90, absLat)))) * 3.5;
    const base = 3.0 + midLatBoost + coast * 0.7;
    const wxWind = 7.0 * this.cloudCover + 10.0 * this.precip + 14.0 * this.storm;

    // Hurricane wind scaling by severity potential.
    const hWind = this.hurricane > 0.01 ? lerp(18, 70, Math.pow(severity01 * this.hurricane, 0.7)) : 0;

    const windSpeedTarget = clamp(base + wxWind + hWind, 0, 75);

    // Gustiness increases with storms.
    const gustTarget = clamp(0.15 + 0.25 * this.precip + 0.35 * this.storm + 0.55 * this.hurricane, 0, 1);

    const tauWind = lerp(20, 7, variability);
    const kWind = 1 - Math.exp(-dt_s / Math.max(1e-3, tauWind));
    this.windSpeed = lerp(this.windSpeed, windSpeedTarget, kWind);
    this.windDirFrom = lerpAngleDeg(this.windDirFrom, finalWindDir, kWind);
    this.gustiness = lerp(this.gustiness, gustTarget, kWind);

    const gustFreq = lerp(0.06, 0.25, this.gustiness);
    const gustNoise = fbm1(this.time_s * gustFreq + seed * 0.37, seed + 91.7, 3);
    const gustPulse = smoothstep(0.6, 0.94, gustNoise);
    const gustStrength01 = clamp(gustPulse * this.gustiness, 0, 1);
    const gustFactor = 1 + gustStrength01 * 0.45;

    // Proxy for wind duration: how long has wind been steady?
    const dirDelta = Math.abs((((finalWindDir - this.windDirFrom) + 540) % 360) - 180);
    if (this.windSpeed > 1.5 && dirDelta < 25) {
      this.steadyAge_s = Math.min(this.steadyAge_s + dt_s, 48 * 3600);
    } else {
      this.steadyAge_s = Math.max(0, this.steadyAge_s - dt_s * 2.5);
    }

    // Air temp uses cloudCover to attenuate diurnal range.
    const airTemp = estimateAirTempC(waterTemp, lat, inp.dayOfYear, inp.timeOfDay_h, this.cloudCover);
    const precipType: PrecipType = this.precip < 0.08 ? 'None' : (airTemp <= 0 ? 'Snow' : 'Rain');

    const visibility = clamp(
      lerp(65, 10, this.cloudCover * 0.7) * lerp(1.0, 0.25, this.precip) * lerp(1.0, 0.55, this.storm),
      1,
      80
    );

    // Lightning rate: bursts during strong storms.
    const lightning = this.storm > 0.55 ? (0.03 * Math.pow(this.storm, 2.2)) : 0.0;

    // Storm geometry / fetch heuristics
    const stormScale = clamp(Math.max(this.storm, this.hurricane), 0, 1);
    const stormRadius = lerp(180, 1200, smoothstep(0.0, 1.0, stormScale));
    const fetchUtil = clamp(lerp(1.0, 0.35, coast) * lerp(0.65, 1.0, 1 - stormScale * 0.25), 0.1, 1.0);
    const stormAge_h = this.steadyAge_s / 3600;
    // Wind ramp-up time: used as a small correction in the wave-growth model.
    // Keep it modest so early wave-growth isn't suppressed for hours.
    // (The simulator already smooths Hs/Tp, so we don't need a huge ramp here.)
    const windRamp_h = lerp(0.35, 1.75, 1 - stormScale);

    // Hurricane category (Saffir–Simpson) from wind speed (m/s)
    let cat = 0;
    if (this.hurricane > 0.25) {
      const U = this.windSpeed;
      if (U >= 70) cat = 5;
      else if (U >= 58) cat = 4;
      else if (U >= 50) cat = 3;
      else if (U >= 43) cat = 2;
      else if (U >= 33) cat = 1;
      else cat = 0;
    }

    // Friendly state name
    let stateName = 'Clear';
    if (cat > 0) stateName = `Hurricane (Cat ${cat})`;
    else if (this.storm > 0.55) stateName = 'Thunderstorm';
    else if (this.precip > 0.15) stateName = precipType === 'Snow' ? 'Snow' : 'Rain';
    else if (this.cloudCover > 0.55) stateName = 'Cloudy';

    const stormEta_h = this.scheduledStormEta_s >= 0 ? (this.scheduledStormEta_s / 3600) : -1;

    return {
      airTemp_C: airTemp,
      waterTemp_C: waterTemp,
      cloudCover: clamp(this.cloudCover, 0, 1),
      visibility_km: visibility,
      precipType,
      precipIntensity: clamp(this.precip, 0, 1),
      storminess: clamp(this.storm, 0, 1),
      hurricaneIntensity: clamp(this.hurricane, 0, 1),
      windSpeed_mps: this.windSpeed,
      windDirFrom_deg: clampAngleDeg(this.windDirFrom),
      gustiness: this.gustiness,
      gustStrength01,
      gustFactor,
      stormRadius_km: stormRadius,
      fetchUtilization: fetchUtil,
      stormAge_h,
      windRamp_h,
      lightningRate_hz: lightning,
      hurricaneCategory: cat,
      stateName,
      stormEta_h,
      stormDuration_s: Math.max(0, this.stormDuration_s),
      stormChanceEffective_pct: Math.round(stormChanceEff * 100),
      hurricaneChanceEffective_pct: Math.round(chanceEff_pct)
    };
  }
}
