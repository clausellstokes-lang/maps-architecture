// The here-bar on the flat fixture, seeds 19 – 24 (./bar.ts).
import { describe, it } from 'vitest';
import { barSeed, driftRow, pooledJunctions, type BarRow } from './bar.js';

describe('the S5 bar on the flat fixture, seeds 19 – 24', () => {
  const rows: BarRow[] = [];
  for (const seed of [19, 20, 21, 22, 23, 24]) it(`seed ${String(seed)}`, { timeout: 300_000 }, () => void rows.push(barSeed(seed)));
  it('the junction row pooled and the growth-drift row over the chunk', () => {
    const j = pooledJunctions(rows);
    const d = driftRow(rows);
    console.log(JSON.stringify({ chunk: '19-24', junctions: j, drift: d, seeds: rows.map((r) => ({ seed: r.seed, p5: r.p5, median: r.median, share4: r.share4, grown: r.grown })) }));
  });
});
