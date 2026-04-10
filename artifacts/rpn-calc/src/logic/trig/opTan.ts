import { toRadians } from "../shared/toRadians";
import type { AngleMode } from "../../state/calculatorState";
import type { Complex } from "../complex/complex";
import { tan, isPureReal, cx } from "../complex/complex";

export function opTan(x: Complex, mode: AngleMode): Complex {
  if (isPureReal(x)) {
    return cx(Math.tan(toRadians(x.re, mode)));
  }
  const radRe = toRadians(x.re, mode);
  const radIm = toRadians(x.im, mode);
  return tan({ re: radRe, im: radIm });
}
