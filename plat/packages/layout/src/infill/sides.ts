// The bent-cut planner's sides and boundary geometry (M0-b-02; §4.6 *Sides* (GEO-22), §3.4 `sideRuns`). The planner
// reads a face's kerb rings — the outer ring, then its holes, as `kerb` returns them (§3.7) — through these helpers:
// the rings in a canonical order (so nothing depends on a ring's first vertex or the order of its holes: the
// planner's inputs are rings and streams, never slots, §13.2's renumbering identity), the face's runs from the
// kernel's `sideRuns(face, turnTolCdeg, { arcMaxCm })` (the fillet arc of a crossing street replaced by its virtual
// corner when the caller gives its kerb's corner scale, C-0159 (4); M0-a-10's check note N-1), a side's direction at a
// point — its chord, or on a curved run the tangent over a ± 5 m window (§4.6 *Sides*) — and the line, ray and segment
// tests the recipe's steps 3–7 run on the rings. Values are doubles in centimetres; every division goes through the
// kernel's `ratio()` (§3.2 (8)); no trigonometric call is made here. Readings: C-0216.
import { orient, ratio, runTangent, sideRuns, type LatticePoint, type Run } from '@plat/kernel';

/** A point or a direction in doubles (cm), never an arena coordinate. */
export interface XY {
  readonly x: number;
  readonly y: number;
}

/** A face's sides: its canonical rings and their runs. */
export interface FaceSides {
  /** The outer ring counter-clockwise, then the holes clockwise, each from its lowest-leftmost vertex. */
  readonly rings: readonly (readonly LatticePoint[])[];
  /** `sideRuns(rings, turnTolCdeg, { arcMaxCm })`: per ring in order, each ring's runs in boundary order. */
  readonly runs: readonly Run[];
  /** The tangent window of a curved run (cm; §4.6 *Sides*: ± 5 m). */
  readonly windowCm: number;
}

/** A crossing of a line or a ray with a ring edge. */
export interface Crossing {
  /** The parameter along the line (cm from its origin, the direction a unit vector). */
  readonly t: number;
  /** The ring (0 the outer ring) and the edge index (edge i joins vertex i and i + 1). */
  readonly ring: number;
  readonly edge: number;
  readonly point: XY;
}

function same(a: LatticePoint, b: LatticePoint): boolean {
  return a.x === b.x && a.y === b.y;
}

/** Below in (y, x) order: the lowest, then the leftmost. */
function lowerYX(a: LatticePoint, b: LatticePoint): boolean {
  return a.y < b.y || (a.y === b.y && a.x < b.x);
}

/**
 * The ring without consecutive repeats (the closing repeat included), turned to the wanted orientation (+1
 * counter-clockwise, −1 clockwise) and started at its lowest-leftmost vertex; null when fewer than 3 distinct points
 * remain or the ring has no area.
 */
function canonicalRing(ring: readonly LatticePoint[], want: 1 | -1): LatticePoint[] | null {
  const pts: LatticePoint[] = [];
  for (const p of ring) {
    const q = pts[pts.length - 1];
    if (q === undefined || !same(p, q)) pts.push(p);
  }
  while (pts.length > 1 && same(pts[0], pts[pts.length - 1])) pts.pop();
  if (pts.length < 3) return null;
  const o = orient(pts);
  if (o === 0) return null;
  if (o !== want) pts.reverse();
  let s = 0;
  for (let i = 1; i < pts.length; i += 1) if (lowerYX(pts[i], pts[s])) s = i;
  return pts.slice(s).concat(pts.slice(0, s));
}

/**
 * The face's rings in canonical form (C-0216 (1)): the outer ring counter-clockwise, the holes clockwise (the face on
 * the left of every edge), each started at its lowest-leftmost vertex, the holes sorted by that vertex; a ring of
 * fewer than 3 distinct points or of no area dropped (a dropped outer ring leaves no face: []).
 */
export function canonicalRings(rings: readonly (readonly LatticePoint[])[]): LatticePoint[][] {
  if (rings.length === 0) return [];
  const outer = canonicalRing(rings[0], 1);
  if (outer === null) return [];
  const holes: LatticePoint[][] = [];
  for (let i = 1; i < rings.length; i += 1) {
    const h = canonicalRing(rings[i], -1);
    if (h !== null) holes.push(h);
  }
  holes.sort((a, b) => (lowerYX(a[0], b[0]) ? -1 : lowerYX(b[0], a[0]) ? 1 : 0));
  return [outer, ...holes];
}

/**
 * The face's sides (§4.6 *Sides*): the canonical rings and `sideRuns` over them at the turning tolerance, with the
 * caller's corner scale as `arcMaxCm` (0 collapses no arc).
 */
