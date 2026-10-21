// Test support for the oracles (M0-k-03): fast-check arbitraries of lattice rings and chains — star-shaped rings,
// rotated and thin rectangles, holed polygons (a clockwise hole), self-crossing rings — and of boolean and buffer
// cases. Coordinates are integer centimetres placed through the kernel's `snap` (§3.2 (7)). These are the oracles'
// own test inputs; the B-FUZZ families are M0-k-01's. Also the agreement judgement the agreement and regression
// tests share (C-0150).
import fc from 'fast-check';
import { snap, type LatticePoint } from '@plat/kernel';
import { fuzzParams } from '../../src/fuzz/index.js';
import { symDiffArea } from '../../src/oracles/oracles.js';
import { faceCount } from '../../src/oracles/faces.js';
import { isOracleRefusal } from '../../src/oracles/refusal.js';
import { ORACLE_ENGINES, type BooleanOp, type EndKind, type FillRule, type JoinKind, type OracleResult, type Ring } from '../../src/oracles/types.js';

/** A lattice point from doubles (the test inputs stay far inside the range). */
export function P(x: number, y: number): LatticePoint {
  const s = snap(x, y);
  if (!s.ok) throw new Error(`test point out of range: ${x}, ${y}`);
  return s.value;
}

/** A ring from [x, y] pairs. */
export function R(...xy: [number, number][]): Ring {
  return xy.map(([x, y]) => P(x, y));
}

/** An axis-aligned rectangle, counter-clockwise. */
export function rect(x0: number, y0: number, x1: number, y1: number): Ring {
  return R([x0, y0], [x1, y0], [x1, y1], [x0, y1]);
}

/** The ring reversed (a clockwise hole from a counter-clockwise outline). */
export function reversed(r: Ring): Ring {
  return r.slice().reverse();
}

const centre = fc.record({ x: fc.integer({ min: -2_000, max: 2_000 }), y: fc.integer({ min: -2_000, max: 2_000 }) });

/** A star-shaped ring: 3–16 vertices at increasing angles and random radii (simple almost always after snapping). */
export const starRing: fc.Arbitrary<Ring> = fc
  .record({
    c: centre,
    angles: fc.uniqueArray(fc.integer({ min: 0, max: 3_599 }), { minLength: 3, maxLength: 16 }),
    radii: fc.array(fc.integer({ min: 60, max: 4_000 }), { minLength: 16, maxLength: 16 }),
  })
  .map(({ c, angles, radii }) => {
    const sorted = angles.slice().sort((a, b) => a - b);
    return sorted.map((a, i) => {
      const t = (a * Math.PI) / 1_800;
      return P(c.x + radii[i] * Math.cos(t), c.y + radii[i] * Math.sin(t));
    });
  });

/** A rotated rectangle, thin (down to 30 cm) or wide. */
export const rotatedRect: fc.Arbitrary<Ring> = fc
  .record({
    c: centre,
    hw: fc.integer({ min: 15, max: 3_000 }),
    hh: fc.integer({ min: 15, max: 3_000 }),
    a: fc.integer({ min: 0, max: 35_999 }),
  })
  .map(({ c, hw, hh, a }) => {
    const t = (a * Math.PI) / 18_000;
    const ux = Math.cos(t);
    const uy = Math.sin(t);
    const corner = (sx: number, sy: number): LatticePoint =>
      P(c.x + sx * hw * ux - sy * hh * uy, c.y + sx * hw * uy + sy * hh * ux);
    return [corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)];
  });

