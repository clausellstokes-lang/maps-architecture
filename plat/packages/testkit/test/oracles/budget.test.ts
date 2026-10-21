// M0-k-03's hardening round S1 (KI-6, L18; C-0414): polygon-clipping's step budget and the replay seed of a refusal.
// KI-6: on some inputs polygon-clipping 0.15.7 never returns — its sweep's walk past consumed segments cycles — so every
// library call runs under a step budget counted on the library's own splay trees (`polygon-clipping.ts`): an attempt
// that overruns is set aside like a throw and the next quarter turn tried; when no turn is accepted the call is a typed
// refusal marked `overran`, carrying the run's replay seed. The two cases met so far are pinned here, each of which
// hangs without the guard (the test then times out): the register's `oracleHang` case H-offsetFace-6101 (M0-a-08's
// `register.json`, replayed end to end through its harness's own face construction, read and never edited), and the
// buffer case agreement-buffer drew at PLAT_FUZZ_SEED=1595 and 1 000 runs (2026-10-20) — both answered under another
// turn, so the guard turns a hang into an answer, and under a small budget into the typed refusal the harnesses read
// as before (a refused oracle result: N-39's step `own`). L18: the agreement runs' seed, cap per size and report line.
import { readFileSync } from 'node:fs';
import fc from 'fast-check';
import { beforeAll, describe, expect, it } from 'vitest';
import { faceEdges, type LatticePoint } from '@plat/kernel';
import { compareSplit, loadOracles, oracleBoolean, oracleBuffer, type OracleResult } from '../../src/oracles/index.js';
import { STEP_BUDGET_BASE, STEP_BUDGET_PER_VERTEX, stepCounts, withStepBudget } from '../../src/oracles/polygon-clipping.js';
import { replaySeed } from '../../src/oracles/refusal.js';
import { seedFamily } from '../../src/fuzz/index.js';
import type { EndKind, JoinKind } from '../../src/oracles/types.js';
import { arenaFace, oracleOffset, ringsOfEdges } from '../kernel/arr-booleans-buffers/support.js';
import { agreementLine, agreementParams, agreementRefusalCap, newTally, oraclesAgree, R, rect } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

/** A hang case's buffer call, as its fixture holds it. */
interface HangCase {
  chains: LatticePoint[][];
  w: number | number[];
  joins: JoinKind;
  ends: EndKind;
}

