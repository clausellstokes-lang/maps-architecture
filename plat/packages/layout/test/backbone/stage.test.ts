// M0-c-03: S4 as a declared-form Stage (§4.1 *Registration and order*: "declared for S3, S4, …"; §4.1's S4 row; §14
// `Stage`; §4.12 `NetworkStrategy`; §6.3: the town its lineage unit; C-0236 (14), (15)) — its declaration, its input,
// its one L1 batch of independent insertChain ops (the same arena whatever order they are handed in), and the base
// NetworkStrategy's S4 part.
import { describe, expect, it } from 'vitest';
import { STAGES, type Kernel, type KernelTx } from '@plat/kernel';
import { baseNetwork, commitS3Slice, createRegistry, NETWORK_STRATEGY_ID, register, runS4, s3Slice, s4Stage, siteContext, type PipelineStage } from '../../src/index.js';
import { edgesWith, kernelFor, smallSite, verticesWith } from './support.js';

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
