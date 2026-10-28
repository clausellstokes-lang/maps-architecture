# S8's per-cut cost after Q18 — the CITY profile re-run (seat R7; Q120, KI-12)

Seat R7 of the Maps programme (a measurement seat; parent `session_019yED1RC11y49BWLSYN3Wpo`), in a cloud container —
Linux x64, 4 cpu (Intel Xeon Processor @ 2.80GHz), 15 GiB, Node v24.12.0, V8 13.6.233.17-node.37 — on the tree
`4abd334ad145eb9461d7ea37caeb2b3cdc6ccd9e` (a detached worktree), 2026-10-28 07:21 – 08:15 UTC. It changed no code: every
driver, bundle, profile and analyser lives in the seat's scratch (`<scratch>` below); the tree carries only this file.
**Every timing here is IDLE**: one process at a time, nothing else on the box; the one-minute load was 0.25 – 0.28
before each run (`/proc/loadavg`, read by the run script) and 1.0 – 1.7 during it — the run's own process and its GC
threads (load logs `<scratch>/city/*.loadlog`). One run per build and mode; the conclusions rest on shares, exact counts
and the in-run timeline, the wall-clocks on single IDLE runs.

## 0 Summary

1. **Q-a — S8 still misses §12.4's ≈ 12 µs a cut by four orders.** Fusion 3 at CITY, 1 216 cuts (`splitFace` calls;
   1 205 lanes, no `connectHole`): **prod 143.1 s = 117.7 ms a cut (9 800×)**, tsx-debug 216.8 s = 178.3 ms a cut
   (14 900×), both unprofiled; profiled 164.0 s / 241.7 s (134.9 / 198.8 ms a cut). Integrated 4 (prod, profiled):
   215.5 s over 1 378 cuts = 156.4 ms a cut. The gate S4 + S5 + S8 is 148.7 s prod, 225.7 s tsx (1 487× / 2 257× the
   100 ms bar); S8 is 96 % of it. The tsx figure agrees with Q120's `--timing` (S8 237 – 244 s, ≈ 200 ms a cut).
2. **Q-a — against the 2026-10-13 profile, the per-cut cost ROSE, it did not fall:** then (CONTENDED, another tree,
   root `2a66b33b…1cb`) fusion 3 cost 67 ms a cut in prod and 106 ms a cut in tsx-debug (profiled); now 117.7 ms (prod,
   plain) and 198.8 ms (tsx, profiled) — 1.76× and 1.88×. The model root moved too (fusion 3 now
   `7bf09771f39186df5bf0ba2e0ea7eec4`, integrated 4 `d4e05ae1cc97e9d3d76c0a8af3a73f99`; identical across both builds and
   all three modes) — the tree is not the profiled one, so this is no clean A/B of Q18 alone (the a-09 rounds S14 – S17,
   the faithful read, landed between).
3. **Q-b — the kerb read is still the stage:** `readKerb` (`arr/kerb.ts:2153`) is **81.3 %** of S8 (prod f3; 77.4 %
   i4; 84.4 % tsx). Q18 removed the scratch arenas — `createPlat`, `buildOverlay`, `overlayRegion`: **0 calls** in S8 —
   and in their place each read is a DRY-RUN on the real arena: `opSave` → `insertTx` → `dryInsert` (`:1401`) →
   **`insertChain` per part (49.1 % of S8)** → `rewalk` 13.5 %, `reparent` 6.9 %, the index queries under the read
   36.4 % → `dryRegion` 3.3 % → `dryClose` → `rollback` (`faces/common.ts:486`) → `putBack` → **`restoreIndex`
   (`tx/savepoint.ts:76`) 17.0 %**.
4. **Q-b — Q18 traded one cost for another (the previous §0 items 2, 3, 9):** insertions per cut fell 623 → 85.4 (7.3×)
   and the arrangements per cut 2.0 → 0, but each insertion now runs against the whole real arena's index: 37.5 queries
   per insertion (was 15.6), 76.6 box tests per query (was 24.2), ≈ 0.8 ms per read insertion in prod (was ≈ 75 µs in a
   scratch arena), ≈ 48 ms per read (was ≈ 19 ms). And the O(arena) savepoint the old profile counted once per cut
   (A4, 2.2 %) is now taken and put back **once per read**: 4 015 images, 2 775 restores, **24.9 % of S8** (prod f3;
   26.7 % i4; 18.5 % tsx). The mint's live-list scan (A3, 6.6 % then) is gone — Q70's `LiveIndex.relevant` — 0.1 %.
   `planCut` 0.3 % (+ the layout planner 0.6 %), `judge` 0.2 %, the cut's own `splitFace` 5.0 % (its insertion 2.1 %,
   its savepoint 2.5 %).
5. **Q-b — self time:** `gridCandidates` (`index/grid.ts:102`) 20.5 %, `restoreIndex` 16.7 %, `collect`
   (`index/query.ts:178`) 8.0 %, GC 6.3 %, `query` 4.4 %, `imageIndex`'s copy closures (`tx/savepoint.ts:55, 58, 69`)
   6.5 %; by file `tx/savepoint.ts` **24.9 %**, `index/grid.ts` 21.6 %, `index/query.ts` 14.7 %, `arr/kerb.ts` 7.5 %.
6. **Q-c — the cost per cut GROWS over the stage — the quadratic signature.** Windows of 100 cuts (logpoints at the
   `splitFace` call): fusion 3 prod 103 → 110 → 97 → 104 → 106 → 132 → 125 → 145 → 155 → 141 → 171 → 220 ms a cut
   (least squares 86.0 + 8.73 ms per window); integrated 4 prod 91 → 245 ms (83.5 + 11.44 per window); tsx 145 → 278 ms.
7. **Q-c — the growth is the per-read savepoint.** Its share per cut climbs 4.5 → 74.2 ms (fusion 3; slope 6.14 ms a
   window, **70 % of the total slope**) and 3.7 → 88.5 ms (integrated 4; 6.85, 60 %); the restore alone 0.9 → 25.6 ms
   per read (28×). `restoreIndex` rebuilds every dynamic-grid cell set, the `large` set, the entries and `byKey` per
   level, and `imageIndex` copies them, at every read; the dynamic grid holds what was added since the last static
   build, which S8's own work keeps filling (inferred from the code and the slope; the grid's size was not counted).
   The rest grows slower (98 → 146 ms a cut fitted 87 → 115; the read's insertions 30 → 39 ms per read; GC 3.4 →
   13.3 ms a cut).
8. **Q-d — the counts (fusion 3, prod, precise coverage):** per cut 0 scratch arenas, **2.28 dry-runs** on the real
   arena (2 771 `readOn`; 2 752 `kerb` calls: 2 078 `kerbFace`, 364 `kerbSeed`, the rest `makeBlock`'s), **85.4
   `insertChain`**, 86.8 `rewalk`, 73.3 `reparent`, **3 204 index queries**, 13 570 `collect` = `gridCandidates`,
   245 291 box tests (`boxesMeet`), 67 181 `orient2d`, 2 014 `faceWalk`, 3.3 savepoint images, 2.3 restores, 3.9 mints.
9. **Q-e — the production bundle gains 1.51×** on S8 (216.8 → 143.1 s, unprofiled; 1.47× profiled) with the same root
   — less than the 1.6 – 1.8× of 2026-10-13: the savepoint copies and the index's set work are as costly in either
   build; tsx's `__name` is 6.5 % of S8 (11 % then).
10. **Q-f — what it would take:** three algorithmic changes, in order of their term — (i) **a savepoint of O(change)**
    for the dry-run and the op (undo the read's own writes; ≈ 25 % of S8 on average and the whole quadratic term, ≈
    29 ms a cut, up to ≈ 75 – 90 ms at the stage's end); (ii) **an incremental kerb** maintained per face, the child's
    kerb derived from the parent's at the cut, never inserted into the real arena (the read's insertions, region and
    labels: ≈ 59 % of S8, ≈ 69 ms a cut); (iii) the index's `large`-set and per-level scans out of every query
    (`gridCandidates` 20 % self, mostly inside (ii)'s work). After (i) + (ii) the estimate is **≈ 12 – 16 ms a cut —
    ≈ 1 000 – 1 350× the 12 µs, still ≈ 100× over the 10× band (≤ 120 µs)**: the cut's own real-arena insertion (≈ 2.5
    ms) and the fabric's per-face-visit work outside the kernel (≈ 8 – 9 ms: `tryOn`, `ladderOn`, `deepInterior`,
    `sides`, `spinePortals`, `pointLocate`, `makeBlock`) and GC remain; reaching the band needs those ≈ 100× cheaper as
    well — a design question for the kernel's §3.7 kerb service and §3.4 savepoints and for M0-b-03's ladder (§5).

## 1 Method

