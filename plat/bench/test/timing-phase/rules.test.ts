// M0-t-00's rule tests on FIXTURE bars: the ±15 % rule between the Node and the Chromium-worker figure (C-0082); R12-4's
// rows each with a p50 reported against its §12.4 figure (C-0084); a kernel bar's miss naming C-0098's next step; the
// S11 row naming M0-k-04's workload file and its per-plot call list (C-0107); the protocol — a contended batch re-queued
// and never recorded as a result, the bound, the normalisation — and the bar list read from M0-work.json, its budgets
// parsed from the rows' own text (no bar written twice).
import { readFileSync } from 'node:fs';
import { afterAll, describe, expect, it } from 'vitest';
import {
  BAR_DEFS,
  crossEngine,
  foldFigure,
  ladderOf,
  MAX_REQUEUES,
  nextBlockSize,
  quantile,
  readTimingBars,
  resolveBars,
  runGroup,
  S11_WORKLOAD_FILE,
  timingPhase,
  WORK_PATH,
  type BarRecord,
  type BatchHarness,
  type FigureSpec,
  type TimingsRecord,
} from '../../src/timing-phase/index.js';
import { fixtureContext, fixtureGroups, planted, removeScratch, S11_CALLS, stamp, type Plants } from './fixtures.js';

afterAll(() => removeScratch());

const barsOf = async (plants: Partial<Plants>, args: string[] = []): Promise<Map<string, BarRecord>> => {
  const c = fixtureContext({ plants });
  const o = await timingPhase(args, c);
  if (o.kind !== 'ran') throw new Error(`expected a run, got ${o.kind}`);
  const r = JSON.parse(readFileSync(c.recordPath, 'utf8')) as TimingsRecord;
  return new Map((args.length === 0 ? r.bars : r.rerun[0].bars).map((b) => [b.id, b]));
};

describe('the ±15 % rule (§12.1; C-0082): the fusion and site bars carry a Node and a Chromium-worker figure and the checked one', () => {
  it('a planted 20 % gap checks the Chromium figure; a 10 % gap the Node one; both are reported', async () => {
    const wide = await barsOf({ fusionGate: 80, fusionCall: 100, fusionChromiumCall: 120, siteGate: 40, siteCall: 100, siteChromiumCall: 80 }, ['--only', 'fusion,site']);
    const f = wide.get('fusion')?.figures[0];
    expect(f?.crossEngine).toMatchObject({ node: 80, gap: 0.2, checked: 'chromium-worker' });
    expect(f?.crossEngine?.chromium).toBeCloseTo(96, 9);
    expect(f?.value).toBeCloseTo(96, 9);
    const s = wide.get('site')?.figures ?? [];
    expect(s).toHaveLength(2);
    for (const x of s) {
      expect(x.crossEngine).toMatchObject({ node: 40, checked: 'chromium-worker' });
      expect(x.crossEngine?.gap).toBeCloseTo(0.2, 12);
      expect(x.value).toBeCloseTo(32, 9);
    }
    const near = await barsOf({ fusionGate: 80, fusionCall: 100, fusionChromiumCall: 110, siteGate: 40, siteCall: 100, siteChromiumCall: 90 }, ['--only', 'fusion,site']);
    const g = near.get('fusion')?.figures[0];
    expect(g?.crossEngine).toMatchObject({ node: 80, checked: 'node' });
    expect(g?.crossEngine?.chromium).toBeCloseTo(88, 9);
    expect(g?.value).toBe(80);
    for (const x of near.get('site')?.figures ?? []) expect(x.value).toBe(40);
  });

  it('the boundary: exactly 15 % apart checks Node; just past it checks Chromium (either side)', () => {
    expect(crossEngine(50, 100, 115).checked).toBe('node');
    expect(crossEngine(50, 100, 85).checked).toBe('node');
    expect(crossEngine(50, 100, 115.01).checked).toBe('chromium-worker');
    expect(crossEngine(50, 100, 84.99).checked).toBe('chromium-worker');
  });

  it('the checked figure is the one judged: a Chromium figure over the budget is a miss although Node passes', async () => {
    const b = await barsOf({ fusionGate: 90, fusionCall: 100, fusionChromiumCall: 125 }, ['--only', 'fusion']);
    const fusion = b.get('fusion');
    expect(fusion?.figures[0].crossEngine?.node).toBe(90);
    expect(fusion?.verdict).toBe('miss');
    expect(fusion?.factor).toBeCloseTo(1.125, 9);
    expect(fusion?.fallback).toContain('extramural growth stops at secondary');
    expect(fusion?.ladder).toBeNull(); // not a kernel bar
  });

  it('a missing Chromium leg leaves the gate unmeasured (never judged on Node alone)', async () => {
    const c = fixtureContext();
    const groups = fixtureGroups();
    groups['fusion:chromium'] = planted('fusion:chromium', [{ samples: {}, leg: 'chromium-worker' }]);
    const o = await timingPhase(['--only', 'fusion'], { ...c, groups });
    if (o.kind !== 'ran') throw new Error(o.kind);
    expect(o.bars[0].verdict).toBe('unmeasured');
    expect(o.bars[0].figures[0].why).toMatch(/both legs/);
    expect(o.code).toBe(1);
  });
});

