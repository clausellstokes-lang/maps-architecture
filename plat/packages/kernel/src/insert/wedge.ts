// Wedge routing at acute corners (§3.6 *Attraction*, step 4; *Existing geometry wins*; *Chain classes*). M0-a-05.
//
// Two consecutive crossings closer than `minEdge` lie on the two arms of an acute corner and are resolved at that corner
// instead of cutting a sliver off its tip (W_WEDGE_ROUTED): when the corner is the existing arrangement's — two
// crossings along one new segment — the chain is routed through the corner's vertex; when it is the chain's own — two
// crossings along one existing edge — the chain's corner vertex moves onto that edge at the placement point of its foot.
// Either way the chain moves at most minEdge / (2 tan(θ/2)) for a corner of angle θ (0.47 m at the 30° junction floor,
// 1.2 m at the 12° plot floor) — a bound with no limit as θ → 0. An optional chain that would move more than
// `attractCm` is rejected with E_BELOW_MIN_EDGE (the class table's `wedgeBeyondAttract`, §3.6); a mandatory chain is
// wedge-routed only where the move is at most 2 · √2 · `attractCm` ≈ 73.5 cm (θ ≥ 19.3° at minEdge 25), the largest
// move under which §3.7's attracted bound still holds — the session's rulings N-38 as amended by N-40 — and beyond it
// has its crossings placed in turn instead. Readings: C-0177 (6), C-0200.
import { type VertexId } from '../arena/index.js';
import { query } from '../index/index.js';
import { dmath } from '../dmath/index.js';
import { LATTICE, ok, orient2d, ratio, type KernelResult } from '../num/index.js';
import type { LatticePoint } from '../types/index.js';
import { charge, check, classOutcome, INSERT_ATTRACT_QUERIES, warn, workLimitHit } from './classes.js';
import { INSERT_CROSSINGS } from './crossings.js';
import { footOnSegment, pieceOf, segmentBox, segmentDistance, type ChainCtx, type Piece } from './stretch.js';

const MIN_EDGE = LATTICE.minEdgeCm;
const MIN_EDGE_SQ = LATTICE.minEdgeCm * LATTICE.minEdgeCm;
const ATTRACT = LATTICE.attractCm;
/**
 * The square of the largest wedge move a mandatory chain takes, (2 · √2 · attractCm)² = 8 · attractCm² (N-40: 73.54 cm
 * at attractCm 26). Compared squared, so the cap is exact in integers: a 73 cm move keeps its wedge route, 74 cm does not.
 */
export const WEDGE_CAP_SQ = 8 * LATTICE.attractCm * LATTICE.attractCm;
/** π to the double nearest it (Math.PI is outside §6.5 (3)'s allowlist, C-0125). */
const PI = 3.141592653589793;

/** §3.6's bound on a wedge route's move for a corner of `thetaCdeg` centidegrees: minEdge / (2 tan(θ/2)), in cm. */
export function wedgeBound(thetaCdeg: number): number {
  check(thetaCdeg >= 1 && thetaCdeg < 18_000, 'a corner angle lies in [1 cdeg, 180°)');
  const half = (thetaCdeg * PI) / 36_000;
  // minEdge · cos(θ/2) / (2 sin(θ/2)), both terms scaled by 2²⁰ so the divisor clears ratio()'s length floor for every
  // corner of at least 1 cdeg (§3.2 (8)); the scale cancels.
  const b = ratio(MIN_EDGE * dmath.cos(half) * SCALE, 2 * dmath.sin(half) * SCALE, 'length');
  check(b.ok, 'sin(θ/2) of a corner of at least 1 cdeg clears the floor');
  return b.value;
}

/** 2²⁰: the scale of wedgeBound's quotient (an exact power of two, so it cancels exactly). */
const SCALE = 1_048_576;

/**
 * The decision for a wedge route that moves the chain `moveCm` (N-38 as amended by N-40, C-0200): within `attractCm`
 * the corner takes the chain — true, with W_WEDGE_ROUTED reported (at the corner's point); beyond it an optional chain
 * is refused E_BELOW_MIN_EDGE (§3.6, the class table's `wedgeBeyondAttract`, unchanged); a mandatory chain is still
 * wedge-routed up to 2 · √2 · `attractCm` (`WEDGE_CAP_SQ`: the 30° junction floor's 0.47 m keeps its route) and beyond
 * that is not wedge-routed at all — false: its crossings are placed in turn by the placement rule (the second at least
 * `minEdge` from the first under (ii), a step across the sliver) or by the rule's endpoint fallback, and a corner below
 * `minFaceAngle` that this leaves commits with W_ACUTE_CORNER. §3.6's bound minEdge / (2 tan(θ/2)) grows without bound
 * as θ → 0, so a sliver corner far away would otherwise pull the chain by the length of its arms.
 */
