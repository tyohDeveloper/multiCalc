export function formatSpecial(value: number): string {
  if (isNaN(value)) return "Error";
  return value > 0 ? "∞" : "-∞";
}
