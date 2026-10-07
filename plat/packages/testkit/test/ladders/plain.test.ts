// M0-x-05: the plain flat fixture's baseline (C-0269): `runBase(FLAT_BLUEPRINT, 1)` — the CITY flat fixture at one seed,
// every stage of M0 in §4.1's order — reaches no rung of F-ROUTE, F-NUM's stage side, F-RIVER, F-WALL, F-BUDGET-STAGE or
// F-WORK: the stage ladders are quiet on it but F-CUT's, whose rungs its 1 400 faces reach (the baseline count, rung (a)
// at attempt ≥ 1 among them), reported beside each fixture and never part of the verdict; its bugs list is empty.
import { describe, expect, it } from 'vitest';
import { ladderLeafOf, ladderPlainBaseline, STAGE_LADDERS } from '@plat/testkit';

describe('the plain flat fixture (runBase(FLAT_BLUEPRINT, 1))', () => {
  it('reaches no stage rung outside F-CUT; F-CUT’s rungs counted (the baseline); bugs empty', { timeout: 900_000 }, () => {
    const b = ladderPlainBaseline(1);
    expect(b.seed).toBe(1);
    expect(b.bugs).toBe(0);
    const built = STAGE_LADDERS.filter((r) => r.milestone === undefined);
    expect(Object.keys(b.leaves).sort()).toEqual([...new Set(built.map(ladderLeafOf))].sort());
    for (const r of built) {
      const n = b.leaves[ladderLeafOf(r)];
      if (r.ladder === 'F-CUT') continue;
      expect([ladderLeafOf(r), n]).toEqual([ladderLeafOf(r), 0]);
    }
    expect(b.reached.every((leaf) => leaf.startsWith('S8 F-CUT '))).toBe(true);
    // The baseline count: rung (a)'s turned frames, and the rest of F-CUT's ladder the CITY's faces take (measured
    // 2026-10-07: pre 33, antenna 15, a ≥ 1 105, b 5, W_CUT_SLID 26, d 5 — C-0269).
    expect(b.leaves['S8 F-CUT a@attempt>=1']).toBeGreaterThan(0);
    expect(b.reached).toContain('S8 F-CUT a@attempt>=1');
  });
});
