// The here-bar on the flat fixture, seeds 1 – 6 (./bar.ts).
import { describe, it } from 'vitest';
import { barSeed, driftRow, type BarRow } from './bar.js';

describe('the S5 bar on the flat fixture, seeds 1 – 6', () => {
  const rows: BarRow[] = [];
  for (const seed of [1, 2, 3, 4, 5, 6]) it(`seed ${String(seed)}`, { timeout: 300_000 }, () => void rows.push(barSeed(seed)));
  it('the growth-drift row over the chunk', () => {
    const d = driftRow(rows);
    console.log(JSON.stringify({ rows: rows.map((r) => ({ seed: r.seed, p5: r.p5, median: r.median, share4: r.share4, grown: r.grown, windows: r.drift.length })), drift: d }));
  });
});
