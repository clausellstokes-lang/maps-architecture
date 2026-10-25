// M0-a-09's judge pinned where the agreement runs cannot fail on it (round S9's Q84; M0-a-08 s4's N1 / Z26, routed by
// J402): ours is held to the hard ring checks (`own`, M0-k-03's `ringProblems`) on EVERY case — an unattracted one too —
// so an invalid output of ours that the region comparison passes (`compareSplit` against the oracle's union: the same
// point set, |Δ| 0) fails the verdict. The oracle's answer is planted (the union of a square and a triangle), so the rule
// meets the input that reaches it; the model is arr-booleans-buffers/harness.test.ts's N1 pin. No behaviour of
// support.ts changes here (its judge applies own() on every case); the pin is red under the mutant "own() on attracted
// cases only".
import type { Cm, LatticePoint, Warning } from '@plat/kernel';
import { beforeAll, describe, expect, it } from 'vitest';
import { compareSplit, loadOracles, type OracleEngine, type OracleResult } from '../../../src/oracles/index.js';
import { perimeterOf } from '../../../src/oracles/rings.js';
import { judge, newHarness, verdict } from './support.js';

const pt = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });
const SQUARE = [pt(0, 0), pt(1000, 0), pt(1000, 1000), pt(0, 1000)];
const TRI = [pt(3000, 0), pt(4000, 0), pt(3500, 800)];

/** The oracle's planted answer: the union of the square and the triangle (two faces, one region). */
const union = (e: OracleEngine): OracleResult => ({ ok: true, engine: e, rings: [SQUARE.slice(), TRI.slice()], perimeterCm: perimeterOf([SQUARE, TRI]) });

/** Ours: the square twice and the triangle — the union's point set, but the doubled square's edges overlap (invalid). */
const DOUBLED = (): LatticePoint[][] => [SQUARE.slice(), SQUARE.slice(), TRI.slice()];

const ATTRACTED: Warning[] = [{ code: 'W_ATTRACTED', count: 1 }];

beforeAll(async () => {
  await loadOracles();
});

describe('arr-bands judge: ours held to the hard ring checks on every case (Q84; M0-k-03 N1)', () => {
  it('an unattracted case: an invalid ours that passes compareSplit against the oracle fails the verdict', () => {
    // the region comparison alone passes it (the same point set, |Δ| 0), as an unattracted pass
    for (const e of ['clipper2', 'polygon-clipping'] as const) expect(compareSplit(DOUBLED(), union(e), [])).toMatchObject({ split: 'unattracted', pass: true });
    const h = newHarness();
    judge(h, 'op', 'fam', DOUBLED(), union, [], 'case');
    // the report counts it an unattracted pass; the judge keeps one 'ours invalid' line all the same
    expect(h.report.line('op')).toMatchObject({ draws: 1, unattracted: 1, unattractedPass: 1, attracted: 0 });
    expect(h.failures).toHaveLength(1);
    expect(h.failures[0]).toMatch(/^op fam: ours invalid: .*crossing edges/);
    // so the verdict throws on h.failures (the first assertion it makes: the failures list is the one non-empty array)
    expect(() => {
      verdict(h, 'op', 1);
    }).toThrow(/expected \[ Array\(1\) \] to deeply equal \[\]/);
  });

  it('an attracted case: the same check (it is on every case, never only on the attracted ones)', () => {
    const h = newHarness();
    judge(h, 'op', 'fam', DOUBLED(), union, ATTRACTED, 'case');
    expect(h.report.line('op')).toMatchObject({ draws: 1, unattracted: 0, attracted: 1 });
    // the judge's own line (compareSplit fails an attracted invalid result against each oracle besides)
    expect(h.failures.filter((f) => f.startsWith('op fam: ours invalid: '))).toHaveLength(1);
    expect(h.failures[0]).toMatch(/^op fam: ours invalid: .*crossing edges/);
  });

  it('the control: a valid ours of the same region passes the judge and the verdict', () => {
    const h = newHarness();
    judge(h, 'op', 'fam', [SQUARE.slice(), TRI.slice()], union, [], 'case');
    expect(h.failures).toEqual([]);
    expect(h.report.line('op')).toMatchObject({ draws: 1, unattracted: 1, unattractedPass: 1 });
    expect(() => {
      verdict(h, 'op', 1);
    }).not.toThrow();
  });
});
