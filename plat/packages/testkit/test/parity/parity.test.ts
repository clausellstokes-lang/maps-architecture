// M0-k-05's parity tests (§13.5's band rule, ⟨M-1⟩ rule and *Edges*; C-0068, C-0092, C-0116; N-06, N-20, N-24, N-25,
// N-31): T-RIG-1 (a missing file, an unreadable row, a row lacking referenceBuild / capture / script / date each stop
// the CLI naming the file and the row, exit non-zero, no report), T-RIG-2 (the same inputs give the same bytes), the
// ⟨M-1⟩ rule, the band rule on hand-built rows, and the row selection of N-20, N-24, N-25 and N-31.
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  bandRule,
  EMPTY_BASELINES,
  EMPTY_OURS,
  EMPTY_SEED_FAMILY,
  judgesNothing,
  METRICS,
  NOTE_M1_MISSING,
  parityCanonicalJson,
  parityReport,
  ParityStop,
  readBaselines,
  readOurs,
  runParity,
  type Baseline,
  type ParityOurs,
  type ParityReport,
} from '../../src/index.js';
import { dist, ours, row, scalar } from './support.js';

const HASH: [number, number, number, number] = [1, 2, 3, 4];
const report = (rows: Baseline[], o: ParityOurs): ParityReport => parityReport({ rows, baselinesHash: HASH, ours: o });
const verdicts = (r: ParityReport): string[] => r.rows.map((x) => x.verdict);

let root = '';
beforeAll(() => {
  root = mkdtempSync(join(tmpdir(), 'plat-k05-parity-'));
  mkdirSync(join(root, 'packages', 'testkit', 'baselines'), { recursive: true });
});
afterAll(() => rmSync(root, { recursive: true, force: true }));

const share4 = (p50: number, over: Partial<Baseline> = {}): Baseline => row({ id: 'm1/junction.share4/NG/medium/all', metric: 'junction.share4', values: { p10: 0.026, p50, p90: 0.077, n: 20, seeds: 20 }, ...over });

