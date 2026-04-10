# Remove Dedicated Shift Keys

## What & Why
The calculator currently has a dedicated `top-fn-shift` row with three explicit shift buttons (magenta, cyan, alpha). These were added for testing purposes. The intent is to remove this row and instead assign the shift-toggle behavior to appropriate existing keys in the main layout — matching how physical HP calculators work, where one key doubles as the shift activator.

## Done looks like
- The `top-fn-shift` row (shift-magenta, shift-cyan, shift-bottom buttons) is gone from the UI.
- Two or three existing keys (e.g., in the function or numeric rows) are designated as the shift activators, replacing the removed buttons.
- Shift state (magenta, cyan, alpha) still toggles and unlocks correctly via those existing keys.
- No visual or functional regression on any other key behavior.

## Out of scope
- Redesigning which keys get which shift labels (that is existing layout work).
- Adding new shift states beyond the current three.

## Tasks
1. **Identify host keys** — Decide which existing keys will carry each shift function (magenta, cyan, alpha). Update their definitions in the key data to include the shift op alongside any existing primary op.
2. **Remove the shift row** — Delete the `top-fn-shift` row entry from the key data and remove the corresponding rendering logic in KeyGrid that renders and highlights those three buttons.
3. **Verify shift still works** — Confirm that toggling through all three shift states via the new host keys functions correctly, and that shift auto-resets after an operation as before.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
- `artifacts/rpn-calc/src/logic/input/resolveKeyAction.ts`
- `artifacts/rpn-calc/src/logic/input/buildKeyFunctionRegistry.ts`
- `artifacts/rpn-calc/src/state/calculatorState.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
