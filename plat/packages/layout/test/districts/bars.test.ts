// M0-e-04's here-bars (§16 M0 (e); §4.5; §13.2 T47-1) on the district fixture at 100 seeds: containment 100 %; the
// count law within ± 1 of N_d on every seed, the mean district area tracking √(10A) ÷ 3.5; the gate wards' median area
// below the town's median district area on ≥ 90 % of seeds. (The fixture is S5c's stand-in grid over a synthetic
// CITY town, C-0242 (18); M0-e-06's site spike re-runs the bar on the integrated pipeline.)
import { describe, expect, it } from 'vitest';
import { median, ownerAt, P, townS6 } from './support.js';

const SEEDS = Array.from({ length: 100 }, (_, i) => i + 1);

describe('the district bars at 100 seeds (§16 M0 (e))', () => {
  it('containment 100 %, the count law within ± 1, the gate wards smaller than the town on ≥ 90 % of seeds', { timeout: 600_000 }, () => {
    let gateBelow = 0;
    let withGates = 0;
    const off: string[] = [];
    const ratios: number[] = [];
    for (const seed of SEEDS) {
      const t = townS6(seed);
      const o = t.out;
      // containment: every claimable face held (the stage's count) and a coarse sample of points agrees
      expect(o.report.unowned).toBe(0);
      const ids = new Set(o.districts.map((d) => d.id));
      for (let x = -90_000; x <= 90_000; x += 15_000) {
        for (let y = -90_000; y <= 90_000; y += 15_000) {
          const own = ownerAt(t, P(x, y));
          if (own === undefined || own === 'plaza:0') continue;
          expect(own !== null && (ids.has(own) || own === o.hinterland)).toBe(true);
        }
      }
      // the count law
      const L = o.districts.length;
      if (Math.abs(L - o.report.nd) > 1) off.push(`seed ${String(seed)}: ${String(L)} districts, N_d ${String(o.report.nd)}`);
      // the mean district area against √(10A) ÷ 3.5
      ratios.push(o.report.landHa / L / (Math.sqrt(10 * o.report.landHa) / 3.5));
      // gate wards against the town
      const alive = o.grow.grown.filter((d) => d.mergedInto < 0);
      const gates = alive.filter((d) => d.seed.kind === 'gate').map((d) => d.areaCm2);
      if (gates.length > 0) {
        withGates += 1;
        if (median(gates) < median(alive.map((d) => d.areaCm2))) gateBelow += 1;
      }
    }
    expect(off).toEqual([]);
    for (const r of ratios) expect(Math.abs(r - 1)).toBeLessThan(0.1);
    expect(Math.abs(ratios.reduce((s, r) => s + r, 0) / ratios.length - 1)).toBeLessThan(0.03);
    expect(withGates).toBe(SEEDS.length);
    expect(gateBelow / withGates).toBeGreaterThanOrEqual(0.9);
  });
});
