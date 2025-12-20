import * as THREE from 'three';
import { clamp, hash1, lerp } from '../math';
import type { RigNodes } from './types';

export type OtterAnimationSetupResult = {
  mixer: THREE.AnimationMixer;
  mixerRoot: THREE.Object3D;
  idleAction: THREE.AnimationAction | null;
  swimAction: THREE.AnimationAction | null;
  diveGlideAction: THREE.AnimationAction | null;
  paddleAction: THREE.AnimationAction | null;
  underwaterSwimAction: THREE.AnimationAction | null;
  diveAction: THREE.AnimationAction | null;
  resurfaceAction: THREE.AnimationAction | null;
  blinkAction: THREE.AnimationAction | null;
  whiskerTwitchAction: THREE.AnimationAction | null;
  blinkTimer_s: number;
  wasUnderwater: boolean;
};

type NoiseState = {
  quat: THREE.Quaternion;
  scale: THREE.Vector3;
};

const NOISE_STATE = new WeakMap<THREE.Object3D, NoiseState>();
const TMP_NOISE_QUAT = new THREE.Quaternion();
const TMP_NOISE_EULER = new THREE.Euler();

const HEAD_NOISE_ROT = new THREE.Vector3(0.028, 0.045, 0.016);
const HEAD_NOISE_SCALE = new THREE.Vector3(0.006, 0.008, 0.006);
const TAIL_NOISE_ROT = new THREE.Vector3(0.018, 0.05, 0.04);
const TAIL_NOISE_SCALE = new THREE.Vector3(0.01, 0.008, 0.016);
const WHISKER_NOISE_ROT = new THREE.Vector3(0.02, 0.02, 0.055);
const WHISKER_NOISE_SCALE = new THREE.Vector3(0.012, 0.008, 0.012);
const STROKE_PHASES = [0.18, 0.68];

function noise1D(t: number, seed: number): number {
  const i = Math.floor(t);
  const f = t - i;
  const u = f * f * (3 - 2 * f);
  const a = hash1(i + seed) * 2 - 1;
  const b = hash1(i + 1 + seed) * 2 - 1;
  return lerp(a, b, u);
}

function layeredNoise(t: number, seed: number): number {
  const n1 = noise1D(t * 0.9, seed + 11.71);
  const n2 = noise1D(t * 1.7, seed + 37.4) * 0.55;
  const n3 = noise1D(t * 2.8, seed + 71.9) * 0.25;
  return (n1 + n2 + n3) / 1.8;
}

function getNoiseState(node: THREE.Object3D): NoiseState {
  let state = NOISE_STATE.get(node);
  if (!state) {
    state = { quat: new THREE.Quaternion(), scale: new THREE.Vector3(1, 1, 1) };
    NOISE_STATE.set(node, state);
  }
  return state;
}

function clearNoise(node?: THREE.Object3D): void {
  if (!node) return;
  const state = NOISE_STATE.get(node);
  if (!state) return;
  TMP_NOISE_QUAT.copy(state.quat).invert();
  node.quaternion.multiply(TMP_NOISE_QUAT);
  node.scale.set(
    node.scale.x / state.scale.x,
    node.scale.y / state.scale.y,
    node.scale.z / state.scale.z
  );
  state.quat.identity();
  state.scale.set(1, 1, 1);
}

function applyNoisyOffset(
  node: THREE.Object3D | undefined,
  time_s: number,
  freq: number,
  seed: number,
  strength: number,
  rotAmp: THREE.Vector3,
  scaleAmp: THREE.Vector3
): void {
  if (!node || strength <= 0) return;

  const t = time_s * freq;
  const nX = layeredNoise(t, seed + 0.31);
  const nY = layeredNoise(t, seed + 3.73);
  const nZ = layeredNoise(t, seed + 6.19);

  TMP_NOISE_EULER.set(rotAmp.x * nX * strength, rotAmp.y * nY * strength, rotAmp.z * nZ * strength, 'YXZ');
  TMP_NOISE_QUAT.setFromEuler(TMP_NOISE_EULER);
  node.quaternion.multiply(TMP_NOISE_QUAT);

  const sX = 1 + scaleAmp.x * layeredNoise(t, seed + 9.11) * strength;
  const sY = 1 + scaleAmp.y * layeredNoise(t, seed + 12.67) * strength;
  const sZ = 1 + scaleAmp.z * layeredNoise(t, seed + 17.29) * strength;
  node.scale.set(node.scale.x * sX, node.scale.y * sY, node.scale.z * sZ);

  const state = getNoiseState(node);
  state.quat.copy(TMP_NOISE_QUAT);
  state.scale.set(sX, sY, sZ);
}

