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
// The insert-specific predicates the face partitioners and the kerbs also read by path stay here
// (`nearParallel`, `onRouteOfLevel`, `passesWithin`, `withinSegment`, `segmentBox`); the shared exact ones are
// num/exact.ts's and steps 1 – 2's (`footOnSegment`, `nearerVertex`, re-exported here). Readings: C-0177 (1) – (6),
// C-0302. Every distance test here uses + − × ÷ √ only (§3.2 (3)); every tie breaks on lattice positions (y, then x) or
// canonical keys, never on a slot (§3.3).
import {
  edgeLevel,
  freeEdgePair,
  freeVertex,
  handleOf,
  idOf,
  isVertexLive,
  removeRoleRow,
  roleIdOf,
  roleInfo,
  rowElement,
  rowsOfKey,
  rowsOn,
  outgoing,
  pointOf,
  VERTEX_SPLIT,
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
import { BOX_RANGE } from '../num/exact.js';
import { err, LATTICE, ok, orient2d, ratio, type KernelResult, type Warning } from '../num/index.js';
import type { Cm, LatticePoint, Level } from '../types/index.js';
import { charge, check, foldWarnings, INSERT_ATTRACT_QUERIES, passOn, warn, workLimitHit, type ChainClass, type InsertTx } from './classes.js';
import { placePoint, type Crossing } from './placement.js';
import { applySplitPlan, footOnSegment, nearerVertex, type SplitPlan } from './splitThrough.js';

/** The foot of p on a segment, and the nearer of two vertices: steps 1 – 2's exported originals (C-0321 (1)). */
export { footOnSegment, nearerVertex };
/** The placement rule's (iii) at a split's own ends, C-0284 (2): `placement.ts`'s `splitEndsBreachClearance` under the name the face partitioners read. */
export { splitEndsBreachClearance as splitBreaksClearance } from './placement.js';

const ATTRACT = LATTICE.attractCm;
const ATTRACT_SQ = LATTICE.attractCm * LATTICE.attractCm;
const MIN_EDGE = LATTICE.minEdgeCm;
const MIN_EDGE_SQ = LATTICE.minEdgeCm * LATTICE.minEdgeCm;

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
  /**
   * Where this op's own pairs start in the two journals — `journal.newPairs` (the chain's new edges) and
   * `tx.journal.pairs` (the pairs its splits made): a pair at or after these marks is one this op wrote. Every split
   * landing reads them (`ownShapeVertex`) to tell a split of the chain's OWN edge — its own vertex — from a split of
   * another chain's edge (§2.2 rule 3; C-0302).
   */
  readonly pairsFrom: number;
  readonly txPairsFrom: number;
  /** The most snap-rounding passes a segment of this chain took. */
  maxPass: number;
  /**
   * The strict route (C-0177 (13)): step 3 routes through a vertex only where it stands within `minEdge` of the segment,
   * where clearance needs it — not in the band from `minEdge` to `attractCm`.
   */
  strict: boolean;
  /**
   * The strict route's second reading (C-0177 (13) read exactly, C-0361): set beside `strict`, step 3 also passes over a
   * vertex that is a neighbour of the segment's own end — it lies in the new edge's one-ring, which §3.10's clearance
   * exempts. Tried after the strict route without it, so a segment that route keeps routes as before (N-37).
   */
  strictEnds?: boolean;
  /**
   * The endpoint route (C-0202 (1)): every crossing lands on the placement rule's endpoint fallback — the crossed
   * sub-edge's nearer end, or its other end when that one is already on the chain's path (C-0177 (7)) — and is never
   * split (W_PLACED). Unset: crossings are placed as §3.6 states.
   */
  endpointCrossings?: boolean;
  /**
   * The route across a sliver (C-0209): a crossing the placement rule can only send to its endpoint fallback, whose next
   * crossing lies closer than `minEdge` on another piece, is placed across the sliver (crossings.ts `placeAcross`,
   * W_PLACED). Unset: crossings are placed as §3.6 states.
   */
  acrossSlivers?: boolean;
  /**
   * The anchored route (C-0215): the input segment the segment being routed came from, and a reach. Set, step 3 routes
   * through a vertex, shares a stretch or lands a contact only where it also lies within the reach of that input segment
   * — each contact may move the route up to `attractCm` from the sub-segment it bends, so a run of them along a
   * near-parallel chain would otherwise carry the route beyond the fidelity bound. Null: step 3 reads the segment being
   * routed alone.
   */
  anchor?: { readonly a: LatticePoint; readonly b: LatticePoint; readonly reach: number } | null;
  /**
   * Set in insertChain's second and later passes (C-0215, C-0221): `routeOne` adds the anchored routes, insertChain the
   * split route, and a route that keeps clearance only beyond the fidelity bound refuses an optional chain
   * E_BELOW_MIN_EDGE. Unset in the first pass.
   */
  extended?: boolean;
  /**
   * Set in insertChain's third and fourth passes (C-0217, C-0221): the reading (`variant` 0, or 1 with step 2's free spot
   * first) and the input segment a → b of the segment being routed (null in step 2, which reads the chain point itself).
   * Set, a landing the placement rule can only send to its endpoint fallback beyond the fidelity bound of that input is
   * kept within it — a crossing placed across the thin strip it crosses (the far side's sub-edge left out of (iii):
   * `stripPartner`, `placeOnRun`), at the nearest qualifying point of the run within the bound, or on the nearest
   * existing vertex within it; a step-2 vertex as insertChain's `stepTwoStrip` says — and a wedge corner beyond the bound
   * of the input is not taken (its crossings placed in turn, as beyond the wedge cap, C-0202). Every such landing reports
   * W_PLACED. Null: §3.6 as written.
   */
  strip?: { readonly variant: 0 | 1; readonly a: LatticePoint | null; readonly b: LatticePoint | null } | null;
  /**
   * The route of the segment being routed, as far as it has come (§3.6 step 4, item 130 (d)): the vertices it has
   * reached in order, each with the op's mark taken when the route first stood there, and the means to return the op to
   * such a mark. Set by insertChain's `routeOne` for each reading; null outside one (the router then reads no path).
   */
  path?: SegmentPath | null;
  /**
   * Where the run being inserted began in the chain's journal (its new and shared pairs before the run's first segment):
   * the run's committed route so far — the chain's path before the segment being routed — is read from there (item 130
   * (d) on the chain's path, insertChain's `priorPath`). Set by insertChain for each run; null outside one.
   */
  runStart?: { readonly newPairs: number; readonly shared: number } | null;
  /**
   * How insertChain's passes read the chain's path before each segment (item 130 (d) on the chain's path, C-0361 (1)):
   * 'watch' — the routes as before, a kept reading that shares an edge of that path again (a retraced edge) noted
   * (`reentry`); 'back' — the same, and a segment whose route retraced is cut back to a vertex of that path (insertChain's
   * `cutBack`); null — not read (the routes as before, nothing noted: the fallback for a chain the cut back cannot
   * route, notBuilt #3).
   */
  chainPath?: 'watch' | 'back' | null;
  /** Set when a kept reading of the pass retraced an edge of the chain's path before it (`chainPath`). */
  reentry?: boolean;
  /**
   * The run the chain's own key already carries (§3.6 *Roles on shared stretches*, item 130 (e)): the vertices of level
   * ≤ n on edges of level ≤ n carrying one of the chain's rows before the op, and those rows' keys. A chain given again
   * under such a key is that run — its points land on these vertices within √2 · `attractCm`, its segments follow the
   * run between two landings. Null when the key carries nothing yet (every chain the families draw under a new key).
   */
  own?: OwnRun | null;
  /**
   * How the router came to each vertex of the segment's route (§13.1's refusal cause, "the provenance of the failing
   * route's farthest vertex"): set fresh by insertChain's `routeOne` for each reading, the first reason a vertex was
   * routed through kept. Null outside a reading.
   */
  provenance?: Map<VertexId, Provenance> | null;
  /**
   * The inverse of every arena write the chain made, in order: a refused chain runs them backwards so the op writes
   * nothing (C-0177 (8)).
   */
  readonly undo: (() => void)[];
}

