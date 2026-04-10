# Complex Number Math Engine

## What & Why
Replace the calculator's plain `number` stack with a complex number type throughout. All math, display, and entry must work in terms of `Complex` values so the calculator can handle operations that produce imaginary results (e.g. `sqrt(-1)`), accept imaginary literals from the keyboard, and show `NaN` when a result is undefined.

## Done looks like
- Every stack register holds a complex value internally; registers whose imaginary part is exactly 0 display identically to before (just the real number).
- Typing `123I456` in the entry buffer produces the complex number `(123, i456)` when committed. The `I` key is available in the entry buffer: pressing it moves the cursor to the imaginary-part segment without pushing the stack.
- Registers with a non-zero imaginary part display in the form `a + bi` (or `a - bi` for negative imaginary).
- Operations that have no real-domain answer (e.g. `sqrt(-4)`) return a proper complex result (`2i`) instead of `NaN`.
- Operations that are genuinely undefined (e.g. `0/0`, `ln(0)`) display `NaN` in the affected register.
- All existing operations (arithmetic, trig, log/exp, power, roots, percent, abs, floor, ceil, mod, min, max, sign, intdiv, reciprocal, constants) continue to work for purely real inputs and produce the same results as before.
- The `ABS` operation on a complex number returns the modulus `√(a²+b²)` as a real.
- `FLOOR`, `CEIL`, `SIGN`, `MOD`, `INTDIV`, `MIN`, `MAX`, and `PERCENT`/`PERCENT_CHANGE` operate on the real part only when given a complex number (imaginary part is dropped or propagated as-is per natural convention).

