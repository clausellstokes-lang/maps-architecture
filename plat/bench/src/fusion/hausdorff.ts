// The S8 ≡ S9 contract's geometry (M0-c-06; §13.2 "S8's working block equals S9's committed block (Hausdorff 0; §3.7)",
// §4.6: "S9's corridorUnion then commits exactly those kerbs"; readings C-0270 (5)).
//
// Two closed rings on the integer lattice bound the same point set exactly when their canonical forms are equal: the
// closing duplicate and repeated vertices dropped, every vertex whose two edges are collinear (an exact integer cross
// product of 0, going on) dropped, counter-clockwise, started at the lowest-then-leftmost vertex. The Hausdorff distance
// of two rings is 0 exactly when their boundaries are the same closed set, so `hausdorffCm` returns 0 on equal canonical
// forms and otherwise the larger of the two directed distances, bracketed by a branch and bound over every edge (a value
// > 0 whenever the forms differ: two different simple boundaries differ at a vertex of one of them). N-52 (1)'s hard bar
// — Hausdorff ≤ 2 · √2 · attractCm on every block — is `compareRings`' `within`, decided exactly at every vertex.
export interface P {
  readonly x: number;
  readonly y: number;
}

function cross(o: P, a: P, b: P): number {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

/** Twice the ring's signed area (counter-clockwise positive), on an open ring. */
export function area2(ring: readonly P[]): number {
  let s = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) s += ring[j].x * ring[i].y - ring[i].x * ring[j].y;
  return s;
}

/**
 * The canonical form of a ring (see the module comment); [] for a ring of fewer than three distinct turning vertices.
 * One vertex is removed at a time, to a fixpoint — a copy of a repeated neighbour first, else the first vertex whose two
 * edges are collinear (a straight-through vertex, or a spike's tip whose two neighbours coincide) — so a spike folds
 * back to its base and the base corner stays: removing every collinear vertex at once would drop both copies of the
 * base once the tip is gone, and the corner with them.
 */
export function canonicalRing(ring: readonly P[]): P[] {
  const pts: P[] = ring.map((q) => ({ x: q.x, y: q.y }));
  for (;;) {
    const n = pts.length;
    if (n < 3) break;
    let at = -1;
    for (let i = 0; i < n && at < 0; i += 1) {
      const b = pts[i];
      const c = pts[(i + 1) % n];
      if (b.x === c.x && b.y === c.y) at = i;
    }
    if (at < 0) {
      for (let i = 0; i < n && at < 0; i += 1) if (cross(pts[(i - 1 + n) % n], pts[i], pts[(i + 1) % n]) === 0) at = i;
    }
    if (at < 0) break;
    pts.splice(at, 1);
  }
  if (pts.length < 3) return [];
  if (area2(pts) < 0) pts.reverse();
  let s = 0;
  for (let i = 1; i < pts.length; i += 1) if (pts[i].y < pts[s].y || (pts[i].y === pts[s].y && pts[i].x < pts[s].x)) s = i;
  return [...pts.slice(s), ...pts.slice(0, s)];
}

/** Equal canonical forms: the two rings bound the same closed point set. */
export function sameRing(a: readonly P[], b: readonly P[]): boolean {
  const x = canonicalRing(a);
  const y = canonicalRing(b);
  if (x.length !== y.length || x.length === 0) return false;
  for (let i = 0; i < x.length; i += 1) if (x[i].x !== y[i].x || x[i].y !== y[i].y) return false;
  return true;
}

/**
 * A ring's simple loops: a ring that passes a vertex twice is cut there into the loop between the two passes and the
 * rest, to a fixpoint (C-0333 (3)) — the L2 face walk carries a hole that touches the outer boundary at one vertex as a
 * loop of the outer ring, where `kerb` returns it as a ring of its own; each loop then in its canonical form, and a loop
 * of fewer than three turning vertices (a spur's out-and-back, a repeated vertex) dropped. A simple ring is one loop.
 */