**1.1 The tree and the builds.** `git -C /home/user/maps-architecture fetch --depth=1 origin 4abd334…` and
`git worktree add --detach /home/user/maps-scratch/profile-s8 4abd334…` (HEAD checked); `corepack pnpm install
--frozen-lockfile` and `corepack pnpm build` in `plat/` (both exit 0); Node 24.12.0 by `tools/session/child-recipe.md`
step 2. **(a) tsx-debug:** `cd plat && node_modules/.bin/tsx --conditions=plat-source <scratch>/driver.mts …` — the
bench's own loader and condition (tsx 4.23.15), a debug build (`arena/debug.ts`) with tsx's `keepNames`. **(b) prod:**
`<scratch>/build-bundle.mjs` — esbuild 0.28.2 (plat's), `bundle`, `format esm`, `target es2022` (as
`scripts/build.mjs:31`), `platform node`, `conditions plat-source`, no keepNames, inline source map, `playwright-core`
external, `import.meta.url` replaced per module by its own file URL, and **`define PLAT_DEBUG_BUILD=false`** (the
production bundle `kernel/src/invariants/debug.ts:15` names; `DEBUG_BUILD = false` checked in the bundle, `__name`
count 0).

**1.2 The driver** (`<scratch>/driver.mts`, verbatim in the APPENDIX) runs the fusion harness's own single-seed entry
`derive(run, seed)` (`bench/src/fusion/runs.ts:332`) — the registry, the harness's instruments and stage stamps as
`timeFusionGate` (`bench/src/fusion/timing.ts:55`) runs it — with every registered stage's `run` wrapped once more
through `derive`'s `plant` hook (before the harness's own `instrument`, `runs.ts:336`) by `process.hrtime` marks.
Modes: `cpu` — the inspector's `Profiler` (500 µs sampling) started right before S8's run and stopped right after it;
`plain` — the marks only; `count` — `Profiler.startPreciseCoverage {callCount: true}` from the start, taken (and so
reset) at every stage boundary, the S8 window kept. `--cuts` — **the per-cut timeline without a code change**:
`Debugger.setBreakpoint` at four call sites in `bentCutFabric.ts`, each with a condition that records an hrtime stamp
and returns false (no pause): `splitFace(run.o, fv.face, …)` (`:846`), `connectHole(…)` (`:838`), `kerb(this.o, face,
…)` in `kerbFace` (`:653`) and `kerb(o, face, …)` in `kerbSeed` (`:729`); armed at S8's start, in the cpu runs. The
sites are found by pattern in the generated source (tsx minifies whitespace; esbuild renames `run` → `run4`). S9's
batches are skipped (the gate is S4 + S5 + S8).

**1.3 Runs** (`<scratch>/run1.sh`: waits for the one-minute load < 0.3, logs the load every 30 s; each run one
background process, one at a time), all at CITY (the flat fixture, 2 500 ha, 220 ha walled):

| run | build · mode | S8 (marks) | S1 · S3 · S4 · S5 (· S6) ms | load before → max during | root |
|---|---|---|---|---|---|
| fusion 3 | tsx · cpu + cuts | 241 700 ms | 276 · 4 092 · 908 · 8 536 | 0.25 → 1.21 | `7bf09771…0eea7eec4` |
| fusion 3 | prod · cpu + cuts | 164 009 ms | 360 · 2 802 · 464 · 5 031 | 0.28 → 1.41 | `7bf09771…0eea7eec4` |
| fusion 3 | tsx · plain | 216 779 ms | 239 · 4 359 · 737 · 8 228 | 0.27 → 1.57 | `7bf09771…0eea7eec4` |
| fusion 3 | prod · plain | 143 124 ms | 222 · 3 324 · 427 · 5 154 | 0.27 → 1.37 | `7bf09771…0eea7eec4` |
| fusion 3 | prod · count | 524 446 ms (never a timing) | 886 · 21 357 · 2 108 · 42 251 | 0.27 → 1.04 | `7bf09771…0eea7eec4` |
| integrated 4 | prod · cpu + cuts | 215 522 ms | 247 · 3 027 · 468 · 5 315 · 6 596 | 0.28 → 1.68 | `d4e05ae1…a73f99` |

