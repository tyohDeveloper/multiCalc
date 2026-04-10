import { startEntryWithAutoLift } from "./startEntryWithAutoLift";
import type { CalcState } from "../../state/calculatorState";

export function applyImagSep(state: CalcState): CalcState {
  if (state.error) return { ...state, error: null };
  if (!state.entry.isActive) {
    const entry = {
      isActive: true,
      buffer: "0",
      hasDecimal: false,
      isEnteringExp: false,
      imagBuffer: "",
      isEnteringImag: true,
      imagHasDecimal: false,
      imagIsEnteringExp: false,
    };
    return startEntryWithAutoLift(state, entry);
  }
  if (state.entry.isEnteringImag) return state;
  return {
    ...state,
    entry: {
      ...state.entry,
      isEnteringImag: true,
      imagBuffer: "",
      imagHasDecimal: false,
      imagIsEnteringExp: false,
    },
  };
}