export function faceSides(rings: readonly (readonly LatticePoint[])[], turnTolCdeg: number, arcMaxCm: number, windowCm: number): FaceSides {
  const canon = canonicalRings(rings);
  return { rings: canon, runs: sideRuns(canon, turnTolCdeg, { arcMaxCm }), windowCm };
}

/** a · b. */
export function dot(a: XY, b: XY): number {
  return a.x * b.x + a.y * b.y;
}

/** The z of a × b. */
export function cross(a: XY, b: XY): number {
  return a.x * b.y - a.y * b.x;
}

/** b − a. */
export function sub(b: XY, a: XY): XY {
  return { x: b.x - a.x, y: b.y - a.y };
}

/** a + d · s. */
export function along(a: XY, d: XY, s: number): XY {
  return { x: a.x + d.x * s, y: a.y + d.y * s };
}

/** |v|. */
export function len(v: XY): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

/** The unit vector along v, or null for a vector shorter than 1 cm (ratio()'s length floor, §3.2 (8)). */
export function unit(v: XY): XY | null {
  const l = len(v);
  const x = ratio(v.x, l, 'length');
  const y = ratio(v.y, l, 'length');
  if (!x.ok || !y.ok) return null;
  return { x: x.value, y: y.value };
}

/** v turned 90° counter-clockwise: a boundary direction's inward normal (the face lies on the left). */
export function leftOf(v: XY): XY {
  return { x: -v.y, y: v.x };
}

/** Is the run curved — do its edge directions spread at all (C-0216 (2))? A straight run is read by its chord. */
export function isCurved(run: Run): boolean {
  return run.spreadCdeg > 0;
}

/**
 * The run's direction at a point of it (§4.6 *Sides*): its chord's, or on a curved run the tangent over the ± window
 * at the point (`runTangent`), in boundary order (the face on the left).
 */
export function sideDir(sides: FaceSides, run: Run, at: XY): XY {
  return isCurved(run) ? runTangent(run, at, sides.windowCm) : run.dir;
}

/** The nearest point of segment a–b to q, with its parameter and squared distance. */
export function nearestOnSegment(q: XY, a: XY, b: XY): { p: XY; t: number; d2: number } {
  const d = sub(b, a);
  const r = ratio(dot(sub(q, a), d), dot(d, d), 'area');
  const t = r.ok ? (r.value < 0 ? 0 : r.value > 1 ? 1 : r.value) : 0;
  const p = along(a, d, t);
  const e = sub(q, p);
  return { p, t, d2: dot(e, e) };
}

/**
 * The run of ring `ring` nearest to a boundary point (C-0216 (3)): least distance to its vertices' polyline, ties to
 * the earlier run in boundary order — a point on an arc piece the virtual corner replaced goes to the nearer of the
 * two runs beside it. −1 when the ring has no run.
 */
