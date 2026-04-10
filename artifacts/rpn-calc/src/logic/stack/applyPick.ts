import { commitEntry } from "../shared/commitEntry";
import type { CalcState } from "../../state/calculatorState";

export function applyPick(state: CalcState): CalcState {
  const s = commitEntry(state);
  const nVal = s.stack[0];
  const n = Math.round(nVal.re);
  if (n < 1 || n > 3) {
    return { ...s, error: "Bad argument" };
  }
  const after = [s.stack[1], s.stack[2], s.stack[3], s.stack[3]] as typeof s.stack;
  const picked = after[n - 1];
  return {
    ...s,
    stack: [picked, after[0], after[1], after[2]],
    enterFlag: false,
    error: null,
  };
}
