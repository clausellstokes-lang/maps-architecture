// S5c's legality (§4.4 S5c *Legality*, *Destination bias*, the crossing matrix; C-0254 (5)–(7)), on hand-built features:
// no strip thinner than the clearance between parallel spines (a parallel run inside it is deflected or rejected, never
// accepted as it was); a proposal reaching the setback band stops there and never crosses it; a proposal meeting a
// reservation or a shore at ≥ 30° ends there, at a shallower angle it does not end there; a junction within 0.35 · step
// is snapped to; destination bias within ≈ 1.5 steps; the organic crossing matrix (a lower-or-equal class collinear
// within 6° is crossed, everything else stopped in a T); an unwalled stage's boundary crossed provisionally; a deflection
// turns at most the legal angle and a first step is neither deflected nor biased (C-0258 (2), (3)).
import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { tableView } from '@plat/tables';
import { classRankOf, crossingMatrix, FeatureIndex, legal, streetOrigin, type Feature, type LegalityContext, type LegalityRules, type StepCandidate } from '../../../src/growth/legality.js';
import { growthRules } from '../../../src/growth/proposals.js';
import { lineAngleDeg, P, properCross, segDist } from './support.js';

const tables = tableView();
const walled = growthRules(tables, 'dense_core', 'CITY').legality;
const ribbon = growthRules(tables, 'ribbon', 'CITY').legality;
const noBias: LegalityRules = { ...walled, bias: false };

function ctxOf(features: Feature[], rules: LegalityRules = walled, junctions: { id: string; at: { x: number; y: number } }[] = []): LegalityContext {
  const index = new FeatureIndex();
  for (const f of features) index.add(f);
  return { index, junctions, rules };
}

function step(heading: number, extra: Partial<StepCandidate> = {}): StepCandidate {
  return { street: 1, class: 'secondary', at: P(0, 0), heading, stepCm: 3_000, turn: 0, steps: 3, ...extra };
}

const way = (a: { x: number; y: number }, b: { x: number; y: number }, cls: Feature['cls'] = 'primary', id = 'way:9'): Feature => ({ a, b, kind: 'way', way: id, cls });
const DEG = Math.PI / 180;

describe('the clearance and its rules', () => {
  it('walled CITY: max(30 m block depth, 160 m / 2) + half a 6 m secondary = 83 m; ribbon (block scale): max(30, 30 / 2) + 3 = 33 m', () => {
    expect(walled.clearanceCm('secondary')).toBe(8_300);
    expect(ribbon.clearanceCm('secondary')).toBe(3_300);
    expect(ribbon.clearanceCm('lane')).toBe(Math.max(3_000, 750) + 150);
    expect(walled.snapShare).toBe(0.35);
    expect(walled.biasSteps).toBe(1.5);
    expect(walled.legalAngle).toBeCloseTo(30 * DEG, 12);
    // Seeds every 2 × max(block depth, separation / 2): 160 m walled (district scale), 60 m in the ribbon (block scale).
    expect(growthRules(tables, 'dense_core', 'CITY').seedSpacingCm).toBe(16_000);
    expect(growthRules(tables, 'ribbon', 'CITY').seedSpacingCm).toBe(6_000);
    expect(growthRules(tables, 'walled_rings', 'CITY').blockDepthCm).toBe(4_500);
    expect(walled.minRadiusCm('secondary')).toBe(2_500);
    expect(walled.minRadiusCm('lane')).toBe(1_200);
  });
});

