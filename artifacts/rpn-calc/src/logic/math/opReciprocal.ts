import type { Complex } from "../complex/complex";
import { reciprocal } from "../complex/complex";

export function opReciprocal(x: Complex): Complex {
  return reciprocal(x);
}
