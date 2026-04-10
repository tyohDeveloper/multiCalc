import { toggleExpSign } from "./toggleExpSign";
import { applyUnaryOp } from "../shared/applyUnaryOp";
import type { CalcState } from "../../state/calculatorState";
import { neg } from "../complex/complex";

export function toggleSign(state: CalcState): CalcState {
  if (state.entry.isActive) {
    if (state.entry.isEnteringImag) {
      if (state.entry.imagIsEnteringExp) {
        return toggleImagExpSign(state);
      }
      const buf = state.entry.imagBuffer;
      const newBuf = buf.startsWith("-") ? buf.slice(1) : "-" + buf;
      return { ...state, entry: { ...state.entry, imagBuffer: newBuf } };
    }
    if (state.entry.isEnteringExp) return toggleExpSign(state);
    const buf = state.entry.buffer;
    const newBuf = buf.startsWith("-") ? buf.slice(1) : "-" + buf;
    return { ...state, entry: { ...state.entry, buffer: newBuf } };
  }
  return applyUnaryOp(state, neg);
}

function toggleImagExpSign(state: CalcState): CalcState {
  const { entry } = state;
  const eIdx = entry.imagBuffer.indexOf("E");
  if (eIdx < 0) return state;
  const mantissa = entry.imagBuffer.slice(0, eIdx + 1);
  const expPart = entry.imagBuffer.slice(eIdx + 1);
  const newExp = expPart.startsWith("-") ? expPart.slice(1) : "-" + expPart;
  return { ...state, entry: { ...entry, imagBuffer: mantissa + newExp } };
}
