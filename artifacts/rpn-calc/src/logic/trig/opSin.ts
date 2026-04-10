import { toRadians } from "../shared/toRadians";
import type { AngleMode } from "../../state/calculatorState";
import type { Complex } from "../complex/complex";
import { sin, isPureReal, cx } from "../complex/complex";

export function opSin(x: Complex, mode: AngleMode): Complex {
  if (isPureReal(x)) {
    return cx(Math.sin(toRadians(x.re, mode)));
  }
  const radRe = toRadians(x.re, mode);
  const radIm = toRadians(x.im, mode);
  return sin({ re: radRe, im: radIm });
}
