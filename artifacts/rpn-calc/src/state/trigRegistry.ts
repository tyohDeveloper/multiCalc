import { applyUnaryOp } from "../logic/shared/applyUnaryOp";
import { opSin } from "../logic/trig/opSin";
import { opCos } from "../logic/trig/opCos";
import { opTan } from "../logic/trig/opTan";
import { opAsin } from "../logic/trig/opAsin";
import { opAcos } from "../logic/trig/opAcos";
import { opAtan } from "../logic/trig/opAtan";
import type { CalcState } from "./calculatorState";

type StateOp = (state: CalcState) => CalcState;

export const trigRegistry: Record<string, StateOp> = {
  SIN: s => applyUnaryOp(s, x => opSin(x, s.angleMode)),
  COS: s => applyUnaryOp(s, x => opCos(x, s.angleMode)),
  TAN: s => applyUnaryOp(s, x => opTan(x, s.angleMode)),
  ASIN: s => applyUnaryOp(s, x => opAsin(x, s.angleMode)),
  ACOS: s => applyUnaryOp(s, x => opAcos(x, s.angleMode)),
  ATAN: s => applyUnaryOp(s, x => opAtan(x, s.angleMode)),
};
