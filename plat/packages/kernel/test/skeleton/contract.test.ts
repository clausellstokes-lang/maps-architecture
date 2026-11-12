// M0-a-11: §3.8's numeric contract — "a ring set that breaks either takes its reader's downgrade without running" —
// and the typed downgrades per reader (§3.8 *Readers and their downgrades*, §5.2 F-SKELETON): a corner sharper than its
// use's bound on either side — 5° for `roof` (an interior angle below 5° or above 355°), 1° for `spine` and `regions`
// (item 130 (f); RL5 / J749, the hardening round S6) — and a hole touching the outer ring or another hole, with
// the input checks before them (C-0168 (3)): no rings, a ring of fewer than three vertices or no area, a ring that is
// not simple, a hole outside the outer ring or inside another hole. An off-lattice coordinate is the caller's bug,
// E_OUT_OF_RANGE as every geometry service returns it.
import { describe, expect, it } from 'vitest';
import { runSkeleton } from '../../src/skeleton/skeleton.js';
import { skeleton, validateSkeleton, type ContractRefusal, type SkeletonUse } from '../../src/skeleton/index.js';
import type { RawNode } from '../../src/skeleton/engine.js';
import type { Cm, LatticePoint } from '../../src/types/index.js';
import { pt } from './support.js';

const SQUARE = [pt(0, 0), pt(3_000, 0), pt(3_000, 3_000), pt(0, 3_000)];

/** The refusal, checked to be a downgrade that ran nothing: events 0 and no engine trace line. */
function refusal(rings: LatticePoint[][], use: SkeletonUse = 'roof'): { refusal: ContractRefusal; at?: LatticePoint } {
  const lines: string[] = [];
  const r = runSkeleton(rings, use, {}, { trace: (l) => lines.push(l) });
  if (!r.ok) throw new Error(`error ${r.code}`);
  const v = r.value;
  if (v.kind !== 'downgrade' || v.cause.code !== 'contract') throw new Error(`not a contract refusal: ${JSON.stringify(v)}`);
  expect(v.events).toBe(0);
  expect(lines).toEqual([]);
  expect(r.warnings).toHaveLength(1);
  expect(r.warnings[0].code).toBe('W_DOWNGRADE');
  return v.cause.at === undefined ? { refusal: v.cause.refusal } : { refusal: v.cause.refusal, at: v.cause.at };
}

function validated(rings: LatticePoint[][], use: SkeletonUse = 'roof'): boolean {
  const r = skeleton(rings, use);
  return r.ok && r.value.kind === 'skeleton' && r.warnings.length === 0;
}