describe('T-RIG-1: the CLI stops naming the file and the row, and writes no report', () => {
  const write = (name: string, text: string): string => {
    const p = join(root, name);
    writeFileSync(p, text);
    return p;
  };
  const oursFile = (): string => write('ours.json', JSON.stringify(ours([scalar('junction.share4', 'all', [0.05, 0.06, 0.07])])));

  it('a missing baselines.json stops naming the file, exit 2, no report', () => {
    const r = runParity({ platRoot: root, oursPath: oursFile() });
    expect(r.code).toBe(2);
    expect(r.lines.join('\n')).toMatch(/packages\/testkit\/baselines\/baselines\.json: missing file/);
    expect(r.report).toBeUndefined();
    expect(r.text).toBeUndefined();
  });

  it('a file that is not JSON, or not a list of rows, stops naming the file', () => {
    for (const text of ['{ not json', '{"schema":"x"}', '42']) {
      const r = runParity({ platRoot: root, oursPath: oursFile(), baselinesPath: write('b.json', text) });
      expect(r.code).toBe(2);
      expect(r.lines[0]).toMatch(/b\.json: unreadable/);
      expect(r.report).toBeUndefined();
    }
  });

  it('an unreadable row stops naming the row', () => {
    const bad: unknown[] = [
      { ...share4(0.05), values: { p50: 'x', n: 1, seeds: 1 } },
      { ...share4(0.05), role: 'gate' },
      { ...share4(0.05), sample: { indices: [0, 3] } },
      { ...share4(0.05), values: { bins: [1, 2, 3], histogram: [1, 2, 3, 4, 5], n: 1, seeds: 1 } },
      { ...share4(0.05), values: { bins: [3, 2], histogram: [1, 1], n: 1, seeds: 1 } },
      'a row',
    ];
    for (const b of bad) {
      const r = runParity({ platRoot: root, oursPath: oursFile(), baselinesPath: write('b.json', JSON.stringify([share4(0.05, { id: 'ok/junction.share4/NG/all' }), b])) });
      expect(r.code, JSON.stringify(b)).toBe(2);
      expect(r.lines[0]).toMatch(typeof b === 'string' ? /row "#1": unreadable row/ : /row "m1\/junction\.share4\/NG\/medium\/all": unreadable row/);
    }
    // a repeated id is unreadable too
    expect(() => readBaselines(JSON.stringify([share4(0.05), share4(0.05)]), 'b.json')).toThrow(/repeats an earlier row/);
  });

  it('a row lacking referenceBuild, capture, script or date stops naming the file and the row (T-RIG-1)', () => {
    for (const f of ['referenceBuild', 'capture', 'script', 'date'] as const) {
      for (const lack of [undefined, '']) {
        const b = { ...share4(0.05) } as Record<string, unknown>;
        if (lack === undefined) delete b[f];
        else b[f] = lack;
        const r = runParity({ platRoot: root, oursPath: oursFile(), baselinesPath: write('b.json', JSON.stringify({ rows: [b] })) });
        expect(r.code).toBe(2);
        expect(r.lines[0]).toContain(`b.json: row "m1/junction.share4/NG/medium/all": unreadable row: lacks ${f} (T-RIG-1)`);
        expect(r.report).toBeUndefined();
      }
    }
  });

  it('a missing or unreadable ours file stops naming it; a path outside plat/ is usage', () => {
    const b = write('b.json', JSON.stringify([share4(0.05)]));
    expect(runParity({ platRoot: root, oursPath: join(root, 'none.json'), baselinesPath: b }).lines[0]).toMatch(/none\.json: missing file/);
    const bad = write('o.json', JSON.stringify(ours([scalar('junction.nope', 'all', [1])])));
    const r = runParity({ platRoot: root, oursPath: bad, baselinesPath: b });
    expect(r.code).toBe(2);
    expect(r.lines[0]).toMatch(/o\.json: row "junction\.nope\/all": unreadable entry: metric "junction\.nope" is not registered/);
    expect(runParity({ platRoot: root, oursPath: '/etc/hostname', baselinesPath: b }).code).toBe(64);
    expect(runParity({ platRoot: join(root, 'packages'), oursPath: oursFile(), baselinesPath: b }).code).toBe(64);
  });

  it("reads our side whole or as a summary's parityOurs member, and refuses an entry of the wrong form", () => {
    const o = ours([scalar('junction.share4', 'all', [0.05])]);
    expect(readOurs(JSON.stringify({ item: 'M0-c-06', parityOurs: o }), 's.json')).toEqual(o);
    expect(() => readOurs(JSON.stringify(ours([dist('junction.share4', 'all', [[1]])])), 'o.json')).toThrow(/a scalar entry needs perSeed/);
    expect(() => readOurs(JSON.stringify(ours([scalar('junction.share4', 'all/p5', [1])])), 'o.json')).toThrow(/is not a key of junction\.share4/);
    expect(() => readOurs(JSON.stringify(ours([{ ...scalar('junction.share4', 'all', [1]), metricVersion: '2.0.0' }])), 'o.json')).toThrow(/metricVersion/);
    expect(() => readOurs(JSON.stringify(ours([scalar('junction.share4', 'all', [1]), scalar('junction.share4', 'all', [2])])), 'o.json')).toThrow(/repeats/);
    expect(() => readOurs(JSON.stringify({ ...o, rung: 'HUGE' }), 'o.json')).toThrow(ParityStop);
  });
});

