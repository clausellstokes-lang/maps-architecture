// §3.4's `simplify(chain, minSegmentCm, minAngleCdeg, obstacles, pinned)`: Visvalingam–Whyatt, topology-preserving
// (§3.1's curves row; §4.4 step 3 runs it on the wall trace with a 20 m minimum segment and no interior angle below
// 100°). A vertex is removable while it violates either bound — an incident segment shorter than `minSegmentCm`, or its
// interior angle (180° on a straight line) below `minAngleCdeg` — and is neither pinned nor an open chain's end; the
// removable vertex of the smallest effective area (the triangle with its two neighbours, exact; ties by input index)
// goes first. A removal is refused when the new segment would touch or cross another segment of the chain, fold back
// over a neighbouring one, or touch or cross an obstacle edge (found through a packed index over the obstacles), or when
// the triangle it cuts off holds another vertex of the chain or of an obstacle, so nothing changes side; a refused vertex
// is tried again once a neighbour of it is removed. A chain whose last point repeats its first is a ring (at least three
// vertices kept). Pinned vertices never move or go. The input is never written. M0-a-13. Readings: C-0193 (7).
import { packBoxes, searchPacked, type PackedTree } from '../adapters/flatbush.js';
import { dmath } from '../dmath/index.js';
import { segmentsMeet } from '../insert/decimate.js';
import { err, ok, orient2d, type KernelResult } from '../num/index.js';
import type { Cm, Point, Polygon } from '../types/index.js';
import { check } from './held.js';
import { inTriangle } from './validate.js';

/** π to the double nearest it (Math.PI is outside §6.5 (3)'s allowlist). */
const PI = 3.141592653589793;

/** Does the vertex b, between a and c, turn by an interior angle below the floor (cosine `cosFloor`)? */
function angleBelow(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, cosFloor: number): boolean {
  const ux = ax - bx;
  const uy = ay - by;
  const vx = cx - bx;
  const vy = cy - by;
  const lu = Math.sqrt(ux * ux + uy * uy);
  const lv = Math.sqrt(vx * vx + vy * vy);
  if (lu === 0 || lv === 0) return true;
  return ux * vx + uy * vy > cosFloor * lu * lv;
}

/**
 * §3.4's simplify: the chain with its removable vertices removed (see the module comment). Refuses E_OUT_OF_RANGE for a
 * point off the lattice's range and E_DEGENERATE (`empty`) for a chain of fewer than two distinct vertices.
 */
