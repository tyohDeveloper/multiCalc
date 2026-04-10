import type { EntryState } from "../../state/calculatorState";

export function formatEntryBuffer(entry: EntryState): string {
  const realPart = entry.buffer || "0";
  if (!entry.isEnteringImag && !entry.imagBuffer) {
    return realPart;
  }
  const imagPart = entry.imagBuffer;
  return `${realPart}i${imagPart}`;
}
