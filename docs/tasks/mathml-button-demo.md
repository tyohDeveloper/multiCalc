# Add M–R Row with MathML Demo Button

## What & Why
The calculator currently has two visible function rows: row 1 (blank softkeys, A–F) and row 2 (G–L: MTH, PRG, CST, VAR, ▲, ON). A third row (M–R) needs to be added. Separately, the 6th button in row 2 is incorrectly labeled ON when it should be NXT. This task adds the M–R row to the layout and places a temporary MathML nth-root demo button on one of its keys so the user can see how MathML renders in a calculator button.

## Done looks like
- A new 3rd function row (M–R) appears below the G–L row in the calculator UI.
- The 6th button in the G–L row (row 2) is labeled NXT, not ON.
- One button in the new M–R row displays a properly rendered MathML nth-root symbol (x-th root of y) using `<mroot><mi>x</mi><mi>y</mi></mroot>`.
- The MathML fits within the button label area at a size consistent with the other keys — no overflow or misalignment.
- All other buttons and functionality remain unchanged.

## Out of scope
- Wiring any M–R row buttons to real calculator operations.
- Keeping the MathML button permanently — this is a temporary visual demo.
- Changing any rows other than the G–L fix and the new M–R row.

## Tasks
1. **Fix row 2 label** — In `hp48Keys.json`, correct the 6th button of the `top-fn-1` row: change its `labelKey` from `"on-key"` (ON) to `"nxt"` (NXT).
2. **Add the M–R row** — Add a new row (`top-fn-2`) to the `top-fn` section in `hp48Keys.json` with 6 placeholder keys (IDs `tm` through `tr`). Update `KeyGrid.tsx` to render this row with alpha labels M through R, following the same pattern as the existing `ROW2_ALPHA` (G–L) row.
3. **Enable MathML rendering in KeyButton** — Extend the `KeyButton` component to detect MathML label keys and render them as real HTML (using `dangerouslySetInnerHTML`) rather than as an escaped text string.
4. **Add MathML label and assign to a button** — Add a new label key (e.g. `xroot-mathml`) whose value is the `<math>` MathML markup for the nth root, and assign it to one of the M–R row buttons (e.g. the first one, `tm`) so it renders the symbol visually.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
- `artifacts/rpn-calc/src/ui/components/KeyButton.tsx`
- `artifacts/rpn-calc/src/config/labels.json`
