// The arrangement's scratch overlay and its winding-number labels (§3.7 *Decision*; §3.4 `booleans`, `buffer`,
// `offsetFace`, `insetRing`; §17.1 (8) "arrangement booleans by winding number"). M0-a-08.
//
// A boolean "overlays both operands' rings, labels every face with its winding numbers (a breadth-first walk from the
// unbounded face that adds each crossed edge's ring orientation), keeps the faces the operation and fill rule select …
// and removes the edges that separate two kept faces" (§3.7). The overlay is built from the insertion machinery
// (M0-a-05's `insertChain`) on a scratch arena of its own — one level (L0), no table, no stage, never persisted or
// digested, gone when the call returns — so every output vertex and edge obeys the insertion rules (attraction,
// placement, `minEdge`, clearance) with no re-snap round trip.
//
// How the orientation is kept (C-0196 (1)): every input segment is inserted as its own two-point mandatory chain under
// one scratch `invisible` row whose entity names the segment, so after every insertion the edges a segment became —
// split by later crossings, routed through hot pixels, shared with another chain — are exactly the edges carrying its
// row; their direction is the path they give from the vertex the segment's first point became to the vertex its last
// point became (edges attraction folded off that path carry nothing). A
// segment that repeats an earlier one exactly (the same two lattice points, either direction) is entered once with its
// multiplicity per operand, so a shared stretch that moves nothing — the buffer's strips and joins meet along such
// segments by construction — is no `W_STRETCH_SHARED` (§3.7: the attraction warnings mark a move). A segment whose two
// points became one vertex (step 1's collapse, `E_DEGENERATE` `empty`) adds nothing.
//
// The labels: the face on the left of every half-edge (the arena's L0 face records, outer ring and holes; a half-edge
// in no record bounds the unbounded outside, −1), and per face one winding number per operand, from the outside's
// zeros by a breadth-first walk across the faces' half-edges: w(right of h) = w(left of h) − net(h), net(h) the
// operand's traversals along h less those against it. The kept region's boundary — every half-edge whose left face is
// kept and whose right face is not — is traced around the kept faces (an edge with a kept face on both sides is the
// removed edge), cut into simple rings at a vertex the trace visits twice, its straight-through vertices dropped:
// outer rings counter-clockwise, holes clockwise, each starting at its lowest-leftmost vertex, in that vertex order.
import {
  createPlat,
  faceWalk,
  handleOf,
  isFaceLive,
  isHalfEdgeLive,
  roleIdOf,
  rowsOn,
  type FaceId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import { attachIndex } from '../index/index.js';
import { addWarning, insertTx, type InsertTx } from '../insert/classes.js';
import { insertChain } from '../insert/insertChain.js';
import { area2, degenerate, err, LATTICE, ok, orient2d, type KernelResult, type Warning } from '../num/index.js';
import type { Cm, LatticePoint, PlatKey, Polygon } from '../types/index.js';
import { offLattice } from '../geom/common.js';

/** One ring (§2.8's `Polygon`): lattice points, the closing vertex not repeated; outer rings counter-clockwise, holes clockwise. */
export type Ring = Polygon;

/** The scratch overlay's arena key: a ground arena by shape only — the overlay is never persisted, digested or keyed into a document. */
const SCRATCH_KEY: PlatKey = { layer: 'ground', part: 0 };

/** The scratch overlay's one row: the non-structural `invisible` edge role, its entity naming the input segment. */
const SCRATCH_ROLE = 'invisible';

/** The scratch overlay: its arena, the operand count, every edge pair's net traversals per operand, the warnings. */
export interface ScratchOverlay {
  readonly plat: Plat;
  /** The operands overlaid (a boolean's two, a buffer's one, an offset's two). */
  readonly operands: number;
  /**
   * Per edge pair e and operand j, at `e * operands + j`: the operand's ring traversals along the pair's even
   * half-edge (2e) less those along its odd one.
   */
  readonly net: Int32Array;
  /** Every warning the overlay's insertions reported, aggregated by code (the operation reports them, §3.7's split). */
  readonly warnings: Warning[];
}

/** The winding labels of an overlay's faces (`windingLabels`). */
export interface WindingLabels {
  readonly operands: number;
  /** Per half-edge: the L0 face record on its left, −1 for the unbounded outside, −2 for a slot that is not live. */
  readonly faceOf: Int32Array;
  /** Per face (−1 the outside): one winding number per operand. */
  readonly winding: ReadonlyMap<FaceId, readonly number[]>;
  /** False when two walks gave one face different numbers — an overlay whose orientation broke (never on a valid overlay). */
  readonly consistent: boolean;
}

/** One input segment: its two lattice points and its multiplicity per operand (signed: −1 for a reversed repeat). */
interface Segment {
  readonly a: LatticePoint;
  readonly b: LatticePoint;
  readonly mult: Int32Array;
}

/** How far the scratch overlay's frame stands beyond the inputs' box, in cm (well beyond `attractCm`). */
const FRAME_MARGIN_CM = 4096;

/** The grid cell of the overlay's index: about one segment per cell over the inputs' box, 64 cm … 2²⁰ cm. */
function gridCellFor(minX: number, minY: number, maxX: number, maxY: number, segments: number): number {
  const area = (maxX - minX + 1) * (maxY - minY + 1);
  let cell = 64;
  while (cell < 1_048_576 && cell * cell * Math.max(1, segments) < area) cell *= 2;
  return cell;
}

/** The ring without consecutive repeats (the closing repeat included). */
function distinct(ring: readonly LatticePoint[]): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (const p of ring) {
    const q = out[out.length - 1];
    if (q === undefined || q.x !== p.x || q.y !== p.y) out.push(p);
  }
  while (out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  return out;
}

/**
 * The scratch overlay of the operands' rings (each operand a ring list, read under one fill rule by its caller): every
 * segment inserted through `insertChain` in input order, then each segment's edges oriented. E_OUT_OF_RANGE for a
 * coordinate off the lattice (§3.2 (1), (7)); any other refusal of the insertion is passed on (none is expected: the
 * scratch arena has one level, no kept content and no work limit).
 */
export function buildOverlay(operands: readonly (readonly (readonly LatticePoint[])[])[]): KernelResult<ScratchOverlay> {
  const k = operands.length;
  const segments: Segment[] = [];
  const byKey = new Map<string, number>();
  /** Every ring as it was given: its operand and its segments in order, each signed (+ along the segment's a → b). */
  const walks: { operand: number; steps: number[] }[] = [];
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let j = 0; j < k; j += 1) {
    for (const ringIn of operands[j]) {
      const bad = offLattice<ScratchOverlay>(ringIn);
      if (bad !== null) return bad;
      const ring = distinct(ringIn);
      const n = ring.length;
      if (n < 2) continue;
      const steps: number[] = [];
      walks.push({ operand: j, steps });
      for (let i = 0; i < n; i += 1) {
        const a = ring[i];
        const b = ring[i + 1 === n ? 0 : i + 1];
        if (a.x < minX) minX = a.x;
        if (a.y < minY) minY = a.y;
        if (a.x > maxX) maxX = a.x;
        if (a.y > maxY) maxY = a.y;
        const forward = a.x < b.x || (a.x === b.x && a.y < b.y);
        const key = forward ? `${a.x},${a.y},${b.x},${b.y}` : `${b.x},${b.y},${a.x},${a.y}`;
        const at = byKey.get(key);
        if (at === undefined) {
          const mult = new Int32Array(k);
          mult[j] = 1;
          byKey.set(key, segments.length);
          steps.push(segments.length + 1);
          segments.push({ a, b, mult });
        } else {
          const s = segments[at];
          const same = s.a.x === a.x && s.a.y === a.y;
          s.mult[j] += same ? 1 : -1;
          steps.push(same ? at + 1 : -(at + 1));
        }
      }
    }
  }
  const plat = createPlat(SCRATCH_KEY, { widthCm: (2 * LATTICE.rangeCm) as Cm, heightCm: (2 * LATTICE.rangeCm) as Cm, aspect: 1, marginShare: 0 });
  attachIndex(plat, { gridCellCm: segments.length === 0 ? 64 : gridCellFor(minX, minY, maxX, maxY, segments.length) });
  const tx: InsertTx = insertTx(plat, 0);
  // The frame (C-0196 (1)): a box FRAME_MARGIN_CM beyond the inputs, inserted first, so every input ring lands inside one
  // bounded face record and a ring that encloses an earlier one takes it as its hole (the unbounded outside of an L0
  // without a frame keeps no ring list to re-home). Its row names no segment, so it carries no winding.
  if (segments.length > 0) {
    const lim = LATTICE.rangeCm - 1;
    const fx0 = Math.max(-lim, minX - FRAME_MARGIN_CM);
    const fy0 = Math.max(-lim, minY - FRAME_MARGIN_CM);
    const fx1 = Math.min(lim, maxX + FRAME_MARGIN_CM);
    const fy1 = Math.min(lim, maxY + FRAME_MARGIN_CM);
    const frame: LatticePoint[] = [
      { x: fx0 as Cm, y: fy0 as Cm },
      { x: fx1 as Cm, y: fy0 as Cm },
      { x: fx1 as Cm, y: fy1 as Cm },
      { x: fx0 as Cm, y: fy1 as Cm },
    ];
    const f = insertChain(tx, frame, [{ role: SCRATCH_ROLE, entity: 'arr:frame' }], 'mandatory', { closed: true });
    if (!f.ok) return err(f.code, f.detail);
  }
  const starts: VertexId[] = new Array<VertexId>(segments.length).fill(-1);
  const ends: VertexId[] = new Array<VertexId>(segments.length).fill(-1);
  for (let s = 0; s < segments.length; s += 1) {
    const seg = segments[s];
    const r = insertChain(tx, [seg.a, seg.b], [{ role: SCRATCH_ROLE, entity: `arr:s${s}` }], 'mandatory');
    if (r.ok) {
      starts[s] = r.value.placed[0];
      ends[s] = r.value.placed[r.value.placed.length - 1];
    } else if (r.code === 'E_DEGENERATE' && r.detail === 'empty') {
      // Step 1's collapse: the segment's two distinct points became one vertex — attraction folded it away, a move
      // beyond the hot pixel, so the overlay reports it (W_ATTRACTED) and §3.7's split reads the case as attracted.
      addWarning(tx.warnings, 'W_ATTRACTED', seg.a);
    } else return err(r.code, r.detail);
  }
  const bridged = bridgeGaps(tx, segments, walks, starts, ends, k);
  if (bridged !== null) return bridged;
  const net = orientSegments(plat, segments, starts, ends, k);
  glueWalks(plat, walks, starts, ends, k, net);
  balanceFlow(plat, k, net);
  return ok({ plat, operands: k, net, warnings: tx.warnings.map((w) => ({ ...w })) }, []);
}

