// Insertion step 3 — segment and stretch attraction (§3.6 *Attraction*, step 3; GEO-3, J-K2; *Roles on shared
// stretches*, GEO-4) — with what every later step shares: the chain's context and journal, candidate (b)'s landing on
// a route and its promotion (§3.6's candidates; §2.2 rule 3 *Promotion*, J-K11), and the run reading the router and the
// re-walk use. M0-a-05.
//
// A chain segment that passes within `attractCm` of an existing vertex is routed through it (W_ATTRACTED). Where a
// segment runs within `attractCm` of an existing edge over a stretch — a near-parallel approach, or a crossing shallower
// than `minFaceAngle` — the stretch is shared: the chain joins the edge where the stretch begins, follows it and leaves
// where it ends, and the shared edges gain the chain's roles (W_STRETCH_SHARED). A join or leave point whose exact
// position lies within `attractCm` of an endpoint of the edge it joins moves onto that endpoint, as in step 2; any other
// is placed by the placement rule; a stretch whose join and leave points would lie closer than `minEdge` collapses to one
// contact point, handled as step 2 handles a vertex.
//
// Candidates are (a) the vertices and edges of level ≤ the batch's level and (b) the finer vertices lying on those
// edges' routes where the chain ends on or joins such a route; a finer vertex of (b) that the chain lands on or is routed
// through is promoted to the batch's level (W_PROMOTED; its `split` flag kept). Nothing else finer is a candidate: a
// finer vertex off every route of level ≤ n within `attractCm` of the segment is kept content (E_KEPT; C-0177 (4)).
// Candidate (c), a clear-region batch's prepared vertices, is M3a's (`notBuilt('M3a')` in step 2, C-0169 (6)).
//
// Readings: C-0177 (1) – (6). Every distance test here uses + − × ÷ √ only (§3.2 (3)); every tie breaks on lattice
// positions (y, then x) or canonical keys, never on a slot (§3.3).
import {
  allocEdgePair,
  edgeLevel,
  freeEdgePair,
  freeVertex,
  isVertexLive,
  removeRoleRow,
  rowsOn,
  outgoing,
  pointOf,
  VERTEX_STEINER,
  type FaceId,
  type Five,
  type HalfEdgeId,
  type Plat,
  type RoleRow,
  type VertexId,
} from '../arena/index.js';
import {
  homeOf,
  indexAdd,
  indexChange,
  indexDelete,
  indexRelevel,
  ITEM_EDGE,
  ITEM_VERTEX,
  query,
  routeHandlePair,
  routePieces,
  routeRun,
  type Box,
  type ItemRef,
} from '../index/index.js';
import { dmath } from '../dmath/index.js';
import { dist2, err, LATTICE, ok, orient2d, ratio, type KernelResult, type Warning } from '../num/index.js';
import type { Cm, LatticePoint, Level } from '../types/index.js';
import { charge, check, foldWarnings, INSERT_ATTRACT_QUERIES, passOn, warn, workLimitHit, type ChainClass, type InsertTx } from './classes.js';
import { placePoint, segmentCloserThan, type Crossing } from './placement.js';
import { applySplitPlan, type SplitPlan } from './splitThrough.js';

const ATTRACT = LATTICE.attractCm;
const ATTRACT_SQ = LATTICE.attractCm * LATTICE.attractCm;
const MIN_EDGE = LATTICE.minEdgeCm;
const MIN_EDGE_SQ = LATTICE.minEdgeCm * LATTICE.minEdgeCm;
/** A query box's coordinates stay within ±2²⁴ (the index's bound). */
const BOX_RANGE = 16_777_216;

/** π to the double nearest it (Math.PI is outside §6.5 (3)'s allowlist, C-0125). */
const PI = 3.141592653589793;

// ---- the chain's journal and context ---------------------------------------------------------------------------------

/**
 * One level's face records a batch created, changed (rings, holes, or — a kept finer record re-parented, §3.6 step 5 —
 * its parent) and removed (§3.3's `CommitRecord.faces`, the dirty set per level ≥ the batch's level). A log in write
 * order: a record changed by two ops of one transaction appears twice; the commit record takes the set.
 */
export interface FaceDelta {
  readonly created: FaceId[];
  readonly changed: FaceId[];
  readonly removed: FaceId[];
}

