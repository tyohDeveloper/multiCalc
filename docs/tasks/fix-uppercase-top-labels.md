# Remove all text-transform uppercase

## What & Why
Three CSS classes in `calculator.css` use `text-transform: uppercase`, forcing all label text to uppercase regardless of source data. This breaks intentionally lowercase characters (e.g. the `x` in `x²` and the `y` in `ˣ√y`). Since all labels that should appear uppercase are already written as uppercase strings in the data, this rule is unnecessary everywhere in the app.

## Done looks like
- Row 3 key 3 magenta label shows `x²` (lowercase x)
- Row 3 key 3 cyan label shows `ˣ√y` (lowercase y)
- All other labels remain visually unchanged (they are already uppercase in the source data)
- No `text-transform: uppercase` rule exists anywhere in the stylesheet

## Out of scope
- Changing label text strings other than correcting `X²` → `x²` in the key data

## Tasks
1. **Remove all `text-transform: uppercase` declarations** from `calculator.css` — affects `.key-label-magenta`, `.key-label-cyan`, and `.key-label-alpha`.
2. **Fix the data**: change `topMagenta` for key `fn-v` (row `top-fn-3`, key index 3) from `"X²"` to `"x²"` so the magenta label explicitly uses a lowercase x.

## Relevant files
- `artifacts/rpn-calc/src/styles/calculator.css:408-446`
- `artifacts/rpn-calc/src/data/hp48Keys.json:57`
