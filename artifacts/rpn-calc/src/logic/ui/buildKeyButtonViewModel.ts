import { label } from "../i18n/label";

export interface KeyButtonVM {
  displayLabel: string;
  shiftLabel: string | undefined;
  className: string;
  colSpanStyle: { gridColumn: string } | undefined;
  ariaLabel: string;
}

export function buildKeyButtonViewModel(
  labelKey: string,
  shiftLabelKey: string | undefined,
  isShifted: boolean,
  category: string | undefined,
  colSpan: number | undefined,
  isActive: boolean | undefined,
): KeyButtonVM {
  const mainLabel = label(labelKey);
  const shiftLabel = shiftLabelKey ? label(shiftLabelKey) : undefined;
  const displayLabel = isShifted && shiftLabel ? shiftLabel : mainLabel;
  const parts = ["key-button", category ? `key-${category}` : "", isActive ? "key-active" : "", isShifted && shiftLabel ? "key-shiftable" : ""];
  return {
    displayLabel,
    shiftLabel,
    className: parts.filter(Boolean).join(" "),
    colSpanStyle: colSpan ? { gridColumn: `span ${colSpan}` } : undefined,
    ariaLabel: displayLabel,
  };
}
