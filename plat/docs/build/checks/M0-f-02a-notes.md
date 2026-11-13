# M0-f-02a — the check's minor notes (for the hardening milestone M4; none of them fails the item)

These notes come from the independent check of M0-f-02a (lane `check/M0-f-02a`, 2026-10-06). The verdict and its
blocker are in `checks/M0-f-02a.md`. The rows below are minor under J180 / N-45: each fails safely, lies off the item's
stated promises, or is held by a receipt where C-0105 puts it. Each row names its handling.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-1 | **The CLI's arguments and exit codes are held by receipts only.** Mutants C01 (`run()` always returns 0), C02 (`--fallback` ignored) and C03 (`--mode` ignored) survive the vitest set, because `run()` always reads the real manifest and C-0105 forbids a vitest tier run. The checker's CLI probe (mirror, `manifest()` swapped for a one-job probe manifest, then restored to sha256 `6046ed85…`) CONFIRMED the code paths: `--fallback` exit 0 with `fallback.changed` 10 000 → 5 000; a failing unit (exit 3) exits 1 with verdict `fail`; `--mode batched --fallback` records one batch with two calibrate scores; `--mode whole` records the calibration pair. The exit-1 path for a **gating** over-budget verdict needs an authoritative measured run and is PLAUSIBLE (read). | Let `run()` take an injected manifest (or root) so a fixture test can hold `--fallback`, `--mode` and the exit codes without a real tier. | M4 |
| N-2 | **A job whose `units()` throws rejects the whole `runTier`** (`runner.ts` l. 203, not inside a try): for example `tsconfig.json` unreadable in `tsProjects`, or the `@plat/testkit` import failing in `fuzzUnits`. The run then crashes with exit 1 and a stack. That is loud, never a silent pass, but it ends the other jobs' run too. A declared entry whose `stagedTo` is deleted without its `units` filled would do the same (the declared `units` throws on purpose). | Catch the throw into the job's `failBefore`, as the load error of C-0241 (3) is. | M4 |
| N-3 | **Normalisation wording.** The brief says "normalisation 1 once M0-t-01's reference score exists" (C-0027). The runner divides by the measured ratio (mean calibrate score ÷ reference score), as §12.1 writes it and as M0-f-01's `timeBatch` stamps it. On the reference machine the two agree to within the 5 % drift. The code follows the design, so this is wording only. | Say in C-0241 that "normalised by 1" is read as the measured ratio, ≈ 1 on the reference machine. | M4 |
| N-4 | **C-0241 (8) says "no tier job writes into plat/".** The type-check units (`tsc -p <project> --composite false --incremental false`, `emitDeclarationOnly` from `tsconfig.base.json`) emit declarations into `packages/*/dist/types/` and `bench/dist/types/`. These are gitignored build outputs, as `corepack pnpm build` writes, but no `.tsbuildinfo` is written beside them. The checker's fresh-tree probe (every `dist/` removed in the mirror) showed the units build in reference order, each passing on its own, `packages/layout/test` excepted (another seat's in-flight files). | Reword (8) to "writes nothing tracked into plat/; the type check emits the gitignored declarations". | M4 |
| N-5 | **The B-FUZZ partition repeats per-process work in every unit.** Each `--primitive P` unit also loads the oracles, runs the deferred constructive cases at 1 draw, the kernel ladders' coverage (8 draws a row plus the 1 000 holed polygons) and the S11 workload. The batched sum therefore counts that work 24 times (once per primitive unit), where the whole run counts it once. In the checker's receipt the `snap` unit took 11.5 s while its fuzz took 2.0 s, so about 9.5 s a unit is that repeated work (CONTENDED, informative). The error is conservative: the gating sum can only be overstated, never understated. | M0-k-04 offers `--no-ladders` / `--no-s11` for partition units (or the runner subtracts a measured per-process floor), recorded by a choices row. | M4 |
| N-6 | **No real PR job declares `suites`**, so §13.8's empty-suite edge is exercised by the runner only over fixtures. For the M0 jobs the edge is held inside the jobs (fuzz-bar's `judged > 0`, vitest's `passWithNoTests: false`). | M0-f-02b declares the spikes' seed families as `suites` when it fills them. | M4 |
| N-7 | The batched-mode test title "the idle wait precedes every batch (30 s by default; the fixture passes 0)" claims what the test does not check. It checks only the 60 s cap. The fix for blocker B-1 covers this. Without that fix, the title should be reworded. | Covered by B-1's fix. | — |
| N-8 | **The batched idle default on the measured path is held by a probe, not a test** (closing check `check/M0-f-02a-close-r1`). The fix round's fake-timer test injects a stub sampler and calibrate, so it runs with `readings: 'built'`. Mutant R19e (`idleMs: opts.idleMs ?? (readingsBuilt ? undefined : 0)`) skips the idle only when no reading is injected, and it survives the near set (61/61). Every other idle and period mutant is killed (R19, R19b, R19c, R19d, R19f, R20, R20b, R20c). The landed code idles on the measured path. The closing checker's probe, a real `licence check` batched with no option, took 3 attempts in 92.7 s (CONTENDED, never gating). Only a writer who branches on the test seam on purpose reaches this. | M0-t-00's receipt records the batched run's elapsed time against 30 s × attempts, or `RunTierOptions` gains a `sleep` seam that leaves `readings` measured, so a test can hold the idle on that path. | M4 |