describe('§13.8 Edges: an empty baseline file, an empty seed family or a run that judges nothing stops the CLI (C-0099, C-0186; F-1)', () => {
  const write = (name: string, text: string): string => {
    const p = join(root, name);
    writeFileSync(p, text);
    return p;
  };
  const oursFile = (o: ParityOurs = ours([scalar('junction.share4', 'all', [0.05, 0.06, 0.07])])): string => write('oe.json', JSON.stringify(o));
  const baseFile = (rows: unknown = [share4(0.05)], name = 'be.json'): string => write(name, JSON.stringify(rows));
  const stopped = (r: ReturnType<typeof runParity>, file: string, pattern: RegExp): void => {
    expect(r.code).toBe(2);
    expect(r.lines[0].startsWith(`parity stopped: ${file}: `), r.lines[0]).toBe(true);
    expect(r.lines[0]).toMatch(pattern);
    expect(r.report).toBeUndefined();
    expect(r.text).toBeUndefined();
  };

  it('a baselines.json of no row — [] or { "rows": [] } — stops naming the file, exit 2, no report', () => {
    for (const empty of [[], { rows: [] }]) {
      const b = baseFile(empty);
      stopped(runParity({ platRoot: root, oursPath: oursFile(), baselinesPath: b }), b, /: empty: the file holds no row .*§13\.8 Edges/);
    }
    expect(() => readBaselines('[]', 'b.json')).toThrow(ParityStop);
    expect(() => readBaselines('{"rows":[]}', 'b.json')).toThrow(EMPTY_BASELINES);
  });

  it('an our side of no entry stops naming the ours file, exit 2, no report', () => {
    const o = oursFile(ours([]));
    stopped(runParity({ platRoot: root, oursPath: o, baselinesPath: baseFile() }), o, /: empty: entries holds no metric .*§13\.8 Edges/);
    expect(() => readOurs(JSON.stringify(ours([])), 'o.json')).toThrow(EMPTY_OURS);
    // a summary's parityOurs member is read the same way
    expect(() => readOurs(JSON.stringify({ item: 'M0-c-06', parityOurs: ours([]) }), 's.json')).toThrow(/s\.json: empty: entries/);
  });

  it('an our side of setting.seeds 0 (an empty seed family) stops naming the ours file, exit 2, no report', () => {
    const zero = (entries: ReturnType<typeof scalar>[]): ParityOurs => ours(entries, { setting: { population: 20000, water: 'none', seedFamily: 'test/k05', seeds: 0 } });
    for (const entries of [[], [scalar('junction.share4', 'all', [])], [scalar('sgd.tShare', 'all', [0.45])]]) {
      const o = oursFile(zero(entries));
      stopped(runParity({ platRoot: root, oursPath: o, baselinesPath: baseFile() }), o, /: empty seed family: setting\.seeds is 0 .*§13\.8 Edges/);
    }
    expect(() => readOurs(JSON.stringify(zero([scalar('junction.share4', 'all', [0.05])])), 'o.json')).toThrow(EMPTY_SEED_FAMILY);
  });

  it('the pick: a run whose every row reads missingBaseline or notApplicable stops naming both files, exit 2, no report', () => {
    const b = baseFile([share4(0.05)]);
    const cases: ParityOurs[] = [
      // rows exist, none for this run's metrics: every row missingBaseline (the checker's o-nonm1 case over a one-row file)
      ours([scalar('cut.sigma', 'plain', [0.09]), scalar('street.turnPer100m', 'all', [9])]),
      // our side measured nothing: every entry notApplicable
      ours([{ metric: 'block.courtShare', metricVersion: '1.0.0', key: 'all', notApplicable: 'no deep built block' }]),
      // seeds 3 but no per-seed value: the row is read, ours is empty — notApplicable
      ours([scalar('junction.share4', 'all', [])]),
      // a sign-indefinite row is read but has no M0 reading — notApplicable, with a missing non-m1 cell beside it
      ours([scalar('junction.share4', 'all', [0.05]), scalar('cut.sigma', 'plain', [0.09])]),
    ];
    const signed = baseFile([{ ...share4(0.05), signIndefinite: true }], 'be-signed.json');
    cases.forEach((o, i) => {
      const op = oursFile(o);
      const bp = i === 3 ? signed : b;
      const r = runParity({ platRoot: root, oursPath: op, baselinesPath: bp });
      stopped(r, bp, /judges nothing for .*oe\.json: every row reads missingBaseline or notApplicable — /);
      expect(r.lines[0]).toContain(op);
      expect(r.lines[1]).toMatch(/^ {2}\d+ rows — pass 0, fail 0, reported 0, /);
    });
    expect(judgesNothing(report([], ours([scalar('cut.sigma', 'plain', [0.09])])))).toBe(true);
  });

  it('a partial run (one row judged, another missing) and a run of reported rows still write their report', () => {
    const b = baseFile([share4(0.05)]);
    const partial = runParity({ platRoot: root, oursPath: oursFile(ours([scalar('junction.share4', 'all', [0.05]), scalar('cut.sigma', 'plain', [0.09])])), baselinesPath: b });
    expect(partial.code).toBe(0);
    expect(partial.report?.rows.map((x) => x.verdict)).toEqual(['pass', 'missingBaseline']);
    expect(partial.text).toBeDefined();
    const d = baseFile([share4(0.05, { role: 'descriptive' })], 'be-descriptive.json');
    const reported = runParity({ platRoot: root, oursPath: oursFile(), baselinesPath: d });
    expect(reported.code).toBe(0);
    expect(reported.report?.rows.map((x) => x.verdict)).toEqual(['reported']);
    // an ⟨M-1⟩ cell with no row is a fail, judged: exit 1 with the report, never the stop
    const m1 = runParity({ platRoot: root, oursPath: oursFile(ours([scalar('sgd.tShare', 'all', [0.45]), scalar('cut.sigma', 'plain', [0.09])])), baselinesPath: b });
    expect(m1.code).toBe(1);
    expect(m1.report?.rows.map((x) => x.verdict)).toEqual(['fail', 'missingBaseline']);
  });
});