## Out of scope
- A dedicated complex-conjugate or argument (arg) key — those can come later.
- Polar display mode (`r∠θ`).
- Changing which keys are on the keyboard or their positions (only the `I` key's behavior during entry is addressed here).

## Tasks
1. **Complex type and arithmetic primitives** — Create a `Complex` value type (real + imag, both `number`) with core arithmetic functions: `add`, `sub`, `mul`, `div`, `neg`, `abs` (modulus), `reciprocal`, `sqrt`, `pow`, `exp`, `ln`, `log10`, `sin`, `cos`, `tan`, `asin`, `acos`, `atan`. Each function handles NaN propagation and returns a `Complex`. Keep this as a pure utility module with no side effects.

2. **State type migration** — Change `CalcState.stack` from `[number, number, number, number]` to `[Complex, Complex, Complex, Complex]`. Update `lastX`, `memory`, and `commitEntry` / `parseEntryBuffer` accordingly. The entry buffer gains an optional `imagBuffer` string segment that is populated after the `I` separator is typed.

3. **I-key entry handling** — Wire a new `IMAG_SEP` op-code (triggered by the `I` key during entry) that switches the active edit segment from the real buffer to the imaginary buffer. Backspace should erase into the imaginary buffer first, then back into the real buffer if the imaginary segment is empty. Committing the entry (via ENTER or any operation) parses both segments and assembles the `Complex` value.

4. **Rewrite all math operations to use Complex** — Replace every operation in `opAdd`, `opSubtract`, `opMultiply`, `opDivide`, `opSqrt`, `opSquare`, `opPower`, `opXroot`, `opReciprocal`, `opExp`, `opLn`, `opLog`, `opTenPow`, `opSin`, `opCos`, `opTan`, `opAsin`, `opAcos`, `opAtan`, `opAbs`, `opPercent`, `opPercentChange`, `opSign`, `opFloor`, `opCeil`, `opMod`, `opIntDiv`, `opMin`, `opMax` to operate on `Complex` values using the primitives from task 1.

5. **Display formatting** — Update `formatStackValue` and `formatEntryBuffer` so that: a complex number with imaginary ≈ 0 renders exactly as before; one with a non-zero imaginary part renders as `a + bi` (or `a - bi`); a NaN real or imaginary component renders as `NaN`. While entering, show the imaginary buffer segment after an `i` separator in the display (e.g. `123_i456_`).

## Relevant files
- `artifacts/rpn-calc/src/state/calculatorState.ts`
- `artifacts/rpn-calc/src/logic/shared/commitEntry.ts`
- `artifacts/rpn-calc/src/logic/shared/parseEntryBuffer.ts`
- `artifacts/rpn-calc/src/logic/shared/applyBinaryOp.ts`
- `artifacts/rpn-calc/src/logic/shared/applyUnaryOp.ts`
- `artifacts/rpn-calc/src/logic/shared/applyPushConstant.ts`
- `artifacts/rpn-calc/src/logic/shared/applyPreservingYOp.ts`
- `artifacts/rpn-calc/src/logic/input/appendDigitToEntry.ts`
- `artifacts/rpn-calc/src/logic/input/applyBackspace.ts`
- `artifacts/rpn-calc/src/logic/input/applyDecimal.ts`
- `artifacts/rpn-calc/src/logic/input/applyEex.ts`
- `artifacts/rpn-calc/src/logic/input/toggleSign.ts`
- `artifacts/rpn-calc/src/logic/input/toggleExpSign.ts`
- `artifacts/rpn-calc/src/logic/input/startEntryWithAutoLift.ts`
- `artifacts/rpn-calc/src/logic/formatting/formatStackValue.ts`
- `artifacts/rpn-calc/src/logic/formatting/formatEntryBuffer.ts`
- `artifacts/rpn-calc/src/logic/formatting/buildStackRows.ts`
- `artifacts/rpn-calc/src/logic/shared/formatSpecial.ts`
- `artifacts/rpn-calc/src/logic/math/opAdd.ts`
- `artifacts/rpn-calc/src/logic/math/opSubtract.ts`
- `artifacts/rpn-calc/src/logic/math/opMultiply.ts`
- `artifacts/rpn-calc/src/logic/math/opDivide.ts`
- `artifacts/rpn-calc/src/logic/math/opSqrt.ts`
- `artifacts/rpn-calc/src/logic/math/opSquare.ts`
- `artifacts/rpn-calc/src/logic/math/opPower.ts`
- `artifacts/rpn-calc/src/logic/math/opXroot.ts`
- `artifacts/rpn-calc/src/logic/math/opReciprocal.ts`
- `artifacts/rpn-calc/src/logic/math/opExp.ts`
- `artifacts/rpn-calc/src/logic/math/opLn.ts`
- `artifacts/rpn-calc/src/logic/math/opLog.ts`
- `artifacts/rpn-calc/src/logic/math/opTenPow.ts`
- `artifacts/rpn-calc/src/logic/trig/opSin.ts`
- `artifacts/rpn-calc/src/logic/trig/opCos.ts`
- `artifacts/rpn-calc/src/logic/trig/opTan.ts`
- `artifacts/rpn-calc/src/logic/trig/opAsin.ts`
- `artifacts/rpn-calc/src/logic/trig/opAcos.ts`
- `artifacts/rpn-calc/src/logic/trig/opAtan.ts`
- `artifacts/rpn-calc/src/logic/math/opAbs.ts`
- `artifacts/rpn-calc/src/logic/math/opPercent.ts`
- `artifacts/rpn-calc/src/logic/math/opPercentChange.ts`
- `artifacts/rpn-calc/src/logic/math/opSign.ts`
- `artifacts/rpn-calc/src/logic/math/opFloor.ts`
- `artifacts/rpn-calc/src/logic/math/opCeil.ts`
- `artifacts/rpn-calc/src/logic/math/opMod.ts`
- `artifacts/rpn-calc/src/logic/math/opIntDiv.ts`
- `artifacts/rpn-calc/src/logic/math/opMin.ts`
- `artifacts/rpn-calc/src/logic/math/opMax.ts`
- `artifacts/rpn-calc/src/state/opCodes.ts`
- `artifacts/rpn-calc/src/state/opRegistry.ts`
- `artifacts/rpn-calc/src/state/calculatorReducer.ts`
