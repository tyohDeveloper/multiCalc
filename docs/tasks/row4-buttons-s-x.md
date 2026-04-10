# Add Button Row 4 (S–X)

## What & Why
Add a fourth function row to the `top-fn` section of the keyboard with 6 buttons carrying alpha labels S, T, U, V, W, X. This continues the established pattern from rows 2 (G–L) and 3 (M–R).

## Done looks like
- A new row appears below the M–R row on the calculator
- Each button uses the same `key-cell-3zone` visual structure (top shift labels, main button, alpha label below)
- The six cells show alpha labels S, T, U, V, W, X below their respective buttons

## Out of scope
- Changing any existing rows or their labels
- Wiring up new operations beyond placeholder/reasonable HP-48-style assignments

## Tasks
1. **Add row data** — Add a `top-fn-3` row with 6 key entries (ids `fn-s` through `fn-x`, alpha labels S–X, appropriate `op`/`shiftOp` values following the same pattern as rows 2–3) to the `top-fn` section in `hp48Keys.json`.
2. **Update KeyGrid renderer** — Add `ROW4_ALPHA = ["S","T","U","V","W","X"]` constant and extend the `rowIdx === 1 || rowIdx === 2` branch condition to also handle `rowIdx === 3`, selecting `ROW4_ALPHA` for that index.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx:15-16,88-119`
