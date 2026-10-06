import { describe, it } from 'vitest';
import { cityRun } from '../../backbone/support.js';
import { runS5ab } from '../../../src/growth/mainRoads.js';
describe('probe', () => {
  it('runs', { timeout: 600_000 }, () => {
    for (const s of [1, 2, 3, 4]) {
      const r = cityRun(s);
      const t0 = performance.now();
      const g = runS5ab({ slice: r.slice, commit: r.commit, s4: r.s4, kernel: r.k });
      const ms = Math.round(performance.now() - t0);
      if (!g.ok) { console.log('seed', s, 'REFUSED', g.code, g.detail); continue; }
      for (const st of g.value.stages) {
        console.log('seed', s, 'k', st.k, st.regime, 'folded', st.foldedInto, 'n', st.count.n, 'c', st.crossings.length, 'picks', st.picks.length, 'roads', st.roads.map((x) => x.level).join(''), 'unserved', JSON.stringify(st.unserved), 'gates', st.gates.length, 'lowered', st.lowered,
          'land', st.boundary ? Math.round(st.boundary.landCm2 / 1e8 * 100) / 100 : null, 'asked', st.boundary ? st.boundary.askedCm2 / 1e8 : null, 'rungs', st.trace ? JSON.stringify(st.trace.traced.report.rungs) : '');
      }
      console.log('seed', s, 'ms', ms);
    }
  });
});
