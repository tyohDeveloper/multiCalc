export type MathOpCode =
  | "ADD" | "SUBTRACT" | "MULTIPLY" | "DIVIDE"
  | "SQRT" | "SQUARE" | "POWER" | "XROOT"
  | "EXP" | "LN" | "LOG" | "TENPOW" | "RECIPROCAL"
  | "PERCENT" | "PERCENT_CHANGE" | "PI" | "E_CONST"
  | "ABS" | "CEIL" | "FLOOR" | "SIGN"
  | "MOD" | "INTDIV" | "MAX" | "MIN";

export type MatrixOpCode =
  | "MTRX_TRN"
  | "MTRX_DET"
  | "MTRX_INV"
  | "MTRX_SCALE"
  | "MTRX_ADD"
  | "MTRX_SUB"
  | "MTRX_MUL"
  | "MTRX_IDN"
  | "MTRX_CON"
  | "MTRX_RNRM"
  | "MTRX_CNRM"
  | "MTRX_TRACE"
  | "MTRX_TRAN"
  | "MTRX_RSD"
  | "MTRX_SVD"
  | "MTRX_SCHUR"
  | "MTRX_EIGV"
  | "MTRX_LU"
  | "MTRX_QR";

export type TrigOpCode = "SIN" | "COS" | "TAN" | "ASIN" | "ACOS" | "ATAN";

export type StackOpCode =
  | "DROP" | "SWAP" | "ROLL_UP" | "ROLL_DOWN" | "CLEAR" | "LAST_X" | "TOGGLE_SIGN"
  | "DUP" | "OVER" | "ROT" | "PICK" | "ROLL" | "ROLLD";

export type InputOpCode = "IMAG_SEP";

export type ProgOpCode =
  | "PROG_OPEN" | "PROG_CLOSE" | "STO_ARROW" | "TO_LIST" | "TO_ARRY" | "TO_STR" | "TO_Q"
  | "IF" | "THEN" | "ELSE" | "END_IF" | "CASE" | "END_CASE"
  | "FOR" | "NEXT_LOOP" | "START_LOOP" | "STEP_LOOP"
  | "DO" | "UNTIL" | "WHILE" | "REPEAT" | "IFERR"
  | "IFT" | "IFTE"
  | "GET" | "PUT" | "GETI" | "PUTI" | "HEAD" | "TAIL"
  | "EXPORT" | "INPUT_CMD" | "MSGBOX" | "MENU_CMD" | "CST_CMD" | "VAR_CMD" | "EVAL_CMD" | "EDIT_CMD"
  | "ASM" | "CHOOSE" | "PURGE" | "CRDIR" | "RCLF" | "STOF" | "SF" | "CF"
  | "UPDIR_CMD" | "HOME_CMD" | "USER_MODE" | "NXT_CMD" | "PREV_CMD";

export type ExecOpCode = MathOpCode | MatrixOpCode | TrigOpCode | StackOpCode | InputOpCode | ProgOpCode;

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

const PROGRAMMING_OPS: ReadonlySet<string> = new Set<string>([
  "OP_PRG", "OP_EVAL",
  "PROG_OPEN", "PROG_CLOSE", "STO_ARROW", "TO_LIST", "TO_ARRY", "TO_STR", "TO_Q",
  "IF", "THEN", "ELSE", "END_IF", "CASE", "END_CASE",
  "FOR", "NEXT_LOOP", "START_LOOP", "STEP_LOOP",
  "DO", "UNTIL", "WHILE", "REPEAT", "IFERR",
  "IFT", "IFTE",
  "GET", "PUT", "GETI", "PUTI", "HEAD", "TAIL",
  "DUP", "OVER", "ROT", "PICK", "ROLL", "ROLLD",
  "EXPORT", "INPUT_CMD", "MSGBOX", "MENU_CMD", "CST_CMD", "VAR_CMD", "EVAL_CMD", "EDIT_CMD",
  "ASM", "CHOOSE", "PURGE", "CRDIR", "RCLF", "STOF", "SF", "CF",
  "UPDIR_CMD", "HOME_CMD", "USER_MODE", "NXT_CMD", "PREV_CMD",
]);
const MATRIX_OPS: ReadonlySet<string> = new Set<string>([
  "OP_MTRX",
  "MTRX_TRN", "MTRX_DET", "MTRX_INV", "MTRX_SCALE",
  "MTRX_ADD", "MTRX_SUB", "MTRX_MUL",
  "MTRX_IDN", "MTRX_CON",
  "MTRX_RNRM", "MTRX_CNRM", "MTRX_TRACE", "MTRX_TRAN",
  "MTRX_RSD", "MTRX_SVD", "MTRX_SCHUR", "MTRX_EIGV", "MTRX_LU", "MTRX_QR",
]);
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
