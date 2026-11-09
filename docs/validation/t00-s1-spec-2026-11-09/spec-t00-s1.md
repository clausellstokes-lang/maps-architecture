# M0-t-00 S1 — draft spec entry (the timing-phase script's first hardening round)

**Status: DRAFT for the managing seat's ruling.** Written by a spec seat on 2026-11-09 from the design head. The
machine form is `spec-t00-s1.json` in this folder. It has the shape of an entry of
`workflows/lane-prompts/session-fix-cloud/specs.json`, and it has NOT been added to that file. Nothing under `plat/` was
edited, and no build or test was run. Every file:line below was opened by this seat, except the facts marked
UNVERIFIED in §f.

Render facts (`render.mjs:36-41`, `:48`): `from: 1` in session mode gives the lane keys `build/M0-t-00-fix-s1` and
`check/M0-t-00-close-s1`, and the verdict file `checks/M0-t-00-s1.md` (`render.mjs:44-46`). The `session` string is
placed after "this round was opened by the SESSION, not by a failed check of the item." The `lines` become the build
brief's "failing lines" and the closing checker's list. The session string is 5 294 characters long.

Models mirrored: `M0-x-06 / S1` (from 1, one line per source note, the standard RULES block) and `M0-e-06 / S3`
(from 3, queue-row lines with an exact required change and a declared or no shift). For voice and structure I also used
`M0-x-04 / S2`'s "LINE n —" form and `M0-f-03b / S1`'s OWNS / GATE / READ FIRST paragraphing.

---

## (a) The lines

