# DP QUEST

DP QUEST is an interactive learning platform for understanding Dynamic Programming through visual execution and step-by-step explanations.

## Overview

The application helps users learn algorithm behavior instead of memorizing formulas. It displays how values change, how states depend on previous states, and how results are stored in memory.

Each algorithm includes:

- Live step-by-step visualization.
- DP array or DP matrix memory view.
- Interactive network and processing simulation.
- JavaScript code execution view.
- Variable and call-stack inspection.
- Play, pause, next, previous, reset, replay, and speed controls.
- Explanations for each execution step.

## Algorithms

- Fibonacci Sequence
- Climbing Stairs
- Coin Change
- 0/1 Knapsack

Fibonacci supports:

- Recursive
- Memoization
- Tabulation

## Application Sections

- Overview
- DP Academy
- DP Playground
- Algorithm Battle
- DP Challenges
- My Progress
- Settings

## Technologies

- React
- Vite
- React Router
- JavaScript and JSX
- Lucide React
- Framer Motion
- Recharts

## Requirements

- Node.js
- npm

## Installation

Open the project directory and run:

```bash
npm install
npm run dev
```

Vite will display the local address, usually:

```text
http://localhost:5173
```

## Production Build

Create an optimized production build:

```bash
npm run build
```

The generated files are placed in:

```text
dist
```

## Preview

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
  main.jsx
  styles.css

index.html
package.json
project.md
README.md
```

The application runs entirely in the browser. It does not require a database or external algorithm service.

## Saved Progress

The application stores the following data in LocalStorage:

- Light or dark theme.
- Completed lessons.
- Completed challenges.
- Explored algorithms.
- Learning progress.

## Important Files

- src/main.jsx: Application components, algorithms, and execution state.
- src/styles.css: Layout and light and dark themes.
- index.html: Initial page setup and theme restoration.
- package.json: Dependencies and project commands.