describe('no strip thinner than a plot depth between parallel spines', () => {
  it('a run parallel to a spine 50 m off is not accepted as it was: deflected ≥ 30° off it, away, or rejected', () => {
    const spine = way(P(-100_000, 5_000), P(100_000, 5_000));
    const v = legal(step(0), ctxOf([spine], noBias));
    if (v.verdict === 'accept') {
      expect(v.deflected).toBe(true);
      expect(lineAngleDeg({ x: v.to.x, y: v.to.y }, { x: 1, y: 0 })).toBeGreaterThanOrEqual(30);
      expect(v.to.y).toBeLessThan(0);
    }
  });

  it('the same run 90 m off (beyond the clearance) is accepted as it was', () => {
    const spine = way(P(-100_000, 9_000), P(100_000, 9_000));
    const v = legal(step(0), ctxOf([spine], noBias));
    expect(v.verdict).toBe('accept');
    if (v.verdict !== 'accept') return;
    expect(v.deflected).toBe(false);
    expect(v.to).toEqual(P(3_000, 0));
  });

  it('a setback band, a shore, a reservation and an unwalled boundary take the same clearance', () => {
    for (const kind of ['band', 'shore', 'reservation', 'boundary'] as const) {
      const f: Feature = { a: P(-100_000, 5_000), b: P(100_000, 5_000), kind };
      const v = legal(step(0), ctxOf([f], kind === 'boundary' ? { ...ribbon, bias: false, clearanceCm: () => 8_300 } : noBias));
      if (v.verdict === 'accept') expect(v.deflected).toBe(true);
    }
  });

  it('property: every accepted step is ≥ 30° off a spine or keeps the clearance from it', () => {
    fc.assert(
      fc.property(fc.integer({ min: -20_000, max: 20_000 }), fc.double({ min: -0.45, max: 0.45, noNaN: true }), fc.double({ min: -0.4, max: 0.4, noNaN: true }), (off, heading, tilt) => {
        if (Math.abs(off) < 200) return;
        const spine = way(P(-100_000, off - Math.round(100_000 * Math.tan(tilt))), P(100_000, off + Math.round(100_000 * Math.tan(tilt))));
        const v = legal(step(heading), ctxOf([spine], noBias));
        if (v.verdict !== 'accept' || v.ends === 'T') return;
        const dir = { x: v.to.x, y: v.to.y };
        const angle = lineAngleDeg(dir, { x: spine.b.x - spine.a.x, y: spine.b.y - spine.a.y });
        const d = Math.min(segDist(v.to, spine.a, spine.b), segDist(P(0, 0), spine.a, spine.b));
        expect(angle >= 30 - 1e-9 || d >= walled.clearanceCm('secondary') - 1).toBe(true);
      }),
    );
  });
});

describe('the deflection’s limit and the first step (C-0258 (2), (3))', () => {
  // A spine 50 m off, inside the 83 m clearance.
  const spine = way(P(-100_000, 5_000), P(100_000, 5_000));

  it('a step converging on a spine needs more than the legal angle to turn 31° off it: rejected, never deflected', () => {
    for (const deg of [5, 20, 29]) {
      const v = legal(step(deg * DEG), ctxOf([spine], noBias));
      expect(v.verdict, `${String(deg)}°`).toBe('reject');
      if (v.verdict === 'reject') expect(v.why).toBe('parallel');
    }
  });

  it('a step already turning away by 10° is deflected by 21° to 31° off it (a turn within the legal angle)', () => {
    const v = legal(step(-10 * DEG), ctxOf([spine], noBias));
    expect(v.verdict).toBe('accept');
    if (v.verdict !== 'accept') return;
    expect(v.deflected).toBe(true);
    expect(v.heading).toBeCloseTo(-31 * DEG, 9);
    expect(v.to.y).toBeLessThan(0);
  });

  it('property: an accepted deflection never turns the step more than the legal angle', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1_000, max: 8_000 }), fc.double({ min: -1.2, max: 1.2, noNaN: true }), (off, heading) => {
        const s = way(P(-100_000, off), P(100_000, off));
        const v = legal(step(heading), ctxOf([s], noBias));
        if (v.verdict !== 'accept' || !v.deflected) return;
        let turn = v.heading - heading;
        while (turn > Math.PI) turn -= 2 * Math.PI;
        while (turn <= -Math.PI) turn += 2 * Math.PI;
        expect(Math.abs(turn)).toBeLessThanOrEqual(walled.legalAngle + 1e-12);
      }),
    );
  });

  it('a first step leaves as proposed: neither deflected (an illegal one is rejected) nor biased', () => {
    const v = legal(step(-10 * DEG, { steps: 0 }), ctxOf([spine], noBias));
    expect(v.verdict).toBe('reject');
    if (v.verdict === 'reject') expect(v.deflected).toBe(false);
    const target = way(P(4_400, -50_000), P(4_400, 50_000), 'primary', 'way:7');
    const first = legal(step(10 * DEG, { steps: 0 }), ctxOf([target]));
    expect(first.verdict === 'accept' && !first.biased && first.ends === null).toBe(true);
    if (first.verdict === 'accept') expect(first.heading).toBe(10 * DEG);
    const later = legal(step(10 * DEG, { steps: 1 }), ctxOf([target]));
    expect(later.verdict === 'accept' && later.biased && later.ends === 'T').toBe(true);
  });
});

