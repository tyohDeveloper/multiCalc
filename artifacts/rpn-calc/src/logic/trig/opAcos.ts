import { fromRadians } from "../shared/fromRadians";
import type { AngleMode } from "../../state/calculatorState";
import type { Complex } from "../complex/complex";
import { acos, isPureReal } from "../complex/complex";

export function opAcos(x: Complex, mode: AngleMode): Complex {
  if (isPureReal(x)) {
    const v = x.re;
    if (v >= -1 && v <= 1) return { re: fromRadians(Math.acos(v), mode), im: 0 };
  }
  const radVal = acos(x);
  return { re: fromRadians(radVal.re, mode), im: fromRadians(radVal.im, mode) };
}
