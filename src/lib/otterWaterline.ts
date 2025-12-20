import * as THREE from 'three';
import type { WaveComponent } from './spectrum';
import type { RogueWaveState, SeismicPulseState } from './wavePhysics';
import { clamp, lerp } from './math';
import { sampleGerstner, type WaveSampleScratch } from './waveSample';

export interface OtterWaterlineUpdate {
  time_s: number;
  waves: WaveComponent[];
  currentXZ: THREE.Vector2;
  tideHeight_m: number;
  rogue?: RogueWaveState;
  pulse?: SeismicPulseState | null;
  cameraPos: THREE.Vector3;
  sunIntensity: number; // 0..1
  night: number; // 0..1
  underwater: boolean;
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

export class OtterWaterline {
  public readonly mesh: THREE.LineSegments;

  private readonly geometry: THREE.BufferGeometry;
  private positionAttr: THREE.BufferAttribute;
  private positions: Float32Array = new Float32Array(0);
  private maxSegments = 0;
  private contactMeshes: THREE.Mesh[] = [];
  private meshVersion = -1;
  private overflowWarned = false;

  private readonly meshCaches = new Map<string, MeshCache>();

  private readonly tmpWaveSample = { height_m: 0, normal: new THREE.Vector3(), disp: new THREE.Vector3(), slope: 0 };
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
    this.geometry.setDrawRange(0, 0);

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.NormalBlending,
      uniforms: {
        u_cameraPos: { value: new THREE.Vector3() },
        u_fadeNear: { value: 9.0 },
        u_fadeFar: { value: 52.0 },
        u_strength: { value: 0.0 },
        u_color: { value: new THREE.Color('#0c1216') }
      },
      vertexShader: /* glsl */ `
        uniform vec3 u_cameraPos;
        uniform float u_fadeNear;
        uniform float u_fadeFar;
        varying float v_fade;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          float dist = distance(worldPos.xyz, u_cameraPos);
          v_fade = 1.0 - smoothstep(u_fadeNear, u_fadeFar, dist);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float u_strength;
        uniform vec3 u_color;
        varying float v_fade;
        void main() {
          float a = u_strength * v_fade;
          gl_FragColor = vec4(u_color, a);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `
    });

    this.mesh = new THREE.LineSegments(this.geometry, mat);
    this.mesh.name = 'OtterWaterline';
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 1;
    this.mesh.visible = false;
  }

  public update(u: OtterWaterlineUpdate): void {
    if (u.contactMeshesVersion !== this.meshVersion) {
      this.meshVersion = u.contactMeshesVersion;
      this.setContactMeshes(u.contactMeshes);
    }

    const mat = this.mesh.material as THREE.ShaderMaterial;
    mat.uniforms.u_cameraPos.value.copy(u.cameraPos);

    const sunFactor = lerp(0.35, 1.0, clamp(u.sunIntensity, 0, 1));
    const nightFactor = lerp(0.35, 1.0, clamp(1 - u.night, 0, 1));
    mat.uniforms.u_strength.value = 0.22 * sunFactor * nightFactor;

    if (u.underwater || this.contactMeshes.length === 0 || this.maxSegments === 0 || mat.uniforms.u_strength.value < 1e-4) {
      this.geometry.setDrawRange(0, 0);
      this.mesh.visible = false;
      return;
    }

    let segCount = 0;
    const positions = this.positions;
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

          ax = x; ay = y; az = z;
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

          if (hitCount === 0) {
            ax = x; ay = y; az = z;
            hitCount = 1;
          } else {
            bx = x; by = y; bz = z;
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

          if (hitCount === 0) {
            ax = x; ay = y; az = z;
            hitCount = 1;
          } else {
            bx = x; by = y; bz = z;
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

          const idx = segCount * 6;
          positions[idx] = ax;
          positions[idx + 1] = ay;
          positions[idx + 2] = az;
          positions[idx + 3] = bx;
          positions[idx + 4] = by;
          positions[idx + 5] = bz;
          segCount += 1;
        }
      }
    }

    this.positionAttr.needsUpdate = true;
    this.geometry.setDrawRange(0, segCount * 2);
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
    const nextSize = this.maxSegments * 2 * 3;

    this.positions = nextSize > 0 ? new Float32Array(nextSize) : new Float32Array(0);
    this.positionAttr = new THREE.BufferAttribute(this.positions, 3);
    this.positionAttr.setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute('position', this.positionAttr);
    this.geometry.setDrawRange(0, 0);
  }
}
