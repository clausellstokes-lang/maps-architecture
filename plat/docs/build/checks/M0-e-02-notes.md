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

## Hardening round S1 (lane `build/M0-e-02-fix-s1`, 2026-10-14; J237 (2), J263, J264, J290, N-45, N-58) — the builder's row-by-row outcome

The session's hardening round of M0-e-02 on the inventory's FIX-NOW rows (`hardening-inventory.md`: M0-e-02:146 – 149,
159 – 162 = N-c1-1 – N-c1-8) and the queue row L27 (b) (`docs/M0-FIX-QUEUE.md`; site-plan §4 "Two cell-index
arithmetics", §5 Q7 (b)). Every row read whole at its source note above; the inventory's fix shapes taken as written,
except where stated. Inside the item's owns: additions to four test files (`pipeline.test.ts`, `river.test.ts`,
`surface.test.ts`, `strategy.test.ts`) and one comment (`src/hydro/index.ts`); no source behaviour changed, so no
digest, golden, register, refusal code or message text moves and nothing is re-recorded; no export of a folder index
or the barrel added, removed or renamed (J263 Q1: `hydro/index.ts`'s export lines byte-identical, its header comment
alone reworded). The hydro set goes from 56 to 62 tests (5 files), green in the tree and in the lane's mirror.

