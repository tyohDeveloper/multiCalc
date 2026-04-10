import { commitEntry } from "../shared/commitEntry";
import type { CalcState } from "../../state/calculatorState";

export function applyRcl(state: CalcState, reg: number): CalcState {
  const s = commitEntry(state);
  const value = s.registers[reg] ?? 0;
  return {
    ...s,
    stack: [value, s.stack[0], s.stack[1], s.stack[2]],
    enterFlag: false,
    error: null,
  };
}
