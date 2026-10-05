// @plat/model's matching routine (item M0-d-05b; §6.3 *Carry-over*, *Anchors and hysteresis*, *The matching routine*;
// §3.3's index as the overlap kinds' candidate source; §3.6 (5)). The scaffold created this index empty (M0-s-01,
// C-0013); it belongs to M0-d-05b. Readings: C-0188.
export type {
  Anchor,
  AnchorSpec,
  AnchorType,
  CandidateSource,
  CarriedName,
  CarryEvent,
  CellRef,
  KeyPart,
  MatchCounts,
  MatchedBy,
  MatchEntity,
  MatchOptions,
  MatchResult,
  Outcome,
  SupersedesTable,
} from './types.js';
export { checkAnchors, CROSSING_SEARCH_BAND, M0_ANCHORS, OVERLAP_THRESHOLD, resolveAnchors, type CheckedSpec } from './anchors.js';
export { match, WAY_OVERLAP_CM } from './match.js';
export { indexCandidates } from './source.js';
export { splitHeir } from './split.js';
export { batchRecordsOf, liveSetOf, rebind, resolveRef, type FreshRecord, type Rebinding, type Resolution } from './carry.js';
export { SYNTHETIC_ANCHORS, SYNTHETIC_BUILDING, syntheticSet, type SyntheticName, type SyntheticSet } from './synthetic.js';
export {
  MATCH_BUDGET_US,
  timeMatch,
  type AnchorClass,
  type ClassTiming,
  type KindTiming,
  type MatchTimingRecord,
  type TimedPair,
} from './timing.js';
