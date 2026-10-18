# CONFIDENCE — how confident are we of reproducing and deriving the five reference generators

Lane `CONFIDENCE` (report seat, Fable 5.1), 2026-09-25; Dwellings appended by lane `confidence/dwellings-rule`
(judge seat, Fable 5.1), 2026-09-26. Owner question: *"how confident are you of reproducing
their code and deriving it"* for watabou's Medieval Fantasy City Generator (MFCG), Village Generator (VG) and
Neighbourhood (NG), Thomas Allerton's Fantasy Town Generator (FTG) and — since 2026-09-26 — watabou's Dwellings
(House Plan Generator, build 17195045, §9). This file is the judge's synthesis of the
five assessments and the ten adversarial challenges: every challenged cell is ruled on, the aggregates are given
as **ranges**, and the drivers, the capability tables, the "cannot be known from outside" list, the experiments and
the evidence-class statement follow. Every confidence number in this file is a judgment (**PLAUSIBLE**); the facts a
ruling rests on are labelled **CONFIRMED** only where a lane executed them on disk or where I re-executed or re-read
them in this seat (§0.2).

**Scale.** Each number is the probability in [0, 1] that an expert team, clean-room from this evidence base only,
achieves the goal: `functional` (F) = same feature, same option surface, statistically similar structure; `visual`
(V) = a viewer places the output in the same quality/style class; `algorithm identity` (A) = our derivation matches
*their* algorithm, not merely its output ("deriving their code"); `seed-exact` (S) = same seed → same map. Effort is
expert person-weeks for parity of that reference alone (not the fused base — that is the architecture lane's).

## 0. Reading record, method and rulings that apply to every reference

### 0.1 Read in full (every line)

| file | lines | role |
|---|---|---|
| `docs/confidence/mfcg.md` | 749 | assessment, 40 rows |
| `docs/confidence/mfcg-challenge-over.md` | 428 | over-confidence lens (19 numbers on 14 rows down + 4 S cells + aggregates) |
| `docs/confidence/mfcg-challenge-under.md` | 273 | under-confidence lens (43 metrics on 25 rows up + aggregates) |
| `docs/confidence/vg.md` | 499 | assessment, 44 rows |
| `docs/confidence/vg-challenge-over.md` | 391 | over lens (17 rows down + aggregates) |
| `docs/confidence/vg-challenge-under.md` | 371 | under lens (27 metrics up + one on-disk measurement, block trees) |
| `docs/confidence/ng.md` | 773 | assessment, 32 rows |
| `docs/confidence/ng-challenge-over.md` | 453 | over lens (44 adjustments) |
| `docs/confidence/ng-challenge-under.md` | 442 | under lens (7 metrics up + the forward-prediction test) |
| `docs/confidence/ftg.md` | 336 | assessment, 46 rows |
| `docs/confidence/ftg-challenge-over.md` | 112 | over lens (18 rows + overall / effort; both subdivision posts read in full at source) |
| `docs/confidence/ftg-challenge-under.md` | 129 | under lens (31 metrics on 20 rows + two executed payload probes) |
| `docs/confidence/dwellings.md` (2026-09-26) | 320 | assessment, 39 rows — read in full by the judge seat of lane `confidence/dwellings-rule` (§9) |
| `docs/confidence/dwellings-challenge-over.md` (2026-09-26) | 151 | over lens (34 cells on 22 rows down + the A4 orbit finding handed to the judge) |
| `docs/confidence/dwellings-challenge-under.md` (2026-09-26) | 136 | under lens (21 cells on 14 rows up + the orbit / clock-reseed tests and nine tests on the twelve exports) |
| `research/findings/_critic-dwellings.md` (2026-09-26) | 310 | the critic's 17 binding rulings and 25 re-derivations, read in full by the judge seat |
| `profiler/README.md` | 114 | for §6 (what the harness can record) |
| `docs/CONFIDENCE.md` (the first seat's partial, 330 lines) | whole | audited by the continuation seat before it was kept (§0.4) |

Both seats read every input in full; the continuation seat re-read all twelve, completed the FTG rows of this table and
wrote §1, §2, §3.3–§4.4 and §5–§8.

Not read in either report seat: the findings files themselves except the sections named in §0.2 (the assessments and the
eight challenges cite them, and both critic seats spot-checked the quotations at source: 24/24, 51/51, 66/66); no
raw `post.md` beyond what the lanes quote; **no captured JavaScript bundle** (`captures/**/network/bodies/*.js`),
by ruling; no PNG re-measured; no new recording.

### 0.2 Checks executed in this seat (CONFIRMED)

Where the two lenses pulled one cell in opposite directions I went to the cited evidence rather than splitting the
difference:

1. **MFCG B5 (gate loop "unchanged")** — `research/findings/profile-mfcg.md` EG-7 row 9 read at source: *"Only
   partly. The gate is moved to the exact chord midpoint (not the f = 1 smoothing); castles get exactly one gate;
   roads = gates; explicit counts exist; the creator states a 0.5.1 rework … 'Unchanged' is not supported."* Both
   lanes quote it correctly; they disagree on what it implies (structure retained vs parameters replaced).
2. **MFCG B7 (2N + 1)** — `reference/TownGeneratorOS/Source/com/watabou/towngenerator/building/Model.hx` read by
   `grep -n` for verification only (nothing copied): line 168 concatenates the castle's gates into `gates`, line 221
   builds a street `for (gate in gates)`, line 231 builds a road only `if (border.gates.contains(gate))`. With N city
   gates and one castle gate that is N + 1 streets + N roads = **2N + 1**, the count EG2-1 measures live. The
   assessor's `[INFERRED split]` is the ancestor's arithmetic (the under-lane is right).
3. **MFCG B15 / C1 (`PolyBounds.lir`)** — `captures/mfcg/2026-09-25T10-38-58/steps/049-27-display-complex.calls.json`
   read by script: `PolyBounds.lir` 3 738, `lira` 708, `Building.create` 4 737, `Block.createRects` 510,
   `createBuildings` 510, `isRectangle` 4 738, `getPlanFront` 3 835 — the under-lane's counts exactly.
4. **MFCG B13 (ribbons)** — `profile-mfcg.md` EG2-4 line 1658: *"Extramural building ribbons appear only along
   gate roads: N1 one, N4 three, N9 around most gates. N0 has none"* (the URL flags of those runs are checked in
   §3.1, B13).
5. **NG B3 (forward-prediction test)** — `captures/neighbourhood/bentcut_forward.py` re-run (continuation seat,
   3.3 s): plain-template cuts within 0.1 chord 43/54 = 80 % (area 34/40, street 7/9, square 2/5), hole-aware ring
   cuts 43/97 = 44 %, all 86/151, misses 65 split 20/20/20 — every cell identical to ng-challenge-under §4.1 (§3.3).
6. **VG G2 (31-bit seed space)** — every `Region.hx:81` seed line in every VG `console.jsonl` re-listed (continuation
   seat): 26 distinct seeds, maximum 2 087 232 953 < 2³¹ − 1 = 2 147 483 647; the 18 that are not user-typed or +1
   retries are all 31-bit — the under-lens's count and bound reproduce (§3.2).
7. **Arithmetic checked by hand (both seats):** the `min(1, 40/n)` saturation argument (over-MFCG §2.4: f = 1 at both
   n = 25 and n = 39, so the 2017 formula cannot explain the observed size dependence; f = 0.2 at n = 200); the NG
   roof-noise sd (√(2/36) = 0.2357 vs 0.230 measured); the VG `W·k^1.5` extrapolation (32 / 59 / 127 / 360 px at
   N = 2 / 3 / 5 / 10); 2⁻¹⁸ ≈ 3.8 × 10⁻⁶ for the VG seed-range argument.
8. **FTG C11 (wall tracing) and C4** — `research/ftg-capture/challenge-under/{tower_ring_probe,wall_edge_probe}.out.txt`
   re-read (continuation seat): wire type 7 edges 25 / 44, all joining adjacent vertices of one district ring (25/25,
   44/44), type-7 subgraphs with degree histograms {1: 2, 2: 24} / {1: 4, 2: 42} (one and two open chains); towers 17/17
   and 29/29 exact ring vertices and type-7 nodes, 9 and 17 wall vertices without a tower; every vertex of every
   district ring a road-graph node (§3.4).
9. **FTG A4 (no seed model)** — `grep -c -i seed` over `captures/ftg/2026-09-21T05-08-07/steps/steps.jsonl` = 0 (no
   seed control in any create-form text dump); `"seed": null` in both `create-request.json` files (§3.4).

Items #1–#4 were first executed by the first report seat and re-executed by the continuation seat with identical
results before any of its rulings were kept.

**Dwellings checks (judge seat, 2026-09-26; the full record is `docs/confidence/dwellings-ruling.md` §0.2):**

10. **Dwellings A4 (the orbit)** — the recorded successors re-derived by independent modular exponentiation (M =
    2³¹ − 1, a = 48 271): 12345 · a³⁷⁹ = 1 189 382 180, 1 189 382 180 · a¹⁴⁸² = 1 291 276 000 and · a¹⁴⁸³ = 470 941 825
    (direct load), 12345 · a⁸⁰ = 1 817 660 423 (with a plan), 12345 · a⁴⁸⁵ = 403 462 773 (after Ctrl+Enter),
    550 578 192 · a¹²³¹ / a¹²³² = 190 180 111 / 1 839 030 803 (direct / by Enter) — every successor both lenses cite,
    including the one-draw load / Enter offset.
11. **Ten lens scripts re-executed** from the project root and diffed against their saved outputs: eight byte-identical
    (`exports_setback`, `exports_c2`, `exports_probe`, `exports_probe2`, `seed_clock`, `seed_offorbit`, `stair-shafts`,
    `distinct-footprints`), two identical in every computed line (`final-rooms`, `lehmer-orbit`; the saved files carry
    trailing sanity lines the scripts do not print).
12. **`profiler/analyze.mjs` l. 130** sorts siblings by inclusive time (`.sort((a, b) => b.total - a.total)`) — the
    over lens's A2 argument.
13. **The `RoofStack` identity re-counted** on the twelve export-tied `coverage/gen-0.calls.json`: `_RoofStack.Layer.new`
    = `Layer.display` = storeys above ground read from the exports' own `floors[].level` (2, 3, 1, 2, 1, 3, 1, 2, 3, 6,
    3, 2) in 12/12; `RoofStack.new` = `update` = 1.
14. **The stale receipt** — `captures/dwellings/_critic/permalink-decode.out.txt` (four of eight first-run entrance
    verdicts wrong) against `permalink-decode.entrances.txt` (the corrected run, six clockwise boundary edges and two
    interior ones): the over lens's §3.2 e is right; the encoding stands.

### 0.3 Rulings that apply to every reference

* **R-A (what moves a cell).** A cell moves only for a reason the lane cites and that I could check (a source
  quotation, an on-disk count, an arithmetic identity) or that is a definitional correction. Taste does not move a
  cell. Where a lane's reason is right but over-weighted, the ruling is *partial*.
* **R-B (the seed-exact column is unconditional).** "Same seed → same map" is the column's definition in all five
  assessments. A render, framing or export pass that is "deterministic given the model" is a different quantity,
  useful to an architect but misleading in this column; every such cell is ruled down to the value of the geometry
  it consumes (≈ 0.02–0.05) and the conditional fact is kept as an annotation ("det. given model"). The one
  legitimate stream-level exception is the RNG row of MFCG, NG and (since 2026-09-26) Dwellings, where the recurrence
  and the successor rule are CONFIRMED: there S is reported as *stream-only* and annotated (for Dwellings, clock-free
  histories only — ≈ 1 generation in 5 reseeds its successor from the clock, §9). The under-MFCG lane's E3 request
  (score E2 and E3 on the same basis) is granted in the downward direction.
* **R-C (published algorithms).** When a capability's method is a uniquely defined published algorithm and the
  recorded call structure is that algorithm's fingerprint (Delaunator, straight skeleton, Visvalingam–Whyatt,
  Bridson/Mitchell Poisson-disc with k = 50, earcut + barycentric interpolation, Chaikin, Tracery, marching-squares
  extraction, fBm, Lambert hillshade), A moves up — but only to the degree the reference's *own* part (constants,
  seeding, selection rules) is also pinned. "Library-grade" closes the method question, not the constants question.
* **R-D (stated ≠ inferred, and named ≠ described).** A mechanism the creator stated in his own words with a
  verified 2017 implementation under a live-matching routine name is `[STATED]`, whatever the assessment's tag
  said (the under lenses found several); a feature the creator only named, however often, stays `[NAMED-ONLY]`
  (the over lenses found several). Both corrections are applied symmetrically.
* **R-E (robustness history is a cost, not a feasibility bar).** The creators' multi-year stabilisation of the
  bent bisector, rivers, fields and trees moves *effort* and the heavy-stage F/V cells modestly; it does not move
  a capability whose output statistics are measured, because a clean-room team may reach the statistics by a more
  robust construction than the reference's (that is also the owner's "improve, not just recreate" direction).
* **R-F (ranges).** Each aggregate range is the ruled point ± the spread the surviving arguments justify after the
  rulings — not the min/max of the three files. Where the two lenses' surviving arguments are both partly right,
  the range is wide and says so.
* **R-G (build stamps and version drift).** VG numbers carry their build (19251041 vs 19365073); NG's are for build
  11441280 of a generator its author has superseded; FTG's are for the live server of 2026-09; Dwellings' are for
  itch build 17195045 (2026-06-24), whose creator never promised seed stability across versions. Drift between builds
  is a reason for a wide S range, never a contradiction.
