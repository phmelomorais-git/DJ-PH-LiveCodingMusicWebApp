import './style.css';
import { AudioEngine } from './audioEngine';
import { Sequencer } from './sequencer';
import { UIController } from './uiController';

/**
 * DJ PH - Live Coding Music Application
 * Main entry point for the application
 */
class App {
  private audioEngine: AudioEngine;
  private sequencer: Sequencer;
  private uiController: UIController;
  
  // DOM Elements
  private codeEditor: HTMLTextAreaElement;
  private playBtn: HTMLButtonElement;
  private pauseBtn: HTMLButtonElement;
  private stopBtn: HTMLButtonElement;
  private clearBtn: HTMLButtonElement;
  private tempoSlider: HTMLInputElement;
  private tempoValue: HTMLElement;
  private volumeSlider: HTMLInputElement;
  private volumeValue: HTMLElement;

  private isPlaying: boolean;
  private isPaused: boolean;

  constructor() {
    // Initialize audio engine and sequencer
    this.audioEngine = new AudioEngine();
    this.sequencer = new Sequencer(this.audioEngine);
    this.uiController = new UIController();

    // Get DOM elements
    this.codeEditor = document.getElementById('codeEditor') as HTMLTextAreaElement;
    this.playBtn = document.getElementById('playBtn') as HTMLButtonElement;
    this.pauseBtn = document.getElementById('pauseBtn') as HTMLButtonElement;
    this.stopBtn = document.getElementById('stopBtn') as HTMLButtonElement;
    this.clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
    this.tempoSlider = document.getElementById('tempoSlider') as HTMLInputElement;
    this.tempoValue = document.getElementById('tempoValue') as HTMLElement;
    this.volumeSlider = document.getElementById('volumeSlider') as HTMLInputElement;
    this.volumeValue = document.getElementById('volumeValue') as HTMLElement;

    this.isPlaying = false;
    this.isPaused = false;

    // Set up event listeners
    this.setupEventListeners();

    // Set up sequencer callback for visualization
    this.sequencer.onStep((step, patterns) => {
      this.uiController.highlightStep(step, patterns);
    });

    // Initialize UI status
    this.uiController.updateStatus('stopped');

    console.log('DJ PH - Live Coding Music initialized! 🎵');
  }

  /**
   * Set up all event listeners
   */
  private setupEventListeners(): void {
    // Play button
    this.playBtn.addEventListener('click', () => {
      this.play();
    });

    // Pause button
    this.pauseBtn.addEventListener('click', () => {
      this.pause();
    });

    // Stop button
    this.stopBtn.addEventListener('click', () => {
      this.stop();
    });

    // Clear button
    this.clearBtn.addEventListener('click', () => {
      this.codeEditor.value = '';
    });

    // Tempo slider
    this.tempoSlider.addEventListener('input', (e) => {
      const tempo = parseInt((e.target as HTMLInputElement).value);
      this.tempoValue.textContent = tempo.toString();
      this.sequencer.setTempo(tempo);
    });

    // Volume slider
    this.volumeSlider.addEventListener('input', (e) => {
      const volume = parseInt((e.target as HTMLInputElement).value);
      this.volumeValue.textContent = volume.toString();
      this.audioEngine.setVolume(volume);
    });

    // Code editor - update patterns on change while playing
    this.codeEditor.addEventListener('input', () => {
      if (this.isPlaying && !this.isPaused) {
        this.updatePatterns();
      }
    });
  }

  /**
   * Play the music
   */
  private async play(): Promise<void> {
    try {
      if (this.isPaused) {
        // Resume from pause
        this.sequencer.resume();
        this.isPaused = false;
      } else {
        // Start fresh
        const code = this.codeEditor.value;
        
        if (!code.trim()) {
          this.uiController.showError('Please write some patterns first!');
          return;
        }

        this.sequencer.updatePatterns(code);
        await this.sequencer.start();
        
        // Update UI with patterns
        this.uiController.updatePatterns(this.sequencer.getPatterns());
      }

      this.isPlaying = true;
      this.uiController.updateStatus('playing');
      
      // Update button states
      this.playBtn.disabled = true;
      this.pauseBtn.disabled = false;
      
    } catch (error) {
      console.error('Error starting playback:', error);
      this.uiController.showError('Failed to start playback');
    }
  }

  /**
   * Pause the music
   */
  private pause(): void {
    this.sequencer.pause();
    this.isPaused = true;
    this.uiController.updateStatus('paused');
    
    // Update button states
    this.playBtn.disabled = false;
    this.pauseBtn.disabled = true;
  }

  /**
   * Stop the music
   */
  private stop(): void {
    this.sequencer.stop();
    this.isPlaying = false;
    this.isPaused = false;
    this.uiController.updateStatus('stopped');
    
    // Update button states
    this.playBtn.disabled = false;
    this.pauseBtn.disabled = true;
  }

  /**
   * Update patterns from code (for live coding)
   */
  private updatePatterns(): void {
    const code = this.codeEditor.value;
    this.sequencer.updatePatterns(code);
    this.uiController.updatePatterns(this.sequencer.getPatterns());
  }
}

// Initialize the app when the DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  new App();
});
