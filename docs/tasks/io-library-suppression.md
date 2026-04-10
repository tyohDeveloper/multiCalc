# I/O and Library Suppression Flag

## What & Why
Add a `NO_IO` build-time suppression flag covering all HP-48 GX I/O and library functions. When enabled (the default), every I/O and library label is stripped from key faces at codegen time and all related actions resolve to `OP_NONE`. Key buttons are never removed — the layout stays structurally identical regardless of this flag, consistent with the existing suppression architecture.

## Done looks like
- `suppressionConfig.json` has a `NO_IO: true` entry alongside the existing `NO_GRAPHICS`, `NO_PROGRAMMING`, and `NO_MATRIX` flags.
- All I/O and library operations have named op code entries (e.g., `IoOpCode` union type) in `opCodes.ts`, collected in an `IO_OPS` set, so `opSuppressedBy` returns `"noIO"` for every one.
- Every relevant entry in `hp48Keys.json` has its label fields (e.g., `topCyan`, `topMagenta`, `shiftOp`) tagged with `suppressedBy: "noIO"` — the key entry itself is never removed.
- Codegen strips those label fields and emits `OP_NONE` in the action table for all `noIO`-tagged actions when the flag is active.
- The following function labels are absent from key faces when `NO_IO` is `true` (keys remain):
  - I/O functions: IO, IOPAR, RECV, SEND, SERVER, CLIENT, XMIT, SRECV, PR1, PR2, INFRARED, WIRE, BACKUP, RESTORE, FREE, MERGE, PORT0, PORT1, PORT2
  - Library functions: LIBRARY, ATTACH, DETACH, LIBS, VERSION, MEM, NEWOB, PURGE, ARCHIVE, RESTORE (port), EQNLIB
  - Shift labels: left-shift I/O, left-shift LIBRARY, and related menu labels on shared keys
- Toggling `NO_IO` to `false` and re-running codegen causes all I/O and library labels to reappear; key count does not change.

## Out of scope
- Implementing actual I/O or library logic (all ops are stubs/`OP_NONE`).
- UI for managing library attachments or port contents.
- Equation library UI beyond the suppression stub.
- Removing any key buttons from the layout.

## Tasks
1. **Add `NO_IO` to `suppressionConfig.json`** — Add `"NO_IO": true` to the build-time config file. Update the codegen script to recognize `"noIO"` as a valid suppression tag, following the same pattern used for `noGraphics`, `noProgramming`, and `noMatrix`.
2. **Register I/O op codes in `opCodes.ts`** — Add all listed I/O and library functions as named op codes (e.g., `IoOpCode` union), collected in an `IO_OPS` set, with `opSuppressedBy` returning `"noIO"` for each.
3. **Tag label fields in `hp48Keys.json`** — For each I/O and library key, tag only the specific label fields (`topCyan`, `topMagenta`, `shiftLabel`, `shiftOp`, etc.) with `suppressedBy: "noIO"`. Never tag or remove the entire key entry.
4. **Run codegen and verify** — Execute `pnpm codegen`, confirm the generated layout has the same key count with `NO_IO` on or off, confirm I/O labels are absent when the flag is active, and confirm the calculator renders without errors.

## Relevant files
- `artifacts/rpn-calc/scripts/suppressionConfig.json`
- `artifacts/rpn-calc/scripts/codegen-key-action-table.mjs`
- `artifacts/rpn-calc/src/state/opCodes.ts`
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/generated/keyLayoutData.ts`
- `artifacts/rpn-calc/src/generated/keyActionTable.ts`
