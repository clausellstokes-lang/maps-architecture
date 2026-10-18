# code-impact — what reading the reference code changes in the design

> READER-TIER — behind the implementer firewall (owner directive 2026-09-27); logic in our own words; no code or assets copied.
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat code/_impact; queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `code/_impact`, 2026-09-27 (Opus 5.5 standing in for the Fable architect seat). Companion to the design-input file
`docs/AMENDMENTS-2026-09-27c.md` (items 33–62), which carries every editor instruction; this file holds the owner summary,
the per-generator overturns, the confidence note for the ruling seat, and the provenance table that §17.1's chain keys
into. To keep the later apply lane's phrase check clean, nothing below restates an editor text: rows point to item
numbers instead.

**Reading record.** Read in full: `_critic-code.md` (its rulings R1–R12 bind). Read in full for each of the six code
readings: the header, §0 (headline), §6 (corrections), §7 (open questions answered), §8 (unknowns), §9 (reading record);
also `code-mfcg.md` §2.0–§2.13 whole and `code-neighbourhood.md` §2.13 (the S8 recipe against the code). The other §2–§5
sections were consulted only through the §6 rows that cite them (the critic read all six cover to cover). Design read:
`docs/ARCHITECTURE.md` §4.6 whole, §1.3–§1.4 whole, §3.1 whole, §17.1 whole, §13.5's reference rows, and the passages of
§2.5, §2.6, §4.2 S3, §4.4, §4.5, §4.7, §4.8, §4.9, §5.1–§5.2, §6.1, §7.1, §8.2, §8.4, §8.10, §9.3, §12.7, §15.1, II.2, II.3
and PART III located by a scripted search for every reference claim the readings correct (search lists in the session
scratchpad `impact/grep1.txt`, `grep2.txt`); `docs/CONFIDENCE.md` §0–§2 whole.

## (a) For the owner — what reading the code changed, and what it did not

**In plain words.** Until today we knew the five competitors from the outside: we watched them, measured their maps and
guessed the rules behind them. Reading their compiled programs replaced most of those guesses with the actual rules.
The main effect on our design is modest and mostly good news.

*What changed.*
* **The way we cut blocks into lanes gets simpler and truer.** Our recipe for the narrow lanes inside a town was built
  from measurements of the Neighbourhood generator, and some of those measurements turned out to be side-effects of how
  we measured, not rules. Examples: we thought a coin decided where a cut starts — it is a fixed rule; we thought curved
  corners happen 53 % of the time "for no reason" — they depend on how sharp the turn is and how long the street is. We
  now adopt the real rules, restated in our own words and metres (items 34–41). The pictures should match the reference
  more closely with fewer knobs.
* **Several facts we relied on were misread.** In the Fantasy Town Generator data, what we called "lots" are patches of
  lawn, and what we called the "entrance" is where a building's night light is drawn. We withdraw every number built on
  those (items 49–50). The street-facing front door stays — it is your rule, not a copy of theirs.
* **Small, useful ideas to take over (in our own form):** how castle outlines are straightened, why some districts grow
  larger than others, how the number of gates shrinks for a coastal town, how buildings are given their raised "front"
  in the ink style, how labels prefer horizontal paths (items 45–47, 53–55).
* **Some of our "improvements" were aimed at problems the references do not have in the way we thought** — e.g. the
  Neighbourhood generator does not throw away 42 % of its plots by error; those are its courtyards by design. We keep our
  approach and correct the wording (item 42).

*What did not change.* The shape of our design. Every choice where we deliberately differ — real metres, a terrain model,
plots laid from the street front, no restart-on-failure, streams that make every map reproducible and locally editable —
stands. The code actually strengthens those choices: every one of the watabou programs lets the display settings or the
browsing history change what the next map will be, and one of them reads the clock mid-house; ours cannot, and we add a
test to prove it (item 52). The FTG server, which builds FTG's towns, is still unseen: its layout rules stay inferred.

*Cost of reversing.* Every adopted rule is a table row or a rule inside an existing stage; switching back to the old
recipe is a table change, not a redesign.

## (b) Overturned profile claims, per generator

Row ids are the readings' own §6 rows; each overturn is CONFIRMED on the bundle by its reader, and the critic re-derived
the ones marked †. "Refined" = the profile's direction was right, its mechanism or number was not.

