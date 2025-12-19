import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clamp, lerp } from './math';
import { mulberry32 } from './prng';
import type { WaveComponent } from './spectrum';
import { sampleGerstner } from './waveSample';

THREE.Cache.enabled = true;

const OTTER_GLTF_CACHE = new Map<string, Promise<GLTF>>();

function loadGltfCached(loader: GLTFLoader, url: string): Promise<GLTF> {
  const cached = OTTER_GLTF_CACHE.get(url);
  if (cached) return cached;

  const pending = new Promise<GLTF>((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });

  // If the load fails, allow retry on the next request.
  pending.catch(() => {
    OTTER_GLTF_CACHE.delete(url);
  });

  OTTER_GLTF_CACHE.set(url, pending);
  return pending;
}

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
}

export type OtterLookMode = 'Horizon' | 'Sky' | 'Underwater';

/** Three performance tiers: Low, Medium (rim-cheat), High (GLB + optional fur silhouette). */
export type OtterAppearanceMode = 'Low' | 'Medium' | 'High';

type RigNodes = {
  body?: THREE.Object3D;
  head?: THREE.Object3D;
  tail?: THREE.Object3D;
  flipperL?: THREE.Object3D;
  flipperR?: THREE.Object3D;
  eyeL?: THREE.Object3D;
  eyeR?: THREE.Object3D;
  whiskers?: THREE.Object3D;
};

