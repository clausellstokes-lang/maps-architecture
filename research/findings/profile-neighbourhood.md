# profile-neighbourhood — extraction from the live Neighbourhood generator recording

Slice: `captures/neighbourhood/2026-09-21T05-04-54` (watabou, *Neighbourhood Generator*, itch build `11441280`, asset version tag `?428900`, `last-modified: Wed, 24 Jun 2026`).

**Evidence base.** Everything below derives from the recording only: `report.md` (3316 lines, read in full), `meta.json`, `coverage/gen-N.calls.json` (tool-resolved symbol→call-count tables), `coverage/gen-N.coverage.json` (Chrome precise-coverage: function *names*, byte ranges and counts — including functions that **never executed**), `draw/gen-N.draw.json` (9 410 / 20 973 / 10 675 / 15 686 canvas2d op records), `profile/gen-N.cpuprofile`, `*/console.jsonl`, `*/gen-N.idle.json`, the twelve `gen-N.png` screenshots (all viewed), and the **non-JavaScript network payloads** (`Assets/*.json` palettes, `Assets/grammar.json`, `Assets/words.txt`).

**Rule compliance.** No `captures/**/network/bodies/*.js` file was opened. `Neighbourhood.js` was never read. `coverage/gen-N.coverage.json` contains only function names, byte offsets and hit counts — no source text — and is treated as a recording artefact. The `Assets/*.json` and `words.txt` payloads are the generator's **data assets**, not code, and are quoted verbatim where load-bearing.

**Tagging.** There is no creator prose in this slice, so nothing here is `[STATED]` in the sense of "watabou explains the method". `[SHOWN]` = directly present in a recording or a captured data asset. `[INFERRED]` = my reconstruction, with the reasoning given. `[NAMED-ONLY]` = a symbol exists in the binary but never ran and nothing reveals its method.

---

## 0. Run inventory

`meta.json` — 3 passes × (1 cold load + 3 `Enter` regenerations), canvas fixed at **1500 × 1100** CSS px, one canvas, zero SVG nodes.

| pass | gen | how | wall ms | seed | tags | title drawn |
|---|---|---|---|---|---|---|
| profile | 0 | cold-load | 2567 | 1113219554 | medium, **square** | "Dusk Square" |
| profile | 1 | key:Enter | 1376 | 2021930855 | medium, **street** | "Wheat Street" |
| profile | 2 | key:Enter | 1428 | 490351217 | medium, **area** | "Little House" |
| profile | 3 | key:Enter | 1308 | 1720203006 | medium, **street** | "South Street" |
| coverage | 0 | cold-load | 2749 | 1113232540 | medium, area | "Goake's Green" |
| coverage | 1 | key:Enter | 1508 | 1917416504 | medium, area | "North Bank" |
| coverage | 2 | key:Enter | 1459 | 1481152594 | medium, area | "Meat Walk" |
| coverage | 3 | key:Enter | 1502 | 76965835 | medium, area | "Gany's Gate" |
| draw | 0 | cold-load | 2610 | 1113244956 | medium, area | "Smoke Well" |
| draw | 1 | key:Enter | 1354 | 1023197108 | medium, area, **leafy** | "Narrow Bridge" |
| draw | 2 | key:Enter | 1275 | 665320564 | medium, area, leafy | "Twin Row" |
| draw | 3 | key:Enter | 1324 | 874025314 | medium, area, leafy | "Ivy Gate" |

`[SHOWN]` The generator's only console output is its own stage trace, one line per generation, emitted from **`Source/com/watabou/neighbourhood/model/Hood.hx:42`**:

```
Source/com/watabou/neighbourhood/model/Hood.hx:42: 1113232540: medium, area
```

That single line is the entire instrumentation: `seed: tag, tag[, tag]`. It tells us the source tree is `Source/com/watabou/neighbourhood/...`, i.e. the same Haxe/OpenFL layout as TownGeneratorOS, and that the **seed and the tag list are the whole generation input**. URL state carries them (`?seed=1113219554&tags=medium%2Csquare`), so the generator is fully deterministic from (seed, tags).

`[SHOWN]` Tag vocabulary observed: **size** `medium`; **layout** `square`, `street`, `area`; **modifier** `leafy`. `Settings.oneOf` is called exactly 4× per generation and `Settings.randomTags` 1×, so **four independent tag slots are rolled** even though only two or three print. `Settings.processTags` is 2 511 bytes — the largest settings routine — and `Settings.resolve` / `Settings.getInfo` never ran `[NAMED-ONLY]`.

---

## 1. Class and method inventory, `com.watabou.*`

282 distinct `com.watabou.*` functions executed across the four coverage runs. Below, grouped by package, with per-gen call counts `[gen-0, gen-1, gen-2, gen-3]` (coverage pass, all four runs `medium,area`). Byte sizes come from the coverage ranges and are a useful proxy for algorithmic weight.

### 1.1 `com.watabou.neighbourhood.model` — the Hood model

| symbol | calls | bytes | note |
|---|---|---|---|
| `Hood.new` / `Hood.create` | 1,1,1,1 | 503 (`create`) | one hood per generation |
| `Hood.populate` | 1,1,1,1 | | fills every block with content |
| `Hood.bisectArea` | 1,1,1,1 | 313 | **one call** — produces the whole street/block partition |
| `Hood.getCloud` | 2,1,1,1 | 435 | hood outline generator |
| `Hood.getCircle` | 17,30,19,30 | 146 | |
| `Hood.getArc` | 17,30,19,30 | 236 | |
| `Hood.semiSmooth` | 65,63,42,61 | 795 | once per street |
| `Hood.getStreetWidth` | 65,63,42,61 | 197 | once per street |
| `Hood.getName` | 1,1,1,1 | 196 | |
| `Street.new` / `.getCourse` | 65,63,42,61 | 549 (`getCourse`) | |
| `Street.extend` | 130,126,84,122 | 422 | **exactly 2× streets** |
| `Block.new` | 66,64,43,62 | | **exactly streets + 1** |
| `Building.new` | 779,736,600,605 | | |
| `Building.buildSimple` | 1,7,0,2 | 1651 | |
| `Building.buildT` | 1,0,1,1 | 1785 | |
| `Building.buildCross` | 0,0,2,2 | 1976 | |
| `Building.buildLarge` | 2,7,3,5 | 263 | |
| `Building.addBeam` | 3,7,6,8 | 159 | |
| `Wing.new` | 787,751,615,626 | | building + 8..21 |
| `Wing.addChimney` | 23,16,13,22 | 993 | ≈3 % of wings |
| `Wing.addEntrance` | 2,7,3,5 | 489 | landmarks only |
| `Cupola.new` | 2,0,3,4 | | |
| `Pin.new` | 33,100,51,85 | | markers (trees, wells, fountains) |
| `Namer.reset / .get / .proper` | 1,1,1 | 407 / 78 / 117 | |
| `Namer.street / .square / .ring` | 0,0,0 | 80/80/78 | `[NAMED-ONLY]` in these runs |
| `Settings.processTags` | 1,1,1,1 | 2511 | |
| `Settings.randomTags / .oneOf` | 1 / 4 | 197 / 95 | |
| `Settings.resolve / .getInfo` | 0 | 236 / 601 | `[NAMED-ONLY]` |

**`model.content` (block content strategies)**

| symbol | calls | bytes |
|---|---|---|
| `BlockContent.new` | 66,64,44,63 | |
| `BlockContent.getPattern` | 29,31,11,36 | 139 |
| `BlockContent.getPointsLots` | 27,24,9,32 | 113 |
| `BlockContent.getPointsWhole` | 2,7,2,4 | 67 |
| `Normal.populate` | 64,56,39,55 | 961 |
| `Normal.indentFronts` | 64,56,39,55 | 384 |
| `Normal.validateLot` | 955,908,792,744 | 195 |
| `Normal.validateOuter` | 2225,2145,2066,1720 | 189 |
| `Normal.createGreen` | 27,24,9,32 | 402 |
| `Normal.getPointsInner` | 27,24,9,32 | 126 |
| `Normal.spawnInnerTrees` | 27,24,9,32 | 599 |
| `Normal.spawnPin` | 37,32,30,23 | 20 |
| `Manor.populate` | 2,7,4,6 | |
| `Manor.getRect / .shrink / .press` | 2,7,4,6 / same / 2,7,3,5 | 410 / 743 / 388 |
| `Manor.addGreen / .addGrove` | 2,7,2,4 | 238 / 447 |
| `Empty.populate / .addPin` | 0,1,1,2 / 0,1,0,2 | 845 (`addPin`) |
| `Empty.addGreen / .addGrove` | cold-load only | |

Content-class census per map: **Normal 64 / Manor 2 / Empty 0** (gen-0); 56 / 7 / 1; 39 / 4 / 1; 55 / 6 / 2. Sum = `BlockContent.new` exactly.

**`model.templates`** — `AreaHood.new/.createShape/.build` ran 1× each in the coverage pass; `SquareHood.new/.build/.buildRound/.getName` and `StreetHood.new/.build` appear in the profile-pass call trees. Never-executed template routines found in the coverage symbol table: **`buildSquare` (2425 B)**, **`buildRound` (1669 B)** (the latter *did* run in profile gen-0), **`createBlocks` (848 B)**, **`createRings` (781 B)**, **`createCenter` (740 B)**, `findBuilding` (547 B), `getGreenTable` (205 B). `[NAMED-ONLY]` — these imply at least `RingHood` and `CentralHood` templates plus a "blocks" variant that the `medium/square/street/area` tag set never selected.

### 1.2 `com.watabou.neighbourhood.utils`

| symbol | calls | bytes | role |
|---|---|---|---|
| `Bisector.partition` | 65,57,40,56 | 49 | entry point |
| `Bisector.subdivide` | 2717,2649,2704,2088 | 504 | recursion node |
| `Bisector.isSmallEnough` | 2717,2649,2704,2088 | 276 | **identical count to `subdivide`** |
| `Bisector.makeCut` | 1334,1299,1334,1021 | **2938** | the heart of the generator |
| `Bisector.split` | 1334,1299,1334,1021 | 1107 | |
| `Bisector.detectStraight` | 1269,1236,1292,960 | 135 | **= `makeCut` − streets, exactly** |
| `GraphUtils.shortStroke` | 13212,13274,11800,12728 | 211 | one hatch mark |
| `GraphUtils.longStroke` | 0 | 624 | `[NAMED-ONLY]` |
| `GraphUtils.attackDecay0` | 0 | 65 | `[NAMED-ONLY]` — envelope shaping |
| `Offsetter.run / .runEq / .filter` | 27,24,9,32 | 1261 / 80 / 432 | polygon offsetting |
| `PolyUtils.containsShape` | 28,98,43,71 | 369 | |
| `PolyUtils.res / .resClosed` | 55,54,19,67 | 325 / 64 | resample |
| `PolyUtils.randClosed` | 27,24,9,32 | 314 | |
| `PolyUtils.rand / .randInner` | 0 | 348 / 342 | `[NAMED-ONLY]` |
| `Rect.ofPoly` | 777,729,597,600 | 39 | min-area rect of a lot |
| `Rect.getRidge` | 805,759,619,635 | 153 | roof ridge segment |
| `Rect.swapAxes` | 286,213,238,208 | 96 | flips ridge direction (≈36 % of wings) |
| `Rect.sub / .cap / .beam` | 24 / 15 / 3 max | 285 / 102 / 59 | compound-plan helpers |

### 1.3 `com.watabou.neighbourhood.visuals`

| symbol | calls | bytes |
|---|---|---|
| `HoodView.new` | 1 | |
| `HoodView.setViewport` | 2,1,1,1 | 1217 |
| `HoodView.placeTree` | 33,99,51,83 | 99 |
| `HoodView.setShadows / .updateShadows` | 1 | 162 / 204 |
| `BuildingView.draw` | 779,736,600,605 | 631 |
| `BuildingView.drawWing` | 787,751,615,626 | 652 |
| `BuildingView.hatchRoof` | 780,736,603,608 | 1056 |
| `BuildingView.drawChimney` | 779,736,600,605 | 254 |
| `BuildingView.getDark` | 782,743,606,614 | 74 |
| `BuildingView.drawPyramid` | 2,0,1,4 | 2801 |
| `BuildingView.drawDome` | 0,0,2,0 | 865 |
| `BuildingView.drawDormers / .drawDormer` | 0,7,0,2 / 0,18,0,8 | 1114 / 868 |
| `BuildingView.drawTip` | 2,0,3,4 | 182 |
| `BuildingView.drawEntrance` | 2,7,3,5 | 115 |
| `BuildingView.drawCone` | 0 | 1152 — `[NAMED-ONLY]` |
| `ShadowLayer.new` | 1 | |
| `ShadowLayer.drawPrismShadow` | 785,750,614,624 | 353 |
| `Roads.new / .setMode / .drawFull / .drawSolid` | 1 each | 356 / 139 / 499 |
| `Tree.new` | 33,100,51,84 | |
| `Tree.bloat` | 663,1927,1057,1907 | 237 |
| `Tree.doBloat` | 168,476,267,486 | 81 |
| `Tree.drawShaded` | 102,276,165,318 | 282 |
| `Tree.drawShadow` | 33,100,51,84 | 257 |
| `Tree.fromPin` | 0..1 | 88 |
| `WellView.(anon)` | 163,0,0,0 | |
| `FountainView.new / .fromPin / .drawShadow` | 0,0,0,1 | |

### 1.4 Shared library (also present in MFCG/VG — see §8)

`com.watabou.geom`: `GeomUtils.{intersectLines, lerp, converge}`, `Color.{rgbf, rgbfSafe, scale, multiply, lerp}` (+ never-run `hsv, rgb2hsv, lerpHSV, lerpHue, dist`), `Chaikin.render`, `Circle.new`, `PoissonPattern.{new, step, emit, warp, validate, fill}`, `FillablePoly.{new, validate, validateRect, getBounds}`, `FillableMultiPoly.{new, validate}`.
`com.watabou.geom.polygons`: `PolyBool.{and, augmentPolygons}`, `PolyBounds.{convexHull, obb, containsPoint, aabb, rect}` (+ never-run `circle`), `PolyCore.{area, center, centroid, $length}`, `PolyCreate.{rect, stripe, regular}`, `PolyCut.{cut, pierce, enlarge}` (+ never-run `shrink, peel, shrinkEq`), `PolyTransform.{asRotateYX, asScale, asTranslate, rotateYX, scale, translate}`.
`com.watabou.utils`: `ArrayExtender` (15 methods, 6 unused: `shuffle, max, find, some, removeAll, subset`), `GraphicsExtender.{drawPolygon, drawPolygonAt, drawPolyline}` (+ never-run `dashedPolyline, drawPolygonRotated`), `MathUtils.gate` (+ `gatei`), `Palette.weighted` (+ never-run `fromData, fromJSON, font2format, float2str`), `PointExtender.{project, set}`, `Random.{new, float, save, restore, reset}`, `Updater`.
`com.watabou.coogee`: `Game`, `Scene`, `ui.UI` (6 of 8 methods unused: `getRect, showMenuAt, findForm, showDialog, showMenu, showToast`), `ui.UIStyle`, `ui.View`, `ui.utils.Text`.
`com.watabou.tracery`: `Grammar`, `RuleSet`, `Symbol`, `ExtSymbol`, `TraceryNode`, `Tracery`, `RuleSelector`, `DeckRuleSelector`, `ModsEngBasic` (20 modifiers, 16 unused).
`com.watabou.nlp`: `Markov.{new, split, generate}`, `Syllables.{splitWord, pinch}`.
`com.watabou.system.State`, `com.watabou.neighbourhood.URLState`.

### 1.5 Never-executed UI surface `[NAMED-ONLY]`

`setRoads` (95 B), `toggleTrees` (143), `togglePins` (138), `toggleChimneys` (133), `toggleGreens` (122), `toggleShadows` (87), `toggleRoads` (46), `feelLucky` (56), `loadPalette` (1006), `getPalette` (716). **This is the authoritative list of the generator's toggleable layers**: roads, greens, trees, pins, chimneys, shadows — exactly the layer decomposition the draw record shows (§4).

---

## 2. Reconstructed pipeline

`[SHOWN]` from the profile call trees (`report.md` lines 2336-2385, 2636-2712, 2963-3040, 3284-3317) plus the exact arithmetic in §3:

```
ApplicationMain.start
└ com.watabou.neighbourhood.Main.new
  └ coogee.Game.new → switchScene → Main.switchSceneImp → Game.switchSceneImp
    └ scenes.MapScene.activate → restoreHood → MapScene.reset          ← Enter re-enters here
       ├ Hood.create                                    (MODEL)
       │  └ templates.{Area|Street|Square}Hood.new
       │     └ Hood.new
       │        ├ <template>.createShape                — hood outline
       │        ├ <template>.build                      — street/block layout
       │        │  └ Hood.bisectArea → Bisector.partition → subdivide* → makeCut → split
       │        ├ Hood.populate                         — per-block content
       │        │  ├ content.Normal.new → BlockContent.new → Normal.populate
       │        │  │   ├ Bisector.partition → subdivide* → makeCut      (lot subdivision)
       │        │  │   ├ Normal.indentFronts → PolyBool.and             (street setback)
       │        │  │   ├ Normal.validateOuter / validateLot             (lot filters)
       │        │  │   ├ Normal.createGreen → Offsetter.runEq           (courtyard green)
       │        │  │   ├ Normal.spawnInnerTrees → getPointsInner
       │        │  │   │     → BlockContent.getPointsLots → PoissonPattern.fill
       │        │  │   └ Building.new → Rect.ofPoly → Wing(s)
       │        │  ├ content.Manor.new → Manor.populate
       │        │  │   ├ getRect / shrink / press                       — walled compound
       │        │  │   └ addGreen → addGrove → getPointsWhole → getPattern → PoissonPattern
       │        │  └ content.Empty.new → populate → addGreen → addGrove
       │        └ <template>.getName → Namer.{square|street|ring|proper} → tracery/Markov
       ├ MapScene.updateView                            (VIEW)
       │  └ visuals.HoodView.new
       │     ├ Roads.setMode → drawFull → drawSolid → Street.getCourse → Street.extend
       │     ├ BuildingView.draw → drawWing → hatchRoof → GraphUtils.shortStroke
       │     │                              → PolyCut.pierce / PolyCut.cut
       │     │                  → drawChimney / drawPyramid / drawDome / drawDormers / drawTip
       │     ├ HoodView.placeTree → Tree.new → doBloat → bloat → drawShaded / drawShadow
       │     └ HoodView.setShadows → updateShadows → ShadowLayer.new → drawPrismShadow
       └ MapScene.layout → layoutTitle → TextField.__getBounds
```

`[SHOWN]` Regeneration is `Stage.__onLimeKeyDown → Scene.onKeyDown → msignal.Signal2 → MapScene.onKey → MapScene.reset`. **The whole model and the whole view are rebuilt from scratch on every Enter** — there is no incremental update path. `URLState.update/set` (3× and 2× per gen) rewrites the address bar (`replaceState` appears in the profile at 0.4 ms).

---

## 3. Technique extraction

### 3.1 Hood outline — "cloud" of circles and arcs

`[SHOWN]` Per generation: `Hood.getCloud` 1–2×, `Hood.getCircle` = `Hood.getArc` = `com.watabou.geom.Circle.new` = **17, 30, 19, 30**. `AreaHood.createShape` is 1434 B.

`[SHOWN]` Screenshots: the *area* maps ("Goake's Green", coverage gen-0) have a D-shape — one straight chord plus a lumpy arc; "North Bank" is a rounded lozenge; "Little House" a rounded polygon with concave notches; "Ivy Gate" a crescent. The *street* maps ("Wheat Street", "South Street") are long spindles. The *square* map ("Dusk Square") is a disc with a round plaza at its centre.

`[INFERRED]` The hood boundary is built as a **union of 17–30 circles whose boundaries are taken as arcs** (`getCircle` produces the circle, `getArc` the retained arc of it) — i.e. a metaball/"cloud" silhouette in the style of MFCG's city outline, then resampled. `getCircle` and `getArc` have identical counts in all four runs, so they are called in lockstep, one arc per circle. Reasoning: the counts are equal and small, the outlines in the screenshots are unmistakably composed of tangent circular lobes, and the routine is literally named `getCloud`.
*Unknown:* how overlapping arcs are stitched (boolean union vs. sorted-angle walk); how the straight chord in "Goake's Green" is produced (a clipping half-plane, presumably, since a hood is notionally a slice of a larger city).

### 3.2 Street network = recursive bisection of the hood area — **exactly verified**

This is the single most important structural result in the slice, and it is arithmetic, not inference.

`[SHOWN]` In all four coverage runs:

| quantity | gen-0 | gen-1 | gen-2 | gen-3 |
|---|---|---|---|---|
| `Street.new` = `Street.getCourse` = `Hood.getStreetWidth` = `Hood.semiSmooth` = `PolyCreate.stripe` = `GraphicsExtender.drawPolyline` | 65 | 63 | 42 | 61 |
| `Block.new` | **66** | **64** | **43** | **62** |
| `Street.extend` | 130 | 126 | 84 | 122 |
| `Bisector.partition` | 65 | 57 | 40 | 56 |
| `Normal.populate` (= Normal blocks) | 64 | 56 | 39 | 55 |
| `Bisector.makeCut` = `Bisector.split` = `PointExtender.project` | 1334 | 1299 | 1334 | 1021 |
| `Bisector.detectStraight` | 1269 | 1236 | 1292 | 960 |
| `Bisector.subdivide` = `Bisector.isSmallEnough` | 2717 | 2649 | 2704 | 2088 |

Four exact identities hold in **every** run:

1. **`Block.new = Street.new + 1`.** A planar subdivision produced by S successive cuts of a simply-connected region has S+1 faces. Each street *is* one cut; each cut creates exactly one new block.
2. **`Street.extend = 2 × Street.new`.** Every street is extended at both ends.
3. **`Bisector.partition = Normal blocks + 1`.** One partition for the whole hood area (`Hood.bisectArea`, called exactly once), plus one per `Normal` block. `Manor` and `Empty` blocks are never partitioned.
4. **`detectStraight = makeCut − Street.new`** (1334−65=1269; 1299−63=1236; 1334−42=1292; 1021−61=960). The 65/63/42/61 *street-level* cuts skip `detectStraight`; every *lot-level* cut runs it.

`[SHOWN]` `makeCut = split = PointExtender.project` exactly: one cut produces exactly one projection and one split.
`[SHOWN]` `subdivide = isSmallEnough` exactly: the first act of `subdivide` is the termination test.
`[SHOWN]` `subdivide ≈ 2·makeCut + partition`, with a small deficit (2733 vs 2717; 2655 vs 2649; 2708 vs 2704; 2098 vs 2088). A perfect binary recursion would give equality; the 4–16 missing nodes mean a handful of cuts yield only one usable child.

`[INFERRED] Bisector algorithm.` Recursive binary subdivision of a convex-ish polygon:
```
partition(poly, params):            # 49 B — a thin wrapper
    subdivide(poly, ...)

subdivide(poly, ...):               # 504 B
    if isSmallEnough(poly): emit leaf; return          # 276 B
    cut = makeCut(poly, ...)                           # 2938 B  ← all the judgement
    a, b = split(poly, cut)                            # 1107 B
    subdivide(a); subdivide(b)

makeCut(poly, allowStraight):
    hull = PolyBounds.convexHull(poly)                 # 676 B
    obb  = PolyBounds.obb(hull)                        # 447 B — rotating calipers
    axis = long axis of obb                            # cut ⟂ long axis → compact children
    if allowStraight:  detectStraight(poly)            # 135 B — snap the cut to an existing edge dir
    t = position along the axis  (randomised, gated by MathUtils.gate)
    p = PointExtender.project(centre, axis, t)         # exactly one per cut
    return line through p ⟂ axis (or along the detected straight direction)
```
Supporting counts: `PolyBounds.obb = PolyBounds.convexHull` exactly (3083/2954/2719/2399) — `obb` computes the hull then calipers; the ratio obb : makeCut is 2.31 / 2.27 / 2.04 / 2.35, so roughly **two OBBs per cut** (plus the 777/729/597/600 from `Rect.ofPoly`). `MathUtils.gate` = 2436/2508/1959/2067 ≈ 1.8 × makeCut — the split parameter is clamped. `ArrayExtender.revert` = 1529/1488/1460/1204 ≈ 1.15 × makeCut — polygon winding is reversed after splitting.

`[INFERRED]` `detectStraight` (135 B, so a short test) finds whether the polygon has a long straight run of collinear edges — the **street frontage** — and forces the cut to be *perpendicular to it*, so lot boundaries meet the street at right angles. This is why it is enabled for lots and disabled for the hood-level cuts (a street should be free to run at any angle). The screenshots corroborate: within a block, party walls are uniformly perpendicular to the street, giving the terraced-row look; between blocks, streets run at arbitrary angles.

`[INFERRED]` `isSmallEnough` (276 B) tests area and/or the OBB's minor dimension against a target derived from the tag set (`medium`) — this is the single knob that controls building density. Evidence: the recursion depth varies (call trees show 5–8 nested `subdivide` frames for streets, 3–5 for lots) and the lot count per block is ~20.

`[SHOWN]` **Streets are then given a course and a width.** `Street.getCourse` (549 B) is called once per street and internally calls `Street.extend` twice; `extend` uses `GeomUtils.intersectLines` (1.7 ms of 3.5 ms in the gen-2 profile). `Hood.semiSmooth` (795 B) and `Hood.getStreetWidth` (197 B) are also 1:1 with streets.

`[INFERRED]` The cut line is an infinite line; `split` clips it to the block being cut, giving a chord. `Street.extend` then pushes each endpoint outward until it hits the next street or the hood boundary (`intersectLines` dominates its cost), which is what makes streets run through multiple blocks instead of stopping at every junction — the visible long through-streets in "Wheat Street" and "South Street". `Hood.semiSmooth` then perturbs the polyline into a gentle curve (the palette has a `roadTwisting` boolean; `default.json` sets it `false`, `night.json` and `warm.json` set it `true`).

`[SHOWN]` `PolyCreate.stripe` (748 B) is called exactly once per street, in the model, and is never used by the road *renderer* (which strokes a polyline). `[INFERRED]` `stripe(polyline, width)` builds the **road corridor polygon**, which is subtracted from / used to inset the adjacent blocks so that buildings stand back from the carriageway. `Normal.indentFronts` (`PolyBool.and`, 874/801/650/680 calls) is the block-side half of that operation.

*Unknown:* the distribution `getStreetWidth` draws from (observed rendered widths span 4.55–11.45 px across runs, but that is after the view scale); whether `semiSmooth` is Chaikin, a spline, or a midpoint displacement — `Chaikin.render`'s count matches greens, not streets, so **streets do not use Chaikin**.

### 3.3 Block content dispatch

`[SHOWN]` Per map: `Normal` 64/56/39/55, `Manor` 2/7/4/6, `Empty` 0/1/1/2. `ArrayExtender.weighted` 36/109/57/93 and `ArrayExtender.random` 189/122/132/137.
`[INFERRED]` Block content is chosen by weighted random with `Normal` overwhelmingly dominant (≈88–90 %), `Manor` ≈6–11 %, `Empty` ≈0–3 %. Manors are visibly placed on larger blocks and often at the map edge (screenshots: the walled compounds in "South Street" at the SW tip, "Wheat Street" at both ends, "Gany's Gate" at three corners), so the weight is probably conditioned on block area.

### 3.4 Lot subdivision, setback and validation

`[SHOWN]` `Normal.populate` (961 B) → `Bisector.partition` → ~20 lots per block → `indentFronts` (384 B, `PolyBool.and`) → `validateOuter` (189 B, 2225/2145/2066/1720 calls ≈ 2.9 × `validateLot`) → `validateLot` (195 B, 955/908/792/744) → `Building.new` (779/736/600/605).
`[SHOWN]` Leaves of the lot recursion ≈ `makeCut − streets + Normal blocks` = 1269+64 = **1333** (gen-0); buildings 779 → **58 % of lots receive a building**.
`[SHOWN]` `PolyBool.and` = 874/801/650/680 ≈ 1.1 × buildings; `PolyBool.augmentPolygons` has the same count (the classic "walk both polygons inserting intersection vertices" prologue to a boolean op) and costs 2.3 ms self in gen-2 — the second-most expensive geometry routine after `intersectLines`.

`[INFERRED]` `indentFronts` insets each lot's street-facing edge(s) by a setback, implemented as `lot ∩ (block inset by the road stripe)`. `validateOuter` runs ~3× per accepted lot and is the "does this lot still touch a street?" test — lots that lose their frontage after the setback are discarded, which is exactly why ~42 % of lots end up empty and why the screenshots show hollow block interiors rather than densely packed cores.

`[SHOWN]` Screenshots confirm **perimeter-block development**: buildings ring the block along the street; the interior is either background-coloured (empty courtyard) or a green. This is the defining visual signature of Neighbourhood versus MFCG.

### 3.5 Buildings, wings, ridges

