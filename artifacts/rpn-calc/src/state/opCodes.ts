export type ExecOpCode =
  | "ADD" | "SUBTRACT" | "MULTIPLY" | "DIVIDE"
  | "SQRT" | "SQUARE" | "POWER" | "XROOT"
  | "EXP" | "LN" | "LOG" | "TENPOW" | "RECIPROCAL"
  | "PERCENT" | "PERCENT_CHANGE" | "PI" | "E_CONST"
  | "SIN" | "COS" | "TAN" | "ASIN" | "ACOS" | "ATAN"
  | "DROP" | "SWAP" | "ROLL_UP" | "ROLL_DOWN" | "CLEAR" | "LAST_X"
  | "TOGGLE_SIGN";

export const PLACEHOLDER_OPS: ReadonlySet<string> = new Set([
  "OP_NONE", "OP_MTH", "OP_PRG", "OP_CST", "OP_VAR", "OP_HIST",
  "OP_OFF", "OP_PREV", "OP_NXT", "OP_SOLV", "OP_DIR", "OP_SYMB",
  "OP_MTRX", "OP_STO", "OP_RCL", "OP_EVAL",
  "SOFTKEY_A", "SOFTKEY_B", "SOFTKEY_C", "SOFTKEY_D", "SOFTKEY_E", "SOFTKEY_F",
  "ABS", "CEIL", "FLOOR", "INTDIV", "MAX", "MIN", "MOD", "SIGN", "SIGMA_PLUS",
]);
