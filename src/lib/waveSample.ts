import * as THREE from 'three';
import { waveMatchesTags, type WaveBandTag, type WaveComponent, type WaveTagMatchMode } from './spectrum';
import { modulateWaveComponent, pulseWindow01, type RogueWaveModulation, type RogueWaveState, type SeismicPulseState } from './wavePhysics';
import { clamp, hash1 } from './math';

export interface WaveSample {
  height_m: number;
  normal: THREE.Vector3;
  disp: THREE.Vector3;
  slope: number;
  orbitalVelY_mps: number;
}

export interface WaveSampleOptions {
  includeTags?: WaveBandTag[];
  excludeTags?: WaveBandTag[];
  tagMode?: WaveTagMatchMode;
  /** Apply per-band crest sharpness to slope/normal derivatives. */
  applyCrestSharpness?: boolean;
}

export interface WaveSampleScratch {
  /** Scratch buffers to avoid per-call allocations when sampling frequently. */
  octaveCounts: Map<number, number>;
  rogueMod: RogueWaveModulation;
}

const OCTAVE_REF_WAVELENGTH_M = 1.0;
const HIGH_FREQ_OCTAVE = -2;
const MAX_WAVES_PER_OCTAVE = 3;
const PHASE_JITTER_MAX_RAD = 0.45;
const PHASE_JITTER_OCTAVES = 3;

/**
 * Sample the Gerstner stack used in the ocean shader at a world position.
 * Optional tag filtering + crest sharpness weighting allow band-specific sampling.
 */
