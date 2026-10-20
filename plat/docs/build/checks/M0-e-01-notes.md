# M0-e-01 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-e-01 (lane `check/M0-e-01-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, the closing check fails the item only on a blocker. Neither finding below is a
blocker: one is a hardening test for a boundary the code already gets right, and the other records why a fix-round
assertion adds no mutant kill of its own, so that a later checker does not report it again. Each row names its
handling and where it belongs. The verdict and its evidence are in `checks/M0-e-01.md` (the closing round is at the
top).

The first check's notes N-1 – N-5 stay in `checks/M0-e-01.md`. N-1 is still the session's to route to M0-e-03 /
M0-x-02: the ore sampler must continue the heightfield's `terrain.noise` stream, not restart it. The ids below continue
that numbering.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-6 | **The low band's edge is inclusive, but no test holds it.** `groundClasses` classes land as low when `height[c] <= lowest + LOW_BAND_M * 100` ("within `LOW_BAND_M` of the lowest land", C-0165 (4)). Mutant E11 (`<` for `<=`) survives the whole `test/terrain` set ("61 passed (61)"), because no fixture places a resource-cell centre exactly at the band's top. It is not equivalent. A mirror-only probe shows this: a flat TOWN site at 300 cm, a water row at 0 cm and one land row rewritten through `heightWriter` to exactly 300 cm + `LOW_BAND_M`, with that row asserted `GROUND_CODES.low`. The probe passes on the item's code ("1 passed (1)") and fails on E11 ("expected 3 to be 2"). Heights are integer centimetres, so an edge cell is reachable on an honest input (a terrace or a carved shelf), but the item's code gives the right class there. CONFIRMED (executed). The probe's source is `scratchpad/waves/e01close/probe-edge.test.ts`. | Add one edge row to `resources.test.ts`'s lowest-land test (its ridge at 300 cm + `LOW_BAND_M` and asserted low, or a second row beside the 600 cm ridge). | M4 (test hardening), or earlier, at the first change to `groundClasses` (for example, when M1's S1 seat replaces the water-table stand-in) |
| N-7 | **`strategy.test.ts` line 34 adds no kill of its own.** The fix round's assertion that `terrain.controls` is not among the context's requests is implied by line 31's exact `toEqual([{ concern: terrain.noise, entity: TOWN_ROOT }])`. Mutants T1 (`terrain.controls` instead) and T1b (`terrain.controls` as well) both fail at line 31 first. Line 34's own value is the one C-0167 (1) states: it type-checks the concern's registry name, so a rename of the registry row fails `tsc -b`. The kills are CONFIRMED (executed: T1 and T1b, messages in the verdict). The type-check is PLAUSIBLE (by reading, not executed): `CONCERNS` is a frozen object literal, the base config is `strict`, and the root `tsconfig.json` references `packages/site/test`. | None. The line is harmless and does what C-0167 says. This row is recorded so that a later checker does not report it again. | — |

## Consolidation round C1 (R1 of `consolidation/site-plan.md`; lane `build/M0-e-01-consolidate-1`, 2026-10-12) — the builder's map and notes

The round applies `consolidation/site-plan.md` §1.1 E-1 – E-6, §2 C-terrain-1 and §3.1 T-terrain to the SITE half of
the owns (`site/src/terrain/`, `site/test/terrain/`). The kernel half (`kernel/src/noise/`,
`kernel/src/adapters/simplex-noise.ts`, `kernel/test/noise/`) is byte-identical: it is the kernel plan's R13. Every file
outside `site/src/terrain/` and `site/test/terrain/` is byte-identical too (SHA-256 of all 64 files of `site/src`,
`site/test` and the kernel noise owns, before and after). The copies in `hydro/` and `water/` stay as they are until R2
and R3 adopt the new homes (J270 (b)).

**What changed, file by file.** No file was merged, split, renamed or moved. Every `describe`/`it` title is kept:
`vitest list` gives 61 titles before, and the same 61 plus one new title after.

| old | new |
|---|---|
| E-1: `src/terrain/grid.ts` `arenaReach` | unchanged (it is already the home; R2 and R3 adopt it) |
| E-2: `src/terrain/resources.ts:46–48` private `terrainGrid(t)` | `src/terrain/grid.ts` `rasterGrid(t: Terrain): CellGrid` (a file-level export, not in the index): the same five-field literal in the same key order. `resourceGrid` reads `coveringGrid(rasterGrid(terrain), params.baseGridCm)`. |
| E-3: `src/terrain/primitives.ts:12–14` private `PI`, `RAD_PER_CDEG` | the same two lines, exported from the file (the same double literal; `PI / 18000` is evaluated once at load). `direction()` is not exported: its `finite` check would turn `inletOf`'s NaN inlet into a throw (plan §4). |
| E-4: `src/terrain/heightfield.ts:36–38` private `generated(epoch)` | `generatedLifecycle(epoch: number): Lifecycle`, exported from the file, with the identical object literal and key order. It returns a fresh object per call. `record()` calls it. |
| E-5: `src/terrain/strategy.ts:23–25` private `isBaseRung` | the same body (`BASE_RUNGS.includes`), exported from the file |
| E-6: none (the idiom is written out in hydro and water) | `src/terrain/grid.ts` `cellCentre(g, c, invCols)`: `i = c % g.cols`, `j = Math.round((c − i) · invCols)`, then `centreX`/`centreY`. No caller in terrain; R2 and R3 adopt it. |
| C-terrain-1: `src/terrain/index.ts:1–4` ("Created empty by the scaffold (M0-s-01, C-0013); this index and its folder are M0-e-01's.") | "This index and its folder are M0-e-01's." plus one sentence naming the file-level helpers for the sibling folders (`rasterGrid`, `cellCentre`; `PI`, `RAD_PER_CDEG`; `generatedLifecycle`; `isBaseRung`) and stating that they are not part of the API. The export lines are untouched. |
| plan §2 comment (a), (b) | Each of the six new exports has a one-sentence comment ending "file-level: shared by path inside `@plat/site`, not part of the package's API (J263 Q1's convention)". `grid.ts`'s header gains the sentence on the one centre-and-row arithmetic (C-0044). Every other terrain comment stands. |
| T-terrain (a): `test/terrain/strategy.test.ts:89–93` `build()`, `primitives.test.ts:114–118` `make()` (each a `buildTerrain` over a fixed frame) | `terrainOf(f, request, p, key).terrain` from `support.ts`, with the same frame, request, params and key. The id `'terrain:t'` becomes `'terrain:test'`. No test asserts it: `grep -n "terrain:t'\|terrain:test\|\.id)" test/terrain/*.ts` and `grep -n "\.id\b" strategy.test.ts primitives.test.ts` find only `strategy.test.ts:58` `expect(t.id).toBe(TERRAIN_ID)`, which reads `baseTerrain`'s output through `run()`, not `build()`. Neither describe compares whole records; they compare `heightCm` only. The two direct `buildTerrain` calls (`primitives.test.ts:104`, the refusal; `strategy.test.ts:178`, the shared stream) are kept, because each needs the result or the stream itself. |
| T-terrain (b): the raster-grid literal at `test/terrain/sampler.test.ts:28, 40` and `resources.test.ts:220` | `rasterGrid(t)`, imported by path from `../../src/terrain/grid.js` |
| T-terrain (c) | kept unchanged: `plane()`, `extremes`, `unclamped`, `acropolis`, `maskOf`, `resources()`, `HEAVY`, `siteContext` with its `requests` recorder |
| E-6's pin | `raster.test.ts` "cellCentre: cell c's centre is centreX, centreY of its column c % cols and its row by the reciprocal, to the double". It checks every cell of the height raster and of the hydrology and resource grids over it, at 5 m and 8 m. It also runs a property (2 000 runs): any grid of 1 – 5 000 columns and rows, any integer cell and origin in ±2²⁴, and the exact `origin + (i + ½) · cell` on each axis. This is the round's only new pin. |

**Mutant-kill map** (by title; nothing moved). R1 – R4 → `range.test.ts`. H1 – H8, H10, H11 → `strategy.test.ts` "S1 (1)'s
heightfield mechanism" and `range.test.ts` "the one door". S1 – S4 → `sampler.test.ts`. E1 – E12 → `resources.test.ts`;
E11's known survival is N-6 (hardening L27, not this round). G1, G2 → `raster.test.ts` and `strategy.test.ts`
"writes the record …". T1 – T3 → `strategy.test.ts`. P1 – P3 → `primitives.test.ts`. N1 – N5 and A1 → the kernel's
`test/noise` (untouched). The following were re-killed in this round's mirror by the consolidated tests (`--bail=1`, the
whole `test/terrain/` folder, W = 1):