**MFCG (itch 12710731; `code-mfcg.md` §6).** Overturned: the retry boundary — all nine stages retry, not six (1†);
"8·size + 4" seed points — 8·size plus a 6-point hexagon (2†); junction collapse threshold unknown — max(7.5, a third of the
face's mean edge) (3); domains as two splits (4); the 2017 wall-smoothing factor — three pinned Laplacian passes (5); the
≈ 0.8·√size gate fit — the cell law with a coastal factor (6†); the tower radius's role (7); equalise semantics and the bloat
trigger (8); the third search graph (9); the street search's priority open set — FIFO (10); the 2017 tidy-up (11); a
per-node river width — one width per course (12); a 40–50 try cap on canals — one try per candidate (13); where farms,
shanty towns and districts run (14); `buildCityTowers` as landmarks (15); the bisector as OBB-only with frontage snapping
(16†); a uniform setback — a per-lot random recession (17); the 2017 outskirts density — interpolated vertex weights (18);
buildings as landmarks only (19); farms by grid cutting (20); a domain-warped Poisson field — a torus tile for trees (21);
the label ridge as the longest root-to-leaf path (22); Tracery plus four Markov corpora — Markov unused (23); a `farms`
URL key (24); population ≈ 6.12 per building — 6 per lot, rounded up (25†); an offset roof — the Raised elevation (26);
two anonymous-closure and helper identities (28, 29); unexplained scale — 4 m per unit (30). Refined: gate picking (31);
weathering and tints (27); two counters (32, PLAUSIBLE).

**Village Generator (1.6.9 = itch 19365073; `code-village.md` §6).** Overturned: the retry "sometimes seed + 1, sometimes a
fresh draw" — one generator step (C1†); `trees` as a deliberate stream (C2); resolve as a dependency table (C3); the
roadhouse/hamlet band (C4); per-building household draws — one draw per village (C5†); rounding to 10 — two significant
figures (C6); marching-squares shores (C7); bank-shaping deflection — a road-steering field (C8); per-type level routines
(C9); pooled noise tables (C10); flexibility as turn freedom (C12); a bridge as one step (C13); trackers stopping at water
(C14); three square morphologies (C15); the square's tower as a prop (C17); flood-filled forest patches (C18); `grove` as
radial clusters (C20); a warped sampler (C21); the forest's tiling (C22); fields negotiated with the forest (C23); rejection
sampling with a field test (C24); special buildings at the square (C25); view-computed normals (C26); preset iso-levels
(C27); the tide-line count (C29); the outline blend (C31); `Bloater` as inflation (C32). Refined: the dig operand (C11), the
centrepiece odds (C16), knot offsets (C33), the seed's entry (C34), the density form and its uses (C35–C36). Old-build
facts not in 1.6.9: C19, C28 (PLAUSIBLE). The critic also corrected the reading itself: the folded draw's mean is 7/30,
not 0.28 (R1), and a no-crossing subtraction never alters the piece (R2).

**Neighbourhood (1.2.2 = itch 11441280; `code-neighbourhood.md` §6).** Overturned: an extent stop test — area against a
per-node random threshold (1†); frontage snapping — shallow-bend flattening (2); the position "gate" — colour clamping (3);
no corridor in the plain bisector (4); width jitter and the free-end term — a seed-drawn power law, checked (5–6†); a coin for
the start side (7†); the far side from the start — from the corner (8†); the corner at half the projection (9); the
straight cut on a mean normal (10); 53 % fillets with no predictor, tangent 0.73 × leg — an angle-and-leg rule over the
whole leg (11–13, checked); the meaning of the two retry messages and the silent-drop story (14–15); "no whole-map retry"
(16); ring roads as polar samples (18); the ring centre as a grove (19); block-content weighting (20); lot discards (21);
a corridor setback (22); ridge re-rolls (23); hatching construction (24); the roof colour law (25); depth-sorted trees (26);
the crown recursion (27); `spawnPin` wells (28); manor walls (29); unused water colour (30); palette re-parsing (31); a
per-generation Poisson field — a session cache (32); two framework routines taken for NG's (34); four tag slots (35); "no
metric" — 0.35 per unit in the export (36, metre reading PLAUSIBLE); the title-corner rule (37); the optional-rule weight
(38). Refined: inexact arrivals (17, PLAUSIBLE explanation); the view framing (33).

**Fantasy Manor (1.0.0, build 890; `code-manor.md` §6).** Overturned: the hip block as the wing's footprint (1); arcs as
four-wing U/C shapes — 2–7 wings (2); the ring's shape vocabulary (3); two screenshot readings, resolved by replay (4, 22);
square hip blocks as pyramids — square towers (5); unknown collision pairs (6); dormers as uniform rows — mostly projecting
cross-gables (7); tower placement and rings (8); the porch-less doorway rule and the 14 % without an entrance (9); grass at
the entrance (10); stones shrinking with distance — survivorship (11); the ground colour and grain order (12); fit-to-view
scale — fixed (13); whole-building rotation (14); the hotkeys (15); what New lighting re-rolls (16); a blurred shadow — a
swept silhouette (17); the painter's order (18); the simplified view (19); `zigzag` (20, dead code); the C-pair count drop
(21); "no seven-wing building" (23); an unrecoverable seed — the load millisecond (24); the stage-3 cost basis (25,
PLAUSIBLE timing). Confirmed: three inferred facts (26).

**Dwellings (itch 17195045; `code-dwellings.md` §6).** Overturned: shape tests on the footprint — a cell-count band alone
(C1, replayed); unknowable storey odds — a closed form (C2, replayed); the ≈ 0.78 basement roll — n/(n + 1) (C3†, replayed);
a basement size target — a coarse room (C4); notches as re-entrant corners (C6); unknown stop and acceptance (C7†);
hallways as door-less openings (C8); "every storey is a tree" (C9); the door price (C10); non-`Door` exported openings
(C11); door kinds (C12); the stairwell rate (C13†); the trapdoor's JSON form (C15); validator scoring — yes/no predicates
(C16); name-coupled specials (C17); an absent bathroom rule — present but dead (C18); the pipeline order (C20); "deterministic
per permalink" — a clock rewind in all-first-list houses (C21–C22†); "draw order unpinned" (C23); the light jitter's removal
(C24); force-based packing (C25); the plan-code round trip (C26); tag-conflict order (C27); grown rooms (C28); window
counts (C29); "avoid the longest wall" — the reverse (C30†); what Shift+Enter keeps (C32); the elevation link (C33); the
programme format (C34); an ignored interior entrance (C36). Refined: the upper-storey rule (C5), stair-cell counts (C14),
roofs (C31), role order (C35, partly PLAUSIBLE).

**FTG client (`code-ftg-client.md` §6; the server generator remains unread).** Overturned: edge type 6 as rural lanes —
stone fences (C1†); the wall as a tower chain only (C2); road class labels (C3); field 9 as lots — lawn and other ground
textures (C4†); 8.6 as the entrance — the night-light anchor (C5); 8.8 as a variant index — a roof-shape enum (C6);
heights absent (C7); no WebAssembly (C8); round-robin sprite variants — seed strings for procedural meshes (C10); unseeded
forest fills — a seeded jittered grid (C11); no seed control (C12); a client-side lit-window model (C13); a streaming WASM
decoder (C14); the export schema (C16); mitred road joins — round discs (C17); a wealth/type colour ramp — material only
(C18); a painted drop shadow — a shadow map (C19); texture roles (C20); the water distance maths (C21); invented lighting
curves (C22); stock effect passes (C23); a label spine (C24); snapping units (C25); client-side legality rules — none
(C26); the regenerate area as a free polygon — road-graph faces (C29); fill dense as a client tool — a server service
(C30); SVG and JSON contents (C31–C32); bridges as objects (C33); optimistic concurrency (C34); hedgerow rendering (C35).
Confirmed or refined: C9, C15, C27, C28 (the factor of two, if real, is server-side).

## (c) Confidence note — for the ruling seat that re-rules `docs/CONFIDENCE.md`

`docs/CONFIDENCE.md` defines algorithm identity (A) as the chance that a derivation from the program's evidence base
matches the reference's algorithm, and seed-exact (S) as same seed → same map; its §1 says A "sits at 0.53–0.58 for
every reference" because the shaping heuristics were unpublished, and S ≈ 0 because "without source, no draw order". Both
premises are now false for the five Haxe programs: their shaping rules and draw sites are read (reader-tier). Two
distinctions the ruling seat should keep: the **knowledge** figure (what the evidence base now pins) moves a lot; the
**product's** identity to a reference is a design choice (amendments 33–61 adopt some mechanisms and keep ours for
others), not a probability, and seed-exact reproduction is never a product goal (firewall; restatement harnesses are
test instruments only, R9).

