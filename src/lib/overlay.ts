export class OverlayHint {
  private el: HTMLDivElement;
  private visible = false;
  private tapHandler: ((e: PointerEvent) => void) | null = null;

  constructor(text: string) {
    this.el = document.createElement('div');
    this.el.textContent = text;
    Object.assign(this.el.style, {
      position: 'fixed',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '24px',
      background: 'rgba(0,0,0,0.35)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      fontSize: '16px',
      letterSpacing: '0.3px',
      zIndex: '50',
      userSelect: 'none',
      backdropFilter: 'blur(2px)'
    } as Partial<CSSStyleDeclaration>);
    this.el.style.opacity = '0';
    this.el.style.pointerEvents = 'none';
    document.body.appendChild(this.el);
  }

  public show(): void {
    if (this.visible) return;
    this.visible = true;
    this.el.style.pointerEvents = 'auto';
    this.el.style.opacity = '1';
  }

  public hide(): void {
    if (!this.visible) return;
    this.visible = false;
    this.el.style.pointerEvents = 'none';
    this.el.style.opacity = '0';
  }

  public onTap(cb: () => void): void {
    if (this.tapHandler) {
      this.el.removeEventListener('pointerdown', this.tapHandler);
    }
    this.tapHandler = (e: PointerEvent) => {
      e.preventDefault();
      cb();
    };
    this.el.addEventListener('pointerdown', this.tapHandler, { passive: false });
  }

  public dispose(): void {
    if (this.tapHandler) {
      this.el.removeEventListener('pointerdown', this.tapHandler);
      this.tapHandler = null;
    }
    this.el.remove();
  }
}
