import * as THREE from 'three';
import { clamp, lerp, smoothstep } from './math';
import { mulberry32 } from './prng';
import { applyMeshParticleLighting, setParticleMeshSun } from './particleLighting';
import { enablePointSpriteAttributes } from './pointSpriteMaterial';
import { DROPLET_TEX, SNOW_TEX, SOFT_SPRITE_ALPHA } from './waterParticleTextures';

export type PrecipMode = 'None' | 'Rain' | 'Snow';

export interface PrecipUpdate {
  dt_s: number;
  time_s: number;
  cameraPos: THREE.Vector3;
  cameraQuat: THREE.Quaternion;
  cameraVel: THREE.Vector3;
  sunDir: THREE.Vector3;
  sunIntensity: number;
  sunset: number;
  otterPos?: THREE.Vector3;
  otterForward?: THREE.Vector3;
  windDirFrom_deg: number;
  gustStrength01?: number;
  gustFactor?: number;
  intensity: number; // 0..1
  mode: PrecipMode;
  visible: boolean;
  surfaceY: number;
  depthTexture?: THREE.DepthTexture | null;
  depthCamera?: THREE.Camera | null;
}

export interface RainImpactBuffer {
  max: number;
  count: number;
  positions: Float32Array;
  strengths: Float32Array;
}

export type PrecipConfig = {
  maxCount: number;
  cullDistance: number;
};

const PRECIP_STRIDE = 20;
const PRECIP_POS = 0;
const PRECIP_VEL = 3;
const PRECIP_SCALE = 6;
const PRECIP_SPIN = 8;
const PRECIP_SPAWN_Y = 9;
const PRECIP_WOBBLE_PHASE = 10;
const PRECIP_WOBBLE_AMP = 11;
const PRECIP_WOBBLE_RATE = 12;
const PRECIP_SLIDE_LIFE = 13;
const PRECIP_SCALE_FACTOR = 14;
const PRECIP_WOBBLE_XZ = 15;
const PRECIP_TINT = 17;

/** Simple precipitation particles around the camera. */
export class PrecipitationSystem {
  public readonly group = new THREE.Group();
  public impactCount = 0;

  private readonly rng = mulberry32(188122);
  // Slightly darker than pure white so it reads against a bright sky.
  private readonly rainCol = new THREE.Color('#b8dcff');
  private readonly snowCol = new THREE.Color('#ffffff');
  private readonly warmTint = new THREE.Color('#fff1de');
  private readonly coolTint = new THREE.Color('#d6ecff');
  private readonly tmpColor = new THREE.Color();

  private count = 800;
  private positions: Float32Array;
  private velocities: Float32Array;
  private scaleX: Float32Array;
  private scaleY: Float32Array;
  private spin: Float32Array;
  private spawnY: Float32Array;
  private wobblePhase: Float32Array;
  private wobbleAmp: Float32Array;
  private wobbleRate: Float32Array;
  private slideLife: Float32Array;
  private geo: THREE.PlaneGeometry;
  private mesh: THREE.InstancedMesh;
  private impactMax: number;
  private impactPos: Float32Array;
  private impactAge: Float32Array;
  private impactLife: Float32Array;
  private impactAges01: Float32Array;
  private impactStrength: Float32Array;
  private impactSizeBase: Float32Array;
  private impactOpacityBase: Float32Array;
  private impactSizes: Float32Array;
  private impactOpacities: Float32Array;
  private impactColors: Float32Array;
  private impactIndex = 0;
  private impactSpawnPos: Float32Array;
  private impactSpawnStrength: Float32Array;
  private impactSpawnCount = 0;
  private impactBuffer: RainImpactBuffer;
  private impactGeo: THREE.BufferGeometry;
  private impactPoints: THREE.Points;
  private impactPosAttr: THREE.BufferAttribute;
  private impactSizeAttr: THREE.BufferAttribute;
  private impactOpacityAttr: THREE.BufferAttribute;
  private impactColorAttr: THREE.BufferAttribute;
  private impactPosDirty = false;
  private impactColorDirty = false;
  private mode: PrecipMode = 'None';
  private seeded = false;

