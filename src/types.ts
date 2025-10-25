// Type definitions for music patterns and instruments

/**
 * Represents a single note or drum sound
 */
export type Note = string;

/**
 * Pattern structure for a single track
 */
export interface Pattern {
  instrument: string;
  notes: Note[];
}

/**
 * Parsed pattern data from the code editor
 */
export interface ParsedPattern {
  drums?: Note[];
  bass?: Note[];
  synth?: Note[];
}

/**
 * Instrument configuration
 */
export interface InstrumentConfig {
  type: 'drums' | 'bass' | 'synth';
  volume: number;
}

/**
 * Application state
 */
export interface AppState {
  isPlaying: boolean;
  tempo: number;
  volume: number;
  currentStep: number;
  patterns: ParsedPattern;
}
