# Row 4 Button Labels

## What & Why
Update the placeholder labels for row #4 buttons in the MultiCalc calculator to the correct HP 48GX key labels provided by the user.

## Done looks like
- The wide button spanning columns 0–1 shows "ENTER"
- The button at column 2 shows "x/y"
- The button at column 3 shows "EEX"
- The button at column 4 shows "DEL"
- The button at column 5 shows "←"

## Out of scope
- Any changes to button behavior or operations
- Labels for any other rows

## Tasks
1. Update the five `key-r4-*` entries in `labels.json` to their correct values: `key-r4-01` → "ENTER", `key-r4-2` → "x/y", `key-r4-3` → "EEX", `key-r4-4` → "DEL", `key-r4-5` → "←".

## Relevant files
- `artifacts/rpn-calc/src/config/labels.json:117-121`
