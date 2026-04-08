import { fromRadians } from "../shared/fromRadians";
import type { AngleMode } from "../../state/calculatorState";

export function opAcos(x: number, mode: AngleMode): number {
  return fromRadians(Math.acos(x), mode);
}
