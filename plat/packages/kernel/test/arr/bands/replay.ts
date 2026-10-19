// The refusal classifier of M0-a-09's tests (N-44 as amended by J203/J207/J208; C-0212 (10) as amended): a refusal of a
// band operation is insertChain's — counted against insertChain's measured cap, logged for the register, never gated
// here — only when it REPLAYS ON insertChain ALONE: the same chains, in the same order, fed straight to `insertChain` on
// a fresh arena, meet the same refusal (code and detail), and the chain refused is a well-formed input (a simple open
// chain or ring, no repeated point). RULING J433 (round S9; N-44 (3)'s 'a refusal caused in the item's own code'): a
// refusal of kerb's dry-run's own post-conditions (KEPT_DEEP, CENSUS_DEEP, UNLAID_DEEP) follows its CAUSE — insertChain's
// when the replay of the same parts through insertChain alone shows the insertion changed the part at the refusing place
// (kerb.ts names it: `kerbCensus().refusedAt`): (a) a run end held off its input point (attraction within attractCm, or
// §3.6's placement fallback), (b) a merge or collapse under minEdge, (c) a run with no route (`holdOf`); the item's own
// where the replay holds that part exactly as given. Any other refusal is the item's own and is held to 1 per 10⁴ cases
// per operation.
//
// Three replays, one per place a band operation inserts:
//  - kerb's dry-run on the real arena (session round S9, C-0387; kerb.ts's module comment): on a shell of the open
//    batch's arena at the read's level, under the op's savepoint and rolled back after, F's parts — its edge spines'
//    buffer parts in key order, then the parts of the vertex-only spines the read's census added (`kerbCensus`) — each
//    one closed mandatory chain under its own `invisible` row, every index pinned; written here from the dry-run's
//    contract, with no call into kerb.ts's engine (the parts are kerb.ts's reading, `readFace` and `kerbParts`);
//  - the scratch overlay (tileRings' rings; M0-a-08's `buildOverlay`): a fresh L0 arena, the frame 4096 cm beyond the
//    inputs, then every distinct input segment as a two-point mandatory chain in input order — `buildOverlay`'s
//    insertion loop, written here from its contract (C-0196 (1)), with no arrangement code in it;
//  - the commit (corridorUnion at L2, bandUnion at L3): a fresh copy of the arena, every face's kerb read first in the
//    op's own batch (a refused read replayed on its dry-run there), then per face in canonical order its outline pieces and its corridor_split chains, each through `insertChain` directly —
//    an open piece's end left a dangling tip closed as the engine closes it (N-57 (2)): its contact placed on F's
//    boundary by `splitThrough` (the door) where the placement puts it at the contact, and the chord from the tip to it
//    (at most attractCm + 1 cm) through `insertChain`, else (a tip within 2·√2·attractCm) along the kerb's run to its
//    first vertex on F's boundary;
//    where it cannot be closed so, the replay starts again on a fresh copy with that end pinned first, as the engine
//    re-runs the op (C-0327 as refined by round S4).
import { compareFaces, createPlat, faceWalk, handleOf, isVertexLive, outgoing, pointOf, roleIdOf, rowsOn, type FaceId, type Plat, type VertexId } from '../../../src/arena/index.js';
import { attachIndex, query } from '../../../src/index/index.js';
import { insertChain, insertTx, planSplitThrough, splitThrough, type InsertTx } from '../../../src/insert/index.js';
import { opSave, rollback } from '../../../src/faces/common.js';
import { openTx } from '../../../src/tx/state.js';
import { planPoint } from '../../../src/insert/splitThrough.js';
import { HOT_PIXEL_CM } from '../../../src/index/index.js';
import { nearestRoutePiece } from '../../../src/insert/attractVertex.js';
import { area2, LATTICE, orient2d, snap, type KernelResult } from '../../../src/num/index.js';
import { tx, type KernelTx, type Overlay } from '../../../src/tx/index.js';
import type { Cm, LatticePoint, PlatKey } from '../../../src/types/index.js';
import { CENSUS_DEEP, div, KEPT_DEEP, kerbCensus, kerbParts, nearestOn, readFace, readKerb, UNLAID_DEEP, type KerbRead, type SpineWidths } from '../../../src/arr/kerb.js';
import { onOutline, outlinePieces } from '../../../src/arr/bandUnion.js';
import { spec } from './support.js';

/** A refusal: its code and detail. */
export interface Refusal {
  readonly code: string;
  readonly detail: string;
}

/**
 * How insertChain alone held the part a dry-run's post-condition refused at (J433, the cause reading): a run end given
 * on a window line placed off its point — attracted within attractCm, or beyond it by §3.6's placement fallback (class
 * (a), `displaced`); two of a run's points merged into one vertex, or the run collapsed, under minEdge (class (b),
 * `merged`); a run no route laid (class (c), `no-route`); or every run held exactly as given (`exact`, the item's own).
 */
export interface Held {
  readonly reading: 'displaced' | 'merged' | 'no-route' | 'exact';
  /** The part's index in the dry-run's order (its row `arr:dry:<i>`). */
  readonly part: number;
  /** The input point the reading is at (a displaced end, the second of two merged points, a no-route run's first point). */
  readonly at?: LatticePoint;
  /** The vertex the insertion held it at (a displaced end's, a merge's), its distance from `at` and that vertex's level before the read (null: a vertex the dry-run made). */
  readonly vertex?: LatticePoint;
  readonly cm?: number;
  readonly level?: number | null;
  /** Every reading of the part's runs (the first is the primary, in the order (a), (b), (c)). */
  readonly all: readonly string[];
}

/** What the replay found: the refusal insertChain alone meets, the chain it refused and whether that chain is well formed. */
export interface Replay extends Refusal {
  readonly where: 'dry-run' | 'overlay' | 'commit';
  readonly chain: LatticePoint[];
  readonly closed: boolean;
  readonly wellFormed: boolean;
  /**
   * The dry-run's hold of the part its post-condition refused at, where insertChain alone met no refusal (code and
   * detail empty then): the cause reading `classify` judges (J433).
   */
  readonly held?: Held;
}

