import { commitEntry } from "../shared/commitEntry";
import type { CalcState } from "../../state/calculatorState";
import type { Complex } from "../complex/complex";

export function applyRoll(state: CalcState): CalcState {
  const s = commitEntry(state);
  const nVal = s.stack[0] as Complex;
  const n = Math.round(nVal.re);
  if (n < 1 || n > 3) {
    return { ...s, error: "Bad argument" };
  }
  const after = [s.stack[1], s.stack[2], s.stack[3], s.stack[3]] as typeof s.stack;
  const rolled = after[n - 1];
  for (let i = n - 1; i > 0; i--) {
    after[i] = after[i - 1];
  }
  after[0] = rolled;
  return {
    ...s,
    stack: after,
    enterFlag: false,
    error: null,
  };
}
