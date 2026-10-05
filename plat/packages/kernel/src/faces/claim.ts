// claimSubFace in its ring form, and pinVertices (§3.4). M0-a-07. Readings: C-0192.
//
// * claimSubFace(tx, { ring }, owner) inserts the ring — closed, through insertChain (the door), its edges taking
//   (`claim`, owner) unless the caller names other rows — and re-owns, by the setOwner door, every face record of the
//   batch's level inside it: the records left of the ring's counter-clockwise edges and every record reached from them
//   without crossing the ring, so a claim may span several faces (a reservation across coarse faces, a precinct, a
//   bailey). It returns the claim's FaceRef `{ owner, level }`. The ring must be simple after snapping
//   (E_SELF_INTERSECT) with a non-zero area (E_DEGENERATE `empty`), and stay one simple cycle once inserted — sides the
//   insertion's attraction draws together (an antenna, a pinch) claim nothing: E_DEGENERATE `collapsed`. A region
//   inside the ring with no record of the batch's level (a coarser face the ring never reaches, its own child at this
//   level — §2.2 rule 2) keeps no record and is not re-owned (C-0192). The score form `{ areaCm2, within, score }` is S7b's (M1, §4b): `notBuilt('M1')`.
// * pinVertices(tx, refs) sets the kernel `pinned` flag (§2.2's VERTEX_PINNED) on every vertex the refs resolve to — its
//   only writer (§3.4) — refusing, before any write, a vertex coarser than the batch (E_LEVEL, §3.3: one level per
//   transaction); a ref that finds no vertex resolves empty (§3.11). Released only by §2.2 rule 3 (b) (M0-a-06's
//   re-levelling). Each pinned vertex is charged to `insert.points` (a vertex count).
import {
  dest,
  faceWalk,
  handleOf,
  outgoing,
  roleIdOf,
  roleInfo,
  rowElement,
  rowsOfKey,
  rowsOn,
  VERTEX_PINNED,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type RoleRow,
  type VertexId,
} from '../arena/index.js';
import { insertChain, INSERT_POINTS, TX_FACES_WALKED } from '../insert/index.js';
import { area2, err, ok, snap, type KernelResult, type Warning } from '../num/index.js';
import { recordLeftOf } from '../tx/relevel.js';
import { chargeTx, check, notBuilt } from '../tx/state.js';
import type { Overlay } from '../tx/types.js';
import { setOwner } from '../tx/writers.js';
import type { FaceRef, Id, LatticePoint, VertexRef } from '../types/index.js';
import { compareFaceKeys, enter, opSave, overLimit, refuse, rollback, segmentsTouch } from './common.js';

/** §3.4's score raster (`RasterRef`): S7b's, M1 — declared by shape only. */
export type ScoreRaster = unknown;

/** §3.4's claim: the ring form (built) or the score form (S7b's, M1). */
export type SubFaceClaim =
  | { readonly ring: readonly { readonly x: number; readonly y: number }[] }
  | { readonly areaCm2: number; readonly within: FaceRef | readonly FaceId[]; readonly score: ScoreRaster };

/** Is the closed ring of lattice points simple (no two non-adjacent sides touching, no adjacent pair folding back)? */
function simpleRing(q: readonly LatticePoint[]): boolean {
  const k = q.length;
  for (let i = 0; i < k; i++) {
    const a = q[i];
    const b = q[(i + 1) % k];
    for (let j = i + 1; j < k; j++) {
      if (j === i + 1 || (i === 0 && j === k - 1)) continue;
      const c = q[j];
      const d = q[(j + 1) % k];
      if (segmentsTouch(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y)) return false;
    }
  }
  // Adjacent sides folding back onto each other (collinear, opposite ways).
  for (let i = 0; i < k; i++) {
    const a = q[(i + k - 1) % k];
    const b = q[i];
    const c = q[(i + 1) % k];
    const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
    const dot = (b.x - a.x) * (c.x - b.x) + (b.y - a.y) * (c.y - b.y);
    if (cross === 0 && dot < 0) return false;
  }
  return true;
}

