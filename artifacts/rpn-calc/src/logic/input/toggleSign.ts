import { toggleExpSign } from "./toggleExpSign";
import { applyUnaryOp } from "../shared/applyUnaryOp";
import type { CalcState } from "../../state/calculatorState";

export function toggleSign(state: CalcState): CalcState {
  if (state.entry.isActive) {
    if (state.entry.isEnteringExp) return toggleExpSign(state);
    const buf = state.entry.buffer;
    const newBuf = buf.startsWith("-") ? buf.slice(1) : "-" + buf;
    return { ...state, entry: { ...state.entry, buffer: newBuf } };
  }
  return applyUnaryOp(state, (x) => -x);
}
