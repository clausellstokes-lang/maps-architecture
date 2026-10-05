// What every face partitioner shares (§3.4's face partitioners; §3.6 *`splitFace` contact semantics*): the open
// transaction, a face's region at the batch's level and its boundary, the contact decision for a cut — exact `orient2d`
// on lattice points, never a parameter-space epsilon — and the children a committed cut leaves. M0-a-07. Readings: C-0192.
//
// The contact decision (§3.6 (1) – (3)) is made before anything is written, so a refused cut writes nothing:
// * each end lands as `insertChain`'s step 2 lands it (`planAttraction`, read-only): a boundary vertex within
//   `attractCm`, the endpoint of a boundary edge whose foot lies within `attractCm` of it, else a split of that edge at
//   its placement point — any other landing (a free point, a vertex or an edge of another face) is E_NOT_TWO_CROSSINGS;
// * the two ends land on two distinct vertices or points (a cut of one point, or one whose ends land on one vertex, is
//   E_NOT_TWO_CROSSINGS);
// * the cut's polyline — its landing points and its interior points — touches the boundary only where it arrives: no
//   boundary vertex within `attractCm` of a segment (the vertex rule of step 3, read exactly as the router reads it), no
//   interior point within `attractCm` of the boundary or outside the face, no segment touching or crossing a boundary
//   edge (an antenna is boundary: a cut may end on it but never cross it), no segment leaving its landing along a
//   boundary edge there (closer than `minFaceAngle`, the near-parallel test insertion shares stretches by), the cut
//   itself simple with no vertex of it within `attractCm` of another of its segments;
// * every segment's midpoint lies strictly inside the face (exact, on doubled coordinates).
// A cut that passes is inserted by `insertChain` (the door) at points that land exactly where they were judged, so the
// insertion neither bends nor shares it: §3.6 (2)'s "never lets attraction bend a cut into a pinch".
import {
  compareVertices,
  dest,
  faceHoles,
  faceKey,
  faceWalk,
  idOf,
  isFaceLive,
  outgoing,
  walkRing,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type RoleRow,
  type VertexId,
} from '../arena/index.js';
import { obb } from '../geom/index.js';
import { faceRouteRings } from '../index/index.js';
import { planAttraction } from '../insert/attractVertex.js';
import { chainJournal, TX_FACES_WALKED } from '../insert/index.js';
import { nearerVertex, nearParallel, passesWithin, splitBreaksClearance, withinSegment } from '../insert/stretch.js';
import { area2, err, LATTICE, ok, orient2d, snap, type KernelError, type KernelResult, type Warning } from '../num/index.js';
import { restoreSavepoint, takeSavepoint } from '../tx/savepoint.js';
import { chargeTx, check, doomed, openTx, type OpenTx } from '../tx/state.js';
import type { Overlay } from '../tx/types.js';
import type { Cm, Id, LatticePoint, Level, RoleKey } from '../types/index.js';

export const ATTRACT = LATTICE.attractCm;
export const MIN_EDGE_SQ = LATTICE.minEdgeCm * LATTICE.minEdgeCm;

/** The open transaction, or the refusal of a doomed one (E_WORK_LIMIT reached by an earlier op). */
export function enter<T>(o: Overlay): { t: OpenTx; refused: KernelResult<T> | null } {
  const t = openTx(o);
  if (t.failed === null && t.work.total > t.workLimit) t.failed = { code: 'E_WORK_LIMIT', detail: 'the batch exceeded its work limit' };
  return { t, refused: doomed<T>(t) };
}

/** E_WORK_LIMIT, the batch doomed (the writer refuses before it writes). */
export function overLimit<T>(t: OpenTx): KernelResult<T> {
  if (t.failed === null) t.failed = { code: 'E_WORK_LIMIT', detail: TX_FACES_WALKED };
  return doomed<T>(t) as KernelResult<T>;
}

/** A refusal with its code (the partitioners' typed results, §3.1). */
export function refuse<T>(code: KernelError, detail: string): KernelResult<T> {
  return err<T>(code, detail);
}

/** A lattice point. */
export function lp(x: number, y: number): LatticePoint {
  return { x: x as Cm, y: y as Cm };
}

// ---- a face's region and its boundary ----------------------------------------------------------------------------------

