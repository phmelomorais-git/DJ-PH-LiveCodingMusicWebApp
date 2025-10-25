---
mode: agent
model: Claude Sonnet 4.5 (copilot)
---

# DJ PH - Live Coding Music Web Application

## Objective
Build a browser-based live coding music application, using Tone.js. The application should allow users to write pattern-based music code that plays in real-time with seamless live updates.

## Requirements
- The application must be built using technologies (HTML, CSS, JavaScript).
- It should utilize Tone.js for audio synthesis and playback.
- Users must be able to write and edit music code in real-time.
- The application should support pattern-based music composition.
- The interface should be responsive and user-friendly.
- the UI should include: 
    - write and edit music code that generates music patterns.
    - A play/pause button to start and stop the music.
    - A tempo control to adjust the speed of the music.
    - load few instrument samples (like drums, bass, synth) and effects (like reverb, delay).
    - A visual representation of the current patterns being played.

## Implementation Details:
- Librarys: Use Tone.js (Web audio wrapper)
- Frameworks: Vanilla JS + Vite (or Next-js static export) + Typescript.

## Deliverables
- A fully functional web application that meets the above requirements.
- Source code in /src directory with TypeScript types.
- A README.md with setup and usage instructions.
- Comments in the code explaining key sections and logic.