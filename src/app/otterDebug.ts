import * as THREE from 'three';
import type { AppParams } from '../lib/ui';
import type { OtterAnimationDebugState, SeaOtter } from '../lib/otter';
import { disposeObject3D } from '../lib/otter/utils';

class OtterAnimationOverlay {
  private readonly el: HTMLDivElement;
  private enabled = false;
  private acc_s = 0;

  constructor() {
    this.el = document.createElement('div');
    Object.assign(this.el.style, {
      position: 'fixed',
      right: '8px',
      top: '8px',
      padding: '8px 10px',
      borderRadius: '8px',
      background: 'rgba(0,0,0,0.35)',
      color: 'white',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: '12px',
      lineHeight: '1.25',
      zIndex: '40',
      whiteSpace: 'pre',
      userSelect: 'none',
      pointerEvents: 'none',
      backdropFilter: 'blur(2px)',
      display: 'none'
    } as Partial<CSSStyleDeclaration>);
    this.el.textContent = '';
    document.body.appendChild(this.el);
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.el.style.display = enabled ? 'block' : 'none';
  }

  public update(dt_s: number, text: string): void {
    if (!this.enabled) return;
    this.acc_s += dt_s;
    if (this.acc_s < 0.12) return;
    this.acc_s = 0;
    this.el.textContent = text;
  }

  public dispose(): void {
    this.el.remove();
  }
}

export type OtterDebugTools = {
  update: (dt_s: number, params: AppParams) => void;
  dispose: () => void;
};

function formatAnimState(state: OtterAnimationDebugState, freezePose: boolean): string {
  const actions: string[] = [];
  if (state.actions.dive) actions.push('dive');
  if (state.actions.resurface) actions.push('resurface');
  if (state.actions.blink) actions.push('blink');
  if (state.actions.whiskerTwitch) actions.push('whisker');
  const actionText = actions.length ? actions.join(', ') : 'none';
  const phaseText = state.paddlePhase01 === null ? '-' : state.paddlePhase01.toFixed(2);
  const modeText = freezePose ? 'frozen' : 'live';

  return [
    `otter anim (${modeText})`,
    `look ${state.lookMode}${state.underwater ? ' | underwater' : ''}`,
    `speed ${state.speed_mps.toFixed(2)} m/s`,
    `paddle w ${state.paddleWeight.toFixed(2)} x${state.paddleTimeScale.toFixed(2)} phase ${phaseText}`,
    `actions ${actionText}`,
    `blink ${state.blinkTimer_s.toFixed(2)}s  impulse ${state.paddleImpulse01.toFixed(2)}  wet ${state.wetness01.toFixed(2)}`
  ].join('\n');
}

function setHelperVisibility(helpers: THREE.Object3D[], visible: boolean): void {
  for (const helper of helpers) helper.visible = visible;
}

function disposeHelpers(helpers: THREE.Object3D[]): void {
  for (const helper of helpers) {
    if (helper.parent) helper.parent.remove(helper);
    disposeObject3D(helper);
  }
  helpers.length = 0;
}

function disposeContactHelpers(helpers: THREE.Mesh[]): void {
  for (const helper of helpers) {
    if (helper.parent) helper.parent.remove(helper);
    const mat = helper.material;
    if (Array.isArray(mat)) {
      for (const m of mat) m?.dispose?.();
    } else {
      mat?.dispose?.();
    }
  }
  helpers.length = 0;
}

