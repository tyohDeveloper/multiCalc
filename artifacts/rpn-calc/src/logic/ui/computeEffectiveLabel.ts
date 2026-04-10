import { DYNAMIC_SHIFT_LABELS } from "../../config/featureFlags";
import type { ShiftState } from "../../state/calculatorState";

export interface KeyLabelData {
  labelKey: string;
  topMagenta?: string;
  topCyan?: string;
  topMerged?: string;
  topMagentaMerged?: string;
  alphaChar?: string;
}

export function computeEffectiveLabel(key: KeyLabelData, shiftState: ShiftState): string | undefined {
  if (!DYNAMIC_SHIFT_LABELS) {
    return undefined;
  }

  if (shiftState === "shiftedMagenta") {
    const magentaText = key.topMagentaMerged ?? key.topMagenta;
    if (magentaText) {
      return magentaText;
    }
    return undefined;
  }

  if (shiftState === "shiftedCyan") {
    const cyanText = key.topMerged ?? key.topCyan;
    if (cyanText) {
      return cyanText;
    }
    return undefined;
  }

  if (shiftState === "shiftedBottom") {
    if (key.alphaChar) {
      return key.alphaChar;
    }
    return undefined;
  }

  return undefined;
}
