import * as THREE from 'three';
import { FoamField } from './lib/foamField';
import type { WaveComponent } from './lib/spectrum';
import { clamp, degToRad } from './lib/math';
import { OverlayWarning } from './lib/overlay';
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
import { CAMERA_FOV_DEG, OtterCameraRig } from './lib/otterCamera';
import { PrecipitationSystem } from './lib/precip';
import { PerfOverlay } from './lib/perfOverlay';
import { RogueWaveScheduler, buildSeismicPulse, type SeismicPulseState } from './lib/wavePhysics';
import { applyCanvasSize } from './app/quality';
import { installRuntimeErrorOverlay } from './app/runtimeOverlay';
import { AudioController } from './app/audioController';
import { PlanarReflectionController } from './app/planarReflection';
import { rebuildPostFX, type PostFXState } from './app/postfx';
import { startAnimationLoop, type LoopControls, type LoopState } from './app/loop';
import { createAtmosphere } from './app/atmosphere';
import { createOceanSurface, foamRTSizeForQuality, foamWorldSizeForQuality, segmentsForQuality } from './app/oceanSetup';
import { createWorldAssets } from './app/worldAssets';
import { resetSimulationState } from './app/simReset';

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

const camera = new THREE.PerspectiveCamera(CAMERA_FOV_DEG, window.innerWidth / window.innerHeight, 0.1, 20000);
// Start close + low (the otter camera rig will take over immediately).
camera.position.set(0, params.cameraElevation_m, 2.5);

const {
  fogAbove,
  fogUnder,
  underwaterDome,
  sky,
  skyUniforms,
  sunLight,
  moonLight,
  ambient,
  lightningLight,
  otterFillLight,
  tmpSunColor,
  sunWarmColor,
  otterFillNightColor,
  stars,
  sunSprite,
  moonSprite
} = createAtmosphere(scene);

// Otter motion tracking (wake / foam)
const otterPrevXZ = new THREE.Vector2();
let otterSpeed_mps = 0;

// ---------- Ocean ----------
let wavesCurrent: WaveComponent[] = [];
let wavesTarget: WaveComponent[] = [];
const oceanSetup = createOceanSurface(renderer, scene, params);
const ocean = oceanSetup.ocean;
const oceanMat = oceanSetup.oceanMat;
let foamField = oceanSetup.foamField;

// ---------- Post FX (quality-aware) ----------
// - Medium/High/Max: subtle cinematic grading (warm sunset tone, grain, vignette)
// - Max: optional SSR reflections (best-effort; falls back gracefully)
let postFX: PostFXState = rebuildPostFX(null, { renderer, scene, camera, ocean, params });
const tmpSSRtexel = new THREE.Vector2();

function bindSSRToOcean(): void {
  const ssrPass = postFX.ssrPass as any;
  const ssrTex = ssrPass?.ssrRenderTarget?.texture as THREE.Texture | undefined;
  if (ssrTex) {
    oceanMat.bindSSRReflection(ssrTex);
    const w = Math.max(1, ssrPass?.ssrRenderTarget?.width ?? window.innerWidth);
    const h = Math.max(1, ssrPass?.ssrRenderTarget?.height ?? window.innerHeight);
    tmpSSRtexel.set(1 / w, 1 / h);
    oceanMat.setSSRReflectionSampling({ texel: tmpSSRtexel, strength: 1.0 });
  } else {
    oceanMat.bindSSRReflection(null);
    oceanMat.setSSRReflectionSampling({ strength: 0.0 });
  }
}

bindSSRToOcean();

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

// A glowing "orb" attached to the otter for the storm scenario. This is a
// visible prop; broad illumination comes from the sky + moon.
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

const camRig = new OtterCameraRig();

// ---------- Weather + life ----------

const weatherSim = new WeatherSim();
const rogueScheduler = new RogueWaveScheduler();
const rogueWarning = new OverlayWarning('Rogue Wave');

let simTime_s = 0;
let timeOfDay_h = params.timeOfDay_h;
let dayOfYear = params.dayOfYear;

// Sea-state (smoothed)
let seaHs_m = 1.0;
let seaTp_s = 7.5;
let windDirTo_rad = Math.PI;
// A slower-moving "memory" direction used for the swell band (milestone #3).
let swellDirTo_rad = Math.PI;

const seismicPulse: SeismicPulseState = {
  component: buildSeismicPulse({
    amplitude_m: params.pulseAmplitude_m,
    wavelength_m: params.pulseWavelength_m,
    depth_m: params.depth_m,
    directionTo_rad: degToRad(params.pulseDirection_deg),
    decayLength_m: params.pulseDecayLength_m,
    groupSpeedScale: params.pulseSpeedScale
  }),
  originXZ: new THREE.Vector2(0, 0),
  startTime_s: -1e9,
  duration_s: params.pulseDuration_s
};

