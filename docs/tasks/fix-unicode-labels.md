# Fix Three Unicode Label Characters

## What & Why
Three key labels have incorrect Unicode characters and need to be swapped for the correct codepoints.

## Done looks like
- Row 3 key 5 (1/x) top-left magenta label shows 𝑒ˣ (U+1D452 + U+02E3, mathematical italic e) instead of plain ASCII eˣ
- Row 2 key 3 face shows ◄ (U+25C4) instead of ◀ (U+25C0)
- Row 2 key 5 face shows ► (U+25BA) instead of ▶ (U+25B6)

## Out of scope
- Any other label or layout changes

## Tasks
1. In `hp48Keys.json`, change the `topMagenta` value on `fn-x` from `"eˣ"` (ASCII e) to `"𝑒ˣ"` (U+1D452 mathematical italic small e followed by U+02E3 modifier letter small x).
2. In `labels.json`, change `key-p` from `\u25C0` to `\u25C4`, and `key-r` from `\u25B6` to `\u25BA`.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:54-59`
- `artifacts/rpn-calc/src/config/labels.json:103-105`
