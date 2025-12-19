import GUI from 'lil-gui';

export type MoonPhaseName =
  | 'New Moon'
  | 'Waxing Crescent'
  | 'First Quarter'
  | 'Waxing Gibbous'
  | 'Full Moon'
  | 'Waning Gibbous'
  | 'Last Quarter'
  | 'Waning Crescent';

export const MOON_PHASES: MoonPhaseName[] = [
  'New Moon',
  'Waxing Crescent',
  'First Quarter',
  'Waxing Gibbous',
  'Full Moon',
  'Waning Gibbous',
  'Last Quarter',
  'Waning Crescent'
];

export function moonPhaseFraction(name: MoonPhaseName): number {
  switch (name) {
    case 'New Moon': return 0.0;
    case 'Waxing Crescent': return 0.125;
    case 'First Quarter': return 0.25;
    case 'Waxing Gibbous': return 0.375;
    case 'Full Moon': return 0.5;
    case 'Waning Gibbous': return 0.625;
    case 'Last Quarter': return 0.75;
    case 'Waning Crescent': return 0.875;
    default: return 0.5;
  }
}

export type QualityMode = 'Low' | 'Medium' | 'High' | 'Max';

export type LocationPresetName =
  | 'Custom'
  | 'Equator (superstorm demo)'
  | 'Monterey Bay, CA (kelp forest)'
  | 'Maldives Atoll (tropical clear)'
  | 'Drake Passage (Southern Ocean)'
  | 'Prince William Sound, Alaska (cold fjords)';

export const LOCATION_PRESETS: LocationPresetName[] = [
  'Custom',
  'Equator (superstorm demo)',
  'Monterey Bay, CA (kelp forest)',
  'Maldives Atoll (tropical clear)',
  'Drake Passage (Southern Ocean)',
  'Prince William Sound, Alaska (cold fjords)'
];

export function qualityInfo(q: QualityMode): string {
  switch (q) {
    case 'Low':
      return 'Fastest. Lower ocean mesh density, fewer particles/waves. Best for weak phones.';
    case 'Medium':
      return 'Balanced. Decent mesh density + particles. Good default on most devices.';
    case 'High':
      return 'Prettier. Higher mesh density + more wave components + nicer sky updates.';
    case 'Max':
      return 'Max visuals. Highest mesh density, more particles, and experimental screen-space ray-traced reflections (heavy).';
    default:
      return '';
  }
}

const SETTINGS_STORAGE_KEY = 'ocean-sim-settings';
const SETTINGS_SCHEMA_VERSION = 1;

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function isMobileLikeDevice(): boolean {
  try {
    const coarse = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const mobileUA = /Android|iPhone|iPad|iPod/i.test(ua);
    return coarse || mobileUA;
  } catch {
    return false;
  }
}

function deviceMemoryGB(): number | null {
  try {
    const mem = (navigator as any)?.deviceMemory;
    return typeof mem === 'number' && Number.isFinite(mem) ? mem : null;
  } catch {
    return null;
  }
}

