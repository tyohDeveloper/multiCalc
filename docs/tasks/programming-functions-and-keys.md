# Programming Functions and Keys

## What & Why
Register all HP-48 GX programming functions as typed op codes and implement their stack/state logic (or stubs for control-flow words). Add the corresponding programming-mode keys. Wire every new op code into the `noProgramming` suppression set so the entire programming surface disappears at compile time when that flag is enabled.

## Done looks like
- All listed programming functions have named op codes (`ProgOpCode` union type) in `opCodes.ts`.
- Every programming op code is listed in `PROGRAMMING_OPS` so `opSuppressedBy` returns `"noProgramming"` for it.
- A new `progRegistry.ts` maps each op code to a concrete state transformation (or a no-op stub for control-flow words like IF/THEN/ELSE/END that require the future program-runner).
- Missing stack ops (`DUP`, `OVER`, `ROT`, `PICK`, `ROLL`, `ROLLD`) are implemented in `logic/stack/` and added to `stackRegistry.ts`. These are tagged as programming ops per the spec.
- `hp48Keys.json` references the new op codes for the following keys: `PRG`, `CST`, `NXT`, `PREV`, `UPDIR`, `HOME`, `USER`, `VAR`, `MENU`, `EVAL`, `EDIT`, `ON` — each with its `suppressedBy: "noProgramming"` property.
- Codegen is re-run; `keyActionTable.ts` and `keyLayoutData.ts` rebuild cleanly.
- With `NO_PROGRAMMING = true` (current default), none of the new keys or functions are reachable; with `NO_PROGRAMMING = false`, pressing a programming key dispatches the correct action.

## Out of scope
- A working program editor or RPL interpreter — control-flow words (IF, THEN, ELSE, END, CASE, FOR, NEXT, START, STEP, DO, UNTIL, WHILE, REPEAT, IFERR) get stub implementations that do nothing until the program runner is built.
- I/O dialogs for INPUT, MSGBOX, CHOOSE — stubs only.
- ASM (assembly language) — stub only.
- Graphics suppression changes (handled in a prior task).

## Tasks

1. **Expand `opCodes.ts`** — Add a `ProgOpCode` union covering all new programming op codes: `PROG_OPEN` (<<), `PROG_CLOSE` (>>), `STO_ARROW` (→), `TO_LIST`, `TO_ARRY`, `TO_STR`, `TO_Q`, `IF`, `THEN`, `ELSE`, `END_IF`, `CASE`, `END_CASE`, `FOR`, `NEXT_LOOP`, `START_LOOP`, `STEP_LOOP`, `DO`, `UNTIL`, `WHILE`, `REPEAT`, `IFERR`, `IFT`, `IFTE`, `GET`, `PUT`, `GETI`, `PUTI`, `HEAD`, `TAIL`, `DUP`, `OVER`, `ROT`, `PICK`, `ROLL`, `ROLLD`, `EXPORT`, `INPUT_CMD`, `MSGBOX`, `MENU_CMD`, `CST_CMD`, `VAR_CMD`, `EVAL_CMD`, `EDIT_CMD`, `ASM`, `CHOOSE`, `PURGE`, `CRDIR`, `RCLF`, `STOF`, `SF`, `CF`, `UPDIR_CMD`, `HOME_CMD`, `USER_MODE`, `NXT_CMD`, `PREV_CMD`. Add all of them to `EXEC_OPS_SET` and to `PROGRAMMING_OPS` so `opSuppressedBy` returns `"noProgramming"` for every one.

2. **Implement stack ops** — Add `logic/stack/applyDup.ts`, `applyOver.ts`, `applyRot.ts`, `applyPick.ts`, `applyRoll.ts`, `applyRollD.ts` following the pattern of the existing `applyDrop.ts`/`applySwap.ts`. Update `stackRegistry.ts` to include `DUP`, `OVER`, `ROT`, `PICK`, `ROLL`, `ROLLD`.

3. **Create `progRegistry.ts`** — Map every `ProgOpCode` to a state transformation function. Control-flow words and I/O commands return state unchanged (stub). Conversion ops (`TO_LIST`, `TO_ARRY`, `TO_STR`, `TO_Q`) operate on the top stack value and push a tagged result object. `IFT`/`IFTE` pop their condition and branch stubs. `GET`/`PUT`/`GETI`/`PUTI`/`HEAD`/`TAIL` pop arguments from the stack and push stub results. `PURGE`/`CRDIR`/`SF`/`CF`/`STOF`/`RCLF` operate on calculator modes/registers.

4. **Wire `progRegistry` into `opRegistry.ts`** — Merge `progRegistry` into the combined export alongside `mathRegistry`, `trigRegistry`, `stackRegistry`, and `inputRegistry`.

5. **Update `hp48Keys.json`** — For each of the programming keys listed below, update or add the key entry with the correct `op`, `labelKey`, and `"suppressedBy": "noProgramming"` property:
   - `PRG` → `OP_PRG` (already exists; add `suppressedBy`)
   - `CST` → `CST_CMD`
   - `NXT` → `NXT_CMD`
   - `PREV` → `PREV_CMD`
   - `UPDIR` → `UPDIR_CMD`
   - `HOME` → `HOME_CMD`
   - `USER` → `USER_MODE`
   - `VAR` → `VAR_CMD`
   - `MENU` → `MENU_CMD`
   - `EVAL` → `EVAL_CMD` (already exists as `OP_EVAL`; remap and add `suppressedBy`)
   - `EDIT` → `EDIT_CMD`
   - `ON` — keep as-is (ON is a power/cancel key, not a programming function)

6. **Re-run codegen** — Execute `scripts/codegen-key-action-table.mjs` to regenerate `keyActionTable.ts` and `keyLayoutData.ts` from the updated JSON.

## Relevant files
- `artifacts/rpn-calc/src/state/opCodes.ts`
- `artifacts/rpn-calc/src/state/suppressionFlags.ts`
- `artifacts/rpn-calc/src/state/opRegistry.ts`
- `artifacts/rpn-calc/src/state/stackRegistry.ts`
- `artifacts/rpn-calc/src/state/mathRegistry.ts`
- `artifacts/rpn-calc/src/state/inputRegistry.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
- `artifacts/rpn-calc/src/logic/stack/applyDrop.ts`
- `artifacts/rpn-calc/src/logic/stack/applySwap.ts`
- `artifacts/rpn-calc/src/logic/stack/applyRollUp.ts`
- `artifacts/rpn-calc/src/logic/stack/applyRollDown.ts`
- `artifacts/rpn-calc/src/logic/shared/applyUnaryOp.ts`
- `artifacts/rpn-calc/src/logic/shared/applyBinaryOp.ts`
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/generated/keyActionTable.ts`
- `artifacts/rpn-calc/src/generated/keyLayoutData.ts`
- `artifacts/rpn-calc/scripts/codegen-key-action-table.mjs`
