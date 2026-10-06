// N-43 B's fidelity bound as the tests judge it (the session's ruling J199, binding under N-44 (2); C-0213): every commit
// of a chain segment keeps its route within 2 · √2 · attractCm (≈ 73.5 cm, N-40's wedge cap) of the input segment, as a
// Hausdorff distance both ways, stretch join and leave points included. Written from the ruling, not from the code's
// measure: the test reads only the op's input, step 1's plan (M0-a-04's `decimate`, tested on its own) and the
// committed arena, and judges the whole chain:
//
//   (A) every vertex of an edge carrying the chain's row stands within the bound of a segment the op routed;
//   (B) every point of every segment the op routed lies within the bound of the edges carrying the chain's row.
//
// Both follow from the per-segment bound (each route lies inside its segment's band, and covers it), so a breach of
// either is a commit out of bound. The segments the op routed are step 1's points taken run by run, a point whose
// vertex equals the previous one's skipped (step 2's merge), a closed run closed (§3.6 steps 1 – 2). (A) is exact on
// lattice points (integer squares and dot products); (B) samples the segment, refining an interval until the distance's
// Lipschitz bound clears it (|d(s) − d(s′)| ≤ |s − s′|) or it is 0.01 cm long, and fails only on a sampled point beyond
// the bound (1e-9 cm of float noise allowed) — a necessary condition, never stricter than the ruling.
import { isHalfEdgeLive, rowKey, rowsOn, type Plat, type VertexId } from '../../../src/arena/index.js';
import { insertTx } from '../../../src/insert/classes.js';
import { decimate } from '../../../src/insert/decimate.js';
import type { Level } from '../../../src/types/index.js';

/** 2 · √2 · attractCm (attractCm 26 cm, §3.2), and its square, exact. */
export const FIDELITY_CM = 2 * Math.SQRT2 * 26;
const FIDELITY_SQ = 8 * 26 * 26;

type P2 = readonly [number, number];

/** The edges (as end points) carrying a row of the entity, any role. */
export function chainEdges(p: Plat, entity: string): [number, number, number, number][] {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const out: [number, number, number, number][] = [];
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    if (!rowsOn(p, 'edge', 2 * e).some((r) => rowKey(p, r).entity === entity)) continue;
    out.push([X[O[2 * e]], Y[O[2 * e]], X[O[2 * e + 1]], Y[O[2 * e + 1]]]);
  }
  return out;
}

/**
 * The input segments a committed chain's op routed: step 1's points (`decimate`) run by run, each segment between two
 * consecutive points whose vertices (`placed`, per input point) differ — a point on the previous point's vertex merged
 * into it — and a closed run's closing segment.
 */
export function routedSegments(p: Plat, level: Level, cls: 'mandatory' | 'optional', points: readonly P2[], opts: { closed?: boolean; pinned?: readonly number[] }, placed: readonly VertexId[]): [P2, P2][] {
  const d = decimate(insertTx(p, level), points.map(([x, y]) => ({ x, y })), cls, opts);
  if (!d.ok) throw new Error(`fidelity: step 1 refused a committed chain (${d.code})`);
  const dec = d.value;
  const vertexOf = new Array<VertexId>(dec.points.length).fill(-1);
  dec.of.forEach((j, i) => {
    vertexOf[j] = placed[i];
  });
  const out: [P2, P2][] = [];
  const at = (j: number): P2 => [dec.points[j].x, dec.points[j].y];
  for (const run of dec.runs) {
    let prev = -1;
    let prevIdx = -1;
    for (const j of run.vertices) {
      const v = vertexOf[j];
      if (prev >= 0 && v === prev) continue;
      if (prev >= 0) out.push([at(prevIdx), at(j)]);
      prev = v;
      prevIdx = j;
    }
    if (run.closed && prev >= 0 && prev !== vertexOf[run.vertices[0]]) out.push([at(prevIdx), at(run.vertices[0])]);
  }
  return out;
}

