import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { HeightFogPostPass } from '../lib/heightFogPass';
import { UnderwaterPostPass } from '../lib/underwaterPass';
import { GradeShader } from '../lib/grading';
import { GrainDitherShader } from '../lib/grainDither';
import type { AppParams } from '../lib/ui';
import { IS_MOBILE_LIKE } from './quality';

export type PostFXState = {
  composer: EffectComposer | null;
  ssrPass: SSRPass | null;
  heightFogPass: ShaderPass | null;
  underwaterPass: ShaderPass | null;
  bloomPass: UnrealBloomPass | null;
  grainPass: ShaderPass | null;
  gradePass: ShaderPass | null;
  outputPass: OutputPass | null;
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
  let bloomPass: UnrealBloomPass | null = null;
  let grainPass: ShaderPass | null = null;
  let gradePass: ShaderPass | null = null;
  let outputPass: OutputPass | null = null;
  let composerDepthTex: THREE.DepthTexture | null = null;

  if (args.params.quality === 'Low') {
    args.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    return {
      composer,
      ssrPass,
      heightFogPass,
      underwaterPass,
      bloomPass,
      grainPass,
      gradePass,
      outputPass,
      composerDepthTex
    };
  }

  try {
    const hasDepthTex = args.renderer.capabilities.isWebGL2 || !!args.renderer.extensions.get('WEBGL_depth_texture');
    const canFloatRT =
      !!args.renderer.extensions.get('EXT_color_buffer_float') ||
      !!args.renderer.extensions.get('EXT_color_buffer_half_float');
    const hdrType = canFloatRT ? THREE.HalfFloatType : THREE.UnsignedByteType;

    if (hasDepthTex) {
      composerDepthTex = new THREE.DepthTexture(window.innerWidth, window.innerHeight);
      composerDepthTex.format = THREE.DepthFormat;
      composerDepthTex.type = THREE.UnsignedShortType;
      composerDepthTex.minFilter = THREE.NearestFilter;
      composerDepthTex.magFilter = THREE.NearestFilter;
      composerDepthTex.generateMipmaps = false;
    }

    const rt = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      format: THREE.RGBAFormat,
      type: hdrType,
      depthBuffer: true,
      stencilBuffer: false,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter
    });
    rt.texture.name = 'ComposerRT';
    rt.texture.colorSpace = THREE.LinearSRGBColorSpace;
    rt.texture.generateMipmaps = false;
    if (composerDepthTex) {
      rt.depthTexture = composerDepthTex;
    }

    composer = new EffectComposer(args.renderer, rt);

    try {
      const rt2 = (composer as any).renderTarget2;
      if (rt2 && !rt2.depthTexture && composerDepthTex) {
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
      if (rt2?.texture) {
        rt2.texture.colorSpace = THREE.LinearSRGBColorSpace;
      }
    } catch {
      // ignore
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

        (ssrPass as any).opacity = 1.0;
        (ssrPass as any).maxDistance = 420;
        (ssrPass as any).thickness = 0.018;
        (ssrPass as any).infiniteThick = false;
        (ssrPass as any).fresnel = false;
        (ssrPass as any).distanceAttenuation = true;
        (ssrPass as any).blur = false;
        (ssrPass as any).output = (SSRPass as any).OUTPUT?.SSR ?? 1;
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

    if (canFloatRT) {
      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.2,
        0.15,
        1.1
      );
      composer.addPass(bloomPass);
    }

    grainPass = new ShaderPass(GrainDitherShader as any);
    const pixelRatio = args.renderer.getPixelRatio();
    (grainPass as any).uniforms.u_resolution.value.set(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
    composer.addPass(grainPass);

    gradePass = new ShaderPass(GradeShader as any);
    composer.addPass(gradePass);

    outputPass = new OutputPass();
    composer.addPass(outputPass);

    args.renderer.toneMapping = THREE.NoToneMapping;
  } catch (err) {
    console.warn('PostFX init failed; falling back to standard renderer.', err);
    composer = null;
    ssrPass = null;
    heightFogPass = null;
    underwaterPass = null;
    bloomPass = null;
    grainPass = null;
    gradePass = null;
    outputPass = null;
    composerDepthTex = null;
    args.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  }

  return {
    composer,
    ssrPass,
    heightFogPass,
    underwaterPass,
    bloomPass,
    grainPass,
    gradePass,
    outputPass,
    composerDepthTex
  };
}
