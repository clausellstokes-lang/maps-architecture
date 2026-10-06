// One smoothing per chain (M0-c-03; §4.3 *One graph, then one smoothing*: "each chain is simplified (Visvalingam) and
// smoothed (Chaikin × 2, then curvature-limited to the class's minimum radius) once, with its end nodes pinned";
// *Decks*: "smoothing never moves their vertices"). Readings C-0236 (5), (7):
// * simplify: §3.4's topology-preserving Visvalingam–Whyatt (`simplify`, M0-a-13) with a minimum segment of one
//   lattice spacing and no angle floor (M0-c-01's reading for the level set, C-0201 (5)), the obstacles given (water,
//   the plaza, the wall, the other chains), the ends, the held points and the two points next to the ends kept — so each
//   arm leaves its junction along its lattice edge (the hex lattice's arms meet at ≥ 60°);
// * Chaikin × `ways.json` `graph/chaikinPasses` on each run between two held points (an open run keeps its ends and its
//   end directions; a run of held points stays as it is);
// * the curvature limit: the discrete radius at a vertex — the shorter of its two sides, halved, over tan(θ ÷ 2) of
//   its turn θ — at least the class's `minRadiusM`, reached by moving each vertex below it half way to its neighbours'
//   midpoint, ≤ `CURVATURE_PASSES` passes, the ends, the held points and the points next to the ends never moved;
//   what stays below is counted (`belowRadius`, soft, reported).
// Each step works on values in cm; the result is rounded to whole cm (insertChain snaps it, §3.6 step 1).
import { chaikin, simplify, type Cm, type LatticePoint, type Polygon } from '@plat/kernel';

/** The curvature limit's passes. */
export const CURVATURE_PASSES = 64;

/** A point in cm. */
interface P {
  x: number;
  y: number;
}

/** The smoothing options. */
export interface SmoothOptions {
  /** Visvalingam's minimum segment (cm): one lattice spacing. */
  readonly minSegmentCm: number;
  readonly chaikinPasses: number;
  readonly minRadiusCm: number;
  /** Rings the simplify may not cross (lattice points). */
  readonly obstacles: readonly Polygon[];
  readonly curvaturePasses?: number;
}

/** A chain smoothed: its points after each step, the held flags of the final points, what stayed below the radius. */
export interface Smoothed {
  readonly simplified: LatticePoint[];
  readonly points: LatticePoint[];
  readonly belowRadius: number;
}

/** Is the discrete radius at b (between a and c) below `r`? min(l₁, l₂) · (l₁l₂ + u·v) < 2r · |u × v|. */
export function belowRadiusAt(a: P, b: P, c: P, r: number): boolean {
  const ux = b.x - a.x;
  const uy = b.y - a.y;
  const vx = c.x - b.x;
  const vy = c.y - b.y;
  const l1 = Math.sqrt(ux * ux + uy * uy);
  const l2 = Math.sqrt(vx * vx + vy * vy);
  const cross = Math.abs(ux * vy - uy * vx);
  const dot = ux * vx + uy * vy;
  if (cross === 0) return dot < 0;
  return Math.min(l1, l2) * (l1 * l2 + dot) < 2 * r * cross;
}

/** The interior vertices of a polyline whose discrete radius is below `r`, counted over the unfixed ones (or all). */
export function countBelowRadius(pts: readonly P[], r: number, fixed?: readonly boolean[]): number {
  let n = 0;
  for (let i = 1; i + 1 < pts.length; i += 1) {
    if (fixed !== undefined && fixed[i]) continue;
    if (belowRadiusAt(pts[i - 1], pts[i], pts[i + 1], r)) n += 1;
  }
  return n;
}

/** The kept indices of a chain for the simplify: the ends, the held points and the two points next to the ends. */
function keptIndices(n: number, held: readonly boolean[]): number[] {
  const out = new Set<number>([0, n - 1]);
  if (n >= 4) {
    out.add(1);
    out.add(n - 2);
  }
  held.forEach((h, i) => {
    if (h) out.add(i);
  });
  return [...out].sort((a, b) => a - b);
}

