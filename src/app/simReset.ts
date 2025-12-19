import type * as THREE from 'three';
import type { WaveComponent } from '../lib/spectrum';
import type { AppParams } from '../lib/ui';
import type { WeatherSim } from '../lib/weather';
import type { SeaOtter } from '../lib/otter';
import type { OceanLife } from '../lib/life';
import type { FoamField } from '../lib/foamField';

export type ResetSimulationState = {
  simTime_s: number;
  seaHs_m: number;
  seaTp_s: number;
  windDirTo_rad: number;
  swellDirTo_rad: number;
  wavesCurrent: WaveComponent[];
  wavesTarget: WaveComponent[];
  needsRebuild: boolean;
  otterSpeed_mps: number;
};

export function resetSimulationState(opts: {
  params: AppParams;
  weatherSim: WeatherSim;
  timeOfDay_h: number;
  dayOfYear: number;
  otter: SeaOtter;
  life: OceanLife;
  renderer: THREE.WebGLRenderer;
  foamField: FoamField;
  otterPrevXZ: THREE.Vector2;
}): ResetSimulationState {
  const {
    params,
    weatherSim,
    timeOfDay_h,
    dayOfYear,
    otter,
    life,
    renderer,
    foamField,
    otterPrevXZ
  } = opts;

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
  // Clear persistent foam between runs.
  foamField.reset(renderer, otterPrevXZ);

  return {
    simTime_s: 0,
    // Start *immediately* in a dramatic sea-state (no long "wave growth" ramp).
    seaHs_m: 13.5,
    seaTp_s: 13.8,
    windDirTo_rad: Math.PI,
    // A slower-moving "memory" direction used for the swell band (milestone #3).
    swellDirTo_rad: Math.PI,
    wavesCurrent: [],
    wavesTarget: [],
    needsRebuild: true,
    otterSpeed_mps: 0
  };
}
