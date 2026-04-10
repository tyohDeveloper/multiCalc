import type { Complex } from "../complex/complex";
import { pow, reciprocal } from "../complex/complex";

export function opXroot(y: Complex, x: Complex): Complex {
  return pow(y, reciprocal(x));
}
