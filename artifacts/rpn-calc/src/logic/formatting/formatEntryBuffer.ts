export function formatEntryBuffer(buffer: string): string {
  if (!buffer) return "0";
  if (buffer === "-") return "-0";
  return buffer;
}