| reference | A now | A proposed (range) | why it moves | what holds it down |
|---|---|---|---|---|
| MFCG | 0.53 (0.45–0.60) | **0.85 (0.78–0.91)** | all 111 app classes and the geometry and utility packages read in full; every stage's rule and constant [READ]; 8 critic re-derivations (one wording fix) | no replay executed in that lane (critic G6); engine float and sort order unexamined; shared packages not diffed across builds (G5) |
| VG | 0.55 (0.48–0.60) | **0.78 (0.70–0.85)** | 49 of 70 app classes in full incl. the terrain, density, tracker, square, house, field and forest builders; the retry rule executed on 3/3 recorded pairs | roofs, night lights, palisade and bridge views unread; the 09-21 build 19251041 unread (P5); no replay; two reading errors found by the critic (fixed facts, not the algorithm) |
| NG | 0.55 (0.48–0.62) | **0.88 (0.83–0.93)** | 48/48 app classes read; the width law, the fillet rule, the flatten threshold and the template widths **executed against the captures** (rms ≤ 0.0008 from the seed alone) and re-executed by the critic | the tree bulge threshold not re-read; framework classes search-only; the build is superseded (R-G) |
| FTG | 0.55 (0.48–0.60) | **0.57 (0.50–0.63)** | wire format, renderer, editor, exports and render-time fills read — those rows rise to ≈ 0.85 | the generator is server-side and absent: the layout rows that carry most of the map (R-H weighting) stay ≈ 0.53; the geometry worker was not captured |
| Dwellings | 0.58 (0.50–0.64) | **0.80 (0.72–0.86)** | the model package read 53/53 (the continuation seat re-read 54 classes); the specification stage replayed on 92/92 houses and the footprint on 13/13 shapes | no partition replay; painters and the Tiny Pubs kit skimmed; the class count is ± 5 (R11); the sender side of the hand-off lives in other bundles |
| Fantasy Manor | — (not in the file) | **0.95 (0.90–0.98)**, S 0.90 (0.80–0.95) | every class read; 51 recorded generations replayed exactly (39 counters, every roof-facet and stone colour) | only library rasterisation unread; the 2020 build's constants unknown — suggest adding FM as a sixth row, since stage 3 cites it |

