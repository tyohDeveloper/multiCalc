export function opPercentChange(y: number, x: number): number {
  return ((x - y) / y) * 100;
}
