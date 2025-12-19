import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { HeightFogPostPass } from '../lib/heightFogPass';
import { UnderwaterPostPass } from '../lib/underwaterPass';
import { GradeShader } from '../lib/grading';
import type { AppParams } from '../lib/ui';
import { IS_MOBILE_LIKE } from './quality';

export type PostFXState = {
  composer: EffectComposer | null;
  ssrPass: SSRPass | null;
  heightFogPass: ShaderPass | null;
  underwaterPass: ShaderPass | null;
  gradePass: ShaderPass | null;
  composerDepthTex: THREE.DepthTexture | null;
};

export function rebuildPostFX(prev: PostFXState | null, args: {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  ocean: THREE.Mesh;
  params: AppParams;
}): PostFXState {
  if (prev?.composer) {
    try {
      prev.composer.dispose?.();
    } catch {
      // ignore
    }
  }
  prev?.composerDepthTex?.dispose?.();

  let composer: EffectComposer | null = null;
  let ssrPass: SSRPass | null = null;
  let heightFogPass: ShaderPass | null = null;
  let underwaterPass: ShaderPass | null = null;
  let gradePass: ShaderPass | null = null;
  let composerDepthTex: THREE.DepthTexture | null = null;

  if (args.params.quality === 'Low') {
    return { composer, ssrPass, heightFogPass, underwaterPass, gradePass, composerDepthTex };
  }

  try {
    const hasDepthTex = args.renderer.capabilities.isWebGL2 || !!args.renderer.extensions.get('WEBGL_depth_texture');

    if (hasDepthTex) {
      composerDepthTex = new THREE.DepthTexture(window.innerWidth, window.innerHeight);
      composerDepthTex.format = THREE.DepthFormat;
      composerDepthTex.type = THREE.UnsignedShortType;
      composerDepthTex.minFilter = THREE.NearestFilter;
      composerDepthTex.magFilter = THREE.NearestFilter;
      composerDepthTex.generateMipmaps = false;

      const rt = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType,
        depthBuffer: true,
        stencilBuffer: false
      });
      rt.texture.name = 'ComposerRT';
      rt.depthTexture = composerDepthTex;

      composer = new EffectComposer(args.renderer, rt);

      try {
        const rt2 = (composer as any).renderTarget2;
        if (rt2 && !rt2.depthTexture) {
          const dt2 = new THREE.DepthTexture(window.innerWidth, window.innerHeight);
          dt2.name = 'ComposerDepthTex2';
          dt2.format = THREE.DepthFormat;
          dt2.type = THREE.UnsignedShortType;
          dt2.minFilter = THREE.NearestFilter;
          dt2.magFilter = THREE.NearestFilter;
          dt2.generateMipmaps = false;
          rt2.depthTexture = dt2;
          rt2.depthBuffer = true;
        }
      } catch {
        // ignore
      }
    } else {
      composer = new EffectComposer(args.renderer);
    }

    composer.setSize(window.innerWidth, window.innerHeight);
    composer.addPass(new RenderPass(args.scene, args.camera));

    if (args.params.quality === 'Max' && !IS_MOBILE_LIKE) {
      try {
        ssrPass = new SSRPass({
          renderer: args.renderer,
          scene: args.scene,
          camera: args.camera,
          width: window.innerWidth,
          height: window.innerHeight,
          groundReflector: null,
          selects: [args.ocean]
        });

        (ssrPass as any).opacity = 0.18;
        (ssrPass as any).maxDistance = 420;
        (ssrPass as any).thickness = 0.018;
        (ssrPass as any).infiniteThick = false;

        composer.addPass(ssrPass);
      } catch (err) {
        console.warn('[Max] SSR init failed; continuing without SSR.', err);
        ssrPass = null;
      }
    }

    underwaterPass = new UnderwaterPostPass();
    (underwaterPass as any).uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    composer.addPass(underwaterPass);

    heightFogPass = new HeightFogPostPass();
    composer.addPass(heightFogPass);

    gradePass = new ShaderPass(GradeShader as any);
    composer.addPass(gradePass);
  } catch (err) {
    console.warn('PostFX init failed; falling back to standard renderer.', err);
    composer = null;
    ssrPass = null;
    heightFogPass = null;
    underwaterPass = null;
    gradePass = null;
    composerDepthTex = null;
  }

  return { composer, ssrPass, heightFogPass, underwaterPass, gradePass, composerDepthTex };
}
