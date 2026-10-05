// The block metrics (M0-k-05; §13.5's blocks, deep-block-interiors and MFCG street-signature rows, attachment A's
// `block.*`, `blockc.*` and `bldg.*` measures restated on our side; C-0018, C-0180 (4), (5)). Built blocks are the
// blocks whose content is not a square, a green or a yard. R4 and wall alignment are computed on block OBB axes — a
// proxy of the reference's building axes until plots and footprints arrive at M1 (C-0018, C-0072): compared and
// reported, never gated.
import { H32, obb, type LatticePoint } from '@plat/kernel';
import type { MetricBlock, MetricDoc, NgTemplate, XY } from './doc.js';
import { areaM2, centroidM, foldDeg90, insideRing, nearestEdge, openRing, segmentDistance, toMetres, type Pt } from './geometry.js';

const NOT_BUILT: ReadonlySet<string> = new Set(['square', 'green', 'yard']);

/** Is the block a built block (C-0180 (4))? */
export function isBuilt(b: MetricBlock): boolean {
  return b.content === undefined || !NOT_BUILT.has(b.content);
}

/** The doc's built blocks. */
export function builtBlocks(doc: MetricDoc): MetricBlock[] {
  return (doc.blocks ?? []).filter(isBuilt);
}

/** The template of each district that carries one. */
function templates(doc: MetricDoc): Map<string, NgTemplate> {
  const out = new Map<string, NgTemplate>();
  for (const d of doc.districts ?? []) if (d.template !== undefined) out.set(d.id, d.template);
  return out;
}

/** Built-block areas in m², whole and per district template (`all`, `template-<t>`). */
export function blockAreas(doc: MetricDoc): Map<string, number[]> {
  const tpl = templates(doc);
  const out = new Map<string, number[]>([['all', []]]);
  for (const b of builtBlocks(doc)) {
    const a = areaM2(b.ring);
    (out.get('all') as number[]).push(a);
    const t = b.district === undefined ? undefined : tpl.get(b.district);
    if (t !== undefined) {
      const k = `template-${t}`;
      const list = out.get(k);
      if (list === undefined) out.set(k, [a]);
      else list.push(a);
    }
  }
  return out;
}

/** Does a block touch the outline (a vertex of either within 1 cm of the other's edges)? */
export function touchesOutline(block: readonly XY[], outline: readonly XY[]): boolean {
  const a = toMetres(openRing(block));
  const o = toMetres(openRing(outline));
  const near = (p: Pt, ring: readonly Pt[]): boolean => {
    for (let i = 0; i < ring.length; i += 1) if (segmentDistance(p, ring[i], ring[(i + 1) % ring.length]) <= 0.01) return true;
    return false;
  };
  for (const p of a) if (near(p, o)) return true;
  for (const p of o) if (near(p, a)) return true;
  return false;
}

/**
 * Bounded built blocks per district and template (attachment A's `block.countTemplate`, on our side "the opened
 * district's blocks that do not touch its outline"): per template, the median count over the districts of that
 * template. Districts without a template are not counted.
 */
export function blockCountsByTemplate(doc: MetricDoc): Map<string, number[]> {
  const out = new Map<string, number[]>();
  const blocks = builtBlocks(doc);
  for (const d of doc.districts ?? []) {
    if (d.template === undefined) continue;
    let n = 0;
    for (const b of blocks) if (b.district === d.id && !touchesOutline(b.ring, d.ring)) n += 1;
    const k = `template-${d.template}`;
    const list = out.get(k);
    if (list === undefined) out.set(k, [n]);
    else list.push(n);
  }
  return out;
}

/**
 * The court share of deep blocks (§13.5's deep-block-interiors row: "over the blocks whose `Block.depthClass` is
 * `deep`, the share whose `interior` is `court`"); NaN with no deep built block.
 */
export function courtShare(blocks: readonly MetricBlock[]): number {
  let deep = 0;
  let court = 0;
  for (const b of blocks) {
    if (!isBuilt(b) || b.depthClass !== 'deep') continue;
    deep += 1;
    if (b.interior === 'court') court += 1;
  }
  return deep === 0 ? Number.NaN : court / deep;
}

/** The court share per band (the deep-interior rule's output per band, §4.6, §13.5); bands with no deep block absent. */
export function courtShareByBand(doc: MetricDoc): Map<string, number> {
  const byBand = new Map<string, MetricBlock[]>();
  for (const b of doc.blocks ?? []) {
    if (b.band === undefined) continue;
    const list = byBand.get(b.band);
    if (list === undefined) byBand.set(b.band, [b]);
    else list.push(b);
  }
  const out = new Map<string, number>();
  for (const [band, list] of byBand) {
    const s = courtShare(list);
    if (!Number.isNaN(s)) out.set(band, s);
  }
  return out;
}

