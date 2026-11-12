# J778 — the enceinte landing's tests at full strength, 2026-11-11 to 2026-11-12

M0-c-02 S6 (the enceinte stage's hardening round) landed as 4d490aa7 on 2026-11-10 (J750, the fifty-fifth landing)
with its gate at reduced strength green. Its tests at FULL strength (PLAT_FUZZ_RUNS unset: every seed of every cell)
were owed by the session: the run was lost four times — to three restarts of the session's container and to the
account's weekly stop — and was then cut into units small enough that a restart costs one unit
(c02s6-full-resumable.sh: `s3seeds.test.ts` one cell per run through `vitest -t`, every other file one per run).

Run on a detached worktree at 4d490aa7 (install --frozen-lockfile --offline, build), one worker per run:

| file | result |
|---|---|
| bend, chord, commit, corridor, frame, fwall, pull, sides, simplify, strips, trace, water, ways | 14, 12, 7, 32, 6, 12, 15, 17, 8, 13, 22, 18, 6 passed — 182 of 182 |
| s3seeds (six cells: relief-60 default and coarse, relief-3000 default and coarse for F-WALL; relief-3000 default and coarse for E_DEGENERATE) | 32, 32, 4, 4, 25, 25 passed — 122 of 122 (2 h 33 min of test time) |
| s5seeds | 15 of 15 (40 min) |

**All 15 files green: 319 of 319 tests.** `full.sum` is the per-unit summary (each s3seeds cell reports the file's other
tests as skipped: the filter's doing).
