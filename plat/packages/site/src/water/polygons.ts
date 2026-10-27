// The water bodies' polygons (M0-e-03; §4.2 S1 (8): "water faces enter L0 with shore / bank edges"; M0-work.json's
// builds: "the river reach polygons from the course and width profile (buffer of the course, M0-a-08) … typed river /
// tributary / estuary"; §4.1's S1 row: "a sea or river reaching the arena's edge shares that ring"). Each body's course
// is buffered by half its width profile, clipped to the arena (so a reach reaching the edge ends on the outer ring),
// and the bodies made disjoint in order — a later body loses what an earlier one covers, so a tributary ends on its
// river's shore (C-0229 (2)):
//
// * the chain: the course, prolonged past the arena's edge where it ends on it (the clip, not a cap, shapes that end),
//   a joined tributary prolonged to the nearest point of the course it joins; simplified (Douglas–Peucker, SIMPLIFY_CM
//   on the points and their half-widths) — S1 (3)'s Chaikin course carries a vertex every few metres;
// * the fast ring first (./offset.ts): the two offset lines, the mouth cut along the joined river's shore, checked
//   simple, clear of itself and of the earlier rings; a ring it refuses takes the kernel's own construction — §3.4's
//   `buffer` (round joins and ends), `booleans` intersection with the arena and difference with the earlier bodies —
//   reported in `fallbacks` with the refusal (the kernel's union costs tens of seconds on a CITY river, the fast ring
//   milliseconds); the kernel's rings are then cleaned and proved as the fast ring is (`provedRings`, C-0307), and a
//   body whose rings stay unclear is dropped, reason `refused`, its cause in `fallbacks`;
// * the basic estuary (§4.2 S1 (3) *Mouths*; C-0173 (7)): with `mouth` `estuary` or `delta` the river's last
//   ESTUARY_SPLIT_M — the stretch M0-e-02 widened — is a body of its own, kind `estuary`, flowing from the river: one
//   fast ring along the joined course cut across at the split point (`estuaryPair`); where that cannot be made the
//   river stays whole, reported (C-0229 (4)).
//
// Parts below SLIVER_AREA_CM2 are a boolean's slivers, dropped; a part keeps the body's course points that lie at least
// SEED_DEPTH_CM inside it (its seeds; C-0229 (3)), or one interior point that deep where no course point is, and a part
// with no point that deep is dropped and reported in `fallbacks` (`PART_DROPPED`; note 4).
//
// File-level (shared by path inside `@plat/site`, not part of the package's API; J263 Q1's convention): `KERNEL_RING`
// and `PART_DROPPED` (the stage reads them back), `provedRings`, `fastRings`, `chainOf`, `simplifyChain`, `SIMPLIFY_CM`.
import { booleans, buffer, err, ok, type KernelResult, type LatticePoint, type Ring, type Warning } from '@plat/kernel';
import type { CmArray, Id, PointCm, WaterBody } from '@plat/model';
import { arcLengths, pointAtArc, type XY } from '../hydro/course.js';
import { area2, insideRings, lineOf, lp, nearestOnLine, onRing, outerRing, quot, rayHit, ringGap, ringsDist2, segDist2, type Reach } from './geometry.js';
import { ESTUARY_SPLIT_M, SEED_DEPTH_CM, SLIVER_AREA_CM2 } from './params.js';
import { cleanRing, clearOf, clearRing, clipToArena, isSimple, mouthRing, offsetRing, RING_CLEAR_CM, ringsApart, snapRing, unitOf, type Cap } from './offset.js';
import type { DroppedBody, WaterPart, WaterReach } from './types.js';

/** The estuary's id beside its river's (M0-e-02's `water:<kind>:<n>` form until §6.3's mint, C-0173 (1)). */
export function estuaryId(river: Id): Id {
  const n = river.lastIndexOf(':');
  return `water:estuary:${n >= 0 ? river.slice(n + 1) : '0'}`;
}

/**
 * The basic estuary split (see the header): the first `river` body whose course reaches the arena's edge and runs
 * longer than twice ESTUARY_SPLIT_M is cut at ESTUARY_SPLIT_M before its end — the river keeps the course up to the
 * cut (its control knots before it), the estuary takes the course from it (no knots: S1's knots are the river's), each
 * with its widths, the cut point carrying the interpolated width. Every other body is returned unchanged.
 */
