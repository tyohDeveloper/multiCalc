/**
 * Real matrix implementations for MATR_* op codes.
 * Works with the Matrix type (2D array + rows/cols).
 */

import type { CalcState, StackValue } from "../../state/calculatorState";
import { commitEntry } from "../shared/commitEntry";
import type { Complex } from "../complex/complex";
import { cx, ZERO } from "../complex/complex";
import { makeMatrix, makeZeroMatrix, isMatrix } from "./matrixType";
import type { Matrix } from "./matrixType";

// ── Helpers ────────────────────────────────────────────────────────────────

function err(state: CalcState, msg: string): CalcState {
  return { ...state, error: msg, enterFlag: false };
}

function pushMatrix(state: CalcState, m: Matrix): CalcState {
  return {
    ...state,
    stack: [m, state.stack[0], state.stack[1], state.stack[2]],
    enterFlag: false,
    error: null,
  };
}

function replaceX(state: CalcState, v: StackValue, lastX: StackValue): CalcState {
  return {
    ...state,
    stack: [v, state.stack[1], state.stack[2], state.stack[3]],
    lastX,
    enterFlag: false,
    error: null,
  };
}

function popTwo(state: CalcState): { s: CalcState; x: StackValue; y: StackValue } {
  const s = commitEntry(state);
  return { s, x: s.stack[0], y: s.stack[1] };
}

function popOne(state: CalcState): { s: CalcState; x: StackValue } {
  const s = commitEntry(state);
  return { s, x: s.stack[0] };
}

function requireMatrix(v: StackValue): Matrix | null {
  return isMatrix(v) ? v : null;
}

function requireComplex(v: StackValue): Complex | null {
  return !isMatrix(v) ? (v as Complex) : null;
}

function complexToReal(c: Complex): number {
  return c.re;
}

// ── ADD: element-wise or scalar ──────────────────────────────────────────

