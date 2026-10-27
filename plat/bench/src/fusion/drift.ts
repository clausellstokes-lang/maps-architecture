// The stop kerb's drift (M0-c-06; §13.2's contract test read by N-52 (1) and N-57 (4); readings C-0270 (5), C-0320 (1),
// C-0437).
//
// S8 records the kerb it stopped on — kerb(F) AT THE CUT (`blockFaces.kerb`); the working block is kerb(F) of the same
// face as S8 left it, read after the derivation. Later lanes of the district land T-junctions on the face's spines, and
// their split feet pin a long band edge the kerb at the cut held within 2 · attractCm of its place (N-52's class (a)); at
// a sub-degree needle tip that lawful edge offset reads as metres of Hausdorff while every stop vertex lies on the working
// ring (N-57 (4)). So the drift clause bounds the EDGE OFFSET (C-0437 (1)): the SLIVER WIDTH of any region between
// the two rings — of working ∖ stop (N-57 (4) (ii)) and of stop ∖ working (its mirror: at fusion 30's 4° wedge the
// needle is the STOP kerb's, 199.6 cm past the working tip) — the widest disc inside one region and outside the other,
// its diameter (`sliver`, a branch and bound over the plane: inside that region the disc's radius at x is
// min(dist(x, ∂one), dist(x, ∂other)) exactly), each within N-52 (1)'s 2 · √2 · attractCm. Reported beside it: the
// ONE-SIDED distance stop → working (N-57 (4) (i), `directed`, a branch and bound over the stop's edges), the
// Hausdorff distance and the needle's length (`needleCm`: how much of each ring lies beyond the bound from the other).
// A 1 m parallel shift of a whole edge, outward or inward, gives a 1 m wide sliver: it fails.
//
// For a block a back lane or a through alley split (§4.6's deep-interior rule), the stop kerb of each child is the kerb at
// the split: the parent's kerb at the cut less the spine's band (kerb(child) = child − ⋃ buffer, §3.7; the parent's
// buffers are already out of the parent's kerb). S8 records the child's seed (`kerbSeed`, M0-b-03 s4) but not that ring, so
// the harness rebuilds it from the record and the committed spine (`cutRegion`; C-0437 (2)): the bands of the lanes whose
// centreline enters the parent's stop kerb, each segment's band a stadium (its round caps as 8-chord arcs inside the
// circle). Never the parent's kerb whole, never the child's kerb read after S8 (that made the clause vacuous). Where the
// band cuts the parent's kerb into more parts than the block has seeds (a part cut off at a neck inside the band: river
// fusion seed 2's block:6as10njkpyf8c), the stop region is read in the parts holding a seed — S8 seeds a child in its
// kerb's part — and a part with no seed is counted (`seedComponents`), never read as drift.
//
// Arithmetic: doubles, a 1e-9 cm margin over the bound (the hard S8 ≡ S9 bar stays exact at the lattice's vertices,
// hausdorff.ts); a rebuilt child kerb is off the lattice.
import { area2, type P } from './hausdorff.js';

/** One boundary piece. */
export interface Seg {
  readonly a: P;
  readonly b: P;
}

/** A region compared: its boundary pieces and its membership (open; a point on the boundary may read either way). */
export interface Region {
  readonly edges: readonly Seg[];
  inside(p: P): boolean;
}

/** A lane's band: its committed centreline and its half-width (cm). */
export interface Band {
  readonly line: readonly P[];
  readonly hw: number;
}

/** The margin (cm) a double's distance may stand over the bound and still count within (far below the 1 cm lattice). */
export const DRIFT_MARGIN = 1e-9;

/** The budget of distance evaluations of one directed pass or one sliver search; past it an undecided verdict refutes. */
export const DRIFT_EVALS = 400_000;

/** A ring's edges (closing edge last), counter-clockwise — the region on their left; repeated vertices give no edge. */
export function ringEdges(ring: readonly P[]): Seg[] {
  if (area2(ring) < 0) ring = ring.slice().reverse();
  const out: Seg[] = [];
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    if (a.x !== b.x || a.y !== b.y) out.push({ a, b });
  }
  return out;
}

