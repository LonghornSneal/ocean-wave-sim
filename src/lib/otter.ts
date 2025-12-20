import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clamp, lerp, smoothstep } from './math';
import { mulberry32 } from './prng';
import type { WaveComponent } from './spectrum';
import { sampleGerstner, type WaveSampleOptions } from './waveSample';
import type { RogueWaveState, SeismicPulseState } from './wavePhysics';
import { applyOtterGazePose, applyOtterStormPose, setupOtterAnimations, updateOtterAnimations } from './otter/animations';
import { updateOtterGaze } from './otter/gaze';
import { applyOtterRainFx, applyOtterWetness, type WetMaterialEntry } from './otter/materials';
import { getOtterModelUrl, preloadOtterModels } from './otter/assets';
import { applyOtterModel, loadOtterModel } from './otter/model';
import { showOtterLoadError } from './otter/utils';
import type { RigNodes } from './otter/types';

THREE.Cache.enabled = true;

const EVENT_WAVE_SAMPLE: WaveSampleOptions = { includeTags: ['event'], applyCrestSharpness: true };
const CONTACT_MESH_NAMES = new Set(['Body', 'Back', 'Head', 'FlipperL', 'FlipperR', 'Tail']);
const SUBMERGE_MESH_NAMES = new Set(['Body', 'Head', 'Tail']);

type MorphBinding = {
  influences: number[];
  index: number;
};

type SubmergeMeshRef = {
  mesh: THREE.Mesh;
  centerX: number;
  centerZ: number;
  minY: number;
  maxY: number;
};

type MorphBindingSet = {
  blink: MorphBinding[];
  breath: MorphBinding[];
  twitch: MorphBinding[];
};

const BLINK_MORPH_DURATION_S = 0.18;
const BLINK_MORPH_WEIGHT = 0.85;
const BREATH_PERIOD_MIN_S = 3.8;
const BREATH_PERIOD_MAX_S = 5.6;
const BREATH_MIN_WEIGHT = 0.18;
const BREATH_MAX_WEIGHT = 0.28;
const TWITCH_TIMER_MIN_S = 2.6;
const TWITCH_TIMER_MAX_S = 5.4;
const TWITCH_MORPH_DURATION_S = 0.22;
const TWITCH_MIN_WEIGHT = 0.25;
const TWITCH_MAX_WEIGHT = 0.45;
const SLOPE_EVENT_BOOST_START = 0.18;
const SLOPE_EVENT_BOOST_END = 0.5;
const SLOPE_EVENT_BOOST_SCALE = 0.7;
const SLOPE_EVENT_BOOST_COOLDOWN_S = 0.22;
const SLOPE_EVENT_BOOST_DECAY = 4.5;

export interface OtterInputs {
  /** 0..1. Higher = more gaze changes, more random exploration. */
  otterosity: number;
  storminess: number; // 0..1
  /** 0..1. Internal “sea chaos” signal (gustiness + irregular waves). */
  waveChaos: number;
  /** Optional: wind direction the waves travel toward (radians). */
  windDirTo_rad?: number;
  /** Optional: interesting sky target (sun/moon), normalized world-space direction. */
  interestDir?: THREE.Vector3;
  /** Debug: pause animation pose updates. */
  freezePose?: boolean;
}

export interface OtterUpdateContext {
  dt_s: number;
  time_s: number;
  waves: WaveComponent[];
  currentXZ: THREE.Vector2;
  tideHeight_m: number;
  rogue?: RogueWaveState;
  pulse?: SeismicPulseState | null;
  /** 0..1; lower values damp wake/splash foam when pulse is active. */
  pulseFoamDamp?: number;
}

export type OtterLookMode = 'Horizon' | 'Sky' | 'Underwater';

/** Three performance tiers: Low, Medium (rim-cheat), High (GLB + optional fur silhouette). */
export type OtterAppearanceMode = 'Low' | 'Medium' | 'High';

export type OtterAnimationDetail = 'Full' | 'Simplified';

export type OtterAnimationDebugState = {
  lookMode: OtterLookMode;
  underwater: boolean;
  speed_mps: number;
  paddleWeight: number;
  paddleTimeScale: number;
  paddlePhase01: number | null;
  paddleImpulse01: number;
  blinkTimer_s: number;
  wetness01: number;
  actions: {
    dive: boolean;
    resurface: boolean;
    blink: boolean;
    whiskerTwitch: boolean;
  };
};

/**
 * P2 realism jump:
 * - Loads a real GLB (generated in this repo) via GLTFLoader
 * - AnimationMixer loops (idle + paddle + dive/resurface cue + blink)
 * - Wetness response (darken + roughness down when splashed/submerged)
 * - Improved buoyancy: multi-point wave sampling + tilt
 *
 * Notes:
 * - We keep hot-path allocations to ~0 by using module-scope temps.
 * - LOD GLBs are cached to avoid hitches when switching quality.
 */
export class SeaOtter {
  public readonly group: THREE.Group;
  public readonly position = new THREE.Vector3(0, 0, 0);
  public surfaceHeightFiltered_m = 0;

  /** Where the otter is looking (drives camera aim). */
  public readonly gazeDir = new THREE.Vector3(0, 0.08, -1).normalize();

  /** Where the otter is "facing" (drives stable third-person framing). */
  public readonly bodyForward = new THREE.Vector3(1, 0, 0);

  /** 0..1 short pulse, used to boost wake/splashes when paddling. */
  public paddleImpulse01 = 0;

  /** 0..1 boosted paddle impulse used for spray/foam. */
  public paddleImpulseBoost01 = 0;

  /** 0..1 impact pulse emitted on paddle stroke hits. */
  public strokeImpact01 = 0;

  /** 0..1 burst used for paddle-driven micro splashes. */
  public paddleSplashBurst01 = 0;

  /** 0..1+ slope magnitude from event-tagged waves (for FX). */
  public slopeEvent = 0;

  /** 0..1 wetness factor (darkening + shinier when wet). */
  public wetness01 = 0;

  public lookMode: OtterLookMode = 'Horizon';

  // Buoyancy vertical spring tuning (critical damping at ratio = 1).
  public static readonly BUOYANCY_SPRING_STIFFNESS_MIN = 36.0; // (6 rad/s)^2
  public static readonly BUOYANCY_SPRING_STIFFNESS_MAX = 225.0; // (15 rad/s)^2
  public static readonly BUOYANCY_SPRING_CHAOS_SCALE = 1.3;
  public static readonly BUOYANCY_SPRING_DAMPING_RATIO = 1.0;
  public static readonly BUOYANCY_SPRING_MAX_IMPULSE_MPS = 8.0;
  public static readonly BUOYANCY_SPRING_MAX_SPEED_MPS = 10.0;

  private readonly rng = mulberry32(133742);
  private readonly stormPhase = this.rng() * Math.PI * 2;
  private readonly stormPhase2 = this.rng() * Math.PI * 2;
  private lookTimer_s = 0;
  private blinkTimer_s = 2.8;
  private blinkMorphTime_s = -1;
  private twitchMorphTime_s = -1;
  private twitchTimer_s = 0;
  private twitchStrength = TWITCH_MIN_WEIGHT;
  private breathTimer_s = 0;
  private breathPeriod_s = BREATH_PERIOD_MIN_S;
  private breathStrength = BREATH_MIN_WEIGHT;
  private yaw = 0;

