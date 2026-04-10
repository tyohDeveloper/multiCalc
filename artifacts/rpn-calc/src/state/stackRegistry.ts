import { applyDrop } from "../logic/stack/applyDrop";
import { applySwap } from "../logic/stack/applySwap";
import { applyRollUp } from "../logic/stack/applyRollUp";
import { applyRollDown } from "../logic/stack/applyRollDown";
import { applyClearStack } from "../logic/stack/applyClearStack";
import { applyLastX } from "../logic/stack/applyLastX";
import { toggleSign } from "../logic/input/toggleSign";
import type { StackOpCode } from "./opCodes";
import type { CalcState } from "./calculatorState";

type StateOp = (state: CalcState) => CalcState;

export const stackRegistry: Record<StackOpCode, StateOp> = {
  DROP: applyDrop,
  SWAP: applySwap,
  ROLL_UP: applyRollUp,
  ROLL_DOWN: applyRollDown,
  CLEAR: applyClearStack,
  LAST_X: applyLastX,
  TOGGLE_SIGN: toggleSign,
};
