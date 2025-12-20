import * as THREE from 'three';
import type { AppParams } from '../lib/ui';
import { biomeFor, OceanLife } from '../lib/life';
import { PrecipitationSystem } from '../lib/precip';
import { CloudLayer } from '../lib/clouds';
import { LightningBolts } from '../lib/lightningBolts';
import { HorizonIslands } from '../lib/islands';
import { RainbowArc } from '../lib/rainbow';
import { RainMist } from '../lib/rainMist';
import { SplashSystem } from '../lib/splashes';
import { WindSpray } from '../lib/windSpray';
import { OtterRipples } from '../lib/ripples';
import { WakeRibbon } from '../lib/wakeRibbon';
import { OtterWaterline } from '../lib/otterWaterline';
import { precipBudgetForQuality, splashBudgetForQuality } from './quality';

export type WorldAssets = {
  life: OceanLife;
  precip: PrecipitationSystem;
  rainMist: RainMist;
  cloudLayers: Array<{ deck: CloudLayer; minQuality: AppParams['quality'] }>;
  qualityRank: Record<AppParams['quality'], number>;
  lightningBolts: LightningBolts;
  lightningDir: THREE.Vector3;
  islands: HorizonIslands;
  rainbow: RainbowArc;
  splashes: SplashSystem;
  windSpray: WindSpray;
  ripples: OtterRipples;
  wakeRibbon: WakeRibbon;
  waterline: OtterWaterline;
};

export function createWorldAssets(scene: THREE.Scene, params: AppParams): WorldAssets {
  // Undersea life / encounters
  const initialBiome = biomeFor(params.latitude_deg, 12);
  const life = new OceanLife({
    biome: initialBiome,
    coastProximity: params.coastProximity,
    exoticEncounters: params.exoticEncounters_pct / 100
  });
  scene.add(life.group);

  // Weather visuals
  const precip = new PrecipitationSystem(precipBudgetForQuality(params.quality));
  scene.add(precip.group);

  const rainMist = new RainMist(params.quality);
  scene.add(rainMist.points);

  const cloudsLow = new CloudLayer({
    layerOffset: -0.18,
    densityScale: 1.15,
    opacityScale: 1.0,
    coverScale: 1.05,
    stormCoverScale: 0.25,
    stormScale: 1.2,
    rainScale: 1.0,
    windScale: 0.85,
    stepsScale: 1.0,
    renderOrder: -10
  });
  scene.add(cloudsLow.mesh);

  const cloudsMid = new CloudLayer({
    layerOffset: 0.22,
    densityScale: 0.85,
    opacityScale: 0.65,
    coverScale: 0.78,
    stormCoverScale: 0.2,
    stormScale: 0.95,
    rainScale: 0.75,
    windScale: 1.05,
    stepsScale: 0.75,
    renderOrder: -11
  });
  scene.add(cloudsMid.mesh);

  const cloudsHigh = new CloudLayer({
    layerOffset: 0.68,
    densityScale: 0.65,
    opacityScale: 0.6,
    coverScale: 0.5,
    stormCoverScale: 0.6,
    stormScale: 0.85,
    rainScale: 0.4,
    windScale: 1.25,
    stepsScale: 0.65,
    renderOrder: -12
  });
  scene.add(cloudsHigh.mesh);

  const cloudLayers = [
    { deck: cloudsLow, minQuality: 'Low' as AppParams['quality'] },
    { deck: cloudsMid, minQuality: 'Low' as AppParams['quality'] },
    { deck: cloudsHigh, minQuality: 'High' as AppParams['quality'] }
  ];

  const qualityRank: Record<AppParams['quality'], number> = { Low: 0, Medium: 1, High: 2, Max: 3 };

  const lightningBolts = new LightningBolts();
  scene.add(lightningBolts.group);

  const islands = new HorizonIslands();
  scene.add(islands.group);

  const rainbow = new RainbowArc();
  scene.add(rainbow.mesh);

  const splashes = new SplashSystem(splashBudgetForQuality(params.quality));
  scene.add(splashes.points);

  const windSpray = new WindSpray();
  scene.add(windSpray.points);

  const ripples = new OtterRipples();
  scene.add(ripples.mesh);

  // Trailing wake ribbon/decal (cheap surface cue)
  const wakeRibbon = new WakeRibbon();
  scene.add(wakeRibbon.mesh);

  // Waterline contact shadow (otter vs water intersection)
  const waterline = new OtterWaterline();
  scene.add(waterline.mesh);

  // Direction from the camera toward the most recent flash. Used to localize
  // lightning illumination in the cloud shader (so it doesn't brighten the whole dome).
  const lightningDir = new THREE.Vector3(0, 1, 0);

  return {
    life,
    precip,
    rainMist,
    cloudLayers,
    qualityRank,
    lightningBolts,
    lightningDir,
    islands,
    rainbow,
    splashes,
    windSpray,
    ripples,
    wakeRibbon,
    waterline
  };
}
