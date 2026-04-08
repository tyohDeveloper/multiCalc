import { formatSpecial } from "../shared/formatSpecial";

export function formatStd(value: number): string {
  if (!isFinite(value)) return formatSpecial(value);
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs >= 1e-4 && abs < 1e12) {
    return String(parseFloat(value.toPrecision(12)));
  }
  const s = value.toExponential(11).replace(/\.?0+(e)/, "$1");
  return s.replace("e+", "E").replace("e-", "E-").replace("e", "E");
}
