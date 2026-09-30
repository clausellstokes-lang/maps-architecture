# Confidence assessment — watabou's Village Generator (VG)

Lane `confidence/vg`. Written 2026-09-25 by the VG confidence assessor (Fable seat). Status: **COMPLETE**.

The question answered here: *how confident are we of reproducing VG's behaviour, its look, its actual algorithms,
and its seed-for-seed output?* Four separate confidences per capability, then an aggregate, an effort estimate,
the ten riskiest unknowns and the cheapest experiments. Every number is a judgment (**PLAUSIBLE**); the evidence
each rests on is quoted with its tag and source, and where a critic seat re-derived a number from the raw
`calls.json`/`draw.json` files I say so (that evidence is **CONFIRMED** by them, not re-executed by me).

## 0. Reading log and method (what this assessment rests on)

Read **in full, every line**, in this order (≈ 245 k tokens of reading, under the 350 k switch point, so nothing
was downgraded to outline reading):

1. `research/findings/_critic-vg-ng.md` (226 lines) — third critic seat; rulings V1–V27, §2 resolutions, §3 spot-checks (66/66 phrases found), §4 re-derivations on 21 clean VG runs, §6 gaps.
2. `research/findings/_critic.md` (478 lines) — first critic; rows C7–C11 (VG), §3 cross-resolutions, §4 spot-checks, §6 gaps.
3. `research/findings/_critic-os.md` (434 lines) — OS seat; only §1.1 (2017 PRNG), §1.10 (dead `PerlinNoise`/`MarkovChain`) and §4 (draw order / determinism bound) bear on VG, and only as a warning about what seed-exactness would demand.
4. `research/findings/profile-village.md` (2 362 lines) — body §0–§10, Appendix A, Critic addendum (2026-09-21), River-course addendum R1–R6, Critic-2 addendum, River-course addendum part 2 (P0–P6).
5. `research/findings/vg-posts-a.md` (1 195 lines) — 14 Patreon posts 2020–2023 (1.0.0 → 1.5.0), incl. the transcribed 1.2.2 palette JSONs and the Critic-2 addendum.
6. `research/findings/vg-posts-b.md` (995 lines) — 14 Patreon posts 2023–2026 (1.5.1 → 1.6.8), Critic-2 addendum.
7. `research/findings/vg-ng-devlogs.md` (1 038 lines) — 21 VG + 6 NG itch devlogs, Parts A–C, Critic-2 addendum.
8. `research/findings/os-geometry.md` (946 lines) — 2017 ancestor geometry/utils; relevant to VG only through the shared-substrate class names (`Random`, `Perlin`, polygon toolkit) and the licence/clean-room ruling.
9. `research/findings/watabou-extra-a.md` (1 161 lines) — §2.15 (VG palette schema 2020), §2.10 (forest blobs, "VG got it first"), §2.19 (VG creates nothing outside the frame), §2.1–2.6 for the shared bisector lineage.
10. `research/findings/watabou-extra-b.md` (996 lines) — T19/T20 (multi-colour, outline mix), T24 (UP's diagnosis of the VG-style placer), T31 (code transplanting), §5 (NG's knob list).
11. `research/findings/visual-spec.md` (743 lines) — §0, §2 (VG draw-record measurements), §5–§7.

Consulted for numbers: `captures/README-labelfix-2026-09-25.md` (VG rows), `captures/village/2026-09-25T10-19-31/INVALID.txt`,
`…10-27-25/INVALID.txt`, `captures/village/2026-09-25T10-28-58/report.md` (header, console, class table) and its `meta.json`.
**Not done:** no new recording, no pixel re-measurement, no `calls.json` re-derivation of my own, no raw `post.md`
opened (the two critic seats spot-checked 51 `[STATED]` claims against source, 51 supported — I rely on that), and
**no captured JavaScript bundle opened** (`captures/**/network/bodies/*.js` unread, as ruled).

**Rulings carried as binding** (task text + critic files): every VG number is build-stamped
(`html/19251041` = 2026-09-21 captures and the base findings; `html/19365073` = 2026-09-25 captures; same seed 3131
keeps its name and POIs but not its geometry — 29 → 24 buildings, course 51 → 94 segments, `River.calculateCurvature`
1 → 0); the height field is a 5-octave fBm; the river course exists before terrain; roads are steered trackers, not
A\*; road merging and driveways are view-side; the palisade is hull-based; `PoissonPattern` = warped Poisson-disc with
k = 50; `makeCut = PointExtender.project` holds for VG's field bisector but is *not* the right-angle construction
(C13 OPEN); the profiler-label caveat applies — in every VG capture `village.utils.Bloater`, `village.model.Elevation`,
`geom.polygons.PolyTransform`, `coogee.*` and (09-25) `village.model.Building` may carry misattributed rows
(`captures/README-labelfix-2026-09-25.md` rows 139–146), so per-class counts for those classes are read with that
doubt; totals, timings and draw data are unaffected.

**Confidence semantics** (all four in [0, 1]):

* `conf_functional` — an expert team could build behaviour-equivalent functionality: same feature, same option
  surface, statistically similar structure.