/** Does the pair carry the marker row (role id, entity handle, ordinal) at level n? */
function carries(p: Plat, h: HalfEdgeId, role: number, entity: number, ordinal: number, n: number): boolean {
  const R = p.roles;
  for (const r of rowsOn(p, 'edge', h)) if (R.kind[r] === role && R.entity[r] === entity && R.ordinal[r] === ordinal && R.level[r] === n) return true;
  return false;
}

/**
 * The marker's half-edges from u along the marker cycle, first leaving by `h`, until a vertex of `stops` (exclusive of
 * u): the path and where it stopped; null where the marker leaves a vertex by no edge or runs round a loop that meets
 * no stop (the insertion did not keep the ring one simple cycle, C-0192 (9)).
 */
function follow(p: Plat, h: HalfEdgeId, stops: ReadonlySet<VertexId>, mark: (g: HalfEdgeId) => boolean): { path: HalfEdgeId[]; end: VertexId } | null {
  const path: HalfEdgeId[] = [h];
  const seen = new Set<HalfEdgeId>(path);
  let g = h;
  for (;;) {
    const v = dest(p, g);
    if (stops.has(v)) return { path, end: v };
    let next = -1;
    for (const x of outgoing(p, v)) if (x !== (g ^ 1) && mark(x)) next = x;
    if (next < 0 || seen.has(next)) return null;
    seen.add(next);
    path.push(next);
    g = next;
  }
}

/** Is the cycle of half-edges one simple counter-clockwise ring: no vertex twice, no edge both ways, positive area? */
function simpleCycle(p: Plat, cyc: readonly HalfEdgeId[]): boolean {
  const O = p.halfEdges.origin;
  const vs = new Set<VertexId>();
  const hs = new Set<HalfEdgeId>(cyc);
  for (const h of cyc) {
    if (hs.has(h ^ 1) || vs.has(O[h])) return false;
    vs.add(O[h]);
  }
  return cyc.length >= 3 && area2(cyc.map((h) => ({ x: p.vertices.x[O[h]], y: p.vertices.y[O[h]] }))) > 0;
}

/**
 * §3.4's `claimSubFace(tx, claim, owner)` in its ring form (see the module comment). Refuses, writing nothing:
 * E_DEGENERATE `empty` / `collapsed`, E_SELF_INTERSECT, insertChain's own codes, E_WORK_LIMIT.
 */
