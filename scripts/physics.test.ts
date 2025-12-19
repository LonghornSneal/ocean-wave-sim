import assert from 'node:assert/strict';

import { WeatherSim } from '../src/lib/weather';
import { buildWaveComponents } from '../src/lib/spectrum';
import { computeDerivedFromU10, predictWaveHsTpCEM } from '../src/lib/wavePhysics';

function near(a: number, b: number, tol = 1e-6): boolean {
  return Math.abs(a - b) <= tol;
}

function assertFinite(v: number, label: string): void {
  assert.ok(Number.isFinite(v), `${label} is not finite`);
}

function testWeatherDeterminism(): void {
  const simA = new WeatherSim();
  const simB = new WeatherSim();
  const seed = { latitude_deg: 12.3, longitude_deg: -44.2, dayOfYear: 190, timeOfDay_h: 14.5 };
  simA.reset(seed);
  simB.reset(seed);

  const inp = {
    latitude_deg: 12.3,
    longitude_deg: -44.2,
    dayOfYear: 190,
    timeOfDay_h: 14.5,
    coastProximity: 0.2,
    precipChance_pct: 60,
    stormsIn2to4hChance_pct: 50,
    verticalWindShear_mps: 5,
    hurricaneChanceAdjust_pct: 5
  };

  for (let i = 0; i < 40; i++) {
    const a = simA.update(30, inp);
    const b = simB.update(30, inp);

    assert.ok(near(a.cloudCover, b.cloudCover, 1e-6), 'cloudCover mismatch');
    assert.ok(near(a.precipIntensity, b.precipIntensity, 1e-6), 'precipIntensity mismatch');
    assert.ok(near(a.windSpeed_mps, b.windSpeed_mps, 1e-6), 'windSpeed_mps mismatch');
    assert.ok(near(a.windDirFrom_deg, b.windDirFrom_deg, 1e-6), 'windDirFrom_deg mismatch');

    assert.ok(a.cloudCover >= 0 && a.cloudCover <= 1, 'cloudCover out of range');
    assert.ok(a.precipIntensity >= 0 && a.precipIntensity <= 1, 'precipIntensity out of range');
    assert.ok(a.storminess >= 0 && a.storminess <= 1, 'storminess out of range');
    assert.ok(a.hurricaneIntensity >= 0 && a.hurricaneIntensity <= 1, 'hurricaneIntensity out of range');
    assert.ok(a.windSpeed_mps >= 0, 'windSpeed_mps negative');
  }
}

function testWavePhysicsStability(): void {
  const storm = {
    stormRadius_km: 80,
    fetchUtilization: 0.75,
    stormAge_h: 6,
    windRamp_h: 1.0
  };
  const ocean = { depth_m: 1200 };

  const low = predictWaveHsTpCEM(computeDerivedFromU10(6, 90), storm, ocean);
  const high = predictWaveHsTpCEM(computeDerivedFromU10(18, 90), storm, ocean);

  assertFinite(low.Hs_m, 'Hs_m (low)');
  assertFinite(high.Hs_m, 'Hs_m (high)');
  assertFinite(low.Tp_s, 'Tp_s (low)');
  assertFinite(high.Tp_s, 'Tp_s (high)');

  assert.ok(high.Hs_m > low.Hs_m, 'Hs_m should increase with wind speed');
  assert.ok(high.Tp_s >= low.Tp_s, 'Tp_s should increase with wind speed');
  assert.ok(high.Hs_m <= ocean.depth_m * 0.6 + 1e-6, 'Hs_m exceeds depth cap');
}

function testSpectrumDeterminism(): void {
  const inputs = {
    Hs_m: 8.5,
    Tp_s: 12.4,
    depth_m: 4000,
    windDirTo_rad: 1.2,
    waveCount: 24,
    directionalSpread: 0.65,
    gamma: 3.1,
    choppiness: 1.2,
    seed: 1337
  };

  const a = buildWaveComponents(inputs);
  const b = buildWaveComponents(inputs);

  assert.equal(a.length, b.length, 'component count mismatch');
  for (let i = 0; i < a.length; i++) {
    assert.ok(near(a[i].dirX, b[i].dirX, 1e-6), `dirX mismatch at ${i}`);
    assert.ok(near(a[i].dirZ, b[i].dirZ, 1e-6), `dirZ mismatch at ${i}`);
    assert.ok(near(a[i].A, b[i].A, 1e-6), `A mismatch at ${i}`);
    assert.ok(near(a[i].k, b[i].k, 1e-6), `k mismatch at ${i}`);
    assert.ok(near(a[i].omega, b[i].omega, 1e-6), `omega mismatch at ${i}`);
    assert.ok(near(a[i].phase, b[i].phase, 1e-6), `phase mismatch at ${i}`);
    assert.ok(near(a[i].Q, b[i].Q, 1e-6), `Q mismatch at ${i}`);

    assert.ok(a[i].A >= 0, `A negative at ${i}`);
    assert.ok(a[i].k > 0, `k non-positive at ${i}`);
    assert.ok(a[i].Q >= 0 && a[i].Q <= 1.0, `Q out of range at ${i}`);
  }
}

function run(): void {
  testWeatherDeterminism();
  testWavePhysicsStability();
  testSpectrumDeterminism();
  console.log('physics tests: ok');
}

run();
