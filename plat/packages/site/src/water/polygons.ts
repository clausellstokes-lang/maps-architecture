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
import { area2, insideRings, lineOf, nearestOnLine, onRing, outerRing, quot, ringsDist2, type Reach } from './geometry.js';
import { ESTUARY_SPLIT_M, SEED_DEPTH_CM, SLIVER_AREA_CM2 } from './params.js';
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
function chainOf(body: WaterBody, reach: Reach, earlier: readonly WaterBody[]): { pts: LatticePoint[]; half: number[] } | null {
  const course = body.course ?? [];
  const widths = body.widthProfile;
  if (course.length < 2 || widths === undefined || widths.length !== course.length) return null;
  const pts: LatticePoint[] = course.map((q) => lp(q));
  const half: number[] = Array.from(widths, (w) => w * 0.5);
  const first = unit(course[1], course[0]);
  if (first !== null && onRing(reach, course[0])) {
    const ext = widths[0] + 100;
    pts.unshift(lp({ x: course[0].x + first.x * ext, y: course[0].y + first.y * ext }));
    half.unshift(half[0]);
  }
  const n = course.length;
  const lastDir = unit(course[n - 2], course[n - 1]);
  if (lastDir !== null && onRing(reach, course[n - 1])) {
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
    }
  }
  return { pts, half };
}

/** A joined body is prolonged to the river it joins only from this near (cm): beside it, never across land. */
const JOIN_REACH_CM = 10_000;

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
export function waterPolygons(bodies: readonly WaterBody[], reach: Reach): KernelResult<{ reaches: WaterReach[]; dropped: DroppedBody[] }> {
  const frameRing: Ring[] = [outerRing(reach)];
  const reaches: WaterReach[] = [];
  const dropped: DroppedBody[] = [];
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
    const buf = buffer([chain.pts], chain.half, 'round', 'round');
    if (!buf.ok) {
      if (buf.code === 'E_DEGENERATE') {
        dropped.push({ id: body.id, reason: 'empty' });
        continue;
      }
      return err(buf.code, `water ${body.id}: buffer ${buf.detail}`);
    }
    warnings.push(...buf.warnings);
    let rings: Ring[] = buf.value;
    const clip = booleans('intersection', rings, frameRing, 'nonzero');
    if (!clip.ok) {
      if (clip.code === 'E_DEGENERATE') {
        dropped.push({ id: body.id, reason: 'empty' });
        continue;
      }
      return err(clip.code, `water ${body.id}: clip ${clip.detail}`);
    }
    warnings.push(...clip.warnings);
    rings = clip.value;
    if (covered.length > 0) {
      const diff = booleans('difference', rings, covered, 'nonzero');
      if (!diff.ok) {
        if (diff.code === 'E_DEGENERATE') {
          dropped.push({ id: body.id, reason: 'empty' });
          continue;
        }
        return err(diff.code, `water ${body.id}: difference ${diff.detail}`);
      }
      warnings.push(...diff.warnings);
      rings = diff.value;
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
  return ok({ reaches, dropped }, foldWarnings(warnings));
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
