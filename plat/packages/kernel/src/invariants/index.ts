// The invariant suite (M0-a-14; §3.10 whole, §5.3's kernel rows and cost rule, §3.3's commit record as the batch-local
// rows' input, §3.4's debug-build slot stamps, §13.2's cost-model test): every §3.10 row as a named check at its scope —
// batch-local over the commit record, stage-end and save over the arena, the CI-only Euler characteristic — the rows
// whose subjects M0 lacks declared with their predicates and holding vacuously with a count of 0; the `Invariant` kinds
// wired into `KernelTx.expect`; the cost meter per batch; the debug-build assertion mode behind a build flag. The
// scaffold created this index empty (M0-s-01, C-0013); it belongs to M0-a-14. Readings: C-0200.
export {
  type BatchContext,
  type Checked,
  type FaceBefore,
  type InvariantResult,
  type KeptBefore,
  type RowDecl,
  type StoredProfile,
  type WholeContext,
} from './types.js';
export { KERNEL_ROWS, rowNamed, rowsOfScope } from './rows.js';
export { acuteCorners, batchCost, checkBatch, faceArea2, roleKeysOn, touchedSet, wholeRecord, type BatchTouched } from './batch.js';
export {
  checkCI,
  checkFreeze,
  checkSave,
  checkStageEnd,
  eulerCounts,
  frozenBaseProblems,
  poolScopeProblems,
  seedTilingProblems,
  type OverlayScope,
} from './whole.js';
export {
  classFloorRow,
  expectRow,
  hardProblems,
  kernelChecks,
  kernelExpect,
  suiteEnv,
  suiteReport,
  type BatchReportLine,
  type SuiteReport,
} from './expect.js';
export { DEBUG_BUILD, debugAssertSlot, debugMode, type SlotRef } from './debug.js';