/** The wall ring in metres (open), or null when the doc has no wall of three vertices. */
export function wallRing(doc: MetricDoc): Pt[] | null {
  if (doc.wall === undefined) return null;
  const r = toMetres(openRing(doc.wall));
  return r.length >= 3 ? r : null;
}

/** Built blocks per walled hectare (attachment A's `blockc.perHa` on our blocks: centroids inside the wall); NaN unwalled. */
export function blocksPerHa(doc: MetricDoc): number {
  const wall = wallRing(doc);
  if (wall === null || doc.wall === undefined) return Number.NaN;
  const ha = areaM2(doc.wall) / 1e4;
  if (!(ha > 0)) return Number.NaN;
  let n = 0;
  for (const b of builtBlocks(doc)) if (insideRing(centroidM(b.ring), wall)) n += 1;
  return n / ha;
}

/** A block's OBB major-axis direction (radians) by the kernel's `obb` (M0-a-10), or null for a degenerate ring. */
export function blockAxis(ring: readonly XY[]): number | null {
  const pts = openRing(ring).map((p) => ({ x: Math.round(p.x), y: Math.round(p.y) }) as LatticePoint);
  const r = obb(pts);
  if (!r.ok) return null;
  return Math.atan2(r.value.major.y, r.value.major.x);
}

/** At most this many sampled blocks per R4 radius (attachment A: "for up to 1 500 buildings sampled"). */
export const R4_SAMPLE_MAX = 1500;
/** A sample counts only with this many blocks within the radius (attachment A: "five or more"). */
export const R4_MIN_NEIGHBOURS = 5;

/**
 * Orientation coherence R4 within `radiusM` on block OBB axes (C-0018: R4 = |mean exp(4iθ)| of the orientations within
 * the radius — a proxy until plots, reported): for each sampled built block (all when ≤ 1 500, else the 1 500 with the
 * least H32 of `bldg.r4/<id>`, C-0180 (5)), the modulus of the mean of exp(4iθ) over the built blocks whose centroids lie
 * within the radius of its centroid (itself included), counted with ≥ 5 such blocks; the per-seed value is the median.
 */
export function r4Samples(doc: MetricDoc, radiusM: number): number[] {
  const items: { id: string; c: Pt; zx: number; zy: number }[] = [];
  for (const b of builtBlocks(doc)) {
    const th = blockAxis(b.ring);
    if (th === null) continue;
    items.push({ id: b.id, c: centroidM(b.ring), zx: Math.cos(4 * th), zy: Math.sin(4 * th) });
  }
  let sample = items;
  if (items.length > R4_SAMPLE_MAX) {
    sample = items
      .map((it) => ({ it, h: H32(`bldg.r4/${it.id}`) }))
      .sort((a, b) => a.h - b.h || (a.it.id < b.it.id ? -1 : a.it.id > b.it.id ? 1 : 0))
      .slice(0, R4_SAMPLE_MAX)
      .map((x) => x.it);
  }
  const out: number[] = [];
  for (const s of sample) {
    let n = 0;
    let sx = 0;
    let sy = 0;
    for (const o of items) {
      if (Math.hypot(o.c.x - s.c.x, o.c.y - s.c.y) <= radiusM) {
        n += 1;
        sx += o.zx;
        sy += o.zy;
      }
    }
    if (n >= R4_MIN_NEIGHBOURS) out.push(Math.hypot(sx, sy) / n);
  }
  return out;
}

/** The wall-alignment distance bands (attachment A's fields): [0, 40), [40, 100) and [100, 200) metres. */
export const WALL_BANDS: readonly { readonly field: string; readonly lo: number; readonly hi: number }[] = Object.freeze([
  { field: 'b0_40', lo: 0, hi: 40 },
  { field: 'b40_100', lo: 40, hi: 100 },
  { field: 'b100_200', lo: 100, hi: 200 },
]);

/**
 * Wall alignment by distance band on block OBB axes (C-0018's proxy of attachment A's `bldg.wallAlign.*`): for each
 * built block whose centroid lies inside the wall, its axis's angle to the nearest wall segment folded into [0°, 45°],
 * grouped by the centroid's distance to the wall. Null when unwalled.
 */
export function wallAlignment(doc: MetricDoc): Map<string, number[]> | null {
  const wall = wallRing(doc);
  if (wall === null) return null;
  const out = new Map<string, number[]>(WALL_BANDS.map((b) => [b.field, []]));
  for (const b of builtBlocks(doc)) {
    const c = centroidM(b.ring);
    if (!insideRing(c, wall)) continue;
    const th = blockAxis(b.ring);
    if (th === null) continue;
    const e = nearestEdge(c, wall);
    const band = WALL_BANDS.find((w) => e.dist >= w.lo && e.dist < w.hi);
    if (band === undefined) continue;
    (out.get(band.field) as number[]).push(foldDeg90(th, e.dir));
  }
  return out;
}
