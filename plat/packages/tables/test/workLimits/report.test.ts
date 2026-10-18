// M0-f-03a: the F-WORK hit-rate report shape (§13.2 "Work limits follow population"; §5.1 (5)'s Confirmation; §5.4's
// work_cut) — work cuts per 1 000 batches per stage and band position, the rows in stage, ladder and band order, the
// cuts by counter; the flatness check across a band is M1's sweep (this item's defers).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import type { Rung } from '@plat/model';
import { BAND_POSITIONS, fWorkReport, type BandPosition, type FWorkBatch } from '../../src/index.js';

function batches(stage: string, rung: Rung, position: BandPosition, n: number, cuts: Record<string, number> = {}): FWorkBatch[] {
  const out: FWorkBatch[] = [];
  for (const [counter, k] of Object.entries(cuts)) for (let i = 0; i < k; i += 1) out.push({ stage, rung, position, cut: counter });
  while (out.length < n) out.push({ stage, rung, position, cut: null });
  return out;
}

describe('the F-WORK report', () => {
  it('counts work cuts per 1 000 batches per stage, rung and band position', () => {
    const r = fWorkReport([
      ...batches('S8', 'CITY', 'target', 2000, { 'cut.recursionDepth': 1, 'cut.kernelCalls': 2 }),
      ...batches('S8', 'CITY', 'bottom', 500),
      ...batches('S1', 'CITY', 'target', 4, { 'hydro.cells': 1 }),
    ]);
    expect(r.batches).toBe(2504);
    expect(r.workCuts).toBe(4);
    expect(r.rows.map((x) => [x.stage, x.rung, x.position, x.batches, x.workCuts, x.perThousand])).toEqual([
      ['S1', 'CITY', 'target', 4, 1, 250],
      ['S8', 'CITY', 'bottom', 500, 0, 0],
      ['S8', 'CITY', 'target', 2000, 3, 1.5],
    ]);
    expect(r.rows[2].byCounter).toEqual([
      { counter: 'cut.kernelCalls', cuts: 2 },
      { counter: 'cut.recursionDepth', cuts: 1 },
    ]);
    expect(r.rows[1].byCounter).toEqual([]);
  });

  it('orders rows by stage, then the ladder (TOWN before CITY before METROPOLIS), then bottom, target, top — whatever the input order', () => {
    const input = [
      ...batches('S5', 'METROPOLIS', 'top', 1),
      ...batches('S5', 'TOWN', 'top', 1),
      ...batches('S5', 'CITY', 'top', 1),
      ...batches('S5', 'CITY', 'bottom', 1),
      ...batches('S5', 'CITY', 'target', 1),
      ...batches('S4', 'METROPOLIS', 'bottom', 1),
    ];
    const order = fWorkReport(input).rows.map((x) => `${x.stage}/${x.rung}/${x.position}`);
    expect(order).toEqual(['S4/METROPOLIS/bottom', 'S5/TOWN/top', 'S5/CITY/bottom', 'S5/CITY/target', 'S5/CITY/top', 'S5/METROPOLIS/top']);
    expect(fWorkReport([...input].reverse())).toEqual(fWorkReport(input));
    expect(BAND_POSITIONS).toEqual(['bottom', 'target', 'top']);
  });

  it('an empty run is an empty report', () => {
    expect(fWorkReport([])).toEqual({ rows: [], batches: 0, workCuts: 0 });
  });

  it('refuses a rung off the ladder, a band position outside the three and an empty counter', () => {
    expect(() => fWorkReport([{ stage: 'S8', rung: 'HUGE' as Rung, position: 'top', cut: null }])).toThrow(RangeError);
    expect(() => fWorkReport([{ stage: 'S8', rung: 'CITY', position: 'middle' as BandPosition, cut: null }])).toThrow(RangeError);
    expect(() => fWorkReport([{ stage: 'S8', rung: 'CITY', position: 'top', cut: '' }])).toThrow(RangeError);
  });

  it('property: totals add up, each rate is cuts × 1 000 ÷ batches, and input order never changes the report', () => {
    const batch = fc.record({
      stage: fc.constantFrom('S1', 'S4', 'S5', 'S6', 'S8'),
      rung: fc.constantFrom<Rung>('TOWN', 'CITY', 'METROPOLIS'),
      position: fc.constantFrom<BandPosition>('bottom', 'target', 'top'),
      cut: fc.option(fc.constantFrom('cut.kernelCalls', 'growth.proposals', 'route.nodes'), { nil: null }),
    });
    fc.assert(
      fc.property(fc.array(batch, { maxLength: 60 }), (bs) => {
        const r = fWorkReport(bs);
        expect(r.batches).toBe(bs.length);
        expect(r.workCuts).toBe(bs.filter((b) => b.cut !== null).length);
        let sum = 0;
        for (const row of r.rows) {
          sum += row.batches;
          expect(row.batches).toBeGreaterThan(0);
          expect(row.perThousand).toBe((row.workCuts * 1000) / row.batches);
          expect(row.byCounter.reduce((s, c) => s + c.cuts, 0)).toBe(row.workCuts);
        }
        expect(sum).toBe(bs.length);
        expect(fWorkReport([...bs].reverse())).toEqual(r);
      }),
      { numRuns: 2000 },
    );
  });
});
