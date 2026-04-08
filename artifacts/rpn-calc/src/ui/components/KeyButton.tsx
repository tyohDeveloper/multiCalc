import { label } from "../../logic/i18n/label";

interface Props {
  labelKey: string;
  shiftLabelKey?: string;
  isShifted: boolean;
  onClick: () => void;
  category?: string;
  colSpan?: number;
  isActive?: boolean;
}

export function KeyButton({ labelKey, shiftLabelKey, isShifted, onClick, category, colSpan, isActive }: Props) {
  const mainLabel = label(labelKey);
  const shiftLabel = shiftLabelKey ? label(shiftLabelKey) : undefined;
  const displayLabel = isShifted && shiftLabel ? shiftLabel : mainLabel;
  const cls = [
    "key-button",
    category ? `key-${category}` : "",
    isActive ? "key-active" : "",
    isShifted && shiftLabel ? "key-shiftable" : "",
  ].filter(Boolean).join(" ");
  const style = colSpan ? { gridColumn: `span ${colSpan}` } : undefined;
  return (
    <button className={cls} style={style} onClick={onClick} type="button" aria-label={displayLabel}>
      {shiftLabel && <span className="key-shift-label">{shiftLabel}</span>}
      <span className="key-main-label">{displayLabel}</span>
    </button>
  );
}
