# _critic-code — critic seat over the six compiled-code readings

> READER-TIER — behind the implementer firewall (owner directive 2026-09-27); logic in our own words; no code or assets copied.
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat code/_critic; queued in docs/FABLE-REVIEW-QUEUE.md.

Seat run 2026-09-27 (lane `code/_critic`, Opus 5.5 standing in for Fable) over `code-mfcg.md`, `code-village.md`,
`code-neighbourhood.md`, `code-manor.md`, `code-dwellings.md`, `code-ftg-client.md`. Nothing outside
`/Users/cstokes/Desktop/Maps` and this session's scratchpad was consulted. Working notes and scripts:
`scratchpad/critic/` (`notes.md`, `copyaudit.py`, `sim_overlap.py`, `sim_runs.py`); scratchpad =
`/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/454522d3-02d4-4290-bb60-ba2f045c687d/scratchpad/` (session-local,
reader-tier). Verdict vocabulary: `_critic-ftg.md`'s RESOLVED / RECONCILED / OPEN for contradictions; CONFIRMED /
CORRECTED / REJECTED for re-derivations.

**Headline ruling.** The six readings hold up: 37 claims re-derived in the class extracts and bundles, **33 CONFIRMED,
4 CORRECTED, 0 REJECTED**, and three reader receipts re-executed with identical output. The copy audit finds **no
verbatim code** in any reading. Four things change what a designer would believe:
(1) **"watabou's bisector" is two versions.** MFCG (itch 12710731) and VG 1.6.9 try a straight cut first (sin² > 0.99
plus the balance test) and bend only when it fails. NG 1.2.2 has no straight test: it always places the bend and
flattens it afterwards. Each reading is right about its own bundle. The design's S8 was calibrated on NG, so its
reference citations must name NG 1.2.2 (X2, R8).
(2) **VG's "folded four-draw" mean is wrong.** The draw |(sum of four uniforms) ÷ 2 − 1| has mean exactly 7/30 ≈ 0.233,
as NG and FM state, not ≈ 0.28 (X1).
(3) **VG's no-crossing boolean subtraction statement is wrong.** A piece lying wholly inside the subtracted shape comes
back unchanged; disjoint pieces return "nothing", and callers keep the piece. So a subtraction that crosses no edge never
changes the piece (X6).
(4) **FTG's field-9 "lot" statistics are lawn patches** (texture 18, re-derived), so `_critic-ftg.md` F13's
per-lot figures must not calibrate anything (P2, R10).

## 0. What this seat did and did not do (read this first)

* **Read cover to cover:** all six readings (4 898 lines; `code-mfcg` 800, `code-village` 897, `code-neighbourhood`
  791, `code-manor` 638, `code-dwellings` 945, `code-ftg-client` 827), in 200–250-line ranges; the format reference
  `_critic-ftg.md` §0–§1.
* **Profiles, by targeted search** (not cover to cover): the passages each reading's §6 quotes. There were 10 quote
  checks across `profile-mfcg.md`, `profile-village.md`, `profile-neighbourhood.md`, `manor.md`, `_critic-dwellings.md`,
  `_critic-ftg.md` and `docs/confidence/{mfcg,ftg}.md`. The profiles were not re-read in full; §2 P-rows cover only
  what those checks touched.
* **Code re-read** (extracts under `scratchpad/code/<generator>/classes/`, present, not re-extracted). MFCG: `Bisector`
  in full, `TwistedBlock.createLots`, `CurtainWall.buildCityGates`, `TownInfo.update`, `District.createParams`,
  `Bloater`, `City.buildPatches`, `Canal.updateState`, and the constants of `Delaunator`. VG: `Blueprint.adjust`,
  `Region.rollPopulation`, the `JSONExporter` scale, `Bisector.detectStraight` plus its straight test, `Bloater.extrude`,
  `PolyBool.and`, `PolyBounds.containsPoint`. NG: `Bisector` stop test and `makeCut`, `Settings.processTags`,
  `MapScene.reset`, the `JsonExporter` scale. FM: `ManorScene.getPoly`/`ring`/`reset`, `Wing.createSlab`,
  `Manor.spawnTowers`. Dwellings (readable copies in `classes_r/`): `Specs.process/rollStairs/pickEntrance`,
  `Plan.divideArea`, `HouseType.assignSet`, `Random.reset`. FTG: the bundles themselves, searched by name (the edge and
  texture enums, `mapPositionArray`, `convertPosition`, `determineWaterBodyType`, `ROOF_SCALING_FACTOR`, the
  edge-width helpers in `0013`).
