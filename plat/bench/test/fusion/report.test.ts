// M0-c-06's listed test "the harness reproduces its report byte for byte (seeded)", and the report's verdicts: each
// here-bar clause judged on the folded seed records — one planted fault at a time fails exactly its clause.
import { describe, expect, it } from 'vitest';
import { BAR_SEEDS, binsCliff, foldReport, foldStamps, foldWork, fusion, JUNCTION, longRunOf, summaryOf, tasksOf, type FusionSizes, type SeedRecord } from '../../src/fusion/index.js';
import { goodRecord, TEST_SIZE } from './support.js';

const SIZES: FusionSizes = { from: 1, seeds: 2, runs: ['fusion', 'integrated'], frameHa: null, walledHa: null };

function both(seed: number, over: Partial<SeedRecord> = {}, overIntegrated: Partial<SeedRecord> = over): SeedRecord[] {
  return [goodRecord(seed, 'fusion', { rootS5: `s5-${String(seed)}`, ...over }), goodRecord(seed, 'integrated', { rootS5: `s5-${String(seed)}`, ...overIntegrated })];
}

function failing(records: readonly SeedRecord[]): string[] {
  const r = foldReport(SIZES, records);
  return Object.entries(r.verdicts)
    .filter(([, v]) => v === false)
    .map(([k]) => k)
    .sort();
}