/** The class a refusal falls in: insertChain's (it replays) or the item's own. */
export type RefusalClass = 'insertChain' | 'own';

/** The dry-run's post-conditions (kerb.ts): refusals raised in the item's own code, classed by their cause (J433). */
export const POST_CONDITIONS: readonly string[] = [KEPT_DEEP, CENSUS_DEEP, UNLAID_DEEP];

/** Is the chain well formed: at least two points, no point repeated, no two non-adjacent segments meeting (exact)? */
export function wellFormed(pts: readonly LatticePoint[], closed: boolean): boolean {
  const n = pts.length;
  if (n < 2 || (closed && n < 3)) return false;
  if (new Set(pts.map((q) => `${String(q.x)},${String(q.y)}`)).size !== n) return false;
  const o = (a: LatticePoint, b: LatticePoint, c: LatticePoint): number => {
    const v = (BigInt(b.x) - BigInt(a.x)) * (BigInt(c.y) - BigInt(a.y)) - (BigInt(b.y) - BigInt(a.y)) * (BigInt(c.x) - BigInt(a.x));
    return v > 0n ? 1 : v < 0n ? -1 : 0;
  };
  const on = (a: LatticePoint, b: LatticePoint, c: LatticePoint): boolean =>
    Math.min(a.x, b.x) <= c.x && c.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= c.y && c.y <= Math.max(a.y, b.y);
  const meet = (p1: LatticePoint, p2: LatticePoint, q1: LatticePoint, q2: LatticePoint): boolean => {
    const d1 = o(q1, q2, p1);
    const d2 = o(q1, q2, p2);
    const d3 = o(p1, p2, q1);
    const d4 = o(p1, p2, q2);
    if (d1 * d2 < 0 && d3 * d4 < 0) return true;
    return (d1 === 0 && on(q1, q2, p1)) || (d2 === 0 && on(q1, q2, p2)) || (d3 === 0 && on(p1, p2, q1)) || (d4 === 0 && on(p1, p2, q2));
  };
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i += 1) {
    for (let j = i + 1; j < segs; j += 1) {
      if (j === i + 1 || (closed && i === 0 && j === segs - 1)) continue;
      if (meet(pts[i], pts[(i + 1) % n], pts[j], pts[(j + 1) % n])) return false;
    }
  }
  return true;
}

/** The ring without consecutive repeats (the closing repeat included) — the overlay's reading of a ring. */
function distinct(ring: readonly LatticePoint[]): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (const q of ring) {
    const l = out[out.length - 1];
    if (l === undefined || l.x !== q.x || l.y !== q.y) out.push(q);
  }
  while (out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  return out;
}

/**
 * The scratch overlay's insertions on insertChain alone: a fresh L0 arena, its frame, every distinct segment of the
 * operands as a two-point mandatory chain in input order. The first refusal other than a segment's collapse, or null.
 */
export function replayOverlay(operands: readonly (readonly (readonly LatticePoint[])[])[]): Replay | null {
  const segs: [LatticePoint, LatticePoint][] = [];
  const seen = new Set<string>();
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const op of operands) {
    for (const ringIn of op) {
      const ring = distinct(ringIn);
      const n = ring.length;
      if (n < 2) continue;
      for (let i = 0; i < n; i += 1) {
        const a = ring[i];
        const b = ring[(i + 1) % n];
        minX = Math.min(minX, a.x);
        minY = Math.min(minY, a.y);
        maxX = Math.max(maxX, a.x);
        maxY = Math.max(maxY, a.y);
        const fw = a.x < b.x || (a.x === b.x && a.y < b.y);
        const k = fw ? `${String(a.x)},${String(a.y)},${String(b.x)},${String(b.y)}` : `${String(b.x)},${String(b.y)},${String(a.x)},${String(a.y)}`;
        if (seen.has(k)) continue;
        seen.add(k);
        segs.push([a, b]);
      }
    }
  }
  if (segs.length === 0) return null;
  const q = createPlat({ layer: 'ground', part: 0 } as PlatKey, { widthCm: (2 * LATTICE.rangeCm) as Cm, heightCm: (2 * LATTICE.rangeCm) as Cm, aspect: 1, marginShare: 0 });
  const area = (maxX - minX + 1) * (maxY - minY + 1);
  let cell = 64;
  while (cell < 1_048_576 && cell * cell * Math.max(1, segs.length) < area) cell *= 2;
  attachIndex(q, { gridCellCm: cell });
  const t = insertTx(q, 0);
  const lim = LATTICE.rangeCm - 1;
  const P = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });
  const frame = [P(Math.max(-lim, minX - 4096), Math.max(-lim, minY - 4096)), P(Math.min(lim, maxX + 4096), Math.max(-lim, minY - 4096)), P(Math.min(lim, maxX + 4096), Math.min(lim, maxY + 4096)), P(Math.max(-lim, minX - 4096), Math.min(lim, maxY + 4096))];
  const f = insertChain(t, frame, [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true });
  if (!f.ok) return { where: 'overlay', code: f.code, detail: f.detail, chain: frame, closed: true, wellFormed: true };
  for (let s = 0; s < segs.length; s += 1) {
    const [a, b] = segs[s];
    const r = insertChain(t, [a, b], [{ role: 'invisible', entity: `arr:s${String(s)}` }], 'mandatory');
    if (!r.ok && !(r.code === 'E_DEGENERATE' && r.detail === 'empty')) return { where: 'overlay', code: r.code, detail: r.detail, chain: [a, b], closed: false, wellFormed: wellFormed([a, b], false) };
  }
  return null;
}

/** A clip window's half-plane: the points left of the directed line a → c (or on it), a and c lattice points. */
type Plane = { readonly a: LatticePoint; readonly c: LatticePoint };

/** orient2d of q against the plane's line, exact (BigInt cross product on the lattice points; doubles through their own orientation). */
function sideOf(h: Plane, q: { x: number; y: number }): number {
  return orient2d(h.a.x, h.a.y, h.c.x, h.c.y, q.x, q.y);
}

/**
 * The dry-run's window, from its contract (kerb.ts's module comment): F's convex hull (Andrew's monotone chain on its
 * outer route ring, collinear points dropped), within the box of its L0 face's outer ring.
 */
