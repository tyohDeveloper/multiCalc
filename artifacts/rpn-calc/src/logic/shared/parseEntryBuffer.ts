export function parseEntryBuffer(buffer: string): number {
  if (!buffer || buffer === "-" || buffer === "-0") return 0;
  const normalized = buffer.replace("E", "e");
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}
