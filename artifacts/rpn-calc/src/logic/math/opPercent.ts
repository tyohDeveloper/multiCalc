import type { Complex } from "../complex/complex";

export function opPercent(y: Complex, x: Complex): Complex {
  return { re: (y.re * x.re) / 100, im: 0 };
}