* G1 (raster cols + 1) and G2 (margin share dropped): "writes the record …", `expected [ 641, 640 ]`, `[ 400, 400 ]`.
* E1 (fertile on rock): "is 0 on rock even under a threshold above the rock slope …".
* E5 (well yield not from the table): "reads the table's row for each cell's class …".
* E7 (lowest of every cell): "measure low ground from the lowest LAND …", `expected 3 to be 2`.
* E10 (band in cm): "take water, then a dry bed's gravels, …".
* P1 (cliff side): "cliff > raises the ground to the right of its bearing …".
* P3 (valley sign): "valley (along a compass bearing) > is its depth below its line …".
* H1 (fine octave outside the frame): "adds the fine octave inside the frame …", which now runs through `terrainOf`.
* H6 (primitives not added): the relief bar "the 3 000 m relief fixture …".
* S3 (no half-cell offset): "equals the raster at every cell centre …", which now runs through `rasterGrid(t)`.
* T1 (`terrain.controls`): "draws one stream …".

**This round's targeted mutants**: 29 in the mirror, one at a time, each file restored by copy and checked with `cmp`.
25 were **killed**, 4 **survive**.

The killed ones, by the helper they aim at:

* `rasterGrid`: RG2 (the origins swapped), RG3 (the hydrology cell), RG4 (originX + one cell) — killed by "equals the raster at every cell centre …".
* `cellCentre`: CC1 (`Math.floor` for `Math.round`), CC2 (`c % rows`), CC3 (i and j swapped), CC4 (`c · invCols` without `− i`) — all killed by the E-6 pin.
* `PI`, `RAD_PER_CDEG`: RD1 (π ÷ 1 800), RD2 (π = 3.14159), RD3 (negated factor) — killed by "valley (along a compass bearing) …".
* `generatedLifecycle`: L1 (seq = epoch) and L2 (epoch 0), killed by "writes the record …" (`since: { epoch: 3, seq: 0 }`); L3 (`pinned: true`), killed by "is one height everywhere …" (`t.lifecycle` `toEqual` the literal).
* the twelve earlier mutants listed above.