/** Even-odd membership of a point in a closed ring (doubles; a point on the boundary may read either way). */
export function inRing(p: P, ring: readonly P[]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = ring[j];
    const b = ring[i];
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

/** The distance from a point to a segment. */
export function segDist(p: P, a: P, b: P): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const L = dx * dx + dy * dy;
  let t = L === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / L;
  t = Math.max(0, Math.min(1, t));
  const qx = a.x + t * dx - p.x;
  const qy = a.y + t * dy - p.y;
  return Math.sqrt(qx * qx + qy * qy);
}

/** The distance from a point to a set of boundary pieces (Infinity for none). */
export function distToSegs(p: P, segs: readonly Seg[]): number {
  let best = Infinity;
  for (const s of segs) {
    const d = segDist(p, s.a, s.b);
    if (d < best) best = d;
  }
  return best;
}

/** One ring as a region. */
export function ringRegion(ring: readonly P[]): Region {
  return { edges: ringEdges(ring), inside: (p) => inRing(p, ring) };
}

/** Several disjoint rings as one region (a split block's children). */
export function unionRegion(rings: readonly (readonly P[])[]): Region {
  const rs = rings.filter((r) => r.length >= 3);
  return { edges: rs.flatMap(ringEdges), inside: (p) => rs.some((r) => inRing(p, r)) };
}

/** A centreline with its collinear interior vertices dropped (exact cross product 0, going on). */
function straightRuns(line: readonly P[]): P[] {
  const pts: P[] = [];
  for (const q of line) {
    const last = pts[pts.length - 1];
    if (last !== undefined && last.x === q.x && last.y === q.y) continue;
    pts.push(q);
    while (pts.length >= 3) {
      const [o, a, b] = pts.slice(-3);
      const c = (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
      const dot = (a.x - o.x) * (b.x - a.x) + (a.y - o.y) * (b.y - a.y);
      if (c !== 0 || dot < 0) break;
      pts.splice(pts.length - 2, 1);
    }
  }
  return pts;
}

/**
 * A segment's band as a counter-clockwise polygon: the stadium of half-width hw around a → b, each round cap the
 * `arcSteps` chords inscribed in its half circle (a point of the band within hw · (1 − cos(π / 2·arcSteps)) of a cap may
 * read outside it: ≤ 2 % of hw at 8 steps).
 */
export function bandPolygon(a: P, b: P, hw: number, arcSteps = 8): P[] {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const L = Math.hypot(dx, dy);
  const ux = L === 0 ? 1 : dx / L;
  const uy = L === 0 ? 0 : dy / L;
  const base = Math.atan2(uy, ux);
  const out: P[] = [];
  // The cap at b from the right side (−90°) to the left (+90°), then the cap at a from +90° to +270°.
  for (let i = 0; i <= arcSteps; i += 1) {
    const t = base - Math.PI / 2 + (Math.PI * i) / arcSteps;
    out.push({ x: b.x + hw * Math.cos(t), y: b.y + hw * Math.sin(t) });
  }
  for (let i = 0; i <= arcSteps; i += 1) {
    const t = base + Math.PI / 2 + (Math.PI * i) / arcSteps;
    out.push({ x: a.x + hw * Math.cos(t), y: a.y + hw * Math.sin(t) });
  }
  return out;
}

/** The parameters in (0, 1) where segment a → b properly crosses an edge of a ring. */
function crossings(a: P, b: P, ring: readonly P[], into: number[]): void {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const p = ring[j];
    const q = ring[i];
    const ex = q.x - p.x;
    const ey = q.y - p.y;
    const den = dx * ey - dy * ex;
    if (den === 0) continue;
    const t = ((p.x - a.x) * ey - (p.y - a.y) * ex) / den;
    const u = ((p.x - a.x) * dy - (p.y - a.y) * dx) / den;
    if (t > 0 && t < 1 && u >= 0 && u <= 1) into.push(t);
  }
}

