// M0-a-03: §3.3's measured construction rates — 0.24 ms at 1 000 items, 2.3 ms at 8 000 — reproduced in order of
// magnitude through the adapter and through a partition's rebuild. REPORTED, NOT GATING: on this shared machine a test's
// timing is CONTENDED (M0.md §0.1 (5), C-0025, C-0047); the timing bars are the timing-phase waves'. Nothing here
// asserts a time.
import { describe, expect, it } from 'vitest';
import { packBoxes } from '../../src/adapters/flatbush.js';
import { attachIndex, levelItems, indexChange, rebuildPartition } from '../../src/index/index.js';
import { buildArena, CELLS, generator, intIn, steinerLineSpec } from './support.js';

function median(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

describe('flatbush construction rates (§3.3; reported, CONTENDED)', () => {
  it('packs 1 000 and 8 000 boxes, and rebuilds partitions of those sizes', () => {
    const lines: string[] = [];
    for (const n of [1000, 8000]) {
      const rnd = generator(n);
      const b = new Float64Array(4 * n);
      for (let i = 0; i < n; i++) {
        const x = intIn(rnd, 0, 400_000);
        const y = intIn(rnd, 0, 400_000);
        b.set([x - 0.71, y - 0.71, x + intIn(rnd, 1, 2000), y + intIn(rnd, 1, 2000)], 4 * i);
      }
      const times: number[] = [];
      for (let k = 0; k < 15; k++) {
        const t0 = performance.now();
        packBoxes(b, n);
        times.push(performance.now() - t0);
      }
      const p = buildArena(steinerLineSpec(n)).plat;
      attachIndex(p, { gridCellCm: CELLS });
      const id = p.index?.byKey[3].get('') ?? -1;
      const items = levelItems(p, 3);
      const rebuilds: number[] = [];
      for (let k = 0; k < 15; k++) {
        indexChange(p, items[k]);
        const t0 = performance.now();
        expect(rebuildPartition(p, id)).toBe(n);
        rebuilds.push(performance.now() - t0);
      }
      lines.push(`${n} items: pack ${median(times).toFixed(3)} ms, partition rebuild ${median(rebuilds).toFixed(3)} ms (design: ${n === 1000 ? '0.24' : '2.3'} ms)`);
    }
    console.log(`construction rates (CONTENDED, reported, not gating):\n  ${lines.join('\n  ')}`);
  }, 120_000);
});
