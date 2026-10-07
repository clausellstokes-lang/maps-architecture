// The band-rule verdicts on planted rows (M0-b-05; the listed test: "a passing target row, a failing one, a distribution
// row with spreadKS, one without (missingBaseline for a non-m1 cell), an m1 cell with no row → fail, a descriptive row →
// reported (C-0092, C-0116)"). Our side is planted as a ParityOurs; the rows are planted in memory; the verdicts are
// the harness's (`judgedReport`: M0-k-05's parity report with §13.5's row-specific bands) and its gate (`holds`).
import { describe, expect, it } from 'vitest';
import { H128, utf8Bytes } from '@plat/kernel';
import { bandRule, type Baseline, type OursEntry, type ParityOurs } from '@plat/testkit';
import { absoluteClause, holds, judgedReport, reportClauses, type Clause } from '../../src/bentcut-ng/index.js';
import { baselinesText, lengthHistogram, areaHistogram, row, scalar } from './support.js';

function ours(entries: OursEntry[], seeds = 3): ParityOurs {
  return { schema: 'plat.parity-ours/1', date: '2026-10-04', outputVersion: 'M0', generatorVersion: 'bentcut-ng', rung: 'CITY', preset: 'default', setting: { population: 0, water: 'none', seedFamily: 'test', seeds }, entries };
}

function judge(rows: Baseline[], entries: OursEntry[]): Clause[] {
  const o = ours(entries);
  const rep = judgedReport(rows, H128(utf8Bytes(baselinesText(rows))), o, []);
  return reportClauses(rep, o, rows, () => true);
}

const scalarEntry = (metric: string, key: string, perSeed: number[]): OursEntry => ({ metric, metricVersion: '1.0.0', key, perSeed });
const sampleEntry = (metric: string, key: string, samples: number[][]): OursEntry => ({ metric, metricVersion: '1.0.0', key, samples });

/** Lengths (m) spread over 10 – 90 m, and a sample far from them. */
const NEAR = Array.from({ length: 40 }, (_, i) => 10 + 2 * i);
const FAR = Array.from({ length: 40 }, (_, i) => 250 + i);

