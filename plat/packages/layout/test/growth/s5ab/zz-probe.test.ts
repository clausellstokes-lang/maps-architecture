import { describe, it } from 'vitest';
import { cityRun } from '../../backbone/support.js';
describe('probe', () => {
  it('times', { timeout: 300_000 }, () => {
    for (const s of [1, 2, 3]) {
      const t0 = performance.now();
      const r = cityRun(s);
      console.log('seed', s, 'ms', Math.round(performance.now() - t0), 'gates', r.slice.gates.length, 'ways', r.s4.network.ways.map((w) => w.class).join(','), 'spines', r.s4.spines.length, 'lattice', r.slice.lattice.points.length);
    }
  });
});
