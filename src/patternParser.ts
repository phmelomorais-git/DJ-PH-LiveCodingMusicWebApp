import { ParsedPattern } from './types';

/**
 * Pattern Parser - Parses user code into structured pattern data
 * Converts text-based patterns into a format that can be played by the audio engine
 */
export class PatternParser {
  /**
   * Parse the code from the editor into structured patterns
   * Expected format:
   *   drums: kick snare kick snare
   *   bass: C2 - E2 - G2 - E2
   *   synth: C4 E4 G4 E4 C4 E4 G4 E4
   * 
   * @param code - Raw code from the editor
   * @returns Parsed pattern object
   */
  parse(code: string): ParsedPattern {
    const patterns: ParsedPattern = {};
    
    // Split code into lines and process each line
    const lines = code.split('\n').filter(line => line.trim().length > 0);
    
    for (const line of lines) {
      // Skip comments
      if (line.trim().startsWith('//')) {
        continue;
      }
      
      // Parse line format: "instrument: note1 note2 note3"
      const match = line.match(/^(drums|bass|synth)\s*:\s*(.+)$/i);
      
      if (match) {
        const instrument = match[1].toLowerCase();
        const notesString = match[2].trim();
        
        // Split notes by spaces and filter empty strings
        const notes = notesString.split(/\s+/).filter(n => n.length > 0);
        
        // Store parsed pattern
        if (instrument === 'drums') {
          patterns.drums = notes;
        } else if (instrument === 'bass') {
          patterns.bass = notes;
        } else if (instrument === 'synth') {
          patterns.synth = notes;
        }
      }
    }
    
    return patterns;
  }

  /**
   * Validate if a note is valid
   * @param note - Note string to validate
   * @param instrument - Instrument type
   * @returns True if valid, false otherwise
   */
  isValidNote(note: string, instrument: string): boolean {
    // Rest is always valid
    if (note === '-') {
      return true;
    }

    if (instrument === 'drums') {
      // Valid drum sounds
      const validDrums = ['kick', 'snare', 'hihat', 'clap'];
      return validDrums.includes(note.toLowerCase());
    } else {
      // Valid note pattern: Letter (A-G) + optional sharp (#) + octave number (0-8)
      const notePattern = /^[A-Ga-g][#b]?[0-8]$/;
      return notePattern.test(note);
    }
  }

  /**
   * Get the maximum pattern length across all instruments
   * @param patterns - Parsed patterns
   * @returns Maximum length
   */
  getMaxPatternLength(patterns: ParsedPattern): number {
    let maxLength = 0;
    
    if (patterns.drums) {
      maxLength = Math.max(maxLength, patterns.drums.length);
    }
    if (patterns.bass) {
      maxLength = Math.max(maxLength, patterns.bass.length);
    }
    if (patterns.synth) {
      maxLength = Math.max(maxLength, patterns.synth.length);
    }
    
    return maxLength;
  }
}
