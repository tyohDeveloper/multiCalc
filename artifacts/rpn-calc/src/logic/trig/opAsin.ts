import { fromRadians } from "../shared/fromRadians";
import type { AngleMode } from "../../state/calculatorState";
import type { Complex } from "../complex/complex";
import { asin, isPureReal } from "../complex/complex";

export function opAsin(x: Complex, mode: AngleMode): Complex {
  if (isPureReal(x)) {
    const v = x.re;
    if (v >= -1 && v <= 1) return { re: fromRadians(Math.asin(v), mode), im: 0 };
  }
  const radVal = asin(x);
  return { re: fromRadians(radVal.re, mode), im: fromRadians(radVal.im, mode) };
}