**Seed-exact (knowledge, research-side replay feasibility; the product never targets it).** MFCG 0.02 → 0.35 (0.20–0.55):
every draw site read, but no replay ran, render draws feed the successor and sort stability is untested. VG 0.01 → 0.30
(0.15–0.45): the same, plus unread render classes that advance the naming stream. NG 0.02 → 0.55 (0.40–0.70): the per-map
parameter draws already replay exactly; the session tree cache makes some Enter-reached maps history-dependent.
Dwellings 0.02 → 0.45 (0.30–0.60): specification exact on 92/92; partition not replayed; all-first-list houses read the
clock. FTG 0.00 unchanged (server). Functional and visual cells move little (the readings mostly confirm what the
measurements showed); the ruling seat may raise NG's and MFCG's heavy-stage F cells where a rule, not a fit, now stands
behind them. All figures here are judgments (PLAUSIBLE); the facts they rest on are CONFIRMED as the table says.

## (d) Provenance — every adopted or calibrated idea, with its source (the §17.1 trace keys)

Class names are citations (reader-tier); the design and the digest carry only the P-id and the behaviour (item 62).
"A-item" = the amendment. Grades: every row [READ], CONFIRMED on the bundle cited by its reading; ✓ = re-derived by the
critic; ⚙ = executed against captures by the reader.

