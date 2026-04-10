import type { Complex } from "../complex/complex";
import { mul } from "../complex/complex";

export function opSquare(x: Complex): Complex {
  return mul(x, x);
}
