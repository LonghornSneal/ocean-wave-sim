import * as THREE from 'three';
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import type { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import type { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass.js';
import type { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import type { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import type { Sky } from 'three/examples/jsm/objects/Sky.js';
import type { WaveComponent } from '../lib/spectrum';
import type { AppParams } from '../lib/ui';
import type { OceanMaterial } from '../lib/oceanMaterial';
import type { FoamField } from '../lib/foamField';
import type { WeatherSim } from '../lib/weather';
import type { SeaOtter } from '../lib/otter';
import type { OtterCameraRig } from '../lib/otterCamera';
import type { OceanLife } from '../lib/life';
import type { PrecipitationSystem } from '../lib/precip';
import type { CloudDeck } from '../lib/clouds';
import type { LightningBolts } from '../lib/lightningBolts';
import type { HorizonIslands } from '../lib/islands';
import type { RainbowArc } from '../lib/rainbow';
import type { SplashSystem } from '../lib/splashes';
import type { WindSpray } from '../lib/windSpray';
import type { OtterRipples } from '../lib/ripples';
import type { WakeRibbon } from '../lib/wakeRibbon';
import type { OtterWaterline } from '../lib/otterWaterline';
import type { PerfOverlay } from '../lib/perfOverlay';
import type { OverlayWarning } from '../lib/overlay';
import { clamp, degToRad, lerp, smoothstep } from '../lib/math';
import { computeCelestials } from '../lib/celestial';
import {
  applyRogueToWaves,
  beaufortFromMps,
  beaufortToMps,
  buildSeicheComponents,
  buildTideComponent,
  computeDerivedFromU10,
  computeTide,
  predictWaveHsTpCEM,
  pulseWindow01,
  swellStateFromWindSpeed
} from '../lib/wavePhysics';
import type { RogueWaveScheduler, SeismicPulseState } from '../lib/wavePhysics';
import { buildWaveComponents, waveHasAnyTag } from '../lib/spectrum';
import { biomeFor } from '../lib/life';
import { sampleGerstner } from '../lib/waveSample';
import { moonPhaseFraction } from '../lib/ui';
import type { PlanarReflectionController } from './planarReflection';
import type { AudioController } from './audioController';
import { updateMoonPhase } from './skyHelpers';
import { IS_MOBILE_LIKE } from './quality';
import { oceanLodForQuality } from './oceanSetup';

type PostFXState = {
  composer: EffectComposer | null;
  ssrPass: SSRPass | null;
  heightFogPass: ShaderPass | null;
  underwaterPass: ShaderPass | null;
  bloomPass: UnrealBloomPass | null;
  grainPass: ShaderPass | null;
  gradePass: ShaderPass | null;
  outputPass: OutputPass | null;
};

export type LoopState = {
  params: AppParams;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  ocean: THREE.Mesh;
  oceanMat: OceanMaterial;
  foamField: FoamField;
  sky: Sky;
  skyUniforms: Record<string, { value: any }>;
  sunLight: THREE.DirectionalLight;
  moonLight: THREE.DirectionalLight;
  ambient: THREE.HemisphereLight;
  lightningLight: THREE.DirectionalLight;
  stars: THREE.Points;
  sunSprite: THREE.Sprite;
  moonSprite: THREE.Sprite;
  underwaterDome: THREE.Mesh;
  fogAbove: THREE.FogExp2;
  fogUnder: THREE.FogExp2;
  sunWarmColor: THREE.Color;
  tmpSunColor: THREE.Color;
  otterFillLight: THREE.DirectionalLight;
  otterFillNightColor: THREE.Color;
  weatherSim: WeatherSim;
  otter: SeaOtter;
  camRig: OtterCameraRig;
  otterOrbMesh: THREE.Mesh;
  life: OceanLife;
  precip: PrecipitationSystem;
  cloudLayers: Array<{ deck: CloudDeck; minQuality: AppParams['quality'] }>;
  qualityRank: Record<AppParams['quality'], number>;
  lightningBolts: LightningBolts;
  lightningDir: THREE.Vector3;
  islands: HorizonIslands;
  rainbow: RainbowArc;
  splashes: SplashSystem;
  windSpray: WindSpray;
  ripples: OtterRipples;
  wakeRibbon: WakeRibbon;
  waterline: OtterWaterline;
  perfOverlay: PerfOverlay;
  pmrem: THREE.PMREMGenerator;
  get envRT(): THREE.WebGLRenderTarget | null;
  set envRT(v: THREE.WebGLRenderTarget | null);
  planarReflections: PlanarReflectionController;
  audio: AudioController;
  postFX: PostFXState;
  setQuality: (q: AppParams['quality']) => void;
  get contextLost(): boolean;
  get needsRebuild(): boolean;
  set needsRebuild(v: boolean);
  get wavesCurrent(): WaveComponent[];
  set wavesCurrent(v: WaveComponent[]);
  get wavesTarget(): WaveComponent[];
  set wavesTarget(v: WaveComponent[]);
  get simTime_s(): number;
  set simTime_s(v: number);
  get timeOfDay_h(): number;
  set timeOfDay_h(v: number);
  get dayOfYear(): number;
  set dayOfYear(v: number);
  get seaHs_m(): number;
  set seaHs_m(v: number);
  get seaTp_s(): number;
  set seaTp_s(v: number);
  get windDirTo_rad(): number;
  set windDirTo_rad(v: number);
  get swellDirTo_rad(): number;
  set swellDirTo_rad(v: number);
  seismicPulse: SeismicPulseState;
  rogueScheduler: RogueWaveScheduler;
  rogueWarning: OverlayWarning;
  otterPrevXZ: THREE.Vector2;
  get otterSpeed_mps(): number;
  set otterSpeed_mps(v: number);
};

export type LoopControls = {
  resetPerfStats: () => void;
  resetEnvTimers: () => void;
  onContextRestored: () => void;
  onContextLost: () => void;
};

const tmpV3a = new THREE.Vector3();
const tmpV3b = new THREE.Vector3();
const tmpV3c = new THREE.Vector3();
const tmpV3d = new THREE.Vector3();
const tmpV3e = new THREE.Vector3();
const tmpV2a = new THREE.Vector2();
const tmpV2b = new THREE.Vector2();
const tmpWindXZ = new THREE.Vector2();
const tmpOtterXZ = new THREE.Vector2();
const tmpRogueXZ = new THREE.Vector2();
const tmpOtterDirXZ = new THREE.Vector2();
const tmpSunWorldPos = new THREE.Vector3();
const tmpSunNDC = new THREE.Vector3();

const tmpSurfSample = { height_m: 0, normal: new THREE.Vector3(), disp: new THREE.Vector3(), slope: 0 };
const tmpSurfSampleEvent = { height_m: 0, normal: new THREE.Vector3(), disp: new THREE.Vector3(), slope: 0 };
const tmpSurfT = new THREE.Vector3();
const tmpSurfB = new THREE.Vector3();

const colDeep = new THREE.Color('#052436');
const colGreen = new THREE.Color('#0a3a32');
const colNearMix = new THREE.Color('#062b3f');
const tmpWaterCol = new THREE.Color();
const tmpAbsorptionCol = new THREE.Color();

const hazeBaseCol = new THREE.Color('#6a86a8');
const hazeSunsetCol = new THREE.Color('#f2b17b');
const hazeStormCol = new THREE.Color('#3a445c');
const hazeNightCol = new THREE.Color('#05070c');
const tmpHazeCol = new THREE.Color();

const lightningCoolCol = new THREE.Color('#dbe9ff');
const lightningHotCol = new THREE.Color('#f7fbff');
const ambientSkyBaseCol = new THREE.Color('#88aaff');
const ambientGroundBaseCol = new THREE.Color('#0b1020');
const ambientFlashGroundCol = new THREE.Color('#1a2233');
const tmpLightningCol = new THREE.Color();

// Fixed primary light (moon) to align highlights/reflections.
const PRIMARY_LIGHT_DIR = new THREE.Vector3(-0.45, 0.55, 0.70).normalize();
const PRIMARY_LIGHT_COLOR = new THREE.Color('#9bb8ff');
const PRIMARY_LIGHT_INTENSITY = 0.35;
// Subtle height fog to soften the horizon seam.
const heightFogBaseCol = new THREE.Color('#6f8096');
const tmpHeightFogCol = new THREE.Color();
const heightFogFalloff = 0.015;
const heightFogMaxOpacity = 0.35;

export function startAnimationLoop(state: LoopState): LoopControls {
  const clock = new THREE.Clock();
  let simPaused = document.hidden;
  let skyEnvTimer = 999;
  let dtEma_s = 1 / 60;
  let dtAvg_s = 1 / 60;
  let lowFpsTimer_s = 0;
  let autoQualityCooldown_s = 0;
  let envInterval_s = 0;
  let envAngleDelta_deg = 0;
  let lastEnvCloudCover = -1;
  let lastEnvSunset = -1;
  let lastEnvNight = -1;
  const lastEnvSunDir = new THREE.Vector3(0, 1, 0);

  let underwaterBlend = 0;
  let lightningFlash01 = 0;
  let lightningFlashFx = 0;
  let lightningBurstPulses = 0;
  let lightningNextPulse_s = 0;
  let lightningEventTimer_s = 0;
  let lightningPulseTime_s = -1;
  let lightningPulseRise_s = 0.015;
  let lightningPulseDecay_s = 0.08;
  let lightningPulseAmp = 0;
  let lightningSkyGlow = 0;
  let currentBiome = biomeFor(state.params.latitude_deg, 12);
  const rogueWaves: WaveComponent[] = [];

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
    void state.audio.updateState();
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
  handleVisibilityChange();

  const controls: LoopControls = {
    resetPerfStats: () => {
      dtEma_s = 1 / 60;
      dtAvg_s = 1 / 60;
      lowFpsTimer_s = 0;
      autoQualityCooldown_s = 0;
    },
    resetEnvTimers: () => {
      envInterval_s = 0;
      skyEnvTimer = 999;
      lastEnvCloudCover = -1;
      lastEnvSunset = -1;
      lastEnvNight = -1;
    },
    onContextRestored: () => {
      handleVisibilityChange();
    },
    onContextLost: () => {
      simPaused = true;
      clock.stop();
    }
  };

  function animate(): void {
    requestAnimationFrame(animate);

    if (simPaused || state.contextLost) return;

    const dtRaw = clock.getDelta();
    const dt = Math.min(0.05, Math.max(0.0, dtRaw));
    state.simTime_s += dt;
    const pulseGate = state.seismicPulse.component.A > 1e-6
      ? pulseWindow01(state.simTime_s, state.seismicPulse.startTime_s, state.seismicPulse.duration_s)
      : 0;
    const pulseFoamDamp = clamp(1.0 - 0.55 * pulseGate, 0.0, 1.0);

    const kEma = 1 - Math.exp(-dt / 0.25);
    dtEma_s = lerp(dtEma_s, dt, kEma);
    const kAvg = 1 - Math.exp(-dt / 1.2);
    dtAvg_s = lerp(dtAvg_s, dt, kAvg);

    if (autoQualityCooldown_s > 0) autoQualityCooldown_s = Math.max(0, autoQualityCooldown_s - dt);
    if (state.params.quality !== 'Low') {
      const lowFpsThreshold_s = IS_MOBILE_LIKE ? (1 / 28) : (1 / 32);
      const sustain_s = IS_MOBILE_LIKE ? 4.5 : 7.0;
      if (dtAvg_s > lowFpsThreshold_s) {
        lowFpsTimer_s += dt;
      } else {
        lowFpsTimer_s = Math.max(0, lowFpsTimer_s - dt * 0.5);
      }

      if (lowFpsTimer_s >= sustain_s && autoQualityCooldown_s <= 0) {
        const nextQuality: AppParams['quality'] =
          state.params.quality === 'Max' ? 'High' : (state.params.quality === 'High' ? 'Medium' : 'Low');
        state.setQuality(nextQuality);
        lowFpsTimer_s = 0;
        autoQualityCooldown_s = 12.0;
      }
    } else {
      lowFpsTimer_s = 0;
    }

    if (state.params.gameStarted) {
      state.timeOfDay_h = (state.timeOfDay_h + dt / 3600) % 24;
    } else {
      state.timeOfDay_h = state.params.timeOfDay_h;
      state.dayOfYear = state.params.dayOfYear;
    }

    const wx = state.weatherSim.update(dt, {
      latitude_deg: state.params.latitude_deg,
      longitude_deg: state.params.longitude_deg,
      dayOfYear: state.dayOfYear,
      timeOfDay_h: state.timeOfDay_h,
      coastProximity: state.params.coastProximity,

      precipChance_pct: state.params.precipChance_pct,
      stormsIn2to4hChance_pct: state.params.stormsIn2to4hChance_pct,
      verticalWindShear_mps: state.params.verticalWindShear_mps,
      hurricaneChanceAdjust_pct: state.params.hurricaneChanceAdjust_pct
    });

    const manualWind = state.params.windSpeedMode === 'Manual';
    if (manualWind) {
      const bft = clamp(state.params.windSpeedBeaufort, 0, 12);
      state.params.windSpeedBeaufort = bft;
      wx.windSpeed_mps = beaufortToMps(bft);
    } else {
      const bft = beaufortFromMps(wx.windSpeed_mps);
      state.params.windSpeedBeaufort = Math.round(bft * 10) / 10;
    }
    const swellFromWind = swellStateFromWindSpeed(wx.windSpeed_mps);

    const phaseFrac = moonPhaseFraction(state.params.moonPhaseName);
    const cel = computeCelestials({
      latitude_deg: state.params.latitude_deg,
      dayOfYear: state.dayOfYear,
      timeOfDay_h: state.timeOfDay_h,
      moonPhase: phaseFrac,
      moonDistanceMultiplier: state.params.moonDistanceMultiplier
    });

    const sunDir = tmpV3a.copy(PRIMARY_LIGHT_DIR);
    const moonDir = tmpV3b.copy(PRIMARY_LIGHT_DIR);
    const primaryElevation = Math.asin(clamp(sunDir.y, -1, 1));

    const night = clamp(1 - cel.sunIntensity, 0, 1);
    const sunset = clamp(1 - clamp((primaryElevation + 0.04) / 0.35, 0, 1), 0, 1);

    const tideBaseAmp_m = Math.max(0, state.params.tideAmplitude_m);
    const tideCoastScale = lerp(0.35, 1.25, clamp(state.params.coastProximity, 0, 1));
    const tideAmp_m = tideBaseAmp_m * tideCoastScale * cel.tideScale;
    const tidePeriod_s = Math.max(1e-3, state.params.tidePeriod_h * 3600);
    const tidePhase_rad = degToRad(state.params.tidePhase_deg);
    const tide = computeTide({ amplitude_m: tideAmp_m, period_s: tidePeriod_s, phase_rad: tidePhase_rad }, state.simTime_s);
    const tideHeight_m = tide.height_m;

    const cc = clamp(wx.cloudCover, 0, 1);

    const rayleighBase = lerp(0.65, 2.7, 1 - cc) * lerp(1.0, 0.55, sunset);
    const turbidityBase = lerp(6, 16, cc) + sunset * lerp(2, 10, 1 - cc);
    const mieBase = lerp(0.004, 0.02, cc) + sunset * 0.012;
    const mieGBase = lerp(0.82, 0.92, cc) + sunset * 0.02;

    const sunVis = clamp(PRIMARY_LIGHT_INTENSITY * (1 - 0.35 * cc), 0, 1);

    state.tmpSunColor.copy(PRIMARY_LIGHT_COLOR);
    state.sunLight.color.copy(state.tmpSunColor);
    state.moonLight.color.copy(state.tmpSunColor);

    state.sunLight.intensity = 0.0;
    state.sunLight.position.copy(sunDir).multiplyScalar(100);

    state.moonLight.intensity = sunVis;
    state.moonLight.position.copy(moonDir).multiplyScalar(100);

    const ambientBase = lerp(0.25, 0.62, 1 - night) * lerp(1.0, 0.72, cc);

    const storminessFx = clamp(wx.storminess * 0.85 + wx.precipIntensity * 0.65 + wx.hurricaneIntensity * 1.0, 0, 1);
    const flashLimiter = state.params.reduceFlashes ? 0.35 : 1.0;
    const lightningRate_hz = lerp(0.02, 0.65, Math.pow(storminessFx, 1.35)) * flashLimiter;

    if (lightningBurstPulses <= 0 && lightningPulseTime_s < 0) {
      if (lightningRate_hz > 1e-4) {
        lightningEventTimer_s -= dt;
        if (lightningEventTimer_s <= 0) {
          const burstBase = 1 + Math.floor(Math.random() * 2);
          const burstExtra = Math.random() < lerp(0.35, 0.75, storminessFx) ? 1 : 0;
          const burstExtra2 = storminessFx > 0.7 && Math.random() < 0.45 ? 1 : 0;
          lightningBurstPulses = burstBase + burstExtra + burstExtra2;
          lightningNextPulse_s = 0;

          const yaw = Math.random() * Math.PI * 2.0;
          const pitch = lerp(0.18, 0.55, Math.random());
          const cosP = Math.cos(pitch);
          state.lightningDir.set(Math.cos(yaw) * cosP, Math.sin(pitch), Math.sin(yaw) * cosP).normalize();

          const rate = Math.max(1e-4, lightningRate_hz);
          const minGap = lerp(1.0, 0.35, storminessFx);
          const u = Math.max(1e-6, Math.random());
          lightningEventTimer_s = Math.max(minGap, -Math.log(u) / rate);
        }
      } else {
        lightningEventTimer_s = 0;
      }
    }

    lightningNextPulse_s -= dt;
    if (lightningBurstPulses > 0 && lightningNextPulse_s <= 0) {
      lightningBurstPulses -= 1;
      lightningNextPulse_s = lerp(0.06, 0.18, Math.random()) * lerp(1.1, 0.75, storminessFx);
      lightningPulseTime_s = 0;
      lightningPulseRise_s = lerp(0.008, 0.02, Math.random());
      lightningPulseDecay_s = lerp(0.06, 0.14, Math.random());
      lightningPulseAmp = lerp(0.65, 1.0, Math.random()) * lerp(0.75, 1.0, storminessFx);

      state.lightningLight.position.copy(state.camera.position).addScaledVector(state.lightningDir, 220);
      state.lightningLight.target.position.copy(state.camera.position);

      const strikeCount = Math.random() < lerp(0.25, 0.6, storminessFx) ? 2 : 1;
      for (let i = 0; i < strikeCount; i++) {
        state.lightningBolts.spawn({
          cameraPos: state.camera.position,
          flashDir: state.lightningDir,
          storminess: storminessFx,
          waterLevel: tideHeight_m
        });
      }
    }

    let lightningPulse01 = 0;
    if (lightningPulseTime_s >= 0) {
      lightningPulseTime_s += dt;
      const t = lightningPulseTime_s;
      if (t <= lightningPulseRise_s) {
        lightningPulse01 = lightningPulseRise_s > 1e-5 ? (t / lightningPulseRise_s) : 1.0;
      } else {
        const fallT = t - lightningPulseRise_s;
        lightningPulse01 = Math.exp(-fallT / Math.max(1e-4, lightningPulseDecay_s));
      }
      if (t >= lightningPulseRise_s + lightningPulseDecay_s * 3.2) {
        lightningPulseTime_s = -1;
      }
    }

    lightningFlash01 = Math.max(lightningFlash01 * Math.exp(-dt * 9.0), lightningPulse01 * lightningPulseAmp);
    lightningSkyGlow = Math.max(lightningSkyGlow * Math.exp(-dt * 3.0), lightningFlash01 * 0.65);

    lightningFlashFx = lightningFlash01 * flashLimiter;
    const lightningSkyFx = clamp(lightningSkyGlow * flashLimiter, 0, 1);
    const lightningColorMix = clamp(Math.pow(lightningFlashFx, 0.35), 0, 1);
    tmpLightningCol.copy(lightningCoolCol).lerp(lightningHotCol, lightningColorMix);
    state.lightningLight.color.copy(tmpLightningCol);

    const skyFlash = clamp(lightningSkyFx, 0, 1);
    state.skyUniforms['rayleigh'].value = lerp(rayleighBase, rayleighBase * 0.75, skyFlash);
    state.skyUniforms['turbidity'].value = lerp(turbidityBase, turbidityBase * 0.7 + 1.5, skyFlash);
    state.skyUniforms['mieCoefficient'].value = lerp(mieBase, mieBase + 0.02, skyFlash);
    state.skyUniforms['mieDirectionalG'].value = lerp(mieGBase, 0.94, skyFlash);

    state.skyUniforms['sunPosition'].value.copy(sunDir).multiplyScalar(10000);
    state.skyUniforms['u_cloudCover'].value = cc;
    state.skyUniforms['u_cloudTime'].value = state.simTime_s;

    state.ambient.intensity = ambientBase * (1.0 + 0.6 * skyFlash);
    state.ambient.color.copy(ambientSkyBaseCol).lerp(tmpLightningCol, skyFlash * 0.65);
    state.ambient.groundColor.copy(ambientGroundBaseCol).lerp(ambientFlashGroundCol, skyFlash * 0.4);

    const lightningIntensity = lightningFlashFx * lerp(2.5, 18.0, storminessFx);
    state.lightningLight.intensity = lightningIntensity;
    state.lightningBolts.update({ dt_s: dt });

    state.sunSprite.position.copy(state.camera.position).addScaledVector(sunDir, 4800);
    const sunMat = state.sunSprite.material as THREE.SpriteMaterial;
    sunMat.opacity = 0.0;
    sunMat.color.copy(state.tmpSunColor);
    state.sunSprite.scale.setScalar(lerp(420, 560, sunset));

    state.moonSprite.position.copy(state.camera.position).addScaledVector(moonDir, 4600);
    updateMoonPhase(state.moonSprite.material as THREE.SpriteMaterial, phaseFrac);
    (state.moonSprite.material as THREE.SpriteMaterial).opacity = clamp(sunVis, 0, 1);

    state.stars.position.copy(state.camera.position);
    const starStormBlock = clamp(wx.storminess * 0.85 + wx.precipIntensity * 0.95 + wx.hurricaneIntensity * 1.0, 0, 1);
    const starsTarget = clamp(night * (1 - wx.cloudCover) * (1 - starStormBlock), 0, 1);
    const starMat = state.stars.material as THREE.ShaderMaterial;
    starMat.uniforms['uPixelRatio'].value = state.renderer.getPixelRatio();
    starMat.uniforms['uOpacity'].value = lerp(starMat.uniforms['uOpacity'].value as number, starsTarget, clamp(dt * 0.5, 0, 1));

    if (underwaterBlend < 0.02) {
      const envRange = (q: AppParams['quality']): [number, number] => {
        if (q === 'Low') return [6.0, 10.0];
        if (q === 'Medium') return [4.0, 4.8];
        if (q === 'High') return [2.0, 3.2];
        return [1.0, 2.0];
      };

      if (envInterval_s <= 0.0) {
        const r = envRange(state.params.quality);
        envInterval_s = lerp(r[0], r[1], Math.random());
      }

      const dot = clamp(lastEnvSunDir.dot(sunDir), -1, 1);
      envAngleDelta_deg = (Math.acos(dot) * 180) / Math.PI;

      const angleThresh = (q: AppParams['quality']): number => {
        if (q === 'Low') return 0.65;
        if (q === 'Medium') return 0.45;
        if (q === 'High') return 0.28;
        return 0.18;
      };

      const cloudDelta = Math.abs(cc - (lastEnvCloudCover < 0 ? cc : lastEnvCloudCover));
      const sunsetDelta = Math.abs(sunset - (lastEnvSunset < 0 ? sunset : lastEnvSunset));
      const nightDelta = Math.abs(night - (lastEnvNight < 0 ? night : lastEnvNight));

      const cloudThresh = state.params.quality === 'Low' ? 0.12 : 0.08;
      const sunThresh = angleThresh(state.params.quality);
      const needsEnv = envAngleDelta_deg >= sunThresh || cloudDelta >= cloudThresh || sunsetDelta >= 0.06 || nightDelta >= 0.08;

      skyEnvTimer += dt;
      if (skyEnvTimer >= envInterval_s && needsEnv) {
        const next = state.pmrem.fromScene(state.sky as any);
        if (state.envRT) state.envRT.dispose();
        state.envRT = next;
        state.scene.environment = state.envRT.texture;

        lastEnvSunDir.copy(sunDir);
        lastEnvCloudCover = cc;
        lastEnvSunset = sunset;
        lastEnvNight = night;

        const r = envRange(state.params.quality);
        envInterval_s = lerp(r[0], r[1], Math.random());
        skyEnvTimer = 0;
      }
    } else {
      skyEnvTimer = envInterval_s * 0.85;
    }

    const windDirTo = (wx.windDirFrom_deg * Math.PI) / 180 + Math.PI;
    const ekman = (state.params.latitude_deg >= 0 ? Math.PI / 4 : -Math.PI / 4);
    const curDir = windDirTo + ekman;
    const windCurSpeed = clamp(wx.windSpeed_mps * 0.014, 0, 1.2);
    const curSpeed = windCurSpeed + tide.current_mps;
    tmpV2b.set(Math.cos(curDir) * curSpeed, Math.sin(curDir) * curSpeed);
    const currentXZ = tmpV2b;

    const derived = computeDerivedFromU10(wx.windSpeed_mps, wx.windDirFrom_deg);
    const oceanIn = { depth_m: state.params.depth_m };
    const stormIn = {
      stormRadius_km: wx.stormRadius_km,
      fetchUtilization: wx.fetchUtilization,
      stormAge_h: wx.stormAge_h,
      windRamp_h: wx.windRamp_h
    };

    const waveStateBase = predictWaveHsTpCEM(derived, stormIn, oceanIn);
    const waveState = manualWind
      ? { ...waveStateBase, Hs_m: swellFromWind.swellHeight_m, Tp_s: swellFromWind.swellPeriod_s }
      : waveStateBase;

    const storminess = clamp(Math.max(wx.precipIntensity, wx.storminess, wx.hurricaneIntensity), 0, 1);
    const seaResponse = clamp(storminess * 0.85 + wx.gustiness * 0.35, 0, 1);
    const tauSea = lerp(55, 16, seaResponse);
    const kSea = 1 - Math.exp(-dt / Math.max(1e-3, tauSea));

    const dramatic = clamp(storminess * 0.95 + wx.hurricaneIntensity * 0.6 + wx.gustiness * 0.35, 0, 1);
    const HsBase = waveState.Hs_m * lerp(1.0, 2.25, Math.pow(dramatic, 1.45));
    const TpBase = waveState.Tp_s * lerp(1.0, 1.32, Math.pow(dramatic, 1.25));
    const HsTarget = clamp(Math.max(HsBase, swellFromWind.swellHeight_m), 0.4, 24.0);
    const TpTarget = clamp(TpBase, 3.5, 22.0);

    state.seaHs_m = lerp(state.seaHs_m, HsTarget, kSea);
    state.seaTp_s = lerp(state.seaTp_s, TpTarget, kSea);
    state.windDirTo_rad = lerpAngleRad(state.windDirTo_rad, derived.windDirTo_rad, clamp(dt * 0.35, 0, 1));

    const tauSwellDir = lerp(320, 180, seaResponse);
    const kSwellDir = 1 - Math.exp(-dt / Math.max(1e-3, tauSwellDir));
    state.swellDirTo_rad = lerpAngleRad(state.swellDirTo_rad, state.windDirTo_rad, kSwellDir);

    const waveChaos = clamp(0.28 + 0.65 * wx.gustiness + 0.65 * storminess, 0, 1);
    const directionalSpread = clamp(lerp(0.25, 1.0, waveChaos) + storminess * 0.12, 0, 1);
    const crossSea01 = clamp((directionalSpread - 0.55) / 0.45, 0, 1);
    const wind01 = clamp(wx.windSpeed_mps / 18, 0, 1);
    const choppiness = clamp(0.95 + 1.05 * waveChaos + 0.55 * wind01, 0.65, 2.6);

    const swellVar = clamp(0.55 - 0.45 * storminess - 0.25 * wind01, 0.15, 0.65);

    const seicheEnabled = state.params.seicheEnabled && state.params.seicheAmplitude_m > 0 && state.params.seichePeriod_s > 1;
    const seicheCount = seicheEnabled ? 2 : 0;
    const tideCount = 1;
    // Subtle long-wave modulation layered on top of the uniform tide offset.
    const tideLongAmp_m = tideAmp_m * 0.2;
    const tideComponent = buildTideComponent({
      amplitude_m: tideLongAmp_m,
      period_s: tidePeriod_s,
      depth_m: state.params.depth_m,
      dirTo_rad: curDir,
      phase_rad: tidePhase_rad
    });

    const baseWaveCount = Math.max(4, waveCountForQuality(state.params.quality) - seicheCount - tideCount);

    const buildWaveTarget = (): WaveComponent[] => {
      // Wave spectrum inputs (JONSWAP-derived Gerstner stack).
      const spectrumInputs = {
        Hs_m: state.seaHs_m,
        Tp_s: state.seaTp_s,
        depth_m: state.params.depth_m,
        windDirTo_rad: state.windDirTo_rad,
        windSpeed_mps: wx.windSpeed_mps,
        swellDirTo_rad: state.swellDirTo_rad,
        swellVariance: swellVar,
        swellHs_m: swellFromWind.swellHeight_m,
        swellTp_s: swellFromWind.swellPeriod_s,
        waveCount: baseWaveCount,
        directionalSpread,
        gamma: lerp(1.6, 4.2, clamp(wx.storminess + wx.hurricaneIntensity, 0, 1)),
        choppiness,
        capillaryAmplitude_m: state.params.capillaryAmplitude_m,
        capillarySlopeFalloff: state.params.capillarySlopeFalloff,
        capillaryDirectionalSpread: state.params.capillaryDirectionalSpread,
        capillaryWaveCount: state.params.capillaryWaveCount,
        seed: 1337
      };
      const base = buildWaveComponents(spectrumInputs);
      blendWaveSpectra(base, wx.windSpeed_mps, state.params.windSeaIntensity, state.params.swellIntensity);

      if (!seicheEnabled) {
        base.push(tideComponent);
        return base;
      }

      const seiche = buildSeicheComponents({
        amplitude_m: state.params.seicheAmplitude_m,
        period_s: state.params.seichePeriod_s,
        depth_m: state.params.depth_m,
        dirTo_rad: state.swellDirTo_rad
      });
      base.push(...seiche);
      base.push(tideComponent);
      return base;
    };

    if (state.needsRebuild || state.wavesTarget.length === 0) {
      state.wavesTarget = buildWaveTarget();

      if (state.wavesCurrent.length !== state.wavesTarget.length) {
        state.wavesCurrent = state.wavesTarget.map((w) => ({ ...w }));
      }
      state.needsRebuild = false;
    } else {
      if (state.simTime_s % 2.0 < dt) {
        state.wavesTarget = buildWaveTarget();
      }
    }

    const tideIndex = state.wavesTarget.length - 1;
    if (tideIndex >= 0 && state.wavesTarget[tideIndex]?.band.label === 'tide') {
      copyWaveComponent(state.wavesTarget[tideIndex], tideComponent);
    }

    const chase = clamp(dt * 0.85, 0, 1);
    for (let i = 0; i < state.wavesCurrent.length; i++) {
      const c = state.wavesCurrent[i];
      const tW = state.wavesTarget[i];
      c.dirX = lerp(c.dirX, tW.dirX, chase);
      c.dirZ = lerp(c.dirZ, tW.dirZ, chase);
      c.A = lerp(c.A, tW.A, chase);
      c.k = lerp(c.k, tW.k, chase);
      c.omega = lerp(c.omega, tW.omega, chase);
      c.phase = tW.phase;
      c.Q = lerp(c.Q, tW.Q, chase);
      c.band = tW.band;
    }
    const rogueSettings = {
      enabled: state.params.rogueEnabled,
      chancePerMinute: clamp(state.params.rogueChance_pct / 100, 0, 1),
      duration_s: Math.max(2.0, state.params.rogueDuration_s),
      componentCount: Math.max(1, Math.floor(state.params.rogueComponentCount)),
      ampBoost: clamp(state.params.rogueAmplitudeBoost / 100, 0, 2.5),
      phaseAlign: clamp(state.params.roguePhaseAlign_pct / 100, 0, 1)
    };
    tmpRogueXZ.set(state.otter.position.x, state.otter.position.z);
    const rogueState = state.rogueScheduler.update(dt, state.simTime_s, state.wavesCurrent, currentXZ, tmpRogueXZ, rogueSettings);
    const rogueFx = rogueState.active ? rogueState.envelope : 0;
    state.rogueWarning.setIntensity(rogueFx);

    const wavesForRender = rogueFx > 1e-5 ? applyRogueToWaves(state.wavesCurrent, rogueState, rogueWaves) : state.wavesCurrent;
    state.oceanMat.writeWaves(wavesForRender);

    state.ocean.position.set(state.camera.position.x, 0, state.camera.position.z);

    const clarityBase = clamp(state.params.clarity_pct / 100, 0, 1);
    const clarity = clamp(
      clarityBase
        * (1 - 0.22 * storminess - 0.15 * wx.precipIntensity)
        * lerp(1.0, 0.78, clamp(state.params.coastProximity, 0, 1)),
      0,
      1
    );
    const near = clamp(state.params.coastProximity, 0, 1);
    tmpWaterCol.copy(colGreen).lerp(colDeep, clarity).lerp(colNearMix, 1 - near * 0.4);
    state.oceanMat.material.color.copy(tmpWaterCol);

    const foamBoost = clamp(waveChaos * 0.75 + clamp(state.seaHs_m / 5.0, 0, 1) * 0.35, 0, 1);
    const foamIntensity = lerp(0.55, 2.15, foamBoost);
    const foamSlopeStart = lerp(0.24, 0.11, foamBoost);
    const foamSlopeEnd = lerp(0.68, 0.38, foamBoost);

    tmpWindXZ.set(Math.cos(state.windDirTo_rad) * wx.windSpeed_mps, Math.sin(state.windDirTo_rad) * wx.windSpeed_mps);
    const qMicro = state.params.quality === 'Max' ? 1.0 : state.params.quality === 'High' ? 0.85 : state.params.quality === 'Medium' ? 0.65 : 0.45;
    const microStrength = (0.04 + 0.08 * wind01) * qMicro * (1.0 - 0.35 * storminess)
      * clamp(state.params.microNormalStrength, 0, 2.5);
    const microScale = clamp(state.params.microNormalScale, 0.25, 2.5);
    const microFadeNear = state.params.quality === 'Low' ? 35 : state.params.quality === 'Medium' ? 55 : state.params.quality === 'High' ? 70 : 80;
    const microFadeFar = state.params.quality === 'Low' ? 170 : state.params.quality === 'Medium' ? 250 : state.params.quality === 'High' ? 320 : 400;
    const lod = oceanLodForQuality(state.params.quality);

    state.oceanMat.update(dt, {
      time_s: state.simTime_s,
      originXZ: tmpV2a.set(state.ocean.position.x, state.ocean.position.z),
      currentXZ,
      tideHeight_m,
      waterClarity: clarity,
      waterDepth_m: state.params.depth_m,
      absorptionColor: tmpAbsorptionCol.set(state.params.absorptionColor),
      absorptionDistance_m: state.params.absorptionDistance_m,
      foamIntensity,
      foamSlopeStart,
      foamSlopeEnd,
      rogueIntensity: rogueFx,
      windSeaIntensity: state.params.windSeaIntensity,
      swellIntensity: state.params.swellIntensity,
      lodFadeNear_m: lod.fadeNear_m,
      lodFadeFar_m: lod.fadeFar_m,
      lodWavelengthLong_m: lod.wavelengthLong_m,
      lodWavelengthShort_m: lod.wavelengthShort_m,
      lodLowBoost: lod.lowBoost,
      pulse: state.seismicPulse,

      windXZ: tmpWindXZ,
      microScale,
      microStrength,
      microFadeNear_m: microFadeNear,
      microFadeFar_m: microFadeFar,
      capillaryStrength: state.params.capillaryStrength,

      sunDir,
      sunColor: state.sunLight.color,
      sunIntensity: sunVis,
      lightningDir: state.lightningDir,
      lightningColor: tmpLightningCol,
      lightningIntensity: lightningFlashFx
    });

    const otterosity = clamp(state.params.otterosity_pct / 100, 0, 1);
    const interestDir = sunVis > 0.15 ? sunDir : (cel.moonIntensity > 0.18 ? moonDir : undefined);
    state.otter.update(
      {
        otterosity,
        storminess: clamp(wx.precipIntensity + wx.storminess * 0.7 + wx.hurricaneIntensity, 0, 1),
        waveChaos,
        windDirTo_rad: state.windDirTo_rad,
        interestDir
      },
      {
        dt_s: dt,
        time_s: state.simTime_s,
        waves: state.wavesCurrent,
        currentXZ,
        tideHeight_m,
        rogue: rogueState,
        pulse: state.seismicPulse,
        pulseFoamDamp
      }
    );

    tmpOtterXZ.set(state.otter.position.x, state.otter.position.z);
    let dx = 0;
    let dz = 0;
    if (dt > 1e-6) {
      dx = tmpOtterXZ.x - state.otterPrevXZ.x;
      dz = tmpOtterXZ.y - state.otterPrevXZ.y;
      state.otterSpeed_mps = Math.sqrt(dx * dx + dz * dz) / dt;
    } else {
      state.otterSpeed_mps = 0;
    }
    state.otterPrevXZ.copy(tmpOtterXZ);

    const useVelDir = state.otterSpeed_mps > 0.02 && (dx * dx + dz * dz) > 1e-8;
    if (useVelDir) {
      tmpV2b.set(dx, dz);
    } else {
      tmpV2b.set(state.otter.bodyForward.x, state.otter.bodyForward.z);
    }
    if (tmpV2b.lengthSq() > 1e-8) tmpV2b.normalize();
    else tmpV2b.set(0, 1);
    const dirSmooth = clamp(dt * (useVelDir ? 7.0 : 2.0), 0, 1);
    tmpOtterDirXZ.lerp(tmpV2b, dirSmooth);
    if (tmpOtterDirXZ.lengthSq() > 1e-8) tmpOtterDirXZ.normalize();
    else tmpOtterDirXZ.copy(tmpV2b);

    const surf = sampleGerstner(
      state.wavesCurrent,
      tmpV2a.set(state.otter.position.x, state.otter.position.z),
      state.simTime_s,
      currentXZ,
      tideHeight_m,
      tmpSurfSample,
      tmpSurfT,
      tmpSurfB,
      rogueState,
      state.seismicPulse
    );
    const surfEvent = sampleGerstner(
      state.wavesCurrent,
      tmpV2a,
      state.simTime_s,
      currentXZ,
      tideHeight_m,
      tmpSurfSampleEvent,
      tmpSurfT,
      tmpSurfB,
      rogueState,
      state.seismicPulse,
      { includeTags: ['event'], applyCrestSharpness: true }
    );
    const paddleImpulse01 = (state.otter as any).paddleImpulse01 ?? 0;
    const bodyWaterlineOffset_m = 0.12;
    const depth_m = surf.height_m - (state.otter.position.y - bodyWaterlineOffset_m);
    const surfaceGate = smoothstep(0.0, 0.20, depth_m);
    const deepGate = 1.0 - smoothstep(0.28, 0.70, depth_m);
    const contact01 = clamp(surfaceGate * deepGate, 0, 1);
    const headPos = state.otter.getHeadWorldPosition(tmpV3c);
    const eyePos = state.otter.getEyeWorldPosition(tmpV3d);

    state.otterOrbMesh.position.copy(headPos);
    state.otterOrbMesh.position.y += 0.32;
    const orbMood = clamp(0.35 + 0.65 * night + 0.45 * clamp(wx.storminess + wx.hurricaneIntensity, 0, 1), 0, 1);
    (state.otterOrbMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = lerp(2.5, 4.2, orbMood);

    state.camRig.update(state.camera, {
      dt_s: dt,
      gazeDir: state.otter.gazeDir,
      bodyForward: state.otter.bodyForward,
      headPos,
      eyePos,
      surfaceHeight_m: surf.height_m,
      seaLevel_m: tideHeight_m,
      underwater: state.otter.isUnderwaterView(),
      storminess: clamp(wx.precipIntensity + wx.storminess + wx.hurricaneIntensity, 0, 1),
      followDistance_m: state.params.cameraDistance_m,
      followElevation_m: state.params.cameraElevation_m
    });

    state.camera.updateMatrixWorld();

    state.sky.position.copy(state.camera.position);

    state.camera.getWorldDirection(tmpV3e);
    state.otterFillLight.position.copy(state.camera.position).addScaledVector(tmpV3e, -2.0);
    state.otterFillLight.position.y += 3.0;
    state.otterFillLight.target.position.copy(headPos);
    state.otterFillLight.color.copy(state.tmpSunColor).lerp(state.otterFillNightColor, night);
    state.otterFillLight.intensity = lerp(0.12, 0.40, night) * (0.85 + 0.40 * cc);

    const calmness = clamp(1 - (wx.storminess * 0.75 + wx.hurricaneIntensity + wx.precipIntensity * 0.60 + waveChaos * 0.25), 0, 1);
    const sunsetNow = sunset;
    state.ripples.update({
      dt_s: dt,
      time_s: state.simTime_s,
      center: state.otter.position,
      surfaceY: surf.height_m,
      calmness,
      sunIntensity: sunVis,
      sunset: sunsetNow,
      speed_mps: state.otterSpeed_mps,
      paddleImpulse01,
      motionDirXZ: tmpOtterDirXZ,
      contact01
    });

    state.wakeRibbon.update({
      dt_s: dt,
      time_s: state.simTime_s,
      centerXZ: tmpOtterXZ,
      forwardXZ: tmpOtterDirXZ,
      surfaceY_m: surf.height_m,
      speed_mps: state.otterSpeed_mps,
      paddleImpulse01,
      calm01: calmness,
      pulseFoamDamp,
      contact01
    });

    const underwater = state.camera.position.y < (surf.height_m - 0.08);

    state.otter.group.updateMatrixWorld(true);
    state.waterline.update({
      time_s: state.simTime_s,
      waves: state.wavesCurrent,
      currentXZ,
      tideHeight_m,
      rogue: rogueState,
      pulse: state.seismicPulse,
      cameraPos: state.camera.position,
      sunIntensity: sunVis,
      night,
      underwater,
      contactMeshes: state.otter.getContactMeshes(),
      contactMeshesVersion: state.otter.getContactMeshesVersion()
    });

    underwaterBlend = lerp(underwaterBlend, underwater ? 1 : 0, clamp(dt * 3.0, 0, 1));

    state.underwaterDome.visible = underwaterBlend > 0.02;
    if (state.underwaterDome.visible) {
      state.underwaterDome.position.copy(state.camera.position);
      (state.underwaterDome.material as THREE.MeshBasicMaterial).color.copy(state.fogUnder.color);
    }

    if (state.postFX.ssrPass) state.postFX.ssrPass.enabled = underwaterBlend < 0.02;
    if (state.postFX.ssrPass) {
      state.oceanMat.setSSRReflectionStrength(state.postFX.ssrPass.enabled ? 1.0 : 0.0);
    } else {
      state.oceanMat.setSSRReflectionStrength(0.0);
    }

    if (state.postFX.underwaterPass) {
      const uwPass = state.postFX.underwaterPass as any;
      uwPass.enabled = underwaterBlend > 0.001;

      tmpSunWorldPos.copy(state.camera.position).addScaledVector(sunDir, 12000);
      tmpSunNDC.copy(tmpSunWorldPos).project(state.camera);
      const sunUvX = tmpSunNDC.x * 0.5 + 0.5;
      const sunUvY = tmpSunNDC.y * 0.5 + 0.5;
      const sunInView = (tmpSunNDC.z > -1.0 && tmpSunNDC.z < 1.0 && sunUvX > -0.15 && sunUvX < 1.15 && sunUvY > -0.15 && sunUvY < 1.15) ? 1.0 : 0.0;

      uwPass.uniforms.u_time.value = state.simTime_s;
      uwPass.uniforms.u_underwater.value = underwaterBlend;
      uwPass.uniforms.u_clarity.value = clarity;
      if (uwPass.setWaterLevel) {
        uwPass.setWaterLevel(tideHeight_m);
      } else {
        uwPass.uniforms.u_waterLevel.value = tideHeight_m;
      }
      if (uwPass.setCameraWorldY) {
        uwPass.setCameraWorldY(state.camera.position.y);
      } else if (uwPass.uniforms.u_cameraWorldY) {
        uwPass.uniforms.u_cameraWorldY.value = state.camera.position.y;
      }
      uwPass.uniforms.u_sunUv.value.set(sunUvX, sunUvY);
      uwPass.uniforms.u_sunInView.value = sunInView;
      uwPass.uniforms.u_sunIntensity.value = sunVis;
      uwPass.uniforms.u_sunColor.value.copy(state.sunLight.color);
      uwPass.uniforms.u_invProj.value.copy(state.camera.projectionMatrixInverse);
      uwPass.uniforms.u_invView.value.copy(state.camera.matrixWorld);
    }

    const heightFogPass = state.postFX.heightFogPass as any;
    if (heightFogPass) {
      heightFogPass.enabled = underwaterBlend < 0.001;
      heightFogPass.uniforms.u_invProj.value.copy(state.camera.projectionMatrixInverse);
      heightFogPass.uniforms.u_invView.value.copy(state.camera.matrixWorld);
      heightFogPass.uniforms.u_height.value = tideHeight_m;
      heightFogPass.uniforms.u_heightFalloff.value = heightFogFalloff;
      heightFogPass.uniforms.u_maxOpacity.value = heightFogMaxOpacity;
      heightFogPass.uniforms.u_strength.value = clamp(1.0 - underwaterBlend, 0, 1);
    }

    const speed01 = clamp(state.otterSpeed_mps / 0.35, 0, 1);
    const contactFoam = contact01 * (0.10 + 0.20 * paddleImpulse01);
    const motionFoam =
      (speed01 * (0.15 + 0.35 * calmness) + paddleImpulse01 * (0.18 + 0.22 * calmness)) * contact01;
    const wakeStrength = clamp(contactFoam + motionFoam, 0, 1);
    const wakeRadius = lerp(0.85, 1.95, speed01) * lerp(0.85, 1.1, contact01);
    const wakeLength = (lerp(1.4, 6.4, speed01) + paddleImpulse01 * 1.6) * lerp(0.6, 1.0, contact01);
    state.foamField.update(state.renderer, {
      dt_s: dt,
      time_s: state.simTime_s,
      centerXZ: tmpOtterXZ,
      waves: wavesForRender,
      currentXZ,
      windDirTo_rad: state.windDirTo_rad,
      windSpeed_mps: wx.windSpeed_mps,
      storminess,
      rogueIntensity: rogueFx,
      wakePosXZ: tmpOtterXZ,
      wakeDirXZ: tmpOtterDirXZ,
      wakeStrength,
      wakeRadius,
      wakeLength,
      capillaryStrength: state.params.capillaryStrength
    });
    state.oceanMat.bindFoamMap(state.foamField.texture);
    state.oceanMat.setFoamFieldTransform(state.foamField.centerXZ, state.foamField.worldSize_m);

    state.islands.update(state.camera.position, state.otter.bodyForward, tideHeight_m);

    if (underwater) {
      state.fogUnder.color.set('#053044');
      state.fogUnder.density = lerp(0.055, 0.018, clarity);
      state.scene.fog = state.fogUnder;

      state.renderer.toneMappingExposure = lerp(state.renderer.toneMappingExposure, 1.0, clamp(dt * 2.0, 0, 1));
      state.stars.visible = false;
      state.sunSprite.visible = false;
      state.moonSprite.visible = false;

      state.sky.visible = false;
      for (const layer of state.cloudLayers) layer.deck.mesh.visible = false;
      state.islands.group.visible = false;
      state.rainbow.mesh.visible = false;
      state.splashes.points.visible = false;
      state.lightningBolts.group.visible = false;
      state.windSpray.points.visible = false;
    } else {
      const hazeStorm = clamp(wx.cloudCover * 0.55 + wx.precipIntensity * 0.85 + wx.storminess * 0.90 + wx.hurricaneIntensity * 1.0, 0, 1);

      const vis01 = clamp(1 - (clamp(wx.visibility_km, 1, 80) / 80), 0, 1);

      tmpHazeCol
        .copy(hazeBaseCol)
        .lerp(hazeSunsetCol, sunset * 0.72)
        .lerp(state.sunLight.color, sunset * 0.18)
        .lerp(hazeStormCol, hazeStorm * 0.65)
        .lerp(hazeNightCol, night * 0.70);
      const hazeFlash = clamp(lightningSkyFx * 0.55, 0, 1);
      tmpHazeCol.lerp(tmpLightningCol, hazeFlash * 0.5);

      state.fogAbove.color.copy(tmpHazeCol);
      const densVis = lerp(0.00003, 0.00018, vis01);
      const densBoost = lerp(0.95, 1.35, clamp(hazeStorm * 0.85 + sunset * 0.55, 0, 1));
      const densTarget = clamp(densVis * densBoost, 0.00002, 0.00024);
      state.fogAbove.density = lerp(state.fogAbove.density, densTarget, clamp(dt * 1.4, 0, 1));
      state.scene.fog = state.fogAbove;

      if (heightFogPass) {
        const heightFogDensity = clamp(densTarget * 0.55, 0.00002, 0.00008);
        tmpHeightFogCol.copy(tmpHazeCol).lerp(heightFogBaseCol, 0.35);
        heightFogPass.uniforms.u_fogColor.value.copy(tmpHeightFogCol);
        heightFogPass.uniforms.u_density.value = heightFogDensity;
      }

      const nightLift = lerp(1.0, 0.98, night);
      const expTarget = clamp(lerp(1.08, 1.18, sunset) * nightLift + lightningSkyFx * 0.25, 0.55, 1.75);
      state.renderer.toneMappingExposure = lerp(state.renderer.toneMappingExposure, expTarget, clamp(dt * 2.5, 0, 1));

      state.stars.visible = true;
      state.sunSprite.visible = false;
      state.moonSprite.visible = true;

      state.sky.visible = true;
      for (const layer of state.cloudLayers) layer.deck.mesh.visible = true;
      state.islands.group.visible = true;
      state.rainbow.mesh.visible = true;
      state.splashes.points.visible = true;
      state.lightningBolts.group.visible = true;
      state.windSpray.points.visible = true;
    }

    currentBiome = biomeFor(state.params.latitude_deg, wx.waterTemp_C);
    state.life.setParams({ biome: currentBiome, coastProximity: state.params.coastProximity, exoticEncounters: state.params.exoticEncounters_pct / 100 });
    state.life.update({
      dt_s: dt,
      time_s: state.simTime_s,
      otterPos: state.otter.position,
      surfaceY: tideHeight_m,
      nightFactor: night,
      storminess: clamp(wx.precipIntensity + wx.storminess + wx.hurricaneIntensity, 0, 1)
    });

    const cloudRank = state.qualityRank[state.params.quality];
    for (const layer of state.cloudLayers) {
      const enabled = cloudRank >= state.qualityRank[layer.minQuality];
      layer.deck.mesh.visible = enabled && !underwater;
      if (!enabled || underwater) continue;
      layer.deck.update({
        dt_s: dt,
        time_s: state.simTime_s,
        center: state.camera.position,
        cloudCover: wx.cloudCover,
        windDirFrom_deg: wx.windDirFrom_deg,
        windSpeed_mps: wx.windSpeed_mps,
        sunDir,
        sunColor: state.sunLight.color,
        sunIntensity: sunVis,
        nightFactor: night,
        lightningFlash01: lightningFlashFx,
        lightningDir: state.lightningDir,
        storminess: wx.storminess,
        hurricaneIntensity: wx.hurricaneIntensity,
        precipIntensity: wx.precipIntensity,
        quality: state.params.quality
      });
    }

    state.precip.update({
      dt_s: dt,
      time_s: state.simTime_s,
      cameraPos: state.camera.position,
      cameraQuat: state.camera.quaternion,
      windDirFrom_deg: wx.windDirFrom_deg,
      intensity: wx.precipIntensity,
      mode: wx.precipType === 'Snow' ? 'Snow' : (wx.precipType === 'Rain' ? 'Rain' : 'None'),
      visible: !underwater,
      surfaceY: surf.height_m
    });

    state.rainbow.update({
      dt_s: dt,
      center: state.camera.position,
      sunDir,
      sunElevation_rad: primaryElevation,
      precipIntensity: wx.precipIntensity,
      cloudCover: wx.cloudCover
    });

    state.splashes.update({
      dt_s: dt,
      origin: state.otter.position,
      surfaceY: surf.height_m,
      slope: surfEvent.slope,
      intensity: clamp(
        (
          clamp(wx.windSpeed_mps / 20, 0, 1) * (0.25 + 0.75 * clamp(wx.storminess + wx.hurricaneIntensity, 0, 1)) * (1.0 + 0.90 * crossSea01)
          + paddleImpulse01 * (0.20 + 0.25 * calmness)
          + state.otter.wetness01 * 0.25
        ),
        0,
        1
      ),
      windDirTo_rad: derived.windDirTo_rad,
      sprayBias01: clamp(state.otter.wetness01 * 0.7 + storminess * 0.25 + clamp(wx.windSpeed_mps / 30, 0, 1) * 0.2, 0, 1)
    });

    state.windSpray.update({
      dt_s: dt,
      time_s: state.simTime_s,
      center: state.camera.position,
      surfaceY: surf.height_m,
      windDirTo_rad: state.windDirTo_rad,
      windSpeed_mps: wx.windSpeed_mps,
      gustiness: wx.gustiness,
      storminess,
      rogueIntensity: rogueFx,
      visible: !underwater
    });

    state.audio.updateFrame(dt, { U10: wx.windSpeed_mps, Hs: state.seaHs_m, rain: wx.precipIntensity });

    state.params.derived_state = wx.stateName;
    state.params.derived_airTemp_C = Math.round(wx.airTemp_C * 10) / 10;
    state.params.derived_waterTemp_C = Math.round(wx.waterTemp_C * 10) / 10;
    state.params.derived_cloudCover = Math.round(wx.cloudCover * 100) / 100;
    state.params.derived_visibility_km = Math.round(wx.visibility_km * 10) / 10;
    state.params.derived_windSpeed_mps = Math.round(wx.windSpeed_mps * 10) / 10;
    state.params.derived_windBeaufort = Math.round(swellFromWind.beaufort * 10) / 10;
    state.params.derived_windDirFrom_deg = Math.round(wx.windDirFrom_deg);
    state.params.derived_precip = wx.precipType === 'None' ? 'None' : `${wx.precipType} (${Math.round(wx.precipIntensity * 100)}%)`;
    state.params.derived_Hs_m = Math.round(state.seaHs_m * 100) / 100;
    state.params.derived_Tp_s = Math.round(state.seaTp_s * 100) / 100;
    state.params.derived_swellHeight_m = Math.round(swellFromWind.swellHeight_m * 100) / 100;
    state.params.derived_swellWavelength_m = Math.round(swellFromWind.swellWavelength_m);
    state.params.derived_tideScale = Math.round(cel.tideScale * 1000) / 1000;

    const hh = Math.floor(state.timeOfDay_h);
    const mm = Math.floor((state.timeOfDay_h - hh) * 60);
    state.params.derived_clock = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
    if (wx.stormEta_h < 0) {
      state.params.derived_stormETA = '—';
    } else if (wx.stormEta_h >= 1.0) {
      state.params.derived_stormETA = `in ${Math.round(wx.stormEta_h * 10) / 10}h`;
    } else {
      state.params.derived_stormETA = `in ${Math.max(1, Math.round(wx.stormEta_h * 60))}m`;
    }
    state.params.derived_stormChanceEff_pct = wx.stormChanceEffective_pct;
    state.params.derived_hurricaneChanceEff_pct = wx.hurricaneChanceEffective_pct;

    const sunsetGrade = sunset;
    const warm = sunsetGrade * (1 - night * 0.55) * (1.0 - underwaterBlend);
    const gradeScale = state.params.reduceFlashes ? 0.65 : 1.0;
    const grainScale = state.params.reduceFlashes ? 0.4 : 1.0;
    const contrastScale = state.params.reduceFlashes ? 0.96 : 1.0;
    const baseGrain = state.params.quality === 'Max' ? 0.030 : (state.params.quality === 'High' ? 0.032 : 0.034);

    if (state.postFX.gradePass) {
      (state.postFX.gradePass as any).uniforms.toneMappingExposure.value = state.renderer.toneMappingExposure;
      (state.postFX.gradePass as any).uniforms.u_warmth.value = 0.22 * warm * gradeScale;
      (state.postFX.gradePass as any).uniforms.u_vignette.value = lerp(0.22, 0.12, underwaterBlend) * gradeScale;
      (state.postFX.gradePass as any).uniforms.u_saturation.value = lerp(1.04, 1.13, sunsetGrade) * lerp(1.0, 0.88, underwaterBlend) * contrastScale;
      (state.postFX.gradePass as any).uniforms.u_contrast.value = lerp(1.03, 1.08, sunsetGrade) * lerp(1.0, 0.92, underwaterBlend) * contrastScale;
    }

    if (state.postFX.grainPass) {
      (state.postFX.grainPass as any).uniforms.u_time.value = state.simTime_s;
      (state.postFX.grainPass as any).uniforms.u_strength.value = baseGrain * 0.07 * grainScale;
    }

    state.planarReflections.update({
      dt,
      dtEma_s,
      params: state.params,
      scene: state.scene,
      camera: state.camera,
      tideHeight_m,
      storminess,
      foamBoost,
      lightningFlashFx,
      underwater
    });

    state.perfOverlay.update(dt, {
      dt_ms: dt * 1000,
      dtEma_ms: dtEma_s * 1000,
      dtAvg_ms: dtAvg_s * 1000,
      fpsEma: 1 / Math.max(1e-6, dtEma_s),
      quality: state.params.quality,
      reflectionRT_px: state.planarReflections.planarRefl ? state.planarReflections.planarRefl.renderTarget.width : 0,
      reflectionUpdatesPerSec: state.planarReflections.reflUpdatesPerSec,
      envInterval_s,
      envAngleDelta_deg
    });

    if (state.postFX.composer) {
      state.postFX.composer.render();
    } else {
      state.renderer.render(state.scene, state.camera);
    }

    if (state.postFX.ssrPass && state.postFX.ssrPass.enabled) {
      const composer = state.postFX.composer as any;
      const ssrTarget = composer?.renderTarget2 ?? composer?.renderTarget1;
      if (ssrTarget) {
        (state.postFX.ssrPass as any).render(state.renderer, ssrTarget);
      }
    }
  }

  animate();
  return controls;
}

function lerpAngleRad(a: number, b: number, t: number): number {
  const da = ((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  return a + da * t;
}

function copyWaveComponent(dst: WaveComponent, src: WaveComponent): void {
  dst.dirX = src.dirX;
  dst.dirZ = src.dirZ;
  dst.A = src.A;
  dst.k = src.k;
  dst.omega = src.omega;
  dst.phase = src.phase;
  dst.Q = src.Q;
  dst.band = src.band;
}

// Blend swell vs chop energy with a wind-speed bias while keeping the silhouette stable.
function blendWaveSpectra(
  waves: WaveComponent[],
  windSpeed_mps: number,
  windSeaIntensity: number,
  swellIntensity: number
): void {
  const wind01 = clamp(windSpeed_mps / 18, 0, 1);
  const chopScaleBase = clamp(windSeaIntensity, 0, 2) * lerp(0.7, 1.25, wind01);
  const swellScale = clamp(swellIntensity, 0, 2);

  let chopEnergy = 0;
  let swellEnergy = 0;
  for (const w of waves) {
    if (w.omega < 0) continue;
    const e = w.A * w.A;
    if (waveHasAnyTag(w, ['chop'])) chopEnergy += e;
    else if (waveHasAnyTag(w, ['swell'])) swellEnergy += e;
  }

  const baseEnergy = chopEnergy + swellEnergy;
  if (baseEnergy <= 1e-8 || chopEnergy <= 1e-8) return;

  const targetEnergy = chopEnergy * chopScaleBase * chopScaleBase + swellEnergy * swellScale * swellScale;
  const maxBoost = 1.18;
  let chopScale = chopScaleBase;
  if (targetEnergy > baseEnergy * maxBoost) {
    chopScale *= Math.sqrt((baseEnergy * maxBoost) / targetEnergy);
  }
  if (Math.abs(chopScale - 1.0) < 1e-4) return;

  const waveCount = Math.max(1, waves.length);
  for (const w of waves) {
    if (!waveHasAnyTag(w, ['chop'])) continue;
    w.A *= chopScale;
    const safeQ = 1 / Math.max(1e-6, w.k * w.A * waveCount);
    if (w.Q > safeQ) w.Q = safeQ;
  }
}

function waveCountForQuality(q: AppParams['quality']): number {
  if (q === 'Max') return 32;
  if (q === 'High') return 32;
  if (q === 'Medium') return 24;
  return 16;
}
