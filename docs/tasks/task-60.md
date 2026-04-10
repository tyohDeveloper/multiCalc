---
title: Matrix functions and keys
---
# Matrix Functions and Keys

## What & Why
Add HP-48 GX matrix functions and their keyboard entries to the canonical data and app. With the build-time suppression pipeline clean, matrix support can be added to the JSON and implemented in the reducer — and will simply be absent from the built app until the `noMatrix` flag is cleared.

## Done looks like
- Matrix function op codes are defined and handled in the reducer (real implementations where straightforward, stubs for complex decompositions like SVD/eigenvalues)
- Matrix keys are present in `hp48Keys.json` with `suppressedBy: "noMatrix"` markers
- When `noMatrix` is active, the built app contains no matrix labels, no matrix entries in the action table, and no matrix symbols in the TypeScript bundle
- When `noMatrix` is cleared, matrix keys and functions work correctly

## Out of scope
- A full MatrixWriter modal UI (can be a follow-on task)
- Complex decompositions (SVD, eigenvalue) beyond stubs
- Runtime toggling of matrix visibility

## Tasks
1. **Add matrix op codes and reducer handlers** — Define matrix operation codes and implement their stack logic in the reducer. Simple operations (transpose, determinant, scalar multiply) get real implementations; complex ones get typed stubs.
2. **Add matrix keys to canonical JSON** — Add matrix-related key entries to `hp48Keys.json` with appropriate `suppressedBy: "noMatrix"` markers so the filter step handles them automatically.
3. **Verify suppressed and unsuppressed builds** — Run codegen with `noMatrix` on and confirm matrix items are absent from generated files; flip the flag and confirm they appear correctly.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/state/opCodes.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
- `artifacts/rpn-calc/scripts/codegen-key-action-table.mjs`