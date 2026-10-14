// splitFace and connectHole (§3.4; §3.6 *`splitFace` contact semantics* (1) – (5)). M0-a-07. Readings: C-0192.
//
// * splitFace(tx, face, cut, rows?) judges the cut (common.ts's contact decision: exact orient2d on lattice points),
//   inserts it through `insertChain` — the one door for new edges — and returns the two children, the face left of the
//   directed cut first (§3.6 (5)). A cut from the outer ring to a hole does not split the face: it is connectHole's
//   (§3.6 (4)), so splitFace refuses it E_HOLE_CONTACT, as it refuses a cut joining two holes.
// * connectHole(tx, face, cut, rows?) is the same cut from the outer ring to a hole: the post-condition is the same face
//   count and one hole fewer (the slit of §4.6); a cut that cannot give it is E_HOLE_CONTACT.
// The cut's edges take `rows` (§3.4's signature names none; an edge with no row is deleted by rule 3): by default the
// face's owner's `plot_line` (C-0192). Where the face is a record, the child that keeps it is the one whose canonical key
// is the smaller, so `mergeFaces ∘ splitFace` restores the ring and the id (§13.1): the removal's re-walk keeps the
// record with the smallest key (C-0185 (3)).
// A judged cut comes back from the insertion unbent — every consecutive pair of its points joined by one edge — or the
// op refuses E_NOT_TWO_CROSSINGS with the insertion undone (its own savepoint, taken once the cut is judged), never a
// throw (C-0214 (2)).
import { faceHoles, isFaceLive, type FaceId, type HalfEdgeId, type Plat, type RoleRow, type VertexId } from '../arena/index.js';
import { insertChain } from '../insert/index.js';
import { err, ok, type KernelResult } from '../num/index.js';
import { recordLeftOf } from '../tx/relevel.js';
import { check, type OpenTx } from '../tx/state.js';
import type { Overlay } from '../tx/types.js';
import type { Level, LatticePoint } from '../types/index.js';
import { comparePoints, cutRows, enter, halfEdgeFromTo, opSave, planCut, regionOf, refuse, rollback, type CutPlan, type Region } from './common.js';

/** Options of the partitioners that insert a cut: the face's level when coarser than the batch's (an own child), the rows. */
export interface CutOpts {
  /** The cut's edge rows (default: the face owner's `plot_line`, C-0192). */
  readonly rows?: readonly RoleRow[];
  /** The level of `face` when it is a coarser record whose region is its own child at the batch's level (§2.2 rule 2). */
  readonly faceLevel?: Level;
}

/**
 * The half-edge of ring 0 the record should store so that the re-walk keeps it on the child with the smaller canonical
 * key (the record goes to the part holding its stored outer half-edge, M0-a-05's re-walk). The ring's lowest-leftmost
 * vertex v0 of the level (faceKey's) stays on one child only, unless the cut lands on it: then the child holding v0's
 * outgoing ring edge has v0's ring successor (or a landing before it) next, the other the cut's first point away from v0,
 * and the smaller of the two wins (y, then x). Positions along the ring are half-edge indices: a vertex landing sits at
 * its index, a split landing halfway along its half-edge, whose slot keeps its origin side when it is the split's
 * sub-edge and its far side otherwise (splitThrough's rule). Null where the ring is not cut, or no half-edge qualifies.
 */
