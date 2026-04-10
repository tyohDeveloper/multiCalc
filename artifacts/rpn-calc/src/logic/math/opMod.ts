export function opMod(y: number, x: number): number {
  return y - x * Math.floor(y / x);
}
