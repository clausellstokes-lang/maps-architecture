# CPU profile of the pipeline stages at CITY (queue row Q50) — which stages miss §12.4, by how much, where the time goes, and why

Seat `session/profile-city-1` (Opus 5.5, Claude Code in the session's cloud container — Linux x64, 4 cpu, 16 GiB, Node
24.12.0, V8 13.6; flow flow-7), 2026-10-13 23:11 – 2026-10-14 01:03 UTC. A measurement seat: it changed no code. Clean
room: no git of any kind; every driver, bundle, profile and analyser lives in the seat's scratch
`/tmp/claude-0/-home-user-maps-architecture/92854012-e49f-55f1-bde0-8f3efa78ca7e/scratchpad/profile-city/` (named
`<scratch>` below); the live tree was read only, and touched by this file, one `CLEAN-ROOM.md` row and the landed record.
**Every timing here is CONTENDED** (M0.md §0.1 (5), C-0047): the container was shared with the session's own shells (one
of them a `rev` at 100 % of a core until ≈ 00:00), load average 0.6 – 3.7 during the runs, one run per seed and build. The
conclusions rest on SHARES of each stage's sampled time and on exact COUNTS, never on a single wall-clock.

## 0 Summary

1. Every stage the runs pass misses §12.4's CITY p50 (ratios: the production bundle … the tsx debug source run that made the committed summaries): **S8 3 954 – 7 820×**, **S9 1 327 – 2 531×**, S3 139 – 309×, S5 66 – 143×, S6 26 – 212×, S4 24 – 56×, S1 6 – 10×; the fusion gate S4 + S5 + S8 830 – 1 615× (S8 is 97 % of it). On the river site (relief-60) S3 is 1 210 – 12 424×, S1 111 – 557×, S5 440 – 856×.
2. One engine carries most of it: the kernel's scratch overlay (`arr/winding.ts:106` `buildOverlay`, one fresh arena and one `insertChain` per input segment) is 72 – 80 % of S8, 67 – 69 % of S9, 46 – 55 % of S3, 27 – 34 % of S5 and 78 – 84 % of S6 when its perimeter falls back.
3. **S8 — ALGORITHMIC.** kerb(F) is rebuilt from scratch in a new arrangement at every face visit: 2 774 / 2 394 arrangements per seed (2.0 per cut) of ≈ 250 – 300 segments, ≈ 19 ms each in the production bundle; beside it mint's whole-live-list scan per minted entity and an O(arena) savepoint per cut (both quadratic over the stage). Planning the cut (`planCut`, `judge`) is < 1 %.
4. **S9 — ALGORITHMIC.** `corridorUnion` re-reads every block's kerb the same way (1 412 / 1 213 more arrangements per seed); nothing S8 read is reused.
5. **S5 — mixed.** S5a (the wall traces and strips: buffer unions through the overlay, O(samples × ring) departure checks) is 47 – 59 %, S5b 21 – 26 %, S5d 7 – 19 %; S5c — the growth §12.4's S5 row actually costs — is 4 – 10 % at ≈ 0.4 – 0.5 ms per proposal against ≤ 8 µs (CONSTANT-FACTOR, 50 – 70×), on 321 – 367 proposals, not §12.4's ≈ 5 000.
6. **S3 — mixed.** 75 % of S3's stamp is stage 1's wall trace and strips (S5a's work at k = 1, which the base composes into S3); the slice proper is ≈ 18 %. On the river site S3 is 13.3 – 13.5 s in the production bundle, in two ALGORITHMIC paths: the S4 lattice's water test, O(edges × water-ring vertices) (seed 1), and the F-WALL re-offset rung's buffer overlays (seed 2).
7. S1 is CONSTANT-FACTOR on the flat fixture (hydrology passes, 6 – 10×) and ALGORITHMIC on the river site (`waterMask`: one point location per resource cell that walks whole face rings); S4 is CONSTANT-FACTOR (16 route chains through the insertion, 24 – 56×); S6 is CONSTANT-FACTOR on its fast path and ALGORITHMIC when the perimeter falls back to one overlay of up to ≈ 4 000 segments.
8. **STRUCTURAL, in the measurement itself:** the harness times a debug build through tsx — slot-stamp assertions on (`arena/debug.ts:8`) and tsx's hard-coded `keepNames` (a `__name` / `Object.defineProperty` per inner-closure creation, 11 – 28 % of a stage, 84 % of site S3 on seed 1). A production bundle of the same sources gives identical model roots and runs S8 and S9 1.6 – 1.8× faster. None of that closes the gap.
9. The overlay is super-linear in its own size (85 – 160 µs per segment at 50 – 200 segments, 300 – 810 µs at 1 600 – 3 200; `rewalk` walks the whole touched face per insertion and `reparent`'s faces-only query scans every level-n item of the split parts' box) and ≈ 10× over §12.4's ≤ 8 µs per insertion even at its cheapest.
10. **Re-budget or redesign:** §12.4's budgets are NOT reachable by constant-factor work on the current algorithms for S8, S9, or S1 and S3 on river sites; S8/S9 need the algorithmic change Q18 names (no per-face scratch arrangement) before any re-budget means anything. After it, the overlay/index constant factors and a production-bundle re-measure decide whether S3 – S6 need a kernel speed-up programme or a D-18 re-declaration; C-0098's ladder (≤ 2× per pass) cannot close a 10³ – 10⁴ gap.

## 1 Method

**1.1 Runs.** A driver in the scratch (`<scratch>/driver.mts`) runs the fusion harness's own single-seed entry — `derive(run, seed)`
(`bench/src/fusion/runs.ts:332`), the registry, instrumentation and stage stamps exactly as `pool.ts`'s `runTask` does — and then
the harness's S8 ≡ S9 kernel batches in `measure.ts:518`'s order (`s8s9`): the L1 kerb reads of every block seed in one L1 batch,
then `corridorUnion` per district in one L2 batch each (S9's kernel op, §3.7; the harness registers no S9 stage, M1's). The metric
reads between them only read the arena and were skipped. Each stage's `run` is wrapped once more (through `derive`'s `plant`
hook, before the harness's own `instrument`, `runs.ts:108`) with an `process.hrtime` mark on the same monotonic clock as the
profile's timestamps (checked: the profile's start and end fall inside the marks around `Profiler.start`/`stop`). Seeds: the
fusion harness's **integrated 4, integrated 7 and fusion 3** at CITY (the flat fixture, 2 500 ha, 220 ha walled), each in three
builds (1.3); and, to answer Q50's site rows, the site harness's `deriveSpike` composition (`bench/src/site/compose.ts:249`,
re-built in `<scratch>/site-driver.mts` with the marks) on **relief-60 seeds 1 and 2** at CITY in two builds. Test size
(900 ha / 30 ha) integrated 4 for the tooling checks. `python3 tools/test_budget.py` printed 1 before every run; one process at
a time except the two count runs (1.4), which ran beside analysis and the micro-benchmark (3.7) only.

