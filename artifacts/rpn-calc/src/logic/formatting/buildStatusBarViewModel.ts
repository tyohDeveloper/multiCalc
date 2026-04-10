import { t } from "../i18n/t";
import { label } from "../i18n/label";
import displayModesData from "../../data/displayModes.json";
import type { CalcState, DisplayMode } from "../../state/calculatorState";

function modeHasPrecision(mode: DisplayMode): boolean {
  return displayModesData.modes.find((m) => m.id === mode)?.hasPrecision ?? false;
}

export interface StatusBarVM {
  angleLabel: string;
  displayLabel: string;
  hasPrecision: boolean;
  precision: number;
  precDownLabel: string;
  precUpLabel: string;
  isShifted: boolean;
}

export function buildStatusBarViewModel(state: CalcState): StatusBarVM {
  const isShifted = state.shiftState !== "unshifted";
  return {
    angleLabel: isShifted ? t("shift-active") : t(`angle-${state.angleMode.toLowerCase()}`),
    displayLabel: t(`display-${state.displayMode.toLowerCase()}`),
    hasPrecision: modeHasPrecision(state.displayMode),
    precision: state.displayPrecision,
    precDownLabel: label("prec-down"),
    precUpLabel: label("prec-up"),
    isShifted,
  };
}
