import type { Complex } from "../complex/complex";

export function opMax(y: Complex, x: Complex): Complex {
  return { re: Math.max(y.re, x.re), im: 0 };
}
