// M0-c-03's test support: S4 run on the committed S3 slice per seed (cached: a CITY commit costs a few seconds), the
// hand-built river with a crossing site (C-0076's test site: an L0 water face whose two deck ends are `deck_end`
// vertices, the Bridge a `site`), readers of the committed arena written from the arena's own tables (never through
// the code under test), and small plane helpers written here.
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
  type Kernel,
  type KernelTx,
  type LatticePoint,
  type Plat,
  type PlatKey,
  type StageId,
} from '@plat/kernel';
import type { Bridge, Cm, Lifecycle, WaterBody, WaterSet } from '@plat/model';
import { tableView, parseTable, type TableView } from '@plat/tables';
import { commitOuterRing, commitS3Slice, flatFixture, runS4, s3Slice, type S3Commit, type S3Slice, type S4Options, type S4Output, type Site, type SliceOptions, type WaterPlan } from '../../src/index.js';

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

/** A run: the site, the slice, the arena, the kernel, the S3 commit and S4's output. */
export interface Run {
  site: Site;
  slice: S3Slice;
  plat: Plat;
  k: Kernel;
  commit: S3Commit;
  s4: S4Output;
  water: WaterSet;
}

/** S3's commits then S4 on `site`; throws on a refusal. `prepare` lays L0 water before S3 (the outer ring then present). */
export function runSite(site: Site, opts: { prepare?: (k: Kernel) => WaterSet; slice?: SliceOptions; s4?: S4Options } = {}): Run {
  const slice = s3Slice(site, opts.slice ?? {});
  const { plat, k } = kernelFor(site);
  let water: WaterSet = { bodies: [], bridges: [] };
  if (opts.prepare !== undefined) {
    const m = commitOuterRing(site, k);
    if (!m.ok) throw new Error('support: the outer ring was refused');
    water = opts.prepare(k);
  }
  const c = commitS3Slice(slice, k, opts.prepare === undefined ? {} : { outerRing: 'present', water });
  if (!c.ok) throw new Error(`support: S3's commits were refused: ${c.code} ${c.detail}`);
  const r = runS4({ slice, commit: c.value, water, kernel: k }, opts.s4 ?? {});
  if (!r.ok) throw new Error(`support: S4 was refused: ${r.code} ${r.detail}`);
  return { site, slice, plat, k, commit: c.value, s4: r.value, water };
}

const CACHE = new Map<string, Run>();

/** The CITY flat fixture run at `seed` (cached). */
export function cityRun(seed: number): Run {
  const key = `city:${String(seed)}`;
  let r = CACHE.get(key);
  if (r === undefined) {
    r = runSite(flatFixture(seed));
    CACHE.set(key, r);
  }
  return r;
}

/** A small flat site: a 4 km² frame with a 30 ha walled area. */
export function smallSite(seed: number, water?: WaterPlan, tables?: TableView): Site {
  return flatFixture(seed, { frameAreaHa: 400, walledHa: 30, ...(water === undefined ? {} : { water }), ...(tables === undefined ? {} : { tables }) });
}

// ---- readers of the committed arena (its own tables) ------------------------------------------------------------------

export interface EdgeInfo {
  h: number;
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
    out.push({ h, a: pointOfV(p, p.halfEdges.origin[h]), b: pointOfV(p, dest(p, h)), rows: rowsOn(p, 'edge', h).map((r) => rowKey(p, r)) });
  }
  return out;
}

/** The live edges carrying a row of `role` (on `entity` when given). */
export function edgesWith(p: Plat, role: string, entity?: string): EdgeInfo[] {
  return edgesOf(p).filter((e) => e.rows.some((r) => r.role === role && (entity === undefined || r.entity === entity)));
}

/** Each way's edges by its entity, read from the edges' `way` rows. */
export function wayEdges(p: Plat): Map<string, [LatticePoint, LatticePoint][]> {
  const out = new Map<string, [LatticePoint, LatticePoint][]>();
  for (const e of edgesOf(p)) {
    for (const r of e.rows) {
      if (r.role !== 'way') continue;
      const l = out.get(r.entity) ?? [];
      l.push([e.a, e.b]);
      out.set(r.entity, l);
    }
  }
  return out;
}

