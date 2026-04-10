import { commitEntry } from "../shared/commitEntry";
import type { CalcState } from "../../state/calculatorState";
import type { Complex } from "../complex/complex";

export function applyRollD(state: CalcState): CalcState {
  const s = commitEntry(state);
  const nVal = s.stack[0] as Complex;
  const n = Math.round(nVal.re);
  if (n < 1 || n > 3) {
    return { ...s, error: "Bad argument" };
  }
  const after = [s.stack[1], s.stack[2], s.stack[3], s.stack[3]] as typeof s.stack;
  const top = after[0];
  for (let i = 0; i < n - 1; i++) {
    after[i] = after[i + 1];
  }
  after[n - 1] = top;
  return {
    ...s,
    stack: after,
    enterFlag: false,
    error: null,
  };
}
