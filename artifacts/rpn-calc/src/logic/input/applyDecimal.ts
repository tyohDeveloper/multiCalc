import { startEntryWithAutoLift } from "./startEntryWithAutoLift";
import type { CalcState } from "../../state/calculatorState";

export function applyDecimal(state: CalcState): CalcState {
  if (state.error) return { ...state, error: null };
  if (!state.entry.isActive) {
    const entry = { isActive: true, buffer: "0.", hasDecimal: true, isEnteringExp: false };
    return startEntryWithAutoLift(state, entry);
  }
  if (state.entry.hasDecimal || state.entry.isEnteringExp) return state;
  return {
    ...state,
    entry: { ...state.entry, buffer: state.entry.buffer + ".", hasDecimal: true },
  };
}
