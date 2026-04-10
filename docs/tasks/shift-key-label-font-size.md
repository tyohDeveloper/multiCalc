# Reduce Shift Key Label Font Size

## What & Why
The main label text on the cyan and magenta shift keys (e.g. "memory") overflows the key boundary at 12px. Reducing by 1px gives them a little more breathing room.

## Done looks like
- The cyan and magenta shift key labels no longer overflow their key caps
- Text is visually comfortable at the smaller size

## Out of scope
- Changes to any other key type font sizes
- Layout or spacing changes

## Tasks
1. In `calculator.css`, change the `font-size` on `.key-button.key-shift-cyan .key-main-label` and `.key-button.key-shift-magenta .key-main-label` from `12px` to `11px`.

## Relevant files
- `artifacts/rpn-calc/src/styles/calculator.css:503-507,532-536`
