# Calculator Suppression Flags

## What & Why
Add three boolean flags to the calculator state — `noGraphics`, `noProgramming`, and `noMatrix` — that default to `true`. When a flag is `true`, all operations belonging to that category are suppressed: they become no-ops in the reducer and are visually disabled in the key UI.

## Done looks like
- `CalcState` has `noGraphics`, `noProgramming`, and `noMatrix` boolean fields, each defaulting to `true`
- A category lookup maps each `KeyOpCode` to one of the three suppression groups (or none)
- The reducer's `OP` case returns state unchanged (no-op) when the dispatched op belongs to a suppressed category
- Key buttons whose op (or shift-op) is suppressed render with a `key-suppressed` CSS class and are non-interactive
- The suppressed styling is visually distinct (e.g. dimmed/muted) from active keys

## Out of scope
- UI controls for toggling these flags at runtime (flags are state-only for now)
- Defining actual implementations for graphics, programming, or matrix ops

## Tasks

1. **Add flags to CalcState** — Add `noGraphics: boolean`, `noProgramming: boolean`, and `noMatrix: boolean` to the `CalcState` interface and set all three to `true` in `initialState`.

2. **Define op category mapping** — Create a utility (e.g. `opSuppressedBy`) that maps each `KeyOpCode` to the flag it belongs to. Programming category: `OP_PRG`, `OP_EVAL`. Matrix category: `OP_MTRX`. Graphics category: `OP_SYMB`, `OP_SOLV`, `SIGMA_PLUS`.

3. **Suppress ops in the reducer** — In the `OP` case of `calculatorReducer`, before executing or passing through an op, check `opSuppressedBy` against the current state flags. If suppressed, return state unchanged.

4. **Suppress keys in the UI** — Pass the three flags into `buildKeyButtonViewModel` (or the key grid layer) so that any key whose primary op or shift-op is suppressed receives a `key-suppressed` class and cannot be activated.

5. **Style suppressed keys** — Add a `.key-suppressed` CSS rule that visually dims the key (reduced opacity, no hover effect, `pointer-events: none`).

## Relevant files
- `artifacts/rpn-calc/src/state/calculatorState.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
- `artifacts/rpn-calc/src/state/opCodes.ts`
- `artifacts/rpn-calc/src/logic/ui/buildKeyButtonViewModel.ts`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
- `artifacts/rpn-calc/src/ui/components/KeyButton.tsx`
- `artifacts/rpn-calc/src/styles/calculator.css`
- `artifacts/rpn-calc/src/data/hp48Keys.json`
