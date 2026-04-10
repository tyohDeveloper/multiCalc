import type { CSSProperties } from "react";
import { KeyButton } from "./KeyButton";
import { resolveShiftLabel } from "../../logic/ui/resolveShiftLabel";
import keyActionTable from "../../generated/keyActionTable";
import keyData from "../../data/hp48Keys.json";
import type { CalcAction, ShiftState } from "../../state/calculatorState";

interface Props {
  shiftState: ShiftState;
  dispatch: (action: CalcAction) => void;
}

const SOFTKEY_ALPHA = ["A", "B", "C", "D", "E", "F"];

const ROW1_ALPHA = ["G", "H", "I", "J", "K", "L"];
const ROW2_ALPHA = ["M", "N", "O", "P", "Q", "R"];
const ROW3_ALPHA = ["S", "T", "U", "V", "W", "X"];
const ROW4_ALPHA = ["\u200B", "Y", "Z", "\u200B", "\u200B"];

const ROW5_ALPHA = ["\u200B", "\u200B", "\u200B", "\u200B", "\u200B", "\u200B"];
const ROW6_ALPHA = ["\u200B", "\u200B", "\u200B", "\u200B", "\u200B", "\u200B"];
const ROW7_ALPHA = ["\u200B", "\u200B", "\u200B", "\u200B", "\u200B", "\u200B"];
const ROW8_ALPHA = ["\u200B", "\u200B", "\u200B", "\u200B", "\u200B", "\u200B"];

const ROW_ALPHA_MAP: Record<string, string[]> = {
  "top-fn-1": ROW1_ALPHA,
  "top-fn-2": ROW2_ALPHA,
  "top-fn-3": ROW3_ALPHA,
  "top-fn-4": ROW4_ALPHA,
  "top-fn-5": ROW5_ALPHA,
  "top-fn-6": ROW6_ALPHA,
  "top-fn-7": ROW7_ALPHA,
  "top-fn-8": ROW8_ALPHA,
};

const THREE_ZONE_ROWS = new Set(["top-fn-1", "top-fn-2", "top-fn-3", "top-fn-5", "top-fn-6", "top-fn-7", "top-fn-8"]);
const THREE_ZONE_ROW4 = "top-fn-4";

const CALC_NS = "calc-hp48gx";

function makeTestId(sectionId: string, rowId: string, keyId: string): string {
  return `${CALC_NS}__sec-${sectionId}__row-${rowId}__key-${keyId}`;
}

function resolveTopLabel(topMagenta: string | undefined, topCyan: string | undefined, topMerged: string | undefined, topMagentaMerged: string | undefined, shiftState: ShiftState) {
  if (topMagentaMerged) {
    return <span className={shiftState === "shiftedMagenta" ? "key-label-magenta key-label-active" : "key-label-magenta"}>{topMagentaMerged}</span>;
  }
  if (topMerged) {
    return <span className={shiftState === "shiftedCyan" ? "key-label-cyan key-label-active" : "key-label-cyan"}>{topMerged}</span>;
  }
  return (
    <>
      <span className={shiftState === "shiftedMagenta" && topMagenta ? "key-label-magenta key-label-active" : "key-label-magenta"}>{topMagenta ?? ""}</span>
      <span className={shiftState === "shiftedCyan" && topCyan ? "key-label-cyan key-label-active" : "key-label-cyan"}>{topCyan ?? ""}</span>
    </>
  );
}

function makeKeyHandler(keyId: string, shiftState: ShiftState, dispatch: (action: CalcAction) => void): () => void {
  const entry = keyActionTable[keyId];
  if (!entry) return () => {};
  const action = entry[shiftState];
  return () => dispatch(action);
}

