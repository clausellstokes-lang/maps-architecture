# Whole-suite check of flow flow-7 (milestone M0, 2026-11-09 / 10)

Lane `check/whole-suite-flow-7`, 2026-11-09 22:47 – 2026-11-10 00:56. Every build item of flow-7 is landed and every
stage-group integration check (g7 – g18) has passed. Those checks ran each item's own tests and the RELATED tests of the
group's changed sources, never the whole suite (J193). This seat ran the WHOLE suite once at reduced strength (J194,
J291, J699; opened at J728) and classifies every red in it.

**Verdict: PASS.** The run collected all 568 test files of the census (607 file runs with the 39 `kernel-tiny`
re-runs) and ran 8 103 tests: 8 084 passed, 19 failed, none skipped or todo. All 19 reds are declared. Thirteen are the
J176 Mac-reference set in the five bench files of M0-f-01 (class (a)). Six are Q152's bands set of M0-a-09, exactly the
six the row names, with the outcomes its table states (class (b)). There is no timeout, no other red, no flake, no file
that failed to load and no file left uncollected. The four gates pass.

## The seat

* Opus 5.5 in Claude Code in a Claude Code cloud container. `python3 tools/machine_profile.py --id` printed
  `linux:Intel(R) Xeon(R) Processor @ 2.30GHz:4cpu:16gib`; `node --version` printed `v24.12.0`;
  `python3 tools/test_budget.py` printed **1** right before the run (W = 1; the container ran nothing else).
* Independence: this seat wrote and checked no item of flow-7 and no stage-group check; it changed no file of any item,
  fixed nothing and ran no git command. It wrote only this file, its CLEAN-ROOM row and its lane lines.
* Ledger row: **L-0747** (`plat/CLEAN-ROOM.md` §2, the last row).
* Logs, the JSON report and the census are in `/home/user/maps-scratch/waves/whole-suite-flow-7/` (nothing in `plat/`).

## The gates

| gate | exit | evidence |
|---|---|---|
| `corepack pnpm install --frozen-lockfile` | 0 | "Already up to date", pnpm v10.34.6 |
| `corepack pnpm lint` | 0 | "lint: eslint 1277 files, 0 errors, 0 warnings"; "lint: probe-red ok"; the five vendor scans pass |
| `corepack pnpm build` | 0 | every package bundled with LICENSE and THIRD-PARTY-NOTICES.txt |
| `corepack pnpm landed:verify -- flow-7` | 0 | last line: "landed:verify flow-7: ok — 426 records, 1877 changed paths, 1877 attributed" (57 informational "claimed by" notes) |

## The census of what should run

`find packages bench tools \( -name '*.test.ts' -o -name '*.test.mjs' \) -not -path '*/node_modules/*' -not -path
'*/dist/*' -not -path '*/lint/fixtures/*'` found **568** files:

| package | files | vitest project |
|---|---|---|
| packages/kernel | 180 | `kernel` (all 180) and `kernel-tiny` (39 of them: `test/insert/step1-2/`, `test/insert/step3-5/`, `test/tx/`) |
| packages/layout | 116 | `layout` |
| packages/testkit | 117 | `testkit` |
| bench | 82 | `bench` |
| packages/site | 22 | `site` |
| packages/model | 20 | `model` |
| packages/tables | 11 | `tables` |
| tools (landed 1, lint 11, notices 2, scaffold 2, vendor 2, vitest 2) | 20 | `tools` (`**/*.test.mjs`, `**/*.test.ts`, minus `lint/fixtures/**`) |

`vitest.config.ts` declares nine projects. Each package project includes `test/**/*.test.ts`, and every census file under
a package sits in its `test/` folder as a `.test.ts`, so the config should run 568 files once and the 39 `kernel-tiny`
files a second time: 607 file runs.

## The run

From `plat/`, with `PLAT_FUZZ_SEED` unset:

