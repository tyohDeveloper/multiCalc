# Matrix Functions and Keys

## What & Why
Register all HP-48 GX matrix functions as typed op codes, implement their stack/state logic (real implementations where straightforward, stubs for complex decompositions), add the MatrixWriter modal editor, and add the corresponding matrix keys. Wire every new op code into the `noMatrix` suppression set so the entire matrix surface is stripped at compile time when that flag is enabled.

## Done looks like
- A `Matrix` data type (2D array + row/column counts) is added to the calculator state type system alongside `Complex`.
- All listed matrix functions have named op codes (`MatrixOpCode` union type) in `opCodes.ts` and are members of `MATRIX_OPS` so `opSuppressedBy` returns `"noMatrix"` for every one.
- A `matrixRegistry.ts` maps each op code to a state transformation. Core linear-algebra ops (ADD, SUB, MUL, TRN/TRAN, DET, TRACE, IDN, INV, SIZE, DIM, DOT, CROSS, CON, RDM, RANM, →V2, →V3, →MAT, →LIST, →ARRY, ROW+, ROW−, COL+, COL−, PUT, GET, PUTI, GETI) have real implementations. Complex decompositions (RREF, EIGEN, CHOLESKY, LU, QR, SOLVE, SYS) are stubs that leave the stack unchanged.
- MatrixWriter is a modal matrix entry component that lets the user set dimensions and fill cells row-by-row, then push the resulting `Matrix` onto the stack when confirmed. It is hidden/removed when `noMatrix` is enabled.
- EDITMAT opens MatrixWriter pre-populated with the top-of-stack matrix for editing.
- `hp48Keys.json` is updated: `MTH` key's shifted op opens the MATR catalog; the `MATR\` softkey group exposes ADD, SUB, MUL, TRN, DET, IDN, RANM, TRACE, EDITMAT as softkeys (all with `suppressedBy: "noMatrix"`); a dedicated MatrixWriter key triggers the modal; NXT/PREV page through the MATR menu; arrow keys navigate inside the MatrixWriter.
- Codegen is re-run; `keyActionTable.ts` and `keyLayoutData.ts` rebuild cleanly.
- With `NO_MATRIX = true` (current default), none of the new keys, functions, or MatrixWriter UI are reachable.
- With `NO_MATRIX = false`, pressing a matrix key dispatches the correct action and the stack displays matrix values in `[[ … ]]` notation.

## Out of scope
- Graphical matrix display beyond plain-text `[[ … ]]` stack representation.
- Working implementations of EIGEN, CHOLESKY, LU, QR — these are stubs.
- The "Solve Linear System" menu UI beyond a stub op code that pops arguments from the stack.
- Integration with the programming runner for PROG_OPEN/PROG_CLOSE wrapping matrix literals.

## Tasks

1. **Add `Matrix` type to state** — Define a `Matrix` interface (2D number array + `rows`/`cols`) in a new `matrixType.ts`. Extend `StackValue` in `calculatorState.ts` to be `Complex | Matrix`. Update `StackDisplay` to render matrices in `[[ row ; row ]]` notation when the top value is a `Matrix`.

2. **Expand `opCodes.ts` with `MatrixOpCode`** — Add a `MatrixOpCode` union covering: `MATR_ADD`, `MATR_SUB`, `MATR_MUL`, `MATR_TRN`, `MATR_INV`, `MATR_DET`, `MATR_IDN`, `MATR_RREF`, `MATR_TRACE`, `MATR_EIGEN`, `MATR_CHOLESKY`, `MATR_LU`, `MATR_QR`, `MATR_SOLVE`, `MATR_TO_V2`, `MATR_TO_V3`, `MATR_TO_MAT`, `MATR_TO_LIST`, `MATR_TO_ARRY`, `MATR_ROW_ADD`, `MATR_ROW_SUB`, `MATR_COL_ADD`, `MATR_COL_SUB`, `MATR_RDM`, `MATR_RANM`, `MATR_SIZE`, `MATR_DIM`, `MATR_PUT`, `MATR_GET`, `MATR_PUTI`, `MATR_GETI`, `MATR_CON`, `MATR_DOT`, `MATR_CROSS`, `MATR_SYS`, `MATR_EDITMAT`, `MATR_WRITER`, `MATR_LIN_SOLVE`. Add all to `MATRIX_OPS` and to `EXEC_OPS_SET`.

3. **Create `matrixRegistry.ts`** — Implement state transformations for every `MatrixOpCode`. Real ops: ADD/SUB/MUL (element-wise and matrix multiplication), TRN (transpose), DET (determinant), TRACE (sum of diagonal), IDN (identity matrix of given size), INV (matrix inverse via adjugate or Gauss-Jordan), SIZE/DIM (push dimensions), DOT/CROSS (vector ops), CON (constant matrix), RDM/RANM (random matrix), →V2/→V3 (matrix column → complex vector), →MAT/→LIST/→ARRY (type conversions), ROW+/ROW−/COL+/COL− (insert/delete row or column), PUT/GET/PUTI/GETI (element access). Stubs (return state unchanged): RREF, EIGEN, CHOLESKY, LU, QR, SOLVE, SYS, LIN_SOLVE. EDITMAT dispatches an action to open MatrixWriter pre-populated with TOS. MATR_WRITER opens an empty MatrixWriter.

4. **Wire `matrixRegistry` into `opRegistry.ts`** — Merge alongside `mathRegistry`, `trigRegistry`, `stackRegistry`, `inputRegistry`, and (when merged) `progRegistry`.

5. **Build MatrixWriter modal component** — Create `artifacts/rpn-calc/src/ui/components/MatrixWriter.tsx`. The modal shows a dimension selector (rows × cols) and a cell grid. Navigating cells with arrow keys, confirming with ENTER pushes the constructed `Matrix` onto the stack and closes the modal. Cancel (ON key) closes without pushing. Render `null` when `noMatrix` is in effect.

6. **Update `hp48Keys.json` for matrix keys** — Add/update keys with `suppressedBy: "noMatrix"`:
   - `MTH` key: add `shiftOp: "MATR_WRITER"` (or catalog trigger) in addition to existing.
   - `MATR\` softkey group: entries for ADD (`MATR_ADD`), SUB (`MATR_SUB`), MUL (`MATR_MUL`), TRN (`MATR_TRN`), DET (`MATR_DET`), IDN (`MATR_IDN`), RANM (`MATR_RANM`), TRACE (`MATR_TRACE`), NXT/PREV paging, EDIT (`MATR_EDITMAT`), MatrixWriter trigger (`MATR_WRITER`).
   - Arrow keys inside MatrixWriter are handled by internal component state (not the global key table).

7. **Re-run codegen** — Execute `scripts/codegen-key-action-table.mjs` to regenerate `keyActionTable.ts` and `keyLayoutData.ts`.

## Relevant files
- `artifacts/rpn-calc/src/state/opCodes.ts`
- `artifacts/rpn-calc/src/state/suppressionFlags.ts`
- `artifacts/rpn-calc/src/state/calculatorState.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
- `artifacts/rpn-calc/src/state/opRegistry.ts`
- `artifacts/rpn-calc/src/state/stackRegistry.ts`
- `artifacts/rpn-calc/src/state/mathRegistry.ts`
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/config/labels.json`
- `artifacts/rpn-calc/src/ui/components/StackDisplay.tsx`
- `artifacts/rpn-calc/src/generated/keyActionTable.ts`
- `artifacts/rpn-calc/src/generated/keyLayoutData.ts`
- `artifacts/rpn-calc/scripts/codegen-key-action-table.mjs`
