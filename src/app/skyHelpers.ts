import * as THREE from 'three';
import { clamp, lerp } from '../lib/math';

type StarUniforms = {
  uOpacity: { value: number };
  uPixelRatio: { value: number };
  uStarExtinction: { value: number };
  uStarHorizonSoftness: { value: number };
};

type StarMaterial = THREE.ShaderMaterial & { uniforms: StarUniforms };

export function makeStars(count: number): THREE.Points {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const size = new Float32Array(count);
  const lum = new Float32Array(count);
  const tmpColor = new THREE.Color();
  const white = new THREE.Color(0xffffff);

  for (let i = 0; i < count; i++) {
    const r = 4500 + Math.random() * 2500;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.cos(phi);
    const z = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 0] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;

    // Bias toward dim stars with a handful of brighter points.
    const mag = lerp(0.0, 6.0, Math.pow(Math.random(), 0.45));
    const intensity = Math.pow(10, -0.4 * mag);
    lum[i] = intensity;
    size[i] = lerp(1.8, 4.4, Math.pow(intensity, 0.32));

    const tempK = sampleStarTemperatureK();
    temperatureToColor(tempK, tmpColor);
    tmpColor.lerp(white, 0.35);
    col[i * 3 + 0] = tmpColor.r;
    col[i * 3 + 1] = tmpColor.g;
    col[i * 3 + 2] = tmpColor.b;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(size, 1));
  geo.setAttribute('luminosity', new THREE.BufferAttribute(lum, 1));

  const dpr = (typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1;
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uOpacity: { value: 0.0 },
      uPixelRatio: { value: dpr },
      uStarExtinction: { value: 0.2 },
      uStarHorizonSoftness: { value: 0.08 }
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute float size;
      attribute float luminosity;
      attribute vec3 color;

      uniform float uPixelRatio;
      uniform float uStarExtinction;
      uniform float uStarHorizonSoftness;

      varying vec3 vColor;
      varying float vLum;
      varying float vStarExtinction;

      void main() {
        vColor = color;
        vLum = luminosity;

        vec3 starDir = normalize(position);
        float starElev = clamp(starDir.y, 0.0, 1.0);
        float airmass = 1.0 / max(0.02, starElev);
        float extinction = exp(-uStarExtinction * (airmass - 1.0));
        float horizon = smoothstep(0.0, uStarHorizonSoftness, starElev);
        vStarExtinction = extinction * horizon;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = size * uPixelRatio;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      uniform float uOpacity;

      varying vec3 vColor;
      varying float vLum;
      varying float vStarExtinction;

      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float r = length(uv) * 2.0;
        float edge = smoothstep(1.0, 0.0, r);
        float core = smoothstep(0.5, 0.0, r);
        float halo = smoothstep(1.0, 0.2, r);
        float profile = mix(halo, core, 0.65);
        float lum = pow(vLum, 0.6);
        float alpha = profile * mix(0.25, 1.0, lum) * uOpacity * vStarExtinction;
        if (alpha < 0.003) discard;
        vec3 color = vColor * lum * (0.6 + 0.6 * core);
        gl_FragColor = vec4(color, alpha);
      }
    `
  }) as StarMaterial;
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  return pts;
}

export function makeSunSprite(): THREE.Sprite {
  const tex = makeRadialTexture('#fff7cf');
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 1.0, depthWrite: false, blending: THREE.AdditiveBlending });
  const s = new THREE.Sprite(mat);
  s.scale.setScalar(450);
  return s;
}

export function makeMoonSprite(phaseFrac: number): THREE.Sprite {
  const tex = makeMoonTexture(phaseFrac);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 1.0, depthWrite: false });
  const s = new THREE.Sprite(mat);
  s.scale.setScalar(220);
  return s;
}

export function updateMoonPhase(mat: THREE.SpriteMaterial, phaseFrac: number): void {
  const key = Math.round(phaseFrac * 1000) / 1000;
  const prev = (mat as any).__phaseKey as number | undefined;
  if (prev !== key) {
    mat.map?.dispose();
    mat.map = makeMoonTexture(phaseFrac);
    mat.needsUpdate = true;
    (mat as any).__phaseKey = key;
  }
}

function sampleStarTemperatureK(): number {
  const t = Math.random();
  if (t < 0.2) return lerp(3000, 4500, Math.random());
  if (t < 0.7) return lerp(4500, 6500, Math.random());
  return lerp(6500, 10000, Math.random());
}

// Kelvin -> RGB approximation (Tanner Helland).
function temperatureToColor(tempK: number, out: THREE.Color): THREE.Color {
  const t = tempK / 100;
  let r = 255;
  let g: number;
  let b: number;

  if (t <= 66) {
    g = 99.4708025861 * Math.log(Math.max(1e-3, t)) - 161.1195681661;
    b = t <= 19 ? 0 : 138.5177312231 * Math.log(Math.max(1e-3, t - 10)) - 305.0447927307;
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
    b = 255;
  }

  out.setRGB(clamp(r / 255, 0, 1), clamp(g / 255, 0, 1), clamp(b / 255, 0, 1));
  return out;
}

function makeRadialTexture(color: string): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(128, 128, 5, 128, 128, 128);
  g.addColorStop(0, color);
  g.addColorStop(0.15, color);
  g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

function makeMoonTexture(phaseFrac: number): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 256, 256);

  ctx.beginPath();
  ctx.arc(128, 128, 112, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#d9d9d9';
  ctx.fill();

  ctx.globalAlpha = 0.10;
  for (let i = 0; i < 180; i++) {
    const r = 1 + Math.random() * 8;
    const x = 128 + (Math.random() * 2 - 1) * 86;
    const y = 128 + (Math.random() * 2 - 1) * 86;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = Math.random() < 0.5 ? '#bdbdbd' : '#efefef';
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  const p = ((phaseFrac % 1) + 1) % 1;
  const illum = Math.cos((p - 0.5) * Math.PI * 2) * 0.5 + 0.5;
  const terminator = (p < 0.5) ? lerp(1.0, -1.0, p / 0.5) : lerp(-1.0, 1.0, (p - 0.5) / 0.5);
  const offset = terminator * 90;

  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(128, 128, 112, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = `rgba(0,0,0,${lerp(0.98, 0.0, illum)})`;
  ctx.beginPath();
  ctx.arc(128 + offset, 128, 112, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  const g = ctx.createRadialGradient(108, 108, 10, 128, 128, 120);
  g.addColorStop(0, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(128, 128, 112, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}
