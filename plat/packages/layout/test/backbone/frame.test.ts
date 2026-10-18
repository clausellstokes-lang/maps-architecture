// M0-c-03: S4 on the base chain's small river town, where the frame cuts the band of crossing sites (N-54 (2), C-0289:
// the lattice reads only the decks whose two ends lie inside the frame; C-0297: the deck given up is re-solved around;
// C-0304: a part the F-ROUTE ladder leaves unserved is counted, and a deck's crossing run holds only its wet edges). The
// chain is M0-x-04's base registration through the runner — S1, S3 and S4 as registered, S5 kept in its rank but idle
// (S3 commits stage 1's trace in S5's batch), nothing after — on M0-x-06's small river frame (CITY, 30 ha at aspect 1,
// 6 ha walled, the river from the west, no mouth; restated here, the testkit's `SMALL_RIVER`, since this package's tests
// cannot import the testkit). The registered seeds:
//   * 3535584350: `gate:0/out`'s S3 course crosses `bridge:2`, whose approach cannot meet through's radius, and the
//     band holds no other site in the frame (the band's only other sites lie beyond it, cut from S4's graph). The
//     ladder re-solves round the given-up site: the outward road reaches the frame dry — served, `another_site` held
//     with `to` null, roads leaving the walled stage = N.
//   * 1192931101: `bridge:0` lies beyond the frame and is no deck of S4's graph; the ladder never fires and every route
//     part is laid with no span.
//   * 3207739920: `gate:1/out` is left unserved by rule — its course's `bridge:1` is given up, the band holds another
//     site but no usable course, the extra bridge is M1's, and no path is left — and S4's `report.unserved` lists it
//     (the run's one place that does: a counted outcome, never silent); roads leaving the walled stage = 2N − 1.
//   * 3418200249: `gate:0/out` spans `bridge:1` as committed — 11 points, the span after the third — so the deck's
//     crossing run holds only its wet edges (`RouteGraph.deckOf`; a dry edge along the deck folded in drops a point).
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

  it("3207739920: gate:1/out's site given up, the band's other site unusable, no path — unserved by rule, and S4's report lists it", () => {
    const { slice, s4 } = throughS4(3207739920);
    const frame = slice.site.frameRing;
    for (const d of slice.lattice.costs.water.decks) expect(insideRing(frame, d.a, true) && insideRing(frame, d.b, true), d.id).toBe(true);
    expect(slice.gates).toHaveLength(2);
    // The ladder's three rungs, in order, each labelled: the band was not empty ('no usable site', then 'no path').
    expect(s4.report.rungs).toEqual([
      { route: 'gate:1/out', rung: 'another_site', from: 'bridge:1', to: null, held: false, why: 'no usable site in the band' },
      { route: 'gate:1/out', rung: 'extra_bridge', held: false, why: 'notBuilt(M1)' },
      { route: 'gate:1/out', rung: 'unserved', held: true, why: 'no path' },
    ]);
    // The part the rule leaves unserved is counted in S4's report, and no route stands for it.
    expect(s4.report.unserved).toEqual(['gate:1/out']);
    expect(s4.routes.map((r) => r.id).sort()).toEqual(['gate:0/in', 'gate:0/out', 'gate:1/in']);
    expect(s4.routes.find((r) => r.id === 'gate:0/out')?.points.at(-1)?.pin).toBe('frame');
    expect(s4.network.ways).toHaveLength(2 * slice.gates.length - 1);
    for (const b of s4.bridges) expect(b.state, b.id).toBe('site');
  });

  it("3418200249: gate:0/out spans bridge:1 on the deck's wet edges only — 11 points, the span after the third", () => {
    const { slice, s4 } = throughS4(3418200249);
    expect(slice.lattice.costs.water.decks.map((d) => d.id)).toEqual(['bridge:1']);
    expect(s4.report.rungs).toEqual([]);
    expect(s4.report.unserved).toEqual([]);
    const out = s4.routes.find((r) => r.id === 'gate:0/out');
    expect(out?.points).toHaveLength(11);
    expect(out?.spans).toEqual([{ at: 3, bridge: 'bridge:1' }]);
    expect(out?.points.at(-1)?.pin).toBe('frame');
    expect(s4.routes.map((r) => [r.id, r.points.length, r.spans.length])).toEqual([
      ['gate:0/in', 6, 0],
      ['gate:0/out', 11, 1],
      ['gate:1/in', 6, 0],
      ['gate:1/out', 10, 0],
    ]);
    expect(s4.network.ways).toHaveLength(2 * slice.gates.length);
    expect(s4.bridges.map((b) => [b.id, b.state])).toEqual([
      ['bridge:0', 'site'],
      ['bridge:1', 'built'],
      ['bridge:2', 'site'],
      ['bridge:3', 'site'],
    ]);
  });
});
