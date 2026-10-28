# The S8 profiler as a repo tool — `corepack pnpm bench -- profile` (seat T1; AMENDMENTS-2026-10-28z item 990 (c), J618)

Seat T1 (a tool seat of the managing session `session_019yED1RC11y49BWLSYN3Wpo`), branch `wip/profile-tool-t1` from the
design branch `claude/great-galileo-b4mzbq` at `8d5ffdcd`. R7's driver and analysers (the APPENDIX of
`plat/docs/build/checks/profile-s8-after-q18.md`) carried into the bench as a sub-command. Bench code outside the model
packages: it changes no model output and needs no shift record. This file records the tool; it lands nothing.

## 1 Usage

```
corepack pnpm bench -- profile --seed N [--run fusion|integrated] [--stage S8] [--mode plain|cpu|count] [--cuts]
                               [--window N] [--out DIR] [--tag T] [--interval µs] [--top N] [--frame-ha N --walled-ha N]
                               [--no-cut-count] [--load-max L] [--load-wait S] [--fns a,b] [--joint A>B,C>D] [--exclude F]
```

| flag | default | meaning |
|---|---|---|
| `--seed N` | required | the seed of `derive(run, seed)` (`bench/src/fusion/runs.ts`) |
| `--run` | `fusion` | the fusion harness's run kind: `fusion` (S3's slice, S4, S5, the fusion S8) or `integrated` |
| `--stage` | `S8` | the stage whose `run` is the measured window (any registered stage by `stageText`; the cut logpoints are S8's) |
| `--mode` | `plain` | `plain`: hrtime marks only; `cpu`: the inspector's `Profiler` started right before the stage, stopped right after; `count`: precise coverage with call counts, taken and reset at every stage boundary |
| `--cuts` | off | arms the two kerb-read logpoints (`kerbFace`, `kerbSeed`) beside the cut ones and writes the per-cut log `<tag>.cuts.tsv` (each hit's ms since the stage's start; each cut's ms since the previous cut) |
| `--window N` | 0 (none) | cpu mode: the windows of N cuts (wall ms, ms a cut, the named functions' inclusive ms) and their least-squares lines |
| `--out DIR` | `$PLAT_BENCH_OUT/profile/<tag>` | every file of the run, the bundle among them |
| `--tag T` | `<run>-<seed>-<stage>-<mode>[-cuts]` | the files' stem |
| `--interval µs` | 500 | the profiler's sampling interval (R7's) |
| `--top N` | 20 | the rows of each ranked table (count mode prints 2N by calls) |
| `--frame-ha N --walled-ha N` | CITY | the fixture's test size (both or neither; R7's tooling check was 900 / 30) |
| `--no-cut-count` | off | plain / cpu: arms no logpoint at all (a wall-clock with the debugger never enabled; no cut count) |
| `--load-max L` | 0.3 | the idle-box bar on the one-minute load |
| `--load-wait S` | 300 | the most seconds the tool waits for the bar before running anyway, saying NOT IDLE |
| `--fns a,b` | R7's lists | the named functions of the cpu tables (and windows) or of the counts |
| `--joint A>B,…` | none | cpu: the time of samples with B on the stack below A |
| `--exclude F` | none | cpu: drop every sample with F on its stack (shares stay of the whole window) |

What each mode prints (every figure names its unit and the run it came from — `plain: hrtime marks around the stage, no
profiler`, `profiled: the CPU profiler on, its overhead included`, or `count mode … never a timing`): the bundle's build
line (bytes, errors, `__name` count, whether `PLAT_DEBUG_BUILD` was defined false); the load before, the maximum during
(sampled every 30 s into `<tag>.loadlog`) and after; the model root (`hex(d.model.root)`), lanes and blocks; every
stage's mark in ms; the logpoints armed and their hits; the stage's wall-clock, the cuts (splitFace + connectHole calls:
from the logpoints, or from coverage in count mode) and the ms a cut. `--mode cpu` adds the top-N tables of self time by
function and by file and of inclusive time by function and by file (ms and % of the stage's window), the named
functions' inclusive times, the heaviest call path, the joint times and, with `--window`, the window table and the
growth lines (`<tag>.analysis.json` keeps them). `--mode count` adds the named functions' calls and calls a cut and the
top 2N by calls (`<tag>.counts.json`).

Exit 0 on a completed run, 1 when the bundle or the child fails, 64 on a refused argument.

## 2 Files

| file | carries |
|---|---|
| `plat/bench/src/profile/index.ts` | the CLI: the arguments, the bundle, the idle-box wait, ONE child process, the printed figures; exports the analysers |
| `plat/bench/src/profile/driver.ts` | R7's `driver.mts` as `main(argv)` (no side effect on import): the `plant` hook marks, the profiler, the coverage, the logpoints, the record and its files |
| `plat/bench/src/profile/bundle.ts` | R7's `build-bundle.mjs`: the production bundle of the driver |
| `plat/bench/src/profile/analyse.ts` | R7's `analyse.mjs`: self / inclusive by function and file, the heaviest path, named and joint times, the windows |
| `plat/bench/src/profile/growth.ts` | R7's `growth.mjs`: the windows' split and least-squares lines |
| `plat/bench/src/profile/counts.ts` | R7's `counts.mjs`: the count run's calls, mapped to TypeScript |
| `plat/bench/src/profile/sourcemap.ts` | the inline source-map decoder the analysers use (see §4 (2)) |
| `plat/bench/src/profile/load.ts` | R7 §1.3's run discipline: the one-minute load, the wait, the log |
| `plat/bench/src/profile/types.ts` | the record's, the profile's, the sources' and the coverage's shapes |
| `plat/bench/test/profile/fixtures.ts` | hand-made fixtures: a two-function source with an inline map, a six-sample profile, a record, a coverage |
| `plat/bench/test/profile/analysers.test.ts` | the decoder, the analysis (window clipping, self / inclusive, heaviest, joint, windows, exclude), growth, counts |
| `plat/bench/test/profile/entry.test.ts` | the arguments (defaults, ten refusals, exit 64), the child's vector round trip, the cut figures, the per-cut log |

Two lines outside `plat/bench/src/profile/` and `plat/bench/test/profile/`:

```diff
--- a/plat/scripts/bench.mjs
+++ b/plat/scripts/bench.mjs
@@ -42,6 +42,7 @@ export const HARNESSES = {
   crosshost: { folder: 'crosshost', item: 'M0-d-06' },
   worklimits: { folder: 'worklimits', item: 'M0-f-03b' },
   'ladder-coverage': { folder: 'ladder-coverage', item: 'M0-x-05' },
+  profile: { folder: 'profile', item: 'M0-c-06' },
   scan: { folder: 'scan', item: 'M0-k-06' },
   parity: { folder: 'parity', item: 'M0-k-05' },
   'baselines-check': { folder: 'baselines-check', item: 'M0-k-05' },
--- a/plat/bench/manifest.json
+++ b/plat/bench/manifest.json
- "town": [ … "src/worklimits", "test/worklimits", "test/scaffold"],
+ "town": [ … "src/worklimits", "test/worklimits", "test/scaffold", "src/profile", "test/profile"],
```

The registration is in `plat/scripts/bench.mjs`, not `plat/bench/src/index.ts`: the brief named `index.ts` as the
sub-command dispatch, but that file exports nothing and its own comment sends every harness name through
`scripts/bench.mjs`'s `HARNESSES` map; the one line is there. Its `item` is `M0-c-06` — the amendment's first-named owner
(whose `derive` and `timing.ts` the tool wraps); `tools/scaffold/workspace.test.mjs` requires an M0 item id there, so
`session/profile-tool` was refused by the test. The manifest line classifies the two new folders TOWN (the driver
imports `@plat/layout` and the fusion harness): `tools/lint/bench-boundary.mjs` refuses an unlisted folder. No
`.gitignore` line: the output never lands in `plat/` (§4 (1)).

## 3 Checks

`corepack pnpm build` exit 0; `corepack pnpm lint` exit 0 (eslint 1 257 files, 0 errors, 0 warnings; 9 whole-tree checks
ok, bench-boundary among them); `corepack pnpm vitest run --project bench bench/test/profile` 26 tests passed (2 files);
`tools/scaffold/workspace.test.mjs` green with the registration. `tools/scaffold/m0-work.test.mjs`'s "passes the
committed docs/build/M0-work.json" fails identically with and without this change (four owns overlaps in M0-work.json;
not this tool's).

## 4 Differences from R7's scripts

1. **The output folder.** R7 wrote into its scratch; the brief proposed a git-ignored `plat/bench/.profile/`. The bench's
   output rule (C-0067; `bench/src/timing/output.ts`, `scripts/bench.mjs`) is that output goes to `PLAT_BENCH_OUT`,
   never into `plat/`; the default is `$PLAT_BENCH_OUT/profile/<tag>` (`--out` overrides), so no ignore line is needed.
   The raw artifacts (`.cpuprofile`, `.sources.json` ≈ 8 MB with the bundle's inline map, `.coverage.json`) are written
   whole, not cut to `OUT_CAP_BYTES`: a truncated profile cannot be read back.
2. **No source-map-js.** R7 loaded plat's transitive `source-map-js@1.2.2` by an absolute path into
   `node_modules/.pnpm`; the bench declares no such dependency and the lockfile is frozen. `sourcemap.ts` decodes the
   inline maps itself (base64 VLQ; least-upper-bound then greatest-lower-bound on the generated line, as source-map-js's
   two lookups do).
3. **One CLI over four scripts.** `run1.sh` + `build-bundle.mjs` + `driver.mts` + `analyse.mjs` / `growth.mjs` /
   `counts.mjs` became one sub-command: the tool builds the bundle, waits for the idle box (`load.ts`, R7's ≤ 5 min wait
   and 30 s log; the wait is `--load-wait`, and a run that starts above the bar says NOT IDLE in its output), runs the
   bundle as ONE child process and analyses its files in the parent. The bundle's entry is an esbuild stdin module that
   calls `driver.ts`'s `main`; no absolute path of R7's scratch or worktree is left.
4. **The cut count in plain and cpu mode.** R7's plain runs counted no cuts (its ms a cut divided the plain wall-clock by
   the cpu run's logpoint count). Here plain and cpu runs arm the two cut logpoints (`splitFace` / `connectHole` in
   `tryCandidate`, a condition that pushes an hrtime stamp and returns false) at the stage's start so the run reports its
   own ms a cut; `--cuts` adds the two kerb-read sites (R7's four); `--no-cut-count` arms none. Count mode arms none and
   takes its cuts from coverage.
5. **`--stage`.** R7 hard-wired S8; the driver takes the stage by `stageText(s.id)` from `@plat/kernel` instead of R7's
   copied STAGES list.
6. **Inclusive time by file** is a table R7's analyser did not print (the brief asked for self and inclusive by function
   and by file).
7. **`putBack`** joins the named functions: R7's `growth.mjs` read `putBack` for the savepoint split but `analyse.mjs`'s
   default list did not carry it, so its savepoint column was `opSave` alone unless `--fns` named it.
8. **The growth tail** is left out below W / 2 cuts (R7's literal `cuts >= 50` at W = 100), and a per-read figure of a
   window without kerb reads is 0 rather than a division by zero.
9. **The debug flag** is read in the driver itself (`typeof PLAT_DEBUG_BUILD`, defined false by the bundle) and the
   bundle's text is checked for `__name(` and a left-over `PLAT_DEBUG_BUILD`; R7 checked both by hand.
10. **Typed and deterministic tables**: TypeScript in the bench's style; ties in the ranked tables broken by key.

## 5 What the tool does not do

It builds only the production bundle (R7's tsx-debug runs are not reproduced; `corepack pnpm bench -- fusion` runs
from source). It runs one derivation per invocation: the round's exit bar — three plain runs (the median ms a cut) and one
cpu run (amendment 990 (c)) — is three invocations, and the median is the reader's. It judges nothing and compares no
root against a pinned one: it prints the root for the reader to compare. It does not run S9's batches separately, does not
profile the integrated run's S6, and measures no p95 (the timing phase's harness does). The logpoint sites are found by
pattern in the generated source; a refactor of `bentCutFabric.ts`'s call sites that breaks a pattern shows as a missing
line in "logpoints armed" and "cuts not counted", not as an error.

## 6 Self-verification
