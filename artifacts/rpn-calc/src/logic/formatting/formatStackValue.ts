import { formatStd } from "./formatStd";
import { formatFixed } from "./formatFixed";
import { formatSci } from "./formatSci";
import { formatEng } from "./formatEng";
import type { DisplayMode } from "../../state/calculatorState";
import type { Complex } from "../complex/complex";
import { formatSpecial } from "../shared/formatSpecial";

function formatReal(value: number, mode: DisplayMode, precision: number): string {
  if (mode === "FIX") return formatFixed(value, precision);
  if (mode === "SCI") return formatSci(value, precision);
  if (mode === "ENG") return formatEng(value, precision);
  return formatStd(value);
}

export function formatStackValue(value: Complex, mode: DisplayMode, precision: number): string {
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