The survivors:

* RG1 (rasterGrid's cols and rows swapped) is non-equivalent: see N-c1-1.
* L4 (a memoised lifecycle, one shared object per epoch): see N-c1-2.
* CC5 (`origin + i · cell + cell / 2`) is **equivalent** on every grid this package makes. Cells and origins are integers, so both forms are exact. The plan's nuance keeps the `(i + ½) · cell` form, and the code does.
* B1 (`isBaseRung` always true) survives because the terrain strategy's `rung` refusal has no pin of its own. That pin is hardening row L27's (plan Q7 (a), J301 Q7 (a)), not this round's. The probe's `refuse rung` line holds the refusal's text before and after.

**NO-SHIFT evidence.** A probe ran in the mirror only, over the pre-round sources and then over the consolidated ones,
and its output is **byte-identical**: 608 lines, sha256 `8a9023f21b8e8e4c…`. It covers, using only the folder's public
API:

* `baseTerrain.terrain` on 30 runs: TOWN seeds 1 – 6 × four reliefs, CITY seeds 7 and 8, METROPOLIS seed 9 (plain and hilly), at epochs 0 – 4, with all four primitive kinds, wind, datum and sizes by area, population and aspect. Each run records the whole terrain record (the typed arrays by SHA-256, the lifecycle and the features), the context's stream requests, 60 sampler reads, the `flowAt` throw text, the resource grid, `groundClasses` with and without a water mask, and all eight `siteResources` rasters.
* `flatTerrain` × 5 and the clamp fixture, with its `W_HEIGHT_CLAMPED` count.
* 21 refusal cases through `baseTerrain` with their codes and texts: 19 typed refusals (`relief`, `datum`, `aspect`, `area`, `range`, `rung`, `frameLaw` and each `primitive 1: …`), the ravine's TypeError (N-c1-3) and the negative-radius terrace that builds (N-c1-4). Also 11 preparer outcomes (9 RangeError texts) and `heightGrid`'s 4 RangeError texts.
* the primitives' offsets over 49 bearings × 3 kinds × 20 points, as float64 bits.
* 280 `arenaReach`/`heightGrid`/`coveringGrid`/`hydroGridOver`/`centreX`/`centreY` cases, 12 `siteFrame` results, and the constants.

Further evidence:

* The pre-round tests pass on the new sources (61/61). The new tests pass on the pre-round sources with the two new homes appended to the old `grid.ts` (62/62).
* The emitted JavaScript (esbuild, comments stripped) is identical for `index.ts`, `params.ts`, `range.ts`, `sampler.ts` and `types.ts`. It differs in `grid.ts` (the two added functions), `heightfield.ts` (`generated` → `export function generatedLifecycle` and its one call), `primitives.ts` (two `export` keywords), `resources.ts` (the import, `terrainGrid` removed, its one call renamed) and `strategy.ts` (one `export` keyword).
* API frozen (J263 Q1): the runtime export names are identical — `src/index.ts` 129, `terrain/index.ts` 33, `hydro/index.ts` 59, `water/index.ts` 37 names. The non-comment lines of the four indexes are identical (hashes `73ba4c1c…`, `72e5f7f9…`, `e9e5a867…`, `43633d0c…`). The new names exist only at file level: `grid.ts` 6 → 8, `primitives.ts` 3 → 5, `heightfield.ts` 3 → 4, `strategy.ts` 4 → 5.

**Refusals (J264 (5), N-58).** The terrain's registered families have no refusal: **0 before, 0 after**. These families are `baseTerrain` over the three base rungs and every relief class, the relief fixtures of the exit bar, and the probe's 30 lawful runs and 5 flat fixtures. The probe's refusal corpus gives the same outcomes before and after: 19 typed refusals. Each is UNLAWFUL input (an unknown relief class, a non-finite elevation, an aspect outside [0.5, 2], a zero or NaN population, an out-of-range arena, a non-base rung, a `territory` frame law, a primitive below 1 cm or non-finite) and is a REFUSE, `E_OUT_OF_RANGE` with its detail. S0's request validation is the layer that gives the user the alternative, and §11.4's doors hand S1 no raw request. No lawful-input refusal was seen.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-1 | **`rasterGrid`'s cols/rows order is unpinned by the terrain folder** (CONFIRMED). Mutant RG1 (cols and rows swapped) passes `test/terrain/` (62/62). Every resource test uses a square frame, and the sampler tests read only `originX`, `originY` and `cellCm`. It is non-equivalent: the NO-SHIFT probe's non-square resource grids differ in 50 lines (for example `rgrid … "cols":33,"rows":48`). The same swap in the pre-round private `terrainGrid` also passes the pre-round tests (61/61), so this is a gap the round inherited, not one it made. R2's `rasterGeom` delegation will put the hydro folder's readers on it. | One `resourceGrid` equality on a non-square frame (e.g. `frame(0.4, 1.3)`) in `resources.test.ts`. | M4 (test hardening) |
| N-c1-2 | **"A fresh object per call" is unpinned** (CONFIRMED by mutant L4: a per-epoch memo of the lifecycle passes 62/62). The code keeps the nuance: one literal per call, as the emitted JavaScript diff shows. No terrain test compares two records' lifecycles for identity. | `expect(generatedLifecycle(3)).not.toBe(generatedLifecycle(3))`, or two terrains' `lifecycle` objects distinct, once R2/R3 make it a shared home. | M4 |
| N-c1-3 | **An unknown primitive kind throws a TypeError, not a typed refusal** (CONFIRMED by the probe, the same before and after). `{ kind: 'ravine', … }` reaches `preparePrimitive`, which returns `undefined`, and the heightfield's `offsetCm` read throws `Cannot read properties of undefined`. The input is UNLAWFUL: `SitePrimitiveKind` types it out, and ravine is M1's (C-0165 (2)). | Detect and refuse: `E_OUT_OF_RANGE 'primitive <i>: unknown kind'` from `preparePrimitive`. | M4 (or M1 with spur/ravine) |
| N-c1-4 | **A negative radius is accepted** (CONFIRMED by the probe, the same before and after). A terrace with `radiusM: -1` prepares and builds as the terrace of radius 1 m, because the bump reads `dx²`. A hill takes the same `inverse()` path, so it should behave the same way (PLAUSIBLE, by reading). The "must be at least 1 cm" refusal tests the magnitude only, so this is a silently reinterpreted input, not a wrong record. | Detect and refuse a negative radius or width in `inverse()`'s callers, with a message pin. | M4 |

## Consolidation round C1 — the closing check's notes (lane `check/M0-e-01-consolidate-close-1`, 2026-10-12)

The verdict is in `checks/M0-e-01-c1.md` (PASS). No row below is a blocker. Each was CONFIRMED in the checker's own
mirror: the mutant, then the before- and after-image NO-SHIFT probe (`scratchpad/waves/check-M0-e-01/`). The ids
continue the builder's N-c1-1 – N-c1-4. Its N-c1-1 (RG1) and N-c1-2 (a memoised lifecycle) were re-confirmed by this
check as mutants RG1 and L2.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-5 | **π and the centidegree factor are pinned only to the tests' tolerance, not to the double.** Two mutants pass `test/terrain` (62/62): RD1 (`PI = 3.14159265358979`) and RD2 (`RAD_PER_CDEG = PI * (1 / 18000)`, a different double from `PI / 18000`). Both also pass the pre-round tests on the pre-round sources (61/61), so the gap is inherited, not made by C1. Neither is equivalent: the NO-SHIFT probe's valley offset grids differ in their float64 bits (4 lines). The code keeps the "same double" nuance, and the probe shows it byte-identical before and after. The rounds that adopt these constants by path are R2 (`hydro/strategy.ts`) and R3 (`water/offset.ts`); from then on they feed river inlets and caps. | One bit-exact pin in `primitives.test.ts`: `expect(RAD_PER_CDEG).toBe(3.141592653589793 / 18000)` and `expect(PI).toBe(3.141592653589793)` imported by path; or the float64 bits of one valley offset. | M4 (test hardening; L27's pattern), or R2's round if its closing checker wants the constants held before hydro reads them |
| N-c1-6 | **"Never a shared frozen instance": a frozen, fresh lifecycle is unpinned too.** Mutant L3 (`Object.freeze` of each fresh literal) passes `test/terrain` (62/62). The probe's `frozen` lines tell it apart. No code under `packages/*/src` writes a lifecycle in place (a grep for in-place writes to `lifecycle.`, `.flags.<x> =`, `lifecycle =` found none), so neither L2 nor L3 is observable today. It would become observable at the first in-place lifecycle edit (§7's edit events). | Extend N-c1-2's pin: two records' lifecycles distinct, and `Object.isFrozen(t.lifecycle)` false. | M4 |
| N-c1-7 | **Two equivalent survivors, recorded so that a later checker does not report them again.** RG4: `rasterGrid`'s keys in another order. No `rasterGrid` value is serialized (`coveringGrid` builds its own literal), and the probe is identical. CC4: `cellCentre` as `origin + i · cell + cell / 2`. On every grid the package makes (integer cells and integer origins) both forms are exact, and the probe is identical. The plan's nuance keeps the `(i + ½) · cell` form, and the code does. R2's `rasterGeom` delegation returns the `rasterGrid` value itself; if a hydro reader ever serializes it, RG4 stops being equivalent there. | None now. R2's closing checker re-judges RG4 against `rasterGeom`'s readers. | — (R2 re-judges) |
| N-c1-8 | **`grid.ts`'s header sentence is literal for the terrain folder, and for the hydrology and water readers only after R2 and R3.** The sentence says every other grid "reads a cell's centre and row through `centreX`, `centreY`, `cellCentre`". That holds for `heightfield.ts` and `resources.ts`. The hydrology grid's readers in `hydro/` (`trace.ts:130–131, 292–293`, `strategy.ts:129–131`, `carve.ts:102, 106`) and `water/outfalls.ts:99, 103, 122` still spell the same arithmetic inline. That is J270 (b)'s coexistence: the arithmetic the sentence names is the one each uses (CONFIRMED by grep), and the plan (§2 (b)) prescribes the wording. Plan E-6 keeps the hot loops' inline `ci`/`cj` in `flood.ts`, `flats.ts`, `d8.ts` and `surface.ts`, so the sentence may need a qualifier after R2. | R2's and R3's closing checkers read the sentence against their folders after adoption. If a reader stays inline by design (the hot loops), R2 qualifies the sentence in `grid.ts`, an M0-e-01 file: by a plan amendment, or in M0-e-01's next round. | R2 / R3 (flow-7) |

**Session note (not M0-e-01's).** RELATED@1000 over the round's six changed sources has one red: `packages/testkit/test/edge/repins.test.ts` "EP-01/S8/zero-length at 2521534151: S8's seam-portals row refuses lawful input — refused-lawful, …" fails with `expected 'laddered' to be 'refused-lawful'`. In the checker's mirror the test is red identically on the pre-round `src/terrain` ("1 failed | 23 skipped (24)" on both images). The file has mtime 05:37, the WSL restore, and no landed record names it: it is M0-x-06's in-flight repin. Replay it with `PLAT_FUZZ_SEED` unset and seed 2521534151.