  // Gaze yaw offset is chosen occasionally and then smoothed.
  // (Avoid per-frame RNG jitter which makes the camera shake.)
  private gazeYawOffset = 0;
  private gazeYawOffsetTarget = 0;
  private headYaw = 0;
  private headPitch = 0;
  private neckYaw = 0;
  private neckPitch = 0;

  private submerge_m = 0;
  private submergence01 = 0;
  private splashCooldown_s = 0;
  // Separate short cooldown so paddle micro bursts can fire rapidly.
  private paddleSplashCooldown_s = 0;
  private slopeBoostCooldown_s = 0;
  private slopeBoostPulse01 = 0;

  private wetness = 0;
  private rainPulse = 0;
  private rainImpulse = 0;

  private appearanceMode: OtterAppearanceMode = 'High';
  private furSilhouette = true;
  private animationDetail: OtterAnimationDetail = 'Full';
  private secondaryMotion = true;
  private animUpdateInterval_s = 0;
  private animUpdateTimer_s = 0;

  private readonly loader = new GLTFLoader();
  private loadTicket = 0;
  private preloadStarted = false;

  private model: THREE.Object3D | null = null;
  private furObj: THREE.Object3D | null = null;

  private nodes: RigNodes = {};

  private readonly morphBindings: MorphBindingSet = {
    blink: [],
    breath: [],
    twitch: []
  };

  private mixer: THREE.AnimationMixer | null = null;
  private mixerRoot: THREE.Object3D | null = null;
  private idleAction: THREE.AnimationAction | null = null;
  private swimAction: THREE.AnimationAction | null = null;
  private diveGlideAction: THREE.AnimationAction | null = null;
  private paddleAction: THREE.AnimationAction | null = null;
  private underwaterSwimAction: THREE.AnimationAction | null = null;
  private diveAction: THREE.AnimationAction | null = null;
  private resurfaceAction: THREE.AnimationAction | null = null;
  private blinkAction: THREE.AnimationAction | null = null;
  private whiskerTwitchAction: THREE.AnimationAction | null = null;
  private wasUnderwater = false;

  private readonly paddlePeriod_s = 1.6;

  private readonly wetMats: WetMaterialEntry[] = [];
  private readonly contactMeshes: THREE.Mesh[] = [];
  private contactMeshesVersion = 0;
  private readonly submergeMeshRefs: SubmergeMeshRef[] = [];

  // Buoyancy sampling extents (in meters, around otter center)
  private readonly buoySampleFwd_m = 0.42;
  private readonly buoySampleSide_m = 0.28;
  // Head/torso anchors along the forward axis (meters).
  private readonly buoyHeadOffset_m = 0.48;
  private readonly buoyTorsoOffset_m = -0.06;
  private readonly buoyHeadBias = 0.68;
  private readonly buoyHeadBlend = 0.45;
  private readonly buoyHeadPitchBlend = 0.45;
  private readonly buoyHeadTorsoSmoothRate = 6.0;

  // Buoyancy weighting defaults (tweak for stability vs responsiveness).
  // - Center sample stabilizes bobbing.
  // - Forward/back weights ramp up with speed to emphasize travel direction.
  // Defaults: center 0.9, sides 1.0, fwd/back 1.0->1.35 by 0.18 m/s.
  private readonly buoyWeightCenter = 0.9;
  private readonly buoyWeightSide = 1.0;
  private readonly buoyWeightFwdBackRest = 1.0;
  private readonly buoyWeightFwdBackMove = 1.35;
  private readonly buoyWeightSpeed_mps = 0.18;

  // Low-speed pitch/roll smoothing to reduce idle jitter.
  private readonly buoyPitchRollLowpassSpeed_mps = 0.18;
  private readonly buoyPitchRollLowpassRate = 2.0;
  private readonly buoyPitchRollHighpassRate = 60.0;

  // Vertical float offset so head stays above surface at rest.
  private readonly floatOffset_m = 0.05;
  private readonly bodyWaterlineOffset_m = 0.12;

  // Internal speed estimate (m/s)
  private readonly prevXZ = new THREE.Vector2(0, 0);
  // Track wave orbital displacement so the otter can be "carried" / thrashed by
  // the sea without drifting off infinitely (we apply the *delta* each frame).
  private readonly prevWaveDispXZ = new THREE.Vector2(0, 0);
  private readonly velocityXZ = new THREE.Vector2(0, 0);
  private waveDispInit = false;
  private speed_mps = 0;
  private buoyancyVel_mps = 0;
  private pitchRollInit = false;
  private pitchFiltered = 0;
  private rollFiltered = 0;
  private headTorsoDiff_m = 0;
  private flipperYawOffset = 0;
  private flipperRollOffset = 0;
  private flipperStrokeBoost01 = 0;
  private readonly filteredWaveNormal = new THREE.Vector3(0, 1, 0);
  private filteredWaveHeight_m = 0;
  private waveFilterInit = false;

  // Wave sampling temps
  private readonly tmpWaveSample = {
    height_m: 0,
    normal: new THREE.Vector3(),
    disp: new THREE.Vector3(),
    slope: 0,
    orbitalVelY_mps: 0
  };
  private readonly tmpWaveT = new THREE.Vector3();
  private readonly tmpWaveB = new THREE.Vector3();

  // Reusable temps (no per-frame allocations)
  private readonly tmpV2a = new THREE.Vector2();
  private readonly tmpV2b = new THREE.Vector2();
  private readonly tmpV2c = new THREE.Vector2();
  private readonly tmpV2d = new THREE.Vector2();
  private readonly tmpV2e = new THREE.Vector2();
  private readonly tmpV2f = new THREE.Vector2();
  private readonly tmpV2g = new THREE.Vector2();
  private readonly tmpV3a = new THREE.Vector3();
  private readonly tmpV3b = new THREE.Vector3();
  private readonly tmpV3c = new THREE.Vector3();
  private readonly tmpWaveNormal = new THREE.Vector3();
  private readonly tmpQuatA = new THREE.Quaternion();
  private readonly tmpQuatB = new THREE.Quaternion();
  private readonly tmpQuatC = new THREE.Quaternion();
  private readonly up = new THREE.Vector3(0, 1, 0);

  private readonly tmpWetCol = new THREE.Color();

  // Fallback offsets (used before GLB finishes loading)
  private readonly fallbackEyeOffset = new THREE.Vector3(0, 0.86, 0.10);
  private readonly fallbackHeadOffset = new THREE.Vector3(0, 0.95, 0.05);

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'SeaOtter';