describe('the numeric contract refuses without running (§3.8)', () => {
  it('a corner sharper than 5°: a 4.81° apex is refused, a 5.15° apex runs', () => {
    expect(refusal([[pt(0, 0), pt(1_000, -42), pt(1_000, 42)]])).toEqual({ refusal: 'sharpCorner', at: pt(0, 0) });
    expect(validated([[pt(0, 0), pt(1_000, -45), pt(1_000, 45)]])).toBe(true);
  });

  it('an interior angle above 355° (a slit notch, 357.6°) is refused; a 354° notch runs', () => {
    const slit = [pt(0, 0), pt(2_000, 0), pt(2_000, 2_000), pt(1_021, 2_000), pt(1_000, 1_000), pt(979, 2_000), pt(0, 2_000)];
    expect(refusal([slit])).toEqual({ refusal: 'sharpCorner', at: pt(1_000, 1_000) });
    const notch = [pt(0, 0), pt(2_000, 0), pt(2_000, 2_000), pt(1_053, 2_000), pt(1_000, 1_000), pt(947, 2_000), pt(0, 2_000)];
    expect(validated([notch])).toBe(true);
  });

  it('a spike (a fold-back sharper than 5°) is a sharp corner unless the pre-clean drops it as a spur', () => {
    // back to a point 30 cm beside its root (a 3.4° tip wider than attractCm): refused at the tip
    expect(refusal([[pt(0, 0), pt(1_000, 0), pt(1_000, 1_000), pt(530, 1_000), pt(500, 1_500), pt(500, 1_000), pt(0, 1_000)]])).toEqual({ refusal: 'sharpCorner', at: pt(500, 1_500) });
    // back to a point 1 cm beside its root: an inexact spur within attractCm, which the pre-clean drops (RQ7 (A)), so the
    // square runs; back to its root exactly: an exact zero-width spur, dropped likewise (C-0276)
    expect(validated([[pt(0, 0), pt(1_000, 0), pt(1_000, 1_000), pt(501, 1_000), pt(500, 1_500), pt(500, 1_000), pt(0, 1_000)]])).toBe(true);
    expect(validated([[pt(0, 0), pt(1_000, 0), pt(1_000, 1_000), pt(500, 1_000), pt(500, 1_500), pt(500, 1_000), pt(0, 1_000)]])).toBe(true);
  });

  it('a hole touching the outer ring at a vertex, along an edge, or another hole is refused', () => {
    expect(refusal([SQUARE, [pt(0, 1_500), pt(800, 1_200), pt(800, 1_800)]], 'spine').refusal).toBe('holeContact');
    expect(refusal([SQUARE, [pt(1_000, 0), pt(2_000, 0), pt(2_000, 500), pt(1_000, 500)]], 'spine').refusal).toBe('holeContact');
    const h1 = [pt(500, 500), pt(1_500, 500), pt(1_500, 1_500), pt(500, 1_500)];
    const h2 = [pt(1_500, 1_500), pt(2_500, 1_500), pt(2_500, 2_500), pt(1_500, 2_500)];
    expect(refusal([SQUARE, h1, h2], 'spine').refusal).toBe('holeContact');
    // apart by a centimetre, the same holes run
    const h3 = [pt(1_501, 1_501), pt(2_500, 1_501), pt(2_500, 2_500), pt(1_501, 2_500)];
    const r = skeleton([SQUARE, h1, h3], 'spine');
    expect(r.ok && r.value.kind).toBe('skeleton');
  });

  it('the input checks: no rings, too few vertices, no area, not simple, a hole outside or inside another hole', () => {
    expect(refusal([]).refusal).toBe('empty');
    expect(refusal([[pt(0, 0), pt(10, 0)]]).refusal).toBe('degenerate');
    expect(refusal([[pt(0, 0), pt(10, 0), pt(20, 0)]]).refusal).toBe('degenerate'); // collinear: merged to two
    // a pentagram: every corner 36°, the ring crossing itself
    const star = [0, 2, 4, 1, 3].map((k) => pt(Math.round(1_000 * Math.cos((2 * Math.PI * k) / 5)), Math.round(1_000 * Math.sin((2 * Math.PI * k) / 5))));
    expect(refusal([star]).refusal).toBe('notSimple');
    expect(refusal([SQUARE, [pt(4_000, 0), pt(5_000, 0), pt(5_000, 1_000)]], 'spine').refusal).toBe('holeOutside');
    const big = [pt(500, 500), pt(2_500, 500), pt(2_500, 2_500), pt(500, 2_500)];
    const inner = [pt(1_000, 1_000), pt(2_000, 1_000), pt(2_000, 2_000)];
    expect(refusal([SQUARE, big, inner], 'spine').refusal).toBe('holeOutside');
  });

  it('either orientation is read: a clockwise outer ring and a counter-clockwise hole run', () => {
    const r = skeleton([[...SQUARE].reverse(), [pt(1_000, 1_000), pt(2_000, 1_000), pt(2_000, 2_000), pt(1_000, 2_000)]], 'spine');
    expect(r.ok && r.value.kind).toBe('skeleton');
  });

  it('an off-lattice coordinate is E_OUT_OF_RANGE (the caller’s bug), never a downgrade', () => {
    for (const bad of [Number.NaN, 0.5, 8_388_608, Number.POSITIVE_INFINITY]) {
      const r = skeleton([[pt(0, 0), { x: bad as Cm, y: 0 as Cm }, pt(0, 1_000)]], 'roof');
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.code).toBe('E_OUT_OF_RANGE');
    }
  });
});

