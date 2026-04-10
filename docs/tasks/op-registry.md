# Typed Op Registry

## What & Why

Right now every key press travels through a chain of string-based dispatch
files (`applyMathOp.ts`, `applyTrigOp.ts`, `applyStackOp.ts`, `applyOp.ts`).
If a key's op string is misspelled or unregistered, it silently does nothing.
There is also no single place that binds a key to its behavior.

The goal is to make each key a **semantic control object**: a typed op code
that maps directly to an execute function composed from existing pure functions
(`opAdd`, `opSin`, …) and shared stack-access adapters (`applyBinaryOp`,
`applyUnaryOp`, …). The JSON key data remains the source of truth for layout,
labels, and identity — only op codes live there, not functions.

## Done looks like

- A single `opRegistry.ts` file maps every supported `OpCode` to a
  `(state: CalcState) => CalcState` execute function.
- `OpCode` is a TypeScript string-literal union; any unknown op string is a
  compile-time error.
- `resolveKeyAction.ts` emits typed `OpCode` values instead of raw strings.
- The reducer's `OP` branch calls the registry executor; the four old
  dispatch files (`applyMathOp`, `applyTrigOp`, `applyStackOp`, `applyOp`)
  are removed or reduced to thin helpers imported by the registry.
- An unregistered op (only possible via JSON typo) produces a visible error
  state on the display instead of a silent no-op.
- All currently working calculator operations produce identical results
  before and after the refactor.

## Out of scope

- Adding new operations beyond those already implemented.
- Changing the pure math/trig functions (`logic/math/`, `logic/trig/`).
- Changing the stack-access adapters (`logic/shared/apply*Op.ts`).
- Any UI or CSS changes.

## Tasks

1. **Define `OpCode` union** — create a TypeScript string-literal union of
   every op string currently used in `hp48Keys.json` and `resolveKeyAction.ts`.

2. **Build `opRegistry.ts`** — a single record mapping each `OpCode` to its
   execute function, composed from existing pure functions and shared adapters.
   Replace the four current dispatch files with registry lookups.

3. **Wire the dispatch path** — update `resolveKeyAction.ts` to return typed
   `OpCode` actions; update the reducer `OP` branch to execute via registry;
   remove dead dispatch code.

4. **Unknown-op error handling** — if a registry lookup misses (JSON typo),
   produce a deterministic error state on the calculator display.

## Relevant files

- `artifacts/rpn-calc/src/state/calculatorState.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
- `artifacts/rpn-calc/src/state/applyOp.ts`
- `artifacts/rpn-calc/src/state/applyMathOp.ts`
- `artifacts/rpn-calc/src/state/applyTrigOp.ts`
- `artifacts/rpn-calc/src/state/applyStackOp.ts`
- `artifacts/rpn-calc/src/logic/input/resolveKeyAction.ts`
- `artifacts/rpn-calc/src/logic/shared/applyBinaryOp.ts`
- `artifacts/rpn-calc/src/logic/shared/applyUnaryOp.ts`
- `artifacts/rpn-calc/src/logic/shared/applyPreservingYOp.ts`
- `artifacts/rpn-calc/src/logic/shared/applyPushConstant.ts`
- `artifacts/rpn-calc/src/data/hp48Keys.json`
