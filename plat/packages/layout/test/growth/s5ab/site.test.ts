// The site spike's S5 refusals that were the growth stage's own boundary (M0-c-04 hardening round S5; Q122's S5 class,
// M0-e-06 S3's seed lists; C-0475 (1)), relief-3000 in both configurations: on the hill stage 2's S5b spawned (or
// re-drew) a destination beside an arterial's crossing of the boundary — its gate vertex 1.07 m (seed 162) and 1.20 m
// (seed 196) from the arterial's — and `squareGates`, squaring each gate to its way over the outer strip's reach, folded
// the two squares against each other: the outline it handed the trace touched itself (`selfTouches` at the attraction
// distance) though `ringIsSimple` passed it, so S5 refused E_SELF_INTERSECT (F-WALL, 'handed self_touch' in the trace's
// dump). With a squaring that would add a touch kept off, each commits S5, its picks unmoved. The `coarse` configuration
// is R12-5's switch. Cost: four CITY derivations through S5, about 1 – 3.5 min each on the cloud machine (≈ 5 – 14 min).
import { describe, expect, it } from 'vitest';
import { deriveThroughS5, RELIEF_3000, roundBreaks } from './sitefix.js';

describe('the gate squares that folded against each other: the seeds commit S5 (relief-3000, CITY; C-0475 (1))', () => {
  for (const config of ['default', 'coarse'] as const) {
    for (const seed of [162, 196]) {
      it(`relief-3000 ${config} seed ${String(seed)}: S5 commits (was E_SELF_INTERSECT, F-WALL: the handed boundary touched itself)`, { timeout: 900_000 }, () => {
        const d = deriveThroughS5(RELIEF_3000, seed, config);
        expect(d.bugs).toEqual([]);
        expect(d.growth).toBeDefined();
        if (d.growth === undefined) return;
        expect(d.growth.stages.length).toBe(3);
        expect(d.growth.stages[1].walled).toBe(true);
        expect(d.growth.stages[1].trace).not.toBeNull();
        expect(roundBreaks(d.growth)).toEqual([]);
      });
    }
  }
});
