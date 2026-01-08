# Tic Tac Toe

This project is part of **The Odin Project – JavaScript Course**.

## Overview

The goal of this project was to build a playable Tic Tac Toe game
using JavaScript while applying factory functions, the module pattern,
closures, and clean separation of concerns.

## What I Learned

- Organizing code using factory functions
- Using the module pattern (IIFE) to avoid global variables
- Separating game logic from DOM manipulation
- Using closures to manage private state
- Structuring applications using small, focused objects
- Managing game state independently of the UI
- Implementing win and tie detection logic

## Architecture

- **Gameboard module**
  - Stores and manages the board state
- **Player factory**
  - Creates player objects
- **GameController module**
  - Controls game flow and rules
- **DisplayController module**
  - Handles DOM rendering and user interaction

## Features

- Two-player game
- Player name input
- Win and tie detection
- Restartable game
- Click-based interaction

## Notes

- No global variables are used
- No external libraries
- Built using concepts taught up to this point in The Odin Project

---

Built as part of The Odin Project.
