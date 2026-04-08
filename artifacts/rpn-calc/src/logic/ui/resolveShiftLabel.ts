import { label } from "../i18n/label";

export function resolveShiftLabel(shiftLabelKey: string | undefined): string {
  return shiftLabelKey ? label(shiftLabelKey) : "";
}
