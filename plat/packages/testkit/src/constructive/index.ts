// The constructive degeneracy set (M0-k-02; §13.1 (2), §3.11, §3.3; C-0038, C-0110): every §13.1 constructive class
// as a named, seeded generator with its milestone tag and its expected outcome as data — the list M0-k-04's B-FUZZ
// runner iterates (`CONSTRUCTIVE_SET`, `casesAt(milestone)`), the coverage table against §13.1's bullets, the property
// vocabulary the outcomes are written in, and the numeric-core judge that runs the quantisation, gcd-stepped
// collinear and star-ring cases against M0-a-01 here. The package index re-exports this folder with `export *`, so
// every exported name but the design's `casesAt` carries the constructive prefix.
export {
  CONSTRUCTIVE_CLASSES,
  CONSTRUCTIVE_MILESTONES,
  CONSTRUCTIVE_SET,
  casesAt,
  constructiveCase,
  constructiveNumericJudge,
  constructiveTally,
  runConstructive,
  type ConstructiveJudge,
  type ConstructiveReport,
  type ConstructiveTally,
} from './set.js';
export { CONSTRUCTIVE_BULLETS, CONSTRUCTIVE_COVERAGE, formatConstructiveCoverage, type ConstructiveCoverageRow } from './coverage.js';
export { CONSTRUCTIVE_PROPERTIES, CONSTRUCTIVE_PROPERTY_KEYS, type ConstructiveProperty } from './properties.js';
export { constructiveCoords } from './draw.js';
export { CONSTRUCTIVE_REFERENCE } from './numeric.js';
export type {
  ConstructiveCase,
  ConstructiveClass,
  ConstructiveDeferred,
  ConstructiveDegenerateKind,
  ConstructiveExpect,
  ConstructiveInput,
  ConstructiveMilestone,
  ConstructiveOutcome,
  ConstructiveParam,
  ConstructiveStep,
  ConstructiveTier,
  ConstructiveVerdict,
} from './types.js';