/**
 * What insertChain wrote beyond the step-1–2 shell's journal (C-0177 (8)): the chain's new edge pairs, the existing pairs
 * that gained its rows, the promoted vertices, the face records per level, the coarser records materialised for a finer
 * one's parent, and the most snap-rounding passes a segment took. M0-a-06's commit record reads it.
 */
export interface ChainJournal {
  readonly newPairs: number[];
  readonly sharedPairs: number[];
  readonly promoted: VertexId[];
  readonly faces: Five<FaceDelta>;
  readonly materialised: { readonly level: Level; readonly face: FaceId }[];
  passes: number;
}

const journals = new WeakMap<InsertTx, ChainJournal>();

/** The transaction's insertion journal beyond the shell's (one per transaction, accumulated over its insertChain ops). */
export function chainJournal(tx: InsertTx): ChainJournal {
  let j = journals.get(tx);
  if (j === undefined) {
    const delta = (): FaceDelta => ({ created: [], changed: [], removed: [] });
    j = { newPairs: [], sharedPairs: [], promoted: [], faces: [delta(), delta(), delta(), delta(), delta()], materialised: [], passes: 0 };
    journals.set(tx, j);
  }
  return j;
}

/** One chain's insertion state, shared by steps 2 – 5. */
export interface ChainCtx {
  readonly tx: InsertTx;
  readonly p: Plat;
  readonly n: Level;
  readonly cls: ChainClass;
  /** The edge rows every new and shared edge gains, at the batch's level. */
  readonly rows: readonly RoleRow[];
  /** The chain's own warnings (each also reported to the transaction as it happens). */
  readonly warnings: Warning[];
  readonly journal: ChainJournal;
  /** The most snap-rounding passes a segment of this chain took. */
  maxPass: number;
  /**
   * The router's strict reading of step 3's vertex rule, for a segment whose design route would leave clearance broken
   * (C-0177 (13)): route through a vertex only where it stands within `minEdge` of the segment (where clearance needs it),
   * not in the band from `minEdge` to `attractCm`.
   */
  strict: boolean;
  /**
   * The router's last reading for a segment that no other route keeps clear (N-37, C-0202): every crossing lands on the
   * placement rule's endpoint fallback — the crossed sub-edge's nearer vertex, or its other end when that one is already
   * on the chain's path (C-0177 (7)) — and is never split (W_PLACED). Unset: crossings are placed as §3.6 states.
   */
  endpointCrossings?: boolean;
  /**
   * The router's reading after that (N-42 (a), C-0209): a crossing the placement rule can only send to its endpoint
   * fallback, whose next crossing lies closer than `minEdge` on another piece (a sliver), is placed across the sliver
   * instead (crossings.ts `placeAcross`, W_PLACED). Unset: crossings are placed as §3.6 states.
   */
  acrossSlivers?: boolean;
  /**
   * The inverse of every arena write the chain made, in order: a refused chain runs them backwards so the op writes
   * nothing (C-0177 (8)).
   */
  readonly undo: (() => void)[];
}

// ---- small exact helpers -----------------------------------------------------------------------------------------------

/** A box around a segment padded by `pad`, clamped to the index's range. */
export function segmentBox(ax: number, ay: number, bx: number, by: number, pad: number): Box {
  const clamp = (v: number): number => Math.max(-BOX_RANGE, Math.min(BOX_RANGE, v));
  return {
    minX: clamp(Math.floor(Math.min(ax, bx)) - pad),
    minY: clamp(Math.floor(Math.min(ay, by)) - pad),
    maxX: clamp(Math.ceil(Math.max(ax, bx)) + pad),
    maxY: clamp(Math.ceil(Math.max(ay, by)) + pad),
  };
}

/**
 * Is the lattice point p within `r` (inclusive) of the segment a–b with its foot strictly inside it — the segment
 * "passes" p (§3.6 step 3)? + − × only (exact where it can decide, as `segmentCloserThan`).
 */
export function passesWithin(px: number, py: number, ax: number, ay: number, bx: number, by: number, r: number): boolean {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  const dot = (px - ax) * dx + (py - ay) * dy;
  if (dot <= 0 || dot >= l2) return false;
  const o = orient2d(ax, ay, bx, by, px, py);
  return o * o <= r * r * l2;
}