## Hardening round S1 (lane `build/M0-f-02a-fix-s1`, 2026-10-21; J237 (2), J186, J192, J264, J290 / N-58; merged round M3, second part)

The session's hardening round on the rows the inventory (`checks/hardening-inventory.md`, J355) and its re-triage of
2026-10-19 (J423, plan entry 49, batch B11) give this item: M0-f-02a:9 N-1, :10 N-2, :11 N-3, :12 N-4, the tier argv half
of N-5 (reported to this item by M0-k-04's round S1, C-0387), and :16 N-8, which the re-triage DEFERRED to M4. Each
source note above was read whole and its fix shape taken as written, except where N-5's file proved to be another item's
(below). Choices row C-0411. Inside the owns only: `bench/src/tiers/index.ts`, `bench/src/tiers/runner.ts`,
`bench/src/tiers/types.ts` (comment only), `bench/test/tiers/exec.test.ts` and `bench/test/tiers/runner.test.ts`. No
export of the folder index was added, removed or renamed. `run()` keeps its name and its first argument; its `ctx` gains
optional fields only, and the dispatcher still passes `{ out }`. No existing test title or message text changed. Five
tests were added: 61 before, 66 after.

**The ownership finding (N-5, and N-4's comment).** The brief calls `bench/src/tier-jobs/index.ts` this item's file, and
the item's landed record of 2026-10-09 listed it. But `M0-work.json` gives `plat/bench/src/tier-jobs/` to M0-f-02b
("handed over from M0-f-02a", wave 18). Under C-0318 a handed-over path is its latest owner's when the label names no
wave (`flow-7`). `corepack pnpm landed -- M0-f-02a --lane build/M0-f-02a-fix-s1 --wave flow-7` therefore refused the
edited file: "plat/bench/src/tier-jobs/index.ts: outside M0-f-02a's owns and the permitted appends (owned by M0-f-02b at
flow-7)". By the round's rule (1), a row that needs another item's file is REPORTED, not built. The file and
`manifest.test.ts`, which held its argv, are restored byte for byte to their landed state (sha256 `6046ed85…` and
`81656b2d…`). The re-landed record no longer lists `tier-jobs/index.ts`, because the tool resolves it to M0-f-02b, which
has not landed. This is CONFIRMED: `corepack pnpm landed:verify -- flow-7` now prints "landed:verify FAIL
plat/bench/src/tier-jobs/index.ts: created since flow-7, claimed by no landed record of the wave". The file's bytes are
the item's own landed bytes (`6046ed85…`); only the claim moved. That needs the session's ruling: a choices row handing
`tier-jobs/` back to M0-f-02a until M0-f-02b builds, or the session's attribution at the close. The same run shows one
other unattributed path, `packages/tables/data/workLimits.json`, which is not this item's. The fix itself is built and tested in the lane's mirror (below), ready for the file's owner or for a session
ruling that hands the file back.

| row | outcome | what changed | pin and its mutant (scratch mirror, `vitest run --maxWorkers=1 --bail=1 bench/test/tiers`) |
|---|---|---|---|
| N-1 | **FIXED and PINNED** | `run(args, ctx)` takes optional seams: `root` (the tree, default plat/), `manifest` (default the tier's real list), `options` (the runner's executor, probe and timing readings; never `root`, `out`, `mode`, `fallback` or `log`, which the entry sets) and `runTier` (default this folder's runner). `--list` derives over the injected root. Four tests in `exec.test.ts`, under 'the command entry over a FIXTURE manifest (N-1; C-0105: never a real tier)', drive the entry in-process over a fixture tree and manifest with a planted executor. Nothing is spawned and no real tier runs. They hold exit 0 on a pass and 1 on a failing unit (the report written, verdict `fail`); `--list` over the injected tree, running nothing; `--fallback` (fuzz 10 000 → 5 000, the constructive size kept, the printed fallback line); `--mode` (plain by default with no calibrate call; whole with one run and two scores; batched with one batch per unit and two scores each); and the budget exit. A built-readings run over budget exits 0 because it never gates (C-0047). The same verdict made gating, through an injected `runTier` that sets `budget.gating`, exits 1. A gating pass exits 0. This closes the note's PLAUSIBLE gating exit-1 path with a test. | The note reproduced on the before sources and before tests (61 / 61): A-C01 (`return 0`), A-C02 (`--fallback` ignored), A-C03 (`mode: 'plain'` passed) and A-C04 (`&& report.budget.gating` dropped) all SURVIVE. On the new tests, all are KILLED: C01, C02, C03, C04, C05 (the over-budget clause dropped), C06 (`--list` derives over PLAT_ROOT), C07 (`options` not passed), C08 (the injected manifest ignored), C09 (the `fail` clause dropped) and C10 (`--mode` always whole). |
| N-2 | **FIXED and PINNED** | `runTier` awaits `job.units(size)` inside a `try`. A throw or a rejection becomes the job's `failBefore`, so the job fails with the reason `the job's units failed: <message>` (verbatim, pinned). The other jobs still run and `runTier` resolves. This is the fail-safe C-0241 (3) gives a harness that fails to load. A declared entry unstaged before its units are filled now fails naming the declared-units message, and no longer rejects the run. | 'a job whose units() throws or rejects fails naming the error, …' (`runner.test.ts`). It is RED on the before `runner.ts`: the run rejects. R01 (`throw e` in the catch), R02 (`failBefore = null`), R03 (the message dropped) and R04 (`units()` not awaited) are each KILLED. |
| N-3 | **FIXED** (wording; the text is the deliverable) | C-0411 (3) records that C-0027's "normalisation 1 once M0-t-01's reference score exists" is read as the measured ratio, §12.1's runner score ÷ reference score. For a whole run that is its mean calibrate score ÷ the reference score. For the batched mode it is the summed figure ÷ the sum of the batches, each batch normalised by its own two scores. The ratio is ≈ 1 on the reference machine, within the 5 % drift, and null without a reference score. The `TierReport.normalisation` doc comment in `types.ts` says the same. The code is unchanged. | none (wording) |
| N-4 | **FIXED** (wording; the text is the deliverable) | C-0411 (4) rewords C-0241 (8) to "no tier job writes anything tracked into plat/ (`--no-summary`)". The type-check units emit the gitignored declarations under `packages/*/dist/types/` and `bench/dist/types/`, as `corepack pnpm build` does, and no `.tsbuildinfo`. The type-check job's comment lives in `tier-jobs/index.ts`, M0-f-02b's file under C-0318. It was not edited: the choices row is the text. | none (wording) |
| N-5 (tier argv half) | **REPORTED** (the file is M0-f-02b's under C-0318; see the ownership finding) | The fix needed: in `bench/src/tier-jobs/index.ts`, `fuzzUnits` appends `'--no-ladders', '--no-s11'` to each of the 24 `--primitive` units' argv, after `'--no-summary'`. These are M0-k-04's flags (C-0387). The `constructive set` unit is a whole run, and fuzz-bar refuses the flags there (exit 64). It keeps the kernel ladders' coverage and the S11 workload, so the job's units together still run that work, once. The pin: in `bench/test/tiers/manifest.test.ts`, the exact argv of "B-FUZZ: one unit per kernel primitive …" gains the two flags. A new test, "B-FUZZ's partition units leave the per-process work to the whole-set unit: every --primitive unit passes --no-ladders and --no-s11, the constructive set neither (N-5; M0-k-04's flags)", checks every `--primitive` unit carries both, at 10⁴ and under the fallback, and the whole-set unit carries neither. | Built and run in the mirror only, before the restore. The two tests are RED on the landed job list (2 failed of 67). F01 (`--no-ladders` dropped), F02 (`--no-s11` dropped), F03 (the flags on the whole-set unit too) and F04 (both dropped) are each KILLED by the near set, and each also by the new test alone (`-t "partition units"`). |
| N-8 | **DEFERRED** (M4, by the re-triage of 2026-10-19, J423) | Nothing built, as the brief says. The batched idle default on the measured path is still held by the closing check's probe, not by a test. | none |

**N-5's re-measure, with the reported argv (informative, CONTENDED, never a gate).** The B-FUZZ job alone ran through
the new entry seam (`ctx.manifest`) in `--mode batched` with the real readings: 30 s idle, calibrate before and after,
the detector, no reference score (so unjudged and contended). It ran from the lane's mirror, which held the reported
argv. A first run measured 23 units and was stopped by its own 3 600 s timeout after `buffer`. A second run measured
`tileRings` and the `constructive set`. Each batch is independent (its own idle and its own scores), so the two runs
sum. The batched sum over the 25 units is **2 841.0 s wall and 3 004.5 s CPU**. The `insertChain` and `hexLattice`
batches were each re-run once on a drift; the figure kept is the last attempt's. Six partition units exceed 60 s and are
flagged `long-batch`: insertChain 77.0 s, corridorUnion 577.1 s, offsetFace 601.4 s, kerb 479.1 s, hexLattice 63.1 s,
buffer 344.4 s. The whole-set `constructive set` unit is also flagged `long-batch` at 300.0 s; it carries the ladders and
S11 once. The small primitives take 3.0 – 5.5 s a unit with the flags. For example `snap` took 3.0 s, against 11.5 s in
the first check's receipt and M0-k-04's 10.6 s → 2.7 s. So the flags would take out a per-process floor of roughly 8 s
a unit, about 190 s over the 24 primitive units. A note for the session, not this item's gate: this machine is not
§12.1's reference machine. Even so, the B-FUZZ job alone sums to about 47 min here at 10⁴, against the PR tier's 15 min
budget. M0-t-01's timing phase on the reference machine judges that, and §13.8's fallback (5 × 10³) and C-0097's
"partition finer" rule answer a miss.

**Refusal census (J264, N-58).** The item's registered families are the three real manifests and the test folder's
fixture manifests; the item registers no fuzz family, edge state or seed sweep. A probe ran each real manifest through
`runTier` with a no-op executor, so nothing was spawned. It ran on the before sources (in the mirror) and on the final
tree. Before and after are identical. PR: 0 manifest problems; 7 built jobs run, 52 units; 0 jobs failed before a unit;
1 pending (`after-M-1: denylist.json`); 2 not built (the spike stand-ins, M0-f-02b). Nightly and milestone: 0 problems,
0 run, 1 pending (`baselines.json`), 9 not built. So lawful-input refusals are 0 before and 0 after. N-2 turns a crash of
the whole run into a typed job failure, not a refusal of lawful input. A job whose own unit list cannot be built (an
unreadable `tsconfig.json`, a failed import) is a broken environment of our own. It now fails visibly, naming the error,
and the other jobs still run. The CLI's exit 64 on a bad argument and the malformed-manifest throw are UNLAWFUL input.
They stay at REFUSE, typed and unchanged; the usage line and the problem list they print are the user's alternative.

Gates (W = 1, after the last source edit, the restore): install --frozen-lockfile 0; build 0; lint 0 (eslint 1 158
files, 0 errors, probe-red ok, 9 whole-tree checks); NEAR `bench/test/tiers` plus `tools/scaffold/workspace.test.mjs`, 6
files 105 / 105 (the item's folder 5 files 66 / 66); RELATED@1000 over `bench/src/tiers/{index,runner,types}.ts`, exit 0,
5 files 66 / 66. An earlier RELATED@1000, run before the restore over the same files plus `tier-jobs/index.ts`, gave 6
files 75 / 75 (with `bench/test/scan/scan.test.ts`), and a second listing run with the verbose reporter gave the same.

## Closing check S1 (lane `check/M0-f-02a-close-s1`, 2026-10-21; verdict PASS in `checks/M0-f-02a-s1.md`)

The closing checker's new findings. None is a blocker. Its 24 targeted mutants (K01 – K12, K14 – K16, KBEFORE, K21 – K28) ran in its own mirror over `bench/test/tiers` at W = 1, and 22 were killed.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-9 | **`--list` ignores the injected probe and nobody notices.** Mutant K15 has the `--list` branch of `run()` call `deriveStatus(j, root)`, dropping `ctx.options?.probe`. It SURVIVES the near set (66 / 66), because the N-1 `--list` test lists only `command` jobs, which never consult the harness probe. The real command passes `{ out }` only, so its listing does not change. This is a fidelity gap in the test seam, not a wrong result. | Add a `harness` job with a stub probe returning `false` to the fixture `--list` test. Its line should read the load-failure status. | M4 |
| N-10 | **A non-Error throw from `units()` is held by no test.** Mutant K27 reads `(e as Error).message` in the N-2 catch. It SURVIVES, because every pinned case throws or rejects with an `Error`. Such a job still fails, so the result is safe, but its reason would read "the job's units failed: undefined" rather than naming the value. | Add `units: () => Promise.reject('plain string')` to the N-2 test, with its reason pinned verbatim. | M4 |
| N-11 | **Session attribution: the whole-wave `landed:verify -- flow-7` exits 1 after this round's re-landing.** The output reads "landed:verify FAIL plat/bench/src/tier-jobs/index.ts: created since flow-7, claimed by no landed record of the wave". The file's bytes are its committed bytes (git index blob `49c90d0c…`, sha256 `6046ed85…`). Under C-0318 the claim moved to M0-f-02b (`ownersAt(…, Infinity)` returns `["M0-f-02b"]`), which has not landed. The same run also FAILs `plat/packages/tables/data/workLimits.json`, which is not this item's. N-5's tier argv half is still open with the same owner (C-0411 (5)). | The session rules before the flow's close. Either a choices row hands `tier-jobs/` back to M0-f-02a until M0-f-02b builds, or the session attributes the file at the close. The N-5 argv fix and its pin go to whichever item then owns the file. | session (flow-7 close) |

## Hardening round S2 (lane `build/M0-f-02a-fix-s2`, 2026-11-10; J237 (2), J186, J192, J238, J264, J290 / N-58, J263 Q1 / Q6, J443 / J749: leg 1 of the merged round M0-f-02a S2 → M0-f-02b S1)

The session's hardening round S2 on the one row the second re-triage found still open for this item: queue row **Q151**
(`docs/M0-FIX-QUEUE.md`, opened by the stage-group-18 integration check's N-1, `checks/integration-g18.md`, J719). Both
sources were read whole. The fix shape and the pin are taken as the row states them: detect and refuse `--fallback`
outside `tier:pr` (C-0241 (11)), exit 64, one pin per tier. The source and the code agree with that reading: §13.8 states
the pre-decided fallback for the PR tier only ("if the PR tier exceeds 15 min, … and the nightly tier absorbs the
difference"), and before this round `bench/src/tiers/index.ts` took the switch on every tier, so `tier:nightly --
--fallback` would have cut B-FUZZ from 10⁶ to 5 × 10³ and the spike sets to 25 seeds. Choices row C-0476. Inside the
owns only: `bench/src/tiers/index.ts` and `bench/test/tiers/exec.test.ts`. NO-SHIFT: no model output, digest, golden,
summary or manifest moves; `tier:pr` is unchanged.

| row | outcome | what changed | pin and its mutant (scratch mirror, `vitest run --maxWorkers=1 --bail=1 bench/test/tiers`) |
|---|---|---|---|
| Q151 | **FIXED and PINNED** | `run()` (the tiers entry) parses its arguments as before, then, when `--fallback` was given and the tier is not `pr`, prints one line and returns **64** before the manifest is read, the statuses are derived or any job runs (no TierReport is written). The line, pinned verbatim (J263 Q6): ``tiers: --fallback is the PR tier's (§13.8's pre-decided fallback; the nightly tier absorbs the difference) — tier:<tier> runs at its own sizes; run it without --fallback``. The flag is refused in any position and beside `--list` or `--mode`. `tier:pr` keeps the switch exactly as before. The header comment states the rule; the `USAGE` line and every other message are unchanged. | Three tests in `exec.test.ts` ('the command entry over a FIXTURE manifest'), one per tier: `Q151: tier:nightly refuses …` and `Q151: tier:milestone refuses …` (an `it.each`; five argv shapes each: exit 64, the line verbatim and alone, the injected manifest never read, the injected runner never called, no report; then the same tier without the flag runs at its own size, 10 000) and `Q151: tier:pr keeps --fallback …` (three argv shapes: exit 0, fuzz 10 000 → 5 000 recorded, no refusal line; `--list --fallback` lists). Mutants, each killed: **MB** the before-image `index.ts` (sha256 `583cadd6…`) — red on both refusal pins (2 failed, run with `-t Q151`); **M1** refuse only `nightly` — red on the milestone pin; **M2** refuse only `milestone` — red on the nightly pin; **M3** refuse every tier — red on the pr pin (and on the existing `--fallback reaches the runner` test); **M4** exit 1 for 64; **M5** the message's middle clause dropped; **M6** the refusal after the manifest read; **M7** not refused beside `--list`; **M8** the line printed but the run continues; **M9** refused only when `--fallback` comes first — each red on the nightly pin. Clean mirror 5 files 69 / 69; every mutated file restored from the tree and confirmed with `cmp -s`. |

**What this round does not change, and why.** `runTier` (`runner.ts`) still applies `fallback: true` to whatever
manifest it is given. It is an exported API (J263 Q1), and its two in-tree callers besides the entry, M0-f-02b's
`tier-jobs/cli.ts` receipt and M0-t-00's `timing-phase/tiers.ts`, never pass `fallback` (read in the tree). A refusal
there would be a throw on an exported function, a contract change the round may not make; the row names the entry, and
the entry is the only door a user reaches the switch through. This is an observation, not an open row: the fail-safe
the integration check noted (the switch printed and recorded in `fallback.changed`) still holds for a direct caller.

**Refusal census (J264, N-58).** The item's registered families are the three real manifests, the test folder's fixture
manifests and, for this row, the entry's argument family. A probe (session scratchpad `f02a-s2/census.mts`, run through
tsx on the before-image in the lane mirror and on the final tree) drove `run()` over each tier × eight argv shapes
(none, `--fallback`, `--list`, `--fallback --list`, `--list --fallback`, `--mode whole`, `--fallback --mode batched`,
`--mode plain --fallback`) with a stub manifest and runner, nothing spawned, and ran each real manifest through `runTier`
with a no-op executor. Real manifests, before = after: PR 0 problems, 9 jobs run, 62 units, 0 failed before a unit, 1
pending (`after-M-1: denylist.json`), 0 not built; nightly 0 / 8 / 169 / 0, 1 pending (`after-M-1: baselines.json`), 1
not built; milestone 0 / 9 / 170 / 0, 1 pending (`baselines.json`), 0 not built. Entry family: `pr` 8 accepted, 0
refused before and after; `nightly` and `milestone` 8 accepted, 0 refused before → 3 accepted, 5 refused (64) after,
exactly the five shapes carrying `--fallback`. Lawful-input refusals: **0 before, 0 after**. The five new refusals are
of UNLAWFUL input: §13.8 gives the fallback to the PR tier alone, so `--fallback` on a projected tier asks for a
reduction the design does not define. Verdict REFUSE (typed: exit 64 with its line), not REPAIR: ignoring the flag
would guess the caller's intent. The alternative is named in the line itself (run the tier without `--fallback`; the
PR tier's own `tier:pr -- --fallback` is unchanged), and the nightly absorbs the PR tier's difference as §13.8 says.

Gates (W = 1, after the last source edit): install --frozen-lockfile 0; lint 0 (eslint 1 291 files, 0 errors,
probe-red ok, 9 whole-tree checks); build 0; NEAR `bench/test/tiers` plus `tools/scaffold/workspace.test.mjs`, 6 files
108 / 108 (the item's folder 5 files 69 / 69; S1 had 66, +3); RELATED@1000 over `bench/src/tiers/index.ts`, exit 0, 4
files 48 / 48 (`bench/test/tiers/{exec,manifest}.test.ts`, `bench/test/tier-jobs/{lists,units}.test.ts`). The lane
mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-f-02a-fix-s2` was a real copy (no link into the project; the
`@plat` dependencies resolved inside it) and is deleted.

## Closing check S2 (lane `check/M0-f-02a-close-s2`, 2026-11-10; verdict PASS in `checks/M0-f-02a-s2.md`)

Q151 confirmed FIXED and PINNED (K00 – K12, K14 – K16 killed; the real CLI exits 64 on `tier:nightly` and
`tier:milestone` with the line verbatim). None of the notes below fails the item.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-12 | **Equivalent survivor K13.** Refusing `--fallback` at its token inside the argument loop, rather than after the loop, survives NEAR (69 / 69) and RELATED@1000 (48 / 48). The two forms differ only on an argv that is unlawful twice (`tier:nightly -- --fallback --bogus`): both exit 64, the landed form prints the bad-argument line, the mutant the fallback line. Which line comes first is no promise of Q151. | None (equivalent for the row; no test needed). | — |
| N-13 | **`runTier` still applies `fallback: true` to a nightly or milestone manifest given to it directly.** The entry is the only user-facing door and refuses it; the round left the exported runner unchanged on purpose (C-0476: a throw would change its contract, J263 Q1). No in-tree caller passes `fallback` (grep of `bench/src` and `tools`/`scripts` for `--fallback` and of `bench/src` for `fallback`), and a direct caller still gets the reduction printed and recorded in `fallback.changed`, so it fails safe. Only a deliberate writer reaches it. | At M4, have `runTier` record a typed problem (or `fallback.applied: false` with a reason) when `fallback` is set on a manifest whose `tier` is not `pr`, with a pin, under a choices row that states the contract change. | M4 |
| N-14 | **The `USAGE` line still offers `[--fallback]` on every tier.** `tiers: bad argument …; usage: corepack pnpm tier:pr \| tier:nightly \| tier:milestone [-- --mode plain\|whole\|batched] [--fallback] [--list]` is printed on `tier:nightly` too, though the flag is now refused there. The refusal line itself names the rule, so nobody is misled into a wrong run. The round kept every existing message unchanged (J263 Q6). | Reword `USAGE` to mark the flag `tier:pr` only (e.g. `[--fallback (tier:pr only)]`), the line re-pinned verbatim. | M4 |

## Hardening round S3 (lane `build/M0-f-02a-fix-s3`, 2026-11-12; J237 (2), J186, J192, J238, J264, J290 / N-58, J263 Q1 / Q6, J443: leg 1 of the merged round M0-f-02a S3 → M0-f-02b S2; the session's record J787)

Two rows, each read whole by its own grep: **Q198**'s first test (`docs/M0-FIX-QUEUE.md`; J787 (4): the gate of the
seventy-eighth landing met it at load 5 – 7 on four cores) and **Q175 (d)** (leg 1 of M0-f-02b S1's observation, this
item's S2 closing note N-13), with Q151 read beside it. Choices row C-0504. Inside the owns only:
`bench/src/tiers/runner.ts`, `bench/test/tiers/exec.test.ts`, `bench/test/tiers/runner.test.ts`. NO-SHIFT: no tier's
manifest, summary or receipt moves; no export of `bench/src/tiers/index.ts` added, removed or renamed; the command
line's own refusal and its text unchanged.

| row | outcome | what changed | pin and its mutant (lane mirror, `vitest run --maxWorkers=1 --bail=1 bench/test/tiers`) |
|---|---|---|---|
| Q198 (first test) | **FIXED and PINNED (tests only)** | `exec.test.ts` 'spawnExecutor > measures a busy child's CPU time and wall-clock, passes its exit code, and reports its pid' (title kept): the planted child no longer spins on the WALL clock; it spins until ITS OWN CPU time (`process.cpuUsage()`, user + system) reaches `BUSY_CPU_MS` = 250, then idles `IDLE_MS` = 400 of wall-clock (`setTimeout`) and prints the CPU time it has used. The test asserts: exit 0, the output line, the child's own reading ≥ 250, the executor's `cpuMs` ≥ the child's reading − `TIMES_TOLERANCE_MS` = 30 (the `times` builtin reports user and system each in 10 ms clock ticks: the figures seen were all multiples of 10), `wallMs` ≥ 400, and `cpuMs` ≤ `wallMs` − 200 (the idle stretch); the pid and the exit-3 assertions stay. Load stretches the wall-clock and never shrinks the CPU a child that burns to a CPU target uses, so both readings are facts of the child. No source change: `spawnExecutor` reports what the child used (the mutants below show both wrong readings red). | **M1** `cpuMs: wallMs` (the wall-clock reported as CPU time) red; **M2** `cpuMs: 0` red. LOAD (the command: `vitest run --maxWorkers=1 bench/test/tiers/exec.test.ts -t "measures a busy child"` 20 times, beside `( while :; do :; done ) &` × N): NEW alone 20 / 20 (load 1.1); NEW beside six busy loops 20 / 20 (load 5.7); NEW beside twelve busy loops 20 / 20 (load 13.3). The OLD form (a scratch copy of the before-test, mirror only): beside six loops 20 / 20 (load 6.8 — six loops alone leave the child about 4/7 of a core, still ≥ 150 ms in 300 ms), beside twelve loops **2 / 20** ('expected 100 … 140 to be greater than or equal to 150', the queue row's own failure). |
| Q175 (d) | **FIXED and PINNED** | `runTier` (`runner.ts`) throws, right after the malformed-manifest check and before a status is derived, a unit runs or a log is written, when `fallback: true` is passed with a manifest whose `tier` is not `pr`. The message, pinned verbatim (J263 Q6): ``tier <tier>: the fallback switch is the PR tier's (§13.8's pre-decided fallback; the nightly tier absorbs the difference) — tier:<tier> runs at its own sizes; run it without the fallback``. A refusal of `runTier` is a thrown `Error` as the malformed manifest's already is (the function's one refusal form, "a malformed manifest throws"), so no type or export is added (J263 Q1). `RunTierOptions.fallback`'s doc and `runTier`'s doc line say so. No lawful caller needs the switch elsewhere: the entry refuses `--fallback` outside `tier:pr` first (exit 64, its line unchanged, so the CLI never reaches the new throw), M0-f-02b's `tier-jobs/cli.ts` receipt and M0-t-00's `timing-phase/tiers.ts` never pass `fallback` (read in the tree; `timing-phase/tiers.ts` spreads `c.options`, which no caller or test sets `fallback` in). | `runner.test.ts` 'the fallback switch …': `Q175 (d): runTier refuses the fallback switch on a tier:nightly manifest …` and `… tier:milestone manifest …` (an `it.each`; a manifest with a HARNESS job listed first and four sized jobs; in plain, whole and batched mode: an `Error`, the message verbatim, no executor call, no probe call, the out folder empty; then the same manifest with `fallback: false` and with it omitted runs at its own sizes, fuzz 10 000 and seeds 50, the probe called once) and `Q175 (d): tier:pr keeps the switch in every mode …`; the earlier fallback tests unchanged. Mutants, each red: **M3** the guard removed; **M4** refuse only `nightly` (milestone pin); **M6** refuse every tier (the pr pins); **M7** the message's last clause dropped; **M8** the guard moved inside the job loop after `deriveStatus` (red only once the harness job was listed first: with command jobs alone the derivation calls no probe — the pin was tightened before landing); **M9** a unit run before the refusal; **M10** a log written before it. M5 (refuse only a projected nightly) red on the milestone pin. |

**Refusal census (J264, N-58).** The item's registered families: the three real manifests through `runTier` (a no-op
executor, a probe answering true), by tier × the switch. Probe in the lane mirror (`bench/test/zzcensus`, deleted),
before → after: `pr` without and with the switch ran (3 sizes changed under it) before and after; `nightly` and
`milestone` without the switch ran before and after; `nightly` and `milestone` WITH the switch ran (3 sizes cut) before
→ REFUSED after, with the message above. Lawful-input refusals **0 → 0**; the two new refusals are of UNLAWFUL input
(§13.8 defines the fallback for the PR tier alone: "the nightly tier absorbs the difference"), verdict REFUSE — typed
and visible (a thrown `Error` before anything runs), never REPAIR (dropping the switch silently would guess the caller's
intent); the alternative is named in the message (run the tier without the fallback) and no user reaches the class
through the command line, which refuses it first with exit 64.

**This round supersedes C-0476's sentence that `runTier` is not changed** (and closes this file's N-13 earlier than its
M4 suggestion): the session bound Q175 (d) to this round with the explicit choice "refuse, or report with a lawful
caller", and the code shows no lawful caller.

Gates (W = 1, after the last edit): install --frozen-lockfile 0; lint 0 (eslint 1 313 files, 0 errors, probe-red ok,
9 whole-tree checks); build 0; NEAR `bench/test/tiers` plus `tools/scaffold/workspace.test.mjs`, 6 files 111 / 111 (the
item's folder 5 files 72 / 72; S2 had 69, +3); RELATED@1000 over `bench/src/tiers/runner.ts`, exit 0, 15 files
228 / 228 (`bench/test/tiers/*` 5, `bench/test/tier-jobs/{cli,lists,summary,units}`, `bench/test/timing-phase/
{bundle,groups,rules,script,tiers,wiring}`), run twice, green both times; no declared red reached. The lane mirror
`/home/user/maps-scratch/waves/selfcheck-build-M0-f-02a-fix-s3` was a real copy (no link into the project; `@plat`
dependencies resolved inside it) and is deleted.

## Closing check S3 (lane `check/M0-f-02a-close-s3`, 2026-11-12; verdict PASS in `checks/M0-f-02a-s3.md`)

Q198's first test is confirmed FIXED and PINNED (tests only). Mutants E1 – E9 were all killed. The test was green 20 / 20
alone and 20 / 20 beside six busy loops (load average up to 6.5). Q175 (d) is confirmed FIXED and PINNED: mutants
G1 – G11 were all killed, and the census shows lawful refusals 0 → 0. This closes N-13. The note below does not fail
the item.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-15 | **A truthy `fallback` that is not a boolean gets past `runTier`'s guard.** The guard tests `opts.fallback === true`, but `applyFallback` accepts any truthy value. A mirror probe called `runTier` with a nightly manifest and `fallback: 1 as unknown as boolean`, and again with `'yes'`. Both RAN with the fallback applied (fuzz 10 000 → 5 000), recorded as `fallback.applied: 1` and `"yes"`. With `true` the call was REFUSED. To reach this, a caller has to defeat the `boolean` type (a deliberate writer); the record shows the cut, so it does not fail silently. A manifest relabelled `tier: 'pr'` that carries the nightly jobs also gets past the guard, again only on purpose. | Have one value decide both the guard and `applyFallback`: `const fb = opts.fallback === true`, or test `opts.fallback` for truthiness in the guard. Add a pin that passes a non-boolean truthy value on a nightly manifest. | M4 |

## Hardening round S4 (lane `build/M0-f-02a-fix-s4`, 2026-11-13; J237 (2), J186, J192, J238, J264, J290 / N-58, J263 Q1 / Q6, J443: leg 2 of the merged round M0-d-08 S2 → M0-f-02a S4 → M0-a-11 S8; the session's record J800, pass B)

One row, read whole by its own grep: **Q201** (`docs/M0-FIX-QUEUE.md`; this file's 'Closing check S3' N-15 and
`checks/M0-f-02a-s3.md` (3)). Choices row C-0516. Inside the owns only: `bench/src/tiers/runner.ts`,
`bench/test/tiers/runner.test.ts`. Round S3's refusal of `fallback: true` off `tier:pr` and its message stand
unchanged (its pins green); the relabelled `tier: 'pr'` manifest carrying nightly jobs stays REPORTED by S3 (the
manifest's own lie, not this line's).

| row | outcome | what changed | pin and its mutant (lane mirror, `vitest run --maxWorkers=1 --bail=1 bench/test/tiers`; then each mutant against `-t Q201` alone) |
|---|---|---|---|
| Q201 (N-15) | **FIXED and PINNED** | `runTier` reads the switch ONCE — `const fb: boolean = opts.fallback === true` — and that one value is what the refusal tests (`if (fb && manifest.tier !== 'pr')`) AND what `applyFallback` receives (`applyFallback(manifest.jobs, fb)`), so the record's `fallback.applied` is always a boolean and no value of `fallback` cuts the sizes of a manifest that is not the PR tier's. The reading chosen (the queue row's own fix shape, not the alternative typed refusal): only `true` is ON; any other value — absent, `false`, or a non-boolean a caller forced past the `boolean` type (`1`, `'yes'`) — is OFF on every tier: the nightly and milestone manifests run at their own sizes (never cut, never refused), the PR manifest runs at its FULL sizes, `applied: false`. Why not a typed refusal of a non-boolean: the option is typed `boolean`, the command line only ever passes `true` / `false`, and reading anything but `true` as off is the fail-safe direction (sizes never cut unasked, the record states what ran); a new refusal would add a message and a refusal class for input no door reaches. `RunTierOptions.fallback`'s doc says so. No export added, removed or renamed (J263 Q1); no message text changed. | `runner.test.ts` 'the fallback switch …' › `Q201: on a tier:%s manifest, a truthy non-boolean fallback (1, "yes") is off: no size cut, applied the boolean false; true and absent unchanged` (an `it.each` over pr, nightly, milestone; for 1 and 'yes' in plain and batched mode: the run's tier, `fallback` `{ applied: false, changed: [] }`, `typeof applied` 'boolean', the job sizes 10 000 / 50 / 10 / 10 / null and the executor's calls at full size; absent → full sizes, `applied: false`; `true` → cut (fuzz 5 000, seeds 25) on pr, S3's refusal verbatim with no call on nightly and milestone). Mutants, each red (base 5 files 75 / 75): **MQ1** the old two readings restored (guard `opts.fallback === true`, call `opts.fallback ?? false`) — red on all three Q201 pins (pr cut, nightly and milestone cut with `applied: 1`); **MQ2** the cut fed the raw value (`opts.fallback && true`) — red on all three; **MQ3** one TRUTHY reading for both (`Boolean(opts.fallback)`, N-15's other suggestion) — red on all three (pr cut, nightly and milestone refused); **MQ4** the guard alone made truthy — red on nightly and milestone; **MQ5** the record fed a non-boolean when off — red on all three; **MQ6** the guard removed — red on nightly and milestone (and S3's Q175 (d) pins). |

**Refusal census (J264, N-58).** The item's registered families: the three real manifests through `runTier` (a no-op
executor, a probe answering true), by tier × the switch's value (absent, `false`, `true`, `1`, `'yes'`). Probe in the
lane mirror (`bench/test/zzcensus`, deleted; the "before" side is MQ1, the tree's code before this round), before →
after: 15 runs, **13 ran / 2 refused → 13 ran / 2 refused**; the two refusals are S3's (`true` on nightly and on
milestone: UNLAWFUL input, verdict REFUSE, message unchanged). What moved: `pr` × 1 / 'yes' ran CUT with
`applied: 1` / `"yes"` → runs at full sizes with `applied: false`; `nightly` and `milestone` × 1 / 'yes' ran CUT
(3 sizes) with a non-boolean `applied` → run at their own sizes with `applied: false`. Lawful-input refusals **0 → 0**;
no refusal added or removed. No real tier's summary or receipt moves (no caller passes a non-boolean: the entry passes
its parsed boolean, `tier-jobs/cli.ts` and `timing-phase/tiers.ts` never pass `fallback`).

Gates (W = 1, after the last edit): install --frozen-lockfile 0; lint 0 (eslint 1 316 files, 0 errors, probe-red ok,
9 whole-tree checks); build 0; NEAR `bench/test/tiers` plus `tools/scaffold/workspace.test.mjs`, 6 files 114 / 114 (the
item's folder 5 files 75 / 75; S3 had 72, +3); RELATED@1000 over `bench/src/tiers/runner.ts` (its file list collected
once, 15 files, run in two chunks of ≤ 12 under PLAT_FUZZ_SEED=20261113, totals from the JSON reports): 12 files
193 / 193 + 3 files 45 / 45 = 238 / 238, both chunks exit 0 (`bench/test/tiers/*` 5, `bench/test/tier-jobs/{cli,lists,
summary,units}`, `bench/test/timing-phase/{bundle,groups,rules,script,tiers,wiring}`); no declared red reached. The lane
mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-f-02a-fix-s4` was a real copy (no link into the project;
`@plat` dependencies resolved inside it) and is deleted.

## Closing check S4 (lane `check/M0-f-02a-close-s4`, 2026-11-13; verdict PASS in `checks/M0-f-02a-s4.md`)

Q201 (N-15) is confirmed FIXED and PINNED: the census over the real manifests and ten `fallback` values moved from
non-`true` values cut on every tier with a non-boolean `applied` (before-image) to none cut with `applied` the boolean
false (28 ran / 2 refused → 28 / 2; lawful 0 → 0); own mutants R1 (the old two readings) – R9 and R12 killed, R10 and
R11 equivalent. This closes N-15. The note below does not fail the item.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-16 | **`applyFallback` itself still reads its switch as truthy.** The function is exported (`bench/src/tiers/index.ts`'s barrel) and does `if (on && …)` and records `applied: on` raw, so a direct caller passing `1 as unknown as boolean` gets the cut and `applied: 1`. Through `runTier` this is unreachable since S4 (it hands over the boolean `fb`), and `runTier` is its only caller in the tree (grep). A deliberate-writer escape on a second door, not Q201's. | At the hardening pass: normalise inside `applyFallback` (`const fb = on === true`) so the record is a boolean for every caller, pinned by a direct call with `1` and `'yes'`; no export change. | M4 |
