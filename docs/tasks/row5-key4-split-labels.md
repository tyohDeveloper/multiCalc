# Row 5 Key 4 Split Labels

## What & Why
Replace the placeholder top labels on row 5 key #4 (the ÷ key, `fn-5e`) with the real values: "()" in magenta (top left) and "#" in cyan (top right).

## Done looks like
- Row 5, key #4 shows "()" in magenta on the top left above the key
- Row 5, key #4 shows "#" in cyan on the top right above the key
- The placeholder "magenta" / "cyan" text is gone
- All other keys are unchanged

## Out of scope
- Any other keys or rows
- Any functional/op changes

## Tasks
1. In `hp48Keys.json`, update `fn-5e` to set `topMagenta: "()"` and `topCyan: "#"`, replacing the existing placeholder values.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:73-81`
