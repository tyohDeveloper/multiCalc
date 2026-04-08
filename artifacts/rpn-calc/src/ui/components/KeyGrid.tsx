import { KeyButton } from "./KeyButton";
import { label } from "../../logic/i18n/label";
import keyData from "../../data/hp48Keys.json";
import type { CalcAction } from "../../state/calculatorState";

interface Props {
  isShifted: boolean;
  dispatch: (action: CalcAction) => void;
}

function dispatchForOp(op: string, isShifted: boolean, dispatch: (a: CalcAction) => void) {
  return () => {
    if (op === "SHIFT_KEY") { dispatch({ type: "SHIFT" }); return; }
    if (op === "ENTER") { dispatch({ type: "ENTER" }); return; }
    if (op === "BACKSPACE") { dispatch({ type: "BACKSPACE" }); return; }
    if (op === "DECIMAL") { dispatch({ type: "DECIMAL" }); return; }
    if (op === "EEX_KEY") { dispatch({ type: "EEX" }); return; }
    if (op.startsWith("DIGIT_")) { dispatch({ type: "DIGIT", digit: op.slice(6) }); return; }
    const resolvedOp = isShifted
      ? ((keyData.sections.flatMap(s => s.rows).flatMap(r => r.keys).find(k => k.op === op)?.shiftOp) ?? op)
      : op;
    dispatch({ type: "OP", op: resolvedOp });
  };
}

export function KeyGrid({ isShifted, dispatch }: Props) {
  return (
    <div className="key-grid">
      {keyData.sections.map((section) => (
        <div key={section.id} className={`key-section key-section-${section.id}`} style={{ "--grid-cols": section.cols } as React.CSSProperties}>
          {section.rows.map((row) => (
            <div key={row.id} className="key-row" style={{ gridTemplateColumns: `repeat(${section.cols}, 1fr)` }}>
              {row.keys.map((key) => (
                <KeyButton
                  key={key.id}
                  labelKey={key.labelKey}
                  shiftLabelKey={key.shiftLabelKey}
                  isShifted={isShifted}
                  category={key.category}
                  colSpan={key.colSpan}
                  isActive={key.op === "SHIFT_KEY" && isShifted}
                  onClick={dispatchForOp(key.op, isShifted, dispatch)}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
