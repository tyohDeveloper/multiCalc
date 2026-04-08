import { t } from "../i18n/t";
import { label } from "../i18n/label";
import type { CalcState } from "../../state/calculatorState";

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
  return {
    angleLabel: state.isShifted ? t("shift-active") : t(`angle-${state.angleMode.toLowerCase()}`),
    displayLabel: t(`display-${state.displayMode.toLowerCase()}`),
    hasPrecision: state.displayMode !== "STD",
    precision: state.displayPrecision,
    precDownLabel: label("prec-down"),
    precUpLabel: label("prec-up"),
    isShifted: state.isShifted,
  };
}
