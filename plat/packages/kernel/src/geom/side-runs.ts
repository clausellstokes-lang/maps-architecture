// sideRuns(face, turnTolCdeg): a face's sides as runs (§3.4; §4.6 *Sides*, GEO-22) — maximal boundary chains whose
// edge directions stay within a turning tolerance, each with its chord direction: a side notion that survives the
// curved, Chaikin-smoothed and round-joined kerbs the bent cut plans on, where "perpendicular to a side" must never be
// read off the one short segment a cut happens to hit. M0-a-10. Readings recorded in C-0159 (4):
//
// * A face is passed as its rings — the outer ring first, then its holes (what `kerb` returns, §3.7, and what
//   `faceRings` reads from an arena face). Each ring is read in boundary order, the face on the left of every edge (the
//   outer ring counter-clockwise, a hole clockwise), consecutive repeats of a lattice point dropped; a ring of fewer
//   than 3 distinct points gives no run.
// * "Within a cumulative turning tolerance" is read as a band: every edge of a run points within `turnTolCdeg` of every
//   other, measured from the run's first edge (so the cumulative turning along the run spans at most the tolerance).
//   Runs are cut greedily in boundary order from the vertex with the largest turn (ties: the lowest-leftmost), and the
//   last run joins the first where the band allows — a deterministic segmentation that does not depend on the vertex
//   a ring's list starts at. The tolerance is asserted in [0, 90°], where no turn can wrap into the band.
// * A crossing street's fillet arc is replaced by its virtual corner (§4.6): with `arcMaxCm` > 0, a maximal sequence of
//   runs each with a chord shorter than `arcMaxCm`, lying between two runs at least that long, that bends one way through
//   more than the tolerance is dropped, and the two long runs' chords are extended to the point where their lines meet.
//   The arc's scale is the caller's (S8 passes its kerb's corner scale; M0-b-02): with `arcMaxCm` 0 — the default —
//   nothing is collapsed.
// * `runTangent` is §4.6's tangent over a ± 5 m window on a curved run.
import { dmath } from '../dmath/index.js';
import { orient, ratio } from '../num/index.js';
import { roundHalfAway } from '../num/lattice.js';
import type { LatticePoint } from '../types/index.js';
import { CDEG_PER_RAD, distinctRing, unitOf, type XY } from './common.js';

/** One run of a face's boundary. Values in cm (doubles). */
export interface Run {
  /** The ring it lies on: 0 the outer ring, then the holes in the order passed. */
  ring: number;
  /** Its boundary vertices in boundary order (the face on the left), first to last. */
  points: XY[];
  /** The chord's ends: its first and last vertex, or the virtual corner where a fillet arc beside it was replaced. */
  a: XY;
  b: XY;
  /** The chord's unit direction, a → b. */
  dir: XY;
  /** |b − a|. */
  lengthCm: number;
  /** How far its edge directions spread, in whole centidegrees (0 for a straight run). */
  spreadCdeg: number;
  /** Whether `a` / `b` is a virtual corner. */
  virtualStart: boolean;
  virtualEnd: boolean;
}

export interface SideRunOptions {
  /** A run with a chord shorter than this is a fillet-arc piece when it bends with its neighbours (cm; 0: none). */
  arcMaxCm?: number;
}

/** The face's rings as `sideRuns` and `sampleBoundary` read them: the outer ring first, then its holes. */
export type FaceRings = readonly (readonly LatticePoint[])[];

interface Proto {
  /** Index into the oriented ring of its first vertex. */
  start: number;
  /** Its edge count. */
  count: number;
  spread: number;
}

/** The signed angle (radians) from direction (ax, ay) to (bx, by): exact inputs, dmath's atan2. */
function angle(ax: number, ay: number, bx: number, by: number): number {
  return dmath.atan2(ax * by - ay * bx, ax * bx + ay * by) + 0;
}

