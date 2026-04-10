import { applyDigit } from "../logic/input/applyDigit";
import { applyDecimal } from "../logic/input/applyDecimal";
import { applyEex } from "../logic/input/applyEex";
import { applyBackspace } from "../logic/input/applyBackspace";
import { applyEnter } from "../logic/stack/applyEnter";
import { applySto } from "../logic/stack/applySto";
import { applyRcl } from "../logic/stack/applyRcl";
import { applyImagSep } from "../logic/input/applyImagSep";
import { opRegistry } from "./opRegistry";
import { isExecOpCode, isPlaceholderOpCode } from "./opCodes";
import type { CalcState, CalcAction } from "./calculatorState";
import { CLEARED_ENTRY } from "./calculatorState";
import { ZERO } from "../logic/complex/complex";

export function calculatorReducer(state: CalcState, action: CalcAction): CalcState {
  if (state.matrixWriterOpen) {
    if (action.type === "MATRIX_WRITER_CLOSE" || action.type === "MATRIX_WRITER_PUSH") {
    } else if (
      (action.type === "OP" && action.op === "CLEAR") ||
      action.type === "CLEAR_ERROR"
    ) {
      return { ...state, matrixWriterOpen: false, matrixWriterSeed: null };
    } else {
      return state;
    }
  }
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
      if (char === "I" && state.entry.isActive) {
        return applyImagSep(state);
      }
      const entry = state.entry.isActive
        ? { ...state.entry, buffer: state.entry.buffer + char }
        : { isActive: true, buffer: char, hasDecimal: false, isEnteringExp: false, imagBuffer: "", isEnteringImag: false, imagHasDecimal: false, imagIsEnteringExp: false };
      return { ...state, entry };
    }
    case "OP": {
      const nextShift = state.shiftState === "shiftedBottom" ? "shiftedBottom" as const : "unshifted" as const;
      const s = { ...state, shiftState: nextShift };
      if (action.op === "OP_MTRX") {
        return { ...s, matrCatalogOpen: !s.matrCatalogOpen, matrMenuPage: 0 };
      }
      if (action.op === "CLEAR" && s.matrCatalogOpen) {
        return { ...s, matrCatalogOpen: false };
      }
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
    case "MATRIX_WRITER_OPEN":
      return { ...state, matrixWriterOpen: true, matrixWriterSeed: action.seed ?? null };
    case "MATRIX_WRITER_CLOSE":
      return { ...state, matrixWriterOpen: false, matrixWriterSeed: null };
    case "MATRIX_WRITER_PUSH": {
      const m = action.matrix;
      return {
        ...state,
        stack: [m, state.stack[0], state.stack[1], state.stack[2]],
        matrixWriterOpen: false,
        matrixWriterSeed: null,
        entry: CLEARED_ENTRY,
        enterFlag: false,
        error: null,
      };
    }
    default: return state;
  }
}
