import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import { OceanMaterial } from './lib/oceanMaterial';
import { PlanarReflection } from './lib/waterReflection';
import { FoamField } from './lib/foamField';
import { buildWaveComponents, type WaveComponent } from './lib/spectrum';
import { computeCelestials } from './lib/celestial';
import { computeDerivedFromU10, predictWaveHsTpCEM } from './lib/wavePhysics';
import { clamp, lerp } from './lib/math';
import {
  applyPersistedParams,
  createGUI,
  defaultParams,
  moonPhaseFraction,
  qualityInfo,
  resetPersistedParams,
  savePersistedParams,
  type AppParams
} from './lib/ui';
import { WeatherSim } from './lib/weather';
import { SeaOtter } from './lib/otter';
import { OtterCameraRig } from './lib/otterCamera';
import { GradeShader } from './lib/grading';
import { UnderwaterPostPass } from './lib/underwaterPass';
import { HorizonIslands } from './lib/islands';
import { biomeFor, OceanLife } from './lib/life';
import { PrecipitationSystem } from './lib/precip';
import { CloudDeck } from './lib/clouds';
import { RainbowArc } from './lib/rainbow';
import { SplashSystem } from './lib/splashes';
import { OtterRipples } from './lib/ripples';
import { WakeRibbon } from './lib/wakeRibbon';
import { sampleGerstner } from './lib/waveSample';
import { OceanAudio } from './lib/audio';
import { OverlayHint } from './lib/overlay';
import { PerfOverlay } from './lib/perfOverlay';
import { LightningBolts } from './lib/lightningBolts';
import { WindSpray } from './lib/windSpray';

// ---------- Renderer / scene ----------

const params: AppParams = defaultParams();
applyPersistedParams(params);
let needsRebuild = true;
let gui: ReturnType<typeof createGUI> | null = null;
let contextLost = false;

// Heuristic: mobile/touch devices are far more likely to hit GPU/driver limits
// (context loss / temporary black frames) when we push SSR + huge DPR.
// We keep "Max" pretty, but reduce the most expensive defaults on mobile.
const DEVICE_MEMORY_GB = (() => {
  try {
    const mem = (navigator as any)?.deviceMemory;
    return typeof mem === 'number' && Number.isFinite(mem) ? mem : null;
  } catch {
    return null;
  }
})();

const IS_MOBILE_LIKE = (() => {
  try {
    const coarse = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const mobileUA = /Android|iPhone|iPad|iPod/i.test(ua);
    const lowMem = DEVICE_MEMORY_GB !== null && DEVICE_MEMORY_GB <= 4;
    return coarse || mobileUA || lowMem;
  } catch {
    return false;
  }
})();

function dprCapForQuality(q: AppParams['quality']): number {
  if (!IS_MOBILE_LIKE) {
    if (q === 'Low') return 1.5;
    if (q === 'Medium') return 2.0;
    if (q === 'High') return 2.5;
    return 3.0;
  }

  // Mobile: keep it stable. These caps still look good but avoid huge render targets.
  if (q === 'Low') return 1.25;
  if (q === 'Medium') return 1.5;
  if (q === 'High') return 1.75;
  return 2.0;
}

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
// Mobile-friendly: cap DPR by performance mode.
function applyCanvasSize(): void {
  const dpr = window.devicePixelRatio || 1;
  renderer.setPixelRatio(Math.min(dpr, dprCapForQuality(params.quality)));
  renderer.setSize(window.innerWidth, window.innerHeight);
}

applyCanvasSize();
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
    clock.stop();
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

// Temp vectors/colors (keep allocations out of the hot path)
const tmpV3a = new THREE.Vector3();
const tmpV3b = new THREE.Vector3();
const tmpV3c = new THREE.Vector3();
const tmpV3d = new THREE.Vector3();
const tmpV3e = new THREE.Vector3();
const tmpV2a = new THREE.Vector2();
const tmpV2b = new THREE.Vector2();
const tmpWindXZ = new THREE.Vector2();

// Otter motion tracking (wake / foam)
const tmpOtterXZ = new THREE.Vector2();
const tmpOtterDirXZ = new THREE.Vector2();
const otterPrevXZ = new THREE.Vector2();
let otterSpeed_mps = 0;

// Temp wave sample objects (avoid per-frame allocations in sampleGerstner)
const tmpSurfSample = { height_m: 0, normal: new THREE.Vector3(), disp: new THREE.Vector3(), slope: 0 };
const tmpSurfT = new THREE.Vector3();
const tmpSurfB = new THREE.Vector3();

// Water tint colors (preallocated; mixed per-frame)
const colDeep = new THREE.Color('#052436');
const colGreen = new THREE.Color('#0a3a32');
const colNearMix = new THREE.Color('#062b3f');
const tmpWaterCol = new THREE.Color();

// Haze colors (preallocated; mixed per-frame)
const hazeBaseCol = new THREE.Color('#6a86a8');
const hazeSunsetCol = new THREE.Color('#f2b17b');
const hazeStormCol = new THREE.Color('#3a445c');
const hazeNightCol = new THREE.Color('#05070c');
const tmpHazeCol = new THREE.Color();

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
const waveCountForQuality = (q: AppParams['quality']): number => (
  q === 'Max' ? 32 : (q === 'High' ? 32 : (q === 'Medium' ? 24 : 16))
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
let composer: EffectComposer | null = null;
let ssrPass: SSRPass | null = null;
let underwaterPass: ShaderPass | null = null;
let gradePass: ShaderPass | null = null;

// Depth texture used by underwater post (if supported).
let composerDepthTex: THREE.DepthTexture | null = null;

// Smooth transition (prevents a hard "snap" when the otter toggles underwater view).
let underwaterBlend = 0;

// Sun screen-space tracking for underwater shafts.
const tmpSunWorldPos = new THREE.Vector3();
const tmpSunNDC = new THREE.Vector3();

function rebuildPostFX(): void {
  // Dispose existing targets if supported.
  try {
    composer?.dispose?.();
  } catch {
    // ignore
  }
  composer = null;
  ssrPass = null;
  underwaterPass = null;
  gradePass = null;
  composerDepthTex = null;

  // Keep "Low" as the fastest path (no composer allocation).
  if (params.quality === 'Low') return;

  try {
    // Depth texture is required for believable underwater optics.
    // WebGL2 always supports it; WebGL1 needs WEBGL_depth_texture.
    const hasDepthTex = renderer.capabilities.isWebGL2 || !!renderer.extensions.get('WEBGL_depth_texture');

    if (hasDepthTex) {
      composerDepthTex = new THREE.DepthTexture(window.innerWidth, window.innerHeight);
      composerDepthTex.format = THREE.DepthFormat;
      composerDepthTex.type = THREE.UnsignedShortType;
      composerDepthTex.minFilter = THREE.NearestFilter;
      composerDepthTex.magFilter = THREE.NearestFilter;
      composerDepthTex.generateMipmaps = false;

      const rt = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType,
        depthBuffer: true,
        stencilBuffer: false
      });
      rt.texture.name = 'ComposerRT';
      rt.depthTexture = composerDepthTex;

      composer = new EffectComposer(renderer, rt);

      // Ensure the secondary ping-pong target also has a depth texture so
      // passes that rely on readBuffer.depthTexture (UnderwaterPostPass) work
      // regardless of internal buffer ordering.
      try {
        const rt2 = (composer as any).renderTarget2;
        if (rt2 && !rt2.depthTexture) {
          const dt2 = new THREE.DepthTexture(window.innerWidth, window.innerHeight);
          dt2.name = 'ComposerDepthTex2';
          dt2.format = THREE.DepthFormat;
          dt2.type = THREE.UnsignedShortType;
          dt2.minFilter = THREE.NearestFilter;
          dt2.magFilter = THREE.NearestFilter;
          dt2.generateMipmaps = false;
          rt2.depthTexture = dt2;
          rt2.depthBuffer = true;
        }
      } catch {
        // ignore
      }
    } else {
      composer = new EffectComposer(renderer);
    }

    composer.setSize(window.innerWidth, window.innerHeight);
    composer.addPass(new RenderPass(scene, camera));

    // SSR is beautiful, but on mobile it can be both unstable (driver issues) and
    // very memory-hungry at high DPR. Planar reflections are the primary ocean
    // reflection path anyway, so we only enable SSR on non-mobile.
    if (params.quality === 'Max' && !IS_MOBILE_LIKE) {
      try {
        ssrPass = new SSRPass({
          renderer,
          scene,
          camera,
          width: window.innerWidth,
          height: window.innerHeight,
          groundReflector: null,
          selects: [ocean]
        });

        // With planar reflections doing the heavy lifting, SSR is now a subtle
        // near-field enhancement (contact reflections).
        (ssrPass as any).opacity = 0.18;
        (ssrPass as any).maxDistance = 420;
        (ssrPass as any).thickness = 0.018;
        (ssrPass as any).infiniteThick = false;

        composer.addPass(ssrPass);
      } catch (err) {
        console.warn('[Max] SSR init failed; continuing without SSR.', err);
        ssrPass = null;
      }
    }

    // Underwater post (milestone #4). Kept lightweight and blendable.
    // This pass auto-binds the correct depth texture from the current readBuffer.
    underwaterPass = new UnderwaterPostPass();
    (underwaterPass as any).uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    composer.addPass(underwaterPass);

    gradePass = new ShaderPass(GradeShader as any);
    composer.addPass(gradePass);
  } catch (err) {
    console.warn('PostFX init failed; falling back to standard renderer.', err);
    composer = null;
    ssrPass = null;
    underwaterPass = null;
    gradePass = null;
    composerDepthTex = null;
  }
}

