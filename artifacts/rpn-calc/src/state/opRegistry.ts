import { mathRegistry } from "./mathRegistry";
import { matrixRegistry } from "./matrixRegistry";
import { trigRegistry } from "./trigRegistry";
import { stackRegistry } from "./stackRegistry";
import { inputRegistry } from "./inputRegistry";
import { progRegistry } from "./progRegistry";
import type { ExecOpCode } from "./opCodes";
import type { CalcState } from "./calculatorState";

export type StateOp = (state: CalcState) => CalcState;

export const opRegistry: Record<ExecOpCode, StateOp> = {
  ...mathRegistry,
  ...matrixRegistry,
  ...trigRegistry,
  ...stackRegistry,
  ...inputRegistry,
  ...progRegistry,
} as Record<ExecOpCode, StateOp>;
