import type { AngleMode } from "../../state/calculatorState";

export function nextAngleMode(mode: AngleMode): AngleMode {
  if (mode === "DEG") return "RAD";
  if (mode === "RAD") return "GRAD";
  return "DEG";
}
