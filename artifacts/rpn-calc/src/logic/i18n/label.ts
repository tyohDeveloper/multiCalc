import { cascadeResolve } from "../shared/cascadeResolve";
import labelsBase from "../../config/labels.json";
import labelsText from "../../config/labels-text.json";
import appConfig from "../../config/app.json";

const variant = appConfig.labelStyle === "text" ? labelsText : undefined;
const resolved = cascadeResolve(labelsBase, variant);

export function label(key: string): string {
  return resolved[key] ?? key;
}