/**
 * A segment's route so far (item 130 (d)): `order` the vertices reached, first to last; `marks` the op's mark at each,
 * taken when the route first stood there; `mark` takes one now; `back` returns the op to one (every write since undone,
 * the journals, the index and the warnings as they were then).
 */
export interface SegmentPath {
  readonly order: VertexId[];
  readonly marks: Map<VertexId, unknown>;
  readonly mark: () => unknown;
  readonly back: (m: unknown) => void;
  /**
   * Whether the segment's route created or promoted v before the mark m — so going back to m would leave v, which the
   * route placed only to reach it, off the route (a dissolvable vertex, N-55 (2)).
   */
  readonly placedBefore: (v: VertexId, m: unknown) => boolean;
  /** The segment's own end: a cut routes on from the vertex it went back to, to here. */
  readonly end: VertexId;
  /** How many cuts the route has made: a route call whose nested call cut stops there, returning to `snapRound`. */
  cuts: number;
  /**
   * Set by a cut: where `snapRound` routes on from (the vertex the route went back to), with the pass and the vertices
   * excluded from step 3; null otherwise.
   */
  restart: { readonly from: VertexId; readonly pass: number; readonly exclude: ReadonlySet<VertexId> } | null;
}

/**
 * Why the router routed a segment through a vertex: a step-3 contact (a vertex the segment passes, a contact point, a
 * shared stretch's join or leave), a wedge corner, a crossing placed by the placement rule, a crossing on an edge's end
 * within `attractCm`, a crossing on the placement rule's endpoint fallback (no point of the crossed run near it keeps
 * clearance), or a corner's exit along an existing edge.
 */