/** Is the lattice point q within the bound of the segment a–b (exact)? */
function pointWithin(qx: number, qy: number, a: P2, b: P2): boolean {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l2 = dx * dx + dy * dy;
  const vx = qx - a[0];
  const vy = qy - a[1];
  const dot = vx * dx + vy * dy;
  if (dot <= 0 || l2 === 0) return vx * vx + vy * vy <= FIDELITY_SQ;
  if (dot >= l2) return (qx - b[0]) * (qx - b[0]) + (qy - b[1]) * (qy - b[1]) <= FIDELITY_SQ;
  const o = vx * dy - vy * dx;
  return o * o <= FIDELITY_SQ * l2;
}

/** The distance from (x, y) to the segment (ax, ay)–(bx, by). */
function distToSeg(x: number, y: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / l2));
  return Math.hypot(ax + t * dx - x, ay + t * dy - y);
}

/** The farthest sampled point of the segment a–b from the edges (see the file comment for (B)): its distance. */
export function farthestFromEdges(a: P2, b: P2, edges: readonly (readonly [number, number, number, number])[]): number {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const near = edges.filter(([ux, uy, wx, wy]) => Math.min(ux, wx) <= Math.max(a[0], b[0]) + 2 * FIDELITY_CM && Math.max(ux, wx) >= Math.min(a[0], b[0]) - 2 * FIDELITY_CM
    && Math.min(uy, wy) <= Math.max(a[1], b[1]) + 2 * FIDELITY_CM && Math.max(uy, wy) >= Math.min(a[1], b[1]) - 2 * FIDELITY_CM);
  const d = (t: number): number => {
    const x = a[0] + t * (b[0] - a[0]);
    const y = a[1] + t * (b[1] - a[1]);
    let best = Infinity;
    for (const [ux, uy, wx, wy] of near) best = Math.min(best, distToSeg(x, y, ux, uy, wx, wy));
    return best;
  };
  let worst = 0;
  const stack: [number, number, number, number][] = [[0, d(0), 1, d(1)]];
  let evals = 2;
  while (stack.length > 0 && evals < 200_000) {
    const [t0, d0, t1, d1] = stack.pop() as [number, number, number, number];
    worst = Math.max(worst, d0, d1);
    const span = (t1 - t0) * len;
    if (d0 + d1 + span <= 2 * FIDELITY_CM || span < 0.01) continue;
    const tm = 0.5 * (t0 + t1);
    const dm = d(tm);
    evals += 1;
    stack.push([t0, d0, tm, dm], [tm, dm, t1, d1]);
  }
  return worst;
}

/**
 * The fidelity bound's breaches on a committed chain (empty when it holds): (A) a vertex of the chain's edges beyond the
 * bound of every routed segment, (B) a routed segment with a sampled point beyond the bound of the chain's edges.
 */
export function fidelityProblems(p: Plat, level: Level, cls: 'mandatory' | 'optional', points: readonly P2[], opts: { closed?: boolean; pinned?: readonly number[] }, placed: readonly VertexId[], entity: string): string[] {
  const segs = routedSegments(p, level, cls, points, opts, placed);
  const edges = chainEdges(p, entity);
  const out: string[] = [];
  if (segs.length === 0) return out;
  const seen = new Set<string>();
  for (const [ux, uy, wx, wy] of edges) {
    for (const [x, y] of [[ux, uy], [wx, wy]] as const) {
      const key = `${x},${y}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (!segs.some(([a, b]) => pointWithin(x, y, a, b))) out.push(`(A) the route vertex (${x}, ${y}) stands beyond ${FIDELITY_CM.toFixed(2)} cm of every segment of ${entity}`);
    }
  }
  for (const [a, b] of segs) {
    const far = farthestFromEdges(a, b, edges);
    if (far > FIDELITY_CM + 1e-9) out.push(`(B) the segment (${a[0]}, ${a[1]})–(${b[0]}, ${b[1]}) of ${entity} reaches ${far.toFixed(1)} cm from its route`);
  }
  return out;
}