describe('T-RIG-2: the report is regenerated to the same bytes', () => {
  it('two runs over the same files give the same canonical text, keys in code-unit order', () => {
    const b = join(root, 'b2.json');
    const o = join(root, 'o2.json');
    writeFileSync(b, JSON.stringify([share4(0.05), row({ id: 'u/street.unknown/all', metric: 'street.unknown' })]));
    writeFileSync(o, JSON.stringify(ours([scalar('junction.share4', 'all', [0.05, 0.06, 0.04]), dist('block.area', 'all', [[100, 200], [300]])])));
    const a = runParity({ platRoot: root, oursPath: o, baselinesPath: b });
    const c = runParity({ platRoot: root, oursPath: o, baselinesPath: b });
    expect(a.code).toBe(1); // block.area is an ⟨M-1⟩ cell with no row
    expect(a.text).toBe(c.text);
    expect(a.text?.endsWith('\n')).toBe(true);
    const parsed = JSON.parse(a.text ?? '') as Record<string, unknown>;
    expect(Object.keys(parsed)).toEqual(['baselines', 'date', 'generatorVersion', 'info', 'metricsVersion', 'outputVersion', 'rows', 'runId', 'summary', 'unread']);
    expect(parityCanonicalJson(parsed)).toBe(a.text?.trimEnd());
    expect(parsed['runId']).toMatch(/^parity-[0-9a-f]{32}$/);
    expect(parsed['date']).toBe('2026-10-04');
    // another baselines file: another hash and run id
    writeFileSync(b, JSON.stringify([share4(0.06)]));
    const d = runParity({ platRoot: root, oursPath: o, baselinesPath: b });
    expect((JSON.parse(d.text ?? '') as ParityReport).runId).not.toBe(parsed['runId']);
    expect(() => parityCanonicalJson({ x: Number.NaN })).toThrow(/non-finite/);
  });
});

describe('the ⟨M-1⟩ rule (C-0116)', () => {
  it('an m1 metric with no row fails with the note, never missingBaseline, never pass', () => {
    const r = report([], ours([scalar('sgd.tShare', 'all', [0.4, 0.45, 0.5]), scalar('block.courtShare', 'all', [0.5, 0.6, 0.7])]));
    expect(verdicts(r)).toEqual(['fail', 'fail', 'fail']);
    for (const x of r.rows) expect(x.note?.startsWith(NOTE_M1_MISSING)).toBe(true);
    expect(r.rows.map((x) => x.note)).toEqual([`${NOTE_M1_MISSING} (MFCG, all)`, `${NOTE_M1_MISSING} (NG, all)`, `${NOTE_M1_MISSING} (MFCG, all)`]);
    expect(r.summary).toEqual({ pass: 0, fail: 3, reported: 0 });
  });

  it('an m1 metric with a descriptive row (n 0, sample.failed) reads reported', () => {
    const d = row({
      id: 'm1/sgd.tShare/MFCG/80/plain/all',
      metric: 'sgd.tShare',
      reference: 'MFCG',
      referenceBuild: '12710731',
      role: 'descriptive',
      values: { n: 0, seeds: 3 },
      sample: { family: 'capture/MFCG/80/plain', indices: [0, 3], failed: [0, 1, 2].map((index) => ({ index, reason: 'feature absent in capture' })) },
    });
    const r = report([d], ours([scalar('sgd.tShare', 'all', [0.4, 0.45, 0.5])]));
    expect(verdicts(r)).toEqual(['reported']);
    expect(r.rows[0].baselineIds).toEqual([d.id]);
    expect(r.summary).toEqual({ pass: 0, fail: 0, reported: 1 });
    // a target row with n 0 is reported too, never judged
    const t = { ...d, role: 'target' as const };
    expect(verdicts(report([t], ours([scalar('sgd.tShare', 'all', [0.4])])))).toEqual(['reported']);
  });

  it('a non-m1 metric with no row reads missingBaseline; a metric with no reference row read at M0 too', () => {
    const r = report([], ours([scalar('junction.share4', 'all', [0.05]), scalar('cut.sigma', 'plain', [0.09]), scalar('street.turnPer100m', 'all', [9])]));
    expect(verdicts(r)).toEqual(['missingBaseline', 'missingBaseline', 'missingBaseline']);
    expect(r.summary).toEqual({ pass: 0, fail: 0, reported: 0 });
  });

  it('no metric ever passes without a row, whatever ours holds', () => {
    for (const m of METRICS) {
      const keys = m.form === 'vector' ? (m.fields ?? []).map((f) => `all/${f}`) : ['all'];
      for (const key of keys) {
        const e = m.form === 'distribution' ? dist(m.id, key, [[1, 2, 3]]) : scalar(m.id, key, [0, 0.5, 1]);
        const r = report([], ours([e]));
        for (const x of r.rows) expect(x.verdict, `${m.id} ${key}`).not.toBe('pass');
        const expected = m.refs.some((x) => x.m1 === true) ? 'fail' : 'missingBaseline';
        if (m.refs.length > 0) expect(r.rows.some((x) => x.verdict === expected), m.id).toBe(true);
      }
    }
  });

  it('N-06: an m1 distribution row without spreadKS fails; a non-m1 one reads missingBaseline', () => {
    const area = row({ id: 'm1/block.area/NG/all', metric: 'block.area', unit: 'm2', values: { bins: [50, 500, 5000], histogram: [1, 10, 10, 1], n: 22, seeds: 20 } });
    const r = report([area], ours([dist('block.area', 'all', [[100, 600, 1000]])]));
    expect(verdicts(r)).toEqual(['fail']);
    expect(r.rows[0].note).toBe('⟨M-1⟩ row lacks spreadKS (N-06)');
    expect(bandRule(area, { samples: [[100]], seeds: 1 }, { m1: false }).verdict).toBe('missingBaseline');
  });
});