/**
 * Bridges every gap of a ring's walk at least `minEdge` long (the bridge reading of the overlay, C-0196 (1)): where a
 * run of consecutive segments each shorter than `minEdge` collapsed (step 1's `empty`, so nothing was inserted for
 * them) while together they span `minEdge` or more, the segment before the run ends on one vertex and the segment after
 * it starts on another with no edge of the ring between them — the ring's overlay is an open path, and the shortest
 * overlay path joining the two ends is the ring itself walked back, which would cancel the operand's whole winding.
 * Each such gap is closed by one more two-point chain from the vertex the walk left on to the vertex it re-enters on,
 * inserted through `insertChain` like every segment and spliced into the walk, so the ring stays one closed walk of
 * inserted edges; a gap shorter than `minEdge` is left to `glueWalks`' shortest path (a bridge would collapse). The
 * collapse already reported its move (W_ATTRACTED), so the case stays attracted under §3.7's split.
 */
function bridgeGaps(
  tx: InsertTx,
  segments: Segment[],
  walks: { operand: number; steps: number[] }[],
  starts: VertexId[],
  ends: VertexId[],
  k: number,
): KernelResult<ScratchOverlay> | null {
  const p = tx.plat;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const minSq = LATTICE.minEdgeCm * LATTICE.minEdgeCm;
  for (const walk of walks) {
    const kept = walk.steps.filter((st) => starts[Math.abs(st) - 1] >= 0);
    const m = kept.length;
    if (m === 0) continue;
    const out: number[] = [];
    for (let i = 0; i < m; i += 1) {
      const st = kept[i];
      out.push(st);
      const s = Math.abs(st) - 1;
      const nx = kept[i + 1 === m ? 0 : i + 1];
      const t = Math.abs(nx) - 1;
      const from = st > 0 ? ends[s] : starts[s];
      const to = nx > 0 ? starts[t] : ends[t];
      if (from === to) continue;
      const dx = X[to] - X[from];
      const dy = Y[to] - Y[from];
      if (dx * dx + dy * dy < minSq) continue;
      const a: LatticePoint = { x: X[from] as Cm, y: Y[from] as Cm };
      const b: LatticePoint = { x: X[to] as Cm, y: Y[to] as Cm };
      const mult = new Int32Array(k);
      mult[walk.operand] = 1;
      const id = segments.length;
      segments.push({ a, b, mult });
      const r = insertChain(tx, [a, b], [{ role: SCRATCH_ROLE, entity: `arr:s${id}` }], 'mandatory');
      if (r.ok) {
        starts.push(r.value.placed[0]);
        ends.push(r.value.placed[r.value.placed.length - 1]);
        out.push(id + 1);
      } else if (r.code === 'E_DEGENERATE' && r.detail === 'empty') {
        starts.push(-1);
        ends.push(-1);
      } else return err(r.code, r.detail);
    }
    walk.steps = out;
  }
  return null;
}

