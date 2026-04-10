import type { Complex } from "../complex/complex";
import { pow } from "../complex/complex";

export function opPower(y: Complex, x: Complex): Complex {
  return pow(y, x);
}
