# M0-e-02 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-e-02 (lane `check/M0-e-02-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, the closing check fails the item only on a blocker. The finding below is not a
blocker. It is a hardening test for a rule the fix round recorded (C-0175 (5)), found while the closing round confirmed
line 3. Its row names its handling and where it belongs. The verdict and its evidence are in `checks/M0-e-02.md` (the
closing round is at the top).

The first check's notes (the "60 m relief" fixture's range, the stale step-1 comment in `trace.ts`, the corridor's D8
from the planned bed, the M0-e-06 dependency) are bullets in `checks/M0-e-02.md` round 1 and carry no ids. This file
starts the numbering at N-1.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-1 | **C-0175 (5)'s closing of a line-fault's cells has no test that fails without it.** When a re-trace finds that the course through the descent line itself fails the same check, `traceRiver` marks the failing cells closed (`trace.ts` 465, `for (const c of shut) closed[c] = 1;`), so the re-run descent can take another way. Mutant L3e keeps the event but drops the effect (`closed[c] = 0`). It survives the item's whole hydro set: `56 passed (56)`, exit 0, on the scratch mirror with `--maxWorkers=1` (CONFIRMED, executed). The ridge test (`river.test.ts` 454, line 2 (d)) asserts only the event's `closed?.length` of 1. Its ridge spans the arena, so the trace fails on the carve whether or not the cell is closed. No fixture has a line-fault that a detour can cure. The kept code does what C-0175 (5) says (by reading; PLAUSIBLE). Whether the closing changes any relief-fixture outcome was not measured. This is not one of the three parts of route (i) that line 3 named (the carve-bounded surface, the halving re-trace and the nearest-descending inlet), and all three are pinned (L3f, L3d and L3g are red). | Add a fixture whose descent line crosses one over-cap cell (a one-cell pit or a short ridge stub on the raster, invisible to the hydrology grid) with a detour beside it. Assert that the trace re-routes (`ok`, `end.kind` `frame`) and that its course avoids the closed cell. L3e must go red on it. | M4 (hardening), or earlier at the next touch of `site/src/hydro/trace.ts` |

## Consolidation round C1 (R2 of `consolidation/site-plan.md`; lane `build/M0-e-02-consolidate-1`, 2026-10-12) — the builder's map and notes

The round applies `consolidation/site-plan.md` §1.2 H-1 – H-14, §2 C-hydro-1 – 3 and §3.2 T-hydro inside the item's
owns (`site/src/hydro/`, `site/test/hydro/`), after R1 (M0-e-01 C1, choices C-0334) homed `rasterGrid`, `cellCentre`,
`PI`, `RAD_PER_CDEG`, `generatedLifecycle` and `isBaseRung` in `site/src/terrain/`. Every file of `site/src` and
`site/test` outside the two hydro folders is byte-identical to the before-image (39 files, `diff -rq`). The
before-image is the pre-round tree: its 12 `src/hydro` and 7 `test/hydro` files have the SHA-256 that
`landed/snapshots/flow-7.json` records (19 of 19 equal), copied at the round's start to the lane's scratchpad.
Water's own copies (`reachOf`, `segDist2`, `segSeg2`, `footOn`, `cellOf`, …) stay until R3 adopts R2's homes (J270 (b)).

**What changed, file by file.** No file was merged, split, renamed or moved: the folders keep 12 and 7 files. Every
`describe`/`it` title is kept verbatim (13 describes and 53 `it` call sites, 66 title lines, identical before and
after; vitest runs 56 tests before and after — `relief-bar.test.ts` makes 3 + 2 of its tests in loops).

