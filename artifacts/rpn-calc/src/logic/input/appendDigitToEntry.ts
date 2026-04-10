import type { CalcState } from "../../state/calculatorState";

export function appendDigitToEntry(state: CalcState, digit: string): CalcState {
  const { entry } = state;

  if (entry.isEnteringImag) {
    if (entry.imagIsEnteringExp) {
      const eIdx = entry.imagBuffer.indexOf("E");
      const expPart = eIdx >= 0 ? entry.imagBuffer.slice(eIdx + 1).replace("-", "") : "";
      if (expPart.length >= 3) return state;
      return { ...state, entry: { ...entry, imagBuffer: entry.imagBuffer + digit } };
    }
    if (entry.imagBuffer.replace("-", "").replace(".", "").length >= 12) return state;
    return { ...state, entry: { ...entry, imagBuffer: entry.imagBuffer + digit } };
  }

  if (entry.isEnteringExp) {
    const eIdx = entry.buffer.indexOf("E");
    const expPart = eIdx >= 0 ? entry.buffer.slice(eIdx + 1).replace("-", "") : "";
    if (expPart.length >= 3) return state;
    return { ...state, entry: { ...entry, buffer: entry.buffer + digit } };
  }
  if (entry.buffer.replace("-", "").replace(".", "").length >= 12) return state;
  return { ...state, entry: { ...entry, buffer: entry.buffer + digit } };
}
