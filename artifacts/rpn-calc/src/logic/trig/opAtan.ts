import { fromRadians } from "../shared/fromRadians";
import type { AngleMode } from "../../state/calculatorState";
import type { Complex } from "../complex/complex";
import { atan, isPureReal } from "../complex/complex";

export function opAtan(x: Complex, mode: AngleMode): Complex {
  if (isPureReal(x)) {
    return { re: fromRadians(Math.atan(x.re), mode), im: 0 };
  }
  const radVal = atan(x);
  return { re: fromRadians(radVal.re, mode), im: fromRadians(radVal.im, mode) };
}
