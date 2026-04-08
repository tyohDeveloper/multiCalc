import type { DisplayMode } from "../../state/calculatorState";

export function nextDisplayMode(mode: DisplayMode): DisplayMode {
  if (mode === "STD") return "FIX";
  if (mode === "FIX") return "SCI";
  if (mode === "SCI") return "ENG";
  return "STD";
}
