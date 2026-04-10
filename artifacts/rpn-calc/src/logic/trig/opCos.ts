import { toRadians } from "../shared/toRadians";
import type { AngleMode } from "../../state/calculatorState";
import type { Complex } from "../complex/complex";
import { cos, isPureReal, cx } from "../complex/complex";

export function opCos(x: Complex, mode: AngleMode): Complex {
  if (isPureReal(x)) {
    return cx(Math.cos(toRadians(x.re, mode)));
  }
  const radRe = toRadians(x.re, mode);
  const radIm = toRadians(x.im, mode);
  return cos({ re: radRe, im: radIm });
}