**1.4 Faithfulness.** Each seed's model root (`hex(d.model.root)`, as `measure.ts:744` prints it) is identical across
the builds and the modes; lanes 1 205 / blocks 1 055 (fusion 3) in every run; the logpoint counts equal in both builds
(2 078 / 364 / 1 216) and equal the coverage counts (`kerbFace` 2 078, `kerbSeed` 364, `splitFace` 1 216). The roots
differ from the 2026-10-13 profile's (fusion 3 `2a66b33b…1cb`, integrated 4 `239a913f…22852`): the tree has moved; not
a fault. At the test size (900 ha / 30 ha, the tooling check) fusion 3's root is `421f90d3a16dc842dda6710ba2a1a181` in
both builds and all modes. The profile's start and end enclose S8's marks (prod f3: start 996 858 839 µs ≤ S8 t0
997 105 662 µs, end 1 161 115 278 ≥ t1 1 161 114 245): the marks and the profile share the monotonic clock; only the
samples inside the marks are counted (`Profiler.start`'s own code logging, ≈ 0.25 s, lies before).

**1.5 Measurement overhead.** Profiling + the logpoints cost 14.6 % on S8 in prod (164.0 / 143.1 s) and 11.5 % in tsx
(241.7 / 216.8 s); shares are read from the cpu runs, wall-clocks from the plain runs.

**1.6 Analysers** (verbatim in the APPENDIX): `analyse.mjs` (the S8 window: self time per function and per file,
inclusive time per function once per sample, the heaviest path, named functions' inclusive times, joint times "B below
A", the windows of 100 cuts, `--exclude`; every frame mapped to its TypeScript file:line through the generated
sources' inline source maps — read back with the inspector's `Debugger.getScriptSource` — and plat's `source-map-js`
1.2.2), `counts.mjs` (the count run's S8 window per function, mapped the same way), `growth.mjs` (the windows' split
and least-squares lines). Bundle names carry esbuild's collision suffixes: `run4` = `insertChain.ts:1141`'s `run`,
`attempt3` = `:1425`'s `attempt`, `rollback2` = `faces/common.ts:486`'s `rollback` (`rollback` alone is
`insertChain.ts:707`'s), `planCut2` = `layout/infill/planner.ts:1072`'s; `set Navigator` is V8's name for the native
`defineProperty` under tsx's `__name`. `kerbFace` and `kerbSeed` are inlined by V8 (0 % in the profile lists; their
counts come from coverage and the logpoints).

## 2 Where the time goes (Q-b)

**2.1 Dominant path** (prod, fusion 3, 164.0 s profiled; the same on integrated 4 and in tsx): `runS8`
(`layout/infill/stage.ts:82`) → `partition` (`bentCutFabric.ts:1669`) → the district batch (`:1602`, `:1616`) →
**`ladderOn` (`:1347`) 92.2 %** → `kerb` (`arr/kerb.ts:2226`) → **`readKerb` (`:2153`) 81.3 %** → `readOn` (`:1918`)
79.5 % → {`censusRead` (`:1725`) 62.4 % → `dryInsert` (`:1401`) 58.2 % → **`insertChain` (`insert/insertChain.ts:1106`)
49.1 %** → `passes` (`:1453`) → `attempt` (`:1425`) → `run` (`:1141`) → {`routeSegment` (`:855`) → `routeOne` (`:887`)
→ `readings` (`:958`) → `routed` (`:921`) → `snapRound` → `route` (`snapRound.ts:539`) 13.8 %; `rewalk`
(`rewalk.ts:118`) 13.5 % → `reparent` (`:517`) 6.9 %}, every branch ending in `query` (`index/query.ts:220`) **36.4 %**
→ `collect` (`:178`) → `gridCandidates` (`index/grid.ts:102`); `dryRegion` (`kerb.ts:1490`) 3.3 %; `opSave`
(`faces/common.ts:459`) → `takeSavepoint` → `image` / `imageIndex` 5.4 %} and `dryClose` (`kerb.ts:866`) → `rollback`
(`faces/common.ts:486`) → `restoreSavepoint` → `putBack` (`tx/savepoint.ts:238`) → **`restoreIndex` (`:76`) 17.0 %**.
Outside the read: `tryOn` (`bentCutFabric.ts:1400`) 5.6 %, `splitFace` (`faces/split.ts:170`) 5.0 % (its `opSave`
2.5 %, its `insertChain` 2.1 %), `makeBlock` (`:1174`) 9.0 % of which its `kerb` 7.4 %, `spinePortals` 1.0 %,
`pointLocate` 1.2 %, GC 6.3 %.

**2.2 Top 20, prod** (fusion 3; inclusive from `ladderOn` down; shares of S8's 164 009 ms):

| # | inclusive (file:line) | ms | share | self (file:line) | ms | share |
|---|---|---|---|---|---|---|
| 1 | `ladderOn` infill/bentCutFabric.ts:1347 | 151 192 | 92.2 % | `gridCandidates` index/grid.ts:102 | 33 545 | 20.5 % |
| 2 | `kerb` arr/kerb.ts:2226 | 133 283 | 81.3 % | `restoreIndex` tx/savepoint.ts:76 | 27 413 | 16.7 % |
| 3 | `readKerb` arr/kerb.ts:2153 | 133 258 | 81.3 % | `collect` index/query.ts:178 | 13 070 | 8.0 % |
| 4 | `readOn` arr/kerb.ts:1918 | 130 466 | 79.5 % | (garbage collector) | 10 265 | 6.3 % |
| 5 | `censusRead` arr/kerb.ts:1725 | 102 367 | 62.4 % | `query` index/query.ts:220 | 7 188 | 4.4 % |
| 6 | `dryInsert` arr/kerb.ts:1401 | 95 455 | 58.2 % | (closure) tx/savepoint.ts:58 (`imageIndex`) | 4 246 | 2.6 % |
| 7 | `insertChain` insert/insertChain.ts:1106 | 83 999 | 51.2 % | (closure) tx/savepoint.ts:55 (`imageIndex`) | 3 562 | 2.2 % |
| 8 | `passes` insertChain.ts:1453 | 82 295 | 50.2 % | `walkRing` arena/walk.ts:26 | 2 960 | 1.8 % |
| 9 | `attempt` insertChain.ts:1425 | 82 264 | 50.2 % | (closure) tx/savepoint.ts:69 (`imageIndex`) | 2 866 | 1.7 % |
| 10 | `run` insertChain.ts:1141 | 81 471 | 49.7 % | `faceWalk` arena/walk.ts:41 | 2 492 | 1.5 % |
| 11 | `query` index/query.ts:220 | 64 535 | 39.3 % | `run` insertChain.ts:1141 | 2 307 | 1.4 % |
| 12 | `collect` index/query.ts:178 | 55 457 | 33.8 % | `rewalk` insert/rewalk.ts:118 | 1 788 | 1.1 % |
| 13 | `gridCandidates` index/grid.ts:102 | 33 757 | 20.6 % | `clipToWindow` arr/kerb.ts:952 | 1 749 | 1.1 % |
| 14 | `routeSegment` insertChain.ts:855 | 32 140 | 19.6 % | (visit closure) index/query.ts:235 | 1 732 | 1.1 % |
| 15 | `readings` insertChain.ts:958 | 32 083 | 19.6 % | `image` tx/savepoint.ts:160 | 1 708 | 1.0 % |
| 16 | `routeOne` insertChain.ts:887 | 29 374 | 17.9 % | `routeRun` index/items.ts:116 | 1 436 | 0.9 % |
| 17 | `rollback` faces/common.ts:486 | 28 029 | 17.1 % | `ladderOn` bentCutFabric.ts:1347 | 1 304 | 0.8 % |
| 18 | `putBack` tx/savepoint.ts:238 | 27 918 | 17.0 % | `dryInsert` arr/kerb.ts:1401 | 1 276 | 0.8 % |
| 19 | `restoreIndex` tx/savepoint.ts:76 | 27 803 | 17.0 % | `gridPut` index/grid.ts:82 | 1 062 | 0.6 % |
| 20 | `tryOn` infill/bentCutFabric.ts:1400 | 26 339 | 16.1 % | `tryOn` bentCutFabric.ts:1400 | 1 011 | 0.6 % |

Self time by file (prod f3): `kernel/tx/savepoint.ts` 24.9 %, `kernel/index/grid.ts` 21.6 %, `kernel/index/query.ts`
14.7 %, `kernel/arr/kerb.ts` 7.5 %, GC 6.3 %, `kernel/insert/insertChain.ts` 3.8 %, `kernel/arena/walk.ts` 3.7 %,
`kernel/insert/snapRound.ts` 2.0 %, `kernel/insert/rewalk.ts` 2.0 %, `layout/infill/bentCutFabric.ts` 2.0 %.

**2.3 The same seed in tsx-debug** (241.7 s profiled): self `gridCandidates` 16.8 %, `restoreIndex` 12.9 %, `collect`
12.4 % (its debug branch), GC 5.9 %, `query` 3.9 %, `set Navigator` (`__name`) 3.2 %, flatbush `search` 3.1 %,
`routeRun` 2.3 %, `imageIndex`'s closures (`savepoint.ts:58`, `:55`, `:69`) 4.4 %, `walkRing` 1.4 %, `isItemLive`
1.2 %; by file `tx/savepoint.ts` 18.5 %, `index/query.ts` 18.4 %, `index/grid.ts` 17.8 %. Inclusive: `readKerb` 84.4 %,
its insertions 59.2 %, `query` 46.1 %, `rewalk` 18.6 %, `reparent` 11.6 %, savepoint machinery 18.5 %, `__name` 6.5 %.

**2.4 The named terms** (inclusive shares of S8; prod fusion 3 / prod integrated 4 / tsx fusion 3; "A > B" = B on the
stack below A):

| term | functions | prod f3 | prod i4 | tsx f3 |
|---|---|---|---|---|
| the kerb read, whole | `readKerb` (kerb.ts:2153) | 81.3 % | 77.4 % | 84.4 % |
| — its insertions on the real arena | `readKerb > insertChain` | 49.1 % | 43.9 % | 59.2 % |
| — the index queries under it | `readKerb > query` | 36.4 % | 33.0 % | 43.4 % |
| — `rewalk` · `reparent` under it | `readKerb > rewalk` · `> reparent` | 13.5 % · 6.9 % | 13.4 % · 7.1 % | 18.2 % · 11.4 % |
| — the region traced | `dryRegion` (kerb.ts:1490) | 3.3 % | 3.1 % | 2.8 % |
| — its savepoint (image · put back) | `readKerb > opSave` · `rollback`/`putBack` | 5.4 % · 17.0 % | 5.7 % · 18.5 % | 3.7 % · 13.1 % |
| the savepoint machinery, all | `opSave` + `putBack` | 24.9 % | 26.7 % | 18.5 % |
| the cut's own op | `splitFace` (faces/split.ts:170) | 5.0 % | 4.7 % | 4.3 % |
| — its insertion · its savepoint | `splitFace > insertChain` · `> opSave` | 2.1 % · 2.5 % | 1.8 % · 2.5 % | 2.1 % · 1.6 % |
| the mint | `mint` · `mintOne` · `LiveIndex.relevant` | 0.1 % · 0.1 % · 0.1 % | 0.1 % · 0.1 % · 0.1 % | 0.1 % · 0.1 % · 0.0 % |
| planning · judging | `planCut` (kernel) + `planCut2` (planner.ts:1072) · `judge` | 0.3 % + 0.6 % · 0.2 % | 0.3 % · 0.2 % | 0.8 % · 0.1 % |
| the block's read | `makeBlock` · its `kerb` | 9.0 % · 7.4 % | 5.0 % · 3.9 % | 8.4 % · 7.2 % |
| GC · tsx `__name` | | 6.3 % · — | 6.5 % · — | 5.9 % · 6.5 % |

**2.5 Outside the read** (prod fusion 3, `--exclude readKerb`): 30.7 s of 164.0 s (18.7 %) — GC 10.3 s (6.3 %),
`runS8`'s own 20.0 s (12.2 %): `tryOn` 9.2 s (its `splitFace` 8.2 s: `opSave` 4.0 s, `insertChain` 3.4 s), the rest of
`ladderOn` 8.7 s (self 1.3 s, `deepInterior.ts` `signedDistance` / `localThickness` / `push` 1.1 s, `sides.ts` 0.6 s,
`side-runs.ts` 0.4 s, `pointLocate` 2.0 s, `spinePortals` 1.6 s), `makeBlock` outside its read 2.6 s, the level digest at
commit 1.0 s; `planCut` 0.46 s + 0.92 s, `judge` 0.26 s, `mint` 0.15 s.

## 3 The asymptotic term (Q-c)

**3.1 The timeline.** The logpoints stamp every `splitFace` call and every kerb read on the profile's clock; the S8
window is cut every 100 cuts and each window's samples are summed by function (`analyse.mjs --window 100`, then
`growth.mjs`). "Savepoint" = `opSave` (the image, under the reads and `splitFace`) + `putBack` (the restore, under the
reads' `rollback`).

Fusion 3, prod (profiled; 12 windows of 100 cuts, ≈ 200 reads each):

| window | ms / cut | savepoint ms / cut | rest ms / cut | read insertions ms / read | `gridCandidates` ms / read | restore ms / read | GC ms / cut |
|---|---|---|---|---|---|---|---|
| 0 | 103.0 | 4.5 | 98.4 | 31.7 | 11.2 | 0.9 | 3.8 |
| 1 | 110.2 | 7.7 | 102.5 | 36.1 | 14.4 | 2.0 | 5.2 |
| 2 | 97.4 | 11.7 | 85.7 | 31.6 | 12.0 | 3.7 | 4.9 |
| 3 | 104.4 | 16.1 | 88.3 | 30.6 | 11.6 | 4.9 | 6.0 |
| 4 | 105.8 | 29.1 | 76.7 | 24.1 | 9.6 | 10.5 | 6.3 |
| 5 | 131.8 | 24.1 | 107.7 | 38.8 | 15.5 | 8.0 | 7.7 |
| 6 | 125.0 | 28.0 | 96.9 | 33.2 | 13.7 | 9.5 | 8.1 |
| 7 | 144.5 | 33.4 | 111.1 | 37.6 | 15.0 | 10.8 | 9.4 |
| 8 | 154.8 | 49.1 | 105.7 | 36.1 | 14.6 | 17.5 | 10.4 |
| 9 | 141.0 | 53.8 | 87.2 | 27.6 | 11.0 | 18.4 | 11.1 |
| 10 | 170.5 | 64.7 | 105.8 | 35.0 | 15.4 | 22.8 | 12.4 |
| 11 | 219.9 | 74.2 | 145.7 | 50.0 | 21.5 | 25.6 | 14.6 |
| (12: 16 cuts) | 198.9 | | | | | | |

Least-squares lines over the windows (ms per window index): **ms / cut 86.0 + 8.73**; savepoint −0.7 + **6.14**; rest
86.7 + 2.59; read insertions per read 30.0 + 0.79; `gridCandidates` per read 11.0 + 0.50; restore per read −0.8 + 2.19;
GC 3.4 + 0.90.

Integrated 4, prod (14 windows): ms / cut 91.0, 105.8, 122.9, 120.7, 111.7, 139.5, 144.4, 136.0, 154.2, 184.7, 230.7,
173.9, 248.3, 245.4 (fit **83.5 + 11.44**); savepoint 3.7 → 88.5 ms / cut (fit −2.1 + **6.85**); rest 87.3 → 156.9 (85.5 +
4.59); restore 0.8 → 30.7 ms per read (−1.6 + 2.47); GC 3.2 → 16.8 ms / cut. Fusion 3, tsx: ms / cut 144.6 → 278.4 (147.6
+ 9.13); savepoint 4.1 → 69.5 (2.3 + **6.14** — the same slope as prod: it is copying, not build-dependent); rest 140.4
→ 208.8 (145.2 + 2.98).

**3.2 Reading.** The line rises in every run: the per-cut cost roughly doubles over the stage (fitted 86 → 182 ms in
prod f3, 84 → 232 in i4), so S8's total is quadratic in its cut count. The function that carries the growth is **the
savepoint per read**: `restoreIndex` (`tx/savepoint.ts:76`) and `imageIndex` (`:52`), through `opSave`
(`faces/common.ts:459`, "O(arena), charged to no counter") at each dry-run's first insertion (`kerb.ts:1405`) and the
`rollback` of `dryClose` (`kerb.ts:866`): 60 – 70 % of the slope, its per-read restore growing 28 – 38× over the stage.
`restoreIndex` rebuilds, for each of the five levels, every dynamic-grid cell as a new `Set`, the `large` set, the
`entries` map, the tombstones and `byKey` (`:93 – 105`), and `imageIndex` copies the same (`:52 – 74`); the dynamic
grid holds the items added since the last static build (`index/grid.ts:1 – 2`), so — INFERRED, the grid's size was not
counted — the image grows with what S8 itself has inserted, not only with the arena S5 left. The remaining slope is the
same index seen from the queries: the read's insertions get ≈ 30 % dearer per read over the stage (fit 30.0 → 38.7 ms;
`gridCandidates` per read 11.0 → 16.6 ms: more candidates per cell and in `large`), and GC per cut grows ≈ 4× with
the images it collects.

## 4 Before and after (against the 2026-10-13 profile, `profile-city-stages.md`)

The previous figures were CONTENDED (load 0.6 – 3.7) on an older tree; these are IDLE on 4abd334. Not a clean A/B of
Q18: the a-09 rounds S14 – S17 (the faithful read, the census restaging) and other landings lie between.

| what | 2026-10-13 (fusion 3 unless named) | now (fusion 3) | change |
|---|---|---|---|
| S8 wall, prod plain · tsx profiled | 79.1 s · 125.7 s | 143.1 s · 241.7 s | 1.81× · 1.92× |
| cuts (`splitFace`) | 1 188 | 1 216 | — |
| per cut, prod plain · tsx profiled | 67 ms · 106 ms | 117.7 ms · 198.8 ms | 1.76× · 1.88× |
| per cut, integrated 4 prod | 65 ms (plain) | 156.4 ms (profiled) | — |
| scratch arenas per cut (`createPlat` = `buildOverlay`) | 2.0 (2 394) | **0** | Q18 ✓ (§0 item 2) |
| kerb reads per cut | 2.0 | 2.26 (2 752 `kerb`; 2 771 dry-runs) | ≈ |
| one read, prod | ≈ 19 ms (a scratch arena) | ≈ 48 ms (profiled; a dry-run on the real arena) | 2.5× |
| insertions per cut | 623 (739 754) | 85.4 (103 793) | ÷ 7.3 (§0 item 3) |
| queries per insertion · box tests per query | 15.6 · 24.2 | 37.5 · 76.6 | 2.4× · 3.2× |
| per insertion in a read, prod | ≈ 75 µs | ≈ 0.8 ms (profiled) | ≈ 10× |
| queries · box tests · `orient2d` per cut | 9 723 · 235 k · 60 k | 3 204 · 245 k · 67 k | ÷ 3 · ≈ · ≈ |
| `rewalk` · `reparent` per cut | 587 · 154 | 86.8 · 73.3 | ÷ 7 · ÷ 2 |
| `rewalk` · `reparent` share (prod) | 28.4 % · 10.7 % | 14.0 % · 7.0 % | (§0 item 9) |
| index queries' share (prod) | 45.1 % | 39.3 % | |
| savepoints per cut · share | 1.0 · 2.2 % (A4) | 3.3 images + 2.3 restores · **24.9 %** | ↑ — now per read |
| mint (A3) | 6.6 %, whole-live-list scan | 0.1 % (`LiveIndex.relevant`, Q70) | ✓ |
| `planCut` · `judge` | 0.3 % · 0.2 % | 0.3 % (+ 0.6 % planner) · 0.2 % | — |
| prod gain over tsx-debug | 1.59 – 1.84× | 1.51× | |
| tsx `__name` share | 11.0 – 11.8 % | 6.5 % | |

**What Q18 changed:** the per-face scratch arrangement is gone (§0 item 2's `buildOverlay` 72 – 80 % → 0 calls); the
insertions per cut fell 7×; `reparent`'s faces-only scan of a whole scratch overlay (§0 item 9) shrank with them.
**What it did not change:** the read is still built by inserting every part through `insertChain` and walking the
touched faces (49 % of S8); the insertion now runs against the real arena's index, so each costs ≈ 10× more (2.4× the
queries, 3.2× the box tests per query); and the dry-run's O(arena) savepoint — which the old profile counted once per
cut (A4, 2.2 %) — is now taken and put back at every read (24.9 %), and it is the quadratic term (§3). The net is a
per-cut cost ≈ 1.8× the old profile's on this tree.

## 5 What it would take (Q-f) — a design note, not code

The target: within 10× of §12.4's ≈ 12 µs a cut, i.e. **≤ 120 µs a cut** — from 117.7 ms in prod, a factor ≈ 980.
Shares below are prod fusion 3's (profiled), turned into ms a cut at the unprofiled 117.7 ms; every "after" figure is
an ESTIMATE (INFERRED), not a measurement.

| # | change (function level) | what the kernel would offer S8, and where | term removed | estimate after |
|---|---|---|---|---|
| (i) | **A savepoint of O(change)** — the dry-run and the op undone by a journal of their own writes, not imaged and put back: `opSave` (`faces/common.ts:459`), `rollback` (`:486`), `takeSavepoint` / `restoreSavepoint` / `imageIndex` / `restoreIndex` (`tx/savepoint.ts:52 – 152`); the dry-run's `dryInsert` (`arr/kerb.ts:1401`) / `dryClose` (`:866`) | §3.4's transactions and savepoints (M0-a-06's savepoint, M0-a-07's op savepoint; C-0185 (1) "O(arena), charged to no counter"): an undo log of the arena columns, the index's grid writes (`indexLog.writes` exists) and the journals, so a rollback costs what the op wrote | 24.9 % of S8 on average (≈ 29 ms a cut; ≈ 4 ms at the stage's start, ≈ 75 – 90 ms at its end) **and the whole quadratic term**; part of GC (its slope follows the images) | ≈ 88 ms a cut, flat over the stage |
| (ii) | **An incremental kerb** — kerb(F) kept per face and derived, at a cut, for the two children from the parent's kerb (the parent's kerb split along the cut, less the new lane's band, near the cut only), never by inserting the parts into the real arena: `readKerb` / `readOn` / `censusRead` / `dryInsert` / `dryRegion` (`arr/kerb.ts:1401 – 1960`) out of `kerbFace` (`bentCutFabric.ts:651`), `kerbSeed` (`:728`) and `makeBlock`'s read | §3.7's kerb service (*The kerb, defined once*; S8 ≡ S9, N-52 (1)): a read that returns the same lattice rings as today's construction — the exactness argument (KI-13; the dry-run's attraction to the arena's content, §3.7, C-0417) is what a derived kerb must keep, so it is a ruling seat's question before code; M0-a-09 / M0-b-03 | the read's insertions, region, labels and clipping: 81.3 % − 22.4 % (its savepoint, (i)) ≈ 59 % ≈ 69 ms a cut, at 2.26 reads a cut; a derived read touching O(vertices near the cut) instead of 37 insertions into the whole index | ≈ 12 – 16 ms a cut with (i) (≈ 0.2 – 0.7 ms a cut left for the reads; the residual below, INFERRED) |
| (iii) | **The index's per-query scans** — `gridCandidates` (`index/grid.ts:102`) reading the whole `large` set and a `seen` `Set` per call; `collect` (`index/query.ts:178`) once per level; `reparent`'s faces-only query (`insert/rewalk.ts:545`) | §3.3's spatial indexes (M0-a-03): large items in a coarse grid of their own, one level per faces-only query | `gridCandidates` is 20.5 % self, `collect` 8 %, `query` 4.4 % — mostly inside (ii)'s term; what stays is the cut's own insertion (≈ 37 queries at ≈ 77 box tests each) | the cut's `splitFace` insertion ≈ 2.5 ms → ≈ 0.5 – 1 ms (INFERRED) |

