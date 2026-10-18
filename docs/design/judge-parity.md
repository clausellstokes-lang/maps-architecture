# judge-parity — panel judgment, lens: CAPABILITY PARITY AND FUSION FIDELITY

Lane `design/judge-parity`, seat run 2026-09-25 (Claude Fable 5.1). One of three judges on the panel over
`docs/design/proposal-{kernel,pipeline,product}.md`. Status: **COMPLETE**. Layout: §0 reading log · §1 anatomy of the
three proposals · §2 capability walk (MFCG, FTG, NG, VG, renderer list) · §3 counts per tier · §4 fusion fidelity ·
§5 stage-2 readiness · §6 village preclusion · §7 scores, strengths, flaws · §8 winner · §9 grafts · §10 CONFIRMED vs
PLAUSIBLE.

**Verdict in one paragraph.** All three proposals converge on the same substrate (integer-centimetre DCEL, terrain-first
site, keyed sub-streams, frontage-first plots, prosperity field, plot model with heights, display list with layers, edit
log) and cover the MFCG and FTG capability tables almost completely; the differences that decide this lens are in four
load-bearing mechanisms — how secondary streets arise, how districts are formed, how the bent cut is constructed, and
what the district → neighbourhood interface may do. **proposal-kernel wins** (84): it is the only proposal that
implements the fusion thesis as written (FTG-shaped staged growth for secondary streets *and* NG bent-cut infill *and*
MFCG's grower for districts) with explicit legality, constants from the measured NG signature and a hole-aware cut, and
its two real defects (an infill stop predicate that reads the district band before districts exist; no gate-plaza rule)
are cheap. **proposal-pipeline** (76) is precise and complete but demotes FTG's growth to a preset, so its default fabric
is MFCG/NG partition from district scale down with FTG wrappers; it has the best stage-2 seam contract and the best
locality engine, which must be grafted. **proposal-product** (71) has the strongest visual-parity and content-loop
sections and the most faithful fusion *intent*, but three load-bearing mechanisms are under-specified: district formation
(tier-1 faces are never bounded or split to a district band), a refine-only neighbourhood interface that precludes NG's
templates, and a bent-cut construction that does not guarantee the measured right-angled arrival.

## §0 Reading log and method

* Read first, in full: `research/findings/_critic.md`; then `_critic-ftg.md` (full), `_critic-vg-ng.md` (full),
  `_critic-os.md` §0, §2, §3 (its §1 constants table and §4 draw order bear on seed-exact MFCG reproduction, not on
  this lens; not read).
* Read in full (every line): `docs/design/proposal-kernel.md` (1 365 lines), `proposal-pipeline.md` (1 703),
  `proposal-product.md` (993); `docs/CONFIDENCE.md` (801) including all four ruled capability tables §4.1–4.4.
* Read as checklists, in full: `docs/confidence/mfcg.md` §2 (the 40-row matrix with per-row Known / Must-invent prose,
  lines 83–643); `docs/confidence/ftg.md` §2 (46 rows, lines 78–290); `docs/confidence/ng.md` §2.0–§2.C (lines 150–492)
  and §3 (650–679); `research/findings/visual-spec.md` §5–§7 (626–721: comparison, the 20-item renderer list, open
  questions); `docs/confidence/vg.md` §4 summary table and §8 caveats (preclusion only).
* `docs/IMPROVEMENTS.md`: read in full §1, §3.1, O4, §3.2 (S1–S6), §3.3 (V1–V3), §4 (R1–R16 keep-tests), §5 (the split,
  hooks, stage-2 list), §7.1 (judgment calls). Not read: the other O-sections (their acceptance letters are reproduced
  in all three proposals' improvement matrices and were checked there), §6 traceability, Appendix A.
* Not read: `docs/confidence/*-challenge-*.md` (their rulings are in CONFIDENCE.md §3); the findings files other than
  visual-spec (their facts reach this lens through the critics, CONFIDENCE and the proposals' citations); the post-critic
  addenda in `profile-*.md` directly (their rulings are restated in the task brief and in `_critic-vg-ng.md`); no
  captured bundle, no raw post, no capture file. Every file the task names exists on disk (checked by `ls`), so no
  "lane did not land" caveat applies.
* Reading budget: ≈ 350 k tokens, the switch point; the selective reads above are the consequence and are recorded here.
* Method: for every capability row I ask "is there a MECHANISM in the proposal that would produce this in the BASE, or
  only an assertion / a matrix cell?" and tag **C** COVERED (a mechanism that would work), **T** THIN (named, mechanism
  incomplete or contradicted elsewhere in the same file), **X** MISSING (the proposal's own interface or stage graph
  precludes it as written), **M** MODULE (delivered by the optional content/simulation module, which J-S in
  IMPROVEMENTS §7.1 allows), **D** DEFERRED-OK (correctly a hook or should-have by the owner's scope), **S** STAGE-2
  (delivered by the neighbourhood stage through an interface the base carries). Fusion fidelity (§4) is judged stage by
  stage against IMPROVEMENTS' J-F thesis, the owner's DESIGN TIEBREAKER and the R1–R16 restraint tests.

## §1 Anatomy of the three proposals (where they differ)

| axis | kernel (PLAT) | pipeline (Burgh) | product |
|---|---|---|---|
| backbone | S4 arterials routed (heap A\*) between named destinations on a ≈ 25 m jittered lattice (§4.5) | S5 stage-0 arterials routed on a raster cost surface; growth stages add *least-cost connectors* between arterials (§4.4) | P3 tier-1 arterials as shortest paths on the cost lattice (§5.3) |
| secondary streets | S5 FTG-shaped proposal queue (destination-biased, curvature-continuous, branch after n, explicit legality: separation, snap 0.35·step, split-on-cross, slope) inside a stage boundary (§4.5) | none by default — the FTG proposal queue exists only as a `NetworkStrategy` for the `ringed` / `american` presets; everything below arterials + connectors is bent-cut recursion (§4.4–4.5) | P3 step 2: staged growth "exactly in FTG's shape" (queue, priorities, legality, branch types, prune/trim) with a curvature term (§5.3) |
| districts | S6 grower (MFCG `DistrictBuilder` idea) claims coarse blocks with `validateEdge` (no arterial / wall / water) and `validatePatch`, typed by a data scorer, count ≈ 3.5·√(area_ha/10) (§4.7) | S6 the bent-cut engine at *district* level splits arterial faces to a 5–15 ha band, merges below the floor, types greedily from the largest with a mixed-use floor (§4.5) | P4 "the bounded faces of the tier-1 graph after stage k are district lots", typed by score, merge below `minDistrictArea` (§5.4) |
| block infill | §4.6 bent cut as a kernel transaction with constants from BG-2/PF-3 (t ~ N(0.5, 0.06) clamped [0.40, 0.60]; straight if within 2.5° of ⟂; corner at 0.5 of the course so the second leg arrives ⟂; fillet p = 0.5; two bends never; hole → slit; 4-rung ladder) | §4.5 the same construction (σ = 0.08 clamped [0.35, 0.65]; 2.3°; corner at the midpoint; p_arc ≈ 0.5; continuation across a lower-class street within 6°) with no hole step | §5.5 own construction: feet of perpendiculars from the OBB minor axis to e1/e2, then a *lateral offset* bend δ ≤ 0.15·\|p1p2\| at t ∈ [0.4, 0.6] |
| plots | S8 strips per frontage, corner rule, typed residue, joins/splits, rear lane when depth > 2 × band (§4.7) | S10 bent lot cuts ⟂ the frontage to a rear line, court interior, JOIN/SPLIT, claims first (§4.6) | P9 strips, corner rule, wedge class < 0.5 %, back-to-back residue, join/split (§5.6) |
| stage-2 interface | §4.9 `NeighbourhoodInput` (typed boundary, portals, L2/L3 faces, fields, ctx incl. sky, seed); the close-up may refine inside faces **or replace the base's plots with a template layout inside its boundary** | §4.9 `SeamContract` on every District from M1; `FabricStrategy` registry (BentCut now; Ring/Square/Street at stage 2) selected per district at S8 | §2.2 `NeighbourhoodRequest` / `NeighbourhoodResult` — the result is **additive refinement only** ("never a re-roll"); NG templates are "S4 context templates as data" with no slot that can replace fabric |
| sim depth in the base | roster + context vector + assignment + lazy people; schedules / calendar / factions' meetings / events in optional `@plat/sim` | same split (J-S) | roster + households + lazy people **+ schedules + calendar/clock + factions as data** in a module; events/relations later |
| evidence read for the parity rows | `docs/confidence/{mfcg,ng}.md` partly, `ftg.md` fully, `vg.md` summary; rows keyed to the assessors' §2.0 tables | `docs/confidence/*.md` outline only; rows keyed to CONFIDENCE §4.1–4.4 | `docs/confidence/*.md` outline only; rows keyed to CONFIDENCE §4.1–4.4; `visual-spec.md` in full |

## §2 Capability walk

Columns: K = kernel, P = pipeline, Pr = product. Only rows that are not C for all three carry a note; the note names
the section that fails and why.

### 2.1 MFCG — `docs/confidence/mfcg.md` §2 (40 rows; the ruled values in CONFIDENCE §4.1)

| id | capability | K | P | Pr | note |
|---|---|---|---|---|---|
| A1 | parameter surface / blueprint / URL | C | C | C | |
| A2 | RNG stream, seed chain, save/restore | C | C | C | all exceed (keyed sub-streams); pipeline's `Enter = seed + 1` is the only stated successor rule |
| A3 | pipeline structure and failure policy | C | C | C | ladders without the restart tier in all three |
| B1 | patch mesh | C | C | C | replaced by backbone faces in all three (by ruling O4); the "dense regular centre, coarser rim" look is carried by the stage density regimes |
| B2 | junction optimisation | C | C | C | |
| B3 | coast / water field / `sea` | C | C | C | three different closed-outline mechanisms, each explicit (K: level set of height − gradient(sea) + marching squares + fractalise; P: base line displaced by warped fBm, heightfield lowered; Pr: base shape + fBm + ease-into-detail envelope) |
| B4 | `buildDomains` | C | C | C | |
| B5 | curtain wall, gates, towers, watergate | C | C | C | K §4.8 has no rule for N < arterial crossings (P §4.8 diverts excess arterials along the wall to the nearest gate as a lane — the one explicit mechanism) |
| B6 | citadel / castle | C | C | C | `urban_castle` inside / on the enceinte / outside is explicit only in P §4.3; K and Pr site by score without the placement option |
| B7 | streets and roads | C | C | C | every gate ↔ plaza kept as the destination rule in all three |
| B8 | rivers / canals | C | C | C | river islets (MFCG posts-b §2.16; FTG's branch-rejoins-river island rule) are not produced by descent + tributaries in any proposal — a minor shared gap |
| B9 | districts | C | C | **T** | Pr §5.4: tier-1 faces are wedges between arterials that run to the frame; nothing bounds them to the stage extent or splits them to a district band (only the merge floor is stated) — a load-bearing gap (S1 contracts, typing, naming, walls all hang on districts) |
| B10 | ward → blocks (alleys) | C | C | C | Pr's §5.5 construction is not the measured one (see NG B3) |
| B11 | block → lots | C | C | C | frontage-first by ruling O5 in all three; courts from residue in all three |
| B12 | outskirts density falloff | C | C | C | P §4.8's distance-to-gate kernel per plot is the most explicit |
| B13 | shanty town / sprawl | **T** | **T** | **T** | a district type plus MFCG's trigger set (coast / river / roads) in all three; no placement or density rule for the fans — the same state as the reference (CONFIDENCE B13 F 0.65, "named, not described"); parity at the reference's level, no improvement claimed |
| B14 | plaza, temple, churches, gate plazas | **T** | **T** | C (partial) | K §4.7 S7 sizes `square` faces from population and names "gate squares" in the matrix only; P names "gate plazas by rule" without the rule; Pr §5.4 states the rule ("a small plaza face carved at each gate inside the wall"); the MFCG "small square next to each church" (79147510) is in none of the three (Pr has it only as a stage-2 typed square) |
| B15 | landmark / solid buildings, keep plan | C | C | C | keep by LIR in P and Pr; composition detail is stage 3 (D) |
| B16 | greens / parks | C | C | C | |
| B17 | farms and fields | C | C | C | |
| B18 | harbour, docks, piers | C | **T** | **T** | K §4.8: basin carved from the waterfront district, moles, piers at 12–20 m spacing; P: "harbour on the deepest waterfront face" and `pier` ways, no carving or spacing rule; Pr: harbour typed by construction and `pier` / `quay` way classes, no carving, mole or pier rule |
| B19 | trees and forests | C | C | C | K keeps MFCG's 140-point tile trick; Pr sets k = 30 (references 50) as a table value |
| B20 | elevation field | C | C | C | all exceed (real heightfield) |
| C1 | display modes | C | C | C | plot model + LOD + cadastral toggle in all three |
| C2 | roofs, Raised, Solids | C | C | C | |
| C3 | Offset | C | C | C | |
| D1 | naming | C | C | C | original grammar engines |
| D2 | district labels | C | C | C | hole-aware spines + collision + OBB-arc / straight / legend fallbacks |
| D3 | map furniture | C | C | C | emblem = "a later symbol" (K); compass reroll explicit in Pr |
| E1 | colour system | C | C | C | |
| E2 | stroke discipline, layer order, caching | C | C | C | Pr's layer order as data with the two recorded orderings is the most literal |
| E3 | alleys layer | C | C | C | |
| E4 | district view, framing, thin lines | C | C | C | |
| F1 | warp tools | C | C | C | |
| F2 | rerolls, renames, landmarks | C | C | C | |
| F3 | UI / hotkeys / size bands | C | C | C | app layer |
| G1 | export | C | C | C | |
| G2 | integrations | D | D | D | hooks by ruling (no external constraints now) |
| H1 | population and scale | C | C | C | |
| H2 | performance | C | C | C | |

### 2.2 FTG — `docs/confidence/ftg.md` §2 (46 rows; the ruled values in CONFIDENCE §4.4)

| id | capability | K | P | Pr | note |
|---|---|---|---|---|---|
| A1 | parameter surface, presets, save/load | C | C | C | |
| A2 | two-phase pipeline, staging, failure policy | C | C | C | roster as the demand side before geometry in all three; two-way reconcile |
| A3 | coordinates, units, wire format | C | C | C | |
| A4 | determinism | C | C | C | all exceed |
| A5 | server/client, persistence, lazy people | C | C | C | |
| B1 | size ladder, population, area budget | C | C | C | K §4.3 gives the only explicit budget formula (`A_stage = Σ n·plotArea/coverage/builtBlockShare`, builtBlockShare ≈ 0.62 from FTG's 38 %) |
| B2 | dependency-graph building selection | C | C | C | Pr §11 is the most faithful to FTG's documented loop (virtual population, core/shop pools, lifestyle bands, size and resource gates) |
| B3 | residents, jobs, backfill, matching | M | M | M | |
| B4 | people model | M | M | M | |
| B5 | government, religion, factions, military | C | C | C | data-first in all three; government gates the castle (P, Pr) |
| B6 | relations, friend groups, events | D | D | D | J-S |
| C1 | coast, islands, ponds | C | C | C | per-segment bank classes explicit in Pr (§5.2) and P (`bankKinds`) |
| C2 | rivers, branches, bridges, classification, direction | C | C | C | branch-rejoins-river islands missing in all three (see MFCG B8) |
| C3 | manually drawn water | C | C | C | |
| C4 | road-graph substrate | C | C | C | all exceed |
| C5 | road growth (queue, cap, lengths, stages, initial roads) | C | **T** | C | P: the queue is a preset strategy; the default base has no growth of secondary streets (§4.4) — present as a capability, absent from the fabric that the base ships |
| C6 | district lots: creation, merge floor, typing, order | C | C | **T** | Pr: formation gap (MFCG B9) and no placement-order rule; K states no order rule either (minor); P §4.5 types greedily from the largest with the shanty-after-first-half rule |
| C7 | district internal pipeline, placement modes, modifiers | C | C | C | Dense / Gaps / Individually placed map onto row / detached / compound site plans; the Small-tents modifier is a table row nowhere stated |
| C8 | lot → plot geometry | C | C | C | frontage-first by ruling |
| C9 | footprints, landmark templates, entrances | C | C | C | 3 m entrance rule in all three; non-rectangular landmark templates (stars, octagons) wait for stage 3 in all three |
| C10 | suburb stage | **T** | **T** | C | K: a suburb stage exists in the budget table and the S5 queue can branch and end cul-de-sacs, but the suburb rules (offshoots from perimeter spokes, invisible lot edges, density Bernoulli, small lots from the outset) are not designed; P: mapped to S14 ribbons with a density kernel — no offshoot or cul-de-sac mechanism in the default (FTG's measured 83 cul-de-sacs, 30.00 m streets, 14.70 m lot outlines are not reachable); Pr: "a stage with offshoots and small lots from the outset" on the FTG-shaped queue |
| C11 | walls and towers | C | C | C | |
| C12 | castle district | C | C | C | |
| C13 | harbours and waterfront districts | C | **T** | **T** | as MFCG B18 |
| C14 | outer settlement | C | C | C | |
| C15 | forests, tree areas, hedgerows | C | C | C | |
| C16 | landscape decorations, reserve, climate | **T** | **T** | **T** | decoration generators (ponds, copses, stone circles, ruins with trails) are a "table" or "typed symbols" in all three; climate presets are should-have in all three; a should-have-class gap shared by all |
| C17 | perimeter expand + round; decoration system | **T** | C | C | K: yard sub-areas and per-class decoration rows, no perimeter operation |
| C18 | naming, erosion | C | C | C | contraction as an EVO event in all three |
| D1 | renderer architecture | C | C | C | |
| D2 | palette and feature treatment | C | C | C | `lit` preset second by the owner's default |
| D3 | roofs | C | C | C | |
| D4 | water rendering, coast decoration | C (partial) | **T** | C | P: "beach/rock/cliff classes as coast-edge attributes (partial)", no depth ramp / foam programs; Pr §9.3 lists them as programs |
| D5 | day/night, weather, seasons, lights | M | M | M | should-have depth in all three |
| D6 | post-process effects | D | D | D | should-have in all three (cheap; CONFIDENCE F 0.95) |
| D7 | labels, scale bar, grid, legend, thematic layers | **T** | C (partial) | C | K §9 has no thematic-layer (matcher-driven) concept; P has style overrides per role; Pr has matchers by entity attribute |
| D8 | 3-D, street view, height maps | C | C | C | glTF export; no street view by restraint |
| E1 | layout editor | C | C | C | |
| E2 | regenerate area, bulk edit, constrained re-roll | C | C | C | all undoable and faithful (exceed) |
| E3 | entity editing, dictionaries, pins, notes, layers | C | C | C | |
| F1 | schedules, behaviours, sub-locations | M | M | M | |
| F2 | clock, calendar, sync | M | M | M | Pr's bridge event/command set is the most complete |
| G1 | export | C | C | C | |
| G2 | integrations | C | C | C | |
| H1 | data scale | C | C | C | |
| H2 | performance | C | C | C | |

### 2.3 NG — `docs/confidence/ng.md` §2 (32 rows) — stage-2 readiness: does the district → neighbourhood interface carry what NG needs?

What NG needs from the base (ng.md §3, IMPROVEMENTS S1–S6): an arbitrary boundary polygon with typed edges and fixed
portals; a template model where a template is "seed geometry plus how many sub-areas to hand to the generic bisector"
(CA-2) — which means the close-up must be allowed to *lay out* fabric inside its boundary, not only decorate it; a
hole-aware bisector for rings; the same bisector for lots; a block-content dispatch; greens, pins and the render tier;
seam-continuous fields; per-district sub-seeds; a metric (C8); a standalone no-portal mode.

| id | capability | K | P | Pr | note |
|---|---|---|---|---|---|
| A1 | tags, settings, URL state | S | S | S | |
| A2 | RNG, one stream, successor | C | C | C | per-district sub-seed in all three |
| A3 | pipeline / failure policy | C | C | C | NG's local retries are the F-CUT ladder in all three |
| B1 | hood outline | S | S | S | district face; standalone / sky outline from the coast routine in all three |
| B2 | templates area / street / square | S | S | **X** | K §4.9 rule (2): the close-up "may replace the base's plots with a template layout only inside its boundary"; P: templates are `FabricStrategy` registrations chosen per district at S8, so the *base* lays a ring or square district when the strategy exists; Pr §2.2: `NeighbourhoodResult` is "additive: refines existing entities, adds detail entities" and the request carries the base's `laid` fabric — no slot can apply a template; §16 tags B2/B7/B8 STAGE-2 via "S4 template data (§2.2)", but §2.2 has no such mechanism |
| B3 | bent recursive bisection | C | C | C (fidelity risk) | K §4.6 and P §4.5 follow BG-4 literally (leave ⟂ the start edge; corner placed so the second leg arrives ⟂ the far edge); Pr §5.5 fixes both ends as perpendicular feet from the OBB minor axis and bends by a lateral offset — arrival is ⟂ only when the far edge is parallel to the OBB major axis, so the ≥ 85 % right-angle arrival of R3 is not guaranteed by construction (claimed only as a calibration target) |
| B4 | hole-aware bisection (`BisectorEx`) | C | **T** | **T** | K §4.6: a cut that would cross a hole is routed to the hole's boundary (slit), the annulus becomes simply connected, same ladder; P §15.1 cites "RingFabric with the F-CUT ladder on holed faces; Clipper2 handles holes" but the §4.5 engine has no hole step; Pr cites "booleans + corridor subtraction on faces with holes" — the §5.5 procedure has no hole step either |
| B5 | street finishing (extend, fillet, width, corridor) | C | C | C | |
| B6 | block content dispatch | **T** | **T** | **T** | none states the weighted, area- and spacing-conditioned choice NG makes (CONFIDENCE B6); the four classes are reached by other rules in all three (greens by O19, manors by joins, empty by residue) — acceptable but a stage-2 item to write |
| B7 | square-template plaza | S | S | **X** | as B2 |
| B8 | ring-template seed geometry | S | S | **X** | as B2 |
| C1 | lots, setback, validation | C | C | C | typed residue, 0 discards, in all three |
| C2 | buildings, wings, roof kinds, landmarks | C | C | C | wings via the stage-3 interface in all three |
| C3 | manor compounds | C | C | C | set-back compound site plan |
| C4 | greens, groves, Poisson field | C | C | C | |
| C5 | trees | S | S | S | lobed-crown symbol in the base in all three |
| C6 | pins | S | S | S | probability gate named only by P |
| C7 | uneven streetwall | C | C | C | |
| C8 | size, scale, character knobs | S | C | C | metres in all three |
| D1 | naming | C | C | C | |
| D2 | title layout | C | C | C | emptiest-corner rule in all three |
| E1 | palette / style schema | C | C | S | Pr: `graphic` / `shaded` preset for stage 2 |
| E2 | canvas, layer order, stroke discipline | C | C | C | |
| E3 | roads rendering modes | S | S | S | |
| E4 | roof rendering | S | S | S | programs exist in the base in all three |
| E5 | shadows | C | C | C | prism / drop pass from stored heights |
| E6 | unrecorded style features | S | S | S | |
| F1 | toggles, hotkeys, renaming | S | C | C | |
| G1 | export, permalinks | C | C | C | |
| G2 | integrations (Procgen Mansion hand-off) | C | C | D | Pr: the stage-3 `BuildingGenerator` takes the plot and entrance directly (beyond the rasterised hand-off) |
| H1 | performance | S | C | S | P's ≤ 30 ms per-district regeneration budget is the one stated number |

Seam contract (S1) and seam-continuous fields (S3): all three carry typed boundary edges, portals, plot lines and
alleys on the boundary, field samples with hard/soft flags and a per-district sub-seed; P's `SeamContract` is a record
on every `District` from M1 with the 100 %-of-districts acceptance test written into M1's exit criteria — the strongest
form; K's is the `TypedBoundary` on `District` plus §4.9; Pr's is `District.contract: S1Contract` (§3.2).

### 2.4 VG — `docs/confidence/vg.md` §4 (44 rows) — preclusion only

All 44 rows are not precluded by any of the three: a strategy registry admits a tracker-style single-road network and a
"houses along ways" fabric (K `LayoutStrategy`, P `NetworkStrategy` / `FabricStrategy`, Pr `LayoutStrategy`); the
site model is course-first with a carved field and level-set water in all three; a density field type exists (K fields,
P `Field2D<'density'>`, Pr `fields.density`); `palisade` is a wall kind in all three; the size ladder is a table open
below TOWN in all three; VG's independent tree stream is a keyed sub-stream in all three. None pays for VG's relief
renderer, trackers or grammar. The one caution: K's five-level plat (L0–L4) assumes districts, blocks and plots as
levels; a village with houses along ways and no blocks would leave L2/L3 nearly empty — admissible (K §1.6 says nothing
assumes walls, districts or a market) but the level model is the least village-shaped of the three. Not a preclusion.

### 2.5 The renderer floor — `visual-spec.md` §6 (20 items)

P §8.3 names all twenty items and asserts the display list expresses each; Pr §9.1 derives a paint-program vocabulary
from the list (fill, stroke with join/cap, casing, bands, shadowPass, hatch with taper, roof, crown, halo,
glyphAlongSpine, texture + light, vignette, contourMarks) and is the only proposal that states the two recorded layer
orders as data and per-preset draw-style checks; K §8.3 names ≈ 17 of 20 (per-object gradients, vignette/glow masks and
dashed hatching are absent — all three are VG-preset items, not base requirements). All three meet the base floor
(MFCG + FTG looks); Pr is the most complete for the stage-2 tier.

## §3 Counts per tier (uncovered or hand-waved capabilities)

| tier | kernel | pipeline | product |
|---|---|---|---|
| BASE — MFCG (40) | **2 T** (B13, B14); 0 X | **3 T** (B13, B14, B18); 0 X | **3 T** (B9 load-bearing, B13, B18); 0 X |
| BASE — FTG (46) | **4 T** (C10, C16, C17, D7); 0 X; 6 M/D | **5 T** (C5 default, C10, C13, C16, D4); 0 X; 6 M/D | **3 T** (C6 load-bearing, C13, C16); 0 X; 6 M/D |
| STAGE-2 — NG (32) | **1 T** (B6); 0 X | **2 T** (B4, B6); 0 X | **3 X** (B2, B7, B8 — the interface precludes them as written); **3 T** (B3 fidelity, B4, B6) |
| VILLAGE — VG (44) | 44/44 not precluded | 44/44 | 44/44 |
| shared minor gaps (all three) | river islands by branch rejoin (MFCG B8 / FTG C2); church forecourt squares (MFCG B14); the Small-tents modifier (FTG C7); decoration generators (FTG C16) | | |

Improvement matrices: every must-have of IMPROVEMENTS §5.1 has a named mechanism and adopted acceptance criteria in all
three (checked row by row against §5.1 and §5.4); no proposal fails the "must-have without a mechanism" rule outright.
The two places where a must-have's mechanism is thin are Pr's O11 containment (districts, above) and P's O4 (growth
present only as a preset — the acceptance letters (a)–(g) are still runnable on its routed + connector network).

## §4 Fusion fidelity — best of both, or one reference plus bolt-ons?

The thesis the architects were held to (IMPROVEMENTS J-F, vetoable): a terrain- and water-first site model; FTG-class
staged, destination-driven road **growth** as the backbone (it extends naturally under the evolution hook and wins the
constraint-and-precision tiebreaker); MFCG/NG-class bent-cut infill inside blocks preserving the measured NG signature;
FTG-class content-first roster reconciled through a per-plot context vector; ids and sub-seeds in metres; one display
list. The tiebreaker: where MFCG-style and FTG-style genuinely conflict, the more constrained, real-unit, measurable
approach wins, with legibility and one click as a floor.

| stage | kernel | pipeline | product |
|---|---|---|---|
| site | new (O1); FTG's water-first order, VG's carve trick, MFCG's `sea` bearing — TB applied | same | same |
| units | FTG cm centred — TB | same | same |
| backbone | routed between named destinations (MFCG's gate ↔ plaza legibility on FTG's substrate) — TB applied and marked | same idea, on a raster cost surface | same idea |
| secondary streets | **FTG's growth**, made destination-aware and curvature-continuous, with explicit legality thresholds FTG never states — the fusion as written | **least-cost connectors + bisection**; FTG's queue is a preset. §1.2 credits FTG's growth as "the more constraint-driven shape" and then does not ship it in the default — an internal inconsistency; the EVO argument for growth (J-F) is answered by "a new epoch adds destinations and connectors on the same cost surface", which is true but is routing, not growth | **FTG's growth** "exactly in FTG's shape" with a curvature term |
| districts | **MFCG's grower over FTG's faces** with barrier edges (arterials, walls, water) — the most constraint-explicit district model of the three; typed by a data scorer | **new**: bent cuts at district scale to a 5–15 ha band — neither reference does this; the band is anchored only on FTG's 10 ha merge floor; precise and measurable but unmeasured against either reference | **FTG's faces** — but the faces are never bounded or split (§2.1 B9); as written the stage does not produce district-sized lots |
| infill | NG's bent cut with BG-2/PF-3 constants, hole slit, 4-rung ladder | same construction, no hole step | own construction (lateral-offset bend) — the R3 keep-test (right-angled arrival ≥ 85 %) is a hope, not a property |
| plots | new (O5) — TB: burgage frontages | same | same |
| walls | FTG's stage boundary + MFCG's gate identity; trace pulled to ridges and banks — TB: defence | same, with the only explicit exact-N mechanism | same, with the only explicit gate-plaza rule |
| content | FTG's roster, two-way | same | same, most faithful to FTG's documented loop |
| rendering / labels | display list; ink default; MFCG spines hole-aware | same | same, best evidenced |
| legibility floor | one click, sub-second budgets, negative-space streets at city LOD, 4-way share preset > 0 and < 15 %, T-preference | same | same |

Verdict. **Kernel** is a fusion in the sense the thesis meant: at every stage it names which reference's idea it takes,
which it discards and the measurable criterion, marks the tiebreaker rows, and its default base contains FTG's growth,
NG's cut and MFCG's grower and gate identity at once. Its one fusion-level defect is the sequencing gap of §2.1 (the
infill's stop predicate reads a district band that S6 has not yet produced) — a correctness gap in the stage graph, not
a thesis gap. **Pipeline** is a coherent, precise variant with a different split (FTG's substrate, staging, destinations,
junction law and metres; MFCG/NG's fabric at every scale below arterials) — not "one reference plus bolt-ons", but not
"growth as the backbone" either; under the tiebreaker its routing is defensible, under the "best of both" test it leaves
FTG's organic staged accretion — FTG's main layout contribution and the measured suburb signature — on the shelf.
**Product** states the thesis most crisply (§1 "the fusion thesis in one sentence", the rejected shapes (a)–(d), a
tiebreaker column per row) and then under-specifies three of the mechanisms the thesis rests on.

Restraint (IMPROVEMENTS §4): none of the three loses the references' charm on paper — all keep the T-junction fabric,
negative-space streets, walls on by default, one ink, one click, optional shadows, no 3-D default, no `RIGID` grid; all
adopt R13's "no fills / no outlines" survival test; all keep FTG's 3 m entrance rule and MFCG's `Offset`. Pr's k = 30
Poisson (references 50) is the only place a reference constant is knowingly relaxed, as a table value.

## §5 Stage-2 readiness (ranked)

1. **pipeline** — `SeamContract` on every district from M1 with a 100 % acceptance test; templates are fabric strategies
   the *base* can select per district, so a ring district is generated by the same engine that generated its neighbours
   (seams by construction); fields with `hard` flags per seam edge; the ≤ 30 ms per-district budget. Gap: the engine's
   hole step (B4) must be written before `RingFabric` exists.
2. **kernel** — `NeighbourhoodInput` carries everything S1–S3 list; rule (2) lets the close-up replace plots with a
   template layout inside its boundary; the hole-aware cut already exists in the base; standalone and sky modes are the
   same call. Gap: templates as `TemplateId`s are named, not modelled (what "seed geometry + sub-areas" is as a type).
3. **product** — the contract is complete (`S1Contract` with typed boundary, portals, context, laid fabric, sub-seed)
   and the seam report is explicit, but `NeighbourhoodResult` is refinement-only; as written the interface cannot
   deliver NG's area / street / square / ring morphologies, which §16 tags STAGE-2. One sentence fixes it (adopt K's
   rule (2) or P's strategy slot), but the readiness claim "every district opens as an NG-class close-up" (M4) is not
   supported by the interface as specified.

## §6 Village preclusion

Passed by all three (§2.4). No proposal pays for VG; each names the strategy slot a village product would fill.

## §7 Scores on this lens (0–100), itemised

### 7.1 proposal-kernel — **84**

Strengths.
* The only proposal whose default base contains all three layout ideas the thesis fuses (FTG growth for secondaries,
  NG bent cut, MFCG grower) with the tiebreaker marked per row (§1.3) and alternatives 1–4 rejected in writing (§4.5).
* Bent cut §4.6 carries the measured constants (BG-2/PF-3), the hole slit and a bounded ladder; junction rules and
  legality thresholds FTG never states are made explicit (§4.5).
* MFCG rows 38/40 and FTG rows 42/46 covered by mechanisms; the harbour (basin, moles, piers), the wall trace and the
  area-budget formula are the most concrete of the three.
* Five-level plat with per-level transactions gives edit locality by construction (§7.3) and the invariant suite per
  commit (§5.3); parity metrics §13.5 are the most complete table against our captures.
* Stage-2 interface admits template replacement inside the boundary and the sky context (§4.9).

Major flaws.
* **§4.5 / §4.6 sequencing gap.** "After a stage, every L1 face larger than the *district's* block-size band is
  subdivided" and step 1 of §4.6 stops on "the class's block-depth band", but districts, classes and the prosperity
  field are produced at S6, after S5 (§4.1). As written the infill reads a value that does not exist; the band must come
  from the stage's density regime, or district typing must precede infill. Cheap, but it is the fusion's own stage.
* **MFCG B14.** No gate-plaza or church-forecourt rule; §4.7 S7 only sizes `square` faces from population.
* **FTG C10.** The suburb stage is a budget row; its measured rules are not designed.

Minor flaws. No rule for N < arterial crossings at the enceinte (§4.8); `urban_castle` inside/outside placement not an
option; no thematic (matcher) layers; perimeter expand + round absent; decoration generators a table; MFCG rows D–H and
NG rows C7–H1 were taken from the CONFIDENCE tables without the assessors' prose (Appendix A) — the rows are still
adequately covered, but the seat did not see, e.g., D3's emblem or E4's framing rule in the assessor's words; own-built
polynomial/CORDIC transcendentals (§3.1) where P adopts an fdlibm port — a reproducibility risk, not a parity gap.

### 7.2 proposal-pipeline — **76**

Strengths.
* The best stage-2 readiness: `SeamContract` per district from M1 with a 100 % acceptance criterion; `FabricStrategy`
  as the template model; `hard` flags per seam edge.
* The memoised dependency-DAG engine with per-entity `deps` (§4.1, §7.2) gives exact edit locality and one mechanism
  for one-click, incremental epochs, scoped regeneration and the report.
* The only explicit exact-N gate mechanism (excess arterials diverted along the wall as lanes; posterns; F-WALL
  ladder), the only stated successor rule (`Enter = seed + 1`), the most complete failure-class table (§5.2) and the
  most complete edit-lifecycle table (§7.3).
* District typing greedy from the largest with a mixed-use floor and FTG's shanty-after-first-half rule (§4.5).
* `dmath` from an fdlibm port; a concern registry; the rejected alternatives per hard decision (§18.1).

Major flaws.
* **§4.4 FTG growth demoted to a preset.** The default base has no growth of secondary streets; the fabric below
  arterials and connectors is bent-cut recursion at district and block scale. Present as a capability (C5 = T), absent
  from the fusion the base ships; §1.2 credits FTG's growth as the more constraint-driven shape and does not use it.
* **FTG C10.** Suburb offshoots and cul-de-sacs (measured: 83 cul-de-sacs, 30.00 m streets, 14.70 m lot outlines) are
  unreachable in the default strategy; S14 ribbons with a density kernel are MFCG's outskirts, not FTG's suburb.
* **NG B4.** §15.1 relies on "the F-CUT ladder on holed faces" but the §4.5 engine has no hole step; `RingFabric`
  cannot be built on it as written.
* **District-level bent cut (§4.5)** is a new mechanism with no reference measurement; its 5–15 ha band is anchored on
  one FTG constant.

Minor flaws. Harbour: site only, no basin, moles or piers (B18/C13); gate plazas "by rule" without the rule (B14);
water decoration partial (D4); `docs/confidence/*.md` read by outline only (D20) — its parity rows rest on the
one-line capability names of CONFIDENCE §4 plus the §3 rulings.

### 7.3 proposal-product — **71**

Strengths.
* The strongest visual-parity design: paint programs derived from visual-spec §6, three presets each tied to the
  recorded draw laws (casing `w + 2h`, bands `(i/N)^1.5`, NG's roof law and ≈ 17 hatch ticks per wing, FTG's lit look),
  layer order as data with both recorded orderings, per-preset draw-style checks in §14.
* The most faithful content loop (§11: virtual-population loop, core/shop pools, lifestyle bands with rare outliers,
  size and resource gates) and the most complete bridge/VTT/export surface (§12); four distinct regeneration actions
  (O16).
* The only stated gate-plaza rule (§5.4); per-segment bank classes; `urban_castle`-class castle siting by score.
* The clearest statement of the thesis, the rejected shapes (a)–(d) and a tiebreaker column per stage (§1.3).

Major flaws.
* **§5.4 district formation.** "The bounded faces of the tier-1 graph after stage k are district lots" — tier-1
  arterials run to the frame, so their faces are unbounded wedges; nothing inserts the stage extent as an edge or
  splits faces to a district band; only the merge floor is stated. Districts are load-bearing for S1 contracts, typing,
  naming, walls and the venue mix (O11 containment 100 %).
* **§2.2 refine-only neighbourhood interface.** `NeighbourhoodResult` is additive refinement; NG's B2/B7/B8 templates
  are tagged STAGE-2 through "S4 template data (§2.2)" but §2.2 has no template slot — the M4 readiness claim is not
  supported as written.
* **§5.5 bent-cut construction.** Perpendicular feet from the OBB minor axis plus a lateral offset does not guarantee
  right-angled arrival at the far edge; the R3 keep-test and the §14 "≥ 85° arrival in ≥ 95 %" band are calibration
  hopes, not properties of the construction the other two proposals give.

Minor flaws. Harbour carving, moles and pier rules absent (B18/C13); district placement order absent (C6); decoration
generators a vocabulary; `docs/confidence/*.md` read by outline only (D-14); k = 30 Poisson knowingly below the
references' 50.

## §8 Winner on this lens

**proposal-kernel.** It covers the most capabilities by mechanism (2 + 4 + 1 thin rows against 3 + 5 + 2 and
3 + 3 + 6), it is the only proposal whose shipped default is the fusion as stated (growth + cut + grower) with the
tiebreaker applied row by row, and its defects are sequencing and rule omissions that one paragraph each repairs.
Pipeline is second on completeness and first on stage-2 readiness and locality; product is second on visual and content
parity and third on layout mechanisms.

## §9 Grafts the final architecture must take from the non-winners (and the two repairs the winner owes)

From **pipeline**:
1. `SeamContract` as a first-class record on every `District` from milestone 1, with the "100 % of B-CITY districts
   carry a complete contract" exit criterion and `hard` flags per seam edge (§4.9, §16 M1).
2. The `FabricStrategy` registry as the template model — a template is a strategy the base can select per district, so
   ring / square / street districts are laid by the base's own engine with seams by construction (§4.5, §14, D19).
3. The memoised dependency-DAG engine with per-entity `deps` and invalidation closures for edit locality, incremental
   epochs and the report (§4.1, §7.2) — finer than the plat-tree scoping of kernel §7.3.
4. The exact-N gate mechanism (arterials ranked by betweenness; excess arterials diverted along the wall to the nearest
   gate as lanes; posterns; the F-WALL ladder) (§4.8, §5.2).
5. District typing greedy from the largest face with a mixed-use floor, the shanty-only-after-the-first-half and
   only-outside-the-enceinte rules (§4.5).
6. `dmath` from a permissively licensed fdlibm port instead of own polynomial/CORDIC code (§6.4); `Enter = seed + 1`
   (§6.1); the concern registry (§6.2); the failure-class and edit-lifecycle tables (§5.2, §7.3) as the format for the
   final document.

From **product**:
7. The gate-plaza rule ("a small plaza face carved at each gate inside the wall", §5.4) and, from S4, church
   forecourt squares typed by function — MFCG B14 in full.
8. The paint-program vocabulary derived from visual-spec §6, the three preset evidence tables (§9.3), layer order as
   data with the two recorded orderings, and the per-preset draw-style checks (§9.1, §14).
9. The FTG-faithful roster loop (virtual-population loop, core/shop pools with a shop probability, lifestyle-banded
   pools with rare outliers, `firstAtPopulation` size gates, resource-availability gates) (§11).
10. The `postMessage` bridge's event/command set with `stateId` concurrency, Universal VTT (`.dd2vtt`) alongside
    Foundry, per-layer scenes (§12); the four regeneration actions "Regenerate (keep settings) / Adjust / New random /
    Same kind, new seed" (§8.2).
11. Per-segment bank classes (beach / rock / cliff / quay / marsh) on coasts and the lit preset's water programs
    (depth ramp, foam) (§5.2, §9.3).

Repairs the winner owes (not grafts): (a) move the block-size band to the stage's density regime or run district typing
before infill (§4.5/§4.6 vs §4.1); (b) design the suburb stage's rules (offshoots from perimeter spokes, density
Bernoulli, small lots from the outset) on the S5 queue so FTG C10's measured signature is reachable; (c) add the
river-island (branch rejoins river) case to S1 — shared by all three.

## §10 CONFIRMED vs PLAUSIBLE

CONFIRMED (read at source in this seat): every quotation and section reference to the three proposals, CONFIDENCE.md,
the four critic files, the confidence matrices of mfcg.md §2, ftg.md §2, ng.md §2/§3, vg.md §4/§8, visual-spec §5–§7
and IMPROVEMENTS §1/§3.1/O4/§3.2–§5/§7.1; the existence on disk of every file the task names. PLAUSIBLE (this seat's
judgment): every tag in §2, every count in §3, the fusion verdicts in §4, the readiness ranking in §5, the scores in §7
and the graft list in §9. Nothing was executed; no capture, bundle or raw post was opened.
