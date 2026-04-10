export type MathOpCode =
  | "ADD" | "SUBTRACT" | "MULTIPLY" | "DIVIDE"
  | "SQRT" | "SQUARE" | "POWER" | "XROOT"
  | "EXP" | "LN" | "LOG" | "TENPOW" | "RECIPROCAL"
  | "PERCENT" | "PERCENT_CHANGE" | "PI" | "E_CONST"
  | "ABS" | "CEIL" | "FLOOR" | "SIGN"
  | "MOD" | "INTDIV" | "MAX" | "MIN";

export type TrigOpCode = "SIN" | "COS" | "TAN" | "ASIN" | "ACOS" | "ATAN";

export type StackOpCode =
  | "DROP" | "SWAP" | "ROLL_UP" | "ROLL_DOWN" | "CLEAR" | "LAST_X" | "TOGGLE_SIGN";

export type InputOpCode = "IMAG_SEP";

export type ExecOpCode = MathOpCode | TrigOpCode | StackOpCode | InputOpCode;

export type PlaceholderOpCode =
  | "OP_NONE" | "OP_MTH" | "OP_PRG" | "OP_CST" | "OP_VAR" | "OP_HIST"
  | "OP_OFF" | "OP_PREV" | "OP_NXT" | "OP_SOLV" | "OP_DIR" | "OP_SYMB"
  | "OP_MTRX" | "OP_STO" | "OP_RCL" | "OP_EVAL"
  | "SOFTKEY_A" | "SOFTKEY_B" | "SOFTKEY_C" | "SOFTKEY_D" | "SOFTKEY_E" | "SOFTKEY_F"
  | "SIGMA_PLUS"
  | "PLOT_RS" | "PLOT" | "GFX_TYPE" | "GFX_SETUP" | "GFX_RANGE" | "GFX_ZOOM" | "GFX_TRACE"
  | "GFX_ARROW_UP" | "GFX_ARROW_DOWN" | "GFX_ARROW_LEFT" | "GFX_ARROW_RIGHT"
  | "CLLCD" | "CLRG" | "GFX_LINE" | "GFX_BOX" | "GFX_CIRCL" | "GFX_ARC"
  | "STO_PICT" | "RCL_PICT" | "GFX_ERASE" | "GFX_CENT" | "GFX_CNTR" | "GFX_COORD" | "GFX_CNCT";

export type KeyOpCode = ExecOpCode | PlaceholderOpCode;

const EXEC_OPS_SET: ReadonlySet<string> = new Set<ExecOpCode>([
  "ADD", "SUBTRACT", "MULTIPLY", "DIVIDE",
  "SQRT", "SQUARE", "POWER", "XROOT",
  "EXP", "LN", "LOG", "TENPOW", "RECIPROCAL",
  "PERCENT", "PERCENT_CHANGE", "PI", "E_CONST",
  "ABS", "CEIL", "FLOOR", "SIGN",
  "MOD", "INTDIV", "MAX", "MIN",
  "SIN", "COS", "TAN", "ASIN", "ACOS", "ATAN",
  "DROP", "SWAP", "ROLL_UP", "ROLL_DOWN", "CLEAR", "LAST_X", "TOGGLE_SIGN",
  "IMAG_SEP",
]);

export const PLACEHOLDER_OPS: ReadonlySet<string> = new Set<PlaceholderOpCode>([
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

export function isExecOpCode(op: string): op is ExecOpCode {
  return EXEC_OPS_SET.has(op);
}

export function isPlaceholderOpCode(op: string): op is PlaceholderOpCode {
  return PLACEHOLDER_OPS.has(op);
}

export type SuppressionFlag = "noGraphics" | "noProgramming" | "noMatrix";

const PROGRAMMING_OPS: ReadonlySet<string> = new Set<KeyOpCode>(["OP_PRG", "OP_EVAL"]);
const MATRIX_OPS: ReadonlySet<string> = new Set<KeyOpCode>(["OP_MTRX"]);
const GRAPHICS_OPS: ReadonlySet<string> = new Set<KeyOpCode>([
  "OP_SYMB", "OP_SOLV", "SIGMA_PLUS",
  "PLOT_RS", "PLOT", "GFX_TYPE", "GFX_SETUP", "GFX_RANGE", "GFX_ZOOM", "GFX_TRACE",
  "GFX_ARROW_UP", "GFX_ARROW_DOWN", "GFX_ARROW_LEFT", "GFX_ARROW_RIGHT",
  "CLLCD", "CLRG", "GFX_LINE", "GFX_BOX", "GFX_CIRCL", "GFX_ARC",
  "STO_PICT", "RCL_PICT", "GFX_ERASE", "GFX_CENT", "GFX_CNTR", "GFX_COORD", "GFX_CNCT",
]);

export function opSuppressedBy(op: string): SuppressionFlag | null {
  if (PROGRAMMING_OPS.has(op)) return "noProgramming";
  if (MATRIX_OPS.has(op)) return "noMatrix";
  if (GRAPHICS_OPS.has(op)) return "noGraphics";
  return null;
}
