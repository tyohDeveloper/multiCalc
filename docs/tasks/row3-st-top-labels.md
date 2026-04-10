# Row 3 (S–X) Split Top Labels

## What & Why
Replace the single merged top labels on the six row-3 buttons (fn-s through fn-x) with separate magenta (top-left) and cyan (top-right) labels to match the HP-48 GX visual convention used by rows 1 and 2.

## Done looks like
- Button S: magenta "ASIN", cyan "∫"
- Button T: magenta "ACOS", cyan "∂"
- Button U: magenta "ATAN", cyan "∑"
- Button V: magenta "X²", cyan "ˣ√y"
- Button W: magenta "10ˣ", cyan "LOG"
- Button X: magenta "eˣ", cyan "LN"
- Each label renders in its correct color (magenta top-left, cyan top-right) matching the style of rows above.

## Out of scope
- Changing button operations or main face labels
- Adding new functionality behind these labels

## Tasks
1. **Update hp48Keys.json row 3** — For each of fn-s, fn-t, fn-u, fn-v, fn-w, fn-x in the `top-fn-3` row, remove the `topMerged` field and add `topMagenta` and `topCyan` fields with the specified values.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:58-68`
