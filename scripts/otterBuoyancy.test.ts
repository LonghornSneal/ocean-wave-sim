import assert from 'node:assert/strict';

import { clamp, lerp } from '../src/lib/math';

// Keep these in sync with SeaOtter buoyancy spring tuning in src/lib/otter.ts.
const SPRING_K_MIN = 36.0;
const SPRING_K_MAX = 225.0;
const SPRING_CHAOS_SCALE = 1.3;
const SPRING_DAMPING_RATIO = 1.0;
const SPRING_MAX_IMPULSE_MPS = 8.0;
const SPRING_MAX_SPEED_MPS = 10.0;

type SpringState = {
  y: number;
  v: number;
};

function stepSpring(state: SpringState, targetY: number, dt: number, storm: number, chaos: number): void {
  const kBase = lerp(SPRING_K_MIN, SPRING_K_MAX, storm);
  const stiffness = kBase * lerp(1.0, SPRING_CHAOS_SCALE, chaos);
  const omega = Math.sqrt(stiffness);
  const damping = 2 * omega * SPRING_DAMPING_RATIO;
  const offset = targetY - state.y;
  const accel = offset * stiffness - damping * state.v;
  const dv = clamp(accel * dt, -SPRING_MAX_IMPULSE_MPS, SPRING_MAX_IMPULSE_MPS);
  state.v = clamp(state.v + dv, -SPRING_MAX_SPEED_MPS, SPRING_MAX_SPEED_MPS);
  state.y += state.v * dt;
}

function simulateSpring(storm: number, chaos: number): { maxY: number; t90_s: number } {
  const state: SpringState = { y: 0, v: 0 };
  const targetY = 1.0;
  const dt = 1 / 60;
  let maxY = state.y;
  let t90_s = Number.POSITIVE_INFINITY;
  let t_s = 0;

  for (let i = 0; i < 360; i += 1) {
    stepSpring(state, targetY, dt, storm, chaos);
    t_s += dt;
    if (state.y > maxY) maxY = state.y;
    if (t90_s === Number.POSITIVE_INFINITY && state.y >= targetY * 0.9) {
      t90_s = t_s;
    }
  }

  return { maxY, t90_s };
}

function testOtterBuoyancySpring(): void {
  const calm = simulateSpring(0.0, 0.0);
  const stormy = simulateSpring(1.0, 1.0);
  const chaotic = simulateSpring(0.6, 1.0);
  const steady = simulateSpring(0.6, 0.0);

  assert.ok(Number.isFinite(calm.t90_s), 'calm t90 is not finite');
  assert.ok(Number.isFinite(stormy.t90_s), 'stormy t90 is not finite');
  assert.ok(stormy.t90_s < calm.t90_s, 'storm/chaos should increase spring aggressiveness');
  assert.ok(chaotic.t90_s < steady.t90_s, 'chaos should stiffen the spring response');

  const overshootTol = 1e-3;
  assert.ok(calm.maxY <= 1.0 + overshootTol, 'calm spring overshoots target');
  assert.ok(stormy.maxY <= 1.0 + overshootTol, 'stormy spring overshoots target');
  assert.ok(chaotic.maxY <= 1.0 + overshootTol, 'chaotic spring overshoots target');
}

function run(): void {
  testOtterBuoyancySpring();
  console.log('otter buoyancy spring tests: ok');
}

run();