**The residual after (i) + (ii):** `runS8`'s work outside the read is 12.2 % of S8 (≈ 14.4 ms a cut), less
`splitFace`'s savepoint (2.5 %, gone with (i)) — ≈ 11.4 ms a cut — plus what GC keeps (6.3 % now, ≈ 7.4 ms a cut;
INFERRED ≈ 2 – 4 ms once the images go) and the derived reads (≈ 0.2 – 0.7 ms): **≈ 12 – 16 ms a cut, ≈ 1 000 – 1 350×
the 12 µs and ≈ 100 – 130× over the 10× band.** What it holds, measured (2.5): the cut's own real-arena insertion and
its walk (`splitFace` → `insertChain`, ≈ 2.4 ms a cut, ≈ 200× the 12 µs `splitFace` bar of M0.md §1 (a)); the ladder's
per-face-visit work in the layout (`tryOn`, `ladderOn`'s own, `deepInterior.ts`'s `signedDistance` / `localThickness`,
`sides.ts`, `side-runs.ts`, `pointLocate` 1.2 %, `spinePortals` 1.0 %, `makeBlock` outside its read — ≈ 7 – 9 ms a cut
at 1.7 face visits a cut); the level digest at commit (≈ 0.8 ms). **So the 10× band is not reached by the three kernel
changes alone:** it needs, beside them, the cut's insertion ≈ 20× cheaper (a face-local insertion: the cut meets one
face, but its queries read the whole level's grid) and the ladder's per-visit geometry ≈ 100× cheaper (read once per
face and handed to the children with the kerb, not recomputed per visit) — M0-b-03's, with the kernel offering the
derived child faces' kerbs, rings and spine runs as one result of `splitFace`. The order the evidence gives: (i) first
(NO-SHIFT by construction — an exact undo restores what the image restored; the savepoint's identity pins hold it — and
it removes the quadratic term), then (ii) (a ruling on the kerb's exactness first), then a re-profile on that tree
before (iii) and the ladder.

**Open questions.** (1) The dynamic grid's size over S8 (a count of `idx.levels[l].dynamic.entries.size` at each read
in a scratch mirror) would confirm §3.2's inference that the image grows with S8's own inserts, and whether a static
rebuild inside S8 would flatten the line by itself. (2) Of the 2 752 reads, how many re-read a face whose kerb an earlier
read already had (`kerbSeed` after `kerbFace`, `makeBlock`'s read): a memo's hit rate, NO-SHIFT. (3) The per-cut rise
against the old profile (1.76× in prod) mixes Q18 with S14 – S17's faithful read; a profile of f849488c (Q18's commit)
on this box would separate them.

