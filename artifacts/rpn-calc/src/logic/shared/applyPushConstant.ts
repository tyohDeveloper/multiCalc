import { commitEntry } from "./commitEntry";
import type { CalcState } from "../../state/calculatorState";

export function applyPushConstant(state: CalcState, value: number): CalcState {
  const s = commitEntry(state);
  return {
    ...s,
    stack: [value, s.stack[0], s.stack[1], s.stack[2]],
    enterFlag: false,
    isShifted: false,
    error: null,
  };
}