describe('the destination bias turns a step at most the legal angle (C-0260 (3))', () => {
  // A spine whose perpendicular foot from the step's start lies 28 m away at `deg` off the step's heading (inside the
  // 1.5-step reach of a 30 m step), the spine square to that direction.
  const spineAt = (deg: number): Feature => {
    const u = { x: Math.cos(deg * DEG), y: Math.sin(deg * DEG) };
    const foot = { x: 2_800 * u.x, y: 2_800 * u.y };
    return way(P(Math.round(foot.x + 50_000 * u.y), Math.round(foot.y - 50_000 * u.x)), P(Math.round(foot.x - 50_000 * u.y), Math.round(foot.y + 50_000 * u.x)), 'primary', 'way:7');
  };

  it('a spine 20° off the heading turns the step to its foot; one 45° or 60° off does not (no bias)', () => {
    const near = legal(step(0, { steps: 1 }), ctxOf([spineAt(20)]));
    expect(near.verdict === 'accept' && near.biased && near.ends === 'T').toBe(true);
    if (near.verdict === 'accept') expect(near.heading).toBeCloseTo(20 * DEG, 2);
    for (const deg of [45, -60]) {
      const v = legal(step(0, { steps: 1 }), ctxOf([spineAt(deg)]));
      if (v.verdict === 'accept') expect(v.biased, `${String(deg)}°`).toBe(false);
    }
  });

  it('property: a biased step never turns more than the legal angle from its heading', () => {
    fc.assert(
      fc.property(fc.double({ min: -85, max: 85, noNaN: true }), fc.double({ min: -1, max: 1, noNaN: true }), (deg, heading) => {
        const v = legal(step(heading, { steps: 1 }), ctxOf([spineAt(deg + (heading * 180) / Math.PI)]));
        if (v.verdict !== 'accept' || !v.biased) return;
        let turn = v.heading - heading;
        while (turn > Math.PI) turn -= 2 * Math.PI;
        while (turn <= -Math.PI) turn += 2 * Math.PI;
        expect(Math.abs(turn)).toBeLessThanOrEqual(walled.legalAngle + 1e-3);
      }),
    );
  });
});

