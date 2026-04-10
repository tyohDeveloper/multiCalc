# Add Button Row 4 (S–X) and Fix Row Numbering

## What & Why
Add a fourth function row (S–X) to the keyboard, and fix the alpha row constant names in KeyGrid so that `ROW#_ALPHA` always matches the corresponding `top-fn-#` index. Currently `ROW2_ALPHA` maps to `top-fn-1` and `ROW3_ALPHA` maps to `top-fn-2`, which is confusing. All row numbers should agree, starting from zero.

## Done looks like
- A new S–X row appears below the M–R row on the calculator, using the same `key-cell-3zone` style
- The alpha labels S, T, U, V, W, X appear beneath the six buttons
- In the code, `ROW1_ALPHA` maps to `top-fn-1`, `ROW2_ALPHA` to `top-fn-2`, `ROW3_ALPHA` to `top-fn-3`

## Out of scope
- Changing any button operations or visual styling
- Renumbering the `top-fn-#` IDs in the JSON data file

## Tasks
1. **Add row data** — Add a `top-fn-3` row with 6 key entries (ids `fn-s` through `fn-x`, appropriate `op`/`shiftOp` values following the same pattern as rows `top-fn-1` and `top-fn-2`) to the `top-fn` section in `hp48Keys.json`.
2. **Fix row constant naming and add new row** — In KeyGrid.tsx, rename `ROW2_ALPHA` → `ROW1_ALPHA` and `ROW3_ALPHA` → `ROW2_ALPHA`. Add `ROW3_ALPHA = ["S","T","U","V","W","X"]`. Update all references and the `rowIdx` branch to handle indices 1, 2, and 3, selecting the matching constant by index.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx:15-16,88-119`
