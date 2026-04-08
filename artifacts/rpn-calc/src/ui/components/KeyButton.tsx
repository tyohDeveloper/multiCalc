import { buildKeyButtonViewModel } from "../../logic/ui/buildKeyButtonViewModel";

interface Props {
  labelKey: string;
  onClick: () => void;
  category?: string;
  isActive?: boolean;
}

export function KeyButton({ labelKey, onClick, category, isActive }: Props) {
  const vm = buildKeyButtonViewModel(labelKey, category, isActive);
  const isMathML = vm.displayLabel.trimStart().startsWith("<math");
  return (
    <button className={vm.className} onClick={onClick} type="button" aria-label={vm.ariaLabel}>
      {isMathML ? (
        <span className="key-main-label key-main-label--mathml" dangerouslySetInnerHTML={{ __html: vm.displayLabel }} />
      ) : (
        <span className="key-main-label">{vm.displayLabel}</span>
      )}
    </button>
  );
}
