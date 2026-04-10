import { resolveKeyAction } from "./resolveKeyAction";
import { noOp } from "./keyFunctions";
import type { KeyFunctions, KeyFunctionRegistry } from "./keyFunctions";
import type { CalcAction } from "../../state/calculatorState";
import keyData from "../../data/hp48Keys.json";

const ZERO_WIDTH_SPACE = "\u200B";

function isNonEmpty(label: string | undefined): boolean {
  return !!label && label !== ZERO_WIDTH_SPACE;
}

const SHIFT_OPS = new Set(["SHIFT_MAGENTA", "SHIFT_CYAN", "SHIFT_BOTTOM"]);

type RawKey = {
  id: string;
  op: string;
  shiftOp?: string;
  shiftLabelKey?: string;
  topMagenta?: string;
  topCyan?: string;
  magentaOp?: string;
  cyanOp?: string;
  [key: string]: unknown;
};

function buildFunctions(
  key: RawKey,
  bottomAlpha: string | undefined,
  dispatch: (action: CalcAction) => void,
): KeyFunctions {
  if (SHIFT_OPS.has(key.op)) {
    const shiftAction = (): void => { dispatch(resolveKeyAction(key.op)); };
    return {
      fnKeyUnshifted: shiftAction,
      fnKeyMagenta: shiftAction,
      fnKeyCyan: shiftAction,
      fnKeyBottom: shiftAction,
    };
  }

  const fnKeyUnshifted = (): void => {
    dispatch(resolveKeyAction(key.op));
  };

  const magentaOp = key.magentaOp ?? (key.shiftLabelKey ? key.shiftOp : undefined);
  const fnKeyMagenta: () => void = isNonEmpty(key.topMagenta) || isNonEmpty(magentaOp)
    ? (magentaOp
      ? (): void => { dispatch(resolveKeyAction(magentaOp)); }
      : noOp)
    : noOp;

  const cyanOp = key.cyanOp;
  const fnKeyCyan: () => void = isNonEmpty(key.topCyan) && cyanOp
    ? (): void => { dispatch(resolveKeyAction(cyanOp)); }
    : noOp;

  const fnKeyBottom: () => void = isNonEmpty(bottomAlpha) && bottomAlpha !== undefined
    ? (): void => { dispatch({ type: "ALPHA_CHAR", char: bottomAlpha }); }
    : noOp;

  return { fnKeyUnshifted, fnKeyMagenta, fnKeyCyan, fnKeyBottom };
}

export function buildKeyFunctionRegistry(
  dispatch: (action: CalcAction) => void,
  alphaRows: Record<string, string[]>,
): KeyFunctionRegistry {
  const registry: KeyFunctionRegistry = {};

  for (const section of keyData.sections) {
    for (const row of section.rows) {
      row.keys.forEach((jsonKey, idx) => {
        const rawKey = jsonKey as RawKey;
        const bottomAlpha = alphaRows[row.id]?.[idx];
        registry[rawKey.id] = buildFunctions(rawKey, bottomAlpha, dispatch);
      });
    }
  }

  return registry;
}