export function wedgeOutcome(ctx: ChainCtx, moveCm: number, at: LatticePoint): KernelResult<boolean> {
  if (moveCm > ATTRACT) {
    const o = classOutcome(ctx.cls, 'wedgeBeyondAttract');
    if ('refuse' in o) return { ok: false, code: o.refuse, detail: `${o.detail} (${moveCm.toFixed(1)} cm)` };
    if (moveCm * moveCm > WEDGE_CAP_SQ) return ok(false);
  }
  warn(ctx.tx, ctx.warnings, 'W_WEDGE_ROUTED', at);
  return ok(true);
}

/** The move of routing the segment a → b through the corner k: k's distance from the segment. */
export function cornerMove(ctx: ChainCtx, a: VertexId, b: VertexId, k: VertexId): number {
  const X = ctx.p.vertices.x;
  const Y = ctx.p.vertices.y;
  return segmentDistance(X[k], Y[k], X[a], Y[a], X[b], Y[b]);
}

/** The chain's own acute corner over an existing edge: the piece both of its segments cross, and where its vertex goes. */
export interface ChainCorner {
  readonly piece: Piece;
  /** The corner vertex's foot on the piece (the exact position its landing places). */
  readonly foot: { readonly x: number; readonly y: number };
  /** How far the corner vertex moves to its foot (the landing may add the placement's sub-centimetre). */
  readonly move: number;
}

/**
 * The chain's own corner (§3.6 step 4's second case): does one level-n route piece cross both the segment prev → p and
 * the segment p → next, at two points closer than `minEdge` along it? Then p goes onto that piece at the placement point
 * of its foot. Of several such pieces, the nearest to p (ties by the pieces' lattice ends). Null when none. One index
 * query (`insert.attractQueries`); one `insert.crossings` charged when a corner is found. Nothing written.
 */
export function chainCorner(ctx: ChainCtx, prev: LatticePoint, pt: LatticePoint, next: LatticePoint): KernelResult<ChainCorner | null> {
  const { tx, p, n } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 1)) return workLimitHit(INSERT_ATTRACT_QUERIES);
  const minX = Math.min(prev.x, pt.x, next.x);
  const maxX = Math.max(prev.x, pt.x, next.x);
  const minY = Math.min(prev.y, pt.y, next.y);
  const maxY = Math.max(prev.y, pt.y, next.y);
  const box = segmentBox(minX, minY, maxX, maxY, 1);
  let best: ChainCorner | null = null;
  const cross = (a: LatticePoint, b: LatticePoint, ux: number, uy: number, wx: number, wy: number): { x: number; y: number } | null => {
    const o1 = orient2d(ux, uy, wx, wy, a.x, a.y);
    const o2 = orient2d(ux, uy, wx, wy, b.x, b.y);
    const o3 = orient2d(a.x, a.y, b.x, b.y, ux, uy);
    const o4 = orient2d(a.x, a.y, b.x, b.y, wx, wy);
    const opp = (s: number, t: number): boolean => (s > 0 && t < 0) || (s < 0 && t > 0);
    if (!opp(o1, o2) || !opp(o3, o4)) return null;
    const t = ratio(o1, o1 - o2, 'area');
    check(t.ok, 'a proper crossing has a non-zero denominator');
    return { x: a.x + t.value * (b.x - a.x), y: a.y + t.value * (b.y - a.y) };
  };
  for (const h of query(p, tx.key, n, box, { edges: true }).edges) {
    const pc = pieceOf(p, h, n);
    const ux = X[pc.a];
    const uy = Y[pc.a];
    const wx = X[pc.b];
    const wy = Y[pc.b];
    const c1 = cross(prev, pt, ux, uy, wx, wy);
    if (c1 === null) continue;
    const c2 = cross(pt, next, ux, uy, wx, wy);
    if (c2 === null) continue;
    if ((c2.x - c1.x) * (c2.x - c1.x) + (c2.y - c1.y) * (c2.y - c1.y) >= MIN_EDGE_SQ) continue;
    const foot = footOnSegment(ux, uy, wx, wy, pt.x, pt.y);
    const move = Math.sqrt((foot.x - pt.x) * (foot.x - pt.x) + (foot.y - pt.y) * (foot.y - pt.y));
    if (best === null || move < best.move || (move === best.move && (Y[pc.a] < Y[best.piece.a] || (Y[pc.a] === Y[best.piece.a] && X[pc.a] < X[best.piece.a])))) {
      best = { piece: pc, foot, move };
    }
  }
  if (best !== null && !charge(tx, INSERT_CROSSINGS, 1)) return workLimitHit(INSERT_CROSSINGS);
  return ok(best);
}
