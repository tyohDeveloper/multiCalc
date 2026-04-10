# Build-Time Key Action Codegen

## What & Why
Introduce a build-time codegen step that reads the static calculator config (key JSON, op registry) and emits a pre-resolved `keyActionTable` — a flat `[keyId][shiftState] → CalcAction` mapping. This replaces the runtime string-parsing in `resolveKeyAction` and the closure-building in `buildKeyFunctionRegistry` with a simple table lookup and generic dispatch.

The primary benefits are not performance: they are reduced cohesion (controller no longer knows about label formats, closure wiring, or string op conventions), easier multi-person maintenance (build fails fast on schema errors instead of silently misbehaving at runtime), flexibility (swap a calculator's layout by swapping its generated table), and reusability of the codegen pattern and runtime kernel across multiple independent calculators.

## Done looks like
- A codegen script (runnable via `pnpm codegen` or as part of the build) reads `hp48Keys.json` and the op registry and emits `src/generated/keyActionTable.ts`
- The generated file maps every `[keyId][shiftState]` combination to a fully-typed `CalcAction` (no string parsing, no closures)
- `resolveKeyAction` and `buildKeyFunctionRegistry` are replaced by a single generic dispatch that looks up the table
- The build fails with a clear error if the JSON references an unknown op code, has a missing shift mapping, or has duplicate key IDs
- The view still emits `keyId` + `shiftState`; the reducer still consumes `CalcAction`; the boundary contract is unchanged
- The generated table and codegen script are structured so a second calculator can adopt the same pattern by pointing the script at a different key JSON file

## Out of scope
- Moving label resolution or key ViewModel generation to build time (defer until profiling justifies it)
- Op registry pre-generation (one-time module load, low impact)
- Any changes to the reducer, state shape, or math logic
- Building a second calculator

## Tasks
1. **Codegen script** — Write a Node/TS script that reads `hp48Keys.json` and the op registry, validates all op codes and shift mappings, and emits `src/generated/keyActionTable.ts` with a typed `KeyActionTable` type and a default-exported constant. Fail the build with a descriptive error on any unknown op, duplicate key ID, or missing required shift mapping.

2. **Wire codegen into build** — Add a `codegen` script to `package.json` and run it as a pre-build step (`prebuild`) so the generated file is always up to date. Commit the generated file to source so editors get types without needing to run codegen first.

3. **Replace runtime key resolution** — Remove `resolveKeyAction` and `buildKeyFunctionRegistry`. Replace their usage sites with a generic dispatch that does `actionTable[keyId][shiftState]` and dispatches the result. Keep the call sites (KeyGrid or equivalent) unchanged in shape — only the internal wiring changes.

4. **Update types and exports** — Ensure `KeyActionTable`, `KeyId`, and `ShiftState` are exported from a shared location so a future calculator can import the types and the same generic dispatcher without copying logic.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/state/opRegistry.ts`
- `artifacts/rpn-calc/src/logic/input/resolveKeyAction.ts`
- `artifacts/rpn-calc/src/logic/input/buildKeyFunctionRegistry.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
- `artifacts/rpn-calc/src/ui/calculators/HP48Calculator.tsx`
- `artifacts/rpn-calc/package.json`
