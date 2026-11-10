# M0-t-00 — the checker's notes for the hardening milestone M4 (check/M0-t-00, 2026-10-27)

These are the MINOR findings of the item's FIRST check (J180). None of them fails the item; each is a hardening row.
The check's verdict and its one blocker (B1) are in `checks/M0-t-00.md`. The mutants named here are the checker's own
(`/home/user/maps-scratch/waves/check-M0-t-00/mutants.json`). The scratch mirror is deleted at the check's end.

| # | where | note |
|---|---|---|
| 1 | `bench/test/timing-phase/tiers.test.ts`, "a spied runner sees only the mode, the tree, the output, the executor and the log …" | The test passes no `options` to `timeTiers`, so `runOnce` wraps the real `spawnExecutor`. The spy's `{ ...planted, ...opts }` then lets that executor override the planted one. A probe put a logging `fixture` executable first on `PATH`: the test spawned it 8 times (`fixture lint kernel`, `fixture long long-unit`, …). On a normal machine each spawn is ENOENT. No tier script is spawned, so C-0105 holds, but the file header's "Nothing is spawned" is false for this test. Fix: pass `options: s.tiers.options` or spread `opts` first. |
| 2 | `bench/src/timing-phase/workloads.ts`, the real groups (`siteNodeGroup`'s call timing, `s11Group`'s extras, `chromiumPlan`'s leg handling) | Mutants K46 (the site Node call pushed as 0) and K44 (`workloadFile` dropped from the real S11 extras) SURVIVE. C-0105 and C-0115 forbid a test to run a real bar. Reading confirms the code. K46 fails safe: a zero call makes the gate `unmeasured`. K44 is equivalent: the row's `workload` and `entry` still name the file. Hardening: a tiny built-readings smoke of each real group (one seed, one plot) with an injected `timeBatch`, or M0-t-01's checker reading these fields in the real record. |
| 3 | `bench/src/timing-phase/index.ts` `run`, the `reasons` line of a refusal | Mutant K47 (the reasons not printed) SURVIVES. It is off the stated promises: the message and `refusal.json` still name the offenders. A test could pin the printed line. |
| 4 | `workloads.ts` `fusionNodeGroup` / `fusionGateOf` | A seed whose run stamps no S4, S5 or S8 throws, which drops the whole block. Because the bar never judges part of its work, one such seed among the 1 000 makes the fusion gate `unmeasured` at every `--only` re-run. This is fail-safe and is the author's continuation fix. M0-c-06's own harness sums `?? 0`, and M0-e-06 excludes such derivations (`gateRuns`). Hardening: name and count such seeds in the record, and decide by a choices row whether the gate is the p50 over the seeds that reached S8 (as the site gate does) or stays unmeasured. |
| 5 | `workloads.ts` `corridorUnionGroup` | A block with any refused district drops all of that block's CITY-set samples (`refused > 0 ? [] : city`). The city figure is then judged on the remaining seeds, while the count goes only to `extras.refused` and the census. Hardening: state in the figure which seeds it covers, or make any refusal leave the CITY figure `unmeasured`. |
| 6 | `workloads.ts` `siteNodeGroup` | A derivation that did not reach S6 is excluded from the gate (`gateMs` null), as M0-e-06's own fold does. The figure's `n` shows it, but the record does not say per fixture how many seeds were excluded. Hardening: an `excluded` count beside each site figure. |
| 7 | `bars.ts` `readTimingBars` / `resolveBars` | A malformed or unrecognised `timingBars` row throws an untyped `Error` before anything runs. This is our own configuration defect, never input, and the dispatcher prints it. A typed `usage`-class outcome (exit 64) naming the row would match the script's other exits. |
| 8 | `tiers.ts` `timeTiers` (`drifted`) | A projected tier run whose `calibration` is null is read as "no drift", so it gets no repeat and no `throttled`. That only happens if calibrate never produced scores. The runner's figure is then unjudged anyway, so the record stays fail-safe. Hardening: treat null as not-agreeing, or record why. |

## Hardening round S1 (lane `build/M0-t-00-fix-s1`, 2026-11-10)

The session's hardening round S1 of M0-t-00 (J717 (4) / J725, under the owner's delegation): RL10 (Q72; LINES 1 – 3) and
the eight notes of the first check above (LINES 4 – 11), the THIRD leg of the merged round M0-f-01 S1 → M0-d-06 S2 →
M0-t-00 S1 (J443); it relies on f-01's generalised loader exemption (C-0465) and d-06's production option (C-0466),
both read, never edited. Choices row C-0473 names every row it closes (it amends C-0059 for the timing phase). The
queue file (`docs/M0-FIX-QUEUE.md`) and `docs/PROGRESS.md` were NOT read (outside the clean-room list): the lines'
substance is the brief's text. Mutants ran in the lane's one scratch mirror
(`/home/user/maps-scratch/waves/selfcheck-build-M0-t-00-fix-s1`, isolation proven: no link into the tree, the `@plat`
realpaths inside the mirror; removed after), each with `vitest run --maxWorkers=1 --bail=1 bench/test/timing-phase/`;
the clean mirror ran 6 files, 93/93; every mutant restored from the tree and checked with `cmp` before the next.