export type Provenance = 'contact' | 'stretch' | 'corner' | 'placed' | 'endpoint' | 'fallback' | 'exit';

/** Records the first reason the route came to v (`ChainCtx.provenance`). */
export function tag(ctx: ChainCtx, v: VertexId, why: Provenance): void {
  const m = ctx.provenance ?? null;
  if (m !== null && !m.has(v)) m.set(v, why);
}

/** The run a chain's key already carries (`ChainCtx.own`): its vertices and its keys as `role/entity/ordinal` (ids, handles). */
export interface OwnRun {
  readonly vertices: ReadonlySet<VertexId>;
  readonly keys: ReadonlySet<string>;
}

/**
 * The registry ids (§2.2 rule 7: never changed, never reused) of the roles whose key is one chain per entity — §3.10's
 * role consistency, tx/tx.ts `LINEAR_PARTS`' roles of one part (a way, a wall trace, a tunnel, a gallery, a rim, a
 * chamber outline, a deck span). Held by id, not imported: the transaction imports this folder, and importing it back
 * changes the folder's load order (round S9 measured 84 red tests in the step3-5 folder); insertChain.test.ts holds the
 * set equal to `LINEAR_PARTS`' rows of one part.
 */
const ONE_CHAIN_ROLE_IDS: ReadonlySet<number> = new Set([0, 4, 20, 24, 25, 26, 27]);

/**
 * Is the role one whose key is one chain per entity? Only under such a key is a chain given again the same chain (item
 * 130 (e)); a shore, a bank, a kerb or a district's split line may carry many chains per key.
 */
export function oneChainRole(role: string): boolean {
  return ONE_CHAIN_ROLE_IDS.has(roleIdOf(role as RoleRow['role']));
}

/**
 * The run the rows' keys already carry at level ≤ n (item 130 (e)), for the roles of one chain per entity: every live vertex of level ≤ n at an edge of level
 * ≤ n carrying a row of one of the keys at level ≤ n; null when none does. Reads the rows' key chains (`rowsOfKey`), no
 * index query.
 */
