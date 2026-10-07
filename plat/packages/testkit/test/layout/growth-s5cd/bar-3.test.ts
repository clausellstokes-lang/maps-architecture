// The here-bar on the flat fixture, seeds 13 – 18 (./bar.ts).
import { describe, it } from 'vitest';
import { barSeed, driftRow, pooledJunctions, type BarRow } from './bar.js';

describe('the S5 bar on the flat fixture, seeds 13 – 18', () => {
  const rows: BarRow[] = [];
  for (const seed of [13, 14, 15, 16, 17, 18]) it(`seed ${String(seed)}`, { timeout: 300_000 }, () => void rows.push(barSeed(seed)));
  it('the junction row pooled and the growth-drift row over the chunk', () => {
    const j = pooledJunctions(rows);
    const d = driftRow(rows);
    console.log(JSON.stringify({ chunk: '13-18', junctions: j, drift: d, seeds: rows.map((r) => ({ seed: r.seed, p5: r.p5, median: r.median, share4: r.share4, grown: r.grown })) }));
  });
});