export function setupOtterAnimations(opts: {
  model: THREE.Object3D;
  nodes: RigNodes;
  paddlePeriod_s: number;
  rng: () => number;
  prevMixer: THREE.AnimationMixer | null;
  prevMixerRoot: THREE.Object3D | null;
}): OtterAnimationSetupResult {
  const { model, nodes, paddlePeriod_s, rng, prevMixer, prevMixerRoot } = opts;

  // Tear down previous mixer bindings.
  if (prevMixer) {
    try {
      prevMixer.stopAllAction();
      const root = prevMixerRoot ?? prevMixer.getRoot();
      if (root) prevMixer.uncacheRoot(root);
    } catch {
      // ignore
    }
  }

  const mixer = new THREE.AnimationMixer(model);
  const mixerRoot = mixer.getRoot();

  const body = nodes.body;
  const head = nodes.head;
  const tail = nodes.tail;
  const flL = nodes.flipperL;
  const flR = nodes.flipperR;
  const eyeL = nodes.eyeL;
  const eyeR = nodes.eyeR;
  const whiskers = nodes.whiskers;

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
    const len = paddlePeriod_s;
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

  // Swim (surface glide)
  {
    const tracks: THREE.KeyframeTrack[] = [];
    const len = Math.max(1.0, paddlePeriod_s * 1.1);
    const t = [0, len * 0.25, len * 0.5, len * 0.75, len];

    if (body) {
      const q0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.03, 0.0, 0.04, 'YXZ'));
      const q1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.03, 0.0, -0.03, 'YXZ'));
      const q2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.04, 0.0, 0.05, 'YXZ'));
      tracks.push(
        new THREE.QuaternionKeyframeTrack(
          `${body.name}.quaternion`,
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

    if (head) {
      const q0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.03, 0.02, 0.0, 'YXZ'));
      const q1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.02, -0.02, 0.0, 'YXZ'));
      const q2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.035, 0.0, 0.0, 'YXZ'));
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
      const q0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, 0.1));
      const q1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, -0.1));
      tracks.push(
        new THREE.QuaternionKeyframeTrack(
          `${tail.name}.quaternion`,
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
            q0.x,
            q0.y,
            q0.z,
            q0.w,
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

    if (tracks.length) clips.push(new THREE.AnimationClip('Swim', len, tracks));
  }

  // Underwater swim (stronger flipper + tail motion)
  {
    const tracks: THREE.KeyframeTrack[] = [];
    const len = paddlePeriod_s;
    const t = [0, len * 0.25, len * 0.5, len * 0.75, len];
    const flapA = 0.75;
    const flapB = -0.45;

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

    if (tail) {
      const qa = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, 0.18));
      const qb = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, -0.18));
      tracks.push(
        new THREE.QuaternionKeyframeTrack(
          `${tail.name}.quaternion`,
          [0, len * 0.5, len],
          [qa.x, qa.y, qa.z, qa.w, qb.x, qb.y, qb.z, qb.w, qa.x, qa.y, qa.z, qa.w]
        )
      );
    }

    if (tracks.length) clips.push(new THREE.AnimationClip('UnderwaterSwim', len, tracks));
  }

  // Dive glide (body pitch down)
  {
    const tracks: THREE.KeyframeTrack[] = [];
    const len = Math.max(0.9, paddlePeriod_s * 0.95);
    const t = [0, len * 0.33, len * 0.66, len];

    if (body) {
      const q0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.06, 0.0, 0.02, 'YXZ'));
      const q1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.16, 0.0, -0.02, 'YXZ'));
      const q2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.1, 0.0, 0.03, 'YXZ'));
      tracks.push(
        new THREE.QuaternionKeyframeTrack(
          `${body.name}.quaternion`,
          t,
          [q0.x, q0.y, q0.z, q0.w, q1.x, q1.y, q1.z, q1.w, q2.x, q2.y, q2.z, q2.w, q0.x, q0.y, q0.z, q0.w]
        )
      );
    }

    if (head) {
      const q0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.16, 0.0, 0.0, 'YXZ'));
      const q1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.32, 0.02, 0.0, 'YXZ'));
      const q2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.22, -0.02, 0.0, 'YXZ'));
      tracks.push(
        new THREE.QuaternionKeyframeTrack(
          `${head.name}.quaternion`,
          t,
          [q0.x, q0.y, q0.z, q0.w, q1.x, q1.y, q1.z, q1.w, q2.x, q2.y, q2.z, q2.w, q0.x, q0.y, q0.z, q0.w]
        )
      );
    }

    if (tail) {
      const q0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, 0.12));
      const q1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, -0.12));
      const q2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.0, 0.0, 0.08));
      tracks.push(
        new THREE.QuaternionKeyframeTrack(
          `${tail.name}.quaternion`,
          t,
          [q0.x, q0.y, q0.z, q0.w, q1.x, q1.y, q1.z, q1.w, q2.x, q2.y, q2.z, q2.w, q0.x, q0.y, q0.z, q0.w]
        )
      );
    }

    if (tracks.length) clips.push(new THREE.AnimationClip('DiveGlide', len, tracks));
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

  let idleAction: THREE.AnimationAction | null = null;
  let swimAction: THREE.AnimationAction | null = null;
  let diveGlideAction: THREE.AnimationAction | null = null;
  let paddleAction: THREE.AnimationAction | null = null;
  let underwaterSwimAction: THREE.AnimationAction | null = null;
  let diveAction: THREE.AnimationAction | null = null;
  let resurfaceAction: THREE.AnimationAction | null = null;
  let blinkAction: THREE.AnimationAction | null = null;
  let whiskerTwitchAction: THREE.AnimationAction | null = null;

  // Bind actions
  for (const c of clips) {
    const a = mixer.clipAction(c);
    if (c.name === 'Idle') {
      a.setLoop(THREE.LoopRepeat, Infinity);
      a.play();
      idleAction = a;
    } else if (c.name === 'Swim') {
      a.setLoop(THREE.LoopRepeat, Infinity);
      a.enabled = true;
      a.play();
      a.setEffectiveWeight(0.0);
      swimAction = a;
    } else if (c.name === 'DiveGlide') {
      a.setLoop(THREE.LoopRepeat, Infinity);
      a.enabled = true;
      a.play();
      a.setEffectiveWeight(0.0);
      diveGlideAction = a;
    } else if (c.name === 'Paddle') {
      a.setLoop(THREE.LoopRepeat, Infinity);
      a.enabled = true;
      a.play();
      a.setEffectiveWeight(0.0);
      paddleAction = a;
    } else if (c.name === 'UnderwaterSwim') {
      a.setLoop(THREE.LoopRepeat, Infinity);
      a.enabled = true;
      a.play();
      a.setEffectiveWeight(0.0);
      underwaterSwimAction = a;
    } else if (c.name === 'Dive') {
      a.setLoop(THREE.LoopOnce, 1);
      a.clampWhenFinished = true;
      a.enabled = true;
      diveAction = a;
    } else if (c.name === 'Resurface') {
      a.setLoop(THREE.LoopOnce, 1);
      a.clampWhenFinished = true;
      a.enabled = true;
      resurfaceAction = a;
    } else if (c.name === 'Blink') {
      a.setLoop(THREE.LoopOnce, 1);
      a.clampWhenFinished = true;
      a.enabled = true;
      blinkAction = a;
    } else if (c.name === 'WhiskerTwitch') {
      a.setLoop(THREE.LoopOnce, 1);
      a.clampWhenFinished = true;
      a.enabled = true;
      whiskerTwitchAction = a;
    }
  }

  return {
    mixer,
    mixerRoot,
    idleAction,
    swimAction,
    diveGlideAction,
    paddleAction,
    underwaterSwimAction,
    diveAction,
    resurfaceAction,
    blinkAction,
    whiskerTwitchAction,
    blinkTimer_s: 2.5 + rng() * 3.5,
    wasUnderwater: false
  };
}

