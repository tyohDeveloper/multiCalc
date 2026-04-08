import { applyMathOp } from "./applyMathOp";
import { applyTrigOp } from "./applyTrigOp";
import { applyStackOp } from "./applyStackOp";
import { toggleSign } from "../logic/input/toggleSign";
import type { CalcState } from "./calculatorState";

export function applyOp(state: CalcState, op: string): CalcState {
  if (op === "TOGGLE_SIGN") return toggleSign(state);
  return (
    applyMathOp(state, op) ??
    applyTrigOp(state, op) ??
    applyStackOp(state, op) ??
    state
  );
}