describe('the band rule on hand-built rows (C-0092 (1))', () => {
  const cell = (perSeed: number[]): { perSeed: number[]; seeds: number } => ({ perSeed, seeds: perSeed.length });

  it('a target row with p10 / p90: the union of [p10 × 0.9, p90 × 1.1] and p50 ± 15 %', () => {
    const r = row({ id: 'x', metric: 'junction.share4', values: { p10: 0.2, p50: 0.3, p90: 0.4, n: 10, seeds: 10 } });
    const pass = bandRule(r, cell([0.17, 0.44, 0.3]));
    expect(pass.verdict).toBe('pass');
    expect(pass.band.lo).toBeCloseTo(0.18, 12);
    expect(pass.band.hi).toBeCloseTo(0.44, 12);
    expect(pass.ours.p50).toBe(0.3);
    expect(bandRule(r, cell([0.179])).verdict).toBe('fail');
    expect(bandRule(r, cell([0.1801])).verdict).toBe('pass');
    expect(bandRule(r, cell([0.441])).verdict).toBe('fail');
  });

  it('a single-value row: ± 15 %', () => {
    const r = row({ id: 'x', metric: 'junction.share4', estimator: 'single', values: { p50: 2, n: 1, seeds: 1 } });
    expect(bandRule(r, cell([1.7])).verdict).toBe('pass');
    expect(bandRule(r, cell([2.3])).verdict).toBe('pass');
    expect(bandRule(r, cell([2.31])).verdict).toBe('fail');
    expect(bandRule(r, cell([1.69])).band).toEqual({ lo: 1.7, hi: 2.3 });
  });

  it('a disjoint union is judged part by part and named', () => {
    const r = row({ id: 'x', metric: 'junction.share4', values: { p10: 1, p50: 10, p90: 1.2, n: 10, seeds: 10 } });
    expect(bandRule(r, cell([1.1])).verdict).toBe('pass');
    expect(bandRule(r, cell([10])).verdict).toBe('pass');
    const gap = bandRule(r, cell([5]));
    expect(gap.verdict).toBe('fail');
    expect(gap.note).toMatch(/∪/);
  });

  it('a KS row with spreadKS: the median single-seed KS ≤ 1.25 × spreadKS.p90', () => {
    const r = row({ id: 'x', metric: 'block.area', unit: 'm2', values: { bins: [0, 10, 20, 30], histogram: [0, 25, 50, 25, 0], n: 100, seeds: 10 }, spreadKS: { p90: 0.2, pairs: 45 } });
    const same = bandRule(r, { samples: [[5, 15, 15, 25], [5, 15, 15, 25], [5, 15, 15, 25]], seeds: 3 });
    expect(same.verdict).toBe('pass');
    expect(same.ours.ks).toBeCloseTo(0, 12);
    expect(same.band.ksMax).toBeCloseTo(0.25, 12);
    const off = bandRule(r, { samples: [[25, 25, 25, 25], [25, 25, 5, 25], [35]], seeds: 3 });
    expect(off.verdict).toBe('fail');
    expect(off.ours.ks).toBeCloseTo(0.75, 12);
    // a seed with an empty sample is skipped; all empty is notApplicable, never pass
    expect(bandRule(r, { samples: [[], []], seeds: 2 }).verdict).toBe('notApplicable');
  });

  it('a KS row without spreadKS reads missingBaseline', () => {
    const r = row({ id: 'x', metric: 'block.area', unit: 'm2', values: { bins: [0, 10], histogram: [1, 1, 1], n: 3, seeds: 3 } });
    expect(bandRule(r, { samples: [[1]], seeds: 1 }).verdict).toBe('missingBaseline');
  });

  it('a sign-indefinite or floored row reads notApplicable "V12 §3.5 at M1", never pass', () => {
    const base = row({ id: 'x', metric: 'junction.share4', values: { p10: 0.2, p50: 0.3, p90: 0.4, n: 10, seeds: 10 } });
    for (const r of [
      { ...base, signIndefinite: true },
      { ...base, floor: 0.05 },
      { ...base, values: { p10: -0.2, p50: 0.1, p90: 0.3, n: 10, seeds: 10 } },
    ] as Baseline[]) {
      const b = bandRule(r, cell([0.3]));
      expect(b.verdict).toBe('notApplicable');
      expect(b.note).toBe('V12 §3.5 at M1');
    }
  });

  it('weakness rows are one-sided by a declared direction and margin; undeclared at M0 reads notApplicable', () => {
    const w = row({ id: 'x', metric: 'junction.share4', role: 'weakness', values: { p50: 10, n: 5, seeds: 5 } });
    expect(bandRule(w, cell([12])).verdict).toBe('notApplicable');
    expect(bandRule(w, cell([12]), { weakness: { direction: 'above', margin: 1 } }).verdict).toBe('pass');
    expect(bandRule(w, cell([10.5]), { weakness: { direction: 'above', margin: 1 } }).verdict).toBe('fail');
    expect(bandRule(w, cell([8]), { weakness: { direction: 'below', margin: 2 } })).toMatchObject({ verdict: 'pass', band: { hi: 8, direction: 'below', margin: 2 } });
    expect(bandRule(w, cell([8.1]), { weakness: { direction: 'below', margin: 2 } }).verdict).toBe('fail');
  });

  it('descriptive rows are reported and gate nothing', () => {
    const d = row({ id: 'x', metric: 'junction.share4', role: 'descriptive' });
    expect(bandRule(d, cell([100])).verdict).toBe('reported');
  });

  it('a proxy row is compared and reported, naming the proxy (C-0018, N-20)', () => {
    const r4 = row({ id: 'm1/bldg.r4.60/MFCG/80/plain/all', metric: 'bldg.r4.60', reference: 'MFCG', unit: 'ratio', matched: { rung: 'CITY', mfcgSize: 80 }, values: { p10: 0.9, p50: 0.927, p90: 0.95, n: 10, seeds: 10 }, sample: { family: 'capture/MFCG/80/plain', indices: [0, 10] } });
    const inBand = report([r4], ours([scalar('bldg.r4.60', 'all', [0.93])]));
    expect(inBand.rows[0]).toMatchObject({ verdict: 'reported', baselineIds: [r4.id] });
    expect(inBand.rows[0].note).toMatch(/^proxy: block OBB axes \(C-0018\).*; in band$/);
    expect(report([r4], ours([scalar('bldg.r4.60', 'all', [0.2])])).rows[0].note).toMatch(/out of band$/);
  });
});

