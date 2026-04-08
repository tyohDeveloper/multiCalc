import { t } from "../i18n/t";

export function formatSpecial(value: number): string {
  if (isNaN(value)) return t("error-nan");
  return value > 0 ? t("infinity-pos") : t("infinity-neg");
}