/**
 * Each segment's net traversals: +1 or −1 on the edges of the one path its edges give from the vertex its first point
 * became to the vertex its last point became, 0 on any other edge it carries (C-0196 (1)); multiplied by the segment's
 * multiplicities and summed per pair.
 */
function orientSegments(p: Plat, segments: readonly Segment[], starts: readonly VertexId[], ends: readonly VertexId[], k: number): Int32Array {
  const pairs = p.slots.pair.top;
  const net = new Int32Array(pairs * k);
  const role = roleIdOf(SCRATCH_ROLE);
  const segOfHandle = new Map<number, number>();
  for (let s = 0; s < segments.length; s += 1) {
    if (starts[s] < 0) continue;
    const h = handleOf(p, `arr:s${s}`);
    if (h >= 0) segOfHandle.set(h, s);
  }
  const edgesOf: number[][] = segments.map(() => []);
  for (let e = 0; e < pairs; e += 1) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    for (const r of rowsOn(p, 'edge', 2 * e)) {
      if (p.roles.kind[r] !== role) continue;
      const s = segOfHandle.get(p.roles.entity[r]);
      if (s !== undefined) edgesOf[s].push(e);
    }
  }
  for (let s = 0; s < segments.length; s += 1) {
    const es = edgesOf[s];
    if (es.length === 0 || starts[s] === ends[s]) continue;
    let dir = pathFlow(p, es, starts[s], ends[s]);
    if (dir.every((d) => d === 0)) {
      // the segment's own edges do not join its ends (never seen): the shortest path of the overlay stands in
      addPath(p, shortestPath(p, starts[s], ends[s]), segments[s].mult, k, net);
      dir = new Int32Array(es.length);
    }
    const m = segments[s].mult;
    for (let i = 0; i < es.length; i += 1) {
      const d = dir[i];
      for (let j = 0; j < k; j += 1) net[es[i] * k + j] += d * m[j];
    }
  }
  return net;
}

