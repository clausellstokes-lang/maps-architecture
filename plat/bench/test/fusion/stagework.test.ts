// M0-c-06's hardening round S1, queue row Q118 (checks/M0-c-06-notes.md 'Hardening round S1'): the fusion summary's
// per-stage work blocks — `runs[i].stageWork[stage][counter]` in M0-e-06 S3's form { stage, unit, units, unitsTotal,
// perUnit, charged } (C-0453 (2)), for every stage the run drives and every counter M0-f-03b's STAGE_CHARGES gives it, so
// M0-f-03b's hit-rate report finds a block of n > 0 for each charged counter at each charging stage (C-0446: a charged
// counter without one is UNBOUNDED). The kernel's counters are read from the watched façade (one sample per batch the
// stage committed or refused); the watching leaves the derivation unchanged.
//
// Fix round 2 (lane build/M0-c-06-fix-s2; the closing check checks/M0-c-06-s1.md, mutants C-Q5, C-Q6, C-Q8, C-Q17): the
// blocks' content is pinned against oracles the façade and the reads under test do not feed — the overlay's own charged
// work on a hand-built arena (both op forms), the kernel stages' work being charged at all, hydro.cells' units read from
// the model's terrain, and S6's live L1 faces counted by a planted reader at S6's entry.
import { attachIndex, createKernel, createPlat, isFaceLive, STAGES, type FaceId, type KernelResult, type KernelTx, type LatticePoint, type Overlay, type PlatKey, type StageId } from '@plat/kernel';
import type { PipelineContext, PipelineStage, StrategyRegistry } from '@plat/layout';
import { loadWorkLimits } from '@plat/tables';
import { beforeAll, describe, expect, it } from 'vitest';
import { derive, fusion, measure, summaryOf, type Derivation, type FusionGateReport, type FusionSizes, type SeedRecord, type StampFold } from '../../src/fusion/index.js';
import { STAGE_WORK, stageWorkOf, type StageWorkBlock } from '../../src/fusion/report.js';
import { watchedKernel, type BatchSeen } from '../../src/fusion/runs.js';
import { C06_RUN_STAGES, KERNEL_COUNTERS, STAGE_CHARGES } from '../../src/worklimits/index.js';
import { goodRecord, TEST_SIZE } from './support.js';

const hex = (h: Iterable<number> | undefined): string => (h === undefined ? '' : [...h].map((x) => (x >>> 0).toString(16).padStart(8, '0')).join(''));

describe('the stage table', () => {
  it('STAGE_WORK is M0-f-03b’s STAGE_CHARGES on every stage the harness’s two runs drive (C06_RUN_STAGES)', () => {
    const stages = [...new Set([...C06_RUN_STAGES.values()].flat())].sort();
    expect(Object.keys(STAGE_WORK).sort()).toEqual(stages);
    for (const st of stages) expect([...STAGE_WORK[st]], st).toEqual([...(STAGE_CHARGES.get(st) ?? [])]);
  });
});

describe('the per-stage fold on hand records', () => {
  it('a block per counter of each stage that ran: n every sample (a zero-work one too), charged the samples > 0, 0 units read as 0 per unit', () => {
    const rows = (seed: number): Partial<SeedRecord> => ({
      invocations: { S1: 1, S3: 1, S4: 1, S5: 1, S8: 1 },
      work: [
        { counter: 'cut.kernelCalls', stage: 'S8', work: 30, limit: 400, units: 10 },
        { counter: 'growth.proposals', stage: 'S5', work: 10 * seed, limit: 1_000, units: 20 },
        { counter: 'cut.candidates', stage: 'S8', work: 0, limit: 100, units: 4 },
      ],
      stageRows: [
        { counter: 'insert.points', stage: 'S4', work: 30, units: 10 },
        { counter: 'insert.points', stage: 'S4', work: 0, units: 5 },
        { counter: 'route.nodes', stage: 'S3', work: 7, units: 0 },
        // a row at a stage the run never invoked is no block
        { counter: 'grower.turns', stage: 'S6', work: 5, units: 5 },
      ],
    });
    const w = stageWorkOf([goodRecord(1, 'fusion', rows(1)), goodRecord(2, 'fusion', rows(2))]);
    expect(Object.keys(w)).toEqual(['S1', 'S3', 'S4', 'S5', 'S8']);
    expect(w['S1']).toEqual({});
    const wl = loadWorkLimits();
    const pts = w['S4']['insert.points'] as StageWorkBlock;
    expect(pts).toMatchObject({ stage: 'S4', unit: wl.law('insert.points').unit, unitsTotal: 30, charged: 2 });
    expect(pts.units).toMatchObject({ n: 4, max: 10 });
    expect(pts.perUnit).toMatchObject({ n: 4, max: 3, p50: 1.5 });
    expect(w['S3']['route.nodes'].perUnit).toMatchObject({ n: 2, max: 0 });
    expect(w['S3']['route.nodes'].charged).toBe(2);
    expect(w['S5']['growth.proposals']).toMatchObject({ unit: wl.law('growth.proposals').unit, unitsTotal: 40, charged: 2 });
    expect(w['S5']['growth.proposals'].perUnit).toMatchObject({ n: 2, max: 1, p50: 0.75 });
    // the charged cut.kernelCalls rows and the zero-work cut.candidates rows (no cut.recursionDepth sample: no block)
    expect(w['S8']['cut.kernelCalls']).toMatchObject({ stage: 'S8', charged: 2, unitsTotal: 20 });
    expect(w['S8']['cut.candidates']).toMatchObject({ charged: 0, unitsTotal: 8 });
    expect(w['S8']['cut.candidates'].units.n).toBe(2);
    expect(Object.keys(w['S8'])).toEqual(['cut.kernelCalls', 'cut.candidates']);
  });
});

