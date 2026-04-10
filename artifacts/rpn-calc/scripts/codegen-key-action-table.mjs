#!/usr/bin/env node
/**
 * Build-time codegen: reads hp48Keys.json + ALPHA_ROWS, validates all op codes,
 * and emits src/generated/keyActionTable.ts with a fully-typed KeyActionTable constant.
 *
 * Usage: node scripts/codegen-key-action-table.mjs
 *
 * To adopt this pattern for a second calculator:
 *   node scripts/codegen-key-action-table.mjs \
 *     --keys src/data/myCalcKeys.json \
 *     --alpha src/config/myAlphaRows.json \
 *     --out src/generated/myCalcKeyActionTable.ts
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// --- CLI arg overrides (for reuse with other calculators) ---
const args = process.argv.slice(2);
function getArg(flag, def) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : def;
}

const KEYS_PATH   = getArg("--keys",  join(ROOT, "src/data/hp48Keys.json"));
const ALPHA_PATH  = getArg("--alpha", null);          // optional; null → use built-in map
const OUT_PATH    = getArg("--out",   join(ROOT, "src/generated/keyActionTable.ts"));

// --- Read suppression config from scripts/suppressionConfig.json ---
const SUPPRESSION_CONFIG_PATH = join(__dirname, "suppressionConfig.json");
const suppressionConfig = JSON.parse(readFileSync(SUPPRESSION_CONFIG_PATH, "utf8"));

const NO_GRAPHICS    = !!suppressionConfig.NO_GRAPHICS;
const NO_PROGRAMMING = !!suppressionConfig.NO_PROGRAMMING;
const NO_MATRIX      = !!suppressionConfig.NO_MATRIX;

// Build set of active suppression categories based on active flags
const activeSuppressions = new Set();
if (NO_GRAPHICS)    activeSuppressions.add("noGraphics");
if (NO_PROGRAMMING) activeSuppressions.add("noProgramming");
if (NO_MATRIX)      activeSuppressions.add("noMatrix");

// Label fields that are stripped when a key is suppressed
const LABEL_FIELDS = ["topCyan", "topCyanMerged", "topMagenta", "topMagentaMerged", "topMerged", "cyanOp"];

function stripSuppressedLabels(key) {
  if (!key.suppressedBy || !activeSuppressions.has(key.suppressedBy)) return key;
  const stripped = { ...key };
  for (const field of LABEL_FIELDS) {
    delete stripped[field];
  }
  return stripped;
}

console.log(`[codegen] Active suppressions: ${[...activeSuppressions].join(", ") || "none"}`);

// --- Valid op codes (must match src/state/opCodes.ts) ---
const EXEC_OPS = new Set([
  "ADD", "SUBTRACT", "MULTIPLY", "DIVIDE",
  "SQRT", "SQUARE", "POWER", "XROOT",
  "EXP", "LN", "LOG", "TENPOW", "RECIPROCAL",
  "PERCENT", "PERCENT_CHANGE", "PI", "E_CONST",
  "ABS", "CEIL", "FLOOR", "SIGN",
  "MOD", "INTDIV", "MAX", "MIN",
  "MTRX_TRN", "MTRX_DET", "MTRX_INV", "MTRX_SCALE",
  "MTRX_ADD", "MTRX_SUB", "MTRX_MUL",
  "MTRX_IDN", "MTRX_CON",
  "MTRX_RNRM", "MTRX_CNRM", "MTRX_TRACE", "MTRX_TRAN",
  "MTRX_RSD", "MTRX_SVD", "MTRX_SCHUR", "MTRX_EIGV", "MTRX_LU", "MTRX_QR",
  "SIN", "COS", "TAN", "ASIN", "ACOS", "ATAN",
  "DROP", "SWAP", "ROLL_UP", "ROLL_DOWN", "CLEAR", "LAST_X", "TOGGLE_SIGN",
  "DUP", "OVER", "ROT", "PICK", "ROLL", "ROLLD",
  "IMAG_SEP",
  "PROG_OPEN", "PROG_CLOSE", "STO_ARROW", "TO_LIST", "TO_ARRY", "TO_STR", "TO_Q",
  "IF", "THEN", "ELSE", "END_IF", "CASE", "END_CASE",
  "FOR", "NEXT_LOOP", "START_LOOP", "STEP_LOOP",
  "DO", "UNTIL", "WHILE", "REPEAT", "IFERR",
  "IFT", "IFTE",
  "GET", "PUT", "GETI", "PUTI", "HEAD", "TAIL",
  "EXPORT", "INPUT_CMD", "MSGBOX", "MENU_CMD", "CST_CMD", "VAR_CMD", "EVAL_CMD", "EDIT_CMD",
  "ASM", "CHOOSE", "PURGE", "CRDIR", "RCLF", "STOF", "SF", "CF",
  "UPDIR_CMD", "HOME_CMD", "USER_MODE", "NXT_CMD", "PREV_CMD",
]);

const PLACEHOLDER_OPS = new Set([
  "OP_NONE", "OP_MTH", "OP_PRG", "OP_CST", "OP_VAR", "OP_HIST",
  "OP_OFF", "OP_PREV", "OP_NXT", "OP_SOLV", "OP_DIR", "OP_SYMB",
  "OP_MTRX", "OP_STO", "OP_RCL", "OP_EVAL",
  "SOFTKEY_A", "SOFTKEY_B", "SOFTKEY_C", "SOFTKEY_D", "SOFTKEY_E", "SOFTKEY_F",
  "SIGMA_PLUS",
  "PLOT_RS", "PLOT", "GFX_TYPE", "GFX_SETUP", "GFX_RANGE", "GFX_ZOOM", "GFX_TRACE",
  "GFX_ARROW_UP", "GFX_ARROW_DOWN", "GFX_ARROW_LEFT", "GFX_ARROW_RIGHT",
  "CLLCD", "CLRG", "GFX_LINE", "GFX_BOX", "GFX_CIRCL", "GFX_ARC",
  "STO_PICT", "RCL_PICT", "GFX_ERASE", "GFX_CENT", "GFX_CNTR", "GFX_COORD", "GFX_CNCT",
]);

const SHIFT_OPS = new Set(["SHIFT_MAGENTA", "SHIFT_CYAN", "SHIFT_BOTTOM"]);

const SPECIAL_OPS = new Set([
  "ENTER", "BACKSPACE", "DECIMAL", "EEX_KEY",
  "ANGLE_DEG", "ANGLE_RAD", "ANGLE_GRAD",
  "DISPLAY_STD", "DISPLAY_FIX", "DISPLAY_SCI", "DISPLAY_ENG",
]);

function isKnownOp(op) {
  if (EXEC_OPS.has(op)) return true;
  if (PLACEHOLDER_OPS.has(op)) return true;
  if (SHIFT_OPS.has(op)) return true;
  if (SPECIAL_OPS.has(op)) return true;
  if (op.startsWith("DIGIT_")) return true;
  return false;
}

// --- Alpha rows (built-in for hp48, overridable via JSON file) ---
const BUILT_IN_ALPHA_ROWS = {
  "soft-0":   ["A", "B", "C", "D", "E", "F"],
  "top-fn-1": ["G", "H", "I", "J", "K", "L"],
  "top-fn-2": ["M", "N", "O", "P", "Q", "R"],
  "top-fn-3": ["S", "T", "U", "V", "W", "X"],
  "top-fn-4": ["\u200B", "Y", "Z", "\u200B", "\u200B"],
  "top-fn-5": ["\u200B", "\u200B", "\u200B", "\u200B", "\u200B", "\u200B"],
  "top-fn-6": ["\u200B", "\u200B", "\u200B", "\u200B", "\u200B", "\u200B"],
  "top-fn-7": ["\u200B", "\u200B", "\u200B", "\u200B", "\u200B", "\u200B"],
  "top-fn-8": ["\u200B", "\u200B", "\u200B", "\u200B", "\u200B", "\u200B"],
};

const alphaRows = ALPHA_PATH
  ? JSON.parse(readFileSync(ALPHA_PATH, "utf8"))
  : BUILT_IN_ALPHA_ROWS;

// --- Load key data ---
const keyData = JSON.parse(readFileSync(KEYS_PATH, "utf8"));

// --- Validation helpers ---
const errors = [];
const warnings = [];
const seenIds = new Set();

function requireKnownOp(op, context) {
  if (!isKnownOp(op)) {
    errors.push(`Unknown op code "${op}" in ${context}`);
  }
}

function checkDuplicateId(id, context) {
  if (seenIds.has(id)) {
    errors.push(`Duplicate key ID "${id}" in ${context}`);
  } else {
    seenIds.add(id);
  }
}

// --- Build action serializers ---
// Returns a TypeScript object literal string for a CalcAction
function resolveActionLiteral(op, context) {
  requireKnownOp(op, context);

  if (op === "SHIFT_MAGENTA" || op === "SHIFT_KEY") return `{ type: "SHIFT", target: "shiftedMagenta" }`;
  if (op === "SHIFT_CYAN")    return `{ type: "SHIFT", target: "shiftedCyan" }`;
  if (op === "SHIFT_BOTTOM")  return `{ type: "SHIFT", target: "shiftedBottom" }`;
  if (op === "ENTER")         return `{ type: "ENTER" }`;
  if (op === "BACKSPACE")     return `{ type: "BACKSPACE" }`;
  if (op === "DECIMAL")       return `{ type: "DECIMAL" }`;
  if (op === "EEX_KEY")       return `{ type: "EEX" }`;
  if (op === "ANGLE_DEG")     return `{ type: "ANGLE_MODE", mode: "DEG" }`;
  if (op === "ANGLE_RAD")     return `{ type: "ANGLE_MODE", mode: "RAD" }`;
  if (op === "ANGLE_GRAD")    return `{ type: "ANGLE_MODE", mode: "GRAD" }`;
  if (op === "DISPLAY_STD")   return `{ type: "DISPLAY_MODE", mode: "STD" }`;
  if (op === "DISPLAY_FIX")   return `{ type: "DISPLAY_MODE", mode: "FIX" }`;
  if (op === "DISPLAY_SCI")   return `{ type: "DISPLAY_MODE", mode: "SCI" }`;
  if (op === "DISPLAY_ENG")   return `{ type: "DISPLAY_MODE", mode: "ENG" }`;
  if (op.startsWith("DIGIT_")) {
    const digit = op.slice(6);
    return `{ type: "DIGIT", digit: "${digit}" }`;
  }
  // ExecOpCode or PlaceholderOpCode → generic OP action
  return `{ type: "OP", op: "${op}" }`;
}

const ZERO_WIDTH_SPACE = "\u200B";

function isNonEmpty(s) {
  return !!s && s !== ZERO_WIDTH_SPACE;
}

function alphaActionLiteral(char) {
  if (!char || char === ZERO_WIDTH_SPACE) return null;
  const escaped = char.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `{ type: "ALPHA_CHAR", char: "${escaped}" }`;
}

const noOpLiteral = `{ type: "OP", op: "OP_NONE" }`;

// --- Check if a key is suppressed at build time ---
function isKeySuppressed(key) {
  return !!key.suppressedBy && activeSuppressions.has(key.suppressedBy);
}

// --- Process keys ---
const tableEntries = [];

for (const section of keyData.sections) {
  // Skip entire section if its suppressedBy flag is active
  if (section.suppressedBy && activeSuppressions.has(section.suppressedBy)) continue;
  for (const row of section.rows) {
    // Skip entire row if its suppressedBy flag is active
    if (row.suppressedBy && activeSuppressions.has(row.suppressedBy)) continue;
    row.keys.forEach((rawKey, idx) => {
      const key = stripSuppressedLabels(rawKey);
      const context = `section "${section.id}", row "${row.id}", key "${key.id}"`;

      checkDuplicateId(key.id, context);

      // Primary op (required)
      if (!key.op) {
        errors.push(`Missing "op" field in ${context}`);
        return;
      }

      const suppressed = isKeySuppressed(rawKey);
      const isShiftKey = SHIFT_OPS.has(key.op);

      // Always validate the primary op, even for suppressed keys, to catch bad op codes in the JSON
      requireKnownOp(key.op, context);

      // unshifted action — suppressed keys always produce OP_NONE
      const unshiftedAction = suppressed ? noOpLiteral : resolveActionLiteral(key.op, context);

      let magentaAction;
      let cyanAction;
      let bottomAction;

      if (suppressed) {
        // Suppressed keys: validate any shift ops to catch bad op codes in the JSON,
        // but emit OP_NONE for all states — nothing from a suppressed key reaches the reducer
        if (key.shiftOp) requireKnownOp(key.shiftOp, `${context} [shiftOp]`);
        if (key.magentaOp) requireKnownOp(key.magentaOp, `${context} [magentaOp]`);
        if (key.cyanOp) requireKnownOp(key.cyanOp, `${context} [cyanOp]`);
        magentaAction = noOpLiteral;
        cyanAction    = noOpLiteral;
        bottomAction  = noOpLiteral;
      } else if (isShiftKey) {
        // Shift keys: all states dispatch the same shift action
        magentaAction = unshiftedAction;
        cyanAction    = unshiftedAction;
        bottomAction  = unshiftedAction;
      } else {
        // Magenta: magentaOp ?? (shiftLabelKey present → shiftOp) ?? noOp
        const magentaOp = key.magentaOp ?? (key.shiftLabelKey ? key.shiftOp : undefined);
        if (isNonEmpty(key.topMagenta) || isNonEmpty(magentaOp)) {
          magentaAction = magentaOp
            ? resolveActionLiteral(magentaOp, `${context} [shiftedMagenta]`)
            : noOpLiteral;
        } else {
          magentaAction = noOpLiteral;
        }

        // Cyan: cyanOp + topCyan must both be set
        const cyanOp = key.cyanOp;
        if (isNonEmpty(key.topCyan) && cyanOp) {
          cyanAction = resolveActionLiteral(cyanOp, `${context} [shiftedCyan]`);
        } else {
          cyanAction = noOpLiteral;
        }

        // Bottom: alpha character from alphaRows
        const bottomAlpha = alphaRows[row.id]?.[idx];
        const alphaLit = alphaActionLiteral(bottomAlpha);
        bottomAction = alphaLit ?? noOpLiteral;
      }

      tableEntries.push({ id: key.id, unshiftedAction, magentaAction, cyanAction, bottomAction });
    });
  }
}

// --- Report errors and exit on failure ---
if (errors.length > 0) {
  console.error("\n[codegen] FAILED — key action table codegen errors:\n");
  for (const err of errors) {
    console.error(`  ✗ ${err}`);
  }
  console.error(`\n${errors.length} error(s) found. Fix them in hp48Keys.json or opCodes.ts.\n`);
  process.exit(1);
}

for (const w of warnings) {
  console.warn(`[codegen] WARN: ${w}`);
}

// --- Emit TypeScript ---
const lines = [
  "/**",
  " * AUTO-GENERATED by scripts/codegen-key-action-table.mjs",
  " * Do not edit this file directly — edit hp48Keys.json and re-run `pnpm codegen`.",
  " *",
  " * To adopt this pattern for another calculator:",
  " *   node scripts/codegen-key-action-table.mjs --keys src/data/otherKeys.json --out src/generated/otherKeyActionTable.ts",
  " */",
  "",
  'import type { CalcAction, ShiftState } from "../state/calculatorState";',
  "",
  "export type KeyId = string;",
  "",
  "export type KeyActionTable = Record<KeyId, Record<ShiftState, CalcAction>>;",
  "",
  "const keyActionTable: KeyActionTable = {",
];

