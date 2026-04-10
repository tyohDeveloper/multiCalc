import type { Complex } from "../complex/complex";

export function opMod(y: Complex, x: Complex): Complex {
  const yr = y.re;
  const xr = x.re;
  return { re: yr - xr * Math.floor(yr / xr), im: 0 };
}
