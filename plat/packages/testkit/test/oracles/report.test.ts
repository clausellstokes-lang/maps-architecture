// M0-k-03's exit bar "the comparison harness reports both shares and the draw count" (§3.7, §13.1): the report's
// arithmetic on planted verdicts, how a case is counted — one case, judged against EACH oracle (§3.7), is one draw of
// §13.1's count (C-0148 (1); the check's F2), how a refused verdict is counted — apart, never as a pass or a failure
// (C-0150) — and the harness end to end: one oracle standing in for ours (our booleans and buffers are M0-a-08's),
// compared against both oracles, warnings drawn so both sides of the split are populated.
import fc from 'fast-check';
import { beforeAll, describe, expect, it } from 'vitest';
import type { Warning } from '@plat/kernel';
import {
  ORACLE_ENGINES,
  OracleReport,
  UNATTRACTED_DRAW_MIN,
  compareSplit,
  loadOracles,
  oracleBoolean,
  oracleBuffer,
} from '../../src/oracles/index.js';
import type { OracleEngine, OracleResult, Verdict } from '../../src/oracles/types.js';
import { booleanCase, bufferCase } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

function verdict(engine: OracleEngine, split: Verdict['split'], pass: boolean, failures: string[] = []): Verdict {
  return {
    split,
    pass,
    refused: false,
    engine,
    faces: { ours: 1, oracle: 1 },
    symDiffCm2: 0,
    crossCheckCm2: 0,
    crossChecked: true,
    perimeterCm: 1,
    boundCm2: 1,
    failures,
  };
}

/** A refused verdict against one engine (C-0150). */
function refusedBy(engine: OracleEngine, split: Verdict['split']): Verdict {
  return { ...verdict(engine, split, false, [`refused: ${engine}: planted`]), refused: true };
}

/** One case: its verdict against Clipper2 and against polygon-clipping. */
function both(split: Verdict['split'], passC: boolean, passP: boolean, failC: string[] = [], failP: string[] = []): Verdict[] {
  return [verdict('clipper2', split, passC, failC), verdict('polygon-clipping', split, passP, failP)];
}

