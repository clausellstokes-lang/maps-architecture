// The ladder's geometry (§4.6 step 8, GEO-23; F-CUT): the reflex pre-cut, rung (b)'s mean normal, rung (c)'s
// perpendicular cut through the longest run's midpoint and its slide (2 · attractCm steps, alternating, the lower (y, x)
// end first, refused by a boundary vertex within attractCm), the antenna's tip, and the judgement a candidate passes
// before any kernel call (landing, crossing, contact, the class floor's width and corner, two holes).
import { LATTICE, type LatticePoint } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import {
  antennaTips,
  contactClear,
  continuationVerdict,
  judge,
  kerbEndsSquare,
  longestRun,
  meanNormalCut,
  reflexPreCut,
  reflexVertices,
  slideFeet,
  straightCandidate,
  type EndPlan,
  type KerbFace,
} from '../../../src/index.js';
import { faceSides } from '../../../src/infill/sides.js';
import { CELLS, P } from './support.js';

const FLOOR = { minWidthCm: 1200, minAngleCdeg: 1200 };

function sidesOf(rings: LatticePoint[][]) {
  return faceSides(rings, CELLS.turnTolCdeg, 0, CELLS.tangentWindowCm);
}

describe('the reflex pre-cut (§4.6 step 8: a reflex vertex deeper than the band’s plot depth)', () => {
  // An L: its reflex vertex at (4 000, 3 000), 3 000 cm from the hull's lid.
  const L = [P(0, 0), P(10_000, 0), P(10_000, 3_000), P(4_000, 3_000), P(4_000, 9_000), P(0, 9_000)];
  it('finds the reflex vertex and its depth (its distance to the hull lid spanning its notch)', { timeout: 120_000 }, () => {
    const rv = reflexVertices(L);
    expect(rv.length).toBe(1);
    expect(rv[0].at).toEqual(P(4_000, 3_000));
    // The lid joins (10 000, 3 000) and (4 000, 9 000): the vertex lies 6 000 / √2 ≈ 4 243 cm from it.
    expect(rv[0].depthCm).toBeCloseTo(6000 / Math.SQRT2, 3);
  });

  it('cuts along the longer run’s inward normal from the vertex when it is deeper than d̄, and not when it is shallower', { timeout: 120_000 }, () => {
    const face: KerbFace = { rings: [L], spines: [] };
    const s = sidesOf([L]);
    const c = reflexPreCut(face, s, 2_000, CELLS, 500);
    expect(c).not.toBeNull();
    expect(c?.rung).toBe('pre');
    // The longer run is the 6 000 cm vertical arm (4 000, 3 000)→(4 000, 9 000)? Both arms run 6 000: the incoming one
    // ((10 000, 3 000)→(4 000, 3 000)) is taken, its inward normal (0, −1): the cut drops to (4 000, 0).
    expect(c?.chain[0]).toEqual(P(4_000, 3_000));
    expect(c?.chain[c.chain.length - 1]).toEqual(P(4_000, 0));
    expect(reflexPreCut(face, s, 5_000, CELLS, 500)).toBeNull();
  });
});

describe('rung (b): the straight cut from A along the mean normal', () => {
  it('averages the start run’s inward normal and the far run’s outward normal; the inward normal alone without a far run', { timeout: 120_000 }, () => {
    const R = [P(0, 0), P(10_000, 0), P(10_000, 6_000), P(0, 6_000)];
    const face: KerbFace = { rings: [R], spines: [] };
    const s = sidesOf([R]);
    const start = { f: 0.5, c: 0.5, m: null, A: { x: 5_000, y: 0 }, run: 0, ring: 0, normal: { x: 0, y: 1 }, other: { x: 5_000, y: 6_000 }, otherRun: 2 };
    const tilted = { run: 2, foot: { x: 6_000, y: 6_000 }, dir: { x: -1, y: 0 }, outward: { x: Math.sin(0.2), y: Math.cos(0.2) } };
    const b = meanNormalCut(face, s, start, tilted, CELLS, 500);
    expect(b).not.toBeNull();
    const end = b!.kerbPoints[1];
    // The mean of (0, 1) and (sin 0.2, cos 0.2) is turned 0.1 rad: it meets y = 6 000 at x = 5 000 + 6 000 · tan 0.1.
    expect(end.y).toBeCloseTo(6_000, 6);
    expect(end.x).toBeCloseTo(5_000 + 6_000 * Math.tan(0.1), 3);
    const alone = meanNormalCut(face, s, start, null, CELLS, 500);
    expect(alone!.kerbPoints[1].x).toBeCloseTo(5_000, 6);
  });
});