**1.2 Faithfulness.** Every seed's model root is identical across all builds and modes: integrated 4 `239a913f…22852`,
integrated 7 `4f583f0d…18fa`, fusion 3 `2a66b33b…1cb`, relief-60 seed 1 `acd697f7…4d0c`, seed 2 `4878a333…dd03`, test size
`250572f5…f507`; faces, cuts, blocks, face visits, kernel calls and candidates equal. The kernel module is one instance (the
level-digest state the runner attached is visible to the driver's import). The tree moved under the seat — consolidation
landings in `kernel/src/geom/` (23:32), `kernel/src/skeleton/` (23:42) and `layout/src/districts/` (23:53) — and the roots did
not: the runs before and after are the same derivations.

**1.3 Builds.** (a) **tsx-debug** — `cd plat && node_modules/.bin/tsx --conditions=plat-source <scratch>/driver.mts --run R --seed S
--mode cpu --interval 500 --out <scratch>/city`: the bench's own loader (tsx 4.23.15, the `plat-source` condition, as
`corepack pnpm bench` runs `scripts/bench.mjs`, C-0059), i.e. the committed summaries' configuration; (b) **bundle-debug** —
`<scratch>/build-bundle.mjs`: esbuild 0.28.2 (plat's), `bundle`, `format esm`, `target es2022` (as `scripts/build.mjs:23`),
`conditions plat-source`, no keepNames, `playwright-core` external (lazily imported, never reached), each module's
`import.meta.url` replaced by its own file URL; a debug build like the dist `scripts/build.mjs` makes (it defines no
`PLAT_DEBUG_BUILD`); (c) **prod** — the same with `define PLAT_DEBUG_BUILD=false`, the production bundle
`kernel/src/invariants/debug.ts:15` names, which turns the slot-stamp assertions off. Modes: `cpu` (V8 CPU profile, 500 µs
sampling; overhead 4 – 7 % on S8 against `plain`), `plain` (marks only), `count` (1.4).

**1.4 Counts.** `--mode count`: V8 precise coverage with call counts (`Profiler.startPreciseCoverage {callCount: true}`), taken
and reset at every stage boundary — exact invocation counts of every function per stage, no code changed; ≈ 3.3× slower,
never used for timing. Run on integrated 4 and fusion 3 (prod bundle), and at the test size.

**1.5 Analysers** (all in `<scratch>`): `analyse.mjs` (per stage window: self time per function and per file, inclusive time
per function once per sample, the heaviest call path; every function named by its TypeScript file and line through the
generated sources' inline source maps, read back with the inspector's `Debugger.getScriptSource` and decoded with plat's
`source-map-js` 1.2.2), `joint.mjs` (time with Y on the stack and X under it), `callers.mjs` (Y's callers), `s5split.mjs` (S5's
samples by the step closure in `pipeline/base.ts:562 – 586`), `counts.mjs` / `countstab.py` (coverage counts per stage),
`table2.py`, `top20.py`, and the micro-benchmark `scale.mts` (the kernel's `buildOverlay` on synthetic operands).

**1.6 Caveats.** CONTENDED and single runs: wall-clocks of S1, S3, S4, S5 moved by up to ± 50 % between two runs of one build
(fusion 3 prod S3 1.33 s profiled, 2.31 s plain); S8 and S9 were stable within ≈ 10 %. Small wrappers that V8 inlines (`kerb`,
`kerb.ts:381`) are under-reported in inclusive lists; their non-inlined callers and callees are used instead. Function names
in the bundle profiles carry esbuild's collision suffixes (`attempt3` = `insertChain.ts:1072`'s `attempt`, `run4` = its `run` at
`:882`, `fn` = `bentCutFabric.ts:1403`); `set filename` / `set Navigator` are V8's names for the native `defineProperty` under
tsx's `__name` helper.

## 2 Per-stage table

**2.1 The fusion harness at CITY** — wall ms of each stage (`tsx-debug` profiled / `prod` unprofiled) against §12.4's CITY p50
(S3: the slice's ≈ 11 ms of the 16 ms row, as `bench/src/fusion/timing.ts:24 – 29` reads it). The committed summary's 50-seed
p50 (M0-c-06.json, tsx, CONTENDED) beside it.

| stage | §12.4 p50 | integrated 4 | integrated 7 | fusion 3 | ratio (prod … tsx) | M0-c-06 p50 (fusion; integrated) |
|---|---|---|---|---|---|---|
| S1 | 25 ms | 213 ms / 144 ms | 251 ms / 157 ms | 169 ms / 227 ms | 6× … 10× | —; 150 ms |
| S3 | 11 ms | 2 505 ms / 1 531 ms | 3 402 ms / 1 612 ms | 2 128 ms / 2 313 ms | 139× … 309× | 2.38 s; 2.40 s |
| S4 | 10 ms | 430 ms / 241 ms | 563 ms / 268 ms | 471 ms / 408 ms | 24× … 56× | 0.50 s; 0.50 s |
| S5 | 40 ms | 4 627 ms / 2 628 ms | 5 710 ms / 3 030 ms | 3 930 ms / 3 534 ms | 66× … 143× | 5.33 s; 5.36 s |
| S6 | 17 ms | 3 606 ms / 3 067 ms | 943 ms / 450 ms | (no S6) | 26× … 212× | —; 0.78 s |
| S8 | 20 ms | 156.4 s / 88.4 s | 154.7 s / 83.9 s | 125.7 s / 79.1 s | 3 954× … 7 820× | 164.4 s; 195.5 s |
| S9 | 25 ms | 63.3 s / 35.3 s | 58.7 s / 36.6 s | 56.9 s / 33.2 s | 1 327× … 2 531× | not stamped |
| S4 + S5 + S8 | 100 ms | 161.5 s / 91.2 s | 161.0 s / 87.2 s | 130.1 s / 83.0 s | 830× … 1 615× | 169.9 s; — |

**2.2 S5a – S5d** (share of S5's sampled time; prod / tsx; §12.4 budgets S5 as one 40 ms row — "≤ 8 µs per insertion …
≈ 5 000 proposals" — so S5a, S5b and S5d have no allowance of their own):

| sub-stage (base.ts step) | integrated 4 | integrated 7 | fusion 3 | prod ms (i4 / i7 / f3) |
|---|---|---|---|---|
| S5a trace + strips (`:575`, `mainRoads.ts:1178`) | 46.8 % / 59.4 % | 50.9 % / 57.9 % | 51.5 % / 55.6 % | 1 481 / 1 299 / 1 201 |
| S5b boundary + main roads (`:572`, `mainRoads.ts:1154`) | 20.9 % / 24.1 % | 21.9 % / 23.2 % | 23.5 % / 25.9 % | 662 / 559 / 548 |
| S5c growth (`:579`) + prune (`:582`) | 6.8 % / 4.6 % | 9.1 % / 5.2 % | 8.0 % / 6.1 % | 215 / 231 / 189 |
| S5d capacity (`:586`) | 19.3 % / 7.4 % | 14.5 % / 9.3 % | 12.4 % / 8.6 % | 609 / 370 / 290 |
| other (growthStart, outside a step) | 6.2 % / 4.5 % | 3.7 % / 4.5 % | 4.5 % / 3.9 % | — |

**2.3 Per-unit rates** (prod plain / tsx): S8 per cut 63 – 67 ms / 106 – 116 ms against §12.4's ≈ 12 µs (M0.md §1 (a)'s
`splitFace` bar); S8 per face visit 34 – 39 ms / 62 ms; one kerb read (the harness's S8 ≡ S9 reads, a pure kerb workload:
1 412 / 1 370 / 1 213 reads) 18.3 – 20.1 ms / 34.8 – 36.2 ms; S9 per district median 853 – 1 022 ms / 1 423 – 1 493 ms
(max 3.5 s / 6.4 s) against M0.md §1 (a)'s "one district ≤ 3 ms"; S5c per growth proposal ≈ 0.39 – 0.54 ms (prod profiled)
against ≤ 8 µs, on 367 / 321 / 366 proposals and 61 / 58 / 58 streets per seed. Cuts per seed 1 362 / 1 329 / 1 181 (§12.4:
≈ 1 500); districts 30 / 30 / 32 (≈ 25).

**2.4 The site harness, relief-60 at CITY** (`tsx-debug` / `prod`, both profiled; M0-e-06.json's 8-seed p50, tsx, beside it):

| stage | §12.4 p50 | seed 1 | seed 2 | ratio (prod … tsx) | M0-e-06 p50 |
|---|---|---|---|---|---|
| S1 | 25 ms | 13 926 ms / 11 618 ms | 3 211 ms / 2 786 ms | 111× … 557× | 8 134 ms |
| S3 | 11 ms | 136 663 ms / 13 463 ms | 20 327 ms / 13 312 ms | 1 210× … 12 424× | 37 868 ms |
| S4 | 10 ms | 696 ms / 564 ms | 457 ms / 388 ms | 39× … 70× | 1 129 ms |
| S5 | 40 ms | 34 240 ms / 24 860 ms (refused) | 24 685 ms / 17 601 ms | 440× … 856× | 50 766 ms |
| S6 | 17 ms | not reached | 751 ms / 498 ms | 29× … 44× | 1 372 ms |
| S1 + S4 + S6 | 50 ms | — | 4 419 ms / 3 672 ms | 73× … 88× | 12 741 ms |

Seed 1's S5 refused `E_SELF_INTERSECT` (F-WALL: "the trace touches itself after the re-offset and union-simplify rungs") in
both builds on today's tree (§6 (7)).

**2.5 What the build costs** (the measurement's own share): tsx-debug (profiled) ÷ prod (unprofiled) on S8 1.77 / 1.84 / 1.59,
S9 1.79 / 1.60 / 1.71, S5 1.76 / 1.88 / 1.11, S3 1.64 / 2.11 / 0.92 (contended); split on integrated 7 (the quietest runs, all
three profiled): tsx ÷ bundle-debug S8 1.18, S5 1.94, S3 2.10 (keepNames), bundle-debug ÷ prod S8 1.49, S5 1.15, S3 1.12
(assertions). From the profiles, robust to
contention: `__name` is 11.0 – 11.8 % of S8, 12.3 – 12.7 % of S9, 16 – 21 % of S5, 19 – 28 % of S4, 6 – 13 % of S3 (3 seeds),
84 % of site S3 on seed 1; `collect`'s self time in S8 is 32.4 s in the debug bundle against 5.6 s in prod (its debug branch,
§4 C1). At the test size: S8 14.2 s tsx, 12.5 s bundle-debug, 7.0 s prod.

## 3 Hot paths

### 3.1 S8 (the bent-cut fabric; `infill/stage.ts:79` `runS8` → `bentCutFabric.ts:1476` `partition`)

**Dominant path** (prod, integrated 7, 87.5 s; the same on fusion 3 and in tsx): `partition` → the district batch `fn`
(`bentCutFabric.ts:1403`) → `cells.forEach` (`:1417`) → **`ladderOn` (`:1160`) 92 %** → `Run.kerbFace` (`:530`, its
`kerb(this.o, face, …)` at `:532`) **74 %** → `kerb` (`kerb.ts:381`) → `readKerb` (`:358`) → `kerbOf` (`:317`, its
`overlayRegion([rings, parts], …)` at `:327`) → `overlayRegion` (`winding.ts:692`) → **`buildOverlay` (`:106`) 72 %**:
`createPlat` over the whole lattice range (`:150`), `attachIndex` (`:151`), the frame, then **one `insertChain` per input
segment** (`:175`) → `insertChain` (`insertChain.ts:847`) → `attempt` (`:1072`) → `run` (`:882`) → {`routeSegment` (`:745`) →
`routeOne` (`:774`) → `snapRound.route` (`snapRound.ts:514`) 18 %; `rewalk` (`rewalk.ts:118`) 28 % → `reparent` (`:517`) 11 %;
`wholeProblem` (`insertChain.ts:642`) → `clearanceProblem` (`snapRound.ts:383`) 12 %}, every branch ending in `query`
(`query.ts:220`) **45 %** → `collect` (`:178`) 38 % → `gridCandidates` (`grid.ts:102`) 23 %. Shares of S8 (prod i7 / prod f3 /
tsx i7): kerb reads (`kerbFace` + `kerbSeed`) 77.7 / 79.5 / 82.8 %; inside the overlays `insertChain` 98 %, index queries 59 – 60 %
(65 % tsx), `createPlat` + `attachIndex` 0.1 %, winding labels and trace 0.4 %. Outside them: `tryCandidate` 10.3 % (`splitFace`
4.3 % — half of it `opSave` → `takeSavepoint`), `mintOne` → `mint` 6.6 %, `makeBlock` 6.8 % (its `kerbSeed` 3.8 % inside),
`junctionAt` 3.1 %, `spinePortals` 3.7 %, GC 5.9 %; `planCut` 0.3 %, `judge` 0.2 %.

**Top 20, prod** (integrated 7; inclusive from `ladderOn` down, shares of S8's 87.5 s):

| # | inclusive (file:line) | ms | share | self (file:line) | ms | share |
|---|---|---|---|---|---|---|
| 1 | `ladderOn` bentCutFabric.ts:1160 | 80 686 | 92.2 % | `gridCandidates` index/grid.ts:102 | 20 371 | 23.3 % |
| 2 | `kerbFace` bentCutFabric.ts:530 | 64 620 | 73.9 % | `collect` index/query.ts:178 | 5 560 | 6.4 % |
| 3 | `readKerb` arr/kerb.ts:358 | 64 339 | 73.6 % | (garbage collector) | 5 190 | 5.9 % |
| 4 | `kerbOf` arr/kerb.ts:317 | 63 736 | 72.9 % | `query` index/query.ts:220 | 4 731 | 5.4 % |
| 5 | `overlayRegion` arr/winding.ts:692 | 63 445 | 72.5 % | `mint` model/identity/mint.ts:173 | 4 603 | 5.3 % |
| 6 | `insertChain` insert/insertChain.ts:847 | 62 962 | 72.0 % | `rewalk` insert/rewalk.ts:118 | 3 873 | 4.4 % |
| 7 | `buildOverlay` arr/winding.ts:106 | 62 937 | 72.0 % | `walkRing` arena/walk.ts:26 | 3 345 | 3.8 % |
| 8 | `attempt` insertChain.ts:1072 | 61 163 | 69.9 % | `faceWalk` arena/walk.ts:41 | 2 342 | 2.7 % |
| 9 | `run` insertChain.ts:882 | 61 127 | 69.9 % | `gridPut` index/grid.ts:82 | 2 050 | 2.3 % |
| 10 | `query` index/query.ts:220 | 39 477 | 45.1 % | (visit closure) index/query.ts:235 | 1 571 | 1.8 % |
| 11 | `collect` index/query.ts:178 | 32 828 | 37.5 % | `edgeRuns` arena/resolve.ts:123 | 1 473 | 1.7 % |
| 12 | `rewalk` insert/rewalk.ts:118 | 24 846 | 28.4 % | `byOldRing` insert/rewalk.ts:210 | 1 272 | 1.5 % |
| 13 | `routeSegment` insertChain.ts:745 | 21 346 | 24.4 % | `add` model/identity/mint.ts:89 | 1 070 | 1.2 % |
| 14 | `routeOne` insertChain.ts:774 | 21 338 | 24.4 % | `routeRun` index/items.ts:116 | 1 058 | 1.2 % |
| 15 | `gridCandidates` index/grid.ts:102 | 20 510 | 23.4 % | `decimate` insert/decimate.ts:149 | 1 036 | 1.2 % |
| 16 | `route` insert/snapRound.ts:514 | 15 490 | 17.7 % | `clearanceProblem` snapRound.ts:383 | 940 | 1.1 % |
| 17 | `snapRound` snapRound.ts:436 | 11 267 | 12.9 % | `routePieces` index/items.ts:168 | 831 | 0.9 % |
| 18 | `wholeProblem` insertChain.ts:642 | 10 728 | 12.3 % | `gridInsert` index/spatial.ts:233 | 671 | 0.8 % |
| 19 | `clearanceProblem` snapRound.ts:383 | 10 398 | 11.9 % | `neighbours` snapRound.ts:204 | 665 | 0.8 % |
| 20 | `reparent` insert/rewalk.ts:517 | 9 350 | 10.7 % | `run` insertChain.ts:882 | 654 | 0.8 % |

**The same seed in tsx-debug** (154.7 s): self `collect` 20.4 %, `gridCandidates` 16.3 %, GC 6.2 %, `set filename` 5.4 % (+ the
`__name` frames in query.ts, rewalk.ts, stretch.ts, insertChain.ts ≈ 4.6 %), `query` 4.2 %, `mint` 3.6 %, `rewalk` 2.8 %,
`routeRun` 2.6 %; inclusive `readKerb` 80.2 %, `query` 54.2 %, `collect` 46.0 %, `rewalk` 31.4 %, `reparent` 16.8 %. The
callers of `query` inside the overlays (tsx, integrated 4): `reparent` 28.9 %, `clearanceProblem` 24.2 %, `rewalk` 9.1 %,
`attractStretch` 8.8 %, `planAttraction` 7.8 %, `twinOf` 5.9 %, `checkEdge` 4.0 %, `exactCrossings` 3.8 %, `recordHolding` 3.3 %.

**Counts** (exact, precise coverage; integrated 4 / fusion 3; the S8 window):

| what | integrated 4 | fusion 3 | per cut (i4) |
|---|---|---|---|
| cuts (`splitFace`) · face visits (`ladderOn`) | 1 363 · 2 550 | 1 188 · 2 038 | — · 1.9 |
| kerb reads = fresh scratch arenas (`readKerb` = `createPlat` = `buildOverlay`; `kerbFace` + `kerbSeed`) | 2 774 (2 550 + 224) | 2 394 (2 038 + 356) | 2.0 |
| scratch insertions (`insertChain`) | 820 488 | 739 754 | 602 |
| index queries (`query`) · `collect` / `gridCandidates` | 12.97 M · 45.6 M | 11.55 M · 40.5 M | 9 516 |
| box tests (`boxesMeet`) | 311 M | 279 M | 228 000 |
| exact predicates (`orient2d`) | 80.6 M | 71.8 M | 59 130 |
| `rewalk` · `reparent` · `clearanceProblem` | 775 k · 202 k · 1.57 M | 697 k · 183 k · 1.41 M | — |
| face walks (`faceWalk`) | 5.00 M | 4.46 M | 3 670 |
| op savepoints (`takeSavepoint`) · mints (`mint`) | 1 393 · 5 677 | 1 219 · 4 591 | 1.0 · 4.2 |

Per scratch insertion (the harness's kerb-read window, a pure workload): 15.5 queries, 3.5 `collect` calls per query, 88 – 89
`orient2d`, ≈ 75 µs in prod (≈ 140 µs tsx-debug); ≈ 249 – 262 insertions per kerb read.

### 3.2 S5 (growth; `pipeline/base.ts:526` `stageS5`, the step closure `:562`)

**Dominant path** (prod, integrated 7, 2.55 s): `step` → the S5a closure (`base.ts:575`) → `s5aStage(k).run`
(`mainRoads.ts:1178`) → `traceStep` (`:1065`) → `traceStage` (`growth/boundary.ts:429`) 50 % → {`layStrips`
(`enceinte/strips.ts:248`) 32 % → `buffer` (`arr/buffer.ts:337`) → `unionParts` (`:365`) → `overlayRegion` → `buildOverlay`
27.6 %; `traceBase` (`enceinte/trace.ts:114`) 17 % → `sideHolds` (`enceinte/plane.ts:180`) → `segmentDepartureBound` (`:152`) →
`distToRing` (`:118`) 8 – 9 %}; the S5b closure (`:572`) → `mainRoadsStep` (`mainRoads.ts:994`) 22 % (routing `solve`,
`boundaryCrossings`, the roads' insertions); S5d (`:586`) 14.5 %; S5c (`:579`) 6 %. `insertChain` (real arena and overlays) is
38.6 % of S5, `query` 34.3 %.

**Top 20, prod** (integrated 7; shares of S5's 2.55 s):

| # | inclusive (file:line) | ms | share | self (file:line) | ms | share |
|---|---|---|---|---|---|---|
| 1 | `step` pipeline/base.ts:562 | 2 458 | 96.3 % | `walkRing` arena/walk.ts:26 | 230 | 9.0 % |
| 2 | S5a closure pipeline/base.ts:575 | 1 299 | 50.9 % | `segmentDepartureBound` enceinte/plane.ts:152 | 208 | 8.2 % |
| 3 | `run` growth/mainRoads.ts:1178 | 1 299 | 50.9 % | `gridCandidates` index/grid.ts:102 | 191 | 7.5 % |
| 4 | `traceStep` growth/mainRoads.ts:1065 | 1 299 | 50.9 % | `faceWalk` arena/walk.ts:41 | 145 | 5.7 % |
| 5 | `traceStage` growth/boundary.ts:429 | 1 273 | 49.9 % | (garbage collector) | 83 | 3.2 % |
| 6 | `insertChain` insert/insertChain.ts:847 | 986 | 38.6 % | `collect` index/query.ts:178 | 81 | 3.2 % |
| 7 | `attempt` insertChain.ts:1072 | 967 | 37.9 % | `faceMeetsBox` index/query.ts:164 | 80 | 3.1 % |
| 8 | `run` insertChain.ts:882 | 964 | 37.8 % | `query` index/query.ts:220 | 79 | 3.1 % |
| 9 | `query` index/query.ts:220 | 875 | 34.3 % | `rewalk` insert/rewalk.ts:118 | 71 | 2.8 % |
| 10 | `layStrips` enceinte/strips.ts:248 | 813 | 31.9 % | `solve` backbone/route.ts:106 | 67 | 2.6 % |
| 11 | `buffer` arr/buffer.ts:337 | 705 | 27.6 % | `boundaryCrossings` growth/boundary.ts:344 | 64 | 2.5 % |
| 12 | `unionParts` arr/buffer.ts:365 | 705 | 27.6 % | `byOldRing` insert/rewalk.ts:210 | 43 | 1.7 % |
| 13 | `overlayRegion` arr/winding.ts:692 | 704 | 27.6 % | (visit closure) index/query.ts:235 | 42 | 1.6 % |
| 14 | `lines` enceinte/strips.ts:276 | 698 | 27.4 % | `gridPut` index/grid.ts:82 | 40 | 1.6 % |
| 15 | `buildOverlay` arr/winding.ts:106 | 696 | 27.3 % | `sideHolds` enceinte/plane.ts:180 | 33 | 1.3 % |
| 16 | `collect` index/query.ts:178 | 695 | 27.3 % | `allowed` warp/simplify.ts:98 | 30 | 1.2 % |
| 17 | S5b closure pipeline/base.ts:572 | 559 | 21.9 % | `ringMeetsBox` index/query.ts:129 | 30 | 1.2 % |
| 18 | `run` growth/mainRoads.ts:1154 | 559 | 21.9 % | `ratio` num/ratio.ts:15 | 28 | 1.1 % |
| 19 | `mainRoadsStep` growth/mainRoads.ts:994 | 559 | 21.9 % | `distToRing` enceinte/plane.ts:118 | 26 | 1.0 % |
| 20 | `rewalk` insert/rewalk.ts:118 | 442 | 17.3 % | `simplify` warp/simplify.ts:36 | 26 | 1.0 % |

In tsx-debug (5.71 s) the self list opens `collect` 14.6 %, `set filename` 9.2 %, `__name` (`siting/geom.ts`) 6.8 % — 82 % of
S5's `__name` time is `segmentsMeet`'s inner `on` closure (`siting/geom.ts:107`). **Counts** (whole S5, i4 / f3): 106 scratch
overlays (10 `buffer` → `unionParts` trees, fan-in 8, `arr/buffer.ts:352`), 7 789 / 7 473 insertions, 204 k / 202 k queries,
33.6 M / 32.7 M `orient2d`, 11.5 k `pointLocate`; S5c 367 / 366 proposals (321 on i7), all at k = 1 but 4 – 10 at k = 3.

### 3.3 S9 (the harness's `corridorUnion` batches; `arr/corridorUnion.ts:35`)

`corridorUnion` → `bandCore` (`arr/bandUnion.ts:518`) → `writeOutlines` (`:548`) 80 % → `readKerb` per block face (`:560`)
**68.7 %** → the same overlay (67.2 %); the outline pieces' insertion into the real arena ≈ 11 %; digest maintenance at commit
(`ModelDigest.listener`, `digest/levelDigest.ts:644` `updateLevelDigests`) 8.6 % (prod, integrated 7, 33.7 s). Self:
`gridCandidates` 25.1 %, GC 7.3 %, `collect` 6.4 %, `query` 6.2 %. Counts (i4 / f3): 30 / 32 districts, 1 412 / 1 213 kerb
arrangements (one per block seed), 359 k / 325 k insertions, 6.0 M / 5.4 M queries, 60 / 64 savepoints.

### 3.4 S3 (the slice and its commits; `pipeline/base.ts:469`)

Prod, integrated 7 (1.44 s): `commitS3Slice` (`enceinte/commit.ts:220`) → `traceWithStrips` (`:160`) **74.6 %** → `layStrips` 53 %
(`buffer` → overlays 46 %) and `traceBase` 21 % (`sideHolds` 14 %); `s3Slice` (`siting/slice.ts:84`) 18 % (`buildLattice`
`siting/lattice.ts:131` 7 %). The base composes stage 1's wall trace and strips into S3 (`pipeline/base.ts:12 – 13`: "then
stage 1's trace and strips — S5a's at k = 1", C-0226 (2)), so three quarters of S3's stamp is S5a-type work that §12.4's
"slice ≈ 11 ms" does not cost. Counts (i4 / f3): 108 / 110 overlays, 6.7 k / 6.9 k insertions, 145 k / 149 k queries,
8.8 M / 9.3 M `orient2d`.

### 3.5 S6, S4, S1 (the fusion fixture)

**S6** (`districts/stage.ts:459` `runS6`): integrated 4 — `settlementPerimeter` (`districts/perimeter.ts:54`) 84 %: the fast
ring failed the sum check and the full convolution went through `booleans('union', …)` (`perimeter.ts:77`) — one overlay of
up to ≈ 4 000 segments (S6's 4 071 insertions, the district boundaries' among them; super-linear, 3.7); integrated 7 — the fast ring held (perimeter 4.7 %), the district insertions 34 %.
**S4** (`backbone/stage.ts:291` `runS4`): `commitRoutes` (`backbone/commit.ts:294`) 81 % — 16 route chains through `insertChain`
(50 %, their queries 38.5 %); routing itself < 2 %; in tsx `__name` 19 – 28 % (`siting/geom.ts`). **S1** (flat): hydrology 49 %
(`resolveFlats` 22 %, `priorityFlood`, `d8`, `accumulate`), `flatTerrain` 19 %, `siteResources` 9 % — ≈ 1.4 – 2.5 µs per cell
against §12.4's 15.9 – 17.2 ms for ≈ 102 000 hydrology cells (≈ 0.16 µs).

### 3.6 The site harness (relief-60)

**S1:** `waterMask` (`pipeline/base.ts:345`) 64 – 71 % — for every resource cell a `pointLocate` (`:358`) → `query` →
`faceMeetsBox` (`index/query.ts:164`) → `faceRouteRings` / `faceWalk` of every face record meeting the point (the water body
and the land face round it), so each cell walks whole face rings (self: `walkRing` 24 – 28 %, `faceWalk` 17 – 20 %).
**S3, seed 1:** `buildLattice` → `edgeCost` (`siting/lattice.ts:70`) → `segmentMeetsRing(costs.water.faces[w], a, b)` (`:81`;
`siting/geom.ts:116`) for every lattice edge meeting a water face's box — the river's box spans the frame — over every vertex of
the water ring: prod self `segmentMeetsRing` 64 % + `insideRing` 16 % (13.5 s); in tsx 84 % of S3 is `__name` from
`segmentsMeet`'s inner `on` closure (`siting/geom.ts:101 – 107`), 136.7 s — ten times the production bundle. **S3, seed 2, and
S5:** `traceBase` → the F-WALL `reoffset` rung (`enceinte/rungs.ts:89`) 65 % of S3 → `buffer` overlays 42 %; S5 the same path for
the later stages (82 %), departure checks ≈ 10 %.

### 3.7 The overlay engine itself (`<scratch>/scale.mts`, prod bundle, best of 3, CONTENDED)

`buildOverlay` on disjoint 5 m squares: 200 / 400 / 800 / 1 600 / 3 200 segments → 32 / 92 / 182 / 478 / 2 586 ms (160 / 229 /
227 / 299 / 808 µs per segment); on one ring of n segments: 50 / 100 / 200 / 400 / 800 / 1 600 → 4.4 / 8.5 / 21 / 63 / 258 /
624 ms (89 / 85 / 107 / 157 / 323 / 390 µs per segment); a 60 m × 40 m face with its four sides' 3 m buffer parts (87 segments,
a kerb in miniature): 13.9 ms (159 µs per segment). The time per segment grows with the overlay's size: super-linear.

## 4 Cause classes with evidence

**A. ALGORITHMIC (a complexity class):**
* **A1 — kerb(F) rebuilt per face visit and per block (S8, S9).** `kerbOf` (`arr/kerb.ts:317`) builds a fresh arrangement for
  every read (`winding.ts:150 – 184`: a new arena, its index, the frame, then each face-ring and buffer-part segment through
  `insertChain`); S8 reads at every `ladderOn` (`bentCutFabric.ts:1172`) and every split child (`kerbSeed`, `:1093`), S9 again
  for every block (`bandUnion.ts:560`). Counts: 2 774 / 2 394 arrangements in S8 (2.0 per cut), 1 412 / 1 213 in S9; 72 – 80 % of
  S8 and 67 – 69 % of S9. One read (≈ 19 ms prod) costs ≈ 1 600 cuts of §12.4's 12 µs.
* **A2 — the overlay is super-linear in its own size.** Evidence 3.7. Two causes read in the code and the profile: `rewalk`
  walks every level-n cycle through each new edge whole (`rewalk.ts:131 – 141`, `walkRing` at `:137`), and in an overlay built segment by
  segment the touched face is the one big face the growing ring lies in — O(face boundary) per insertion; `reparent`
  (`rewalk.ts:517`) asks `query(p, tx.key, up, box, { faces: true })` over the split parts' whole box (`:545`) and `query`
  collects levels 0 … up (`index/query.ts:233`) while a faces-only query keeps only level-`up` items (`:243`, `lm === level`), so a
  split of the big face scans every level-0 item of the overlay — in an arena that has no level-1 record at all (one level,
  `winding.ts:7 – 9`; `createPlat` makes none, `arena/plat.ts:258`). `reparent` is 10.7 % of S8 and 7.1 % of S9 (prod).
* **A3 — mint's collision rule rescans everything live per call** (`model/identity/mint.ts:183`: `for (const e of live)` builds
  the taken sets afresh; `bentCutFabric.ts:474` `mintOne` calls it once per entity): O(n²) over the stage — 5 677 / 4 591 mints,
  6.6 % of S8 (prod).
* **A4 — an O(arena) savepoint per kernel op**: `opSave` (`faces/common.ts:482`, `image: takeSavepoint(t.plat)` at `:487`) copies
  every column and the index image (`tx/savepoint.ts:112 – 147`) for each `splitFace`: 1 393 / 1 219 per S8, 51 % of `splitFace`,
  2.2 % of S8 — O(cuts × arena) over the stage.
* **A5 — O(samples × ring) departure checks** in the wall trace (`enceinte/plane.ts:118 – 184`: every 1 m, then 10 cm, sample of
  every side against every ring segment): 8 – 14 % of S3 and S5 on the flat fixture, ≈ 10 % on the river site.
* **A6 — site S1 `waterMask`:** a point location per resource cell that walks whole face rings (3.6) — O(cells × ring).
* **A7 — site S3 lattice water test:** O(lattice edges × water-ring vertices) (3.6).
* **A8 — S6's perimeter fallback:** one convolution union of up to ≈ 4 000 segments through the overlay (A2's growth) when the fast
  ring fails (`perimeter.ts:62 – 87`); 78 – 84 % of S6 on integrated 4.

**B. CONSTANT-FACTOR:**
* **B1 — the insertion's per-segment cost.** ≈ 75 µs per two-point scratch insertion in prod (≈ 140 µs tsx-debug): 15.5 index
  queries, ≈ 90 exact `orient2d`, `rewalk`, clearance at level 4 for vertices and for edges per new edge
  (`snapRound.ts:396`, `:403`), a fresh neighbour `Set` per vertex (`:204 – 207`) — against §12.4's ≤ 8 µs per insertion
  (≈ 10× at the cheapest). On the real arena a cut costs ≈ 2.8 ms in `splitFace` (≈ 1.1 ms its insertion, ≈ 1.45 ms the A4
  savepoint) against ≈ 12 µs.
* **B2 — generic index queries.** `gridCandidates` (`grid.ts:102`) is 23 – 25 % self of S8 and S9 in prod: per call a cell
  array, a `seen` `Set`, map lookups and a pass over the level's `large` set (`:122`); 45.6 M calls per S8. A query at level 4
  calls `collect` once per level (`query.ts:233`) though the scratch arena fills level 0 only.
* **B3 — allocation and GC:** 5 – 7 % of S8 and S9 (each query builds a `Set`, a `Map`, three arrays and a stamp object,
  `query.ts:228 – 252`).
* **B4 — S5c growth** ≈ 0.4 – 0.5 ms per proposal (50 – 70× the bar); **B5 — S4**, 16 long chains through the insertion;
  **B6 — S1 on the flat fixture**, ≈ 10× the hydrology row's per-cell rate.

**C. STRUCTURAL (checks, accounting, the measurement):**
* **C1 — the harness measures a debug build.** `arena/debug.ts:4 – 8` ("every source run (vitest, the plat-source condition)
  is a debug build", `assertions = true`); `invariants/debug.ts:15 – 19` turns it off only in a bundle that defines
  `PLAT_DEBUG_BUILD` false, which `scripts/build.mjs:23`'s options do not. Its hot cost is `collect`'s debug branch
  (`query.ts:180 – 207`): a `seen` `Set` per call and two `debugCheck`s per candidate whose template-literal messages are built
  before the call (`:85 – 87`, `:203 – 204`) — `collect` self 32.4 s against 5.6 s in prod (S8, integrated 7); bundle-debug ÷
  prod 1.49 on S8 (both profiled).
* **C2 — tsx's `keepNames`.** tsx 4.23.15 transforms every module with esbuild `keepNames: true` (hard-coded in its loader), so
  each creation of a named inner closure calls `__name` → `Object.defineProperty`: 11 – 28 % of a stage (2.5), 84 % of site S3
  on seed 1. The hot sites: `index/query.ts:101` (`checkBox`'s `ok`), `insert/stretch.ts:221` (`segmentBox`'s `clamp`),
  `siting/geom.ts:107` (`segmentsMeet`'s `on`), `rewalk`'s closures (`rewalk.ts:126` onward) and `insertChain`'s `land`
  (`insertChain.ts:138`). The bundles have none (`__name` count 0).
* **C3 — digest maintenance at commit** in S9: 8.6 %.
* **C4 — the runner** (stage images, stage-end index rebuild, stage roots): ≈ 50 – 70 ms per derivation (`derive:runner`
  window) — negligible; work-limit charging never appears in a top list.

**Per stage:** S8 A1 + A3 + A4 (algorithmic) on B1 – B3, C1 – C2 in the stamp; S9 A1 + A2 on B1 – B3, C3; S5 A2 (strips) + A5
on B1 (S5c, S5b), C2 heavy; S3 as S5a (k = 1) + slice B1, A7 on river sites; S6 B1, or A8 on fallback seeds; S4 B1 + B5, C2
heavy; S1 B6 on flat sites, A6 on river sites.

## 5 Candidate fixes, ranked by estimated gain

Gains are upper bounds read from the prod profiles' shares (a fix removes at most the share it targets); "NO-SHIFT" means the
same outputs by construction (equal model roots), "SHIFT risk" means geometry or goldens could move.

| # | fix | file : function — owning item | estimated gain (reasoning) | behaviour |
|---|---|---|---|---|
| 1 | **kerb(F) without a per-face scratch arrangement** (Q18's change: read the kerb on the real arena's overlay, or derive a child's kerb from its parent's by subtracting the new lane's band locally) | `arr/kerb.ts:317` `kerbOf` / `:358` `readKerb`, `arr/bandUnion.ts:548` `writeOutlines` — **M0-a-09**; `infill/bentCutFabric.ts:530` `kerbFace`, `:607` `kerbSeed` — **M0-b-03**; `arr/winding.ts:106` — M0-a-08 | ≤ 72 – 80 % of S8 and ≤ 67 – 69 % of S9: ≈ 60 – 70 s + ≈ 23 s per CITY seed in prod (S8 ≈ 4.5×, S9 ≈ 3×) if the replacement costs ≤ 5 % of today's read; the only fix that changes S8's order of magnitude | **SHIFT risk:** kerb(F)'s lattice points come from the overlay's attraction and snap rounding (`winding.ts:1 – 25`); another construction must give identical rings or N-52 (1)'s S8 ≡ S9 and the goldens move (KI-13; Q19 is the closing check). A NO-SHIFT first step: memoise `kerbOf` on its exact inputs (a pure function of the face rings and the spine parts — the overlay's arena is built from the operands alone), which removes re-reads of unchanged faces (a `kerbSeed` after its `kerbFace`, S9's read of a block S8 left untouched, the harness's own reads); its gain is the hit rate × the read cost — unmeasured (§6 (4)) |
| 2 | **the overlay's and the index's constant factors:** (a) `reparent` returns at once when the arena holds no live level-(n + 1) record; (b) a faces-only `query` collects level n only, and every query skips levels whose grid and partitions are empty; (c) `gridCandidates` without its per-call `Set` and cell array (a generation-stamped mark array); (d) one neighbour set per vertex in `clearanceProblem` / `twinOf` | `insert/rewalk.ts:517` `reparent`, `insert/snapRound.ts:204 – 222`, `:383` — **M0-a-05**; `index/query.ts:178` `collect`, `:220` `query`, `index/grid.ts:102` `gridCandidates` — **M0-a-03** | (a) alone 10.7 % of S8, 7.1 % of S9, 1 – 3 % of S3/S5; `query` is 45 % of S8 and 49 % of S9 in prod, so (a) – (d) plausibly halve it: S8/S9 −20 … 30 %, the strips' and perimeter overlays alike; also flattens A2 | **NO-SHIFT:** the same items reach every caller in the same canonical order (`query` sorts its answer, `query.ts:248 – 252`); `reparent`'s loop changes nothing when no record exists |
| 3 | **time the product, not a debug source run;** and in code: hoist the hot inner closures; build `collect`'s debug messages only on failure | M0-t-00's timing-phase script (`bench/src/timing-phase/index.ts`, still empty) and M0-f-01's harness (`bench/src/timing/`) against **C-0059** (the bench runs from source through tsx); closures: `index/query.ts:101`, `:180 – 207` — **M0-a-03**; `insert/stretch.ts:221`, `rewalk.ts`, `insertChain.ts:138` — **M0-a-05**; `siting/geom.ts:107` — **M0-c-01** | a measurement correction: the stamped S8/S9 fall 1.6 – 1.8×, S3/S4/S5 up to ≈ 2×, site S3 up to 10× (seed 1) with identical roots; the closure hoists alone remove the keepNames share under tsx (S8 11 %, S4 19 – 28 %, site S3 84 %) and a closure allocation per call in prod | **NO-SHIFT** (roots identical across the three builds on 5 seeds and the test size); a choices row for the timing configuration (§6 (1)) |
| 4 | **mint against a kept taken-set** (incremental collision rule) | `infill/bentCutFabric.ts:474` `mintOne` — **M0-b-03**; or an incremental entry in `model/identity/mint.ts:173` `mint` — **M0-d-05a** | 6.6 % of S8 in prod (≈ 5.8 s); quadratic in the town, so it grows faster than S8 | **NO-SHIFT:** the rule reads only the set's contents |
| 5 | **op savepoints by journal** (undo the op's own writes instead of imaging the arena) | `faces/common.ts:482` `opSave` — **M0-a-07**; `tx/savepoint.ts:112` `takeSavepoint` — **M0-a-06** | 2.2 % of S8 (≈ 1.9 s), 51 % of `splitFace`; quadratic in the town | **NO-SHIFT** if the rollback is exact (it runs only on a refused op) — the savepoint's identity pins (N-55 (6)) hold it |
| 6 | **index the ring for the wall trace's departure checks** | `enceinte/plane.ts:118` `distToRing`, `:152` `segmentDepartureBound`, `:180` `sideHolds` — **M0-c-02** | S3 −8 … 14 %, S5 −8 %, site S3/S5 −10 % | **NO-SHIFT:** the same minimum distance |
| 7 | **rasterise the water once for `waterMask`** (a scanline fill of the water faces' rings) | `pipeline/base.ts:345` `waterMask` — **M0-x-04** | site S1 −64 … 71 % (S1 2.8 – 11.6 s in prod) | **NO-SHIFT** if a cell centre on a shore edge or vertex stays land (`base.ts:340 – 343`) |
| 8 | **a segment index over the water rings for the lattice's edge costs** | `siting/lattice.ts:70` `edgeCost`, `siting/geom.ts:116` `segmentMeetsRing` — **M0-c-01** | site S3 −80 % on seed 1 (13.5 s prod, 137 s tsx) | **NO-SHIFT:** the same exact predicate on fewer pairs |
| 9 | **the wall strips without the general overlay** (strips and the F-WALL re-offset as direct offset rings) | `enceinte/strips.ts:248` `layStrips`, `enceinte/rungs.ts:89` `reoffset` — **M0-c-02**; `arr/buffer.ts:337` — **M0-a-08** | S3 −47 %, S5 −28 % (flat); site S3 −42 … 65 % | **SHIFT risk:** the strips' lattice points are the overlay's today |
| 10 | **keep S6's fast perimeter ring on more seeds**, else a cheaper union for the convolution | `districts/perimeter.ts:54` `settlementPerimeter` (C-0245 (1)) — **M0-e-04** | S6 −84 % on fallback seeds (integrated 4: 3.1 s → ≈ 0.5 s) | NO-SHIFT only where the fast ring passes `isSumRing` exactly as now; widening it is a SHIFT |
| 11 | **digest maintenance batched per stage** | `digest/levelDigest.ts:644` `updateLevelDigests`, the model digest's listener — **M0-d-04** | S9 −8 % | NO-SHIFT (the same roots) |

**Are §12.4's budgets reachable by constant-factor work on the current algorithms? No.** S8 (3 954 – 7 820×) and S9 (1 327 –
2 531×) are not: even the production bundle spends ≈ 65 ms per cut against 12 µs, and removing every constant factor of the
overlay (fixes 2 – 3) still leaves ≈ 2 400 – 2 800 fresh arrangements of ≈ 250 – 300 segments per CITY derivation in S8 and
≈ 1 200 – 1 400 more in S9; S8's remainder after fix 1 (≈ 20 s in prod: the real-arena insertions, A3, A4) is itself 1 000× over. S1 and S3 on river
sites are not (A6, A7). S3, S5 and S6 on the flat fixture (26 – 210× in prod) need A2/A5/A8 removed (fixes 2, 6, 9, 10) and then a
kernel insertion 10 – 60× faster than today's ≈ 75 µs per segment and ≈ 0.5 ms per proposal; S1 on the flat fixture (6 – 9×) and
S4 (24 – 41× in prod) are constant-factor misses. The order the evidence gives: fix 1 (algorithmic, a design ruling first — §6
(5)), then 2, 4, 5 (NO-SHIFT), then a production-bundle re-measure (3) before any §12.4 re-declaration; M0.md §1 (a)'s ladder
(C-0098: one optimisation pass worth ≤ 2×, then the WebAssembly accelerator, then for the arrangement bars Clipper2-WASM as the
only engine, a declared golden shift, else D-18) and the fusion gate's `secondary` switch cannot close a 10³ – 10⁴ gap on
their own — the switch thins S5's extramural growth while S8 is 97 % of the gate.

## 6 Open questions

1. **Which build does the timing phase time?** C-0059 runs the bench from source through tsx; a source run is a debug build
   (`arena/debug.ts:4 – 5`) with tsx's keepNames; §12.4 budgets the product. On these seeds a production bundle of the same
   sources gives identical roots and 1.6 – 1.8× less on S8/S9. M0-t-00 (whose script is still unbuilt) and M0-f-01 need a
   choices row: time a `PLAT_DEBUG_BUILD=false` bundle, or say the figure is a debug source run's.
2. **§12.4's S5 row costs ≈ 5 000 proposals at ≤ 8 µs;** the CITY seeds make 321 – 367, and S5's time is in S5a (traces and
   strips), S5b (main roads) and S5d (capacity), which the row does not cost. Which rows own them — S5's, or the S3 slice's
   (stage 1's trace and strips run inside S3's stamp, `pipeline/base.ts:12 – 13`)?
3. **S3's stamp ≠ §12.4's slice:** 75 % of the harness's S3 is stage 1's wall trace and strips (S5a's at k = 1). R12-4's report
   (C-0084) compares the whole stamp with the slice's 11 ms; a split stamp (slice / commit + trace + strips) would make the row
   honest.
4. **The kerb memo's hit rate** (fix 1's NO-SHIFT step): how many of S8's 2 774 and S9's 1 412 reads see inputs a previous read
   saw? A counting run in a scratch mirror (hash of `kerbOf`'s inputs per read) answers it before any design work.
5. **The design route for fix 1:** Q18's "the kerb on the real arena's overlay" (N-56 §7), an incremental kerb per cut, or the
   pre-decided arrangement fallback (Clipper2-WASM as the only engine, §3.7 (ii), a golden shift) — each moves S8 ≡ S9's exactness
   argument (N-52 (1), KI-13) differently; a ruling seat's.
6. **Q49:** the 1 000-seed fusion run on a production bundle would take ≈ 56 – 62 % of the tsx time (S8 + S9 per seed 112 – 124 s
   against 183 – 220 s), with identical roots on every seed checked here — worth a choices row before the long run.
7. **relief-60 seed 1, today's tree:** S5 refuses `E_SELF_INTERSECT` (F-WALL, after the re-offset and union-simplify rungs) in
   both builds; M0-e-06.json (its file dated 15:00, an older tree) shows relief-60 S5 refused `E_INVARIANT` on 1 of 8. Not judged here;
   for M0-e-06's re-run and the refusal census (J264).
8. **S6's fast ring** fails `isSumRing` on integrated 4 and holds on integrated 7; how often over the 50 seeds (the summary's S6
   p50 0.78 s, p99 6.5 s suggests a minority) and why — M0-e-04's.
