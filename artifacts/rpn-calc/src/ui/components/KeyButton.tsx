import { buildKeyButtonViewModel } from "../../logic/ui/buildKeyButtonViewModel";

interface Props {
  labelKey: string;
  onClick: () => void;
  category?: string;
  isActive?: boolean;
  testId?: string;
  keyOp?: string;
  topColor?: string;
  labelOverride?: string;
}

export function KeyButton({ labelKey, onClick, category, isActive, testId, keyOp, labelOverride }: Props) {
  const vm = buildKeyButtonViewModel(labelKey, category, isActive);
  const displayText = labelOverride !== undefined ? labelOverride : vm.displayLabel;
  const isMathML = displayText.trimStart().startsWith("<math");
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
        <span className="key-main-label key-main-label--mathml" dangerouslySetInnerHTML={{ __html: displayText }} />
      ) : (
        <span className="key-main-label">{displayText}</span>
      )}
    </button>
  );
}
