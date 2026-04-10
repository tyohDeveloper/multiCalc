# Big-font top label style variants

## What & Why
Add optional "big font" style variants for the top-left magenta and top-right cyan labels on calculator keys. Some labels benefit from larger text (10pt vs the default 7pt) for readability, but the change must be opt-in per key rather than applied globally.

## Done looks like
- A `--big` modifier class exists for both `.key-label-magenta` and `.key-label-cyan` that sets font-size to 10pt
- Individual keys can opt in by adding `"topMagentaBig": true` or `"topCyanBig": true` in the key data JSON
- Keys without the flag are visually unchanged
- Row 3, key 0 (SIN / id `fn-m`) has `"topCyanBig": true` applied, making its cyan top-right label ("HOME") render at 10pt

## Out of scope
- Changing the default font size for all labels
- Adding big-font variants for merged or alpha labels

## Tasks
1. **Add CSS modifier classes** — Add `.key-label-magenta--big` and `.key-label-cyan--big` rules to `calculator.css`, each overriding `font-size` to `10pt`.
2. **Extend key data schema** — Add optional boolean fields `topMagentaBig` and `topCyanBig` to the key data TypeScript type (if one exists) so the JSON can carry these flags per key.
3. **Wire up the renderer** — Update `resolveTopLabel` in `KeyGrid.tsx` to accept `topMagentaBig` and `topCyanBig` parameters and append the `--big` modifier class to the appropriate `<span>` when the flag is true.
4. **Apply to SIN key** — Set `"topCyanBig": true` on the `fn-m` key entry (row 3, key 0, SIN) in `hp48Keys.json`.

## Relevant files
- `artifacts/rpn-calc/src/styles/calculator.css:408-426`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx:47-63`
- `artifacts/rpn-calc/src/data/hp48Keys.json`