/** Is p within `r` (inclusive) of the closed segment a–b? */
export function withinSegment(px: number, py: number, ax: number, ay: number, bx: number, by: number, r: number): boolean {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  const dot = (px - ax) * dx + (py - ay) * dy;
  const r2 = r * r;
  if (dot <= 0 || l2 === 0) return (px - ax) * (px - ax) + (py - ay) * (py - ay) <= r2;
  if (dot >= l2) return (px - bx) * (px - bx) + (py - by) * (py - by) <= r2;
  const o = orient2d(ax, ay, bx, by, px, py);
  return o * o <= r2 * l2;
}

/** The distance from a point (doubles) to the closed segment a–b (+ − × ÷ √; the division through ratio()). */
export function segmentDistance(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  const t = ratio((px - ax) * dx + (py - ay) * dy, l2, 'area');
  const c = t.ok ? Math.max(0, Math.min(1, t.value)) : 0;
  const fx = ax + c * dx - px;
  const fy = ay + c * dy - py;
  return Math.sqrt(fx * fx + fy * fy);
}

/** The foot of p on the segment a–b, clamped to it. */
export function footOnSegment(ax: number, ay: number, bx: number, by: number, px: number, py: number): { x: number; y: number } {
  const ux = bx - ax;
  const uy = by - ay;
  const t = ratio((px - ax) * ux + (py - ay) * uy, ux * ux + uy * uy, 'area');
  check(t.ok, 'an edge spans at least minEdge');
  const c = Math.max(0, Math.min(1, t.value));
  return { x: ax + c * ux, y: ay + c * uy };
}

/** Of two vertices, the nearer to (x, y); ties to the smaller lattice position, y then x. */
export function nearerVertex(p: Plat, a: VertexId, b: VertexId, x: number, y: number): VertexId {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const da = (X[a] - x) * (X[a] - x) + (Y[a] - y) * (Y[a] - y);
  const db = (X[b] - x) * (X[b] - x) + (Y[b] - y) * (Y[b] - y);
  if (da !== db) return da < db ? a : b;
  if (Y[a] !== Y[b]) return Y[a] < Y[b] ? a : b;
  return X[a] <= X[b] ? a : b;
}

/** The sine and cosine of `minFaceAngle` (500 cdeg), through dmath (§6.5 (2)): the near-parallel and acute-corner tests. */
const MIN_ANGLE_RAD = (LATTICE.minFaceAngleCdeg * PI) / 18_000;
export const SIN_MIN_ANGLE = dmath.sin(MIN_ANGLE_RAD);
export const COS_MIN_ANGLE = dmath.cos(MIN_ANGLE_RAD);

/**
 * Do the directions (ux, uy) and (vx, vy) differ by less than `minFaceAngle`, either way round (the lines are
 * near-parallel)? |cross| · cos θ < sin θ · |dot|, the cross and dot exact integers on lattice points.
 */
export function nearParallel(ux: number, uy: number, vx: number, vy: number): boolean {
  const cross = ux * vy - uy * vx;
  const dot = ux * vx + uy * vy;
  return Math.abs(cross) * COS_MIN_ANGLE < SIN_MIN_ANGLE * Math.abs(dot);
}

// ---- runs and routes ---------------------------------------------------------------------------------------------------

/** Does a vertex lie on a route of level ≤ n — an incident edge of level ≤ n? (Candidate (b)'s "finer vertex on a route".) */
export function onRouteOfLevel(p: Plat, v: VertexId, n: Level): boolean {
  for (const h of outgoing(p, v)) if (edgeLevel(p, h) <= n) return true;
  return false;
}

/**
 * The physical half-edges from a to b along one level-≤ n route piece — a and b consecutive vertices of level ≤ n on a
 * run of level ≤ n, every vertex between them finer than n — or null when no such piece joins them. A piece of level
 * ≤ n is the batch's view of an edge (§3.3), so a chain going from a to b shares it (§3.6 *Roles on shared stretches*).
 */
