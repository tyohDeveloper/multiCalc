import { applyUnaryOp } from "../logic/shared/applyUnaryOp";
import { opSin } from "../logic/trig/opSin";
import { opCos } from "../logic/trig/opCos";
import { opTan } from "../logic/trig/opTan";
import { opAsin } from "../logic/trig/opAsin";
import { opAcos } from "../logic/trig/opAcos";
import { opAtan } from "../logic/trig/opAtan";
import type { CalcState, AngleMode } from "./calculatorState";

type TrigFn = (x: number, mode: AngleMode) => number;
const TRIG: Record<string, TrigFn> = {
  SIN: opSin, COS: opCos, TAN: opTan, ASIN: opAsin, ACOS: opAcos, ATAN: opAtan,
};

export function applyTrigOp(state: CalcState, op: string): CalcState | null {
  const fn = TRIG[op];
  if (!fn) return null;
  const mode = state.angleMode;
  return applyUnaryOp(state, (x) => fn(x, mode));
}