/** The live vertices carrying a row of `role` on `entity` (with `ordinal` when given). */
export function verticesWith(p: Plat, role: string, entity: string, ordinal?: number): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (let v = 0; v < p.slots.vertex.top; v += 1) {
    if (!isVertexLive(p, v)) continue;
    if (rowsOn(p, 'vertex', v).map((r) => rowKey(p, r)).some((r) => r.role === role && r.entity === entity && (ordinal === undefined || r.ordinal === ordinal))) out.push(pointOfV(p, v));
  }
  return out;
}

/** The vertex rows of the vertex at `at` (empty when no live vertex stands there). */
export function vertexRows(p: Plat, at: LatticePoint): { role: string; entity: string; ordinal: number }[] {
  for (let v = 0; v < p.slots.vertex.top; v += 1) {
    if (!isVertexLive(p, v) || p.vertices.x[v] !== at.x || p.vertices.y[v] !== at.y) continue;
    return rowsOn(p, 'vertex', v).map((r) => rowKey(p, r));
  }
  return [];
}

/** The rows on the edges meeting at the vertex at `at`, one list per edge. */
export function incidentEdgeRows(p: Plat, at: LatticePoint): { role: string; entity: string }[][] {
  for (let v = 0; v < p.slots.vertex.top; v += 1) {
    if (!isVertexLive(p, v) || p.vertices.x[v] !== at.x || p.vertices.y[v] !== at.y) continue;
    return outgoing(p, v).map((h) => rowsOn(p, 'edge', h).map((r) => rowKey(p, r)));
  }
  return [];
}

/** A way's edges walked into one polyline from its first end (throws when they are not one open path). */
export function wayLine(edges: readonly [LatticePoint, LatticePoint][]): LatticePoint[] {
  const key = (q: LatticePoint): string => `${String(q.x)},${String(q.y)}`;
  const adj = new Map<string, LatticePoint[]>();
  for (const [a, b] of edges) {
    for (const [u, v] of [
      [a, b],
      [b, a],
    ] as const) {
      const l = adj.get(key(u)) ?? [];
      l.push(v);
      adj.set(key(u), l);
    }
  }
  const ends = [...adj.entries()].filter(([, l]) => l.length === 1);
  if (ends.length !== 2) throw new Error(`support: a way is not one open path (${String(ends.length)} ends)`);
  for (const [, l] of adj) if (l.length > 2) throw new Error('support: a way branches');
  const [sx, sy] = ends[0][0].split(',').map(Number);
  const out: LatticePoint[] = [P(sx, sy)];
  let prev: LatticePoint | null = null;
  let cur = out[0];
  for (;;) {
    const nx = (adj.get(key(cur)) as LatticePoint[]).find((q) => prev === null || key(q) !== key(prev));
    if (nx === undefined) break;
    out.push(nx);
    prev = cur;
    cur = nx;
    if (out.length > edges.length + 1) throw new Error('support: a way does not end');
  }
  return out;
}

// ---- plane helpers (written here, independent of the code under test) --------------------------------------------------

export function segDist(p: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  let t = l2 === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(a.x + t * dx - p.x, a.y + t * dy - p.y);
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

/** Do the open segments ab and cd cross or touch (by orientation, exact on integers)? */
export function segsMeet(a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }, d: { x: number; y: number }): boolean {
  const o = (p: { x: number; y: number }, q: { x: number; y: number }, r: { x: number; y: number }): number => Math.sign((q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x));
  const on = (p: { x: number; y: number }, q: { x: number; y: number }, r: { x: number; y: number }): boolean => Math.min(p.x, q.x) <= r.x && r.x <= Math.max(p.x, q.x) && Math.min(p.y, q.y) <= r.y && r.y <= Math.max(p.y, q.y);
  const o1 = o(a, b, c);
  const o2 = o(a, b, d);
  const o3 = o(c, d, a);
  const o4 = o(c, d, b);
  if (o1 !== o2 && o3 !== o4) return true;
  return (o1 === 0 && on(a, b, c)) || (o2 === 0 && on(a, b, d)) || (o3 === 0 && on(c, d, a)) || (o4 === 0 && on(c, d, b));
}

/** The angle (degrees, [0, 180]) between two directions. */
export function angleDeg(u: { x: number; y: number }, v: { x: number; y: number }): number {
  return (Math.abs(Math.atan2(u.x * v.y - u.y * v.x, u.x * v.x + u.y * v.y)) * 180) / Math.PI;
}

// ---- C-0076's hand-built river with a crossing site ------------------------------------------------------------------------

const GENERATED: Lifecycle = { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };

/** A river band from x0 to x1 over y0 … y1 (counter-clockwise ring). */
export function riverRing(x0: number, x1: number, y0: number, y1: number): LatticePoint[] {
  return [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
}

/** A crossing site: its id and two deck ends on the river's two banks. */
export interface Site0 {
  id: string;
  a: LatticePoint;
  b: LatticePoint;
}

/**
 * The river hand-built on L0 through the façade: its ring as one closed chain carrying `shore` and `bank`, each site's
 * two deck ends inserted on it as vertices carrying ('deck_end', site, 0 | 1) and pinned, the water face owned by the
 * body; the WaterSet with each site a `Bridge` in state `site`.
 */
export function handBuildRiver(k: Kernel, ring: readonly LatticePoint[], sites: readonly Site0[], id = 'river:1'): WaterSet {
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
  // The ring with every deck end inserted on the side it lies on.
  const pts: LatticePoint[] = [];
  const knots: { index: number; role: string; ordinal: number; entity: string }[] = [];
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    pts.push(a);
    const on: { t: number; p: LatticePoint; site: string; ordinal: number }[] = [];
    for (const s of sites) {
      for (const [p, ordinal] of [
        [s.a, 0],
        [s.b, 1],
      ] as const) {
        if (segDist(p, a, b) > 0.5 || (p.x === a.x && p.y === a.y) || (p.x === b.x && p.y === b.y)) continue;
        const t = Math.hypot(p.x - a.x, p.y - a.y);
        on.push({ t, p, site: s.id, ordinal });
      }
    }
    on.sort((u, v) => u.t - v.t);
    for (const o of on) {
      knots.push({ index: pts.length, role: 'deck_end', ordinal: o.ordinal, entity: o.site });
      pts.push(o.p);
    }
  }
  let cx = 0;
  for (const q of ring) cx += q.x;
  const inner = P(Math.round(cx / ring.length), Math.round((ring[0].y + ring[2].y) / 2));
  const r = k.tx(spec, (o) => {
    const ins = k.geom.insertChain(o, pts, [{ role: 'shore', entity: id }, { role: 'bank', entity: id }], 'mandatory', { closed: true, knots, pinned: knots.map((x) => x.index) });
    if (!ins.ok) return err(ins.code, ins.detail);
    const loc = k.geom.pointLocate(GROUND, 0, inner);
    if (loc.on !== 'face') throw new Error('support: no water face');
    const own = k.geom.setOwner(o, [loc.face], id);
    if (!own.ok) return own;
    return k.geom.pinVertices(
      o,
      sites.flatMap((s) => [
        { role: 'deck_end', entity: s.id, ordinal: 0 },
        { role: 'deck_end', entity: s.id, ordinal: 1 },
      ]),
    );
  });
  if (!r.ok) throw new Error(`support: the river batch was refused: ${r.code} ${r.detail}`);
  const body: WaterBody = { id, kind: 'river', face: { owner: id, level: 0 }, shore: { role: 'shore', entity: id }, lifecycle: GENERATED } as WaterBody;
  const bridges: Bridge[] = sites.map((s) => ({
    id: s.id,
    state: 'site',
    way: null,
    deck: [
      { role: 'deck_end', entity: s.id, ordinal: 0 },
      { role: 'deck_end', entity: s.id, ordinal: 1 },
    ],
    over: 'river',
    spanCm: Math.round(Math.hypot(s.b.x - s.a.x, s.b.y - s.a.y)) as Cm,
    lifecycle: GENERATED,
  }));
  return { bodies: [body], bridges };
}

/** A TableView whose `ways` table has one cell's value replaced (S4 reads its cells; nothing is inlined). */
export function waysWith(row: string, cell: string, value: unknown, base: TableView = tableView()): TableView {
  const t = base.table('ways');
  const rows: Record<string, Record<string, unknown>> = {};
  for (const [rk, cells] of t.rows) {
    const r: Record<string, unknown> = {};
    for (const [ck, c] of cells) r[ck] = { ...c, ...(rk === row && ck === cell ? { value } : {}) };
    rows[rk] = r;
  }
  const ways = parseTable('ways', { table: 'ways', version: t.version, section: t.section, rows });
  return {
    hash: base.hash,
    version: (id) => base.version(id),
    get: (id, key) => (id === 'ways' ? ways.rows.get(key) : base.get(id, key)),
    rows: (id) => (id === 'ways' ? ways.rows : base.rows(id)),
    slice: (id, kind, key) => base.slice(id, kind, key),
    table: (id) => (id === 'ways' ? ways : base.table(id)),
  };
}
