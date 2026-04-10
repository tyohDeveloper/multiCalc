import type { Complex } from "../complex/complex";

export function opCeil(x: Complex): Complex {
  return { re: Math.ceil(x.re), im: x.im };
}