/**
 * The flow of one segment over its edges (+1 along the even half-edge, −1 against it, 0 off the path): the path from
 * `start` to `end` in the segment's edge set found by a breadth-first search, each vertex's edges taken in their far
 * ends' lowest-leftmost order (no slot order). Routing through hot pixels, stretch sharing and later splits leave the
 * segment's edges a path; where attraction folded a part of it back on itself (an antenna, a loop) the edges off the
 * path carry nothing, so the flow's divergence is +1 at the start, −1 at the end and 0 elsewhere — the condition that
 * makes the winding walk consistent. A segment whose ends became one vertex carries no flow.
 */
function pathFlow(p: Plat, es: readonly number[], start: VertexId, end: VertexId): Int32Array {
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const dir = new Int32Array(es.length);
  if (start === end || start < 0 || end < 0) return dir;
  const adj = new Map<VertexId, number[]>();
  const add = (v: VertexId, i: number): void => {
    const l = adj.get(v);
    if (l === undefined) adj.set(v, [i]);
    else l.push(i);
  };
  for (let i = 0; i < es.length; i += 1) {
    add(O[2 * es[i]], i);
    add(O[2 * es[i] + 1], i);
  }
  const far = (v: VertexId, i: number): VertexId => (O[2 * es[i]] === v ? O[2 * es[i] + 1] : O[2 * es[i]]);
  for (const [v, l] of adj) {
    l.sort((i1, i2) => {
      const a = far(v, i1);
      const b = far(v, i2);
      return Y[a] - Y[b] || X[a] - X[b] || i1 - i2;
    });
  }
  if (!adj.has(start) || !adj.has(end)) return dir;
  const via = new Map<VertexId, number>([[start, -1]]);
  const queue: VertexId[] = [start];
  for (let q = 0; q < queue.length && !via.has(end); q += 1) {
    const v = queue[q];
    for (const i of adj.get(v) ?? []) {
      const w = far(v, i);
      if (via.has(w)) continue;
      via.set(w, i);
      queue.push(w);
    }
  }
  if (!via.has(end)) return dir;
  let v = end;
  while (v !== start) {
    const i = via.get(v) as number;
    const u = far(v, i);
    dir[i] = O[2 * es[i]] === u ? 1 : -1;
    v = u;
  }
  return dir;
}

