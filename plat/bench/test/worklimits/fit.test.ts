// M0-f-03b's fit (§5.1 (5) *Coefficients* and *Confirmation*; C-0021, C-0091, C-0301 (3), N-61 (6)): the coefficient of
// a counting counter is the largest p999 of its blocks × 1.5, written to perUnit and floor alike; the fixed row is
// skipped and its block never read; skeleton.events is max(measured, §3.8's law) cell by cell; a counter no summary
// measured keeps its row; the fit refuses a block whose unit or log2 form departs from its row, a counter without a
// row, a coefficient that is not positive, and a summary of the wrong shape. The F-WORK hit-rate bound is sound: no
// sample of batches has more batches at or over the fitted limit than `hitBound` allows (fast-check, both quantile
// definitions the summaries use). The report has a row for every stage each summary shows ran, on every counter the stage
// charges (STAGE_CHARGES, held to the base stages' declarations); a charged counter with no block is unbounded — after
// null, never 0 — and fails the report (C-0446). Every number pinned here is the fit's on the FROZEN copies of the four
// summaries (support.ts summaries(): fixtures/summaries/, their sha256 pinned below; session round S1, Q134), so another
// item's landing never moves a pin; the live committed summaries are read by live.test.ts alone (invariants, a report).
import fc from 'fast-check';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { skeletonEventLimit, stageText } from '@plat/kernel';
import { createRegistry, registerBase } from '@plat/layout';
import { quantile7 } from '@plat/testkit';
import {
  C06_RUN_STAGES,
  FitError,
  fitWorkLimits,
  hitBound,
  hitRates,
  HIT_RATE_TARGET_PER_THOUSAND,
  KERNEL_COUNTERS,
  LAW_FLOORS,
  P999_FACTOR,
  STAGE_CHARGES,
  stageGroups,
  SUMMARY_IDS,
  type CounterFit,
  type WorkLimitCoefficientReport,
  type WorkQuantiles,
  inputPath,
} from '../../src/worklimits/index.js';
import { at, BLOCKS_ONLY, FIXTURE_DIR, FIXTURE_SHA256, objAt, passingSummaries, sha256, SUMMARY_TEXTS, summaries, v2Table } from './support.js';

const DATE = '2026-10-27';

function fit(s: ReturnType<typeof summaries> = summaries()): WorkLimitCoefficientReport {
  return fitWorkLimits(v2Table(), s, DATE);
}

/** The fit with each stage charged only what its blocks name (the bounded part of the report alone). */
function fitBlocks(s: ReturnType<typeof summaries> = summaries()): WorkLimitCoefficientReport {
  return fitWorkLimits(v2Table(), s, DATE, BLOCKS_ONLY);
}

const KERNEL = [...KERNEL_COUNTERS];

function counter(r: WorkLimitCoefficientReport, c: string): CounterFit {
  const f = r.counters.find((x) => x.counter === c);
  if (f === undefined) throw new Error(`no fit for ${c}`);
  return f;
}

/** Every p999 the raw summaries hold for a counter, read by hand from their paths (not through the fit's walkers). */
function rawP999s(s: ReturnType<typeof summaries>, c: string): number[] {
  const out: number[] = [];
  for (const run of at(s['M0-c-06'], 'runs') as Record<string, unknown>[]) {
    const w = (run['work'] as Record<string, { perUnit: { p999: number } }>)[c];
    if (w !== undefined) out.push(w.perUnit.p999);
  }
  for (const g of at(s['M0-e-06'], 'groups') as Record<string, unknown>[]) {
    const w = (g['work'] as Record<string, { perUnit: { p999: number } }>)[c];
    if (w !== undefined) out.push(w.perUnit.p999);
  }
  const b = (at(s['M0-b-04'], 'work/counters') as Record<string, { perUnit: { p999: number } }>)[c];
  if (b !== undefined) out.push(b.perUnit.p999);
  const prims = at(s['M0-k-04'], 'primitives') as Record<string, { work: Record<string, { p999: number }> }>;
  for (const p of Object.keys(prims).sort()) {
    const w = prims[p].work[c];
    if (w !== undefined) out.push(w.p999);
  }
  return out;
}

