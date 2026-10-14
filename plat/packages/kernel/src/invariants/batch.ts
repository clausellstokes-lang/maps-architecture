// §3.10's batch-local rows (§5.3: "evaluated on the batch's touched faces plus their one-ring and on the records it
// created, changed or removed"), read off the commit record (§3.3: "the commit record is the input of the batch-local
// invariants") — its touched faces, its moved, promoted and demoted vertices, its demoted edges and their one-ring —
// so a batch costs O(touched), never O(model) (SCL-1). Every row is evaluated whether it holds or not, each with its
// subject count and its cost meter (§13.2's cost-model test reads the meters). M0-a-14. Readings: C-0200.
import {
  faceWalk,
  handleOf,
  isFaceLive,
  isHalfEdgeLive,
  isVertexLive,
  LEVELS,
  outgoing,
  pointOf,
  roleIdOf,
  roleInfo,
  rowElement,
  rowKey,
  rowsOfKey,
  rowsOn,
  sameKey,
  walkRing,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import { dmath } from '../dmath/index.js';
import {
  checkIndexBatch,
  faceRouteRings,
  indexOf,
  ITEM_EDGE,
  ITEM_FACE,
  ITEM_VERTEX,
  query,
  routeRun,
  type ChangedItem,
  type IndexBatchLog,
} from '../index/index.js';
import { faceArea2 } from '../index/items.js';
import { PI, segmentsMeet } from '../num/exact.js';
import { area2 } from '../num/index.js';
import { LINEAR_PARTS, type CommitRecord } from '../tx/index.js';
import type { Level, RoleKey } from '../types/index.js';
import { compareDist2, faceLeftOf, Meter, segmentBox, vacuous, verdict } from './common.js';
import { rowNamed } from './rows.js';
import type { BatchContext, InvariantResult, RowDecl } from './types.js';

/** The hot pixel squared as a fraction (0.71² = 5041 / 10000 cm²): the placement bound (§3.10, §3.6). */
const PLACEMENT_NUM = 5041;
const PLACEMENT_DEN = 10_000;

/** What a batch touched, read off its record: the live touched faces, their rings' vertices and edges, the record's vertex lists. */
export interface BatchTouched {
  readonly faces: readonly { readonly level: Level; readonly face: FaceId }[];
  readonly vertices: readonly VertexId[];
  readonly pairs: readonly number[];
}

/** The record's vertex lists (moved, promoted, demoted, unflagged), live ones only. */
function recordVertices(p: Plat, r: CommitRecord): VertexId[] {
  return [...new Set([...r.moved, ...r.promoted, ...r.demoted.vertices, ...r.unflagged])].filter((v) => isVertexLive(p, v));
}

/**
 * The batch's touched set: its created and changed faces (every level the record lists), the vertices and edges on
 * their rings at their level, the record's moved, promoted, demoted and unflagged vertices with their incident edges,
 * and its demoted edges. A face that no longer walks is skipped here and reported by the rows that read it.
 */
export function touchedSet(p: Plat, r: CommitRecord): BatchTouched {
  const faces: { level: Level; face: FaceId }[] = [];
  const vs = new Set<VertexId>();
  const pairs = new Set<number>();
  const O = p.halfEdges.origin;
  for (const d of r.faces) {
    for (const f of [...d.created, ...d.changed]) {
      if (!isFaceLive(p, d.level, f)) continue;
      faces.push({ level: d.level, face: f });
      let rings: HalfEdgeId[][];
      try {
        rings = faceWalk(p, d.level, f);
      } catch {
        continue;
      }
      for (const ring of rings) {
        for (const h of ring) {
          vs.add(O[h]);
          pairs.add(h >> 1);
        }
      }
    }
  }
  for (const v of recordVertices(p, r)) {
    vs.add(v);
    try {
      for (const h of outgoing(p, v)) pairs.add(h >> 1);
    } catch {
      // a broken rotation: the rows that read it report it
    }
  }
  for (const h of r.demoted.edges) if (isHalfEdgeLive(p, h)) pairs.add(h >> 1);
  return { faces, vertices: [...vs].filter((v) => isVertexLive(p, v)), pairs: [...pairs].filter((e) => isHalfEdgeLive(p, 2 * e)) };
}

/** Runs one row's body; a walk the corrupted arena breaks becomes a problem of the row, never a throw. */
function guarded(row: RowDecl, meter: Meter, body: (problems: string[]) => number, note?: string): InvariantResult {
  const problems: string[] = [];
  let subjects = 0;
  try {
    subjects = body(problems);
  } catch (e) {
    problems.push(`the row's walk failed: ${e instanceof Error ? e.message : String(e)}`);
    subjects = Math.max(subjects, 1);
  }
  return verdict(row, subjects, problems, meter, note);
}

const at = (p: Plat, v: VertexId): string => `(${p.vertices.x[v]}, ${p.vertices.y[v]})`;

// ---- the rows -------------------------------------------------------------------------------------------------------

/** Every coordinate is a lattice point inside the range invariant (§3.2 (1)): |x|, |y| < rangeCm. */
function latticeRange(p: Plat, T: BatchTouched): InvariantResult {
  const m = new Meter();
  return guarded(rowNamed('lattice-range'), m, (out) => {
    const R = p.lattice.rangeCm;
    for (const v of T.vertices) {
      m.vertex(v);
      const x = p.vertices.x[v];
      const y = p.vertices.y[v];
      if (!Number.isInteger(x) || !Number.isInteger(y) || Math.abs(x) >= R || Math.abs(y) >= R) out.push(`the vertex ${at(p, v)} lies outside the lattice's range ±${R} cm`);
    }
    return T.vertices.length;
  });
}

/** No edge shorter than minEdge: the touched edges (the batch's new and moved edges among them). */
function minEdge(p: Plat, T: BatchTouched): InvariantResult {
  const m = new Meter();
  return guarded(rowNamed('min-edge'), m, (out) => {
    const r = p.lattice.minEdgeCm;
    const O = p.halfEdges.origin;
    const X = p.vertices.x;
    const Y = p.vertices.y;
    for (const e of T.pairs) {
      m.edge(e);
      const a = O[2 * e];
      const b = O[2 * e + 1];
      const dx = X[b] - X[a];
      const dy = Y[b] - Y[a];
      if (dx * dx + dy * dy < r * r) out.push(`the edge ${at(p, a)}–${at(p, b)} is shorter than minEdge (${r} cm)`);
    }
    return T.pairs.length;
  });
}

/**
 * The vertices one edge from v (its one-ring's far ends): the vertices whose edges clearance exempts (§3.10 "outside
 * its one-ring"). The insertion's write-time clearance reads the same one-line set (`insert/snapRound.ts`'s
 * `neighbours`); the arena keeps no shared home for it, so each reader builds it from `outgoing`.
 */
function neighbours(p: Plat, v: VertexId): Set<VertexId> {
  const O = p.halfEdges.origin;
  return new Set(outgoing(p, v).map((h) => O[h ^ 1]));
}

/** Clearance: every touched vertex at least minEdge from every edge outside its one-ring, and every touched edge from every vertex outside its ends' one-rings. */
function clearance(p: Plat, T: BatchTouched): InvariantResult {
  const m = new Meter();
  return guarded(rowNamed('clearance'), m, (out) => {
    const r = p.lattice.minEdgeCm;
    const O = p.halfEdges.origin;
    const X = p.vertices.x;
    const Y = p.vertices.y;
    const seen = new Set<string>();
    const report = (w: VertexId, a: VertexId, b: VertexId): void => {
      const k = `${w}:${Math.min(a, b)}:${Math.max(a, b)}`;
      if (seen.has(k)) return;
      seen.add(k);
      out.push(`the vertex ${at(p, w)} stands within minEdge of the edge ${at(p, a)}–${at(p, b)}`);
    };
    for (const v of T.vertices) {
      m.vertex(v);
      const nv = neighbours(p, v);
      for (const h of query(p, p.key, 4, segmentBox(X[v], Y[v], X[v], Y[v], r), { edges: true }).edges) {
        m.edge(h >> 1);
        const a = O[h];
        const b = O[h ^ 1];
        if (a === v || b === v || nv.has(a) || nv.has(b)) continue;
        if (compareDist2(X[v], Y[v], X[a], Y[a], X[b], Y[b], r * r, 1) < 0) report(v, a, b);
      }
    }
    for (const e of T.pairs) {
      m.edge(e);
      const a = O[2 * e];
      const b = O[2 * e + 1];
      const na = neighbours(p, a);
      const nb = neighbours(p, b);
      for (const w of query(p, p.key, 4, segmentBox(X[a], Y[a], X[b], Y[b], r), { vertices: true }).vertices) {
        m.vertex(w);
        if (w === a || w === b || na.has(w) || nb.has(w)) continue;
        if (compareDist2(X[w], Y[w], X[a], Y[a], X[b], Y[b], r * r, 1) < 0) report(w, a, b);
      }
    }
    return T.vertices.length + T.pairs.length;
  });
}

/** One vertex per lattice point: each touched vertex is the only vertex the index finds at its point. */
function oneVertexPerPoint(p: Plat, T: BatchTouched): InvariantResult {
  const m = new Meter();
  return guarded(rowNamed('one-vertex-per-point'), m, (out) => {
    const X = p.vertices.x;
    const Y = p.vertices.y;
    const seen = new Set<string>();
    for (const v of T.vertices) {
      m.vertex(v);
      for (const w of query(p, p.key, 4, segmentBox(X[v], Y[v], X[v], Y[v], 0), { vertices: true }).vertices) {
        if (w === v) continue;
        const k = `${Math.min(v, w)}:${Math.max(v, w)}`;
        if (seen.has(k)) continue;
        seen.add(k);
        out.push(`two vertices share the lattice point ${at(p, v)}`);
      }
    }
    return T.vertices.length;
  });
}

/** Counter-clockwise angular order of two directions from +x (exact: half-plane, then the cross product's sign). */
function compareAngle(ax: number, ay: number, bx: number, by: number): number {
  const ha = ay < 0 || (ay === 0 && ax < 0) ? 1 : 0;
  const hb = by < 0 || (by === 0 && bx < 0) ? 1 : 0;
  if (ha !== hb) return ha - hb;
  const c = ax * by - ay * bx;
  return c > 0 ? -1 : c < 0 ? 1 : 0;
}

/** Is the rotation at v (its outgoing half-edges, `next(twin)` order) clockwise by angle — one turn, no edge out of place? */
function rotationClockwise(p: Plat, v: VertexId): boolean {
  const out = outgoing(p, v);
  if (out.length < 3) return true;
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const dir = (h: HalfEdgeId): [number, number] => [X[O[h ^ 1]] - X[v], Y[O[h ^ 1]] - Y[v]];
  const ccw = out.slice().sort((a, b) => {
    const [ax, ay] = dir(a);
    const [bx, by] = dir(b);
    return compareAngle(ax, ay, bx, by);
  });
  const cw = ccw.reverse();
  const k = cw.indexOf(out[0]);
  for (let i = 0; i < out.length; i++) if (cw[(k + i) % out.length] !== out[i]) return false;
  return true;
}

/**
 * Faces simple except declared antennae; no two edges cross (C-0200 (4)). Each touched edge against the edges the index
 * finds in its box: two edges meet only at a shared endpoint, never overlap and never join one pair of vertices twice.
 * Each touched vertex's rotation is clockwise by angle, so no face ring crosses itself where it passes a vertex twice
 * (a pinch is a touching, never a crossing). Each touched face's outer ring winds counter-clockwise with positive area
 * and each hole ring clockwise — a declared antenna or a hole's slit, retraced both ways, adds no area (§3.2 (6)).
 */
function simpleFaces(p: Plat, T: BatchTouched): InvariantResult {
  const m = new Meter();
  return guarded(rowNamed('simple-faces'), m, (out) => {
    const O = p.halfEdges.origin;
    const X = p.vertices.x;
    const Y = p.vertices.y;
    const seen = new Set<string>();
    for (const e of T.pairs) {
      m.edge(e);
      const a = O[2 * e];
      const b = O[2 * e + 1];
      for (const h of query(p, p.key, 4, segmentBox(X[a], Y[a], X[b], Y[b], 0), { edges: true }).edges) {
        const g = h >> 1;
        if (g === e) continue;
        m.edge(g);
        const k = `${Math.min(e, g)}:${Math.max(e, g)}`;
        if (seen.has(k)) continue;
        seen.add(k);
        const c = O[h];
        const d = O[h ^ 1];
        const shared = [a, b].filter((x) => x === c || x === d);
        if (shared.length === 2) {
          out.push(`two edges join ${at(p, a)} and ${at(p, b)}`);
        } else if (shared.length === 1) {
          const s0 = shared[0];
          const u = a === s0 ? b : a;
          const w = c === s0 ? d : c;
          const cross = (X[u] - X[s0]) * (Y[w] - Y[s0]) - (Y[u] - Y[s0]) * (X[w] - X[s0]);
          const dot = (X[u] - X[s0]) * (X[w] - X[s0]) + (Y[u] - Y[s0]) * (Y[w] - Y[s0]);
          if (cross === 0 && dot > 0) out.push(`the edges ${at(p, s0)}–${at(p, u)} and ${at(p, s0)}–${at(p, w)} overlap`);
        } else if (segmentsMeet(X[a], Y[a], X[b], Y[b], X[c], Y[c], X[d], Y[d])) {
          out.push(`the edges ${at(p, a)}–${at(p, b)} and ${at(p, c)}–${at(p, d)} cross`);
        }
      }
    }
    for (const v of T.vertices) {
      m.vertex(v);
      if (!rotationClockwise(p, v)) out.push(`the rotation at ${at(p, v)} is out of angular order: a face ring crosses itself there`);
    }
    for (const { level, face } of T.faces) {
      m.face(level, face);
      const rings = faceWalk(p, level, face);
      rings.forEach((ring, i) => {
        const a2 = area2(ring.map((h) => pointOf(p, O[h])));
        if (i === 0 && a2 <= 0) out.push(`an L${level} face's outer ring does not wind counter-clockwise (twice its area ${a2})`);
        if (i > 0 && a2 > 0) out.push(`an L${level} face's hole ring winds counter-clockwise (twice its area ${a2})`);
      });
    }
    return T.pairs.length + T.vertices.length + T.faces.length;
  });
}

/**
 * Nesting, by index: each touched face of level n ≥ 1 names a live parent at n − 1; every coarser half-edge on its
 * rings lies on that parent's rings; a face with no coarser edge on its outer ring (an island) has the parent of the
 * level-n record that holds it as a hole — or, where that ring meets a coarser edge, the parent across that edge.
 */
function nesting(p: Plat, T: BatchTouched): InvariantResult {
  const m = new Meter();
  return guarded(rowNamed('nesting'), m, (out) => {
    const H = p.halfEdges;
    const parentRings = new Map<string, Set<HalfEdgeId>>();
    const ringsOf = (level: Level, f: FaceId): Set<HalfEdgeId> => {
      const k = `${level}:${f}`;
      let s = parentRings.get(k);
      if (s === undefined) {
        m.face(level, f);
        s = new Set<HalfEdgeId>();
        for (const ring of faceWalk(p, level, f)) for (const h of ring) s.add(h);
        parentRings.set(k, s);
      }
      return s;
    };
    for (const { level, face } of T.faces) {
      m.face(level, face);
      const par = p.faces[level].parent[face];
      if (level === 0) {
        if (par !== -1) out.push(`an L0 face names a parent (${par})`);
        continue;
      }
      const up = (level - 1) as Level;
      if (!isFaceLive(p, up, par)) {
        out.push(`an L${level} face has no live parent at L${up}`);
        continue;
      }
      const rings = faceWalk(p, level, face);
      const holds = ringsOf(up, par);
      for (const ring of rings) {
        for (const h of ring) {
          if (H.level[h >> 1] > up) continue;
          if (!holds.has(h)) out.push(`an L${level} face's coarser edge ${at(p, H.origin[h])}–${at(p, H.origin[h ^ 1])} lies on no ring of its parent`);
        }
      }
      if (rings[0].some((h) => H.level[h >> 1] <= up)) continue;
      // An island of its own level: the ring around it decides.
      const around = walkRing(p, level, rings[0][0] ^ 1);
      const c = around.find((h) => H.level[h >> 1] <= up);
      if (c !== undefined) {
        if (!holds.has(c)) out.push(`an L${level} island face lies across its parent's boundary`);
        continue;
      }
      const host = faceLeftOf(p, level, rings[0][0] ^ 1, m);
      if (host === -1) out.push(`an L${level} island face lies in no L${level} record`);
      else if (p.faces[level].parent[host] !== par) out.push(`an L${level} island face's parent differs from the parent of the face that holds it`);
    }
    return T.faces.length;
  });
}

/**
 * The placement bound: each vertex the batch placed, re-seated or slid (the context's `placed`, the record's `moved`
 * and the finer vertices on a run a moved vertex lies on) that lies on a coarser edge stands within 0.71 cm of that
 * edge's route at the edge's own level — the segment between the run's two nearest vertices of that level around it.
 */
function placementBound(p: Plat, r: CommitRecord, ctx: BatchContext): InvariantResult {
  const m = new Meter();
  return guarded(rowNamed('placement-bound'), m, (out) => {
    const H = p.halfEdges;
    const L = p.vertices.level;
    const X = p.vertices.x;
    const Y = p.vertices.y;
    let subjects = 0;
    // The placed and moved vertices, and every finer vertex on a run a moved vertex ends or lies on: a move re-places
    // the route of each run through a moved vertex, so the finer vertices standing on it are re-checked (§3.6).
    const along: VertexId[] = [];
    for (const v of r.moved) {
      if (!isVertexLive(p, v)) continue;
      for (const h of outgoing(p, v)) {
        const run = routeRun(p, h);
        for (const g of run.halfEdges) {
          const w = H.origin[g];
          if (L[w] > run.level) along.push(w);
        }
      }
    }
    for (const v of [...new Set([...(ctx.placed ?? []), ...r.moved, ...along])]) {
      if (!isVertexLive(p, v)) continue;
      const coarser = outgoing(p, v).filter((h) => H.level[h >> 1] < L[v]);
      if (coarser.length === 0) continue;
      subjects++;
      m.vertex(v);
      const run = routeRun(p, coarser[0]);
      const seq: VertexId[] = run.halfEdges.map((h) => H.origin[h]);
      seq.push(H.origin[run.halfEdges[run.halfEdges.length - 1] ^ 1]);
      for (const h of run.halfEdges) m.edge(h >> 1);
      const i = seq.indexOf(v);
      let a = -1;
      for (let k = i - 1; k >= 0; k--) if (L[seq[k]] <= run.level) { a = seq[k]; break; }
      let b = -1;
      for (let k = i + 1; k < seq.length; k++) if (L[seq[k]] <= run.level) { b = seq[k]; break; }
      if (i < 0 || a < 0 || b < 0) {
        out.push(`the vertex ${at(p, v)} lies on no L${run.level} route between two vertices of that level`);
        continue;
      }
      if (compareDist2(X[v], Y[v], X[a], Y[a], X[b], Y[b], PLACEMENT_NUM, PLACEMENT_DEN) > 0) {
        out.push(`the vertex ${at(p, v)} stands more than 0.71 cm from its L${run.level} route ${at(p, a)}–${at(p, b)}`);
      }
    }
    return subjects;
  });
}

/**
 * Level consistency (§2.2 rule 3) on the touched edges and vertices. A vertex finer than its incident edges lies inside
 * one run at every level between: its edges coarser than it are exactly two, of one level e, and for every level r from
 * e up to the vertex's level − 1 their rows of level r (of level ≤ 1 at r = 1, the routes' class) are identical — the
 * constancy of every route the vertex lies inside, as the encoder's `runRows` reads it (N-s6-2,
 * `checks/M0-a-06-notes.md`; C-0359). The rows at the edges' own level keep their problem text; an in-between level
 * names the vertex, the level and the two edges' rows.
 */
function levelConsistency(p: Plat, T: BatchTouched): InvariantResult {
  const m = new Meter();
  return guarded(rowNamed('level-consistency'), m, (out) => {
    const H = p.halfEdges;
    const R = p.roles;
    for (const e of T.pairs) {
      m.edge(e);
      let lowest = 5;
      for (const r of rowsOn(p, 'edge', 2 * e)) lowest = Math.min(lowest, R.level[r]);
      if (lowest !== H.level[e]) out.push(`the edge ${at(p, H.origin[2 * e])}–${at(p, H.origin[2 * e + 1])}'s birth level L${H.level[e]} is not the lowest level among its rows (L${lowest})`);
    }
    for (const v of T.vertices) {
      m.vertex(v);
      const lv = p.vertices.level[v];
      const inc = outgoing(p, v);
      const vr = rowsOn(p, 'vertex', v);
      if (inc.length + vr.length > 0 && !inc.some((h) => H.level[h >> 1] <= lv) && !vr.some((r) => R.level[r] <= lv)) {
        out.push(`the vertex ${at(p, v)} (L${lv}) is coarser than every edge and row at it`);
      }
      const coarser = inc.filter((h) => H.level[h >> 1] < lv);
      if (coarser.length === 0) continue;
      const same = coarser.length === 2 && H.level[coarser[0] >> 1] === H.level[coarser[1] >> 1];
      if (!same) {
        out.push(`the vertex ${at(p, v)} (L${lv}), finer than its edges, lies inside no single run`);
        continue;
      }
      const e = H.level[coarser[0] >> 1];
      // The rows a level-r route carries: of level r, of level ≤ 1 at r = 1 (the edges' own level reads its own rows).
      const rowsAt = (h: HalfEdgeId, r: number): string => rowsOn(p, 'edge', h).filter((x) => (r === e ? R.level[x] === r : r === 1 ? R.level[x] <= 1 : R.level[x] === r)).map((x) => `${R.kind[x]}/${R.entity[x]}/${R.ordinal[x]}`).sort((x, y) => (x < y ? -1 : x > y ? 1 : 0)).join(';');
      for (let r = e; r < lv; r++) {
        const a = rowsAt(coarser[0], r);
        const b = rowsAt(coarser[1], r);
        if (a === b) continue;
        if (r === e) out.push(`the vertex ${at(p, v)} (L${lv}), finer than its edges, lies inside no single run`);
        else out.push(`the vertex ${at(p, v)} (L${lv}), finer than its L${e} edges, lies inside no single L${r} run: their rows of level ${r === 1 ? '≤ 1' : r} differ ([${a}] and [${b}])`);
        break;
      }
    }
    return T.pairs.length + T.vertices.length;
  });
}

/** Held vertices: no vertex of the step's held set is in the record's `moved` list. */
function heldVertices(p: Plat, r: CommitRecord, ctx: BatchContext): InvariantResult {
  const row = rowNamed('held-vertices');
  if (r.moved.length === 0) return vacuous(row, 'no vertex moved (not a warp or smoothing batch)');
  const m = new Meter();
  return guarded(row, m, (out) => {
    const held = new Set<VertexId>(ctx.held ?? []);
    for (const v of r.moved) {
      m.vertex(v);
      if (held.has(v)) out.push(`the held vertex ${at(p, v)} moved`);
    }
    return r.moved.length;
  }, ctx.held === undefined ? 'no held set handed in: the step held nothing' : undefined);
}

/**
 * Prepared contacts (a clear-region batch, M3a): every promoted vertex is a prepared one and carries no `anchor` name
 * any more, and no edge of the batch's level shares a finer edge (carries a finer row).
 */
function preparedContacts(p: Plat, r: CommitRecord, T: BatchTouched, ctx: BatchContext): InvariantResult {
  const row = rowNamed('prepared-contacts');
  if (ctx.prepared === undefined) return vacuous(row, 'no clear-region batch (KernelTx.clearRegion and prepared are M3a\'s)');
  const m = new Meter();
  return guarded(row, m, (out) => {
    const prepared = new Set<VertexId>(ctx.prepared);
    const anchor = roleIdOf('anchor');
    for (const v of r.promoted) {
      m.vertex(v);
      if (!prepared.has(v)) out.push(`the batch promoted ${at(p, v)}, which is no prepared vertex`);
      if (isVertexLive(p, v) && rowsOn(p, 'vertex', v).some((x) => p.roles.kind[x] === anchor)) out.push(`the promoted vertex ${at(p, v)} still carries an anchor contact name`);
    }
    for (const e of T.pairs) {
      if (p.halfEdges.level[e] !== r.level) continue;
      m.edge(e);
      if (rowsOn(p, 'edge', 2 * e).some((x) => p.roles.level[x] > r.level)) out.push(`the L${r.level} edge ${at(p, p.halfEdges.origin[2 * e])}–${at(p, p.halfEdges.origin[2 * e + 1])} shares a finer edge`);
    }
    return r.promoted.length + T.pairs.length;
  });
}

/** Kept content: no finer face of a stage ranked before `rederivesFrom` cleared, crossed, split or re-owned (a move keeps nothing). */
function keptContent(p: Plat, r: CommitRecord, ctx: BatchContext): InvariantResult {
  const row = rowNamed('kept-content');
  if (r.moved.length > 0) return vacuous(row, 'a move keeps nothing (§3.6)');
  const finer = r.faces.filter((d) => d.level > r.level);
  const n = finer.reduce((s, d) => s + d.changed.length + d.removed.length, 0);
  if (n === 0) return vacuous(row, 'the batch changed and removed no finer face');
  if (ctx.kept === undefined) return vacuous(row, 'no before-image handed in: the writers\' E_KEPT holds the row (§3.3)');
  const kept = ctx.kept;
  const m = new Meter();
  return guarded(row, m, (out) => {
    for (const d of finer) {
      for (const f of d.removed) {
        m.face(d.level, f);
        const b = kept.before(d.level, f);
        if (b !== null && b.stage < kept.keptBelow) out.push(`a kept L${d.level} face (stage rank ${b.stage}) was cleared`);
      }
      for (const f of d.changed) {
        m.face(d.level, f);
        const b = kept.before(d.level, f);
        if (b === null || b.stage >= kept.keptBelow) continue;
        if (p.faces[d.level].owner[f] !== b.owner) out.push(`a kept L${d.level} face (stage rank ${b.stage}) was re-owned`);
        if (faceArea2(p, d.level, f) !== b.area2) out.push(`a kept L${d.level} face (stage rank ${b.stage}) was split or crossed (its area changed)`);
      }
    }
    return n;
  });
}

/**
 * Twice a face's area over its own-level route rings (outer counter-clockwise, holes clockwise), exact: the kept-content
 * row's measure, exported under the suite's name. Its one body is `index/items.ts`'s, beside `faceRouteRings` (C-0345).
 */
export { faceArea2 };

/**
 * Role consistency on the record's role keys: each linear role's edges simple (degree ≤ 2) and in at most the parts the
 * entity declares (C-0185 (8)'s table, or the context's); and, in a batch that merged or absorbed faces, no structural
 * edge role left without an edge.
 */
function roleConsistency(p: Plat, r: CommitRecord, ctx: BatchContext): InvariantResult {
  const m = new Meter();
  return guarded(rowNamed('role-consistency'), m, (out) => {
    const O = p.halfEdges.origin;
    const merging = (ctx.opKinds ?? []).some((k) => k === 'mergeFaces' || k === 'absorbSliver');
    for (const k of r.roles) {
      const id = roleIdOf(k.role);
      if (id < 0) {
        out.push(`the record names the role ${k.role}, which the registry lacks`);
        continue;
      }
      const info = roleInfo(id);
      if (info.kind !== 'edge') continue;
      const h = handleOf(p, k.entity);
      const pairs = h < 0 ? [] : rowsOfKey(p, id, h, k.ordinal).map((x) => rowElement(p, x));
      if (merging && info.structural && pairs.length === 0) out.push(`the structural role (${k.role}, ${k.entity}) lost its last edge in a merge or absorption`);
      if (!(k.role in LINEAR_PARTS) || pairs.length === 0) continue;
      const declared = ctx.chainParts !== undefined ? ctx.chainParts(k.role, k.entity) : LINEAR_PARTS[k.role];
      const deg = new Map<VertexId, number>();
      const parent = new Map<VertexId, VertexId>();
      const find = (v: VertexId): VertexId => {
        let x = v;
        while (parent.get(x) !== x) x = parent.get(x) as VertexId;
        return x;
      };
      for (const e of pairs) {
        m.edge(e);
        for (const v of [O[2 * e], O[2 * e + 1]]) {
          deg.set(v, (deg.get(v) ?? 0) + 1);
          if (!parent.has(v)) parent.set(v, v);
        }
        parent.set(find(O[2 * e]), find(O[2 * e + 1]));
      }
      if ([...deg.values()].some((d) => d > 2)) out.push(`(${k.role}, ${k.entity}) branches: a linear role forms simple chains or rings`);
      const parts = new Set([...parent.keys()].map(find)).size;
      if (declared !== null && declared !== undefined && parts > declared) out.push(`(${k.role}, ${k.entity}) lies in ${parts} parts, more than the ${declared} it declares`);
    }
    return r.roles.length;
  });
}

/** Is the face record at `level` an own child (§2.2 rule 2): no edge of its own level on its rings? */
function ownChild(p: Plat, level: Level, f: FaceId): boolean {
  if (!isFaceLive(p, level, f)) return false;
  return faceWalk(p, level, f).every((ring) => ring.every((h) => p.halfEdges.level[h >> 1] !== level));
}

/**
 * A coarser face write the transaction allows, read as `tx.ts` reads it: a write of a live own child (§2.2 rule 2) — the
 * re-walk materialising a record of that level (C-0185 (12)) — or a tombstone or delete of a slot no longer live, its
 * inverse: an own-child ancestor the batch freed when its last child went (C-0219 (1), (2); C-0235 under ruling N-49).
 * A write of a live coarser face with edges of its own level, and an insert of a slot that is not live, stay refused.
 */
function lawfulCoarserFaceWrite(p: Plat, w: IndexBatchLog['writes'][number]): boolean {
  if (ownChild(p, w.level, w.slot)) return true;
  return (w.op === 'tombstone' || w.op === 'delete') && !isFaceLive(p, w.level, w.slot);
}

/**
 * Index levels and freshness, through M0-a-03's `checkIndexBatch`, over two inputs. (1) The open batch's index log — read
 * while the batch is open, through the transaction's `invariants` hook; empty otherwise — less the coarser face writes
 * the transaction allows (`lawfulCoarserFaceWrite`). (2) The changed items the record names — its created faces, its moved, promoted and
 * demoted vertices — each in its level's grid, or the context's journal in their place (C-0200 (6)).
 */
function indexFreshness(p: Plat, r: CommitRecord, ctx: BatchContext): InvariantResult {
  const row = rowNamed('index-freshness');
  if (p.index === undefined) return vacuous(row, 'the arena has no spatial index attached');
  const m = new Meter();
  return guarded(row, m, (out) => {
    const live = indexOf(p).log;
    let log: IndexBatchLog = { level: r.level, writes: [] };
    if (live !== null && live.level === r.level) {
      log = { level: live.level, writes: live.writes.filter((w) => !(w.kind === ITEM_FACE && w.level < r.level && lawfulCoarserFaceWrite(p, w))) };
    }
    let changed: ChangedItem[];
    if (ctx.indexChanged !== undefined) {
      changed = [...ctx.indexChanged];
    } else {
      changed = [];
      for (const d of r.faces) {
        for (const f of d.created) {
          if (!isFaceLive(p, d.level, f)) continue;
          m.face(d.level, f);
          changed.push({ item: { kind: ITEM_FACE, level: d.level, slot: f }, homeBefore: -1, successor: { kind: ITEM_FACE, level: d.level, slot: f } });
        }
      }
      for (const v of [...new Set([...r.moved, ...r.promoted, ...r.demoted.vertices])]) {
        if (!isVertexLive(p, v)) continue;
        m.vertex(v);
        const item = { kind: ITEM_VERTEX, level: p.vertices.level[v] as Level, slot: v } as const;
        changed.push({ item, homeBefore: -1, successor: item });
      }
    }
    out.push(...checkIndexBatch(p, log, { promoted: r.promoted, demoted: r.demoted, changed }));
    return log.writes.length + changed.length;
  });
}

/** Arena isolation, the one-arena case: the record names this arena, and every slot it lists is a live slot of it. */
function arenaIsolation(p: Plat, r: CommitRecord): InvariantResult {
  const m = new Meter();
  return guarded(rowNamed('arena-isolation'), m, (out) => {
    if (!sameKey(r.key, p.key)) out.push(`the record names arena ${r.key.layer}/${r.key.part}, but was checked on ${p.key.layer}/${p.key.part}`);
    let n = 1;
    for (const d of r.faces) {
      for (const f of [...d.created, ...d.changed]) {
        n++;
        m.face(d.level, f);
        if (!isFaceLive(p, d.level, f)) out.push(`the record's L${d.level} face slot ${f} is no live face of this arena`);
      }
    }
    for (const v of [...r.moved, ...r.promoted, ...r.demoted.vertices, ...r.unflagged]) {
      n++;
      m.vertex(v);
      if (!isVertexLive(p, v)) out.push(`the record's vertex slot ${v} is no live vertex of this arena`);
    }
    for (const h of r.demoted.edges) {
      n++;
      m.edge(h >> 1);
      if (!isHalfEdgeLive(p, h)) out.push(`the record's half-edge slot ${h} is no live edge of this arena`);
    }
    return n;
  }, 'the one-arena case; isolation across parts waits for their arenas (M3a, M6-U)');
}

/** Seed tiling: a transient arena's row (M6-P); a plat's batch has no seed rings. */
function seedTiling(): InvariantResult {
  return vacuous(rowNamed('seed-tiling'), 'not a transient arena (transient arenas are M6-P\'s, §4b)');
}

/** The corners of a route ring (the face on its left) below `cdeg` centidegrees, an antenna's tip excepted. */
export function acuteCorners(p: Plat, ring: readonly VertexId[], cdeg: number): VertexId[] {
  const n = ring.length;
  const out: VertexId[] = [];
  if (n < 3) return out;
  const phi = (cdeg * PI) / 18_000;
  const c = dmath.cos(phi);
  const s = dmath.sin(phi);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  for (let i = 0; i < n; i++) {
    const a = ring[(i + n - 1) % n];
    const b = ring[i];
    const d = ring[(i + 1) % n];
    const ux = X[b] - X[a];
    const uy = Y[b] - Y[a];
    const vx = X[d] - X[b];
    const vy = Y[d] - Y[b];
    const cross = ux * vy - uy * vx;
    const dot = ux * vx + uy * vy;
    // The interior angle π − turn is below φ when the left turn exceeds π − φ (cross > 0), or the ring reverses there —
    // but not at an antenna's tip, where the ring turns back along the one edge it came by (no corner, C-0200 (9)).
    if (a === d) continue;
    if ((cross > 0 && cross * c + dot * s < 0) || (cross === 0 && dot < 0)) out.push(b);
  }
  return out;
}

/** The touched faces' corners below minFaceAngle (each corner once per face ring). */
function cornersOf(p: Plat, T: BatchTouched, m: Meter): { face: string; v: VertexId }[] {
  const out: { face: string; v: VertexId }[] = [];
  for (const { level, face } of T.faces) {
    m.face(level, face);
    for (const ring of faceRouteRings(p, level, face, level)) {
      for (const v of acuteCorners(p, ring, p.lattice.minFaceAngleCdeg)) out.push({ face: `L${level}`, v });
    }
  }
  return out;
}

/** Face corners, soft: every touched corner below minFaceAngle goes to the report (W_ACUTE_CORNER of a mandatory chain). */
function faceCorners(p: Plat, T: BatchTouched): InvariantResult {
  const m = new Meter();
  return guarded(rowNamed('face-corners'), m, (out) => {
    for (const c of cornersOf(p, T, m)) out.push(`an ${c.face} face's corner at ${at(p, c.v)} is below minFaceAngle (W_ACUTE_CORNER)`);
    return T.faces.length;
  });
}

/** Face corners, hard: a touched corner below minFaceAngle at a vertex an optional chain placed. */
function faceCornersOptional(p: Plat, T: BatchTouched, ctx: BatchContext): InvariantResult {
  const row = rowNamed('face-corners-optional');
  if (ctx.optional === undefined) return vacuous(row, 'no optional chain\'s vertices handed in (the insertion refuses an optional chain\'s acute corner, §3.6)');
  const m = new Meter();
  return guarded(row, m, (out) => {
    const optional = new Set<VertexId>(ctx.optional);
    for (const c of cornersOf(p, T, m)) if (optional.has(c.v)) out.push(`an optional chain's corner at ${at(p, c.v)} in an ${c.face} face is below minFaceAngle`);
    return optional.size;
  });
}

// ---- checkBatch ------------------------------------------------------------------------------------------------------

/**
 * §3.10's batch-local rows on one batch: its commit record (read before or right after its commit, before the next
 * batch and the next rebuild) on the arena it names. Returns one verdict per batch-scope row, in the table's order —
 * hard rows abort the batch through the transaction's `invariants` hook, soft rows go to the report (§5.3).
 */
export function checkBatch(record: CommitRecord, plat: Plat, ctx: BatchContext = {}): InvariantResult[] {
  const p = plat;
  const r = record;
  const T = touchedSet(p, r);
  return [
    latticeRange(p, T),
    minEdge(p, T),
    clearance(p, T),
    oneVertexPerPoint(p, T),
    simpleFaces(p, T),
    nesting(p, T),
    placementBound(p, r, ctx),
    levelConsistency(p, T),
    heldVertices(p, r, ctx),
    preparedContacts(p, r, T, ctx),
    keptContent(p, r, ctx),
    roleConsistency(p, r, ctx),
    indexFreshness(p, r, ctx),
    arenaIsolation(p, r),
    seedTiling(),
    faceCorners(p, T),
    faceCornersOptional(p, T, ctx),
  ];
}

/** The rows' summed cost meter — §13.2's cost-model counts: distinct faces, vertices and edges the batch's check read. */
export function batchCost(results: readonly InvariantResult[]): { faces: number; vertices: number; edges: number } {
  let faces = 0;
  let vertices = 0;
  let edges = 0;
  for (const x of results) {
    faces += x.checked.faces;
    vertices += x.checked.vertices;
    edges += x.checked.edges;
  }
  return { faces, vertices, edges };
}

/** The role keys on a set of edges and vertices (for a record synthesised from faces, C-0200 (8)). */
export function roleKeysOn(p: Plat, pairs: readonly number[], vertices: readonly VertexId[]): RoleKey[] {
  const keys = new Map<string, RoleKey>();
  const add = (x: number): void => {
    const k = rowKey(p, x);
    keys.set(`${k.role}\u0000${k.entity}\u0000${k.ordinal}`, k);
  };
  for (const e of pairs) for (const x of rowsOn(p, 'edge', 2 * e)) add(x);
  for (const v of vertices) for (const x of rowsOn(p, 'vertex', v)) add(x);
  return [...keys.values()];
}

/**
 * A record that names every live face of every level as changed (and nothing moved): the batch-local rows read over the
 * whole arena — the CI's sweep and a loaded arena's check (§3.10, §13.1). O(arena).
 */
export function wholeRecord(p: Plat): CommitRecord {
  const faces = LEVELS.map((level) => {
    const changed: FaceId[] = [];
    for (let f = 0; f < p.slots.face[level].top; f++) if (isFaceLive(p, level, f)) changed.push(f);
    return { level, created: [] as FaceId[], changed, removed: [] as FaceId[] };
  });
  const pairs: number[] = [];
  for (let e = 0; e < p.slots.pair.top; e++) if (isHalfEdgeLive(p, 2 * e)) pairs.push(e);
  const vertices: VertexId[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v)) vertices.push(v);
  return {
    version: p.version,
    key: { layer: p.key.layer, part: p.key.part },
    level: 0,
    faces,
    edgesAdded: 0,
    edgesRemoved: 0,
    steinerAdded: 0,
    steinerDissolved: 0,
    work: 0,
    moved: [],
    promoted: [],
    demoted: { vertices: [], edges: [] },
    unflagged: [],
    owners: [],
    roles: roleKeysOn(p, pairs, vertices),
    warnings: [],
  };
}