/** Adds a path's flow (pairs with their directions) times the multiplicities to the net counts. */
function addPath(p: Plat, path: readonly number[], mult: Int32Array | readonly number[], k: number, net: Int32Array): void {
  for (const h of path) {
    const e = h >> 1;
    const d = (h & 1) === 0 ? 1 : -1;
    for (let j = 0; j < k; j += 1) net[e * k + j] += d * mult[j];
  }
}

/**
 * The half-edges of a shortest path (by length, ties by slot-free vertex order) from u to v over the overlay's live
 * edges — Dijkstra; [] when v is unreachable.
 */
function shortestPath(p: Plat, u: VertexId, v: VertexId): number[] {
  if (u === v) return [];
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const half = 2 * p.slots.pair.top;
  const adj = new Map<VertexId, number[]>();
  for (let h = 0; h < half; h += 1) {
    if (!isHalfEdgeLive(p, h)) continue;
    const l = adj.get(O[h]);
    if (l === undefined) adj.set(O[h], [h]);
    else l.push(h);
  }
  const dist = new Map<VertexId, number>([[u, 0]]);
  const via = new Map<VertexId, number>();
  const done = new Set<VertexId>();
  // a small binary heap of [distance, y, x, vertex]
  const heap: [number, number, number, VertexId][] = [[0, Y[u], X[u], u]];
  const less = (a: [number, number, number, VertexId], b: [number, number, number, VertexId]): boolean =>
    a[0] < b[0] || (a[0] === b[0] && (a[1] < b[1] || (a[1] === b[1] && a[2] < b[2])));
  const push = (e: [number, number, number, VertexId]): void => {
    heap.push(e);
    let i = heap.length - 1;
    while (i > 0) {
      const up = (i - 1) >> 1;
      if (!less(heap[i], heap[up])) break;
      [heap[i], heap[up]] = [heap[up], heap[i]];
      i = up;
    }
  };
  const pop = (): [number, number, number, VertexId] => {
    const top = heap[0];
    const last = heap.pop() as [number, number, number, VertexId];
    if (heap.length > 0) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < heap.length && less(heap[l], heap[m])) m = l;
        if (r < heap.length && less(heap[r], heap[m])) m = r;
        if (m === i) break;
        [heap[i], heap[m]] = [heap[m], heap[i]];
        i = m;
      }
    }
    return top;
  };
  while (heap.length > 0) {
    const [d, , , w] = pop();
    if (done.has(w)) continue;
    done.add(w);
    if (w === v) break;
    for (const h of adj.get(w) ?? []) {
      const t = O[h ^ 1];
      const dx = X[t] - X[w];
      const dy = Y[t] - Y[w];
      const nd = d + Math.sqrt(dx * dx + dy * dy);
      const old = dist.get(t);
      if (old === undefined || nd < old) {
        dist.set(t, nd);
        via.set(t, h);
        push([nd, Y[t], X[t], t]);
      }
    }
  }
  if (!done.has(v)) return [];
  const path: number[] = [];
  let w = v;
  while (w !== u) {
    const h = via.get(w) as number;
    path.push(h);
    w = O[h];
  }
  return path.reverse();
}

