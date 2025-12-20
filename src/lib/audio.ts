import { clamp, lerp, smoothstep } from './math';

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

  private bubbleFilter: BiquadFilterNode | null = null;
  private bubbleBus: GainNode | null = null;
  private bubbleNoise: AudioBuffer | null = null;

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
    this.bubbleNoise = this.createNoiseBuffer(this.ctx, 0.25);

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

    // Bubble/foam grains: short noise bursts through a subtle high shelf.
    this.bubbleFilter = this.ctx.createBiquadFilter();
    this.bubbleFilter.type = 'highshelf';
    this.bubbleFilter.frequency.value = 3200;
    this.bubbleFilter.gain.value = 2.5;
    this.bubbleFilter.Q.value = 0.6;

    this.bubbleBus = this.ctx.createGain();
    this.bubbleBus.gain.value = 0.35;

    this.bubbleFilter.connect(this.bubbleBus);
    this.bubbleBus.connect(this.master);
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
    try { this.bubbleFilter?.disconnect(); } catch { /* ignore */ }
    try { this.bubbleBus?.disconnect(); } catch { /* ignore */ }
    try { this.master?.disconnect(); } catch { /* ignore */ }

    this.windSrc = null;
    this.waveSrc = null;
    this.hissSrc = null;
    this.rainSrc = null;
    this.windGain = null;
    this.waveGain = null;
    this.hissGain = null;
    this.rainGain = null;
    this.bubbleFilter = null;
    this.bubbleBus = null;
    this.bubbleNoise = null;
    this.master = null;

    try { await this.ctx.close(); } catch { /* ignore */ }
    this.ctx = null;
  }

  public setMasterVolume(v: number): void {
    if (!this.master) return;
    this.master.gain.value = clamp(v, 0, 1.2);
  }

  public update(dt_s: number, sea: { U10: number; Hs: number; rain: number; rainImpact?: number; splashImpact?: number }): void {
    if (!this.ctx || !this.windGain || !this.waveGain || !this.hissGain || !this.rainGain) return;

    // Targets from sea state
    const U = clamp(sea.U10, 0, 40);
    const H = clamp(sea.Hs, 0, 12);

    const windT = clamp(Math.pow(U / 18, 1.25), 0, 1);
    const waveT = clamp(Math.pow(H / 3.0, 1.15), 0, 1);
    const hissT = clamp((U / 25) * (H / 5), 0, 1);
    const rainT = clamp(sea.rain, 0, 1);
    const rainImpact01 = clamp((sea.rainImpact ?? 0) / 24, 0, 1);
    const splashImpact01 = clamp((sea.splashImpact ?? 0) / 26, 0, 1);
    const rainTarget = clamp(rainT + rainImpact01 * 0.25, 0, 1);
    const hissTarget = clamp(hissT + splashImpact01 * 0.35, 0, 1);

    const k = clamp(dt_s * 1.6, 0, 1);
    this.currentWind = lerp(this.currentWind, windT * 0.45, k);
    this.currentWave = lerp(this.currentWave, waveT * 0.35, k);
    this.currentHiss = lerp(this.currentHiss, hissTarget * 0.25, k);
    this.currentRain = lerp(this.currentRain, rainTarget * 0.55, k);

    this.windGain.gain.value = this.currentWind;
    this.waveGain.gain.value = this.currentWave;
    this.hissGain.gain.value = this.currentHiss;
    this.rainGain.gain.value = this.currentRain;

    const bubbleHs = clamp(smoothstep(0.2, 1.1, H) * (1 - smoothstep(2.2, 3.6, H)), 0, 1);
    const bubbleU = clamp(smoothstep(3.5, 6.5, U) * (1 - smoothstep(11, 17, U)), 0, 1);
    const bubbleActivity = bubbleHs * bubbleU;
    if (bubbleActivity > 0) {
      const bubbleRate = bubbleActivity * 2.6;
      const expected = bubbleRate * dt_s;
      const count = Math.floor(expected);
      const remainder = expected - count;
      for (let i = 0; i < count; i++) {
        this.triggerBubble(bubbleActivity);
      }
      if (Math.random() < remainder) {
        this.triggerBubble(bubbleActivity);
      }
    }
  }

  private triggerBubble(intensity01: number): void {
    if (!this.ctx || !this.bubbleNoise || !this.bubbleFilter || !this.bubbleBus) return;

    const src = this.ctx.createBufferSource();
    src.buffer = this.bubbleNoise;

    const rate = lerp(0.85, 1.7, Math.random());
    src.playbackRate.value = rate;

    const grainBufferDuration = lerp(0.03, 0.09, Math.random());
    const realDuration = grainBufferDuration / rate;
    const offsetMax = Math.max(0, this.bubbleNoise.duration - grainBufferDuration);
    const offset = offsetMax > 0 ? Math.random() * offsetMax : 0;

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    const attack = Math.min(0.006, realDuration * 0.3);
    const decay = Math.max(0.02, realDuration - attack);
    const peak = lerp(0.02, 0.075, intensity01) * lerp(0.6, 1.05, Math.random());

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peak, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);

    src.connect(gain);
    gain.connect(this.bubbleFilter);

    src.start(now, offset, grainBufferDuration);
    src.stop(now + realDuration + 0.02);

    src.onended = () => {
      try { src.disconnect(); } catch { /* ignore */ }
      try { gain.disconnect(); } catch { /* ignore */ }
    };
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
