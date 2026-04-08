import { applyDigit } from "../logic/input/applyDigit";
import { applyDecimal } from "../logic/input/applyDecimal";
import { applyEex } from "../logic/input/applyEex";
import { applyBackspace } from "../logic/input/applyBackspace";
import { applyEnter } from "../logic/stack/applyEnter";
import { applyOp } from "./applyOp";
import type { CalcState, CalcAction } from "./calculatorState";

export function calculatorReducer(state: CalcState, action: CalcAction): CalcState {
  if (state.error && action.type !== "CLEAR_ERROR" && action.type !== "OP") {
    if (action.type === "DIGIT" || action.type === "DECIMAL") {
      return { ...state, error: null };
    }
    return state;
  }
  switch (action.type) {
    case "DIGIT": return applyDigit(state, action.digit);
    case "DECIMAL": return applyDecimal(state);
    case "EEX": return applyEex(state);
    case "BACKSPACE": return applyBackspace(state);
    case "ENTER": return applyEnter(state);
    case "SHIFT": return { ...state, isShifted: !state.isShifted };
    case "OP": return applyOp({ ...state, isShifted: false }, action.op);
    case "ANGLE_MODE": return { ...state, angleMode: action.mode, isShifted: false };
    case "DISPLAY_MODE": return { ...state, displayMode: action.mode, displayPrecision: action.precision ?? state.displayPrecision, isShifted: false };
    case "CLEAR_ERROR": return { ...state, error: null };
    default: return state;
  }
}