/** The pieces of segment a → b, cut where it crosses any of the rings, that `keep` accepts at their midpoints. */
function piecesOf(a: P, b: P, rings: readonly (readonly P[])[], keep: (m: P) => boolean, into: Seg[]): void {
  const ts = [0, 1];
  for (const r of rings) crossings(a, b, r, ts);
  ts.sort((x, y) => x - y);
  for (let i = 1; i < ts.length; i += 1) {
    if (ts[i] - ts[i - 1] <= 0) continue;
    const m = (ts[i] + ts[i - 1]) / 2;
    const at = (t: number): P => ({ x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) });
    if (keep(at(m))) into.push({ a: at(ts[i - 1]), b: at(ts[i]) });
  }
}

/**
 * The stop kerb of a block a spine split, rebuilt at the split: the parent's kerb at the cut less the open bands of the
 * given lanes (each segment of a lane's straight runs a `bandPolygon`). Its boundary: the parent's edges outside every
 * band and each band's boundary inside the parent's kerb and outside the other bands. With no band it is the ring itself.
 */
export function cutRegion(ring: readonly P[], bands: readonly Band[]): Region {
  if (bands.length === 0) return ringRegion(ring);
  const polys: P[][] = [];
  for (const b of bands) {
    const run = straightRuns(b.line);
    for (let i = 1; i < run.length; i += 1) polys.push(bandPolygon(run[i - 1], run[i], b.hw));
  }
  if (polys.length === 0) return ringRegion(ring);
  const inBand = (p: P, skip = -1): boolean => polys.some((q, i) => i !== skip && inRing(p, q));
  const edges: Seg[] = [];
  for (const e of ringEdges(ring)) piecesOf(e.a, e.b, polys, (m) => !inBand(m), edges);
  polys.forEach((poly, i) => {
    // A band's boundary bounds the region from outside the band: clockwise, the region on its left.
    for (const e of ringEdges(poly)) piecesOf(e.b, e.a, [ring, ...polys.filter((_, j) => j !== i)], (m) => inRing(m, ring) && !inBand(m, i), edges);
  });
  return { edges, inside: (p) => inRing(p, ring) && !inBand(p) };
}

/** The tolerance (cm) within which one boundary piece's end meets the next piece's start when loops are chained. */
export const CHAIN_TOL = 1e-3;

/**
 * A region's boundary pieces chained into closed loops (each piece's end to the nearest unused piece's start within
 * `CHAIN_TOL`, the pieces of one edge exactly), each loop its vertices in order — counter-clockwise for an outer
 * boundary, clockwise for a hole (the region on the pieces' left). Null when the pieces do not close (a piece with no
 * start within the tolerance): the caller then keeps the region whole.
 */
export function regionLoops(edges: readonly Seg[]): P[][] | null {
  const used = new Array<boolean>(edges.length).fill(false);
  const loops: P[][] = [];
  for (let s0 = 0; s0 < edges.length; s0 += 1) {
    if (used[s0]) continue;
    used[s0] = true;
    const loop: P[] = [edges[s0].a];
    let end = edges[s0].b;
    const start = edges[s0].a;
    for (let guard = 0; ; guard += 1) {
      if (Math.hypot(end.x - start.x, end.y - start.y) <= CHAIN_TOL) break;
      if (guard > edges.length) return null;
      let best = -1;
      let bestD = CHAIN_TOL;
      for (let j = 0; j < edges.length; j += 1) {
        if (used[j]) continue;
        const d = Math.hypot(edges[j].a.x - end.x, edges[j].a.y - end.y);
        if (d <= bestD) {
          bestD = d;
          best = j;
        }
      }
      if (best < 0) return null;
      used[best] = true;
      loop.push(edges[best].a);
      end = edges[best].b;
    }
    loops.push(loop);
  }
  return loops;
}

/** A region kept to the components that hold given points, and the count of its components that hold none. */
export interface SeedComponents {
  readonly region: Region;
  /** The region's outer loops holding none of the points (a split child's kerb part with no seed). */
  readonly seedless: number;
}

/**
 * The components of a region that hold one of the given points (a split block's seeds): each outer loop (positive area)
 * holding a point strictly inside the region, with the holes whose first vertex lies inside it; the rest are counted as
 * seedless. Its membership: inside the region and inside a kept outer loop. When the boundary does not chain into loops
 * (`regionLoops` null) or no point is given, the region is kept whole (seedless 0).
 */
