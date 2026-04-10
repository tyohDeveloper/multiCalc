# Increase inter-row padding by 4px

## What & Why
Add 4px more vertical spacing between keyboard rows so the layout feels less cramped.

## Done looks like
- All keyboard rows have noticeably more breathing room between them
- Spacing is consistent across all key sections

## Out of scope
- Horizontal (between-key) spacing
- Padding inside individual keys

## Tasks
1. Increase the `gap` value on `.key-grid`, `.key-section`, `.key-section-top-fn`, and `.key-section-lower` from `3px` to `7px`.

## Relevant files
- `artifacts/rpn-calc/src/styles/calculator.css:171,178,185,204`
