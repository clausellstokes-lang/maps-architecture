// M0-c-03 session round S1 (Q24; N-54 (2), C-0289, C-0297): S4 on the base chain's small river town, the seeds whose S4 output
// M0-c-01's frame-honest lattice moved (C-0289's stated shift). The chain is M0-x-04's base registration through the
// runner — S1, S3 and S4 as registered, S5 kept in its rank but idle (S3 commits stage 1's trace in S5's batch), nothing
// after — on M0-x-06's small river frame (CITY, 30 ha at aspect 1, 6 ha walled, the river from the west, no mouth;
// restated here, the testkit's `SMALL_RIVER`, since this package's tests cannot import the testkit).
//   * 3535584350: `gate:0/out`'s S3 course crosses `bridge:2`, whose approach cannot meet through's radius, and the
//     band holds no other site in the frame (the band's only other sites lie beyond it, cut from S4's graph). The
//     ladder re-solves round the given-up site: the outward road reaches the frame dry — served, `another_site` held
//     with `to` null, roads leaving the walled stage = N (C-0289's round had left it `unserved`, 'approach').
//   * 1192931101: the beyond-frame `bridge:0` is no longer in S4's graph; the ladder never fires and every route part
//     is laid with no span.
import { describe, expect, it } from 'vitest';
import { STAGES, ok, type KernelResult } from '@plat/kernel';
import { baseArena, createRegistry, insideRing, registerBase, run, type BaseBlueprint, type PipelineStage, type S3Slice, type S4Output } from '../../src/index.js';

const SMALL_RIVER: BaseBlueprint = Object.freeze({
  size: Object.freeze({ rung: 'CITY', aspect: 1, areaHa: 30 }),
  site: Object.freeze({ relief: 'plain' as const, river: Object.freeze({ inflowBearingCdeg: 27_000, mouth: 'none' as const }) }),
  terrain: 'base',
  walledHa: 6,
}) as BaseBlueprint;

/** The base chain through S4 at `seed` (S5 idle, later stages dropped): the slice and S4's output. */
function throughS4(seed: number): { slice: S3Slice; s4: S4Output } {
  const registry = createRegistry();
  registerBase(registry);
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('no base product');
  const kept: PipelineStage[] = [];
  for (const s of product.stages) {
    if ((s.id as number) <= STAGES.S4) kept.push(s);
    else if ((s.id as number) === STAGES.S5) kept.push(Object.freeze({ ...s, run: (): KernelResult<Record<string, unknown>> => ok({}) }) as PipelineStage);
  }
  product.stages.length = 0;
  product.stages.push(...kept);
  const { model } = run(registry, { ...SMALL_RIVER, seed }, { kind: 'all' }, { arenas: () => [baseArena(SMALL_RIVER)] });
  const slice = model.data.get('s3.slice') as S3Slice | undefined;
  const s4 = model.data.get('s4') as S4Output | undefined;
  if (slice === undefined || s4 === undefined) throw new Error(`seed ${String(seed)}: the chain wrote no S3 slice or no S4 output`);
  return { slice, s4 };
}

describe('S4 on the small river town where the frame cuts the band (Q24; N-54 (2), C-0289)', { timeout: 120_000 }, () => {
  it("3535584350: gate:0/out's site given up with no other site in the band — re-solved round it, served dry to the frame", () => {
    const { slice, s4 } = throughS4(3535584350);
    const frame = slice.site.frameRing;
    // The precondition: S4's graph holds only decks inside the frame, and the band of bridge:2 holds none of them.
    for (const d of slice.lattice.costs.water.decks) expect(insideRing(frame, d.a, true) && insideRing(frame, d.b, true), d.id).toBe(true);
    expect(s4.report.rungs).toEqual([{ route: 'gate:0/out', rung: 'another_site', from: 'bridge:2', to: null, held: true }]);
    expect(s4.report.unserved).toEqual([]);
    // Roads leaving the walled stage = N: an inward and an outward part per gate, the outward one ending at the frame.
    expect(s4.routes.map((r) => r.id).sort()).toEqual(slice.gates.flatMap((g) => [`gate:${String(g.ordinal)}/in`, `gate:${String(g.ordinal)}/out`]).sort());
    const out = s4.routes.find((r) => r.id === 'gate:0/out');
    expect(out?.spans).toEqual([]);
    expect(out?.points.at(-1)?.pin).toBe('frame');
    expect(s4.network.ways).toHaveLength(2 * slice.gates.length);
    for (const b of s4.bridges) expect(b.state, b.id).toBe('site');
  });

  it('1192931101: no deck beyond the frame in the graph; the ladder never fires and every part is laid with no span', () => {
    const { slice, s4 } = throughS4(1192931101);
    const frame = slice.site.frameRing;
    for (const d of slice.lattice.costs.water.decks) expect(insideRing(frame, d.a, true) && insideRing(frame, d.b, true), d.id).toBe(true);
    expect(slice.lattice.costs.water.decks.map((d) => d.id)).not.toContain('bridge:0');
    expect(s4.report.rungs).toEqual([]);
    expect(s4.report.unserved).toEqual([]);
    expect(s4.routes.map((r) => [r.id, r.spans.length])).toEqual([
      ['gate:0/in', 0],
      ['gate:0/out', 0],
      ['gate:1/in', 0],
      ['gate:1/out', 0],
    ]);
    for (const r of s4.routes.filter((q) => q.part === 'outward')) expect(r.points.at(-1)?.pin, r.id).toBe('frame');
  });
});
