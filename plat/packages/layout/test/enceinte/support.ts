// M0-c-02's test support: an indexed ground arena with its kernel per site, the slice's commits per seed (cached: one
// commit of the CITY fixture costs a few seconds), readers of the committed arena written from the arena's own tables
// (never through the code under test), the hand-built water face of C-0087's test, and small plane helpers.
import {
  attachIndex,
  createKernel,
  createPlat,
  dest,
  err,
  isHalfEdgeLive,
  isVertexLive,
  outgoing,
  rowKey,
  rowsOn,
  STAGES,
  type ChainRef,
  type Kernel,
  type KernelTx,
  type LatticePoint,
  type Plat,
  type PlatKey,
  type StageId,
} from '@plat/kernel';
import type { Lifecycle, WaterBody, WaterSet } from '@plat/model';
import { parseTable, tableView, type TableView } from '@plat/tables';
import { commitOuterRing, commitS3Slice, flatFixture, s3Slice, type CommitOptions, type CostField, type FlatFixtureOptions, type S3Commit, type S3Slice, type Site } from '../../src/index.js';

export const GROUND: PlatKey = { layer: 'ground', part: 0 };

/** A lattice point. */
export function P(x: number, y: number): LatticePoint {
  return { x, y } as LatticePoint;
}

/** An empty indexed ground arena over the site's frame and the kernel over it (no spine declares a width). */
export function kernelFor(site: Site): { plat: Plat; k: Kernel } {
  const plat = createPlat(GROUND, site.frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: () => null });
  return { plat, k };
}

/** A small flat site: a 4 km² frame (2 km square) with a 30 ha walled area (M0-c-01's small site). */
export function smallSite(seed: number, opts: FlatFixtureOptions = {}): Site {
  return flatFixture(seed, { frameAreaHa: 400, walledHa: 30, ...opts });
}

/** A committed slice: the site, the slice, the arena, the kernel and the commit. */
export interface Committed {
  site: Site;
  slice: S3Slice;
  plat: Plat;
  k: Kernel;
  commit: S3Commit;
}

/** The slice of `site` committed into a fresh arena; throws on a refusal. */
export function commitSite(site: Site, opts: CommitOptions = {}, prepare?: (k: Kernel) => void, sliceOpts: Parameters<typeof s3Slice>[1] = {}): Committed {
  const slice = s3Slice(site, sliceOpts);
  const { plat, k } = kernelFor(site);
  if (prepare !== undefined) prepare(k);
  const r = commitS3Slice(slice, k, opts);
  if (!r.ok) throw new Error(`support: the slice's commits were refused: ${r.code} ${r.detail}`);
  return { site, slice, plat, k, commit: r.value };
}

const CACHE = new Map<string, Committed>();

/** The CITY flat fixture's slice committed at `seed` (cached). */
export function cityCommitted(seed: number): Committed {
  const key = `city:${String(seed)}`;
  let c = CACHE.get(key);
  if (c === undefined) {
    c = commitSite(flatFixture(seed));
    CACHE.set(key, c);
  }
  return c;
}

/** The small flat site's slice committed at `seed` (cached). */
export function smallCommitted(seed: number): Committed {
  const key = `small:${String(seed)}`;
  let c = CACHE.get(key);
  if (c === undefined) {
    c = commitSite(smallSite(seed));
    CACHE.set(key, c);
  }
  return c;
}

// ---- readers of the committed arena (its own tables) ------------------------------------------------------------------

/** One live edge pair: its even half-edge, level, two end points and its rows by name. */
export interface EdgeInfo {
  h: number;
  level: number;
  a: LatticePoint;
  b: LatticePoint;
  rows: { role: string; entity: string; ordinal: number }[];
}

function pointOfV(p: Plat, v: number): LatticePoint {
  return P(p.vertices.x[v], p.vertices.y[v]);
}

/** Every live edge pair with its rows. */
export function edgesOf(p: Plat): EdgeInfo[] {
  const out: EdgeInfo[] = [];
  for (let h = 0; h < 2 * p.slots.pair.top; h += 2) {
    if (!isHalfEdgeLive(p, h)) continue;
    out.push({
      h,
      level: p.halfEdges.level[h >> 1],
      a: pointOfV(p, p.halfEdges.origin[h]),
      b: pointOfV(p, dest(p, h)),
      rows: rowsOn(p, 'edge', h).map((r) => rowKey(p, r)),
    });
  }
  return out;
}

/** The live edges carrying a row of `role` (on `entity` when given). */
export function edgesWith(p: Plat, role: string, entity?: string): EdgeInfo[] {
  return edgesOf(p).filter((e) => e.rows.some((r) => r.role === role && (entity === undefined || r.entity === entity)));
}

