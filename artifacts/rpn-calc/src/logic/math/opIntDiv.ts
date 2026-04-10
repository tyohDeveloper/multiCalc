import type { Complex } from "../complex/complex";

export function opIntDiv(y: Complex, x: Complex): Complex {
  return { re: Math.trunc(y.re / x.re), im: 0 };
}