export function splitEstuary(bodies: readonly WaterBody[], reach: Reach, mouth: 'none' | 'estuary' | 'delta' | undefined): WaterBody[] {
  if (mouth !== 'estuary' && mouth !== 'delta') return bodies.slice();
  const out: WaterBody[] = [];
  let done = false;
  for (const b of bodies) {
    const course = b.course ?? [];
    const widths = b.widthProfile;
    if (done || b.kind !== 'river' || course.length < 2 || widths === undefined || widths.length !== course.length || !onRing(reach, course[course.length - 1])) {
      out.push(b);
      continue;
    }
    const arcs = arcLengths(course);
    const total = arcs[arcs.length - 1];
    const cut = total - ESTUARY_SPLIT_M * 100;
    if (cut < ESTUARY_SPLIT_M * 100) {
      out.push(b);
      continue;
    }
    done = true;
    let k = 1;
    while (k < course.length - 1 && arcs[k] <= cut) k += 1;
    // vertex k is the first past the cut; the cut point lies on segment k − 1 → k
    const p = pointAtArc(course, arcs, cut);
    const at = lp(p) as PointCm;
    const seg = arcs[k] - arcs[k - 1];
    const share = seg >= 1 ? quot(cut - arcs[k - 1], seg) : 0;
    const wAt = Math.round(widths[k - 1] + (widths[k] - widths[k - 1]) * share);
    const head = course.slice(0, k);
    const headW = Array.from(widths.slice(0, k));
    const last = head[head.length - 1];
    if (last.x !== at.x || last.y !== at.y) {
      head.push(at);
      headW.push(wAt);
    }
    const tail = [at, ...course.slice(k)];
    const tailW = [wAt, ...Array.from(widths.slice(k))];
    if (tail.length > 1 && tail[1].x === at.x && tail[1].y === at.y) {
      tail.splice(1, 1);
      tailW.splice(1, 1);
    }
    const id = estuaryId(b.id);
    const controls = (b.controls ?? []).filter((c) => nearestOnLine(lineOf(course), c.at).arc <= cut);
    const river: WaterBody = { ...b, course: head, widthProfile: Int32Array.from(headW) as CmArray, flowTo: id };
    if (b.controls !== undefined) {
      river.controls = controls;
      river.nextControl = b.nextControl ?? controls.length;
    }
    const estuary: WaterBody = {
      id,
      kind: 'estuary',
      face: { owner: id, level: 0 },
      shore: { role: 'shore', entity: id },
      course: tail,
      widthProfile: Int32Array.from(tailW) as CmArray,
      flowFrom: b.id,
      ...(b.flowTo !== undefined ? { flowTo: b.flowTo } : {}),
      lifecycle: b.lifecycle,
    };
    out.push(river, estuary);
  }
  return out;
}

/** A unit direction from a to b (null when they lie within a centimetre): `unitOf` of the difference. */
function unit(a: XY, b: XY): XY | null {
  return unitOf({ x: b.x - a.x, y: b.y - a.y });
}

/**
 * The chain a body is buffered along, with a half-width per point: its course, prolonged past the arena's edge where
 * it ends on it (by its width plus a metre, longer at a grazing angle — `prolonged` — so the clip shapes the end), and
 * a joined body prolonged to the nearest point of the course it flows into.
 */
export function chainOf(body: WaterBody, reach: Reach, earlier: readonly WaterBody[]): { pts: LatticePoint[]; half: number[]; startOut: boolean; endOut: boolean; joined: boolean } | null {
  const course = body.course ?? [];
  const widths = body.widthProfile;
  if (course.length < 2 || widths === undefined || widths.length !== course.length) return null;
  const pts: LatticePoint[] = course.map((q) => lp(q));
  const half: number[] = Array.from(widths, (w) => w * 0.5);
  let startOut = false;
  let endOut = false;
  let joined = false;
  const first = unit(course[1], course[0]);
  if (first !== null && onRing(reach, course[0])) {
    startOut = true;
    pts.unshift(prolonged(course[0], first, widths[0] + 100, half[0], reach));
    half.unshift(half[0]);
  }
  const n = course.length;
  const lastDir = unit(course[n - 2], course[n - 1]);
  if (lastDir !== null && onRing(reach, course[n - 1])) {
    endOut = true;
    pts.push(prolonged(course[n - 1], lastDir, widths[n - 1] + 100, half[half.length - 1], reach));
    half.push(half[half.length - 1]);
  } else if (body.flowTo !== undefined) {
    // The nearest course point of the earlier bodies (the joined river, or the estuary split from it), when it lies
    // within JOIN_REACH_CM: a tributary's trace ends beside the river it joins (C-0175 (3)).
    let best: { p: XY; d2: number } | null = null;
    for (const e of earlier) {
      const line = e.course;
      if (line === undefined || line.length < 2) continue;
      const near = nearestOnLine(lineOf(line), course[n - 1]);
      if (best === null || near.dist2 < best.d2) best = { p: pointAtArc(line, arcLengths(line), near.arc), d2: near.dist2 };
    }
    if (best !== null && best.d2 <= JOIN_REACH_CM * JOIN_REACH_CM) {
      pts.push(lp(best.p));
      half.push(half[half.length - 1]);
      joined = true;
    }
  }
  return { pts, half, startOut, endOut, joined };
}

