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
import { classRankOf, crossingMatrix, FeatureIndex, legal, type Feature, type LegalityContext, type LegalityRules, type StepCandidate } from '../../../src/growth/legality.js';
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
