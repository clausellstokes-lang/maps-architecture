# Under-confidence challenge — `docs/confidence/vg.md` (watabou's Village Generator)

Lane `confidence/vg-challenge-under`. Written 2026-09-25 by the adversarial reviewer (Fable seat), lens
**UNDER-CONFIDENCE HUNTER**. Status: **COMPLETE**.

Target under review: `docs/confidence/vg.md` (499 lines, 44 capability rows), claimed aggregates
functional 0.80 / visual 0.85 / algorithm_identity 0.55 / seed_exact 0.01 / effort 18 person-weeks (14–24).

The lens looks only for rows rated **lower** than the evidence warrants: a standard published algorithm that fully
covers the capability (named); recorded data already in hand that pins the behaviour (call counts, block trees,
draw logs, palette schema, console traces); the 2017 open-source ancestor still matching the live class/method
names; and capabilities that need only parity of OUTPUT, not of method. Rows rated *too high* are out of scope
(the sibling lane `confidence/vg-challenge-over` owns them). Every adjustment in §2 quotes or pinpoints what was
checked; rows the evidence supports as rated are in §3. §4 records one cheap measurement made on data already on
disk, because it decides several rows. Verdict in §5.

**Headline.** Twenty-seven row metrics move up, all by 0.05–0.15, none by more; nothing in the seed-exact column
moves. The assessor's judgment was sound where it rested on the findings text, but three things were missed:
(1) the 2026-09-25 `--detailed` captures hold V8 block counts for **every** function, not only `River.new` — the
assessor's own "cheapest experiment #1" (block trees for `createDensity`, the tracker steering routines,
`SquareBuilder.place`, `PoissonPattern.warp`, `Forest.roll`) was already answerable from disk, and reading it bounds
four of the "load-bearing black boxes"; (2) several rows describe standard published algorithms (Bridson/Mitchell
sampling, Delaunator, Tracery, Parish–Müller OBB subdivision, Jobard–Lefer streamlines, marching squares, fBm,
Lambert hillshade) whose identity with the recorded call structure is near-certain, and the rows were scored as if
the method were open; (3) two mechanisms scored as `[INFERRED]` are `[STATED]` by the creator (the SVG capture
library; the VG building placer), and one "largest single unknown" (`createDeflection` "shapes every bank") is
refuted by counts already in the profile: the water cell set is fixed before it runs. Aggregates move to
functional **0.83**, visual **0.86**, algorithm identity **0.60**, seed-exact **0.01** (unchanged), effort
**16** person-weeks (13–21).

## 0. Reading log (what this review rests on)

Read **in full, every line**: `docs/confidence/vg.md` (499 lines); `research/findings/_critic.md` (479);
`_critic-vg-ng.md` (226); `profile-village.md` (2 363: body §0–§10, Appendix A, Critic addendum 09-21,
River-course addendum R1–R6, Critic-2 addendum, River-course addendum part 2 P0–P6); `vg-posts-a.md` (1 196);
`vg-posts-b.md` (996); `vg-ng-devlogs.md` (1 039); `os-geometry.md` (946); `watabou-extra-a.md` (1 162);
`watabou-extra-b.md` (997); `visual-spec.md` (744); `_critic-os.md` (435); `captures/README-labelfix-2026-09-25.md`
(154). ≈ 300 k tokens of reading — nothing was downgraded to outline reading. Also read: the sibling stub
`docs/confidence/vg-challenge-over.md` (header only; it had not landed).

**Original sources opened (data only; no JavaScript bundle at any point):** Patreon bodies `35854256`, `37407181`,
`42521165`, `50688261`, `57968729`, `71653886`, `80494491`, `84106820`, `88749133`, `89314043`, `91692684`,
`104226049`, `105215836`, `110526365`, `116745476`, `169696051` (`watabou-village`), `55050649`, `56941736`,
`141198168` (`watabou-extra`); itch devlog `112574-073-bug-fixes-geojson-export`; `research/findings/mfcg-devlogs-b.md`
and `mfcg-posts-a.md` by grep only (GeoJSON schema lines, for E2); every VG `console.jsonl` and `meta.json` (seeds);
`captures/village/2026-09-25T10-14-02/coverage/gen-{0,1}.{coverage,calls}.json`,
`captures/village/2026-09-25T10-28-58/coverage/gen-{0..3}.{coverage,calls}.json` (block counts, §4);
`captures/village/2026-09-25T10-14-02/river-windows/Region.new.seed3131.json` (window order; it cannot answer the
`initHighway` question because every seed in that capture is `isolated`). That covers original sources for
19 rows (G2, G3, G4, G5, G6, G7, G8, G10, G12, G13, G15, G16, G17, R3, R9, R14, E1, E2, D1).

**Not done:** no new recording; no pixel re-measurement; no palette-mode capture. The one measurement made (§4)
re-reads coverage files that already existed, with a script saved beside the capture
(`captures/village/2026-09-25T10-14-02/blocks/blocktree.py` + outputs + README) so it can be re-run.

**Evidence labels in this file:** **CONFIRMED** = executed here against the capture data or found verbatim at
source; **PLAUSIBLE** = reasoning. Every confidence number is a judgment (PLAUSIBLE); the facts each adjustment
rests on are labelled individually.

## 1. Method and standard

