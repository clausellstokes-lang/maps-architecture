// Transactions (M0-a-06; §3.3, §3.4, §2.2 rules 3, 5, 8): KernelTx in both op forms over the overlay, the canonical op
// order, atomic commit or rejection at the prior version, the CommitRecord and its digest hook, work charging and
// E_WORK_LIMIT, expect / onFail, kept content, and the writers removeEdges, clearFiner, retypeEdges with rekey and
// setOwner with rule 3's re-levelling and dissolution; ChainProfile reading and cutting. The scaffold created this index
// empty (M0-s-01, C-0013); it belongs to M0-a-06. Readings: C-0185.
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
 * The before-image every batch keeps (C-0185 (1)), exported for the pipeline runner's stage image (N-55 (6), M0-x-02):
 * taken before a stage runs and put back, whole, when the stage is refused after committing batches — never a batch's
 * substitute (§3.3's batches stay the unit of writing). An image copies every table, so it costs O(arena) memory and
 * time (KI L2's measurement row); the runner takes it and puts it back (at most once) between batches. Putting it
 * back across committed batches sets `version` back: an arena with maintained level digests is re-attached afterwards
 * (`attachLevelDigests`, M0-d-04), since a digest state that saw the rolled-back commits can read current again once
 * the version catches up (C-0287).
 */
export { restoreSavepoint, takeSavepoint, type Savepoint } from './savepoint.js';
