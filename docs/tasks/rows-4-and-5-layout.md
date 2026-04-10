# Keyboard Rows 4 and 5 Layout

## What & Why
Add two new rows below the existing S–X row in the `top-fn` section to continue building out the HP-48GX keyboard layout. Row 4 has a unique structure (wide merged key + selective alpha labels), and row 5 is a standard flat row with no alpha labels.

## Done looks like
- Row 4 (0-indexed from top, immediately below the S–X row) renders as 6-column grid with:
  - A single wide key occupying the first two column positions (`colSpan: 2`), no alpha letter in the corner
  - Two standard 3-zone keys in positions 3 and 4, labeled **Y** and **Z** in the bottom-right corner
  - Two standard 3-zone keys in positions 5 and 6, with no alpha letter
- Row 5 renders as 6 regular keys in a flat row, none of which have alpha letters
- All other rows are unaffected

## Out of scope
- Operations or labels for the new keys (placeholders acceptable for now)
- Any rows below row 5
- Changes to navcluster, numpad, or lower sections

## Tasks
1. **Add row 4 key data** — Add a new `top-fn-4` row to `hp48Keys.json` with 5 key entries: the first key has `colSpan: 2` and no alpha marker, keys 2 and 3 are tagged for Y and Z alpha labels, and keys 4 and 5 have no alpha marker. Use placeholder ops and labels.

2. **Add row 5 key data** — Add a new `top-fn-5` row to `hp48Keys.json` with 6 standard key entries and no alpha markers. Use placeholder ops and labels.

3. **Update KeyGrid rendering for row 4** — In the `top-fn` branch of `KeyGrid.tsx`, handle `rowIdx === 4` as a special 3-zone-style row: render the first key with `gridColumn: span 2` and no alpha, render keys at index 1 and 2 with alpha Y/Z, and render keys at index 3 and 4 with no alpha.

4. **Update KeyGrid rendering for row 5** — Handle `rowIdx === 5` in `KeyGrid.tsx` as a flat row (no alpha labels, no shift-label area above), similar to the fallback renderer but within the `top-fn` branch.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
