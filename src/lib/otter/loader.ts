import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

const OTTER_GLTF_CACHE = new Map<string, Promise<GLTF>>();

export function loadGltfCached(loader: GLTFLoader, url: string): Promise<GLTF> {
  const cached = OTTER_GLTF_CACHE.get(url);
  if (cached) return cached;

  const pending = new Promise<GLTF>((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });

  // If the load fails, allow retry on the next request.
  pending.catch(() => {
    OTTER_GLTF_CACHE.delete(url);
  });

  OTTER_GLTF_CACHE.set(url, pending);
  return pending;
}