export function routeBetween(p: Plat, a: VertexId, b: VertexId, n: Level): HalfEdgeId[] | null {
  const O = p.halfEdges.origin;
  const L = p.vertices.level;
  for (const h of outgoing(p, a)) {
    const m = edgeLevel(p, h);
    if (m > n) continue;
    const path: HalfEdgeId[] = [h];
    let g = h;
    let w = O[g ^ 1];
    let guard = 0;
    while (L[w] > n) {
      // w is finer than the run: exactly two of its edges are of the run's level (§3.10's level consistency).
      let onward = -1;
      for (const e of outgoing(p, w)) if (e !== (g ^ 1) && edgeLevel(p, e) === m) onward = e;
      check(onward >= 0, `vertex ${w} on a level-${m} run has no onward run edge`);
      g = onward;
      path.push(g);
      w = O[g ^ 1];
      check(++guard <= p.slots.pair.top, 'a run does not end');
    }
    if (w === b) return path;
  }
  return null;
}

/** A level-n route piece in the batch's view: its two ends (of level ≤ n), its run's own-level route A–B, and a half-edge of it. */
export interface Piece {
  readonly a: VertexId;
  readonly b: VertexId;
  /** The sub-edge the index names the piece by (leaving its lower endpoint). */
  readonly edge: HalfEdgeId;
  /** The run's own-level route: its two ends. */
  readonly runA: VertexId;
  readonly runB: VertexId;
}

/** The level-n route piece the index names by its sub-edge `h` (the query's edge answer). */
export function pieceOf(p: Plat, h: HalfEdgeId, n: Level): Piece {
  const run = routeRun(p, h);
  const pc = routePieces(p, run, n).find((x) => x.edge === h);
  check(pc !== undefined, `the query's route edge ${h} is no piece of its run`);
  const O = p.halfEdges.origin;
  return { a: pc.a, b: pc.b, edge: h, runA: O[run.halfEdges[0]], runB: O[run.halfEdges[run.halfEdges.length - 1] ^ 1] };
}

// ---- promotion (candidate (b)) -----------------------------------------------------------------------------------------

/**
 * `promote(vertex, level)` (§2.2 rule 3 *Promotion*, J-K11; §3.6 candidate (b)): lowers a finer vertex lying on a route of
 * level ≤ `level` to `level`, adding it to the coarser route without moving it or touching the finer faces beside it. Its
 * `split` flag is kept (removing the promoting chain restores the edge it split, by demotion); its `steiner` flag tells
 * whether it is still finer than the run it lies on. The index: the vertex leaves its old level's index for the new one;
 * a vertex promoted to its run's own level cuts the run in two route-edge items (§3.3 *What each level's index holds*).
 * Reported W_PROMOTED and listed in the journal's `promoted` (the commit record's, §3.3). A vertex of level ≤ `level`
 * is left as it is. C-0177 (3).
 */
export function promote(tx: InsertTx, v: VertexId, level: Level, own: Warning[] = [], undo?: (() => void)[]): void {
  const p = tx.plat;
  check(isVertexLive(p, v), `vertex ${v} is not live`);
  const L = p.vertices.level;
  const old = L[v] as Level;
  if (old <= level) return;
  // The run it lies on: its incident edges coarser than it, exactly two of one level (§3.10's level consistency).
  const run: HalfEdgeId[] = [];
  for (const h of outgoing(p, v)) if (edgeLevel(p, h) < old) run.push(h);
  check(run.length === 2 && edgeLevel(p, run[0]) === edgeLevel(p, run[1]), `vertex ${v} (L${old}) lies on no single coarser run`);
  const m = edgeLevel(p, run[0]);
  check(m <= level, `vertex ${v} lies on an L${m} run, coarser than nothing at L${level}: candidate (b) is a vertex on a route of level ≤ the batch's`);
  const journal = tx.journal;
  const oldHandle = m === level ? routeHandlePair(p, run[0]) : -1;
  const oldItem: ItemRef = { kind: ITEM_EDGE, level: m, slot: oldHandle };
  const edgeHome = oldHandle >= 0 ? homeOf(p, oldItem) : -1;
  const vertexHome = p.indexHome.vertex[v];
  const oldFlags = p.vertices.flags[v];
  undo?.push(() => {
    p.vertices.level[v] = old;
    p.vertices.flags[v] = oldFlags;
  });
  L[v] = level;
  if (level > m) p.vertices.flags[v] |= VERTEX_STEINER;
  else p.vertices.flags[v] &= ~VERTEX_STEINER;
  indexRelevel(p, { kind: ITEM_VERTEX, level, slot: v }, old);
  journal.changed.push({ item: { kind: ITEM_VERTEX, level: old, slot: v }, homeBefore: vertexHome, successor: { kind: ITEM_VERTEX, level, slot: v } });
  if (oldHandle >= 0) {
    // Promoted to its run's level: the run now ends at v on both sides (as a same-level split, §3.3).
    const h1 = routeHandlePair(p, run[0]);
    const h2 = routeHandlePair(p, run[1]);
    if (oldHandle === h1 || oldHandle === h2) {
      indexChange(p, oldItem);
      journal.changed.push({ item: oldItem, homeBefore: edgeHome, successor: oldItem });
      indexAdd(p, { kind: ITEM_EDGE, level: m, slot: oldHandle === h1 ? h2 : h1 });
    } else {
      indexDelete(p, oldItem);
      journal.changed.push({ item: oldItem, homeBefore: edgeHome, successor: null });
      indexAdd(p, { kind: ITEM_EDGE, level: m, slot: h1 });
      indexAdd(p, { kind: ITEM_EDGE, level: m, slot: h2 });
    }
  }
  chainJournal(tx).promoted.push(v);
  warn(tx, own, 'W_PROMOTED', pointOf(p, v));
}