export function updateOtterAnimations(opts: {
  dt: number;
  time_s: number;
  storm: number;
  otterosity: number;
  nodes: RigNodes;
  paddlePeriod_s: number;
  mixer: THREE.AnimationMixer | null;
  idleAction: THREE.AnimationAction | null;
  swimAction: THREE.AnimationAction | null;
  diveGlideAction: THREE.AnimationAction | null;
  paddleAction: THREE.AnimationAction | null;
  underwaterSwimAction: THREE.AnimationAction | null;
  diveAction: THREE.AnimationAction | null;
  resurfaceAction: THREE.AnimationAction | null;
  blinkAction: THREE.AnimationAction | null;
  whiskerTwitchAction: THREE.AnimationAction | null;
  speed01: number;
  submergence01: number;
  storminess01: number;
  locomotionBlend01: number;
  strokeRate: number;
  waveStrokeBoost01: number;
  paddleImpulse01: number;
  blinkTimer_s: number;
  wasUnderwater: boolean;
  isUnderwaterView: boolean;
  secondaryMotion: boolean;
  rng: () => number;
}): { blinkTimer_s: number; wasUnderwater: boolean; paddleImpulse01: number; strokeImpact01: number } {
  const {
    dt,
    time_s,
    storm,
    otterosity,
    nodes,
    paddlePeriod_s,
    mixer,
    idleAction,
    swimAction,
    diveGlideAction,
    paddleAction,
    underwaterSwimAction,
    diveAction,
    resurfaceAction,
    blinkAction,
    whiskerTwitchAction,
    speed01,
    submergence01,
    storminess01,
    locomotionBlend01,
    strokeRate,
    waveStrokeBoost01,
    isUnderwaterView,
    secondaryMotion,
    rng
  } = opts;

  const head = nodes.head;
  const tail = nodes.tail;
  const whiskers = nodes.whiskers;

  clearNoise(head);
  clearNoise(tail);
  clearNoise(whiskers);

  if (!mixer) {
    return {
      blinkTimer_s: opts.blinkTimer_s,
      wasUnderwater: opts.wasUnderwater,
      paddleImpulse01: opts.paddleImpulse01,
      strokeImpact01: 0
    };
  }

  const speedW = clamp(speed01, 0, 1);
  const stormW = clamp(storminess01, 0, 1);
  const submergeW = clamp(submergence01, 0, 1);
  const activityW = clamp(speedW * 0.75 + stormW * 0.35, 0, 1);

  let idleW = clamp(1 - activityW, 0, 1);
  let swimW = activityW * (1 - submergeW);
  let diveW = activityW * submergeW;
  const bodyTotal = idleW + swimW + diveW;
  if (bodyTotal > 1e-4) {
    const inv = 1 / bodyTotal;
    idleW *= inv;
    swimW *= inv;
    diveW *= inv;
  }

  const blendRate = clamp(dt * lerp(2.5, 5.5, stormW), 0, 1);
  const applyWeight = (action: THREE.AnimationAction | null, target: number): number => {
    if (!action) return target;
    const next = lerp(action.getEffectiveWeight(), target, blendRate);
    action.setEffectiveWeight(next);
    return next;
  };

  applyWeight(idleAction, idleW);
  applyWeight(swimAction, swimW);
  applyWeight(diveGlideAction, diveW);

  if (swimAction) {
    swimAction.setEffectiveTimeScale(lerp(0.75, 1.4, clamp(speedW + stormW * 0.25, 0, 1)));
  }

  if (diveGlideAction) {
    diveGlideAction.setEffectiveTimeScale(lerp(0.7, 1.3, clamp(speedW + stormW * 0.15, 0, 1)));
  }

  const strokeBlend = clamp(locomotionBlend01, 0, 1);
  const surfaceStrokeTarget = strokeBlend * (1 - submergeW);
  const underwaterStrokeTarget = strokeBlend * submergeW;
  const strokeRateBoosted = strokeRate * (1 + waveStrokeBoost01 * 0.15);

  const aboveW = applyWeight(paddleAction, surfaceStrokeTarget);
  applyWeight(underwaterSwimAction, underwaterStrokeTarget);

  if (paddleAction) {
    paddleAction.setEffectiveTimeScale(strokeRateBoosted);
  }

  if (underwaterSwimAction) {
    underwaterSwimAction.setEffectiveTimeScale(strokeRateBoosted);
  }

  const underNow = isUnderwaterView;
  if (underNow && !opts.wasUnderwater) diveAction?.reset().play();
  else if (!underNow && opts.wasUnderwater) resurfaceAction?.reset().play();

  let blinkTimer_s = opts.blinkTimer_s;
  if (blinkTimer_s <= 0) {
    blinkAction?.reset().play();
    if (whiskerTwitchAction && rng() < 0.7) {
      whiskerTwitchAction.reset().play();
    }
    blinkTimer_s = 2.8 + rng() * 4.5;
  }

  const prevPaddleTime = paddleAction ? paddleAction.time : 0;
  mixer.update(dt);

  let strokeImpact01 = 0;
  if (paddleAction && aboveW > 0.05) {
    const currTime = paddleAction.time;
    const duration = Math.max(1e-4, paddlePeriod_s);
    const prevPhase = ((prevPaddleTime % duration) + duration) % duration / duration;
    const currPhase = ((currTime % duration) + duration) % duration / duration;
    const wrapped = currPhase < prevPhase;
    const peakStrength = clamp(0.85 * aboveW, 0, 1);

    for (const phase of STROKE_PHASES) {
      const crossed = !wrapped ? (phase > prevPhase && phase <= currPhase) : (phase > prevPhase || phase <= currPhase);
      if (crossed) strokeImpact01 += peakStrength;
    }
    strokeImpact01 = clamp(strokeImpact01, 0, 1);
  }

  const stormAmp = lerp(0.15, 1.0, clamp(storm, 0, 1));
  const otterAmp = lerp(0.35, 1.0, clamp(otterosity, 0, 1));
  const noiseStrength = secondaryMotion ? stormAmp * otterAmp : 0;

  applyNoisyOffset(head, time_s, 0.6, 19.2, noiseStrength * 0.75, HEAD_NOISE_ROT, HEAD_NOISE_SCALE);
  applyNoisyOffset(tail, time_s, 1.05, 47.7, noiseStrength, TAIL_NOISE_ROT, TAIL_NOISE_SCALE);
  applyNoisyOffset(whiskers, time_s, 1.4, 83.3, noiseStrength * 0.85, WHISKER_NOISE_ROT, WHISKER_NOISE_SCALE);

  // Paddle impulses (wake/splash boost): 2 pulses per cycle.
  let impulse = 0;
  if (paddleAction && aboveW > 0) {
    const t = (paddleAction.time % paddlePeriod_s) / paddlePeriod_s;
    const p0 = Math.exp(-Math.pow((t - 0.18) / 0.07, 2.0));
    const p1 = Math.exp(-Math.pow((t - 0.68) / 0.07, 2.0));
    impulse = clamp((p0 + p1) * 0.85 * aboveW, 0, 1);
  }

  return {
    blinkTimer_s,
    wasUnderwater: underNow,
    paddleImpulse01: impulse,
    strokeImpact01
  };
}