/** The live vertices carrying a row of `role` on `entity` (with `ordinal` when given), as points. */
export function verticesWith(p: Plat, role: string, entity: string, ordinal?: number): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (let v = 0; v < p.slots.vertex.top; v += 1) {
    if (!isVertexLive(p, v)) continue;
    if (rowsOn(p, 'vertex', v).map((r) => rowKey(p, r)).some((r) => r.role === role && r.entity === entity && (ordinal === undefined || r.ordinal === ordinal))) out.push(pointOfV(p, v));
  }
  return out;
}

/** The roles' rows on the edges meeting at the vertex at `at`. */
export function incidentRows(p: Plat, at: LatticePoint): { role: string; entity: string }[] {
  for (let v = 0; v < p.slots.vertex.top; v += 1) {
    if (!isVertexLive(p, v) || p.vertices.x[v] !== at.x || p.vertices.y[v] !== at.y) continue;
    return outgoing(p, v).flatMap((h) => rowsOn(p, 'edge', h).map((r) => rowKey(p, r)));
  }
  return [];
}

/**
 * The closed chain carrying `ref` as its vertices in walking order, read from the edge set alone (each vertex of the
 * set of degree 2): throws when the set is not one closed chain.
 */
export function closedChain(p: Plat, ref: ChainRef): LatticePoint[] {
  const es = edgesWith(p, ref.role, ref.entity);
  const key = (q: LatticePoint): string => `${String(q.x)},${String(q.y)}`;
  const adj = new Map<string, LatticePoint[]>();
  for (const e of es) {
    for (const [u, v] of [[e.a, e.b], [e.b, e.a]] as const) {
      const l = adj.get(key(u)) ?? [];
      l.push(v);
      adj.set(key(u), l);
    }
  }
  for (const [k, l] of adj) if (l.length !== 2) throw new Error(`support: ${ref.role}/${ref.entity} is not one closed chain at ${k} (degree ${String(l.length)})`);
  const start = es[0].a;
  const out: LatticePoint[] = [start];
  let prev = start;
  let cur = es[0].b;
  while (key(cur) !== key(start)) {
    out.push(cur);
    const nx = (adj.get(key(cur)) as LatticePoint[]).find((q) => key(q) !== key(prev)) as LatticePoint;
    prev = cur;
    cur = nx;
    if (out.length > es.length) throw new Error('support: the chain does not close');
  }
  if (out.length !== es.length) throw new Error(`support: ${ref.role}/${ref.entity} is more than one closed chain (${String(out.length)} of ${String(es.length)} edges walked)`);
  return out;
}

// ---- plane helpers (written here, independent of the code under test) --------------------------------------------------

/** Distance from p to segment ab. */
export function segDist(p: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  let t = l2 === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(a.x + t * dx - p.x, a.y + t * dy - p.y);
}

/** Distance from p to a closed ring's line. */
export function ringDist(p: { x: number; y: number }, ring: readonly { x: number; y: number }[]): number {
  let best = Infinity;
  for (let i = 0; i < ring.length; i += 1) best = Math.min(best, segDist(p, ring[i], ring[(i + 1) % ring.length]));
  return best;
}

/** The largest distance of a closed line from a ring, sampled every `step` cm along the line. */
export function maxDeparture(line: readonly { x: number; y: number }[], ring: readonly { x: number; y: number }[], step = 50): number {
  let worst = 0;
  for (let i = 0; i < line.length; i += 1) {
    const a = line[i];
    const b = line[(i + 1) % line.length];
    const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / step));
    for (let s = 0; s <= n; s += 1) worst = Math.max(worst, ringDist({ x: a.x + ((b.x - a.x) * s) / n, y: a.y + ((b.y - a.y) * s) / n }, ring));
  }
  return worst;
}