describe('the use’s bound: 5° for roof, 1° for spine and regions (§3.8 as amended by item 130 (f); Q67 (B), RL5 / J749, hardening round S6)', () => {
  const USES: SkeletonUse[] = ['roof', 'spine', 'regions'];
  /** A 2.98° apex (tan of its half 26/1 000): inside [1°, 5°). */
  const TRI3 = [pt(0, 0), pt(1_000, -26), pt(1_000, 26)];
  /** A slit notch of 357.6° (a 2.4° reflex corner on the far side): inside [1°, 5°) on either side. */
  const SLIT = [pt(0, 0), pt(2_000, 0), pt(2_000, 2_000), pt(1_021, 2_000), pt(1_000, 1_000), pt(979, 2_000), pt(0, 2_000)];
  /** A 3.4° spike whose tip ends 30 cm beside its root, beyond attractCm: the pre-clean keeps it for every use. */
  const SPIKE = [pt(0, 0), pt(1_000, 0), pt(1_000, 1_000), pt(530, 1_000), pt(500, 1_500), pt(500, 1_000), pt(0, 1_000)];

  it('a 3° corner validates for spine and for regions and still takes the roof’s downgrade without running', () => {
    for (const [ring, at] of [[TRI3, pt(0, 0)], [SLIT, pt(1_000, 1_000)], [SPIKE, pt(500, 1_500)]] as const) {
      expect(refusal([[...ring]], 'roof')).toEqual({ refusal: 'sharpCorner', at });
      for (const use of ['spine', 'regions'] as const) {
        const r = skeleton([[...ring]], use);
        if (!r.ok || r.value.kind !== 'skeleton') throw new Error(`${use}: expected a validated skeleton, got ${JSON.stringify(r).slice(0, 300)}`);
        expect(r.warnings).toEqual([]);
        expect(r.value.use).toBe(use);
        expect(r.value.events).toBeGreaterThan(0);
        expect(validateSkeleton(r.value).ok).toBe(true);
      }
      // the two readers read the same cleaned rings and get the same graph
      const s = skeleton([[...ring]], 'spine');
      const g = skeleton([[...ring]], 'regions');
      if (!s.ok || s.value.kind !== 'skeleton' || !g.ok || g.value.kind !== 'skeleton') throw new Error('expected skeletons');
      expect({ ...g.value, use: 'spine' }).toEqual(s.value);
    }
  });

  it('the 1° bound on either side of it: a 0.86° apex is refused for every use, a 1.09° apex runs for spine and regions', () => {
    // tan of the half-angle 15/2 000 (0.86°) and 19/2 000 (1.09°); each far end lies beyond attractCm of the other arm
    for (const use of USES) expect(refusal([[pt(0, 0), pt(2_000, -15), pt(2_000, 15)]], use)).toEqual({ refusal: 'sharpCorner', at: pt(0, 0) });
    const just = [pt(0, 0), pt(2_000, -19), pt(2_000, 19)];
    expect(refusal([just], 'roof')).toEqual({ refusal: 'sharpCorner', at: pt(0, 0) });
    expect(validated([just], 'spine')).toBe(true);
    expect(validated([just], 'regions')).toBe(true);
  });

  it('the validator stays the net: a 3° face the 1° bound admits, its output failing the validator, takes the reader’s downgrade', () => {
    for (const use of ['spine', 'regions'] as const) {
      let finished = 0;
      // an interior node with no arc (engine coordinates: the bounding-box corner (0, −26) is the origin)
      const corrupt = (nodes: RawNode[]): void => {
        finished += 1;
        nodes.push({ x: 300, y: 26, t: 5 });
      };
      const r = runSkeleton([TRI3], use, { medialAxis: () => 'axis' }, { finished: corrupt });
      expect(finished).toBe(3); // the face ran in all three readings (hardening round S7): admitted by the bound, rejected by the validator
      if (!r.ok || r.value.kind !== 'downgrade') throw new Error(`${use}: expected a downgrade, got ${JSON.stringify(r).slice(0, 300)}`);
      expect(r.value.cause).toMatchObject({ code: 'validator', check: 'topology' });
      expect(r.value.to).toBe(use === 'spine' ? 'medialAxis' : 'reflexPreCut');
      expect(r.value.events).toBeGreaterThan(0);
      expect(r.value.axis).toBe(use === 'spine' ? 'axis' : undefined);
      expect(r.warnings).toEqual([{ code: 'W_DOWNGRADE', count: 1 }]);
    }
  });
});

