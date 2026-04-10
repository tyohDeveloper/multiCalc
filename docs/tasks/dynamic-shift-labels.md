# Dynamic Shift Labels on Key Face

## What & Why
When shift state changes, the main body label printed on each key face should update its text to reflect the currently-active shift layer — color (magenta/cyan) having highest priority, then alpha, then unshifted. This is controlled by a single app-level feature flag constant so the behavior can be suppressed without removing the code.

## Done looks like
- A module-level boolean constant (e.g. `DYNAMIC_SHIFT_LABELS`) in the calculator config or a dedicated feature-flags file controls the feature. It defaults to `true` (enabled). Changing it to `false` reverts to the original static-label behavior with no other code changes needed.
- When the flag is `true`:
  - While a color shift (magenta or cyan) is active, only keys that have a defined label for that color layer change their main body text to that label. Keys with no function on the active color layer are left unchanged. Key background color and style are never affected — only the text changes.
  - While only alpha shift is active (no color shift), only keys that have an assigned alpha character show that character as the main body text. Keys without an alpha character are left unchanged.
  - When color shift is cleared, each key's main label reverts to its alpha label (if alpha is still active and the key has one) or its unshifted label (if alpha is not active or the key has no alpha character).
  - When alpha shift is cleared (with no color shift), labels revert to their unshifted text.
- When the flag is `false`, key labels behave exactly as they do today (static main label, only the surrounding auxiliary labels highlight).

## Out of scope
- Any user-facing UI control to toggle this flag.
- Changing key colors, backgrounds, or any style other than the main label text.
- Modifying the alpha/color shift activation logic itself.

## Tasks
1. **Add feature flag** — Create a feature-flags constant file (or add to an existing config file) with `DYNAMIC_SHIFT_LABELS = true`. This is the single switch for the feature.

2. **Compute effective label per key** — In `KeyGrid.tsx` (or a helper), write a function that takes a key definition and the current `ShiftState` and returns the appropriate display label string according to priority: color-shift label → alpha character → unshifted label. The function must be a no-op (returning the unshifted label always) when `DYNAMIC_SHIFT_LABELS` is false.

3. **Wire into KeyButton rendering** — Pass the effective label from step 2 into `KeyButton` as an override prop. When the override is present, render it in place of the static `labelKey` text. The key's visual style, color, and all auxiliary labels (above/below cells) remain unchanged.

4. **Verify priority and revert behavior** — Confirm through code review and manual inspection that: (a) activating a color shift replaces labels with color-layer text, (b) deactivating color shift while alpha is active shows alpha characters, (c) deactivating alpha shows unshifted labels, and (d) setting the flag to `false` produces no label change at all.

## Relevant files
- `artifacts/rpn-calc/src/state/calculatorState.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
- `artifacts/rpn-calc/src/ui/components/KeyButton.tsx`
- `artifacts/rpn-calc/src/generated/keyActionTable.ts`
- `artifacts/rpn-calc/src/data/hp48Keys.json`
