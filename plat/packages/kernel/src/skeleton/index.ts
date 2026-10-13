// The straight skeleton (M0-a-11; §3.8, §3.4's `skeleton(rings, use)`): the event queue under its work limit, the
// numeric contract, the validator, the exact roofs of convex near-rectangles and the typed downgrades per reader.
export { skeleton, DOWNGRADE_OF } from './skeleton.js';
export { validateSkeleton } from './validate.js';
export { skeletonEventLimit } from './engine.js';
export { COALESCE_CM } from './coalesce.js';
export {
  convexNearRectangle,
  exactRoof,
  NEAR_RECT_AREA_SHARE,
  NEAR_RECT_CORNER_CM,
  type ExactRoof,
  type ExactRoofResult,
  type NearRectangle,
  type NearRectangleFail,
  type RoofForm,
  type RoofWing,
} from './roof.js';
export type {
  ContractRefusal,
  DowngradePath,
  Skeleton,
  SkeletonArc,
  SkeletonDowngrade,
  SkeletonEdge,
  SkeletonFailure,
  SkeletonGraph,
  SkeletonNode,
  SkeletonOptions,
  SkeletonUse,
  SkeletonVerdict,
  ValidatorCheck,
} from './types.js';
