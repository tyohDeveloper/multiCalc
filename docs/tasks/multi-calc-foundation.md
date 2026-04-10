# Multi-calculator foundation

## What & Why
Establish the core architecture that allows many different calculators to be defined and run using the same engine. Right now the app is hardwired to a single HP48 layout. This task introduces a `CalcDescriptor` (the static definition of a calculator — its key layout, installed functions, register count, and capabilities) and a `CalcInstance` (a live runtime state bound to a descriptor). The existing HP48 becomes the first descriptor/instance in the system.

This also formalizes the key and function model that the user has specified:
- Each key has four shift slots: **unshifted**, **magenta**, **cyan**, **white**.
- Any of the three function types — **operation**, **input**, or **state** — may be installed in any slot.
- A special variant of the white slot is a **character** function (inserts a single character; visually lives at the bottom-right of the key).
- Label placement rules are encoded in the key model, not scattered in the renderer.
- The center/face label of a key displays the label of whichever shift function is currently active; all other labels (top, bottom) are always visible regardless of shift state.

## Done looks like
- A `CalcDescriptor` TypeScript type exists that fully describes a calculator: its id, name, grid of keys (each key having up to four named shift slots), suppression flags, and register configuration.
- A `FunctionDef` union type exists covering `OperationFn | InputFn | StateFn | CharacterFn`, each carrying its label text and the action it dispatches.
- The HP48 keyboard is described as a `CalcDescriptor` and remains fully functional.
- `AppState` holds an array of `CalcInstance` objects (descriptor + live `CalcState`) and an `activeIndex`. The existing HP48 is instance 0. No navigation UI is added yet — the active calculator is just rendered as before.
- General registers are extended to 100 entries (r00–r99).
- Key face label switches to the active shift function's label while shifted, and back to the unshifted label when unshifted — exactly as before, but now driven by the descriptor model.
- Top label area: if both magenta and cyan functions are present, magenta is top-left, cyan is top-right; if only one, it spans the full top. Bottom label area: white function label spans full width; character function label is bottom-right (smaller, distinguished visually).

## Out of scope
- Pane navigation / switching between calculator instances (deferred).
- Defining a second actual calculator (the descriptor model must support it, but no second calculator is built yet).
- Program registers, I/O registers, or library registers.
- Infix / algebraic calculator logic.

## Tasks
1. **Define `FunctionDef` union and key slot types** — Create `FunctionDef` as a discriminated union of `OperationFn`, `InputFn`, `StateFn`, and `CharacterFn`. Define `KeySlots` as `{ unshifted: FunctionDef | null; magenta: FunctionDef | null; cyan: FunctionDef | null; white: FunctionDef | null }`. Each `FunctionDef` carries its label text.

2. **Define `CalcDescriptor` and `CalcInstance` types** — `CalcDescriptor` holds the calculator's id, name, its key layout (sections → rows → keys, each key having `KeySlots`), suppression flags, and register count. `CalcInstance` pairs a descriptor with a live `CalcState`.

3. **Migrate HP48 key definitions to the descriptor model** — Convert the existing `hp48Keys.json` / `keyLayoutData.ts` / `keyActionTable.ts` data into the first `CalcDescriptor`. The codegen script should emit a descriptor-shaped output rather than the old flat table, or a new static file is written by hand if codegen is infeasible to adapt in this task. The HP48 must remain fully functional.

4. **Extend general registers to 100** — Resize the `registers` array in `initialState` from 10 to 100. Ensure `STO`/`RCL` actions accept indices 0–99 without breaking anything.

5. **Multi-instance app state** — Introduce an `AppState` (or update the existing top-level state in `App.tsx`) that holds `instances: CalcInstance[]` and `activeIndex: number`. Instantiate the HP48 descriptor as instance 0. The active instance's state is passed to the existing `HP48Calculator` component so rendering is unchanged.

6. **Label placement rules in `KeyButton`** — Update `KeyButton` to render labels according to the slot model: top area shows magenta (left) and cyan (right) labels when both slots are filled, or a single full-width label if only one is present; bottom area shows the white function label full-width, or the character label at bottom-right if it's a `CharacterFn`. The face label continues to show the active-shift function's label text while shifted and the unshifted label otherwise.

## Relevant files
- `artifacts/rpn-calc/src/state/calculatorState.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
- `artifacts/rpn-calc/src/state/opRegistry.ts`
- `artifacts/rpn-calc/src/state/opCodes.ts`
- `artifacts/rpn-calc/src/generated/keyLayoutData.ts`
- `artifacts/rpn-calc/src/generated/keyActionTable.ts`
- `artifacts/rpn-calc/src/ui/App.tsx`
- `artifacts/rpn-calc/src/ui/calculators/HP48Calculator.tsx`
- `artifacts/rpn-calc/src/ui/components/KeyButton.tsx`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