function windowOf(p: Plat, face: FaceId, outer: readonly LatticePoint[]): Plane[] {
  const q = outer.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  const hull: LatticePoint[] = [];
  for (const pass of [0, 1]) {
    const start = hull.length;
    for (const r of pass === 0 ? q : q.slice().reverse()) {
      while (hull.length >= start + 2 && orient2d(hull[hull.length - 2].x, hull[hull.length - 2].y, hull[hull.length - 1].x, hull[hull.length - 1].y, r.x, r.y) <= 0) hull.pop();
      hull.push(r);
    }
    hull.pop();
  }
  const lim = LATTICE.rangeCm - 1;
  let [x0, y0, x1, y1] = [-lim, -lim, lim, lim];
  const f0 = p.faces[1].parent[face];
  if (f0 >= 0) {
    const O = p.halfEdges.origin;
    const xs = faceWalk(p, 0, f0)[0].map((h) => p.vertices.x[O[h]]);
    const ys = faceWalk(p, 0, f0)[0].map((h) => p.vertices.y[O[h]]);
    [x0, y0, x1, y1] = [Math.max(x0, Math.min(...xs)), Math.max(y0, Math.min(...ys)), Math.min(x1, Math.max(...xs)), Math.min(y1, Math.max(...ys))];
  }
  const P = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });
  const out: Plane[] = [{ a: P(x0, y0), c: P(x1, y0) }, { a: P(x1, y0), c: P(x1, y1) }, { a: P(x1, y1), c: P(x0, y1) }, { a: P(x0, y1), c: P(x0, y0) }];
  for (let i = 0; i < hull.length; i += 1) out.push({ a: hull[i], c: hull[(i + 1) % hull.length] });
  return out;
}

/**
 * A part as the dry-run lays it, from its contract: clipped to the window (Sutherland–Hodgman, each crossing snapped to
 * the lattice, repeats dropped), and laid as the whole ring (closed) where no edge runs along a window line, else as the
 * stretches between such edges (open; a stretch of one point lays nothing).
 */
function laidRuns(ring: readonly LatticePoint[], window: readonly Plane[]): { points: LatticePoint[]; closed: boolean }[] | null {
  type T = { q: { x: number; y: number }; on: Set<number> };
  let pts: T[] = ring.map((q) => ({ q, on: new Set<number>() }));
  const inside = ring.every((q) => window.every((h) => sideOf(h, q) >= 0));
  if (!inside) {
    window.forEach((h, hi) => {
      const out: T[] = [];
      for (let i = 0; i < pts.length; i += 1) {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        const oa = sideOf(h, a.q);
        const ob = sideOf(h, b.q);
        if (oa >= 0) out.push(oa === 0 ? { q: a.q, on: new Set([...a.on, hi]) } : a);
        if ((oa > 0 && ob < 0) || (oa < 0 && ob > 0)) {
          const sc = div(oa, oa - ob);
          if (sc !== null) out.push({ q: { x: a.q.x + sc * (b.q.x - a.q.x), y: a.q.y + sc * (b.q.y - a.q.y) }, on: new Set([hi, ...[...a.on].filter((t) => b.on.has(t))]) });
        }
      }
      pts = out;
    });
  }
  const res: { q: LatticePoint; on: Set<number> }[] = [];
  for (const t of pts) {
    const sn = snap(t.q.x, t.q.y);
    if (!sn.ok) continue;
    const last = res[res.length - 1];
    if (last === undefined || last.q.x !== sn.value.x || last.q.y !== sn.value.y) res.push({ q: sn.value, on: new Set(t.on) });
    else for (const x of t.on) last.on.add(x);
  }
  while (res.length > 1 && res[0].q.x === res[res.length - 1].q.x && res[0].q.y === res[res.length - 1].q.y) {
    const last = res.pop() as { q: LatticePoint; on: Set<number> };
    for (const x of last.on) res[0].on.add(x);
  }
  const n = res.length;
  // a part beyond the window, or touching it along a line only, is no part of the dry-run (it takes no index)
  if (n < 3 || area2(res.map((t) => t.q)) === 0) return null;
  for (const t of res) window.forEach((h, hi) => {
    if (sideOf(h, t.q) === 0) t.on.add(hi);
  });
  const onWindow = res.map((t, i) => [...t.on].some((x) => res[(i + 1) % n].on.has(x)));
  const first = onWindow.indexOf(true);
  if (first < 0) return [{ points: res.map((t) => t.q), closed: true }];
  const out: { points: LatticePoint[]; closed: boolean }[] = [];
  let cur: LatticePoint[] = [];
  for (let j = 1; j <= n; j += 1) {
    const i = (first + j) % n;
    cur.push(res[i].q);
    if (onWindow[i]) {
      if (cur.length >= 2) out.push({ points: cur, closed: false });
      cur = [];
    }
  }
  return out;
}

