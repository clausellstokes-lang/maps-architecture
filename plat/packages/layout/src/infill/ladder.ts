// Step 8 of §4.6's recipe — the ladder's geometry (GEO-23; M0-b-03): the candidate cuts of the reflex pre-cut and the
// antenna split, of rungs (a)–(c), the ends of a straight candidate (step 7, as the planner extends its own), and the
// judgement every candidate passes before it reaches the kernel — so a rung that cannot give two lawful children costs
// no kernel call (F-CUT's bar: the ladder ends in ≤ 6 kernel calls). The transaction, the counters and the rung order
// are bentCutFabric.ts's; the plan of rung (a) is the planner's (M0-b-02, read only).
//
//   pre      the reflex pre-cut: a kerb vertex deeper than the band's plot depth d̄ (its distance to the hull lid that
//            spans it) splits the face along its longer run's inward normal (§4.6 step 8, FTG's "internal corners");
//   antenna  a dead end inside the face (its L1 ring visits the tip as a spike) is split off: the cut leaves the tip
//            along the antenna's last direction to the far side, so no child wraps it (C-0237 (4)); a tip inside a
//            portal's gap on the antenna's way is refused (it cannot slide; N-57 (1)(a), C-0329);
//   (a)      planCut at attempts 0, 1, 2 — frames turned k × 36° drawing afresh on the attempt component (the planner);
//   (b)      the straight cut from A along the mean normal: the start run's inward normal and the far run's outward
//            normal averaged, both as the unturned frame found them (the inward normal alone without a far run);
//   (c)      the always-succeeding cut: perpendicular to the longest run through its midpoint, clipped to the face's own
//            component (the first boundary hit along the normal); refused by the contact rule (a boundary vertex
//            within attractCm of its interior: a shallow reflex vertex or an antenna) its foot slides along the run in
//            steps of 2 · attractCm, alternating sides, the lower (y, x) end first — drawing nothing (W_CUT_SLID);
//   (d)      substitution (bentCutFabric.ts): a face ≤ 2 · e_hi² becomes a court block (C-0036).
//
// A candidate's kerb points are extended to the crossed spines as the planner's step 7 does (C-0222 (9): the first
// spine within 2 × its half-width + attractCm, the portal gap's slide, the next rung when neither side keeps the arrival
// within 85–95°). The judgement reads the face's L1 rings: the chain must land on the outer ring at both ends (a hole
// end is the slit of connectHole), cross no boundary, pass no boundary vertex within attractCm of its interior, and give
// two children whose outer rings' OBB minor extent and every new corner meet the class floor (`BlockFloor`).
import { dmath, LATTICE, obb, orient2d, ratio, snap, type LatticePoint } from '@plat/kernel';
import type { CutCells, EndPlan, KerbFace, StartPlan, FarPlan, XY } from './planner.js';
import {
  along,
  cross,
  dot,
  insideFace,
  leftOf,
  len,
  lengthAt,
  lineLength,
  nearestOnSegment,
  pointAtLength,
  rayHit,
  segmentClear,
  sideDir,
  sub,
  unit,
  type FaceSides,
} from './sides.js';

/** The tolerance of a touch at a segment's end (cm): half a lattice unit, as the planner's. */
export const TOUCH_CM = 0.5;

/** 2²⁰: small denominators are scaled by it before ratio() (exact). */
const SCALE = 1_048_576;

/** π to the double nearest it (Math.PI is outside §6.5 (3)'s allowlist), and radians per centidegree. */
const PI = 3.141592653589793;
const RAD_PER_CDEG = PI / 18000;

/** n ÷ d through ratio() (the division rule, §3.2 (8)), both scaled by 2²⁰; null below the floor. */
export function div(n: number, d: number): number | null {
  const r = ratio(n * SCALE, d * SCALE, 'length');
  return r.ok ? r.value : null;
}

/** The class floor a child face meets (§3.3's `expect`; §4.7's class-floor row; C-0237 (2)). */
export interface BlockFloor {
  /** The minimum block width (cm): the band's shallowest plot depth, d_lo. */
  readonly minWidthCm: number;
  /** The minimum corner (cdeg): the plot's minInteriorAnglePlot. */
  readonly minAngleCdeg: number;
}

