/**
 * Matrix operations for the HP-48 GX inspired RPN calculator.
 *
 * The calculator stack stores Complex scalars. These operations implement
 * HP-48 MATR menu functions on scalar (1×1 matrix) proxies where the
 * operation has a natural scalar equivalent, and return a "Not implemented"
 * error for complex decompositions (SVD, eigenvalue, etc.).
 *
 * When a full matrix type is added, these implementations will be replaced
 * by proper n×m matrix logic; the op codes and registry wiring remain stable.
 */

import type { CalcState } from "../../state/calculatorState";
import { applyUnaryOp } from "../shared/applyUnaryOp";
import { applyBinaryOp } from "../shared/applyBinaryOp";
import { commitEntry } from "../shared/commitEntry";
import type { Complex } from "../complex/complex";
import { cx, NAN_COMPLEX } from "../complex/complex";

// ── Scalar implementations ────────────────────────────────────────────────

/** Transpose: no-op for a scalar (returns x unchanged). */
export function mtrxTrn(x: Complex): Complex {
  return x;
}

/** Determinant: for a scalar, det = the scalar itself. */
export function mtrxDet(x: Complex): Complex {
  return x;
}

/** Inverse: 1/x (scalar matrix inverse). */
export function mtrxInv(x: Complex): Complex {
  const denom = x.re * x.re + x.im * x.im;
  if (denom === 0) return NAN_COMPLEX;
  return { re: x.re / denom, im: -x.im / denom };
}

/** Scalar multiply: y * x (scalar scale of a 1×1 matrix). */
export function mtrxScale(y: Complex, x: Complex): Complex {
  return { re: y.re * x.re - y.im * x.im, im: y.re * x.im + y.im * x.re };
}

/** Matrix add: y + x (element-wise addition, scalar case). */
export function mtrxAdd(y: Complex, x: Complex): Complex {
  return { re: y.re + x.re, im: y.im + x.im };
}

/** Matrix subtract: y - x (element-wise subtraction, scalar case). */
export function mtrxSub(y: Complex, x: Complex): Complex {
  return { re: y.re - x.re, im: y.im - x.im };
}

/** Matrix multiply: y * x (scalar case = ordinary multiply). */
export function mtrxMul(y: Complex, x: Complex): Complex {
  return { re: y.re * x.re - y.im * x.im, im: y.re * x.im + y.im * x.re };
}

/** Row norm (max absolute row sum): for a scalar, |x|. */
export function mtrxRnrm(x: Complex): Complex {
  return cx(Math.sqrt(x.re * x.re + x.im * x.im));
}

/** Column norm (max absolute column sum): for a scalar, |x|. */
export function mtrxCnrm(x: Complex): Complex {
  return cx(Math.sqrt(x.re * x.re + x.im * x.im));
}

/** Trace (sum of diagonal): for a scalar, the scalar itself. */
export function mtrxTrace(x: Complex): Complex {
  return x;
}

// ── Stack-level operations for operations that consume two args ────────────

/** TRAN: conjugate transpose (Hermitian). Scalar: conjugate of x. */
export function mtrxTran(x: Complex): Complex {
  return { re: x.re, im: -x.im };
}

// ── Identity / Constant matrix constructors ───────────────────────────────

/**
 * IDN: push an n×n identity matrix.  For scalar n on the stack, pushes 1
 * (a 1×1 identity) when n=1, or returns NaN for n≠1 (non-scalar identity
 * is a follow-on feature requiring a matrix type).
 */
export function applyMtrxIdn(state: CalcState): CalcState {
  const s = commitEntry(state);
  const n = s.stack[0];
  if (n.im !== 0 || n.re !== Math.round(n.re) || n.re < 1) {
    return { ...s, error: "Bad argument", enterFlag: false };
  }
  const result = n.re === 1 ? cx(1) : NAN_COMPLEX;
  if (result.re !== result.re) {
    return { ...s, error: "Matrix type required", enterFlag: false };
  }
  return {
    ...s,
    stack: [result, s.stack[1], s.stack[2], s.stack[3]],
    lastX: n,
    enterFlag: false,
    error: null,
  };
}

/**
 * CON: constant matrix (fills n×m matrix with a constant).
 * Stub: not yet supported without a matrix type.
 */
export function applyMtrxCon(state: CalcState): CalcState {
  return { ...commitEntry(state), error: "Matrix type required", enterFlag: false };
}

// ── Decomposition stubs ───────────────────────────────────────────────────

function notImplemented(state: CalcState): CalcState {
  return { ...commitEntry(state), error: "Not implemented", enterFlag: false };
}

/** Residual (RSD): stub. */
export const applyMtrxRsd = notImplemented;

/** Singular value decomposition (SVD): stub. */
export const applyMtrxSvd = notImplemented;

/** Schur decomposition (SCHUR): stub. */
export const applyMtrxSchur = notImplemented;

/** Eigenvalues (EIGV): stub. */
export const applyMtrxEigv = notImplemented;

/** LU decomposition (LU): stub. */
export const applyMtrxLu = notImplemented;

/** QR decomposition (QR): stub. */
export const applyMtrxQr = notImplemented;

// ── Convenience wrappers for the registry ────────────────────────────────

export function applyMtrxTrn(state: CalcState): CalcState {
  return applyUnaryOp(state, mtrxTrn);
}
export function applyMtrxDet(state: CalcState): CalcState {
  return applyUnaryOp(state, mtrxDet);
}
export function applyMtrxInv(state: CalcState): CalcState {
  return applyUnaryOp(state, mtrxInv);
}
export function applyMtrxScale(state: CalcState): CalcState {
  return applyBinaryOp(state, mtrxScale);
}
export function applyMtrxAdd(state: CalcState): CalcState {
  return applyBinaryOp(state, mtrxAdd);
}
export function applyMtrxSub(state: CalcState): CalcState {
  return applyBinaryOp(state, mtrxSub);
}
export function applyMtrxMul(state: CalcState): CalcState {
  return applyBinaryOp(state, mtrxMul);
}
export function applyMtrxRnrm(state: CalcState): CalcState {
  return applyUnaryOp(state, mtrxRnrm);
}
export function applyMtrxCnrm(state: CalcState): CalcState {
  return applyUnaryOp(state, mtrxCnrm);
}
export function applyMtrxTrace(state: CalcState): CalcState {
  return applyUnaryOp(state, mtrxTrace);
}
export function applyMtrxTran(state: CalcState): CalcState {
  return applyUnaryOp(state, mtrxTran);
}