// ---- landing on a route (join, leave and contact points; step 2's candidate (b)) ----------------------------------------

/** Where a point lands on a route: an existing vertex (promoted when finer), or a new vertex by a split. */
export type Landing =
  | { readonly kind: 'vertex'; readonly vertex: VertexId; readonly onto: 'endpoint' | 'finer' | 'fallback'; readonly warnings: readonly Warning[] }
  | { readonly kind: 'split'; readonly plan: SplitPlan & { readonly kind: 'new' }; readonly warnings: readonly Warning[] };

/** A landing's lattice point. */
export function landingPoint(p: Plat, l: Landing): LatticePoint {
  return l.kind === 'split' ? l.plan.at : pointOf(p, l.vertex);
}

/**
 * The plan of a point landing on the level-n route piece `piece` at the exact position (x, y) on it (doubles) — a join,
 * leave or contact point of step 3, step 2's edge attraction where a finer vertex stands beside the foot, a wedge's
 * corner foot (step 4): onto the piece's nearer endpoint when the position lies within `attractCm` of it (ties y then
 * x); else onto the nearest finer vertex of the piece within `attractCm` (candidate (b): promoted when applied); else
 * the placement rule's point on the run (`crossing` keeps `minEdge` from a crossing segment's ends), or its fallback
 * vertex. Nothing written; refuses only E_WORK_LIMIT.
 */
export function planLanding(tx: InsertTx, piece: Piece, x: number, y: number, crossing?: Crossing): KernelResult<Landing> {
  const p = tx.plat;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  const n = tx.level;
  const nearA = (X[piece.a] - x) * (X[piece.a] - x) + (Y[piece.a] - y) * (Y[piece.a] - y) <= ATTRACT_SQ;
  const nearB = (X[piece.b] - x) * (X[piece.b] - x) + (Y[piece.b] - y) * (Y[piece.b] - y) <= ATTRACT_SQ;
  if (nearA || nearB) {
    const v = nearA && nearB ? nearerVertex(p, piece.a, piece.b, x, y) : nearA ? piece.a : piece.b;
    return ok({ kind: 'vertex', vertex: v, onto: 'endpoint', warnings: [] });
  }
  // Candidate (b): the finer vertices standing on the piece between its ends.
  const path = routeBetween(p, piece.a, piece.b, n);
  check(path !== null, 'a piece joins its two ends');
  const O = p.halfEdges.origin;
  let best = -1;
  for (let k = 1; k < path.length; k++) {
    const v = O[path[k]];
    if (L[v] <= n) continue;
    const d = (X[v] - x) * (X[v] - x) + (Y[v] - y) * (Y[v] - y);
    if (d > ATTRACT_SQ) continue;
    if (best < 0) best = v;
    else best = nearerVertex(p, best, v, x, y);
  }
  if (best >= 0) return ok({ kind: 'vertex', vertex: best, onto: 'finer', warnings: [] });
  // The placement rule on the run's own-level route (§3.6): the exact position is the point's foot on A–B.
  const e = footOnSegment(X[piece.runA], Y[piece.runA], X[piece.runB], Y[piece.runB], x, y);
  const pl = placePoint(tx, piece.edge, e, crossing);
  if (!pl.ok) return passOn(pl);
  if (pl.value.kind === 'endpoint') return ok({ kind: 'vertex', vertex: pl.value.vertex, onto: 'fallback', warnings: pl.warnings });
  const sub = pl.value.sub;
  if (splitBreaksClearance(p, O[sub], O[sub ^ 1])) {
    const v = nearerVertex(p, O[sub], O[sub ^ 1], e.x, e.y);
    return ok({ kind: 'vertex', vertex: v, onto: 'fallback', warnings: [{ code: 'W_PLACED', count: 1, at: pointOf(p, v) }] });
  }
  return ok({ kind: 'split', plan: { kind: 'new', at: pl.value.at, sub, row: null, warnings: pl.warnings }, warnings: pl.warnings });
}