* **Executed:**
  * The copy-audit scan and the harness-overlap measurement (§4).
  * The exact mean of the folded four-draw, by rational integration of the Irwin–Hall density, plus a
    2·10⁶-draw Monte Carlo check.
  * The NG reader's `sim/code_checks.py`, re-run: identical rms and fillet counts.
  * The Dwellings reader's `sim/shape.py` with the 13 recorded arguments: output byte-identical to `shape.out.txt`.
  * A repository scan for reference code outside `captures/`: none. The one hit is a 2026-09-21 prose summary in
    `_workflow-results`.
* **Not done:**
  * No FM replay re-run (the reader re-ran it at 04:39).
  * No new capture.
  * No class-by-class diff of the shared packages across bundles (§6: the next reading).
  * The NG tree-crown bulge threshold was not re-read.
  * The readings were **not edited**: rulings name the fix and the file; applying them is the next lane's job.
* **Judgment calls (vetoable):**
  * Queue ids: reader rows `B-code/<generator>` already exist, appended by the readers. This seat's per-reading rows
    carry the id `B-code/<generator> (critic)` so a Fable pass keyed on the id finds both without a duplicate key.
  * Re-derivation effort went to headline overturns and to claims that two readings state differently.

## 1. Coverage table

"App classes" = the reading's own definition of the app's packages. All totals were checked against the extract
directories: mfcg 232 files, village 192 (171 app + 21 shared), neighbourhood 152 (132 app + 20 shared), manor 61,
dwellings 261.

| bundle (build) | app classes total | read in full | partial / skimmed | search-only | why skipped | critic verdict |
|---|---|---|---|---|---|---|
| MFCG `0002-40db3788.js` (itch 12710731) | 232 (mfcg 111, geom 30 incl. 3 private helpers, utils 18, tracery 10, nlp 2, system 3, formats 4, processes 2, coogee 52) | 180 | 52 coogee (8 core in full, widgets skimmed) | coogee grep: no draws, no model access | UI framework | CONFIRMED arithmetic; no replay was executed in that lane (its §8), so seed-level claims are [READ] only |
| VG `0003-b921e835.js` (19365073 = 1.6.9) | 171 (village 70, geom 25, utils 19, coogee 57) + 21 shared extracted | 80 (village 49, geom 22, utils 9) | 8 (ForestView, TreeType, Style, MapPlate, GridLayer, Delaunator, Palette, Updater) | 83: 16 village (four roofs, light, shadow, bridge and palisade views, numbers layer, random palette, six UI forms), 2 geom, 8 utils, 57 coogee | render/UI; roofs and night lights are a real gap (its §8) | CONFIRMED arithmetic |
| NG `0003-7553bd15.js` (11441280 = 1.2.2) | 132 (neighbourhood 48, geom 18, utils 14, coogee 52) + 20 shared | 82 (+12 shared: tracery 7, nlp 2, formats 1, system 2) | 0 | 50 coogee | UI framework | CONFIRMED; the most complete Haxe reading after FM |
| FM `0002-a1c7fb89.js` (build 890, not minified) | 61 (58 com.watabou + 3 entry) | 61 | 0 | 0 | — | CONFIRMED (all read) |
| Dwellings `0002-cd66b0ce.js` (17195045) | 261 (dwellings 106, tinypubs 43, geom 24, utils 16, coogee 55, tracery 9, formats 3, system 3, processes 2) | ≈ 112 (model 53, dwellings.utils 9, shell 2, scenes 4, geom 24, utils 10, tracery 9, one tinypubs params class) | ≈ 94 (view 28, ui 10, tinypubs 42, formats 3, system 3, processes 2, utils 6) | 55 coogee | painters, UI and the Tiny Pubs kit | **PLAUSIBLE ± 5**: the first seat's list was not recorded. 54 classes re-read by the continuation seat are CONFIRMED |
| FTG client `0020` (ThreeJsPages), `0005` (index), `0013`, `Landing` | not a class bundle: 4 409 top-level symbols in `0020`, ≈ 2 000 app; 6 866 in the entry chunk | ≈ 400 app symbols (data model, editor, renderer, exports, randomness) + ≈ 15 entry helpers | forms, modals, people/faction UI by name | — | out of focus; the building-geometry **worker was not captured**; the **server generator is absent** | PLAUSIBLE (a range-count estimate); the scope choice is right for a client |

## 2. Contradictions

### 2.1 Between readings (shared or parallel code must agree)

