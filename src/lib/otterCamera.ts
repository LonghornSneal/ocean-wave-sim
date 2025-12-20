import * as THREE from 'three';
import { clamp, lerp, radToDeg } from './math';

const CAMERA_LENS_MM = 35;
const CAMERA_SENSOR_HEIGHT_MM = 24;
const DEFAULT_CAMERA_DISTANCE_M = 9.0;
const DEFAULT_CAMERA_HEIGHT_M = 1.6;
// 35mm full-frame equivalent vertical FOV (~38°) for natural scale cues.
export const CAMERA_FOV_DEG = radToDeg(2 * Math.atan((CAMERA_SENSOR_HEIGHT_MM * 0.5) / CAMERA_LENS_MM));

export interface OtterCameraInputs {
  dt_s: number;
  /** Otter gaze direction (where it is looking). */
  gazeDir: THREE.Vector3;
  /** Otter body forward direction in world space (keeps 3rd-person perspective stable). */
  bodyForward: THREE.Vector3;
  headPos: THREE.Vector3;
  eyePos: THREE.Vector3;
  surfaceHeight_m: number;
  /** Optional filtered surface height for subtle camera heave (world-space Y). */
  heaveTarget_m?: number;
  /** Mean sea level (tide offset). */
  seaLevel_m: number;
  underwater: boolean;
  storminess: number; // 0..1

  /** Optional third-person follow distance behind the otter (meters). */
  followDistance_m?: number;

  /** Optional third-person follow elevation above the water surface (meters). */
  followElevation_m?: number;
}

export class OtterCameraRig {
  private readonly tmpPos = new THREE.Vector3();
  private readonly tmpLook = new THREE.Vector3();
  private readonly tmpFwd = new THREE.Vector3();
  private readonly tmpGaze = new THREE.Vector3();
  private readonly up = new THREE.Vector3(0, 1, 0);

  // Smoothed camera position (start at the default gameplay distance).
  private camPos = new THREE.Vector3(0, DEFAULT_CAMERA_HEIGHT_M, DEFAULT_CAMERA_DISTANCE_M);

  // Smoothed look target to avoid jitter from gaze/head node noise.
  private lookAtPos = new THREE.Vector3(0, 1.2, 0);

  // Smoothed waterline (prevents the camera from bobbing violently with every wave).
  private waterY_m = 0;
  private waveOffset_m = 0;
  private heaveOffset_m = 0;

  private initialized = false;

