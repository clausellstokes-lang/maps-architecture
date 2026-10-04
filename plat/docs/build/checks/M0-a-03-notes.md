# M0-a-03 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-a-03 (lane `check/M0-a-03-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, the closing check fails the item only on a blocker. Neither finding below is a
blocker: one is a hardening fixture and the other is an executed confirmation of an equivalence the fix round already
recorded. Each row names its handling and where it belongs. The verdict and its evidence are in `checks/M0-a-03.md`
(the closing round is at the top).

The first check's notes N-1 – N-4 stay in `checks/M0-a-03.md`. N-2 was taken up by C-0164 (5). N-1 is still the
session's to route: no table holds `index.gridCellM`, and the first caller of `attachIndex` needs a sourced value or a
choices row. The ids below continue that numbering.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-5 | **Only fixed fixtures cover off-line finer vertices, and they stop at one level.** The fuzz's random arenas are rectilinear on a 10 cm grid, so `splitPair` never places a vertex off its segment. The fix round's `OFFLINE` and `OFFLINE_BASE` hold one L2 vertex off one L1 run. The closing probe `CHAIN` goes further. Its L1 run is A (0, 1000) → B (2000, 1006). It carries S1 (1100, 1003) at L2, S2 (500, 1002) at L3 and S3 (800, 1002) at L4, and each of these lies within 0.71 cm of every coarser route through it, on both sides. A line runs from each of them to an L0 side, so each level from L1 to L4 reads the run on a different route. On the original code the probe agrees with both brute-force oracles (`oracleQuery` and the `pointLocate` oracle) in four index states: all static, all in the grid, after a stage-end rebuild, and mixed. Each pass makes 20 745 judgements over points and 3 × 2 cm boxes along the run, and own-child answers occur at L3 (360) and L4 (1 038). CONFIRMED (executed on a scratch mirror; "Tests 1 passed (1)"). The probe's source is `scratchpad/waves/a03close/probe-close.test.ts`. | Add `CHAIN` to `query.test.ts` and `pointlocate.test.ts` as a fixture beside `OFFLINE`. Or let `randomSpec` draw a share of edges that are not axis-aligned, so that the fuzz's `splitPair` places vertices off their segments. | M4 (test hardening), or earlier if an insertion item's fuzz (M0-a-04 / M0-a-05) starts building non-rectilinear arenas on an attached index |
| N-6 | **The 0.71 cm padding is equivalent for answers, now shown by execution.** Mutant K15 sets `HOT_PIXEL_CM = 0`. Only `items.test.ts`'s box-value test turns red ("1 failed \| 66 passed (67)", with the probe in the set). Every query, `pointLocate` and fuzz test stays green, including `OFFLINE`, `OFFLINE_BASE` (the run's box written before S stood on it) and the `CHAIN` probe. This confirms C-0164 (4)'s one-line equivalence note: a lattice point outside a lattice segment's bounding box is at least 1 cm from the segment. CONFIRMED (executed). | None. The padding stays as §3.3 states it, held by `items.test.ts`'s box values. This row is recorded so that a later checker does not report it again. | — |
