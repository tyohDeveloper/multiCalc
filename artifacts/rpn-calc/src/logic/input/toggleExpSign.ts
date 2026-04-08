import type { CalcState } from "../../state/calculatorState";

export function toggleExpSign(state: CalcState): CalcState {
  const { entry } = state;
  const eIdx = entry.buffer.indexOf("E");
  if (eIdx < 0) return state;
  const mantissa = entry.buffer.slice(0, eIdx + 1);
  const expPart = entry.buffer.slice(eIdx + 1);
  const newExp = expPart.startsWith("-") ? expPart.slice(1) : "-" + expPart;
  return { ...state, entry: { ...entry, buffer: mantissa + newExp } };
}
