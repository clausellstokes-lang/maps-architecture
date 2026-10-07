// M0-c-05's test support: hand-built arenas and growth areas for S5c's unit tests (an arterial across an empty frame,
// walled or unwalled), the S3 → S4 → S5 run on the flat fixture (cached per seed and options), readers of the arena's
// own tables (never through the code under test) and plane helpers written here.
import { attachIndex, createKernel, createPlat, dest, isHalfEdgeLive, rowKey, rowsOn, type Kernel, type LatticePoint, type Plat, type PlatKey, type Stream } from '@plat/kernel';
import { tableView } from '@plat/tables';
import { commitS3Slice, flatFixture, runS4, s3Slice, type FlatFixtureOptions, type S3Commit, type S3Slice, type S4Output, type Site } from '../../../src/index.js';
import { growthRules, growthStageLineage, type GrowthArea, type GrowthRuleOptions, type GrowthSeed } from '../../../src/growth/proposals.js';
import { runS5, type S5Options, type S5Run } from '../../../src/growth/capacity.js';
import type { Feature } from '../../../src/growth/legality.js';

export const GROUND: PlatKey = { layer: 'ground', part: 0 };

export function P(x: number, y: number): LatticePoint {
  return { x, y } as LatticePoint;
}

/** A scripted stream: `normal()` and `float01()` return the given values in turn (then repeat the last). */
export function scripted(normals: readonly number[], uniforms: readonly number[] = [0.5]): Stream {
  let i = 0;
  let j = 0;
  const s = {
    normal: () => normals[Math.min(i++, normals.length - 1)],
    float01: () => uniforms[Math.min(j++, uniforms.length - 1)],
  };
  return s as unknown as Stream;
}

/** An indexed ground arena over a square frame of `sideCm`, its outer ring at L0, and its kernel. */
export function squareArena(sideCm = 200_000): { plat: Plat; k: Kernel } {
  const frame = { widthCm: sideCm, heightCm: sideCm, aspect: 1, marginShare: 0.3 } as never;
  const plat = createPlat(GROUND, frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: () => null });
  const h = sideCm / 2;
  const ring = [P(-h, -h), P(h, -h), P(h, h), P(-h, h)];
  const r = k.tx({ key: GROUND, level: 0, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: 1 as never }, stage: 1 as never, rederivesFrom: 1 as never, workLimit: 10_000_000 }, (o) =>
    k.geom.insertChain(o, ring, [{ role: 'margin', entity: 'terrain:t' }], 'mandatory', { closed: true }),
  );
  if (!r.ok) throw new Error(`squareArena: ${r.code} ${r.detail}`);
  return { plat, k };
}

/** An L1 chain on `role`/`entity` (a way, a setback line). */
export function lay(k: Kernel, pts: readonly LatticePoint[], role: string, entity: string, closed = false): void {
  const r = k.tx({ key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: 4 as never }, stage: 4 as never, rederivesFrom: 4 as never, workLimit: 10_000_000 }, (o) =>
    k.geom.insertChain(o, pts, [{ role: role as never, entity }], 'mandatory', { closed }),
  );
  if (!r.ok) throw new Error(`lay: ${r.code} ${r.detail}`);
}

export function segs(pts: readonly LatticePoint[], closed = false): [LatticePoint, LatticePoint][] {
  const out: [LatticePoint, LatticePoint][] = [];
  for (let i = 0; i + 1 < pts.length; i += 1) out.push([pts[i], pts[i + 1]]);
  if (closed) out.push([pts[pts.length - 1], pts[0]]);
  return out;
}

/** A hand-built area: an arterial `way:0` (primary) along y = 0 from −half to +half, seeded every `spacing` from its start. */
export interface HandCase {
  plat: Plat;
  k: Kernel;
  area: GrowthArea;
}

/** A seed on a hand-laid arterial: its lattice point and the direction of the arterial's segment there. */
export interface HandSeed {
  at: LatticePoint;
  along: { x: number; y: number };
}

/**
 * An arterial bending steadily left by `degPerSeg` degrees at each vertex, `segCm` long per segment (lattice-rounded
 * vertices on the arc), its middle segment centred on the origin along +x, `count` segments; and the points every
 * `spacingCm` of arc length along it (offset half a segment, so never at a vertex) inside |x|, |y| ≤ `withinCm`.
 */
