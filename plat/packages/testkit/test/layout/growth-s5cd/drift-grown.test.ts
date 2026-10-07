// §13.5's growth-drift row on S5c's own grown streets (C-0254 (13), C-0258): the fixture's walled core holds few 600 m
// windows (about one per six seeds), so the row is asserted over a pool that can fail — S5c grown by `growStreets` on a
// large hand-built area (./hand.ts: a 4 km square crossed by three primaries, seeded as growthArea seeds), walled
// (`dense_core`, district scale) and extramural (`ribbon`, block scale), every legality rule acting — each street read
// from its origin, measured by M0-k-05's `growth.drift600m` (one metricVersion): net turn over 600 m p50 15–30°, > 90° on
// ≤ 1 %, over at least 100 windows.
import { wayLines } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { quantile7, type MetricWay } from '../../../src/metrics/index.js';
import { handGrown } from './hand.js';
import { GROUND, measured } from './support.js';

/** The drift windows of the hand area's grown streets, each read from its origin. */
function windows(regime: 'dense_core' | 'ribbon', seeds: readonly number[]): number[] {
  const out: number[] = [];
  for (const seed of seeds) {
    const g = handGrown(regime, seed);
    const origin = new Map(g.rec.streets.map((s) => [s.way.id, s.points[0]]));
    const ways: MetricWay[] = [];
    for (const l of wayLines(g.k, g.rec.streets.map((s) => s.way.id), GROUND)) {
      const o = origin.get(l.way)!;
      l.runs.forEach((run, i) => {
        const z = run.points[run.points.length - 1];
        ways.push({ id: `${l.way}#${String(i)}`, class: 'secondary', line: z.x === o.x && z.y === o.y ? run.points.slice().reverse() : run.points, grown: true, organic: true });
      });
    }
    out.push(...((measured('growth.drift600m', { ways }) as readonly number[] | null) ?? []));
  }
  return out.sort((a, b) => a - b);
}

describe('§13.5 growth drift on S5c’s grown streets (a pool that can fail)', () => {
  for (const [regime, seeds] of [
    ['dense_core', [1, 2, 3, 4]],
    ['ribbon', [1, 2, 3, 4, 5, 6, 7, 8]],
  ] as const) {
    it(`${regime}: net turn over 600 m p50 in 15–30°, > 90° on ≤ 1 %, over ≥ 100 windows`, { timeout: 300_000 }, () => {
      const w = windows(regime, seeds);
      expect(w.length).toBeGreaterThanOrEqual(100);
      const p50 = quantile7(w, 0.5);
      const over90 = w.filter((v) => v > 90).length;
      console.log(JSON.stringify({ regime, windows: w.length, p50, p90: quantile7(w, 0.9), over90 }));
      expect(p50).toBeGreaterThanOrEqual(15);
      expect(p50).toBeLessThanOrEqual(30);
      expect(over90 / w.length).toBeLessThanOrEqual(0.01);
    });
  }
});