export function KeyGrid({ shiftState, dispatch }: Props) {
  return (
    <div className="key-grid">
      {keyData.sections.map((section) => {
        const isCompact = (section as { compact?: boolean }).compact;

        if (section.id === "softkeys") {
          return (
            <div key={section.id} className={`key-section key-section-${section.id}`}>
              {section.rows.map((row) => (
                <div key={row.id} className="key-row" style={{ gridTemplateColumns: `repeat(${section.cols}, 1fr)` }}>
                  {row.keys.map((key, idx) => {
                    const fnKey = makeKeyHandler(key.id, shiftState, dispatch);
                    return (
                      <div key={key.id} className="key-cell-soft">
                        <KeyButton
                          labelKey={key.labelKey}
                          category={key.category}
                          isActive={false}
                          onClick={fnKey}
                          testId={makeTestId(section.id, row.id, key.id)}
                          keyOp={key.op}
                        />
                        <div className="key-label-alpha">{SOFTKEY_ALPHA[idx] ?? ""}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        }

        if (section.id === "top-fn") {
          return (
            <div key={section.id} className={`key-section key-section-${section.id}`}>
              {section.rows.map((row) => {
                if (row.id === "top-fn-0") {
                  return null;
                }

                if (row.id === "top-fn-shift") {
                  return (
                    <div key={row.id} className="key-row key-row-shifts" style={{ gridTemplateColumns: `repeat(${row.keys.length}, auto) 1fr` }}>
                      {row.keys.map((key) => {
                        const fnKey = makeKeyHandler(key.id, shiftState, dispatch);
                        const isActive = (key.op === "SHIFT_MAGENTA" && shiftState === "shiftedMagenta")
                          || (key.op === "SHIFT_CYAN" && shiftState === "shiftedCyan")
                          || (key.op === "SHIFT_BOTTOM" && shiftState === "shiftedBottom");
                        return (
                          <KeyButton
                            key={key.id}
                            labelKey={key.labelKey}
                            category={key.category}
                            isActive={isActive}
                            onClick={fnKey}
                            testId={makeTestId(section.id, row.id, key.id)}
                            keyOp={key.op}
                          />
                        );
                      })}
                    </div>
                  );
                }


                if (THREE_ZONE_ROWS.has(row.id)) {
                  const alphaRow = ROW_ALPHA_MAP[row.id] ?? [];
                  return (
                    <div key={row.id} className="key-row" style={{ gridTemplateColumns: `repeat(${section.cols}, 1fr)` }}>
                      {row.keys.map((key, idx) => {
                        const k = key as { topMagenta?: string; topCyan?: string; topMerged?: string; topColor?: string } & typeof key;
                        const merged = Boolean(k.topMerged);
                        const topColor = k.topColor;
                        const fnKey = makeKeyHandler(key.id, shiftState, dispatch);
                        const isActive = key.op === "SHIFT_MAGENTA" && shiftState === "shiftedMagenta"
                          || key.op === "SHIFT_CYAN" && shiftState === "shiftedCyan"
                          || key.op === "SHIFT_BOTTOM" && shiftState === "shiftedBottom";
                        return (
                          <div key={key.id} className="key-cell-3zone">
                            {topColor ? (
                              <div className="key-cell-top-labels key-cell-top-labels--color-swatch" />
                            ) : (
                              <div className={`key-cell-top-labels${merged ? " key-cell-top-labels--merged" : ""}`}>
                                {resolveTopLabel(k.topMagenta, k.topCyan, k.topMerged, undefined, shiftState)}
                              </div>
                            )}
                            <KeyButton
                              labelKey={key.labelKey}
                              category={key.category}
                              isActive={isActive}
                              onClick={fnKey}
                              testId={makeTestId(section.id, row.id, key.id)}
                              keyOp={key.op}
                              topColor={topColor}
                            />
                            <div className={shiftState === "shiftedBottom" && alphaRow[idx] && alphaRow[idx] !== "\u200B" ? "key-label-alpha key-label-active" : "key-label-alpha"}>{alphaRow[idx] ?? ""}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                if (row.id === THREE_ZONE_ROW4) {
                  const alphaRow = ROW_ALPHA_MAP[row.id] ?? [];
                  return (
                    <div key={row.id} className="key-row" style={{ gridTemplateColumns: `repeat(${section.cols}, 1fr)` }}>
                      {row.keys.map((key, idx) => {
                        const k = key as { topMagenta?: string; topCyan?: string; topMerged?: string; topMagentaMerged?: string; colSpan?: number } & typeof key;
                        const colSpan = k.colSpan;
                        const cellStyle: CSSProperties = colSpan ? { gridColumn: `span ${colSpan}` } : {};
                        const merged = Boolean(k.topMerged) || Boolean(k.topMagentaMerged);
                        const fnKey = makeKeyHandler(key.id, shiftState, dispatch);
                        return (
                          <div key={key.id} className="key-cell-3zone" style={cellStyle}>
                            <div className={`key-cell-top-labels${merged ? " key-cell-top-labels--merged" : ""}`}>
                              {resolveTopLabel(k.topMagenta, k.topCyan, k.topMerged, k.topMagentaMerged, shiftState)}
                            </div>
                            <KeyButton
                              labelKey={key.labelKey}
                              category={key.category}
                              isActive={false}
                              onClick={fnKey}
                              testId={makeTestId(section.id, row.id, key.id)}
                              keyOp={key.op}
                            />
                            <div className={shiftState === "shiftedBottom" && alphaRow[idx] && alphaRow[idx] !== "\u200B" ? "key-label-alpha key-label-active" : "key-label-alpha"}>{alphaRow[idx] ?? ""}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                return (
                  <div key={row.id} className="key-row" style={{ gridTemplateColumns: `repeat(${section.cols}, 1fr)` }}>
                    {row.keys.map((key) => {
                      const k = key as { shiftLabelKey?: string; colSpan?: number } & typeof key;
                      const shiftLabel = resolveShiftLabel(k.shiftLabelKey);
                      const aboveClass = `key-above-label${shiftState === "shiftedMagenta" && shiftLabel ? " key-above-active" : ""}`;
                      const colSpan = k.colSpan;
                      const cellStyle = colSpan ? { gridColumn: `span ${colSpan}` } : undefined;
                      const fnKey = makeKeyHandler(key.id, shiftState, dispatch);
                      const isActive = key.op === "SHIFT_MAGENTA" && shiftState === "shiftedMagenta"
                        || key.op === "SHIFT_CYAN" && shiftState === "shiftedCyan"
                        || key.op === "SHIFT_BOTTOM" && shiftState === "shiftedBottom";
                      return (
                        <div key={key.id} className="key-cell" style={cellStyle}>
                          {!isCompact && (
                            <div className={aboveClass}>{shiftLabel || "\u00A0"}</div>
                          )}
                          <KeyButton
                            labelKey={key.labelKey}
                            category={key.category}
                            isActive={isActive}
                            onClick={fnKey}
                            testId={makeTestId(section.id, row.id, key.id)}
                            keyOp={key.op}
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