export function ownRunOf(p: Plat, rows: readonly RoleRow[], n: Level): OwnRun | null {
  const O = p.halfEdges.origin;
  const vertices = new Set<VertexId>();
  const keys = new Set<string>();
  for (const r of rows) {
    if (!oneChainRole(r.role)) continue;
    const role = roleIdOf(r.role);
    const h = handleOf(p, r.entity);
    if (role < 0 || h < 0) continue;
    const ordinal = r.ordinal ?? 0;
    keys.add(`${role}/${h}/${ordinal}`);
    for (const row of rowsOfKey(p, role, h, ordinal)) {
      if (p.roles.level[row] > n || roleInfo(role).kind !== 'edge') continue;
      const e = rowElement(p, row);
      if (p.halfEdges.level[e] > n) continue;
      for (const v of [O[2 * e], O[2 * e + 1]]) if (p.vertices.level[v] <= n) vertices.add(v);
    }
  }
  return vertices.size === 0 ? null : { vertices, keys };
}

/** Does the edge pair of `h` carry a row of one of the run's keys? */
export function carriesOwnKey(p: Plat, own: OwnRun, h: HalfEdgeId): boolean {
  for (const r of rowsOn(p, 'edge', h)) if (own.keys.has(`${p.roles.kind[r]}/${p.roles.entity[r]}/${p.roles.ordinal[r]}`)) return true;
  return false;
}

// ---- small exact helpers -----------------------------------------------------------------------------------------------

/**
 * The fidelity bound, squared (exact): (2 · √2 · `attractCm`)² = 8 · `attractCm`² = 5 408 — every route a chain commits
 * stays within 2 · √2 · `attractCm` ≈ 73.5 cm of its input segment, Hausdorff both ways (C-0215); the wedge cap's value
 * (C-0202).
 */
export const FIDELITY_SQ = 8 * ATTRACT_SQ;

/**
 * Is the lattice point (x, y) within the fidelity bound of the input segment a → b (C-0217)? Integer arithmetic, exact while
 * the squares stay below 2⁵³ (every arena B-FUZZ builds; a 2²⁴ cm overlay arena rounds the cross term's square near the
 * bound's edge only).
 */
export function inInputBound(a: LatticePoint, b: LatticePoint, x: number, y: number): boolean {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const dot = (x - a.x) * dx + (y - a.y) * dy;
  if (dot <= 0 || l2 === 0) return (x - a.x) * (x - a.x) + (y - a.y) * (y - a.y) <= FIDELITY_SQ;
  if (dot >= l2) return (x - b.x) * (x - b.x) + (y - b.y) * (y - b.y) <= FIDELITY_SQ;
  const o = dx * (y - a.y) - dy * (x - a.x);
  return o * o <= FIDELITY_SQ * l2;
}

/**
 * A box around a segment padded by `pad`, clamped to the index's range (±2²⁴). The insert steps and the face
 * partitioners read it here; its one home in num/exact.ts (beside invariants/common.ts's copy) is M0-a-01's.
 */
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
 * The level-≤ n route piece that leaves its start by the half-edge h (of level m ≤ n): the physical half-edges from h
 * through every finer vertex — each left by its onward edge of level m, the last such in its rotation — to the first
 * vertex of level ≤ n, `w`, which ends it. The one walk of a piece from a vertex (`routeBetween`, the router's
 * `pieceNeighbours` and `exitTowards`).
 */
export function pieceFrom(p: Plat, h: HalfEdgeId, n: Level): { readonly w: VertexId; readonly path: HalfEdgeId[] } {
  const O = p.halfEdges.origin;
  const L = p.vertices.level;
  const m = edgeLevel(p, h);
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
  return { w, path };
}

/**
 * The physical half-edges from a to b along one level-≤ n route piece — a and b consecutive vertices of level ≤ n on a
 * run of level ≤ n, every vertex between them finer than n — or null when no such piece joins them. A piece of level
 * ≤ n is the batch's view of an edge (§3.3), so a chain going from a to b shares it (§3.6 *Roles on shared stretches*).
 */