/**
 * A chain's end prolonged out of the arena from its course point `at` on the edge along the unit `dir` (Q45): by `ext`
 * (its width plus a metre), doubled — at most PROLONG_DOUBLINGS times — until both offset points of the prolonged end,
 * `h` either side, lie outside the arena. A course leaving at a grazing angle then ends past the edge too, so the clip,
 * never the end's own cut, shapes its ring there (a reach reaching the edge shares the outer ring, §4.1's S1 row); where
 * the first length suffices the end is the one it always was.
 */
function prolonged(at: XY, dir: XY, ext0: number, h: number, reach: Reach): LatticePoint {
  let ext = ext0;
  for (let i = 0; i < PROLONG_DOUBLINGS; i += 1) {
    const x = at.x + dir.x * ext;
    const y = at.y + dir.y * ext;
    if (ringGap(reach, { x: x - dir.y * h, y: y + dir.x * h }) < 0 && ringGap(reach, { x: x + dir.y * h, y: y - dir.x * h }) < 0) break;
    ext *= 2;
  }
  return lp({ x: at.x + dir.x * ext, y: at.y + dir.y * ext });
}

/** The prolongation's doublings at most (its length at most 64 times the first). */
const PROLONG_DOUBLINGS = 6;

/** A joined body is prolonged to the river it joins only from this near (cm): beside it, never across land. */
const JOIN_REACH_CM = 10_000;

/**
 * The chain simplified for the buffer (C-0229 (2)): Douglas–Peucker on the points with their half-widths — a point is
 * dropped only when it lies within SIMPLIFY_CM of the chord between the points kept around it and its half-width within
 * SIMPLIFY_CM of the chord's interpolated one. S1 (3)'s Chaikin-smoothed course carries a vertex every few metres; the
 * polygon keeps its shape within the tolerance and the buffer's union stays small. The ends are always kept.
 */
export function simplifyChain(pts: readonly LatticePoint[], half: readonly number[]): { pts: LatticePoint[]; half: number[] } {
  const n = pts.length;
  if (n <= 2) return { pts: pts.slice(), half: half.slice() };
  const keep = new Uint8Array(n);
  keep[0] = 1;
  keep[n - 1] = 1;
  const stack: [number, number][] = [[0, n - 1]];
  const tol2 = SIMPLIFY_CM * SIMPLIFY_CM;
  while (stack.length > 0) {
    const [a, b] = stack.pop() as [number, number];
    if (b - a < 2) continue;
    const pa = pts[a];
    const pb = pts[b];
    const len = Math.sqrt((pb.x - pa.x) * (pb.x - pa.x) + (pb.y - pa.y) * (pb.y - pa.y));
    let worst = -1;
    let worstD = 0;
    for (let i = a + 1; i < b; i += 1) {
      const d2 = segDist2(pts[i], pa, pb);
      // the half-width the chord interpolates at i's projection
      const t = len >= 1 ? Math.min(1, Math.max(0, quot((pts[i].x - pa.x) * (pb.x - pa.x) + (pts[i].y - pa.y) * (pb.y - pa.y), len * len))) : 0;
      const dw = Math.abs(half[a] + (half[b] - half[a]) * t - half[i]);
      const over = Math.max(d2 > tol2 ? d2 : 0, dw > SIMPLIFY_CM ? dw * dw : 0);
      if (over > worstD) {
        worstD = over;
        worst = i;
      }
    }
    if (worst < 0) continue;
    keep[worst] = 1;
    stack.push([worst, b], [a, worst]);
  }
  const out: LatticePoint[] = [];
  const hw: number[] = [];
  for (let i = 0; i < n; i += 1) {
    if (keep[i] === 0) continue;
    out.push(pts[i]);
    hw.push(half[i]);
  }
  return { pts: out, half: hw };
}