`[SHOWN]` `Building.new` 779, `Wing.new` 787 → the overwhelming majority of buildings are **a single wing**. Compound plans are rare: `buildSimple` 1/7/0/2, `buildT` 1/0/1/1, `buildCross` 0/0/2/2, `buildLarge` 2/7/3/5, `addBeam` 3/7/6/8.
`[SHOWN]` `Rect.ofPoly` 777/729/597/600 ≈ buildings — each building footprint is reduced to an **oriented rectangle** derived from the lot (`ofPoly` is only 39 B, so it delegates to `PolyBounds.obb`).
`[SHOWN]` `Rect.getRidge` 805/759/619/635 ≈ wings + ~20; `Rect.swapAxes` 286/213/238/208 ≈ **36 % of wings** have their ridge axis flipped.
`[SHOWN]` `Rect.sub` 24 max, `Rect.cap` 15 max, `Rect.beam` 3 max — helpers for the compound plans only.

`[INFERRED]` Building model: `lot → PolyBounds.obb → Rect`. A `Rect` carries a length axis; `getRidge` returns the ridge segment down its long axis; `swapAxes` re-rolls which axis carries the ridge (so ~1/3 of houses present their gable to the street instead of their eaves). Landmarks (a handful per map) call `buildT`/`buildCross`/`buildLarge`, which compose several `Rect`s via `addBeam`/`sub`/`cap` into T, cross and courtyard plans. Screenshot corroboration: the cross-plan hall inside the Manor compound in "Twin Row" (≈1020, 665) and "Gany's Gate" (three of them).

### 3.6 Roof rendering, shading and hatching — fully characterised from the draw record

`[SHOWN]` The exact per-wing op sequence on the buildings canvas (`draw/gen-0.draw.json`, canvas `988x993`):

```
fill   <roof-light>  segs 5|6|7|8       ← lit roof face(s)
fill   <roof-dark>   segs 5|6           ← shaded roof face(s)
stroke #222222 w1    segs 6|7           ← footprint outline + ridge (one path, two subpaths)
stroke #222222 w1    segs 0             ← path terminator
fill   #222222       segs 3   × N       ← N tapered hatch triangles
```

`[SHOWN]` **Every single `#222222` fill in the buildings layer has exactly 3 path segments** — 5150 / 11330 / 5959 / 8446 of them, with no exceptions. Three segments = `moveTo` + 2 × `lineTo` = a triangle.
`[SHOWN]` Hatch marks per wing: mean 17.4 / 17.2 / 18.9 / 17.1; median 16–18; min 6–8; max 34–63. The histogram is dominated by **even values** (gen-0: `{8:2, 10:11, 12:24, 14:48, 16:57, 18:63, 20:41, 22:28, 24:12, 26:4, 34:2, 36:1, 42:1, 44:1}` — odd counts appear only 4–8 times per map, on the pyramid/dome/hip roofs).
`[SHOWN]` `GraphUtils.shortStroke` ÷ `PolyCut.pierce` = 13212/6604 = **2.0004**, 13274/6586 = 2.015, 11800/5865 = 2.012, 12728/6329 = 2.011.
`[SHOWN]` `shortStroke` ÷ `BuildingView.drawWing` = 16.8 / 17.7 / 19.2 / 20.3 — matches the drawn hatch count.
`[SHOWN]` `PolyCut.cut` = `hatchRoof` exactly (780/736/603/608).

`[INFERRED] hatchRoof algorithm.`
```
hatchRoof(roofPolygon, ridge):
    PolyCut.cut(roofPolygon, ridge)                    # exactly 1 per roof: split into two slopes
    for each hatch line i (spaced along the ridge):
        chord = PolyCut.pierce(slope, line_i)          # ~8.5 per roof
        GraphUtils.shortStroke(chord.a, chord.mid)     # exactly 2 per pierce
        GraphUtils.shortStroke(chord.mid, chord.b)
```
Each `shortStroke` emits **one filled triangle** in `colorOutline` — a stroke that is wide at one end and comes to a point, i.e. a pen stroke with an attack/decay profile. The never-executed siblings `longStroke` (624 B) and `attackDecay0` (65 B) confirm the envelope vocabulary. Drawing hatching as *filled tapered triangles* rather than strokes is what gives Neighbourhood's roofs their hand-inked texture at any zoom, and it is why 55–80 % of every draw call budget is spent on 3-segment fills.

`[SHOWN] Roof colour model — measured, not guessed.` Across 1742 lit-roof fills in the four draw runs, with `colorRoof = ["#7F604C"]` and `varRoof = "0.3"` from `Assets/default.json`:

| statistic | value |
|---|---|
| hue of lit roof | mean 0.0654, **sd 0.0012** (quantisation only) |
| saturation | mean 0.4031, **sd 0.0026** |
| value (HSV V) | mean 0.4988, sd 0.0345 |
| R/base, G/base, B/base | all mean ≈1.000, sd ≈0.069, identical to 4 d.p. |
| uniform scale factor k | mean 1.000, **sd 0.069**, range 0.79 – 1.22, bell-shaped |

`[INFERRED]` Roof colour = `Color.scale(Palette.weighted(colorRoof), k)` — a **pure RGB multiply**, which is why H and S are invariant. Counts agree exactly: `Palette.weighted` (812/836/651/689) = `Color.scale` (812/836/653/689) = one pick + one scale per wing. The distribution of `k` is Gaussian-ish with sd 0.069; `varRoof × 0.2357 = 0.3 × 0.2357 = 0.0707`, and 0.2357 = √(6/12)/3 is the standard deviation of `(u₁+…+u₆−3)/3`. So **k = 1 + varRoof · N**, where `N` is a 6-uniform pseudo-normal. (A single uniform would give sd 0.173; a triangular would give 0.122. Neither fits.)

`[SHOWN] Roof shading — measured.` dark ÷ light, per channel, over 658 cleanly-paired wings in gen-1 (sd 0.011–0.012, i.e. essentially exact):

```
R: 0.7873   G: 0.8015   B: 0.8336
```
`[INFERRED]` `getDark` is 74 bytes — one expression. `Color.multiply` is called 815/843/657/699 ≈ once per wing. The multiplier ≈ `(201, 204, 213)/255 = #C9CCD5`. Now compute `lerp(colorAmbience #FFFFFF, colorShadow #7A8499, t)`:
* t = 0.40 → (201.8, 205.8, 214.2)/255 = (0.7914, 0.8071, 0.8400)
* t = 0.41 → (200.5, 204.6, 213.2)/255 = (0.7863, 0.8024, 0.8361)

The palette's `shadowAlpha` is `"0.4"`. So **`getDark(c) = Color.multiply(c, Color.lerp(colorAmbience, colorShadow, shadowAlpha))`** reproduces the measurement to within 0.5 %. The shaded roof face is literally the lit face seen under the shadow's ambient mix. The residual 0.5 % may be an extra constant or a slightly different `t`; the measured triple above is authoritative.

`[SHOWN]` Roof-face polygon sizes (segments, = vertices + 1): 4-gon 146/333/137/253, 5-gon 116/247/128/192, 6-gon 25/52/34/34, 7-gon 5/17/11/8, 8-gon 1/5/4/3, 9-gon 1/4/0/1. The outline stroke is 6 segments for a simple gable (rectangle 4 pts + ridge 2 pts, two subpaths) and 7 for a hip.

`[SHOWN]` Special roofs are rare: `drawPyramid` (2801 B) 2/0/1/4, `drawDome` (865 B) 0/0/2/0, `drawDormers`→`drawDormer` (1114/868 B) 0/7/0/2 → 0/18/0/8 dormers (≈2.6 per dormered building), `drawTip` (182 B) 2/0/3/4 = `Cupola.new`, `drawEntrance` (115 B) 2/7/3/5, `drawCone` (1152 B) never `[NAMED-ONLY]`.
`[SHOWN]` `drawChimney` runs once per **building** (779/736/600/605) but `Wing.addChimney` only 23/16/13/22 → the draw call is unconditional and returns early; **≈3 % of wings have a chimney**.

`[SHOWN]` `PolyTransform.asRotateYX` 3112/2980/2738/2429 ≈ 4 × buildings. `[INFERRED]` Roof geometry is computed in the wing's local frame (ridge along +X) and rotated back — two rotations out, two back, per building.

### 3.7 Shadows — a translate-and-overdraw prism

`[SHOWN]` `ShadowLayer.drawPrismShadow` 785/750/614/624 ≈ `Wing.new` (787/751/615/626) → **one call per wing**.
`[SHOWN]` `PolyTransform.translate` 762/738/594/604 ≈ wings → **one polygon translation per wing**.
`[SHOWN]` The shadow canvas is painted entirely in one flat colour `#7a8499` (= `colorShadow`), `lineWidth 1`, `lineJoin/lineCap round`. Op census (gen-0 / gen-1 / gen-2 / gen-3): **quad fills (5 segs) 690 / 1533 / 765 / 1136**, plus **blob fills (121–181 segs) 39 / 127 / 53 / 95**, plus strokes of 5 segs (same count as the quad fills), 1 seg, and 0 seg.
`[SHOWN]` **Quad fills per wing = 2.33 / 2.33 / 2.43 / 2.31** — remarkably stable across all four runs (wing counts 296 / 658 / 315 / 492, taken as non-dark fills ÷ 2 and cross-checked against hatch marks ÷ 17.4).
`[SHOWN]` The blob-fill segment histogram is **bit-for-bit identical** to the tree crown histogram (`{121:5, 125:2, 129:9, 133:6, 135:1, 137:27, 141:14, 145:68, 147:1, 149:12, 153:52, 157:17, 161:40, 163:1, 165:12, 169:23, 173:7, 177:11, 181:6}`), and the counts match exactly: 314 trees, 314 tree shadows.

`[INFERRED]` The shadow layer is a single `Sprite` whose `alpha = shadowAlpha` (0.4). Within it, everything is drawn in flat `colorShadow`, so compositing applies the transparency once for the whole layer instead of per shape — which is why the raw colour appears opaque in the draw record while the screenshots show soft grey offsets. `drawPrismShadow(footprint)` translates the footprint **once** by `shadowLength × height` along `shadowDir` (30° in `default.json`) and then emits **one quad per silhouette edge** — the swept face of the extruded prism — `quad(p[i], p[i+1], p'[i+1], p'[i])`. For a convex n-gon roughly n/2 edges are silhouette edges: a rectangle gives 2, a 5- or 6-gon gives 2–3. The roof-face polygons are 4-gons 55–62 %, 5-gons 30–33 %, 6-gons 5–9 %, so the expected mean is ≈2.3 — exactly the measured 2.31–2.43. No silhouette hull, no boolean union: the building body is later drawn opaque on top, so the overlap self-hides. The accompanying same-colour 1 px stroke of the identical path dilates each quad by ½ px to kill seams between adjacent quads. Tree shadows are the **exact same crown polygon**, translated.
*Unknown:* whether a wing's height is stored or derived from its footprint; how the 1-segment strokes in the shadow layer arise (they are ~18 % of the strokes); the exact silhouette-edge test (dot product of edge normal with the light vector is the obvious candidate).

### 3.8 Greens, groves and the shared Poisson field

`[SHOWN]` Exact identities per map:
```
Normal.createGreen = Offsetter.run = Offsetter.runEq = Offsetter.filter
                   = FillableMultiPoly.new = BlockContent.getPointsLots
                   = Normal.getPointsInner = Normal.spawnInnerTrees
                   = PolyUtils.randClosed                    = 27 / 24 /  9 / 32

Chaikin.render = FillablePoly.new = BlockContent.getPattern = PoissonPattern.fill
                                                             = 29 / 31 / 11 / 36
                = greens (27/24/9/32) + Manor groves (2/7/2/4)      ✔ exact in all four runs
```
`[SHOWN]` `PoissonPattern.new` is called **exactly once per generation**, while `fill` is called 29/31/11/36×. `step` 128/122/129/125; `emit` 80/81/82/78; `warp` = `validate` = **6400 / 6100 / 6450 / 6250**.
`[SHOWN]` `warp ÷ emit` = 80.0 / 75.3 / 78.7 / 80.1. `step ÷ emit` = 1.60 / 1.51 / 1.57 / 1.60.
`[SHOWN]` `PolyBounds.containsPoint` 25845/26650/17277/23445; `FillableMultiPoly.validate` 3680/3807/1558/3978; `FillablePoly.validate` 480/972/410/858.
`[SHOWN]` Rendered greens: 8 / 36 / 18 / 29 fill blocks in flat `#a5a584` (= `colorGreen`, **no variation at all**), with 39–137 segments each (mean 81.5 / 61.2 / 61.1 / 62.9).

`[INFERRED] The Poisson field is global and shared.` `new` once, `fill` many times, and `warp`/`validate` counts that are nearly constant (6100–6450) and *independent of how many greens the map has*, mean the generator builds **one blue-noise point field over the whole hood up front** and then, for each green or grove, clips that field to the polygon. `warp == validate` exactly (one validity test per candidate) and ≈6400 ≈ 80² suggests a **warped lattice**: start from a regular 80 × 80 grid, `warp` each site by a jitter/curl, `validate` the minimum-distance constraint, `emit` the survivors (~80 per step, 128 steps). This is *not* textbook Bridson dart-throwing (which would show `validate ≫ emit` with a k≈30 ratio and a growing active list); it is closer to a jittered-grid / relaxation scheme. The payoff is that tree spacing is globally consistent and that filling N polygons costs N point-in-polygon sweeps instead of N independent samplings.
*Unknown:* the exact lattice size and warp function; whether `step` is a relaxation iteration or a row of the lattice.

`[INFERRED] Green shape.` `Normal.createGreen` → `Offsetter.runEq` (equal-distance polygon offsetting, 1261 B for `run`, 432 B for `filter`) insets the block's *inner* boundary (the part with no street frontage) → `Chaikin.render` (811 B) smooths the result → `FillablePoly`/`FillableMultiPoly` rasterise it. `Offsetter.filter` removes the self-intersection artefacts that naive offsetting produces at reflex corners — that is the classic failure mode and this is the handler. The resulting outlines carry 39–137 points, consistent with Chaikin's corner-cutting applied 2–3 times to a ~15-point inset polygon.
`[SHOWN]` 27 of 64 `Normal` blocks (42 %) get a green in gen-0; 24/56 (43 %), 9/39 (23 %), 32/55 (58 %) in the others — the `leafy` tag was **not** set in the coverage pass, so this spread is ordinary variance.

`[SHOWN]` Manor groves use `getPointsWhole` (the whole compound) rather than `getPointsLots`, so a manor's trees fill its entire walled plot.

### 3.9 Trees

`[SHOWN]` Per map: `Pin.new` 33/100/51/85, `Tree.new` 33/100/51/84, `HoodView.placeTree` 33/99/51/83, `Tree.drawShadow` = `Tree.new` exactly. `Tree.doBloat` 168/476/267/486 (≈5.1 / 4.8 / 5.2 / 5.8 per tree). `Tree.bloat` 663/1927/1057/1907 — **`bloat ÷ doBloat` = 3.95 / 4.05 / 3.96 / 3.92, i.e. exactly 4**. `Tree.drawShaded` 102/276/165/318 (2.8–3.8 per tree).

`[SHOWN]` Every tree is its own tiny offscreen canvas (22 × 21 to 71 × 70 px) and the op sequence is **rigidly six operations**, in 314 out of 314 cases:
```
fill   <crown-dark>   segs 121..181  (mean 152)     ← whole crown
stroke #222222 w1     segs 122..182                 ← crown outline
stroke #222222 w1     segs 0
fill   <crown-light>  segs 47..69    (mean 58)      ← sun-lit cap, drawn on top
stroke #222222 w1     segs 0
stroke #222222 w0.6   segs 77..327   (mean 178)     ← interior foliage texture, strokeThin
```
`[SHOWN]` Crown segment counts are **always ≡ 1 (mod 4)** — i.e. the crown polygon always has a multiple of 4 vertices, 120 to 180, with 144/152/160 the most common. The light cap is ~0.38 × the crown (mean 57 segs). The detail path length is always odd.
`[SHOWN]` Tree colour: base is `colorTree = ["#707F52", "#5C7250"]` (two entries) with `varTree = "0.2"`. Measured: 190 trees cluster on base A, 124 on base B; scale factor mean 1.008 / 0.998, **sd 0.036 / 0.039**, range 0.90–1.10. Predicted `varTree × 0.2357 = 0.047` — the same 6-uniform pseudo-normal model as roofs, one notch high on the measurement.
`[SHOWN]` Tree shading: dark ÷ light = **(0.9111, 0.9183, 0.9284)**, sd ≤ 0.004. Solving `1 − t(1 − colorShadow/255)` gives t = 0.170 / 0.169 / 0.179. `[INFERRED]` Same `multiply(c, lerp(ambience, shadow, t))` formula as roofs but with **t ≈ 0.17 instead of 0.41** — foliage is shaded far more gently than a roof plane.

`[INFERRED] Crown construction.` `doBloat` calls `bloat` exactly 4× and is itself called ~5× per tree, giving ~20 `bloat` calls per tree and a 120–180-point crown that is always a multiple of 4. The most economical reading is a **recursive corner-bulging subdivision**: `doBloat(polygon)` walks the polygon 4 edges/corners at a time, `bloat` pushes each new midpoint outward by a jittered radius, and the routine recurses ~5 levels; the multiple-of-4 invariant falls out of the 4-per-call structure. `drawShaded` is called 2.8–3.8× per tree while only 2 fills + 1 detail path are emitted, so `drawShaded` must append **subpaths inside one `beginFill`/`endFill` block** — i.e. a crown is 3–4 overlapping lobes rendered as a single fill, which is exactly what the screenshots show (trees read as clusters of 3–5 bulges).
*Unknown:* the bulge radius law; whether the light cap is a separately bloated lobe or a clipped copy of the crown.

### 3.10 Pins, wells and fountains

`[SHOWN]` `Normal.spawnPin` runs 37/32/30/23×. The rendered props layer (drawn **after** buildings, **before** most trees) contains 11 / 10 / 6 / 6 units, each:
```
fill   #bfbfbf                 segs 5     ← colorStone, a quad
stroke #222222 w0.6            segs 6     ← strokeThin outline of that quad
stroke #222222 w0.6            segs 0
fill   rgba(34, 34, 34, 0.8)   segs 5     ← colorOutline at α=0.8: the dark shaft
```
`[SHOWN]` Screenshots identify these unambiguously: they are the **small pale square wells** dotted along streets in every map (e.g. "Smoke Well" at ≈(890,262) and eleven more).
`[SHOWN]` Separately, one tiny 14×14 / 21×21 canvas per map carries 3 ops (`fill #bfbfbf` 1 seg, `stroke #222222` 1 seg, `fill #222222` 1 seg) — 1-segment paths mean `arc`, and `canvas2d.arc` is recorded 2/0/4/12× with `createRadialGradient` 0/0/2/4×. Screenshots show these as **round fountains**: a stone rim, a pale-green domed basin (`colorCupola = "#8CA58C"` — exactly the teal-green seen in "Twin Row" and "Ivy Gate") shaded with a radial gradient, framed by four stone kerbs.
`[SHOWN]` `#bfbfbf` also appears **inside the buildings canvas** 5/2/8/11× — the stone walls of Manor compounds (visible as white enclosure walls around the courtyard halls in "South Street", "Wheat Street", "Gany's Gate").

### 3.11 Naming — Tracery grammar + Markov

`[SHOWN]` `Assets/grammar.json` (3827 B) is captured verbatim. Top-level rule:
```
"district": ["#regularHood#", "0.3?-#gateHood#", "0.2?-#bridgeHood#", "0.2?-#bankHood#",
             "0.2?-#docksHood#", "0.1?-#centralHood#", "0.1?-#parkHood#"]
```
with `streetHood`, `ringHood`, `squareHood`, `manorName` reachable via conditionals. The syntax is watabou's extended Tracery: `w?-rule` is a **weight**, `{a|b}` an inline choice, `{s}` an optional suffix, `TAG?-rule` a **conditional on a state flag** (`SQUARE?-`, `MANOR?-`, `PARK?-`, `SMALL?-`, `!SMALL&0.1?-avenue`), `@list` an external list reference, `.possessive` / `.s` modifiers from `ModsEngBasic`.
`[SHOWN]` Terminal lists: `place` (18), `ward` (4), `park` (5), `bank` (3), `gate` (3), `bridge` (4), `docks` (3), `street` (7), `square` (6), `ring` (8), `manor` (8), `noun` (28), `adj` (~95 incl. `#compNoun#`, `@dir`, `@occupation`), `occupation` (11), `number` (7), `dir` (8).
`[SHOWN]` `Assets/words.txt` is a 360-line ordinary-English word list (`the, be, to, of, … winter, spring, summer, autumn, sun, moon, …`) — the training corpus for `com.watabou.nlp.Markov` (`Markov.split` 348×, `Markov.generate` 14×, `Syllables.splitWord`/`pinch`), which supplies the `#proper#` symbol. Observed outputs: **"Goake's Green"**, **"Gany's Gate"** — invented surnames with possessive, matching `parkHood: "{#proper#|#proper.possessive#} #park#"` and `gateHood: "0.1?-#proper.possessive# #gate#"`.
`[SHOWN]` Other observed titles map cleanly onto the grammar: "Smoke Well" (`#adj# #noun#`), "Narrow Bridge" (`#adj# #bridge#`), "Twin Row" (`#adj# #place#`), "Ivy Gate" (`#adj# #gate#`), "Dusk Square" (`#adj# #square#`), "Wheat Street"/"South Street" (`{#adj#|#dir#} #street#`), "Little House" (`#adj# #manor#`), "North Bank" (`#dir# #bank#`), "Meat Walk" (`#adj# #place#`).
`[SHOWN]` The Markov model is built **once at cold load only** (`Markov.new` 1× in gen-0, 0 in regenerations) — a cached, session-scoped corpus. `RuleSet.new`/`Symbol.new` 46× at cold load only; `clearState` 46× on every generation — the grammar object is reused and only its per-run state is reset.
`[SHOWN]` `com.watabou.utils.Random.save` / `.restore` are called exactly once per generation. `[INFERRED]` The naming pass is run on a **saved-and-restored RNG side-channel**, so that name generation cannot perturb the geometry stream — a re-implementer must reproduce this or same-seed geometry will drift.

### 3.12 Title layout

`[SHOWN]` `MapScene.layoutTitle` (737 B) calls `DisplayObject.getRect → getBounds → TextField.__getBounds → TextEngine.getLayoutGroups` (2.4–3.0 ms — a measurable fraction of the frame). One `fillText` per map, `72px Voltaire`, `#4c463c` (= `colorText`).
`[SHOWN]` Title corner varies per map: top-left ("Smoke Well", "Narrow Bridge", "Twin Row", "Ivy Gate", "Meat Walk", "Little House"), bottom-left ("Dusk Square", "Wheat Street", "South Street"), top-right ("Goake's Green"), bottom-right ("North Bank", "Gany's Gate").
`[INFERRED]` The title is placed in whichever corner the map's bounding box leaves free — `layoutTitle` measures both the text bounds and the map bounds and picks the corner with the least overlap.
`[SHOWN]` Fonts loaded: `Voltaire-Regular.woff` (used), `ShareTech-Regular.woff`, `ShareTechMono-Regular.woff` (loaded, unused in these renders — presumably the UI).

---

## 4. Draw record: palette, widths, layer order

### 4.1 Palette schema — captured verbatim

Six palette files were fetched: `default.json`, `bw.json`, `night.json`, `warm.json`, `cool.json`, `modern.json` (679–713 B each). **All six share an identical 27-key schema**, which is therefore the generator's complete visual parameter surface:

| key | default | bw | night | warm | cool | modern |
|---|---|---|---|---|---|---|
| `colorBg` | #CCC4B7 | #FFFFFF | #D8D8D8 | #DBCAAF | #BFC6B8 | #EEEEEE |
| `colorOutline` | #222222 | #000000 | #0A0A19 | #33170A | #140F19 | #5B6666 |
| `colorText` | #4C463C | #000000 | #E5D089 | #4C351D | #444C4C | #5B6666 |
| `colorRoof` | ["#7F604C"] | ["#FFFFFF"] | ["#CCC0B7"] | ["#A36436","#8C5746"] | ["#677889","#66687F","#616F72"] | ["#F2EDDA"] |
| `varRoof` | 0.3 | 0.0 | 0.2 | 0.1 | 0.2 | 0.0 |
| `colorGreen` | #A5A584 | #FFFFFF | #AEB2A9 | #CCBC70 | #A2B299 | #B7CCB7 |
| `colorTree` | ["#707F52","#5C7250"] | ["#FFFFFF"] | ["#5B6660"] | ["#8D994C"] | ["#5B7261"] | ["#5B9866"] |
| `varTree` | 0.2 | 0.0 | 0.1 | 0.3 | 0.4 | 0.0 |
| `colorRoad` | #A69E92 | #EEEEEE | #F2EADA | #C4A77F | #A5A198 | #F8F8F8 |
| `roadWidth` | 0.4 | 0.1 | 0.5 | 0.6 | 0.8 | 0.8 |
| `roadOutlined` | false | false | true | false | false | true |
| `roadSurface` | Plain | Plain | **Tiles** | Plain | **Cobbles** | Plain |
| `roadTwisting` | false | false | true | true | false | false |
| `colorShadow` | #7A8499 | #FFFFFF | #000000 | #112244 | #A0A0A0 | #000000 |
| `shadowDir` | 30.0 | 180.0 | 250.0 | 0.0 | 120.0 | 0.0 |
| `shadowLength` | 0.2 | 0.0 | 0.1 | 0.4 | 0.2 | 0.0 |
| `shadowAlpha` | 0.4 | 0.0 | 0.3 | 0.4 | 0.5 | 0.0 |
| `colorAmbience` | #FFFFFF | #FFFFFF | #5F6F7F | #FFFFFF | #FFFFFF | #FFFFFF |
| `colorLights` | #000000 | #000000 | **#FFF0BF** | #000000 | #000000 | #000000 |
| `cityLights` | 0.0 | 0.0 | **0.8** | 0.0 | 0.0 | 0.0 |
| `colorStone` | #BFBFBF | #FFFFFF | #FFFFFF | #BFB597 | #D0D0D3 | #DDDDDD |
| `colorCupola` | #8CA58C | #FFFFFF | #B2A8A0 | #63A5A5 | #B29747 | #F2EDDA |
| `colorWater` | #7A8A99 | #FFFFFF | #72797F | #729199 | #829498 | #89B7E5 |
| `strokeNormal` | 1.0 | 1.5 | 1.0 | 2.0 | 0.8 | 1.5 |
| `strokeThin` | 0.6 | 0.5 | 0.6 | 1.0 | 0.6 | 0.5 |
| `details` | true | false | true | false | true | false |

Notes a re-implementer needs:
* Every key is stored **as a string**, including numbers and booleans (`"0.3"`, `"false"`) — `Type.toFloat` is called 15 768–20 194× per generation, consistent with re-parsing these on every use rather than caching.
* `colorRoof` and `colorTree` are **arrays** consumed by `Palette.weighted` (implying weights are positional or uniform); `varRoof`/`varTree` are the multiplicative spread.
* `colorWater`, `cityLights`, `colorLights`, `roadSurface ∈ {Plain, Tiles, Cobbles}` are present but **never exercised** by Neighbourhood in these runs — strong evidence the schema is **shared with MFCG/VG** (§8).
* The two never-run routines `loadPalette` (1006 B) and `getPalette` (716 B) are the user-supplied-palette path.

### 4.2 Measured draw statistics

| | gen-0 | gen-1 | gen-2 | gen-3 |
|---|---|---|---|---|
| draw-log entries | 9410 | 20973 | 10675 | 15686 |
| `lineTo` | 49331 | 137246 | 63017 | 100553 |
| `beginPath` | 26737 | 59381 | 30643 | 44333 |
| `closePath` | 20810 | 46230 | 23816 | 34517 |
| `moveTo` | 15574 | 42466 | 20482 | 29422 |
| `translate` | 13170 | 29242 | 15108 | 21812 |
| `transform` | 0 | 0 | 10698 | 21812 |
| `fill` | 6585 | 14621 | 7554 | 10906 |
| `stroke` | 2822 | 6351 | 3120 | 4779 |
| `setTransform` | 45 | 134 | 60 | 101 |
| `arc` | 2 | 0 | 4 | 12 |
| `createRadialGradient` | 0 | 0 | 2 | 4 |
| `fillText` | 1 | 1 | 1 | 1 |
| `Math.random` calls | 1 | 0 | 0 | 0 |
| WebGL `drawElements` | 75 | 134 | 60 | 101 |
| WebGL `texImage2D` | 92 | 268 | 120 | 202 |

`[SHOWN]` **`Math.random` is essentially never called** — 1 call on cold load, 0 on regenerations. The generator uses its own seeded PRNG (`com.watabou.utils.Random`) throughout, which is why `?seed=` fully determines the output.