For each of the 44 rows I asked four questions in order: (a) is there a published algorithm that fully covers the
capability and matches the recorded call structure? (b) is there recorded data already on disk that pins the
behaviour more tightly than the row's justification admits? (c) does the 2017 ancestor still match the live
class/method names in a way that bounds the method? (d) does the row's functional/visual score penalise an unknown
*rule* although only *output* parity is required? A row moves only when the answer changes what a builder would
have to invent, and then by the smallest step (0.05) unless the evidence removes a whole class of unknown (0.10) or
converts a black box into a bounded form (0.15). Where the cited evidence supported the rating, I say so in §3
with what I checked.

## 2. Adjustments

### 2.1 Table

| # | row | metric | from → to | reason (one line) | evidence checked |
|---|---|---|---|---|---|
| 1 | G2 seed / RNG | A | 0.35 → **0.40** | engine is most likely the 2017 MINSTD lineage: identical class and method names, the creator's transplant discipline, and every recorded seed is 31-bit (26/26; the 18 fresh generator draws would have a 2⁻¹⁸ ≈ 4 × 10⁻⁶ chance of all lying below 2³¹ if `pv` §3.1's "uint32" were right) | all VG `console.jsonl` `Region.hx:81` lines, all `meta.json` hrefs (CONFIRMED); `os-geometry` §3.1; `_critic-os` §1.1; `xb` T31 (99067664) |
| 2 | G3 river course | A | 0.70 → **0.75** | the build-19365073 chain is measured call by call with loop identities in 4/4 seeds, and every routine is a published primitive (Chaikin 1974 corner cutting, cubic spline at 7 samples per span, arc-length station walker, fixed-step resample) | `pv` P1–P4; `river-windows/River.new.seed3131.txt` (CONFIRMED present) |
| 3 | G4 height field | V | 0.80 → **0.85** | the tuning target is quantitative, not "by eye": 79–114 iso-polylines and 6.7–11 k marks per map are recorded per run, so frequency/persistence are fitted to counts | `pv` §6 table, R2 |
| 4 | G4 height field | A | 0.70 → **0.75** | structure exact to the octave-table count (`Perlin.new = 5E + 6` ⇒ five separately seeded tables), once-per-cell sampling, clamped-projection carve (one `lerp` + one `gate` per test), 127² gradient, per-type radial primitives; fBm is standard | `pv` R2, P1 (CONFIRMED in `_critic-vg-ng` §4 item 5) |
| 5 | G5 water extraction | F | 0.80 → **0.85** | `createDeflection` does **not** shape the banks: the 1 799 water cells are fixed by `digRiver`/`setLevel` before it runs and are the same 1 799 in `buildCurves` after it (§4.3) | `pv` P1; `blocks-10-28-58-gen0..3` (CONFIRMED) |
| 6 | G5 water extraction | A | 0.50 → **0.60** | with the deflection pass removed from the extraction, what remains is a level set of the carved field on a 129² lattice with quadratic segment linking and border closure — the marching-squares class, structure fully pinned; `createDeflection` is a finite-radius water-proximity field (§4.3) | `blocks-10-28-58-gen0..3` (CONFIRMED counts; INFERRED reading) |
| 7 | G6 density map | F | 0.70 → **0.80** | `createDensity` is one 128 × 128 pass with **no inner loop and no noise sample**; one 273-B alternative arm is untaken in 6/6 runs (incl. the waterless map); all parameters are fixed in ≈ 400 B of straight-line code before the loop ⇒ an analytic per-cell kernel, a form class a builder can calibrate against the 24 recorded silhouettes | `blocks-10-14-02-gen0/1`, `blocks-10-28-58-gen0..3` (CONFIRMED); `pv` R2 noise identity |
| 8 | G6 density map | V | 0.70 → **0.75** | same; the silhouette fall-off of a smooth kernel is calibrated from screenshots, and the same-seed 12-style set fixes what is geometry and what is style | `vnd` A3.6; blocks |
| 9 | G6 density map | A | 0.20 → **0.35** | form class recovered (analytic per-cell expression, single pass, no noise, parameters pre-set); the kernel formula and the `dense`/`sparse`/`district` scaling stay open | blocks (CONFIRMED) |
| 10 | G7 heart / seeding | F | 0.75 → **0.80** | `Region.getHeart` is 260 B of straight-line code in 6/6 runs — the heart is a stored/pre-chosen point, not a search over the map; the three seeding routes are recorded; calibrating where the heart lands is a screenshot exercise | blocks `getHeart` (CONFIRMED); `pv` R4 |
| 11 | G8 roads | F | 0.75 → **0.80** | the capability is the published evenly-spaced-streamline family (Jobard & Lefer 1997; Chen et al. 2008 tensor-field streets): per-step separation test (`getTrackersAround` ≈ 4.5 per step), probe-ahead against nearby trackers' segments (`findRoadAhead` loops 5.9 × 28.9 per step), a precomputed water-repulsion field (item 6); building this to statistical parity is standard work | blocks `Network.build`, `findRoadAhead`, `avoidWater`, `Tracker.advance` (CONFIRMED counts); 35854256 L25, 71653886 L57, 104226049 L40 (CONFIRMED) |
| 12 | G8 roads | A | 0.45 → **0.50** | `Tracker.flexibility` is a four-arm constant switch (four 16-B arms, two ever taken, split 83/148, 130/68, 64/58, 164/51 by seed) — a per-class turn allowance, **not** a terrain function; the steering body sits in `Network.build`'s round loop (66–145 rounds, 1.7–3.4 tracker steps per round) with measured branch ratios; the slope term is therefore in that body, reading the gradient array | blocks (CONFIRMED); `_critic-vg-ng` V3 |
| 13 | G12 buildings | F | 0.80 → **0.85** | the creator describes VG's placer himself: "rectangular houses at slightly varying distances from each other along a street … (they can't be zero)" — `[STATED]`, not inferred | `watabou-extra/141198168/post.md` L21 (CONFIRMED verbatim) |
| 14 | G12 buildings | A | 0.55 → **0.65** | block tree: 11 stations per street (88 / 8), 41 candidates raised, `validateBuilding` staged rejection — `testVsRoad` loop (50 tests, 5 rejects), neighbour loop (111 tests, 16 rejects), 24 accepted = the console's "Buildings: 24"; `Building.new` has a 4-corner loop; UP's diagnosis of the gap artefact is the same algorithm | blocks `buildAlong`, `validateBuilding`, `Building.*` (CONFIRMED); `xb` T24 |
| 15 | G13 fields | A | 0.60 → **0.70** | the recorded construction is the published recursive OBB lot subdivision (Parish & Müller 2001 §5; CityEngine) with `makeCut = split = project` as the perpendicular cut through a point on the OBB axis; the creator never described a bent cut for VG fields, so C13 does not touch this row; `pickLots`/`filterLots` loop structure recorded (5 groups, 142 lots examined, 45 filtered) | `_critic-vg-ng` V4/V5; blocks `pickLots`, `filterLots` (CONFIRMED); 57968729 L25–26 (CONFIRMED) |
| 16 | G15 forest | F | 0.80 → **0.85** | sampler pinned to Bridson active-list dart throwing on a bucket grid (`validate`: 2.56 × 4.17 cell visits per candidate, 98.7 % rejects) evaluating all 50 candidates (Mitchell best-candidate variant); `warp` is 130 B with no loop and no noise call — not a domain warp (closes `_critic-vg-ng` §6 item 4); `Forest.roll` per-cell skeleton measured (1 965 cells → 1 019 forest) | blocks `PoissonPattern.*`, `Forest.*` (CONFIRMED); 88749133 L43, 42521165 L79 (CONFIRMED) |
| 17 | G15 forest | A | 0.55 → **0.65** | Delaunator (published), DCEL flood fill (textbook), Bridson/Mitchell (published), domain-warped fBm (standard) — the architecture is a stack of named algorithms; only radii and thresholds remain | as above |
| 18 | G16 palisade | F | 0.80 → **0.85** | every recorded step is a standard operation (convex hull → 32-segment cubic smoothing → raster push-off from buildings → gates where roads cross); only the "populated" selection threshold is open, and output parity does not need it | `pv` §4.9; 104796798; 105215836 L25 (CONFIRMED) |
| 19 | G17 naming | A | 0.75 → **0.85** | the engine is a port of the published Tracery library — the recorded method names are Tracery's own (`Grammar.createRoot/expand/flatten/pushRules/loadFromRawObj/addModifiers/clearState/selectRule`, `Tracery.parse/parseTag`, `TraceryNode.expandChildren/clearEscapeChars`, `Symbol.selectRule/top`, `RuleSet.selectRule/clearState`); `DeckRuleSelector` is Tracery's *shuffle* distribution; the grammar structure and gating syntax are fully recorded; content is excluded by ruling and already scored 0 in S | `pv` Appendix A tracery rows, §4.11 (CONFIRMED present); Tracery API (from memory, PLAUSIBLE for exact behaviour) |
| 20 | R3 relief marks | V | 0.80 → **0.85** | hachures, contours and grass are each stated as "shapes along isolines" and each is screenshotted at 2 560 px (`105215836/02,04`, `89314043/03`, `169047704/02,04`); the walker is pinned per level and per step | 71653886 L49 (CONFIRMED); `vpb` §2.31; `pv` §6 |
| 21 | R3 relief marks | A | 0.60 → **0.65** | "isolines built more evenly across a map" has one standard answer (levels at height quantiles rather than equal intervals) and a recorded target (79–114 levels per map) | `pv` §6; 71653886 L49 |
| 22 | R9 trees rendering | V | 0.80 → **0.85** | conifer/palm construction stated (concentric bands with a per-type vertical offset; conifer shadow = jagged triangle) and screenshotted (`104796798/02`, `84106820/04`, `169047704/02,04` three-panel None/Linear/Radial) | 91692684 L24, L26 (CONFIRMED); `vpb` §2.14, §2.17, §2.18 |
| 23 | R14 lights | F | 0.80 → **0.85** | mechanism stated (a single continuous map switches lamps; brighter, less blinding) | 169696051 L32 (CONFIRMED) |
| 24 | R14 lights | V | 0.75 → **0.80** | the same-seed 12-style set includes `night` (`635140/10`), and 2 560-px night maps exist (`169696051/02,04`, `117634240/04`) — the visual target is fixed even though no draw record has it | `vnd` A3.6; `vpb` §2.33 |
| 25 | E1 PNG/SVG export | A | 0.70 → **0.80** | the retained-draw-call SVG library is `[STATED]`, not inferred: "supposedly I won't need to update its code … transplant it into my other applications" (PS 1.2.0) and "the new method was adopted … almost 1K lines shorter" (VG) | 55050649 L29, 56941736 L27 (CONFIRMED verbatim) |
| 26 | E2 JSON export | F | 0.80 → **0.85** | VG's export is the same "GeoJSON-like" format as MFCG's with "the same object types, points … two-element arrays" (creator, 37407181), and MFCG's schema is SHOWN (`112574/01.png` in geojson.io: `FeatureCollection`, a leading `properties.id:"values"` feature carrying `roadWidth/towerRadius/wallThickness/riverWidth/version`, layer-named features, `MultiLineString`) | 37407181 L52, L83 (CONFIRMED); `mfcg-devlogs-b.md` L447–457, L931 (grep, CONFIRMED present) |
| 27 | E2 JSON export | A | 0.40 → **0.55** | schema family known (above) plus VG's stated layer set: fields (50688261), islands fixed (88749133), palisade "just another list of polylines" (105215836); field-level names for VG remain unverified | same |
| 28 | aggregate `functional` | — | 0.80 → **0.83** | §5 arithmetic on the assessor's own weighting | — |
| 29 | aggregate `visual` | — | 0.85 → **0.86** | §5 | — |
| 30 | aggregate `algorithm_identity` | — | 0.55 → **0.60** | §5 | — |
| 31 | effort (person-weeks) | — | 18 (14–24) → **16 (13–21)** | four black boxes now have measured skeletons, the sampler and naming engine are published algorithms, and experiment #1's recording is already on disk (§5) | — |

