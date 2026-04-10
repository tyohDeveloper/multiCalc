import type { CalcState } from "../../state/calculatorState";
import { CLEARED_ENTRY } from "../../state/calculatorState";
import { ZERO } from "../complex/complex";

export function applyClearStack(state: CalcState): CalcState {
  return {
    ...state,
    stack: [ZERO, ZERO, ZERO, ZERO],
    lastX: state.entry.isActive
      ? state.stack[0]
      : state.lastX,
    entry: CLEARED_ENTRY,
    enterFlag: false,
    error: null,
  };
}
