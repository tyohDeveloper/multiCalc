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
import { opAbs } from "../logic/math/opAbs";
import { opCeil } from "../logic/math/opCeil";
import { opFloor } from "../logic/math/opFloor";
import { opSign } from "../logic/math/opSign";
import { opMod } from "../logic/math/opMod";
import { opIntDiv } from "../logic/math/opIntDiv";
import { opMax } from "../logic/math/opMax";
import { opMin } from "../logic/math/opMin";
import { cx } from "../logic/complex/complex";
import type { MathOpCode } from "./opCodes";
import type { CalcState } from "./calculatorState";

type StateOp = (state: CalcState) => CalcState;

export const mathRegistry: Record<MathOpCode, StateOp> = {
  ADD: s => applyBinaryOp(s, opAdd),
  SUBTRACT: s => applyBinaryOp(s, opSubtract),
  MULTIPLY: s => applyBinaryOp(s, opMultiply),
  DIVIDE: s => applyBinaryOp(s, opDivide),
  POWER: s => applyBinaryOp(s, opPower),
  XROOT: s => applyBinaryOp(s, opXroot),
  MOD: s => applyBinaryOp(s, opMod),
  INTDIV: s => applyBinaryOp(s, opIntDiv),
  MAX: s => applyBinaryOp(s, opMax),
  MIN: s => applyBinaryOp(s, opMin),
  SQRT: s => applyUnaryOp(s, opSqrt),
  SQUARE: s => applyUnaryOp(s, opSquare),
  EXP: s => applyUnaryOp(s, opExp),
  LN: s => applyUnaryOp(s, opLn),
  LOG: s => applyUnaryOp(s, opLog),
  TENPOW: s => applyUnaryOp(s, opTenPow),
  RECIPROCAL: s => applyUnaryOp(s, opReciprocal),
  ABS: s => applyUnaryOp(s, opAbs),
  CEIL: s => applyUnaryOp(s, opCeil),
  FLOOR: s => applyUnaryOp(s, opFloor),
  SIGN: s => applyUnaryOp(s, opSign),
  PI: s => applyPushConstant(s, cx(Math.PI)),
  E_CONST: s => applyPushConstant(s, cx(Math.E)),
  PERCENT: s => applyPreservingYOp(s, opPercent),
  PERCENT_CHANGE: s => applyPreservingYOp(s, opPercentChange),
};