### 2.2 Row detail (what was checked, and what stays open)

**G2 (adj. 1).** Seeds printed by the generator (`Region.hx:81`) across all 13 VG captures: 26 distinct values,
maximum 2 087 232 953, none above 2³¹ − 1 = 2 147 483 647; removing the six user-typed seeds (3131–3134, 4242, 9191)
and their two +1 retries leaves 18 fresh generator draws, all in [4 010 513, 2 087 232 953]. `pv` §3.1 labels the URL
seed "uint32"; under a uniform 32-bit draw the chance of 18/18 falling below 2³¹ is 2⁻¹⁸ ≈ 4 × 10⁻⁶ — the seed space is
31-bit, i.e. a positive Haxe `Int`, which is exactly the 2017 `Random`'s state range (MINSTD, `x ∈ [1, 2³¹ − 2]`,
`os-geometry` §3.1) and the 2017 URL idiom (`StateManager` writes `Random.getSeed()`, `_critic-os` §4.1). Add the
identical class path and the two recorded method names (`com.watabou.utils.Random.float/reset`) and the creator's
stated habit of transplanting code between generators (99067664, `xb` T31). None of this fixes the draw order,
so seed-exact stays 0.01; it does make "engine unknown" an overstatement. **CONFIRMED** (seed list executed);
the engine inference is **PLAUSIBLE** (a 31-bit `Math.random()`-derived seed would produce the same range).