/**
 * Closes every ring's walk on the overlay (C-0196 (1)): where attraction left a ring's consecutive segments ending and
 * starting on different vertices — a segment shorter than `minEdge` collapsed to nothing, or two insertions of one
 * lattice point placed apart — the shortest overlay path between them carries the ring's operand, so every ring stays a
 * closed walk and the flow's divergence is 0 at every vertex: the winding walk is consistent by construction.
 */
function glueWalks(
  p: Plat,
  walks: readonly { operand: number; steps: readonly number[] }[],
  starts: readonly VertexId[],
  ends: readonly VertexId[],
  k: number,
  net: Int32Array,
): void {
  for (const walk of walks) {
    const unit = new Int32Array(k);
    unit[walk.operand] = 1;
    const visits: [VertexId, VertexId][] = [];
    for (const st of walk.steps) {
      const s = Math.abs(st) - 1;
      if (starts[s] < 0) continue;
      visits.push(st > 0 ? [starts[s], ends[s]] : [ends[s], starts[s]]);
    }
    const m = visits.length;
    for (let i = 0; i < m; i += 1) {
      const out = visits[i][1];
      const into = visits[i + 1 === m ? 0 : i + 1][0];
      if (out !== into) addPath(p, shortestPath(p, out, into), unit, k, net);
    }
  }
}

/**
 * Balances what gluing could not (C-0196 (1)): where attraction split a ring's overlay into pieces with no edge between
 * them, a gap of its walk that leaves one piece and the gap that re-enters it cannot be routed, and the flow keeps a
 * source and a sink in that piece. A closed walk leaves every piece as often as it enters it, so within each connected
 * piece of the overlay the residual divergence sums to 0; each sink is joined to a source of its piece by the shortest
 * path, both taken in lowest-leftmost vertex order (no slot order), so the divergence is 0 everywhere again.
 */
function balanceFlow(p: Plat, k: number, net: Int32Array): void {
  const pairs = p.slots.pair.top;
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const div = new Map<VertexId, Int32Array>();
  const at = (v: VertexId): Int32Array => {
    let d = div.get(v);
    if (d === undefined) {
      d = new Int32Array(k);
      div.set(v, d);
    }
    return d;
  };
  // the pieces: union–find over the live edges
  const parent = new Map<VertexId, VertexId>();
  const find = (v: VertexId): VertexId => {
    let r = v;
    while ((parent.get(r) ?? r) !== r) r = parent.get(r) as VertexId;
    let w = v;
    while (w !== r) {
      const n = parent.get(w) as VertexId;
      parent.set(w, r);
      w = n;
    }
    return r;
  };
  for (let e = 0; e < pairs; e += 1) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    const a = O[2 * e];
    const b = O[2 * e + 1];
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent.set(ra, rb);
    for (let j = 0; j < k; j += 1) {
      const n = net[e * k + j];
      if (n === 0) continue;
      at(a)[j] += n;
      at(b)[j] -= n;
    }
  }
  const order = [...div.keys()].sort((a, b) => Y[a] - Y[b] || X[a] - X[b] || a - b);
  for (let j = 0; j < k; j += 1) {
    const unit = new Int32Array(k);
    unit[j] = 1;
    const sources = new Map<VertexId, VertexId[]>();
    for (const v of order) {
      for (let c = (div.get(v) as Int32Array)[j]; c < 0; c += 1) {
        const r = find(v);
        const l = sources.get(r);
        if (l === undefined) sources.set(r, [v]);
        else l.push(v);
      }
    }
    for (const v of order) {
      for (let c = (div.get(v) as Int32Array)[j]; c > 0; c -= 1) {
        const u = sources.get(find(v))?.shift();
        if (u === undefined) return;
        addPath(p, shortestPath(p, u, v), unit, k, net);
      }
    }
  }
}

