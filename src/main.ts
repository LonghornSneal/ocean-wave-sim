import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { OceanMaterial } from './lib/oceanMaterial';
import { FoamField } from './lib/foamField';
import type { WaveComponent } from './lib/spectrum';
import { clamp } from './lib/math';
import {
  applyPersistedParams,
  createGUI,
  defaultParams,
  qualityInfo,
  resetPersistedParams,
  savePersistedParams,
  type AppParams
} from './lib/ui';
import { WeatherSim } from './lib/weather';
import { SeaOtter } from './lib/otter';
import { OtterCameraRig } from './lib/otterCamera';
import { HorizonIslands } from './lib/islands';
import { biomeFor, OceanLife } from './lib/life';
import { PrecipitationSystem } from './lib/precip';
import { CloudDeck } from './lib/clouds';
import { RainbowArc } from './lib/rainbow';
import { SplashSystem } from './lib/splashes';
import { OtterRipples } from './lib/ripples';
import { WakeRibbon } from './lib/wakeRibbon';
import { PerfOverlay } from './lib/perfOverlay';
import { LightningBolts } from './lib/lightningBolts';
import { WindSpray } from './lib/windSpray';
import { applyCanvasSize } from './app/quality';
import { installRuntimeErrorOverlay } from './app/runtimeOverlay';
import { makeMoonSprite, makeStars, makeSunSprite } from './app/skyHelpers';
import { AudioController } from './app/audioController';
import { PlanarReflectionController } from './app/planarReflection';
import { rebuildPostFX, type PostFXState } from './app/postfx';
import { startAnimationLoop, type LoopControls, type LoopState } from './app/loop';

// ---------- Renderer / scene ----------

const params: AppParams = defaultParams();
applyPersistedParams(params);
let needsRebuild = true;
let gui: ReturnType<typeof createGUI> | null = null;
let contextLost = false;
let loopControls: LoopControls | null = null;

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
applyCanvasSize(renderer, params.quality);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
// IMPORTANT (mobile): mount the canvas into #app (index.html) so it doesn't get pushed off-screen.
const mount = document.getElementById('app') ?? document.body;
mount.appendChild(renderer.domElement);
Object.assign(renderer.domElement.style, {
  position: 'fixed',
  left: '0',
  top: '0',
  width: '100%',
  height: '100%',
  zIndex: '0',
  display: 'block'
} as Partial<CSSStyleDeclaration>);

// If anything goes wrong (especially on mobile where console access is painful),
// show the error directly on-screen so you don't end up stuck staring at a black canvas.
installRuntimeErrorOverlay(
  renderer.domElement,
  () => {
    contextLost = true;
    loopControls?.onContextLost();
  },
  () => {
    contextLost = false;
    handleContextRestored();
  }
);

// Tiny on-screen perf HUD (toggleable in the UI).
const perfOverlay = new PerfOverlay();
perfOverlay.setEnabled(params.perfOverlay);

// PMREM generator for dynamic environment lighting (reuse to avoid churn)
const pmrem = new THREE.PMREMGenerator(renderer);
pmrem.compileCubemapShader?.();
let envRT: THREE.WebGLRenderTarget | null = null;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Fog objects (reused to avoid per-frame allocations)
const fogAbove = new THREE.FogExp2(new THREE.Color('#6a7aa0'), 0.00004);
const fogUnder = new THREE.FogExp2(new THREE.Color('#053044'), 0.03);

// If the camera goes underwater (the otter sometimes looks down), the sky is hidden.
// On devices where post FX can't run, that can make the world appear fully black.
// We render a cheap background dome so underwater never becomes a "black screen".
const underwaterDome = (() => {
  const geo = new THREE.SphereGeometry(9000, 16, 12);
  const mat = new THREE.MeshBasicMaterial({
    color: fogUnder.color.clone(),
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: false
  });
  const m = new THREE.Mesh(geo, mat);
  m.visible = false;
  m.frustumCulled = false;
  m.renderOrder = -1000;
  return m;
})();
scene.add(underwaterDome);

