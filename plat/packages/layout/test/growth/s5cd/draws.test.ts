// Queue row Q150 (hardening round S3, R13 / J751): does the growth stage draw from its own streams at every seed, or is a
// small frame the cause of the few seeds that draw? Measured first (the round's sweep, checks/M0-c-05-notes.md 'Hardening
// round S3'): the site fixture (the river blueprint) through S5 at seeds 1 – 12 on eight frames from M0-d-09's test frame
// (400 ha, 12 ha walled) to CITY's own (2 500 ha, 220 ha walled). S5c draws only for a proposal, and a proposal only from
// a seed (C-0254 (3): one every S / 2 along an arterial, clear of the bands, reservations and shores by the clearance and of
// standing junctions by S / 2); S5d draws only when an unwalled stage's top-up grows its rim. On the small frames the
// walled stages' arterial runs hold no seed point that clear, so the stage has nothing to draw for; from the boundary
// frame below up, every seed of the sample draws. This file pins that boundary (outcome (a): the frame is the cause, no
// source change): at the first frame of the sweep at which the growth stage draws, it draws at EVERY seed of the sample,
// and at d-09's test frame (below it) the stage holds no seed at the seeds the sweep found none. The mutant this kills:
// the growth stage's streams never read (every seed's count 0).
import { describe, expect, it } from 'vitest';
import { RIVER_BLUEPRINT } from '../../../src/index.js';
import { sized, throughS5 } from './through.js';

/** The sweep's boundary: the first frame (ha, walled ha) at which the growth stage drew at every seed of 1 – 12. */
const BOUNDARY = { areaHa: 1_100, walledHa: 50 } as const;
/** M0-d-09's test frame, below the boundary. */
const TEST_FRAME = { areaHa: 400, walledHa: 12 } as const;

describe('Q150: the growth stage draws at every seed of the site fixture from the sweep\'s boundary frame (1 100 ha, 50 ha walled)', () => {
  for (let seed = 1; seed <= 12; seed += 1) {
    it(`seed ${String(seed)}: S5c seeds stage 1 and draws from the growth stage's own streams`, { timeout: 240_000 }, () => {
      const t = throughS5(sized(RIVER_BLUEPRINT, BOUNDARY.areaHa, BOUNDARY.walledHa), seed);
      expect(t.model.refusals.size).toBe(0);
      const g = t.s5?.growth ?? [];
      expect(g.length).toBe(3);
      // Stage 1 (the dense core, 31.25 ha) holds seeds and makes proposals; every proposal draws its first curvature.
      expect(g[0].seeds).toBeGreaterThan(0);
      expect(g[0].proposalsMade).toBeGreaterThan(0);
      expect(t.draws).toBeGreaterThan(0);
    });
  }
});

describe('Q150: below the boundary, at M0-d-09\'s test frame (400 ha, 12 ha walled), the growth stage has nothing to draw for', () => {
  for (const seed of [1, 4, 9]) {
    it(`seed ${String(seed)}: no stage holds a seed, so neither S5c nor S5d draws (the {S5: 1} pair's moves there are S5b's)`, { timeout: 240_000 }, () => {
      const t = throughS5(sized(RIVER_BLUEPRINT, TEST_FRAME.areaHa, TEST_FRAME.walledHa), seed);
      expect(t.model.refusals.size).toBe(0);
      expect(t.s5?.growth.map((g) => [g.k, g.seeds, g.proposalsMade])).toEqual([
        [1, 0, 0],
        [2, 0, 0],
        [3, 0, 0],
      ]);
      expect(t.s5?.capacity.map((c) => c.topUp)).toEqual(['none', 'none', 'none']);
      expect(t.draws).toBe(0);
      if (seed !== 4) return;
      // Seed 4 (the session's seam, J712): the {S5: 1} reroll moves S5's root though the growth stage draws nothing — the
      // re-draw is S5b's main-road pick (M0-c-04's `growth.mainroad`, not counted here).
      const r = throughS5(sized(RIVER_BLUEPRINT, TEST_FRAME.areaHa, TEST_FRAME.walledHa), seed, { rerolls: { S5: 1 } });
      expect(r.draws).toBe(0);
      expect(r.root).not.toBe(t.root);
    });
  }
});