/**
 * §3.7's labels: the face left of every half-edge and, per face, each operand's winding number — the unbounded outside
 * 0, and across each half-edge h from its left face to its right one the operand's net traversals of h subtracted.
 */
export function windingLabels(overlay: ScratchOverlay): WindingLabels {
  const p = overlay.plat;
  const k = overlay.operands;
  const half = 2 * p.slots.pair.top;
  const faceOf = new Int32Array(half).fill(-2);
  for (let f = 0; f < p.slots.face[0].top; f += 1) {
    if (!isFaceLive(p, 0, f)) continue;
    for (const ring of faceWalk(p, 0, f)) for (const h of ring) faceOf[h] = f;
  }
  const sides = new Map<FaceId, number[]>();
  for (let h = 0; h < half; h += 1) {
    if (!isHalfEdgeLive(p, h)) continue;
    if (faceOf[h] === -2) faceOf[h] = -1;
    const f = faceOf[h];
    const l = sides.get(f);
    if (l === undefined) sides.set(f, [h]);
    else l.push(h);
  }
  const winding = new Map<FaceId, number[]>();
  winding.set(-1, new Array<number>(k).fill(0));
  let consistent = true;
  const queue: FaceId[] = [-1];
  for (let q = 0; q < queue.length; q += 1) {
    const f = queue[q];
    const wf = winding.get(f) as number[];
    for (const h of sides.get(f) ?? []) {
      const g = faceOf[h ^ 1];
      const e = h >> 1;
      const sgn = (h & 1) === 0 ? 1 : -1;
      const wg = wf.map((w, j) => w - sgn * overlay.net[e * k + j]);
      const known = winding.get(g);
      if (known === undefined) {
        winding.set(g, wg);
        queue.push(g);
      } else if (known.some((w, j) => w !== wg[j])) consistent = false;
    }
  }
  return { operands: k, faceOf, winding, consistent };
}

/** Is the lattice point a lower-left of b (y, then x: the kernel's vertex order, §3.3)? */
function before(a: LatticePoint, b: LatticePoint): boolean {
  return a.y < b.y || (a.y === b.y && a.x < b.x);
}

/** The ring started at its lowest-leftmost vertex. */
export function canonicalRing(ring: readonly LatticePoint[]): Ring {
  let s = 0;
  for (let i = 1; i < ring.length; i += 1) if (before(ring[i], ring[s])) s = i;
  return [...ring.slice(s), ...ring.slice(0, s)];
}

/** Rings in their start vertices' order, then their following vertices' (outer before hole at a shared start). */
export function compareRings(a: Ring, b: Ring): number {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i += 1) {
    if (a[i].y !== b[i].y) return a[i].y - b[i].y;
    if (a[i].x !== b[i].x) return a[i].x - b[i].x;
  }
  return a.length - b.length;
}

/**
 * The loop without its straight-through vertices (exactly collinear and going on), cyclically — but never a vertex in
 * `keep`: a vertex where the kept boundary meets itself (a hole touching its outline, two faces touching) is a vertex of
 * every ring through it, even where one ring runs straight on there (C-0206 (1)).
 */
function dropStraight(loop: LatticePoint[], keep: (p: LatticePoint) => boolean): LatticePoint[] {
  let pts = loop;
  let changed = true;
  while (changed && pts.length >= 3) {
    changed = false;
    const out: LatticePoint[] = [];
    const n = pts.length;
    for (let i = 0; i < n; i += 1) {
      const a = out.length > 0 ? out[out.length - 1] : pts[n - 1];
      const v = pts[i];
      const b = pts[i + 1 === n ? 0 : i + 1];
      const straight = !keep(v) && orient2d(a.x, a.y, v.x, v.y, b.x, b.y) === 0 && (v.x - a.x) * (b.x - v.x) + (v.y - a.y) * (b.y - v.y) > 0;
      if (straight) changed = true;
      else out.push(v);
    }
    pts = out;
  }
  return pts;
}

/**
 * The kept region's boundary as rings (see the module comment): `keep` reads a face's winding numbers. Outer rings
 * counter-clockwise, holes clockwise, each simple, canonical in start and order.
 */
