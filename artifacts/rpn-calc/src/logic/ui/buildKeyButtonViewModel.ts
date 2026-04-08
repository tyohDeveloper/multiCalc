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
  const parts = ["key-button", category ? `key-${category}` : "", isActive ? "key-active" : ""];
  return {
    displayLabel,
    className: parts.filter(Boolean).join(" "),
    ariaLabel: displayLabel,
  };
}
