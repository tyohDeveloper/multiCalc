export interface Matrix {
  readonly kind: "matrix";
  readonly rows: number;
  readonly cols: number;
  readonly data: ReadonlyArray<ReadonlyArray<number>>;
}

export function makeMatrix(data: number[][]): Matrix {
  const rows = data.length;
  const cols = rows > 0 ? data[0].length : 0;
  return { kind: "matrix", rows, cols, data };
}

export function makeZeroMatrix(rows: number, cols: number): Matrix {
  const data: number[][] = [];
  for (let r = 0; r < rows; r++) {
    data.push(new Array(cols).fill(0));
  }
  return { kind: "matrix", rows, cols, data };
}

export function isMatrix(v: unknown): v is Matrix {
  return typeof v === "object" && v !== null && (v as Matrix).kind === "matrix";
}