describe('a street across the arterial the step leaves (C-0260 (1))', () => {
  // The arterial along y = 0; a seed's street on its left side, leaving (0, 0) square to it. The next seed half a seed
  // spacing along (80 m, inside the 83 m clearance) leaves on the right side, square too.
  const arterial = way(P(-100_000, 0), P(100_000, 0), 'primary', 'way:0');
  const leftStreet: Feature = { a: P(0, 0), b: P(0, 4_000), kind: 'way', way: 'way:1', cls: 'secondary', street: 0, step: 0 };
  const first = (x: number, heading: number): StepCandidate => ({ street: 1, class: 'secondary', at: P(x, 0), heading, stepCm: 4_000, turn: 0, steps: 0 });

  it('the right side’s first step half a spacing along, beside the left side’s street across the arterial, is accepted as proposed', () => {
    for (const x of [8_000, 7_551, 3_000]) {
      const v = legal(first(x, -90 * DEG), ctxOf([arterial, leftStreet], noBias));
      expect(v.verdict, `${String(x)}`).toBe('accept');
      if (v.verdict === 'accept') expect(v.to).toEqual(P(x, -4_000));
    }
    // Rounded off the arterial's line by the lattice (the seed is a lattice point within 1 cm of it), the same.
    const near: Feature = { ...leftStreet, a: P(0, 1), b: P(0, 4_001) };
    expect(legal(first(8_000, -90 * DEG), ctxOf([arterial, near], noBias)).verdict).toBe('accept');
  });

  it('a street on the step’s own side of the arterial still takes the clearance: rejected, parallel', () => {
    const v = legal(first(8_000, 90 * DEG), ctxOf([arterial, leftStreet], noBias));
    expect(v.verdict).toBe('reject');
    if (v.verdict === 'reject') expect(v.why).toBe('parallel');
    // A street straddling the arterial's line is not wholly across it: it takes the clearance.
    const straddle: Feature = { ...leftStreet, a: P(0, -2_000), b: P(0, 4_000) };
    const w = legal(first(8_000, -90 * DEG), ctxOf([arterial, straddle], noBias));
    expect(w.verdict === 'reject' && w.why === 'parallel').toBe(true);
  });

  it('a step leaving no way (a later step) reads no far side: the same street beside it is a parallel run', () => {
    const later: StepCandidate = { ...first(8_000, -90 * DEG), at: P(8_000, -10), steps: 2 };
    const v = legal(later, ctxOf([arterial, { ...leftStreet, a: P(0, -10), b: P(0, -4_000) }], noBias));
    expect(v.verdict === 'accept' && !v.deflected).toBe(false);
  });

  it('a street whose start the lattice rounded 1 cm onto the step’s side of the arterial is still across it (the 1 cm tolerance)', () => {
    const rounded: Feature = { ...leftStreet, a: P(0, -1), b: P(0, 4_000) };
    const v = legal(first(8_000, -90 * DEG), ctxOf([arterial, rounded], noBias));
    expect(v.verdict).toBe('accept');
    if (v.verdict === 'accept') expect(v.to).toEqual(P(8_000, -4_000));
  });

  it('a band, a shore, a reservation or a boundary wholly across the arterial still takes the clearance (only a way is across)', () => {
    for (const kind of ['band', 'shore', 'reservation', 'boundary'] as const) {
      const f: Feature = { a: P(0, 100), b: P(0, 50_000), kind };
      const rules = kind === 'boundary' ? { ...ribbon, bias: false, clearanceCm: () => 8_300 } : noBias;
      const v = legal(first(8_000, -90 * DEG), ctxOf([arterial, f], rules));
      expect(v.verdict === 'reject' && v.why === 'parallel', kind).toBe(true);
    }
  });

  it('a later step starting on its own street’s previous segment and turning reads no far side: a parallel street beyond that segment still rejects it', () => {
    // Its own previous segment up the y axis to (0, 0); the step turns 20° right; another street parallel to the step,
    // wholly on the far side of the own segment's line, 28 m off (inside the 83 m clearance).
    const own: Feature = { a: P(0, -4_000), b: P(0, 0), kind: 'way', way: 'way:3', cls: 'secondary', street: 1, step: 2 };
    const other: Feature = { a: P(-3_000, 0), b: P(-948, 5_638), kind: 'way', way: 'way:5', cls: 'secondary', street: 4, step: 1 };
    const later: StepCandidate = { street: 1, class: 'secondary', at: P(0, 0), heading: 70 * DEG, stepCm: 4_000, turn: 20 * DEG, steps: 3 };
    const v = legal(later, ctxOf([own, other], noBias));
    expect(v.verdict === 'accept' && !v.deflected).toBe(false);
    // The same step with the other street beyond the clearance is accepted as it was (the setting is otherwise legal).
    const far: Feature = { ...other, a: P(-10_000, 0), b: P(-7_948, 5_638) };
    const w = legal(later, ctxOf([own, far], noBias));
    expect(w.verdict === 'accept' && !w.deflected).toBe(true);
  });

  it('on a bent arterial, the street across half a spacing back starts off the start segment’s line on the step’s side, yet is across: the step is accepted (C-0262 (1))', () => {
    // The arterial bends at (4 000, 0): the segment holding the step's start runs along y = 0; the one before it climbs
    // 1 in 20, so the previous seed at (0, −200) lies 2 m off y = 0 on the right (the step's) side. Its street leaves
    // square to its own segment on the left and ends across the arterial there.
    const before = way(P(-20_000, -1_200), P(4_000, 0), 'primary', 'way:0');
    const after = way(P(4_000, 0), P(100_000, 0), 'primary', 'way:0');
    const across: Feature = { a: P(0, -200), b: P(-200, 3_795), kind: 'way', way: 'way:1', cls: 'secondary', street: 0, step: 0 };
    const v = legal(first(8_000, -90 * DEG), ctxOf([before, after, across], noBias));
    expect(v.verdict).toBe('accept');
    if (v.verdict === 'accept') expect(v.to).toEqual(P(8_000, -4_000));
    // A step on that street's own side still takes the clearance; and a street from another way there is not across.
    const own = legal(first(8_000, 90 * DEG), ctxOf([before, after, across], noBias));
    expect(own.verdict === 'reject' && own.why === 'parallel').toBe(true);
    const otherWay = way(P(-20_000, -1_200), P(4_000, 0), 'primary', 'way:7');
    const w = legal(first(8_000, -90 * DEG), ctxOf([otherWay, after, across], noBias));
    expect(w.verdict === 'reject' && w.why === 'parallel').toBe(true);
  });

  it('on a bent arterial, a street across whose segment ENDS on the arterial (a T back onto it) is read as leaving it there: the step is accepted (C-0262 (1), both ends of f read)', () => {
    // The bent test's street laid the other way round: its end b on the segment before the bend (2 m off y = 0 on the
    // step's side), its start a across — a far-side street closing back onto the arterial in a T. Rule (a) fails (b lies
    // on the step's side of the start segment's line), so only the reading from f's b end makes it across.
    const before = way(P(-20_000, -1_200), P(4_000, 0), 'primary', 'way:0');
    const after = way(P(4_000, 0), P(100_000, 0), 'primary', 'way:0');
    const closing: Feature = { a: P(-200, 3_795), b: P(0, -200), kind: 'way', way: 'way:1', cls: 'secondary', street: 0, step: 3 };
    const v = legal(first(8_000, -90 * DEG), ctxOf([before, after, closing], noBias));
    expect(v.verdict).toBe('accept');
    if (v.verdict === 'accept') expect(v.to).toEqual(P(8_000, -4_000));
  });

  it('the far end is read against the segment h the street leaves, not the step’s segment g: across h but on the step’s side of g is across; on the step’s side of h but across g is not (C-0262 (1))', () => {
    // The arterial climbs 1 in 2 to the bend at (4 000, 0), then runs along y = 0 (g, holding the step's start). A street
    // leaves h at (0, −2 000) and ends at (−200, −200): left of h (across it) yet 2 m below y = 0 (the step's side of g).
    const h = way(P(-20_000, -12_000), P(4_000, 0), 'primary', 'way:0');
    const g = way(P(4_000, 0), P(100_000, 0), 'primary', 'way:0');
    const leaves: Feature = { a: P(0, -2_000), b: P(-200, -200), kind: 'way', way: 'way:1', cls: 'secondary', street: 0, step: 0 };
    const v = legal(first(8_000, -90 * DEG), ctxOf([h, g, leaves], noBias));
    expect(v.verdict).toBe('accept');
    if (v.verdict === 'accept') expect(v.to).toEqual(P(8_000, -4_000));
    // The converse (a reading pin): h climbing 2 in 1 to the bend; a street leaving h at (0, −8 000) on its right (the
    // step's side) and ending at (4 200, 200), above y = 0 (across g's line). Read against h it is not across: it keeps
    // the clearance (38 m off the step, 27° off parallel).
    const steep = way(P(-20_000, -48_000), P(4_000, 0), 'primary', 'way:0');
    const notAcross: Feature = { a: P(0, -8_000), b: P(4_200, 200), kind: 'way', way: 'way:1', cls: 'secondary', street: 0, step: 0 };
    const w = legal(first(8_000, -90 * DEG), ctxOf([steep, g, notAcross], noBias));
    expect(w.verdict === 'reject' && w.why === 'parallel').toBe(true);
  });

  it('a street leaving a segment of the arterial that runs against the step’s segment (a hairpin) is not read as across: it keeps the clearance (C-0262 (1), fail safe)', () => {
    // way:0 along y = 0 to (20 000, 0), down to (20 000, −6 000) and back along y = −6 000: the step leaves the first leg
    // into the hairpin; a street leaves the return leg outward. The return leg runs against the first (dot < 0), so its
    // side is not compared and the street takes the clearance — conservative: a rejected step, never a thin strip.
    const legs = [way(P(-20_000, 0), P(20_000, 0), 'primary', 'way:0'), way(P(20_000, 0), P(20_000, -6_000), 'primary', 'way:0'), way(P(20_000, -6_000), P(-20_000, -6_000), 'primary', 'way:0')];
    const out: Feature = { a: P(0, -6_000), b: P(0, -10_000), kind: 'way', way: 'way:1', cls: 'secondary', street: 0, step: 0 };
    const v = legal(first(8_000, -90 * DEG), ctxOf([...legs, out], noBias));
    expect(v.verdict === 'reject' && v.why === 'parallel').toBe(true);
  });
});

