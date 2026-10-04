// M0-k-03's tests of the split comparison (§3.7, §13.1): "the split decision reads the warning list only" and "a
// planted 2 cm shift in ours fails the unattracted comparison", with the two sides' rules — equal face counts and
// perimeter × 1 cm unattracted; validity and perimeter × √2 · attractCm attracted — and the typed failures.
import fc from 'fast-check';
import { beforeAll, describe, expect, it } from 'vitest';
import type { KernelResult, Warning, WarningCode } from '@plat/kernel';
import {
  ATTRACTED_CM,
  ATTRACTION_WARNINGS,
  compareSplit,
  loadOracles,
  oracleBoolean,
  oracleBuffer,
  splitOf,
} from '../../src/oracles/index.js';
import type { OracleEngine, OracleResult, Ring } from '../../src/oracles/types.js';
import { P, R, booleanCase, rect } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

const ALL_CODES: readonly WarningCode[] = [
  'W_ATTRACTED',
  'W_STRETCH_SHARED',
  'W_WEDGE_ROUTED',
  'W_PLACED',
  'W_PROMOTED',
  'W_SNAP_PASSES',
  'W_ACUTE_CORNER',
  'W_SLIVER_RETYPED',
  'W_HEIGHT_CLAMPED',
  'W_DOWNGRADE',
  'W_CUT_SLID',
];

const warningList: fc.Arbitrary<Warning[]> = fc.array(
  fc.record({ code: fc.constantFrom(...ALL_CODES), count: fc.integer({ min: 0, max: 3 }) }),
  { maxLength: 5 },
);

function ringsOf(r: OracleResult): Ring[] {
  if (!r.ok) throw new Error(`oracle failed: ${r.error}`);
  return r.rings;
}