for (const entry of tableEntries) {
  lines.push(`  "${entry.id}": {`);
  lines.push(`    unshifted:     ${entry.unshiftedAction},`);
  lines.push(`    shiftedMagenta: ${entry.magentaAction},`);
  lines.push(`    shiftedCyan:   ${entry.cyanAction},`);
  lines.push(`    shiftedBottom: ${entry.bottomAction},`);
  lines.push(`  },`);
}

lines.push("};");
lines.push("");
lines.push("export default keyActionTable;");
lines.push("");

const output = lines.join("\n");

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, output, "utf8");

console.log(`[codegen] Generated ${tableEntries.length} key action entries → ${OUT_PATH.replace(ROOT + "/", "")}`);

// --- Emit filtered key layout data (suppressed labels stripped) ---
// KeyGrid imports this instead of hp48Keys.json directly, so suppressed labels
// are absent from the compiled bundle rather than just hidden at runtime.
const LAYOUT_PATH = getArg("--layout-out", join(ROOT, "src/generated/keyLayoutData.ts"));

function filterKeyForLayout(rawKey) {
  const key = stripSuppressedLabels(rawKey);
  // Return a clean object with only the fields KeyGrid needs, minus suppressed ones
  const result = {};
  const keep = [
    "id", "op", "labelKey", "category", "colSpan",
    "topMagenta", "topCyan", "topMerged", "topMagentaMerged", "topCyanMerged",
    "topMagentaBig", "topCyanBig", "topColor",
    "shiftLabelKey", "shiftOp",
  ];
  for (const field of keep) {
    if (key[field] !== undefined) result[field] = key[field];
  }
  return result;
}

