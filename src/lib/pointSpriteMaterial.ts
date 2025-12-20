import * as THREE from 'three';

export function enablePointSpriteAttributes(material: THREE.PointsMaterial): void {
  material.onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
attribute float aSize;
attribute float aOpacity;
varying float vOpacity;`
      )
      .replace(
        '#include <color_vertex>',
        `#include <color_vertex>
vOpacity = aOpacity;`
      )
      .replace('gl_PointSize = size;', 'gl_PointSize = size * aSize;');

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <color_pars_fragment>',
        `#include <color_pars_fragment>
varying float vOpacity;`
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
diffuseColor.a *= vOpacity;`
      );
  };

  material.customProgramCacheKey = () => 'points_softsprite_attr_v1';
}
