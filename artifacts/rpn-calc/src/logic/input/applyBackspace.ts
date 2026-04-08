import { applyDrop } from "../stack/applyDrop";
import type { CalcState } from "../../state/calculatorState";
import { CLEARED_ENTRY } from "../../state/calculatorState";

export function applyBackspace(state: CalcState): CalcState {
  if (!state.entry.isActive) return applyDrop(state);
  if (state.entry.buffer.length <= 1) {
    return { ...state, entry: CLEARED_ENTRY };
  }
  const newBuf = state.entry.buffer.slice(0, -1);
  const hasDecimal = newBuf.includes(".");
  const isEnteringExp = newBuf.includes("E");
  return { ...state, entry: { ...state.entry, buffer: newBuf, hasDecimal, isEnteringExp } };
}
