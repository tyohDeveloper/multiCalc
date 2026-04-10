import type { KeyOpCode } from "./opCodes";

export type AngleMode = "DEG" | "RAD" | "GRAD";
export type DisplayMode = "STD" | "FIX" | "SCI" | "ENG";
export type ShiftState = "unshifted" | "shiftedMagenta" | "shiftedCyan" | "shiftedBottom";

export interface EntryState {
  isActive: boolean;
  buffer: string;
  hasDecimal: boolean;
  isEnteringExp: boolean;
}

export interface CalcState {
  stack: [number, number, number, number];
  lastX: number;
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
  | { type: "ANGLE_MODE"; mode: AngleMode }
  | { type: "DISPLAY_MODE"; mode: DisplayMode; precision?: number }
  | { type: "CLEAR_ERROR" };

export { type KeyOpCode } from "./opCodes";

const clearedEntry: EntryState = {
  isActive: false,
  buffer: "",
  hasDecimal: false,
  isEnteringExp: false,
};

export const initialState: CalcState = {
  stack: [0, 0, 0, 0],
  lastX: 0,
  entry: clearedEntry,
  enterFlag: false,
  angleMode: "DEG",
  displayMode: "STD",
  displayPrecision: 4,
  shiftState: "unshifted",
  error: null,
};

export const CLEARED_ENTRY: EntryState = clearedEntry;
