# Rows 5–8 match rows 1–3 spacing

## What & Why
Rows #5, #6, #7, and #8 in the keyboard grid currently render their cells with the `key-cell-3zone` class but don't wire up the top label fields from the data, and the alpha label div is hardcoded to an empty string. This means the cells can't hold top labels or alpha letters in the future, and the visual height/spacing may differ from rows #1–#3. The fix makes rows #5–#8 render exactly like rows #1–#3: top-label zone reads `topMagenta`, `topCyan`, and `topMerged` from key data; alpha label zone uses a proper per-row array (all empty strings for now) so the zone always occupies the right space and is ready for future letter labels.

## Done looks like
- Rows #5–#8 cells have identical vertical spacing to rows #1–#3 cells.
- The top label area on each cell in rows #5–#8 is structurally ready to display magenta/cyan or merged labels when added to the JSON data.
- The alpha label zone on each cell in rows #5–#8 is ready to display a letter when the array is populated.
- No visual change to existing populated rows (#1–#3).

## Out of scope
- Assigning actual top labels or alpha letters to rows #5–#8 keys (the data stays as-is for now).
- Any layout changes to row #4.

## Tasks
1. In `KeyGrid.tsx`, update the `rowIdx === 5 || rowIdx === 6 || rowIdx === 7 || rowIdx === 8` branch to mirror the rows 1–3 rendering: read `topMagenta`, `topCyan`, `topMerged` from each key (casting as needed), render the merged vs split label variant, and pass a per-row alpha array (four arrays of six empty strings each) to the alpha label div.

## Relevant files
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx:117-137`
- `artifacts/rpn-calc/src/data/hp48Keys.json:80-122`