## APPENDIX — the drivers and analysers, verbatim

All live in the seat's scratch `/tmp/claude-0/-home-user-maps-architecture/9d9c944a-d7a8-52e0-a533-f7a3a545156b/scratchpad/`
(`<scratch>`); the runs' outputs in `<scratch>/city/`. Reproduce: build the bundle (`node build-bundle.mjs
<scratch>/driver.mts <scratch>/prod.mjs`), then from `plat/` e.g. `<scratch>/run1.sh f3-prod-cpu node <scratch>/prod.mjs
--run fusion --seed 3 --mode cpu --cuts --interval 500 --out <scratch>/city --tag f3-prod-cpu` (tsx: `node_modules/.bin/tsx
--conditions=plat-source <scratch>/driver.mts …`), then `node analyse.mjs <scratch>/city f3-prod-cpu --window 100 --json
…`, `node growth.mjs <json>`, `node counts.mjs <scratch>/city f3-prod-count`.

### `driver.mts`

```ts
// R7's profiling driver (a measurement seat's; never in the tree). Runs the fusion harness's own single-seed entry
// `derive(run, seed)` (bench/src/fusion/runs.ts:332) with each registered stage's `run` wrapped through `derive`'s `plant`
// hook (before the harness's own `instrument`) by process.hrtime marks; S8 is the profiled window.
//   --mode cpu    the V8 CPU profile (the inspector's Profiler, --interval µs sampling) started before S8, stopped after it
//   --mode plain  the marks only
//   --mode count  precise coverage with call counts (Profiler.startPreciseCoverage {callCount}), taken and reset at
//                 every stage boundary; the S8 window kept
//   --cuts        logpoints (Debugger breakpoints whose condition records an hrtime stamp and returns false) at the
//                 call sites of splitFace / connectHole (bentCutFabric.ts tryCandidate) and kerb (kerbFace, kerbSeed),
//                 armed at S8's start: the per-cut timeline
// Output: <out>/<tag>.json (marks, root, stage roots, counts, cut stamps), <tag>.cpuprofile, <tag>.sources.json (the
// generated sources of every script the profile or coverage names: their inline source maps map back to TypeScript),
// <tag>.coverage.json (count mode).
import inspector from 'node:inspector';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const argv = process.argv.slice(2);
function arg(name: string, dflt?: string): string {
  const i = argv.indexOf(name);
  if (i < 0) {
    if (dflt === undefined) throw new Error(`driver: ${name} is required`);
    return dflt;
  }
  return argv[i + 1];
}
const runKind = arg('--run', 'fusion') as 'fusion' | 'integrated';
const seed = Number(arg('--seed'));
const mode = arg('--mode', 'plain') as 'cpu' | 'plain' | 'count';
const interval = Number(arg('--interval', '500'));
const out = arg('--out');
const tag = arg('--tag', `${runKind}-${seed}-${mode}`);
const cuts = argv.includes('--cuts');
const frameHa = arg('--frame-ha', '');
const walledHa = arg('--walled-ha', '');
mkdirSync(out, { recursive: true });

const session = new inspector.Session();
session.connect();
/** session.post, synchronous for the in-thread session (asserted: the callback ran before post returned). */
function post<T = any>(method: string, params: Record<string, unknown> = {}): T {
  let done = false;
  let res: any;
  let error: any;
  session.post(method, params, (e: any, r: any) => {
    done = true;
    error = e;
    res = r;
  });
  if (!done) throw new Error(`driver: ${method} did not answer synchronously`);
  if (error) throw error;
  return res as T;
}

const now = (): bigint => process.hrtime.bigint();
const marks: Record<string, { t0: string; t1: string; ms: number }> = {};
const scripts = new Map<string, { url: string }>();
session.on('Debugger.scriptParsed', (m: any) => {
  scripts.set(m.params.scriptId, { url: m.params.url });
});

if (mode === 'count') {
  post('Profiler.enable');
  post('Profiler.startPreciseCoverage', { callCount: true, detailed: false });
}

// the cut timeline: each logpoint pushes [kind, hrtime ns]
const stamps: [string, bigint][] = [];
(globalThis as any).__r7 = (kind: string) => {
  stamps.push([kind, process.hrtime.bigint()]);
};

