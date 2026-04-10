import { commitEntry } from "./commitEntry";
import type { CalcState } from "../../state/calculatorState";
import type { Complex } from "../complex/complex";

export function applyPushConstant(state: CalcState, value: Complex): CalcState {
  const s = commitEntry(state);
  return {
    ...s,
    stack: [value, s.stack[0], s.stack[1], s.stack[2]],
    enterFlag: false,
    error: null,
  };
}
