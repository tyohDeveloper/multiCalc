import { startEntryWithAutoLift } from "./startEntryWithAutoLift";
import type { CalcState } from "../../state/calculatorState";

export function applyDecimal(state: CalcState): CalcState {
  if (state.error) return { ...state, error: null };

  if (!state.entry.isActive) {
    const entry = {
      isActive: true,
      buffer: "0.",
      hasDecimal: true,
      isEnteringExp: false,
      imagBuffer: "",
      isEnteringImag: false,
      imagHasDecimal: false,
      imagIsEnteringExp: false,
    };
    return startEntryWithAutoLift(state, entry);
  }

  const { entry } = state;

  if (entry.isEnteringImag) {
    if (entry.imagHasDecimal || entry.imagIsEnteringExp) return state;
    return {
      ...state,
      entry: { ...entry, imagBuffer: entry.imagBuffer + ".", imagHasDecimal: true },
    };
  }

  if (entry.hasDecimal || entry.isEnteringExp) return state;
  return {
    ...state,
    entry: { ...entry, buffer: entry.buffer + ".", hasDecimal: true },
  };
}
