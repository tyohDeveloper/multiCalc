import type { AngleMode } from "../../state/calculatorState";

export function toRadians(angle: number, mode: AngleMode): number {
  if (mode === "RAD") return angle;
  if (mode === "GRAD") return (angle * Math.PI) / 200;
  return (angle * Math.PI) / 180;
}