// Init post FX for the starting quality.
rebuildPostFX();

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

// Lightning state (seconds / pulses). Implemented here (not in weatherSim)
// because we want a visually punchy, high-frequency thunderstorm for the demo.
let lightningFlash01 = 0;
let lightningFlashFx = 0;
let lightningBurstPulses = 0;
let lightningNextPulse_s = 0;
// Direction from the camera toward the most recent flash. Used to localize
// lightning illumination in the cloud shader (so it doesn't brighten the whole dome).
const lightningDir = new THREE.Vector3(0, 1, 0);

// Undersea life / encounters
let currentBiome = biomeFor(params.latitude_deg, 12);
const life = new OceanLife({ biome: currentBiome, coastProximity: params.coastProximity, exoticEncounters: params.exoticEncounters_pct / 100 });
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

let planarRefl: PlanarReflection | null = null;
let reflTimer_s = 0;
let reflUpdateCount = 0;
let reflRateTimer_s = 0;
let reflUpdatesPerSec = 0;

// Dynamic reflection RT resolution ladder (per performance mode).
const reflLadderForQuality = (q: AppParams['quality']): number[] => {
  if (q === 'Low') return [256, 384];
  if (q === 'Medium') return [512];
  if (q === 'High') return [768];
  return [768, 1024];
};

let reflLadder = reflLadderForQuality(params.quality);
let reflSizeIndex = Math.max(0, reflLadder.length - 1);
let reflSizeTarget = reflLadder[reflSizeIndex];
let reflScaleCooldown_s = 0;

const reflectionHideList: THREE.Object3D[] = [ocean, ripples.mesh, wakeRibbon.mesh];

function planarSizeForQuality(q: AppParams['quality']): number {
  const ladder = reflLadderForQuality(q);
  if (ladder.length === 1) return ladder[0];
  // Pick a phone-friendly default for ladders.
  // On mobile, the extra 1024px planar RT (plus mipmaps) is often the tipping point
  // for context loss / temporary black frames.
  if (IS_MOBILE_LIKE) return ladder[0];

  const shortSide = Math.min(window.innerWidth, window.innerHeight);
  return shortSide >= 800 ? ladder[1] : ladder[0];
}

function rebuildPlanarReflection(): void {
  planarRefl?.dispose();
  planarRefl = null;

  reflLadder = reflLadderForQuality(params.quality);
  reflSizeIndex = Math.max(0, reflLadder.length - 1);
  const size = planarSizeForQuality(params.quality);
  reflSizeTarget = size;
  if (size <= 0) {
    oceanMat.bindPlanarReflection(null, null);
    oceanMat.setPlanarReflectionStrength(0);
    return;
  }

  // Mipmaps help reduce shimmer at distance (esp. horizon), but they add memory +
  // build cost. Mobile browsers are much more likely to drop WebGL contexts
  // when RT mipmaps are enabled.
  const generateMipmaps = !IS_MOBILE_LIKE && (params.quality === 'High' || params.quality === 'Max');

  planarRefl = new PlanarReflection(renderer, {
    size,
    generateMipmaps,
    // A touch of bias avoids clip-line acne right at the plane.
    clipBias: 0.0012
  });

  oceanMat.setPlanarReflectionSampling({
    texel: 1 / size,
    blur: 0,
    edgeFade: 0.02
  });

  oceanMat.bindPlanarReflection(planarRefl.renderTarget.texture, planarRefl.textureMatrix);
}

// Init planar reflections for the starting quality.
rebuildPlanarReflection();

// ---------- Audio ----------

const audio = new OceanAudio();
let audioArmed = false;
const audioHint = new OverlayHint('Tap to enable sound');
audioHint.onTap(async () => {
  if (audioArmed) return;
  await audio.enable();
  audioArmed = true;
  audioHint.hide();
  void updateAudioState();
});

function updateAudioHint(): void {
  if (!params.audioEnabled) {
    audioHint.hide();
    return;
  }
  if (!audioArmed) audioHint.show();
}
updateAudioHint();

async function updateAudioState(): Promise<void> {
  if (!audioArmed) return;
  if (!params.audioEnabled || document.hidden) {
    void audio.suspend();
    return;
  }
  void audio.resume();
}

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
  applyCanvasSize();

  // Rebuild ocean geometry + precip particles for the new quality.
  const newGeo = new THREE.PlaneGeometry(12000, 12000, segmentsForQuality(params.quality), segmentsForQuality(params.quality));
  newGeo.rotateX(-Math.PI / 2);
  (ocean.geometry as THREE.BufferGeometry).dispose();
  ocean.geometry = newGeo;

  scene.remove(precip.group);
  precip.dispose();
  precip = new PrecipitationSystem(params.quality);
  scene.add(precip.group);

  rebuildPostFX();
  rebuildPlanarReflection();

  // Recompute env update cadence for the new mode.
  envInterval_s = 0;
  skyEnvTimer = 999;

  // Persistent foam field resolution/coverage scales with quality.
  foamField.dispose();
  foamField = new FoamField(renderer, {
    size: foamRTSizeForQuality(params.quality),
    worldSize_m: foamWorldSizeForQuality(params.quality)
  });

  needsRebuild = true;
  lowFpsTimer_s = 0;
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
    updateAudioHint();
    void updateAudioState();
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
    updateAudioHint();
    void updateAudioState();
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
  applyCanvasSize();
  try {
    composer?.setSize?.(window.innerWidth, window.innerHeight);
    ssrPass?.setSize?.(window.innerWidth, window.innerHeight);
    if (underwaterPass) {
      (underwaterPass as any).uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    }
  } catch {
    // ignore
  }

  // Reflection RT size can be quality + viewport dependent.
  try {
    rebuildPlanarReflection();
  } catch {
    // ignore
  }
});

function handleContextRestored(): void {
  applyCanvasSize();

  if (envRT) {
    envRT.dispose();
    envRT = null;
  }
  scene.environment = null;
  pmrem.compileCubemapShader?.();

  rebuildPostFX();
  rebuildPlanarReflection();

  // Recreate GPU resources that rely on render targets.
  foamField.dispose();
  foamField = new FoamField(renderer, {
    size: foamRTSizeForQuality(params.quality),
    worldSize_m: foamWorldSizeForQuality(params.quality)
  });

  lastEnvCloudCover = -1;
  lastEnvSunset = -1;
  lastEnvNight = -1;
  envInterval_s = 0;
  skyEnvTimer = 999;
  reflTimer_s = 0;
  reflUpdateCount = 0;
  reflRateTimer_s = 0;

  needsRebuild = true;
  handleVisibilityChange();
}

// ---------- Cleanup ----------

window.addEventListener('beforeunload', () => {
  if (envRT) envRT.dispose();
  try { composer?.dispose?.(); } catch { /* ignore */ }
  try { composerDepthTex?.dispose?.(); } catch { /* ignore */ }
  try { ssrPass?.dispose?.(); } catch { /* ignore */ }
  try { underwaterPass?.dispose?.(); } catch { /* ignore */ }
  try { gradePass?.dispose?.(); } catch { /* ignore */ }
  pmrem.dispose();
  planarRefl?.dispose();
  foamField.dispose();
  for (const layer of cloudLayers) layer.deck.dispose();
  lightningBolts.dispose();
  rainbow.dispose();
  ripples.dispose();
  wakeRibbon.dispose();
  audioHint.dispose();
  perfOverlay.dispose();
  precip.dispose();
  splashes.dispose();
  windSpray.dispose();
  renderer.dispose();
  void audio.close();
});

