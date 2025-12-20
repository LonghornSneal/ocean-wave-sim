import type * as THREE from 'three';
import type { OtterAnimationDetail } from '../lib/otter';
import type { AppParams } from '../lib/ui';

// Heuristic: mobile/touch devices are far more likely to hit GPU/driver limits.
export const DEVICE_MEMORY_GB = (() => {
  try {
    const mem = (navigator as any)?.deviceMemory;
    return typeof mem === 'number' && Number.isFinite(mem) ? mem : null;
  } catch {
    return null;
  }
})();

export const IS_MOBILE_LIKE = (() => {
  try {
    const coarse = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const mobileUA = /Android|iPhone|iPad|iPod/i.test(ua);
    const lowMem = DEVICE_MEMORY_GB !== null && DEVICE_MEMORY_GB <= 4;
    return coarse || mobileUA || lowMem;
  } catch {
    return false;
  }
})();

export function dprCapForQuality(q: AppParams['quality']): number {
  if (!IS_MOBILE_LIKE) {
    if (q === 'Low') return 1.5;
    if (q === 'Medium') return 2.0;
    if (q === 'High') return 2.5;
    return 3.0;
  }

  if (q === 'Low') return 1.25;
  if (q === 'Medium') return 1.5;
  if (q === 'High') return 1.75;
  return 2.0;
}

export type ParticleBudget = {
  maxCount: number;
  cullDistance: number;
};

export function splashBudgetForQuality(q: AppParams['quality']): ParticleBudget {
  if (q === 'Low') return { maxCount: 320, cullDistance: 38 };
  if (q === 'Medium') return { maxCount: 520, cullDistance: 48 };
  if (q === 'High') return { maxCount: 820, cullDistance: 62 };
  return { maxCount: 1150, cullDistance: 78 };
}

export function precipBudgetForQuality(q: AppParams['quality']): ParticleBudget {
  if (q === 'Low') return { maxCount: 650, cullDistance: 80 };
  if (q === 'Medium') return { maxCount: 1050, cullDistance: 95 };
  if (q === 'High') return { maxCount: 1500, cullDistance: 115 };
  return { maxCount: 2000, cullDistance: 135 };
}

export function applyCanvasSize(renderer: THREE.WebGLRenderer, quality: AppParams['quality']): void {
  const dpr = window.devicePixelRatio || 1;
  renderer.setPixelRatio(Math.min(dpr, dprCapForQuality(quality)));
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export type OtterAnimationSettings = {
  detail: OtterAnimationDetail;
  clipRateHz: number;
};

export function otterAnimationSettingsForQuality(q: AppParams['quality']): OtterAnimationSettings {
  if (q === 'Low') return { detail: 'Simplified', clipRateHz: 20 };
  if (q === 'Medium') return { detail: 'Simplified', clipRateHz: 30 };
  return { detail: 'Full', clipRateHz: 0 };
}
