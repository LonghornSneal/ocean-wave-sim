export function installRuntimeErrorOverlay(
  canvas: HTMLCanvasElement,
  onContextLost?: () => void,
  onContextRestored?: () => void
): void {
  const el = document.createElement('div');
  Object.assign(el.style, {
    position: 'fixed',
    left: '10px',
    top: '10px',
    maxWidth: 'calc(100% - 20px)',
    maxHeight: '45vh',
    overflow: 'auto',
    padding: '10px 12px',
    background: 'rgba(0,0,0,0.70)',
    color: 'rgba(255,255,255,0.95)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: '10px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: '12px',
    lineHeight: '1.35',
    zIndex: '9999',
    whiteSpace: 'pre-wrap',
    display: 'none'
  } as Partial<CSSStyleDeclaration>);
  document.body.appendChild(el);

  let shown = false;
  const show = (title: string, detail: unknown) => {
    if (shown) return;
    shown = true;
    const msg = typeof detail === 'string' ? detail : (detail instanceof Error ? (detail.stack ?? detail.message) : JSON.stringify(detail));
    el.textContent = `${title}\n\n${msg}\n\nTip: If this says WebGL context lost, lower quality (Performance → quality) or reload.`;
    el.style.display = 'block';
  };

  window.addEventListener('error', (e) => {
    show('Runtime error', (e as ErrorEvent).error ?? (e as ErrorEvent).message);
  });

  window.addEventListener('unhandledrejection', (e) => {
    show('Unhandled promise rejection', (e as PromiseRejectionEvent).reason);
  });

  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    show('WebGL context lost', 'Your browser/GPU driver stopped the WebGL context. Try lowering quality or reloading.');
    onContextLost?.();
  }, { passive: false });

  canvas.addEventListener('webglcontextrestored', () => {
    shown = false;
    el.style.display = 'none';
    onContextRestored?.();
  }, { passive: true });
}
