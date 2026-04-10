# Softkey Alpha Label Bottom Spacing

## What & Why
The A–F alpha labels beneath the softkey buttons are cut off / cramped because the `.key-cell-soft .key-label-alpha` has no bottom padding and the section's bottom padding is minimal. Adding a few pixels of bottom padding makes the letters fully visible.

## Done looks like
- The A–F labels under the softkey row are fully visible and not clipped
- There is a small, comfortable gap between the letters and the lower edge of the softkey strip

## Out of scope
- Font size changes
- Changes to any other row or section

## Tasks
1. In `calculator.css`, increase the bottom padding on `.key-cell-soft .key-label-alpha` (and/or `.key-section-softkeys` bottom padding) so the alpha labels have enough room to show fully.

## Relevant files
- `artifacts/rpn-calc/src/styles/calculator.css:182-188,450-459`