```
PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest run --maxWorkers=1 --reporter=default --reporter=json \
  --outputFile.json=/home/user/maps-scratch/waves/whole-suite-flow-7/whole.json
```

The run printed this seed: "this run's seed is **1541925008**". `PLAT_FUZZ_SEED=1541925008` replays it. The run started
at 22:49:27Z on 2026-11-09 and took 7 335 s ("Duration 7334.99s"). It exited 1 with "Test Files 9 failed | 598 passed
(607)" and "Tests 19 failed | 8084 passed (8103)". The JSON report also gives 0 pending and 0 todo.

| project | file runs | files failed | tests passed | tests failed | skipped / todo |
|---|---|---|---|---|---|
| kernel | 180 | 4 | 2 306 | 6 | 0 |
| kernel-tiny | 39 | 0 | 756 | 0 | 0 |
| model | 20 | 0 | 215 | 0 | 0 |
| tables | 11 | 0 | 271 | 0 | 0 |
| site | 22 | 0 | 214 | 0 | 0 |
| layout | 116 | 0 | 1 232 | 0 | 0 |
| testkit | 117 | 0 | 1 939 | 0 | 0 |
| bench | 82 | 5 | 825 | 13 | 0 |
| tools | 20 | 0 | 326 | 0 | 0 |
| **total** | **607** | **9** | **8 084** | **19** | **0** |

The JSON report has no project field, so the `kernel` / `kernel-tiny` split counts a kernel file's second report as its
`kernel-tiny` run. The same file holds the same tests in both projects, so the split of test counts is exact. None of
the four red kernel files is in `kernel-tiny`'s include list.

## The reds

There are 19 failed tests in 9 files. No file failed to load: every failed file's report message is empty and every
failure is an assertion inside a test. No message names a timeout.