`[SHOWN]` Stroke styles are only ever three values: `#7a8499` (shadow), `#222222` (outline), `#a69e92` (road). Line joins are **always `round`**. Line caps are `round` everywhere except the road layer, which uses **`square`**. Line widths are only `1` (`strokeNormal`), `0.6` (`strokeThin`), and the per-street road widths.

`[SHOWN]` Road widths are **per street** and continuous-valued: gen-0 4.550–6.952 (27 distinct), gen-1 6.576–11.449 (53), gen-2 6.213–9.579 (32), gen-3 5.212–6.651 (43). Each street contributes one stroke with 3–26 segments plus one 0-segment terminator, so street counts are 27 / 53 / 32 / 43 and street courses have 3–26 points. The spread within a run is roughly ±25 % about the mean and the mean scales with the map's view scale, consistent with `getStreetWidth` returning `roadWidth × scale × (1 ± jitter)`.

`[SHOWN]` Path complexity (gen-1): fills `{3: 11330, 5: 812, 6: 396, 7: 74, 8: 22, 9: 9, 10: 4, 65-256: 271, 17-64: 146}`; strokes `{0: 3188, 1: 650, 5-8: 2188, 65-256: 242, 257+: 12}`. The 3-segment fills are hatch triangles; the 65-256 fills are greens and tree crowns.

### 4.3 Layer order — definitive

Derived by segmenting the draw log on offscreen-canvas identity (OpenFL renders each `Shape`/`Sprite` to its own canvas sized to its bounds, so canvas dimensions label the layer). Consistent in all four runs:

| # | layer | canvas | style | ops (gen-0/1/2/3) | t (gen-1) |
|---|---|---|---|---|---|
| 0 | stage clear | 1×1 | `fillRect #000000` | 2 (cold load only) | — |
| 1 | **Greens** | 966×1035 | `fill #a5a584` (flat `colorGreen`) | 8 / 36 / 18 / 29 | 67 ms |
| 2 | **Roads** | 972×1022 | `stroke #a69e92`, per-street width, cap `square` | 53 / 105 / 63 / 85 | 68 ms |
| 3 | **Shadows** | 949×1027 | `fill`+`stroke #7a8499` w1, layer α = `shadowAlpha` | 2405 / 5382 / 2664 / 3996 | 68–81 ms |
| 4 | **Buildings** | 940×993 | 130–154 roof shades + `#222222` hatching & outlines | 6653 / 14635 / 7579 / 10976 | 82–119 ms |
| 5 | **Props (wells)** | 467×955 | `#bfbfbf` + `rgba(34,34,34,0.8)`, w0.6 | 54 / 49 / 29 / 29 | 121–122 ms |
| 6 | **Trees** | one canvas each, 22×21…71×70 | 2 green fills + w1 outline + w0.6 detail | 234 / 765 / 321 / 570 | 82–137 ms |
| 7 | **Title** | — | `fillText`, `72px Voltaire`, `#4c463c` | 1 | — |

`[SHOWN]` Trees are **not a single flat layer**: in gen-1 a tree at index 3 and a fountain at index 4 are painted *before* the buildings canvas, while the rest come after. Trees are therefore **depth-sorted against the buildings**, so a tree in front of a house overlaps it and a tree behind it does not.
`[SHOWN]` The props layer straddles the buildings layer in time (gen-0: props span t=1059–1081 ms while buildings span 1058–1079 ms) because some stone (`#bfbfbf`) is drawn *inside* the buildings canvas — the Manor walls — and the rest in its own.

---

## 5. Cost model

### 5.1 CPU profile totals

| run | wall | busy | idle | GC | native | notes |
|---|---|---|---|---|---|---|
| gen-0 (cold, square) | 2207.5 ms | 653.2 | 1554.3 | 8.2 | 254.7 | includes 204.7 ms `lime.media.AudioContext.new` |
| gen-1 (street) | 1370.9 ms | 195.3 | 1175.7 | 7.8 | 65.5 | |
| gen-2 (area) | 1394.5 ms | 238.7 | 1155.8 | 5.5 | 105.0 | |
| gen-3 (street) | 1306.0 ms | 122.0 | 1183.9 | 5.8 | 47.2 | |

`[SHOWN]` **Cold-start is dominated by a single non-generator cost**: `lime.media.AudioContext.new` at **204.7 ms self** — 31 % of the cold-load busy time — in a generator that plays no sound. Add `Font.__loadFromName` 9.6 ms, `HTML5Window.createContext` 7.8 ms and shader compilation ~7 ms.

### 5.2 Per-generation breakdown (`MapScene.reset`)

| | gen-0 (square) | gen-1 (street) | gen-2 (area) | gen-3 (street) |
|---|---|---|---|---|
| `MapScene.reset` total | 52.2 ms | 38.8 | 47.1 | 10.4 |
| — `Hood.create` (model) | 31.6 | 19.4 | 21.2 | 6.0 |
| — `MapScene.updateView` | 20.6 | 19.3 | 25.9 | 4.4 |
| — `MapScene.layout` | 3.7 | 2.8 | — | — |

**Model side** (gen-2, 21.2 ms): `Hood.populate` 17.2 → `Normal.populate` 14.6 (of which `Bisector.partition` **7.2**, `indentFronts`/`PolyBool.and` 3.8, `validateOuter` 1.6, `Building.new` 1.6) + `Manor` 2.5; `AreaHood.build` 3.3 → `bisectArea` 3.1.
→ **Lot bisection is ~42 % of model time; boolean setback ~22 %.**

**View side** (gen-2, 25.9 ms): `HoodView.new` 24.9 = `BuildingView.draw` **13.7** (→ `drawWing` 11.2 → `hatchRoof` **9.3** → `shortStroke` 5.2, `PolyCut.pierce` 2.9) + `Roads.setMode` 4.3 (→ `Street.getCourse` 4.2 → `extend` 3.5 → `intersectLines` 1.7) + `placeTree` 3.1 + `setShadows` 1.8.
→ **Roof hatching alone is ~36 % of view time and ~20 % of the whole generation.**

**Rasterisation** (separate from generation, same frame): `Context3DShape.render` 73.3 ms in gen-2 — *more than the entire generation*. Inside it: `CanvasGraphics.playCommands` 47.4 total / 18.6 self; native `fill` 11.8; native `transform` 4.3; `texImage2D` 8.9 (uploading the per-shape offscreen canvases as GL textures); `CanvasGraphics.endFill` 37.0; `endStroke` 15.2.

### 5.3 Hot functions (regeneration, self time)

gen-2: `CanvasGraphics.playCommands` 18.6 · native `fill` 11.8 · `texImage2D` 8.9 · **`GeomUtils.intersectLines` 7.8** · native `transform` 4.3 · `DrawCommandBuffer.moveTo` 2.7 · `PolyBool.augmentPolygons` 2.3 · `PolyBounds.obb` 2.2 · `PoissonPattern.validate` 1.8 · `Street.extend` 1.8 · `Bisector.makeCut` 1.7 · `PolyCut.pierce` 1.6 · `PolyBounds.convexHull` 1.5.

`[SHOWN]` **`GeomUtils.intersectLines` is the single hottest generator routine** — 146 745 / 212 593 / 139 977 / 174 463 calls per generation, 7.8 ms self in gen-2. `GeomUtils.converge` 104 216 / 85 328 / 88 347 / 98 883; `GeomUtils.lerp` 45 183 / 68 702 / 46 832 / 65 625. These three account for essentially all of `com.watabou.geom`'s cost. A re-implementer should treat a fast, allocation-free line-intersection primitive as the performance foundation.

`[SHOWN]` Allocation pressure: `openfl.geom.Point.new` is called **385 440 / 561 098 / 391 113 / 498 820** times per generation. Heap peaks 8.2–38.6 MB, settling within ~1.2 s. `Point.subtract` 99k–177k, `Point.get_length` 75k–152k, `Point.normalize` 28k–34k. The generator is extremely `Point`-allocation-heavy; a struct/flat-array representation would be a large win in a re-implementation.

### 5.4 Scaling

`[SHOWN]` Across the four draw runs, ops scale linearly with wing count:

| | wings | hatch triangles | shadow quads | trees | streets |
|---|---|---|---|---|---|
| gen-0 | 296 | 5150 | 690 | 39 | 27 |
| gen-1 | 658 | 11330 | 1533 | 127 | 53 |
| gen-2 | 315 | 5959 | 765 | 53 | 32 |
| gen-3 | 492 | 8446 | 1136 | 95 | 43 |

Ratios: hatch/wing **17.4 / 17.2 / 18.9 / 17.1**; shadow-quad/wing **2.33 / 2.33 / 2.43 / 2.31** (one quad per silhouette edge, §3.7); tree/wing 0.13 / 0.19 / 0.17 / 0.19; street/wing 0.091 / 0.081 / 0.102 / 0.087.

Per-wing draw-call budget, default palette: **2 roof fills + 1 outline stroke + ~17.4 hatch fills + ~2.3 shadow quads (fill+stroke) ≈ 25 canvas operations**. A 650-wing map costs ~16 000 canvas ops plus ~6 per tree and ~2 per street.

---

## 6. `[INFERRED]` algorithm hypotheses, with falsifiable tests

| # | subsystem | hypothesis | test that would refute it |
|---|---|---|---|
| H1 | street network | Streets are *cuts*, produced by one recursive OBB bisection of the hood polygon; blocks = cuts + 1 | Generate 50 maps and count streets and blocks in the model dump. If `blocks ≠ streets + 1` in any map, the partition is not a pure binary cut tree (e.g. streets get merged or loop). |
| H2 | cut direction | The cut is perpendicular to the OBB long axis, with the position jittered and clamped | Measure the angle between each street and the OBB long axis of its parent block; a non-perpendicular mode refutes it. |
| H3 | lot alignment | `detectStraight` snaps lot cuts perpendicular to the longest straight (street-facing) run; it is off for street cuts | Count `detectStraight` vs `makeCut` in a run with a different template. It must equal `makeCut − streets` exactly; any other value refutes. |
| H4 | street extension | Each street is extended at both ends until it meets another street or the boundary | `Street.extend` must be exactly `2 × Street.new` in every run. A run where it is not refutes the "both ends, once each" model. |
| H5 | setback | `indentFronts` = `lot ∩ inset(block)`, with lots losing frontage discarded | Turn setback off and confirm building count rises toward the lot-leaf count (≈1333 vs 779). |
| H6 | roof colour | `k = 1 + varRoof · N`, `N` = mean-of-6-uniforms pseudo-normal, applied as an RGB multiply | Render with `varRoof = 0.6`; the measured sd of `k` must be 0.141 (= 0.6×0.2357) and H,S must remain invariant. A uniform law would give sd 0.346. |
| H7 | roof shading | `dark = light × lerp(colorAmbience, colorShadow, ≈shadowAlpha)` | Render with `night.json` (`colorShadow #000000`, `shadowAlpha 0.3`) — predicted dark/light = (0.70, 0.70, 0.70). Render `cool.json` (`#A0A0A0`, 0.5) — predicted (0.814, 0.814, 0.814). Any channel-dependent deviation refutes. |
| H8 | hatching | Each hatch chord is `PolyCut.pierce`'d once and drawn as **two** tapered triangles meeting at the chord midpoint | `shortStroke ÷ pierce` must stay at exactly 2.00 under any tag set; 1.0 or a varying ratio refutes. Also: hatch counts per wing must stay predominantly even. |
| H9 | shadows | Shadow = footprint translated once by `shadowLength·h` along `shadowDir`, then one quad per silhouette edge, flat colour under a layer alpha, overdrawn by the building | Set `shadowDir = 0` and `shadowLength = 0.4` (`warm.json`); every shadow quad must translate by the same vector and the layer must still use a single flat colour. Quads-per-wing must track the mean silhouette-edge count (≈2.3 for the observed 4/5/6-gon mix); a value pinned at exactly 1, or a per-shape alpha, or a convex-hull silhouette, refutes. |
| H10 | tree shadow | Tree shadow polygon ≡ tree crown polygon, translated | The blob-fill segment histogram in the shadow layer must remain bit-identical to the crown histogram. Any divergence refutes. |
| H11 | Poisson field | One global blue-noise field per map, clipped per polygon; ~6400 candidate sites from a warped lattice | `PoissonPattern.new` must stay at exactly 1 per generation regardless of how many greens exist, and `warp` must stay ≈6400 for a map with 5 greens and for one with 40. A count proportional to green area refutes. |
| H12 | greens | Green = Chaikin-smoothed equal-distance inset of the block's street-free boundary | `Chaikin.render` must equal `greens + groves` exactly in every run. Outline point counts must fall by ~2× per Chaikin round removed. |
| H13 | trees | Crown = recursive 4-way corner-bulging; vertex count always a multiple of 4; 3–4 lobes in one fill block | Crown segs must stay ≡1 (mod 4). A prime or odd-mod-4 vertex count refutes. `bloat ÷ doBloat` must stay at 4.00. |
| H14 | RNG discipline | Naming runs inside `Random.save()` / `Random.restore()` so names cannot perturb geometry | Two seeds that produce the same geometry but different names must exist; if name length ever changes the street count, it is refuted. |
| H15 | determinism | `Math.random` is never used; (seed, tags) fully determine output | Reload the same `?seed=&tags=` URL and diff the draw log op-for-op. Any difference refutes. |

---

## 7. Failure modes and how the generator handles them

`[SHOWN]`/`[INFERRED]`:
* **Degenerate cut children.** `subdivide` runs 4–16 fewer times than a perfect binary tree implies (2717 vs 2733, 2649 vs 2655, 2704 vs 2708, 2088 vs 2098). `[INFERRED]` a handful of cuts produce a sliver that is dropped rather than recursed into.
* **Lots without frontage.** `validateOuter` (2.9× per accepted lot) and `validateLot` filter them out; ~42 % of lot leaves get no building. This is a *discard*, not a retry — building count varies freely.
* **Self-intersection in polygon offsetting.** `Offsetter.filter` (432 B) is called exactly once per `Offsetter.run` — the standard handler for offset self-overlap at reflex corners.
* **Shadow seams.** Every shadow quad fill is followed by a stroke of the *identical path in the identical colour* at width 1 — a ½-px dilation to close the gaps between adjacent shadow quads.
* **Block-content retry.** `BlockContent.new` exceeds `Block.new` by 1 in gen-2 (44 vs 43) and gen-3 (63 vs 62) — one content object is built and discarded, implying a validity check with a single retry.
* **Colour clamping.** `Color.rgbfSafe` (812/836/653/689, = one per wing) exists alongside `Color.rgbf` (843/…) — the "Safe" variant clamps channels after scaling so that `varRoof` up-scaling cannot overflow.
* **Unresolved:** no evidence of a whole-map retry loop. `Hood.create`, `Hood.new`, `Hood.populate`, `Hood.bisectArea`, `PoissonPattern.new`, `Settings.processTags` and `Random.save/restore` are each called **exactly once** per generation in all four runs, so the generator does not re-roll the map.

---

## 8. Shared code with MFCG / VG

`[SHOWN]` The package split is unambiguous. Only `com.watabou.neighbourhood.*` is Neighbourhood-specific (about 110 of the 282 executed symbols). Everything else is a **shared library**:

| package | what it is | evidence it is shared |
|---|---|---|
| `com.watabou.geom` + `.polygons` | `GeomUtils`, `Color`, `Chaikin`, `Circle`, `PoissonPattern`, `Fillable{Poly,MultiPoly}`, `PolyBool`, `PolyBounds`, `PolyCore`, `PolyCreate`, `PolyCut`, `PolyTransform` | Direct descendant of TownGeneratorOS's `com.watabou.geom` / `com.watabou.utils`. `PolyBounds.circle`, `PolyCut.{shrink, peel, shrinkEq}`, `PolyCreate.regular`, `Color.{hsv, rgb2hsv, lerpHSV, lerpHue, dist}` are compiled in but **never called** by Neighbourhood — dead weight that only makes sense if the library serves several generators. |
| `com.watabou.utils` | `ArrayExtender` (6 of 15 unused), `GraphicsExtender` (`dashedPolyline`, `drawPolygonRotated` unused), `MathUtils`, `Palette`, `PointExtender`, `Random`, `Updater`, `LongPresser` | Same argument: `dashedPolyline` is an MFCG idiom (district boundaries), unused here. |
| `com.watabou.coogee` | The app shell: `Game`, `Scene`, `ui.UI`, `ui.UIStyle`, `ui.View`, `ui.utils.Text` | 6 of `UI`'s 8 methods (`showMenu`, `showMenuAt`, `showDialog`, `showToast`, `findForm`, `getRect`) never run — a full menu/dialog framework that Neighbourhood's minimal UI doesn't exercise. |
| `com.watabou.tracery` | `Grammar`, `RuleSet`, `Symbol`, `ExtSymbol`, `TraceryNode`, `Tracery`, `RuleSelector`, `DeckRuleSelector`, `ModsEngBasic` | `ModsEngBasic` ships 20 English modifiers (`s, ed, a, ing, isPlural, possessive, capitalize, was, they, them, is, thiss, caps, …`); Neighbourhood uses 4. |
| `com.watabou.nlp` | `Markov`, `Syllables` | Generic word-model code driven by a swappable `words.txt`. |
| `com.watabou.system.State`, `URLState` | seed/tag persistence + address-bar sync | The `?seed=&tags=` URL convention is identical across watabou's generators. |

`[SHOWN]` **The palette schema is the strongest cross-generator evidence.** All six palettes carry `colorWater`, `cityLights`, `colorLights`, `roadSurface ∈ {Plain, Tiles, Cobbles}` and `roadOutlined` — and Neighbourhood never draws water, never draws a city light, and only ever emits a `Plain` flat road stroke in these runs. A schema carrying four unused keys is a schema written for a bigger sibling. `colorCupola` and `colorStone` *are* used (fountain domes, well kerbs, manor walls).

`[INFERRED]` A re-implementer should therefore plan for a **three-tier architecture**, mirroring watabou's: (1) a generator-agnostic geometry kernel (polygon boolean/offset/cut/bounds/OBB, Chaikin, blue-noise, line intersection); (2) a shared presentation layer (palette schema, tapered-stroke hatching, prism shadows, tree blobs, Tracery+Markov naming); (3) a thin per-generator model (`Hood` here; `Town`/`Village` elsewhere) that owns only the layout templates and block-content strategies. The Neighbourhood-specific surface is genuinely small — roughly `Hood`, `Street`, `Block`, `Building`, `Wing`, `Cupola`, `Pin`, the three-plus `*Hood` templates, the three `BlockContent` strategies, `Bisector`, `Offsetter`, `GraphUtils`, `Rect`, and the six view classes.

---

## 9. Open questions a re-implementer must decide

