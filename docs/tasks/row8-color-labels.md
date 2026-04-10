# Row 8 color-function top labels

## What & Why
Replace the placeholder "magenta"/"cyan" top labels on row 8's five keys with the specified color-function labels. Key #0 (ON) also gets its shift annotations.

## Done looks like
- Key #0 (ON): top-left magenta "CONT", top-right cyan "OFF"
- Key #1 (0): top-left magenta "=", top-right cyan "→" (U+2192)
- Key #2 (.): top-left magenta ",", top-right cyan "ↂ" (U+2182)
- Key #3 (␣, U+2423): top-left magenta "𝝅" (big), top-right cyan "∡" (big)
- Key #4 (+): top-left magenta "{}", top-right cyan "::"

## Out of scope
- Primary key labels
- Any other rows

## Tasks
1. In `hp48Keys.json`, update the five `top-fn-8` key objects with the correct `topMagenta` / `topCyan` values. Apply `topMagentaBig: true` and `topCyanBig: true` on key #3 (𝝅 and ∡ are large math symbols).

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:103-110`
