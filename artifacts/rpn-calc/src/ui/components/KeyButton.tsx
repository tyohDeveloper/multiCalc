import { buildKeyButtonViewModel } from "../../logic/ui/buildKeyButtonViewModel";

interface Props {
  labelKey: string;
  onClick: () => void;
  category?: string;
  isActive?: boolean;
  testId?: string;
  keyOp?: string;
}

export function KeyButton({ labelKey, onClick, category, isActive, testId, keyOp }: Props) {
  const vm = buildKeyButtonViewModel(labelKey, category, isActive);
  const isMathML = vm.displayLabel.trimStart().startsWith("<math");
  return (
    <button
      className={vm.className}
      onClick={onClick}
      type="button"
      aria-label={vm.ariaLabel}
      data-testid={testId}
      data-key-op={keyOp}
    >
      {isMathML ? (
        <span className="key-main-label key-main-label--mathml" dangerouslySetInnerHTML={{ __html: vm.displayLabel }} />
      ) : (
        <span className="key-main-label">{vm.displayLabel}</span>
      )}
    </button>
  );
}
