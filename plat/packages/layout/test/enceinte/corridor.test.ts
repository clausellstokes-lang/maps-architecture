// M0-c-02, the corridor-depth rule (C-0311; N-56 (3)): a strip's face is taken only outside every way's corridor —
// "outside" up to N-43 B's fidelity bound at the corridor's edge (`CORRIDOR_SLACK_CM`, ≈ 73.5 cm). The registered case is
// SMALL_FLAT seed 3443032966's stage-2 strips (lawful input): their inner faces hold (-11376, -2963), a vertex of stage
// 2's trace (shared with enceinte:1's outer setback line) 14.5 cm inside gate:3's corridor, onto which the insertion
// attracted the cap's end (-11378, -2978), and (-11291, -1574), enceinte:1's outer setback vertex 6.1 cm inside it —
// both within the bound. A face crossing a corridor — holding a gate's vertex, or a vertex deeper than the bound — is
// no strip, and a side left with none is refused with the barring vertex and its cause named.
import { describe, expect, it } from 'vitest';
import { STAGES, type Kernel, type KernelResult, type LatticePoint, type StageId } from '@plat/kernel';
import type { Enceinte, Scope } from '@plat/model';
import type { Row } from '@plat/tables';
import { baseArena, commitOuterRing, createRegistry, layStrips, registerBase, run, runBase, type BaseBlueprint, type ModelView, type PipelineContext, type PipelineStage, type StripStop } from '../../src/index.js';
import { CORRIDOR_SLACK_CM } from '../../src/enceinte/strips.js';
import { coveredCorridorPoints, depthOf, GROUND, kernelFor, P, smallSite, untypedStripPoints, type EnceinteRef, type SliceRoutes } from './support.js';

/** The S5-rank L1 batch the trace and strips are laid in (C-0226 (2)). */
const L1_S5 = { key: GROUND, level: 1 as const, ops: [], expect: [], onFail: 'reject' as const, batch: { kind: 'stage' as const, stage: STAGES.S5 as StageId }, stage: STAGES.S5 as StageId, rederivesFrom: STAGES.S5 as StageId, workLimit: 10_000_000 };

/** A hand-laid enceinte: its trace a closed L1 wall chain through `ring` (no gate rows: the stops are given). */
function handTrace(ring: readonly LatticePoint[]): { k: Kernel; enceinte: Enceinte; row: Row } {
  const site = smallSite(2);
  const { k } = kernelFor(site);
  expect(commitOuterRing(site, k).ok).toBe(true);
  const laid = k.tx(L1_S5, (o) => k.geom.insertChain(o, ring, [{ role: 'wall', entity: 'enceinte:1' }], 'mandatory', { closed: true }));
  expect(laid.ok).toBe(true);
  const enceinte = { id: 'enceinte:1', trace: { role: 'wall', entity: 'enceinte:1' }, gates: [], stage: 1 } as unknown as Enceinte;
  return { k, enceinte, row: site.tables.table('walls').row('era.default') };
}

/** The faces an owner holds at L1, as rings. */
function owned(k: Kernel, owner: string): LatticePoint[][] {
  const v = k.view(GROUND, 1);
  return v.faces().filter((f) => v.owner(f) === owner).map((f) => v.rings(f)[0]);
}

/** A 400 m square trace whose west side carries the gate at (-20000, 0) and a vertex `dipCm` inside its corridor's north edge. */
function dipped(dipCm: number): LatticePoint[] {
  return [P(-20000, -20000), P(20000, -20000), P(20000, 20000), P(-20000, 20000), P(-20000, 700 - dipCm), P(-20000, 0)];
}

/** The west gate's way along the trace's normal, 7 m half-width (CITY's `through`, C-0226 (10)). */
const WEST_WAY: StripStop = { kind: 'way', gate: 'gate:0', at: P(-20000, 0), path: [P(-11000, 0), P(-20000, 0), P(-29000, 0)], halfWidthCm: 700 };

