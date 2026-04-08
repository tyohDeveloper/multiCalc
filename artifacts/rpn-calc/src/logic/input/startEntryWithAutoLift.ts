import type { CalcState, EntryState } from "../../state/calculatorState";

export function startEntryWithAutoLift(state: CalcState, entry: EntryState): CalcState {
  if (state.enterFlag) {
    return { ...state, entry, enterFlag: false, isShifted: false };
  }
  return {
    ...state,
    stack: [state.stack[0], state.stack[0], state.stack[1], state.stack[2]],
    entry,
    enterFlag: false,
    isShifted: false,
  };
}