function armCuts(): string[] {
  post('Debugger.enable');
  const armed: string[] = [];
  const sites: { kind: string; re: RegExp }[] = [
    { kind: 'split', re: /const r\d*\s*=\s*splitFace\d*\(\w+\.o,\s*fv\.face/ },
    { kind: 'hole', re: /const r\d*\s*=\s*connectHole\d*\(\w+\.o,\s*fv\.face/ },
    { kind: 'kerbFace', re: /const kr\d*\s*=\s*kerb\d*\(this\.o,\s*face/ },
    { kind: 'kerbSeed', re: /const kr\d*\s*=\s*kerb\d*\(o,\s*face/ },
  ];
  for (const [id, s] of scripts) {
    if (s.url === '' || s.url.startsWith('node:') || s.url.includes('/node_modules/')) continue;
    const src: string = post('Debugger.getScriptSource', { scriptId: id }).scriptSource;
    for (const site of sites) {
      const m = site.re.exec(src);
      if (m === null) continue;
      const before = src.slice(0, m.index);
      const line = before.split('\n').length - 1;
      const col = m.index - (before.lastIndexOf('\n') + 1);
      const r = post('Debugger.setBreakpoint', { location: { scriptId: id, lineNumber: line, columnNumber: col }, condition: `globalThis.__r7(${JSON.stringify(site.kind)}), false` });
      armed.push(`${site.kind}@${s.url.split('/').pop()}:${line + 1}:${col} -> ${JSON.stringify(r.actualLocation)}`);
    }
  }
  return armed;
}

// kernel/src/registry/ids.ts:112's STAGES, by id
const STAGE_NAMES = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S7b', 'SKY', 'S12a', 'S8', 'S9', 'S10a', 'S10', 'S10b', 'S11', 'S12b'];

let profile: any = null;
let coverageS8: any = null;
let armed: string[] = [];

const runs = await import('/home/user/maps-scratch/profile-s8/plat/bench/src/fusion/runs.ts');
const t0 = now();
const d = runs.derive(runKind, seed, {
  ...(frameHa === '' ? {} : { frameHa: Number(frameHa) }),
  ...(walledHa === '' ? {} : { walledHa: Number(walledHa) }),
  plant(registry: any) {
    const product = registry.products.get('base');
    product.stages.forEach((s: any, i: number) => {
      const name = STAGE_NAMES[s.id as number] ?? `#${String(s.id)}`;
      const orig = s.run;
      product.stages[i] = {
        ...s,
        run(input: unknown, ctx: unknown) {
          const isS8 = name === 'S8';
          if (mode === 'count') post('Profiler.takePreciseCoverage'); // reset at the stage boundary
          if (isS8 && cuts) armed = armCuts();
          if (isS8 && mode === 'cpu') {
            post('Profiler.enable');
            post('Profiler.setSamplingInterval', { interval });
            post('Profiler.start');
          }
          const a = now();
          const r = orig.call(s, input, ctx);
          const b = now();
          if (isS8 && mode === 'cpu') profile = post('Profiler.stop').profile;
          if (mode === 'count') {
            const c = post('Profiler.takePreciseCoverage');
            if (isS8) coverageS8 = c;
          }
          if (isS8 && cuts) post('Debugger.disable');
          const key = marks[name] === undefined ? name : `${name}#${Object.keys(marks).length}`;
          marks[key] = { t0: String(a), t1: String(b), ms: Number(b - a) / 1e6 };
          return r;
        },
      };
    });
  },
});
const t1 = now();

const hex = (h: any): string => (h === undefined ? '' : [...h].map((x: number) => (x >>> 0).toString(16).padStart(8, '0')).join(''));
const lanes = (d.model.data.get('lanes') as unknown[] | undefined)?.length ?? null;
const blocks = (d.model.data.get('blocks') as unknown[] | undefined)?.length ?? null;
const stageRoots: Record<string, string> = {};
for (const [k, v] of d.model.stageRoots ?? []) stageRoots[String(k)] = hex(v);
const counts: Record<string, number> = {};
for (const [kind] of stamps) counts[kind] = (counts[kind] ?? 0) + 1;

// the generated sources the profile / coverage name (their inline source maps), read back from the inspector
const wanted = new Set<string>();
if (profile !== null) for (const n of profile.nodes) if (n.callFrame.scriptId !== '0') wanted.add(n.callFrame.scriptId);
if (coverageS8 !== null) for (const s of coverageS8.result) if (s.functions.some((f: any) => f.ranges[0].count > 0)) wanted.add(s.scriptId);
const sources: Record<string, { url: string; source: string }> = {};
if (wanted.size > 0) {
  post('Debugger.enable');
  for (const id of wanted) {
    const s = scripts.get(id);
    if (s === undefined || s.url === '' || s.url.startsWith('node:')) continue;
    sources[id] = { url: s.url, source: post('Debugger.getScriptSource', { scriptId: id }).scriptSource };
  }
  post('Debugger.disable');
}

const rec = {
  run: runKind, seed, mode, interval, cuts,
  node: process.version, v8: process.versions.v8, argv: process.argv, execArgv: process.execArgv,
  root: hex(d.model.root), stageRoots,
  stamps: Object.fromEntries(d.ins.stamps), invocations: Object.fromEntries(d.ins.invocations),
  marks, totalMs: Number(t1 - t0) / 1e6, lanes, blocks,
  cutCounts: counts, armed,
  cutStamps: stamps.map(([k, t]) => [k, String(t)]),
  profileWindow: profile === null ? null : { startTime: profile.startTime, endTime: profile.endTime, samples: profile.samples.length },
};
writeFileSync(join(out, `${tag}.json`), JSON.stringify(rec, null, 1));
if (profile !== null) writeFileSync(join(out, `${tag}.cpuprofile`), JSON.stringify(profile));
if (coverageS8 !== null) {
  const kept = coverageS8.result
    .map((s: any) => ({ scriptId: s.scriptId, url: s.url, functions: s.functions.filter((f: any) => f.ranges[0].count > 0).map((f: any) => ({ functionName: f.functionName, start: f.ranges[0].startOffset, count: f.ranges[0].count })) }))
    .filter((s: any) => s.functions.length > 0);
  writeFileSync(join(out, `${tag}.coverage.json`), JSON.stringify(kept));
}
if (Object.keys(sources).length > 0) writeFileSync(join(out, `${tag}.sources.json`), JSON.stringify(sources));
const s8 = Object.entries(marks).find(([k]) => k === 'S8');
console.log(`${tag}: root ${rec.root} S8 ${s8 ? s8[1].ms.toFixed(0) : '?'} ms lanes ${String(lanes)} blocks ${String(blocks)} cuts ${JSON.stringify(counts)} total ${rec.totalMs.toFixed(0)} ms`);
console.log(`marks ${JSON.stringify(Object.fromEntries(Object.entries(marks).map(([k, v]) => [k, Math.round(v.ms)])))}`);
if (armed.length > 0) console.log(`armed ${armed.join(' | ')}`);
```

### `build-bundle.mjs`

```js
// R7's production bundle of the driver (scratch only): esbuild 0.28.2 (plat's), bundle, format esm, target es2022 as
// scripts/build.mjs:31, the plat-source condition, no keepNames, inline source map, playwright-core external, each
// module's import.meta.url replaced by its own file URL, and `define PLAT_DEBUG_BUILD=false` (the production bundle
// kernel/src/invariants/debug.ts names: the slot-stamp assertions off).
//   node build-bundle.mjs <entry.mts> <out.mjs>
import { build } from '/home/user/maps-scratch/profile-s8/plat/node_modules/esbuild/lib/main.js';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const [entry, outfile] = process.argv.slice(2);
const metaUrl = {
  name: 'import-meta-url',
  setup(b) {
    b.onLoad({ filter: /\.(m?ts|m?js)$/ }, async (args) => {
      if (args.path.includes('/node_modules/')) return undefined;
      const text = await readFile(args.path, 'utf8');
      if (!text.includes('import.meta.url')) return undefined;
      return { contents: text.replaceAll('import.meta.url', JSON.stringify(pathToFileURL(args.path).href)), loader: args.path.endsWith('js') ? 'js' : 'ts' };
    });
  },
};
const r = await build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  format: 'esm',
  target: 'es2022',
  platform: 'node',
  conditions: ['plat-source'],
  external: ['playwright-core'],
  sourcemap: 'inline',
  define: { PLAT_DEBUG_BUILD: 'false' },
  plugins: [metaUrl],
  logLevel: 'warning',
  absWorkingDir: '/home/user/maps-scratch/profile-s8/plat',
});
console.log(`bundle ${outfile}: errors ${r.errors.length} warnings ${r.warnings.length}`);
```

### `run1.sh`

```bash
#!/bin/bash
# one CITY run: wait (≤ 5 min) for the 1-min load < 0.3, record uptime before and after, run the given command
S=/tmp/claude-0/-home-user-maps-architecture/9d9c944a-d7a8-52e0-a533-f7a3a545156b/scratchpad
tag=$1; shift
for i in $(seq 1 30); do l=$(cut -d' ' -f1 /proc/loadavg); awk "BEGIN{exit !($l < 0.3)}" && break; sleep 10; done
echo "before $(date -u +%FT%TZ) $(uptime)" > $S/city/$tag.load
cd /home/user/maps-scratch/profile-s8/plat
( while true; do echo "$(date -u +%T) $(cut -d' ' -f1-3 /proc/loadavg)"; sleep 30; done ) > $S/city/$tag.loadlog 2>&1 &
LP=$!
"$@" > $S/city/$tag.log 2>&1
rc=$?
kill $LP
echo "after $(date -u +%FT%TZ) $(uptime) rc=$rc" >> $S/city/$tag.load
cat $S/city/$tag.load; tail -4 $S/city/$tag.log
```

### `analyse.mjs`

```js
// R7's analyser of one S8 CPU profile (scratch only). Every sampled frame is mapped to its TypeScript file:line through
// the generated sources' inline source maps (plat's source-map-js 1.2.2). Prints, for the S8 window (the profile is
// started at S8's start and stopped at its end): self time per function and per file, inclusive time per function
// (once per sample), the heaviest call path, the inclusive time of named functions, joint times ("A>B": samples with B
// on the stack below A), and — when the run recorded cut stamps (--cuts) — the window table: every W cuts, the wall ms,
// the ms per cut and the inclusive ms of the named functions in that window.
//   node analyse.mjs <dir> <tag> [--top 20] [--window 100] [--fns a,b,c] [--joint A>B,C>D] [--exclude NAME] [--json out.json]
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire('/home/user/maps-scratch/profile-s8/plat/node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/package.json');
const { SourceMapConsumer } = require('./source-map.js');

const [dir, tag, ...rest] = process.argv.slice(2);
const opt = (n, d) => {
  const i = rest.indexOf(n);
  return i < 0 ? d : rest[i + 1];
};
const TOP = Number(opt('--top', '20'));
const WIN = Number(opt('--window', '100'));
const FNS = opt('--fns', 'ladderOn,kerbFace,kerbSeed,kerb,readKerb,readOn,censusRead,restagedRead,dryInsert,dryRegion,splitsOn,readFace,insertChain,rewalk,reparent,query,collect,gridCandidates,takeSavepoint,restoreSavepoint,opSave,rollback,splitFace,connectHole,tryCandidate,planCut,judge,mint,mintOne,relevant,makeBlock,junctionAt,spinePortals,pointLocate,(garbage collector)').split(',');
const JOINT = opt('--joint', '').split(',').filter((x) => x !== '');
const JSONOUT = opt('--json', '');

const rec = JSON.parse(readFileSync(join(dir, `${tag}.json`), 'utf8'));
const prof = JSON.parse(readFileSync(join(dir, `${tag}.cpuprofile`), 'utf8'));
const sources = JSON.parse(readFileSync(join(dir, `${tag}.sources.json`), 'utf8'));

// ---- source maps ----
const consumers = new Map();
function consumer(scriptId) {
  if (consumers.has(scriptId)) return consumers.get(scriptId);
  let c = null;
  const s = sources[scriptId];
  if (s !== undefined) {
    const at = s.source.lastIndexOf('//# sourceMappingURL=data:application/json');
    if (at >= 0) {
      const b64 = s.source.slice(s.source.indexOf('base64,', at) + 7).split('\n')[0].trim();
      try {
        c = new SourceMapConsumer(JSON.parse(Buffer.from(b64, 'base64').toString('utf8')));
      } catch {
        c = null;
      }
    }
  }
  consumers.set(scriptId, c);
  return c;
}
function shortPath(p) {
  if (p === null || p === undefined) return '?';
  const m = /(?:packages\/)([^/]+\/src\/.*)$/.exec(p) ?? /(bench\/src\/.*)$/.exec(p) ?? /([^/]+\/[^/]+)$/.exec(p);
  return (m ? m[1] : p).replace(/^([a-z]+)\/src\//, '$1/');
}
const keyOf = new Map(); // node id -> function key
const fileOf = new Map();
function frameKey(cf) {
  const name = cf.functionName === '' ? '(anonymous)' : cf.functionName;
  if (cf.url === '' || cf.scriptId === '0') return { key: name, file: name, name };
  const c = cf.lineNumber < 0 ? null : consumer(cf.scriptId);
  if (c !== null) {
    // the function's own position (the frame's lineNumber/columnNumber are the function's start, 0-based)
    const o = c.originalPositionFor({ line: cf.lineNumber + 1, column: cf.columnNumber, bias: SourceMapConsumer.LEAST_UPPER_BOUND });
    const o2 = o.source === null ? c.originalPositionFor({ line: cf.lineNumber + 1, column: cf.columnNumber }) : o;
    if (o2.source !== null) {
      const file = shortPath(o2.source);
      return { key: `${name} ${file}:${o2.line}`, file, name: o2.name && name === '(anonymous)' ? o2.name : name };
    }
  }
  const file = shortPath(cf.url.replace(/^file:\/\//, ''));
  return { key: `${name} ${file}:${cf.lineNumber + 1}(gen)`, file, name };
}
const nodes = new Map();
const parent = new Map();
for (const n of prof.nodes) {
  nodes.set(n.id, n);
  for (const c of n.children ?? []) parent.set(c, n.id);
}
const nameOf = new Map();
for (const n of prof.nodes) {
  const k = frameKey(n.callFrame);
  keyOf.set(n.id, k.key);
  fileOf.set(n.id, k.file);
  nameOf.set(n.id, n.callFrame.functionName === '' ? '(anonymous)' : n.callFrame.functionName);
}

// ---- samples and their durations (µs): sample i lasts until sample i + 1 ----
const S = prof.samples;
const ts = new Array(S.length);
let t = prof.startTime;
for (let i = 0; i < S.length; i += 1) {
  t += prof.timeDeltas[i];
  ts[i] = t;
}
const dur = new Array(S.length);
for (let i = 0; i < S.length; i += 1) dur[i] = (i + 1 < S.length ? ts[i + 1] : prof.endTime) - ts[i];
// only the samples inside S8's marks count (the profile starts before S8's first mark — Profiler.start's code logging —
// and stops after its last); the marks and the profile share the monotonic clock (process.hrtime ≡ V8's TimeTicks)
const S8T0 = Number(BigInt(rec.marks.S8.t0) / 1000n);
const S8T1 = Number(BigInt(rec.marks.S8.t1) / 1000n);
for (let i = 0; i < S.length; i += 1) if (ts[i] < S8T0 || ts[i] >= S8T1) dur[i] = 0;
const total = S8T1 - S8T0;
//   --exclude NAME: drop every sample with NAME on its stack (the residual outside it; shares stay of the whole S8 window)
const EXCL = opt('--exclude', '');

const stacks = new Map(); // node id -> array of node ids root..leaf
function stackOf(id) {
  if (stacks.has(id)) return stacks.get(id);
  const out = [];
  for (let x = id; x !== undefined; x = parent.get(x)) out.push(x);
  out.reverse();
  stacks.set(id, out);
  return out;
}
if (EXCL !== '') for (let i = 0; i < S.length; i += 1) if (stackOf(S[i]).some((x) => nameOf.get(x) === EXCL)) dur[i] = 0;

const self = new Map();
const selfFile = new Map();
const incl = new Map();
const inclName = new Map();
const add = (m, k, v) => m.set(k, (m.get(k) ?? 0) + v);
const nodeTotal = new Map();
for (let i = 0; i < S.length; i += 1) {
  const id = S[i];
  const d = dur[i];
  add(self, keyOf.get(id), d);
  add(selfFile, fileOf.get(id), d);
  const st = stackOf(id);
  const seen = new Set();
  const seenN = new Set();
  for (const x of st) {
    add(nodeTotal, x, d);
    const k = keyOf.get(x);
    if (!seen.has(k)) {
      seen.add(k);
      add(incl, k, d);
    }
    const nm = nameOf.get(x);
    if (!seenN.has(nm)) {
      seenN.add(nm);
      add(inclName, nm, d);
    }
  }
}
const ms = (us) => (us / 1000).toFixed(0);
const pc = (us) => ((100 * us) / total).toFixed(1);
const s8ms = rec.marks.S8.ms;
console.log(`# ${tag}: run ${rec.run} seed ${rec.seed} mode ${rec.mode} root ${rec.root}`);
console.log(`S8 mark ${s8ms.toFixed(0)} ms; profile ${((prof.endTime - prof.startTime) / 1000).toFixed(0)} ms, ${S.length} samples, start ${prof.startTime} ≤ S8 t0 ${S8T0}: ${prof.startTime <= S8T0}, end ${prof.endTime} ≥ S8 t1 ${S8T1}: ${prof.endTime >= S8T1}; shares of the S8 window ${ms(total)} ms; lanes ${rec.lanes}, cut calls ${JSON.stringify(rec.cutCounts)}`);
const top = (m, n) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
console.log(`\n## self time, top ${TOP}`);
top(self, TOP).forEach(([k, v], i) => console.log(`${i + 1}\t${k}\t${ms(v)}\t${pc(v)} %`));
console.log(`\n## self time by file, top ${TOP}`);
top(selfFile, TOP).forEach(([k, v], i) => console.log(`${i + 1}\t${k}\t${ms(v)}\t${pc(v)} %`));
console.log(`\n## inclusive time, top ${TOP + 20}`);
top(incl, TOP + 20).forEach(([k, v], i) => console.log(`${i + 1}\t${k}\t${ms(v)}\t${pc(v)} %`));
console.log('\n## named functions, inclusive (by V8 function name, every definition)');
for (const f of FNS) console.log(`${f}\t${ms(inclName.get(f) ?? 0)}\t${pc(inclName.get(f) ?? 0)} %`);

// heaviest path
console.log('\n## heaviest call path (the heaviest child at each step, ≥ 1 %)');
let cur = prof.nodes[0].id;
for (;;) {
  const kids = nodes.get(cur).children ?? [];
  if (kids.length === 0) break;
  let best = null;
  for (const c of kids) if (best === null || (nodeTotal.get(c) ?? 0) > (nodeTotal.get(best) ?? 0)) best = c;
  if ((nodeTotal.get(best) ?? 0) < total * 0.01) break;
  console.log(`${keyOf.get(best)}\t${pc(nodeTotal.get(best) ?? 0)} %`);
  cur = best;
}

// joint: A>B — samples with B on the stack below an A
const joint = {};
for (const j of JOINT) {
  const [a, b] = j.split('>');
  let v = 0;
  for (let i = 0; i < S.length; i += 1) {
    const st = stackOf(S[i]);
    const ia = st.findIndex((x) => nameOf.get(x) === a);
    if (ia < 0) continue;
    if (st.slice(ia + 1).some((x) => nameOf.get(x) === b)) v += dur[i];
  }
  joint[j] = v;
}
if (JOINT.length > 0) {
  console.log('\n## joint (B below A)');
  for (const j of JOINT) console.log(`${j}\t${ms(joint[j])}\t${pc(joint[j])} %`);
}

// windows by cut stamps
let windows = null;
if (rec.cutStamps !== undefined && rec.cutStamps.length > 0) {
  const s8a = S8T0;
  const s8b = S8T1;
  const cutsT = rec.cutStamps.filter(([k]) => k === 'split' || k === 'hole').map(([, x]) => Number(BigInt(x) / 1000n));
  const reads = rec.cutStamps.filter(([k]) => k === 'kerbFace' || k === 'kerbSeed').map(([, x]) => Number(BigInt(x) / 1000n));
  const bounds = [s8a];
  for (let i = WIN; i < cutsT.length; i += WIN) bounds.push(cutsT[i]);
  bounds.push(s8b);
  console.log(`\n## windows of ${WIN} cuts (a cut = a splitFace or connectHole call; reads = kerb calls in kerbFace and kerbSeed)`);
  const track = FNS.filter((f) => f !== 'ladderOn');
  console.log(['win', 'cuts', 'reads', 'wall ms', 'ms/cut', ...track.map((f) => f)].join('\t'));
  windows = [];
  for (let w = 0; w + 1 < bounds.length; w += 1) {
    const a = bounds[w];
    const b = bounds[w + 1];
    const nc = cutsT.filter((x) => x >= a && x < b).length;
    const nr = reads.filter((x) => x >= a && x < b).length;
    const per = new Map();
    for (let i = 0; i < S.length; i += 1) {
      if (ts[i] < a || ts[i] >= b) continue;
      const seenN = new Set();
      for (const x of stackOf(S[i])) {
        const nm = nameOf.get(x);
        if (seenN.has(nm)) continue;
        seenN.add(nm);
        add(per, nm, dur[i]);
      }
    }
    const row = { w, cuts: nc, reads: nr, wallMs: (b - a) / 1000, fns: Object.fromEntries(track.map((f) => [f, (per.get(f) ?? 0) / 1000])) };
    windows.push(row);
    console.log([w, nc, nr, row.wallMs.toFixed(0), nc > 0 ? (row.wallMs / nc).toFixed(1) : '-', ...track.map((f) => row.fns[f].toFixed(0))].join('\t'));
  }
}
if (JSONOUT !== '') {
  writeFileSync(JSONOUT, JSON.stringify({ tag, totalUs: total, s8ms, self: top(self, 60), selfFile: top(selfFile, 40), incl: top(incl, 80), named: Object.fromEntries(FNS.map((f) => [f, inclName.get(f) ?? 0])), joint, windows }, null, 1));
}
```

### `counts.mjs`

```js
// R7's reader of a count run's S8 window (scratch only): V8 precise coverage with call counts, taken and reset at S8's
// boundaries — exact invocation counts of every function S8 ran. Each function is mapped to its TypeScript file:line
// through the generated source's inline source map. Prints the named functions' counts (every definition of the name,
// and each definition apart), their ratio to the cuts (splitFace + connectHole calls), and the top N by count.
//   node counts.mjs <dir> <tag> [--top 40] [--fns a,b,c] [--json out.json]
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire('/home/user/maps-scratch/profile-s8/plat/node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/package.json');
const { SourceMapConsumer } = require('./source-map.js');

const [dir, tag, ...rest] = process.argv.slice(2);
const opt = (n, d) => {
  const i = rest.indexOf(n);
  return i < 0 ? d : rest[i + 1];
};
const TOP = Number(opt('--top', '40'));
const FNS = opt('--fns', 'splitFace,connectHole,ladderOn,kerb,readKerb,readOn,censusRead,restagedRead,dryRun,dryClose,dryInsert,dryRegion,insertTx,insertChain,rewalk,reparent,query,collect,gridCandidates,boxesMeet,orient2d,faceWalk,takeSavepoint,restoreSavepoint,opSave,rollback,createPlat,buildOverlay,overlayRegion,mint,mintOne,relevant,planCut,judge,tryCandidate,makeBlock,pointLocate,labelPoint,clipWindow').split(',');
const JSONOUT = opt('--json', '');
const cov = JSON.parse(readFileSync(join(dir, `${tag}.coverage.json`), 'utf8'));
const sources = JSON.parse(readFileSync(join(dir, `${tag}.sources.json`), 'utf8'));
const rec = JSON.parse(readFileSync(join(dir, `${tag}.json`), 'utf8'));

function mapper(scriptId) {
  const s = sources[scriptId];
  if (s === undefined) return null;
  const src = s.source;
  const lineStarts = [0];
  for (let i = 0; i < src.length; i += 1) if (src.charCodeAt(i) === 10) lineStarts.push(i + 1);
  let c = null;
  const at = src.lastIndexOf('//# sourceMappingURL=data:application/json');
  if (at >= 0) {
    const b64 = src.slice(src.indexOf('base64,', at) + 7).split('\n')[0].trim();
    c = new SourceMapConsumer(JSON.parse(Buffer.from(b64, 'base64').toString('utf8')));
  }
  return (offset) => {
    let lo = 0;
    let hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineStarts[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    const line = lo + 1;
    const column = offset - lineStarts[lo];
    if (c === null) return `${s.url.split('/').pop()}:${line}(gen)`;
    let o = c.originalPositionFor({ line, column, bias: SourceMapConsumer.LEAST_UPPER_BOUND });
    if (o.source === null) o = c.originalPositionFor({ line, column });
    if (o.source === null) return `${s.url.split('/').pop()}:${line}(gen)`;
    const m = /packages\/([^/]+)\/src\/(.*)$/.exec(o.source);
    const file = m ? `${m[1]}/${m[2]}` : o.source.replace(/^.*node_modules\//, '');
    return `${file}:${o.line}`;
  };
}
const rows = [];
for (const s of cov) {
  const map = mapper(s.scriptId);
  for (const f of s.functions) rows.push({ name: f.functionName === '' ? '(anonymous)' : f.functionName, at: map === null ? `${s.url}@${f.start}` : map(f.start), count: f.count });
}
const byName = new Map();
for (const r of rows) {
  const base = r.name;
  if (!byName.has(base)) byName.set(base, []);
  byName.get(base).push(r);
}
const cuts = (byName.get('splitFace') ?? []).reduce((a, r) => a + r.count, 0) + (byName.get('connectHole') ?? []).reduce((a, r) => a + r.count, 0);
console.log(`# ${tag}: run ${rec.run} seed ${rec.seed} root ${rec.root}; S8 ${rec.marks.S8.ms.toFixed(0)} ms (count mode, never a timing); lanes ${rec.lanes}; cuts (splitFace + connectHole calls) ${cuts}`);
console.log('\n## named functions (every definition of the name; per cut)');
const named = {};
for (const f of FNS) {
  // a bundle suffixes colliding names (run4, attempt3): the bare name and its suffixed forms
  const defs = [...byName.entries()].filter(([n]) => n === f || new RegExp(`^${f.replace(/[()]/g, '\\$&')}\\d+$`).test(n)).flatMap(([, rs]) => rs);
  const n = defs.reduce((a, r) => a + r.count, 0);
  named[f] = { total: n, defs: defs.map((r) => [r.name, r.at, r.count]) };
  console.log(`${f}\t${n}\t${cuts > 0 ? (n / cuts).toFixed(1) : '-'}\t${defs.map((r) => `${r.name}@${r.at}=${r.count}`).join(' ')}`);
}
console.log(`\n## top ${TOP} by count`);
rows.sort((a, b) => b.count - a.count);
rows.slice(0, TOP).forEach((r, i) => console.log(`${i + 1}\t${r.name}\t${r.at}\t${r.count}\t${cuts > 0 ? (r.count / cuts).toFixed(0) : '-'}`));
if (JSONOUT !== '') writeFileSync(JSONOUT, JSON.stringify({ tag, cuts, named, top: rows.slice(0, 200) }, null, 1));
```

### `growth.mjs`

```js
// R7's growth table (scratch only): from an analysis JSON's windows, per window of ≈ 100 cuts the ms per cut split into
// the savepoint machinery (opSave's image + the rollback's putBack, both under the reads and splitFace) and the rest, and
// the insertion's and the index's share per read; then a least-squares line of each against the window's index.
//   node growth.mjs <analysis.json>
import { readFileSync } from 'node:fs';
const a = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const W = a.windows.filter((w) => w.cuts >= 50);
const rows = W.map((w) => {
  const f = w.fns;
  const save = (f.opSave ?? 0) + (f.putBack ?? 0);
  return { w: w.w, cuts: w.cuts, reads: w.reads, perCut: w.wallMs / w.cuts, save: save / w.cuts, rest: (w.wallMs - save) / w.cuts, ins: (f.insertChain ?? 0) / w.reads, idx: (f.gridCandidates ?? 0) / w.reads, restore: (f.putBack ?? 0) / w.reads, image: (f.opSave ?? 0) / w.cuts, gc: (f['(garbage collector)'] ?? 0) / w.cuts };
});
console.log('win\tms/cut\tsavepoint ms/cut\trest ms/cut\tinsertChain ms/read\tgridCandidates ms/read\trestore ms/read\tGC ms/cut');
for (const r of rows) console.log([r.w, r.perCut.toFixed(1), r.save.toFixed(1), r.rest.toFixed(1), r.ins.toFixed(1), r.idx.toFixed(1), r.restore.toFixed(1), r.gc.toFixed(1)].join('\t'));
function fit(ys) {
  const n = ys.length;
  const xs = ys.map((_, i) => i);
  const mx = xs.reduce((s, x) => s + x, 0) / n;
  const my = ys.reduce((s, y) => s + y, 0) / n;
  let sxy = 0;
  let sxx = 0;
  for (let i = 0; i < n; i += 1) {
    sxy += (xs[i] - mx) * (ys[i] - my);
    sxx += (xs[i] - mx) ** 2;
  }
  const b = sxy / sxx;
  return { a: my - b * mx, b };
}
for (const k of ['perCut', 'save', 'rest', 'ins', 'idx', 'restore', 'gc']) {
  const { a: c, b } = fit(rows.map((r) => r[k]));
  console.log(`fit ${k}: ${c.toFixed(1)} + ${b.toFixed(2)} per window (first ${rows[0][k].toFixed(1)}, last ${rows[rows.length - 1][k].toFixed(1)}; fitted ${c.toFixed(1)} → ${(c + b * (rows.length - 1)).toFixed(1)})`);
}
```
