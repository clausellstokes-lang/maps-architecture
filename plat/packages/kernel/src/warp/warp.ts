// §3.4's `warp(tx, field, fromLevel, region, recordCheck?)` with §3.6's move semantics (GEO-10, GEO-35, GEO-5 (c); J-K17,
// J-K18, J-K26, J-K27, J-K30): the only door for moving existing vertices. A step, in the order §3.6 applies its rules:
//
// 1. **Candidates and the held set** (held.ts): every vertex of level ≥ `fromLevel` inside the region, and every finer
//    vertex inside a run one of them ends; the held set where the field is zero.
// 2. **Targets.** A vertex of its edges' level moves by the field (scaled by the step's strength) to the nearest lattice
//    point. A finer vertex inside a run keeps to that run: on a **fixed** route (a run of level < `fromLevel`, or both of
//    whose ends are held) it **slides** — its displacement projected on the route's direction, the point kept
//    `attractCm` from the route's ends and from every held vertex on it; on any other route it is **re-seated** at the
//    projection of its own target on the run's moved route (an unmoved route when neither end moves). Rounded targets
//    are taken coarsest level first, so a re-seat reads its route's ends at theirs.
// 3. **Order within the step.** Slides and re-seats are placed one at a time by the placement rule, in canonical order —
//    each vertex's lattice position before the step, y then x — reading the vertices already placed at their placed
//    points and every other moved vertex at its rounded target; a slide or re-seat no lattice point qualifies for fails
//    the step. The order is a function of positions alone, never of slots.
// 4. **Whole-step validation** (validate.ts), then the placement bound of every slide and re-seat on its route as placed
//    and of every held finer vertex on its run, then the edit layer's `recordCheck`. On failure the strength is halved
//    globally (`warp.halvings`), at most 8 times, after which the step is a reported no-op.
// 5. **Commit.** The points are written, the movers journalled for the commit record's `moved` (C-0197), the split flags
//    cleared — (b) on every moved vertex but a slide or re-seat, (b′) on every flagged unmoved vertex of the level of a
//    run it split whose nearest vertex of that level or coarser along the run moved — and every index item the move
//    changed re-indexed (§3.3: no item changes in place).
//
// A move batch keeps nothing (J-K27): no kept-content test applies. The lattice's distances are `LATTICE`'s, the
// placement rule's nearest point and hot pixel are placement.ts's (C-0321), imported by path. M0-a-13. Readings: C-0193.
import {
  compareVertices,
  dest,
  faceWalk,
  isVertexLive,
  outgoing,
  rowsOn,
  VERTEX_SPLIT,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import { HOT_PIXEL_CM, homeOf, indexAdd, indexChange, indexDelete, ITEM_EDGE, ITEM_FACE, ITEM_VERTEX, query, routeHandlePair, type ItemRef } from '../index/index.js';
import { addWarning, INSERT_PLACEMENT_CANDIDATES } from '../insert/index.js';
import { HOT_PIXEL_SQ, nearestLatticePoint } from '../insert/placement.js';
import { err, LATTICE, ok, orient2d, ratio, snap, type KernelResult, type Warning } from '../num/index.js';
import { chargeTx, doomed, noteRow, openTx, type OpenTx } from '../tx/state.js';
import type { Overlay } from '../tx/types.js';
import type { Cm, LatticePoint, Level, Point } from '../types/index.js';
import { candidates, check, computeHeld, routeOf, type RouteOf } from './held.js';
import { MAX_HALVINGS, WARP_HALVINGS, type DisplacementField, type HeldSet, type Move, type MoveKind, type MoveReport, type WarpOptions } from './types.js';
import { heldRunProblem, placementBoundProblem, stepProblem, vertexProblem } from './validate.js';
import { padBox, StepView } from './view.js';

const ATTRACT = LATTICE.attractCm;
const ATTRACT_SQ = ATTRACT * ATTRACT;

/** One candidate's plan: how it moves and its field displacement at full strength. */
interface Plan {
  readonly v: VertexId;
  /** The vertex's lattice point before the step. */
  readonly x0: number;
  readonly y0: number;
  readonly kind: MoveKind;
  readonly dx: number;
  readonly dy: number;
  readonly route: RouteOf | null;
}

/** The lattice point nearest (x, y): one of the four around it, ties y then x (the placement rule's "nearest"). */
export const nearestLattice = nearestLatticePoint;

/** A step's outcome at one strength. */
type Attempt =
  | { readonly ok: true; readonly view: StepView; readonly movers: VertexId[]; readonly warnings: Warning[] }
  | { readonly ok: false; readonly reason: string; readonly work?: boolean };

/**
 * The placement rule for a slide or a re-seat (§3.6, J-K17): the lattice point nearest `P` among the points that lie
 * within 0.71 cm of the route A–B, strictly between its ends, within `attractCm` of `P`, and keep the vertex's own
 * checks (minEdge to its neighbours, one vertex per lattice point, clearance, no crossing — validate.ts's
 * `vertexProblem`) at the view's other points; ties y then x. The candidates come in the placement rule's order — the
 * nearest of the four lattice points around `P` first, then the lattice points of the route's hot-pixel band within
 * `attractCm` of `P`, nearest first, ties y then x — and each is charged to `insert.placementCandidates` before it is
 * tested, (i) included. placement.ts's `placementCandidates` filters (i) out of the band before its caller charges, and
 * the band's rounded edges can hold a point (i) refuses, so the warp keeps this loop and its work counts (C-0334).
 * Null when none qualifies; 'work' when the batch's limit is reached.
 */
function placeOnRoute(t: OpenTx, view: StepView, v: VertexId, ax: number, ay: number, bx: number, by: number, px: number, py: number): { x: number; y: number; nearest: boolean } | null | 'work' {
  const ux = bx - ax;
  const uy = by - ay;
  const len2 = ux * ux + uy * uy;
  if (len2 === 0) return null;
  const len = Math.sqrt(len2);
  const near = nearestLattice(px, py);
  const qualifies = (qx: number, qy: number): boolean => {
    const tq = (qx - ax) * ux + (qy - ay) * uy;
    if (tq <= 0 || tq >= len2) return false;
    const o = orient2d(ax, ay, bx, by, qx, qy);
    if (o * o > HOT_PIXEL_SQ * len2) return false;
    view.set(v, qx, qy);
    return vertexProblem(view, v) === null;
  };
  const tried = new Set<string>();
  const tryOne = (qx: number, qy: number): boolean | 'work' => {
    tried.add(`${qx},${qy}`);
    if (!chargeTx(t, INSERT_PLACEMENT_CANDIDATES, 1)) return 'work';
    return qualifies(qx, qy);
  };
  const first = tryOne(near.x, near.y);
  if (first === 'work') return 'work';
  if (first) return { x: near.x, y: near.y, nearest: true };
  // Outward from P within attractCm: the lattice points of the hot-pixel band around A–B, nearest first (ties y then x).
  const shallow = Math.abs(ux) >= Math.abs(uy);
  const along = shallow ? ux : uy;
  const across = shallow ? uy : ux;
  const slope = ratio(across, along, 'length');
  const half = ratio(HOT_PIXEL_CM * len, Math.abs(along), 'length');
  if (!slope.ok || !half.ok) return null;
  const e0 = shallow ? px : py;
  const a0 = shallow ? ax : ay;
  const b0 = shallow ? ay : ax;
  const cands: { x: number; y: number; d: number }[] = [];
  for (let i = Math.ceil(e0 - ATTRACT); i <= Math.floor(e0 + ATTRACT); i++) {
    const mid = b0 + (i - a0) * slope.value;
    for (let j = Math.ceil(mid - half.value); j <= Math.floor(mid + half.value); j++) {
      const qx = (shallow ? i : j) + 0;
      const qy = (shallow ? j : i) + 0;
      const d = (qx - px) * (qx - px) + (qy - py) * (qy - py);
      if (d > ATTRACT_SQ || tried.has(`${qx},${qy}`)) continue;
      cands.push({ x: qx, y: qy, d });
    }
  }
  cands.sort((a, b) => a.d - b.d || a.y - b.y || a.x - b.x);
  for (const c of cands) {
    const r = tryOne(c.x, c.y);
    if (r === 'work') return 'work';
    if (r) return { x: c.x, y: c.y, nearest: false };
  }
  return null;
}

/** The finite displacement the field gives at a lattice point (a non-finite one is a field's programming error). */
function displacementAt(field: DisplacementField, x: number, y: number): { dx: number; dy: number } {
  const d = field.displacement(x, y);
  check(Number.isFinite(d.x) && Number.isFinite(d.y), `the field's displacement at (${x}, ${y}) is not finite`);
  return { dx: d.x + 0, dy: d.y + 0 };
}

/** The step at strength `s` on its view: targets, placement in canonical order, validation. Writes nothing. */
function attempt(t: OpenTx, plans: readonly Plan[], byLevel: readonly Plan[], byPosition: readonly Plan[], held: ReadonlySet<VertexId>, heldRoutes: readonly { readonly v: VertexId; readonly route: RouteOf }[], s: number,
  recordCheck: ((step: MoveReport) => boolean) | undefined, report: (view: StepView, movers: VertexId[], warnings: Warning[]) => MoveReport): Attempt {
  const p = t.plat;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const view = new StepView(p, t.key);
  const exact = new Map<VertexId, { x: number; y: number }>();
  const active = new Set<VertexId>();
  // The rounded targets, coarsest level first (a re-seat reads its route's ends at theirs).
  for (const pl of byLevel) {
    const v = pl.v;
    const x0 = X[v];
    const y0 = Y[v];
    if (pl.kind === 'free') {
      if (pl.dx === 0 && pl.dy === 0) continue;
      const sn = snap(x0 + s * pl.dx, y0 + s * pl.dy);
      if (!sn.ok) return { ok: false, reason: `range: the target of (${x0}, ${y0}) leaves the lattice (${sn.detail})` };
      active.add(v);
      if (sn.value.x !== x0 || sn.value.y !== y0) view.set(v, sn.value.x, sn.value.y);
      continue;
    }
    const r = pl.route as RouteOf;
    const routeMoves = view.moving(r.a) || view.moving(r.b);
    if (pl.dx === 0 && pl.dy === 0 && !routeMoves) continue;
    const P = projected(view, pl, held, s);
    if (P === null) return { ok: false, reason: `degenerate: the route of (${x0}, ${y0}) has no length` };
    active.add(v);
    exact.set(v, P);
    const q = nearestLattice(P.x, P.y);
    if (q.x !== x0 || q.y !== y0) view.set(v, q.x, q.y);
    else view.unset(v);
  }
  // Placement in canonical order: by lattice position before the step (y, then x).
  const warnings: Warning[] = [];
  const placed = new Set<VertexId>();
  for (const pl of byPosition) {
    const v = pl.v;
    if (!active.has(v)) continue;
    if (pl.kind === 'free') {
      placed.add(v);
      continue;
    }
    const r = pl.route as RouteOf;
    // Re-read the projection with the route's ends as they stand now (placed, or at their rounded targets).
    const P = pl.kind === 'reseat' ? projected(view, pl, held, s) : (exact.get(v) as { x: number; y: number });
    if (P === null) return { ok: false, reason: `degenerate: the route of (${X[v]}, ${Y[v]}) has no length` };
    exact.set(v, P);
    const q = placeOnRoute(t, view, v, view.x(r.a), view.y(r.a), view.x(r.b), view.y(r.b), P.x, P.y);
    if (q === 'work') return { ok: false, reason: 'work', work: true };
    if (q === null) return { ok: false, reason: `placement: no lattice point within attractCm of the ${pl.kind === 'slide' ? 'slide' : 're-seat'} of (${X[v]}, ${Y[v]}) qualifies` };
    if (q.x === X[v] && q.y === Y[v]) view.unset(v);
    else view.set(v, q.x, q.y);
    if (!q.nearest) addWarning(warnings, 'W_PLACED', { x: q.x as Cm, y: q.y as Cm });
    placed.add(v);
  }
  const movers = view.movers().filter((v) => view.x(v) !== X[v] || view.y(v) !== Y[v]);
  movers.sort((a, b) => compareVertices(p, a, b));
  const problem = stepProblem(view, movers, held);
  if (problem !== null) return { ok: false, reason: problem };
  // §3.10's placement bound: every slid and re-seated vertex within the hot pixel of its route as the step leaves it.
  const bound = placementBoundProblem(view, plans.filter((pl) => pl.kind !== 'free' && view.moving(pl.v)).map((pl) => ({ v: pl.v, route: pl.route as RouteOf })));
  if (bound !== null) return { ok: false, reason: bound };
  // A held finer vertex stays within the hot pixel of its run as the step leaves it (§3.6 held (5) keeps the run's ends,
  // so this holds whenever the closure is complete; checked, not assumed — C-0197).
  const heldBound = heldRunProblem(view, heldRoutes);
  if (heldBound !== null) return { ok: false, reason: heldBound };
  if (recordCheck !== undefined && !recordCheck(report(view, movers, warnings))) return { ok: false, reason: 'recordCheck: the edit layer\'s record check failed' };
  return { ok: true, view, movers, warnings };
}

/**
 * The exact point a slide or re-seat aims at, on its route as the view holds it: a slide's displacement projected on the
 * fixed route's direction and kept `attractCm` from the route's ends and from every held vertex on it; a re-seat's own
 * target projected on its (moved) route, within the route. Null for a route of no length.
 */
function projected(view: StepView, pl: Plan, held: ReadonlySet<VertexId>, s: number): { x: number; y: number } | null {
  const p = view.p;
  const r = pl.route as RouteOf;
  const ax = view.x(r.a);
  const ay = view.y(r.a);
  const ux = view.x(r.b) - ax;
  const uy = view.y(r.b) - ay;
  const len2 = ux * ux + uy * uy;
  if (len2 === 0) return null;
  const vx = p.vertices.x[pl.v];
  const vy = p.vertices.y[pl.v];
  if (pl.kind === 'reseat') {
    const q = ratio((vx + s * pl.dx - ax) * ux + (vy + s * pl.dy - ay) * uy, len2, 'area');
    if (!q.ok) return null;
    const tt = Math.max(0, Math.min(1, q.value));
    return { x: ax + tt * ux, y: ay + tt * uy };
  }
  // A slide: along the fixed route, between its nearest held vertices (or ends), attractCm clear of them.
  const len = Math.sqrt(len2);
  const t0 = (vx - ax) * ux + (vy - ay) * uy;
  let lo = 0;
  let hi = len2;
  const O = p.halfEdges.origin;
  for (let i = 1; i < r.run.length; i++) {
    const w = O[r.run[i]];
    if (w === pl.v || !held.has(w)) continue;
    const tw = (p.vertices.x[w] - ax) * ux + (p.vertices.y[w] - ay) * uy;
    if (tw < t0) lo = Math.max(lo, tw);
    else hi = Math.min(hi, tw);
  }
  lo += ATTRACT * len;
  hi -= ATTRACT * len;
  let tt = t0 + s * (pl.dx * ux + pl.dy * uy);
  if (lo <= hi) tt = Math.max(lo, Math.min(hi, tt));
  else tt = t0;
  const f = ratio(tt, len2, 'area');
  if (!f.ok) return null;
  return { x: ax + f.value * ux, y: ay + f.value * uy };
}

/** Do the two edges at a vertex carry identical rows of their level (one run continuing through it)? */
function sameRun(p: Plat, g: HalfEdgeId, h: HalfEdgeId): boolean {
  const T = p.halfEdges;
  if (T.level[g >> 1] !== T.level[h >> 1]) return false;
  const m = T.level[g >> 1];
  const R = p.roles;
  const text = (e: HalfEdgeId): string => rowsOn(p, 'edge', e).filter((r) => R.level[r] === m).map((r) => `${R.kind[r]}/${R.entity[r]}/${R.ordinal[r]}`).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).join(';');
  return text(g) === text(h);
}