* **R-H (how an aggregate is formed).** An aggregate is not the plain mean of a reference's cells: cells are
  weighted by the share of the visible map the capability produces (a lot-subdivision or road-growth stage carries
  most of a map's buildings and area; a compass or a grid overlay does not) and by whether output *statistics*
  depend on it. To keep that judgment checkable, §1 reports the unweighted mean of the ruled cells next to every
  aggregate; the gap between the two is the weight the heavy stages carry.

### 0.4 Continuation audit (this seat, after the interrupt)

The first report seat was cut off at 11:12 inside §4.2; no LANDED line existed. Before continuing I re-read the MFCG
and VG assessments and their four challenge files in full and re-executed the four cheap checks of §0.2 (#1–#4:
`profile-mfcg.md` line 1406 and 1658, `Model.hx` lines 168/221/231, the step-049 `calls.json` counts — all
reproduce exactly). Audit result: every one of the 62 challenged MFCG cells (over-lens 19 + 4 S cells and the
relabel list; under-lens 43; the overlaps B5 A, B7 A, B12 A, B13 F, E3 S, F1 F/V) and every one of the 44
challenged VG cells (over 17, under 27) carries a ruling in §3.1/§3.2, and the §4.1/§4.2 tables match the rulings
cell for cell. No ruling was changed. One VG reason (G13 A: "the same plain `Bisector` family … also produces NG's
bent streets") is re-examined against the NG evidence in §3.3 and annotated there. The MFCG and VG aggregates are
re-stated in §1 under R-H with their unweighted means.

> **STATUS: COMPLETE** (first report seat cut off at 11:12 inside §4.2 by an owner-side interrupt; continuation seat
> finished it in the resumed run, 2026-09-25). Layout: §0 method, checks and rulings that apply everywhere · §1 the
> one-page verdict · §2 what drives each number · §3 / §4 per-reference rulings and capability tables, interleaved
> (3.1 / 4.1 MFCG, 3.2 / 4.2 VG, 3.3 / 4.3 NG, 3.4 / 4.4 FTG) · §5 what cannot be known from outside · §6 the
> experiments · §7 evidence classes used and not used · §8 CONFIRMED vs PLAUSIBLE · **§9 Dwellings** (appended
> 2026-09-26 by the judge seat of lane `confidence/dwellings-rule`: the rulings on every challenged cell, the
> capability table, the headline ranges with drivers, what cannot be known, the experiments, the evidence classes,
> a plain-language paragraph for the owner; the full record with the executed checks is
> `docs/confidence/dwellings-ruling.md`).

## 1. The verdict (one page)

**The short answer.** *Reproducing* the five generators — same features, same option surface, statistically similar
maps, the same visual class — is likely for all five (functional 0.77–0.83, visual 0.78–0.83). *Deriving their code*
is not: algorithm identity sits at 0.53–0.58 for every reference (Dwellings highest, §9), because in each case the
pipeline skeleton, the data structures, the published algorithms and the rendering laws are theirs beyond doubt, while
the heuristics that decide the shapes (the bent cut's constants, the district growers, the steering law, the
district-type scoring, the plot-cut edge rule, Dwellings' cut rule and validator scores) are unpublished and would be
our own inventions calibrated to their measured outputs. Same-seed reproduction is effectively nil (0.00–0.02): only
the RNG streams of MFCG, NG and Dwellings are exact, nothing downstream of them is, and FTG has no seed at all. Each
figure is a range under the rulings of §3 (Dwellings: §9.2); the bracketed number is the unweighted mean of the ruled
cells (R-H), so the reader can see how much weight the heavy stages carry.

| reference | recorded build / sample | functional | visual | algorithm identity | seed-exact | effort, that reference alone (expert person-weeks) |
|---|---|---|---|---|---|---|
| **MFCG** | itch 0.11.x, 45 V8 censuses, complete draw records, 2017 GPL ancestor | **0.78** (0.72–0.83) [0.83] | **0.80** (0.75–0.85) [0.83] | **0.53** (0.45–0.60) [0.59] | **0.02** (0.01–0.05); RNG stream alone 0.85 | **46** (36–62) |
| **VG** | builds 19251041 and 19365073, 24 coverage runs, block trees | **0.80** (0.75–0.84) [model rows 0.84] | **0.83** (0.78–0.87) [0.85] | **0.55** (0.48–0.60) [0.54 model, 0.63 all] | **0.01** (0.00–0.02) | **20** (15–28); ≈ 12–14 on the base's shared substrate |
| **NG** | build 11441280 (superseded by Urban Places), 10 censuses, vertex records | **0.83** (0.78–0.87) [0.845] | **0.82** (0.77–0.86) [0.84] | **0.55** (0.48–0.62) [0.565] | **0.02** (0.01–0.03); RNG stream alone 0.80 | **21** (16–27) |
| **FTG** | live server 2026-09, two decoded payloads, request + presets, guide + 30 posts | **0.77** (0.72–0.82) [0.82; layout rows 0.78] | **0.78** (0.73–0.83) [0.81] | **0.55** (0.48–0.60) [0.60; layout rows 0.53] | **0.00** (0.00–0.01) — no target exists | **125** (105–145) full product; **52** (44–62) map-generation subset |
| **Dwellings** (§9, 2026-09-26) | itch build 17195045 (2026-06-24), 96 coverage houses, 92 walked, 12 owner-approved JSON + SVG exports, 15 devlogs + 19 Patreon posts | **0.80** (0.75–0.84) [0.83; heavy rows 0.80] | **0.82** (0.77–0.86) [0.83] | **0.58** (0.50–0.64) [0.63; heavy rows 0.54] | **0.02** (0.01–0.03); RNG stream alone 0.70 (clock-free histories) | **23** (19–29) — Dwellings alone; the owner's reverse-order rung is the architecture lane's figure |

Read the columns this way. **Functional** ≈ 0.8 means: an expert clean-room team building from this evidence base
would reach behaviour-equivalence for roughly four capabilities in five, and the fifth would be a feature that works
but whose statistics need a calibration loop against measurements we partly do not yet have (MFCG's lots and alleys,
VG's density silhouette, NG's block sizes at other sizes, FTG's district typing, Dwellings' partition texture and
role assignment). **Visual** ≈ 0.8: the default styles
are pinned to the pixel — colours, widths, casing laws, fonts, halos, layer order, roof and shadow constructions — and
the residual is the never-rendered modes (other palettes, other road surfaces, other wall types, NG's outline
generator, FTG's other presets, Dwellings' other schemes and wall styles and its elevation). **Algorithm identity**
≈ 0.55: "same skeleton and the same measured statistics, our
muscles" — the assessor's phrase for VG holds for all five. **Seed-exact** ≈ 0: not a shortfall to fix but a fact
about the evidence class — without source, no draw order; and the clean-room ruling forbids the source. The effort
figures are per reference in isolation; the fused base is the architecture lane's estimate.

**What the numbers are not.** They are probabilities of *parity with the reference as recorded*, not of product
quality. Several cells score parity with a weakness (FTG's absent seed model, MFCG's lots-drawn-as-buildings, NG's
missing metric), which the owner's rulings say the base must exceed; those cells are annotated in §4 and do not raise
the base's difficulty — they lower it, because the base is not bound to reproduce them.

## 2. What drives each number

**MFCG.** Up: the live build prints its own stage names and source lines; 34/34 seed transitions on the Lehmer 48271
orbit; 1:1 count identities for the skeleton-roof, tree-tile, label, tint and casing pipelines; the 2017 ancestor pins
the RNG and the shape of five stages; the largest-inscribed-rectangle house method is stated and runs live
(`PolyBounds.lir` 3 738× in Complex mode). Down: the four heavy stages that produce most of every map — lots, alleys,
rivers, sprawl — are the creator's unpublished heuristics ("just an idea, not an algorithm"), still restarting 3 of 16
cities in 2026, with the geometry export that would calibrate them not yet obtained. The single largest lever on F/V
is that export (§6 #1); the largest lever on A is none — C13 stays open without source.

**VG.** Up: the best "what runs when" instrumentation of the four (stage order, per-routine loop counts, block trees
that bound the density map, the trackers, the sampler and the placer; the water cell set fixed before the deflection
pass); the sampler, triangulator and naming engine are published algorithms; the placer is stated by the creator.
Down: the four black boxes' *formulas* (the density kernel, the steering arithmetic, the deflection consumer, the seed
path into `River.new`); a reference that re-rolled seed-3131 geometry between two builds a week apart; five of six
themes and most render modes never draw-recorded; the creator's shipped defects are all at feature seams.

**NG.** Up: byte-identical determinism per seed; the MINSTD engine and successor rule CONFIRMED by the orbit test; the
bent cut's output distributions measured on 519 streets and, now, a forward model of the plain cut that reproduces
80 % of drawn ends given placement; roofs, shadows and trees characterised to a tenth of an op per wing. Down: the
termination law `isSmallEnough` (which sets every count) is unknown and every vertex capture is one size; the hole-aware
bisector's repair loop is unrecorded and its author calls it glitchy; the outline generator's body is unread; six
road/style modes have no render; the build is superseded.

**FTG.** Up: a complete input schema (two captured requests, the preset catalogue, every `<select>` list), a guide
that narrates mechanisms, a payload that pins output laws to the centimetre (15° cap, 90° junctions, half-step normal
streets, 10 × 10 m buildings, entrances on the frontage, walls on district-ring edges), and the author's own MIT code
for the integrations. Down: no call census, no trace, no ancestor, no seed; every threshold (separation, snap, split
line, plot depth, shrink distance, area budget) and the district-type scoring are unstated; one configuration
rendered; the plot-cut rule was rewritten three times and its current edge choice is not narrated. The one-per-day
capture budget is the constraint on every FTG experiment.

**Dwellings** (appended 2026-09-26; §9). Up: the completest structural evidence of the five — a full call census with
13 count identities and the build's own stage trace, the generator's own JSON and SVG exports of twelve houses plus
vertex records of 92 more (the output pinned cell for cell), the Lehmer 48271 stream CONFIRMED live by the orbit test
(56 of 61 successors at k < 10⁵; the load / Enter offset of exactly one draw), and four output laws measured from the
exports by the under lens — one-room setbacks (13/13), stair cells on the outer wall (38/38) and in outer corners
(30/38), doors at the ends of shared runs (17/17) with a long-wall tree preference, a per-role fixed / ratio window
demand matching the registry's 6 / 5 split. Down: the four heavy heuristics — the cut rule, the corridor merge's
predicate (a principal shaping stage: 39 → 73 % narrow rooms under `hallways`), the door price and loop rule, the
validators' score — are names with counts; the analyzer's time-sorted trees had been read as an execution order and
the `hallways` figures as rooms; every measured render is one style configuration; the elevation is a second
generator known from parameter names and images; the sender half of the hand-off — the row the owner's rung is
defined by — has zero observations; ≈ 1 generation in 5 reseeds its successor from the clock. The largest lever on
F is the one-click hand-off measurement (§9.6 #12); on A, none — the cut rule stays closed without source.

**Across all five.** The three rulings that moved the most cells are R-B (conditional "seed-exact given the model"
numbers ruled down to the geometry they consume), R-C (published algorithms whose recorded call structure is their
fingerprint — Delaunator, straight skeleton, Bridson k = 50, Chaikin, Visvalingam, Tracery, protobuf — raised, but
only to the degree the reference's own constants are pinned) and R-E (the creators' multi-year stabilisation is priced
as effort, not as a bar to statistical parity by a more robust construction — which is also the owner's "improve, not
just recreate" direction).

## 3. Rulings on every challenged cell, reference by reference

Format: `assessor` = the assessment's cell; `over →` / `under →` = what each lens moved it to ("held" = that lens
tried and could not refute it; "—" = not touched); **ruling** = accept / partial / reject / stands, with the value
carried into §4 and the reason. Cells no lens touched keep the assessor's value and are not listed.

### 3.1 MFCG (assessment F 0.80 / V 0.85 / A 0.50 / S 0.02 / 42 pw; over-lens 0.75 / 0.78 / 0.50 / 0.02 / 55 pw; under-lens 0.83 / 0.87 / 0.55 / 0.02 / 38 pw)

| cell | assessor | over → | under → | ruling | reason |
|---|---|---|---|---|---|
| A2 A (RNG stream) | 0.90 | 0.80 | held | **partial 0.85** | recurrence (34/34 orbit hits) and continuation-on-retry are pinned; but the labelled `Random.float` census (62–69 calls) against a 585-step stream advance (EG-3) means the draw sites are mostly invisible (inlined), so *where* draws happen is inferred — the over-lens's unexplained gap is real, its 0.80 overweights the trivial helper set |
| A1 S (blueprint) | 0.60 | 0.05 | held | **accept 0.05** | R-B: byte-identical G0c/G0d reloads are the reference reproducing itself; the URL grammar is trivially ours, the map it names is not (annotate: det. given model) |
| E2 S (stroke discipline) | 0.70 | 0.03 | held | **accept 0.03** | R-B; and even conditionally the reference's Gable re-renders are not bit-stable (ST-3) and crowns are re-picked per render (ST-2) |
| E3 S (alleys layer) | 0.50 | 0.02 | 0.70 | **accept over 0.02** | R-B; the under-lens asked only that E2 and E3 be scored on one basis — granted downward |
| G1 S (export) | 0.50 | 0.05 | held | **accept 0.05** | never executed; our schema is ours by ruling; same-seed export presupposes a same-seed map |
| A3 / D3 / E4 / F3 / H1 / E1 / F2 S | 0.50 / 0.30 / 0.30 / 0.30 / 0.30 / 0.10 / 0.10 | relabel recommended | — | **0.05 each** | same rule; the over-lens listed them without renumbering; consistency across the column matters to an architect deciding what is "seed-reproducible" (answer: only the stream) |
| B1 V (patch mesh) | 0.85 | 0.75 | held | **partial 0.80** | "consistent with" a radial gradient is not evidence of one (over-lens right); but after the 0.10.0 merge "makes cells almost invisible" (87882877) the mesh reaches the eye only through wall/road/district shapes, so this row carries less visual weight than either lens assumes |
| B1 A | 0.70 | held | 0.80 | **partial 0.75** | Delaunator (ported verbatim, `[STATED]` 112574) and the DCEL are library identities (R-C); the seeding — the creator's own part, and the part that fixes the mesh statistics — changed (`+4`) and is unverified live |
| B2 F | 0.85 | held | 0.90 | **accept 0.90** | operation verified at `Model.hx:321` (`< 8`), live `collapseEdge` ≈ 0.5 per cell; one threshold remains and the ratio calibrates it |
| B2 A | 0.60 | held | 0.70 | **partial 0.65** | half-edge collapse is standard and the 2017 rule is verified line by line; whether the live threshold is absolute or scaled changes behaviour across sizes and is unknown |
| B3 F (coast) | 0.80 | 0.75 | held | **accept 0.75** | the combination of the 6-octave field with `sea` is `[INFERRED]`; the 0.11.2 bay rework is a name |
| B3 V | 0.80 | 0.70 | held | **partial 0.75** | the bay distribution is unmeasured and the creator calls the system "dated and primitive"; seven coastal screenshots at three sizes still give a visual target |
| B4 F (domains) | 0.70 | held | 0.75 | **accept 0.75** | connected components on a mesh cut at the shoreline is standard; the two downstream effects that matter (wall ends at shore; bank/docks naming) are known |
| B5 V (walls/gates) | 0.90 | 0.80 | held | **partial 0.85** | tower/gate/passage laws are pixel-exact; the wall polygon's smoother is unmeasured and changed twice (0.7.6, 0.10.0), and the `min(1, 40/n)` saturation argument is correct arithmetic (§0.2 #7) — the one observation offered for the 2017 rule is evidence against it |
| B5 A | 0.70 | 0.55 | 0.75 | **partial both 0.65** | EG-7 #9 read at source (§0.2 #1): the loop's *structure* is retained clause by clause (candidates touching > 1 inner cell, sequential pick with neighbour exclusion — live "never adjacent, nested in N" —, gate vertex moved, towers on non-gate vertices) and its *parameters* are replaced (exact N, one `weighted` draw per gate, chord-midpoint move, one castle gate, unknown smoother and auto-count). The under-lens is right that measured deviations are identity knowledge; the over-lens is right that weights, auto-count, smoothing and "Maximum" mode are all open. Range 0.55–0.75 |
| B6 F (citadel) | 0.85 | 0.75 | held | **partial 0.80** | "surprisingly hard … compatible with any parameter combination" (40345972) is a real cross-feature cost; the loop, gate and keep are pinned |
| B6 V | 0.85 | 0.80 | held | **accept 0.80** | keep plan sizing/placement unknown; the creator is "not entirely happy" with the inner-castle look we would match |
| B6 A | 0.55 | held | 0.60 | **accept 0.60** | loop shape (60 traced values), stated operator, 2017 threshold, reserved-vertex single gate (`Castle.hx:17–19`), stated rectangle method for the keep with a verified slicer and a live `lir` |
| B7 V (streets) | 0.85 | held | 0.90 | **accept 0.90** | rendering exact (casing = core + 2t in every record; `cutCorner`/`smoothRoad`/`Chaikin`); 2017 draw idiom verified |
| B7 A | 0.60 | 0.50 | 0.70 | **partial (under) 0.65** | §0.2 #2: the 2017 arithmetic predicts the measured 2N + 1 exactly, which converts the `[INFERRED split]` into a verified structural fingerprint; C10 (FIFO vs priority open set), the cost function, the third `Topology` and the road far-end rule stay open, so not 0.70 |
| B8 F (rivers) | 0.75 | 0.65 | held | **partial 0.70** | two modes, search-and-test, width variability, bridges and mouth are pinned; tributaries/islets, bank coupling, `validateCourse` and a 70 % restart rate we cannot explain are not |
| B9 F (districts) | 0.80 | held | 0.85 | **accept 0.85** | seed set effectively fixed by the type list (one prominent feature per named type), `fromPatch` 12 + `fromVertex` 3 for 15 districts, ≈ 2.5 validations per accepted cell, counts per size measured |
| B10 F (ward → blocks) | 0.80 | 0.70 | held | **partial 0.75** | "just an idea, not an algorithm" (49191011) and five years of stabilisation still restarting 3/16 cities are real (over-lens); the output statistics are measured and a more robust construction may hit them (R-E) |
| B10 V | 0.80 | 0.70 | held | **partial 0.75** | same; the second alley type is unexplained |
| B11 F (block → lots) | 0.80 | 0.70 | held | **partial 0.75** | C13 OPEN on every constant; "weird" lots filtered not repaired; `Failed to make a cut` still logged |
| B11 V | 0.85 | 0.75 | held | **partial 0.80** | the assessment names B11 "the one risk" and then scores it joint-highest — the over-lens's inconsistency point is correct; the texture is nonetheless the best pixel-characterised stage |
| B12 F (outskirts) | 0.80 | held | 0.85 | **accept 0.85** | 2017 `filterOutskirts` verified line by line; live = the same field via earcut + barycentric (7/7 identities), running only with gates ≥ 1 exactly as the 2017 density-1-at-gate rule predicts; ribbon density vs distance is the calibration target |
| B12 A | 0.60 | 0.50 | 0.70 | **stands 0.60** | the gates-dependence fingerprint (under) and the undescribed 0.10.0 street-density knob (over) cancel; range 0.50–0.70 |
| B13 F (sprawl) | 0.75 | 0.60 | 0.80 | **partial (over) 0.65** | §0.2 #4: the ribbons EG2-4 measures belong to the outskirts filter (present without a shanty town), so they do not pin sprawl; what `shantytown=1` adds (the fans MILK TOWN / WEST CITY / TIMBER RING) has a stated *trigger set* ("along the coast, river and roads") and no placement, density or block rule — R-D: named, not described. The under-lens's "ribbon statistics are pinned" is B12's evidence |
| B13 V | 0.80 | 0.70 | held | **partial 0.75** | the look is shown in six images; the rule that produces it in none |
| B14 A (plaza/temple/churches) | 0.50 | held | 0.60 | **partial 0.55** | 2017 Market/Cathedral constants verified and live names kept, cloister plan and gate plazas stated; but the live plaza is "more rectangular" (0.6.0) with "much fewer secondary plazas" (0.9.2) — rules changed after the ancestor |
| B15 F (landmarks/keep) | 0.75 | held | 0.80 | **accept 0.80** | §0.2 #3: the plan method is `[STATED]` (11802: largest inscribed rectangle → cut into blocks → discard some; 8154: castles of rectangles), its 2017 slicer verified, and `PolyBounds.lir` runs 3 738× in Complex mode — R-D applies |
| B15 A | 0.40 | held | 0.55 | **partial 0.50** | as above, but `getPlanSym` (symmetry) and the `lir` placement of the keep remain inferred |
| B17 V (farms) | 0.85 | held | 0.90 | **accept 0.90** | furrow law measured (hairline t, ≈ 9–10 px pitch, per-field angle, butt caps); shapes from a named chain (`Cutter.grid` → `splitField` ≈ 12.6/farm → `round`) |
| B18 F (harbour/piers) | 0.85 | held | 0.90 | **accept 0.90** | pier law exact (`1.2 ± t`), `DocksGrower` waterfront-only, `addHarbour` once, docks naming 1:1 |
| B19 F (trees/forests) | 0.85 | held | 0.90 | **accept 0.90** | `validate = 140 × validateRect` and the 20-crown library CONFIRMED on disk by the under-lens (step 014) |
| B19 A | 0.70 | held | 0.80 | **accept 0.80** | Bridson k = 50 `[SHOWN]`; every routine of both pipelines counted 1:1; the open items are constants (R-C) |
| B20 F (elevation) | 0.50 | held | 0.60 | **partial 0.55** | the "users don't see the difference" argument is fair for V, less for F: a gradient field that biases the bisector must still be built and can visibly distort alleys if over-tuned |
| B20 V | 0.70 | held | 0.80 | **accept 0.80** | same style class is trivially met for a near-invisible effect |
| C1 F (display modes) | 0.85 | held | 0.90 | **accept 0.90** | "must invent the rectangle-composition rule" is refuted by §0.2 #3 |
| C1 V | 0.80 | held | 0.85 | **accept 0.85** | Complex shown at 8× zoom (ST-7) and in the 11802 close-ups |
| C1 A | 0.50 | held | 0.65 | **partial 0.60** | stated method + verified ancestor + live names; the "discard some" rule and composition constants remain |
| C2 F (roofs) | 0.85 | held | 0.90 | **accept 0.90** | straight skeleton is uniquely defined for a simple polygon; `run = new = drawRoof = 9 222`, `intersect/roof = 17.1` CONFIRMED on disk (step 019) |
| C2 V | 0.85 | held | 0.90 | **accept 0.90** | draw law exact; a correct skeleton is cleaner than the creator's "glitches in special cases" |
| C2 A | 0.60 | held | 0.70 | **accept 0.70** | the creator's own algorithm is the naive O(n²) wavefront (`[STATED]` 101173551); the gable variant is a stated modification |
| C3 A (Offset) | 0.50 | held | 0.60 | **accept 0.60** | `Processing = None` removes exactly `Block.indentFronts` (493 → 0 on disk); semantics stated; one constant |
| D1 F (naming) | 0.85 | held | 0.90 | **accept 0.90** | Tracery is published; guard/modifier schema captured verbatim (token census on the asset) |
| D1 A | 0.75 | held | 0.85 | **accept 0.85** | engine identified by the asset; only `pinch` and the UNIQUE/COMPACT predicates open; content is ours by ruling, not an identity question |
| D2 F (labels) | 0.85 | held | 0.90 | **accept 0.90** | chain shown routine by routine with 1:1 identities; every link a published algorithm; "the new algorithm is a widely used one" (102377277) |
| D2 A | 0.70 | held | 0.80 | **partial 0.75** | the ridge-selection score is the creator's own ("which ridge is most suitable is not always obvious") |
| D3 A (furniture) | 0.70 | held | 0.80 | **accept 0.80** | everything visible and measured; the rose grammar is ours anyway |
| E1 F (colour) | 0.90 | held | 0.95 | **accept 0.95** | 13 keys × 6 schemes on disk; three tint methods measured in HSV; weathering = `Color.scale` per roof (11 120 / 11 127) |
| E1 A | 0.75 | held | 0.85 | **accept 0.85** | arithmetic measured; only the hue-sampling distribution open |
| E3 V (alleys layer) | 0.80 | held | 0.90 | **accept 0.90** | one recorded stroke, complete draw record, pixel diff measured |
| E3 A | 0.50 | held | 0.65 | **partial 0.60** | what/where/width/colour/layer all shown; "why sprawl only" is a B10 question |
| F1 F (warp tools) | 0.70 | 0.60 | 0.80 | **stands 0.70** | kernels are textbook brushes and two run in every recording as the citadel repair (under); the re-derivation cascade through the bisector's failure class is the unobserved work (over) — they cancel |
| F1 V | 0.75 | held | 0.80 | **stands 0.75** | a warped map's look depends on falloff and glitch rate, neither observed |
| F1 A | 0.35 | held | 0.45 | **partial 0.40** | kernels standard; falloff, step sizes and cascade order open |
| G1 F (export) | 0.80 | held | 0.85 | **accept 0.85** | SVG parity is a renderer property; JSON shape shown; `export=` stated |
| H2 F (performance) | 0.85 | held | 0.90 | **accept 0.90** | budget measured; nothing to invent |
| **overall F** | 0.80 | 0.75 | 0.83 | **0.78 (0.72–0.83)** | the heavy stages (B8, B10, B11, B13 — most of the buildings and map area) each lose 0.05–0.10; fifteen lighter rows gain 0.05; unweighted mean of the ruled cells 0.83 (the continuation seat set the range's top to it under R-H; the point and the lower bound are the first seat's) |
| **overall V** | 0.85 | 0.78 | 0.87 | **0.80 (0.75–0.85)** | six rows with unmeasured shape rules (B1, B3, B5, B10, B11, B13) lose 0.05 — the over-lens is right that "the one risk" was six; pinned rows (B7, B17, C1, C2, E3) gain |
| **overall A** | 0.50 | 0.50 | 0.55 | **0.53 (0.45–0.60)** | eleven library-grade or stated-and-verified rows rise (R-C, R-D); the five heavy heuristics (bent cut, growers, canal validator, sprawl placer, gate weights) stay unpublished |
| **overall S** | 0.02 | 0.02 | 0.02 | **0.02 (0.01–0.05)** | stream pinned; every downstream draw order is not; names differ by ruling |
| **effort** | 42 (32–55) | 55 (42–72) | 38 (30–50) | **46 (36–62)** | +8 on the bisection/district/outskirts/sprawl stack and +2 on rivers for the creator's 2021–2026 stabilisation record (over-lens, R-E); −4 across mesh/skeleton/Poisson/warp for library-grade methods (under-lens); roofs/trees net +1 for the gable variant on 46 000 footprints |

#### 4.1 MFCG capability table after rulings (values are the ruled cells; unlisted cells are the assessor's; S per R-B)

| id | capability | F | V | A | S |
|---|---|---|---|---|---|
| A1 | Parameter surface / Blueprint / URL | 0.95 | 0.90 | 0.85 | 0.05 (det. given model) |
| A2 | RNG stream, seed chain, save/restore | 0.95 | — | 0.85 | 0.85 (stream only) |
| A3 | Pipeline structure and failure policy | 0.90 | — | 0.85 | 0.05 |
| B1 | Patch mesh | 0.90 | 0.80 | 0.75 | 0.15 |
| B2 | Junction optimisation | 0.90 | 0.80 | 0.65 | 0.10 |
| B3 | Coast / water field / `sea` | 0.75 | 0.75 | 0.50 | 0.05 |
| B4 | `buildDomains` | 0.75 | 0.80 | 0.50 | 0.10 |
| B5 | Curtain wall, gates, towers, watergate | 0.90 | 0.85 | 0.65 | 0.10 |
| B6 | Citadel / castle | 0.80 | 0.80 | 0.60 | 0.05 |
| B7 | Streets and roads | 0.85 | 0.90 | 0.65 | 0.10 |
| B8 | Rivers / canals | 0.70 | 0.80 | 0.40 | 0.03 |
| B9 | Districts | 0.85 | 0.85 | 0.45 | 0.03 |
| B10 | Ward → blocks (alleys) | 0.75 | 0.75 | 0.50 | 0.02 |
| B11 | Block → lots | 0.75 | 0.80 | 0.45 | 0.02 |
| B12 | Outskirts density falloff | 0.85 | 0.80 | 0.60 | 0.03 |
| B13 | Shanty town / sprawl | 0.65 | 0.75 | 0.40 | 0.02 |
| B14 | Plaza, temple, churches, gate plazas | 0.80 | 0.85 | 0.55 | 0.05 |
| B15 | Landmark / solid buildings, keep plan | 0.80 | 0.85 | 0.50 | 0.02 |
| B16 | Greens / parks | 0.85 | 0.90 | 0.50 | 0.05 |
| B17 | Farms and fields | 0.80 | 0.90 | 0.45 | 0.03 |
| B18 | Harbour, docks, piers | 0.90 | 0.90 | 0.50 | 0.05 |
| B19 | Trees and forests | 0.90 | 0.85 | 0.80 | 0.02 |
| B20 | Elevation field | 0.55 | 0.80 | 0.20 | 0.01 |
| C1 | Display modes | 0.90 | 0.85 | 0.60 | 0.03 |
| C2 | Roofs, Raised, Solids | 0.90 | 0.90 | 0.70 | 0.02 |
| C3 | Lot post-processing (Offset) | 0.80 | 0.80 | 0.60 | 0.02 |
| D1 | Naming | 0.90 | 0.85 | 0.85 | 0.00 |
| D2 | District labels | 0.90 | 0.85 | 0.75 | 0.05 |
| D3 | Map furniture | 0.90 | 0.90 | 0.80 | 0.05 |
| E1 | Colour system | 0.95 | 0.90 | 0.85 | 0.05 |
| E2 | Stroke discipline, layer order, caching | 0.95 | 0.90 | 0.85 | 0.03 (det. given model) |
| E3 | Alleys layer | 0.80 | 0.90 | 0.60 | 0.02 (det. given model) |
| E4 | District view, framing, thin lines | 0.80 | 0.80 | 0.40 | 0.05 |
| F1 | Warp tools | 0.70 | 0.75 | 0.40 | 0.00 |
| F2 | Rerolls, renames, landmarks | 0.80 | 0.80 | 0.60 | 0.05 |
| F3 | UI / hotkeys / size bands | 0.90 | 0.85 | 0.70 | 0.05 |
| G1 | Export PNG / SVG / JSON | 0.85 | 0.85 | 0.40 | 0.05 |
| G2 | Integrations | 0.60 | 0.70 | 0.30 | 0.00 |
| H1 | Population and scale model | 0.85 | 0.80 | 0.60 | 0.05 |
| H2 | Performance envelope | 0.90 | — | 0.50 | — |

### 3.2 VG (assessment F 0.80 / V 0.85 / A 0.55 / S 0.01 / 18 pw; over-lens 0.75 / 0.80 / 0.50 / 0.01 / 24 pw; under-lens 0.83 / 0.86 / 0.60 / 0.01 / 16 pw)

The under-lens made one genuinely new measurement — V8 block trees of the 2026-09-25 `--detailed` captures
(`captures/village/2026-09-25T10-14-02/blocks/`, script saved) — which bounds four of the assessor's "black boxes";
the over-lens made three (draw-record scan for the palisade-only 24-px white mask, the hard-light/lerp divergence on
the `sand`/`night` inks, the `W·k^1.5` extrapolation). All are CONFIRMED by their authors and are used here as such.

| cell | assessor | over → | under → | ruling | reason |
|---|---|---|---|---|---|
| G1 F (tags / URL) | 0.90 | 0.85 | held | **accept 0.85** | 8 of 20 tags never ran in any capture (`meta.json` census); priors and the `resolve` table unrecorded — "same option surface" is half-evidenced |
| G2 A (seed / RNG) | 0.35 | held | 0.40 | **accept 0.40** | 26/26 recorded seeds < 2³¹ and 18 fresh generator draws all 31-bit (re-listed in this seat, §0.2 #6) → MINSTD lineage likely, same class path and method names; draw order still unknown |
| G3 A (river course) | 0.70 | 0.60 | 0.75 | **partial both 0.65** | routine chain measured call by call with loop identities in 4/4 seeds and every routine a published primitive (under); but the chain differs between builds a week apart (19251041 had no spline evaluator), the one branching rule and every parameter are unrecovered, and confluence/estuary lie outside the windows (over). "Their algorithm" is a moving target — R-G |
| G4 V (height field) | 0.80 | held | 0.85 | **accept 0.85** | tuning target is quantitative: 79–114 iso-polylines and 6.7–11 k marks per map are recorded |
| G4 A | 0.70 | held | 0.75 | **accept 0.75** | `Perlin.new = 5E + 6` (five separately seeded tables), once-per-cell sampling, clamped-projection carve, 127² gradient; fBm is standard (R-C) |
| G5 F (water extraction) | 0.80 | 0.70 | 0.85 | **stands 0.80** | the under-lens's block counts refute "`createDeflection` shapes every bank" (the 1 799 water cells are fixed by `digRiver`/`setLevel` before it runs and are the same set in `buildCurves` — CONFIRMED) which removes the assessor's #3 unknown from the extraction; the over-lens is right that coast was only draw-recorded and estuary never recorded (4 of 6 types). Net zero; range 0.72–0.85 |
| G5 A | 0.50 | 0.40 | 0.60 | **partial (under) 0.55** | with the deflection pass out of the extraction, what remains is a level set on a 129² lattice with quadratic linking and border closure — the marching-squares class with every loop count pinned; the carve profile/threshold and the deflection field's consumer stay open. The over-lens's 0.40 was premised on the deflection pass being the algorithm, which the counts refute |
| G6 F (density map) | 0.70 | held | 0.80 | **partial 0.75** | `createDensity` = ≈ 400 B of straight-line set-up + one 128 × 128 loop with no inner loop, no noise sample and an alternative arm untaken in 6/6 runs (CONFIRMED) → an analytic per-cell kernel with pre-set parameters; the form class is bounded, the kernel and the highway coupling are not, and F also needs the consumers (buildings, fields, palisade) to agree the way VG's do |
| G6 V | 0.70 | held | 0.75 | **accept 0.75** | silhouette fall-off of a smooth kernel is calibrated from 24 screenshots plus the same-seed 12-style set |
| G6 A | 0.20 | held | 0.35 | **partial 0.30** | the "analytic per-cell expression" reading is inferred from block structure (their label); the formula is unknown |
| G7 F (heart) | 0.75 | held | 0.80 | **accept 0.80** | `getHeart` is 260 B straight-line in 6/6 runs — a stored point, not a search; the invention shrinks to "how one point is drawn" |
| G8 V (roads) | 0.80 | 0.70 | held | **partial 0.75** | the *pattern* (T vs X, curvature, loops) is the visual class and the creator's record shows it flips on steering details (105215836, 104226049); the block trees now give measured branch ratios as calibration targets |
| G8 F | 0.75 | held | 0.80 | **accept 0.80** | per-step separation test (`getTrackersAround` ≈ 4.5), probe-ahead against neighbours' segments (`findRoadAhead` 5.9 × 28.9 per step), water-repulsion field — the evenly-spaced-streamline family (Jobard–Lefer), standard work to statistical parity |
| G8 A | 0.45 | held | 0.50 | **accept 0.50** | `Tracker.flexibility` is a four-arm constant switch (a per-class turn allowance), so the slope term lives in `Network.build`'s round-loop body — structure bounded, formula unread |
| G12 F (buildings) | 0.80 | held | 0.85 | **accept 0.85** | the placer is `[STATED]` by the creator (141198168 L21: rectangular houses at slightly varying distances along a street), not inferred (R-D) |
| G12 A | 0.55 | held | 0.65 | **accept 0.65** | block tree: 11 stations per street, 41 candidates of 88, staged rejection (5 road, 16 neighbour), 24 accepted = console — that is the algorithm; distributions are constants |
| G13 A (fields) | 0.60 | 0.50 | 0.70 | **stands 0.60** | the over-lens's "same state as G8" is not apt (the fields chain is far better pinned than the steering law); the under-lens's "C13 does not touch this row" is not established — VG's field bisector is the same plain `Bisector` family whose `makeCut = project` also produces NG's *bent* streets (§3.3), so whether field cuts bend is open. Parish–Müller-class OBB subdivision is the right class; range 0.50–0.70 |
| G14 A (orchards) | 0.75 | 0.65 | held | **accept 0.65** | "particularly irregular" is a name, not a predicate; view-side choice; G10 with a fully stated procedure sits at 0.60 |
| G15 F (forest) | 0.80 | held | 0.85 | **accept 0.85** | sampler pinned to Bridson active-list dart throwing evaluating all 50 candidates (Mitchell variant); `warp` is 130 B with no loop and no noise call — a bounds clamp, not a domain warp (closes cvn §6 item 4); `Forest.roll` skeleton measured |
| G15 A | 0.55 | held | 0.65 | **accept 0.65** | Delaunator + DCEL flood fill + Bridson/Mitchell + domain-warped fBm: a stack of named algorithms (R-C) |
| G16 F (palisade) | 0.80 | held | 0.85 | **stands 0.80** | the under-lens counts "raster push-off from buildings" as a recorded operation; the over-lens's draw-record scan shows the palisade-only raster is a 24-px white *polyline* (a road-network or wall-band mask, not building fills) — the push-off's subject is open, so the fence's stand-off is a design choice; palisade × fields/woods interactions are stated as glitchy |
| G16 A | 0.50 | 0.40 | held | **accept 0.40** | two of four "Known" items are inferences, one contradicted by a recording (above); `getPopulated`'s threshold and the hulled point set open |
| G17 A (naming) | 0.75 | held | 0.85 | **accept 0.85** | Tracery's public method names one for one in the recorded `com.watabou.tracery` package; `DeckRuleSelector` = Tracery's shuffle distribution; content excluded by ruling (consistent with MFCG D1) |
| G18 A (POIs) | 0.70 | 0.60 | held | **accept 0.60** | count and categories known; which buildings and why two are not |
| G20 S (descriptive tags) | 0.05 | 0.01 | held | **accept 0.01** | a function of a model at 0.01 cannot exceed it (R-B) |
| R2 A (layers) | 0.85 | 0.80 | held | **accept 0.80** | one recorded layer (the 24-px white mask) is absent from the list and unexplained; composites unrecorded |
| R3 V (relief) | 0.80 | held | 0.85 | **accept 0.85** | hachures/contours/grass each stated as "shapes along isolines" and screenshotted at 2 560 px; the walker is pinned per level and step |
| R3 A | 0.60 | held | 0.65 | **accept 0.65** | "isolines built more evenly" has one standard answer (quantile levels) and a recorded target (79–114 levels) — modest, PLAUSIBLE |
| R4 A (hillshade) | 0.75 | 0.65 | held | **partial 0.70** | normal-per-cell + stack blur is shown and Lambert is the standard; light direction, the strength-by-shadow-colour mapping and the composite are inferred |
| R5 A (spotlight) | 0.70 | 0.60 | held | **accept 0.60** | two gradient fills are shown; the darken/lighten compositing — the algorithm — is not |
| R6 A (water bands) | 0.90 | 0.80 | held | **accept 0.80** | `k^1.5` pinned at N = 3 only; the extrapolation predicts a 360-px band at N = 10 (§0.2 #7), so the per-N normalisation of W is unknown; W's own rule (9.9–21.2 px across four maps) unrecovered |
| R6 V | 0.95 | 0.90 | held | **accept 0.90** | five of six themes' band looks never draw-recorded |
| R8 A (buildings render) | 0.70 | 0.60 | held | **accept 0.60** | gable only recorded; hip/flat/ruin/dome and the "Slope" construction unrecovered; the stated multiply is approximate (cvn V14) |
| R8 V | 0.85 | 0.80 | held | **accept 0.80** | three of four roof types plus the dome are screenshot-only |
| R9 V (trees render) | 0.80 | held | 0.85 | **accept 0.85** | conifer/palm construction stated (concentric bands with a per-type offset; jagged-triangle conifer shadow) and screenshotted |
| R11 A (fields render) | 0.80 | 0.70 | held | **accept 0.70** | furrow count/spacing law and the curvilinear warp (40 `curveTo` on the new build) unknown |
| R12 A (outlining) | 0.85 | 0.70 | held | **accept 0.70** | the lerp identity was verified on the near-black default ink where lerp and hard light coincide; on `sand`/`night` the candidates differ by up to ≈ 60/255 per channel (CONFIRMED arithmetic); composition order unstated |
| R12 V | 0.95 | 0.85 | held | **partial 0.90** | the default theme's outlines are pinned and we author our own themes by ruling, so the other five themes' exact outline colours matter less to "same style class" than the over-lens weights them |
| R14 F (lights) | 0.80 | held | 0.85 | **accept 0.85** | mechanism stated (a single continuous map switches lamps) |
| R14 V | 0.75 | held | 0.80 | **accept 0.80** | 2 560-px night maps and the same-seed 12-style set include the target |
| E1 A (PNG/SVG) | 0.70 | 0.50 | 0.80 | **stands 0.70** | the retained-draw-call SVG library is `[STATED]` (55050649 L29, 56941736 L27 — read verbatim by the under-lens), so "inferred from a line-count remark" is wrong (over); no VG SVG export was ever captured, so 0.80 over-credits (under). Range 0.55–0.80 |
| E2 F (JSON export) | 0.80 | held | 0.85 | **accept 0.85** | the creator states VG's export keeps MFCG's object types in the same GeoJSON-like format, and MFCG's schema is shown |
| E2 A | 0.40 | held | 0.55 | **partial 0.50** | schema family known; VG's field names and layer list unverified |
| **overall F** | 0.80 | 0.75 | 0.83 | **0.80 (0.75–0.84)** | the block trees raise five model rows (G6, G7, G8, G12, G15) by 0.05–0.10; G1 and the over-lens's un-priced cross-feature interactions (palisade × fields, crossroads × secondaries, confluence × bridges) hold the aggregate where it was |
| **overall V** | 0.85 | 0.80 | 0.86 | **0.83 (0.78–0.87)** | default theme pinned to the pixel; four renderer cells lose 0.05 for one-palette verification (R6, R8, R12, G8's pattern), five gain for stated-and-screenshotted modes (G4, G6, R3, R9, R14) |
| **overall A** | 0.55 | 0.50 | 0.60 | **0.55 (0.48–0.60)** | model rows rise (published algorithms matched by block structure — R-C), renderer rows fall (formulas verified on one palette; composites unrecorded); the assessor's "same skeleton, our muscles" stands |
| **overall S** | 0.01 | 0.01 | 0.01 | **0.01 (0.00–0.02)** | six reseed points of unknown identity, an inlined seed path in `River.new`, and a reference that re-rolled seed-3131 geometry between two builds in one week (R-G) |
| **effort** | 18 (14–24) | 24 (18–32) | 16 (13–21) | **20 (15–28)**; ≈ 12–14 on the base's shared substrate | +2 for cross-feature integration and never-recorded render modes (over-lens; the creator's shipped defects are all at the seams), +1 for content authoring to the same standard; −1.5 for the measured skeletons and the library-grade sampler/naming engine (under-lens); the on-disk block trees already cover four of six tuning targets |

#### 4.2 VG capability table after rulings (V for non-visual rows repeats F, as in the assessment; "—" = render-only, S not meaningful)

| row | capability | F | V | A | S |
|---|---|---|---|---|---|
| G1 | tags / URL state | 0.85 | 0.85 | 0.60 | 0.02 |
| G2 | seed, RNG streams, retry | 0.85 | 0.85 | 0.40 | 0.01 |
| G3 | river course | 0.90 | 0.85 | 0.65 | 0.02 |
| G4 | height field | 0.90 | 0.85 | 0.75 | 0.02 |
| G5 | water body extraction | 0.80 | 0.80 | 0.55 | 0.02 |
| G6 | density map | 0.75 | 0.75 | 0.30 | 0.01 |
| G7 | heart / seeding | 0.80 | 0.75 | 0.30 | 0.01 |
| G8 | road network (trackers) | 0.80 | 0.75 | 0.50 | 0.01 |
| G9 | bridges | 0.85 | 0.90 | 0.50 | 0.01 |
| G10 | square + centrepieces | 0.85 | 0.85 | 0.60 | 0.01 |
| G11 | wharf / piers | 0.80 | 0.85 | 0.40 | 0.01 |
| G12 | buildings + population | 0.85 | 0.85 | 0.65 | 0.01 |
| G13 | fields | 0.85 | 0.85 | 0.60 | 0.01 |
| G14 | orchards | 0.90 | 0.90 | 0.65 | 0.01 |
| G15 | forest | 0.85 | 0.85 | 0.65 | 0.01 |
| G16 | palisade + gates | 0.80 | 0.85 | 0.40 | 0.01 |
| G17 | naming | 0.90 | 0.90 | 0.85 | 0.00 |
| G18 | legend / POIs | 0.90 | 0.90 | 0.60 | 0.00 |
| G19 | population / class | 0.90 | 0.90 | 0.30 | 0.01 |
| G20 | descriptive tags | 0.90 | 0.90 | 0.60 | 0.01 |
| R1 | palette / style system | 0.95 | 0.90 | 0.85 | — |
| R2 | canvas / layer order | 0.95 | 0.95 | 0.80 | — |
| R3 | relief marks | 0.85 | 0.85 | 0.65 | — |
| R4 | hillshade | 0.90 | 0.85 | 0.70 | — |
| R5 | spotlight | 0.90 | 0.85 | 0.60 | — |
| R6 | water rendering | 0.95 | 0.90 | 0.80 | — |
| R7 | roads rendering | 0.90 | 0.90 | 0.70 | — |
| R8 | buildings rendering | 0.90 | 0.80 | 0.60 | — |
| R9 | trees rendering | 0.85 | 0.85 | 0.60 | — |
| R10 | shadows | 0.90 | 0.85 | 0.70 | — |
| R11 | fields rendering | 0.95 | 0.90 | 0.70 | — |
| R12 | selective outlining / colour | 0.95 | 0.90 | 0.70 | — |
| R13 | palisade rendering | 0.90 | 0.90 | 0.70 | — |
| R14 | lights | 0.85 | 0.80 | 0.50 | — |
| R15 | nameplate / labels | 0.95 | 0.90 | 0.75 | — |
| R16 | grid overlay | 0.95 | 0.90 | 0.70 | — |
| R17 | house numbering | 0.90 | 0.90 | 0.70 | — |
| E1 | PNG / SVG export | 0.90 | 0.90 | 0.70 | — |
| E2 | JSON export | 0.85 | 0.80 | 0.50 | — |
| E3 | permalinks | 0.95 | 0.95 | 0.80 | 0.02 |
| E4 | editing / toggles / size | 0.95 | 0.90 | 0.80 | — |
| E5 | integrations | 0.90 | 0.90 | 0.80 | — |
| E6 | performance | 0.90 | 0.90 | 0.80 | — |
| D1 | scale | 0.95 | 0.90 | 0.90 | — |

*Annotation to G13 A (from the NG evidence, §3.3):* NG's plain `Bisector` runs `makeCut = split = PointExtender.project`
1:1 in all ten samples of the area / street / square templates, and those very streets are bent (380 of 519 with one
bend, BG-1) — so `project` is compatible with a bent cut, as `_critic-vg-ng` V5 says (it is the perpendicular-foot
step, not the bend). VG's field bisector shares the identity, so whether VG's field cuts bend is open, exactly as the
G13 ruling states. The ruling stands as written.

### 3.3 NG (assessment F 0.85 / V 0.85 / A 0.55 / S 0.02 / 19 pw; over-lens 0.80 / 0.80 / 0.50 / 0.02 / 23 pw; under-lens 0.85 / 0.85 / 0.60 / 0.02 / 16 pw)

Both lenses re-executed the assessor's MINSTD orbit test (9/9 Enter-successor seeds on the 48271 orbit at identical
k = 35 102–103 813). The pivot of this reference is the under-lens's one new measurement: it ran the forward-prediction
test that PF-3 proposed and the assessor listed as "cheapest experiment #1" (`captures/neighbourhood/bentcut_forward.py`,
stdlib, on the four 2026-09-25 vertex captures): the stated construction — OBB minor axis, perpendicular departure,
one corner at mid-course, perpendicular arrival — reproduces the drawn ends of the **plain** `Bisector`'s cuts within
0.1 chord in 43/54 (80 %, the assessor's own threshold; area 34/40 = 85 %) and **fails** for the hole-aware
`BisectorEx` (43/97 = 44 %). Re-executed in this seat (§0.2 #5): identical. That single result refutes the over-lens's
headline premise for B3 ("asserted, not tested") and supports its B4 argument; the two lenses agree on B4 and disagree on
B3 for a reason the table settles. The over-lens also viewed four screenshots (one per template) — the assessor had
viewed none — and found one factual error (F1: NG does offer renaming, post 59046807). The under-lens closed two
"unaccounted" residues from the raw files (the ≈ 18 % one-vertex shadow strokes are OpenFL's leftover pen point; every
`Pin` is realised as a tree, well or fountain) and corrected the black-box size: the plain `Bisector.makeCut` is
2 384 B, the 2 938 B routine the assessment names is `BisectorEx.makeCut`.

| cell | assessor | over → | under → | ruling | reason |
|---|---|---|---|---|---|
| A2 A (RNG engine) | 0.90 | 0.85 | held | **accept 0.85** | the recurrence and successor rule are CONFIRMED (orbit test, three seats); but no `int/bool/normal/fuzzy` symbol executes in any NG sample (over-lens census of ten `calls.json`), so the helper layer is reached only through one arithmetic fingerprint (the roof-noise sd 0.2357 = two 2017 `normal()` draws, under-lens E4) — PLAUSIBLE, not SHOWN; save/restore placement is by counts |
| A2 S (stream / successor) | 0.80 (stream only) | 0.40 | held | **partial: 0.80 stands as stream-only (R-B), annotated** | the over-lens is right that the *successor seed* is the state after k ≈ 35–104 k inlined draws and k is unrecoverable, so of the row's four items only the stream sequence is reproducible — which is what "stream only" means and is the same state as MFCG A2 (0.85); the annotation carries the point, the number does not move |
| A3 A (pipeline / failure policy) | 0.85 | 0.70 | held | **partial 0.80** | the order is SHOWN twice (call trees and sampled order) and the local-retry rates are arithmetic; but "no whole-map retry" is an absence in ten samples (a guard that never fired looks the same — the MFCG 'bad poly' precedent) and tiers 1 and 3 (sliver drop, frontage discard) are read from count deficits; carried as a wording correction ("no whole-map retry *fired* in 10 samples") |
| A3 S | 0.30 | 0.10 | — | **accept 0.10** | R-B: conditional on the model; the draw cost of each "Trying again" is unknown |
| B1 F (hood outline) | 0.85 | 0.75 | — | **partial 0.80** | `createShape` has no ancestor and the file's only construction hypothesis (`getCloud`) was wrong; the over-lens's viewing found a straight chord ("Goake's Green") that no blob generator yields without an explicit rule — one rule class added to the must-invent list; the arbitrary-polygon property that stage 2 needs is evidenced for the bisector, not for the outline generator |
| B1 V | 0.85 | 0.70 | — | **partial 0.75** | the silhouette is the first thing a viewer reads and only its class is known (four area maps, four classes); ≈ 16 recorded maps still give the target |
| B2 F / V (templates) | 0.85 / 0.85 | 0.80 / 0.80 | — | **accept both 0.80** | `StreetHood.build` 1 754 B + `f` unread; the S-curve law from one street; one screenshot per template; the identities pin the sub-area count, not the seed geometry |
| B3 F (bent bisection) | 0.90 | 0.80 | held | **partial 0.85** | the over-lens's premise fell when the forward test was run and passed for the plain bisector (CONFIRMED, re-run here); what survives is real — `isSmallEnough`, the termination law that sets every count, is unknown, and every vertex capture is `medium`, so "statistically similar structure" is evidenced at one size |
| B3 V | 0.90 | 0.85 | held | **accept 0.85** | block-size distribution measured at `medium` only |
| B3 A | 0.55 | 0.50 | 0.65 | **partial (under) 0.60** | the forward test turns BG-4 from a written construction into a verified forward model of the plain cut's geometry *given its placement*; the start side (91/162 — chance), the gate law, the fillet decision (53 %, no predictor) and the stop law stay open — the over-lens's list, already priced in the assessor's 0.55; the under-lens's 0.65 credits a test that conditions on the crossing fraction and the start side as if it settled placement. Range 0.50–0.65 |
| B4 F (hole-aware bisector) | 0.80 | 0.70 | held | **accept 0.70** | both lenses agree: the same forward model fails on the ring bands (44 %), the repair loop's test, generator, cap and fallback are unrecorded, and the author calls it "still pretty glitchy" and later abandoned the primitive in Urban Places |
| B4 V | 0.85 | 0.80 | — | **accept 0.80** | two ring maps of one seed pair; post images show 3–5 rings, the recordings 2–3 |
| B5 A (street finishing) | 0.65 | 0.55 | held | **partial 0.60** | the mechanism — extension to earlier streets, equal-chord circular fillets tracking the shorter leg (ρ = 0.94), a linear width law — is measured, which is identity knowledge; the decisions (fillet yes/no, the origin of a, b and the free-end term, `roadTwisting`) are open |
| B6 F (block content) | 0.85 | 0.80 | held | **accept 0.80** | no fit of a weighted choice to the census was made; the `Empty` share is template-dependent and `Green` occurs once |
| B7 F / V (plaza) | 0.85 / 0.85 | 0.80 / 0.80 | — | **accept both 0.80** | `buildSquare` / `buildRound` bodies unread; the must-invent list is the whole template body; five maps, one description per plaza kind |
| B8 V (rings) | 0.85 | 0.75 | held | **partial 0.80** | two recorded maps and an under-sampled ring count are real; the creator's post images (xb T2) still show the class at R = 3–5 |
| C1 F (lots / filter) | 0.85 | 0.80 | held | **accept 0.80** | `validateOuter` / `validateLot` (189 / 195 B) are read from counts; whether lot cuts bend is unmeasured; the creator's later verdict on this primitive along frontages ("too obvious") |
| C1 A | 0.55 | 0.45 | held | **partial 0.50** | "all three Known items are INFERRED" overstates: one partition per block, ≈ 20 leaves, `indentFronts = PolyBool.and`, `validateOuter` ≈ 2.9 per lot are exact count identities (structure); only the filters' predicates are inferred |
| C3 F / V (manors) | 0.80 / 0.85 | 0.70 / 0.80 | — | **partial 0.75 / accept 0.80** | the compound's parts (wall, one hall, courtyard grove via `getPointsWhole`, cupola options, rim placement) are SHOWN by counts and screenshots and reproduce the feature; the plot → hall fitting (`getRect / shrink / press`) is unread — the part the owner's stage-3 hook needs most |
| C4 A (greens / Poisson) | 0.60 | 0.50 | 0.70 | **partial (under) 0.65** | R-C: Bridson with k = 50 and the annulus step (`warp ÷ step = 50.000`, `Point.polar ≥ warp`, re-derived on raw files by three seats) and Chaikin (class name + exact identity) are published algorithms whose call structure is their fingerprint; the inset is the named descendant of the 2017 `buffer` contract; the over-lens is right that "inset of the block's inner boundary" is a reading of routine names, `warp` is OPEN (cvn V15) and which blocks get greens is unknown |
| C5 A (trees) | 0.50 | 0.40 | held | **partial 0.45** | the 4:1 `bloat` identity and the mod-4 crowns (99 %) are hard constraints but the construction is inferred; 8 of 958 exceptions make mod-4 a tendency |
| C6 F (pins) | 0.90 | 0.85 | held | **reject — stands 0.90** | the over-lens's reason ("> 90 % of `spawnPin` calls produce nothing by an unknown rule") is answered by the under-lens's census: `Pin.new = Tree.new + WellView.new + FountainView.new` exactly (33 = 33 + 0 + 0; 72 = 70 + 1 + 1) and `spawnPin` is 20 B — one conditional, a probability gate calibrated from the observed yield (0/37, 3/65) |
| C6 A | 0.45 | — | 0.50 | **accept 0.50** | every pin is realised as one of the three stated kinds; the gate's probability and the kind split stay open |
| C7 F (uneven streetwall) | 0.75 | 0.60 | 0.80 | **stands 0.75** | they cancel: output parity does not need the creator's doubted method — a per-lot front offset, MFCG's stated `Offset` sibling, reproduces the look (R-E, under-lens right); the feature's presence and magnitude in build 11441280 are unverified — the vertex captures could pair adjacent footprints and no one has (over-lens right). Range 0.65–0.80 |
| C7 V | 0.80 | 0.70 | — | **partial 0.75** | the only quantitative reading (± 10–25 %) is from two 2021 images of an older build; the stepped-front terrace look is nonetheless visible in the recorded screenshots |
| C8 F (size / knobs) | 0.85 | 0.70 | held | **partial 0.75** | outside `medium` there are two samples per size and hood size cannot be separated from block size (the view rescales), so the size → extent law and the knob → `isSmallEnough` mapping are unbounded; the per-size outcomes and the knob names are nonetheless measured / stated |
| D1 A (naming) | 0.80 | 0.65 | 0.90 | **partial (under) 0.85** | R-C and consistency with MFCG D1 and VG G17 (both 0.85): the engine is identified by tracery.js's class and mode names, the extension syntax is captured verbatim and its semantics are evidenced by outputs ("Small Ward" via the `0.5?-` fall-through, `#proper.possessive#`); the over-lens's correction is carried — the surname path is a syllable chain (`Syllables.splitWord / pinch` + `Markov.split / generate`), not the row's "order-n Markov" — and its point that the weight arithmetic and `@list` resolution are unrecorded is the residual. Range 0.75–0.90 |
| D2 A (title corner) | 0.70 | 0.55 | held | **partial 0.60** | the corner score is a reading on 14 observations; the mechanism (measure text bounds, choose against the view-side footprint `getCloud`) is SHOWN by the call structure |
| E2 S (layer order) | 0.60 | 0.40 | — | **accept in direction; R-B → 0.03 (det. given model)** | conditional on the model, which the column does not allow — ruled as MFCG E2 was; the tree depth-sort key is open even conditionally |
| E3 F (roads rendering) | 0.85 | 0.75 | held | **partial 0.80** | six of seven modes never executed, but each is described well enough to *function* (pebble ellipses, aligned rectangles, outline, dashes); the look is already priced in V 0.75 |
| E3 A | 0.55 | 0.45 | held | **accept 0.45** | the identity credit was carried by the trivial branch (one stroked polyline) |
| E4 A (roofs) | 0.80 | — | 0.85 | **accept 0.85** | the roof-noise sd 0.2357 = √(2/36) is `normal() + normal() − 1` of the 2017 engine (arithmetic checked here, §0.2 #7), on an engine the orbit test CONFIRMS live; every other op and constant is measured to < 1 %; open: taper profile, hatch pitch, exact t |
| E5 V (shadows) | 0.90 | 0.85 | — | **accept 0.85** | the layer-alpha model does not reproduce the measured composite (`#7a8499 → #a19e9a`, vs §7 item 7) |
| E5 A | 0.80 | 0.70 | 0.85 | **stands 0.80** | the under-lens closed the ≈ 18 % one-vertex strokes (OpenFL's leftover pen point, 4 046/4 046 — CONFIRMED, an accounting residue not an algorithm item); the over-lens's remaining items (blend mode, height source, silhouette test) were already the assessor's must-invent list at 0.80. Range 0.70–0.85 |
| E6 F / V (unrecorded styles) | 0.80 / 0.70 | 0.70 / 0.60 | — | **accept both** | no render of any non-default preset or of `details = false`; the night images are of a build whose presets 1.2.1 later changed |
| F1 F (toggles / hotkeys) | 0.95 | 0.90 | held | **accept 0.90** | factual: NG *does* offer renaming and name reroll (59046807), plus option persistence and a context menu; the assessor's surface was wrong by omission |
| F1 S | 0.30 | 0.05 | — | **accept 0.05** | R-B (Enter's successor needs k) |
| G1 F / V / S (export) | 0.85 / 0.85 / 0.30 | 0.80 / 0.80 / 0.05 | held | **accept all three** | no export executed; `assemble` (7 272 B) unread; SVG fidelity of hatch triangles, dome gradients and text unknown; S conditional (R-B) |
| **overall F** | 0.85 | 0.80 | 0.85 | **0.83 (0.78–0.87)** | unweighted mean of the ruled cells 0.845; with the assessor's own double weight on B3 / B4 / C1 / C8, 0.84; the hole-aware bisector, the outline generator, the termination law outside `medium` and the six unrendered modes are what the over-lens established and the range's lower half prices |
| **overall V** | 0.85 | 0.80 | 0.85 | **0.82 (0.77–0.86)** | unweighted 0.84; the default palette is pinned to the pixel, but the silhouette is known only by class, five presets, six road modes and the night glow have no render, and B4 / B8 rest on two maps |
| **overall A** | 0.55 | 0.50 | 0.60 | **0.55 (0.48–0.62)** | unweighted 0.565, weighted 0.554: the forward test, three published algorithms (Bridson, Chaikin, Tracery) and the RNG-law fingerprint raise five cells; the outline, the plaza, the rings, the repair loop, the filters and every selector stay unread; the assessor's "same skeleton, our muscles" is still the right sentence |
| **overall S** | 0.02 | 0.02 | 0.02 | **0.02 (0.01–0.03)** | the engine and successor rule are pinned (stream-only 0.80 on A2); every conditional render cell is ruled down under R-B; ≈ 10⁵ inlined draws of unknown position remain the whole gap |
| **effort** | 19 (15–24) | 23 (18–30) | 16 (13–21) | **21 (16–27)** | netted, not picked: +1.5 the hole-aware repair loop, +1.0 six unrecorded road/style modes designed from old images, +0.5 the SVG writer, +0.5 size-sweep targets before tuning (over-lens, R-E); −0.5 library-grade geometry (third-party OSS is outside the clean-room bar), −0.75 the on-disk `paths/1` harness already written (four stdlib scripts), −0.25 naming engine, −0.25 tuning (under-lens) |

**Factual corrections carried from the lenses (for `docs/confidence/ng.md`'s owner, not confidence changes):** F1's
"renaming is not offered" is wrong (59046807); §1.1's "there is no whole-map retry loop" should read "none fired in
10 samples"; the helper semantics `int/bool/normal/fuzzy` are not directly evidenced for NG; the plain
`Bisector.makeCut` is 2 384 B (`subdivide` 214, `split` 489), the 2 938 B routine is `BisectorEx.makeCut`; no
block-level (V8 detailed) coverage exists for any NG capture, so the assessor's experiment #6 needs a re-recording; the
≈ 18 % one-vertex shadow strokes are the recorder's pen point; `Pin.new` = trees + wells + fountains exactly; the
surname generator is syllable-based; the ring template's single-large-building centre is *seen* in `419786/images/01.png`
(unrecorded, not unseen); `Random.new = 4` in the non-re-analysed captures is a label phantom (now CONFIRMED absent from
the re-analysed one).

#### 4.3 NG capability table after rulings (values are the ruled cells; unlisted cells are the assessor's; S per R-B)

| id | capability | F | V | A | S |
|---|---|---|---|---|---|
| A1 | Tags, `Settings`, URL state | 0.95 | 0.90 | 0.75 | 0.05 |
| A2 | RNG engine, one stream, successor seed, save/restore | 0.95 | — | 0.85 | 0.80 (stream only; successor seed needs k) |
| A3 | Pipeline structure and failure policy | 0.90 | — | 0.80 | 0.10 |
| B1 | Hood outline (`createShape`) | 0.80 | 0.75 | 0.30 | 0.01 |
| B2 | Templates area / street / square + sub-areas | 0.80 | 0.80 | 0.60 | 0.01 |
| B3 | Street network by bent recursive bisection (plain `Bisector`) | 0.85 | 0.85 | 0.60 | 0.01 |
| B4 | Hole-aware bisection of annuli (`BisectorEx`) | 0.70 | 0.80 | 0.45 | 0.01 |
| B5 | Street finishing: extend, fillet, width, corridor | 0.90 | 0.90 | 0.60 | 0.02 |
| B6 | Block content dispatch | 0.80 | 0.85 | 0.40 | 0.01 |
| B7 | Square-template plaza | 0.80 | 0.80 | 0.50 | 0.01 |
| B8 | Ring-template seed geometry | 0.75 | 0.80 | 0.35 | 0.01 |
| C1 | Lots, setback, validation (perimeter filter) | 0.80 | 0.85 | 0.50 | 0.01 |
| C2 | Buildings, wings, plans, roof kinds, landmarks | 0.80 | 0.85 | 0.40 | 0.01 |
| C3 | Manor compounds | 0.75 | 0.80 | 0.35 | 0.01 |
| C4 | Greens, groves, shared Poisson field | 0.90 | 0.90 | 0.65 | 0.01 |
| C5 | Trees | 0.90 | 0.85 | 0.45 | 0.01 |
| C6 | Pins | 0.90 | 0.90 | 0.50 | 0.01 |
| C7 | Uneven streetwall | 0.75 | 0.75 | 0.25 | 0.01 |
| C8 | Size tags, scale, character knobs | 0.75 | 0.80 | 0.35 | 0.01 |
| D1 | Naming | 0.90 | 0.90 | 0.85 | 0.00 |
| D2 | Title layout | 0.95 | 0.95 | 0.60 | 0.05 |
| E1 | Palette / style schema | 0.95 | 0.90 | 0.85 | 0.05 |
| E2 | Canvas, layer order, stroke discipline | 0.95 | 0.95 | 0.85 | 0.03 (det. given model) |
| E3 | Roads rendering (Plain + five stated modes) | 0.80 | 0.75 | 0.45 | 0.02 |
| E4 | Roof rendering | 0.95 | 0.95 | 0.85 | 0.02 |
| E5 | Shadows | 0.95 | 0.85 | 0.80 | 0.02 |
| E6 | Unrecorded style features | 0.70 | 0.60 | 0.40 | 0.01 |
| F1 | Toggles, hotkeys, presets, tags dialog, rotation, renaming | 0.90 | 0.90 | 0.80 | 0.05 |
| G1 | Export PNG / SVG / JSON, permalinks | 0.80 | 0.80 | 0.40 | 0.05 |
| G2 | Integrations | 0.70 | 0.75 | 0.40 | 0.00 |
| H1 | Performance envelope | 0.90 | — | 0.60 | — |

### 3.4 FTG (assessment F 0.78 / V 0.80 / A 0.55 / S 0.00 / 110 pw full, 45 base subset; over-lens 0.73 / 0.78 / 0.52 / 0.00 / 135 & 55; under-lens 0.81 / 0.80 / 0.58 / 0.00 / effort held)

FTG has no call census, no console trace and no ancestor; its evidence is the creator's guide and posts, the complete
request/preset schema, and two decoded payloads. The two lenses read the originals (guide pages and posts at line
level) and touched almost disjoint metrics, so their corrections largely add rather than cancel. The over-lens's one
decisive reading is of the two subdivision posts in full (133016301, 164816716): the assessor's "stated twice, only
constants missing" for the plot cut conflated two different narrated rules, and the *current* edge-selection rule is
unstated. The under-lens's one decisive act is two new stdlib probes executed on both payloads
(`research/ftg-capture/challenge-under/{tower_ring_probe,wall_edge_probe}.py`, outputs re-read in this seat, §0.2 #8):
wire edge type 7 is the wall polyline, every wall edge joins two adjacent vertices of a district ring (25/25, 44/44),
towers are a subset of the wall's vertices (17/17, 29/29), the chains end at water — which settles the assessor's
unknown #5 and refutes "only the tower chain is serialised". Where both lenses touched one row (C3, C4, C9, C11, D3,
D6) they moved different metrics and the rulings carry both. Seed-exact is 0.00 by both lenses and by the reference's
design: `seed: null` on the wire, no seed control in any of the create form's twelve sections (0 hits for "seed" in
the form text dumps, CONFIRMED), server-side generation, render-time fills.

| cell | assessor | over → | under → | ruling | reason |
|---|---|---|---|---|---|
| A1 A (presets) | 0.85 | 0.75 | held | **accept 0.75** | one of six preset expansions is known (Medieval europe → the captured `stages[]`); the `Number of districts` mapping is absent from the request; the schema's shape itself is measured |
| A2 A (pipeline / failure policy) | 0.80 | 0.70 | held | **partial 0.75** | the two-phase skeleton is stated twice; the failure policy — one of the row's three named parts — is evidenced only for the discarded V1 ("gives up" after N attempts), and the per-stage stop test ("until the desired area for the stage is met") is unstated |
| A2 F | 0.90 | 0.85 | held | **accept 0.85** | same |
| A3 A (wire format) | 0.90 | held | 0.95 | **accept 0.95** | zig-zag `sint32` stated by the creator and proven on the payload; Protocol Buffers is a published specification; the residual is field 20 and a few sub-fields |
| A4 F (determinism) | 0.60 | held | 0.80 | **accept 0.80, annotated** | the reference's determinism surface is *no* seed control at all, so "same feature, same option surface" is trivially met; the number says nothing useful for the base, which must exceed FTG here (per-entity sub-seeds, stable ids — owner); the 0.20 residual is the untested wire `seed` and fill stability |
| B1 A (size ladder / area budget) | 0.70 | 0.55 | held | **accept 0.55** | the ladder is data; the row's one algorithm (manifest → target lot area per stage) is unstated in V1 and in V2 |
| B1 F | 0.90 | 0.80 | held | **partial 0.85** | the option surface is complete and one rung is measured twice on one configuration; the other nine rungs' densities are extrapolation and the area-budget rule unknown |
| B2 A (dependency loop) | 0.80 | 0.70 | held | **accept 0.70** | the seven-step loop is a worked example ("so we might have this generation"), which pins the principle but not the ordering when several nodes fall due, nor the interleaving with `initialNumber` / `limit` / `minimumSize` / resident creation |
| C1 F (coast) | 0.75 | 0.70 | held | **accept 0.70** | the guide page carries no construction detail (grep by both lenses); one measured coast at 50 m resampling; the 3 × 5 shape grid unmeasured |
| C3 A (drawn water) | 0.75 | 0.55 | held | **partial 0.60** | the over-lens is right that the Clipper link belongs to the terrain post (subtraction) and "smoothness = Chaikin iterations" is read off a slider; but "path → width + smoothness → ribbon" is stated and a polyline smoother plus a constant-width offset is the one natural construction |
| C3 F / V | 0.90 / 0.85 | — | 0.95 / 0.90 | **accept both** | output parity of a drawing tool whose contract, invariants (simple polygons, protected origin disc) and look (GIF, render) are all recorded |
| C4 A (road-graph substrate) | 0.80 | 0.70 | held | **partial 0.75** | "incremental" is the reader's word for "run lot detection … the newly created lots (and potentially the one that was just split in two)"; the maintenance strategy and the snap tolerance are open; but the under-lens's probes add that every district-ring vertex is a graph node (276/276, 200/200) and that walls are typed edges of the same graph — the one-graph substrate is measured beyond what the assessor had |
| C4 F | 0.90 | held | 0.95 | **accept 0.95** | as above; planar face extraction is a published algorithm |
| C5 A (road growth) | 0.65 | 0.55 | held | **accept 0.55** | queue discipline for district stages, legality thresholds, the jitter law inside the 15° cap, the stage stop test, vertical vs horizontal and the half-step normal streets are all unstated; the six-step loop and the Parish–Müller identification are the reader's — more decision points unknown than known |
| C5 V | 0.85 | 0.75 | held | **partial 0.80** | the measured signature is one preset's; Ringed / American / twisty and the seven initial-road types exist as the creator's own GIFs and screenshots, which still give the class |
| C5 F | 0.80 | 0.75 | held | **accept 0.75** | one configuration measured (Nevervalley is Galeiaward's base with one leaf changed); the stage stop test unstated |
| C6 F (district typing) | 0.70 | 0.65 | held | **accept 0.65** | the scoring rule is the assessment's own #1 unknown and the only outcome sample is four districts in one city |
| C8 A (lot → plot subdivision) | 0.70 | 0.55 | attacked upward, not raised | **accept 0.55** | both lenses read the two posts in full: 2025 narrates reflex pre-cut + centroid-edge cut; 2026 narrates the *replaced* bend construction and the new shrink-then-split at the level of one step; which outside edge starts a cut today, whether the centroid rule survives, and the termination threshold are unstated. Range 0.50–0.65 |
| C9 F (footprints / landmarks / entrances) | 0.85 | 0.75 | held | **partial 0.80** | both settlements are one configuration (DENSE / GAPS / GAPS); `INDIVIDUALLY_PLACED` was never generated and its shape catalogue is unspecified; seven landmark templates seen |
| C9 A | 0.60 | held | 0.70 | **accept 0.70** | Dense ("compact, wall-to-wall") and Gaps ("shrunk so the buildings do not touch") are STATED footprint rules; landmarks are templates by statement and by two byte-identical temple footprints; the entrance rule is measured on two settlements (on the outline, ≈ 3 m from the road, facing it, nearest edge a street in 85–93 %) |
| C10 F (suburb) | 0.75 | held | 0.80 | **accept 0.80** | the mechanism is stated end to end (an offshoot ends when no branch is drawn), the option surface is complete, the output measured twice (30.00 m streets, 14.70 m lot outlines, 83 cul-de-sacs); factual correction carried: the "15/30/45 m junction spacing" line is a superseded F3 reading |
| C11 A (walls / towers) | 0.45 | held | 0.60 | **accept 0.60 (CONFIRMED)** | the tracing rule is measured on both payloads: wire type 7 = the wall polyline, every edge joining two ADJACENT vertices of one district ring (25/25, 44/44), open chains ending at water (one; two in Nevervalley = "walls now split across rivers"), towers = a subset of wall vertices (17/17, 29/29; 9 and 17 vertices without one) at 19–73 m (medians 39.3 / 35.6 m); this refutes ftg-payload-visual §5.5's "only the tower chain is serialised" and the assessor's "one tower per lot vertex"; open: the tower-selection rule, the river-split geometry, the 2025 tweak; gates are a non-feature (none drawn) |
| C11 F | 0.75 | held | 0.85 | **accept 0.85** | as above |
| C11 V | 0.85 | 0.75 | held | **partial 0.80** | STONE_WALL only measured and the three other wall types have no image in the guide (over-lens right); the band-and-discs treatment is the class, and the era ladder shows three looks |
| C15 A (forests / trees) | 0.55 | held | 0.65 | **accept 0.65** | the placement rule for all three tree zones is stated in the guide; the fill law is measured as plain uniform random (min NN 0.14 m — "randomly"); the two forest polygons are byte-identical to the two group-4 land-use lots, which pins the polygon source the assessor listed as unknown |
| C15 F | 0.80 | held | 0.85 | **accept 0.85** | same |
| C17 A (perimeter / decoration) | 0.55 | held | 0.65 | **accept 0.65** | the decoration algorithm is stated verbatim on the districts guide page (random pick semantics at each level, singleton "in one of the unused plots"); the perimeter operation is a stated effect of one standard operation (round-joined buffer) with two constants open |
| C17 F | 0.80 | held | 0.85 | **accept 0.85** | same |
| C18 F (naming) | 0.65 | held | 0.75 | **accept 0.75** | parity is a generator in the same register (23 samples) and the tables are ours under clean-room in any case; the syllable budget and the ≤ 3-syllable contraction are stated |
| C18 A | 0.35 | held | 0.45 | **accept 0.45** | concatenative part tables with syllable counts and a contraction operator are stated; the operator and its probability are open |
| D3 A (roofs) | 0.75 | held (over-lens attacked and held) | 0.85 | **partial 0.80** | R-C: the creator names the straight skeleton, whose hip output is unique for a footprint; the gable rule ("some extra postprocessing"), the per-building hip/gable choice and the variant index (field 8.8, inferred) are the reference's own part and are not pinned — the same standard that put MFCG C2 at 0.70 for a wider row. Range 0.75–0.85 |
| D3 F | 0.85 | held | 0.90 | **accept 0.90** | four render modes stated verbatim; roofs are a pure function of footprint + variant |
| D5 A (day / night / weather) | 0.60 | held | 0.70 | **accept 0.70** | coupling ("only buildings that have an awake adult"), light model, controls, weather matrix and season re-skin are stated state by state; the stack is measured; only ramp values are ours |
| D6 A (post-process) | 0.80 | 0.70 | held | **partial 0.75** | the `EffectComposer` identification is inferred (the creator says only that his rendering library "had some easy-to-add extensions"), but the effect list maps one-to-one onto that library's stock passes and the crosshatch is stated as hand-written |
| D6 F / V | 0.90 / 0.85 | — | 0.95 / 0.90 | **accept both** | the whole option surface is on the guide page; every effect is imaged at least twice |
| D8 F / V / A (3-D view, shelved) | 0.60 / 0.65 / 0.45 | — | 0.70 / 0.75 / 0.55 | **accept all three** | the shipped half is an extrusion of D1/D3 stated as "wasn't that hard" and imaged six times; the unshipped half (height maps) has no parity target |
| E1 A (layout editor) | 0.70 | 0.55 | held | **accept 0.55** | two of ≈ nine parts are in the creator's words (the fill tool's leftmost face walk; the crossing-split invariant); brushes, the snapping unit, custom shapes, validation and undo are named or shown |
| E2 F (regenerate area) | 0.75 | held | 0.80 | **accept 0.80** | both must-invent items are answered on the regenerate-area guide page (people reconciliation; the drawn area is registered as edges of the same graph) |
| F2 F / A (clock / calendar / sync) | 0.90 / 0.75 | — | 0.95 / 0.85 | **accept both** | the day-matching rule and the message set are the author's own MIT code |
| G1 F (export) | 0.85 | held | 0.90 | **accept 0.90** | formats stated; GeoJSON is RFC 7946; the unseen property schema is an identity question (A held at 0.60) |
| G2 F / A (integrations) | 0.80 / 0.75 | — | 0.90 / 0.85 | **accept both** | for an integration the protocol is the algorithm, and it is published under MIT by the author |
| H2 F (performance) | 0.75 | held | 0.85 | **accept 0.85** | the envelope is measured (PUT answered in 2.90 / 3.23 s; full layout ≤ 7 s), not stated |
| **overall F** | 0.78 | 0.73 | 0.81 | **0.77 (0.72–0.82)** | unweighted mean of the ruled 46 cells 0.82, layout rows C1–C18 0.78 (from 0.76): the layout rows lose where a rule is unstated or one configuration was measured, the tool / format / protocol rows gain where the author's own code or a published standard covers them; −0.02 for the cross-feature interactions the creator's own bug record documents (the discount the VG ruling also carried) |
| **overall V** | 0.80 | 0.78 | 0.80 | **0.78 (0.73–0.83)** | unweighted 0.81; the over-lens's structural point stands — everything we rendered is one preset, one climate, one wall type, with no castle, shanty town, island, desert or polar map of our own — and the creator's ≈ 300 images carry the rest |
| **overall A** | 0.55 | 0.52 | 0.58 | **0.55 (0.48–0.60)** | unweighted 0.60, layout rows 0.53: a redistribution, not a shift — down on narrated-without-constants rows (A1, A2, B1, B2, C3, C4, C5, C8, E1), up on measured-or-standard rows (A3, C9, C11, C15, C17, C18, D3, D5, D8, F2, G2); the under-lens's observation that the assessor had this backwards for "deriving their code" is accepted |
| **overall S** | 0.00 | 0.00 | 0.00 | **0.00 (0.00–0.01)** | not a low estimate of a real quantity but the absence of a target: `seed: null`, no UI control, server-side, no ancestor, render-time fills; the "—" convention for data / format rows is kept |
| **effort** | 110 full / 45 base | 135 / 55 | held | **125 (105–145) full; 52 (44–62) map subset** | the over-lens's content re-pricing (15 → 25 pw: 209 building types, 80 nodes, 299 professions, 323 items, name generators, races, factions, events and 17 archetypes, all original under clean-room and required to stay economically solvable) is accepted; its robustness add (+10) is taken at +7 under R-E because the under-lens is right that the rows it raised are covered by standard components — though the assessor's 110 already credited the skipped design search, so that offset is partial; the map subset takes +4 on roads / lots / plots robustness, +2 castle and harbour fitting, +1 content. The fused base is the architecture lane's estimate, not this one |

**Factual corrections carried from the lenses (for `docs/confidence/ftg.md` and the findings):** wire edge type 7 is
the wall polyline stored in the road graph — ftg-payload-visual §5.1's table row ("minor, n 25, 48 m") and its §5.5 /
§10 ("the wall band geometry itself is not in the payload") need an addendum, and the assessment's §1.2 "only the tower
chain is serialised" is wrong; towers are a subset of wall vertices, not one per lot vertex; C10's "junction spacing
modes 15/30/45 m" is a superseded F3 reading (type 4 = suburb lot outlines at 14.70 m, suburb streets exactly 30.00 m);
the July-2026 post describes the *replaced* subdivision as the bend construction, so the assessment's reconciliation of
the 2025 and 2026 rules is the reader's, not the creator's.

#### 4.4 FTG capability table after rulings (values are the ruled cells; unlisted cells are the assessor's; "—" = data / format / deterministic transform, not meaningful)

| id | capability | F | V | A | S |
|---|---|---|---|---|---|
| A1 | Parameter surface, presets, save/load | 0.95 | 0.85 | 0.75 | — |
| A2 | Two-phase pipeline, staging, failure policy | 0.85 | — | 0.75 | 0.00 |
| A3 | Coordinate system, units, wire format | 0.95 | — | 0.95 | — |
| A4 | Determinism, seeding, regeneration (a non-feature; the base must exceed it) | 0.80 | — | 0.30 | 0.00 |
| A5 | Server/client split, persistence, lazy person generation | 0.85 | — | 0.70 | — |
| B1 | Size ladder, population and area budget | 0.85 | 0.80 | 0.55 | — |
| B2 | Dependency-graph building selection | 0.90 | — | 0.70 | 0.02 |
| B3 | Residents, job postings, backfill, matching | 0.80 | — | 0.60 | 0.01 |
| B4 | People model | 0.85 | 0.80 | 0.65 | 0.00 |
| B5 | Government, religion, factions, military | 0.85 | — | 0.65 | 0.01 |
| B6 | Relations, friend groups, rivalries, events | 0.70 | — | 0.50 | 0.00 |
| C1 | Coast generation, islands, ponds | 0.70 | 0.80 | 0.50 | 0.00 |
| C2 | Rivers, branches, bridges, classification, direction | 0.70 | 0.80 | 0.50 | 0.00 |
| C3 | Manually drawn water | 0.95 | 0.90 | 0.60 | — |
| C4 | Road-graph substrate (one graph: streets, lot outlines, border, lanes, piers, water outline, walls) | 0.95 | — | 0.75 | — |
| C5 | Road growth (proposal queue, 15° cap, lengths, stages) | 0.75 | 0.80 | 0.55 | 0.00 |
| C6 | District lots: creation, merge floor, type selection | 0.65 | 0.80 | 0.40 | 0.00 |
| C7 | District internal pipeline (landmarks → divide to area → plots → buildings) | 0.75 | 0.80 | 0.55 | 0.00 |
| C8 | Lot → plot subdivision geometry | 0.75 | 0.80 | 0.55 | 0.00 |
| C9 | Building footprints, landmark templates, entrances | 0.80 | 0.85 | 0.70 | 0.00 |
| C10 | Suburb stage | 0.80 | 0.80 | 0.55 | 0.00 |
| C11 | Walls and towers (type-7 edges on district rings; towers a subset of vertices) | 0.85 | 0.80 | 0.60 | 0.00 |
| C12 | Castle district | 0.65 | 0.75 | 0.35 | 0.00 |
| C13 | Harbours and waterfront districts | 0.75 | 0.85 | 0.45 | 0.00 |
| C14 | Outer settlement: farmland, farmsteads, outside buildings | 0.70 | 0.80 | 0.40 | 0.00 |
| C15 | Forests, tree areas, trees, hedgerows | 0.85 | 0.80 | 0.65 | 0.00 |
| C16 | Landscape decorations, reserve, climate presets | 0.75 | 0.80 | 0.40 | 0.00 |
| C17 | Perimeter expand + round; decoration system | 0.85 | 0.85 | 0.65 | 0.00 |
| C18 | District and building naming, erosion | 0.75 | 0.75 | 0.45 | 0.00 |
| D1 | Renderer architecture | 0.80 | 0.75 | 0.70 | — |
| D2 | Palette and feature treatment | 0.85 | 0.80 | 0.60 | — |
| D3 | Roofs (straight skeleton) | 0.90 | 0.85 | 0.80 | — |
| D4 | Water rendering and coast decoration | 0.75 | 0.75 | 0.45 | 0.00 |
| D5 | Day/night, weather, seasons, window lights | 0.85 | 0.80 | 0.70 | — |
| D6 | Post-process effects | 0.95 | 0.90 | 0.75 | — |
| D7 | Labels, scale bar, grid, legend, thematic layers | 0.85 | 0.80 | 0.55 | — |
| D8 | 3-D view, street view, height maps (shelved) | 0.70 | 0.75 | 0.55 | — |
| E1 | Layout editor | 0.80 | 0.80 | 0.55 | — |
| E2 | Regenerate area, bulk edit, constrained re-roll | 0.80 | 0.80 | 0.50 | 0.00 |
| E3 | Entity editing, dictionaries, pins, notes, layers | 0.85 | 0.80 | 0.65 | — |
| F1 | Schedules, behaviours, sub-locations | 0.80 | — | 0.65 | 0.02 |
| F2 | Clock, calendar, external time sync | 0.95 | — | 0.85 | — |
| G1 | Export | 0.90 | 0.80 | 0.60 | — |
| G2 | Integrations (Foundry, Roll20, public links) | 0.90 | 0.80 | 0.85 | — |
| H1 | Data scale | 0.80 | — | 0.60 | — |
| H2 | Performance envelope | 0.85 | — | 0.45 | — |

### 3.5 / 4.5 Dwellings — see §9.2 (rulings on every challenged cell) and §9.3 (capability table after rulings), appended 2026-09-26

## 5. What cannot be known from outside

Nothing on this list blocks functional or visual parity: each item is a constant or a rule we would set ourselves and
calibrate against the measured outputs. What the list blocks is *identity* — "deriving their code" — and same-seed
reproduction; and the only evidence class that could close it is the one the clean-room ruling bars.

**All five references.** The position of every random draw (so seed-exact stays ≈ 0 even where the engine is known —
MFCG, NG and Dwellings are all on the Lehmer 48271 stream, CONFIRMED, and it does not help); the reason behind any
constant; the predicate inside any routine that is seen only as a name, a byte size and a call count; anything about
builds not recorded (NG's successor Urban Places, VG between its two stamped builds, MFCG after 0.11.x, FTG after
2026-09, Dwellings after 1.4.1 / build 17195045). **Dwellings' own list is §9.5.**

**MFCG.** The bent cut's constants — bend placement law, `isSmallEnough` thresholds, the reject filter, the second
alley type (C13 stays OPEN, §3.1 B10/B11); the district growers' `validatePatch` / `validateEdge` predicates, `getType`
scoring and `sort` (B9); `validateCourse`, `getCanalWidth`, the course proposal and the tributary / islet logic (B8);
the `weighted` gate pick's weights, the auto-count rule and the live wall smoother (B5); the live spiral constants and
the four extra seed points (B1); the save/restore bracket positions — draw sites are inlined, 62–69 visible
`Random.float` calls against a 585-step stream advance (A2); `getPlanSym` (B15); the sprawl placer (B13); the elevation
field's form (B20); the 0.11.2 bay rule (B3); the hue-sampling rule (E1); the framing rule (E4).

**VG.** `createDensity`'s per-cell formula — its form class is now bounded (one 128² pass, no inner loop, no noise
sample, parameters set before the loop) but not its expression (G6); the steering arithmetic inside `Network.build`'s
round loop and how density drives branching (G8); `createDeflection`'s consumer (G5); the identities of the six
`Random.reset` points and the seed path into `River.new`, which makes no `Random` call (G2/G3); the knot offset law
(G3); `SquareBuilder`'s size and distortion laws (G10); `getPopulated`'s threshold and the hulled point set (G16);
`Params.resolve`'s table and the tag priors (G1); the household draw (G19); `Bloater`'s role (G15); the outline formula
on non-black inks and the per-N band normalisation (R12, R6).

**NG.** `isSmallEnough` (276 B), the termination law that sets every count (B3, C8); the start side (a coin flip in
the data), the gate's law, the fillet decision (53 %, no predictor), the alternative-cut generator and its cap (B3,
B4, B5); `createShape`'s body (B1); the ring closure (35 B) and the radius law (B8); `validateOuter` / `validateLot`
(C1); the content weights and their conditioning (B6); the pin gate's probability and kind split (C6); the tree
depth-sort key (E2); the `w?-` weight arithmetic (D1); ≈ 10⁵ inlined draw positions per map (every S cell).

**FTG.** Everything server-side: the RNG and whether a wire `seed` is honoured (A4); the district-type scoring —
"criteria like the remaining unplaced buildings, and what the lot is next to" is all there is (C6); road legality
thresholds, the jitter law inside the 15° cap, the district-stage queue discipline, the stage stop test and the
manifest → area budget (C5, B1); the current plot-cut edge rule, the shrink distance and the "too large for a building"
threshold (C8); the coast and river curve constructions (C1, C2); the farmland partition and clustering (C14); castle
and harbour fitting (C12, C13); the tower-selection rule among wall vertices (C11); dependency-loop tie-breaks (B2);
the name contraction operator (C18); the `INDIVIDUALLY_PLACED` shape catalogue (C9).

## 6. The experiments that would move the numbers most

Ranked by expected movement per hour. The harness is `profiler/` (`record.mjs` for the three watabou generators with
`--passes profile,coverage,draw`, `--detailed` for V8 block counts, `--vertices` for painted-path vertices, `--query`
for URL parameters; `session.mjs --instrument` + `drive.mjs` for canvas-menu options and for FTG, which allows one new
settlement per IP per day and is decoded by the stdlib scripts under `research/ftg-capture/`).

| # | experiment | what it measures | cells it moves | expected gain | cost |
|---|---|---|---|---|---|
| 1 | **MFCG geometry export** of the four `seed=555001&size=40` gate runs plus one size-80 river + coast city (`export=svg` and `export=json` URL keys through `session.mjs --instrument` / `drive.mjs`; `onExport` was never executed in any recording, so verify the key on the current build first) | lot area and aspect, frontage depth, courtyard ratio, alley width by depth, block valence, river width along the course, ribbon density vs distance — the distributions the heavy stages are now scored on by call counts alone | MFCG B8, B10, B11, B12, B13 F/V | MFCG F +0.03–0.05, V +0.03 — the only lever on the MFCG functional aggregate | one scripted session |
| 2 | **NG size sweep with vertices**: `record.mjs --target neighbourhood --passes coverage,draw --vertices --regen reload` for `small / medium / large` × `area / street / square / ring` × 3 seeds (36 runs) | leaf-area and OBB-minor-extent distributions per size (bounds `isSmallEnough`), the width law's a / b vs size, block and building counts vs size, whether a is drawn before geometry | NG B3, C8, B5 | NG F +0.05, A +0.05 | one scripted session; `paths_stats.py` already consumes the format |
| 3 | **NG detailed coverage** (`--detailed`; none exists for any NG capture — CONFIRMED negative result, ng-under §4.4) on 2–3 seeds per template | block-level counts inside `Bisector.makeCut`, `isSmallEnough`, `createShape`, `validateOuter`, `SquareHood.buildSquare`, `RingHood.createRings` — the trick that bounded VG's four black boxes | NG B1, B3, B7, B8, C1 A | NG A +0.05 | one session; `blocktree.py` from the VG lane re-used |
| 4 | **VG remaining black boxes**: `--detailed` on a `palisade` seed and a `no square` seed; a `river-windows.mjs`-style value probe at `River.new` entry / exit and of the `Random` state; same-seed tag sweeps (`dense`, `sparse`, `district`, `farmland`, `organic`); one draw record per non-default theme (`sand` for `shallowBands` 10 and Hachures, `night` for Hip roofs and lights, `bw` / `cold` for Contours and Conifer) | `getPopulated`'s loop shape, the square's candidate filter, the seed path into `River.new`, the density map's amplitude semantics, five themes' band / outline / roof laws | VG G16, G10, G2, G3, G6; R3, R6, R8, R9, R12, R14 | VG A +0.03–0.05, V +0.03 | two sessions |
| 5 | **FTG face recovery, no capture**: a planar face walk over both decoded road graphs (`analyse_layout.py` extended) | block sizes inside district rings (district-stage lots are not serialised), dividing-road position vs OBB / longest edge, plot band depth and frontage; tower selection vs wall-vertex geometry | FTG C7, C8, C11 | FTG A +0.02–0.03 | a day of stdlib scripting |
| 6 | **FTG one-per-day captures**, each one form leaf on the Galeiaward base, in value order: (a) `wallPlacement: AROUND_STAGE_LOTS` on stage 1 + `placeWallAfter` on stage 2 → ≥ 46 towers on two chains; (b) `initialRoadsType` sweep and `branchType: CURVE_AROUND_ORIGIN`; (c) `verticalBranchSegments` 2 vs 5 with the horizontal count fixed; (d) a water-free VILLAGE with farmland Around perimeter; (e) two identical requests with `seed: 12345`; (f) three coast presets with Ease-into-detail off; (g) an `INDIVIDUALLY_PLACED` district and a Squalid shanty settlement | the tower rule; the seed pattern and ring-radius rule; what vertical / horizontal mean; a clean graph and a second size rung; whether the wire `seed` is honoured; coast amplitude spectra; the third placement mode and the shanty rule | FTG C11, C5, B1, A4, C1, C9, C6 | FTG F +0.03–0.05, A +0.03–0.05 | seven days, one capture each; decoded with the existing scripts |
| 7 | **MFCG parameter sweeps on one seed** via `--query`: `size` 5 … 200 dry, `sea` in 0.1 steps, `gates` auto vs explicit at three sizes, `urban_castle`, `walls=0&citadel=1` | cell count = 8n + 4 − hull, the auto gate rule, coast geometry vs angle, district and building counts vs size, restart rate, the cost curve | MFCG B1, B2, B5, H2 | MFCG A +0.02–0.03 | one scripted session |
| 8 | **MFCG never-executed options** in one style capture: `greens=1` + trees, Raised off, Hidden + alleys, the Outline and Text tabs, a landmark list, Warp Apply / Discard on a small edit, `export=` | turns F1 / G1 / E4 from STATED to SHOWN; closes ST-9 | MFCG F1, G1, E4 | MFCG F +0.02 | one session |
| 9 | **NG palette and mode sweep** on one seed: `night / warm / cool / bw / modern`, Cobbles / Tiles / outlined / twisting / dashed roads, `details` off (draw pass; style dialog through `drive.mjs`) | the cobble and tile generators' op signatures, the night glow construction, pn §6 H7's shading predictions | NG E3, E6 | NG V +0.03 (E3 / E6 from 0.60–0.75 to ≈ 0.9) | one session |
| 10 | **NG adjacent-footprint pairing** on the existing vertex captures (no recording) | whether lot cuts bend, the uneven-streetwall jitter, frontage-width and depth distributions | NG C1, C7 | NG A +0.02 | half a day |
| 11 | **Ancestor cross-check**: the 2017 spiral for `8·size + 4` points in Python against exported cell statistics (#1); at most, build the 2017 ancestor once (Haxe html5) for per-seed goldens of the inherited stages | "still the 2017 spiral"; runtime-dependent semantics; goldens for the ancestor only | MFCG B1 A; S for the inherited stages | MFCG A +0.02; the only route to any seed-exact claim, and only for the ancestor | a day; a week for the build |

What no experiment moves: seed-exact for any reference (it needs the draw order, which needs the source); FTG's
server internals beyond output statistics (one settlement per day, decoded); NG's superseded build against Urban
Places (never recorded); VG's build drift (each number is stamped and stays stamped). Dwellings' experiments (#12–#16,
led by the one-click hand-off measurement) are §9.6.

## 7. Evidence classes used and not used

**Used** (by the four assessors, the eight lenses and both report seats; Dwellings' classes — including the one class
no other reference had, the generator's own exports — are §9.7):

* The Phase-3 findings under `research/findings/` — the readers' extractions with every technique claim tagged
  STATED / SHOWN / INFERRED / NAMED-ONLY and its source id — and the four critic files (`_critic`, `_critic-os`,
  `_critic-ftg`, `_critic-vg-ng`) plus the post-critic capture addenda, whose contradiction verdicts supersede the base
  text and were applied throughout (population ≈ 6.12 / building; `PoissonPattern` = warped Poisson-disc k = 50;
  `Equalize` = angles; retry continues the stream and encloses every stage; FTG's zig-zag `sint32` and the F3 `roadLength`
  law; the VG build stamps; the profiler label caveat).
* Our own recordings: V8 call censuses and, for VG, block-level coverage (counts and byte offsets only); Canvas2D draw
  records and NG vertex records; console traces; screenshots; CPU profiles; FTG's two protobuf payloads decoded by our
  stdlib scripts, the captured create request and preset catalogue, the network index (timings), CSS and texture assets.
* The 2017 GPL-3 ancestor TownGeneratorOS: constants and control flow read for **verification only** — `grep -n` at
  cited lines, nothing copied, ported or paraphrased into a design.
* The author's MIT Foundry module for FTG (entity fields, the `postMessage` protocol).
* Creator text — Patreon posts, itch devlogs, the FTG user guide — opened by the lenses at cited lines to verify
  quotations (the critic seats' 66/66, 51/51 and 24/24 spot-checks and the lenses' own: no misquotation found; one wrong
  claim found and corrected, NG F1's "no renaming").
* Captured data assets (MFCG / VG / NG grammar and palette JSON, FTG's building / profession / item tables): schema
  shape and token censuses only. Their values are the references' creative content; they document behaviour and are
  not reused.

**Not used:**

* **No captured JavaScript bundle** (`captures/**/network/bodies/*.js`) was opened by any of the thirteen seats, nor
  `Dwellings.js` by any of the seven Dwellings seats (§9.7), and no minified source text was read: V8 coverage yields
  byte offsets and counts, never text; the VG `river-windows` probes read values at debugger pauses, not code.
* No decompilation, no bundle-dependent inference, no reading of any project outside `/Users/cstokes/Desktop/Maps`,
  and no historical corpus (the corpus phase is later and owner-gated).
* In this seat: no new recording, no PNG re-measurement; the re-executions in §0.2 ran existing stdlib scripts and
  greps on files already on disk.

## 8. CONFIRMED vs PLAUSIBLE, and what this seat executed

* **CONFIRMED** (executed or read at source in this seat): §0.2 #1–#4, the first seat's checks, re-executed by the
  continuation seat with identical results; #5 the NG forward-prediction test (`captures/neighbourhood/bentcut_forward.py`,
  3.3 s: plain templates 43/54 = 80 %, area 34/40, street 7/9, square 2/5, ring 43/97 = 44 %, all 86/151 — identical to
  ng-challenge-under §4.1); #6 the VG seeds (26 distinct `Region.hx:81` values across all captures, maximum
  2 087 232 953 < 2³¹ − 1; 18 fresh generator draws, all 31-bit); #7 the four arithmetic identities (√(2/36) = 0.2357;
  `min(1, 40/n)` = 1 at n = 25 and 39, 0.2 at 200; `W·k^1.5` = 32 / 59 / 127 / 360 px at N = 2 / 3 / 5 / 10; 2⁻¹⁸ ≈ 3.8 ×
  10⁻⁶); #8 the FTG probe outputs (`research/ftg-capture/challenge-under/*.out.txt`: type 7 = 25/25 and 44/44 adjacent
  district-ring vertices, open chains with degree histograms {1: 2, 2: 24} and {1: 4, 2: 42}, towers 17/17 and 29/29 exact
  ring vertices and type-7 nodes, 9 and 17 wall vertices without a tower); #9 `"seed": null` in both FTG requests and 0
  hits for "seed" in the create-form text dumps. Every count quoted from a challenge file's own measurement is CONFIRMED
  by its author and, where listed here, re-executed.
* **PLAUSIBLE** (judgment): every confidence number, every range, every effort figure, every "partial" weighting in
  §3, and the expected gains in §6.
* **Not done:** no new recording; no PNG re-measured; the findings files were not re-read beyond the sections named in
  §0.2 — the four assessments and the eight lenses read them in full and cite them, and both critic seats spot-checked
  the quotations at source.
* **Dwellings (judge seat, 2026-09-26):** CONFIRMED / PLAUSIBLE for the Dwellings ruling are §9.9 and
  `docs/confidence/dwellings-ruling.md` §5; the checks are §0.2 #10–#14.

## 9. Dwellings — appended 2026-09-26 (lane `confidence/dwellings-rule`, judge seat, Fable 5.1)

Reference: watabou's Dwellings (House Plan Generator), itch build 17195045 (`Dwellings.js` 1 368 261 B, Last-Modified
2026-06-24), Haxe / OpenFL, client-side. Assessment `docs/confidence/dwellings.md` (39 rows: F 0.82 / V 0.83 / A 0.56
/ S 0.01 / ≈ 20 pw), over lens `dwellings-challenge-over.md` (34 cells on 22 rows down; 0.77 / 0.81 / 0.53 / 0.01 /
26 pw; one executed finding pointing up, A4, handed to the judge), under lens `dwellings-challenge-under.md` (21 cells
on 14 rows up; 0.84 / 0.83 / 0.60 / 0.02 / held), critic `research/findings/_critic-dwellings.md` (B1–B17, R1–R25).
The full ruling with its executed checks is `docs/confidence/dwellings-ruling.md`; this section is the same ruling in
this file's layout. Dwellings is assessed both as a reference to reproduce and as the precedent for the owner's
floor-plan rung (`docs/AMENDMENTS-2026-09-25b.md` item 28), which is its reverse: a known footprint (wings with rings),
storeys, entrance side, class, function and prosperity band, and a partition fitted to a programme — Dwellings starts
from a random shape, partitions first and labels last.

### 9.1 The two lenses and the checks executed in this seat

The two lenses touched ten cells in opposite directions (A4 A, C1 A, C2 F / A, C3 F / A, C6 F / A, B6 F, D3 F, E6 A;
E1 F down against E1 V / A up). Both executed: the over lens five stdlib scripts (the `Room.new`-vs-surviving-rooms
count behind the `hallways` figures, 29 distinct footprints behind 92 walked houses, the stair shafts level by level,
`slab`'s upper areas, the aggregates' implied weight) and the orbit test on nine chains; the under lens the orbit test
on 65 transitions with an exact discrete logarithm, the clock-reseed contingency from the probes' recorded `new
Date()` stacks, and nine tests on the twelve JSON exports (bent-bisection decomposability with a random-growth
control, cell order, exit side, setbacks, stair cells with base rates, door position, door tree vs shared-wall weight,
windows by role, the corridor bars). This seat went to the cited evidence on every conflicting cell (§0.2 #10–#14):
the orbit successors by independent modular exponentiation including the one-draw load / Enter offset; ten scripts
re-executed (eight byte-identical, two identical in every computed line); the analyzer's time-sorted sibling order;
the `RoofStack` = storeys identity re-counted 12/12; the stale entrance receipt against the corrected one. The
synthesis lane's programme-vs-rooms comparison and the critic's outputs were read on disk.

### 9.2 Rulings on every challenged cell

Format as in §3: `assessor` = the assessment's cell; `over →` / `under →` = what each lens moved it to ("held" = that
lens tried and could not refute it; "—" = not touched); **ruling** = accept / partial / stands with the value carried
into §9.3 and the reason. R-A … R-H apply. Cells no lens touched keep the assessor's value.

| cell | assessor | over → | under → | ruling | reason |
|---|---|---|---|---|---|
| A1 F (parameter surface) | 0.95 | 0.90 | held | **accept 0.90** | "every control was pressed" is contradicted by the profile's own not-exercised list (Rooms › Gothic / Tavern, Walls beyond keys 6–0, the Style dialog's Misc. tab, the exports) and by the critic's (Roofs › Simple / Hidden, Shade / Fade / Shrink); three of seven grid states drawn, the Numbers label mode never; `Tags.random`'s weights unmeasured |
| A2 A (pipeline order) | 0.80 | 0.75 | held | **accept 0.75** | §0.2 #12: the analyzer sorts siblings by inclusive time, so "the exact stage order" is evidenced only where nesting (`Room.fill` ⊂ `assignRooms`), the identical candidate streams (shape first) or the Shift+Enter / Ctrl+Enter re-entry points give it; where `Namer.get`, `Dimensions.random`, `assignDoors` and `spawnWindows` fall relative to `Room.fill` is not evidenced. F 0.90 stands (once-per-house counts; no whole-house retry in 96 houses) |
| A3 A (encodings) | 0.90 | held | 0.95 | **accept 0.95** | bitmask, edge code, grid convention (0 violations in 482 checks) and JSON shape are measured exactly; the residual is the trapdoor's JSON form (≈ 1 house in 90); the FTG A3 standard; §0.2 #14 confirms the encoding stands on the corrected receipt |
| A4 A (determinism, seeding, PRNG, Enter chain) | 0.35 | ≈ 0.55 (executed, handed up) | 0.75 | **partial 0.70** (0.60–0.75) | the assessment's own named experiment, executed by both lenses and re-checked here (§0.2 #10): the engine is the Lehmer 48 271 stream modulo 2³¹ − 1 and the next seed is the raw state after k draws (56 of 61 console and probe transitions at k < 10⁵, 60 of 65 with the seed-probe sessions; 0 of 39 for 16 807 and 69 621); the load-vs-Enter offset is exactly one draw; key histories are draw counts (+1 987 for view keys, +4 837 for `e r e`, +106 for a Ctrl+Enter); the misses are explained by the recorded `HouseType.assignSet → Random.reset → new Date()` stacks (off the orbit 4/4 when recorded, on 18/18 when not; Fisher p ≈ 1.4 × 10⁻⁴). Below MFCG's and NG's 0.85 because no ancestor or helper-layer fingerprint pins `Random.float`'s mapping or the identities of the four reset points, the clock-reseed mechanism and the mid-generation reset are readings of stacks and counts (PLAUSIBLE), and the "Enter chain" item is now known to be clock-dependent in ≈ 1 generation in 5; above the over lens's 0.55 because its three unexplained pairs are the under lens's clock reseeds |
| A4 S | 0.02 | ≈ 0.6 stream-only | 0.75 stream-only | **0.70, stream-only, annotated** (0.60–0.75) | R-B's exception now applies as for MFCG A2 (0.85) and NG A2 (0.80): the recurrence and the successor rule are CONFIRMED by three seats, so a clean-room team reproduces the successor sequence of any clock-free history; below NG because ≈ 1 generation in 5 (4 of 22 Date-recorded transitions) reseeds its successor from the clock, which the reference itself cannot reproduce. No other S cell moves: the draw sites stay inlined (view keys advance the stream by 1 987 draws with 0 recorded `Random.float` calls) |
| B1 F (ground-plan drafting) | 0.85 | 0.80 | held | **accept 0.80** | "the shape statistics of 104 houses" counts the 12 exports twice, and the 92 walked houses stand on 29 distinct ground footprints (8 / 13 / 8 by size; five medium footprints counted 13 times each — §0.2 #11); the sampler's rectangle count and side laws are unobserved and the acceptance test is one seed's story (critic thin spot 8) |
| B3 F (upper-storey setback) | 0.80 | held | 0.90 | **partial 0.85** (0.80–0.90) | the assessment's own diff test, executed on the exports (§0.2 #11): 17/17 upper storeys are unions of whole rooms of the storey below, and the 13 that shrink drop **exactly one whole room** in one piece (Kitchen ×2, Hall ×2, Studio ×2, Bathroom ×2, Room ×2, Living room, Bedroom, Laboratory); repeated one-room drops generate the measured 0.72–0.73 mean ratios and the seven-storey house's 82 → 58 → 39 → 36 → 33 %. Not 0.90: which room is dropped and when none is (4/17) place the visible setback, and the sample is 13 setbacks in 12 houses (the 318 walked views not re-measured) |
| B3 A | 0.35 | held | 0.60 | **partial 0.55** (0.50–0.60) | the construction "the storey below minus one whole room" is SHOWN and refutes both alternatives the assessment posed (drop a rectangle of the union; trim a reflex corner); but the "separated by a single boundary-to-boundary wall" clause is near-automatic for an edge room, the selection rule is open, and the creator states only "more likely to be smaller" — weaker than NG B3's stated-and-forward-tested construction (0.60) |
| B6 F (entrance choice) | 0.80 | 0.75 | 0.85 | **accept (under) 0.85** (0.78–0.88) | the over lens's premise ("the side was never tabulated") fell when the under lens tabulated it on the exports (§0.2 #11): the exit sits on a side with the most exterior edges in 11/12 houses, on a long side of the bounding box in 9 of 10 non-square footprints (5.7 expected for a uniformly random exterior edge), on the single longest run in 7/12, never on a one-edge run; n = 12 — the 92 walked ground floors remain the fuller test. A held at 0.40: the measured preference contradicts the posts lane's reading of the 1.3.0 rule, so the stated rule does not pin the build's |
| C1 F (recursive partition) | 0.75 | 0.70 | held | **stands 0.75** (0.70–0.80) | the over lens is right that the row's targets ("a room ≈ 5 cells, corridors a third of rooms but a seventh of area") average sixteen tag families whose shape statistics differ on the same five seeds (rooms without a 2 × 2 block 17–73 %, rectangles 49–73 % — §0.2 #11), so parity must be calibrated per partition mode; but only four tags change the cutter (`organic`, `mechanical`, `hallways`, `square`) — the default cutter stands behind ≈ 50 distinct walked houses plus seven exports, not "about ten" — and the merge point belongs to C2. Carried as an annotation, not a move |
| C1 A | 0.40 | 0.35 | 0.45 | **accept (under) 0.45** (0.35–0.50) | the assessment pre-committed "up to ≈ 0.50 if a notch-cut model fitted the storey polygons"; the fit run on the 38 exported storeys (§0.2 #11) passes for the **bent-bisection class** — 30/33 multi-room storeys decompose by recursive boundary-to-boundary cuts with ≤ 1 bend against 42.5 % of 1 320 random growths of the same cells and room counts (straight-only 10/33 vs 13.6 %) — and fails for the strict notch rule (20/33), so half the pre-committed raise; the JSON growth-order warning loses force (no fixed-order flood fill reproduces the cell lists, best 91/133). Not 0.50: the default cutter is the former `spacious` mode, described by its effect only, and the observed rooms are post-merge (over lens) |
| C2 F (corridor merge, nooks, passages) | 0.70 | 0.65 | 0.75 | **stands 0.70** (0.65–0.75) | they cancel on checked facts: the merge is larger than the row states — with `hallways` 39 of 87 created pieces vanish before the drawing while surviving rooms go 44 → 48, and survivors without a 2 × 2 block go 39 → 73 % (over; §0.2 #11) — which makes the texture target harder; and its two stated post-conditions hold as invariants on the exports — every one-cell room has exactly one door (15/15: 4 bathrooms, 9 shafts, 2 passages), no two circulation rooms share a wall (0 pairs among 16) (under; §0.2 #11) — which makes the target testable; the entanglement with C1 / C3 that set 0.70 is unchanged |
| C2 A | 0.40 | 0.30 | 0.50 | **stands 0.40** (0.30–0.50) | the over lens removes one "Known" item — the paired `hallways` figures the row cites (rooms +6/+13/+1/+12/+4) are `Room.new`, created pieces, not rooms joined by openings (§9.4 correction a) — and shows the merge is a principal shaping stage with an unknown predicate; the under lens adds two measured post-conditions that any union-of-adjacent-corridor-pieces merge satisfies; net zero on a routine known by name, purpose, scale and post-conditions but not by rule |
| C3 F (room connection and doors) | 0.80 | 0.75 | 0.85 | **stands 0.80** (0.75–0.85) | the under lens pins two output laws (§0.2 #11): a door on a shared wall run of ≥ 3 edges sits at an end of the run (17/17; P ≈ 6 × 10⁻⁴ under a uniform position) and the storey's door tree is a maximum-shared-wall spanning tree in 27/33 (22.5 expected; P ≈ 0.018) — real gains for statistical parity; the over lens is right that loops are a stated feature ("added specifically … loops for example"; "quite rarely", with a permalink) absent from twelve houses of which 13 of 38 storeys cannot hold one, so 0/12 bounds the per-house rate only below ≈ 0.25 — a feature the tree model omits; they cancel |
| C3 A | 0.45 | 0.35 | 0.55 | **partial 0.50** (0.40–0.55) | the two laws are identity knowledge (the price's sign — longer shared walls cheaper — and the position rule); but the tree preference is modest evidence (27 against 22.5 expected, 14 storeys admitting one tree only), the surviving `Door` objects equal rooms − storeys in only 32 of 92 walked houses (36 fewer, 24 more), so "a priced spanning connection" describes the output and not a closed object model (critic R16 is wider than twelve houses), and the loop rule and the `NULL` shaft rule stay open |
| C4 F (stairs between storeys) | 0.85 | held | 0.90 | **accept 0.90** | the placement law is measured on all 38 exported stair ends (§0.2 #11): every stair cell on the storey's outer wall (base rate of cells with an exterior side 74 %), 30/38 in an outer-corner cell (base rate 28 %), the landing side against a wall 38/38 (exterior 35), the entry side open into the stair's room or its shaft 38/38 — a per-pair search over outer-corner cells with an open entry side reproduces where stairs land, not only that they exist |
| C4 A | 0.55 | held | 0.65 | **accept 0.65** (0.60–0.70) | the same law is the operational form of the creator's "accessible and don't obstruct movement across a floor" (1.1.0); the tie-break among corners, U vs L and the pair order stay open — the NG B5 standard (mechanism measured, decisions open); the over lens's attack on "call order" is answered by the Shift+Enter / Ctrl+Enter dependency, not by the trees |
| C5 F (spiral stair and stairwell) | 0.80 | 0.75 | held | **stands 0.80** (0.75–0.82) | the over lens's finding is real and carried (§9.4 c): both exported stairwell stacks in houses with a basement run through the basement, each with the basement → ground flight inside the shaft, so the 1.4.0 "except the basement" is not this build's rule — but that simplifies the device rather than obscuring it; the roll rate 9/21 (0.22–0.66) was already the row's must-invent |
| C5 A | 0.50 | 0.45 | held | **accept 0.45** | the row's "Known: both devices' rules" credited a stated rule the build contradicts; how the shafts arise (a cell reserved in every storey's partition, or carved out behind a `NULL` edge) is unobserved and the tagged family was never exported |
| C6 F (windows) | 0.85 | 0.80 | 0.90 | **accept (under) 0.90** | the assessment's named regression, executed (§0.2 #11): bedrooms carry 3.00 ± 0.78 windows whatever their 4–12 exterior edges (r = 0.37) and bathrooms 1.42 ± 0.49 (r = 0.44) — fixed counts; Hall (r = 0.95), Stairhall (0.91), Kitchen (0.74), generic Room (0.70) and Living room (0.67) scale with exterior edges — five ratio roles against the registry's `winRatio` × 5; Attic / Chapel / Laboratory / Trophy room fully glazed, Storage / Armoury / Secret passage none; the over lens's "147 unexplained gaps" are per-room caps, not a spacing rule (219 of 358 consecutive exterior-edge pairs on one run are both glazed) |
| C6 A | 0.55 | 0.50 | 0.65 | **accept (under) 0.65** (0.55–0.70) | the stated 1.1.0 model is now measured role by role and the fixed / ratio split matches the registry's counts — a fingerprint; open: the identities and values of the other four `winFixed` types and the lower-floor reduction for tall houses (1.3.1); the over lens's thin-n point holds for 10 of 21 roles but not for the roles that carry the model (bedroom 13, bathroom 12, Room 20, Living room 12) |
| D3 F (role assignment) | 0.75 | 0.70 | 0.80 | **accept (under) 0.80** (0.72–0.85) | the synthesis lane's comparison, read on disk: 157 programme items against 133 rooms, 7/12 houses with fewer rooms than items and 5/12 with fewer upper rooms than the bedrooms demanded, so the bathroom 8/12 and bedroom 7/12 rates follow from room supply plus the storey rules that a priority-ordered greedy assignment with validators reproduces; only gallery (0/12, listed 12/12), study (0) and attic (1/9) still need the unknown score; the over lens's n = 12 point was already the assessment's n |
| D3 A | 0.45 | 0.40 | held | **stands 0.45** (0.40–0.50) | the over lens's items were already priced ("multiple attempts" inside `types2rooms` / `validate` [INFERRED]; the score a name); its one new fact — the list-1 specials are re-drawn on every assignment run (chapel → workshop, laboratory → workshop, lookout on one house across a load, two Shift+Enter and two Ctrl+Enter, `probe-keys.log` #1–#5) — is a stage-boundary correction (D2 and D3 are one stage, §9.4 b), not an identity loss |
| D5 F / A (Gothic / Tavern room sets) | 0.60 / 0.40 | 0.55 / 0.30 | held | **accept both** | R-D: nobody generated a Gothic or Tavern house in this build; `LoadedHouseType.new` × 2 and `rooms.Loadable` (never run in a generation) are names; the JSON5 format is unread by ruling; the images are a 1.3.7 export and Tiny Pubs' tavern names |
| D6 F (labels, renaming, numbering) | 0.90 | 0.85 | held | **accept 0.85** | the Numbers mode was never drawn in this build (its traversal order is read from one 2023 image) and click-to-rename was never exercised by a probe |
| D7 F (Taverns, separate generator) | 0.60 | 0.50 | held | **accept 0.50** | no capture, export or profile of Taverns exists in the corpus; "statistically similar structure" cannot exceed a coin flip on five images (outside the effort total, inside the unweighted means) |
| E1 F (plan renderer) | 0.90 | 0.85 | held | **accept 0.85** | the row's option surface includes seven grid modes (three states drawn; Planks and Tiles are pattern names — R-D), the Numbers label mode (never drawn) and door modes Simple / Open (one screenshot) |
| E1 V | 0.90 | held | 0.95 | **accept 0.95** | the SVG is the draw record and the assessment's own words are "known to the hundredth of a cell … must invent nothing beyond our own style"; the value this file gives exhaustively measured surfaces (NG E2 V, D2 V) |
| E1 A | 0.80 | held | 0.85 | **accept 0.85** | layer order identical on 38/38 storeys and in every capture, joins / caps split exactly by layer in twelve renders, piece-per-edge walls, measured glyph constructions; the label anchor and one always-empty group are the residual — the MFCG / NG E2 A standard (0.85) |
| E2 F / V (colour schemes and wall styles) | 0.90 / 0.85 | 0.85 / 0.80 | held | **accept both** | schemes 2–5 are one screenshot each, wall styles 7–0 are piece counts whose paint logs are on disk and unread, "Modern" is never described, the Misc. tab was never exercised — every measured render is the default scheme with Simple walls (the VG R6 / R8 standard) |
| E3 A (room lights) | 0.75 | 0.65 | held | **partial 0.70** (0.65–0.75) | the skeleton-summit placement rests on the routine chain (`getSkele → getSummit → snap`, one `Math.random` per lit room) — a strong name chain, not a geometric test, although the SVGs hold both the light centres and the room outlines; the creator says "the centre of its most spacious part", never skeleton; under R-C the reference's own part (radius / intensity law — "overcomplicated calculations" —, `onTheWall`, the statue / altar override, the jitter's size) is open |
| E5 A (abstract furniture) | 0.40 | 0.30 | held | **partial 0.35** (0.30–0.40) | `Clutter.spawn → group → push / getForce` is [NAMED-ONLY] (critic R14; R-D) and the per-type table unknown; but the stated tendencies (wall-hugging, per-room density / size / wall affinity, the no-blocking fix) and the measured densities and shapes are more than a bare name |
| E6 F (roofs) | 0.85 | 0.80 | held | **stands 0.85** (0.80–0.88) | Simple / Hidden and the three effects were never toggled, but Simple ("roofs as outlines", the pre-1.4.1 look in the images) and Hidden are described, Shade and Fade are the measured default (four orientation shades; the 10 % veils), and only Shrink is a name (R-D, annotated); `spawnChimneys = 1` is a call count, not a chimney count (§9.4 i) |
| E6 A | 0.75 | 0.70 | 0.80 | **stands 0.75** (0.70–0.80) | the under lens's identity (`_RoofStack.Layer.new` = `display` = storeys above ground, 12/12 — re-counted here, §0.2 #13) ties roof layers to storeys, not the face construction; the over lens is right that faces = Σ outline corners (92/92 with the spiral cone) is a necessary condition any one-face-per-edge hip construction meets — a medial-axis roof gives the same count — and that the creator names no skeleton for Dwellings (the linked implementation is MFCG's); `geom.Skeleton.new` exceeds the light calls by 1–5 per house, not by the storey count, so no roof–skeleton call identity exists. The author's own straight-skeleton implementation and habit keep it at 0.75, between MFCG C2 (0.70, stated by the creator) and FTG D3 (0.80, named by the creator) |
| E7 F / V / A (elevation) | 0.65 / 0.70 / 0.40 | 0.55 / 0.65 / 0.30 | held | **partial F 0.60** (0.55–0.65); **accept V 0.65**; **accept A 0.30** | a second generator (Tiny Pubs' facade grammar) known from parameter-class names drawn every generation (`Dimensions`, `WindowData`, `DoorData`, `DormerData`, `ChimneyData`, `FachwerkData`, `GableWindow`, `HipRoofData`, `LampData`, `SignData`, `SpireData`), one screenshot and ≈ 13 creator images; the E view was never draw-recorded, side / rear / fortified / dark never observed; F keeps 0.60 because the feature list and the four-side / fortified / dark controls are stated and the class names enumerate the parts |
| F2 A (restrictive rerolls) | 0.75 | held | 0.80 | **accept 0.80** | the row's one residual ("how the PRNG is advanced for a re-roll is A4's unknown") is measured: a re-roll stays on the loaded house's stream (Ctrl+Enter first → the next Enter seed at k = 485 against 379 without it, §0.2 #10), each re-roll runs `Random.reset` twice (`_probes/keys/K/steps/002–006`, under lens), and a Shift+Enter can meet the clock reseed (its successor off the orbit after an `assignSet` Date stack) |
| F3 F (renaming and view toggles) | 0.95 | 0.90 | held | **accept 0.90** | click-to-rename, Shift+click a room's light and Ctrl+click highlight were never exercised by a probe |
| G1 A (JSON export) | 0.90 | held | 0.95 | **accept 0.95** | the writer's output is the evidence — byte-stable, characterised to pretty-printing, file naming, whole-house-always and menu-only access; the trapdoor's form is the residual (A3's) |
| G2 F (SVG / PNG / Advanced export) | 0.90 | 0.85 | held | **accept 0.85** | only the Advanced dialog's defaults were exported (twelve table 2 × N files at 100 dots, all layers); per-floor SVG, PNG, row / column layouts, floor ranges, layer subsets and the elevation export were never triggered — by the owner's export rule, a fact about the evidence, not a flaw in it |
| G3 F / A (hand-off contract) | 0.80 / 0.70 | 0.70 / 0.55 | held | **accept both** | the receiver half is B5's row (0.90 / 0.85); the distinct half — what a sender puts in the URL — has zero observations (critic §6 gap 1: no lane opened a building from NG, MFCG, VG, UP or Tiny Pubs), the creator calls the senders unfinished ("fine-tune this functionality later", 1.3.4; the entrance hand-off "isn't currently working", 1.3.8), and the only rasterisation sentence is about Procgen Mansion; the one-click measurement that closes it needs no export |
| **overall F** | 0.82 (0.77–0.86) | 0.77 (0.72–0.82) | 0.84 (0.79–0.88) | **0.80 (0.75–0.84)** | unweighted mean of the ruled cells 0.83 (from 0.84: A1, B1, D5, D6, E1, E2, E7, F3, G2 −0.05; D7, G3 −0.10; B3, B6, C4, C6, D3 +0.05), heavy rows (B1, C1, C2, C3, C4, D3, E1) 0.80 unchanged (B1 and E1 −0.05, C4 and D3 +0.05); at the assessor's implied heavy-row weight (w ≈ 5, the over lens's `aggregates.py`) 0.82; −0.02 for the cross-stage interactions the creator's own record documents (the spiral shaft and the entrance overlapping, fixed 1.3.3; furniture blocking doorways and stairs, 1.3.6 → 1.3.7; stair tags forcing an extra storey; the clock reseed) — the discount the VG and FTG rulings carried |
| **overall V** | 0.83 (0.78–0.87) | 0.81 (0.76–0.85) | 0.83 | **0.82 (0.77–0.86)** | unweighted 0.83 (E1 +0.05, E2 and E7 −0.05); the over lens's structural point stands — every measured render is one configuration of the style surface (Natural scheme, Simple walls, Dots grid, Hidden doors, Names labels, Detailed roofs with all three effects on) and the other four schemes, four wall styles, six grid modes, two door modes, Numbers labels, two roof modes and the elevation are one screenshot, a piece count or nothing — priced at −0.01, as the NG ruling priced its unrendered modes |
| **overall A** | 0.56 (0.48–0.62) | 0.53 (0.46–0.59) | 0.60 (0.53–0.66) | **0.58 (0.50–0.64)** | unweighted 0.63 (from 0.62), heavy rows 0.54 (from 0.51: C1, C3, E1 +0.05, C4 +0.10); at w ≈ 5–8, 0.58–0.59. The highest A of the five references, for a checkable reason: the best structural evidence (a complete call census, the generator's own exports, the orbit test) and four output laws measured from the exports — the one-room setback, the outer-corner stair cell, the door position with the long-wall tree preference, the per-role fixed / ratio window demand; the muscles (the cut rule, the merge predicate, the door price, the validators' score, the packer) stay theirs |
| **overall S** | 0.01 (0.00–0.03) | 0.01 (0.00–0.03) | 0.02 (0.01–0.03) | **0.02 (0.01–0.03)** | the stream is pinned (A4 stream-only 0.70), as for MFCG and NG whose overall S the earlier rulings kept at 0.02 with the same annotation; every downstream draw order is not (467–2 632 inlined `Random.float` per house), and ≈ 1 generation in 5 reseeds its successor from the clock |
| **effort** (Dwellings-alone parity) | ≈ 20 pw (16–26) | ≈ 26 (22–32) | held (≈ 19–20) | **≈ 23 pw (19–29)** | R-E: +1.0 on C1 (the cut rule fitted per partition mode and the merge interplay, against the creator's record — an idea in 2021, a first implementation "too slow and too unstable", tweaks in 2023, a rectangle-only mode added and removed, `spacious` made the default in 1.4.0 — the over lens's +1.5 less the decomposability result, which fixes the class); +0.4 C2 (the merge removes up to 45 % of created pieces); +0.2 C3 and +0.3 D3 (the object model does not close; the objective is smaller than feared once room supply explains most failures); +0.4 E5 (the packer); +1.0 E7 (a second generator known from names and images; the over lens's +1.5 less what the assessor's range top already carried); +0.5 for a per-mode parity harness on the walked set (the lenses' export scripts are its first half); −0.5 for the four measured laws that remove design search from B3, C3, C4 and C6 (under lens). Row sum 20.0 + 3.3 ≈ 23 |

### 9.3 Dwellings capability table after rulings (values are the ruled cells; unlisted cells are the assessor's; S per R-B)

| id | capability | F | V | A | S |
|---|---|---|---|---|---|
| A1 | Parameter surface: 16 tags, floors, URL keys, dialogs, menus, shortcuts, styles | 0.90 | 0.85 | 0.80 | — |
| A2 | Pipeline order, once-per-house stages, failure policy (no global retry) | 0.90 | — | 0.75 | 0.02 |
| A3 | Data model and encodings: unit cell grid, plan bitmask, entrance code, JSON schema | 0.95 | — | 0.95 | — (det. given model) |
| A4 | Determinism, seeding, PRNG (Lehmer 48 271, CONFIRMED), Enter chain | 0.85 | — | 0.70 | 0.70 (stream only; clock-free histories) |
| A5 | Client architecture: registry at start-up, per-generation model, per-layer canvases, data files | 0.85 | — | 0.75 | — |
| B1 | Ground-plan drafting (rectangle unions with rejection, size bands, `square`) | 0.80 | 0.85 | 0.50 | 0.02 |
| B2 | Storey count (`randNFloors`, `low` / `tall`, `floors=`, size → height) | 0.85 | — | 0.45 | 0.02 |
| B3 | Upper-storey setback (the storey below minus one whole room; `slab`) | 0.85 | 0.85 | 0.55 | 0.01 |
| B4 | Basement (probability ≈ 0.78, 9–20-cell target, placement, throw-away plan) | 0.80 | 0.85 | 0.40 | 0.01 |
| B5 | Footprint hand-off in (plan / w / h / entrance / floors; connected-part rule; holes; 11 × 11 cap) | 0.90 | — | 0.85 | — |
| B6 | Entrance choice (one per house; on a long side; exit room) | 0.85 | 0.85 | 0.40 | 0.02 |
| C1 | Recursive partition (bent bisection measured; `organic` / `mechanical`; the cut rule open) | 0.75 | 0.80 | 0.45 | 0.01 |
| C2 | Corridor merge, nooks and passages (`mergeCorridors`; `hallways`; one-cell rooms) | 0.70 | 0.80 | 0.40 | 0.01 |
| C3 | Room connection and doors (spanning trees; doors at run ends; three door kinds; rare loops) | 0.80 | 0.85 | 0.50 | 0.01 |
| C4 | Stairs between storeys (one per pair; same cell; outer-corner cell; U / L; trapdoor) | 0.90 | 0.90 | 0.65 | 0.01 |
| C5 | Spiral stair and stairwell (`findSpiral`, `rollSpiral`, `rollStairwell`; the stack runs through the basement) | 0.80 | 0.85 | 0.45 | 0.01 |
| C6 | Windows (per-role fixed / ratio demand capped by exterior edges; 0.32 module; `blank` / `transparent`) | 0.90 | 0.90 | 0.65 | 0.02 |
| D1 | Room-type registry and record (28 types; validators; fixed doors / windows) | 0.85 | — | 0.65 | — |
| D2 | Programme construction (the two printed lists; specials re-drawn per assignment run) | 0.90 | — | 0.80 | 0.02 |
| D3 | Role assignment (`assignSet` × 2 → `types2rooms` → `validate`; supply-limited; generic leftovers) | 0.80 | — | 0.45 | 0.01 |
| D4 | House naming (Tracery grammar) | 0.90 | 0.85 | 0.85 | 0.02 |
| D5 | Alternative room sets (Gothic / Tavern JSON5 programmes, `LoadedHouseType`) | 0.55 | 0.70 | 0.30 | — |
| D6 | Labels, renaming, numbering | 0.85 | 0.85 | 0.65 | — |
| D7 | Typed buildings — Taverns' programme-first method (separate generator) | 0.50 | 0.70 | 0.30 | 0.00 |
| E1 | Plan renderer: layer stack, cell-unit widths, walls, glyphs, grid / door / label modes | 0.85 | 0.95 | 0.85 | — (det. given model) |
| E2 | Colour schemes and wall styles | 0.85 | 0.80 | 0.70 | — |
| E3 | Room lights (skeleton-summit chain, wall lights, per-room toggles) | 0.85 | 0.85 | 0.70 | 0.00 (unseeded in the reference) |
| E4 | Vector ambient occlusion | 0.85 | 0.85 | 0.70 | — |
| E5 | Abstract furniture and props (`Clutter` packing named only) | 0.75 | 0.80 | 0.35 | 0.01 |
| E6 | Roofs (one layer per storey; one hip face per outline edge; shades, tiles, chimneys, spiral cone) | 0.85 | 0.85 | 0.75 | 0.02 |
| E7 | Elevation (Tiny Pubs facade sections; four sides; fortified; fading; dark) | 0.60 | 0.65 | 0.30 | 0.01 |
| F1 | Blueprint editor | 0.90 | 0.85 | 0.80 | — |
| F2 | Restrictive rerolls (Shift+Enter, Ctrl+Enter, elevation R; on the loaded stream) | 0.90 | — | 0.80 | 0.02 |
| F3 | Renaming and view toggles | 0.90 | 0.90 | 0.80 | — |
| G1 | JSON export | 0.95 | — | 0.95 | — (det. given model) |
| G2 | SVG / PNG / Advanced export | 0.85 | 0.90 | 0.80 | — |
| G3 | The settlement → building hand-off contract (receiver exact; senders unmeasured) | 0.70 | — | 0.55 | — |
| H1 | Scale envelope | 0.90 | — | 0.70 | — |
| H2 | Performance envelope | 0.90 | — | 0.60 | — |

### 9.4 Headline numbers as ranges, with drivers

| dimension | ruled | range | unweighted mean | drivers up | drivers down |
|---|---|---|---|---|---|
| functional | **0.80** | 0.75–0.84 | 0.83 (39 rows); heavy rows 0.80 | every output law measured at cell exactness (12 exports, 318 walked storey views); the whole option surface pressed; four laws now generative (setback, stair cell, entrance side, window demand); the receiver side of the hand-off exact | the partition texture and the merge (a third of rooms are one-cell strips whose arising is unexplained; targets per partition mode); the sender side of the hand-off unmeasured; the elevation a second generator; the never-exercised surfaces (Gothic / Tavern, Numbers labels, grid patterns, wall styles, export layouts); −0.02 cross-stage interactions |
| visual | **0.82** | 0.77–0.86 | 0.83 (25 rows) | the renderer is the SVG (E1 0.95); every glyph, width, layer and gradient pinned; the massing and texture measured | every measured render is one style configuration; four schemes, four wall styles, grid patterns, door leaves, the elevation and the alternative room sets are one image or a piece count each |
| algorithm identity | **0.58** | 0.50–0.64 | 0.63 (39 rows); heavy rows 0.54 | the completest skeleton of the five (call census, stage trace, exports); the Lehmer stream CONFIRMED; encodings and the JSON writer exact; the bent-bisection class measured; the four laws | the cut rule, the merge predicate, the door price and loop rule, the validators' score, the packer, the elevation model; the sender half of the hand-off; the time-sorted trees and created-piece counts that had been read as evidence |
| seed-exact | **0.02** | 0.01–0.03 | 0.014 (22 generative rows); A4 stream-only 0.70 | the stream and the successor rule pinned; the load / Enter offset measured | 467–2 632 inlined draws per house; a clock reseed in ≈ 1 generation in 5; unseeded lights even in the reference |
| effort (Dwellings-alone parity) | **≈ 23 pw** | 19–29 | row sum 20.0 + 3.3 | the four measured laws remove design search; the encodings, renderer and exports are exact | the cut rule per mode and the merge interplay (the creator's five-year record, R-E); the elevation; the packer; a per-mode parity harness |

**Factual corrections carried from the lenses** (for `docs/confidence/dwellings.md`'s owner and the findings; the
full list is `dwellings-ruling.md` §4): (a) the paired `hallways` figures are `Room.new`, created pieces — surviving
rooms change +1/+3/+1/0/−1, created pieces 51 → 87; (b) the analyzer prints siblings by time, so "`Namer.get` runs
last" is not evidence — the conclusion (the name does not drive the specials) survives on `probe-keys.log` #1–#5,
the specials are re-drawn per assignment run, and the 1.0.1 name → special coupling is a stale statement; (c) both
exported stairwell stacks with a basement run through it — the 1.4.0 "except the basement" is not this build's rule;
(d) 29 distinct ground footprints behind 92 walked houses, "104 houses" double-counts the exports, and only four tags
change the cutter; (e) `_critic/permalink-decode.out.txt` is a stale receipt — cite `.entrances.txt`; (f) surviving
`Door` objects equal rooms − storeys in 32 of 92 houses (36 fewer, 24 more); (g) `new Date()` is in the *successor*
path (`assignSet → Random.reset → new Date()`, 4/4 vs 18/18), which corrects critic D16 / B12's "not in the seed path"
and bounds R5's "Enter is deterministic given the loaded state and key history" to clock-free histories; (h) the posts
lane's reading of the 1.3.0 entrance rule ("a narrower, taller front") is contradicted (a long side in 9/10); (i)
`spawnChimneys = 1` is a call count, not a chimney count; (j) the setback drops whole rooms, one per shrinking storey;
(k) each Shift+Enter / Ctrl+Enter runs `Random.reset` twice on the loaded house's stream.

### 9.5 What cannot be known from outside — Dwellings

Nothing below blocks functional or visual parity (each item is a rule or constant we would set and calibrate against
the 318 storey views and the twelve exports); it blocks *identity* and same-seed reproduction, and the only evidence
class that could close it is the one the clean-room ruling bars. The cut rule inside `Plan.divideArea` / `getNotch`
(which notch, which direction, where the bend goes, the stopping size, the acceptance tests between levels, what
`organic` / `mechanical` change) and whether the former `spacious` default is a mode of the same cutter (C1); the
corridor merge's predicate and the nook rule (C2); the door price function, the rare-loop rule and the `NULL` shaft
rule (C3); the stair search's tie-break among outer corners, U vs L and the pair order (C4); the spiral's corner
choice and the roll probabilities inside `randNFloors`, `rollStairs`, `rollSpiral`, `rollStairwell`, the basement roll
and the shape acceptance — outcome frequencies at n = 5–37 only (B1, B2, B4, C5); which leaf room the setback drops
and when none (B3); the basement's cell choice (B4); the validators' scores and the "best attempt" criterion, why
gallery and study never win (D3); the special draw's weights (D2); the identities of the four `Random.reset` points,
the argument of the `assignSet` reset and every inlined draw site — view keys advance the stream 1 987 draws with no
recorded call (A4, every S cell); the furniture packer (`Clutter.getForce`) and its per-type table, the light intensity
law and the jitter's size (E3, E5); the elevation model and the two JSON5 programmes' format (E7, D5); Dark Clues
(locked), the 2022 tweet and Taverns' method (D7); versions after 1.4.1 and seed stability across them.

### 9.6 The experiments that would move the numbers most — Dwellings (continuing §6's numbering)

| # | experiment | what it measures | cells it moves | expected gain | cost |
|---|---|---|---|---|---|
| 12 | **"Open in Dwellings" from NG, MFCG, VG and UP (and W in Tiny Pubs)**: read the URL each produces and decode it with `captures/dwellings/_critic/permalink-decode.mjs` against the source polygon | what a sender passes (footprint only? `floors`? `entrance`?), how a rotated or non-orthogonal lot is rasterised, what a lot larger than 11 × 11 becomes | G3 F / A (to ≈ 0.85 / 0.75), B5 | F +0.02, A +0.02 overall — the one gap item 28 is defined by | one session, no export, no approval |
| 13 | **The loop permalink** `?seed=1341473638&tags=large,slab` exported as JSON | trees by construction vs rare loops (a storey with E ≥ V); seed stability across versions | C3 F / A ± 0.05 | settles the tree ruling (critic B4) | one export — needs the owner's yes |
| 14 | **150–200 logged Enter generations** (`House.hx:41` + the draw pass storey list; console only) | roll rates for storeys, basements, spirals, stairwells and the `Tags.random` frequencies to ± 0.05 | B2, B4, C5, A1 | F +0.02, A +0.02 | one session, no approval |
| 15 | **The four measured laws re-run on the 318 walked storey views** (setback drops, stair cells, entrance sides, `Door` objects) plus a per-mode bend / notch fit | confirms or bounds the n = 12 laws at n = 92; the cutter class per partition mode | B3, C4, B6, C1, C3 | A +0.02–0.03 | on disk, half a day of stdlib scripting |
| 16 | **Never-exercised surfaces in one session**: Gothic / Tavern captures with coverage; an E-view draw capture of ten houses; the four wall styles' paint logs already on disk; Shade / Fade / Shrink toggled on one stepped house; a trapdoor house's JSON (export — approval) | the loader's lists, the elevation's op signature, the wall painters, Shrink, the trapdoor record | D5 (F → ≈ 0.80), E7, E2, E6, A3 | F +0.02, V +0.03 | one session (the export item needs approval) |

### 9.7 Evidence classes used and not used — Dwellings

**Used:** the three Phase-3 findings (`dwellings-posts.md`, `profile-dwellings.md`, `dwellings-exports.md`) with every
technique claim tagged and sourced, and the critic `_critic-dwellings.md` (17 binding rulings, 25 re-derivations,
62 quotation checks — 61 SUPPORTED, 1 WORDING); our own recordings (29 captures: 96 coverage houses with per-class call
counts, 49 profiled generations with call trees, draw and vertex records, 17 probes incl. every shortcut, seven
two-part plans, three fresh-browser Enter chains and 92 houses walked storey by storey); **the generator's own
exports** — a class no other reference had — twelve houses' JSON, SVG and PNG, owner-approved (`docs/PROGRESS.md`
J34–J35), read as data by the exports lane, the critic, both lenses and the synthesis lane; the creator's Patreon posts,
itch devlogs and comment threads at cited lines; the project's own analyzer (`profiler/analyze.mjs`) read to establish
what its trees mean; the two lenses' and the critic's stdlib scripts, re-executed. **Not used:** no captured bundle
(`Dwellings.js`) was opened by any of the seven Dwellings seats (posts, profile, exports, critic, assessor, two lenses)
nor by this one — class and method names come from the profiler's Haxe `__name__` attribution and from V8 error
stacks; no JSON5 programme or scheme file was read beyond its size; no source outside `/Users/cstokes/Desktop/Maps`;
in this seat no new capture, no export, no image viewed.

### 9.8 For the owner (plain language)

Dwellings is the house-plan generator our own floor-plan step will mirror in reverse, and after the two challenges and
this ruling it is the reference we can speak about most precisely. Two independent checks confirmed something the
assessment could not: it runs the same random-number engine as the city and neighbourhood generators, and the next
house's seed is simply that engine's state after a countable number of draws — so the chain of houses you get by
pressing Enter is knowable, except that about one house in five quietly re-seeds from the clock. Four rules the
assessment had called unrecoverable turned out to be readable from the twelve exported houses: an upper floor is the
floor below with exactly one room removed; a stair always sits against the outer wall, usually in a corner, with its
landing to the wall; doors sit at the ends of shared walls and prefer the longest ones; and each room type asks for
either a fixed number of windows or a share of its outer wall, which is exactly what the creator said. Against that,
the challengers showed the assessment had over-read some of its evidence — a call tree sorted by time was read as an
order of steps, a count of pieces created was read as a count of rooms, ninety-two houses stand on twenty-nine
distinct footprints, and nobody has yet watched a town generator hand a footprint to Dwellings, which is the one link
our own click will copy. Net: a team could build something that behaves and looks like Dwellings with about four
chances in five on both counts (functional 0.80, visual 0.82) in roughly twenty-three expert weeks; "the same
algorithm" is a little better than a coin flip (0.58, the best of the five references, because we hold its own
exported files); "the same house from the same seed" remains effectively nil, as for every reference. None of this
changes what we take from it — the cell-grid room model with doors, windows and stairs as records, the per-room-type
record, the stair devices fixed before the rooms are cut, the vector plan look, and the hand-off idea of passing a
footprint plus an entrance edge — and the two cheapest next steps are unchanged: click one building through from each
of watabou's town generators and read the address it produces (one session, nothing to approve), and, with your
approval, export the one house its author says contains a loop.

### 9.9 CONFIRMED vs PLAUSIBLE

* **CONFIRMED** (executed or read on disk in the judge seat): §0.2 #10 (seven modular exponentiations, this seat's
  own), #11 (ten scripts re-run: eight byte-identical, two identical in every computed line), #12 (`analyze.mjs`
  l. 130), #13 (the `RoofStack` counts against the exports' own storey levels, 12/12), #14 (the stale and the corrected
  receipt); every count quoted in §9.2 from a lens's executed measurement, re-read at the cited place in its output
  file; the synthesis lane's programme-vs-rooms table and the critic's outputs read on disk.
* **PLAUSIBLE** (judgment): every confidence number, range, effort figure and "partial" weighting in §9.2–§9.4 and the
  expected gains in §9.6; the reading that the vanished `hallways` pieces are removed by `mergeCorridors`; the
  clock-reseed mechanism (the stacks name the caller and the frame, not the argument of `reset`) and the
  mid-generation-reset reading; the null models' fairness (an irregular grower as the C1 control, a uniformly random
  spanning tree as the C3 null); every generalisation from the twelve exports' 13 setbacks, 38 stair ends, 95 doors,
  375 windows and 133 rooms to the build.
* **Not done:** no new capture, no export, no bundle, no image; the findings files were not re-read beyond what the
  assessment, the two lenses and the critic cite from them.

## 10. The preliminary corpus look, weighed — appended 2026-09-27 (Fable review, lane fable-review/main/manager-corpus)

On 2026-09-26 the owner's preliminary look at SettlementForge's map corpus (partitioned/corpus-preview/: look.md, plan.md,
history.md, CONFIDENCE-PREVIEW.md — walled off from the design until the reconciliation stage) was set against §1's
rulings. Fable ruling (docs/PROGRESS.md J83): **no figure in this document moves.** The corpus holds no measurement of any
competitor and no metric scale, its plates are AI-drawn in a painted medium none of the five references uses, and its
historical registry witnesses possibility, never frequency — so nothing in it bears on parity with a reference as
recorded, which is what §1 grades. The one thing that has left the partition is the palette-target exception the owner
opened on 2026-09-27 (docs/AMENDMENTS-2026-09-27c.md item 69): a design input, not a confidence input. Two plain figures
quoted to the owner during the Opus-managed windows ("about 85 % we match what their maps do, about 70 % how they look,
about 65–70 % their speed and simplicity, about two in three overall") are the stand-in manager's product-level estimates
for the fused base as designed, not this document's rulings (J81); §1's ranges remain the figures of record, with D-5's
acceptance test (the owner's eye plus the parity numbers). The preview's own first figure for *exceeding* the references
(about 60 %) is a judgment outside this document's scope, recorded in the partition. Everything else in the partition waits
for the reconciliation stage.
