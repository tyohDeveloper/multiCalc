import type { CSSProperties } from "react";
import { KeyButton } from "./KeyButton";
import { resolveKeyAction } from "../../logic/input/resolveKeyAction";
import { resolveShiftLabel } from "../../logic/ui/resolveShiftLabel";
import keyData from "../../data/hp48Keys.json";
import type { CalcAction } from "../../state/calculatorState";

interface Props {
  isShifted: boolean;
  dispatch: (action: CalcAction) => void;
}

const SOFTKEY_ALPHA = ["A", "B", "C", "D", "E", "F"];

const ROW1_ALPHA = ["G", "H", "I", "J", "K", "L"];
const ROW2_ALPHA = ["M", "N", "O", "P", "Q", "R"];
const ROW3_ALPHA = ["S", "T", "U", "V", "W", "X"];
const ROW4_ALPHA: (string | null)[] = [null, "Y", "Z", null, null];


export function KeyGrid({ isShifted, dispatch }: Props) {
  return (
    <div className="key-grid">
      {keyData.sections.map((section) => {
        const isCompact = (section as { compact?: boolean }).compact;

        if (section.id === "softkeys") {
          return (
            <div key={section.id} className={`key-section key-section-${section.id}`}>
              {section.rows.map((row) => (
                <div key={row.id} className="key-row" style={{ gridTemplateColumns: `repeat(${section.cols}, 1fr)` }}>
                  {row.keys.map((key, idx) => (
                    <div key={key.id} className="key-cell-soft">
                      <KeyButton
                        labelKey={key.labelKey}
                        category={key.category}
                        isActive={false}
                        onClick={() => dispatch(resolveKeyAction(key.op, isShifted, undefined))}
                      />
                      <div className="key-label-alpha">{SOFTKEY_ALPHA[idx] ?? ""}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        }

        if (section.id === "top-fn") {
          return (
            <div key={section.id} className={`key-section key-section-${section.id}`}>
              {section.rows.map((row, rowIdx) => {
                if (rowIdx === 0) {
                  return null;
                }

                if (rowIdx === 1 || rowIdx === 2 || rowIdx === 3) {
                  const alphaRow = rowIdx === 1 ? ROW1_ALPHA : rowIdx === 2 ? ROW2_ALPHA : ROW3_ALPHA;
                  return (
                    <div key={row.id} className="key-row" style={{ gridTemplateColumns: `repeat(${section.cols}, 1fr)` }}>
                      {row.keys.map((key, idx) => {
                        const k = key as { topMagenta?: string; topCyan?: string; topMerged?: string } & typeof key;
                        const merged = Boolean(k.topMerged);
                        return (
                          <div key={key.id} className="key-cell-3zone">
                            <div className={`key-cell-top-labels${merged ? " key-cell-top-labels--merged" : ""}`}>
                              {merged ? (
                                <span className="key-label-cyan">{k.topMerged}</span>
                              ) : (
                                <>
                                  <span className="key-label-magenta">{k.topMagenta ?? ""}</span>
                                  <span className="key-label-cyan">{k.topCyan ?? ""}</span>
                                </>
                              )}
                            </div>
                            <KeyButton
                              labelKey={key.labelKey}
                              category={key.category}
                              isActive={key.op === "SHIFT_KEY" && isShifted}
                              onClick={() => dispatch(resolveKeyAction(key.op, isShifted, key.shiftLabelKey ? key.shiftOp : undefined))}
                            />
                            <div className="key-label-alpha">{alphaRow[idx] ?? ""}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                if (rowIdx === 4) {
                  return (
                    <div key={row.id} className="key-row" style={{ gridTemplateColumns: `repeat(${section.cols}, 1fr)` }}>
                      {row.keys.map((key, idx) => {
                        const colSpan = (key as { colSpan?: number }).colSpan;
                        const cellStyle: CSSProperties = colSpan ? { gridColumn: `span ${colSpan}` } : {};
                        const alpha = ROW4_ALPHA[idx] ?? null;
                        return (
                          <div key={key.id} className="key-cell-3zone" style={cellStyle}>
                            <div className="key-cell-top-labels">
                              <span className="key-label-magenta"></span>
                              <span className="key-label-cyan"></span>
                            </div>
                            <KeyButton
                              labelKey={key.labelKey}
                              category={key.category}
                              isActive={false}
                              onClick={() => dispatch(resolveKeyAction(key.op, isShifted, undefined))}
                            />
                            <div className="key-label-alpha">{alpha ?? ""}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                if (rowIdx === 5) {
                  return (
                    <div key={row.id} className="key-row" style={{ gridTemplateColumns: `repeat(${section.cols}, 1fr)` }}>
                      {row.keys.map((key) => (
                        <div key={key.id} className="key-cell-3zone">
                          <div className="key-cell-top-labels">
                            <span className="key-label-magenta"></span>
                            <span className="key-label-cyan"></span>
                          </div>
                          <KeyButton
                            labelKey={key.labelKey}
                            category={key.category}
                            isActive={false}
                            onClick={() => dispatch(resolveKeyAction(key.op, isShifted, undefined))}
                          />
                          <div className="key-label-alpha"></div>
                        </div>
                      ))}
                    </div>
                  );
                }

                return (
                  <div key={row.id} className="key-row" style={{ gridTemplateColumns: `repeat(${section.cols}, 1fr)` }}>
                    {row.keys.map((key) => {
                      const shiftLabel = resolveShiftLabel(key.shiftLabelKey);
                      const aboveClass = `key-above-label${isShifted && shiftLabel ? " key-above-active" : ""}`;
                      const colSpan = (key as { colSpan?: number }).colSpan;
                      const cellStyle = colSpan ? { gridColumn: `span ${colSpan}` } : undefined;
                      return (
                        <div key={key.id} className="key-cell" style={cellStyle}>
                          {!isCompact && (
                            <div className={aboveClass}>{shiftLabel || "\u00A0"}</div>
                          )}
                          <KeyButton
                            labelKey={key.labelKey}
                            category={key.category}
                            isActive={key.op === "SHIFT_KEY" && isShifted}
                            onClick={() => dispatch(resolveKeyAction(key.op, isShifted, key.shiftLabelKey ? key.shiftOp : undefined))}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