| row | source | outcome | the change | pin (red without the fix) | mutant(s), all KILLED |
|---|---|---|---|---|---|
| LINE 1 (RL10 (a)) | the brief; Q72 / RL10 as stated; `profile-city-stages.md` §2.5, §5 fix 3, §6 (1); `kernel/src/invariants/debug.ts`; a-14 note 7 | FIXED and PINNED (the reference Mac's bundled run PENDING-MAC) | `bundle.ts` (new: the stated copy of profile's recipe, its six stated differences in C-0473 (2)); `child.ts` (new: refuses a debug build, exit 64; the record's `build` block); `index.ts`: `run` is the launcher (usage, a bad row, `--list` in-process; else build, check, ONE child), `runPhase` the in-process script | `bundle.test.ts` (a) – (d) and the parity test | M1a define dropped · M1b keepNames on · M1c the launcher measures in-process · M1d a non-production report spawned · M1e the child ignores debug · M1f the child reads the flag only · M1g the externals by bare name · M1h profile's target changed · M1i the copy's sourcemap changed (SURVIVED the first sweep: the parity test matched the plugin's own `transform` line; the test now reads the build call only — re-run KILLED) · M1i2 profile's sourcemap changed · M1j the import-meta-url plugin dropped · M1k f-01's S1 rule reverted (mirror only) · M1l no build block · M1m profile's bare-word scan |
| LINE 1 (v) | the brief; C-0465 | CONFIRMED by probe | none here (f-01's S1) | pin (d) | M1k |
| LINE 2 (RL10 (b)) | the brief; `profile-city-stages.md` §2.2, §2.3, §3.4, §6 (2) – (3); ARCHITECTURE.md:18329, :18331, :18353 – 18354; e-06 note 2 | FIXED and PINNED (the scope STATED); the SPLIT stamp and the stage-end rebuild's budget REPORTED (Q5) | `bars.ts`: `STAGE_SCOPES`, each R12-4 figure's and both gates' `scope`, copied into the FigureRecord (`protocol.ts`) and printed one clause a line | `rules.test.ts` 'every R12-4 figure, and the gates, carry their stamp scope' | M2a S3's scope dropped · M2b S5's emptied · M2c not copied · M2d the stage-end clause changed |
| LINE 3 (RL10 (c)) | the brief; `crosshost/bundle.ts` (C-0466) | FIXED and PINNED | `workloads.ts` `bundleCache` passes `{ production: true }`; each batch carries its leg's build (`legBuildOf`, `nodeLegBuild`); `foldFigure` makes a cross-engine figure of two builds UNMEASURED (`DIFFERENT_BUILDS`) | `groups.test.ts` 'RL10 (c)' (planted texts and builds); `wiring.test.ts` the production bundle scanned | M3a the fold ignores the builds · M3b no production option · M3c the scan ignores `__name` · M3d the batch carries no build |
| LINE 4 (note 1) | note 1 | FIXED and PINNED (test-only) | `tiers.test.ts`: the planted options spread last | the PATH probe (a logging `fixture` executable never ran) | M4 the old spread order |
| LINE 5 (note 2) | note 2 | FIXED and PINNED | `workloads.ts`: `FusionDeps` / `SiteDeps` / `ChromiumDeps` / `unionSeed` / `workload` seams, the real entries the defaults; `streamKeyGroup` untouched (mixer census green) | `groups.test.ts` 'note 2'; `wiring.test.ts` the defaults | K46 site call as 0 · K44 `workloadFile` dropped · M5c a thrown cell drops the batch · M5d a leg that did not run not dropped · M5e the fusion call as 0 |
| LINE 6 (note 3) | note 3 | PINNED (test-only) | none | `script.test.ts` 'the refusal's three printed lines, verbatim' | K47 the reasons line not printed |
| LINE 7 (note 4) | note 4; Q4 | FIXED and PINNED | `fusionNodeGroup` per seed: excluded and named, the p50 over the seeds that reached; `Exclusion` on the figure and in `census.barExclusions` | `groups.test.ts` 'note 4' | M7a per-block drop · M7b sum-0 · M7c a throw drops the block · M7d exclusions not on the figure · M7e not in the census |
| LINE 8 (note 5) | note 5; Q4 | FIXED and PINNED | `corridorUnionGroup` per seed (`refusedBySeed`) | `groups.test.ts` 'note 5' | M8a the per-block drop · M8b a refused seed kept |
| LINE 9 (note 6) | note 6; Q4 | FIXED and PINNED (NO-SHIFT on values) | `siteNodeGroup` names each excluded derivation per fixture | `groups.test.ts` 'note 6' | M9a the list dropped · M9b a throw drops the block |
| LINE 10 (note 7) | note 7 | FIXED and PINNED | `preparePhase`: exit 64, the message verbatim, then `CONFIG_DEFECT`, before any bundle | `bundle.test.ts` 'a timingBars row the bars cannot read' | M10a no catch · M10b the launcher builds first |
| LINE 11 (note 8) | note 8; C-0097 (2) | FIXED and PINNED | `tiers.ts`: null is not agreeing; one repeat; `throttledReason` | `tiers.test.ts` 'no calibrate scores is NOT agreeing' | M11a the reverted rule · M11b a null repeat not throttled |

**The Q2 probe (LINE 1 (v)), the real command in the lane mirror with a token:** the launcher built the bundle (16.2 MB,
errors 0, `__name` 0, `PLAT_DEBUG_BUILD defined false`) and ran one child. ps every few seconds: the tsx launcher node
(the child's parent) 29.5 % → 7.2 % lifetime CPU by the child's preflight; its esbuild service — the ONE service the
tsx loader and the bundle build share (the same esbuild package) — `[esbuild] <defunct>` after `stop()`, 21 % → 4.9 %, a
SIBLING of the child, exempt from the kind clause by C-0465 and under the CPU clause's 10 %; the child 8.4 % → 1.5 %. The
child passed the preflight; its first act refused on power only (`power: unknown`, exit 3; lawful by design, as close-r1).

**New rows for the hardening pass (KI; each fails safe):**

| # | where | note |
|---|---|---|
| S1-1 | the launch on Linux (`index.ts` `run`, `bundle.ts`) | Linux's ps reads %CPU as a lifetime average, so the launcher's start-up (the tsx transpile and the bundle build) still weighs at the child's preflight: 7.2 % in the probe. A slower build could leave it ≥ 10 % and the preflight refuses naming it — a refusal, never a contended result (the Mac reads a decaying average). |
| S1-2 | `bench/src/profile/bundle.ts` (session record `session-profile-tool`, J622; reported, not edited) | Profile's textual import-meta-url plugin rewrites the words inside a string literal (a syntax error on `crosshost/bundle.ts:29`, a silent URL change on `:67`), and its bare-word `PLAT_DEBUG_BUILD` scan counts an object key or the scanner's own text. Its driver bundles neither, so it is unaffected today; the timing phase's copy reads code and identifiers instead (C-0473 (2)). For pass B's unification of the two copies. |
| S1-3 | the split stamp (Q5) | REPORTED: a split S3 stamp (slice vs commit + trace + strips) and S5a – S5d stamps need M0-c-06's `runs.ts`, M0-e-06's `compose.ts` and the base's sub-stage boundaries — a queue row for those items before the re-budget decision; whether §12.4's rows include the runner's stage-end rebuild goes to that decision with M0-e-06 note 2's numbers. |
| S1-4 | the Mac (PENDING-MAC) | The bundled run's own figures (and the Chromium leg's production bundle in the reference Mac's browser) are M0-t-01's, on the reference machine; nothing here takes or gates on a timing. |

**Refusal census (J264 / N-58), before = after:** the two designed REFUSE classes (no-token, contended-machine; UNLAWFUL
state), 0 refusals raised by a fixture bar; the bundled launch passes the preflight on a quiet machine (pin (d), the
probe); a debug child and a configuration defect are usage-class exits (64), not refusals.

### The closing check of hardening round S1 (lane `check/M0-t-00-close-s1`, 2026-11-10; verdict `checks/M0-t-00-s1.md`)

| # | where | note |
|---|---|---|
| S1-5 | `protocol.ts` `foldFigure` / `crossEngine`, with the per-seed exclusions of LINES 5 and 7 | The ±15 % rule compares the median derivation call of the Node leg with the median call of the Chromium-worker leg. Since round S1, each leg can exclude a seed on its own: a Node derivation that threw, or a Chromium cell that threw or gave no timing. The two medians can then cover different seed sets. Nothing excludes the seed from the other leg, and nothing records that the sets differ. The figure stays fail-safe: both lists are on the record and every seed is named. With 1 000 seeds and a rare exclusion the bias is negligible. Hardening (M4): compute the gap on the seeds both legs kept, or state the two n's in the CrossEngine record. |
