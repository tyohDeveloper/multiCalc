import { commitEntry } from "../shared/commitEntry";
import type { CalcState } from "../../state/calculatorState";

export function applyRollDown(state: CalcState): CalcState {
  const s = commitEntry(state);
  return {
    ...s,
    stack: [s.stack[1], s.stack[2], s.stack[3], s.stack[0]],
    enterFlag: false,
    isShifted: false,
    error: null,
  };
}
