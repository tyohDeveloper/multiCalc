import { useReducer } from "react";
import { calculatorReducer } from "../../state/calculatorReducer";
import { initialState } from "../../state/calculatorState";
import { StackDisplay } from "../components/StackDisplay";
import { StatusBar } from "../components/StatusBar";
import { KeyGrid } from "../components/KeyGrid";

export function HP48Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  return (
    <div className="hp48-calculator">
      <div className="hp48-body">
        <div className="hp48-header">
          <span className="hp48-brand">HP 48GX</span>
        </div>
        <div className="hp48-screen">
          <StatusBar state={state} />
          <StackDisplay state={state} />
        </div>
        <KeyGrid isShifted={state.isShifted} dispatch={dispatch} />
      </div>
    </div>
  );
}