* `conf_visual` — the output would be placed by a viewer in the same quality/style class.
* `conf_algorithm_identity` — our derivation would match **their** algorithm, not merely its output ("deriving their
  code").
* `conf_seed_exact` — same seed → same map. Needs their exact RNG engine, every draw in order, every constant. For
  VG **nothing of the 2017 open-source ancestor applies**: VG is a 2020+ codebase with no wards/walls/Voronoi-town
  pipeline; its `Random` shows only `float`/`reset` in the recorded inventory and its `Perlin` is not the dead 2017
  `PerlinNoise`. The build drift of 2026-09 (seed 3131 changed geometry between two builds a week apart) also means
  the *target* of seed-exactness moves. So the floor is ≈ 0 everywhere. For render-only rows the value is marked
  "—" (rendering is deterministic given the model; seed-exactness is a model property) and scored 0.0 in the
  structured summary.

Evidence tags: `[STATED]` creator/asset text, `[SHOWN]` recorded behaviour (counts, timings, draw records, pixels),
`[INFERRED]` reconstruction, `[NAMED-ONLY]` a symbol with no recovered behaviour. Citations: `pv` = profile-village.md,
`vpa`/`vpb` = vg-posts-a/b.md, `vnd` = vg-ng-devlogs.md, `xa`/`xb` = watabou-extra-a/b.md, `vs` = visual-spec.md,
`osg` = os-geometry.md, `c1`/`cvn`/`cos` = the three critic files; bare numbers are Patreon post ids, `devlog N`
itch devlogs.

---

## 1. Headline

**VG is the best-instrumented of the four references at the level of *what runs when*, and the worst at the level
of *what the hot loops compute*.** Twenty-four coverage runs across two builds, six CPU profiles down to 20 µs,
three draw records and the block-level coverage of the 2026-09-25 capture give us: the exact stage order
(course → terrain → water body → density → network → buildings → fields → forest → name), the class/method
structure of every stage, exact arithmetic identities (k = 50 candidates per Poisson step; 5-octave fBm sampled
once per 128² cell; band widths `W·k^1.5`; `outline = lerp(fill, ink, factor × pressure)` to ±0.005; the field
bisector's `makeCut = split = project`), the loop trip counts of every water/terrain routine, the complete
40-key palette schema with all six shipped themes, and the per-primitive draw-op sequence of every layer. Against
that stand four load-bearing black boxes: **`Region.createDensity`** (1 call, ~1 ms, no children — yet it fixes the
heart, the packing, the palisade's extent and the spotlight), **the tracker steering law** (`Tracker.flexibility`
and its slope/branch/termination rules), **`Water.createDeflection`'s window semantics** (a ≈31×31 pass over every
land cell, 14 M steps, the whole cost of water — but *what* it computes is unrecovered), and **where the seed
enters** (six `Random.reset` points per village; `River.new` is seed-dependent yet makes no `Random` call).

| aggregate | value | one-line basis |
|---|---|---|
| `functional` | **0.80** | every feature and option is enumerated and staged; the four black boxes cost tuning time, not feasibility |
| `visual` | **0.85** | the renderer is pinned by draw records, palette data and verified colour formulas; Hip/Flat roofs, Conifer/Palm trees and the Hachure/Contour marks were never recorded |
| `algorithm_identity` | **0.55** | architecture identity ≈ 0.85 (agent trackers, level-set water, OBB fields, hull palisade, Tracery+Markov names); per-stage rules and constants ≈ 0.35 |
| `seed_exact` | **0.01** | no source, unknown RNG engine and draw order, an inlined/precomputed seed path in `River.new`, and a reference that changed seed-for-seed geometry between two builds in one week |
| effort (expert, person-weeks) | **18** (14–24) | parity with statistically similar output; ≈ 10–12 if the base's shared substrate (noise, polygon toolkit, Poisson/Voronoi/DCEL, palette renderer) already exists |

---

## 2. What VG is, as recorded (the frame for every row)

Build 19365073 (live 2026-09-25), seed 3131 `river,isolated`, from `pv` R1/P1–P4 and the Critic addendum:

```
Blueprint.fromURL | Blueprint.random → Params.randomTags → Params.resolve → Tags
Region.new(seed, tags)
  createElevation:  River.new (course: 3-point skeleton → Chaikin ×2 → 6–7 knots on a PathTracker → cubic spline
                    7 samples/span → fixed-step resample, 64–94 segments; no noise, no shared-RNG call)
                    → Elevation.new (5-octave fBm once per 128² cell → digRiver: min distance to every course
                    segment per cell, 1 799 river cells → createGradient 127×127)
  createWater:      Water.river → setLevel → createDeflection (per land cell ≈ 945 window steps)
                    → buildCurves (getGrid 129² → linkSegments → smoothOpen/resample → createPatches)
  createDensity     (1 call, 0.6–1.1 ms, no sampled children)
  findDockable
  roll:             buildNetwork (Network.build → spawnWharf/spawnIsolated/createSquare; 4–11 Trackers ×
                    30–40 advance steps, each flexibility → findRoadAhead → avoidWater → endBridge;
                    Junction.new 3–5) → placeBuildings (buildAlong per street → Building.new → validateBuilding
                    → addBuilding, 63–82 % accepted; spawnAt; buildPiers) → spawnFields (Farmland: Voronoi ∩ land
                    → Bisector.partition/subdivide on OBB → pickLots/filterLots → arcs; fixTrails) → rollForest
                    (PoissonPattern k = 50, warped → Delaunator → DCEL floodFill patches → shrinkExcl; 6-octave
                    fBm density) → rollName / rollPopulation → Legend.new → updateTags → Blueprint.updateURL
VillageScene.recreateView → VillageView.new (layers §R2)
```

Costs (build 19251041, `pv` §5/R4): model 14 ms (no water) to 143 ms (pond, cold); water extraction 17–87 ms of
that; render 27–95 ms. Map: 1 100 × 1 100 px square; internal size 300/500/800 units; JSON export at 0.7 m per unit.

---

## 3. Capability matrix

Format per row: **Evidence** (tags + citations) · **Known** · **Must invent** · the four confidences, each with a
one-line justification. A numeric summary table follows in §4.

### 3.A Generation stages

#### G1 · Tags, request/descriptive tag layers, URL state
**Evidence.** `[STATED]` tag vocabulary across releases: `island, farmland, uncultivated, organic` (71653886), `no square, no orchards` (80494491), `isolated, dead end` (84106820), `pond, grove, highway` (88749133), `confluence, estuary, district` (91692684), `palisade` (104796798), `crossroads` (116745476), `sparse, dense` (vpb §2.1); `[STATED]` exactly one road tag is always selected (88749133, S9); `[SHOWN]` URL `?seed=<uint32>&tags=<list>&trees=<uint32>` (pv §3.1; meta.json); `[SHOWN]` `Params.randomTags` 1 / `resolve` 1 per generation, `Blueprint.is` 63–92 calls (pv App A); `[SHOWN]` a cold load requesting `tags=river` came back `river,isolated` (pv R6); `[SHOWN]` a second, 21-symbol descriptive tag set (`WATER, SHORE, RIVER, … JUCTION (sic), SQUARE, DISTRICT`) written by `Region.updateTags` for the grammar (pv §3.1, P2).
**Known.** The whole user-facing vocabulary; the mandatory road slot; permissive composition with documented-unsupported regions (`palisade` + water); two tag layers.
**Must invent.** The prior over tags when none are requested; the `Params.resolve` dependency/exclusion table; how each tag maps onto internal parameters (the "3 exposed → ~20 internal" idiom, xb T28).
`conf_functional` **0.90** — vocabulary and slot structure are complete; only priors are missing. `conf_visual` **0.90** — non-visual; carried as functional. `conf_algorithm_identity` **0.60** — a tags dialog plus a resolve pass is what they do; the resolve table is unknown. `conf_seed_exact` **0.02** — `randomTags` draws from an unknown stream in unknown order.

#### G2 · Seed handling, RNG streams, validation and retry
**Evidence.** `[SHOWN]` `Random.reset` = 6 per regeneration, 7 on cold load, in every clean run (cvn §4 item 11, V23); `[SHOWN]` `Random.float` 1 803–2 461 per village (pv App A); `[SHOWN]` three validation errors from `VillageScene.hx:275` (`highway intersects itself`, `terminated by water`, `unfinished bridge`), the rejected seed carried as `&trees=`, retry seed sometimes `seed+1` sometimes fresh (pv §3.2, P1 spot-check); `[SHOWN]` `Blueprint.adjust` executes only in runs with `Region.new` = 2 (pv R6); `[SHOWN]` the Enter-successor seed is reproducible across browsers per build (pv R6/P0); `[SHOWN]` **no `com.watabou.utils.Random.*` call inside `River.new` nor in `createElevation` before it, yet the course varies with the seed and is identical across sessions** (pv P2, P4 item 7); `[STATED]` tree coverage rerollable alone (Shift+T, 50688261); `Shift+Enter` re-rolls the current village, `Enter` a new one (vnd A3.1); `[STATED]` MFCG-era retry philosophy "create another village until population > 0" (35854256). The 2017 MINSTD (cos §1.1) is *not* evidenced in VG — only the class name is shared.
**Known.** ≥ 6 (re)seed points per village; a separate vegetation stream; whole-map discard-and-retry with highway-class failures; deterministic successor seed.
**Must invent.** The engine; the identities of the six streams; the draw order of every stage; how the seed reaches `River.new` (an inlined RNG step or state prepared earlier); the `seed+1` vs fresh rule.
`conf_functional` **0.85** — per-subsystem streams and a retry loop are straightforward. `conf_visual` **0.85** — non-visual. `conf_algorithm_identity` **0.35** — the sub-stream *shape* is evidenced, engine and order are not. `conf_seed_exact` **0.01** — this row is the reason the aggregate is ≈ 0.

#### G3 · River course (before terrain)
**Evidence.** Build 19365073 `[SHOWN]` call-by-call windows: two `Point.polar` + one `new Point` → `Chaikin.render` (outer 2, inner 3: 3 → 6 points) → `PathTracker.new/reset` → k = 6–7 knots, each `getPos` + `get_tangent` + one `lerp` + two new points, closure branch split 1/6, 1/5, 5/2, 5/1 → `Cubic.smoothOpen`/`build` at 7 samples per span → one `PolyUtils.resample` emitting 93 points → 94/91/84/64 segments at seeds 3131–3134; no `Random`, no noise, no curvature pass; identities `loop = k−2`, `length = k−1`, `cubic = 7(k−1)` hold in 4/4 seeds (pv P1–P4). Build 19251041 `[SHOWN]` `River.new` → `resample` → `Chaikin.render` → `calculateCurvature` last, 51/41/36 segments at ≈ 40 px each, sinuosity 1.3–2.0 (pv R1/R2). Both builds `[SHOWN]`: the course is made inside `createElevation` before any noise object exists (first noise at 1.07 ms, `River.new` returned ≤ 0.9 ms) — the terrain is carved to an independently drawn course (pv R1; cvn V1/V2). `[STATED]` river code rewritten from scratch in 1.5.2, rivers meander and were narrowed (89314043); estuary = river + bay (91692684); confluence = two polylines (`digFork`, `dist2poly` = 2 × 16 384, pv R2).
**Known.** The complete construction chain of the live build, step by step; determinism per seed; course-first ordering; segment counts.
**Must invent.** Knot lateral-offset law and sign rule (not a strict alternation); the resample step in px; the knot-count rule (arc-length stations?); the entry/exit circle radius and the interior point's placement; where the seed enters; the confluence join and the estuary composition; river width (which is *not* in the course — it emerges from `digRiver`'s carve and `setLevel`'s threshold).
`conf_functional` **0.90** — a spline-through-offset-knots river is a small job. `conf_visual` **0.85** — meander character depends on the unknown offset law; screenshots give the target. `conf_algorithm_identity` **0.70** — skeleton → Chaikin → PathTracker knots → cubic → resample is SHOWN routine by routine; parameters are not. `conf_seed_exact` **0.02** — the seed path into the constructor is unrecovered.

#### G4 · Height field
**Evidence.** `[SHOWN]` 128 × 128 grid (`dist2poly` = `setPixel32` = 16 384); exact noise identity `Noise.get = a + b`, `Perlin.get = 5a + 6b`, `a = 16 384·E` in all 21 clean runs → a **5-octave fBm sampled exactly once per cell**, `Perlin.new = 5E + 6`, `Noise.fractal = E + 1` (pv R2; cvn V7 refutes vpa §3.2's "low-octave" inference); `[SHOWN]` `createGradient` = 127 × 127 cell pairs + 127 (pv P1); `[SHOWN]` per-water-type height primitives in one slot: `digRiver` (river), `digFork` (confluence), `createHollow → createMount` (pond), `createIsland → createMount` (island), `createHill → createMount` (waterless, new build), `updateMinMax` alone (waterless, old build) (pv R1/P1); `[SHOWN]` `digRiver` = for each of 16 384 cells the minimum over all course segments of a clamped point-to-segment distance (one `lerp` + one `gate` per test; 1 540 096 tests at 94 segments; running minimum lowered 36.7× per cell; the zero-length guard never fires), 1 799 cells take the short arm (pv P1, R2); `createRidge`/`createCrack` tag-gated (pv §4.2). `[STATED]` "First, a height map is created, from which a gradient vector field is derived" (35854256, S1); "relief follows rivers" (89314043, S8); villages "quite often placed on top of (or next to) a hill" (devlog 613514 comments).
**Known.** Resolution, octave count, once-per-cell sampling, the carve = f(distance to course) with a linear scan, the gradient array, the primitive per water type, the hill bias.
**Must invent.** Base frequency, persistence, amplitude and normalisation (`updateMinMax` → `Noise.getRange`); the carve profile and the threshold that makes 7–11 % of cells "river"; the radial mount/hollow profile; the gradient tilt; ridge/crack forms; the Perlin variant (the 2017 `PerlinNoise` is dead code with no callers — osg §3.7 — so there is no ancestor pin).
`conf_functional` **0.90**. `conf_visual` **0.80** — the smooth, few-extrema contour look is a frequency/persistence choice that must be tuned by eye against `71653886/07` and `profile/gen-3.png`. `conf_algorithm_identity` **0.70** — structure exact, constants absent. `conf_seed_exact` **0.02**.

#### G5 · Water body extraction (river, pond, island, coast, confluence, estuary)
**Evidence.** `[SHOWN]` block trees, build 19365073: `setLevel` 128 × 128 pass; `createDeflection` per land cell (14 585) four two-way tests then a double loop of 30.7 × 30.7 ≈ 944–948 inner steps per land cell in all four seeds (≈ a 31 × 31 window clipped at the border; 13.8–14.5 M steps; the first test fires exactly 2 048 = 16 × 128 times); `getGrid` 129 × 129 lattice; `linkSegments` chains 149 segments into 3 chains with 35 048 inner search steps (quadratic linking); `buildCurves` per-cell six edge arms inside the 1 799 water cells; `createPatches` walks the four map borders (256 per side per call) (pv P1). `[SHOWN]` open-chain (river, confluence: `offsetOpen`, `WaterView.(anon@306247/306266)`) vs closed-ring (pond, island: `offsetClosed`, `normalFromPoly`) code paths in all 10 runs; the island's single coast is still extracted as one chain via `smoothOpen` (pv R3). `[SHOWN]` pond = level set of a radial hollow (cvn V8); island = mount (pv R1). Timings 17 ms (island, 28 % land) to 87 ms (pond), proportional to land cells × ≈ 945 (pv R4/P1). `[STATED]` ponds 1 (sometimes 2–3), never piers (88749133); coves and rarer headlands, straight shores as degenerate cases (91692684); estuary = river + bay (91692684); "the most computationally expensive piece of code … found too late" (50688261).
**Known.** The loop structure and cost law of every routine; that one extraction path serves every water type; chain handling; the per-cell class shared by three routines.
**Must invent.** **What `createDeflection` computes inside its window** (a local extremum filter? a distance-to-water pass? a relaxation?) — the largest single unknown of the water stage; the level threshold; how coast/cove/headland shapes enter the field; how river width emerges from carve depth vs threshold; the bank smoothing/resample step; how two arms are widened at a confluence.
`conf_functional` **0.80** — a level-set extraction from a carved field with marching-squares-style linking reproduces the feature set; matching bank character needs the window semantics. `conf_visual` **0.80**. `conf_algorithm_identity` **0.50** — skeleton pinned, hot-loop semantics not. `conf_seed_exact` **0.02**.

#### G6 · Population-density map
**Evidence.** `[SHOWN]` `Region.createDensity` = 1 call, 0.6–1.1 ms, **no sampled children** in any of six profiles, after `createWater` and before `roll` (pv Critic addendum, R1/R4; cvn §6 item 2). `[STATED]` its jobs: where roads branch more and where more buildings go (35854256, S1); the Pop. density dial scales secondary-road count and buildings per unit length (38498864); fields smaller where dense (57968729, S25); the square at the density maximum, "often on the highway" (80494491, S6); spotlight focus at the maximum (104226049, S10); palisade shape and radius (104796798/devlog 736720, S17); `district`/`dense`/`sparse` tags; "population density maps are now generated very differently" in 1.6.1, villages denser (105215836, S11). Nothing recorded reveals its form (pv §10 item 6).
**Known.** Existence, consumers, cost bound (~1 ms ⇒ at most a 128² pass of cheap arithmetic or a few analytic kernels), pipeline position (after water ⇒ it can be water-aware), the highway bias, the hill bias of the heart.
**Must invent.** Everything about its form: kernel(s), highway ridge term, noise, resolution, how `dense`/`sparse`/`district` scale it, whether the printed population is derived from it.
`conf_functional` **0.70** — a smooth field with those consumers is easy to build; making buildings, fields and palisade agree the way VG's do is the tuning risk. `conf_visual` **0.70** — the built-up silhouette and its fall-off are what a viewer reads first. `conf_algorithm_identity` **0.20** — unrecovered. `conf_seed_exact` **0.01**.

#### G7 · Village heart and network seeding
**Evidence.** `[SHOWN]` `Region.getHeart` 1 call; `Network.createSquare` is reached through `Network.spawnWharf` on dockable water (river/island runs), through `Network.spawnIsolated` on a pond (ponds get no piers), and directly from `Network.build` on dead-end maps — so the square is made by whichever seeding routine fixes the heart, and on dockable water the heart is tied to the wharf (pv R4, `[INFERRED]` reading of a SHOWN parentage). `[STATED]` "the generator finds a place on a map with high population density — often it's a place on the highway" (80494491).
**Known.** Three seeding routes and the fact that the heart, the wharf and the square are coupled.
**Must invent.** The heart selection law (density argmax? water-adjacent argmax? hill bias?).
`conf_functional` **0.75**. `conf_visual` **0.75**. `conf_algorithm_identity` **0.30**. `conf_seed_exact` **0.01**.

#### G8 · Road network — agent trackers, highway, junctions, trails
**Evidence.** `[STATED]` trackers run through the gradient field (35854256, S1); `organic` makes roads follow relief, normally they "resist" it (71653886, S2); roads prefer isohypses "depending on the steepness of a slope" (104226049, S10); fewer crossroads, more T-junctions, right-angle turns in 1.2.7 (57968729); the "unreasonably curvy" bug fix (105215836, S11); `crossroads` branches loop back or get cut (116745476); lonely houses = trail by-product, tuned by fewer/longer trails (57968729); highway topology tags (84106820). `[SHOWN]` `Tracker.new` 4–11; `advance` 130–372; per step `flexibility` ≈ `findRoadAhead` ≈ `avoidWater` ≈ `endBridge`; `getTrackersAround` ≈ 5 per step; `validateJunctions` ≈ 0.6 per step; `Junction.new` 3–5; `branch`/`branchFrom` 0–2; `shortcut` 0–1; `Tracker.clone` on the island run; `initHighway`/`randomEdge` only with a highway (pv §4.4, R3, App A); `[SHOWN]` `Elevation.g` is called only 1–5 times per village against 130–372 steps, so any slope term reads the gradient array inline or lives in `flexibility` (cvn V3); `[SHOWN]` no graph-search class ever executes (c1 C10 — vpb §2.22's A\* inference is refuted); the highway is a single ~150-segment polyline (pv §4.4); merges and driveways are view-side (cvn V11). Version drift: `Region.spawnAt` runs on every 09-25 map (pv Critic-2 item 1).
**Known.** The agent-walker architecture and its per-step call order; tracker counts and step counts; highway from a random map edge; junction validation; bridge start/end as per-step tests; the failure classes; the tag-driven topologies.
**Must invent.** The steering law (momentum vs field weight; the slope term; the `organic` weight); step length; the branch rule and how density drives it; termination; junction resolution (T vs right-angle snapping); `shortcut`; `spawnIsolated`/`spawnWharf` seeding; the dead-end termination at the square; the crossroads branch rule.
`conf_functional` **0.75** — agent walkers with junction resolution are buildable; matching VG's road-pattern statistics (T-junction share, curvature, loop frequency) needs measurement-driven tuning. `conf_visual` **0.80** — the road look is mostly rendering (§R7). `conf_algorithm_identity` **0.45** — architecture identity is high; every rule inside `advance` is unknown. `conf_seed_exact` **0.01**.

#### G9 · Bridges
**Evidence.** `[SHOWN]` `Tracker.startBridge` = `Bridge.new` = `BridgeView.draw` = `drawShadow` = 4 on the river map; `endBridge` fires every step (a test); `Unfinished bridge` is its failure (pv §4.4, R3); `[STATED]` secondary bridges, several per map, crossing "as right as possible", shadow on water (89314043, S8); wrong angles near confluences (91692684). Rendering fully recorded (§R7/`pv` §4.3).
**Known.** Bridges are where a tracker crosses water; the count law is the crossing count; the angle rule exists.
**Must invent.** How "as right as possible" is achieved (choose the crossing point vs rotate the deck — vpb §2.8 infers the former), minimum spacing, width by road class.
`conf_functional` **0.85**. `conf_visual` **0.90**. `conf_algorithm_identity` **0.50**. `conf_seed_exact` **0.01**.

#### G10 · Village square and centrepieces
**Evidence.** `[STATED]` the complete procedure: density peak → circle of "a reasonable size" → distort a little → centrepiece (tree or well) unless the square overlaps water; ≈ half of villages; `no square` (80494491, S6); rectangular squares sometimes, round kept more common (89314043); tower centrepiece; square aligned to the highway when they overlap (91692684, S12). `[SHOWN]` `SquareBuilder.build/place/addCenterpiece` with `props.{Tower, Tree, Well}.new` exactly 1 : 1 in 6/6 square runs (cvn V26; pv R3); a 44-gon disc in the draw record; `PolyBounds.testShapeVsShape` executes in all seven square runs and none of the three square-less ones — the square's signature; `Region.getPopulated` under `SquareBuilder.build` (pv §4.5, R3). Three morphologies in screenshots (circle, rounded blob with well, irregular polygon with sub-areas) (pv §4.5).
**Known.** Procedure, centrepiece set (tower/tree/well/none-over-water), morphologies, the highway alignment, the size stays small even at Pop. 1 700 (vnd A2.2).
**Must invent.** The size law; the distortion operator and amplitude; round/rectangular probability; how houses are laid tangentially round the rim; how radial roads attach.
`conf_functional` **0.85**. `conf_visual` **0.85**. `conf_algorithm_identity` **0.60**. `conf_seed_exact` **0.01**.

#### G11 · Wharf and piers
**Evidence.** `[SHOWN]` `spawnWharf`, `buildWharf`, `findDockable`, `getWharf`, `buildPiers` run once on every watered map; `BridgeView.drawPier` 0 on the two rivers, 2 on the island, 4 on the coast (draw pass); `validateLanding` 0–4; piers reuse `drawPlanks` and cast no shadow (pv §4.1, R3, R5). `[STATED]` piers "if a layout allows", port buildings along the shore (38498864); pier bugs fixed (50688261); never on ponds (88749133); narrow rivers get none (89314043); drawn as planks (91692684).
**Known.** Stage structure, suppression cases, rendering.
**Must invent.** The dockable test (width threshold), pier count/spacing/length, whether piers join the road graph.
`conf_functional` **0.80**. `conf_visual` **0.85**. `conf_algorithm_identity` **0.40**. `conf_seed_exact` **0.01**.

#### G12 · Building placement, specials, population
**Evidence.** `[SHOWN]` `buildAlong` per street 6–16; `Building.new` 37–79 candidates → `validateBuilding` → `testVsRoad` → `getBuildingsAround` via a `BinGrid` spatial hash (≈ 2 `get` per query, 33–61 inserts) → `addBuilding`; acceptance 63–82 %, falling with density; `removeBuilding` 0–1; `spawnAt` (targeted specials); `props.Tower` is a square centrepiece, `GableRoof.drawTower` a roof feature (pv §4.8, R3; cvn V16); `[SHOWN]` population 3.6–6.9 per building (mean 5.1), `rollPopulation` 1 call, plate rounds to 10, type strings by code (roadhouse ≲ 17 buildings, hamlet ≈ 18–20, village above; qualifiers riverside/coastal/island) (pv §3.3, R6). `[STATED]` all buildings rectangular (66544756); count per unit length from the density map (35854256/38498864); geometric street width is separate from stroke width (80494491); MFCG borrowed this placer — "more sparsely … all proper rectangles" (37407181); "no empty roads" (36199609); "large buildings" = special locations (36199609); driveways to mostly larger buildings (104226049); creation-order numbering (116745476, vpb §2.34); shore-frontage row (38498864); the fake-perspective renderer is why buildings are rectangles (117634240). UP's later diagnosis of exactly this placer: gaps open where a street bends, so no streetwall forms (xb T24).
**Known.** Rejection sampling along frontages with a spatial hash; specials via `spawnAt`; size correlates with map size; the population is derived, not an input.
**Must invent.** Setback, spacing distribution, footprint size distribution, side choice, the special-building rules (which become tavern/smithy/temple; tower/dome/slate-roof 1-in-3), the household model, the type thresholds, the "no empty roads" mechanism.
`conf_functional` **0.80**. `conf_visual` **0.85**. `conf_algorithm_identity` **0.55**. `conf_seed_exact` **0.01**.

#### G13 · Fields
**Evidence.** `[SHOWN]` `Farmland.getVoronoi` → `intersect` = `PolyBool.and` → `cut` = `Bisector.new` = `partition` (27/18/28/23) → `subdivide` = `getMinArea` (71–120) with `PolyBounds.obb` = `convexHull`; `makeCut` = `split` = `PointExtender.project` in all 21 clean runs (cvn V4/§4 item 3); `pickLots`/`filterLots`/`fixTrails` 1 each; `semiSmooth` = `getArc` = `getCircle` 20–44 (corner arcs); `getLandSegments` → `Water.getLand` → the second `createPatches` (land patches built lazily here) (pv §4.7, R4). `[STATED]` the 1.2.7 rules (57968729, S5/S25): ≤ 1 house per field or the *field* is discarded; fields smaller where density is higher; trails truncated at field edges with the terminal house re-anchored; bad shapes (triangular, sectorial, not compact) discarded; alignment to main road/water near the centre, rings further out; design brief and the polygon-Boolean "thorn" defect (50688261); grouping, one-sided for small villages, sectors, curvilinear edges (88749133); `farmland`/`uncultivated` tags (71653886); fields overlap inside palisades (104796798).
**Known.** The construction chain; the discard rules; the density-size law's existence; corner rounding.
**Must invent.** Voronoi seed placement (ringed round the heart to give the "sectors" look — c1 C9); the clip region; the min-area law vs density; the cut rule (C13 OPEN — `project` is an OBB-axis step, not a right-angle construction); compactness thresholds; `pickLots` selection; arc radius rule; the furrow angle rule.
`conf_functional` **0.85**. `conf_visual` **0.85**. `conf_algorithm_identity` **0.60**. `conf_seed_exact` **0.01**.

#### G14 · Orchards
**Evidence.** `[STATED]` fields overlapped by ≥ 1 house become orchards; rows, or chaotic when the plot is irregular; `no orchards`; hideable (80494491). `[SHOWN]` `FarmlandView.drawOrchard` 3–6; `getRows` 1–4 vs `getPoisson` 1–2, one per orchard; `validateTree` 16–55 rejects trees outside the plot (pv §4.7; cvn §2).
`conf_functional` **0.90** — rule and both fill modes are stated and recorded. `conf_visual` **0.90**. `conf_algorithm_identity` **0.75**. `conf_seed_exact` **0.01**.

#### G15 · Forest
**Evidence.** `[SHOWN]` `Forest.new` → `VoronoiPattern.poisson` → `PoissonPattern` (`validate ÷ step` = **50.000** in all 21 clean runs; ≈ 65 % of steps emit; `warp` 1 : 1 with candidates and tracking `Point.polar`, i.e. at least the annulus-offset step) → `Delaunator` → `DCEL` (`addVertex` = `HalfEdge.new` exactly; `Face.new` 1 897–5 910 cells) → `Forest.roll` (a second, **6-octave** fBm; `Farmland.getFields/reroll` — fields give ground) → `floodFill` 33–53 → `outline` → `shrink`/`shrinkExcl` (= `ArrayExtender.difference` exactly) → candidates 1 199–1 633 → ≈ half drawn (pv §4.6, R2; cvn V6/V15). `[STATED]` "Many = fill the whole map, Some = random patches; then trees too close to cottages or roads are removed" (42521165, S4); domain warping applied to the tree-density fractal noise (88749133, S9 — so `PoissonPattern.warp` must not be credited with the ragged edges, cvn V15); `grove` reversal; Improved method: rim crowns / muted band / solid interior (71653886); wilderness mode proves the carve is generation-time (66544756). `Bloater.extrude` = `extrudeEx` 9 733–38 840 per map — role unknown, and `Bloater` is on the misattribution list for every VG capture, so its counts carry doubt (pv §8; labelfix README).
**Known.** Sampler + Voronoi + DCEL patch construction; k = 50; noise-thresholded cell labelling; exclusion by set difference; the candidate → drawn ratio; a separate RNG stream.
**Must invent.** Poisson radius law and `warp` semantics; the density noise threshold, base frequency and warp amplitude; patch labelling and `Forest.H`; clearance radii around houses vs roads; the `grove` edge term; what `Bloater` inflates.
`conf_functional` **0.80**. `conf_visual` **0.85** — wood silhouettes are mostly rendering (§R9). `conf_algorithm_identity` **0.55**. `conf_seed_exact` **0.01**.

#### G16 · Palisade and gates
**Evidence.** `[SHOWN]` (one clean run + two confluence runs) `Palisade.new` → `getPopulated` → `getBuildings` → `ConvexHull.ofSet` (closure × 91) → `poly2smooth` (32 `cubic` segments) → `overlaps` = `BitMap.check` 1 463 (`blocks` 337) → `getClosestSeg` 20 → `addGate` 3 / `validateGate` 5 → `clean`/`finalize`; `Gate.new` 3; no `Noise`/`Elevation` call attributable (pv §4.9; cvn V12 — the level-set inference of vpb §2.25 is not supported by the call set). `[STATED]` shape depends on the density map, sparse → smaller (104796798, devlog 736720, S17); cuts woods with a chance to leave trees, cuts fields (glitchy, overlapping fields) (104796798, S24); gates are regular houses where roads cross (105215836, S11); exported as polylines; not for water maps.
**Known.** Hull-based construction, cubic smoothing, raster push-off from buildings, gates at road crossings.
**Must invent.** Which points are hulled (building corners vs a density-contour polyline — undetermined); `getPopulated`'s selection threshold (this is where the density map enters); the push-off rule; gate validation; the tree/field cut rules.
`conf_functional` **0.80**. `conf_visual` **0.85**. `conf_algorithm_identity` **0.50**. `conf_seed_exact` **0.01**.

#### G17 · Naming (village, POIs, persons)
**Evidence.** `[STATED data]` `grammar.json` 69 symbols with two Tracery extensions (`TAG?-rule` gating, `p?-rule` weighting), `{a|b}` alternation and optional letters; `DeckRuleSelector` = draw without replacement; `given_female.txt` (92 names) / `given_male.txt`; `surname = #sur1##sur2#`; `Markov.new` × 3, `split` 418 at start-up → `#syll#`; `VillageGrammar.shrink` → `Syllables.splitWord/pinch` when a name is too long ("shrinking amelriceing"); name derivations for two seeds verified against the grammar (pv §4.11, R6, P2 spot-check); `[STATED]` names improved 1.1.0; settlement kind is a separate field from the name (xa §2.14); rename UI (38498864). **Clean-room ruling:** the grammar, the word lists and the Markov corpus are their creative content — the schema ideas transfer, the values do not.
**Known.** The engine architecture and the grammar's structure and gating vocabulary.
**Must invent (by ruling).** All content; Markov order and training text; the length budget; the type-string logic.
`conf_functional` **0.90**. `conf_visual` **0.90** — same *kind* of names with original content. `conf_algorithm_identity` **0.75** — Tracery + deck selector + tag gates + Markov syllables is SHOWN by the shipped data. `conf_seed_exact` **0.00** — different content by ruling.

#### G18 · Legend and points of interest
**Evidence.** `[SHOWN]` `Legend.new/village` inside `Region.roll`; `Note.new` = 2 per village (`Legend.hx:82` prints exactly two POIs); categories `inn, tavern, smithy, person, temple, basic_shop, special_shop, special`; `NumbersLayer` runs and paints nothing (pv §4.11, R4; cvn §2); `[STATED]` POI generation existed from 1.2.2 and stayed console-only because of annotation layout (vpa §3.21; still true in both 2026 builds).
`conf_functional` **0.90**. `conf_visual` **0.90** (nothing drawn). `conf_algorithm_identity` **0.70**. `conf_seed_exact` **0.00** (content).

#### G19 · Population and settlement class
**Evidence.** `[SHOWN]` pop/building 3.6–6.9 across 18 villages, `rollPopulation` 1 call, plate rounds to 10, type thresholds by building count with water qualifiers (pv §3.3, R6); `[STATED]` population is an output, editable text (56941736), hideable (117634240); the dial spans ≈ 60× (vpa §3.3).
`conf_functional` **0.90**. `conf_visual` **0.90**. `conf_algorithm_identity` **0.30** — the household draw is unrecovered. `conf_seed_exact` **0.01**.

#### G20 · Descriptive tags (`Region.updateTags`)
**Evidence.** `[SHOWN]` the 21-symbol grammar vocabulary and the gates it drives; `updateTags` 1 call under `Region.roll`; `SHORE` inferred present for the island from "Turtle Hall" (pv §3.1, R4, R6).
`conf_functional` **0.90**. `conf_visual` **0.90**. `conf_algorithm_identity` **0.60**. `conf_seed_exact` **0.05** — a deterministic function of the model; would match if the model matched.

### 3.B Rendering conventions

#### R1 · Palette / style system
**Evidence.** `[STATED data]` the complete ≈ 40-key schema with all six shipped themes (`default, cold, night, sand, bw, minimal`), three of the keys being *mode switches* (`relief ∈ {Grass, Hachures, Contours}`, `roofType ∈ {Gable, Hip, Flat}`, `treeShape ∈ {Cotton, Conifer, Palm}`), weighted colour lists (`roofLight` 1-in-3 slate), everything stored as strings (pv §7.1, P5 spot-check); the 2020 17-key ancestor schema and the three deleted style renderers (vpa §4.1; xa §2.15); multi-colour parameters (xb T19); Pressure and the numeric Details parameters (169696051, S13); style collection and random preset (vpb §2.36; vnd A3.6 — 12 styles on one seed). **Clean-room:** their palette values are their content; the schema idea is ours to reuse.
`conf_functional` **0.95**. `conf_visual` **0.90** — our own themes must be authored to the same standard. `conf_algorithm_identity` **0.85** — one parameterised renderer driven by a JSON palette with mode switches is SHOWN. `conf_seed_exact` **—**.

#### R2 · Canvas, layer order, primitives budget
**Evidence.** `[SHOWN]` 1 100 × 1 100 map square letterboxed in 1 500 × 1 100; per-layer cached canvases; the full bottom → top order (shading bitmap → relief marks → roads → fields → bank halo → water mask → water → bridges/shore → shadow pass → buildings → forest patches → dramatic light → labels) (pv §7.2; vs §2.2); Canvas2D verb counts, `lineJoin` round 100 %, no `bezierCurveTo` (old build; `curveTo` 40 on the new) (pv §7.2, P0); ≈ 85 % of all calls are OpenFL plumbing (pv §5.3).
`conf_functional` **0.95**. `conf_visual` **0.95**. `conf_algorithm_identity` **0.85**. `conf_seed_exact` **—**.

#### R3 · Relief: iso-level walker with grass/hachure/contour marks
**Evidence.** `[SHOWN]` `LevelsView.init` 79–114 iso-polylines, `makeStep` 6.7–11 k, `NewGrass.verifySlope` 97–98 % pass, `NewGrass.draw` one 4-point, 0.5 px mark per step in `ground[1]`/`ground[2]`, colour chosen by slope aspect (1 176 : 31 on a flat coast), nested closed loops plainly visible on a sparse map (pv §6; vs §2.4). `[STATED]` "all three methods really just draw shapes along isolines; isolines are built more evenly" (71653886, S27); Grass reworked into "noisier hachures" (169047704). Hachures and Contours modes were never recorded (pv §10 item 12).
`conf_functional` **0.85**. `conf_visual` **0.80** — Grass is pinned; the hachure and contour marks are unrecorded. `conf_algorithm_identity` **0.60** — the even iso-level selection is unknown. `conf_seed_exact` **—**.

#### R4 · Ground shading (hillshade)
**Evidence.** `[SHOWN]` `Shading.update`: 16 384 `setPixel32`, `Vector3D.crossProduct/normalize` = 127², stack blur 3.6–31 ms, composited as a full-map light layer (pv §4.10); `[STATED]` sun-facing slopes lit, strength tied to shadow colour, affects roads and fields, can look "plastic" (110526365). Composite mode and where `ground[0]` is painted are unrecorded (pv §10 item 3; vs §7 item 7).
`conf_functional` **0.90**. `conf_visual` **0.85**. `conf_algorithm_identity` **0.75**. `conf_seed_exact` **—**.

#### R5 · Spotlight (`DramaticLight`)
**Evidence.** `[SHOWN]` two `CanvasGradient` fills on a 1 101² layer, `createRadialGradient` 4–6, `calcLight` × 2 (pv §4.10); `[STATED]` focus at the density maximum / centre / edge per shadow angle; darken with the shadow colour, lighten with its complement; independent intensities; size; key L (104226049, S10).
`conf_functional` **0.90**. `conf_visual` **0.85**. `conf_algorithm_identity` **0.70**. `conf_seed_exact` **—**.

#### R6 · Water rendering
**Evidence.** `[SHOWN, re-derived]` band widths `W·k^1.5` (5.196 : 2.828 : 1 in all three draw records), colours `lerp(waterDeep, waterShallow, k/N)` to ±1/255, drawn as boundary strokes under a water-polygon mask; `shallowBands − 1` tide lines with `2N − 3` segments; sand halo `rgba(sand,0.5)` w16 + solid w8 per bank chain; dark shore stroke w1; bridge shadow `rgba(31,54,77,0.5)` w8; pixel-verified on pond, river and coast (pv §4.3, §7.3; vs §2.3; cvn V10/§4 item 9). `[STATED]` "No. of bands" gradient (80494491). Open: differing segment counts per band (147/219/439) (pv §10 item 4).
`conf_functional` **0.95**. `conf_visual` **0.95**. `conf_algorithm_identity` **0.90**. `conf_seed_exact` **—**.

#### R7 · Roads rendering (casing, merges, driveways, trails)
**Evidence.** `[SHOWN]` casing = core + 2 in `lerp(ground[0], ink, outlineRoads × pressure)`; `largeRoad` 6 / `smallRoad` 2; dashed trails via `dashedPolyline`; per-building apron blobs; `RoadsView.buildMerges/addMerge` (4–14) and `buildDriveways` (1) run in the view, gated by palette `mergeRoads` (pv §7.2/7.3, App A; cvn V11); `[STATED]` merges "quite crude", driveways to mostly larger buildings (104226049, S10); per-class thickness decoupled from geometry (80494491).
`conf_functional` **0.90**. `conf_visual` **0.90**. `conf_algorithm_identity` **0.70** — the merge fillet and driveway geometry are unknown. `conf_seed_exact` **—**.

#### R8 · Buildings rendering (roofs, hatching, fake perspective)
**Evidence.** `[SHOWN]` per building: three quad faces (fill + 0.5 stroke), three hatch pairs alternating over the ridge, an 8-segment footprint outline, a 3-segment entrance mark; `GableRoof.draw` = building count; `shadedFace` = 3×; `hatchLine`; `drawTower`; `roofLight` weighted 1-in-3 slate; `roofVariance` ≈ ±5 % via `Color.multiply/scale`; unlit face = lit × `lerp(white, shadowColor, ≈ 0.92)` (pv §7.3/7.4; cvn V14 — the stated pure multiply of 71653886 is approximate). `[STATED]` one roof colour × shadow, multiple roof colours, hatch colour, Slope fake perspective (71653886); Gable/Hip (84106820), Flat + dome (88749133), Ruin (91692684); rustic hatching, flat-roof inner shadows (104226049); Top-down option (169047704); Details 0…1 (169696051). Hip, Flat and Ruin were never recorded (default palette only).
`conf_functional` **0.90**. `conf_visual` **0.85**. `conf_algorithm_identity` **0.70**. `conf_seed_exact` **—**.

#### R9 · Trees rendering
**Evidence.** `[SHOWN]` crown prototypes of 38–47 vertices × 4 (two Chaikin passes) + 1; `getCloudCrown` 0–51 vs 546–751 trees ⇒ prototypes instanced by `PolyTransform`; `drawPolygonAt` ≈ 2 × trees (crown + shadow); one 2-stop linear gradient per tree; detail stroke at ≈ 85 % of the crown's segments; `TreeType.drawShaded1`; `treeShape` per palette (pv §7.3, §7.1; vs §2.6). `[STATED]` concentric bands with a per-type vertical offset (91692684, S12); Improved method rim/muted/interior (71653886); Thicket colour (104226049); group shading (110526365); gradients None/Linear/Radial (169047704); conifer shadow = jagged triangle (91692684, S26). Conifer and Palm never recorded.
`conf_functional` **0.85**. `conf_visual` **0.80** — Cotton is pinned; the other two shapes and the group-shading composite are not. `conf_algorithm_identity` **0.60**. `conf_seed_exact` **—**.

#### R10 · Shadows
**Evidence.** `[SHOWN]` one flat `shadowColor` pass before the objects: `ShadowLayer.drawPoly` = trees (same crown polygon translated), `drawPrism` = buildings, `drawLightPoly` on the palisade run, `drawLongShadow`/`drawSimpleShadow` modes (pv §7.2/7.3; vs §2.7). `[STATED]` Shadow colour/length/angle (57968729); varying tree shadow lengths (71653886); merged cotton group shadows (121415691). The composite mode is not in the recording (vs §7 item 7).
`conf_functional` **0.90**. `conf_visual` **0.85**. `conf_algorithm_identity` **0.70**. `conf_seed_exact` **—**.

#### R11 · Fields rendering
**Evidence.** `[SHOWN]` per field: fill `fieldLight'`, outline w1 = `lerp(fill, ink, outlineFields × pressure)`, one dashed polyline per furrow with a per-furrow `getPattern` (139–201 furrows, 124–666 segments), ≈ 18 furrows per field (pv §4.7, §7.3; vs §2.8). `[STATED]` dashed furrows (57968729); curvilinear furrows (91692684); numeric Details (169696051).
`conf_functional` **0.95**. `conf_visual` **0.90**. `conf_algorithm_identity` **0.80**. `conf_seed_exact` **—**.

#### R12 · Selective outlining and the colour formulas
**Evidence.** `[SHOWN, verified ±0.005 on 8 colours]` `outline = lerp(fill, ink, outlineFactor × pressure)`, `detail = lerp(fill, ink, detailFactor × pressure)`; `Color.hardLight` count == `Style.getOutline` count (pv §7.4); `[STATED]` "Hard Light" mix, `Pressure = 1` reverts to solid ink ("1 and 0.999 may produce very different results"), `Pressure = 0` kills outlines and most strokes (169696051, S13); the same idea in PS as `Outline` (xb T20). The `pressure = 1` discontinuity must be carried (cvn V13).
`conf_functional` **0.95**. `conf_visual` **0.95**. `conf_algorithm_identity` **0.85**. `conf_seed_exact` **—**.

#### R13 · Palisade rendering
**Evidence.** `[SHOWN]` a bead of round posts along the spline, `PalisadeView.drawPassageShadow` per gate, gates as hatched gatehouse rectangles straddling the wall; `arc` 412 on the palisade map (pv §4.9; vs §2.8); City Viewer renders it as a smooth wall (105215836).
`conf_functional` **0.90**. `conf_visual` **0.90**. `conf_algorithm_identity` **0.70**. `conf_seed_exact` **—**.

#### R14 · Village lights (night)
**Evidence.** `[STATED]` lights driven by "a single continuous map" so some streets are busy (169696051, S13); brighter, less blinding (116745476); palette `lights` colour (pv §7.1). `[SHOWN]` only in screenshots of other palettes (vpb §2.33); never in a draw record (default palette only).
`conf_functional` **0.80**. `conf_visual` **0.75**. `conf_algorithm_identity` **0.50**. `conf_seed_exact` **—**.

#### R15 · Nameplate and labels
**Evidence.** `[SHOWN]` exactly two `fillText` calls: Cinzel Bold 48 px title + 24 px "Pop. N" in `textColor`, halo via a filter (no `strokeText`), corner chosen by `VillageView.measureRect` (4–8) / `layoutPlate` — top-left, top-right or bottom-left across the maps; population rounded to 10 (pv §7.5, §3.3; vs §2.8); `[STATED]` Hide population (117634240); text and text-outline colours (169696051); header/population fonts settable (50688261).
`conf_functional` **0.95**. `conf_visual` **0.90**. `conf_algorithm_identity` **0.75**. `conf_seed_exact` **—**.

#### R16 · Grid overlay
**Evidence.** `[STATED]` hidden by default, size in abstract units, adjustable opacity (169696051); `[SHOWN]` `GridLayer.new/update` runs every generation and paints nothing (pv App A, §10 item 11).
`conf_functional` **0.95**. `conf_visual` **0.90**. `conf_algorithm_identity` **0.70**. `conf_seed_exact` **—**.

#### R17 · House numbering
**Evidence.** `[STATED]` shift-click marking, mark-all, "interesting but not convenient" order, gates markable, permalink storage from 1.6.5, double-click opens Dwellings (116745476, 117634240; vpb §2.34); `[SHOWN]` `NumbersLayer` runs and paints nothing unless marked (cvn §2); `[INFERRED]` the order is creation order (vpb §2.34, from a 133-house image).
`conf_functional` **0.90**. `conf_visual` **0.90**. `conf_algorithm_identity` **0.70**. `conf_seed_exact` **—**.

### 3.C Export, state, editing, integration, performance

#### E1 · PNG and SVG export
**Evidence.** `[STATED]` PNG 1.1.0 (36199609); SVG 1.2.3 with gaps, rewritten via a generic draw-call → SVG library that made trees, lights and the title exportable and cut ≈ 1 K lines (56941736; xa §2.16); title outline fixed in PNG (91692684).
`conf_functional` **0.90**. `conf_visual` **0.90**. `conf_algorithm_identity` **0.70** — a retained draw list replayed to SVG is `[INFERRED]`. `conf_seed_exact` **—**.

#### E2 · JSON export and the exported data model
**Evidence.** `[STATED]` "GeoJSON-like", height map not exported, nothing beyond the border, 1 unit = 0.7 m (37407181, 84106820, S3); fields added (50688261); islands fixed (88749133); palisade as "just another list of polylines" with gates as houses (105215836); City Viewer's renders show buildings with footprint + height + roof, roads with width, water, fields, trees with radius, the square + well, the wall (vnd A2.12; xa §2.17). The schema itself is `[INFERRED]` from the viewer.
`conf_functional` **0.80**. `conf_visual` **0.80**. `conf_algorithm_identity` **0.40** — field names and structure unknown. `conf_seed_exact` **—**.

#### E3 · Permalinks / URL state
**Evidence.** `[SHOWN]` `?seed&tags&trees`, `history.replaceState` inside `Region.new`, numbered buildings in the permalink (pv §3.1, R4; vpb §2.39); `[STATED]` two builds (itch iframe vs github.io) (56941736); PS-style state (xa §2.21).
`conf_functional` **0.95**. `conf_visual` **0.95**. `conf_algorithm_identity` **0.80**. `conf_seed_exact` **0.02** — same URL grammar, different contents.

#### E4 · Editing, layer toggles, map size
**Evidence.** `[STATED]` 12 independently toggleable layers (relief E, fields F, shading H, orchards O, shadows U, buildings/wilderness B, roads R, outlines P, nameplate N, grid, trees Shift+T, spotlight Shift+L) + Ctrl+T reroll trees + Shift+Enter reroll current (devlog 426543, vnd A3.1); rename, editable/hidden population; style dialog with presets/random/collection; map sizes 300/500/800 and free width/height (84106820); Wilderness = pure render filter (66544756); roads hideable without houses (121415691); tag vs render-toggle distinction (71653886).
`conf_functional` **0.95**. `conf_visual` **0.90**. `conf_algorithm_identity` **0.80**. `conf_seed_exact` **—**.

#### E5 · Cross-generator integrations
**Evidence.** `[STATED]` PS → VG (name and coast carried), VG → Procgen Mansion / Dwellings (dimensions, later shape), City Viewer JSON; all via GET parameters (56941736, 66544756, 116745476; devlog 382428 comments).
`conf_functional` **0.90** (as hooks). `conf_visual` **0.90**. `conf_algorithm_identity` **0.80**. `conf_seed_exact` **—**.

#### E6 · Performance profile
**Evidence.** `[SHOWN]` `Region.new` 13.6 ms (no water) – 143 ms (pond, cold); `createDeflection` 17–87 ms; render 27–95 ms with shading blur, trees and relief dominant; ≈ 85 % of calls are OpenFL vector plumbing (pv §5, R4). `[STATED]` "generation is quite fast but drawing is not" (66544756).
`conf_functional` **0.90** — matching or beating these budgets is routine with batched paths and an EDT/JFA instead of the O(cells × segments) carve. `conf_visual` **—** (0.90). `conf_algorithm_identity` **0.80**. `conf_seed_exact` **—**.

#### D1 · Scale and map size
**Evidence.** `[STATED]` sizes 300/500/800 units, 0.7 m per unit on export, medium = 350 × 350 m (84106820, S3); "about 300 or maybe 200 meters" (devlog 613514, S18); the on-screen grid is in abstract units (169696051) — reconciled in cvn V17; `[SHOWN]` 1 100 px square, 128² height cells ⇒ ≈ 2.7 m per cell on a medium map.
`conf_functional` **0.95**. `conf_visual` **0.90**. `conf_algorithm_identity` **0.90**. `conf_seed_exact` **—**.

---

## 4. Summary table and aggregation

| row | capability | F | V | A | S |
|---|---|---|---|---|---|
| G1 | tags / URL state | 0.90 | 0.90 | 0.60 | 0.02 |
| G2 | seed, RNG streams, retry | 0.85 | 0.85 | 0.35 | 0.01 |
| G3 | river course | 0.90 | 0.85 | 0.70 | 0.02 |
| G4 | height field | 0.90 | 0.80 | 0.70 | 0.02 |
| G5 | water body extraction | 0.80 | 0.80 | 0.50 | 0.02 |
| G6 | density map | 0.70 | 0.70 | 0.20 | 0.01 |
| G7 | heart / seeding | 0.75 | 0.75 | 0.30 | 0.01 |
| G8 | road network (trackers) | 0.75 | 0.80 | 0.45 | 0.01 |
| G9 | bridges | 0.85 | 0.90 | 0.50 | 0.01 |
| G10 | square + centrepieces | 0.85 | 0.85 | 0.60 | 0.01 |
| G11 | wharf / piers | 0.80 | 0.85 | 0.40 | 0.01 |
| G12 | buildings + population | 0.80 | 0.85 | 0.55 | 0.01 |
| G13 | fields | 0.85 | 0.85 | 0.60 | 0.01 |
| G14 | orchards | 0.90 | 0.90 | 0.75 | 0.01 |
| G15 | forest | 0.80 | 0.85 | 0.55 | 0.01 |
| G16 | palisade + gates | 0.80 | 0.85 | 0.50 | 0.01 |
| G17 | naming | 0.90 | 0.90 | 0.75 | 0.00 |
| G18 | legend / POIs | 0.90 | 0.90 | 0.70 | 0.00 |
| G19 | population / class | 0.90 | 0.90 | 0.30 | 0.01 |
| G20 | descriptive tags | 0.90 | 0.90 | 0.60 | 0.05 |
| R1 | palette / style system | 0.95 | 0.90 | 0.85 | — |
| R2 | canvas / layer order | 0.95 | 0.95 | 0.85 | — |
| R3 | relief marks | 0.85 | 0.80 | 0.60 | — |
| R4 | hillshade | 0.90 | 0.85 | 0.75 | — |
| R5 | spotlight | 0.90 | 0.85 | 0.70 | — |
| R6 | water rendering | 0.95 | 0.95 | 0.90 | — |
| R7 | roads rendering | 0.90 | 0.90 | 0.70 | — |
| R8 | buildings rendering | 0.90 | 0.85 | 0.70 | — |
| R9 | trees rendering | 0.85 | 0.80 | 0.60 | — |
| R10 | shadows | 0.90 | 0.85 | 0.70 | — |
| R11 | fields rendering | 0.95 | 0.90 | 0.80 | — |
| R12 | selective outlining / colour | 0.95 | 0.95 | 0.85 | — |
| R13 | palisade rendering | 0.90 | 0.90 | 0.70 | — |
| R14 | lights | 0.80 | 0.75 | 0.50 | — |
| R15 | nameplate / labels | 0.95 | 0.90 | 0.75 | — |
| R16 | grid overlay | 0.95 | 0.90 | 0.70 | — |
| R17 | house numbering | 0.90 | 0.90 | 0.70 | — |
| E1 | PNG / SVG export | 0.90 | 0.90 | 0.70 | — |
| E2 | JSON export | 0.80 | 0.80 | 0.40 | — |
| E3 | permalinks | 0.95 | 0.95 | 0.80 | 0.02 |
| E4 | editing / toggles / size | 0.95 | 0.90 | 0.80 | — |
| E5 | integrations | 0.90 | 0.90 | 0.80 | — |
| E6 | performance | 0.90 | 0.90 | 0.80 | — |
| D1 | scale | 0.95 | 0.90 | 0.90 | — |

**Aggregation (judgment-weighted, not a plain mean).** The model stages G3–G16 average F 0.82 / A 0.52; the
renderer averages F 0.91 / V 0.88 / A 0.74. Weighting the four load-bearing black boxes (G5, G6, G8, G12) at
double weight because they decide whether output *statistics* match:

* **functional 0.80** — nothing in VG is infeasible; the residual is the tuning cost of the black boxes and the
  never-recorded palette modes.
* **visual 0.85** — the default theme is pinned to the pixel; the other five themes, three roof types, three tree
  shapes and two relief modes are stated and screenshotted but not draw-recorded, and the density-driven silhouette
  is what a viewer reads first.
* **algorithm identity 0.55** — VG's *architecture* would be reproduced faithfully (that alone is ≈ 0.85); its
  *rules and constants* inside `createDensity`, `Tracker.advance`, `createDeflection`, `SquareBuilder.place`,
  `PoissonPattern.warp` and `Palisade.getPopulated` would be re-invented (≈ 0.35). The weighted result sits in
  between; it is honest to call it "same skeleton, our muscles".
* **seed exact 0.01** — see G2. Even a perfect port of every visible rule would still miss the engine, the draw
  order across six reseed points, the inlined seed path in `River.new`, and the fact that the live build re-rolls
  its own geometry from one release to the next.

---

## 5. Effort estimate (expert team, VG-class parity with statistically similar output)

| block | person-weeks | note |
|---|---|---|
| terrain + course + water extraction (G3–G5) | 2.5 | the extraction loop is specified to the trip count; `createDeflection` semantics must be designed |
| density map + heart (G6–G7) | 1.0 | small code, large calibration loop against screenshots |
| trackers, junctions, highway, bridges (G8–G9) | 3.0 | the steering/branch/termination rules dominate; measure T-junction share, curvature and loop frequency on the captures to tune |
| square, wharf/piers, palisade (G10, G11, G16) | 1.5 | |
| buildings + population + specials (G12, G19) | 1.5 | |
| fields + orchards (G13–G14) | 1.5 | reuses the shared OBB bisector; compactness/min-area laws to tune |
| forest (G15) | 1.5 | reuses Poisson/Voronoi/DCEL; warp and clearance to tune |
| naming with original content (G17–G18, G20) | 1.0 | Tracery-class engine + original grammar/word lists/corpus |
| renderer (R1–R17) | 4.0 | palette schema, layer stack, iso-walker, hillshade, spotlight, water bands, roads, buildings, trees, shadows, outlining, labels |
| export / URL state / toggles / integrations (E1–E5) | 1.5 | |
| tuning and validation against the 24 captures (E6, statistics) | 2.0 | |
| **total** | **≈ 18** (range 14–24) | ≈ 10–12 if the base already supplies noise, polygon toolkit, Poisson/Voronoi/DCEL, palette renderer and URL state |

Owner ruling recalled: VG is a **separate, later product**; the base must not preclude it and must not pay for it.
The estimate above is for that later product, not for the base.

---

## 6. The ten riskiest unknowns, ranked

1. **`Region.createDensity`'s form** (G6). One call, no children, ~1 ms — and it fixes the heart, the packing, the
   field sizes, the palisade extent and the spotlight. Every "does it look like a VG village" statistic hangs on it.
2. **The tracker steering law** (G8): `flexibility`'s curve, the slope term (read inline from the gradient array),
   the branch probability's dependence on density, termination, near-miss junction resolution (T vs right angle),
   `shortcut`. This is the road morphology.
3. **`Water.createDeflection`'s window semantics** (G5): a ≈ 31 × 31 pass per land cell, 14 M steps, the whole
   water cost — but what it computes (extremum filter, distance pass, relaxation) is unrecovered, and it shapes
   every bank.
4. **Where the seed enters, and the six streams** (G2): `River.new` is seed-dependent with no `Random` call; six
   `Random.reset` points per village of unknown identity. Bounds seed-exactness at ≈ 0 and complicates
   per-subsystem reroll parity.
5. **Square sizing, distortion and the round/rectangular choice; the heart ↔ wharf coupling** (G7, G10).
6. **Palisade point set and `getPopulated`'s selection** (G16): building corners vs a density-contour polyline; the
   threshold that makes dense villages get *larger* fences.
7. **Forest constants** (G15): Poisson radius and `warp` semantics, the density-noise threshold and warp amplitude,
   clearance radii, `Forest.H`, and what `Bloater` inflates (its counts are on the misattribution list).
8. **Building-placement constants and special-building rules** (G12): setback, spacing and size distributions,
   type assignment, tower/dome/slate selection, the household model and the class thresholds.
9. **Build drift** (all rows): the reference changed seed-for-seed geometry between 19251041 and 19365073 within a
   week (course generator, tree candidate routine, `spawnAt` on every map, `createHill`). Any parity target must be
   stamped with a build, and 1.6.3/1.6.6 have no post at all (vnd §0.4).
10. **Never-recorded render modes and composites** (R3, R8, R9, R14, R4/R10): Hachures/Contours marks, Hip/Flat/Ruin
    roofs, Conifer/Palm crowns, night lights, the shading and shadow composite modes, where `ground[0]` is painted and
    where the beach strip comes from (vs §7 items 4–7).

---

## 7. Cheapest experiments, ranked by expected confidence gain

1. **Block-level coverage (`--detailed`, cache disabled, as in `10-28-58`) on the live build for the four black boxes:**
   `Region.createDensity`, `Tracker.advance/flexibility` + `Network.findRoadAhead/avoidWater`, `Palisade.getPopulated/
   getBuildings`, `SquareBuilder.place`, `PoissonPattern.warp`, `Forest.roll` — offsets and counts only, over the four
   base tag sets plus `palisade` and `no square`. Gain: bounds `createDensity`'s loop structure (128² pass vs per-
   building kernels), the branch/turn ratios inside `advance`, whether `getPopulated` iterates buildings or cells.
   Raises G6/G8/G16 identity from ≈ 0.2–0.5 to ≈ 0.5–0.7. Cost: one recording session.
2. **Debugger-window value probes** (the `river-windows.mjs` method with its probe argument): read the knot points
   and `PathTracker.length` at each pause, and the `Random` class state at `River.new` entry/exit. Closes the seed-entry
   question (G2/G3) and the knot offset law. Cost: hours.
3. **Same-seed tag sweeps via URL** (`dense`/`sparse`/`district`/`farmland`/`organic`/`grove`, and `&trees=`
   variation): count buildings, measure palisade area, square radius, field area and tree count on the PNGs. Turns the
   density map's amplitude semantics and the stream separation into measured curves (G6, G15, G2).
4. **Screenshot statistics on the existing 24 maps**: px per course segment (resample step), channel width vs local
   curvature, bridge sites vs curvature, T- vs X-junction share, road curvature distribution, building setback and
   spacing, field compactness. No new recording needed; gives the tuning targets for G3, G8, G12, G13.
5. **One draw-record capture on the live build with non-default palettes** (`sand` for `shallowBands` 10 and Hachures,
   `bw`/`cold` for Contours and Conifer, `night` for Hip roofs and lights, Flat/Palm via style edits): closes every
   never-recorded render mode in one session (R3, R8, R9, R14) and re-stamps the band law on 19365073.
6. **Coverage on the still-unexercised tags** (`crossroads`, `estuary`, `coast` with palisade, `farmland`,
   `uncultivated`, `organic`) to see which `Tracker`/`Network`/`Farmland` branches they light up — cheap, and it maps
   the option surface to code paths.

---

## 8. Two caveats a designer must carry from this file

* **Clean-room content.** VG's grammar, name lists, Markov corpus and palette JSON values are creative content; they
  document behaviour for us and are not reused. Every row above that scores naming or palettes assumes original
  content of our own authoring.
* **Statistics over screenshots, not seeds.** Because seed-exactness is ≈ 0 and the reference moves between builds,
  parity for VG-class output must be defined as agreement on measurable distributions (building counts per tag set,
  pop/building, road-pattern statistics, band ratios, field compactness, tree candidate → drawn ratio) taken from
  build-stamped captures — never as "same seed → same picture".
