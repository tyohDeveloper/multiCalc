# Row 3 Button Labels (M–R)

## What & Why
Assign the correct face labels and top-row labels to all six buttons in row 3 (top-fn-2) of the MultiCalc keyboard. The buttons were previously placeholders using generic letter labels.

## Done looks like
- Button m shows a right-pointing outline triangle (▷) on its face, with magenta "UP" top-left and cyan "HOME" top-right
- Button n shows a down-pointing outline triangle (▽) on its face, with magenta "DEF" top-left and cyan "RCL" top-right
- Button o shows a left-pointing outline triangle (◁) on its face, with magenta "→NUM" top-left and cyan "UNDO" top-right
- Button p shows EVAL on its face, with a single merged magenta "PICTURE" above
- Button q shows STO on its face, with a single merged magenta "VIEW" above
- Button r shows I on its face, with a single merged magenta "SWAP" above

## Out of scope
- Wiring up the new operations to any logic (ops remain as they are)
- Any other rows or sections of the keyboard

## Tasks
1. Add label keys for the three outline triangle symbols (▷, ▽, ◁) and for the letter "I" to `labels.json`.
2. Update the six `top-fn-2` entries in `hp48Keys.json` to use the new label keys as their `labelKey`, and set the correct `topMagenta`/`topCyan` (for m, n, o) or `topMerged` (for p, q, r) values.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:47-57`
- `artifacts/rpn-calc/src/config/labels.json:100-106`