| # | subject | reading A says | reading B says | verdict |
|---|---|---|---|---|
| X1 | **mean of the folded four-draw** (\|sum of four uniforms ÷ 2 − 1\|) | `code-village` §2 notation and §4.2: "mean ≈ 0.28" | `code-neighbourhood` §2: "mean ≈ 0.23"; `code-manor` §2: "≈ 0.23" | **RESOLVED against VG.** Exact mean 7/30 ≈ 0.2333 (rational integration; Monte Carlo 0.2333). FM's derived means agree: wing width mean 83 = 90 − 30·7/30, and light angle ≈ 111°. |
| X2 | **straight-first cut in the bisector** | `code-mfcg` §2.11.3 and `code-village` §3.10: straight cut if the first leg meets the far edge with sin² > 0.99 **and** passes the balance test; otherwise bent | `code-neighbourhood` §0 #1, §2.2: the bend is always built, then flattened when its triangle is flat | **RECONCILED by version.** The bisector lives in each app's own utils package. MFCG's and VG's copies carry the straight test (re-read, §3 R-M2, R-V4); NG 1.2.2's does not (re-read, R-N2). Stop test, position, start edge, bend placement, far-edge rule and retries are identical in all three. Consequence: R8. |
| X3 | **straightening threshold of a bend** | `code-mfcg` §2.11.4: lot bends "shallower than 0.5 (triangle area ÷ base)" straightened | `code-village` §3.10: "less than 2 units off the chord"; `code-neighbourhood` §2.2: area ÷ chord under 1 | **RECONCILED.** The default in all three copies is 1 (a triangle height under 2 units). MFCG's lot caller lowers it to 0.5, a height under 1 unit (R-M3). |
| X4 | **billow (crown bulge) recursion threshold** | `code-mfcg` §3.11: recurse while the edge exceeds 0.3 × size | `code-village` §3.13: edges longer than a tenth of the scale; `code-neighbourhood` §2.9: L > 0.1 × (0.707 × size) | **RECONCILED as app divergence.** MFCG 0.3 and VG 0.1 are both re-read (R-M7, R-V5). NG's tree is its own class, not re-read (PLAUSIBLE). |
| X5 | **triangulator tolerance** | `code-village` §3.3: "a 2⁻⁵² epsilon" | `code-mfcg` §3.1: an orientation filter with relative error bound ≈ 3.3·10⁻¹⁶ and a fallback | **RECONCILED.** Both constants exist in the same class: the 2⁻⁵² epsilon and the ≈ 3.33·10⁻¹⁶ bound of the orientation filter, checked in MFCG's copy. Each reading named one. |
| X6 | **boolean subtraction with no edge crossings** | `code-village` §3.8: "returns A unchanged when A contains B … and nothing when B contains A" | `code-neighbourhood` §3: "a piece wholly inside the subtracted strip is returned unchanged" | **RESOLVED for NG, against VG's second clause** (R-V6). With the subtraction flag, the containment test is complemented. A inside B returns A; disjoint A and B return nothing, and callers treat nothing as "keep the piece" (MFCG's bisector corridor code shows the idiom). A no-crossing subtraction never changes A. |
| X7 | the successor ("Enter") seed | `code-mfcg` §4 and `code-neighbourhood` §4: the current state is the new seed | `code-village` §2.1 and `code-dwellings` §2.1: the **next** state, one step taken | **Not a contradiction:** per-app code, not re-derived here (PLAUSIBLE). A vocabulary hazard: "successor seed" is off by one step between apps. |
| X8 | agreements verified across readings | — | — | **AGREE.** MINSTD 48 271 with every draw inlined, clock reset = ms mod 2³¹ − 1 (all five Haxe bundles). Periodic Poisson tile: 50 tries in a 1.0–1.1 r annulus, torus wrap, every valid candidate kept (MFCG, VG, NG, Dwellings). Chaikin at ¼/¾. Laplacian ¼–½–¼. Edge-event-only skeleton (MFCG, Dwellings; NG never constructs it). The "A-star" search is FIFO without a heuristic (MFCG, Dwellings). Deck-selector grammars. Export scales 4 / 0.7 / 0.35 (NG's claim "the writer shared with MFCG" is consistent). The Dwellings hand-off: senders ≤ 11 cells (MFCG, VG) and 1–16 (NG) against a receiver that drops plans over 11 — the NG consequence is drawn only by `code-dwellings` §7 (PLAUSIBLE cross-derivation). |

### 2.2 Between a reading and its profile or critic

Quote accuracy: all 10 spot-checked §6 quotes are accurate at the cited place: mfcg ≈ 0.8·√size, village "sometimes
seed+1", village household size per building, NG 53 % fillets, NG white stone manor walls, FM arc "4 wings U/C",
dwellings ≈ 0.78, FTG "rural lanes (type 6)", FTG F13 lot figures, and the mfcg retry boundary.

| # | subject | profile / critic says | reading says | verdict |
|---|---|---|---|---|
| P1 | MFCG retry boundary | `profile-mfcg.md` §3.1–3.2: the loop wraps the first stages; wards, towers and geometry run "once per finished city" (inferred from per-attempt call counts) | all nine stages are inside one try | **RECONCILED.** In the profile's counts every failure happened in the canal stage, so the later stages ran once *by observation*. The reading's structural claim stands; the profile's counts are consistent with it. |
| P2 | FTG field 9 | `_critic-ftg.md` F13 and `docs/confidence/ftg.md` C7: "lots" — 1.52 buildings per lot, 22.9 % empty, 38 % coverage | ground-cover texture groups; the 901 are lawn patches | **RESOLVED for the reading.** The texture enum has lawn = 18, road texture = 8 and sand = 20 (re-derived, R-T3). F13's numbers remain valid measurements of lawn patches; their label and any calibration use are withdrawn (R10). |
| P3 | FTG edge types 6 and 7 | `_critic-ftg.md` version ladder: "6 rural lanes, 7 minor" | 6 = stone fence, 7 = stone wall | **RESOLVED for the reading** (enum re-derived, R-T1) |
| P4 | Dwellings basement roll | `_critic-dwellings.md` D8/R24/B6: ≈ 0.78 whatever the storey count | n/(n + 1) | **RESOLVED for the reading** (code re-read, R-D1; the reader's 92/92 replay) |
| P5 | VG's two builds | `profile-village.md` body: build 19251041 (09-21) facts | reads 1.6.9 only | **OPEN (version).** The old build's recorded facts (curvature pass, 51-segment course, `Forest.H`) stay unverified against code (§6 G3). |
| P6 | NG vs the design's S8 recipe | `docs/ARCHITECTURE.md` §4.6, calibrated on NG measurements | `code-neighbourhood` §2.13 verdict table | **Not a document contradiction; it is design input.** Its verdicts rest on the CONFIRMED NG code (R-N2); X2 adds that MFCG and VG differ (R8). |

### 2.3 Inside a reading

| # | reading | where | the inconsistency | verdict |
|---|---|---|---|---|
| I1 | `code-village` | §0 items 6–10 | cross-references drifted by one or two sections: roads cite §2.10 (they are §2.8), square §2.11 (§2.10), houses §2.12 (§2.11), fields §2.14 (§2.13), trees §2.15 (§2.14) | fix (R3) |
| I2 | `code-mfcg` | §0 #9 vs §2.6 | §0: rural = "no course vertex borders an inner cell"; §2.6 and the code: no bridge-site candidate among course vertices from the third to the second-last with an inner cell on either side, **excluding watergate vertices** | §2.6 is right (R-M8); fix §0 (R6) |
| I3 | `code-ftg-client` | §0 #2 vs §2.5.2 | "the fourteen edge types" lists 15 values (0–14); §2.5.2 has "15 edge-type colours" | fifteen values (R4) |
| I4 | `code-ftg-client` | §6 | a blank line before C17 splits the table, so rows C17–C35 render as a headerless table; C16 precedes C15 | fix (R4) |
| I5 | `code-dwellings` | §1.1 `rooms.*` row; §2.2 basement bullet | furnishing cites §2.8 (it is §2.12, roles §2.10); "dropped … (§2.6)" should be §2.8–§2.9 | fix (R7) |
| I6 | `code-manor` | §0 #6 vs §2.16 | "under 3 % of open plans" against arcs at 3 % | trivial ("at most 3 %"); no ruling |
| I7 | `code-neighbourhood` vs `code-manor` | NG §8.3 vs FM §0, §9 | NG: a full re-simulation "should not be [attempted]: it would be a code transcription, which the firewall forbids"; FM built exactly that restatement (`sim.mjs`) and replayed 51 generations | policy split between two readers; settled by R9 |
| I8 | `code-dwellings` | §9 | the class count is reconstructed (≈ 112 ± 5) | kept PLAUSIBLE (R11) |

## 3. Spot re-derivations

Each row is one claim re-read in the named class (our words; nothing transcribed). "Extract" = `scratchpad/code/<generator>/classes/`.

| id | bundle | claim (reading §) | what was read | verdict |
|---|---|---|---|---|
| R-M1 | MFCG | §0 #2, §2.1: origin plus 8·size − 1 spiral points (radius 10 + k(2 + u), angle base + 5√k); hexagon at twice the spiral radius; regions with a vertex beyond the radius dropped; the city = the first size + 1 land cells | `City.buildPatches`: the loop, the added regular hexagon, the vertex-radius filter, and the land-cell walk that stops after exceeding the size | CONFIRMED |
| R-M2 | MFCG | §2.11.3: area stop test with a variance power of the folded draw; attempts 0–10 in 36° frames; position (centroid fraction + bell) ÷ 2; start edge most parallel to the long side; straight when sin² > 0.99 and balanced; bend at the middle below two offsets, else a bell over [offset, F − offset]; far edge by the largest signed sine with an obstruction probe | `mfcg.utils.Bisector` in full | CONFIRMED |
| R-M3 | MFCG | §2.11.4: lot straightening 0.5; lot filter ≥ 4 corners, ≥ minSq/4, box sides ≥ 1.2, fill > ½ | `TwistedBlock.createLots`; `Bisector.detectStraight` (default 1) | CONFIRMED |
| R-M4 | MFCG | §2.4: gate count 2 + ⌊inner ÷ 12 × (0.75 with a coast)⌋; picks zero cyclic distance ≤ 1 and multiply the rest by (distance − 1) | `CurtainWall.buildCityGates` | CONFIRMED |
| R-M5 | MFCG | §0 #10, §2.14: population = 6 × lot count, rounded **up** at the second significant digit | `TownInfo.update` | CONFIRMED. The override from the blueprint is rounded the same way (the reading's wording leaves that ambiguous). |
| R-M6 | MFCG | §2.10: the seven per-district laws and the sprawl adjustment | `District.createParams` | CONFIRMED |
| R-M7 | MFCG | §3.11: billow recursion while edge ÷ size > 0.3, bump ½·min(1, ratio) | `mfcg.utils.Bloater` | CONFIRMED |
| R-M8 | MFCG | §0 #9: rural = no course vertex next to an inner cell | `Canal.updateState` | **CORRECTED (wording).** Rural = no bridge-site candidate; candidates are course vertices from the third to the second-last with an inner cell on either side, minus the watergate vertices. §2.6 is right. |
| R-V1 | VG | §0 #1, §2.0: retry = one Lehmer step of the failed seed | `Blueprint.adjust` | CONFIRMED |
| R-V2 | VG | §2.15: population = round(houses × (3 + 4u)) | `Region.rollPopulation` | CONFIRMED |
| R-V3 | VG | C39: GeoJSON scale 0.7 | `JSONExporter` static scale | CONFIRMED |
| R-V4 | VG | §3.10: straight-first test (sin² > 0.99 and balance); default straightening under a 2-unit height | `village.utils.Bisector` | CONFIRMED |
| R-V5 | VG | §3.13: billow threshold a tenth of the scale | `village.utils.Bloater.extrude` | CONFIRMED |
| R-V6 | VG | §3.8: no-crossing difference "nothing when B contains A" | `PolyBool.and` no-crossing branch; `PolyBounds.containsPoint` (the flag is the starting parity) | **CORRECTED** (X6) |
| R-V7 | VG | §2, §4.2: folded four-draw mean ≈ 0.28 | exact integration of the four-uniform sum's density: E\|S − 2\| = 7/15, so the mean is 7/30 | **CORRECTED** to ≈ 0.233 (X1) |
| R-N1 | NG | §2.0: the per-map parameter table (14 laws) | `Settings.processTags` | CONFIRMED, every row, including min block side = building side × √(9 + 16·bell) |
| R-N2 | NG | §0 #1, §2.2: no straight test; the corner is always placed, then flattened | `neighbourhood.utils.Bisector.makeCut` (no sin² branch; same stop, position, start, bend and far-edge rules as MFCG) | CONFIRMED |
| R-N3 | NG | §0 #10, §2.12: export scale 0.35 | `export.JsonExporter` | CONFIRMED |
| R-N4 | NG | §2.0: unbounded reset loop; seed + 1 only for an explicit seed | `MapScene.reset` | CONFIRMED |
| R-N5 | NG | §0 #2–#3 [CHECKED] receipts | re-ran `sim/code_checks.py` | CONFIRMED by re-execution: identical (rms 0.0003–0.0008 in 8/8 maps, max 0.0052; fillets 209.9 expected against 200 of 378). The square template's axis is fitted, not derived, as the reading states. |
| R-F1 | FM | §0 #2, §2.2: five equal layout weights; ring sides at ¼, ⅜, ¼, ⅛; radius 100–200 | `ManorScene.getPoly`, `ring` | CONFIRMED |
| R-F2 | FM | §2.2: wing width 90 − 30 × folded draw | `ManorScene.reset` | CONFIRMED |
| R-F3 | FM | §0 #4, §2.5: hip-block chance 1 − width/length; length width + (length − width)(1 − folded) | `Wing.createSlab` | CONFIRMED |
| R-F4 | FM | §0 #7, §2.8: the tower chain continues with probability 1/(2 + accepted) | `Manor.spawnTowers` | CONFIRMED |
| R-F5 | FM | §2.13: path length 100 + 200 × bell | `ManorScene.createRoads` | CONFIRMED |
| R-D1 | Dwellings | §2.2: one discarded step → shape → entrance → storeys → two-storey minimum → stair roll → basement n/(n + 1) | `Specs.process` | CONFIRMED |
| R-D2 | Dwellings | §2.2: spiral 0.1 (two storeys) / 0.3; stairwell (n − 1)/(n + 1) | `Specs.rollStairs` | CONFIRMED |
| R-D3 | Dwellings | §2.4: entrance weights 5 / 3 / 1 / 0 by neighbour turns | `Specs.pickEntrance` | CONFIRMED |
| R-D4 | Dwellings | §2.5: stop at ≤ 6 × 2^bell cells; bend with probability length ÷ 6; keep with (q₁q₂)²; with hallways, parts over 6 cells score 1 | `Plan.divideArea` | CONFIRMED |
| R-D5 | Dwellings | §0 #1, §4.2: zero-trial rewind to the clock | `HouseType.assignSet`, `Random.reset` | CONFIRMED. The trial count is rooms × roles, so an empty role list would also rewind to the clock; that cannot happen with the built-in programme. |
| R-D6 | Dwellings | §4.5 replay receipt | re-ran `sim/shape.py` with the 13 recorded arguments | CONFIRMED: byte-identical to `shape.out.txt` |
| R-T1 | FTG | §0 #2: edge enum ROAD 0 … WATERFRONT 14 | `IntersectionEdgeType` in `0020` | values CONFIRMED; **CORRECTED** count word (fifteen values, I3) |
| R-T2 | FTG | §0 #1: coordinates ÷ 100 | `mapPositionArray`, `convertPosition` | CONFIRMED |
| R-T3 | FTG | §0 #3: road texture 8, lawn 18, sand 20 | the texture enum in `0020` | CONFIRMED |
| R-T4 | FTG | §2.5.3: sea when ≥ 400 m of the outline hugs the border | `determineWaterBodyType` (under 400 → inland) | CONFIRMED |
| R-T5 | FTG | §3.1: roof pitch factor 0.5 | `ROOF_SCALING_FACTOR` | CONFIRMED |
| R-T6 | FTG | §2.5.2: band/rim widths (main road 5 / 5.5, road 2.5 / 3, small and dirt 1.25 / 1.75, trail 1.25 / none) | the two width helpers in `0013` | CONFIRMED for the road types |

## 4. Copy audit

**Method** (`scratchpad/critic/copyaudit.py` plus two greps), over every line of the six readings:
* fenced blocks;
* every backtick span that is not a bare identifier or path and contains JavaScript syntax;
* unquoted text scanned for script tokens (member access on `this`/`Math`, function literals, arrows, prototypes,
  class-table markers, statement-internal semicolons, `return` phrases);
* colour literals (#rrggbb, 0xRRGGBB, rgb());
* lines with ≥ 8 quoted tokens (word lists);
* lines with ≥ 25 numbers (pasted tables).

| check | hits | ruling |
|---|---|---|
| fenced code | 0 | — |
| script-bearing spans | 8 | all are identifier groups or URL path templates (`view.architecture.{…}` ×2, `_Legend.{…}`, `_SkeletonBuilder.{…}`, a probe path, three editor POST paths). KEEP as citations. |
| script tokens in prose | 9 | all prose ("… of this.", "a gap function", "return the face whole"). KEEP. |
| colour literals | FM: 3 distinct (window background, ink, one UI grey) plus their rgb() forms; FTG: 5 distinct (road, dirt road, water, day ambient, sunset directional) | within "a few example values". KEEP. |
| word-list lines | 0 | — |
| number-dense lines | 3 (FTG §2.4 regenerate row; FM §2.16 simulated distributions; NG §6 row 3 recorded counts) | our own measurements, not reference tables. KEEP. |
| whole tables of reference constants | T1 VG §2.1 tag-roll odds and exclusion groups; T2 NG §2.0 per-map laws; T3 FM §2.2 side-count odds and §2.10 procedural roof palette; T4 Dwellings §2.10 validator bounds (22 roles) and the 13-role special pool; T5 FTG §2.5.1 layer heights and §2.5.2 widths; T6 FTG enum value lists (edge 15, category 17, material 11, roof 15) | restated in our format, not pasted. KEEP under R5. |
| quoted log strings | error and trace messages in MFCG, VG, NG, Dwellings (spelling slips included) | short strings used to match console captures. KEEP as identifiers (citation-only, never reused by the design). |

**Result: 0 verbatim code, 0 REWRITE required for code, 0 asset over-quotation.**

**Adjacent artefacts** (not readings; ruled in R9):
* The reader harnesses sit in the scratchpad only.
* FM's `sim/sim.mjs` shares 2.4 % of its 12-token shingles with the app code: 37 runs, the longest 30 tokens (a dormer
  depth shift, the snake lattice position, the side-count lists). It reuses three reference identifiers.
* FM's other scripts share 0–1.1 %.
* The Python harnesses (NG, Dwellings, FTG) are different languages; Dwellings reads its templates from the bundle at
  run time.
* No reference code exists in the repository outside `captures/`.

**Out of scope, noted once:** `profile-mfcg.md` quotes one statement of the 2017 open-source ancestor verbatim (its §4.4
discussion of the 0.75 constant). That is profile-tier, pre-existing and inside the implementer firewall, and it is
listed here only so the digest seat sees it.

## 5. Binding rulings

| # | ruling | where the fix goes |
|---|---|---|
| R1 | Replace VG's folded-draw mean ≈ 0.28 with ≈ 0.23 (exactly 7/30) | `code-village.md` §2 notation, §4.2 |
| R2 | Rewrite VG's no-crossing difference: A inside B returns A unchanged; A and B disjoint returns nothing, which callers read as "keep A"; so a subtraction that crosses no edge never alters A | `code-village.md` §3.8 |
| R3 | Fix VG's five §0 cross-references (I1) | `code-village.md` §0 |
| R4 | Say "fifteen edge-type values (0–14)"; join the §6 table (remove the blank line before C17) and put C15 before C16 | `code-ftg-client.md` §0 #2, §6 |
| R5 | **Logic vs content** (answers the questions raised in `code-village` §5, the `code-neighbourhood` header and `code-ftg-client` §5). **Logic:** numeric constants that parameterise an algorithm (probabilities, thresholds, ranges, widths, heights, weights, breakpoints, procedural colour ranges). Logic may be stated in full in reader-tier files. **Content:** authored material — words, names, grammar rules, fixed colour values, text. Content gets shape plus at most five examples. **Vocabularies** (tag names, role names, enum value names, layout-routine names, log strings) are reference identifiers: citation-only. None of the three classes enters the sanitised digest as a list. Logic constants may reach the digest only as reference observations attached to a design decision. Every whole table in §4 (T1–T6) is KEEP. | all readings; the digest seat |
| R6 | Align MFCG §0 #9's rural rule with §2.6 and the code (R-M8) | `code-mfcg.md` §0 #9 |
| R7 | Fix Dwellings' two cross-references (I5) | `code-dwellings.md` §1.1, §2.2 |
| R8 | **Name the build for every shared-algorithm claim.** The bisector has two versions: straight-first in MFCG 12710731 and VG 19365073, bend-first in NG 11441280. The billow threshold is per app. Add one cross-reference line to `code-neighbourhood` §2.2, `code-mfcg` §2.11.3 and `code-village` §3.10. Any design or digest sentence "the reference bisector does X" must name NG 1.2.2 or the other two. | three readings; `docs/ARCHITECTURE.md` §4.6 citations (design owners) |
| R9 | **Restatement harnesses** (FM `sim/*.mjs`; NG, Dwellings and FTG `sim/*.py`) are reader-tier test instruments. They stay in the session scratchpad, are never committed to the repository or handed to implementers, and are cited only by path in reader-tier files. A full restatement is permitted for verification, as FM's was. NG §8.3's "should not be attempted" is a lane choice, not a firewall rule. A harness kept beyond a session must drop reference identifiers (FM's uses three). | FM and NG readings' §9; `docs/FABLE-REVIEW-QUEUE.md` (Fable to confirm) |
| R10 | Withdraw every calibration on FTG "lots" from payload field 9 (buildings per lot, empty-lot share, lot coverage): those are lawn patches. Mark `_critic-ftg.md` F13's label and its version ladder's "6 rural lanes, 7 minor" as superseded by `code-ftg-client` C1–C4. | the next FTG consistency pass; `docs/confidence/ftg.md` C7, C17 |
| R11 | Dwellings coverage stays PLAUSIBLE (≈ 112 ± 5). For design use, any claim resting on a class the continuation seat did not re-read (the painters, the Tiny Pubs kit) is PLAUSIBLE. | `code-dwellings.md` §9 |
| R12 | Every §0 overturn re-derived in §3 is CONFIRMED by this seat. Every other claim keeps its reader grade until Fable's pass. Nothing PLAUSIBLE in a reading's own §9 may be carried into `docs/ARCHITECTURE.md` before that pass. | all readings |

## 6. Remaining gaps and the single next reading

* **G1 FTG server side.** The generation pipeline, the simulation, the use of `seed`, the `roadLength` halving and
  the fill-plot/regenerate services are not in any client. They stay [INFERRED], and probing the author's server is
  the owner's call.
* **G2 FTG building-geometry worker** — not captured. The main chunk's roof builders are assumed to be what it runs.
* **G3 VG**: build 19251041 (09-21) is unread, and so are the roofs, night lights, palisade and bridge views of 1.6.9.
* **G4 Dwellings**: the first seat's class list is unrecorded; there is no partition replay (the replay stops after
  the specification stage); painters and the Tiny Pubs kit were skimmed.
* **G5 Shared-package equivalence was only spot-checked.** This seat found two silent app-level divergences (X2, X4)
  by sampling. The ≈ 100 classes of `geom`, `geom.polygons`, `utils`, `tracery` and `nlp`, plus the per-app
  bisector, billow, poly-utils and Poisson copies, have never been compared across the five Haxe bundles.
* **G6 MFCG and VG executed no replay.** Their claims are [READ] only; FM, NG and Dwellings have executed receipts.
* **G7** NG's tree bulge threshold and every `coogee` framework (search-only in all bundles) — low risk.

**The single next reading:** a normalised, class-by-class diff of the shared packages across the five Haxe bundles,
with VG build 19251041 included in the same pass. Method: map each bundle's minified identifiers to class names with
the lanes' own legend (`annotate.py`), strip draw-site inlining to a token, and diff every class present in two or
more bundles: `com.watabou.geom`, `.geom.polygons`, `utils`, `tracery`, `nlp`, and the app-level `Bisector`,
`Bloater`, `PolyUtils` and `PoissonPattern` copies.

It closes G5 and most of G3 at once. It is a script plus a read of the diffs only, cheap and mechanical. It also turns
every cross-reading statement the design leans on ("watabou's X does Y") into a per-build equivalence map, where the
spot checks here caught two divergences in about ten shared classes.

## Fable review (2026-09-27) — A-code/_critic

Verdict **CORRECTED** (Fable 5.1, lane fable-review/main/code; `docs/fable-review/main/code.md`). The headline ruling (1)–(4)
stands: (2) recomputed (7/30 ≈ 0.2333; Monte Carlo 0.2335), (3) re-derived on the parity flag, (1) and (4) re-derived on the
three bisectors and the texture enum. All 37 re-checks stand: R-M1–R-M8 (R-M4 re-derived here), R-V1–R-V7 (six re-derived
here; the corrections R-V6 and R-V7 confirmed as corrections), R-N1–R-N5 (R-N3 re-derived), R-F1–R-F5 (all re-derived;
the replay the critic did not re-run was re-run here, identical), R-D1–R-D6 (five re-derived, R-D6 re-executed), R-T1–R-T6
(all re-derived). X1–X8, P1–P6 and I1–I8 stand; P5's "OPEN (version)" is a recorded research gap with a named method (G3/G5),
not a design deferral. The coverage table's counts match the extract directories (232, 192, 152, 61, 261). The copy audit's
result (no verbatim code) is confirmed by this seat's greps of the four readings it had not re-checked (no fences; FM 3 and
FTG 5 colour literals; none in VG and Dwellings).

Sharpenings and carve-outs (the rulings stand with these): **R5** — console, trace and UI strings quoted in a reader-tier
reading are reference identifiers, KEEP (J-Fcode-1); the numeric tables T1–T6 are logic (J-Fcode-8) and enter the design only
as reference observations attached to a decision. **R3** — eight cross-references drifted in `code-village.md`, not five: the
five of I1 plus three in its §2.8 (applied in that file's review section). **R9** — a restatement harness kept in the session
scratchpad satisfies the ruling; the three common-noun class names FM's harness shares with the reference are not identifier
adoption (J-Fcode-10). **R10** — carved: only F13's lot figures are withdrawn; the "49 % of buildings in no ring" figure is
F4's ring measurement and keeps that source (J-Fcode-4). R1, R2, R4, R6, R7 are applied in the readings' review sections;
R8's build line is added to the VG reading (the NG and MFCG lines were added at the first checkpoint); R11 and R12 stand.
