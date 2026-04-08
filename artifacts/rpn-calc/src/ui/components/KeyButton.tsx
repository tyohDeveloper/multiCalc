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
  const displayLabel = isShifted && shiftLabelKey ? label(shiftLabelKey) : label(labelKey);
  const cls = [
    "key-button",
    category ? `key-${category}` : "",
    isActive ? "key-active" : "",
    isShifted && shiftLabelKey ? "key-shiftable shifted" : "",
  ].filter(Boolean).join(" ");
  const style = colSpan ? { gridColumn: `span ${colSpan}` } : undefined;
  return (
    <button className={cls} style={style} onClick={onClick} type="button">
      {shiftLabelKey && <span className="key-shift-label">{label(shiftLabelKey)}</span>}
      <span className="key-main-label">{label(labelKey)}</span>
    </button>
  );
}