/** A candidate cut: the chain to insert (junction to junction) and its kerb points (for the width law's L). */
export interface Candidate {
  /** The rung that made it. */
  readonly rung: 'pre' | 'antenna' | 'a' | 'b' | 'c' | 'deep';
  /** The chain to insert, on the lattice, from the start junction to the far one. */
  readonly chain: readonly LatticePoint[];
  /** The cut on the kerb (kerb point to kerb point): its length is the width law's L. */
  readonly kerbPoints: readonly XY[];
  /** The two ends (step 7). */
  readonly ends: readonly [EndPlan, EndPlan];
  /** Rung (c): how many slide steps the foot moved (0: the midpoint). */
  readonly slide: number;
}

// ---- step 7 for a straight candidate -------------------------------------------------------------------------------

/** The squared-cosine bound of the portal arrival band (as the planner's, C-0222 (9)). */
function arrivalDot2(cells: CutCells): number {
  const [lo, hi] = cells.portalArrivalCdeg;
  const a = cosCdeg(lo);
  const b = cosCdeg(hi);
  return Math.max(a * a, b * b);
}

/** cos of an angle in centidegrees, by dmath (§6.5 (3)). */
function cosCdeg(c: number): number {
  return dmath.cos(c * RAD_PER_CDEG);
}

/** The first spine the ray from an end crosses within reach (C-0222 (9)): 2 × its half-width + attractCm. */
function spineHit(face: KerbFace, from: XY, dir: XY): { spine: number; t: number; point: XY } | null {
  let best: { spine: number; t: number; point: XY } | null = null;
  (face.spines ?? []).forEach((sp, si) => {
    const reach = 2 * sp.halfWidthCm + LATTICE.attractCm;
    const pts = sp.points;
    for (let i = 0; i + 1 < pts.length; i += 1) {
      const e = sub(pts[i + 1], pts[i]);
      const den = cross(dir, e);
      const w = sub(pts[i], from);
      const t = div(cross(w, e), den);
      const u = div(cross(w, dir), den);
      if (t === null || u === null || !(u >= 0 && u <= 1) || !(t >= 0 && t <= reach)) continue;
      if (best === null || t < best.t) best = { spine: si, t, point: along(from, dir, t) };
    }
  });
  return best;
}

/** One end extended along its arrival to its spine, or kept on the kerb or the hole (step 7, before a slide). */
function endOf(face: KerbFace, kerbPoint: XY, ring: number, from: XY): EndPlan {
  const arrival = unit(sub(kerbPoint, from)) ?? { x: 0, y: 0 };
  if (ring > 0) return { kind: 'hole', kerbPoint, point: kerbPoint, arrival, index: ring, slidCm: 0 };
  const h = spineHit(face, kerbPoint, arrival);
  if (h === null) return { kind: 'kerb', kerbPoint, point: kerbPoint, arrival, index: -1, slidCm: 0 };
  return { kind: 'spine', kerbPoint, point: h.point, arrival, index: h.spine, slidCm: 0 };
}

/** Does the leg from `from` arrive at `at` on a spine of direction `d` within the band? */
function arrivesSquare(d: XY, from: XY, at: XY, bound: number): boolean {
  const u = unit(sub(at, from));
  if (u === null) return false;
  const c = dot(u, d);
  return c * c <= bound;
}

/**
 * The portal gap's slide of one end (§4.6 step 7, C-0222 (9)'s reading): an end inside max(6 m, 2 × the wider lane's
 * width) of a portal on a district-bounding spine moves to the gap's edge — the nearer side first, ties the lower arc
 * length — keeping its arrival within the band; null when neither side does (the next rung); unchanged outside a gap.
 */
