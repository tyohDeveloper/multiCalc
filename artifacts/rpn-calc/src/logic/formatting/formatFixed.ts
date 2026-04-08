import { formatSpecial } from "../shared/formatSpecial";

export function formatFixed(value: number, precision: number): string {
  if (!isFinite(value)) return formatSpecial(value);
  return value.toFixed(Math.max(0, Math.min(11, precision)));
}
