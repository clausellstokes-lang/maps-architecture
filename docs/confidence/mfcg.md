# Confidence assessment — watabou's Medieval Fantasy City Generator (MFCG)

Lane: confidence/mfcg. Assessor seat (Fable 5.1), 2026-09-25. Status: reading complete (≈340k tokens, within the 350k rule); matrix and verdicts follow.

## §0 Reading record

Order and status (updated as reading proceeds):

| # | File | Size | Read status |
|---|------|------|-------------|
| 1 | research/findings/_critic.md | 42 KB | READ IN FULL |
| 2 | research/findings/_critic-os.md | 63 KB | READ IN FULL |
| 3 | research/findings/profile-mfcg.md | 203 KB | READ IN FULL (base §0–§15, Critic addendum, Critic-2 addendum, Explicit-gates addendum parts 1+2, Styles addendum) |
| 4 | research/findings/os-model.md | 93 KB | OUTLINE + full read of §0 (27–55), §9 draw order, §10 constants, §11 retry/throws, §12 failures, §13 bugs, §14 live delta, §15 unknowns (912–1211). Not read in full: §1–§8 stage bodies (their constants are verified row by row in _critic-os.md §1, which was read in full) |
| 5 | research/findings/os-wards-render.md | 71 KB | OUTLINE + full read of §10 constant index, §11 failures, §12 delta, §13 unknowns, §14 verification (1001–1114). Not read in full: §0–§9 (constants verified in _critic-os.md §1) |
| 6 | research/findings/mfcg-posts-a.md | 73 KB | READ IN FULL |
| 7 | research/findings/mfcg-posts-b.md | 65 KB | READ IN FULL |
| 8 | research/findings/mfcg-devlogs-a.md | 91 KB | OUTLINE + full read of §1 chronology (47–75), §2.11 ward reroll, §2.14 coast, §2.15 rivers, §2.16 districts, §2.17 elevation, §2.18 warp, §2.27 determinism, §2.28 performance, §2.29 options (418–430, 477–655, 867–918), §6 open questions and the whole External-sources addendum (1049–1213). Not read in full: §2.1–2.10, §2.12–2.13, §2.19–2.26, §3–§5 |
| 9 | research/findings/mfcg-devlogs-b.md | 81 KB | OUTLINE + full read of §1 chronology, §2.1–2.5 (Voronoi/Delaunator, subdivision, gate plazas, framing, skeleton labels), §2.11 palette, §2.14 export/JSON/URL keys, §2.16–2.17 warp and per-ward regen, §2.19 population, §2.20–2.22 district typing, rivers/coasts, walls, §7 open questions, Critic addendum (25–54, 60–225, 366–407, 444–491, 534–571, 596–708, 956–1031). Not read in full: §2.6–2.10, §2.12–2.13, §2.15, §2.18, §2.23–2.24, §3–§6 |
| 10 | research/findings/os-geometry.md | 65 KB | OUTLINE + full read of §4 complexity/robustness, §5 replacements, §6 open questions (828–913). Not read in full: §0–§3 (verified row by row in _critic-os.md) |
| 11 | research/findings/watabou-extra-a.md | 84 KB | OUTLINE + full read of §2.1 bent bisection, §2.2 perpendicular lots, §2.3 curvilinear streets, §2.4 uneven streetwall, §2.5 landmarks (64–238), §2.17 3-D data model, §2.21 seeds/permalinks, §6 open questions (717–754, 829–851, 1109–1161). Not read: §2.6–2.16, §2.18–2.24 (non-MFCG generators), §3–§5 |
| 12 | research/findings/watabou-extra-b.md | 83 KB | OUTLINE + full read of T1 bisection with holes, T3–T4 straight skeleton and gable variant, T6 skeleton label spines, T8 OBB area labels, T20 outline mix, T21 farmlands, T23 Urban Places mesh, T28 parameter expansion, §6 open questions (59–92, 118–187, 209–293, 474–509, 525–583, 721–738, 955–996). Not read: T2, T5, T7, T9–T19, T22, T24–T27, T29–T33, §3–§5 |
| 13 | research/findings/visual-spec.md | 51 KB | full read of §0 (recordings, coordinate spaces, casing rule) and §1 MFCG (1–284), §5 cross-generator comparison, §6 renderer feature list, §7 open questions, §8 files read (626–743). Not read: §2–§4 (VG, NG, FTG) |

Not in this lane's reading list (not read, by design): _critic-ftg.md, _critic-vg-ng.md, ftg-*.md, vg-*.md, profile-village.md, profile-neighbourhood.md, manor.md. Where an MFCG claim depends on one of those, it is flagged as such.


Token note: the Read tool measures these files at ≈2 characters per token (dense tables and symbols), so the 13 files
(1.06 MB) would cost ≈520k tokens read whole. Files 1–3 (308 KB ≈ 150k tokens) were read in full. For files 4–13 the
READING BUDGET rule was applied: section outline (`grep -n '^#'`) for every file, then full reads of the sections that
carry [STATED] feature facts, constants, contradictions or open questions. The exact ranges read per file are listed
below as they are read.

## §1 Evidence base for MFCG — what kind of evidence exists, and how far each kind reaches

| evidence kind | what it is | reach for the four confidences |
|---|---|---|
| Recorded behaviour of the live build 0.11.x (`captures/mfcg/*`, 45 V8 call censuses across 5 capture dirs, complete Canvas2D draw records, console `Stopwatch` traces with Haxe file:line, 20+ screenshots) | exact per-method call counts, 1:1 count identities, stage timings, colours/widths/fonts/layer order, seed chains, gate/tower laws, tint arithmetic | strongest for **functional** and **visual**; gives *structure* of algorithms (which routine, how many times, what it consumes) but never the body of a routine; gives some **algorithm identity** when a count law pins a construction (e.g. `casing = core + 2t`, `validate = 140 × validateRect`, `drawGate = N + 1`, seed transitions on the 48271 orbit) |
| Creator text: 30 Patreon posts (watabou-city), 46 itch devlogs, 65 watabou-extra posts | [STATED] definitions of options and of some methods (twisted bisection, warp tools, skeleton labels, tints, size in wards, gates modes, forests rule, population) | feature surface and semantics (**functional**); a few method statements (**algorithm identity**) but almost never constants |
| 2017 open-source ancestor TownGeneratorOS (GPL-3; read for verification only, never ported) | exact constants and draw order of the ancestor pipeline (141 constants verified by `_critic-os.md`) | the only source of **seed-exact** knowledge, and only for stages the live build demonstrably kept (Lehmer 48271 stream, 8·size seeding shape, 0.75 citadel threshold, wall smoothing, gate ideas, Topology/aStar names, tidyUpRoads, palette anchors); every kept stage has measured live deviations (+4 seeds, Delaunator instead of Bowyer–Watson, midpoint gates, weighted picks, one castle gate, repair instead of throw) |
| Shipped data assets captured as non-JS bodies (`grammar.json`, six palette JSONs, four Markov corpora, `index.html` fonts) | verbatim content | **visual** (palette values) and **functional** (naming grammar shape); clean-room rule: schema ideas reusable, values/wordlists not |
| Critic rulings (`_critic.md`, `_critic-os.md`, addenda) | contradiction verdicts that supersede base text | used throughout; where a base-file claim was overturned the ruling is cited instead |

