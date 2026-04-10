import { parseEntryBuffer } from "./parseEntryBuffer";
import type { CalcState } from "../../state/calculatorState";
import { CLEARED_ENTRY } from "../../state/calculatorState";

export function commitEntry(state: CalcState): CalcState {
  if (!state.entry.isActive) return state;
  const value = parseEntryBuffer(state.entry.buffer, state.entry.imagBuffer);
  return {
    ...state,
    stack: [value, state.stack[1], state.stack[2], state.stack[3]],
    entry: CLEARED_ENTRY,
  };
}
