export interface PerfOverlayMetrics {
  dt_ms: number;
  dtEma_ms: number;
  dtAvg_ms: number;
  fpsEma: number;

  quality: string;
  reflectionRT_px: number;
  reflectionUpdatesPerSec: number;

  envInterval_s: number;
  envAngleDelta_deg: number;
}

/**
 * Tiny always-on (toggleable) perf HUD.
 *
 * Goals:
 * - extremely cheap (updates ~5–10Hz)
 * - no layout thrash
 */
export class PerfOverlay {
  private readonly el: HTMLDivElement;
  private enabled = true;
  private acc_s = 0;

  constructor() {
    this.el = document.createElement('div');
    Object.assign(this.el.style, {
      position: 'fixed',
      left: '8px',
      bottom: '8px',
      padding: '8px 10px',
      borderRadius: '8px',
      background: 'rgba(0,0,0,0.35)',
      color: 'white',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: '12px',
      lineHeight: '1.25',
      zIndex: '40',
      whiteSpace: 'pre',
      userSelect: 'none',
      pointerEvents: 'none',
      backdropFilter: 'blur(2px)'
    } as Partial<CSSStyleDeclaration>);
    this.el.textContent = '';
    document.body.appendChild(this.el);
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.el.style.display = enabled ? 'block' : 'none';
  }

  public dispose(): void {
    this.enabled = false;
    this.el.remove();
  }

  /** Update (throttled). dt_s is only used for throttling. */
  public update(dt_s: number, m: PerfOverlayMetrics): void {
    if (!this.enabled) return;
    this.acc_s += dt_s;
    // 7–10 Hz is enough to read, but avoids excessive DOM churn.
    if (this.acc_s < 0.12) return;
    this.acc_s = 0;

    const txt =
      `dt  ${m.dt_ms.toFixed(1)}ms\n` +
      `ema ${m.dtEma_ms.toFixed(1)}ms  (${m.fpsEma.toFixed(0)} fps)\n` +
      `avg ${m.dtAvg_ms.toFixed(1)}ms\n` +
      `mode ${m.quality}\n` +
      `refl ${m.reflectionRT_px}px  (${m.reflectionUpdatesPerSec.toFixed(1)}/s)\n` +
      `env  ${m.envInterval_s.toFixed(1)}s  Δθ ${m.envAngleDelta_deg.toFixed(2)}°`;

    this.el.textContent = txt;
  }
}
