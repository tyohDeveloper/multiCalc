import { applyDigit } from "../logic/input/applyDigit";
import { applyDecimal } from "../logic/input/applyDecimal";
import { applyEex } from "../logic/input/applyEex";
import { applyBackspace } from "../logic/input/applyBackspace";
import { applyEnter } from "../logic/stack/applyEnter";
import { applySto } from "../logic/stack/applySto";
import { applyRcl } from "../logic/stack/applyRcl";
import { opRegistry } from "./opRegistry";
import { isExecOpCode, isPlaceholderOpCode } from "./opCodes";
import type { CalcState, CalcAction } from "./calculatorState";

export function calculatorReducer(state: CalcState, action: CalcAction): CalcState {
  if (state.error && action.type !== "CLEAR_ERROR" && action.type !== "OP") {
    if (action.type === "DIGIT" || action.type === "DECIMAL") {
      return { ...state, error: null };
    }
    return state;
  }
  switch (action.type) {
    case "DIGIT": {
      const nextShift = state.shiftState === "shiftedBottom" ? "shiftedBottom" as const : "unshifted" as const;
      return applyDigit({ ...state, shiftState: nextShift }, action.digit);
    }
    case "DECIMAL": {
      const nextShift = state.shiftState === "shiftedBottom" ? "shiftedBottom" as const : "unshifted" as const;
      return applyDecimal({ ...state, shiftState: nextShift });
    }
    case "EEX": {
      const nextShift = state.shiftState === "shiftedBottom" ? "shiftedBottom" as const : "unshifted" as const;
      return applyEex({ ...state, shiftState: nextShift });
    }
    case "BACKSPACE": {
      const nextShift = state.shiftState === "shiftedBottom" ? "shiftedBottom" as const : "unshifted" as const;
      return applyBackspace({ ...state, shiftState: nextShift });
    }
    case "ENTER": {
      const nextShift = state.shiftState === "shiftedBottom" ? "shiftedBottom" as const : "unshifted" as const;
      return applyEnter({ ...state, shiftState: nextShift });
    }
    case "SHIFT": {
      const next = state.shiftState === action.target ? "unshifted" : action.target;
      return { ...state, shiftState: next };
    }
    case "ALPHA_CHAR": {
      const char = action.char;
      if (!char || char === "\u200B") return state;
      const entry = state.entry.isActive
        ? { ...state.entry, buffer: state.entry.buffer + char }
        : { isActive: true, buffer: char, hasDecimal: false, isEnteringExp: false };
      return { ...state, entry };
    }
    case "OP": {
      const nextShift = state.shiftState === "shiftedBottom" ? "shiftedBottom" as const : "unshifted" as const;
      const s = { ...state, shiftState: nextShift };
      if (isExecOpCode(action.op)) return opRegistry[action.op](s);
      if (isPlaceholderOpCode(action.op)) return s;
      return { ...s, error: action.op };
    }
    case "STO": {
      const nextShift = state.shiftState === "shiftedBottom" ? "shiftedBottom" as const : "unshifted" as const;
      return applySto({ ...state, shiftState: nextShift }, action.reg);
    }
    case "RCL": {
      const nextShift = state.shiftState === "shiftedBottom" ? "shiftedBottom" as const : "unshifted" as const;
      return applyRcl({ ...state, shiftState: nextShift }, action.reg);
    }
    case "ANGLE_MODE": {
      const nextShift = state.shiftState === "shiftedBottom" ? "shiftedBottom" as const : "unshifted" as const;
      return { ...state, angleMode: action.mode, shiftState: nextShift };
    }
    case "DISPLAY_MODE": {
      const nextShift = state.shiftState === "shiftedBottom" ? "shiftedBottom" as const : "unshifted" as const;
      return { ...state, displayMode: action.mode, displayPrecision: action.precision ?? state.displayPrecision, shiftState: nextShift };
    }
    case "CLEAR_ERROR": return { ...state, error: null };
    default: return state;
  }
}