export function runAt(sides: FaceSides, ring: number, at: XY): number {
  let best = -1;
  let bestD = Infinity;
  sides.runs.forEach((run, i) => {
    if (run.ring !== ring) return;
    const pts = run.points;
    for (let k = 0; k + 1 < pts.length; k += 1) {
      const d = nearestOnSegment(at, pts[k], pts[k + 1]).d2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
  });
  return best;
}

/**
 * Every crossing of the line origin + t · dir (dir a unit vector) with the rings' edges, by the half-open rule (an
 * edge crosses when its ends lie strictly on opposite sides, a vertex on the line counted with the side below it), so
 * a line through a vertex is counted once and each ring gives an even count. Sorted by t, then ring, then edge.
 */
export function lineCrossings(rings: readonly (readonly LatticePoint[])[], origin: XY, dir: XY): Crossing[] {
  const n = leftOf(dir);
  const out: Crossing[] = [];
  rings.forEach((ring, r) => {
    const m = ring.length;
    for (let i = 0; i < m; i += 1) {
      const p = ring[i];
      const q = ring[i + 1 === m ? 0 : i + 1];
      const sp = dot(sub(p, origin), n);
      const sq = dot(sub(q, origin), n);
      if (sp > 0 === sq > 0) continue;
      const w = ratio(sp, sp - sq, 'length');
      // An edge within 1 cm of the line along its whole length: its midpoint (ratio()'s floor, §3.2 (8)).
      const k = w.ok ? w.value : 0.5;
      const point = { x: p.x + (q.x - p.x) * k, y: p.y + (q.y - p.y) * k };
      out.push({ t: dot(sub(point, origin), dir), ring: r, edge: i, point });
    }
  });
  out.sort((a, b) => a.t - b.t || a.ring - b.ring || a.edge - b.edge);
  return out;
}

/** 2²⁵ cm: longer than any distance on the lattice (|x|, |y| < 2²³, §3.2 (1)). */
const RAY_CM = 33_554_432;

/** The first proper crossing of segment p–q with ring edge a–b: its parameters along p–q and along a–b, or null. */
function segHit(p: XY, q: XY, a: XY, b: XY): { s: number; u: number } | null {
  const d = sub(q, p);
  const e = sub(b, a);
  const den = cross(d, e);
  const w = sub(a, p);
  const s = ratio(cross(w, e), den, 'area');
  const u = ratio(cross(w, d), den, 'area');
  if (!s.ok || !u.ok) return null; // parallel, or nearly so
  if (!(u.value >= 0 && u.value <= 1)) return null;
  return { s: s.value, u: u.value };
}

/**
 * The first boundary hit of the ray origin + t · dir beyond `minT` (cm), or null when the ray leaves no ring. Every
 * ring edge is tested; ties in t go to the lower ring, then edge.
 */
export function rayHit(rings: readonly (readonly LatticePoint[])[], origin: XY, dir: XY, minT: number, maxT = Infinity): Crossing | null {
  let best: Crossing | null = null;
  // The ray as a segment longer than any lattice distance, so a near-parallel edge still gives a determinant far above
  // ratio()'s floor.
  const far = along(origin, dir, RAY_CM);
  rings.forEach((ring, r) => {
    const m = ring.length;
    for (let i = 0; i < m; i += 1) {
      const h = segHit(origin, far, ring[i], ring[i + 1 === m ? 0 : i + 1]);
      if (h === null) continue;
      const t = h.s * RAY_CM;
      if (!(t > minT) || !(t <= maxT)) continue;
      if (best === null || t < best.t) best = { t, ring: r, edge: i, point: along(origin, dir, t) };
    }
  });
  return best;
}

/** Is p inside the face (even–odd over every ring; a point on the boundary may read either way)? */
export function insideFace(rings: readonly (readonly LatticePoint[])[], p: XY): boolean {
  let inside = false;
  for (const ring of rings) {
    const m = ring.length;
    for (let i = 0, j = m - 1; i < m; j = i, i += 1) {
      const a = ring[i];
      const b = ring[j];
      if (a.y > p.y !== b.y > p.y) {
        const k = ratio(p.y - a.y, b.y - a.y, 'length');
        const x = a.x + (b.x - a.x) * (k.ok ? k.value : 0);
        if (p.x < x) inside = !inside;
      }
    }
  }
  return inside;
}

/**
 * Does segment p–q pass the boundary cleanly — no proper crossing with any ring edge farther than `tolCm` from both of
 * its ends? (A segment that starts or ends on the boundary touches it there; that touch is not a crossing.)
 */
export function segmentClear(rings: readonly (readonly LatticePoint[])[], p: XY, q: XY, tolCm: number): boolean {
  const l = len(sub(q, p));
  if (!(l > 2 * tolCm)) return true;
  for (const ring of rings) {
    const m = ring.length;
    for (let i = 0; i < m; i += 1) {
      const h = segHit(p, q, ring[i], ring[i + 1 === m ? 0 : i + 1]);
      if (h === null) continue;
      const at = h.s * l;
      if (at > tolCm && at < l - tolCm) return false;
    }
  }
  return true;
}

/** A polyline's point at arc length s (clamped to its ends) and the direction of the segment there. */
export function pointAtLength(line: readonly XY[], s: number): { p: XY; dir: XY; seg: number } | null {
  let acc = 0;
  for (let i = 0; i + 1 < line.length; i += 1) {
    const d = sub(line[i + 1], line[i]);
    const l = len(d);
    const u = unit(d);
    if (u === null) continue;
    if (s <= acc + l || i + 2 === line.length) {
      const k = s - acc < 0 ? 0 : s - acc > l ? l : s - acc;
      return { p: along(line[i], u, k), dir: u, seg: i };
    }
    acc += l;
  }
  return null;
}

/** A polyline's length. */
export function lineLength(line: readonly XY[]): number {
  let acc = 0;
  for (let i = 0; i + 1 < line.length; i += 1) acc += len(sub(line[i + 1], line[i]));
  return acc;
}

/** The arc length along a polyline of the point of it nearest to q (ties to the earlier segment). */
export function lengthAt(line: readonly XY[], q: XY): number {
  let acc = 0;
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i + 1 < line.length; i += 1) {
    const n = nearestOnSegment(q, line[i], line[i + 1]);
    const l = len(sub(line[i + 1], line[i]));
    if (n.d2 < bestD) {
      bestD = n.d2;
      best = acc + n.t * l;
    }
    acc += l;
  }
  return best;
}