export function seedComponents(region: Region, points: readonly P[]): SeedComponents {
  if (points.length === 0) return { region, seedless: 0 };
  const loops = regionLoops(region.edges);
  if (loops === null) return { region, seedless: 0 };
  const outers = loops.filter((l) => l.length >= 3 && area2(l) > 0);
  const holes = loops.filter((l) => l.length >= 3 && area2(l) < 0);
  const kept: P[][] = [];
  let seedless = 0;
  for (const o of outers) {
    if (points.some((q) => region.inside(q) && inRing(q, o))) kept.push(o);
    else seedless += 1;
  }
  if (kept.length === outers.length) return { region, seedless: 0 };
  const inKept = (q: P): boolean => kept.some((o) => inRing(q, o));
  const keptHoles = holes.filter((h) => inKept(h[0]));
  return { region: { edges: [...kept, ...keptHoles].flatMap(loopEdges), inside: (q) => region.inside(q) && inKept(q) }, seedless };
}

/** A chained loop's pieces, in its own order (no re-orientation: a hole keeps its clockwise run). */
function loopEdges(loop: readonly P[]): Seg[] {
  const out: Seg[] = [];
  for (let i = 0; i < loop.length; i += 1) {
    const a = loop[i];
    const b = loop[(i + 1) % loop.length];
    if (a.x !== b.x || a.y !== b.y) out.push({ a, b });
  }
  return out;
}

/**
 * The pieces of boundary `a` that do not lie on boundary `b` running the same way (each piece of a cut at the vertices
 * of b lying on it; a piece is shared when both its ends lie within 1e-6 cm of one piece of b pointing the same way).
 * Both boundaries keep their region on the left, so a shared piece has the two regions on the same side.
 */
export function differing(a: readonly Seg[], b: readonly Seg[], eps = 1e-6): Seg[] {
  const out: Seg[] = [];
  for (const e of a) {
    const dx = e.b.x - e.a.x;
    const dy = e.b.y - e.a.y;
    const L2 = dx * dx + dy * dy;
    if (L2 === 0) continue;
    const ts = [0, 1];
    for (const f of b) {
      for (const v of [f.a, f.b]) {
        const t = ((v.x - e.a.x) * dx + (v.y - e.a.y) * dy) / L2;
        if (t > 0 && t < 1 && segDist(v, e.a, e.b) <= eps) ts.push(t);
      }
    }
    ts.sort((x, y) => x - y);
    for (let i = 1; i < ts.length; i += 1) {
      if (ts[i] - ts[i - 1] <= 0) continue;
      const p0 = { x: e.a.x + ts[i - 1] * dx, y: e.a.y + ts[i - 1] * dy };
      const p1 = { x: e.a.x + ts[i] * dx, y: e.a.y + ts[i] * dy };
      const shared = b.some((f) => (f.b.x - f.a.x) * dx + (f.b.y - f.a.y) * dy > 0 && segDist(p0, f.a, f.b) <= eps && segDist(p1, f.a, f.b) <= eps);
      if (!shared) out.push({ a: p0, b: p1 });
    }
  }
  return out;
}

/** A directed distance, bracketed, and its verdict against a bound. */
export interface Directed {
  /** An upper estimate of sup over a's boundary of the distance to b's boundary (within `tolCm` of it when decided). */
  readonly cm: number;
  /** Every point of a's boundary lies within the bound of b's boundary (decided; an undecided interval refutes). */
  readonly within: boolean;
}

/**
 * The directed distance from boundary pieces `a` to boundary pieces `b`: a branch and bound over each piece of a with two
 * upper bounds on an interval — the 1-Lipschitz bound (d₀ + d₁ + its length) / 2 and, the distance to one piece of b
 * being convex along a line, the least over b's pieces of the larger end value. An interval is closed when its bound is
 * within `tolCm` of the largest distance met and the verdict against `r` is decided (its bound ≤ r, or a point met beyond
 * r + DRIFT_MARGIN); an interval narrower than 1e-7 cm closes on its ends; past the budget the open intervals count at
 * their bound and an undecided one refutes.
 */
