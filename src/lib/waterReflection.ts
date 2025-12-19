import * as THREE from 'three';

export interface PlanarReflectionOptions {
  /** Render-target size (power-of-two recommended if generateMipmaps=true). */
  size: number;
  /** Small bias to reduce surface acne / clip artifacts. Typical: 0.0005..0.003 */
  clipBias?: number;
  /** Generate mipmaps for the reflection texture (helps stability at distance). */
  generateMipmaps?: boolean;
  /** Optional MSAA sample count (WebGL2 only). */
  multisample?: number;
}

/**
 * Lightweight planar reflection (mirror camera) suitable for ocean surfaces.
 *
 * Design goals:
 * - no allocations in update() (aside from tiny visibility bookkeeping)
 * - does NOT depend on a mesh (we treat the plane as infinite at y=planeY)
 * - produces a textureMatrix usable as: proj = textureMatrix * vec4(worldPos, 1)
 */
export class PlanarReflection {
  public readonly textureMatrix = new THREE.Matrix4();
  public readonly mirrorCamera = new THREE.PerspectiveCamera();
  public readonly renderTarget: THREE.WebGLRenderTarget;

  private readonly _bias = new THREE.Matrix4().set(
    0.5, 0.0, 0.0, 0.5,
    0.0, 0.5, 0.0, 0.5,
    0.0, 0.0, 0.5, 0.5,
    0.0, 0.0, 0.0, 1.0
  );

  private readonly _normal = new THREE.Vector3(0, 1, 0);
  private readonly _reflectorWorldPos = new THREE.Vector3();
  private readonly _cameraWorldPos = new THREE.Vector3();
  private readonly _rotationMatrix = new THREE.Matrix4();
  private readonly _lookAtPos = new THREE.Vector3(0, 0, -1);
  private readonly _view = new THREE.Vector3();
  private readonly _target = new THREE.Vector3();

  private readonly _mirrorPlane = new THREE.Plane();
  private readonly _clipPlane = new THREE.Vector4();
  private readonly _q = new THREE.Vector4();

  private readonly _hidePrev: boolean[] = [];

  private readonly _clipBias: number;

  constructor(renderer: THREE.WebGLRenderer, opts: PlanarReflectionOptions) {
    const size = Math.max(16, Math.floor(opts.size));
    const generateMipmaps = !!opts.generateMipmaps;

    // Use FP16 if the platform can render to it; otherwise fall back to RGBA8.
    const canFloatRT =
      !!renderer.extensions.get('EXT_color_buffer_float') ||
      !!renderer.extensions.get('EXT_color_buffer_half_float');

    const type = canFloatRT ? THREE.HalfFloatType : THREE.UnsignedByteType;

    const rt = new THREE.WebGLRenderTarget(size, size, {
      format: THREE.RGBAFormat,
      type,
      depthBuffer: true,
      stencilBuffer: false,
      minFilter: generateMipmaps ? THREE.LinearMipmapLinearFilter : THREE.LinearFilter,
      magFilter: THREE.LinearFilter
    });

    rt.texture.name = 'PlanarReflectionRT';
    rt.texture.flipY = false;
    // We sample this texture directly in the water shader as linear.
    rt.texture.colorSpace = THREE.LinearSRGBColorSpace;
    rt.texture.generateMipmaps = generateMipmaps;

    // WebGL2 MSAA (optional)
    if (renderer.capabilities.isWebGL2 && typeof opts.multisample === 'number') {
      rt.samples = Math.max(0, Math.floor(opts.multisample));
    }

    this.renderTarget = rt;
    this._clipBias = opts.clipBias ?? 0.0009;
  }

  public setSize(size: number): void {
    const s = Math.max(16, Math.floor(size));
    this.renderTarget.setSize(s, s);
  }

  public dispose(): void {
    this.renderTarget.dispose();
  }