/**
 * §3.6's (b′): the flagged unmoved vertices of the level of a run they split whose nearest vertex of that level or coarser
 * along the run moved — found by walking from each mover along each edge of its level or finer, through the run's finer
 * vertices, to the next vertex of the edge's level or coarser.
 */
function unflaggedBy(p: Plat, movers: ReadonlySet<VertexId>): VertexId[] {
  const T = p.halfEdges;
  const lv = p.vertices.level;
  const F = p.vertices.flags;
  const out = new Set<VertexId>();
  for (const v of movers) {
    for (const h of outgoing(p, v)) {
      const m = T.level[h >> 1];
      if (lv[v] > m) continue; // v lies inside this run: not a vertex of the run's level
      let g = h;
      let guard = 0;
      for (;;) {
        const u = dest(p, g);
        if (lv[u] <= m) {
          if (!movers.has(u) && lv[u] === m && (F[u] & VERTEX_SPLIT) !== 0) {
            // u splits a run of its level that continues through it along g's edge.
            const back = g ^ 1;
            const splits = outgoing(p, u).some((e) => e !== back && sameRun(p, e, back));
            if (splits) out.add(u);
          }
          break;
        }
        // u is finer than the run: continue along its other edge of the run's level.
        const next = outgoing(p, u).find((e) => e !== (g ^ 1) && T.level[e >> 1] === m);
        if (next === undefined) break;
        g = next;
        check(++guard <= T.origin.length, 'a run walk does not end');
      }
    }
  }
  return [...out].sort((a, b) => compareVertices(p, a, b));
}