function buildBoneHelpers(otter: SeaOtter): THREE.Object3D[] {
  const nodes = otter.getRigNodes();
  const helpers: THREE.Object3D[] = [];
  const entries: Array<{ name: string; node?: THREE.Object3D; axesSize: number; sphereRadius: number }> = [
    { name: 'body', node: nodes.body, axesSize: 0.22, sphereRadius: 0.045 },
    { name: 'neck', node: nodes.neck, axesSize: 0.16, sphereRadius: 0.035 },
    { name: 'head', node: nodes.head, axesSize: 0.16, sphereRadius: 0.035 },
    { name: 'tail', node: nodes.tail, axesSize: 0.16, sphereRadius: 0.035 },
    { name: 'flipperL', node: nodes.flipperL, axesSize: 0.14, sphereRadius: 0.03 },
    { name: 'flipperR', node: nodes.flipperR, axesSize: 0.14, sphereRadius: 0.03 },
    { name: 'eyeL', node: nodes.eyeL, axesSize: 0.08, sphereRadius: 0.02 },
    { name: 'eyeR', node: nodes.eyeR, axesSize: 0.08, sphereRadius: 0.02 },
    { name: 'whiskers', node: nodes.whiskers, axesSize: 0.1, sphereRadius: 0.025 }
  ];

  for (const entry of entries) {
    if (!entry.node) continue;
    const axes = new THREE.AxesHelper(entry.axesSize);
    axes.name = `OtterBoneAxes_${entry.name}`;
    axes.renderOrder = 20;
    const axesMat = axes.material as THREE.Material | THREE.Material[];
    if (Array.isArray(axesMat)) {
      for (const m of axesMat) {
        m.depthTest = false;
        m.depthWrite = false;
      }
    } else {
      axesMat.depthTest = false;
      axesMat.depthWrite = false;
    }

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(entry.sphereRadius, 10, 10),
      new THREE.MeshBasicMaterial({
        color: 0xffd36b,
        transparent: true,
        opacity: 0.9,
        depthTest: false,
        depthWrite: false
      })
    );
    sphere.name = `OtterBoneSphere_${entry.name}`;
    sphere.renderOrder = 21;
    sphere.frustumCulled = false;

    entry.node.add(axes);
    entry.node.add(sphere);
    helpers.push(axes, sphere);
  }

  return helpers;
}

function buildContactHelpers(otter: SeaOtter): THREE.Mesh[] {
  const helpers: THREE.Mesh[] = [];
  const meshes = otter.getContactMeshes();
  for (const mesh of meshes) {
    const mat = new THREE.MeshBasicMaterial({
      color: 0x46ffe8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    mat.polygonOffset = true;
    mat.polygonOffsetFactor = -1;
    mat.polygonOffsetUnits = -1;

    const helper = new THREE.Mesh(mesh.geometry, mat);
    helper.name = `OtterContactMesh_${mesh.name}`;
    helper.renderOrder = 18;
    helper.frustumCulled = false;
    mesh.add(helper);
    helpers.push(helper);
  }
  return helpers;
}

export function createOtterDebugTools(otter: SeaOtter): OtterDebugTools {
  const overlay = new OtterAnimationOverlay();
  overlay.setEnabled(false);

  let rigVersion = -1;
  let contactVersion = -1;
  const boneHelpers: THREE.Object3D[] = [];
  const contactHelpers: THREE.Mesh[] = [];

  return {
    update: (dt_s: number, params: AppParams) => {
      const showAnim = params.showAnimationState;
      const showContacts = params.showContactMeshes;

      overlay.setEnabled(showAnim);
      if (showAnim) {
        const version = otter.getContactMeshesVersion();
        if (version !== rigVersion) {
          rigVersion = version;
          disposeHelpers(boneHelpers);
          boneHelpers.push(...buildBoneHelpers(otter));
        }
        setHelperVisibility(boneHelpers, true);
        overlay.update(dt_s, formatAnimState(otter.getAnimationDebugState(), params.freezePose));
      } else {
        setHelperVisibility(boneHelpers, false);
      }

      if (showContacts) {
        const version = otter.getContactMeshesVersion();
        if (version !== contactVersion) {
          contactVersion = version;
          disposeContactHelpers(contactHelpers);
          contactHelpers.push(...buildContactHelpers(otter));
        }
        setHelperVisibility(contactHelpers, true);
      } else {
        setHelperVisibility(contactHelpers, false);
      }
    },
    dispose: () => {
      overlay.dispose();
      disposeHelpers(boneHelpers);
      disposeContactHelpers(contactHelpers);
    }
  };
}
