# I/O and Library Suppression Flag

## What & Why
Add a `noIO` build-time suppression flag covering all HP-48 GX I/O and library functions, menu keys, and related keyboard entries. When the flag is enabled (the default), every I/O and library surface is stripped from the build identically to how `noGraphics`, `noProgramming`, and `noMatrix` already work.

## Done looks like
- `suppressionFlags.ts` (or its build-time equivalent after the #59 refactor) has a `NO_IO` constant defaulting to `true`.
- All I/O and library operations have named op code entries (an `IoOpCode` union type or equivalent) in `opCodes.ts` and are collected in an `IO_OPS` set.
- Every entry in `hp48Keys.json` that belongs to this category carries `"suppressedBy": "noIO"` so codegen strips it automatically.
- The keys and shift labels below are absent from the rendered calculator when `NO_IO` is `true`:
  - **Functions:** IO, IOPAR, RECV, SEND, SERVER, CLIENT, XMIT, SRECV, PR1, PR2, INFRARED, WIRE, \RESTORE, BACKUP, RESTORE PORT, FREE, MERGE, PORT0, PORT1, PORT2, LIBRARY, ATTACH, DETACH, LIBS, VERSION, MEM, NEWOB, PURGE, ARCHIVE, RESTORE (from port), EQNLIB, equation library menus.
  - **Keys / labels:** left-shift 1 (I/O), IOPAR menu key, SEND menu key, RECV menu key, IR menu key, BAUD menu key, TRANS menu key, VAR key (library variables), left-shift 2 (LIBRARY), LIBRARY menu key, ATTACH menu key, DETACH menu key, NXT, PREV, ON+1 (print screen shortcut), PR1 key sequence (print stack), PR2 key sequence (print graph).
- Toggling `NO_IO` to `false` and re-running codegen causes all I/O and library items to reappear without any other code changes.

## Out of scope
- Implementing actual I/O or library logic (all ops are stubs/placeholders).
- UI for managing library attachments or port contents.
- Equation library UI beyond the suppression stub.

## Tasks
1. **Add `NO_IO` flag** — Add the `NO_IO` boolean constant (default `true`) to the suppression flags source used by the codegen script, matching the exact pattern of the existing `NO_GRAPHICS`, `NO_PROGRAMMING`, `NO_MATRIX` constants.
2. **Register I/O op codes** — Add all listed I/O and library functions as named placeholder op codes in `opCodes.ts` (e.g., `IoOpCode` union), collected in an `IO_OPS` set, and guarded by the `NO_IO` flag in the reducer (no-op when suppressed).
3. **Tag keys and labels in source data** — Add `"suppressedBy": "noIO"` to all I/O and library key entries and shift labels in `hp48Keys.json` (or equivalent canonical data source) so the codegen filter removes them when `NO_IO` is `true`.
4. **Run codegen and verify** — Execute `pnpm codegen`, confirm the generated layout and action table contain no I/O or library entries, and confirm the calculator renders correctly with those keys absent.

## Relevant files
- `artifacts/rpn-calc/src/state/suppressionFlags.ts`
- `artifacts/rpn-calc/src/state/opCodes.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/scripts/codegen-key-action-table.mjs`
- `artifacts/rpn-calc/src/generated/keyLayoutData.ts`
- `artifacts/rpn-calc/src/generated/keyActionTable.ts`