export function matrAdd(state: CalcState): CalcState {
  const { s, x, y } = popTwo(state);
  const mx = requireMatrix(x);
  const my = requireMatrix(y);
  if (mx && my) {
    if (mx.rows !== my.rows || mx.cols !== my.cols) return err(s, "Dimension mismatch");
    const data = mx.data.map((row, r) => row.map((v, c) => v + my.data[r][c]));
    const result = makeMatrix(data.map(r => [...r]));
    return { ...s, stack: [result, s.stack[2], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
  }
  return err(s, "Matrix required");
}

// ── SUB: element-wise ─────────────────────────────────────────────────────

export function matrSub(state: CalcState): CalcState {
  const { s, x, y } = popTwo(state);
  const mx = requireMatrix(x);
  const my = requireMatrix(y);
  if (mx && my) {
    if (mx.rows !== my.rows || mx.cols !== my.cols) return err(s, "Dimension mismatch");
    const data = my.data.map((row, r) => row.map((v, c) => v - mx.data[r][c]));
    const result = makeMatrix(data.map(r => [...r]));
    return { ...s, stack: [result, s.stack[2], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
  }
  return err(s, "Matrix required");
}

// ── MUL: matrix multiplication ────────────────────────────────────────────

export function matrMul(state: CalcState): CalcState {
  const { s, x, y } = popTwo(state);
  const mx = requireMatrix(x);
  const my = requireMatrix(y);
  if (mx && my) {
    if (my.cols !== mx.rows) return err(s, "Dimension mismatch");
    const data: number[][] = [];
    for (let r = 0; r < my.rows; r++) {
      const row: number[] = [];
      for (let c = 0; c < mx.cols; c++) {
        let sum = 0;
        for (let k = 0; k < my.cols; k++) {
          sum += my.data[r][k] * mx.data[k][c];
        }
        row.push(sum);
      }
      data.push(row);
    }
    const result = makeMatrix(data);
    return { ...s, stack: [result, s.stack[2], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
  }
  return err(s, "Matrix required");
}

// ── TRN: transpose ────────────────────────────────────────────────────────

export function matrTrn(state: CalcState): CalcState {
  const { s, x } = popOne(state);
  const mx = requireMatrix(x);
  if (!mx) return err(s, "Matrix required");
  const data: number[][] = [];
  for (let c = 0; c < mx.cols; c++) {
    const row: number[] = [];
    for (let r = 0; r < mx.rows; r++) {
      row.push(mx.data[r][c]);
    }
    data.push(row);
  }
  return replaceX(s, makeMatrix(data), x);
}

// ── DET: determinant (square matrices only) ───────────────────────────────

function detRecursive(m: number[][]): number {
  const n = m.length;
  if (n === 1) return m[0][0];
  if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  let result = 0;
  for (let c = 0; c < n; c++) {
    const minor = m.slice(1).map(row => row.filter((_, j) => j !== c));
    result += (c % 2 === 0 ? 1 : -1) * m[0][c] * detRecursive(minor);
  }
  return result;
}

export function matrDet(state: CalcState): CalcState {
  const { s, x } = popOne(state);
  const mx = requireMatrix(x);
  if (!mx) return err(s, "Matrix required");
  if (mx.rows !== mx.cols) return err(s, "Square matrix required");
  const d = detRecursive(mx.data.map(r => [...r]));
  return replaceX(s, cx(d), x);
}

// ── TRACE: sum of diagonal ────────────────────────────────────────────────

export function matrTrace(state: CalcState): CalcState {
  const { s, x } = popOne(state);
  const mx = requireMatrix(x);
  if (!mx) return err(s, "Matrix required");
  let trace = 0;
  const n = Math.min(mx.rows, mx.cols);
  for (let i = 0; i < n; i++) trace += mx.data[i][i];
  return replaceX(s, cx(trace), x);
}

// ── IDN: identity matrix of size n ───────────────────────────────────────

export function matrIdn(state: CalcState): CalcState {
  const { s, x } = popOne(state);
  const cx_ = requireComplex(x);
  if (!cx_) return err(s, "Size required");
  const n = Math.round(cx_.re);
  if (n < 1 || !isFinite(n)) return err(s, "Bad argument");
  const data: number[][] = [];
  for (let r = 0; r < n; r++) {
    const row = new Array(n).fill(0);
    row[r] = 1;
    data.push(row);
  }
  return replaceX(s, makeMatrix(data), x);
}

// ── INV: matrix inverse (Gauss-Jordan) ────────────────────────────────────

export function matrInv(state: CalcState): CalcState {
  const { s, x } = popOne(state);
  const mx = requireMatrix(x);
  if (!mx) return err(s, "Matrix required");
  const n = mx.rows;
  if (n !== mx.cols) return err(s, "Square matrix required");

  const aug: number[][] = mx.data.map((row, i) => {
    const identity = new Array(n).fill(0);
    identity[i] = 1;
    return [...row, ...identity];
  });

  for (let col = 0; col < n; col++) {
    let pivotRow = -1;
    for (let r = col; r < n; r++) {
      if (Math.abs(aug[r][col]) > 1e-12) { pivotRow = r; break; }
    }
    if (pivotRow === -1) return err(s, "Singular matrix");
    [aug[col], aug[pivotRow]] = [aug[pivotRow], aug[col]];
    const pivot = aug[col][col];
    for (let j = col; j < 2 * n; j++) aug[col][j] /= pivot;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const factor = aug[r][col];
      for (let j = col; j < 2 * n; j++) aug[r][j] -= factor * aug[col][j];
    }
  }

  const data = aug.map(row => row.slice(n));
  return replaceX(s, makeMatrix(data), x);
}

// ── SIZE: push [rows, cols] as a 1×2 matrix ──────────────────────────────

export function matrSize(state: CalcState): CalcState {
  const { s, x } = popOne(state);
  const mx = requireMatrix(x);
  if (!mx) {
    const sc = requireComplex(x);
    if (sc) return pushMatrix({ ...s, stack: [x, s.stack[1], s.stack[2], s.stack[3]] }, makeMatrix([[1, 1]]));
    return err(s, "Matrix required");
  }
  return pushMatrix({ ...s, stack: [x, s.stack[1], s.stack[2], s.stack[3]] }, makeMatrix([[mx.rows, mx.cols]]));
}

// ── DIM: push rows then cols ──────────────────────────────────────────────

export function matrDim(state: CalcState): CalcState {
  const { s, x } = popOne(state);
  const mx = requireMatrix(x);
  if (!mx) return err(s, "Matrix required");
  const s2: CalcState = { ...s, stack: [x, s.stack[1], s.stack[2], s.stack[3]] };
  const s3: CalcState = { ...s2, stack: [cx(mx.rows), s2.stack[0], s2.stack[1], s2.stack[2]], enterFlag: false, error: null };
  return { ...s3, stack: [cx(mx.cols), s3.stack[0], s3.stack[1], s3.stack[2]] };
}

// ── DOT: vector dot product ───────────────────────────────────────────────

export function matrDot(state: CalcState): CalcState {
  const { s, x, y } = popTwo(state);
  const mx = requireMatrix(x);
  const my = requireMatrix(y);
  if (!mx || !my) return err(s, "Matrix required");
  const xv = mx.data.flat();
  const yv = my.data.flat();
  if (xv.length !== yv.length) return err(s, "Dimension mismatch");
  const dot = xv.reduce((sum, v, i) => sum + v * yv[i], 0);
  return { ...s, stack: [cx(dot), s.stack[2], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
}

// ── CROSS: 3D cross product (1×3 or 3×1 vectors) ─────────────────────────

export function matrCross(state: CalcState): CalcState {
  const { s, x, y } = popTwo(state);
  const mx = requireMatrix(x);
  const my = requireMatrix(y);
  if (!mx || !my) return err(s, "Matrix required");
  const xv = mx.data.flat();
  const yv = my.data.flat();
  if (xv.length !== 3 || yv.length !== 3) return err(s, "3-vector required");
  const [x1, x2, x3] = xv;
  const [y1, y2, y3] = yv;
  const result = makeMatrix([[y2 * x3 - y3 * x2, y3 * x1 - y1 * x3, y1 * x2 - y2 * x1]]);
  return { ...s, stack: [result, s.stack[2], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
}

// ── CON: constant matrix (rows × cols filled with scalar) ─────────────────

export function matrCon(state: CalcState): CalcState {
  const { s, x, y } = popTwo(state);
  const xc = requireComplex(x);
  const my = requireMatrix(y);
  if (!xc || !my) return err(s, "Scalar and size vector required");
  if (my.rows !== 1 || my.cols !== 2) return err(s, "Use [rows cols] → CON");
  const rows = Math.round(my.data[0][0]);
  const cols = Math.round(my.data[0][1]);
  if (rows < 1 || cols < 1) return err(s, "Bad dimensions");
  const val = xc.re;
  const data: number[][] = [];
  for (let r = 0; r < rows; r++) data.push(new Array(cols).fill(val));
  return { ...s, stack: [makeMatrix(data), s.stack[2], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
}

// ── RDM: redimension matrix ───────────────────────────────────────────────

export function matrRdm(state: CalcState): CalcState {
  const { s, x, y } = popTwo(state);
  const mx = requireMatrix(x);
  const my = requireMatrix(y);
  if (!mx || !my) return err(s, "Matrix required");
  if (my.rows !== 1 || my.cols !== 2) return err(s, "Use [rows cols] RDM");
  const newRows = Math.round(my.data[0][0]);
  const newCols = Math.round(my.data[0][1]);
  if (newRows < 1 || newCols < 1) return err(s, "Bad dimensions");
  const flat = mx.data.flat();
  const data: number[][] = [];
  let idx = 0;
  for (let r = 0; r < newRows; r++) {
    const row: number[] = [];
    for (let c = 0; c < newCols; c++) row.push(idx < flat.length ? flat[idx++] : 0);
    data.push(row);
  }
  return { ...s, stack: [makeMatrix(data), s.stack[2], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
}

// ── RANM: random matrix (same shape as TOS matrix) ────────────────────────

export function matrRanm(state: CalcState): CalcState {
  const { s, x } = popOne(state);
  const mx = requireMatrix(x);
  if (!mx) return err(s, "Matrix required");
  const data = mx.data.map(row => row.map(() => Math.random()));
  return replaceX(s, makeMatrix(data), x);
}

// ── →V2: matrix first row/col → 1×2 vector; or two scalars → 1×2 vector ──

export function matrToV2(state: CalcState): CalcState {
  const { s, x } = popOne(state);
  const mx = requireMatrix(x);
  if (mx) {
    const flat = mx.data.flat().slice(0, 2);
    while (flat.length < 2) flat.push(0);
    const result = makeMatrix([flat]);
    return replaceX(s, result, x);
  }
  const xc = requireComplex(x);
  if (!xc) return err(s, "Matrix or scalar required");
  const s2 = commitEntry(state);
  const yc = requireComplex(s2.stack[1]);
  if (!yc) return err(s, "Scalar required for Y");
  const result = makeMatrix([[yc.re, xc.re]]);
  return { ...s2, stack: [result, s2.stack[2], s2.stack[3], s2.stack[3]], lastX: x, enterFlag: false, error: null };
}

// ── →V3: matrix first 3 elements → 1×3 vector; or three scalars → 1×3 ────

export function matrToV3(state: CalcState): CalcState {
  const { s, x } = popOne(state);
  const mx = requireMatrix(x);
  if (mx) {
    const flat = mx.data.flat().slice(0, 3);
    while (flat.length < 3) flat.push(0);
    const result = makeMatrix([flat]);
    return replaceX(s, result, x);
  }
  const s2 = commitEntry(state);
  const xc = requireComplex(s2.stack[0]);
  const yc = requireComplex(s2.stack[1]);
  const zc = requireComplex(s2.stack[2]);
  if (!xc || !yc || !zc) return err(s, "Scalars required");
  const result = makeMatrix([[zc.re, yc.re, xc.re]]);
  return { ...s2, stack: [result, s2.stack[3], s2.stack[3], s2.stack[3]], lastX: s2.stack[0], enterFlag: false, error: null };
}

// ── →MAT / →ARRY / →LIST: type conversion stubs ──────────────────────────

export function matrToMat(state: CalcState): CalcState {
  const { s, x } = popOne(state);
  if (isMatrix(x)) return replaceX(s, x, x);
  return err(s, "Matrix required");
}

export function matrToList(state: CalcState): CalcState {
  const { s, x } = popOne(state);
  const mx = requireMatrix(x);
  if (!mx) return err(s, "Matrix required");
  const flat = mx.data.flat();
  let st: CalcState = { ...s, stack: [s.stack[1], s.stack[2], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
  for (const v of flat) {
    st = { ...st, stack: [cx(v), st.stack[0], st.stack[1], st.stack[2]] };
  }
  return st;
}

export const matrToArry = matrToMat;

// ── ROW+: insert row after given index ────────────────────────────────────

export function matrRowAdd(state: CalcState): CalcState {
  const { s, x, y } = popTwo(state);
  const mc = requireComplex(x);
  const my = requireMatrix(y);
  if (!mc || !my) return err(s, "Matrix and index required");
  const idx = Math.round(mc.re);
  if (idx < 0 || idx > my.rows) return err(s, "Index out of range");
  const newRow: number[] = new Array(my.cols).fill(0);
  const data: number[][] = [...my.data.slice(0, idx).map(r => [...r]), newRow, ...my.data.slice(idx).map(r => [...r])];
  return { ...s, stack: [makeMatrix(data), s.stack[2], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
}

// ── ROW-: delete row at index ─────────────────────────────────────────────

export function matrRowSub(state: CalcState): CalcState {
  const { s, x, y } = popTwo(state);
  const mc = requireComplex(x);
  const my = requireMatrix(y);
  if (!mc || !my) return err(s, "Matrix and index required");
  const idx = Math.round(mc.re) - 1;
  if (idx < 0 || idx >= my.rows) return err(s, "Index out of range");
  const data: number[][] = my.data.filter((_, r) => r !== idx).map(r => [...r]);
  return { ...s, stack: [makeMatrix(data), s.stack[2], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
}

// ── COL+: insert column after given index ────────────────────────────────

export function matrColAdd(state: CalcState): CalcState {
  const { s, x, y } = popTwo(state);
  const mc = requireComplex(x);
  const my = requireMatrix(y);
  if (!mc || !my) return err(s, "Matrix and index required");
  const idx = Math.round(mc.re);
  if (idx < 0 || idx > my.cols) return err(s, "Index out of range");
  const data = my.data.map(row => [...row.slice(0, idx), 0, ...row.slice(idx)]);
  return { ...s, stack: [makeMatrix(data), s.stack[2], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
}

// ── COL-: delete column at index ──────────────────────────────────────────

export function matrColSub(state: CalcState): CalcState {
  const { s, x, y } = popTwo(state);
  const mc = requireComplex(x);
  const my = requireMatrix(y);
  if (!mc || !my) return err(s, "Matrix and index required");
  const idx = Math.round(mc.re) - 1;
  if (idx < 0 || idx >= my.cols) return err(s, "Index out of range");
  const data = my.data.map(row => row.filter((_, c) => c !== idx));
  return { ...s, stack: [makeMatrix(data), s.stack[2], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
}

// ── PUT: put value at [row, col] ──────────────────────────────────────────

export function matrPut(state: CalcState): CalcState {
  const s = commitEntry(state);
  const x = s.stack[0];
  const y = s.stack[1];
  const z = s.stack[2];
  const mz = requireMatrix(z);
  const my = requireMatrix(y);
  const xc = requireComplex(x);
  if (!my || !mz || !xc) return err(s, "Matrix, index, and value required");
  if (my.rows !== 1 || my.cols !== 2) return err(s, "Use [row col] PUT");
  const r = Math.round(my.data[0][0]) - 1;
  const c = Math.round(my.data[0][1]) - 1;
  if (r < 0 || r >= mz.rows || c < 0 || c >= mz.cols) return err(s, "Index out of range");
  const data = mz.data.map((row, ri) => ri === r ? row.map((v, ci) => ci === c ? xc.re : v) : [...row]);
  return { ...s, stack: [makeMatrix(data), s.stack[3], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
}

// ── GET: get value at [row, col] ──────────────────────────────────────────

export function matrGet(state: CalcState): CalcState {
  const { s, x, y } = popTwo(state);
  const mx = requireMatrix(x);
  const my = requireMatrix(y);
  if (!mx || !my) return err(s, "Matrix and index required");
  if (my.rows !== 1 || my.cols !== 2) return err(s, "Use [row col] GET");
  const r = Math.round(my.data[0][0]) - 1;
  const c = Math.round(my.data[0][1]) - 1;
  if (r < 0 || r >= mx.rows || c < 0 || c >= mx.cols) return err(s, "Index out of range");
  return { ...s, stack: [cx(mx.data[r][c]), s.stack[2], s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
}

// ── PUTI: put value at index and increment ────────────────────────────────

export function matrPuti(state: CalcState): CalcState {
  const s = commitEntry(state);
  const x = s.stack[0];
  const y = s.stack[1];
  const z = s.stack[2];
  const mz = requireMatrix(z);
  const my = requireMatrix(y);
  const xc = requireComplex(x);
  if (!my || !mz || !xc) return err(s, "Matrix, index, and value required");
  if (my.rows !== 1 || my.cols !== 2) return err(s, "Use [row col] PUTI");
  const r = Math.round(my.data[0][0]) - 1;
  const c = Math.round(my.data[0][1]) - 1;
  if (r < 0 || r >= mz.rows || c < 0 || c >= mz.cols) return err(s, "Index out of range");
  const data = mz.data.map((row, ri) => ri === r ? row.map((v, ci) => ci === c ? xc.re : v) : [...row]);
  let nextC = c + 2;
  let nextR = r + 1;
  if (nextC > mz.cols) { nextC = 1; nextR = r + 2; }
  const nextIdx = makeMatrix([[nextR, nextC]]);
  return { ...s, stack: [makeMatrix(data), nextIdx, s.stack[3], s.stack[3]], lastX: x, enterFlag: false, error: null };
}

// ── GETI: get value at index and increment ────────────────────────────────

export function matrGeti(state: CalcState): CalcState {
  const { s, x, y } = popTwo(state);
  const mx = requireMatrix(x);
  const my = requireMatrix(y);
  if (!mx || !my) return err(s, "Matrix and index required");
  if (my.rows !== 1 || my.cols !== 2) return err(s, "Use [row col] GETI");
  const r = Math.round(my.data[0][0]) - 1;
  const c = Math.round(my.data[0][1]) - 1;
  if (r < 0 || r >= mx.rows || c < 0 || c >= mx.cols) return err(s, "Index out of range");
  const val = cx(mx.data[r][c]);
  let nextC = c + 2;
  let nextR = r + 1;
  if (nextC > mx.cols) { nextC = 1; nextR = r + 2; }
  const nextIdx = makeMatrix([[nextR, nextC]]);
  return { ...s, stack: [val, nextIdx, mx, s.stack[2]], lastX: x, enterFlag: false, error: null };
}

// ── EDITMAT: open MatrixWriter pre-populated with TOS ─────────────────────

export function matrEditmat(state: CalcState): CalcState {
  const s = commitEntry(state);
  const x = s.stack[0];
  const mx = requireMatrix(x);
  if (!mx) return err(s, "Matrix required");
  return { ...s, matrixWriterOpen: true, matrixWriterSeed: mx };
}

// ── WRITER: open empty MatrixWriter ───────────────────────────────────────

export function matrWriter(state: CalcState): CalcState {
  const s = commitEntry(state);
  return { ...s, matrixWriterOpen: true, matrixWriterSeed: null };
}

// ── NXT / PREV: advance/retreat the MATR menu page ───────────────────────

const MATR_MENU_TOTAL_PAGES = 4;

export function matrNxt(state: CalcState): CalcState {
  const s = commitEntry(state);
  return { ...s, matrMenuPage: (s.matrMenuPage + 1) % MATR_MENU_TOTAL_PAGES };
}

export function matrPrev(state: CalcState): CalcState {
  const s = commitEntry(state);
  return { ...s, matrMenuPage: (s.matrMenuPage - 1 + MATR_MENU_TOTAL_PAGES) % MATR_MENU_TOTAL_PAGES };
}

// ── Stubs ─────────────────────────────────────────────────────────────────

function stub(state: CalcState): CalcState {
  return commitEntry(state);
}

export const matrRref = stub;
export const matrEigen = stub;
export const matrCholesky = stub;
export const matrLu = stub;
export const matrQr = stub;
export const matrSolve = stub;
export const matrSys = stub;
export const matrLinSolve = stub;