  public update(camera: THREE.PerspectiveCamera, inp: OtterCameraInputs): void {
    const dt = inp.dt_s;
    // Camera gaze: we intentionally clamp the pitch so the camera doesn't
    // aggressively dive toward the ocean (which can feel like a black-screen
    // "snap" on mobile when the otter looks down).
    const gaze = this.tmpGaze.copy(inp.gazeDir);
    if (gaze.lengthSq() > 1e-10) gaze.normalize();
    else gaze.set(0, 0.12, -1);

    // Clamp pitch (keep some horizon in-frame). This is *camera* gaze only;
    // the otter can still look wherever it wants.
    gaze.y = clamp(gaze.y, -0.25, 0.95);
    gaze.normalize();

    // Third-person: keep a cinematic "behind-otter" perspective (reference look).
    // Use bodyForward for camera position, and gazeDir only for where the camera looks.
    const storm = clamp(inp.storminess, 0, 1);

    const baseDist = clamp(inp.followDistance_m ?? DEFAULT_CAMERA_DISTANCE_M, 9.0, 18.0);
    const baseElev = clamp(inp.followElevation_m ?? DEFAULT_CAMERA_HEIGHT_M, 0.35, 3.0);

    // Keep the follow distance/elevation stable (avoid "shaky" feeling).
    // Storms slightly increase smoothing instead of changing the framing.
    const followDist = baseDist;
    const observerHeight = baseElev;

    const fwd = this.tmpFwd.copy(inp.bodyForward);
    fwd.y = 0;
    if (fwd.lengthSq() < 1e-6) {
      fwd.copy(gaze);
      fwd.y = 0;
    }
    fwd.normalize();

    const desired = this.tmpPos.copy(inp.eyePos).addScaledVector(fwd, -followDist);

    // Smooth the waterline we clamp against so the camera doesn't "buzz" when
    // sampling a detailed wave field.
    const seaLevel = inp.seaLevel_m;
    const waveOffset = inp.surfaceHeight_m - seaLevel;
    if (!this.initialized) {
      this.waterY_m = inp.surfaceHeight_m;
      this.waveOffset_m = waveOffset;
    } else {
      const tauWater = lerp(0.35, 0.55, storm);
      const kWater = 1 - Math.exp(-dt / Math.max(1e-3, tauWater));
      this.waveOffset_m = lerp(this.waveOffset_m, waveOffset, kWater);
      this.waterY_m = seaLevel + this.waveOffset_m;
    }

    // Subtle heave so the camera inherits some bob without aggressive motion.
    let heaveAnchor: number | null = null;
    if (typeof inp.heaveTarget_m === 'number' && Number.isFinite(inp.heaveTarget_m)) {
      heaveAnchor = inp.heaveTarget_m;
      if (inp.underwater) {
        heaveAnchor = Math.max(heaveAnchor, inp.surfaceHeight_m);
      }
    }

    const tauHeave = lerp(0.24, 0.38, storm);
    const kHeave = 1 - Math.exp(-dt / Math.max(1e-3, tauHeave));
    if (heaveAnchor !== null) {
      const heaveRaw = heaveAnchor - this.waterY_m;
      const heaveScale = lerp(0.22, 0.12, storm);
      const heaveDesired = clamp(heaveRaw * heaveScale, -0.35, 0.35);
      this.heaveOffset_m = this.initialized ? lerp(this.heaveOffset_m, heaveDesired, kHeave) : heaveDesired;
    } else if (this.initialized) {
      this.heaveOffset_m = lerp(this.heaveOffset_m, 0, kHeave);
    } else {
      this.heaveOffset_m = 0;
    }

    // Keep camera at a stable observer height above the (smoothed) waterline.
    desired.y = Math.max(this.waterY_m + observerHeight + this.heaveOffset_m, this.waterY_m + 0.26);
    if (inp.underwater) {
      const surfaceGuard = (heaveAnchor ?? inp.surfaceHeight_m) + 0.08;
      desired.y = Math.max(desired.y, surfaceGuard);
    }

    // More damping in storms (reduce shake instead of changing the framing).
    const tau = lerp(0.22, 0.38, storm);
    const k = 1 - Math.exp(-dt / Math.max(1e-3, tau));
    if (!this.initialized) {
      this.camPos.copy(desired);
    } else {
      this.camPos.lerp(desired, k);
    }

    camera.position.copy(this.camPos);
    camera.fov = lerp(camera.fov, CAMERA_FOV_DEG, clamp(dt * 2.0, 0, 1));
    camera.updateProjectionMatrix();

    const lookDist = 60;

    const desiredLook = this.tmpLook.copy(inp.eyePos).addScaledVector(gaze, lookDist);

    // Don't let the camera stare *too* far below the surface when we're above water.
    // This keeps the scene readable (sky + horizon) and avoids "all-water" frames.
    desiredLook.y = Math.max(desiredLook.y, this.waterY_m - 2.5);
    if (!this.initialized) {
      this.lookAtPos.copy(desiredLook);
      this.initialized = true;
    } else {
      const tauLook = lerp(0.14, 0.24, storm);
      const kLook = 1 - Math.exp(-dt / Math.max(1e-3, tauLook));
      this.lookAtPos.lerp(desiredLook, kLook);
    }

    camera.lookAt(this.lookAtPos);
  }
}