| row | outcome | the pin (title) and what it asserts | mutant (in the lane's mirror, `vitest run --maxWorkers=1 --bail=1 test/hydro`) |
|---|---|---|---|
| N-c1-1 | **pinned** | `pipeline.test.ts` "recovers floor(c ÷ cols) for every row of grids of 1 – 5 000 columns (49 among them), at the first, middle and last column" (every width 1 – 5 000, ≥ 64 rows and ≈ 204 000 cells' rows each, columns 0, cols ÷ 2, cols − 1; asserts `49 · invOfCols(49) < 1` and that > 1 000 products fall below their row, so the rounding is exercised) and "the property over random cells of random grids up to 5 000 columns" (fast-check, PR size) | D1 (`rowOf`'s `Math.round` → `Math.floor`): **red** on the first title |
| N-c1-2 | **pinned** | `pipeline.test.ts` "a corridor drains along itself and off the grid; …" (title kept) gains a second fixture: a corridor rising at row 3 of a level 7 × 7 field and draining north off the grid — exactly 11 neighbours (rows 2 – 6 beside it), each re-pointed onto it with rank 0, the three below its first cell NE / N / NW, rows 0 – 1 unchanged. The note's "cells beside its last cell": the corridor stops short at its upstream end here (an exit-less corridor must leave by the border); a scan one row off misses (row + 1) or adds (row − 1) a row either way | D2 (the neighbour loop's row + 1): **red**; D2b (row − 1): **red** |
| N-c1-3 | **pinned** | `river.test.ts` "the inlet rung moves the inlet: …" (title kept) gains 60° and 240° on its 32 × 32 plane: `{ edge: 0, inlet: { at: { x: 40 000, y: round(40 000 · cot 60°) }, cell: that row's east cell } }` and its west mirror (cot computed by the test from `Math.cos`/`Math.sin`, not `dmath`) | H1 (the east/west divisor `ax` unscaled): **red** (`lengthQuotient` throws); H1w (the north/south divisor `ay` unscaled, its twin): **red** |
| N-c1-4 | **pinned** | `river.test.ts` "a degraded river reports reachesCore on the course it delivers, …" (title kept) recomputes the three attempts on its fixture (seed 1's streams, the attempt shift, `inletOf`, `traceRiver`, the cut before `cutAt` then back until `planCarve` fits — the test's own `truncated`), measures each delivered course's squared distance to the centre with the test's own point–segment distance, asserts the three are ≥ 1 m² apart, none fits, and the run delivers the nearest attempt's course | K20 (`betterRiver`'s `<` → `>`): **red** |
| N-c1-5 | **pinned** (the plan's map row: **reported**) | `river.test.ts` "the course is the knots' Chaikin smoothing, three rounds, rounded to the centimetre (…)" — 16 traces (valley, sink, ridge, eastward × 4 seeds; re-traces at halved offsets among them, asserted present) and 4 delivered bodies: the course equals the test's own corner cutting of the knots, 3 rounds as a literal, rounded, consecutive repeats dropped, and has > 4 vertices per knot | K24 (the trace's `CHAIKIN_ROUNDS` → 0): **red**; K24c (`CHAIKIN_ROUNDS = 0` in `params.ts`): **red**. The plan's §3.2 map row ("K24 → a self-touching course is re-traced …") lives in `consolidation/site-plan.md`, the session's file: K24 and K24c now map to this title — reported for the session to correct there |
| N-c1-6 | **pinned** | `surface.test.ts` "inletMasks: the inlet's own side is walled (never an outlet), every other border cell an outlet, a tributary's stop cells outlets too (…)" on a 6 × 5 grid: inlets on the north edge's middle, the west edge, the north-east corner (both sides walled), and an east inlet with two interior stop cells (outlets) — every cell's `edge` and `outlet` asserted | K15′ (the inlet side's cells neither walls nor outlets): **red** |
| N-c1-7 | **pinned** | `river.test.ts` "edgePoint: an east or west border cell keeps its centre's row, a north or south one its centre's column, on a non-square grid (…)" — 5 × 9 cells: every east cell (code E) at `{ x: reach.x, y: centre y }`, every west cell (W) at `−reach.x`, and the north/south rows likewise | N02 (`edgePoint` reads the row with 1 ÷ (cols + 1)): **red** |
| N-c1-8 | **fixed (comment)** | R3 (M0-e-03's consolidation, lane `build/M0-e-03-consolidate-1`, closed PASS by `checks/M0-e-03-c1.md`) adopted two of the six helpers: `water/geometry.ts` imports `segParam`, `water/outfalls.ts` `cellIndexAt`; `rowOf`, `invOfCols`, `slopeKey`, `lengthQuotient` have no reader outside `src/hydro/` (grep inside `plat/packages/`). `hydro/index.ts`'s header now names the helpers "shared by path inside `@plat/site`", the two water readers, and the four read by the folder's own files. `course.ts`'s `segParam` comment ("(the water folder's segment predicates)") is now exact and stays | comment-only (the text is the deliverable) |
| L27 (b) | **pinned (measured)** | `strategy.test.ts` "the cell under a point: hydro's cellAt divides through ratio where the sampler's flowAt multiplies by the reciprocal — on CITY's grid they differ a few ulps below 8 of its 63 column boundaries, measured, not assumed (…)": on the SMALL CITY terrain's hydro grid (2 500 cm, 64 × 64, origin −80 000), `flowAccum` holding each cell's index, every point within ±64 ulps of every boundary but the one at 0, on both axes (16 254 points): `cellAt` and `terrainSampler(…).flowAt` disagree at exactly 10 points per axis — boundaries 24, 25, 48 – 52 at 2 ulps below, 26 at 3 – 5 below — each kept in the lower cell by `cellAt` and moved up by the reciprocal. The equality is not assumed and the difference is pinned: a unification of either side empties the list (a declared shift) | L27b (`cellAt` multiplies by `1 ÷ cellCm`): **red**; L27b′ (the sampler's `flowAt` divides — M0-e-01's file, mutated in the mirror only to show the pin sees that side too): **red** |

**Measured, for L27 (b) (scratch measurement, node, the two expressions on the same `x − origin`).** Neither form is
exact against the true column there: the subtraction `x − origin` already rounds (on the same ±64-ulp probe of every
boundary, `cellAt` and the reciprocal each miss the exact column on 195 and 205 of 8 127 points at 2 500 cm; 276 / 277
at 2 000; 168 / 168 at 3 200; 314 / 314 at 1 600). With the origin at 0 and integer centimetre offsets they never
differ at any lawful cell (500, 800, 1 000, 1 600, 2 000, 2 500, 3 200, 4 000 cm; every centimetre over ±200 cells); one
ulp below a boundary at origin 0 they differ at 22 of 1 024 boundaries for 500, 1 000, 2 000 and 4 000 cm, 164 of
9 216 ±4-ulp points at 2 500, and never at 800, 1 600, 3 200. Random near-boundary doubles on the arena origin:
198 of 400 000 at 2 500 cm, 0 at 1 600 / 2 000 / 3 200 / 4 000. So the difference is real only for unrounded points
within a few ulps of a boundary, chiefly at CITY's 25 m cell — a point no record carries (courses are recorded in whole
centimetres): FAIL SAFE NOW holds and no unification is proposed; the pin makes any future one a declared shift.

**Mutant table (12 targeted, all red; each file restored from the tree and confirmed with `cmp -s` before the next).**
Run in the one mirror `waves/selfcheck-build-M0-e-02-fix-s1` (isolation proven: no link into the tree; `@plat/kernel`'s
realpath inside the mirror); the unmutated mirror 62/62 first. D1 → `pipeline` rowOf loop title; D2, D2b → the corridor
title; H1, H1w → "the inlet rung moves the inlet …"; K20 → "a degraded river reports reachesCore …"; K24, K24c → the
Chaikin title; K15′ → the inletMasks title; N02 → the edgePoint title; L27b, L27b′ → the cell-under-a-point title. D1,
D2, H1, K20, K24, K24c, K15′ and N02 each survived the pre-round tests on these sources (the source notes above, 56/56);
each is now killed by its own pin, the first (and, under `--bail=1`, only) failing title.

**Refusals (J264 (5), J290, N-58).** The lane's census probe (a vitest file in the mirror only): the seven small CITY
fixtures × eight requests (bearings 0, 23.63°, 60°, 90°, 240°, the highest edge, an estuary, a tributary from 90°) ×
seeds 1 – 3, plus F-WORK and the `hydroCoarsen` switch — 170 `runRivers` runs. Before (the tree at the round's start)
and after (the round's files): refusals **0 → 0**, the output byte-identical (sha256 `c1fd0692809c4461…`): river full
78, degraded 92 (C-0173 (6) / C-0175 (8)'s delivery tier, not a refusal), tributary full 21. No refusal to class.

**Gates (re-run in a fresh container under the CONTINUE RULE, 2026-10-18; the 2026-10-14 RELATED run never reported).**
install --frozen-lockfile 0; lint 0 (eslint 1 141 files 0 / 0, probe-red ok, 9 whole-tree checks); build 0; NEAR
`packages/site/test/hydro` 5 files 62 / 62 at the PR size (the relief bar inside); RELATED@1000
(`vitest related --run --maxWorkers=1 packages/site/src/hydro/*.ts`, `PLAT_FUZZ_RUNS=1000`) 222 files 2 682 / 2 682,
exit 0. The twelve mutants above are the 2026-10-14 mirror's record (finished, not re-run).

### The closing check's notes on round S1 (lane `check/M0-e-02-close-s1`, 2026-10-19; verdict `checks/M0-e-02-s1.md`)

None is a blocker: each survivor below also survives the pre-round tests (main `8ae5be6`, blob-verified) on the same
sources (56/56), so the round lost no kill; each is a pin gap on behaviour that is correct today (N-45: a further
hardening test).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s1c-1 | **The corridor's last cell's own neighbours are unpinned.** Mutant D2c (`recomputeCorridors`' neighbour scan skips each corridor's last cell: `cor.cells.slice(0, -1)`) survives the hydro set (62/62) and the pre-round set (56/56). It is not equivalent: on a level 7 × 7 field a corridor (3,2) → (3,5) then diagonally to (4,6) on the north border re-points 15 neighbours, D2c 13 — (5,5) keeps E instead of NW and (5,6) N instead of W (this checker's probe). N-c1-2's pin (a corridor ending straight on the border) cannot see it: the last cell's neighbours are all beside the previous cell or off the grid. The round's statement that a corridor short of the border is impossible holds for `exit: -1` only; a tributary corridor (`exit ≥ 0`) ends short of the border. The census (318 runs) is identical under D2c because it digests the water bodies, not the field. | One fixture in `pipeline.test.ts`: a corridor whose last step is diagonal onto the border (or a tributary ending at its exit beside a cell no other corridor touches); assert the two cells beside the last cell only re-point onto it. D2c must go red. | M4 (hardening) |
| N-s1c-2 | **The degraded pick's tie-break ("then the earlier attempt", `betterRiver`'s doc) is unpinned.** K20t (`a.dist2 < b.dist2` → `<=`, the later attempt wins a tie) survives 62/62 and 56/56. Ties occur on lawful input: the census changes on 2 of 318 runs — `valleyFallingEast` and `eastward`, bearing 45°, seed 3: delivered attempt 0 → 2 (water digest `9dd88857…` → `5e7acffd…`). Deterministic either way, so it fails safe. | Assert attempt 0 is delivered on `valleyFallingEast` at 45°, seed 3 (or a hand-built two-attempt tie). K20t must go red. | M4 (hardening) |
| N-s1c-3 | **`edgePoint`'s clamp of the cross coordinate to ±reach is unpinned.** N02c (the `y` clamp removed) survives 62/62 and 56/56; the census is identical. Not proven equivalent: `coveringGrid` can overshoot the height extent by up to one hydro cell, so a corner cell's centre can lie up to half a cell beyond `reach.y`. | An `edgePoint` case on a grid whose corner centres lie beyond reach (an east corner cell gives `y = ±reach.y`). N02c must go red. | M4 (hardening) |


## Hardening round S2 (lane `build/M0-e-02-fix-s2`, 2026-11-10 – 11; leg 2 of the merged round M0-e-01 S2 → M0-e-02 S2 → M0-e-03 S4, J443, J733; J237 (2), J238, J263, J264, J290, N-45, N-58) — the builder's row-by-row outcome

The session's hardening round S2 of M0-e-02 on the rows the second re-triage found still open: the queue row Q123
(`docs/M0-FIX-QUEUE.md`, read whole) and this file's notes N-s1c-1 – N-s1c-3 (the closing check of round S1, read
whole above). Leg 1 (M0-e-01 S2, C-0489) changed `terrain/heightfield.ts`; this leg reads it (`hydro/strategy.ts`
still imports `generatedLifecycle` by path from there) and edits none of it. Inside the item's owns only:
`src/hydro/trace.ts` (the fix and one comment), `src/hydro/params.ts` (one comment), and four test files plus the
fixtures (`fixtures.ts` `gully`; `pipeline.test.ts`, `river.test.ts`, `relief-bar.test.ts`). No export of
`hydro/index.ts` or the barrel added, removed or renamed (J263 Q1); no message text changed. The hydro set goes from
62 to 67 tests (5 files), green in the tree and in the lane's mirror.

| row | outcome | the pin (title) and what it asserts | mutant (the lane's mirror, `vitest run --maxWorkers=1 --bail=1 packages/site/test/hydro`) |
|---|---|---|---|
| N-s1c-1 | **pinned** | `pipeline.test.ts` "the corridor's last cell's own neighbours re-point onto it: a last step diagonal onto the border (…)": the source note's level 7 × 7 field, corridor (3,2) → (3,5) then diagonally to (4,6) on the north border, bed falling 10 cm a cell: `{ corridorCells: 5, neighbours: 15 }`, the corridor's codes N N N NE N, (5,5) → NW and (5,6) → W with rank 0, and each of the 15 cells beside the corridor (counted by the test's own scan) drains onto it | D2c (the neighbour scan over `cor.cells.slice(0, -1)`): **red** (13 neighbours) |
| N-s1c-2 | **pinned** | `river.test.ts` "the degraded pick breaks a tie on the distance by the earlier attempt (…)": `valleyFallingEast` and `eastward` at 45°, seed 3 — the three attempts arrive at one inlet (the corner clamp beside the frame, asserted per attempt), each fits, none reaches the core, all three pass the centre nearest at that inlet (one distance, recomputed with the test's own point–segment distance), attempt 2's course differs from attempt 0's; the run delivers attempt 0 and its course | K20t (`betterRiver`'s `<` → `<=`): **red** (attempt 2 delivered) |
| N-s1c-3 | **pinned** | `river.test.ts` "edgePoint clamps the cross coordinate to the reach where the grid overshoots the arena (…)": 5 × 9 cells of 25 m reaching a whole cell past a reach of (3 750, 8 750) cm, so the corner centres lie 1 250 cm beyond it on both axes (asserted): the four corner cells under E, W, N and S each give the reach's corner; two inner east cells keep their centre's row | N02c (the `y` clamp removed): **red**; N02x (the `x` clamp removed, its twin): **red** |
| Q123 | **fixed** (the trigger was wrong for the degrades whose descent line fits — outcome (a), a declared shift) **and pinned as the fixture's** (the rest — outcome (b), reported) | `river.test.ts` "re-trace at its limit (rung 2): when no halving of the offsets cures the course, the descent line itself is re-traced from the inlet and delivered if it fits — a gully (…)" on the new fixture `gully` (a straight gully along x = 12.5 m, walls 1 : 1): five streams, each three re-traces failing on the carve, then the fourth from the inlet; ok, scale 0, the knots the inlet, one per line cell 25 m apart on the axis with offset 0 and the outlet, the course their Chaikin smoothing (the test's own), within the cap; through `runRivers` at seeds 1 – 3: attempt 0, full at tier 2, no inlet rung, retraces 0 0 0 0, the carve bars. `relief-bar.test.ts` "Q123: on the 3 000 m relief with the river fixture's bearing (from the west) …" (CITY, `RELIEF_3000`, `{ inflowBearingCdeg: 27000, mouth: 'none' }`): keys 2, 4, 8 — degraded before the round — fit, leave by the frame with every bar, the delivered attempt's last re-trace from the inlet, its controls exactly the inlet, the cell centres of the descent line on the surface walled at the inlet's edge alone, and the outlet; keys 12, 14, 28 stay degraded (outfall sink, tier 4, F-RIVER) and for every attempt the descent on the river's surface stalls at the inlet (`[inlet.cell]`, stuck), and on the surface at carveMaxCm itself the line stalls or its course cuts the raster past the cap | Q1 (the last re-trace removed): **red** (gully); Q2 (its carve check removed): **red**; Q4 (its stall check removed): **red**; Q6 (its re-trace event dropped): **red**; Q9 (`scale: 0` → 1): **red**; Q8 (the closed cells walled in it too): **red**; Q10 (a knot every other line cell): **red**; LE1 (`lineEnd` reads a join's end from the last line cell, not the joined cell — the refactor's): **red** (the tributary title, which now asserts the confluence point); Q3 (its touch check removed): **survives** — not proven equivalent; see below |

**Q123 — measured first, then classified (the brief's order; no source change before the classification).**
*The probe* (vitest files in the mirror only): S1 alone through `@plat/layout`'s base registration and runner — the
site spike's `relief-3000` fixture (`bench/src/site/fixtures.ts`: RIVER_BLUEPRINT's river from the west on a 3 000 m
hill of 1 200 m radius under the centre, hilly ground) at CITY, seeds 1 – 200, the default configuration and the
coarse one (`hydroCoarsen` and the `hydro.cells` limit as the spike passes them), the stage's own context with fresh
streams; each attempt replayed with the module's exported pieces (`inletOf`, `traceRiver`) and its failure classed,
then the river stage run on the tree's sources at the round's start (`src/hydro` hash-verified 19 / 19 against
`landed/M0-e-02.json`) and on the round's. *Before:* the river fits on 145 of 200 default seeds and 137 of 200 coarse
(the queue's 144 of 199 and 137 of 200: the spike's one missing default run is its own, after S1), reaches the core
on none (the hill stands on it). Every degraded run is one where all three attempts fail. *Why* (the replay, seeds
1 – 67 / 1 – 66, 133 runs, 399 attempts): two kinds and no other. **(A)** 131 attempts fail after their three
re-traces — on the carve (118), a touch (7) or a line stalled by the cells the re-traces closed (6) — while the
river's descent line from the same inlet, the course through its cells' centres with no offset, fits the cap; 14 of
the 39 degraded runs are of this kind only. **(B)** 75 attempts stall at the inlet itself: on the river's surface
(flooded from the open edges, the inlet's edge walled, C-0175 (1) – (2)) no neighbour of the inlet is admitted, so the
descent has nowhere to go; 25 degraded runs have all three attempts so. Judged against §4.2 S1 (3) and §5.2 F-RIVER:
(A) is a river the rules admit — "a self-touching course is re-traced with the offsets halved", "a course that would
need more [carve] is re-routed by F-RIVER, never trenched", and the descent line is that re-route at the halving's
limit — degraded only because C-0173 (5)'s three re-traces ran out (each keeps the knots before its root at their
offsets): **the trigger was wrong, outcome (a).** (B) is a river the rules do not admit at M0: on relief-bar's keys
12, 14, 28, 29 the surface admits a neighbour of the inlet only at a cap of 250 – 5 000 cm, and even on the surface at
carveMaxCm (F-RIVER's carve rung at its own limit) the line stalls or its course cuts the raster past 400 cm — a
trench, which §4.2 S1 (3) forbids; the design's next rungs, S3's centre to the bank and the lake a sink becomes, are
M1's (§5.2, §4b). Where the land by the requested west inlet sits in a hollow of the hilly ground that drains out by
that walled edge, closed from the open edges by a rim deeper than the cap allows, no lawful course leaves it:
**the fixture's property, outcome (b)** — pinned (keys 12, 14, 28 above) and reported for the session to close the
rest of Q123 as the fixture's. Nothing needs a design-level rule or another item's file (outcome (c) not taken).

**The fix** (`trace.ts`, `traceRiver`): when RETRACE_MAX re-traces leave the course failing, F-RIVER's second rung is
taken to its limit — one re-trace more, whole, from the inlet, with the offsets at their limit, none: the course
through the river's descent line itself (the inlet, the line's cells' centres, its end on the arena's edge or at the
joined cell) on the surface walled at the inlet's edge alone (not the cells the earlier re-traces closed: they were
closed for knot courses, and the 6 class-A attempts that stalled did so on them); delivered when it passes
the same checks (no touch at the class's clearance, no raster cut past carveMaxCm, an outlet reached), its re-trace
reported (rung 2, value 0 — the inlet — with the line's own carve-rung events), `scale` 0; else the last try stands,
degraded, exactly as before. The draws are untouched (no knot of the line draws), so the stream and every later
attempt and tributary read what they read before. The course's end is now read by one helper (`lineEnd`) for every
try — the same three cases as before. A variant also re-tracing the line on the surface at carveMaxCm (rung 1 at its
limit) was measured and dropped: 0 more fits of 400 runs, every output identical.

**Declared shift (C-0104's form).** Only a trace that failed all its re-traces can change, and only where its descent
line fits; nothing else moves. *This item's tests:* no golden or digest — every assertion of the 62 earlier tests
holds unchanged; the relief bar's highest-edge runs (keys 60 and 3 000, ± `hydroCoarsen`), its valley run and its TOWN
switch run keep their water and terrain byte-identical (probe), the 3 000 m runs' report gaining the non-delivered
attempts' line re-traces (ladder uses 226 → 246 default, 355 → 394 coarse). *The census below:* 19 of 440 outputs
move — 16 on the new `gully` fixture (measured, not asserted before) and `valleyWithCrater` at seed 2 (bearing 0, its
estuary, its tributary request; default): attempt 1 at tier 3 → attempt 0 at tier 2, full both. *The spike's S1
(probe above, 200 seeds):* relief-3000 default fits 145 → 173 (rescued seeds 2, 8, 12, 20, 34, 39, 48, 57 – 58, 62,
75, 78, 100 – 101, 104, 114, 121 – 122, 134, 136 – 137, 145, 148, 151, 158, 167, 173, 180), coarse 137 → 152 (12, 31, 34,
63, 80, 103, 122, 145, 151, 158, 167, 175, 181, 183, 186); none lost; the water moves on 68 default and 48 coarse runs
(40 and 33 of them fitting before and after: a newly fitting attempt now nearer the centre), the report alone on 63
and 61 more; reachesCore 0 → 0. Residual degraded: default 27 (9, 28 – 29, 33, 37, 42, 46, 50, 61, 68, 87 – 89, 97, 102,
118, 129, 132, 139, 155, 165, 171, 185, 188 – 190, 194), coarse 48 — every one class (B). relief-60: fits 199 → 199 in
each configuration, reachesCore 55 → 56 default (seed 25) and 54 → 55 coarse (seed 156), the water moving on 16 and
15 runs; its one degrade (seed 46) is class (B). **Other items' files that will move, for M0-e-06 S4's re-run (not
this leg's to edit):** `plat/docs/build/summaries/M0-e-06.json` — relief-3000's `bedMonotone.numbers` (`fits`,
`frameOutfall`, `fittingMonotone`, `degraded`, `degradedMonotone`, `minFittingBedCells`, `minDegradedBedCells`, the
`observed` count) in both configurations, relief-60's `reachesCore` (55 → 56, 54 → 55), and whatever of the carve,
water-gate, span and census figures and the content anchor reads the moved courses; the site spike's refusal census
(the derivations whose river moved run S3 – S6 on another river). M0-e-03's water tests and every later stage that
reads S1's river on a moved seed are on the RELATED path (the gates below).

**The declared shift on the RELATED path: two pinned tests of other items move (named, not edited; rule (1)).** The
round's first RELATED@1000 (2026-11-10, ended unfinished with the seat) showed two red files; each was replayed in the
lane's mirror at `PLAT_FUZZ_RUNS=1000`, `--maxWorkers=1`, on the round's start sources (`src/hydro` hash-verified
against the before-image) — **12 / 12 green** — and on the round's — **6 of 12 red**, the same titles: the shift's,
not a foreign red. (i) `site/test/water/exit-bar.test.ts` (M0-e-03's; leg 3 of this merged round, M0-e-03 S4, reads
this leg's change): "three full CITY frames, …": seed 4's fast-ring fallback texts gain
`water:tributary:0: mouth: a pocket inside a pocket` beside `water:river:0: offset: a pocket inside a pocket` (the
kernel's buffer takes the ring: a fallback, not a refusal — `refused` 0, every hard invariant, deck and shore check
still pass on all three frames); the pin `fallbacks[4]` is the figure that moves. (ii)
`bench/test/site/spike.test.ts` (M0-e-06's; for M0-e-06 S4's re-run): the relief-60 fixture at the test size, seed 2
(900 ha frame; the derivation that three titles of "the river fixture's trace crosses the river only at water
gates …", one of "the water-gate receipt's own readings" and one of "containment never counts an S1 land face as held"
read): before, S1
delivered attempt 2 (full, tier 3, carve 390 cm, ladder uses 84) and S5 refused `E_SELF_INTERSECT`; after, attempt 0
— the course the line re-trace now fits, nearer the centre, so `betterRiver` takes it (full, tier 2, carve 231 cm,
ladder uses 54; water `80a57022…` → `b15aadbd…`, the probe's own hash of the water set) — and S3 refuses
`E_SELF_INTERSECT` on `town:10bqcwtcw044g`, so S3's commit and slice the five titles read are absent. The derivation's
refusals stay one (S5 → S3); relief-60 seed 1 is unchanged (attempt 1, water `422cb5c0…`, no refusal). Both S1
outputs are lawful (each course fits the cap, leaves by the frame, reaches the core); the refusal is S3's on a lawful
river — a downstream class for its owner, with this seed. The spike test's choice of seed 2 for its two-gates
derivation and the M0-e-06 summary figures above are the re-run's. No other red file had been seen when that run
ended; the full RELATED@1000 of this round is in the gates paragraph below.

**Refusals (J264 (5), J290, N-58).** The lane's census probe (a vitest file in the mirror only): the eight small CITY
fixtures (`valley`, `valleyWithSink`, `valleyWithCrater`, `valleyWithRidge`, `valleyFallingEast`, `eastward`,
`valleyWithSide`, `gully`) × nine requests (bearings 0, 23.63°, 45°, 60°, 90°, 240°, the highest edge, an estuary, a
tributary from 90°) × seeds 1 – 3 × {default, `hydroCoarsen`}, plus F-WORK on each — 440 `runRivers` runs, on the
round's start and on its end: refusals **0 → 0**; delivered river full 185 → 190, degraded 255 → 250 (a delivery tier,
not a refusal), tributaries full 48 → 48. The spike's S1 at 2 × 200 seeds × 2 reliefs: refusals 0 → 0. No refusal to
class.

**The surviving mutant.** Q3 — the last re-trace's touch check removed — survives the 67: the course through a descent
line's cells' centres touching itself at the class's clearance (10 m river, 3 m tributary, more than twice that apart
along it) needs the line to cross or double back within a cell, which the steepest strictly-lower step and the
surface's parent chain on a flat (a shortest path) are not seen to make on any fixture of the set (reasoned, PLAUSIBLE;
not measured over the census). Not proven equivalent; it fails safe (a touching
course is never delivered, the last try stands): a note for the hardening pass (N-45), not a fix.

**Mutant table (16 targeted; each file restored from the tree and confirmed with `cmp -s` before the next).** The one
mirror `waves/selfcheck-build-M0-e-02-fix-s2` (a `cp -a` copy; isolation proven before the first mutant: no link into
the tree, `@plat/kernel` and `@plat/layout` resolving inside the mirror), its sources equal to the tree's (`cmp`);
`--bail=1`, so the first failing title is the killer. D2c → the corridor's-last-cell title; K20t → the tie-break
title; N02c, N02x → the edgePoint clamp title; Q1, Q9 → the gully title; Q2 → "re-trace from the last good knot …"
(its ridge is invisible to the grid, so the line's course cuts past the cap and must not be delivered); Q4, Q6, Q8, Q10
→ the relief-bar Q123 title (the first of the two Q123 titles run; the gully title's 25 m knot spacing also asserts
Q10's case); LE1 → the
tributary title. Q3 survives (above). D2c, K20t and N02c each survived the pre-round set (the closing check's notes
above, 56 / 56 and 62 / 62); the gully and relief Q123 titles are red on the round's start (Q1 is that state's trace).

**Seat note.** Twice in this seat a probe and a short pin run of mine overlapped for under a minute (a 3-title
`-t N-s1c` run while the first probe ran; a probe restart whose orphaned worker went on appending until killed —
its mixed rows filtered out by their missing fields); no gate, census or mutant ran beside another run. The seat of 2026-11-10 ended on a usage limit while its RELATED@1000 ran; a
fresh seat continued from the lane's CHECKPOINT lines (2026-11-11): the tree's 19 hydro files hash-equal to the
gates' snapshot, the mutants above not re-run, the mirror rebuilt for the attribution replays above and removed.

**Gates (this round's tree; W=1, rule (6)).** `corepack pnpm install --frozen-lockfile` 0 ("Already up to date");
`corepack pnpm lint` 0 (eslint 1283 files, 0 errors, 0 warnings; `lint: probe-red ok`; the 9 whole-tree checks),
re-run after this paragraph, 0; `corepack pnpm build` 0. **NEAR** at full strength (PR size, `PLAT_FUZZ_RUNS` unset):
`vitest run --maxWorkers=1 packages/site/test/hydro` — 5 files, **67 / 67** (2026-11-11 19:05, seed 1552970066).
**RELATED@1000**: `PLAT_FUZZ_RUNS=1000 vitest related --run --maxWorkers=1 packages/site/src/hydro/trace.ts
packages/site/src/hydro/params.ts` (2026-11-11 19:06 – 21:16, seed 1091786238) — 273 files, 3 459 tests: **271 files
green, 6 tests red in 2 files, exactly the two attributed above** — `site/test/water/exit-bar.test.ts` "three full CITY
frames, …" (`fallbacks[4]` gains `water:tributary:0: mouth: a pocket inside a pocket`; for M0-e-03 S4, leg 3) and
`bench/test/site/spike.test.ts`'s five relief-60 seed 2 titles (S3 refuses `E_SELF_INTERSECT` on
`town:10bqcwtcw044g`, so `s3.commit` / `s3.slice` are absent; for M0-e-06 S4). No other red: none of J176's five
Mac-reference files and no KI red appeared (green or not on the path). By the RELATED rule these two reds are the
item's (`trace.ts`, changed, is on both files' import path), and they can be cleared only in other items' files
(rule (1)): the declared shift's two named re-pins, **for the session's ruling** (let leg 3 and M0-e-06 S4 absorb
them, or narrow the fix). The landed records and `landed:verify` follow this paragraph (the lane's log).

**Session ruling J766 (2026-11-11, on the hand-back of 21:20Z; the block is lifted).** (1) Q123's fix stands as the declared shift stated above (relief-3000 CITY fits 145 -> 173 of 200 default, 137 -> 152 coarse, none lost; refusal census 0 -> 0); the closing check judges it on its own evidence. (2) The six RELATED reds are the shift's, not this leg's failing lines: `site/test/water/exit-bar.test.ts` "three full CITY frames" is M0-e-03's (leg 3 re-pins it as its first act; a declared red through this leg's check) and `bench/test/site/spike.test.ts`'s five relief-60 seed 2 titles are M0-e-06's (re-pinned by the session's seam at the landing, measured on the merged tree). The check confirms the attribution (both files green on the start sources, red on the round's) and that no other test moves. (3) No source change on this re-entry; records re-landed; ready-for-check. (4) Residual class B of Q123 (27 of 200 default, 48 of 200 coarse) is the fixture's property, for the session to close or route at the landing.


## Closing check of hardening round S2 (lane `check/M0-e-02-close-s2`, 2026-11-11) — the checker's notes

The verdict is `checks/M0-e-02-s2.md`. None of the rows below is a blocker of the round (N-45; the blocker rule of the
closing check): N-s2c-1 is older than the round — identical on main `a8011be`'s sources (blob-verified) — and fails
safely; N-s2c-2 – N-s2c-5 are pin gaps on behaviour that is correct today on the round's new path. Probes and mutants
were the checker's own (its mirrors under `maps-scratch/waves/check-M0-e-02/s2/`; `--maxWorkers=1 --bail=1
packages/site/test/hydro` for the mutants; a census of 1 620 `runRivers` runs — ten small CITY fixtures (the item's
eight and the checker's `dome` and `basin`) × nine bearings × {plain, two tributaries, estuary} × {default,
`hydroCoarsen`}).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s2c-1 | **A joining tributary's carve digs a pit in the river's bed at the confluence; the cumulative cut can pass carveMaxCm (older than this round: identical on the round's start sources).** `runRivers` carves the plans in order, each against the raster as the earlier carves left it. A tributary whose own bed (a running minimum along its course) arrives lower than the river's bed at the joined cell lowers the river's channel cells inside its half-width. On the item's registered `valleyWithSide`, river from 90°, one tributary from 180°, seeds 1 and 2: river `fits`, `frame`; tributary `fits`, `join`; at the default cell the river's course and bed alone are monotone (2 940 cm at the confluence), the tributary ends at 2 808 cm and one or two river-bed cells at (5 200, −74 800) cm read 2 808 — a pit of 132 cm, after which the bed rises 116 cm (seed 1) and 90 cm (seed 2); with `hydroCoarsen` the rises are 164 and 122 cm. The test's own reading (`nonIncreasing(bedAlong(terrain, course))`, what `carveBars` asserts) is `false` there. A sweep of 720 tributary runs (ten fixtures × nine bearings × one or two tributaries at ±90° of the river × seeds 1 – 2 × both cells): a rising bed on 63 runs before the round and 66 after (registered fixtures: 5 of 288 one-tributary runs both, 34 → 33 of 288 two-tributary runs; the largest rise 400 cm). The round's rescue moves the count through this older mechanism only (a tributary that was degraded now fits, joins and digs: `basin` +4 runs, `gully` −1). On the checker's `basin` (ground rising 5 % to every edge) the summed cut of two courses on a few raster cells reads up to 430 cm against the cap of 400 (8 of 72 runs before, 6 after); each course's own `maxCarveCm` is ≤ 400, so the report does not show it. No refusal, no throw, deterministic; D8 stays defined on 100 % (the hydrology field is not re-sampled from the raster). The pipeline's fixtures request no tributary, so no committed summary or digest reads it. | Reconcile a later course's carve with the earlier channels (clamp a joining tributary's bed at the joined cell's bed, or lower the joined river downstream of the confluence to keep it monotone; measure the cap against the raster before any carve), with a pin on `valleyWithSide` at 90° / 180°, seeds 1 – 2, and a tributary sweep in the census. A declared shift for every run with a joining tributary (M0-e-03's water tests read some). | the item's next hardening round (M0 — it is the exit bar's own reading on a registered fixture), not M4 |
| N-s2c-2 | **The line re-trace's self-touch check is unpinned** (the builder's Q3, re-run as QB: the `firstSelfTouch` line removed survives 67 / 67). The checker's census is identical under QB (0 of 1 620 outputs move): no descent line's own course touched itself there. Not proven equivalent. | A hand-built field whose descent line doubles back inside the clearance (a hairpin one cell apart at the tributary clearance), asserting the last try stands. QB must go red. | M4 (hardening) |
| N-s2c-3 | **The line re-trace after a touch or a stuck third re-trace is unpinned.** QI (`if (last.ok \|\| last.failure !== 'carve') return last`) and QN (the event's cause written as `'carve'` always) survive 67 / 67; the census is identical under QI. The cases are real: on the spike's relief-3000, 10 of 84 class-A attempts (default; 5 of 43 coarse) end their third re-trace on `stuck` or `touch` and are rescued by the line. | One relief-bar key (or a small fixture) whose delivered attempt's third re-trace failed on `touch` or `stuck`, asserting the fourth re-trace and its cause. QI and QN must go red. | M4 (hardening) |
| N-s2c-4 | **A tributary's line re-trace ending beside the river is unpinned.** QJ (the last `descentLine` called without `opts.stop`) survives 67 / 67 and is not equivalent: 24 of 1 620 census outputs move (23 on `basin`, 1 on `gully`, two-tributary requests) — the rescued tributary runs on to the frame instead of joining. The code as written joins (the census: every rescued tributary `fits`, `join`). | A tributary fixture whose knot courses fail three re-traces while its line fits (a gully running into the river's corridor), asserting `flowTo`, `outfall: 'join'` and the confluence point. QJ must go red. | M4 (hardening) |
| N-s2c-5 | **The delivered line's carve-rung events are unpinned.** QF2 (the `...tried` events dropped, the re-trace event kept) survives 67 / 67; report-only (the ladder uses of rung 1 on the delivered line), no output moves in the census. | In the relief-bar Q123 title, assert the delivered attempt's carve uses after its last re-trace equal the line's own sink crossings. QF2 must go red. | M4 (hardening) |
| N-s2c-6 | **The declared shift moves a downstream refusal from S5 to S3 on one spike derivation (another stage's refusal on S1's river; J264, J290).** The site spike's relief-60 fixture at the test size, seed 2: on the round's start sources S5 refuses `E_SELF_INTERSECT` (the spike test's own title: "S5 refused, S6 not reached"; by the builder's probe S1 delivered attempt 2); on the round's sources S1 delivers another river (by the builder's probe attempt 0, which the line re-trace now fits) and S3 refuses `E_SELF_INTERSECT` on `town:10bqcwtcw044g` (key `S3@town:10bqcwtcw044g`) — read in this check's RELATED@1000 log and in its attribution replay (`bench/test/site/spike.test.ts:179`, five titles red; green 12 / 12 on the start sources). One refusal on the derivation on both sides; S1 itself refuses nothing and commits (the report's S1 entries are empty). Input kind: OUR OWN INTERMEDIATE (S1's river from lawful input); verdict: MAKE-IT-SUCCEED. Not counted in this item's census (0 → 0), which is S1's. The finishing seat also re-ran `site/test/water/exit-bar.test.ts` in its mirror with `fallbacks[4]` given the received text: 2 / 2 green, so the declared red there masks nothing (frames 10 and 3 pass unchanged, `refused` 0). | For S3's owner, with the seed: make S3 commit on this river (the session's seam re-pins the five titles on the merged tree, J766 (2) (ii); the refusal itself is the row). Nothing to change in `hydro/`. | the session's routing (S3's item; M0 if the spike's census reads it, else M4) |