describe('the report’s verdicts (one planted fault per clause)', () => {
  it('good records pass every clause', () => {
    const r = foldReport(SIZES, [...both(1), ...both(2)]);
    expect(r.verdicts).toEqual({ restarts: true, bugs: true, cliff: true, junction: true, drift: true, roads: true, strips: true, s8s9: true, corpus: true, sharedS5: true });
    expect(r.pass).toBe(true);
    expect(r.sharedS5).toEqual({ compared: 2, equal: 2 });
  });

  it('restarts: one restart, or S5 out of sequence, or two top-ups in a stage', () => {
    expect(failing([...both(1), ...both(2, { restarts: 1 })])).toEqual(['restarts']);
    expect(failing([...both(1), ...both(2, { s5: { growth: [1, 2, 2, 3], prune: [1, 2, 3], capacity: [1, 2, 3], topUps: [0, 0, 0] } })])).toEqual(['restarts']);
    expect(failing([...both(1), ...both(2, { s5: { growth: [1, 2, 3], prune: [1, 2, 3], capacity: [1, 2, 3], topUps: [0, 2, 0] } })])).toEqual(['restarts']);
    expect(failing([...both(1), ...both(2, { s5: { growth: [1, 2, 3], prune: [1, 3], capacity: [1, 2, 3], topUps: [0, 0, 0] } })])).toEqual(['restarts']);
  });

  it('bugs: one bug entry', () => {
    expect(failing([...both(1), ...both(2, { bugs: ['S8:E_INVARIANT'] })])).toEqual(['bugs']);
  });

  it('cliff: a seed with a cliff, or a pooled histogram that stops abruptly', () => {
    expect(failing([...both(1), ...both(2, { turns: { ...goodRecord(2, 'fusion').turns, cliff: true } })])).toEqual(['cliff']);
    const bins = new Array<number>(40).fill(0);
    for (let i = 0; i < 20; i += 1) bins[i] = 100;
    // bin 19 holds 100 / 2 000 = 5 % and bin 20 is empty: a cliff above 15°
    expect(binsCliff(bins, 2_000)).toBe(true);
    expect(failing([...both(1, { turns: { steps: 2_000, bins, cliff: false } }), ...both(2, { turns: { steps: 2_000, bins, cliff: false } })])).toEqual(['cliff']);
    // below 15° an empty bin is no cliff; above it a bin below at exactly 1 % is none either
    const low = new Array<number>(40).fill(0);
    for (let i = 0; i < 10; i += 1) low[i] = 100;
    expect(binsCliff(low, 1_000)).toBe(false);
    const edge = new Array<number>(40).fill(0);
    edge[0] = 990;
    edge[20] = 10;
    expect(binsCliff(edge, 1_000)).toBe(false);
    edge[20] = 11;
    expect(binsCliff(edge, 1_001)).toBe(true);
    // the first bin judged is 15° (bin 15 empty under a full bin 14); bin 14 empty under bin 13 is below the clause
    const at15 = new Array<number>(40).fill(0);
    for (let i = 0; i < 15; i += 1) at15[i] = 100;
    expect(binsCliff(at15, 1_500)).toBe(true);
    const at14 = new Array<number>(40).fill(0);
    for (let i = 0; i < 14; i += 1) at14[i] = 100;
    expect(binsCliff(at14, 1_400)).toBe(false);
  });

  it('junction (the integrated run’s): a seed’s p5 below 30°, a seed’s 4-way share above 15 %, the pooled median outside 85–95°', () => {
    const j = goodRecord(1, 'integrated').junction;
    expect(failing([...both(1), ...both(2, {}, { junction: { ...j, p5: JUNCTION.p5Min - 0.01 } })])).toEqual(['junction']);
    expect(failing([...both(1), ...both(2, {}, { junction: { ...j, p5: JUNCTION.p5Min } })])).toEqual([]);
    expect(failing([...both(1), ...both(2, {}, { junction: { ...j, share4: 0.1501 } })])).toEqual(['junction']);
    expect(failing([...both(1), ...both(2, {}, { junction: { ...j, share4: 0.15 } })])).toEqual([]);
    // the pooled median: every gap 96° (outside), 95° (inside)
    const at = (deg: number) => ({ ...j, gaps: new Array<number>(10).fill(deg) });
    expect(failing([...both(1, {}, { junction: at(96) }), ...both(2, {}, { junction: at(96) })])).toEqual(['junction']);
    expect(failing([...both(1, {}, { junction: at(84) }), ...both(2, {}, { junction: at(84) })])).toEqual(['junction']);
    expect(failing([...both(1, {}, { junction: at(95) }), ...both(2, {}, { junction: at(85) })])).toEqual([]);
    // the fusion run's junctions are reported, not judged
    expect(failing([...both(1, { junction: at(120) }, {}), ...both(2, { junction: { ...j, p5: 10 } }, {})])).toEqual([]);
    // the pooled share is Σ 4-way ÷ Σ nodes over the seeds
    const r = foldReport(SIZES, [...both(1, {}, { junction: { ...j, nodes: 10, nodes4: 1 } }), ...both(2, {}, { junction: { ...j, nodes: 30, nodes4: 1 } })]);
    expect(r.runs[1].junction.pooled.share4).toBeCloseTo(2 / 40, 12);
  });

  it('drift (the integrated run’s pool): > 90° on more than ⌊1 %⌋ of the windows; the median outside 15–30° once 20 windows', () => {
    expect(failing([...both(1), ...both(2, {}, { drift: [20, 95] })])).toEqual(['drift']);
    const ninetyNine = Array.from({ length: 99 }, () => 20);
    expect(failing([...both(1, {}, { drift: [] }), ...both(2, {}, { drift: [...ninetyNine, 120] })])).toEqual([]);
    expect(failing([...both(1, {}, { drift: [130] }), ...both(2, {}, { drift: [...ninetyNine, 120] })])).toEqual(['drift']);
    expect(failing([...both(1, {}, { drift: new Array<number>(10).fill(40) }), ...both(2, {}, { drift: new Array<number>(10).fill(40) })])).toEqual(['drift']);
    expect(failing([...both(1, {}, { drift: new Array<number>(10).fill(40) }), ...both(2, {}, { drift: new Array<number>(9).fill(40) })])).toEqual([]);
    expect(failing([...both(1, {}, { drift: new Array<number>(10).fill(10) }), ...both(2, {}, { drift: new Array<number>(10).fill(10) })])).toEqual(['drift']);
    const r = foldReport(SIZES, [...both(1, {}, { drift: [10, 20, 30] }), ...both(2, {}, { drift: [40] })]);
    expect(r.runs[1].drift).toMatchObject({ windows: 4, over90: 0, medianJudged: false });
  });

  it('roads: a walled stage whose roads leaving differ from N, by one either way', () => {
    expect(failing([...both(1), ...both(2, { roads: [{ k: 1, n: 7, leaving: 8 }] })])).toEqual(['roads']);
    expect(failing([...both(1), ...both(2, { roads: [{ k: 1, n: 7, leaving: 6 }] })])).toEqual(['roads']);
  });

  it('strips: one lane crossing a wall strip', () => {
    expect(failing([...both(1), ...both(2, { strips: { faces: 4, lanes: 100, crossings: 1 } })])).toEqual(['strips']);
  });

  it('s8s9 (N-52 (1), N-57 (4)): one block beyond the bound, one stop kerb drifted beyond it, one S9 union refused, or nothing compared', () => {
    const h = goodRecord(1, 'fusion').hausdorff;
    // Misses within the bound are reported, never failing: the exact share and the misses' distances.
    const within = { hausdorff: { ...h, zero: 7, within1cm: 9, maxCm: 73.5, commit: 3, missCm: [0.4, 12, 73.5], drifted: 2, driftMaxCm: 70 } };
    expect(failing([...both(1), ...both(2, within)])).toEqual([]);
    const r = foldReport(SIZES, [...both(1), ...both(2, within)]);
    expect(r.runs[0].s8s9.exactShare).toBeCloseTo(17 / 20, 12);
    expect(r.runs[0].s8s9.missCm).toEqual({ n: 3, p50: 12, p99: expect.closeTo(72.27, 1) as number, p999: expect.closeTo(73.38, 1) as number, max: 73.5 });
    expect(r.runs[0].s8s9.boundCm).toBeCloseTo(73.539, 3);
    expect(r.runs[0].s8s9.driftMaxCm).toBe(70);
    // The drift's reported distances fold as maxima, the needle's length with the largest Hausdorff distance (N-57 (4)).
    const drifts = foldReport(SIZES, [
      ...both(1, { hausdorff: { ...h, drifted: 1, driftMaxCm: 1_593, driftNeedleCm: 3_000, driftOneSidedMaxCm: 18, driftSliverMaxCm: 26, s9OwnL1: 2, driftSeedless: 1 } }),
      ...both(2, { hausdorff: { ...h, drifted: 1, driftMaxCm: 200, driftNeedleCm: 150, driftOneSidedMaxCm: 199, driftSliverMaxCm: 49, s9OwnL1: 3, driftSeedless: 2 } }),
    ]);
    expect(drifts.pass).toBe(true);
    expect(drifts.runs[0].s8s9).toMatchObject({ drifted: 2, driftMaxCm: 1_593, driftNeedleCm: 3_000, driftOneSidedMaxCm: 199, driftSliverMaxCm: 49, s9OwnL1: 5, driftBeyond: 0, driftSeedless: 3 });
    expect(failing([...both(1), ...both(2, { hausdorff: { ...within.hausdorff, beyond: 1, maxCm: 73.6 } })])).toEqual(['s8s9']);
    expect(failing([...both(1), ...both(2, { hausdorff: { ...h, driftBeyond: 1, drifted: 1, driftMaxCm: 80 } })])).toEqual(['s8s9']);
    expect(failing([...both(1), ...both(2, { hausdorff: { ...h, s9Refused: 1 } })])).toEqual(['s8s9']);
    const none = { hausdorff: { ...h, compared: 0, zero: 0 } };
    expect(failing([...both(1, none), ...both(2, none)])).toEqual(['s8s9']);
    expect(foldReport(SIZES, [...both(1), ...both(2, { hausdorff: { ...h, beyond: 2 } })]).runs[1].s8s9.seedsBeyond).toBe(1);
    // A seed whose only failure is the stop kerb's drift is counted and listed with its seed (N-57 (4)).
    const drift = foldReport(SIZES, [...both(1), ...both(2, { hausdorff: { ...h, driftBeyond: 1, drifted: 1, driftMaxCm: 80 } })]).runs[0].s8s9;
    expect(drift.seedsBeyond).toBe(1);
    expect(drift.first).toHaveLength(1);
    expect(drift.first[0]).toMatch(/^seed 2: 0 of \d+ beyond the bound .*stop-kerb drift beyond 1;/);
    // The counts fold as sums over the seeds — the drift beyond the bound, the drifted blocks and the seedless parts
    // (the fourth continuation's self-check, C-0434 (3)): two seeds of one block each beyond are 2, never the largest.
    const sums = foldReport(SIZES, [...both(1, { hausdorff: { ...h, driftBeyond: 1, drifted: 1, driftSeedless: 1 } }), ...both(2, { hausdorff: { ...h, driftBeyond: 1, drifted: 1, driftSeedless: 1 } })]);
    expect(sums.runs.map((x) => ({ driftBeyond: x.s8s9.driftBeyond, drifted: x.s8s9.drifted, driftSeedless: x.s8s9.driftSeedless, seedsBeyond: x.s8s9.seedsBeyond }))).toEqual([
      { driftBeyond: 2, drifted: 2, driftSeedless: 2, seedsBeyond: 2 },
      { driftBeyond: 2, drifted: 2, driftSeedless: 2, seedsBeyond: 2 },
    ]);
  });

  it('the refusal census (J264) is folded per run, never a verdict of its own', () => {
    const rf = goodRecord(1, 'fusion').refusals;
    const r = foldReport(SIZES, [...both(1), ...both(2, { refusals: { ...rf, s8: 2, kernelDowngrades: 3 } })]);
    expect(r.runs[0].refusals.total).toEqual({ s8: 2, s9: 0, kerbReads: 0, corpusRoof: 2, corpusSpine: 2, kernelDowngrades: 3, kernelWorkLimitHits: 0, unplaced: 0, degraded: 0 });
    expect(r.runs[0].refusals.seeds).toBe(2);
    expect(r.runs[0].refusals.first).toEqual(['seed 1: corpusRoof 1, corpusSpine 1', 'seed 2: s8 2, corpusRoof 1, corpusSpine 1, kernelDowngrades 3']);
    expect(r.pass).toBe(true);
  });

  it('the per-seed table carries each seed’s own readings, in seed order', () => {
    const h = goodRecord(1, 'fusion').hausdorff;
    const r = foldReport(SIZES, [...both(2, { hausdorff: { ...h, zero: 8, within1cm: 9, maxCm: 12.5, driftMaxCm: 3, driftOneSidedMaxCm: 2, driftSliverMaxCm: 1.5, missCm: [0.5, 12.5] }, drift: [10, 20, 30], restarts: 0 }), ...both(1)]);
    expect(r.runs[0].perSeed.map((x) => x.seed)).toEqual([1, 2]);
    expect(r.runs[0].perSeed[1]).toEqual({
      seed: 2,
      districts: 25,
      cuts: 1_500,
      blocks: 1_400,
      compared: 10,
      exact: 8,
      beyond: 0,
      maxCm: 12.5,
      driftMaxCm: 3,
      driftOneSidedMaxCm: 2,
      driftSliverMaxCm: 1.5,
      driftBeyond: 0,
      driftSeedless: 0,
      corpusFaces: 300,
      corpusDowngrades: [1, 1],
      driftWindows: 3,
      junction: [60, 90, 0.05],
      cliff: false,
      restarts: 0,
      bugs: 0,
      roadsOff: 0,
      stripCrossings: 0,
      refusals: goodRecord(2, 'fusion').refusals,
    });
  });

  it('corpus: downgrades above 0.5 %, work-limit hits above 0.1 %, a failure (pooled over the run’s faces)', () => {
    const c = (roof: { downgrades?: number; workLimitHits?: number; failures?: number }, spine: { downgrades?: number; workLimitHits?: number } = {}) => ({
      corpus: { faces: 1_000, roof: { faces: 1_000, downgrades: 0, workLimitHits: 0, failures: 0, ...roof }, spine: { faces: 1_000, downgrades: 0, workLimitHits: 0, failures: 0, ...spine } },
    });
    // 2 000 faces per run: 10 downgrades = 0.5 % passes, 11 fails; 2 hits = 0.1 % passes, 3 fail
    expect(failing([...both(1, c({ downgrades: 6 })), ...both(2, c({ downgrades: 4 }))])).toEqual([]);
    expect(failing([...both(1, c({ downgrades: 6 })), ...both(2, c({ downgrades: 5 }))])).toEqual(['corpus']);
    expect(failing([...both(1, c({}, { downgrades: 11 })), ...both(2, c({}))])).toEqual(['corpus']);
    expect(failing([...both(1, c({ workLimitHits: 1 })), ...both(2, c({ workLimitHits: 1 }))])).toEqual([]);
    expect(failing([...both(1, c({ workLimitHits: 2 })), ...both(2, c({ workLimitHits: 1 }))])).toEqual(['corpus']);
    expect(failing([...both(1, c({}, { workLimitHits: 3 })), ...both(2, c({}))])).toEqual(['corpus']);
    expect(failing([...both(1, c({ failures: 1 })), ...both(2, c({}))])).toEqual(['corpus']);
  });

  it('sharedS5: the two runs’ roots at S5’s end differ on a seed', () => {
    expect(failing([...both(1), goodRecord(2, 'fusion', { rootS5: 'a' }), goodRecord(2, 'integrated', { rootS5: 'b' })])).toEqual(['sharedS5']);
  });

  it('the face counts, bands, ladder uses and work are folded and reported, never judged', () => {
    const r = foldReport(SIZES, [...both(1, { faces: { districts: 3, cuts: 40, blocks: 30, s8Refused: 2 } }), ...both(2)]);
    expect(r.pass).toBe(true);
    expect(r.runs[0].faces.s8Refused).toBe(2);
    expect(r.runs[0].faces.figures).toEqual({ cuts: 1_500, districts: 25 });
    expect(r.runs[0].bands['comfortable'].blockAreaM2.n).toBe(4);
    expect(r.runs[0].ladderUses).toBe(6);
    const w = foldWork([
      { counter: 'cut.kernelCalls', stage: 'S8', work: 10, limit: 100, units: 5 },
      { counter: 'cut.kernelCalls', stage: 'S8', work: 40, limit: 40, units: 10 },
      { counter: 'cut.candidates', stage: 'S8', work: 0, limit: 100, units: 5 },
    ]);
    expect(Object.keys(w)).toEqual(['cut.kernelCalls']);
    expect(w['cut.kernelCalls']).toMatchObject({ batches: 2, unitsTotal: 15, limitHits: 1 });
    expect(w['cut.kernelCalls'].perUnit.max).toBe(4);
    expect(w['cut.kernelCalls'].perUnit.p50).toBe(3);
  });

  it('the stamps fold apart: the gate’s S4 + S5 + S8 per fusion seed, contended, carried by the summary', () => {
    const recs = [...both(1), ...both(2)];
    const st = foldStamps(recs);
    expect(st.authority).toBe('contended');
    expect(st.gateMs).toMatchObject({ n: 2, p50: 12, max: 12 });
    expect(st.runs['fusion']['S3'].p50).toBe(2);
    const s = summaryOf(foldReport(SIZES, recs), st) as { timing: { r12_4: Record<string, { p50: number }>; authority: string } };
    expect(s.timing.authority).toBe('contended');
    expect(Object.keys(s.timing.r12_4)).toEqual(['S3', 'S4', 'S5', 'S8']);
    expect(s.timing.r12_4['S8'].p50).toBe(5);
    // The report itself holds no stamp.
    expect(JSON.stringify(foldReport(SIZES, recs))).not.toMatch(/stamps|Ms"/);
  });

  it('the tasks: each seed’s runs in order', () => {
    expect(tasksOf({ from: 3, seeds: 2, runs: ['fusion', 'integrated'], frameHa: 900, walledHa: 30 })).toEqual([
      { seed: 3, run: 'fusion', frameHa: 900, walledHa: 30 },
      { seed: 3, run: 'integrated', frameHa: 900, walledHa: 30 },
      { seed: 4, run: 'fusion', frameHa: 900, walledHa: 30 },
      { seed: 4, run: 'integrated', frameHa: 900, walledHa: 30 },
    ]);
  });
});

describe('the long run’s status (N-52 (6): no seed cut)', () => {
  it('is complete only for the 1 000 seeds from seed 1, both runs, at CITY; the smoke of 50 and a run of 999 stay PENDING-LONG-RUN', () => {
    const city = (seeds: number, over: Partial<FusionSizes> = {}): FusionSizes => ({ from: 1, seeds, runs: ['fusion', 'integrated'], frameHa: null, walledHa: null, ...over });
    expect(BAR_SEEDS).toBe(1_000);
    expect(longRunOf(city(1_000))).toEqual({ seedsAsked: 1_000, seedsRun: 1_000, status: 'complete' });
    expect(longRunOf(city(999))).toEqual({ seedsAsked: 1_000, seedsRun: 999, status: 'PENDING-LONG-RUN' });
    expect(longRunOf(city(50)).status).toBe('PENDING-LONG-RUN');
    expect(longRunOf(city(1_000, { from: 2 })).status).toBe('PENDING-LONG-RUN');
    expect(longRunOf(city(1_000, { runs: ['fusion'] })).status).toBe('PENDING-LONG-RUN');
    expect(longRunOf(city(1_000, { frameHa: 900, walledHa: 30 })).status).toBe('PENDING-LONG-RUN');
  });
});

describe('the harness reproduces its report byte for byte (seeded)', () => {
  it('two runs of seed 1 (both runs, the test size) give the same report bytes; seed 2 another', { timeout: 600_000 }, async () => {
    const a = { sizes: { from: 1, seeds: 1, runs: ['fusion', 'integrated'] as const, frameHa: TEST_SIZE.frameHa, walledHa: TEST_SIZE.walledHa }, workers: 1, summary: false, timing: null };
    const one = await fusion({ ...a, sizes: { ...a.sizes, runs: [...a.sizes.runs] } });
    const two = await fusion({ ...a, sizes: { ...a.sizes, runs: [...a.sizes.runs] } });
    expect(JSON.stringify(two.report)).toBe(JSON.stringify(one.report));
    expect(JSON.stringify(two.records.map((r) => ({ ...r, stampsMs: {} })))).toBe(JSON.stringify(one.records.map((r) => ({ ...r, stampsMs: {} }))));
    expect(one.records.map((r) => r.root)).toEqual(two.records.map((r) => r.root));
    // The report is the measurements': the S5 roots shared by the two runs, the seed's own.
    expect(one.report.sharedS5).toEqual({ compared: 1, equal: 1 });
    const other = await fusion({ ...a, sizes: { ...a.sizes, from: 2, runs: [...a.sizes.runs] } });
    expect(JSON.stringify(other.report)).not.toBe(JSON.stringify(one.report));
  });
});
