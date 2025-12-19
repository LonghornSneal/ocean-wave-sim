import { clamp, lerp } from './math';

export class OceanAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;

  private windSrc: AudioBufferSourceNode | null = null;
  private waveSrc: AudioBufferSourceNode | null = null;
  private hissSrc: AudioBufferSourceNode | null = null;
  private rainSrc: AudioBufferSourceNode | null = null;

  private windGain: GainNode | null = null;
  private waveGain: GainNode | null = null;
  private hissGain: GainNode | null = null;

  private rainGain: GainNode | null = null;

  private currentWind: number = 0;
  private currentWave: number = 0;
  private currentHiss: number = 0;
  private currentRain: number = 0;

  /** Call once on user gesture (click) */
  public async enable(): Promise<void> {
    if (this.ctx) return;
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    this.ctx = new Ctx();

    // Some mobile browsers create the context in "suspended" state.
    if (this.ctx.state === 'suspended') {
      try { await this.ctx.resume(); } catch { /* ignore */ }
    }

    this.master = this.ctx.createGain();
    this.master.gain.value = 0.55;
    this.master.connect(this.ctx.destination);

    // Shared white noise buffer (looped)
    const noiseBuffer = this.createNoiseBuffer(this.ctx, 2.0);

    // Wind: band-pass-ish
    const wind = this.ctx.createBufferSource();
    wind.buffer = noiseBuffer;
    wind.loop = true;
    this.windSrc = wind;

    const windHP = this.ctx.createBiquadFilter();
    windHP.type = 'highpass';
    windHP.frequency.value = 120;

    const windLP = this.ctx.createBiquadFilter();
    windLP.type = 'lowpass';
    windLP.frequency.value = 2200;

    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0.0;

    wind.connect(windHP);
    windHP.connect(windLP);
    windLP.connect(this.windGain);
    this.windGain.connect(this.master);

    // Wave rumble: lowpass
    const wave = this.ctx.createBufferSource();
    wave.buffer = noiseBuffer;
    wave.loop = true;
    this.waveSrc = wave;

    const waveLP = this.ctx.createBiquadFilter();
    waveLP.type = 'lowpass';
    waveLP.frequency.value = 450;

    this.waveGain = this.ctx.createGain();
    this.waveGain.gain.value = 0.0;

    wave.connect(waveLP);
    waveLP.connect(this.waveGain);
    this.waveGain.connect(this.master);

    // Foam hiss: highpass
    const hiss = this.ctx.createBufferSource();
    hiss.buffer = noiseBuffer;
    hiss.loop = true;
    this.hissSrc = hiss;

    const hissHP = this.ctx.createBiquadFilter();
    hissHP.type = 'highpass';
    hissHP.frequency.value = 2500;

    this.hissGain = this.ctx.createGain();
    this.hissGain.gain.value = 0.0;

    hiss.connect(hissHP);
    hissHP.connect(this.hissGain);
    this.hissGain.connect(this.master);

    wind.start();
    wave.start();
    hiss.start();

    // Rain: bright broadband noise, slightly filtered
    const rain = this.ctx.createBufferSource();
    rain.buffer = noiseBuffer;
    rain.loop = true;
    this.rainSrc = rain;

    const rainBP = this.ctx.createBiquadFilter();
    rainBP.type = 'bandpass';
    rainBP.frequency.value = 1700;
    rainBP.Q.value = 0.7;

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.value = 0.0;

    rain.connect(rainBP);
    rainBP.connect(this.rainGain);
    this.rainGain.connect(this.master);
    rain.start();
  }

  public async resume(): Promise<void> {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      try { await this.ctx.resume(); } catch { /* ignore */ }
    }
  }

  public async suspend(): Promise<void> {
    if (!this.ctx) return;
    if (this.ctx.state === 'running') {
      try { await this.ctx.suspend(); } catch { /* ignore */ }
    }
  }

  public async close(): Promise<void> {
    if (!this.ctx) return;

    try { this.windSrc?.stop(); } catch { /* ignore */ }
    try { this.waveSrc?.stop(); } catch { /* ignore */ }
    try { this.hissSrc?.stop(); } catch { /* ignore */ }
    try { this.rainSrc?.stop(); } catch { /* ignore */ }

    try { this.windSrc?.disconnect(); } catch { /* ignore */ }
    try { this.waveSrc?.disconnect(); } catch { /* ignore */ }
    try { this.hissSrc?.disconnect(); } catch { /* ignore */ }
    try { this.rainSrc?.disconnect(); } catch { /* ignore */ }

    try { this.windGain?.disconnect(); } catch { /* ignore */ }
    try { this.waveGain?.disconnect(); } catch { /* ignore */ }
    try { this.hissGain?.disconnect(); } catch { /* ignore */ }
    try { this.rainGain?.disconnect(); } catch { /* ignore */ }
    try { this.master?.disconnect(); } catch { /* ignore */ }

    this.windSrc = null;
    this.waveSrc = null;
    this.hissSrc = null;
    this.rainSrc = null;
    this.windGain = null;
    this.waveGain = null;
    this.hissGain = null;
    this.rainGain = null;
    this.master = null;

    try { await this.ctx.close(); } catch { /* ignore */ }
    this.ctx = null;
  }

  public setMasterVolume(v: number): void {
    if (!this.master) return;
    this.master.gain.value = clamp(v, 0, 1.2);
  }

  public update(dt_s: number, sea: { U10: number; Hs: number; rain: number }): void {
    if (!this.ctx || !this.windGain || !this.waveGain || !this.hissGain || !this.rainGain) return;

    // Targets from sea state
    const U = clamp(sea.U10, 0, 40);
    const H = clamp(sea.Hs, 0, 12);

    const windT = clamp(Math.pow(U / 18, 1.25), 0, 1);
    const waveT = clamp(Math.pow(H / 3.0, 1.15), 0, 1);
    const hissT = clamp((U / 25) * (H / 5), 0, 1);
    const rainT = clamp(sea.rain, 0, 1);

    const k = clamp(dt_s * 1.6, 0, 1);
    this.currentWind = lerp(this.currentWind, windT * 0.45, k);
    this.currentWave = lerp(this.currentWave, waveT * 0.35, k);
    this.currentHiss = lerp(this.currentHiss, hissT * 0.25, k);
    this.currentRain = lerp(this.currentRain, rainT * 0.55, k);

    this.windGain.gain.value = this.currentWind;
    this.waveGain.gain.value = this.currentWave;
    this.hissGain.gain.value = this.currentHiss;
    this.rainGain.gain.value = this.currentRain;
  }

  private createNoiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
    const len = Math.floor(seconds * ctx.sampleRate);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buf;
  }
}
