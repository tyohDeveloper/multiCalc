import { t } from "../../logic/i18n/t";
import type { CalcState } from "../../state/calculatorState";

interface Props {
  state: CalcState;
}

export function StatusBar({ state }: Props) {
  return (
    <div className="status-bar">
      <span className={`angle-mode ${state.isShifted ? "shifted" : ""}`}>
        {state.isShifted ? t("shift-active") : t(`angle-${state.angleMode.toLowerCase()}`)}
      </span>
      <span className="display-mode">{t(`display-${state.displayMode.toLowerCase()}`)}</span>
    </div>
  );
}
