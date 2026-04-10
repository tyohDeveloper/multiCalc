import type { Complex } from "../complex/complex";

export function opSign(x: Complex): Complex {
  return { re: Math.sign(x.re), im: 0 };
}