export function simplify(chain: readonly Point[], minSegmentCm: Cm, minAngleCdeg: number, obstacles: readonly Polygon[], pinned: readonly number[]): KernelResult<Point[]> {
  check(Number.isFinite(minSegmentCm) && minSegmentCm >= 0, 'a minimum segment is a finite length ≥ 0');
  check(Number.isFinite(minAngleCdeg) && minAngleCdeg >= 0 && minAngleCdeg <= 18_000, 'a minimum angle lies in 0 … 18 000 cdeg');
  for (const q of chain) if (!(Number.isInteger(q.x) && Number.isInteger(q.y) && Math.abs(q.x) < 8_388_608 && Math.abs(q.y) < 8_388_608)) return err('E_OUT_OF_RANGE', 'chain');
  const closed = chain.length >= 4 && chain[0].x === chain[chain.length - 1].x && chain[0].y === chain[chain.length - 1].y;
  const V = closed ? chain.slice(0, -1) : chain.slice();
  const n = V.length;
  for (const i of pinned) check(Number.isInteger(i) && i >= 0 && i < chain.length, `pinned index ${i} lies outside the chain`);
  const isPinned = new Uint8Array(n);
  for (const i of pinned) isPinned[closed && i === n ? 0 : i] = 1;
  const distinct = new Set(V.map((q) => `${q.x},${q.y}`)).size;
  if (n < 2 || distinct < 2) return err('E_DEGENERATE', 'empty');
  // The obstacles' edges in a packed index, and their vertices.
  const oseg: number[] = [];
  const opts: number[] = [];
  for (const ring of obstacles) {
    for (let i = 0; i < ring.length; i++) {
      const a = ring[i];
      const b = ring[(i + 1) % ring.length];
      check(Number.isInteger(a.x) && Number.isInteger(a.y), 'an obstacle is a ring of lattice points');
      oseg.push(a.x, a.y, b.x, b.y);
      opts.push(a.x, a.y);
    }
  }
  const m = oseg.length / 4;
  let tree: PackedTree | null = null;
  if (m > 0) {
    const boxes = new Float64Array(4 * m);
    for (let i = 0; i < m; i++) {
      boxes[4 * i] = Math.min(oseg[4 * i], oseg[4 * i + 2]);
      boxes[4 * i + 1] = Math.min(oseg[4 * i + 1], oseg[4 * i + 3]);
      boxes[4 * i + 2] = Math.max(oseg[4 * i], oseg[4 * i + 2]);
      boxes[4 * i + 3] = Math.max(oseg[4 * i + 1], oseg[4 * i + 3]);
    }
    tree = packBoxes(boxes, m);
  }
  const cosFloor = dmath.cos((minAngleCdeg * PI) / 18_000);
  const prev = new Int32Array(n);
  const next = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    prev[i] = closed ? (i + n - 1) % n : i - 1;
    next[i] = closed ? (i + 1) % n : i + 1 < n ? i + 1 : -1;
  }
  const alive = new Uint8Array(n).fill(1);
  const refused = new Uint8Array(n);
  let count = n;
  const X = (i: number): number => V[i].x;
  const Y = (i: number): number => V[i].y;
  const short = (i: number, j: number): boolean => {
    const dx = X(i) - X(j);
    const dy = Y(i) - Y(j);
    return dx * dx + dy * dy < minSegmentCm * minSegmentCm;
  };
  const removable = (i: number): boolean => {
    if (alive[i] === 0 || isPinned[i] === 1 || refused[i] === 1) return false;
    if (prev[i] < 0 || next[i] < 0) return false; // an open chain's ends
    if (closed && count <= 3) return false;
    const a = prev[i];
    const c = next[i];
    return short(a, i) || short(i, c) || angleBelow(X(a), Y(a), X(i), Y(i), X(c), Y(c), cosFloor);
  };
  /** May vertex i go — the segment prev–next touching nothing, the cut-off triangle empty? */
  const allowed = (i: number): boolean => {
    const a = prev[i];
    const c = next[i];
    const ax = X(a);
    const ay = Y(a);
    const cx = X(c);
    const cy = Y(c);
    // The chain's other segments.
    for (let j = 0; j < n; j++) {
      if (alive[j] === 0 || next[j] < 0 || j === i || next[j] === i) continue;
      const k = next[j];
      const jx = X(j);
      const jy = Y(j);
      const kx = X(k);
      const ky = Y(k);
      if (j === c || k === a) {
        // A neighbouring segment shares an end with the new one: it may not fold back over it.
        const s = j === c ? c : a;
        const o = j === c ? k : j;
        const t = s === c ? a : c;
        const sx = X(s);
        const sy = Y(s);
        if (orient2d(sx, sy, X(o), Y(o), X(t), Y(t)) === 0 && (X(o) - sx) * (X(t) - sx) + (Y(o) - sy) * (Y(t) - sy) > 0) return false;
        continue;
      }
      if (segmentsMeet(ax, ay, cx, cy, jx, jy, kx, ky)) return false;
    }
    // The obstacles (through the index).
    if (tree !== null) {
      for (const e of searchPacked(tree, Math.min(ax, cx), Math.min(ay, cy), Math.max(ax, cx), Math.max(ay, cy))) {
        if (segmentsMeet(ax, ay, cx, cy, oseg[4 * e], oseg[4 * e + 1], oseg[4 * e + 2], oseg[4 * e + 3])) return false;
      }
    }
    // Nothing changes side: the cut-off triangle holds no other vertex.
    const ix = X(i);
    const iy = Y(i);
    for (let j = 0; j < n; j++) {
      if (alive[j] === 0 || j === i || j === a || j === c) continue;
      if (inTriangle(X(j), Y(j), ax, ay, ix, iy, cx, cy)) return false;
    }
    for (let k = 0; k < opts.length; k += 2) if (inTriangle(opts[k], opts[k + 1], ax, ay, ix, iy, cx, cy)) return false;
    return true;
  };
  for (;;) {
    let best = -1;
    let bestArea = Infinity;
    for (let i = 0; i < n; i++) {
      if (!removable(i)) continue;
      const a = prev[i];
      const c = next[i];
      const area = Math.abs(orient2d(X(a), Y(a), X(i), Y(i), X(c), Y(c)));
      if (area < bestArea) {
        bestArea = area;
        best = i;
      }
    }
    if (best < 0) break;
    if (!allowed(best)) {
      refused[best] = 1;
      continue;
    }
    const a = prev[best];
    const c = next[best];
    next[a] = c;
    prev[c] = a;
    alive[best] = 0;
    count--;
    refused[a] = 0;
    refused[c] = 0;
  }
  const out: Point[] = [];
  let start = 0;
  while (alive[start] === 0) start++;
  let i = start;
  do {
    out.push({ x: V[i].x, y: V[i].y });
    i = next[i];
  } while (i >= 0 && i !== start);
  if (closed) out.push({ x: V[start].x, y: V[start].y });
  return ok(out);
}
