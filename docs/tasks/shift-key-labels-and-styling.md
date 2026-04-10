# Shift Key Labels and Visual States

## What & Why
Three keys act as shift keys — Alpha (row 5 key 0), Magenta (row 6 key 0), and Cyan (row 7 key 0). Currently they all show placeholder labels and have no distinct styling. This task gives them proper labels, visual appearance, and active-state brightening.

## Done looks like
- Row 5 key 0 (Alpha shift): main label is "α". When alpha-shifted, the key brightens; when shift ends, it returns to normal.
- Row 6 key 0 (Magenta shift): the top portion of the key button itself is a solid magenta background (no separate text label in the zone above the key). The key body shows "↰". When magenta-shifted, the key brightens; when shift ends, it returns to normal.
- Row 7 key 0 (Cyan shift): the top portion of the key button itself is a solid cyan background (no separate text label in the zone above the key). The key body shows "↱". When cyan-shifted, the key brightens; when shift ends, it returns to normal.
- No placeholder "magenta" / "cyan" text strings appear as top labels on these three keys.

## Out of scope
- Alpha, magenta, or cyan shift behavior on any other keys.
- Adding shift functions/actions to any key.

## Tasks
1. **Update labels** — Change `key-r5-0` to "α", `key-r6-0` to "↰", and `key-r7-0` to "↱" in the labels config files.

2. **Strip placeholder top labels from shift keys** — In `hp48Keys.json`, remove the `topMagenta` and `topCyan` placeholder strings from `fn-5a`, `fn-6a`, and `fn-7a`. For `fn-6a` and `fn-7a`, add a marker field (e.g. `"topColor": "magenta"` / `"topColor": "cyan"`) so the renderer knows to color the key top.

3. **Render colored key tops for magenta and cyan shift keys** — In `KeyGrid.tsx`, when rendering a three-zone row cell for a key that has `topColor`, suppress the normal top-label zone and instead pass the color info through so the key button can render a split-colored top. Thread the `topColor` value to `KeyButton` as a new optional prop.

4. **Style the three shift key categories** — In `calculator.css`, add distinct rules for `key-shift-bottom` (alpha — keep existing teal or a neutral style), `key-shift-magenta` (magenta gradient top + dark body), and `key-shift-cyan` (cyan gradient top + dark body). Add brightened `key-active` variants for each so they visibly light up when their shift state is engaged.

## Relevant files
- `artifacts/rpn-calc/src/config/labels.json`
- `artifacts/rpn-calc/src/config/labels-text.json`
- `artifacts/rpn-calc/src/data/hp48Keys.json:80-109`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
- `artifacts/rpn-calc/src/ui/components/KeyButton.tsx`
- `artifacts/rpn-calc/src/logic/ui/buildKeyButtonViewModel.ts`
- `artifacts/rpn-calc/src/styles/calculator.css:460-493`
