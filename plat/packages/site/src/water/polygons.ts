// The water bodies' polygons (M0-e-03; §4.2 S1 (8): "water faces enter L0 with shore / bank edges"; M0-work.json's
// builds: "the river reach polygons from the course and width profile (buffer of the course, M0-a-08) … typed river /
// tributary / estuary"; §4.1's S1 row: "a sea or river reaching the arena's edge shares that ring"). Each body's course
// is buffered by half its width profile (round joins and ends, §3.4's `buffer`), clipped to the arena (so a reach
// reaching the edge ends on the outer ring), and the bodies made disjoint in order — a later body loses what an
// earlier one covers, so a tributary ends on its river's shore. A body whose course ends on the arena's edge is first
// prolonged past it, so the clip, not a round end, shapes it there; a joined tributary is prolonged to the nearest
// point of the course it joins, so it meets that river with no gap. Parts below SLIVER_AREA_CM2 are a boolean's
// slivers, dropped; a part keeps the body's course points that lie at least SEED_DEPTH_CM inside it (its seeds), and a
// part with none is dropped too (C-0225 (2), (3)).
//
// The basic estuary (§4.2 S1 (3) *Mouths*; C-0173 (7)): with `mouth` `estuary` or `delta`, the river's last
// ESTUARY_SPLIT_M — the stretch M0-e-02 widened — is split off as a body of its own, kind `estuary`, flowing from the
// river (C-0225 (4)).
import { booleans, buffer, err, ok, type KernelResult, type LatticePoint, type Ring, type Warning } from '@plat/kernel';
import type { Cm, CmArray, Id, PointCm, WaterBody } from '@plat/model';
import { arcLengths, pointAtArc, type XY } from '../hydro/course.js';
import { area2, insideRings, lineOf, nearestOnLine, onRing, outerRing, quot, ringGap, ringsDist2, segDist2, type Reach } from './geometry.js';
import { ESTUARY_SPLIT_M, SEED_DEPTH_CM, SLIVER_AREA_CM2 } from './params.js';
import { cleanRing, clearOf, clearRing, clipToArena, isSimple, mouthRing, offsetRing, refusal, RING_CLEAR_CM, ringsApart, snapRing, type Cap } from './offset.js';
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
    const at = { x: Math.round(p.x) as Cm, y: Math.round(p.y) as Cm } as PointCm;
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

/** A unit direction from a to b (null when they coincide). */
function unit(a: XY, b: XY): XY | null {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return null;
  return { x: quot(dx, len), y: quot(dy, len) };
}

/** A point rounded to the lattice. */
function lp(q: XY): LatticePoint {
  return { x: Math.round(q.x) as Cm, y: Math.round(q.y) as Cm };
}

/**
 * The chain a body is buffered along, with a half-width per point: its course, prolonged past the arena's edge where
 * it ends on it (by its width plus a metre, so the clip shapes the end), and a joined body prolonged to the nearest
 * point of the course it flows into.
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
    const ext = widths[0] + 100;
    pts.unshift(lp({ x: course[0].x + first.x * ext, y: course[0].y + first.y * ext }));
    half.unshift(half[0]);
  }
  const n = course.length;
  const lastDir = unit(course[n - 2], course[n - 1]);
  if (lastDir !== null && onRing(reach, course[n - 1])) {
    endOut = true;
    const ext = widths[n - 1] + 100;
    pts.push(lp({ x: course[n - 1].x + lastDir.x * ext, y: course[n - 1].y + lastDir.y * ext }));
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

/** A joined body is prolonged to the river it joins only from this near (cm): beside it, never across land. */
const JOIN_REACH_CM = 10_000;

/**
 * The chain simplified for the buffer (C-0225 (2)): Douglas–Peucker on the points with their half-widths — a point is
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
 * The polygons of `bodies` in order (see the header): one WaterReach per body that keeps a part, the bodies dropped
 * with their reason, and the booleans' warnings. A refusal of a boolean other than an empty result (E_OUT_OF_RANGE)
 * is the caller's.
 */
export function waterPolygons(bodies: readonly WaterBody[], reach: Reach): KernelResult<{ reaches: WaterReach[]; dropped: DroppedBody[]; fallbacks: { id: Id; why: string }[] }> {
  const frameRing: Ring[] = [outerRing(reach)];
  const reaches: WaterReach[] = [];
  const dropped: DroppedBody[] = [];
  const fallbacks: { id: Id; why: string }[] = [];
  const warnings: Warning[] = [];
  let covered: Ring[] = [];
  const earlier: WaterBody[] = [];
  for (const body of bodies) {
    const chain = chainOf(body, reach, earlier);
    earlier.push(body);
    if (chain === null) {
      dropped.push({ id: body.id, reason: 'course' });
      continue;
    }
    const simple = simplifyChain(chain.pts, chain.half);
    const fast = fastRings(body, simple, chain, bodies, reach, covered);
    let rings: Ring[];
    if (typeof fast !== 'string') rings = fast;
    else {
      fallbacks.push({ id: body.id, why: fast });
      // the kernel's own: §3.4's buffer, clipped to the arena, less the earlier bodies (C-0225 (2))
      const slow = slowRings(simple, frameRing, covered);
      if (!slow.ok) {
        if (slow.code === 'E_DEGENERATE') {
          dropped.push({ id: body.id, reason: 'empty' });
          continue;
        }
        return err(slow.code, `water ${body.id}: ${slow.detail}`);
      }
      warnings.push(...slow.warnings);
      rings = slow.value;
    }
    const course = body.course ?? [];
    const depth2 = SEED_DEPTH_CM * SEED_DEPTH_CM;
    const parts: WaterPart[] = [];
    for (const part of partsOf(rings)) {
      const seeds: LatticePoint[] = [];
      for (const q of course) {
        if (!insideRings(part, q)) continue;
        if (ringsDist2(part, q) < depth2) continue;
        seeds.push(lp(q));
      }
      if (seeds.length > 0) parts.push({ rings: part, seeds });
    }
    if (parts.length === 0) {
      dropped.push({ id: body.id, reason: 'empty' });
      continue;
    }
    reaches.push({ body, parts });
    covered = [...covered, ...parts.flatMap((p) => p.rings)];
  }
  return ok({ reaches, dropped, fallbacks }, foldWarnings(warnings));
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
 * shore it joins, round elsewhere; on the lattice, simple and clear of the earlier rings — else null.
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
  if (raw === null) return `${chain.joined ? 'mouth' : 'offset'}: ${refusal()}`;
  const snapped = snapRing(clipToArena(raw.ring, reach));
  // the vertices on the arena's edge (the clip's) and on an earlier ring (a mouth's, the estuary's cut) stay
  const fixed = (q: XY): boolean => onRing(reach, q) || (covered.length > 0 && ringsDist2(covered, q) <= 4);
  const ring = snapped === null ? null : cleanRing(snapped, fixed);
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
  for (let i = 0; i < rings.length; i += 1) {
    if (!isSimple(rings[i])) return 'not simple';
    if (!clearRing(rings[i])) return 'near-touch';
    for (let j = i + 1; j < rings.length; j += 1) if (!ringsApart(rings[i], rings[j])) return 'rings meet';
    if (!clearOf(rings[i], covered)) return 'meets an earlier body';
  }
  return rings;
}

/** Warnings folded by code (counts summed), in first-seen order. */
function foldWarnings(ws: readonly Warning[]): Warning[] {
  const out: Warning[] = [];
  for (const w of ws) {
    const same = out.find((o) => o.code === w.code);
    if (same === undefined) out.push({ code: w.code, count: w.count });
    else same.count += w.count;
  }
  return out;
}
