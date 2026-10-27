// M0-x-05: the plain flat fixture's baseline (C-0269): `runBase(FLAT_BLUEPRINT, 1)` — the CITY flat fixture at one seed,
// every stage of M0 in §4.1's order — reaches no rung of F-NUM's stage side, F-RIVER, F-WALL, F-BUDGET-STAGE or F-WORK;
// it reaches F-CUT's rungs on its ≈ 1 400 faces (the baseline count, rung (a) at attempt ≥ 1 among them) and F-ROUTE's
// unserved once (S5b's stage-3 main road `s5b:3/4/out`, no path) — measured 2026-10-07, reported beside each fixture,
// never part of the verdict; its bugs list is empty.
import { describe, expect, it } from 'vitest';
import { ladderLeafOf, ladderPlainBaseline, STAGE_LADDERS } from '@plat/testkit';

describe('the plain flat fixture (runBase(FLAT_BLUEPRINT, 1))', () => {
  it('reaches no stage rung outside F-CUT; F-CUT’s rungs counted (the baseline); bugs empty', { timeout: 900_000 }, () => {
    const b = ladderPlainBaseline(1);
    expect(b.seed).toBe(1);
    expect(b.bugs).toBe(0);
    const built = STAGE_LADDERS.filter((r) => r.milestone === undefined);
    expect(Object.keys(b.leaves).sort()).toEqual([...new Set(built.map(ladderLeafOf))].sort());
    const cut = built.filter((r) => r.ladder === 'F-CUT').map(ladderLeafOf);
    // What it reaches: F-CUT's whole M0 ladder and S5b's one unserved road; every other built leaf 0.
    expect([...b.reached].sort()).toEqual([...cut, 'S4/S5b F-ROUTE unserved'].sort());
    for (const r of built) if (r.ladder !== 'F-CUT' && ladderLeafOf(r) !== 'S4/S5b F-ROUTE unserved') expect([ladderLeafOf(r), b.leaves[ladderLeafOf(r)]]).toEqual([ladderLeafOf(r), 0]);
    expect(b.leaves['S4/S5b F-ROUTE unserved']).toBe(1);
    // The baseline count (measured 2026-10-07: pre 33, antenna 15, a ≥ 1 105, b 5, W_CUT_SLID 26, d 5 — C-0269; re-measured
    // 2026-10-27 in hardening round S1 on the tree after M0-b-03's S7 – S8 and M0-a-09's S14 – S17: pre 29, antenna 24,
    // a ≥ 1 97, b 5, W_CUT_SLID 95 slide steps, d 4 — the summary's `plain` counts, C-0435).
    for (const leaf of cut) expect([leaf, b.leaves[leaf] > 0]).toEqual([leaf, true]);
  });
});
