import { ParsedPattern } from './types';

/**
 * UI Controller - Manages visual feedback and pattern display
 * Updates the visualizer to show which patterns are currently playing
 */
export class UIController {
  private patternDisplay: HTMLElement;
  private statusIndicator: HTMLElement;
  private statusText: HTMLElement;

  constructor() {
    this.patternDisplay = document.getElementById('patternDisplay')!;
    this.statusIndicator = document.getElementById('statusIndicator')!;
    this.statusText = document.getElementById('statusText')!;
  }

  /**
   * Update the pattern display with current patterns
   * @param patterns - Current patterns to display
   */
  updatePatterns(patterns: ParsedPattern): void {
    this.patternDisplay.innerHTML = '';

    // If no patterns, show message
    if (!patterns.drums && !patterns.bass && !patterns.synth) {
      this.patternDisplay.innerHTML = '<p class="no-pattern">No patterns playing</p>';
      return;
    }

    // Display drums pattern
    if (patterns.drums && patterns.drums.length > 0) {
      this.createPatternTrack('Drums', patterns.drums);
    }

    // Display bass pattern
    if (patterns.bass && patterns.bass.length > 0) {
      this.createPatternTrack('Bass', patterns.bass);
    }

    // Display synth pattern
    if (patterns.synth && patterns.synth.length > 0) {
      this.createPatternTrack('Synth', patterns.synth);
    }
  }

  /**
   * Highlight the current step in the visualizer
   * @param step - Current step number
   * @param _patterns - Current patterns (parameter required for callback signature compatibility)
   */
  highlightStep(step: number, _patterns: ParsedPattern): void {
    // Remove all previous highlights
    const activeSteps = this.patternDisplay.querySelectorAll('.step.active');
    activeSteps.forEach(el => el.classList.remove('active'));

    // Highlight current step for each instrument
    const instruments = ['drums', 'bass', 'synth'];
    
    for (const instrument of instruments) {
      const steps = this.patternDisplay.querySelectorAll(
        `.pattern-track[data-instrument="${instrument}"] .step`
      );
      
      if (steps[step]) {
        steps[step].classList.add('active');
      }
    }
  }

  /**
   * Update status indicator and text
   * @param status - Status ('playing', 'paused', 'stopped')
   */
  updateStatus(status: 'playing' | 'paused' | 'stopped'): void {
    this.statusIndicator.className = 'status-indicator';
    
    switch (status) {
      case 'playing':
        this.statusIndicator.classList.add('playing');
        this.statusIndicator.textContent = '🟢';
        this.statusText.textContent = 'Playing';
        break;
      case 'paused':
        this.statusIndicator.classList.add('stopped');
        this.statusIndicator.textContent = '🟡';
        this.statusText.textContent = 'Paused';
        break;
      case 'stopped':
        this.statusIndicator.classList.add('stopped');
        this.statusIndicator.textContent = '🔴';
        this.statusText.textContent = 'Stopped';
        break;
    }
  }

  /**
   * Create a visual track for a pattern
   * @param name - Instrument name
   * @param notes - Array of notes
   */
  private createPatternTrack(name: string, notes: string[]): void {
    const track = document.createElement('div');
    track.className = 'pattern-track';
    track.setAttribute('data-instrument', name.toLowerCase());

    const title = document.createElement('h3');
    title.textContent = name;
    track.appendChild(title);

    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'pattern-steps';

    // Create step elements
    notes.forEach((note, index) => {
      const step = document.createElement('div');
      step.className = 'step';
      step.textContent = note;
      step.setAttribute('data-step', index.toString());
      
      // Add 'rest' class for silent steps
      if (note === '-') {
        step.classList.add('rest');
      }
      
      stepsContainer.appendChild(step);
    });

    track.appendChild(stepsContainer);
    this.patternDisplay.appendChild(track);
  }

  /**
   * Show error message
   * @param message - Error message to display
   */
  showError(message: string): void {
    // You could add a toast notification or alert here
    console.error(message);
    this.statusText.textContent = `Error: ${message}`;
  }
}
