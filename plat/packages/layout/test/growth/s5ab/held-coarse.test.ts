// The held enclosure's seeds in the coarse configuration (M0-c-04 hardening round S5; C-0454 (2); Q122's S5 class,
// M0-e-06 S3's relief-60 coarse S5 E_SELF_INTERSECT seeds 88, 178, 188, 196, 197): stage 1's pull carried its wall
// beyond stage 1's own boundary and stage 2's boundary, over stage 1's selection alone, let that wall stand outside it,
// so the stage-2 trace was handed a boundary through its core. With a walled stage's enclosure held with the standing
// wall and its clearance, each commits S5. The `coarse` configuration is R12-5's switch (the RiverStrategy with
// `hydroCoarsen`). Cost: five CITY derivations through S5, about 1 – 3.5 min each on the cloud machine (≈ 6 – 18 min).
import { describe, expect, it } from 'vitest';
import { deriveThroughS5, RELIEF_60, roundBreaks } from './sitefix.js';

describe('the held enclosure\'s seeds commit S5 (relief-60, coarse, CITY; C-0454 (2))', () => {
  for (const seed of [88, 178, 188, 196, 197]) {
    it(`relief-60 coarse seed ${String(seed)}: S5 commits (was E_SELF_INTERSECT, F-WALL), every walled stage's boundary holding the wall before it`, { timeout: 900_000 }, () => {
      const d = deriveThroughS5(RELIEF_60, seed, 'coarse');
      expect(d.bugs).toEqual([]);
      expect(d.growth).toBeDefined();
      if (d.growth === undefined) return;
      expect(d.growth.stages.length).toBe(3);
      expect(d.growth.stages[1].walled).toBe(true);
      expect(roundBreaks(d.growth)).toEqual([]);
    });
  }
});