/**
 * §3.4's `warp` on the open overlay `o` (semantics §3.6; see the module comment). `fromLevel` is the batch's level
 * (§3.3: a warp batch's level is its fromLevel); `region` a ring of lattice points (fewer than three: no vertex);
 * `recordCheck` the edit layer's check of the records on the moved ground (§7.4; M2a's), run after the kernel's checks;
 * `opts` the injected held entities and the smoothing flag (C-0193 (1)). Returns the step's MoveReport — a no-op after
 * 8 halvings is reported, not refused; refuses only E_WORK_LIMIT.
 */
export function warp(o: Overlay, field: DisplacementField, fromLevel: Level, region: readonly Point[], recordCheck?: (step: MoveReport) => boolean, opts: WarpOptions = {}): KernelResult<MoveReport> {
  const t = openTx(o);
  const dead = doomed<MoveReport>(t);
  if (dead !== null) return dead;
  check(fromLevel === t.level, `a warp's fromLevel is its batch's level (§3.3): L${fromLevel} in an L${t.level} batch`);
  const p = t.plat;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const lv = p.vertices.level;
  const { inRegion, all } = candidates(p, t.key, fromLevel, region);
  const H = computeHeld(p, t.key, fromLevel, all, opts);
  const plans: Plan[] = [];
  for (const v of all) {
    if (H.set.has(v)) continue;
    const d = inRegion.has(v) ? displacementAt(field, X[v], Y[v]) : { dx: 0, dy: 0 };
    const route = routeOf(p, v);
    let kind: MoveKind = 'free';
    if (route !== null) kind = route.m < fromLevel || (H.set.has(route.a) && H.set.has(route.b)) ? 'slide' : 'reseat';
    plans.push({ v, x0: X[v], y0: Y[v], kind, dx: d.dx, dy: d.dy, route });
  }
  const heldRoutes: { v: VertexId; route: RouteOf }[] = [];
  for (const v of H.vertices) {
    if (!isVertexLive(p, v)) continue;
    const route = routeOf(p, v);
    if (route !== null) heldRoutes.push({ v, route });
  }
  const byPosition = plans.slice(); // `all` is by lattice position already
  const byLevel = plans.slice().sort((a, b) => lv[a.v] - lv[b.v] || compareVertices(p, a.v, b.v));
  const kindOf = new Map<VertexId, MoveKind>(plans.map((pl) => [pl.v, pl.kind]));
  const fromOf = new Map<VertexId, Plan>(plans.map((pl) => [pl.v, pl]));
  const report = (view: StepView, movers: VertexId[], warnings: Warning[], halvings = 0, strength = 1, applied = true, unflagged: VertexId[] = [], flagCleared: VertexId[] = [], lastFailure = ''): MoveReport => ({
    applied,
    halvings,
    strength,
    moves: movers.map((v): Move => {
      const pl = fromOf.get(v) as Plan;
      return { vertex: v, kind: pl.kind, from: { x: pl.x0 as Cm, y: pl.y0 as Cm }, to: { x: view.x(v) as Cm, y: view.y(v) as Cm } };
    }),
    held: H.vertices,
    heldEntities: H.entities,
    unflagged,
    flagCleared,
    lastFailure,
    warnings,
  });
  let lastFailure = '';
  let s = 1;
  for (let k = 0; k <= MAX_HALVINGS; k++) {
    if (k > 0) {
      if (!chargeTx(t, WARP_HALVINGS, 1)) return err('E_WORK_LIMIT', WARP_HALVINGS);
      s *= 0.5; // the global halving: exact in binary
    }
    const a = attempt(t, plans, byLevel, byPosition, H.set, heldRoutes, s, recordCheck, (view, movers, ws) => report(view, movers, ws, k, s));
    if (a.ok) {
      const done = commitStep(t, a.view, a.movers, fromLevel, kindOf);
      for (const w of a.warnings) for (let i = 0; i < w.count; i++) addWarning(t.warnings, w.code, w.at);
      return ok(report(a.view, a.movers, a.warnings, k, s, true, done.unflagged, done.flagCleared, lastFailure), a.warnings);
    }
    if (a.work === true) return err('E_WORK_LIMIT', INSERT_PLACEMENT_CANDIDATES);
    lastFailure = a.reason;
  }
  const none = new StepView(p, t.key);
  return ok(report(none, [], [], MAX_HALVINGS, 0, false, [], [], lastFailure));
}