export function directed(a: readonly Seg[], b: readonly Seg[], r = Infinity, tolCm = 0.01): Directed {
  if (a.length === 0) return { cm: 0, within: true };
  if (b.length === 0) return { cm: Infinity, within: false };
  const nb = b.length;
  const dists = (p: P): Float64Array => {
    const out = new Float64Array(nb);
    for (let k = 0; k < nb; k += 1) out[k] = segDist(p, b[k].a, b[k].b);
    return out;
  };
  const minOf = (d: Float64Array): number => {
    let m = Infinity;
    for (const v of d) if (v < m) m = v;
    return m;
  };
  let lo = 0;
  let hi = 0;
  let evals = 0;
  let undecided = false;
  for (const s of a) {
    const len = Math.hypot(s.b.x - s.a.x, s.b.y - s.a.y);
    const e0 = dists(s.a);
    const e1 = dists(s.b);
    lo = Math.max(lo, minOf(e0), minOf(e1));
    const stack: [number, Float64Array, number, Float64Array][] = [[0, e0, 1, e1]];
    while (stack.length > 0) {
      const [t0, d0, t1, d1] = stack.pop() as [number, Float64Array, number, Float64Array];
      const m0 = minOf(d0);
      const m1 = minOf(d1);
      let ub = (m0 + m1 + (t1 - t0) * len) / 2;
      for (let k = 0; k < nb; k += 1) ub = Math.min(ub, Math.max(d0[k], d1[k]));
      const decided = ub <= r || lo > r + DRIFT_MARGIN;
      if ((ub <= lo + tolCm && decided) || (t1 - t0) * len < 1e-7) {
        hi = Math.max(hi, (t1 - t0) * len < 1e-7 ? Math.max(m0, m1) : ub);
        continue;
      }
      if (evals >= DRIFT_EVALS) {
        hi = Math.max(hi, ub);
        if (!decided) undecided = true;
        continue;
      }
      const tm = (t0 + t1) / 2;
      evals += 1;
      const dm = dists({ x: s.a.x + tm * (s.b.x - s.a.x), y: s.a.y + tm * (s.b.y - s.a.y) });
      lo = Math.max(lo, minOf(dm));
      stack.push([t0, d0, tm, dm], [tm, dm, t1, d1]);
    }
  }
  // Not refuted, every closed interval's bound was ≤ r (or a sub-1e-7 cm interval with both ends ≤ lo).
  return { cm: Math.max(hi, lo), within: !undecided && lo <= r + DRIFT_MARGIN };
}

/** The sliver width of one region beyond another and its verdict. */
export interface Sliver {
  /** The widest disc's diameter met inside `working` and outside `stop` (cm; within 2 · tolCm under the true width). */
  readonly cm: number;
  /** The width ≤ the bound (decided; an undecided cell at the budget refutes). */
  readonly within: boolean;
}

/**
 * The sliver width of working ∖ stop: twice the largest radius of a disc inside the working region and outside the stop
 * region. Inside that region the largest disc centred at x has radius g(x) = min(dist(x, ∂working), dist(x, ∂stop)), and
 * g is 1-Lipschitz; a branch and bound over squares of the working ring's box: a cell whose centre c lies in the region
 * bounds its points by g(c) + h (h its half-diagonal); a cell whose centre lies outside holds none of them when its disc
 * meets no piece where the two boundaries differ (`differing`: there they coincide, running the same way), else bounds
 * them by h less the distance from c to the boundary a point of the region is separated from c by. A cell closes
 * once the verdict is decided on it (its bound ≤ r / 2, or a point met beyond r / 2 + DRIFT_MARGIN) and its value bound
 * — the lesser of that bound and its centre's distance to the pieces where the two boundaries differ, plus h — is within
 * `tolCm` of the best radius met; past the budget an undecided cell refutes. Equal boundaries (no differing piece) give
 * 0. The width reported is the best disc met, within 2 · `tolCm` of the true width; the verdict is decided either way.
 */