describe('rung (c): perpendicular to the longest run through its midpoint, sliding by 2 · attractCm', () => {
  const R = [P(0, 0), P(10_000, 0), P(10_000, 4_000), P(0, 4_000)];
  it('takes the longest run (ties: the earlier) and its midpoint first, then alternates, the lower (y, x) end first', { timeout: 120_000 }, () => {
    const s = sidesOf([R]);
    expect(longestRun(s)).toBe(0);
    const feet = slideFeet(s, 5);
    expect(feet.map((x) => x.k)).toEqual([0, 1, 2, 3, 4]);
    const step = 2 * LATTICE.attractCm;
    // The run (0, 0) → (10 000, 0): its lower (y, x) end is (0, 0), so the first slide goes toward it.
    expect(feet.map((x) => Math.round(x.foot.x))).toEqual([5_000, 5_000 - step, 5_000 + step, 5_000 - 2 * step, 5_000 + 2 * step]);
    for (const ft of feet) {
      expect(ft.clear).toBe(true);
      expect(ft.hit?.y).toBeCloseTo(4_000, 6);
    }
  });

  it('a boundary vertex within attractCm of the perpendicular refuses it; the slide passes beside it', { timeout: 120_000 }, () => {
    // A thin tooth from the right side whose reflex tip sits 10 cm off the midpoint's perpendicular, at mid height.
    const N = [P(0, 0), P(10_000, 0), P(10_000, 1_990), P(5_010, 1_990), P(5_010, 2_010), P(10_000, 2_010), P(10_000, 4_000), P(0, 4_000)];
    const s = sidesOf([N]);
    const feet = slideFeet(s, 7);
    expect(feet[0].clear).toBe(false);
    // The first slide, 52 cm toward the run's lower end, clears it (62 cm off).
    expect(feet[1].clear).toBe(true);
    expect(Math.round(feet[1].foot.x)).toBe(5_000 - 2 * LATTICE.attractCm);
    expect(contactClear([N], { x: 5_000, y: 0 }, { x: 5_000, y: 4_000 })).toBe(false);
    expect(contactClear([N], { x: 3_000, y: 0 }, { x: 3_000, y: 4_000 })).toBe(true);
  });
});

describe('the antenna’s tip: a spike of the face’s L1 ring', () => {
  it('finds the vertex the ring reaches and leaves along one edge, with the direction it was reached along', { timeout: 120_000 }, () => {
    const ring = [P(0, 0), P(10_000, 0), P(10_000, 6_000), P(5_000, 6_000), P(5_000, 3_000), P(5_000, 6_000), P(0, 6_000)];
    const tips = antennaTips(ring);
    expect(tips.length).toBe(1);
    expect(tips[0].tip).toEqual(P(5_000, 3_000));
    expect(tips[0].dir.y).toBeCloseTo(-1, 12);
    expect(antennaTips([P(0, 0), P(10, 0), P(10, 10)])).toEqual([]);
  });
});