| # | title | source | one-sentence rationale |
|---|---|---|---|
| 1 | RL10 (a): time a production bundle, not the tsx debug source run | Q72; RL10 (J637); J558 (2); J618 (d); J622 | §12.4 budgets the product. A source run is a debug build with tsx's keepNames, 1.6–2× slower (10× on site S3 seed 1) with identical roots, so every figure M0-t-01 would record misstates the product. |
| 2 | RL10 (b): the stamp scope stated per §12.4 row (S3, S5; every row's stage-end window) | Q72; RL10; profile §6 (2)–(3); e-06 note 2 | The S3 stamp is ≈ 75 % stage-1 trace and strips, and the S5 stamp is S5a–S5d. Both are reported against rows that cost less, and the record says nothing of it, so a reader of R12-4 cannot tell a real miss from a scope mismatch. |
| 3 | RL10 (c): the Chromium-worker leg is a debug bundle (M0-d-06's bundler defines no flag) | RL10 + C-0082 | Once Node is a production bundle, the ±15 % rule would compare two builds and could check the debug figure. The fix fails safe here (a mixed-build gate is unmeasured), and the production option is REPORTED to d-06. |
| 4 | note 1: the spied runner lets the real executor spawn | notes:9 | The test's header claims "Nothing is spawned", but a PATH executable runs 8 times. It is a test-correctness fix with a PATH-marker pin. |
| 5 | note 2: the real groups' folds are unpinned (K44, K46) | notes:10 | Two mutants survive on the real path. Injectable per-item seams let fixture tests drive the real fold code without running a bar. |
| 6 | note 3: the printed reasons line is unpinned (K47) | notes:11 | This is a one-assertion pin on the refusal's third printed line. |
| 7 | note 4: one fusion seed without a gate stamp makes the gate unmeasured forever | notes:12 | A deterministic refusal on one of 1 000 seeds would leave the fusion bar unmeasurable at every `--only` re-run. The fix is to exclude and name the seed, by the site gate's rule (Q4). |
| 8 | note 5: corridorUnion drops a whole block's CITY samples on one refused district | notes:13 | Seeds with no refusal are silently dropped. The fix is per seed, named. |
| 9 | note 6: the site gate's excluded seeds are not named | notes:14 | The figure's `n` hides which seeds, and why. The fix names them per fixture. |
| 10 | note 7: a bad timingBars row throws an untyped Error | notes:15 | It becomes a typed exit 64 naming the row, raised in the launcher before any bundle is built. |
| 11 | note 8: null calibration is read as "no drift" | notes:16 | Null becomes not-agreeing: one repeat, then `throttled` with its reason, never a loop. |

All eight notes are lines (§e explains why none is a carry-forward). RL10 is three lines because its three parts touch
different code and route to different owners: (1) the bundle and launch, with the f-01 topology; (2) the stamp scope,
with the c-06 and e-06 split REPORTED; (3) the Chromium leg, with d-06's bundler REPORTED.

---

## (b) RL10 — the design

### b.1 What the ruling asks

Q72's row (`docs/M0-FIX-QUEUE.md:86`) has two parts. First, which build the timing phase times ("time a production
bundle (or state the figure is a debug source run's)"). Second, "the stamps' scope per §12.4 row". RL10
(`docs/PROGRESS.md` J637 (3)) chose the first branch: "the timing phase times a production bundle (J558 (2), J618 (d))
with bundle.ts's recipe; t-00 S1 before TIMING-PHASE READY". Its queue annotation adds "with the §12.4 rows' stamp
scope stated per row (S3, S5) … (+ f-01's stamps if they move)". J717 (4) keeps both parts in t-00 S1 and adds the
eight notes.

### b.2 Today's path (what is a debug run)

* `plat/package.json:19`: `"bench:timing-phase": "tsx --conditions=plat-source scripts/bench.mjs timing-phase"`. The
  dispatcher maps the harness to `bench/src/timing-phase` (`plat/scripts/bench.mjs:30`; C-0059: the bench runs from
  source).
* `bench/src/timing-phase/index.ts:274-372` (`timingPhase`) runs, in that same process, the token check, the preflight,
  the first act (`firstAct`, :137-191), every group (`realGroup`, :323-330 → `workloads.ts:609-638`), the tiers
  (`timeTiers`, :331-334) and the record.
* `packages/kernel/src/invariants/debug.ts:12-19`: `DEBUG_BUILD` is true unless a bundler defines `PLAT_DEBUG_BUILD`
  false. Only when it is false does the module turn the arena's switch off (`if (!DEBUG_BUILD) setDebugAssertions(false)`).
* The measured cost of the debug run (`plat/docs/build/checks/profile-city-stages.md` §2.5, :124 and §5 fix 3): tsx ÷
  prod is S8 1.59–1.84 and S9 1.60–1.79. Split on integrated 7: tsx ÷ bundle-debug S8 1.18, S5 1.94 and S3 2.10, which
  is the keepNames cost; bundle-debug ÷ prod S8 1.49, S5 1.15 and S3 1.12, which is the assertions' cost. Site S3 on
  seed 1 costs 10×, from `__name` in `siting/geom.ts:107`. The roots were identical across the three builds.

### b.3 Proposed design: a launcher and ONE production child

```
corepack pnpm bench:timing-phase [-- --only …]            (tsx, debug — the LAUNCHER: index.ts run())
  ├─ parse args; usage → exit 64; --list → in-process; a bad timingBars row → typed exit 64 (LINE 10)
  ├─ build the production bundle (bench/src/timing-phase/bundle.ts, profile/bundle.ts's recipe)
  │     → $PLAT_BENCH_OUT/timing-phase/bundle/timing-phase.mjs   (C-0067: never inside plat/)
  │     check: errors 0, __name( count 0, PLAT_DEBUG_BUILD not left free   (else exit 1, the report named)
  │     esbuild's build service stopped (stop()) before the child starts
  └─ spawn ONE child: process.execPath timing-phase.mjs <args>   (env passed: PLAT_TIMING_TOKEN, PLAT_BENCH_OUT;
        stdio inherited; exit code returned)                      the profile tool's form, profile/index.ts:136)
        CHILD (production): assert DEBUG_BUILD === false and debugAssertions() === false (from @plat/kernel), else
        exit 64 measuring nothing; then today's timingPhase unchanged: token → 30 s idle → preflight → first act →
        groups → tiers → record (+ the build block)
```

**Why one child for the whole phase.** §12.1's protocol stays in one process: the idle, the detector, calibrate
before and after, the reference score and the record are all in the child. The first act's calibrate and every batch's
calibrate then run in the same build, so the normalisation is a same-build ratio. Each invocation builds once, and an
`--only` re-run in T2 rebuilds, so it times the fixed code.

**The recipe** (`bench/src/profile/bundle.ts:41-56`): esbuild, `bundle`, `format: 'esm'`, `target: 'es2022'`,
`platform: 'node'`, `conditions: ['plat-source']`, no keepNames, `sourcemap: 'inline'`, `external: ['playwright-core']`,
the `import-meta-url` plugin (:16-26), `define: { PLAT_DEBUG_BUILD: 'false' }`, and `absWorkingDir: PLAT_ROOT`. The
report (:57-59) counts `__name(` and the free identifier. Its entry is hard-coded (`stdin` importing `./driver.ts`,
:43), so `buildBundle` cannot be called for the timing phase as it stands. That is open question Q1.

The plugin matters here. `index.ts:51` (`RECORD_PATH`), `bars.ts:11` (`WORK_PATH`), `host/reference.ts:10`
(`REFERENCE_SCORE_PATH`) and `workloads.ts:581` (the Chromium table) all resolve from `import.meta.url`. The plugin
rewrites each to its source file's URL, so in the bundle they still point into `plat/`.

**Three deviations the recipe needs for this entry.** Each must be stated in the choices row.

1. **`esbuild` external.** The child's graph imports `@plat/testkit`'s `buildCrossHostBundles`
   (`packages/testkit/src/crosshost/bundle.ts:7`), and esbuild's JS API cannot be bundled.
2. **Externals resolved from `plat/`.** The bundle lives under `$PLAT_BENCH_OUT`, outside `plat/`, so a bare `esbuild`
   or `playwright-core` import would not resolve. The build seat resolves both to absolute paths at build time, for
   example with an `onResolve` that marks them external at their resolved path.
3. **`stop()` after the build.** This ends the launcher's build service so it is not alive during the run.

### b.4 The detector topology: a NEW B1 risk the bundle introduces

`bench/src/timing/contention.ts:12-16` and `:258-266` exempt from the kind clause two things only: the launch chain
(this process's ancestors) and an `esbuild` child of THIS process (`r.ppid === machine.selfPid && base === LOADER`,
:265). In today's single process, tsx's loader esbuild is such a child. That is how close-r1 cleared B1
(`checks/M0-t-00.md:257-318`, :348-388).

In the launcher/child design, the measuring process is the child. The launcher is its ancestor, so it is exempt. The
launcher's tsx loader service (`esbuild --service`, a child of the launcher) is a SIBLING of the measuring process, so
it is not exempt. If it is alive, the preflight names it by the kind clause on every run: B1's class, a quiet machine
refused for the script's own launch.

There are two ways to close it:

* **(A) Preferred: M0-f-01's exemption generalised.** An `esbuild` child of a launch-chain process is the launch
  chain's loader, exempt from the kind clause only, with C-0138's CPU clause kept. This is a one-condition change in
  f-01's `contention.ts:265`, with its test in f-01's folder. It is REPORTED. Q72's routing already names M0-f-01.
* **(B) Fallback inside t-00's owns.** The child passes the launcher's `esbuild` children (`ppid === process.ppid`) as
  `ownPids`. This exempts them from the CPU clause too, which is a narrowing of C-0138 for those processes, and must be
  stated in the choices row.

The pin is the same either way. A planted table holds `[launcher node (ancestor), its esbuild child, this process]`.
After the idle the run goes on, and a planted python3 is still refused. The real command is then re-run in a mirror
with a token, as close-r1 did.

### b.5 The Chromium leg (LINE 3)

`workloads.ts:578-582` builds the gate table with `buildCrossHostBundles`. Its esbuild call
(`testkit/src/crosshost/bundle.ts:27-43`) has no `define`, so the browser bundle is a debug build (`debug.ts:15`). The
fusion and site gates' ±15 % rule (`protocol.ts:235`, `:292-294`) would then compare a production Node leg with a
debug Chromium leg. When Chromium is slower by more than 15 %, the rule checks the Chromium (debug) figure, which is
exactly what RL10 forbids.

* **Inside t-00:** scan the browser bundle text as the profile tool's report does, record each leg's build, and make a
  mixed-build cross-engine figure `unmeasured` with its reason. This fails safe.
* **REPORTED to d-06:** an additive production option on `buildCrossHostBundles` (open question Q3).
* **Rejected:** t-00 building its own browser bundle from `browser-main.ts`. That module is not exported
  (`testkit/src/crosshost/index.ts:46` exports only `CROSSHOST_BROWSER_GLOBAL`), and the bundler is d-06's.

### b.6 The stamp scope per §12.4 row (LINE 2)

**§12.4's rows** (`docs/ARCHITECTURE.md`):

* :18328: `| S1 site | §4.2 S1 (1), (3); hydrology grid §2.3; … | ≈ 0.3 M noise evaluations at ≈ 27 ns; ≈ 102 000
  hydrology cells (flood, flats, D8 and accumulation measured 15.9–17.2 ms …) + the surface step (≤ 3 ms) and the
  groundwater step … | 25 ms |`
* :18329: `| S2 / S3 programme, siting, reservations, the stage-1 boundary and trace | §4.2 S2–S3, §10.2; the S4 lattice
  and edge costs are built here (§4.3) | the roster on its Δ = 10 grid (≤ 100 classes); ≈ 2 000 candidate centres; the
  plaza-rooted Dijkstra and the gate-route solves ≈ 7 ms; the one travel-cost field T with the stage-1 level set,
  gates, castle weld and trace ≈ 4 ms (+ ≈ 4 ms only when a moat is carved …) | 16 ms |`
* :18330: `| S4 backbone | §4.3 (the lattice built at S3; …) | ≈ 46 000 nodes | 10 ms |`
* :18331: `| S5 growth (S5a–S5d per stage) | §4.4 (later boundaries are level sets of S3's one travel-cost field, re-settled
  incrementally — no per-stage field) | ≤ 8 µs per insertion including snap, attraction and re-walk (M0); ≈ 5 000
  proposals | 40 ms |`
* :18332: `| S6 districts + fields | §4.5 | 3 × 62 500 cells | 17 ms |`
* :18335: `| S8 infill | §4.6 | ≈ 1 500 cuts at ≈ 12 µs per cut | 20 ms |`
* :18353-18354, the stated assumptions: "stage rates include stream-key derivation and model-digest maintenance within
  §6.1's and §6.2's bounds …, and no whole-level static index rebuild per commit (SCL-2)."

**What each stamp times.** Fusion: `bench/src/fusion/runs.ts:108-123` (`instrument`) wraps each registered stage's
`run`. Site: `bench/src/site/timing.ts:40-47` reads `capture.stageMs` from `compose.ts`. Both are the registered
stage's `run` only. The runner then rebuilds the stage-end index partitions and closes the stage root outside the window
(`packages/layout/src/pipeline/runner.ts:409-410`; `checks/M0-e-06-notes.md:10`, note 2: ≈ 2–4 ms a stage at the test
size, about a fifth of S4's row).

**The scope each R12-4 figure should carry** (`bars.ts:95-109` holds the rows; the figure record is
`protocol.ts:250-276`):

| R12-4 figure | what the stamp times | what §12.4's row costs | the gap to state |
|---|---|---|---|
| S1 (site ×2) | S1: terrain → water → S1's L0 batch → resources (`base.ts:10-11`) | noise + hydrology + surface + groundwater, 25 ms | none by stage. The hydrology part is reported separately by the hydrology bar. |
| the S3 slice (fusion, site ×2) | the slice (M0-c-01) and its commits (M0-c-02): border and plaza batch, then stage 1's wall trace and strips, S5a's at k = 1 (`base.ts:12-13`, C-0226 (2)); ≈ 75 % trace + strips in prod (profile §3.4, :246-253) | "≈ 11 ms of the S2 / S3 row's 16 ms": the solves ≈ 7 ms plus T with the level set, gates, weld and trace ≈ 4 ms (`:18329`; `fusion/timing.ts:24-29`) | The strips are not costed in any row. The trace is costed inside ≈ 4 ms. The stamp is WIDER than the figure. |
| S4 (fusion, site ×2) | `s4Stage` (`base.ts:14`) | ≈ 46 000 nodes, 10 ms; the lattice is built at S3 | equal by stage |
| S5 (fusion) | for each k: S5a (k ≥ 2 boundary + trace + strips), S5b (boundary + main roads), S5c + prune + trim, S5d (`base.ts:15-16`) | "≤ 8 µs per insertion … ≈ 5 000 proposals", 40 ms (`:18331`) | Only S5c's insertions are costed. CITY makes 321–367 proposals (profile §2.3, :103). S5a, S5b and S5d are ≈ 85–90 % of S5 (§2.2, :92) with no allowance. The stamp is WIDER than the row's costed work. |
| S6 + fields (site ×2) | `s6Stage` then `fieldsPass1` (`base.ts:17`) | 3 × 62 500 cells, 17 ms | equal by stage |
| S8 (fusion) | `s8Stage` (`base.ts:18`) | ≈ 1 500 cuts at ≈ 12 µs, 20 ms | equal by stage |
| every row | `stage.run` only | "no whole-level static index rebuild per commit" (`:18353-18354`) | The runner's stage-end rebuild and stage root lie outside every window (`runner.ts:409-410`). Whether §12.4 includes them is for the re-budget decision (J558 (2); inventory M0-e-06:10 2 "timing items decide"). REPORTED with e-06 note 2's numbers. |

**Stating versus splitting.** RL10 says "stated". A split stamp would make the S3 and S5 rows honest: slice versus
commit + trace + strips, and S5a–S5d separately (profile §6 (3)). But a split needs harness-side sub-stage boundaries:
M0-c-06's `runs.ts`, M0-e-06's `compose.ts`, and perhaps a sub-stage hook in x-04's `base.ts`, whose sub-stage cursor
exists at `base.ts:65-116`. So in this round the scope is STATED, and the split is a REPORTED queue row (Q5).

### b.7 What stays a tsx / debug run

* **The tests.** Vitest runs from source, the fixture bars are planted, and a fixture record's `build` block says
  "source".
* **The launcher.** It only parses, lists, builds and spawns.
* **The tier jobs.** C-0097's tier budgets time CI as CI runs it (vitest and tsx from source, §13.8). RL10 does not
  apply to them, and the record says so. The tier orchestration itself runs in the child.
* **The Chromium leg's page bundle**, until d-06's production option exists. LINE 3 makes any mixed-build gate
  unmeasured.

### b.8 What the tests can pin without running a bar

1. **Build and list.** Build the real bundle in a test (esbuild only; `wiring.test.ts:65` already builds the Chromium
   tables) and run `node <bundle> --list`. Expect exit 0, the thirteen ids, and a build line saying production
   (`DEBUG_BUILD` false, the arena switch off, `__name` 0). Mutants: the define dropped; keepNames on. This also
   proves the externals resolve from `$PLAT_BENCH_OUT` and that a-14's note 7 hazard (`sideEffects: false` dropping
   `debug.ts`) does not bite this bundle.
2. **Spawn seam.** The launcher with a spawn seam: a measuring invocation spawns exactly `[bundle, …args]` and measures
   nothing in-process.
3. **Debug seam.** The child entry under a debug seam exits 64 and measures nothing.
4. **Topology.** The planted topology table from b.4.
5. **Chromium leg.** Planted Chromium bundle texts: both production → judged; one debug → unmeasured.
6. **Scope texts.** The R12-4 scope texts in a fixture record.

None of these judges a timing. Timings on these machines are informative only.

### b.9 Alternatives rejected

* **tsx with `globalThis.PLAT_DEBUG_BUILD = false` set before the kernel loads.** The kernel reads the free
  identifier, so this would turn the assertions off. It keeps tsx's keepNames (11–28 % of a stage) and per-module
  transpilation, so it is not the product, and not RL10's "production bundle".
* **Importing the built bundle in-process under tsx.** Same pid, so the detector stays simple. But tsx's loader may
  transform the `.mjs` (keepNames back), and the module graph would be loaded twice (debug and production) in one
  heap.
* **A bundle per group or per bar** (the profile tool's one-run-one-child). This would split §12.1's protocol (idle,
  calibrate, reference score, record) across processes and rebuild many times.
* **Calling `profile/bundle.ts`'s `buildBundle` as is.** Its entry is fixed to the driver (:43).
* **A committed prebuilt bundle.** C-0067 forbids outputs in `plat/`, and the bundle would be stale against the tree.
* **Timing the gates with the profile tool.** It has no §12.1 protocol, no detector and no reference score.

### b.10 The mixer census (Q144, closed by J717)

`packages/kernel/test/facade/mixer.test.ts:163-164`:
`HARNESS_MIXER_CALLS = ['bench/src/timing-phase/workloads.ts call streamKey in streamKeyGroup']` and
`HARNESS_MIXER_IMPORTS = ['bench/src/timing-phase/workloads.ts import streamKey']`. The census scans
`packages/*/src` and `bench/src` (:53-58), not tests and not `$PLAT_BENCH_OUT`.

The design keeps the one call (`workloads.ts:348`, inside `streamKeyGroup` :336-357) and the one import (`:17`):

* The bundle is built FROM the source; it does not edit it.
* The new `bundle.ts` and child entry must not import `streamKey`.
* LINE 5's seams leave `streamKeyGroup` untouched.

If the build seat finds it must move, wrap or rename that call, the census lists need a session seam (M0-a-16's test).
The seat REPORTS this and never edits the test. Both the session string and LINE 5 say so.

---

## (c) Dependency and ownership facts (`plat/docs/build/M0-work.json`)

| path | owner | this round |
|---|---|---|
| `plat/bench/src/timing-phase/`, `plat/bench/test/timing-phase/` | **M0-t-00** (owns) | edited |
| `plat/bench/src/profile/` (bundle.ts …) | the session record `session-profile-tool` (`docs/build/landed/session-profile-tool.json`, J622), not an M0 item; `profile/index.ts` landed under M0-s-01's record | READ; a parametrised export is a session seam (Q1) |
| `plat/bench/src/timing/`, `bench/src/host/`, `bench/src/calibrate/` | **M0-f-01** | READ; the loader exemption REPORTED (Q2). The stamps (TimingResult) do not move, so nothing else goes to f-01. |
| `plat/bench/src/host/reference-score.json` | M0-t-01 (handed over from f-01) | never written by a test |
| `plat/docs/build/M0-timings.json` | **M0-t-01** (does not exist yet) | its shape is t-00's interface; additive fields declared |
| `plat/packages/testkit/src/crosshost/` | **M0-d-06** | READ; the production option REPORTED (Q3) |
| `plat/bench/src/fusion/` | **M0-c-06** | READ; a split stamp REPORTED (Q5) |
| `plat/bench/src/site/` | **M0-e-06** | READ; a split stamp REPORTED (Q5) |
| `plat/packages/layout/src/pipeline/base.ts` / `runner.ts` | M0-x-04 / M0-x-02 | READ (scope evidence) |
| `plat/package.json`, `plat/scripts/bench.mjs` | **M0-s-01** | READ; no dispatcher change needed (run() stays the entry) |
| `plat/packages/kernel/test/facade/mixer.test.ts` | **M0-a-16** | READ; its lists must stay true |
| `plat/packages/kernel/src/invariants/debug.ts` | M0-a-14 | READ (`DEBUG_BUILD`, exported through the barrel: `kernel/src/index.ts:27`, `invariants/index.ts:41`) |

**Q72's "f-01's stamps if they move".** With the whole phase in one production child, every `TimingResult` is produced
in the bundle, and the record's top-level `build` block covers them all. f-01's stamp shape (`timing/harness.ts:24-54`)
does not need a build field, so the stamps do not move. f-01's only touch is b.4's detector exemption, and only if Q2
picks (A).

Dependencies: t-00 depends on M0-f-01, f-02a, d-06, a-12, k-04, b-04, c-06, e-06, d-09, d-05b, d-01 and d-04
(`dependsOn`). This round adds an ordering on the session seams of Q1, Q2 and Q3 when they are chosen. g17's
integration check (DB, J717 (3)) is reading t-00's files now.

---

## (d) Open questions for the managing seat

**Q1. How does t-00 "reuse" `profile/bundle.ts`'s recipe, whose entry is hard-coded?**
Recommended: a SESSION SEAM on `bench/src/profile/bundle.ts` (session-owned; J622's lane) before the round opens. It
exports the recipe as a function of `{ entry stdin, resolveDir, outfile, extra externals }` returning the same
`BundleReport`. `buildBundle` is unchanged (it calls the new function with today's arguments), so the profile tool's 26
tests stay green. t-00 then imports it, and there is one recipe in one file.
Fallback: t-00 keeps a stated copy in `timing-phase/bundle.ts` with a parity test (the options compared with
`profile/bundle.ts`'s, red when either changes).

**Q2. The launch topology (b.4): the launcher's tsx esbuild service becomes a sibling of the measuring process.**
Recommended: (A), M0-f-01's exemption generalised to "an esbuild child of a launch-chain process", kind clause only,
landed as a session seam or an f-01 line before t-00 S1's build. Q72's routing already names f-01, and it keeps
C-0138's CPU clause.
Fallback: (B), t-00 passes those pids as `ownPids`, with a choices row stating the CPU clause is waived for them.
In both cases the build seat first probes with `ps` whether the tsx service is alive during the child's preflight
(UNVERIFIED here).

**Q3. The Chromium leg's build.**
Recommended: a queue row to M0-d-06 for an additive `production` option on `buildCrossHostBundles` (define
`PLAT_DEBUG_BUILD=false`; the default unchanged, so d-06's parity legs do not move). It should land as a session seam
before TIMING-PHASE READY, or in d-06's next round. Meanwhile t-00 S1's LINE 3 makes a mixed-build gate `unmeasured`,
so the real run cannot judge the gates on a debug leg.

**Q4. The exclusion rule for notes 4–6.** A seed whose derivation refuses, or never reaches the gate stages, is either
EXCLUDED and named (the figure is the p50 over the seeds that reached; e-06's `gateRuns` precedent,
`site/timing.ts:70`) or makes the figure UNMEASURED.
Recommended: exclude and name, with each excluded seed's refusal code carried into the census for routing. A refused
derivation is a ZERO-REFUSALS defect of its stage's owner, not a reason to leave the phase unable to close a bar. One
rule for fusion, site and corridorUnion.

**Q5. Stamp scope: STATE (RL10's word) or SPLIT?**
Recommended: state it in this round (LINE 2), and open a queue row for the split. The split covers slice versus
commit + trace + strips at S3, and S5a–S5d at S5. It is routed to M0-c-06 and M0-e-06 (with x-04 if a base hook is
needed), and should be done before the re-budget decision (J558 (2), row 31), which reads R12-4. Separately: whether
§12.4's rows include the runner's stage-end rebuild (e-06 note 2; inventory M0-e-06:10 2 says "timing items decide")
is a design reading, not something t-00 can measure without the runner's window. Recommended: t-00 records it as
outside the window, and the decision goes to row 31 with e-06's numbers.

**Q6. The gate.**
Recommended: the round opens after g17's integration check (DB) has returned its verdict, so that any g17 finding on
t-00's files is folded into this round rather than racing it, and after the Q1, Q2 and Q3 seams if chosen.

**Q7. The record shape.** M0-timings.json's shape is t-00's declared interface. The hardening RULES (3) say a record
format change is not the round's.
Recommended: the session states (as the draft session string does) that RL10 and J717 (4) rule the ADDITIVE fields.
These are the `build` block, the per-leg build, the figure `scope` and the `excluded` lists, with no field removed or
renamed. Whether `RECORD_SCHEMA` is bumped is the builder's, stated in the choices row. No such file exists yet.

**Q8. A test that builds the bundle and runs `node <bundle> --list`.** The item's tests rule says no test runs a real
bar, tier or browser (M0-work.json `tests`; C-0105, C-0115).
Recommended: allowed. No bar runs, and `wiring.test.ts:65` already builds bundles with esbuild. The build seat states
the test's wall-clock, as F0's (4) asked for the folder.

---

## (e) What in the eight notes should NOT be a line, or not in the form the note proposes

**None is excluded.** Each needs only t-00's own files and today's material, so none qualifies as a carry-forward
(J238 / J490). Three of them change form:

* **Note 2's first suggestion is NOT taken.** It proposed a "tiny built-readings smoke of each real group (one seed,
  one plot)". It would run real CITY derivations in vitest: a fusion seed is about 80–160 s of S8 alone (profile §2.1),
  and C-0105 / C-0115 forbid running a real bar. Its alternative ("M0-t-01's checker reads these fields in the real
  record") defers to a later item. LINE 5 takes a third shape instead: injectable per-item seams that let fixture
  tests drive the real fold code. It keeps K44 and K46 killable, and it is fenced off from `streamKeyGroup` (the mixer
  census).
* **Note 3 (K47)** is "off the stated promises" per the checker. It stays a line because the pin is one assertion and
  J263 Q6 pins printed texts.
* **Note 4** asks for a choices-row decision between two rules. The decision is Q4. The line implements the
  recommended rule.

**Inventory rows that wait on the timing items but are NOT this round's lines:**

* M0-e-06:11 3: batches over 60 s per derivation. This waits for the perf pass and M0-t-01, and today's adaptive blocks
  already flag `long-batch`.
* M0-a-09:68 15 and M0-a-05:264 N-s8c-3: measurements for t-01 and t-02.
* M0-k-04:18 N-10: waits until the tier is timed.
* M0-d-04:29 8 N-8: already met. `bars.ts:195`'s digest workload text states the plats-layer omission.
* M0-e-06:10 2 (the stage-end window) is folded into LINE 2 as a STATEMENT, with its decision REPORTED (Q5).

---

## (f) Facts not verified by this seat (UNVERIFIED)

* **Whether tsx's esbuild service stays alive for the whole run** under the launcher. B1's evidence shows it alive at
  start-up as a child of the tsx process (`checks/M0-t-00.md:281-284`). Its persistence was not probed (no process was
  run).
* **Whether Node resolves a bare `esbuild` / `playwright-core` import** from a bundle under `$PLAT_BENCH_OUT`. I expect
  it does not, hence deviation 2 in b.3. That expectation is inferred, not run.
* **That esbuild's JS API refuses to run when bundled.** This is from esbuild's documented behaviour, not run here.
* **That the calibrate score is build-invariant** (the kernels "import nothing" and have "no calls",
  `calibrate/kernels.ts:1-15`, so keepNames adds no per-call cost). This is reasoned, not measured.
* **That `invariants/debug.ts` survives tree-shaking in the timing-phase bundle.** The facade imports `debugMode`
  (`kernel/src/facade/kernel.ts:37`), so it should. LINE 1's pin (a) checks it.