1. **`isSmallEnough` termination law.** Area threshold, OBB minor-axis threshold, or both? How does the `medium` size tag map onto it? This single function sets building density and is the most consequential unknown.
2. **`makeCut` (2938 B) internals.** Two OBBs are computed per cut — what is the second for? How is the split position distributed along the axis (`MathUtils.gate` clamps it to some range)? What tolerance does `detectStraight` use to call a run of edges "straight"?
3. **The 65/63/42/61 street-level cuts.** `Hood.bisectArea` is one `partition` call that yields the whole street grid, but nothing reveals how street cuts are ordered, whether they are scored, or how the `square`/`street`/`area` templates bias them. `SquareHood.buildRound` (1669 B) and the never-run `buildSquare` (2425 B), `createRings` (781 B), `createCenter` (740 B), `createBlocks` (848 B) are entirely unexplained.
4. **`Hood.getCloud` / `getCircle` / `getArc` stitching.** How are 17–30 circles combined into one outline, and where does the straight chord seen in "Goake's Green" come from?
5. **`Hood.semiSmooth` (795 B).** Not Chaikin (counts don't match). Spline? Midpoint displacement? And how does `roadTwisting` switch it?
6. **`getStreetWidth` distribution** and how `roadWidth` (a 0.1–0.8 palette scalar) maps to the observed 4.5–11.4 px strokes.
7. **`PoissonPattern` exact scheme.** `warp` and `validate` are 1:1 at ~6400; `emit` ~80; `step` ~128. Lattice size, warp function, and minimum-distance rule are all undetermined.
8. **Tree crown construction.** The multiple-of-4 vertex invariant and the exact 4:1 `bloat`:`doBloat` ratio constrain it hard, but the bulge law and the lobe layout are unknown. So is how the light cap (0.38× the crown) is derived.
9. **`Normal.spawnPin` semantics.** It runs 23–37× per map but only 6–11 wells render. What else does a pin become, and what suppresses the rest?
10. **`ShadowLayer` 1-segment strokes.** ~18 % of the shadow layer's strokes have a single path segment; they are unaccounted for.
11. **`getDark`'s exact constant.** Measured (0.7874, 0.8010, 0.8325); `lerp(ambience, shadow, 0.40)` predicts (0.7914, 0.8071, 0.8400) — a consistent 0.5–0.9 % discrepancy. Either `t ≈ 0.412` or there is an extra factor.
12. **`Building` plan selection.** `buildSimple`/`buildT`/`buildCross`/`buildLarge` fire only a handful of times per map. What picks them — block role, lot area, a Manor flag?
13. **Roof-type selection.** `drawPyramid`, `drawDome`, `drawDormers`, `drawTip`, `drawCone` fire 0–4 times each. The trigger is unknown; `drawCone` (1152 B) never ran at all.
14. **Depth sorting.** Trees are interleaved with buildings in paint order, but the sort key (y? footprint centroid? bounding-box bottom?) is not recoverable from the draw log.
15. **`layoutTitle` corner rule.** Six of twelve maps put the title top-left, three bottom-left, one top-right, two bottom-right. The exact scoring is unknown.
16. **Tag space.** `Settings.oneOf` rolls 4 slots but only `medium`, `square`, `street`, `area`, `leafy` were ever observed. `Settings.processTags` is 2511 B — the tag table is much larger than what these runs sampled.
17. **`assemble` (7272 B, never run).** The largest unexecuted symbol in the binary. Possibly an export/serialisation path; unidentified.

---

## 10. Source index

* `captures/neighbourhood/2026-09-21T05-04-54/meta.json`
* `captures/neighbourhood/2026-09-21T05-04-54/report.md` — call trees at lines 2225–2385 (gen-0), 2569–2712 (gen-1), 2896–3040 (gen-2), 3224–3317 (gen-3); per-class call tables at 25–99, 171–245, 317–391, 463–537; draw summaries at 617–962, 964–1318, 1320–1671, 1673–2030
* `.../coverage/gen-{0..3}.calls.json` — per-symbol call counts
* `.../coverage/gen-{0..3}.coverage.json` — full symbol table incl. never-executed functions and byte sizes
* `.../draw/gen-{0..3}.draw.json` — `rec.log` = `[t_ms, op, "WxH", style, segs, lineWidth?]`
* `.../profile/gen-{0..3}.cpuprofile`
* `.../{profile,coverage,draw}/console.jsonl` — the `Hood.hx:42` stage trace
* `.../{profile,coverage,draw}/gen-{0..3}.png` — twelve screenshots, all viewed
* `.../coverage/network/index.jsonl` and `.../bodies/` — data assets only:
  * `0016-5c70e16a.json` = `Assets/default.json`
  * `0008-e0863355.json` = `Assets/modern.json`
  * `0015-c0f8ba4a.json` = `Assets/bw.json`
  * `0015-b618d6d1.json` = `Assets/night.json`
  * `0016-3f85eac5.json` = `Assets/warm.json`
  * `0016-1f6ee1df.json` = `Assets/cool.json`
  * `0016-376f0102.json` = `Assets/grammar.json`
  * `0016-573e7029.bin` = `Assets/words.txt` (360 lines)
* Fonts: `Assets/Voltaire-Regular.woff` (title), `ShareTech-Regular.woff`, `ShareTechMono-Regular.woff` (loaded, unused in renders)

---

## Critic addendum (2026-09-21) — the two NG captures this file did not use

**Why this exists.** The body of this file is built only on `captures/neighbourhood/2026-09-21T05-04-54/`
(size `medium`; the coverage pass rolled the `area` template four times). Two further recordings exist and
were cited nowhere in the findings set before this addendum:

| capture | URL tags | seeds | passes | title drawn |
|---|---|---|---|---|
| `captures/neighbourhood/2026-09-21T05-38-59/` | `large,square,leafy` | 5151, 5152 (reload each) | coverage + draw | "Silver Square" (5151) |
| `captures/neighbourhood/2026-09-21T05-40-05/` | `small,street` | 6161, 6162 (reload each) | coverage + draw | "Old Row" (6161) |

Source of every number below: `coverage/gen-{0,1}.calls.json` in those two directories, the two
`coverage/console.jsonl` traces (`Hood.hx:42: 5151: large, square, leafy`, `… 6161: small, street`), and the
screenshots `coverage/gen-0.png`. No JavaScript was read. Column key: **A0/A1** = base capture coverage
gen-0/1 (`medium, area`), **Q1/Q2** = seeds 5151/5152 (`large, square, leafy`), **S1/S2** = seeds 6161/6162
(`small, street`).

### CA-1. Routines marked `[NAMED-ONLY]` / never-executed in §1 that DID run here `[SHOWN]`

| symbol (bytes) | A0 | A1 | Q1 | Q2 | S1 | S2 | reading |
|---|---|---|---|---|---|---|---|
| `templates.SquareHood.new / build (474) / buildSquare (2425) / getName` | 0 | 0 | 1 | 1 | 0 | 0 | the `square` template's **rectangular-plaza** branch (the base profile pass only ever hit `buildRound`) |
| `templates.StreetHood.new / build (1754) / getName` | 0 | 0 | 0 | 0 | 1 | 1 | the `street` template under coverage |
| `templates.StreetHood.f (190)` | 0 | 0 | 0 | 0 | 4 | 4 | a 4×-per-hood helper of the street template |
| `Namer.square` / `Namer.street` (80 each) | 0/0 | 0/0 | 1/0 | 1/0 | 0/1 | 0/1 | template-specific name rule: "Silver **Square**", "Old **Row**" |
| `Settings.resolve (236)` | 0 | 0 | 1 | 1 | 1 | 1 | runs **only when tags arrive via the URL**; `Settings.randomTags` is then 0 (it was 1 in every base run) |
| `Settings.oneOf` | 4 | 4 | 6 | 6 | 5 | 5 | so "four independent tag slots" (§0) is the *random-tags* case only; with explicit tags the count is 3 + number of supplied tags |
| `GraphUtils.longStroke (624)` | 0 | 0 | 24 | 0 | 0 | 0 | fires only in the run that also has `drawCone` = 4 → **6 long strokes per conical roof** |
| `GraphUtils.attackDecay0 (65)` | 0 | 0 | 4 | 0 | 0 | 0 | once per cone — the stroke-width envelope of the cone hatching |
| `BuildingView.drawCone (1152)` | 0 | 0 | 4 | 0 | 0 | 0 | conical roofs exist and are rare (4 in 1343 buildings, 0 in the other five runs) |
| `PolyUtils.rand (348)` / `randInner (342)` | 0/0 | 0/0 | 0/0 | 1/0 | 1/1 | 1/1 | single random-point-in-polygon draws (pin placement on sparse maps) |
| `Building.buildCross` | 0 | 0 | 1 | 0 | 0 | 0 | a fourth large-building plan besides `buildSimple / buildT / buildLarge` |
| `WellView.new/fromPin/drawShadow`, `FountainView.new/fromPin/drawShadow` | 0 | 0 | 1 each | 1 each | 0 | 0 | the square template plants **one well and one fountain as `Pin`s** (both visible at the S corner of the plaza in "Silver Square") |
| `PolyBounds.circle (232)` | 0 | 0 | 1 | 1 | 0 | 0 | square template only — a bounding/inscribed circle query, most plausibly to size the plaza `[INFERRED]` |
| `PolyCreate.regular` | 0 | 0 | 2 | 1 | 0 | 0 | regular polygons (round towers / cupola bases) |

Still never executed in any of the 8 coverage samples now available: the `ring` template
(`Namer.ring`, any `RingHood.*`), `Settings.getInfo`. Those remain `[NAMED-ONLY]`; a `tags=ring` recording
would close them.

### CA-2. The four "exact identities" of §3.2 are template-specific — generalised form `[SHOWN]`

| quantity | A0 | A1 | Q1 | Q2 | S1 | S2 |
|---|---|---|---|---|---|---|
| `Hood.bisectArea` | 1 | 1 | **2** | **2** | **2** | **2** |
| `Hood.getCloud` | 2 | 1 | 2 | 2 | 2 | 2 |
| `Street.new` (= `getCourse`) | 65 | 63 | 104 | 63 | 12 | 4 |
| `Block.new` | 66 | 64 | 104 | 63 | 13 | 5 |
| `Street.extend` | 130 | 126 | 206 | 124 | 24 | 8 |
| `Bisector.partition` | 65 | 57 | 90 | 56 | 14 | 7 |
| `Normal.populate` | 64 | 56 | 88 | 54 | 12 | 5 |
| `Bisector.makeCut` | 1334 | 1299 | 2474 | 1494 | 208 | 199 |
| `Bisector.detectStraight` | 1269 | 1236 | 2373 | 1434 | 197 | 196 |
| `Building.new` | 779 | 736 | 1343 | 762 | 96 | 71 |

1. **`Block.new = Street.new + 1` holds for `area` and `street`, but for `square` it is `Block.new = Street.new`.**
   One face of the subdivision is consumed by the plaza and is not a `Block`.
2. **`Street.extend = 2 × Street.new` holds for `area` and `street`; for `square` it is `2·S − 2`** (206 vs 208,
   124 vs 126) — two street ends (those abutting the plaza) are not extended.
3. The general form of identity 3 is **`Bisector.partition = Normal blocks + Hood.bisectArea`** (90 = 88+2,
   56 = 54+2, 14 = 12+2, 7 = 5+2). `bisectArea` is 1 for `area` and **2 for both `square` and `street`**: those
   templates first split the hood into two areas (the two sides of the main street; the two halves around the
   plaza) and bisect each independently.
4. The general form of identity 4 is **`detectStraight = makeCut − (Street.new − k)`** with k = 0 (`area`),
   **k = 1 (`street`)**, **k = 3 (`square`)**. I.e. k streets are *not* produced by a `Bisector` cut at all —
   they are laid down directly by the template: the single main street of `StreetHood`, and the streets framing
   the plaza of `SquareHood`. `[INFERRED]` for what the k template streets are; the arithmetic is `[SHOWN]`.

**Consequence for a re-implementer:** a template is "seed geometry + how many sub-areas to hand to the generic
bisector", not a different subdivision algorithm. That is the cheapest possible template system and it is
fully sufficient to produce the three visibly different morphologies.

### CA-3. What the two new screenshots show `[SHOWN]`

* **`large, square, leafy` ("Silver Square", 1343 buildings, 104 blocks).** Roughly circular hood ≈ 950 px across.
  A **rotated-square plaza** (≈ 300 px side, flat grey-brown fill, no buildings) at the centre; the street grid
  is **aligned to the plaza's two axes** near the centre and relaxes into gently curved, radially splayed streets
  toward the rim — the plaza's orientation propagates outward through the bisection exactly as the creator
  describes for bent cuts ("the overall shape is more clearly propagated to inner lines", post 49191011).
  `leafy` ⇒ almost every block interior is a green with 3–15 trees (`Normal.createGreen` 68 of 88 Normal blocks =
  **77 %**, versus 23–58 % without the tag; `Tree.new` 255 / 223 versus 33–100). **Walled manor compounds**, several with domed/cupola halls, sit on the rim and at a few interior sites
  (`Manor.new` 11, `Cupola.new` 6, `drawDome` 2, `drawCone` 4). A well and a fountain stand on small paved aprons at the plaza's south corner.
  `Empty.new` = 6 / 5: a handful of blocks are left as pale paved yards.
* **`small, street` ("Old Row", 96 buildings, 13 blocks).** A single gently **S-curved main street** runs
  corner to corner, visibly wider than everything else, with 8–10 short side lanes leaving it at right angles and
  dying out after one block. Buildings line both sides of the main street in continuous terraces; behind them
  the hood simply stops — no rim street, no outline. One manor with a green cupola, two courtyard greens with a
  single large tree each. The hood is a **spindle**, consistent with §3.1.
* Size tag → scale, measured: `small` 71–96 buildings / 5–13 blocks; `medium` 736–779 / 64–66;
  `large` 762–1343 / 63–104. (`large` seed 5152 is no bigger than `medium` — the size tag sets a range with a
  wide spread, not a fixed target.)

### CA-4. Correction to §3.8 — `PoissonPattern` is k = 50 dart-throwing, not an 80 × 80 warped lattice

§3.8 reads `warp = validate ≈ 6400 ≈ 80²` as "a warped 80 × 80 lattice … not textbook Bridson". The file's own
numbers refute that, and the sibling recordings settle it:

| run | `step` | `warp` = `validate` | warp ÷ step |
|---|---|---|---|
| base cov 0 / 1 / 2 / 3 | 128 / 122 / 129 / 125 | 6400 / 6100 / 6450 / 6250 | **50.000** in all four |
| Q1 / Q2 / S1 | 132 / 130 / 125 | 6600 / 6500 / 6250 | **50.000** in all three |
| MFCG (`profile-mfcg.md` §6.1) | 230 | 11 500 | **50.000** |
| VG (`profile-village.md` §4.6) | 250 / 298 / 261 / 163 | 12 500 / 14 900 / 13 050 / 8 150 | **50.000** |

6400 = 128 × 50; the "80²" is a coincidence (MFCG's 11 500 and VG's 12 500 are not squares). All three
generators share one `com.watabou.geom.PoissonPattern` that generates **exactly 50 candidates per `step`, every
one passed through `warp` and then `validate`, with no early exit**, emitting ≈ 0.6 points per step. That is
Bridson-style active-list Poisson-disc sampling with k = 50 in a warped domain. `[SHOWN]` for the ratio,
`[INFERRED]` for the Bridson reading (steps ≈ 1.6 × emits rather than the 2N − 1 of a run-to-exhaustion Bridson, so
the loop stops early — by target count or by filling a fixed tile).

Second correction: `PoissonPattern.new` is **not** "exactly once per generation" unconditionally — in **S2**
(no greens, no groves: `createGreen` = 0, `Manor.addGrove` = 0) **every `PoissonPattern.*` count is 0**. The
pattern is built **lazily on the first `fill`**, then reused for every later green in that generation.

### CA-5. Reading of `detectStraight` / `makeCut` against the creator's own description

§3.2 reconstructs `makeCut` as "line ⟂ OBB long axis, optionally snapped by `detectStraight`". The creator's
stated construction (post 49191011, extracted in `watabou-extra-a.md` §2.1) is different in one essential:
the cut **leaves its start edge at a right angle and arrives at its end edge at a right angle, with a bend added
in the middle when a single straight segment cannot do both**. FTG's author independently describes the identical
construction in three steps (post 164816716, `ftg-posts-c.md` §2.2). Two recorded facts fit the stated
construction better than the OBB-only reading: `makeCut = PointExtender.project` exactly 1 : 1 (one
perpendicular-foot projection per cut — the "arrive at a right angle" step), and `detectStraight` being skipped
for street-level cuts but run for every lot-level cut (streets are *always* bent then `semiSmooth`ed; party walls
are kept straight whenever a straight cut is already perpendicular at both ends). Both readings are
`[INFERRED]`; a re-implementer should build the stated bent-cut construction and use the OBB only to choose
*where* to cut. Discriminating test: in `draw/gen-*.draw.json`, count lot outlines with 5+ vertices where a
4-vertex outline would be expected — a bent party wall adds exactly one vertex to each of the two lots it
separates.

---

## Ring-template addendum (2026-09-25) — captures/neighbourhood/2026-09-21T07-20-25

*(Written incrementally by lane `profile-neighbourhood-ring`; sections below are appended as each is finished.)*

**Why this exists.** `_critic.md` §6 item 2 left the NG `ring` template unrecorded (`Namer.ring`, the ring-hood body,
`Settings.getInfo` all `[NAMED-ONLY]`). This addendum reads the post-critic recording of the live generator with
`?tags=ring`: `captures/neighbourhood/2026-09-21T07-20-25/` — `report.md` (1840 lines, read in full), `meta.json`,
`coverage/gen-{0,1}.calls.json` (analysed in full with python against the eight other NG coverage samples),
`coverage/gen-{0,1}.coverage.json` (function names, byte ranges and counts only), `profile/gen-{0,1}.cpuprofile`,
`draw/gen-{0,1}.draw.json`, all three `console.jsonl`, and all six screenshots (`{profile,coverage,draw}/gen-{0,1}.png`,
all viewed). Data asset read: `coverage/network/bodies/0014-376f0102.json` (= `Assets/grammar.json`, byte-identical to
the base capture's copy). No `captures/**/network/bodies/*.js` file was opened.

**Method note (so the numbers can be re-checked).** The report's call trees stop indenting at depth 40, so deep parentage
is flattened. To recover it without the bundle, each cpuprofile call frame (`line:col`) was mapped to a coverage function
(`startOffset`) by calibrating line starts from function names that occur once in `coverage.json`, and the labels were
taken from `calls.json` by joining on (method name, byte size, call count). Every Neighbourhood.js frame resolves to a
function with the same name (951/958 and 738/744 frames; the rest are nameless framework frames). The scripts are in the
session scratchpad (`prof_label.py`, `prof_tree.py`, `callers.py`, `timeline.py`, `stages.py`, `calls_diff.py`). The
self-time convention is the analyser's (`timeDeltas[i]` belongs to `samples[i]`), so totals match `report.md`
(for example `MapScene.reset` 96.0 / 77.7 ms). Profile parentage is **sampled**: a routine that is missing from a tree
may still have run.

**Column key.** R1 = seed 7171 (gen-0, cold load), R2 = seed 7172 (gen-1, page reload). All other column names are the
same as CA-1 and CA-2. The URL asked for `tags=ring`; the generator rewrote it to `?tags=ring%2Cmedium&seed=…`
(`meta.json` `href`), and the stage trace reads `Hood.hx:42: 7171: ring, medium`. So `Settings.resolve` (1/1) supplied
the missing size tag `[SHOWN]`.

### RA-0. Run inventory `[SHOWN]`

| pass | gen | how | seed | wall ms | ready at ms | title drawn | corner |
|---|---|---|---|---|---|---|---|
| profile / coverage / draw | 0 | cold load | 7171 | 2396 / 2320 / 2507 | 407 / 202 / 205 | "Night Round" | bottom-left |
| profile / coverage / draw | 1 | reload | 7172 | 4910 / 4949 / 4675 | 3149 / 3414 / 3171 | "Small Ward" | top-left |

* **Determinism across passes `[SHOWN]`.** For each seed the three passes are independent page loads. The coverage and
  draw screenshots are byte-identical (md5 `27f6e1c5…` for 7171, `f00b7d47…` for 7172). The profile-pass gen-1 PNG is also
  identical. The profile-pass gen-0 PNG differs in 99 pixels (maximum channel difference 25, three small clusters), which is
  raster noise under the profiler, not a different map. Coverage counts measured in one load equal draw-log counts measured
  in another (RA-5). The console traces are identical in all three passes. This supports H15.
* **Reloads wait on fonts `[SHOWN]`.** Every gen-1 page logs `[lime.text.Font] WARNING: Could not load web font
  "Voltaire"` (and the two Share Tech fonts) about 3 s after load. That is why `readyAtMs` is 3.1–3.4 s and why gen-1 wall
  time is about 4.7–4.9 s. The same warning appears on the `05-38-59` and `05-40-05` reloads. It is idle time in the
  harness, not generator work.

### RA-1. `com.watabou.*` routines that ran here and in none of the other 8 coverage samples `[SHOWN]`

The comparison set is 05-04-54 cov gen-0..3 (A0..A3), 05-38-59 cov gen-0/1 (Q1/Q2) and 05-40-05 cov gen-0/1 (S1/S2).
33 `com.watabou.*` labels are new. Columns follow CA-1. **A2 and A3 are also 0 in every row.**

| symbol (bytes) | A0 | A1 | Q1 | Q2 | S1 | S2 | R1 | R2 | reading |
|---|---|---|---|---|---|---|---|---|---|
| `templates.RingHood.new (36) / build (69) / createShape (1434) / createRings (781) / createBlocks (848) / createCenter (740) / getName (196)` | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | the ring template's body. The sampled order in R1 is `build → createShape (→ PolyBounds.obb) → createRings (→ Chaikin.render) → createBlocks (→ … → createCenter)`. The base file listed `createRings/createCenter/createBlocks` as never-run; they are RingHood's |
| `RingHood.unhole (217)` — static (`Kd.unhole`) | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 3 | **= number of ring roads R** (RA-2) |
| `RingHood.pierce (326)` — static (`Kd.pierce`) | 0 | 0 | 0 | 0 | 0 | 0 | 4 | 6 | **= 2R** |
| `RingHood.(anon@221960) (35)` — closure inside `createRings` | 0 | 0 | 0 | 0 | 0 | 0 | 11 | 14 | a per-candidate callback during ring construction `[INFERRED]` |
| `Namer.ring (78)` | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | the ring name rule: "Night Round", "Small Ward" (RA-5) |
| `utils.BisectorEx.new (245) / partition (49)` | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 3 | one twisted bisector per annulus (**= R**), called from `createBlocks` |
| `BisectorEx.subdivide (504)` | 0 | 0 | 0 | 0 | 0 | 0 | 234 | 208 | recursion node; **= `ExPolygon.area`** (its size test). It never calls `Bisector.isSmallEnough` |
| `BisectorEx.makeCut (2938)` | 0 | 0 | 0 | 0 | 0 | 0 | 123 | 109 | **= split + "Trying again"**. It calls `Hood.semiSmooth` (→ `getArc`), `Hood.getStreetWidth`, `ExPolygon.not` and itself (sampled) |
| `BisectorEx.split (1107)` | 0 | 0 | 0 | 0 | 0 | 0 | 122 | 108 | **= `ArrayExtender.find`** |
| `BisectorEx.(anon@251898) (35)` — closure inside `makeCut` | 0 | 0 | 0 | 0 | 0 | 0 | 124 | 111 | **= split + R** |
| `utils.ExPolygon.new (319)` | 0 | 0 | 0 | 0 | 0 | 0 | 476 | 421 | a polygon with holes. **= 2·split + `not`**. Its sampled child is `haxe.ds.ObjectMap.set` |
| `ExPolygon.area (94)` | 0 | 0 | 0 | 0 | 0 | 0 | 234 | 208 | outer area minus holes, once per `subdivide` `[INFERRED]` |
| `ExPolygon.not (223)` | 0 | 0 | 0 | 0 | 0 | 0 | 232 | 205 | boolean difference. Its sampled child is `PolyBool.and` → `augmentPolygons` |
| `content.Green.new (60) / populate (27) / addGreen (227) / addGrove (307)` | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | **a new block-content class**: the grove at R2's centre, built by `createCenter` (sampled) |
| `content.Empty.addGreen (206) / addGrove (306)` | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 1 | `Empty` blocks can carry a grove (in the base runs `Empty` only ever placed pins) |
| `geom.polygons.PolyCut.shrinkEq (79) / shrink (232)` | 0 | 0 | 0 | 0 | 0 | 0 | 4 | 6 | **= 2R**, called from `createBlocks` (sampled). Each `shrink` makes exactly **48** `PolyCut.cut` calls (RA-2). The base file (§8) listed these as never-run |
| `neighbourhood.utils.Offsetter.(anon@257647) (67)` | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | a rarely-taken branch inside the green inset `[INFERRED]` |
| `utils.ArrayExtender.find (83)` | 0 | 0 | 0 | 0 | 0 | 0 | 122 | 108 | = `BisectorEx.split` |
| `utils.ArrayExtender.max (109) / shuffle (142) / subset (46)` | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | one call each per generation. Most plausibly a pick among shuffled candidates during ring construction `[INFERRED]` |
| *(non-watabou)* `haxe.ds.ObjectMap.get (36) / keys (117)` | 0 | 0 | 0 | 0 | 0 | 0 | 14127 / 482 | 15005 / 436 | new object-keyed map lookups. `ObjectMap.set` rises from 169–2889 to **12458 / 12609**. This is BisectorEx / ExPolygon bookkeeping (RA-6) |

Still **never executed** in all 10 coverage samples `[NAMED-ONLY]`: `Settings.getInfo (601)` (so `tags=ring` does *not*
close it), `BisectorEx.detectStraight (135)`, `BisectorEx.getGap (21)`, `SquareHood.buildRound (1669)` (it ran only in the
base *profile* pass), `findBuilding (547)`, `getGreenTable (205)`, `assemble (7272)`, `PolyCut.peel`,
`ArrayExtender.some/removeAll`. `Hood.bisectArea (313)` did not run in the ring runs.

**Previously seen routines whose counts are unusual here `[SHOWN]`**

| symbol | other 8 runs | R1 | R2 | reading |
|---|---|---|---|---|
| `Hood.bisectArea` | 1 (A), 2 (Q, S) | **0** | **0** | the ring template never bisects the whole hood. `createBlocks` calls `BisectorEx.partition` once per annulus instead |
| `Hood.getName` (36 B) | 1 (A), 0 (Q, S) | 0 | 0 | overridden by `RingHood.getName` (196 B) |
| `Hood.semiSmooth` vs `Hood.getStreetWidth` | equal in all 8 | 127 vs 122 | 108 vs 104 | the difference is exactly the "Alternative cut" count (RA-3) |
| `PolyCreate.stripe` | = `Street.new` (A, Q) | 122 | 104 | = `Street.new − R`: ring roads get no stripe and no drawn width from `getStreetWidth` |
| `Bisector.makeCut − Bisector.detectStraight` | = `Street.new − k` (CA-2) | 5 | 0 | only the **centre's** street cuts go through the plain Bisector |
| `Bisector.partition − Normal.populate` | = `bisectArea` | 1 | 1 | `createCenter`'s attempt (sampled parent in R1) |
| `Normal.indentFronts` vs `Normal.populate` | equal in all 8 | **105 vs 106** | 87 = 87 | the first inequality recorded: one R1 Normal block skipped the setback |
| `PolyCut.enlarge` | = `Manor.addGreen` in all 8 | 6 = 4 + **2** | 11 = 8 + **3** | one extra call per ring, from `createBlocks` (sampled, R1) |
| `PolyCut.cut − BuildingView.hatchRoof` | 0–1 | **192** | **288** | = 48 × `PolyCut.shrink` |
| `PolyBounds.aabb` / `PolyTransform.rotateYX` | 0–13 / 2–28 | 22 / 46 | 25 / 52 | `rotateYX`'s sampled parent is `MapScene.layout` (view framing), not the model |
| `Manor.new` / `Empty.new` | A: 2–7 / 0–2 of 43–66 blocks | 9 / 10 of 123 | 9 / 9 of 105 | `Empty` share 8–9 % (area 0–3 %, square 6–8 %) |
| `BlockContent.new − Block.new` | 0–1 | 2 | 1 | the base's "content retry" (§7), once more than seen before |
| `Settings.oneOf` | 4 (random), 6 (Q), 5 (S) | 5 | 5 | one tag was supplied (`ring`) and two were resolved (`ring, medium`). So CA-1's "3 + supplied tags" should read **"3 + resolved tags"** |
| `Chaikin.render − FillablePoly.new` | 0 (A, Q2, S2), 3 (Q1), 1 (S1) | 1 | 0 | `createRings → Chaikin.render` is sampled in R1. Templates smooth some of their own seed geometry with Chaikin |

### RA-2. Identities: the CA-2 table extended to the ring runs, and the ring template's own arithmetic `[SHOWN]`

Source: `captures/neighbourhood/2026-09-21T07-20-25/coverage/gen-{0,1}.calls.json` (every count below re-derived with python
from the raw files; scratch output `ring2/identities2.txt` in the session scratchpad), plus the two `console.jsonl` retry counts
(RA-3). Columns A0/A1/Q1/Q2/S1/S2 are copied from CA-2 and re-checked against their `calls.json`.

| quantity | A0 | A1 | Q1 | Q2 | S1 | S2 | R1 | R2 |
|---|---|---|---|---|---|---|---|---|
| `Hood.bisectArea` | 1 | 1 | 2 | 2 | 2 | 2 | **0** | **0** |
| `Hood.getCloud` | 2 | 1 | 2 | 2 | 2 | 2 | 2 | 2 |
| `Street.new` (= `getCourse` = `drawPolyline`) | 65 | 63 | 104 | 63 | 12 | 4 | 124 | 107 |
| `Block.new` | 66 | 64 | 104 | 63 | 13 | 5 | 123 | 105 |
| `Street.extend` | 130 | 126 | 206 | 124 | 24 | 8 | 248 | 214 |
| `Bisector.partition` | 65 | 57 | 90 | 56 | 14 | 7 | 107 | 88 |
| `Normal.populate` | 64 | 56 | 88 | 54 | 12 | 5 | 106 | 87 |
| `Bisector.makeCut` | 1334 | 1299 | 2474 | 1494 | 208 | 199 | 2066 | 2002 |
| `Bisector.detectStraight` | 1269 | 1236 | 2373 | 1434 | 197 | 196 | 2061 | 2002 |
| `Building.new` | 779 | 736 | 1343 | 762 | 96 | 71 | 1287 | 1209 |

**Five measured quantities, plus N derived from them, define the ring runs** (all `[SHOWN]`):

| symbol | meaning (how it is measured) | R1 | R2 |
|---|---|---|---|
| R | ring roads = `BisectorEx.new` = `BisectorEx.partition` = `RingHood.unhole`; also the number of 50-segment road strokes at one shared width (RA-5) | 2 | 3 |
| S | twisted split attempts = `BisectorEx.split` = `ArrayExtender.find` | 122 | 108 |
| AC | "Alternative cut" lines, `BisectorEx.hx:215` (RA-3) | 5 | 4 |
| TA | "Trying again" lines, `BisectorEx.hx:237` (RA-3) | 1 | 1 |
| C | plain-Bisector street cuts = `Bisector.makeCut − Bisector.detectStraight` | 5 | 0 |
| N = S − AC | accepted twisted cuts (streets made by `BisectorEx`) | 117 | 104 |

Every one of these holds **exactly** in both runs. The full run is 23 checks with 0 failures in `ring2/identities2.txt`;
the ring-specific ones are:

| identity | R1 | R2 |
|---|---|---|
| `BisectorEx.makeCut` = S + TA | 123 = 123 | 109 = 109 |
| `BisectorEx.(anon@251898)` = S + R | 124 = 124 | 111 = 111 |
| `BisectorEx.subdivide` = `ExPolygon.area` = 2N | 234 = 234 | 208 = 208 |
| `ExPolygon.not` = 2N − R | 232 = 232 | 205 = 205 |
| `ExPolygon.new` = 2S + `ExPolygon.not` | 476 = 476 | 421 = 421 |
| `Hood.semiSmooth` = S + C | 127 = 127 | 108 = 108 |
| `Hood.getStreetWidth` = `PolyCreate.stripe` = N + C | 122 = 122 = 122 | 104 = 104 = 104 |
| `Street.new` = R + N + C | 124 = 124 | 107 = 107 |
| `Block.new` = N + C + 1 = `Street.new` − R + 1 | 123 = 123 | 105 = 105 |
| `Street.extend` = 2 × `Street.new` | 248 = 248 | 214 = 214 |
| `Bisector.partition` = `Normal.populate` + 1 | 107 = 107 | 88 = 88 |
| `RingHood.pierce` = `PolyCut.shrinkEq` = `PolyCut.shrink` = 2R | 4 = 4 = 4 | 6 = 6 = 6 |
| `PolyCut.cut − BuildingView.hatchRoof` = 48 × `PolyCut.shrink` | 192 = 192 | 288 = 288 |
| `PolyCut.enlarge − Manor.addGreen` = R | 2 = 2 | 3 = 3 |
| `PointExtender.project` = `Bisector.makeCut` (so `BisectorEx` makes **no** `project` call) | 2066 = 2066 | 2002 = 2002 |

**The CA-2 identities, generalised once more `[SHOWN]`:**

1. **`Block.new = Street.new + 1 − R`** (area and street: R = 0; ring: R = 2 / 3). `square` stays the special case of CA-2
   (`Block.new = Street.new`).
2. **`Street.extend = 2 × Street.new` holds for the ring template**, ring roads included.
3. **`Bisector.partition = Normal.populate + P`**, where P is the number of template-level plain-Bisector partitions:
   `Hood.bisectArea` for area / street / square (1 / 2 / 2), and one call from `RingHood.createCenter` for ring (its
   sampled parent in R1 is `createCenter`, `profile/gen-0.cpuprofile`). **`bisectArea` = 0 in both ring runs.**
4. **`detectStraight = makeCut − (Street.new − k)` still holds, but k = R + N = 119 / 107.** So k is no longer a
   small constant for each template. Nearly every street of a ring map is laid by the template (R ring roads) or cut by
   the new `BisectorEx` (N). Only the C = 5 / 0 streets that cross the centre disc come from the plain `Bisector`, and
   those are the only cuts that skip `detectStraight`.

**What the ring template lays down directly.** Arithmetic `[SHOWN]`, reading `[INFERRED]`:
* **R closed ring roads** (2 in R1, 3 in R2). They get no `semiSmooth`, no `getStreetWidth` and no `PolyCreate.stripe`
  (all three equal N + C). They are drawn at one width shared by every ring of the map (RA-5). Their corridor must come
  from the ring polygon itself: the 2R `shrinkEq` and R `enlarge` calls in `createBlocks` are the candidates.
* **R annular bands, one `BisectorEx.partition` each.** A band is the region outside ring *i* and inside ring *i+1*.
  The outermost band runs out to the hood edge. There is no rim road (RA-4).
* **The disc inside the innermost ring goes to `createCenter`.** In R1 the plain `Bisector` cuts it 5 times, giving 6
  blocks (the drawn centre has 6 blocks, RA-4). In R2 the same partition call runs (`partition − Normal.populate` = 1)
  but makes **zero** cuts (C = 0). `createCenter` then builds a `Green` (sampled chain in R2
  `createCenter → Green.new → Green.populate → addGreen → addGrove`). That is the creator's stated rule, *"If the smallest
  ring is too small to be cut into blocks, a square, a grove or a single large building is placed there instead"*
  (`[STATED]`, `watabou-extra-b.md` §T2, post 70917627). R2 is a recorded instance of the "grove" branch.

**How `BisectorEx` differs from `Bisector`.** Counts are `[SHOWN]`. Readings are `[INFERRED]` unless tagged otherwise.
* **The first accepted cut of each band opens the annulus without splitting it.** Take R root `subdivide` calls, plus one
  child for each band's first cut, plus two children for every later cut. That gives R + R + 2(N − R) = 2N, which is
  exactly `BisectorEx.subdivide`. `ExPolygon.not` = 2N − R (one per child) agrees. `Block.new` = N + C + 1 agrees too:
  had the first cut split the annulus in two, `Block.new` would be N + R + C + 1 = 125 / 108, not the recorded
  123 / 105. So each band yields exactly as many blocks as it has streets. This is the *slit* reading proposed in
  `watabou-extra-b.md` §T1 (a hole-bearing polygon is made simply connected by its first cut). These counts now support
  that reading.
* **The street corridor is carved out during the cut, not afterwards.** `Hood.getStreetWidth` is sampled under
  `BisectorEx.makeCut` (R1). `ExPolygon.not` (a boolean difference, sampled child `PolyBool.and`) runs once per child piece
  and is sampled under `BisectorEx.makeCut`. The plain `Bisector` never subtracts a corridor; its street set-back happens
  later, in `Normal.indentFronts`.
* **The twisted cut never calls `PointExtender.project`.** `project` equals `Bisector.makeCut` in all 10 NG samples, and
  `BisectorEx` adds 0 to it. Yet the ring streets visibly meet both rings at right angles (RA-4). So the 1 : 1
  `project` identity that CA-5 read as the "arrive at a right angle" step belongs to the plain `Bisector` only. The
  twisted cut gets its right angles some other way.
* **The bent street is rounded with a circular arc.** `Hood.getArc` is sampled under `Hood.semiSmooth ←
  BisectorEx.makeCut` in both runs. `getArc` = `getCircle` = `Circle.new` = 57 / 41, which is 45 % / 38 % of the
  `semiSmooth` calls. RA-9 has the consequence for §3.1.
* **Lot-level slivers are more frequent.** Compare `2·Bisector.makeCut + Bisector.partition − Bisector.subdivide`: it is
  34 (R1) and 42 (R2), against 4–16 in the four area runs, 26 / 0 in Q1 / Q2 and 0 / 10 in S1 / S2. `[INFERRED]` More
  degenerate lot cuts happen in the thin, curved blocks of the bands.

**Per-band street counts.** These come from the order in which streets are drawn (RA-5). `[SHOWN]` order; the assignment
to bands is `[INFERRED]`:

| region (processed outside-in) | R1 streets = blocks | R2 streets = blocks |
|---|---|---|
| outer band (outermost ring → hood edge) | 64 | 61 |
| middle band | — | 35 |
| inner band | 53 | 8 |
| centre disc | 5 cuts → 6 blocks | 0 cuts → 1 `Green` block |
| **total** | N = 117, C = 5, Block = 123 | N = 104, C = 0, Block = 105 |

The group sizes add up to exactly the coverage-derived N and C. The order is outside-in: the 8-street group is R2's
narrow innermost band, which visibly holds about 8 blocks (RA-4). `createCenter` is sampled last in both profiles, and
the centre's 5 streets are drawn last in R1.

### RA-3. The console retry trace: "Alternative cut" and "Trying again" `[SHOWN]`

Source: `captures/neighbourhood/2026-09-21T07-20-25/{profile,coverage,draw}/console.jsonl`, all 18 lines of each read. The
trace is **identical in all three independent page loads** of each seed:

| seed | order of the lines after `Hood.hx:42` | `BisectorEx.hx:215` "Alternative cut" | `BisectorEx.hx:237` "Trying again" |
|---|---|---|---|
| 7171 (R1) | AC, AC, AC, TA, AC, AC | 5 | 1 |
| 7172 (R2) | TA, AC, AC, AC, AC | 4 | 1 |

Comparison with every other NG console trace (`console.jsonl` of all passes, read in full):

| capture | tags | generations traced | `Hood.hx:42` lines | `BisectorEx` lines |
|---|---|---|---|---|
| `05-04-54` (profile / coverage / draw) | random: medium + area / square / street (+ leafy) | 12 | 12 | **0** |
| `05-38-59` (coverage / draw) | large, square, leafy | 4 | 4 | **0** |
| `05-40-05` (coverage / draw) | small, street | 4 | 4 | **0** |
| `07-20-25` (profile / coverage / draw) | ring, medium | 6 | 6 | 27 AC + 6 TA in total: 5 AC + 1 TA in each of the three 7171 loads, 4 AC + 1 TA in each of the three 7172 loads |

The other captures never print a retry line, because `BisectorEx` never runs outside the ring template (every `BisectorEx.*`
count is 0 in the 8 other coverage samples, RA-1). The plain `Bisector` has no console trace at all.

**What the two messages are.** Arithmetic `[SHOWN]`, reading `[INFERRED]`:
* **"Alternative cut" is a split that was made and then thrown away, followed by one more split that is kept.**
  `BisectorEx.split` = N + AC exactly. `Hood.semiSmooth` = S + C also counts the discarded splits, while
  `Hood.getStreetWidth`, `PolyCreate.stripe`, `ExPolygon.not` and `Street.new` count only accepted ones.
  So the rejected cut was fully built (course and smoothing) and then judged bad on its result. That fits a
  post-split validity test on the pieces, most plausibly one that fires when a piece comes out too thin or when the cut
  runs into the hole. The rejection rate is 5 of 122 splits (4.1 %) in R1 and 4 of 108 (3.7 %) in R2.
* **"Trying again" is `makeCut` calling itself before any split.** `BisectorEx.makeCut` = S + TA exactly, and a
  `BisectorEx.makeCut ← BisectorEx.makeCut` frame is sampled in both profiles. The failed attempt therefore never
  reached `split`: no usable cut line was found for that piece, and the routine restarted with fresh random parameters.
  It happened once per map (about 1 % of twisted cuts).
* **Both retries are local.** In both runs every whole-map stage runs exactly once: `Hood.create`, `Hood.populate`,
  `RingHood.build/createShape/createRings/createBlocks/createCenter`, `Settings.processTags`, `PoissonPattern.new`,
  `Namer.reset`. So neither message discards the map or even a band. The failure is repaired inside the one
  `makeCut`/`split` that met it, and the rest of the subdivision is unaffected; each AC costs exactly one extra split.
  The traces are consistent with the creator's own warning that the hole-aware bisection *"is still pretty glitchy, but
  it works"* (`[STATED]`, `watabou-extra-b.md` §T1, post 70917627). The recording cannot show whether the retry loop has
  a cap (a maximum of 1 TA was ever needed) or what the fallback is if every alternative fails.
* **Robustness reading for a re-implementer.** `[INFERRED]` The hole-aware bisector needs a *validate → alternative →
  retry* loop around each cut, and the generator relies on it being local. The plain `Bisector` has no such loop; its
  only failure handling is the silent sliver drop measured by the `subdivide` deficit (§7, RA-2).

### RA-4. What the two screenshots show `[SHOWN]`

Sources: all six `gen-{0,1}.png` files (profile / coverage / draw) viewed. The three per seed are the same picture (RA-0).
Positions are pixel coordinates in the 1500 × 1100 coverage screenshots. Ring radii and centres were measured, not
eyeballed: road-coloured pixels (`#a69e92` ± 12) were tracked along 360 rays from the ring centre (scratch
`ring2/ringtrack.py`, `ring2/profiles.py`), with an accuracy of a few pixels. Road-only masks are `ring2/roadmask2_R{1,2}.png`.

**"Night Round" (seed 7171, R1).**
* **Hood.** A lumpy, rounded lozenge about 920 × 980 px (x 285–1205, y 55–1035). It has **no rim road**: streets simply
  stop at the edge as short spurs, and small greens and tree clumps sit on the rim, as in the other templates.
* **Two ring roads, visibly bolder than every other street.** The inner ring has mean radius ≈ 86 px (range 72–96) and
  is an egg or rounded triangle pointed at the top. The outer ring has mean radius ≈ 309 px (range 278–339) and is an
  egg flattened on its upper-left side. The centroids are (786, 533) and (777, 530), so the rings are concentric to
  within about 9 px. Their common centre sits about 35 px right of the hood's bounding-box centre. Neither ring is a
  scaled copy of the other: their normalised radial profiles correlate at −0.69 (RA-7).
* **Centre.** A disc about 170 px across, cut by **5 short, nearly straight streets into 6 blocks**. They meet the ring
  and one another in T-junctions at right angles. One of the 6 blocks is a narrow green strip with 2 trees, with no houses.
  `[INFERRED]` That block is an `Empty` block carrying a grove (`Empty.addGrove` = 2 in R1).
* **Inner band (r ≈ 86 → 309).** 53 streets, mixing radial spokes with cuts that run roughly parallel to the rings. The
  blocks are curved trapezoids with houses around the edge and hollow or green interiors, the NG perimeter-block look.
  Streets leave each ring at a right angle and bend once in between.
* **Outer band (r ≈ 309 → edge).** 64 streets. The radial streets run on to the edge.
* **Radial streets are staggered across the outer ring.** They do not continue from one band into the next.
  `[INFERRED]` This follows from each band being bisected independently (one `BisectorEx.partition` per band).
* **Landmarks.** Three green domes inside walled compounds, at (495, 322), (833, 245) and (637, 738); this matches
  `drawDome` = `Cupola.new` = 3. There is a fountain on a pale paved apron at (1035, 797), a small square well at
  (812, 882), and pale paved `Empty` yards, for example around the fountain.
* Title at bottom-left.

**"Small Ward" (seed 7172, R2).**
* **Hood.** An oval about 1155 × 980 px (x 165–1320, y 45–1025), with no rim road.
* **Three ring roads.** Their radii are ≈ 55 px (a rounded triangle around the grove), ≈ 182 px (161–206) and about
  350–370 px (the tracker lost this ring behind buildings; on the mask it spans x 340–1080, y 205–905). The ring
  spacing widens outwards: about 55, 127 and 170–190 px from centre to ring 1, ring 1 to 2, and ring 2 to 3.
* **Centre.** A **grove**: about 15 overlapping trees on a green that fills the innermost ring completely, with no
  houses. This is the `Green` block from `createCenter` (RA-2).
* **Innermost band (r ≈ 55 → 182).** About 8 blocks between 5–6 radial spokes and a couple of cross streets,
  including one very large hollow block to the west of the grove. It is the 8-street group of RA-2.
* **Middle and outer bands.** 35 and 61 streets respectively. Some outer-band streets overshoot the hood edge as bare
  road spurs.
* **Landmarks.** Walled manor compounds sit mostly in the outer band near the rim. Two have pyramid-roofed halls, at
  (215, 600) and (1155, 583) (`drawPyramid` = 3), and two have green domes, at (365, 285) and (390, 910) (`drawDome` = 2).
  A fountain stands on a paved yard at the west rim (215, 657). Two small square wells stand in pale paved yards, at
  (1083, 472) and (350, 806); this matches `WellView.new` = 2.
* Title at top-left.

**Counts against CA-3's templates** (coverage `calls.json`, same seeds as the pictures):

| | R1 ring | R2 ring | area A0–A3 | square Q1 / Q2 | street S1 / S2 |
|---|---|---|---|---|---|
| buildings | 1287 | 1209 | 600–779 | 1343 / 762 | 96 / 71 |
| blocks | 123 | 105 | 43–66 | 104 / 63 | 13 / 5 |
| streets (ring roads included) | 124 | 107 | 42–65 | 104 / 63 | 12 / 4 |
| buildings per block | 10.5 | 11.5 | 11.8–14.0 | 12.9 / 12.1 | 7.4 / 14.2 |
| Normal / Manor / Empty / Green | 106 / 9 / 10 / 0 | 87 / 9 / 9 / 1 | 39–64 / 2–7 / 0–2 / 0 | 88 / 11 / 6 / 0; 54 / 4 / 5 / 0 | 12 / 1 / 0 / 0; 5 / 0 / 0 / 0 |
| trees (`Tree.new`) | 70 | 112 | 33–100 | 255 / 223 | 2 / 0 |
| wells / fountains | 1 / 1 | 2 / 1 | 0 / 0–1 | 1 / 1; 1 / 1 | 0 / 0 |

**Comparison with CA-3.** Shapes are `[SHOWN]`; readings are `[INFERRED]`.
* Ring is the **only template whose street graph contains closed loops**. In area, street and square the streets form
  a tree of cuts (`Block = Street + 1`, or `Block = Street` for square). Here each ring road closes on itself, so it
  adds a street without adding a block (identity 1 of RA-2).
* Ring and square both have a **special centre**. In square the centre is an unbuilt paved plaza that orients the whole
  grid. In ring it is a small disc that is either bisected like any block (R1) or replaced by a grove (R2). Neither map
  has a plaza, although the grammar's `SQUARE?-` branch and the creator's rule both allow a square.
* In area, streets run at arbitrary angles. In square they follow the plaza's axes. In street they hang off one S-curved
  spine. **In ring, every band's streets meet the ring roads at right angles**, which gives a spider-web of spokes and
  arcs. That matches the creator's description of ring neighbourhoods: staggered radial streets, each annulus cut into a
  different number of sectors, and lots facing the ring road (`watabou-extra-b.md` §T2).
* At `medium` size, ring maps carry about 1.6–2.1× the buildings and 1.6–2.9× the blocks of the four `medium` area
  maps. Buildings per block are similar (10.5–11.5 against 11.8–14.0). So the ring hood is larger, or its blocks
  smaller, for the same size tag. The two cannot be separated, because the view rescales every map to fit the canvas.

### RA-5. Draw record: what is new against §4 `[SHOWN]`

Sources: `draw/gen-{0,1}.draw.json` (41 442 and 39 422 log entries, none dropped), `report.md` lines 343–1064, and the
grammar asset `coverage/network/bodies/0014-376f0102.json`. The grammar is byte-identical to the base capture's
`0016-376f0102.json` (checked with `cmp`). Scratch scripts: `ring2/layers.txt`, `ring2/roads.txt`.

**Coverage and draw agree count for count.** Here the coverage pass and the draw pass were separate page loads with the
*same* seeds, which the base capture did not have. So model counts can be matched against paint operations one to one:

| model count (`coverage/gen-N.calls.json`) | paint count (`draw/gen-N.draw.json`) | R1 | R2 |
|---|---|---|---|
| `Street.new` | `#a69e92` road strokes with > 0 segments | 124 = 124 | 107 = 107 |
| `GraphUtils.shortStroke` | `#222222` 3-segment fills (hatch triangles) | 23 101 = 23 101 | 21 739 = 21 739 |
| `Tree.new` | crown fills (≥ 100 segments) on per-tree canvases = tree-shadow blobs (same segment multiset) | 70 = 70 | 112 = 112 |
| `Wing.addChimney` | units of the layer §4.3 calls "Props (wells)" | 33 = 33 | 12 = 12 |
| `WellView.new` | tiny 3-op stone canvases | 1 = 1 | 2 = 2 |
| `FountainView.new` | 6-op canvases with a `[CanvasGradient]` fill | 1 = 1 | 1 = 1 |
| 2 × (`BuildingView.drawDome` + `FountainView.new`) | `createRadialGradient` | 8 = 8 | 6 = 6 |
| `Namer.ring` output | the one `fillText` | "Night Round" | "Small Ward" |

**Layer order is unchanged from §4.3:** greens (canvas 918×955 / 1127×922; 45 / 37 fills) → roads (904×998 / 1167×1022;
249 / 216 ops) → shadows (916×995 / 1152×988; 10 815 / 10 377 ops) → buildings (893×993 / 1116×990; 29 737 / 28 046 ops)
→ the stone-and-flue layer (674×881 / 874×773; 164 / 59 ops) → one canvas per tree → title. One tree is painted before
the buildings canvas in R1 and none in R2. There is **no new layer**: ring roads are painted in the ordinary road layer,
in among the other streets.

**Ring roads in the road layer.**
* There are exactly R strokes of **exactly 50 segments**, all at **one width per map**: 6.556 px twice in R1 and 6.125 px
  three times in R2. Each is followed by **two** 0-segment terminator strokes; an ordinary street has one.
* The ordinary streets: R1 has 122 strokes of 4.272–5.814 px (mean 4.676, sd 0.252); R2 has 104 strokes of 5.213–6.244 px
  (mean 5.527, sd 0.161). They have 3–16 segments, about 5 on average.
* The ring width is 1.40× the mean street width in R1 but 1.11× in R2. R2 also has one ordinary street (6.244 px) wider
  than its rings. So the ring width is one value per map. It is neither a fixed multiple of the street widths nor
  their maximum. `[INFERRED]` The template sets it directly, which fits the rings never calling `getStreetWidth` (RA-2).
* `[INFERRED]` 50 segments is a closed 48-vertex polyline plus 2 repeated wrap-around points; the 48 comes from the
  `PolyCut.shrink` arithmetic of RA-2. A 49-vertex polygon closed with one repeated point would also give 50. The
  segment count is the same for rings with radii from ≈ 55 to ≈ 360 px, so the ring resolution is fixed and does not
  grow with ring size.
* **Streets are painted in creation order.** The road-stroke sequence reads [64 streets][ring][53][ring][5] in R1 and
  [61][ring][35][ring][8][ring] in R2. This gives the per-band table in RA-2.

**Label text.** The titles are "Night Round" (7171, bottom-left) and "Small Ward" (7172, top-left), drawn in
`72px Voltaire #4c463c` as in §3.12. The grammar has:
`ringHood: ["{#adj#|0.2?-#proper#{'s}} #ring#", "0.5?-#regularHood#", "0.1?-#streetHood#", "SQUARE?-#squareHood#",
"MANOR?-#manorName#", "PARK?-#parkHood#"]` and
`ring: ["ring", "circle", "loop", "hill", "0.5?-band", "0.5?-round", "0.1?-circus", "0.05?-belt"]`.
* "Night Round" is the first option: adjective *night* plus the half-weight *round*.
* "Small Ward" comes through the 0.5-weighted fall-through to `regularHood`, which ends in `#ward#`, with adjective
  *small*. So **a ring hood's name need not mention a ring**. The titles and the grammar are `[SHOWN]`; which
  `regularHood` option fired is `[INFERRED]`.
* `Markov.generate` = 0 in both runs, so no invented surname was needed.

**Palette and strokes are unchanged.** The same three stroke colours appear (`#222222`, `#7a8499`, `#a69e92`). Joins are
round everywhere, caps are square on road strokes only, and there are no dashes. The 12 / 14 fill colours that appear in
none of the 8 other NG draws are just further samples of the continuous roof (brown) and tree (green) jitter of §3.6 and
§3.9. They are not new palette entries.

**Per-wing budgets hold.** Hatch triangles per wing are 17.7 / 17.6 (base 17.1–18.9). Shadow quads per wing are
2.41 / 2.44 (base 2.31–2.43). Tree-shadow blobs have exactly the crown polygons' segment counts, so H10 holds. The ring
maps are the second- and third-heaviest NG draws recorded (41 442 / 39 422 entries, after 43 496 for the `large`
square map Q1). Entry counts follow wing counts (1305 / 1233, against 1377 for Q1).

**Corrections to §3.10 and §4.3.** These come from same-seed coverage/draw pairs, which exist in this capture and in
`05-38-59` / `05-40-05` (seeds 5151/5152 and 6161/6162), but not in the base capture:
* **The "Props (wells)" layer is chimneys.** One unit is a `#bfbfbf` quad, its outline, and an
  `rgba(34, 34, 34, 0.8)` quad. The number of units equals `Wing.addChimney` exactly in all 6 same-seed pairs: R1 33/33,
  R2 12/12, Q1 34/34, Q2 13/13, S1 2/2, S2 3/3. So each unit is a stone chimney stack with a dark flue, painted above the
  roofs. That also explains why §3.6 found `drawChimney` called once per building while only about 3 % of wings get a
  chimney. `[SHOWN]`
* **Wells are the tiny 3-op canvases**: a stone fill, its outline, and a dark shaft. Their count equals `WellView.new`
  (R1 1, R2 2, Q1 1, Q2 1, S 0). Square wells are drawn with `rect`, which gives 1-segment paths and 3 `rect` calls per
  well: R1 has rect 3 for 1 well, R2 6 for 2, Q2 3 for 1, and base draw gen-1 and gen-2 each 3 for 1. Q1's well uses
  2-segment (round) paths and has rect = 0. §3.10 read these canvases as fountains. `[SHOWN]`
* **Fountains are the 6-op canvases with a `[CanvasGradient]` basin**: stone ring, gradient basin and stone centre, each
  outlined. Their count equals `FountainView.new`: 1 in R1, R2, Q1 and Q2, and 0 in S. The base draw pass contains no such
  canvas. `[SHOWN]`
* **`createRadialGradient` = 2 × (`drawDome` + `FountainView.new`)** in all 6 same-seed runs (R1 8, R2 6, Q1 6, Q2 6,
  S1 2, S2 0). So the 2 and 4 gradients in the base draw gen-2 and gen-3 are domes, not fountains. `[SHOWN]`
* **H13 (every tree crown has a multiple of 4 vertices) is not a strict invariant.** R2 has one standard 6-op tree
  whose crown fill has 163 segments (≡ 3 mod 4). The same test on the other NG draws finds 3 more in base draw gen-1
  (135, 163 and 147 segments, all standard 6-op trees), 3 in Q1 and 1 in Q2: 8 of 958 crowns in all (0.8 %). The same
  test counts 317 crowns in the four base draws. So §3.9's "314 of 314" appears to leave out exactly those three.
  `[INFERRED]` The corner-bulging construction sometimes drops or merges 2 vertices, which makes the multiple-of-4 rule a
  strong tendency (99 %) rather than a law.

### RA-6. Cost model for the ring template `[SHOWN]`

Sources: `profile/gen-{0,1}.cpuprofile`, and `report.md` lines 1086–1840 for the whole-run totals. Stage totals are
inclusive and non-recursive, labelled with the method of RA-0 (script `stages.py`, rerun in this session; output
`ring2/stages_rerun.txt`). They reproduce `report.md`'s `MapScene.reset` 96.0 / 77.7 ms and `Hood.create` 55.0 / 43.5 ms.
**R2 (a reload) is the clean run.** R1 is a cold load that also pays for `lime.media.AudioContext.new`. The base
comparison column is §5.2 gen-2 (`area`); its building and street counts are unknown, because the base profile seeds
differ from its coverage seeds.

| | R1 7171 (cold) | R2 7172 (reload) | base gen-2 area (§5) |
|---|---|---|---|
| wall / busy / idle ms | 1956.5 / 467.5 / 1489 | 4713.8 / 454.9 / 4258.9 | 1394.5 / 238.7 / 1155.8 |
| GC / native ms | 17.5 / 51.7 | 10.2 / 218.6 | 5.5 / 105.0 |
| `lime.media.AudioContext.new` | **124.3** (27 % of busy) | 0.8 | — (204.7 in base cold gen-0) |
| **`MapScene.reset`** | **96.0** | **77.7** | 47.1 |
| `Hood.create` (model) | 55.0 | 43.5 | 21.2 |
| ├ `RingHood.build` / `AreaHood.build` | 19.9 | 18.3 | 3.3 |
| │ ├ `createShape` / `createRings` | 0.5 / 0.1 | < 0.1 / < 0.1 | — |
| │ ├ `BisectorEx.partition` (all bands) | 16.0 | 12.2 | (`bisectArea` 3.1) |
| │ │ ├ `ExPolygon.not` / `ExPolygon.new` | 3.8 / 2.2 | 2.9 / 1.6 | — |
| │ ├ `PolyCut.shrinkEq` | 1.2 | 2.4 | — |
| │ ├ `RingHood.createCenter` | 1.2 (plain `Bisector`) | 2.2 (`Green` + first `PoissonPattern` build 1.8) | — |
| ├ `Hood.populate` | 31.1 | 23.2 | 17.2 |
| │ ├ `Normal.populate` | 25.0 | 21.1 | 14.6 |
| │ │ ├ `Bisector.partition` (lots; R1 also the centre) | 11.4 | 8.7 | 7.2 |
| │ │ ├ `indentFronts` / `createGreen` / `Building.new` | 4.7 / 2.8 / 2.5 | 2.8 / 3.1 / 2.6 | 3.8 / — / 1.6 |
| │ ├ `Manor.populate` | 4.5 (incl. first `PoissonPattern` build 2.3) | 1.0 | 2.5 |
| ├ `RingHood.getName` → `Namer.ring` | 2.9 | 1.7 | — |
| `MapScene.updateView` (view) | 41.1 | 33.8 | 25.9 |
| ├ `BuildingView.draw` (→ `hatchRoof`) | 19.2 (11.7) | 15.4 (10.6) | 13.7 (9.3) |
| ├ `Roads.setMode` (→ `Street.extend`) | 5.8 (5.1) | 4.5 (3.4) | 4.3 (3.5) |
| ├ `HoodView.placeTree` / `setShadows` | 5.5 / 4.2 | 5.5 / 4.7 | 3.1 / 1.8 |
| `MapScene.layout` | 4.3 | 1.6 | — |
| rasterisation: `Context3DShape.render` | 110.6 | 100.1 | 73.3 |

**Readings.**
* **The street layer costs about 6× more than in `area`.** `RingHood.build` takes 18.3–19.9 ms, against 3.3 ms for
  `AreaHood.build`. Per street that is 0.16–0.17 ms (124 / 107 streets), against about 0.05–0.08 ms if base gen-2 had
  the 42–65 streets of the area coverage runs. So a twisted, hole-aware cut costs roughly 2–3× a plain street cut.
  `[INFERRED]` for the per-street ratio, because the base street count is estimated.
* **Half of the extra cost is bookkeeping, not geometry.** Inside `MapScene.reset`, `haxe.ds.ObjectMap` accounts for
  5.0 ms (R1) and 7.3 ms (R2) of self time. That is as much as `BisectorEx`'s own self time (5.0 / 1.4 ms), and in R2 it
  is the third-largest class after `PolyBounds` and `openfl.display.Graphics`. `ObjectMap.get` (14 127 / 15 005 calls)
  and `.keys` (482 / 436) run **only** in the ring runs, sampled under `BisectorEx.makeCut`. `ObjectMap.set` rises from
  169–2889 elsewhere to 12 458 / 12 609, sampled under `ExPolygon.new`, `BisectorEx.split` and `PolyCut.cut`.
  `[INFERRED]` `ExPolygon`, the polygon-with-holes type, keeps object-keyed maps (for example vertex → next vertex, or
  vertex → ring) that `makeCut` walks with `keys()`. A re-implementation using index arrays would drop most of this
  cost.
* **Model and view shares stay the same.** The model is 57 % / 56 % of `MapScene.reset` (base: 45–61 %), and lot
  bisection is still the largest single model cost (8.7–11.4 ms). Per building, one generation costs 75 µs (R1) and
  64 µs (R2) of `MapScene.reset`. As in §5, **rasterisation (100–111 ms) costs more than the whole generation**, and the
  view scales with wing count: hatching is 61–69 % of `BuildingView.draw` (base 68 %).
* **`PoissonPattern` is built wherever it is first needed** (RA-8). In R1 that is during `Hood.populate` (under a Manor
  grove, 2.3 ms). In R2 it is during `RingHood.build`, under the central grove (1.8 ms). So the first-use cost moves
  between pipeline stages from map to map.
* **Idle and native time on the reload are harness effects, not generator work.** R2's 4.26 s idle and 218.6 ms
  native come from the reload waiting on the three web fonts (RA-0).

### RA-7. How `RingHood` builds its seed geometry: hypothesis and discriminating tests

**What the counts and the sampled call trees rule in or out.** All rows `[SHOWN]` unless a row says otherwise.

| candidate primitive | evidence | verdict for the rings |
|---|---|---|
| `PolyCreate.regular` (a regular n-gon) | 1 / 1, equal to `FountainView.new` (1 / 1). `regular` = fountains in 9 of the 10 NG samples (Q1: 2 against 1) | **not used**; the one call is the fountain |
| `PolyBounds.circle` | 0 / 0 (only the square template calls it) | **not used** |
| `geom.Circle.new` | exactly `Hood.getCircle` (57 / 41) | no circle object is made for the rings |
| `Hood.getCloud` | = `MapScene.layoutTitle` = `HoodView.setViewport` in all 10 samples; sampled parent `MapScene.layout` in R1 and in base profile gens 1–3 | **view framing**, not model geometry (RA-9) |
| `Hood.getCircle` / `getArc` | sampled under `Hood.semiSmooth ← BisectorEx.makeCut` in R1 and R2 | fillets on street bends, not rings |
| `Offsetter.*` | `run` = `runEq` = `filter` = `Normal.createGreen` exactly (41 / 31) | greens only |
| `Hood.bisectArea` | 0 / 0 | not used |
| `PolyBounds.obb` | sampled under `RingHood.createShape` (R1) | outline orientation / fitting |
| `PolyTransform.asScale` | 1 in all four area runs and both ring runs, 0 in all square and street runs | `[INFERRED]` scales the outline inside `createShape`, which only the area and ring templates have (1170 B and 1434 B) |
| `Chaikin.render` | 1 extra in R1 (sampled under `createRings`), 0 extra in R2 | an optional smoothing step, not applied to every ring |
| `ArrayExtender.shuffle` / `subset` / `max` | 1 each per ring generation, never elsewhere | a pick among shuffled candidates |
| `RingHood.(anon@221960)` (35 B, inside `createRings`' byte range 221864–222645) | 11 / 14 calls | a scoring or filtering callback during ring construction |
| `PolyCut.shrinkEq` → `shrink`, `PolyCut.enlarge`, `RingHood.pierce`, `RingHood.unhole` | `shrinkEq` = 2R, `enlarge − Manor.addGreen` = R, `pierce` = 2R, `unhole` = R. `shrinkEq`, `enlarge` and `unhole` are sampled under `createBlocks`, after `createRings` in time. Each `shrink` makes exactly **48** `PolyCut.cut` calls | the per-ring corridor and hole preparation, done on rings that already exist |

The 2017 ancestor's `Polygon.shrink` makes one `cut` per edge with a positive inset
(`reference/TownGeneratorOS/Source/com/watabou/geom/Polygon.hx:350–362`; `shrinkEq` at :364). If the live
`PolyCut.shrink` kept that structure, **every polygon shrunk in `createBlocks` has exactly 48 edges** `[INFERRED]`. That
fits the fixed 50-segment ring strokes of RA-5.

**Shape facts measured on the screenshots** (RA-4, `ring2/profiles.py`), `[SHOWN]` to within a few pixels:
* The rings are nearly concentric: the R1 centroids are 9 px apart.
* Each ring has its own low-order irregularity. The relative radial harmonics for n = 1–4 are 2–9 % of the radius; the
  inner R1 ring is dominated by n = 3 (an egg or rounded triangle) and the outer by n = 2.
* The normalised radial profiles of the two R1 rings are **anti-correlated (−0.69)**. The outer ring's profile correlates
  only weakly with the hood outline's (0.33), and the inner ring's not at all (−0.06).
* Every ring has the same resolution: 50 segments from r ≈ 55 px to r ≈ 360 px.
* The spacing between rings grows outwards: R1 86 → 309 px; R2 55 → 182 → about 360 px.

**Hypothesis H-R (`[INFERRED]`, built from the evidence above):**
```
RingHood.build():
    outline = createShape()                    # the template's own outline (1434 B); oriented/fitted via PolyBounds.obb,
                                               # scaled via PolyTransform.asScale
    rings   = createRings(outline)             # R closed rings about one centre, each an INDEPENDENT fixed-resolution
                                               # polar polygon: 48 vertices at 7.5° steps, radius rho_k times (1 + its own
                                               # low-frequency noise); the radii rho_k are picked from shuffled candidates
                                               # (shuffle / subset / max, scored by the closure); an optional Chaikin pass
                                               # (0–1 per map)
    createBlocks(outline, rings):              # outside-in
        for k = R down to 1:                   # band_k = (ring k+1, or the outline for the outermost band) minus ring k
            prepare edges: shrinkEq x2 (48 cuts each), enlarge x1, pierce x2   # corridor edges of ring k's road
            unhole(band_k)                     # one ExPolygon with one hole
            BisectorEx.partition(band_k)       # N_k twisted streets and N_k blocks; the first cut opens the annulus
            register ring k as a Street        # one per-map width, no stripe, no semiSmooth
        createCenter(disc inside ring 1)       # Bisector.partition -> C cuts; if C = 0 put a Green (grove) there,
                                               # which is the creator's stated fallback
```
Two readings were **rejected on this evidence**: rings as `PolyCreate.regular` circles (by counts), and rings as scaled
copies of one profile or of the outline (by the −0.69 and −0.06 correlations). An inward offset of the outline is
unlikely too: the inner ring's profile is unrelated to the outline's, and the resolution is fixed.

**Tests that would decide it.**
1. **Loop structure** (cheap: one more coverage + draw capture of several `tags=ring` seeds). For every seed:
   `BisectorEx.new` = `unhole` = R; `shrinkEq` = `pierce` = 2R; `PolyCut.enlarge − Manor.addGreen` = R;
   `PolyCut.cut − hatchRoof` = 96R; one 50-segment road stroke per ring at a single width; and the drawn street groups
   add up to N and C as in RA-2. Any seed that breaks one of these refutes the one-pass-per-ring loop. A seed with R = 1
   is the sharpest case (predicted 1 / 2 / 1 / 96).
2. **Fixed resolution.** If the rings are polar samples, every ring stroke keeps exactly 50 segments at any radius. A
   larger ring drawn with more segments refutes that and points to arc-length resampling instead.
3. **Construction of one ring.** Extend the draw recorder to store vertex coordinates for `#a69e92` strokes (today it
   keeps only segment counts). Polar sampling predicts vertex angles in 7.5° steps about a common centre. Scaled copies
   predict normalised profiles correlating at about 1 across rings. Inward offsets of the outline predict constant
   ring-to-ring spacing along the normals.
4. **Degenerate centre.** Across seeds, C = 0 must coincide with a `Green.new` (or a square or single large building)
   made under `createCenter`, and C ≥ 1 with none. A map with C = 0 and an ordinary centre block refutes the reading of
   the stated rule.
5. **Chaikin.** The extra `Chaikin.render` count (0 or 1) must stay below R. If it ever equals R, every ring is smoothed
   and ring construction is 24 → 48 vertex Chaikin rather than direct 48-point sampling.

### RA-8. CA-4 on the ring runs: `PoissonPattern` has k = 50 and is built lazily. **Confirmed** `[SHOWN]`

| run | `new` | `step` | `emit` | `warp` = `validate` | warp ÷ step | step ÷ emit | `fill` (= greens + groves) | sampled parent chain of `PoissonPattern.new` |
|---|---|---|---|---|---|---|---|---|
| R1 | 1 | 126 | 82 | 6300 = 6300 | **50.000** | 1.54 | 47 = 41 + 4 Manor + 2 Empty | `BlockContent.getPattern ← getPointsWhole ← Manor.addGrove ← Manor.addGreen ← Manor.populate` (inside `Hood.populate`) |
| R2 | 1 | 126 | 80 | 6300 = 6300 | **50.000** | 1.58 | 41 = 31 + 8 Manor + 1 Empty + 1 `Green` | `BlockContent.getPattern ← getPointsWhole ← Green.addGrove ← Green.addGreen ← Green.populate ← RingHood.createCenter` (inside `RingHood.build`, **before** `Hood.populate`) |

Sources: `coverage/gen-{0,1}.calls.json`, and `profile/gen-{0,1}.cpuprofile` for the parent chains (`ring2/callers_A.txt`).
* **k = 50 holds.** warp ÷ step is exactly 50 in both runs. That makes it 9 runs out of 9 with a pattern among the NG
  samples (all except S2, which has none), and the same ratio as MFCG and VG (CA-4).
* **The pattern is built lazily, by its first consumer.** It is created inside `BlockContent.getPattern` of whichever
  green or grove asks first. In R1 that is a Manor grove during `Hood.populate`. In R2 it is the central grove during
  `RingHood.build`, a whole pipeline stage earlier. With S2's all-zero counts (CA-4) this gives three independent
  signs that the pattern is created on demand, not at a fixed point in the pipeline.
* **The field is a fixed tile, independent of demand.** Both ring runs take exactly 126 steps, although they fill 47 and
  41 polygons. Across all 9 NG runs with a field, steps range only 122–132 while fills range 2–76. This supports CA-4's
  "stops early on a fixed tile" and H11's "one global field, clipped per polygon".
* **Candidate generation fits Bridson's scheme.** `[INFERRED]` `openfl.geom.Point.polar` ≥ `PoissonPattern.warp` in all
  10 NG samples. The surplus nearly vanishes when there are almost no trees (S1: 6332 polar for 6250 warps; S2: 21 polar,
  0 warps). So about one polar-coordinate offset is made per candidate, which is the "random point in the annulus
  around an active sample" step of Bridson's algorithm. This adds weight to CA-4's dart-throwing reading.

### RA-9. Corrections to the body of this file and to `_critic.md` that these runs expose

Each item lists the evidence. None of the text above is edited; this section is the correction of record.

1. **§3.1, §2, §9 Q4–Q5: `Hood.getCloud` is not the hood-outline generator, and `getCircle`/`getArc` are not outline
   arcs.** `[SHOWN]` `Hood.getCloud` equals `MapScene.layoutTitle` and `HoodView.setViewport` in all 10 NG coverage
   samples (2 / 1 / 1 / 1, 2 / 2, 2 / 2, 2 / 2). Its sampled parent is `MapScene.layout ← MapScene.updateView`, in R1 and
   in base profile gens 1, 2 and 3 (`ring2/callers_base.txt`). `Hood.getArc` is sampled under `Hood.semiSmooth ←
   BisectorEx.makeCut` in R1 and R2. `getCircle` = `getArc` = `Circle.new` everywhere. `[INFERRED]` `getCloud` is a
   view-side footprint of the hood, used to frame the viewport and choose the title corner. `semiSmooth` rounds the
   single bend of a bent cut with a circular fillet and keeps the straight legs, hence "semi". `getArc ÷ semiSmooth`
   (the share of cuts that are bent) is 18–49 % across the 10 samples. This settles §3.2's open question of whether
   `semiSmooth` is Chaikin, a spline or midpoint displacement: it is none of them. The hood outline comes from
   `<template>.createShape`, whose sampled child in R1 is `PolyBounds.obb`. **`AreaHood.createShape` is 1170 B**, not the
   1434 B §3.1 gives. 1434 B is `RingHood.createShape`, which never ran in the base capture (coverage offsets 218364
   against 220417).
2. **§1.1: there is no evidence left for a "CentralHood" or a "blocks" template.** `createRings` (781 B), `createBlocks`
   (848 B) and `createCenter` (740 B) sit at coverage offsets 221864 / 222659 / 223521. That is between
   `RingHood.createShape` (220417) and `RingHood.getName` (224270). All three ran exactly once in each ring run, so
   they are `RingHood`'s methods. `centralHood` exists only as a grammar rule (`"{old|0.5?-trade} #ward#"`). `[SHOWN]`
3. **§3.10 and §4.3: the "wells" layer is chimneys, the tiny round or square canvases are wells, and fountains are the
   gradient canvases.** The base draw's gradients (2 in gen-2, 4 in gen-3) were domes. The exact same-seed counts are in RA-5. `[SHOWN]`
4. **§3.11 and H14: `Random.save`/`Random.restore` do not bracket naming.** `[SHOWN]` Both are 1 in the four random-tag
   runs (A0–A3). They are **0 in all six URL-tag runs** (Q1, Q2, S1, S2, R1, R2), although a name was generated in
   every one of those (`Namer.square/street/ring` = 1). They move exactly with `Settings.randomTags` (1 against 0 in the
   same runs). `[INFERRED]` Random tags are rolled on a saved-and-restored RNG, so a given seed gives the same geometry
   whether its tags were rolled or supplied. Naming runs last in the model (`RingHood.getName` is sampled after
   `Hood.populate` in both profiles) and draws from the main stream, so it cannot disturb the model geometry. It could
   still shift view-side randomness drawn after it, such as roof tones and tree shapes. H14's test has to be restated
   on that basis.
5. **§3.9 and H13: crown vertex counts are a multiple of 4 in 99 % of trees, not all of them** (RA-5). `[SHOWN]`
6. **CA-2 and `_critic.md` C6: k is not a small constant for each template.** For ring, k = R + N (119 / 107). The rule
   that survives is "`detectStraight` is skipped exactly by the street cuts the plain `Bisector` makes" (RA-2). `[SHOWN]`
7. **CA-5 and `_critic.md` C13: the `makeCut = PointExtender.project` 1 : 1 identity belongs to the plain `Bisector`
   only.** `BisectorEx` makes no `project` call, yet its streets meet both boundaries at right angles. So the recorded
   `project` call is not a necessary part of right-angled arrival. C13 stays **OPEN**. The construction the creator
   stated (bend in the middle, right angles at both ends) is still the one to build. `[SHOWN]` count; the reading is
   `[INFERRED]`.
8. **`_critic.md` C2 and C3 (PoissonPattern) are confirmed on two more runs** (RA-8). **`_critic.md` §6 item 2 is closed
   for the ring template body** (`RingHood.*`, `Namer.ring`, `BisectorEx`, `ExPolygon`, the `Green` content class), but
   **not for `Settings.getInfo`**, which is still 0 in all 10 samples (RA-1).

**What changes for a re-implementer.** The ring template does **not** fit CA-2's "seed geometry plus N sub-areas handed
to the one generic bisector" (`[SHOWN]` counts, `[INFERRED]` design reading). It needs:
* **A second subdivider for polygons with holes (`BisectorEx` / `ExPolygon`).** Its first cut opens the annulus into
  one piece. Each later cut splits a piece in two and subtracts the street corridor straight away (`ExPolygon.not`).
  Street width is decided inside the cut. A local *validate → alternative cut → retry* loop mends about 4 % of cuts
  without discarding anything larger.
* **Closed, fixed-resolution ring roads** (about 48 vertices, independently irregular, nearly concentric, spacing
  widening outwards). They share one per-map width and get no smoothing or stripe.
* **Outside-in processing of the bands**, with the streets registered in that order.
* **A central disc that goes to the plain `Bisector`, or becomes a grove** (or, per the creator, a square or a single
  large building) when it will not cut. That is the stated degenerate-centre rule, now seen running.

The identities to reproduce and test against are `Block = Street + 1 − R`, `subdivide = 2N`, `ExPolygon.not = 2N − R`,
`semiSmooth = getStreetWidth + AC` and `PolyCut.cut − hatchRoof = 96R`. Cost planning: the hole-aware bisector is about
2–3× dearer per street than the plain one. Up to half of that overhead is object-keyed map bookkeeping, which flat
index arrays would remove. The whole generation still costs less than rasterising it.

Three corrections apply to **every** template (RA-9 items 1, 3 and 4):
* Build the hood outline in `createShape`; `getCloud` is not part of it. Round street bends with circular fillets.
* Render chimneys, wells and fountains as three separate kinds of object.
* Keep random tag rolling off the geometry RNG stream.

## Critic-2 addendum (VG/NG seat, 2026-09-25)

From `research/findings/_critic-vg-ng.md` (§1 V5, V27; §3 S28–S29; §4 items 6–8, 12–14). All ten `calls.json`
files and the ring `draw.json` files were re-read with python; every identity of §3.2, CA-2 and RA-2 reproduces.

1. **§4.1 says "27-key schema"; the captured `default.json` has 26 keys** (the §4.1 table itself lists 26 rows):
   `cityLights, colorAmbience, colorBg, colorCupola, colorGreen, colorLights, colorOutline, colorRoad, colorRoof,
   colorShadow, colorStone, colorText, colorTree, colorWater, details, roadOutlined, roadSurface, roadTwisting,
   roadWidth, shadowAlpha, shadowDir, shadowLength, strokeNormal, strokeThin, varRoof, varTree`.
2. **§3.6 `shortStroke ÷ pierce`:** 13 212 / 6 604 = 2.0006 (not 2.0004); across the 10 samples the ratio is
   2.0006–2.035, i.e. "exactly two per pierce" holds to ± 2 %, with a small surplus of `shortStroke` calls that
   are not paired with a `pierce` (cone/dome hatching is the likely source).
3. **C13 (with `profile-village.md` Critic-2 item 2):** the `makeCut = PointExtender.project` identity holds for
   MFCG, VG's field bisector and NG's plain `Bisector`, and fails only for `BisectorEx` — the one bisector whose
   right-angled, bent streets are visible in RA-4. RA-9 item 7's conclusion therefore generalises: the projection
   is the plain bisectors' axis-position step, not the stated construction's right-angle step, and C13 is OPEN
   without narrowing. The stated construction (49191011) remains the one to build.

## Bent-cut geometry addendum (2026-09-25) — captures/neighbourhood/2026-09-25T10-55-{19,36,47,59}

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B09.

**Why this exists.** C13 (`_critic.md` §2) and `_critic-vg-ng.md` V5 / §6 item 5 left the bent cut's geometry open:
bend position and angle, right-angled arrival, stop rule and width law. The four vertex captures (ring `10-55-19`, area
`10-55-36`, street `10-55-47`, square `10-55-59`; gen-0 = seed 7171, gen-1 = seed 7172, all `medium`, itch build 11441280)
store every painted path's vertices (`draw/gen-N.paths.json`). The recorder lane summarised them in
`captures/neighbourhood/README-vertices.md`. This addendum measures the construction from those vertices.
* **Reproduction `[SHOWN]`.** `python3 profiler/paths_stats.py <the four captures> --md` re-run in this lane gives table
  rows byte-identical to README-vertices.md's (checked with `diff`).
* **New scripts (stdlib only, in the capture folder).** `captures/neighbourhood/bentcut_geometry.py` produces the per-street
  legs, the virtual corner, the fillet, the ends, the crossed roads and the width fits. `bentcut_probe.py` covers end
  asymmetry, the straightness tolerance, width predictors and fillet examples. `bentcut_probe2.py` asks which end is exact
  and tests width-slope normalisation. `bentcut_probe3.py` covers junction order, off-ends on arcs, and the subpath
  structure of outlines and roads.
* **Definitions.** Streets and bends follow paths_stats: a bend is a run of vertices turning ≥ 1°. The *fillet-free* bend
  position is |p0 Pv| / (|p0 Pv| + |Pv pN|), where Pv is the intersection of the two straight legs' lines. p0 is the
  drawn start and pN the drawn end. **mu** means model units (raw `lineWidth` and px ÷ CTM scale). A junction end is an
  end within 3 half-widths of another road; the other ends are free.
* **Scope.** The screenshots were not viewed in this lane (time), so every number below comes from vertices.

### BG-1. Per-map measurements `[SHOWN]`

**Shape.** Streets are straight or have one bend. Only 3 of 519 have two bends. A one-bend street's corner sits near the
middle.

| map | streets 0/1/2 bends | bend position p10 · p50 · p90 (mean, sd) | in 0.40–0.60 | bend angle ° p10 · p50 · p90 · max | smallest bend ° | filleted bends |
|---|---|---|---|---|---|---|
| ring 7171 | 24/98/0 | 0.43 · 0.51 · 0.61 (0.52, 0.07) | 81/98 | 6.5 · 17.3 · 39.4 · 77 | 4.31 | 52/98 |
| ring 7172 | 28/75/1 | 0.36 · 0.51 · 0.59 (0.50, 0.09) | 58/75 | 6.0 · 15.7 · 39.8 · 134 | 3.99 | 35/75 |
| area 7171 | 20/67/0 | 0.34 · 0.49 · 0.54 (0.45, 0.09) | 52/67 | 6.4 · 19.0 · 63.9 · 97 | 4.12 | 36/67 |
| area 7172 | 22/48/0 | 0.36 · 0.50 · 0.55 (0.48, 0.08) | 36/48 | 5.3 · 20.3 · 46.2 · 90 | 3.02 | 28/48 |
| street 7171 | 16/22/2 | 0.36 · 0.48 · 0.56 (0.46, 0.09) | 15/22 | 7.2 · 14.2 · 83.0 · 109 | 4.59 | 10/22 |
| street 7172 | 14/27/0 | 0.40 · 0.49 · 0.54 (0.47, 0.06) | 24/27 | 9.5 · 18.1 · 39.1 · 91 | 5.99 | 14/27 |
| square 7171 | 6/19/0 | 0.43 · 0.48 · 0.52 (0.48, 0.05) | 17/18 | 4.8 · 13.0 · 26.2 · 62 | 4.15 | 12/18 |
| square 7172 | 6/24/0 | 0.42 · 0.49 · 0.57 (0.49, 0.06) | 22/24 | 6.5 · 18.5 · 57.7 · 85 | 5.21 | 14/24 |
| **all** | **136/380/3** | | **305/379 (80 %)** | pooled 3–5°: 17 · 5–10°: 85 · 10–20°: 111 · 20–30°: 68 · 30–45°: 53 · 45–60°: 19 · 60–90°: 19 · > 90°: 7 | **no bend < 3.0°** | **201/379 (53 %)** |

Square 7171 has one one-bend street whose legs do not intersect (a 180° turn), so its position column counts 18.
The mean position is below 0.5 in 6 of 8 maps, so the corner sits slightly nearer the drawn start.

**Ends.** Junction ends are right-angled, and they stop exactly one half-width short of the crossed road's centreline.

| map | junction / free ends | arrival ° p10 · p50 | ≥ 85° | within 0.1° of 90 at p0 / at pN | (offset − crossed half-width) px p10 · p90; within 0.05 px | junction on an earlier-drawn road |
|---|---|---|---|---|---|---|
| ring 7171 | 206 / 38 | 87.69 · 89.98 | 200 | 65/109 · 57/97 | −0.006 · +0.005; 205/206 | 169/206 (all 37 others are ring roads) |
| ring 7172 | 170 / 38 | 87.74 · 89.98 | 164 | 59/90 · 39/80 | −0.006 · +0.004; 168/170 | 116/170 (all 54 others are ring roads) |
| area 7171 | 133 / 41 | 87.85 · 89.97 | 126 | 48/69 · 27/64 | −0.007 · +0.004; 133/133 | 133/133 |
| area 7172 | 111 / 29 | 88.19 · 89.93 | 107 | 39/58 · 19/53 | −0.007 · +0.004; 110/111 | 111/111 |
| street 7171 | 57 / 23 | 87.98 · 89.84 | 55 | 21/33 · 5/24 | −0.006 · +0.005; 56/57 | 57/57 |
| street 7172 | 60 / 22 | 87.97 · 89.46 | 59 | 19/33 · 8/27 | −0.006 · +0.004; 59/60 | 60/60 |
| square 7171 | 31 / 19 | 88.60 · 89.99 | 30 | 11/17 · 7/14 | −0.006 · +0.003; 31/31 | 29/31 |
| square 7172 | 43 / 17 | 87.59 · 89.98 | 39 | 18/22 · 10/21 | −0.009 · +0.004; 41/43 | 41/43 (2 others: the plaza loop) |
| **all** | **811 / 227** | | **780 (96.2 %)** | **280/431 (65 %) · 172/380 (45 %)** | **803/811 (99.0 %)** | every exception is a ring road or the plaza, except 2 in square 7171 |

Free ends sit at pN more often than at p0: 139 against 88.

**Streets with junctions at both ends (JJ).** One end of a bent street is always exact; a straight street shares the error
between its ends.

| map | straight JJ: angle between the two crossed roads p50 · p90 · max; worse end's deviation max | one-bend JJ: both ends within 0.2° / only p0 / only pN | one-bend JJ: bend angle − crossed-road angle, p50 · p90 |
|---|---|---|---|
| ring 7171 | 3.34 · 4.26 · 4.75; 2.30° | 38 / 18 / 11 | 0.03 · 3.74 |
| ring 7172 | 2.13 · 4.53 · 13.46; 13.47° (p90 2.33) | 24 / 18 / 5 | 0.02 · 3.90 |
| area 7171 | 1.88 · 3.93 · 16.10; 1.97° | 19 / 16 / 3 | 0.03 · 5.25 |
| area 7172 | 2.21 · 3.80 · 5.79; 1.91° | 11 / 14 / 1 | 1.24 · 5.39 |
| street 7171 | 2.99 · 4.04 · 10.72; 11.03° (p90 2.03) | 4 / 6 / 0 | 0.78 · 4.25 |
| street 7172 | 2.13 · 2.41 · 3.91; 1.96° | 6 / 5 / 0 | 1.21 · 3.49 |
| square 7171 | 0.76, 2.82; 1.41° | 3 / 2 / 0 | 0.02 · 1.76 |
| square 7172 | 0.87, 4.40; 2.20° | 6 / 5 / 1 | 1.07 · 7.76 |
| **all** | 83 of 86 straight JJ streets join roads within 5.8° of parallel | **111 / 84 / 21** of 216: at least one end exact in every one | |

Where one end is off, the off end lands on a fillet arc of its target road at the same rate as the exact ends do: 37 of 149 arc
landings are off (25 %), against 68 of 283 straight landings (24 %) (`bentcut_probe3.py`). So the target's own smoothing does
not explain the off ends.

**Fillets.** 201 of 379 bends (53 %) are circular arcs; the rest are a single sharp vertex. The chords within one arc are
equal to within 0.01 px, and so are the turn steps. The only exception is the step at one end of the arc, which is
half-size in some arcs and full-size in others. Chords are 30–44 mu (p10–p90, p50 33–37) in every map. Radii are hundreds
of mu (p50 340–710, 20–320 street widths), and the tangent lengths in the sampled arcs run from 35 to 250 px. So an arc is a long, gentle curve
over much of both legs, not a corner rounding. `street` 7172's template main street (8.639 mu, 1165 px) is different: an
S-curve with alternating turns at about 86 mu spacing.

**Width `[SHOWN]` fits; readings `[INFERRED]`.** Widths are continuous, for example 112 distinct values among ring 7171's
122 streets, so they are **not stepped by depth**. The template-laid streets were excluded from the fits: `street`'s main
street, and 3 and 2 of `square`'s plaza streets.

| map | w = a + b·L (L = drawn length, mu): a · b · rms · max\|res\| | adding a free-end term: length per free end, mu · rms | fixed widths in the map, mu |
|---|---|---|---|
| ring 7171 | 4.142 · 0.00276 · 0.015 · 0.078 | +6.3 · 0.012 | ring roads 6.556 |
| ring 7172 | 5.071 · 0.00233 · 0.005 · 0.014 | +4.4 · **0.0014** | ring roads 6.125 |
| area 7171 | 4.169 · 0.00260 · 0.024 · 0.090 | +1.1 · 0.024 | — |
| area 7172 | 5.063 · 0.00236 · 0.007 · 0.026 | +5.3 · 0.005 | — |
| street 7171 | 4.171 · 0.00325 · 0.025 · 0.084 | +11.0 · 0.020 | main street 7.750 |
| street 7172 | 5.066 · 0.00286 · 0.007 · 0.012 | +4.4 · 0.003 | main street 8.639 |
| square 7171 | 4.162 · 0.00385 · 0.010 · 0.019 | +3.8 · 0.008 | plaza streets 7.750 ×3 |
| square 7172 | 5.061 · 0.00286 · 0.009 · 0.016 | +5.8 · 0.003 | plaza streets 8.639 ×2 |

* **Length predictors.** Length to the crossed centrelines fits worse than drawn length in 8/8 maps. The fillet-free
  length (leg + leg) fits worse in 7/8 and ties in street 7171. So width follows the smoothed, trimmed course.
* **Free ends.** Streets with a free end are wider than their drawn length predicts, as if each free end added about
  4–6 mu of length (1–11 in the noisy 7171 fits).
* **Per-seed constants.** The intercept a depends on the seed and not on the template: 4.14–4.17 for 7171 and 5.06–5.07
  for 7172. So does the template-street width (7.750 in both 7171 templates, 8.639 in both 7172 templates).
* **The slope b is not size-normalised.** b × √(road-hull area) ranges 2.06–3.75 and b × L_max 1.17–2.91 (`bentcut_probe2.py`).
* `[INFERRED]` The map draws the base width (and the template-street width) from the seeded stream before any
  template-specific geometry. The 7171 residuals (rms 0.010–0.025, against 0.0014–0.009 for 7172 once free ends are
  counted) say that part of the law is still missing.

### BG-2. The construction as measured, against the stated one and CA-5 / C13

**Now `[SHOWN]` (it was `[STATED]` only).** The creator's construction (post 49191011: a cut that starts and ends
at right angles to the polygon's edges, with a turn somewhere in the middle, `watabou-extra-a.md` §2.1) holds in all four
templates and for both bisectors. The ring bands' streets come from `BisectorEx`; the area, street and square streets and
ring 7171's 5 centre streets come from the plain `Bisector` (RA-2, CA-2). The measured construction:
1. **At most one bend.** 136 straight streets, 380 with one bend, 3 with two.
2. **The bend is near the middle.** 80 % of fillet-free positions fall in 0.40–0.60; sd 0.05–0.09 per map.
3. **Right angles.** 96 % of junction ends arrive at ≥ 85° (p50 89.5–90.0°). **Every** one-bend JJ street has at least one
   end within 0.2° of 90°.
4. **Bend angle = angle between the two crossed roads.** |difference| p50 0.02–1.24°. That is the geometric consequence of
   right angles at both ends.
5. **Ends stop at the crossed road's corridor edge.** Offset = crossed half-width ± 0.01 px, which is the recorder's
   rounding.
6. **Cuts end on earlier cuts.** In area and street, every junction lies on an earlier-drawn road: 361/361, the recursive
   T-junction hierarchy of §2.1. Ring roads and the plaza are registered after the streets that meet them (RA-2).

**Pinned constants (spread in brackets).**
* **Straightness tolerance.** A cut stays straight when its two end edges are within about 4–6° of parallel: 83/86
  straight JJ streets. It then takes the mean normal, so each end is off by ≤ 2.3°. No bend is smaller than 3.0°
  (17 of 379 are 3–5°). `[INFERRED]` The rule is roughly "bend only if a straight cut would miss 90° by more than about
  2° at an end". The measured band is 2–3°.
* **Bend position.** 0.5 of the fillet-free cut length, sd 0.05–0.09. The corner is slightly nearer the start: mean
  0.45–0.52.
* **Bend angle.** 3–134°, p50 13–20°. It is set by the geometry, not drawn independently.
* **Fillet.** 53 % of bends. Equal-chord circular arcs with chords of 30–44 mu, radius p50 340–710 mu.
* **Stop rule.** The street ends exactly one crossed half-width from the crossed centreline.
* **Width.** w = a_seed + b·L. The fitted spread is in the width table.

**Asymmetry `[SHOWN]`; reading `[INFERRED]`.**
* When a one-bend street has one inexact end, it is the drawn end pN in 84 of 105 cases.
* Overall, p0 is exact in 65 % of junction ends and pN in 45 %. Free ends are more often at pN (139 against 88).
* An off end is no more likely to land on an arc of its target (25 % against 24 %).
* **Reading.** The construction is directional. It leaves its start edge exactly perpendicular, then bends toward the far
  edge, and arrives there within a few degrees (p90 1.8–8.2°) rather than exactly. The drawing order follows the
  construction direction about 80 % of the time. This is the FTG author's 3-step description as stated (post 164816716,
  `ftg-posts-c.md` §2.2): project perpendicular from a start edge, intersect the far side, and bend in the middle if the
  far side is not right-angled. It is also the creator's "start and end at the right angle".

**C13 after this measurement.**
* **The geometry is closed.** Right angles, one bend in the middle, the angle range and the stop rule are `[SHOWN]`, with
  the numbers above.
* **The mechanism is still OPEN, and V5 stands.** Both bisectors show the same signature: the same arrival, position,
  angle and stop-rule statistics in the ring bands (`BisectorEx`, no `PointExtender.project`) and in area/street/square
  (plain `Bisector`, `project` 1:1 with `makeCut`). So `project` is not what makes the right angles or the bend. It
  remains most plausibly the plain bisectors' axis-position step `[INFERRED]`.
* **Still OPEN, and not measurable from strokes alone:**
  1. How the corner point is chosen. The sd 0.05–0.09 spread could be random or could follow from the parent polygon.
  2. Which edge a cut starts from (longest edge or OBB axis). This needs the parent polygon.
  3. What decides fillet versus sharp. There is no angle split: sharp p50 13–37°, filleted 14–21°.
  4. The reject filter. Only the RA-3 rates exist: "Alternative cut" is 4 % of splits and "Trying again" about 1 %.
  5. The width slope b and the free-end term.
* **Cross-check `[INFERRED]`.** Ring 7171's draw is identical to `07-20-25`'s (README-vertices.md), where
  `Hood.getArc` = 57. That equals the 52 filleted bends here plus the 5 "Alternative cut" splits, which were smoothed
  and then discarded (RA-2, RA-3). The same sum for 7172 gives 35 + 4 = 39 against `getArc` = 41. The two-bend street
  is a candidate for the difference, not checked.

**Falsifiable next test** (uses the existing captures, no new recording).
* **Method.**
  1. Rebuild each cut's parent face in `area` 7171/7172 and `street` 7172. Every junction is on an earlier road there, so
     draw order is creation order. The ends stop at corridor edges, so snap them to the crossed centrelines.
  2. Use only cuts whose parent face is bounded entirely by earlier streets. The hood outline is not drawn.
  3. For each such cut, compute the face's OBB and centroid.
* **Predictions of "the OBB chooses where; the construction chooses how" (§3.2 plus this addendum):**
  1. The start leg's edge is a long side of the face. Equivalently, the p0→pN chord lies within about 20° of the OBB
     short axis.
  2. The cut crosses the long axis near its middle (t = 0.5 ± the gate).
  3. The fillet-free corner Pv lies near the long-axis centre line, so the corner's position spread comes from the face's
     shape.
* **Refutation.** A chord orientation that is uniform relative to the OBB, or a Pv unrelated to the face centre, refutes
  that reading. Pv sitting at the centroid while the start edge is chosen independently of the OBB would single out a
  corner-first construction (pick P, drop perpendiculars).

### BG-3. Rulings on the two corrections in README-vertices.md

1. **Road widths are model units, not px. RESOLVED `[SHOWN]`.**
   * **Where the error is.** The widths §4.2 and RA-5 quote as px (§4.2: 4.550–11.449; RA-5: ring 6.556 / 6.125,
     streets 4.272–5.814 / 5.213–6.244) are the raw `lineWidth` argument, in model units.
   * **Canvas pixels.** On the canvas they are multiplied by the CTM scale, which is one value per map: 0.5597, 0.6939,
     0.5953, 0.7724, 0.9093, 0.9561, 1.1137 and 1.0396 for the eight maps in capture order. For example, ring 7171's
     6.556 mu ring road is 3.67 px.
   * **Proof.** The same raw value is painted at different pixel widths. The template street's 7.750 mu is 7.05 px in
     street 7171 and 8.63 px in square 7171 (the README's max width px column).
   * **The spread.** §4.2's "±25 % about the mean … `roadWidth × scale × (1 ± jitter)`" is refuted. The within-map spread
     is the length law (BG-1, rms ≤ 0.025 mu), plus fixed per-seed widths for ring and template streets.
   * **The "px" ranges.** §3.2's 4.55–11.45 "rendered px" range should be read the same way.
2. **§3.6's "footprint + ridge (one path, two subpaths)" and "7 segments = hip" are wrong. RESOLVED `[SHOWN]`.**
   * **Outline strokes.** In all 8 maps, each `#222222` w1 stroke on the buildings canvas has at most one subpath with
     ≥ 2 vertices: 5 880 have one, 11 693 have none (terminators), and 0 have two (`bentcut_probe3.py` and the inline
     census). The typical stroke is OpenFL's lone pen point (a 1-vertex subpath) plus the footprint polygon, closed by
     repeating its first vertex: 1 317 / 1 248 / 939 / 851 / 446 / 444 / 255 / 295 strokes. So §3.6's 6 segments is a
     4-gon and 7 is a 5-gon.
   * **No ridge is stroked.** Ridges show only as the boundary between the two roof-face fills.
   * **Road strokes.** Every road stroke in the 8 maps begins with the same lone pen point: 124/107/87/70/40/41/25/31 of
     124/107/87/70/40/41/25/31.
   * **The ring stroke.** So RA-5's "50 segments = 48 vertices + 2 repeated points" is "pen point + 48 distinct vertices
     + 1 repeated first vertex" (README-vertices.md headline 5c).
   * **Knock-on for CA-5's test.** The 5+-vertex footprints of README-vertices.md headline 4 are footprint polygons, not
     outline-plus-ridge artefacts. Pairing them across party walls is still to do.

### BG-4. What changes for a re-implementer

Build every street cut, and by the creator's statement every lot cut (untested here), as follows. Constants are in model
units, with the measured spread.
1. **Pick the start edge and point.** Rule OPEN; the OBB is the working hypothesis.
2. **Leave perpendicular.** Leave the start edge exactly perpendicular.
3. **Straight or bent.** Test whether a straight cut would reach the far edge within about 2° (2–3°) of perpendicular. If
   it would, keep it straight and aim along the mean of the two edge normals, so each end is off by ≤ 2.3°. If not, put
   one corner at about 0.5 (sd 0.05–0.09) of the cut length, so that the second leg arrives roughly perpendicular to the
   far edge (median exact; p90 off by 2–8°).
4. **Two bends.** Two-bend cuts are rare (3 of 519) and can be omitted.
5. **Round the corner.** In about half the cuts, replace the corner with an equal-chord circular arc: chord about 30–44 mu,
   radius several hundred mu, spanning a large share of both legs. Otherwise keep the sharp vertex.
6. **Width.** Assign w = a + b·L, with L the final course length in mu. a is one value per map from the seed (4.1–5.1 here)
   and b is 0.0023–0.0039. Add about 5 mu of length per free end.
7. **Template roads.** Ring roads and template streets take fixed per-map widths (6.1–8.6 here).
8. **Recurse.** Recurse on both sides.
9. **Draw.** Stop each end exactly half the crossed road's width from its centreline. Draw with square caps. Streets are
   drawn in creation order.

This reproduces every distribution in BG-1. What it does not yet fix is where the start point and corner go within a
face, which is BG-2's test.

## Bent-cut parent-face test (2026-09-25)

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B10.

**Why.** This runs the next test proposed in BG-2: rebuild each street cut's parent face from the four vertex captures
(ring `10-55-19`, area `10-55-36`, street `10-55-47`, square `10-55-59`; seeds 7171 and 7172) and test the candidate cut
rules against that face. No new recording was made. Script: `captures/neighbourhood/bentcut_parent_face.py` (stdlib only,
reuses `bentcut_geometry.py`; about 3 s). Its full output is not stored in the project; the command below reproduces it.

### PF-1. Method
1. **Graph.** Every road is the polyline of its drawn vertices: 519 streets plus the closed ring and plaza roads. Each
   junction end (BG-1 definition) is extended along its last segment to the crossed road's centreline and inserted there as
   a node. This turns the network into a planar graph with T-junctions, and free ends dangle.
2. **Faces.** A half-edge face walk finds the faces. The hood outline is not drawn, so every region that touches the hood
   edge merges into one outer face. Such faces are **open**.
3. **Cut tree.** Streets are removed in reverse draw order. Removing street S unions the face components on its two
   sides. That union is S's parent face at the time of the cut, and the two sides are its children. Template roads are
   never removed, because they exist before the cuts: closed rings, the plaza loop, and streets at the per-seed template
   widths 7.750 / 8.639 mu.
4. **Parent polygon.** The parent polygon is the union's boundary. A junction node is dropped when both of its boundary
   edges lie on the same road, because it is a collinear insertion made by a later cut or by a cut on the far side.
   * **E1** keeps the drawn geometry, so fillet arcs stay as chords.
   * **E3** replaces each complete fillet arc on the boundary with that road's virtual corner Pv. 87 arcs were replaced;
     138 arcs are only partly on a boundary and stay as chords.
   * **Sides** are maximal straight runs, broken at every vertex that turns ≥ 1° (the BG-1 bend threshold).
   * **OBB** is the minimum-area rectangle over the hull (rotating calipers).
5. **The cut.** Its ends are snapped to the crossed centrelines (e0 at the drawn start p0, eN at the drawn end pN), with
   the fillet-free corner Pv between them. t = |e0 Pv| / (|e0 Pv| + |Pv eN|).
   * **Size gate.** Positions are gated at 0.1 × the chord |e0 eN|.
   * **Null model.** Each position rate has a null: the same rate for a point placed uniformly along the cut. For the chord
     test, a uniform direction gives 22 %.

**Reconstruction checks `[SHOWN]`.**
* **Snapping.** 0 fallback snaps. Snap distance ÷ crossed half-width is p10 0.997 · p50 1.000 · p90 1.004 (BG-1's stop rule).
* **Tree consistency.** At removal, **every one of the 512 non-template streets has exactly one face component on each
  side**. So draw order is consistent with a recursive cut tree in all four templates.
* **Slits.** There are exactly **3 slits**, cuts whose two sides are already one component. They are 1 in ring 7171 and 2
  in ring 7172, which is the number of closed inner bands (R − 1). That is RA-2's reading made visible: the first cut of
  a band opens the annulus without splitting it.
* **Parent midpoint.** For all 162 bounded parents, the cut's midpoint lies inside the reconstructed parent.

**Limits.**
* **Coverage.** 344 of 512 cuts have an open parent: every top-level cut and every hood-side cut. Only 162 cuts are
  tested: ring 103, area 44, street 9, square 6. These are the inner, deeper cuts (parent area p50 42 700 mu²).
  Street and square are too few to rank templates.
* **Geometry.** Faces are built on centrelines. `BisectorEx` (ring) carves the corridor during the cut (RA-2), so its true
  polygons are inset by half a width, which is small against faces of 150–400 mu.
* **Depth.** Depth can be counted only below the nearest hood-touching ancestor, so it is a lower bound.

### PF-2. Hit rates `[SHOWN]` (bounded cuts; ring · area · street · square · **all**)

| rule | ring | area | street | square | **all** | null |
|---|---|---|---|---|---|---|
| (a1) start side is the longest side, E1 | 29/103 | 21/44 | 4/9 | 0/6 | **54/162 (33 %)** | — |
| (a1) start side is the longest side, E3 | 31/103 | 22/44 | 4/9 | 2/6 | **59/162 (36 %)** | — |
| (a1) either end on the longest side, E3 | 52/103 | 31/44 | 6/9 | 3/6 | **92/162 (57 %)** | — |
| (a2) start side within 20° of **parallel** to the OBB major axis, E1 | 86/103 | 42/44 | 9/9 | 6/6 | **143/162 (88 %)** | — |
| (a2) the same, E3 | 83/103 | 42/44 | 9/9 | 5/6 | **139/162 (86 %)** | — |
| (a2) start side within 20° of **perpendicular** to the major axis, E1 | 0/103 | 1/44 | 0/9 | 0/6 | **1/162** | — |
| (a) **discriminator:** faces whose longest side is > 20° off the major axis, E1: cut starts on the longest side / on a major-parallel side | 0 / 37 of 46 | 1 / 15 of 17 | 0 / 3 of 3 | 0 / 3 of 3 | **1 / 58 of 69** | — |
| (a) the same, E3 | 1 / 33 of 41 | 1 / 13 of 15 | 0 / 3 of 3 | 0 / 3 of 4 | **2 / 52 of 63** | — |
| (c) chord e0→eN within 20° of the OBB **minor** axis | 86/103 | 39/44 | 9/9 | 3/6 | **137/162 (85 %)** | 22 % |
| (c) start leg within 20° of the minor axis | 85/103 | 42/44 | 9/9 | 6/6 | **142/162 (88 %)** | 22 % |
| (c) cut crosses the major axis at 0.40–0.60 of its extent | 55/97 | 34/40 | 6/9 | 5/5 | **100/151 (66 %)** | — |
| (d) smaller child's area share 0.40–0.50 | 49/103 | 27/44 | 6/9 | 1/6 | **83/162 (51 %)** | — |
| (d) the same, 0.30–0.50 | 77/103 | 39/44 | 9/9 | 5/6 | **130/162 (80 %)** | — |
| (b) bent cuts, n | 77 | 35 | 3 | 5 | **120** | |
| (b) corner at the cut's midpoint, \|t − 0.5\| ≤ 0.10 | 60/77 | 32/35 | 2/3 | 5/5 | **99/120 (82 %)** | 20 % |
| (b) the same, ≤ 0.05 | 41/77 | 23/35 | 1/3 | 2/5 | **67/120 (56 %)** | 10 % |
| (b) corner within 0.1 chord of the OBB **major axis** | 50/77 | 26/35 | 1/3 | 2/5 | **79/120 (66 %)** | 21 % |
| (b) corner within 0.1 chord of the OBB **centre** | 15/77 | 14/35 | 0/3 | 2/5 | **31/120 (26 %)** | 7 % |
| (b) corner within 0.1 chord of the face **centroid** | 20/77 | 16/35 | 0/3 | 3/5 | **39/120 (32 %)** | 6 % |
| (b) **discriminator:** axis crossing ≥ 0.10 from the midpoint: corner nearer the midpoint / nearer the crossing | 11/6 | 4/0 | 1/0 | 2/0 | **18/6 (n = 24)** | |
| (b) the same against the OBB centre's foot on the cut | 28/4 | 4/0 | 1/0 | 2/0 | **35/4 (n = 39)** | |
| (b) the same against the centroid's foot on the cut | 8/2 | 5/0 | 0/0 | 0/1 | **13/3 (n = 16)** | |

**Distributions.**
* **Chord–minor angle.** p10 1.0 · p50 6.0 · p90 26.8° overall. In area it is p50 3.2°.
* **Where the cut crosses the major axis.** As a fraction of the axis extent it is p10 0.35 · p50 0.52 · p90 0.64. In area
  it is 0.41 · 0.52 · 0.60. The folded minimum is 0.14 (ring) and 0.16 (area).
* **Smaller child share.** p10 0.26 · p50 0.40 · p90 0.48. It is < 0.2 in 8/162.
* **\|t − 0.5\|, p50 · p90.** Ring 0.045 · 0.137 and area 0.011 · 0.092. Measuring t from the drawn ends instead of the
  snapped centrelines changes nothing (ring 0.045 · 0.144, area 0.008 · 0.099).

**(e) Arc against sharp.** These rows cover all 378 non-template one-bend streets, 200 of them arcs. Bounded parents are
split 60 arc / 60 sharp.

| split by | bins → arc / all |
|---|---|
| bend angle ° | [0,10) 60/102 · [10,20) 63/111 · [20,40) 58/111 · ≥ 40 19/54 |
| drawn length mu | < 150 48/121 · 150–250 102/170 · 250–400 34/61 · ≥ 400 16/26 |
| depth below the nearest hood-touching ancestor | 0: 140/256 · 1: 18/29 · 2–3: 13/29 · ≥ 4: 29/64 |
| parent area (bounded only), p50 | arc 49 500 mu² · sharp 35 000 mu² (p10–p90 overlap: 27 000–88 000 against 23 000–102 000) |

* **No clean predictor.** Arcs are rarer at bend angles ≥ 40° (35 % against 52–59 %) and on streets < 150 mu (40 % against
  56–62 %). Depth shows no trend.
* **Arc size.** Where an arc exists, its tangent length tracks the shorter leg: ρ = 0.94. T ÷ shorter leg is p10 0.54 ·
  p50 0.73 · p90 0.87, and radius ρ with the bend angle is −0.68. So the radius follows from the leg length. It is not a
  fixed constant.

### PF-3. What survives, and C13 after this test

**Surviving rules `[SHOWN]` (numbers from PF-2).**
1. **The OBB chooses the axis. The longest edge does not.**
   * **Direction.** The cut runs along the parent's OBB minor axis, so it crosses the major axis and splits the face the
     long way: 85 % of chords are within 20° of the minor axis (null 22 %). The cut leaves from a side parallel to the
     major axis in 88 %, and 94 % have at least one end on such a side.
   * **Against the longest edge.** Where the longest side is not parallel to the major axis, the cut starts on that longest
     side in 1 of 69 faces (E1) or 2 of 63 (E3). It starts on a major-parallel side in 58 of 69 (52 of 63).
   * **Verdict.** "Start from the longest edge" is **refuted** as the rule. Its 33–36 % raw hit rate is the cases where the
     longest side is itself parallel to the major axis. This confirms §6 H2 ("cut ⟂ OBB long axis") for the bounded cuts;
     rule 3 gives the split-position distribution that §9 item 2 asks for.
2. **The corner goes at the cut's midpoint.** Measured between the crossed centrelines, \|t − 0.5\| ≤ 0.10 holds in 82 %
   (null 20 %), and in area in 32/35 with p50 0.011.
   * **The OBB centre and the centroid fail:** 26 % and 32 %.
   * **"On the major axis" is not independent.** Its 66 % is carried by the midpoint. Where the midpoint and the
     axis crossing differ by ≥ 0.10, the corner follows the midpoint 18 : 6. Against the OBB-centre foot it is 35 : 4, and
     against the centroid foot 13 : 3.
   * **The construction is cut-first, not corner-first.** Pv is not a chosen interior point (such as the centroid) with
     perpendiculars dropped from it. It is the midpoint of the cut's own course. That fits the FTG three-step description
     and BG-2's reading.
3. **The split is positional along the axis, not area-balanced.** The major axis is crossed at 0.40–0.60 of its extent in
   66 % of cuts (area 34/40), with a clear mode at the middle. The child-area share is looser: 0.40–0.50 in only 51 %,
   p10 0.26. `[INFERRED]` The split parameter is a position along the OBB major axis, clamped near the middle
   (`MathUtils.gate`, §3.2). The 13 crossings below 0.30 (11 of them ring) are either the gate's tail or retries.

**Still OPEN for C13.**
1. **Which of the two long sides is the start.** The start side is the longer end side in 91/162 cases, close to chance.
   Nothing in the face decides it, so it is plausibly a coin flip.
2. **The gate's exact bounds.** Are 0.40–0.60 hard bounds with retries, or a clamped normal distribution? The 13 far-off
   crossings may be the "Alternative cut" retries of RA-3 (4 % of splits), which is not checked.
3. **Why the ring (`BisectorEx`) is looser.** Its corner spread is \|t − 0.5\| p50 0.045 against 0.011 in area, and 75 % of
   its crossings fall in 0.35–0.65 against 92 % in area. Curved annular faces and the corridor carving are the
   candidates. `[INFERRED]`
4. **Arc against sharp.** It is not decided by bend angle, face size or depth (PF-2 (e)). It is either random at about 53 %,
   or a fit test that this data only brushes: fewer arcs on short streets and at large angles.
5. **Top-level and hood-side cuts (344 of 512).** They are untested, because the hood outline is not drawn.

**Next test (existing captures, no recording).**
* **Forward prediction on the 162 bounded faces.** Construct each face's cut and compare it with the drawn cut:
  1. Take the OBB of the parent face.
  2. Place a line across the major axis at the measured fraction f.
  3. Leave the major-parallel side that line meets, perpendicular to it.
  4. Put the corner at half the course and arrive perpendicular at the far side (BG-4 steps 2–3).
* **Prediction.** Endpoint error < 0.1 chord in ≥ 80 % of cuts.
* **Refutation.** A systematic endpoint offset, or a different side being hit, refutes "OBB axis + midpoint corner" as the
  whole construction.
* **Second check.** Map the RA-3 "Alternative cut" console lines onto street draw ranks. Do they coincide with the
  13 off-centre crossings?

Reproduce: `python3 captures/neighbourhood/bentcut_parent_face.py [--json out.json]` (every table row above is printed;
the per-cut JSON has each cut's parent area, sides, OBB angles, t and corner distances).

## Bent-cut prediction test (2026-09-25)

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B11.

**Why.** This runs PF-3's "Next test" in its strict form: predict each bounded cut from its **parent face alone** and
compare it with the drawn cut. The sibling lane `docs/confidence/ng-challenge-under.md` §4.1 (`bentcut_forward.py`) ran
the conditioned form, which is given the measured crossing fraction and the drawn start side. No new recording was made.
Script: `captures/neighbourhood/bentcut_predict.py` (stdlib only, about 6 s). It imports `bentcut_parent_face.py`
unmodified and captures its parent polygons the same way `bentcut_forward.py` does. Data: the four 2026-09-25 vertex
captures (`10-55-{19,36,47,59}`, seeds 7171 / 7172).

### PP-1. Method
1. **Faces.** The 162 bounded simple parents of PF-1: ring 103, area 44, street 9, square 6. The polygon is E3 (fillet-free),
   the OBB is E1's (as in PF-2), and the drawn course is Q = [e0, Pv, eN] with its ends snapped to the crossed centrelines.
2. **Face-alone construction** (PF-3 rules 1–3 and BG-4 steps 2–3; nothing from the drawn cut enters it):
   * Take the point of the OBB major axis at f = 0.5, the middle of the 0.40–0.60 band. The line through it parallel to
     the minor axis meets the boundary once on each side. These are the two candidate start points, one on each long side.
   * Leave the start side exactly perpendicular. The ray meets the far side.
   * If the mean of the two side normals misses 90° at the far side by ≤ 2°, the cut is straight along that mean. 2° is
     the tolerance at which ng-challenge-under's straight/bent agreement peaks.
   * Otherwise there is one corner at half the course, and the second leg arrives exactly perpendicular to the far side
     (variant **mid**). Variant **proj** puts the corner at the middle of the perpendicular projection instead.
3. **Scoring.**
   * The two ends are matched as a set, because the drawing direction follows the construction only about 80 % of the
     time (BG-2). The error is the larger of the two endpoint distances (emax).
   * Units: px, mu (px ÷ the map's CTM scale), and fractions of the drawn chord and of the OBB minor and major extents.
     The threshold is PF-3's: emax < 0.1 chord.
   * **The side bit** is scored three ways: **coin** (the mean over the two candidates), **better** (a one-bit oracle) and
     **drawn** (the candidate nearer e0).
4. **Oracle ladder.** Each level gives the predictor one more piece of the drawn cut, which shows where the error sits.
   * **L0.** f = 0.5, from the face alone.
   * **L1.** f = the drawn cut's own major-axis crossing. The better-side column reproduces ng-challenge-under §4.1
     exactly: 101 of 151, area 35/40, ring 56/97. Here the 11 cuts with no crossing count as misses.
   * **L2.** f fitted per cut on a 0.005 grid over 0.05–0.95.
   * **L3.** The start point is a drawn end (e0 or eN, whichever does better), and the rest is predicted.
   * **Null N2.** The straight minor-axis chord at the fitted f. It measures how much a one-parameter slide absorbs on
     its own.

### PP-2. Results `[SHOWN]`

**Hit rate, emax < 0.1 chord.** "Plain" is area + street + square, the plain `Bisector`.

| set | n | L0 coin | L0 better side | L0 drawn side | L1 drawn f | L2 fitted f, better / coin | null N2 (fitted f) | L3 drawn start |
|---|---|---|---|---|---|---|---|---|
| ring | 103 | 20 % | 33 (32 %) | 21 (20 %) | 56 (54 %) | **91 (88 %)** / 84 | 60 (58 %) | 80 (78 %) |
| area | 44 | 44 % | 21 (48 %) | 19 (43 %) | 35 (80 %) | **40 (91 %)** / 38 | 35 (80 %) | 39 (89 %) |
| street | 9 | 2/9 | 3 | 3 | 8 | **9** / 9 | 8 | 9 |
| square | 6 | 1.5/6 | 2 | 1 | 2 | **3** / 2.5 | 2 | 2 |
| plain | 59 | 39 % | 26 (44 %) | 23 (39 %) | 45 (76 %) | **52 (88 %)** / 49.5 | 45 (76 %) | 50 (85 %) |
| **all** | **162** | **27 %** | **59 (36 %)** | **44 (27 %)** | **101 (62 %)** | **143 (88 %)** / 133.5 | **105 (65 %)** | **130 (80 %)** |

* **The corner variant does not matter at L0.** Variant proj gives the same hits as mid: 59/162 overall, 33 ring, 21 area.
* **The straightness tolerance does not matter either.** `--tol 3` gives the same hit rates as 2° in every column.
* **The construction beats the fitted null**, and the margin grows as the threshold tightens:

  | threshold | L2 fitted construction | null N2 | L2, drawn bend ≥ 10° | null, drawn bend ≥ 10° |
  |---|---|---|---|---|
  | 0.05 chord | 126/162 (ring 78/103, plain 48/59) | 70 (33, 37) | 57/86 | 21/86 |
  | 0.10 chord | 143 | 105 | 70 | 43 |
  | 0.20 chord | 148 | 134 | 74 | 67 |

**Error distributions (p50 · p90).**

| set | L0 emax, px | L0 emax / chord | / OBB minor | / OBB major | L0 corner / chord | L0 corner, px | L0 bend error ° | L0 straight/bent agree |
|---|---|---|---|---|---|---|---|---|
| ring | 18.4 · 68.7 | 0.161 · 0.590 | 0.140 · 0.453 | 0.102 · 0.285 | 0.157 · 0.339 | 16.7 · 38.8 | 5.2 · 26.7 | 82 % |
| area | 11.9 · 77.2 | 0.125 · 0.749 | 0.085 · 0.673 | 0.066 · 0.456 | 0.095 · 0.324 | 7.9 · 32.1 | 2.3 · 21.6 | 86 % |
| street | 17.9 · 23.6 | 0.112 · 0.186 | 0.100 · 0.158 | 0.078 · 0.119 | 0.107 · 0.247 | 21.4 · 31.3 | 2.1 · 7.8 | 7/9 |
| square | 72.1 · 138.2 | 0.566 · 0.731 | 0.394 · 0.520 | 0.323 · 0.464 | 0.299 · 0.348 | 44.3 · 65.8 | 11.8 · 49.5 | 4/6 |
| plain | 13.2 · 88.9 | 0.121 · 0.731 | 0.100 · 0.603 | 0.076 · 0.456 | 0.108 · 0.324 | 10.4 · 44.3 | 3.4 · 30.6 | 83 % |
| **all** | **16.2 · 80.4** | **0.151 · 0.657** | **0.130 · 0.581** | **0.085 · 0.351** | **0.142 · 0.339** | **13.9 · 39.9** | **4.2 · 27.2** | **82 %** |

* **In model units,** L0 emax is p50 22.7 · p90 124 mu.
* **L2 (f fitted).**
  * emax is p50 1.6 px (2.7 mu) and p90 11.6 px (20.6 mu), which is 0.014 · 0.138 chord (plain 0.007 · 0.160).
  * The corner error is 0.062 · 0.214 chord (plain 0.051 · 0.150), and the bend error is 2.0 · 12.5°.
  * Straight/bent agrees in 147/162 (91 %).
* **Corner errors** are measured only where both the predicted and the drawn cut are bent. The bend error counts a
  straight cut as 0°.

### PP-3. Which sub-rule fails `[SHOWN]`
1. **The misses are along the major axis.**
   * Of the 100 L0 misses (better side), 97 have an along-major error component ≥ 0.1 chord at one end. Only 43 have an
     across component that large.
   * Start-point error is p50 0.064 of the major extent along the axis, against 0.010 of the minor extent across it.
   * L0 hits fall as the OBB gets longer: aspect < 1.3 hits 31/66 (47 %), 1.3–1.7 hits 20/56 (36 %), and 1.7–2.5 hits
     7/36 (19 %). A fitted f restores 59/66, 48/56 and 35/36. That is the signature of a position parameter scaled by
     the major extent.
2. **The flags on the 100 misses,** given as first failing in construction order / present at all / present among the
   59 hits:

   | flag | first | present | in hits |
   |---|---|---|---|
   | neither drawn end on a major-parallel side (> 20°) | 9 | 9 | 1 |
   | drawn crossing outside 0.40–0.60, or none | 50 | 56 | 3 |
   | far side differs from the drawn cut's, even starting from the drawn end | 12 | 32 | 8 |
   | straight/bent disagrees, starting from the drawn end | 3 | 8 | 8 |
   | drawn corner off the middle, \|t − 0.5\| > 0.10 | 3 | 13 | 6 |
   | drawn inexact end > 5° off perpendicular | 4 | 26 | 11 |
   | none of these | 19 | — | — |

3. **The band is too wide for a 0.1-chord test.**
   * 41 of the misses have their crossing inside 0.40–0.60 and at least one end on a major-parallel side. In 26 of them the start
     point's own offset, |f(e0) − 0.5| × major extent, is already ≥ 0.1 chord (p50 0.112 chord).
   * Even a perfect construction with f uniform in 0.40–0.60 would hit < 0.1 chord in only about 60 % of the 162 faces
     on average: the chance is min(1, chord ÷ major extent) per face.
4. **The second failing rule is the far side.**
   * Started from the better drawn end (L3), the far end lands within 0.1 chord in 130/162 (80 %): plain 85 %, area 89 %,
     ring 78 %, p50 0.019 chord.
   * The perpendicular ray from the true start meets the drawn cut's far side in only 121/162 (75 %). That rate is 75 %
     in both plain and ring.
   * Starting from the more nearly perpendicular ("exact") end does worse: 121/162 (75 %). The better end is that exact
     end in only 76/162 (47 %).

**Ranking of the failures.**
1. The position along the major axis carries the error.
2. The far-side choice comes next.
3. The rest follow: the inexact arrival (26 of the 100 misses), the off-middle corner (13) and the straight/bent call (8).
The OBB axis rule, "start from a major-parallel side", fails in only 9 of the 100 misses.

### PP-4. Is it one free parameter?
* **Position alone explains most of the residual `[SHOWN]`.**
  * One fitted scalar per cut, the start's position along the major axis, lifts the hit rate from 36 % to 88 % with the
    better side: plain 44 → 88 %, ring 32 → 88 %. With the side left as a coin flip it goes from 27 % to 83 %.
  * That is 38 more hits than the fitted straight null at 0.1 chord, and 56 more at 0.05.
  * The start's along-axis error correlates with (drawn crossing − 0.5): Pearson 0.76 overall, 0.88 in area and 0.92 in
    street.
* **The fitted position is broad `[SHOWN]`.**
  * f is p10 0.33 · p50 0.515 · p90 0.645.
  * 94/162 (58 %) fall in 0.40–0.60, and 20 fall outside 0.30–0.70.
  * \|f − 0.5\| is p50 0.085 · p90 0.225 (plain 0.065 · 0.180).
  * The fitted f differs from the drawn crossing by p50 0.039 · p90 0.155 (area 0.023 · 0.071).
* **The side bit is a small, unpredicted second parameter `[SHOWN]`.**
  * It is worth 36 against 27 % at L0 and 88 against 83 % at L2.
  * It is decisive in 31 cuts at f = 0.5, meaning one candidate hits and the other misses. In those 31, no face feature
    beats chance:

    | predictor of the start side | agrees |
    |---|---|
    | the drawn start's side | 16/31 |
    | the longer side | 17/31 |
    | the smaller predicted bend | 15/31 |
    | the construction whose far end lands on the far side | 17/31 |
    | the side more parallel to the major axis | 10/31 |

  * `[INFERRED]` In a face with straight long sides, cuts with both ends perpendicular and the corner at mid-course form
    a one-parameter family. Starting from either side at the right position gives the same cut. So the side bit only
    says which end is pinned at the drawn position, and it can be identified only together with that position's law.
* **Anchor test: which point of the drawn cut sits nearest the middle of the major axis `[SHOWN]`.** Figures are
  \|f − 0.5\| p50 · p90, then the share within 0.10.

  | point of the drawn cut | all | share ≤ 0.10: all · plain · ring |
  |---|---|---|
  | drawn start e0 | 0.059 · 0.162 | 75 % · 85 % · 69 % |
  | course midpoint | 0.067 · 0.187 | 70 % · 85 % · 61 % |
  | corner Pv | 0.071 · 0.187 | 68 % · 86 % · 58 % |
  | major-axis crossing | 0.076 · 0.192 | 66 % · 83 % · 57 % |
  | exact (more perpendicular) end | 0.083 · 0.258 | 56 % · 68 % · 50 % |
  | drawn end eN | 0.106 · 0.281 | 48 % · 56 % · 44 % |

  * e0 is the tightest anchor overall and in ring. In plain, e0, the course midpoint and the corner tie.
  * `[INFERRED]` The position is drawn for the stroke's first end, not for its perpendicular end. That fits BG-2's
    "drawing order follows the construction".

### PP-5. Verdicts
1. **The face alone does not determine the cut. REFUTED as stated `[SHOWN]`.** PF-3 predicted endpoint error
   < 0.1 chord in ≥ 80 % of cuts. The face-alone prediction reaches 36 % with the better side and 27 % with a coin flip.
   Even in area, the best case, it reaches 48 %.
2. **The construction survives, given one position `[SHOWN]`.** The cut runs along the OBB minor axis from a
   major-parallel side, leaves perpendicular, puts its corner at mid-course and arrives perpendicular. With one fitted
   scalar, the position along the major axis, that reproduces 88 % of cuts at 0.1 chord and 78 % at 0.05. The fitted
   straight null gets 65 % and 43 %. The corner rule is not the weak point.
3. **The position is a random draw, not a face property `[SHOWN]`.** It has a central mode, p50 \|f − 0.5\| 0.085, and
   42 % fall outside 0.40–0.60. Its law is open: a gate, a clamp, or retries.
4. **The start side is a coin flip on this data `[SHOWN]`,** but n = 31 decisive cuts is thin. It is worth 5–9 points.
5. **The far-side rule fails for a quarter of cuts `[SHOWN]`.** From the true start, the perpendicular ray misses the
   drawn cut's far side in 25 % of plain and ring cuts alike. `[INFERRED]` The generator probably finds the far side
   with the bent second leg, or with another rule, rather than with the perpendicular ray.
6. **Per template.**
   * Area and street pass once the position is given: L2 91 % and 9/9, L3 89 % and 9/9.
   * Ring reaches 88 % at L2 but only 78 % at L3, with PF-1's caveat about curved sides.
   * Square is the outlier: L2 3/6, L3 2/6, far side right 1/6. Six cuts are too few to rule on.

**Still OPEN.**
1. The law of the position parameter, and whether the 20 fitted positions outside 0.30–0.70 are RA-3's "Alternative
   cut" retries. PF-3's second check is still not run.
2. The far-side rule behind the 25 % mismatch.
3. Whether the side bit carries any signal beyond chance.
4. Arc against sharp (PF-3 open item 4).
5. The 344 hood-side cuts, which cannot be tested because the hood outline is not drawn.

**Next test (existing captures, no recording). Pinned-start likelihood and far-side rule.**
* **Anchor.** Take e0, the drawn start, as the pinned end.
* **Position law.** Fit its major-axis position per template to three candidates: uniform 0.40–0.60 with retries, a
  clamped normal, and uniform 0.30–0.70. Check the 20 outliers against the draw ranks of RA-3's "Alternative cut" lines.
* **Far-side rule.** For the 41 far-side mismatches of L3, compare three rules: the side met by the perpendicular ray,
  the side met by the minor-axis line through the start, and the side nearest the mid-course corner.
* **Prediction.** If the pinned start plus the second-leg far-side rule lifts L3 above 90 % in plain, the construction is
  closed except for the position law.
* **Refutation.** An anchor law no tighter than the course midpoint's would leave the pinned point undetermined.

Reproduce: `python3 captures/neighbourhood/bentcut_predict.py [--json out.json] [--tol 2]` prints every number above,
except the along/across split, the aspect bins, the 0.05 / 0.2 thresholds and the gate-width share. Those four come
from its per-cut JSON (keys `L0_start_du` / `_dv`, `aspect`, `L2.emax` / `L2.null`, `anchor`).

## Bent-cut anchor test (2026-09-25)

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B12.

**Why.** This runs PP-5's "Next test": pin the drawn start e0 as the anchor, then fit its position law, compare far-side
rules and corner rules, and score the whole cut predicted from that start. No new recording was made. Script:
`captures/neighbourhood/bentcut_anchor.py` (stdlib only, about 12 s). It imports `bentcut_predict.py` unmodified, which
captures the same 162 bounded simple parents as PF-1 / PP-1 (ring 103, area 44, street 9, square 6; "plain" = area +
street + square = 59). Data: the four 2026-09-25 vertex captures (`10-55-{19,36,47,59}`, seeds 7171 / 7172).

### AN-1. Method
1. **Anchor.** e0 is the drawn start, snapped to the crossed centreline (PP-1). A is its foot on the nearest edge of the
   fillet-free polygon E3; the start side is that edge's side (PF-1 side definition). The OBB is E1's, as in PF-2 / PP-1.
2. **Position.** f = e0's fraction along the OBB major axis (PP-4's anchor). As a rival parametrisation, g = A's fraction
   along its own start side, oriented along +u. Seven shapes are fitted to f by maximum likelihood, each mixed with an
   outlier term ε·U(0,1) (ε on a grid, 0–0.4), and ranked by AIC.
3. **Far-side rules from A.** R1: the side hit by the perpendicular (inward normal) ray. R2: the side hit by the ray toward
   the face centroid. R3: the side giving the most even area split. For R3, the cut is constructed to every other side
   and kept only if its course crosses no other face edge; the smaller child's share is then computed. R4: the side hit
   by the OBB minor-axis line through A (PP-5's candidate). A rule is right when it names the side holding eN.
4. **Corner rules.** Two views.
   * **On the drawn legs** (the 120 bent cuts). The drawn corner Pv is compared with (a) the midpoint of the drawn course,
     (b) the midpoint between the two boundary crossings of the first-leg line, e0 and F (F is where that line meets the
     drawn far side), (b′) the chord midpoint (the foot of Pv on the chord), and (c) the point where the first-leg line
     crosses the OBB major axis. Errors are in chord units.
   * **Constructed from A.** The cut leaves A perpendicular. The corner sits at a distance s along that normal: `mid`
     makes the two legs equal, `proj` takes half of A–F, and `axis` takes the major-axis crossing. The second leg then drops
     perpendicular onto the far side. The straight rule is PP-1's (mean normal within 2°).
5. **Scoring.** Every far-side rule is combined with every corner rule. Scores: the far-end error |B − eN| and the
   symmetric Hausdorff distance between the predicted and drawn courses, both ÷ chord, with hits at 0.10 and 0.05. The
   drawn far side is included as an oracle ceiling.
* **Sanity check `[SHOWN]`.** The area split of the cut constructed to the drawn far side reproduces the drawn child share:
  |difference| p50 0.006 · p90 0.041 (n = 158). The script is deterministic: sections (1) and (3) came out byte-identical in
  the first and the final run of this lane (the edits between them touched only R3's legal-cut filter).

### AN-2. The position law `[SHOWN]`
**f is tight, g is not.** On its own side, the start is spread almost uniformly, with sd 0.25 (plain 0.23). Along the OBB
major axis it is 2.5 times tighter, sd 0.099. So the position is a fraction of the major axis, not of the start side.

| set | n | f p10 · p50 · p90 | \|f − 0.5\| p50 · p90 | in 0.40–0.60 | in 0.30–0.70 | g sd |
|---|---|---|---|---|---|---|
| ring | 103 | 0.354 · 0.503 · 0.613 | 0.063 · 0.168 | 71 (69 %) | 100 (97 %) | 0.264 |
| area | 44 | 0.405 · 0.510 · 0.585 | 0.051 · 0.109 | 37 (84 %) | 42 (95 %) | 0.228 |
| street | 9 | 0.419 · 0.540 · 0.578 | 0.051 · 0.088 | 8 | 9 | 0.124 |
| square | 6 | 0.443 · 0.476 · 0.540 | 0.038 · 0.057 | 5 | 6 | 0.348 |
| plain | 59 | 0.412 · 0.510 · 0.585 | 0.048 · 0.109 | 50 (85 %) | 57 (97 %) | 0.232 |
| **all** | **162** | **0.378 · 0.503 · 0.605** | **0.059 · 0.162** | **121 (75 %)** | **157 (97 %)** | **0.252** |

**Histogram of f (all), 0.05 bins.** 0.10: 1 · 0.20: 2 · 0.25: 2 · 0.30: 7 · 0.35: 11 · 0.40: 26 · 0.45: 30 · 0.50: 41 ·
0.55: 24 · 0.60: 11 · 0.65: 7 · ≥ 0.70: 0. The five values below 0.30 have no mirror above 0.70. The OBB's +u direction
is arbitrary, so this is plausibly chance (p ≈ 0.06) `[INFERRED]`.

**Shape fits (AIC; lower is better).** ε is the fitted outlier share.

| candidate | ring | area | plain | all |
|---|---|---|---|---|
| N(0.5, σ) | **−182.8** (σ 0.098) | −91.1 (σ 0.064, ε 7.5 %) | **−128.0** (σ 0.066, ε 5 %) | **−301.1** (σ 0.088, ε 2 %) |
| bell: mean of 3 U over 0.5 ± w/2 | **−183.8** (w 0.59) | −91.2 (w 0.39, ε 7.5 %) | **−128.4** (w 0.40, ε 5 %) | −299.6 (w 0.51, ε 3 %) |
| triangle: mean of 2 U | −181.5 (w 0.53) | −92.0 (w 0.28, ε 10 %) | −126.9 | −295.8 (w 0.43) |
| U(lo, hi), fitted | −158.2 (0.31–0.70, ε 5 %) | **−93.8** (0.40–0.61, ε 10 %) | −125.7 (0.40–0.62, ε 10 %) | −250.9 (0.32–0.69) |
| U(0.40, 0.60) + outliers | −113.1 (ε 40 %) | −81.7 (ε 20 %) | −112.5 (ε 20 %) | −222.3 (ε 30 %) |
| U(0.30, 0.70) | −157.2 (ε 5 %) | −60.7 | −87.0 | −246.2 |

* **Readings.**
  1. The law is central and peaked: μ 0.495–0.505 in every free fit. Ring and all reject a flat band by 25–50 AIC
     units. Normal, bell and triangle cannot be told apart (ΔAIC ≤ 5.3).
  2. Area alone is ambiguous at n = 44. U(0.40, 0.61) with 10 % outliers fits best, but by only 2 AIC over the bell and
     the normal.
  3. There is no pile-up at 0.40 or 0.60, so there is no sign of a clamp. But 0.05 bins and a measurement noise of about
     0.02 (PP-4: fitted f − drawn crossing, p50 0.023 in area) could hide a narrow one.
  4. The ring is wider (σ 0.098 against 0.066 in plain). PF-3 open item 3 already flags `BisectorEx` and the curved faces.
* **Correlates: none `[SHOWN]`.** Spearman ρ of |f − 0.5| and of the signed f − 0.5 against face aspect, parent area,
  depth, draw rank and start-side ÷ major length is ≤ 0.17 in magnitude, for all 162 and for plain. The drawn child share
  gives ρ −0.26. That is a consequence of f, not a cause: an off-centre cut splits unevenly.
  * **By seed.** |f − 0.5| p50 is 0.058 for 7171 (n 89) and 0.060 for 7172 (n 73).
  * Street and square (n 9 and 6) show larger ρ values, which are noise at that n.
* **The side bit on the anchor.** The start side is the longer of the two sides met by the minor-axis line in 91/162
  (56 %). In ring it is 52/103 (50 %). In plain it is 39/59 (66 %) and in area 30/44 (68 %). A binomial test on the plain
  count gives p ≈ 0.01, but PP-4's 31 decisive cuts gave only 17/31. `[INFERRED]` The side is a coin in ring; plain has a
  weak lean toward the longer side, possibly about 2 : 1, that is not yet firm.

### AN-3. Far-side rules from the anchored start `[SHOWN]`
The first four rows count cuts where the rule names the drawn far side. The last row counts far ends predicted within
0.10 · 0.05 chord, using the `proj` corner (AN-5).

| rule | ring | area | street | square | plain | **all** |
|---|---|---|---|---|---|---|
| R1 perpendicular ray | 69 (67 %) | 29 (66 %) | 8/9 | 1/6 | 38 (64 %) | **107 (66 %)** |
| R2 ray to the centroid | 40 (39 %) | 22 (50 %) | 4/9 | 1/6 | 27 (46 %) | **67 (41 %)** |
| R3 most even split, legal cuts only | 56 (54 %) | 18 (41 %) | 2/9 | 0/6 | 20 (34 %) | **76 (47 %)** |
| R4 minor-axis line through A | 60 (58 %) | 31 (70 %) | 8/9 | 2/6 | 41 (69 %) | **101 (62 %)** |
| far end < 0.10 · 0.05 chord: R1 · R2 · R3 · R4 | 78·62 · — · 58·42 · 73·55 | 36·32 · — · 23·18 · 37·32 | 9·7 · — · 3·3 · 9·7 | 2·1 · — · 1·1 · 3·1 | 47·40 · 41·32 · 27·22 · 49·40 | **125·102 · 98·68 · 85·64 · 122·95** |

* **R1 wins.** Where R1 and R3 disagree (97 cuts), R1 is right in 49, R3 in 18, and neither in 30. Without the
  legal-cut filter R3 drops to 37/162, so the filter is not what beats it. The drawn cuts are not the most even splits
  anyway: drawn share p50 0.40.
* **R4 against R1.** R4 is slightly better in plain (41 against 38 sides, 49 against 47 far ends) and worse in ring (60
  against 69). The two rules nearly coincide when the start side is close to parallel to the major axis. It is within 20° in
  88 % of cuts (PF-2).
* **The oracle ceiling.** Given the drawn far side, the far end hits 142/162 (88 %) at 0.10 and 116 (72 %) at 0.05 with
  `proj`. The best face rule leaves 17 cuts at 0.10 on the table. They are in ring and plain in proportion.
* **The perpendicular ray from e0** names the drawn far side in 66 %. That is lower than PP-3's 75 %, which started from
  the better of the two drawn ends.

### AN-4. Corner rule `[SHOWN]`
**On the drawn legs, bent cuts.** Figures are error ÷ chord p10 · p50 · p90, then the counts within 0.10 and 0.05.

| rule | ring (77) | area (35) | plain (43) | **all (120)** |
|---|---|---|---|---|
| (a) midpoint of the drawn course | 0.049 p50; 60 · 41 | 0.011; 30 · 23 | 0.026; 37 · 25 | **0.004 · 0.042 · 0.139; 97 (81 %) · 66 (55 %)** |
| (b) midpoint of e0–F on the first-leg line | 0.040; 56 · 44 | 0.010; 28 · 22 | 0.031; 32 · 24 | 0.002 · 0.039 · 0.226; 88 (73 %) · 68 (57 %) |
| (b′) foot on the chord at the chord midpoint | 0.050; 58 · 38 | 0.011; 30 · 23 | 0.027; 37 · 25 | 0.004 · 0.044 · 0.149; 95 (79 %) · 63 (52 %) |
| (c) first-leg line × OBB major axis | 0.068; 50 · 26 | 0.043; 25 · 18 | 0.056; 28 · 19 | 0.010 · 0.062 · 0.288; 78 (65 %) · 45 (38 %) |

* **Discriminators.** Counted where two rules' errors differ by ≥ 0.05 chord, as nearer rule : other rule.
  * (a) against (c): 40 : 7 (plain 11 : 1, ring 29 : 6).
  * (a) against (b): 18 : 6 (plain 8 : 1).
  * (b) against (c): 34 : 20.
  * (a) and (b′) never differ by that much: equal legs with perpendicular ends put the corner over the chord midpoint.
* **Constructed from A, with the oracle far side.** Corner error p50 is 0.054 chord for `mid`, 0.043 for `proj` and 0.062
  for `axis`. Far ends within 0.10 · 0.05 chord: 137 · 114, 142 · 116 and 139 · 118. The far end hardly depends on the
  corner rule, because moving the corner by δ moves the far end by δ·sin(bend), and the median bend is 13–20° (BG-1).
* **Verdict.**
  1. **The OBB-axis crossing is refuted as the corner rule:** it loses 40 : 7 to the course midpoint (PF-3's 18 : 6
     against the axis, now at the anchor).
  2. **The drawn corner is the course midpoint.** It is the most robust rule: 81 % within 0.1, and it beats (b) 18 : 6.
  3. **For prediction, `proj` edges `mid`:** it lands 11 more far ends with R1 (125 against 114). `mid` assumes an exact
     perpendicular arrival, which the drawn arrival is not (BG-2). `[INFERRED]` Where the arrival is inexact, the corner
     stays at mid-course but the far end moves, so half the perpendicular projection is the better predictor of the far
     end. The two readings' errors differ by ≥ 0.05 chord in only 24 of the 120 bent cuts.

### AN-5. Whole-cut prediction from the drawn start `[SHOWN]`
Hits are far end < 0.10 · < 0.05 chord. The Hausdorff error of the whole course gives a count within 4 cuts of the
far-end count in every row.

| far-side rule × corner | ring | area | street | square | plain | **all** |
|---|---|---|---|---|---|---|
| **R1 × proj** | 78 · 62 | 36 · 32 | 9 · 7 | 2 · 1 | 47 · 40 (80 % · 68 %) | **125 · 102 (77 % · 63 %)** |
| R1 × mid | 71 · 59 | 33 · 30 | 8 · 7 | 2 · 1 | 43 · 38 | 114 · 97 |
| R1 × axis | 72 · 59 | 34 · 30 | 9 · 7 | 2 · 1 | 45 · 38 | 117 · 97 |
| R4 × proj | 73 · 55 | 37 · 32 | 9 · 7 | 3 · 1 | 49 · 40 (83 % · 68 %) | 122 · 95 |
| R2 × proj | — | — | — | — | 41 · 32 | 98 · 68 |
| R3 × mid | 56 · 42 | 24 · 19 | 3 · 3 | 1 · 1 | 28 · 23 | 84 · 65 |
| oracle far side × proj | 90 · 71 | 40 · 36 | 9 · 7 | 3 · 2 | 52 · 45 (88 % · 76 %) | 142 · 116 (88 % · 72 %) |
| oracle far side × mid | 87 · 70 | 38 · 35 | 9 · 7 | 3 · 2 | 50 · 44 | 137 · 114 |

* **PP-5's prediction fails.** It said the pinned start plus a better far-side rule would lift plain above 90 %. The best
  face rule reaches 80 % (R1 × proj) or 83 % (R4 × proj), and even the oracle far side reaches only 88 %.
* **So the construction is not closed.** The far-side choice costs 8 points in plain (11 overall), and the other 12 % miss even
  with the right far side. PP-3 already counts what those remaining misses carry: inexact arrivals, straight/bent disagreements,
  off-mid corners and square's plaza faces.
* **Pinning e0 comes close to PP-3's L3.** L3 used the `mid` corner and picked the better of e0 and eN for each cut; it
  scored 130. Pinning e0 alone scores 114 with `mid` and 125 with `proj`. So always starting at e0 costs at most about
  16 cuts against an oracle choice of end.

### AN-6. Recipe for a re-implementer (bounded faces)
1. Compute the parent face's OBB.
2. **Draw f** from a central law on the major axis. Use N(0.5, 0.09): 0.066 in plain `Bisector` faces and 0.098 in ring
   `BisectorEx` faces. The bell "mean of three uniforms over 0.5 ± 0.25" fits equally well. **Random draw 1.**
   * About 2–5 % of cuts are outliers: the ε term, uniform over the axis. The observed ones lie at 0.10–0.30, and their
     cause is open (retries?).
   * A flat 0.40–0.60 band is rejected except, marginally, in area.
3. **Draw the side:** a coin between the two long sides. Plain faces may lean toward the longer side (66 %), which is not
   confirmed. **Random draw 2.**
4. The start A is where the minor-axis line at f meets that side. Leave it exactly perpendicular.
5. **Far side:** the side hit by the perpendicular ray (R1). The drawn far side differs in 34 % of cuts, and the rule
   behind them is not found. The centroid ray, the most even split and the minor-axis line are no better.
6. **Straight or bent:** keep the cut straight if the mean normal misses 90° by ≤ 2°. Otherwise put the corner at half the
   perpendicular projection A–F and drop the second leg perpendicular to the far side. In 96 of 120 bent cuts this and
   the course-midpoint rule have errors within 0.05 chord of each other.
7. **Fillet:** round the corner in about 53 % of cuts (PF-2 (e); it has no predictor). **Random draw 3.**
8. **Stroke direction:** draw from A in about 80 % of cuts (BG-2). **Random draw 4,** cosmetic.

Expected fidelity: far end within 0.10 chord in 77 % of cuts (plain 80 %), and within 0.05 in 63 %, *given the drawn
start*. The face-alone version adds draws 1–2 on top: PP-2's L0 36 % is the price of a wrong position draw, not a fault in
the construction.

### AN-7. Verdicts and what remains open
**Verdicts.**
1. **The position is a fraction of the OBB major axis `[SHOWN]`.** It is not a fraction of the start side: sd 0.099
   against 0.25. It is central and bell-shaped (σ ≈ 0.09), with a small outlier tail, and it correlates with no face
   property or seed. `[INFERRED]` It is a random draw, not a clamp: there is no pile-up at a bound. `MathUtils.gate`
   (≈ 1.8 per cut, §3.2) could still clamp a wider draw outside the observed range.
2. **The best far-side rule is the perpendicular ray `[SHOWN]`:** 66 % of sides, and 77 % of far ends at 0.1 chord with
   `proj`. The centroid ray (41 %) and the most even split (47 %) are refuted as the rule.
3. **The corner sits at mid-course, not on the OBB axis `[SHOWN]`.** For prediction, half of the perpendicular projection
   is marginally better than exact equal legs.
4. **PP-5's closure prediction** (plain > 90 % from the pinned start) **is refuted `[SHOWN]`:** 80–83 %, and the oracle
   ceiling is 88 %.

**Still OPEN.**
1. **The 34 % far-side mismatch.** Does the generator pick among several reachable sides at random, or by a rule not tested
   here (for example the second leg's own hit, or a retry after an invalid cut)?
2. **The outlier tail in f** (f < 0.30 in 5 cuts, all on the low side). Are these RA-3's "Alternative cut" retries? PF-3's
   console-rank check is still not run.
3. **The side bit's lean in plain** (39/59): it needs more faces.
4. **Why the ring law is wider** (σ 0.098 against 0.066).
5. **The 344 hood-side cuts** remain untestable, because the hood outline is not drawn.

Reproduce: `python3 captures/neighbourhood/bentcut_anchor.py [--json out.json]`. It prints every table in AN-2 to AN-5;
the per-cut JSON has f, g, the far-side picks, the corner errors and each rule × corner prediction.

## Fable review (2026-09-27) — B09

**Verdict: CORRECTED** (`docs/fable-review/main/evidence-captures.md`, row B09). `captures/neighbourhood/bentcut_geometry.py`
re-run reproduces BG-1 (ring 7171 bend position p10 0.432 · p50 0.512 · p90 0.607, 81/98 in 0.40–0.60; arrivals ≥ 85°
200/206; JJ straight angles p50 3.34 · p90 4.26 · max 4.75; fillet chords p50 36 mu), and the two BG-3 corrections hold
against `profiler/lib/instrument.js` (raw `lineWidth` recorded; px = w·√|det CTM|). The measured construction stands and
is what `docs/ARCHITECTURE.md` §13.5's bent-cut row tests against. Two INFERRED readings are superseded by the code readings
of 2026-09-27 (`docs/AMENDMENTS-2026-09-27c.md`, applied by pass c): (1) the width law's free-end term is a drawing artefact
— junction ends are drawn 0.3 × the crossed road's width past the cut — and the law is `w_lo + (w_hi − w_lo)·min(1, L/axis)^p`
with p drawn per map in [0.5, 2] (item 40); (2) fillet versus sharp has a predictor — sharp with probability
`sin²(δ/2) + cos²(δ/2)·min(1, w/ℓ)`, which predicts 209.9 of 378 arcs against the 200 observed (item 38). BG-1 flagged both
as open ("part of the law is still missing"; C13 open item 3), so this closes them.

## Fable review (2026-09-27) — B10

**Verdict: CORRECTED** (`docs/fable-review/main/evidence-captures.md`, row B10). `bentcut_parent_face.py` re-run: 162
bounded simple parents, 512/512 cuts with one component each side, 3 slits, chord within 20° of the OBB minor axis 137/162,
longest-side start 54/162 (E1) / 59/162 (E3), corner within 0.10 of mid-course 99/120, discriminator 18 : 6. PF-3 rules 1
and 2 (the OBB chooses the axis; the corner sits at mid-course) stand and agree with the 2026-09-27 code reading (the start is
the boundary edge most parallel to the major axis; the corner sits at a bell fraction of the first leg's free length, centred
— `docs/AMENDMENTS-2026-09-27c.md` items 36–37). Rule 3's INFERRED mechanism — a position clamped near the middle by
`MathUtils.gate` — is superseded: the position is the mean of the face centroid's fraction along the major axis and a bell
draw, unclamped (item 35); open item 1 (which long side starts) is deterministic, not a coin (item 36).

## Fable review (2026-09-27) — B11

**Verdict: CORRECTED** (`docs/fable-review/main/evidence-captures.md`, row B11). `bentcut_predict.py` re-run: L0 44/162
(coin) and 59/162 (better side), L1 101/162, L2 143/162 (coin 134), null N2 105/162, L3 130/162; the cross-reference holds —
`docs/confidence/ng-challenge-under.md` §4.1's "< 0.1, better side" column reads 45 / 35 / 8 / 2 / 56 / 101. Verdict 1 stands.
Verdict 3 ("the position is a random draw, not a face property") is half right under the code reading
(`docs/AMENDMENTS-2026-09-27c.md` item 35): the position averages a face property — the centroid's fraction along the major
axis, which AN-2's correlate list did not include — with a bell draw (160/162 faces consistent). Verdicts 4 and 5 are
explained by the deterministic start side (item 36) and by the corner being placed before the far side, which is then chosen
from the corner (item 37) — the 25 % "far-side failures" of the perpendicular ray.

## Fable review (2026-09-27) — B12

**Verdict: CORRECTED** (`docs/fable-review/main/evidence-captures.md`, row B12). `bentcut_anchor.py` re-run: f sd 0.099
against g sd 0.252; N(0.5, σ) AIC −301.1 with σ 0.088 (ring −182.8, σ 0.098; plain −128.0, σ 0.066); R1 107/162 (66 %),
R2 67, R3 76, R4 101; R1 × proj 125 · 102, oracle far side × proj 142 · 116. The numbers stand and `docs/ARCHITECTURE.md`
§4.6's recipe carries them today (MN-3 — the queue's "not yet reflected" is closed), as does §13.5's bent-cut row. Pass c
(`docs/AMENDMENTS-2026-09-27c.md` items 33–41) replaces §4.6's generative steps with the mechanism read in NG 1.2.2's code and
keeps σ, the 53 % fillet share and the 66 % as measured outputs of that mechanism (item 41). So AN-6's "random draw 1"
(f ~ N(0.5, 0.09)) is the observed output of `f = (centroid fraction + bell)/2`, "draw 2" (a coin for the side) does not
exist (the start is the edge most parallel to the major axis), R1 is the shadow of a corner-first construction, and "draw 3"
(fillet at 53 %) is the output of the sin²/cos² rule — AN-4's finding that half the perpendicular projection A–F predicts
better than equal legs is, in hindsight, the code's corner placed along the first leg. A reader should take the mechanism
from pass c's §4.6 and use this addendum for the targets.
