import { formatSpecial } from "../shared/formatSpecial";

export function formatSci(value: number, precision: number): string {
  if (!isFinite(value)) return formatSpecial(value);
  return value
    .toExponential(Math.max(0, Math.min(11, precision)))
    .toUpperCase()
    .replace("E+", "E");
}