const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 20000);
// Start close + low (the otter camera rig will take over immediately).
camera.position.set(0, 1.2, 2.5);

// ---------- Sky, sun, moon, stars ----------

const sky = new Sky();
sky.scale.setScalar(10000);
scene.add(sky);

const skyUniforms = sky.material.uniforms as any;
skyUniforms['turbidity'].value = 10;
skyUniforms['rayleigh'].value = 2.3;
skyUniforms['mieCoefficient'].value = 0.007;
skyUniforms['mieDirectionalG'].value = 0.8;

const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
sunLight.position.set(1, 1, 0);
sunLight.castShadow = false;
scene.add(sunLight);

const moonLight = new THREE.DirectionalLight(0x9bb8ff, 0.25);
moonLight.position.set(-1, 1, 0);
scene.add(moonLight);

const ambient = new THREE.HemisphereLight(0x88aaff, 0x0b1020, 0.55);
scene.add(ambient);

// Lightning flashes (superstorm). Directional light gives a broad, inexpensive
// flash that reads well on the water.
const lightningLight = new THREE.DirectionalLight(new THREE.Color('#e6f2ff'), 0.0);
lightningLight.name = 'LightningLight';
lightningLight.castShadow = false;
scene.add(lightningLight);
scene.add(lightningLight.target);

// Camera-following fill light: keeps the otter readable on mobile (and in heavy
// cloud / night scenes) without having to crank global exposure.
const otterFillLight = new THREE.DirectionalLight(0xffffff, 0.0);
otterFillLight.castShadow = false;
scene.add(otterFillLight);
scene.add(otterFillLight.target);

// Temp colors (keep allocations out of the hot path)
const tmpSunColor = new THREE.Color('#ffffff');
// Warm tint used as the sun approaches the horizon.
const sunWarmColor = new THREE.Color('#ffb26b');
// Cooler tint for nighttime fill.
const otterFillNightColor = new THREE.Color('#cfe7ff');

// Otter motion tracking (wake / foam)
const otterPrevXZ = new THREE.Vector2();
let otterSpeed_mps = 0;

const stars = makeStars(2500);
scene.add(stars);

const sunSprite = makeSunSprite();
scene.add(sunSprite);

const moonSprite = makeMoonSprite(0.5);
scene.add(moonSprite);

// ---------- Ocean ----------

const segmentsForQuality = (q: AppParams['quality']): number => (
  q === 'Max' ? 340 : (q === 'High' ? 260 : (q === 'Medium' ? 180 : 128))
);
const foamRTSizeForQuality = (q: AppParams['quality']): number => (
  q === 'Max' ? 512 : (q === 'High' ? 384 : 256)
);

const foamWorldSizeForQuality = (q: AppParams['quality']): number => (
  q === 'Max' ? 300 : (q === 'High' ? 260 : (q === 'Medium' ? 220 : 180))
);

const oceanGeo = new THREE.PlaneGeometry(12000, 12000, segmentsForQuality(params.quality), segmentsForQuality(params.quality));
oceanGeo.rotateX(-Math.PI / 2);

let wavesCurrent: WaveComponent[] = [];
let wavesTarget: WaveComponent[] = [];

const oceanMat = new OceanMaterial({
  waterColor: new THREE.Color('#0a2a3a'),
  // Foam / choppiness are derived from weather & sea-state now (not direct inputs).
  foamIntensity: 1.1,
  foamSlopeStart: 0.18,
  foamSlopeEnd: 0.62,
  waves: []
});

const ocean = new THREE.Mesh(oceanGeo, oceanMat.material);
ocean.frustumCulled = false;
scene.add(ocean);

// Persistent foam field (milestone #2)
let foamField = new FoamField(renderer, {
  size: foamRTSizeForQuality(params.quality),
  worldSize_m: foamWorldSizeForQuality(params.quality)
});