**G3 (adj. 2).** Nothing new; the row's own evidence undervalues itself. Identities `loop = k − 2`,
`length = k − 1`, `cubic = 7(k − 1)` hold 4/4 (`pv` P3); each routine is standard. Open: the knot offset law and
where the seed enters — both already listed by the assessor.

**G4 (adj. 3–4).** The row says the contour look "must be tuned by eye". It need not be: `LevelsView.init`
(= levels) and `makeStep` (= marks) are recorded per run (`pv` §6: 114/79/92/103 levels; 7 272/7 478/10 957/6 672
steps), so the base frequency and persistence of the fBm are fitted to two counts per map before any eye is
involved. `Perlin.new = 5E + 6` also tells the builder that each octave has its own permutation table (five for the
height field, six for the forest), which the assessor's text does not mention.

**G5 (adj. 5–6).** The assessor's third-riskiest unknown — "`createDeflection` … shapes every bank" — is refuted by
counts already in `pv` P1 and re-checked on four seeds (§4.3): the per-cell water class (1 799 / 1 404 / 1 116 /
1 360 cells) is decided in `digRiver`, honoured by `setLevel`, skipped by `createDeflection`'s 13-B early exit and
walked by `buildCurves` — the same set before and after. So the water body's shape is `digRiver`'s carve profile and
`setLevel`'s threshold, not the deflection pass; the extraction that follows (`getGrid` 129² corner lattice,
per-cell edge arms, `linkSegments` quadratic chaining, `smoothOpen`/`resample`, `createPatches` border walks) is the
marching-squares class with every loop count pinned. What `createDeflection` computes is bounded in §4.3: a
finite-radius (≈ 15-cell) aggregate over water cells around each land cell, normalised when non-zero — a
water-proximity vector field. Its consumer is not recorded; the natural one is the trackers' `avoidWater` step
(**PLAUSIBLE**). Open for the extraction proper: the carve profile/threshold that makes 7–11 % of cells water, and
the per-band resampling of shore strokes (already listed).