/** Chaikin on each run between two anchors; returns the points and which of them are anchors. */
export function chaikinRuns(pts: readonly P[], anchor: readonly boolean[], passes: number): { points: P[]; fixed: boolean[] } {
  const out: P[] = [{ x: pts[0].x, y: pts[0].y }];
  const fixed: boolean[] = [true];
  let i = 0;
  while (i < pts.length - 1) {
    let j = i + 1;
    while (j < pts.length - 1 && !anchor[j]) j += 1;
    if (j === i + 1) {
      out.push({ x: pts[j].x, y: pts[j].y });
      fixed.push(true);
    } else {
      const run = chaikin(pts.slice(i, j + 1), { closed: false, iterations: passes });
      for (let k = 1; k < run.length; k += 1) {
        out.push({ x: run[k].x, y: run[k].y });
        fixed.push(k === run.length - 1);
      }
    }
    i = j;
  }
  return { points: out, fixed };
}

/** The curvature limit (see the header): the points moved, and how many unfixed vertices stay below the radius. */
export function curvatureLimit(pts: readonly P[], fixed: readonly boolean[], r: number, passes = CURVATURE_PASSES): { points: P[]; below: number } {
  let cur = pts.map((p) => ({ x: p.x, y: p.y }));
  const n = cur.length;
  const hold = fixed.slice();
  hold[0] = true;
  hold[n - 1] = true;
  if (n >= 4) {
    hold[1] = true;
    hold[n - 2] = true;
  }
  for (let pass = 0; pass < passes; pass += 1) {
    const moves: number[] = [];
    for (let i = 1; i + 1 < n; i += 1) if (!hold[i] && belowRadiusAt(cur[i - 1], cur[i], cur[i + 1], r)) moves.push(i);
    if (moves.length === 0) break;
    const next = cur.map((p) => ({ x: p.x, y: p.y }));
    for (const i of moves) {
      const a = cur[i - 1];
      const c = cur[i + 1];
      next[i] = { x: cur[i].x + 0.5 * ((a.x + c.x) * 0.5 - cur[i].x), y: cur[i].y + 0.5 * ((a.y + c.y) * 0.5 - cur[i].y) };
    }
    cur = next;
  }
  return { points: cur, below: countBelowRadius(cur, r, hold) };
}

/** Points rounded to whole cm, consecutive repeats removed. */
export function toLattice(pts: readonly P[]): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (const p of pts) {
    const q = { x: Math.round(p.x), y: Math.round(p.y) } as LatticePoint;
    const last = out[out.length - 1];
    if (last !== undefined && last.x === q.x && last.y === q.y) continue;
    out.push(q);
  }
  return out;
}

/** A chain simplified: its points and which of them are anchors (its ends and held points). */
export interface Simplified {
  points: LatticePoint[];
  anchor: boolean[];
}

/**
 * The simplify step (see the header): `held[i]` for the input points smoothing never moves (the ends always). A
 * simplify the kernel refuses leaves the points as they are.
 */
export function simplifyChain(points: readonly LatticePoint[], held: readonly boolean[], opts: Pick<SmoothOptions, 'minSegmentCm' | 'obstacles'>): Simplified {
  const n = points.length;
  const heldAt = new Set<string>();
  points.forEach((p, i) => {
    if (i === 0 || i === n - 1 || held[i]) heldAt.add(`${String(p.x)},${String(p.y)}`);
  });
  if (n <= 3) return { points: points.slice(), anchor: points.map((p) => heldAt.has(`${String(p.x)},${String(p.y)}`)) };
  const s = simplify(points, opts.minSegmentCm as Cm, 0, opts.obstacles as Polygon[], keptIndices(n, held));
  const out = s.ok ? s.value : points.slice();
  return { points: out, anchor: out.map((p) => heldAt.has(`${String(p.x)},${String(p.y)}`)) };
}

/** Chaikin and the curvature limit on a simplified chain (see the header). */
export function finishChain(s: Simplified, opts: Pick<SmoothOptions, 'chaikinPasses' | 'minRadiusCm' | 'curvaturePasses'>): { points: LatticePoint[]; belowRadius: number } {
  if (s.points.length <= 2) return { points: s.points.slice(), belowRadius: 0 };
  const ch = chaikinRuns(s.points, s.anchor, opts.chaikinPasses);
  const lim = curvatureLimit(ch.points, ch.fixed, opts.minRadiusCm, opts.curvaturePasses);
  return { points: toLattice(lim.points), belowRadius: lim.below };
}

/** One chain's smoothing whole (see the header): simplify, Chaikin, the curvature limit. */
export function smoothChain(points: readonly LatticePoint[], held: readonly boolean[], opts: SmoothOptions): Smoothed {
  const s = simplifyChain(points, held, opts);
  const f = finishChain(s, opts);
  return { simplified: s.points, points: f.points, belowRadius: f.belowRadius };
}