describe('the coefficient: the largest p999 of the counter’s blocks × 1.5, perUnit and floor alike', () => {
  it('every measured counter of the committed summaries, recomputed by hand from the raw blocks', () => {
    const s = summaries();
    const r = fit(s);
    const measured = r.counters.filter((f) => f.status === 'measured');
    expect(measured.map((f) => f.counter)).toEqual([
      'cut.candidates',
      'cut.kernelCalls',
      'cut.recursionDepth',
      'field.cells',
      'grower.turns',
      'growth.candidates',
      'growth.proposals',
      'hydro.cells',
      'insert.attractQueries',
      'insert.crossings',
      'insert.placementCandidates',
      'insert.points',
      'route.nodes',
      'tx.facesWalked',
    ]);
    for (const f of measured) {
      const p = rawP999s(s, f.counter);
      expect(p.length, f.counter).toBe(f.sources.length);
      const p999 = Math.max(...p);
      expect(f.p999, f.counter).toBe(p999);
      expect(f.coefficient, f.counter).toBe(p999 * 1.5);
      expect(f.after.perUnit, f.counter).toBe(p999 * 1.5);
      expect(f.after.floor, f.counter).toBe(p999 * 1.5);
      expect(f.after.perUnitProvenance).toBe(`M0 spike ${DATE}`);
      expect(f.after.floorProvenance).toBe(`M0 spike ${DATE}`);
    }
    expect(P999_FACTOR).toBe(1.5);
    // One by hand, with the literal from the summary (M0-b-04's S8 cut.candidates p999 is the largest of three).
    expect(counter(r, 'cut.candidates').after.perUnit).toBe(13.557243478260682 * 1.5);
    expect(counter(r, 'cut.candidates').sources.map((b) => `${b.summary} ${b.at}`)).toEqual(['M0-c-06 runs/0 (fusion)', 'M0-c-06 runs/1 (integrated)', 'M0-b-04 work (one-face districts, CITY block scale)']);
  });

  it('raising the largest block moves the coefficient; raising a smaller block to below the largest does not', () => {
    const s = summaries();
    objAt(s['M0-c-06'], 'runs/1/work/cut.kernelCalls/perUnit')['p999'] = 2.1;
    objAt(s['M0-c-06'], 'runs/1/work/cut.kernelCalls/perUnit')['max'] = 2.1;
    expect(counter(fit(s), 'cut.kernelCalls').coefficient).toBe(2.100199999999995 * 1.5);
    objAt(s['M0-b-04'], 'work/counters/cut.kernelCalls/perUnit')['p999'] = 2.25;
    expect(counter(fit(s), 'cut.kernelCalls').coefficient).toBe(2.25 * 1.5);
    // The smallest block alone raised above the others takes the coefficient (every block is read).
    const t = summaries();
    objAt(t['M0-c-06'], 'runs/1/work/cut.kernelCalls/perUnit')['p999'] = 3;
    objAt(t['M0-c-06'], 'runs/1/work/cut.kernelCalls/perUnit')['max'] = 3;
    expect(counter(fit(t), 'cut.kernelCalls').coefficient).toBe(4.5);
    // M0-e-06's last group and M0-k-04's last primitive are read too.
    objAt(t['M0-e-06'], 'groups/3/work/grower.turns/perUnit')['p999'] = 5;
    objAt(t['M0-e-06'], 'groups/3/work/grower.turns/perUnit')['max'] = 5;
    expect(counter(fit(t), 'grower.turns').coefficient).toBe(7.5);
    objAt(t['M0-k-04'], 'primitives/splitFace/work/tx.facesWalked')['p999'] = 30;
    objAt(t['M0-k-04'], 'primitives/splitFace/work/tx.facesWalked')['max'] = 30;
    expect(counter(fit(t), 'tx.facesWalked').coefficient).toBe(45);
  });

  it('a block with no sample (n = 0) is not read', () => {
    const s = summaries();
    const q = objAt(s['M0-c-06'], 'runs/0/work/cut.kernelCalls/perUnit');
    q['n'] = 0;
    q['p999'] = 50;
    q['max'] = 50;
    expect(counter(fit(s), 'cut.kernelCalls').coefficient).toBe(2.100199999999995 * 1.5);
    expect(counter(fit(s), 'cut.kernelCalls').sources).toHaveLength(2);
  });
});

describe('the fixed row is skipped and its block never read (C-0301 (3))', () => {
  it('warp.halvings keeps { fixed, 0, 8 } and its provenance whatever its block holds — even a block that is not one', () => {
    for (const block of [{ unit: 'fixed', n: 2, p50: 1, p99: 1, p999: 1, max: 1, units: 2 }, { unit: 'fixed', n: 9, p50: 0, p99: 0, p999: 999, max: 999, units: 9 }, 'not a block', null]) {
      const s = summaries();
      objAt(s['M0-k-04'], 'primitives/warp/work')['warp.halvings'] = block;
      const f = counter(fit(s), 'warp.halvings');
      expect(f.status).toBe('fixed-skipped');
      expect(f.sources).toEqual([]);
      expect(f.p999).toBeNull();
      expect(f.after).toEqual(f.before);
      expect(f.after).toEqual({ perUnit: 0, floor: 8, perUnitProvenance: 'architecture 2026-10-03', floorProvenance: 'architecture 2026-10-03' });
    }
  });

  it('no stage group carries a fixed counter’s block', () => {
    for (const g of stageGroups(v2Table(), summaries())) for (const b of g.blocks) expect(b.counter).not.toBe('warp.halvings');
  });
});

describe('skeleton.events: max(measured, §3.8’s law), cell by cell (N-61 (6))', () => {
  it('the law is 8 n + 64 at r = n, the kernel’s own skeletonEventLimit', () => {
    const law = LAW_FLOORS.get('skeleton.events');
    expect(law).toBeDefined();
    for (const n of [0, 1, 3, 100, 10_000]) expect((law?.floor ?? 0) + (law?.perUnit ?? 0) * n).toBe(skeletonEventLimit(n, n));
    expect([...LAW_FLOORS.keys()]).toEqual(['skeleton.events']);
  });

  it('measured 1.73 per vertex is below the law: the row is (8, 64), floored, the measurement kept in the fit', () => {
    const f = counter(fit(), 'skeleton.events');
    expect(f.status).toBe('floored');
    expect(f.p999).toBe(1.1538461538461537);
    expect(f.coefficient).toBe(1.1538461538461537 * 1.5);
    expect(f.after.perUnit).toBe(8);
    expect(f.after.floor).toBe(64);
    expect(f.after.perUnitProvenance).toBe(`M0 spike ${DATE}`);
  });

  it('a measurement above the law takes its cell: 10 → (15, 64) floored; 100 → (150, 150) measured', () => {
    const s = summaries();
    const q = objAt(s['M0-k-04'], 'primitives/skeleton/work/skeleton.events');
    q['p999'] = 10;
    q['max'] = 10;
    let f = counter(fit(s), 'skeleton.events');
    expect([f.status, f.after.perUnit, f.after.floor]).toEqual(['floored', 15, 64]);
    q['p999'] = 100;
    q['max'] = 100;
    f = counter(fit(s), 'skeleton.events');
    expect([f.status, f.after.perUnit, f.after.floor]).toEqual(['measured', 150, 150]);
    // 8 / 1.5 exactly: perUnit 8 = the law's, floor 64 the law's.
    q['p999'] = 8 / 1.5;
    q['max'] = 8 / 1.5;
    f = counter(fit(s), 'skeleton.events');
    expect([f.status, f.after.perUnit, f.after.floor]).toEqual(['floored', 8, 64]);
  });
});