export function routeBetween(p: Plat, a: VertexId, b: VertexId, n: Level): HalfEdgeId[] | null {
  for (const h of outgoing(p, a)) {
    if (edgeLevel(p, h) > n) continue;
    const pc = pieceFrom(p, h, n);
    if (pc.w === b) return pc.path;
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

/**
 * The physical sub-edge of the route piece a–b that holds the exact position (x, y) on it, as its two end vertices: the
 * position projected along a → b (integer dot products), the sub-edges walked in run order from a, and the walk
 * advanced past each vertex whose projection is at most the position's — so a position projecting exactly onto a vertex
 * of the piece takes the sub-edge after it, and one beyond the piece its last sub-edge. Null when no piece joins a and
 * b. The callers choose the end (the nearer, the one beside a corner, one off the chain's path).
 */
export function subEdgeHolding(ctx: ChainCtx, piece: { readonly a: VertexId; readonly b: VertexId }, x: number, y: number): readonly [VertexId, VertexId] | null {
  const p = ctx.p;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const path = routeBetween(p, piece.a, piece.b, ctx.n);
  if (path === null) return null;
  const vs = path.map((h) => O[h]);
  vs.push(O[path[path.length - 1] ^ 1]);
  const ux = X[piece.b] - X[piece.a];
  const uy = Y[piece.b] - Y[piece.a];
  const tq = (x - X[piece.a]) * ux + (y - Y[piece.a]) * uy;
  let i = 0;
  while (i + 2 < vs.length && (X[vs[i + 1]] - X[piece.a]) * ux + (Y[vs[i + 1]] - Y[piece.a]) * uy <= tq) i += 1;
  return [vs[i], vs[i + 1]];
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
  // A placed answer's sub-edge keeps clearance at its own ends: the placement rule's (iii) refuses any other (C-0284).
  const sub = pl.value.sub;
  return ok({ kind: 'split', plan: { kind: 'new', at: pl.value.at, sub, row: null, warnings: pl.warnings }, warnings: pl.warnings });
}

/** Writes a landing: a split by splitThrough's writer, or a vertex promoted to the batch's level when finer. Returns the vertex. */
export function applyLanding(ctx: ChainCtx, l: Landing): VertexId {
  if (l.kind === 'split') {
    const v = applySplitPlan(ctx.tx, l.plan); // reports the placement's W_PLACED to the transaction
    recordSplit(ctx, l.plan.sub, v);
    ownShapeVertex(ctx, l.plan.sub, v);
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
 * §2.2 rule 3: "a chain's own shape vertices never carry [the split flag]". A vertex this op made by splitting the chain's
 * OWN edge — a pair this op wrote (`ctx.pairsFrom`, `ctx.txPairsFrom`) carrying no row but the chain's own at the
 * batch's level — is the chain's own vertex, not a split of another run: a chain point that step 2 lands on the chain's
 * earlier edge (it folds back over itself, §3.11's collinear overlap), or a step-3 join, leave or contact point where a
 * later segment shares an earlier one. Its flag is cleared, so no later removal dissolves it (a dissolution would make
 * a removal differ from undoing the chain, §13.1's remove(insert(x)) ≡ id); the chain's own removal frees it with the
 * chain's edges. A split of another chain's edge — any row of another key or level on the sub-edge, or a pair this op did not
 * write — keeps the flag: its dissolution restores that edge when this chain goes (rule 3). `v` is the vertex the split
 * of `sub` just made (freed by the split's own undo on a refusal). C-0302.
 */
export function ownShapeVertex(ctx: ChainCtx, sub: HalfEdgeId, v: VertexId): void {
  const p = ctx.p;
  const e = sub >> 1;
  if (!ctx.journal.newPairs.slice(ctx.pairsFrom).includes(e) && !ctx.tx.journal.pairs.slice(ctx.txPairsFrom).includes(e)) return;
  const own = new Set(ctx.rows.map((r) => `${roleIdOf(r.role)}/${r.entity}/${r.ordinal ?? 0}`));
  for (const r of rowsOn(p, 'edge', sub)) {
    if (p.roles.level[r] !== ctx.n || !own.has(`${p.roles.kind[r]}/${idOf(p, p.roles.entity[r])}/${p.roles.ordinal[r]}`)) return;
  }
  p.vertices.flags[v] &= ~VERTEX_SPLIT;
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
  // The anchored reading (C-0215): a contact also lies within attractCm of the chain's input segment.
  const anchor = ctx.anchor ?? null;
  const nearInput = (x: number, y: number): boolean => anchor === null || withinSegment(x, y, anchor.a.x, anchor.a.y, anchor.b.x, anchor.b.y, anchor.reach);
  // The strict route's second reading routes through a vertex only where clearance needs it (C-0177 (13), C-0361): a
  // neighbour of the segment's own end lies in the new edge's one-ring, which §3.10's clearance exempts, so it is no
  // contact there.
  const ends = ctx.strict && ctx.strictEnds === true ? new Set<VertexId>([...outgoing(p, a), ...outgoing(p, b)].map((h) => p.halfEdges.origin[h ^ 1])) : null;
  for (const v of query(p, tx.key, 4, box, { vertices: true }).vertices) {
    if (v === a || v === b || exclude.has(v)) continue;
    if (!passesWithin(X[v], Y[v], ax, ay, bx, by, reach)) continue;
    if (ends !== null && ends.has(v) && L[v] <= n) continue;
    if (L[v] > n && !onRouteOfLevel(p, v, n)) {
      return err('E_KEPT', `the chain passes within attractCm of a finer vertex at (${X[v]}, ${Y[v]}) off every route of level ≤ L${n} (kept content)`);
    }
    if (!nearInput(X[v], Y[v])) continue;
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
      if (!nearInput(join.x, join.y) || !nearInput(leave.x, leave.y)) continue;
      o = { kind: 'stretch', piece: pc, join, leave, t: band.lo };
    } else {
      const tm = 0.5 * (band.lo + band.hi);
      const at = footOnSegment(ux, uy, wx, wy, ax + tm * dx, ay + tm * dy);
      if (!nearInput(at.x, at.y)) continue;
      o = { kind: 'contact', piece: pc, at, t: band.lo };
    }
    if (better(o)) best = o;
  }
  return ok(best);
}

/**
 * The live vertex of level ≤ n nearest the point within the fidelity bound of it, other than those `skip` names (ties y
 * then x), or −1 (the third pass's in-bound landing on an existing vertex, C-0217). One index query
 * (`insert.attractQueries`).
 */
export function nearestVertexWithin(ctx: ChainCtx, pt: { readonly x: number; readonly y: number }, skip: (v: VertexId) => boolean): KernelResult<VertexId> {
  const { tx, p, n } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 1)) return workLimitHit(INSERT_ATTRACT_QUERIES);
  let best = -1;
  let bestD = Infinity;
  for (const w of query(p, tx.key, n, segmentBox(pt.x, pt.y, pt.x, pt.y, Math.ceil(Math.sqrt(FIDELITY_SQ))), { vertices: true }).vertices) {
    if (skip(w) || p.vertices.level[w] > n) continue;
    const d = (X[w] - pt.x) * (X[w] - pt.x) + (Y[w] - pt.y) * (Y[w] - pt.y);
    if (d > FIDELITY_SQ) continue;
    if (d < bestD || (d === bestD && (Y[w] < Y[best] || (Y[w] === Y[best] && X[w] < X[best])))) {
      best = w;
      bestD = d;
    }
  }
  return ok(best);
}

/**
 * A lattice point of doubles already known to be integers (a placed or existing vertex's): the cast faces/common.ts and
 * geom/common.ts spell `lp`, whose one home in num/ is M0-a-01's.
 */
export function lattice(x: number, y: number): LatticePoint {
  return { x: x as Cm, y: y as Cm };
}
