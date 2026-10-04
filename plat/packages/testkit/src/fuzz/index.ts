// The fuzz generators (M0-k-01; §13.1 (1), §13.2's seed-family form, §13.8's tier sizes): fast-check arbitraries over
// the lattice for every random input class of §13.1 (1) — polygons and chains — and the builds' families (displacement
// fields for warps, the M0 (b) face set and F-CUT's random faces), the class registry with its exact classifiers and
// the coverage table, and the fuzz families' H32-keyed seeds with the PLAT_FUZZ_RUNS contract. The package index
// re-exports this folder with `export *`, so every exported name but the design's `arb` and `seedFamily` carries the
// fuzz prefix.
export { arb } from './arb.js';
export { seedFamily, fuzzParams, fuzzRuns, FUZZ_RUNS_PR, FUZZ_RUNS_NIGHTLY } from './seeds.js';
export { FUZZ_MIN_LIMIT_CM } from './lattice.js';
export {
  FUZZ_CLASSES,
  FUZZ_CLASS_NAMES,
  fuzzCoverage,
  formatFuzzCoverage,
  type FuzzClass,
  type FuzzClassRow,
  type FuzzCoverageRow,
} from './classes.js';
export {
  hasDuplicateVertex as fuzzHasDuplicateVertex,
  isConcaveChain as fuzzIsConcaveChain,
  isConcaveRing as fuzzIsConcaveRing,
  isHoled as fuzzIsHoled,
  isLarge as fuzzIsLarge,
  isNearCollinear as fuzzIsNearCollinear,
  isSelfTouching as fuzzIsSelfTouching,
  isSnappedRegular as fuzzIsSnappedRegular,
  isThin as fuzzIsThin,
  isZeroAreaChain as fuzzIsZeroAreaChain,
  isZeroAreaRing as fuzzIsZeroAreaRing,
  selfTouches as fuzzSelfTouches,
} from './classes.js';
export { FUZZ_FIELD_KINDS, type FuzzField, type FuzzFieldKind, type FuzzFieldOptions } from './field.js';
export { FUZZ_FACE_KINDS, FUZZ_FACE_SCALES, type FuzzFace, type FuzzFaceKind, type FuzzFaceOptions } from './faces.js';
export type { FuzzChainOptions, FuzzStrokeKind } from './chain.js';
export type { FuzzDuplicatedOptions } from './degenerate.js';
export type { FuzzHoledOptions } from './holed.js';
export type { FuzzPolygonOptions } from './polygon.js';
export type { FuzzRegularOptions } from './regular.js';
export type {
  FuzzBoundsOptions,
  FuzzChain,
  FuzzHoleContact,
  FuzzHoledPolygon,
  FuzzRing,
  FuzzShape,
  FuzzShapeOptions,
} from './types.js';
