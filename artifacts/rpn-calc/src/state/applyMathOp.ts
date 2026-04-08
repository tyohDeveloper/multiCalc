import { applyBinaryOp } from "../logic/shared/applyBinaryOp";
import { applyUnaryOp } from "../logic/shared/applyUnaryOp";
import { applyPreservingYOp } from "../logic/shared/applyPreservingYOp";
import { applyPushConstant } from "../logic/shared/applyPushConstant";
import { opAdd } from "../logic/math/opAdd";
import { opSubtract } from "../logic/math/opSubtract";
import { opMultiply } from "../logic/math/opMultiply";
import { opDivide } from "../logic/math/opDivide";
import { opSqrt } from "../logic/math/opSqrt";
import { opSquare } from "../logic/math/opSquare";
import { opPower } from "../logic/math/opPower";
import { opXroot } from "../logic/math/opXroot";
import { opExp } from "../logic/math/opExp";
import { opLn } from "../logic/math/opLn";
import { opLog } from "../logic/math/opLog";
import { opTenPow } from "../logic/math/opTenPow";
import { opReciprocal } from "../logic/math/opReciprocal";
import { opPercent } from "../logic/math/opPercent";
import { opPercentChange } from "../logic/math/opPercentChange";
import type { CalcState } from "./calculatorState";

const BINARY: Record<string, (y: number, x: number) => number> = {
  ADD: opAdd, SUBTRACT: opSubtract, MULTIPLY: opMultiply, DIVIDE: opDivide,
  POWER: opPower, XROOT: opXroot,
};
const UNARY: Record<string, (x: number) => number> = {
  SQRT: opSqrt, SQUARE: opSquare, EXP: opExp, LN: opLn,
  LOG: opLog, TENPOW: opTenPow, RECIPROCAL: opReciprocal,
};

export function applyMathOp(state: CalcState, op: string): CalcState | null {
  if (BINARY[op]) return applyBinaryOp(state, BINARY[op]);
  if (UNARY[op]) return applyUnaryOp(state, UNARY[op]);
  if (op === "PI") return applyPushConstant(state, Math.PI);
  if (op === "E_CONST") return applyPushConstant(state, Math.E);
  if (op === "PERCENT") return applyPreservingYOp(state, opPercent);
  if (op === "PERCENT_CHANGE") return applyPreservingYOp(state, opPercentChange);
  return null;
}