describe('a counter no summary measured keeps its row', () => {
  it('index.rebuilds (no block in the four summaries) is unmeasured, its cells and provenance unchanged', () => {
    const f = counter(fit(), 'index.rebuilds');
    expect(f.status).toBe('unmeasured');
    expect(f.after).toEqual(f.before);
    expect(f.after).toEqual({ perUnit: 1, floor: 64, perUnitProvenance: 'architecture 2026-10-03 placeholder', floorProvenance: 'architecture 2026-10-03 placeholder' });
  });

  it('a measured counter whose blocks are removed becomes unmeasured', () => {
    const s = summaries();
    delete objAt(s['M0-k-04'], 'primitives/skeleton/work')['skeleton.events'];
    expect(counter(fit(s), 'skeleton.events').status).toBe('unmeasured');
  });
});

describe('the fit refuses what it cannot read honestly', () => {
  const cases: [string, (s: ReturnType<typeof summaries>) => void, RegExp][] = [
    ['a block unit departing from the row', (s) => (objAt(s['M0-e-06'], 'groups/0/work/field.cells')['unit'] = 'faces'), /M0-e-06\/groups\/0\/work\/field\.cells: unit 'faces' departs from the row's 'frameCells'/],
    ['a log2 form departing from the row', (s) => (objAt(s['M0-b-04'], 'work/counters/cut.recursionDepth')['log2'] = false), /log2 false departs from the row's true/],
    ['a c-06 unit departing from the row', (s) => (objAt(s['M0-c-06'], 'runs/0/work/cut.candidates')['unit'] = 'vertices'), /M0-c-06\/runs\/0\/work\/cut\.candidates: unit 'vertices' departs from the row's 'faces'/],
    ['a k-04 unit departing from the row', (s) => (objAt(s['M0-k-04'], 'primitives/insertChain/work/insert.points')['unit'] = 'faces'), /primitives\/insertChain\/work\/insert\.points: unit 'faces'/],
    ['a counter without a row (C-0021)', (s) => (objAt(s['M0-k-04'], 'primitives/insertChain/work')['plan.pieces'] = { unit: 'moduleCells', n: 1, p50: 1, p99: 1, p999: 1, max: 1, units: 1 }), /'plan\.pieces' has no row in workLimits\.json .*C-0021/],
    ['a coefficient of 0', (s) => {
      const q = objAt(s['M0-k-04'], 'primitives/skeleton/work/skeleton.events');
      for (const k of ['p50', 'p99', 'p999', 'max']) q[k] = 0;
    }, /skeleton\.events: the measured coefficient 0 is not a positive finite number/],
    ['quantiles out of order', (s) => (objAt(s['M0-c-06'], 'runs/0/work/cut.candidates/perUnit')['max'] = 1), /runs\/0\/work\/cut\.candidates\/perUnit: the quantiles are not in order/],
    ['a negative quantile', (s) => (objAt(s['M0-e-06'], 'groups/1/work/hydro.cells/perUnit')['p50'] = -1), /groups\/1\/work\/hydro\.cells\/perUnit\/p50: not a finite number ≥ 0/],
    ['a fractional sample count', (s) => (objAt(s['M0-b-04'], 'work/counters/cut.candidates/perUnit')['n'] = 1.5), /work\/counters\/cut\.candidates\/perUnit\/n: not a count/],
    ['the wrong item', (s) => (s['M0-b-04']['item'] = 'M0-b-03'), /M0-b-04\/item: 'M0-b-03'/],
    ['M0-e-06 not at CITY', (s) => (s['M0-e-06']['size'] = 'test'), /M0-e-06\/size: 'test'/],
    ['M0-b-04 not at CITY', (s) => (objAt(s['M0-b-04'], 'work')['fixture'] = 'one-face districts, TOWN block scale'), /M0-b-04\/work\/fixture/],
    ['a c-06 run without work', (s) => delete objAt(s['M0-c-06'], 'runs/1')['work'], /M0-c-06\/runs\/1\/work: not an object/],
    ['an e-06 stage without its outcome', (s) => delete objAt(s['M0-e-06'], 'groups/2/stages')['S6'], /M0-e-06\/groups\/2\/stages\/S6: not an object/],
    ['an e-06 stage that ran without its batches', (s) => delete objAt(s['M0-e-06'], 'groups/1/batches')['S3'], /M0-e-06\/groups\/1\/batches\/S3: not an object/],
    ['an e-06 stage the charge table lacks (C-0446)', (s) => {
      objAt(s['M0-e-06'], 'groups/0/stages')['S2'] = { ok: 8, refused: {}, notReached: 0 };
      objAt(s['M0-e-06'], 'groups/0/batches')['S2'] = { committed: 8, refused: 0, maxShare: 0 };
    }, /M0-e-06\/groups\/0 \(relief-60\/default\): stage 'S2' has no row in the stage-charge table/],
    ['a b-04 stage the charge table lacks (C-0446)', (s) => (objAt(s['M0-b-04'], 'work')['stage'] = 'S9'), /M0-b-04\/work .*: stage 'S9' has no row in the stage-charge table/],
    ['a c-06 run the stage table does not know', (s) => (objAt(s['M0-c-06'], 'runs/1')['run'] = 'sliced'), /M0-c-06\/runs\/1\/run: 'sliced' is not a run the stage table knows/],
    ['a c-06 block at a stage its run does not drive (the fusion run has no S6)', (s) => (objAt(s['M0-c-06'], 'runs/0/work/growth.candidates')['stage'] = 'S6'), /M0-c-06\/runs\/0\/work\/growth\.candidates\/stage: the fusion run records growth\.candidates at S6/],
    ['a c-06 timing stamp at a stage its run does not drive', (s) => (objAt(s['M0-c-06'], 'timing/r12_4')['S6'] = { n: 1, p50: 1, p99: 1, p999: 1, max: 1 }), /M0-c-06\/timing\/r12_4\/S6: the fusion run stamped stage S6/],
  ];
  for (const [what, wreck, msg] of cases) {
    it(what, () => {
      const s = summaries();
      expect(() => fit(s), 'control').not.toThrow();
      wreck(s);
      let e: unknown = null;
      try {
        fit(s);
      } catch (x) {
        e = x;
      }
      expect(e).toBeInstanceOf(FitError);
      expect((e as Error).message).toMatch(msg);
    });
  }

  it('a date that is not YYYY-MM-DD', () => {
    expect(() => fitWorkLimits(v2Table(), summaries(), '27/10/2026')).toThrow(FitError);
  });
});

describe('the hit-rate report at the fitted coefficients (§13.2; §5.1 (5)’s Confirmation)', () => {
  it('on the frozen summaries the totals add up over the bounded rows, M0-c-06’s integrated S8 alone is over the target (34 of 33 569), and the unbounded rows fail the report', () => {
    const h = fit().hitRate;
    expect(HIT_RATE_TARGET_PER_THOUSAND).toBe(1);
    const bounded = h.rows.filter((r) => r.unbounded.length === 0);
    expect(bounded.length).toBe(7);
    for (const r of bounded) {
      expect(r.batches).not.toBeNull();
      expect(r.perThousand).toBe(r.batches === 0 ? 0 : (1000 * (r.after ?? NaN)) / (r.batches ?? NaN));
      expect(r.after).toBe(Math.min(r.batches ?? 0, r.counters.reduce((a, c) => a + c.bound, 0)));
    }
    // The 1 000-seed fold of M0-c-06 (J628): the integrated run's S8 cut.candidates max 28.33 reaches its threshold
    // 20.3359 (b-04's p999 13.5572 × 1.5) over 33 569 batches, so its bound is ⌈33 569 / 1 000⌉ = 34 — 1.0128 per 1 000.
    expect(bounded.filter((r) => (r.perThousand ?? 0) > 1).map((r) => `${r.summary} ${r.at} ${r.stage}`)).toEqual(['M0-c-06 runs/1 (integrated) S8']);
    const over = bounded.find((r) => r.summary === 'M0-c-06' && r.at.startsWith('runs/1') && r.stage === 'S8');
    expect([over?.batches, over?.after, over?.perThousand, over?.afterExact]).toEqual([33569, 34, (1000 * 34) / 33569, false]);
    expect(over?.counters.map((c) => [c.counter, c.threshold, c.bound])).toEqual([
      ['cut.candidates', 13.557243478260682 * 1.5, 34],
      ['cut.kernelCalls', 2.100199999999995 * 1.5, 0],
      ['cut.recursionDepth', 4.5, 0],
    ]);
    expect(h.batches).toBe(h.rows.reduce((a, r) => a + (r.batches ?? 0), 0));
    expect(h.after).toBe(bounded.reduce((a, r) => a + (r.after ?? 0), 0));
    expect(h.after).toBe(52);
    expect(h.worstPerThousand).toBe(Math.max(...bounded.map((r) => r.perThousand ?? 0)));
    expect(h.worstPerThousand).toBe((1000 * 34) / 33569);
    expect(h.unbounded.length).toBe(29);
    expect(h.pass).toBe(false);
    // Charged only what their blocks name, no stage is unbounded and the over-target row alone fails the report.
    const b = fitBlocks().hitRate;
    expect([b.pass, b.unbounded.length, b.after, b.worstPerThousand]).toEqual([false, 0, 52, (1000 * 34) / 33569]);
    // With that one max under its threshold (support.ts passingSummaries) the narrowed report passes: the reading before C-0446.
    const p = fitBlocks(passingSummaries()).hitRate;
    expect([p.pass, p.unbounded.length, p.after, p.worstPerThousand]).toEqual([true, 0, 18, 1]);
    for (const r of p.fWork.rows) expect(r.perThousand, `${r.stage}`).toBeLessThanOrEqual(1);
  });

  it('on the frozen summaries M0-e-06’s S3 (route.nodes and the kernel counters) and S5 rows come out unbounded: after null, never 0', () => {
    const h = fit().hitRate;
    const e06 = h.rows.filter((r) => r.summary === 'M0-e-06');
    expect(e06.map((r) => `${r.at} ${r.stage}`)).toEqual(
      ['groups/0 (relief-60/default)', 'groups/1 (relief-60/coarse)', 'groups/2 (relief-3000/default)', 'groups/3 (relief-3000/coarse)'].flatMap((g) => ['S1', 'S3', 'S4', 'S5', 'S6'].map((st) => `${g} ${st}`)),
    );
    for (const r of e06.filter((x) => x.stage === 'S3')) {
      expect(r.unbounded, r.at).toEqual([...KERNEL, 'route.nodes']);
      expect([r.after, r.perThousand, r.afterExact, r.counters], r.at).toEqual([null, null, false, []]);
      expect(r.batches, r.at).toBe({ 'groups/0 (relief-60/default)': 535, 'groups/1 (relief-60/coarse)': 536, 'groups/2 (relief-3000/default)': 587, 'groups/3 (relief-3000/coarse)': 590 }[r.at]);
    }
    for (const r of e06.filter((x) => x.stage === 'S5')) {
      expect(r.unbounded, r.at).toEqual([...KERNEL, 'growth.proposals', 'growth.candidates', 'route.nodes']);
      expect([r.after, r.perThousand, r.afterExact], r.at).toEqual([null, null, false]);
      expect(r.batches, r.at).toBe({ 'groups/0 (relief-60/default)': 1291, 'groups/1 (relief-60/coarse)': 1292, 'groups/2 (relief-3000/default)': 1451, 'groups/3 (relief-3000/coarse)': 1457 }[r.at]);
    }
    // Every group's S4 has its route.nodes block (groups/0: n 50 of 167 batches): the kernel counters alone are missing there.
    const s4 = new Map(e06.filter((x) => x.stage === 'S4').map((r) => [r.at, r]));
    for (const [at, r] of s4) {
      expect(r.unbounded, at).toEqual(KERNEL);
      expect(r.counters.map((c) => c.counter), at).toEqual(['route.nodes']);
    }
    expect([...s4.values()].map((r) => r.batches)).toEqual([167, 167, 186, 187]);
    // The report's own list names every unbounded row with its counters, and nothing else.
    expect(h.unbounded).toEqual(h.rows.filter((r) => r.unbounded.length > 0).map((r) => ({ summary: r.summary, at: r.at, stage: r.stage, counters: r.unbounded })));
    expect(h.unbounded.filter((m) => m.summary === 'M0-e-06' && (m.stage === 'S3' || m.stage === 'S5'))).toHaveLength(8);
    // M0-c-06: its runs' S1, S3, S4 (no block), S5 (growth only) and the integrated S6 are unbounded; S8 is bounded.
    const c06 = h.rows.filter((r) => r.summary === 'M0-c-06');
    expect(c06.map((r) => `${r.at} ${r.stage} ${r.unbounded.length === 0 ? 'bounded' : 'unbounded'}`)).toEqual([
      'runs/0 (fusion) S1 unbounded',
      'runs/0 (fusion) S3 unbounded',
      'runs/0 (fusion) S4 unbounded',
      'runs/0 (fusion) S5 unbounded',
      'runs/0 (fusion) S8 bounded',
      'runs/1 (integrated) S1 unbounded',
      'runs/1 (integrated) S3 unbounded',
      'runs/1 (integrated) S4 unbounded',
      'runs/1 (integrated) S5 unbounded',
      'runs/1 (integrated) S6 unbounded',
      'runs/1 (integrated) S8 bounded',
    ]);
    const c3 = c06.find((r) => r.stage === 'S3');
    expect([c3?.batches, c3?.before, c3?.after, c3?.unbounded]).toEqual([null, null, null, [...KERNEL, 'route.nodes']]);
    expect(c06.find((r) => r.stage === 'S5')?.unbounded).toEqual([...KERNEL, 'route.nodes']);
  });

  it('a block a summary adds for a charged counter is read at its stage and bounds it there; a block of n = 0 does not', () => {
    const s = summaries();
    const work = objAt(s['M0-e-06'], 'groups/0/work');
    for (const c of KERNEL) work[c] = { stage: 'S1', unit: c === 'tx.facesWalked' ? 'faces' : 'vertices', units: { n: 16, p50: 1, p99: 1, p999: 1, max: 1 }, unitsTotal: 16, perUnit: { n: 16, p50: 0.1, p99: 0.1, p999: 0.1, max: 0.1 } };
    let r = fit(s).hitRate.rows.find((x) => x.at.startsWith('groups/0') && x.stage === 'S1');
    expect([r?.unbounded, r?.after, r?.afterExact, r?.counters.length]).toEqual([[], 0, true, 6]);
    // The same block with no sample is no measurement: the counter is unbounded again.
    objAt(s['M0-e-06'], 'groups/0/work/insert.points/perUnit')['n'] = 0;
    r = fit(s).hitRate.rows.find((x) => x.at.startsWith('groups/0') && x.stage === 'S1');
    expect([r?.unbounded, r?.after, r?.perThousand]).toEqual([['insert.points'], null, null]);
    // A c-06 block of n = 0 at a charged counter is unbounded too (never a bound of 0).
    const t = summaries();
    objAt(t['M0-c-06'], 'runs/0/work/cut.kernelCalls/perUnit')['n'] = 0;
    const s8 = fit(t).hitRate.rows.find((x) => x.summary === 'M0-c-06' && x.at.startsWith('runs/0') && x.stage === 'S8');
    expect([s8?.unbounded, s8?.after]).toEqual([['cut.kernelCalls'], null]);
  });

  it('a stage that never ran (notReached in every run, no block) has no row; a stage’s batches are its committed and refused ones', () => {
    const s = summaries();
    objAt(s['M0-e-06'], 'groups/2/stages')['S6'] = { ok: 0, refused: {}, notReached: 8 };
    delete objAt(s['M0-e-06'], 'groups/2/work')['grower.turns'];
    delete objAt(s['M0-e-06'], 'groups/2/work')['field.cells'];
    const rows = fit(s).hitRate.rows.filter((r) => r.at.startsWith('groups/2'));
    expect(rows.map((r) => r.stage)).toEqual(['S1', 'S3', 'S4', 'S5']);
    // A refused-only stage ran: it keeps its row.
    objAt(s['M0-e-06'], 'groups/2/stages')['S5'] = { ok: 0, refused: { E_INVARIANT: 1 }, notReached: 7 };
    expect(fit(s).hitRate.rows.filter((r) => r.at.startsWith('groups/2')).map((r) => r.stage)).toEqual(['S1', 'S3', 'S4', 'S5']);
    objAt(s['M0-e-06'], 'groups/2/batches/S5')['committed'] = 40;
    objAt(s['M0-e-06'], 'groups/2/batches/S5')['refused'] = 7;
    expect(fit(s).hitRate.rows.find((r) => r.at.startsWith('groups/2') && r.stage === 'S5')?.batches).toBe(47);
  });

  it('STAGE_CHARGES holds every base stage’s declared work-limit laws, plus only the charges made outside a declaration', () => {
    const registry = createRegistry();
    registerBase(registry);
    const stages = registry.products.get('base')?.stages ?? [];
    expect(stages.map((st) => stageText(st.id))).toEqual(['S1', 'S3', 'S4', 'S5', 'S6', 'S8']);
    expect([...STAGE_CHARGES.keys()]).toEqual(['S1', 'S3', 'S4', 'S5', 'S6', 'S8']);
    const extra: Record<string, string[]> = { S1: ['hydro.cells'], S3: KERNEL, S4: [], S5: [], S6: ['field.cells'], S8: [] };
    for (const st of stages) {
      const name = stageText(st.id);
      const declared = st.workLimits.map((l) => l.counter);
      const row = STAGE_CHARGES.get(name) ?? [];
      expect([...row].sort(), name).toEqual([...declared, ...extra[name]].sort());
    }
    // Every stage block of the committed summaries lies in the table (M0-k-04's primitives are no stages).
    for (const g of stageGroups(v2Table(), summaries())) {
      if (g.summary === 'M0-k-04') continue;
      for (const b of g.blocks) expect(STAGE_CHARGES.get(g.stage), `${g.summary} ${g.at} ${b.counter}@${g.stage}`).toContain(b.counter);
    }
    expect([...C06_RUN_STAGES.entries()]).toEqual([
      ['fusion', ['S1', 'S3', 'S4', 'S5', 'S8']],
      ['integrated', ['S1', 'S3', 'S4', 'S5', 'S6', 'S8']],
    ]);
  });

  it('the rows: one per stage of every run, group, fixture and primitive, with the recorded hits before', () => {
    const h = fit().hitRate;
    expect(h.rows).toHaveLength(36);
    expect(h.rows.filter((r) => r.unbounded.length === 0).map((r) => `${r.summary} ${r.at} ${r.stage}`)).toEqual([
      'M0-c-06 runs/0 (fusion) S8',
      'M0-c-06 runs/1 (integrated) S8',
      'M0-b-04 work (one-face districts, CITY block scale) S8',
      'M0-k-04 primitives/corridorUnion corridorUnion',
      'M0-k-04 primitives/insertChain insertChain',
      'M0-k-04 primitives/skeleton skeleton',
      'M0-k-04 primitives/splitFace splitFace',
    ]);
    const by = new Map(h.rows.map((r) => [`${r.summary} ${r.at} ${r.stage}`, r]));
    expect(by.get('M0-c-06 runs/0 (fusion) S8')?.batches).toBe(31780);
    expect(by.get('M0-c-06 runs/1 (integrated) S8')?.batches).toBe(33569);
    expect(by.get('M0-e-06 groups/0 (relief-60/default) S1')?.batches).toBe(400);
    expect(by.get('M0-e-06 groups/0 (relief-60/default) S4')?.batches).toBe(167);
    expect(by.get('M0-b-04 work (one-face districts, CITY block scale) S8')?.before).toBeNull();
    expect(by.get('M0-k-04 primitives/splitFace splitFace')?.batches).toBe(8576);
    expect(by.get('M0-k-04 primitives/splitFace splitFace')?.after).toBe(8);
    expect(by.get('M0-k-04 primitives/corridorUnion corridorUnion')?.after).toBe(10);
    expect(h.before).toBe(0);
    // Unrecorded: M0-b-04's fixture and M0-c-06's seven stages without a block.
    expect(h.beforeUnrecorded).toBe(8);
    expect(h.batches).toBe(121321);
    for (const r of h.rows) if (r.after === 0) expect(r.afterExact, `${r.at}`).toBe(true);
    // The stage spikes run at CITY; M0-k-04's kernel fuzz has no rung and stays out of the FWorkReport.
    for (const r of h.rows) expect(r.rung).toBe(r.summary === 'M0-k-04' ? null : 'CITY');
    expect(h.fWork.batches).toBe(h.rows.filter((r) => r.rung !== null).reduce((a, r) => a + (r.batches ?? 0), 0));
    expect(h.fWork.rows.map((r) => `${r.stage} ${r.rung} ${r.position}`)).toEqual(['S1 CITY target', 'S3 CITY target', 'S4 CITY target', 'S5 CITY target', 'S6 CITY target', 'S8 CITY target']);
    // An unbounded row counts every batch as cut in the worst case: S3's fWork row is 1 000 per 1 000.
    expect(h.fWork.rows.find((r) => r.stage === 'S3')).toMatchObject({ batches: 535 + 536 + 587 + 590, workCuts: 2248, perThousand: 1000 });
    expect(h.fWork.rows.find((r) => r.stage === 'S8')).toMatchObject({ batches: 31780 + 33569 + 1500, workCuts: 34 });
  });

  it('the recorded hits before are the summaries’ own counts: c-06 limitHits, e-06 E_WORK_LIMIT refusals, k-04 workLimitHits', () => {
    const s = summaries();
    objAt(s['M0-c-06'], 'runs/0/work/cut.candidates')['limitHits'] = 2;
    objAt(s['M0-c-06'], 'runs/0/work/cut.kernelCalls')['limitHits'] = 1;
    objAt(s['M0-e-06'], 'groups/1/stages/S4/refused')['E_WORK_LIMIT'] = 3;
    objAt(s['M0-e-06'], 'groups/0/stages/S3/refused')['E_WORK_LIMIT'] = 5;
    objAt(s['M0-k-04'], 'primitives/splitFace')['workLimitHits'] = 4;
    const h = fit(s).hitRate;
    const by = new Map(h.rows.map((r) => [`${r.summary} ${r.at} ${r.stage}`, r]));
    expect(by.get('M0-c-06 runs/0 (fusion) S8')?.before).toBe(3);
    expect(by.get('M0-e-06 groups/1 (relief-60/coarse) S4')?.before).toBe(3);
    expect(by.get('M0-e-06 groups/0 (relief-60/default) S3')?.before).toBe(5);
    expect(by.get('M0-k-04 primitives/splitFace splitFace')?.before).toBe(4);
    expect(h.before).toBe(15);
  });

  it('a counter’s bound counts only where its block’s max reaches the threshold, and a stage over the target fails the report', () => {
    const base = fit().hitRate.rows.find((r) => r.stage === 'corridorUnion');
    // tx.facesWalked: p999 17 → threshold 25.5 = the block's max → ⌈10 000 / 1 000⌉; every other counter's max is under its threshold.
    expect(base?.counters.map((c) => [c.counter, c.threshold, c.bound])).toEqual([
      ['insert.attractQueries', 251.25, 0],
      ['insert.crossings', 2.25, 0],
      ['insert.placementCandidates', 3, 0],
      ['insert.points', 36, 0],
      ['tx.facesWalked', 25.5, 10],
    ]);
    // insert.points' max raised to its threshold (36): ⌈8 576 / 1 000⌉ = 9 more → 19 of 10 000 = 1.9 per 1 000 > 1 (on the
    // passing variant: the frozen summaries with M0-c-06's one over-target max under its threshold, support.ts).
    const s = passingSummaries();
    objAt(s['M0-k-04'], 'primitives/corridorUnion/work/insert.points')['max'] = 36;
    const h = fitBlocks(s).hitRate;
    const cu = h.rows.find((r) => r.stage === 'corridorUnion');
    expect(cu?.after).toBe(19);
    expect(cu?.perThousand).toBe(1.9);
    expect(h.pass).toBe(false);
    expect(h.unbounded).toEqual([]);
    expect(h.worstPerThousand).toBe(1.9);
    // Just under the threshold: no bound.
    objAt(s['M0-k-04'], 'primitives/corridorUnion/work/insert.points')['max'] = 35.999;
    expect(fitBlocks(s).hitRate.pass).toBe(true);
    // The worst is the largest bounded row's rate, below 1 too: corridorUnion's tx.facesWalked under its threshold leaves
    // splitFace's 8 of 8 576 the worst.
    objAt(s['M0-k-04'], 'primitives/corridorUnion/work/tx.facesWalked')['max'] = 25.499;
    const w = fitBlocks(s).hitRate;
    expect(w.rows.find((r) => r.stage === 'corridorUnion')?.after).toBe(0);
    expect(w.worstPerThousand).toBe((1000 * 8) / 8576);
    expect(fit(s).hitRate.worstPerThousand).toBe((1000 * 8) / 8576);
    // A small stage: M0-e-06's groups/0 S4 ran 167 batches, 50 of them charged route.nodes; a max at the threshold
    // (p999 2.0512 × 1.5) bounds ⌈50 / 1 000⌉ = 1 of 167.
    const t = summaries();
    objAt(t['M0-e-06'], 'groups/0/work/route.nodes/perUnit')['max'] = 3.076830551068716;
    const e = fitBlocks(t).hitRate.rows.find((r) => r.summary === 'M0-e-06' && r.at.startsWith('groups/0') && r.stage === 'S4');
    expect([e?.batches, e?.after, e?.perThousand, e?.afterExact]).toEqual([167, 1, 1000 / 167, false]);
  });

  it('a floored row’s threshold is min(perUnit, floor): skeleton.events’ block reaching 8 per vertex (under its floor 64) is counted', () => {
    // A batch of u vertices reaches 64 + 8 u with work per vertex ≥ 8 + 64 / u, which falls to 8 as u grows: 8, not 64, is the
    // least work per unit that can reach the law, so a block whose max is 20 per vertex may hold hits.
    const s = summaries();
    objAt(s['M0-k-04'], 'primitives/skeleton/work/skeleton.events')['max'] = 20;
    const r = fit(s);
    expect([counter(r, 'skeleton.events').after.perUnit, counter(r, 'skeleton.events').after.floor]).toEqual([8, 64]);
    const sk = r.hitRate.rows.find((x) => x.stage === 'skeleton');
    expect(sk?.counters.map((c) => [c.counter, c.threshold, c.bound])).toEqual([['skeleton.events', 8, 10]]);
    expect([sk?.after, sk?.afterExact]).toEqual([10, false]);
  });

  it('a stage’s bound never exceeds its batches (several counters over their thresholds in one small stage)', () => {
    const groups = stageGroups(v2Table(), summaries());
    const fits = fit().counters;
    const g = groups.find((x) => x.summary === 'M0-e-06' && x.at.startsWith('groups/0') && x.stage === 'S4');
    if (g === undefined) throw new Error('no S4 group');
    expect(g.batches).toBe(167);
    const hot = (c: string): (typeof g.blocks)[number] => {
      const b = g.blocks[0];
      const f = fits.find((x) => x.counter === c);
      if (f === undefined) throw new Error(c);
      const t = Math.min(f.after.perUnit, f.after.floor);
      return { ...b, counter: c, perUnit: { n: 167, p50: 0, p99: 0, p999: t, max: t } };
    };
    const crowded = { ...g, charged: [], blocks: [hot('route.nodes'), hot('field.cells'), hot('hydro.cells')] };
    const row = hitRates([crowded], fits).rows[0];
    expect(row.counters.map((c) => c.bound)).toEqual([167, 167, 167]);
    expect([row.after, row.perThousand]).toEqual([167, 1000]);
  });

  it('M0-b-04’s batches are the districts it states, where they exceed a block’s sample', () => {
    const s = summaries();
    objAt(s['M0-b-04'], 'work/counters/cut.candidates')['districts'] = 2000;
    const row = fit(s).hitRate.rows.find((x) => x.summary === 'M0-b-04');
    expect(row?.batches).toBe(2000);
    expect(fit().hitRate.rows.find((x) => x.summary === 'M0-b-04')?.batches).toBe(1500);
  });
});

/** C-0091's quantiles of a sample by the type-7 rule (M0-c-06, M0-e-06, M0-b-04: `quantile7`). */
function type7(values: readonly number[]): WorkQuantiles {
  const s = [...values].sort((a, b) => a - b);
  return { n: s.length, p50: quantile7(s, 0.5), p99: quantile7(s, 0.99), p999: quantile7(s, 0.999), max: s[s.length - 1] };
}

/** The nearest-rank rule (M0-k-04's runner). */
function nearest(values: readonly number[]): WorkQuantiles {
  const s = [...values].sort((a, b) => a - b);
  const r = (q: number): number => s[Math.min(s.length - 1, Math.max(0, Math.ceil(q * s.length) - 1))];
  return { n: s.length, p50: r(0.5), p99: r(0.99), p999: r(0.999), max: s[s.length - 1] };
}

describe('hitBound is sound (fast-check, PLAT_FUZZ_RUNS)', () => {
  it('the bound’s three cases', () => {
    const q = { n: 2500, p50: 1, p99: 2, p999: 3, max: 10 };
    expect(hitBound(q, 10.5)).toBe(0);
    expect(hitBound(q, 10)).toBe(3);
    expect(hitBound(q, 3.000001)).toBe(3);
    expect(hitBound(q, 3)).toBe(2500);
    expect(hitBound({ ...q, n: 0 }, 1)).toBe(0);
    expect(hitBound({ ...q, n: 1000 }, 4)).toBe(1);
    expect(hitBound({ ...q, n: 1001 }, 4)).toBe(2);
  });

  it('no sample has more batches at or over the fitted law floor + k × u (k = p999 × 1.5, floor = k) than the bound, under both quantile rules', () => {
    const batch = fc.record({ units: fc.oneof(fc.constant(0), fc.integer({ min: 1, max: 5000 }), fc.double({ min: 0, max: 50, noNaN: true })), perUnit: fc.oneof(fc.double({ min: 0, max: 4, noNaN: true }), fc.double({ min: 0, max: 400, noNaN: true })) });
    fc.assert(
      fc.property(fc.array(batch, { minLength: 1, maxLength: 3000 }), fc.boolean(), (rows, rule) => {
        const values = rows.map((r) => r.perUnit);
        const q = rule ? type7(values) : nearest(values);
        const k = q.p999 * 1.5;
        let hits = 0;
        for (const r of rows) {
          const work = r.perUnit * Math.max(1, r.units);
          if (work >= k + k * r.units) hits += 1;
        }
        if (k > 0) expect(hits).toBeLessThanOrEqual(hitBound(q, Math.min(k, k)));
      }),
    );
  });

  it('the bound holds for a law with a larger floor (skeleton.events’ 64 + 8 u): threshold min(perUnit, floor)', () => {
    fc.assert(
      fc.property(fc.array(fc.record({ units: fc.integer({ min: 0, max: 200 }), perUnit: fc.double({ min: 0, max: 20, noNaN: true }) }), { minLength: 1, maxLength: 2000 }), (rows) => {
        const q = type7(rows.map((r) => r.perUnit));
        let hits = 0;
        for (const r of rows) if (r.perUnit * Math.max(1, r.units) >= 64 + 8 * r.units) hits += 1;
        expect(hits).toBeLessThanOrEqual(hitBound(q, Math.min(8, 64)));
      }),
    );
  });
});

describe('the summaries the fit reads', () => {
  it('are the four of C-0091, in its order', () => {
    expect([...SUMMARY_IDS]).toEqual(['M0-c-06', 'M0-e-06', 'M0-b-04', 'M0-k-04']);
  });

  it('the pins read the frozen copies (fixtures/summaries/), byte for byte the files their sha256 names: a re-freeze is a declared change (Q134)', () => {
    expect(Object.keys(FIXTURE_SHA256)).toEqual([...SUMMARY_IDS]);
    for (const id of SUMMARY_IDS) {
      const path = inputPath(id, FIXTURE_DIR);
      expect(path.split(/[\\/]/).slice(-4).join('/'), id).toBe(`worklimits/fixtures/summaries/${id}.json`);
      expect(SUMMARY_TEXTS[id], id).toBe(readFileSync(path, 'utf8'));
      expect(sha256(SUMMARY_TEXTS[id]), id).toBe(FIXTURE_SHA256[id]);
    }
  });
});
