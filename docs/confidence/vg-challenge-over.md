# Over-confidence challenge — `docs/confidence/vg.md` (watabou's Village Generator)

Lane `confidence/vg-challenge-over`. Written 2026-09-25 by the adversarial reviewer (Fable seat), lens
**OVER-CONFIDENCE HUNTER**. Status: **COMPLETE**.

Target under review: `docs/confidence/vg.md` (498 lines, 44 capability rows), claimed aggregates
functional 0.80 / visual 0.85 / algorithm_identity 0.55 / seed_exact 0.01 / effort 18 person-weeks (14–24).

The lens looks only for rows rated **higher** than the evidence allows: `[INFERRED]` treated as `[STATED]`; a
named feature mistaken for a described method; visual parity assumed from one screenshot or one draw record;
hidden constants and heuristics; robustness work the creator says took years; combinatorial interaction between
features; and content/data authoring cost (names, tables, presets). Rows the evidence supports are listed in §3
("tried to refute and could not") with what was checked. Every adjustment in §2 quotes or pinpoints what was
checked. Rows rated *too low* are out of scope for this lens and are not adjusted here.

**Verdict in one line.** The assessment is honest about *what* is unknown but scores several rows as if the
known skeleton were the algorithm, verifies its two headline colour/width laws on the default palette only and
then generalises them, treats three inferred mechanisms as "Known", and budgets no time for the feature
interactions the creator says consumed his own years. Seventeen rows move down by 0.05–0.20; the aggregates move
to **F 0.75 / V 0.80 / A 0.50 / S 0.01**, effort to **≈ 24 person-weeks (18–32)**. No row was found rated
*higher* than its own cited evidence on seed-exactness; 0.01 stands.

---

## 0. Reading log (what this review rests on)

Read **in full, every line**, in this order (≈ 230 k tokens of reading, under the 350 k switch point):

1. `docs/confidence/vg.md` (498 lines) — the target.
2. `research/findings/_critic.md` (478) — first critic; C7–C11, §3, §4, §6.
3. `research/findings/_critic-vg-ng.md` (226) — third seat; V1–V27, §2–§6.
4. `research/findings/profile-village.md` (2 362) — body §0–§10, Appendix A, Critic addendum (09-21), River-course
   addendum R1–R6, Critic-2 addendum, River-course addendum part 2 P0–P6.
5. `research/findings/vg-posts-a.md` (1 195) — incl. Critic-2 addendum.
6. `research/findings/vg-posts-b.md` (995) — incl. Critic-2 addendum.
7. `research/findings/vg-ng-devlogs.md` (1 038) — Parts A–C, appendix, Critic-2 addendum.
8. `research/findings/visual-spec.md` (743) — §0–§8.

Read by **section outline plus full sections** (the parts that bear on VG; the rest of each file concerns PS,
1PDG, castles, MFCG-only or FTG material):

9. `research/findings/watabou-extra-a.md` — §2.1 (bent cut), §2.10 (forest blobs), §2.14 (naming), §2.15 (palette
   schema), §2.16 (SVG export), §2.17 (City Viewer model), §2.19 (edge stretching), §2.21 (permalinks).
10. `research/findings/watabou-extra-b.md` — T19, T20, T21, T24, T28, T31, §5.
11. `research/findings/os-geometry.md` — §0.2 (licence), §1.3 (one PRNG stream), §3.1 (`Random`), §3.7
    (`PerlinNoise`), §3.8 (`MarkovChain`).
12. `research/findings/_critic-os.md` — §1.1, §1.10, §4.

**Original sources opened for the spot-checks (§5):** 11 raw Patreon bodies under
`research/patreon/watabou-village/` (80494491, 56941736, 169696051, 110526365, 91692684, 89314043, 104796798,
105215836, 88749133, 104226049, 71653886 — body text, not comment threads); `captures/village/*/meta.json` for
05-04-05, 05-37-29, 05-38-17 (seed/tag URL sets of every pass); the four draw records
`05-37-29/draw/gen-{0,1}.draw.json`, `05-04-05/draw/gen-0.draw.json`, `05-38-17/draw/gen-0.draw.json` (scanned by
script for `lineWidth 24`, `#ffffff` and `#ff0000` ops); the shipped grammar asset
`05-04-05/coverage/network/bodies/0013-eda47b10.json` (69 symbols, external-symbol references); directory listings
of the draw/coverage passes and of `2026-09-25T10-14-02/river-windows/`. **No captured JavaScript bundle was
opened**, no PNG was re-measured, no new recording was made.

