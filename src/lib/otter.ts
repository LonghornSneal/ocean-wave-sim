import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clamp, lerp } from './math';
import { mulberry32 } from './prng';
import type { WaveComponent } from './spectrum';
import { sampleGerstner, type WaveSampleOptions } from './waveSample';
import type { RogueWaveState, SeismicPulseState } from './wavePhysics';
import { applyOtterStormPose, setupOtterAnimations, updateOtterAnimations } from './otter/animations';
import { updateOtterGaze } from './otter/gaze';
import { applyOtterWetness, type WetMaterialEntry } from './otter/materials';
import { getOtterModelUrl, preloadOtterModels } from './otter/assets';
import { applyOtterModel, loadOtterModel } from './otter/model';
import { showOtterLoadError } from './otter/utils';
import type { RigNodes } from './otter/types';

THREE.Cache.enabled = true;

const EVENT_WAVE_SAMPLE: WaveSampleOptions = { includeTags: ['event'], applyCrestSharpness: true };
const CONTACT_MESH_NAMES = new Set(['Body', 'Back', 'Head', 'FlipperL', 'FlipperR', 'Tail']);

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

  /** Where the otter is looking (drives camera aim). */
  public readonly gazeDir = new THREE.Vector3(0, 0.08, -1).normalize();

  /** Where the otter is "facing" (drives stable third-person framing). */
  public readonly bodyForward = new THREE.Vector3(1, 0, 0);

  /** 0..1 short pulse, used to boost wake/splashes when paddling. */
  public paddleImpulse01 = 0;

  /** 0..1 wetness factor (darkening + shinier when wet). */
  public wetness01 = 0;

  public lookMode: OtterLookMode = 'Horizon';

  private readonly rng = mulberry32(133742);
  private readonly stormPhase = this.rng() * Math.PI * 2;
  private readonly stormPhase2 = this.rng() * Math.PI * 2;
  private lookTimer_s = 0;
  private blinkTimer_s = 2.8;
  private yaw = 0;

  // Gaze yaw offset is chosen occasionally and then smoothed.
  // (Avoid per-frame RNG jitter which makes the camera shake.)
  private gazeYawOffset = 0;
  private gazeYawOffsetTarget = 0;

  private submerge_m = 0;
  private splashCooldown_s = 0;

  private wetness = 0;

  private appearanceMode: OtterAppearanceMode = 'High';
  private furSilhouette = true;

  private readonly loader = new GLTFLoader();
  private loadTicket = 0;
  private preloadStarted = false;

  private model: THREE.Object3D | null = null;
  private furObj: THREE.Object3D | null = null;

  private nodes: RigNodes = {};

  private mixer: THREE.AnimationMixer | null = null;
  private mixerRoot: THREE.Object3D | null = null;
  private idleAction: THREE.AnimationAction | null = null;
  private paddleAction: THREE.AnimationAction | null = null;
  private diveAction: THREE.AnimationAction | null = null;
  private resurfaceAction: THREE.AnimationAction | null = null;
  private blinkAction: THREE.AnimationAction | null = null;
  private whiskerTwitchAction: THREE.AnimationAction | null = null;
  private wasUnderwater = false;

  private readonly paddlePeriod_s = 1.6;

  private readonly wetMats: WetMaterialEntry[] = [];
  private readonly contactMeshes: THREE.Mesh[] = [];
  private contactMeshesVersion = 0;

  // Buoyancy sampling extents (in meters, around otter center)
  private readonly buoySampleFwd_m = 0.42;
  private readonly buoySampleSide_m = 0.28;

  // Vertical float offset so head stays above surface at rest.
  private readonly floatOffset_m = 0.05;

  // Internal speed estimate (m/s)
  private readonly prevXZ = new THREE.Vector2(0, 0);
  // Track wave orbital displacement so the otter can be "carried" / thrashed by
  // the sea without drifting off infinitely (we apply the *delta* each frame).
  private readonly prevWaveDispXZ = new THREE.Vector2(0, 0);
  private waveDispInit = false;
  private speed_mps = 0;

  // Wave sampling temps
  private readonly tmpWaveSample = {
    height_m: 0,
    normal: new THREE.Vector3(),
    disp: new THREE.Vector3(),
    slope: 0
  };
  private readonly tmpWaveT = new THREE.Vector3();
  private readonly tmpWaveB = new THREE.Vector3();

  // Reusable temps (no per-frame allocations)
  private readonly tmpV2a = new THREE.Vector2();
  private readonly tmpV2b = new THREE.Vector2();
  private readonly tmpV2c = new THREE.Vector2();
  private readonly tmpV2d = new THREE.Vector2();
  private readonly tmpV3a = new THREE.Vector3();
  private readonly tmpV3b = new THREE.Vector3();
  private readonly tmpV3c = new THREE.Vector3();
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

  public reset(): void {
    this.position.set(0, 0, 0);
    this.gazeDir.set(0, 0.08, -1).normalize();
    this.bodyForward.set(1, 0, 0);
    this.lookMode = 'Horizon';
    this.lookTimer_s = 0;
    this.blinkTimer_s = 2.8 + this.rng() * 3.2;
    this.yaw = 0;
    this.gazeYawOffset = 0;
    this.gazeYawOffsetTarget = 0;
    this.submerge_m = 0;
    this.splashCooldown_s = 0;
    this.wetness = 0;
    this.wetness01 = 0;
    this.paddleImpulse01 = 0;
    this.prevXZ.set(0, 0);
    this.prevWaveDispXZ.set(0, 0);
    this.waveDispInit = false;
    this.speed_mps = 0;

    this.group.position.copy(this.position);
    this.group.quaternion.identity();

    if (this.idleAction) this.idleAction.reset().play();
    if (this.paddleAction) this.paddleAction.reset().play();
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

    this.lookTimer_s -= dt;
    this.blinkTimer_s -= dt;
    this.splashCooldown_s = Math.max(0, this.splashCooldown_s - dt);

    // --- Drift + wander (calmer baseline to reduce camera shake) ---
    const drift = this.tmpV2a.set(ctx.currentXZ.x, ctx.currentXZ.y);
    const wander = (this.rng() * 2 - 1) * 0.014 * (0.25 + 0.75 * chaos);
    // Make wander framerate-independent. (The old code added per-frame noise which
    // changes behavior dramatically with FPS and causes extra camera jitter.)
    this.yaw += wander * dt * 60.0;

    const wanderVec = this.tmpV2b.set(Math.cos(this.yaw), Math.sin(this.yaw)).multiplyScalar(0.028);
    drift.add(wanderVec);

    this.position.x += drift.x * dt;
    this.position.z += drift.y * dt;

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

    const pFxz = this.tmpV2a.set(this.position.x + fwd.x * this.buoySampleFwd_m, this.position.z + fwd.z * this.buoySampleFwd_m);
    const pBxz = this.tmpV2b.set(this.position.x - fwd.x * this.buoySampleFwd_m, this.position.z - fwd.z * this.buoySampleFwd_m);
    const hF = sampleGerstner(ctx.waves, pFxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse).height_m;
    const hB = sampleGerstner(ctx.waves, pBxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse).height_m;

    const pLxz = this.tmpV2c.set(this.position.x - right.x * this.buoySampleSide_m, this.position.z - right.z * this.buoySampleSide_m);
    const pRxz = this.tmpV2d.set(this.position.x + right.x * this.buoySampleSide_m, this.position.z + right.z * this.buoySampleSide_m);
    const hL = sampleGerstner(ctx.waves, pLxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse).height_m;
    const hR = sampleGerstner(ctx.waves, pRxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse).height_m;

    const hAvg = (hF + hB + hL + hR) * 0.25;

    const pitch = (hF - hB) / Math.max(1e-4, 2.0 * this.buoySampleFwd_m);
    const roll = (hR - hL) / Math.max(1e-4, 2.0 * this.buoySampleSide_m);

    const n = this.tmpV3b
      .copy(this.up)
      .addScaledVector(fwd, -pitch)
      .addScaledVector(right, -roll)
      .normalize();

    const hFEvent = sampleGerstner(ctx.waves, pFxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse, EVENT_WAVE_SAMPLE).height_m;
    const hBEvent = sampleGerstner(ctx.waves, pBxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse, EVENT_WAVE_SAMPLE).height_m;
    const hLEvent = sampleGerstner(ctx.waves, pLxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse, EVENT_WAVE_SAMPLE).height_m;
    const hREvent = sampleGerstner(ctx.waves, pRxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB, ctx.rogue, ctx.pulse, EVENT_WAVE_SAMPLE).height_m;

    const pitchEvent = (hFEvent - hBEvent) / Math.max(1e-4, 2.0 * this.buoySampleFwd_m);
    const rollEvent = (hREvent - hLEvent) / Math.max(1e-4, 2.0 * this.buoySampleSide_m);
    const slopeEvent = Math.min(1.2, Math.sqrt(pitchEvent * pitchEvent + rollEvent * rollEvent));

    // --- Splash/submerge events ---
    const hitChance = clamp((slopeEvent - 0.16) / 0.35, 0, 1) * (0.15 + 0.85 * storm);
    if (this.splashCooldown_s <= 0 && this.rng() < hitChance * dt) {
      this.submerge_m = Math.max(this.submerge_m, lerp(0.18, 1.05, storm));
      this.splashCooldown_s = lerp(4.5, 0.9, storm);
    }

    // Recover toward surface
    this.submerge_m = lerp(this.submerge_m, 0, clamp(dt * lerp(0.45, 1.6, 1 - storm), 0, 1));

    // Vertical placement
    const floatOffset = lerp(this.floatOffset_m, -0.14, storm);
    const targetY = hAvg + floatOffset - this.submerge_m;
    const yRate = lerp(6.0, 15.0, storm) * lerp(1.0, 1.3, chaos);
    this.position.y = lerp(this.position.y, targetY, clamp(dt * yRate, 0, 1));

    // Orientation
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

    // --- Animations ---
    this.updateAnimations(dt, storm, chaos);
    const pulseFoamDamp = clamp(ctx.pulseFoamDamp ?? 1.0, 0.0, 1.0);
    this.paddleImpulse01 *= pulseFoamDamp;
    this.applyStormPose(ctx.time_s, storm, chaos);

    // --- Wetness ---
    const wetTarget = clamp(this.submerge_m * 1.25 + this.paddleImpulse01 * 0.28 + storm * 0.25, 0, 1);
    const wetRate = wetTarget > this.wetness ? 2.5 : 0.25;
    this.wetness = lerp(this.wetness, wetTarget, clamp(dt * wetRate, 0, 1));
    this.wetness01 = this.wetness;
    this.applyWetnessToMaterials(this.wetness);
  }

  private updateAnimations(dt: number, storm: number, chaos: number): void {
    const result = updateOtterAnimations({
      dt,
      storm,
      chaos,
      speed_mps: this.speed_mps,
      paddlePeriod_s: this.paddlePeriod_s,
      mixer: this.mixer,
      paddleAction: this.paddleAction,
      diveAction: this.diveAction,
      resurfaceAction: this.resurfaceAction,
      blinkAction: this.blinkAction,
      whiskerTwitchAction: this.whiskerTwitchAction,
      paddleImpulse01: this.paddleImpulse01,
      blinkTimer_s: this.blinkTimer_s,
      wasUnderwater: this.wasUnderwater,
      isUnderwaterView: this.isUnderwaterView(),
      rng: this.rng
    });
    this.blinkTimer_s = result.blinkTimer_s;
    this.wasUnderwater = result.wasUnderwater;
    this.paddleImpulse01 = result.paddleImpulse01;
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
    this.rebuildContactMeshes();

    this.appearanceMode = mode;
    this.furSilhouette = wantFur;
  }

  private cacheRigNodes(): void {
    this.nodes = {};
    if (!this.model) return;
    this.nodes.body = this.model.getObjectByName('Body') || undefined;
    this.nodes.head = this.model.getObjectByName('Head') || undefined;
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
    this.paddleAction = result.paddleAction;
    this.diveAction = result.diveAction;
    this.resurfaceAction = result.resurfaceAction;
    this.blinkAction = result.blinkAction;
    this.whiskerTwitchAction = result.whiskerTwitchAction;
    this.blinkTimer_s = result.blinkTimer_s;
    this.wasUnderwater = result.wasUnderwater;
  }

  private rebuildContactMeshes(): void {
    this.contactMeshes.length = 0;
    if (!this.model) return;
    this.model.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      if (!CONTACT_MESH_NAMES.has(mesh.name)) return;
      this.contactMeshes.push(mesh);
    });
    this.contactMeshesVersion += 1;
  }
}
