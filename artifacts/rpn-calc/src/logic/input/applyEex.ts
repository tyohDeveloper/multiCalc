import { startEntryWithAutoLift } from "./startEntryWithAutoLift";
import type { CalcState } from "../../state/calculatorState";

export function applyEex(state: CalcState): CalcState {
  if (state.error) return { ...state, error: null };

  if (!state.entry.isActive) {
    const entry = {
      isActive: true,
      buffer: "1E",
      hasDecimal: false,
      isEnteringExp: true,
      imagBuffer: "",
      isEnteringImag: false,
      imagHasDecimal: false,
      imagIsEnteringExp: false,
    };
    return startEntryWithAutoLift(state, entry);
  }

  const { entry } = state;

  if (entry.isEnteringImag) {
    if (entry.imagIsEnteringExp) return state;
    const buf = entry.imagBuffer || "1";
    return {
      ...state,
      entry: { ...entry, imagBuffer: buf + "E", imagIsEnteringExp: true },
    };
  }

  if (entry.isEnteringExp) return state;
  const buf = entry.buffer || "1";
  return {
    ...state,
    entry: { ...entry, buffer: buf + "E", isEnteringExp: true },
  };
}
