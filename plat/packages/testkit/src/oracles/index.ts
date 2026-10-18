// The boolean and buffer oracles and the split comparison (M0-k-03; §3.7, §13.1, §17.4): Clipper2 (clipper2-wasm
// 0.4.0, BSL-1.0) in Node and polygon-clipping 0.15.7 (MIT), dev dependencies of @plat/testkit only — never imported by
// a shipped package (§14). The shipped Clipper2-WASM engine is §3.7's pre-decided fallback, built only on a measured
// timing miss (C-0026; M0.md §4b): the adapter exists, shipping it is a declared shift. Every library answer passes
// the region check first; a library that cannot give one refuses (C-0150).
// The package index re-exports every module folder with `export *`, so the names here carry the oracles' prefix where
// a generic name could meet another folder's (the ring helpers stay inside the folder; tests import them by path).
export { loadOracles, oracleBoolean, oracleBuffer, symDiffArea } from './oracles.js';
export {
  ATTRACTED_CM,
  ATTRACTION_WARNINGS,
  UNATTRACTED_CM,
  compareSplit,
  splitOf,
  type AreaMeasurer,
  type CompareOptions,
} from './compare.js';
export { OracleReport, UNATTRACTED_DRAW_MIN, type OracleReportLine } from './report.js';
export { OracleRefusal, isOracleRefusal } from './refusal.js';
export {
  REGION_CHECK_CM as ORACLE_REGION_CHECK_CM,
  regionCheck as oracleRegionCheck,
  type CheckOperand as OracleCheckOperand,
  type RegionCheck as OracleRegionCheck,
} from './region-check.js';
export {
  ORACLE_ENGINES,
  type BooleanOp as OracleBooleanOp,
  type EndKind as OracleEnd,
  type FillRule as OracleFillRule,
  type JoinKind as OracleJoin,
  type OracleEngine,
  type OracleResult,
  type Ring as OracleRing,
  type RingLike as OracleRingLike,
  type SplitClass,
  type Verdict,
} from './types.js';
