import { applyDrop } from "../logic/stack/applyDrop";
import { applySwap } from "../logic/stack/applySwap";
import { applyRollUp } from "../logic/stack/applyRollUp";
import { applyRollDown } from "../logic/stack/applyRollDown";
import { applyClearStack } from "../logic/stack/applyClearStack";
import { applyLastX } from "../logic/stack/applyLastX";
import type { CalcState } from "./calculatorState";

export function applyStackOp(state: CalcState, op: string): CalcState | null {
  if (op === "DROP") return applyDrop(state);
  if (op === "SWAP") return applySwap(state);
  if (op === "ROLL_UP") return applyRollUp(state);
  if (op === "ROLL_DOWN") return applyRollDown(state);
  if (op === "CLEAR") return applyClearStack(state);
  if (op === "LAST_X") return applyLastX(state);
  return null;
}