describe('the use’s bound at its edges, on every ring and on both sides of a corner (Q180 (b), N-s6c-3, N-s6c-4; hardening round S7)', () => {
  // Every angle below is computed from its definition: the corner at v between the arms u = p − v and w = q − v has the
  // exact integer cross u × w and dot u · w of the lattice vectors, and its fold angle is atan2(|cross|, dot) — the
  // interior angle on the convex side, 360° minus it on the reflex side. tan 1° = 0.0174550649282175857651…; the bounds a
  // mutant might hold: tan 0.95° 0.016582, tan 0.995° 0.017368, tan 1.005° 0.017542, tan 1.05° 0.018328.
  const USES: SkeletonUse[] = ['roof', 'spine', 'regions'];

  /** Spine and regions validate with no warning and their graphs are equal apart from `use`. */
  function runsForSpineAndRegions(rings: LatticePoint[][]): void {
    const s = skeleton(rings, 'spine');
    const g = skeleton(rings, 'regions');
    if (!s.ok || s.value.kind !== 'skeleton') throw new Error(`spine: expected a validated skeleton, got ${JSON.stringify(s).slice(0, 300)}`);
    if (!g.ok || g.value.kind !== 'skeleton') throw new Error(`regions: expected a validated skeleton, got ${JSON.stringify(g).slice(0, 300)}`);
    expect(s.warnings).toEqual([]);
    expect(g.warnings).toEqual([]);
    expect(s.value.events).toBeGreaterThan(0);
    expect(validateSkeleton(s.value).ok).toBe(true);
    expect({ ...g.value, use: 'spine' }).toEqual(s.value);
  }

  it('the 1° edge within 0.01°: a 0.9982° apex is refused for every use; a 1.0016° apex runs for spine and regions and is refused for roof', () => {
    // apex (0, 0), arms u = (1 722, −15) and w = (1 722, 15): cross 51 660, dot 2 965 059, atan2 → 0.998159° (in
    // [0.995°, 1°)); the far ends lie 30 cm apart, beyond attractCm, so the clean keeps the apex
    const below = [pt(0, 0), pt(1_722, -15), pt(1_722, 15)];
    for (const use of USES) expect(refusal([below], use)).toEqual({ refusal: 'sharpCorner', at: pt(0, 0) });
    // arms (1 716, ∓15): cross 51 480, dot 2 944 431, atan2 → 1.001649° (in [1°, 1.005°))
    const above = [pt(0, 0), pt(1_716, -15), pt(1_716, 15)];
    expect(refusal([above], 'roof')).toEqual({ refusal: 'sharpCorner', at: pt(0, 0) });
    runsForSpineAndRegions([above]);
  });

  it('a corner exactly at the bound as the contract computes it (|cross| = tan 1° · dot in doubles) is not sharper than it: it runs for spine and regions', () => {
    // apex v = (−8 388 000, −8 388 000), arms u = (8 213 921, 10 684 686) and w = (9 525 818, 11 953 519): cross
    // 3 595 113 485 149, dot 205 963 913 622 412 (both exact in doubles); cross / dot exceeds tan 1° by 2.3 · 10⁻¹⁹
    // (the angle is 1° to 13 digits) and the double product 0.017455064928217585 · dot rounds to the cross exactly, so
    // the strict test |cross| < tan · dot (a corner sharper than the bound) is false here and an inclusive one true
    const v = pt(-8_388_000, -8_388_000);
    const exact = [v, pt(1_137_818, 3_565_519), pt(-174_079, 2_296_686)];
    expect(0.017455064928217585 * 205_963_913_622_412).toBe(3_595_113_485_149);
    expect(refusal([exact], 'roof')).toEqual({ refusal: 'sharpCorner', at: v });
    runsForSpineAndRegions([exact]);
  });

  /** A 60 × 60 m square: the outer ring of the holed pins. */
  const OUTER = [pt(0, 0), pt(6_000, 0), pt(6_000, 6_000), pt(0, 6_000)];

  it('a hole’s corner is held to the use’s bound: a 2.98° hole corner runs for spine and regions and is refused for roof', () => {
    // the hole's apex (2 000, 3 000), arms (2 000, ∓52): cross 208 000, dot 3 997 296, atan2 → 2.9787° (the face's
    // interior angle there 357.02°); its far ends lie 104 cm apart
    const rings = [OUTER, [pt(2_000, 3_000), pt(4_000, 2_948), pt(4_000, 3_052)]];
    expect(refusal(rings, 'roof')).toEqual({ refusal: 'sharpCorner', at: pt(2_000, 3_000) });
    runsForSpineAndRegions(rings);
  });

  it('a hole’s corner sharper than 1° is refused for every use', () => {
    // the hole's apex (2 000, 3 000), arms (2 000, ∓15): cross 60 000, dot 3 999 775, atan2 → 0.8594°; far ends 30 cm apart
    const rings = [OUTER, [pt(2_000, 3_000), pt(4_000, 2_985), pt(4_000, 3_015)]];
    for (const use of USES) expect(refusal(rings, use)).toEqual({ refusal: 'sharpCorner', at: pt(2_000, 3_000) });
  });

  it('a slit notch above 359° (its far side under 1°) is refused for spine and regions as for roof', () => {
    // the notch's floor (2 000, 1 000), arms (15, 2 000) and (−15, 2 000): cross 60 000, dot 3 999 775, atan2 → 0.8594°
    // on the far side, an interior angle of 359.1406°; the slit is 30 cm wide at its mouth, beyond attractCm
    const slit = [pt(0, 0), pt(4_000, 0), pt(4_000, 3_000), pt(2_015, 3_000), pt(2_000, 1_000), pt(1_985, 3_000), pt(0, 3_000)];
    for (const use of USES) expect(refusal([slit], use)).toEqual({ refusal: 'sharpCorner', at: pt(2_000, 1_000) });
  });
});