/** The heldSet service (§3.6; the dry run lists it): the held set of a warp at the batch's level over the region. */
export function heldSet(o: Overlay, region: readonly Point[], opts: WarpOptions = {}): HeldSet {
  const t = openTx(o);
  const { all } = candidates(t.plat, t.key, t.level, region);
  const H = computeHeld(t.plat, t.key, t.level, all, opts);
  return { vertices: H.vertices, entities: H.entities };
}

/** Writes a validated step: points, split flags, the journals and the index (§3.3: no item changes in place). */
function commitStep(t: OpenTx, view: StepView, movers: readonly VertexId[], fromLevel: Level, kindOf: ReadonlyMap<VertexId, MoveKind>): { unflagged: VertexId[]; flagCleared: VertexId[] } {
  const p = t.plat;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const T = p.halfEdges;
  const lv = p.vertices.level;
  const O = T.origin;
  const moverSet = new Set<VertexId>(movers);
  // The index items the move changes, read on the fresh index before any write.
  const runs = new Map<number, HalfEdgeId>();
  const faces = new Map<string, ItemRef>();
  for (const v of movers) {
    for (const h of outgoing(p, v)) {
      const m = T.level[h >> 1] as Level;
      if (m < fromLevel) continue; // a slide on a fixed coarser route: its run's box still holds it
      const handle = routeHandlePair(p, h);
      if (!runs.has(handle)) runs.set(handle, h);
    }
    const box = padBox(X[v], Y[v], X[v], Y[v], 4);
    for (let l = fromLevel; l <= 4; l++) {
      const L = l as Level;
      for (const f of query(p, t.key, L, box, { faces: true }).faces) {
        const k = `${L}:${f}`;
        if (faces.has(k)) continue;
        if (!faceWalk(p, L, f).some((ring) => ring.some((e) => O[e] === v))) continue;
        faces.set(k, { kind: ITEM_FACE, level: L, slot: f });
      }
    }
  }
  const unflagged = unflaggedBy(p, moverSet);
  // The points and the flags.
  const flagCleared: VertexId[] = [];
  for (const v of movers) {
    X[v] = view.x(v);
    Y[v] = view.y(v);
    if (kindOf.get(v) === 'free' && (p.vertices.flags[v] & VERTEX_SPLIT) !== 0) {
      p.vertices.flags[v] &= ~VERTEX_SPLIT;
      flagCleared.push(v);
    }
  }
  for (const u of unflagged) p.vertices.flags[u] &= ~VERTEX_SPLIT;
  // The journals: the moved vertices and edges (the commit's clearance and level rows read them), the role keys whose
  // chains moved, the (b′) vertices.
  const R = p.roles;
  // §3.3's `moved` (§3.6: "the commit record lists every moved vertex"): every mover, slides and re-seats included; the
  // record orders them by lattice position (C-0197).
  t.log.moved.push(...movers);
  for (const v of movers) {
    t.log.vertices.push(v);
    for (const r of rowsOn(p, 'vertex', v)) noteRow(t, R.kind[r], R.entity[r], R.ordinal[r]);
    for (const h of outgoing(p, v)) {
      t.log.pairs.push(h >> 1);
      for (const r of rowsOn(p, 'edge', h)) noteRow(t, R.kind[r], R.entity[r], R.ordinal[r]);
    }
  }
  t.log.unflagged.push(...unflagged);
  // The index: every moved vertex, every run and face record the move changed, re-indexed (§3.3).
  for (const v of movers) {
    const item: ItemRef = { kind: ITEM_VERTEX, level: lv[v] as Level, slot: v };
    const homeBefore = homeOf(p, item);
    indexChange(p, item);
    t.journal.changed.push({ item, homeBefore, successor: item });
  }
  for (const [old, h] of runs) {
    const item: ItemRef = { kind: ITEM_EDGE, level: T.level[old] as Level, slot: old };
    const homeBefore = homeOf(p, item);
    const now = routeHandlePair(p, h);
    if (now === old) {
      indexChange(p, item);
      t.journal.changed.push({ item, homeBefore, successor: item });
    } else {
      // The run's lower end changed: its handle — the item's key — is the pair leaving the new lower end.
      indexDelete(p, item);
      const successor: ItemRef = { kind: ITEM_EDGE, level: item.level, slot: now };
      indexAdd(p, successor);
      t.journal.changed.push({ item, homeBefore, successor });
    }
  }
  for (const item of faces.values()) {
    const homeBefore = homeOf(p, item);
    indexChange(p, item);
    t.journal.changed.push({ item, homeBefore, successor: item });
  }
  return { unflagged, flagCleared };
}