export function sampleGerstner(
  waves: WaveComponent[],
  worldXZ: THREE.Vector2,
  time_s: number,
  currentXZ: THREE.Vector2,
  tideHeight_m: number,
  out: WaveSample = {
    height_m: 0,
    normal: new THREE.Vector3(),
    disp: new THREE.Vector3(),
    slope: 0,
    orbitalVelY_mps: 0
  },
  tmpT: THREE.Vector3 = new THREE.Vector3(),
  tmpB: THREE.Vector3 = new THREE.Vector3(),
  rogue?: RogueWaveState,
  pulse?: SeismicPulseState | null,
  opts?: WaveSampleOptions,
  scratch?: WaveSampleScratch
): WaveSample {
  const disp = out.disp;
  disp.set(0, 0, 0);
  out.orbitalVelY_mps = 0;

  // Partial derivatives for normal reconstruction (matches shader)
  let dxdx = 0.0;
  let dxdz = 0.0;
  let dzdx = 0.0;
  let dzdz = 0.0;
  let dydx = 0.0;
  let dydz = 0.0;
  let velY = 0.0;

  const octaveCounts = scratch?.octaveCounts ?? new Map<number, number>();
  octaveCounts.clear();
  const mod: RogueWaveModulation = scratch?.rogueMod ?? { A: 0, phase: 0, Q: 0 };
  const waveCount = waves.length;
  const includeTags = opts?.includeTags;
  const excludeTags = opts?.excludeTags;
  const tagMode = opts?.tagMode ?? 'any';
  const applyCrest = opts?.applyCrestSharpness ?? false;

  for (let i = 0; i < waves.length; i++) {
    const w = waves[i];
    if (!waveMatchesTags(w, includeTags, excludeTags, tagMode)) continue;
    const m = modulateWaveComponent(w, i, waveCount, rogue, mod);
    const dirX = w.dirX;
    const dirZ = w.dirZ;
    const A = m.A;
    const k = w.k;
    const omegaRaw = w.omega;
    const phase0 = m.phase;
    const Q = m.Q;
    const crestWeight = applyCrest ? clamp(w.band.crestSharpness, 0, 1) : 1.0;
    const ASharp = A * crestWeight;

    const wavelength = (2 * Math.PI) / Math.max(1e-6, k);
    const octave = Math.floor(Math.log2(wavelength / OCTAVE_REF_WAVELENGTH_M));
    if (octave <= HIGH_FREQ_OCTAVE) {
      const count = octaveCounts.get(octave) ?? 0;
      if (count >= MAX_WAVES_PER_OCTAVE) continue;
      octaveCounts.set(octave, count + 1);
    }

    let phase = phase0;
    if (octave <= HIGH_FREQ_OCTAVE) {
      const jitterStrength = clamp((HIGH_FREQ_OCTAVE - octave) / PHASE_JITTER_OCTAVES, 0, 1);
      const jitter = (hash1(i * 19.37 + k * 0.07) - 0.5) * (PHASE_JITTER_MAX_RAD * jitterStrength);
      phase += jitter;
    }

    const seiche = omegaRaw < 0;
    const omega = seiche ? -omegaRaw : omegaRaw;
    const dotCur = dirX * currentXZ.x + dirZ * currentXZ.y;
    const ww = seiche ? omega : omega + k * dotCur;
    const theta = k * (dirX * worldXZ.x + dirZ * worldXZ.y) - ww * time_s + phase;

    const s = seiche ? Math.cos(theta) : Math.sin(theta);
    const c = seiche ? -Math.sin(theta) : Math.cos(theta);
    const Qeff = seiche ? 0 : Q;

    disp.y += ASharp * s;
    disp.x += dirX * (Qeff * ASharp * c);
    disp.z += dirZ * (Qeff * ASharp * c);
    velY += -ASharp * ww * c;

    const WAk = Qeff * ASharp * k;

    dxdx += -dirX * dirX * WAk * s;
    dxdz += -dirX * dirZ * WAk * s;
    dzdx += -dirZ * dirX * WAk * s;
    dzdz += -dirZ * dirZ * WAk * s;

    dydx += ASharp * k * dirX * c;
    dydz += ASharp * k * dirZ * c;
  }

  if (pulse && pulse.component.A > 1e-6) {
    const gate = pulseWindow01(time_s, pulse.startTime_s, pulse.duration_s);
    if (gate > 1e-6) {
      const p = pulse.component;
      const dirX = p.dirX;
      const dirZ = p.dirZ;
      const relX = worldXZ.x - pulse.originXZ.x;
      const relZ = worldXZ.y - pulse.originXZ.y;
      const sPos = dirX * relX + dirZ * relZ;
      const tPulse = time_s - pulse.startTime_s;
      const decay = Math.max(1e-3, p.decayLength_m);
      const dist = sPos - p.groupSpeed_mps * tPulse;
      const env = Math.exp(-(dist * dist) / (decay * decay));
      const A = p.A * env * gate;
      const k = p.k;
      const omega = p.omega;
      const phase0 = p.phase;
      const Q = p.Q;

      const dotCur = dirX * currentXZ.x + dirZ * currentXZ.y;
      const w = omega + k * dotCur;
      const theta = k * sPos - w * tPulse + phase0;

      const s = Math.sin(theta);
      const c = Math.cos(theta);

      disp.y += A * s;
      disp.x += dirX * (Q * A * c);
      disp.z += dirZ * (Q * A * c);
      velY += -A * w * c;

      const WAk = Q * A * k;

      dxdx += -dirX * dirX * WAk * s;
      dxdz += -dirX * dirZ * WAk * s;
      dzdx += -dirZ * dirX * WAk * s;
      dzdz += -dirZ * dirZ * WAk * s;

      dydx += A * k * dirX * c;
      dydz += A * k * dirZ * c;
    }
  }

  const height = disp.y + tideHeight_m;

  tmpT.set(1.0 + dxdx, dydx, dzdx);
  tmpB.set(dxdz, dydz, 1.0 + dzdz);
  out.normal.crossVectors(tmpB, tmpT).normalize();

  out.slope = 1.0 - out.normal.y;
  out.height_m = height;
  out.orbitalVelY_mps = velY;

  return out;
}