function slideEnd(face: KerbFace, rings: readonly (readonly LatticePoint[])[], end: EndPlan, from: XY, cells: CutCells, newLaneCm: number): EndPlan | null {
  if (end.kind !== 'spine') return end;
  const sp = (face.spines ?? [])[end.index];
  if (sp === undefined || sp.bounding !== true || (sp.portals ?? []).length === 0) return end;
  const line = sp.points;
  const total = lineLength(line);
  const sE = lengthAt(line, end.point);
  const gaps = (sp.portals ?? []).map((p) => ({ s: lengthAt(line, p.at), gap: Math.max(cells.portalGapMinCm, cells.portalGapLaneFactor * Math.max(p.laneWidthCm, newLaneCm)) }));
  const inGap = (s: number): boolean => gaps.some((g) => Math.abs(s - g.s) < g.gap);
  if (!inGap(sE)) return end;
  const bound = arrivalDot2(cells);
  const options: { s: number; slid: number }[] = [];
  for (const g of gaps) {
    if (!(Math.abs(sE - g.s) < g.gap)) continue;
    for (const s of [g.s - g.gap, g.s + g.gap]) if (s >= 0 && s <= total && !inGap(s)) options.push({ s, slid: Math.abs(s - sE) });
  }
  options.sort((a, b) => a.slid - b.slid || a.s - b.s);
  for (const o of options) {
    const at = pointAtLength(line, o.s);
    if (at === null || !arrivesSquare(at.dir, from, at.p, bound)) continue;
    const u = unit(sub(at.p, from));
    if (u === null) continue;
    const hit = rayHit(rings, from, u, TOUCH_CM, len(sub(at.p, from)));
    if (hit === null || hit.ring !== 0 || !segmentClear(rings, from, hit.point, TOUCH_CM)) continue;
    return { kind: 'spine', kerbPoint: hit.point, point: at.p, arrival: u, index: end.index, slidCm: o.slid };
  }
  return null;
}

/** The chain on the lattice, consecutive repeats dropped; null when a point leaves the lattice's range. */
export function snapChain(points: readonly XY[]): LatticePoint[] | null {
  const out: LatticePoint[] = [];
  for (const p of points) {
    const s = snap(p.x, p.y);
    if (!s.ok) return null;
    const q = out[out.length - 1];
    if (q === undefined || q.x !== s.value.x || q.y !== s.value.y) out.push(s.value);
  }
  return out.length >= 2 ? out : null;
}

/**
 * A straight candidate from two kerb points (each on ring `rings[i]`): both ends extended to their spines and slid out
 * of a portal's gap (step 7); null when an end is caught in a gap (the next rung) or the chain leaves the lattice.
 */
export function straightCandidate(
  face: KerbFace,
  kerbRings: readonly (readonly LatticePoint[])[],
  a: XY,
  b: XY,
  ringOf: readonly [number, number],
  cells: CutCells,
  newLaneCm: number,
  rung: Candidate['rung'],
  slide = 0,
): Candidate | null {
  let s = endOf(face, a, ringOf[0], b);
  let f = endOf(face, b, ringOf[1], a);
  const s2 = slideEnd(face, kerbRings, s, b, cells, newLaneCm);
  if (s2 === null) return null;
  s = s2;
  const f2 = slideEnd(face, kerbRings, f, s.kerbPoint, cells, newLaneCm);
  if (f2 === null) return null;
  f = f2;
  const chain = snapChain([s.point, s.kerbPoint, f.kerbPoint, f.point]);
  if (chain === null) return null;
  return { rung, chain, kerbPoints: [s.kerbPoint, f.kerbPoint], ends: [s, f], slide };
}

// ---- rung (b): the mean normal -------------------------------------------------------------------------------------

/**
 * Rung (b): the straight cut from A along the mean normal — the start run's inward normal and the far run's outward
 * normal averaged, both as the unturned frame found them; the inward normal alone without a far run. Null when the ray
 * leaves the face nowhere, or an end is caught in a portal gap.
 */
export function meanNormalCut(face: KerbFace, sides: FaceSides, start: StartPlan, far: FarPlan | null, cells: CutCells, newLaneCm: number): Candidate | null {
  const n = far === null ? start.normal : (unit({ x: start.normal.x + far.outward.x, y: start.normal.y + far.outward.y }) ?? start.normal);
  if (!(dot(n, start.normal) > 0)) return null;
  const hit = rayHit(sides.rings, start.A, n, TOUCH_CM);
  if (hit === null || !segmentClear(sides.rings, start.A, hit.point, TOUCH_CM) || !insideFace(sides.rings, along(start.A, n, hit.t / 2))) return null;
  return straightCandidate(face, sides.rings, start.A, hit.point, [start.ring, hit.ring], cells, newLaneCm, 'b');
}