export function applyOtterGazePose(opts: {
  nodes: RigNodes;
  headYaw: number;
  headPitch: number;
  neckYaw: number;
  neckPitch: number;
}): void {
  const { nodes, headYaw, headPitch, neckYaw, neckPitch } = opts;
  const head = nodes.head;
  const neck = nodes.neck;
  if (!head && !neck) return;

  if (neck) {
    neck.rotation.x += neckPitch;
    neck.rotation.y += neckYaw;
  }
  if (head) {
    const yaw = neck ? headYaw : headYaw + neckYaw;
    const pitch = neck ? headPitch : headPitch + neckPitch;
    head.rotation.x += pitch;
    head.rotation.y += yaw;
  }
}

export function applyOtterStormPose(opts: {
  nodes: RigNodes;
  time_s: number;
  storm: number;
  chaos: number;
  stormPhase: number;
  stormPhase2: number;
}): void {
  const { nodes, time_s, storm, chaos, stormPhase, stormPhase2 } = opts;
  const head = nodes.head;
  const tail = nodes.tail;
  const flL = nodes.flipperL;
  const flR = nodes.flipperR;
  if (!head && !tail && !flL && !flR) return;

  const brace = clamp(storm * (0.35 + 0.65 * chaos), 0, 1);
  if (brace <= 0.001) return;

  const nod = Math.sin(time_s * (2.2 + 1.3 * chaos) + stormPhase) * 0.12 * brace;
  const yaw = Math.sin(time_s * (1.7 + 1.1 * chaos) + stormPhase2) * 0.10 * brace;
  const flap = Math.sin(time_s * (3.1 + 1.6 * chaos) + stormPhase2) * 0.18 * brace;

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
