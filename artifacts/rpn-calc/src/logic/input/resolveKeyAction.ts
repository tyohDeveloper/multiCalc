import type { CalcAction } from "../../state/calculatorState";

export function resolveKeyAction(
  op: string,
  isShifted: boolean,
  shiftOp?: string,
): CalcAction {
  if (op === "SHIFT_KEY") return { type: "SHIFT" };
  const activeOp = isShifted && shiftOp ? shiftOp : op;
  if (activeOp === "ENTER") return { type: "ENTER" };
  if (activeOp === "BACKSPACE") return { type: "BACKSPACE" };
  if (activeOp === "DECIMAL") return { type: "DECIMAL" };
  if (activeOp === "EEX_KEY") return { type: "EEX" };
  if (activeOp.startsWith("DIGIT_")) return { type: "DIGIT", digit: activeOp.slice(6) };
  if (activeOp === "ANGLE_DEG") return { type: "ANGLE_MODE", mode: "DEG" };
  if (activeOp === "ANGLE_RAD") return { type: "ANGLE_MODE", mode: "RAD" };
  if (activeOp === "ANGLE_GRAD") return { type: "ANGLE_MODE", mode: "GRAD" };
  if (activeOp === "DISPLAY_STD") return { type: "DISPLAY_MODE", mode: "STD" };
  if (activeOp === "DISPLAY_FIX") return { type: "DISPLAY_MODE", mode: "FIX" };
  if (activeOp === "DISPLAY_SCI") return { type: "DISPLAY_MODE", mode: "SCI" };
  if (activeOp === "DISPLAY_ENG") return { type: "DISPLAY_MODE", mode: "ENG" };
  return { type: "OP", op: activeOp };
}
