# Add Third Function Row (M–R)

## What & Why
Add a third row of 6 buttons to the `top-fn` section of the calculator, labeled M, N, O, P, Q, R. The label keys for M–R are already defined in `labels.json`; this row just needs to be wired into the data and rendered correctly.

## Done looks like
- A third row of 6 buttons appears beneath the G–L row (MTH, PRG, CST, VAR, ▲, NXT) on the calculator
- Each button cell shows the M–R alpha label at the bottom, matching the same 3-zone visual style as the G–L row (colored top labels, main button, alpha letter below)
- Buttons are clickable and dispatch their assigned operations

## Out of scope
- Changing existing rows or their operations
- Adding new operations beyond what fits the HP 48GX-inspired layout for this row

## Tasks
1. **Add row data** — Add a third row entry (`top-fn-2`) to the `top-fn` section in `hp48Keys.json` with 6 keys using `labelKey` values `key-m` through `key-r`. Assign appropriate HP 48GX-inspired primary ops and shift ops (e.g. trig/math functions, or similar function-row operations). Include `topMagenta`/`topCyan`/`topMerged` top-label fields on each key following the same pattern as the G–L row.
2. **Render the row** — In `KeyGrid.tsx`, add a `ROW3_ALPHA` constant `["M","N","O","P","Q","R"]` and a `rowIdx === 2` branch in the `top-fn` section renderer that produces the same 3-zone cell layout (colored top labels + button + alpha label) as the `rowIdx === 1` branch.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/config/labels.json:100-106`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx:13-16,79-145`
- `artifacts/rpn-calc/src/styles/calculator.css`
