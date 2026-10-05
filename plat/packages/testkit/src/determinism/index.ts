// The determinism harness (M0-d-08; §6.5 (9), §13.1, §13.2, §3.3, §5.1 (5)): the time-dilation shim, the op-permutation,
// slot-renumbering and issue-order harnesses, the slot-free prints they compare, and the readers that turn the kernel's
// batch fixtures and the constructive set into sequences. The scaffold created this index empty (M0-s-01, C-0013); it
// belongs to M0-d-08. Readings: C-0199. The package index re-exports this folder with `export *`, so every name but the
// design's four (`withDilation`, `permuteOps`, `renumberSlots`, `runTwiceCompare`) is specific to determinism.
export { DILATION_FACTORS, dilationCompare, withDilation, withDilationCounted, type Dilated, type DilationReport } from './dilation.js';
export { permuteOps, permutationCompare, permutedSequence, type PermutationOptions, type PermutationReport, type PermuteMode } from './permute.js';
export { renumberSlots, renumbering, type RenumberMode, type RenumberOptions, type SlotMaps } from './renumber.js';
export {
  compareOutcomes,
  runBatch,
  runSequenceOutcomes,
  runTwiceCompare,
  type BatchOutcome,
  type DeterminismBatch,
  type DeterminismBatchSpec,
  type DeterminismSequence,
  type Divergence,
  type IssueOrderReport,
  type RunKind,
  type RunTwiceOptions,
  type SequenceRunOptions,
} from './issue.js';
export {
  arenaDigest,
  arenaPrint,
  digestText as determinismDigestText,
  firstDifference as determinismFirstDifference,
  hex128 as determinismHex128,
  levelDigestsHex,
  outcomePrint,
  recordPrint,
  ringText as determinismRingText,
} from './print.js';
export {
  applyFixtureOp,
  faceHolding as determinismFaceHolding,
  FIXTURE_CELLS,
  FIXTURE_FRAME,
  FIXTURE_KEY,
  fixtureBatch,
  fixtureOps,
  fixtureSequence,
  fixtureSequences,
  fixtureSpec,
  framedArena,
  halfEdgeAt as determinismHalfEdgeAt,
  lp as determinismPoint,
  type FixtureBatchData,
  type FixtureOpData,
  type FixtureSequenceData,
} from './fixtures.js';
export { CONSTRUCTIVE_FRAME_PAD, constructiveSequence } from './constructive.js';
export { harnessRng as determinismRng, shuffled as determinismShuffled, type HarnessRng } from './rng.js';
