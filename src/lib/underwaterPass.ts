import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { UnderwaterShader } from './underwater';

/**
 * A small wrapper around ShaderPass that automatically binds the current
 * readBuffer depthTexture (if present).
 *
 * This avoids relying on internal EffectComposer buffer ordering and keeps
 * the shader portable across Three.js versions.
 */
export class UnderwaterPostPass extends ShaderPass {
  constructor() {
    super(UnderwaterShader as any);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public override render(renderer: any, writeBuffer: any, readBuffer: any, deltaTime?: any, maskActive?: any): void {
    const depthTex = readBuffer?.depthTexture ?? null;
    (this.uniforms as any).tDepth.value = depthTex;
    (this.uniforms as any).u_hasDepth.value = depthTex ? 1.0 : 0.0;
    // Call base ShaderPass render (binds tDiffuse).
    // @ts-expect-error - ShaderPass render signature varies slightly by three version.
    super.render(renderer, writeBuffer, readBuffer, deltaTime, maskActive);
  }
}
