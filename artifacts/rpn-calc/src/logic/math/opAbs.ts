import type { Complex } from "../complex/complex";
import { abs } from "../complex/complex";

export function opAbs(x: Complex): Complex {
  return abs(x);
}
