# M0-k-05 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-k-05 (lane `check/M0-k-05-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, a closing check fails the item only on a blocker. None of the findings below is a
blocker: none gives a wrong result on an honest input, and the parity job's verdict stays its exit code (C-0113 (2)).
Each row names its handling and the milestone or item where it belongs. The verdict and its evidence are in
`checks/M0-k-05.md` (the closing round is at the top). The first check's notes N-a – N-g stay there; N-e (the README's
wording) was taken up by fix round 1. The ids below continue that numbering.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-h | **A stop leaves an earlier report in place.** The bench entry writes no report when the CLI stops (exit 2), as T-RIG-1 and C-0186 require. But it does not remove a `parity-report.json` that an earlier run left in the same `PLAT_BENCH_OUT`. Probe in the mirror: run 1 (the pass fixture with `ours-pass.json`) exits 0 and writes `parity-report.json` (1606 bytes, 22:46:09). Run 2 (`o-onlycut.json`, a run that judges nothing) exits 2, and so does run 3 (`baselines.json` = `[]`). After runs 2 and 3 the folder still holds run 1's file, unchanged (1606 bytes, 22:46:09). The bench tests delete the file before each run, so they cannot see this. CONFIRMED (mirror). | One of two. (a) The entry removes `PLAT_BENCH_OUT/parity-report.json` before it runs the CLI, and a bench test runs a pass and then a stop over one folder. (b) The run items' runners give each run a fresh output folder. Either way, the checkers of M0-b-05b, M0-c-07b and M0-x-03 should confirm that each report path they cite was written by the run whose exit code they quote. | M0-b-05b / M0-c-07b / M0-x-03 (AFTER-M-1); otherwise M4 |
| N-i | **A run of `reported` rows exits 0.** C-0186's pick counts a `reported` row (a descriptive row, a proxy such as `bldg.r4.*`, a row with `values.n` 0) as judged. So a run in which every row reads `reported` writes its report and exits 0, the exit code for "every gating row passed", even though no row gated. The item's own test shows it: `parity.test.ts` "a partial run … and a run of reported rows still write their report" expects `reported.code` 0 with the rows `['reported']`. C-0186 records the pick and its reason (§13.5 makes `reported` the cell's outcome). So this is declared, not a failure. The first check's N-c covers the related case of an our side that omits a gating cell. CONFIRMED (the test; mutant K09 shows the pick is held). | Either the summary line names the gating count (for example "gating 0"), or a run whose rows are all `reported` exits 0 only when its exit bar names no gating cell. Each run item's checker confirms that its `--ours` carries every gating cell its exit bar names (as N-c). | M4, or the run items' checkers (M0-b-05b, M0-c-07b) |
| N-j | **`baselines:check` passes a crossing of an empty `baselines.json`.** In the mirror, a folder holds `baselines.json` = `[]` (sha256 `37517e5f3dc6…`) and a `crossings.json` whose record names it with `rows: 0` and checks C1 – C7. For it, `corepack pnpm baselines:check -- …/emptycheck/baselines.json` exits **0**: "(baselines, 0 rows, sha256 37517e5f3dc6…): pass", C1 – C7 pass, C8 – C10 "not run at M0", "record pass". This is the crossing gate of §17.1 (4), a content check, and not a tier suite: C-0113 (2) names only the deny-list scan and the parity report as tier jobs. Since fix round 1, the parity CLI stops on that file with exit 2 ("empty: the file holds no row"), so no vacuous parity pass follows. Still, the crossing admits a file the parity job will refuse. The `ng-faces.json` kind with no face was not probed. CONFIRMED (mirror). | `baselines:check` refuses or flags a `baselines.json` or `ng-faces.json` of no row or face (a C1 line, or a separate "empty" line), with a test, so that M-1's crossing seat sees the problem at the crossing and not at the nightly job. | M1 (with C8 – C10, V12 §3.3); otherwise M4 |

## Hardening round S1 (lane `build/M0-k-05-fix-s1`, flow flow-7, 2026-10-20)

The session's hardening round of M0-k-05 (J237 (2), J186, J192; the inventory `checks/hardening-inventory.md`, rows
M0-k-05:12 – :14; the re-triage of 2026-10-19, J423, plan entry 43, batch B8; ZERO REFUSALS J264, J290 / N-58). This is
the second half of merged round M-K: it runs after M0-k-06's round S1 closed (`checks/M0-k-06-s1.md`, PASS), on the same
branch. No earlier session round of M0-k-05 exists in the lane log. The re-triage keeps two rows open, **N-h** and
**N-j**; it defers **N-i** to M4, and nothing is built for it. **Three source files changed:**
`bench/src/parity/index.ts` and `bench/src/baselines-check/index.ts` (the thin entries) and
`packages/testkit/src/parity/check.ts` (the check's C1). The tests changed in `packages/testkit/test/parity/check.test.ts`,
`bench/test/parity/parity.test.ts` and `bench/test/baselines-check/check.test.ts`; one fixture folder was added,
`bench/test/baselines-check/fixtures/empty/` (`baselines.json` = `[]`, sha256 `37517e5f3dc6…`, and its rows-0 record).
The choices row is C-0405.

### Row by row

| row | outcome | the fix or pin and its evidence | mutant (lane mirror) |
|---|---|---|---|
| N-h (a stop leaves an earlier `parity-report.json` in place) | **FIXED** and **PINNED** | The note's shape (a), inside the item's owns: `bench/src/parity/index.ts`'s `run` removes `PLAT_BENCH_OUT/parity-report.json` (`rmSync(…, { force: true })` on `outDir(ctx.out)`) before it parses the arguments, so the folder holds this run's report or none, whatever the exit code (0 / 1 write theirs; 2 and 64 leave none). The same defect stood in the twin entry, so `bench/src/baselines-check/index.ts` removes `baselines-check.json` the same way (declared in C-0405 (2)). Shape (b) (fresh folders per run) is the run items' runners', not this item's. New `it` in `bench/test/parity/parity.test.ts`: 'hardening round S1 (N-h): a pass, then a stop or a usage error over the same PLAT_BENCH_OUT leaves no report …' — a pass (report present), then each of an empty `baselines.json`, an empty seed family, a row lacking `capture` (exit 2) and a usage error (exit 64) over the same folder with the earlier report left in place: the report is gone after each; a fail after a pass writes its own report (`summary.fail` 2). New `it` in `bench/test/baselines-check/check.test.ts`: the same for a pass, then a missing file (2) and a usage error (64). The stop cases' "no write" assertions now admit exactly the folder's `mkdirSync` and the report path's `rmSync`, and still refuse any written file. Mirror receipts with the real `corepack pnpm parity`: the pass fixture as `baselines.json` exits 0 and writes `parity-report.json` (1606 bytes); then `[]` exits 2 and the folder is empty. `corepack pnpm baselines:check`: pass 0 (report written), then an absent file 2 (folder empty). | H1 – H6, all KILLED |
| N-i (a run of `reported` rows exits 0) | **DEFERRED** to M4 (J423 re-triage) | Nothing built. C-0186's pick stands: a `reported` row counts as judged. The run items' checkers still confirm that `--ours` carries every gating cell the exit bar names (the first check's N-c). | — |
| N-j (`baselines:check` passes a crossing of an empty `baselines.json`) | **FIXED** and **PINNED** | The note's shape, as a C1 line (the inventory's "C1 line"; the report's check list C1 – C10 and its format are unchanged): `check.ts`'s C1 now fails a `baselines.json` of no row (`[]` or `{ "rows": [] }`) with the problem `file: empty: the file holds no row — an empty baseline file fails, never passes vacuously (§13.8 Edges; C-0099)` (the parity CLI's own stop text, `EMPTY_BASELINES`, reused) and an `ng-faces.json` of no face (`faces: []`, hoods kept or not) with `faces: empty: the file holds no face — an empty face file fails, never passes vacuously (§13.8 Edges; C-0099)`. The record check is untouched (a rows-0 record still matches its file), so the crossing fails on C1 alone, exit 1. New describe in `packages/testkit/test/parity/check.test.ts`, 'hardening round S1 (N-j): a crossing of an empty file fails C1, never passes', three `it`s: both baselines forms (C1 the only fail, record pass, a one-row file still passes); ng-faces with no face (with and without hoods; a full file still passes); the command over the note's own probe (`[]` with a rows-0 record: exit 1, its first line `… (baselines, 0 rows, sha256 37517e5f3dc6…): fail`, `  C1 fail: file: empty: …`, `  record pass` — it exited 0 before the round). New `it` in `bench/test/baselines-check/check.test.ts` over the new `fixtures/empty/` folder: exit 1, C1 the only failing check with the text verbatim, record pass. Mirror receipt: `corepack pnpm baselines:check -- bench/test/baselines-check/fixtures/empty/baselines.json` exits 1 with `C1 fail: file: empty: the file holds no row …`, C2 – C7 pass, C8 – C10 not run, `record pass`. | J1 – J7, all KILLED |

### Behaviour, API and texts

* **A declared shift, with nothing persisted moving.** (1) A run of either entry now deletes the report an earlier run
  left in its output folder (`PLAT_BENCH_OUT`, never inside plat/); a pass or a fail writes the same bytes as before.
  (2) `baselines:check` on an empty `baselines.json` or `ng-faces.json` now exits 1 (was 0); every other input gives the
  same report bytes as before. No crossing file has crossed (`packages/testkit/baselines/` holds README.md,
  `crossings.json` = `[]` and M0-k-06's `denylist-allow.json`), so no committed record, report, digest or golden moves.
* **API frozen (J263 Q1).** No export of `parity/index.ts` or of the testkit barrel was added, removed or renamed; the
  new constant `EMPTY_NG_FACES` is module-private in `check.ts`. `run`'s signature in both entries is unchanged.
  Message texts (J263 Q6): no existing text changed; the two new C1 problem texts are pinned verbatim in the tests.
* **Old file → new file map (J263 Q8).** No test file was merged, split, renamed or deleted, and no `it` title changed.
  `check.test.ts` 13 → 16 `it`s, `bench/test/parity/parity.test.ts` 8 → 9, `bench/test/baselines-check/check.test.ts`
  6 → 8; the item's six test files 98 → 104 tests.
* **The denylist kind.** A `denylist.json` of no digest is not this round's row (the inventory names baselines and
  ng-faces); it is left as it was and noted as N-s1-1 below.

### Refusals, before → after (J264 (5), J290 / N-58)

The item has no B-FUZZ family; its registered refusals are the parity CLI's stops and the check's stops and failing
lines. **The parity CLI:** 19 `ParityStop` sites (baselines.ts 5, cli.ts 2, ours.ts 12) and the judges-nothing stop
before, the same 20 after; the bench parity fixtures give the same exit codes (pass 0, fail 1, stop / empty / absent 2,
usage 64). **`baselines:check`:** 2 stop routes (missing, not JSON) before and after; C1's failing routes rise by **2**
— a `baselines.json` of no row and an `ng-faces.json` of no face. Both are **UNLAWFUL** inputs (§13.8 *Edges*: "a suite
whose … baseline file is empty or missing fails naming it"; the parity CLI already stops on the first, C-0186 (1)), and
the verdict is **REFUSE**: a repair would have to invent rows. The layer that gives the user the alternative is M-1's
research seat, which regenerates the file or records that it cannot deliver it (C-0071 (b)), whereupon the clauses
become descriptive rows by the ⟨M-1⟩ rule (C-0116) — a file with rows. No user reaches these routes through §11.4's
doors (the check is a crossing seat's command). Lawful-input refusals: **0 → 0**. The existing check fixtures give the
same exit codes as before (pass 0, fail 1, norecord 1, appended 0 / 1, deny 0, absent 2, usage 64).

### Self-check (J183): the faults re-introduced in the lane's mirror

The mirror was `/home/user/maps-scratch/waves/selfcheck-build-M0-k-05-fix-s1/plat`, a `cp -a` copy. It was proved
isolated before the first mutant: no link points into the tree, and `@plat/kernel` (from testkit) and `@plat/testkit`
(from bench) resolve inside the mirror. The unmutated folders ran 6 files, 104 / 104. Each fault ran as `corepack pnpm
exec vitest run --maxWorkers=1 --bail=1 packages/testkit/test/parity bench/test/parity bench/test/baselines-check`. Each
mutated file was restored from the tree and `cmp`-checked. The mirror was deleted at the end.

| id | fault | result | the round's pin |
|---|---|---|---|
| H1 | the parity entry removes no earlier report (pre-round) | KILLED | N-h parity case |
| H2 | the parity removal only after the usage check | KILLED | N-h parity case (the 64 step) |
| H3 | the parity removal only just before a report is written | KILLED | N-h parity case |
| H4 | the check entry removes no earlier report (pre-round) | KILLED | N-h check case |
| H5 | the check entry removes the wrong file name | KILLED | 'exit 2: a missing file stops …' (its write list) |
| H6 | the check removal only just before a report is written | KILLED | N-h check case |
| J1 | no C1 line for a `baselines.json` of no row (pre-round) | KILLED | N-j bench case and testkit cases |
| J2 | no C1 line for an `ng-faces.json` of no face (pre-round) | KILLED | N-j ng-faces case |
| J3 | the face line only when the hoods are empty too | KILLED | N-j ng-faces case (hoods kept) |
| J4 | the empty-rows line under C2 instead of C1 | KILLED | N-j bench case |
| J5 | the face line's text changed | KILLED | N-j ng-faces case (verbatim) |
| J6 | the empty-rows line for the array form only | KILLED | N-j baselines case (`{ rows: [] }`) |
| J7 | an empty-file line read as a warning, not a fail | KILLED | N-j bench case (exit 1) |

### Gates (W=1)

`corepack pnpm install --frozen-lockfile` 0; `corepack pnpm lint` 0 (eslint 1158 files, probe-red ok, 9 whole-tree
checks); `corepack pnpm build` 0; NEAR, full strength, the item's six test files (`packages/testkit/test/parity`,
`bench/test/parity`, `bench/test/baselines-check`) 6 files, 104 / 104; RELATED@1000 (`PLAT_FUZZ_RUNS=1000 corepack pnpm
exec vitest related --run --maxWorkers=1` over the three changed sources) 91 files, 1601 / 1601, exit 0 (2259 s, run once
after the last source edit, in the background with a done-file).

### Notes of this round (not failing lines)

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s1-1 | **An empty `denylist.json` crosses.** `baselines:check` on a deny-list of no digest (every list empty) passes C1 and C3, the kind's two checks, as before. The content scan reads that file; whether it stops on a list of nothing is M0-k-06's (its C-0247 stops). Not this round's row: the inventory's N-j names baselines and ng-faces. | A C1 line for a deny-list of no digest, if the scan does not already stop on one. | M0-k-06 / M0-k-07, or M4 |
| N-s1-2 | **`loadNgFaces` accepts a file of no face.** The loader (C-0101) returns `[]` for `faces: []`; the crossing now refuses such a file (N-j), so it cannot cross, but a reader of a file placed without crossing judges nothing. Changing the loader is a contract change of an exported API (J263 Q1) and is not this round's. | The face comparisons' items (M0-b-05b, M0-c-07b) stop on an empty face list, or the loader refuses it at M1 with C8 – C10. | M0-b-05b / M0-c-07b, or M1 |

## Hardening round S1 — the closing check's notes (lane `check/M0-k-05-close-s1`, 2026-10-20)

The closing check of round S1 (verdict `checks/M0-k-05-s1.md`, PASS) found no blocker. The rows below are further
hardening tests and one contrived escape. None gives a wrong result on an honest input, and each fails safe. The ids
continue the round's N-s1-1 and N-s1-2.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s1-3 | **Two of the checker's mutants survive on exact code.** (a) X06: the parity entry removes the earlier report only when the arguments hold `--ours`. It survives the item's six test files (104 / 104), because the N-h pin's usage step is `['--ours']`. With no argument at all, an earlier report would then stay beside exit 64. The round's code is exact: a mirror receipt ran a pass (report present, 1 606 bytes), then `corepack pnpm parity` with no argument, which exited 64 with the folder empty. (b) X20: the C1 empty-faces line fires for `faces.length <= 1` instead of `=== 0`. It survives because no test asserts that a file of exactly one face passes; the "a file with faces passes" control has three faces. The round's code is exact: a one-face `ng-faces.json` with its record gives `(ng-faces, 1 rows, …): pass`, C1 pass, exit 0. The baselines twin is pinned (X14, `<= 1`, is killed by the one-row control). CONFIRMED (mirror). | Add a no-argument step (`[]`, exit 64, report gone) to the N-h parity case, and a one-face control to the N-j ng-faces case. | M4 |
| N-s1-4 | **A folder named like the report makes a stop throw.** When `PLAT_BENCH_OUT` holds a *folder* named `parity-report.json`, the entry's `rmSync(…, { force: true })` throws `ERR_FS_EISDIR`. The process then exits 1, the code for "a row failed", where the stop would exit 2. Probe in the mirror: `ours-empty.json` with such a folder gave a stack trace and exit 1. Before the round, a stop exited 2 here, and a pass already threw at `writeFileSync`. The result fails safe: it is never 0 and no report is read. The case is contrived, since only a deliberate writer makes that folder. The same holds for `baselines-check.json`. CONFIRMED (mirror). | Catch the removal's error and stop with exit 2, naming the path ("not a file"), or let the run items' runners give each run a fresh folder (N-h (b)). | M4 |
