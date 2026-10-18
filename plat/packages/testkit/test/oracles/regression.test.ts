// M0-k-03's regression tests for the check `checks/M0-k-03.md` F4 (fix round 2; C-0150): two cases on which
// polygon-clipping 0.15.7 returns a wrong region without throwing. Case 1 — the agreement property's shrunk
// counterexample at fast-check seed −252324506 — is a union under non-zero with a self-crossing operand; case 2 — sample
// 2 198 of seed 110 in the checker's probe — is a difference under even-odd of simple rings, where the library's own
// xor of two of a's rings is wrong. Each case holds four things: the library's unchecked answer (the identity turn) is
// a wrong region and the region check says so; the adapter's answer is the operands' region or a typed refusal, never
// the wrong region; Clipper2's answer passes the same check; and the two oracles agree within perimeter × 1 cm — or
// polygon-clipping refuses.
// Fix round 3 (the check's F5; C-0150 (3)): the region check also guards `symDiffArea`'s measuring xor and `faceCount`'s
// canonicalising union, and case 2's wrong step is exactly the first of those calls — the library's xor of a's rings r0
// and r2. The last block holds both guards on those two rings: the library's identity-turn xor misses the true region
// by more than the bound, while `symDiffArea` through polygon-clipping gives the true area and agrees with Clipper2's;
// and the library's identity-turn union of r0 with r2 reversed (whose non-zero region is r0 Δ r2) is wrong as well,
// with fewer pieces, while `faceCount` counts the true four faces.
import { beforeAll, describe, expect, it } from 'vitest';
import { loadOracles, oracleBoolean, symDiffArea } from '../../src/oracles/index.js';
import { clipper2BooleanRaw } from '../../src/oracles/clipper2.js';
import { multiPolygonArea, polygonClippingAttempt, polygonClippingRaw } from '../../src/oracles/polygon-clipping.js';
import { checkOperand, regionCheck, regionMismatchCm2 } from '../../src/oracles/region-check.js';
import { faceCount } from '../../src/oracles/faces.js';
import { isOracleRefusal } from '../../src/oracles/refusal.js';
import type { BooleanOp, FillRule, Ring } from '../../src/oracles/types.js';
import { R, newTally, oraclesAgree, reversed } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

interface Case {
  name: string;
  op: BooleanOp;
  fill: FillRule;
  a: Ring[];
  b: Ring[];
  /** The library's wrong answer is off the operands' region by at least this much (cm²; the check measured more). */
  wrongBy: number;
}

const CASES: readonly Case[] = [
  {
    name: 'case 1: union, non-zero, a self-crossing ring (seed −252324506, shrunk)',
    op: 'union',
    fill: 'nonzero',
    a: [R([0, -372], [545, -286], [-1_515, 366], [140, 0], [546, -420], [0, -253], [0, -114])],
    b: [
      R([-1_829, 2_758], [-1_640, 389], [1_556, -2_255]),
      R([-1_461, -3_981], [-1_109, -3_977], [-1_163, 293], [-1_515, 289]),
    ],
    wrongBy: 25_000,
  },
  {
    name: 'case 2: difference, even-odd, simple rings (seed 110, sample 2 198)',
    op: 'difference',
    fill: 'evenodd',
    a: [
      R([2_446, 3_891], [576, 3_637], [-1_903, 2_576], [-1_982, 1_857], [-1_402, -237], [-1_304, -434], [455, -98], [2_111, 865]),
      R([798, 1_491], [464, 1_363], [124, 1_760], [292, 2_507]),
      R([-1_684, 1_375], [-4_693, 1_225], [-2_828, -183], [-4_278, -2_282], [-1_923, -252], [-1_479, -775], [-1_068, -264], [-104, -393]),
    ],
    b: [
      R([-409, 300], [-512, -370], [-904, -773], [-645, -1_414], [-141, -1_538]),
      R([249, -731], [59, -753], [141, -260], [222, -368], [372, -412]),
      R([-3_190, 907], [-2_349, -3_717], [182, -3_257], [-659, 1_367]),
    ],
    wrongBy: 350_000,
  },
];

