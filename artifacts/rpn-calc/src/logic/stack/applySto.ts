import { commitEntry } from "../shared/commitEntry";
import type { CalcState } from "../../state/calculatorState";

export function applySto(state: CalcState, reg: number): CalcState {
  const s = commitEntry(state);
  const registers = [...s.registers];
  registers[reg] = s.stack[0];
  return {
    ...s,
    registers: registers as CalcState["registers"],
    enterFlag: false,
    shiftState: "unshifted",
    error: null,
  };
}