| P-id | idea as the design takes it | reference, build | source class (citation only) | reading § | A-item |
|---|---|---|---|---|---|
| P1 | a stop threshold drawn per face, skewed toward the band's low end | NG 1.2.2; MFCG 12710731 | `neighbourhood.utils.Bisector.isSmallEnough`; `mfcg.utils.Bisector.isSmallEnough` | NG §2.2; MFCG §2.11.3 ✓ | 34 |
| P2 | cut position mixing centroid fraction and a bell; holed variant | NG 1.2.2 | `Bisector.makeCut`; `BisectorEx` | NG §2.2, §2.4 ✓ | 35 |
| P3 | start run = the crossed run most parallel to the long axis | NG, MFCG, VG | `Bisector.makeCut` (all three) | NG §2.2; MFCG §2.11.3 ✓ | 36 |
| P4 | corner before far side; far side = most perpendicular reachable run from the corner | NG, MFCG, VG | `Bisector.makeCut`, `Bisector.split` | NG §2.2 ✓ | 37 |
| P5 | shallow-corner flattening (height or 2 % of chord); straight-first square test for the MFCG preset | NG 1.2.2; MFCG 12710731; VG 1.6.9 | `Bisector.detectStraight`; the square test in `mfcg.utils.Bisector.makeCut`, `village.utils.Bisector` | NG §2.2 ⚙; critic X2–X3 ✓ | 37 |
| P6 | fillet odds from deflection and leg length; tangent over the whole shorter leg | NG 1.2.2; MFCG 12710731 | `Hood.semiSmooth`, `Hood.getArc`; `WardGroup.semiSmooth` | NG §2.3 ⚙; MFCG §2.11.2 | 38 |
| P7 | retry in a frame turned 36° | NG; MFCG | `Bisector.makeCut` attempt loop | NG §6 rows 14–15; MFCG §2.11.3 ✓ | 39 |
| P8 | saturating power law of cut length for lane width | NG 1.2.2 | `Hood.getStreetWidth`, `Settings.processTags` | NG §2.3 ⚙ ✓ | 40 |
| P9 | area-scaled uniform front recession with a floor | MFCG 12710731; NG 1.2.2 | `Block.indentFronts` (MFCG, "Offset" processing); `Normal.indentFronts` (NG) | MFCG §2.11.4; NG §2.6 | 43 |
| P10 | thinness bloat, then steps toward the best-fit regular polygon; the same for the equalise brush | MFCG 12710731 | `Castle.adjustShape`, `Castle.equalize`; the warp tools of `WarpScene` | MFCG §2.4, §2.13 | 45 |
| P11 | coastal reduction of the gate count (0.75 on the size term) | MFCG 12710731 | `CurtainWall.buildCityGates` | MFCG §2.4 ✓ | 46 |
| P12 | three pinned smoothing passes on the wall ring | MFCG 12710731 | `City.buildWalls`, `CurtainWall` | MFCG §2.4 | 46 |
| P13 | per-seed-kind growth rates for districts | MFCG 12710731 | `DistrictBuilder.growAll`, `Grower.grow` | MFCG §2.10 ✓ (params) | 47 |
| P14 | candidate annulus [r, 1.1 r] on a torus | MFCG, VG, NG, Dwellings | `PoissonPattern` (each app's copy) | critic X8; MFCG §3.9 | 53 |
| P15 | class ratios of the raised front (house : landmark : farm) | MFCG 12710731 | `BuildingPainter` (Raised elevation) | MFCG §2.12 | 54 |
| P16 | label path preferring horizontal spread | MFCG 12710731 | `CurvedLabel`, `Ridge` (label overlay) | MFCG §2.12 | 55 |
| P17 | field sectors claimed outward from the settlement | VG 1.6.9 | `Farmland` (pick, filter) | VG §2.13 | 57 |
| P18 | farm-cell recursive split with skewed cuts and paths | MFCG 12710731 | the Farm ward's geometry; `City.buildFarms` | MFCG §2.7, §2.11.5 | 57 |
| P19 | ring courses from a smoothed jittered hexagon, widening spacing, centre choice | NG 1.2.2 | NG's ring template (`model.templates`) | NG §2.1, §6 rows 18–19 | 58 |
| P20 | pin weight decay after a pick | NG 1.2.2 | `Empty` (model.content) | NG §2.8, §6 row 28 | 58 |
| P21 | five layout families as path-shape rows | Fantasy Manor build 890 | `ManorScene.getPoly` and its five routines | FM §2.2 ✓ | 59 |
| P22 | the preset's light: an ambient term with a single directional sun that moves on an hour path, a dim moon taking the same path by night, the direct light only when the weather is clear or snowy, shadows cast by extruded footprints through a shadow map, and one night light for each lit building, at an anchor of its own | FTG client, bundle of the 25 September 2026 capture | `Sun`, `useSunPosition`, `sunDirection`, `getColourForTime`; `BuildingLights`, `lightPositionsForBuildings`; `BuildingsRender` (the shadow map) | FTG client §2.2, §2.5.5, §2.5.6; C5, C13, C19, C22 | 68 |
| P23 | per wing a prism shadow — its footprint offset by its height away from the light — with trees and pins shadowed alike, the whole layer multiplied at one alpha; by night an ambience colour washed over the view and, by a chance per building, a radial glow | NG 1.2.2 | `ShadowLayer`, `HoodView`, `BuildingView` | NG §2.11 | 68 |
| P24 | each roof facet shaded diffuse plus specular from one light direction; the shadow a silhouette of the drawn building swept along an offset and multiplied | Fantasy Manor build 890 | `ManorView.prepareColors`, the `ManorView` element drawers; `visuals.Shadow` | FM §2.10–§2.14, §6 rows 16–17 | 68 |

Descriptive baselines (numbers quoted, no mechanism adopted): D1 MFCG population 6 per lot rounded up (`TownInfo.update`,
✓; A-item 48); D2 Dwellings basement n/(n + 1) (`Specs.process`, ✓ ⚙; A-item 60); D3 Dwellings loop rule — half the
non-redundant extras kept (`Plan.connectRooms`; A-item 60); D4 Fantasy Manor's entrance-less share ≈ 14 % (`Wing.spawnPorch`,
the `Manor` constructor, ⚙; A-item 59); D5 VG's village observations (`Region`, `Tracker`, `SquareBuilder`, `Farmland`,
✓ in part; A-item 61). Withdrawn (no provenance survives): FTG field-9 "lot" figures and the 2.99 m "entrance" (A-items
49–50; `convertGroupedTextures`, `lightPositionForBuilding` in the client bundle).

