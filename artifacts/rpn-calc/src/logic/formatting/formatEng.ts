import { formatSpecial } from "../shared/formatSpecial";

export function formatEng(value: number, precision: number): string {
  if (!isFinite(value)) return formatSpecial(value);
  if (value === 0) return "0." + "0".repeat(precision) + "E0";
  const exp = Math.floor(Math.log10(Math.abs(value)));
  const engExp = Math.floor(exp / 3) * 3;
  const mantissa = value / Math.pow(10, engExp);
  const p = Math.max(0, Math.min(11, precision));
  return mantissa.toFixed(p) + "E" + engExp;
}
