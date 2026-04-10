import type { Complex } from "../complex/complex";

export function opFloor(x: Complex): Complex {
  return { re: Math.floor(x.re), im: x.im };
}
