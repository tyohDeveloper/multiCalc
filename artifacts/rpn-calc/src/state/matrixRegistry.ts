import {
  applyMtrxTrn,
  applyMtrxDet,
  applyMtrxInv,
  applyMtrxScale,
  applyMtrxAdd,
  applyMtrxSub,
  applyMtrxMul,
  applyMtrxIdn,
  applyMtrxCon,
  applyMtrxRnrm,
  applyMtrxCnrm,
  applyMtrxTrace,
  applyMtrxTran,
  applyMtrxRsd,
  applyMtrxSvd,
  applyMtrxSchur,
  applyMtrxEigv,
  applyMtrxLu,
  applyMtrxQr,
} from "../logic/matrix/matrixOps";
import type { MatrixOpCode } from "./opCodes";
import type { CalcState } from "./calculatorState";

type StateOp = (state: CalcState) => CalcState;

export const matrixRegistry: Record<MatrixOpCode, StateOp> = {
  MTRX_TRN:   applyMtrxTrn,
  MTRX_DET:   applyMtrxDet,
  MTRX_INV:   applyMtrxInv,
  MTRX_SCALE: applyMtrxScale,
  MTRX_ADD:   applyMtrxAdd,
  MTRX_SUB:   applyMtrxSub,
  MTRX_MUL:   applyMtrxMul,
  MTRX_IDN:   applyMtrxIdn,
  MTRX_CON:   applyMtrxCon,
  MTRX_RNRM:  applyMtrxRnrm,
  MTRX_CNRM:  applyMtrxCnrm,
  MTRX_TRACE: applyMtrxTrace,
  MTRX_TRAN:  applyMtrxTran,
  MTRX_RSD:   applyMtrxRsd,
  MTRX_SVD:   applyMtrxSvd,
  MTRX_SCHUR: applyMtrxSchur,
  MTRX_EIGV:  applyMtrxEigv,
  MTRX_LU:    applyMtrxLu,
  MTRX_QR:    applyMtrxQr,
};