describe('the band-rule verdicts on planted rows (C-0092, C-0116)', () => {
  it('a passing target row and a failing one (the fillet share ± 0.05 of the row)', () => {
    const rows = [row('cut.fillet', 'all', scalar(0.53))];
    const pass = judge(rows, [scalarEntry('cut.fillet', 'all', [0.57, 0.58, 0.575])]);
    const fail = judge(rows, [scalarEntry('cut.fillet', 'all', [0.59, 0.585, 0.6])]);
    expect([pass[0].verdict, pass[0].band, pass[0].ours]).toEqual(['pass', { lo: 0.53 - 0.05, hi: 0.53 + 0.05 }, 0.575]);
    expect([fail[0].verdict, fail[0].ours]).toEqual(['fail', 0.59]);
    expect(holds(pass[0])).toBe(true);
    expect(holds(fail[0])).toBe(false);
    // The ± 0.05 band, not the generic one: the generic rule (± 15 % of 0.53) would pass 0.59 and fail 0.44.
    expect(bandRule(rows[0], { perSeed: [0.59], seeds: 1 }).verdict).toBe('pass');
    expect(judge(rows, [scalarEntry('cut.fillet', 'all', [0.59])])[0].verdict).toBe('fail');
    expect(bandRule(rows[0], { perSeed: [0.44], seeds: 1 }).verdict).toBe('fail');
    expect(judge(rows, [scalarEntry('cut.fillet', 'all', [0.48])])[0].verdict).toBe('pass');
    // Just outside on either side: fail.
    expect(judge(rows, [scalarEntry('cut.fillet', 'all', [0.5805])])[0].verdict).toBe('fail');
    expect(judge(rows, [scalarEntry('cut.fillet', 'all', [0.4795])])[0].verdict).toBe('fail');
  });

  it('a σ or fillet row without p50 fails under the ± band, though the generic band would pass it (fail-safe)', () => {
    const r = row('cut.sigma', 'plain', { p10: 0.07, p90: 0.1, n: 20, seeds: 20 });
    expect(bandRule(r, { perSeed: [0.085], seeds: 1 }).verdict).toBe('pass');
    const c = judge([r], [scalarEntry('cut.sigma', 'plain', [0.085])]);
    expect([c[0].verdict, c[0].note]).toEqual(['fail', 'σ within ± 0.02 of the row (§13.5 bent-cut row; §16 M0 (b)); the row carries no p50 for the ± band (fail-safe)']);
    const f = judge([row('cut.fillet', 'all', { p10: 0.5, p90: 0.56, n: 20, seeds: 20 })], [scalarEntry('cut.fillet', 'all', [0.53])]);
    expect(f[0].verdict).toBe('fail');
  });

  it('a distribution row with spreadKS: ours ≤ 1.25 × spreadKS.p90 passes, beyond it fails', () => {
    const rows = [row('cut.length', 'all', lengthHistogram(NEAR), { spreadKS: { p90: 0.2, pairs: 190 } })];
    const near = judge(rows, [sampleEntry('cut.length', 'all', [NEAR, NEAR.map((x) => x + 1), NEAR.map((x) => x + 2)])]);
    const far = judge(rows, [sampleEntry('cut.length', 'all', [FAR, NEAR, FAR])]);
    expect([near[0].verdict, near[0].band]).toEqual(['pass', { ksMax: 0.25 }]);
    expect(near[0].ours).toBeLessThanOrEqual(0.25);
    expect([far[0].verdict, far[0].ours]).toEqual(['fail', 1]);
  });

  it('a distribution row without spreadKS: missingBaseline for a non-⟨M-1⟩ cell, fail for the harness\'s ⟨M-1⟩ cells', () => {
    const noKs = row('cut.length', 'all', lengthHistogram(NEAR));
    // M0-k-05's band rule, which the harness reads through: a non-⟨M-1⟩ cell reads missingBaseline …
    expect(bandRule(noKs, { samples: [NEAR], seeds: 1 }, { m1: false }).verdict).toBe('missingBaseline');
    // … and cut.length and block.area, the distributions the harness compares, are ⟨M-1⟩ cells: fail (C-0116, N-06).
    const c = judge([noKs], [sampleEntry('cut.length', 'all', [NEAR])]);
    expect([c[0].verdict, c[0].note]).toEqual(['fail', '⟨M-1⟩ row lacks spreadKS (N-06)']);
    // A non-⟨M-1⟩ cell of the harness with no row at all reads missingBaseline, and fails the gate.
    const s = judge([], [scalarEntry('cut.sigma', 'plain', [0.08])]);
    expect([s[0].verdict, holds(s[0])]).toEqual(['missingBaseline', false]);
  });

  it('an ⟨M-1⟩ cell with no row: fail, named ⟨M-1⟩ row missing', () => {
    const c = judge([row('block.area', 'all', areaHistogram([300, 900, 2_000]), { spreadKS: { p90: 0.3, pairs: 190 } })], [
      sampleEntry('block.area', 'all', [[300, 900, 2_000]]),
      sampleEntry('block.area', 'template-ring', [[300, 900]]),
    ]);
    expect(c.map((x) => [x.id, x.verdict])).toEqual([
      ['block.area/all', 'pass'],
      ['block.area/template-ring', 'fail'],
    ]);
    expect(c[1].note).toBe('⟨M-1⟩ row missing (NG, template-ring)');
  });

  it('a descriptive row: reported, and a gating clause on it holds (C-0071, C-0116); a target row of n 0 does not', () => {
    const failed = { family: 'test/plain', indices: [0, 2] as [0, number], failed: [{ index: 0, reason: 'not reproducible' }, { index: 1, reason: 'not reproducible' }] };
    const desc = row('cut.length', 'all', { n: 0, seeds: 0 }, { role: 'descriptive', sample: failed });
    const c = judge([desc], [sampleEntry('cut.length', 'all', [NEAR])]);
    expect([c[0].verdict, c[0].role, holds(c[0])]).toEqual(['reported', 'descriptive', true]);
    const target0 = row('cut.length', 'all', { n: 0, seeds: 0 }, { sample: failed });
    const t = judge([target0], [sampleEntry('cut.length', 'all', [NEAR])]);
    expect([t[0].verdict, t[0].role, holds(t[0])]).toEqual(['reported', 'target', false]);
  });

  it('the corner and arrival rows are reported beside ours; the absolute clauses judge ours at their bounds', () => {
    const c = judge([row('cut.cornerMid', 'all', scalar(0.88)), row('cut.arrival85', 'all', scalar(0.97))], [scalarEntry('cut.cornerMid', 'all', [0.5]), scalarEntry('cut.arrival85', 'all', [0.5])]);
    expect(c.map((x) => x.verdict)).toEqual(['reported', 'reported']);
    expect(absoluteClause('corner', 'cut.cornerMid', 0.8, 10, 0.8, c[0]).verdict).toBe('pass');
    expect(absoluteClause('corner', 'cut.cornerMid', 0.7999, 10, 0.8, c[0]).verdict).toBe('fail');
    expect(absoluteClause('arrival', 'cut.arrival85', 0.95, 10, 0.95, c[1]).verdict).toBe('pass');
    expect(absoluteClause('arrival', 'cut.arrival85', 0.9499, 10, 0.95, c[1]).verdict).toBe('fail');
    expect(absoluteClause('corner', 'cut.cornerMid', 1, 0, 0.8, undefined).verdict).toBe('notApplicable');
    expect(absoluteClause('corner', 'cut.cornerMid', null, 5, 0.8, undefined).verdict).toBe('notApplicable');
    expect(absoluteClause('corner', 'cut.cornerMid', 0.9, 4, 0.8, c[0]).baselineIds).toEqual(['test/ng/cut.cornerMid/all']);
  });

  it('a row flagged sign-indefinite reads notApplicable (V12 §3.5 at M1), never pass, and fails the gate', () => {
    const r = { ...row('cut.fillet', 'all', scalar(0.53)), signIndefinite: true } as Baseline;
    const c = judge([r], [scalarEntry('cut.fillet', 'all', [0.53])]);
    expect([c[0].verdict, holds(c[0])]).toEqual(['notApplicable', false]);
  });
});