describe('a street’s every step reads the far side of the way it left (C-0263 (1))', () => {
  // The arterial along y = 0; a street on its left (origin way:0, side +1) leaving (0, 0). The step judged is a later step
  // of a street on the right (origin way:0, side −1), 25 m off the arterial and 79 m from the left street's start — inside
  // the 83 m clearance, parallel to it (the residual N-50 named: N-23's dead ends at step 2).
  const arterial = way(P(-100_000, 0), P(100_000, 0), 'primary', 'way:0');
  const left: Feature = { a: P(0, 0), b: P(0, 4_000), kind: 'way', way: 'way:1', cls: 'secondary', street: 0, step: 0, origin: { way: 'way:0', side: 1 } };
  const later = (x: number, extra: Partial<StepCandidate> = {}): StepCandidate => ({ street: 1, class: 'secondary', at: P(x, -2_500), heading: -90 * DEG, stepCm: 4_000, turn: 0, steps: 1, origin: { way: 'way:0', side: -1 }, ...extra });

  it('a later step beside the street across the way its street left is accepted as proposed', () => {
    const v = legal(later(7_500), ctxOf([arterial, left], noBias));
    expect(v.verdict).toBe('accept');
    if (v.verdict === 'accept') {
      expect(v.deflected).toBe(false);
      expect(v.to).toEqual(P(7_500, -6_500));
    }
    // A later segment of that street, not touching the arterial: the arterial crosses the line joining their nearest points.
    const beyond: Feature = { ...left, a: P(0, 1_500), b: P(0, 5_500), step: 1 };
    const w = legal(later(6_500), ctxOf([arterial, beyond], noBias));
    expect(w.verdict === 'accept' && !w.deflected).toBe(true);
  });

  it('without a recorded origin, the same step keeps the clearance (a street whose side was not read)', () => {
    const { origin: _o, ...bare } = later(7_500);
    const v = legal(bare, ctxOf([arterial, left], noBias));
    expect(v.verdict === 'accept' && !v.deflected).toBe(false);
  });

  it('a street on the step’s own side, or one that left another way, keeps the clearance', () => {
    // Same side: the street recorded side −1 and lies on the right, beside the step.
    const same: Feature = { ...left, a: P(0, 0), b: P(0, -4_000), origin: { way: 'way:0', side: -1 } };
    const v = legal(later(7_500), ctxOf([arterial, same], noBias));
    expect(v.verdict === 'accept' && !v.deflected).toBe(false);
    // Another way: the left street recorded as leaving way:7 (another arterial), though it stands where it does.
    const other: Feature = { ...left, origin: { way: 'way:7', side: 1 } };
    const w = legal(later(7_500), ctxOf([arterial, other], noBias));
    expect(w.verdict === 'accept' && !w.deflected).toBe(false);
    // A standing way (no street, no origin) across the arterial keeps it too: only streets carry a recorded side.
    const standing: Feature = { a: P(0, 0), b: P(0, 4_000), kind: 'way', way: 'way:5', cls: 'secondary' };
    const s = legal(later(7_500), ctxOf([arterial, standing], noBias));
    expect(s.verdict === 'accept' && !s.deflected).toBe(false);
  });

  it('the recorded sides are checked against the geometry: with the arterial ending short of the pair (no way between them), the clearance holds (detect and refuse)', () => {
    // The arterial stops at x = −10 m; the left street's later segment (0, 15 m) – (0, 55 m) and the step at x = 65 m:
    // the line joining their nearest points crosses no segment of way:0, so the recorded sides are not trusted.
    const short = way(P(-100_000, 0), P(-1_000, 0), 'primary', 'way:0');
    const beyond: Feature = { ...left, a: P(0, 1_500), b: P(0, 5_500), step: 1 };
    const v = legal(later(6_500), ctxOf([short, beyond], noBias));
    expect(v.verdict === 'accept' && !v.deflected).toBe(false);
    // A street whose recorded side contradicts where it stands: recorded left (+1) but laid on the right, beside the step.
    const liar: Feature = { ...left, a: P(0, 0), b: P(0, -4_000) };
    const w = legal(later(7_500), ctxOf([arterial, liar], noBias));
    expect(w.verdict === 'accept' && !w.deflected).toBe(false);
    // Recorded left but leaving the arterial on the right, its nearest point its start on the arterial: the step and the
    // street's other end lie on one side of the arterial, so it is not between them.
    const leaning: Feature = { ...left, a: P(0, 0), b: P(-2_300, -4_000) };
    const u = legal(later(7_500), ctxOf([arterial, leaning], noBias));
    expect(u.verdict === 'accept' && !u.deflected).toBe(false);
    // Laid across but recorded on the step's own side: the recorded sides must be opposite, so the clearance holds.
    const misread: Feature = { ...left, origin: { way: 'way:0', side: -1 } };
    const t = legal(later(7_500), ctxOf([arterial, misread], noBias));
    expect(t.verdict === 'accept' && !t.deflected).toBe(false);
  });

  it('streetOrigin reads the side where the street leaves: left +1, right −1, null on the line or where no segment holds it', () => {
    const idx = ctxOf([arterial]).index;
    expect(streetOrigin(idx, 'way:0', P(0, 0), P(0, 2_500))).toEqual({ way: 'way:0', side: 1 });
    expect(streetOrigin(idx, 'way:0', P(0, 0), P(0, -2_500))).toEqual({ way: 'way:0', side: -1 });
    expect(streetOrigin(idx, 'way:0', P(0, 0), P(2_500, 0))).toBeNull();
    expect(streetOrigin(idx, 'way:0', P(0, 100), P(0, 2_500))).toBeNull();
    expect(streetOrigin(idx, 'way:7', P(0, 0), P(0, 2_500))).toBeNull();
  });
});

