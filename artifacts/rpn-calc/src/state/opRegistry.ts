import { mathRegistry } from "./mathRegistry";
import { trigRegistry } from "./trigRegistry";
import { stackRegistry } from "./stackRegistry";
import { inputRegistry } from "./inputRegistry";
import type { ExecOpCode } from "./opCodes";
import type { CalcState } from "./calculatorState";

export type StateOp = (state: CalcState) => CalcState;

export const opRegistry: Record<ExecOpCode, StateOp> = {
  ...mathRegistry,
  ...trigRegistry,
  ...stackRegistry,
  ...inputRegistry,
} as Record<ExecOpCode, StateOp>;