/** A holed polygon: a star outline and a clockwise star hole well inside it. */
export const holed: fc.Arbitrary<Ring[]> = fc
  .record({
    c: centre,
    angles: fc.uniqueArray(fc.integer({ min: 0, max: 359 }), { minLength: 3, maxLength: 12 }),
    holeAngles: fc.uniqueArray(fc.integer({ min: 0, max: 359 }), { minLength: 3, maxLength: 8 }),
    r: fc.integer({ min: 800, max: 4_000 }),
    jitter: fc.array(fc.integer({ min: 0, max: 100 }), { minLength: 12, maxLength: 12 }),
  })
  .map(({ c, angles, holeAngles, r, jitter }) => {
    const ring = (as: number[], rad: (i: number) => number): Ring =>
      as
        .slice()
        .sort((a, b) => a - b)
        .map((a, i) => {
          const t = (a * Math.PI) / 180;
          return P(c.x + rad(i) * Math.cos(t), c.y + rad(i) * Math.sin(t));
        });
    // Outline radii in [r/2, r]; hole radii below r/2 × cos(π/3) ≥ the outline's inradius for ≥ 3 vertices.
    const outer = ring(angles, (i) => r * (0.5 + jitter[i] / 200));
    const hole = ring(holeAngles, (i) => (r / 4) * (0.4 + jitter[i] / 200));
    return [outer, reversed(hole)];
  });

/** A self-crossing ring: 3–10 random vertices in a 50 m box. */
export const crossingRing: fc.Arbitrary<Ring> = fc
  .array(fc.record({ x: fc.integer({ min: -2_500, max: 2_500 }), y: fc.integer({ min: -2_500, max: 2_500 }) }), {
    minLength: 3,
    maxLength: 10,
  })
  .map((pts) => pts.map((p) => P(p.x, p.y)));

/** An operand: one to three rings of the families above (a holed polygon counts its outline and hole). */
export const operand: fc.Arbitrary<Ring[]> = fc
  .array(fc.oneof(starRing.map((r) => [r]), rotatedRect.map((r) => [r]), holed, crossingRing.map((r) => [r])), {
    minLength: 1,
    maxLength: 3,
  })
  .map((groups) => groups.flat());

export interface BooleanCase {
  op: BooleanOp;
  fill: FillRule;
  a: Ring[];
  b: Ring[];
}

export const booleanCase: fc.Arbitrary<BooleanCase> = fc.record({
  op: fc.constantFrom<BooleanOp>('union', 'intersection', 'difference', 'xor'),
  fill: fc.constantFrom<FillRule>('nonzero', 'evenodd'),
  a: operand,
  b: operand,
});

/** A chain: 2–8 points in a 60 m box (consecutive repeats possible). */
export const chain: fc.Arbitrary<Ring> = fc
  .array(fc.record({ x: fc.integer({ min: -3_000, max: 3_000 }), y: fc.integer({ min: -3_000, max: 3_000 }) }), {
    minLength: 2,
    maxLength: 8,
  })
  .map((pts) => pts.map((p) => P(p.x, p.y)));

export interface BufferCase {
  chains: Ring[];
  w: number | number[];
  joins: JoinKind;
  ends: EndKind;
}

export const bufferCase: fc.Arbitrary<BufferCase> = fc
  .record({
    chains: fc.array(chain, { minLength: 1, maxLength: 3 }),
    uniform: fc.boolean(),
    w: fc.integer({ min: 20, max: 800 }),
    ws: fc.array(fc.integer({ min: 0, max: 800 }), { minLength: 24, maxLength: 24 }),
    joins: fc.constantFrom<JoinKind>('round', 'square', 'miter'),
    ends: fc.constantFrom<EndKind>('round', 'square', 'flat'),
  })
  .map(({ chains, uniform, w, ws, joins, ends }) => {
    const n = chains.reduce((s, c) => s + c.length, 0);
    return { chains, w: uniform ? w : ws.slice(0, n), joins, ends };
  });

/** What the agreement judgement saw over a run of cases. */
export interface AgreementTally {
  /** Cases judged. */
  cases: number;
  /** Cases where both oracles answered and at least one xor measured their difference. */
  compared: number;
  /** Compared cases whose two answers have equal face counts (informative). */
  faceAgree: number;
  /** The largest |Δ| ÷ perimeter over the compared cases, in cm. */
  worstShare: number;
  /** Refusals (C-0150) by engine — an answer (`clipper2`) or a measurement (`clipper2 xor`). */
  refusals: Record<string, number>;
}

export function newTally(): AgreementTally {
  return { cases: 0, compared: 0, faceAgree: 0, worstShare: 0, refusals: {} };
}

