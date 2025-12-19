import * as THREE from 'three';
import { clamp, lerp } from '../math';
import type { OtterLookMode } from '../otter';

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

  return { lookMode, lookTimer_s, gazeYawOffset, gazeYawOffsetTarget };
}
