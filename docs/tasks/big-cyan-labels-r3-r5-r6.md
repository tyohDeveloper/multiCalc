# Big cyan label on 5 keys

## What & Why
Five top-right cyan labels need to be rendered at the larger "big" font size (matching the existing `topCyanBig` style already used on fn-s). Using the zero-based row/key convention:

- Row #3 key #1 — fn-t (COS face), topCyan: "∂"
- Row #3 key #2 — fn-u (TAN face), topCyan: "∑"
- Row #3 key #3 — fn-v (√x face), topCyan: "ˣ√y"
- Row #5 key #4 — fn-5e (÷ face), topCyan: "#"
- Row #6 key #4 — fn-6e (× face), topCyan: "_"

## Done looks like
- The cyan top-right labels on those five keys render at the larger font size, consistent with the existing "∫" label on fn-s.
- No other keys are affected.

## Out of scope
- Changing any label text
- Modifying any magenta labels
- Any layout or spacing changes

## Tasks
1. Add `"topCyanBig": true` to the five key entries (`fn-t`, `fn-u`, `fn-v`, `fn-5e`, `fn-6e`) in `hp48Keys.json`.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
