import type { Complex } from "../complex/complex";
import { ln } from "../complex/complex";

export function opLn(x: Complex): Complex {
  return ln(x);
}
