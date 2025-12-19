import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { HeightFogShader } from './heightFog';

/**
 * ShaderPass wrapper that binds the current depth texture (if available).
 */
export class HeightFogPostPass extends ShaderPass {
  constructor() {
    super(HeightFogShader as any);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public override render(renderer: any, writeBuffer: any, readBuffer: any, deltaTime?: any, maskActive?: any): void {
    const depthTex = readBuffer?.depthTexture ?? null;
    (this.uniforms as any).tDepth.value = depthTex;
    (this.uniforms as any).u_hasDepth.value = depthTex ? 1.0 : 0.0;
    super.render(renderer, writeBuffer, readBuffer, deltaTime, maskActive);
  }
}
