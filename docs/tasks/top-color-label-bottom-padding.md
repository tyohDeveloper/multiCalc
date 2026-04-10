# Top Color Label Bottom Padding

## What & Why
Add 2px of padding below the magenta and cyan top labels on each key so they have a small visual gap between the label text and the key button beneath.

## Done looks like
- Both magenta and cyan top labels have 2px of space below them, visible above each key button.

## Out of scope
- Any other spacing or layout changes.

## Tasks
1. Add `padding-bottom: 2px` to both `.key-label-magenta` and `.key-label-cyan` CSS classes.

## Relevant files
- `artifacts/rpn-calc/src/styles/calculator.css:408-424`