  private readonly tmpObj = new THREE.Object3D();
  private readonly fallDir = new THREE.Vector3();
  private readonly fallQuat = new THREE.Quaternion();
  private readonly up = new THREE.Vector3(0, 1, 0);
  private readonly wobbleAxis = new THREE.Vector3();
  private readonly tmpCamForward = new THREE.Vector3();
  private readonly shadowCenterY = 0.44;
  private readonly shadowHalfLen = 0.48;
  private readonly shadowRadius = 0.24;
  private readonly shadowSoftness = 0.18;
  private readonly slideDuration_s = 0.6;
  private readonly depthInvResolution = new THREE.Vector2(1, 1);
  private depthTexture: THREE.DepthTexture | null = null;
  private depthCamera: THREE.Camera | null = null;
  private softNearStart = 0.35;
  private softNearEnd = 1.4;
  private softNearMin = 0.55;
  private softRange = 0.35;

  constructor(quality: 'High' | 'Medium' | 'Low' | 'Max') {
    this.count = quality === 'Max' ? 1800 : (quality === 'High' ? 1200 : (quality === 'Medium' ? 800 : 450));

    this.positions = new Float32Array(this.count * 3);
    this.velocities = new Float32Array(this.count * 3);
    this.scaleX = new Float32Array(this.count);
    this.scaleY = new Float32Array(this.count);
    this.spin = new Float32Array(this.count);
    this.spawnY = new Float32Array(this.count);
    this.wobblePhase = new Float32Array(this.count);
    this.wobbleAmp = new Float32Array(this.count);
    this.wobbleRate = new Float32Array(this.count);
    this.slideLife = new Float32Array(this.count);

    this.impactMax = Math.max(16, Math.min(96, Math.floor(this.count * 0.04)));
    this.impactPos = new Float32Array(this.impactMax * 3);
    this.impactAge = new Float32Array(this.impactMax);
    this.impactLife = new Float32Array(this.impactMax);
    this.impactAges01 = new Float32Array(this.impactMax);
    this.impactStrength = new Float32Array(this.impactMax);
    this.impactSizeBase = new Float32Array(this.impactMax);
    this.impactOpacityBase = new Float32Array(this.impactMax);
    this.impactSizes = new Float32Array(this.impactMax);
    this.impactOpacities = new Float32Array(this.impactMax);
    this.impactColors = new Float32Array(this.impactMax * 3);
    this.impactSpawnPos = new Float32Array(this.impactMax * 3);
    this.impactSpawnStrength = new Float32Array(this.impactMax);
    this.impactBuffer = {
      max: this.impactMax,
      count: 0,
      positions: this.impactSpawnPos,
      strengths: this.impactSpawnStrength
    };

    for (let i = 0; i < this.count; i++) {
      const ix = i * 3;
      this.positions[ix + 0] = (this.rng() * 2 - 1) * 18;
      this.positions[ix + 1] = this.rng() * 14 + 2;
      this.positions[ix + 2] = (this.rng() * 2 - 1) * 18;

      this.velocities[ix + 0] = 0;
      this.velocities[ix + 1] = -12;
      this.velocities[ix + 2] = 0;
    }

    this.geo = new THREE.PlaneGeometry(1, 1);
    const uv = this.geo.getAttribute('uv') as THREE.BufferAttribute;
    const colors = new Float32Array(uv.count * 3);
    for (let i = 0; i < uv.count; i++) {
      const v = uv.getY(i);
      const tip = clamp((v - 0.15) / 0.85, 0, 1);
      colors[i * 3 + 0] = lerp(0.55, 1.0, tip);
      colors[i * 3 + 1] = lerp(0.6, 1.0, tip);
      colors[i * 3 + 2] = lerp(0.7, 1.0, tip);
    }
    this.geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ffffff'),
      map: DROPLET_TEX,
      alphaMap: SOFT_SPRITE_ALPHA,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      side: THREE.DoubleSide
    });
    mat.defines = { ...(mat.defines ?? {}), USE_SOFT_PARTICLES: 1 };
    mat.needsUpdate = true;
    mat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <color_pars_fragment>',
          `#include <color_pars_fragment>
#ifdef USE_SOFT_PARTICLES
uniform sampler2D u_depthTex;
uniform float u_hasDepth;
uniform vec2 u_invResolution;
uniform float u_cameraNear;
uniform float u_cameraFar;
uniform float u_softness;
uniform vec2 u_nearFade;
uniform float u_nearMin;

float linearizeDepth(float depth) {
  float z = depth * 2.0 - 1.0;
  return (2.0 * u_cameraNear * u_cameraFar) / (u_cameraFar + u_cameraNear - z * (u_cameraFar - u_cameraNear));
}
#endif`
        )
        .replace(
          '#include <alphamap_fragment>',
          `#include <alphamap_fragment>
#ifdef USE_UV
  float streakFade = smoothstep(0.08, 0.92, vUv.y);
  diffuseColor.a *= mix(0.35, 1.0, streakFade);
#endif
#ifdef USE_SOFT_PARTICLES
  float fragDepth = linearizeDepth(gl_FragCoord.z);
  float nearEnd = max(u_nearFade.y, u_nearFade.x + 1e-3);
  float nearFade = smoothstep(u_nearFade.x, nearEnd, fragDepth);
  float nearFactor = mix(u_nearMin, 1.0, nearFade);
  float depthFade = 1.0;
  if (u_hasDepth > 0.5) {
    vec2 depthUv = clamp(gl_FragCoord.xy * u_invResolution, vec2(0.0), vec2(1.0));
    float sceneDepth = linearizeDepth(texture2D(u_depthTex, depthUv).x);
    float softRange = max(u_softness, 1e-4);
    depthFade = smoothstep(0.0, softRange, sceneDepth - fragDepth);
  }
  diffuseColor.a *= depthFade * nearFactor;
#endif`
        );

      applyMeshParticleLighting(mat, shader);

      shader.uniforms.u_depthTex = { value: null };
      shader.uniforms.u_hasDepth = { value: 0.0 };
      shader.uniforms.u_invResolution = { value: new THREE.Vector2(1, 1) };
      shader.uniforms.u_cameraNear = { value: 0.1 };
      shader.uniforms.u_cameraFar = { value: 1000.0 };
      shader.uniforms.u_softness = { value: 0.35 };
      shader.uniforms.u_nearFade = { value: new THREE.Vector2(0.35, 1.4) };
      shader.uniforms.u_nearMin = { value: 0.55 };
      (mat.userData as any).softParticleUniforms = shader.uniforms;
    };
    mat.customProgramCacheKey = () => 'precip_soft_particles_v2_lit';
    this.mesh = new THREE.InstancedMesh(this.geo, mat, this.count);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.mesh.onBeforeRender = (_renderer, _scene, camera) => {
      const uniforms = (mat.userData as any)?.softParticleUniforms as any;
      if (!uniforms) return;
      const cam = camera as THREE.PerspectiveCamera;
      uniforms.u_cameraNear.value = cam.near ?? uniforms.u_cameraNear.value;
      uniforms.u_cameraFar.value = cam.far ?? uniforms.u_cameraFar.value;
      uniforms.u_invResolution.value.copy(this.depthInvResolution);
      uniforms.u_softness.value = this.softRange;
      uniforms.u_nearFade.value.set(this.softNearStart, this.softNearEnd);
      uniforms.u_nearMin.value = this.softNearMin;
      const useDepth = !!this.depthTexture && !!this.depthCamera && camera === this.depthCamera;
      uniforms.u_hasDepth.value = useDepth ? 1.0 : 0.0;
      uniforms.u_depthTex.value = useDepth ? this.depthTexture : null;
    };
    this.group.add(this.mesh);

    this.impactGeo = new THREE.BufferGeometry();
    this.impactPosAttr = new THREE.BufferAttribute(this.impactPos, 3);
    this.impactPosAttr.setUsage(THREE.DynamicDrawUsage);
    this.impactGeo.setAttribute('position', this.impactPosAttr);

    this.impactSizeAttr = new THREE.BufferAttribute(this.impactSizes, 1);
    this.impactSizeAttr.setUsage(THREE.DynamicDrawUsage);
    this.impactGeo.setAttribute('aSize', this.impactSizeAttr);

    this.impactOpacityAttr = new THREE.BufferAttribute(this.impactOpacities, 1);
    this.impactOpacityAttr.setUsage(THREE.DynamicDrawUsage);
    this.impactGeo.setAttribute('aOpacity', this.impactOpacityAttr);

    this.impactColorAttr = new THREE.BufferAttribute(this.impactColors, 3);
    this.impactColorAttr.setUsage(THREE.DynamicDrawUsage);
    this.impactGeo.setAttribute('color', this.impactColorAttr);

    const impactMat = new THREE.PointsMaterial({
      color: new THREE.Color('#ffffff'),
      map: DROPLET_TEX,
      alphaMap: SOFT_SPRITE_ALPHA,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
    this.impactPoints = new THREE.Points(this.impactGeo, impactMat);
    this.impactPoints.frustumCulled = false;
    this.impactPoints.visible = false;
    enablePointSpriteAttributes(impactMat);
    this.group.add(this.impactPoints);

    for (let i = 0; i < this.count; i++) {
      this.resetSprite(i, 'Rain');
    }
    if (this.mesh.instanceColor) {
      this.mesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
      this.mesh.instanceColor.needsUpdate = true;
    }
  }

  public setQuality(q: 'High' | 'Medium' | 'Low' | 'Max'): void {
    // no-op for now (quality is set at construction).
    void q;
  }

  public dispose(): void {
    this.geo.dispose();
    (this.mesh.material as THREE.Material).dispose();
    this.impactGeo.dispose();
    (this.impactPoints.material as THREE.Material).dispose();
  }

  public getImpactBuffer(): RainImpactBuffer {
    return this.impactBuffer;
  }

  public update(u: PrecipUpdate): void {
    this.impactCount = 0;
    this.impactSpawnCount = 0;
    const mat = this.mesh.material as THREE.MeshBasicMaterial;
    setParticleMeshSun(mat, { sunDir: u.sunDir, sunIntensity: u.sunIntensity, sunset: u.sunset });
    this.depthTexture = u.depthTexture ?? null;
    this.depthCamera = u.depthCamera ?? null;
    if (this.depthTexture?.image && typeof this.depthTexture.image.width === 'number') {
      const w = Math.max(1, this.depthTexture.image.width);
      const h = Math.max(1, this.depthTexture.image.height);
      this.depthInvResolution.set(1 / w, 1 / h);
    }
    const isRain = u.mode === 'Rain';
    this.softRange = isRain ? 0.35 : 0.25;
    this.softNearStart = isRain ? 0.35 : 0.55;
    this.softNearEnd = isRain ? 1.4 : 1.8;
    this.softNearMin = isRain ? 0.55 : 1.0;
    const desiredMap = u.mode === 'Rain' ? DROPLET_TEX : (u.mode === 'Snow' ? SNOW_TEX : null);
    if (mat.map !== desiredMap) {
      mat.map = desiredMap;
      mat.needsUpdate = true;
    }

    const active = u.visible && u.intensity > 0.01 && u.mode !== 'None';
    if (!active) {
      mat.opacity = lerp(mat.opacity, 0.0, clamp(u.dt_s * 2.2, 0, 1));
      if (mat.opacity < 0.002) this.mesh.visible = false;
      this.updateImpacts(u);
      return;
    }

    this.mesh.visible = true;

    const inten = clamp(u.intensity, 0, 1);
    if (!this.seeded || this.mode !== u.mode) {
      this.seedParticles(u);
      this.mode = u.mode;
      this.seeded = true;
    }

    const useAdditive = u.mode === 'Rain';
    const desiredBlend = useAdditive ? THREE.AdditiveBlending : THREE.NormalBlending;
    if (mat.blending !== desiredBlend) {
      mat.blending = desiredBlend;
      mat.needsUpdate = true;
    }

    const sizeBias = u.mode === 'Rain' ? lerp(0.85, 1.15, inten) : lerp(0.9, 1.25, inten);
    const camForward = this.tmpCamForward.set(0, 0, -1).applyQuaternion(u.cameraQuat);
    const forwardSpeed = Math.max(0, u.cameraVel.dot(camForward));
    const speedDeadzone = 0.05;
    const speedRange = u.mode === 'Rain' ? 2.0 : 1.4;
    const forwardSpeedClamped = forwardSpeed > speedDeadzone ? (forwardSpeed - speedDeadzone) : 0;
    const motion01 = clamp(forwardSpeedClamped / speedRange, 0, 1);
    const stretchY = lerp(1.0, u.mode === 'Rain' ? 2.2 : 1.35, motion01);
    const stretchX = lerp(1.0, u.mode === 'Rain' ? 0.82 : 0.92, motion01);
    const densityBoost = lerp(1.0, u.mode === 'Rain' ? 1.35 : 1.18, motion01);
    const opacityTarget = clamp(inten * (u.mode === 'Rain' ? 0.85 : 0.7) * densityBoost, 0, 1);
    mat.opacity = lerp(mat.opacity, opacityTarget, clamp(u.dt_s * 1.8, 0, 1));

    // Wind slant
    const wDir = (u.windDirFrom_deg * Math.PI) / 180;
    const windX = Math.cos(wDir + Math.PI) * (2.0 + inten * 7.0);
    const windZ = Math.sin(wDir + Math.PI) * (2.0 + inten * 7.0);
    const windSpeed = Math.hypot(windX, windZ);
    const windFactor = clamp(windSpeed / 9.0, 0, 1);
    const wobbleSpeedScale = lerp(0.7, 2.2, windFactor);
    const wobbleAmpScale = lerp(0.35, 1.0, windFactor);

    const fall = u.mode === 'Rain' ? lerp(10, 32, inten) : lerp(1.8, 6.5, inten);
    const surfacePad = u.mode === 'Rain' ? 0.05 : 0.08;

    this.fallDir.set(windX, -fall, windZ).normalize();
    this.fallQuat.setFromUnitVectors(this.up, this.fallDir);
    const fallY = Math.abs(this.fallDir.y);
    this.wobbleAxis.set(-windZ, 0, windX);
    if (this.wobbleAxis.lengthSq() < 0.0001) {
      this.wobbleAxis.set(1, 0, 0);
    } else {
      this.wobbleAxis.normalize();
    }

    // Soft capsule around the otter for a subtle rain shadow + slide droplets.
    const shadowActive = u.mode === 'Rain' && !!u.otterPos;
    let ax = 0;
    let ay = 0;
    let az = 0;
    let abx = 0;
    let aby = 0;
    let abz = 0;
    let abLen2 = 1;
    let shadowInner = 0;
    let shadowOuter = 0;
    let shadowOuter2 = 0;
    let slideChance = 0;
    if (shadowActive && u.otterPos) {
      const fwd = u.otterForward;
      let fx = fwd?.x ?? 1;
      let fz = fwd?.z ?? 0;
      const fLen = Math.hypot(fx, fz);
      if (fLen > 1e-4) {
        fx /= fLen;
        fz /= fLen;
      } else {
        fx = 1;
        fz = 0;
      }
      const centerX = u.otterPos.x;
      const centerY = u.otterPos.y + this.shadowCenterY;
      const centerZ = u.otterPos.z;
      const halfLen = this.shadowHalfLen;
      ax = centerX - fx * halfLen;
      ay = centerY;
      az = centerZ - fz * halfLen;
      const bx = centerX + fx * halfLen;
      const by = centerY;
      const bz = centerZ + fz * halfLen;
      abx = bx - ax;
      aby = by - ay;
      abz = bz - az;
      abLen2 = Math.max(1e-5, abx * abx + aby * aby + abz * abz);
      shadowInner = this.shadowRadius;
      shadowOuter = shadowInner + this.shadowSoftness;
      shadowOuter2 = shadowOuter * shadowOuter;
      slideChance = 0.16 + 0.22 * inten;
    }

    const tmp = this.tmpObj;
    const fallQuat = this.fallQuat;
    const wobbleAxis = this.wobbleAxis;
    const time = u.time_s;
    let colorDirty = false;

    for (let i = 0; i < this.count; i++) {
      const ix = i * 3;
      // Integrate
      if (this.slideLife[i] > 0) {
        this.slideLife[i] = Math.max(0, this.slideLife[i] - u.dt_s);
        const damp = Math.exp(-3.2 * u.dt_s);
        this.velocities[ix + 0] *= damp;
        this.velocities[ix + 2] *= damp;
        this.velocities[ix + 1] -= 3.8 * u.dt_s;
        this.positions[ix + 0] += (this.velocities[ix + 0] + windX * 0.15) * u.dt_s;
        this.positions[ix + 1] += this.velocities[ix + 1] * u.dt_s;
        this.positions[ix + 2] += (this.velocities[ix + 2] + windZ * 0.15) * u.dt_s;
        if (this.slideLife[i] <= 0) {
          this.velocities[ix + 0] = 0;
          this.velocities[ix + 1] = 0;
          this.velocities[ix + 2] = 0;
        }
      } else {
        this.positions[ix + 0] += (this.velocities[ix + 0] + windX) * u.dt_s;
        this.positions[ix + 1] += (-fall) * u.dt_s;
        this.positions[ix + 2] += (this.velocities[ix + 2] + windZ) * u.dt_s;
      }

      const worldY = u.cameraPos.y + this.positions[ix + 1];
      const minWorldY = u.surfaceY + surfacePad + this.scaleY[i] * sizeBias * stretchY * fallY * 0.5;
      if (worldY < minWorldY) {
        this.impactCount += 1;
        if (u.mode === 'Rain') {
          const hitX = u.cameraPos.x + this.positions[ix + 0];
          const hitZ = u.cameraPos.z + this.positions[ix + 2];
          this.addImpact(hitX, u.surfaceY + 0.015, hitZ, inten);
        }
        this.positions[ix + 0] = (this.rng() * 2 - 1) * 18;
        this.positions[ix + 1] = this.rng() * 14 + 2;
        this.positions[ix + 2] = (this.rng() * 2 - 1) * 18;
        this.velocities[ix + 0] = 0;
        this.velocities[ix + 1] = -12;
        this.velocities[ix + 2] = 0;
        this.slideLife[i] = 0;
        this.resetSprite(i, u.mode);
        colorDirty = true;
      }
      if (this.positions[ix + 0] < -20) this.positions[ix + 0] = 20;
      if (this.positions[ix + 0] > 20) this.positions[ix + 0] = -20;
      if (this.positions[ix + 2] < -20) this.positions[ix + 2] = 20;
      if (this.positions[ix + 2] > 20) this.positions[ix + 2] = -20;

      const minLocalY = u.surfaceY + surfacePad + this.scaleY[i] * sizeBias * stretchY * fallY * 0.5 - u.cameraPos.y;
      const lifeSpan = Math.max(0.001, this.spawnY[i] - minLocalY);
      const lifeT = clamp((this.positions[ix + 1] - minLocalY) / lifeSpan, 0, 1);

      let baseX = u.cameraPos.x + this.positions[ix + 0];
      let baseY = u.cameraPos.y + this.positions[ix + 1];
      let baseZ = u.cameraPos.z + this.positions[ix + 2];

      let shadowScale = 1.0;
      if (shadowActive && this.slideLife[i] <= 0) {
        const apx = baseX - ax;
        const apy = baseY - ay;
        const apz = baseZ - az;
        let t = (apx * abx + apy * aby + apz * abz) / abLen2;
        if (t < 0) t = 0;
        else if (t > 1) t = 1;
        const cx = ax + abx * t;
        const cy = ay + aby * t;
        const cz = az + abz * t;
        const dx = baseX - cx;
        const dy = baseY - cy;
        const dz = baseZ - cz;
        const dist2 = dx * dx + dy * dy + dz * dz;
        if (dist2 < shadowOuter2) {
          const dist = Math.sqrt(dist2);
          if (dist < shadowInner) {
            shadowScale = 0.0;
            if (dist > 1e-4 && this.rng() < slideChance) {
              const nx = dx / dist;
              const ny = dy / dist;
              const nz = dz / dist;
              const surfaceX = cx + nx * shadowInner;
              const surfaceY = cy + ny * shadowInner;
              const surfaceZ = cz + nz * shadowInner;
              this.positions[ix + 0] = surfaceX - u.cameraPos.x;
              this.positions[ix + 1] = surfaceY - u.cameraPos.y;
              this.positions[ix + 2] = surfaceZ - u.cameraPos.z;
              baseX = surfaceX;
              baseY = surfaceY;
              baseZ = surfaceZ;
              const slideSpeed = lerp(0.25, 0.65, this.rng()) * (0.4 + 0.6 * inten);
              this.velocities[ix + 0] = nx * slideSpeed;
              this.velocities[ix + 1] = ny * slideSpeed;
              this.velocities[ix + 2] = nz * slideSpeed;
              this.slideLife[i] = this.slideDuration_s * lerp(0.6, 1.1, this.rng());
              shadowScale = 1.0;
            }
          } else {
            shadowScale = smoothstep(shadowInner, shadowOuter, dist);
          }
        }
      }

      const slideActive = this.slideLife[i] > 0;
      const lifeWobble = slideActive ? 0 : Math.sin(lifeT * Math.PI);
      const wobblePhase = time * (this.wobbleRate[i] * wobbleSpeedScale) + this.wobblePhase[i];
      const wobbleOffset = Math.sin(wobblePhase) * this.wobbleAmp[i] * wobbleAmpScale * lifeWobble * sizeBias;
      const wx = baseX + wobbleAxis.x * wobbleOffset;
      const wy = baseY;
      const wz = baseZ + wobbleAxis.z * wobbleOffset;

      let slideScale = 1.0;
      if (slideActive) {
        const slideT = clamp(this.slideLife[i] / this.slideDuration_s, 0, 1);
        slideScale = lerp(0.35, 0.75, slideT);
      }

      tmp.position.set(wx, wy, wz);
      tmp.quaternion.copy(fallQuat);
      tmp.rotateY(this.spin[i]);
      const scale = sizeBias * shadowScale * slideScale;
      tmp.scale.set(this.scaleX[i] * scale * stretchX, this.scaleY[i] * scale * stretchY, 1.0);
      tmp.updateMatrix();
      this.mesh.setMatrixAt(i, tmp.matrix);
    }

    if (colorDirty && this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
    this.mesh.instanceMatrix.needsUpdate = true;
    this.updateImpacts(u);
  }

  private seedParticles(u: PrecipUpdate): void {
    for (let i = 0; i < this.count; i++) {
      const ix = i * 3;
      this.positions[ix + 0] = (this.rng() * 2 - 1) * 18;
      this.positions[ix + 1] = this.rng() * 14 + 2;
      this.positions[ix + 2] = (this.rng() * 2 - 1) * 18;

      this.velocities[ix + 0] = 0;
      this.velocities[ix + 1] = -12;
      this.velocities[ix + 2] = 0;
      this.slideLife[i] = 0;

      this.resetSprite(i, u.mode);
    }

    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }

  private resetSprite(i: number, mode: PrecipMode): void {
    const ix = i * 3;
    this.slideLife[i] = 0;
    this.spawnY[i] = this.positions[ix + 1];
    if (mode === 'Rain') {
      const base = lerp(0.04, 0.09, this.rng());
      const stretch = lerp(1.7, 4.8, this.rng());
      this.scaleX[i] = base;
      this.scaleY[i] = base * stretch;
      this.spin[i] = this.rng() * Math.PI * 2;
      this.wobbleAmp[i] = lerp(0.03, 0.12, this.rng());
      this.wobbleRate[i] = lerp(1.3, 3.3, this.rng());
    } else {
      const base = lerp(0.05, 0.12, this.rng());
      const stretch = lerp(0.7, 1.65, this.rng());
      this.scaleX[i] = base;
      this.scaleY[i] = base * stretch;
      this.spin[i] = this.rng() * Math.PI * 2;
      this.wobbleAmp[i] = lerp(0.015, 0.05, this.rng());
      this.wobbleRate[i] = lerp(0.5, 1.5, this.rng());
    }
    this.wobblePhase[i] = this.rng() * Math.PI * 2;

    const baseCol = mode === 'Rain' ? this.rainCol : this.snowCol;
    const brightness = mode === 'Rain' ? lerp(0.55, 1.0, this.rng()) : lerp(0.65, 1.05, this.rng());
    const temp = this.rng() * 2 - 1;
    const tempMix = Math.abs(temp) * (mode === 'Rain' ? 0.1 : 0.12);
    this.tmpColor.copy(baseCol);
    if (temp >= 0) this.tmpColor.lerp(this.warmTint, tempMix);
    else this.tmpColor.lerp(this.coolTint, tempMix);
    this.tmpColor.multiplyScalar(brightness);
    this.mesh.setColorAt(i, this.tmpColor);
  }

  private addImpact(x: number, y: number, z: number, intensity: number): void {
    const i = this.impactIndex++ % this.impactMax;
    const ix = i * 3;
    this.impactPos[ix + 0] = x;
    this.impactPos[ix + 1] = y;
    this.impactPos[ix + 2] = z;

    this.impactAge[i] = 0;
    this.impactLife[i] = lerp(0.12, 0.26, this.rng());
    this.impactAges01[i] = 0;

    const inten = clamp(intensity, 0, 1);
    this.impactStrength[i] = lerp(0.45, 0.95, this.rng()) * (0.35 + 0.65 * inten);
    this.impactSizeBase[i] = lerp(0.55, 1.05, this.rng()) * (0.6 + 0.4 * inten);
    this.impactOpacityBase[i] = lerp(0.35, 0.75, this.rng()) * (0.6 + 0.4 * inten);

    if (this.impactSpawnCount < this.impactMax) {
      const s = this.impactSpawnCount++;
      const six = s * 3;
      this.impactSpawnPos[six + 0] = x;
      this.impactSpawnPos[six + 1] = y;
      this.impactSpawnPos[six + 2] = z;
      this.impactSpawnStrength[s] = this.impactStrength[i];
    }

    const temp = this.rng() * 2 - 1;
    const tempMix = Math.abs(temp) * 0.15;
    this.tmpColor.copy(this.rainCol);
    if (temp >= 0) this.tmpColor.lerp(this.warmTint, tempMix);
    else this.tmpColor.lerp(this.coolTint, tempMix);
    this.tmpColor.multiplyScalar(lerp(0.85, 1.05, this.rng()));

    const cix = i * 3;
    this.impactColors[cix + 0] = this.tmpColor.r;
    this.impactColors[cix + 1] = this.tmpColor.g;
    this.impactColors[cix + 2] = this.tmpColor.b;

    this.impactPosDirty = true;
    this.impactColorDirty = true;
  }

  private updateImpacts(u: PrecipUpdate): void {
    const dt = u.dt_s;
    let activeCount = 0;

    for (let i = 0; i < this.impactMax; i++) {
      if (this.impactStrength[i] <= 0) {
        this.impactOpacities[i] = 0;
        this.impactAges01[i] = 1;
        continue;
      }

      this.impactAge[i] += dt;
      const life = Math.max(0.001, this.impactLife[i]);
      if (this.impactAge[i] >= life) {
        this.impactStrength[i] = 0;
        this.impactOpacities[i] = 0;
        this.impactAges01[i] = 1;
        continue;
      }

      const t = clamp(this.impactAge[i] / life, 0, 1);
      this.impactAges01[i] = t;
      const fade = 1.0 - t;
      this.impactSizes[i] = this.impactSizeBase[i] * lerp(0.65, 1.35, t);
      this.impactOpacities[i] = this.impactOpacityBase[i] * fade * fade;
      activeCount++;
    }

    this.impactBuffer.count = this.impactSpawnCount;
    const impactMat = this.impactPoints.material as THREE.PointsMaterial;
    const targetOpacity = (u.visible && u.mode === 'Rain')
      ? clamp(0.12 + 0.55 * clamp(u.intensity, 0, 1), 0, 0.85)
      : 0.0;
    impactMat.opacity = lerp(impactMat.opacity, targetOpacity, clamp(dt * 3.0, 0, 1));
    this.impactPoints.visible = activeCount > 0 && impactMat.opacity > 0.01;

    if (this.impactPosDirty) this.impactPosAttr.needsUpdate = true;
    if (this.impactColorDirty) this.impactColorAttr.needsUpdate = true;
    this.impactSizeAttr.needsUpdate = true;
    this.impactOpacityAttr.needsUpdate = true;
    this.impactPosDirty = false;
    this.impactColorDirty = false;
  }
}