// ---------- Post FX (quality-aware) ----------
// - Medium/High/Max: subtle cinematic grading (warm sunset tone, grain, vignette)
// - Max: optional SSR reflections (best-effort; falls back gracefully)
let postFX: PostFXState = rebuildPostFX(null, { renderer, scene, camera, ocean, params });

// ---------- Otter + camera rig ----------

const otter = new SeaOtter();
scene.add(otter.group);

// Otter appearance is tied to the single "Performance Mode" dropdown.
const otterModeForQuality = (q: AppParams['quality']): import('./lib/otter').OtterAppearanceMode => {
  if (q === 'Low') return 'Low';
  if (q === 'Medium') return 'Medium';
  return 'High';
};

function applyOtterAppearance(): void {
  const mode = otterModeForQuality(params.quality);
  const fur = mode === 'High' && params.otterFurSilhouette;
  otter.setAppearance(mode, fur);
}

applyOtterAppearance();

// A glowing "orb" attached to the otter for the storm scenario. This is both a
// visible prop and a real point light that illuminates nearby water.
const otterOrbMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.12, 18, 18),
  new THREE.MeshStandardMaterial({
    color: new THREE.Color('#081018'),
    emissive: new THREE.Color('#bfe4ff'),
    emissiveIntensity: 3.0,
    roughness: 0.2,
    metalness: 0.0
  })
);
otterOrbMesh.name = 'OtterOrb';
scene.add(otterOrbMesh);

const otterOrbLight = new THREE.PointLight(new THREE.Color('#bfe4ff'), 0.0, 32, 2.0);
otterOrbLight.name = 'OtterOrbLight';
otterOrbLight.castShadow = false;
scene.add(otterOrbLight);

const camRig = new OtterCameraRig();

// ---------- Weather + life ----------

const weatherSim = new WeatherSim();

let simTime_s = 0;
let timeOfDay_h = params.timeOfDay_h;
let dayOfYear = params.dayOfYear;

// Sea-state (smoothed)
let seaHs_m = 1.0;
let seaTp_s = 7.5;
let windDirTo_rad = Math.PI;
// A slower-moving "memory" direction used for the swell band (milestone #3).
let swellDirTo_rad = Math.PI;

// Direction from the camera toward the most recent flash. Used to localize
// lightning illumination in the cloud shader (so it doesn't brighten the whole dome).
const lightningDir = new THREE.Vector3(0, 1, 0);

// Undersea life / encounters
const initialBiome = biomeFor(params.latitude_deg, 12);
const life = new OceanLife({ biome: initialBiome, coastProximity: params.coastProximity, exoticEncounters: params.exoticEncounters_pct / 100 });
scene.add(life.group);

// Weather visuals
let precip = new PrecipitationSystem(params.quality);
scene.add(precip.group);

const cloudsLow = new CloudDeck({
  layerOffset: -0.18,
  densityScale: 1.1,
  opacityScale: 1.0,
  coverScale: 1.0,
  stormScale: 1.05,
  rainScale: 1.0,
  windScale: 0.85,
  stepsScale: 1.0
});
cloudsLow.mesh.renderOrder = -12;
scene.add(cloudsLow.mesh);

const cloudsMid = new CloudDeck({
  layerOffset: 0.22,
  densityScale: 0.85,
  opacityScale: 0.7,
  coverScale: 0.78,
  stormScale: 0.9,
  rainScale: 0.75,
  windScale: 1.05,
  stepsScale: 0.75
});
cloudsMid.mesh.renderOrder = -11;
scene.add(cloudsMid.mesh);

const cloudsHigh = new CloudDeck({
  layerOffset: 0.68,
  densityScale: 0.55,
  opacityScale: 0.55,
  coverScale: 0.58,
  stormScale: 0.65,
  rainScale: 0.45,
  windScale: 1.25,
  stepsScale: 0.6
});
cloudsHigh.mesh.renderOrder = -10;
scene.add(cloudsHigh.mesh);

