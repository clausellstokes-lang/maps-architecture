// Transactions (M0-a-06; §3.3, §3.4, §2.2 rules 3, 5, 8): KernelTx in both op forms over the overlay, the canonical op
// order, atomic commit or rejection at the prior version, the CommitRecord and its digest hook, work charging and
// E_WORK_LIMIT, expect / onFail, kept content, and the writers removeEdges, clearFiner, retypeEdges with rekey and
// setOwner with rule 3's re-levelling and dissolution; ChainProfile reading and cutting. M0-a-06. Readings: C-0185.
export {
  OP_KINDS,
  type BatchScope,
  type ClassFloor,
  type CommitRecord,
  type Conflict,
  type DirtySet,
  type ExpectView,
  type KernelOp,
  type KernelTx,
  type LevelDirt,
  type OnFail,
  type OpKind,
  type Overlay,
  type ProfileOut,
  type ProfileValue,
  type RemoveResult,
  type RetypeResult,
  type TransientKeyShape,
  type TxEnv,
  type TxKey,
} from './types.js';
export { canonicalOrder, kernelOp, LINEAR_PARTS, touchedFaces, tx, type Committed } from './tx.js';
export { opClearFiner, opInsertChain, opRemoveEdges, opRetypeEdges, opSetOwner, opSplitThrough } from './ops.js';
export { clearFiner, removeEdges, retypeEdges, setOwner } from './writers.js';
export {
  cutKnot,
  JOIN_TOLERANCE_CM,
  joinProfiles,
  knotLines,
  renumberKnots,
  routeLines,
  sampleChain,
  sampleProfile,
  sameValue,
  type AnyProfile,
  type KnotLine,
  type ProfileKnot,
  type RouteLine,
} from './profile.js';
export { resolveStretch, runsOfPairs, type Span } from './chains.js';
/**
 * The before-image every batch keeps (C-0185 (1)), exported for the pipeline runner's stage image: `takeSavepoint` before
 * a stage, `restoreSavepoint` after; a restore across committed batches bumps the arena's `restoreGeneration`, which
 * version-keyed state (the level digests) keys on too (C-0287, C-0299).
 */
export { restoreGeneration, restoreSavepoint, takeSavepoint, type Savepoint } from './savepoint.js';
