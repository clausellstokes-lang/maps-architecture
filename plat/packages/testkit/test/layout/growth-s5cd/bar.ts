// The item's here-bar on the flat fixture (§16 M0 (c); §13.5; C-0094, C-0122, C-0253 (13)): per seed, the street
// network after S5 measured by M0-k-05's METRICS — the junction row (p5 ≥ 30°, median 85–95°, organic 4-way share
// 0–15 %), no turn cliff at 10 m resampling, the growth-drift row where a grown street holds a 600 m window — and the
// pipeline's lack of a restart path (each sub-step of S5 once per stage, at most one top-up). The bar's 1 000 seeds are
// M0-c-06's integrated run (its exit bar re-judges the three clauses); here the PR-size chunks of bar-1 … bar-4.
import { expect } from 'vitest';
import { quantile7, turnCliff } from '../../../src/metrics/index.js';
import { fixtureRun, measured, metricDoc } from './support.js';

/** One seed's bar readings. */
export interface BarRow {
  readonly seed: number;
  readonly p5: number;
  readonly median: number;
  readonly share4: number;
  readonly cliff: boolean;
  readonly drift: readonly number[];
  readonly grown: number;
}

/** The bar on one seed (asserted), its readings returned. */
export function barSeed(seed: number): BarRow {
  const r = fixtureRun(seed);
  // No restart path: each sub-step once per stage, at most one top-up per stage.
  expect(r.run.growth.map((g) => g.k)).toEqual([1, 2, 3]);
  expect(r.run.prune.map((g) => g.k)).toEqual([1, 2, 3]);
  expect(r.run.capacity.map((g) => g.k)).toEqual([1, 2, 3]);
  for (const d of r.run.capacity) expect(d.rungs.filter((x) => x.rung === 'top_up').length).toBeLessThanOrEqual(1);
  const doc = metricDoc(r);
  const grown = doc.ways.filter((w) => w.grown === true).length;
  expect(grown).toBeGreaterThan(0);
  const angles = measured('junction.angles', doc, 'all/p5') as number;
  const median = measured('junction.angles', doc, 'all/median') as number;
  const share4 = measured('junction.share4', doc) as number;
  expect(angles).toBeGreaterThanOrEqual(30);
  expect(median).toBeGreaterThanOrEqual(85);
  expect(median).toBeLessThanOrEqual(95);
  expect(share4).toBeGreaterThanOrEqual(0);
  expect(share4).toBeLessThanOrEqual(0.15);
  const steps = measured('street.turnStep10m', doc) as readonly number[];
  const cliff = turnCliff(steps).cliff;
  expect(cliff).toBe(false);
  const drift = (measured('growth.drift600m', doc) as readonly number[] | null) ?? [];
  return { seed, p5: angles, median, share4, cliff, drift, grown };
}

/** The growth-drift row over the drift windows a chunk's grown streets hold (descriptive below 20 windows). */
export function driftRow(rows: readonly BarRow[]): { windows: number; p50: number; over90: number } {
  const all = rows.flatMap((r) => r.drift).sort((a, b) => a - b);
  const p50 = all.length === 0 ? Number.NaN : quantile7(all, 0.5);
  const over90 = all.length === 0 ? 0 : all.filter((v) => v > 90).length / all.length;
  if (all.length >= 20) {
    expect(p50).toBeGreaterThanOrEqual(15);
    expect(p50).toBeLessThanOrEqual(30);
    expect(over90).toBeLessThanOrEqual(0.01);
  }
  return { windows: all.length, p50, over90 };
}
