import type { CalcAction } from "../../state/calculatorState";

export function resolveKeyAction(
  op: string,
  isShifted: boolean,
  shiftOp?: string,
): CalcAction {
  if (op === "SHIFT_KEY") return { type: "SHIFT" };
  if (op === "ENTER") return { type: "ENTER" };
  if (op === "BACKSPACE") return { type: "BACKSPACE" };
  if (op === "DECIMAL") return { type: "DECIMAL" };
  if (op === "EEX_KEY") return { type: "EEX" };
  if (op.startsWith("DIGIT_")) return { type: "DIGIT", digit: op.slice(6) };
  if (op === "ANGLE_DEG") return { type: "ANGLE_MODE", mode: "DEG" };
  if (op === "ANGLE_RAD") return { type: "ANGLE_MODE", mode: "RAD" };
  if (op === "ANGLE_GRAD") return { type: "ANGLE_MODE", mode: "GRAD" };
  if (op === "DISPLAY_STD") return { type: "DISPLAY_MODE", mode: "STD" };
  if (op === "DISPLAY_FIX") return { type: "DISPLAY_MODE", mode: "FIX" };
  if (op === "DISPLAY_SCI") return { type: "DISPLAY_MODE", mode: "SCI" };
  if (op === "DISPLAY_ENG") return { type: "DISPLAY_MODE", mode: "ENG" };
  const resolvedOp = isShifted && shiftOp ? shiftOp : op;
  return { type: "OP", op: resolvedOp };
}
