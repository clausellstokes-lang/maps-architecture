# @plat/site — consolidation plan (lane `session/consolidation-site`, flow-7)

Written by the consolidation architect seat under docs/PROGRESS.md J259/J260 (the owner's directive of 2026-10-11: "we
are adding things again and again and doing it all patchwork style — clean up, consolidate, make elegant and coherent the
code and comments, and make sure it stays at the same quality or higher") and the rulings every plan obeys — J263 (the
public API frozen; shared helpers file-level, imported by path; pinned message texts verbatim), J264 and N-58 (zero
refusals of lawful input: a refusal noticed is routed with its seed, never silently changed), J268 and J273 (a
consolidation round is a proof of zero change; behaviour changes, KI pin gaps and verdict changes go to the hardening
queue), J270 (a round adds exports inside its owns and leaves every file outside them byte-identical; two exact copies
coexist between rounds), J290 — and J112's rule (elegance without losing nuance; every unification carries a full
EQUIVALENCE LIST; a nuance lost is a blocker). This seat planned only: no code, test or data file was changed and no
test suite was run. Evidence is the code, the tests and the records — `checks/M0-e-01.md` and `-notes.md`,
`checks/M0-e-02.md` and `-notes.md`, `checks/M0-e-03.md`, `-s1.md`, `-s2.md` and `-notes.md` (the mutant tables are the
oracles below), `checks/M0-spec-notes.md` N-04, N-51, N-54, N-56, `docs/M0-FIX-QUEUE.md` Q20, Q31, Q36,
`docs/KNOWN-ISSUES.md` (no row names the package; KI-10 and KI-11 name S5/S6 on its river), the three items of
`M0-work.json`, `M0.md` §0, §1 (e), §2.1's entries, §3, §4, §5 item 80, every `choices.md` row the package's code or
tests cite (C-0013, C-0016, C-0048, C-0057, C-0065, C-0085, C-0123, C-0142, C-0143, C-0158, C-0165, C-0167, C-0173,
C-0175, C-0229, C-0233, C-0264, C-0295, C-0307, C-0310), the design's §2.3 whole and §4.2 S1 (1)–(10) — read whole under
`plat/CLEAN-ROOM.md` §1.

Conventions. `src/…` and `test/…` are `plat/packages/site/src/…` and `plat/packages/site/test/…`; line numbers are those
of the tree read on 2026-10-12. Tree state: M0-e-03's session rounds s1 (C-0307, Q20 class A) and s2 (C-0310, Q31) are
landed on main; nothing of `@plat/site` is in flight. "Public API" means every name a folder's `index.ts` exports:
`src/index.ts` does `export *` from the three folder indexes (terrain 37 names plus `types.ts`'s 15, hydro 88, water 56
— about 196 names), so **every folder-index export is a public export of `@plat/site`**. The package's dependency
direction inside itself is `terrain ← hydro ← water` (hydro imports `../terrain/{grid,range,sampler,strategy,types}.js`,
water imports `../hydro/{course,field}.js` and `../terrain/{heightfield,types}.js` — the precedent for sharing by path),
and across packages `kernel ← model ← tables ← site` through the three barrels only (`test/terrain/range.test.ts` pins
the import specifiers of every source file to `./`, `../`, `@plat/kernel`, `@plat/model`, `@plat/tables`; so a kernel
helper the kernel plan homes in `num/exact.ts` without re-exporting it (J263 Q1) is **not** reachable from here). The
invariant of this whole plan: **no exported name is added to, removed from or renamed in any folder index; no exported
name changes its signature or behaviour; every item-listed interface (`TerrainStrategy`, `terrain(bp, ctx, k)`,
`TerrainSampler`, `SiteResources`, `fbm`, `sitePrimitives`; `RiverStrategy`, `rivers(…)`, `priorityFlood`,
`resolveFlats`, `d8`, `accumulate`, `traceRiver`, `carveCourse`, the `hydroCoarsen` switch; `S1`/`s1Stage`,
`siteCrossings`, `waterFaces`, `landComponents`, `outfalls`, `WaterSet`, `Bridge (site)`) is untouched; every
persisted form — the `Terrain` record (its Int32 raster through the one door, its `hydro` grid and flow arrays, its
outfalls), the `WaterBody` records (course, controls, ordinals, width profile, ids `water:<kind>:<n>`,
`water:estuary:<n>`, `bridge:<n>`, `land:<n>`), the L0 batch's rows (`margin`, `shore`, `bank`, `deck_end`), the
`RiverReport`/`S1Report` shapes and their ladder rows, the fixture `test/water/fixtures/q20-slow-rings.json` — is
byte-identical; every refusal code and every message text a test pins (`E_OUT_OF_RANGE` details `relief`, `datum`,
`primitive <i>: …`, `water`, `fertileSlopeMax`, `rung`, `terrain`, `aspect`; `carve <n> cm > carveMaxCm <m>`; the
`S1 water: the river's ring was refused on the kernel's polygons (the fast ring: …); no further rung — …` detail;
`references-resolve: <n> problem(s) at S1's end: …`; the `not clear (…)` causes; `near the edge`; the `flowAt: this
terrain carries no hydrology yet — S1 (3) …` throw; `siteCrossings`' and `outfalls`' RangeErrors; `accumulate`'s
`cycle`) is unchanged.** Consolidation acts on non-exported helpers, on the bodies behind exported names (a duplicate
exported body becomes a one-line delegation to the kept implementation, under both names), on comments and on tests; a
helper two folders share is **exported from its file and imported by path** (`../terrain/grid.js`, `../hydro/course.js`,
`./polygons.js`), never added to an index — J263 Q1's convention.

Scale. The package is 6 275 source lines and 4 528 test lines, young and coherent: one fix round on M0-e-01 (tests
only, C-0167), one on M0-e-02 (C-0175: the river's own surface — a design refinement, not a patch beside the old code),
one on M0-e-03 (tests only, C-0233) and two session rounds on M0-e-03 (C-0307 `provedRings`; C-0310 the row reported).
The patchwork is the kind three items writing the same plane geometry leave: the arena's reach written three times,
one raster-grid literal written twice in `src` and five times in tests, π and the centidegree factor twice, the
`generated` lifecycle three times, the segment-distance and segment-segment predicates once in hydro and again in
water, the lattice rounding three times, a 400 m constant twice under two names, one message fragment spelt in two
files, the ring proofs' loop twice, one `Uint32Array` wrapped in a class, and a module-level `why` for a refusal reason.
Nothing found is a behaviour bug. No test file needs merging or splitting: each is one subject; the test patchwork is
in the support (three `body()` builders, four copies of the stage-end reference list, five trace-option literals).

---

## 0. Summary and round order

**What was found, by kind.**

* **One plane fact written in three folders.** The arena's half-extent is `arenaReach` (`terrain/grid.ts:23`, public),
  `reachOf` (`water/geometry.ts:16`, public) and an inline pair at `hydro/strategy.ts:401`. The raster's grid record is
  `terrainGrid` (`terrain/resources.ts:46`) and `rasterGeom` (`hydro/carve.ts:34`, public), with the same five-field
  literal in `test/terrain/sampler.test.ts:28, 40`, `resources.test.ts:220` and `test/hydro/support.ts:92`; the two
  grid interfaces `CellGrid` (`terrain/grid.ts:14`) and `GridGeom` (`hydro/course.ts:13`) are one shape. A cell's
  centre is `centreX`/`centreY` (`grid.ts:66–73`, public) and the literal `origin + (i + 0.5) · cell` at
  `hydro/trace.ts:130–131, 293`, `hydro/strategy.ts:130–131`, `hydro/carve.ts:102, 106`, `water/outfalls.ts:99, 103,
  122`; "the cell index under (x, y)" is `cellAt` plus `j · cols + i` at `hydro/strategy.ts:641–643`,
  `hydro/trace.ts:473, 509`, `water/outfalls.ts:163–166`. π is spelt at `terrain/primitives.ts:12`, `hydro/strategy.ts:28`
  and `water/offset.ts:164`, the centidegree factor at `primitives.ts:14` and `hydro/strategy.ts:29`; the `generated`
  lifecycle at `terrain/heightfield.ts:36`, `hydro/strategy.ts:95`, `water/faces.ts:71`; `isBaseRung` at
  `terrain/strategy.ts:23` and `hydro/strategy.ts:99`.
* **One predicate under two public names.** `pointSegDist2` (`hydro/course.ts:87`) and `segDist2`
  (`water/geometry.ts:72`) are one function; `segSegDist2` (`course.ts:117`) and `segSeg2` (`geometry.ts:113`) are one
  function; `footOn` (`geometry.ts:87`) is the former's parameter with the point returned; `slopeKey` is written at
  `hydro/d8.ts:15` and `hydro/trace.ts:152`, and `steepest` (`d8.ts:253`) is `flowCode`'s first loop (`d8.ts:32–44`);
  `invOf(cols)` (`trace.ts:145`) is `invCols(g)` (`field.ts:63`); `unit(a, b)` (`water/polygons.ts:108`) is
  `unitOf(sub(b, a))` (`offset.ts:17–25`); the lattice rounding `lp` is at `water/crossings.ts:32`,
  `water/polygons.ts:117` and, as `pointCm`, `water/outfalls.ts:65`.
* **Two names, one value; one text, two files.** `ESTUARY_LENGTH_M` (`hydro/params.ts:43`) and `ESTUARY_SPLIT_M`
  (`water/params.ts:27`) are both 400 by design (C-0229 (4)); the fragment `"; the kernel's ring: "` is a constant in
  `water/stage.ts:61` and a literal in `water/polygons.ts:425`, the reader parsing what the writer spelt; the ring
  proofs (`isSimple`, `clearRing`, `ringsApart`, `clearOf` in that order, with their four causes) run as one loop at
  `polygons.ts:526–531` and again at `:454–459`, and the `fixed` vertex predicate with its 2 cm band (`<= 4`) at
  `:447–448` and `:512–513`.
* **Dead layers.** `Counts` (`hydro/d8.ts:143–160`) wraps a `Uint32Array` for three one-line operations;
  `offset.ts:125–130` keeps the last refusal's reason in a module variable `why` read back through `refusal()`.
* **Comments that narrate.** `water/stage.ts:8–10, 35, 60, 68, 141, 170` cite Q31 and N-56 (1); `water/polygons.ts:15,
  421, 437` cite N-56 (1); `hydro/surface.ts:1` says "fix round 1"; the three folder indexes say "Created empty by the
  scaffold (M0-s-01, C-0013)"; in tests, `test/hydro/surface.test.ts:1, 5, 174` and `relief-bar.test.ts:138` narrate
  "fix round 1" and "checks/M0-e-02.md line 3; route (i)", `test/water/one-door.test.ts:6` "integration-g12's B-1",
  `support.ts:85` and `exit-bar.test.ts:10` "check B-1", `slow-rings.test.ts:1` and `references-row.test.ts:2` the
  session rounds and queue rows. `src/index.ts` already carries the J268 Q1 form.
* **Tests.** Every file is one subject; no merge or split. The support repeats itself inside each item's owns: three
  `body()` builders and two `LIFE` literals in `test/water`, four copies of the stage-end reference list, five
  `traceRiver` option literals and four `(rows − 1) · cols + (cols ≫ 1)` inlets in `test/hydro/river.test.ts`, two
  carve-bar checkers, two field builders, the raster-grid literal three times in `test/terrain`. Across items the three
  `support.ts` files repeat `TABLES`, `townKey`, `siteContext` and `frameOf` — outside any one item's owns (Q3).

**Round order** (one Opus seat per work item, inside its `owns`; a round depends only on the rounds listed; each round
adds the file-level exports its folder homes and adopts the earlier rounds' — J270 (b): between rounds two exact copies
coexist, which the no-shift checks tolerate by construction):

| # | Round (work item, owns) | Depends on | What it does (findings) |
|---|---|---|---|
| R1 | **M0-e-01** — `src/terrain/`, `test/terrain/` (its kernel owns `kernel/src/noise/`, `adapters/simplex-noise.ts`, `kernel/test/noise/` are the kernel plan's R13, not this round's) | — | E-1 … E-6: the homes every later round imports by path (`rasterGrid`, `cellCentre`, `PI`, `RAD_PER_CDEG`, `generatedLifecycle`, `isBaseRung` as file-level exports; `resources.ts` adopts `rasterGrid`); comment rewrite C-terrain-1; test plan T-terrain. The smallest round: the folder is coherent. |
| R2 | **M0-e-02** — `src/hydro/`, `test/hydro/` | R1 | H-1 … H-14: adopts R1's homes; `slopeKey`/`steepest` once; `invOfCols`; `cellIndexAt`; `segParam` (the home of the segment predicates water adopts); `Counts` inlined; `rasterGeom` a delegation; comment rewrite C-hydro-1 … 3; test plan T-hydro (one `support.ts`: `traceOpts`, `northInlet`, `cityHydrology`, `courseOf`, `carveBars`, `fieldOver`). |
| R3 | **M0-e-03** — `src/water/`, `test/water/` | R1, R2 | W-1 … W-14: adopts R1's and R2's (`reachOf`, `segDist2`, `segSeg2` delegations; `footOn` on `segParam`; `lp`; `cellIndexAt`; `generatedLifecycle`; `PI`); `KERNEL_RING` one constant; the ring proofs one loop; the `fixed` predicate one factory; `ESTUARY_SPLIT_M = ESTUARY_LENGTH_M`; `why` → a result; comment rewrite C-water-1 … 3; test plan T-water (one `support.ts`: `waterBody`, `GENERATED_AT_0`, `SMALL_ARENA`, `heldRefs`, `hardFailures`, `everyL0EdgeShoreOrRing`). |

R1 before R2 because `hydro/strategy.ts`, `trace.ts`, `carve.ts` import what R1 exports; R2 before R3 because
`water/geometry.ts` delegates to `hydro/course.ts`'s predicates and `water/outfalls.ts`, `polygons.ts` import R2's
`cellIndexAt`/`cellCentre` readers. Every round is independent of the kernel's, model's and tables' rounds (the site
imports their public names only, which their plans freeze). None waits for an in-flight round: nothing of the package
is in flight. The closing check of each round runs the item's whole test set at full strength (the exit bars: terrain's
relief fixtures, hydro's relief bars, water's 100 seeds plus three CITY frames) and reports the refusal count of the
registered family before and after (J264 (5)): for water, the exit bar's `refused`, `retried` and stage refusals
(0 / 0 / 0 before; 1 refused tributary on seed 62 — Q8).