/**
 * A face's region at the batch's level n: the record `face` of level `faceLevel` (≤ n) — the batch's own level, or a
 * coarser record whose region is its own child at n (§2.2 rule 2: no level-n record there yet) — and its rings walked at
 * n, the outer ring first. `record` is the level-n record, or −1 for an own-child region.
 */
export interface Region {
  readonly level: Level;
  readonly faceLevel: Level;
  readonly face: FaceId;
  readonly record: FaceId;
  readonly rings: HalfEdgeId[][];
  /** Physical half-edge → its ring's index. */
  readonly ringOf: Map<HalfEdgeId, number>;
  /** Vertex → the indices of the rings it lies on. */
  readonly vertexRings: Map<VertexId, number[]>;
  /** The boundary's edge pairs, each once, by its even half-edge. */
  readonly pairs: number[];
}

/** The region of `face` (a record of `faceLevel`, ≤ the batch's level) at the batch's level; charged one walk per ring. */
export function regionOf(t: OpenTx, face: FaceId, faceLevel: Level = t.level): Region {
  const p = t.plat;
  const n = t.level;
  check(faceLevel <= n, `a face of L${faceLevel} is finer than the batch's L${n}: name a face of the batch's level or coarser`);
  check(isFaceLive(p, faceLevel, face), `face ${face} is not live at L${faceLevel}`);
  const F = p.faces[faceLevel];
  const stored = [F.outer[face], ...faceHoles(p, faceLevel, face)];
  const rings = faceLevel === n ? faceWalk(p, n, face) : stored.map((h) => walkRing(p, n, h));
  chargeTx(t, TX_FACES_WALKED, rings.length);
  const ringOf = new Map<HalfEdgeId, number>();
  const vertexRings = new Map<VertexId, number[]>();
  const pairSet = new Set<number>();
  const O = p.halfEdges.origin;
  rings.forEach((ring, i) => {
    for (const h of ring) {
      ringOf.set(h, i);
      const list = vertexRings.get(O[h]) ?? [];
      if (!list.includes(i)) list.push(i);
      vertexRings.set(O[h], list);
      pairSet.add(h >> 1);
    }
  });
  const pairs = [...pairSet].sort((a, b) => comparePairs(p, a, b));
  return { level: n, faceLevel, face, record: faceLevel === n ? face : -1, rings, ringOf, vertexRings, pairs };
}

/** Is the doubled point strictly inside the ring of half-edges (crossing number on doubled coordinates, exact)? */
export function insideRing(p: Plat, ring: readonly HalfEdgeId[], qx2: number, qy2: number): boolean {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  let inside = false;
  for (const h of ring) {
    const a = O[h];
    const b = O[h ^ 1];
    const ay = 2 * Y[a];
    const by = 2 * Y[b];
    if ((ay > qy2) !== (by > qy2)) {
      const o = orient2d(2 * X[a], ay, 2 * X[b], by, qx2, qy2);
      if (by > ay ? o > 0 : o < 0) inside = !inside;
    }
  }
  return inside;
}

/** Is the doubled point strictly inside the region: inside its outer ring and inside none of its holes? */
export function insideRegion(p: Plat, r: Region, qx2: number, qy2: number): boolean {
  if (!insideRing(p, r.rings[0], qx2, qy2)) return false;
  for (let i = 1; i < r.rings.length; i++) if (insideRing(p, r.rings[i], qx2, qy2)) return false;
  return true;
}

// ---- exact segment predicates ------------------------------------------------------------------------------------------

function sign(v: number): number {
  return v > 0 ? 1 : v < 0 ? -1 : 0;
}

/** Does c lie on the closed segment a–b (exact; c collinear and inside its box)? */
function onSegment(ax: number, ay: number, bx: number, by: number, cx: number, cy: number): boolean {
  return orient2d(ax, ay, bx, by, cx, cy) === 0 && Math.min(ax, bx) <= cx && cx <= Math.max(ax, bx) && Math.min(ay, by) <= cy && cy <= Math.max(ay, by);
}