/** The buffer's tolerance on the course (cm): its points within it of the chord are not buffered one by one. */
export const SIMPLIFY_CM = 50;

/** Groups rings into parts: each outer ring (counter-clockwise) with the holes it holds; slivers dropped. */
function partsOf(rings: readonly Ring[]): LatticePoint[][][] {
  const outers: { ring: LatticePoint[]; area: number; holes: LatticePoint[][] }[] = [];
  const holes: LatticePoint[][] = [];
  for (const r of rings) {
    const a = area2(r);
    if (Math.abs(a) < 2 * SLIVER_AREA_CM2) continue;
    if (a > 0) outers.push({ ring: r.slice(), area: a, holes: [] });
    else holes.push(r.slice());
  }
  for (const h of holes) {
    // the smallest outer ring holding the hole's first vertex
    let best = -1;
    for (let i = 0; i < outers.length; i += 1) {
      if (!insideRings([outers[i].ring], h[0]) && !onBoundary(outers[i].ring, h[0])) continue;
      if (best < 0 || outers[i].area < outers[best].area) best = i;
    }
    if (best >= 0) outers[best].holes.push(h);
  }
  return outers.map((o) => [o.ring, ...o.holes]);
}

/** Is q on a segment of the ring? */
function onBoundary(ring: readonly XY[], q: XY): boolean {
  return ringsDist2([ring], q) === 0;
}

/**
 * A body's parts from its rings: grouped outer and holes, each part keeping its seeds — the course points ≥ SEED_DEPTH_CM
 * inside, or, where none is, one interior point that deep (`interiorSeed`; note 4 of checks/M0-e-03-notes.md). A part
 * with no point that deep anywhere (narrower than twice SEED_DEPTH_CM throughout: under the insertion's fidelity, a
 * sliver by its width) is dropped and returned in `lost` with its area, for the report.
 */
function partsWithSeeds(body: WaterBody, rings: readonly Ring[]): { parts: WaterPart[]; lost: number[] } {
  const course = body.course ?? [];
  const depth2 = SEED_DEPTH_CM * SEED_DEPTH_CM;
  const parts: WaterPart[] = [];
  const lost: number[] = [];
  for (const part of partsOf(rings)) {
    const seeds: LatticePoint[] = [];
    for (const q of course) {
      if (!insideRings(part, q)) continue;
      if (ringsDist2(part, q) < depth2) continue;
      seeds.push(lp(q));
    }
    if (seeds.length === 0) {
      const q = interiorSeed(part);
      if (q !== null) seeds.push(q);
    }
    if (seeds.length > 0) parts.push({ rings: part, seeds });
    else {
      let a2 = 0;
      for (const r of part) a2 += area2(r);
      lost.push(Math.abs(a2) * 0.5);
    }
  }
  return { parts, lost };
}

/**
 * A lattice point SEED_DEPTH_CM inside a part (its outer ring with its holes) when no course point is: from each outer
 * segment's midpoint in ring order, along the segment's inward (left) normal, at SEED_DEPTH_CM + 1 cm and then twice,
 * four and eight times as far — the first such point inside the part and that far from every ring; null when there is
 * none.
 */
function interiorSeed(part: readonly Ring[]): LatticePoint | null {
  const outer = part[0];
  const n = outer.length;
  const depth2 = SEED_DEPTH_CM * SEED_DEPTH_CM;
  for (let i = 0; i < n; i += 1) {
    const a = outer[i];
    const b = outer[i + 1 === n ? 0 : i + 1];
    const u = unit(a, b);
    if (u === null) continue;
    for (let d = SEED_DEPTH_CM + 1, k = 0; k < 4; d *= 2, k += 1) {
      const q = lp({ x: (a.x + b.x) * 0.5 - u.y * d, y: (a.y + b.y) * 0.5 + u.x * d });
      if (insideRings(part, q) && ringsDist2(part, q) >= depth2) return q;
    }
  }
  return null;
}

/**
 * The `fallbacks` text that opens a part dropped with no seed (note 4), its area following: the stage tells such an entry
 * from a fast ring's refusal by it. File-level (see the header).
 */
export const PART_DROPPED = `a part with no point ${String(SEED_DEPTH_CM)} cm inside, dropped: `;