describe('the watched façade against the overlay’s own charged work (a hand-built arena; fix round 2, C-Q5 and C-Q6)', () => {
  const GROUND: PlatKey = { layer: 'ground', part: 0 } as PlatKey;
  const P = (x: number, y: number): LatticePoint => ({ x, y }) as LatticePoint;
  const spec = (level: 0 | 1, stage: number, ops: KernelTx['ops'] = []): KernelTx => ({
    key: GROUND,
    level,
    ops,
    expect: [],
    onFail: 'reject',
    batch: { kind: 'stage', stage: stage as StageId },
    stage: stage as StageId,
    rederivesFrom: stage as StageId,
    workLimit: 10_000_000,
  });
  /** The overlay's charged work by counter, read by the batch's own writer (never through the façade's record). */
  const own = (o: Overlay | null): Record<string, number> => {
    const out: Record<string, number> = {};
    if (o === null) return out;
    for (const [c, v] of [...o.work.counts.entries()].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))) out[c] = v;
    return out;
  };

  it('a declared-op batch and a callback batch: each sample’s counts are the overlay’s own, charged on insert.points and tx.facesWalked', () => {
    const p = createPlat(GROUND, { widthCm: 100_000, heightCm: 100_000, aspect: 1, marginShare: 0 } as never);
    attachIndex(p, { gridCellCm: 5000 });
    const k = createKernel(new Map([[GROUND, p]]), { spineWidths: () => null });
    const seen: BatchSeen[] = [];
    const w = watchedKernel(k, 'S1', seen);
    // a callback batch: the L0 outer ring
    let cb: Overlay | null = null;
    const outer = [P(-45_000, -45_000), P(45_000, -45_000), P(45_000, 45_000), P(-45_000, 45_000)];
    const r1 = w.tx(spec(0, STAGES.S1), (o) => {
      cb = o;
      return k.geom.insertChain(o, outer, [{ role: 'margin', entity: 'terrain:hand' }], 'mandatory', { closed: true });
    });
    expect(r1.ok).toBe(true);
    // a declared-op batch (S3's enceinte form, `k.tx(spec(arena, 1, STAGES.S3, ops))`): two chains at L1
    let dc: Overlay | null = null;
    const op = (i: number, line: readonly LatticePoint[]) => ({
      kind: 'insertChain' as const,
      lineage: [7, i] as [number, number],
      index: 0,
      apply: (o: Overlay): KernelResult<unknown> => {
        dc = o;
        return k.geom.insertChain(o, line, [{ role: 'way', entity: `way:${String(i)}` }], 'mandatory');
      },
    });
    const r2 = w.tx(spec(1, STAGES.S3, [op(1, [P(-30_000, 0), P(30_000, 0)]), op(2, [P(0, -30_000), P(0, 30_000)])] as unknown as KernelTx['ops']));
    expect(r2.ok && r2.value.record !== null).toBe(true);
    expect(seen.map((b) => [b.stage, b.level, b.committed, b.code])).toEqual([
      ['S1', 0, true, null],
      ['S1', 1, true, null],
    ]);
    expect(cb).not.toBeNull();
    expect(dc).not.toBeNull();
    for (const [b, o] of [[seen[0], cb], [seen[1], dc]] as const) {
      const mine = own(o);
      expect(Object.keys(mine).length).toBeGreaterThan(0);
      expect(b.counts).toEqual(mine);
      expect(b.counts['insert.points'] ?? 0).toBeGreaterThan(0);
      expect(b.counts['tx.facesWalked'] ?? 0).toBeGreaterThan(0);
    }
  });
});

