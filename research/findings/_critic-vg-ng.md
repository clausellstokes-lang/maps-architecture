# _critic-vg-ng — third critic seat: the Village Generator / Neighbourhood findings

Critic pass run 2026-09-25 (seat 3 of the completeness critique; seats 1 and 2 are `_critic.md`, `_critic-ftg.md`,
`_critic-os.md`). Scope: `profile-village.md`, `profile-neighbourhood.md`, `vg-ng-devlogs.md`, `vg-posts-a.md`,
`vg-posts-b.md`, plus the VG/NG-relevant sections of `watabou-extra-a.md` / `watabou-extra-b.md`. No captured
JavaScript bundle was opened; recorded behaviour was read from `calls.json`, `report.md`, `console.jsonl`,
`meta.json` and the CPU profiles' sample arrays. Raw Patreon/itch bodies were read from
`research/patreon/**/post.md` and `research/devlogs/**/post.md`.

## 0. What this critic did and did not do (read this first)

* **Read in full, line by line (every line of every file):** `_critic.md` §0, §2 (all rows), §3, §6;
  `profile-village.md` (1 944 lines: body, Appendix A, the 2026-09-21 Critic addendum and the River-course addendum
  R1–R6 — there is no "part 2"); `profile-neighbourhood.md` (1 478 lines: body, CA-1..CA-5, RA-0..RA-9);
  `vg-ng-devlogs.md` (1 002 lines); `vg-posts-a.md` (1 169 lines); `vg-posts-b.md` (962 lines).
* **Read by outline plus full sections:** `watabou-extra-a.md` §1 (chronology) and §2.1–2.6 (twisted bisection,
  lot side walls, curvilinear streets, uneven streetwall, large buildings, NG templates); `watabou-extra-b.md`
  §1 (chronology), T1–T7 (holes, ring template, straight skeletons, gable skeleton, fake gables, label spines,
  ridge idea), T18–T22 (floor plans, multi-colour, Outline, farmlands, fjords), T23–T25 (Urban Places), T31,
  §4 and §5. Not read in either extra file: the Perilous Shores, 1PDG, City Viewer, castle, hatching and style
  sections that do not concern NG/VG (`watabou-extra-a` §2.7–2.24, §3–§6; `watabou-extra-b` T8–T17, T26–T30,
  T32–T33, §3, §6).
* **Raw sources opened for spot-checks (data only, never a JS bundle):** 20 `post.md` bodies under
  `research/patreon/watabou-village/` and `watabou-extra/`, 4 devlog `post.md` files, every VG and NG
  `console.jsonl`, `meta.json` and `report.md` header, the VG `grammar.json` and palette JSON bodies and the NG
  `default.json` body, all 34 `calls.json` files (10 NG, 24 VG) and the 6 `draw.json` files of the two base captures
  and the ring capture. Scripts: scratchpad `rederive.py`, `spot.py` (outputs `rederive.out`, `spot2.out`).
* **Not done:** no new recording was made; no PNG was re-measured (the addenda's pixel claims were taken as
  written); `profile-mfcg.md` was only grepped for the `PointExtender.project` identity (C13) — it was not read.
* **Token budget:** ≈ 210 k tokens of reading, under the 350 k switch point, so nothing was downgraded to outline
  reading inside the five VG/NG files.

**Headline.** The five files are internally corrected by their own addenda far more than they contradict each
other: 12 of the 27 contradiction rows below are "body says X, that file's addendum says Y" and the addendum
wins every time. Two new facts change what a designer should believe: (1) **the live VG build changed between the
2026-09-21 and 2026-09-25 recordings** (`html/19251041` → `html/19365073`; same seed 3131 keeps its name and POIs
but not its geometry, and `River.calculateCurvature` no longer executes), so every VG number in the findings is
build-stamped; (2) **the `makeCut = PointExtender.project` identity that `_critic.md` C13 leaned on holds in
MFCG, VG *and* NG's plain `Bisector` but not in NG's `BisectorEx`**, whose streets still meet both boundaries at
right angles — the projection is therefore not the right-angle construction, and C13 goes back to plain OPEN.

## 1. Contradictions between the VG/NG findings files and against `_critic.md` §2 rulings

Verdict key as in `_critic.md` §2: **RESOLVED** (one side refuted by evidence in the corpus, stated which),
**RECONCILED** (both right about different versions/aspects), **OPEN**. Rows V1–V6 re-examine the standing rulings
C2/C3/C6–C10/C13; the rest are new. Abbreviations: pv = `profile-village.md`, pn = `profile-neighbourhood.md`,
vpa/vpb = `vg-posts-a/b.md`, vnd = `vg-ng-devlogs.md`, xa/xb = `watabou-extra-a/b.md`.