/**
 * Would splitting the sub-edge s–t at any point break clearance at its ends (§3.10's clearance row)? Before the split,
 * t's one-ring holds every edge at s (s is its neighbour) and s's every edge at t; after it, s and t are no longer
 * neighbours, so t must stand at least `minEdge` from each edge at s whose far end is not a neighbour of t, and s from
 * each such edge at t. At an acute corner one end can stand closer — allowed while s and t are joined — and then no
 * point of s–t qualifies: the placement falls back on the nearer end (§3.6 *The placement rule*; C-0177 (11)).
 */
export function splitBreaksClearance(p: Plat, s: VertexId, t: VertexId): boolean {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const ns = new Set<VertexId>(outgoing(p, s).map((h) => O[h ^ 1]));
  const nt = new Set<VertexId>(outgoing(p, t).map((h) => O[h ^ 1]));
  for (const [x, y, nb] of [[t, s, nt], [s, t, ns]] as const) {
    // x against the edges at y
    for (const h of outgoing(p, y)) {
      const u = O[h ^ 1];
      if (u === x || nb.has(u)) continue;
      if (segmentCloserThan(X[x], Y[x], X[y], Y[y], X[u], Y[u], MIN_EDGE)) return true;
    }
  }
  return false;
}

/**
 * Makes sure the arena's edge-pair table holds one free slot before a split: splitThrough's writer (M0-a-04's
 * `applySplitPlan`) reads the half-edge table it captured before allocating the new pair, so a split that doubles the
 * table would link the new pair into the stale arrays. A pair allocated between the split sub-edge's ends and freed at
 * once leaves the slot on the free list for the split to take — no growth inside the writer (C-0177 (10); reported to
 * the session for M0-a-04's fix round).
 */
export function reservePair(p: Plat, sub: HalfEdgeId): void {
  if (p.slots.pair.free !== -1 || p.slots.pair.top < p.halfEdges.level.length) return;
  const O = p.halfEdges.origin;
  const h = allocEdgePair(p, O[sub], O[sub ^ 1], edgeLevel(p, sub));
  freeEdgePair(p, h);
}

/** Writes a landing: a split by splitThrough's writer, or a vertex promoted to the batch's level when finer. Returns the vertex. */
export function applyLanding(ctx: ChainCtx, l: Landing): VertexId {
  if (l.kind === 'split') {
    reservePair(ctx.p, l.plan.sub);
    const v = applySplitPlan(ctx.tx, l.plan); // reports the placement's W_PLACED to the transaction
    recordSplit(ctx, l.plan.sub, v);
    foldWarnings(ctx.warnings, l.warnings);
    return v;
  }
  if (l.warnings.length > 0) {
    foldWarnings(ctx.tx.warnings, l.warnings);
    foldWarnings(ctx.warnings, l.warnings);
  }
  promote(ctx.tx, l.vertex, ctx.n, ctx.warnings, ctx.undo);
  return l.vertex;
}

/**
 * Records the inverse of the split splitThrough's writer just made of sub-edge g at the new vertex v (its new pair the
 * journal's last): the pair beyond v merged back into g, its rows removed and slot freed, v freed (C-0177 (8)).
 */
export function recordSplit(ctx: ChainCtx, g: HalfEdgeId, v: VertexId): void {
  const p = ctx.p;
  const pairs = ctx.tx.journal.pairs;
  const h = 2 * pairs[pairs.length - 1];
  check(p.halfEdges.origin[h] === v && p.halfEdges.origin[g ^ 1] === v, 'the journal names the split just made');
  ctx.undo.push(() => unsplit(p, g, h, v));
}