describe('the corridor clause up to the fidelity bound (N-56 (3) Q22; C-0311)', () => {
  it('the slack is N-43 B\'s fidelity bound, 2·√2·attractCm', () => {
    expect(CORRIDOR_SLACK_CM).toBeCloseTo(73.539, 3);
  });

  it('a cap attracted onto a trace vertex 15 cm inside the corridor: the strips commit, each side\'s face holding that vertex typed wall_strip', () => {
    const { k, enceinte, row } = handTrace(dipped(15));
    const r = layStrips(enceinte, row, k, { stops: [WEST_WAY] });
    // The vertex lies 15 cm inside the corridor, within the fidelity bound (C-0311): each side's face is the strip's.
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    if (!r.ok) return;
    expect(r.value.faces).toEqual({ inner: 1, outer: 1 });
    for (const side of ['inner', 'outer'] as const) {
      const rings = owned(k, `wall_strip:1-${side}`);
      expect(rings).toHaveLength(1);
      // The barring vertex of the old clause is the face's: the cap's end was attracted onto it.
      expect(rings[0].some((q) => q.x === -20000 && q.y === 685)).toBe(true);
      // No vertex of the strip stands deeper in the corridor than the bound; none is the gate's.
      for (const q of rings[0]) {
        expect(q.x === -20000 && q.y === 0).toBe(false);
        if (Math.abs(q.y) < 700 && q.x <= -11000 && q.x >= -29000) expect(700 - Math.abs(q.y)).toBeLessThanOrEqual(CORRIDOR_SLACK_CM);
      }
    }
  }, 60_000);

  it('a vertex deeper in the corridor than the bound is no cap\'s: the cap closes on the corridor\'s edge and the strips commit beside it', () => {
    const { k, enceinte, row } = handTrace(dipped(100));
    const r = layStrips(enceinte, row, k, { stops: [WEST_WAY] });
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    if (!r.ok) return;
    expect(r.value.faces).toEqual({ inner: 1, outer: 1 });
    for (const side of ['inner', 'outer'] as const) {
      const rings = owned(k, `wall_strip:1-${side}`);
      expect(rings).toHaveLength(1);
      expect(rings[0].some((q) => q.x === -20000 && q.y === 600)).toBe(false);
      expect(rings[0].some((q) => q.x === -20000 && q.y === 700)).toBe(true);
    }
  }, 60_000);

  it('a face beyond the setback line is no strip however near the trace its vertices stand (RQ5, by area): the town inside a closed inner setback stays untyped', () => {
    const { k, enceinte, row } = handTrace([P(-20000, -20000), P(20000, -20000), P(20000, 20000), P(-20000, 20000)]);
    const r = layStrips(enceinte, row, k, { stops: [] });
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    if (!r.ok) return;
    expect(r.value.faces.inner).toBe(1);
    const v = k.view(GROUND, 1);
    const loc = k.geom.pointLocate(GROUND, 1, P(0, 0));
    expect(loc.on).toBe('face');
    if (loc.on !== 'face') return;
    expect(v.owner(loc.face)).toBeNull();
    // Its every vertex is the inner strip's width from the trace (the setback's corners), within the width clause.
    expect(v.rings(loc.face).flat().every((q) => Math.abs(Math.abs(q.x) - 19200) < 2 && Math.abs(Math.abs(q.y) - 19200) < 2)).toBe(true);
  }, 60_000);

  it('a way run along the trace (RQ5): the strips stop at its corridor along its whole length — the corridor\'s own face, holding the gate\'s vertex, is no strip\'s, and the strips on either side of it commit', () => {
    const { k, enceinte, row } = handTrace([P(-20000, -20000), P(20000, -20000), P(20000, 20000), P(-20000, 20000), P(-20000, 0)]);
    const along: StripStop = { kind: 'way', gate: 'gate:0', at: P(-20000, 0), path: [P(-20000, -3000), P(-20000, 0), P(-20000, 3000)], halfWidthCm: 700 };
    const r = layStrips(enceinte, row, k, { stops: [along] });
    // Refused before the round: "the inner side: vertex (-20000, 0) is gate:0's gate vertex (the face crosses its corridor)".
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    const corridor = [P(-20700, -3000), P(-19300, -3000), P(-19300, 3000), P(-20700, 3000)];
    for (const side of ['inner', 'outer'] as const) {
      const rings = owned(k, `wall_strip:1-${side}`);
      expect(rings.length).toBeGreaterThanOrEqual(1);
      for (const ring of rings) {
        // No strip vertex is the gate's or deeper than the slack inside the corridor; no strip side runs through it.
        for (const q of ring) {
          expect(q.x === -20000 && q.y === 0).toBe(false);
          expect(depthOf(q, q, corridor)).toBeLessThanOrEqual(CORRIDOR_SLACK_CM);
        }
        for (let i = 0; i < ring.length; i += 1) expect(depthOf(ring[i], ring[(i + 1) % ring.length], corridor, 10)).toBeLessThanOrEqual(CORRIDOR_SLACK_CM);
      }
    }
  }, 60_000);

  it('a way along the trace 110 cm wide, off the trace\'s vertices (N-22 (b) under RQ5): the face that held a vertex 110 cm in is cut along the corridor\'s edge, the strips commit beside it', () => {
    const { k, enceinte, row } = handTrace(dipped(15));
    const along: StripStop = { kind: 'way', gate: 'gate:0', at: P(-20000, 5), path: [P(-20000, -3000), P(-20000, 5), P(-20000, 3000)], halfWidthCm: 110 };
    const r = layStrips(enceinte, row, k, { stops: [along] });
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    const corridor = [P(-20110, -3000), P(-19890, -3000), P(-19890, 3000), P(-20110, 3000)];
    for (const side of ['inner', 'outer'] as const) {
      for (const ring of owned(k, `wall_strip:1-${side}`)) {
        for (const q of ring) expect(depthOf(q, q, corridor)).toBeLessThanOrEqual(CORRIDOR_SLACK_CM);
        for (let i = 0; i < ring.length; i += 1) expect(depthOf(ring[i], ring[(i + 1) % ring.length], corridor, 10)).toBeLessThanOrEqual(CORRIDOR_SLACK_CM);
      }
    }
    // The setback chains follow the corridor's edge: a setback vertex on each of its long sides.
    const setback = k.resolve({ role: 'setback', entity: 'enceinte:1' }, GROUND);
    expect(setback.view).toBe('edges');
  }, 60_000);

  it('a gate whose way runs inward only (N-23): the outer side\'s one face holds the gate\'s vertex, so the outer side is refused, named, nothing written', () => {
    const { k, enceinte, row } = handTrace([P(-20000, -20000), P(20000, -20000), P(20000, 0), P(20000, 20000), P(-20000, 20000), P(-20000, 0)]);
    // The west gate's way ends flat on the trace at the gate: its corridor cuts the inner line, not the glacis line; the
    // east gate's way crosses the trace and cuts both, so the outer side's one face runs round from it past the west gate.
    const inward: StripStop = { kind: 'way', gate: 'gate:0', at: P(-20000, 0), path: [P(-20000, 0), P(-11000, 0)], halfWidthCm: 700 };
    const east: StripStop = { kind: 'way', gate: 'gate:1', at: P(20000, 0), path: [P(11000, 0), P(20000, 0), P(29000, 0)], halfWidthCm: 700 };
    const r = layStrips(enceinte, row, k, { stops: [inward, east] });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toBe("layStrips: a side's lines closed no strip face — the outer side: vertex (-20000, 0) is gate:0's gate vertex (the face crosses its corridor)");
    const v = k.view(GROUND, 1);
    expect(v.faces().filter((f) => (v.owner(f) ?? '').startsWith('wall_strip'))).toEqual([]);
  }, 60_000);

  it('a probe meeting open ground beyond the strip\'s width (N-24): the glacis line cut away by the frame on the west and no border laid, the outer side\'s one face is the open ground — refused, named', () => {
    const { k, enceinte, row } = handTrace(dipped(15));
    // The frame 5 m beyond the trace's west side (the glacis line, 15 m out, cut there); the map border not in the arena.
    const frame = [P(-20500, -30000), P(30000, -30000), P(30000, 30000), P(-20500, 30000)];
    const r = layStrips(enceinte, row, k, { stops: [WEST_WAY], frame });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toMatch(/^layStrips: a side's lines closed no strip face — the outer side: vertex \(-?\d+, -?\d+\) lies \d+ cm from the trace, beyond the strip's 1500 cm$/);
  }, 60_000);
});