describe('the wall, shores and reservations', () => {
  it('a proposal reaching the setback band stops there', () => {
    const band: Feature = { a: P(2_000, -50_000), b: P(2_000, 50_000), kind: 'band' };
    const v = legal(step(0), ctxOf([band], noBias));
    expect(v.verdict).toBe('accept');
    if (v.verdict !== 'accept') return;
    expect(v.ends).toBe('band');
    expect(v.to).toEqual(P(2_000, 0));
  });

  it('property: a step never crosses a band (the wall is never crossed)', () => {
    fc.assert(
      fc.property(fc.integer({ min: 100, max: 2_900 }), fc.double({ min: -1.2, max: 1.2, noNaN: true }), fc.double({ min: -1.5, max: 1.5, noNaN: true }), (x, tilt, heading) => {
        const dx = Math.round(50_000 * Math.sin(tilt));
        const band: Feature = { a: P(x - dx, -50_000), b: P(x + dx, 50_000), kind: 'band' };
        const v = legal(step(heading), ctxOf([band], noBias));
        if (v.verdict !== 'accept') return;
        expect(properCross(P(0, 0), v.to, band.a, band.b)).toBe(false);
      }),
    );
  });

  it('a reservation or a shore met at ≥ 30° ends the proposal there', () => {
    for (const kind of ['reservation', 'shore'] as const) {
      const ring: Feature = { a: P(2_000, -50_000), b: P(2_000, 50_000), kind };
      const v = legal(step(0), ctxOf([ring], noBias));
      expect(v.verdict).toBe('accept');
      if (v.verdict !== 'accept') return;
      expect(v.ends).toBe(kind);
      expect(v.to).toEqual(P(2_000, 0));
      const w = legal(step(40 * DEG), ctxOf([ring], noBias));
      if (w.verdict === 'accept') expect(w.ends).toBe(kind);
    }
  });

  it('met at less than 30°, a reservation or a shore is no place to end: the step is deflected or rejected', () => {
    for (const kind of ['reservation', 'shore'] as const) {
      // A side running at 20° to the step, crossed 20 m ahead.
      const t = Math.tan(20 * DEG);
      const side: Feature = { a: P(2_000 - 40_000, -Math.round(40_000 * t)), b: P(2_000 + 40_000, Math.round(40_000 * t)), kind };
      const v = legal(step(0), ctxOf([side], { ...noBias, clearanceCm: () => 100 }));
      if (v.verdict === 'accept') {
        expect(v.deflected).toBe(true);
        if (v.ends === kind) expect(lineAngleDeg({ x: v.to.x, y: v.to.y }, { x: side.b.x - side.a.x, y: side.b.y - side.a.y })).toBeGreaterThanOrEqual(30);
      }
    }
  });
});