describe('the split decision reads the warning list only', () => {
  it('marks a case attracted exactly when one of the four codes is reported with a count above zero', () => {
    for (const code of ALL_CODES) {
      const expected = ATTRACTION_WARNINGS.includes(code) ? 'attracted' : 'unattracted';
      expect(splitOf([{ code, count: 1 }]), code).toBe(expected);
      expect(splitOf([{ code, count: 0 }]), `${code} ×0`).toBe('unattracted');
    }
    expect(splitOf([])).toBe('unattracted');
    expect(ATTRACTION_WARNINGS).toEqual(['W_ATTRACTED', 'W_STRETCH_SHARED', 'W_WEDGE_ROUTED', 'W_PLACED']);
  });

  it('gives the verdict the split of its warnings whatever the geometry, ours and the oracle', { timeout: 300_000 }, () => {
    fc.assert(
      fc.property(booleanCase, warningList, fc.boolean(), ({ op, fill, a, b }, warnings, swap) => {
        const engine: OracleEngine = swap ? 'polygon-clipping' : 'clipper2';
        const oracle = oracleBoolean(op, a, b, fill, engine);
        const right = oracleBoolean(op, a, b, fill, swap ? 'clipper2' : 'polygon-clipping');
        const wrong = [rect(90_000, 90_000, 91_000, 91_000)];
        const v1 = compareSplit(right.ok ? right.rings : [], oracle, warnings);
        const v2 = compareSplit(wrong, oracle, warnings);
        const v3 = compareSplit([], { ok: false, engine, error: 'planted' }, warnings);
        const s = splitOf(warnings);
        return v1.split === s && v2.split === s && v3.split === s;
      }),
      { numRuns: 1_000 },
    );
  });

  it('judges one geometry by the side its warnings name: faces compared only when unattracted', () => {
    // Two squares 10 cm apart (closer than attractCm): the oracle keeps two faces, an engine that merged them one.
    const a = [rect(0, 0, 1_000, 1_000)];
    const b = [rect(1_010, 0, 2_000, 1_000)];
    const oracle = oracleBoolean('union', a, b, 'nonzero', 'clipper2');
    const merged = [rect(0, 0, 2_000, 1_000)];
    const un = compareSplit(merged, oracle, []);
    expect(un.split).toBe('unattracted');
    expect(un.faces).toEqual({ ours: 1, oracle: 2 });
    expect(un.failures).toContain('faces');
    expect(un.failures).toContain('area');
    const at = compareSplit(merged, oracle, [{ code: 'W_ATTRACTED', count: 2 }]);
    expect(at.split).toBe('attracted');
    expect(at.boundCm2).toBeCloseTo(at.perimeterCm * ATTRACTED_CM, 6);
    expect(at.pass).toBe(true);
    expect(at.symDiffCm2).toBe(10_000);
  });

  it('fails an attracted case whose result is not valid, and applies the caller’s invariants there only', () => {
    const oracle = oracleBoolean('union', [rect(0, 0, 1_000, 1_000)], [], 'nonzero', 'polygon-clipping');
    const bowTie = [R([0, 0], [1_000, 1_000], [1_000, 0], [0, 1_000])];
    const at = compareSplit(bowTie, oracle, [{ code: 'W_PLACED', count: 1 }]);
    expect(at.pass).toBe(false);
    expect(at.failures.some((f) => f.startsWith('invalid'))).toBe(true);
    const square = ringsOf(oracle);
    let calls = 0;
    const invariants = (): string[] => {
      calls += 1;
      return ['a planted §3.10 row'];
    };
    expect(compareSplit(square, oracle, [], { invariants }).pass).toBe(true);
    expect(calls).toBe(0);
    const v = compareSplit(square, oracle, [{ code: 'W_WEDGE_ROUTED', count: 1 }], { invariants });
    expect(calls).toBe(1);
    expect(v.failures).toEqual(['invalid: a planted §3.10 row']);
  });

  it('makes a refused oracle’s verdict refused — unless ours shows a fault no oracle is needed to see (C-0150)', () => {
    const refused: OracleResult = { ok: false, engine: 'polygon-clipping', error: 'polygon-clipping: planted refusal', refused: true };
    const v = compareSplit([rect(0, 0, 100, 100)], refused, []);
    expect([v.refused, v.pass, v.crossChecked]).toEqual([true, false, false]);
    expect(v.failures).toEqual(['refused: polygon-clipping: planted refusal']);
    expect(v.faces).toEqual({ ours: 1, oracle: 0 });
    const broken: KernelResult<Ring[]> = { ok: false, code: 'E_INVARIANT', detail: 'planted' };
    const w = compareSplit(broken, refused, []);
    expect([w.refused, w.pass]).toEqual([false, false]);
    expect(w.failures).toEqual(['ours: E_INVARIANT planted', 'refused: polygon-clipping: planted refusal']);
    const bowTie = [R([0, 0], [1_000, 1_000], [1_000, 0], [0, 1_000])];
    const x = compareSplit(bowTie, refused, [{ code: 'W_ATTRACTED', count: 1 }]);
    expect(x.refused).toBe(false);
    expect(x.failures[0]).toMatch(/^invalid: /);
    // an unrefused failure stays a failure, and a valid attracted ours with a refused oracle is refused
    expect(compareSplit([], { ok: false, engine: 'clipper2', error: 'planted' }, []).refused).toBe(false);
    expect(compareSplit([rect(0, 0, 100, 100)], refused, [{ code: 'W_ATTRACTED', count: 1 }]).refused).toBe(true);
  });

  it('fails ours off the lattice on its own — judged, or with a refused oracle — never refused (C-0150)', () => {
    const oracle = oracleBoolean('union', [rect(0, 0, 1_000, 1_000)], [], 'nonzero', 'clipper2');
    const half = [[{ x: 0.5, y: 0 }, { x: 1_000, y: 0 }, { x: 1_000, y: 1_000 }, { x: 0, y: 1_000 }]] as unknown as Ring[];
    const v = compareSplit(half, oracle, []);
    expect([v.refused, v.pass]).toEqual([false, false]);
    expect(v.failures[0]).toBe('ours: not lattice rings');
    // beyond Clipper2's range its measurement refuses: still a failure of ours, not a refused verdict
    const huge = [[{ x: 0, y: 0 }, { x: 3e15, y: 0 }, { x: 3e15, y: 3e15 }]] as unknown as Ring[];
    const w = compareSplit(huge, oracle, []);
    expect([w.refused, w.pass]).toEqual([false, false]);
    expect(w.failures[0]).toBe('ours: not lattice rings');
    expect(w.failures[w.failures.length - 1]).toMatch(/^refused: clipper2: threw/);
    const refused: OracleResult = { ok: false, engine: 'clipper2', error: 'clipper2: planted refusal', refused: true };
    expect(compareSplit(half, refused, []).failures).toEqual(['ours: not lattice rings', 'refused: clipper2: planted refusal']);
  });

  it('names a failed oracle and a failed ours; reads E_DEGENERATE empty as no rings', () => {
    const empty = oracleBoolean('intersection', [rect(0, 0, 100, 100)], [rect(500, 0, 600, 100)], 'nonzero', 'clipper2');
    const none: KernelResult<Ring[]> = { ok: false, code: 'E_DEGENERATE', detail: 'empty' };
    expect(compareSplit(none, empty, []).pass).toBe(true);
    const broken: KernelResult<Ring[]> = { ok: false, code: 'E_INVARIANT', detail: 'planted' };
    expect(compareSplit(broken, empty, []).failures[0]).toBe('ours: E_INVARIANT planted');
    const v = compareSplit([], { ok: false, engine: 'polygon-clipping', error: 'planted' }, []);
    expect(v.pass).toBe(false);
    expect(v.failures).toEqual(['oracle: planted']);
  });
});