/** SMALL_FLAT (M0-x-06's edge frame, C-0273 (4)): CITY, 30 ha at aspect 1, 6 ha walled, flat, no river. */
const SMALL_FLAT: BaseBlueprint = { size: { rung: 'CITY', aspect: 1, areaHa: 30 }, site: { relief: 'plain', river: null }, terrain: 'flat', walledHa: 6 } as BaseBlueprint;

/** The base registered through S5 (S6 and S8 dropped) and run at `seed` on SMALL_FLAT, with S5's refusal (code and detail). */
function throughS5(seed: number): ReturnType<typeof run> & { refusal: { code: string; detail: string } | null } {
  const registry = createRegistry();
  registerBase(registry);
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('no base product');
  let refusal: { code: string; detail: string } | null = null;
  const kept = product.stages
    .filter((s) => (s.id as number) <= (STAGES.S5 as number))
    .map((s) =>
      (s.id as number) !== (STAGES.S5 as number)
        ? s
        : (Object.freeze({
            ...s,
            inputsOf: (model: ModelView, scope: Scope): unknown => s.inputsOf(model, scope),
            run: (input: unknown, ctx: PipelineContext): KernelResult<unknown> => {
              const r = s.run(input, ctx);
              if (!r.ok) refusal = { code: r.code, detail: r.detail };
              return r;
            },
          }) as PipelineStage),
    );
  product.stages.length = 0;
  product.stages.push(...kept);
  const out = run(registry, { ...SMALL_FLAT, seed }, { kind: 'all' }, { arenas: () => [baseArena(SMALL_FLAT)] });
  return { ...out, refusal };
}