/** A ring with point q inserted on segment `seg` (or that vertex's index when q is one of its ends): the new ring and q's index. */
function withVertex(ring: readonly LatticePoint[], seg: number, q: LatticePoint): { ring: LatticePoint[]; at: number } {
  const n = ring.length;
  const a = ring[seg];
  const b = ring[(seg + 1) % n];
  if (a.x === q.x && a.y === q.y) return { ring: ring.slice(), at: seg };
  if (b.x === q.x && b.y === q.y) return { ring: ring.slice(), at: (seg + 1) % n };
  return { ring: [...ring.slice(0, seg + 1), q, ...ring.slice(seg + 1)], at: seg + 1 };
}

/**
 * The basic estuary's two polygons (C-0229 (4)): the river and its estuary as one fast ring along their joined course,
 * cut across at the estuary's first course point along the original segment's normal — the cut's two ends inserted
 * where that line first meets the ring on each side — into the river's side (holding the river's course) and the
 * estuary's; each side simple and clear. A reason when it cannot be made (the caller keeps the river whole).
 */
function estuaryPair(river: WaterBody, estuary: WaterBody, reach: Reach, earlier: readonly WaterBody[], covered: readonly Ring[]): { river: Ring[]; estuary: Ring[] } | string {
  const rc = river.course ?? [];
  const ec = estuary.course ?? [];
  const rw = river.widthProfile;
  const ew = estuary.widthProfile;
  if (rc.length < 2 || ec.length < 2 || rw === undefined || ew === undefined) return 'course';
  const joined: WaterBody = { ...river, course: [...rc, ...ec.slice(1)], widthProfile: Int32Array.from([...Array.from(rw), ...Array.from(ew).slice(1)]) as CmArray };
  if (estuary.flowTo !== undefined) joined.flowTo = estuary.flowTo;
  else delete joined.flowTo;
  const chain = chainOf(joined, reach, earlier);
  if (chain === null) return 'course';
  const simple = simplifyChain(chain.pts, chain.half);
  const fast = fastRings(joined, simple, chain, [], reach, covered);
  if (typeof fast === 'string') return fast;
  const cut = ec[0];
  const n = leftNormal(rc[rc.length - 2], ec[1]);
  if (n === undefined) return 'cut';
  const outer = fast[0];
  const l = rayHit([outer], cut, n);
  const r = rayHit([outer], cut, { x: -n.x, y: -n.y });
  if (l === null || r === null) return 'cut';
  const L = lp(l.at);
  const R = lp(r.at);
  // insert the later segment's point first, so the earlier index stays put
  let ring = outer;
  let iL: number;
  let iR: number;
  if (l.seg > r.seg) {
    const a = withVertex(ring, l.seg, L);
    const b = withVertex(a.ring, r.seg, R);
    ring = b.ring;
    iR = b.at;
    iL = a.at + (b.ring.length > a.ring.length && b.at <= a.at ? 1 : 0);
  } else {
    const a = withVertex(ring, r.seg, R);
    const b = withVertex(a.ring, l.seg, L);
    ring = b.ring;
    iL = b.at;
    iR = a.at + (b.ring.length > a.ring.length && b.at <= a.at ? 1 : 0);
  }
  if (iL === iR) return 'cut';
  const m = ring.length;
  const side = (from: number, to: number): LatticePoint[] => {
    const out: LatticePoint[] = [];
    for (let k = from; ; k = (k + 1) % m) {
      out.push(ring[k]);
      if (k === to) break;
    }
    return out;
  };
  const a = side(iL, iR);
  const b = side(iR, iL);
  const mid = rc[rc.length >> 1];
  const riverSide = insideRings([a], mid) ? a : insideRings([b], mid) ? b : null;
  if (riverSide === null) return 'cut';
  const estSide = riverSide === a ? b : a;
  const holes = fast.slice(1);
  const out: { river: Ring[]; estuary: Ring[] } = { river: [riverSide], estuary: [estSide] };
  for (const h of holes) (insideRings([riverSide], h[0]) ? out.river : out.estuary).push(h);
  for (const q of [riverSide, estSide]) {
    if (area2(q) === 0 || !isSimple(q) || !clearRing(q)) return 'cut';
  }
  return out;
}

/**
 * The polygons of `bodies` in order (see the header): one WaterReach per body that keeps a part, the bodies dropped
 * with their reason, the bodies whose ring took the kernel's buffer and booleans (`slowOnly`: every body) with the fast
 * ring's refusal, and the booleans' warnings. With `mouth` `estuary` or `delta` the river's last reach is split off as
 * its estuary (`splitEstuary`) on the fast ring's cut — and the river kept whole when that cannot be made. A refusal of
 * a boolean other than an empty result (E_OUT_OF_RANGE) is the caller's.
 */
