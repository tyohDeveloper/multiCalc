import { appendDigitToEntry } from "./appendDigitToEntry";
import { startEntryWithAutoLift } from "./startEntryWithAutoLift";
import type { CalcState } from "../../state/calculatorState";

export function applyDigit(state: CalcState, digit: string): CalcState {
  if (state.error) return { ...state, error: null };
  if (state.entry.isActive) return appendDigitToEntry(state, digit);
  const entry = {
    isActive: true,
    buffer: digit,
    hasDecimal: false,
    isEnteringExp: false,
    imagBuffer: "",
    isEnteringImag: false,
    imagHasDecimal: false,
    imagIsEnteringExp: false,
  };
  return startEntryWithAutoLift(state, entry);
}
