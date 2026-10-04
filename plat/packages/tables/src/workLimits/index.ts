// @plat/tables' work-limit module (M0-f-03a; §5.1 (5), §3.3, §4.12, §14, §13.2; C-0021, C-0174): the counter list,
// workLimits.json's loader, the law's evaluation over a scope's committed counts, and the F-WORK hit-rate report shape.
export {
  CONTINUOUS_WORK_UNITS,
  isTableWorkUnit,
  WORK_LIMIT_COUNTERS,
  WORK_UNITS,
  type TableWorkUnit,
  type WorkLimitCounterSpec,
} from './counters.js';
export {
  checkWorkLimits,
  duplicateKeys,
  loadWorkLimits,
  parseWorkLimits,
  parseWorkLimitsText,
  WORK_LIMITS_TABLE,
  workLimitsCensus,
  type DuplicateKey,
  type FixedWorkLimitLaw,
  type TableWorkLimitLaw,
  type WorkLimitsTable,
} from './table.js';
export { countOf, scopeLabel, workLimitOf, type ScopeCounts } from './law.js';
export { BAND_POSITIONS, fWorkReport, type BandPosition, type FWorkBatch, type FWorkReport, type FWorkRow } from './report.js';
