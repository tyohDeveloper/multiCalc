import type { Complex } from "../complex/complex";
import { add } from "../complex/complex";

export function opAdd(y: Complex, x: Complex): Complex {
  return add(y, x);
}
