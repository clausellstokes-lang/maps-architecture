// M0-c-03: S4 as a declared-form Stage (§4.1 *Registration and order*: "declared for S3, S4, …"; §4.1's S4 row; §14
// `Stage`; §4.12 `NetworkStrategy`; §6.3: the town its lineage unit; C-0236 (14), (15)) — its declaration, its input,
// its one L1 batch of independent insertChain ops (the same arena whatever order they are handed in), and the base
// NetworkStrategy's S4 part.
import { describe, expect, it } from 'vitest';
import { STAGES, type Kernel, type KernelTx } from '@plat/kernel';
import { baseNetwork, commitS3Slice, createRegistry, NETWORK_STRATEGY_ID, register, routeGraph, routesFromSlice, runS4, s3Slice, s4Stage, siteContext, type PipelineStage } from '../../src/index.js';
import { heightsOf, onGateSide } from '../../src/backbone/stage.js';
import type { RoutePoint } from '../../src/backbone/types.js';
import { edgesWith, kernelFor, P, smallSite, verticesWith } from './support.js';

describe('S4 as a Stage (§4.1, §14)', () => {
  it('declares id S4, the declared op form, F-ROUTE its ladder, the town its lineage unit, route.nodes among its laws', () => {
    const s = s4Stage();
    expect(s.id).toBe(STAGES.S4);
    expect(s.txForm).toBe('declared');
    expect(s.lineageUnit).toBe('town');
    expect(s.lazy).toBe(false);
    expect(s.ladder).toEqual([{ failureClass: 'F-ROUTE', rungs: ['another_site', 'extra_bridge', 'slope', 'unserved'] }]);
    expect(s.workLimits.map((l) => l.counter)).toContain('route.nodes');
    expect(s.batch).toEqual({ kind: 'stage', stage: STAGES.S4 });
    // It registers in the pipeline's registry by its declared I/O.
    const reg = createRegistry();
    register(reg, s as unknown as PipelineStage);
    expect(reg.products.get('base')?.stages.map((x) => x.id)).toEqual([STAGES.S4]);
  });

  it('reads its input from the model record and refuses one without the slice, the commits or the façade', () => {
    const s = s4Stage();
    expect(() => s.inputsOf({} as never, { kind: 'all' })).toThrow(TypeError);
    expect(() => s.inputsOf(null as never, { kind: 'all' })).toThrow(TypeError);
    const fake = { slice: {}, commit: {}, kernel: {} };
    expect(s.inputsOf(fake as never, { kind: 'all' })).toBe(fake);
  });

  it('commits one declared L1 batch of insertChain ops, independent: handed in reverse they make the same arena', { timeout: 60_000 }, () => {
    const runWith = (reverse: boolean): { edges: string[]; spec: KernelTx | null } => {
      const site = smallSite(5);
      const slice = s3Slice(site);
      const { plat, k } = kernelFor(site);
      const c = commitS3Slice(slice, k);
      if (!c.ok) throw new Error('S3 refused');
      let spec: KernelTx | null = null;
      const proxy: Kernel = {
        ...k,
        tx: ((t: KernelTx, fn?: never) => {
          if (t.stage === STAGES.S4) {
            spec = t;
            expect(fn).toBeUndefined();
            return k.tx(reverse ? { ...t, ops: t.ops.slice().reverse() } : t);
          }
          return k.tx(t, fn);
        }) as Kernel['tx'],
      };
      const r = runS4({ slice, commit: c.value, kernel: proxy });
      if (!r.ok) throw new Error(`S4 refused: ${r.detail}`);
      const edges = edgesWith(plat, 'way')
        .map((e) => `${String(e.a.x)},${String(e.a.y)}>${String(e.b.x)},${String(e.b.y)}:${e.rows.map((x) => `${x.role}/${x.entity}`).join()}`)
        .sort();
      const knots = verticesWith(plat, 'width_knot', 'way:0').length + verticesWith(plat, 'junction', 'junction:0').length;
      return { edges: [...edges, String(knots)], spec };
    };
    const a = runWith(false);
    const b = runWith(true);
    const spec = a.spec as KernelTx | null;
    expect(spec).not.toBeNull();
    if (spec === null) return;
    expect(spec.level).toBe(1);
    expect(spec.ops.length).toBeGreaterThan(1);
    for (const op of spec.ops) expect(op.kind).toBe('insertChain');
    expect(b.edges).toEqual(a.edges);
  });
});

describe('the base NetworkStrategy, its S4 part (§4.12)', () => {
  it('grows stage 1 as runS4 does; refuses a later stage (S5b, M0-c-04) and a run without the slice', { timeout: 60_000 }, () => {
    expect(NETWORK_STRATEGY_ID).toBe('base');
    const site = smallSite(2);
    const slice = s3Slice(site);
    const { k } = kernelFor(site);
    const c = commitS3Slice(slice, k);
    if (!c.ok) throw new Error('S3 refused');
    const water = { bodies: [], bridges: [] };
    const ctx = siteContext(site) as never;
    const later = baseNetwork.grow(site, slice.destinations, site.terrain, water, [c.value.enceinte], null, 2, ctx, k, { slice, commit: c.value });
    expect(later.ok).toBe(false);
    const bare = baseNetwork.grow(site, slice.destinations, site.terrain, water, [c.value.enceinte], null, 1, ctx, k);
    expect(bare.ok).toBe(false);
    const grown = baseNetwork.grow(site, slice.destinations, site.terrain, water, [c.value.enceinte], null, 1, ctx, k, { slice, commit: c.value });
    expect(grown.ok).toBe(true);
    if (grown.ok) {
      expect(grown.value.network.ways.length).toBe(2 * slice.gates.length);
      expect(grown.value.routes.length).toBe(2 * slice.gates.length);
    }
  });
});

