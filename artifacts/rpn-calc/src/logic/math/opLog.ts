import type { Complex } from "../complex/complex";
import { log10 } from "../complex/complex";

export function opLog(x: Complex): Complex {
  return log10(x);
}