**G6 (adj. 7–9).** §4.1. Six runs, two builds' worth of seeds (all build 19365073): `Region.createDensity`
(1 208 B) executes ≈ 400 B of straight-line set-up, then exactly one 128 × 128 loop whose 229-B body contains no
loop and one 24-B branch that never fires; a 273-B alternative arm (+409..+682) is untaken in every run, river or
waterless; `Noise.get`/`Perlin.get` totals are fully accounted for by the height field and the forest (the identity
`a = 16 384·E` closes with zero residual in these runs, `pv` P3), so the pass samples no noise; ≈ 0.6–1.1 ms for
16 384 cells is ≈ 40–65 ns per cell. Consequences: (i) the map is an analytic function of cell position and of
whatever grids already exist (height, water mask), with parameters chosen before the loop — the "sum of bumps",
"noise-perturbed contour" and "kernel per road/building" candidates in `vpa` §3.3 / `vnd` A2.1 are all excluded,
except a fixed small number of bumps inlined as straight-line code; (ii) no running argmax exists inside the loop
(the only in-loop branch never fires), so the heart is not derived from the density map by search — it is a
parameter of the kernel (see G7). The kernel formula, the highway coupling and the `dense`/`sparse`/`district`
scaling remain open; but "everything about its form" (the row's wording) is no longer true.

**G7 (adj. 10).** `Region.getHeart` is 260 B with no block in 6/6 runs: it returns or trivially derives a stored
point. So the heart is chosen cheaply before or during `createDensity`. The assessor's "density argmax? water-adjacent
argmax? hill bias?" reduces to "how is one point drawn" — a much smaller invention, with `Elevation.g` = 3–4 calls
per village (each with a ≈ 10–13-step inner loop, §4) as the only candidate probe of the terrain. A remains 0.30:
the rule is still not recovered.

**G8 (adj. 11–12).** §4.2. `Tracker.flexibility` has four 16-B arms of which two are taken (83/148 in seed 3131,
130/68, 64/58, 164/51 in 3132–3134): a per-class constant, so the isohypse preference (104226049 L40, CONFIRMED)
is *not* in `flexibility`. `Network.build`'s round loop (100/66/76/145 rounds) contains the per-step body
(1 776 B) with the same 83/148 split at +4742/+4818 and +4967 — the class test is made there, twice — and the
bridge branch (3 = `startBridge`), a 0.88/0.12 branch, a 0.18 branch that matches `avoidWater`'s 42 "water ahead"
hits. `findRoadAhead` iterates 5.9 nearby trackers per step and 28.9 segments per tracker with a 4.4 % hit rate —
a probe-ahead against neighbouring polylines, i.e. the dTest/dSep machinery of evenly-spaced streamlines
(Jobard & Lefer 1997), which is what "trackers run through the gradient field" with "resist the relief" (71653886
L57, CONFIRMED) and "fewer crossroads, more T-junctions, right angle turns" (57968729 L38, CONFIRMED) describe.
The steering formula itself is still unread — hence only +0.05 on A.

**G10 (checked, not moved).** `SquareBuilder.place` iterates 34 candidates of which 3 pass a test (seed 3131;
`SquareBuilder.build`'s two large alternative arms — 403 B and 93 B — are untaken there, one of them plausibly the
rectangular variant); `Region.getPopulated` under it loops 40–47 items with 16–43 passing. Two of the four
`river,isolated` seeds get a square, matching "Roughly half" (80494491 L27, CONFIRMED). This pins a
candidate-and-filter placement but not the size law, so 0.60 stands.

**G12 (adj. 13–14).** 141198168 L21 (CONFIRMED verbatim): "The old method places rectangular houses at slightly
varying distances from each other along a street (similarly to Village Generator). Even when these distances are
very small (they can't be zero), gaps are visible where the street turns or bends." The assessor cites `xb` T24 as
"UP's later diagnosis" but scores the placer as if its mechanics were inferred; the creator states them. The block
tree (§4.4) adds the station count (11 per street), the candidate yield (41 of 88 stations), and the rejection
ladder (5 road overlaps, 16 neighbour overlaps, 24 accepted = the console count). Open: setback, gap and size
distributions, side choice, specials — measurable on the PNGs, as the assessor's experiment #4 says.

**G13 (adj. 15).** The assessor scores the cut rule as open under C13. C13 concerns NG/MFCG's *bent* cut; for VG
fields the creator never claimed a bend, `_critic-vg-ng` V5 shows `project` is the plain bisector's step, and the
recorded chain (`PolyBounds.obb` = `convexHull` per `subdivide`, one `project` per cut, area threshold from the
density) is the recursive OBB subdivision published in Parish & Müller 2001 and used by CityEngine. `pickLots`
(5 groups, 142 lots examined, 4 738 inner tests, 24 hits) and `filterLots` (45 lots, 36 kept) give the selection
loop's shape. Open: the compactness thresholds, the seed ring, the arc radius rule.

**G15 (adj. 16–17).** §4.5. `PoissonPattern.step` runs its 50-candidate loop to completion on every step
(6 800 = 136 × 50), `validate` visits 2.56 × 4.17 ≈ 10.7 grid cells per candidate and rejects 98.7 %, `emit` fires
on 65 % of steps, and `warp` is 130 B of two mirrored branch pairs (one per coordinate; 5.0 % take the first arm,
4.6–4.8 % the nested one) with no loop and no call into the noise classes — so `warp` handles candidate bounds, it
does not warp the domain (**INFERRED reading; CONFIRMED that it cannot call noise**). That is Bridson's algorithm
with the active list and a bucket grid, evaluating all k candidates rather than stopping at the first valid one —
Mitchell's best-candidate rule inside Bridson's loop. `Forest.roll` per cell: 1 965 cells, 1 750 pass a first
test, two exclusion loops of ≈ 3.9 items and one of ≈ 39 items on 97 cells, 1 019 cells labelled (52 %);
`Forest.createPatches` 26 patches. The creator's "domain warping … applied to the fractal noise used as a source
of trees density" (88749133 L43, CONFIRMED) then describes the per-cell density sample, not the sampler.

**G16 (adj. 18).** The row's "must invent" list is the selection threshold, the push-off rule, gate validation and
the tree/field cuts. For output parity a builder needs only the first; the others are recorded operations
(`BitMap.check` 1 463, `getClosestSeg` 20, `addGate` 3 / `validateGate` 5) with stated behaviour ("gates … regular
houses placed where roads cross the wall", 105215836 L25, CONFIRMED).

**G17 (adj. 19).** The `com.watabou.tracery` package in `pv` Appendix A carries Tracery's public method names
one for one (listed in the table). Tracery (Compton, 2015; open source) is the published algorithm; its `shuffle`
rule distribution is draw-without-replacement, which is what `DeckRuleSelector.select/clearState` records. The
grammar's structure (69 symbols, `TAG?-` gates, `p?-` weights, `{a|b}` alternation) is `[STATED data]`. The
Markov syllable step and the `shrink` rule are recorded. The row's A of 0.75 treated the engine as reconstructed;
it is identified.

**R3, R9, R14 (adj. 20–24).** In each case the assessor lowered V because a mode was "never recorded". A draw
record is the strongest evidence, but a stated construction plus a 2 560-px screenshot of every mode is enough to
place the output in the same style class, which is what V measures. The contour-level rule (R3) and the lamp map
(R14) also have standard answers.

**E1 (adj. 25).** `xa` §2.16 already quotes the mechanism as `[STATED]`; the row scores it `[INFERRED]`. Both
source lines were re-read (55050649 L29; 56941736 L27, CONFIRMED).

**E2 (adj. 26–27).** The assessor says "field names and structure unknown". They are known for MFCG from a
screenshot the MFCG reader transcribed (`mfcg-devlogs-b.md` L455–457, L931 — grep only, outside this lane's
assigned files), and the creator says VG's export keeps "the same object types" in the same GeoJSON-like format
(37407181 L52, L83, CONFIRMED). What stays open is VG's exact layer list and whether the metadata feature carries
the 0.7 m unit; enough remains for A to stop at 0.55.

## 3. Rows tried to refute and could not (rated as the evidence warrants)

| row | what was checked | why the rating stands |
|---|---|---|
| G1 tags | `Params.resolve` block tree (344 B, a 7-iteration loop, one arm untaken — CONFIRMED); the mandatory road slot is `[STATED]` in 88749133 L47 ("One of the three road tags … is always selected now" — CONFIRMED verbatim; `_critic-vg-ng` S9; `vpb` §2.1) | the resolve table and the priors are genuinely unrecorded; 0.60 is fair |
| G9 bridges | `Tracker.startBridge/endBridge` blocks (3 crossings; `endBridge` 228/3 split); 89314043 L28 | the "as right as possible" mechanism is not in the counts; 0.50 stands |
| G10 square | §2.2 | candidate-and-filter placement is pinned, the size and distortion laws are not |
| G11 wharf / piers | `Water.findDockable` (71 shore items, 23 enter a test with 16/7/9 sub-branches), `getWharf` (8-item loop), `buildPiers` body untaken on a narrow river | the dockable threshold and pier count law are not recoverable from a run with no piers |
| G14 orchards | rows/poisson branch counts | already at the ceiling the evidence supports |
| G18 legend, G19 population, G20 descriptive tags | `rollPopulation` 106 B straight-line (the household draw is inlined — nothing to read); 20 (buildings, population) pairs give a mean of 5.1 with more spread than a per-building i.i.d. draw would leave, so a per-village factor exists | the draws are invisible; 0.30 is right for G19's A |
| R1, R2, R6, R11, R12, R15, R16, R17 | palette JSON (40 keys, `_critic-vg-ng` P5), band law, outline formula, labels — all pixel- or record-verified already | at or near ceiling; nothing left to raise |
| R4 hillshade, R5 spotlight, R7 roads, R8 buildings, R10 shadows, R13 palisade rendering | composite modes and merge/driveway geometry are not in any record; 110526365 L21 (CONFIRMED) adds only what the row has | the unknowns the assessor names are real; a +0.05 would be taste |
| E3, E4, E5, E6, D1 | seeds/URL grammar, toggles list (devlog 426543), integration posts, timings, 84106820 L85–86 (300/500/800; 0.7 m — CONFIRMED verbatim) | already at 0.90–0.95 |
| seed_exact, all rows | build drift 29 → 24 buildings at seed 3131 (`pv` P0); no `Random` call inside `River.new` (P2) | a likelier engine does not supply the draw order across six reseed points; 0.01 stands |

## 4. Measurement made on data already on disk (block trees, build 19365073)

**What.** `captures/village/2026-09-25T10-14-02/coverage/gen-{0,1}.coverage.json` and
`captures/village/2026-09-25T10-28-58/coverage/gen-{0..3}.coverage.json` were recorded with `--detailed`, so they hold
V8 block counts for every function (the River-course addendum part 2 used them for `River.new` and the water routines
only). `blocktree.py` (saved with its outputs and a README under `captures/village/2026-09-25T10-14-02/blocks/`)
matches each analyzer label to its function by (call count, byte length) and prints the nested block ranges with
counts — offsets and counts only, as in `pv` P1; no bundle text is read. Seeds: 3131 (`river,isolated`, 24
buildings), 1198911812 (`no square,isolated`, waterless), 3131–3134 (`river,isolated`). Where a label matched several
functions the one inside its class's offset range was read (`Region.*` ≈ 372–392 k, `Water.*` ≈ 396–402 k,
`Tracker.*` ≈ 393–396 k, `Network.*` ≈ 356–366 k, `Forest.*` ≈ 348–352 k, `Farmland.*` ≈ 342–347 k,
`PoissonPattern.*` ≈ 176–178 k). Counts are **CONFIRMED**; the semantic readings are **INFERRED** and say so.

### 4.1 `Region.createDensity` (@375 026, 1 208 B, 1 call) — six runs identical in structure

| block (rel. offset) | bytes | count | reading |
|---|---|---|---|
| +309..+408 (gen-1 only listed; 0 there) | 99 | 0 | an arm untaken on the waterless map |
| +409..+682 | 273 | **0** in 6/6 runs | alternative arm never taken (river or waterless) |
| +909..+1193 | 284 | 128 | outer row loop |
| ··+954..+1183 | 229 | 16 384 | per-cell body — **no nested loop** |
| ····+1034..+1058 | 24 | 0 | in-loop branch never taken |

No `Noise`/`Perlin` call is attributable (the noise identity closes with zero residual, `pv` P3). ⇒ one analytic
per-cell expression, parameters set before the loop.

### 4.2 Trackers (seed 3131; the other three seeds in the saved outputs)

| routine | structure (counts) | reading |
|---|---|---|
| `Tracker.flexibility` (105 B, 231 calls) | four 16-B arms: 0 / 83 / 148 / 0 (3132: 130/68; 3133: 64/58; 3134: 164/51) | a switch on the tracker's class returning a constant; two classes present |
| `Tracker.advance` (288 B, 259 calls) | two consecutive two-way branches 157/102 (nested 42) and 190/69 (nested 48) | a small commit step with two tests |
| `Network.build` (6 039 B) | outer loop 100 rounds (66/76/145 on the other seeds); per round 2.59 tracker steps; per-step body +3624..+5400 executed 231× with sub-branches 204/27, 42 (= `avoidWater` water-ahead hits), 83/148 twice (= the class split), 196, 3 (= `startBridge`) / 228, 80 | the steering body lives here, not in `Tracker`; rounds continue until all trackers finish |
| `Network.findRoadAhead` (465 B, 231 calls) | loop 1 364 (5.9 per step) with three tests 0.81/0.27/0.24, then an inner loop 7 399 (28.9 per outer) with a 4.4 % hit | probe against the segments of nearby trackers |
| `Network.avoidWater` (220 B, 231 calls) | branches 149/82 and 42/189 | water-ahead test; 42 steering corrections |
| `Network.validateJunctions` (148 B, 114 calls) | loop 1.3 per call, 111 pass, 3 fail | junction acceptance |
| `Elevation.g` (449 B, 3–4 calls) | inner loop 10.8–13.3 per call; a 20–22-count tail | a multi-step probe, not a plain sample (the only terrain query outside the grids) |

### 4.3 `Water.createDeflection` (467 B) on four seeds

| seed | land cells | water cells | window inner steps ÷ land cell | disc fraction (16-B arm ÷ inner) | hit arm ÷ inner | hit ÷ water fraction | post-loop branch pair |
|---|---|---|---|---|---|---|---|
| 3131 | 14 585 | 1 799 | 944.1 | **0.7503** | 0.0655 | 0.60 | 7 787 / 7 750 (≈ 0.53) |
| 3132 | 14 980 | 1 404 | 946.1 | **0.7498** | 0.0518 | 0.60 | 9 378 / 9 378 (0.63) |
| 3133 | 15 268 | 1 116 | 947.6 | **0.7496** | 0.0418 | 0.61 | 10 372 / 10 372 (0.68) |
| 3134 | 15 024 | 1 360 | 945.7 | **0.7499** | 0.0483 | 0.58 | 10 068 / 10 068 (0.67) |

The 16-B arm's share of the 31 × 31 window is a map-independent constant 0.750 (π·15.15² / 31² — a disc test of
radius ≈ 15 cells, **INFERRED**); the 17-B arm fires in proportion to the map's water fraction (0.58–0.61× in 4/4);
the two equal post-loop counts are a non-zero guard and its consequence on 53–68 % of land cells. ⇒ for each land
cell, accumulate over water cells within ≈ 15 cells and normalise when anything was found: a bounded
water-proximity vector field. The water cell set (the 13-B early-exit count) equals `digRiver`'s short-arm count and
`buildCurves`' body count in every seed — the extraction does not depend on this pass.

### 4.4 Buildings (seed 3131)

`Region.placeBuildings`: a 7-iteration street loop (one street takes an 863-B special arm once), a 4-iteration
loop, pier/wharf arms untaken. `Region.buildAlong` (8 calls): 88 station iterations (11 per street), 82 pass the
first test, 80 the second, 41 reach the building-raise arm (`Building.new` = 42 = 41 + 1 `spawnAt`), 23 of those
take a second-side branch. `Region.validateBuilding` (42 calls): an early test entered by 29; a road loop of 50
(`testVsRoad` = 50) with 5 rejects; a neighbour loop of 111 (3.8 per candidate) with 11 + 5 rejects; 24 accepted =
"Buildings: 24". `Building.new`: a 4-iteration corner loop per call. `Building.testVsRoad`: an 8-test chain, then a
22.7-iteration segment loop with 2 hits.

### 4.5 Forest and sampler (seed 3131)

`PoissonPattern.step` 136 calls, loop 6 800 (= 50 per step, always to completion), 86 in-loop acceptances, 89
`emit`; `validate` 6 800 calls, outer loop 17 387 (2.56), inner 72 505 (4.17), 23 053 distance tests, 6 714 rejects;
`warp` 6 851 calls (= candidates + 51 initial points), two mirrored branch pairs 340 / 6 511 (nested 310 and 298), no
loop. `Forest.new`: 1 965 cells × 5.98 edges = 11 760 half-edges, two passes. `Forest.roll`: cell loop 1 965 → 1 750
→ 1 579; loops of 3.9 (1 230 cells, 149 hits), 3.9 (1 081 cells, 38 hits) and 39.2 (97 cells, 24 hits); 1 019 cells
labelled. `Forest.createPatches`: 26 patches, 34 sub-iterations. `Farmland.pickLots`: 5 groups, 142 lots, 4 738
inner tests, 24 hits; `filterLots`: 45 lots, 36 kept.

### 4.6 Square and heart (seeds 3131 and 3133 have a square; 3132 and 3134 do not)

`SquareBuilder.place` (1 544 B): loops of 2 and 34, with 3 of the 34 passing; `SquareBuilder.build`: the two large
alternative arms (403 B, 93 B) untaken; `Region.getPopulated` under it: 40–47 items, 16–43 pass; `Region.getHeart`:
260 B straight-line in 6/6 runs.

### 4.7 What this measurement does not settle

The per-cell formula of `createDensity`; the steering arithmetic inside `Network.build`'s body; the consumer of the
deflection field; `Palisade.*` (no palisade seed in the detailed captures); anything about non-default palettes.
Those are the assessor's experiments #1 (remaining half) and #5, unchanged.

## 5. Aggregates, effort, verdict

**Arithmetic on the assessor's own scheme** (model rows G3–G16 averaged; renderer rows R1–R17; the four load-bearing
rows G5, G6, G8, G12 at double weight). Model F: 0.818 → 0.846 (+0.05 on G5, G7, G8, G12, G15, G16; +0.10 on G6).
Model A: 0.521 → 0.571. Renderer V: 0.88 → 0.89; renderer A: 0.726 → 0.729. With the double weighting, the
aggregates land at **functional 0.83, visual 0.86, algorithm identity 0.60**; **seed-exact 0.01** is untouched
(a likelier RNG engine buys nothing without the draw order, and the reference re-rolls its own geometry between
builds).

