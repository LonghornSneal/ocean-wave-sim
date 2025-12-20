import type { AppParams } from '../lib/ui';
import { OceanAudio } from '../lib/audio';
import { OverlayHint } from '../lib/overlay';

export class AudioController {
  public readonly audio = new OceanAudio();
  public readonly audioHint = new OverlayHint('Tap to enable sound');
  public audioArmed = false;

  constructor(private readonly params: AppParams) {
    this.audioHint.onTap(async () => {
      if (this.audioArmed) return;
      await this.audio.enable();
      this.audioArmed = true;
      this.audioHint.hide();
      void this.updateState();
    });
  }

  updateHint(): void {
    if (!this.params.audioEnabled) {
      this.audioHint.hide();
      return;
    }
    if (!this.audioArmed) this.audioHint.show();
  }

  async updateState(): Promise<void> {
    if (!this.audioArmed) return;
    if (!this.params.audioEnabled || document.hidden) {
      void this.audio.suspend();
      return;
    }
    void this.audio.resume();
  }

  updateFrame(dt: number, metrics: { U10: number; Hs: number; rain: number; rainImpact?: number; splashImpact?: number }): void {
    const audioActive = this.params.audioEnabled && this.audioArmed && !document.hidden;
    if (audioActive) {
      this.audio.setMasterVolume(this.params.masterVolume);
      this.audio.update(dt, metrics);
    } else if (this.audioArmed) {
      this.audio.setMasterVolume(0);
    }
  }

  dispose(): void {
    this.audioHint.dispose();
    void this.audio.close();
  }
}
