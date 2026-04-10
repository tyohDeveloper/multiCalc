import { formatStackValue } from "./formatStackValue";
import { formatEntryBuffer } from "./formatEntryBuffer";
import { t } from "../i18n/t";
import type { CalcState } from "../../state/calculatorState";

export interface StackRowVM {
  label: string;
  value: string;
  isEntry: boolean;
}

export function buildStackRows(state: CalcState): StackRowVM[] {
  const { stack, entry, displayMode, displayPrecision } = state;
  const fmt = (v: typeof stack[0]) => formatStackValue(v, displayMode, displayPrecision);
  return [
    { label: t("stack-t"), value: fmt(stack[3]), isEntry: false },
    { label: t("stack-z"), value: fmt(stack[2]), isEntry: false },
    { label: t("stack-y"), value: fmt(stack[1]), isEntry: false },
    { label: t("stack-x"), value: entry.isActive ? formatEntryBuffer(entry) : fmt(stack[0]), isEntry: entry.isActive },
  ];
}