const cloudLayers = [
  { deck: cloudsLow, minQuality: 'Low' as AppParams['quality'] },
  { deck: cloudsMid, minQuality: 'Medium' as AppParams['quality'] },
  { deck: cloudsHigh, minQuality: 'High' as AppParams['quality'] }
];
const QUALITY_RANK: Record<AppParams['quality'], number> = { Low: 0, Medium: 1, High: 2, Max: 3 };

const lightningBolts = new LightningBolts();
scene.add(lightningBolts.group);

const islands = new HorizonIslands();
scene.add(islands.group);

const rainbow = new RainbowArc();
scene.add(rainbow.mesh);

const splashes = new SplashSystem();
scene.add(splashes.points);

const windSpray = new WindSpray();
scene.add(windSpray.points);

const ripples = new OtterRipples();
scene.add(ripples.mesh);

// Trailing wake ribbon/decal (cheap surface cue)
const wakeRibbon = new WakeRibbon();
scene.add(wakeRibbon.mesh);

// ---------- Planar reflection (water) ----------
// A mirror-camera render target that provides stable horizon/sky/object reflections.
// SSR (Max tier) can still add subtle near-field contact reflections, but the planar
// RT is the primary reflection path for the ocean shader.
const reflectionHideList: THREE.Object3D[] = [ocean, ripples.mesh, wakeRibbon.mesh];
const planarReflections = new PlanarReflectionController(renderer, oceanMat, reflectionHideList);
planarReflections.rebuild(params);

// ---------- Audio ----------

const audioController = new AudioController(params);
audioController.updateHint();

// ---------- UI ----------

let lastQuality = params.quality;

function resetSimulation(): void {
  simTime_s = 0;
  // Start *immediately* in a dramatic sea-state (no long "wave growth" ramp).
  seaHs_m = 13.5;
  seaTp_s = 13.8;
  windDirTo_rad = Math.PI;
  swellDirTo_rad = Math.PI;
  wavesCurrent = [];
  wavesTarget = [];
  needsRebuild = true;

  // Kick off the sim in an in-progress thunderstorm so the first frame already
  // matches the "superstorm" scenario.
  weatherSim.reset({
    latitude_deg: params.latitude_deg,
    longitude_deg: params.longitude_deg,
    dayOfYear,
    timeOfDay_h,
    force: {
      cloudCover01: 0.98,
      precip01: 1.0,
      storm01: 1.0,
      // Keep below the hurricane threshold by default (still wicked).
      hurricane01: 0.15,
      windSpeed_mps: 42.0,
      windDirFrom_deg: 42,
      gustiness01: 1.0,
      // Pretend the wind has been blowing for a long time so the sea is fully developed.
      steadyAge_h: 36,
      stormStrength01: 1.0,
      stormDirFrom_deg: 42,
      stormDuration_s: 2.5 * 3600,
      // Already 35 minutes into the storm -> near peak.
      stormActiveElapsed_s: 35 * 60
    }
  });

  otter.reset();
  life.reset();

  otterPrevXZ.set(otter.position.x, otter.position.z);
  otterSpeed_mps = 0;

  // Clear persistent foam between runs.
  foamField.reset(renderer, otterPrevXZ);
}

