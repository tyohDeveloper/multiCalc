# Refactor Suppression to Pure Build-Time

## What & Why
The current suppression implementation added runtime guards (opSuppressedBy, reducer checks, suppressionFlags imports in app code) that are unnecessary. Suppression is a build-time concern only: the codegen filter step should produce TypeScript that simply never contains suppressed items. The app code should have no awareness of suppression at all.

## Done looks like
- `suppressionFlags.ts` is moved out of `src/` into the scripts/build area (e.g., a plain JSON config file read only by the build tooling)
- `opSuppressedBy()` and its associated category sets (`PROGRAMMING_OPS`, `GRAPHICS_OPS`) are removed from `opCodes.ts`
- The runtime suppression checks (lines ~58–61) are removed from `calculatorReducer.ts`
- The codegen script reads the suppression config and fully omits suppressed keys/ops from generated output — suppressed items produce no entries in `keyActionTable.ts` and no labels in `keyLayoutData.ts`
- The calculator still builds and runs correctly with programming features absent (since they were already absent from the UI)

## Out of scope
- Adding any new functions or keys
- Changing the canonical `hp48Keys.json` structure
- Changing how the codegen is invoked

## Tasks
1. **Move suppression config out of src** — Convert `suppressionFlags.ts` to a plain JSON (or JS) config file in the `scripts/` directory. Remove it from `src/state/`. Update the codegen script to read the new location.
2. **Remove runtime suppression from app code** — Delete `opSuppressedBy()` and its op-category sets from `opCodes.ts`. Remove the suppression import and the three if-statements from `calculatorReducer.ts`.
3. **Update codegen to fully omit suppressed entries** — Rather than stripping labels while leaving op codes present, the codegen should skip suppressed key states entirely in the generated action table. A suppressed key state maps to `OP_NONE` in the table (or is simply absent), so nothing suppressed can ever reach the reducer.
4. **Verify build and smoke-test** — Run codegen and the dev build; confirm the app works and no suppressed symbols appear in the generated TypeScript.

## Relevant files
- `artifacts/rpn-calc/src/state/suppressionFlags.ts`
- `artifacts/rpn-calc/src/state/opCodes.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
- `artifacts/rpn-calc/scripts/codegen-key-action-table.mjs`
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/generated/keyActionTable.ts`
- `artifacts/rpn-calc/src/generated/keyLayoutData.ts`