**Re-executed here (CONFIRMED by my own arithmetic, scratch Python):** the 5-octave noise identity on the four
appendix runs (`Noise.get = a + b`, `Perlin.get = 5a + 6b`, `a = 16 384` → 109 748 / 112 538 / 113 078 / 111 332
all reproduce); `PoissonPattern.validate ÷ step = 50.00` on all four; the pop/building ratios of pv §3.3's table
(min 3.36, max 6.88, mean 4.96 — see §6 nit); the divergence of `lerp(fill, ink, t)` from a hard-light
composition on the `sand` and `night` inks; the `W·k^1.5` extrapolation to `shallowBands = 10`.

---

## 1. Method

For every one of the 44 rows I asked four questions against the evidence the row cites: (a) is each item in the
row's **Known** line actually `[SHOWN]`/`[STATED]`, or is it the assessor's inference re-labelled; (b) does the
rating rest on a *method* or on a *name* (a feature the creator announced but never described); (c) how many
recordings, palettes or tag sets stand behind a visual or formula claim; (d) does the rating price the hidden
constants, the never-exercised option-surface, and the interaction between subsystems. The default was to refute
where the cited evidence did not carry the number. For at least ten rows I went to the original post, asset or
capture rather than to the findings file (§5).

Confidence semantics are the assessment's own (§0 of `vg.md`): `F` functional, `V` visual, `A` algorithm
identity ("our derivation would match **their** algorithm"), `S` seed-exact.

---

## 2. Adjustments (from → to), with what was checked

| # | row | metric | from → to | reason (short) |
|---|---|---|---|---|
| 1 | G1 tags / URL state | F | 0.90 → 0.85 | option surface never captured live; 8 of 20 tags never ran in any recording; priors and the resolve table unknown |
| 2 | G3 river course | A | 0.70 → 0.60 | routine-by-routine chain holds for one build; every per-river decision unrecovered; confluence/estuary outside the windows |
| 3 | G5 water extraction | F | 0.80 → 0.70 | coast never coverage/profile-recorded, estuary never recorded; "one path for every type" is SHOWN for 4 of 6 types |
| 3 | G5 water extraction | A | 0.50 → 0.40 | the one loop that *is* the algorithm (`createDeflection`) is unrecovered; cove/headland/estuary are names |
| 4 | G8 road network | V | 0.80 → 0.70 | the road web is the visual class and the creator's record shows it flips on steering details that are unknown |
| 5 | G13 fields | A | 0.60 → 0.50 | same known-skeleton/unknown-rules state as G8 (0.45); the cut rule is C13 OPEN |
| 6 | G14 orchards | A | 0.75 → 0.65 | a trigger plus two *named* fill modes; the regularity predicate and every constant unknown; view-side choice |
| 7 | G16 palisade | A | 0.50 → 0.40 | "raster push-off from buildings" presented as Known is inferred, and the palisade draw records point elsewhere |
| 8 | G18 legend / POIs | A | 0.70 → 0.60 | count and categories known; selection rule unknown |
| 9 | G20 descriptive tags | S | 0.05 → 0.01 | a function of a model whose seed-exactness is 0.01 cannot exceed it |
| 10 | R2 canvas / layer order | A | 0.85 → 0.80 | one recorded layer (a 24-px white polyline mask, palisade runs only) is absent from the list and unexplained; composites unrecorded |
| 11 | R4 hillshade | A | 0.75 → 0.65 | Lambert term, light direction, "strength depends on shadow colour" mapping and composite all inferred |
| 12 | R5 spotlight | A | 0.70 → 0.60 | two gradient fills are SHOWN; the darken/lighten compositing and the complement/saturation mapping are not |
| 13 | R6 water rendering | A | 0.90 → 0.80 | `k^1.5` pinned at N = 3 only; the general rule is an extrapolation that predicts a 360-px band at N = 10; W's rule unknown |
| 13 | R6 water rendering | V | 0.95 → 0.90 | five of six themes' band looks (N = 0/2/5/10) never draw-recorded |
| 14 | R8 buildings rendering | A | 0.70 → 0.60 | gable only recorded; hip/flat/ruin/dome and the "Slope" maths unrecovered; stated multiply is approximate |
| 14 | R8 buildings rendering | V | 0.85 → 0.80 | three of four roof types plus the dome are screenshot-only |
| 15 | R11 fields rendering | A | 0.80 → 0.70 | furrow count/spacing law and the curvilinear warp unknown |
| 16 | R12 selective outlining | A | 0.85 → 0.70 | the lerp identity was verified on the default (near-black) ink only, where lerp and hard light coincide; on `sand`/`night` inks the candidates differ by ~60/255 per channel |
| 16 | R12 selective outlining | V | 0.95 → 0.85 | the outline colour of five of six shipped themes is not pinned |
| 17 | E1 PNG / SVG export | A | 0.70 → 0.50 | the mechanism is inferred from a line-count remark; no SVG export was ever captured |
| — | aggregate | F | 0.80 → 0.75 | see §4 |
| — | aggregate | V | 0.85 → 0.80 | see §4 |
| — | aggregate | A | 0.55 → 0.50 | see §4 |
| — | effort | person-weeks | 18 (14–24) → 24 (18–32) | see §4 |

