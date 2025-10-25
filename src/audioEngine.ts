import * as Tone from 'tone';

/**
 * Audio Engine - Manages all Tone.js instruments and effects
 * Provides synthesizers, samplers, and audio effects for the live coding application
 */
export class AudioEngine {
  // Instruments
  private drums: Map<string, Tone.MembraneSynth | Tone.MetalSynth | Tone.NoiseSynth>;
  private bassSynth: Tone.MonoSynth;
  private leadSynth: Tone.PolySynth;

  // Effects
  private reverb: Tone.Reverb;
  private delay: Tone.FeedbackDelay;
  private masterCompressor: Tone.Compressor;

  constructor() {
    // Initialize drum sounds
    this.drums = new Map();
    
    // Kick drum - deep bass drum
    const kick = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 6,
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 1.4,
        attackCurve: 'exponential'
      }
    }).toDestination();
    this.drums.set('kick', kick);

    // Snare drum - sharp percussive sound
    const snare = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0
      }
    }).toDestination();
    this.drums.set('snare', snare);

    // Hi-hat - metallic sound
    const hihat = new Tone.MetalSynth({
      frequency: 200,
      envelope: {
        attack: 0.001,
        decay: 0.1,
        release: 0.01
      },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5
    }).toDestination();
    this.drums.set('hihat', hihat);

    // Clap - noise burst
    const clap = new Tone.NoiseSynth({
      noise: { type: 'pink' },
      envelope: {
        attack: 0.001,
        decay: 0.15,
        sustain: 0
      }
    }).toDestination();
    this.drums.set('clap', clap);

    // Bass synthesizer - deep monophonic synth
    this.bassSynth = new Tone.MonoSynth({
      oscillator: {
        type: 'sawtooth'
      },
      filter: {
        Q: 2,
        type: 'lowpass',
        rolloff: -24
      },
      envelope: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.4,
        release: 0.8
      },
      filterEnvelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.5,
        release: 0.2,
        baseFrequency: 100,
        octaves: 2.5
      }
    });

    // Lead synthesizer - polyphonic synth for melodies
    this.leadSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.6,
        release: 0.8
      }
    });

    // Reverb effect - adds space and depth
    this.reverb = new Tone.Reverb({
      decay: 2.5,
      preDelay: 0.01,
      wet: 0.3
    });

    // Delay effect - rhythmic echo
    this.delay = new Tone.FeedbackDelay({
      delayTime: '8n',
      feedback: 0.4,
      wet: 0.2
    });

    // Master compressor - controls dynamics
    this.masterCompressor = new Tone.Compressor({
      threshold: -20,
      ratio: 4,
      attack: 0.003,
      release: 0.1
    });

    // Connect effects chain: synths -> reverb -> delay -> compressor -> destination
    this.bassSynth.chain(this.reverb, this.delay, this.masterCompressor, Tone.Destination);
    this.leadSynth.chain(this.reverb, this.delay, this.masterCompressor, Tone.Destination);
  }

  /**
   * Play a drum sound
   * @param drumType - Type of drum (kick, snare, hihat, clap)
   * @param time - When to play the sound (for scheduling)
   */
  playDrum(drumType: string, time?: number): void {
    const drum = this.drums.get(drumType.toLowerCase());
    if (drum) {
      if (drum instanceof Tone.MembraneSynth) {
        drum.triggerAttackRelease('C2', '8n', time);
      } else if (drum instanceof Tone.NoiseSynth || drum instanceof Tone.MetalSynth) {
        drum.triggerAttackRelease('8n', time);
      }
    }
  }

  /**
   * Play a bass note
   * @param note - Musical note (e.g., 'C2', 'E2')
   * @param duration - Note duration
   * @param time - When to play the note
   */
  playBass(note: string, duration: string = '8n', time?: number): void {
    if (note !== '-') {
      this.bassSynth.triggerAttackRelease(note, duration, time);
    }
  }

  /**
   * Play a synth note
   * @param note - Musical note (e.g., 'C4', 'E4')
   * @param duration - Note duration
   * @param time - When to play the note
   */
  playSynth(note: string, duration: string = '8n', time?: number): void {
    if (note !== '-') {
      this.leadSynth.triggerAttackRelease(note, duration, time);
    }
  }

  /**
   * Set the master volume
   * @param db - Volume in decibels
   */
  setVolume(db: number): void {
    Tone.Destination.volume.value = db;
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.drums.forEach(drum => drum.dispose());
    this.bassSynth.dispose();
    this.leadSynth.dispose();
    this.reverb.dispose();
    this.delay.dispose();
    this.masterCompressor.dispose();
  }
}