export function bentArterial(segCm: number, degPerSeg: number, count: number, spacingCm: number, withinCm: number): { road: LatticePoint[]; seeds: HandSeed[] } {
  const turn = (degPerSeg * Math.PI) / 180;
  const mid = Math.floor(count / 2);
  // Vertex i at heading (i − mid − ½) · turn from the middle segment's; the middle segment's midpoint at the origin.
  const raw: { x: number; y: number }[] = [{ x: 0, y: 0 }];
  for (let i = 0; i < count; i += 1) {
    const h = (i - mid) * turn;
    const last = raw[raw.length - 1];
    raw.push({ x: last.x + segCm * Math.cos(h), y: last.y + segCm * Math.sin(h) });
  }
  const m0 = raw[mid];
  const m1 = raw[mid + 1];
  const c = { x: (m0.x + m1.x) / 2, y: (m0.y + m1.y) / 2 };
  const road = raw.map((q) => P(Math.round(q.x - c.x), Math.round(q.y - c.y)));
  const seeds: HandSeed[] = [];
  for (let s = segCm / 2; ; s += spacingCm) {
    const i = Math.floor(s / segCm);
    if (i >= count) break;
    const a = road[i];
    const b = road[i + 1];
    const t = (s - i * segCm) / segCm;
    const at = P(Math.round(a.x + t * (b.x - a.x)), Math.round(a.y + t * (b.y - a.y)));
    if (Math.abs(at.x) > withinCm || Math.abs(at.y) > withinCm) continue;
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    seeds.push({ at, along: { x: (b.x - a.x) / len, y: (b.y - a.y) / len } });
  }
  return { road, seeds };
}

/**
 * A square arena with a `primary` way:0 (straight along the x axis, or the polyline `road`) and a closed region around it: walled (a `band`
 * square at ±`reachCm`, laid as a setback line) for `dense_core`, unwalled (a `boundary` square) for `ribbon`.
 */
export function handCase(
  regime: 'dense_core' | 'ribbon',
  opts: GrowthRuleOptions & { reachCm?: number; seeds?: number[]; extraFeatures?: Feature[]; landHa?: number; road?: readonly LatticePoint[]; seedsAlong?: readonly HandSeed[] } = {},
): HandCase {
  const { plat, k } = squareArena();
  const reach = opts.reachCm ?? 40_000;
  const road = opts.road ?? [P(-reach - 20_000, 0), P(reach + 20_000, 0)];
  lay(k, road, 'way', 'way:0');
  const square = [P(-reach, -reach), P(reach, -reach), P(reach, reach), P(-reach, reach)];
  const features: Feature[] = [];
  for (const [a, b] of segs(road)) features.push({ a, b, kind: 'way', way: 'way:0', cls: 'primary' });
  if (regime === 'dense_core') {
    lay(k, square, 'setback', 'enceinte:1', true);
    for (const [a, b] of segs(square, true)) features.push({ a, b, kind: 'band' });
  } else for (const [a, b] of segs(square, true)) features.push({ a, b, kind: 'boundary' });
  features.push(...(opts.extraFeatures ?? []));
  const rules = growthRules(tableView(), regime, 'CITY', opts);
  // The sides alternate along the arterial, as growthArea's seeds do (C-0254 (3)): left, right, left, …
  const seeds: GrowthSeed[] =
    opts.seedsAlong !== undefined
      ? opts.seedsAlong.map((q, i) => ({ at: q.at, way: 'way:0', along: q.along, side: i % 2 === 0 ? 1 : -1 }))
      : (opts.seeds ?? [-20_000, 0, 20_000]).map((x, i) => ({ at: P(x, 0), way: 'way:0', along: { x: 1, y: 0 }, side: i % 2 === 0 ? 1 : -1 }));
  const area: GrowthArea = {
    k: 1,
    key: GROUND,
    rules,
    features,
    junctions: [],
    seeds,
    landHa: opts.landHa ?? 64,
    maxSegments: 60,
    firstWay: 1,
    firstJunction: 0,
    unit: growthStageLineage(GROUND, 1),
    reroll: 0,
  };
  return { plat, k, area };
}