### 2.1 Generation-stage rows

**#1 G1 · tags, F 0.90 → 0.85.** The row calls the vocabulary "complete" and the option surface known. What
was checked: the URL sets of every VG capture (`meta.json` of 05-04-05, 05-37-29, 05-38-17; the 11-25-55 and
09-25 runs per pv R6/P0) — the tags that ever ran are `river, pond, coast, confluence, island, grove, isolated,
dead end, highway, palisade, no square, sparse` (12). Never exercised: `estuary, crossroads, farmland,
uncultivated, organic, dense, district, no orchards` (8 of the 20 the posts name). No screenshot of the Tags
dialog exists in any capture, so the vocabulary is post-derived, and 1.6.3 and 1.6.6 have no post (vnd §0.4).
The tag *priors* — what decides the statistical mix of villages under one click — are the assessment's own
"must invent". "Same option surface, statistically similar structure" is therefore evidenced for a little over
half of the surface. PLAUSIBLE.

**#2 G3 · river course, A 0.70 → 0.60.** The justification is "skeleton → Chaikin → PathTracker knots → cubic →
resample is SHOWN routine by routine". Checked against pv P0–P6 and the `river-windows/` directory (the three
window JSONs exist): true for build 19365073 and seed 3131 (four seeds for the counts). But (i) on build
19251041 the chain was resample → Chaikin → `calculateCurvature` with **no spline evaluator executing** (pv R2,
P0) — the identity target itself changed within a week, so "their algorithm" is a moving target; (ii) the only
per-river decision inside the constructor — the knot closure's two-way branch (1/6, 1/5, 5/2, 5/1) — is exactly
what is unrecovered, along with the offset amplitude, the k rule, the circle radius, the resample step and where
the seed enters (P6 lists all six as open); (iii) the windows cover a plain river only — confluence has
coverage counts only (`digFork`, 2 polylines) and **estuary was never recorded at all** (no `estuary` URL in any
capture). A chain whose every parameter and its one branching rule are unknown, on one of the two builds, for
one of four river-class tags, is a 0.60, not a 0.70. PLAUSIBLE.

**#3 G5 · water extraction, F 0.80 → 0.70 and A 0.50 → 0.40.** The Known line says "one extraction path
serves every water type". Checked: pv R1's "[SHOWN, 6 profiles]" list names `digRiver` (river), `digFork`
(confluence), `createHollow` (pond), `createIsland` (island). **Coast** appears only as the draw-pass seed
4010513 in 05-04-05 (`meta.json`; the draw pass records canvas ops, not calls — confirmed by the directory
listing: `draw/` has `*.draw.json`, `coverage/` has `*.calls.json`) — so the coast's height-field primitive and
its extraction were never sampled. **Estuary** appears in no capture. The 1.5.3 post (91692684, opened) states
coves/headlands and "an estuary is a combination of a regular river and a bay" — names, not methods. On top of
that the assessment itself calls `createDeflection`'s window semantics "the largest single unknown of the water
stage": a ≈31 × 31 pass per land cell is the *whole* algorithm of the stage, and it is unrecovered. A row whose
core loop is unknown and whose feature set is recorded for four of six types cannot carry F 0.80 / A 0.50.
PLAUSIBLE.

**#4 G8 · road network, V 0.80 → 0.70.** The justification is "the road look is mostly rendering (§R7)". The
rendering (casing, merges, driveways, dashes) is indeed pinned, but what a viewer reads in a VG village is the
*pattern*: T- versus X-junctions, right-angle turns, loops, how radials meet rings. Checked in the raw posts:
105215836 — "the bug that made roads 'unreasonably curvy' is fixed - it was hard to get a regular right-angled
road pattern even on a perfectly flat land"; 104226049 — after the isohypse change "the resulting road networks
look different". Both are statements that the *look* flipped on details of the steering law, and that law is
the assessment's own riskiest unknown #2. cvn V3 adds that steering cannot even be read from `Elevation.g`
calls. A visual class that hinges on an unknown rule is not a 0.80. PLAUSIBLE.

**#5 G13 · fields, A 0.60 → 0.50.** The chain (`getVoronoi → PolyBool.and → Bisector.partition/subdivide` on
OBB → `pickLots/filterLots` → arcs) is SHOWN (cvn V4, re-derived on 21 runs). What is unknown, by the
assessment's own Must-invent line: Voronoi seed placement (the "sectors" look), the clip region, the min-area
law, the cut rule (C13 **OPEN** — cvn V5 shows `PointExtender.project` is not the right-angle step), compactness
thresholds, `pickLots`, arc radius, furrow angle. That is the same state as G8 (agent architecture SHOWN, every
rule inside `advance` unknown), which the assessment scores 0.45. Consistency and the OPEN cut rule put fields
at 0.50. PLAUSIBLE.