export function loopsOf(ring: readonly P[]): P[][] {
  const loops: P[][] = [];
  const path: P[] = [];
  const at = new Map<string, number>();
  const key = (q: P): string => `${String(q.x)},${String(q.y)}`;
  for (const q of ring) {
    const j = at.get(key(q));
    if (j === undefined) {
      at.set(key(q), path.length);
      path.push({ x: q.x, y: q.y });
      continue;
    }
    const loop = path.splice(j + 1);
    for (const v of loop) at.delete(key(v));
    loops.push([path[j], ...loop]);
  }
  loops.push(path);
  return loops.map(canonicalRing).filter((l) => l.length >= 3);
}

/** A boundary's loops (every ring's `loopsOf`) in one canonical order. */
export function boundaryLoops(rings: readonly (readonly P[])[]): P[][] {
  const out = rings.flatMap(loopsOf);
  const cmp = (a: P[], b: P[]): number => {
    for (let i = 0; i < Math.min(a.length, b.length); i += 1) {
      if (a[i].y !== b[i].y) return a[i].y - b[i].y;
      if (a[i].x !== b[i].x) return a[i].x - b[i].x;
    }
    return a.length - b.length;
  };
  return out.sort(cmp);
}

/** Equal boundaries: the same canonical loops (the two bound the same closed point set). */
export function sameBoundary(a: readonly (readonly P[])[], b: readonly (readonly P[])[]): boolean {
  const x = boundaryLoops(a);
  const y = boundaryLoops(b);
  if (x.length !== y.length || x.length === 0) return false;
  return x.every((l, i) => l.length === y[i].length && l.every((q, j) => q.x === y[i][j].x && q.y === y[i][j].y));
}

function segDist(p: P, a: P, b: P): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const L = dx * dx + dy * dy;
  let t = L === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / L;
  t = Math.max(0, Math.min(1, t));
  const qx = a.x + t * dx - p.x;
  const qy = a.y + t * dy - p.y;
  return Math.sqrt(qx * qx + qy * qy);
}

/** The distance from a point to a closed ring's boundary. */
export function distToRing(p: P, ring: readonly P[]): number {
  let best = Infinity;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) best = Math.min(best, segDist(p, ring[j], ring[i]));
  return best;
}

/** The distance from a point to a boundary of several rings. */
function distToRings(p: P, rings: readonly (readonly P[])[]): number {
  let best = Infinity;
  for (const r of rings) best = Math.min(best, distToRing(p, r));
  return best;
}

/** The distance from a point to each edge of a boundary's rings (in each ring, edge i runs ring[i − 1] → ring[i]). */
function edgeDists(p: P, rings: readonly (readonly P[])[]): Float64Array {
  let n = 0;
  for (const r of rings) n += r.length;
  const out = new Float64Array(n);
  let k = 0;
  for (const ring of rings) for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) out[k++] = segDist(p, ring[j], ring[i]);
  return out;
}

function minOf(d: Float64Array): number {
  let m = Infinity;
  for (const v of d) if (v < m) m = v;
  return m;
}

/**
 * Is a lattice point within √q of a lattice ring's boundary — decided exactly in integers (every square and dot product
 * of lattice coordinates below 2²³ is an integer below 2⁵³; the one product that is not, a cross product squared against
 * q · |edge|², is taken in BigInt)?
 */
export function vertexWithin(p: P, ring: readonly P[], q: number): boolean {
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = ring[j];
    const b = ring[i];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const vx = p.x - a.x;
    const vy = p.y - a.y;
    const l2 = dx * dx + dy * dy;
    const dot = vx * dx + vy * dy;
    if (l2 === 0 || dot <= 0) {
      if (vx * vx + vy * vy <= q) return true;
      continue;
    }
    if (dot >= l2) {
      const wx = p.x - b.x;
      const wy = p.y - b.y;
      if (wx * wx + wy * wy <= q) return true;
      continue;
    }
    const c = BigInt(vx * dy - vy * dx);
    if (c * c <= BigInt(q) * BigInt(l2)) return true;
  }
  return false;
}

/** `vertexWithin` against a boundary of several rings: within √q of any of them. */
function vertexWithinRings(p: P, rings: readonly (readonly P[])[], q: number): boolean {
  return rings.some((r) => vertexWithin(p, r, q));
}

