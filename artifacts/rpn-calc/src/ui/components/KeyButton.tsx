import { buildKeyButtonViewModel } from "../../logic/ui/buildKeyButtonViewModel";

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
  const vm = buildKeyButtonViewModel(labelKey, shiftLabelKey, isShifted, category, colSpan, isActive);
  return (
    <button className={vm.className} style={vm.colSpanStyle} onClick={onClick} type="button" aria-label={vm.ariaLabel}>
      {vm.shiftLabel && <span className="key-shift-label">{vm.shiftLabel}</span>}
      <span className="key-main-label">{vm.displayLabel}</span>
    </button>
  );
}