function fixture(name: string): HangCase {
  return (JSON.parse(readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8')) as { case: HangCase }).case;
}

/** The register's oracleHang case (M0-a-08's file, read only). */
function registerHang(): { id: string; input: { rings: LatticePoint[][]; dists: number[] } } {
  const reg = JSON.parse(readFileSync(new URL('../kernel/arr-booleans-buffers/register.json', import.meta.url), 'utf8')) as {
    oracleHang: { id: string; input: { rings: LatticePoint[][]; dists: number[] } }[];
  };
  return reg.oracleHang[0];
}

const HANG_6101 = fixture('hang-6101-offsetface-buffer.json');
const HANG_1595 = fixture('hang-1595-buffer.json');

/** The case's buffer through both oracles, and how many attempts overran while polygon-clipping answered it. */
function bothBuffers(c: HangCase): { clipper2: OracleResult; pc: OracleResult; overruns: number } {
  const clipper2 = oracleBuffer(c.chains, c.w, c.joins, c.ends, 'clipper2');
  const before = stepCounts().overruns;
  const pc = oracleBuffer(c.chains, c.w, c.joins, c.ends, 'polygon-clipping');
  return { clipper2, pc, overruns: stepCounts().overruns - before };
}

/** Runs `fn` with fast-check's global seed set to `seed` (as PLAT_FUZZ_SEED sets it), the configuration restored after. */
function withGlobalSeed<T>(seed: number, fn: () => T): T {
  const before = fc.readConfigureGlobal();
  fc.configureGlobal({ ...before, seed });
  try {
    return fn();
  } finally {
    fc.configureGlobal(before);
  }
}

describe('polygon-clipping runs under a step budget (KI-6)', () => {
  it('counts the library’s own steps, and states the budget C-0414 measured', () => {
    const r = oracleBoolean('union', [rect(0, 0, 100, 100)], [rect(50, 50, 150, 150)], 'nonzero', 'polygon-clipping');
    expect(r.ok).toBe(true);
    const { lastTaken } = stepCounts();
    expect(lastTaken).toBeGreaterThan(0);
    expect(lastTaken).toBeLessThan(STEP_BUDGET_BASE);
    // 2²¹ + 2¹³ per input vertex: the largest call measured took 532 876 steps, the most per vertex 459 (C-0414 (2))
    expect([STEP_BUDGET_BASE, STEP_BUDGET_PER_VERTEX]).toEqual([2_097_152, 8_192]);
  });

  it('stops a call past its budget, sets every turn aside and refuses, marked overran (the message pinned)', () => {
    const r = withStepBudget({ base: 5, perVertex: 1 }, () =>
      oracleBoolean('union', [rect(0, 0, 100, 100)], [rect(50, 50, 150, 150)], 'nonzero', 'polygon-clipping'),
    );
    const turn = 'overran its step budget (16 steps; budget 15 for 10 input vertices)';
    expect(r).toEqual({
      ok: false,
      engine: 'polygon-clipping',
      error: `polygon-clipping: no quarter turn gave the operands' region — turn 0°: ${turn}; turn 90°: ${turn}; turn 180°: ${turn}; turn 270°: ${turn}`,
      refused: true,
      seed: replaySeed(),
      overran: true,
    });
    // the budget in force again: the same call answers
    expect(oracleBoolean('union', [rect(0, 0, 100, 100)], [rect(50, 50, 150, 150)], 'nonzero', 'polygon-clipping').ok).toBe(true);
  });

  it('budgets the even-odd operand’s own xor of its fan pieces: a bow-tie overruns there first (the message pinned; S2, Kc)', () => {
    // a bow-tie (its ring crosses itself at (50, 50)) is not simple, so under the even-odd rule `operandGeometry` turns it
    // into the xor of its two fan triangles — a library call of its own, 6 input vertices — before `apply` unions the
    // result with the square (12 input vertices: the xor's two closed triangles, 4 + 4, and the square's 4). Under a
    // budget of 5 steps the fan xor is the call that overruns, on every turn; were it unbudgeted, `apply` would be.
    const bowTie = R([0, 0], [100, 100], [100, 0], [0, 100]);
    const square = rect(200, 0, 300, 100);
    const r = withStepBudget({ base: 5, perVertex: 0 }, () => oracleBoolean('union', [bowTie], [square], 'evenodd', 'polygon-clipping'));
    const turn = 'overran its step budget (6 steps; budget 5 for 6 input vertices)';
    expect(r).toEqual({
      ok: false,
      engine: 'polygon-clipping',
      error: `polygon-clipping: no quarter turn gave the operands' region — turn 0°: ${turn}; turn 90°: ${turn}; turn 180°: ${turn}; turn 270°: ${turn}`,
      refused: true,
      seed: replaySeed(),
      overran: true,
    });
    // the same case under the default budget answers (the fan xor and the union both well inside it)
    expect(oracleBoolean('union', [bowTie], [square], 'evenodd', 'polygon-clipping').ok).toBe(true);
  });

  it('the register’s oracleHang case H-offsetFace-6101: its buffer call answers under another turn and agrees with Clipper2', { timeout: 120_000 }, () => {
    const { clipper2, pc, overruns } = bothBuffers(HANG_6101);
    expect(overruns, 'the identity turn overran').toBeGreaterThanOrEqual(1);
    expect(pc.ok).toBe(true);
    const tally = newTally();
    expect(oraclesAgree(clipper2, pc, tally)).toBe(true);
    expect([tally.compared, tally.refusals]).toEqual([1, {}]);
  });

  it('the register’s oracleHang case end to end: the harness’s oracleOffset on its face terminates and both oracles agree', { timeout: 120_000 }, () => {
    const c = registerHang();
    expect(c.id).toBe('H-offsetFace-6101');
    const af = arenaFace(c.input.rings);
    if (af === null) throw new Error('the register case has no face');
    const edges = faceEdges(af.tx, af.face);
    const rings = ringsOfEdges(edges);
    const d = edges.map((_, i) => c.input.dists[i % c.input.dists.length]);
    const before = stepCounts().overruns;
    const pc = oracleOffset(rings, edges, d, 'polygon-clipping');
    expect(stepCounts().overruns - before).toBeGreaterThanOrEqual(1);
    const tally = newTally();
    expect(oraclesAgree(oracleOffset(rings, edges, d, 'clipper2'), pc, tally)).toBe(true);
    expect([tally.compared, tally.refusals]).toEqual([1, {}]);
  });

  it('agreement-buffer’s case at PLAT_FUZZ_SEED=1595 (1 000 runs): answered under the 270° turn and agrees with Clipper2', { timeout: 120_000 }, () => {
    const { clipper2, pc, overruns } = bothBuffers(HANG_1595);
    expect(overruns, 'the identity turn overran').toBeGreaterThanOrEqual(1);
    expect(pc.ok).toBe(true);
    const tally = newTally();
    expect(oraclesAgree(clipper2, pc, tally)).toBe(true);
    expect([tally.compared, tally.refusals]).toEqual([1, {}]);
  });

  it('under a small budget the register’s case is a typed refusal carrying the seed, read by the comparison as before', { timeout: 120_000 }, () => {
    const c = HANG_6101;
    const r = withGlobalSeed(6101, () => withStepBudget({ base: 1_000, perVertex: 0 }, () => oracleBuffer(c.chains, c.w, c.joins, c.ends, 'polygon-clipping')));
    const turn = 'overran its step budget (1001 steps; budget 1000 for 1242 input vertices)';
    expect(r).toEqual({
      ok: false,
      engine: 'polygon-clipping',
      error: `polygon-clipping: no quarter turn gave the operands' region — turn 0°: ${turn}; turn 90°: ${turn}; turn 180°: ${turn}; turn 270°: ${turn}`,
      refused: true,
      seed: 6101,
      overran: true,
    });
    // unseeded (or PLAT_FUZZ_SEED's run): the refusal carries the run's own replay seed
    const u = withStepBudget({ base: 1_000, perVertex: 0 }, () => oracleBuffer(c.chains, c.w, c.joins, c.ends, 'polygon-clipping'));
    expect(!u.ok && [u.refused, u.overran, u.seed]).toEqual([true, true, replaySeed()]);
    // the comparison's classification of an oracle refusal is unchanged: a refused verdict naming it
    const v = compareSplit([], r, []);
    expect([v.refused, v.pass, v.failures]).toEqual([true, false, [`refused: ${r.ok ? '' : r.error}`]]);
  });
});

describe('the agreement runs replay from their seed and cap refusals per size (L18)', () => {
  it('each family’s seed: PLAT_FUZZ_SEED’s when set, else its fixed H32 seed; the size the test’s own 10⁴', () => {
    for (const [family, fixed] of [
      ['booleans', 738_464_587],
      ['buffers', 821_281_733],
    ] as const) {
      expect(seedFamily(`oracles/agreement/${family}`, 0) | 0).toBe(fixed);
      expect(agreementParams(family)).toEqual({ numRuns: 10_000, seed: replaySeed() ?? fixed });
      expect(withGlobalSeed(1595, () => agreementParams(family))).toEqual({ numRuns: 10_000, seed: 1595 });
    }
  });

  it('caps refusals at ⌈0.001 × cases⌉, at least 1', () => {
    expect([10_000, 1_000, 12_345, 1, 0].map(agreementRefusalCap)).toEqual([10, 1, 13, 1, 1]);
  });

  it('a refusal line carries the seed that replays it (the line pinned)', { timeout: 120_000 }, () => {
    const c = HANG_1595;
    const tally = newTally();
    const pc = withStepBudget({ base: 1_000, perVertex: 0 }, () => oracleBuffer(c.chains, c.w, c.joins, c.ends, 'polygon-clipping'));
    expect(oraclesAgree(oracleBuffer(c.chains, c.w, c.joins, c.ends, 'clipper2'), pc, tally)).toBe(true);
    expect(agreementLine('buffers', 1595, tally)).toBe(
      'oracles/buffers: seed 1595 — 0 of 1 cases compared and agree; refusals {"polygon-clipping":1} (cap 1; replay with PLAT_FUZZ_SEED=1595); face counts equal on 0; worst |Δ| ÷ perimeter 0.0000 cm',
    );
  });
});