/** The tally's refusals, answers and measurements together. */
export function refusalCount(t: AgreementTally): number {
  return Object.values(t.refusals).reduce((s, n) => s + n, 0);
}

/**
 * Whether both oracles' answers for one case agree within perimeter × 1 cm, measured through each oracle's xor
 * (§3.7, §13.1). A refused answer or measurement (an `OracleRefusal`, C-0150) is counted in the tally and compares
 * nothing — the caller bounds the count; any other failure is a disagreement.
 */
export function oraclesAgree(c: OracleResult, p: OracleResult, tally: AgreementTally): boolean {
  tally.cases += 1;
  for (const r of [c, p]) {
    if (r.ok) continue;
    if (r.refused !== true) return false;
    tally.refusals[r.engine] = (tally.refusals[r.engine] ?? 0) + 1;
  }
  if (!c.ok || !p.ok) return true;
  const perimeter = c.perimeterCm;
  const measured: number[] = [];
  for (const engine of ORACLE_ENGINES) {
    try {
      measured.push(symDiffArea(c.rings, p.rings, engine));
    } catch (e) {
      if (!isOracleRefusal(e)) throw e;
      tally.refusals[`${engine} xor`] = (tally.refusals[`${engine} xor`] ?? 0) + 1;
    }
  }
  if (measured.length === 0) return true;
  tally.compared += 1;
  if (faceCount(c.rings) === faceCount(p.rings)) tally.faceAgree += 1;
  const share = perimeter > 0 ? Math.max(...measured) / perimeter : 0;
  if (share > tally.worstShare) tally.worstShare = share;
  return measured.every((d) => d <= perimeter);
}

// ── the agreement runs' seed, cap and report line (L18; C-0399) ──

/** The agreement test's size per family: its own 10⁴, not PLAT_FUZZ_RUNS (C-0144 (7)). */
export const AGREEMENT_CASES = 10_000;

/**
 * Refused answers and measurements allowed per case (C-0150): 0.1 % — the share a check that refused correct answers
 * wholesale would exceed at once, while none was measured in 1.2 × 10⁵ boolean and 2 × 10⁴ buffer cases.
 */
export const AGREEMENT_REFUSAL_SHARE = 0.001;

/**
 * The cap on a run's refusals at its size (L18): ⌈0.001 × cases⌉, at least 1 — 10 at the test's 10⁴, 1 at 10³. The
 * test runs at its own size (C-0144 (7)), never PLAT_FUZZ_RUNS, so a RELATED run at PLAT_FUZZ_RUNS = 1 000 runs it at
 * 10⁴ too and its cap stays 10.
 */
export function agreementRefusalCap(cases: number): number {
  return Math.max(1, Math.ceil(AGREEMENT_REFUSAL_SHARE * cases));
}

/**
 * A family's fast-check parameters: the test's size and the family's seed — PLAT_FUZZ_SEED's when set (the replay
 * of a failure, C-0057), else the fixed H32 seed of `oracles/agreement/<family>` (M0-k-01's `fuzzParams`), so a run
 * draws the same cases every time and every line it prints names the seed that replays it (L18).
 */
export function agreementParams(family: 'booleans' | 'buffers'): { numRuns: number; seed: number } {
  return { numRuns: AGREEMENT_CASES, seed: fuzzParams(`oracles/agreement/${family}`).seed };
}

/** The run's report line: the family, its seed, the cases compared, the refusals (each the seed replays) and the worst share. */
export function agreementLine(family: string, seed: number, tally: AgreementTally): string {
  return `oracles/${family}: seed ${String(seed)} — ${String(tally.compared)} of ${String(tally.cases)} cases compared and agree; refusals ${JSON.stringify(tally.refusals)} (cap ${String(agreementRefusalCap(tally.cases))}; replay with PLAT_FUZZ_SEED=${String(seed)}); face counts equal on ${String(tally.faceAgree)}; worst |Δ| ÷ perimeter ${tally.worstShare.toFixed(4)} cm`;
}
