# Lyre Trainer

<img width="2559" height="1137" alt="Screenshot 2026-05-07 183438" src="https://github.com/user-attachments/assets/b699f002-e440-477c-89df-15a55866d3b0" />


An interactive guitar ear training app built to help musicians develop note recognition and scale awareness across the fretboard.

## What it does

- Generates melodic patterns within a selected scale and root note
- Plays the pattern back as audio so the user can listen and identify the notes
- The user selects the notes they hear on an interactive fretboard
- Visual feedback shows which notes are correct in real time

## Tech stack

- React + Vite
- Tailwind CSS
- Web Audio API
- SVG (custom designed assets in Inkscape)

## What I built

Everything in this project is hand-rolled — no UI component libraries, no game logic packages. The fretboard is a fully dynamic SVG-based layout that scales across screen sizes. The sigil artwork (the note buttons) was designed from scratch in Inkscape and integrated as React components via vite-plugin-svgr.

The architecture separates game state (GameManager), layout (FretBoard), and UI controls (ToolBar) cleanly, with a custom hook handling note selection logic.