/** The family's seeds whose stage-2 strips hold a vertex inside a corridor with every such vertex within the bound, so they
 * commit (EP-01/S5a/coincident's family, seeds 19, 574, 918 and 929 of its first 1 000, unplanted; C-0311). */
const COMMIT_SEEDS = [3443032966, 3027099408, 1318978557, 3198053629];

/** The family's seeds whose stage-2 inner strip crosses a gate's corridor (the trace spikes at the gate, the corridor along
 * its normal runs beside the spike's short side and the inner line never meets it): 156, 593 and 956 of the 1 000 — the
 * three lawful-input refusals of the family before the round (Q37), laid since the strips stop at a corridor by area. */
const CROSSING_SEEDS = [957349493, 2306189499, 4102748823];

describe('the stage-2 strips on SMALL_FLAT seeds (N-56 (3) Q22)', () => {
  for (const seed of COMMIT_SEEDS) {
    it(`seed ${String(seed)}: S5 commits stage 2's strips (refused "closed no strip face" before the round), each side typed`, () => {
      const r = throughS5(seed);
      expect(r.report.bugs.filter((b) => b.stage === 'S5')).toEqual([]);
      const v = r.model.kernel.view(GROUND, 1);
      const owners = v.faces().map((f) => v.owner(f) ?? '');
      expect(owners.filter((o) => o === 'wall_strip:2-inner').length).toBeGreaterThan(0);
      expect(owners.filter((o) => o === 'wall_strip:2-outer').length).toBeGreaterThan(0);
    }, 120_000);
  }

  for (const seed of CROSSING_SEEDS) {
    it(`seed ${String(seed)}: the stage-2 strip whose trace spikes at a gate is laid (Q37 / Q52 class B; refused "closed no strip face" before the round), both sides typed, no corridor point in a strip face`, () => {
      const r = throughS5(seed);
      expect(r.report.bugs.filter((b) => b.stage === 'S5')).toEqual([]);
      const v = r.model.kernel.view(GROUND, 1);
      const owners = v.faces().map((f) => v.owner(f) ?? '');
      expect(owners.filter((o) => o === 'wall_strip:2-inner').length).toBeGreaterThan(0);
      expect(owners.filter((o) => o === 'wall_strip:2-outer').length).toBeGreaterThan(0);
      const encs = enceintesOf(r);
      expect([...coveredCorridorPoints(r.model.kernel, encs, sliceOf(r)).entries()]).toEqual(encs.map((e) => [e.stage, 0]));
    }, 120_000);
  }
});

describe('a strips chain below the insertion\'s floor is not laid (census R-31; Q52 F)', () => {
  // The small river frame (M0-x-06's cell bridge × frame): CITY, 30 ha of frame, 6 ha walled, the river from the west.
  const SMALL_RIVER = { size: { rung: 'CITY', aspect: 1, areaHa: 30 }, site: { relief: 'plain', river: { inflowBearingCdeg: 27_000, mouth: 'none' } }, terrain: 'base', walledHa: 6 } as unknown as BaseBlueprint;

  it('seed 1933152649: S3 commits (refused E_DEGENERATE `empty` before the round — the insertion of a ~15 cm inner chain), both strips typed', () => {
    const r = runBase(SMALL_RIVER, 1933152649 as never, { kind: 'all' });
    expect(r.report.bugs.filter((b) => b.stage === 'S3')).toEqual([]);
    const v = r.model.kernel.view(GROUND, 1);
    const owners = new Set(v.faces().map((f) => v.owner(f) ?? ''));
    expect(owners.has('wall_strip:1-inner')).toBe(true);
    expect(owners.has('wall_strip:1-outer')).toBe(true);
  }, 300_000);
});

