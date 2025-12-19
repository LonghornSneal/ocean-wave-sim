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

export class OverlayWarning {
  private el: HTMLDivElement;
  private badge: HTMLDivElement;
  private visible = false;

  constructor(text: string) {
    this.el = document.createElement('div');
    this.badge = document.createElement('div');
    this.badge.textContent = text;

    Object.assign(this.el.style, {
      position: 'fixed',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: '60'
    } as Partial<CSSStyleDeclaration>);

    Object.assign(this.badge.style, {
      marginTop: '5vh',
      padding: '10px 18px',
      borderRadius: '999px',
      background: 'linear-gradient(110deg, rgba(255,82,67,0.95), rgba(255,178,71,0.95))',
      color: '#121417',
      fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
      fontSize: '14px',
      letterSpacing: '2.2px',
      textTransform: 'uppercase',
      boxShadow: '0 10px 28px rgba(18,20,23,0.45)',
      transform: 'translateY(-6px) scale(0.98)',
      transition: 'opacity 160ms ease, transform 200ms ease'
    } as Partial<CSSStyleDeclaration>);

    this.el.style.opacity = '0';
    this.badge.style.opacity = '0';
    this.el.appendChild(this.badge);
    document.body.appendChild(this.el);
  }

  public setIntensity(intensity: number): void {
    const t = Math.max(0, Math.min(1, intensity));
    if (t <= 0.001) {
      this.hide();
      return;
    }
    if (!this.visible) this.show();
    const lift = -6 + 10 * t;
    const scale = 0.98 + 0.06 * t;
    this.el.style.opacity = `${0.35 + 0.65 * t}`;
    this.badge.style.opacity = `${0.55 + 0.45 * t}`;
    this.badge.style.transform = `translateY(${lift}px) scale(${scale})`;
    this.badge.style.boxShadow = `0 ${10 + 10 * t}px ${28 + 12 * t}px rgba(18,20,23,${0.35 + 0.25 * t})`;
  }

  public setText(text: string): void {
    this.badge.textContent = text;
  }

  public show(): void {
    if (this.visible) return;
    this.visible = true;
    this.el.style.opacity = '1';
    this.badge.style.opacity = '1';
  }

  public hide(): void {
    if (!this.visible) return;
    this.visible = false;
    this.el.style.opacity = '0';
    this.badge.style.opacity = '0';
  }

  public dispose(): void {
    this.el.remove();
  }
}
