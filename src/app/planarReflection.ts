import * as THREE from 'three';
import type { AppParams } from '../lib/ui';
import type { OceanMaterial } from '../lib/oceanMaterial';
import { PlanarReflection } from '../lib/waterReflection';
import { clamp, lerp } from '../lib/math';
import { IS_MOBILE_LIKE } from './quality';

export class PlanarReflectionController {
  public planarRefl: PlanarReflection | null = null;
  public reflUpdatesPerSec = 0;
  public reflSizeTarget = 0;

  private reflTimer_s = 0;
  private reflUpdateCount = 0;
  private reflRateTimer_s = 0;
  private reflLadder: number[] = [];
  private reflSizeIndex = 0;
  private reflScaleCooldown_s = 0;
  private readonly prevCamPos = new THREE.Vector3();
  private readonly prevCamQuat = new THREE.Quaternion();
  private camMotion = 1;

  constructor(
    private readonly renderer: THREE.WebGLRenderer,
    private readonly oceanMat: OceanMaterial,
    private readonly hideList: THREE.Object3D[]
  ) {}

  rebuild(params: AppParams): void {
    this.planarRefl?.dispose();
    this.planarRefl = null;

    this.reflLadder = reflLadderForQuality(params.quality);
    this.reflSizeIndex = Math.max(0, this.reflLadder.length - 1);
    const size = planarSizeForQuality(params.quality, this.reflLadder);
    this.reflSizeTarget = size;
    this.reflScaleCooldown_s = 0;
    this.reflTimer_s = 0;
    this.reflUpdateCount = 0;
    this.reflRateTimer_s = 0;
    this.reflUpdatesPerSec = 0;

    if (size <= 0) {
      this.oceanMat.bindPlanarReflection(null, null);
      this.oceanMat.setPlanarReflectionStrength(0);
      return;
    }

    const generateMipmaps = !IS_MOBILE_LIKE && (params.quality === 'High' || params.quality === 'Max');

    this.planarRefl = new PlanarReflection(this.renderer, {
      size,
      generateMipmaps,
      clipBias: 0.0012
    });

    this.oceanMat.setPlanarReflectionSampling({
      texel: 1 / size,
      blur: 0,
      edgeFade: 0.02
    });

    this.oceanMat.bindPlanarReflection(this.planarRefl.renderTarget.texture, this.planarRefl.textureMatrix);
  }

  update(args: {
    dt: number;
    dtEma_s: number;
    params: AppParams;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    tideHeight_m: number;
    storminess: number;
    foamBoost: number;
    lightningFlashFx: number;
    underwater: boolean;
  }): void {
    if (!this.planarRefl || args.underwater) {
      this.oceanMat.setPlanarReflectionStrength(0.0);
      return;
    }

    const { dt, params, scene, camera, tideHeight_m, storminess, foamBoost, lightningFlashFx, dtEma_s } = args;

    this.reflScaleCooldown_s = Math.max(0, this.reflScaleCooldown_s - dt);
    if (this.reflScaleCooldown_s <= 0 && this.reflLadder.length > 1) {
      const dtMs = dtEma_s * 1000;
      const wantsDown = dtMs > 23.5;
      const wantsUp = dtMs < 17.0;

      if (wantsDown && this.reflSizeIndex > 0) {
        this.reflSizeIndex--;
        this.reflScaleCooldown_s = 1.25;
      } else if (wantsUp && this.reflSizeIndex < this.reflLadder.length - 1) {
        this.reflSizeIndex++;
        this.reflScaleCooldown_s = 2.0;
      }

      const desired = this.reflLadder[this.reflSizeIndex];
      if (desired !== this.reflSizeTarget) {
        this.reflSizeTarget = desired;
        this.planarRefl.setSize(this.reflSizeTarget);
      }
    }

    const move = camera.position.distanceTo(this.prevCamPos);
    const qdot = Math.abs(this.prevCamQuat.dot(camera.quaternion));
    const rot = 2 * Math.acos(clamp(qdot, 0, 1));
    this.prevCamPos.copy(camera.position);
    this.prevCamQuat.copy(camera.quaternion);

    this.camMotion = move * 45 + rot * 18;
    const slow = this.camMotion < 0.75;

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

    const lightningRefl = lightningFlashFx > 0.05;
    const interval = lightningRefl ? 0.0 : (slow ? slowInterval(params.quality) : moveInterval(params.quality));
    this.reflTimer_s += dt;
    if (this.reflTimer_s >= interval) {
      this.planarRefl.update(this.renderer, scene, camera, tideHeight_m, this.hideList);
      this.reflTimer_s = 0;
      this.reflUpdateCount++;
    }

    this.reflRateTimer_s += dt;
    if (this.reflRateTimer_s >= 1.0) {
      this.reflUpdatesPerSec = this.reflUpdateCount / this.reflRateTimer_s;
      this.reflUpdateCount = 0;
      this.reflRateTimer_s = 0;
    }

    const baseStrength = (params.quality === 'Max') ? 1.0 : (params.quality === 'High' ? 0.95 : 0.90);
    const roughSea = clamp(foamBoost * 0.80 + storminess * 0.60, 0, 1);
    const lightningBoost = clamp(lightningFlashFx * (0.35 + 0.65 * storminess), 0, 0.85);
    const strength = baseStrength * lerp(1.0, 0.62, roughSea) + lightningBoost;
    this.oceanMat.setPlanarReflectionStrength(strength);

    const blurMax = (params.quality === 'Max') ? 2.2 : (params.quality === 'High' ? 1.25 : 0.0);
    const blur = blurMax * roughSea;
    this.oceanMat.setPlanarReflectionSampling({
      texel: 1 / Math.max(1, this.reflSizeTarget),
      blur,
      edgeFade: 0.03
    });
  }

  dispose(): void {
    this.planarRefl?.dispose();
    this.planarRefl = null;
  }
}

function reflLadderForQuality(q: AppParams['quality']): number[] {
  if (q === 'Low') return [256, 384];
  if (q === 'Medium') return [512];
  if (q === 'High') return [768];
  return [768, 1024];
}

function planarSizeForQuality(q: AppParams['quality'], ladder: number[]): number {
  if (ladder.length === 1) return ladder[0];
  if (IS_MOBILE_LIKE) return ladder[0];

  const shortSide = Math.min(window.innerWidth, window.innerHeight);
  return shortSide >= 800 ? ladder[1] : ladder[0];
}
