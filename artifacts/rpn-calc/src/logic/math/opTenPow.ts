import type { Complex } from "../complex/complex";
import { pow, cx } from "../complex/complex";

export function opTenPow(x: Complex): Complex {
  return pow(cx(10), x);
}
