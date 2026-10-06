import { it } from 'vitest';
import { flatFixture } from '../../../src/index.js';
import { baseRun } from './support.js';
import { runS5ab } from '../../../src/growth/mainRoads.js';
it('find', { timeout: 900_000 }, () => {
  for (let s = 21; s <= 40; s += 1) {
    const b = baseRun(flatFixture(s));
    const g = runS5ab({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k });
    console.log("seed", s, g.ok); if (!g.ok) { console.log('REFUSED', s, g.detail); break; }
  }
});