/** S3's slice as the oracles read it (its frame, gates, routes and lattice). */
function sliceOf(r: ReturnType<typeof throughS5>): SliceRoutes {
  const s = r.model.data.get('s3.slice') as { site: { frameRing: SliceRoutes['frameRing'] }; gates: SliceRoutes['gates']; routes: SliceRoutes['routes']; lattice: SliceRoutes['lattice'] };
  return { frameRing: s.site.frameRing, gates: s.gates, routes: s.routes, lattice: s.lattice };
}

/** The enceintes S3 and S5 wrote (the model's records). */
function enceintesOf(r: ReturnType<typeof throughS5>): EnceinteRef[] {
  return (r.model.data.get('enceintes') as EnceinteRef[] | undefined) ?? [];
}

// RQ5 (N-26; inventory Q9; §4.8 as amended by item 130 (b)): a wall-strip face never overlaps a way's corridor — the strips
// stop at a way's corridor wherever it runs inside their width, along its whole length there, and a face is a strip's by
// area. Measured by N-26's probe P4 (the stops' corridors along their actual paths: stage 1 the slice's route through the
// gate, whole, run on to the frame; k ≥ 2 the stand-in along the trace's normal; points every 25 cm at five offsets, deeper than the slack + 5 cm,
// located on L1): 0 such points in a strip face. On the four seeds below a strip face covered them before the round.
const RQ5_SEEDS: readonly [number, number, string][] = [
  [1842059696, 1, 'stage 1, the arterial bending along the wall 10 – 47 m from its gate'],
  [2537277803, 1, 'stage 1'],
  [889845538, 1, 'stage 1'],
  [1671642301, 2, "stage 2's inner strip at the stand-in corridor's far end"],
];

describe('RQ5: no strip face overlaps a way\'s corridor (N-26; §4.8 as amended, item 130 (b))', () => {
  for (const [seed, stage, what] of RQ5_SEEDS) {
    it(`seed ${String(seed)} (${what}): no corridor point of a stop in a strip face, both sides of every enceinte typed`, () => {
      const r = throughS5(seed);
      expect(r.report.bugs).toEqual([]);
      const encs = enceintesOf(r);
      expect(encs.length).toBeGreaterThanOrEqual(stage);
      const covered = coveredCorridorPoints(r.model.kernel, encs, sliceOf(r));
      expect([...covered.entries()]).toEqual(encs.map((e) => [e.stage, 0]));
      const v = r.model.kernel.view(GROUND, 1);
      const owners = new Set(v.faces().map((f) => v.owner(f) ?? ''));
      for (const e of encs) for (const side of ['inner', 'outer']) expect(owners.has(`wall_strip:${e.id.slice(e.id.indexOf(':') + 1)}-${side}`)).toBe(true);
    }, 120_000);
  }
});

// N-28 (C-0311 (4)'s KI) and N-22 (a): a strip piece a cap closed past a trace vertex deep in a corridor, or one holding a
// vertex 26 – 73.5 cm in, is typed — no point of the strip zone outside every stop's corridor (and its slack) lies in an
// untyped face. Before the round the six N-28 seeds left a 1 – 2 m-deep piece land:0.
const TYPED_SEEDS: readonly [number, string][] = [
  [2704069009, 'N-28 (146 cm)'],
  [1793505783, 'N-28 (200 cm)'],
  [3435165676, 'N-28 (110 cm)'],
  [671252167, 'N-28 (163 cm)'],
  [3568440702, 'N-28 (102 cm)'],
  [3709170404, 'N-28 (167 cm)'],
  [1149953023, 'N-22 (a): a stage-1 outer face holding a vertex 50.3 cm in'],
  [3436289613, 'N-22 (a): a face holding a vertex 50.0 cm in'],
];

describe('every piece of the strip zone typed (N-28; N-22 (a); C-0311 (4))', () => {
  for (const [seed, what] of TYPED_SEEDS) {
    it(`seed ${String(seed)} (${what}): no untyped face in the strip zone outside the stops' corridors`, () => {
      const r = throughS5(seed);
      expect(r.report.bugs).toEqual([]);
      expect(untypedStripPoints(r.model.kernel, enceintesOf(r), sliceOf(r)).slice(0, 3)).toEqual([]);
    }, 120_000);
  }
});
