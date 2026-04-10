# Pluggable Key Functions and Shift States

## What & Why
Replace the current binary `isShifted` flag and inline `resolveKeyAction` calls with a proper 4-state shift system. There are four shift states — `unshifted`, `shiftedMagenta`, `shiftedCyan`, and `shiftedBottom` — and each key gets four corresponding named function slots. `fnKey` is a derived property: it resolves to whichever slot is active for the current shift state, making call sites simple — they always invoke `fnKey` without knowing which shift is active. This is the architectural foundation for all shift functionality.

## Done looks like
- The calculator has a `shiftState` of type `"unshifted" | "shiftedMagenta" | "shiftedCyan" | "shiftedBottom"` in its global state, replacing the old `isShifted` boolean.
- Each key's function set has four named static slots plus one derived property:
  - `fnKeyUnshifted` — the function for the default/unshifted state (primary op).
  - `fnKeyMagenta` — the function when `shiftedMagenta` is active.
  - `fnKeyCyan` — the function when `shiftedCyan` is active.
  - `fnKeyBottom` — the function when `shiftedBottom` is active.
  - `fnKey` — derived: resolves to the slot matching the current `shiftState`. All four slots default to a no-op if no meaningful action exists.
- A `buildKeyFunctionRegistry` utility wires up the static slots from the key data JSON and dispatch, and returns entries with a `resolvefnKey(shiftState)` helper (or the registry is re-resolved whenever `shiftState` changes). Call sites always invoke `fnKey` — they never branch on shift state themselves.
- `fnKeyUnshifted` maps to the current primary operation via `resolveKeyAction`.
- `fnKeyBottom` dispatches `ALPHA_CHAR` for the bottom alpha label (no-op if the label is `\u200B` or absent).
- `fnKeyMagenta` / `fnKeyCyan` map to their respective shift operations (no-op if the key has no label for that shift color).
- `KeyGrid` uses `shiftState` to select the correct label to display on each key:
  - In `shiftedMagenta`: keys with a magenta label show that label in magenta; others unchanged.
  - In `shiftedCyan`: keys with a cyan label show that label in cyan; others unchanged.
  - In `shiftedBottom`: keys with a non-empty, non-`\u200B` bottom label show that label; others unchanged.
  - In `unshifted`: all keys show their default label.
- Pressing a shift key while already in that shift state clears back to `unshifted`. Pressing a different shift key transitions directly to that shift without going through `unshifted`.
- The new `ALPHA_CHAR` action is handled in the reducer (appends the character to the current input entry).
- The old `isShifted` boolean is removed from state and all call sites.
- Existing primary key operations continue to work identically.

## Out of scope
- Wiring magenta/cyan operations to real calculator operations in the key data (the slots exist and dispatch correctly, but full shift operation coverage in the JSON is a separate task).
- Any visual redesign of the shift keys themselves.
- Keyboard shortcut mapping.

## Tasks
1. **Update shift state in `CalcState`** — Replace `isShifted: boolean` with `shiftState: "unshifted" | "shiftedMagenta" | "shiftedCyan" | "shiftedBottom"`. Update the `SHIFT` action to accept a target shift state, implementing toggle-to-clear (pressing the active shift clears it) and direct-switch (pressing a different shift transitions immediately) behavior. Add `ALPHA_CHAR` action for bottom-label character insertion.

2. **Define `KeyFunctions` type and registry** — Create `src/logic/input/keyFunctions.ts` with a `KeyFunctions` interface containing `fnKeyUnshifted`, `fnKeyMagenta`, `fnKeyCyan`, `fnKeyBottom` (all `() => void`) and a `resolveKeyFn(shiftState)` helper that returns the appropriate slot as `fnKey`. Export a `noOp` constant and a `KeyFunctionRegistry` type (`Record<string, KeyFunctions>`).

3. **Build `buildKeyFunctionRegistry`** — Create `src/logic/input/buildKeyFunctionRegistry.ts`. For each key from the JSON sections, wire `fnKeyUnshifted` to the primary op via `resolveKeyAction`; `fnKeyMagenta`/`fnKeyCyan` to their shift ops (no-op if absent); `fnKeyBottom` to `ALPHA_CHAR` dispatch unless the label is `\u200B` or empty.

4. **Update `KeyGrid` for shift-aware rendering and dispatch** — Remove the `isShifted` prop; accept `shiftState` instead. For each key, resolve `fnKey` via `resolveKeyFn(shiftState)` and pass it as the `onClick`. Update the displayed label for each key based on `shiftState`: if the key has the matching shifted label, render it in the shift color; otherwise render the default label unchanged.

5. **Update `calculatorReducer`** — Handle the updated `SHIFT` action with toggle-and-direct-switch logic. Handle `ALPHA_CHAR` by appending the character to the entry.

6. **Clean up call sites** — Remove all references to `isShifted` throughout the app (state initialization, `App.tsx`, any other consumers) and replace with `shiftState`.

## Relevant files
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
- `artifacts/rpn-calc/src/ui/components/KeyButton.tsx`
- `artifacts/rpn-calc/src/logic/input/resolveKeyAction.ts`
- `artifacts/rpn-calc/src/state/calculatorState.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
- `artifacts/rpn-calc/src/data/hp48Keys.json`
