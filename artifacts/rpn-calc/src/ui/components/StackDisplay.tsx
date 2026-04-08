import { buildStackRows } from "../../logic/formatting/buildStackRows";
import type { CalcState } from "../../state/calculatorState";

interface Props {
  state: CalcState;
}

export function StackDisplay({ state }: Props) {
  const rows = buildStackRows(state);
  return (
    <div className="stack-display">
      {rows.map(({ label, value, isEntry }) => (
        <div key={label} className={`stack-row${isEntry ? " stack-row-entry" : ""}`}>
          <span className="stack-label">{label}:</span>
          <span className="stack-value">{value}</span>
        </div>
      ))}
    </div>
  );
}