/** Do the closed segments a–b and c–d share a point (exact orient2d)? */
export function segmentsTouch(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number): boolean {
  const d1 = sign(orient2d(cx, cy, dx, dy, ax, ay));
  const d2 = sign(orient2d(cx, cy, dx, dy, bx, by));
  const d3 = sign(orient2d(ax, ay, bx, by, cx, cy));
  const d4 = sign(orient2d(ax, ay, bx, by, dx, dy));
  if (d1 * d2 < 0 && d3 * d4 < 0) return true;
  return (d1 === 0 && onSegment(cx, cy, dx, dy, ax, ay)) || (d2 === 0 && onSegment(cx, cy, dx, dy, bx, by))
    || (d3 === 0 && onSegment(ax, ay, bx, by, cx, cy)) || (d4 === 0 && onSegment(ax, ay, bx, by, dx, dy));
}

/**
 * Do the closed segments a–b and a–d (sharing their first end a) share any point other than a? Exact: they do only when
 * they are collinear and point the same way (b, d on one ray from a).
 */
function overlapBeyond(ax: number, ay: number, bx: number, by: number, dx: number, dy: number): boolean {
  if (orient2d(ax, ay, bx, by, dx, dy) !== 0) return false;
  return (bx - ax) * (dx - ax) + (by - ay) * (dy - ay) > 0;
}

// ---- the contact decision ---------------------------------------------------------------------------------------------

/** Where a cut end lands (insertChain's step 2, read-only): a boundary vertex, or a split of a boundary edge pair. */
export type Landing =
  | { readonly kind: 'vertex'; readonly at: LatticePoint; readonly vertex: VertexId; readonly rings: readonly number[] }
  | {
    readonly kind: 'split';
    readonly at: LatticePoint;
    readonly pair: number;
    /** The half-edge of the pair that keeps its origin side when split (splitThrough's sub-edge, M0-a-04). */
    readonly sub: HalfEdgeId;
    readonly rings: readonly number[];
  };

/** A judged cut: the points insertChain takes (each consecutive pair ≥ minEdge apart) and its two landings. */
export interface CutPlan {
  readonly points: LatticePoint[];
  readonly from: Landing;
  readonly to: Landing;
}

const NOT_TWO = 'E_NOT_TWO_CROSSINGS' as const;

/** Lands one cut end (see the module comment); E_NOT_TWO_CROSSINGS where it lands anywhere but this region's boundary. */
export function landEnd(t: OpenTx, r: Region, q: LatticePoint): KernelResult<Landing> {
  const p = t.plat;
  const plan = planAttraction(t, q);
  if (!plan.ok) return err(plan.code, plan.detail);
  const pl = plan.value;
  if (pl.kind === 'free') return refuse(NOT_TWO, `a cut end at (${q.x}, ${q.y}) lies on no boundary of the face (§3.6 (1))`);
  const O = p.halfEdges.origin;
  const asVertex = (v: VertexId): KernelResult<Landing> => {
    const rings = r.vertexRings.get(v);
    if (rings === undefined) return refuse(NOT_TWO, `a cut end at (${q.x}, ${q.y}) lands on a vertex of another face (§3.6 (1))`);
    return ok({ kind: 'vertex', at: lp(p.vertices.x[v], p.vertices.y[v]), vertex: v, rings });
  };
  if (pl.kind === 'vertex') return asVertex(pl.vertex);
  const sp = pl.split;
  if (sp.kind === 'existing') return asVertex(sp.vertex);
  // insertChain's own fallback where no point of that sub-edge keeps clearance at its ends: its nearer end.
  if (splitBreaksClearance(p, O[sp.sub], O[sp.sub ^ 1])) return asVertex(nearerVertex(p, O[sp.sub], O[sp.sub ^ 1], sp.at.x, sp.at.y));
  const ring = r.ringOf.get(sp.sub) ?? r.ringOf.get(sp.sub ^ 1);
  if (ring === undefined) return refuse(NOT_TWO, `a cut end at (${q.x}, ${q.y}) lands on an edge of another face (§3.6 (1))`);
  const rings = [ring];
  const other = r.ringOf.get(sp.sub ^ 1);
  if (other !== undefined && other !== ring) rings.push(other);
  return ok({ kind: 'split', at: sp.at, pair: sp.sub >> 1, sub: sp.sub, rings });
}

/** The ends of a pair. */
function ends(p: Plat, e: number): [VertexId, VertexId] {
  return [p.halfEdges.origin[2 * e], p.halfEdges.origin[2 * e + 1]];
}