describe('the comparison harness reports both shares and the draw count', () => {
  it('counts one draw per case judged against every oracle; a case passes only when every verdict passes', () => {
    const r = new OracleReport();
    r.record('union', both('unattracted', true, true));
    r.record('union', both('unattracted', true, false, [], ['faces', 'area']));
    r.record('union', both('attracted', true, true));
    // the verdicts in either order; the reason is the first failing verdict's in engine order (Clipper2 first)
    r.record('union', both('attracted', false, false, ['invalid: fold-back'], ['area']).reverse());
    r.record('buffer', both('unattracted', false, true, ['oracle: planted']));
    expect(r.ops()).toEqual(['buffer', 'union']);
    const u = r.line('union');
    expect(u).toEqual({
      draws: 4,
      unattracted: 2,
      attracted: 2,
      unattractedPass: 1,
      attractedPass: 1,
      unattractedShare: 0.5,
      attractedShare: 0.5,
      failures: { faces: 1, invalid: 1 },
      refusals: {},
      unjudged: 0,
    });
    expect(r.unattractedDraws('union')).toBe(2);
    expect(r.unattractedDraws('xor')).toBe(0);
    expect(r.meetsDrawCount('union')).toBe(false);
    expect(r.meetsDrawCount('union', 2)).toBe(true);
    expect(UNATTRACTED_DRAW_MIN).toBe(100_000);
    expect(r.allPass()).toBe(false);
    const json = JSON.parse(JSON.stringify(r)) as ReturnType<OracleReport['toJSON']>;
    expect(json.unattractedDrawMin).toBe(100_000);
    expect(json.ops.buffer.failures).toEqual({ oracle: 1 });
    expect(Object.keys(json.ops)).toEqual(['buffer', 'union']);
  });

  it('refuses anything but one verdict per oracle on one split, and counts nothing it refuses', () => {
    const r = new OracleReport();
    const [c, p] = both('unattracted', true, true);
    expect(ORACLE_ENGINES).toEqual(['clipper2', 'polygon-clipping']);
    expect(() => r.record('union', [c])).toThrow(/no verdict against polygon-clipping/);
    expect(() => r.record('union', [p])).toThrow(/no verdict against clipper2/);
    expect(() => r.record('union', [])).toThrow(/no verdict against clipper2/);
    expect(() => r.record('union', [c, c])).toThrow(/two verdicts against clipper2/);
    expect(() => r.record('union', [c, p, p])).toThrow(/two verdicts against polygon-clipping/);
    expect(() => r.record('union', [c, { ...p, engine: 'jsts' as OracleEngine }])).toThrow(/unknown oracle jsts/);
    expect(() => r.record('union', [c, { ...p, split: 'attracted' }])).toThrow(/split/);
    expect(() => r.record('union', c as unknown as Verdict[])).toThrow(/array/);
    expect(() => r.record('union', [c])).toThrow(/^oracles: OracleReport.record takes one case/);
    expect(r.ops()).toEqual([]);
    expect(r.unattractedDraws('union')).toBe(0);
  });

  it('sets a refused verdict aside: counted under its engine, the case judged by the others, a case all refused unjudged', () => {
    const r = new OracleReport();
    // polygon-clipping refused: the case is Clipper2's verdict alone
    r.record('union', [verdict('clipper2', 'unattracted', true), refusedBy('polygon-clipping', 'unattracted')]);
    r.record('union', [verdict('clipper2', 'unattracted', false, ['area']), refusedBy('polygon-clipping', 'unattracted')]);
    // Clipper2 refused, first in engine order: the reason is the failing verdict left, not the refusal
    r.record('union', [refusedBy('clipper2', 'attracted'), verdict('polygon-clipping', 'attracted', false, ['invalid: planted'])]);
    // every oracle refused: unjudged — not a draw, a pass or a failure
    r.record('union', [refusedBy('clipper2', 'unattracted'), refusedBy('polygon-clipping', 'unattracted')]);
    expect(r.line('union')).toEqual({
      draws: 3,
      unattracted: 2,
      attracted: 1,
      unattractedPass: 1,
      attractedPass: 0,
      unattractedShare: 2 / 3,
      attractedShare: 1 / 3,
      failures: { area: 1, invalid: 1 },
      refusals: { clipper2: 2, 'polygon-clipping': 3 },
      unjudged: 1,
    });
    expect(r.unattractedDraws('union')).toBe(2);
    // an unjudged case alone neither fails the report nor counts toward the guard
    const u = new OracleReport();
    u.record('xor', [refusedBy('clipper2', 'unattracted'), refusedBy('polygon-clipping', 'unattracted')]);
    expect(u.allPass()).toBe(true);
    expect(u.unattractedDraws('xor')).toBe(0);
    expect(u.meetsDrawCount('xor', 1)).toBe(false);
    expect(u.line('xor').unjudged).toBe(1);
    expect(u.ops()).toEqual(['xor']);
    // the shape rules hold for refused verdicts too
    expect(() => u.record('xor', [refusedBy('clipper2', 'unattracted')])).toThrow(/no verdict against polygon-clipping/);
    expect(() => u.record('xor', [refusedBy('clipper2', 'unattracted'), refusedBy('polygon-clipping', 'attracted')])).toThrow(/split/);
  });

  it('meets the guard at 10⁵ unattracted cases exactly — not at 10⁵ verdicts', () => {
    const kase = both('unattracted', true, true);
    // 5 × 10⁴ cases, each judged against both oracles: 10⁵ verdicts, 5 × 10⁴ draws, the guard not met
    const half = new OracleReport();
    for (let i = 0; i < UNATTRACTED_DRAW_MIN / 2; i += 1) half.record('union', kase);
    expect(half.unattractedDraws('union')).toBe(UNATTRACTED_DRAW_MIN / 2);
    expect(half.meetsDrawCount('union')).toBe(false);
    const r = new OracleReport();
    for (let i = 0; i < UNATTRACTED_DRAW_MIN - 1; i += 1) r.record('xor', kase);
    expect(r.meetsDrawCount('xor')).toBe(false);
    r.record('xor', both('attracted', true, true));
    expect(r.meetsDrawCount('xor')).toBe(false);
    r.record('xor', kase);
    expect(r.meetsDrawCount('xor')).toBe(true);
    expect(r.line('xor').draws).toBe(UNATTRACTED_DRAW_MIN + 1);
    expect(r.allPass()).toBe(true);
  });

  it('end to end on random booleans and buffers: every case judged against each oracle, recorded once under its operation', { timeout: 600_000 }, () => {
    const report = new OracleReport();
    const warnings = (attracted: boolean): Warning[] =>
      attracted ? [{ code: 'W_ATTRACTED', count: 1 }] : [{ code: 'W_PROMOTED', count: 1 }];
    // ours is one oracle's answer — the other's when that one refused (C-0150)
    const judge = (ours: OracleResult, other: OracleResult, oracles: Record<OracleEngine, OracleResult>, w: Warning[]): Verdict[] => {
      const stand = ours.ok ? ours : other;
      return ORACLE_ENGINES.map((e) => compareSplit(stand.ok ? stand.rings : [], oracles[e], w));
    };
    let cases = 0;
    const booleans = fc.sample(fc.tuple(booleanCase, fc.integer({ min: 0, max: 9 })), 2_000);
    for (const [{ op, fill, a, b }, d] of booleans) {
      const c = oracleBoolean(op, a, b, fill, 'clipper2');
      const p = oracleBoolean(op, a, b, fill, 'polygon-clipping');
      report.record(op, judge(p, c, { clipper2: c, 'polygon-clipping': p }, warnings(d < 3)));
      cases += 1;
    }
    const buffers = fc.sample(fc.tuple(bufferCase, fc.integer({ min: 0, max: 9 })), 500);
    for (const [{ chains, w, joins, ends }, d] of buffers) {
      const c = oracleBuffer(chains, w, joins, ends, 'clipper2');
      const p = oracleBuffer(chains, w, joins, ends, 'polygon-clipping');
      report.record('buffer', judge(c, p, { clipper2: c, 'polygon-clipping': p }, warnings(d < 3)));
      cases += 1;
    }
    const json = report.toJSON();
    let draws = 0;
    let unjudged = 0;
    let refusals = 0;
    for (const op of report.ops()) {
      const l = json.ops[op];
      draws += l.draws;
      unjudged += l.unjudged;
      refusals += Object.values(l.refusals).reduce((s, n) => s + n, 0);
      expect(l.unattracted + l.attracted).toBe(l.draws);
      expect(l.unattractedShare + l.attractedShare).toBeCloseTo(1, 12);
      expect(l.unattractedShare).toBeCloseTo(l.unattracted / l.draws, 12);
      expect(l.unattracted).toBeGreaterThan(0);
      expect(l.attracted).toBeGreaterThan(0);
      const failed = Object.values(l.failures).reduce((s, n) => s + n, 0);
      expect(l.unattractedPass + l.attractedPass + failed).toBe(l.draws);
      // Ours here is one oracle: the unattracted cases pass but where the two libraries' snapped rings differ in face
      // count (a touch the snap closes or opens); an attracted case fails only as invalid — an oracle keeps the
      // sub-minEdge edges our engine's attraction removes — never on its area or its cross-check.
      expect(l.unattractedPass / l.unattracted).toBeGreaterThan(0.97);
      for (const reason of Object.keys(l.failures)) expect(['faces', 'invalid']).toContain(reason);
      expect(report.meetsDrawCount(op)).toBe(false);
    }
    // one draw per case, though each case carries a verdict against each of the two oracles; a refusal is rare (the
    // agreement test bounds it) and no case goes unjudged
    expect(cases).toBe(2_500);
    expect(unjudged).toBe(0);
    expect(refusals).toBeLessThanOrEqual(5);
    expect(draws).toBe(cases);
    expect(report.ops()).toEqual(['buffer', 'difference', 'intersection', 'union', 'xor']);
    console.info(`oracles/report: ${JSON.stringify(json)}`);
  });
});
