import * as THREE from 'three';
import { mulberry32 } from './prng';

type SpriteTextureOptions = {
  sharp?: boolean;
};

function configureSpriteTexture(
  tex: THREE.CanvasTexture,
  name: string,
  options: SpriteTextureOptions = {}
): THREE.Texture {
  const sharp = options.sharp ?? false;
  tex.name = name;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.generateMipmaps = true;
  tex.minFilter = sharp ? THREE.LinearMipmapNearestFilter : THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  if (sharp) tex.anisotropy = 2;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function configureAlphaTexture(tex: THREE.CanvasTexture, name: string): THREE.Texture {
  tex.name = name;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

function configureNormalTexture(tex: THREE.CanvasTexture, name: string): THREE.Texture {
  tex.name = name;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

function traceDropletPath(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  const topY = -h * 1.05;
  const midY = -h * 0.1;
  const bottomY = h * 0.9;
  ctx.beginPath();
  ctx.moveTo(0, topY);
  ctx.bezierCurveTo(w * 0.9, topY + h * 0.1, w * 1.2, midY, w * 0.9, h * 0.35);
  ctx.bezierCurveTo(w * 0.6, bottomY + h * 0.05, -w * 0.6, bottomY + h * 0.05, -w * 0.9, h * 0.35);
  ctx.bezierCurveTo(-w * 1.2, midY, -w * 0.9, topY + h * 0.1, 0, topY);
  ctx.closePath();
}

function makeDropletTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  const cx = size * 0.5;
  const cy = size * 0.56;
  const w = size * 0.22;
  const h = size * 0.32;
  const baseRadius = Math.max(w, h) * 1.15;

  ctx.save();
  ctx.translate(cx, cy);

  traceDropletPath(ctx, w, h);
  const base = ctx.createRadialGradient(-w * 0.45, -h * 0.55, 1, w * 0.15, h * 0.2, baseRadius);
  base.addColorStop(0, 'rgba(255,255,255,0.98)');
  base.addColorStop(0.22, 'rgba(240,240,240,0.9)');
  base.addColorStop(0.5, 'rgba(205,205,205,0.55)');
  base.addColorStop(0.72, 'rgba(170,170,170,0.2)');
  base.addColorStop(1, 'rgba(150,150,150,0.0)');
  ctx.fillStyle = base;
  ctx.fill();

  ctx.globalCompositeOperation = 'multiply';
  traceDropletPath(ctx, w, h);
  const shadow = ctx.createRadialGradient(w * 0.4, h * 0.45, 1, w * 0.45, h * 0.5, baseRadius * 0.82);
  shadow.addColorStop(0, 'rgba(30,30,30,0.3)');
  shadow.addColorStop(0.55, 'rgba(30,30,30,0.12)');
  shadow.addColorStop(1, 'rgba(30,30,30,0.0)');
  ctx.fillStyle = shadow;
  ctx.fill();

  ctx.globalCompositeOperation = 'source-over';
  traceDropletPath(ctx, w, h);
  ctx.strokeStyle = 'rgba(245,245,245,0.6)';
  ctx.lineWidth = 1.1;
  ctx.stroke();

  ctx.globalCompositeOperation = 'screen';
  ctx.beginPath();
  ctx.ellipse(-w * 0.55, -h * 0.58, w * 0.3, h * 0.18, -0.35, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(w * 0.18, h * 0.22, w * 0.36, h * 0.18, 0.25, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.16)';
  ctx.fill();

  ctx.globalCompositeOperation = 'destination-in';
  traceDropletPath(ctx, w * 0.97, h * 0.97);
  const alphaRadius = Math.max(w, h) * 1.05;
  const alpha = ctx.createRadialGradient(0, -h * 0.25, 1, 0, 0, alphaRadius);
  alpha.addColorStop(0, 'rgba(255,255,255,1.0)');
  alpha.addColorStop(0.45, 'rgba(255,255,255,0.95)');
  alpha.addColorStop(0.7, 'rgba(255,255,255,0.35)');
  alpha.addColorStop(1, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = alpha;
  ctx.fill();

  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  return configureSpriteTexture(tex, 'DropletTexture', { sharp: true });
}

function traceCrownPath(ctx: CanvasRenderingContext2D, base: number, steps: number): void {
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const spike = 10 + 14 * Math.pow(Math.abs(Math.sin(t * 6.0 + 0.6)), 1.4) + 6 * Math.sin(t * 11.0 + 1.9);
    const r = base + spike;
    const x = Math.cos(t) * r;
    const y = Math.sin(t) * r;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
}

function makeSplashTexture(): THREE.Texture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  const cx = size * 0.5;
  const cy = size * 0.5;
  const base = size * 0.3;
  const inner = base - size * 0.05;
  const rng = mulberry32(781221);

  ctx.save();
  ctx.translate(cx, cy);

  traceCrownPath(ctx, base, 72);
  const ring = ctx.createRadialGradient(-base * 0.25, -base * 0.35, base * 0.06, 0, 0, base * 1.25);
  ring.addColorStop(0, 'rgba(255,255,255,0.96)');
  ring.addColorStop(0.3, 'rgba(235,235,235,0.82)');
  ring.addColorStop(0.6, 'rgba(200,200,200,0.4)');
  ring.addColorStop(0.78, 'rgba(175,175,175,0.16)');
  ring.addColorStop(1, 'rgba(160,160,160,0.0)');
  ctx.fillStyle = ring;
  ctx.fill();

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(0, 0, inner, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = 'source-over';
  const foam = ctx.createRadialGradient(0, 0, base * 0.35, 0, 0, base * 0.95);
  foam.addColorStop(0, 'rgba(255,255,255,0.12)');
  foam.addColorStop(0.5, 'rgba(200,200,200,0.07)');
  foam.addColorStop(1, 'rgba(200,200,200,0.0)');
  ctx.fillStyle = foam;
  ctx.beginPath();
  ctx.arc(0, 0, base * 0.95, 0, Math.PI * 2);
  ctx.fill();

  traceCrownPath(ctx, base, 72);
  ctx.strokeStyle = 'rgba(248,248,248,0.7)';
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.globalCompositeOperation = 'screen';
  for (let i = 0; i < 26; i++) {
    const ang = rng() * Math.PI * 2;
    const rad = base * 0.85 + rng() * base * 0.6;
    const dx = Math.cos(ang) * rad;
    const dy = Math.sin(ang) * rad;
    const r = 2 + rng() * 4.5;
    const drop = ctx.createRadialGradient(dx - r * 0.35, dy - r * 0.35, 0.6, dx, dy, r);
    drop.addColorStop(0, 'rgba(255,255,255,0.9)');
    drop.addColorStop(0.35, 'rgba(230,230,230,0.55)');
    drop.addColorStop(0.7, 'rgba(200,200,200,0.2)');
    drop.addColorStop(1, 'rgba(200,200,200,0.0)');
    ctx.fillStyle = drop;
    ctx.beginPath();
    ctx.arc(dx, dy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const glint = ctx.createRadialGradient(-base * 0.4, -base * 0.45, base * 0.12, 0, 0, base * 1.3);
  glint.addColorStop(0, 'rgba(255,255,255,0.28)');
  glint.addColorStop(0.7, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = glint;
  ctx.beginPath();
  ctx.arc(0, 0, base * 1.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = 'destination-in';
  const alpha = ctx.createRadialGradient(0, 0, base * 0.45, 0, 0, base * 1.45);
  alpha.addColorStop(0, 'rgba(255,255,255,1.0)');
  alpha.addColorStop(0.7, 'rgba(255,255,255,0.88)');
  alpha.addColorStop(1, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = alpha;
  ctx.beginPath();
  ctx.arc(0, 0, base * 1.45, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  return configureSpriteTexture(tex, 'SplashTexture', { sharp: true });
}

function makeSoftSpriteAlpha(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size * 0.5;
  const cy = size * 0.5;
  const g = ctx.createRadialGradient(cx, cy, size * 0.06, cx, cy, size * 0.5);
  g.addColorStop(0.0, 'rgba(255,255,255,0.95)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.7)');
  g.addColorStop(0.7, 'rgba(255,255,255,0.35)');
  g.addColorStop(1.0, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  return configureAlphaTexture(tex, 'SoftSpriteAlpha');
}

function makeSnowTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  const cx = size * 0.5;
  const cy = size * 0.5;
  const base = size * 0.18;

  ctx.save();
  ctx.translate(cx, cy);

  const core = ctx.createRadialGradient(0, 0, 0, 0, 0, base * 1.45);
  core.addColorStop(0, 'rgba(255,255,255,0.95)');
  core.addColorStop(0.5, 'rgba(235,235,235,0.55)');
  core.addColorStop(1, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(0, 0, base * 1.45, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 2.0;
  for (let i = 0; i < 6; i++) {
    const ang = (i / 6) * Math.PI * 2;
    const x = Math.cos(ang) * base * 1.2;
    const y = Math.sin(ang) * base * 1.2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  ctx.globalCompositeOperation = 'screen';
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  for (let i = 0; i < 6; i++) {
    const ang = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const r = base * 0.55;
    const x = Math.cos(ang) * r;
    const y = Math.sin(ang) * r;
    ctx.beginPath();
    ctx.arc(x, y, base * 0.12, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  return configureSpriteTexture(tex, 'SnowTexture');
}

function makeParticleNormalTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const data = img.data;
  const inv = 1 / (size - 1);

  for (let y = 0; y < size; y++) {
    const ny = y * inv * 2 - 1;
    for (let x = 0; x < size; x++) {
      const nx = x * inv * 2 - 1;
      const r2 = nx * nx + ny * ny;
      let tx = 0;
      let ty = 0;
      let tz = 1;
      if (r2 <= 1) {
        tz = Math.sqrt(1 - r2);
        tx = nx;
        ty = ny;
      }
      const i = (y * size + x) * 4;
      data[i + 0] = Math.round((tx * 0.5 + 0.5) * 255);
      data[i + 1] = Math.round((ty * 0.5 + 0.5) * 255);
      data[i + 2] = Math.round((tz * 0.5 + 0.5) * 255);
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  return configureNormalTexture(tex, 'ParticleNormal');
}

export const DROPLET_TEX: THREE.Texture = makeDropletTexture();
export const SPLASH_TEX: THREE.Texture = makeSplashTexture();
export const SOFT_SPRITE_ALPHA: THREE.Texture = makeSoftSpriteAlpha();
export const SNOW_TEX: THREE.Texture = makeSnowTexture();
export const PARTICLE_NORMAL_TEX: THREE.Texture = makeParticleNormalTexture();
