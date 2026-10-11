// Insertion step 2: vertex attraction (§3.6 *Attraction*, step 2; GEO-3, J-K2; *Existing geometry wins*). M0-a-04.
//
// A chain vertex within `attractCm` of an existing vertex moves onto it (the nearest; ties to the smaller lattice
// position, y then x). Otherwise, within `attractCm` of an existing edge (the nearest; ties by the edges' canonical
// keys, §3.3), take the exact foot of the vertex on that edge: if the foot lies within `attractCm` of one of the edge's
// endpoints, the vertex moves onto that endpoint (the nearer; ties y then x), because a split there would leave a
// sub-edge shorter than `minEdge`; otherwise it moves onto the edge at the foot's placement point by `splitThrough` — a
// Steiner vertex if the edge is coarser. Each vertex so moved is reported W_ATTRACTED. Chain vertices that attraction
// brings within `minEdge` of each other merge, the later into the earlier, as in step 1 (`attractRun`).
//
// The candidates are candidate (a) of §3.6: the vertices and edges of level ≤ the batch's level — one index query at the
// batch's level (§3.3: the vertices of level ≤ n and the level-n route edges), charged to `insert.attractQueries`.
// Candidate (b), the finer vertices on those routes, and its promotion are M0-a-05's; candidate (c), a clear-region
// batch's prepared vertices, is M3a's (`notBuilt('M3a')`). An incoming vertex therefore moves at most √2 · `attractCm`
// (onto an edge's endpoint from beside the edge) — but where the placement rule finds no qualifying point, which sends
// it onto the nearer endpoint of the sub-edge its exact position falls on (§3.6). That fallback fires on valid arenas
// where an acute corner inside a vertex's one-ring leaves no qualifying point within attractCm, and may move the vertex
// metres (C-0170 (1)). Readings: C-0169 (6).
//
// The edge candidate's choice is `nearestRoutePiece`, exported for the other step-2 landings to share (C-0316): the
// nearest level-n route piece among one query's edges, read from the run's pieces (§3.3), ties by the query's order.
import { pointOf, type HalfEdgeId, type Plat, type VertexId } from '../arena/index.js';
import { query, routePieces, routeRun } from '../index/index.js';
import { belowMinEdge, dist2, LATTICE, ok, orient2d, ratio, snap, type KernelResult, type Warning } from '../num/index.js';
import type { Cm, LatticePoint, Level } from '../types/index.js';
import {
  charge,
  passOn,
  check,
  foldWarnings,
  INSERT_ATTRACT_QUERIES,
  notBuilt,
  warn,
  workLimitHit,
  type InsertTx,
} from './classes.js';
import { applySplitPlan, planPoint, planSplitThrough, type SplitPlan } from './splitThrough.js';

const ATTRACT = LATTICE.attractCm;
const ATTRACT_SQ = LATTICE.attractCm * LATTICE.attractCm;

/** Where step 2 put a chain vertex. */
export type Attraction =
  /** No candidate within attractCm: the chain's own new vertex goes at `at` (inserted by insertChain, M0-a-05). */
  | { readonly kind: 'free'; readonly at: LatticePoint }
  /** Onto an existing vertex: the nearest within attractCm, or an endpoint of the nearest edge (or the placement's fallback). */
  | { readonly kind: 'vertex'; readonly at: LatticePoint; readonly vertex: VertexId; readonly onto: 'vertex' | 'endpoint' }
  /** Onto the nearest edge by splitThrough: a new vertex at the foot's placement point. */
  | { readonly kind: 'split'; readonly at: LatticePoint; readonly vertex: VertexId };

/** Step 2's decision for one chain vertex, nothing written (its split, if any, planned). */
export type AttractionPlan =
  | { readonly kind: 'free'; readonly from: LatticePoint; readonly at: LatticePoint }
  | { readonly kind: 'vertex'; readonly from: LatticePoint; readonly at: LatticePoint; readonly vertex: VertexId; readonly onto: 'vertex' | 'endpoint' }
  | { readonly kind: 'split'; readonly from: LatticePoint; readonly at: LatticePoint; readonly split: SplitPlan };

/** A level-n route piece (§3.3): the stretch of a run between two of its vertices of level ≤ n, named by its sub-edge. */
export interface RoutePiece {
  /** The sub-edge the index names the piece by (the query's edge answer). */
  readonly edge: HalfEdgeId;
  readonly a: VertexId;
  readonly b: VertexId;
}

/**
 * Step 2's edge candidate (§3.6 step 2): of the index's level-`level` route edges `edges` — one query's answer, in its
 * canonical order — the route piece nearest the lattice point `pt` within attractCm whose interior holds pt's foot (its
 * nearest point interior: an endpoint within attractCm would be a vertex candidate); two pieces equally near, the first
 * in the query's order, the one first by canonical key (§3.3). The distance is o² ÷ |ab|² through `ratio()`, o the exact
 * `orient2d`; null when no piece is within attractCm. Reads no index and charges nothing: the caller's one query and its
 * one `insert.attractQueries` serve it.
 */