describe('row selection (N-20, N-24, N-25, N-31)', () => {
  const sigma = (subset: string, p50: number): Baseline =>
    row({ id: `m1/cut.sigma/NG/formula/${subset}`, metric: 'cut.sigma', unit: 'ratio', values: { p10: p50 - 0.01, p50, p90: p50 + 0.01, n: 20, seeds: 20 } });

  it('a row of an unregistered metric is listed unread and leaves the summary unchanged (N-20)', () => {
    const o = ours([scalar('junction.share4', 'all', [0.05])]);
    const plain = report([share4(0.05)], o);
    const more = report([share4(0.05), row({ id: 'm1/ftg.lifestyle/FTG/all', metric: 'ftg.lifestyle' })], o);
    expect(more.summary).toEqual(plain.summary);
    expect(more.rows).toEqual(plain.rows);
    expect(more.unread).toEqual([{ id: 'm1/ftg.lifestyle/FTG/all', reason: 'metric ftg.lifestyle is not registered at M0' }]);
  });

  it('ids match case-sensitively (N-24): block.countTemplate pairs, block.counttemplate does not', () => {
    const r = (metric: string): Baseline => row({ id: `m1/${metric}/NG/medium/template-area`, metric, unit: 'count', values: { p10: 16, p50: 39, p90: 57, n: 5, seeds: 5 } });
    const o = ours([scalar('block.countTemplate', 'template-area', [40, 38, 41])]);
    expect(report([r('block.countTemplate')], o).rows[0]).toMatchObject({ verdict: 'pass', baselineIds: ['m1/block.countTemplate/NG/medium/template-area'] });
    const lower = report([r('block.counttemplate')], o);
    expect(lower.rows[0].verdict).toBe('fail');
    expect(lower.unread[0].reason).toMatch(/not registered/);
  });

  it('σ on plain and ring faces, one per-template count and both junction-angle fields are each selected exactly once (N-25)', () => {
    const angles = (field: string, p50: number): Baseline =>
      row({ id: `m1/junction.angles/NG/all/${field}`, metric: 'junction.angles', unit: 'deg', values: { p10: p50 - 5, p50, p90: p50 + 5, n: 20, seeds: 20 } });
    const rows = [sigma('all', 0.09), sigma('plain', 0.084), sigma('ring', 0.094), angles('median', 90), angles('p5', 40)];
    const r = report(
      rows,
      ours([scalar('cut.sigma', 'plain', [0.084]), scalar('cut.sigma', 'ring', [0.094]), scalar('junction.angles', 'all/median', [90]), scalar('junction.angles', 'all/p5', [41])]),
    );
    expect(r.rows.map((x) => x.baselineIds)).toEqual([[rows[1].id], [rows[2].id], [rows[3].id], [rows[4].id]]);
    expect(verdicts(r)).toEqual(['pass', 'pass', 'pass', 'pass']);
    expect(r.unread).toEqual([]);
  });

  it('a row whose trailing segment names no known subset or field is reported unread, naming the row', () => {
    const r = report([sigma('triangles', 0.09), row({ id: 'm1/junction.angles/NG/all/mean', metric: 'junction.angles', unit: 'deg' })], ours([]));
    expect(r.unread).toEqual([
      { id: 'm1/cut.sigma/NG/formula/triangles', reason: 'its trailing segment names no known subset or field (N-25)' },
      { id: 'm1/junction.angles/NG/all/mean', reason: 'its trailing segment names no known subset or field (N-25)' },
    ]);
  });

  it('a union-family row with captures and no indices pairs with its metric (N-31 (1))', () => {
    const u = share4(0.05, { sample: { family: 'capture/NG', captures: ['ng/a', 'ng/b'] } });
    expect(readBaselines(JSON.stringify([u]), 'b.json').rows.length).toBe(1);
    expect(report([u], ours([scalar('junction.share4', 'all', [0.05])])).rows[0].baselineIds).toEqual([u.id]);
  });

  it('a plain and a stress row of one cell: the plain row is read, the other listed; a third makes a duplicate (N-31 (2))', () => {
    const tY = (setting: string): Baseline =>
      row({
        id: `m1/sgd.tShare/MFCG/80/${setting}/all`,
        metric: 'sgd.tShare',
        reference: 'MFCG',
        referenceBuild: '12710731',
        matched: { rung: 'CITY', mfcgSize: 80 },
        values: { p10: 0.4, p50: 0.45, p90: 0.5, n: 10, seeds: 10 },
        sample: { family: `capture/MFCG/80/${setting}`, indices: [0, 10] },
      });
    const o = ours([scalar('sgd.tShare', 'all', [0.45])]);
    const two = report([tY('river+coast'), tY('plain')], o);
    expect(two.rows[0]).toMatchObject({ verdict: 'pass', baselineIds: ['m1/sgd.tShare/MFCG/80/plain/all'] });
    expect(two.unread).toEqual([{ id: 'm1/sgd.tShare/MFCG/80/river+coast/all', reason: 'other setting: river+coast' }]);
    const three = report([tY('river+coast'), tY('plain'), { ...tY('plain'), id: 'm1/sgd.tShare/MFCG/80/plain-b/all' }], o);
    expect(three.rows[0].verdict).toBe('fail');
    expect(three.rows[0].note).toMatch(/^duplicate rows/);
    expect(three.unread.map((u) => u.reason)).toEqual(Array(3).fill('duplicate: m1/sgd.tShare/MFCG/80/river+coast/all, m1/sgd.tShare/MFCG/80/plain/all, m1/sgd.tShare/MFCG/80/plain-b/all'));
    // a row matched to another rung is not this run's; a row matched to the rung wins over an unmatched one
    expect(report([{ ...tY('plain'), matched: { rung: 'TOWN', mfcgSize: 40 } }], o).rows[0].verdict).toBe('fail');
    const unmatched = { ...tY('plain'), id: 'm1/sgd.tShare/MFCG/any/plain/all', matched: undefined } as Baseline;
    const both = report([unmatched, tY('plain')], o);
    expect(both.rows[0].baselineIds).toEqual(['m1/sgd.tShare/MFCG/80/plain/all']);
    expect(both.unread[0].reason).toBe('unmatched; a row matched to CITY is read');
  });

  it('an n-0 row with every member failed reads reported, and passes the loader with seeds = its member count (N-31 (3))', () => {
    const n0 = share4(0.05, { role: 'descriptive', values: { n: 0, seeds: 3 }, sample: { family: 'capture/NG', captures: ['a', 'b', 'c'], failed: [0, 1, 2].map((index) => ({ index, reason: 'not reproducible across seeds' })) } });
    const f = readBaselines(JSON.stringify([n0]), 'b.json');
    expect(f.info).toEqual([]);
    expect(report([n0], ours([scalar('junction.share4', 'all', [0.05])])).rows[0].verdict).toBe('reported');
    // n > 0 with seeds unlike its members outside failed: an information line, no verdict changed
    const odd = share4(0.05, { values: { p10: 0.026, p50: 0.05, p90: 0.077, n: 5, seeds: 7 }, sample: { family: 'capture/NG', indices: [0, 6], failed: [{ index: 2, reason: 'timeout' }] } });
    expect(readBaselines(JSON.stringify([odd]), 'b.json').info).toEqual(['row m1/junction.share4/NG/medium/all: values.seeds 7 differs from its 5 members outside sample.failed (N-31 (3))']);
  });

  it('a superseded row, another metricVersion, another unit and an undeclared reference are listed unread', () => {
    const old = share4(0.04, { id: 'm1/junction.share4/NG/old/all' });
    const now = share4(0.05, { supersedes: old.id });
    const r = report(
      [old, now, share4(0.05, { id: 'v2/junction.share4/NG/all', metricVersion: '2.0.0' }), share4(0.05, { id: 'u/junction.share4/NG/all', unit: 'ratio' }), share4(0.05, { id: 'f/junction.share4/FTG/all', reference: 'FTG' })],
      ours([scalar('junction.share4', 'all', [0.05])]),
    );
    expect(r.rows[0].baselineIds).toEqual([now.id]);
    expect(r.unread.map((u) => u.reason)).toEqual([
      `superseded by ${now.id}`,
      'metricVersion 2.0.0; the registry measures 1.0.0',
      "unit ratio; the registry's is share",
      'reference FTG is not read for junction.share4 at M0',
    ]);
  });

  it("an entry our side finds inapplicable reads notApplicable for each reference; the report's rows carry the run's setting", () => {
    const r = report([], ours([{ metric: 'block.courtShare', metricVersion: '1.0.0', key: 'all', notApplicable: 'no deep built block' }]));
    expect(verdicts(r)).toEqual(['notApplicable', 'notApplicable']);
    expect(r.rows[0]).toMatchObject({ rung: 'CITY', preset: 'default', setting: { population: 20000, water: 'none', seedFamily: 'test/k05', seeds: 3 }, note: 'no deep built block' });
  });
});