export function waterPolygons(
  bodies: readonly WaterBody[],
  reach: Reach,
  opts: { slowOnly?: boolean; mouth?: 'none' | 'estuary' | 'delta' } = {},
): KernelResult<{ reaches: WaterReach[]; dropped: DroppedBody[]; fallbacks: { id: Id; why: string }[] }> {
  const frameRing: Ring[] = [outerRing(reach)];
  const reaches: WaterReach[] = [];
  const dropped: DroppedBody[] = [];
  const fallbacks: { id: Id; why: string }[] = [];
  const warnings: Warning[] = [];
  let covered: Ring[] = [];
  const earlier: WaterBody[] = [];
  const split = splitEstuary(bodies, reach, opts.mouth);
  const keep = (body: WaterBody, rings: readonly Ring[]): boolean => {
    const { parts, lost } = partsWithSeeds(body, rings);
    if (parts.length === 0) {
      dropped.push({ id: body.id, reason: 'empty' });
      return false;
    }
    // a part lost beside parts kept is reported, never silent (note 4): its area in m², rounded
    for (const a of lost) fallbacks.push({ id: body.id, why: `${PART_DROPPED}${String(Math.round(a * 0.0001))} m²` });
    reaches.push({ body, parts });
    covered = [...covered, ...parts.flatMap((p) => p.rings)];
    return true;
  };
  for (let bi = 0; bi < split.length; bi += 1) {
    let body = split[bi];
    const next = split[bi + 1];
    if (next !== undefined && next.kind === 'estuary' && next.flowFrom === body.id && body.flowTo === next.id) {
      // the river and its estuary, cut from one ring
      bi += 1;
      const original = bodies.find((b) => b.id === body.id) as WaterBody;
      const fallbacksBefore = fallbacks.length;
      const pair = opts.slowOnly === true ? 'slow only' : estuaryPair(body, next, reach, earlier, covered);
      if (typeof pair !== 'string') {
        earlier.push(body, next);
        const before = reaches.length;
        if (keep(body, pair.river) && keep(next, pair.estuary)) continue;
        // a side without a seed: keep the river whole instead
        reaches.length = before;
        fallbacks.length = fallbacksBefore;
        const others = dropped.filter((d) => d.id !== body.id && d.id !== next.id);
        dropped.length = 0;
        dropped.push(...others);
        covered = reaches.flatMap((r) => r.parts.flatMap((p) => p.rings));
        earlier.length -= 2;
      }
      fallbacks.push({ id: next.id, why: `estuary not split: ${typeof pair === 'string' ? pair : 'a side without a seed'}` });
      body = original;
    }
    const chain = chainOf(body, reach, earlier);
    earlier.push(body);
    if (chain === null) {
      dropped.push({ id: body.id, reason: 'course' });
      continue;
    }
    const simple = simplifyChain(chain.pts, chain.half);
    const fast = opts.slowOnly === true ? 'slow only' : fastRings(body, simple, chain, split, reach, covered);
    let rings: Ring[];
    if (typeof fast !== 'string') rings = fast;
    else {
      fallbacks.push({ id: body.id, why: fast });
      // the kernel's own: §3.4's buffer, clipped to the arena, less the earlier bodies (C-0229 (2))
      const slow = slowRings(simple, frameRing, covered);
      if (!slow.ok) {
        if (slow.code === 'E_DEGENERATE') {
          dropped.push({ id: body.id, reason: 'empty' });
          continue;
        }
        return err(slow.code, `water ${body.id}: ${slow.detail}`);
      }
      warnings.push(...slow.warnings);
      // the kernel's rings cleaned and proved as the fast ring is (C-0307): a ring the clean cannot make clear is a
      // refused body, its cause beside the fast ring's in `fallbacks`
      const proved = provedRings(slow.value, reach, covered);
      if (typeof proved === 'string') {
        fallbacks[fallbacks.length - 1] = { id: body.id, why: `${fast}${KERNEL_RING}${proved}` };
        dropped.push({ id: body.id, reason: 'refused' });
        continue;
      }
      rings = proved;
    }
    keep(body, rings);
  }
  return ok({ reaches, dropped, fallbacks }, foldWarnings(warnings));
}