// ---- rung (c): the perpendicular cut through the longest run's midpoint, sliding --------------------------------------

/** The longest run of the outer ring (ties: the earlier in boundary order), or −1. */
export function longestRun(sides: FaceSides): number {
  let best = -1;
  let bestL = -1;
  sides.runs.forEach((r, i) => {
    if (r.ring !== 0) return;
    const l = lineLength(r.points);
    if (l > bestL) {
      bestL = l;
      best = i;
    }
  });
  return best;
}

/**
 * The contact rule a straight segment of a cut must pass (§3.6 (2)'s reading for rung (c)): no boundary vertex within
 * attractCm of the segment's interior — a vertex within attractCm of either end is the landing's own and passes.
 */
export function contactClear(rings: readonly (readonly LatticePoint[])[], p: XY, q: XY): boolean {
  const a = LATTICE.attractCm;
  for (const ring of rings) {
    for (const v of ring) {
      if (len(sub(v, p)) <= a || len(sub(v, q)) <= a) continue;
      if (nearestOnSegment(v, p, q).d2 <= a * a) return false;
    }
  }
  return true;
}

/** One rung-(c) foot: its slide index, its point on the run and the kerb segment it gives (null where none). */
export interface SlideFoot {
  readonly k: number;
  readonly foot: XY;
  readonly hit: XY | null;
  readonly hitRing: number;
  /** Did the segment pass the contact rule? */
  readonly clear: boolean;
}

/**
 * Rung (c)'s feet in order (§4.6 step 8 (c)): k = 0 the longest run's midpoint, then ± k · 2 · attractCm alternating
 * sides, the side toward the run's lower (y, x) end first; each foot's perpendicular clipped at the first boundary hit
 * along the run's inward normal there. Stops at the run's ends or after `maxFeet` feet. Draws nothing.
 */
export function slideFeet(sides: FaceSides, maxFeet: number): SlideFoot[] {
  const r = longestRun(sides);
  if (r < 0) return [];
  const run = sides.runs[r];
  const pts = run.points;
  const total = lineLength(pts);
  const mid = total / 2;
  const step = 2 * LATTICE.attractCm;
  // The lower (y, x) end of the run: its first point or its last.
  const first = pts[0];
  const last = pts[pts.length - 1];
  const lowerFirst = first.y < last.y || (first.y === last.y && first.x <= last.x);
  const out: SlideFoot[] = [];
  for (let k = 0; out.length < maxFeet; k += 1) {
    const m = Math.ceil(k / 2);
    const towardLower = k % 2 === 1;
    const sign = towardLower === lowerFirst ? -1 : 1;
    const s = mid + sign * m * step;
    if (!(s > TOUCH_CM && s < total - TOUCH_CM)) {
      if (m * step >= mid) break;
      continue;
    }
    const at = pointAtLength(pts, s);
    if (at === null) break;
    const d = sideDir(sides, run, at.p);
    const n = leftOf(d);
    const hit = rayHit(sides.rings, at.p, n, TOUCH_CM);
    const ok = hit !== null && insideFace(sides.rings, along(at.p, n, hit.t / 2)) && segmentClear(sides.rings, at.p, hit.point, TOUCH_CM);
    const clear = ok && hit !== null && contactClear(sides.rings, at.p, hit.point);
    out.push({ k, foot: at.p, hit: ok && hit !== null ? hit.point : null, hitRing: hit?.ring ?? -1, clear });
  }
  return out;
}

/** The ring a run of the sides lies on. */
export function runRing(sides: FaceSides, r: number): number {
  return sides.runs[r].ring;
}

// ---- the reflex pre-cut ----------------------------------------------------------------------------------------------

