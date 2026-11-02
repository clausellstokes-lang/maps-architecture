# M0-f-02b — the check's minor notes (for the hardening milestone M4; none of them fails the item)

These notes come from the first independent check of M0-f-02b (lane `check/M0-f-02b`, 2026-11-01). The verdict and
its five blockers are in `checks/M0-f-02b.md`. The rows below are minor under J180 and N-45. Each one fails safely,
lies off the item's stated promises, or touches only an informative, CONTENDED, never-gating figure. Each row names
its handling.

| id | observation | suggested handling | milestone | label |
|---|---|---|---|---|
| N-1 | **`receipt`'s exit code on a failing verdict is unpinned.** Mutant X41 (`return 0` in place of `report.verdict === 'fail' ? 1 : 0`) survives NEAR and RELATED. The summary section records the verdict, so the figure stays right; only the shell exit would lie | a test drives a receipt whose planted unit fails and asserts exit 1 | M4 | CONFIRMED |
| N-2 | **`reportProblems`'s sampled branch is called only by its test.** `receipt` never checks its own report, and `summary` calls it without samples. Mutant X44 (skip a sampled job's unit check) survives because the test only asserts that the sampled short report is accepted | either `receipt` checks its own report through `reportProblems(report, m, sampled)`, or the branch is removed; a test with a wrongly sampled unit list | M4 | CONFIRMED |
| N-3 | **`harness`'s refusal of `tier:milestone` is unpinned.** Mutant X53 (`NESTED` without `milestone`) survives: the test's harness map carries `tier:pr` and `timing-phase` only, so `tier:milestone` exits 64 as an unknown name. C-0088 is still held at the manifest level (`nestedTierCall` over every unit is false in `lists.test.ts`) | the test's map carries all three tier entries | M4 | CONFIRMED |
| N-4 | **A capped unit's CPU is lost.** Under the receipt's `watch` wrapper, the runner measures only the wrapper's process, and the stopped group's CPU goes with it. Today's nightly receipt read ≈ 1.1–1.2 s CPU for each 120.6 s capped unit, so the PARTIAL section's `cpuMs` and its `cpu ÷ 16` figure (941 ms) are understated. The budget verdict is `unjudged` and never gating | record the capped units' CPU as unknown (null), or collect the group's usage before the kill | M4 | CONFIRMED |
| N-5 | **The PARTIAL projection counts only the finished units.** `projectedWallMs` is the finished units' mean × the job's units, so when a long unit is capped and a short one finishes, the job projects below its cap. Today: ladder-coverage `projectedWallMs: 2448` while its whole run was stopped at 120 000 ms (`failedUnits` shows the 124, so it is visible) | null, or a lower bound flagged as such, when any sampled unit of the job was capped | M4 | CONFIRMED |
| N-6 | **An edge unit's deadline is 12 h (`EDGE_DEADLINE_MS`).** That is the milestone tier's whole budget. A hang in the nightly holds the tier up to 12 h for that file (3× the nightly's 4 h) before the post-hoc unit attributes it. Fails safe: over budget, then named | a deadline from the tier's budget, or a per-seed watchdog through `PLAT_EDGE_LOG`'s progress | M4 | PLAUSIBLE |
| N-7 | **B-FUZZ and the determinism spike declare no `suites`.** Their seed families are held inside the jobs (fuzz-bar's `judged > 0`; the determinism spike's 100 generated seeds), as `M0-f-02a-notes.md` N-6 records for the PR jobs | declare their fixture or seed family where one exists as a file | M4 | CONFIRMED (by reading) |
| N-8 | **The post-hoc replay is serial at `HANG_MS` a seed.** A missing fixture is replayed over all 1 000 seeds in one child before the next is tried. A fixture whose unit failed for another reason (no hang) costs a full replay before the hang behind it is reached | replay the missing fixtures from the logs' last returned seed, or in parallel within the budget | M4 | PLAUSIBLE |

## Rows added by the closing re-check 1 (lane `check/M0-f-02b-close-r1`, 2026-11-01 / 02)

| id | observation | suggested handling | milestone | label |
|---|---|---|---|---|
| N-9 | **The nightly and milestone manifest digests moved with B1's fix** (`80801d56…` → `3e6155ae…`, `30974bc0…` → `345d35b0…`; the PR digest `c1caf951…` unchanged): the B-FUZZ constructive unit now draws 100, ×10 its earlier work. A declared shift for M0-t-01's measurement, REPORTED; no test pins those digests today, and RELATED@1000 over the item's two sources shows no `test/timing-phase/` red | M0-t-01 takes the new digests when it measures the tiers | M0-t-01 / M4 | CONFIRMED |
| N-10 | **The tier:pr receipt's two B-CITY-lite stand-ins exceed a seat at today's speed.** One batch of 10 seeds: fusion 5 007 s (≈ 7.0 h projected for 50), site 3 287 s (≈ 4.6 h projected), so tier:pr is ≈ 12 h end to end on this machine against its 15 min budget (CONTENDED, never gating; Q18 / KI-12 carry the speed). The site stand-in's batch exits 1, as in the builder's whole run `aee36053` (M0-e-06's harness, unchanged by this item) | re-run the PR receipt whole after Q18, as the receipt rule's queue row says | M4 | CONFIRMED |

Cross-references (not new rows): `M0-f-02a-notes.md` N-5's tier argv half (`--no-ladders --no-s11` on the PR
tier's `--primitive` units) is still open and REPORTED by C-0460 (8). It is outside this check's verdict.
