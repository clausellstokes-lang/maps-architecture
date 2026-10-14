// The deep-interior rule (§4.6 *The deep-interior rule*, *Hidden plots*; N-27's factor 0.6): the thickness, the deep
// test pinned at 0.6 × the band's plot depth, the shares and reach weights read from interior.json at the band, the
// cut.interior pair drawn only for a deep block, and the spines of a back lane and a through alley on S8's output.
import { CONCERNS, createRng, STAGES, type LatticePoint } from '@plat/kernel';
import { bandCentres, defaultBandCuts, loadTable } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { DEEP_FACTOR, deepInterior, interiorRow, localThickness, pickWeighted, type InteriorRow } from '../../../src/index.js';
import { P, runFixture, twoDistricts } from './support.js';
const rect = (w: number, h: number): LatticePoint[] => [P(0, 0), P(w, 0), P(w, h), P(0, h)];

function stream(n = 0): ReturnType<ReturnType<typeof createRng>['stream']> {
  return createRng().stream([1, 2, 3, n], STAGES.S8, CONCERNS['cut.interior'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
}

const ROW: InteriorRow = { plotDepthCm: 3600, shares: [0.457, 0.296, 0.148, 0.099], reach: [0.7, 0.3, 0], deepFactor: DEEP_FACTOR };

describe('the local thickness: twice the largest inscribed circle’s radius', () => {
  it('a rectangle’s is its short side; an L-shape’s its arm; a hole counts as boundary', { timeout: 120_000 }, () => {
    expect(localThickness([rect(8000, 3000)]).thicknessCm).toBeGreaterThan(3000 - 20);
    expect(localThickness([rect(8000, 3000)]).thicknessCm).toBeLessThanOrEqual(3000);
    const L = [P(0, 0), P(10_000, 0), P(10_000, 2_000), P(2_000, 2_000), P(2_000, 10_000), P(0, 10_000)];
    const t = localThickness([L]).thicknessCm;
    // The largest circle sits in the corner square: r = 2 000 / (2 − √2) · … bounded by the arms' 2 000 and the corner's 2 828.
    expect(t).toBeGreaterThan(2000);
    expect(t).toBeLessThan(2900);
    const holed = [rect(10_000, 10_000), [P(4000, 4000), P(4000, 6000), P(6000, 6000), P(6000, 4000)]];
    expect(localThickness(holed).thicknessCm).toBeLessThan(localThickness([rect(10_000, 10_000)]).thicknessCm - 1000);
    expect(localThickness([[P(0, 0), P(10, 0), P(20, 0)]]).thicknessCm).toBe(0);
  });
});

describe('the deep test: 0.6 × the band’s plot depth (N-27, E12)', () => {
  it('pins the factor at 0.6, not the superseded 2', { timeout: 120_000 }, () => {
    expect(DEEP_FACTOR).toBe(0.6);
    // 0.6 × 36 m = 21.6 m: a 22 m thick block is deep, a 21 m one standard — under 2 × both would be standard.
    expect(deepInterior({ rings: [rect(10_000, 2_200)] }, ROW, stream()).depthClass).toBe('deep');
    expect(deepInterior({ rings: [rect(10_000, 2_100)] }, ROW, stream()).depthClass).toBe('standard');
    expect(deepInterior({ rings: [rect(10_000, 3_600)] }, ROW, stream()).depthClass).toBe('deep');
    expect(deepInterior({ rings: [rect(10_000, 3_600)] }, { ...ROW, deepFactor: 2 }, stream()).depthClass).toBe('standard');
  });

  it('a standard block is plots / open and draws nothing; a deep one draws one pair', { timeout: 120_000 }, () => {
    const s = stream(5);
    const d = deepInterior({ rings: [rect(10_000, 1_000)] }, ROW, s);
    expect(d).toMatchObject({ depthClass: 'standard', interior: 'plots', reach: 'open', uniforms: null });
    expect(s.float01()).toBe(stream(5).float01());
    const s2 = stream(6);
    const deep = deepInterior({ rings: [rect(10_000, 4_000)] }, ROW, s2);
    const twin = stream(6);
    const u1 = twin.float01();
    const u2 = twin.float01();
    expect(deep.uniforms).toEqual([u1, u2]);
    expect(s2.float01()).toBe(twin.float01());
  });

  it('chooses the treatment by the shares and the reach by the weights, cumulatively; a spine treatment is open', { timeout: 120_000 }, () => {
    expect(pickWeighted([0.5, 0.3, 0.2], 0)).toBe(0);
    expect(pickWeighted([0.5, 0.3, 0.2], 0.49)).toBe(0);
    expect(pickWeighted([0.5, 0.3, 0.2], 0.5)).toBe(1);
    expect(pickWeighted([0.5, 0, 0.5], 0.5)).toBe(2);
    expect(pickWeighted([0, 0, 0], 0.5)).toBe(-1);
    const counts = new Map<string, number>();
    for (let i = 0; i < 400; i += 1) {
      const d = deepInterior({ rings: [rect(10_000, 4_000)] }, ROW, stream(100 + i));
      counts.set(d.interior, (counts.get(d.interior) ?? 0) + 1);
      if (d.interior === 'back_lane' || d.interior === 'through_alley') expect(d.reach).toBe('open');
      if (d.interior === 'court' || d.interior === 'rear_plots') expect(['open', 'passage']).toContain(d.reach);
    }
    // 400 draws at 0.457 / 0.296 / 0.148 / 0.099: each share within 4 s.e.
    const se = (q: number): number => 4 * Math.sqrt((q * (1 - q)) / 400);
    expect(Math.abs((counts.get('court') ?? 0) / 400 - 0.457)).toBeLessThan(se(0.457));
    expect(Math.abs((counts.get('back_lane') ?? 0) / 400 - 0.296)).toBeLessThan(se(0.296));
    expect(Math.abs((counts.get('through_alley') ?? 0) / 400 - 0.148)).toBeLessThan(se(0.148));
    expect(Math.abs((counts.get('rear_plots') ?? 0) / 400 - 0.099)).toBeLessThan(se(0.099));
  });
});

describe('the band row read from interior.json (§4.6; item 27’s interpolation)', () => {
  const t = loadTable('interior');
  it('reads the rowed bands’ shares and the reach weights, the non-open ones × (densityBase + density) × the rung', { timeout: 120_000 }, () => {
    // At a rowed band's centre its row is read unblended (bands.json's default cuts; §4.5's continuous reading).
    const set = defaultBandCuts();
    const centres = bandCentres(set);
    for (const band of ['poor', 'modest', 'prosperous', 'rich']) {
      const want = ['shares.court', 'shares.backLane', 'shares.throughAlley', 'shares.rearPlots'].map((c) => t.cell(band, c).value as number);
      const r = interiorRow(centres[set.bands.indexOf(band)], 0.5, 'CITY', 3600);
      for (let i = 0; i < 4; i += 1) expect(r.shares[i]).toBeCloseTo(want[i], 12);
      const reach = ['reach.open', 'reach.passage', 'reach.gated'].map((c) => t.cell(band, c).value as number);
      expect(r.reach[0]).toBeCloseTo(reach[0], 12);
      expect(r.reach[1]).toBeCloseTo(reach[1] * (0.5 + 0.5) * 1.0, 12);
    }
    // A band without a shares row (squalid, comfortable) blends its neighbours; every row sums to one, a blend too.
    for (let v = 0; v <= 1; v += 0.01) expect(interiorRow(v, 0.5, 'CITY', 3600).shares.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 9);
    const lo = interiorRow(0.5, 0, 'CITY', 3600);
    const hi = interiorRow(0.5, 1, 'CITY', 3600);
    expect(hi.reach[0]).toBe(lo.reach[0]);
    // (0.5 + 1) / (0.5 + 0) = 3 on the non-open weights.
    expect(hi.reach[1]).toBeCloseTo(3 * lo.reach[1], 12);
    expect(hi.reach[2]).toBeCloseTo(3 * lo.reach[2], 12);
    const town = interiorRow(0.5, 0.5, 'TOWN', 3600);
    const city = interiorRow(0.5, 0.5, 'CITY', 3600);
    expect(town.reach[1]).toBeCloseTo(0.6 * city.reach[1], 12);
    expect(() => interiorRow(1.2, 0.5, 'CITY', 3600)).toThrow(RangeError);
  });
});

describe('the deep interiors on S8’s output', () => {
  const f = twoDistricts();
  const out = runFixture(f);
  it('every block carries depthClass, interior and reach as the rule gives them; a back lane or through alley is cut as an L1 spine of its class, else the block keeps a court', { timeout: 120_000 }, () => {
    expect(out.blocks.length).toBeGreaterThan(10);
    for (const b of out.blocks) {
      if (b.depthClass === 'standard') expect(['plots', 'court', 'empty']).toContain(b.interior);
      else expect(['court', 'back_lane', 'through_alley', 'rear_plots']).toContain(b.interior);
      if (b.interior === 'back_lane' || b.interior === 'through_alley') {
        expect(b.reach).toBe('open');
        const bf = out.infill.blockFaces.find((x) => x.block === b.id);
        // Its spine split it: two L1 faces.
        expect(bf?.seeds.length).toBe(2);
      }
    }
    const spineRungs = out.infill.report.districts.flatMap((d) => d.rungs.filter((r) => r.rung === 'deep' && r.outcome === 'cut'));
    const spined = out.blocks.filter((b) => b.interior === 'back_lane' || b.interior === 'through_alley');
    expect(spineRungs.length).toBe(spined.length);
    const classes = new Set(out.lanes.map((w) => w.class));
    expect(classes.has('lane')).toBe(true);
  });
});
