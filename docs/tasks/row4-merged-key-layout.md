# Row 4 Wide Key + Y/Z Layout

## What & Why
Rework the `top-fn-3` row (Row 4) of the function key section so the first two key positions are merged into a single wide key, and the alpha letters are assigned only to keys at positions 3 and 4 (Y and Z). The last two keys have no alpha letter. This matches the intended HP-48 style layout for this row.

## Done looks like
- Row 4 shows 5 visual keys across 6 columns: one double-width key on the left, then four normal-width keys.
- The wide key has no alpha letter label.
- The third key (2nd normal key) has alpha letter **Y**.
- The fourth key (3rd normal key) has alpha letter **Z**.
- The fifth and sixth keys (last two normal keys) have no alpha letter label.
- All other rows are unaffected.

## Out of scope
- Changing the operations or shift labels on any of the keys.
- Changes to any other row.

## Tasks
1. **Update key data** — In `top-fn-3`, consolidate the first two keys into one key definition with `colSpan: 2` and no alpha association. The row should have 5 key entries total.
2. **Update renderer** — In `KeyGrid.tsx`, add a `ROW4_ALPHA` mapping with 5 entries `["", "Y", "Z", "", ""]` (empty string means no label). Separate `rowIdx === 3` into its own rendering branch that applies `colSpan` styling to the first key and uses `ROW4_ALPHA[idx]` for alpha labels.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:58-68`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx:13-19,81-119`
