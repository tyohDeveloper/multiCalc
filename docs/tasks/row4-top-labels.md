# Row 4 Top Label Updates

## What & Why
Set the correct top-row labels for all 6 button positions in row #4 of the calculator. Currently they all show placeholder "magenta"/"cyan" text.

## Done looks like
- ENTER button (spans positions 0–1): top-left magenta reads "EQUATION", top-right cyan reads "MATRIX"
- Position 2 button: top-left magenta reads "EDIT", top-right cyan reads "CMD"
- Position 3 button: top-left magenta reads "PURG", top-right cyan reads "ARG"
- Position 4 button: single merged magenta label reads "CLEAR"
- Position 5 button: single merged magenta label reads "DROP"

## Out of scope
- Any other rows or buttons
- Label styling changes
- Functional/op changes

## Tasks
1. Update the five row-4 key entries in `hp48Keys.json`: set `topMagenta`/`topCyan` for positions 0–1, 2, and 3; replace `topMagenta`/`topCyan` with `topMerged` for positions 4 and 5.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:72-76`
