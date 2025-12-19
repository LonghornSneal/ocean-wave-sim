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

export interface GUIHandlers {
  onAnyChange: () => void;
  onStartGame: () => void;
  onNewGame: () => void;
  onResetSettings?: () => void;

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
  fWater.add(params, 'clarity_pct', 0, 100, 1).name('clarity (%)').onChange(h.onAnyChange);

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