/** Does the landing hold the vertex (a vertex landing on it)? */
function landsOn(l: Landing, v: VertexId): boolean {
  return l.kind === 'vertex' && l.vertex === v;
}

/**
 * Judges a cut on region `r` (see the module comment): snapped, its consecutive duplicates dropped, its ends landed,
 * its interior points thinned below `minEdge` (the later dropped, the last end kept — §3.6 step 1's decimation, made
 * here so the inserted points are the judged ones), every contact rule checked. Nothing written; the landings' queries
 * are charged to insertion's counters as insertChain charges them.
 */
export function planCut(t: OpenTx, r: Region, cutIn: readonly { readonly x: number; readonly y: number }[]): KernelResult<CutPlan> {
  const p = t.plat;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const pts: LatticePoint[] = [];
  for (const c of cutIn) {
    const s = snap(c.x, c.y);
    if (!s.ok) return err(s.code, s.detail);
    const last = pts[pts.length - 1];
    if (last === undefined || last.x !== s.value.x || last.y !== s.value.y) pts.push(s.value);
  }
  if (pts.length < 2) return refuse(NOT_TWO, 'a cut of one point (§3.6 (2), §3.11)');
  const a = landEnd(t, r, pts[0]);
  if (!a.ok) return refuse(a.code, a.detail);
  const b = landEnd(t, r, pts[pts.length - 1]);
  if (!b.ok) return refuse(b.code, b.detail);
  const from = a.value;
  const to = b.value;
  if ((from.kind === 'vertex' && landsOn(to, from.vertex)) || (from.at.x === to.at.x && from.at.y === to.at.y)) {
    return refuse(NOT_TWO, 'the cut\'s two ends land on one vertex (§3.6 (2))');
  }
  // The points insertChain takes: the landings and the interior points, each at least minEdge from the one before.
  const q: LatticePoint[] = [from.at];
  for (let i = 1; i < pts.length - 1; i++) {
    const prev = q[q.length - 1];
    const d2 = (pts[i].x - prev.x) * (pts[i].x - prev.x) + (pts[i].y - prev.y) * (pts[i].y - prev.y);
    if (d2 >= MIN_EDGE_SQ) q.push(pts[i]);
  }
  while (q.length > 1) {
    const last = q[q.length - 1];
    const d2 = (to.at.x - last.x) * (to.at.x - last.x) + (to.at.y - last.y) * (to.at.y - last.y);
    if (d2 >= MIN_EDGE_SQ) break;
    q.pop();
  }
  if (q.length === 1) {
    const d2 = (to.at.x - from.at.x) * (to.at.x - from.at.x) + (to.at.y - from.at.y) * (to.at.y - from.at.y);
    if (d2 < MIN_EDGE_SQ) return refuse(NOT_TWO, 'the cut\'s two ends land within minEdge of each other (§3.6 (2))');
  }
  q.push(to.at);
  if (q.length === 2 && from.kind === 'split' && to.kind === 'split' && from.pair === to.pair) {
    return refuse(NOT_TWO, 'the cut runs along the boundary edge both its ends land on (§3.6 (2))');
  }
  const k = q.length;
  // Interior points: strictly inside the face and farther than attractCm from every boundary edge.
  for (let i = 1; i < k - 1; i++) {
    const c = q[i];
    if (!insideRegion(p, r, 2 * c.x, 2 * c.y)) return refuse(NOT_TWO, `the cut's point (${c.x}, ${c.y}) lies outside the face (§3.6 (2))`);
    for (const e of r.pairs) {
      const [u, w] = ends(p, e);
      if (withinSegment(c.x, c.y, X[u], Y[u], X[w], Y[w], ATTRACT)) {
        return refuse(NOT_TWO, `the cut's point (${c.x}, ${c.y}) lies within attractCm of the boundary (§3.6 (2))`);
      }
    }
  }
  // The boundary's vertices, each once.
  const verts = [...r.vertexRings.keys()].sort((u, w) => compareVertices(p, u, w));
  for (let i = 0; i < k - 1; i++) {
    const s0 = q[i];
    const s1 = q[i + 1];
    const atStart = i === 0 ? from : null;
    const atEnd = i === k - 2 ? to : null;
    // The midpoint strictly inside the face: the segment leaves its landing into the face, not out of it.
    if (!insideRegion(p, r, s0.x + s1.x, s0.y + s1.y)) return refuse(NOT_TWO, 'a cut segment runs outside the face (§3.6 (2))');
    // The vertex rule (§3.6 step 3): no boundary vertex but the segment's own landing within attractCm of it.
    for (const v of verts) {
      if ((atStart !== null && landsOn(atStart, v)) || (atEnd !== null && landsOn(atEnd, v))) continue;
      if (passesWithin(X[v], Y[v], s0.x, s0.y, s1.x, s1.y, ATTRACT)) {
        return refuse(NOT_TWO, `the cut passes through or within attractCm of the boundary vertex (${X[v]}, ${Y[v]}) (§3.6 (2))`);
      }
    }
    // No touch or crossing of a boundary edge but where the segment arrives at its landing, and no leaving a landing
    // along a boundary edge there.
    for (const e of r.pairs) {
      const [u, w] = ends(p, e);
      let arrives = false;
      for (const [l, here, there] of [[atStart, s0, s1], [atEnd, s1, s0]] as const) {
        if (l === null) continue;
        if (l.kind === 'split' ? l.pair !== e : u !== l.vertex && w !== l.vertex) continue;
        arrives = true;
        // From the landing point along the cut, and along the edge's part(s) leaving it: never one way.
        const along = l.kind === 'split' ? [u, w] : [u === l.vertex ? w : u];
        for (const z of along) {
          if (overlapBeyond(here.x, here.y, there.x, there.y, X[z], Y[z]) || sameWayNear(here, there, X[z], Y[z])) {
            return refuse(NOT_TWO, 'the cut runs along the boundary edge it arrives on (§3.6 (2))');
          }
        }
      }
      if (!arrives && segmentsTouch(s0.x, s0.y, s1.x, s1.y, X[u], Y[u], X[w], Y[w])) {
        return refuse(NOT_TWO, `the cut touches or crosses the boundary edge (${X[u]}, ${Y[u]})–(${X[w]}, ${Y[w]}) (§3.6 (2), (3))`);
      }
    }
  }
  // The cut itself: simple, and no vertex of it within attractCm of another of its segments.
  for (let i = 0; i < k - 1; i++) {
    for (let j = 0; j < k; j++) {
      if (j === i || j === i + 1) continue;
      if (passesWithin(q[j].x, q[j].y, q[i].x, q[i].y, q[i + 1].x, q[i + 1].y, ATTRACT)) return refuse(NOT_TWO, 'the cut doubles back within attractCm of itself (§3.6 (2))');
    }
    for (let j = i + 1; j < k - 1; j++) {
      if (j === i + 1) {
        if (overlapBeyond(q[j].x, q[j].y, q[i].x, q[i].y, q[j + 1].x, q[j + 1].y)) return refuse(NOT_TWO, 'the cut folds back on itself (§3.6 (2))');
        continue;
      }
      if (segmentsTouch(q[i].x, q[i].y, q[i + 1].x, q[i + 1].y, q[j].x, q[j].y, q[j + 1].x, q[j + 1].y)) return refuse(NOT_TWO, 'the cut crosses itself (§3.6 (2))');
    }
  }
  return ok({ points: q, from, to });
}