describe('snap, bias and the T', () => {
  it('a junction within 0.35 · step of the end is snapped to; one beyond it is not', () => {
    const near = legal(step(0), ctxOf([], noBias, [{ id: 'junction:5', at: P(3_000, 1_000) }]));
    expect(near.verdict).toBe('accept');
    if (near.verdict === 'accept') {
      expect(near.ends).toBe('snap');
      expect(near.meets).toBe('junction:5');
      expect(near.to).toEqual(P(3_000, 1_000));
    }
    const far = legal(step(0), ctxOf([], noBias, [{ id: 'junction:5', at: P(3_000, 1_100) }]));
    expect(far.verdict === 'accept' && far.ends === null && far.to.x === 3_000 && far.to.y === 0).toBe(true);
    const behind = legal(step(0), ctxOf([], noBias, [{ id: 'junction:5', at: P(-200, 300) }]));
    expect(behind.verdict === 'accept' && behind.ends === null).toBe(true);
  });

  it('destination bias: a spine within 1.5 steps ahead turns the step to it, ending in a T; beyond the reach, or with bias off, no turn', () => {
    const at = (x: number): Feature => way(P(x, -50_000), P(x, 50_000), 'primary', 'way:7');
    const v = legal(step(10 * DEG), ctxOf([at(4_400)]));
    expect(v.verdict).toBe('accept');
    if (v.verdict === 'accept') {
      expect(v.biased).toBe(true);
      expect(v.ends).toBe('T');
      expect(v.meets).toBe('way:7');
      expect(v.to).toEqual(P(4_400, 0));
    }
    const beyond = legal(step(0), ctxOf([at(4_600)]));
    expect(beyond.verdict === 'accept' && !beyond.biased && beyond.ends === null).toBe(true);
    const off = legal(step(0), ctxOf([at(4_400)], noBias));
    expect(off.verdict === 'accept' && !off.biased && off.ends === null && off.to.x === 3_000).toBe(true);
  });

  it('a near miss: a way within 0.35 · step of the end is joined at its foot in a T', () => {
    const v = legal(step(0), ctxOf([way(P(4_000, -50_000), P(4_000, 50_000))], noBias));
    expect(v.verdict === 'accept' && v.ends === 'T' && v.to.x === 4_000 && v.to.y === 0).toBe(true);
  });

  it('a way met at less than 30° is no junction', () => {
    const t = Math.tan(20 * DEG);
    const w = way(P(1_000 - 40_000, -Math.round(40_000 * t)), P(1_000 + 40_000, Math.round(40_000 * t)), 'secondary');
    const v = legal(step(0), ctxOf([w], { ...noBias, clearanceCm: () => 100 }));
    if (v.verdict === 'accept' && v.ends === 'T') expect(lineAngleDeg({ x: v.to.x, y: v.to.y }, { x: w.b.x - w.a.x, y: w.b.y - w.a.y })).toBeGreaterThanOrEqual(30);
  });
});

