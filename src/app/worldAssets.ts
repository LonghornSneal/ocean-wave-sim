import * as THREE from 'three';
import type { AppParams } from '../lib/ui';
import { biomeFor, OceanLife } from '../lib/life';
import { PrecipitationSystem } from '../lib/precip';
import { CloudDeck } from '../lib/clouds';
import { LightningBolts } from '../lib/lightningBolts';
import { HorizonIslands } from '../lib/islands';
import { RainbowArc } from '../lib/rainbow';
import { SplashSystem } from '../lib/splashes';
import { WindSpray } from '../lib/windSpray';
import { OtterRipples } from '../lib/ripples';
import { WakeRibbon } from '../lib/wakeRibbon';
import { OtterWaterline } from '../lib/otterWaterline';

export type WorldAssets = {
  life: OceanLife;
  precip: PrecipitationSystem;
  cloudLayers: Array<{ deck: CloudDeck; minQuality: AppParams['quality'] }>;
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
  const precip = new PrecipitationSystem(params.quality);
  scene.add(precip.group);

  const cloudsLow = new CloudDeck({
    layerOffset: -0.18,
    densityScale: 1.1,
    opacityScale: 1.0,
    coverScale: 1.0,
    stormScale: 1.05,
    rainScale: 1.0,
    windScale: 0.85,
    stepsScale: 1.0
  });
  cloudsLow.mesh.renderOrder = -12;
  scene.add(cloudsLow.mesh);

  const cloudsMid = new CloudDeck({
    layerOffset: 0.22,
    densityScale: 0.85,
    opacityScale: 0.7,
    coverScale: 0.78,
    stormScale: 0.9,
    rainScale: 0.75,
    windScale: 1.05,
    stepsScale: 0.75
  });
  cloudsMid.mesh.renderOrder = -11;
  scene.add(cloudsMid.mesh);

  const cloudsHigh = new CloudDeck({
    layerOffset: 0.68,
    densityScale: 0.55,
    opacityScale: 0.55,
    coverScale: 0.58,
    stormScale: 0.65,
    rainScale: 0.45,
    windScale: 1.25,
    stepsScale: 0.6
  });
  cloudsHigh.mesh.renderOrder = -10;
  scene.add(cloudsHigh.mesh);

  const cloudLayers = [
    { deck: cloudsLow, minQuality: 'Low' as AppParams['quality'] },
    { deck: cloudsMid, minQuality: 'Medium' as AppParams['quality'] },
    { deck: cloudsHigh, minQuality: 'High' as AppParams['quality'] }
  ];

  const qualityRank: Record<AppParams['quality'], number> = { Low: 0, Medium: 1, High: 2, Max: 3 };

  const lightningBolts = new LightningBolts();
  scene.add(lightningBolts.group);

  const islands = new HorizonIslands();
  scene.add(islands.group);

  const rainbow = new RainbowArc();
  scene.add(rainbow.mesh);

  const splashes = new SplashSystem();
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
