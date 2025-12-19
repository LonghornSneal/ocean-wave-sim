import * as THREE from 'three';
import { clamp, lerp } from '../math';
import type { RigNodes } from './types';

export type OtterAnimationSetupResult = {
  mixer: THREE.AnimationMixer;
  mixerRoot: THREE.Object3D;
  idleAction: THREE.AnimationAction | null;
  paddleAction: THREE.AnimationAction | null;
  diveAction: THREE.AnimationAction | null;
  resurfaceAction: THREE.AnimationAction | null;
  blinkAction: THREE.AnimationAction | null;
  whiskerTwitchAction: THREE.AnimationAction | null;
  blinkTimer_s: number;
  wasUnderwater: boolean;
};

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
      if (prevMixerRoot) prevMixer.uncacheRoot(prevMixerRoot);
    } catch {
      // ignore
    }
  }

  const mixer = new THREE.AnimationMixer(model);

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
  let paddleAction: THREE.AnimationAction | null = null;
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
    } else if (c.name === 'Paddle') {
      a.setLoop(THREE.LoopRepeat, Infinity);
      a.enabled = true;
      a.play();
      a.setEffectiveWeight(0.0);
      paddleAction = a;
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
    mixerRoot: model,
    idleAction,
    paddleAction,
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
  storm: number;
  chaos: number;
  speed_mps: number;
  paddlePeriod_s: number;
  mixer: THREE.AnimationMixer | null;
  paddleAction: THREE.AnimationAction | null;
  diveAction: THREE.AnimationAction | null;
  resurfaceAction: THREE.AnimationAction | null;
  blinkAction: THREE.AnimationAction | null;
  whiskerTwitchAction: THREE.AnimationAction | null;
  paddleImpulse01: number;
  blinkTimer_s: number;
  wasUnderwater: boolean;
  isUnderwaterView: boolean;
  rng: () => number;
}): { blinkTimer_s: number; wasUnderwater: boolean; paddleImpulse01: number } {
  const {
    dt,
    storm,
    chaos,
    speed_mps,
    paddlePeriod_s,
    mixer,
    paddleAction,
    diveAction,
    resurfaceAction,
    blinkAction,
    whiskerTwitchAction,
    isUnderwaterView,
    rng
  } = opts;

  if (!mixer) {
    return {
      blinkTimer_s: opts.blinkTimer_s,
      wasUnderwater: opts.wasUnderwater,
      paddleImpulse01: opts.paddleImpulse01
    };
  }

  const move01 = clamp(speed_mps / 0.18, 0, 1);
  const paddleBase = clamp(0.18 + 0.95 * (storm * 0.65 + chaos * 0.6), 0, 1);
  const paddleW = clamp(paddleBase * (0.25 + 0.75 * move01), 0, 1);

  if (paddleAction) {
    paddleAction.setEffectiveWeight(paddleW);
    paddleAction.setEffectiveTimeScale(lerp(0.7, 1.6, paddleW));
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

  mixer.update(dt);

  // Paddle impulses (wake/splash boost): 2 pulses per cycle.
  let impulse = 0;
  if (paddleAction) {
    const t = (paddleAction.time % paddlePeriod_s) / paddlePeriod_s;
    const p0 = Math.exp(-Math.pow((t - 0.18) / 0.07, 2.0));
    const p1 = Math.exp(-Math.pow((t - 0.68) / 0.07, 2.0));
    impulse = clamp((p0 + p1) * 0.85 * paddleW, 0, 1);
  }

  return {
    blinkTimer_s,
    wasUnderwater: underNow,
    paddleImpulse01: impulse
  };
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
