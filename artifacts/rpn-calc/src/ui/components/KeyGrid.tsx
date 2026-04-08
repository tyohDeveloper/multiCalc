import { KeyButton } from "./KeyButton";
import { resolveKeyAction } from "../../logic/input/resolveKeyAction";
import keyData from "../../data/hp48Keys.json";
import type { CalcAction } from "../../state/calculatorState";

interface Props {
  isShifted: boolean;
  dispatch: (action: CalcAction) => void;
}

export function KeyGrid({ isShifted, dispatch }: Props) {
  return (
    <div className="key-grid">
      {keyData.sections.map((section) => (
        <div key={section.id} className={`key-section key-section-${section.id}`}>
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
                  onClick={() => dispatch(resolveKeyAction(key.op, isShifted, key.shiftLabelKey ? key.shiftOp : undefined))}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