describe('the judgement before any kernel call', () => {
  const R = [P(0, 0), P(10_000, 0), P(10_000, 4_000), P(0, 4_000)];
  it('passes a square cut with both children above the floor, and gives their widths', { timeout: 120_000 }, () => {
    const j = judge([R], [P(5_000, 0), P(5_000, 4_000)], FLOOR);
    expect(j).toEqual({ ok: true, kind: 'split', widths: [4_000, 4_000] });
  });
  it('refuses a landing off the boundary, a crossing, a contact, a child below the width floor, a corner below the angle floor', { timeout: 120_000 }, () => {
    expect(judge([R], [P(5_000, 100), P(5_000, 4_000)], FLOOR)).toMatchObject({ ok: false, why: 'landing' });
    expect(judge([R], [P(5_000, 0), P(12_000, 2_000), P(5_000, 4_000)], FLOOR)).toMatchObject({ ok: false, why: 'crossing' });
    expect(judge([R], [P(5_000, 0), P(5_000, 3_990), P(6_000, 3_990), P(6_000, 4_000)], FLOOR)).toMatchObject({ ok: false, why: 'contact' });
    expect(judge([R], [P(1_000, 0), P(1_000, 4_000)], FLOOR)).toMatchObject({ ok: false, why: 'width' });
    expect(judge([R], [P(1_000, 0), P(1_000, 4_000)], { ...FLOOR, minWidthCm: 999 })).toMatchObject({ ok: true });
    // A cut leaving the bottom side at 5.7°: both children above a 1 m floor, but one corner is below 12°.
    expect(judge([R], [P(2_000, 0), P(10_000, 800)], { minWidthCm: 100, minAngleCdeg: 1200 })).toMatchObject({ ok: false, why: 'angle' });
    expect(judge([R], [P(2_000, 0), P(10_000, 800)], { minWidthCm: 100, minAngleCdeg: 500 })).toMatchObject({ ok: true });
  });
  it('a chain from the outer ring to a hole is a slit; one joining two holes is refused', { timeout: 120_000 }, () => {
    const h1 = [P(3_000, 1_500), P(3_000, 2_500), P(4_000, 2_500), P(4_000, 1_500)];
    const h2 = [P(6_000, 1_500), P(6_000, 2_500), P(7_000, 2_500), P(7_000, 1_500)];
    expect(judge([R, h1, h2], [P(3_500, 0), P(3_500, 1_500)], FLOOR)).toEqual({ ok: true, kind: 'slit' });
    expect(judge([R, h1, h2], [P(4_000, 2_000), P(6_000, 2_000)], FLOOR)).toMatchObject({ ok: false, why: 'holes' });
  });
  it('a kerb end (no spine beyond it) must arrive square to its line: 85–95°', { timeout: 120_000 }, () => {
    const end = (kind: EndPlan['kind']): EndPlan => ({ kind, kerbPoint: { x: 0, y: 0 }, point: { x: 0, y: 0 }, arrival: { x: 0, y: 1 }, index: -1, slidCm: 0 });
    expect(kerbEndsSquare([R], [P(5_000, 0), P(5_000, 4_000)], [end('kerb'), end('kerb')], CELLS)).toBe(true);
    // 85.7° (300 cm over 4 000) is inside the band; 84.3° (400 cm) is not.
    expect(kerbEndsSquare([R], [P(5_000, 0), P(5_300, 4_000)], [end('kerb'), end('kerb')], CELLS)).toBe(true);
    expect(kerbEndsSquare([R], [P(5_000, 0), P(5_400, 4_000)], [end('kerb'), end('kerb')], CELLS)).toBe(false);
    expect(kerbEndsSquare([R], [P(5_000, 0), P(5_800, 4_000)], [end('kerb'), end('kerb')], CELLS)).toBe(false);
    expect(kerbEndsSquare([R], [P(5_000, 0), P(5_800, 4_000)], [end('spine'), end('spine')], CELLS)).toBe(true);
  });
  it('a straight candidate extends an end to a spine within 2 × its half-width + attractCm, else keeps it on the kerb', { timeout: 120_000 }, () => {
    const face: KerbFace = { rings: [R], spines: [{ points: [{ x: -1_000, y: -300 }, { x: 11_000, y: -300 }], halfWidthCm: 300 }] };
    const c = straightCandidate(face, [R], { x: 5_000, y: 0 }, { x: 5_000, y: 4_000 }, [0, 0], CELLS, 500, 'c');
    expect(c?.ends[0].kind).toBe('spine');
    expect(c?.chain[0]).toEqual(P(5_000, -300));
    expect(c?.ends[1].kind).toBe('kerb');
    expect(c?.chain[c.chain.length - 1]).toEqual(P(5_000, 4_000));
  });
});

describe('step 10: continuation across an existing junction (J-P11, GEO-42)', () => {
  const cos6 = Math.cos((6 * Math.PI) / 180);
  const base = { bounding: false, spineClass: 'lane', cutClass: 'lane', arrival: { x: 0, y: 1 }, leaving: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: -1, y: 0 }], cosTol: cos6 };
  it('admits a crossroads on an interior spine of a lower-or-equal class, collinear within 6°', { timeout: 120_000 }, () => {
    expect(continuationVerdict(base)).toBeNull();
    expect(continuationVerdict({ ...base, spineClass: 'alley' })).toBeNull();
    expect(continuationVerdict({ ...base, leaving: [{ x: Math.sin(0.1), y: Math.cos(0.1) }] })).toBeNull();
  });
  it('refuses one across a district-boundary edge, a higher class, or off collinear', { timeout: 120_000 }, () => {
    expect(continuationVerdict({ ...base, bounding: true })).toBe('continuation-boundary');
    expect(continuationVerdict({ ...base, spineClass: 'secondary' })).toBe('continuation-class');
    expect(continuationVerdict({ ...base, spineClass: 'primary', cutClass: 'secondary' })).toBe('continuation-class');
    expect(continuationVerdict({ ...base, leaving: [{ x: Math.sin(0.12), y: Math.cos(0.12) }, { x: 1, y: 0 }] })).toBe('continuation-angle');
  });
});

