import displayModesData from "../../data/displayModes.json";
import type { DisplayMode } from "../../state/calculatorState";

const MODE_IDS = displayModesData.modes.map((m) => m.id as DisplayMode);

export function nextDisplayMode(mode: DisplayMode): DisplayMode {
  const idx = MODE_IDS.indexOf(mode);
  return MODE_IDS[(idx + 1) % MODE_IDS.length];
}
