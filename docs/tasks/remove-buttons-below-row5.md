# Remove all buttons below row 5

## What & Why
Remove the navcluster, numpad, and lower sections from the keyboard layout entirely. The space below row 5 will be repurposed later, so no placeholder or empty section should remain — just nothing rendered there.

## Done looks like
- The calculator shows only the softkeys row and the four top-fn function rows (rows 1–5)
- No navigation arrows, no digit pad, no arithmetic operators, no DEL/LS/RS keys appear below row 5
- The area below row 5 is empty visual space within the calculator body

## Out of scope
- Any new content for the vacated space (future task)
- Changes to the softkeys row or top-fn rows 1–4

## Tasks
1. Remove the `navcluster`, `numpad`, and `lower` sections from `hp48Keys.json`.
2. Remove the rendering branches and any CSS that exclusively style those three sections from `KeyGrid.tsx` and `calculator.css`.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
- `artifacts/rpn-calc/src/styles/calculator.css`