describe('the typed downgrade per reader (§3.8, §5.2 F-SKELETON), reported W_DOWNGRADE', () => {
  // a 0.86° apex: sharper than every use's bound (5° roof, 1° spine and regions); its far end lies 30 cm from the other
  // arm, beyond attractCm, so the pre-clean keeps it (hardening round S6: the 4.81° apex this test read before runs for
  // spine and regions now)
  const sharp = [[pt(0, 0), pt(2_000, -15), pt(2_000, 15)]];

  it('roof → a plain roof; spine → the sampled medial axis; regions → the caller’s reflex pre-cut', () => {
    const paths: [SkeletonUse, string][] = [
      ['roof', 'plainRoof'],
      ['spine', 'medialAxis'],
      ['regions', 'reflexPreCut'],
    ];
    for (const [use, to] of paths) {
      const r = skeleton(sharp, use);
      expect(r.ok).toBe(true);
      if (!r.ok || r.value.kind !== 'downgrade') throw new Error('expected a downgrade');
      expect(r.value.use).toBe(use);
      expect(r.value.to).toBe(to);
      expect(r.value.axis).toBeUndefined();
      expect(r.warnings).toEqual([{ code: 'W_DOWNGRADE', count: 1, at: pt(0, 0) }]);
    }
  });

  it('the spine reader’s injected sampler fills the axis from the caller’s rings; no other reader calls it', () => {
    const seen: unknown[] = [];
    const medialAxis = (rings: readonly (readonly LatticePoint[])[]): string => {
      seen.push(rings);
      return 'axis';
    };
    const r = skeleton(sharp, 'spine', { medialAxis });
    if (!r.ok || r.value.kind !== 'downgrade') throw new Error('expected a downgrade');
    expect(r.value.axis).toBe('axis');
    expect(seen).toEqual([sharp]);
    skeleton(sharp, 'roof', { medialAxis });
    skeleton(sharp, 'regions', { medialAxis });
    skeleton([SQUARE], 'spine', { medialAxis }); // validated: no downgrade, no axis
    expect(seen).toHaveLength(1);
  });

  it('a validated skeleton carries no warning', () => {
    const r = skeleton([SQUARE], 'roof');
    expect(r.ok && r.warnings).toEqual([]);
  });
});
