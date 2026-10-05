// @plat/testkit's metrics (M0-k-05; §13.5, §13.2, §4.4; C-0018, C-0116, C-0180): the metric registry METRICS with its
// ⟨M-1⟩ marks, the metric input `MetricDoc`, and the measures the registry and the spike harnesses share. The scaffold
// created this index empty (M0-s-01, C-0013); it belongs to M0-k-05.
export type { MetricBlock, MetricCut, MetricDistrict, MetricDoc, MetricWay, NgTemplate, XY as MetricXY } from './doc.js';
export { NG_CLASS_FLAGS, NG_TEMPLATES } from './doc.js';
export {
  isMetricKey,
  keyOfRowId,
  m1Metrics,
  M1_CELLS_LATER,
  measureSeeds,
  metricById,
  METRICS,
  METRICS_VERSION,
  SUBSETS as METRIC_SUBSETS,
  type Measured,
  type MetricDef,
  type MetricForm,
  type MetricRef,
  type OursEntry,
} from './registry.js';
export {
  growthDrift600m,
  headingChange50m,
  NON_STREET_CLASSES,
  stepTurnsDeg,
  turnCliff,
  turningPer100m,
  turnSteps10m,
  type TurnCliff,
} from './street.js';
export { resample as resampleArc, RESAMPLE_STEP_M } from './geometry.js';
export { armGapsDeg, hasStraightPair, junctionDegreeHistogram, streetGraph, type StreetGraph, type StreetNode } from './graph.js';
export {
  blockAreas,
  blockAxis,
  blockCountsByTemplate,
  blocksPerHa,
  courtShare,
  courtShareByBand,
  isBuilt as isBuiltBlock,
  r4Samples,
  wallAlignment,
  WALL_BANDS,
} from './blocks.js';
export { cutArrival85, cutCornerMid, cutFillet, cutLengths, cutSigma } from './cuts.js';
export { binnedKs, quantile7, referenceCdf } from './stats.js';