/**
 * The text `waterPolygons` puts between a body's fast-ring refusal and its kernel ring's in `fallbacks`; the stage
 * (./stage.ts) splits the two causes on it. File-level (see the header).
 */
export const KERNEL_RING = "; the kernel's ring: ";

/**
 * The ring proofs, the fast ring's and the kernel ring's one judge: per ring in order, simple (`not simple`), every
 * vertex RING_CLEAR_CM clear of its own ring outside its one-ring (`near-touch`), apart from every later ring (`rings
 * meet`), clear of the earlier bodies but along them (`meets an earlier body`) — the first failure's cause, or null.
 */
function proveRings(rings: readonly Ring[], covered: readonly Ring[]): string | null {
  for (let i = 0; i < rings.length; i += 1) {
    if (!isSimple(rings[i])) return 'not simple';
    if (!clearRing(rings[i])) return 'near-touch';
    for (let j = i + 1; j < rings.length; j += 1) if (!ringsApart(rings[i], rings[j])) return 'rings meet';
    if (!clearOf(rings[i], covered)) return 'meets an earlier body';
  }
  return null;
}

/** A vertex within this of an earlier body's ring, or of an estuary cut's bank point, lies on it (cm). */
const FIXED_BAND_CM = 2;

/**
 * The vertices the clean keeps (`cleanRing`'s `fixed`): a vertex on the arena's edge, on an earlier body's ring (within
 * FIXED_BAND_CM — a mouth's or a cut's lattice rounding, the quantity of offset.ts's ON_CM) or at an estuary cut's bank
 * points stays through the clean: the shared stretches need it (C-0307 (2)).
 */
function fixedVertices(reach: Reach, covered: readonly Ring[], cuts: readonly XY[] = []): (q: XY) => boolean {
  return (q) => onRing(reach, q) || cuts.some((c) => Math.abs(c.x - q.x) <= FIXED_BAND_CM && Math.abs(c.y - q.y) <= FIXED_BAND_CM) || (covered.length > 0 && ringsDist2(covered, q) <= FIXED_BAND_CM * FIXED_BAND_CM);
}

/**
 * The kernel's rings of a body made fit for insertion (C-0307, refining C-0229 (2)): each cleaned as the fast ring is
 * (`cleanRing`: Douglas–Peucker 20 cm, vertices under 30 cm apart and needles dropped), its vertices on the arena's edge
 * or on an earlier body's ring fixed — the clip's and the difference's, which the shared edges need — a ring the clean
 * empties dropped as a sliver; then the fast ring's proofs (`proveRings`), each cause read `not clear (…)`. The buffer's
 * round joins leave sub-attraction hairpins (sides under minEdgeCm, a vertex within attractCm of a non-adjacent side)
 * that the insertion welds into a branching shore; the clean removes them, and a ring it cannot make clear is refused
 * here, never handed to the kernel. A cause when refused.
 */
export function provedRings(rings: readonly Ring[], reach: Reach, covered: readonly Ring[]): Ring[] | string {
  const fixed = fixedVertices(reach, covered);
  const out: Ring[] = [];
  for (const r of rings) {
    const c = cleanRing(r, fixed);
    if (c === null) continue;
    out.push(c);
  }
  const cause = proveRings(out, covered);
  return cause === null ? out : `not clear (${cause})`;
}

/** §3.4's buffer of the simplified chain (round joins and ends), clipped to the arena, less the earlier bodies. */
function slowRings(simple: { pts: LatticePoint[]; half: number[] }, frameRing: Ring[], covered: Ring[]): KernelResult<Ring[]> {
  const warnings: Warning[] = [];
  const buf = buffer([simple.pts], simple.half, 'round', 'round');
  if (!buf.ok) return buf;
  warnings.push(...buf.warnings);
  const clip = booleans('intersection', buf.value, frameRing, 'nonzero');
  if (!clip.ok) return clip;
  warnings.push(...clip.warnings);
  if (covered.length === 0) return ok(clip.value, warnings);
  const diff = booleans('difference', clip.value, covered, 'nonzero');
  if (!diff.ok) return diff;
  warnings.push(...diff.warnings);
  return ok(diff.value, warnings);
}

/** The left normal of the direction from a to b. */
function leftNormal(a: XY, b: XY): XY | undefined {
  const u = unit(a, b);
  return u === null ? undefined : { x: -u.y, y: u.x };
}

