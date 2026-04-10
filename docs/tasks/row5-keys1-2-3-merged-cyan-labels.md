# Row 5 Keys 1–3 Merged Cyan Labels

## What & Why
Replace the placeholder split top labels on row 5 keys #1, #2, and #3 with a single centered label rendered in cyan, matching the `topMagentaMerged` pattern already used in row 4 but for the cyan color.

## Done looks like
- Row 5, key #1 (digit-7) shows a single centered cyan label "SOLVE" above the key
- Row 5, key #2 (digit-8) shows a single centered cyan label "PLOT" above the key
- Row 5, key #3 (digit-9) shows a single centered cyan label "SYMBOLIC" above the key
- The existing placeholder `topMagenta`/`topCyan` split fields on these keys are removed
- All other keys in row 5 and the rest of the keyboard are unchanged

## Out of scope
- Key #0 or key #4 in row 5
- Any other rows
- Any functional/op changes

## Tasks
1. In `hp48Keys.json`, replace the placeholder `topMagenta`/`topCyan` fields on `fn-5b`, `fn-5c`, and `fn-5d` with `topCyanMerged` fields set to "SOLVE", "PLOT", and "SYMBOLIC" respectively.
2. In the key cell component and/or CSS, support `topCyanMerged` rendering — a single centered label styled in cyan (`#22bbcc`), following the same pattern used for `topMagentaMerged`.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:73-81`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
- `artifacts/rpn-calc/src/styles/calculator.css`
