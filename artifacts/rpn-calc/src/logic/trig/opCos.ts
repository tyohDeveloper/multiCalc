import { toRadians } from "../shared/toRadians";
import type { AngleMode } from "../../state/calculatorState";

export function opCos(x: number, mode: AngleMode): number {
  return Math.cos(toRadians(x, mode));
}