export function claimSubFace(o: Overlay, claim: SubFaceClaim, owner: Id, opts: { readonly rows?: readonly RoleRow[] } = {}): KernelResult<FaceRef> {
  if (!('ring' in claim)) return notBuilt('M1', 'claimSubFace\'s score form (areaCm2, within, score) is S7b\'s (§4b)');
  const { t, refused } = enter<FaceRef>(o);
  if (refused !== null) return refused;
  const p = t.plat;
  const n = t.level;
  check(typeof owner === 'string' && owner.length > 0, 'an owner is an entity\'s non-empty address id');
  const q: LatticePoint[] = [];
  for (const c of claim.ring) {
    const s = snap(c.x, c.y);
    if (!s.ok) return err(s.code, s.detail);
    const last = q[q.length - 1];
    if (last === undefined || last.x !== s.value.x || last.y !== s.value.y) q.push(s.value);
  }
  while (q.length > 1 && q[0].x === q[q.length - 1].x && q[0].y === q[q.length - 1].y) q.pop();
  if (q.length < 3 || area2(q) === 0) return err('E_DEGENERATE', 'empty');
  if (!simpleRing(q)) return refuse('E_SELF_INTERSECT', 'a claim ring is a simple ring (§3.4)');
  if (area2(q) < 0) q.reverse();
  const rows = opts.rows !== undefined && opts.rows.length > 0 ? opts.rows.slice() : [{ role: 'claim', entity: owner }];
  const save = opSave(t);
  const ins = insertChain(t, q, rows, 'mandatory', { closed: true });
  if (!ins.ok) return rollback(t, save, ins);
  const warnings: Warning[] = [...ins.warnings];
  // The marker: the first row's key at the batch's level.
  const role = roleIdOf(rows[0].role);
  const ent = handleOf(p, rows[0].entity);
  const ord = rows[0].ordinal ?? 0;
  const mark = (g: HalfEdgeId): boolean => carries(p, g, role, ent, ord, n);
  // The cycle, counter-clockwise: from each placed vertex, the marker path that reaches the next distinct placed vertex.
  const placed: VertexId[] = [];
  for (const v of ins.value.placed) if (placed[placed.length - 1] !== v) placed.push(v);
  while (placed.length > 1 && placed[0] === placed[placed.length - 1]) placed.pop();
  const stops = new Set<VertexId>(placed);
  const ccw: HalfEdgeId[] = [];
  for (let i = 0; i < placed.length; i++) {
    const u = placed[i];
    const w = placed[(i + 1) % placed.length];
    let found: HalfEdgeId[] | null = null;
    for (const h of outgoing(p, u)) {
      if (!mark(h)) continue;
      const f = follow(p, h, stops, mark);
      if (f !== null && f.end === w) {
        found = f.path;
        break;
      }
    }
    if (found === null) return rollback(t, save, err('E_DEGENERATE', 'collapsed'));
    ccw.push(...found);
  }
  // The insertion's attraction may draw sides closer than attractCm together (an antenna, a pinch): no region is claimed.
  if (!simpleCycle(p, ccw)) return rollback(t, save, err('E_DEGENERATE', 'collapsed'));
  // The records inside: left of the cycle, then every record reached without crossing it.
  const inside = new Set<FaceId>();
  const queue: FaceId[] = [];
  for (const h of ccw) {
    const f = recordLeftOf(t, n, h);
    if (f >= 0 && !inside.has(f)) {
      inside.add(f);
      queue.push(f);
    }
  }
  while (queue.length > 0) {
    const f = queue.shift() as FaceId;
    if (!chargeTx(t, TX_FACES_WALKED, 1)) return overLimit(t);
    for (const g of faceWalk(p, n, f).flat()) {
      if (mark(g)) continue;
      const nb = recordLeftOf(t, n, g ^ 1);
      if (nb >= 0 && !inside.has(nb)) {
        inside.add(nb);
        queue.push(nb);
      }
    }
  }
  if (t.work.total > t.workLimit) return overLimit(t);
  const faces = [...inside].sort((a, b) => compareFaceKeys(p, n, a, b));
  const so = setOwner(t, faces, owner);
  if (!so.ok) return rollback(t, save, so);
  return ok({ owner, level: n }, warnings);
}

/**
 * §3.4's `pinVertices(tx, refs)` (see the module comment). Refuses, writing nothing: E_LEVEL (a vertex coarser than the
 * batch), E_WORK_LIMIT.
 */
export function pinVertices(o: Overlay, refs: readonly VertexRef[]): KernelResult<void> {
  const { t, refused } = enter<void>(o);
  if (refused !== null) return refused;
  const p = t.plat;
  const vs: VertexId[] = [];
  for (const ref of refs) {
    const role = roleIdOf(ref.role);
    check(role >= 0 && roleInfo(role).kind === 'vertex', `pinVertices takes vertex refs (${ref.role} is no vertex role)`);
    const h = handleOf(p, ref.entity);
    for (const r of h < 0 ? [] : rowsOfKey(p, role, h, ref.ordinal ?? 0)) {
      const v = rowElement(p, r);
      if (p.vertices.level[v] < t.level) return err('E_LEVEL', `an L${t.level} batch pins no L${p.vertices.level[v]} vertex (§3.3)`);
      if (!vs.includes(v)) vs.push(v);
    }
  }
  if (!chargeTx(t, INSERT_POINTS, vs.length)) return overLimit(t);
  for (const v of vs) {
    if ((p.vertices.flags[v] & VERTEX_PINNED) !== 0) continue;
    p.vertices.flags[v] |= VERTEX_PINNED;
    t.log.vertices.push(v);
  }
  return ok(undefined);
}

/** Is the vertex pinned (§2.2's flag)? */
export function isPinned(p: Plat, v: VertexId): boolean {
  return (p.vertices.flags[v] & VERTEX_PINNED) !== 0;
}

