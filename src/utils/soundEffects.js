/**
 * Web Audio API synthesizer for disaster alerts & emergency sirens
 * Self-contained without external audio files
 */

class SoundEffectsController {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillator = null;
    this.gainNode = null;
    this.sirenInterval = null;
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playBeep(freq = 880, duration = 0.15, type = 'sine') {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback not permitted or unavailable', e);
    }
  }

  playCriticalWarning() {
    // 3 rapid warning pulses
    this.playBeep(920, 0.12, 'sawtooth');
    setTimeout(() => this.playBeep(920, 0.12, 'sawtooth'), 180);
    setTimeout(() => this.playBeep(1150, 0.25, 'sawtooth'), 360);
  }

  startEmergencySiren() {
    if (this.isPlaying) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.isPlaying = true;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();

      this.oscillator = osc;
      this.gainNode = gain;

      let up = true;
      this.sirenInterval = setInterval(() => {
        if (!this.ctx || !this.oscillator) return;
        const targetFreq = up ? 950 : 550;
        this.oscillator.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.2);
        up = !up;
      }, 450);

    } catch (e) {
      console.warn('Siren could not start', e);
      this.isPlaying = false;
    }
  }

  stopEmergencySiren() {
    if (!this.isPlaying) return;
    try {
      if (this.sirenInterval) clearInterval(this.sirenInterval);
      if (this.gainNode && this.ctx) {
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      }
      setTimeout(() => {
        if (this.oscillator) {
          this.oscillator.stop();
          this.oscillator.disconnect();
          this.oscillator = null;
        }
        this.isPlaying = false;
      }, 120);
    } catch (e) {
      this.isPlaying = false;
    }
  }

  toggleSiren() {
    if (this.isPlaying) {
      this.stopEmergencySiren();
      return false;
    } else {
      this.startEmergencySiren();
      return true;
    }
  }
}

export const soundManager = new SoundEffectsController();