export function nearestRoutePiece(p: Plat, edges: readonly HalfEdgeId[], pt: LatticePoint, level: Level): RoutePiece | null {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  let best: RoutePiece | null = null;
  let bestD = Infinity;
  for (const h of edges) {
    const piece = routePieces(p, routeRun(p, h), level).find((pc) => pc.edge === h);
    check(piece !== undefined, `the query's route edge ${h} is no piece of its run`);
    const a = piece.a;
    const b = piece.b;
    const ux = X[b] - X[a];
    const uy = Y[b] - Y[a];
    const len2 = ux * ux + uy * uy;
    const dot = (pt.x - X[a]) * ux + (pt.y - Y[a]) * uy;
    if (!(dot > 0 && dot < len2)) continue;
    const o = orient2d(X[a], Y[a], X[b], Y[b], pt.x, pt.y);
    if (o * o > ATTRACT_SQ * len2) continue;
    const d = ratio(o * o, len2, 'area');
    check(d.ok, 'an edge spans at least minEdge');
    if (d.value < bestD) {
      best = { edge: h, a, b };
      bestD = d.value;
    }
  }
  return best;
}

/**
 * Step 2's decision for the chain vertex `p` at the batch's level: one index query; the nearest vertex within
 * attractCm, else the nearest edge within attractCm with the endpoint rule, else free. A split is planned (placement
 * included), not written. Refuses E_OUT_OF_RANGE (p), E_WORK_LIMIT, and the planned split's E_LEVEL.
 */
export function planAttraction(tx: InsertTx, pIn: LatticePoint): KernelResult<AttractionPlan> {
  if (tx.prepared !== undefined && tx.prepared.length > 0) {
    notBuilt('M3a', "candidate (c): a clear-region batch's prepared vertices (§3.6, §3.3 rule 3)");
  }
  const s = snap(pIn.x, pIn.y);
  if (!s.ok) return passOn(s);
  const p = s.value;
  const plat = tx.plat;
  const X = plat.vertices.x;
  const Y = plat.vertices.y;
  const n = tx.level;
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 1)) return workLimitHit(INSERT_ATTRACT_QUERIES);
  const box = { minX: p.x - ATTRACT, minY: p.y - ATTRACT, maxX: p.x + ATTRACT, maxY: p.y + ATTRACT };
  const near = query(plat, tx.key, n, box, { vertices: true, edges: true });
  // The nearest vertex of level ≤ n within attractCm; the query's (y, x) order breaks ties.
  let best = -1;
  let bestD = Infinity;
  for (const v of near.vertices) {
    const d = dist2(p.x, p.y, X[v], Y[v]);
    if (d <= ATTRACT_SQ && d < bestD) {
      best = v;
      bestD = d;
    }
  }
  if (best >= 0) return ok({ kind: 'vertex', from: p, at: pointOf(plat, best), vertex: best, onto: 'vertex' });
  // Else the nearest level-n route piece within attractCm (the query's canonical edge order breaks ties).
  const piece = nearestRoutePiece(plat, near.edges, p, n);
  if (piece === null) return ok({ kind: 'free', from: p, at: p });
  const edge = piece.edge;
  const ea = piece.a;
  const eb = piece.b;
  // The exact foot on the edge, and the endpoint rule.
  const ux = X[eb] - X[ea];
  const uy = Y[eb] - Y[ea];
  const t = ratio((p.x - X[ea]) * ux + (p.y - Y[ea]) * uy, ux * ux + uy * uy, 'area');
  check(t.ok, 'an edge spans at least minEdge');
  const fx = X[ea] + t.value * ux;
  const fy = Y[ea] + t.value * uy;
  const da = (fx - X[ea]) * (fx - X[ea]) + (fy - Y[ea]) * (fy - Y[ea]);
  const db = (fx - X[eb]) * (fx - X[eb]) + (fy - Y[eb]) * (fy - Y[eb]);
  if (da <= ATTRACT_SQ || db <= ATTRACT_SQ) {
    let v = da <= ATTRACT_SQ ? ea : eb;
    if (da <= ATTRACT_SQ && db <= ATTRACT_SQ && (db < da || (db === da && (Y[eb] < Y[ea] || (Y[eb] === Y[ea] && X[eb] < X[ea]))))) v = eb;
    return ok({ kind: 'vertex', from: p, at: pointOf(plat, v), vertex: v, onto: 'endpoint' });
  }
  const split = planSplitThrough(tx, edge, p, undefined, { chargePoint: false });
  if (!split.ok) return passOn(split);
  return ok({ kind: 'split', from: p, at: planPoint(plat, split.value), split: split.value });
}

