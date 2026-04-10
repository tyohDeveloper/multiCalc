import type { KeyOpCode } from "./opCodes";
import type { Complex } from "../logic/complex/complex";
import { ZERO } from "../logic/complex/complex";

export type AngleMode = "DEG" | "RAD" | "GRAD";
export type DisplayMode = "STD" | "FIX" | "SCI" | "ENG";
export type ShiftState = "unshifted" | "shiftedMagenta" | "shiftedCyan" | "shiftedBottom";

export interface EntryState {
  isActive: boolean;
  buffer: string;
  hasDecimal: boolean;
  isEnteringExp: boolean;
  imagBuffer: string;
  isEnteringImag: boolean;
  imagHasDecimal: boolean;
  imagIsEnteringExp: boolean;
}

export interface CalcState {
  stack: [Complex, Complex, Complex, Complex];
  lastX: Complex;
  registers: Complex[];
  entry: EntryState;
  enterFlag: boolean;
  angleMode: AngleMode;
  displayMode: DisplayMode;
  displayPrecision: number;
  shiftState: ShiftState;
  error: string | null;
}

export type CalcAction =
  | { type: "DIGIT"; digit: string }
  | { type: "DECIMAL" }
  | { type: "EEX" }
  | { type: "BACKSPACE" }
  | { type: "ENTER" }
  | { type: "SHIFT"; target: ShiftState }
  | { type: "ALPHA_CHAR"; char: string }
  | { type: "OP"; op: KeyOpCode }
  | { type: "STO"; reg: number }
  | { type: "RCL"; reg: number }
  | { type: "ANGLE_MODE"; mode: AngleMode }
  | { type: "DISPLAY_MODE"; mode: DisplayMode; precision?: number }
  | { type: "CLEAR_ERROR" };

export { type KeyOpCode } from "./opCodes";

const clearedEntry: EntryState = {
  isActive: false,
  buffer: "",
  hasDecimal: false,
  isEnteringExp: false,
  imagBuffer: "",
  isEnteringImag: false,
  imagHasDecimal: false,
  imagIsEnteringExp: false,
};

export const initialState: CalcState = {
  stack: [ZERO, ZERO, ZERO, ZERO],
  lastX: ZERO,
  registers: Array(10).fill(ZERO) as Complex[],
  entry: clearedEntry,
  enterFlag: false,
  angleMode: "DEG",
  displayMode: "STD",
  displayPrecision: 4,
  shiftState: "unshifted",
  error: null,
};

export const CLEARED_ENTRY: EntryState = clearedEntry;