describe('the crossing matrix', () => {
  it('organic crosses only a lower-or-equal class collinear within 6°', () => {
    const m = crossingMatrix('organic', 600);
    expect(m.act('secondary', 'secondary', 5.9 * DEG)).toBe('cross');
    expect(m.act('secondary', 'secondary', -5.9 * DEG)).toBe('cross');
    expect(m.act('secondary', 'secondary', 6.1 * DEG)).toBe('T');
    expect(m.act('secondary', 'lane', 0)).toBe('cross');
    expect(m.act('secondary', 'primary', 0)).toBe('T');
    expect(m.act('secondary', 'through', 0)).toBe('T');
    expect(m.act('lane', 'secondary', 0)).toBe('T');
    expect(m.act('lane', 'lane', 0)).toBe('cross');
    expect(classRankOf('through')).toBeGreaterThan(classRankOf('primary'));
    expect(classRankOf('primary')).toBeGreaterThan(classRankOf('secondary'));
    expect(classRankOf('secondary')).toBeGreaterThan(classRankOf('lane'));
  });

  it('the regimes table states the 6°; ringed and american are M1’s', () => {
    expect(tables.table('regimes').num('crossing.organic', 'collinearCdeg')).toBe(600);
    expect(() => crossingMatrix('ringed')).toThrow(/notBuilt\('M1'\)/);
    expect(() => crossingMatrix('american')).toThrow(/notBuilt\('M1'\)/);
  });

  it('in legal: a straight secondary step crosses a secondary (an X), a turning one stops on it in a T, a primary is never crossed', () => {
    const sec = way(P(1_500, -50_000), P(1_500, 50_000), 'secondary', 'way:3');
    const straight = legal(step(0, { turn: 0 }), ctxOf([sec], { ...noBias, clearanceCm: () => 100 }));
    expect(straight.verdict === 'accept' && straight.ends === null && straight.crossings.length === 1 && straight.crossings[0].way === 'way:3').toBe(true);
    if (straight.verdict === 'accept') expect(straight.crossings[0].at).toEqual(P(1_500, 0));
    const turned = legal(step(0, { turn: 8 * DEG }), ctxOf([sec], { ...noBias, clearanceCm: () => 100 }));
    expect(turned.verdict === 'accept' && turned.ends === 'T' && turned.meets === 'way:3' && turned.to.x === 1_500).toBe(true);
    const prim = way(P(1_500, -50_000), P(1_500, 50_000), 'primary', 'way:4');
    const t = legal(step(0, { turn: 0 }), ctxOf([prim], { ...noBias, clearanceCm: () => 100 }));
    expect(t.verdict === 'accept' && t.ends === 'T' && t.crossings.length === 0).toBe(true);
  });
});

describe('an unwalled stage’s boundary', () => {
  it('is crossed by a provisional step that ends the proposal beyond it', () => {
    const b: Feature = { a: P(2_000, -50_000), b: P(2_000, 50_000), kind: 'boundary' };
    const v = legal(step(0, { class: 'secondary' }), ctxOf([b], { ...ribbon, bias: false }));
    expect(v.verdict).toBe('accept');
    if (v.verdict !== 'accept') return;
    expect(v.ends).toBe('boundary');
    expect(v.provisional).toBe(true);
    expect(v.to).toEqual(P(3_000, 0));
  });
});