function applyQualityIfChanged(): void {
  if (params.quality === lastQuality) return;
  lastQuality = params.quality;

  // Pixel ratio — cap per performance mode (mobile friendly).
  applyCanvasSize(renderer, params.quality);

  // Rebuild ocean geometry + precip particles for the new quality.
  const newGeo = new THREE.PlaneGeometry(12000, 12000, segmentsForQuality(params.quality), segmentsForQuality(params.quality));
  newGeo.rotateX(-Math.PI / 2);
  (ocean.geometry as THREE.BufferGeometry).dispose();
  ocean.geometry = newGeo;

  scene.remove(precip.group);
  precip.dispose();
  precip = new PrecipitationSystem(params.quality);
  scene.add(precip.group);

  postFX = rebuildPostFX(postFX, { renderer, scene, camera, ocean, params });
  planarReflections.rebuild(params);
  loopControls?.resetEnvTimers();

  // Persistent foam field resolution/coverage scales with quality.
  foamField.dispose();
  foamField = new FoamField(renderer, {
    size: foamRTSizeForQuality(params.quality),
    worldSize_m: foamWorldSizeForQuality(params.quality)
  });

  needsRebuild = true;
  loopControls?.resetPerfStats();
}

function refreshGui(): void {
  if (!gui) return;
  try {
    const ctrls = (gui as any).controllersRecursive?.() ?? [];
    for (const c of ctrls) c.updateDisplay?.();
  } catch {
    // ignore
  }
}

function setQuality(q: AppParams['quality']): void {
  if (params.quality === q) return;
  params.quality = q;
  params.qualityInfo = qualityInfo(params.quality);
  applyQualityIfChanged();
  applyOtterAppearance();
  savePersistedParams(params);
  refreshGui();
}

gui = createGUI(params, {
  onAnyChange: () => {
    // Allow time/location edits at any point.
    timeOfDay_h = params.timeOfDay_h;
    dayOfYear = params.dayOfYear;
    applyQualityIfChanged();
    applyOtterAppearance();
    audioController.updateHint();
    void audioController.updateState();
    perfOverlay.setEnabled(params.perfOverlay);
    needsRebuild = true;
    savePersistedParams(params);
  },
  onCameraChange: () => {
    // Hot-adjustable: camera reads this param every frame; no rebuild needed.
    params.cameraDistance_m = clamp(params.cameraDistance_m, 9.0, 18.0);
    params.cameraElevation_m = clamp(params.cameraElevation_m, 0.35, 3.0);
    savePersistedParams(params);
  },
  onStartGame: () => {
    params.gameStarted = true;
    timeOfDay_h = params.timeOfDay_h;
    dayOfYear = params.dayOfYear;
    resetSimulation();
  },
  onNewGame: () => {
    params.gameStarted = false;
    timeOfDay_h = params.timeOfDay_h;
    dayOfYear = params.dayOfYear;
    resetSimulation();
  },
  onResetSettings: () => {
    resetPersistedParams();
    const fresh = defaultParams();
    Object.assign(params, fresh);
    params.qualityInfo = qualityInfo(params.quality);

    timeOfDay_h = params.timeOfDay_h;
    dayOfYear = params.dayOfYear;

    applyQualityIfChanged();
    applyOtterAppearance();
    audioController.updateHint();
    void audioController.updateState();
    perfOverlay.setEnabled(params.perfOverlay);
    resetSimulation();
    savePersistedParams(params);
    refreshGui();
  }
});

// Kick off the default scenario immediately so the very first frame already has
// a fully-developed sea state (big waves) and an active thunderstorm.
// This avoids the “flat calm” look if you don't open the panel and press Start.
resetSimulation();

// ---------- Resize ----------

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  applyCanvasSize(renderer, params.quality);
  try {
    postFX.composer?.setSize?.(window.innerWidth, window.innerHeight);
    postFX.ssrPass?.setSize?.(window.innerWidth, window.innerHeight);
    if (postFX.underwaterPass) {
      (postFX.underwaterPass as any).uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    }
  } catch {
    // ignore
  }

  try {
    planarReflections.rebuild(params);
  } catch {
    // ignore
  }
});

