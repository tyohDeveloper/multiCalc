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

const ROW2_ALPHA = ["G", "H", "I", "J", "K", "L"];

const ROW3_ALPHA = ["M", "N", "O", "P", "Q", "R"];

export function KeyGrid({ isShifted, dispatch }: Props) {
  return (
    <div className="key-grid">
      {keyData.sections.map((section) => {
        const isCompact = (section as { compact?: boolean }).compact;
        const isFlat = (section as { flat?: boolean }).flat;

        if (isFlat) {
          const flatKeys = section.rows.flatMap((row) => row.keys);
          const gridStyle: CSSProperties = { gridTemplateColumns: `repeat(${section.cols}, 1fr)` };
          return (
            <div key={section.id} className={`key-section key-section-${section.id} key-section-flat`} style={gridStyle}>
              {flatKeys.map((key) => {
                if ((key as { spacer?: boolean }).spacer) {
                  return <div key={key.id} className="key-spacer" />;
                }
                const rowSpan = (key as { rowSpan?: number }).rowSpan;
                const colSpan = (key as { colSpan?: number }).colSpan;
                const cellStyle: CSSProperties = {};
                if (rowSpan) cellStyle.gridRow = `span ${rowSpan}`;
                if (colSpan) cellStyle.gridColumn = `span ${colSpan}`;
                const shiftLabel = resolveShiftLabel(key.shiftLabelKey);
                const aboveClass = `key-above-label${isShifted && shiftLabel ? " key-above-active" : ""}`;
                return (
                  <div key={key.id} className={`key-cell${rowSpan ? " key-cell-tall" : ""}`} style={cellStyle}>
                    <div className={aboveClass}>{shiftLabel || "\u00A0"}</div>
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
        }

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

                if (rowIdx === 1) {
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
                            <div className="key-label-alpha">{ROW2_ALPHA[idx] ?? ""}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                if (rowIdx === 2) {
                  return (
                    <div key={row.id} className="key-row" style={{ gridTemplateColumns: `repeat(${section.cols}, 1fr)` }}>
                      {row.keys.map((key, idx) => {
                        const k3 = key as { topCyan?: string } & typeof key;
                        const cyan = k3.topCyan ?? "";
                        const cyanIsMath = cyan.trimStart().startsWith("<math");
                        return (
                          <div key={key.id} className="key-cell-3zone">
                            <div className={`key-cell-top-labels${cyanIsMath ? " key-cell-top-labels--has-math" : ""}`}>
                              <span className="key-label-magenta" />
                              {cyanIsMath ? (
                                <span className="key-label-cyan" dangerouslySetInnerHTML={{ __html: cyan }} />
                              ) : (
                                <span className="key-label-cyan">{cyan}</span>
                              )}
                            </div>
                            <KeyButton
                              labelKey={key.labelKey}
                              category={key.category}
                              isActive={false}
                              onClick={() => dispatch(resolveKeyAction(key.op, isShifted, undefined))}
                            />
                            <div className="key-label-alpha">{ROW3_ALPHA[idx] ?? ""}</div>
                          </div>
                        );
                      })}
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

        return (
          <div key={section.id} className={`key-section key-section-${section.id}`}>
            {section.rows.map((row) => (
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
            ))}
          </div>
        );
      })}
    </div>
  );
}
