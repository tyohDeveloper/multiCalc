import type { Complex } from "../complex/complex";
import { exp } from "../complex/complex";

export function opExp(x: Complex): Complex {
  return exp(x);
}
