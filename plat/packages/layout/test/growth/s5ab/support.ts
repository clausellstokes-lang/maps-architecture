// M0-c-04's test support: S3's commits, S4 and S5a / S5b on a site (cached per seed: a CITY run costs ~10 s), readers
// of the committed arena written from the arena's own tables (never through the code under test), and plane helpers
// written here, independent of the code under test.
import { attachIndex, createKernel, createPlat, dest, isHalfEdgeLive, isVertexLive, rowKey, rowsOn, type Kernel, type LatticePoint, type Plat, type PlatKey } from '@plat/kernel';
import { parseTable, tableView, type TableView } from '@plat/tables';
import { commitS3Slice, flatFixture, runS4, s3Slice, type FlatFixtureOptions, type S3Commit, type S3Slice, type S4Output, type Site, type SliceOptions } from '../../../src/index.js';
import { runS5ab, type GrowthState } from '../../../src/growth/mainRoads.js';

export const GROUND: PlatKey = { layer: 'ground', part: 0 };

export function P(x: number, y: number): LatticePoint {
  return { x, y } as LatticePoint;
}

/** An empty indexed ground arena over the site's frame and the kernel over it. */
export function kernelFor(site: Site): { plat: Plat; k: Kernel } {
  const plat = createPlat(GROUND, site.frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: () => null });
  return { plat, k };
}

/** S3 and S4 on a site, before S5. */
export interface Base {
  site: Site;
  slice: S3Slice;
  plat: Plat;
  k: Kernel;
  commit: S3Commit;
  s4: S4Output;
}

/** S3's commits then S4 on `site`; throws on a refusal. */
export function baseRun(site: Site, slice: SliceOptions = {}): Base {
  const s = s3Slice(site, slice);
  const { plat, k } = kernelFor(site);
  const c = commitS3Slice(s, k);
  if (!c.ok) throw new Error(`support: S3's commits were refused: ${c.code} ${c.detail}`);
  const r = runS4({ slice: s, commit: c.value, kernel: k });
  if (!r.ok) throw new Error(`support: S4 was refused: ${r.code} ${r.detail}`);
  return { site, slice: s, plat, k, commit: c.value, s4: r.value };
}

/** A base run with S5a / S5b over every stage. */
export interface Grown extends Base {
  growth: GrowthState;
}

/** S3, S4 and S5a / S5b on `site`; throws on a refusal. */
export function grow(site: Site): Grown {
  const b = baseRun(site);
  const g = runS5ab({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k });
  if (!g.ok) throw new Error(`support: S5a / S5b were refused: ${g.code} ${g.detail}`);
  return { ...b, growth: g.value };
}

const CACHE = new Map<string, Grown>();

/** The CITY flat fixture grown through S5a / S5b at `seed` (cached). */
export function cityGrown(seed: number, opts: FlatFixtureOptions = {}): Grown {
  const key = `${String(seed)}:${JSON.stringify(opts)}`;
  let r = CACHE.get(key);
  if (r === undefined) {
    r = grow(flatFixture(seed, opts));
    CACHE.set(key, r);
  }
  return r;
}

/** A TableView whose regimes table has one cell's value replaced (S5b reads its cells; nothing is inlined). */
export function regimesWith(row: string, cell: string, value: number, base: TableView = tableView()): TableView {
  const t = base.table('regimes');
  const rows: Record<string, Record<string, unknown>> = {};
  for (const [rk, cells] of t.rows) {
    const r: Record<string, unknown> = {};
    for (const [ck, c] of cells) r[ck] = { ...c, ...(rk === row && ck === cell ? { value } : {}) };
    rows[rk] = r;
  }
  const regimes = parseTable('regimes', { table: 'regimes', version: t.version, section: t.section, rows });
  return {
    hash: base.hash,
    version: (id) => base.version(id),
    get: (id, key) => (id === 'regimes' ? regimes.rows.get(key) : base.get(id, key)),
    rows: (id) => (id === 'regimes' ? regimes.rows : base.rows(id)),
    slice: (id, kind, key) => base.slice(id, kind, key),
    table: (id) => (id === 'regimes' ? regimes : base.table(id)),
  };
}

// ---- readers of the committed arena (its own tables) ------------------------------------------------------------------

/** The live vertices carrying a row of `role` on `entity`. */
export function verticesWith(p: Plat, role: string, entity: string): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (let v = 0; v < p.slots.vertex.top; v += 1) {
    if (!isVertexLive(p, v)) continue;
    if (rowsOn(p, 'vertex', v).map((r) => rowKey(p, r)).some((r) => r.role === role && r.entity === entity)) out.push(P(p.vertices.x[v], p.vertices.y[v]));
  }
  return out;
}

/** Each entity's edges carrying a row of `role`, read from the arena's edge rows. */
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

// ---- plane helpers (written here) --------------------------------------------------------------------------------------

export function segDist(p: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  let t = l2 === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(a.x + t * dx - p.x, a.y + t * dy - p.y);
}

/** The distance of p from a closed ring's line. */
export function ringDist(p: { x: number; y: number }, ring: readonly { x: number; y: number }[]): number {
  let d = Infinity;
  for (let i = 0; i < ring.length; i += 1) d = Math.min(d, segDist(p, ring[i], ring[(i + 1) % ring.length]));
  return d;
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

/** Where the open segments ab and cd cross (parameters on each), or null; endpoints included. */
export function cross(a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }, d: { x: number; y: number }): { x: number; y: number } | null {
  const rx = b.x - a.x;
  const ry = b.y - a.y;
  const sx = d.x - c.x;
  const sy = d.y - c.y;
  const den = rx * sy - ry * sx;
  if (den === 0) return null;
  const t = ((c.x - a.x) * sy - (c.y - a.y) * sx) / den;
  const u = ((c.x - a.x) * ry - (c.y - a.y) * rx) / den;
  if (t < 0 || t > 1 || u < 0 || u > 1) return null;
  return { x: a.x + t * rx, y: a.y + t * ry };
}

/** Every point where a set of segments meets a closed ring (deduplicated within 1 cm). */
export function meetings(segs: readonly [{ x: number; y: number }, { x: number; y: number }][], ring: readonly { x: number; y: number }[]): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  for (const [a, b] of segs) {
    for (let i = 0; i < ring.length; i += 1) {
      const x = cross(a, b, ring[i], ring[(i + 1) % ring.length]);
      if (x === null) continue;
      if (!out.some((q) => Math.hypot(q.x - x.x, q.y - x.y) < 1)) out.push(x);
    }
  }
  return out;
}

/** The length of a set of segments inside a closed ring (cm), by 1 m samples. */
export function lengthInside(segs: readonly [{ x: number; y: number }, { x: number; y: number }][], ring: readonly { x: number; y: number }[]): number {
  let len = 0;
  for (const [a, b] of segs) {
    const l = Math.hypot(b.x - a.x, b.y - a.y);
    const n = Math.max(1, Math.ceil(l / 100));
    for (let i = 0; i < n; i += 1) {
      const t = (i + 0.5) / n;
      if (insideRing(ring, { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) })) len += l / n;
    }
  }
  return len;
}

export function area(ring: readonly { x: number; y: number }[]): number {
  let s = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    s += a.x * b.y - b.x * a.y;
  }
  return Math.abs(s) / 2;
}
