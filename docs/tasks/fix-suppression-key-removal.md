# Fix suppression: never remove keys

## What & Why
The current build-time suppression codegen removes entire key buttons from the layout when a suppression flag is active (`noGraphics`, `noProgramming`, `noMatrix`). The calculator's physical key layout must never change — suppression should only strip the function labels printed on a key and replace the associated op codes with `OP_NONE`. The key button itself always stays in place.

## Done looks like
- Every key button is always rendered regardless of which suppression flags are active; no key disappears from the grid.
- When a suppression flag is active, shift-label text for suppressed functions (cyan, magenta, top labels) is absent from the key face, but the key cap remains.
- Pressing a key whose function is suppressed still dispatches `OP_NONE` (no change to the action-table logic).
- The overall calculator grid shape, dimensions, and row/column counts are identical whether suppression flags are on or off.
- Re-running codegen with flags toggled off restores all labels; toggling them on strips labels again — the key count never changes either way.

## Out of scope
- Changing which functions are in each suppression set.
- Adding any new suppression flags (that is Task #61).
- Altering the runtime reducer logic for suppressed ops.

## Tasks
1. **Audit codegen filter logic** — Identify every code path in `codegen-key-action-table.mjs` that removes a key object, row, or section entirely from the layout output (e.g., `filterKeyForLayout`, section/row `suppressedBy` checks). Document what currently gets fully deleted vs. what only has labels stripped.
2. **Change layout filtering to label-only stripping** — Rewrite the codegen so that no key, row, or section is ever omitted from `keyLayoutData.ts`. Instead, only the suppressed shift-label fields (`topCyan`, `topCyanMerged`, `topMagenta`, `topMagentaMerged`, `topMerged`, `cyanOp`, and equivalents) are removed from a key object when its associated suppression flag is active.
3. **Update hp48Keys.json tagging if needed** — If any keys currently carry a top-level `suppressedBy` that caused full removal, retag them so only their label fields are suppressed rather than the whole entry.
4. **Run codegen and verify** — Execute `pnpm codegen`, confirm the generated `keyLayoutData.ts` contains the same number of key entries with and without each suppression flag, and confirm the calculator renders with no missing buttons.

## Relevant files
- `artifacts/rpn-calc/scripts/codegen-key-action-table.mjs`
- `artifacts/rpn-calc/scripts/suppressionConfig.json`
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/generated/keyLayoutData.ts`
- `artifacts/rpn-calc/src/generated/keyActionTable.ts`