| # | file › test (short) | first line of the assertion | class | re-runs | owner (test file / source) |
|---|---|---|---|---|---|
| 1 | `bench/test/calibrate/calibrate.test.ts` › the four frozen kernels › same checksums on the x64 leg under Rosetta 2 | `Command failed: /usr/bin/arch -x86_64 …` (`/usr/bin/arch: invalid option -- 'x'`) | (a) Rosetta | none (declared) | M0-f-01 |
| 2 | `calibrate.test.ts` › calibrate() › returns the score … with the host record (:149) | `expected 'Intel(R) Xeon(R) Processor @ 2.30GHz' to be 'Apple M1'` | (a) CPU model | none | M0-f-01 |
| 3 | `calibrate.test.ts` › the dispatcher entry run › prints a few capped lines … (:227) | `expected false to be true`: no line starts with `calibrate: host Apple M1, 8…` | (a) CPU model | none | M0-f-01 |
| 4 | `bench/test/host/host.test.ts` › names this machine: Apple M1, 8 cores … arm64 native (:28) | `expected 'Intel(R) Xeon(R) Processor @ 2.30GHz' to be 'Apple M1'` | (a) CPU model | none | M0-f-01 |
| 5 | `host.test.ts` › the same machine with arch x64 and kind rosetta (:52) | `Command failed: /usr/bin/arch -x86_64 …` | (a) Rosetta | none | M0-f-01 |
| 6 | `bench/test/timing/contention.test.ts` › reads every process: launchd … (:368) | `expected 90 to be greater than 100` | (a) process count (and launchd at :369) | none | M0-f-01 |
| 7 | `contention.test.ts` › a synthetic load … contends, named as a process (:391) | expected `process: node (node, pid 1540)`, received `process: MainThread (pid 1540) at ≥ 10 % CPU` | (a) macOS `ps` comm (on Linux, procps's comm is the main thread's name, `MainThread`) | none | M0-f-01 |
| 8 | `contention.test.ts` › a Chromium launched through playwright-core … | `Executable doesn't exist at /opt/pw-browsers/chromium_headless_shell-1223/…` | (a) Playwright's Chromium build | none | M0-f-01 |
| 9 | `bench/test/timing/harness.test.ts` › the worker's planted battery reading contends the result (:273) | `expected [ Array(1) ] to include 'power: battery'` | (a) pmset: `sampler.ts:128` reads power only on `darwin` (`'unknown'` elsewhere; `pmset: null` at :70) | none | M0-f-01 |
| 10 | `harness.test.ts` › timeBatch on this machine › with the real calibrate … (:319) | `expected 'native-x64' to be 'native-arm64'` | (a) arch / CPU | none | M0-f-01 |
| 11 | `harness.test.ts` › the dispatcher entry run › times a probe batch … (:450) | `expected 'Intel(R) Xeon(R) Processor @ 2.30GHz' to be 'Apple M1'` | (a) CPU model | none | M0-f-01 |
| 12 | `bench/test/timing/sampler.test.ts` › every sample holds launchd (pid 1, root's), more than 100 rows … (:41) | `expected 'process_api' to be '/sbin/launchd'` | (a) launchd | none | M0-f-01 |
| 13 | `sampler.test.ts` › each sample's power is the worker's own pmset reading … (:72) | `expected 'unknown' to be 'battery'` | (a) pmset (as row 9) | none | M0-f-01 |
| 14 | `packages/kernel/test/arr/bands/closing.test.ts` › fast-check's shrunk counterexample of seed 20261011 (:134) | `expected [ [ +0, [] ], [ 1, …(1) ], …(2) ] to deeply equal …`: face 1's kerb string diverges after `2884,3963 2782,3965` (received `2580,3971 2543,3938 …`, pinned `2732,3967 2630,3969 …`) | (b) Q152 (B) | none | M0-a-09 / M0-a-09 (`packages/kernel/src/arr/kerb.ts`, `bandUnion.ts`) |
| 15 | `closing.test.ts` › seed 20261011 draw 1109 (:225) | `expected [] to match object [ { kind: 'along', face: +0, …(5) } ]`: `bandClosings` is `[]` | (b) Q152 (A) | none | M0-a-09 |
| 16 | `bands/dryrun.test.ts` › draws 389 and 1109 (:314) | `expected [ 2 ] to deeply equal [ 1, 2 ]`: `wholeBand` [2]; the lines before it (face 1 EMPTY, no block in it) hold | (b) Q152 (A) | none | M0-a-09 |
| 17 | `bands/hardening-s15.test.ts` › network 561 (:65) | `expected 2 to be 3`: `k.kerb.length` 2, pinned 3 | (b) Q152 (B) | none | M0-a-09 |
| 18 | `bands/restage.test.ts` › N1 (:104) | received `2482,0 4000,0 4000,2553 447,69 448,15 2390,92 2425,85 2455,65 2475,35`; pinned `449,0 712,0 2390,92 … 447,72` | (b) Q152 (B) | none | M0-a-09 |
| 19 | `restage.test.ts` › N2 (:134) | face 0's kerb received with way:1's strip-edge vertices kept: `… 3972,71 3972,150 3971,202 … 3947,3330 … 3482,3932 3452,3971 3453,4000 0,4000`; pinned `… 3972,99 3948,3321 …` | (b) Q152 (A) | none | M0-a-09 |

**Class (a), 13 reds.** The tests are the five J176 bench files of M0-f-01: calibrate 3, host 2, timing/contention 3,
timing/harness 3, timing/sampler 2. Each pins the owner's MacBook Air as §12.1's reference machine, and the Mac reason
can be read in each assertion. Some name `Apple M1` or `native-arm64` as the CPU. Some run `/usr/bin/arch -x86_64`
(Rosetta 2). Some expect `/sbin/launchd` at pid 1 or more than 100 processes. Some read power through `pmset`, which
the source gates on `process.platform === 'darwin'`. One expects macOS `ps`'s comm `node` where Linux procps prints
the thread name `MainThread`. One needs Playwright's Chromium build, which is not in this container's cache. None of
them is red for any other reason. Earlier checks named the same set with the same reasons (`checks/M0-k-05.md`:
13 reds in these five files).

**Class (b), 6 reds.** The six bands reds are exactly Q152's six. The row is OPEN (J728): "a DECLARED red set on main
until a-09 S18 lands". All six are in project `kernel`. The bands folder is outside `kernel-tiny`'s include list, so
no `kernel-tiny` run touched them. The outcomes match the table at `checks/M0-a-05-notes.md` :848 – :864:
* (A) Draw 1109: `bandClosings` [].
* (A) Draws 389 and 1109: `wholeBand` [2], with face 1 EMPTY and no block in it.
* (A) N2: the kerb keeps way:1's strip-edge vertices (3 972, 150) … (3 947, 3 330) and (3 482, 3 932). The test stops
  at the kerb assertion, so `saves` and `faithful` were not reached.
* (B) Network 561: `k.kerb.length` 2.
* (B) The shrunk counterexample: face 1's kerb differs past (2 935, 3 961).
* (B) N1: face 2's kerb is the table's string to the vertex.

No seventh bands red occurred, and the other 11 bands files and the testkit `arr-bands` files are green.

**Classes (c) and (d): none.** No red names a timeout, and every red is in class (a) or (b), so no file needed a re-run.

## What did not run

* Uncollected files: none. The 568 census files and the 568 distinct files in the JSON report are the same set (0
  missing, 0 extra). The 39 files reported twice are exactly `kernel-tiny`'s include list.
* Skipped and todo tests: none. The report gives `numPendingTests` 0 and `numTodoTests` 0, and no test has a status
  other than passed or failed. A static grep of the 568 files finds no `.skip`, `.todo`, `skipIf` or `runIf`.

## Notes

* N-1: The J176 Mac-reference set is red as declared: 13 tests in M0-f-01's five bench files, class (a), listed above.
* N-2: Q152's six bands reds of M0-a-09 are red as declared (OPEN, J728), with exactly the stated outcomes, in project
  `kernel` only.
* N-3: Some lines in the log read like failures but come from passing tests. They are lines like `bentcut: bars FAIL …`,
  `site: FAIL — countLaw fail, …`, `FAIL cross-host: 1 run(s) differ` and `fusion: bars FAIL …`. They are output of
  bench tests that plant a failing case and assert that it is reported. No test containing them failed.
* N-4: Q144 (the facade's mixer census) and J622 (the scaffold test) were the reds this seat exists to find. Both are
  green on this tree. Every `testkit`, `tools` and `layout` file passed.
* N-5: The durations are informative only. The run was at W = 1 on a 4-CPU container, and no timing was judged.

## The verdict

**PASS.** There is no finding. All 19 reds are declared: 13 by J176 (class (a)) and 6 by Q152, which is OPEN
(class (b)). There are no load artefacts, no flakes, no uncollected files and no skips. All four gates exited 0.

## Clean room

This seat read only these files in `plat/`: `vitest.config.ts`; the census's file list; the failing tests' lines
(`bench/test/timing/{contention,harness,sampler}.test.ts`, the reported lines of the others); `bench/src/timing/sampler.ts`
(its darwin gate, by grep); `docs/build/M0-work.json` (`owns`); `docs/build/checks/M0-a-05-notes.md` :846 – :866;
`docs/build/checks/` by grep for J176 (`M0-k-05.md`'s line, among others); `docs/build/checks/integration-g15.md`
(head, for the format); `docs/build/landed/check-integration-g15.json` (format); `CLEAN-ROOM.md` §2 (ids, the last
rows). Outside `plat/` it read `docs/M0-FIX-QUEUE.md` (row Q152, plus a grep for the bench file names, with no hit
beyond an unrelated Q84) and `docs/lane-events.log` (the tail, for the format). It opened, listed and searched no
research, capture, reference or review path, and it ran no git command.
