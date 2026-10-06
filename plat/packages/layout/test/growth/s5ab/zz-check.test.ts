import { describe, it } from 'vitest';
import { flatFixture } from '../../../src/index.js';
import { grow } from './support.js';
import { violations } from './checks.js';
describe('probe fold', () => {
  it('small frames', { timeout: 600_000 }, () => {
    for (const fa of [160, 200, 240]) {
      try {
        const g = grow(flatFixture(1, { frameAreaHa: fa }));
        for (const st of g.growth.stages) console.log(fa, 'k', st.k, 'folded', st.foldedInto, 'capped', st.boundary?.capped, 'added', st.boundary ? st.boundary.addedCm2 / 1e8 : null, 'roads', st.roads.length, 'gates', st.gates.length, 'n', st.count.n, 'c', st.crossings.length, JSON.stringify(st.unserved));
        console.log(fa, 'folded quota', g.growth.folded, violations(g).join(' | '));
      } catch (e) { console.log(fa, 'ERR', String(e)); }
    }
  });
});