describe('the per-stage work on the flat fixture (the test size, seed 1, both runs)', () => {
  const sizes: FusionSizes = { from: 1, seeds: 1, runs: ['fusion', 'integrated'], frameHa: TEST_SIZE.frameHa, walledHa: TEST_SIZE.walledHa };
  const ds: Derivation[] = [];
  const recs: SeedRecord[] = [];
  let plain: Derivation;
  // S6's live L1 faces as it starts, counted by a reader planted inside the instrumented S6 (it reads before S6 runs,
  // the arena's live L1 face slots, not the façade or its view) — grower.turns' unit (fix round 2, C-Q8).
  let s6Live = -1;
  const liveFacesAtS6 = (registry: StrategyRegistry): void => {
    const product = registry.products.get('base');
    if (product === undefined) throw new Error('stagework.test: no base product');
    product.stages.forEach((s, i) => {
      if (s.id !== STAGES.S6) return;
      const orig = s.run;
      product.stages[i] = {
        ...s,
        run(input: unknown, ctx: PipelineContext) {
          const arena = ctx.kernel.plat({ layer: 'ground', part: 0 } as PlatKey);
          let live = 0;
          for (let f = 0; f < arena.slots.face[1].top; f += 1) if (isFaceLive(arena, 1, f as FaceId)) live += 1;
          s6Live = live;
          return orig.call(s, input, ctx);
        },
      } as PipelineStage;
    });
  };
  let harness: { report: FusionGateReport; stamps: StampFold; records: SeedRecord[] };
  beforeAll(async () => {
    // The harness's own path (pool.ts `runTask`, the records the summary is folded from) …
    harness = await fusion({ sizes, workers: 1, summary: false, timing: null });
    // … and the same derivations watched by hand (their batches read), and one with derive's default (unwatched).
    for (const run of ['fusion', 'integrated'] as const) {
      const d = derive(run, 1, { ...TEST_SIZE, watch: true, plant: liveFacesAtS6 });
      ds.push(d);
      recs.push(measure(d));
    }
    plain = derive('fusion', 1, TEST_SIZE);
  }, 900_000);

  it('the watched façade leaves the derivation unchanged: the roots and every stage root equal an unwatched derivation’s; derive’s default stays unwatched (the timing phase’s and the profiler’s callers)', () => {
    const d = ds[0];
    expect(hex(d.model.root)).toBe(hex(plain.model.root));
    expect([...d.model.stageRoots].map(([k, v]) => [k, hex(v)])).toEqual([...plain.model.stageRoots].map(([k, v]) => [k, hex(v)]));
    expect(d.ins.batches.length).toBeGreaterThan(0);
    expect(plain.ins.batches).toEqual([]);
    expect(d.ins.batches.every((b) => ['S1', 'S3', 'S4', 'S5'].includes(b.stage))).toBe(true);
    expect(ds[1].ins.s6Faces).toBeGreaterThan(0);
    // The harness's tasks watch: their records are the hand-watched derivations' (the stamps aside).
    const strip = (r: SeedRecord) => JSON.stringify({ ...r, stampsMs: {} });
    expect(harness.records.map(strip)).toEqual(recs.map(strip));
    expect(harness.records.every((r) => r.stageRows.some((w) => w.counter === 'insert.points'))).toBe(true);
  });

  it('every charged counter at each charging stage has a block of n > 0 in the summary, with the table’s unit (the reader’s UNBOUNDED rule, C-0446)', () => {
    const s = JSON.parse(JSON.stringify(summaryOf(harness.report, harness.stamps))) as { runs: { run: string; stageWork: Record<string, Record<string, StageWorkBlock>> }[] };
    const wl = loadWorkLimits();
    const missing: string[] = [];
    for (const run of s.runs) {
      const stages = C06_RUN_STAGES.get(run.run) ?? [];
      expect(stages.length, run.run).toBeGreaterThan(0);
      expect(Object.keys(run.stageWork).sort(), run.run).toEqual([...stages].sort());
      for (const st of stages) {
        for (const c of STAGE_CHARGES.get(st) ?? []) {
          const b = run.stageWork[st]?.[c];
          if (b === undefined || !(b.units.n > 0) || b.perUnit.n !== b.units.n) {
            missing.push(`${run.run} ${st} ${c}`);
            continue;
          }
          expect({ at: `${run.run} ${st} ${c}`, stage: b.stage, unit: b.unit }).toEqual({ at: `${run.run} ${st} ${c}`, stage: st, unit: wl.law(c).unit });
          expect(b.charged).toBeLessThanOrEqual(b.units.n);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  it('a kernel block’s n is the stage’s batches committed or refused (a declared batch with no op is no sample); the stage counters’ n is the seed’s records', () => {
    const wl = loadWorkLimits();
    ds.forEach((d, i) => {
      const r = recs[i];
      const w = stageWorkOf([r]);
      // a kernel batch's units: its limit read back through the five kernel laws (M0-e-06's `kernelUnits`)
      let floor = 0;
      let per = 0;
      for (const c of KERNEL_COUNTERS) {
        floor += wl.law(c).floor;
        per += wl.law(c).perUnit;
      }
      const unitsOf = (limit: number): number => Math.max(1, (limit - floor) / per);
      for (const st of ['S1', 'S3', 'S4', 'S5', ...(d.kind === 'integrated' ? ['S6'] : [])]) {
        const batches = d.ins.batches.filter((b) => b.stage === st && (b.committed || b.code !== null));
        expect(batches.length, `${d.kind} ${st}`).toBeGreaterThan(0);
        for (const c of KERNEL_COUNTERS) {
          const b = w[st][c];
          const at = `${d.kind} ${st} ${c}`;
          expect(b.units.n, at).toBe(batches.length);
          expect(b.charged, at).toBe(batches.filter((x) => (x.counts[c] ?? 0) > 0).length);
          expect(b.unitsTotal, at).toBeCloseTo(batches.reduce((t, x) => t + unitsOf(x.limit), 0), 6);
          expect(b.perUnit.max, at).toBeCloseTo(Math.max(...batches.map((x) => (x.counts[c] ?? 0) / unitsOf(x.limit))), 12);
        }
      }
      for (const st of ['S3', 'S4', 'S5']) expect(w[st]['route.nodes'].units.n, `${d.kind} ${st}`).toBe(1);
      expect(w['S1']['hydro.cells'].units.n).toBe(1);
      expect(w['S5']['growth.proposals'].units.n).toBe(r.work.filter((x) => x.counter === 'growth.proposals').length);
      expect(w['S8']['cut.candidates'].units.n).toBe(r.work.filter((x) => x.counter === 'cut.candidates').length);
      // hydro.cells' units: the hydrology grid's cells, read from the model's terrain (fix round 2, C-Q17)
      const hydro = (d.model.data.get('terrain') as { readonly hydro: { readonly cols: number; readonly rows: number } } | undefined)?.hydro;
      expect(hydro).toBeDefined();
      expect((hydro as { rows: number }).rows, d.kind).toBeGreaterThan(1);
      expect(w['S1']['hydro.cells'].unitsTotal, d.kind).toBe((hydro as { cols: number }).cols * (hydro as { rows: number }).rows);
      expect(w['S1']['hydro.cells'].units, d.kind).toMatchObject({ n: 1, max: (hydro as { cols: number }).cols * (hydro as { rows: number }).rows });
      // every kernel stage charges work: at least one sample charged on insert.points and on tx.facesWalked (fix round 2, C-Q5)
      for (const st of ['S1', 'S3', 'S4', 'S5', ...(d.kind === 'integrated' ? ['S6'] : [])]) {
        for (const c of ['insert.points', 'tx.facesWalked']) {
          expect(w[st][c].charged, `${d.kind} ${st} ${c}`).toBeGreaterThan(0);
          expect(w[st][c].perUnit.max, `${d.kind} ${st} ${c}`).toBeGreaterThan(0);
        }
      }
      // S3's and S4's batches (S4's one batch and S3's enceinte batch are declared-op batches) each read non-zero work
      // (fix round 2, C-Q6): a batch the façade did not see would read 0 on every counter
      for (const st of ['S3', 'S4']) {
        const committed = d.ins.batches.filter((b) => b.stage === st && b.committed);
        expect(committed.length, `${d.kind} ${st}`).toBeGreaterThan(0);
        for (const b of committed) {
          expect(b.counts['insert.points'] ?? 0, `${d.kind} ${st}`).toBeGreaterThan(0);
          expect(b.counts['tx.facesWalked'] ?? 0, `${d.kind} ${st}`).toBeGreaterThan(0);
        }
      }
      if (d.kind === 'integrated') {
        // grower.turns' unit: S6's live L1 faces as it began, counted by the planted reader (fix round 2, C-Q8)
        expect(s6Live).toBeGreaterThan(0);
        expect(d.ins.s6Faces).toBe(s6Live);
        expect(w['S6']['grower.turns'].units).toMatchObject({ n: 1, max: s6Live });
        expect(w['S6']['field.cells'].units.n).toBe(1);
      } else expect(w['S6']).toBeUndefined();
    });
    // the seed's declared no-op batches exist and are left out (S5's at the test size)
    expect(ds[0].ins.batches.some((b) => !b.committed && b.code === null)).toBe(true);
  });
});