/** The convex hull of a ring's points (Andrew's monotone chain), counter-clockwise; exact orientation on the lattice. */
function hullOf(ring: readonly LatticePoint[]): LatticePoint[] {
  const pts = ring.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  const lower: LatticePoint[] = [];
  for (const p of pts) {
    while (lower.length >= 2 && orient2d(lower[lower.length - 2].x, lower[lower.length - 2].y, lower[lower.length - 1].x, lower[lower.length - 1].y, p.x, p.y) <= 0) lower.pop();
    lower.push(p);
  }
  const upper: LatticePoint[] = [];
  for (let i = pts.length - 1; i >= 0; i -= 1) {
    const p = pts[i];
    while (upper.length >= 2 && orient2d(upper[upper.length - 2].x, upper[upper.length - 2].y, upper[upper.length - 1].x, upper[upper.length - 1].y, p.x, p.y) <= 0) upper.pop();
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

/** A reflex vertex of the outer ring with its depth: its distance to the hull lid spanning it. */
export interface ReflexVertex {
  readonly index: number;
  readonly at: LatticePoint;
  readonly depthCm: number;
}

/**
 * The reflex vertices of a counter-clockwise outer ring (a right turn) with their depths — the distance to the hull
 * edge whose arc of the ring holds the vertex (the lid of its notch). Sorted deepest first (ties: the lower (y, x)).
 */
export function reflexVertices(ring: readonly LatticePoint[]): ReflexVertex[] {
  const m = ring.length;
  if (m < 4) return [];
  const hull = hullOf(ring);
  const onHull = new Set(hull.map((p) => `${p.x},${p.y}`));
  const out: ReflexVertex[] = [];
  for (let i = 0; i < m; i += 1) {
    const a = ring[(i + m - 1) % m];
    const v = ring[i];
    const b = ring[(i + 1) % m];
    if (orient2d(a.x, a.y, v.x, v.y, b.x, b.y) >= 0) continue;
    // The notch's lid: the hull vertices met walking back and forward from v along the ring.
    let lo = i;
    while (!onHull.has(`${ring[lo].x},${ring[lo].y}`)) lo = (lo + m - 1) % m;
    let hi = i;
    while (!onHull.has(`${ring[hi].x},${ring[hi].y}`)) hi = (hi + 1) % m;
    const d = Math.sqrt(nearestOnSegment(v, ring[lo], ring[hi]).d2);
    out.push({ index: i, at: v, depthCm: d });
  }
  out.sort((x, y) => y.depthCm - x.depthCm || x.at.y - y.at.y || x.at.x - y.at.x);
  return out;
}

/**
 * The reflex pre-cut's candidate (§4.6 step 8): at the deepest reflex vertex of the kerb's outer ring deeper than
 * `plotDepthCm`, a cut along its longer run's inward normal to the first boundary hit, extended to the spines. Null
 * when no vertex is that deep or its cut is caught (no hit, a crossing, a portal gap).
 */
export function reflexPreCut(face: KerbFace, sides: FaceSides, plotDepthCm: number, cells: CutCells, newLaneCm: number): Candidate | null {
  const outer = sides.rings[0];
  for (const rv of reflexVertices(outer)) {
    if (!(rv.depthCm > plotDepthCm)) return null;
    const m = outer.length;
    const prev = outer[(rv.index + m - 1) % m];
    const next = outer[(rv.index + 1) % m];
    // The longer of the two runs meeting at the vertex: read by its edge here (the runs' chords agree within 10°).
    const inLen = len(sub(rv.at, prev));
    const outLen = len(sub(next, rv.at));
    const d = unit(inLen >= outLen ? sub(rv.at, prev) : sub(next, rv.at));
    if (d === null) continue;
    const n = leftOf(d);
    const hit = rayHit(sides.rings, rv.at, n, TOUCH_CM);
    if (hit === null || !segmentClear(sides.rings, rv.at, hit.point, TOUCH_CM) || !insideFace(sides.rings, along(rv.at, n, hit.t / 2))) continue;
    const c = straightCandidate(face, sides.rings, rv.at, hit.point, [0, hit.ring], cells, newLaneCm, 'pre');
    if (c !== null) return c;
  }
  return null;
}

// ---- the antenna split ----------------------------------------------------------------------------------------------

/**
 * The antennae of a face's L1 outer ring: each tip (a vertex the ring reaches and leaves along one edge, a spike) with
 * the direction it was reached along. In ring order from the canonical start.
 */
export function antennaTips(ring: readonly LatticePoint[]): { tip: LatticePoint; dir: XY }[] {
  const m = ring.length;
  const out: { tip: LatticePoint; dir: XY }[] = [];
  for (let i = 0; i < m; i += 1) {
    const a = ring[(i + m - 1) % m];
    const b = ring[(i + 1) % m];
    if (a.x === b.x && a.y === b.y) {
      const d = unit(sub(ring[i], a));
      if (d !== null) out.push({ tip: ring[i], dir: d });
    }
  }
  return out;
}

/**
 * Does an antenna's tip lie inside the portal gap of a portal on the antenna's own way (§4.6 step 7; N-57 (1)(a))? The
 * tip is its way's dead end — the end of a spine run of the face — so its arc position is that run's start or end; the
 * gap is the planner's, max(6 m, 2 × the wider lane's width). A tip end cannot slide (the antenna's way runs back along
 * the cut itself), so a tip in a gap refuses the tip and the antenna split tries the next one, or none.
 */
export function tipInPortalGap(face: KerbFace, tip: XY, cells: CutCells, newLaneCm: number): boolean {
  for (const sp of face.spines ?? []) {
    if (sp.bounding !== true || (sp.portals ?? []).length === 0 || sp.points.length < 2) continue;
    const line = sp.points;
    const a = line[0];
    const b = line[line.length - 1];
    const sTip = a.x === tip.x && a.y === tip.y ? 0 : b.x === tip.x && b.y === tip.y ? lineLength(line) : null;
    if (sTip === null) continue;
    for (const p of sp.portals ?? []) {
      const gap = Math.max(cells.portalGapMinCm, cells.portalGapLaneFactor * Math.max(p.laneWidthCm, newLaneCm));
      if (Math.abs(lengthAt(line, p.at) - sTip) < gap) return true;
    }
  }
  return false;
}

/**
 * The antenna split's candidate (C-0237 (4)): from the first antenna tip, a straight cut on along the antenna's
 * direction to the far side of the kerb, the tip itself the start junction. Both ends keep the portal gap (N-57
 * (1)(a)): the far end slides out of a gap (step 7), the tip end, which cannot slide, refuses its tip when it lies in a
 * gap of a portal on the antenna's way (`tipInPortalGap`). Null when the face has no antenna or the cut is caught.
 */
export function antennaCut(face: KerbFace, sides: FaceSides, l1Outer: readonly LatticePoint[], cells: CutCells, newLaneCm: number): Candidate | null {
  for (const t of antennaTips(l1Outer)) {
    if (tipInPortalGap(face, t.tip, cells, newLaneCm)) continue;
    // The kerb's first crossing beyond the tip's round end, then the far hit.
    const out = rayHit(sides.rings, t.tip, t.dir, TOUCH_CM);
    if (out === null) continue;
    const far = rayHit(sides.rings, out.point, t.dir, TOUCH_CM);
    if (far === null || !insideFace(sides.rings, along(out.point, t.dir, far.t / 2)) || !segmentClear(sides.rings, out.point, far.point, TOUCH_CM)) continue;
    const f = endOf(face, far.point, far.ring, out.point);
    const f2 = slideEnd(face, sides.rings, f, out.point, cells, newLaneCm);
    if (f2 === null) continue;
    const s: EndPlan = { kind: 'spine', kerbPoint: out.point, point: t.tip, arrival: { x: -t.dir.x, y: -t.dir.y }, index: -1, slidCm: 0 };
    const chain = snapChain([t.tip, out.point, f2.kerbPoint, f2.point]);
    if (chain === null) continue;
    return { rung: 'antenna', chain, kerbPoints: [out.point, f2.kerbPoint], ends: [s, f2], slide: 0 };
  }
  return null;
}

// ---- the judgement --------------------------------------------------------------------------------------------------

/** Where a lattice point lies on a set of rings: its ring, the edge it lies nearest and its distance (cm). */
function locateOnRings(rings: readonly (readonly LatticePoint[])[], p: XY): { ring: number; edge: number; d: number; foot: XY } {
  let best = { ring: -1, edge: -1, d: Infinity, foot: p };
  rings.forEach((ring, r) => {
    const m = ring.length;
    for (let i = 0; i < m; i += 1) {
      const n = nearestOnSegment(p, ring[i], ring[(i + 1) % m]);
      const d = Math.sqrt(n.d2);
      if (d < best.d) best = { ring: r, edge: i, d, foot: n.p };
    }
  });
  return best;
}

/**
 * Is the corner a–b–c (the face on its left, a counter-clockwise walk) sharper than the floor? Its interior angle θ is
 * measured counter-clockwise from c − b to a − b; θ < floor exactly when a − b lies counter-clockwise of c − b (cross ≥ 0)
 * and their cosine exceeds the floor's — a dot and a cross, no inverse trigonometric call.
 */
function cornerBelow(a: XY, b: XY, c: XY, floorCos: number): boolean {
  const u = unit(sub(a, b));
  const v = unit(sub(c, b));
  if (u === null || v === null) return true;
  return cross(v, u) >= 0 && dot(u, v) > floorCos;
}

/** The judgement's verdict on a candidate. */
export type Judgement =
  | { readonly ok: true; readonly kind: 'split'; readonly widths: readonly [number, number] }
  | { readonly ok: true; readonly kind: 'slit' }
  | { readonly ok: false; readonly why: 'landing' | 'crossing' | 'contact' | 'width' | 'angle' | 'holes' };

/**
 * Judges a chain against a face's L1 rings before any kernel call: both ends land on the rings (within attractCm), the
 * chain crosses no boundary and passes no boundary vertex within attractCm of its interior (§3.6 (1)–(3)), and — for a
 * split (both ends on the outer ring) — both children meet the floor: their outer rings' OBB minor extent ≥
 * minWidthCm and every corner the cut makes ≥ minAngleCdeg. An end on a hole (the other on the outer ring) is a slit
 * (connectHole, §4.6 *Holes*), judged on its landing and contact only; two ends on holes are refused.
 */
export function judge(rings: readonly (readonly LatticePoint[])[], chain: readonly LatticePoint[], floor: BlockFloor, extraWidthCm = 0): Judgement {
  const n = chain.length;
  const a = locateOnRings(rings, chain[0]);
  const b = locateOnRings(rings, chain[n - 1]);
  const att = LATTICE.attractCm;
  if (!(a.d <= att) || !(b.d <= att)) return { ok: false, why: 'landing' };
  for (let i = 1; i + 1 < n; i += 1) {
    if (!insideFace(rings, chain[i])) return { ok: false, why: 'crossing' };
    if (locateOnRings(rings, chain[i]).d <= att) return { ok: false, why: 'contact' };
  }
  for (let i = 0; i + 1 < n; i += 1) {
    const p = chain[i];
    const q = chain[i + 1];
    if (!segmentClear(rings, p, q, att)) return { ok: false, why: 'crossing' };
    const mid = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
    if (!insideFace(rings, mid)) return { ok: false, why: 'crossing' };
    // No boundary vertex within attractCm of the segment, but those within attractCm of the chain's own landings.
    for (const ring of rings) {
      for (const v of ring) {
        if (len(sub(v, chain[0])) <= att || len(sub(v, chain[n - 1])) <= att) continue;
        if (nearestOnSegment(v, p, q).d2 <= att * att) return { ok: false, why: 'contact' };
      }
    }
  }
  if (a.ring !== 0 && b.ring !== 0) return { ok: false, why: 'holes' };
  if (a.ring !== 0 || b.ring !== 0) return { ok: true, kind: 'slit' };
  // The two children of the outer ring, the chain inserted between its two landings.
  const outer = rings[0];
  const m = outer.length;
  const arc = (from: { edge: number; foot: XY }, to: { edge: number; foot: XY }): XY[] => {
    // The ring from `from`'s foot forward to `to`'s foot (exclusive of both), counter-clockwise.
    const out: XY[] = [];
    let i = (from.edge + 1) % m;
    let guard = 0;
    if (from.edge === to.edge) {
      const e0 = outer[from.edge];
      const sameEdgeForward = len(sub(to.foot, e0)) > len(sub(from.foot, e0));
      if (sameEdgeForward) return out;
    }
    while (guard <= m) {
      out.push(outer[i]);
      if (i === to.edge) break;
      i = (i + 1) % m;
      guard += 1;
    }
    return out;
  };
  const left: XY[] = [...chain, ...arc(b, a)];
  const right: XY[] = [...chain.slice().reverse(), ...arc(a, b)];
  const widths: number[] = [];
  for (const child of [left, right]) {
    const pts: LatticePoint[] = [];
    for (const p of child) {
      const s = snap(p.x, p.y);
      if (!s.ok) return { ok: false, why: 'landing' };
      const q = pts[pts.length - 1];
      if (q === undefined || q.x !== s.value.x || q.y !== s.value.y) pts.push(s.value);
    }
    const box = obb(pts);
    if (!box.ok) return { ok: false, why: 'width' };
    if (!(box.value.minorCm >= floor.minWidthCm + extraWidthCm)) return { ok: false, why: 'width' };
    widths.push(box.value.minorCm);
  }
  // The corners the cut makes: at each landing (the chain against the ring edge, both sides) and at each interior
  // chain vertex (both sides).
  const floorCos = cosCdeg(floor.minAngleCdeg);
  const edgeDir = (e: { edge: number }): XY => unit(sub(outer[(e.edge + 1) % m], outer[e.edge])) ?? { x: 1, y: 0 };
  const corners: [XY, XY, XY][] = [];
  const da = edgeDir(a);
  const db = edgeDir(b);
  corners.push([along(chain[0], da, -100), chain[0], chain[1]], [chain[1], chain[0], along(chain[0], da, 100)]);
  corners.push([chain[n - 2], chain[n - 1], along(chain[n - 1], db, 100)], [along(chain[n - 1], db, -100), chain[n - 1], chain[n - 2]]);
  for (let i = 1; i + 1 < n; i += 1) corners.push([chain[i - 1], chain[i], chain[i + 1]], [chain[i + 1], chain[i], chain[i - 1]]);
  for (const [p, q, r] of corners) if (cornerBelow(p, q, r, floorCos)) return { ok: false, why: 'angle' };
  return { ok: true, kind: 'split', widths: [widths[0], widths[1]] };
}

/**
 * Does every `kerb` end of a chain — an end on a boundary with no spine: a wall strip's setback line, a reservation's
 * edge, a shore (§4.6 step 7) — arrive square to the line it stays on, within the arrival band (cut.settings'
 * portalArrivalCdeg, 85–95°, the design's one "square"; C-0237 (10))? Read against the L1 ring edge the end lies on.
 */
export function kerbEndsSquare(rings: readonly (readonly LatticePoint[])[], chain: readonly LatticePoint[], ends: readonly [EndPlan, EndPlan], cells: CutCells): boolean {
  const bound = arrivalDot2(cells);
  const n = chain.length;
  for (let e = 0; e < 2; e += 1) {
    if (ends[e].kind !== 'kerb') continue;
    const at = e === 0 ? chain[0] : chain[n - 1];
    const inner = e === 0 ? chain[1] : chain[n - 2];
    const loc = locateOnRings(rings, at);
    if (loc.ring < 0) return false;
    const ring = rings[loc.ring];
    const d = unit(sub(ring[(loc.edge + 1) % ring.length], ring[loc.edge]));
    const u = unit(sub(at, inner));
    if (d === null || u === null) return false;
    const c = dot(u, d);
    if (c * c > bound) return false;
  }
  return true;
}

/**
 * Step 10's continuation rule at an end landing on an existing junction (§4.6; J-P11, GEO-42; C-0237 (14)): a crossroads
 * is admitted only on an interior spine (never across a district-boundary edge), of a lower-or-equal class than the
 * cut, and collinear within the tolerance (`cosTol`, cos of cut.settings.continuationCdeg) with a way leaving the
 * junction along the arrival. Returns the refusal's reason, or null when the crossroads is admitted.
 */
export function continuationVerdict(c: { bounding: boolean; spineClass: string; cutClass: string; arrival: XY; leaving: readonly XY[]; cosTol: number }): 'continuation-boundary' | 'continuation-class' | 'continuation-angle' | null {
  if (c.bounding) return 'continuation-boundary';
  const rank = (k: string): number => (k === 'alley' ? 0 : k === 'lane' ? 1 : k === 'secondary' ? 2 : 3);
  if (rank(c.spineClass) > rank(c.cutClass)) return 'continuation-class';
  if (!c.leaving.some((d) => d.x * c.arrival.x + d.y * c.arrival.y >= c.cosTol)) return 'continuation-angle';
  return null;
}

/** The cut's length on the kerb (the width law's L): its kerb points' polyline length. */
export function kerbLength(points: readonly XY[]): number {
  return lineLength(points);
}
