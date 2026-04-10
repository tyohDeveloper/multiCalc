import type { Complex } from "../complex/complex";
import { cx, ZERO } from "../complex/complex";

export function parseRealBuffer(buffer: string): number {
  if (!buffer || buffer === "-" || buffer === "-0") return 0;
  const normalized = buffer.replace("E", "e");
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}

export function parseEntryBuffer(buffer: string, imagBuffer: string = ""): Complex {
  const re = parseRealBuffer(buffer);
  const im = imagBuffer !== "" ? parseRealBuffer(imagBuffer) : 0;
  if (imagBuffer === "" && buffer === "") return ZERO;
  return cx(re, im);
}
