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

## Hardening round S1 (lane `build/M0-f-02b-fix-s1`, 2026-11-10; J237 (2), J186, J192, J238, J264, J290 / N-58, J263 Q1 / Q6, J443 / J749: leg 2 of the merged round M0-f-02a S2 → M0-f-02b S1)

The session's hardening round S1 on the two rows the second re-triage found still open for this item: queue rows
**Q94** and **Q146** (`docs/M0-FIX-QUEUE.md`). Both rows and their sources were read whole: Q94's source is
`checks/M0-f-02a-notes.md` N-5 and its 'Hardening round S1' row (the mirror fix and its pin, reported to this item);
Q146's are `checks/M0-x-06-notes.md` row 10 (l. 19 and its S1 outcome at l. 176) and `checks/M0-x-06-s1.md` row 10.
Choices row C-0475. Inside the owns only: `bench/src/tier-jobs/index.ts`, `bench/src/tier-jobs/cli.ts`,
`bench/test/tier-jobs/units.test.ts`, `bench/test/tier-jobs/cli.test.ts`. NO-SHIFT for model output: no model output,
golden or committed summary moves; the three manifests' digests move with Q94 (declared below).

| row | outcome | what changed | pin and its mutants (lane mirror, `vitest run --maxWorkers=1 --bail=1 bench/test/tier-jobs`) |
|---|---|---|---|
| Q94 (the argv half) | **FIXED and PINNED** | `fuzzUnits` appends `'--no-ladders', '--no-s11'` after `'--no-summary'` on each of the 24 `--primitive` units (N-5's shape as written; M0-k-04's flags, C-0387). The `constructive set` unit carries neither: it is the whole-set run, which fuzz-bar refuses them on (exit 64) and which runs the kernel ladders and the S11 workload once for the job. `fuzzUnits` is shared, so the nightly's B-FUZZ and the milestone's carried copy take the same partition rule (the same per-process work repeated per unit; one rule for every tier, as N-5 writes it on `fuzzUnits`). Real-CLI probe: `corepack pnpm bench -- fuzz-bar --primitive obb --runs 3 --constructive-seeds 10 --no-summary --no-ladders --no-s11` exit 0, "kernel ladders not run (--no-ladders: the whole-set unit runs them)", "S11 workload not run (--no-s11 …)", bar HOLDS. | `units.test.ts`: the new test "B-FUZZ's partition units leave the per-process work to the whole-set unit …" (PR at 10⁴, PR under the fallback, nightly, milestone: every `--primitive` unit ends `--no-summary --no-ladders --no-s11`, each flag once; the whole-set unit neither), and the two exact-argv pins of "B-FUZZ at 10⁶ …" and "B-FUZZ's constructive draws per tier …" gain the flags. MB94 (the before-image `index.ts`) KILLED — also by the new test alone (`-t "partition units"`: 1 failed); M94a (`--no-s11` dropped), M94b (`--no-ladders` dropped), M94c (the flags on the whole-set unit too), M94d (the flags before `--no-summary`), M94e (the PR tier only), M94f (the nightly only) all KILLED. |
| Q94 (the test half) | **REPORTED** (to M0-f-02a / the session: the file is M0-f-02a's, J637 / J695, as the queue row says) | `bench/test/tiers/manifest.test.ts:97` pins the PR tier's `--primitive` argv exactly and is RED in the tree after this fix (RELATED@1000: 1 failed of 206, that test alone). The seam, validated in the lane mirror (RELATED@1000 there 14 files 206 / 206, exit 0): line 97's expected array gains `'--no-ladders', '--no-s11'` after `'--no-summary'` — `…, String(PR_CONSTRUCTIVE_DRAWS), '--no-summary', '--no-ladders', '--no-s11']);` — and nothing else (line 99's whole-set argv and the fallback test's slices are unchanged). | — (another item's file; the pin of this half is that line once the seam lands) |
| Q146 | **FIXED and PINNED** (the replay's marker); the in-run marker **REPORTED** to M0-x-06 | **Which form, and why.** The nightly's per-seed attribution is the replay child (C-0460 (6), C-0461 (3), C-0462): `edge-hangs` replays each built fixture missing from the logs in a child (`edge-replay`) watched seed by seed at `HANG_MS`. Its per-seed start marker rode on the child's stdout pipe only. That is not a reliable marker: Node writes to a pipe asynchronously on macOS (§12.1's reference machine; on this Linux machine pipe writes are synchronous — probe: a child that writes its start line and then spins delivered the line in 19 ms), and `edgeReplay`'s seed loop is synchronous, so a seed that hangs in synchronous code can leave its start line (and every earlier line) unflushed; the parent then sees no seed in flight, never arms the watchdog, names no seed and waits on the child for ever. The fix makes the marker reliable: `replayFixture` hands the child a marker file in `PLAT_EDGE_MARKS` (`edgeHangs` puts it under the run's output, `edge-replay/<fixture, URI-encoded>.jsonl`, removing a stale one first, and keeps it as the hang's evidence; a direct call without `marks` uses a temporary file removed after the run); the child (`edgeReplay`, default `marks` from that variable) appends each protocol line to it SYNCHRONOUSLY before writing it to stdout, so a seed's start is on disk before its run begins; the watchdog reads the file on every poll and once more at the close. Both streams carry the same lines in the same order; whichever is ahead is read, each line applied once. The in-run form (a start marker written by the edge suite's own run before each `f.run`, so a unit stopped at its deadline names the seed without a replay) needs `packages/testkit/test/edge/support.ts`, M0-x-06's file; it cannot be reached from this item's owns (vitest 5's command line has no `--setupFiles`, and the module instances a preload would patch are not vitest's), so it is REPORTED to M0-x-06's hardening. Fail-safe unchanged: an edge unit still fails through its deadline (and the file through `timeoutFor` where that fires first); no message text changed. | `cli.test.ts` § "the per-seed start marker (queue row Q146 …)", three tests: a planted child that speaks only through the marker file and hangs in synchronous code at seed 22 is stopped and seed 22 named (a finishing child counts 3 returns; a child on both streams counts each line once); `edgeHangs`' default replay through the spawner seam hands the child its marker file (a stale file of two returns removed first) and logs "B/x at seed 22: no return in … ms (a hang, over 1500 ms) after 1 seed(s) returned", the file's last line the hung seed's start; `main(['edge-replay', …])` under `PLAT_EDGE_MARKS` has each seed's start on disk when its run begins and the file equal to the stdout lines. MB146 (the before-image `cli.ts`) KILLED — the three tests alone: 3 failed; M146a (the file never read), M146b (the start line to stdout only), M146c (`edgeHangs` passes no marker path), M146d (a stale marker file kept), M146e (the variable not handed to the child), M146f (`edgeReplay` ignores the variable), M146g (file lines re-applied every poll), M146h (no final read at the close) all KILLED; M146i (the file line written after the stdout line instead of before) SURVIVED — equivalent: both writes are synchronous calls made before the seed's run, so the start is on disk before the run either way. |

**Mutant table (17, targeted at the two rows' promises):** 16 killed, 1 equivalent (M146i, noted above). The lane
mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-f-02b-fix-s1` was a real copy (no link into the project; the
`@plat` dependencies resolved inside it); each mutated file was restored from `plat/` and checked with `cmp -s`; the
mirror is deleted.

**Declared shift (the manifests, not the model).** The PR, nightly and milestone manifest digests (`manifestDigest`,
`cli.ts`) move with Q94: PR `c1caf951…` → `6f375d35…`, nightly `a06c76f8…` → `c98da9a6…`, milestone `9b7b5cd6…` →
`e121c793…` (before over the tree as it stood when this round opened, after over the final tree). Job and unit counts
are unchanged (PR 10 jobs / 63 units, nightly 10 / 170, milestone 10 / 171). The committed summary
`docs/build/summaries/M0-f-02b.json` is not rewritten: its sections are the record of the receipts that ran, each
naming the digest it ran under; M0-t-01 takes the new digests when it times the tiers (as N-9). Q49's whole receipts
are not this round's.

**API (J263 Q1).** No export of the folder index or the barrel added, removed or renamed. `cli.ts` (not the folder
index) gains one optional field (`replayFixture`'s `marks`) and one optional trailing parameter (`edgeReplay`'s `marks`,
defaulting to `PLAT_EDGE_MARKS`); every existing call is unchanged. No message text changed (J263 Q6).

**Refusal census (J264, N-58).** The item's registered families are the three real manifests (their units' argv as the
harnesses parse them) and the edge replay's seed family. Probe (session scratchpad `f02b-s1/census.mts`, run through
tsx on the before-image in the lane mirror and on the final tree): B-FUZZ units refused by fuzz-bar's argument rule
(`--no-ladders` / `--no-s11` without `--primitive`, exit 64) — PR 0 of 25, nightly 0 of 25, milestone 0 of 25 before and
after; partition units lacking the flags 24 → 0 in each tier. The replay family registers no refusal (a seed that throws
is a crash, counted, never refused). Lawful-input refusals: **0 before, 0 after**. No refusal met in the families, so
no verdict class to report.

Gates (W = 1, after the last source edit): install --frozen-lockfile 0; lint 0 (eslint 1 291 files, 0 errors, 0
warnings, probe-red ok, 9 whole-tree checks); build 0; NEAR `bench/test/tier-jobs` 4 files 63 / 63 (59 before the
round; +1 Q94, +3 Q146, the both-streams case inside the first); RELATED@1000 over `bench/src/tier-jobs/index.ts` and
`cli.ts`: tree 14 files 205 / 206, exit 1 — the one red is `bench/test/tiers/manifest.test.ts:97`, Q94's test half,
REPORTED above; the lane mirror with that seam applied 14 files 206 / 206, exit 0. No `bench/test/timing-phase/` red.

### Rows added by this round (for the hardening milestone M4; none fails the item)

| id | observation | suggested handling | milestone | label |
|---|---|---|---|---|
| N-11 | **A replay child that hangs outside any seed is not stopped.** The watchdog arms on a seed's start line; a child stuck before its first start (in its imports) or between a done and the next start leaves no seed in flight, so `replayFixture` waits on it with no limit and `edge-hangs` names nothing. Not this round's row (it names a seed's hang), and the edge suite's own run would have hung the same way first | a whole-replay deadline (a start line overdue by `hangMs` after the last line) reported as a hang outside a seed | M4 | PLAUSIBLE (by reading) |
| N-12 | **The in-run start marker is M0-x-06's.** A start marker written by `support.ts`'s `runFixture` before each `f.run` (to a sidecar of `PLAT_EDGE_LOG`) would let `edge-hangs` name a hung seed from the original run, before or without a replay, and lift N-6's 12 h wait | M0-x-06 writes the marker; this item's `edgeHangs` reads it (a contract between the two items, ruled by the session) | M4 | CONFIRMED (Q146's reported half) |

## Closing check S1 (lane `check/M0-f-02b-close-s1`, 2026-11-10; J162, J269; leg 2 of the merged round M0-f-02a S2 → M0-f-02b S1)

The closing checker's new findings; none is a blocker (verdict in `checks/M0-f-02b-s1.md`).

| id | observation | suggested handling | milestone | label |
|---|---|---|---|---|
| N-13 | **The close-time marker read is pinned only by a race.** `replayFixture` reads the marker file once more at the child's `close` (`if (res.hang === null) readMarks();`), so a child whose last lines reached only the file (an asynchronous stdout pipe cut by `process.exit`, Node on macOS) still has its returns and throws counted. The pin ("a child that finishes counts its returns", `cli.test.ts` § Q146, `pollMs: 20`) kills the mutant that drops that read only when no poll fires between the child's last write and its exit: the checker's mutant M9 SURVIVED the sweep (NEAR 63/63, RELATED@1000 206/206) and was killed in 4 of 6 repeats of the Q146 block. The read affects only the informational counts of a replay with no hang (`… R returned, C threw; no hang`); a hang is caught by the polls, and the exit code is 1 either way. Equivalent on Linux (the stdout pipe is synchronous and drained before `close`) | make the pin deterministic: the marker-only child that finishes, run with `pollMs` above its whole run (e.g. 60 000), so only the close-time read can count its 3 returns | M4 | CONFIRMED (executed: sweep + 6 repeats) |
