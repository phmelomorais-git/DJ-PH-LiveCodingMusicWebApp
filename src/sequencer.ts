import * as Tone from 'tone';
import { AudioEngine } from './audioEngine';
import { PatternParser } from './patternParser';
import { ParsedPattern } from './types';

/**
 * Sequencer - Manages playback timing and pattern scheduling
 * Uses Tone.js Transport for precise timing and scheduling
 */
export class Sequencer {
  private audioEngine: AudioEngine;
  private parser: PatternParser;
  private patterns: ParsedPattern;
  private currentStep: number;
  private maxSteps: number;
  private sequence: Tone.Sequence | null;
  private onStepCallback?: (step: number, patterns: ParsedPattern) => void;

  constructor(audioEngine: AudioEngine) {
    this.audioEngine = audioEngine;
    this.parser = new PatternParser();
    this.patterns = {};
    this.currentStep = 0;
    this.maxSteps = 0;
    this.sequence = null;
  }

  /**
   * Update patterns from code
   * @param code - Raw code from editor
   */
  updatePatterns(code: string): void {
    // Parse the code into patterns
    this.patterns = this.parser.parse(code);
    this.maxSteps = this.parser.getMaxPatternLength(this.patterns);
    
    // If already playing, restart the sequence with new patterns
    if (this.isPlaying()) {
      this.stop();
      this.start();
    }
  }

  /**
   * Start the sequencer
   */
  async start(): Promise<void> {
    // Ensure audio context is started (required by browser autoplay policies)
    await Tone.start();
    
    if (this.maxSteps === 0) {
      console.warn('No patterns to play');
      return;
    }

    // Clear any existing sequence
    if (this.sequence) {
      this.sequence.dispose();
    }

    // Reset step counter
    this.currentStep = 0;

    // Create a new sequence
    // The sequence will loop through all steps
    this.sequence = new Tone.Sequence(
      (time, step) => {
        this.playStep(step, time);
        this.currentStep = step;
        
        // Call the callback for UI updates
        if (this.onStepCallback) {
          // Schedule the callback slightly ahead of the audio
          Tone.Draw.schedule(() => {
            this.onStepCallback?.(step, this.patterns);
          }, time);
        }
      },
      Array.from({ length: this.maxSteps }, (_, i) => i),
      '8n' // Play every 8th note
    );

    // Start the sequence
    this.sequence.start(0);
    
    // Start the transport
    Tone.Transport.start();
  }

  /**
   * Pause the sequencer
   */
  pause(): void {
    Tone.Transport.pause();
  }

  /**
   * Resume the sequencer
   */
  resume(): void {
    Tone.Transport.start();
  }

  /**
   * Stop the sequencer
   */
  stop(): void {
    Tone.Transport.stop();
    
    if (this.sequence) {
      this.sequence.stop();
      this.sequence.dispose();
      this.sequence = null;
    }
    
    this.currentStep = 0;
  }

  /**
   * Check if sequencer is playing
   */
  isPlaying(): boolean {
    return Tone.Transport.state === 'started';
  }

  /**
   * Set the tempo (BPM)
   * @param bpm - Beats per minute
   */
  setTempo(bpm: number): void {
    Tone.Transport.bpm.value = bpm;
  }

  /**
   * Set callback for step updates (for visualization)
   * @param callback - Function to call on each step
   */
  onStep(callback: (step: number, patterns: ParsedPattern) => void): void {
    this.onStepCallback = callback;
  }

  /**
   * Play a single step
   * @param step - Step number
   * @param time - Time to play (for scheduling)
   */
  private playStep(step: number, time: number): void {
    // Play drums if pattern exists
    if (this.patterns.drums && step < this.patterns.drums.length) {
      const note = this.patterns.drums[step];
      if (note !== '-') {
        this.audioEngine.playDrum(note, time);
      }
    }

    // Play bass if pattern exists
    if (this.patterns.bass && step < this.patterns.bass.length) {
      const note = this.patterns.bass[step];
      if (note !== '-') {
        this.audioEngine.playBass(note, '8n', time);
      }
    }

    // Play synth if pattern exists
    if (this.patterns.synth && step < this.patterns.synth.length) {
      const note = this.patterns.synth[step];
      if (note !== '-') {
        this.audioEngine.playSynth(note, '8n', time);
      }
    }
  }

  /**
   * Get current patterns
   */
  getPatterns(): ParsedPattern {
    return this.patterns;
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.stop();
    if (this.sequence) {
      this.sequence.dispose();
    }
  }
}