/** The runs of one oriented ring of m ≥ 3 distinct lattice points. */
function ringRuns(pts: readonly LatticePoint[], tolRad: number): Proto[] {
  const m = pts.length;
  const ex = new Float64Array(m);
  const ey = new Float64Array(m);
  for (let i = 0; i < m; i += 1) {
    const j = i + 1 === m ? 0 : i + 1;
    ex[i] = pts[j].x - pts[i].x;
    ey[i] = pts[j].y - pts[i].y;
  }
  // The start: the vertex with the largest turn, ties to the lowest-leftmost.
  let s = 0;
  let sTurn = -1;
  for (let i = 0; i < m; i += 1) {
    const p = i === 0 ? m - 1 : i - 1;
    const t = Math.abs(angle(ex[p], ey[p], ex[i], ey[i]));
    const q = pts[i];
    const r = pts[s];
    if (t > sTurn || (t === sTurn && (q.y < r.y || (q.y === r.y && q.x < r.x)))) {
      s = i;
      sTurn = t;
    }
  }
  const runs: Proto[] = [];
  let cur: Proto = { start: s, count: 1, spread: 0 };
  let lo = 0;
  let hi = 0;
  for (let k = 1; k < m; k += 1) {
    const e = (s + k) % m;
    const f = cur.start;
    const rel = angle(ex[f], ey[f], ex[e], ey[e]);
    const nlo = rel < lo ? rel : lo;
    const nhi = rel > hi ? rel : hi;
    if (nhi - nlo <= tolRad) {
      cur.count += 1;
      lo = nlo;
      hi = nhi;
      cur.spread = hi - lo;
    } else {
      runs.push(cur);
      cur = { start: e, count: 1, spread: 0 };
      lo = 0;
      hi = 0;
    }
  }
  runs.push(cur);
  if (runs.length >= 2) {
    // The last run joins the first where one band holds both.
    const last = runs[runs.length - 1];
    const first = runs[0];
    let jlo = 0;
    let jhi = 0;
    for (let k = 0; k < last.count + first.count; k += 1) {
      const e = (last.start + k) % m;
      const rel = angle(ex[last.start], ey[last.start], ex[e], ey[e]);
      if (rel < jlo) jlo = rel;
      if (rel > jhi) jhi = rel;
    }
    if (jhi - jlo <= tolRad) {
      runs.pop();
      runs[0] = { start: last.start, count: last.count + first.count, spread: jhi - jlo };
    }
  }
  return runs;
}

function xy(p: LatticePoint): XY {
  return { x: p.x, y: p.y };
}

/** The finished run from its vertices and chord ends. */
function makeRun(ring: number, points: XY[], a: XY, b: XY, spread: number, vs: boolean, ve: boolean): Run {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dir = unitOf({ x: dx, y: dy }) ?? { x: 1, y: 0 };
  return { ring, points, a, b, dir, lengthCm: Math.sqrt(dx * dx + dy * dy), spreadCdeg: roundHalfAway(spread * CDEG_PER_RAD) + 0, virtualStart: vs, virtualEnd: ve };
}

/**
 * The face's runs: per ring in the order passed, each ring's runs in boundary order from its start (above). Throws a
 * RangeError when `turnTolCdeg` is not in [0, 9000] or `arcMaxCm` is negative or not finite.
 */