**#6 G14 · orchards, A 0.75 → 0.65.** The row's justification: "rule and both fill modes are stated and
recorded". Checked in the raw 80494491 body: "Usually orchards are filled with rows of smaller trees, but if
the shape of a plot is particularly irregular, trees are placed more chaotically." That is a trigger plus two
*named* modes; "particularly irregular" is not a predicate. In the appendix the choice is made by
`FarmlandView.getRows` / `getPoisson` — view-side, one per orchard — with `validateTree` clipping, and nothing
records the regularity test, the row spacing/orientation, the Poisson radius or the tree size. G10, whose
procedure is stated end to end, is scored 0.60; the orchard row cannot sit 0.15 above it. PLAUSIBLE.

**#7 G16 · palisade, A 0.50 → 0.40.** The Known line: "Hull-based construction, cubic smoothing, raster
push-off from buildings, gates at road crossings". Hull (`ConvexHull.ofSet`) and cubic (32) are SHOWN; "raster
push-off from **buildings**" is pv §4.9's `[INFERRED, high confidence]` step 4, re-labelled. What I checked: the
two palisade draw records (`05-37-29/draw/gen-0`, `gen-1`) each contain, and the non-palisade records
(`05-04-05/gen-0`, `05-38-17/gen-0`) do not, a `stroke #ffffff` at **`lineWidth 24`** with 46 / 43 / 40 segments
on a small offscreen canvas (392×346; 311×376 and 333×307 — two in gen-1, whose `Region.new` = 2, i.e. one per
attempt) followed by a `drawImage` back. A 24-px white *polyline* rasterised only when a palisade is built is
what a `BitMap` of the road network (or of the wall band) looks like — not a raster of building footprints,
which would be fills. `visual-spec.md` §2.2 row 1b reads the same ops as a "settlement light mask … the bright
halo around the village", a third interpretation. So the subject of the 1 463 `BitMap.check` tests is
genuinely open, `getPopulated`'s threshold is open (cvn V12), and which 91 points are hulled is open. Two of the
four "Known" items are inferences, one of them contradicted by a recording. PLAUSIBLE.

**#8 G18 · legend / POIs, A 0.70 → 0.60.** Known: exactly two `Note.new` per village, eight category symbols
with their grammar. Unknown: which buildings become POIs, how the category is chosen per building, why two. The
grammar asset (opened) fixes the *names*, not the selection. PLAUSIBLE.

**#9 G20 · descriptive tags, S 0.05 → 0.01.** The row reasons "a deterministic function of the model; would
match if the model matched". The model rows it depends on are all 0.01–0.02, so the conditional cannot lift
the marginal. Consistency, not new evidence.

### 2.2 Rendering rows

**#10 R2 · canvas / layer order, A 0.85 → 0.80.** The row calls the bottom→top order "full". The draw-record
scan above found a layer the list omits — the palisade-only white 24-px polyline mask — whose purpose neither
`profile-village.md` nor `visual-spec.md` settles (they disagree). The assessment's own §10 item 3 (where
`ground[0]` is painted, the composite of the shading layer) and vs §7 item 7 (shadow-pass composite mode
unrecorded) are unresolved. Order is SHOWN; the layer *set and semantics* are not complete. PLAUSIBLE.

**#11 R4 · hillshade, A 0.75 → 0.65.** SHOWN: 16 384 `setPixel32`, 127² `crossProduct/normalize`, stack blur,
composite as a light layer. Inferred: the dot product with a light direction (which direction — `shadowAngle`?),
the mapping the creator states as "how pronounced the effect depends on the *shadow color*" (raw 110526365,
opened), and the composite mode. That is the shading *formula*, and it is not recorded; 0.65 credits the
normal-per-cell structure only. PLAUSIBLE.

**#12 R5 · spotlight, A 0.70 → 0.60.** SHOWN: two `CanvasGradient` fills on a 1 101² layer, `createRadialGradient`
4–6, `calcLight` × 2. Stated (raw 104226049, opened): darken with the shadow colour, lighten with "its
complementary colour", saturation adjustable, independent intensities, size, three focus modes. Not recorded:
`globalCompositeOperation`/alpha of either gradient (vs §7 item 7) — i.e. how a "darkening" and a "lightening"
gradient are combined, which is the algorithm. PLAUSIBLE.

