import { fromRadians } from "../shared/fromRadians";
import type { AngleMode } from "../../state/calculatorState";

export function opAtan(x: number, mode: AngleMode): number {
  return fromRadians(Math.atan(x), mode);
}