/** Every face of a set of disjoint axis-aligned rectangles grown by d cm on every side (shrunk for a negative d). */
function shifted(rects: [number, number, number, number][], d: number): Ring[] {
  return rects.map(([x0, y0, x1, y1]) => rect(x0 - d, y0 - d, x1 + d, y1 + d));
}

const disjointRects = fc
  .record({
    x0: fc.integer({ min: -3_000, max: 3_000 }),
    y0: fc.integer({ min: -3_000, max: 3_000 }),
    w1: fc.integer({ min: 25, max: 4_000 }),
    h1: fc.integer({ min: 25, max: 4_000 }),
    gap: fc.integer({ min: 10, max: 2_000 }),
    dy: fc.integer({ min: -3_000, max: 3_000 }),
    w2: fc.integer({ min: 25, max: 4_000 }),
    h2: fc.integer({ min: 25, max: 4_000 }),
  })
  .map(({ x0, y0, w1, h1, gap, dy, w2, h2 }): [number, number, number, number][] => [
    [x0, y0, x0 + w1, y0 + h1],
    [x0 + w1 + gap, y0 + dy, x0 + w1 + gap + w2, y0 + dy + h2],
  ]);

describe('a planted 2 cm shift in ours fails the unattracted comparison', () => {
  it('booleans: ours with every boundary point moved 2 cm out or in fails; ours unshifted passes', { timeout: 300_000 }, () => {
    fc.assert(
      fc.property(
        disjointRects,
        fc.constantFrom('union' as const, 'xor' as const),
        fc.constantFrom('nonzero' as const, 'evenodd' as const),
        fc.constantFrom<OracleEngine>('clipper2', 'polygon-clipping'),
        (rects, op, fill, engine) => {
          const a = [rect(...rects[0])];
          const b = [rect(...rects[1])];
          const oracle = oracleBoolean(op, a, b, fill, engine);
          const exact = compareSplit(shifted(rects, 0), oracle, []);
          const out = compareSplit(shifted(rects, 2), oracle, []);
          const inn = compareSplit(shifted(rects, -2), oracle, []);
          return exact.pass && !out.pass && out.failures.includes('area') && !inn.pass && inn.failures.includes('area');
        },
      ),
      { numRuns: 2_000 },
    );
  });

  it('buffers: ours buffered 2 cm wider fails; the other oracle’s buffer passes', { timeout: 300_000 }, () => {
    // Lattice-aligned chains (axis-parallel legs on a 5 m grid) with miter joins and flat or square ends: every offset
    // point is a lattice point, so the 2 cm is exact — on oblique edges the snap of each offset point moves the
    // boundary by up to 0.7 cm and can hide part of a 2 cm shift (C-0144 (8)).
    const leg = fc.record({ horizontal: fc.boolean(), steps: fc.integer({ min: -6, max: 6 }).filter((n) => n !== 0) });
    const axisChain = fc
      .record({ x: fc.integer({ min: -6, max: 6 }), y: fc.integer({ min: -6, max: 6 }), legs: fc.array(leg, { minLength: 1, maxLength: 6 }) })
      .map(({ x, y, legs }) => {
        let cx = x * 500;
        let cy = y * 500;
        const pts = [P(cx, cy)];
        for (const l of legs) {
          if (l.horizontal) cx += l.steps * 500;
          else cy += l.steps * 500;
          pts.push(P(cx, cy));
        }
        return pts;
      });
    fc.assert(
      fc.property(
        fc.array(axisChain, { minLength: 1, maxLength: 3 }),
        fc.integer({ min: 10, max: 120 }),
        fc.constantFrom('flat' as const, 'square' as const),
        fc.constantFrom<OracleEngine>('clipper2', 'polygon-clipping'),
        (chains, w, ends, engine) => {
          const oracle = oracleBuffer(chains, w, 'miter', ends, engine);
          const other = engine === 'clipper2' ? 'polygon-clipping' : 'clipper2';
          const same = compareSplit(ringsOf(oracleBuffer(chains, w, 'miter', ends, other)), oracle, []);
          const wider = compareSplit(ringsOf(oracleBuffer(chains, w + 2, 'miter', ends, other)), oracle, []);
          return same.pass && !wider.pass && wider.failures.includes('area');
        },
      ),
      { numRuns: 1_000 },
    );
  });

  it('the same shift passes when the case is attracted (2 cm is inside √2 · attractCm)', () => {
    const rects: [number, number, number, number][] = [
      [0, 0, 1_000, 500],
      [1_400, 0, 2_000, 900],
    ];
    const oracle = oracleBoolean('union', [rect(...rects[0])], [rect(...rects[1])], 'nonzero', 'clipper2');
    expect(compareSplit(shifted(rects, 2), oracle, []).pass).toBe(false);
    expect(compareSplit(shifted(rects, 2), oracle, [{ code: 'W_ATTRACTED', count: 1 }]).pass).toBe(true);
    expect(P(0, 0)).toEqual({ x: 0, y: 0 });
  });
});
