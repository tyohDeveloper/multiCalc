export function clampPrecision(p: number): number {
  return Math.max(0, Math.min(11, Math.round(p)));
}
