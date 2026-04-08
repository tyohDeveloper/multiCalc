import type { AngleMode } from "../../state/calculatorState";

export function fromRadians(radians: number, mode: AngleMode): number {
  if (mode === "RAD") return radians;
  if (mode === "GRAD") return (radians * 200) / Math.PI;
  return (radians * 180) / Math.PI;
}