function handleContextRestored(): void {
  applyCanvasSize(renderer, params.quality);

  if (envRT) {
    envRT.dispose();
    envRT = null;
  }
  scene.environment = null;
  pmrem.compileCubemapShader?.();

  postFX = rebuildPostFX(postFX, { renderer, scene, camera, ocean, params });
  planarReflections.rebuild(params);

  // Recreate GPU resources that rely on render targets.
  foamField.dispose();
  foamField = new FoamField(renderer, {
    size: foamRTSizeForQuality(params.quality),
    worldSize_m: foamWorldSizeForQuality(params.quality)
  });

  needsRebuild = true;
  loopControls?.resetEnvTimers();
  loopControls?.onContextRestored();
}

// ---------- Cleanup ----------

window.addEventListener('beforeunload', () => {
  if (envRT) envRT.dispose();
  try { postFX.composer?.dispose?.(); } catch { /* ignore */ }
  try { postFX.composerDepthTex?.dispose?.(); } catch { /* ignore */ }
  try { postFX.ssrPass?.dispose?.(); } catch { /* ignore */ }
  try { postFX.underwaterPass?.dispose?.(); } catch { /* ignore */ }
  try { postFX.gradePass?.dispose?.(); } catch { /* ignore */ }
  pmrem.dispose();
  planarReflections.dispose();
  foamField.dispose();
  for (const layer of cloudLayers) layer.deck.dispose();
  lightningBolts.dispose();
  rainbow.dispose();
  ripples.dispose();
  wakeRibbon.dispose();
  audioController.dispose();
  perfOverlay.dispose();
  precip.dispose();
  splashes.dispose();
  windSpray.dispose();
  renderer.dispose();
});

// ---------- Animation loop ----------

const loopState: LoopState = {
  params,
  renderer,
  scene,
  camera,
  ocean,
  oceanMat,
  foamField,
  sky,
  skyUniforms,
  sunLight,
  moonLight,
  ambient,
  lightningLight,
  stars,
  sunSprite,
  moonSprite,
  underwaterDome,
  fogAbove,
  fogUnder,
  sunWarmColor,
  tmpSunColor,
  otterFillLight,
  otterFillNightColor,
  weatherSim,
  otter,
  camRig,
  otterOrbMesh,
  otterOrbLight,
  life,
  precip,
  cloudLayers,
  qualityRank: QUALITY_RANK,
  lightningBolts,
  lightningDir,
  islands,
  rainbow,
  splashes,
  windSpray,
  ripples,
  wakeRibbon,
  perfOverlay,
  pmrem,
  get envRT() { return envRT; },
  set envRT(v) { envRT = v; },
  planarReflections,
  audio: audioController,
  get postFX() { return postFX; },
  set postFX(v) { postFX = v; },
  setQuality,
  get contextLost() { return contextLost; },
  get needsRebuild() { return needsRebuild; },
  set needsRebuild(v) { needsRebuild = v; },
  get wavesCurrent() { return wavesCurrent; },
  set wavesCurrent(v) { wavesCurrent = v; },
  get wavesTarget() { return wavesTarget; },
  set wavesTarget(v) { wavesTarget = v; },
  get simTime_s() { return simTime_s; },
  set simTime_s(v) { simTime_s = v; },
  get timeOfDay_h() { return timeOfDay_h; },
  set timeOfDay_h(v) { timeOfDay_h = v; },
  get dayOfYear() { return dayOfYear; },
  set dayOfYear(v) { dayOfYear = v; },
  get seaHs_m() { return seaHs_m; },
  set seaHs_m(v) { seaHs_m = v; },
  get seaTp_s() { return seaTp_s; },
  set seaTp_s(v) { seaTp_s = v; },
  get windDirTo_rad() { return windDirTo_rad; },
  set windDirTo_rad(v) { windDirTo_rad = v; },
  get swellDirTo_rad() { return swellDirTo_rad; },
  set swellDirTo_rad(v) { swellDirTo_rad = v; },
  otterPrevXZ,
  get otterSpeed_mps() { return otterSpeed_mps; },
  set otterSpeed_mps(v) { otterSpeed_mps = v; }
};

loopControls = startAnimationLoop(loopState);