  /**
   * Render the reflected scene into renderTarget and update textureMatrix.
   *
   * @param planeY World-space Y of the water plane (tide).
   * @param hide Objects to temporarily hide during reflection render (e.g. the ocean surface itself).
   */
  public update(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    planeY: number,
    hide: THREE.Object3D[] = []
  ): void {
    // Ensure matrices are current.
    camera.updateMatrixWorld();

    // Choose a point on the plane directly under the camera for numerical stability.
    this._cameraWorldPos.setFromMatrixPosition(camera.matrixWorld);
    this._reflectorWorldPos.set(this._cameraWorldPos.x, planeY, this._cameraWorldPos.z);

    // If the camera is below the plane, skip reflection rendering.
    this._view.subVectors(this._reflectorWorldPos, this._cameraWorldPos);
    if (this._view.dot(this._normal) > 0.0) {
      return;
    }

    // --- Build mirror camera (based on three.js Reflector approach) ---

    this._view.reflect(this._normal).negate();
    this._view.add(this._reflectorWorldPos);

    this._rotationMatrix.extractRotation(camera.matrixWorld);

    this._lookAtPos.set(0, 0, -1);
    this._lookAtPos.applyMatrix4(this._rotationMatrix);
    this._lookAtPos.add(this._cameraWorldPos);

    this._target.subVectors(this._reflectorWorldPos, this._lookAtPos);
    this._target.reflect(this._normal).negate();
    this._target.add(this._reflectorWorldPos);

    const vCam = this.mirrorCamera;
    vCam.position.copy(this._view);
    vCam.up.set(0, 1, 0);
    vCam.up.applyMatrix4(this._rotationMatrix);
    vCam.up.reflect(this._normal);
    vCam.lookAt(this._target);
    vCam.near = camera.near;
    vCam.far = camera.far;
    vCam.aspect = camera.aspect;
    vCam.fov = camera.fov;
    vCam.updateMatrixWorld();
    vCam.matrixWorldInverse.copy(vCam.matrixWorld).invert();

    // Start from the main camera projection, then apply oblique clipping.
    vCam.projectionMatrix.copy(camera.projectionMatrix);

    // --- Texture matrix (world -> reflection UV) ---
    this.textureMatrix.copy(this._bias);
    this.textureMatrix.multiply(vCam.projectionMatrix);
    this.textureMatrix.multiply(vCam.matrixWorldInverse);

    // --- Oblique near-plane clipping to avoid rendering below the water plane ---
    this._mirrorPlane.setFromNormalAndCoplanarPoint(this._normal, this._reflectorWorldPos);
    this._mirrorPlane.applyMatrix4(vCam.matrixWorldInverse);
    this._clipPlane.set(
      this._mirrorPlane.normal.x,
      this._mirrorPlane.normal.y,
      this._mirrorPlane.normal.z,
      this._mirrorPlane.constant
    );

    const proj = vCam.projectionMatrix;
    const e = proj.elements;

    this._q.x = (Math.sign(this._clipPlane.x) + e[8]) / e[0];
    this._q.y = (Math.sign(this._clipPlane.y) + e[9]) / e[5];
    this._q.z = -1.0;
    this._q.w = (1.0 + e[10]) / e[14];

    // Calculate the scaled plane vector.
    const scale = 2.0 / this._clipPlane.dot(this._q);
    this._clipPlane.multiplyScalar(scale);

    // Replace the third row of the projection matrix.
    e[2] = this._clipPlane.x;
    e[6] = this._clipPlane.y;
    e[10] = this._clipPlane.z + 1.0 - this._clipBias;
    e[14] = this._clipPlane.w;

    // --- Render ---
    // Guard all temporary state changes with try/finally. On some mobile GPU/driver
    // combinations, renderTarget operations can occasionally throw; without this,
    // the app can get stuck rendering to the offscreen RT ("black screen").
    const currentRT = renderer.getRenderTarget();
    const currentXrEnabled = renderer.xr.enabled;
    const currentShadowAutoUpdate = renderer.shadowMap.autoUpdate;
    const currentToneMapping = renderer.toneMapping;

    // Hide requested objects.
    const nHide = hide.length;
    this._hidePrev.length = nHide;
    for (let i = 0; i < nHide; i++) {
      const obj = hide[i];
      this._hidePrev[i] = obj.visible;
      obj.visible = false;
    }

    try {
      renderer.xr.enabled = false;
      renderer.shadowMap.autoUpdate = false;

      // Render the reflection without tone mapping so the final frame is tone-mapped only once.
      // Note: render targets already respect their own texture.colorSpace; we keep the
      // renderer's outputColorSpace unchanged to avoid unnecessary state churn.
      renderer.toneMapping = THREE.NoToneMapping;

      renderer.setRenderTarget(this.renderTarget);
      renderer.clear();
      renderer.render(scene, vCam);
    } finally {
      renderer.setRenderTarget(currentRT);
      renderer.toneMapping = currentToneMapping;
      renderer.xr.enabled = currentXrEnabled;
      renderer.shadowMap.autoUpdate = currentShadowAutoUpdate;

      // Restore hidden objects.
      for (let i = 0; i < nHide; i++) {
        hide[i].visible = this._hidePrev[i];
      }
    }
  }
}
