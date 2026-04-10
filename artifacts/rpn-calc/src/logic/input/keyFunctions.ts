import type { ShiftState } from "../../state/calculatorState";

export const noOp = (): void => {};

export interface KeyFunctions {
  fnKeyUnshifted: () => void;
  fnKeyMagenta: () => void;
  fnKeyCyan: () => void;
  fnKeyBottom: () => void;
}

export function resolveKeyFn(fns: KeyFunctions, shiftState: ShiftState): () => void {
  switch (shiftState) {
    case "shiftedMagenta": return fns.fnKeyMagenta;
    case "shiftedCyan": return fns.fnKeyCyan;
    case "shiftedBottom": return fns.fnKeyBottom;
    default: return fns.fnKeyUnshifted;
  }
}

export type KeyFunctionRegistry = Record<string, KeyFunctions>;
