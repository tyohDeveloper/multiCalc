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
