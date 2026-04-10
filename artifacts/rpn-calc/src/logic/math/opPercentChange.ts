import type { Complex } from "../complex/complex";
import { NAN_COMPLEX } from "../complex/complex";

export function opPercentChange(y: Complex, x: Complex): Complex {
  if (y.re === 0) return NAN_COMPLEX;
  return { re: ((x.re - y.re) / y.re) * 100, im: 0 };
}
