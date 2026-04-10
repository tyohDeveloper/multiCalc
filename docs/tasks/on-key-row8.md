# Fix Row 8 Key 0 as ON Key

## What & Why
Row 8, key 0 (`fn-8a`) currently shows the placeholder label `"#8 0"` and has dummy `topMagenta`/`topCyan` values of literal `"magenta"` and `"cyan"`. An `"on-key": "ON"` label already exists in `labels.json` but is unused. The key should be wired up as the **ON** key, matching the physical HP 48GX bottom-left key position.

## Done looks like
- Row 8, key 0 displays "ON" as its main label (no more `#8 0` placeholder)
- The dummy `"magenta"` / `"cyan"` top labels are removed or replaced with real shift labels appropriate for an ON key (e.g. "CONT" for magenta-shifted, or left empty)
- The key triggers a sensible action when pressed (e.g. cancel / clear / OP_ON) instead of `OP_NONE`
- No other keys or rows are affected

## Out of scope
- Adding full power-on/off simulation
- Changing the existing `"on"` key in row `top-fn-1`

## Tasks
1. In `hp48Keys.json`, update `fn-8a`: set `labelKey` to `"on-key"`, and remove or replace the placeholder `topMagenta`/`topCyan` values with real shift labels (or omit them entirely if no shift function is assigned).
2. In `keyActionTable.ts`, update `fn-8a`'s `unshifted` action to a meaningful operation — use `CLEAR` or a dedicated `OP_ON` if one exists in the op registry; keep shifted actions as `OP_NONE` unless real shift functions are assigned.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:103-111`
- `artifacts/rpn-calc/src/config/labels.json:25,140`
- `artifacts/rpn-calc/src/generated/keyActionTable.ts:334-339`
