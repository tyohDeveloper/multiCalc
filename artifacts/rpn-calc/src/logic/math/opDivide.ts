import type { Complex } from "../complex/complex";
import { div } from "../complex/complex";

export function opDivide(y: Complex, x: Complex): Complex {
  return div(y, x);
}