// ---------- Animation loop ----------

const clock = new THREE.Clock();
let simPaused = document.hidden;
let skyEnvTimer = 999; // force first env update on first frame

// Frame time stats (for overlay + reflection scaler)
let dtEma_s = 1 / 60;
let dtAvg_s = 1 / 60;
let lowFpsTimer_s = 0;
let autoQualityCooldown_s = 0;

// Camera motion tracking (reflection temporal reuse)
const prevCamPos = new THREE.Vector3();
const prevCamQuat = new THREE.Quaternion();
let camMotion = 1;

// Env update gating
const lastEnvSunDir = new THREE.Vector3(0, 1, 0);
let envInterval_s = 0;
let envAngleDelta_deg = 0;

let lastEnvCloudCover = -1;
let lastEnvSunset = -1;
let lastEnvNight = -1;

function handleVisibilityChange(): void {
  simPaused = document.hidden;
  if (simPaused) {
    clock.stop();
  } else {
    clock.start();
    dtEma_s = 1 / 60;
    dtAvg_s = 1 / 60;
    lowFpsTimer_s = 0;
  }
  void updateAudioState();
}

document.addEventListener('visibilitychange', handleVisibilityChange);
handleVisibilityChange();

function animate(): void {
  requestAnimationFrame(animate);

  if (simPaused || contextLost) return;

  const dtRaw = clock.getDelta();
  const dt = Math.min(0.05, Math.max(0.0, dtRaw));
  simTime_s += dt;

  // Frame time stats (used for reflection scaler + HUD)
  const kEma = 1 - Math.exp(-dt / 0.25);
  dtEma_s = lerp(dtEma_s, dt, kEma);
  const kAvg = 1 - Math.exp(-dt / 1.2);
  dtAvg_s = lerp(dtAvg_s, dt, kAvg);

  // Auto downshift quality after sustained low FPS to avoid black screens.
  if (autoQualityCooldown_s > 0) autoQualityCooldown_s = Math.max(0, autoQualityCooldown_s - dt);
  if (params.quality !== 'Low') {
    const lowFpsThreshold_s = IS_MOBILE_LIKE ? (1 / 28) : (1 / 32);
    const sustain_s = IS_MOBILE_LIKE ? 4.5 : 7.0;
    if (dtAvg_s > lowFpsThreshold_s) {
      lowFpsTimer_s += dt;
    } else {
      lowFpsTimer_s = Math.max(0, lowFpsTimer_s - dt * 0.5);
    }

    if (lowFpsTimer_s >= sustain_s && autoQualityCooldown_s <= 0) {
      const nextQuality: AppParams['quality'] =
        params.quality === 'Max' ? 'High' : (params.quality === 'High' ? 'Medium' : 'Low');
      setQuality(nextQuality);
      lowFpsTimer_s = 0;
      autoQualityCooldown_s = 12.0;
    }
  } else {
    lowFpsTimer_s = 0;
  }

  // Real-time clock advance (no time scaling).
  // Before the game starts, time is *held* at the chosen start time.
  if (params.gameStarted) {
    timeOfDay_h = (timeOfDay_h + dt / 3600) % 24;
  } else {
    timeOfDay_h = params.timeOfDay_h;
    dayOfYear = params.dayOfYear;
  }

  // Weather simulation (offline heuristic)
  const wx = weatherSim.update(dt, {
    latitude_deg: params.latitude_deg,
    longitude_deg: params.longitude_deg,
    dayOfYear,
    timeOfDay_h,
    coastProximity: params.coastProximity,

    precipChance_pct: params.precipChance_pct,
    stormsIn2to4hChance_pct: params.stormsIn2to4hChance_pct,
    verticalWindShear_mps: params.verticalWindShear_mps,
    hurricaneChanceAdjust_pct: params.hurricaneChanceAdjust_pct
  });

  // Celestial bodies
  const phaseFrac = moonPhaseFraction(params.moonPhaseName);
  const cel = computeCelestials({
    latitude_deg: params.latitude_deg,
    dayOfYear,
    timeOfDay_h,
    moonPhase: phaseFrac,
    moonDistanceMultiplier: params.moonDistanceMultiplier
  });

  const sunDir = tmpV3a.set(cel.sunDir[0], cel.sunDir[1], cel.sunDir[2]).normalize();
  const moonDir = tmpV3b.set(cel.moonDir[0], cel.moonDir[1], cel.moonDir[2]).normalize();

  // Night factor (stars + bioluminescence). Fade softly.
  const night = clamp(1 - cel.sunIntensity, 0, 1);

  // Sunset factor from sun elevation (0 noon-ish, 1 near horizon / below)
  const sunset = clamp(1 - clamp((cel.sunElevation_rad + 0.04) / 0.35, 0, 1), 0, 1);

  // Compute tides (simple semi-diurnal tide)
  const tidePeriod_s = 12.42 * 3600;
  const tidePhase = (simTime_s / tidePeriod_s) * Math.PI * 2;
  const tideAmp = lerp(0.35, 1.25, clamp(params.coastProximity, 0, 1));
  const tideHeight_m = Math.sin(tidePhase) * tideAmp * cel.tideScale;

  // Update sky parameters with weather + sunset haze
  const cc = clamp(wx.cloudCover, 0, 1);

  skyUniforms['rayleigh'].value = lerp(0.65, 2.7, 1 - cc) * lerp(1.0, 0.55, sunset);
  skyUniforms['turbidity'].value = lerp(6, 16, cc) + sunset * lerp(2, 10, 1 - cc);
  skyUniforms['mieCoefficient'].value = lerp(0.004, 0.02, cc) + sunset * 0.012;
  skyUniforms['mieDirectionalG'].value = lerp(0.82, 0.92, cc) + sunset * 0.02;

  // Sun disc direction (Sky expects sunPosition)
  skyUniforms['sunPosition'].value.copy(sunDir).multiplyScalar(10000);

  // Update lights
  const sunVis = cel.sunIntensity * (1 - 0.72 * cc);

  const sunWarm = clamp(1 - clamp((cel.sunElevation_rad + 0.02) / 0.45, 0, 1), 0, 1);
  tmpSunColor.set('#ffffff').lerp(sunWarmColor, sunWarm);
  sunLight.color.copy(tmpSunColor);

  sunLight.intensity = lerp(0.0, 1.35, clamp(sunVis, 0, 1));
  sunLight.position.copy(sunDir).multiplyScalar(100);

  moonLight.intensity = lerp(0.0, 0.35, cel.moonIntensity) * (1 - 0.35 * cc);
  moonLight.position.copy(moonDir).multiplyScalar(100);

  ambient.intensity = lerp(0.25, 0.62, 1 - night) * lerp(1.0, 0.72, cc);

  // --- Lightning (visual) ---
  // WeatherSim's built-in lightning rate is conservative; for the "wicked
  // thunderstorm" scenario we want frequent flashes around the horizon.
  const storminessFx = clamp(wx.storminess * 0.85 + wx.precipIntensity * 0.65 + wx.hurricaneIntensity * 1.0, 0, 1);
  const flashLimiter = params.reduceFlashes ? 0.35 : 1.0;
  // Slightly more aggressive than before so it reads on phone screens.
  const lightningRate_hz = lerp(0.03, 0.85, Math.pow(storminessFx, 1.35)) * flashLimiter;

  // Exponential decay of any current flash.
  // A touch longer-lived so reflections + cloud glow are easier to catch.
  lightningFlash01 *= Math.exp(-dt * 10.5);

  lightningNextPulse_s -= dt;
  if (lightningBurstPulses <= 0) {
    // Start a new burst.
    if (Math.random() < lightningRate_hz * dt) {
      // Multi-pulse bursts feel more like real storms (double/triple strikes).
      lightningBurstPulses = 2 + Math.floor(Math.random() * 4);
      lightningNextPulse_s = 0;
    }
  }

  if (lightningBurstPulses > 0 && lightningNextPulse_s <= 0) {
    lightningBurstPulses -= 1;
    lightningNextPulse_s = lerp(0.05, 0.18, Math.random());
    lightningFlash01 = Math.max(lightningFlash01, lerp(0.65, 1.0, Math.random()));

    // Random direction around the camera for an "all around" feel.
    const theta = Math.random() * Math.PI * 2.0;
    // Bias closer to the horizon so it silhouettes/edges the cloud base.
    const phi = lerp(0.33 * Math.PI, 0.49 * Math.PI, Math.random());
    tmpV3c.set(Math.cos(theta) * Math.sin(phi), Math.cos(phi), Math.sin(theta) * Math.sin(phi)).normalize();

    // Cache direction for the cloud shader so lightning is localized instead of
    // brightening the whole dome.
    lightningDir.copy(tmpV3c);

    lightningLight.position.copy(camera.position).addScaledVector(tmpV3c, 220);
    lightningLight.target.position.copy(camera.position);

    const strikeCount = Math.random() < lerp(0.25, 0.6, storminessFx) ? 2 : 1;
    for (let i = 0; i < strikeCount; i++) {
      lightningBolts.spawn({
        cameraPos: camera.position,
        flashDir: lightningDir,
        storminess: storminessFx,
        waterLevel: tideHeight_m
      });
    }
  }

  lightningFlashFx = lightningFlash01 * flashLimiter;
  const lightningIntensity = lightningFlashFx * lerp(4.0, 32.0, storminessFx);
  lightningLight.intensity = lightningIntensity;
  lightningBolts.update({ dt_s: dt });

  // Sun + moon sprites
  sunSprite.position.copy(camera.position).addScaledVector(sunDir, 4800);
  const sunMat = sunSprite.material as THREE.SpriteMaterial;
  sunMat.opacity = clamp(sunVis, 0, 1);
  sunMat.color.copy(tmpSunColor);
  sunSprite.scale.setScalar(lerp(420, 560, sunset));

  moonSprite.position.copy(camera.position).addScaledVector(moonDir, 4600);
  updateMoonPhase(moonSprite.material as THREE.SpriteMaterial, phaseFrac);
  (moonSprite.material as THREE.SpriteMaterial).opacity = clamp(cel.moonIntensity, 0, 1);

  // Stars
  stars.position.copy(camera.position);
  const starStormBlock = clamp(wx.storminess * 0.85 + wx.precipIntensity * 0.95 + wx.hurricaneIntensity * 1.0, 0, 1);
  const starsTarget = clamp(night * (1 - wx.cloudCover) * (1 - starStormBlock), 0, 1);
  (stars.material as THREE.PointsMaterial).opacity = lerp((stars.material as THREE.PointsMaterial).opacity, starsTarget, clamp(dt * 0.5, 0, 1));

  // Update environment map (PMREM) opportunistically.
  // This is expensive, so we:
  // - stagger by performance mode
  // - only update if sun/sky conditions changed enough
  // - skip while underwater (surface occludes most of the sky)
  //   (use the current blended state from the previous frame)
  if (underwaterBlend < 0.02) {
    // Interval ranges by performance mode
    const envRange = (q: AppParams['quality']): [number, number] => {
      if (q === 'Low') return [6.0, 10.0];
      if (q === 'Medium') return [4.0, 4.8];
      if (q === 'High') return [2.0, 3.2];
      return [1.0, 2.0];
    };

    // If this is the first frame (or we just resurfaced), pick a fresh interval.
    if (envInterval_s <= 0.0) {
      const r = envRange(params.quality);
      envInterval_s = lerp(r[0], r[1], Math.random());
    }

    // Angle delta (sun direction)
    const dot = clamp(lastEnvSunDir.dot(sunDir), -1, 1);
    envAngleDelta_deg = (Math.acos(dot) * 180) / Math.PI;

    const angleThresh = (q: AppParams['quality']): number => {
      if (q === 'Low') return 0.65;
      if (q === 'Medium') return 0.45;
      if (q === 'High') return 0.28;
      return 0.18;
    };

    // Also respond to big cloud cover changes, even if the sun hasn't moved much.
    const cloudDelta = Math.abs(cc - (lastEnvCloudCover < 0 ? cc : lastEnvCloudCover));
    const sunsetDelta = Math.abs(sunset - (lastEnvSunset < 0 ? sunset : lastEnvSunset));
    const nightDelta = Math.abs(night - (lastEnvNight < 0 ? night : lastEnvNight));

    const cloudThresh = params.quality === 'Low' ? 0.12 : 0.08;
    const sunThresh = angleThresh(params.quality);
    const needsEnv = envAngleDelta_deg >= sunThresh || cloudDelta >= cloudThresh || sunsetDelta >= 0.06 || nightDelta >= 0.08;

    skyEnvTimer += dt;
    if (skyEnvTimer >= envInterval_s && needsEnv) {
      const next = pmrem.fromScene(sky as any);
      if (envRT) envRT.dispose();
      envRT = next;
      scene.environment = envRT.texture;

      lastEnvSunDir.copy(sunDir);
      lastEnvCloudCover = cc;
      lastEnvSunset = sunset;
      lastEnvNight = night;

      // Schedule next stagger.
      const r = envRange(params.quality);
      envInterval_s = lerp(r[0], r[1], Math.random());
      skyEnvTimer = 0;
    }
  } else {
    // Force an update soon after resurfacing.
    skyEnvTimer = envInterval_s * 0.85;
  }


  // Compute surface current from wind (Ekman-ish) + tides
  const windDirTo = (wx.windDirFrom_deg * Math.PI) / 180 + Math.PI;
  const ekman = (params.latitude_deg >= 0 ? Math.PI / 4 : -Math.PI / 4);
  const curDir = windDirTo + ekman;
  const curSpeed = clamp(wx.windSpeed_mps * 0.014, 0, 1.2) + 0.04 * Math.sin(tidePhase);
  tmpV2b.set(Math.cos(curDir) * curSpeed, Math.sin(curDir) * curSpeed);
  const currentXZ = tmpV2b;

  // Wave growth model (CEM) driven by weather-derived wind + storm geometry
  const derived = computeDerivedFromU10(wx.windSpeed_mps, wx.windDirFrom_deg);
  const oceanIn = { depth_m: params.depth_m };
  const stormIn = {
    stormRadius_km: wx.stormRadius_km,
    fetchUtilization: wx.fetchUtilization,
    stormAge_h: wx.stormAge_h,
    windRamp_h: wx.windRamp_h
  };

  const waveState = predictWaveHsTpCEM(derived, stormIn, oceanIn);

  // Smooth sea state so changes are gradual.
  const storminess = clamp(Math.max(wx.precipIntensity, wx.storminess, wx.hurricaneIntensity), 0, 1);
  // No user "variability" input anymore — we derive how quickly the sea responds from the weather itself.
  const seaResponse = clamp(storminess * 0.85 + wx.gustiness * 0.35, 0, 1);
  const tauSea = lerp(55, 16, seaResponse);
  const kSea = 1 - Math.exp(-dt / Math.max(1e-3, tauSea));

  // "Superstorm" boost: make violent weather immediately feel like violent
  // weather. (The physics model already increases Hs with U10, but we want the
  // dramatic, colliding cross-sea look the app is going for.)
  const dramatic = clamp(storminess * 0.95 + wx.hurricaneIntensity * 0.6 + wx.gustiness * 0.35, 0, 1);
  const HsTarget = clamp(waveState.Hs_m * lerp(1.0, 2.25, Math.pow(dramatic, 1.45)), 0.4, 24.0);
  const TpTarget = clamp(waveState.Tp_s * lerp(1.0, 1.32, Math.pow(dramatic, 1.25)), 3.5, 22.0);

  seaHs_m = lerp(seaHs_m, HsTarget, kSea);
  seaTp_s = lerp(seaTp_s, TpTarget, kSea);
  windDirTo_rad = lerpAngleRad(windDirTo_rad, derived.windDirTo_rad, clamp(dt * 0.35, 0, 1));

  // Swell direction changes much more slowly than local wind direction.
  const tauSwellDir = lerp(320, 180, seaResponse);
  const kSwellDir = 1 - Math.exp(-dt / Math.max(1e-3, tauSwellDir));
  swellDirTo_rad = lerpAngleRad(swellDirTo_rad, windDirTo_rad, kSwellDir);

  // Wave field "randomness" is now internal noise (not a user control).
  const waveChaos = clamp(0.28 + 0.65 * wx.gustiness + 0.65 * storminess, 0, 1);
  const directionalSpread = clamp(lerp(0.25, 1.0, waveChaos) + storminess * 0.12, 0, 1);
  const crossSea01 = clamp((directionalSpread - 0.55) / 0.45, 0, 1);
  const wind01 = clamp(wx.windSpeed_mps / 18, 0, 1);
  // Slightly higher chop ceiling for the "superstorm" look.
  const choppiness = clamp(0.95 + 1.05 * waveChaos + 0.55 * wind01, 0.65, 2.6);

  // How much of the variance is treated as long swell vs wind sea.
  // Calm: more swell; storm: more wind-sea.
  const swellVar = clamp(0.55 - 0.45 * storminess - 0.25 * wind01, 0.15, 0.65);

  // Rebuild / retarget the spectral wave components (targets), then smoothly chase.
  if (needsRebuild || wavesTarget.length === 0) {
    const waveCount = waveCountForQuality(params.quality);
    wavesTarget = buildWaveComponents({
      Hs_m: seaHs_m,
      Tp_s: seaTp_s,
      depth_m: params.depth_m,
      windDirTo_rad: windDirTo_rad,
      swellDirTo_rad: swellDirTo_rad,
      swellVariance: swellVar,
      waveCount,
      directionalSpread,
      gamma: lerp(1.6, 4.2, clamp(wx.storminess + wx.hurricaneIntensity, 0, 1)),
      choppiness,
      seed: 1337
    });

    // Initialize current if needed
    if (wavesCurrent.length !== wavesTarget.length) {
      wavesCurrent = wavesTarget.map((w) => ({ ...w }));
    }
    needsRebuild = false;
  } else {
    // Update target spectrum occasionally to incorporate slow shifts in Tp/Hs/dir without popping
    if (simTime_s % 2.0 < dt) {
      wavesTarget = buildWaveComponents({
        Hs_m: seaHs_m,
        Tp_s: seaTp_s,
        depth_m: params.depth_m,
        windDirTo_rad: windDirTo_rad,
        swellDirTo_rad: swellDirTo_rad,
        swellVariance: swellVar,
        waveCount: wavesTarget.length,
        directionalSpread,
        gamma: lerp(1.6, 4.2, clamp(wx.storminess + wx.hurricaneIntensity, 0, 1)),
        choppiness,
        seed: 1337
      });
    }
  }

  // Smooth-chase wave parameters (so slider changes don't "fast-forward" the ocean)
  const chase = clamp(dt * 0.85, 0, 1);
  for (let i = 0; i < wavesCurrent.length; i++) {
    const c = wavesCurrent[i];
    const tW = wavesTarget[i];
    c.dirX = lerp(c.dirX, tW.dirX, chase);
    c.dirZ = lerp(c.dirZ, tW.dirZ, chase);
    c.A = lerp(c.A, tW.A, chase);
    c.k = lerp(c.k, tW.k, chase);
    c.omega = lerp(c.omega, tW.omega, chase);
    c.phase = tW.phase; // fixed
    c.Q = lerp(c.Q, tW.Q, chase);
  }
  oceanMat.writeWaves(wavesCurrent);

  // Follow camera to create "infinite" ocean.
  ocean.position.set(camera.position.x, 0, camera.position.z);

  // Update ocean shading
  // User clarity input is a percent; weather can temporarily reduce it (turbidity/foam).
  const clarityBase = clamp(params.clarity_pct / 100, 0, 1);
  const clarity = clamp(
    clarityBase
      * (1 - 0.22 * storminess - 0.15 * wx.precipIntensity)
      * lerp(1.0, 0.78, clamp(params.coastProximity, 0, 1)),
    0,
    1
  );
  // Water color shifts toward green when turbid / nearshore
  const near = clamp(params.coastProximity, 0, 1);
  tmpWaterCol.copy(colGreen).lerp(colDeep, clarity).lerp(colNearMix, 1 - near * 0.4);
  oceanMat.material.color.copy(tmpWaterCol);

  // Foam is driven by sea state; no direct foam controls.
  const foamBoost = clamp(waveChaos * 0.75 + clamp(seaHs_m / 5.0, 0, 1) * 0.35, 0, 1);
  const foamIntensity = lerp(0.55, 2.15, foamBoost);
  const foamSlopeStart = lerp(0.24, 0.11, foamBoost);
  const foamSlopeEnd = lerp(0.68, 0.38, foamBoost);

  // Milestone #3: wind-driven micro normal detail (ripples/capillary). Tuned to be
  // strong near-camera and fade out to prevent distant shimmer.
  tmpWindXZ.set(Math.cos(windDirTo_rad) * wx.windSpeed_mps, Math.sin(windDirTo_rad) * wx.windSpeed_mps);
  const qMicro = params.quality === 'Max' ? 1.0 : params.quality === 'High' ? 0.85 : params.quality === 'Medium' ? 0.65 : 0.45;
  const microStrength = (0.04 + 0.08 * wind01) * qMicro * (1.0 - 0.35 * storminess);
  const microFadeNear = params.quality === 'Low' ? 35 : params.quality === 'Medium' ? 55 : params.quality === 'High' ? 70 : 80;
  const microFadeFar = params.quality === 'Low' ? 170 : params.quality === 'Medium' ? 250 : params.quality === 'High' ? 320 : 400;

  oceanMat.update(dt, {
    time_s: simTime_s,
    originXZ: tmpV2a.set(ocean.position.x, ocean.position.z),
    currentXZ,
    tideHeight_m,
    waterClarity: clarity,
    foamIntensity,
    foamSlopeStart,
    foamSlopeEnd,

    windXZ: tmpWindXZ,
    microStrength,
    microFadeNear_m: microFadeNear,
    microFadeFar_m: microFadeFar,

    sunDir,
    sunColor: sunLight.color,
    sunIntensity: sunVis
  });

  // Otter update
  const otterosity = clamp(params.otterosity_pct / 100, 0, 1);
  const interestDir = sunVis > 0.15 ? sunDir : (cel.moonIntensity > 0.18 ? moonDir : undefined);
  otter.update(
    {
      otterosity,
      storminess: clamp(wx.precipIntensity + wx.storminess * 0.7 + wx.hurricaneIntensity, 0, 1),
      waveChaos,
      windDirTo_rad,
      interestDir
    },
    {
      dt_s: dt,
      time_s: simTime_s,
      waves: wavesCurrent,
      currentXZ,
      tideHeight_m
    }
  );

  // Otter speed estimate (for wake foam)
  tmpOtterXZ.set(otter.position.x, otter.position.z);
  if (dt > 1e-6) {
    const dx = tmpOtterXZ.x - otterPrevXZ.x;
    const dz = tmpOtterXZ.y - otterPrevXZ.y;
    otterSpeed_mps = Math.sqrt(dx * dx + dz * dz) / dt;
  } else {
    otterSpeed_mps = 0;
  }
  otterPrevXZ.copy(tmpOtterXZ);
  tmpOtterDirXZ.set(otter.bodyForward.x, otter.bodyForward.z);

  // Surface sample at otter for camera + splashes
  const surf = sampleGerstner(
    wavesCurrent,
    tmpV2a.set(otter.position.x, otter.position.z),
    simTime_s,
    currentXZ,
    tideHeight_m,
    tmpSurfSample,
    tmpSurfT,
    tmpSurfB
  );
  const headPos = otter.getHeadWorldPosition(tmpV3c);
  const eyePos = otter.getEyeWorldPosition(tmpV3d);

  // Otter orb: attach just above the head and light the nearby water.
  otterOrbMesh.position.copy(headPos);
  otterOrbMesh.position.y += 0.32;
  otterOrbLight.position.copy(otterOrbMesh.position);
  const orbMood = clamp(0.35 + 0.65 * night + 0.45 * clamp(wx.storminess + wx.hurricaneIntensity, 0, 1), 0, 1);
  otterOrbLight.intensity = lerp(2.5, 10.0, orbMood);
  (otterOrbMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = lerp(2.5, 4.2, orbMood);

  // Camera rig
  camRig.update(camera, {
    dt_s: dt,
    gazeDir: otter.gazeDir,
    bodyForward: otter.bodyForward,
    headPos,
    eyePos,
    surfaceHeight_m: surf.height_m,
    underwater: otter.isUnderwaterView(),
    storminess: clamp(wx.precipIntensity + wx.storminess + wx.hurricaneIntensity, 0, 1),
    followDistance_m: params.cameraDistance_m,
    followElevation_m: params.cameraElevation_m
  });

  // Ensure the camera matrices reflect the rig update before any screen-space projections
  // (sun shafts) or depth reconstruction.
  camera.updateMatrixWorld();

  // Keep the sky dome centered on the camera.
  // If the camera drifts away from the sky's origin, the sky can end up "in front"
  // of other sky-layers (clouds) or even leave the camera outside the dome, which
  // reads as random black screens.
  sky.position.copy(camera.position);

  // Camera-following fill light so the otter stays visible (especially with clouds/rain).
  camera.getWorldDirection(tmpV3e);
  otterFillLight.position.copy(camera.position).addScaledVector(tmpV3e, -2.0);
  otterFillLight.position.y += 3.0;
  otterFillLight.target.position.copy(headPos);
  otterFillLight.color.copy(tmpSunColor).lerp(otterFillNightColor, night);
  otterFillLight.intensity = lerp(0.12, 0.40, night) * (0.85 + 0.40 * cc);

  // Otter surface ripples (calm water interaction)
  const calmness = clamp(1 - (wx.storminess * 0.75 + wx.hurricaneIntensity + wx.precipIntensity * 0.60 + waveChaos * 0.25), 0, 1);
  const sunsetNow = clamp(1 - clamp((cel.sunElevation_rad + 0.04) / 0.35, 0, 1), 0, 1);
  ripples.update({
    dt_s: dt,
    time_s: simTime_s,
    center: otter.position,
    surfaceY: surf.height_m,
    calmness,
    sunIntensity: sunVis,
    sunset: sunsetNow
  });

  // Trailing wake ribbon (world-space decal) — cheap extra motion cue.
  wakeRibbon.update({
    dt_s: dt,
    time_s: simTime_s,
    centerXZ: tmpOtterXZ,
    forwardXZ: tmpOtterDirXZ,
    surfaceY_m: surf.height_m,
    speed_mps: otterSpeed_mps,
    paddleImpulse01: (otter as any).paddleImpulse01 ?? 0,
    calm01: calmness
  });

  // Underwater visuals should be driven by the *camera* actually being below
  // the local water surface. (The otter can look down without forcing an
  // underwater camera.)
  const underwater = camera.position.y < (surf.height_m - 0.08);

  // Smooth transition so the underwater optics don't "snap".
  underwaterBlend = lerp(underwaterBlend, underwater ? 1 : 0, clamp(dt * 3.0, 0, 1));

  // Always keep a non-black underwater background (even if post FX is disabled).
  // This prevents the "random black screen" feeling if the camera ever dips below
  // the surface on a device that can't run the full underwater post.
  underwaterDome.visible = underwaterBlend > 0.02;
  if (underwaterDome.visible) {
    underwaterDome.position.copy(camera.position);
    (underwaterDome.material as THREE.MeshBasicMaterial).color.copy(fogUnder.color);
  }

  // SSR is not physically meaningful underwater; disable it while submerged.
  if (ssrPass) ssrPass.enabled = underwaterBlend < 0.02;

  // Update underwater post uniforms (milestone #4).
  if (underwaterPass) {
    (underwaterPass as any).enabled = underwaterBlend > 0.001;

    // Project a point far along the sun direction to screen UV for shafts.
    tmpSunWorldPos.copy(camera.position).addScaledVector(sunDir, 12000);
    tmpSunNDC.copy(tmpSunWorldPos).project(camera);
    const sunUvX = tmpSunNDC.x * 0.5 + 0.5;
    const sunUvY = tmpSunNDC.y * 0.5 + 0.5;
    const sunInView = (tmpSunNDC.z > -1.0 && tmpSunNDC.z < 1.0 && sunUvX > -0.15 && sunUvX < 1.15 && sunUvY > -0.15 && sunUvY < 1.15) ? 1.0 : 0.0;

    (underwaterPass as any).uniforms.u_time.value = simTime_s;
    (underwaterPass as any).uniforms.u_underwater.value = underwaterBlend;
    (underwaterPass as any).uniforms.u_clarity.value = clarity;
    (underwaterPass as any).uniforms.u_waterLevel.value = tideHeight_m;
    (underwaterPass as any).uniforms.u_sunUv.value.set(sunUvX, sunUvY);
    (underwaterPass as any).uniforms.u_sunInView.value = sunInView;
    (underwaterPass as any).uniforms.u_sunIntensity.value = sunVis;
    (underwaterPass as any).uniforms.u_sunColor.value.copy(sunLight.color);
    (underwaterPass as any).uniforms.u_invProj.value.copy(camera.projectionMatrixInverse);
    (underwaterPass as any).uniforms.u_invView.value.copy(camera.matrixWorld);
  }

  // Persistent foam field update (milestone #2): advected, decaying, injected foam.
  // Center the simulation around the otter so wake foam stays where the action is.
  const paddleImpulse01 = (otter as any).paddleImpulse01 ?? 0;
  const wakeStrength = clamp(
    clamp(otterSpeed_mps / 0.25, 0, 1) * (0.15 + 0.35 * calmness) + paddleImpulse01 * (0.18 + 0.22 * calmness),
    0,
    1
  );
  foamField.update(renderer, {
    dt_s: dt,
    time_s: simTime_s,
    centerXZ: tmpOtterXZ,
    waves: wavesCurrent,
    currentXZ,
    windDirTo_rad: windDirTo_rad,
    windSpeed_mps: wx.windSpeed_mps,
    storminess,
    wakePosXZ: tmpOtterXZ,
    wakeDirXZ: tmpOtterDirXZ,
    wakeStrength
  });
  oceanMat.bindFoamMap(foamField.texture);
  oceanMat.setFoamFieldTransform(foamField.centerXZ, foamField.worldSize_m);

  // Horizon islands (match reference sunset silhouettes)
  islands.update(camera.position, otter.bodyForward, tideHeight_m);

  // Fog / exposure
  if (underwater) {
    // Underwater: denser fog when clarity is low.
    fogUnder.color.set('#053044');
    fogUnder.density = lerp(0.055, 0.018, clarity);
    scene.fog = fogUnder;

    renderer.toneMappingExposure = lerp(renderer.toneMappingExposure, 1.0, clamp(dt * 2.0, 0, 1));
    stars.visible = false;
    sunSprite.visible = false;
    moonSprite.visible = false;

    // You shouldn't see the sky/cloud deck/horizon effects from underwater.
    sky.visible = false;
    for (const layer of cloudLayers) layer.deck.mesh.visible = false;
    islands.group.visible = false;
    rainbow.mesh.visible = false;
    splashes.points.visible = false;
    lightningBolts.group.visible = false;
    windSpray.points.visible = false;
  } else {
    // Above water: subtle atmospheric haze (sunset-friendly).
    const sunset = clamp(1 - clamp((cel.sunElevation_rad + 0.04) / 0.35, 0, 1), 0, 1);
    const hazeStorm = clamp(wx.cloudCover * 0.55 + wx.precipIntensity * 0.85 + wx.storminess * 0.90 + wx.hurricaneIntensity * 1.0, 0, 1);

    // Tie haze density to the weather's visibility proxy so storms feel genuinely "thick",
    // while keeping densities in a phone-friendly, sunset-pretty range.
    const vis01 = clamp(1 - (clamp(wx.visibility_km, 1, 80) / 80), 0, 1);

    tmpHazeCol
      .copy(hazeBaseCol)
      .lerp(hazeSunsetCol, sunset * 0.72)
      .lerp(sunLight.color, sunset * 0.18)
      .lerp(hazeStormCol, hazeStorm * 0.65)
      .lerp(hazeNightCol, night * 0.70);


    fogAbove.color.copy(tmpHazeCol);
    const densVis = lerp(0.00003, 0.00018, vis01);
    const densBoost = lerp(0.95, 1.35, clamp(hazeStorm * 0.85 + sunset * 0.55, 0, 1));
    const densTarget = clamp(densVis * densBoost, 0.00002, 0.00024);
    fogAbove.density = lerp(fogAbove.density, densTarget, clamp(dt * 1.4, 0, 1));
    scene.fog = fogAbove;

    // Exposure adapts: slightly brighter at sunset, dimmer at deep night.
    // Lightning adds a brief, punchy flash on top.
    const expTarget = clamp(lerp(1.08, 1.18, sunset) * lerp(1.0, 0.90, night) + lightningFlashFx * 0.55, 0.55, 1.85);
    renderer.toneMappingExposure = lerp(renderer.toneMappingExposure, expTarget, clamp(dt * 2.5, 0, 1));

    stars.visible = true;
    sunSprite.visible = true;
    moonSprite.visible = true;

    sky.visible = true;
    for (const layer of cloudLayers) layer.deck.mesh.visible = true;
    islands.group.visible = true;
    rainbow.mesh.visible = true;
    splashes.points.visible = true;
    lightningBolts.group.visible = true;
    windSpray.points.visible = true;
  }

  // Life system
  currentBiome = biomeFor(params.latitude_deg, wx.waterTemp_C);
  life.setParams({ biome: currentBiome, coastProximity: params.coastProximity, exoticEncounters: params.exoticEncounters_pct / 100 });
  life.update({
    dt_s: dt,
    time_s: simTime_s,
    otterPos: otter.position,
    surfaceY: tideHeight_m,
    nightFactor: night,
    storminess: clamp(wx.precipIntensity + wx.storminess + wx.hurricaneIntensity, 0, 1)
  });

  // Clouds
  const cloudRank = QUALITY_RANK[params.quality];
  for (const layer of cloudLayers) {
    const enabled = cloudRank >= QUALITY_RANK[layer.minQuality];
    layer.deck.mesh.visible = enabled && !underwater;
    if (!enabled || underwater) continue;
    layer.deck.update({
      dt_s: dt,
      time_s: simTime_s,
      center: camera.position,
      cloudCover: wx.cloudCover,
      windDirFrom_deg: wx.windDirFrom_deg,
      windSpeed_mps: wx.windSpeed_mps,
      sunDir,
      sunColor: sunLight.color,
      sunIntensity: sunVis,
      nightFactor: night,
      lightningFlash01: lightningFlashFx,
      lightningDir,
      storminess: wx.storminess,
      hurricaneIntensity: wx.hurricaneIntensity,
      precipIntensity: wx.precipIntensity,
      quality: params.quality
    });
  }

  // Precipitation
  precip.update({
    dt_s: dt,
    time_s: simTime_s,
    cameraPos: camera.position,
    windDirFrom_deg: wx.windDirFrom_deg,
    intensity: wx.precipIntensity,
    mode: wx.precipType === 'Snow' ? 'Snow' : (wx.precipType === 'Rain' ? 'Rain' : 'None'),
    visible: !underwater
  });

  // Rainbow
  rainbow.update({
    dt_s: dt,
    center: camera.position,
    sunDir,
    sunElevation_rad: cel.sunElevation_rad,
    precipIntensity: wx.precipIntensity,
    cloudCover: wx.cloudCover
  });

  // Splashes (wave collisions / spray near otter)
  splashes.update({
    dt_s: dt,
    origin: otter.position,
    surfaceY: surf.height_m,
    slope: surf.slope,
    intensity: clamp(
      (
        clamp(wx.windSpeed_mps / 20, 0, 1) * (0.25 + 0.75 * clamp(wx.storminess + wx.hurricaneIntensity, 0, 1)) * (1.0 + 0.90 * crossSea01)
        + paddleImpulse01 * (0.20 + 0.25 * calmness)
        + otter.wetness01 * 0.25
      ),
      0,
      1
    ),
    windDirTo_rad: derived.windDirTo_rad,
    sprayBias01: clamp(otter.wetness01 * 0.7 + storminess * 0.25 + clamp(wx.windSpeed_mps / 30, 0, 1) * 0.2, 0, 1)
  });

  // Wind-driven spray streaks (sporadic gusts across the surface).
  windSpray.update({
    dt_s: dt,
    time_s: simTime_s,
    center: camera.position,
    surfaceY: surf.height_m,
    windDirTo_rad: windDirTo_rad,
    windSpeed_mps: wx.windSpeed_mps,
    gustiness: wx.gustiness,
    storminess,
    visible: !underwater
  });

  // Audio
  const audioActive = params.audioEnabled && audioArmed && !document.hidden;
  if (audioActive) {
    audio.setMasterVolume(params.masterVolume);
    audio.update(dt, { U10: wx.windSpeed_mps, Hs: seaHs_m, rain: wx.precipIntensity });
  } else if (audioArmed) {
    audio.setMasterVolume(0);
  }

  // Readouts
  params.derived_state = wx.stateName;
  params.derived_airTemp_C = Math.round(wx.airTemp_C * 10) / 10;
  params.derived_waterTemp_C = Math.round(wx.waterTemp_C * 10) / 10;
  params.derived_cloudCover = Math.round(wx.cloudCover * 100) / 100;
  params.derived_visibility_km = Math.round(wx.visibility_km * 10) / 10;
  params.derived_windSpeed_mps = Math.round(wx.windSpeed_mps * 10) / 10;
  params.derived_windDirFrom_deg = Math.round(wx.windDirFrom_deg);
  params.derived_precip = wx.precipType === 'None' ? 'None' : `${wx.precipType} (${Math.round(wx.precipIntensity * 100)}%)`;
  params.derived_Hs_m = Math.round(seaHs_m * 100) / 100;
  params.derived_Tp_s = Math.round(seaTp_s * 100) / 100;
  params.derived_tideScale = Math.round(cel.tideScale * 1000) / 1000;

  // Clock + forecast-ish readouts
  const hh = Math.floor(timeOfDay_h);
  const mm = Math.floor((timeOfDay_h - hh) * 60);
  params.derived_clock = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  if (wx.stormEta_h < 0) {
    params.derived_stormETA = '—';
  } else if (wx.stormEta_h >= 1.0) {
    params.derived_stormETA = `in ${Math.round(wx.stormEta_h * 10) / 10}h`;
  } else {
    params.derived_stormETA = `in ${Math.max(1, Math.round(wx.stormEta_h * 60))}m`;
  }
  params.derived_stormChanceEff_pct = wx.stormChanceEffective_pct;
  params.derived_hurricaneChanceEff_pct = wx.hurricaneChanceEffective_pct;

  // Post grade uniforms (sunset look + subtle film grain)
  if (gradePass) {
    const sunsetGrade = clamp(1 - clamp((cel.sunElevation_rad + 0.04) / 0.35, 0, 1), 0, 1);
    // Underwater optics handle most of the color shift; avoid "double warming".
    const warm = sunsetGrade * (1 - night * 0.55) * (1.0 - underwaterBlend);
    const gradeScale = params.reduceFlashes ? 0.65 : 1.0;
    const grainScale = params.reduceFlashes ? 0.4 : 1.0;
    const contrastScale = params.reduceFlashes ? 0.96 : 1.0;

    (gradePass as any).uniforms.u_time.value = simTime_s;
    (gradePass as any).uniforms.u_warmth.value = 0.22 * warm * gradeScale;

    // Slightly stronger grain on lower tiers (helps hide aliasing/banding on mobile).
    const baseGrain = params.quality === 'Max' ? 0.030 : (params.quality === 'High' ? 0.032 : 0.034);
    (gradePass as any).uniforms.u_grain.value = baseGrain * grainScale;
    (gradePass as any).uniforms.u_vignette.value = lerp(0.22, 0.12, underwaterBlend) * gradeScale;
    (gradePass as any).uniforms.u_saturation.value = lerp(1.04, 1.13, sunsetGrade) * lerp(1.0, 0.88, underwaterBlend) * contrastScale;
    (gradePass as any).uniforms.u_contrast.value = lerp(1.03, 1.08, sunsetGrade) * lerp(1.0, 0.92, underwaterBlend) * contrastScale;
  }

  // Planar reflection update (rendered right before the main frame so it matches
  // the latest cloud/otter/particle updates).
  if (planarRefl && !underwater) {
    // Dynamic reflection RT scaling (only when ladders exist).
    reflScaleCooldown_s = Math.max(0, reflScaleCooldown_s - dt);
    if (reflScaleCooldown_s <= 0 && reflLadder.length > 1) {
      const dtMs = dtEma_s * 1000;
      const wantsDown = dtMs > 23.5; // ~42fps
      const wantsUp = dtMs < 17.0;   // ~59fps

      if (wantsDown && reflSizeIndex > 0) {
        reflSizeIndex--;
        reflScaleCooldown_s = 1.25;
      } else if (wantsUp && reflSizeIndex < reflLadder.length - 1) {
        reflSizeIndex++;
        reflScaleCooldown_s = 2.0;
      }

      const desired = reflLadder[reflSizeIndex];
      if (desired !== reflSizeTarget) {
        reflSizeTarget = desired;
        // PlanarReflection.setSize expects a single (square) dimension.
        planarRefl.setSize(reflSizeTarget);
      }
    }

    // Camera motion heuristic: when the camera is nearly still, reuse the previous
    // reflection for a few frames (big perf win on mobile).
    const move = camera.position.distanceTo(prevCamPos);
    const qdot = Math.abs(prevCamQuat.dot(camera.quaternion));
    const rot = 2 * Math.acos(clamp(qdot, 0, 1));
    prevCamPos.copy(camera.position);
    prevCamQuat.copy(camera.quaternion);

    // Combine into a single scalar (units are arbitrary; just for thresholds).
    camMotion = move * 45 + rot * 18;
    const slow = camMotion < 0.75;

    const slowInterval = (q: AppParams['quality']): number => {
      if (q === 'Low') return 0.25;
      if (q === 'Medium') return 0.18;
      if (q === 'High') return 0.12;
      return 0.085;
    };
    const moveInterval = (q: AppParams['quality']): number => {
      if (q === 'Low') return 0.11;
      if (q === 'Medium') return 0.065;
      if (q === 'High') return 0.0;
      return 0.0;
    };

    // During a lightning flash we *must* refresh the planar RT every frame or
    // you'll miss the bright cloud reflection entirely.
    const lightningRefl = lightningFlashFx > 0.05;
    const interval = lightningRefl ? 0.0 : (slow ? slowInterval(params.quality) : moveInterval(params.quality));
    reflTimer_s += dt;
    if (reflTimer_s >= interval) {
      planarRefl.update(renderer, scene, camera, tideHeight_m, reflectionHideList);
      reflTimer_s = 0;
      reflUpdateCount++;
    }

    reflRateTimer_s += dt;
    if (reflRateTimer_s >= 1.0) {
      reflUpdatesPerSec = reflUpdateCount / reflRateTimer_s;
      reflUpdateCount = 0;
      reflRateTimer_s = 0;
    }

    // Roughness-aware reflection sampling controls.
    const baseStrength = (params.quality === 'Max') ? 1.0 : (params.quality === 'High' ? 0.95 : 0.90);
    const roughSea = clamp(foamBoost * 0.80 + storminess * 0.60, 0, 1);
    // Stormy seas are rough so we generally reduce coherent mirror reflection…
    // …but lightning is *so* bright that you still get a strong spec/reflection read.
    const lightningBoost = clamp(lightningFlashFx * (0.35 + 0.65 * storminess), 0, 0.85);
    const strength = baseStrength * lerp(1.0, 0.62, roughSea) + lightningBoost;
    oceanMat.setPlanarReflectionStrength(strength);

    const blurMax = (params.quality === 'Max') ? 2.2 : (params.quality === 'High' ? 1.25 : 0.0);
    const blur = blurMax * roughSea;
    oceanMat.setPlanarReflectionSampling({
      texel: 1 / Math.max(1, reflSizeTarget),
      blur,
      edgeFade: 0.03
    });
  } else {
    oceanMat.setPlanarReflectionStrength(0.0);
  }

  // Perf HUD (cheap, throttled)
  perfOverlay.update(dt, {
    dt_ms: dt * 1000,
    dtEma_ms: dtEma_s * 1000,
    dtAvg_ms: dtAvg_s * 1000,
    fpsEma: 1 / Math.max(1e-6, dtEma_s),
    quality: params.quality,
    reflectionRT_px: planarRefl ? planarRefl.renderTarget.width : 0,
    reflectionUpdatesPerSec: reflUpdatesPerSec,
    envInterval_s,
    envAngleDelta_deg
  });

  if (composer) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}

animate();

// ---------- Helpers ----------

function makeStars(count: number): THREE.Points {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 4500 + Math.random() * 2500;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.cos(phi);
    const z = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 0] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color: new THREE.Color('#ffffff'),
    size: 1.2,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.0,
    depthWrite: false
  });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  return pts;
}

