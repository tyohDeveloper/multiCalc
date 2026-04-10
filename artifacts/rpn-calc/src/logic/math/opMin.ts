import type { Complex } from "../complex/complex";

export function opMin(y: Complex, x: Complex): Complex {
  return { re: Math.min(y.re, x.re), im: 0 };
}
