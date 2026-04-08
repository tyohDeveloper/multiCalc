import { cascadeResolve } from "../shared/cascadeResolve";
import enLocale from "../../locales/en.json";
import enUsLocale from "../../locales/en-us.json";

const resolved = cascadeResolve(enLocale, enUsLocale);

export function t(key: string): string {
  return resolved[key] ?? key;
}