export function sliver(working: Region, stop: Region, r: number, tolCm = 1): Sliver {
  if (working.edges.length === 0) return { cm: 0, within: true };
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const e of working.edges) {
    for (const q of [e.a, e.b]) {
      x0 = Math.min(x0, q.x);
      y0 = Math.min(y0, q.y);
      x1 = Math.max(x1, q.x);
      y1 = Math.max(y1, q.y);
    }
  }
  const t = r / 2;
  // The region's boundary lies on the two boundaries where they differ: no point of the region is farther than its
  // distance to those pieces from the region's boundary (the value's bound; the verdict never rests on it).
  const diff = [...differing(working.edges, stop.edges), ...differing(stop.edges, working.edges)];
  if (diff.length === 0) return { cm: 0, within: true };
  let lo = 0;
  let evals = 0;
  let undecided = false;
  const half0 = Math.max(x1 - x0, y1 - y0) / 2;
  const stack: [number, number, number][] = [[(x0 + x1) / 2, (y0 + y1) / 2, half0]];
  while (stack.length > 0) {
    const [cx, cy, s] = stack.pop() as [number, number, number];
    const c = { x: cx, y: cy };
    const h = s * Math.SQRT2;
    const dW = distToSegs(c, working.edges);
    const dS = distToSegs(c, stop.edges);
    const inW = working.inside(c);
    const inR = inW && !stop.inside(c);
    evals += 1;
    const g = Math.min(dW, dS);
    if (inR) lo = Math.max(lo, g);
    const dD = distToSegs(c, diff);
    // A point x of the region in the cell: g(x) ≤ g(c) + h when c lies in it. Otherwise: when the cell's disc meets no
    // differing piece, the two boundaries coincide in it, running the same way, so every part of the disc they cut is
    // in both regions or in neither, and a disc they do not cut is wholly in the region or wholly out — with c out, no
    // point of the region lies in it (0); else the segment c → x crosses ∂working (c outside the working block) or
    // ∂stop (c inside both), at least that far from c, so g(x) ≤ h − that distance.
    const ub = inR ? g + h : dD > h ? 0 : Math.max(0, h - (inW ? dS : dW));
    const ubv = Math.min(ub, dD + h);
    const decided = ub <= t || lo > t + DRIFT_MARGIN;
    if (s < 1e-4 || (decided && ubv <= lo + tolCm)) continue;
    if (evals >= DRIFT_EVALS) {
      if (!decided) undecided = true;
      continue;
    }
    const q = s / 2;
    stack.push([cx - q, cy - q, q], [cx + q, cy - q, q], [cx - q, cy + q, q], [cx + q, cy + q, q]);
  }
  return { cm: 2 * lo, within: !undecided && lo <= t + DRIFT_MARGIN };
}

/**
 * The needle's length (reported only): the length of the working boundary farther than `r` from the stop kerb's
 * boundary, sampled at ≤ `stepCm` along each piece (a step counts when both its ends lie beyond r).
 */
export function needleCm(working: readonly Seg[], stop: readonly Seg[], r: number, stepCm = 10): number {
  let total = 0;
  for (const e of working) {
    const len = Math.hypot(e.b.x - e.a.x, e.b.y - e.a.y);
    const n = Math.max(1, Math.ceil(len / stepCm));
    let prev = distToSegs(e.a, stop) > r;
    for (let i = 1; i <= n; i += 1) {
      const u = i / n;
      const now = distToSegs({ x: e.a.x + u * (e.b.x - e.a.x), y: e.a.y + u * (e.b.y - e.a.y) }, stop) > r;
      if (prev && now) total += len / n;
      prev = now;
    }
  }
  return total;
}

/** One working block against its stop kerb: the drift clause's two distances and its verdict (measure.ts `blockDrift`). */
export interface DriftComparison {
  /** (i) the one-sided distance stop → working (cm) and its verdict. */
  readonly oneSidedCm: number;
  /** (ii) the sliver width of working ∖ stop (cm) and its verdict. */
  readonly sliverCm: number;
  /** Both within the bound. */
  readonly within: boolean;
}