function prefersReducedMotion(): boolean {
  try {
    return typeof window !== 'undefined'
      && !!window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function defaultQualityForDevice(): QualityMode {
  const mobileLike = isMobileLikeDevice();
  const mem = deviceMemoryGB();

  if (mobileLike) {
    if (mem !== null && mem <= 2) return 'Low';
    return 'Medium';
  }

  if (mem !== null) {
    if (mem <= 2) return 'Low';
    if (mem <= 4) return 'Medium';
    if (mem <= 6) return 'High';
    return 'Max';
  }

  return 'High';
}

export interface AppParams {
  // Game flow
  gameStarted: boolean;

  // Location + time
  locationPreset: LocationPresetName;
  latitude_deg: number;
  longitude_deg: number;
  coastProximity: number; // 0=open ocean, 1=near shore
  depth_m: number;
  dayOfYear: number;
  timeOfDay_h: number;

  // Moon
  moonPhaseName: MoonPhaseName;
  moonDistanceMultiplier: number;

  // Weather inputs (percent-based; wind/waves derived)
  precipChance_pct: number;            // 0..100
  stormsIn2to4hChance_pct: number;     // 0..100
  verticalWindShear_mps: number;       // 0..30-ish
  hurricaneChanceAdjust_pct: number;   // -20..+20 (percentage points)

  // Sea otter
  otterosity_pct: number;              // 0..100
  exoticEncounters_pct: number;        // 0..100
  /** High mode only: extra geometry for a fur-like silhouette. */
  otterFurSilhouette: boolean;

  // Camera
  /** Follow distance behind the otter (meters). */
  cameraDistance_m: number;

  /** Camera elevation above the otter head (meters). */
  cameraElevation_m: number;

  // Water
  clarity_pct: number;                 // 0..100

  // Tide
  tideAmplitude_m: number;
  tidePeriod_h: number;
  tidePhase_deg: number;

  // Seiche (standing basin wave)
  seicheEnabled: boolean;
  seicheAmplitude_m: number;
  seichePeriod_s: number;
  windSeaIntensity: number;            // 0..2
  swellIntensity: number;              // 0..2
  capillaryStrength: number;           // 0..1
  capillaryAmplitude_m: number;        // 0..0.02
  capillarySlopeFalloff: number;       // 0.25..3
  capillaryDirectionalSpread: number;  // 0..1
  capillaryWaveCount: number;          // 0..16

  // Rogue waves (rare events)
  rogueEnabled: boolean;
  rogueChance_pct: number;             // 0..100 (per minute)
  rogueDuration_s: number;             // 2..40
  rogueComponentCount: number;         // 1..10
  rogueAmplitudeBoost: number;         // 0..250 (%)
  roguePhaseAlign_pct: number;         // 0..100

  // Seismic pulse (long wave packet)
  pulseAmplitude_m: number;
  pulseWavelength_m: number;
  pulseDecayLength_m: number;
  pulseDuration_s: number;
  pulseSpeedScale: number;
  pulseDirection_deg: number;

  // Performance
  quality: QualityMode;
  qualityInfo: string;

  /** Tiny on-screen perf overlay. */
  perfOverlay: boolean;

  /** Accessibility: reduce lightning flashes and film grain. */
  reduceFlashes: boolean;

  // Audio
  audioEnabled: boolean;
  masterVolume: number;

  // Derived readouts
  derived_state: string;
  derived_clock: string;
  derived_airTemp_C: number;
  derived_waterTemp_C: number;
  derived_cloudCover: number;
  derived_visibility_km: number;
  derived_windSpeed_mps: number;
  derived_windDirFrom_deg: number;
  derived_precip: string;
  derived_Hs_m: number;
  derived_Tp_s: number;
  derived_tideScale: number;
  derived_stormETA: string;
  derived_stormChanceEff_pct: number;
  derived_hurricaneChanceEff_pct: number;
}

export function defaultParams(): AppParams {
  // Default to a dramatic "superstorm" scenario (you can always dial this back).
  const q: QualityMode = defaultQualityForDevice();
  const reduceFlashes = prefersReducedMotion();
  const capillaryWaveCount = q === 'Low' ? 3 : (q === 'Medium' ? 5 : (q === 'High' ? 6 : 7));
  const capillaryAmplitude_m = q === 'Low' ? 0.0025 : (q === 'Medium' ? 0.003 : (q === 'High' ? 0.0035 : 0.004));
  const capillaryStrength = q === 'Low' ? 0.2 : (q === 'Medium' ? 0.25 : (q === 'High' ? 0.3 : 0.35));
  return {
    gameStarted: false,

    locationPreset: 'Equator (superstorm demo)',

    // Near-equator, deep water, open ocean.
    latitude_deg: 1.2,
    longitude_deg: -28.0,
    coastProximity: 0.0,
    depth_m: 4800,

    // Late evening (lightning reads well against a darker sky).
    dayOfYear: 205,
    timeOfDay_h: 20.25,

    moonPhaseName: 'Full Moon',
    moonDistanceMultiplier: 1.0,

    // Force the weather sim to strongly prefer storms.
    precipChance_pct: 100,
    stormsIn2to4hChance_pct: 100,
    verticalWindShear_mps: 1.5,
    hurricaneChanceAdjust_pct: 20,

    otterosity_pct: 55,
    exoticEncounters_pct: 8,
    otterFurSilhouette: q === 'High' || q === 'Max',

    // Default “cinematic” follow camera framing.
    cameraDistance_m: 9.0,
    cameraElevation_m: 1.05,

    clarity_pct: 55,

    tideAmplitude_m: 1.0,
    tidePeriod_h: 12.42,
    tidePhase_deg: 0,

    seicheEnabled: false,
    seicheAmplitude_m: 0.45,
    seichePeriod_s: 180,
    windSeaIntensity: 1.0,
    swellIntensity: 1.0,
    capillaryStrength,
    capillaryAmplitude_m,
    capillarySlopeFalloff: 1.2,
    capillaryDirectionalSpread: 0.2,
    capillaryWaveCount,
    rogueEnabled: false,
    rogueChance_pct: 6,
    rogueDuration_s: 8,
    rogueComponentCount: 3,
    rogueAmplitudeBoost: 80,
    roguePhaseAlign_pct: 55,
    pulseAmplitude_m: 1.8,
    pulseWavelength_m: 320,
    pulseDecayLength_m: 420,
    pulseDuration_s: 16,
    pulseSpeedScale: 1.35,
    pulseDirection_deg: 225,

    quality: q,
    qualityInfo: qualityInfo(q),

    perfOverlay: true,
    reduceFlashes,

    audioEnabled: true,
    masterVolume: 0.55,

    derived_state: '—',
    derived_clock: '—',
    derived_airTemp_C: 0,
    derived_waterTemp_C: 0,
    derived_cloudCover: 0,
    derived_visibility_km: 0,
    derived_windSpeed_mps: 0,
    derived_windDirFrom_deg: 0,
    derived_precip: '—',
    derived_Hs_m: 0,
    derived_Tp_s: 0,
    derived_tideScale: 1,
    derived_stormETA: '—',
    derived_stormChanceEff_pct: 0,
    derived_hurricaneChanceEff_pct: 0
  };
}

type PersistedParams = Pick<
  AppParams,
  | 'locationPreset'
  | 'latitude_deg'
  | 'longitude_deg'
  | 'coastProximity'
  | 'depth_m'
  | 'dayOfYear'
  | 'timeOfDay_h'
  | 'moonPhaseName'
  | 'moonDistanceMultiplier'
  | 'precipChance_pct'
  | 'stormsIn2to4hChance_pct'
  | 'verticalWindShear_mps'
  | 'hurricaneChanceAdjust_pct'
  | 'otterosity_pct'
  | 'exoticEncounters_pct'
  | 'otterFurSilhouette'
  | 'cameraDistance_m'
  | 'cameraElevation_m'
  | 'clarity_pct'
  | 'tideAmplitude_m'
  | 'tidePeriod_h'
  | 'tidePhase_deg'
  | 'seicheEnabled'
  | 'seicheAmplitude_m'
  | 'seichePeriod_s'
  | 'windSeaIntensity'
  | 'swellIntensity'
  | 'capillaryStrength'
  | 'capillaryAmplitude_m'
  | 'capillarySlopeFalloff'
  | 'capillaryDirectionalSpread'
  | 'capillaryWaveCount'
  | 'rogueEnabled'
  | 'rogueChance_pct'
  | 'rogueDuration_s'
  | 'rogueComponentCount'
  | 'rogueAmplitudeBoost'
  | 'roguePhaseAlign_pct'
  | 'pulseAmplitude_m'
  | 'pulseWavelength_m'
  | 'pulseDecayLength_m'
  | 'pulseDuration_s'
  | 'pulseSpeedScale'
  | 'pulseDirection_deg'
  | 'quality'
  | 'perfOverlay'
  | 'reduceFlashes'
  | 'audioEnabled'
  | 'masterVolume'
>;

type PersistedPayload = {
  v: number;
  data: Partial<PersistedParams>;
};

const QUALITY_MODES: QualityMode[] = ['Low', 'Medium', 'High', 'Max'];

function isQualityMode(v: unknown): v is QualityMode {
  return typeof v === 'string' && QUALITY_MODES.includes(v as QualityMode);
}

function isLocationPreset(v: unknown): v is LocationPresetName {
  return typeof v === 'string' && LOCATION_PRESETS.includes(v as LocationPresetName);
}

function isMoonPhase(v: unknown): v is MoonPhaseName {
  return typeof v === 'string' && MOON_PHASES.includes(v as MoonPhaseName);
}

export function applyPersistedParams(params: AppParams): void {
  if (typeof window === 'undefined') return;
  let payload: PersistedPayload | null = null;
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as PersistedPayload;
    if (!parsed || parsed.v !== SETTINGS_SCHEMA_VERSION) return;
    payload = parsed;
  } catch {
    return;
  }

  const data = payload.data ?? {};
  if (isLocationPreset(data.locationPreset)) params.locationPreset = data.locationPreset;
  if (typeof data.latitude_deg === 'number' && Number.isFinite(data.latitude_deg)) params.latitude_deg = clamp(data.latitude_deg, -80, 80);
  if (typeof data.longitude_deg === 'number' && Number.isFinite(data.longitude_deg)) params.longitude_deg = clamp(data.longitude_deg, -180, 180);
  if (typeof data.coastProximity === 'number' && Number.isFinite(data.coastProximity)) params.coastProximity = clamp(data.coastProximity, 0, 1);
  if (typeof data.depth_m === 'number' && Number.isFinite(data.depth_m)) params.depth_m = clamp(data.depth_m, 5, 6000);
  if (typeof data.dayOfYear === 'number' && Number.isFinite(data.dayOfYear)) params.dayOfYear = clamp(data.dayOfYear, 1, 365);
  if (typeof data.timeOfDay_h === 'number' && Number.isFinite(data.timeOfDay_h)) params.timeOfDay_h = clamp(data.timeOfDay_h, 0, 24);
  if (isMoonPhase(data.moonPhaseName)) params.moonPhaseName = data.moonPhaseName;
  if (typeof data.moonDistanceMultiplier === 'number' && Number.isFinite(data.moonDistanceMultiplier)) {
    params.moonDistanceMultiplier = clamp(data.moonDistanceMultiplier, 0.85, 1.15);
  }
  if (typeof data.precipChance_pct === 'number' && Number.isFinite(data.precipChance_pct)) params.precipChance_pct = clamp(data.precipChance_pct, 0, 100);
  if (typeof data.stormsIn2to4hChance_pct === 'number' && Number.isFinite(data.stormsIn2to4hChance_pct)) {
    params.stormsIn2to4hChance_pct = clamp(data.stormsIn2to4hChance_pct, 0, 100);
  }
  if (typeof data.verticalWindShear_mps === 'number' && Number.isFinite(data.verticalWindShear_mps)) {
    params.verticalWindShear_mps = clamp(data.verticalWindShear_mps, 0, 30);
  }
  if (typeof data.hurricaneChanceAdjust_pct === 'number' && Number.isFinite(data.hurricaneChanceAdjust_pct)) {
    params.hurricaneChanceAdjust_pct = clamp(data.hurricaneChanceAdjust_pct, -20, 20);
  }
  if (typeof data.otterosity_pct === 'number' && Number.isFinite(data.otterosity_pct)) params.otterosity_pct = clamp(data.otterosity_pct, 0, 100);
  if (typeof data.exoticEncounters_pct === 'number' && Number.isFinite(data.exoticEncounters_pct)) {
    params.exoticEncounters_pct = clamp(data.exoticEncounters_pct, 0, 100);
  }
  if (typeof data.otterFurSilhouette === 'boolean') params.otterFurSilhouette = data.otterFurSilhouette;
  if (typeof data.cameraDistance_m === 'number' && Number.isFinite(data.cameraDistance_m)) params.cameraDistance_m = clamp(data.cameraDistance_m, 9.0, 18.0);
  if (typeof data.cameraElevation_m === 'number' && Number.isFinite(data.cameraElevation_m)) params.cameraElevation_m = clamp(data.cameraElevation_m, 0.35, 3.0);
  if (typeof data.clarity_pct === 'number' && Number.isFinite(data.clarity_pct)) params.clarity_pct = clamp(data.clarity_pct, 0, 100);
  if (typeof data.tideAmplitude_m === 'number' && Number.isFinite(data.tideAmplitude_m)) {
    params.tideAmplitude_m = clamp(data.tideAmplitude_m, 0, 3);
  }
  if (typeof data.tidePeriod_h === 'number' && Number.isFinite(data.tidePeriod_h)) {
    params.tidePeriod_h = clamp(data.tidePeriod_h, 4, 30);
  }
  if (typeof data.tidePhase_deg === 'number' && Number.isFinite(data.tidePhase_deg)) {
    params.tidePhase_deg = clamp(data.tidePhase_deg, 0, 360);
  }
  if (typeof data.seicheEnabled === 'boolean') params.seicheEnabled = data.seicheEnabled;
  if (typeof data.seicheAmplitude_m === 'number' && Number.isFinite(data.seicheAmplitude_m)) {
    params.seicheAmplitude_m = clamp(data.seicheAmplitude_m, 0, 3);
  }
  if (typeof data.seichePeriod_s === 'number' && Number.isFinite(data.seichePeriod_s)) {
    params.seichePeriod_s = clamp(data.seichePeriod_s, 30, 600);
  }
  if (typeof data.windSeaIntensity === 'number' && Number.isFinite(data.windSeaIntensity)) {
    params.windSeaIntensity = clamp(data.windSeaIntensity, 0, 2);
  }
  if (typeof data.swellIntensity === 'number' && Number.isFinite(data.swellIntensity)) {
    params.swellIntensity = clamp(data.swellIntensity, 0, 2);
  }
  if (typeof data.capillaryStrength === 'number' && Number.isFinite(data.capillaryStrength)) {
    params.capillaryStrength = clamp(data.capillaryStrength, 0, 1);
  }
  if (typeof data.capillaryAmplitude_m === 'number' && Number.isFinite(data.capillaryAmplitude_m)) {
    params.capillaryAmplitude_m = clamp(data.capillaryAmplitude_m, 0, 0.02);
  }
  if (typeof data.capillarySlopeFalloff === 'number' && Number.isFinite(data.capillarySlopeFalloff)) {
    params.capillarySlopeFalloff = clamp(data.capillarySlopeFalloff, 0.25, 3);
  }
  if (typeof data.capillaryDirectionalSpread === 'number' && Number.isFinite(data.capillaryDirectionalSpread)) {
    params.capillaryDirectionalSpread = clamp(data.capillaryDirectionalSpread, 0, 1);
  }
  if (typeof data.capillaryWaveCount === 'number' && Number.isFinite(data.capillaryWaveCount)) {
    params.capillaryWaveCount = Math.round(clamp(data.capillaryWaveCount, 0, 16));
  }
  if (typeof data.rogueEnabled === 'boolean') params.rogueEnabled = data.rogueEnabled;
  if (typeof data.rogueChance_pct === 'number' && Number.isFinite(data.rogueChance_pct)) {
    params.rogueChance_pct = clamp(data.rogueChance_pct, 0, 100);
  }
  if (typeof data.rogueDuration_s === 'number' && Number.isFinite(data.rogueDuration_s)) {
    params.rogueDuration_s = clamp(data.rogueDuration_s, 2, 40);
  }
  if (typeof data.rogueComponentCount === 'number' && Number.isFinite(data.rogueComponentCount)) {
    params.rogueComponentCount = Math.round(clamp(data.rogueComponentCount, 1, 10));
  }
  if (typeof data.rogueAmplitudeBoost === 'number' && Number.isFinite(data.rogueAmplitudeBoost)) {
    params.rogueAmplitudeBoost = clamp(data.rogueAmplitudeBoost, 0, 250);
  }
  if (typeof data.roguePhaseAlign_pct === 'number' && Number.isFinite(data.roguePhaseAlign_pct)) {
    params.roguePhaseAlign_pct = clamp(data.roguePhaseAlign_pct, 0, 100);
  }
  if (typeof data.pulseAmplitude_m === 'number' && Number.isFinite(data.pulseAmplitude_m)) {
    params.pulseAmplitude_m = clamp(data.pulseAmplitude_m, 0, 6);
  }
  if (typeof data.pulseWavelength_m === 'number' && Number.isFinite(data.pulseWavelength_m)) {
    params.pulseWavelength_m = clamp(data.pulseWavelength_m, 40, 1200);
  }
  if (typeof data.pulseDecayLength_m === 'number' && Number.isFinite(data.pulseDecayLength_m)) {
    params.pulseDecayLength_m = clamp(data.pulseDecayLength_m, 40, 2000);
  }
  if (typeof data.pulseDuration_s === 'number' && Number.isFinite(data.pulseDuration_s)) {
    params.pulseDuration_s = clamp(data.pulseDuration_s, 2, 90);
  }
  if (typeof data.pulseSpeedScale === 'number' && Number.isFinite(data.pulseSpeedScale)) {
    params.pulseSpeedScale = clamp(data.pulseSpeedScale, 0.25, 4);
  }
  if (typeof data.pulseDirection_deg === 'number' && Number.isFinite(data.pulseDirection_deg)) {
    params.pulseDirection_deg = clamp(data.pulseDirection_deg, 0, 360);
  }
  if (isQualityMode(data.quality)) params.quality = data.quality;
  if (typeof data.perfOverlay === 'boolean') params.perfOverlay = data.perfOverlay;
  if (typeof data.reduceFlashes === 'boolean') params.reduceFlashes = data.reduceFlashes;
  if (typeof data.audioEnabled === 'boolean') params.audioEnabled = data.audioEnabled;
  if (typeof data.masterVolume === 'number' && Number.isFinite(data.masterVolume)) params.masterVolume = clamp(data.masterVolume, 0, 1);

  params.qualityInfo = qualityInfo(params.quality);
}

export function savePersistedParams(params: AppParams): void {
  if (typeof window === 'undefined') return;
  const data: Partial<PersistedParams> = {
    locationPreset: params.locationPreset,
    latitude_deg: params.latitude_deg,
    longitude_deg: params.longitude_deg,
    coastProximity: params.coastProximity,
    depth_m: params.depth_m,
    dayOfYear: params.dayOfYear,
    timeOfDay_h: params.timeOfDay_h,
    moonPhaseName: params.moonPhaseName,
    moonDistanceMultiplier: params.moonDistanceMultiplier,
    precipChance_pct: params.precipChance_pct,
    stormsIn2to4hChance_pct: params.stormsIn2to4hChance_pct,
    verticalWindShear_mps: params.verticalWindShear_mps,
    hurricaneChanceAdjust_pct: params.hurricaneChanceAdjust_pct,
    otterosity_pct: params.otterosity_pct,
    exoticEncounters_pct: params.exoticEncounters_pct,
    otterFurSilhouette: params.otterFurSilhouette,
    cameraDistance_m: params.cameraDistance_m,
    cameraElevation_m: params.cameraElevation_m,
    clarity_pct: params.clarity_pct,
    tideAmplitude_m: params.tideAmplitude_m,
    tidePeriod_h: params.tidePeriod_h,
    tidePhase_deg: params.tidePhase_deg,
    seicheEnabled: params.seicheEnabled,
    seicheAmplitude_m: params.seicheAmplitude_m,
    seichePeriod_s: params.seichePeriod_s,
    windSeaIntensity: params.windSeaIntensity,
    swellIntensity: params.swellIntensity,
    capillaryStrength: params.capillaryStrength,
    capillaryAmplitude_m: params.capillaryAmplitude_m,
    capillarySlopeFalloff: params.capillarySlopeFalloff,
    capillaryDirectionalSpread: params.capillaryDirectionalSpread,
    capillaryWaveCount: params.capillaryWaveCount,
    rogueEnabled: params.rogueEnabled,
    rogueChance_pct: params.rogueChance_pct,
    rogueDuration_s: params.rogueDuration_s,
    rogueComponentCount: params.rogueComponentCount,
    rogueAmplitudeBoost: params.rogueAmplitudeBoost,
    roguePhaseAlign_pct: params.roguePhaseAlign_pct,
    pulseAmplitude_m: params.pulseAmplitude_m,
    pulseWavelength_m: params.pulseWavelength_m,
    pulseDecayLength_m: params.pulseDecayLength_m,
    pulseDuration_s: params.pulseDuration_s,
    pulseSpeedScale: params.pulseSpeedScale,
    pulseDirection_deg: params.pulseDirection_deg,
    quality: params.quality,
    perfOverlay: params.perfOverlay,
    reduceFlashes: params.reduceFlashes,
    audioEnabled: params.audioEnabled,
    masterVolume: params.masterVolume
  };
  const payload: PersistedPayload = { v: SETTINGS_SCHEMA_VERSION, data };
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

export function resetPersistedParams(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(SETTINGS_STORAGE_KEY);
  } catch {
    // ignore
  }
}

function setEnabled(ctrl: any, enabled: boolean): void {
  const el = ctrl?.domElement as HTMLElement | undefined;
  if (!el) return;
  el.style.pointerEvents = enabled ? 'auto' : 'none';
  el.style.opacity = enabled ? '1' : '0.35';
}

function setTooltip(ctrl: any, text: string): void {
  const el = ctrl?.domElement as HTMLElement | undefined;
  if (!el) return;
  el.title = text;
}

export interface GUIHandlers {
  onAnyChange: () => void;
  onStartGame: () => void;
  onNewGame: () => void;
  onResetSettings?: () => void;
  onPulseTrigger?: () => void;

  /** Camera-only controls should not force a world rebuild. */
  onCameraChange?: () => void;
}

export function createGUI(params: AppParams, h: GUIHandlers): GUI {
  const gui = new GUI({ title: 'Ocean (Otter) Simulator' });
  gui.domElement.style.userSelect = 'none';

  // Game actions
  const actions = {
    startGame: () => {
      if (params.gameStarted) return;
      params.gameStarted = true;
      h.onStartGame();
      h.onAnyChange();
    },
    newGame: () => {
      params.gameStarted = false;
      h.onNewGame();
      h.onAnyChange();
    },
    resetSettings: () => {
      h.onResetSettings?.();
    }
  };
  const pulseActions = {
    triggerPulse: () => {
      h.onPulseTrigger?.();
    }
  };

  const fGame = gui.addFolder('Game');
  fGame.add(actions, 'startGame').name('Start / Resume');
  fGame.add(actions, 'newGame').name('Reset');
  fGame.open();

  const fLoc = gui.addFolder('Location');

  // Location presets (optional).
  // These are intentionally very different so you can immediately feel the climate + sea-state shift.
  const PRESETS: Record<LocationPresetName, { latitude_deg: number; longitude_deg: number; coastProximity: number; depth_m: number }> = {
    'Custom': { latitude_deg: params.latitude_deg, longitude_deg: params.longitude_deg, coastProximity: params.coastProximity, depth_m: params.depth_m },
    'Equator (superstorm demo)': { latitude_deg: 1.2, longitude_deg: -28.0, coastProximity: 0.0, depth_m: 4800 },
    'Monterey Bay, CA (kelp forest)': { latitude_deg: 36.62, longitude_deg: -121.90, coastProximity: 0.90, depth_m: 120 },
    'Maldives Atoll (tropical clear)': { latitude_deg: 3.20, longitude_deg: 73.22, coastProximity: 0.70, depth_m: 55 },
    'Drake Passage (Southern Ocean)': { latitude_deg: -56.30, longitude_deg: -67.70, coastProximity: 0.05, depth_m: 4200 },
    'Prince William Sound, Alaska (cold fjords)': { latitude_deg: 60.75, longitude_deg: -147.60, coastProximity: 0.95, depth_m: 240 }
  };

  const cPreset = fLoc.add(params, 'locationPreset', LOCATION_PRESETS).name('preset');
  const cLat = fLoc.add(params, 'latitude_deg', -80, 80, 0.1).name('latitude (°)');
  const cLon = fLoc.add(params, 'longitude_deg', -180, 180, 0.1).name('longitude (°)');
  const cCoast = fLoc.add(params, 'coastProximity', 0, 1, 0.01).name('coast proximity (0–1)');
  const cDepth = fLoc.add(params, 'depth_m', 5, 6000, 1).name('depth (m)');

  function applyPreset(name: LocationPresetName): void {
    if (name === 'Custom') return;
    const p = PRESETS[name];
    if (!p) return;

    params.latitude_deg = p.latitude_deg;
    params.longitude_deg = p.longitude_deg;
    params.coastProximity = p.coastProximity;
    params.depth_m = p.depth_m;

    // Update GUI displays immediately.
    cLat.updateDisplay();
    cLon.updateDisplay();
    cCoast.updateDisplay();
    cDepth.updateDisplay();
  }

  cPreset.onChange(() => {
    applyPreset(params.locationPreset);
    h.onAnyChange();
  });

  const onManualLocChange = () => {
    if (params.locationPreset !== 'Custom') {
      params.locationPreset = 'Custom';
      cPreset.updateDisplay();
    }
    h.onAnyChange();
  };

  cLat.onChange(onManualLocChange);
  cLon.onChange(onManualLocChange);
  cCoast.onChange(onManualLocChange);
  cDepth.onChange(onManualLocChange);

  const fTime = gui.addFolder('Time');
  const cTOD = fTime.add(params, 'timeOfDay_h', 0, 24, 0.01).name('time (h)');
  const cDOY = fTime.add(params, 'dayOfYear', 1, 365, 1).name('day of year (1–365)');
  cTOD.onChange(h.onAnyChange);
  cDOY.onChange(h.onAnyChange);

  const fMoon = gui.addFolder('Moon');
  fMoon.add(params, 'moonPhaseName', MOON_PHASES).name('phase').onChange(h.onAnyChange);
  fMoon.add(params, 'moonDistanceMultiplier', 0.85, 1.15, 0.0005).name('distance').onChange(h.onAnyChange);

  const fWx = gui.addFolder('Weather');
  fWx.add(params, 'precipChance_pct', 0, 100, 1).name('precip chance (%)').onChange(h.onAnyChange);
  fWx.add(params, 'stormsIn2to4hChance_pct', 0, 100, 1).name('chance of storms in 2–4hrs (%)').onChange(h.onAnyChange);
  fWx.add(params, 'verticalWindShear_mps', 0, 30, 0.1).name('vertical wind shear (m/s)').onChange(h.onAnyChange);
  fWx.add(params, 'hurricaneChanceAdjust_pct', -20, 20, 1).name('hurricane chance adjust (±%)').onChange(h.onAnyChange);

  const fOtter = gui.addFolder('Sea Otter');
  fOtter.add(params, 'otterosity_pct', 0, 100, 1).name('Otterosity').onChange(h.onAnyChange);
  fOtter.add(params, 'exoticEncounters_pct', 0, 100, 1).name('exotic encounters (%)').onChange(h.onAnyChange);
  fOtter.add(params, 'otterFurSilhouette').name('fur silhouette (Hi/Max)').onChange(h.onAnyChange);

  const fCam = gui.addFolder('Camera');
  fCam.add(params, 'cameraDistance_m', 9.0, 18.0, 0.01).name('distance (m)').onChange(() => {
    h.onCameraChange?.();
  });
  fCam.add(params, 'cameraElevation_m', 0.35, 3.0, 0.01).name('elevation (m)').onChange(() => {
    h.onCameraChange?.();
  });

  const fWater = gui.addFolder('Water');
  const cClarity = fWater.add(params, 'clarity_pct', 0, 100, 1).name('clarity (%)');
  cClarity.onChange(h.onAnyChange);

  const fTide = fWater.addFolder('Tide');
  const cTideAmp = fTide.add(params, 'tideAmplitude_m', 0, 3, 0.01).name('amplitude (m)');
  const cTidePeriod = fTide.add(params, 'tidePeriod_h', 4, 30, 0.01).name('period (h)');
  const cTidePhase = fTide.add(params, 'tidePhase_deg', 0, 360, 0.5).name('phase (deg)');

  cTideAmp.onChange(h.onAnyChange);
  cTidePeriod.onChange(h.onAnyChange);
  cTidePhase.onChange(h.onAnyChange);

  const fSeiche = fWater.addFolder('Seiche');
  const cSeiche = fSeiche.add(params, 'seicheEnabled').name('enabled');
  const cSeicheAmp = fSeiche.add(params, 'seicheAmplitude_m', 0, 3, 0.01).name('amplitude (m)');
  const cSeichePeriod = fSeiche.add(params, 'seichePeriod_s', 30, 600, 1).name('period (s)');

  const updateSeicheEnabled = () => {
    setEnabled(cSeicheAmp, params.seicheEnabled);
    setEnabled(cSeichePeriod, params.seicheEnabled);
  };
  updateSeicheEnabled();

  cSeiche.onChange(() => {
    updateSeicheEnabled();
    h.onAnyChange();
  });
  cSeicheAmp.onChange(h.onAnyChange);
  cSeichePeriod.onChange(h.onAnyChange);

  const fPulse = fWater.addFolder('Seismic Pulse');
  const cPulseAmp = fPulse.add(params, 'pulseAmplitude_m', 0, 6, 0.05).name('amplitude (m)');
  const cPulseWave = fPulse.add(params, 'pulseWavelength_m', 40, 1200, 1).name('wavelength (m)');
  const cPulseDecay = fPulse.add(params, 'pulseDecayLength_m', 40, 2000, 1).name('decay length (m)');
  const cPulseDur = fPulse.add(params, 'pulseDuration_s', 2, 90, 0.1).name('duration (s)');
  const cPulseSpeed = fPulse.add(params, 'pulseSpeedScale', 0.25, 4, 0.01).name('speed scale');
  const cPulseDir = fPulse.add(params, 'pulseDirection_deg', 0, 360, 1).name('direction (°)');
  const cPulseTrigger = fPulse.add(pulseActions, 'triggerPulse').name('trigger pulse');

  cPulseAmp.onChange(h.onAnyChange);
  cPulseWave.onChange(h.onAnyChange);
  cPulseDecay.onChange(h.onAnyChange);
  cPulseDur.onChange(h.onAnyChange);
  cPulseSpeed.onChange(h.onAnyChange);
  cPulseDir.onChange(h.onAnyChange);

  const fRogue = fWater.addFolder('Rogue Waves');
  const cRogue = fRogue.add(params, 'rogueEnabled').name('enabled');
  const cRogueChance = fRogue.add(params, 'rogueChance_pct', 0, 100, 1).name('chance per min (%)');
  const cRogueDur = fRogue.add(params, 'rogueDuration_s', 2, 40, 0.1).name('duration (s)');
  const cRogueCount = fRogue.add(params, 'rogueComponentCount', 1, 10, 1).name('boosted components');
  const cRogueAmp = fRogue.add(params, 'rogueAmplitudeBoost', 0, 250, 5).name('amp boost (%)');
  const cRoguePhase = fRogue.add(params, 'roguePhaseAlign_pct', 0, 100, 1).name('phase align (%)');

  const updateRogueEnabled = () => {
    const on = params.rogueEnabled;
    setEnabled(cRogueChance, on);
    setEnabled(cRogueDur, on);
    setEnabled(cRogueCount, on);
    setEnabled(cRogueAmp, on);
    setEnabled(cRoguePhase, on);
  };
  updateRogueEnabled();

  cRogue.onChange(() => {
    updateRogueEnabled();
    h.onAnyChange();
  });
  cRogueChance.onChange(h.onAnyChange);
  cRogueDur.onChange(h.onAnyChange);
  cRogueCount.onChange(h.onAnyChange);
  cRogueAmp.onChange(h.onAnyChange);
  cRoguePhase.onChange(h.onAnyChange);

  const cWindSea = fWater.add(params, 'windSeaIntensity', 0, 2, 0.01).name('wind sea intensity');
  cWindSea.onChange(h.onAnyChange);
  const cSwell = fWater.add(params, 'swellIntensity', 0, 2, 0.01).name('swell intensity');
  cSwell.onChange(h.onAnyChange);

  const fCap = fWater.addFolder('Capillary');
  const cCapStrength = fCap.add(params, 'capillaryStrength', 0, 1, 0.01).name('speckle strength');
  const cCapAmp = fCap.add(params, 'capillaryAmplitude_m', 0, 0.02, 0.0005).name('amplitude (m)');
  const cCapSlope = fCap.add(params, 'capillarySlopeFalloff', 0.25, 3.0, 0.05).name('slope falloff');
  const cCapSpread = fCap.add(params, 'capillaryDirectionalSpread', 0, 1, 0.01).name('direction spread');
  const cCapCount = fCap.add(params, 'capillaryWaveCount', 0, 16, 1).name('wave count');

  cCapStrength.onChange(h.onAnyChange);
  cCapAmp.onChange(h.onAnyChange);
  cCapSlope.onChange(h.onAnyChange);
  cCapSpread.onChange(h.onAnyChange);
  cCapCount.onChange(h.onAnyChange);

  setTooltip(cTideAmp, 'Tide amplitude in meters. Range: 0-3 (safe <=2).');
  setTooltip(cTidePeriod, 'Tide period in hours. Range: 4-30 (12.42 = M2).');
  setTooltip(cTidePhase, 'Tide phase offset in degrees. Range: 0-360.');
  setTooltip(cSeiche, 'Standing basin wave toggle. Safe range: on/off.');
  setTooltip(cSeicheAmp, 'Peak seiche amplitude in meters. Safe range: 0-1.5 (3 is extreme).');
  setTooltip(cSeichePeriod, 'Seiche period in seconds. Safe range: 30-600 (longer = calmer).');
  setTooltip(cPulseAmp, 'Pulse height in meters. Safe range: 0.5-3 (higher = dramatic).');
  setTooltip(cPulseWave, 'Pulse wavelength in meters. Longer = faster + smoother.');
  setTooltip(cPulseDecay, 'Pulse envelope decay length in meters. Longer = broader wave packet.');
  setTooltip(cPulseDur, 'Pulse lifetime in seconds. Longer = more travel time.');
  setTooltip(cPulseSpeed, 'Scales the physical group speed. 1 = physical, >1 = stylized.');
  setTooltip(cPulseDir, 'Travel direction (toward) in degrees.');
  setTooltip(cPulseTrigger, 'Fire a seismic pulse starting at the otter position.');
  setTooltip(cRogue, 'Enable rogue-wave events (rare amplitude/phase boosts).');
  setTooltip(cRogueChance, 'Chance per minute. Range: 0-100% (safe <=20%).');
  setTooltip(cRogueDur, 'Event duration in seconds. Range: 2-40 (safe 4-12).');
  setTooltip(cRogueCount, 'Boosted component count. Range: 1-10 (safe 2-5).');
  setTooltip(cRogueAmp, 'Amplitude boost (%). Range: 0-250 (safe 50-150).');
  setTooltip(cRoguePhase, 'Phase alignment (%). Range: 0-100 (safe <=70).');
  setTooltip(cWindSea, 'Boosts foam/roughness from wind-sea energy. Range: 0-2 (safe 0-1.5).');
  setTooltip(cSwell, 'Scales long-wave displacement (swell). Range: 0-2 (safe 0.6-1.4).');
  setTooltip(cCapStrength, 'Boosts glancing capillary sparkle + foam speckle. Range: 0-1 (safe <=0.5).');
  setTooltip(cCapAmp, 'Capillary ripple height scale (m). Range: 0-0.02 (safe <=0.01).');
  setTooltip(cCapSlope, 'Capillary amplitude falloff for shorter ripples. Range: 0.25-3 (safe 0.6-2).');
  setTooltip(cCapSpread, 'Capillary direction spread. 0=aligned, 1=broad. Range: 0-1 (safe <=0.4).');
  setTooltip(cCapCount, 'Capillary component count carved from total waves. Range: 0-16 (safe 4-10).');

  const fPerf = gui.addFolder('Performance Mode');
  const qCtrl = fPerf.add(params, 'quality', ['Low', 'Medium', 'High', 'Max']).name('mode');
  qCtrl.listen();
  qCtrl.onChange(() => {
    params.qualityInfo = qualityInfo(params.quality);
    h.onAnyChange();
  });
  fPerf.add(params, 'qualityInfo').name('what this does').listen();
  fPerf.add(params, 'perfOverlay').name('perf overlay').onChange(h.onAnyChange);

  const fAccess = gui.addFolder('Accessibility');
  fAccess.add(params, 'reduceFlashes').name('reduce flashes/grain').onChange(h.onAnyChange);

  const fAudio = gui.addFolder('Audio');
  fAudio.add(params, 'audioEnabled').name('enabled').onChange(h.onAnyChange);
  fAudio.add(params, 'masterVolume', 0, 1, 0.01).name('volume').onChange(h.onAnyChange);

  const fRead = gui.addFolder('Readouts');
  fRead.add(params, 'derived_state').name('state').listen();
  fRead.add(params, 'derived_clock').name('clock').listen();
  fRead.add(params, 'derived_airTemp_C').name('air °C').listen();
  fRead.add(params, 'derived_waterTemp_C').name('water °C').listen();
  fRead.add(params, 'derived_cloudCover').name('cloud').listen();
  fRead.add(params, 'derived_visibility_km').name('vis km').listen();
  fRead.add(params, 'derived_windSpeed_mps').name('wind m/s').listen();
  fRead.add(params, 'derived_windDirFrom_deg').name('wind from°').listen();
  fRead.add(params, 'derived_precip').name('precip').listen();
  fRead.add(params, 'derived_stormETA').name('storm ETA').listen();
  fRead.add(params, 'derived_stormChanceEff_pct').name('storm % (eff)').listen();
  fRead.add(params, 'derived_hurricaneChanceEff_pct').name('hurricane % (eff)').listen();
  fRead.add(params, 'derived_Hs_m').name('Hs (m)').listen();
  fRead.add(params, 'derived_Tp_s').name('Tp (s)').listen();
  fRead.add(params, 'derived_tideScale').name('tide scale').listen();

  fLoc.open();
  fTime.open();
  fWx.open();
  fRead.open();

  const fSettings = gui.addFolder('Settings');
  fSettings.add(actions, 'resetSettings').name('reset saved settings');

  return gui;
}