## CONFIRMED vs PLAUSIBLE

CONFIRMED: every code fact this file and the amendments rest on was read on disk by the readers (and ✓/⚙ rows re-derived
or executed); this seat verified the design passages by reading them and checked the gate-law arithmetic of item 46 by
hand (the coded law and the proposed waterfront rule agree at 4 / 7 / 10 / 14). PLAUSIBLE: every confidence figure in (c),
the metre readings of NG's and VG's export scales, the Fantasy Manor timing, the attribution of the design's "49 %" figure
to F13, and the judgment in each ruling.

**What Fable should re-check first:** item 37's choice of NG's flatten mode as the base default (against MFCG's
straight-first for the intramural fabric); item 34's switch of the stop threshold from a fixed bound to a per-face draw
(it changes the band rows' meaning before M-1); item 45's order change for the castle repair; item 52's claim that the
design is already history-independent; and the (c) ranges.

## Fable review (2026-09-27) — A-code/_impact

Verdict **CORRECTED** (Fable 5.1, lane fable-review/main/code; `docs/fable-review/main/code.md`; the evidence gate and its
completion appended to `docs/AMENDMENTS-2026-09-27c.md`). Items 33–62: every ruling and evidence gate stands against the
readings and the live design text, with every claim an item rests on re-derived in code by this seat (receipts in the review
file). Parts marked HOLD — PLAUSIBLE: item 37's 0.7 m origin RELEASED as a labelled inference (J-Fcode-2); item 49's 49 %
REJECTED as a deletion and kept with its true source, F4 (J-Fcode-4); item 58 (f) RELEASED labelled; item 59's timing RELEASED
as a restatement measurement, re-measured (J-Fcode-5). Editor texts corrected: item 39 (no console strings in the design,
J-Fcode-1) and item 46 (the coastal rule approximates the coded cell-count law, J-Fcode-6). Item 37's `flatten` default stands
(J-Fcode-3). The "check first" questions are answered in the review file. Section (b)'s per-generator overturn lists are
CONFIRMED (each reading's §6 checked whole). Section (c)'s ranges are judgments (PLAUSIBLE) and reasonable as knowledge
figures for the CONFIDENCE ruling seat; two notes — Fantasy Manor deserves its own row (its replay now re-executed by two
seats), and VG's range could sit at 0.80–0.85 after this review re-derived its whole model pipeline (no change forced).
Section (d)'s provenance rows name classes only as citations; P1–P21 and D1–D5 each rest on a rule this seat re-derived, and the
withdrawn F13 figures are correctly withdrawn. The Ruling summary's "KEEP OURS 18" against the table's 17 is cosmetic.
