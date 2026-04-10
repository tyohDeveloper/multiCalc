import { commitEntry } from "../shared/commitEntry";
import type { CalcState } from "../../state/calculatorState";

export function applyRot(state: CalcState): CalcState {
  const s = commitEntry(state);
  return {
    ...s,
    stack: [s.stack[2], s.stack[0], s.stack[1], s.stack[3]],
    enterFlag: false,
    error: null,
  };
}
