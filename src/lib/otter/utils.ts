import * as THREE from 'three';

export function disposeObject3D(root: THREE.Object3D): void {
  root.traverse((o: THREE.Object3D) => {
    const anyO = o as any;
    if (anyO.geometry && typeof anyO.geometry.dispose === 'function') {
      anyO.geometry.dispose();
    }
    const mat = anyO.material;
    if (Array.isArray(mat)) {
      for (const m of mat) {
        if (m && typeof m.dispose === 'function') m.dispose();
      }
    } else if (mat && typeof mat.dispose === 'function') {
      mat.dispose();
    }
  });
}

export function showOtterLoadError(url: string): void {
  // If we're running on a device without easy console access (phone/tablet),
  // put a tiny, non-intrusive hint on-screen so the failure is obvious.
  try {
    const id = 'otter-load-error';
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('div');
      el.id = id;
      el.style.position = 'fixed';
      el.style.left = '10px';
      el.style.bottom = '10px';
      el.style.zIndex = '9999';
      el.style.maxWidth = 'min(560px, 90vw)';
      el.style.padding = '10px 12px';
      el.style.borderRadius = '10px';
      el.style.background = 'rgba(0,0,0,0.70)';
      el.style.color = '#fff';
      el.style.font = '12px/1.35 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
      document.body.appendChild(el);
    }
    el.textContent = `Otter model failed to load: ${url}. If you're testing on phone, make sure you're using the dev server (localhost:5173), not opening index.html directly.`;
  } catch {
    // ignore
  }
}