/** The B&B's budget of distance evaluations per directed pass; past it the open intervals count at their upper bound. */
const EVALS = 200_000;

/**
 * The directed distance sup over ring a's boundary of the distance to ring b's boundary, bracketed: branch and bound over
 * each edge of a with two upper bounds on an interval [t₀, t₁] — the 1-Lipschitz bound (d₀ + d₁ + its length) / 2, and,
 * since the distance to one edge of b is convex along a line, the least over b's edges of the larger end value — split
 * until the bound is within `tolCm` of the largest distance met (`lo`, which starts at `floor`). `hi` ≥ the true value
 * ≥ `lo`; `hi` − `lo` ≤ `tolCm` unless the budget ran out (then `hi` is still an upper bound).
 */
function directedBracket(as: readonly (readonly P[])[], b: readonly (readonly P[])[], floor: number, tolCm: number): { lo: number; hi: number } {
  let lo = floor;
  let hi = 0;
  let evals = 0;
  const at = (u: P, v: P, t: number): P => ({ x: u.x + t * (v.x - u.x), y: u.y + t * (v.y - u.y) });
  for (const a of as) for (let i = 0, j = a.length - 1; i < a.length; j = i, i += 1) {
    const u = a[j];
    const v = a[i];
    const len = Math.sqrt((v.x - u.x) * (v.x - u.x) + (v.y - u.y) * (v.y - u.y));
    const e0 = edgeDists(u, b);
    const e1 = edgeDists(v, b);
    lo = Math.max(lo, minOf(e0), minOf(e1));
    const stack: [number, Float64Array, number, Float64Array][] = [[0, e0, 1, e1]];
    while (stack.length > 0) {
      const [t0, d0, t1, d1] = stack.pop() as [number, Float64Array, number, Float64Array];
      const m0 = minOf(d0);
      const m1 = minOf(d1);
      let ub = (m0 + m1 + (t1 - t0) * len) / 2;
      for (let k = 0; k < d0.length; k += 1) ub = Math.min(ub, Math.max(d0[k], d1[k]));
      if (ub <= lo + tolCm || evals >= EVALS) {
        hi = Math.max(hi, ub);
        continue;
      }
      const tm = (t0 + t1) / 2;
      const dm = edgeDists(at(u, v, tm), b);
      evals += 1;
      lo = Math.max(lo, minOf(dm));
      stack.push([t0, d0, tm, dm], [tm, dm, t1, d1]);
    }
  }
  return { lo, hi: Math.max(hi, lo) };
}

/** The margin (cm) a double's distance may stand over the bound inside an edge and still count within (far below 1 cm). */
const MARGIN = 1e-9;

/**
 * Does every point of ring a's edges lie within `r` of ring b's boundary? Branch and bound over each edge with the two
 * upper bounds of `directedBracket`: an interval whose bound is ≤ r holds; a point met beyond r + MARGIN refutes; an
 * interval narrower than 1e-7 cm still undecided holds when its ends lie within r + MARGIN (a tie at a double's
 * precision); one the budget cannot decide refutes — never a pass on a guess.
 */
function directedWithin(as: readonly (readonly P[])[], b: readonly (readonly P[])[], r: number): boolean {
  let evals = 0;
  for (const a of as) for (let i = 0, j = a.length - 1; i < a.length; j = i, i += 1) {
    const u = a[j];
    const v = a[i];
    const len = Math.sqrt((v.x - u.x) * (v.x - u.x) + (v.y - u.y) * (v.y - u.y));
    const stack: [number, Float64Array, number, Float64Array][] = [[0, edgeDists(u, b), 1, edgeDists(v, b)]];
    while (stack.length > 0) {
      const [t0, d0, t1, d1] = stack.pop() as [number, Float64Array, number, Float64Array];
      const m0 = minOf(d0);
      const m1 = minOf(d1);
      if (m0 > r + MARGIN || m1 > r + MARGIN) return false;
      let ub = (m0 + m1 + (t1 - t0) * len) / 2;
      for (let k = 0; k < d0.length; k += 1) ub = Math.min(ub, Math.max(d0[k], d1[k]));
      if (ub <= r || (t1 - t0) * len < 1e-7) continue;
      if (evals >= EVALS) return false;
      const tm = (t0 + t1) / 2;
      evals += 1;
      const dm = edgeDists({ x: u.x + tm * (v.x - u.x), y: u.y + tm * (v.y - u.y) }, b);
      stack.push([t0, d0, tm, dm], [tm, dm, t1, d1]);
    }
  }
  return true;
}

