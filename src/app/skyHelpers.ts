import * as THREE from 'three';
import { lerp } from '../lib/math';

export function makeStars(count: number): THREE.Points {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
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
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color: new THREE.Color('#ffffff'),
    size: 1.2,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.0,
    depthWrite: false
  });
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
