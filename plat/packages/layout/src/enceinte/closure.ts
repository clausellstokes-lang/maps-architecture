// Barrier closure, step 1 of the trace (§4.4 S5a *Trace* (1); item 106 (a), (b)): the boundary's arcs classified by
// defensibility from a table per barrier kind (`shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte`; J-VI.3), the
// arcs a barrier closes recorded, the rest walled. M0 builds the classifier over the barrier table with that table
// empty — its rows are V11's (`walls.barriers`, left out by C-0158) and the readers of the closing arcs (the anchors,
// open chains, `Enceinte.arcs`) M1's (§4b) — so every arc is open, the closure is the ring and barrier closure is the
// identity on every M0 site (C-0224 (5)). On a flat site with no barrier that is the design's own outcome.
import type { ClosureArc } from './types.js';

/** A barrier kind (§2.7 `BarrierKind`). */
export type BarrierKind = 'shore' | 'cliff' | 'gorge' | 'marsh' | 'sheer' | 'enceinte';

/** A row of the barrier table (V11 §3.16.1; M1): a kind's defensibility class and the wall it carries. */
export interface BarrierRow {
  readonly kind: BarrierKind;
  readonly wall: 'none' | 'parapet' | 'light' | 'full';
}

/** A barrier edge run the classifier sees along the boundary (M1: shores, cliffs, gorges, marshes, earlier rings). */
export interface BarrierRun {
  readonly kind: BarrierKind;
  /** The boundary vertices the run covers, from and to (inclusive), in boundary order. */
  readonly from: number;
  readonly to: number;
}

/**
 * The boundary's arcs by defensibility: an arc lying along a barrier run whose kind has a row closes with that row's
 * wall; every other arc is open ground and takes the full wall. With no row (M0's table) every run is open, so the
 * answer is the whole ring as one open arc and the closure `ring`.
 */
export function classifyArcs(vertexCount: number, runs: readonly BarrierRun[] = [], table: readonly BarrierRow[] = []): { closure: 'ring'; arcs: ClosureArc[] } {
  // A run closes an arc only through its kind's row; M0's table has none, so no run closes anything.
  const closing = runs.filter((r) => table.some((row) => row.kind === r.kind));
  if (closing.length > 0) throw new Error(`notBuilt('M1'): a closing barrier arc (${closing[0].kind}): V11's walls.barriers rows and the anchors they need (§4.4 S5a *Trace* (1); C-0224 (5))`);
  return { closure: 'ring', arcs: [{ from: 0, to: vertexCount, defensibility: 'open' }] };
}
