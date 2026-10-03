// The kernel's numeric core (M0-a-01; §3.1, §3.2): the lattice and snap, the frame, exact orientation and areas,
// checked ratios, centidegrees, unit vectors and the distance tests, the incircle adapter, and the typed result.
export { LATTICE, type LatticeSpec } from './lattice.js';
export { frameOf, type Frame } from './frame.js';
export { snap } from './snap.js';
export { area2, area2Big, orient, orient2d } from './predicates.js';
export { ratio, RATIO_FLOOR, type RatioKind } from './ratio.js';
export { belowMinEdge, cdeg, dist, dist2, unitVec, withinAttract, withinCm } from './direction.js';
export { incircle } from '../adapters/robust-predicates.js';
export {
  degenerate,
  err,
  ok,
  type DegenerateDetail,
  type KernelError,
  type KernelResult,
  type Warning,
  type WarningCode,
} from './result.js';
