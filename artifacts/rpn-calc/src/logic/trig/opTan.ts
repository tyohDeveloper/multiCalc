import { toRadians } from "../shared/toRadians";
import type { AngleMode } from "../../state/calculatorState";

export function opTan(x: number, mode: AngleMode): number {
  return Math.tan(toRadians(x, mode));
}