describe("R12-4's rows (C-0084): every §12.4 row of M0's stages has a p50 in the record, reported against its figure", () => {
  it('S1, the S3 slice (the 16 ms row quoted), S4, S5, S6 + fields and S8 — each a p50, reported, an exceeding row flagged', async () => {
    const b = await barsOf({ fusionStages: { S1: 4, S3: 12, S4: 8, S5: 35, S8: 18 }, siteStages: { S1: 20, S3: 10, S4: 11, S6: 15 } });
    const r = b.get('r12-4');
    expect(r?.role).toBe('reported');
    expect(r?.verdict).toBe('reported');
    const want: [string, number, number, boolean][] = [
      ['S1 (site relief-60)', 20, 25, false],
      ['S1 (site relief-3000)', 20, 25, false],
      ['the S3 slice (fusion)', 12, 11, true],
      ['the S3 slice (site relief-60)', 10, 11, false],
      ['the S3 slice (site relief-3000)', 10, 11, false],
      ['S4 (fusion)', 8, 10, false],
      ['S4 (site relief-60)', 11, 10, true],
      ['S4 (site relief-3000)', 11, 10, true],
      ['S5 (fusion)', 35, 40, false],
      ['S6 + fields (site relief-60)', 15, 17, false],
      ['S6 + fields (site relief-3000)', 15, 17, false],
      ['S8 (fusion)', 18, 20, false],
    ];
    expect(r?.figures.map((f) => [f.name, f.value, f.budget, f.exceeds])).toEqual(want);
    for (const f of r?.figures ?? []) {
      expect(f.reduce).toBe('p50');
      expect(f.verdict).toBe('reported');
    }
    expect(r?.figures.filter((f) => f.name.startsWith('the S3 slice')).every((f) => f.quoted === "the S2 / S3 row's 16 ms")).toBe(true);
    expect(r?.fallback).toContain('restated at the measured value by M0-x-01');
  });

  it('--only r12-4 runs the two gates\' Node legs only (the same runs\' stamps), never their Chromium legs', async () => {
    const runs: string[] = [];
    const c = fixtureContext({ runs });
    await timingPhase(['--only', 'r12-4'], c);
    expect(runs).toEqual(['fusion:node#0', 'site:node#0']);
  });
});

