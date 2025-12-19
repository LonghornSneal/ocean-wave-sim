import * as THREE from 'three';
import { mulberry32 } from './prng';

function configureSpriteTexture(tex: THREE.CanvasTexture, name: string): THREE.Texture {
  tex.name = name;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
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

  ctx.save();
  ctx.translate(cx, cy);

  traceDropletPath(ctx, w, h);
  const base = ctx.createRadialGradient(-w * 0.6, -h * 0.65, 2, w * 0.2, h * 0.2, w * 2.6);
  base.addColorStop(0, 'rgba(255,255,255,0.95)');
  base.addColorStop(0.3, 'rgba(225,225,225,0.75)');
  base.addColorStop(0.65, 'rgba(170,170,170,0.45)');
  base.addColorStop(1, 'rgba(140,140,140,0.0)');
  ctx.fillStyle = base;
  ctx.fill();

  ctx.globalCompositeOperation = 'multiply';
  traceDropletPath(ctx, w, h);
  const shadow = ctx.createRadialGradient(w * 0.4, h * 0.4, 4, w * 0.35, h * 0.45, w * 1.8);
  shadow.addColorStop(0, 'rgba(50,50,50,0.25)');
  shadow.addColorStop(1, 'rgba(50,50,50,0.0)');
  ctx.fillStyle = shadow;
  ctx.fill();

  ctx.globalCompositeOperation = 'source-over';
  traceDropletPath(ctx, w, h);
  ctx.strokeStyle = 'rgba(235,235,235,0.55)';
  ctx.lineWidth = 1.6;
  ctx.stroke();

  ctx.globalCompositeOperation = 'screen';
  ctx.beginPath();
  ctx.ellipse(-w * 0.55, -h * 0.55, w * 0.42, h * 0.25, -0.35, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(w * 0.2, h * 0.25, w * 0.55, h * 0.3, 0.25, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fill();

  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  return configureSpriteTexture(tex, 'DropletTexture');
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
  const inner = base - size * 0.08;
  const rng = mulberry32(781221);

  ctx.save();
  ctx.translate(cx, cy);

  traceCrownPath(ctx, base, 72);
  const ring = ctx.createRadialGradient(-base * 0.35, -base * 0.45, base * 0.1, 0, 0, base * 1.5);
  ring.addColorStop(0, 'rgba(255,255,255,0.9)');
  ring.addColorStop(0.45, 'rgba(220,220,220,0.7)');
  ring.addColorStop(0.8, 'rgba(170,170,170,0.45)');
  ring.addColorStop(1, 'rgba(150,150,150,0.0)');
  ctx.fillStyle = ring;
  ctx.fill();

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(0, 0, inner, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = 'source-over';
  const foam = ctx.createRadialGradient(0, 0, 0, 0, 0, base * 1.05);
  foam.addColorStop(0, 'rgba(255,255,255,0.2)');
  foam.addColorStop(0.5, 'rgba(200,200,200,0.1)');
  foam.addColorStop(1, 'rgba(200,200,200,0.0)');
  ctx.fillStyle = foam;
  ctx.beginPath();
  ctx.arc(0, 0, base * 0.95, 0, Math.PI * 2);
  ctx.fill();

  traceCrownPath(ctx, base, 72);
  ctx.strokeStyle = 'rgba(245,245,245,0.6)';
  ctx.lineWidth = 2.0;
  ctx.stroke();

  ctx.globalCompositeOperation = 'screen';
  for (let i = 0; i < 26; i++) {
    const ang = rng() * Math.PI * 2;
    const rad = base * 0.85 + rng() * base * 0.6;
    const dx = Math.cos(ang) * rad;
    const dy = Math.sin(ang) * rad;
    const r = 3 + rng() * 6;
    const drop = ctx.createRadialGradient(dx - r * 0.3, dy - r * 0.35, 1, dx, dy, r);
    drop.addColorStop(0, 'rgba(255,255,255,0.85)');
    drop.addColorStop(0.55, 'rgba(210,210,210,0.4)');
    drop.addColorStop(1, 'rgba(210,210,210,0.0)');
    ctx.fillStyle = drop;
    ctx.beginPath();
    ctx.arc(dx, dy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const glint = ctx.createRadialGradient(-base * 0.4, -base * 0.45, base * 0.15, 0, 0, base * 1.4);
  glint.addColorStop(0, 'rgba(255,255,255,0.35)');
  glint.addColorStop(0.7, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = glint;
  ctx.beginPath();
  ctx.arc(0, 0, base * 1.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  return configureSpriteTexture(tex, 'SplashTexture');
}

export const DROPLET_TEX: THREE.Texture = makeDropletTexture();
export const SPLASH_TEX: THREE.Texture = makeSplashTexture();
