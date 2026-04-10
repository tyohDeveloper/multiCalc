import { applyDrop } from "../stack/applyDrop";
import type { CalcState } from "../../state/calculatorState";
import { CLEARED_ENTRY } from "../../state/calculatorState";

export function applyBackspace(state: CalcState): CalcState {
  if (!state.entry.isActive) return applyDrop(state);

  const { entry } = state;

  if (entry.isEnteringImag) {
    if (entry.imagBuffer.length === 0) {
      return {
        ...state,
        entry: {
          ...entry,
          isEnteringImag: false,
          imagBuffer: "",
          imagHasDecimal: false,
          imagIsEnteringExp: false,
        },
      };
    }
    const newBuf = entry.imagBuffer.slice(0, -1);
    const imagHasDecimal = newBuf.includes(".");
    const imagIsEnteringExp = newBuf.includes("E");
    return {
      ...state,
      entry: { ...entry, imagBuffer: newBuf, imagHasDecimal, imagIsEnteringExp },
    };
  }

  if (entry.buffer.length <= 1) {
    return { ...state, entry: CLEARED_ENTRY };
  }
  const newBuf = entry.buffer.slice(0, -1);
  const hasDecimal = newBuf.includes(".");
  const isEnteringExp = newBuf.includes("E");
  return { ...state, entry: { ...entry, buffer: newBuf, hasDecimal, isEnteringExp } };
}
