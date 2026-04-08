import { buildKeyButtonViewModel } from "../../logic/ui/buildKeyButtonViewModel";

interface Props {
  labelKey: string;
  onClick: () => void;
  category?: string;
  isActive?: boolean;
}

export function KeyButton({ labelKey, onClick, category, isActive }: Props) {
  const vm = buildKeyButtonViewModel(labelKey, category, isActive);
  return (
    <button className={vm.className} onClick={onClick} type="button" aria-label={vm.ariaLabel}>
      <span className="key-main-label">{vm.displayLabel}</span>
    </button>
  );
}
