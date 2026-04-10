# Increase Top Label Font Size

## What & Why
Increase the font size of the top magenta and cyan labels (both regular and merged variants) from 8px to 10px to improve readability.

## Done looks like
- The magenta labels above keys (e.g. RAD, ASIN, EQUATION) display at 10px
- The cyan labels above keys (e.g. POLAR, CHARS, MODES) display at 10px
- Merged-cell variants of both magenta and cyan labels also display at 10px

## Out of scope
- Font size changes to any other labels (alpha, main button labels, shift keys, etc.)
- Color, spacing, or style changes

## Tasks
1. Update `.key-label-magenta` font-size from 8px to 10px and `.key-label-cyan` font-size from 8px to 10px in the calculator stylesheet.

## Relevant files
- `artifacts/rpn-calc/src/styles/calculator.css:408-424`