**Binding corrections applied in this assessment** (from the critic files and the post-critic addenda, superseding older text in profile-mfcg.md and elsewhere):
* Population ≈ 6.12–6.13 persons/building, not 6.29 (`_critic.md` C1).
* `PoissonPattern` = warped Poisson-disc, k = 50, 140 points, static init in MFCG; its consumer is the tree scatter, `FillablePoly.validate = 140 × validateRect` (profile-mfcg ST-2; `_critic.md` C2/C3).
* `Castle.equalize` equalises a cell's **angles** (creator's Warp-tool definition, 40345972), not edge lengths (`_critic.md` C5); `Bloat` = enlarge the cell.
* Twisted bisection: cut leaves/meets edges at right angles with a bend in the middle (49191011); `makeCut = PointExtender.project` is its perpendicular-foot step; OBB most plausibly chooses axis/place and feeds `isSmallEnough`; constants (bend position, stop predicate, street-width law, reject filter) are OPEN (`_critic.md` C13, §6.4).
* `deltaRiver` = river ending in the sea with a widened mouth, not a braided delta (`_critic.md` C15).
* `#a59f93` (colorGreen) is both park fill and furrow ink (`_critic.md` C14).
* Retry does **not** reseed: every attempt seed is the Lehmer state where the previous attempt stopped, 34/34 transitions on the 48271 orbit (profile-mfcg EG-3, EG-7 #8), correcting profile-mfcg §0.5/§4.6 and os-model §11/§14.
* The retry loop encloses **all** stages including createWards/buildCityTowers/buildGeometry: a "bad poly" bisector exception restarts the whole city (profile-mfcg ST-8, correcting §3.1/§3.2/§11/EG-3).
* Default tint method in-app is **Spectrum** (ST-6), not the `default.json` "Brightness"; `Raised` (dark under-polygon) is on by default (ST-0); alleys layer draws only shanty-town alleys (ST-4).
* 2017 `Graph.aStar` is a FIFO breadth-first search with no heuristic and an `Array` open set; the live open-set discipline is OPEN (`_critic-os.md` C10); BFS tie-breaks depend on `ObjectMap` key order — a determinism hazard even for the ancestor (`_critic-os.md` §1 row 140, §4.3 item 5).
* 2017 gate loop: 1 gate for E ≤ 5 entrances, ⌊E/3⌋ for E ≥ 6; live: `gates=N` exact, nested picks, one `ArrayExtender.weighted` per gate, gate moved to chord midpoint, castle exactly one gate (profile-mfcg EG2-2/EG2-3).
* Profiler label caveat (`captures/README-labelfix-2026-09-25.md`): class-level rows in older tables may carry mis-credited functions; totals/timings/draw data unaffected. `calls.json` merges same-named minified functions (EG2-4 caveat) — counts for `G`/`k`-style labels are read from V8 byte ranges where it matters.

### §1.1 Facts from the recordings that anchor the matrix (all [SHOWN] unless tagged; profile-mfcg.md section in brackets)

* Pipeline: `City.build()` = buildPatches → optimizeJunctions → buildDomains → buildWalls → buildStreets(+tidyUpRoads) → buildCanals → createWards → buildCityTowers → buildGeometry, all inside one retry loop on the continued RNG stream; then Namer, view (§3.1, ST-8, EG-3).
* Seeds: exactly `8·size + 4` Delaunay input points in 11/11 builds; `Cell.new = Face.new = n − |hull|`; Delaunator (mapbox port, method names verbatim) + DCEL half-edge mesh (§4.1). Spiral constants of the live build unknown; ancestor `a = sa + 5√i`, `r = 10 + i(2+U)` (os-model §3.1, verified `_critic-os.md`).
* Coast: `Noise.get` once per cell, `Perlin.get = 6 × Noise.get` exactly (6-octave fBm), only when `coast=1`; `sea` = direction of open sea in π-radians CCW from screen-East (6 agreeing screenshots) (§2.1, §4.1).
* `buildDomains`: `DCEL.split`/`floodFill` 2× per build only with a coast (§4.3); face splits belong to gates, not domains (EG-7 #4).
* Walls: two `CurtainWall`s (city + castle); `gates=N` gives exactly N city gates (0/1/4/9 tested, three independent counts), picks nested, never adjacent, one `weighted` draw per gate, gate vertex moved to chord midpoint (±0.36 px), each gate consumes its own tower only, `towers + gates` constant, castle gate exactly 1 on the city-facing side; auto count ≈ 0.8·√size (3–7 for sizes 25–80); watergate where a river crosses; outer-cell face split at gates lacking an outer road (EG-1, EG2-1…EG2-3). Wall smoothing formula from 2017 (`min(1, 40/n)`) asserted retained [INFERRED, not measured].
* Citadel: `while (compactness < 0.75) equalize()` — 60 traced values all < 0.75, rising monotonically (§4.4b, EG-3); `Bloating the citadel...` in ~1/6 cities; `urban_castle` inside/outside (4/4 + more images); keep is a large solid, plausibly `PolyBounds.lir` [INFERRED].
* Streets: `Topology` (3 per attempt: streets, canal, one unexplained) + `Graph.aStar`; `aStar = 2N + 1` for N gates (one street in + one road out per gate + castle street) [INFERRED split]; street failure logged, non-fatal (§4.5, EG2-2).
* Rivers: `regularRiver` (no coast) vs `deltaRiver` (coast), generate-and-test with `validateCourse`, discards logged, ~40–50-try cap then whole-city restart (7/10 attempts at size 80 with river+coast), per-node width, 1–8 bridges (two widths), `drawMouth` (§4.6, §11).
* Districts: `DistrictBuilder` seeds (`fromPatch`/`fromVertex`) + `Grower.grow` with `validatePatch`/`validateEdge` (~2.5 validations per accepted cell), `DocksGrower`, `ParkGrower`, `check4holes`, `District.hx:175` hole split; ≥ 8 district types (grammar rules map 1:1); counts 5–17 sub-linear in size (§4.7, §9.2, EG-3).
* Geometry: two-level `Bisector` (ward → blocks with alley gaps; block → lots), `subdivide` ≈ 37 per partition, `obb` on 80 % of nodes, `makeCut = project` 1:1, `detectStraight` ≈ 1.8 per partition, ≈ 18.6 lots per block; `Block.filterInner` removes frontage-less lots; `Block.indentFronts → PolyBool.and` = the stated `Processing: Offset` (None removes exactly it, ST-7); `WardGroup.filter/interpolate/getTris` barycentric over one earcut per ward = live outskirts density falloff, runs only for extramural groups (§4.9, EG2-4).
* Buildings: Lots mode = lots edge to edge; Complex = `Block.createRects` rectangle-composed buildings per lot; Block = one polygon per block; `Building` class builds only 2–19 landmarks in Lots mode (§4.9, ST-7).
* Roofs: Plain = fill + 3 hairline strokes; Hip = one straight skeleton per roof (`run = drawRoof`), ≈ 17 `intersect`/roof; Gable = same skeleton + `addGables` (99.8 % of roofs); ridge ops = 2 × footprint ops + 1; not bit-stable between re-renders (ST-3).
* Trees/forests: `spawnTrees` per ward + per block; 140-point tile stamped per area (`validate = 140 × validateRect`), `fillLine` hedgerows; crown library of 20 built once by `Bloater`; crowns re-picked per render from the seeded stream; one 2t outline pass then per-crown fills (merge effect); forests = `floodFillEx` of free cells → `outline` → `simpleInset` → `resampleClosed` ×2 → `fractalizeClosed` → `Cubic.smoothClosed`, drawn after roads/wards, before walls; none in Block mode (ST-2).
* Farms: `splitField` recursion (~12.6/farm), `Cutter.grid`, `round`, `getHousing` ≈ 1/farm, `PolyCreate.stripe` furrows at width t in colorGreen; built in every run with no `farms` URL key (§4.9, EG-2).
* Naming: Tracery port with `{a|b}`, `0.5?-`, `FLAG?-` guards, `@alias`, `.merge` (Syllables.pinch), `.s`; 4 Markov corpora; district-type-specific rules; `UNIQUE`/`COMPACT` external flags (COMPACT ≠ the 0.75 test) (§9, EG-4).
* Labels: Curved = `SkeletonBuilder` ridge → `Ridge.build` → Visvalingam simplify → `Cubic` (12 samples/segment) → one `Letter` per character along `PathTracker`, halo via outline filter; Straight = on the `Equator.largestSpan`; Legend = numbered discs + panel (title 36 px, entries 21 px); Hidden (§6.2, §8, ST-5).
* Palette: six JSON schemes, 13 keys; roles colorPaper/Dark/Roof/Water/Green/Tree/Wall/Label/Road/Light + tintStrength/tintMethod/weathering; every drawn colour is a scheme value; tints per district in HSV (Spectrum = hue rotation, Brightness = V scale, Overlay = blend to a hue), outlines lerp(dark, tint, 0.30), weathering = per-roof RGB scale ±10 % at 25; Raised under-polygon uses colorWall; wall = casing 1.9 + t colorDark / core 1.9 − t colorWall in Vivid (§10.1, ST-6).
* Stroke rule: `casing = core + 2t` for roads/rivers; piers/bridges `W ± t` (W = 1.2 / 2.0); t in screen px, widths in world metres; streets are negative space; wall one stroke per edge; gate = gap + two blocks drawn outside Canvas2D; towers = Canvas `arc`, castle towers ≈ 1.3× city (§10.3, EG-4, EG2-3).
* Layer order: background → waterbody → road casings → road cores → river casing/core + mouth → per-ward (piers/bridges casing+core, footprints, roofs) → trees → forests → walls → towers/gates → grid → scale bar → compass → district labels → title → UI (§10.5, ST-2).
* Cost: `buildGeometry` ≈ 19.5 ms + 7.5 µs × buildings (R² 0.974); everything else ≤ 30 ms to size 80; one frame's Canvas replay ≈ generation (EG-3, §7).
* Seed chain: Enter successor = stream state after the previous city (k = 331–1 359 steps); size/flags on Enter come from a non-seeded source; cold load seed = clock ms mod 2³¹ + const; `Random.save/restore` isolate sub-generators (a size-40 city advanced the main stream only 585 steps for 1 727 cuts) (EG-3).
* Never executed in any of 45 samples: warp tools (`onWarp`, two `bloat`s, second `equalize`), landmarks add/remove, export (`onExport`), Roads tab UI, Outline tab, Text tab, `toggleAlleys/Districts`, Display Hidden, Ink/BW/Natural/Modern presets (ST-9).

## §2 Capability matrix

Scale for the four confidences: probability in [0, 1] that an expert team, working clean-room from this evidence base
only, achieves the stated goal for that capability. `functional` = same feature, same option surface, statistically
similar structure; `visual` = a viewer places the output in the same quality/style class; `algorithm identity` = our
derivation matches THEIR algorithm, not merely its output ("deriving their code"); `seed-exact` = same seed → same map,
which needs their exact RNG draw order and constants. Confidences are deliberately non-uniform; each carries a one-line
justification. Tags: [STATED] creator text or the build's own trace/asset, [SHOWN] recorded or visible, [INFERRED]
reconstruction, [NAMED-ONLY] symbol/feature with no method.

### §2.0 Summary table

| id | capability | functional | visual | algorithm identity | seed-exact |
|---|---|---|---|---|---|
| A1 | Parameter surface / Blueprint / URL | 0.95 | 0.90 | 0.85 | 0.60 |
| A2 | RNG stream, seed chain, save/restore | 0.95 | — | 0.90 | 0.85 |
| A3 | Pipeline structure and failure policy | 0.90 | — | 0.85 | 0.50 |
| B1 | Patch mesh (spiral seeds → Delaunator → Voronoi/DCEL) | 0.90 | 0.85 | 0.70 | 0.15 |
| B2 | Junction optimisation (short-edge collapse) | 0.85 | 0.80 | 0.60 | 0.10 |
| B3 | Coast / water field and `sea` direction | 0.80 | 0.80 | 0.50 | 0.05 |
| B4 | `buildDomains` (land components) | 0.70 | 0.80 | 0.50 | 0.10 |
| B5 | Curtain wall, gates, towers, watergate | 0.90 | 0.90 | 0.70 | 0.10 |
| B6 | Citadel / castle (repair loop, placement, keep) | 0.85 | 0.85 | 0.55 | 0.05 |
| B7 | Streets and roads (Topology, aStar, tidyUpRoads) | 0.85 | 0.85 | 0.60 | 0.10 |
| B8 | Rivers / canals (regular, delta, bridges, mouth) | 0.75 | 0.80 | 0.40 | 0.03 |
| B9 | Districts (seeded region growing, types, holes) | 0.80 | 0.85 | 0.45 | 0.03 |
| B10 | Ward → blocks (alleys by twisted bisection, district-wide) | 0.80 | 0.80 | 0.50 | 0.02 |
| B11 | Block → lots (twisted bisection, OBB, indentFronts) | 0.80 | 0.85 | 0.45 | 0.02 |
| B12 | Outskirts density falloff | 0.80 | 0.80 | 0.60 | 0.03 |
| B13 | Shanty town / ribbon sprawl | 0.75 | 0.80 | 0.40 | 0.02 |
| B14 | Plaza, temple, churches, gate plazas | 0.80 | 0.85 | 0.50 | 0.05 |
| B15 | Landmark / solid buildings, keep plan | 0.75 | 0.85 | 0.40 | 0.02 |
| B16 | Greens / parks | 0.85 | 0.90 | 0.50 | 0.05 |
| B17 | Farms and fields | 0.80 | 0.85 | 0.45 | 0.03 |
| B18 | Harbour, docks, piers | 0.85 | 0.90 | 0.50 | 0.05 |
| B19 | Trees and forests | 0.85 | 0.85 | 0.70 | 0.02 |
| B20 | Elevation field (`Apply elevation`) | 0.50 | 0.70 | 0.20 | 0.01 |
| C1 | Display modes (Lots / Complex / Block / Hidden) | 0.85 | 0.80 | 0.50 | 0.03 |
| C2 | Roofs Plain / Hip / Gable, Raised, Solids | 0.85 | 0.85 | 0.60 | 0.02 |
| C3 | Lot post-processing (Offset; removed options) | 0.80 | 0.80 | 0.50 | 0.02 |
| D1 | Naming (Tracery + Markov, feature-conditioned) | 0.85 | 0.85 | 0.75 | 0.00 |
| D2 | District labels (curved / straight / legend / hidden) | 0.85 | 0.85 | 0.70 | 0.05 |
| D3 | Map furniture (title, legend, scale bar, grid, compass, emblem, pins) | 0.90 | 0.90 | 0.70 | 0.30 |
| E1 | Colour system (schemes, roles, tints, weathering) | 0.90 | 0.90 | 0.75 | 0.10 |
| E2 | Stroke discipline, layer order, caching | 0.95 | 0.90 | 0.85 | 0.70 |
| E3 | Alleys layer | 0.80 | 0.80 | 0.50 | 0.50 |
| E4 | District view, framing, no-zoom, thin lines | 0.80 | 0.80 | 0.40 | 0.30 |
| F1 | Warp tools (8) | 0.70 | 0.75 | 0.35 | 0.00 |
| F2 | Rerolls, renames, landmarks | 0.80 | 0.80 | 0.60 | 0.10 |
| F3 | UI / hotkeys / size bands | 0.90 | 0.85 | 0.70 | 0.30 |
| G1 | Export PNG / SVG / JSON, `export=` | 0.80 | 0.85 | 0.40 | 0.50 |
| G2 | Integrations (FMG, Armoria, PS, Procgen Mansion) | 0.60 | 0.70 | 0.30 | 0.00 |
| H1 | Population and scale model | 0.85 | 0.80 | 0.60 | 0.30 |
| H2 | Performance envelope | 0.85 | — | 0.50 | — |

"—" = not meaningful for that row (a number is still given in the structured summary, set equal to `functional`).

### §2.A Framework

**A1 — Parameter surface / Blueprint / URL.**
Evidence: [STATED] URL keys from every recorded href (`size, seed, citadel, urban_castle, plaza, temple, walls,
shantytown, coast, river, greens, gates, sea`; profile-mfcg §2) and from creator permalinks (`name, population, farms,
hub, random, export=png|svg|json`; mfcg-posts-b §2.22, mfcg-devlogs-b §2.14); [STATED] size "in wards", min 5 max 200
(47063541, posts-a T20); [SHOWN] the 0.8.1 Generate/Settlement/Style windows enumerated control by control (posts-a
T21; profile-mfcg ST-0); [SHOWN] `gates=N` honoured exactly (EG2-2); [SHOWN] `sea` = open-sea direction in π-radians
CCW from East, 8 agreeing screenshots (§2.1, EG-5); [SHOWN] `farms` is not a live key — fields are always generated
(EG-2, posts-b §2.15). Known: the complete live surface and each key's semantics. Must invent: nothing structural;
the Enter-successor size/flags come from a non-seeded source in the reference (EG-3) — an original design should
seed them. Confidences: functional 0.95 — the surface is enumerated and each key's effect was measured; visual 0.90 —
n/a beyond UI; algorithm identity 0.85 — a query-string blueprint with flag semantics has one natural form; seed-exact
0.60 — URL-seeded loads reproduce (byte-identical screenshots G0c/G0d), Enter chains do not even in the reference.

**A2 — RNG stream, seed chain, save/restore, retry seeding.**
Evidence: [SHOWN, arithmetic] every one of 34 seed transitions across three captures lies on the Lehmer orbit
`s ← s·48271 mod (2³¹−1)`; a retry's "new seed" is the state where the failed attempt stopped (k = 357–1 248 steps);
Enter successor k = 331–1 359; cold-load seed = clock ms mod 2³¹ + const (EG-3); [SHOWN] `Random.{reset, save,
restore, float}` executed, 3 saves / 34–48 restores per city, and a size-40 city advanced the main stream only 585
steps for 1 727 cuts, so geometry runs inside save/restore windows (EG-3, EG2-4); [STATED] 2017 `Random.hx` = MINSTD,
`float/normal/int/bool/fuzzy` definitions verified (_critic-os §1.1). Known: the generator, the continuation-on-retry
rule, the checkpoint discipline. Must invent: which sub-generators are bracketed by save/restore and where the
restore points sit (we see counts, not positions). Confidences: functional 0.95; visual — ; algorithm identity 0.90 —
the recurrence is pinned by 34/34 orbit hits and the checkpointing by counts; seed-exact 0.85 — for the *stream* alone;
same-map still needs every downstream draw order (see other rows).

**A3 — Pipeline structure and failure policy.**
Evidence: [STATED] the build's own `Stopwatch` prints nine stages with Haxe file:line, `buildPatches → optimizeJunctions
→ buildDomains → buildWalls → buildStreets → buildCanals → createWards → buildCityTowers → buildGeometry` (§3.1);
[SHOWN] per-attempt vs per-city counts (§3.2) corrected by ST-8: a geometry exception (`*** CRITICAL: A bad poly was
provided for besecting`) restarts the whole city, so the retry loop encloses all nine stages; [STATED] tiered policy —
repair (citadel equalize/bloat), local retry (canal course, ~40 tries), local skip (street failure logged, `Failed to
make a cut`, `Failed to create a non-empty alleys group`, `Hole in a group, we need to split it`), whole-city restart
(canal exhaustion, bisector exception) (§11, EG-3, ST-8); [SHOWN] restart rate 7/10 attempts at size 80 with
river+coast, 0/8 at size 40 dry (§4.6, EG2). Known: order, boundaries, policy, costs. Must invent: our own restart
budget and an explicit exception taxonomy (the reference's `City.hx:156` is a catch-all). Confidences: functional 0.90;
visual —; algorithm identity 0.85 — the skeleton is [STATED] twice (2017 source + the live trace) and unchanged in
order; seed-exact 0.50 — continuation is known, but which draws each attempt consumes before failing is not.

### §2.B Layout stages

**B1 — Patch mesh.**
Evidence: [SHOWN] `Delaunator.circumradius2 = 8·size + 4` in 13/13 builds (sizes 25–80) (§4.1, EG-7); [STATED]
"replaced my naive implementation of Bowyer-Watson with a port of Delaunator", ~100× faster (devlog 112574,
devlogs-b §2.1); [SHOWN] mapbox/delaunator method names verbatim, `addTriangle = 2n − 4`, `getVoronoi` once, DCEL
`Face.new = Cell.new = n − |hull|` (21–29 hull points dropped), `HalfEdge ≈ 3 × Vertex` (§4.1); [STATED] 2017 seeding
`a = sa + 5√i`, `r = 10 + i(2+U)`, 8·n points, 3 relax passes that in effect move spiral indices n−4..n−2 (_critic-os
§1.3, C9); [STATED] creator's 2017 outline: seeds "placed spirally with random fluctuations", first region = plaza,
next N = wards, then citadel (devlogs-a E1.3); [STATED] "cities were barely more than stylized Voronoi diagrams"
(114184619). Known: point count law, triangulator, dual, mesh type, ancestor constants. Must invent: the live spiral
constants (the `+4` is most plausibly 4 far bounding points [INFERRED]), whether any relaxation survives, how region 0
/ plaza / citadel are chosen on the DCEL (2017: sort by |seed|). Confidences: functional 0.90 — the construction is
fully determined up to constants that a cell-area-vs-radius fit on exported geometry would calibrate; visual 0.85 —
cell size gradient (dense regular centre, coarser rim) is the ancestor's signature and the live counts are consistent
with it; algorithm identity 0.70 — Delaunator+DCEL is [STATED]/[SHOWN], the spiral is inherited but unverified live
(the +4 proves *some* change); seed-exact 0.15 — needs the exact live spiral, the +4 placement, a faithful Delaunator
port (deterministic given input order) and the DCEL's vertex/face emission order; only the first two are plausibly
recoverable from a geometry export.

**B2 — Junction optimisation.**
Evidence: [SHOWN] `City.optimizeJunctions → DCEL.collapseEdge`, ≈ 1 collapse per 2 cells (300 for 615) (§4.2);
[STATED] 2017: merge vertex pairs closer than 8 units to their midpoint, skip the next pair (_critic-os §1.4);
[STATED] 2017 outline: "close vertices are merged to break the Voronoi look and create proper crossroads" (E1.3).
Known: purpose, mechanism (edge collapse on the half-edge mesh), ancestor threshold. Must invent: the live threshold
and whether it is absolute or relative (the map's world scale grows with size, so an absolute 8 would collapse a
different fraction; the measured ≈ 0.5 collapses/cell at size 80 vs unknown at 25 is a first test). Confidences:
functional 0.85; visual 0.80 — the "proper crossroads" look depends on the threshold; algorithm identity 0.60;
seed-exact 0.10 — 0 draws presumably, but collapse order changes downstream vertex order.

**B3 — Coast / water field and sea direction.**
Evidence: [SHOWN] `Noise.get` once per cell and `Perlin.get = 6 × Noise.get` exactly, only with `coast=1` (6-octave
fBm sampled per cell) (§4.1); [SHOWN] `sea` angle law, 8/8 screenshots (§2.1, EG-5); [STATED] 2017 four-step design:
mark terrain as water before building, build normally with no wards in water ("bitten apple"), remove the wall
section on the water, assign seafront blocks as docks with piers (devlog 4923, devlogs-a §2.14); [STATED] early
coast = "rough parabola" with a sign bit, noise-based complex shorelines announced with "no islands or landlocked
lakes" (29538966/29813424, posts-a T8); [STATED] 0.11.2 bays "generated differently and more diverse", headlands
removed (109852547); [STATED] an island city is "next on my list" (2026, still absent); [SHOWN] island *districts* do
occur (posts-b §2.16); [SHOWN] sea drawn as one 159–385-segment polygon, flat fill, hairline coast, no beach
(visual-spec §1.5); [STATED] wall becomes an open chain shore to shore (EG-5). Known: the field type, per-cell
sampling, the direction parameter, the no-island rule, the wall/coast interaction. Must invent: how the 6-octave value
is combined with the sea direction and thresholded per cell (a planar gradient plus noise [INFERRED]), amplitude vs
city radius, the bay-diversity rule of 0.11.2, whether cells are split at the shoreline or classified whole.
Confidences: functional 0.80 — a per-cell noise-plus-gradient classifier with the same invariants is straightforward;
visual 0.80 — the shoreline's wiggle scale must match by eye; algorithm identity 0.50 — sampling scheme [SHOWN],
combination rule [INFERRED], bay logic unknown; seed-exact 0.05 — Perlin table/seeding and octave parameters unknown.

**B4 — `buildDomains`.**
Evidence: [SHOWN] `DCEL.split`/`floodFill` exactly 2× per attempt with a coast, 0× without; `City.splitEdge` coast
only (§4.3); [SHOWN] face splits (`splitFace/removeFace/addFace`) belong to gates, not domains (EG-7 #4). Known:
the stage cuts the mesh along the water boundary and labels connected land components. Must invent: what a domain is
used for downstream (keeping the walled area simply connected; telling the namer which bank; framing) — all
[INFERRED]. Confidences: functional 0.70 — the purpose is inferred; visual 0.80 — largely invisible; algorithm
identity 0.50; seed-exact 0.10 — presumably draw-free.

**B5 — Curtain wall, gates, towers, watergate.**
Evidence: [SHOWN] two `CurtainWall`s per attempt (city, castle); `gates=N` → exactly N city gates for N = 0/1/4/9 by
three independent counts, picks nested (smaller N is a prefix), never adjacent, one `ArrayExtender.weighted` per gate,
each gate vertex moved to the exact chord midpoint of its neighbours (≤ 0.36 px), a gate consumes only its own vertex's
tower (`towers + gates` constant), castle gate exactly one on the city-facing side, castle towers ≈ 1.3× city towers,
city towers omitted on the two citadel-shared vertices, outer-cell face split at gates lacking an outer road
(EG-1, EG2-1…EG2-3); [SHOWN] auto gate count 3–7 for sizes 25–80 ≈ 0.8·√size [INFERRED fit]; [SHOWN] `addWatergate`
once when a river crosses the wall; [STATED] `gates=0` legal (devlog 112574); [STATED] three road-count modes
Default / Maximum / Number (47063541); [STATED] 0.7.6 "fewer unrealistic sawtooths", 0.10.0 walls "much better
smoothed"; [STATED] 2017 rule: candidates = wall vertices touching > 1 inner patch, random pick, splice out ±1,
1 gate for E ≤ 5 else ⌊E/3⌋, smoothing `min(1, 40/n)` (=1 for all shipped sizes), towers on every non-gate vertex,
gate bar drawn along the wall (_critic-os §1.5); [STATED] buildings never touch the wall on either side (E1.5);
[STATED] "small plazas are now created around gates" (devlog 112574); [STATED] a wall crossing water carries
towers (SHOWN 179534) but ends at the shore in later builds (EG-5). Known: nearly everything observable about the
gate/tower laws; the 2017 candidate rule; the midpoint move; the wall's one-stroke-per-edge rendering with a
fixed-width gap and two blocks. Must invent: the `weighted` weights, the auto-count rule, the live wall-smoothing
(never measured — the 2017 formula is asserted, not shown), the "Maximum" mode, the gate-plaza radius. Confidences:
functional 0.90 — the laws are measured to the pixel; visual 0.90; algorithm identity 0.70 — 2017 loop shape plus
measured live deviations, weights and auto rule open; seed-exact 0.10 — the weighted pick's draw order and weights.

**B6 — Citadel / castle.**
Evidence: [STATED] castle always occupies exactly one mesh cell (41711473 comments); [STATED] `urban_castle`
inside vs separately walled annex outside, 4/4 + 4 more images (§2, EG-5); [STATED] inner castles were "surprisingly
hard" and should be "a separate class of objects" (40345972); [STATED, trace] `while (compactness < 0.75)
{ trace; equalize() }` — 60 traced values, all < 0.75, monotone rising, 1–20 iterations (§4.4b, EG-3, ST); [STATED]
Equalize = "makes a single cell more regular in shape equalizing its angles", Bloat = "make individual cells larger"
(40345972, _critic C5) — the citadel repair is the Warp tools applied automatically; [SHOWN] `Bloating the citadel...`
in ~1/6 cities; [STATED] 2017: `compactness < 0.75 → throw`, castle wall aliases the cell, bailey `shrinkEq(4)`,
ortho keep `√A·4`, fill 0.6 (_critic-os §1.5); [SHOWN] keep = one large solid dark polygon (cross/comb plan),
`PolyBounds.lir/lira` 4–12 calls/city plausibly place it [INFERRED]; [SHOWN] `COMPACT` naming flag is not the 0.75
test (EG-4); [STATED] "Reroll geometry" context action; standalone citadel without walls possible (posts-a T12).
Known: placement modes, the shape gate and its repair operators, single gate, keep look. Must invent: the equalize
iteration (angle-equalising step size — the observed increments decay like a contraction ≈ 0.7 [INFERRED]), the bloat
trigger, keep plan generator (`Building.getPlanSym`), where an inner castle's cell is chosen. Confidences: functional
0.85; visual 0.85; algorithm identity 0.55 — operators [STATED] at the operation level, formulas unknown; seed-exact
0.05.

**B7 — Streets and roads.**
Evidence: [SHOWN] `Topology.new` 3 per attempt (streets, canal, one unexplained), `Graph.aStar → buildPath`,
`excludePolygon/excludePoints`, `aStar = 2N + 1` for N gates (one inward street + one outward road per gate + the
castle street [INFERRED split]), `tidyUpRoads` per attempt, street failures logged and non-fatal, roads = city gates
1:1 plus one core-only castle street (§4.5, EG2-1/2); [STATED] "roads are drawn only outside a city, inside a city
they are just gaps between buildings" (30234656), roads radial (39697187), two road classes — main roads "radiating
from the centre" vs alleys (87882877); [STATED] curved streets prototyped 2019 and never shipped; 0.10.x intramural
roads curve because of district-wide twisted bisection, not a street generator (posts-b §2.2, devlogs-b Q11);
[STATED] 2017: `Topology` nodes per vertex, cost = length, blocked = wall/citadel minus gates, `aStar` is a FIFO
breadth-first search with no heuristic, streets `[plaza … gate]`, roads to the node nearest `gate.norm(1000)`,
`tidyUpRoads` dedupe + LIFO chaining (_critic-os §1.6, C6, C10); [SHOWN] `RoadsView.cutCorner/smoothRoad`,
`Chaikin.render` (§6.3). Known: graph, endpoints, exclusion sets, dedupe, rendering, the 2017 search. Must invent:
the live open-set discipline (FIFO vs priority — OPEN, C10), the cost function (pure length in 2017; the live meander
is unexplained), the third Topology's role, the road's far-end rule. Confidences: functional 0.85; visual 0.85 — the
"few radial roads, streets as negative space" look is robust to the search variant; algorithm identity 0.60 —
same names and signatures as 2017, internals unverified; seed-exact 0.10 — even the 2017 result depends on `ObjectMap`
key order for BFS ties (_critic-os §4.3 item 5).

**B8 — Rivers / canals.**
Evidence: [SHOWN] `regularRiver` iff `coast=0`, `deltaRiver` iff `coast=1`, distinct `discard` trace sites; course
search = `Canal.buildTopology → Topology.buildPath → Graph.aStar` with `validateCourse` acceptance, `intersect`
checks; discards 1–11 on success, 35–41 before `*** Unable to build a canal!`; `getCanalWidth` per node (variable
width, widening downstream); `drawBridge` 1–8 per city in two widths (main W = 2.0, secondary 1.2); `drawMouth`
once per delta (§4.6, EG-4); [STATED] `deltaRiver` = river ending in the sea with a widened mouth, NOT a braided
delta (_critic C15); [STATED] 2017 design intent: rivers "run between patches similarly to roads", one per map,
constant width, no loops, bridges where streets cross, mouth (devlogs-a §2.15); 0.6.0 river "more likely to run
through the city"; 0.7.3 fixed "both ends of the river on the coast"; 0.7.7 "more curvilinear", "more secondary
bridges"; 0.11.2 river/coast rework; [SHOWN] two tributaries merging inside a town (817711) and river islets with
districts (posts-b §2.16, devlogs-b §2.21) — so by 2024 the river can be a small tree; [SHOWN] rendered as
casing+core ribbon `W + 2t / W`, W = 6.9–18.9 units (visual-spec §0.2). Known: the two modes, the search-and-test
shape, the try budget, width variability, bridge classes, rendering, failure cost. Must invent: how candidate courses
are proposed (source/sink choice on the mesh edge graph), the acceptance predicate, the width law, tributary logic,
the bank/`riverbank` district coupling, and a budget policy that avoids the 70 % restart rate. Confidences:
functional 0.75 — a mesh-edge path with validation and a widening ribbon reproduces the feature set; visual 0.80;
algorithm identity 0.40 — the routing primitive is [SHOWN] but every rule inside `validateCourse`/`getCanalWidth`
is unknown; seed-exact 0.03.

**B9 — Districts.**
Evidence: [SHOWN] `DistrictBuilder.{fromPatch, fromVertex, getType, getGrower, growAll, sort}`; `Grower.grow` with
`validatePatch`/`validateEdge` ≈ 2.5 validations per accepted cell; `DocksGrower.validatePatch` (coast only),
`ParkGrower` (greens only); `District.{createGroups, pickFaces, check4holes, getRidge, updateColors}`;
`District.hx:175: Hole in a group, we need to split it`; district counts 5–17, sub-linear in size (§4.7, EG-3);
[STATED] "Districts are 'grown' more organically — they are seeded around prominent city features and their borders
are shaped by the landscape … much more diverse in size" (devlog 85275); [STATED] 0.10.0 "merge patches and build
streets district-wide … twisted bisection propagating properties of the outer shape inside" (87882877); [STATED]
district types by name-rule: central, castle, docks, park, bridge, gate, bank, sprawl + generic (grammar.json §9.2),
riverbank type (0.7.1), parks promotable to districts (0.7.2); [STATED] 0.7.6 "better district ordering"; [STATED]
2017 had no districts — a 36-card ward deck + `rateLocation` scoring (verified _critic-os §1.7) — fully replaced.
Known: seeds-then-growth, validation per cell and per edge, special growers, hole repair, type set, the merge that
makes cells invisible. Must invent: seed selection (which features, how many), `validatePatch/validateEdge`
predicates, growth ordering and stop, `getType` scoring, `sort` key, group formation (`createGroups`) and its
interaction with holes. Confidences: functional 0.80 — multi-source growth over a DCEL with barrier-aware edges is a
known technique; visual 0.85 — district legibility is carried by labels/tints, which are well pinned; algorithm
identity 0.45; seed-exact 0.03.

**B10 — Ward → blocks (alleys).**
Evidence: [SHOWN] `WardGroup.createAlleys → Bisector.partition` (41 per size-80 city) then `createBlock → Block.new`
(3 835); `WardGroup.{semiSmooth, getGap, isBlockSized, getCircle, getArc, createChurch, getTris}`;
`WardGroup.hx:107` non-empty-group failure (§4.9); [STATED] alleys "created using 'twisted bisection' … like in
the Neighbourhood Generator", alleys widened (61026228); the construction: a cut that leaves and meets the polygon's
edges at right angles with a bend in the middle (49191011, watabou-extra-a §2.1) — "just an idea, not an algorithm";
holes supported since NG 1.2.0 (extra-b T1); [STATED] "two types of alleys which are quite different" (100431269)
— unexplained; [STATED] 0.10.1 smoothing of "curved alleys and district borders" reduces glitches; [STATED] 2017
`createAlleys`: longest edge, ratio spread `0.8·gridChaos`, jitter ±π/12·gridChaos, leaf `minSq·2^(4·sizeChaos(U−½))`,
gap `ALLEY 0.6`, `emptyProb 0.04` (_critic-os §1.8) — the ancestor of the idea, not the live rule; [SHOWN] 0.10.2
street map: connected planar mesh, mostly 3-valent T-junctions (posts-b §2.9). Known: the primitive, its two-level use,
the district-wide input, the gap idea, the failure handling. Must invent: everything numeric (bend placement, endpoint
edges, stop predicate, alley-width law, `getGap`), plus the second alley type. Confidences: functional 0.80; visual
0.80 — T-junction-dominant curved alleys are reproducible from the stated idea; algorithm identity 0.50 — the idea is
[STATED], the implementation is the creator's own and unstable ("my implementation of it is not [simple]");
seed-exact 0.02.

**B11 — Block → lots.**
Evidence: [SHOWN] `TwistedBlock.createLots → Bisector` with `subdivide` ≈ 37 per partition, `PolyBounds.obb`
(convex hull + `asRotateYX`) on 80 % of nodes, `isSmallEnough` on 97 %, `makeCut = PointExtender.project` 1:1,
`detectStraight` ≈ 1.8 per partition, ≈ 18.6 lots per block; `Block.filterInner` once per block (removes lots without
frontage → courtyards); `Block.indentFronts → PolyBool.and` ≈ 8.8 per block = the stated `Processing: Offset`
("shifts the front side of every lot to make lines of facades uneven"), removed exactly by `Processing: None`
(§4.9, ST-7); [SHOWN] 96 % of footprints have 5–8 path segments (quads/pentagons), adjacent lots share one hairline,
bodies ≈ 13–14 m at size 25 (visual-spec §1.4); [STATED] lot-method history bisection (2017) → Voronoi (0.8.0,
opt-in, crashed) → twisted (0.9.0) → only twisted (0.11.1); `Filter lots`, `Tight`, `Shrink` removed (posts-b §2.4);
[STATED] the stated bent-cut construction is primary and `project` is its perpendicular-foot step; OBB most plausibly
chooses axis/place and feeds `isSmallEnough` — C13 OPEN (_critic §2, profile Critic addendum 3); [STATED] a
per-polygon `rect` is computed in this path (crash report, 61026228); [STATED] side walls perpendicular to the street
as the design goal (28088976, extra-a §2.2); [STATED] "weird" lots are filtered out, not repaired. Known: recursion
shape, OBB involvement, frontage filter, offset pass, stop-test frequency, output statistics to calibrate against.
Must invent: the cut rule itself (bend position, endpoint choice, straight-run snapping), the stop predicate's
thresholds, the reject filter, the offset amount. Confidences: functional 0.80 — the measurable outputs (segment
histogram, lots/block, courtyard presence, shared hairlines) give a tight calibration target; visual 0.85 — this is
the signature texture and it is well characterised at the pixel level; algorithm identity 0.45 — C13 is genuinely
open; seed-exact 0.02.

**B12 — Outskirts density falloff.**
Evidence: [SHOWN] `WardGroup.filter → Triangulation.earcut` once per extramural group, `getTris = interpolate`,
`GeomUtils.barycentric` ≈ 8.5 per interpolation; runs only for extramural groups and is absent at `gates=0`
(§4.9, EG2-4); [STATED] 2017 `filterOutskirts`: per-vertex density 1 at gates / `2U` if all touching patches are in
the city / 0, keep iff `fuzzy(1) > minDist/p` (_critic-os §1.8 row 100); [STATED] 0.10.0 "decreases the density of
streets [in outskirts] while keeping the density of buildings along those streets relatively high" (87882877);
[SHOWN] ribbon development along roads thinning with distance (posts-b §2.6, EG2-4); [STATED] outskirt buildings
"placed by a Village-Generator-like algorithm … proper rectangles", sparser (37407181). Known: the interpolation
mechanism, its ancestor's density values, the two-knob intent. Must invent: the live per-vertex density function,
the street-density vs building-density split, the rectangle placer for extramural blocks. Confidences: functional
0.80; visual 0.80; algorithm identity 0.60 — mechanism [SHOWN] with a verified ancestor; seed-exact 0.03.

**B13 — Shanty town / sprawl.**
Evidence: [SHOWN] `City.buildShantyTowns` once per city iff `shantytown=1`, `City.d` and one closure in the same
signature (EG-2); [SHOWN] at size 80 sprawl dominates the building count (buildings grow ≈ size^2.9, EG-3); [STATED]
0.4.2 "a lot of extramural wards … sometimes produces weird results"; 0.6.0 "shantytowns spread along coast, river
and roads"; `sprawlDistrict` naming rule (`new <city>`, `the slums`, `<dir> slums`) (§9.1); [SHOWN] labels:
WESTERN SLUMS, NORTH SLUMS, GHOST SPRAWL, EAST BRIGHTWOOD (§9.2). Known: trigger, extent, naming, what it looks like
(irregular sparse buildings beyond gates). Must invent: which cells become sprawl (road/coast/river adjacency), density
gradient, block construction (VG-like packing). Confidences: functional 0.75; visual 0.80; algorithm identity 0.40 —
[NAMED-ONLY] beyond the 0.7.5 statement; seed-exact 0.02.

**B14 — Plaza, temple, churches, gate plazas.**
Evidence: [SHOWN] `Market.createGeometry`, `Cathedral.createGeometry`, `WardGroup.createChurch` 22–27 per city,
`BuildingPainter.drawSolids` 5–30, plaza with a monument dot, temple "C"-shaped solid (§4.7, §10.6, EG-5); [STATED]
churches "larger than regular ones, but usually smaller than the Temple … each of them has a small square next to it"
(79147510); "much fewer secondary plazas" (0.9.2); "local churches … don't tend to disappear after rerolling a ward"
(87882877); gate plazas (112574); central square "more rectangular" (0.6.0); [STATED] 2017 Market: statue 0.6, offset
0.3, `rect(1+U)` / `circle(1+U)`; Cathedral ring 0.4 thickness `2+4U` else ortho(50, 0.8); plaza = region 0
(_critic-os §1.8). Known: the elements, counts, placement idiom (plaza at the street convergence, temple on the
plaza), 2017 constants. Must invent: church placement rule per ward group, gate-plaza radius, live plaza shaping.
Confidences: functional 0.80; visual 0.85; algorithm identity 0.50; seed-exact 0.05.

**B15 — Landmark / solid buildings.**
Evidence: [SHOWN] `Building.{create, getPlan, getPlanSym, circumference}` 2–19 per city in Lots mode (keep,
temple, churches); `PolyBounds.lir/lira` 4–12 per city (§4.9, §6.4); `Solids` option paints citadel/temple/churches
in the wall colour, on by default (ST-0); [STATED] 2017 `createOrthoBuilding` (ratio 0.4+0.2U, leaf
`minBlockSq·2^(normal·2−1)`) and "castles consist of rectangles", temples rectangular ~50 % (devlog 8154); keep is
cross/comb-shaped (posts-a T12, devlogs-b §2.22). Known: which buildings are special, how they render, the 2017
rectangle slicer, the symmetric-plan idea. Must invent: the live plan generator (`getPlanSym`), the inscribed-rectangle
use, size rules. Confidences: functional 0.75; visual 0.85; algorithm identity 0.40; seed-exact 0.02.

**B16 — Greens / parks.**
Evidence: [SHOWN] `ParkGrower.*`, `Park.createGeometry`, `PatchView.drawGreen` = `fill #a59f93` exactly, greens only
(§2, §10.1); [STATED] greens optional, sometimes placed "in front of an inner castle to create some space" (40345972);
> 1 park per city, parks "can be marked as separate districts" (0.7.2); `parkDistrict` naming; trees in greens
(0.9.1); [STATED] 2017 Park = radial/semiRadial cut at compactness 0.7 (_critic-os). Known: trigger, growth by a
dedicated grower, flat fill, naming, spacer role. Must invent: the grower's predicates and count. Confidences:
functional 0.85; visual 0.90; algorithm identity 0.50; seed-exact 0.05.

**B17 — Farms and fields.**
Evidence: [SHOWN] `Farm.{getAvailable, createGeometry, splitField (≈12.6/farm), round, getHousing (≈1/farm)}`,
`utils.Cutter.grid` roughly 1/farm, `PolyCreate.stripe` furrows at width t in colorGreen, no outline; fields built
in every run, no URL key (§4.9, EG-2, visual-spec §1.6); [STATED] fields "always generated", hidden by style;
furrows or solid; outlineable (0.10.2, 0.11.1); farmhouses touching a field edge, elongated (37407181); 0.9.1 sawtooth
fix; farm density is an aesthetic choice against realism (47063541); Reddit: smaller, more diverse, grouped fields,
visible borders (E1.6); [STATED] 2017 Farm: `rect(4,4)` housing, ortho(8, 0.5), no fields (_critic-os). Known: the
field pipeline names and counts, rendering, design intent, the Cutter.grid + splitField recursion + rounding
sequence. Must invent: which cells become farmland, the split recursion rule, rounding, furrow spacing law
(≈ 9–10 px at town zoom), housing placement. Confidences: functional 0.80; visual 0.85; algorithm identity 0.45;
seed-exact 0.03.

**B18 — Harbour, docks, piers.**
Evidence: [SHOWN] `City.addHarbour`, `Harbour.*`, `DocksGrower.validatePatch` (waterfront-only absorption),
`PatchView.drawPier` 19–33 pairs per coastal city as 3-op casing+core strokes W = 1.2 ± t (§2, EG-4); [STATED] 2017
design: seafront blocks assigned as docks with piers drawn next to them (4923); `docksDistrict` naming with UNIQUE
flag (§9.1). Known: growth constraint, pier rendering law, naming. Must invent: pier count/spacing per docks cell,
harbour cell selection, quay width. Confidences: functional 0.85; visual 0.90; algorithm identity 0.50; seed-exact 0.05.

**B19 — Trees and forests.**
Evidence (all from the Styles capture, ST-2): [SHOWN] `spawnTrees` per ward and per block; `PoissonPattern.fill =
Forester.fillArea = FillablePoly.new`, `FillablePoly.validate = 140 × validateRect` exactly in 14/14 steps (the static
140-point warped Poisson-disc tile, k = 50, stamped over each area — settles _critic C2/C3 and profile §14 Q1);
`Forester.fillLine` (hedgerows [INFERRED]); positions cached in the model; crown library of 20 built once by
`Bloater.bloat/extrude`, crowns re-picked per render from the seeded stream; one `colorDark` outline pass at 2t under
per-crown fills (visual merge without a union); forests = `DCEL.floodFillEx → outline → simpleInset → resampleClosed ×2
→ fractalizeClosed → Cubic.smoothClosed`, one fill per forest, drawn after roads/wards and before walls, absent in
Block mode; [STATED] forests "fill all available space (i.e. not occupied by the city, farmland or water)", roads run
"under" the forest, edges "too straight" on large maps (114184619); trees in greens, courtyards, between fields,
no density control, three placement generations (posts-b §2.13). Known: nearly the whole pipeline at routine level
plus the tile arithmetic. Must invent: tile placement/offset rule, `fillLine` spacing, crown seed polygon and bloat
amounts, inset distance and fractal amplitude. Confidences: functional 0.85; visual 0.85; algorithm identity 0.70 —
one of the best-pinned subsystems; seed-exact 0.02 — the reference's own re-renders are not bit-stable.

**B20 — Elevation field.**
Evidence: [STATED] `Layout > Elevation` / `Apply elevation`: "alleys get affected by a 'gradient field', which
emulates a presence of height difference … stronger around the castle, close to the coast and on the river banks";
users "don't see the difference" (devlog 67134); height-maps exist internally but are not exported (37407181);
no elevation features drawn by design (41711473); no capture ever toggled it (ST-9). Known: intent and the three
influence sources. Must invent: the field, its gradient's effect on the bisector, magnitude. Confidences: functional
0.50 — the effect is admitted to be barely visible, so "equivalent" is hard to verify; visual 0.70; algorithm identity
0.20; seed-exact 0.01.

### §2.C Buildings and display

**C1 — Display modes.**
Evidence: [SHOWN] Lots = lots edge to edge; Complex = `Block.createBuildings → createRects` per block,
`Building.create ≈ drawRoof` per lot, `getPlanFront`, `PolyCore.rectArea`, `isRectangle` — each lot holds a smaller
rectangle-composed L/T building; Block = one polygon per block (`drawRoof` 0, trees off); Hidden = houses hidden,
walls/citadel/temple kept (ST-7; posts-b 100431269); [STATED] Off/Simple/Complex/Blocks since 0.5.3 (devlogs-a), Simple
removed 0.11.1; the 1PDG-era "largest inscribed rectangle → cut into blocks → discard some" house method (devlog
11802). Known: the four modes and their per-lot machinery. Must invent: the rectangle-composition rule of Complex.
Confidences: functional 0.85; visual 0.80 — Complex footprints are seen only in two zoom crops; algorithm identity 0.50;
seed-exact 0.03.

**C2 — Roofs, Raised, Solids.**
Evidence: [SHOWN] Hip = one straight skeleton per roof (`SkeletonBuilder.run = drawRoof`), ≈ 17 `intersect` per roof,
ridge-path ops = 2 × footprint ops + 1 for 96 % of roofs; Gable = same skeleton + `addGables` on 99.8 % of roofs,
same op count, endpoints moved; roofs without a gable path are drawn plain; not bit-stable across re-renders; Plain
= fill + 3 hairline strokes; `Raised` on by default = the dark under-polygon offset ≈ (+0.25, +0.7) units, filled in
colorWall (ST-0, ST-3, ST-6, visual-spec §1.4); [STATED] roofs "built on straight skeletons", Hip/Gable "a little
slower", raised gables "look like greenhouses" (101942512); the skeleton is the creator's own O(n²) wavefront that
"glitches in special cases"; the gable variant is a "modified algorithm" that works only on clean shapes
(101173551, extra-b T3/T4); shaded roofs and ground shadows are unreleased experiments (114858238). Known: per-roof
skeleton, gable post-pass, drawing law, defaults. Must invent: the wavefront implementation and its special-case
handling, the gable end-edge selection, the raised offset vector. Confidences: functional 0.85; visual 0.85;
algorithm identity 0.60 — a naive O(n²) event loop is [STATED]; seed-exact 0.02.

**C3 — Lot post-processing and the removed options.**
Evidence: [SHOWN] Processing = None / Offset only in the live build; Offset = `Block.indentFronts` (ST-7); [STATED]
Shrink, Filter lots, Lots method (Bisection/Voronoi/Twisted), Tight, No triangles, Improved lots and Display Simple
existed 0.7.2–0.11.0 and were removed as "too many options" (posts-b §2.4, §4.3); the display-mode auto-switch pairing
(voronoi↔simple, twisted↔lots). Known: the live surface and its history. Must invent: nothing required for parity
with 0.11.x; the Voronoi lots path is optional history. Confidences: functional 0.80; visual 0.80; algorithm identity
0.50; seed-exact 0.02.

### §2.D Naming and labels

**D1 — Naming.**
Evidence: [STATED, asset] `grammar.json` captured verbatim (4 401 B): Tracery with `{a|b}`, `{suffix}`, `0.5?-`,
`FLAG?-`/`!FLAG?-` guards (CASTLE, WALLS, COAST, RIVER, PLAZA, TEMPLE, UNIQUE, COMPACT), `@alias`, `.merge`, `.s`;
per-district-type rules (central, castle, docks, park, bridge, gate, bank, sprawl); four Markov corpora (english,
given_male, given_female, elven); `Syllables.pinch` elision; `DeckRuleSelector` draw-without-replacement;
`Grammar.addExternal` 3 calls (§9); [SHOWN] every observed title and label parses against the grammar (§9.2, EG-4);
COMPACT ≠ the 0.75 test (EG-4); [STATED] population ≈ 6.12–6.13 per building (_critic C1); 2017 outline: names
"reworked … code much simpler" (0.10.2). Known: the whole schema and its conditioning. Must invent (by the clean-room
rule, not by ignorance): original grammar content and corpora with the same schema ideas; the `pinch` rule; the
UNIQUE/COMPACT predicates. Confidences: functional 0.85; visual 0.85 — names in the same register are easy to author;
algorithm identity 0.75 — Tracery-plus-Markov with feature guards is [STATED] by the asset; seed-exact 0.00 — the
wordlists must differ by ruling, so same-seed names cannot match by construction.

**D2 — District labels.**
Evidence: [SHOWN] Curved = `SkeletonBuilder.run → District.getRidge (getPath/getPath2Root) → Ridge.build →
Equator.build/largestSpan → PolyUtils.simplify = visvalingam 1:1 → Cubic.smoothOpen (12 samples/segment) → CurvedLabel`
with one `Letter` per character placed by `PathTracker.getPos/get_tangent`, halo via an outline filter then
`removeOutline`, 27 px IM FELL, label size ∝ district size (glyph canvases 15–55 px), one `fillText` per glyph
(§6.2, §8, visual-spec §1.7); Straight = on the equator (largest span), ridge not built; Legend = numbered paper/dark
discs + panel (title 36 px, entries 21 px, scale bar moved in); Hidden (ST-5); [STATED] 0.11.1 "drawing an area label
along a 'ridge' of the area's straight skeleton … which ridge is most suitable is not always obvious"
(102377277); the 2019 predecessor OBB + double cut + circular arc with `R = C/|d|` (27776897, posts-a T1); the skeleton
is the creator's own and hole-blind (extra-b T6); "no multi-line labels"; labels cannot be moved manually. Known:
the full chain, the fonts, the halo, the sizing behaviour, the two-era version ladder. Must invent: the ridge
selection score, the font-size rule, collision handling (none observed), the halo filter parameters. Confidences:
functional 0.85; visual 0.85; algorithm identity 0.70; seed-exact 0.05.

**D3 — Map furniture.**
Evidence: [SHOWN] title 54 px, no halo; scale bar bottom-left, 5 ticks, old-style figures, 0/100/200 m or 0/500/1000 m
or km, `UnitSystem.getPlank` (imperial supported); grid 1 px 27 %-ink at 112–120 px pitch = 100 m / 500 m / 1 km,
drawn over water and buildings, under furniture; compass 164×163 8-ray rose with ink/paper split halves, ring, "N",
`Compass.reroll` once per session (non-seeded), rotatable by scroll wheel; emblem fetched from Armoria
(`/png/200/1`, `/svg/200/1`, `/png/800/1`); legend as a generic element container with corner positioning and
metric/imperial toggle; landmarks as teardrop pins (a–h) vs district discs (1–N); frame; `Elements` colour role
(§1, §8, §10.5, visual-spec §1.7; posts-a T16; posts-b §3). Known: everything visible. Must invent: nothing beyond
our own emblem source (Armoria is an external service) and an original compass design. Confidences: functional 0.90;
visual 0.90; algorithm identity 0.70; seed-exact 0.30 — compass style is rolled per session, not per seed.

### §2.E Rendering

**E1 — Colour system.**
Evidence: [STATED, asset] six JSON schemes × 13 keys (paper, light, dark, roof, water, green, tree, wall, label, road,
tintStrength, tintMethod, weathering) captured verbatim (§10.1); [SHOWN] every drawn colour is a scheme value;
tints computed once per district at creation in HSV — Spectrum = hue rotation at fixed S/V (the in-app default,
not the JSON's "Brightness"), Brightness = V scale, Overlay = blend toward a per-district hue; roof outlines and ridge
lines = lerp(colorDark, tint, 0.30); weathering = per-roof uniform RGB scale ≈ ±10 % at 25 (`Color.scale` once per
roof); Raised under-polygon = colorWall; in Vivid the wall is casing 1.9 + t colorDark / core 1.9 − t colorWall; legend
discs use colorLabel (ST-6); [STATED] role history 4 → 7 → 8 → 13, SVG palette files with `id` = role (E1.2), district
hues "assigned randomly" (494692), styles page with 9 schemes (109852547); 2017 DEFAULT/INK anchors preserved verbatim
(§12.3). Known: the role model, the three tint methods' maths, strength/weathering semantics, defaults. Must invent
(clean-room): our own scheme values; the hue-sampling rule (uniform? repulsion between neighbours — the images suggest
yes). Confidences: functional 0.90; visual 0.90 — the class is reproducible with original values; algorithm identity
0.75; seed-exact 0.10.

**E2 — Stroke discipline, layer order, caching.**
Evidence: [SHOWN, exact in 12+ draw records] `casing = core + 2t` for roads (W = 2.0) and rivers; piers/bridges
`W ± t` (W = 1.2 / 2.0); t = hairline ≈ 0.5 screen px converted to world units, widths in world units (two coordinate
spaces); wall 1.9 units ≈ 8 m, one stroke per edge, gate = fixed-width gap + two blocks drawn outside Canvas2D;
towers = `arc` fills 14–24 px; streets/alleys are negative space; round joins/caps everywhere (1 miter in 4 063);
no dashes, no alpha, no gradients; layer order background → sea → road casings → road cores → river → landmarks →
per-ward bitmaps (piers/bridges, footprints, roofs) → farms → trees → forests → walls → towers → grid → scale bar →
compass → labels → title → UI; one cached bitmap per ward (≈ 600 GPU uploads for 46 000 fills) (§10.3–10.5, EG-4,
ST-2, visual-spec §0.2, §1.3, §1.8). Known: all of it. Must invent: nothing; only decide whether to keep the 1× no-HiDPI
canvas. Confidences: functional 0.95; visual 0.90; algorithm identity 0.85 — the arithmetic is exact and repeated;
seed-exact 0.70 — deterministic given the model (the only stochastic render step is crown picking).

**E3 — Alleys layer.**
Evidence: [SHOWN] `Show alleys` triggers `FormalMap.updateRoads` only; one t-wide `colorDark` path (518 ops) drawn
under the road cores and under every ward canvas; only sprawl alleys change pixels, intramural alleys stay unstroked
gaps; appears only in cities with a shanty town (ST-4); [STATED] alleys "don't look exactly like major roads";
exported in JSON when shown (100431269). Known: what is drawn and where. Must invent: the reason only sprawl alleys
are stroked (one of the "two types of alleys"). Confidences: functional 0.80; visual 0.80; algorithm identity 0.50;
seed-exact 0.50 — a pure render pass.

**E4 — District view, framing, no-zoom, thin lines.**
Evidence: [STATED] real zoom "too difficult for a specific technical reason" (OpenFL; scale-baked line widths
[INFERRED]); District view re-fits the viewport to one district and redraws "exactly in the same way", border as a
thick semi-transparent dashed line (101942512); framing "chooses a window more correctly" with sprawl/river tails
(0.7.2, [NAMED-ONLY]); [SHOWN] the view is refitted per city (same seed drawn at 1.34× / 1.17× / 1.0× as gates change),
`t` and every canvas scale with it (EG2-4); `N` = thin lines (strokes ⅓ width). Known: behaviour. Must invent: the
fit rule (most plausibly the extent of roads and extramural development). Confidences: functional 0.80; visual 0.80;
algorithm identity 0.40; seed-exact 0.30.

### §2.F Editing and interaction

**F1 — Warp tools.**
Evidence: [STATED] eight tools with hotkeys — Displace, Liquify ("same as Displace but softer"), Rotate (whole map),
Relax (fix short edges), Bloat (enlarge cells), Pinch (inverse), Equalize (angle-regularise one cell), Measure (metres);
brush radius with falloff (two concentric circles), Apply/Discard = staged commit, warping moves vertices only and
cannot change topology, "too much distortion may cause glitches", edits are never persisted in the URL (40345972,
494692, 22794, 102377277; posts-a T4, devlogs-b §2.16, _critic C4); [SHOWN] the citadel repair uses the same
Equalize/Bloat primitives automatically; never executed in any recording (`onWarp`, two `bloat`s, second `equalize`
unexecuted, ST-9). Known: semantics and the data-model constraint (all downstream geometry re-derives from moved
mesh vertices). Must invent: kernels and the re-derivation cascade. Confidences: functional 0.70 — unrecorded, but
the semantics are stated and standard; visual 0.75; algorithm identity 0.35; seed-exact 0.00 — edits are not
reproducible even in the reference.

**F2 — Rerolls, renames, landmarks.**
Evidence: [STATED] cmd/ctrl-click a ward rerolls its inner geometry keeping type and shape (19034, 494692); shift-click
a label rerolls all district names; city name editable and URL-persisted, district names not; landmarks: right-click
create, drag, rename, delete, bulk-load from a JSON array of strings, placed randomly, listed in the legend; "Reroll
geometry" on the castle; [SHOWN] save/restore isolation makes per-ward rerolls possible without moving the main stream
(EG-3); [STATED] churches used to "disappear after rerolling a ward" (87882877) — rerolls regenerate a ward's contents
including attached point features. Known: the surface and the determinism contract (ward interior = f(polygon, type,
params, sub-seed)). Must invent: sub-seed derivation. Confidences: functional 0.80; visual 0.80; algorithm identity
0.60; seed-exact 0.10.

**F3 — UI, hotkeys, size bands.**
Evidence: [SHOWN] Generate (Features / Roads tabs; Small / Medium / Large / Size / Rebuild / From URL), Settlement
(name, buildings, population, reroll names, POIs, Warp, Overworld, Copy URL, Export as), Style (Graphics / Elements /
Buildings / Outline / Misc / Text) with every control and default (ST-0, posts-a T21); [STATED] hotkeys (494692);
Enter = new city in the same size group with size/flags re-rolled from a non-seeded source; bands consistent with
[24, 40) and [40, 80) (EG-3); Medium = 20–40 patches since 0.10.0 (87882877); "too many buttons" is a stated design
budget (E1.7). Known: all of it. Must invent: nothing. Confidences: functional 0.90; visual 0.85; algorithm identity
0.70; seed-exact 0.30.

### §2.G Export and interoperability

**G1 — Export.**
Evidence: [STATED] PNG (hi-res; forests lower the export resolution), SVG (rewritten 0.9.0, "only hatching
unsupported", now text too), JSON "GeoJSON-like" one-way, loadable only by City Viewer, carrying districts, buildings,
walls, trees, alleys (when shown), fields, rivers; first feature is a metadata record (`roadWidth`, `towerRadius =
wallThickness`, `riverWidth`, `version`) in degree units anchored near 20 °E 40 °N (≈ 8 m road, ≈ 7.6 m tower,
≈ 34 m river at 0.7.4); `export=png|svg|json` URL key; District view exports the whole city's JSON (posts-a T17,
posts-b §2.22, devlogs-b §2.14); never executed in a recording (ST-9). Known: formats, one-way rule, partial schema.
Must invent: our own schema (the reference's has drifted and breaks its own viewer). Confidences: functional 0.80;
visual 0.85 — SVG parity is a renderer property (E2); algorithm identity 0.40; seed-exact 0.50.

**G2 — Integrations.**
Evidence: [STATED] Azgaar FMG two-way (`size = population/1000`, Overworld button), Armoria emblem (random; Customize),
Perilous Shores → MFCG with `perilous` tag, MFCG → Procgen Mansion per building (grid ≈ 3 m), NG integration rejected
(posts-a T21, posts-b §2.22, devlogs-a §2.26). Known: hooks. Must invent: our own equivalents (external services).
Confidences: functional 0.60; visual 0.70; algorithm identity 0.30; seed-exact 0.00.

### §2.H Scale and performance

**H1 — Population and scale model.**
Evidence: [SHOWN] population ≈ 6.12–6.13 per building (four Settlement panels, _critic C1); `size` in wards = cells,
medium 1 000–2 000 buildings; buildings grow ≈ size^2.9 across mixed-option cities (EG-3); [MEASURED] 1 world unit
≈ 3.7 m (grid 112.4 px = 100 m at s ≈ 4.15 px/unit), wall 1.9 u ≈ 8 m, road 2.0 u, buildings 13–14 m at size 25
(visual-spec §0.2, §1.4); [STATED] "dimensions are a mess in all my generators" (79147510); three coupled size
notions (wards, buildings, FMG population/1000) (devlogs-b §2.19). Known: constants and their inconsistency. Must
invent: a coherent unit model (an improvement target). Confidences: functional 0.85; visual 0.80; algorithm identity
0.60; seed-exact 0.30.

**H2 — Performance envelope.**
Evidence: [STATED, Stopwatch] model 16–290 ms for sizes 24–80 (≈ 19.5 ms + 7.5 µs × buildings, R² 0.974); everything
before `buildGeometry` ≤ 30 ms; failed attempts 10–30 ms each; one frame's Canvas2D replay ≈ generation; startup tax
(audio context 137 ms, shaders 50–90 ms); coverage inflation 1.9–5.2× (§7, EG-3); [STATED] 2018: "never takes longer
than a fraction of a second" (34104). Known: the budget and its shape. Must invent: nothing. Confidences: functional
0.85 — a modern implementation can meet it; algorithm identity 0.50 — n/a.

## §3 Overall verdict

| dimension | confidence | one-line basis |
|---|---|---|
| functional (behaviour-equivalent MFCG-class generator, same option surface, statistically similar structure) | **0.80** | the feature surface is enumerated control by control; every stage's structure is [SHOWN] by counts and traces; the unknowns are constants in five stages (lots, alleys, districts, rivers, outskirts) that measurable outputs can calibrate |
| visual (same quality/style class) | **0.85** | palette roles, widths, casing law, layer order, fonts, halo, label sizing, tree/forest drawing and roof line-work are measured to the pixel; the lot texture (B11) is the one risk |
| algorithm identity ("deriving their code") | **0.50** | the nine-stage skeleton, RNG, Delaunator/DCEL, straight skeleton, tile-stamped trees, tint maths and casing are theirs beyond doubt; the internals of the five heaviest stages are the creator's own unpublished heuristics (bent bisection, growers, canal validation, shanty placement, gate weights) |
| seed-exact (same seed → same map) | **0.02** | the Lehmer stream is pinned, but same-map needs the live spiral constants, the +4 points, every stage's draw order and constants, the weighted gate pick and the BFS tie-break order; the clean-room naming rule alone guarantees the names differ |

**Effort estimate (expert team, clean-room, MFCG-class parity of the base — not the fused MFCG+FTG architecture,
which is another lane's estimate): ≈ 42 person-weeks, range 32–55.** Breakdown: mesh/coast/walls/gates/castle/streets
10; rivers 4; districts + ward groups + twisted bisection + outskirts + sprawl 10 (the calibration loop against
exported geometry is most of it); farms/greens/harbour/landmarks 3; trees/forests/roofs 4; naming + labels 3;
renderer + colour system + furniture 4; export/UI/warp/rerolls 4. The reference took one developer nine years of
part-time iteration, but the evidence base removes most of the search; what it does not remove is the tuning of five
heuristics that only converge by comparison against measured outputs.

**One paragraph.** MFCG is the best-evidenced of the four references: the live build prints its own stage names and
source line numbers, 45 V8 call censuses give exact per-routine counts and 1:1 identities, complete Canvas2D records
give every width and colour, the naming grammar and palette schemes were captured verbatim, the 2017 GPL ancestor pins
the RNG and the shape of five stages, and the creator has described the bent-bisection, skeleton-label, tint,
forest and gate semantics in his own words. That makes behaviour-equivalent and visually equivalent reproduction
likely (0.80 / 0.85). "Deriving their code" is a different question: the heavy stages — twisted bisection's cut
rule and stop predicate, the district growers' predicates, the canal course validator, the sprawl placer and the
weighted gate pick — are unpublished heuristics whose only trace is call counts, so algorithm identity sits at 0.50
and same-seed reproduction is effectively unattainable (0.02) without the source, which the clean-room ruling forbids.
The right target is therefore parity of measurable statistics and of the visual grammar, with our own constants and
content, and the cheapest next evidence is a geometry export (SVG/JSON) of a few seeds to calibrate against.

## §4 The ten riskiest unknowns, ranked

Ranked by (visual and structural weight of the stage) × (how little the evidence constrains it).

1. **Twisted bisection's cut rule and stop predicate (B10, B11).** Bend placement, endpoint-edge choice, the role of
   the OBB vs the stated perpendicular construction (C13 OPEN), `isSmallEnough` thresholds, street-width law, the
   "weird lot" reject filter, and the second alley type. This is the signature texture of every MFCG map and the
   creator's own unstable implementation; nothing but call ratios (37 nodes/partition, 18.6 lots/block, 1.8
   `detectStraight`/partition) and output statistics constrain it.
2. **District growing (B9).** Seed selection among "prominent features", `validatePatch`/`validateEdge` predicates,
   growth order and stop, `getType` scoring, group formation and hole handling, plus the 0.10.0 district-wide merge
   that makes cells invisible. Determines legibility and the modern look.
3. **River course proposal and acceptance (B8).** Candidate generation on the mesh graph, `validateCourse`, the
   ~40-try budget, the width law, tributaries and islets, and the 0.11.2 bay rework; the 70 % restart rate at size 80
   is a behaviour we should not copy and cannot yet explain.
4. **Live patch seeding (B1).** The `+4` points, whether the 2017 spiral constants and relaxation survive, plaza and
   citadel cell selection on the DCEL, and the junction-collapse threshold (B2). Foundation of everything and the
   first gate of any seed-exact hope.
5. **Gate policy (B5).** The `weighted` pick's weights, the auto count rule (≈ 0.8·√size is a fit over five sizes),
   "Maximum" mode, the live wall smoothing (0.7.6 de-sawtoothing, 0.10.0 smoothing — never measured), gate-plaza size.
6. **Outskirts and sprawl (B12, B13).** The live per-vertex density function, the street-density vs building-density
   split, the VG-like rectangle placer for extramural blocks, which cells become shanty town along roads/coast/river.
7. **Street search internals (B7).** FIFO vs priority open set (C10), the cost function behind the meander, the
   road far-end rule, the third `Topology`, and the smoothing parameters (`cutCorner`, Chaikin passes).
8. **Castle internals (B6, B15).** The equalize step (angle equalisation with contraction ≈ 0.7), the bloat trigger,
   the inner-castle cell choice, and the keep plan generator (`getPlanSym`, `lir`).
9. **Coast field composition (B3, B4).** How the 6-octave fBm combines with the `sea` gradient and is thresholded per
   cell, the amplitude relative to city radius, the bay-diversity rule, and what `buildDomains` feeds downstream.
10. **Label ridge selection and font sizing (D2), and tint hue sampling (E1).** Which skeleton path is the ridge, the
    size rule, halo parameters; and whether district hues repel neighbours.

Honourable mentions (lower weight): the elevation field (B20), the framing rule (E4), forest inset/fractal amplitudes
(B19), `Syllables.pinch` (D1), and the church placement rule (B14).

## §5 Cheapest experiments that would raise confidence most

Ordered by expected confidence gain per hour, using the existing harness (`profiler/drive.mjs`, `session.mjs`).

1. **Geometry export of a few seeds (`export=svg` and `export=json` URL keys).** One session, no new tooling: the SVG
   gives every lot, street gap, wall, river and field as exact vectors in world units; the JSON gives the district and
   building model and the metadata record. This is the single largest upgrade: it turns the lot/alley/outskirts/river
   unknowns (#1, #2, #3, #6) from "call counts" into measurable distributions (lot area and aspect, frontage depth,
   courtyard ratio, alley width by depth, block valence, river width along the course, ribbon density vs distance).
   Do it for the four `seed=555001&size=40` gate runs plus one size-80 river+coast city so the same cities already
   characterised by counts get geometry. Caveat: `export=` was never executed in a recording, so verify it still works
   on build 12710731 first.
2. **Parameter sweeps on one seed with the URL harness.** `size` = 5, 10, 20, 40, 80, 120, 200 with `coast=0&river=0`
   (cell count = 8n+4 − |hull|, gate count, district count, building count, scale bar, `t`, timings, restart rate);
   `sea` in 0.1 steps (coast geometry vs angle); `gates` = −1 vs explicit at three sizes (auto rule); `urban_castle`
   and `walls=0&citadel=1`. Cheap, and it pins #4, #5 and the cost curve.
3. **Ancestor cross-check in Python.** Generate the 2017 spiral for `8·size + 4` points, run any Delaunay, and compare
   hull size (21–29 measured), cell-area-vs-radius and the plaza/citadel positions against the SVG export of the same
   sizes. Confirms or refutes "still the 2017 spiral" without opening any bundle (#4).
4. **One more style capture** with `greens=1` + trees on (fifth `spawnTrees`), Raised off, Display Hidden + alleys,
   the Outline and Text tabs, a landmark list, Warp Apply/Discard on a small edit, and `export=` — closes the remaining
   never-executed list (ST-9) and turns F1/G1 from [STATED] to [SHOWN].
5. **Same-city A/B on `Processing` and `Roofs` at three sizes** with draw records — the per-roof op law and the
   offset amount (Offset vs None pixel diff) at different `t` give the indent distance in world units (#1, C2).
6. **Build the 2017 ancestor once (Haxe html5)** as `_critic-os.md` §6.1 recommends: settles the runtime-dependent
   semantics and yields per-seed goldens for the five inherited stages — the only route to any seed-exact claim, and
   only for the ancestor.

## §6 CONFIRMED vs PLAUSIBLE

* **CONFIRMED (executed evidence read in this seat):** every count, law, colour, width, font, layer order and trace
  quoted above is taken from the findings' own recorded data (`calls.json`, `draw.json`, `console.jsonl`, screenshots),
  and every creator statement is cited to its post id; the critic rulings applied (population, PoissonPattern,
  equalize = angles, deltaRiver, retry continues the stream, geometry failures restart the city, default tint
  Spectrum, alleys layer scope) were read at source in `_critic.md`, `_critic-os.md` and the profile addenda.
* **PLAUSIBLE (reasoning only):** every confidence number, the effort estimate, the ranking in §4, and the
  [INFERRED] mechanisms I carried forward (the +4 bounding points, the sea-gradient-plus-noise classifier, the
  aStar 2N+1 split, the `lir` keep placement, the equalize contraction, the framing rule). No recording, bundle or
  source file was opened in this seat; nothing was executed.
* **Not read in full (recorded in §0):** the stage bodies of the three OS files and the non-listed sections of the
  devlog and watabou-extra files; their constants and contradictions reached this assessment through `_critic-os.md`
  and the posts files, which were read whole.