/**
 * Writes a plan of `planAttraction` and reports its warnings (W_ATTRACTED for a moved vertex) to the transaction. A
 * closed transaction throws before anything is written: every arena writer of steps 1–2 checks it first (§3.3, one
 * batch per overlay; C-0294 (1), C-0296 (1)).
 */
export function applyAttraction(tx: InsertTx, plan: AttractionPlan): KernelResult<Attraction> {
  check(tx.closed !== true, 'the transaction is closed (committed or rejected)');
  const warnings: Warning[] = [];
  const moved = (at: LatticePoint): boolean => at.x !== plan.from.x || at.y !== plan.from.y;
  if (plan.kind === 'free') return ok({ kind: 'free', at: plan.at }, warnings);
  if (plan.kind === 'vertex') {
    if (moved(plan.at)) warn(tx, warnings, 'W_ATTRACTED', plan.from);
    return ok({ kind: 'vertex', at: plan.at, vertex: plan.vertex, onto: plan.onto }, warnings);
  }
  const v = applySplitPlan(tx, plan.split);
  foldWarnings(warnings, plan.split.warnings);
  // The split's own endpoint rule (rare: its foot read on the run differs from step 2's by under 1.5 cm) already
  // reported this vertex's move.
  if (!plan.split.warnings.some((w) => w.code === 'W_ATTRACTED') && moved(plan.at)) warn(tx, warnings, 'W_ATTRACTED', plan.from);
  const at = { x: tx.plat.vertices.x[v] as Cm, y: tx.plat.vertices.y[v] as Cm };
  return plan.split.kind === 'new'
    ? ok({ kind: 'split', at, vertex: v }, warnings)
    : ok({ kind: 'vertex', at, vertex: v, onto: 'endpoint' }, warnings);
}

/**
 * §3.6 step 2 for one chain vertex: the decision, then its write (a split by splitThrough). Refusals write nothing:
 * E_OUT_OF_RANGE, E_WORK_LIMIT, and E_LEVEL where the vertex would land on a vertex finer than the batch. A closed
 * transaction (a stale overlay of a committed or rejected batch) throws before anything is read or charged — a
 * programming error, an assertion as `splitThrough` makes, never a typed refusal (§3.3, §3.11; C-0296 (1)).
 */
export function attractVertex(tx: InsertTx, p: LatticePoint): KernelResult<Attraction> {
  check(tx.closed !== true, 'the transaction is closed (committed or rejected)');
  const plan = planAttraction(tx, p);
  if (!plan.ok) return passOn(plan);
  return applyAttraction(tx, plan.value);
}

/** One chain vertex of a run after step 2. */
export interface RunVertex {
  /** Its point: an existing vertex's, a placed split point, or its own (free). */
  readonly at: LatticePoint;
  /** The arena vertex it became; −1 for a free vertex (insertChain creates it, M0-a-05). */
  readonly vertex: VertexId;
  readonly attraction: Attraction['kind'] | 'merged';
  /** The earlier run index it merged into (attraction brought it within minEdge of it); −1 otherwise. */
  readonly mergedInto: number;
}

/**
 * Step 2 over a run's vertices in order (§3.6): each decided against the arena as the earlier ones left it, then — if
 * its target lies within minEdge of the previous kept vertex's point — merged into that earlier vertex (W_ATTRACTED,
 * nothing written for it), else written. A refusal stops the run: the earlier vertices' splits stay written, and the
 * transaction rolls the batch back (§3.3; M0-a-06). A closed transaction throws before anything is read or charged, as
 * `attractVertex` (C-0296 (1)).
 */
export function attractRun(tx: InsertTx, points: readonly LatticePoint[]): KernelResult<RunVertex[]> {
  check(tx.closed !== true, 'the transaction is closed (committed or rejected)');
  const out: RunVertex[] = [];
  const warnings: Warning[] = [];
  let prev = -1;
  for (let i = 0; i < points.length; i++) {
    const plan = planAttraction(tx, points[i]);
    if (!plan.ok) return passOn(plan);
    const target = plan.value.at;
    if (prev >= 0 && belowMinEdge(out[prev].at.x, out[prev].at.y, target.x, target.y)) {
      out.push({ at: out[prev].at, vertex: out[prev].vertex, attraction: 'merged', mergedInto: prev });
      warn(tx, warnings, 'W_ATTRACTED', plan.value.from);
      continue;
    }
    const a = applyAttraction(tx, plan.value);
    if (!a.ok) return passOn(a);
    foldWarnings(warnings, a.warnings);
    out.push({ at: a.value.at, vertex: a.value.kind === 'free' ? -1 : a.value.vertex, attraction: a.value.kind, mergedInto: -1 });
    prev = i;
  }
  return ok(out, warnings);
}
