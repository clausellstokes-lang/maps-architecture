// Warp and smoothing (M0-a-13; §3.4 warp, simplify; §3.6 *Moves: warp and smoothing*; §3.10's held-vertex, minEdge,
// clearance and one-vertex-per-lattice-point rows for moves; §3.1's Visvalingam–Whyatt): the displacement field, the held
// set, slides, re-seats, the order within a step, the split flag under moves, whole-step validation with at most 8
// halvings, the MoveReport; smoothing committed geometry as a warp; the topology-preserving simplify. The scaffold
// created this index empty (M0-s-01, C-0013); it belongs to M0-a-13. Readings: C-0193.
export {
  MAX_HALVINGS,
  WARP_HALVINGS,
  type DisplacementField,
  type HeldRef,
  type HeldSet,
  type Move,
  type MoveKind,
  type MoveReport,
  type WarpOptions,
} from './types.js';
export { heldSet, nearestLattice, warp } from './warp.js';
export { insideRegion } from './held.js';
export { smoothCommitted, SMOOTH_WEIGHT, type SmoothOptions } from './smooth.js';
export { simplify } from './simplify.js';