// The report's off-gate count (C-0236 (9); the hardening note 1): the parts whose course meets the wall off their gate,
// counted for the inward and the outward parts alike. Its positive control: the committed wall scaled about its centre —
// by 1.02 every gate lies inside it, so every outward part's first segment meets it off its gate; by 0.98 every gate lies
// outside it, so every inward part's last one does.
describe("routesFromSlice's off-gate count (C-0236 (9))", () => {
  it('counts each outward part that meets the wall off its gate, and each inward one', { timeout: 60_000 }, () => {
    const site = smallSite(5);
    const slice = s3Slice(site);
    const { k } = kernelFor(site);
    const c = commitS3Slice(slice, k);
    if (!c.ok) throw new Error('S3 refused');
    const rg = routeGraph(slice.lattice, heightsOf(site, slice.lattice.points));
    const line = c.value.traced.line;
    const cx = line.reduce((a, p) => a + p.x, 0) / line.length;
    const cy = line.reduce((a, p) => a + p.y, 0) / line.length;
    const scaled = (f: number): typeof c.value => ({ ...c.value, traced: { ...c.value.traced, line: line.map((p) => ({ x: Math.round(cx + (p.x - cx) * f), y: Math.round(cy + (p.y - cy) * f) }) as typeof p) } });
    const ids = (part: 'in' | 'out'): string[] => c.value.gates.filter((g) => g.kind === 'main').map((g) => `${g.id}/${part}`).sort();
    expect(routesFromSlice(slice, c.value, rg).wallCrossings).toEqual([]);
    expect(routesFromSlice(slice, scaled(1.02), rg).wallCrossings.slice().sort()).toEqual(ids('out'));
    expect(routesFromSlice(slice, scaled(0.98), rg).wallCrossings.slice().sort()).toEqual(ids('in'));
  });
});

// The gate-side hold (c-03 S3, Q52 A; its guard c-03 S4, the closing check of S3's B-N1 and B-N2): the unpinned points
// next to the gate beyond the wall are dropped and the gate joined to the first point on its side — only where that
// segment meets the wall at the gate alone and keeps attractCm (26 cm) clear of it beyond the gate; else the part is
// returned as given.
describe("onGateSide's hold and its guard (c-03 S3, S4)", () => {
  const at = (x: number, y: number): RoutePoint => ({ at: P(x, y) });
  const attach = (x: number, y: number): RoutePoint => ({ at: P(x, y), pin: 'attach', pinId: 'plaza:0', pinOrdinal: 0 });
  const gate = (x: number, y: number): RoutePoint => ({ at: P(x, y), pin: 'gate', pinId: 'gate:0' });
  const keys = (pts: readonly RoutePoint[]): string[] => pts.map((p) => `${String(p.at.x)},${String(p.at.y)}`);
  const SQUARE = [P(0, 0), P(10_000, 0), P(10_000, 10_000), P(0, 10_000)];

  it('drops the point beyond the wall and joins the gate to the first point inside when that join keeps clear', () => {
    const pts = [attach(5000, 5000), at(6000, 5000), at(8000, 5000), at(10_050, 5000), gate(10_000, 5000)];
    expect(keys(onGateSide(pts, [], SQUARE, true).points)).toEqual(['5000,5000', '6000,5000', '8000,5000', '10000,5000']);
    // The outward part alike, from its first point.
    const out = [gate(10_000, 5000), at(9950, 5000), at(12_000, 5000), { at: P(15_000, 5000), pin: 'frame' as const }];
    expect(keys(onGateSide(out, [], SQUARE, false).points)).toEqual(['10000,5000', '12000,5000', '15000,5000']);
  });

  it('keeps the part as given when the join meets the wall elsewhere (a dent between the gate and the point)', () => {
    // The wall dented at x 9000–10000, y 6000–7000: the join from the gate to (9500, 8000) runs through the dent.
    const dented = [P(0, 0), P(10_000, 0), P(10_000, 6000), P(9000, 6000), P(9000, 7000), P(10_000, 7000), P(10_000, 10_000), P(0, 10_000)];
    const pts = [attach(5000, 5000), at(9500, 8000), at(10_100, 5100), gate(10_000, 5000)];
    expect(keys(onGateSide(pts, [], dented, true).points)).toEqual(keys(pts));
  });

  it('keeps the part as given when the join passes a wall vertex within attractCm (the insertion would lay it on the wall)', () => {
    // The wall's side from the gate (10000, 5000) to (5000, 5100), then up: the join to (1000, 5170) passes (5000, 5100)
    // 5.6 cm inside it, without meeting the wall but at the gate.
    const bent = [P(0, 0), P(10_000, 0), P(10_000, 5000), P(5000, 5100), P(0, 10_000)];
    const pts = [attach(2000, 2000), at(1000, 5170), at(9000, 5100), gate(10_000, 5000)];
    expect(keys(onGateSide(pts, [], bent, true).points)).toEqual(keys(pts));
    // 30 cm inside it, the join keeps clear and the hold drops the point beyond the wall.
    const clear = [attach(2000, 2000), at(1000, 5115), at(9000, 5100), gate(10_000, 5000)];
    expect(keys(onGateSide(clear, [], bent, true).points)).toEqual(['2000,2000', '1000,5115', '10000,5000']);
  });

  it("keeps the part as given when the join's far end lies within attractCm of a wall side", () => {
    const pts = [attach(5000, 5000), at(9000, 9985), at(10_100, 5000), gate(10_000, 5000)];
    expect(keys(onGateSide(pts, [], SQUARE, true).points)).toEqual(keys(pts));
  });
});
