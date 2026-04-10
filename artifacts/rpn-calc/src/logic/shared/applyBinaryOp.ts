import { commitEntry } from "./commitEntry";
import type { CalcState, StackValue } from "../../state/calculatorState";
import type { Complex } from "../complex/complex";

export function applyBinaryOp(
  state: CalcState,
  op: (y: Complex, x: Complex) => Complex,
): CalcState {
  const s = commitEntry(state);
  const x = s.stack[0] as Complex;
  const y = s.stack[1] as Complex;
  const result: StackValue = op(y, x);
  return {
    ...s,
    stack: [result, s.stack[2], s.stack[3], s.stack[3]],
    lastX: x,
    enterFlag: false,
    error: null,
  };
}
