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

type StateOp = (state: CalcState) => CalcState;

export const mathRegistry: Record<string, StateOp> = {
  ADD: s => applyBinaryOp(s, opAdd),
  SUBTRACT: s => applyBinaryOp(s, opSubtract),
  MULTIPLY: s => applyBinaryOp(s, opMultiply),
  DIVIDE: s => applyBinaryOp(s, opDivide),
  POWER: s => applyBinaryOp(s, opPower),
  XROOT: s => applyBinaryOp(s, opXroot),
  SQRT: s => applyUnaryOp(s, opSqrt),
  SQUARE: s => applyUnaryOp(s, opSquare),
  EXP: s => applyUnaryOp(s, opExp),
  LN: s => applyUnaryOp(s, opLn),
  LOG: s => applyUnaryOp(s, opLog),
  TENPOW: s => applyUnaryOp(s, opTenPow),
  RECIPROCAL: s => applyUnaryOp(s, opReciprocal),
  PI: s => applyPushConstant(s, Math.PI),
  E_CONST: s => applyPushConstant(s, Math.E),
  PERCENT: s => applyPreservingYOp(s, opPercent),
  PERCENT_CHANGE: s => applyPreservingYOp(s, opPercentChange),
};
