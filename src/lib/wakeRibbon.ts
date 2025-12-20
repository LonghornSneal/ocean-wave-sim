import * as THREE from 'three';
import { clamp, lerp } from './math';

export interface WakeRibbonUpdate {
  dt_s: number;
  time_s: number;
  centerXZ: THREE.Vector2;
  forwardXZ: THREE.Vector2;
  surfaceY_m: number;
  speed_mps: number;
  paddleImpulse01: number;
  calm01: number;
  contact01?: number;
  /** 0..1; lower values reduce foam when pulse is active. */
  pulseFoamDamp?: number;
}

/**
 * A tiny, cheap trailing wake decal/ribbon.
 *
 * This is not a physically correct wake – it's an artistically-tuned surface cue that:
 * - follows the otter
 * - stretches with speed
 * - pulses with paddle impulses
 *
 * Important: no per-frame allocations.
 */
export class WakeRibbon {
  public readonly mesh: THREE.Mesh;

  private intensity = 0;
  private length_m = 5;
  private width_m = 1.8;

  constructor() {
    const geo = new THREE.PlaneGeometry(1, 1, 1, 16);
    geo.rotateX(-Math.PI / 2);

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        u_time: { value: 0 },
        u_intensity: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        uniform float u_time;
        uniform float u_intensity;

        float sat(float x){ return clamp(x, 0.0, 1.0); }

        void main(){
          // vUv.y : 0 at near (otter), 1 at far tail.
          float along = vUv.y;
          float across = abs(vUv.x - 0.5) * 2.0;

          // Smooth edges + tail fade.
          float edge = sat(1.0 - pow(across, 2.2));
          float tail = sat(1.0 - along);
          tail = pow(tail, 1.25);

          // A couple ripple bands drifting backward.
          float phase = u_time * 1.4;
          float r0 = 0.5 + 0.5 * sin((along * 12.0 - phase) * 6.28318);
          float r1 = 0.5 + 0.5 * sin((along * 22.0 - phase * 1.35) * 6.28318);
          float rip = mix(r0, r1, 0.55);
          rip = pow(rip, 1.8);

          float a = u_intensity * edge * tail * (0.25 + 0.75 * rip);
          a *= sat(1.0 - across * 1.05);

          // Slightly bluish-white foam cue.
          vec3 col = vec3(0.88, 0.92, 0.96);
          gl_FragColor = vec4(col, a);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `
    });

    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.name = 'WakeRibbon';
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 2;
  }

  public dispose(): void {
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.Material).dispose();
  }

  public update(u: WakeRibbonUpdate): void {
    const mat = this.mesh.material as THREE.ShaderMaterial;
    mat.uniforms.u_time.value = u.time_s;

    const speed01 = clamp(u.speed_mps / 0.30, 0, 1);
    const pulse = clamp(u.paddleImpulse01, 0, 1);
    const contact01 = clamp(u.contact01 ?? 1.0, 0.0, 1.0);

    // Wake is most legible in calm conditions.
    const foamDamp = clamp(u.pulseFoamDamp ?? 1.0, 0.0, 1.0);
    const target = clamp((0.35 + 0.75 * speed01 + 0.55 * pulse) * (0.25 + 0.75 * u.calm01), 0, 1) * foamDamp * contact01;
    this.intensity = lerp(this.intensity, target, clamp(u.dt_s * 6.0, 0, 1));
    mat.uniforms.u_intensity.value = this.intensity;

    // Scale with speed.
    const targetLen = lerp(3.0, 9.0, speed01) + pulse * 2.0;
    const targetWid = lerp(1.4, 3.2, speed01) + pulse * 0.6;
    this.length_m = lerp(this.length_m, targetLen, clamp(u.dt_s * 3.0, 0, 1));
    this.width_m = lerp(this.width_m, targetWid, clamp(u.dt_s * 3.0, 0, 1));

    this.mesh.scale.set(this.width_m, 1, this.length_m);

    // Orient so +Z in local plane maps to forward.
    const yaw = Math.atan2(u.forwardXZ.x, u.forwardXZ.y);
    this.mesh.rotation.y = yaw;

    // Place slightly above the water surface, trailing behind the otter.
    const back = this.length_m * 0.38;
    this.mesh.position.set(
      u.centerXZ.x - u.forwardXZ.x * back,
      u.surfaceY_m + 0.02,
      u.centerXZ.y - u.forwardXZ.y * back
    );

    this.mesh.visible = this.intensity > 0.02;
  }
}