/**
 * The fast ring of a body (./offset.ts): flat where the chain runs out of the arena (the clip shapes it) and at the
 * estuary's cut (both bodies cut along one normal: the original course segment's), a joined body's mouth cut along the
 * shore it joins, round elsewhere; on the lattice, simple and clear of the earlier rings — else the refusal's cause.
 */
export function fastRings(body: WaterBody, simple: { pts: LatticePoint[]; half: number[] }, chain: { startOut: boolean; endOut: boolean; joined: boolean }, bodies: readonly WaterBody[], reach: Reach, covered: readonly Ring[]): Ring[] | string {
  const course = body.course ?? [];
  let startNormal: XY | undefined;
  let endNormal: XY | undefined;
  // the river whose last reach is an estuary (and that estuary): flat at the cut, on the original segment's normal
  const estuary = body.flowTo === undefined ? undefined : bodies.find((b) => b.id === body.flowTo && b.kind === 'estuary' && b.flowFrom === body.id);
  if (estuary !== undefined && estuary.course !== undefined && estuary.course.length >= 2 && course.length >= 2) endNormal = leftNormal(course[course.length - 2], estuary.course[1]);
  const from = body.kind === 'estuary' && body.flowFrom !== undefined ? bodies.find((b) => b.id === body.flowFrom) : undefined;
  if (from !== undefined && from.course !== undefined && from.course.length >= 2 && course.length >= 2) startNormal = leftNormal(from.course[from.course.length - 2], course[1]);
  const startCap: Cap = chain.startOut || startNormal !== undefined ? 'flat' : 'round';
  const endCap: Cap = chain.endOut || endNormal !== undefined ? 'flat' : 'round';
  const raw = chain.joined
    ? mouthRing(simple.pts, simple.half, startCap, covered)
    : offsetRing(simple.pts, simple.half, [startCap, endCap], { ...(startNormal !== undefined ? { start: startNormal } : {}), ...(endNormal !== undefined ? { end: endNormal } : {}) });
  if ('refused' in raw) return `${chain.joined ? 'mouth' : 'offset'}: ${raw.refused}`;
  const snapped = snapRing(clipToArena(raw.ring, reach));
  // the vertices on the arena's edge (the clip's) and on an earlier ring (a mouth's, the estuary's cut) stay
  // the estuary's cut: both bodies keep its two bank points, so they share that edge exactly
  const cuts: XY[] = [];
  const n = simple.pts.length;
  if (endNormal !== undefined) for (const sgn of [1, -1]) cuts.push({ x: Math.round(simple.pts[n - 1].x + sgn * endNormal.x * simple.half[n - 1]), y: Math.round(simple.pts[n - 1].y + sgn * endNormal.y * simple.half[n - 1]) });
  if (startNormal !== undefined) for (const sgn of [1, -1]) cuts.push({ x: Math.round(simple.pts[0].x + sgn * startNormal.x * simple.half[0]), y: Math.round(simple.pts[0].y + sgn * startNormal.y * simple.half[0]) });
  const ring = snapped === null ? null : cleanRing(snapped, fixedVertices(reach, covered, cuts));
  if (ring === null) return 'empty';
  // a vertex near the arena's edge but off it would be drawn onto the outer ring
  if (ring.some((q) => !onRing(reach, q) && ringGap(reach, q) < RING_CLEAR_CM)) return 'near the edge';
  const rings: Ring[] = [ring];
  for (const h of raw.holes) {
    if (h.some((q) => Math.abs(q.x) >= reach.x || Math.abs(q.y) >= reach.y)) return 'hole at the edge';
    const sh = snapRing(h);
    const hole = sh === null ? null : cleanRing(sh);
    if (hole === null || Math.abs(area2(hole)) < 2 * SLIVER_AREA_CM2) continue;
    if (!insideRings([ring], hole[0])) return 'hole outside';
    rings.push(area2(hole) > 0 ? hole.reverse() : hole);
  }
  return proveRings(rings, covered) ?? rings;
}

/**
 * Warnings folded by code (counts summed), in first-seen order, into fresh records of code and count: a report of
 * counts, so a warning's `at` is dropped — where the kernel's barrel `foldWarnings(own, from)` merges into `own` and
 * keeps the `at` of a code's first warning.
 */
function foldWarnings(ws: readonly Warning[]): Warning[] {
  const out: Warning[] = [];
  for (const w of ws) {
    const same = out.find((o) => o.code === w.code);
    if (same === undefined) out.push({ code: w.code, count: w.count });
    else same.count += w.count;
  }
  return out;
}
