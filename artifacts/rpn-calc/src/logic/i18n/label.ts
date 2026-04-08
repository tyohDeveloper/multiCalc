import { cascadeResolve } from "../shared/cascadeResolve";
import labelsBase from "../../config/labels.json";

const resolved = cascadeResolve(labelsBase);

export function label(key: string): string {
  return resolved[key] ?? key;
}
