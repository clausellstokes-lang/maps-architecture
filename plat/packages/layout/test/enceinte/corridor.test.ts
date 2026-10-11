// M0-c-02 session round S3 (N-56 (3), docs/M0-FIX-QUEUE.md Q22; C-0305): a strip's face is taken only outside every
// way's corridor — "outside" up to N-43 B's fidelity bound at the corridor's edge (`CORRIDOR_SLACK_CM`, ≈ 73.5 cm), no
// longer 5 cm. On SMALL_FLAT seed 3443032966 the stage-2 strips refused `closed no strip face` on lawful input: the
// inner faces were barred by (-11376, -2963), a vertex of stage 2's trace (shared with enceinte:1's outer setback line)
// 14.5 cm inside gate:3's corridor, onto which the insertion attracted the cap's end (-11378, -2978), and by
// (-11291, -1574), enceinte:1's outer setback vertex 6.1 cm inside it. A face crossing a corridor — holding a gate's
// vertex, or a vertex deeper than the bound — is still no strip, and a side left with none is refused with the barring
// vertex and its cause named.
import { describe, expect, it } from 'vitest';
import { STAGES, type Kernel, type KernelResult, type LatticePoint, type StageId } from '@plat/kernel';
import type { Enceinte, Scope } from '@plat/model';
import type { Row } from '@plat/tables';
import { baseArena, commitOuterRing, createRegistry, layStrips, registerBase, run, type BaseBlueprint, type ModelView, type PipelineContext, type PipelineStage, type StripStop } from '../../src/index.js';
import { CORRIDOR_SLACK_CM } from '../../src/enceinte/strips.js';
import { GROUND, kernelFor, P, smallSite } from './support.js';

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

describe('the corridor clause up to the fidelity bound (N-56 (3) Q22; C-0305)', () => {
  it('the slack is N-43 B\'s fidelity bound, 2·√2·attractCm', () => {
    expect(CORRIDOR_SLACK_CM).toBeCloseTo(73.539, 3);
  });

  it('a cap attracted onto a trace vertex 15 cm inside the corridor: the strips commit, each side\'s face holding that vertex typed wall_strip', () => {
    const { k, enceinte, row } = handTrace(dipped(15));
    const r = layStrips(enceinte, row, k, { stops: [WEST_WAY] });
    // Before the round: E_INVARIANT "layStrips: a side's lines closed no strip face" (the vertex 15 cm > 5 cm inside).
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

  it('a face crossing a corridor is still refused, its vertex and cause named: the way run along the trace, the lines never cut — the gate\'s vertex', () => {
    const { k, enceinte, row } = handTrace([P(-20000, -20000), P(20000, -20000), P(20000, 20000), P(-20000, 20000), P(-20000, 0)]);
    const along: StripStop = { kind: 'way', gate: 'gate:0', at: P(-20000, 0), path: [P(-20000, -3000), P(-20000, 0), P(-20000, 3000)], halfWidthCm: 700 };
    const r = layStrips(enceinte, row, k, { stops: [along] });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toBe("layStrips: a side's lines closed no strip face — the inner side: vertex (-20000, 0) is gate:0's gate vertex (the face crosses its corridor)");
    // Nothing of the strips written: the batch rolled back.
    const v = k.view(GROUND, 1);
    expect(v.faces().filter((f) => (v.owner(f) ?? '').startsWith('wall_strip'))).toEqual([]);
    const setback = k.resolve({ role: 'setback', entity: 'enceinte:1' }, GROUND);
    expect(setback.view === 'edges' ? setback.runs.length : 0).toBe(0);
  }, 60_000);

  it('the same crossing with the gate off the trace\'s vertices: the cause is a vertex deeper than the bound', () => {
    const { k, enceinte, row } = handTrace(dipped(15));
    const along: StripStop = { kind: 'way', gate: 'gate:0', at: P(-20000, 5), path: [P(-20000, -3000), P(-20000, 5), P(-20000, 3000)], halfWidthCm: 700 };
    const r = layStrips(enceinte, row, k, { stops: [along] });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toBe("layStrips: a side's lines closed no strip face — the inner side: vertex (-20000, 685) lies 700 cm inside gate:0's corridor, beyond the fidelity bound (74 cm)");
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

/** The family's seeds whose stage-2 strips were refused `closed no strip face` before the round with every barring vertex
 * within the bound (EP-01/S5a/coincident's family, seeds 19, 574, 918 and 929 of its first 1 000, unplanted; C-0305). */
const COMMIT_SEEDS = [3443032966, 3027099408, 1318978557, 3198053629];

/** The family's seeds whose stage-2 inner strip truly crosses a gate's corridor (the trace spikes at the gate, the corridor
 * along its normal runs beside the spike's short side and the inner line never meets it): 156, 593 and 956 of the 1 000. */
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
    it(`seed ${String(seed)}: a stage-2 strip crossing a gate's corridor is never committed and never refused unnamed`, () => {
      const r = throughS5(seed);
      const bug = r.report.bugs.find((b) => b.stage === 'S5');
      const v = r.model.kernel.view(GROUND, 1);
      const owners = v.faces().map((f) => v.owner(f) ?? '');
      if (bug === undefined) {
        // A later round that lays these strips: both sides typed.
        expect(owners.filter((o) => o === 'wall_strip:2-inner').length).toBeGreaterThan(0);
        expect(owners.filter((o) => o === 'wall_strip:2-outer').length).toBeGreaterThan(0);
        return;
      }
      // Refused (CONFIRMED on this round's tree for all three): the cause named, nothing of stage 2's strips written.
      expect(owners.filter((o) => o.startsWith('wall_strip:2-'))).toEqual([]);
      expect(r.refusal?.code).toBe('E_INVARIANT');
      expect(r.refusal?.detail).toMatch(/closed no strip face — the (inner|outer) side: vertex \(-?\d+, -?\d+\) (is gate:\d+'s gate vertex \(the face crosses its corridor\)|lies \d+ cm inside gate:\d+'s corridor, beyond the fidelity bound \(74 cm\))/);
    }, 120_000);
  }
});
