import { applyDigit } from "../logic/input/applyDigit";
import { applyDecimal } from "../logic/input/applyDecimal";
import { applyEex } from "../logic/input/applyEex";
import { applyBackspace } from "../logic/input/applyBackspace";
import { applyEnter } from "../logic/stack/applyEnter";
import { opRegistry } from "./opRegistry";
import { PLACEHOLDER_OPS } from "./opCodes";
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
      return { ...state, entry, shiftState: "unshifted" };
    }
    case "OP": {
      const s = { ...state, shiftState: "unshifted" as const };
      const fn = (opRegistry as Record<string, ((st: CalcState) => CalcState) | undefined>)[action.op];
      if (fn) return fn(s);
      if (PLACEHOLDER_OPS.has(action.op)) return s;
      return { ...s, error: action.op };
    }
    case "ANGLE_MODE": return { ...state, angleMode: action.mode, shiftState: "unshifted" };
    case "DISPLAY_MODE": return { ...state, displayMode: action.mode, displayPrecision: action.precision ?? state.displayPrecision, shiftState: "unshifted" };
    case "CLEAR_ERROR": return { ...state, error: null };
    default: return state;
  }
}
