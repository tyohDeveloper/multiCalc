import { t } from "../../logic/i18n/t";
import type { CalcState } from "../../state/calculatorState";

interface Props {
  state: CalcState;
  onCycleAngleMode: () => void;
  onCycleDisplayMode: () => void;
  onIncreasePrecision: () => void;
  onDecreasePrecision: () => void;
}

export function StatusBar({ state, onCycleAngleMode, onCycleDisplayMode, onIncreasePrecision, onDecreasePrecision }: Props) {
  const angleLabel = state.isShifted ? t("shift-active") : t(`angle-${state.angleMode.toLowerCase()}`);
  const dispLabel = t(`display-${state.displayMode.toLowerCase()}`);
  const hasPrecision = state.displayMode !== "STD";
  return (
    <div className="status-bar">
      <button className={`status-badge angle-mode${state.isShifted ? " shifted" : ""}`} onClick={onCycleAngleMode} type="button">{angleLabel}</button>
      <div className="status-right">
        {hasPrecision && <button className="status-prec-btn" onClick={onDecreasePrecision} type="button">▼</button>}
        {hasPrecision && <span className="status-prec">{state.displayPrecision}</span>}
        {hasPrecision && <button className="status-prec-btn" onClick={onIncreasePrecision} type="button">▲</button>}
        <button className="status-badge display-mode" onClick={onCycleDisplayMode} type="button">{dispLabel}</button>
      </div>
    </div>
  );
}
