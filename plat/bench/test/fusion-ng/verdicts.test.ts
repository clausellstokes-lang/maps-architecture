// Phase a's verdicts on planted rows (M0-c-07; the listed test: "phase a's verdicts on planted rows: pass / fail /
// reported / notApplicable; an m1 cell with no row → fail; R4's proxy marked reported, never pass or fail (C-0018,
// C-0072, C-0116)"; the checker's line: "which rows gate and which are proxies matches C-0072"), and the junction row's
// declared shift (C-0094, §13.5). Pure: a hand-built walled MetricDoc measured by M0-k-05's registry, planted rows
// around what it measures, and M0-c-06's fold over its planted seed records for M0-c-06's own junction verdict.
import { describe, expect, it } from 'vitest';
import { H128, utf8Bytes } from '@plat/kernel';
import { metricById, type Baseline, type MetricBlock, type MetricDoc, type MetricWay } from '@plat/testkit';
import { foldReport, JUNCTION, type FusionGateReport, type SeedRecord } from '../../src/fusion/index.js';
import { gateA, JUNCTION_CLAUSES, judgeA, MFCG_GATING, NOTE_MFCG_PRESET, PHASE_A_METRICS } from '../../src/fusion-ng/index.js';
import { goodRecord } from '../fusion/support.js';
import { descriptive, row, scalar } from './support.js';

const HASH = H128(utf8Bytes('planted baselines'));

const P = (x: number, y: number): { x: number; y: number } => ({ x, y });
const way = (id: string, pts: [number, number][]): MetricWay => ({ id, class: 'secondary', line: pts.map(([x, y]) => P(x, y)) });
const square = (x: number, y: number, s: number): { x: number; y: number }[] => [P(x, y), P(x + s, y), P(x + s, y + s), P(x, y + s)];

/** A walled 400 m square: three streets across, one down, a T-street between two of them; sixteen blocks, ten deep. */
function walledDoc(): MetricDoc {
  const ways = [
    way('h1', [[2_000, 10_000], [20_000, 10_000], [38_000, 10_000]]),
    way('h2', [[2_000, 20_000], [10_000, 20_000], [20_000, 20_000], [38_000, 20_000]]),
    way('h3', [[2_000, 30_000], [20_000, 30_000], [38_000, 30_000]]),
    way('v1', [[20_000, 2_000], [20_000, 10_000], [20_000, 20_000], [20_000, 30_000], [20_000, 38_000]]),
    way('t1', [[10_000, 10_000], [10_000, 20_000]]),
  ];
  // h1 meets t1 at (10 000, 10 000): give h1 that vertex too.
  ways[0] = way('h1', [[2_000, 10_000], [10_000, 10_000], [20_000, 10_000], [38_000, 10_000]]);
  const blocks: MetricBlock[] = [];
  let i = 0;
  for (let gx = 0; gx < 4; gx += 1) {
    for (let gy = 0; gy < 4; gy += 1) {
      const deep = i % 8 < 5;
      blocks.push({ id: `b${String(i)}`, district: `d${String(gx)}`, ring: square(1_000 + gx * 10_000, 1_000 + gy * 10_000, 8_000 + (i % 3) * 300), content: 'ordinary', depthClass: deep ? 'deep' : 'standard', interior: deep ? (i % 2 === 0 ? 'court' : 'rear_plots') : 'none', band: gx < 2 ? 'modest' : 'prosperous' } as MetricBlock);
      i += 1;
    }
  }
  return { ways, blocks, wall: square(0, 0, 40_000) };
}

/** What the registry measures on the doc, per metric and key. */
function measured(doc: MetricDoc, id: string, key = 'all'): number {
  const m = metricById(id);
  if (m === undefined) throw new Error(id);
  const v = m.measure(doc);
  if ('notApplicable' in v) throw new Error(`${id}: ${v.notApplicable}`);
  const x = v.values.get(key);
  if (typeof x !== 'number') throw new Error(`${id}/${key}: no number`);
  return x;
}

/** M0-c-06's fold over planted integrated records (its junction verdict for the shift). */
function gateOf(over: Partial<SeedRecord> = {}): FusionGateReport {
  const recs = [goodRecord(1, 'integrated', over), goodRecord(2, 'integrated', over)];
  return foldReport({ from: 1, seeds: 2, runs: ['integrated'], frameHa: null, walledHa: null }, recs);
}