/** Two rings compared (§13.2's contract test, N-52 (1)): the Hausdorff distance and whether it stays within a bound. */
export interface RingComparison {
  /** 0 exactly when the canonical forms are equal; otherwise an upper estimate within `tolCm` of the true distance. */
  readonly cm: number;
  /** The Hausdorff distance ≤ √boundSq (see `compareRings`). */
  readonly within: boolean;
}

/**
 * The Hausdorff distance (cm) between two closed lattice rings' boundaries and the bound's verdict. Equal canonical
 * forms are 0 and within. Otherwise both directed distances are bracketed by `directedBracket` (the vertices of both
 * rings measured first, so the bracket's floor is the largest vertex distance either way) and `cm` is the larger upper
 * end — at most `tolCm` (default 0.001 cm) above the true distance, never below it, and > 0 (two different canonical
 * boundaries differ at a vertex of one of them). `within` holds when every vertex of each ring lies within √boundSq of
 * the other ring — decided exactly in integers (`vertexWithin`) — and every point inside the edges does too
 * (`directedWithin`, both ways: doubles, a 1e-9 cm margin far below the 1 cm lattice, never a pass on an undecided
 * interval). A ring of fewer than three turning vertices on one side only is Infinity, never within.
 */
export function compareRings(a: readonly P[], b: readonly P[], boundSq = Infinity, tolCm = 0.001): RingComparison {
  return compareBoundaries([a], [b], boundSq, tolCm);
}

/**
 * `compareRings` on two boundaries of several rings each (a block with holes; S9's L2 face, whose walk carries a hole
 * touching the outer ring at a vertex as a loop of it): each side's `boundaryLoops`, equal loops 0 and within, otherwise
 * the Hausdorff distance between the two unions of loops, bracketed and judged as `compareRings` does.
 */
export function compareBoundaries(a: readonly (readonly P[])[], b: readonly (readonly P[])[], boundSq = Infinity, tolCm = 0.001): RingComparison {
  const x = boundaryLoops(a);
  const y = boundaryLoops(b);
  if (x.length === 0 || y.length === 0) return x.length === y.length ? { cm: 0, within: true } : { cm: Infinity, within: false };
  if (sameBoundary(x, y)) return { cm: 0, within: true };
  let floor = 0;
  for (const l of x) for (const p of l) floor = Math.max(floor, distToRings(p, y));
  for (const l of y) for (const p of l) floor = Math.max(floor, distToRings(p, x));
  const ab = directedBracket(x, y, floor, tolCm);
  const ba = directedBracket(y, x, Math.max(floor, ab.lo), tolCm);
  const d = Math.max(ab.hi, ba.hi);
  const cm = d > 0 ? d : Number.MIN_VALUE;
  if (!Number.isFinite(boundSq)) return { cm, within: true };
  const exactVertices = x.every((l) => l.every((p) => vertexWithinRings(p, y, boundSq))) && y.every((l) => l.every((p) => vertexWithinRings(p, x, boundSq)));
  const r = Math.sqrt(boundSq);
  return { cm, within: exactVertices && directedWithin(x, y, r) && directedWithin(y, x, r) };
}

/**
 * The Hausdorff distance (cm) between two closed rings' boundaries: 0 exactly when their canonical forms are equal;
 * otherwise `compareRings`' upper estimate (within `tolCm` of the true distance, never 0).
 */
export function hausdorffCm(a: readonly P[], b: readonly P[], tolCm = 0.001): number {
  return compareRings(a, b, Infinity, tolCm).cm;
}
