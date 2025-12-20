import * as THREE from 'three';
import { clamp, lerp } from './math';

export interface RipplesUpdate {
  dt_s: number;
  time_s: number;
  center: THREE.Vector3;
  surfaceY: number;
  calmness: number; // 0..1
  sunIntensity: number; // 0..1
  sunset: number; // 0..1
  speed_mps?: number;
  paddleImpulse01?: number;
  motionDirXZ?: THREE.Vector2;
  contact01?: number;
}

/**
 * Gentle circular ripples around the otter to sell buoyancy / surface interaction.
 * Very cheap: single shader plane with animated rings.
 */
export class OtterRipples {
  public readonly mesh: THREE.Mesh;
  private intensity = 0;

  constructor() {
    const geo = new THREE.PlaneGeometry(7.0, 7.0, 1, 1);
    geo.rotateX(-Math.PI / 2);

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        u_time: { value: 0.0 },
        u_intensity: { value: 0.0 },
        u_sun: { value: 1.0 },
        u_sunset: { value: 0.0 }
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        uniform float u_time;
        uniform float u_intensity;
        uniform float u_sun;
        uniform float u_sunset;

        float ring(float r, float t, float freq, float width) {
          float w = sin(r * freq - t) * 0.5 + 0.5;
          return smoothstep(1.0 - width, 1.0, w);
        }

        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          float r = length(p);

          // Fade out near center so it doesn't look like a sticker.
          float centerFade = smoothstep(0.06, 0.22, r);
          float edgeFade = 1.0 - smoothstep(0.75, 1.0, r);

          float t = u_time * 2.1;

          // A few expanding rings
          float a = 0.0;
          a += ring(r, t, 18.0, 0.10) * 0.60;
          a += ring(r, t + 1.1, 14.0, 0.12) * 0.45;
          a += ring(r, t + 2.2, 10.0, 0.14) * 0.30;

          a *= centerFade * edgeFade;

          // Warm tint at sunset, cooler otherwise.
          vec3 warm = vec3(1.0, 0.80, 0.62);
          vec3 cool = vec3(0.78, 0.90, 1.0);
          vec3 col = mix(cool, warm, u_sunset);
          col *= 0.16 + 0.26 * u_sun;

          float alpha = a * u_intensity;
          gl_FragColor = vec4(col, alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `
    });

    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 2; // after ocean
  }

  public dispose(): void {
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.Material).dispose();
  }

  public update(u: RipplesUpdate): void {
    const speed01 = clamp((u.speed_mps ?? 0) / 0.35, 0, 1);
    const impulse01 = clamp(u.paddleImpulse01 ?? 0, 0, 1);
    const contact01 = clamp(u.contact01 ?? 1, 0, 1);
    const motion = clamp(0.15 + 0.85 * speed01 + 0.65 * impulse01, 0, 1);

    // Strong when calm, fade during storms / heavy chop.
    const target = clamp(u.calmness, 0, 1) * (0.25 + 0.75 * motion) * contact01;
    this.intensity = lerp(this.intensity, target, clamp(u.dt_s * 1.8, 0, 1));

    let px = u.center.x;
    let pz = u.center.z;
    if (u.motionDirXZ && u.motionDirXZ.lengthSq() > 1e-6) {
      const offset = lerp(0.08, 0.45, speed01) * (0.5 + 0.5 * contact01);
      px -= u.motionDirXZ.x * offset;
      pz -= u.motionDirXZ.y * offset;
    }
    this.mesh.position.set(px, u.surfaceY + 0.02, pz);

    const mat = this.mesh.material as THREE.ShaderMaterial;
    mat.uniforms.u_time.value = u.time_s;
    mat.uniforms.u_intensity.value = this.intensity * 0.9;
    mat.uniforms.u_sun.value = clamp(u.sunIntensity, 0, 1);
    mat.uniforms.u_sunset.value = clamp(u.sunset, 0, 1);

    // Slightly scale with calmness (gentler, wider ripples)
    const s = lerp(0.82, 1.12, clamp(u.calmness, 0, 1)) * lerp(0.92, 1.08, motion);
    this.mesh.scale.setScalar(s);
    this.mesh.visible = this.intensity > 0.02 && contact01 > 0.02;
  }
}