describe('the ladder’s reach rule reads the planner’s floor (C-0222 (9); queue row L28, ruled J424)', () => {
  // A spine segment e = (400, 1) cm and a ray nearly parallel to it: |cross(dir, e)| ≈ 0.8 < 1, and the crossing lies
  // 375 cm out, inside the reach 2 × 200 + attractCm. The old ladder floor (the 2²⁰-scaled `div`) admitted it; the
  // planner's (ratio's own floor on the denominator) does not — the end reaches no spine there and stays a kerb end.
  const spine = { points: [P(100, 0), P(500, 1)], halfWidthCm: 200, bounding: false };
  const face: KerbFace = { rings: [], spines: [spine] };
  const len = Math.hypot(1, 0.0005);
  const dir = { x: 1 / len, y: 0.0005 / len };
  const a = { x: 0, y: 0.5 };
  const b = { x: a.x - 1000 * dir.x, y: a.y - 1000 * dir.y };

  it('the case is the one the floors split: |cross| < 1, the crossing inside the segment and the reach', () => {
    const e = { x: 400, y: 1 };
    const den = dir.x * e.y - dir.y * e.x;
    expect(Math.abs(den)).toBeLessThan(1);
    expect(Math.abs(den)).toBeGreaterThan(2 ** -20);
    const w = { x: 100 - a.x, y: 0 - a.y };
    const t = (w.x * e.y - w.y * e.x) / den;
    const u = (w.x * dir.y - w.y * dir.x) / den;
    expect(u).toBeGreaterThanOrEqual(0);
    expect(u).toBeLessThanOrEqual(1);
    expect(t).toBeGreaterThan(0);
    expect(t).toBeLessThanOrEqual(2 * spine.halfWidthCm + LATTICE.attractCm);
  });

  it('a near-parallel end is no spine hit: it stays a kerb end on its kerb point', () => {
    const c = straightCandidate(face, [], a, b, [0, 0], CELLS, 500, 'c');
    expect(c).not.toBeNull();
    expect(c?.ends[0].kind).toBe('kerb');
    expect(c?.ends[0].index).toBe(-1);
  });

  it('a ray crossing the spine with |cross| ≥ 1 still reaches it (the reach rule unchanged there)', () => {
    const down = { x: 300, y: 300 };
    const c = straightCandidate(face, [], down, { x: 300, y: 1_300 }, [0, 0], CELLS, 500, 'c');
    expect(c?.ends[0]).toMatchObject({ kind: 'spine', index: 0 });
  });
});

describe('the judgement at an antenna’s tip: a cut continuing the antenna is two straight corners, never a 0° one (census R-26; queue row L25)', () => {
  // A 200 m × 100 m face whose ring visits an antenna from the south side at x = 100 m up to its tip (100 m, 40 m).
  const ring = [P(0, 0), P(10_000, 0), P(10_000, 4_000), P(10_000, 0), P(20_000, 0), P(20_000, 10_000), P(0, 10_000)];
  it('the tip is a spike of the ring', () => {
    expect(antennaTips(ring).map((t) => t.tip)).toEqual([P(10_000, 4_000)]);
  });
  it('a cut from the tip straight on to the north side (exactly collinear with the antenna) is a split, not an angle refusal', () => {
    const j = judge([ring], [P(10_000, 4_000), P(10_000, 7_000), P(10_000, 10_000)], FLOOR);
    expect(j).toMatchObject({ ok: true, kind: 'split' });
  });
  it('a cut leaving the tip 2° off the antenna’s line is a split too; one folding back along it is refused', () => {
    expect(judge([ring], [P(10_000, 4_000), P(10_210, 10_000)], FLOOR)).toMatchObject({ ok: true, kind: 'split' });
    expect(judge([ring], [P(10_000, 4_000), P(10_500, 600), P(10_500, 0)], FLOOR).ok).toBe(false);
  });
});