function keeperHalf(p: Plat, r: Region, plan: CutPlan): HalfEdgeId | null {
  const ring = r.rings[0];
  const m = ring.length;
  const O = p.halfEdges.origin;
  const L = p.vertices.level;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const n = r.level;
  const pt = (v: VertexId): LatticePoint => ({ x: X[v], y: Y[v] }) as LatticePoint;
  // Where each landing sits on ring 0 (doubled positions), or null when it is not on ring 0.
  const posOf = (l: CutPlan['from']): number | null => {
    for (let i = 0; i < m; i++) {
      if (l.kind === 'vertex' ? O[ring[i]] === l.vertex : ring[i] >> 1 === l.pair) return l.kind === 'vertex' ? 2 * i : 2 * i + 1;
    }
    return null;
  };
  const pa = posOf(plan.from);
  const pb = posOf(plan.to);
  if (pa === null || pb === null) return null;
  // v0 and its successor of the level, as faceKey reads them.
  const lv: number[] = [];
  for (let i = 0; i < m; i++) if (L[O[ring[i]]] <= n) lv.push(i);
  if (lv.length < 2) return null;
  let best = 0;
  for (let j = 1; j < lv.length; j++) {
    const c = comparePoints(pt(O[ring[lv[j]]]), pt(O[ring[lv[best]]]));
    const cs = comparePoints(pt(O[ring[lv[(j + 1) % lv.length]]]), pt(O[ring[lv[(best + 1) % lv.length]]]));
    if (c < 0 || (c === 0 && cs < 0)) best = j;
  }
  const i0 = lv[best];
  const v0 = O[ring[i0]];
  const p0 = 2 * i0;
  // The arc (doubled positions, forward from s to e) the record should stay on.
  const fwd = (x: number, s: number): number => (x - s + 2 * m) % (2 * m);
  let s0: number;
  let e0: number;
  if (pa !== p0 && pb !== p0) {
    // v0 inside one arc: that arc.
    if (fwd(p0, pa) < fwd(pb, pa)) {
      s0 = pa;
      e0 = pb;
    } else {
      s0 = pb;
      e0 = pa;
    }
  } else {
    const other = pa === p0 ? pb : pa;
    // The child holding v0's outgoing ring edge: the arc from v0 forward to the other landing; its successor of v0 is the
    // next vertex of the level on the ring, or the other landing when it comes first.
    let succ = pt(O[ring[lv[(best + 1) % lv.length]]]);
    const nextLevel = 2 * lv[(best + 1) % lv.length];
    if (fwd(other, p0) < fwd(nextLevel, p0)) {
      const l = other === pa ? plan.from : plan.to;
      succ = l.at;
    }
    const pts = plan.points;
    const away = plan.from.kind === 'vertex' && plan.from.vertex === v0 ? pts[1] : pts[pts.length - 2];
    if (comparePoints(away, succ) < 0) {
      s0 = other;
      e0 = p0;
    } else {
      s0 = p0;
      e0 = other;
    }
  }
  const len = fwd(e0, s0);
  for (let i = 0; i < m; i++) {
    const h = ring[i];
    let lo = 2 * i;
    let hi = 2 * i + 2;
    for (const l of [plan.from, plan.to]) {
      if (l.kind !== 'split' || l.pair !== h >> 1) continue;
      if (h === l.sub) hi = 2 * i + 1;
      else lo = 2 * i + 1;
    }
    const a = fwd(lo, s0);
    const b = a + (hi - lo);
    if (a >= 0 && b <= len) return h;
  }
  return null;
}

/**
 * The cut inserted (the door) and its first half-edge along the directed cut; the record's stored half-edge put back on a
 * refusal. The cut must come back unbent: each judged point where it was judged and each consecutive pair joined by
 * one edge. Where it does not — an attraction the contact decision did not foresee — the op refuses
 * E_NOT_TWO_CROSSINGS (§3.6 (2): "never lets attraction bend a cut into a pinch") rather than throw; with `atomic` the
 * insertion is undone here (an op savepoint taken after the judgement, so a cut refused by the judgement costs none),
 * else the caller's own savepoint undoes it (radialSplit, ringBand). C-0214.
 */
function insertCut(t: OpenTx, r: Region, plan: CutPlan, rows: readonly RoleRow[], keeper: HalfEdgeId | null, atomic: boolean): KernelResult<HalfEdgeId> {
  const p = t.plat;
  const F = p.faces[r.level];
  const stored = r.record >= 0 ? F.outer[r.record] : -1;
  const save = atomic ? opSave(t) : null;
  if (r.record >= 0 && keeper !== null) F.outer[r.record] = keeper;
  const ins = insertChain(t, plan.points, rows, 'mandatory');
  if (!ins.ok) {
    if (r.record >= 0) F.outer[r.record] = stored;
    return refuse(ins.code, ins.detail);
  }
  const placed = ins.value.placed;
  check(placed.length === plan.points.length, 'insertChain places every judged point');
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const k = placed.length;
  // Where it was judged: an interior point at its own lattice point (not drawn onto another vertex), a vertex landing
  // on its vertex (a split landing is placed on its edge by the placement rule), each segment one edge.
  const at = (i: number): boolean => {
    const l = i === 0 ? plan.from : i === k - 1 ? plan.to : null;
    if (l !== null) return l.kind !== 'vertex' || placed[i] === l.vertex;
    return X[placed[i]] === plan.points[i].x && Y[placed[i]] === plan.points[i].y;
  };
  for (let i = 0; i + 1 < k; i++) {
    if (at(i) && at(i + 1) && halfEdgeFromTo(p, placed[i], placed[i + 1]) >= 0) continue;
    const a = plan.points[i];
    const b = plan.points[i + 1];
    const bent = err<HalfEdgeId>('E_NOT_TWO_CROSSINGS', `the insertion bent the judged cut between (${a.x}, ${a.y}) and (${b.x}, ${b.y}): never into a pinch (§3.6 (2); C-0214)`);
    return save === null ? bent : rollback<HalfEdgeId>(t, save, bent);
  }
  return ok(halfEdgeFromTo(p, placed[0], placed[1]), ins.warnings);
}

