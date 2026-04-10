import type { Complex } from "../complex/complex";
import { mul } from "../complex/complex";

export function opMultiply(y: Complex, x: Complex): Complex {
  return mul(y, x);
}
