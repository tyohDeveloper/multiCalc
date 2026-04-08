import { startEntryWithAutoLift } from "./startEntryWithAutoLift";
import type { CalcState } from "../../state/calculatorState";

export function applyEex(state: CalcState): CalcState {
  if (state.error) return { ...state, error: null };
  if (!state.entry.isActive) {
    const entry = { isActive: true, buffer: "1E", hasDecimal: false, isEnteringExp: true };
    return startEntryWithAutoLift(state, entry);
  }
  if (state.entry.isEnteringExp) return state;
  const buf = state.entry.buffer || "1";
  return {
    ...state,
    entry: { ...state.entry, buffer: buf + "E", isEnteringExp: true },
  };
}