    // Placeholder so there is always something visible while GLB loads.
    const placeholderMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#4e3924'),
      roughness: 0.98,
      metalness: 0.0,
      flatShading: true
    });
    const placeholderGeo = new THREE.SphereGeometry(0.34, 8, 8);
    const placeholder = new THREE.Mesh(placeholderGeo, placeholderMat);
    placeholder.name = '__placeholder';
    placeholder.position.set(0, 0.48, 0);
    this.group.add(placeholder);

    this.group.position.copy(this.position);
    this.prevXZ.set(0, 0);
    this.resetMorphState();

    this.loadModel(this.appearanceMode, this.furSilhouette);
    this.preloadAllModels();
  }

  public setAppearance(mode: OtterAppearanceMode, furSilhouette: boolean): void {
    const wantFur = mode === 'High' && furSilhouette;

    if (mode === this.appearanceMode) {
      this.furSilhouette = wantFur;
      if (this.furObj) this.furObj.visible = wantFur;
      return;
    }

    this.loadModel(mode, wantFur);
  }

  public setAnimationDetail(detail: OtterAnimationDetail, clipRateHz = 0): void {
    const interval = (detail === 'Simplified' && clipRateHz > 0) ? (1 / clipRateHz) : 0;
    const nextSecondary = detail === 'Full';
    if (detail === this.animationDetail && interval === this.animUpdateInterval_s && nextSecondary === this.secondaryMotion) {
      return;
    }

    const wasSecondary = this.secondaryMotion;
    this.animationDetail = detail;
    this.secondaryMotion = nextSecondary;
    this.animUpdateInterval_s = interval;
    this.animUpdateTimer_s = 0;

    if (wasSecondary && !nextSecondary) {
      this.blinkAction?.stop();
      this.whiskerTwitchAction?.stop();
      this.applyMorphBindings(this.morphBindings.blink, 0);
      this.applyMorphBindings(this.morphBindings.breath, 0);
      this.applyMorphBindings(this.morphBindings.twitch, 0);
      this.blinkMorphTime_s = -1;
      this.twitchMorphTime_s = -1;
    } else if (!wasSecondary && nextSecondary) {
      this.resetMorphState();
    }
  }

  public reset(): void {
    this.position.set(0, 0, 0);
    this.gazeDir.set(0, 0.08, -1).normalize();
    this.bodyForward.set(1, 0, 0);
    this.lookMode = 'Horizon';
    this.lookTimer_s = 0;
    this.blinkTimer_s = 2.8 + this.rng() * 3.2;
    this.resetMorphState();
    this.yaw = 0;
    this.gazeYawOffset = 0;
    this.gazeYawOffsetTarget = 0;
    this.headYaw = 0;
    this.headPitch = 0;
    this.neckYaw = 0;
    this.neckPitch = 0;
    this.submerge_m = 0;
    this.submergence01 = 0;
    this.splashCooldown_s = 0;
    this.paddleSplashCooldown_s = 0;
    this.slopeBoostCooldown_s = 0;
    this.slopeBoostPulse01 = 0;
    this.wetness = 0;
    this.wetness01 = 0;
    this.paddleImpulse01 = 0;
    this.rainPulse = 0;
    this.rainImpulse = 0;
    this.strokeImpact01 = 0;
    this.paddleSplashBurst01 = 0;
    this.slopeEvent = 0;
    this.prevXZ.set(0, 0);
    this.prevWaveDispXZ.set(0, 0);
    this.velocityXZ.set(0, 0);
    this.waveDispInit = false;
    this.speed_mps = 0;
    this.buoyancyVel_mps = 0;
    this.headTorsoDiff_m = 0;
    this.flipperYawOffset = 0;
    this.flipperRollOffset = 0;
    this.flipperStrokeBoost01 = 0;
    this.filteredWaveNormal.set(0, 1, 0);
    this.filteredWaveHeight_m = 0;
    this.waveFilterInit = false;
    this.animUpdateTimer_s = 0;

    this.group.position.copy(this.position);
    this.group.quaternion.identity();

    if (this.idleAction) this.idleAction.reset().play();
    if (this.swimAction) this.swimAction.reset().play();
    if (this.diveGlideAction) this.diveGlideAction.reset().play();
    if (this.paddleAction) this.paddleAction.reset().play();
    if (this.underwaterSwimAction) this.underwaterSwimAction.reset().play();
  }

  public receiveRainHit(strength01: number): void {
    const hit = clamp(strength01, 0, 1);
    if (hit <= 0) return;
    this.rainImpulse = clamp(this.rainImpulse + hit, 0, 1);
  }

  public getEyeWorldPosition(out = new THREE.Vector3()): THREE.Vector3 {
    if (this.nodes.eyeL) return this.nodes.eyeL.getWorldPosition(out);
    return out.copy(this.fallbackEyeOffset).applyMatrix4(this.group.matrixWorld);
  }

  public getHeadWorldPosition(out = new THREE.Vector3()): THREE.Vector3 {
    if (this.nodes.head) return this.nodes.head.getWorldPosition(out);
    return out.copy(this.fallbackHeadOffset).applyMatrix4(this.group.matrixWorld);
  }

  public getContactMeshes(): THREE.Mesh[] {
    return this.contactMeshes;
  }

  public getContactMeshesVersion(): number {
    return this.contactMeshesVersion;
  }

  public getRigNodes(): Readonly<RigNodes> {
    return this.nodes;
  }

  public getAnimationDebugState(): OtterAnimationDebugState {
    const paddleWeight = this.paddleAction?.getEffectiveWeight?.() ?? this.paddleAction?.weight ?? 0;
    const paddleTimeScale = this.paddleAction?.getEffectiveTimeScale?.() ?? this.paddleAction?.timeScale ?? 0;
    const paddlePhase = this.paddleAction ? ((this.paddleAction.time % this.paddlePeriod_s) / this.paddlePeriod_s) : null;
    return {
      lookMode: this.lookMode,
      underwater: this.isUnderwaterView(),
      speed_mps: this.speed_mps,
      paddleWeight,
      paddleTimeScale,
      paddlePhase01: paddlePhase === null ? null : clamp(paddlePhase, 0, 1),
      paddleImpulse01: this.paddleImpulse01,
      blinkTimer_s: this.blinkTimer_s,
      wetness01: this.wetness01,
      actions: {
        dive: this.diveAction?.isRunning?.() ?? false,
        resurface: this.resurfaceAction?.isRunning?.() ?? false,
        blink: this.blinkAction?.isRunning?.() ?? false,
        whiskerTwitch: this.whiskerTwitchAction?.isRunning?.() ?? false
      }
    };
  }

  public isUnderwaterView(): boolean {
    // Being curious and *looking* underwater is not the same as the camera
    // actually going underwater. We only report "underwater view" when the otter
    // is physically submerged enough to justify underwater optics.
    return this.submerge_m > 0.28;
  }

  public update(inp: OtterInputs, ctx: OtterUpdateContext): void {
    const dt = ctx.dt_s;
    const storm = clamp(inp.storminess, 0, 1);
    const chaos = clamp(inp.waveChaos, 0, 1);
    const otterosity = clamp(inp.otterosity, 0, 1);
    const stormFocus = clamp((storm - 0.35) / 0.45, 0, 1);
    const freezePose = !!inp.freezePose;

    this.lookTimer_s -= dt;
    this.blinkTimer_s -= dt;
    this.splashCooldown_s = Math.max(0, this.splashCooldown_s - dt);
    this.paddleSplashCooldown_s = Math.max(0, this.paddleSplashCooldown_s - dt);
    this.slopeBoostCooldown_s = Math.max(0, this.slopeBoostCooldown_s - dt);
    this.slopeBoostPulse01 = lerp(this.slopeBoostPulse01, 0, clamp(dt * 6.0, 0, 1));
    this.rainPulse = lerp(this.rainPulse, 0, clamp(dt * 2.2, 0, 1));
    if (this.rainImpulse > 0) {
      this.rainPulse = clamp(this.rainPulse + this.rainImpulse, 0, 1);
      this.rainImpulse = 0;
    }

    // --- Drift + wander (calmer baseline to reduce camera shake) ---
    const drift = this.tmpV2a.set(ctx.currentXZ.x, ctx.currentXZ.y);
    const wander = (this.rng() * 2 - 1) * 0.014 * (0.25 + 0.75 * chaos);
    // Make wander framerate-independent. (The old code added per-frame noise which
    // changes behavior dramatically with FPS and causes extra camera jitter.)
    this.yaw += wander * dt * 60.0;

    const wanderVec = this.tmpV2b.set(Math.cos(this.yaw), Math.sin(this.yaw)).multiplyScalar(0.028);
    drift.add(wanderVec);

    this.velocityXZ.addScaledVector(drift, dt);

    const speed = this.velocityXZ.length();
    const submerge01 = clamp(0.4 + this.submerge_m * 0.7, 0.4, 1);
    const dragCoeff = 15.0 * submerge01 * (1 + storm * 0.2);
    const dragSpeed = Math.max(speed, 0.05);
    const dragStep = clamp((dragCoeff * speed * speed * dt) / dragSpeed, 0, 0.9);
    this.velocityXZ.addScaledVector(this.velocityXZ, -dragStep);

    this.position.x += this.velocityXZ.x * dt;
    this.position.z += this.velocityXZ.y * dt;

    // --- Wave carry / thrash ---
    // Use the *delta* in Gerstner horizontal displacement so the otter is
    // visibly tossed around by colliding wave trains, without accumulating a
    // permanent bias.
    const carry = clamp(0.28 + 1.55 * storm + 1.25 * chaos, 0.22, 3.1);
    const pCxz = this.tmpV2c.set(this.position.x, this.position.z);
    sampleGerstner(ctx.waves, pCxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse);
    const dxDisp = this.tmpWaveSample.disp.x - this.prevWaveDispXZ.x;
    const dzDisp = this.tmpWaveSample.disp.z - this.prevWaveDispXZ.y;
    if (this.waveDispInit) {
      // Clamp the per-frame kick so very low FPS doesn't teleport the otter.
      this.position.x += clamp(dxDisp, -1.8, 1.8) * carry;
      this.position.z += clamp(dzDisp, -1.8, 1.8) * carry;
    } else {
      this.waveDispInit = true;
    }
    this.prevWaveDispXZ.set(this.tmpWaveSample.disp.x, this.tmpWaveSample.disp.z);

    this.bodyForward.set(Math.cos(this.yaw), 0, Math.sin(this.yaw)).normalize();

    // Speed estimate
    if (dt > 1e-6) {
      const dx = this.position.x - this.prevXZ.x;
      const dz = this.position.z - this.prevXZ.y;
      this.speed_mps = Math.sqrt(dx * dx + dz * dz) / dt;
    } else {
      this.speed_mps = 0;
    }
    this.prevXZ.set(this.position.x, this.position.z);

    // --- Buoyancy: multi-point wave sampling ---
    const fwd = this.bodyForward;
    const right = this.tmpV3a.set(-fwd.z, 0, fwd.x).normalize();

    const weightMove01 = smoothstep(0.0, this.buoyWeightSpeed_mps, this.speed_mps);
    const fwdBackWeight = lerp(this.buoyWeightFwdBackRest, this.buoyWeightFwdBackMove, weightMove01);
    const sideWeight = this.buoyWeightSide;
    const centerWeight = this.buoyWeightCenter;
    const weightSum = Math.max(1e-4, fwdBackWeight * 2 + sideWeight * 2 + centerWeight);

    const pFxz = this.tmpV2a.set(this.position.x + fwd.x * this.buoySampleFwd_m, this.position.z + fwd.z * this.buoySampleFwd_m);
    const pBxz = this.tmpV2b.set(this.position.x - fwd.x * this.buoySampleFwd_m, this.position.z - fwd.z * this.buoySampleFwd_m);
    const pCxzBuoy = this.tmpV2e.set(this.position.x, this.position.z);
    const waveNormal = this.tmpWaveNormal.set(0, 0, 0);
    let sample = sampleGerstner(ctx.waves, pFxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse);
    const hF = sample.height_m;
    const vF = sample.orbitalVelY_mps;
    waveNormal.addScaledVector(sample.normal, fwdBackWeight);
    sample = sampleGerstner(ctx.waves, pBxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse);
    const hB = sample.height_m;
    const vB = sample.orbitalVelY_mps;
    waveNormal.addScaledVector(sample.normal, fwdBackWeight);

    const pLxz = this.tmpV2c.set(this.position.x - right.x * this.buoySampleSide_m, this.position.z - right.z * this.buoySampleSide_m);
    const pRxz = this.tmpV2d.set(this.position.x + right.x * this.buoySampleSide_m, this.position.z + right.z * this.buoySampleSide_m);
    sample = sampleGerstner(ctx.waves, pLxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse);
    const hL = sample.height_m;
    const vL = sample.orbitalVelY_mps;
    waveNormal.addScaledVector(sample.normal, sideWeight);
    sample = sampleGerstner(ctx.waves, pRxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse);
    const hR = sample.height_m;
    const vR = sample.orbitalVelY_mps;
    waveNormal.addScaledVector(sample.normal, sideWeight);

    sample = sampleGerstner(ctx.waves, pCxzBuoy, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse);
    const hC = sample.height_m;
    const vC = sample.orbitalVelY_mps;
    waveNormal.addScaledVector(sample.normal, centerWeight);

    if (waveNormal.lengthSq() > 1e-6) waveNormal.multiplyScalar(1.0 / weightSum).normalize();
    else waveNormal.set(0, 1, 0);

    const hAvg = (hF * fwdBackWeight + hB * fwdBackWeight + hL * sideWeight + hR * sideWeight + hC * centerWeight) / weightSum;
    const orbitalVelY = (vF * fwdBackWeight + vB * fwdBackWeight + vL * sideWeight + vR * sideWeight + vC * centerWeight) / weightSum;

    const pitchRaw = (hF - hB) / Math.max(1e-4, 2.0 * this.buoySampleFwd_m);
    const rollRaw = (hR - hL) / Math.max(1e-4, 2.0 * this.buoySampleSide_m);
    const pitchRollSpeed01 = smoothstep(0.0, this.buoyPitchRollLowpassSpeed_mps, this.speed_mps);
    const pitchRollRate = lerp(this.buoyPitchRollLowpassRate, this.buoyPitchRollHighpassRate, pitchRollSpeed01);
    const pitchRollBlend = clamp(dt * pitchRollRate, 0, 1);
    if (!this.pitchRollInit) {
      this.pitchFiltered = pitchRaw;
      this.rollFiltered = rollRaw;
      this.pitchRollInit = true;
    } else {
      this.pitchFiltered = lerp(this.pitchFiltered, pitchRaw, pitchRollBlend);
      this.rollFiltered = lerp(this.rollFiltered, rollRaw, pitchRollBlend);
    }

    const pHeadXz = this.tmpV2f.set(this.position.x + fwd.x * this.buoyHeadOffset_m, this.position.z + fwd.z * this.buoyHeadOffset_m);
    const pTorsoXz = this.tmpV2g.set(this.position.x + fwd.x * this.buoyTorsoOffset_m, this.position.z + fwd.z * this.buoyTorsoOffset_m);
    const hHeadRaw = sampleGerstner(ctx.waves, pHeadXz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse).height_m;
    const hTorso = sampleGerstner(ctx.waves, pTorsoXz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse).height_m;
    const headTorsoDiffTarget = hHeadRaw - hTorso;
    const headTorsoBlend = clamp(1 - Math.exp(-dt * this.buoyHeadTorsoSmoothRate), 0, 1);
    this.headTorsoDiff_m = lerp(this.headTorsoDiff_m, headTorsoDiffTarget, headTorsoBlend);
    const hHead = hTorso + this.headTorsoDiff_m;
    const hAnchor = lerp(hTorso, hHead, this.buoyHeadBias);
    const hBuoy = lerp(hAvg, hAnchor, this.buoyHeadBlend);
    const headTorsoSpan = Math.max(1e-4, Math.abs(this.buoyHeadOffset_m - this.buoyTorsoOffset_m));
    const pitchHead = this.headTorsoDiff_m / headTorsoSpan;
    const pitch = lerp(this.pitchFiltered, pitchHead, this.buoyHeadPitchBlend);
    const roll = this.rollFiltered;

    const nRaw = this.tmpV3b
      .copy(this.up)
      .addScaledVector(fwd, -pitch)
      .addScaledVector(right, -roll)
      .normalize();
    const waveSmoothRate = lerp(4.0, 12.0, storm);
    const waveSmoothAlpha = clamp(1 - Math.exp(-dt * waveSmoothRate), 0, 1);
    if (!this.waveFilterInit) {
      this.filteredWaveNormal.copy(nRaw);
      this.filteredWaveHeight_m = hBuoy;
      this.waveFilterInit = true;
    } else {
      this.filteredWaveNormal.lerp(nRaw, waveSmoothAlpha);
      if (this.filteredWaveNormal.lengthSq() > 1e-6) this.filteredWaveNormal.normalize();
      else this.filteredWaveNormal.set(0, 1, 0);
      this.filteredWaveHeight_m = lerp(this.filteredWaveHeight_m, hBuoy, waveSmoothAlpha);
    }

    const submergedRatio = this.computeSubmergedRatio(hAvg);
    const floatOffsetScale = lerp(1.0, 0.6, submergedRatio);
    const submergeAccumScale = lerp(1.0, 1.25, submergedRatio);

    // Wave-normal-driven flipper offsets + stroke boost, damped on flat water.
    const pitchN = -waveNormal.dot(fwd);
    const rollN = -waveNormal.dot(right);
    const slopeMag = Math.sqrt(pitchN * pitchN + rollN * rollN);
    const flipperGate = smoothstep(0.03, 0.12, slopeMag);
    const yawTarget = clamp(pitchN * 0.7, -0.35, 0.35) * flipperGate;
    const rollTarget = clamp(rollN * 0.9, -0.45, 0.45) * flipperGate;
    const flipperBlend = clamp(dt * lerp(3.0, 10.0, flipperGate), 0, 1);
    this.flipperYawOffset = lerp(this.flipperYawOffset, yawTarget, flipperBlend);
    this.flipperRollOffset = lerp(this.flipperRollOffset, rollTarget, flipperBlend);
    const strokeBoostTarget = smoothstep(0.06, 0.20, slopeMag);
    this.flipperStrokeBoost01 = lerp(this.flipperStrokeBoost01, strokeBoostTarget, clamp(dt * 2.5, 0, 1));

    const hFEvent = sampleGerstner(ctx.waves, pFxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse, EVENT_WAVE_SAMPLE).height_m;
    const hBEvent = sampleGerstner(ctx.waves, pBxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse, EVENT_WAVE_SAMPLE).height_m;
    const hLEvent = sampleGerstner(ctx.waves, pLxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse, EVENT_WAVE_SAMPLE).height_m;
    const hREvent = sampleGerstner(ctx.waves, pRxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse, EVENT_WAVE_SAMPLE).height_m;

    const pitchEvent = (hFEvent - hBEvent) / Math.max(1e-4, 2.0 * this.buoySampleFwd_m);
    const rollEvent = (hREvent - hLEvent) / Math.max(1e-4, 2.0 * this.buoySampleSide_m);
    const slopeEvent = Math.min(1.2, Math.sqrt(pitchEvent * pitchEvent + rollEvent * rollEvent));
    this.slopeEvent = slopeEvent;
    const slopeBoost = smoothstep(0.20, 0.38, slopeEvent);
    if (slopeBoost > 0.001 && this.slopeBoostCooldown_s <= 0) {
      this.slopeBoostPulse01 = Math.max(this.slopeBoostPulse01, slopeBoost);
      this.slopeBoostCooldown_s = 0.22;
    }
    const orbitalGate = smoothstep(0.05, 0.2, slopeEvent);
    const orbitalVelMax = lerp(0.8, 3.0, storm);
    const orbitalVelClamped = clamp(orbitalVelY, -orbitalVelMax, orbitalVelMax);
    const orbitalLead_m = orbitalVelClamped * lerp(0.05, 0.12, storm) * orbitalGate;

    // --- Splash/submerge events ---
    const hitChance = clamp((slopeEvent - 0.16) / 0.35, 0, 1) * (0.15 + 0.85 * storm);
    if (this.splashCooldown_s <= 0 && this.rng() < hitChance * dt) {
      this.submerge_m = Math.max(this.submerge_m, lerp(0.18, 1.05, storm) * submergeAccumScale);
      this.splashCooldown_s = lerp(4.5, 0.9, storm);
    }

    // Recover toward surface
    this.submerge_m = lerp(this.submerge_m, 0, clamp(dt * lerp(0.45, 1.6, 1 - storm), 0, 1));

    // Vertical placement
    const surfaceOffset = lerp(this.floatOffset_m, -0.14, storm);
    const underwaterOffset = surfaceOffset - lerp(0.06, 0.12, storm);
    const floatOffset = lerp(surfaceOffset, underwaterOffset, this.submergence01) * floatOffsetScale;
    const targetY = this.filteredWaveHeight_m + floatOffset - this.submerge_m + orbitalLead_m;
    const kBase = lerp(SeaOtter.BUOYANCY_SPRING_STIFFNESS_MIN, SeaOtter.BUOYANCY_SPRING_STIFFNESS_MAX, storm);
    const stiffness = kBase * lerp(1.0, SeaOtter.BUOYANCY_SPRING_CHAOS_SCALE, chaos);
    const omega = Math.sqrt(stiffness);
    const damping = 2 * omega * SeaOtter.BUOYANCY_SPRING_DAMPING_RATIO;
    const offset = targetY - this.position.y;
    const accel = offset * stiffness - damping * this.buoyancyVel_mps;
    const dv = clamp(
      accel * dt,
      -SeaOtter.BUOYANCY_SPRING_MAX_IMPULSE_MPS,
      SeaOtter.BUOYANCY_SPRING_MAX_IMPULSE_MPS
    );
    this.buoyancyVel_mps = clamp(
      this.buoyancyVel_mps + dv,
      -SeaOtter.BUOYANCY_SPRING_MAX_SPEED_MPS,
      SeaOtter.BUOYANCY_SPRING_MAX_SPEED_MPS
    );
    this.position.y += this.buoyancyVel_mps * dt;

    // Orientation
    const n = this.tmpV3c.copy(this.filteredWaveNormal);
    const stormWobble = storm * (0.10 + 0.12 * chaos);
    if (stormWobble > 0.001) {
      const wobbleA = Math.sin(ctx.time_s * (1.6 + 1.1 * chaos) + this.stormPhase) * stormWobble;
      const wobbleB = Math.cos(ctx.time_s * (2.1 + 1.4 * chaos) + this.stormPhase2) * stormWobble * 0.8;
      n.addScaledVector(fwd, wobbleA).addScaledVector(right, wobbleB).normalize();
    }
    const qUp = this.tmpQuatA.setFromUnitVectors(this.up, n);
    const qYaw = this.tmpQuatB.setFromAxisAngle(this.up, this.yaw);
    const qTarget = this.tmpQuatC.copy(qYaw).multiply(qUp);
    const rRate = lerp(3.0, 10.0, storm) * lerp(1.0, 1.2, chaos);
    this.group.quaternion.slerp(qTarget, clamp(dt * rRate, 0, 1));
    this.group.position.copy(this.position);

    const depthSample_m = hC - (this.position.y - this.bodyWaterlineOffset_m);
    const depth01 = smoothstep(0.1, 0.5, depthSample_m);
    const submerge01 = smoothstep(0.12, 0.6, this.submerge_m);
    const targetSubmergence01 = clamp(Math.max(depth01, submerge01), 0, 1);
    const submergeRate = targetSubmergence01 > this.submergence01 ? 4.0 : 2.0;
    this.submergence01 = lerp(this.submergence01, targetSubmergence01, clamp(dt * submergeRate, 0, 1));

    const gazeState = updateOtterGaze({
      dt,
      storm,
      otterosity,
      stormFocus,
      yaw: this.yaw,
      rng: this.rng,
      windDirTo_rad: inp.windDirTo_rad,
      interestDir: inp.interestDir,
      lookMode: this.lookMode,
      lookTimer_s: this.lookTimer_s,
      gazeYawOffset: this.gazeYawOffset,
      gazeYawOffsetTarget: this.gazeYawOffsetTarget,
      gazeDir: this.gazeDir,
      tmpGazeTarget: this.tmpV3c
    });
    this.lookMode = gazeState.lookMode;
    this.lookTimer_s = gazeState.lookTimer_s;
    this.gazeYawOffset = gazeState.gazeYawOffset;
    this.gazeYawOffsetTarget = gazeState.gazeYawOffsetTarget;
    const headSmooth = clamp(dt * 7.5, 0, 1);
    const neckSmooth = clamp(dt * 5.5, 0, 1);
    this.headYaw = lerp(this.headYaw, gazeState.headYawTarget, headSmooth);
    this.headPitch = lerp(this.headPitch, gazeState.headPitchTarget, headSmooth);
    this.neckYaw = lerp(this.neckYaw, gazeState.neckYawTarget, neckSmooth);
    this.neckPitch = lerp(this.neckPitch, gazeState.neckPitchTarget, neckSmooth);

    // --- Animations ---
    if (!freezePose) {
      const animDt = this.consumeAnimUpdateDt(dt);
      const didUpdatePose = animDt > 0;
      const blinkTriggered = this.blinkTimer_s <= 0;
      this.updateAnimations(animDt, storm, chaos, otterosity, ctx.time_s);
      this.updateMorphTargets(animDt, blinkTriggered, this.secondaryMotion);
      const pulseFoamDamp = clamp(ctx.pulseFoamDamp ?? 1.0, 0.0, 1.0);
      this.paddleImpulse01 *= pulseFoamDamp;
      if (this.slopeBoostPulse01 > 0) {
        const impulseGate = smoothstep(0.25, 0.55, this.paddleImpulse01);
        if (impulseGate > 0) {
          const boostScale = 1 + this.slopeBoostPulse01 * 0.6 * impulseGate;
          this.paddleImpulse01 = clamp(this.paddleImpulse01 * boostScale, 0, 1);
        }
      }
      if (this.secondaryMotion && didUpdatePose) {
        this.applyStormPose(ctx.time_s, storm, chaos);
      }
      if (didUpdatePose) {
        applyOtterGazePose({
          nodes: this.nodes,
          headYaw: this.headYaw,
          headPitch: this.headPitch,
          neckYaw: this.neckYaw,
          neckPitch: this.neckPitch
        });
        this.applyFlipperWavePose();
      }
      const strokeBurst = clamp(this.strokeImpact01 * pulseFoamDamp, 0, 1);
      if (strokeBurst > 0.001 && this.paddleSplashCooldown_s <= 0) {
        this.paddleSplashBurst01 = strokeBurst;
        this.paddleSplashCooldown_s = lerp(0.08, 0.18, storm);
      } else {
        this.paddleSplashBurst01 = 0;
      }
    } else {
      this.paddleSplashBurst01 = 0;
    }

    // --- Wetness ---
    const wetTargetScale = lerp(0.9, 1.2, submergedRatio);
    const wetTarget = clamp((this.submerge_m * 1.25 + this.paddleImpulse01 * 0.28 + storm * 0.25) * wetTargetScale, 0, 1);
    const wetRate = wetTarget > this.wetness ? 2.5 : 0.25;
    this.wetness = lerp(this.wetness, wetTarget, clamp(dt * wetRate, 0, 1));
    this.wetness01 = this.wetness;
    this.applyWetnessToMaterials(this.wetness);
    applyOtterRainFx({ wetMats: this.wetMats, rainPulse: this.rainPulse, time_s: ctx.time_s });
  }

  private computeSubmergedRatio(waterHeight_m: number): number {
    const refs = this.submergeMeshRefs;
    if (refs.length === 0) return 0;
    let sum = 0;
    for (let i = 0; i < refs.length; i += 1) {
      const ref = refs[i];
      const e = ref.mesh.matrixWorld.elements;
      const worldMinY = e[1] * ref.centerX + e[5] * ref.minY + e[9] * ref.centerZ + e[13];
      const worldMaxY = e[1] * ref.centerX + e[5] * ref.maxY + e[9] * ref.centerZ + e[13];
      const low = Math.min(worldMinY, worldMaxY);
      const high = Math.max(worldMinY, worldMaxY);
      const denom = Math.max(1e-4, high - low);
      sum += clamp((waterHeight_m - low) / denom, 0, 1);
    }
    return sum / refs.length;
  }

  private consumeAnimUpdateDt(dt: number): number {
    if (this.animUpdateInterval_s <= 0) return dt;
    this.animUpdateTimer_s += dt;
    if (this.animUpdateTimer_s < this.animUpdateInterval_s) return 0;
    const stepDt = this.animUpdateTimer_s;
    this.animUpdateTimer_s = 0;
    return stepDt;
  }

  private updateAnimations(dt: number, storm: number, chaos: number, otterosity: number, time_s: number): void {
    const move01 = clamp(this.speed_mps / 0.18, 0, 1);
    const speed01 = clamp(this.speed_mps / 0.3, 0, 1);
    const submergence01 = clamp(this.submergence01, 0, 1);
    const storminess01 = clamp(storm, 0, 1);
    const impulse01 = clamp(this.paddleImpulse01, 0, 1);
    const stormDrive = clamp(0.18 + 0.95 * (storm * 0.65 + chaos * 0.6), 0, 1);

    // Map speed + paddle impulse into idle -> cruise -> sprint controls.
    const cruise01 = clamp(move01 * (0.55 + 0.45 * stormDrive), 0, 1);
    const sprint01 = clamp((move01 - 0.55) / 0.35 + impulse01 * 0.25 + stormDrive * 0.1, 0, 1);
    let locomotionBlend01 = clamp(stormDrive * (0.25 + 0.75 * cruise01) + impulse01 * 0.15, 0, 1);
    const strokeBoost = clamp(this.flipperStrokeBoost01, 0, 1);
    locomotionBlend01 = clamp(locomotionBlend01 + strokeBoost * 0.25, 0, 1);
    const strokeRate = lerp(0.7, 1.8, clamp(lerp(cruise01, 1.0, sprint01), 0, 1));

    const result = updateOtterAnimations({
      dt,
      time_s,
      storm,
      otterosity,
      nodes: this.nodes,
      paddlePeriod_s: this.paddlePeriod_s,
      mixer: this.mixer,
      idleAction: this.idleAction,
      swimAction: this.swimAction,
      diveGlideAction: this.diveGlideAction,
      paddleAction: this.paddleAction,
      underwaterSwimAction: this.underwaterSwimAction,
      diveAction: this.diveAction,
      resurfaceAction: this.resurfaceAction,
      blinkAction: this.blinkAction,
      whiskerTwitchAction: this.whiskerTwitchAction,
      speed01,
      submergence01,
      storminess01,
      locomotionBlend01,
      strokeRate,
      waveStrokeBoost01: strokeBoost,
      paddleImpulse01: this.paddleImpulse01,
      blinkTimer_s: this.blinkTimer_s,
      wasUnderwater: this.wasUnderwater,
      isUnderwaterView: this.isUnderwaterView(),
      rng: this.rng,
      secondaryMotion: this.secondaryMotion
    });
    this.blinkTimer_s = result.blinkTimer_s;
    this.wasUnderwater = result.wasUnderwater;
    this.paddleImpulse01 = result.paddleImpulse01;
    this.strokeImpact01 = result.strokeImpact01;
  }

  private applyStormPose(time_s: number, storm: number, chaos: number): void {
    applyOtterStormPose({
      nodes: this.nodes,
      time_s,
      storm,
      chaos,
      stormPhase: this.stormPhase,
      stormPhase2: this.stormPhase2
    });
  }

  private applyFlipperWavePose(): void {
    const flL = this.nodes.flipperL;
    const flR = this.nodes.flipperR;
    if (!flL && !flR) return;
    const yaw = this.flipperYawOffset;
    const roll = this.flipperRollOffset;
    if (flL) {
      flL.rotation.y += yaw;
      flL.rotation.z += roll;
    }
    if (flR) {
      flR.rotation.y += yaw;
      flR.rotation.z -= roll;
    }
  }

  private applyWetnessToMaterials(w: number): void {
    applyOtterWetness({ wetMats: this.wetMats, wetness: w, tmpWetCol: this.tmpWetCol });
  }

  private preloadAllModels(): void {
    this.preloadStarted = preloadOtterModels(this.loader, this.preloadStarted);
  }

  private loadModel(mode: OtterAppearanceMode, wantFur: boolean): void {
    const url = getOtterModelUrl(mode);
    const ticket = ++this.loadTicket;

    loadOtterModel({
      loader: this.loader,
      url,
      ticket,
      isTicketCurrent: (t) => t === this.loadTicket,
      onLoaded: (gltf) => this.useLoadedModel(gltf, mode, wantFur),
      onError: (err, failedUrl) => {
        console.warn(`[otter] Failed to load ${failedUrl}`, err);
        this.appearanceMode = mode;
        this.furSilhouette = wantFur;
        showOtterLoadError(failedUrl);
      }
    });
  }

  private useLoadedModel(gltf: GLTF, mode: OtterAppearanceMode, wantFur: boolean): void {
    const result = applyOtterModel({
      gltf,
      mode,
      wantFur,
      group: this.group,
      prevModel: this.model,
      wetMats: this.wetMats,
      wetness: this.wetness,
      tmpWetCol: this.tmpWetCol
    });
    this.model = result.model;
    this.furObj = result.furObj;

    this.cacheRigNodes();
    this.setupAnimations();
    this.cacheMorphTargets();
    this.rebuildContactMeshes();

    this.appearanceMode = mode;
    this.furSilhouette = wantFur;
  }

  private cacheRigNodes(): void {
    this.nodes = {};
    if (!this.model) return;
    const body = this.model.getObjectByName('Body') || undefined;
    const head = this.model.getObjectByName('Head') || undefined;
    let neck = this.model.getObjectByName('Neck') || undefined;

    if (!neck && body && head && head.parent === body) {
      neck = new THREE.Object3D();
      neck.name = 'Neck';
      neck.position.copy(head.position);
      neck.quaternion.copy(head.quaternion);
      neck.scale.copy(head.scale);
      body.add(neck);
      neck.add(head);
      head.position.set(0, 0, 0);
      head.quaternion.identity();
      head.scale.set(1, 1, 1);
    }

    this.nodes.body = body;
    this.nodes.neck = neck;
    this.nodes.head = head;
    this.nodes.tail = this.model.getObjectByName('Tail') || undefined;
    this.nodes.flipperL = this.model.getObjectByName('FlipperL') || undefined;
    this.nodes.flipperR = this.model.getObjectByName('FlipperR') || undefined;
    this.nodes.eyeL = this.model.getObjectByName('EyeL') || undefined;
    this.nodes.eyeR = this.model.getObjectByName('EyeR') || undefined;
    this.nodes.whiskers = this.model.getObjectByName('Whiskers') || undefined;
  }

  private setupAnimations(): void {
    if (!this.model) return;
    const result = setupOtterAnimations({
      model: this.model,
      nodes: this.nodes,
      paddlePeriod_s: this.paddlePeriod_s,
      rng: this.rng,
      prevMixer: this.mixer,
      prevMixerRoot: this.mixerRoot
    });
    this.mixer = result.mixer;
    this.mixerRoot = result.mixerRoot;
    this.idleAction = result.idleAction;
    this.swimAction = result.swimAction;
    this.diveGlideAction = result.diveGlideAction;
    this.paddleAction = result.paddleAction;
    this.underwaterSwimAction = result.underwaterSwimAction;
    this.diveAction = result.diveAction;
    this.resurfaceAction = result.resurfaceAction;
    this.blinkAction = result.blinkAction;
    this.whiskerTwitchAction = result.whiskerTwitchAction;
    this.blinkTimer_s = result.blinkTimer_s;
    this.wasUnderwater = result.wasUnderwater;
  }

  private resetMorphState(): void {
    this.blinkMorphTime_s = -1;
    this.twitchMorphTime_s = -1;
    this.twitchTimer_s = lerp(TWITCH_TIMER_MIN_S, TWITCH_TIMER_MAX_S, this.rng());
    this.twitchStrength = lerp(TWITCH_MIN_WEIGHT, TWITCH_MAX_WEIGHT, this.rng());
    this.breathPeriod_s = lerp(BREATH_PERIOD_MIN_S, BREATH_PERIOD_MAX_S, this.rng());
    this.breathTimer_s = this.rng() * this.breathPeriod_s;
    this.breathStrength = lerp(BREATH_MIN_WEIGHT, BREATH_MAX_WEIGHT, this.rng());
  }

  private cacheMorphTargets(): void {
    this.morphBindings.blink.length = 0;
    this.morphBindings.breath.length = 0;
    this.morphBindings.twitch.length = 0;

    if (!this.model) return;

    this.model.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const dict = mesh.morphTargetDictionary;
      const influences = mesh.morphTargetInfluences;
      if (!dict || !influences) return;

      const blinkIndex = dict.Blink;
      if (blinkIndex !== undefined) this.morphBindings.blink.push({ influences, index: blinkIndex });

      const breathIndex = dict.Breath;
      if (breathIndex !== undefined) this.morphBindings.breath.push({ influences, index: breathIndex });

      const twitchIndex = dict.Twitch;
      if (twitchIndex !== undefined) this.morphBindings.twitch.push({ influences, index: twitchIndex });
    });

    if (this.morphBindings.blink.length > 0 && this.blinkAction) {
      this.blinkAction.stop();
      this.blinkAction = null;
    }

    if (this.morphBindings.twitch.length > 0 && this.whiskerTwitchAction) {
      this.whiskerTwitchAction.stop();
      this.whiskerTwitchAction = null;
    }

    this.applyMorphBindings(this.morphBindings.blink, 0);
    this.applyMorphBindings(this.morphBindings.breath, 0);
    this.applyMorphBindings(this.morphBindings.twitch, 0);
  }

  private applyMorphBindings(bindings: MorphBinding[], value: number): void {
    for (let i = 0; i < bindings.length; i += 1) {
      const binding = bindings[i];
      binding.influences[binding.index] = value;
    }
  }

  private updateMorphTargets(dt: number, blinkTriggered: boolean, secondaryMotion: boolean): void {
    if (!this.model) return;

    if (!secondaryMotion) {
      this.applyMorphBindings(this.morphBindings.blink, 0);
      this.applyMorphBindings(this.morphBindings.breath, 0);
      this.applyMorphBindings(this.morphBindings.twitch, 0);
      this.blinkMorphTime_s = -1;
      this.twitchMorphTime_s = -1;
      return;
    }

    if (this.morphBindings.blink.length > 0) {
      if (blinkTriggered) this.blinkMorphTime_s = 0;

      let blinkWeight = 0;
      if (this.blinkMorphTime_s >= 0) {
        this.blinkMorphTime_s += dt;
        const t = this.blinkMorphTime_s / BLINK_MORPH_DURATION_S;
        if (t >= 1) {
          this.blinkMorphTime_s = -1;
        } else {
          blinkWeight = Math.sin(Math.PI * t) * BLINK_MORPH_WEIGHT;
        }
      }
      this.applyMorphBindings(this.morphBindings.blink, blinkWeight);
    }

    if (this.morphBindings.breath.length > 0) {
      this.breathTimer_s += dt;
      if (this.breathTimer_s >= this.breathPeriod_s) {
        this.breathTimer_s -= this.breathPeriod_s;
        this.breathPeriod_s = lerp(BREATH_PERIOD_MIN_S, BREATH_PERIOD_MAX_S, this.rng());
        this.breathStrength = lerp(BREATH_MIN_WEIGHT, BREATH_MAX_WEIGHT, this.rng());
      }
      const phase = (this.breathTimer_s / this.breathPeriod_s) * Math.PI * 2;
      const breathPulse = 0.5 - 0.5 * Math.cos(phase);
      this.applyMorphBindings(this.morphBindings.breath, breathPulse * this.breathStrength);
    }

    if (this.morphBindings.twitch.length > 0) {
      this.twitchTimer_s -= dt;
      if (this.twitchTimer_s <= 0) {
        this.twitchTimer_s = lerp(TWITCH_TIMER_MIN_S, TWITCH_TIMER_MAX_S, this.rng());
        this.twitchStrength = lerp(TWITCH_MIN_WEIGHT, TWITCH_MAX_WEIGHT, this.rng());
        this.twitchMorphTime_s = 0;
      }

      let twitchWeight = 0;
      if (this.twitchMorphTime_s >= 0) {
        this.twitchMorphTime_s += dt;
        const t = this.twitchMorphTime_s / TWITCH_MORPH_DURATION_S;
        if (t >= 1) {
          this.twitchMorphTime_s = -1;
        } else {
          twitchWeight = Math.sin(Math.PI * t) * this.twitchStrength;
        }
      }
      this.applyMorphBindings(this.morphBindings.twitch, twitchWeight);
    }
  }

  private rebuildContactMeshes(): void {
    this.contactMeshes.length = 0;
    this.submergeMeshRefs.length = 0;
    if (!this.model) return;
    this.model.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      if (!CONTACT_MESH_NAMES.has(mesh.name)) return;
      this.contactMeshes.push(mesh);
    });
    this.rebuildSubmergeMeshRefs();
    this.contactMeshesVersion += 1;
  }

  private rebuildSubmergeMeshRefs(): void {
    this.submergeMeshRefs.length = 0;
    for (let i = 0; i < this.contactMeshes.length; i += 1) {
      const mesh = this.contactMeshes[i];
      if (!SUBMERGE_MESH_NAMES.has(mesh.name)) continue;
      const geo = mesh.geometry as THREE.BufferGeometry;
      if (!geo.boundingBox) geo.computeBoundingBox();
      const box = geo.boundingBox;
      if (!box) continue;
      const centerX = (box.min.x + box.max.x) * 0.5;
      const centerZ = (box.min.z + box.max.z) * 0.5;
      this.submergeMeshRefs.push({
        mesh,
        centerX,
        centerZ,
        minY: box.min.y,
        maxY: box.max.y
      });
    }
  }
}