function judge(rows: readonly Baseline[], gate: FusionGateReport | null = gateOf()) {
  const doc = walledDoc();
  return judgeA({ rows, info: [], hash: HASH, from: 1, docs: [doc, doc], records: [goodRecord(1, 'integrated'), goodRecord(2, 'integrated')], gate });
}

const byId = (cs: readonly { id: string }[], id: string) => {
  const c = cs.find((x) => x.id === id);
  if (c === undefined) throw new Error(`no clause ${id}`);
  return c as ReturnType<typeof judge>['clauses'][number];
};

describe('phase a: the verdicts on planted rows', () => {
  const doc = walledDoc();
  const ours = {
    median: measured(doc, 'junction.angles', 'all/median'),
    p5: measured(doc, 'junction.angles', 'all/p5'),
    share4: measured(doc, 'junction.share4'),
    tShare: measured(doc, 'sgd.tShare'),
    deadEnds: measured(doc, 'sgd.deadEnds'),
    perHa: measured(doc, 'blockc.perHa'),
    court: measured(doc, 'block.courtShare'),
    r4: measured(doc, 'bldg.r4.250'),
  };

  it('the planted doc measures every gating metric (no vacuous verdict)', () => {
    expect(ours.share4).toBeGreaterThan(0);
    expect(ours.tShare).toBeGreaterThan(0);
    expect(ours.deadEnds).toBeGreaterThan(0);
    expect(ours.perHa).toBeGreaterThan(0);
    expect(ours.court).toBeCloseTo(6 / 10, 12);
  });

  it('pass, fail, reported (a descriptive row; a proxy in and out of band), notApplicable (V12 form; M1) — each where it is planted', () => {
    const rows = [
      row('junction.angles', 'all/median', 'NG', scalar(ours.median)),
      row('junction.angles', 'all/p5', 'NG', scalar(ours.p5)),
      row('junction.share4', 'all', 'NG', scalar(ours.share4, ours.share4 * 0.9, ours.share4 * 1.1)),
      row('sgd.tShare', 'all', 'MFCG', scalar(ours.tShare)),
      descriptive('sgd.deadEnds', 'all', 'MFCG'),
      row('blockc.perHa', 'all', 'MFCG', scalar(ours.perHa * 3)),
      row('block.courtShare', 'all', 'NG', scalar(ours.court), { signIndefinite: true } as Partial<Baseline>),
      row('block.courtShare', 'all', 'MFCG', scalar(ours.court)),
      row('bldg.r4.250', 'all', 'MFCG', scalar(ours.r4)),
      row('blockc.lotsPer', 'all', 'MFCG', scalar(9)),
    ];
    const j = judge(rows);
    const v = (id: string) => byId(j.clauses, id).verdict;
    expect(v('junction.angles/all/median')).toBe('pass');
    expect(v('junction.angles/all/p5')).toBe('pass');
    expect(v('junction.share4/all')).toBe('pass');
    expect(v('sgd.tShare/all')).toBe('pass');
    expect(v('sgd.deadEnds/all')).toBe('reported');
    expect(v('blockc.perHa/all')).toBe('fail');
    expect(v('block.courtShare/all@NG')).toBe('notApplicable');
    expect(byId(j.clauses, 'block.courtShare/all@NG').note).toBe('V12 §3.5 at M1');
    expect(v('blockc.lotsPer/all')).toBe('notApplicable');
    // R4 is a proxy (C-0018): reported, never pass or fail, whether ours is in its row's band or not; it never gates
    expect(v('bldg.r4.250/all')).toBe('reported');
    expect(byId(j.clauses, 'bldg.r4.250/all').note).toMatch(/^proxy: block OBB axes .*; in band$/);
    const out = judge([row('bldg.r4.250', 'all', 'MFCG', scalar(ours.r4 * 50))]);
    expect(byId(out.clauses, 'bldg.r4.250/all').verdict).toBe('reported');
    expect(byId(out.clauses, 'bldg.r4.250/all').note).toMatch(/^proxy: block OBB axes .*; out of band$/);
    // the deep-interior row's MFCG cell is the MFCG preset's: reported beside, never gating
    expect(v('block.courtShare/all@MFCG')).toBe('reported');
    expect(byId(j.clauses, 'block.courtShare/all@MFCG').note).toBe(`${NOTE_MFCG_PRESET}; in band`);
    // the run fails exactly on its gating fail and its gating notApplicable; the descriptive row holds (C-0116)
    expect(j.clauses.filter((c) => c.gating && !(c.verdict === 'pass' || (c.verdict === 'reported' && c.role === 'descriptive'))).map((c) => c.id)).toEqual(['blockc.perHa/all', 'block.courtShare/all@NG']);
    for (const c of j.clauses) if (c.metric.startsWith('bldg.')) expect(c.gating).toBe(false);
    expect(j.clauses.filter((c) => c.metric.startsWith('bldg.')).some((c) => c.verdict === 'pass' || c.verdict === 'fail')).toBe(false);
  });

  it('an ⟨M-1⟩ cell with no row fails (never missingBaseline); a non-⟨M-1⟩ cell with no row reads missingBaseline, and on a gating clause fails the run', () => {
    const j = judge([]);
    for (const id of ['sgd.tShare/all', 'sgd.deadEnds/all', 'blockc.perHa/all', 'block.courtShare/all@NG']) {
      expect(byId(j.clauses, id).verdict, id).toBe('fail');
      expect(byId(j.clauses, id).note, id).toMatch(/^⟨M-1⟩ row missing \(/);
    }
    for (const id of JUNCTION_CLAUSES) expect(byId(j.clauses, id).verdict, id).toBe('missingBaseline');
    expect(byId(j.clauses, 'bldg.r4.120/all').verdict).toBe('missingBaseline');
    const failing = j.clauses.filter((c) => c.gating && c.verdict !== 'pass').map((c) => c.id);
    expect(failing.sort()).toEqual([...JUNCTION_CLAUSES, 'sgd.tShare/all', 'sgd.deadEnds/all', 'blockc.perHa/all', 'block.courtShare/all@NG'].sort());
  });

  it('which clauses gate is C-0072\'s list: the junction row, T / Y share, intramural dead ends, blocks per ha, and the deep-interior NG cell', () => {
    const j = judge([]);
    expect(j.clauses.filter((c) => c.gating).map((c) => c.id)).toEqual([...JUNCTION_CLAUSES, ...MFCG_GATING.map((m) => `${m}/all`), 'block.courtShare/all@NG']);
    expect(gateA('bldg.r4.60', 'all', 'MFCG')).toBe(false);
    expect(gateA('bldg.wallAlign.share15', 'all/b0_40', 'MFCG')).toBe(false);
    expect(gateA('blockc.lotsPer', 'all', 'MFCG')).toBe(false);
    expect(gateA('block.courtShare', 'all', 'MFCG')).toBe(false);
    expect(gateA('block.courtShare', 'all', 'NG')).toBe(true);
    // every metric of the phase is measured: one entry per key, in the registry's order of the phase's list
    expect([...new Set(j.ours.entries.map((e) => e.metric))]).toEqual([...PHASE_A_METRICS]);
  });
});

describe('phase a: the refusal census (J264, N-58)', () => {
  it('every refusal M0-c-06\'s measure counted on a fixture seed is a class of our own intermediate geometry, a finding with its seeds', () => {
    const doc = walledDoc();
    const refusals = { s8: 1, s9: 0, kerbReads: 0, corpusRoof: 2, corpusSpine: 0, kernelDowngrades: 0, kernelWorkLimitHits: 3, unplaced: 0, degraded: 1 };
    const j = judgeA({ rows: [], info: [], hash: HASH, from: 5, docs: [doc, doc], records: [goodRecord(5, 'integrated', { refusals }), goodRecord(6, 'integrated', { refusals: { ...refusals, s8: 0, degraded: 0 } })], gate: null });
    expect(j.census.total).toBe(1 + 2 + 3 + 1 + 2 + 3);
    expect(j.census.classes.map((c) => [c.code, c.count, c.seeds, c.inputKind, c.verdict])).toEqual([
      ['corpusRoof', 4, [5, 6], 'OUR OWN INTERMEDIATE', 'MAKE-IT-SUCCEED'],
      ['degraded', 1, [5], 'OUR OWN INTERMEDIATE', 'MAKE-IT-SUCCEED'],
      ['kernelWorkLimitHits', 6, [5, 6], 'OUR OWN INTERMEDIATE', 'MAKE-IT-SUCCEED'],
      ['s8', 1, [5], 'OUR OWN INTERMEDIATE', 'MAKE-IT-SUCCEED'],
    ]);
    for (const c of j.census.classes) expect(c.source).toMatch(/^phase a: the fixture’s integrated run/);
  });
});

describe('phase a: the junction row\'s declared shift (C-0094, §13.5)', () => {
  const doc = walledDoc();
  const share4 = measured(doc, 'junction.share4');
  const rows = (s4: Baseline['values']): Baseline[] => [
    row('junction.angles', 'all/median', 'NG', scalar(measured(doc, 'junction.angles', 'all/median'))),
    row('junction.angles', 'all/p5', 'NG', scalar(measured(doc, 'junction.angles', 'all/p5'))),
    row('junction.share4', 'all', 'NG', s4),
  ];

  it('M0-c-06\'s thresholds are C-0094\'s: p5 ≥ 30°, median 85–95°, 4-way share 0–15 %', () => {
    expect(JUNCTION).toEqual({ p5Min: 30, medianLo: 85, medianHi: 95, share4Max: 0.15 });
  });

  it('a recomputed band that turns M0-c-06\'s pass into a fail is DECLARED, with the numbers', () => {
    const j = judge(rows(scalar(share4 * 4, share4 * 3.5, share4 * 4.5)));
    expect(j.shift.m0c06).toBe(true);
    expect(j.shift.bandRule).toBe(false);
    expect([j.shift.direction, j.shift.declared]).toEqual(['pass→fail', true]);
    const cell = j.shift.cells.find((c) => c.id === 'junction.share4/all');
    expect(cell?.verdict).toBe('fail');
    expect(cell?.ours).toBeCloseTo(share4, 12);
    expect(cell?.band.lo).toBeCloseTo(share4 * 3.5 * 0.9, 12);
    expect(cell?.baselineIds).toEqual(['test/ng/junction.share4/all']);
    expect(j.shift.m0c06Readings).toEqual({ pooledMedian: 90.5, p5Min: 60, share4Max: 0.05, nodes: 40 });
  });

  it('M0-c-06\'s verdict is its junction row\'s, not its whole report\'s: a gate failing on another bar still declares the junction shift', () => {
    const other = gateOf({ strips: { faces: 1, lanes: 1, crossings: 1 } });
    expect([other.pass, other.verdicts.junction]).toEqual([false, true]);
    const j = judge(rows(scalar(share4 * 4, share4 * 3.5, share4 * 4.5)), other);
    expect([j.shift.m0c06, j.shift.direction, j.shift.declared]).toEqual([true, 'pass→fail', true]);
  });

  it('no shift when both pass or both fail; fail → pass reported, never declared; nothing judged → none', () => {
    const pass = judge(rows(scalar(share4)));
    expect([pass.shift.bandRule, pass.shift.direction, pass.shift.declared]).toEqual([true, 'none', false]);
    const failing = gateOf({ junction: { p5: 10, median: 90, share4: 0.5, nodes: 20, nodes4: 10, gaps: [10, 90, 90, 90] } });
    expect(failing.verdicts.junction).toBe(false);
    const up = judge(rows(scalar(share4)), failing);
    expect([up.shift.m0c06, up.shift.direction, up.shift.declared]).toEqual([false, 'fail→pass', false]);
    // both fail: no shift, whatever the cells
    const both = judge(rows(scalar(share4 * 4, share4 * 3.5, share4 * 4.5)), failing);
    expect([both.shift.m0c06, both.shift.bandRule, both.shift.direction, both.shift.declared]).toEqual([false, false, 'none', false]);
    const none = judge([]);
    expect([none.shift.direction, none.shift.declared, none.shift.bandRule]).toEqual(['none', false, false]);
    expect(judge(rows(scalar(share4)), null).shift.m0c06).toBeNull();
  });
});
