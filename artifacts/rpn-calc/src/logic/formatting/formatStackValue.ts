import { formatStd } from "./formatStd";
import { formatFixed } from "./formatFixed";
import { formatSci } from "./formatSci";
import { formatEng } from "./formatEng";
import type { DisplayMode } from "../../state/calculatorState";
import type { StackValue } from "../../state/calculatorState";
import type { Complex } from "../complex/complex";
import { formatSpecial } from "../shared/formatSpecial";
import { isMatrix } from "../matrix/matrixType";
import type { Matrix } from "../matrix/matrixType";

function formatReal(value: number, mode: DisplayMode, precision: number): string {
  if (mode === "FIX") return formatFixed(value, precision);
  if (mode === "SCI") return formatSci(value, precision);
  if (mode === "ENG") return formatEng(value, precision);
  return formatStd(value);
}

function formatComplexValue(value: Complex, mode: DisplayMode, precision: number): string {
  const { re, im } = value;

  if (isNaN(re) || isNaN(im)) {
    return formatSpecial(NaN);
  }

  if (im === 0) {
    return formatReal(re, mode, precision);
  }

  const reStr = formatReal(re, mode, precision);
  const absIm = Math.abs(im);
  const imStr = formatReal(absIm, mode, precision);
  const sign = im < 0 ? " - " : " + ";
  return `${reStr}${sign}${imStr}i`;
}

function formatMatrixValue(m: Matrix, mode: DisplayMode, precision: number): string {
  if (m.rows === 0 || m.cols === 0) return "[[ ]]";
  const rows = m.data.map(row =>
    row.map(v => formatReal(v, mode, precision)).join("  ")
  );
  return `[[ ${rows.join(" ; ")} ]]`;
}

export function formatStackValue(value: StackValue, mode: DisplayMode, precision: number): string {
  if (isMatrix(value)) {
    return formatMatrixValue(value, mode, precision);
  }
  return formatComplexValue(value as Complex, mode, precision);
}