| # | subject | file A says | file B says | verdict |
|---|---|---|---|---|
| V1 (C7) | VG stage order | pv §4.0 body: water → forest/fields/network → elevation "finalised late" | pv Critic addendum + River addendum R1 (sample timestamps, 6 profiles): `River.new` → `Elevation.new` (noise → `digRiver` → gradient) → `createWater` → `createDensity` → `roll{buildNetwork → placeBuildings → spawnFields → rollForest → rollName}`; vpa §3.1 `[STATED]` "First, a height map is created" | **C7 stands, sharpened.** The course polyline exists *before* the height field (R1: `River.new` returns at ≤ 0.9 ms, first noise object at 1.07 ms). Body §4.0 must not be quoted. |
| V2 (C8) | what `digRiver` measures | vpb §2.4 `[INFERRED]`: "build the water mask first", `h = base + f(distance_to_water)`; pv body §4.2: "segments of the water polygon" | pv R1/R2 `[SHOWN]`: no water polygon exists when `digRiver` runs (`createWater` starts ≈ 3 ms later); `dist2segment2 ÷ 16 384` = the River **course** segment count (36–51 old build, 64–94 new build) | **C8 RESOLVED (was PARTLY).** vpb's distance-carve formula is right, its operand is wrong: the distance is to the course polyline, and the water body is extracted *from* the carved field afterwards. |
| V3 (C10) | roads vs slope | vpb §2.22/§2.23 `[INFERRED]`: least-cost A*/Dijkstra over the height field; "least-cost path would wander" on a noisy density map | pv §2/§4.4 + this seat's re-derivation: no graph-search class runs; `Tracker.advance` 130–372 per village while **`Elevation.g` is called only 1–5 times per village** in all 24 runs | **C10 stands, narrowed.** Steering cannot call the elevation sampler per step; whatever slope term exists reads the pre-built gradient array (`createGradient`, 1 call) inline or lives in `Tracker.flexibility` (≈ 1 per step). |
| V4 (C9) | VG field layout | vpb §2.11 / vpa §3.10 / vnd A2.4 `[INFERRED]`: annular sector or strip tiling, "polar-space subdivision" | pv §4.7 `[SHOWN]`: `getVoronoi → intersect → cut → Bisector.partition/subdivide` (OBB), arcs by `semiSmooth/getArc`; re-derived here: `Farmland.cut = Bisector.new = partition` and `getMinArea = subdivide` in all 24 runs | **C9 stands.** Add: VG's `Bisector.makeCut = split = PointExtender.project` 1 : 1 in every run (22/41/46/28 …) — the same identity as NG's plain `Bisector` and MFCG's; pv never states it. |
| V5 (C13) | bisector cut rule | `_critic.md` C13: "the recorded `makeCut = PointExtender.project` 1 : 1 is [the stated construction's] perpendicular-foot step"; pn CA-5 same | pn RA-9 item 7 `[SHOWN]`: `BisectorEx` makes **zero** `project` calls yet its streets meet both rings at right angles (RA-4); this seat: the identity also holds for VG's field bisector, which the creator never described as bent | **RESOLVED against the C13 narrowing; C13 itself stays OPEN.** `project` is common to every *plain* bisector (MFCG, VG, NG) and absent from the one bisector that is *demonstrably* bent-and-perpendicular, so it is more plausibly the OBB-axis position step than the right-angle step. |
| V6 (C2/C3/C6) | PoissonPattern, NG identities | as ruled | re-derived on 21 clean VG runs + 9 NG runs: `validate ÷ step = 50.000` everywhere a pattern exists; NG `Block = Street + 1 − R`, `extend = 2·Street` (square 2S − 2), `BisectorEx.makeCut = split + 1`, `subdivide = 2N`, `not = 2N − R`, `new = 2S + not` all exact | **C2, C3, C6 CONFIRMED on the raw files** (§4). |
| V7 | VG heightmap character | vpa §3.2 `[INFERRED]`: "low-octave smooth field … *not* consistent with multi-octave fBm" | pv R2 `[SHOWN]`: `Noise.get = a + b`, `Perlin.get = 5a + 6b`, `a = 16 384·E` exactly (re-derived on all 21 clean runs, incl. E = 2 retries): a **5-octave** fBm sampled once per 128² cell, plus `createGradient` and a per-water-type radial primitive | **RESOLVED against vpa.** The smooth contours in the images come from low base frequency/persistence, not from octave count; vpa's "sum of radial bumps" survives only as the `createMount/createHollow/createRidge/createCrack` primitives added on top. |
| V8 | pond shape | vpb §2.2 `[INFERRED]`: circle with 1–2 radial harmonics, "inconsistent with a noise-threshold contour" | pv R1/R2 `[SHOWN]`: pond = `createHollow → createMount` in the height field, then the shared `Water.pond → setLevel → createDeflection → buildCurves(getGrid → linkSegments → smoothOpen → resample)` extraction | **RESOLVED for the recorded construction:** a pond *is* a level set — of a radial hollow, which is why it looks like a perturbed circle. vpb's appearance argument does not discriminate. |
| V9 | river centreline | vpb §2.3 / §6.1 `[INFERRED]`: spline through control points with alternating offsets | pv R2 `[SHOWN]`: `River.new` (no noise, no spline evaluator anywhere in VG) → `PolyUtils.resample` → `Chaikin.render` → `calculateCurvature`; ≈ 40 px per segment | **RECONCILED:** control points with lateral offsets are still admissible (H-R1), but the smoother is Chaikin, not a spline. Build caveat: the new build resamples ≈ 2× finer (V25). |
| V10 | water bands | vpb §2.10 `[INFERRED]`: iterated inward polygon offsetting + per-step smoothing, "true polygons" | pv §4.3 `[SHOWN]`: `shallowBands` boundary **strokes** with `lineWidth = W·k^1.5`, masked by the water polygon; re-derived here: 5.196 : 2.828 : 1 in all three draw records | **RESOLVED for the live build.** vpb's 8/10/15-band images are other palettes (`shallowBands` 5/10). The differing segment counts per band (147/219/439) remain pv §10 item 4. |
| V11 | road merging / driveways | vpb §2.20 `[INFERRED]`: render-time treatment ("in the Style dialog"); §2.21 driveways | pv Appendix A: `RoadsView.buildMerges`/`addMerge` (4/4/14/4) and `RoadsView.buildDriveways` (1) live in `mapping.*`, gated by palette `mergeRoads` | **RESOLVED in vpb's favour — both are view-side.** |
| V12 | palisade shape | vpb §2.25 / vnd A2.9 / vpb §2.24 `[INFERRED]`: a level set of the density map, smoothed | pv §4.9 `[INFERRED from counts]`: `Palisade.getPopulated → getBuildings → ConvexHull.ofSet` (closure ×91) `→ poly2smooth` (32 `cubic`) `→ overlaps = BitMap.check` 1 463 → `addGate` 3 | **OPEN, narrowed.** The recorded construction is hull-based and pushed off buildings by a raster test; no `Noise`/`Elevation` call is attributable to it. The density map enters through which buildings count as "populated" (creator: "depends on the density map"). Whether the 91 hulled points are building corners or a density contour is undetermined. |
| V13 | selective outlining | vpb §2.32 `[INFERRED]`: `HardLight(darken(fill), Ink)` lerped by pressure | pv §7.4 `[verified ±0.005]`: `outline = lerp(fill, ink, factor × pressure)` with `Color.hardLight` count == `Style.getOutline` count | **RECONCILED — use pv's formula;** the stated `pressure = 1` discontinuity (vpb) is not in pv and must be carried. |
| V14 | unlit roof colour | vpa §3.15 `[STATED 71653886]`: unlit = colour × shadow colour | pv §7.4 pair `#BA9B85 → #73615E` with `shadowColor #9699AE`; re-derived: ratio (0.621, 0.629, 0.708) vs shadow (0.588, 0.600, 0.682) — 4–6 % light; `dark = lit × lerp(white, shadow, t)` fits with t ≈ 0.92 on all three channels | **RECONCILED (statement approximate).** Multiply is the mechanism; the multiplier is a slightly lightened shadow colour (§4 item 10). |
| V15 | what `PoissonPattern.warp` is | pv §4.6 / pn CA-4 `[INFERRED from the name]`: candidates sampled in a warped domain, "the organic look" | vpb §2.15 `[STATED 88749133]`: domain warping is applied to the **fractal noise** that drives tree density (`Forest.roll → Noise.get`, 6-octave fBm per pv R2); pn RA-8: `Point.polar ≥ warp` — one polar offset per candidate | **OPEN, narrowed.** The stated domain warp is on the density noise, not the sampler. `warp` is 1 : 1 with candidates and tracks `Point.polar`, so it is at least the annulus-offset step; whether it also warps the domain is unrecovered. Designers should not attribute the ragged wood edges to `PoissonPattern.warp`. |
| V16 | "towers" | vpb §2.26 `[STATED 117634240]`: from 1.6.5 towers are "real buildings, not just props" | pv R3 `[SHOWN]`: the 2026 build still runs `model.props.Tower.new/draw` (1 : 1 with `SquareBuilder.addCenterpiece`), not counted in `Legend` "Buildings: N" (`addBuilding` == console count) and drawn by its own class, not `BuildingView` | **RECONCILED.** "Real building" in 1.6.5 means numberable/openable in Dwellings; the model and view still treat the tower as a prop. vnd A2.2's "building on the square" (`635140/07`) is this tower. |
| V17 | map scale | vpb §6.17: "VG has no committed metric" | vpa §3.16 `[STATED 84106820]`: JSON export at **0.7 m per unit**, medium map 350 × 350 m; vnd A5 `[STATED 613514]`: "about 300 or maybe 200 meters" | **RECONCILED.** The on-screen grid is in abstract units (1.6.8); the JSON export is metric. Both quotes verified at source (§3). |
| V18 | NG lots | vnd B2.2 `[INFERRED]`: offset the block inward by a building depth and walk the ring into frontage strips | pn §3.4 `[SHOWN]`: lots come from the same recursive `Bisector.partition` (one per `Normal` block), `indentFronts` setback, `validateOuter` discards ≈ 42 % of leaves | **RESOLVED against the ring-walk.** The perimeter-block look is a *filter*, not a construction. (xa §2.2's 2019 ring-of-rectangles idea is MFCG's, not NG's.) |
| V19 | NG street corridor | vnd B2.1 `[INFERRED]`: blocks = partition cells inset by half the street width | pn §3.2: `PolyCreate.stripe` once per street (model corridor) + `indentFronts`; streets *rendered* as strokes at `getStreetWidth`; RA-2: `BisectorEx` subtracts the corridor inside the cut (`ExPolygon.not`) | **RECONCILED** — inset in the model, stroke in the view; and two different moments for the two bisectors. |
| V20 | NG squares | vnd B2.5: "at least two morphologies" (irregular polygon by omitted frontages, 1.1.0 image; circular plaza) | pn CA-1/CA-3: `SquareHood.buildSquare` (rotated-square plaza, 2 425 B) and `buildRound` (1 669 B); xa §2.6 `[STATED 64375271]` "an open rectangular area" | **RECONCILED as a version ladder;** the live build has exactly two branches, rectangular and round. |
| V21 | NG `getCloud` | pn §3.1/§2/§9 body: the hood-outline generator ("union of 17–30 circles") | pn RA-9 item 1 `[SHOWN]`: `getCloud` = `layoutTitle` = `setViewport` in 10/10 runs, parent `MapScene.layout`; outline is `<template>.createShape`; `getArc/getCircle` are fillets under `semiSmooth` | **RESOLVED (within file).** Carry RA-9, not §3.1. |
| V22 | NG wells/chimneys/fountains | pn §3.10/§4.3 body | pn RA-5 (same-seed coverage ↔ draw pairs): "props" layer units = `Wing.addChimney` exactly; tiny 3-op canvases = `WellView`; gradient canvases = `FountainView`; `createRadialGradient = 2·(domes + fountains)` | **RESOLVED (within file).** |
| V23 | NG RNG side-channel | pn §3.11/H14: `Random.save/restore` brackets **naming** | pn RA-9 item 4: save/restore = 1 only when `Settings.randomTags` = 1 (0 in all six URL-tag runs though a name was generated) | **RESOLVED (within file):** it brackets random *tag rolling*. vnd Part C item 12 ("sub-seeds per layer") is supported for VG by `Random.reset` = 6 per regeneration (§4 item 11), not by NG's save/restore. |
| V24 | NG PoissonPattern | pn §3.8 body: warped 80 × 80 lattice, built "exactly once per generation" | pn CA-4/RA-8 | **RESOLVED (within file);** C2/C3 confirmed on raw files (§4). |
| V25 | **VG build identity** | pv body §1.1 and all addenda: `html/19251041/bin`, seed 3131 = "Lettice's Water", 29 buildings, pop 196, course 51 segments, `River.calculateCurvature` 1 | the four uncited 2026-09-25 captures (`10-14-02`, `10-19-31`, `10-27-25`, `10-28-58`): `html/19365073/bin`, seed 3131 = "Lettice's Water", **24 buildings, pop 162, course 94 segments, `calculateCurvature` 0**, `Forest.(anon@349301)` 0 (was 1 464), `Region.spawnAt`/`Building.a`/`GableRoof.drawTower` newly executing, same POIs ("The Nothern Bard", "Lora's") | **RECONCILED as two builds — and a hazard.** Every VG count in the findings is for build 19251041; R2's "51 segments" and the curvature step are build-specific. Name and POI streams are seed-stable across builds, geometry is not. |
| V26 | VG centrepieces | pv §4.5 body: well or single large tree; vnd A2.2: "a building on it"; vpb §2.26: tower/well/tree/none | pv R3: `addCenterpiece` ↔ exactly one `props.{Tower,Tree,Well}.new` in 6/6 square runs | **RECONCILED:** three prop kinds; "none" (vpb `104226049/04`) is the water-overlap suppression `[STATED 80494491]`. |
| V27 | NG palette schema size | pn §4.1: "identical **27-key** schema" | the captured `default.json` has **26** keys (re-derived; the §4.1 table itself lists 26 rows) | **RESOLVED — wording error (26).** |

Version-ladder items that are **not** contradictions (keep as chronology): NG layer toggles (vnd B3.1 lists 5 from
devlog 419965; pn §1.5 lists 6 incl. `toggleChimneys` from the 2026 binary); VG tree methods (Simple/Cotton/Blobs →
Improved only → `treeShape ∈ {Cotton, Conifer, Palm}`); VG relief modes (hachures → +Grass, +Contours → palette
`relief` key); NG squares (V20); VG square shapes (round → +rectangular 1.5.2; the live 44-gon disc of pv §4.5).

## 2. `[NAMED-ONLY]` / low-confidence items that another available source resolves (extends `_critic.md` §3)

Rows already in `_critic.md` §3 are not repeated. "Resolves" means the other source states or records the method;
where it only narrows, the row says so.

| where flagged | item | resolving source(s) |
|---|---|---|
| vnd A2.7 UNKNOWN, vpa §3.8 UNKNOWN, vpb §6.1 | are rivers traced downhill or drawn first? | pv R1 `[SHOWN]`: drawn first — `River.new` runs inside `createElevation` before any noise object exists; terrain is carved to the course (`digRiver → dist2poly`) |
| vnd A2.6 `[NAMED-ONLY]` "numbered houses" | what is numbered and how | vpb §2.34 `[STATED + SHOWN]` (shift-click marking, creation-order numbering, permalink storage from 1.6.5); pv Appendix A: `NumbersLayer.new/update` runs every generation and paints nothing unless houses are marked |
| vnd A2.3 `[NAMED-ONLY]` orchard method | rows vs chaotic fill | vpa §3.11 `[STATED 80494491]` "rows of smaller trees … if the shape of a plot is particularly irregular, trees are placed more chaotically" **and** pv §4.7 records both branches: `FarmlandView.getRows` (1–4 per map) vs `FarmlandView.getPoisson` (1–2), each orchard picking one, with `validateTree` rejecting trees outside the plot |
| vnd A2.5 `[NAMED-ONLY]` how streets are generated | mechanism | vpa §3.1 `[STATED 35854256]` gradient-steered trackers; pv §4.4 `[SHOWN]`: 4–11 `Tracker`s, ≈ 30–40 `advance` steps each, per-step `flexibility → findRoadAhead → avoidWater → endBridge`, `Junction.new` 3–5; V3 for what steering does *not* call |
| vnd A6.1, vpa §3.6 UNKNOWN | house placement algorithm | pv §4.8 `[SHOWN]`: `buildAlong` per street (6–16), `Building.new` candidates → `validateBuilding` (`testVsRoad`, `getBuildingsAround` via `BinGrid`) → `addBuilding`, acceptance 63–82 %; vpa §3.6 quotes 37407181 `[STATED]` "more sparsely … all proper rectangles" — the signature of the same rejection placer |
| vnd A6.3, vpa §7.4, vpb §6.3 | density-map construction | **narrowed only:** pv addendum/R4: `Region.createDensity` is one call of 0.6–1.1 ms with no sampled children, run after `createWater` and before `roll`; vpb §2.23 `[STATED]` it was "generated very differently" in 1.6.1. Form still unknown (§6). |
| vnd B4.4 "full template list" | NG templates | pn: `AreaHood`, `StreetHood`, `SquareHood` (`buildRound` + `buildSquare`), `RingHood` recorded; xa §2.6 `[STATED 64375271]` Area/Street/Square defined, *Junction, Park, River bank, Bridge, Port* planned; xb T2 ring. No fifth template executes in 10 samples. |
| vnd B4.5 patch-outline generation | NG hood outline | pn RA-9 item 1: `<template>.createShape` (sampled child `PolyBounds.obb`; `PolyTransform.asScale` only in area/ring) — `getCloud` is view framing. Construction body still unrecovered. |
| vnd B4.6 frontage subdivision law | NG lots | pn §3.4 (recursive `Bisector` + `indentFronts` + `validateOuter`), V18 |
| vnd B4.7 which blocks become greens/squares/partial | NG block content | pn §3.3/§3.8/RA-1: content classes `Normal` (≈ 88 %), `Manor`, `Empty`, `Green` (ring centre); `createGreen` on 23–58 % of Normal blocks, 77 % with `leafy`; partial frontages = `validateOuter` discards |
| vnd B4.1/B4.2, xa §2.1 UNKNOWN, xb T1 UNKNOWN | bent-cut parameters | **not resolved by any source** — narrowed by pn RA-2/RA-3 (`BisectorEx` retry loop ≈ 4 % alternative cuts, ≈ 1 % restarts; corridor subtracted in the cut; bends filleted by `getArc`) and V5. |
| vpa §7.13 permalink encoding | what the URL carries | pv §3.1 `[STATED]` `?seed=<uint32>&tags=<list>&trees=<uint32>`; vpb §2.39 numbered buildings from 1.6.5; pv R6: Enter after a URL seed reproduces the next seed across browsers |
| vpa §7.14 per-subsystem RNG streams | which subsystems | pv §3.2 `trees` stream `[INFERRED]` + vpa §3.13.2 `[STATED 50688261]` Shift+T reroll; this seat: `Random.reset` = 6 per regeneration (7 cold) in every clean VG run (§4 item 11) — at least six (re)seed points per village, identities of the streams unknown |
| vpa §7.9, vpb §6.12 | square size / centrepiece choice | pv §4.5 + R3: 44-gon disc, `SquareBuilder.place/addCenterpiece`, `props.{Tower,Tree,Well}` 1 : 1, `PolyBounds.testShapeVsShape` as the square signature; `dead end` highway alignment `[STATED 91692684]`. Sizing law still unknown. |
| vpb §6.10 | merging: graph or render? | pv Appendix A `RoadsView.buildMerges/addMerge` — render (V11) |
| vpb §6.19 | pier rules | pv R3/R5: `Region.buildPiers` runs on every watered map; `BridgeView.drawPier` 0 on the two rivers, 2 on the island (draw pass: 4 on the coast); piers reuse `drawPlanks`, cast no shadow. Width threshold unknown. |
| vpb §2.31, vpa §3.14 | relief modes as data | pv §7.1 `[STATED]` palette key `relief ∈ {Grass, Hachures, Contours}` (default/minimal Grass; sand/night Hachures; bw/cold Contours) driving one `LevelsView` iso-walker (§6) |
| vpa §3.21 POIs "never shipped in this window" | status in 2026 | pv §1.2/§4.11: `Legend.hx:82` still prints exactly two POIs per village to the console (`Note.new` = 2), nothing is drawn — POIs remain console-only in build 19251041 and 19365073 |
| vpa §3.5 "lonely houses" tuning | recorded form | pv Appendix A: `Tracker.shortcut` (0–1), `Region.spawnAt` (gen-3; and every 09-25 run), `RoadsView.buildDriveways`; dotted trails = `GraphicsExtender.dashedPolyline` |
| pn §9 Q16 tag space | NG tags | pn CA-1/RA-1 (`Settings.resolve` fills missing slots from URL tags; `ring`, `small/large`, `leafy`); xa §2.6 `secular`; xb T19 multi-colour style params |
| pn §9 Q3 `buildRound`/`buildSquare` | NG square variants | xa §2.6 `[STATED]` rectangular open area = `buildSquare`; `buildRound` is the round plaza the base profile pass hit (V20) |
| pn §9 Q1 `isSmallEnough` law | stop predicate | **not resolved**; xb §5 `[STATED 70917627]` names the knobs a neighbourhood can vary: "minimum and maximum street widths, the average building and block size" — so the threshold is a per-neighbourhood *block size* parameter, form unknown |

## 3. Spot-checks of `[STATED]` claims against the cited source

Method: python substring search over the cited `post.md` (body + comments) or the recording file; 27 claims,
66 quoted phrases, **66 FOUND / 0 NOT FOUND**; 2 wording nits (S28, S29). Output: scratchpad `spot2.out`.

| # | claim (file §) | source | verdict |
|---|---|---|---|
| S1 | height map → gradient field → trackers → "density map" (vpa §3.1) | `watabou-village/35854256/post.md` | SUPPORTED, verbatim |
| S2 | `organic`: "Normally, they 'resist' the relief trying to stay straight" (vpa §3.1) | 71653886 | SUPPORTED |
| S3 | sizes 300/500/800; 0.7 m per unit; 350 × 350 m (vpa §3.16) | 84106820 comments | SUPPORTED |
| S4 | "Many trees = fill the whole map … Some trees = random patches … too close to cottages or roads are removed" (vpa §3.13.2) | 42521165 comments | SUPPORTED |
| S5 | "No more than one house … the field is discarded (not houses)" (vpa §3.10.4) | 57968729 | SUPPORTED |
| S6 | square = circle of a reasonable size, distorted a little; centrepiece tree or well; "Roughly half" (vpa §3.12, vnd A2.2) | 80494491 | SUPPORTED |
| S7 | "the water and the 'potential village area' are created independently" (vpa §3.8) | 36199609 creator reply | SUPPORTED |
| S8 | "relief follows rivers"; bridge angle "as right as possible" (vpb §2.4, §2.8) | 89314043 | SUPPORTED |
| S9 | domain warping of the density noise; trees away from houses; one road tag always selected (vpb §2.15, §2.19) | 88749133 | SUPPORTED |
| S10 | isohypse preference; spotlight at max density; merging "quite crude"; driveways "modern suburbia" (vpb §2.20–2.22, §2.29) | 104226049 | SUPPORTED |
| S11 | "unreasonably curvy"; density maps "generated very differently"; gates are regular houses; palisade = list of polylines (vpb §2.23, §2.25) | 105215836 | SUPPORTED |
| S12 | trees as concentric bands with vertical offset; estuary = river + bay; square aligns to highway (vpb §2.14, §2.7, §2.26) | 91692684 | SUPPORTED |
| S13 | Pressure, Hard Light, "1 and 0.999", selective outlining, lights from "a single continuous map" (vpb §2.32, §2.33) | 169696051 | SUPPORTED |
| S14 | towers "real buildings, not just props" (vpb §2.26) | 117634240 | SUPPORTED |
| S15 | "Recursive bisection with a twist" passage, "too slow and too unstable", "created from scratch" (vnd B2.1) | devlog 315495 | SUPPORTED |
| S16 | ring fallback "a square, a grove or a single large building" (vnd B2.3) | devlog 419786 | SUPPORTED |
| S17 | palisade shape "depends on the 'population density map'", radius larger in dense villages (vnd A2.9) | devlog 736720 | SUPPORTED |
| S18 | "about 300 or maybe 200 meters"; five tree colours (vnd A5) | devlog 613514 comments | SUPPORTED |
| S19 | bend "to start and end at the right angle to the edges"; "just an idea, not an algorithm" (xa §2.1) | `watabou-extra/49191011` | SUPPORTED |
| S20 | "still pretty glitchy, but it works"; ring rule; multi-colour params; "twisted bisection of polygons with holes" (xb T1, T2, T19) | 70917627 | SUPPORTED |
| S21 | "fake" gable roofs preferred; O(n²); "dehydrate" (xb T3, T5) | 101173551 | SUPPORTED |
| S22 | Square template "open rectangular area"; Street "a couple of blocks"; `secular` (xa §2.6) | 64375271 | SUPPORTED |
| S23 | tree coverage "rerolled without affecting the rest of a map" / Shift+T (vpa §3.13.2) | 50688261 | SUPPORTED |
| S24 | palisade "not supposed to be used with any kind of water"; "chance to leave some trees" (vpb §2.1, §2.25) | 104796798 | SUPPORTED |
| S25 | "fields are smaller in areas with higher population density" (vpa §3.10.4) | 57968729 | SUPPORTED |
| S26 | conifer shadow = "jagged triangle" instead of offset silhouette (vpb §2.17) | 91692684 | SUPPORTED |
| S27 | unlit roof "multiplying that single colour by the shadow colour"; "shapes along isolines" (vpa §3.15, §3.14) | 71653886 | SUPPORTED (see V14 for the measured multiplier) |
| P1 | three `VillageScene.hx:275` error strings (pv §3.2) | all VG `console.jsonl` | SUPPORTED: 3 × intersects itself, 2 × unfinished bridge, 1 × terminated by water |
| P2 | `grammar.json` 69 symbols, `JUCTION` typo, `special` list incl. `SHORE?-lighthouse` (pv §4.11) | `…05-04-05/coverage/network/bodies/0013-eda47b10.json` | SUPPORTED |
| P3 | `Hood.hx:42: <seed>: <tags>` format; ring retry lines 5 AC + 1 TA (7171) and 4 AC + 1 TA (7172) per load, none elsewhere (pn §0, RA-3) | all NG `console.jsonl` | SUPPORTED (9 AC + 2 TA per two-gen pass, 0 in the other 7 files) |
| P4 | NG `default.json` values `colorRoof ["#7F604C"]`, `varRoof 0.3`, `shadowAlpha 0.4`, `colorShadow #7A8499`, `colorAmbience #FFFFFF` (pn §3.6, §4.1) | `…05-04-54/coverage/network/bodies/0016-5c70e16a.json` | SUPPORTED |
| P5 | VG palette ≈ 40 keys; `shallowBands 3`, `shadowColor #9699AE`, weighted `roofLight`, `pressure 0.7`, `mergeRoads false` in minimal (pv §7.1) | `…05-04-05/coverage/network/bodies/0015-9e2ed09e.json`, `0015-f8cc82b3.json` | SUPPORTED (40 keys) |
| S28 | pn §4.1 "identical 27-key schema" | `default.json` | **WORDING**: 26 keys (the table has 26 rows) |
| S29 | pn §3.6 `shortStroke ÷ pierce` "= 13212/6604 = 2.0004" | `calls.json` | **WORDING**: 13 212 / 6 604 = 2.0006 (2.0006–2.035 across 10 runs; "exactly 2" is 2 ± 2 %) |

## 4. Re-derivations of recorded numbers from `calls.json` / `draw.json`

Script: scratchpad `rederive.py` → `rederive.out`. "Clean" VG runs = the 21 coverage runs whose per-run
identities close; the five gen-1..3 runs of `2026-09-25T10-19-31` and `2026-09-25T10-27-25` carry **partial
counts** (`dist2poly` 26–34 instead of 16 384, `Noise.fractal` 0, `Random.reset` 0, `warp ÷ step` 15–38) and
are excluded — see §6.

| # | claim | re-derived | reproduces? |
|---|---|---|---|
| 1 | pv §4.2/R2: `dist2poly = 128² × polylines`; `dist2segment2 ÷ 16 384` = 41 (gen-0), 36 (gen-3) | 16 384 × 1 in every river run, × 2 per confluence attempt (32 768; 65 536 for E = 2); ÷ 16 384 = 41, 36, 47, 107 (2 attempts), 51 (old build 3131), and 94 / 91 / 84 / 64 for seeds 3131–3134 on the new build | **yes** (old-build values); new build carries ≈ 2× more course segments |
| 2 | pv §4.6 / pn CA-4 / C2: `PoissonPattern.validate ÷ step = 50.000` | 50.000 in all 21 clean VG runs and 9/9 NG runs with a pattern; S2 (`small,street`) all zeros (C3 lazy) | **yes** |
| 3 | *(new)* VG `Bisector.makeCut = split = PointExtender.project` | equal in all 21 clean runs (22/41/46/28/27/15/12/14/27/17/23/48/23/32/29/28 …) | **yes** — the identity pv §4.7 omits (V4, V5) |
| 4 | pv §4.7: `Farmland.cut = Bisector.new = partition`; `getMinArea = subdivide`; `PolyBounds.obb = convexHull` | all three exact in all 21 clean runs | **yes** |
| 5 | pv R2: `Noise.get = a + b`, `Perlin.get = 5a + 6b` with `a = 16 384·E`; `Perlin.new = 5E + 6` | `a ÷ 16 384` = 1.000 (E = 1) or 2.000 (E = 2) in all 21 clean runs; `Perlin.new` 11 / 16 | **yes** |
| 6 | pn §3.2/CA-2/RA-2: `Block = Street + 1 − R`; `extend = 2·Street` (square 2S − 2); `detectStraight = makeCut − (Street − k)`; `project = Bisector.makeCut` | area 66/65, 64/63, 43/42, 62/61; square 104/104, 63/63; street 13/12, 5/4; ring 123/124 (R = 2), 105/107 (R = 3); extend 130/126/84/122/206/124/24/8/248/214; `project = makeCut` in 10/10 | **yes** |
| 7 | pn RA-2: `BisectorEx.makeCut = split + 1`, `subdivide = ExPolygon.area = 2N`, `not = 2N − R`, `new = 2S + not`, `split = ArrayExtender.find` | 123 = 122 + 1, 234 = 2·117, 232 = 234 − 2, 476 = 244 + 232, 122 = 122; R2: 109 = 108 + 1, 208, 205, 421, 108 | **yes** |
| 8 | pn RA-5: R road strokes of exactly 50 segments at one width per map; hatch triangles = `shortStroke` | draw gen-0: 124 road strokes, 2 × 50-seg at 6.556 px; gen-1: 107, 3 × 50-seg at 6.125 px; 3-seg `#222222` fills 23 101 / 21 739 = `shortStroke` | **yes** |
| 9 | pv §4.3: band widths `W·k^1.5` → 5.196 : 2.828 : 1 | 5.196/2.828/1 (gen-0), 5.196/2.828/1 (gen-1), 5.196/2.829/1 (gen-2) | **yes** |
| 10 | vpa §3.15 `[STATED]`: unlit roof = lit × shadow colour | the one clean lit/dark pair in `draw/gen-1`: ratios (0.621, 0.629, 0.708) vs `shadowColor/255` (0.588, 0.600, 0.682); `dark = lit × lerp(1, shadow, t)` closes with t = 0.92 ± 0.01 on all channels | **approximately** — 4–6 % lighter than a pure multiply; exact multiplier open (V14) |
| 11 | *(new)* `Elevation.g` vs tracker steps; `Random.reset` | `g` = 1–5 per village vs `Tracker.advance` 130–372; `Random.reset` = 6 per regeneration, 7 on cold load, in every clean run | new facts (V3, V23) |
| 12 | pn §4.1 27-key palette | 26 keys | **no** — wording (S28) |
| 13 | pn §3.6 `shortStroke ÷ pierce` ≈ 2 | 2.0006, 2.0155, 2.0119, 2.0111, 2.0153, 2.022, 2.0354, 2.0, 2.0202, 2.0123 | **yes to ±2 %** (S29) |
| 14 | pn RA-3 retry counts | console: 5 AC + 1 TA (7171), 4 AC + 1 TA (7172) in each of the 3 loads; 0 elsewhere | **yes** |

## 5. Critic-2 addenda written in this pass

Each is appended under the heading `## Critic-2 addendum (VG/NG seat, 2026-09-25)`; no existing text was edited.

| file | what the addendum records |
|---|---|
| `profile-village.md` | the build change 19251041 → 19365073 and the four uncited 2026-09-25 captures (V25), incl. which of their runs are partial; the `makeCut = split = PointExtender.project` identity (V4/V5); `Elevation.g` 1–5 vs tracker steps (V3); `Random.reset` = 6/7 (V23); the palisade construction reading (V12); the roof multiplier (V14); `warp` vs the stated domain warp (V15) |
| `profile-neighbourhood.md` | 26-key palette (S28); `shortStroke ÷ pierce` = 2.0006–2.035 (S29); the C13 consequence restated with the VG identity (V5) |
| `vg-posts-a.md` | §3.2 refuted (5-octave fBm, V7); §3.10 tiling (V4); §3.15 multiplier (V14); §3.21 POIs still console-only (§2) |
| `vg-posts-b.md` | §2.2 pond (V8), §2.3 river (V9), §2.4 mask (V2), §2.10 bands (V10), §2.20/2.21 merging & driveways confirmed view-side (V11), §2.22/2.23 no path search (V3), §2.25 palisade (V12), §2.15 warp (V15), §2.26 towers (V16), §6.17 metric (V17) |
| `vg-ng-devlogs.md` | A2.7 river direction, A2.6 numbered houses, A2.3 orchard modes, A2.2 tower centrepiece, A2.9 palisade, B2.2 lots, B2.1 corridor (§1, §2 rows) |

## 6. Remaining gaps and the single most valuable next measurement (VG, NG)

1. **VG: two builds, one findings set.** All of `profile-village.md` describes build 19251041. The 2026-09-25
   captures (build 19365073) were recorded for the river-course test (R2's block-coverage suggestion: seeds
   3131–3134 `river,isolated`) but have been read by no findings file; on that build `River.calculateCurvature`
   no longer executes, the course carries ≈ 2× the segments, `Forest.(anon@349301)` is gone and
   `Region.spawnAt`/`Building.a` run on every map. Their gen-1..3 coverage in `10-19-31` and `10-27-25` is partial
   (§4 preamble); `10-28-58` is the clean four-seed series and `10-14-02` a clean pair. Nothing in the corpus says
   which VG version 19365073 is (1.6.8 shipped 2026-09-17; no 1.6.9 post exists in the collection).
2. **VG: `Region.createDensity` form** — still the largest VG unknown (it fixes the heart, the packing, the
   palisade's "populated" set and the spotlight focus). It costs 0.6–1.1 ms and has no sampled children.
3. **VG: palisade** — hull-based construction recorded, but whether the 91 hulled points are building corners or a
   density-contour polyline, and how `getPopulated` selects, are open (V12). Only one palisade run exists
   (`05-04-05` gen-2) plus two confluence+palisade runs in `05-37-29`.
4. **VG: `PoissonPattern.warp` semantics** (V15), the `createDeflection` algorithm (pv §10 item 1), the per-band
   resampling of water strokes, the pond/round-vs-rectangular square split, pier suppression threshold.
5. **NG: bent-cut parameters** — bend position, endpoint-edge choice, stop predicate, street-width law, reject
   filter — unchanged after all sources (`_critic.md` §6 item 4); C13 is back to plain OPEN (V5).
6. **NG: `Settings.getInfo`, `assemble` (7 272 B), `findBuilding`, `getGreenTable`** never executed in 10 samples.
7. **NG: recorded builds.** All NG numbers are for itch build 11441280 (asset tag `?428900`, 2026-06-24); no
   later NG capture exists, and NG is formally superseded by Urban Places (xb T23–T25), for which there is no
   recording at all.

**Most valuable next measurement — VG:** one `coverage + draw` capture on the *new* build (19365073) over the
same four base tag sets (`river,no square,highway` / `dead end` / `no square,palisade,isolated` /
`river,isolated`) with a **precise block-coverage pass on `River.new`, `Region.createDensity` and
`Palisade.new`** (offset ranges from `coverage.json`, counts only). One recording re-stamps every VG identity on the
current build, settles the course generator (R2's H-R1 vs H-R3), bounds `createDensity`'s loop structure, and
decides whether the palisade hulls buildings or a contour.

**Most valuable next measurement — NG:** a **draw-recorder extension that stores vertex coordinates** for the road
strokes and lot outlines (today only segment counts are kept), replayed on one `area` seed and one `ring` seed.
That single change makes the bent-cut geometry measurable (bend position and angle per street, right-angle
arrival at both ends, the 5+-vertex party-wall test of CA-5, polar 7.5° ring sampling of RA-7) — the one
measurement that can close C13 and `_critic.md` §6 item 4 without reading code.
