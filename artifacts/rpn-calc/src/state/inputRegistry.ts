import { applyImagSep } from "../logic/input/applyImagSep";
import type { InputOpCode } from "./opCodes";
import type { CalcState } from "./calculatorState";

type StateOp = (state: CalcState) => CalcState;

export const inputRegistry: Record<InputOpCode, StateOp> = {
  IMAG_SEP: applyImagSep,
};