describe('polygon-clipping’s wrong regions (the check’s F4) never pass as an oracle result', () => {
  describe.each(CASES.map((c) => [c.name, c]))('%s', (_name, c) => {
    const A = checkOperand(c.a, c.fill);
    const B = checkOperand(c.b, c.fill);

    it('the library’s own answer is a wrong region, and the region check says so', () => {
      const raw = polygonClippingAttempt(c.op, c.a, c.b, c.fill, 0).flat();
      const r = regionCheck(c.op, A, B, raw);
      expect(r.ok).toBe(false);
      expect(r.mismatchCm2).toBeGreaterThan(c.wrongBy);
    });

    it('the adapter answers with the operands’ region or refuses with a typed refusal', () => {
      let accepted: [number, number][][] | null = null;
      try {
        accepted = polygonClippingRaw(c.op, c.a, c.b, c.fill).flat();
      } catch (e) {
        expect(isOracleRefusal(e)).toBe(true);
      }
      if (accepted !== null) expect(regionCheck(c.op, A, B, accepted).ok).toBe(true);
      const result = oracleBoolean(c.op, c.a, c.b, c.fill, 'polygon-clipping');
      expect(result.ok || result.refused === true).toBe(true);
      expect(result.ok).toBe(accepted !== null);
    });

    it('Clipper2’s answer passes the same check', () => {
      const r = regionCheck(c.op, A, B, clipper2BooleanRaw(c.op, c.a, c.b, c.fill));
      expect(r.ok).toBe(true);
      expect(r.mismatchCm2).toBeLessThan(r.boundCm2);
    });

    it('the two oracles agree within perimeter × 1 cm, or polygon-clipping refuses', () => {
      const tally = newTally();
      const cl = oracleBoolean(c.op, c.a, c.b, c.fill, 'clipper2');
      const pc = oracleBoolean(c.op, c.a, c.b, c.fill, 'polygon-clipping');
      expect(cl.ok).toBe(true);
      expect(oraclesAgree(cl, pc, tally)).toBe(true);
      if (pc.ok) expect(tally.compared).toBe(1);
      else expect(tally.refusals).toEqual({ 'polygon-clipping': 1 });
    });
  });
});

describe('the measuring xor and the face count’s union never take polygon-clipping’s wrong region (the check’s F5; case 2’s rings r0, r2)', () => {
  const case2 = CASES[1];
  const r0 = case2.a[0];
  const r2 = case2.a[2];
  // `symDiffArea` reads both sides by the non-zero rule.
  const X = checkOperand([r0], 'nonzero');
  const Y = checkOperand([r2], 'nonzero');
  // The true area of r0 Δ r2: the region check's mismatch against the empty region (region-check.test.ts holds that
  // reading); the bound is the check's own, 0.01 cm × the two rings' boundary length (301 cm² here).
  const truth = regionMismatchCm2('xor', X, Y, []);
  const bound = regionCheck('xor', X, Y, []).boundCm2;

  it('polygon-clipping’s own xor of r0 and r2 (the identity turn) misses the true region by more than the bound', () => {
    const raw = polygonClippingAttempt('xor', [r0], [r2], 'nonzero', 0);
    const r = regionCheck('xor', X, Y, raw.flat());
    expect(r.ok).toBe(false);
    // measured: 41 009 cm² off the region, its area 82 019 cm² below the truth
    expect(r.mismatchCm2).toBeGreaterThan(40_000);
    expect(truth - Math.abs(multiPolygonArea(raw))).toBeGreaterThan(80_000);
  });

  it('symDiffArea through polygon-clipping equals the true area within the bound and agrees with Clipper2’s', () => {
    const pc = symDiffArea([r0], [r2], 'polygon-clipping');
    const cl = symDiffArea([r0], [r2], 'clipper2');
    expect(truth).toBeGreaterThan(16_000_000);
    expect(Math.abs(pc - truth)).toBeLessThanOrEqual(bound);
    expect(Math.abs(cl - truth)).toBeLessThanOrEqual(bound);
    expect(Math.abs(pc - cl)).toBeLessThanOrEqual(bound);
    // the measurement is symmetric in its two sides
    expect(Math.abs(symDiffArea([r2], [r0], 'polygon-clipping') - truth)).toBeLessThanOrEqual(bound);
  });

  it('faceCount canonicalises r0 with r2 reversed (non-zero region r0 Δ r2) through a checked union, never the identity turn’s wrong one', () => {
    // r0 and r2 both run counter-clockwise, so with r2 reversed their overlap winds +1 − 1 = 0 and the ring set's
    // non-zero region is r0 Δ r2 — the single-operand union faceCount canonicalises by (C-0144 (3)).
    const rings = [r0, reversed(r2)];
    const Z = checkOperand(rings, 'nonzero');
    const NONE = checkOperand([], 'nonzero');
    expect(Math.abs(regionMismatchCm2('union', Z, NONE, []) - truth)).toBeLessThan(1);
    // polygon-clipping's own union of that ring set (the identity turn) is a wrong region, without throwing
    const raw = polygonClippingAttempt('union', rings, [], 'nonzero', 0);
    const r = regionCheck('union', Z, NONE, raw.flat());
    expect(r.ok).toBe(false);
    expect(r.mismatchCm2).toBeGreaterThan(40_000); // measured: 41 009 cm²
    // the true face count, independent of polygon-clipping: Clipper2's xor of r0 and r2 (which passes the region
    // check), its outer rings — counter-clockwise, positive area — one per face
    const outers = clipper2BooleanRaw('xor', [r0], [r2], 'nonzero').filter((ring) => multiPolygonArea([[ring]]) > 0);
    expect(outers.length).toBe(4);
    // the identity turn's wrong region has fewer pieces (measured: 3), so taking it would change the count
    expect(raw.filter((poly) => poly[0] !== undefined && multiPolygonArea([[poly[0]]]) > 0).length).toBeLessThan(4);
    expect(faceCount(rings)).toBe(4);
  });
});