function updateSeismicPulse(): void {
  seismicPulse.component = buildSeismicPulse({
    amplitude_m: params.pulseAmplitude_m,
    wavelength_m: params.pulseWavelength_m,
    depth_m: params.depth_m,
    directionTo_rad: degToRad(params.pulseDirection_deg),
    decayLength_m: params.pulseDecayLength_m,
    groupSpeedScale: params.pulseSpeedScale
  });
  seismicPulse.duration_s = params.pulseDuration_s;
}

const worldAssets = createWorldAssets(scene, params);
const { life, cloudLayers, lightningBolts, lightningDir, islands, rainbow, splashes, windSpray, ripples, wakeRibbon, waterline } = worldAssets;
const QUALITY_RANK = worldAssets.qualityRank;
let precip = worldAssets.precip;

// ---------- Planar reflection (water) ----------
// A mirror-camera render target that provides stable horizon/sky/object reflections.
// SSR (Max tier) can still add subtle near-field contact reflections, but the planar
// RT is the primary reflection path for the ocean shader.
const reflectionHideList: THREE.Object3D[] = [ocean, ripples.mesh, wakeRibbon.mesh, waterline.mesh];
const planarReflections = new PlanarReflectionController(renderer, oceanMat, reflectionHideList);
planarReflections.rebuild(params);

// ---------- Audio ----------

const audioController = new AudioController(params);
audioController.updateHint();

// ---------- UI ----------

let lastQuality = params.quality;

function resetSimulation(): void {
  ({
    simTime_s,
    seaHs_m,
    seaTp_s,
    windDirTo_rad,
    swellDirTo_rad,
    wavesCurrent,
    wavesTarget,
    needsRebuild,
    otterSpeed_mps
  } = resetSimulationState({
    params,
    weatherSim,
    timeOfDay_h,
    dayOfYear,
    otter,
    life,
    renderer,
    foamField,
    otterPrevXZ
  }));
  const rogueSeed = Math.floor((params.latitude_deg * 1000 + params.longitude_deg * 1000 + dayOfYear * 17 + timeOfDay_h * 13) % 2147483647);
  rogueScheduler.reset(rogueSeed);
  rogueWarning.setIntensity(0);
  updateSeismicPulse();
  seismicPulse.startTime_s = -1e9;
  seismicPulse.originXZ.set(otter.position.x, otter.position.z);
}

function triggerSeismicPulse(): void {
  updateSeismicPulse();
  seismicPulse.startTime_s = simTime_s;
  seismicPulse.originXZ.set(otter.position.x, otter.position.z);
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
  bindSSRToOcean();
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
    updateSeismicPulse();
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
    updateSeismicPulse();

    applyQualityIfChanged();
    applyOtterAppearance();
    audioController.updateHint();
    void audioController.updateState();
    perfOverlay.setEnabled(params.perfOverlay);
    resetSimulation();
    savePersistedParams(params);
    refreshGui();
  },
  onPulseTrigger: () => {
    triggerSeismicPulse();
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
    postFX.bloomPass?.setSize?.(window.innerWidth, window.innerHeight);
    if (postFX.underwaterPass) {
      (postFX.underwaterPass as any).uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    }
    if (postFX.grainPass) {
      const pixelRatio = renderer.getPixelRatio();
      (postFX.grainPass as any).uniforms.u_resolution.value.set(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
    }
  } catch {
    // ignore
  }

  try {
    bindSSRToOcean();
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
  bindSSRToOcean();
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
  try { postFX.bloomPass?.dispose?.(); } catch { /* ignore */ }
  try { postFX.underwaterPass?.dispose?.(); } catch { /* ignore */ }
  try { postFX.grainPass?.dispose?.(); } catch { /* ignore */ }
  try { postFX.gradePass?.dispose?.(); } catch { /* ignore */ }
  try { postFX.outputPass?.dispose?.(); } catch { /* ignore */ }
  pmrem.dispose();
  planarReflections.dispose();
  foamField.dispose();
  for (const layer of cloudLayers) layer.deck.dispose();
  lightningBolts.dispose();
  rainbow.dispose();
  ripples.dispose();
  wakeRibbon.dispose();
  audioController.dispose();
  rogueWarning.dispose();
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
  waterline,
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
  seismicPulse,
  rogueScheduler,
  rogueWarning,
  otterPrevXZ,
  get otterSpeed_mps() { return otterSpeed_mps; },
  set otterSpeed_mps(v) { otterSpeed_mps = v; }
};

loopControls = startAnimationLoop(loopState);
