import { buildStatusBarViewModel } from "../../logic/formatting/buildStatusBarViewModel";
import type { CalcState } from "../../state/calculatorState";

interface Props {
  state: CalcState;
  onCycleAngleMode: () => void;
  onCycleDisplayMode: () => void;
  onIncreasePrecision: () => void;
  onDecreasePrecision: () => void;
}

export function StatusBar({ state, onCycleAngleMode, onCycleDisplayMode, onIncreasePrecision, onDecreasePrecision }: Props) {
  const vm = buildStatusBarViewModel(state);
  return (
    <div className="status-bar">
      <button className={`status-badge angle-mode${vm.isShifted ? " shifted" : ""}`} onClick={onCycleAngleMode} type="button">{vm.angleLabel}</button>
      <div className="status-right">
        {vm.hasPrecision && <button className="status-prec-btn" onClick={onDecreasePrecision} type="button">{vm.precDownLabel}</button>}
        {vm.hasPrecision && <span className="status-prec">{vm.precision}</span>}
        {vm.hasPrecision && <button className="status-prec-btn" onClick={onIncreasePrecision} type="button">{vm.precUpLabel}</button>}
        <button className="status-badge display-mode" onClick={onCycleDisplayMode} type="button">{vm.displayLabel}</button>
      </div>
    </div>
  );
}