/** Even–odd containment (strict; on the ring counts as outside within 1e-9). */
export function insideRing(ring: readonly { x: number; y: number }[], q: { x: number; y: number }): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = ring[i];
    const b = ring[j];
    if (a.y > q.y !== b.y > q.y && q.x < ((b.x - a.x) * (q.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

/** Twice the signed area. */
export function area2(ring: readonly { x: number; y: number }[]): number {
  let s = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    s += a.x * b.y - b.x * a.y;
  }
  return s;
}

/** A closed ring of corners densified to vertices about `step` cm apart (corners kept), as lattice points. */
export function densify(corners: readonly (readonly [number, number])[], step = 1000): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (let i = 0; i < corners.length; i += 1) {
    const a = corners[i];
    const b = corners[(i + 1) % corners.length];
    const n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
    for (let s = 0; s < n; s += 1) out.push(P(Math.round(a[0] + ((b[0] - a[0]) * s) / n), Math.round(a[1] + ((b[1] - a[1]) * s) / n)));
  }
  return out;
}

// ---- C-0087's synthetic water face -------------------------------------------------------------------------------------

/** A river band from y0 to y1 between x0 and x1 (a closed ring, counter-clockwise). */
export function riverRing(x0: number, x1: number, y0: number, y1: number): LatticePoint[] {
  return [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
}

const GENERATED: Lifecycle = { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };

/** The water face hand-built through the façade on L0 (its shore and bank rows, the face owned by the body). */
export function handBuildWater(k: Kernel, ring: readonly LatticePoint[], id = 'river:1'): WaterSet {
  const spec: KernelTx = {
    key: GROUND,
    level: 0,
    ops: [],
    expect: [],
    onFail: 'reject',
    batch: { kind: 'stage', stage: STAGES.S1 as StageId },
    stage: STAGES.S1 as StageId,
    rederivesFrom: STAGES.S1 as StageId,
    workLimit: 10_000_000,
  };
  let cx = 0;
  let cy = 0;
  for (const q of ring) {
    cx += q.x;
    cy += q.y;
  }
  const inner = P(Math.round(cx / ring.length), Math.round(cy / ring.length));
  const r = k.tx(spec, (o) => {
    const a = k.geom.insertChain(o, ring, [{ role: 'shore', entity: id }, { role: 'bank', entity: id }], 'mandatory', { closed: true });
    if (!a.ok) return err(a.code, a.detail);
    const loc = k.geom.pointLocate(GROUND, 0, inner);
    if (loc.on !== 'face') throw new Error('support: no water face');
    return k.geom.setOwner(o, [loc.face], id);
  });
  if (!r.ok) throw new Error(`support: the water batch was refused: ${r.code} ${r.detail}`);
  const body: WaterBody = { id, kind: 'river', face: { owner: id, level: 0 }, shore: { role: 'shore', entity: id }, lifecycle: GENERATED } as WaterBody;
  return { bodies: [body], bridges: [] };
}

/** The flat fixture with a river band through the town at x 300–340 m and a deck at y 0 (C-0087's test site). */
export const RIVER = riverRing(30000, 34000, -200000, 200000);
export const RIVER_DECK = { id: 'bridge:1', a: P(30000, 0), b: P(34000, 0) };

/** The river site's slice committed (cached per seed): the outer ring, the hand-built water, then the slice's commits. */
export function riverCommitted(seed: number, costField?: CostField, tag = ''): Committed & { water: WaterSet } {
  const key = `river:${String(seed)}:${tag}`;
  let c = CACHE.get(key) as (Committed & { water: WaterSet }) | undefined;
  if (c === undefined) {
    const site = flatFixture(seed, { water: { faces: [RIVER], decks: [RIVER_DECK] } });
    const slice = s3Slice(site);
    const { plat, k } = kernelFor(site);
    const m = commitOuterRing(site, k);
    if (!m.ok) throw new Error('support: the outer ring was refused');
    const water = handBuildWater(k, RIVER);
    const r = commitS3Slice(slice, k, { outerRing: 'present', water, ...(costField === undefined ? {} : { costField }) });
    if (!r.ok) throw new Error(`support: the river slice's commits were refused: ${r.code} ${r.detail}`);
    c = { site, slice, plat, k, commit: r.value, water };
    CACHE.set(key, c);
  }
  return c;
}

/** A TableView whose walls table has one cell's value replaced (the strategy reads its cells; nothing is inlined). */
export function wallsWith(row: string, cell: string, value: number, base: TableView = tableView()): TableView {
  const t = base.table('walls');
  const rows: Record<string, Record<string, unknown>> = {};
  for (const [rk, cells] of t.rows) {
    const r: Record<string, unknown> = {};
    for (const [ck, c] of cells) r[ck] = { ...c, ...(rk === row && ck === cell ? { value } : {}) };
    rows[rk] = r;
  }
  const walls = parseTable('walls', { table: 'walls', version: t.version, section: t.section, rows });
  return {
    hash: base.hash,
    version: (id) => base.version(id),
    get: (id, key) => (id === 'walls' ? walls.rows.get(key) : base.get(id, key)),
    rows: (id) => (id === 'walls' ? walls.rows : base.rows(id)),
    slice: (id, kind, key) => base.slice(id, kind, key),
    table: (id) => (id === 'walls' ? walls : base.table(id)),
  };
}