/**
 * Does the segment here → there leave `here` within `minFaceAngle` of the direction toward z (the near-parallel test
 * insertion shares a stretch by, on exact integer cross and dot products; §3.6 step 3)?
 */
function sameWayNear(here: LatticePoint, there: LatticePoint, zx: number, zy: number): boolean {
  const ux = there.x - here.x;
  const uy = there.y - here.y;
  const vx = zx - here.x;
  const vy = zy - here.y;
  if (vx === 0 && vy === 0) return false;
  return ux * vx + uy * vy > 0 && nearParallel(ux, uy, vx, vy);
}

// ---- after the insertion ----------------------------------------------------------------------------------------------

/** The half-edge leaving u toward w, or −1. */
export function halfEdgeFromTo(p: Plat, u: VertexId, w: VertexId): HalfEdgeId {
  for (const h of outgoing(p, u)) if (dest(p, h) === w) return h;
  return -1;
}

/** The face key's two lattice points (§3.3's canonical face key, slot-free). */
export function keyPoints(p: Plat, level: Level, f: FaceId): [LatticePoint, LatticePoint] {
  const [a, b] = faceKey(p, level, f);
  return [lp(p.vertices.x[a], p.vertices.y[a]), lp(p.vertices.x[b], p.vertices.y[b])];
}