interface WetMaterialEntry {
  mat: THREE.MeshPhysicalMaterial;
  dryColor: THREE.Color;
  dryRoughness: number;
  dryClearcoat: number;
  dryClearcoatRoughness: number;
}

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
  private readonly tmpDryCol = new THREE.Color();

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
    sampleGerstner(ctx.waves, pCxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB);
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
    const hF = sampleGerstner(ctx.waves, pFxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB).height_m;
    const hB = sampleGerstner(ctx.waves, pBxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB).height_m;

    const pLxz = this.tmpV2c.set(this.position.x - right.x * this.buoySampleSide_m, this.position.z - right.z * this.buoySampleSide_m);
    const pRxz = this.tmpV2d.set(this.position.x + right.x * this.buoySampleSide_m, this.position.z + right.z * this.buoySampleSide_m);
    const hL = sampleGerstner(ctx.waves, pLxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB).height_m;
    const hR = sampleGerstner(ctx.waves, pRxz, ctx.time_s, ctx.currentXZ, ctx.tideHeight_m, this.tmpWaveSample, this.tmpWaveT, this.tmpWaveB).height_m;

    const hAvg = (hF + hB + hL + hR) * 0.25;

    const pitch = (hF - hB) / Math.max(1e-4, 2.0 * this.buoySampleFwd_m);
    const roll = (hR - hL) / Math.max(1e-4, 2.0 * this.buoySampleSide_m);

    const n = this.tmpV3b
      .copy(this.up)
      .addScaledVector(fwd, -pitch)
      .addScaledVector(right, -roll)
      .normalize();

    const slope = Math.min(1.2, Math.sqrt(pitch * pitch + roll * roll));

    // --- Splash/submerge events ---
    const hitChance = clamp((slope - 0.16) / 0.35, 0, 1) * (0.15 + 0.85 * storm);
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

    // --- Gaze mode decisions ---
    if (this.lookTimer_s <= 0) {
      const lookA = otterosity;
      const uw = clamp(0.08 + 0.85 * Math.pow(lookA, 1.18), 0, 1);
      const calm = 1 - storm;
      // Keep underwater looks as an occasional flavor beat.
      // (Too frequent makes the camera stare at featureless water, which can read
      // as random black screens on phones.)
      const pUnder = uw * lerp(0.02, 0.10, calm) * (1.0 - storm * 0.6);
      const pSkyBase = lerp(0.10, 0.26, lookA) * lerp(0.55, 0.25, storm);
      const pSky = pSkyBase * (1.0 - stormFocus);
      const r = this.rng();

      if (r < pUnder) this.lookMode = 'Underwater';
      else if (r < pUnder + pSky) this.lookMode = 'Sky';
      else this.lookMode = 'Horizon';

      const base = lerp(2.4, 6.5, 1 - storm);
      const jitter = lerp(0.0, 5.0, lookA) * (this.rng() * 0.6 + 0.4);
      this.lookTimer_s = base + jitter;

      // Pick a new gaze offset occasionally (then smooth toward it).
      // This keeps camera aim stable while still feeling "alive".
      const maxYawOffset = lerp(0.04, 0.42, lookA) * lerp(1.0, 0.45, stormFocus);
      this.gazeYawOffsetTarget = (this.rng() * 2 - 1) * maxYawOffset;
    }

    // Smooth gaze direction (no per-frame RNG jitter)
    this.gazeYawOffset = lerp(this.gazeYawOffset, this.gazeYawOffsetTarget, clamp(dt * 1.2, 0, 1));
    const yawLook = this.yaw + this.gazeYawOffset;
    const gx = Math.cos(yawLook);
    const gz = Math.sin(yawLook);
    const gazeTarget = this.tmpV3c.set(0, 0, 0);
    if (this.lookMode === 'Horizon') {
      if (stormFocus > 0.001 && typeof inp.windDirTo_rad === 'number') {
        const waveYaw = inp.windDirTo_rad + Math.PI;
        const wx = Math.cos(waveYaw);
        const wz = Math.sin(waveYaw);
        const mix = lerp(0.0, 0.85, stormFocus);
        gazeTarget.set(
          lerp(gx, wx, mix),
          lerp(0.10, 0.03, mix),
          lerp(gz, wz, mix)
        ).normalize();
      } else {
        gazeTarget.set(gx, 0.10, gz).normalize();
      }
    } else if (this.lookMode === 'Sky') {
      const interest = inp.interestDir;
      if (interest && interest.y > 0.08 && stormFocus < 0.15) {
        gazeTarget.copy(interest).normalize();
      } else {
        gazeTarget.set(gx * 0.2, 0.98, gz * 0.2).normalize();
      }
    } else {
      gazeTarget.set(gx * 0.45, -0.62, gz * 0.45).normalize();
    }
    this.gazeDir.lerp(gazeTarget, clamp(dt * 2.0, 0, 1)).normalize();

    // --- Animations ---
    this.updateAnimations(dt, storm, chaos);
    this.applyStormPose(ctx.time_s, storm, chaos);

    // --- Wetness ---
    const wetTarget = clamp(this.submerge_m * 1.25 + this.paddleImpulse01 * 0.28 + storm * 0.25, 0, 1);
    const wetRate = wetTarget > this.wetness ? 2.5 : 0.25;
    this.wetness = lerp(this.wetness, wetTarget, clamp(dt * wetRate, 0, 1));
    this.wetness01 = this.wetness;
    this.applyWetnessToMaterials(this.wetness);
  }

  private updateAnimations(dt: number, storm: number, chaos: number): void {
    if (!this.mixer) return;

    const move01 = clamp(this.speed_mps / 0.18, 0, 1);
    const paddleBase = clamp(0.18 + 0.95 * (storm * 0.65 + chaos * 0.6), 0, 1);
    const paddleW = clamp(paddleBase * (0.25 + 0.75 * move01), 0, 1);

    if (this.paddleAction) {
      this.paddleAction.setEffectiveWeight(paddleW);
      this.paddleAction.setEffectiveTimeScale(lerp(0.7, 1.6, paddleW));
    }

    const underNow = this.isUnderwaterView();
    if (underNow && !this.wasUnderwater) this.diveAction?.reset().play();
    else if (!underNow && this.wasUnderwater) this.resurfaceAction?.reset().play();
    this.wasUnderwater = underNow;

    if (this.blinkTimer_s <= 0) {
      this.blinkAction?.reset().play();
      if (this.whiskerTwitchAction && this.rng() < 0.7) {
        this.whiskerTwitchAction.reset().play();
      }
      this.blinkTimer_s = 2.8 + this.rng() * 4.5;
    }

    this.mixer.update(dt);

    // Paddle impulses (wake/splash boost): 2 pulses per cycle.
    let impulse = 0;
    if (this.paddleAction) {
      const t = (this.paddleAction.time % this.paddlePeriod_s) / this.paddlePeriod_s;
      const p0 = Math.exp(-Math.pow((t - 0.18) / 0.07, 2.0));
      const p1 = Math.exp(-Math.pow((t - 0.68) / 0.07, 2.0));
      impulse = clamp((p0 + p1) * 0.85 * paddleW, 0, 1);
    }
    this.paddleImpulse01 = impulse;
  }

  private applyStormPose(time_s: number, storm: number, chaos: number): void {
    const head = this.nodes.head;
    const tail = this.nodes.tail;
    const flL = this.nodes.flipperL;
    const flR = this.nodes.flipperR;
    if (!head && !tail && !flL && !flR) return;

    const brace = clamp(storm * (0.35 + 0.65 * chaos), 0, 1);
    if (brace <= 0.001) return;

    const nod = Math.sin(time_s * (2.2 + 1.3 * chaos) + this.stormPhase) * 0.12 * brace;
    const yaw = Math.sin(time_s * (1.7 + 1.1 * chaos) + this.stormPhase2) * 0.10 * brace;
    const flap = Math.sin(time_s * (3.1 + 1.6 * chaos) + this.stormPhase2) * 0.18 * brace;

    if (head) {
      head.rotation.x += nod;
      head.rotation.y += yaw;
    }
    if (tail) {
      tail.rotation.y += flap * 0.6;
      tail.rotation.z += flap * 0.45;
    }
    if (flL) flL.rotation.z += flap * 0.8;
    if (flR) flR.rotation.z -= flap * 0.8;
  }

  private applyWetnessToMaterials(w: number): void {
    if (!this.wetMats.length) return;
    const ww = clamp(Math.pow(w, 1.18), 0, 1);

    for (const e of this.wetMats) {
      this.tmpWetCol.copy(e.dryColor).multiplyScalar(0.72);
      e.mat.color.copy(e.dryColor).lerp(this.tmpWetCol, ww);
      e.mat.roughness = lerp(e.dryRoughness, 0.38, ww);
      e.mat.clearcoat = lerp(e.dryClearcoat, 0.62, ww);
      e.mat.clearcoatRoughness = lerp(e.dryClearcoatRoughness, 0.18, ww);
    }
  }

  private urlForMode(mode: OtterAppearanceMode): string {
    // IMPORTANT: use a *relative* URL so the project works no matter what base path
    // it is served from (Vite dev server, Vite preview, GitHub Pages, etc.).
    // A leading "/" breaks when hosted under a sub-path.
    if (mode === 'Low') return 'models/otter/otter_low.glb';
    if (mode === 'Medium') return 'models/otter/otter_medium.glb';
    return 'models/otter/otter_high.glb';
  }

  private preloadAllModels(): void {
    if (this.preloadStarted) return;
    this.preloadStarted = true;
    const modes: OtterAppearanceMode[] = ['Low', 'Medium', 'High'];
    for (const mode of modes) {
      const url = this.urlForMode(mode);
      void loadGltfCached(this.loader, url).catch(() => {
        // ignore preload errors (main load will surface if needed)
      });
    }
  }

  private loadModel(mode: OtterAppearanceMode, wantFur: boolean): void {
    const url = this.urlForMode(mode);
    const ticket = ++this.loadTicket;

    loadGltfCached(this.loader, url)
      .then((gltf) => {
        if (ticket !== this.loadTicket) return;
        this.useLoadedModel(gltf, mode, wantFur);
      })
      .catch((err) => {
        console.warn(`[otter] Failed to load ${url}`, err);
        this.appearanceMode = mode;
        this.furSilhouette = wantFur;

        // If we're running on a device without easy console access (phone/tablet),
        // put a tiny, non-intrusive hint on-screen so the failure is obvious.
        try {
          const id = 'otter-load-error';
          let el = document.getElementById(id);
          if (!el) {
            el = document.createElement('div');
            el.id = id;
            el.style.position = 'fixed';
            el.style.left = '10px';
            el.style.bottom = '10px';
            el.style.zIndex = '9999';
            el.style.maxWidth = 'min(560px, 90vw)';
            el.style.padding = '10px 12px';
            el.style.borderRadius = '10px';
            el.style.background = 'rgba(0,0,0,0.70)';
            el.style.color = '#fff';
            el.style.font = '12px/1.35 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
            document.body.appendChild(el);
          }
          el.textContent = `Otter model failed to load: ${url}. If you're testing on phone, make sure you're using the dev server (localhost:5173), not opening index.html directly.`;
        } catch {
          // ignore
        }
      });
  }

  private useLoadedModel(gltf: GLTF, mode: OtterAppearanceMode, wantFur: boolean): void {
    // Remove previous model
    if (this.model) {
      this.group.remove(this.model);
      this.model = null;
    }
    this.furObj = null;

    // Remove placeholder (if any)
    const ph = this.group.getObjectByName('__placeholder');
    if (ph) {
      this.group.remove(ph);
      disposeObject3D(ph);
    }

    const scene = gltf.scene;
    scene.name = 'otterModel';

    // Rotate so its +Z becomes world +X (matches bodyForward basis).
    scene.rotation.y = -Math.PI / 2;

    // Global scale tweak by LOD.
    const s = mode === 'Low' ? 0.48 : mode === 'Medium' ? 0.50 : 0.52;
    scene.scale.setScalar(s);

    this.model = scene;
    this.group.add(scene);

    this.furObj = scene.getObjectByName('fur') || null;
    if (this.furObj) this.furObj.visible = wantFur;

    this.applyMaterials(mode);
    this.cacheRigNodes();
    this.setupAnimations();

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

  private applyMaterials(mode: OtterAppearanceMode): void {
    if (!this.model) return;

    this.wetMats.length = 0;

    const low = mode === 'Low';
    const mid = mode === 'Medium';
    const hi = mode === 'High';

    const userData = (this.model as any).userData ?? ((this.model as any).userData = {});
    const cached = userData.otterMaterials as {
      mode: OtterAppearanceMode;
      furMat: THREE.MeshPhysicalMaterial;
      furShellMat: THREE.MeshPhysicalMaterial;
      eyeMat: THREE.MeshStandardMaterial;
      whiskMat: THREE.MeshStandardMaterial;
      furDry: { color: THREE.Color; roughness: number; clearcoat: number; clearcoatRoughness: number };
      furShellDry: { color: THREE.Color; roughness: number; clearcoat: number; clearcoatRoughness: number };
    } | undefined;

    let furMat: THREE.MeshPhysicalMaterial;
    let furShellMat: THREE.MeshPhysicalMaterial;
    let eyeMat: THREE.MeshStandardMaterial;
    let whiskMat: THREE.MeshStandardMaterial;

    if (cached && cached.mode === mode) {
      furMat = cached.furMat;
      furShellMat = cached.furShellMat;
      eyeMat = cached.eyeMat;
      whiskMat = cached.whiskMat;

      furMat.color.copy(cached.furDry.color);
      furMat.roughness = cached.furDry.roughness;
      furMat.clearcoat = cached.furDry.clearcoat;
      furMat.clearcoatRoughness = cached.furDry.clearcoatRoughness;

      furShellMat.color.copy(cached.furShellDry.color);
      furShellMat.roughness = cached.furShellDry.roughness;
      furShellMat.clearcoat = cached.furShellDry.clearcoat;
      furShellMat.clearcoatRoughness = cached.furShellDry.clearcoatRoughness;
    } else {
      // Slightly brighten the high-quality fur so it doesn't collapse into a
      // dark blob on mobile HDR/tone-mapped scenes.
      const furColor = new THREE.Color(low ? '#6a4a2b' : (hi ? '#62462b' : '#5a4028'));
      const furShellColor = new THREE.Color('#6f5232');
      const eyeColor = new THREE.Color('#0a0a0a');
      const whiskerColor = new THREE.Color('#d9d1c5');

      furMat = new THREE.MeshPhysicalMaterial({
        color: furColor,
        roughness: low ? 0.96 : 0.92,
        metalness: 0.0,
        clearcoat: 0.10,
        clearcoatRoughness: 0.40,
        sheen: hi ? 1.0 : 0.75,
        sheenRoughness: 0.86,
        sheenColor: new THREE.Color('#caa46a')
      });
      furMat.flatShading = low;

      if (mid) {
        applyFurRimCheat(furMat, new THREE.Color('#e7c89a'), 0.22, 2.2);
      } else if (hi) {
        // Subtle rim so the otter stays readable against bright water/sky.
        applyFurRimCheat(furMat, new THREE.Color('#e7c89a'), 0.12, 2.6);
      }

      furShellMat = new THREE.MeshPhysicalMaterial({
        color: furShellColor,
        roughness: 0.98,
        metalness: 0.0,
        clearcoat: 0.05,
        clearcoatRoughness: 0.55,
        sheen: 0.9,
        sheenRoughness: 0.92,
        sheenColor: new THREE.Color('#caa46a')
      });
      furShellMat.flatShading = low;

      eyeMat = new THREE.MeshStandardMaterial({
        color: eyeColor,
        roughness: 0.55,
        metalness: 0.0
      });
      (eyeMat as any).flatShading = low;

      whiskMat = new THREE.MeshStandardMaterial({
        color: whiskerColor,
        roughness: 0.8,
        metalness: 0.0
      });

      userData.otterMaterials = {
        mode,
        furMat,
        furShellMat,
        eyeMat,
        whiskMat,
        furDry: {
          color: furMat.color.clone(),
          roughness: furMat.roughness,
          clearcoat: furMat.clearcoat,
          clearcoatRoughness: furMat.clearcoatRoughness
        },
        furShellDry: {
          color: furShellMat.color.clone(),
          roughness: furShellMat.roughness,
          clearcoat: furShellMat.clearcoat,
          clearcoatRoughness: furShellMat.clearcoatRoughness
        }
      };
    }

    // Register wetness-driven materials (fur + shell)
    this.wetMats.push({
      mat: furMat,
      dryColor: furMat.color.clone(),
      dryRoughness: furMat.roughness,
      dryClearcoat: furMat.clearcoat,
      dryClearcoatRoughness: furMat.clearcoatRoughness
    });
    if (hi) {
      this.wetMats.push({
        mat: furShellMat,
        dryColor: furShellMat.color.clone(),
        dryRoughness: furShellMat.roughness,
        dryClearcoat: furShellMat.clearcoat,
        dryClearcoatRoughness: furShellMat.clearcoatRoughness
      });
    }

    // Apply to meshes based on original material names.
    this.model.traverse((o) => {
      const anyO = o as any;
      if (!anyO.isMesh) return;
      const mat = anyO.material as THREE.Material | THREE.Material[];
      const m0 = Array.isArray(mat) ? mat[0] : mat;
      const name = (m0 as any)?.name ?? '';

      if (name === 'Eye') anyO.material = eyeMat;
      else if (name === 'Whisker') anyO.material = whiskMat;
      else if (name === 'FurShell') anyO.material = furShellMat;
      else anyO.material = furMat;
    });

    // Apply current wetness immediately.
    this.applyWetnessToMaterials(this.wetness);
  }

  private setupAnimations(): void {
    if (!this.model) return;

    // Tear down previous mixer bindings.
    if (this.mixer) {
      try {
        this.mixer.stopAllAction();
        if (this.mixerRoot) this.mixer.uncacheRoot(this.mixerRoot);
      } catch {
        // ignore
      }
    }

    this.mixer = new THREE.AnimationMixer(this.model);
    this.mixerRoot = this.model;
    this.idleAction = null;
    this.paddleAction = null;
    this.diveAction = null;
    this.resurfaceAction = null;
    this.blinkAction = null;
    this.whiskerTwitchAction = null;

    const body = this.nodes.body;
    const head = this.nodes.head;
    const tail = this.nodes.tail;
    const flL = this.nodes.flipperL;
    const flR = this.nodes.flipperR;
    const eyeL = this.nodes.eyeL;
    const eyeR = this.nodes.eyeR;
    const whiskers = this.nodes.whiskers;

    const clips: THREE.AnimationClip[] = [];

    // Idle
    {
      const tracks: THREE.KeyframeTrack[] = [];
      const len = 6.0;
      const t = [0, 1.5, 3.0, 4.5, 6.0];

      if (body) {
        const s0 = [1, 1, 1];
        const s1 = [1.02, 0.985, 1.02];
        const s2 = [0.99, 1.01, 0.99];
        tracks.push(new THREE.VectorKeyframeTrack(`${body.name}.scale`, t, [...s0, ...s1, ...s2, ...s1, ...s0]));
      }

      if (head) {
        const q0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.02, 0.0, 0.0, 'YXZ'));
        const q1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.03, 0.08, 0.0, 'YXZ'));
        const q2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.01, -0.06, 0.0, 'YXZ'));
        tracks.push(
          new THREE.QuaternionKeyframeTrack(
            `${head.name}.quaternion`,
            t,
            [
              q0.x,
              q0.y,
              q0.z,
              q0.w,
              q1.x,
              q1.y,
              q1.z,
              q1.w,
              q2.x,
              q2.y,
              q2.z,
              q2.w,
              q1.x,
              q1.y,
              q1.z,
              q1.w,
              q0.x,
              q0.y,
              q0.z,
              q0.w
            ]
          )
        );
      }

      if (tail) {
        const qa = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, 0.06));
        const qb = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, -0.06));
        tracks.push(
          new THREE.QuaternionKeyframeTrack(
            `${tail.name}.quaternion`,
            [0, 3, 6],
            [qa.x, qa.y, qa.z, qa.w, qb.x, qb.y, qb.z, qb.w, qa.x, qa.y, qa.z, qa.w]
          )
        );
      }

      if (tracks.length) clips.push(new THREE.AnimationClip('Idle', len, tracks));
    }

    // Paddle
    {
      const tracks: THREE.KeyframeTrack[] = [];
      const len = this.paddlePeriod_s;
      const t = [0, len * 0.25, len * 0.5, len * 0.75, len];
      const flapA = 0.55;
      const flapB = -0.35;

      if (flL) {
        const qa = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, flapA));
        const qb = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, flapB));
        tracks.push(
          new THREE.QuaternionKeyframeTrack(
            `${flL.name}.quaternion`,
            t,
            [
              qa.x,
              qa.y,
              qa.z,
              qa.w,
              qb.x,
              qb.y,
              qb.z,
              qb.w,
              qa.x,
              qa.y,
              qa.z,
              qa.w,
              qb.x,
              qb.y,
              qb.z,
              qb.w,
              qa.x,
              qa.y,
              qa.z,
              qa.w
            ]
          )
        );
      }

      if (flR) {
        const qa = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, -flapA));
        const qb = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, -flapB));
        tracks.push(
          new THREE.QuaternionKeyframeTrack(
            `${flR.name}.quaternion`,
            t,
            [
              qa.x,
              qa.y,
              qa.z,
              qa.w,
              qb.x,
              qb.y,
              qb.z,
              qb.w,
              qa.x,
              qa.y,
              qa.z,
              qa.w,
              qb.x,
              qb.y,
              qb.z,
              qb.w,
              qa.x,
              qa.y,
              qa.z,
              qa.w
            ]
          )
        );
      }

      if (tracks.length) clips.push(new THREE.AnimationClip('Paddle', len, tracks));
    }

    // Dive / Resurface cue (head pitch)
    if (head) {
      const len = 1.0;
      const qA = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.02, 0.0, 0.0, 'YXZ'));
      const qB = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.38, 0.0, 0.0, 'YXZ'));
      clips.push(
        new THREE.AnimationClip('Dive', len, [
          new THREE.QuaternionKeyframeTrack(`${head.name}.quaternion`, [0, len], [qA.x, qA.y, qA.z, qA.w, qB.x, qB.y, qB.z, qB.w])
        ])
      );
      clips.push(
        new THREE.AnimationClip('Resurface', len, [
          new THREE.QuaternionKeyframeTrack(`${head.name}.quaternion`, [0, len], [qB.x, qB.y, qB.z, qB.w, qA.x, qA.y, qA.z, qA.w])
        ])
      );
    }

    // Blink
    if (eyeL && eyeR) {
      const len = 0.18;
      const open = eyeL.scale;
      const closedY = Math.max(0.001, open.y * 0.08);
      const t = [0, 0.06, 0.12, 0.18];
      const vOpen = [open.x, open.y, open.z];
      const vClosed = [open.x, closedY, open.z];
      clips.push(
        new THREE.AnimationClip('Blink', len, [
          new THREE.VectorKeyframeTrack(`${eyeL.name}.scale`, t, [...vOpen, ...vClosed, ...vOpen, ...vOpen]),
          new THREE.VectorKeyframeTrack(`${eyeR.name}.scale`, t, [...vOpen, ...vClosed, ...vOpen, ...vOpen])
        ])
      );
    }

    // Whisker twitch (optional)
    if (whiskers) {
      const len = 0.55;
      const qa = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, 0.02));
      const qb = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, -0.04));
      clips.push(
        new THREE.AnimationClip('WhiskerTwitch', len, [
          new THREE.QuaternionKeyframeTrack(
            `${whiskers.name}.quaternion`,
            [0, len * 0.5, len],
            [qa.x, qa.y, qa.z, qa.w, qb.x, qb.y, qb.z, qb.w, qa.x, qa.y, qa.z, qa.w]
          )
        ])
      );
    }

    // Bind actions
    for (const c of clips) {
      const a = this.mixer.clipAction(c);
      if (c.name === 'Idle') {
        a.setLoop(THREE.LoopRepeat, Infinity);
        a.play();
        this.idleAction = a;
      } else if (c.name === 'Paddle') {
        a.setLoop(THREE.LoopRepeat, Infinity);
        a.enabled = true;
        a.play();
        a.setEffectiveWeight(0.0);
        this.paddleAction = a;
      } else if (c.name === 'Dive') {
        a.setLoop(THREE.LoopOnce, 1);
        a.clampWhenFinished = true;
        a.enabled = true;
        this.diveAction = a;
      } else if (c.name === 'Resurface') {
        a.setLoop(THREE.LoopOnce, 1);
        a.clampWhenFinished = true;
        a.enabled = true;
        this.resurfaceAction = a;
      } else if (c.name === 'Blink') {
        a.setLoop(THREE.LoopOnce, 1);
        a.clampWhenFinished = true;
        a.enabled = true;
        this.blinkAction = a;
      } else if (c.name === 'WhiskerTwitch') {
        a.setLoop(THREE.LoopOnce, 1);
        a.clampWhenFinished = true;
        a.enabled = true;
        this.whiskerTwitchAction = a;
      }
    }

    this.blinkTimer_s = 2.5 + this.rng() * 3.5;
    this.wasUnderwater = false;
  }
}

