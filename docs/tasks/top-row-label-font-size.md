# Top Row Label Font Size Increase

## What & Why
Increase the font size of the magenta and cyan labels that appear above the top row of keys (RAD/POLAR, CHARS, MODES, MEMORY, STACK, PREV/MENU). Currently they are 6.5px and the user wants them visibly larger.

## Done looks like
- The magenta and cyan labels above the top row keys are noticeably larger than before
- All other text, spacing, and layout remains unchanged

## Out of scope
- Any other labels, key text, or layout changes

## Tasks
1. Increase `font-size` on `.key-label-magenta` and `.key-label-cyan` in the calculator stylesheet — bump from 6.5px to a larger value (8px is a reasonable step up).

## Relevant files
- `artifacts/rpn-calc/src/styles/calculator.css:419-437`
