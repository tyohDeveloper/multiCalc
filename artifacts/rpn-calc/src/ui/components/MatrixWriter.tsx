import { useState, useEffect, useRef } from "react";
import type { CalcState, CalcAction } from "../../state/calculatorState";
import { makeMatrix } from "../../logic/matrix/matrixType";
import type { Matrix } from "../../logic/matrix/matrixType";

interface Props {
  state: CalcState;
  dispatch: React.Dispatch<CalcAction>;
  noMatrix?: boolean;
}

function buildCells(src: Matrix | null, r: number, c: number): string[][] {
  const grid: string[][] = [];
  for (let ri = 0; ri < r; ri++) {
    const row: string[] = [];
    for (let ci = 0; ci < c; ci++) {
      const v = src ? (src.data[ri]?.[ci] ?? 0) : 0;
      row.push(String(v));
    }
    grid.push(row);
  }
  return grid;
}

export function MatrixWriter({ state, dispatch, noMatrix }: Props) {
  const seed = state.matrixWriterSeed;

  const [rows, setRows] = useState(() => seed ? seed.rows : 2);
  const [cols, setCols] = useState(() => seed ? seed.cols : 2);
  const [cells, setCells] = useState<string[][]>(() => buildCells(seed, seed ? seed.rows : 2, seed ? seed.cols : 2));
  const [focusR, setFocusR] = useState(0);
  const [focusC, setFocusC] = useState(0);

  const prevSeedRef = useRef<Matrix | null>(seed);

  useEffect(() => {
    if (prevSeedRef.current !== seed) {
      prevSeedRef.current = seed;
      const newRows = seed ? seed.rows : 2;
      const newCols = seed ? seed.cols : 2;
      setRows(newRows);
      setCols(newCols);
      setCells(buildCells(seed, newRows, newCols));
      setFocusR(0);
      setFocusC(0);
    }
  }, [seed]);

  if (noMatrix || !state.matrixWriterOpen) return null;

  function applyDimChange(newRows: number, newCols: number) {
    setCells(prev => {
      const grid: string[][] = [];
      for (let r = 0; r < newRows; r++) {
        const row: string[] = [];
        for (let c = 0; c < newCols; c++) {
          row.push(prev[r]?.[c] ?? "0");
        }
        grid.push(row);
      }
      return grid;
    });
    setFocusR(r => Math.min(r, newRows - 1));
    setFocusC(c => Math.min(c, newCols - 1));
  }

  function handleRowsChange(v: number) {
    const n = Math.max(1, Math.min(99, v));
    setRows(n);
    applyDimChange(n, cols);
  }

  function handleColsChange(v: number) {
    const n = Math.max(1, Math.min(99, v));
    setCols(n);
    applyDimChange(rows, n);
  }

  function handleCellChange(r: number, c: number, val: string) {
    setCells(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = val;
      return next;
    });
  }

  function handleKeyDown(e: React.KeyboardEvent, r: number, c: number) {
    if (e.key === "ArrowRight" || e.key === "Tab") {
      e.preventDefault();
      const nc = c + 1 < cols ? c + 1 : 0;
      const nr = c + 1 < cols ? r : (r + 1 < rows ? r + 1 : 0);
      setFocusR(nr);
      setFocusC(nc);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const nc = c - 1 >= 0 ? c - 1 : cols - 1;
      const nr = c - 1 >= 0 ? r : (r - 1 >= 0 ? r - 1 : rows - 1);
      setFocusR(nr);
      setFocusC(nc);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusR(r => Math.min(r + 1, rows - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusR(r => Math.max(r - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleConfirm();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  }

  function handleConfirm() {
    const data: number[][] = cells.map(row =>
      row.map(v => {
        const n = parseFloat(v);
        return isNaN(n) ? 0 : n;
      })
    );
    dispatch({ type: "MATRIX_WRITER_PUSH", matrix: makeMatrix(data) });
  }

  function handleCancel() {
    dispatch({ type: "MATRIX_WRITER_CLOSE" });
  }

  return (
    <div className="matrix-writer-overlay" role="dialog" aria-modal="true" aria-label="Matrix Writer">
      <div className="matrix-writer-modal">
        <div className="matrix-writer-title">Matrix Writer</div>
        <div className="matrix-writer-dim-row">
          <label className="matrix-writer-dim-label">
            Rows:
            <input
              type="number"
              className="matrix-writer-dim-input"
              value={rows}
              min={1}
              max={99}
              onChange={e => handleRowsChange(parseInt(e.target.value, 10) || 1)}
            />
          </label>
          <label className="matrix-writer-dim-label">
            Cols:
            <input
              type="number"
              className="matrix-writer-dim-input"
              value={cols}
              min={1}
              max={99}
              onChange={e => handleColsChange(parseInt(e.target.value, 10) || 1)}
            />
          </label>
        </div>
        <div className="matrix-writer-grid">
          {cells.map((row, r) => (
            <div key={r} className="matrix-writer-row">
              {row.map((val, c) => (
                <input
                  key={c}
                  type="text"
                  className={`matrix-writer-cell${r === focusR && c === focusC ? " matrix-writer-cell-focused" : ""}`}
                  value={val}
                  onChange={e => handleCellChange(r, c, e.target.value)}
                  onFocus={() => { setFocusR(r); setFocusC(c); }}
                  onKeyDown={e => handleKeyDown(e, r, c)}
                  autoFocus={r === focusR && c === focusC}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="matrix-writer-actions">
          <button className="matrix-writer-btn matrix-writer-cancel" onClick={handleCancel}>Cancel</button>
          <button className="matrix-writer-btn matrix-writer-confirm" onClick={handleConfirm}>OK</button>
        </div>
      </div>
    </div>
  );
}
