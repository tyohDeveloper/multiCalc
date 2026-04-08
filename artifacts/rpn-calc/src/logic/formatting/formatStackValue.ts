import { formatStd } from "./formatStd";
import { formatFixed } from "./formatFixed";
import { formatSci } from "./formatSci";
import { formatEng } from "./formatEng";
import type { DisplayMode } from "../../state/calculatorState";

export function formatStackValue(value: number, mode: DisplayMode, precision: number): string {
  if (mode === "FIX") return formatFixed(value, precision);
  if (mode === "SCI") return formatSci(value, precision);
  if (mode === "ENG") return formatEng(value, precision);
  return formatStd(value);
}