| old | new |
|---|---|
| H-1: `src/hydro/strategy.ts:28–29` private `PI`, `RAD_PER_CDEG` | `RAD_PER_CDEG` imported from `../terrain/primitives.js` (the same `PI / 18000` of the same literal; `PI` itself has no reader here, so it is not imported) |
| H-1: `strategy.ts:95–97` private `generated(epoch)` | `generatedLifecycle(ctx.epoch)` from `../terrain/heightfield.js` (the identical literal and key order, a fresh object per call) |
| H-1: `strategy.ts:99–101` private `isBaseRung` | `isBaseRung` from `../terrain/strategy.js` (`BASE_RUNGS.includes`); `@plat/tables` is now imported for the `BaseRung` type only |
| H-1: `strategy.ts:401` the inline reach `{ x: ⌈w · (½ + m)⌉, y: ⌈h · (½ + m)⌉ }` | `arenaReach(frame.value)` from `../terrain/grid.js` (the same two `Math.ceil` products) |
| H-1: `carve.ts:34–36` `rasterGeom`'s five-field literal | `export function rasterGeom(t: Terrain): GridGeom { return rasterGrid(t); }` — name, signature and return type kept; `GridGeom` stays an interface (J301 Q5) |
| H-1: `trace.ts:290–294` `centreOf`, `trace.ts:128–131` `edgePoint`'s centre, `trace.ts:505–508` `lineFault`'s raster-cell centre, `strategy.ts:128–131` `lineApproach`'s centre | `cellCentre(g, c, invOfCols(g.cols))` / `cellCentre(g, c, inv)` from `../terrain/grid.js` (`i = c % cols`, `j = Math.round((c − i) · inv)`, `origin + (i + ½) · cell`: the same expressions). `carve.ts:102, 106` (the channel loop's row and column centres) read `centreY(g, j)`, `centreX(g, i)` — the terrain index's own public readers of the same `origin + (i + ½) · cell`. |
| H-2: `d8.ts:15–18` and `trace.ts:152–155` two `slopeKey`s | one, exported from `d8.ts` (file level); `trace.ts` imports it by path (`d8.ts` imports nothing from `trace.ts`) |
| H-2: `d8.ts:30–44` `flowCode`'s first loop (a verbatim copy of `steepest`) | `const steep = steepest(f, cols, rows, c, i, j); if (steep >= 0) return steep;` — then the border phase and the flat phase as before, the flat phase's `best` starting at −1 as the first loop left it (the plan's `best`, renamed `steep` so the flat phase keeps its own `let best = −1`) |
| H-3: `trace.ts:145–149` `invOf(cols)` (`'trace: a grid of no columns'`) and `field.ts:63–67` `invCols(g)` | `field.ts` `invOfCols(cols)` (file level; field's message `` `hydro grid: ${cols} columns` ``); `invCols(g)` is `return invOfCols(g.cols)` (public name and signature kept); `trace.ts` imports `invOfCols`; `invOf` is gone |
| H-4: 22 sites of `Math.round((c − i) · inv)` | `field.ts` `rowOf(c, i, inv)` (file level), with the exactness explanation moved onto it from `invCols`; adopted at `trace.ts` (descentLine, inletMasks, traceRiver's end), `strategy.ts` (descends, inletOf's `q0`, corridorOf, connect ×2) and `d8.ts` recomputeCorridors (×4); the per-cell inner loops `flood.ts:91, 141`, `flats.ts:117, 169`, `d8.ts:106` (accumulate) and `surface.ts:104` keep the inline form marked `// rowOf`; the centre sites are `cellCentre`'s (H-1) |
| H-5: `cellAt` + `j · cols + i` at `trace.ts:472–473`, `trace.ts:508–509`, `strategy.ts:641–643` | `course.ts` `cellIndexAt(g, x, y)` (file level: `cellAt`'s clamp, then the same index). `trace.ts:472` still computes the index before the `kept.length === 1` choice, as `kc` was. `rasterise`'s own `push` (`course.ts`) and `inletOf`'s edge-pinned `cellOf` keep their forms (not in the plan's list); the two cell-index arithmetics (`cellAt`'s ratio vs the sampler's reciprocal) are not unified (plan §4) |
| H-6: `course.ts:87–101` `pointSegDist2`'s parameter | `course.ts` `segParam(p, a, b)` (file level: `len2 = dx² + dy²`; t = 0 unless `len2 >= 1`; else `ratio(dot, len2, 'area')`'s value, 0 when refused; clamped to [0, 1]); `pointSegDist2` reads it and keeps the distance arithmetic `a + d · t − p`; the `len2 >= 1` guard is kept |
| H-7 | nothing in R2 (`segSegDist2` unchanged; R3 delegates `segSeg2`) |
| H-8: `d8.ts:143–160` class `Counts` (`add`, `get`, `take`) | a `Uint32Array` `into` in `accumulate`: `into[t] += 1`, `into[c] === 0`, `into[t] -= 1; if (into[t] === 0)` — the same counts, the same Kahn queue order, the same `cycle` throw and count |
| H-9: `strategy.ts:35–39` `quotient` (`'river: a divisor of …'`) and `course.ts:21–25` `q` | `course.ts` exports `q` from the file as `lengthQuotient` (its message `` `course: a length of ${den} cm` ``; its six readers in `course.ts` renamed); `strategy.ts`'s two ray divisions call it; `quotient` is gone; water's `quot` (refusal → 0) stays |
| H-10: `strategy.ts:303–306` private `better` | `betterRiver` (rename only) |
| H-11, H-12 | kept apart: the two bucket floods; `edgeCells`/`EDGE_CODE`/`edgeSurface` and `inletMasks` (a comment at `edgeSurface`: the masks are read through the edge's middle cell, never a corner) |
| H-13 / C-hydro-1 – 3 | `surface.ts:1–3` "(M0-e-02; … C-0173 (3) as refined by C-0175 (1) – (3))"; `strategy.ts` `lineApproach`'s comment says it returns the squared distance only; the terrain-record comment says `undefinedCells` is recounted after the corridors' D8, equal to `d8`'s count on every resolved field, 0 by §13.1; `edgeSurface`'s comment (H-12); `index.ts`'s scaffold sentence replaced by "This index and its folder are M0-e-02's." and the file-level helper line (`invOfCols`, `rowOf`; `slopeKey`; `segParam`, `cellIndexAt`, `lengthQuotient`); the `Counts` comment gone with it; each new file-level export carries its one-sentence comment ending "File-level: shared by path inside `@plat/site`, not part of the package's API (J263 Q1's convention)"; `segParam`'s carries the exactness note (plan §2 (c)) |
| H-14 | no change (comments of the attempt loop, the degraded pick, the corridor and the width profile stand) |
| T-hydro: `test/hydro/support.ts` | gains `CITY` (`hydroParams(TABLES, 'CITY')`), `gridOf(cols, rows, cellCm = 2500, originX = 0, originY = 0)`, `fieldOver(g, h)` (from `surface.test.ts:18–20`), `fieldFrom` = `fieldOver(gridOf(…), h)` (the same values in the same row-major order), `D8_STEPS` (the test-side `dx`/`dy` table, never `src`'s `D8_DX`/`D8_DY`; `drainPath` reads it), `courseOf`, `cityHydrology(terrain, grid?)`, `northInlet(grid, reach)`, `traceOpts(terrain, clearanceCm, params = CITY, reach = reachOf(frameOf(SMALL)))` and `carveBars(before, after, bodies, carveMaxCm, rivers = [])` |
| T-hydro: `river.test.ts:44, 61–79, 130–149, 190–202, 235–250, 285, 374, 446, 460–465` | `CITY`, `courseOf` (the local `course()` gone), `expectCarveBars` = `carveBars(r.before, r.terrain, r.bodies, cap)` (the same three checks: no cell raised, the deepest cut ≤ cap, every body's bed longer than one cell and non-increasing), `cityHydrology` ×6, `northInlet` ×4, `traceOpts` ×6 (the hairpin's `opts`, the ridge test's `opts(terrain)`) |
| T-hydro: `relief-bar.test.ts:48–49, 53–61, 70, 137–138, 162` | `D8_STEPS` for the inline table; the cap part of `expectBars` is `carveBars(before.heightCm, after, [], cap, report.rivers)` — no cell raised, the deepest cut ≤ cap, every river's `maxCarveCm` ≤ cap; no bodies passed, so no new bed check enters the TOWN switch test (the bed stays `expectFrameRiver`'s); `courseOf` ×2; the comment "(checks/M0-e-02.md line 3; route (i), C-0175 (1) – (6))" → "(C-0175 (1) – (6))"; `expectBars`' own comment no longer claims a bed check it never made |
| T-hydro: `surface.test.ts:1–6, 13–20, 171–174` | the header and the regression comment as C-hydro-3 says; `centred(cols, rows)` is `gridOf(cols, rows, 2500, −1250 · cols, −1250 · rows)` (kept as a local for its name); `fieldOver` from `support.ts` |
| T-hydro, kept apart | `referenceFill`, `brute`, `rolling`, `Left extends MeanderDraws`, `reachOf`, `terrainOf`, `clone`, the fixtures of `fixtures.ts`, `bedAlong`'s grid literal (`support.ts`, the bed oracle's own statement of the raster grid), `pipeline.test.ts` and `strategy.test.ts` (unchanged files) |

**The two dropped throw texts (J301 Q1).** `grep -rn "a grid of no columns\|a divisor of" plat/ --include=*.ts
--include=*.mts --include=*.mjs --include=*.js --include=*.json` (outside `node_modules` and `dist`) finds no pin, before
or after; before, the only occurrences were the two throw sites (`trace.ts:147`, `strategy.ts:37`). *Unreachable from the
package's doors:* `invOf(cols)` refuses only when `cols < 1` (`ratio`'s count floor), and every hydrology grid the package
builds has `cols ≥ 1` (`hydroGridOver` reads `coveringGrid`, whose `ceilDiv` of a positive extent by a positive cell is
≥ 1; the raster's `heightGrid` takes `Math.max(1, …)`; `runRivers` refuses a terrain under 2 × 2 first); `quotient`'s
divisors are `ax · 2²⁰` or `ay · 2²⁰` on the side the ray hits, where `|component| ≥ 1 ÷ √5` at every frame aspect in
[½, 2] (`strategy.ts`'s own comment), so the divisor is ≥ 4.6 × 10⁵ cm. *Reachable only by hand-built unlawful
input to a public helper:* the NO-SHIFT probe shows the four places: `inletMasks` and `edgePoint` on a hand-built
0-column grid (before `'trace: a grid of no columns'`, after `'hydro grid: 0 columns'`), `inletOf` with a zero
reach (before `'river: a divisor of 0'` / `'… of 2.97e-10'`, after `'course: a length of 0 cm'` / `'… of 2.97e-10 cm'`)
— the same `RangeError` class, the same trigger, at the same call; only the unpinned text differs.

**NO-SHIFT (J260 (3)).** A probe (a vitest file placed only in the lane's mirror, never in the tree) printed 18 164
lines before and after: the runtime names of `src/index.ts` (raw), `hydro/index.ts` (raw), `terrain/index.ts` and
`water/index.ts`; the hydrology (heights, filled surface, flatRank, flowDir, flowAccum, flood, flats, d8) of the relief
fixtures at TOWN, CITY and METROPOLIS × 60 m and 3 000 m × the rung's and the coarse cell (12 runs); 215 `runRivers`
runs — the relief bars' CITY rivers ± `hydroCoarsen`, the valley along its bearing ± the switch, the TOWN switch pair,
16 more relief seeds and bearings with tributaries, the seven small fixtures × seven requests × three seeds plus F-WORK
and the switch, 20 valley seeds, ten bearings with a tributary — each run's bodies (course, controls, nextControl,
widthProfile, lifecycle), report and terrain arrays after the carve; direct traces, knotVertices, widthProfile, planCarve,
inletOf (5 bearings × 4 shifts × 2 excludes), edgePoint at every border cell × 9 codes, inletMasks, riverSurface,
descentLine, recomputeCorridors with accumulate, flowCode samples on each fixture; 400 random small fields through the
pipeline and the river surface; 20 000 point–segment and segment–segment distances on integer and double inputs
(degenerate segments and segments below the 1 cm² floor included); 300 random walks through `firstSelfTouch`, `chaikin`,
`rounded`, `pointAtArc`, `rasterise`, `cellAt`; `widthCm`; and 21 throw and refusal texts. Before (the pre-round
mirror): sha256 `ed69022a1db2de26…`; after (the round's sources): `4f15104d9b7c945a…`; 18 160 lines identical, the 4
that differ are the dropped texts above. The pre-round tests pass on the round's sources (56/56) and the round's
tests on the pre-round sources (56/56). The non-comment lines of `hydro/index.ts`, and `src/index.ts`,
`terrain/index.ts`, `water/index.ts` whole, are byte-identical; the runtime names of the barrel (raw in the probe) and of
every folder index are identical (API frozen, J263 Q1).

**Refusals (J264 (5), J290).** Over the probe's 215 river runs (the relief bars' family and the seed sweeps):
`runRivers` refusals 0 → 0. Delivered tiers identical before and after: `river` full 125, degraded 90 (the declared core
miss and the degraded stubs of C-0173 (6) / C-0175 (8) — a delivery tier, not a refusal), tributaries full 60,
`river.islands` omitted 21 (M1, §4b). No refusal to class.

**Mutant-kill map** (by title; nothing moved): as plan §3.2 lists — K01 → "the inlet rung moves the inlet …"; K02 →
"knots sit mostly on alternating sides …"; K03 → "re-trace from the last good knot (rung 2) …"; K04, K05 →
`pipeline.test.ts` tie order / away term; K06 → "equals the exact minimal depression-free surface …"; K07 → "types a
depression deeper than the lake threshold …"; K09, K10, K25 → the width law, the control knots; K11 → "carveCourse
refuses …"; K12 → "F-WORK: …"; K13, K23 → the corridor tests; K14 → "the switch changes only the cell size"; K15, L3c →
`surface.test.ts`; K17 → "a sink in the course …"; K18 → "with no bearing the inlet lies on the highest edge …"; K19 →
"the inlet rung (rung 3, an attempt) …"; K20, F1 → "a degraded river reports reachesCore …"; K21 → "the basic estuary
widens …"; K22 → "a tributary from the east edge joins the river"; K24 → "a self-touching course is re-traced …"; L3a,
L3b, L3d, L3f, L3g → `relief-bar.test.ts`; L3e survives (N-1, hardening). This round re-introduced 41 targeted mutants
in its mirror (`--bail=1`, the whole `test/hydro` folder, W = 1), each against the consolidated tests:

| id | aimed at | mutation | first red title |
|---|---|---|---|
| A1 | H-1 `arenaReach` | reach.y − 100 | relief-bar "CITY: a river from the highest edge …" |
| A2 | H-1 `cellCentre` (`centreOf`) | x + 100 | "knots follow the descent line's bends …" |
| A3 | H-1 `cellCentre` (`lineApproach`) | cell c + 1 | "with no bearing the inlet lies on the highest edge …" |
| A4 | H-1 `generatedLifecycle` | epoch + 1 | strategy "returns the input water with the rivers appended …" |
| A5 | H-1 `isBaseRung` | never refuse | strategy "refuses a rung outside the base ladder …" |
| A6 | H-1 `RAD_PER_CDEG` | × 1.05 | "the inlet rung delivers: attempt 1 …" |
| A7 | H-1 `rasterGeom` delegation | originY + 800 | "a river from the north edge runs down the valley …" |
| B1 | H-2 `slopeKey` | orthogonal × 2 dropped | "with no bearing …" |
| B2 | H-2 `steepest` strict `>` (K04) | `>=` | pipeline "D8's tie order is E, NE, N, NW, W, SW, S, SE …" |
| B3 | H-2 `flowCode`'s first phase | only on the border | pipeline "every flat drains to its spill point …" |
| B4 | H-2 corridor neighbours (K23) | never re-pointed | pipeline "a corridor drains along itself …" |
| B5 | H-2 the descent's `slopeKey` | code k + 1 | relief-bar "the switch changes only the cell size …" |
| C1 | H-3 `invCols` | reads rows | pipeline "equals the exact minimal depression-free surface …" |
| C2 | H-3 `inletMasks`' row | rows' reciprocal | surface "outlets are the open border …" |
| D1 | H-4 `rowOf` | `Math.floor` | **survived** — note N-c1-1 |
| D2 | H-4 `rowOf` (corridor neighbours) | row + 1 | **survived** — note N-c1-2 |
| D3 | H-4 `rowOf` (`descends`) | row − 1 | relief-bar "CITY: a river along a valley on its bearing …" |
| D4 | H-4 `rowOf` (`descentLine`) | row − 1 | surface "the descent is steepest …" |
| E1 | H-5 `cellIndexAt` | i, j swapped | relief-bar "CITY: a river along a valley on its bearing …" |
| E2 | H-5 `widthProfile`'s cell | y + one cell | "a river's width profile follows its corridor's accumulation …" |
| F1s | H-6 `segParam` | upper clamp dropped | "a river from the north edge …" (the carve bars) |
| F2s | H-6 `segParam` | lower clamp dropped | "a river from the north edge …" (the carve bars) |
| F3s | H-6 `segParam` | guard `len2 > 0` | **survived: equivalent** (plan H-6's argument: `ratio`'s 1 cm² floor refuses 0 < len2 < 1 and gives t = 0); the NO-SHIFT probe is identical under it, 0 of 18 164 lines |
| G1 | H-8 in-degree | capped at 1 | relief-bar "CITY: a river from the highest edge …" |
| G2 | H-8 cycle refusal | dropped | pipeline "refuses a field whose directions hold a cycle …" |
| H1 | H-9 the ray's divisor | unscaled (`ax`, not `ax · 2²⁰`) | **survived** — note N-c1-3 |
| K01, K02, K03, K11, K13, K17, K18, K21, K22 | round 1's mutants | as `checks/M0-e-02.md` | each red on its mapped title |
| K20 | round 1's degraded pick | `a.dist2 > b.dist2` | **survived** — note N-c1-4; its other half K20b (`return b.trace.ok`) red on relief-bar "CITY: a river from the highest edge …" |
| F1, L3a, L3c, L3g | close-r1's | as `checks/M0-e-02.md` | "a degraded river reports reachesCore …", "a river from the north edge …", surface "outlets are the open border …", "with no bearing …" |

36 red, F3s equivalent, D1 D2 H1 K20 the notes below. D2, H1 and K20 were each also replayed on the pre-round sources
with the pre-round tests (the same mutation at the same pre-round line: `Math.round((c − ci) · inv) + 1`;
`quotient(reach.x · dy, ax)`; `a.dist2 > b.dist2` in `better`): each survives there too, 56/56 — inherited pin gaps,
not this round's. Each of D2, H1, K20 is non-equivalent: the NO-SHIFT probe sees it (83, all-throw, 259 differing
lines). D1 is identical on the probe.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-1 | **`rowOf`'s rounding has no fixture where it matters.** Mutant D1 (`Math.round` → `Math.floor` in the shared helper) survives the hydro set (56/56) and leaves the NO-SHIFT probe identical: no grid the tests or the probe build has a width where `j · cols · fl(1 ÷ cols)` falls below j. Up to 600 columns 37 widths do (49, 98, 103, 107, 161, …; `49 · fl(1 ÷ 49)` = 0.9999999999999999), and there `Math.floor` would give row j − 1 — the reason C-0044's form rounds. Inherited (the 22 inline sites were equally unpinned). | A property test: `rowOf(c, c % cols, invOfCols(cols)) === Math.floor(c / cols)` for every c of grids of 1 – 5 000 columns, 49 among them. D1 must go red. | hardening (with N-1) |
| N-c1-2 | **`recomputeCorridors`' neighbour scan has no fixture that sees a shifted row.** Mutant D2 (the neighbour loop's row + 1) survives (56/56), and the same mutation survives on the pre-round sources and tests; the probe sees it (83 lines: the relief runs' bodies and terrains). The pipeline fixture's corridor spans the whole column, so a one-row shift still meets every neighbour. | A corridor that stops short of the border in `pipeline.test.ts` "a corridor drains along itself …", asserting the cells beside its last cell re-point. D2 must go red. | hardening |
| N-c1-3 | **No test casts the inlet's ray onto an east or west edge at an oblique bearing.** Mutant H1 (the divisor `ax` unscaled, so `ratio`'s 1 cm floor refuses it and `lengthQuotient` throws) survives (56/56), and survives on the pre-round sources (`quotient`); the probe's bearing sweep throws on it. The tests' bearings are 0, 2363, 4000, 9000 and 18000 (three onto the north edge, the two axes). | An `inletOf` case at a bearing of 60° (and 240°) on the 32 × 32 plane of "the inlet rung moves the inlet …", asserting the point on the east (west) edge at reach · cot. H1 must go red. | hardening |
| N-c1-4 | **The degraded pick's distance order is unpinned.** Mutant K20 (`betterRiver`'s `a.dist2 < b.dist2` → `>`) survives (56/56), and survives on the pre-round sources and tests (`better`); round 1's table listed a K20 as killed against round 1's code, before fix round 1 rewrote the pick (C-0175). Its fitting-first half (K20b) is red. The probe sees K20 (259 lines). The fixture of "a degraded river reports reachesCore …" fails all three attempts with stubs on one side of the ridge, so any pick satisfies its assertions. | Assert, on that fixture, that the delivered attempt is the one whose delivered course passes nearest the centre (`centreDist2` recomputed by the test over the three attempts' traces). K20 must go red. | hardening |

### The closing check's notes (lane `check/M0-e-02-consolidate-close-1`, 2026-10-12; verdict `checks/M0-e-02-c1.md`)

None of these is a blocker. Each surviving mutant below also survives the pre-round tests on the pre-round sources
(56/56; the same mutation at the same pre-round line), so this round lost no kill. The checker confirms N-1 (L3e) and
N-c1-4 (K20) with its own runs.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-5 | **The course's Chaikin smoothing has no test that fails without it.** K24 makes `traceRiver`'s course `rounded(chaikin(knots, 0))`. K24c sets `CHAIKIN_ROUNDS = 0`, which also covers `lineFault`. Both survive the hydro set (56/56) before and after. The NO-SHIFT probe sees them (598 lines differ). Round 1's record lists K24 ("no Chaikin smoothing") as killed, but that was against round 1's code. The pre-round tree (after fix round 1, C-0175) already lets it pass, and the plan's §3.2 still maps K24 to "a self-touching course is re-traced …". | A test that the delivered course is the knots' three-round Chaikin smoothing: the course equal to `rounded(chaikin(knots.at, 3))`, recomputed by the test from the trace's knots with `params.ts`'s three rounds written as a literal (never `CHAIKIN_ROUNDS` read from src). K24 and K24c must go red. Correct the plan's map row. | M4 (hardening) |
| N-c1-6 | **`inletMasks`' wall on the inlet's own edge has no direct test.** K15′ makes the inlet edge's cells neither walls nor outlets. It survives before and after, and the probe differs on 652 lines. L3c (the same cells made outlets) is red, but the "walled, not merely closed to outflow" half is unpinned. `surface.test.ts` hands `riverSurface` its own walls, never `inletMasks`'. | Assert `inletMasks(g, inlet, undefined)` on a small grid: every border cell of the inlet's side (both sides at a corner) is `edge = 1, outlet = 0`, every other border cell is `outlet = 1`, and `stop` cells are added as outlets. K15′ must go red. | M4 (hardening) |
| N-c1-7 | **`edgePoint`'s row on an east or west border cell is unpinned.** N02 reads the row with 1 ÷ (cols + 1). It survives before and after (the same mutation of the pre-round `invOf(cols + 1)`), and the probe differs on 238 lines. The tests' inlets and outfalls lie on the north and south edges, where the row is overwritten by `±reach.y`. This sits beside N-c1-3 (no oblique ray onto an east or west edge). | One `edgePoint` case per side on a non-square grid: an east cell gives `{ x: reach.x, y: round(centre y) }`, a west cell gives `−reach.x`. N02 must go red. | M4 (hardening) |
| N-c1-8 | **Two helper comments name readers that R3 will add.** `course.ts` `segParam`'s "(the water folder's segment predicates)" and `hydro/index.ts`'s "helpers for the sibling folders to import by path" describe the plan's R3. Today no file outside `src/hydro/` imports `segParam`, `cellIndexAt`, `rowOf`, `invOfCols`, `slopeKey` or `lengthQuotient` (`water/` imports `arcLengths`, `pointAtArc`, `cellAt`, `rasterise`, `XY`, `D8_DX`/`D8_DY`). This is not a mismatch with the code: the exports exist for that purpose (J270 (b)). | Nothing if R3 (M0-e-03's consolidation, plan §1.3) lands and adopts them. If R3 is dropped or deferred past M0, reword the two comments to "shared by path inside `@plat/site`". | R3 (M0-e-03 C1) |