/** Two edge pairs by their canonical key: their ends' lattice positions, the smaller end first (slot-free, §3.3). */
export function comparePairs(p: Plat, a: number, b: number): number {
  const O = p.halfEdges.origin;
  const ends = (e: number): [VertexId, VertexId] => {
    const u = O[2 * e];
    const w = O[2 * e + 1];
    return compareVertices(p, u, w) <= 0 ? [u, w] : [w, u];
  };
  const [a0, a1] = ends(a);
  const [b0, b1] = ends(b);
  return compareVertices(p, a0, b0) || compareVertices(p, a1, b1);
}

/** Two lattice points, y then x. */
export function comparePoints(a: LatticePoint, b: LatticePoint): number {
  return a.y !== b.y ? (a.y < b.y ? -1 : 1) : a.x !== b.x ? (a.x < b.x ? -1 : 1) : 0;
}

/** Two faces of one level by canonical key (lattice points only). */
export function compareFaceKeys(p: Plat, level: Level, a: FaceId, b: FaceId): number {
  const ka = keyPoints(p, level, a);
  const kb = keyPoints(p, level, b);
  return comparePoints(ka[0], kb[0]) || comparePoints(ka[1], kb[1]);
}

/** The rows a cut's edges take: the caller's, or — none given — `plot_line` of the face's owner (C-0192). */
export function cutRows(p: Plat, r: Region, rows: readonly RoleRow[] | undefined): RoleRow[] {
  if (rows !== undefined && rows.length > 0) return rows.slice();
  const owner = p.faces[r.faceLevel].owner[r.face];
  check(owner >= 0, 'a cut through a face with no owner names the rows its edges take');
  return [{ role: 'plot_line', entity: idOf(p, owner) }];
}


// ---- an op's own savepoint (the multi-cut partitioners) ---------------------------------------------------------------

/**
 * Where a multi-step partitioner's writes stand: the arena's before-image (M0-a-06's savepoint, taken again here) and
 * the lengths and copies of the transaction's journals, log and warnings. `rollback` puts all of it back, so a step
 * refused after an earlier step wrote leaves the batch as the op found it — the op is atomic like every other writer
 * (C-0185 (1)). Work charged stays charged (the operations were spent).
 */
export interface OpSavepoint {
  readonly image: ReturnType<typeof takeSavepoint>;
  readonly journal: { vertices: number; pairs: number; split: number; changed: number; steiner: number };
  readonly chain: { newPairs: number; sharedPairs: number; promoted: number; materialised: number; faces: number[][]; passes: number };
  readonly log: { faces: number[][]; edgesRemoved: number; steinerDissolved: number; promoted: number; demotedVertices: number; demotedEdges: number; unflagged: number; vertices: number; pairs: number; owners: Id[]; roles: [string, RoleKey][]; removedKeys: [string, readonly [LatticePoint, LatticePoint]][] };
  readonly warnings: Warning[];
  readonly indexWrites: number;
}

/** The op's savepoint (O(arena), charged to no counter, as the batch's own image, C-0185 (1)). */
export function opSave(t: OpenTx): OpSavepoint {
  const J = t.journal;
  const C = chainJournal(t);
  const L = t.log;
  return {
    image: takeSavepoint(t.plat),
    journal: { vertices: J.vertices.length, pairs: J.pairs.length, split: J.split.length, changed: J.changed.length, steiner: J.steiner },
    chain: {
      newPairs: C.newPairs.length, sharedPairs: C.sharedPairs.length, promoted: C.promoted.length, materialised: C.materialised.length,
      faces: C.faces.map((f) => [f.created.length, f.changed.length, f.removed.length]), passes: C.passes,
    },
    log: {
      faces: L.faces.map((f) => [f.created.length, f.changed.length, f.removed.length]),
      edgesRemoved: L.edgesRemoved, steinerDissolved: L.steinerDissolved, promoted: L.promoted.length,
      demotedVertices: L.demotedVertices.length, demotedEdges: L.demotedEdges.length, unflagged: L.unflagged.length,
      vertices: L.vertices.length, pairs: L.pairs.length, owners: [...L.owners], roles: [...L.roles], removedKeys: [...L.removedKeys],
    },
    warnings: t.warnings.map((w) => (w.at === undefined ? { code: w.code, count: w.count } : { code: w.code, count: w.count, at: { x: w.at.x, y: w.at.y } })),
    indexWrites: t.indexLog === null ? 0 : t.indexLog.writes.length,
  };
}

