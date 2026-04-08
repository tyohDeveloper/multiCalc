import { toRadians } from "../shared/toRadians";
import type { AngleMode } from "../../state/calculatorState";

export function opSin(x: number, mode: AngleMode): number {
  return Math.sin(toRadians(x, mode));
}
