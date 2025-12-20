import * as THREE from 'three';
import type { WaveComponent } from './spectrum';
import type { RogueWaveState, SeismicPulseState } from './wavePhysics';
import { clamp, lerp, smoothstep } from './math';
import { sampleGerstner, type WaveSampleScratch } from './waveSample';

export interface OtterWaterlineUpdate {
  time_s: number;
  waves: WaveComponent[];
  currentXZ: THREE.Vector2;
  tideHeight_m: number;
  rogue?: RogueWaveState;
  pulse?: SeismicPulseState | null;
  cameraPos: THREE.Vector3;
  cameraDistance_m: number;
  sunIntensity: number; // 0..1
  night: number; // 0..1
  underwater: boolean;
  refresh?: boolean;
  contactMeshes: THREE.Mesh[];
  contactMeshesVersion: number;
}

type MeshCache = {
  worldPos: Float32Array;
  waterHeights: Float32Array;
  signedHeights: Float32Array;
  vertexCount: number;
};

const WATERLINE_EPS = 1e-4;
const WATERLINE_OFFSET_M = 0.015;
const MAX_SKIP_MARGIN_M = 0.12;
const WATERLINE_SURFACE_NEAR_M = 0.02;
const WATERLINE_SURFACE_FAR_M = 0.18;
const WATERLINE_MIN_HALF_WIDTH_M = 0.002;
const WATERLINE_MAX_HALF_WIDTH_M = 0.01;
const WATERLINE_MIN_ALPHA = 0.35;
const WATERLINE_MAX_ALPHA = 1.0;
const WATERLINE_CAM_BOOST_NEAR_M = 2.5;
const WATERLINE_CAM_BOOST_FAR_M = 16.0;
const WATERLINE_CAM_BOOST_MIN = 0.55;
const WATERLINE_CAM_BOOST_MAX = 1.35;
const WATERLINE_SEGMENT_VERTS = 6;
const WATERLINE_SEGMENT_FLOATS = WATERLINE_SEGMENT_VERTS * 3;

export class OtterWaterline {
  public readonly mesh: THREE.Mesh;

  private readonly geometry: THREE.BufferGeometry;
  private positionAttr: THREE.BufferAttribute;
  private strengthAttr: THREE.BufferAttribute;
  private positions: Float32Array = new Float32Array(0);
  private strengths: Float32Array = new Float32Array(0);
  private maxSegments = 0;
  private contactMeshes: THREE.Mesh[] = [];
  private meshVersion = -1;
  private overflowWarned = false;

  private readonly meshCaches = new Map<string, MeshCache>();

  private readonly tmpWaveSample = { height_m: 0, normal: new THREE.Vector3(), disp: new THREE.Vector3(), slope: 0, orbitalVelY_mps: 0 };
  private readonly tmpWaveT = new THREE.Vector3();
  private readonly tmpWaveB = new THREE.Vector3();
  private readonly tmpV2 = new THREE.Vector2();
  private readonly tmpCenter = new THREE.Vector3();
  private readonly tmpScale = new THREE.Vector3();
  private readonly waveScratch: WaveSampleScratch = {
    octaveCounts: new Map<number, number>(),
    rogueMod: { A: 0, phase: 0, Q: 0 }
  };