describe("C-0098: every kernel bar's miss row names the ladder's next step", () => {
  it('insert (2×), splitFace (2.5×), corridorUnion, S11 and the skeleton: miss by factor, the fallback and the ladder', async () => {
    const b = await barsOf({ insert: 16, splitFace: 30, district: 4.5, s11: [9, 9, 9], roof: 21 });
    const check = (id: string, factor: number, branch: RegExp, third: RegExp): void => {
      const x = b.get(id);
      expect(x?.verdict, id).toBe('miss');
      expect(x?.kernel, id).toBe(true);
      expect(x?.factor, id).toBeCloseTo(factor, 9);
      expect(x?.ladder?.rule).toBe('C-0098');
      expect(x?.ladder?.next).toMatch(/^one optimisation pass — a T-fix round of the owning item, re-measured in T2 \(C-0080\); then /);
      expect(x?.ladder?.next).toMatch(branch);
      expect(x?.ladder?.steps[2]).toMatch(third);
      // the row's own miss rule (the skeleton's is §3.8's repair pass and downgrades; C-0440 (7)) beside C-0098's ladder
      expect(x?.fallback).toMatch(id === 'skeleton' ? /^one repair pass, then the downgrades become the defaults \(§3\.8\)/ : /^C-0098's ladder/);
      expect(x?.appliedBy).toBe(x?.code);
    };
    check('insert', 2, /≤ 2×: the measured cost carried into its §12\.4 row/, /D-18/);
    check('splitFace', 2.5, /> 2×: the WebAssembly accelerator/, /D-18/);
    check('corridorUnion', 1.5, /≤ 2×/, /Clipper2 compiled to WebAssembly as the only engine/);
    check('s11', 3, /> 2×/, /Clipper2/);
    check('skeleton', 1.05, /≤ 2×/, /D-18/);
    expect(b.get('corridorUnion')?.ladder?.steps).toHaveLength(4);
    expect(b.get('insert')?.ladder?.steps).toHaveLength(3);
    // a passing kernel bar names no step; a non-kernel miss takes its own fallback, not the ladder
    const ok = await barsOf({ streamKey: 0.3 });
    expect(ok.get('insert')?.ladder).toBeNull();
    expect(ok.get('streamKey')?.verdict).toBe('miss');
    expect(ok.get('streamKey')?.ladder).toBeNull();
    expect(ok.get('streamKey')?.fallback).toBe('the vectorised batch derivation (§6.1; output-neutral)');
  });

  it('the ladder by factor: exactly 2× is the amendment branch, past 2× the accelerator', () => {
    expect(ladderOf({ arrangement: false }, 2).steps[1]).toMatch(/^≤ 2×/);
    expect(ladderOf({ arrangement: false }, 2.0001).steps[1]).toMatch(/^> 2×/);
  });
});

describe('the S11 row (C-0107) names M0-k-04\'s workload file and its per-plot call list', () => {
  it('the bar\'s workload and entry name bench/src/fuzz-bar/s11Workload.ts; the call list is the workload\'s', async () => {
    const b = await barsOf({}, ['--only', 's11']);
    const s = b.get('s11');
    expect(S11_WORKLOAD_FILE).toBe('bench/src/fuzz-bar/s11Workload.ts');
    expect(s?.workload).toContain(S11_WORKLOAD_FILE);
    expect(s?.entry).toContain(S11_WORKLOAD_FILE);
    expect(s?.workload).toMatch(/one offsetFace, one obb and one lir fit, the yard splits, one L4 insertChain/);
    expect(s?.extras[0]).toMatchObject({ workloadFile: S11_WORKLOAD_FILE, callList: S11_CALLS });
    expect(s?.figures[0]).toMatchObject({ value: 2, budget: 3, verdict: 'pass' }); // the median of the per-plot samples
  });
});

describe('the protocol (C-0047, C-0097): a contended batch is re-queued, never recorded as a result', () => {
  const h: BatchHarness = { timeBatch: () => Promise.reject(new Error('unused')), options: {}, own: () => undefined };

  it('a contended batch re-queued behind the others and re-run; its samples never pooled; the accepted ones normalised', async () => {
    const runs: string[] = [];
    const g = planted(
      'x',
      [
        [{ samples: { k: [999] }, stamp: { authority: 'contended', reasons: ['process: node (node, pid 7)'] } }, { samples: { k: [10] }, stamp: { normalisation: 2 } }],
        { samples: { k: [6] } },
      ],
      runs,
    );
    const r = await runGroup(g, h);
    expect(runs).toEqual(['x#0', 'x#1', 'x#0']);
    expect(r.requeued).toBe(1);
    expect(r.dropped).toBe(0);
    expect(r.batches.map((b) => b.fate)).toEqual(['requeued', 'accepted', 'accepted']);
    expect(r.pools.get('k')).toEqual([{ raw: 6, norm: 1 }, { raw: 10, norm: 2 }]);
    const spec: FigureSpec = { name: 'k', key: 'k', unit: 'ms', budget: 8, comparator: '≤', reduce: 'p50', normalise: true, role: 'gating' };
    expect(foldFigure(spec, r.pools, true)).toMatchObject({ value: 5, verdict: 'pass', n: 2 });
    expect(foldFigure({ ...spec, normalise: false }, r.pools, true)).toMatchObject({ value: 6 });
  });

  it('at most MAX_REQUEUES re-queues, then dropped: the bar unmeasured, exit 1 (re-run it with --only)', async () => {
    expect(MAX_REQUEUES).toBe(2);
    const runs: string[] = [];
    const contended = { samples: { insert: [1] }, stamp: { authority: 'contended' as const, reasons: ['load average 3.00 > 1.5'] } };
    const c = fixtureContext({ runs });
    const groups = { ...fixtureGroups(), insert: planted('insert', [[contended, contended, contended, { samples: { insert: [5] } }]], runs) };
    const o = await timingPhase(['--only', 'insert'], { ...c, groups });
    if (o.kind !== 'ran') throw new Error(o.kind);
    expect(runs).toEqual(['insert#0', 'insert#0', 'insert#0']);
    expect(o.bars[0].verdict).toBe('unmeasured');
    expect(o.bars[0].figures[0].value).toBeNull();
    expect(o.bars[0].dropped).toBe(1);
    expect(o.bars[0].requeued).toBe(2);
    expect(o.code).toBe(1);
  });

  it('a bar whose group dropped one batch is unmeasured though another batch was accepted: never judged on part of its work', async () => {
    const contended = { samples: { insert: [1] }, stamp: { authority: 'contended' as const, reasons: ['process: node (node, pid 7)'] } };
    const c = fixtureContext();
    const groups = { ...fixtureGroups(), insert: planted('insert', [{ samples: { insert: [5] } }, [contended, contended, contended]]) };
    const o = await timingPhase(['--only', 'insert'], { ...c, groups });
    if (o.kind !== 'ran') throw new Error(o.kind);
    expect(o.bars[0].batches.map((b) => b.fate)).toEqual(['accepted', 'requeued', 'requeued', 'dropped']);
    expect(o.bars[0].figures[0]).toMatchObject({ value: null, verdict: 'unmeasured', n: 1 });
    expect(o.bars[0].figures[0].why).toMatch(/a batch of its group was dropped/);
    expect(o.bars[0].verdict).toBe('unmeasured');
    expect(o.code).toBe(1);
  });

  it('built readings, or no normalisation, are never a result either', async () => {
    for (const s of [{ readings: 'built' as const }, { normalisation: null }]) {
      const r = await runGroup(planted('y', [[{ samples: { k: [1] }, stamp: s }]]), h);
      expect(r.batches.map((b) => b.fate)).toEqual(['requeued', 'requeued', 'dropped']);
      expect(r.pools.size).toBe(0);
    }
  });

  it('a batch that throws is dropped naming its error; the group goes on', async () => {
    const g = { id: 'z', plans: [{ label: 'boom', run: () => Promise.reject(new Error('the leg did not run')) }, { label: 'ok', run: () => Promise.resolve({ stamp: stamp(), samples: { k: [3] } }) }] };
    const r = await runGroup(g, h);
    expect(r.dropped).toBe(1);
    expect(r.batches[0]).toMatchObject({ fate: 'dropped', error: 'the leg did not run' });
    expect(r.pools.get('k')).toEqual([{ raw: 3, norm: 1 }]);
  });

  it('adaptive blocks: the first block is one item, the next sized to ≈ 40 s at the last rate, a re-queued block behind the fresh ones', async () => {
    const blocks: number[][] = [];
    let n = 0;
    const g = {
      id: 'b',
      blocks: {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        make: (block: readonly number[]) => ({
          label: `block ${block.join(',')}`,
          run: () => {
            blocks.push([...block]);
            n += 1;
            return Promise.resolve({ stamp: stamp({ wallMs: block.length * 8_000, ...(n === 2 ? { authority: 'contended' as const } : {}) }), samples: { k: block.map(() => 1) } });
          },
        }),
      },
    };
    const r = await runGroup(g, h);
    expect(blocks).toEqual([[1], [2, 3, 4, 5, 6], [7, 8, 9, 10, 11], [12], [2, 3, 4, 5, 6]]);
    expect(r.pools.get('k')).toHaveLength(12);
    expect(nextBlockSize(null, 0, 10)).toBe(1);
    expect(nextBlockSize(60_000, 1, 10)).toBe(1);
    expect(nextBlockSize(1_000, 1, 10)).toBe(10);
    expect(nextBlockSize(1_000, 1, 0)).toBe(0);
  });

  it('the quantiles are nearest-rank: the p50 the lower middle of an even count, the p95 near the top', () => {
    expect(quantile([4, 1, 3, 2], 0.5)).toBe(2);
    expect(quantile([5], 0.95)).toBe(5);
    expect(quantile(Array.from({ length: 100 }, (_, i) => i + 1), 0.95)).toBe(95);
    expect(quantile([], 0.5)).toBeNull();
  });
});

describe("the bar list is M0-work.json's timingBars (no bar written twice): ids, budgets parsed from the rows' text", () => {
  const rows = readTimingBars();

  it('each row resolves to exactly one bar; a budget changed in the row changes the judged figure', () => {
    const r = resolveBars(rows);
    expect(r.map((x) => x.row)).toEqual(rows);
    const budgets = Object.fromEntries(r.map((x) => [x.id, x.figures.map((f) => f.budget)]));
    expect(budgets).toEqual({
      insert: [8],
      splitFace: [12],
      corridorUnion: [3, 25],
      s11: [3],
      skeleton: [20, 20],
      streamKey: [0.1],
      digest: [5, 5, 150],
      matching: [2, 20, 2, 20],
      fusion: [100, 100],
      site: [50, 50],
      hydrology: [16, 16],
      tiers: [15, 15, 4, 12],
      'r12-4': [25, 25, 11, 11, 11, 10, 10, 10, 40, 17, 17, 20],
    });
    const edited = rows.map((x) => (x.bar.startsWith('insert') ? { ...x, bar: x.bar.replace('≤ 8 µs', '≤ 9.5 µs') } : x));
    expect(resolveBars(edited)[0].figures[0].budget).toBe(9.5);
  });

  it('a row no bar recognises, a row twice, a bar without its row, or a row that states no budget is refused before anything runs', () => {
    expect(() => resolveBars([...rows, { ...rows[0], bar: 'a new bar ≤ 1 ms' }])).toThrow(/recognised by no bar/);
    expect(() => resolveBars([...rows, rows[0]])).toThrow(/two timingBars rows are the bar insert/);
    expect(() => resolveBars(rows.slice(1))).toThrow(/no timingBars row for insert/);
    expect(() => resolveBars(rows.map((x, i) => (i === 0 ? { ...x, bar: 'insert + snap + attract + re-walk per growth proposal' } : x)))).toThrow(/states no per-proposal budget/);
    expect(BAR_DEFS).toHaveLength(rows.length);
  });

  it('the file read is the work file; the rows hold every field the record copies', () => {
    const raw = JSON.parse(readFileSync(WORK_PATH, 'utf8')) as { timingBars: unknown[] };
    expect(rows).toEqual(raw.timingBars);
  });
});