/** The inverse of splitThrough's writer (M0-a-04's `applySplitPlan`): g: s → v and h: v → t merge back into g: s → t. */
function unsplit(p: Plat, g: HalfEdgeId, h: HalfEdgeId, v: VertexId): void {
  const T = p.halfEdges;
  const t = T.origin[h ^ 1];
  const after = T.next[h];
  const before = T.prev[h ^ 1];
  if (after === (h ^ 1)) {
    T.next[g] = g ^ 1;
    T.prev[g ^ 1] = g;
  } else {
    T.next[g] = after;
    T.prev[after] = g;
    T.next[before] = g ^ 1;
    T.prev[g ^ 1] = before;
  }
  T.origin[g ^ 1] = t;
  if (p.vertices.out[t] === (h ^ 1)) p.vertices.out[t] = g ^ 1;
  for (const r of rowsOn(p, 'edge', h)) removeRoleRow(p, r);
  for (const r of rowsOn(p, 'vertex', v)) removeRoleRow(p, r);
  p.vertices.out[v] = -1;
  freeEdgePair(p, h);
  freeVertex(p, v);
}

// ---- step 3 ----------------------------------------------------------------------------------------------------------

/** The first step-3 contact of a segment: a vertex it passes, a shared stretch, or a collapsed stretch's contact point. */
export type StretchObstacle =
  | { readonly kind: 'vertex'; readonly vertex: VertexId; readonly t: number }
  | { readonly kind: 'stretch'; readonly piece: Piece; readonly join: { x: number; y: number }; readonly leave: { x: number; y: number }; readonly t: number }
  | { readonly kind: 'contact'; readonly piece: Piece; readonly at: { x: number; y: number }; readonly t: number };

/** A parameter interval [lo, hi] of t, or null when empty. */
type Interval = { lo: number; hi: number } | null;

/** The t where F0 + t · F1 lies in [lo, hi] (F1 = 0: everything or nothing). */
function linearIn(f0: number, f1: number, lo: number, hi: number): Interval {
  if (f1 === 0) return f0 >= lo && f0 <= hi ? { lo: -Infinity, hi: Infinity } : null;
  const t0 = ratio(lo - f0, f1, 'area');
  const t1 = ratio(hi - f0, f1, 'area');
  if (!t0.ok || !t1.ok) return null;
  return t0.value <= t1.value ? { lo: t0.value, hi: t1.value } : { lo: t1.value, hi: t0.value };
}

/**
 * The parameters t of the segment a + t (b − a) that run beside the closed segment u–w within `attractCm` of it — their
 * foot on u–w's line inside u–w (the band beside the edge's interior; near its ends a vertex is what the segment
 * approaches, which step 3's vertex rule reads) — as one interval clipped to [0, 1], or null.
 */
export function bandInterval(ax: number, ay: number, bx: number, by: number, ux: number, uy: number, wx: number, wy: number): Interval {
  const dx = bx - ax;
  const dy = by - ay;
  const ex = wx - ux;
  const ey = wy - uy;
  const le2 = ex * ex + ey * ey;
  const le = Math.sqrt(le2);
  const along = linearIn((ax - ux) * ex + (ay - uy) * ey, dx * ex + dy * ey, 0, le2);
  const across = linearIn(ex * (ay - uy) - ey * (ax - ux), ex * dy - ey * dx, -ATTRACT * le, ATTRACT * le);
  if (along === null || across === null) return null;
  const lo = Math.max(0, along.lo, across.lo);
  const hi = Math.min(1, along.hi, across.hi);
  return lo <= hi ? { lo, hi } : null;
}

/**
 * Step 3 on the segment a → b (two arena vertices, both of level ≤ n): its first contact by its parameter along the
 * segment — a vertex it passes within `attractCm` (its foot strictly inside the segment; candidate (a), or (b) when
 * finer and on a route of level ≤ n), a shared stretch along a level-n route piece it runs within `attractCm` of at less
 * than `minFaceAngle` (join and leave points at least `minEdge` apart), or that stretch's contact point when they are
 * closer; ties to the vertex, then by lattice position. `exclude` holds vertices the router has already put on the
 * chain around this segment (C-0177 (2)), and `skip` pieces whose contact the router has found would land the chain
 * back on its own path. Refuses E_KEPT for a finer vertex off every route of level ≤ n within `attractCm` (kept content, §3.3),
 * E_WORK_LIMIT. Nothing written; two index queries charged to `insert.attractQueries`.
 */