const filteredSections = keyData.sections
  .filter((section) => !(section.suppressedBy && activeSuppressions.has(section.suppressedBy)))
  .map((section) => ({
    ...section,
    rows: section.rows
      .filter((row) => !(row.suppressedBy && activeSuppressions.has(row.suppressedBy)))
      .map((row) => ({
        ...row,
        keys: row.keys
          .filter((rawKey) => !(rawKey.suppressedBy && activeSuppressions.has(rawKey.suppressedBy)))
          .map(filterKeyForLayout),
      })),
  }));

const layoutJson = JSON.stringify({ sections: filteredSections, ...Object.fromEntries(Object.entries(keyData).filter(([k]) => k !== "sections")) }, null, 2);

const layoutLines = [
  "/**",
  " * AUTO-GENERATED by scripts/codegen-key-action-table.mjs",
  " * Do not edit this file directly — edit hp48Keys.json and re-run `pnpm codegen`.",
  " *",
  " * Graphics-only labels (and other suppressed labels) are stripped at codegen time",
  " * based on the active flags in scripts/suppressionConfig.json.",
  " */",
  "",
  "const keyLayoutData = " + layoutJson + ";",
  "",
  "export default keyLayoutData;",
  "",
];

writeFileSync(LAYOUT_PATH, layoutLines.join("\n"), "utf8");
console.log(`[codegen] Generated filtered key layout data → ${LAYOUT_PATH.replace(ROOT + "/", "")}`);
