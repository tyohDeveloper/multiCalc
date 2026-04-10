import type { Complex } from "../complex/complex";
import { sub } from "../complex/complex";

export function opSubtract(y: Complex, x: Complex): Complex {
  return sub(y, x);
}
