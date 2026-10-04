// The seam record (II.1; M0-m-01): C-0046's minimal Seam — the two districts, the boundary run's chains and its
// portals (S8's lane ends are `baseLane` portals) — so S8's portal rule is built at M0. Its `amendments` (with the
// SeamAmendment record), its `boundarySamples` and a seam edge's `frontageSide` are M1's, with the SeamContract
// (C-0046, C-0145; staged, schema/staged.ts). Types only.
import type { Cdeg, ChainRef, Cm, Id, VertexRef } from '../types/index.js';
import type { WayClass } from './network.js';

/** One edge of a seam's run (II.1), in the first side's ring order. */
export interface SeamEdge {
  /** The shared way, shore, wall, reservation-boundary or perimeter chain. */
  chain: ChainRef;
  /** The first type its role rows give (II.1, J-P37). */
  type: 'way' | 'water' | 'wall' | 'reserve' | 'field' | 'cliff' | 'marsh' | 'frame' | 'sky';
  /** 'reserve' only: the reservation whose `reserved` boundary the run follows. */
  reservation?: Id;
  wayClass?: WayClass;
  widthCm?: Cm;
  hard: boolean;
}

/** A way that crosses or meets the run (II.1): every one must be connected. */
export interface Portal {
  id: Id;
  wayId: Id;
  class: WayClass;
  widthCm: Cm;
  /** ('portal', id). */
  at: VertexRef;
  /** The way's bearing at the portal, in the model's one angle unit (§2.1). */
  bearing: Cdeg;
  from: 'growth' | 'baseLane' | 'closeup';
  /** The district whose lane or close-up added it. */
  by?: Id;
}

/** One record per boundary run, created by S6 and read by both districts it separates (II.1; minimal, C-0046). */
export interface Seam {
  id: Id;
  /** The two districts in address order; null: a one-sided run (frame, water, cliff, marsh, sky). */
  sides: [Id, Id | null];
  edges: SeamEdge[];
  portals: Portal[];
}
