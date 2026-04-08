import { useReducer } from "react";
import { calculatorReducer } from "../../state/calculatorReducer";
import { initialState } from "../../state/calculatorState";
import { nextAngleMode } from "../../logic/shared/nextAngleMode";
import { nextDisplayMode } from "../../logic/shared/nextDisplayMode";
import { defaultPrecisionFor } from "../../logic/shared/defaultPrecisionFor";
import { clampPrecision } from "../../logic/shared/clampPrecision";
import { label } from "../../logic/i18n/label";
import { StackDisplay } from "../components/StackDisplay";
import { StatusBar } from "../components/StatusBar";
import { KeyGrid } from "../components/KeyGrid";

export function HP48Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const cycleAngle = () => dispatch({ type: "ANGLE_MODE", mode: nextAngleMode(state.angleMode) });
  const nextMode = nextDisplayMode(state.displayMode);
  const cycleDisplay = () => dispatch({ type: "DISPLAY_MODE", mode: nextMode, precision: defaultPrecisionFor(nextMode) });
  const increasePrec = () => dispatch({ type: "DISPLAY_MODE", mode: state.displayMode, precision: clampPrecision(state.displayPrecision + 1) });
  const decreasePrec = () => dispatch({ type: "DISPLAY_MODE", mode: state.displayMode, precision: clampPrecision(state.displayPrecision - 1) });
  return (
    <div className="hp48-calculator">
      <div className="hp48-body">
        <div className="hp48-header">
          <span className="hp48-logo">{label("calc-logo")}<span>®</span></span>
          <span className="hp48-brand">{label("calc-model")}</span>
        </div>
        <div className="hp48-display-shell">
          <div className="hp48-screen">
            <StatusBar state={state} onCycleAngleMode={cycleAngle} onCycleDisplayMode={cycleDisplay} onIncreasePrecision={increasePrec} onDecreasePrecision={decreasePrec} />
            <StackDisplay state={state} />
          </div>
        </div>
        <KeyGrid isShifted={state.isShifted} dispatch={dispatch} />
      </div>
    </div>
  );
}