function disposeObject3D(root: THREE.Object3D): void {
  root.traverse((o) => {
    const anyO = o as any;
    if (anyO.geometry && typeof anyO.geometry.dispose === 'function') {
      anyO.geometry.dispose();
    }
    const mat = anyO.material;
    if (Array.isArray(mat)) {
      for (const m of mat) {
        if (m && typeof m.dispose === 'function') m.dispose();
      }
    } else if (mat && typeof mat.dispose === 'function') {
      mat.dispose();
    }
  });
}

function applyFurRimCheat(
  mat: THREE.MeshPhysicalMaterial,
  rimColor: THREE.Color,
  strength: number,
  power: number
): void {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.u_rimColor = { value: rimColor };
    shader.uniforms.u_rimStrength = { value: strength };
    shader.uniforms.u_rimPower = { value: power };

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
       uniform vec3 u_rimColor;
       uniform float u_rimStrength;
       uniform float u_rimPower;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <opaque_fragment>',
      `float _rim = pow(1.0 - saturate(dot(normalize(normal), normalize(vViewPosition))), u_rimPower);
       outgoingLight += u_rimColor * (u_rimStrength * _rim);
       #include <opaque_fragment>`
    );
  };

  mat.customProgramCacheKey = () => `otter_fur_rim_${strength.toFixed(3)}_${power.toFixed(3)}`;
}
