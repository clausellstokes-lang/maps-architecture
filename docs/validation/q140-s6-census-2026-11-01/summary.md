# Q140 — the S6 edge cells at 1 000 seeds on the landed tree (session seat `session/edge-s6-census-1`, J691)

**Why.** e-04 S4's landing (25a5cde0, the forty-second landing, J686) turned two of M0-x-06's pins red: `testkit/test/edge/repins.test.ts`
rows `EP-01/S6/self-touching` at seed 4101706098 and `EP-01/S6/coincident` at seed 2708765650 expect `refused-safe`
(`E_INVARIANT`); the perimeter's declared buffer rung (C-0458) now commits them. The REFUSED table of repins.test.ts is
tied to `ep01.ts`'s pin table (its first test asserts the two agree) and to the rare-cells list (seeds arrays = shares), so
the honest re-pin needs the post-fix shares at 1 000 seeds — a pin's share is the run's (N-01's spirit), never hand-typed.

**The run.** `PLAT_EDGE_SEEDS=1000 PLAT_EDGE_LOG=… corepack pnpm exec vitest run --maxWorkers=2 --reporter=verbose
packages/testkit/test/edge/ep01-s6-s8.test.ts -t 'EP-01/S6/(self-touching|coincident)'` in the detached worktree
`/home/user/maps-scratch/gates-e04s4/plat` at 25a5cde0 (Node 24.22.1; the gates' install). Attempt 3 (the first two died
with the tool's 2 h limit and this seat's container restart): 2026-11-01 23:52:05Z → 2026-11-02 00:42:09Z, 2 996.96 s.
`vitest-verbose.log` is the run's output; `s6-1000.edge.log.gz` the per-seed log (2 000 lines, one per seed and cell).

**The result (both cells PASS; every seed judged, no problem, no crash, no hang).**

| cell | seeds | absorbed | refused-safe | refused-lawful | rung on every seed | ms p50 / max |
|---|---|---|---|---|---|---|
| EP-01/S6/self-touching | 1 000 | 1 000 | 0 | 0 | S6: the perimeter offset from the degenerate boundary is a simple ring | 1 543 / 3 201 |
| EP-01/S6/coincident | 1 000 | 1 000 | 0 | 0 | the same | 1 390 / 5 284 |

The seeds the pins and the queue name, all `absorbed`: 4101706098 (ep01.ts's share '2 of 1 000', the repins row),
2708765650 (the coincident repins row), 3009257304 (Q133's ninth seed; x-06 S1's branch re-pins it as refused, '3 of
1 000', measured on the PRE-fix tree 9156f2b7), 2191303060 (absorbed since e-04 s2).

**What the seam is, then (applied by the session at x-06 S1's landing, merged with CO's own re-pins, or before it on a
session lane):** the two S6 entries `self-touching` and `coincident` leave `ep01.ts`'s pin table (the cells are hard
'0 per 1 000' cells: the judge then names any future refusal on them as a new finding for the session); the two REFUSED
rows leave `repins.test.ts`; the rare-cells list reads `['EP-01/S1/self-touching', 'EP-01/S5a/coincident']`; the
`collinear-chain.test.ts` clause 'coincident 2708765650 stays refused' is already e-04 S4's (it expects S6 to commit).
The `zero-area` S6 pin ('996 of 1 000') was not in Q140's scope and was not re-measured here; x-06's next 1 000-seed
census on the post-fix tree re-reads it.
