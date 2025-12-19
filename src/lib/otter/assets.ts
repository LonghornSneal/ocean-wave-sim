import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { OtterAppearanceMode } from '../otter';
import { loadGltfCached } from './loader';

export function getOtterModelUrl(mode: OtterAppearanceMode): string {
  // IMPORTANT: use a *relative* URL so the project works no matter what base path
  // it is served from (Vite dev server, Vite preview, GitHub Pages, etc.).
  // A leading "/" breaks when hosted under a sub-path.
  if (mode === 'Low') return 'models/otter/otter_low.glb';
  if (mode === 'Medium') return 'models/otter/otter_medium.glb';
  return 'models/otter/otter_high.glb';
}

export function preloadOtterModels(loader: GLTFLoader, started: boolean): boolean {
  if (started) return true;
  const modes: OtterAppearanceMode[] = ['Low', 'Medium', 'High'];
  for (const mode of modes) {
    const url = getOtterModelUrl(mode);
    void loadGltfCached(loader, url).catch(() => {
      // ignore preload errors (main load will surface if needed)
    });
  }
  return true;
}
