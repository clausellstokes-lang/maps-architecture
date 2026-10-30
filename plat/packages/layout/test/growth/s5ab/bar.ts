// The exit bar (M0-work.json: "the nested-stage property and the S5b test on 100 seeds; every stage's gates on its
// boundary", §4.4; §16 M0 (c)) and §13.2's S5b test on the CITY fixture, seeds 1 – 100, five files of twenty (vitest
// runs files in parallel). Every promise of ./checks.ts must hold on every seed; §13.2's two statistics are reported per
// seed — the share of gates on primaries is 1 by the gate rule (every gate a crossing of a main road), the primary
// length per km² is descriptive at M0: the design states no band for it (C-0244; C-0116's rule for a row with no band).
// The rows are printed, carried in the failure message, and — when PLAT_S5B_ROWS names a file — appended to it as one
// JSON line per seed, the durable record the item's notes keep (N-8; C-0449 (8)).
import { appendFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { flatFixture } from '../../../src/index.js';
import { s5bStatistics, violations } from './checks.js';
import { grow } from './support.js';

/** One seed's §13.2 row. */
export interface BarRow {
  readonly seed: number;
  readonly primaryKmPerKm2: number;
  readonly gateShare: number;
  readonly gates: number;
}

/** The rows as text, one per seed. */
export function barRowText(r: BarRow): string {
  return `${String(r.seed)}: ${r.primaryKmPerKm2.toFixed(3)} km/km², gates on primaries ${String(r.gateShare)} of ${String(r.gates)}`;
}

/** Appends the rows to `path` as JSON lines (nothing when `path` is undefined or empty). */
export function writeBarRows(path: string | undefined, rows: readonly BarRow[]): void {
  if (path === undefined || path === '') return;
  appendFileSync(path, rows.map((r) => `${JSON.stringify(r)}\n`).join(''));
}

export function barSeeds(first: number, last: number): void {
  describe(`the S5a / S5b bar on CITY seeds ${String(first)} – ${String(last)}`, () => {
    it('nested stages, N_k − c primaries, gates on their boundary, walls, roads and T hold on every seed', { timeout: 900_000 }, () => {
      const bad: string[] = [];
      const rows: BarRow[] = [];
      for (let seed = first; seed <= last; seed += 1) {
        let g;
        try {
          g = grow(flatFixture(seed));
        } catch (e) {
          bad.push(`seed ${String(seed)}: ${String(e)}`);
          continue;
        }
        bad.push(...violations(g));
        const st = s5bStatistics(g);
        rows.push({ seed, ...st });
        if (st.gateShare !== 1) bad.push(`seed ${String(seed)}: gates on primaries ${String(st.gateShare)}`);
        if (!(st.primaryKmPerKm2 > 0 && st.primaryKmPerKm2 < Infinity)) bad.push(`seed ${String(seed)}: primary length per km² ${String(st.primaryKmPerKm2)}`);
      }
      const text = `§13.2 S5b statistics (descriptive):\n${rows.map(barRowText).join('\n')}`;
      console.log(text);
      writeBarRows(process.env.PLAT_S5B_ROWS, rows);
      expect(bad, text).toEqual([]);
    });
  });
}