---

## 1. Findings per folder

Each finding: **where** (file:lines) · **consolidation** · **EQUIVALENCE** (what stays identical: outputs, records,
refusal codes and message texts, exported names and signatures) · **NUANCE** (every behaviour, bound, ordering,
rounding and edge case the merged code keeps) · **ORACLE** (the tests, bars, fixtures and seeds that prove zero shift;
the checks' mutants the merged tests must still kill; any new pin) · **RISK** · **ruling needed?**

### 1.1 `src/terrain/` (R1, M0-e-01)

**E-1 — the arena's half-extent, written three times.** `terrain/grid.ts:23–26` `arenaReach(frame)` (public:
`terrain/index.ts:8`), `water/geometry.ts:16–19` `reachOf(frame): Reach` (public: `water/index.ts:24`) and
`hydro/strategy.ts:401` `const reach = { x: Math.ceil(frame.value.widthCm * (0.5 + frame.value.marginShare)), y: … }`;
also `test/hydro/support.ts:86–88` `reachOf` (a test copy, kept — T-hydro).
*Consolidation:* nothing in R1 (the home exists). R2: `hydro/strategy.ts:401` → `arenaReach(frame.value)` (it already
imports from `'../terrain/grid.js'`). R3: `reachOf` keeps its name, signature and `Reach` return type as a delegation,
`export function reachOf(frame: Frame): Reach { return arenaReach(frame); }`.
*EQUIVALENCE:* the three bodies do the same floating-point operations in the same order — `0.5 + marginShare` first,
then `Math.ceil(widthCm · r)`, then the same for the height (`geometry.ts:17–18` names `r`, `grid.ts:24` `reach`; the
inline form computes `(0.5 + m)` inside each product — the same two operations, the same doubles); outputs are the same
integers; `Reach` and `{ x: number; y: number }` are one structural type.
*NUANCE:* a frame's `marginShare` is a double (0.3 from the ladder; 0.5 in the water tests' hand-built `FRAME`); the
ceiling is of the product, never of the share — keep the operation order.
*ORACLE:* `test/terrain/raster.test.ts` "cols × rows = ⌈2 · ⌈w · (½ + m)⌉ ÷ cell⌉ …" (`arenaReach(f)` deep-equals the
test's own `Math.ceil(f.widthCm * (0.5 + margin))`, 2 000 runs); `test/hydro/river.test.ts` "a river from the north
edge …" (`c[0]` equals `{ x: 0, y: reach.y }` of the test's own `reachOf`), the inlet tests ("… ray meets the north edge
…": exact `{ x: 25_000, y: 40_000 }` values), `relief-bar.test.ts` `expectFrameRiver` (the last point on the arena's
edge by `arenaReach`); `test/water/faces.test.ts` "committed alone, the ring …" (the ring's four points `toEqual`),
`slow-rings.test.ts` `REACH`, `exit-bar.test.ts` (every deck end 10 m from the ring: `ringGap(opts.reach, q)`);
mutants: none of the checks' tables targets the reach, which is why the equivalence list above is the proof. *RISK:*
none. No ruling.

**E-2 — the raster's grid record, written twice in `src` and five times in tests.** `terrain/resources.ts:46–48`
`terrainGrid(t): CellGrid` and `hydro/carve.ts:34–36` `rasterGeom(t): GridGeom` (public: `hydro/index.ts:27`) return
`{ cellCm: t.cellCm, cols: t.cols, rows: t.rows, originX: t.originX, originY: t.originY }`; the literal recurs in
`test/terrain/sampler.test.ts:28, 40`, `resources.test.ts:220` (`hg`) and `test/hydro/support.ts:92` (`bedAlong`).
`CellGrid` (`grid.ts:14–20`) and `GridGeom` (`course.ts:13–19`) declare the same five fields.
*Consolidation:* `terrain/grid.ts` exports from the file `rasterGrid(t: Terrain): CellGrid` (beside `heightGrid`,
`coveringGrid`, `hydroGridOver`, which it already homes); `resources.ts` uses it (its `terrainGrid` goes). R2:
`rasterGeom` becomes `export function rasterGeom(t: Terrain): GridGeom { return rasterGrid(t); }` (name, signature and
return type kept; `GridGeom` is structurally `CellGrid`, so no cast). `GridGeom` itself stays an interface (Q5 asks
whether `export type GridGeom = CellGrid` — a d.ts form change of a public type — is wanted; the plan's default is no).
*EQUIVALENCE:* the same five-field literal in the same key order (`JSON.stringify` of a grid is byte-identical); the
`Cm`-branded fields pass through unchanged.
*NUANCE:* `hydroGridOver` and `coveringGrid` are different functions (a grid *over* an extent at another cell) — not
touched. *ORACLE:* `test/terrain/resources.test.ts` whole (`resourceGrid` is `coveringGrid(rasterGrid(t), 3200)`:
"sits on the 32 m resource grid …", the ground-class tests), `raster.test.ts` "coveringGrid: the least cols × rows …";
`test/hydro/relief-bar.test.ts` (`hydroGridOver(rasterGeom(terrain), …)` on both reliefs), `river.test.ts` (every
`rasterGeom` reader), `strategy.test.ts` "each hydro cell's height is the raster's bilinear sample …"; mutants
M0-e-01 G1/G2 (raster cols, the margin share) and E1–E12 (the resource rules read the grid) stay red by title. *RISK:*
none. No ruling.

**E-3 — π and the centidegree factor.** `terrain/primitives.ts:12–14` `PI = 3.141592653589793`, `RAD_PER_CDEG = PI /
18000`; `hydro/strategy.ts:28–29` the same two lines; `water/offset.ts:164` the literal inside `cap()`'s
`(turn * 3.141592653589793 * k) / CAP_STEPS`. (The kernel's `geom/common.ts PI` is not a barrel export and §6.5 (3)
forbids `Math.PI`; `@plat/kernel` exports `cdeg` — a constructor of the branded type — not the factor.)
*Consolidation:* `primitives.ts` exports `PI` and `RAD_PER_CDEG` from the file (the header's convention: "bearings are
compass bearings in centidegrees … the trigonometry is dmath's"); R2 `hydro/strategy.ts` imports both by path
(`'../terrain/primitives.js'`); R3 `offset.ts` imports `PI`. Only the constants are shared: `primitives.ts:64–67`
`direction(bearingCdeg)` checks `finite` and throws a RangeError naming the field, while `inletOf` (`strategy.ts:194–196`)
multiplies the request's bearing unchecked — sharing `direction` would turn a non-finite bearing's NaN inlet into a
throw, a behaviour change on unlawful input; **not merged** (§4).
*EQUIVALENCE:* the same double literal; `PI / 18000` evaluated once at module load gives the same double wherever it
is evaluated; `dmath.sin`/`cos` receive the same argument. *NUANCE:* `offset.ts:164` divides by `CAP_STEPS` as a
literal `/` (test code's exemption does not apply — it is `src`; the lint's division rule, C-0044, admits a division by a
literal constant: the implementer keeps the expression as it is, only the π token changes).
*ORACLE:* `test/terrain/primitives.test.ts` "valley (along a compass bearing)" (0, 9000, 4500 cdeg exact offsets),
"cliff" (its right-hand side), mutants P1–P3; `test/hydro/river.test.ts` "the inlet rung moves the inlet …" (the 40°
ray: `px > 33_000`, `{ x: Math.round(px − 12_500), y: 40_000 }`), "the inlet rung delivers … (2363)", "with no
bearing …", `relief-bar.test.ts` "a river along a valley on its bearing (18000)"; `test/water/faces.test.ts` and
`stage.test.ts` (round caps on every body end inside the arena), `exit-bar.test.ts`. *RISK:* none. No ruling.

**E-4 — the `generated` lifecycle, written three times.** `terrain/heightfield.ts:36–38`, `hydro/strategy.ts:95–97`,
`water/faces.ts:71–73`: `{ existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned:
false }, since: { epoch, seq: 0 } }`. `@plat/model` exports no builder (`digest/workload.ts:58` holds a literal of its
own). *Consolidation:* `heightfield.ts` exports from the file `generatedLifecycle(epoch: number): Lifecycle` (the record
writer's own helper, read by `record()`); R2 and R3 import it by path. *EQUIVALENCE:* the identical object literal in
the identical key order, a fresh object per call (the records are plain mutable objects: `runRivers` writes
`terrain.hydro = …` on the record; keep "a fresh object per call", never a shared frozen instance).
*NUANCE:* `since.seq` is 0 at generation for every S1 record (C-0142; the digest's leaf reads it). *ORACLE:*
`test/terrain/raster.test.ts` "is one height everywhere …" (`t.lifecycle` `toEqual` the literal), `strategy.test.ts`
"writes the record …" (`since: { epoch: 3, seq: 0 }`); `test/hydro/strategy.test.ts` "returns the input water with the
rivers appended …" (`since: { epoch: 4, seq: 0 }`); `test/water/stage.test.ts` "sites: Bridges in state site …"
(`toMatchObject` on the bridge), "deterministic …" (`JSON.stringify` of the bridges). *RISK:* none. No ruling.

**E-5 — `isBaseRung`, written twice.** `terrain/strategy.ts:23–25` and `hydro/strategy.ts:99–101` (`@plat/tables`
keeps its own private one, `loader/ladder.ts:71`, and exports `BASE_RUNGS` only). *Consolidation:* `terrain/strategy.ts`
exports it from the file; R2 imports by path (`hydro/strategy.ts:15` already imports `siteFrame`, `TOWN_ROOT` from
there). *EQUIVALENCE:* identical (`BASE_RUNGS.includes`). *ORACLE:* `test/hydro/strategy.test.ts` "refuses a rung
outside the base ladder … (E_OUT_OF_RANGE rung)"; the terrain strategy's `rung` refusal has no test of its own
(hardening: a one-line pin, not this pass — Q7). *RISK:* none. No ruling.

**E-6 — `cellCentre` as the one reader of a cell's centre.** `grid.ts:66–73` `centreX(g, i)`, `centreY(g, j)` (public)
are the one statement of `origin + (i + ½) · cell`; the literal recurs at `hydro/trace.ts:130–131` (`edgePoint`),
`trace.ts:293` (`centreOf`), `hydro/strategy.ts:130–131` (`lineApproach`), `hydro/carve.ts:102, 106`,
`water/outfalls.ts:99, 103, 122` — each paired with the row-from-index idiom `i = c % cols; j = Math.round((c − i) ·
inv)` (`field.ts:59–62`'s comment states why: C-0044's division rule, exact for an integer multiple of `cols` times its
reciprocal). *Consolidation:* `grid.ts` exports from the file `cellCentre(g: CellGrid, c: number, invCols: number): { x:
number; y: number }` — `i = c % g.cols`, `j = Math.round((c − i) · invCols)`, then `centreX`/`centreY` — the caller
passing the reciprocal it already holds (R2's `invOfCols`, H-3). R2 replaces `centreOf` and `lineApproach`'s inline
pair; R3 `outfalls.ts:122`'s `centre` (its loop keeps `i`, `j` incrementally — `centreX(g, i)`/`centreY(g, j)` there,
no index arithmetic). The per-cell inner loops of `flood.ts`, `flats.ts`, `d8.ts`, `surface.ts` keep their inline
`ci`/`cj` (hot loops; the idiom is named once by H-4's `rowOf`).
*EQUIVALENCE:* identical arithmetic (`origin + (i + 0.5) * cell` at every site, checked line by line above — never
`origin + i * cell + cell / 2`). *NUANCE:* `carve.ts:102, 106` iterate `j`, `i` over a box and compute the centres from
the indices, not from a cell number — `centreX`/`centreY` there, not `cellCentre`. *ORACLE:* `test/hydro/river.test.ts`
"knots follow the descent line's bends …" (the test's own `centre(c)`), "with no bearing … `at: { x: −1250, y: 40_000
}`" (the inlet's edge point from its cell's centre), "the inlet rung moves the inlet …"; `test/water/outfalls.test.ts`
"a narrow river: … at the bank point …" (exact `at` values from the cells' centres), "a corner cell stepping off
diagonally …" (`[8750]`, `[−8750]`); mutants M0-e-03 M25 (the frame order), the outfall `at` kills. *RISK:* none. No
ruling.

### 1.2 `src/hydro/` (R2, M0-e-02)

**H-1 — adoption of R1's homes.** `strategy.ts:28–29` → `PI`, `RAD_PER_CDEG` from `'../terrain/primitives.js'` (E-3);
`:95–97` `generated` → `generatedLifecycle` (E-4); `:99–101` `isBaseRung` → terrain's (E-5); `:401` the inline reach →
`arenaReach(frame.value)` (E-1); `carve.ts:34–36` `rasterGeom` → the delegation to `rasterGrid` (E-2); `trace.ts:290–294`
`centreOf` and `strategy.ts:125–136` `lineApproach`'s centre → `cellCentre` (E-6). *ORACLE:* as E-1 … E-6; the hydro
exit bar (`relief-bar.test.ts`, CITY/TOWN/METROPOLIS × 60 m/3 000 m × default/coarse) is the one that would see a
moved inlet, reach or centre.

**H-2 — `slopeKey` ×2 and `steepest` ≡ `flowCode`'s first loop.** `d8.ts:15–18` and `trace.ts:152–155` are the same
four lines; `d8.ts:253–270` `steepest(f, cols, rows, c, i, j)` is `flowCode`'s lines 32–44 verbatim (bounds check,
`drop <= 0 → continue`, `key > bestKey` strict, first best in code order). *Consolidation:* `d8.ts` exports `slopeKey`
from the file (`trace.ts` imports it by path — a new `'./d8.js'` import beside its `carve`, `course`, `field`, `params`,
`surface` ones; `d8.ts` imports nothing from `trace.ts`, so no cycle) and `flowCode` calls `steepest` for its first
phase: `const best = steepest(f, cols, rows, c, i, j); if (best >= 0) return
best;` then the border and the flat phases as today. *EQUIVALENCE:* the loop is textually the same; the return value
of the first phase is the same code or −1; the second and third phases are untouched. *NUANCE:* `drop² × 2` for an
orthogonal code (`(k & 1) === 0`) against `drop²` for a diagonal — the integer comparison that stands in for `drop ÷
distance` with √2, exact on integers; ties keep the first in code order (strict `>`). The `descentLine` `step` closure
(`trace.ts:197–223`) is a different loop (admitted cells, visited cells, `lowest` tracking, the parent fallback) and
shares `slopeKey` only. *ORACLE:* `test/hydro/pipeline.test.ts` "D8's tie order is E, NE, N, NW, W, SW, S, SE …",
"the steeper slope wins over the code order", "a border cell with nothing lower …", "every flat drains to its spill
point …" (3 000 random grids), "recomputeCorridors …" (neighbours re-point by `steepest`), `surface.test.ts` "the
descent is steepest … never merely the first lower one in the tie order"; `relief-bar.test.ts` D8 100 % at every rung;
mutants M0-e-02 K04 (tie order), K05 (away term), K13/K23 (corridor neighbours), L3g/L3c stay red. *RISK:* none. No
ruling.

**H-3 — `invOf(cols)` ≡ `invCols(g)`.** `trace.ts:145–149` and `field.ts:63–67` both return `ratio(1, cols, 'count')`'s
value, the first throwing `'trace: a grid of no columns'`, the second `` `hydro grid: ${cols} columns` ``.
*Consolidation:* `field.ts` exports from the file `invOfCols(cols: number): number` (field's message); `invCols(g)`
becomes `return invOfCols(g.cols)` (public name and signature kept); `trace.ts` imports `invOfCols` and drops `invOf`.
*EQUIVALENCE:* the same `ratio` call, the same value; the refusal is unreachable (`cols ≥ 1` for every grid the package
builds — `heightGrid` takes `Math.max(1, …)`, `coveringGrid`'s `ceilDiv` of a positive extent is ≥ 1, `hydroGridOver`
reads `coveringGrid`, the tests' `gridOf` is never called with 0) and neither text is pinned (grep). *NUANCE:* the
`'trace: a grid of no columns'` text goes — an unreachable throw's text (Q1). *ORACLE:* every hydro test that reads
`edgePoint`, `inletMasks`, `lineFault` (`river.test.ts` inlet and re-trace tests, `surface.test.ts` whole). *RISK:*
none. **Ruling:** Q1 (the texts of unreachable throws).

**H-4 — `rowOf` names the row-from-index idiom once.** `Math.round((c − i) · inv)` at `flood.ts:91, 141`,
`flats.ts:117, 169`, `d8.ts:113, 209, 214, 217, 232`, `surface.ts:104`, `trace.ts:129, 234, 274, 292, 422, 507`,
`strategy.ts:129, 155, 281, 346, 370, 374` (22 sites) is C-0044's form, explained once at `field.ts:59–62`.
*Consolidation:* `field.ts` exports from the file `rowOf(c: number, i: number, invCols: number): number` (the
one-liner, with the explanation moved onto it); the sites outside the per-cell inner loops adopt it (`trace.ts`,
`strategy.ts`, `d8.ts:209–217` `recomputeCorridors`); the inner loops of `flood.ts`, `flats.ts`, `d8.ts:113`,
`surface.ts:104` keep the inline form with a one-word comment `// rowOf` (a call per cell in the flood is a cost the
timing row would see). *EQUIVALENCE:* identical arithmetic. *RISK:* none. No ruling.

**H-5 — `cellIndexAt(g, x, y)`.** `cellAt` (`course.ts:182–190`, public) followed by `j * g.cols + i` at
`trace.ts:473` (`kc.j * g.cols + kc.i`), `:509` (`at.j * g.cols + at.i`), `strategy.ts:641–643` (`widthProfile`), and
R3's `outfalls.ts:163–166` `cellOf`. *Consolidation:* `course.ts` exports from the file `cellIndexAt(g: GridGeom, x,
y): number`; the four sites call it (`outfalls.ts`'s `cellOf` goes). *EQUIVALENCE:* identical (the clamp inside
`cellAt`, then the same index). *NUANCE:* `cellAt` divides through `q()` (`ratio`) while `terrain/sampler.ts:74–75`
`flowAt` multiplies by a precomputed reciprocal — two cell-index arithmetics that can differ by an ulp on a cell
boundary; **not unified** (§4). *ORACLE:* `test/water/outfalls.test.ts` "… `cell` is the hydro cell containing `at`"
(`cellAt` recomputed by the test), `stage.test.ts` "S1 (9): the terrain's outfalls written …"; `river.test.ts` "a
river's width profile follows its corridor's accumulation …", "re-trace from the last good knot …". *RISK:* none.

**H-6 — `pointSegDist2` ≡ `segDist2`; `footOn` is its parameter.** `course.ts:87–101` `pointSegDist2(p, a, b)` and
`water/geometry.ts:72–84` `segDist2(q, a, b)` (both public) compute the clamped parameter `t` and the squared distance;
`geometry.ts:87–97` `footOn(q, a, b)` computes the same `t` and returns the foot. *Consolidation (R2 adds, R3
adopts):* `course.ts` exports from the file `segParam(p, a, b): number` — `len2 = dx² + dy²`; `t = 0` unless `len2 >=
1`; else `ratio(dot, len2, 'area')`'s value or 0 when refused; clamped to [0, 1] — and `pointSegDist2` uses it; R3:
`geometry.ts` makes `segDist2` the delegation `export function segDist2(q: XY, a: XY, b: XY): number { return
pointSegDist2(q, a, b); }` and `footOn` `const t = segParam(q, a, b); return { x: a.x + dx * t, y: a.y + dy * t }`.
*EQUIVALENCE (the one place the two bodies differ textually):* `pointSegDist2` guards `len2 >= 1`, `segDist2` `len2 >
0`. For `0 < len2 < 1` (only doubles reach it: `offset.ts`'s unsnapped lines) `segDist2` calls `ratio(…, len2, 'area')`,
whose floor is 1 cm² (`kernel/src/num/ratio.ts:8`: "length 1 cm, area 1 cm², angle 1 centidegree, count 1"), which
refuses and gives `t = 0`; `pointSegDist2` gives `t = 0` by its guard — the same `t` for every input. The clamps are the
same (`t < 0 → 0`, `t > 1 → 1` against `Math.min(1, Math.max(0, …))`, applied only to an admitted ratio in both). The
distance arithmetic `x = a.x + dx·t − p.x` is the same. `footOn`'s `t` is the same expression as `segDist2`'s.
*NUANCE:* `len2 === 0` → `t = 0` → the distance to `a` (a degenerate segment is a point); no NaN inputs exist (lattice
and finite doubles); the argument order `(point, a, b)` is the same in all three. *ORACLE:* hydro: `river.test.ts`
"firstSelfTouch (bucketed) returns what the definition's scan returns …" (300 random walks against the brute scan
written with `segSegDist2`), "knots follow the descent line's bends …" (`pointSegDist2` bound), the crater/ridge carve
tests (the channel's `pointSegDist2 > r²`); water: `slow-rings.test.ts` whole (`cleanRing`'s Douglas–Peucker, the
`near-touch` U at 40 cm, the fixed-band 29 cm cases, `clearRing` 60 cm — every one through `segDist2`),
`crossings.test.ts` "a deck end keeps DECK_CLEARANCE_CM …" (`ringsDist2`), `outfalls.test.ts` "a narrow river …" (the
bank point through `footOn`, exact `at`), `faces.test.ts`, `stage.test.ts` (`partsWithSeeds`' `ringsDist2 < depth2`),
the exit bar; mutants M0-e-03-s1 K04–K08, K17, close-r1 F01–F08 (the zigzag course's decks), round-1 M-series on
crossings and outfalls stay red by title. *RISK:* low (two hot O(n²) loops in `offset.ts` go through one more call
frame; the exit bar's 900 s budget is generous: 116–125 s measured). No ruling.

**H-7 — `segSegDist2` ≡ `segSeg2`; `meets` is their closed form.** `course.ts:103–120` (`cross`, `segmentsCross`,
then the minimum of four point–segment distances) and `geometry.ts:113–120` (the four orientations inline, the same
minimum) are the same function: `o1 = cross(b − a, c − a)`, `o2 = cross(b − a, d − a)`, `o3 = cross(d − c, a − c)`,
`o4 = cross(d − c, b − c)`, proper crossing when `o1·o2 < 0` and `o3·o4 < 0` (written as the sign pairs), else
`min(pointSegDist2(a, c, d), (b, c, d), (c, a, b), (d, a, b))`. *Consolidation (R3):* `export function segSeg2(a, b, c,
d): number { return segSegDist2(a, b, c, d); }` (name and signature kept). `offset.ts:254–262` `meets` is proper
crossing **or** a collinear end on the other segment (closed segments) and reuses `o1 … o4` for the collinear tests;
calling `segmentsCross` would recompute them inside `isSimple`'s and `meetsAny`'s O(n²) loops — **kept**, with the
comment that it is the closed form of `course.ts`'s `segmentsCross` (§4). *EQUIVALENCE:* identical formulas; the
minimum over four distances in the same order (`Math.min` is order-independent anyway). *ORACLE:* `river.test.ts`
"firstSelfTouch …", "a self-touching course is re-traced …" (clearance 1 000 cm), `crossings.test.ts` "the spacing
holds against existing decks …" (`spaced` through `segSeg2` ≥ 40 m), `exit-bar.test.ts` "sites ≥ 40 m apart",
`stage.test.ts` "sites … ≥ 40 m apart" (its own `dist` oracle, independent). *RISK:* none. No ruling.

**H-8 — `Counts` is a dead layer.** `d8.ts:143–160`: a class around a `Uint32Array` with `add`, `get`, `take`, read
only by `accumulate` (`:109–136`). *Consolidation:* a `Uint32Array` `into`: `into[t] += 1`, `into[c] === 0`, and
`into[t] -= 1; if (into[t] === 0) …`. *EQUIVALENCE:* the same counts, the same Kahn order (the queue's order is by
index for the sources, then by the order targets reach zero — unchanged), the same `cycle` refusal text and count.
*NUANCE:* the one-door scan (`range.test.ts`, `one-door.test.ts`) looks at `Int32Array` receivers only — a `Uint32Array`
write is admitted, as `flood.ts:77–78` already does. *ORACLE:* `pipeline.test.ts` "each cell counts itself and every
cell draining through it …" (3 000 grids), "refuses a field whose directions hold a cycle"; `relief-bar.test.ts`
"… the accumulation of the off-grid outlets sums to n"; `river.test.ts` "the corridor drains … accumulation along the
course grows". *RISK:* none. No ruling.

**H-9 — `quotient` and `q`.** `strategy.ts:35–39` `quotient(num, den)` throws `` `river: a divisor of ${den}` `` and
`course.ts:21–25` `q(num, den)` throws `` `course: a length of ${den} cm` ``, both on a refused `ratio(…, 'length')`;
`water/geometry.ts:38–41` `quot` reads a refusal as 0 (a third behaviour, by design: "the callers divide by lengths of
at least a centimetre"). *Consolidation:* `course.ts` exports `q` from the file under a name that says what it is
(`lengthQuotient`), and `strategy.ts` imports it in place of `quotient`; `quot` stays (a different contract).
*EQUIVALENCE:* the same `ratio` call and value; `quotient`'s divisor is `ax · 2²⁰` or `ay · 2²⁰` with `|dx| ≥ 1 ÷ √5`
on the side the ray hits (its own comment, `strategy.ts:200–202`), so its refusal is unreachable and its text unpinned;
`q`'s refusal is reachable (a 1 cm cell makes `rasterise`'s `half` 0.5 cm) and its text unpinned (grep). *NUANCE:*
the `'river: a divisor of …'` text goes (Q1); the three refusal behaviours (throw / throw / 0) stay three. *ORACLE:*
`river.test.ts` inlet tests, `course`'s readers. *RISK:* none. **Ruling:** Q1.

**H-10 — the private name `better` in two folders.** `strategy.ts:303–306` `better(a, b)` (the degraded river's pick)
and `water/outfalls.ts:61–63` `better(a, cell, acc)` (the stretch's pick) are two functions under one name.
*Consolidation:* private renames for clarity — `betterRiver` (R2), `betterPick` (R3). No behaviour. No ruling.

**H-11 — the two bucket floods — KEEP APART.** `flood.ts:49–109` (last-in-first-out buckets, seeded at the whole
border, no walls, no cap, no parents; `taken` counted for `hydro.cells`) and `surface.ts:55–118` (first-in-first-out
buckets, seeded at the open border and a joined river, walls never entered, the cap `SURFACE_CAP_SHARE × carveMaxCm`,
`parent` kept for the flats' fewest-step drain). One engine with switches would obscure both; `surface.ts:4–19` already
states the three differences. The filled surface of `flood.ts` is order-independent (Priority-Flood's correctness), but
`surface.ts`'s `parent` tree is not (`surface.test.ts` "on a flat the parents lead to the outlet by the fewest steps
(first-in, first-out buckets)") — a shared engine would have to carry the order as a parameter. Kept; §4.

**H-12 — `edgeCells`/`EDGE_CODE`/`edgeSurface` and `inletMasks` — KEEP.** `strategy.ts:107–118, 140–146` and
`trace.ts:271–287` are two spellings of "the border cells of one side" — `inletMasks` walls every side the inlet lies
on (a corner would wall two), `edgeSurface` reads the masks of a side through its middle cell. They agree on every inlet
the strategy makes (`inletOf` keeps the point a cell inside the edge's ends: `lim = min(half − cellCm, fh)`), and
`inletMasks` is public with its corner semantics. Kept; a comment at `edgeSurface` says it reads one side's masks
through a cell that is never a corner.

**H-13 — comments that mislead or narrate.** `strategy.ts:120–123` says `lineApproach` returns "and the line's length in
cells" — it returns the squared distance only (the length is read from `line.cells.length` by the caller): fix the
sentence. `strategy.ts:573–575` recounts `undefinedCells` after the corridors where `hyd.d8.undefinedCells` is the
pre-corridor count: say so ("recounted after the corridors' D8; equal to d8's on every resolved field"). `surface.ts:1`
"(M0-e-02 fix round 1; …)" → "(M0-e-02; …)". `index.ts:6–7` the scaffold sentence. → C-hydro-1 … 3.

**H-14 — the design as it stands, comment only.** The attempt loop (`strategy.ts:452–472`), the degraded pick
(`better`, `truncated`, `centreDist2`), `corridorOf`/`connect`/`nearestSide`, `widthProfile`'s estuary widening,
`traceRiver`'s re-trace with `lineFault` — C-0173 (3)–(9) and C-0175 (1)–(8) as built; no change.

### 1.3 `src/water/` (R3, M0-e-03)

**W-1 — adoption of R1's and R2's homes.** `geometry.ts:16–19` `reachOf` → the delegation to `arenaReach` (E-1);
`faces.ts:71–73` `generated` → `generatedLifecycle` (E-4); `offset.ts:164` → `PI` (E-3); `geometry.ts:72–84` `segDist2`
→ `pointSegDist2` (H-6), `:87–97` `footOn` on `segParam` (H-6), `:113–120` `segSeg2` → `segSegDist2` (H-7);
`outfalls.ts:163–166` `cellOf` → `cellIndexAt` (H-5), `:99, 103, 122` → `centreX`/`centreY` (E-6). *ORACLE:* the water
exit bar (100 seeds at 100 ha plus CITY frames 4, 10, 3 — the registered family), the per-seed arena print of
`stage.test.ts` "deterministic …", and every test named at E-1 … H-7.

**W-2 — `lp` ×2 and `pointCm`.** `crossings.ts:32–34` and `polygons.ts:117–119` `lp(q): LatticePoint` (`Math.round`
each coordinate, `as Cm`), `outfalls.ts:65–67` `pointCm(q): PointCm` (the same, cast to the model's point type);
`offset.ts:236` `snapRing` and `polygons.ts:67` (`at`) inline the same rounding. *Consolidation:* `geometry.ts` exports
from the file `lp(q: XY): LatticePoint`; `crossings.ts` and `polygons.ts` import it; `outfalls.ts` keeps `pointCm(q) =
lp(q) as PointCm` as one line (the two point types are nominally distinct in the model's declarations); `snapRing`
and `splitEstuary` may call it or stay (the same expression either way). *EQUIVALENCE:* `Math.round` on both
coordinates, no negative-zero flush at any site today — **none is added** (`−0` would survive `JSON.stringify` as `0`
but `toEqual` on a record field would see it; the sites keep their bytes). *ORACLE:* `crossings.test.ts` (deck ends
`toBe(1000)`), `faces.test.ts` "the basic estuary …" (`pt(10_000, 0)`), `outfalls.test.ts` exact `at`,
`stage.test.ts` "deterministic". *RISK:* none. No ruling.

**W-3 — `unit(a, b)` ≡ `unitOf(sub(b, a))`.** `polygons.ts:108–114` and `offset.ts:17–25`: `dx = b.x − a.x`, `dy`,
`len = Math.sqrt`, `len < 1 → null`, else `{ quot(dx, len), quot(dy, len) }`. *Consolidation:* `offset.ts` exports
`unitOf` from the file; `polygons.ts`'s `unit` becomes `const unit = (a: XY, b: XY): XY | null => unitOf({ x: b.x − a.x,
y: b.y − a.y })` (or goes, its three readers writing the difference). *EQUIVALENCE:* identical operations in the same
order. *ORACLE:* `faces.test.ts` "a tributary meeting its river …" (`chainOf`'s join), "the basic estuary …"
(`leftNormal` of the cut), `stage.test.ts`, the exit bar (every prolonged chain end). *RISK:* none. No ruling.

**W-4 — `KERNEL_RING`: one text, two files.** `stage.ts:61` `const KERNEL_RING = "; the kernel's ring: "` is parsed out
of the `why` that `polygons.ts:425` builds as `` `${fast}; the kernel's ring: ${proved}` ``. *Consolidation:* `polygons.ts`
exports the constant from the file and builds the text with it; `stage.ts` imports it by path (`'./polygons.js'`,
which it already imports `waterPolygons` from). *EQUIVALENCE:* the same bytes (the implementer copies the string from
`stage.ts:61`, which the tests pin); `stage.ts:72–73` and `:117–118`'s `indexOf`/`slice` reads are unchanged.
*NUANCE:* the stage's refusal detail `` `S1 water: the river's ring was refused on the kernel's polygons (the fast ring: ${fastWhy ?? 'inserted, refused at commit'}); no further rung — ${attempt.detail}` `` (`stage.ts:142`) is a **pinned text** (`slow-rings.test.ts:243` regex) — byte-identical. *ORACLE:* `slow-rings.test.ts`
"waterPolygons: the loop river is dropped `refused` … `/; the kernel's ring: not clear \(/`", "S1: the river so refused
is the stage's refusal …" (the full regex), "seed %i: S1 commits the river … `fallbacks` `[{ id, why: 'near the edge'
}]`"; mutants M0-e-03-s1 K12, K16 (the cause appended) stay red; K13 (the fast ring's cause lost) survived before and
after — note 13 (hardening). *RISK:* none. No ruling.

**W-5 — the ring proofs, one loop.** `polygons.ts:526–531` (`fastRings`: per ring `isSimple` → `'not simple'`,
`clearRing` → `'near-touch'`, `ringsApart` with every later ring → `'rings meet'`, `clearOf(…, covered)` → `'meets an
earlier body'`) and `:454–459` (`provedRings`: the same order, each cause wrapped `not clear (…)`).
*Consolidation:* one private `proveRings(rings: readonly Ring[], covered: readonly Ring[]): string | null` in
`polygons.ts` returning the bare cause of the first failing ring or `null`; `fastRings` returns it as its cause;
`provedRings` returns `` `not clear (${cause})` ``. *EQUIVALENCE:* the same four tests in the same order per ring, the
rings in index order, `ringsApart` over `j > i`, the first failure wins — identical outcomes and identical texts
(`'not simple'`, `'near-touch'`, `'rings meet'`, `'meets an earlier body'`; `'not clear (…)'` around each in
`provedRings`). *NUANCE:* in `fastRings` the proofs run **after** `'near the edge'` (`:517`), `'hole at the edge'`,
`'hole outside'` and the sliver drop (`:519–525`) — that order stays; `provedRings` runs `cleanRing` with the fixed
rule on every ring first (`:450–453`), dropping a ring the clean empties, then the proofs — that order stays.
*ORACLE:* `slow-rings.test.ts` "a ring the clean cannot make clear is refused with its cause: … (rings meet) … (meets
an earlier body) … (near-touch) … (not simple)" (four exact strings and the shared-side pass), "a hand-built shore with
17 cm hairpins …", "the proved ring commits …", "seed %i: raw, the batch is refused …; proved, it commits …", "a ring
the slow path keeps is the clean of the kernel's", `exit-bar.test.ts` "three full CITY frames, among them a ring the
fast path refuses" (seed 3's `'near the edge'` path); mutants M0-e-03-s1 K05–K08 (each proof dropped), C-0307's
self-check M4–M7, K10 (an unclear body kept) stay red. *RISK:* low. No ruling.

**W-6 — the `fixed` vertex predicate, one factory.** `polygons.ts:447–448` `fixed = onRing(reach, q) || (covered.length
> 0 && ringsDist2(covered, q) <= 4)` and `:512–513` the same with the estuary cut's two bank points added (`Math.abs(c.x −
q.x) <= 2 && Math.abs(c.y − q.y) <= 2`). *Consolidation:* one `fixedVertices(reach, covered, cuts: readonly XY[] = [])`
in `polygons.ts` returning the predicate, with the band named once — `FIXED_BAND_CM = 2` and `ringsDist2(covered, q) <=
FIXED_BAND_CM * FIXED_BAND_CM`, the cuts' box `<= FIXED_BAND_CM`. *EQUIVALENCE:* `2 · 2 === 4` exactly; the cut box's
tolerance is the literal 2 today; `covered.length > 0 &&` kept (it short-circuits `ringsDist2`'s `Infinity`, which
would also compare false — same answer either way; keep the form). *NUANCE:* the 2 cm band is the lattice rounding of
a mouth's or a cut's ends (`offset.ts:339–340`'s `ON_CM = 2` is the same quantity in another file — the comment names
the kinship; the two constants stay two: `ON_CM` pads a box test in `onRings`, `FIXED_BAND_CM` a squared distance; a
later round may tie them with an equivalence argument). *ORACLE:* `slow-rings.test.ts` "the fixed vertices stay: … 29
cm after the vertex before it is kept …" (on the edge, on an earlier ring, and the unfixed twin dropped), "a ring the
slow path keeps is the clean of the kernel's …" (`cleanRing(raw, fixed)` deep-equal), `faces.test.ts` "the basic
estuary …" (`between` edges shore of both: the cut's two points shared exactly); mutants s1 K02/K03/K17 stay red; K04
(`<= 4 → <= 0`) survived and still will — note 12 (hardening; the bar seed 78 case). *RISK:* none. No ruling.

**W-7 — `ESTUARY_SPLIT_M` is `ESTUARY_LENGTH_M`.** `water/params.ts:27` and `hydro/params.ts:43` are both 400: the
reach typed `estuary` is "the stretch M0-e-02 widened" (C-0229 (4), C-0173 (7)) — one quantity by design.
*Consolidation:* `export const ESTUARY_SPLIT_M = ESTUARY_LENGTH_M;` with `import { ESTUARY_LENGTH_M } from
'../hydro/params.js'` (both names stay public with their indexes; the comment says the two are one length).
*EQUIVALENCE:* the same number; `typeof` unchanged; both read at module load. *NUANCE:* this binds the split to the
widening: a table cell that one day replaces the constant feeds both — the design's intent, stated in the comment.
*ORACLE:* `faces.test.ts` "the basic estuary …" (the cut at `pt(10_000, 0)` on a 1 000 m river; the 600 m river kept
whole; the 800 m one split), `river.test.ts` "the basic estuary widens the last 400 m …", `stage.test.ts` (kinds
`['river', 'estuary', 'tributary']`), the exit bar's every third seed. *RISK:* none. No ruling.

**W-8 — `why` and `refusal()`: a module variable for a return value.** `offset.ts:125–130`; set at `:111, 120, 179,
182, 381, 384, 412`; read once, at `polygons.ts:505` `` `${chain.joined ? 'mouth' : 'offset'}: ${refusal()}` ``.
*Consolidation:* `offsetRing` and `mouthRing` return `{ ring, holes } | { refused: string }` (a `refused` key in place
of `null`), `eraseLoops` returns `{ line, holes } | { refused: string }`, `offsets` keeps `null` ("a repeated point"
stays the caller's text), and `refusal()` with `why` go; `fastRings` reads the key. `offset.ts` is not in the water
index; its file-level readers are `polygons.ts` and the tests' `cleanRing`, `clearRing`, `isSimple` (unchanged) — the
implementer greps `plat/` for `offsetRing(`, `mouthRing(`, `refusal(`.
*EQUIVALENCE:* every path that returned `null` after setting `why` now returns `{ refused: why }` with the same
string: `'a repeated point'` (`:182, 384`), `'a pocket inside a pocket'` (`:111`), `'too many loops'` (`:120`), `'no
mouth'` (`:412`); every path that returned a ring returns the same ring. The `fallbacks` text `` `offset: ${…}` `` /
`` `mouth: ${…}` `` is byte-identical. *NUANCE:* `eraseLoops` is recursive (`depth + 1`): the inner refusal propagates
unchanged (today `inner === null` → `return null` with `why` already set — the same string reaches the caller).
*ORACLE:* `faces.test.ts`, `stage.test.ts`, the exit bar's `slow` count and `fallbacks` (the exit bar's three CITY
frames include a fast-ring refusal: seed 3 `'near the edge'`, which is `fastRings`' own cause, not `offsetRing`'s — the
`offset:`/`mouth:` causes are exercised by the 100-seed bar's `slow` tally: 13 fallback entries on 10 seeds, C-0229
(2)); `slow-rings.test.ts` (the loop river's `fallbacks[0].why` regex). *RISK:* low. **Ruling:** Q2 (a return-shape
change of a file-level export — in the pass as a structural clean-up with zero shift, or deferred?).

**W-9 — the box early-outs, five spellings.** `offset.ts:287` (`isSimple`), `:317` (`meetsAny`), `:332` (`onRings`,
padded by `ON_CM`), `:553` (`clearRing`, padded by `RING_CLEAR_CM`), `:572` (`ringsApart`, padded). *Consolidation
(optional, perf-gated):* two helpers `boxesApart(ba, i, bb, j)` and `boxMissesPoint(b, s, q, pad)`. *EQUIVALENCE:*
the same strict comparisons; a helper call inside O(n²) loops — the implementer keeps the literal if the exit bar's
time moves by more than the noise (perf is not behaviour; the bar's budget is 900 s against ≈ 120 s). Default: do it
only if the measured cost is nil; else name the idiom in one comment.

**W-10 — `crossings.ts:54`'s private `clearOf` shadows `offset.ts`'s exported `clearOf`** (another meaning: a deck
end's clearance from the ring and the other bodies vs a ring's clearance from the earlier rings). *Consolidation:*
rename the closure `endClear`. Private; no behaviour.

**W-11 — `stage.ts:216–219` `reportRow`'s cast.** `(ctx as { report?: unknown } | undefined)?.report` guards a
nullish `ctx` that cannot occur (`runS1` reads `ctx.tables` at `:99` first). `ctx.report` is `E['report']`
(`StageContext`, `model/src/stage/decl.ts:141`), `unknown` for `SiteEnv`. *Consolidation:* `const sink = ctx.report as
{ invariant?: (name: string, pass: boolean) => void } | null | undefined;` — the same three checks follow. *EQUIVALENCE:*
`undefined`, `null`, a sink without `invariant`, a sink with one — the same four outcomes (`references-row.test.ts`
"a context with no sink …" covers `undefined` and `null`). *RISK:* none.

**W-12 — the kernel-message contract — KEEP, note.** `stage.ts:125` `/\(shore, ([^)]+)\)/` reads the kernel's
refusal detail to name the refused body, and `:142` quotes the kernel's detail after `no further rung —`. These are
cross-package message texts the kernel plan freezes (J263 Q6); a structured field (`refusedChain`) is a hardening
item (Q6). Kept; the comment at `:125` names the contract.

**W-13 — `foldWarnings` — KEEP, note.** `polygons.ts:536–544` folds the booleans' warnings by code into fresh `{ code,
count }` objects; the kernel's barrel `foldWarnings(own, from)` (`kernel/src/insert/classes.ts:194–206`) merges into
`own` and **keeps `at`** when a warning carries one. Equivalent only when no warning of `buffer`/`booleans` carries
`at` — not shown; the site's drops `at` by design (a report of counts). Kept, with the difference in its comment (Q4).

**W-14 — comments that narrate.** `stage.ts:8–10` ("… a pass with count 0 can never mean the row never ran, Q31"), `:15`
("the one rung spent (N-56 (1))"), `:35` ("(Q31, C-0310)"), `:60`, `:68`, `:141`, `:170` ("(Q31)"); `polygons.ts:15, 421,
437` ("N-56 (1)"); `index.ts:4–5` the scaffold sentence. → C-water-1 … 3.

### 1.4 Cross-cutting

**X-1 — the three test `support.ts` files.** `TABLES = tableView()`, `townKey(seed)`, `siteContext(seed, rung,
epoch)` (terrain's and hydro's record the stream requests, water's does not), `frameOf(size, rung)` (hydro, water) are
the same lines in three items' owns. No item owns a shared `test/support/` folder; the plan keeps the three copies
(Q3), as J268 Q3 kept the four mulberry32 copies.

**X-2 — unread exports (frozen, listed for the session).** A census over `plat/packages/*/src`, `packages/*/test`,
`bench/src` and `bench/test` (every `.ts`/`.mts`/`.mjs`/`.js` outside `node_modules`, `dist`, `vendor`; a name counts
as read when it appears in any file but its own and the indexes) finds these folder-index exports read by nothing:
terrain `TerrainSpec`; hydro `CarveResult`, `HydrologyRun`, `TraceEvent`, `TributaryRequest`; water `BANKED_KINDS`,
`CrossingOptions`, `L0BatchOptions`, `OutfallOptions`, `RayHit`, `S1Report`, `S1StageOptions`, `WaterFacesOptions`,
`S1_COUNTERS`, `estuaryId`, `l0WorkLimit`, `siteBridge`. Every type among them is the declared type of an exported
function's parameter or result (reachable through it); the four runtime names are the stage's own readers' doors
(`S1_COUNTERS`, `l0WorkLimit`, `siteBridge`, `estuaryId`) and one design constant (`BANKED_KINDS`, C-0229 (6)).
`HYDROLOGY_ROW` and `HydrologyRowRecord` are read by `bench/src/site/timing.ts` (the timing harness). **Nothing is
removed** (the API is frozen); the list is for the API-surface decision before M1 (J263 Q7, J268 Q7).

---

## 2. Comment rewrite plan (per file)

Rule: a comment describes the design as it stands and cites the C-row and design section that fix it; it never says
"fix round", "session round s1", "Q31", "N-56 (1)", "check B-1", "integration-g12", "checks/M0-e-02.md line 3",
"route (i)", "the scaffold created this". Queue rows, note ids, mutant ids, check lines and round numbers belong in
`checks/*.md` and `docs/M0-FIX-QUEUE.md`. Where a comment is the only place a rule is stated, the rewrite keeps the
rule and drops the narrative. Design tokens that the design text itself uses (`item 65`, `item 111 (b)`,
`COV-FTG-B09`, `COV-FTG-H11`, `GEO-15`, `GEO-36`, `J-K12`, `J-P44`, `O1 (b)`, `R12-5`) are citations of
`docs/ARCHITECTURE.md`, not of review records — they stand. Every pinned **string** stays; none of the comments below is
a message. Every `describe`/`it` title stays verbatim (the checks cite them: "(N-56 (1))", "Q31: …", "(C-0175 (4))").

**C-terrain-1 — `terrain/index.ts:1–4`.** "Created empty by the scaffold (M0-s-01, C-0013); this index and its folder
are M0-e-01's." → "This index and its folder are M0-e-01's." (the J268 Q1 form; the kernel plan's module-index rule).
Add one line naming the file-level helpers the folder exports to its siblings and that they are not public:
`grid.ts` `rasterGrid`, `cellCentre`; `primitives.ts` `PI`, `RAD_PER_CDEG`; `heightfield.ts` `generatedLifecycle`;
`strategy.ts` `isBaseRung`. Every other terrain comment states the design with its C-rows (`range.ts:1–6` the one
door; `heightfield.ts:1–10` the mechanism and the draws; `resources.ts:1–18` the rules; `sampler.ts:1–6`;
`strategy.ts:13–17` `TOWN_ROOT`) — stand. Tests: `strategy.test.ts:32–33` "(C-0167 (1))" stands (a C-row); no
narration in the folder.

**C-hydro-1 — `hydro/surface.ts:1`.** "(M0-e-02 fix round 1; §4.2 S1 (3): …; C-0173 (3), refined by C-0175 (1) – (3))"
→ "(M0-e-02; §4.2 S1 (3): …; C-0173 (3) as refined by C-0175 (1) – (3))". The rest of the header (the three
differences from the hydrology's flood, the descent's bound) stands.

**C-hydro-2 — `hydro/strategy.ts`.** `:120–123` → "The squared distance from the frame's centre to the nearest cell
centre of a line on the hydrology grid." `:568–575` → "The terrain record takes the hydrology (on the coarser grid when
F-WORK or the switch took it); `undefinedCells` is recounted after the corridors' D8 — equal to `d8`'s count on every
resolved field, 0 by §13.1." `:142` (`edgeSurface`) add "— through a middle cell, never a corner, so `inletMasks` walls
one side". `:303–306` the rename of H-10. `:1–10` stands.

**C-hydro-3 — `hydro/index.ts:6–7`, `hydro/field.ts:59–62`, `hydro/d8.ts:143`.** The index: drop the scaffold
sentence (as C-terrain-1), add the file-level helper line (`field.ts` `invOfCols`, `rowOf`; `d8.ts` `slopeKey`;
`course.ts` `segParam`, `cellIndexAt`, `lengthQuotient`). `field.ts:59–62`'s explanation of the row idiom moves onto
`rowOf`. `d8.ts:143` "In-degree counters (a Uint32 array with the three operations accumulate reads)" goes with
`Counts` (H-8). Tests: `test/hydro/surface.test.ts:1` "M0-e-02 fix round 1: the river's descent surface (…; C-0175 (1)
– (3))" → "M0-e-02: the river's descent surface (…; C-0175 (1) – (3))"; `:5–6` "The regression of checks/M0-e-02.md line
3: where the hydrology's D8 runs straight back out of the inlet's own edge, the river's line still crosses the arena."
→ "And the rule C-0175 (1) exists for: where the hydrology's D8 runs straight back out of the inlet's own edge, the
river's line still crosses the arena."; `:171–174` "— the course of checks/M0-e-02.md line 3 then crawled along that
closed edge and folded." → "— a descent on the hydrology's surface would crawl along that closed edge and fold (C-0175
(1))."; `relief-bar.test.ts:137–138` "(checks/M0-e-02.md line 3; route (i), C-0175 (1) – (6))" → "(C-0175 (1) – (6))".
The `it` titles stay.

**C-water-1 — `water/stage.ts`.** `:1–18` (the header): "… its declared row `references-resolve` evaluated once and
reported through the context's sink (§5.4's `ReportSink.invariant`, so the runner's line counts the evaluation and a
pass with count 0 can never mean the row never ran, Q31), …" → "… (§5.4's `ReportSink.invariant`: the runner's line
counts the evaluation, so a pass is a counted pass; C-0310), …"; "… its detail naming the fast ring's cause and the
kernel ring's refusal, the one rung spent (N-56 (1)). The kernel's rings are cleaned and proved before any batch
(`provedRings`); …" → "… the one rung spent (C-0307). …". `:35` "(Q31, C-0310)" → "(C-0310)". `:60` "(N-56 (1))" →
"(C-0307)". `:68` "(C-0229 (2); N-56 (1))" → "(C-0229 (2), C-0307)". `:141` "(N-56 (1))" → "(C-0307)". `:170` "(Q31)" →
"(C-0310)". `:125` add: "— the kernel's refusal detail names the refused chain as `(shore, <id>)`: a message contract
with `@plat/kernel` (its texts are frozen with its API)". `:216–219` the cast of W-11.

**C-water-2 — `water/polygons.ts`, `water/offset.ts`, `water/params.ts`, `water/crossings.ts`.** `polygons.ts:15`
"(`provedRings`, N-56 (1))" → "(`provedRings`, C-0307)"; `:421–423` "(N-56 (1))" → "(C-0307)"; `:436–445` "(N-56 (1),
refining C-0229 (2))" → "(C-0307, refining C-0229 (2))"; add above `proveRings` (W-5) "the four proofs in order, the
first failure's cause — the fast ring's and the kernel ring's one judge"; above `fixedVertices` (W-6) "a vertex on the
arena's edge, on an earlier body's ring (within FIXED_BAND_CM — a mouth's or a cut's lattice rounding) or at the
estuary cut's bank points stays through the clean: the shared stretches need it (C-0307 (2))". `offset.ts:124–130` go
with `why` (W-8); `:253` "The squared distance between two segments when they meet (0), else Infinity — the
simplicity test's predicate." is wrong (it returns a boolean) → "Do two closed segments meet — a proper crossing, or an
end on the other — the simplicity test's predicate (the closed form of `hydro/course.ts`'s `segmentsCross`)."
`params.ts:26–27` → "The basic estuary's length: one quantity with M0-e-02's `ESTUARY_LENGTH_M` (§4.2 S1 (3) *Mouths*;
C-0173 (7), C-0229 (4)) — the stretch the width law widens is the reach typed `estuary`." `crossings.ts:54` the rename
of W-10. `index.ts:4–5` drop the scaffold sentence; add the file-level helper line (`geometry.ts` `lp`; `offset.ts`
`unitOf` and the ring tools; `polygons.ts` `KERNEL_RING`, `provedRings`, `fastRings`, `chainOf`, `simplifyChain`).

**C-water-3 — tests of M0-e-03.** `test/water/support.ts:85–86` "(M0-e-03 check B-1)" → "(C-0233)";
`exit-bar.test.ts:9–10` "(check B-1)" → "(C-0233)"; `one-door.test.ts:5–6` "(integration-g12's B-1: water/outfalls.ts's
per-cell body index was an Int32Array)" → "(`outfalls.ts`'s per-cell body index is a plain array for this reason)";
`references-row.test.ts:1–2` "(…; docs/M0-FIX-QUEUE.md Q31, the N-9/Q15 shape; C-0310)" → "(…; C-0310)";
`slow-rings.test.ts:1` "N-56 (1) (session round s1 on M0-e-03; docs/M0-FIX-QUEUE.md Q20 class A): the kernel's rings …"
→ "C-0307 (refining C-0229 (2)): the kernel's rings …"; `:10–12` keep the fixture's provenance ("captured by the session
ruling's probe before this round" → "captured by the ruling N-56's probe on the seeds named in C-0307 (4)": the
provenance of a data file is traceability, as `fixtures/q20-slow-rings.json`'s own `what` field states it — the JSON is
byte-untouched); `:15–18` stand (they state the composition and C-0264/C-0123). The describe titles "(N-56 (1))", "Q31:
…", "Q20 class A …" stay verbatim (`checks/M0-e-03-s1.md`, `-s2.md` cite them).

Comments to **add**: (a) at each file-level export a round makes (`rasterGrid`, `cellCentre`, `PI`, `RAD_PER_CDEG`,
`generatedLifecycle`, `isBaseRung`, `invOfCols`, `rowOf`, `slopeKey`, `segParam`, `cellIndexAt`, `lengthQuotient`,
`lp`, `unitOf`, `KERNEL_RING`) one sentence: what it is, and "file-level: shared by path inside `@plat/site`, not part of
the package's API (J263 Q1's convention)"; (b) in `terrain/grid.ts`'s header, the sentence "every other grid of this
section shares the corner and covers the same extent" gains "and reads a cell's centre and row through `centreX`,
`centreY`, `cellCentre` — the one arithmetic (`origin + (i + ½) · cell`; the row `Math.round((c − i) · (1 ÷ cols))`,
C-0044)"; (c) in `hydro/course.ts` above `segParam`: the exactness note (integer inputs: `len2 ≥ 1` or the point is `a`;
double inputs below the area floor: the same, through `ratio`'s refusal).

---

## 3. Test consolidation plan (per test folder)

Principles: oracles stay independent of the code under test (the Planchon–Darboux reference fill, the brute
`firstSelfTouch` scan, `drainPath`'s own D8 table, `flowNear`/`offNormalDeg`, `stage.test.ts`'s own segment distance,
the resource-class recomputation, the raster-grid literal where it states the expected geometry, `reachOf` in
`test/hydro/support.ts` — never replaced by package code); nothing is weakened — every `it` that kills a mutant in a
check's table keeps the case that kills it, by title; the fixture `q20-slow-rings.json` and the `PLAT_S1_TALLY` tally are
byte-untouched; properties keep their sizes (`numRuns` 2 000 / 3 000 / 1 000 and the global 10⁴) and seeds; every
`describe`/`it` title is kept (no old → new map is needed: no file is renamed, merged or split). The `vitest` project
`site` (`plat/vitest.config.ts:44`) is whole-package, so a support file is picked up as a non-test module and no
project needs editing; `test/tsconfig.json` excludes `fixtures/**` — a new support file lives beside the tests, never
under `fixtures/`.

### 3.1 `test/terrain/` (R1) — T-terrain

Eight files, one subject each; no merge. Support: **(a)** `strategy.test.ts:89–93` `build(relief, p, key)` and
`primitives.test.ts:114–118` `make(prims)` are `buildTerrain` with a fixed frame → `terrainOf(f, request, p, key).terrain`
from `support.ts:62–66` (the same call, the same `{ id, key: GROUND_KEY, frame, params, epoch: 0 }` spec but for the
id `'terrain:t'` vs `'terrain:test'` — the id is never asserted in those tests; the implementer confirms by grep).
**(b)** the raster-grid literal at `sampler.test.ts:28, 40` and `resources.test.ts:220` → `rasterGrid(t)` (R1's own
export; infrastructure — the literal names the record's own fields, not an expected value). **(c)** keep as they are:
`plane()` (`sampler.test.ts:14–22`, the one writer of a planar raster through the door), `extremes`, `unclamped`,
`acropolis`, `maskOf`, `resources()`, `HEAVY`, `siteContext` with its `requests` recorder (the T1/T1b/T1c oracle).
Mutant map unchanged by title: R1–R4 → `range.test.ts`; H1–H8, H10–H11 → `strategy.test.ts` "S1 (1)'s heightfield
mechanism", `range.test.ts` "the one door"; S1–S4 → `sampler.test.ts`; E1–E12 (E7–E7d, E10, E12; E11 survives — note
N-6, hardening) → `resources.test.ts`; G1–G2 → `raster.test.ts`; T1–T3 → `strategy.test.ts` "draws one stream …", "a
CITY at its target population …"; P1–P3 → `primitives.test.ts`; N1–N5, A1 → the kernel's `test/noise` (R13 of the kernel
plan). No new pin.

### 3.2 `test/hydro/` (R2) — T-hydro

Seven files (`support.ts`, `fixtures.ts`, five tests), one subject each; no merge or split (`river.test.ts`'s five
describes are one feature's facets, and `checks/M0-e-02.md` cites its line numbers for K01–K03, K17, K18 and F1 — a
split would need J263 Q8's map for no gain). `support.ts` gains:
* `traceOpts(terrain, clearanceCm, params = CITY, reach = reachOf(frameOf(SMALL)))` for the five literals
  (`river.test.ts:143–149, 196–202, 244–250, 285, 374–375, 465–466` — the last as `opts(terrain)`);
* `northInlet(grid, reach)` = `{ cell: (rows − 1) · cols + (cols ≫ 1), at: { x: 0, y: reach.y } }`
  (`river.test.ts:134, 193–194, 238, 464–465`);
* `cityHydrology(terrain, grid?)` = `hydrology(terrain, grid ?? hydroGridOver(rasterGeom(terrain), CITY.hydroCellCm),
  CITY.lakeThresholdCm)` (`river.test.ts:131, 191, 236, 446, 460–461`);
* `courseOf(b)` (`river.test.ts:61–63`; `relief-bar.test.ts:70, 162` inline);
* `carveBars(before: Int32Array, after: Terrain, bodies, carveMaxCm)` — the cut ≥ 0, deepest ≤ cap, bed
  non-increasing under every course (`river.test.ts:66–79` `expectCarveBars` whole; `relief-bar.test.ts:53–61` the
  cap part of `expectBars`, whose D8 100 % and off-grid-sum parts stay in `relief-bar.test.ts`, and whose per-river
  `maxCarveCm ≤ cap` line moves into the shared one — `expectFrameRiver`'s bed check (`:71–74`) is the same
  `nonIncreasing(bedAlong(…))`);
* `fieldOver(g, h)` (`surface.test.ts:18–20`) with `fieldFrom(cols, rows, h, cell) = fieldOver(gridOf(cols, rows,
  cell), h)`; `gridOf(cols, rows, cellCm = 2500, originX = 0, originY = 0)` so `surface.test.ts:14–16` `centred(cols,
  rows)` is `gridOf(cols, rows, 2500, −1250 · cols, −1250 · rows)` (kept as a one-line local for its name);
* `D8_STEPS` — the test-side `[1, 1, 0, −1, −1, −1, 0, 1]` / `[0, 1, 1, 1, 0, −1, −1, −1]` pair of `drainPath`
  (`support.ts:111–112`) also written at `relief-bar.test.ts:48–49`: one test-side table (the oracle stays the test's,
  never `D8_DX`/`D8_DY` from `src`).
Kept apart: `referenceFill` (`pipeline.test.ts:12–38`), `brute` (`river.test.ts:310–321`), `rolling` (`surface.test.ts`),
`Left extends MeanderDraws` (`river.test.ts:366–371`), `reachOf` (`support.ts:86–88`: the expectation's own statement
of §3.2 (9)), `terrainOf` (`relief-bar.test.ts:23–29`: the relief fixtures' builder with its own key form), `clone`,
the fixtures of `fixtures.ts`. Mutant map unchanged by title: K01 (the inlet shift) → "the inlet rung moves the inlet …";
K02 → "knots sit mostly on alternating sides …"; K03 → "re-trace from the last good knot (rung 2) …"; K04, K05 →
`pipeline.test.ts` tie order / away term; K06 → "equals the exact minimal depression-free surface …"; K07 → "types a
depression deeper than the lake threshold …"; K09–K10, K25 → "the width law", "the control knots"; K11 → "carveCourse
refuses …"; K12 → "F-WORK: a low hydro.cells limit …"; K13, K23 → "recomputeCorridors"; K14 → "the switch changes only
the cell size"; K15, L3c → `surface.test.ts` "where the hydrology's D8 runs straight back …"; K17 → "a sink in the
course …" (`tier: 2`); K18 → "with no bearing the inlet lies on the highest edge …"; K19 → "the inlet rung (rung 3, an
attempt) …"; K20, F1 → "a degraded river reports reachesCore on the course it delivers …"; K21 → "the basic estuary
widens …"; K22 → "a tributary from the east edge joins the river"; K24 → "a self-touching course is re-traced …";
L3a, L3b, L3d, L3f, L3g → `relief-bar.test.ts` "CITY[ with hydroCoarsen]: a river from the highest edge …"; L3e
survives (note N-1, hardening — a line-fault detour fixture is a new pin for the hardening phase, not this round).
No new pin.

### 3.3 `test/water/` (R3) — T-water

Nine test files plus `support.ts` and the fixture, one subject each; no merge or split. `support.ts` gains:
* `GENERATED_AT_0` — the lifecycle literal (`faces.test.ts:16` `LIFE`, `slow-rings.test.ts:31` `LIFE`,
  `crossings.test.ts:28`, `outfalls.test.ts:31, 73` inline); it stays a test-side literal (the oracle of E-4's record
  shape), never `generatedLifecycle` from `src`;
* `waterBody(id, kind, course: readonly { x; y }[], widths: number | readonly number[], extra?)` — one builder for
  `faces.test.ts:18–29` `body(id, kind, [[x, y]], width, extra)`, `slow-rings.test.ts:33–43` `body(id, kind, [[x, y]],
  width | number[])`, `crossings.test.ts:20–30` `body(id, course: LatticePoint[], widths)` and `outfalls.test.ts:21–32`
  (`river(halfWidth)`'s body): the call sites keep their shapes through two-line local adapters where the signature
  differs (`faces.test.ts`'s `[x, y]` pairs through `pt`), every assertion unchanged;
* `SMALL_ARENA` — `FRAME` (`{ widthCm: 50_000, heightCm: 30_000, aspect: 5/3, marginShare: 0.5 }`), `REACH =
  reachOf(FRAME)`, `OPTS = { key: GROUND_KEY, stage: STAGES.S1, workLimit: 1e9 }` (`faces.test.ts:13–15`,
  `slow-rings.test.ts:30, 46–47`);
* `heldRefs(terrainId, out)` — the stage-end subject list (`exit-bar.test.ts:33–46`, `stage.test.ts:156–169`,
  `references-row.test.ts:91–107`, `slow-rings.test.ts:289–290`): the test's own statement of the row's subject (the
  oracle for s2's K09–K11, never `stage.ts`'s list), written once;
* `hardFailures(plat, refs, live)` (`slow-rings.test.ts:75–79`; `exit-bar.test.ts:47–48` inline);
* `everyL0EdgeShoreOrRing(plat)` (`exit-bar.test.ts:87–95` the first half of `deckProperty`; `slow-rings.test.ts:132–135`);
* `lp(x, y)` beside `pt` (`crossings.test.ts:16–18`).
Kept apart: `recording`, `plant`, `runOn` (`references-row.test.ts`: the breach harness), `print` and `rowsAt`
(`stage.test.ts`), `edges` (`faces.test.ts`: a different view), `hairpinRing`, `reachOfRing`, `commitRings`,
`registeredS1`, `SMALL_RIVER` (`slow-rings.test.ts`), `bar` and the second half of `deckProperty` (`exit-bar.test.ts`),
`straight`, `deckLen`, `offFlowDeg` (`crossings.test.ts`), `terrainOf`, `narrowDir`, `accOf` (`outfalls.test.ts`),
`int32Writes` (`one-door.test.ts`), `flowNear`, `offNormalDeg`, `riverFixture`, `ground` (support already).
`stage.test.ts:142–146`'s own segment distance stays the ±40 m oracle there; `exit-bar.test.ts:64` reads `segSeg2` from
`src` for the same bound — left as it is (a change to the test's own oracle would be a strengthening outside the
pass's "zero change"; noted for the hardening phase in Q7).
Mutant map unchanged by title: M0-e-03 round 1 M01–M06, M08–M14, M20–M21, M23–M32, M34–M35, M38–M40 → `crossings`,
`faces`, `outfalls`, `stage`, `exit-bar` (`checks/M0-e-03.md` names the killing titles, e.g. M04 → "sites: Bridges in
state site …", M25 → "a corner cell stepping off diagonally …"); the survivors M15–M19, M22, M33, M36–M37 are notes 2–6
(hardening); close-r1 F01–F08 → `exit-bar.test.ts` both `it`s and `crossings.test.ts` "the flow is averaged over one
channel width …"; s1 K01–K03, K05–K12, K14–K17, K19 → `slow-rings.test.ts` by title (K04, K13, K18 survive — notes
12–14); s2 K01–K04, K06–K08, K12–K14 → `references-row.test.ts` (K05, K15 equivalent; K09–K11 survive — note 16).
No new pin.

---

## 4. Not touched, and why

* **Every exported name of every folder index** (hence of `@plat/site`, ≈ 196 names): frozen (J263 Q1). Duplicated
  *exported* functions become delegations under both names (`reachOf`, `rasterGeom`, `segDist2`, `segSeg2`, `invCols`);
  the shared helpers of this plan are file-level exports imported by path. X-2's unread exports stay.
* **Item-listed interfaces** of M0-e-01, M0-e-02, M0-e-03 (the header's list): signatures and behaviour untouched.
* **Persisted and recorded forms**: the `Terrain` record and its one-door raster, the `hydro` grid and arrays, the
  outfalls; the `WaterBody` records with `controls`/`nextControl`/`widthProfile`; the ids; the L0 batch's rows and the
  pinned `deck_end` vertices; `RiverReport`, `S1Report`, `HYDROLOGY_ROW`; `test/water/fixtures/q20-slow-rings.json`;
  the exit bar's `PLAT_S1_TALLY`.
* **Message texts tests pin** (the header's list) and the kernel-message contract `stage.ts:125, 142` (W-12).
* **`direction(bearing)`'s `finite` check** (`primitives.ts:64–67`) against `inletOf`'s unchecked bearing (E-3): sharing
  the function would change the outcome on a non-finite bearing (NaN inlet today, a throw after) — only the constants
  are shared.
* **Two cell-index arithmetics**: `course.ts:182–190` `cellAt` (`Math.floor(ratio(x − origin, cell))`) and
  `terrain/sampler.ts:74–75` `flowAt` (`Math.floor((x − origin) · (1 ÷ cell))`), as `heightfield.ts:131, 150` and
  `resources.ts` multiply by a reciprocal where `cellAt` divides: on a cell boundary the two can differ by an ulp. Each
  site keeps its arithmetic; a unification would be a (tiny) behaviour change to measure, not to assume — hardening (Q7).
* **The two bucket floods** (H-11), **`inletMasks` vs `edgeCells`** (H-12), **`meets` vs `segmentsCross`** (H-7),
  **`quot` vs `lengthQuotient`** (three refusal behaviours by design, H-9), **`cleanRing` vs `simplifyChain`** (two
  Douglas–Peucker passes: a ring from its farthest vertex with fixed vertices and a needle pass; a chain with a
  half-width term — different rules, each stated in its header), **`ON_CM` vs `FIXED_BAND_CM`** (W-6),
  **`besideWater` computed in `groundClasses` and again in `siteResources`** (`groundClasses` is public on its own; one
  mask shared between them would change nothing and save little), **the negative-zero flush idiom** `v === 0 ? 0 : v`
  (`course.ts:56`, `sampler.ts:62`, `heightfield.ts:63, 74, 193`: five sites, one idiom, each where a `−0` could reach a
  record — named in one comment at `heightfield.ts:74`, not a helper).
* **`foldWarnings`** (W-13): the kernel's keeps `at`; the site's is a report of counts.
* **The router-like structures**: `runRivers`' attempt loop, `runS1`'s retry loop over the fast and the kernel's rings
  (`stage.ts:111–144`), `estuaryPair`, `waterBatch`'s five steps — the design after C-0173/C-0175/C-0229/C-0307/C-0310;
  comments only.
* **`XY` vs the kernel's `Point`/`PointCm`**, **`Reach` vs `{ x; y }`**, **`GridGeom` vs `CellGrid`** (Q5): structural
  types; public type names stay as declared.
* **Test oracles** (§3's lists); the three cross-item `support.ts` copies (X-1, Q3).
* **The hardening notes**: `checks/M0-e-01-notes.md` N-6 (the band's edge), N-7; `M0-e-02-notes.md` N-1 (L3e);
  `M0-e-03-notes.md` 1–18 (the 22 cm outfalls, the guards without fault injection, the partition rebuild, a seedless
  part, the span filter, bridge ids after the input's, the refused tributary, the ring left committed, K04/K13/K18,
  K09–K11, the runner's S1 work line); none is a consolidation.

---

## 5. Open questions for the session

**Q1 (R2).** Two throws that no lawful or unlawful grid reaches — `trace.ts:148` `'trace: a grid of no columns'`
(H-3) and `strategy.ts:38` `` `river: a divisor of ${den}` `` (H-9) — lose their text when the duplicate helper goes
(`invOfCols` keeps `field.ts`'s text; `lengthQuotient` keeps `course.ts`'s). Neither is pinned (grep over `plat/`) and
neither is reachable (`cols ≥ 1` by construction; the ray's divisor ≥ 2²⁰ ÷ √5). J263 Q6 freezes *pinned* message
texts; the plan reads an unreachable, unpinned throw's text as outside that freeze. Confirm, or keep both wrappers as
two-line functions around the shared helper.

**Q2 (R3).** W-8 replaces `offset.ts`'s module variable `why` and `refusal()` by a `{ refused: string }` result of
`offsetRing`/`mouthRing`/`eraseLoops` — a return-shape change of file-level exports no index lists, with every string
byte-identical and every outcome the same. Is a structural clean-up of this kind inside pass A (zero shift, the plan's
default), or does the session want it deferred to pass B?

**Q3 (all).** `test/terrain/support.ts`, `test/hydro/support.ts`, `test/water/support.ts` repeat `TABLES`, `townKey`,
`siteContext`, `frameOf` (X-1). No item owns a shared test folder; a `test/support/` would be a new owns line for one
of the three items or the session's. Keep the three copies (the plan's default, as J268 Q3 kept the mulberry32 copies),
or rule a home and its owner?

**Q4 (R3).** `polygons.ts foldWarnings` vs the kernel's barrel `foldWarnings` (W-13): the site's drops `at`. Keep the
site's (the plan's default), or ask the implementer to show that no `buffer`/`booleans` warning carries `at` and
delegate?

**Q5 (R2).** `GridGeom` (`hydro/course.ts:13`, a public type) and `CellGrid` (`terrain/grid.ts:14`) are one shape. May
R2 write `export type GridGeom = CellGrid` (a d.ts form change; every signature structurally identical), or does the
public-type freeze keep the interface declaration? Default: keep the interface (no change).

**Q6 (hardening, not a round).** The water stage reads the kernel's refusal text to name the refused body
(`stage.ts:125` `/\(shore, ([^)]+)\)/`) and quotes it after `no further rung —`: a cross-package message contract. A
structured field on the kernel's refusal (the refused chain's rows) would make it a typed contract — a queue row for
the hardening phase under M0-a-05/M0-e-03, not this pass.

**Q7 (hardening, not a round — pins noticed in passing).** (a) `terrain/strategy.ts:55`'s `E_OUT_OF_RANGE 'rung'` has
no test (hydro's twin has one); (b) the two cell-index arithmetics (§4) are a measurable-not-assumed difference;
(c) `exit-bar.test.ts:64` measures the 40 m spacing with `src`'s `segSeg2` where `stage.test.ts` carries its own —
an oracle-independence strengthening; (d) `checks/M0-e-01-notes.md` N-6, `M0-e-02-notes.md` N-1, `M0-e-03-notes.md`
12–14, 16 are the existing pin gaps (J273 Q1's class: a queue row per item for the hardening phase, L14's pattern).

**Q8 (ZERO REFUSALS, J264/N-58 — a finding routed, not a change).** On the registered family (the exit bar's 100 CITY
seeds at 100 ha) one lawful input is still refused: bar seed 62's tributary, dropped `refused` on both polygon paths
(a mouth meeting the river at a grazing angle; `checks/M0-e-03-notes.md` note 7; C-0307 (4) measured the refused
tributaries 3 → 1 after s1, seeds 46 and 92 now kept). The bar's bound `refused ≤ 3` (`exit-bar.test.ts:124`) admits it.
Under J264 (2) it is a MAKE-IT-SUCCEED class for the refusal census (`refusal-census.md`, L23): a fix round on
M0-e-03 (cut the mouth along the river's shore at a minimum angle, or extend the tributary's course to meet the shore
steeper — note 7's handling) with seed 62 pinned, and the bound tightened to 0 then. The three consolidation rounds
report this count before and after (1 → 1) and change nothing of it. No other lawful-input refusal was found in the
package's registered families (terrain: none; hydro: the relief bars deliver `degraded` rivers on the two fixtures —
C-0175 (8)'s declared core miss, a delivery tier, not a refusal; water: stage refusals 0 / 103, `retried` 0).

**Q9 (R1 – R3, scheduling).** The rounds touch no file an in-flight round owns and depend on no kernel round (the kernel
plan's R13 holds M0-e-01's kernel owns — `noise/`, the adapter — which R1 leaves untouched; a seat that runs both
M0-e-01 rounds in one container keeps them as two records). May R1 start now, R2 after R1's closing check, R3 after
R2's? The water round's closing check carries the heaviest bar (≈ 2 h RELATED at one worker as `-s2.md` measured; NEAR
≈ 100 s).
