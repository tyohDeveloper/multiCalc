# Row 5 Key 0 Color Labels

## What & Why
Add the magenta (top-left) and cyan (top-right) color function labels to key #0 of row 5 (the bottom-shift key, `fn-5a`). Currently this key has no top labels at all.

## Done looks like
- Row 5, key 0 shows "USER" in magenta (top left) above the key
- Row 5, key 0 shows "ENTRY" in cyan (top right) above the key
- All other keys in row 5 are unchanged

## Out of scope
- Labels for any other row or key
- Any functional/op changes

## Tasks
1. Set `topMagenta: "USER"` and `topCyan: "ENTRY"` on the `fn-5a` key entry in `hp48Keys.json`.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:73-81`
