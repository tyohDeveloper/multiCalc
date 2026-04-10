---
title: Typed op registry (semantic key objects)
---
# Typed Op Registry

## What & Why

Every key press currently travels through a string-based dispatch chain
(`applyOp` → `applyMathOp` / `applyTrigOp` / `applyStackOp`). If an op
string is misspelled or unregistered it silently does nothing. There is no
single place that binds an executable op to its behavior, and no compile-time
check that a given string is valid.

The goal is a typed `ExecOpCode` union and a single `opRegistry.ts` that maps
every executable op to a `(state: CalcState) => CalcState` function composed
from existing pure functions and shared stack-access adapters. The JSON key
data remains unchanged — only op codes live there, not functions.

**Important distinction**: many keys in `hp48Keys.json` carry intentional
placeholder ops today (`OP_NONE`, `OP_MTH`, `OP_CST`, `SOFTKEY_*`, etc.).
These are not executable and must remain silent no-ops — they must **not**
produce an error state. Only truly unexpected values (typos, future gaps)
should produce an error.

## Done looks like

- `ExecOpCode` is a TypeScript string-literal union of every op that the
  registry actually handles (ADD, SIN, DROP, ENTER, TOGGLE_SIGN, …).
- `KeyOpCode` (or a similar name) covers all op strings that may appear in
  the JSON, including placeholders; it is a superset of `ExecOpCode`.
- A single `opRegistry.ts` maps each `ExecOpCode` to its execute function.
- The reducer's `OP` branch dispatches through the registry. Unknown
  `ExecOpCode` values produce a visible error state. Known placeholder ops
  (`OP_NONE` and similar) produce no state change (silent no-op).
- The four string-dispatch files (`applyOp`, `applyMathOp`, `applyTrigOp`,
  `applyStackOp`) are removed once the registry covers all their cases.
  Domain sub-registries (`mathRegistry`, `trigRegistry`, `stackRegistry`) are
  acceptable as imported fragments merged into `opRegistry` to respect the
  25-line-per-file convention.
- The dispatch pipeline is preserved: UI → `resolveKeyAction` → reducer →
  `opRegistry`. `buildKeyFunctionRegistry` must not call the op registry
  directly — all state transitions must flow through the reducer.
- All currently working calculator operations produce identical results before
  and after the refactor.

## Out of scope

- Adding new operations beyond those already implemented.
- Changing the pure math/trig functions (`logic/math/`, `logic/trig/`).
- Changing the stack-access adapters (`logic/shared/apply*Op.ts`).
- Updating `data-key-op` HTML attributes — those stay as raw JSON op strings.
- Any UI or CSS changes.

## Tasks

1. **Enumerate op strings and classify them** — audit every op string in
   `hp48Keys.json` and `resolveKeyAction.ts`. Separate them into executable
   ops (`ExecOpCode`) and known placeholder/inert ops. Define both TypeScript
   types.

2. **Build `opRegistry.ts`** — a single record mapping each `ExecOpCode` to
   its execute function, composed from existing pure functions and shared
   adapters. Domain sub-registries (math, trig, stack) are fine as fragments.

3. **Wire the dispatch path** — update the reducer's `OP` branch to look up
   ops in the registry. Executable ops not in the registry → error state.
   Known placeholder ops → silent no-op. Remove `applyOp`, `applyMathOp`,
   `applyTrigOp`, `applyStackOp` once the registry is the sole dispatch path.

4. **Keep pipeline intact** — verify that `buildKeyFunctionRegistry` still
   routes through `resolveKeyAction` → reducer and does not call the op
   registry directly.

## Relevant files

- `artifacts/rpn-calc/src/state/calculatorState.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
- `artifacts/rpn-calc/src/state/applyOp.ts`
- `artifacts/rpn-calc/src/state/applyMathOp.ts`
- `artifacts/rpn-calc/src/state/applyTrigOp.ts`
- `artifacts/rpn-calc/src/state/applyStackOp.ts`
- `artifacts/rpn-calc/src/logic/input/resolveKeyAction.ts`
- `artifacts/rpn-calc/src/logic/input/buildKeyFunctionRegistry.ts`
- `artifacts/rpn-calc/src/logic/shared/applyBinaryOp.ts`
- `artifacts/rpn-calc/src/logic/shared/applyUnaryOp.ts`
- `artifacts/rpn-calc/src/logic/shared/applyPreservingYOp.ts`
- `artifacts/rpn-calc/src/logic/shared/applyPushConstant.ts`
- `artifacts/rpn-calc/src/data/hp48Keys.json`