export function traceKept(overlay: ScratchOverlay, labels: WindingLabels, keep: (w: readonly number[]) => boolean): Ring[] {
  const p = overlay.plat;
  const faceOf = labels.faceOf;
  const kept = new Map<FaceId, boolean>();
  for (const [f, w] of labels.winding) kept.set(f, keep(w));
  const isKept = (f: FaceId): boolean => kept.get(f) === true;
  const half = faceOf.length;
  const boundary = (h: number): boolean => faceOf[h] >= -1 && isKept(faceOf[h]) && !isKept(faceOf[h ^ 1]);
  const next = p.halfEdges.next;
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const seen = new Uint8Array(half);
  // how many boundary half-edges leave each vertex: two or more where the kept boundary meets itself (C-0206 (1))
  const leaving = new Map<VertexId, number>();
  for (let h = 0; h < half; h += 1) if (boundary(h)) leaving.set(O[h], (leaving.get(O[h]) ?? 0) + 1);
  const touch = new Set<string>();
  for (const [v, n] of leaving) if (n > 1) touch.add(`${String(X[v])},${String(Y[v])}`);
  const rings: Ring[] = [];
  for (let h0 = 0; h0 < half; h0 += 1) {
    if (seen[h0] === 1 || !boundary(h0)) continue;
    const cycle: VertexId[] = [];
    let h = h0;
    let guard = 0;
    do {
      seen[h] = 1;
      cycle.push(O[h]);
      let g = next[h];
      while (!boundary(g)) {
        g = next[g ^ 1];
        if (++guard > half * 4) throw new Error('arr: the kept boundary does not close');
      }
      h = g;
      if (++guard > half * 4) throw new Error('arr: the kept boundary does not close');
    } while (h !== h0);
    for (const loop of simpleLoops(cycle)) {
      const pts = dropStraight(
        loop.map((v) => ({ x: X[v] as Cm, y: Y[v] as Cm })),
        (q) => touch.has(`${String(q.x)},${String(q.y)}`),
      );
      if (pts.length < 3 || area2(pts) === 0) continue;
      rings.push(canonicalRing(pts));
    }
  }
  return rings.sort(compareRings);
}

/** A closed vertex walk cut into simple loops at every vertex it visits twice (each loop in walk order). */
function simpleLoops(cycle: readonly VertexId[]): VertexId[][] {
  const loops: VertexId[][] = [];
  const stack: VertexId[] = [];
  const at = new Map<VertexId, number>();
  for (const v of cycle) {
    const i = at.get(v);
    if (i !== undefined) {
      const loop = stack.splice(i);
      for (const u of loop) at.delete(u);
      loops.push(loop);
    }
    at.set(v, stack.length);
    stack.push(v);
  }
  if (stack.length > 0) loops.push(stack);
  return loops;
}

/** The region the operands' labels select, as rings: the overlay, its labels and the boundary trace in one call. */
export function overlayRegion(
  operands: readonly (readonly (readonly LatticePoint[])[])[],
  keep: (w: readonly number[]) => boolean,
): KernelResult<Ring[]> {
  const ov = buildOverlay(operands);
  if (!ov.ok) return err(ov.code, ov.detail);
  const labels = windingLabels(ov.value);
  if (!labels.consistent) return { ...err<Ring[]>('E_INVARIANT', 'winding'), warnings: ov.value.warnings.map((w) => ({ ...w })) } as KernelResult<Ring[]>;
  return ok(traceKept(ov.value, labels, keep), ov.value.warnings);
}

/**
 * §3.11's empty result, `E_DEGENERATE` (`empty`), carrying the warnings the overlay reported on its way to nothing — a
 * result that attraction emptied is an attracted case of §3.7's split, so the refusal keeps what moved (C-0196 (4)).
 */
export type EmptyResult = Extract<KernelResult<Ring[]>, { ok: false }> & { readonly warnings: Warning[] };

/** The empty result with its warnings. */
export function emptyResult(warnings: readonly Warning[]): EmptyResult {
  return { ...degenerate<Ring[]>('empty'), warnings: warnings.map((w) => ({ ...w })) };
}