export function sideRuns(face: FaceRings, turnTolCdeg: number, opts: SideRunOptions = {}): Run[] {
  if (!(turnTolCdeg >= 0 && turnTolCdeg <= 9000)) throw new RangeError(`sideRuns: turnTolCdeg must lie in [0, 9000], got ${String(turnTolCdeg)}`);
  const arcMax = opts.arcMaxCm ?? 0;
  if (!(arcMax >= 0 && arcMax < Infinity)) throw new RangeError(`sideRuns: arcMaxCm must be finite and ≥ 0, got ${String(arcMax)}`);
  const tolRad = ratio(turnTolCdeg, CDEG_PER_RAD, 'angle');
  const tol = tolRad.ok ? tolRad.value : 0;
  const out: Run[] = [];
  for (let r = 0; r < face.length; r += 1) {
    const pts = distinctRing(face[r]);
    const m = pts.length;
    if (m < 3) continue;
    const o = orient(pts);
    if (o !== 0 && o !== (r === 0 ? 1 : -1)) pts.reverse();
    const protos = ringRuns(pts, tol);
    const k = protos.length;
    const vtx = protos.map((p) => {
      const v: LatticePoint[] = [];
      for (let t = 0; t <= p.count; t += 1) v.push(pts[(p.start + t) % m]);
      return v;
    });
    const a: XY[] = vtx.map((v) => xy(v[0]));
    const b: XY[] = vtx.map((v) => xy(v[v.length - 1]));
    const vs = new Array<boolean>(k).fill(false);
    const ve = new Array<boolean>(k).fill(false);
    const dropped = new Array<boolean>(k).fill(false);
    if (arcMax > 0 && k >= 3) {
      const chordX = vtx.map((v) => v[v.length - 1].x - v[0].x);
      const chordY = vtx.map((v) => v[v.length - 1].y - v[0].y);
      const long = chordX.map((x, i) => Math.sqrt(x * x + chordY[i] * chordY[i]) >= arcMax);
      // Collapses the short runs strictly between long runs P and N into the virtual corner of their chords' lines.
      const collapse = (P: number, N: number): void => {
        const dPx = chordX[P];
        const dPy = chordY[P];
        const dNx = chordX[N];
        const dNy = chordY[N];
        const theta = angle(dPx, dPy, dNx, dNy);
        if (!(Math.abs(theta) > tol)) return;
        const sign = theta > 0 ? 1 : -1;
        // Every turn from P through the arc's pieces to N bends the same way (a zero turn allowed).
        for (let x = P; x !== N; x = (x + 1) % k) {
          const y = (x + 1) % k;
          if (angle(chordX[x], chordY[x], chordX[y], chordY[y]) * sign < 0) return;
        }
        const den = dPx * dNy - dPy * dNx; // exact: lattice chords
        const aP = vtx[P][0];
        const aN = vtx[N][0];
        const wx = aN.x - aP.x;
        const wy = aN.y - aP.y;
        const sP = ratio(wx * dNy - wy * dNx, den, 'area');
        const tN = ratio(wx * dPy - wy * dPx, den, 'area');
        // The corner must extend P forward and N backward, or the arc is no fillet between them.
        if (!sP.ok || !tN.ok || !(sP.value > 0) || !(tN.value < 1)) return;
        const X = { x: aP.x + dPx * sP.value, y: aP.y + dPy * sP.value };
        b[P] = X;
        ve[P] = true;
        a[N] = { x: X.x, y: X.y };
        vs[N] = true;
        for (let x = (P + 1) % k; x !== N; x = (x + 1) % k) dropped[x] = true;
      };
      const firstLong = long.indexOf(true);
      if (firstLong !== -1 && long.filter((x) => x).length >= 2) {
        let i = firstLong;
        do {
          let j = (i + 1) % k;
          while (!long[j]) j = (j + 1) % k;
          if (j !== (i + 1) % k) collapse(i, j);
          i = j;
        } while (i !== firstLong);
      }
    }
    for (let i = 0; i < k; i += 1) {
      if (dropped[i]) continue;
      out.push(makeRun(r, vtx[i].map(xy), a[i], b[i], protos[i].spread, vs[i], ve[i]));
    }
  }
  return out;
}

/**
 * The tangent of a run at the point of it nearest `at`, over a window of ± `windowCm` along it (§4.6: on a curved run
 * "the tangent over a ± 5 m window at the contact point"): the unit direction between the run's points that far before
 * and after, clamped to its ends; a run of no length gives its chord direction.
 */
export function runTangent(run: Run, at: XY, windowCm = 500): XY {
  const line: XY[] = [];
  for (const p of [run.a, ...run.points, run.b]) {
    const q = line[line.length - 1];
    if (q === undefined || q.x !== p.x || q.y !== p.y) line.push(p);
  }
  if (line.length < 2) return { x: run.dir.x, y: run.dir.y };
  const cum: number[] = [0];
  let bestD = Infinity;
  let bestS = 0;
  for (let i = 0; i + 1 < line.length; i += 1) {
    const p = line[i];
    const q = line[i + 1];
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const tr = ratio((at.x - p.x) * dx + (at.y - p.y) * dy, dx * dx + dy * dy, 'area');
    const t = tr.ok ? (tr.value < 0 ? 0 : tr.value > 1 ? 1 : tr.value) : 0;
    const fx = p.x + dx * t - at.x;
    const fy = p.y + dy * t - at.y;
    const d = fx * fx + fy * fy;
    if (d < bestD) {
      bestD = d;
      bestS = cum[i] + len * t;
    }
    cum.push(cum[i] + len);
  }
  const total = cum[cum.length - 1];
  const pointAt = (s: number): XY => {
    const c = s < 0 ? 0 : s > total ? total : s;
    let i = 0;
    while (i + 2 < cum.length && cum[i + 1] < c) i += 1;
    const seg = cum[i + 1] - cum[i];
    const tr = ratio(c - cum[i], seg, 'length');
    const t = tr.ok ? tr.value : 0;
    return { x: line[i].x + (line[i + 1].x - line[i].x) * t, y: line[i].y + (line[i + 1].y - line[i].y) * t };
  };
  const p0 = pointAt(bestS - windowCm);
  const p1 = pointAt(bestS + windowCm);
  return unitOf({ x: p1.x - p0.x, y: p1.y - p0.y }) ?? { x: run.dir.x, y: run.dir.y };
}
