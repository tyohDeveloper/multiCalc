import type { CalcState } from "../../state/calculatorState";
import { CLEARED_ENTRY } from "../../state/calculatorState";

export function applyClearStack(state: CalcState): CalcState {
  return {
    ...state,
    stack: [0, 0, 0, 0],
    lastX: state.entry.isActive
      ? state.stack[0]
      : state.lastX,
    entry: CLEARED_ENTRY,
    enterFlag: false,
    shiftState: "unshifted",
    error: null,
  };
}