  constructor() {
    this.geometry = new THREE.BufferGeometry();
    this.positionAttr = new THREE.BufferAttribute(this.positions, 3);
    this.positionAttr.setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute('position', this.positionAttr);
    this.strengthAttr = new THREE.BufferAttribute(this.strengths, 1);
    this.strengthAttr.setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute('a_strength', this.strengthAttr);
    this.geometry.setDrawRange(0, 0);

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
      uniforms: {
        u_cameraPos: { value: new THREE.Vector3() },
        u_fadeNear: { value: 9.0 },
        u_fadeFar: { value: 52.0 },
        u_strength: { value: 0.0 },
        u_color: { value: new THREE.Color('#0c1216') }
      },
      vertexShader: /* glsl */ `
        attribute float a_strength;
        uniform vec3 u_cameraPos;
        uniform float u_fadeNear;
        uniform float u_fadeFar;
        varying float v_fade;
        varying float v_strength;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          float dist = distance(worldPos.xyz, u_cameraPos);
          v_fade = 1.0 - smoothstep(u_fadeNear, u_fadeFar, dist);
          v_strength = a_strength;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float u_strength;
        uniform vec3 u_color;
        varying float v_fade;
        varying float v_strength;
        void main() {
          float a = u_strength * v_fade * v_strength;
          gl_FragColor = vec4(u_color, a);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `
    });

    this.mesh = new THREE.Mesh(this.geometry, mat);
    this.mesh.name = 'OtterWaterline';
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 1;
    this.mesh.visible = false;
  }

  public update(u: OtterWaterlineUpdate): void {
    let forceRefresh = false;
    if (u.contactMeshesVersion !== this.meshVersion) {
      this.meshVersion = u.contactMeshesVersion;
      this.setContactMeshes(u.contactMeshes);
      forceRefresh = true;
    }

    const mat = this.mesh.material as THREE.ShaderMaterial;
    mat.uniforms.u_cameraPos.value.copy(u.cameraPos);

    const sunFactor = lerp(0.35, 1.0, clamp(u.sunIntensity, 0, 1));
    const nightFactor = lerp(0.35, 1.0, clamp(1 - u.night, 0, 1));
    const cameraDistance_m = Math.max(0, u.cameraDistance_m);
    const camBoostT = smoothstep(WATERLINE_CAM_BOOST_NEAR_M, WATERLINE_CAM_BOOST_FAR_M, cameraDistance_m);
    const camBoost = lerp(WATERLINE_CAM_BOOST_MAX, WATERLINE_CAM_BOOST_MIN, camBoostT);
    mat.uniforms.u_strength.value = 0.22 * sunFactor * nightFactor * camBoost;

    if (u.underwater || this.contactMeshes.length === 0 || this.maxSegments === 0 || mat.uniforms.u_strength.value < 1e-4) {
      this.geometry.setDrawRange(0, 0);
      this.mesh.visible = false;
      return;
    }

    const hasSegments = this.geometry.drawRange.count > 0;
    const refresh = forceRefresh || u.refresh !== false || !hasSegments;
    if (!refresh) {
      this.mesh.visible = hasSegments;
      return;
    }

    let segCount = 0;
    const positions = this.positions;
    const strengths = this.strengths;
    let exhausted = false;

    for (const mesh of this.contactMeshes) {
      if (exhausted) break;
      const geo = mesh.geometry as THREE.BufferGeometry;
      const posAttr = geo.getAttribute('position') as THREE.BufferAttribute | undefined;
      if (!posAttr || posAttr.count === 0) continue;

      let sphere = geo.boundingSphere;
      if (!sphere) {
        geo.computeBoundingSphere();
        sphere = geo.boundingSphere;
      }

      if (sphere) {
        this.tmpCenter.copy(sphere.center).applyMatrix4(mesh.matrixWorld);
        mesh.getWorldScale(this.tmpScale);
        const radius = sphere.radius * Math.max(this.tmpScale.x, this.tmpScale.y, this.tmpScale.z);
        this.tmpV2.set(this.tmpCenter.x, this.tmpCenter.z);
        const waterCenter = sampleGerstner(
          u.waves,
          this.tmpV2,
          u.time_s,
          u.currentXZ,
          u.tideHeight_m,
          this.tmpWaveSample,
          this.tmpWaveT,
          this.tmpWaveB,
          u.rogue,
          u.pulse,
          undefined,
          this.waveScratch
        ).height_m;

        if (this.tmpCenter.y - radius > waterCenter + MAX_SKIP_MARGIN_M) continue;
        if (this.tmpCenter.y + radius < waterCenter - MAX_SKIP_MARGIN_M) continue;
      }

      let cache = this.meshCaches.get(mesh.uuid);
      if (!cache || cache.vertexCount !== posAttr.count) {
        cache = {
          worldPos: new Float32Array(posAttr.count * 3),
          waterHeights: new Float32Array(posAttr.count),
          signedHeights: new Float32Array(posAttr.count),
          vertexCount: posAttr.count
        };
        this.meshCaches.set(mesh.uuid, cache);
      }

      const worldPos = cache.worldPos;
      const waterHeights = cache.waterHeights;
      const signedHeights = cache.signedHeights;
      const e = mesh.matrixWorld.elements;

      for (let i = 0; i < cache.vertexCount; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        const z = posAttr.getZ(i);

        const wx = e[0] * x + e[4] * y + e[8] * z + e[12];
        const wy = e[1] * x + e[5] * y + e[9] * z + e[13];
        const wz = e[2] * x + e[6] * y + e[10] * z + e[14];

        worldPos[i * 3] = wx;
        worldPos[i * 3 + 1] = wy;
        worldPos[i * 3 + 2] = wz;

        this.tmpV2.set(wx, wz);
        const h = sampleGerstner(
          u.waves,
          this.tmpV2,
          u.time_s,
          u.currentXZ,
          u.tideHeight_m,
          this.tmpWaveSample,
          this.tmpWaveT,
          this.tmpWaveB,
          u.rogue,
          u.pulse,
          undefined,
          this.waveScratch
        ).height_m;

        waterHeights[i] = h;
        let d = wy - h;
        if (Math.abs(d) < WATERLINE_EPS) d = 0;
        signedHeights[i] = d;
      }

      const indexAttr = geo.index;
      const triCount = indexAttr ? indexAttr.count / 3 : Math.floor(posAttr.count / 3);

      for (let t = 0; t < triCount; t++) {
        const i0 = indexAttr ? indexAttr.getX(t * 3) : t * 3;
        const i1 = indexAttr ? indexAttr.getX(t * 3 + 1) : t * 3 + 1;
        const i2 = indexAttr ? indexAttr.getX(t * 3 + 2) : t * 3 + 2;

        const d0 = signedHeights[i0];
        const d1 = signedHeights[i1];
        const d2 = signedHeights[i2];

        if ((d0 >= 0 && d1 >= 0 && d2 >= 0) || (d0 <= 0 && d1 <= 0 && d2 <= 0)) continue;

        let hitCount = 0;
        let ax = 0; let ay = 0; let az = 0;
        let bx = 0; let by = 0; let bz = 0;
        let aStrength = 0;
        let bStrength = 0;

        if (d0 * d1 < 0) {
          const tEdge = clamp(d0 / (d0 - d1), 0, 1);
          const aIdx = i0 * 3;
          const bIdx = i1 * 3;
          const x0 = worldPos[aIdx];
          const z0 = worldPos[aIdx + 2];
          const x1 = worldPos[bIdx];
          const z1 = worldPos[bIdx + 2];
          const h0 = waterHeights[i0];
          const h1 = waterHeights[i1];

          const x = x0 + (x1 - x0) * tEdge;
          const z = z0 + (z1 - z0) * tEdge;
          const h = h0 + (h1 - h0) * tEdge;
          const y = h + WATERLINE_OFFSET_M;
          const edgeAbs = (Math.abs(d0) + Math.abs(d1)) * 0.5;
          const edgeStrength = 1.0 - smoothstep(WATERLINE_SURFACE_NEAR_M, WATERLINE_SURFACE_FAR_M, edgeAbs);

          ax = x; ay = y; az = z;
          aStrength = edgeStrength;
          hitCount = 1;
        }

        if (d1 * d2 < 0 && hitCount < 2) {
          const tEdge = clamp(d1 / (d1 - d2), 0, 1);
          const aIdx = i1 * 3;
          const bIdx = i2 * 3;
          const x0 = worldPos[aIdx];
          const z0 = worldPos[aIdx + 2];
          const x1 = worldPos[bIdx];
          const z1 = worldPos[bIdx + 2];
          const h0 = waterHeights[i1];
          const h1 = waterHeights[i2];

          const x = x0 + (x1 - x0) * tEdge;
          const z = z0 + (z1 - z0) * tEdge;
          const h = h0 + (h1 - h0) * tEdge;
          const y = h + WATERLINE_OFFSET_M;
          const edgeAbs = (Math.abs(d1) + Math.abs(d2)) * 0.5;
          const edgeStrength = 1.0 - smoothstep(WATERLINE_SURFACE_NEAR_M, WATERLINE_SURFACE_FAR_M, edgeAbs);

          if (hitCount === 0) {
            ax = x; ay = y; az = z;
            aStrength = edgeStrength;
            hitCount = 1;
          } else {
            bx = x; by = y; bz = z;
            bStrength = edgeStrength;
            hitCount = 2;
          }
        }

        if (d2 * d0 < 0 && hitCount < 2) {
          const tEdge = clamp(d2 / (d2 - d0), 0, 1);
          const aIdx = i2 * 3;
          const bIdx = i0 * 3;
          const x0 = worldPos[aIdx];
          const z0 = worldPos[aIdx + 2];
          const x1 = worldPos[bIdx];
          const z1 = worldPos[bIdx + 2];
          const h0 = waterHeights[i2];
          const h1 = waterHeights[i0];

          const x = x0 + (x1 - x0) * tEdge;
          const z = z0 + (z1 - z0) * tEdge;
          const h = h0 + (h1 - h0) * tEdge;
          const y = h + WATERLINE_OFFSET_M;
          const edgeAbs = (Math.abs(d2) + Math.abs(d0)) * 0.5;
          const edgeStrength = 1.0 - smoothstep(WATERLINE_SURFACE_NEAR_M, WATERLINE_SURFACE_FAR_M, edgeAbs);

          if (hitCount === 0) {
            ax = x; ay = y; az = z;
            aStrength = edgeStrength;
            hitCount = 1;
          } else {
            bx = x; by = y; bz = z;
            bStrength = edgeStrength;
            hitCount = 2;
          }
        }

        if (hitCount === 2) {
          if (segCount >= this.maxSegments) {
            exhausted = true;
            if (!this.overflowWarned) {
              this.overflowWarned = true;
              console.warn('[otter] Waterline segment buffer overflow. Increase buffer size.');
            }
            break;
          }

          const segStrength = clamp((aStrength + bStrength) * 0.5, 0, 1);
          const segAlpha = lerp(WATERLINE_MIN_ALPHA, WATERLINE_MAX_ALPHA, segStrength);
          const halfWidth = lerp(WATERLINE_MIN_HALF_WIDTH_M, WATERLINE_MAX_HALF_WIDTH_M, segStrength);

          const dx = bx - ax;
          const dz = bz - az;
          const lenXZ = Math.sqrt(dx * dx + dz * dz);
          let sideX = 1;
          let sideZ = 0;
          if (lenXZ > 1e-6) {
            const invLen = 1 / lenXZ;
            sideX = -dz * invLen;
            sideZ = dx * invLen;
          }
          const ox = sideX * halfWidth;
          const oz = sideZ * halfWidth;

          const posIdx = segCount * WATERLINE_SEGMENT_FLOATS;
          positions[posIdx] = ax + ox;
          positions[posIdx + 1] = ay;
          positions[posIdx + 2] = az + oz;
          positions[posIdx + 3] = ax - ox;
          positions[posIdx + 4] = ay;
          positions[posIdx + 5] = az - oz;
          positions[posIdx + 6] = bx + ox;
          positions[posIdx + 7] = by;
          positions[posIdx + 8] = bz + oz;
          positions[posIdx + 9] = bx + ox;
          positions[posIdx + 10] = by;
          positions[posIdx + 11] = bz + oz;
          positions[posIdx + 12] = ax - ox;
          positions[posIdx + 13] = ay;
          positions[posIdx + 14] = az - oz;
          positions[posIdx + 15] = bx - ox;
          positions[posIdx + 16] = by;
          positions[posIdx + 17] = bz - oz;

          const strengthIdx = segCount * WATERLINE_SEGMENT_VERTS;
          strengths[strengthIdx] = segAlpha;
          strengths[strengthIdx + 1] = segAlpha;
          strengths[strengthIdx + 2] = segAlpha;
          strengths[strengthIdx + 3] = segAlpha;
          strengths[strengthIdx + 4] = segAlpha;
          strengths[strengthIdx + 5] = segAlpha;
          segCount += 1;
        }
      }
    }

    this.positionAttr.needsUpdate = true;
    this.strengthAttr.needsUpdate = true;
    this.geometry.setDrawRange(0, segCount * WATERLINE_SEGMENT_VERTS);
    this.mesh.visible = segCount > 0;
  }

  private setContactMeshes(meshes: THREE.Mesh[]): void {
    this.contactMeshes = meshes.slice();
    this.meshCaches.clear();
    this.overflowWarned = false;

    let totalTris = 0;
    for (const mesh of this.contactMeshes) {
      const geo = mesh.geometry as THREE.BufferGeometry;
      const posAttr = geo.getAttribute('position') as THREE.BufferAttribute | undefined;
      if (!posAttr) continue;
      const triCount = geo.index ? geo.index.count / 3 : Math.floor(posAttr.count / 3);
      totalTris += triCount;
    }

    this.maxSegments = Math.max(0, Math.floor(totalTris));
    const nextVerts = this.maxSegments * WATERLINE_SEGMENT_VERTS;
    const nextSize = nextVerts * 3;

    this.positions = nextSize > 0 ? new Float32Array(nextSize) : new Float32Array(0);
    this.positionAttr = new THREE.BufferAttribute(this.positions, 3);
    this.positionAttr.setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute('position', this.positionAttr);
    this.strengths = nextVerts > 0 ? new Float32Array(nextVerts) : new Float32Array(0);
    this.strengthAttr = new THREE.BufferAttribute(this.strengths, 1);
    this.strengthAttr.setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute('a_strength', this.strengthAttr);
    this.geometry.setDrawRange(0, 0);
  }
}
