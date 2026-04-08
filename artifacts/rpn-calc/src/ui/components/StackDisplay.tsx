import { formatStackValue } from "../../logic/formatting/formatStackValue";
import { formatEntryBuffer } from "../../logic/formatting/formatEntryBuffer";
import { t } from "../../logic/i18n/t";
import type { CalcState } from "../../state/calculatorState";

interface Props {
  state: CalcState;
}

export function StackDisplay({ state }: Props) {
  const { stack, entry, displayMode, displayPrecision } = state;
  const rows = [
    { label: t("stack-t"), value: formatStackValue(stack[3], displayMode, displayPrecision) },
    { label: t("stack-z"), value: formatStackValue(stack[2], displayMode, displayPrecision) },
    { label: t("stack-y"), value: formatStackValue(stack[1], displayMode, displayPrecision) },
    { label: t("stack-x"), value: entry.isActive ? formatEntryBuffer(entry.buffer) : formatStackValue(stack[0], displayMode, displayPrecision) },
  ];
  return (
    <div className="stack-display">
      {rows.map(({ label, value }) => (
        <div key={label} className="stack-row">
          <span className="stack-label">{label}:</span>
          <span className="stack-value">{value}</span>
        </div>
      ))}
    </div>
  );
}
