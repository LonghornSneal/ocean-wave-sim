import * as THREE from 'three';
import { clamp, lerp } from '../math';
import type { OtterLookMode } from '../otter';

const TAU = Math.PI * 2;
const NECK_SHARE = 0.35;
const NECK_YAW_MAX = 0.22;
const HEAD_YAW_MAX = 0.46;
const NECK_PITCH_UP_MAX = 0.18;
const NECK_PITCH_DOWN_MAX = 0.16;
const HEAD_PITCH_UP_MAX = 0.38;
const HEAD_PITCH_DOWN_MAX = 0.34;
const TOTAL_YAW_MAX = HEAD_YAW_MAX + NECK_YAW_MAX;
const TOTAL_PITCH_UP_MAX = HEAD_PITCH_UP_MAX + NECK_PITCH_UP_MAX;
const TOTAL_PITCH_DOWN_MAX = HEAD_PITCH_DOWN_MAX + NECK_PITCH_DOWN_MAX;

function wrapAngle(rad: number): number {
  let r = (rad + Math.PI) % TAU;
  if (r < 0) r += TAU;
  return r - Math.PI;
}

export function updateOtterGaze(opts: {
  dt: number;
  storm: number;
  otterosity: number;
  stormFocus: number;
  yaw: number;
  rng: () => number;
  windDirTo_rad?: number;
  interestDir?: THREE.Vector3;
  lookMode: OtterLookMode;
  lookTimer_s: number;
  gazeYawOffset: number;
  gazeYawOffsetTarget: number;
  gazeDir: THREE.Vector3;
  tmpGazeTarget: THREE.Vector3;
}): {
  lookMode: OtterLookMode;
  lookTimer_s: number;
  gazeYawOffset: number;
  gazeYawOffsetTarget: number;
  headYawTarget: number;
  headPitchTarget: number;
  neckYawTarget: number;
  neckPitchTarget: number;
} {
  const {
    dt,
    storm,
    otterosity,
    stormFocus,
    yaw,
    rng,
    windDirTo_rad,
    interestDir,
    gazeDir,
    tmpGazeTarget
  } = opts;

  let { lookMode, lookTimer_s, gazeYawOffset, gazeYawOffsetTarget } = opts;

  // --- Gaze mode decisions ---
  if (lookTimer_s <= 0) {
    const lookA = otterosity;
    const uw = clamp(0.08 + 0.85 * Math.pow(lookA, 1.18), 0, 1);
    const calm = 1 - storm;
    // Keep underwater looks as an occasional flavor beat.
    // (Too frequent makes the camera stare at featureless water, which can read
    // as random black screens on phones.)
    const pUnder = uw * lerp(0.02, 0.10, calm) * (1.0 - storm * 0.6);
    const pSkyBase = lerp(0.10, 0.26, lookA) * lerp(0.55, 0.25, storm);
    const pSky = pSkyBase * (1.0 - stormFocus);
    const r = rng();

    if (r < pUnder) lookMode = 'Underwater';
    else if (r < pUnder + pSky) lookMode = 'Sky';
    else lookMode = 'Horizon';

    const base = lerp(2.4, 6.5, 1 - storm);
    const jitter = lerp(0.0, 5.0, lookA) * (rng() * 0.6 + 0.4);
    lookTimer_s = base + jitter;

    // Pick a new gaze offset occasionally (then smooth toward it).
    // This keeps camera aim stable while still feeling "alive".
    const maxYawOffset = lerp(0.04, 0.42, lookA) * lerp(1.0, 0.45, stormFocus);
    gazeYawOffsetTarget = (rng() * 2 - 1) * maxYawOffset;
  }

  // Smooth gaze direction (no per-frame RNG jitter)
  gazeYawOffset = lerp(gazeYawOffset, gazeYawOffsetTarget, clamp(dt * 1.2, 0, 1));
  const yawLook = yaw + gazeYawOffset;
  const gx = Math.cos(yawLook);
  const gz = Math.sin(yawLook);
  const gazeTarget = tmpGazeTarget.set(0, 0, 0);
  if (lookMode === 'Horizon') {
    if (stormFocus > 0.001 && typeof windDirTo_rad === 'number') {
      const waveYaw = windDirTo_rad + Math.PI;
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
  } else if (lookMode === 'Sky') {
    if (interestDir && interestDir.y > 0.08 && stormFocus < 0.15) {
      gazeTarget.copy(interestDir).normalize();
    } else {
      gazeTarget.set(gx * 0.2, 0.98, gz * 0.2).normalize();
    }
  } else {
    gazeTarget.set(gx * 0.45, -0.62, gz * 0.45).normalize();
  }
  gazeDir.lerp(gazeTarget, clamp(dt * 2.0, 0, 1)).normalize();

  // Head/neck targets bias toward the camera gaze while clamping to natural ranges.
  const aimDir = tmpGazeTarget.copy(gazeDir);
  const horizLenSq = aimDir.x * aimDir.x + aimDir.z * aimDir.z;
  let yawRel = 0;
  if (horizLenSq > 1e-6) {
    const aimYaw = Math.atan2(aimDir.z, aimDir.x);
    yawRel = wrapAngle(aimYaw - yaw);
  }
  const pitchRel = Math.asin(clamp(aimDir.y, -1, 1));

  const pitchUpScale = lookMode === 'Sky' ? 1.1 : 1.0;
  const pitchDownScale = lookMode === 'Underwater' ? 1.1 : 1.0;
  const yawClamped = clamp(yawRel, -TOTAL_YAW_MAX, TOTAL_YAW_MAX);
  const pitchClamped = clamp(
    pitchRel,
    -TOTAL_PITCH_DOWN_MAX * pitchDownScale,
    TOTAL_PITCH_UP_MAX * pitchUpScale
  );

  const gazeBias = clamp(0.6 + 0.3 * otterosity, 0.6, 0.9);
  const yawBiased = yawClamped * gazeBias;
  const pitchBiased = pitchClamped * gazeBias;

  const neckYawTarget = clamp(yawBiased * NECK_SHARE, -NECK_YAW_MAX, NECK_YAW_MAX);
  const headYawTarget = clamp(yawBiased - neckYawTarget, -HEAD_YAW_MAX, HEAD_YAW_MAX);
  const neckPitchTarget = clamp(pitchBiased * NECK_SHARE, -NECK_PITCH_DOWN_MAX, NECK_PITCH_UP_MAX);
  const headPitchTarget = clamp(pitchBiased - neckPitchTarget, -HEAD_PITCH_DOWN_MAX, HEAD_PITCH_UP_MAX);

  return {
    lookMode,
    lookTimer_s,
    gazeYawOffset,
    gazeYawOffsetTarget,
    headYawTarget,
    headPitchTarget,
    neckYawTarget,
    neckPitchTarget
  };
}
