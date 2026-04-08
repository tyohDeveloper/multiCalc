import { label } from "../i18n/label";

export interface KeyButtonVM {
  displayLabel: string;
  className: string;
  ariaLabel: string;
}

export function buildKeyButtonViewModel(
  labelKey: string,
  category: string | undefined,
  isActive: boolean | undefined,
): KeyButtonVM {
  const displayLabel = label(labelKey);
  const isMathML = displayLabel.trimStart().startsWith("<math");
  const ariaLabel = isMathML ? labelKey : displayLabel;
  const parts = ["key-button", category ? `key-${category}` : "", isActive ? "key-active" : ""];
  return {
    displayLabel,
    className: parts.filter(Boolean).join(" "),
    ariaLabel,
  };
}
