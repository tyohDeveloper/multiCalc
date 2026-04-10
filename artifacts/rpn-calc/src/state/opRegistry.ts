import { mathRegistry } from "./mathRegistry";
import { trigRegistry } from "./trigRegistry";
import { stackRegistry } from "./stackRegistry";
import { toggleSign } from "../logic/input/toggleSign";
import type { CalcState } from "./calculatorState";

export type StateOp = (state: CalcState) => CalcState;

export const opRegistry: Record<string, StateOp> = {
  ...mathRegistry,
  ...trigRegistry,
  ...stackRegistry,
  TOGGLE_SIGN: toggleSign,
};