export function attractStretch(ctx: ChainCtx, a: VertexId, b: VertexId, exclude: ReadonlySet<VertexId>, skip: ReadonlySet<HalfEdgeId> = new Set()): KernelResult<StretchObstacle | null> {
  const { tx, p, n } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  const ax = X[a];
  const ay = Y[a];
  const bx = X[b];
  const by = Y[b];
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  const box = segmentBox(ax, ay, bx, by, ATTRACT);
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 2)) return workLimitHit(INSERT_ATTRACT_QUERIES);
  let best: StretchObstacle | null = null;
  const better = (o: StretchObstacle): boolean => {
    if (best === null) return true;
    if (o.t !== best.t) return o.t < best.t;
    if (o.kind !== best.kind) return o.kind === 'vertex';
    if (o.kind === 'vertex' && best.kind === 'vertex') return Y[o.vertex] < Y[best.vertex] || (Y[o.vertex] === Y[best.vertex] && X[o.vertex] < X[best.vertex]);
    return false;
  };
  const reach = ctx.strict ? MIN_EDGE : ATTRACT;
  for (const v of query(p, tx.key, 4, box, { vertices: true }).vertices) {
    if (v === a || v === b || exclude.has(v)) continue;
    if (!passesWithin(X[v], Y[v], ax, ay, bx, by, reach)) continue;
    if (L[v] > n && !onRouteOfLevel(p, v, n)) {
      return err('E_KEPT', `the chain passes within attractCm of a finer vertex at (${X[v]}, ${Y[v]}) off every route of level ≤ L${n} (kept content)`);
    }
    const t = ratio((X[v] - ax) * dx + (Y[v] - ay) * dy, l2, 'area');
    check(t.ok, 'a segment spans at least minEdge');
    const o: StretchObstacle = { kind: 'vertex', vertex: v, t: t.value };
    if (better(o)) best = o;
  }
  for (const h of query(p, tx.key, n, box, { edges: true }).edges) {
    if (skip.has(h)) continue;
    const pc = pieceOf(p, h, n);
    if (pc.a === a || pc.a === b || pc.b === a || pc.b === b) continue; // an incident piece: vertex routing or a corner (C-0177 (2))
    const ux = X[pc.a];
    const uy = Y[pc.a];
    const wx = X[pc.b];
    const wy = Y[pc.b];
    if (!nearParallel(dx, dy, wx - ux, wy - uy)) continue;
    const band = bandInterval(ax, ay, bx, by, ux, uy, wx, wy);
    // A stretch lies inside the segment: one that starts or ends at the segment's own vertex is a vertex standing beside
    // the edge (clearance keeps it at least minEdge away), not an approach (C-0177 (2)).
    if (band === null || band.lo <= 0 || band.hi >= 1) continue;
    const s0 = { x: ax + band.lo * dx, y: ay + band.lo * dy };
    const s1 = { x: ax + band.hi * dx, y: ay + band.hi * dy };
    const join = footOnSegment(ux, uy, wx, wy, s0.x, s0.y);
    const leave = footOnSegment(ux, uy, wx, wy, s1.x, s1.y);
    const jl = (leave.x - join.x) * (leave.x - join.x) + (leave.y - join.y) * (leave.y - join.y);
    let o: StretchObstacle;
    if (jl >= MIN_EDGE_SQ) {
      o = { kind: 'stretch', piece: pc, join, leave, t: band.lo };
    } else {
      const tm = 0.5 * (band.lo + band.hi);
      o = { kind: 'contact', piece: pc, at: footOnSegment(ux, uy, wx, wy, ax + tm * dx, ay + tm * dy), t: band.lo };
    }
    if (better(o)) best = o;
  }
  return ok(best);
}

/** The squared distance between two vertices. */
export function vertexDist2(p: Plat, a: VertexId, b: VertexId): number {
  return dist2(p.vertices.x[a], p.vertices.y[a], p.vertices.x[b], p.vertices.y[b]);
}

/** A lattice point of doubles already known to be integers (a placed or existing vertex's). */
export function lattice(x: number, y: number): LatticePoint {
  return { x: x as Cm, y: y as Cm };
}

export { MIN_EDGE };