**#13 R6 · water rendering, A 0.90 → 0.80, V 0.95 → 0.90.** The row reads as the best-pinned rendering law, and
for N = 3 it is (I re-checked the ratio table: 5.196 : 2.828 : 1 in three records). But the general rule the
assessment carries — "width(k) = W·k^1.5, k = 1..shallowBands" — is pv §4.3's extrapolation; pv's own H6 ("render
a map with shallowBands = 10 and count") was never run, and every draw record is `village_default` (N = 3).
Computed here: with the recorded W = 11.39 px the rule gives an outermost band of **32 / 59 / 127 / 360 px** at
N = 2 / 3 / 5 / 10 — 360 px is a third of the 1 100-px map, which no `sand` screenshot shows (vpb §2.10 describes
~10–15 *fine* bands). So the per-N normalisation of W is unknown. W itself is 9.9 / 11.4 / 16.3 / 21.2 px across
four N = 3 maps (river, confluence, pond, coast) by an unrecovered rule, and the per-band segment counts differ
(147/219/439, pv §10 item 4). Identity of the law is pinned in k at one N only; the visual of the other five
themes' water is screenshot-only. PLAUSIBLE.

**#14 R8 · buildings rendering, A 0.70 → 0.60, V 0.85 → 0.80.** Recorded: the gable glyph on the default
palette. Never recorded: Hip (night), Flat (sand, bw), Ruin (style-only), the dome on large flat-roofed buildings
(raw 88749133), the tower-on-roof variant beyond its call count. Unrecovered: the "Slope" fake-perspective
construction (raw 71653886 names the parameter only), and the stated unlit-face rule is approximate (cvn V14,
t ≈ 0.92). Three of four roof types are screenshot-only; the assessment's own caveat says so but the numbers do
not. PLAUSIBLE.

**#15 R11 · fields rendering, A 0.80 → 0.70.** Recorded: fill, outline w1, one dashed polyline per furrow with a
per-furrow `getPattern`. Unknown: the furrow count/spacing law behind "≈ 18 furrows per field", the per-furrow
pattern law, and the curvilinear warp of 1.5.3 (raw 91692684: "slightly curvilinear"), which on the new build
appears as 40 `curveTo` calls and nowhere else (pv P0). The look is pinned on one palette; the rule is not.
PLAUSIBLE.

**#16 R12 · selective outlining, A 0.85 → 0.70, V 0.95 → 0.85.** The verification table in pv §7.4 is headed
"With `village_default` (`ink #010206`, `pressure 0.7`)": all eight colours are default-palette, and pv itself
notes the hard-light count identity is "numerically indistinguishable from the lerp" *for a near-black ink*.
Computed here for the shipped inks: default roof `#BA9B85` → lerp `#38302C` vs lerp(fill, hardLight(fill, ink))
`#39302C` (coincide, as recorded); **`sand`** ink `#3F2636`, roof `#FFF9BC`, t = 0.9 → `#523B43` vs `#8B5C5A`;
`sand` field `#A2BF69` → `#49353B` vs `#584633`; **`night`** ink `#171B27`, roof `#546B8B` → `#232B3B` vs
`#1D283E`. The two candidate compositions differ by up to ~60/255 per channel on `sand`, and the raw 1.6.8 post
(opened) says only that "Hard Light blend mode is used for mixing" — the composition order is unstated. Three
themes (`cold`, `bw`, `minimal`) sit at `pressure 1.0`, the stated discontinuity. So the outline colour is pinned
for one of six themes; the formula's identity is pinned only where two formulas agree. PLAUSIBLE.

### 2.3 Export row

**#17 E1 · PNG/SVG export, A 0.70 → 0.50.** The row's own justification: "a retained draw list replayed to SVG is
`[INFERRED]`". Checked in the raw 56941736 body: "For SVG export the new method was adopted. This not only made
the code almost 1K lines shorter but also made a number of map features exportable" — no mechanism; xa §2.16
adds the PS post's "generic converter from his drawing calls to SVG", which supports the inference but is a
different generator's statement. No VG SVG export exists in any capture. An inferred mechanism with no recording
is a 0.50 identity, not 0.70. PLAUSIBLE.

---

## 3. Rows tried to refute and could not

| row | what I checked | verdict |
|---|---|---|
| G2 seed / RNG / retry (F .85 V .85 A .35 S .01) | appendix `Random.reset` 7/6/6/6 and `float` 2 254/2 461/2 109/1 803; the three `VillageScene.hx:275` strings; retry seeds in `meta.json` (4242 → 204813853 with `trees=4243`; 9191/9192 → 443658761 with `trees=9191`) | stands — the row already scores the engine and order as unknown |
| G4 height field (A .70) | re-derived the noise identity on all four appendix runs (all exact); `dist2poly` = `setPixel32` = 16 384; `createGradient` 127² (P1) | stands — structure exact, constants absent, and the row says so |
| G6 density (F .70 V .70 A .20) | `createDensity` 1 call in every appendix run, 0.6–1.1 ms (R4); consumers verified in raw 80494491, 104226049, 104796798, 105215836 | stands — already the lowest model row |
| G7 heart / seeding (A .30) | `getHeart` 1; `createSquare` parentage per R4 | stands — the row tags the coupling `[INFERRED]` itself |
| G9 bridges (F .85 V .90 A .50) | raw 89314043: "angle is always as right as possible", "simpler and narrower", "cast a shadow"; `startBridge` = `Bridge.new` = `BridgeView.draw` (1/0/0/2 and 4 in R3) | stands |
| G10 square (F .85 V .85 A .60) | raw 80494491 verbatim procedure; `SquareBuilder.build/place/addCenterpiece` = `props.Tower.new` 0/1/0/1; `testShapeVsShape` only in square runs (R3) | stands — a fully stated procedure with an unknown size law is a fair 0.60 |
| G11 wharf / piers (F .80 V .85 A .40) | raw 91692684 "as if made of tiny planks, same as bridges"; raw 88749133 "piers are not created on ponds"; `findDockable/getWharf/buildPiers/buildWharf` 1/0/0/1; pier draw on the coast record | stands |
| G12 buildings (F .80 V .85 A .55) | `addBuilding` 29/41/50/26 vs console 29/41/50/25 with `removeBuilding` 0/0/0/1; `BinGrid.get` ≈ 2 × `getBuildingsAround` | stands; V kept because the glyph is pinned and spacing is measurable from 24 PNGs; note the "Known: rejection sampling" is pv's H4 inference (§6) |
| G15 forest (F .80 V .85 A .55) | `validate ÷ step` = 50.00 on all four runs (re-computed); `DCEL.addVertex` = `HalfEdge.new`; `ArrayExtender.difference` = `shrinkExcl` 41/21/32/27; raw 88749133 "domain warping to the fractal noise" | stands — the row already discounts `warp` and `Bloater` |
| G17 naming (F .90 V .90 A .75 S 0) | grammar asset: 69 symbols; `#syll#` referenced only by `suffixName`/`prefixName`, `#proper#` by six business symbols (the `addExternal` set); `Markov.generate` 1 ↔ `VillageGrammar.syll` 1 in the one run that needed a syllable | stands — content is original by ruling, so identity is the engine's, which the data shows |
| G19 population / class (A .30) | `rollPopulation` 1; plate rounding in R6 | stands (see §6 for the range nit) |
| R1 palette / style (A .85) | 40-key schema with six themes (cvn P5 verified on the asset bodies) | stands |
| R3 relief (F .85 V .80 A .60) | `LevelsView.init` = `NewGrass.init` 114/79/92/103; `verifySlope` pass 97–98 %; raw 71653886 "all three methods really just draw shapes along isolines" | stands — hachure/contour marks already discounted |
| R7 roads rendering (A .70) | casing `w+2` and `lerp(ground[0], ink, 0.14)` on the default palette; `RoadsView.buildMerges/addMerge/buildDriveways` in the appendix | stands — carries the same default-only caveat as R12 but is already at 0.70 |
| R9 trees rendering (V .80 A .60) | `getCloudCrown` 51/14/7/0 vs `drawTree` 751/697/546/602; `drawLongShadow` ≈ `drawTree`; Conifer/Palm unrecorded (discounted) | stands |
| R10 shadows (A .70) | `ShadowLayer.drawPoly` 751/697/877/602 vs `drawTree` 751/697/546/602 | stands at 0.70; see §6 for the gen-2 excess |
| R13 palisade rendering (V .90 A .70) | the palisade draw records exist (`05-37-29/draw/gen-0`, `gen-1`); `PalisadeView.draw` 1, `drawPassageShadow` 3 | stands (the `arc 412` figure is vs §2.6's, not re-verified here) |
| R14 lights (F .80 V .75 A .50) | raw 169696051 "based on a single continuous map"; never draw-recorded | stands — already priced |
| R15 nameplate (A .75) | `measureRect` 8/4/4/4, `layoutPlate`; two `fillText` per map | stands |
| R16 grid (A .70) | raw 169696051; `GridLayer.new/update` runs, paints nothing | stands |
| R17 numbering (A .70) | vpb §2.34's creation-order reading of a 133-house image (locally coherent along streets, trailing outliers) | stands — well-argued inference for a small feature |
| E2 JSON (A .40), E3 permalinks, E4 toggles, E5 integrations, E6 performance, D1 scale | raw 105215836 "just another list of polylines"; `?seed&tags&trees` in every `meta.json`; 300/500/800 and 0.7 m (cvn S3) | stand |
| seed_exact 0.01 (aggregate) | — | cannot be over-confident at 0.01; stands |

---

## 4. Aggregates and effort

**functional 0.80 → 0.75 (PLAUSIBLE).** A plain mean of the adjusted rows still lands near 0.83, so this is a
judgment about what the rows do not price: (i) **interaction between features** — the creator's own shipped
defects are all cross-feature (palisade × fields "quite common to get fields overlapping each other", raw
104796798; palisade × water "not supposed to be used", same post; crossroads × secondary roads "loop back … or get
cut off", vpb §2.19; confluence × bridges "wrong angles", raw 91692684; trails × fields × houses needed three
repair rules in 1.2.7, vpa §3.10.4; forest × fields negotiate at run time, `Farmland.reroll` under `Forest.roll`).
Parity means reproducing the *good* interactions and choosing which defects to keep; no row and no effort line
carries that. (ii) Eight of twenty tags never ran (§2 #1), so "same option surface" is half-evidenced. (iii) The
statistical targets that define "statistically similar structure" do not exist yet — the assessment's own
experiment 4 proposes measuring them.

**visual 0.85 → 0.80 (PLAUSIBLE).** The default theme is pinned to the pixel; the other five themes, three roof
types, three tree shapes, two relief modes, the lights and the non-default band counts are screenshot-only, and
the two colour/width laws the row-level 0.90–0.95s rest on are verified on the default palette alone (§2 #13,
#16). The road-web visual class depends on an unknown steering law (§2 #4).

**algorithm identity 0.55 → 0.50 (PLAUSIBLE).** Ten rows move down by 0.10 (G3, G5, G13, G14, G16, G18, R4, R5,
R6, R8, R11) and two by more (R12, E1); the assessment's own weighting then lands at ≈ 0.50. The honest phrase
"same skeleton, our muscles" describes a 0.50 better than a 0.55 once the skeleton rows stop carrying muscle
credit.

**seed exact 0.01 — unchanged.**

**effort 18 (14–24) → ≈ 24 (18–32) person-weeks (PLAUSIBLE).** Reasons, each answering a lens item:
* *Robustness the creator says took years.* Six years of releases (2020-04 → 2026-09); rivers "a total mess"
  inside and rewritten from scratch (raw 89314043); fields "quite messy" and reworked in 1.2.5, 1.2.7 and 1.5.1
  (raw 88749133); trees the "longest-running unsolved problem" across three years (vpa §3.13); crossroads
  abandoned once (84106820) and shipped glitchy (116745476); water "more difficult than expected" and its hottest
  loop "found too late" (50688261); non-square maps "too much time" (vnd A1 #7); permalinks five days (raw
  56941736). The estimate's per-block lines assume the blocks are independent; the record says the time went
  into their seams. Add ≈ 1.5–2 weeks of integration/interaction work.
* *Tuning targets do not exist.* "Tuning and validation against the 24 captures" is budgeted at 2.0 weeks, but
  the targets (T-junction share, curvature distributions, setback/spacing, field compactness, silhouette
  fall-off) must first be measured (experiment 4) and then four black boxes calibrated to them by eye. Add ≈ 1–2
  weeks.
* *Never-recorded render modes.* Hachures, Contours, Hip, Flat, Ruin, dome, Conifer, Palm, night lights, group
  shading, five themes' band counts: ten-plus modes designed from screenshots inside a 4.0-week renderer line
  that already holds seventeen subsystems. Add ≈ 1 week.
* *Content authoring.* Original grammar (69 symbols with tag gates and weights, two name lists, surname
  compounding, eight business templates, shrink budget, type strings) plus six themes authored "to the same
  standard" — the creator: "It's surprisingly hard to generate a colour scheme that looks good" (raw 89314043).
  The 1.0-week naming line and the renderer line together under-carry this by ≈ 1 week.
The "≈ 10–12 if the base's substrate exists" figure moves likewise to ≈ 14–16.

---

## 5. Spot-check log against original sources (≥ 10 rows)

| row(s) | original opened | what was verified | result |
|---|---|---|---|
| G10, G14 | `watabou-village/80494491/post.md` body | square procedure verbatim; orchard rule "rows … more chaotically"; "Roughly half"; `no square`/`no orchards`; per-class stroke thickness decoupled from house spacing | quotes exact; orchard mode is a name, not a predicate (§2 #6) |
| E1, E3 | `56941736/post.md` body | "new method … almost 1K lines shorter"; permalinks "5 days"; population editable | no mechanism stated (§2 #17) |
| R12, R14, R16 | `169696051/post.md` body | "Hard Light blend mode is used for mixing"; 1.0 and 0 special; numeric Details; grid in abstract units; lights "single continuous map" | composition order unstated (§2 #16) |
| R4 | `110526365/post.md` body | "How pronounced the effect depends on the *shadow color*"; group shading depends on shadow colour **and** length | mapping unstated (§2 #11) |
| G5, G10, G11, R8, R9 | `91692684/post.md` body | coves/headlands; "estuary is a combination of a regular river and a bay"; tower centrepiece; square aligns to highway; piers as planks; curvilinear furrows; ruin roofs; `district` | cove/estuary are names (§2 #3) |
| G3, G9 | `89314043/post.md` body | rewrite from scratch; meander; narrower; "relief follows rivers"; four bridge rules; rectangular squares; random preset "surprisingly hard" | quotes exact |
| G16 | `104796798/post.md` body | enclosure depends on the density map; cuts woods/fields; overlapping fields; not for water | quotes exact; nothing on the construction (§2 #7) |
| G6, G8, G16 | `105215836/post.md` body | "just another list of polylines"; gates are houses; "unreasonably curvy" fix; density maps "generated very differently" | quotes exact (§2 #4) |
| G1, G5, G15, R8 | `88749133/post.md` body | ponds 1 (2–3), no piers; one road tag always selected; domain warping of the density noise; Flat roofs, dome | quotes exact |
| R5, R7, G8 | `104226049/post.md` body | spotlight parameters; merges "quite crude", in *Style*; driveways "mostly larger"; isohypses "depending on the steepness" | quotes exact (§2 #12) |
| R3, R8, R9, G1 | `71653886/post.md` body | "Improved" trees rim/muted/interior; multiply rule; Slope; "shapes along isolines … built more evenly"; tags; `organic` | quotes exact; Slope is a name (§2 #14) |
| G1, G5 | `captures/village/*/meta.json` (three captures) + pv R6/P0 | the tag set and seeds of every pass; coast only in the draw pass; no estuary/crossroads/farmland/uncultivated/organic/dense/district/no-orchards anywhere | CONFIRMED (§2 #1, #3) |
| G16, R2 | four `*.draw.json` scanned | `lineWidth 24` white strokes (46/43/40 segs) only in the palisade records, two in the two-attempt run; `#ff0000` mask once per record | CONFIRMED (§2 #7, #10) |
| G17, G18 | grammar asset `0013-eda47b10.json` | 69 symbols; `#syll#` and `#proper#` are the external references; `special` includes `SHORE?-lighthouse` | CONFIRMED |
| G3 | `2026-09-25T10-14-02/river-windows/` listing | the three window JSONs, script and renderer exist | CONFIRMED (existence only) |

The two critic seats' 51 `[STATED]` spot-checks were not repeated; the eleven bodies I opened contained no
misquotation of anything the assessment cites.

---

## 6. Nits that do not move a rating

1. **pv §3.3 / G12 / G19 "pop/building 3.6–6.9 (mean 5.1)".** The table in pv §3.3 gives 14 buildings → 47
   people = **3.36**; over its 16 rows min 3.36, max 6.88, mean **4.96** (re-computed). The range should read
   3.4–6.9, mean ≈ 5.0; with R6's two extra points it is unchanged in substance.
2. **G19 "hamlet ≈ 18–20"** rests on a single data point (19 buildings, 72 people); whether the class is a
   threshold on buildings or on population cannot be told from the data.
3. **G12 "Known: rejection sampling along frontages with a spatial hash"** is pv's H4 inference ("weakly
   confirmed" on two acceptance-rate points), not a `[SHOWN]` fact; the candidate → validate → add counts are
   shown, the "intervals along the frontage" are not.
4. **R10 "`ShadowLayer.drawPoly` = trees"** is exact in three runs and off by 331 in the palisade run
   (877 vs 546 drawn trees) — some other object class shares the pass there.
5. **R13 `arc 412`** comes from `visual-spec.md` §2.6 (a `05-37-29` tally) and was not re-verified here; the
   assessment cites it as if from pv §4.9.
6. **§0 of the assessment** says the critics' 51 spot-checks were relied on rather than opening raw bodies;
   that reliance held up under my eleven reads, but the lens note stands: none of the assessor's `[STATED]`
   citations were checked by the assessor.

---

## 7. What is CONFIRMED and what is PLAUSIBLE in this file

**CONFIRMED (executed here):** the capture inventory facts of §2 #1 and #3 (which tags, seeds and passes exist);
the palisade-only 24-px white polyline strokes of §2 #7/#10; the grammar-asset facts; the four noise-identity
re-derivations and the four k = 50 ratios; the pop/building recomputation; the hard-light/lerp divergence on the
`sand` and `night` inks; the `W·k^1.5` extrapolation. **PLAUSIBLE (judgment):** every rating and effort
adjustment in §2 and §4, and every "stands" verdict in §3. Nothing here required a new recording, a pixel
measurement or a JavaScript bundle, and none was made or opened.
