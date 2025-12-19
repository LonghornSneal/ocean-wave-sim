import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { makeMoonSprite, makeStars, makeSunSprite } from './skyHelpers';

export type AtmosphereRig = {
  fogAbove: THREE.FogExp2;
  fogUnder: THREE.FogExp2;
  underwaterDome: THREE.Mesh;
  sky: Sky;
  skyUniforms: Record<string, { value: any }>;
  sunLight: THREE.DirectionalLight;
  moonLight: THREE.DirectionalLight;
  ambient: THREE.HemisphereLight;
  lightningLight: THREE.DirectionalLight;
  otterFillLight: THREE.DirectionalLight;
  tmpSunColor: THREE.Color;
  sunWarmColor: THREE.Color;
  otterFillNightColor: THREE.Color;
  stars: THREE.Points;
  sunSprite: THREE.Sprite;
  moonSprite: THREE.Sprite;
};

export function createAtmosphere(scene: THREE.Scene): AtmosphereRig {
  // Fog objects (reused to avoid per-frame allocations)
  const fogAbove = new THREE.FogExp2(new THREE.Color('#6a7aa0'), 0.00004);
  const fogUnder = new THREE.FogExp2(new THREE.Color('#053044'), 0.03);

  // If the camera goes underwater (the otter sometimes looks down), the sky is hidden.
  // On devices where post FX can't run, that can make the world appear fully black.
  // We render a cheap background dome so underwater never becomes a "black screen".
  const underwaterDome = (() => {
    const geo = new THREE.SphereGeometry(9000, 16, 12);
    const mat = new THREE.MeshBasicMaterial({
      color: fogUnder.color.clone(),
      side: THREE.BackSide,
      depthWrite: false,
      depthTest: false
    });
    const m = new THREE.Mesh(geo, mat);
    m.visible = false;
    m.frustumCulled = false;
    m.renderOrder = -1000;
    return m;
  })();
  scene.add(underwaterDome);

  const sky = new Sky();
  sky.scale.setScalar(10000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms as any;
  skyUniforms['turbidity'].value = 10;
  skyUniforms['rayleigh'].value = 2.3;
  skyUniforms['mieCoefficient'].value = 0.007;
  skyUniforms['mieDirectionalG'].value = 0.8;

  const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
  sunLight.position.set(1, 1, 0);
  sunLight.castShadow = false;
  scene.add(sunLight);

  const moonLight = new THREE.DirectionalLight(0x9bb8ff, 0.25);
  moonLight.position.set(-1, 1, 0);
  scene.add(moonLight);

  const ambient = new THREE.HemisphereLight(0x88aaff, 0x0b1020, 0.55);
  scene.add(ambient);

  // Lightning flashes (superstorm). Directional light gives a broad, inexpensive
  // flash that reads well on the water.
  const lightningLight = new THREE.DirectionalLight(new THREE.Color('#e6f2ff'), 0.0);
  lightningLight.name = 'LightningLight';
  lightningLight.castShadow = false;
  scene.add(lightningLight);
  scene.add(lightningLight.target);

  // Camera-following fill light: keeps the otter readable on mobile (and in heavy
  // cloud / night scenes) without having to crank global exposure.
  const otterFillLight = new THREE.DirectionalLight(0xffffff, 0.0);
  otterFillLight.castShadow = false;
  scene.add(otterFillLight);
  scene.add(otterFillLight.target);

  // Temp colors (keep allocations out of the hot path)
  const tmpSunColor = new THREE.Color('#ffffff');
  // Warm tint used as the sun approaches the horizon.
  const sunWarmColor = new THREE.Color('#ffb26b');
  // Cooler tint for nighttime fill.
  const otterFillNightColor = new THREE.Color('#cfe7ff');

  const stars = makeStars(2500);
  scene.add(stars);

  const sunSprite = makeSunSprite();
  scene.add(sunSprite);

  const moonSprite = makeMoonSprite(0.5);
  scene.add(moonSprite);

  return {
    fogAbove,
    fogUnder,
    underwaterDome,
    sky,
    skyUniforms,
    sunLight,
    moonLight,
    ambient,
    lightningLight,
    otterFillLight,
    tmpSunColor,
    sunWarmColor,
    otterFillNightColor,
    stars,
    sunSprite,
    moonSprite
  };
}
