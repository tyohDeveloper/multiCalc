---
title: Add keyboard rows 6, 7, and 8
---
# Add keyboard rows 6, 7, and 8

## What & Why
Add three more rows below row 5 to continue building out the keyboard. All three are standard flat rows with 6 keys each and no alpha labels.

## Done looks like
- Rows 6, 7, and 8 appear below row 5, each rendering 6 equal-width keys
- None of the keys in these rows have alpha letters or shift-label areas above them
- All other rows are unaffected

## Out of scope
- Specific operations or labels (placeholders are fine)
- Any rows beyond row 8
- Changes to any existing rows

## Tasks
1. **Add key data** — Add three new rows (`top-fn-6`, `top-fn-7`, `top-fn-8`) to the `top-fn` section in `hp48Keys.json`, each with 6 placeholder key entries.
2. **Update KeyGrid rendering** — Handle `rowIdx === 6`, `7`, and `8` in the `top-fn` branch of `KeyGrid.tsx` as flat rows: 6 keys, no alpha labels, no shift-label area above.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`