function cut<T>(xs: T[], n: number): void {
  xs.length = n;
}

/** Puts the op's savepoint back (see OpSavepoint); returns the refusal handed in. */
export function rollback<T>(t: OpenTx, s: OpSavepoint, refusal: KernelResult<unknown> & { ok: false }): KernelResult<T> {
  restoreSavepoint(s.image);
  const J = t.journal;
  cut(J.vertices, s.journal.vertices);
  cut(J.pairs, s.journal.pairs);
  cut(J.split, s.journal.split);
  cut(J.changed, s.journal.changed);
  J.steiner = s.journal.steiner;
  const C = chainJournal(t);
  cut(C.newPairs, s.chain.newPairs);
  cut(C.sharedPairs, s.chain.sharedPairs);
  cut(C.promoted, s.chain.promoted);
  cut(C.materialised, s.chain.materialised);
  C.passes = s.chain.passes;
  C.faces.forEach((f, l) => {
    cut(f.created, s.chain.faces[l][0]);
    cut(f.changed, s.chain.faces[l][1]);
    cut(f.removed, s.chain.faces[l][2]);
  });
  const L = t.log;
  L.faces.forEach((f, l) => {
    cut(f.created, s.log.faces[l][0]);
    cut(f.changed, s.log.faces[l][1]);
    cut(f.removed, s.log.faces[l][2]);
  });
  L.edgesRemoved = s.log.edgesRemoved;
  L.steinerDissolved = s.log.steinerDissolved;
  cut(L.promoted, s.log.promoted);
  cut(L.demotedVertices, s.log.demotedVertices);
  cut(L.demotedEdges, s.log.demotedEdges);
  cut(L.unflagged, s.log.unflagged);
  cut(L.vertices, s.log.vertices);
  cut(L.pairs, s.log.pairs);
  L.owners.clear();
  for (const o of s.log.owners) L.owners.add(o);
  L.roles.clear();
  for (const [k, v] of s.log.roles) L.roles.set(k, v);
  L.removedKeys.clear();
  for (const [k, v] of s.log.removedKeys) L.removedKeys.set(k, v);
  t.warnings.length = 0;
  t.warnings.push(...s.warnings);
  if (t.indexLog !== null) cut(t.indexLog.writes, s.indexWrites);
  return err<T>(refusal.code, refusal.detail);
}

// ---- measures ------------------------------------------------------------------------------------------------------------

/** A face's area × 2 (cm²) over its own-level route rings, outer counter-clockwise and holes clockwise: exact. */
export function faceArea2(p: Plat, level: Level, f: FaceId): number {
  let s = 0;
  for (const ring of faceRouteRings(p, level, f, level)) s += area2(ring.map((v) => lp(p.vertices.x[v], p.vertices.y[v])));
  return s;
}

/** A face's width (cm): the transaction's injected measure, else its own-level outer ring's OBB minor extent (C-0185 (11)). */
export function faceWidth(t: OpenTx, level: Level, f: FaceId): number {
  if (t.env.width !== undefined) return t.env.width(t.plat, level, f);
  const ring = faceRouteRings(t.plat, level, f, level)[0];
  const r = obb(ring.map((v) => lp(t.plat.vertices.x[v], t.plat.vertices.y[v])));
  return r.ok ? r.value.minorCm : 0;
}

/** The length of an edge pair (cm; Math.sqrt, exact by specification). */
export function pairLength(p: Plat, e: number): number {
  const O = p.halfEdges.origin;
  const dx = p.vertices.x[O[2 * e + 1]] - p.vertices.x[O[2 * e]];
  const dy = p.vertices.y[O[2 * e + 1]] - p.vertices.y[O[2 * e]];
  return Math.sqrt(dx * dx + dy * dy);
}
