// The invariant runners (M0-k-04; §13.1 B-FUZZ and the ladder coverage test, §13.8's tier sizes, §5.1 (8), §5.4): the
// B-FUZZ runner over every kernel primitive (`runFuzz`), the constructive set judged against the kernel (C-0110), the
// kernel ladders' coverage table (`ladderCoverage()`, merged later by M0-x-05's `stageLadderCoverage()`, C-0109 — this
// folder is never edited by M0-x-05), and the counts report. The scaffold created this index empty (M0-s-01, C-0013);
// it belongs to M0-k-04. The package index re-exports this folder with `export *`, so every exported name but the
// design's `runFuzz` and `ladderCoverage` names the runner.
export { guarded as fuzzGuarded, HANG_TIMEOUT_MS, thrownText as fuzzThrownText, type Guarded as FuzzGuarded } from './guard.js';
export { COUNTER_UNITS as FUZZ_COUNTER_UNITS, PRIMITIVES as FUZZ_PRIMITIVES, primitiveNamed as fuzzPrimitive, SAMPLE_EVERY as FUZZ_SAMPLE_EVERY, touchMergedFaces as fuzzTouchMergedFaces, type OpContext as FuzzOpContext, type OpOutcome as FuzzOpOutcome, type Plant as FuzzPlant, type Primitive as FuzzPrimitive } from './primitives.js';
export { FUZZ_CHUNK, runFuzz, type RunFuzzOptions } from './runFuzz.js';
export { CONSTRUCTIVE_KNOWN, CONSTRUCTIVE_TIMEOUT_MS, judgeOnKernel as constructiveKernelJudge, type KernelConstructiveReport, type KnownFinding as ConstructiveKnownFinding, kernelJudge as constructiveOnKernel, PROFILE_UNCHANGED_CM, runConstructiveOnKernel } from './constructive.js';
export { coverageReport as ladderCoverageReport, ladderCoverage } from './ladders.js';
export { bugAbort, type BugAbort } from './bugs.js';
export { constructiveRun, countsReport, countsSummary } from './report.js';
export {
  FRAME_ENTITY as RUNNER_FRAME_ENTITY,
  framedAround as runnerFramedAround,
  interiorPoint as runnerInterior,
  kernelOn as runnerKernelOn,
  layFrame as runnerLayFrame,
  RUNNER_KEY,
  spec as runnerSpec,
  type RunnerKernelOptions,
} from './support.js';
export type { BugEntry, ConstructiveRun, CountsReport, CoverageReport, CoverageRow, FuzzFailure, FuzzFailureKind, FuzzReport, WorkQuantiles, WorkUnit } from './types.js';
