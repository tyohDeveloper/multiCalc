import displayModesData from "../../data/displayModes.json";
import type { DisplayMode } from "../../state/calculatorState";

export function defaultPrecisionFor(mode: DisplayMode): number {
  const entry = displayModesData.modes.find((m) => m.id === mode);
  return entry?.hasPrecision ? (entry.defaultPrecision ?? 4) : 4;
}
