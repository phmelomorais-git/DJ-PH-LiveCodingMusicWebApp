# 🎵 DJ PH - Live Coding Music

A browser-based live coding music application built with Tone.js that lets you write pattern-based music code and hear it play in real-time with seamless live updates.

![DJ PH Screenshot](https://via.placeholder.com/800x450.png?text=DJ+PH+Live+Coding+Music)

## ✨ Features

- **Live Coding**: Write and edit music patterns in real-time
- **Pattern-Based Composition**: Simple syntax for creating musical patterns
- **Multiple Instruments**: Drums (kick, snare, hi-hat, clap), bass synth, and lead synth
- **Audio Effects**: Built-in reverb and delay effects
- **Visual Feedback**: Real-time visualization of playing patterns
- **Tempo Control**: Adjust BPM from 60 to 200
- **Volume Control**: Master volume adjustment
- **Responsive UI**: Modern, user-friendly interface

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd w:\_dev\music
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## 📖 Usage

### Writing Patterns

The application uses a simple text-based syntax for defining musical patterns:

```
drums: kick snare kick snare
bass: C2 - E2 - G2 - E2
synth: C4 E4 G4 E4 C4 E4 G4 E4
```

### Pattern Syntax

Each line follows the format: `instrument: note1 note2 note3 ...`

**Instruments:**
- `drums`: Percussion sounds
- `bass`: Bass synthesizer
- `synth`: Lead synthesizer

**Drum Sounds:**
- `kick`: Bass drum
- `snare`: Snare drum
- `hihat`: Hi-hat cymbal
- `clap`: Hand clap

**Musical Notes:**
For bass and synth, use standard note notation:
- Note names: `C`, `D`, `E`, `F`, `G`, `A`, `B`
- Add `#` for sharp: `C#`, `F#`
- Add octave number: `C2`, `E4`, `G5`
- Use `-` for a rest (silence)

**Examples:**

Basic drum pattern:
```
drums: kick snare kick snare
```

Bassline with rests:
```
bass: C2 - E2 - G2 - E2 -
```

Melody:
```
synth: C4 E4 G4 E4 C4 E4 G4 E4
```

Complete pattern:
```
drums: kick hihat snare hihat kick hihat snare clap
bass: C2 - - - E2 - - - G2 - - - E2 - - -
synth: C4 E4 G4 C5 E4 G4 C5 E5
```

### Controls

- **Play**: Start playing your patterns
- **Pause**: Pause playback (resume with Play)
- **Stop**: Stop playback and reset to beginning
- **Tempo Slider**: Adjust the speed (60-200 BPM)
- **Volume Slider**: Adjust master volume (-40 to 0 dB)
- **Clear**: Clear the code editor

### Live Coding

The magic of this application is that you can edit your patterns **while they're playing**! Just type in the editor, and your changes will be reflected in the next loop.

## 🏗️ Project Structure

```
w:\_dev\music/
├── src/
│   ├── main.ts              # Main application entry point
│   ├── audioEngine.ts       # Tone.js audio synthesis and instruments
│   ├── sequencer.ts         # Pattern playback and timing
│   ├── patternParser.ts     # Code parser for music patterns
│   ├── uiController.ts      # Visual feedback and UI updates
│   ├── types.ts             # TypeScript type definitions
│   └── style.css            # Application styles
├── index.html               # HTML entry point
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## 🎼 How It Works

1. **Pattern Parsing**: The `PatternParser` class interprets your text-based patterns into structured data.

2. **Audio Engine**: The `AudioEngine` class manages all Tone.js instruments:
   - Drum synthesizers (MembraneSynth, NoiseSynth, MetalSynth)
   - Bass synthesizer (MonoSynth with filter)
   - Lead synthesizer (PolySynth)
   - Effects chain (Reverb → Delay → Compressor)

3. **Sequencer**: The `Sequencer` class uses Tone.js Transport to schedule and play notes with precise timing. It loops through your patterns at the specified tempo.

4. **UI Controller**: The `UIController` class provides real-time visual feedback, highlighting the currently playing step in each pattern.

5. **Live Updates**: When you edit the code while playing, the sequencer updates the patterns and restarts, creating a seamless live coding experience.

## 🎹 Musical Concepts

- **BPM (Beats Per Minute)**: Controls the speed of playback
- **8th Notes**: Each step in your pattern is an 8th note (1/8 of a measure)
- **Pattern Length**: Patterns can be different lengths; the sequencer will loop through the longest pattern
- **Rests**: Use `-` to create silence in your patterns

## 🛠️ Technologies Used

- **Tone.js**: Web Audio framework for sound synthesis and timing
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and development server
- **CSS3**: Modern styling with gradients and animations

## 🎯 Tips & Tricks

1. **Start Simple**: Begin with a basic drum pattern, then add bass and synth
2. **Experiment**: Try different note combinations and rhythms
3. **Use Rests**: Strategic silence can make patterns more interesting
4. **Layer Patterns**: Different length patterns create polyrhythms
5. **Adjust Tempo**: Find the right speed for your creation
6. **Live Code**: Edit patterns while playing to discover happy accidents

## 🐛 Troubleshooting

**No sound?**
- Make sure your browser audio isn't muted
- Check the volume slider in the app
- Try clicking Play first (browsers require user interaction to start audio)

**Patterns not playing?**
- Check your syntax (instrument name followed by colon)
- Make sure you have at least one non-rest note
- Check the browser console for error messages

**Performance issues?**
- Complex patterns with many instruments may strain older devices
- Try simpler patterns or reduce the number of simultaneous instruments

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Built with [Tone.js](https://tonejs.github.io/) by Yotam Mann
- Inspired by live coding music environments like Sonic Pi and TidalCycles

## 🚀 Future Enhancements

Potential features for future versions:
- More instruments (piano, organ, strings)
- Additional effects (distortion, chorus, phaser)
- Pattern presets and examples
- Export to MIDI or audio file
- Collaborative coding (multiplayer)
- Visual waveform display
- Chord and scale helpers

---

**Made with ❤️ and 🎵**

Happy live coding! 🎉