**Effort.** 18 → **16** person-weeks (13–21) for the later standalone VG product: the "density map + heart" and
"trackers" blocks each lose ≈ 0.5 week of blind calibration now that their loop skeletons are measured; the forest
block loses ≈ 0.5 week (Bridson/Mitchell + Delaunator are off-the-shelf); the "tuning and validation" block loses
≈ 0.5 week because experiment #1's recording already exists for four of its six targets. The ≈ 10–12 figure with a
shared base substrate stands. **PLAUSIBLE.**

**Verdict.** The assessment is honest and well-sourced, and its ordering of risks is right; it is under-confident
by about 0.03–0.05 on the aggregates because it scored several capabilities as if their methods were open when the
method is a named published algorithm matched by the recorded call structure, treated two creator-stated mechanisms
as inferred, misattributed the bank shape to `createDeflection`, and did not notice that its own first experiment
had already been half-recorded. No row is rated lower than warranted by more than 0.15, and the seed-exact floor is
correct.

## 6. Caveats and honesty

* All confidence values in §2 are judgments (**PLAUSIBLE**). The facts they rest on are labelled: seed range,
  verbatim quotes and every block count are **CONFIRMED** (executed or found at source in this run); the semantic
  readings of block counts (disc test, water-proximity field, bounds clamp, class switch, candidate filter) are
  **INFERRED** and could be wrong in detail without changing the direction of the adjustment.
* Label-to-function matching by (count, bytes) was unique for every routine quoted except `getPopulated`,
  `rollPopulation`, `spawnAt`, `startBridge`, `getVoronoi` and `getWharf`, where the in-range candidate was taken;
  the same analyzer-label caveat as `captures/README-labelfix-2026-09-25.md` applies to `Elevation.*` and
  `Building.*` rows, which is why no adjustment rests on a `Building.*` label alone.
* The Tracery and Delaunator identifications rest on method-name identity with the published libraries (from my
  knowledge of their APIs, not from any source opened here); the assessment's own text already names Delaunator.
* Nothing here reads a captured JavaScript bundle; the offsets quoted are V8 coverage offsets, and the saved script
  requests no source text.
* Not adjusted despite temptation: G1, G9, G10, G11, G19, G20 and the composite-mode rows — the unknowns the
  assessor names there are real, and raising them would be taste, not evidence.
