# Graphics keys stripped at compile time

## What & Why
PLOT and PICTURE (PICT) are graphics-only keys/labels that serve no purpose when `NO_GRAPHICS` is set. Currently they are compiled into the app regardless. They should be identified in the key data and excluded entirely by the codegen when the suppression flag is active — so they never appear in the built app.

## Done looks like
- The PLOT top label (`fn-5c`) and PICT top label (`fn-p`) are absent from the compiled output when `NO_GRAPHICS = true`
- Any other key labels tagged as graphics-only are also excluded
- When `NO_GRAPHICS = false` (future use), those labels compile in normally
- No runtime conditional logic is added — the removal is purely at build/codegen time

## Out of scope
- Runtime visibility toggling
- Implementing any graphics functionality
- Changing how the reducer handles suppressed ops at runtime

## Tasks
1. **Tag graphics labels in the key data** — Add a `suppressedBy` field (or equivalent) to the relevant top-label entries in `hp48Keys.json` for PLOT (`fn-5c`, cyan) and PICT (`fn-p`, cyan/merged), and any other labels that belong to the `noGraphics` category.

2. **Read suppression flags in codegen** — Update the codegen script to import or read the `NO_GRAPHICS` (and sibling) flags at build time. When a flag is active, strip out any key label entries tagged with the matching `suppressedBy` value before emitting the generated output.

3. **Exclude stripped labels from generated output** — Ensure the generated `keyActionTable.ts` and any label/layout output omit those entries entirely, so the compiled bundle contains no reference to the suppressed labels or their op codes.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/state/suppressionFlags.ts`
- `artifacts/rpn-calc/src/state/opCodes.ts`
- `artifacts/rpn-calc/scripts/codegen-key-action-table.mjs`
- `artifacts/rpn-calc/src/generated/keyActionTable.ts`