/**
 * §3.4's `splitFace(tx, face, cut)`: the two children, the face left of the directed cut first (§3.6 (5)). Refuses,
 * writing nothing: E_NOT_TWO_CROSSINGS (§3.6 (1) – (3)), E_HOLE_CONTACT (a cut joining the outer ring to a hole, or two
 * holes: connectHole's), and insertChain's own codes (E_KEPT, E_LEVEL, E_OUT_OF_RANGE, E_WORK_LIMIT).
 */
export function splitFace(o: Overlay, face: FaceId, cut: readonly { readonly x: number; readonly y: number }[], opts: CutOpts = {}): KernelResult<[FaceId, FaceId]> {
  const { t, refused } = enter<[FaceId, FaceId]>(o);
  if (refused !== null) return refused;
  return splitCore(t, face, opts.faceLevel ?? t.level, cut, opts.rows, true);
}

/**
 * splitFace on the open transaction (the partitioners that cut several times call it per cut, under their own
 * savepoint; `atomic` undoes a bent insertion here, C-0214).
 */
export function splitCore(t: OpenTx, face: FaceId, faceLevel: Level, cut: readonly { readonly x: number; readonly y: number }[], rowsIn?: readonly RoleRow[], atomic = false): KernelResult<[FaceId, FaceId]> {
  const p = t.plat;
  const r = regionOf(t, face, faceLevel);
  const rows = cutRows(p, r, rowsIn);
  const plan = planCut(t, r, cut);
  if (!plan.ok) return refuse(plan.code, plan.detail);
  if (!plan.value.from.rings.some((i) => plan.value.to.rings.includes(i))) {
    return refuse('E_HOLE_CONTACT', 'the cut joins two rings of the face: a slit, connectHole\'s (§3.6 (4))');
  }
  const keeper = r.record >= 0 ? keeperHalf(p, r, plan.value) : null;
  const h = insertCut(t, r, plan.value, rows, keeper, atomic);
  if (!h.ok) return refuse(h.code, h.detail);
  const left = recordLeftOf(t, r.level, h.value);
  const right = recordLeftOf(t, r.level, h.value ^ 1);
  check(left >= 0 && right >= 0 && left !== right, 'a judged cut splits its face in two');
  return ok([left, right], h.warnings);
}

/**
 * §3.4's `connectHole(tx, face, cut)`: a cut from the outer ring to a hole — the same face, one hole fewer (§3.6 (4)).
 * Refuses, writing nothing: E_HOLE_CONTACT (the cut's ends are not one on the outer ring and one on a hole, or the face
 * has no hole), E_NOT_TWO_CROSSINGS (§3.6 (1) – (3)), and insertChain's own codes.
 */
export function connectHole(o: Overlay, face: FaceId, cut: readonly { readonly x: number; readonly y: number }[], opts: CutOpts = {}): KernelResult<FaceId> {
  const { t, refused } = enter<FaceId>(o);
  if (refused !== null) return refused;
  return holeCore(t, face, opts.faceLevel ?? t.level, cut, opts.rows, true);
}

/** connectHole on the open transaction (`atomic` as splitCore's). */
export function holeCore(t: OpenTx, face: FaceId, faceLevel: Level, cut: readonly { readonly x: number; readonly y: number }[], rowsIn?: readonly RoleRow[], atomic = false): KernelResult<FaceId> {
  const p = t.plat;
  const r = regionOf(t, face, faceLevel);
  if (r.rings.length < 2) return refuse('E_HOLE_CONTACT', 'the face has no hole to connect (§3.6 (4))');
  const rows = cutRows(p, r, rowsIn);
  const plan = planCut(t, r, cut);
  if (!plan.ok) return refuse(plan.code, plan.detail);
  const { from, to } = plan.value;
  const outerHole = (a: readonly number[], b: readonly number[]): boolean => a.includes(0) && b.some((i) => i > 0) && !a.some((i) => b.includes(i));
  if (!outerHole(from.rings, to.rings) && !outerHole(to.rings, from.rings)) {
    return refuse('E_HOLE_CONTACT', 'the cut does not join the outer ring to a hole (§3.6 (4))');
  }
  const holesBefore = r.record >= 0 ? faceHoles(p, r.level, r.record).length : r.rings.length - 1;
  const h = insertCut(t, r, plan.value, rows, null, atomic);
  if (!h.ok) return refuse(h.code, h.detail);
  const left = recordLeftOf(t, r.level, h.value);
  check(left >= 0 && left === recordLeftOf(t, r.level, h.value ^ 1), 'a slit leaves one face on both sides of the cut');
  check(isFaceLive(p, r.level, left) && faceHoles(p, r.level, left).length === holesBefore - 1, 'a slit leaves the face one hole fewer');
  return ok(left, h.warnings);
}