function makeSunSprite(): THREE.Sprite {
  const tex = makeRadialTexture('#fff7cf');
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 1.0, depthWrite: false, blending: THREE.AdditiveBlending });
  const s = new THREE.Sprite(mat);
  s.scale.setScalar(450);
  return s;
}

function makeMoonSprite(phaseFrac: number): THREE.Sprite {
  const tex = makeMoonTexture(phaseFrac);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 1.0, depthWrite: false });
  const s = new THREE.Sprite(mat);
  s.scale.setScalar(220);
  return s;
}

function updateMoonPhase(mat: THREE.SpriteMaterial, phaseFrac: number): void {
  // Rebuild texture only if phase changed enough.
  const key = Math.round(phaseFrac * 1000) / 1000;
  const prev = (mat as any).__phaseKey as number | undefined;
  if (prev !== key) {
    mat.map?.dispose();
    mat.map = makeMoonTexture(phaseFrac);
    mat.needsUpdate = true;
    (mat as any).__phaseKey = key;
  }
}

function makeRadialTexture(color: string): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(128, 128, 5, 128, 128, 128);
  g.addColorStop(0, color);
  g.addColorStop(0.15, color);
  g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

function makeMoonTexture(phaseFrac: number): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 256, 256);

  // Base disk
  ctx.beginPath();
  ctx.arc(128, 128, 112, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#d9d9d9';
  ctx.fill();

  // Crater-ish noise
  ctx.globalAlpha = 0.10;
  for (let i = 0; i < 180; i++) {
    const r = 1 + Math.random() * 8;
    const x = 128 + (Math.random() * 2 - 1) * 86;
    const y = 128 + (Math.random() * 2 - 1) * 86;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = Math.random() < 0.5 ? '#bdbdbd' : '#efefef';
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  // Phase mask: 0=new, 0.5=full.
  // Draw shadow as a circle offset on x.
  const p = ((phaseFrac % 1) + 1) % 1;
  const illum = Math.cos((p - 0.5) * Math.PI * 2) * 0.5 + 0.5; // 0..1
  const terminator = (p < 0.5) ? lerp(1.0, -1.0, p / 0.5) : lerp(-1.0, 1.0, (p - 0.5) / 0.5);
  const offset = terminator * 90;

  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(128, 128, 112, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

  // Shadow
  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = `rgba(0,0,0,${lerp(0.98, 0.0, illum)})`;
  ctx.beginPath();
  ctx.arc(128 + offset, 128, 112, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Soft limb darkening highlight
  const g = ctx.createRadialGradient(108, 108, 10, 128, 128, 120);
  g.addColorStop(0, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(128, 128, 112, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

function lerpAngleRad(a: number, b: number, t: number): number {
  const da = ((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  return a + da * t;
}

function installRuntimeErrorOverlay(
  canvas: HTMLCanvasElement,
  onContextLost?: () => void,
  onContextRestored?: () => void
): void {
  const el = document.createElement('div');
  Object.assign(el.style, {
    position: 'fixed',
    left: '10px',
    top: '10px',
    maxWidth: 'calc(100% - 20px)',
    maxHeight: '45vh',
    overflow: 'auto',
    padding: '10px 12px',
    background: 'rgba(0,0,0,0.70)',
    color: 'rgba(255,255,255,0.95)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: '10px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: '12px',
    lineHeight: '1.35',
    zIndex: '9999',
    whiteSpace: 'pre-wrap',
    display: 'none'
  } as Partial<CSSStyleDeclaration>);
  document.body.appendChild(el);

  let shown = false;
  const show = (title: string, detail: unknown) => {
    if (shown) return;
    shown = true;
    const msg = typeof detail === 'string' ? detail : (detail instanceof Error ? (detail.stack ?? detail.message) : JSON.stringify(detail));
    el.textContent = `${title}\n\n${msg}\n\nTip: If this says WebGL context lost, lower quality (Performance → quality) or reload.`;
    el.style.display = 'block';
  };

  window.addEventListener('error', (e) => {
    show('Runtime error', (e as ErrorEvent).error ?? (e as ErrorEvent).message);
  });

  window.addEventListener('unhandledrejection', (e) => {
    show('Unhandled promise rejection', (e as PromiseRejectionEvent).reason);
  });

  // If the GPU driver bails out (common on aggressive mobile settings), surface it clearly.
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    show('WebGL context lost', 'Your browser/GPU driver stopped the WebGL context. Try lowering quality or reloading.');
    onContextLost?.();
  }, { passive: false });

  canvas.addEventListener('webglcontextrestored', () => {
    shown = false;
    el.style.display = 'none';
    onContextRestored?.();
  }, { passive: true });
}
