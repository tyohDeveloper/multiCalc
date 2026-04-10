import type { ProgOpCode } from "./opCodes";
import type { CalcState } from "./calculatorState";
import { commitEntry } from "../logic/shared/commitEntry";
import { cx } from "../logic/complex/complex";

type StateOp = (state: CalcState) => CalcState;

const stub: StateOp = (state) => state;

const LIST_SENTINEL = cx(NaN, 1);
const ARRY_SENTINEL = cx(NaN, 2);
const STR_SENTINEL  = cx(NaN, 3);
const Q_SENTINEL    = cx(NaN, 4);
const OBJ_SENTINEL  = cx(NaN, 5);

const FLAGS_REG_INDEX = 9;

function toListOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const x = s.stack[0];
  return {
    ...s,
    stack: [LIST_SENTINEL, s.stack[1], s.stack[2], s.stack[3]],
    lastX: x,
    enterFlag: false,
    error: null,
  };
}

function toArryOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const x = s.stack[0];
  return {
    ...s,
    stack: [ARRY_SENTINEL, s.stack[1], s.stack[2], s.stack[3]],
    lastX: x,
    enterFlag: false,
    error: null,
  };
}

function toStrOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const x = s.stack[0];
  return {
    ...s,
    stack: [STR_SENTINEL, s.stack[1], s.stack[2], s.stack[3]],
    lastX: x,
    enterFlag: false,
    error: null,
  };
}

function toQOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const x = s.stack[0];
  return {
    ...s,
    stack: [Q_SENTINEL, s.stack[1], s.stack[2], s.stack[3]],
    lastX: x,
    enterFlag: false,
    error: null,
  };
}

function iftOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const cond = s.stack[0];
  return {
    ...s,
    stack: [s.stack[2], s.stack[3], s.stack[3], s.stack[3]],
    lastX: cond,
    enterFlag: false,
    error: null,
  };
}

function ifteOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const cond = s.stack[0];
  const truthy = cond.re !== 0 && !isNaN(cond.re);
  const falseBranch = s.stack[1];
  const trueBranch = s.stack[2];
  const result = truthy ? trueBranch : falseBranch;
  return {
    ...s,
    stack: [result, s.stack[3], s.stack[3], s.stack[3]],
    lastX: cond,
    enterFlag: false,
    error: null,
  };
}

function getOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const index = s.stack[0];
  return {
    ...s,
    stack: [OBJ_SENTINEL, s.stack[2], s.stack[3], s.stack[3]],
    lastX: index,
    enterFlag: false,
    error: null,
  };
}

function putOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const index = s.stack[0];
  return {
    ...s,
    stack: [OBJ_SENTINEL, s.stack[3], s.stack[3], s.stack[3]],
    lastX: index,
    enterFlag: false,
    error: null,
  };
}

function getiOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const index = s.stack[0];
  const nextIndex = cx(index.re + 1);
  return {
    ...s,
    stack: [OBJ_SENTINEL, nextIndex, s.stack[2], s.stack[3]],
    lastX: index,
    enterFlag: false,
    error: null,
  };
}

function putiOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const index = s.stack[0];
  const nextIndex = cx(index.re + 1);
  return {
    ...s,
    stack: [OBJ_SENTINEL, nextIndex, s.stack[3], s.stack[3]],
    lastX: index,
    enterFlag: false,
    error: null,
  };
}

function headOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const x = s.stack[0];
  return {
    ...s,
    stack: [OBJ_SENTINEL, s.stack[1], s.stack[2], s.stack[3]],
    lastX: x,
    enterFlag: false,
    error: null,
  };
}

function tailOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const x = s.stack[0];
  return {
    ...s,
    stack: [LIST_SENTINEL, s.stack[1], s.stack[2], s.stack[3]],
    lastX: x,
    enterFlag: false,
    error: null,
  };
}

function purgeOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const nameTag = s.stack[0];
  const regIndex = Math.round(nameTag.re);
  if (!isNaN(regIndex) && regIndex >= 0 && regIndex < s.registers.length) {
    const registers = [...s.registers];
    registers[regIndex] = cx(0);
    return {
      ...s,
      stack: [s.stack[1], s.stack[2], s.stack[3], s.stack[3]],
      registers,
      enterFlag: false,
      error: null,
    };
  }
  return {
    ...s,
    stack: [s.stack[1], s.stack[2], s.stack[3], s.stack[3]],
    enterFlag: false,
    error: null,
  };
}

function crdirOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  return {
    ...s,
    stack: [s.stack[1], s.stack[2], s.stack[3], s.stack[3]],
    enterFlag: false,
    error: null,
  };
}

function rclfOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const flags = s.registers[FLAGS_REG_INDEX] ?? cx(0);
  return {
    ...s,
    stack: [flags, s.stack[0], s.stack[1], s.stack[2]],
    enterFlag: false,
    error: null,
  };
}

function stofOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const flagWord = s.stack[0];
  const registers = [...s.registers];
  registers[FLAGS_REG_INDEX] = flagWord;
  return {
    ...s,
    stack: [s.stack[1], s.stack[2], s.stack[3], s.stack[3]],
    registers,
    enterFlag: false,
    error: null,
  };
}

function sfOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const flagNum = Math.round(s.stack[0].re);
  const currentFlags = s.registers[FLAGS_REG_INDEX]?.re ?? 0;
  const newFlags = isNaN(flagNum) ? currentFlags : (currentFlags | (1 << flagNum));
  const registers = [...s.registers];
  registers[FLAGS_REG_INDEX] = cx(newFlags);
  return {
    ...s,
    stack: [s.stack[1], s.stack[2], s.stack[3], s.stack[3]],
    registers,
    enterFlag: false,
    error: null,
  };
}

function cfOp(state: CalcState): CalcState {
  const s = commitEntry(state);
  const flagNum = Math.round(s.stack[0].re);
  const currentFlags = s.registers[FLAGS_REG_INDEX]?.re ?? 0;
  const newFlags = isNaN(flagNum) ? currentFlags : (currentFlags & ~(1 << flagNum));
  const registers = [...s.registers];
  registers[FLAGS_REG_INDEX] = cx(newFlags);
  return {
    ...s,
    stack: [s.stack[1], s.stack[2], s.stack[3], s.stack[3]],
    registers,
    enterFlag: false,
    error: null,
  };
}

export const progRegistry: Record<ProgOpCode, StateOp> = {
  PROG_OPEN: stub,
  PROG_CLOSE: stub,
  STO_ARROW: stub,
  TO_LIST: toListOp,
  TO_ARRY: toArryOp,
  TO_STR: toStrOp,
  TO_Q: toQOp,
  IF: stub,
  THEN: stub,
  ELSE: stub,
  END_IF: stub,
  CASE: stub,
  END_CASE: stub,
  FOR: stub,
  NEXT_LOOP: stub,
  START_LOOP: stub,
  STEP_LOOP: stub,
  DO: stub,
  UNTIL: stub,
  WHILE: stub,
  REPEAT: stub,
  IFERR: stub,
  IFT: iftOp,
  IFTE: ifteOp,
  GET: getOp,
  PUT: putOp,
  GETI: getiOp,
  PUTI: putiOp,
  HEAD: headOp,
  TAIL: tailOp,
  EXPORT: stub,
  INPUT_CMD: stub,
  MSGBOX: stub,
  MENU_CMD: stub,
  CST_CMD: stub,
  VAR_CMD: stub,
  EVAL_CMD: stub,
  EDIT_CMD: stub,
  ASM: stub,
  CHOOSE: stub,
  PURGE: purgeOp,
  CRDIR: crdirOp,
  RCLF: rclfOp,
  STOF: stofOp,
  SF: sfOp,
  CF: cfOp,
  UPDIR_CMD: stub,
  HOME_CMD: stub,
  USER_MODE: stub,
  NXT_CMD: stub,
  PREV_CMD: stub,
};