/** Does one part hold the ring (every vertex inside it or on it, no edge properly crossing it)? The dry-run then lays nothing. */
function coveredBy(parts: readonly (readonly LatticePoint[])[], ring: readonly LatticePoint[]): boolean {
  const inOrOn = (part: readonly LatticePoint[], q: LatticePoint): boolean => {
    let w = 0;
    for (let k = 0; k < part.length; k += 1) {
      const a = part[k];
      const b = part[(k + 1) % part.length];
      const o = orient2d(a.x, a.y, b.x, b.y, q.x, q.y);
      if (o === 0 && q.x >= Math.min(a.x, b.x) && q.x <= Math.max(a.x, b.x) && q.y >= Math.min(a.y, b.y) && q.y <= Math.max(a.y, b.y)) return true;
      if (a.y <= q.y) {
        if (b.y > q.y && o > 0) w += 1;
      } else if (b.y <= q.y && o < 0) w -= 1;
    }
    return w !== 0;
  };
  const proper = (a: LatticePoint, b: LatticePoint, c: LatticePoint, e: LatticePoint): boolean => {
    const o1 = orient2d(a.x, a.y, b.x, b.y, c.x, c.y);
    const o2 = orient2d(a.x, a.y, b.x, b.y, e.x, e.y);
    const o3 = orient2d(c.x, c.y, e.x, e.y, a.x, a.y);
    const o4 = orient2d(c.x, c.y, e.x, e.y, b.x, b.y);
    return ((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) && ((o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0));
  };
  return parts.some((part) => part.length >= 3 && ring.every((q) => inOrOn(part, q)) && !ring.some((a, i) => part.some((c, k) => proper(a, ring[(i + 1) % ring.length], c, part[(k + 1) % part.length]))));
}

/** A segment's key by its two input points, either way round (lattice order). */
function segKey(a: LatticePoint, b: LatticePoint): string {
  const fw = a.x < b.x || (a.x === b.x && a.y < b.y);
  return fw ? `${String(a.x)},${String(a.y)},${String(b.x)},${String(b.y)}` : `${String(b.x)},${String(b.y)},${String(a.x)},${String(a.y)}`;
}

/** The vertices of a path a → b along the edges carrying the row (role, entity): breadth-first, far ends in lattice order; null where none joins them. */
function rowPathOf(p: Plat, role: number, entity: number, a: VertexId, b: VertexId): VertexId[] | null {
  if (a === b) return [a];
  const O = p.halfEdges.origin;
  const carries = (h: number): boolean => rowsOn(p, 'edge', h).some((r) => p.roles.kind[r] === role && p.roles.entity[r] === entity);
  const via = new Map<VertexId, VertexId>([[a, -1 as VertexId]]);
  const queue: VertexId[] = [a];
  for (let i = 0; i < queue.length && !via.has(b); i += 1) {
    const far = outgoing(p, queue[i])
      .filter(carries)
      .map((h) => O[h ^ 1])
      .sort((u, w) => p.vertices.y[u] - p.vertices.y[w] || p.vertices.x[u] - p.vertices.x[w]);
    for (const w of far) {
      if (via.has(w)) continue;
      via.set(w, queue[i]);
      queue.push(w);
    }
  }
  if (!via.has(b)) return null;
  const path: VertexId[] = [b];
  for (let v = b; v !== a; ) {
    v = via.get(v) as VertexId;
    path.push(v);
  }
  return path.reverse();
}

/** A run as the replay laid it: the input (clipped) points, the chain given (shared segments along the held edges), and what insertChain did. */
export interface RunHold {
  readonly input: LatticePoint[];
  readonly closed: boolean;
  readonly status: 'laid' | 'collapsed' | 'no-route';
  /** Per point given, the vertex it became (laid runs). */
  readonly placed: VertexId[];
  readonly given: LatticePoint[];
}

/**
 * The cause reading of one part's hold (J433), read before the replay is put back: (a) an open run's end (on a window
 * line) held off its input point — its distance, and the level of the vertex it was held at (null: one the dry-run
 * made); (b) two of a run's given points held at one vertex, or the run collapsed (minEdge); (c) a run no route laid;
 * else `exact`. Every reading is listed; the primary is the first in the order (a), (b), (c), of one reading the largest move.
 */
export function holdOf(p: Plat, part: number, runs: readonly RunHold[], made: ReadonlySet<VertexId>): Held {
  const at = (v: VertexId): LatticePoint => pointOf(p, v);
  const found: Omit<Held, 'all'>[] = [];
  const text: string[] = [];
  for (const run of runs) {
    if (run.status === 'no-route') {
      found.push({ reading: 'no-route', part, at: run.input[0] });
      text.push(`no-route from (${String(run.input[0].x)}, ${String(run.input[0].y)})`);
      continue;
    }
    if (run.status === 'collapsed') {
      found.push({ reading: 'merged', part, at: run.input[0] });
      text.push(`collapsed at (${String(run.input[0].x)}, ${String(run.input[0].y)})`);
      continue;
    }
    if (!run.closed) {
      for (const [k, q] of [[0, run.input[0]], [run.placed.length - 1, run.input[run.input.length - 1]]] as const) {
        const v = run.placed[k];
        const h = at(v);
        if (h.x === q.x && h.y === q.y) continue;
        const cm = Math.round(Math.hypot(h.x - q.x, h.y - q.y) * 100) / 100;
        const level = made.has(v) ? null : p.vertices.level[v];
        found.push({ reading: 'displaced', part, at: q, vertex: h, cm, level });
        text.push(`displaced (${String(q.x)}, ${String(q.y)}) -> (${String(h.x)}, ${String(h.y)}) ${String(cm)} cm${cm > LATTICE.attractCm ? ' (fallback)' : ''} onto ${level === null ? 'a vertex it made' : `an L${String(level)} vertex`}`);
      }
    }
    const segs = run.closed ? run.placed.length : run.placed.length - 1;
    for (let k = 0; k < segs; k += 1) {
      const u = run.placed[k];
      const w = run.placed[(k + 1) % run.placed.length];
      if (u !== w) continue;
      // the given point the merge moved (of the two, the one off the vertex they share)
      const h = at(u);
      const q0 = run.given[k];
      const q = q0.x !== h.x || q0.y !== h.y ? q0 : run.given[(k + 1) % run.given.length];
      const cm = Math.round(Math.hypot(h.x - q.x, h.y - q.y) * 100) / 100;
      found.push({ reading: 'merged', part, at: q, vertex: h, cm, level: made.has(u) ? null : p.vertices.level[u] });
      text.push(`merged (${String(q.x)}, ${String(q.y)}) into (${String(h.x)}, ${String(h.y)}) ${String(cm)} cm`);
    }
  }
  const order = ['displaced', 'merged', 'no-route'];
  // the primary: the first reading in the order (a), (b), (c), and of one reading the largest move
  found.sort((u, w) => order.indexOf(u.reading) - order.indexOf(w.reading) || (w.cm ?? 0) - (u.cm ?? 0));
  return found.length === 0 ? { reading: 'exact', part, all: [] } : { ...found[0], all: text };
}

/** The segments a part laid, by their input points (`segKey`): the vertices its ends became, its row's entity, its first end. */
export type LaidSegs = Map<string, { a: VertexId; b: VertexId; entity: number; ax: number; ay: number }>;

/**
 * One run laid as the dry-run lays it (from its contract): a segment an earlier part laid — the same two input points,
 * either way round — is given through the vertices that part's segment became, along its row's edges (the dry-run's
 * `sharedPath`: the two parts hold one boundary there); every index pinned; a collapse or a run no route lays is
 * recorded, any other refusal returned. A run laid with no shared segment records its segments for the later parts.
 */
export function layRun(sh: InsertTx, segs: LaidSegs, name: string, run: { points: LatticePoint[]; closed: boolean }): RunHold | Replay {
  const p = sh.plat;
  const role = roleIdOf('invisible');
  const n = run.points.length;
  const nseg = run.closed ? n : n - 1;
  const given: LatticePoint[] = [];
  let shared = false;
  const push = (q: LatticePoint): void => {
    const l = given[given.length - 1];
    if (l === undefined || l.x !== q.x || l.y !== q.y) given.push(q);
  };
  for (let k = 0; k < nseg; k += 1) {
    const a = run.points[k];
    const b = run.points[(k + 1) % n];
    const held = segs.get(segKey(a, b));
    const path = held === undefined ? null : rowPathOf(p, role, held.entity, held.a, held.b);
    if (held === undefined || path === null) {
      push(a);
      if (!run.closed && k === nseg - 1) push(b);
      continue;
    }
    shared = true;
    const along = held.ax === a.x && held.ay === a.y ? path : path.slice().reverse();
    along.forEach((v, i) => {
      if (i < along.length - 1 || (!run.closed && k === nseg - 1)) push(pointOf(p, v));
    });
  }
  if (run.closed && given.length > 1 && given[0].x === given[given.length - 1].x && given[0].y === given[given.length - 1].y) given.pop();
  const chain = shared ? given : run.points;
  const r = insertChain(sh, chain, [{ role: 'invisible', entity: name }], 'mandatory', { closed: run.closed, pinned: chain.map((_, k) => k) });
  if (!r.ok) {
    const collapsed = r.code === 'E_DEGENERATE' && r.detail === 'empty';
    if (collapsed || (r.code === 'E_INVARIANT' && r.detail.startsWith('insert: no route from'))) return { input: run.points, closed: run.closed, status: collapsed ? 'collapsed' : 'no-route', placed: [], given: chain };
    return { where: 'dry-run', code: r.code, detail: r.detail, chain, closed: run.closed, wellFormed: wellFormed(chain, run.closed) };
  }
  if (!shared) {
    const pl = r.value.placed;
    for (let k = 0; k < nseg; k += 1) {
      const key = segKey(run.points[k], run.points[(k + 1) % n]);
      if (!segs.has(key)) segs.set(key, { a: pl[k], b: pl[(k + 1) % n], entity: handleOf(p, name), ax: run.points[k].x, ay: run.points[k].y });
    }
  }
  return { input: run.points, closed: run.closed, status: 'laid', placed: r.value.placed.slice(), given: chain };
}

/**
 * kerb(F)'s dry-run on insertChain alone (see the module comment), on the open overlay the read was refused in, rolled
 * back after: the parts laid as the dry-run lays them — clipped to its window, a segment an earlier part laid laid along
 * that part's held edges (the dry-run's `sharedPath`, from its contract: the run given through the vertices the earlier
 * segment became, along its row), a run collapsing (E_DEGENERATE `empty`) or no route laying it left out as the dry-run
 * leaves it. The first refusal insertChain meets other than those; else, where the read's post-condition refused at a
 * part (kerb.ts's `kerbCensus`), that part's hold (`holdOf`, J433's cause reading) with empty code and detail; else
 * null. Read right after the refused read (the arena's last read names its census and its refusing place).
 */
export function replayKerb(o: Overlay, face: FaceId, ws: SpineWidths, vertexContacts = true): Replay | null {
  const p = o.plat;
  const f = readFace(p, face, ws, undefined, vertexContacts);
  const census = kerbCensus(p);
  const last = census !== null && census.face === face ? census : null;
  const reaching = new Set(last?.reaching ?? []);
  const edge = f.spines.size === 0 ? { ok: true as const, value: [] } : kerbParts(f.rings, f.spines);
  const vertex = kerbParts(f.rings, new Map(f.through.filter((s) => reaching.has(s.key)).map((s) => [s.key, s])));
  if (!edge.ok || !vertex.ok) return null;
  const stages = [edge.value, vertex.value].filter((parts) => parts.length > 0 && !coveredBy(parts, f.rings[0]));
  if (stages.length === 0) return null;
  const window = windowOf(p, face, f.rings[0]);
  const t = openTx(o);
  const save = opSave(t);
  try {
    // at the level the parts are laid at: the batch's, at least L2 (corridorUnion's)
    const sh = insertTx(p, o.level < 2 ? 2 : o.level);
    const segs: LaidSegs = new Map();
    const holds: RunHold[][] = [];
    for (const parts of stages) {
      for (const part of parts) {
        const runs = laidRuns(part, window);
        if (runs === null) continue;
        const name = `arr:dry:${String(holds.length)}`;
        const mine: RunHold[] = [];
        holds.push(mine);
        for (const run of runs) {
          const r = layRun(sh, segs, name, run);
          if ('where' in r) return r;
          mine.push(r);
        }
      }
    }
    const at = last?.refusedAt ?? null;
    if (at === null || at.part >= holds.length) return null;
    const runs = holds[at.part];
    const held = holdOf(p, at.part, runs, new Set(sh.journal.vertices));
    const first = runs[0] ?? { input: [], closed: false };
    return { where: 'dry-run', code: '', detail: '', chain: first.input, closed: first.closed, wellFormed: runs.length > 0 && runs.every((r) => wellFormed(r.input, r.closed)), held };
  } finally {
    rollback(t, save, { ok: false, code: 'E_INVARIANT', detail: 'replay: put back' });
  }
}

/** A replay's cause, for the register line (N-44 (4)): the reading and its evidence, or the refusal insertChain met. */
export function causeOf(replay: Replay | null): string {
  if (replay === null) return 'no replay';
  if (replay.held === undefined) return `replays ${replay.code} ${replay.detail.slice(0, 60)}`;
  return `${replay.held.reading} part ${String(replay.held.part)}${replay.held.all.length > 0 ? `: ${replay.held.all.join('; ')}` : ''}`;
}

/** tileRings' overlay on insertChain alone: every ring its own operand. */
export function replayTile(rings: readonly (readonly LatticePoint[])[]): Replay | null {
  return replayOverlay(rings.map((r) => [r]));
}

/** A band commit to replay: the arena builder (a fresh copy each call), the batch, the widths, the outline's row and entity. */
export interface CommitSpec {
  readonly build: () => { p: Plat; faces: FaceId[] };
  readonly level: 2 | 3;
  readonly over: Partial<KernelTx>;
  readonly widths: SpineWidths;
  readonly edgeRole: 'kerb' | 'band';
  readonly entityOf: (p: Plat, face: FaceId) => string;
  /** The engine's census of a face's spines (J318, C-0380): corridorUnion's through its route vertices too (the default), bandUnion's not. */
  readonly vertexContacts?: boolean;
}

/** Is q within the hot pixel (1 cm) of a route ring edge of the face (N-57 (2)'s boundary reading)? */
function onRings(rings: readonly (readonly LatticePoint[])[], q: LatticePoint): boolean {
  return rings.some((r) => r.some((a, i) => nearestOn(q, a, r[(i + 1) % r.length]).d2 <= 1));
}

const ATTRACT_SQ = LATTICE.attractCm * LATTICE.attractCm;
const PIN_SQ = (1 + HOT_PIXEL_CM) * (1 + HOT_PIXEL_CM);
const CHORD_MAX = LATTICE.attractCm + 1;
const ALONG_SQ = 8 * LATTICE.attractCm * LATTICE.attractCm;
const d2 = (a: LatticePoint, b: LatticePoint): number => (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);

/** A contact pinned on the doors: the vertex at it, else `splitThrough` of the route piece of F's boundary when its plan lands within `reach2`. */
function pinOnDoors(o: Overlay, rings: readonly LatticePoint[][], c: LatticePoint, reach2: number): { pin: VertexId | null; refusal: Replay | null } {
  const p = o.plat;
  const near = query(p, o.key, o.level, { minX: c.x - 2, minY: c.y - 2, maxX: c.x + 2, maxY: c.y + 2 }, { vertices: true, edges: true });
  const at = near.vertices.find((v) => isVertexLive(p, v) && p.vertices.x[v] === c.x && p.vertices.y[v] === c.y);
  if (at !== undefined) return { pin: at, refusal: null };
  const piece = nearestRoutePiece(p, near.edges, c, o.level);
  if (piece === null || !onRings(rings, pointOf(p, piece.a)) || !onRings(rings, pointOf(p, piece.b))) return { pin: null, refusal: null };
  const plan = planSplitThrough(o, piece.edge, c);
  if (!plan.ok) return { pin: null, refusal: { where: 'commit', code: plan.code, detail: plan.detail, chain: [c], closed: false, wellFormed: false } };
  if (d2(planPoint(p, plan.value), c) > reach2) return { pin: null, refusal: null };
  const v = splitThrough(o, piece.edge, c);
  if (!v.ok) return { pin: null, refusal: { where: 'commit', code: v.code, detail: v.detail, chain: [c], closed: false, wellFormed: false } };
  return { pin: v.value, refusal: null };
}

/** The engine's `runVertex` on the doors' reads: the route piece's end the kerb's run along F's boundary reaches first from c. */
function runVertexOnDoors(o: Overlay, read: KerbRead, contacts: readonly LatticePoint[], c: LatticePoint): VertexId | null {
  const p = o.plat;
  const near = query(p, o.key, o.level, { minX: c.x - 2, minY: c.y - 2, maxX: c.x + 2, maxY: c.y + 2 }, { edges: true });
  const piece = nearestRoutePiece(p, near.edges, c, o.level);
  if (piece === null) return null;
  const a = pointOf(p, piece.a);
  const b = pointOf(p, piece.b);
  if (!onRings(read.rings, a) || !onRings(read.rings, b)) return null;
  const da = d2(a, c);
  const db = d2(b, c);
  const order = da < db || (da === db && (a.y < b.y || (a.y === b.y && a.x <= b.x))) ? [piece.a, piece.b] : [piece.b, piece.a];
  for (const v of order) {
    const e = pointOf(p, v);
    if (!onRings(read.kerb, e) || !onRings(read.kerb, { x: ((c.x + e.x) * 0.5) as Cm, y: ((c.y + e.y) * 0.5) as Cm })) continue;
    if (!contacts.some((q) => (q.x !== c.x || q.y !== c.y) && d2(q, e) > 1 && nearestOn(q, c, e).d2 <= 1)) return v;
  }
  return null;
}

/** Is q strictly inside the face's route rings (non-zero winding) and off their hot pixel (the engine's `insideRings`)? */
function insideF(rings: readonly (readonly LatticePoint[])[], q: LatticePoint): boolean {
  if (onRings(rings, q)) return false;
  let wind = 0;
  for (const r of rings) {
    for (let k = 0; k < r.length; k += 1) {
      const a = r[k];
      const b = r[(k + 1) % r.length];
      const o2 = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
      if (a.y <= q.y) {
        if (b.y > q.y && o2 > 0) wind += 1;
      } else if (b.y <= q.y && o2 < 0) wind -= 1;
    }
  }
  return wind !== 0;
}

/** The engine's `pieceWidth`: how far the piece's vertices and segment midpoints stand from F's boundary at most (cm). */
function widthOf(rings: readonly (readonly LatticePoint[])[], q: readonly LatticePoint[]): number {
  const far = (z: { x: number; y: number }): number => Math.min(...rings.flatMap((r) => r.map((a, i) => nearestOn(z, a, r[(i + 1) % r.length]).d2)));
  let w = 0;
  for (let i = 0; i < q.length; i += 1) {
    w = Math.max(w, far(q[i]));
    if (i + 1 < q.length) w = Math.max(w, far({ x: (q[i].x + q[i + 1].x) * 0.5, y: (q[i].y + q[i + 1].y) * 0.5 }));
  }
  return Math.sqrt(w);
}

/** A sliver piece to fold: "face piece fold" (the engine's key). */
const foldKey = (face: FaceId, piece: number): string => `${String(face)} ${String(piece)} fold`;

/** An end of an open piece to pin first: "face piece end" (the engine's key). */
const endKey = (face: FaceId, piece: number, end: 0 | 1): string => `${String(face)} ${String(piece)} ${String(end)}`;

/** What one replay run met: a door's refusal, an end to pin first on the next run, or the engine's own stop (null). */
type Step = { kind: 'refusal'; replay: Replay } | { kind: 'retry'; key: string } | { kind: 'stop' } | null;

/**
 * N-57 (2)'s closing of an open piece's dangling ends, on the doors alone: an end vertex with one edge within
 * attractCm + 1 cm of its contact gets the contact pinned AT it (the vertex at it, else a `splitThrough` of the route
 * piece of F's boundary when the placement lands within the contact's 1 cm plus the hot pixel) and the chord from the
 * tip to it through `insertChain`; an end that cannot be closed so is named for the next run.
 */
function closeOnDoors(o: Overlay, read: KerbRead, contacts: readonly LatticePoint[], index: number, pts: readonly LatticePoint[], ends: VertexId[], rows: { role: string; entity: string }[], pinned: ReadonlySet<string>): Step {
  const p = o.plat;
  const rings = read.rings;
  const face = read.face;
  for (const k of [0, 1] as const) {
    const tip = ends[k];
    if ([...outgoing(p, tip)].length !== 1 || pinned.has(endKey(face, index, k))) continue;
    if (!insideF(rings, pointOf(p, tip))) continue;
    const c = k === 0 ? pts[0] : pts[pts.length - 1];
    const off2 = d2(pointOf(p, tip), c);
    if (off2 > ALONG_SQ) return { kind: 'retry', key: endKey(face, index, k) };
    const pin = off2 <= CHORD_MAX * CHORD_MAX ? pinOnDoors(o, rings, c, PIN_SQ) : { pin: null, refusal: null };
    if (pin.refusal !== null) return { kind: 'refusal', replay: pin.refusal };
    if (pin.pin === null) {
      // the engine's along-run closing: the tip joined to the run's first vertex; refused, the end is pinned first
      const far = runVertexOnDoors(o, read, contacts, c);
      if (far !== null && far !== tip) {
        const along = k === 0 ? [pointOf(p, far), pointOf(p, tip)] : [pointOf(p, tip), pointOf(p, far)];
        const ins = insertChain(o, along, rows, 'mandatory');
        if (!ins.ok && ins.code === 'E_WORK_LIMIT') return { kind: 'refusal', replay: { where: 'commit', code: ins.code, detail: ins.detail, chain: along, closed: false, wellFormed: wellFormed(along, false) } };
        if (ins.ok) {
          ends[k] = far;
          continue;
        }
      }
      return { kind: 'retry', key: endKey(face, index, k) };
    }
    if (pin.pin === tip) continue;
    const chord = k === 0 ? [pointOf(p, pin.pin), pointOf(p, tip)] : [pointOf(p, tip), pointOf(p, pin.pin)];
    const ins = insertChain(o, chord, rows, 'mandatory');
    if (!ins.ok && !(ins.code === 'E_DEGENERATE' && ins.detail === 'empty')) return { kind: 'refusal', replay: { where: 'commit', code: ins.code, detail: ins.detail, chain: chord, closed: false, wellFormed: wellFormed(chord, false) } };
    if (ins.ok) ends[k] = pin.pin;
  }
  return null;
}

/**
 * A piece with ends pinned first, on the doors alone (the engine's `insertPinned`): each named end's contact pinned
 * within attractCm, the piece's vertices beside it within attractCm dropped, the piece inserted onto the pins.
 */
function insertPinnedOnDoors(o: Overlay, rings: readonly LatticePoint[][], face: FaceId, index: number, q: readonly LatticePoint[], rows: { role: string; entity: string }[], pinned: ReadonlySet<string>): { step: Step; pts: LatticePoint[]; placed: VertexId[] | null } {
  const p = o.plat;
  const marked = [pinned.has(endKey(face, index, 0)), pinned.has(endKey(face, index, 1))];
  let lo = 0;
  let hi = q.length - 1;
  if (marked[0]) {
    lo = 1;
    while (lo < hi && d2(q[lo], q[0]) <= ATTRACT_SQ) lo += 1;
  }
  if (marked[1]) {
    hi = q.length - 2;
    while (hi > lo && d2(q[hi], q[q.length - 1]) <= ATTRACT_SQ) hi -= 1;
  }
  const pts = lo <= hi ? q.slice(lo, hi + 1) : [];
  for (const k of [0, 1] as const) {
    if (!marked[k]) continue;
    const pin = pinOnDoors(o, rings, k === 0 ? q[0] : q[q.length - 1], ATTRACT_SQ);
    if (pin.refusal !== null) return { step: { kind: 'refusal', replay: pin.refusal }, pts, placed: null };
    // a contact that cannot be pinned is the engine's own refusal
    if (pin.pin === null) return { step: { kind: 'stop' }, pts, placed: null };
    if (k === 0) pts.unshift(pointOf(p, pin.pin));
    else pts.push(pointOf(p, pin.pin));
  }
  const ins = insertChain(o, pts, rows, 'mandatory');
  if (!ins.ok && !(ins.code === 'E_DEGENERATE' && ins.detail === 'empty')) return { step: { kind: 'refusal', replay: { where: 'commit', code: ins.code, detail: ins.detail, chain: pts, closed: false, wellFormed: wellFormed(distinct(pts), false) } }, pts, placed: null };
  return { step: null, pts, placed: ins.ok ? [ins.value.placed[0], ins.value.placed[ins.value.placed.length - 1]] : null };
}

/**
 * A band commit on insertChain alone: on a fresh copy of the arena, in a batch of the op's level, every face's kerb read
 * (a read's refusal replayed on its overlay), then per face in canonical order its outline pieces and its splits (the
 * ones the engine draws: their kerb point on the outline) — each through `insertChain` directly; an end the closing
 * cannot close at its contact starts the replay again on a fresh copy with that end pinned first. The first refusal
 * other than a collapse, or null.
 */
export function replayCommit(c: CommitSpec): Replay | null {
  const pinned = new Set<string>();
  for (;;) {
    const { p, faces } = c.build();
    const unique = [...new Set(faces)].sort((a, b) => compareFaces(p, 1, a, b));
    let found: Step = null;
    const outlineRole = roleIdOf(c.edgeRole);
    const deferred: { v: VertexId; key: string | null }[] = [];
    tx(p, spec(c.level, c.over), (o: Overlay): KernelResult<null> => {
      const stop: KernelResult<null> = { ok: false, code: 'E_INVARIANT', detail: 'replay: stop' };
      // every face's kerb read first, in the op's own batch (read-all-then-write, as the engine's writeOutlines)
      const reads: KerbRead[] = [];
      for (const f of unique) {
        const r = readKerb(o, f, c.widths, undefined, c.vertexContacts ?? true);
        if (!r.ok) {
          const rp = replayKerb(o, f, c.widths, c.vertexContacts ?? true);
          found = rp === null ? { kind: 'stop' } : { kind: 'refusal', replay: rp };
          return stop;
        }
        reads.push(r.value);
      }
      for (const read of reads) {
        if (read.spines.size === 0) continue;
        const entity = c.entityOf(p, read.face);
        const rows = [{ role: c.edgeRole, entity }];
        const pieces = outlinePieces(read);
        const contacts = pieces.filter((q) => !q.closed).flatMap((q) => [q.points[0], q.points[q.points.length - 1]]);
        for (let i = 0; i < pieces.length; i += 1) {
          const piece = pieces[i];
          if (!piece.closed && pinned.has(foldKey(read.face, i))) continue;
          const fold = (): boolean => !pinned.has(foldKey(read.face, i)) && widthOf(read.rings, piece.points) <= LATTICE.attractCm;
          let pts = piece.points;
          let placed: VertexId[] | null;
          if (!piece.closed && (pinned.has(endKey(read.face, i, 0)) || pinned.has(endKey(read.face, i, 1)))) {
            const pf = insertPinnedOnDoors(o, read.rings, read.face, i, piece.points, rows, pinned);
            if (pf.step !== null) {
              // an unpinnable contact: the engine folds a sliver piece, else refuses on its own
              found = pf.step.kind === 'stop' && fold() ? { kind: 'retry', key: foldKey(read.face, i) } : pf.step;
              return stop;
            }
            if (pf.placed === null) continue;
            pts = pf.pts;
            placed = pf.placed;
          } else {
            const ins = insertChain(o, piece.points, rows, 'mandatory', piece.closed ? { closed: true } : {});
            if (!ins.ok && !(ins.code === 'E_DEGENERATE' && ins.detail === 'empty')) {
              found = { kind: 'refusal', replay: { where: 'commit', code: ins.code, detail: ins.detail, chain: piece.points, closed: piece.closed, wellFormed: wellFormed(distinct(piece.points), piece.closed) } };
              return stop;
            }
            if (!ins.ok || piece.closed) continue;
            placed = ins.value.placed;
          }
          const ends = [placed[0], placed[placed.length - 1]];
          const closing = closeOnDoors(o, read, contacts, i, pts, ends, rows, pinned);
          if (closing !== null) {
            found = closing;
            return stop;
          }
          // the engine's post-condition: a dangling tip inside F folds a sliver piece or is the engine's own refusal;
          // one across F's boundary is judged once every face is in
          for (const v of ends) {
            if ([...outgoing(p, v)].length !== 1) continue;
            if (!insideF(read.rings, pointOf(p, v))) {
              deferred.push({ v, key: fold() ? foldKey(read.face, i) : null });
              continue;
            }
            found = fold() ? { kind: 'retry', key: foldKey(read.face, i) } : { kind: 'stop' };
            return stop;
          }
        }
        for (const pts of read.splits) {
          if (!onOutline(p, p.key, pts[1], outlineRole)) continue;
          const ins = insertChain(o, pts, [{ role: 'corridor_split', entity }], 'mandatory');
          if (!ins.ok && !(ins.code === 'E_DEGENERATE' && ins.detail === 'empty')) {
            found = { kind: 'refusal', replay: { where: 'commit', code: ins.code, detail: ins.detail, chain: pts, closed: false, wellFormed: wellFormed(pts, false) } };
            return stop;
          }
        }
      }
      for (const d of deferred) {
        if ([...outgoing(p, d.v)].length !== 1) continue;
        found = d.key !== null ? { kind: 'retry', key: d.key } : { kind: 'stop' };
        return stop;
      }
      return { ok: false, code: 'E_INVARIANT', detail: 'replay: done' };
    });
    const step = found as Step;
    if (step === null || step.kind === 'stop') return null;
    if (step.kind === 'refusal') return step.replay;
    if (pinned.has(step.key)) return null;
    pinned.add(step.key);
  }
}

/**
 * The class of an operation's refusal (N-44 (3): 'a refusal caused in the item's own code'; RULING J433: the class
 * follows the cause). insertChain's when the replay meets the same code and detail on a well-formed chain; and, for a
 * refusal raised by the dry-run's own post-conditions (KEPT_DEEP, CENSUS_DEEP, UNLAID_DEEP), when the replay of the same
 * parts through insertChain alone shows the INSERTION changed the part at the refusing place — a run end held off its
 * point (a), a merge or collapse under minEdge (b), a run with no route (c) — the part's input well formed. The item's
 * own otherwise: a post-condition firing where the replay holds the part exactly as given.
 */
export function classify(r: Refusal, replay: Replay | null): RefusalClass {
  if (replay === null || !replay.wellFormed) return 'own';
  if (replay.held === undefined) return replay.code === r.code && replay.detail === r.detail ? 'insertChain' : 'own';
  return POST_CONDITIONS.includes(r.detail) && replay.held.reading !== 'exact' ? 'insertChain' : 'own';
}