// ---- the flat fixture --------------------------------------------------------------------------------------------------

/** S3 and S4 on a site. */
export interface Base {
  site: Site;
  slice: S3Slice;
  plat: Plat;
  k: Kernel;
  commit: S3Commit;
  s4: S4Output;
}

export function baseRun(site: Site): Base {
  const slice = s3Slice(site);
  const plat = createPlat(GROUND, site.frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: () => null });
  const c = commitS3Slice(slice, k);
  if (!c.ok) throw new Error(`support: S3's commits were refused: ${c.code} ${c.detail}`);
  const r = runS4({ slice, commit: c.value, kernel: k });
  if (!r.ok) throw new Error(`support: S4 was refused: ${r.code} ${r.detail}`);
  return { site, slice, plat, k, commit: c.value, s4: r.value };
}

/** A base run with all of S5. */
export interface Grown extends Base {
  run: S5Run;
}

export function grownRun(site: Site, opts: S5Options = {}): Grown {
  const b = baseRun(site);
  const g = runS5({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k }, opts);
  if (!g.ok) throw new Error(`support: S5 was refused: ${g.code} ${g.detail}`);
  return { ...b, run: g.value };
}

const CACHE = new Map<string, Grown>();

/** The flat fixture at `seed` (with `fx`) through S5 (cached). */
export function fixtureGrown(seed: number, fx: FlatFixtureOptions = {}): Grown {
  const key = `${String(seed)}:${JSON.stringify(fx)}`;
  let g = CACHE.get(key);
  if (g === undefined) {
    g = grownRun(flatFixture(seed, fx));
    CACHE.set(key, g);
  }
  return g;
}

/** The small fixture: 400 ha frame, 60 ha walled (fast). */
export const SMALL: FlatFixtureOptions = { frameAreaHa: 400, walledHa: 60 };

// ---- readers of the arena (its own tables) ------------------------------------------------------------------------------

/** Each entity's live edges carrying a row of `role`, from the arena's edge rows. */
export function roleEdges(p: Plat, role: string): Map<string, [LatticePoint, LatticePoint][]> {
  const out = new Map<string, [LatticePoint, LatticePoint][]>();
  for (let h = 0; h < 2 * p.slots.pair.top; h += 2) {
    if (!isHalfEdgeLive(p, h)) continue;
    for (const r of rowsOn(p, 'edge', h).map((x) => rowKey(p, x))) {
      if (r.role !== role) continue;
      const a = p.halfEdges.origin[h];
      const b = dest(p, h);
      const l = out.get(r.entity) ?? [];
      l.push([P(p.vertices.x[a], p.vertices.y[a]), P(p.vertices.x[b], p.vertices.y[b])]);
      out.set(r.entity, l);
    }
  }
  return out;
}

// ---- plane helpers (written here) ----------------------------------------------------------------------------------------

export function segDist(p: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  let t = l2 === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(a.x + t * dx - p.x, a.y + t * dy - p.y);
}

/** Do the closed segments ab and cd properly cross (interiors)? */
export function properCross(a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }, d: { x: number; y: number }): boolean {
  const o = (p: { x: number; y: number }, q: { x: number; y: number }, r: { x: number; y: number }): number => Math.sign((q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x));
  return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0;
}

/** The unsigned angle between two lines, degrees in [0, 90]. */
export function lineAngleDeg(u: { x: number; y: number }, v: { x: number; y: number }): number {
  const c = Math.abs(u.x * v.y - u.y * v.x);
  const d = Math.abs(u.x * v.x + u.y * v.y);
  return (Math.atan2(c, d) * 180) / Math.PI;
}

export function insideRing(ring: readonly { x: number; y: number }[], q: { x: number; y: number }): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = ring[i];
    const b = ring[j];
    if (a.y > q.y !== b.y > q.y && q.x < ((b.x - a.x) * (q.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

export function polyLength(pts: readonly { x: number; y: number }[]): number {
  let s = 0;
  for (let i = 1; i < pts.length; i += 1) s += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  return s;
}
