# improvements/ftg — weakness ledger for Thomas Allerton's Fantasy Town Generator

Lane `improvements/ftg` (Opus weakness-miner seat), 2026-09-25. Purpose: the raw material for designing something
BETTER than FTG. Every entry names the weakness, who says so, the evidence, the user impact, the root cause as far as
knowable, how a new design could beat it, how the win would be MEASURED, and what the reference gets right that a fix
must not lose.

STATUS: COMPLETE (2026-09-25). Layout: §0 reading log · §1 how to read · §2 recorded census (executed in this lane) ·
§3–§12 the ledger in the ten tasked groups (34 entries) · §13 the 15 highest-value improvement opportunities ·
§14 restraint list · Appendix A per-source harvest (the evidence trail, written while reading) · Appendix B user-voice
tally from the raw comment threads. **Addendum 1** (end of file, 2026-09-25): plot model and plot granularity — a new
census, GEO-8 to GEO-10 (37 entries in all), errata (the wall is wire type 7), and the effect on §13 and §14.

**Headline.** FTG's strength is the thing no watabou generator has: a persistent, editable town whose every building
has a purpose, occupants, workers and an hourly schedule ("a consistent answer … If I see it, I can go there"). Its
weaknesses cluster in four places. (1) **Geometry robustness and plot quality.** The lot-to-building splitter was
rewritten twice in a year. Our census of the two captured cities finds 40 pairs of houses stacked on identical
footprints in one of them, hourglass footprints, sub-metre road edges and up to 10 % of buildings with no entrance.
(2) **No terrain and no seed.** Elevation was prototyped and then shelved, mountains are the most-repeated user request,
and generation takes no seed, so changing one parameter produces a different town. (3) **Regeneration destroys authored
work.** Nothing records which entities the user edited, so old towns never receive new features. (4) **A one-way
content → map handoff.** The map cannot push back on the roster, and factions, land use and social geography stay
emergent. The design answer is FTG's content model on top of a constraint-first, terrain-first, seed-deterministic,
invariant-checked geometry kernel with stable ids and locks.

## 0. Reading log (what was and was not read in full)

| # | source | read | notes |
|---|---|---|---|
| 1 | research/findings/_critic.md | FULL (478 lines) | C12 pipeline order; §6.7 FTG gaps |
| 2 | research/findings/_critic-ftg.md | FULL (256 lines) | F1–F27 incl. the zig-zag ruling; §4 corrected payload statistics; §6 gaps |
| 3 | research/findings/ftg-posts-a.md | FULL (1072 lines, incl. Critic-2 addendum) | Patreon 2022-04 → 2023-12; §4 philosophy, §5 comment facts, §6 open questions |
| 4 | research/findings/ftg-posts-b.md | FULL (1049 lines, incl. Critic-2 addendum) | Patreon 2024-01 → 2025-06 |
| 5 | research/findings/ftg-posts-c.md | FULL (1038 lines, incl. Critic-2 addendum) | Patreon 2025-07 → 2026-07 |
| 6 | research/findings/ftg-docs-params.md | FULL (665 lines, incl. Critic-2 addendum) | 36 guide pages + create-request/presets JSON |
| 7 | research/findings/ftg-payload-visual.md | FULL (1106 lines, incl. Critic addendum, Critic-2 addenda parts 1–2) | only the corrected (zig-zag) values are used |
| 8 | research/findings/visual-spec.md | FULL (743 lines) | §4 FTG and §5–§7 comparison drive this ledger; §1–§3 read for contrast |
| 9 | research/ftg-capture/roadlength100/README.md | FULL (131 lines) | F3 closed; server time ≈ 3 s; the "≈ 300 s" was the recorder's cap |
| 10 | research/ftg-capture/critic2/zigzag_rederive.py (+ `.out.txt`, `zigzag_probe_roads_lots.out.txt`) | FULL | decoding basis for this lane's census |
| 11 | raw comment threads | FULL: the `## Comments` section of all 30 `research/patreon/ftg/*/post.md` (200 comments incl. 67 creator replies); the comment sections of every `research/devlogs/**/post.md` (dwellings, manor, MFCG, NG, procgen-mansion, VG), harvested for FTG-class asks | Appendix B |
| 12 | research/ftg-docs/*.md | targeted: grep for documented limitations (28 hits, all read); `editSettlement__regenerate_area.md` L60–125 and `editSettlement__buildings.md` L65–85 read | the rest reached through `ftg-docs-params.md` |
| 13 | captures/ftg/* | all three `console.jsonl` (≤ 1 line each), the step-timing lines of both `report.md`, `captures/README-labelfix-2026-09-25.md` (no FTG rows: the label caveat does not touch FTG) | §2 |
| 14 | executed in this lane | `research/ftg-capture/improvements-ftg/defect_census.py` on both decoded payloads → `defect_census.out.txt` | §2 |
| 15 | docs/improvements/mfcg.md | lines 1–135 only | format of the sibling ledger |

Not opened in full: `_critic-os.md` and `_critic-vg-ng.md` (grepped for FTG content: none; they rule on other references);
`manor.md` and every MFCG/VG/NG findings file (other references, outside this lane's list). No captured JavaScript
bundle was opened. No image was opened by this lane: image content is the findings readers' `[SHOWN]` descriptions.
The reading stayed under the budget (≈ 240 k tokens), so no outline-mode switch was needed.

## 1. How to read this ledger

**Entry schema (as tasked):** weakness · who says so · evidence · user impact · root cause · how a new design beats
it · how the win is measured · risk of over-correcting (what FTG gets right). ID prefixes: ROB robustness, GEO
geometry/realism, VAR variety/control, EDT editing/locality, PERF scale/performance, REN rendering/style, LAB labels,
DAT data/export, SIM simulation/content, UX workflow.

**Who says so:** **CR** = the creator (Thomas Allerton) in a post, the user guide, or a comment reply. **US×n** = n
distinct named commenters in the raw FTG threads (names, posts and dates in Appendix B). **REC** = our recordings: the
two decoded settlement payloads (Galeiaward 2026-09-21, Nevervalley 2026-09-25), the create request, and the client
profiles. FTG emits no console trace, so there are no retry or discard logs to count, unlike MFCG.

**Scope tags (owner, 2026-09-25):** **[BASE]** = the stage-1 fused town/city generator, ranked first everywhere.
**[S2]** = readiness for stage-2 neighbourhood composition. **[S3-hook] [EVO-hook] [LAYER-hook] [ASSIGN-hook]** = hooks
only (buildings as compositions; settlement evolution; sewers and sky islands; external building assignment).
**[VG-np]** = the village product is not precluded.

**Confidence:** creator quotes, user comments and the §2 census are CONFIRMED (read or executed). "Root cause" lines are
PLAUSIBLE unless they quote the creator. Every "beat it" line is a design proposal, not evidence.

**Clean-room:** every "beat it" line describes an approach of our own. FTG's data assets are its creative content and
are not proposed for reuse: the 209-building table, the 80-node dependency graph and its ratios, profession/item/price
lists, name-part tables, appearance templates and palettes. Its schema *ideas* (per-capita rules, pools by lifestyle,
sub-locations) may inform ours.

**Pipeline ruling carried throughout (`_critic.md` C12, `_critic-ftg.md` F14):** FTG runs in two phases. Phase 1
decides buildings, people and factions before any geometry exists. Phase 2 draws the map: water first, then the staged
road network and districts, then the suburb stage, then the outer settlement (farms, forests, features).
**Scale ruling:** the payload is zig-zag sint32 centimetres centred on (0,0). Ordinary buildings are ≈ 10 × 10 m (median
103 m²). District streets are laid at (L + 0.5)/2, main roads at L + 0.5, and suburb streets at L. Server generation
takes ≈ 3 s.

## 2. Recorded evidence census (CONFIRMED, executed in this lane)

Script: `research/ftg-capture/improvements-ftg/defect_census.py` (stdlib; decoding as in `critic2/zigzag_rederive.py`),
output `defect_census.out.txt`. Both captured cities come from the same request except one leaf
(`stages[1].roadLength` 60 → 100, `roadlength100/README.md`). Road-type edges are types {0,1,2,6,7,10}.

| quantity | Galeiaward (2026-09-21) | Nevervalley (2026-09-25) |
|---|---|---|
| buildings / districts / wall towers | 2798 / 4 / 17 | 2813 / 3 / 29 |
| **exact-duplicate building footprints** (identical vertex sets) | 0 | **40 pairs = 80 records (2.8 %)**, all residences (34 lower-class/lower-class, 6 squat/lower-class), all in one district (Turnpike Dale), none with an entrance, 37 of 40 pairs with different household names |
| building pairs overlapping ≥ 1 m² (sampled on a 0.25 m grid) | 1 (2.2 m²) | 40 (all ≥ 50 m²: the stacked pairs) |
| self-intersecting (hourglass) footprints | **3** (middle-class homes) | 0 |
| non-convex footprints | 167 (6.0 %) | 146 (5.2 %) |
| buildings with no entrance point (field 8.6) | 109 (3.9 %) | **281 (10.0 %)** |
| smallest footprint / smallest OBB side | 34.9 m² / 3.81 m | 25.4 m² / 4.42 m |
| road-type edges < 1 m / < 5 m; shortest | 14 / 140; 0.196 m | 9 / 135; 0.050 m |
| suburb lot-outline edges (type 4) < 1 m | 28 (shortest 0.020 m) | 15 (shortest 0.045 m) |
| buildings whose outline a road centreline crosses | 2 | 3 |
| distinct node ids sharing one position | 0 (the 2026-03 repair holds) | 0 |
| buildings inside any district ring | 1426 (51 %) | 1814 (64 %) |

From the findings, re-derived by `_critic-ftg.md` §4 and `roadlength100/README.md`:
- **Lots.** Only 1487 of 2798 buildings lie in any serialised lot polygon. 22.9 % of block lots are empty, and lot
  coverage is 38 %.
- **Street angles.** Streets hit a hard 15° per-vertex turn cap. The median junction arm angle is 90.02°.
- **Server time.** The PUT is answered in 2.90 s and 3.23 s. The client builds the scene 6.4–7.0 s after the click, and
  its heavy script bursts end at 8.3 s and 15.7 s.
- **Client costs** (`captures/ftg/2026-09-21T05-23-58/report.md`). Loading a settlement costs 2.05 s of busy CPU
  (31.8 s wall, mostly waiting). Each zoom step costs 0.10–0.18 s busy.
- **Seedless regeneration.** One changed leaf gave a different town: 4 districts became 3, and 17 towers became 29.
  FTG therefore offers no parameter locality, and no controlled parameter study is possible without a seed.

The payload carries no reason for the duplicate stacking. The most plausible reading is that a residential
fill or merge path placed the same plots twice. That reading is PLAUSIBLE only. Everything else in the table is
CONFIRMED by execution.

## 3. Generation robustness

### ROB-1 · Geometry defects ship silently: stacked duplicate houses, hourglass footprints, micro-edges, doorless buildings [BASE]
- **Who:** REC (primary) · CR.
- **Evidence:** §2 census. In Nevervalley, 40 pairs of houses sit on identical footprints (80 records). Galeiaward has 3
  hourglass footprints. Road edges shorter than 1 m number 14 and 9, the shortest 0.05 m. Buildings without an entrance
  point are 3.9 % and 10.0 % of the total. Two and three buildings have a road centreline crossing them.
  `_critic-ftg.md` upholds `ftg-payload-visual.md` §9.3/9.5/9.6/9.7, including the duplicate `key: 9` preset rows.
  The creator on bad shapes: the narrow-section and sharp-angle heuristics "do not detect everything (e.g. hourglass
  shaped buildings)", and "due to the random nature and the heuristic based approach to filtering, it's not impossible"
  to still produce them (133016301). A "zero-length roads" bug was fixed in 2025-03 (123982784), yet sub-metre edges
  still ship.
- **User impact:**
  - A DM clicks a house and gets one of two households occupying the same building.
  - Buildings without a door cannot be routed to by schedules or placed on a VTT.
  - Hourglass footprints break roof generation and any interior plan.
  - None of this is visible until someone trips over it.
- **Root cause (PLAUSIBLE):** generation is a chain of stochastic agents (proposal-queue roads, recursive random cuts,
  fill/merge passes) with filters applied at proposal time only. No post-stage validator checks global invariants, and
  FTG emits no generation report (`ftg-payload-visual.md` §1).
- **Beat it:**
  - After every stage, run an invariant suite: simple polygons; no footprint overlap; minimum width and minimum area per
    building class; every building has an access edge and an entrance; no road crosses a building; no road edge
    shorter than a weld tolerance; every record unique.
  - Repair locally first: re-cut the plot with the next sub-seed, then a simpler primitive, then a documented omission.
  - Return a machine-readable generation report, surfaced in the UI and in the API.
- **Measure:** on a fixed benchmark (e.g. 1 000 seeds × sizes × water/wall options), hard-invariant violations per
  1 000 cities = 0. That covers duplicates = 0, self-intersections = 0 and entrance coverage = 100 %. Road edges shorter
  than the weld tolerance = 0. Report fallback-ladder uses per city.
- **Over-correction risk:** FTG's instinct to fix causes rather than filter outputs is right (it found the
  reflex-corner cause instead of filtering, 133016301). Also keep the minority of sheared quads: the p95 worst-corner deviation of
  22.9° is how the splitter fills awkward plots, and it reads as organic. Invariants must police validity, not
  regularity.

### ROB-2 · Planarity and identity are enforced piecemeal, so generated streets break the tools built on them [BASE]
- **Who:** CR (four posts) · US×1 (Sazra) · REC.
- **Evidence:**
  - A road or wall drawn over a road "breaks"; it is "supposed to snap so it splits the existing road in two"
    (CR, 75844005, 2023-02-19).
  - The fill tool "sometimes just fills half of the town", with "problems with generated streets but works for self-drawn streets" (US Sazra, 2023-02-20).
  - Snapping "depend[ed] on the camera angle" (103668405).
  - "Two different intersections could have the same world position … this breaks things". This stopped district
    re-roll from working. "I *think* I've found the root cause", and existing settlements were repaired server-side
    (153121107).
  - A self-intersecting ocean shape "broke some of the logic in the server", and is now blocked at draw time
    (153121107). The next post adds "more validation … to try and ensure no invalid layouts are created" (157283634).
  - The census finds 0 coincident nodes today, so the repair holds.
- **User impact:** fill, regenerate-area and wall tools fail on exactly the streets the generator made. Users must
  learn workarounds such as "make sure everything is snapping".
- **Root cause:** lots are faces recomputed by walking a mutable planar graph (the "maze trick", 65223067). The
  crossing → split-both-edges invariant is enforced in some editor paths, in some generator paths, and by after-the-fact
  data repair, not in one kernel.
- **Beat it:**
  - One topology kernel for generation and editing alike: a half-edge structure on integer or fixed-point coordinates,
    exact orientation predicates, split-on-cross, and weld-within-tolerance.
  - Every mutation is a transaction that preserves planarity and face identity.
  - Faces (blocks and lots) are first-class records with stable ids, not re-walked cycles.
- **Measure:**
  - Property/fuzz tests: 10⁵ random edit sequences (draw, move, delete, crossing walls) → 0 planarity violations and
    0 lost faces.
  - The fill/regenerate success rate on generated streets equals that on hand-drawn streets (100 %).
  - Face ids survive edits that do not touch the face.
- **Over-correction risk:** keep FTG's integer-centimetre coordinates and intersection-id connectivity (connectivity
  without epsilon geometry, 65223067). Keep "validate at the authoring boundary" as a second line of defence
  (153121107). The fix is to unify these, not replace them.

### ROB-3 · Feasibility is discovered late, and hard cases fall back to "give up" or to advice [BASE]
- **Who:** CR (primary) · REC.
- **Evidence:**
  - V1: after the scale fix, reliability "seemed to fall by quite a lot": the algorithm was "struggling to place the larger buildings" and "would regularly give up". The recovery was a
    bounded retry, then abandoning the whole generation (106664214). Retries also slowed generation (112861635).
  - V2 answered with landmark-first placement in large district lots (120828892).
  - Residual cases: the 2026 shrink-then-split fails "if the area is too small to shrink, or there is an odd corner
    shape", with no fallback described (164816716).
  - Water: a river "may end up bending back around into the ocean", and the only remedy is advice to use straight or
    gentle shapes (`createSettlement__water.md`). Fixed bug classes include islands in rivers (91451446), "two oceans
    … form an island" (120828892) and "a rare issue with generated rivers" (123982784).
  - Lots: "more segments will create larger lots — but … this isn't guaranteed" (layout guide).
  - Empty space: "less empty space" and "better utilisation of empty space" were standing creator worklist items
    (112861635, 84680671). 22.9 % of block lots are still empty (§2).
- **User impact:** failures and oddities cluster in the richest configurations (rivers, coasts, big landmarks,
  metropolis sizes), and users compensate by re-rolling.
- **Root cause:** a fixed building manifest (phase 1) is fitted into geometry by stochastic search, and water shapes
  are grown by heuristics unconstrained by terrain.
- **Beat it:**
  - Make feasibility true by construction. Derive the area budget from the manifest by explicit accounting (m² per
    building class, street share, open-space share). Reserve space for the hard items (castle, market, cathedral,
    harbour) before the fabric (FTG's own V2 insight).
  - Derive water from terrain: rivers descend to the sea or a lake, so they cannot bend back uphill into it.
  - Give every stochastic step a deterministic fallback ladder, logged in the generation report.
- **Measure:**
  - Share of generations that place 100 % of the manifest.
  - Fallback uses per city.
  - Rivers with a non-monotonic course = 0.
  - Empty-lot share by district class against a target (empty yards and plazas are intended; unplaced area is not).
  - p50/p95 generation time by size.
- **Over-correction risk:** FTG's content-first guarantee (every building has a purpose and occupants) is its core
  value. Do not trade it for geometry-first population drift. Do not let hydrological rigour push the river out of
  the town: the river through the centre is a feature.

### ROB-4 · No seed, no determinism, no replay: every change is a new town [BASE; EVO-hook]
- **Who:** REC · CR · US×4 (Apophenic Realms, Kole D, Peter Hawkins, leo cameron).
- **Evidence:**
  - `seed: null` in both captured requests (`ftg-docs-params.md` §5.14).
  - Changing one leaf changed the whole geography: 4 → 3 districts and 17 → 29 towers (§2).
  - Forest trees and decoration areas are "randomly filled … when the map is rendered", and 3-D roofs are computed each
    render (`useSettlements__map.md`). Determinism is untested (`_critic-ftg.md` §6.4).
  - Users: a reproducible "generate on first link, load the same town on each successive link" was asked for, with
    watabou's `?seed=` URL given as the model; the answer was "no plans for a direct API" (75844005, 2023-02-11). "Render
    a bunch of maps till I get one on the side I want" (Kole D, 130937474). "Generate 3 layouts before" populating was
    refused (127128581). "Time to regen all my northern settlements" (leo cameron, 147332188) meant regenerating to get
    new features.
- **User impact:** no controlled tweaking (change the coast, keep the town), no shareable recipe, no reproducible bug
  reports, and every experiment costs the authored details.
- **Root cause:** a stateful server product whose identity is the persisted file; randomness is neither seeded nor
  recorded.
- **Beat it:**
  - The town is a pure function of (generator version, seed, parameters, assignments, edit log).
  - Per-stage and per-entity sub-seeds give *parameter locality*: a coast-direction change re-derives water and the
    affected districts only.
  - Render-time fills are seeded by entity id, so every viewer sees the same trees.
  - Persistence stores the recipe as well as the materialised result (EDT-2).
  - Evolution runs from the same seed's epoch sub-streams (EVO-hook).
- **Measure:**
  - Byte-identical output across runs and machines for identical inputs (100 %).
  - Parameter locality: the share of entities unchanged when an unrelated parameter changes (target ≥ 95 % for inland
    districts under a coast change).
  - Re-rolls needed to reach a requested feature = 0 once a direct control exists.
- **Over-correction risk:** a seed is not a save. FTG's durable, editable, shareable town with live sync (`stateId`,
  `ftg-payload-visual.md` §7.2) is essential. Keep persistence; add the recipe beside it.

## 4. Geometric quality and realism

### GEO-1 · Plots and buildings come from recursive random cuts: slivers, odd shapes, cross-lot coupling, no frontage model [BASE; S3-hook input]
- **Who:** CR (two rewrites in a year) · REC.
- **Evidence:**
  - July 2025: after the suburb update, "too many thin / sliver buildings" and "weird shaped" ones (L-shapes,
    arrowheads, hourglasses, a six-pointed star). A riverside block became a fan of ~12 slivers ([SHOWN] 133016301/06–09).
    The cause was the longest-edge cut, which "struggles to do anything with internal corners". The fixes were a
    reflex pre-cut and a centroid rule.
  - July 2026: the replacement projection cut "bend[s] … in the middle", and "splits on one end affect the other side of the lot", even far away ([SHOWN] 164816716/07–08). Shrink-then-split followed, with its own failure
    cases.
  - Recorded (§2, `_critic-ftg.md` §4): 167/146 non-convex footprints, 3 hourglasses, and a worst-corner deviation of
    p95 22.9° / p99 42.2°. Only 6.4 % of buildings share an exact vertex, so FTG's "terraces" are tight packing with gaps,
    not party walls. Block lots hold 1.52 buildings each, and lot coverage is 38 %.
  - Three plot levels are distinct (district lot → block lots by inserted roads → plots by cuts, F17).
- **User impact:**
  - Implausible house shapes read as generator glitches.
  - Dense cores lack the continuous street walls of real medieval towns.
  - Shapes are unusable as inputs to roofs, interiors (FTG's own floorplan work, 164816716) or VTT walls.
- **Root cause:** a plot is whatever a random perpendicular cut leaves. Street frontage, plot depth, corner plots and
  back yards are not modelled quantities, so the splitter keeps being patched (proposal rule, then projection rule).
- **Beat it:**
  - **Frontage-first plotting.** For each block, derive the street frontages by road class. Lay out plots as strips
    perpendicular to the frontage, with target frontage-width and depth distributions per district class, in metres,
    from data tables that the later corpus phase can calibrate.
  - Solve corners and reflex vertices explicitly as corner plots. Leave rear yards and back lanes as a deliberate
    remainder.
  - In dense districts, emit party walls as shared edges.
  - Each plot record carries its frontage edge, access edge, depth and context vector. This is exactly the input the
    S3 building-composition interface needs.
- **Measure:**
  - Sliver rate: plots or buildings narrower than 3 m = 0.
  - KS distance of frontage-width and depth distributions against the class targets.
  - Share of plots with street access = 100 %.
  - Party-wall share in dense districts against a target.
  - Coverage by district class against targets.
  - Self-intersection and non-simple rate = 0.
- **Over-correction risk:** FTG's buildings sit perpendicular to their street with the door on the road-facing edge
  (entrance → road 2.99 m median). Its dense → gaps → suburb gradient is legible. Keep both. Also keep some irregularity:
  a rigid comb of identical strips is as unrealistic as slivers.

### GEO-2 · Streets grow from local proposals under a hard 15° clamp, with no destinations and no terrain [BASE; EVO-hook]
- **Who:** CR · REC.
- **Evidence:**
  - V1: "most of the settlements in FTG look similar": each starts at a 4-way crossroad that "blooms outward in a vaguely circular shape" (112861635). The creator wanted to "reduce the number of sharp points" (acute
    slivers, same post) and coded three road algorithms before keeping the fourth (112861635).
  - Recorded: zero mass at 15–16° for street types 0/1/2/10; junction arms median 90.02°; a flat global heading
    spectrum; sub-metre edges (§2).
  - `ftg-payload-visual.md` §10 itself recommends that an original generator replace the per-vertex clamp with
    curvature-continuous splines or a tensor field.
  - The only global structure is spokes from the centre plus pruning between stages (`createSettlement__settlement_layout.md`).
- **User impact:** a recognisable look of "grid bent in 15° steps". Streets ignore where people are going (gates,
  bridges, market, harbour, neighbouring towns) and ignore slope, because there is no slope.
- **Root cause:** a proposal-queue growth model with local legality checks only ("not too close, don't end in water,
  snap to an intersection", `createSettlement__algorithm.md`). It has no global goal function and no cost surface.
- **Beat it:**
  - Build a hierarchical network. Route arterials between real destinations over a cost surface (slope, water crossings,
    existing fabric, walls). Grow secondary and tertiary streets from them with curvature continuity rather than a
    per-vertex clamp.
  - Add junction design rules: a minimum crossing angle, merging of junctions closer than a spacing threshold, and
    T-junction preference in organic districts.
  - Keep growth-based construction, so the backbone extends naturally under EVO.
- **Measure:**
  - The turn-angle distribution has no hard cliff.
  - Junction angle p5 is at or above the target (no acute slivers).
  - Arterial detour index (path length ÷ straight distance, gate ↔ centre) within target.
  - Arterial slope percentile below the threshold once terrain exists.
  - Dead-end share by district class against target.
- **Over-correction risk:** FTG's locally orthogonal junctions, real-metre segment lengths, legible hierarchy (main
  / normal / suburb) and staged growth (which maps onto historical growth phases) are good. Do not replace them with a
  single global noise-driven pattern that loses legibility.

### GEO-3 · No terrain at all: no elevation, no mountains, cliffs or ravines, no underground [BASE; LAYER-hook]
- **Who:** CR · US×7 terrain + US×2 underground.
- **Evidence:**
  - A height map was prototyped as a Perlin/simplex raster (106664214), then shelved: "not entirely sure how to display it on the 2-D map", and fitting it into the road algorithm "will be … interesting" (120828892).
  - "Mountains aren't properly supported yet" (147332188, 2026-01-07); "No options for mountains or cliffs/ravines at
    the moment" (137812814, 2026-04-01).
  - Users (Appendix B): Kyle, Thomas Bendesen, Will Lillard, Peter Hawkins, Bri Rowland, leo cameron ("Helms Deep type
    style") and 5H4P35H1F7 ("a town on a mountain or at the bottom of a cliff or ravine").
  - Underground: "dwarf city built within the mountains or a drow colony in the underdark", where the "colors and building type aren't convincing" (Freddy Hewitt, 133016301), "darker stone texture, mushroom farms" (Deahal, 137812814). The
    creator: "At the moment that isn't possible".
- **User impact:** the most-requested map feature in the threads is absent. Hill towns, acropolis sites, river-cliff
  towns and valley towns cannot be made. Walls, castles and roads cannot respond to ground.
- **Root cause:** the whole pipeline is planar. Heights were considered only as a render layer, and the road agents
  have no cost field.
- **Beat it:**
  - Make terrain first, as a heightfield with authored site features (hill, spur, valley, cliff, ravine, terrace).
  - Derive hydrology from it (flow direction, accumulation, outfalls), queryable per cell. Sewers need exactly this
    (LAYER-hook).
  - Settlement stages consume it: slope-costed roads, walls on crests and river lines, castle sites scored by height,
    terraced plots.
  - Render it legibly in 2-D (hillshade and contours, tiered).
  - Add a layer concept (underground / ground / sky) with its own styles, so underground and Underdark settlements are a
    style + layer choice, not a new product.
- **Measure:**
  - Every cell has a defined flow path to an outfall (100 %).
  - Rivers descend monotonically (100 %).
  - Arterial slope p95 below the threshold.
  - Site types (hill/valley/cliff/coast/river) produce statistically distinct morphometrics (classifier accuracy against
    type).
  - User-task test: "town on a hill" is achievable in one click.
- **Over-correction risk:** relief must not clutter the map or slow the one-click path. FTG's flat, clean read and its
  "rolling countryside" default should remain the default rendering tier.

### GEO-4 · Fortifications are thin: the wall is a tower chain, gates are not objects, and the castle is a fitted template [BASE; EVO-hook]
- **Who:** CR · REC · US×1 (Jason DeGonia).
- **Evidence:**
  - Recorded: the wall is serialised only as tower points: 17 in Galeiaward, all of them vertices of one district ring,
    median spacing 39 m, an open 473 m chain from river bank to coast (`_critic-ftg.md` §4 row 19; F15); 29 in
    Nevervalley. The band, gates and
    crenellation are synthesised by the client, and "the wall passes over streets without a drawn gate in this render"
    (`ftg-payload-visual.md` §8.6).
  - In 2023 gates existed only as district names (MARKGATE, CLOTH GATE; `ftg-posts-a.md` §2.14).
  - Wall placement is `Around all lots` / `Around stage lots` only (`ftg-docs-params.md` §1.3). Moats and bypasses
    were "planned" (120828892).
  - The castle is "a random wall layout" fitted into its district lot (137812814), and is only generated with a
    king/queen government (144226579).
  - A castle-centred ringed city is "tricky"; "it might be easier to manually place a castle after generation"
    (CR to Jason DeGonia, 144226579).
- **User impact:** walls do not govern movement (roads cross anywhere), gates cannot be named, used or converted, and
  castles are decorative stamps whose siting ignores defensibility.
- **Root cause:** the wall is a by-product ("place wall after" a stage) traced over existing lots. It is not a
  constraint that roads and gates must respect.
- **Beat it:**
  - Make fortification a first-class network. Derive the circuit from a growth-stage boundary plus terrain (crest,
    river bank).
  - Put gates where arterials cross, and route arterials to gates. Space towers by rule (spacing, corners, gates).
  - Add an intervallum street where appropriate, and optional ditch or moat.
  - Site castles by defensibility (height, water, gate control), not by government type alone.
  - Make conversions first-class geometry operations for EVO: wall → ring road, gate → junction, outer circuit added.
- **Measure:**
  - Every arterial crossing a wall has a gate (100 %); no street crosses a wall elsewhere (0).
  - Tower-spacing distribution against target.
  - Gates per arterial.
  - Castle site score percentile among candidate sites.
  - EVO: a wall → ring-road conversion preserves all abutting plot ids.
- **Over-correction risk:** FTG's best realism move must stay. The wall encloses an early growth stage, and the town
  grows outside it (120828892/09; stage 1 = 20 % of buildings, walled). So does configurable multi-ring walling.

### GEO-5 · Water is heuristic: two-arm coasts, rivers that can loop into the sea, border-touch typing, faceted outlines, template harbours [BASE]
- **Who:** CR · REC · US×2 (Kole D, 5H4P35H1F7).
- **Evidence:**
  - Coasts grow "in two arms … until it hits the edge of the map". Detail is "etched" as bays or headlands
    (`createSettlement__water.md`).
  - Ocean-vs-river typing: "if a significant portion of the body touches the map border, it's an ocean", otherwise a river — lakes are lumped with rivers (153121107).
  - Water outlines are resampled to a uniform 50 m step (`_critic-ftg.md` §4 row 18).
  - Harbours are one of six template polygons "carve[d] out of a waterfront district" (`ftg-docs-params.md` §4.3). The
    12 recorded piers are identical: 75.6 m long, 15 m apart (F11).
  - Water cannot be drawn through a red exclusion circle at the origin.
  - Coast side: "render a bunch of maps till I get one on the side I want" (Kole D, 2025-06). The compass-direction
    control shipped only in 2026-05 (157283634).
  - Earlier: "buildings and farmland always ended up too close to the ocean edge", and the coast was "pretty smooth
    with no interesting details" (CR, 130937474); now fixed by beach, cliff and rock bands.
- **User impact:** water semantics (lake vs river vs sea), harbour realism and coast placement are hard to control;
  harbours repeat.
- **Root cause:** water is an independent pre-pass with shape grammars and no terrain, bathymetry or drainage.
- **Beat it:**
  - Set sea level on the heightfield. Drainage then gives rivers and lakes with explicit semantic types.
  - Choose bridges at narrow, stable crossings.
  - Fit harbours to coast shape and depth, with quay length sized from the waterfront economy.
  - Vary piers by demand and material.
  - Keep curves smooth (store splines or a fine resample).
- **Measure:**
  - Water typing correct by construction (0 heuristic classifications).
  - Coast side, river count and island count honoured on request (100 %).
  - Harbour quay length ∝ waterfront building count.
  - Pier length/spacing coefficient of variation > 0.
- **Over-correction risk:** FTG's coast work is strong and must be kept: per-segment beach/rock/cliff classes; the
  "ease into detail shape" envelope that keeps the harbour usable near the centre; depth and foam; ponds. So must its
  hard legality rule (rivers bridged, oceans terminate roads).

### GEO-6 · Land use is emergent, not rule-based: resources, noxious trades, factions and class geography do not shape the map [BASE; S3-hook context]
- **Who:** CR · US×1 (IronWithinIronWithout).
- **Evidence:**
  - Resources: "This doesn't affect generation, but does affect the settlement simulation" (`createSettlement__overview.md`).
  - District type comes from "the remaining unplaced buildings, and what the lot is next to", with the scoring unstated
    (`createSettlement__algorithm.md`; `_critic-ftg.md` §6.2).
  - Residential order: the district "with the largest population" used to be placed first, "closer to the settlement center". A class-order option arrived only in 2026-05 (157283634).
  - Industry is a pool tag glossed as "you don't want in the settlement center" (`editSettlement__regenerate_area.md`).
  - Faction turf was asked for; the creator replied "the factions are generated before buildings are placed", so map sense "would need some thought" (84680671).
  - Outer land is placed "trying to place similar features next to each other" (`ftg-docs-params.md` §2.8).
- **User impact:** tanneries, mills, markets, the rich and the poor land wherever the pool order puts them, and a DM
  cannot rely on the map to tell a story (the smelly quarter downstream, a market at the gate, a thieves' quarter).
- **Root cause:** the one-way content → layout handoff (SIM-1). Placement consumes pools, and nothing scores a lot's
  suitability for a use.
- **Beat it:**
  - Siting becomes explicit, data-driven rules scored against a **per-lot context vector**: area and shape; frontage and
    road class; district type; distance to centre, gate, market, water and wall; slope; upstream/downstream position;
    wealth gradient.
  - The rules are data tables calibratable against the later corpus: noxious trades downstream and outside the walls,
    mills on water, markets at crossroads or gates, wealth near the centre or high ground, faction turf by rule.
  - The same vector is the S3 building-class input.
- **Measure:**
  - Rule-satisfaction rates, e.g. the share of noxious trades downstream or extramural.
  - Median distance to water of water-dependent trades.
  - Spatial autocorrelation (Moran's I) of wealth.
  - Faction turf compactness.
- **Over-correction risk:** keep FTG's lifestyle-based district identity and sub-district clumping ("industry clumping
  together as it's more economical", 84680671). Keep one-click defaults. Rules must stay probabilistic enough to
  produce surprises.

### GEO-7 · Scale and extent: units were wrong for years, knobs have hidden semantics, and the map is a fixed canvas per size class [BASE]
- **Who:** CR · REC.
- **Evidence:**
  - "not using a 1:1 scale in the x/y axis", so buildings came out about 3× too large, found only because
    street view "felt" wrong; a ruler was built to diagnose it (106664214).
  - `roadLength` persists as L + 0.5 for main roads and (L + 0.5)/2 for district streets, which took two captures to
    establish (`roadlength100/README.md`).
  - The map width is a lookup by size class (HAMLET 1500 m … METROPOLIS 6000 m) while population spans 550×
    (`ftg-docs-params.md` §3.1). The map is a fixed canvas, and "size is expressed as density, which caps the largest settlement's legibility" (`ftg-payload-visual.md` §10).
  - The Galeiaward core is ≈ 1.4 km across on a 5 km map with 44 % sea.
- **User impact:** real-scale use (VTT grids, rulers, travel times) depends on invariants that were not tested. Small
  towns float in large empty frames, and big cities crowd theirs.
- **Root cause:** units are conventions in code rather than tested invariants; the extent is not derived from the
  settlement's needs.
- **Beat it:**
  - Metre-true geometry with automated scale tests: house footprint distribution, street widths per class, plot depths,
    wall thickness.
  - Derive the extent from built area + hinterland demand (fields per population, woodland) + a margin.
  - Every parameter carries a unit and a documented effect (provenance for the corpus phase).
- **Measure:** scale tests pass in CI; the built-area ÷ map-area ratio stays within target bands across sizes;
  parameter documentation coverage is 100 %.
- **Over-correction risk:** FTG already does most of this right today: real-metre form fields, a ruler, a scale bar, a
  2 m / 5 ft grid, a unit toggle. Keep them.

## 5. Variety and control

### VAR-1 · Controls act on the growth process, not on outcomes; intent is reached by redrawing or re-rolling [BASE]
- **Who:** CR · US×6 (Kole D, 5H4P35H1F7, Jason DeGonia, The LoreMaster's Workshop, Peter Hawkins, Kyle).
- **Evidence:**
  - A stage has 14 fields and the suburb stage 16, and some are not exposed at all (`roundedEdges`,
    `createPerimeterSpokes`, `perimeterSpokeDistanceMultiplier`; `ftg-docs-params.md` §1.3–1.4).
  - Several knobs are opaque. `Number of districts` = Less/Normal/More has no stated effect. `Default` farmland "will
    change … based on a variety of factors". Two branch counters exist, but only one meaning is documented. More
    segments give larger lots, "but … this isn't guaranteed".
  - The form spans 12 sections (149103655).
  - Users reach intent indirectly:
    - coast side by re-rolling or drawing water (Kole D; 5H4P35H1F7);
    - a castle-centred ringed city is "tricky … easier to manually place a castle" (Jason DeGonia);
    - a valley town with only through-roads needed a new option (LoreMaster's Workshop, shipped 2025-03);
    - a layout preview before population was refused (Peter Hawkins);
    - walls and district boundaries cannot be drawn first (Kyle, VAR-2).
- **User impact:** power users learn the growth machine, casual users re-roll, and neither can say "three gates, one
  wall ring, market by the river, coast to the west" and get it.
- **Root cause:** parameters are the internal agent's knobs exposed one-to-one (the UI "is a direct window onto internal
  data structures", `ftg-posts-a.md` intro). The map-side outcomes have no solver.
- **Beat it:**
  - An intent layer of outcome targets: site type, coast side and river course, gate count, wall rings, district count,
    target block size in m², density gradient, landmark set.
  - The generator satisfies the targets (they are constraints, VAR-2) and reports achieved against requested values.
  - Process knobs remain as "advanced", with units, live estimates and monotonic, documented effects.
  - Presets are data files.
- **Measure:**
  - Intent satisfaction rate (requested vs achieved) = 100 % for hard targets and within tolerance for soft ones.
  - Re-rolls needed per brief in a user test.
  - Parameter → outcome monotonicity tests: e.g. raising the target block size never lowers the median block area on a
    seed benchmark.
- **Over-correction risk:** FTG's one-click basic form (Name, Size, Layout preset, Lifestyle, Coastal, Rivers, Farms,
  Forests, Walled) with good defaults is its front door. So is its fully exposed advanced surface. Keep both, and keep
  presets. Intent targets must not become a mandatory questionnaire.

### VAR-2 · Authored constraints cannot be generator input: only water can be pre-drawn [BASE; ASSIGN-hook]
- **Who:** US×1 FTG (Kyle) + US×1 in the MFCG devlog threads (BCS) · CR.
- **Evidence:**
  - It would be "really handy" to "lay down some initial walls and district boundaries" before the generator fills in the
    rest (Kyle, 103668405, 2024-06-01).
  - "draw out the placements of farms, bridges, and certain buildings, walls" (BCS, MFCG
    devlog 91172).
  - FTG's only pre-generation authoring is the initial water state (river path, ocean shape, ponds, islands via two
    ocean shapes) (153121107, `createSettlement__water.md`).
  - Castles, ringed layouts and specific landmarks are placed by hand after generation.
- **User impact:** DMs with a canon city (a known map, a plot-critical temple beside the river gate) must generate and
  then fight the generator by hand-editing.
- **Root cause:** content-first generation fixes the manifest, and geometry grows from the centre outwards. There is no
  slot for pinned geometry.
- **Beat it:**
  - A constraint layer of pinned features the generator must respect and fill around: walls, gates, roads, district
    outlines, landmarks, water, reserved areas, and specific buildings.
  - This is the base's ASSIGN-hook in its general form. An external assignment of a name, function or shape class
    targets one building, one neighbourhood (with diversity inside) or N dispersed buildings chosen by a placement solver
    under criteria.
  - Assignments take precedence over class rules, within declared drift bounds.
  - All of this needs the stable ids of DAT-2.
- **Measure:**
  - Pinned-feature satisfaction = 100 %.
  - Invariant violations around pins = 0 (ROB-1 suite).
  - Pins retained across regeneration = 100 %.
  - The dispersed-placement solver meets its criteria (distance/spread constraints) in 100 % of feasible requests and
    reports infeasibility otherwise.
- **Over-correction risk:** pins are optional. The empty-canvas one-click path must remain as fast and as good. FTG's
  water pre-draw is the precedent to generalise, not replace.

### VAR-3 · A narrow repertoire of historically distinct settlement forms [BASE; VG-np]
- **Who:** CR · REC · US (see VAR-1, GEO-3).
- **Evidence:**
  - "Most of the settlements in FTG look similar" (2024, 112861635). A 50 000 map was "a near-uniform mesh of small
    blocks" ([SHOWN] 99652534/03).
  - V2 added staged spokes and suburbs, `initialRoadsType` (7 values) and six layout presets (Custom, Medieval europe,
    Medieval europe (more twisty), American, Ringed, Ringed (no suburbs)).
  - Still missing: hill towns and ravine or cliff sites (GEO-3), a castle-centred ring (GEO-4), and planned
    new towns, bridge towns, monastic or cathedral closes and port towns with quay-parallel streets. None exists as a
    form. The wish for "special landmark districts … groups of buildings to create a larger complex" is stated but not
    built (106664214).
- **User impact:** after a few towns, a user recognises the generator; campaign variety depends on hand-editing.
- **Root cause:** forms are parameterisations of one growth agent, not models of how different towns came to be.
- **Beat it:**
  - A catalogue of settlement forms grounded in historical types: organic, planned grid/bastide, linear or street
    village, radial, hill/acropolis, bridge, port, monastic/cathedral close.
  - Each form is a set of constraints plus a growth programme with measurable morphometrics.
  - Forms compose by growth stage (an organic core with a planned extension).
  - Village forms can later reuse the same machinery (VG-np).
- **Measure:** a morphometric classifier separates the forms (accuracy target), while within-form diversity (variance of
  morphometrics across seeds) stays above a floor.
- **Over-correction risk:** too many forms dilute recognisability. FTG's presets as data and its staged growth are the
  right substrate, so extend them rather than add unrelated generators.

## 6. Editing and regeneration locality

### EDT-1 · Regeneration destroys authored work and people, and the generator cannot tell edited from generated [BASE; EVO-hook; ASSIGN-hook]
- **Who:** CR (guide + posts) · US×2 (Dylan Kennedy, Deahal).
- **Evidence:**
  - Re-roll district "will delete any existing buildings + decoration" and create a new district "filled with buildings + new people" (84680671).
  - Bulk regenerate: "Regenerating buildings will delete any residents" … "This action cannot be undone" ([SHOWN] 159738553/19).
  - The guide on jobs: existing buildings keep unfilled postings because "the generator doesn't know which ones you are happy to have edited" (`editSettlement__regenerate_area.md` L80).
  - Re-rolling a building to a type without jobs makes its workers unemployed (`editSettlement__buildings.md`).
  - Users: Dylan Kennedy doesn't want to re-roll the district: it holds "custom locations I already baked in" (120828892). Deahal: a regenerated area comes out "too snug" (denser than the original
    with the same settings, lining invisible edges), and there is no density or road-padding control (157283634; the
    invisible-edge bug fixed the same day).
  - An accidental person deletion needed the creator's backups: "I store backups of settlements so I'll make a copy
    from that" (106664214).
- **User impact:**
  - Users avoid the regeneration tools once they have invested in a town.
  - They are pushed into slow one-by-one manual edits.
  - Mistakes need a support request.
- **Root cause:** there is no per-entity provenance (generated / edited / pinned / assigned) and no undo log. The
  regenerate tool is a different code path with different parameters from the original generation.
- **Beat it:**
  - Every entity carries provenance and a lock state. The generator never mutates locked or edited entities.
  - Regeneration is a scoped transaction that re-derives only unlocked entities, with the *same* pipeline, parameters
    and sub-seeds as the original stage (so it is statistically indistinguishable).
  - People are reconciled rather than deleted: households move instead of vanishing, and jobs are re-matched.
  - A full undo/redo and version history for users.
- **Measure:**
  - Locked-entity preservation = 100 %.
  - Density/frontage KS test, regenerated area vs original generation, p > 0.05 on a benchmark.
  - Entities touched outside the scope = 0.
  - Undo coverage = all operations.
  - People lost by a regeneration (reported, and 0 unless requested).
- **Over-correction risk:** FTG's dual workflow is the most praised thing in the threads: "I can use the generation's broad strokes or get super specific whenever I want!"; other tools are "basically one or the other" (Deahal, 157283634).
  Locks must not make regeneration timid by default. The scope is the user's choice.

### EDT-2 · Existing towns are frozen: new features and fixes never reach them [BASE; EVO-hook]
- **Who:** CR · US×3 (Kole D, yingfortheking, leo cameron).
- **Evidence:**
  - New coast and harbour features "need to be manually added to existing settlements"; "the new generation only
    applies to new settlements" (CR reply, 130937474).
  - "There is no way to automatically regenerate settlements with these features" (151265004, 2026-03-13).
  - The half-elf description fix applies "only for new settlements" (86856028).
  - Only data repairs are retroactive (the duplicate-intersection repair, 153121107).
  - leo cameron: "Time To regen all my northern settlements" (147332188) — the workaround costs their edits.
- **User impact:** long campaigns are stuck on the generator version they started with, and upgrading means rebuilding.
- **Root cause:** the persisted object is the materialised output with baked text ("persistence is sacred",
  `ftg-posts-a.md` §4.5). The recipe that produced it is not stored, so it cannot be replayed.
- **Beat it:**
  - Store the recipe (generator version, seed, parameters, assignments, edit log) beside the materialised town.
  - Offer an opt-in *upgrade* that replays the recipe under the new version, re-applies edits and locks, and shows a
    diff before committing.
  - Keep derived text regenerable from stable ids (DAT-2).
  - The same replay machinery drives EVO epochs.
- **Measure:** upgrade success with 100 % edit retention on a regression corpus of edited towns; diff size reported; a
  replay of the same version is byte-identical.
- **Over-correction risk:** never change a user's town silently. FTG's refusal to break saved settlements is right, and
  the upgrade must stay explicit and reversible.

### EDT-3 · Semantic and bulk editing came late and stays coarse [BASE; EVO-hook]
- **Who:** US×6 (Chris Wilson, Fraser Macdonald, Dylan Kennedy, peter ngo, Jason DeGonia, Hunter Pritt) · CR.
- **Evidence:**
  - Bulk edit and regenerate for buildings arrived only in 2026-06 (159738553), and "people linked to the buildings are
    not updated in any way". Before that: "If I could re roll many buildings at once that would be huge"; one by one "in a big city is very slow" (Dylan Kennedy, 120828892, 2025-03-06).
  - Ruins: asked in 2023 and 2024 (Chris Wilson; "still on the to do list"). "Rubble-ize" a lassoed part of the city for
    campaign devastation (Fraser Macdonald, 91451446).
  - No post-generation religion redistribution and "no easy way to change whole families" (peter ngo, 79527117).
  - Races, religions and genders can be added but never deleted "as people or buildings may still be linked to them"
    (101576411).
  - The roof bulk brush "does miss spots" (Jason DeGonia, 144226579). Players cannot colour their favourite buildings, only
    pin them (Hunter Pritt, 149103655).
- **User impact:** campaign-driven changes (a fire, a siege, a new guild) are hand work at metropolis scale.
- **Root cause:** edits operate on records and brushes, not on queries over a typed model. Referential integrity is
  kept by forbidding deletion.
- **Beat it:**
  - Selection by query over stable ids ("all tanners", "every building in this polygon", "households of religion X").
  - Batch operations as transactions: convert, ruin, demolish, re-assign, recolour, rename.
  - Referential integrity maintained by migrating references (merge religion A into B) rather than forbidding deletion.
  - Ruin and devastation are lifecycle states, which is the EVO vocabulary.
- **Measure:** time to "replace all N buildings of type X" (seconds, not minutes); dangling references after any batch
  operation = 0; each operation undoable.
- **Over-correction risk:** FTG's append-only dictionaries are a cheap, robust integrity choice. Replace them only with
  something equally safe.

### EDT-4 · A town exists only in hours and days: no years, no ageing, no growth or ruin [EVO-hook]
- **Who:** US×3 (Mr. Malice, Chris Wilson, Fraser Macdonald) · CR.
- **Evidence:**
  - A user asked for "character age with the map", or a way to "add a year manually" to everyone
    (Mr. Malice, 65223067, 2026-08-03). The creator: "that currently isn't possible"; "year increases in the time simulation" would be "cool" someday.
  - The calendar is hours/days/rest days (123982784), and the simulation is an hourly query (`ftg-posts-b.md` §T-08).
  - Ruins and devastation are wanted (EDT-3).
  - The 2023 wall rows ("estimate percentage of buildings within wall") show the growth metaphor was already in the
    layout (`ftg-posts-a.md` §2.14). But growth runs only once, at creation.
- **User impact:** multi-year campaigns cannot age their town; a war, a plague or a boom cannot be applied as history.
- **Root cause:** generation is a one-shot construction. There is no lifecycle state and no epoch model.
- **Beat it (hooks only, per the owner):**
  - Every entity has a lifecycle and version history (built, altered, converted, ruined, demolished).
  - Circumstances (population, wealth, threat, trade, terrain events) are time-varying inputs.
  - Epoch N+1 = f(epoch N persisted state, inputs, the seed's epoch sub-stream), and nothing that survives is re-rolled.
  - Conversions (wall → ring road, gate → junction, suburb → district) are first-class geometry operations.
  - The growth-based backbone (GEO-2) and the staged layout make incremental growth natural.
  - Population ageing is a roster epoch.
- **Measure:**
  - Identity continuity (share of ids surviving an epoch unchanged unless an event touched them).
  - Determinism (same seed + inputs → same history, 100 %).
  - Traceability (every change references a recorded event).
- **Over-correction risk:** the base must not pay for evolution now. The hooks are ids, lifecycle fields, recipe
  storage and incremental-capable stages, not a simulator.

## 7. Scale and performance

### PERF-1 · Everyone is instantiated up front: population is capped, and files and loads grow with every person and tree [BASE]
- **Who:** CR · REC.
- **Evidence:**
  - The size cap went from 10 000 to 50 000 people (premium above 25 000), "all fully populated" (99652534).
  - Before that, larger settlements were blocked by "the speed of generation, and the size of the generated
    settlements" (88558259).
  - Relations were 30 % of the file until the family-unit model cut them to 10 % (95869798).
  - 50 k individually stored trees ≈ 1 MB "which adds up over all the settlements", so forests became render-time fills
    (144226579).
  - Metropolis load went from ≈ 20 s to ≈ 10 s (153121107); the download endpoint shrank 50 % (157283634); sint32
    coordinates saved 5 % (164816716).
  - "Enable larger maps where not all the people are actually generated" was considered (91451446).
  - Recorded: 593 KB and 644 KB payloads for ≈ 9.5 k people, and 2.05 s of client CPU to load (§2).
- **User impact:** hard size ceilings, slower loads on big cities, and storage cost paid by the host (hence premium
  gating).
- **Root cause:** every person, relation and tree is materialised and stored at creation. FTG's own lazy person-detail
  derivation ("only a few key details are saved per person"; "the rest is generated when the person is selected",
  `useSettlements__settings.md`) stops at attributes.
- **Beat it:**
  - Extend deterministic lazy derivation upward. A building's household, workers and their details are derived on
    demand from the building's id sub-seed plus the roster statistics.
  - Only aggregates, locked people and edits are stored.
  - Big cities use statistical population LOD per district, with individuals materialised when a user or the simulation
    looks at them.
  - Scatter (trees, rubble) is seeded per entity and never stored (ROB-4).
- **Measure:**
  - Stored bytes per 10 k population.
  - Load time p50/p95 for 50 k and 200 k.
  - Memory ceiling.
  - Derivation stability: the same person on every view, 100 % across sessions and machines.
- **Over-correction risk:** the "consistent answer" (Kitt Schlatter, 79527117) is the product. A lazily derived person
  must never change once seen: pin anyone a user has looked at or edited. FTG's own race-edit drift (DAT-2) shows what
  happens when derivation is not pinned.

### PERF-2 · Rendering cost gates features: good looks are tiered off on weaker devices [BASE; S3-hook LOD]
- **Who:** CR · REC.
- **Evidence:**
  - Straight-skeleton roofs are "more computationally expensive to render", so the old rectangle-texture renderer
    remains the default on less powerful devices (103668405).
  - 3-D roofs are recomputed "every render, it is not stored in the server" (`useSettlements__map.md`).
  - "Above 50k" rendered trees and "the framerate of the app would drastically drop" (144226579).
  - Blurred field edges are hardware-gated, and perimeter smoothing "immediately lost" a round of performance gains
    (144226579).
  - Rendering is on demand only, so "animating things are impossible" (153121107).
  - The shadow-map option goes up to 16384² (`ftg-posts-c.md` §2.4). "Some clipping still occurs on roads … I plan to
    leave that as is" (106664214).
- **User impact:** the praised look (lighting, roofs, trees) degrades on the laptops and tablets DMs actually use.
  Animation (water, moving people) is impossible.
- **Root cause:** one merged scene, with roof geometry recomputed per render. There is no level-of-detail display list
  and no caching of derived geometry.
- **Beat it:**
  - A level-of-detail display list per building: outline → wings and roofs → rooms (the S3 LOD contract).
  - Roof and scatter geometry are computed once per entity and cached by id (deterministic, so the cache can be
    discarded safely).
  - District-level tiles or caches (MFCG caches per ward: 46 000 fills → 590 GPU uploads, `visual-spec.md` §1.1).
  - Instanced trees; progressive detail by zoom.
  - A headless generator separate from the renderer.
- **Measure:**
  - Frame time at 50 k buildings / 200 k trees on a reference low-end device.
  - Roof computations per frame after warm-up = 0.
  - Time to first meaningful paint.
  - Draw calls per 1 000 buildings.
- **Over-correction risk:** FTG's tiered defaults and on-demand rendering are good engineering (battery, fans). Keep
  them; the aim is to make the top tier cheap, not to force it.

### PERF-3 · A server-bound product: generation, storage and embedding all run through FTG's servers and an iframe [BASE API]
- **Who:** CR · REC · US×3 (Apophenic Realms, Zips, passivedragon).
- **Evidence:**
  - Generation is a server call (PUT answered in ≈ 3 s) returning a protobuf (`roadlength100/README.md`,
    `ftg-posts-c.md` §2.21).
  - The site deploys as static files, and generation and storage are an API (F20).
  - VTT use is an iframe over an empty 5000 × 5000 scene (`ftg-payload-visual.md` §7.1). Roll20 needs a browser
    extension because its mod API "doesn't allow iframes … or … web requests" (127128581).
  - "Currently there are no plans for a direct API" (75844005).
- **User impact:** no offline use; no embedding in other tools without an iframe; every integration depends on the
  host staying up; integrators cannot generate programmatically.
- **Root cause:** a hosted product model: the town lives on the server, and the client is a viewer/editor.
- **Beat it:**
  - An embeddable, deterministic library with a clean API (seed + params + assignments → town; edit transactions;
    derivations), runnable in a browser, a server or offline.
  - An optional persistence/sync service on top.
  - This is the owner's roadmap consequence ("embeddable library API with a clean boundary").
- **Measure:**
  - Generation p50/p95 by size, client-side, on reference hardware.
  - Runs fully offline.
  - API coverage of every UI operation.
  - Integration without an iframe is possible.
- **Over-correction risk:** FTG's hosted persistence enables sharing links, public pins and multi-client sync (the
  `stateId` protocol). Keep a sync-capable persistence layer as an optional service.

## 8. Rendering and style

### REN-1 · Semantic glyph conflicts and features that look present but cannot be read or clicked [BASE]
- **Who:** REC/findings · US×1 (Jason DeGonia) · CR.
- **Evidence:**
  - Market stalls and shanty-town tents share one saturated cone glyph (F16).
  - Fenced yards render as outline-only boxes users take for broken buildings: "what are the empty spaces for?" — a box "you cant click on" (Jason DeGonia, 144226579).
  - The district label "Ashton is small and nearly hidden" (`ftg-payload-visual.md` §8.8).
  - Grid lines are "too thin and won't be rendered" when zoomed out (159738553).
  - There is no compass or north arrow (`visual-spec.md` §4.5).
  - The wall crosses streets with no drawn gate (`ftg-payload-visual.md` §8.6).
- **User impact:** misreadings at the table (a market or a slum? a house or a yard?) and features users cannot interact
  with.
- **Root cause:** glyphs grew feature by feature, with no symbol registry that maps each semantic class to one
  distinguishable symbol and a legend.
- **Beat it:**
  - A symbol registry: every semantic class maps to one glyph and style, and the map legend is generated from it.
  - Every visible feature is hit-testable and inspectable.
  - Map furniture (grid, north arrow, scale) adapts to zoom (fade the grid below a threshold rather than dropping lines).
- **Measure:**
  - Glyph → class ambiguity = 0 (automated check over the registry).
  - Legend coverage of visible classes = 100 %.
  - Share of visible features that are clickable = 100 %.
  - Label visibility, defined as the share of district labels whose on-screen height reaches the legibility floor at
    default zoom.
- **Over-correction risk:** FTG's colourful, lit look is praised ("as soon as I saw the lighting changes … I knew I had to subscribe", Teagan, 147332188). Its thematic layers desaturate the base and add a legend
  (159738553). Keep both.

### REN-2 · One lit style plus post-process filters; no print/ink cartography, no underground or biome palettes, lossy SVG [BASE; LAYER-hook]
- **Who:** CR · US×2 underground (Freddy Hewitt, Deahal) · REC.
- **Evidence:**
  - The map is a lit three.js scene: normal-mapped canopies and walls, tiled 64² land-use textures, no ink outlines
    (`visual-spec.md` §4.1–4.2, §5).
  - Alternative looks are post-process filters (greyscale, sepia, green tint, pixelation, dot screen, scanline,
    crosshatch; 137812814).
  - SVG export: "you lose certain details — trees are simplified and texture detail is lost" (`useSettlements__export.md`).
  - Underground and Underdark are not possible: "different map effects / colours is something I'd like to add"
    (133016301).
  - Climate presets (temperate/desert/polar) and weather and season exist (147332188).
- **User impact:** users who want a printed, hand-drawn or Underdark map re-draw it elsewhere. SVG users lose detail.
- **Root cause:** style is baked into scene construction (materials, textures, lighting) rather than applied to a
  semantic display list.
- **Beat it:**
  - One semantic display list, many styles as data: a monochrome print style (casing, hairlines, hatching, cf. MFCG in
    `visual-spec.md` §1), the lit colour style, parchment.
  - Per-layer styles (underground, ground, sky) with z-order, shadows and per-layer export (LAYER-hook).
  - Vector export that preserves semantics and detail.
- **Measure:**
  - The number of styles rendering one display list with feature parity.
  - SVG/PDF export fidelity (feature count and positions vs screen = 100 %).
  - Render-style switch without regeneration.
- **Over-correction risk:** FTG's lighting, day/night cycle, seasons and weather are unique among the references. Keep
  them as one style among several.

### REN-3 · Cheap statistical shortcuts are visible: round-robin scatter, no spacing, identical piers, template landmarks [BASE; S3-hook]
- **Who:** REC · findings author.
- **Evidence:**
  - Trees: 7 sprites assigned round-robin (590/590/589×5), every `scale` = 1.0, and no minimum spacing (NN minimum
    0.14 m, median 9.7 m).
  - Well, bandstand and statue: exactly 14 instances each, a deck-style draw (`ftg-payload-visual.md` §3.5, Critic
    addendum).
  - Piers: 12 identical 75.6 m bars at 15 m spacing (F11). Harbours come from 6 template polygons.
  - Temples: fixed 6- and 7-pointed stars or octagons. Keeps: a cruciform template (`ftg-docs-params.md` §2.6).
  - Water outlines: uniform 50 m chords.
  - The findings author: "three cheap choices that are visible in the statistics and worth deliberately improving on"
    (`ftg-payload-visual.md` §10).
- **User impact:** repetition becomes visible across towns (the same temple star in every city, identical piers), and
  canopy clumps overlap unnaturally.
- **Root cause:** cheap, seed-free distribution tricks and template libraries chosen for speed and storage.
- **Beat it:**
  - Seeded blue-noise scatter with ecological rules: hedgerow spacing, orchard rows, woodland edge density, clearance
    from buildings.
  - Size and colour jitter per instance.
  - Landmark footprints generated from rules plus a context vector (S3 building-composition interface), not fixed
    stamps.
  - Pier count, length and spacing from demand.
- **Measure:**
  - NN distance p1 above the canopy-overlap threshold.
  - Template repetition rate across a 100-town corpus (the share of landmarks with identical footprints).
  - Coefficient of variation of pier lengths.
  - Scatter statistics (pair-correlation function) per ecological class.
- **Over-correction risk:** hedgerow rows along every field boundary are "the single most distinctive FTG texture"
  (`visual-spec.md` §4.4). Keep a signature texture. Cheapness mattered for storage; seeded procedural fills keep it
  cheap.

## 9. Labels and typography

### LAB-1 · Only district names are drawn; roads are not entities, so there are no street names or addresses [BASE]
- **Who:** US×2 FTG (Pablo David Gaytan Rodriguez, rumyrrh) + US×2 in the MFCG devlog threads (Sherevar,
  EltharinFireDragon) · CR · REC.
- **Evidence:**
  - "Have you considered adding names to roads?" (2024-11-29) and "Is there a way to add road names" (2025-06-10); both
    times "on the to-do list" (112861635, 130937474).
  - "No street names, no building labels on the map"; building names live in search and dialogs
    (`ftg-payload-visual.md` §8.8).
  - Recorded: 62 % of road nodes have degree 2; "a 'road' is an emergent run of edges, not a first-class object"
    (`ftg-payload-visual.md` §5.1).
  - MFCG users ask to "number all buildings" (Sherevar, devlog 11802; EltharinFireDragon, devlog 153064). FTG answers
    with search and dialogs, not addresses.
- **User impact:** players cannot say "meet me on Tanners' Row". DMs cannot give directions or hand out a labelled map.
- **Root cause:** the road store is an edge graph (for the fill tool) without a *way* entity carrying identity, class
  and name.
- **Beat it:**
  - Way entities: named, classed streets built from the graph, with stable ids that survive edits.
  - Street names derived from context: destination ("Mill Road"), trade, landmark, wall/gate, or the owner's family.
  - A path-label placement engine with collision handling and zoom-dependent density.
  - Optional addresses (street + number) as a layer and in exports.
- **Measure:**
  - Share of streets above a length threshold that carry a name.
  - Label collisions per 1 000 labels = 0.
  - Labels visible per zoom level within target density.
  - Address coverage of buildings.
- **Over-correction risk:** clutter. FTG's clean map plus search box is a good pattern, so labels must thin with zoom
  and remain toggleable.

### LAB-2 · Names and generated text: random contractions, grammar bugs baked into the file [BASE]
- **Who:** CR · US×4 (Lucy Jones, Gabriella Galvez, Bri Rowland, Brett).
- **Evidence:**
  - District names erode by contraction (Rustic Village → Ticwick, Hamlet Tower → Hamower). This is charming, but
    readability needed a syllable budget (≤ 3 syllables for nicknames) added in 2026-05 (157283634).
  - The appearance template produced "Has Is clean shaven." and pronoun agreement bugs; the fix applies to new
    settlements only (Lucy Jones, 86856028).
  - Female characters in beard lines outside bearded races (Gabriella Galvez, 120828892). Missing is/are agreement (Bri
    Rowland, 144226579).
  - Re-rolled households share surnames (Brett, 79527117; expected by design, reported as a bug).
  - Event texts were largely LLM-authored ("I used it to come up with a lot of the events I programmed", 79527117).
- **User impact:** broken sentences break immersion at the table, and the fixes never reach existing towns.
- **Root cause:** string-template concatenation with untyped slots; text baked into persisted records.
- **Beat it:**
  - Typed templates: slots declare part of speech, number and person, and a grammar layer does agreement.
  - Text derived from stable ids (regenerable after fixes, EDT-2).
  - Toponyms derived from place and history: an eroded name is an EVO epoch's change to an original name, recorded
    as such.
- **Measure:**
  - Grammar error rate on 10 k generated descriptions (automated checker plus a human sample) → 0 critical errors.
  - Name length and syllable distributions within target.
  - Share of place names that reference an actual nearby feature.
- **Over-correction risk:** FTG's "folk-contraction" naming is charming and evolution-friendly (an old name and its
  worn form). Keep the idea; make it rule-driven and recorded.

## 10. Data model, export and interop

### DAT-1 · Exports are one-way and lossy, and there is no API or public schema [BASE API; LAYER-hook]
- **Who:** US×5 (Apophenic Realms, DarkEspeon, Dylan Kennedy, Kitt Schlatter, Scott Franzitta) · CR.
- **Evidence:**
  - GeoJSON omits districts: asked 2025-01-12 and "added … to the to-do list" (112861635). They are still absent from
    the 2026-09 guide ("backgrounds, edges, buildings, and their outlines", `useSettlements__export.md`; F26).
  - SVG export loses trees and textures.
  - The building JSON export is "quite different to the building edit request format", and the creator does not "want to maintain that as an API" (120828892), so no round trip.
  - "Currently there are no plans for a direct API" (75844005).
  - Settings lived in cookies/localStorage, "which users were losing" (`ftg-posts-b.md` §T-33). One user copied
    localStorage through the browser console as a workaround (Scott Franzitta, 79527117). A settings file arrived in
    2025-04, and the reason the full settings were not stored server-side was: "Some of those things I don't want to
    commit making backwards compatible".
  - Edge types are undocumented on the wire (14 types identified only by our measurement, F9–F11).
- **User impact:** worldbuilders cannot carry districts into GIS; integrators cannot automate; bulk fixes need a
  round trip that does not exist.
- **Root cause:** the internal protobuf is the only complete format; exports are hand-written projections; there is no
  commitment to a versioned schema.
- **Beat it:**
  - One canonical, versioned, documented schema used for save, load, export, import and the API. It covers semantic
    features with stable ids, typed classes, metres and parent links: settlement → district/neighbourhood → block → lot
    → building, plus ways, walls, gates, water, and people and relations.
  - GeoJSON, CityJSON-style 3-D, SVG/PDF and PNG are views of it.
  - Per-layer exports (underground / ground / sky → separate VTT levels).
  - A schema validator ships with the library.
- **Measure:**
  - Round trip: export → import → export is byte-identical.
  - Schema coverage of every entity type = 100 %.
  - Third-party open test: the GeoJSON validates and opens in QGIS with districts.
  - Integrators can regenerate a town from the recipe alone.
- **Over-correction risk:** FTG's compact binary (593 KB for 2 798 buildings, 4 125 trees and the whole population;
  integer centimetres; zig-zag sint32) is efficient. Keep a compact binary encoding of the same schema.

### DAT-2 · The model is incomplete and inconsistently keyed: unserialised lots, districtless buildings, index-keyed references [BASE; S2; S3-hook; ASSIGN-hook]
- **Who:** REC · CR (guide) · US×2 (Daniel Watson, NeutronTaboo: reference consistency via the guild bug).
- **Evidence:**
  - Recorded containment gaps. District-stage lots are not serialised, so only 53 % of buildings lie in any lot. 49 %
    and 36 % of buildings lie in no district ring (§2). The forest is stored twice (as a lot and as a tree region). The
    wall exists only as tower points. Roads are not entities (LAB-1).
  - Keys and references:
    - Appearance options are stored *by index*, so renaming option 2 from 'brown' to 'red' turns brown-haired edited
      people red, and editing a race changes the un-persisted attributes of existing people
      (`useSettlements__settings.md`, `ftg-docs-params.md` §3.10).
    - Dangling references broke the simulation: "bulk editing people could result in a carer being deleted", which would "break simulation", and "a faction meeting would be at a building that doesn't
      exist" (157283634).
    - A guild building template carried a fixed 22 (or 20) jobs regardless of the faction's requested size (151265004 →
      153121107).
  - The recorded duplicate-footprint stacking (§2) is itself an identity failure: two households, one house.
- **User impact:** exports and tools cannot answer "which district, which block, which lot is this building in?".
  Edits have side effects at a distance. The simulation breaks on dangling ids.
- **Root cause:** the model grew around the renderer and the simulation. Containment is implicit (geometry), and some
  references are positional.
- **Beat it:**
  - A complete hierarchy with stable, addressable ids that survive regeneration of unrelated areas and edits:
    settlement → district/neighbourhood (the S2 unit, an arbitrary boundary polygon with context) → block → lot/plot →
    building (an S3 composition behind an interface) → rooms.
  - Every building sits in exactly one lot, and every lot in one block and one district, suburbs included.
  - Ways, walls, gates and towers are entities.
  - References are by id, with integrity constraints and cascading migrations.
  - Lazily derived data is keyed by stable ids and pinned by generator version.
- **Measure:**
  - Containment completeness = 100 % at every level.
  - Referential integrity tests after any edit or batch operation = 0 dangling.
  - Id stability: the share of ids unchanged when an unrelated area regenerates = 100 %.
  - Renaming a dictionary entry never changes another entity's meaning (test).
- **Over-correction risk:** do not bloat storage or the API. FTG's lazy derivation and its family-unit relation model
  (relations 30 % → 10 % of the file, 95869798) are the right economy; key them properly.

### DAT-3 · VTT integration is an iframe: no tokens, no walls or doors, and the real workflow is a PNG plus manual fixes [BASE; LAYER-hook]
- **Who:** US×3 (Zips, passivedragon, The LoreMaster's Workshop) + US×2 install friction (Dustybin, Jacob Kerpan) · CR.
- **Evidence:**
  - Missing token support is "a really big problem"; "Combat on these fantastic maps is flat out impossible"
    (passivedragon, 120828892, 2025-04-04).
  - Zips' workflow: generate in FTG, then "exporting to PNG, tweaking resolution for tokens to fit the paths", then add trigger tiles (2025-02-02).
  - The creator: rewriting the rendering for Foundry "would double all future front-end work"
    (120828892). He recommends "just exporting the map as an image", with FTG "in another window".
  - Roll20 needs a browser extension that every player installs (127128581).
  - Install friction: the Foundry module folder must be renamed (Dustybin, 81472775), and the origin URL goes into FTG,
    not Foundry (Jacob Kerpan, 81472775).
  - The Foundry scene is 5000 × 5000 with `tokenVision: false`, hosting the iframe only (`ftg-payload-visual.md` §7.1).
- **User impact:** the tool's richest use (a living town at the table) cannot coexist with tactical play; users lose
  interactivity or tokens, never keep both.
- **Root cause:** FTG is a hosted renderer, and VTTs are themselves renderers. The only bridge is embedding.
- **Beat it:**
  - Export VTT-native scene data at a declared grid scale: the image per layer or level, plus wall, door, light and
    region data from the semantic model, with building ids linked to journal entries.
  - The embeddable library (PERF-3) lets a VTT module generate and simulate natively.
  - Per-layer levels (sewers, streets, sky islands) map to VTT levels (LAYER-hook).
- **Measure:**
  - Grid alignment error = 0 px per cell at the declared scale.
  - Import requires no manual steps.
  - Share of building doors and walls present as VTT data.
  - Tokens and simulation link coexist in a test scene.
- **Over-correction risk:** FTG's live link is unique and loved (time sync with Simple Calendar, "mark as current
  location", journals). Keep a live-link mode beside static export.

## 11. Simulation and content (the FTG-class layer)

### SIM-1 · The content → map handoff is one-way: the map cannot push back on the roster [BASE]
- **Who:** CR · US×3 (Peter Hawkins, IronWithinIronWithout, Kole D).
- **Evidence:**
  - The creator: FTG "generates the details before the layout … I don't see this ever changing" (127128581;
    C12/F14). Consequences:
    - Factions cannot shape the map ("generated before buildings are placed", 84680671).
    - A layout preview before population was refused (Peter Hawkins).
    - Layout-side needs (a castle-centred ring, coast side) are worked around by hand or by re-rolls (Kole D).
  - The reverse leak: empty-space backfill "randomly pick[s] buildings to fill in the space", creating new people, and
    re-rolls make it "very easy to make a settlement much larger". The settlement list's population went stale and was
    replaced by a classification (84680671, 88558259).
  - District type is chosen from the remaining pool (GEO-6).
- **User impact:** the roster and the map are both good but not *about each other*. Wealth, factions and trades do not
  make places, and the population figure drifts from what the map implies.
- **Root cause:** a strict phase order (manifest → layout) with a greedy fitter and no reconciliation step.
- **Beat it:**
  - An iterative, deterministic plan–fit–reconcile loop. The economy proposes demand by class. The layout proposes
    capacity: lots with context vectors. An assignment solver matches buildings to lots under the siting rules
    (GEO-6), feeding back (more housing where land allows; fewer mills without water).
  - The roster is regenerated only for changed buildings.
  - Offer both entry points: content-first (FTG's default) and layout-first (pick one of N seeded previews, then
    populate to fit), with the same invariants.
- **Measure:**
  - Roster ↔ map consistency: every building has occupants/workers and every person a home/work (100 %).
  - Population target error < tolerance.
  - Faction turf metrics (GEO-6).
  - The layout-first preview path works (user test).
  - Reconciliation converges in ≤ k iterations (bounded).
- **Over-correction risk:** FTG's guarantee that every building has a purpose and people is exactly why users call it
  "almost … a fully featured back end … I'd almost compare it to Dwarf Fortress" (Zips, 120828892). Do not regress to
  watabou's "ward names are hints".

### SIM-2 · Roster and economy counts are implausible or hard to control [BASE]
- **Who:** US×4 (Chris Wilson, Dylan Kennedy, Daniel Watson, NeutronTaboo) · CR.
- **Evidence:**
  - Asked for a way "to exclude … buildings of a particular type" or cap them: "I'm currently seeing to many schools"
    (Chris Wilson, 66499838, 2022).
  - "There are more tanners than I would want" in a metropolis (Dylan Kennedy, 120828892).
  - "Having 20 adventurers in a small village of 100 people doesn't make sense to me" (NeutronTaboo, 153121107; Daniel
    Watson, 151265004). The guild template "will always create 22 people" (fixed 2026-03-22).
  - The old demand model gave 6:3:1 from a config meant to give 4:2:1 and left buildings unplaced (91451446).
  - The current graph "prioritises minimising the unemployment". To match the configured ratios the user must disable
    `Always place workplace` (`createSettlement__dependency_graph.md`).
  - New biomes need buildings and layouts "to keep the supply chain happy" ("how do people get food in a desert town with
    no rivers") (144226579).
- **User impact:** DMs must hand-correct the number of schools, tanners and adventurers, and a hidden trade-off
  (ratios vs unemployment) decides what they get.
- **Root cause:** an allocation loop with implicit priorities (employment first) and per-template constants; constraints
  (min/max per type, per-capita bounds) are partial.
- **Beat it:**
  - An allocation solved under explicit constraints from data tables: per-capita ranges, hard min/max, size gates,
    dependency ratios, resource availability.
  - The solver reports its trade-offs (achieved ratios, unemployment, unmet demand) instead of hiding them.
  - Templates scale job counts to requests.
  - The supply chain is a check that explains infeasibility ("no food source: add river, farmland or trade") rather
    than a blocker for new biomes.
  - All tables carry provenance for later calibration against historical occupational data.
- **Measure:**
  - Constraint violations = 0.
  - Per-capita ratio error against table targets.
  - Reported unemployment.
  - Plausibility checks on a benchmark (no occupation above its per-capita maximum; no guild of 20 in a hamlet).
  - A supply-chain feasibility report for every biome/size combination.
- **Over-correction risk:** FTG's legible rules ("1 farm per 25 people", "1 weaver per 2 farms", 91451446) and its
  lifestyle-banded pools with rare outliers (a hidden cult front at weight 0.02) are exactly right. Keep the
  legibility; add the constraints.

### SIM-3 · A building is a single footprint; complexes, custom types and context-driven classes are missing [S3-hook]
- **Who:** CR · US×1 (Callum Wilson) + MFCG-thread demand (arlechinu, Navylegokid, headzombie, T. Hill-Hand).
- **Evidence:**
  - Buildings are 90 % quads, ≈ 10 × 10 m, with 5 sub-locations each (`_critic-ftg.md` §4; `ftg-payload-visual.md`
    §3.3).
  - Landmarks are shape templates (GEO-1/REN-3).
  - Castle districts are to be filled "with more things". "Special landmark districts … groups of buildings to create a
    larger complex" is a stated wish (106664214).
  - Interiors are in development as one footprint with a "very basic room splitting algorithm" (164816716).
  - Asked for "custom Building types, from scratch … with a job included" (Callum Wilson,
    130937474).
  - In the watabou threads, users repeatedly ask to integrate the mansion generator into the city (devlogs 101529,
    123268) and for procedural floor plans from building outlines (T. Hill-Hand, 22717).
- **User impact:** a manor looks like a hovel with a bigger rectangle. Monasteries, colleges, inns with yards and castle
  wards cannot be represented, and custom content is capped by the built-in type list.
- **Root cause:** the building is a record plus one polygon. Its class comes from the content phase, not from its lot's
  context, and no composition model exists.
- **Beat it (hooks only, per the owner):**
  - A building-generator interface. Input: the lot polygon, access edges, the context vector (GEO-6), class rules as
    data tables, an optional assignment with drift bounds, and the lot's own deterministic sub-seed.
  - Output: a composition of wings, blocks, courtyards and outbuildings, lazily generated, with LOD outline → wings/roofs
    → rooms.
  - Complexes are multi-building compositions over several lots.
  - Custom building types are data (class rules + sub-location template + jobs), so user types and FTG-style
    simulation remain compatible.
- **Measure:**
  - Footprint diversity by class (shape metrics).
  - Lot-fit compliance (setbacks, frontage) = 100 %.
  - Class-rule coverage of every lot context.
  - Rooms/sub-locations exist for every simulated building.
- **Over-correction risk:** FTG's sub-location model is what makes the simulation work (rooms with purposes,
  capacities and tags such as Table, Stage, Pickup goods). S3 compositions must produce those rooms, not just pretty
  roofs. The owner also wants diversity "from a giant manor to a small hovel", not manors everywhere.

## 12. UX and workflow

### UX-1 · No generation feedback, no user-side undo, and accidents are easy [BASE]
- **Who:** REC · US×4 (anonymous, Chris Wilson, Bri Rowland, Peter Hawkins) · CR.
- **Evidence:**
  - Generation shows a spinner; FTG "emits no stage/progress trace at all" (`ftg-payload-visual.md` §1). The server
    answers in ≈ 3 s, the full layout is in hand ≤ 7 s after the click, and the client's heavy script bursts end at
    8.3 s / 15.7 s (§2).
  - "I have made 6 half finished city's" in two days and asked for "an are you sure
    box" (anonymous, 127128581). The workaround is the home button.
  - A raw server error surfaced as `Unexpected token 'N', "Non consec"... is not valid JSON` (Chris Wilson, 106664214).
  - An accidental person deletion was restored from the creator's backups (EDT-1).
  - Asked for a preview "without having to generate an entire world" (Bri Rowland,
    144226579): "a nice to have".
  - "Generate 3 layouts BEFORE" (Peter Hawkins) was refused (SIM-1).
- **User impact:** users burn settlements while learning; mistakes need support; content settings (races, appearance)
  are tuned by full regenerations.
- **Root cause:** the creation flow commits a whole server-side object at once. There is no draft state, no undo log
  and no partial preview.
- **Beat it:**
  - Staged, previewable generation with a progress report per stage and the machine-readable generation report
    (ROB-1).
  - Drafts, and undo/redo everywhere.
  - Instant local previews for content settings (sample 10 people from these race settings) and for layout (N seeded
    thumbnails).
  - Errors phrased as actions.
- **Measure:**
  - Undo coverage = all operations.
  - Time to recover from a mistaken operation (user test).
  - Previews in < 1 s for content settings.
  - Settlements abandoned per active user (telemetry, opt-in).
- **Over-correction risk:** FTG's one-click "Create Settlement" with good defaults, and its landing tagline ("Every
  street, building, and resident — ready in seconds"). Previews and drafts must not add steps to the fast path.

### UX-2 · Discoverability, device and install friction around an enormous surface [BASE]
- **Who:** US×7 (Chris Wilson, Jason DeGonia, William O'Braidislee, Deahal, Dustybin, Jacob Kerpan, ByTheTentacles) ·
  CR.
- **Evidence:**
  - The view-only share link already existed but a long-time user could not find it (Chris Wilson, 88558259).
  - Roof-colour settings: the creator himself first pointed to the wrong place ("maybe I'm misremembering then",
    144226579).
  - "What's a gender partner?" (William O'Braidislee, 149103655).
  - The map editor is disabled below ≈ 900 px width and needs a page reload after maximising (Deahal, 151265004).
  - Foundry setup: rename the module folder; the origin goes into FTG, not Foundry (81472775).
  - People search was capped at 50 results, so lists came via CSV export (ByTheTentacles, 95869798); advanced search
    arrived in 2026-02.
  - Twelve form sections with ten save units (149103655).
- **User impact:** features exist but go unused, and support load goes to the creator's comment threads.
- **Root cause:** the configuration surface mirrors the internal model (its strength), so the UI grows with every
  feature, and layout is fixed-width.
- **Beat it:**
  - Progressive disclosure driven by intent (VAR-1).
  - Search across settings.
  - A responsive editor.
  - Integration packages that install without renaming or origin juggling (library-based, PERF-3).
  - Contextual docs inline.
- **Measure:** task success rate and time in a scripted user test (share a view-only link; change roof colours in a
  district; make the coast face west); support questions per feature; editor usable at 768 px.
- **Over-correction risk:** FTG already does several things right: context-aware doc links (123982784), a thorough
  user guide that explains its own algorithm, and saved named presets with per-section merge (149103655). Keep the
  explanatory docs, a rarity in this field.

## 13. The 15 highest-value improvement opportunities for this reference

Ranked for the BASE first, then the S2/S3/EVO/LAYER/ASSIGN hooks, by (user or creator pain × realism gain under the
owner's constraint-and-precision tiebreaker) ÷ risk to what FTG gets right. Each names the FTG weakness it answers and
its headline metric.

| # | opportunity | answers | headline metric |
|---|---|---|---|
| 1 | **One invariant-checked topology and geometry kernel** (half-edge, fixed-point coordinates, exact predicates, split-on-cross, weld), shared by generation and editing, with a post-stage invariant suite, local repair ladder and generation report | ROB-1, ROB-2 | hard-invariant violations per 1 000 cities = 0 (duplicates, hourglasses, doorless buildings, micro-edges); fuzzed edit sequences → 0 planarity failures |
| 2 | **Frontage-first plots and buildings**: strips from street frontage by road class, corner plots, rear yards, party walls, distributions in metres from data tables | GEO-1 (+ S3 input) | sliver rate = 0; frontage/depth KS distance to targets; 100 % plots with access |
| 3 | **Terrain and hydrology first**: heightfield with site features, drainage (flow, accumulation, outfalls), rivers by descent, slope-costed streets, walls on crests; 2-D hillshade tier; layer model underground/ground/sky | GEO-3, GEO-5 (+ LAYER sewers) | monotonic rivers 100 %; flow-to-outfall 100 %; "town on a hill/cliff/ravine" in one click |
| 4 | **Deterministic recipe**: town = f(version, seed, params, assignments, edit log); per-stage/per-entity sub-seeds for parameter locality; seeded render-time fills | ROB-4 (+ EVO) | byte-identical replays; ≥ 95 % of unrelated entities unchanged under a local parameter change |
| 5 | **Provenance, locks and faithful scoped regeneration with undo**: never mutate edited or pinned entities; regenerate with the original pipeline and sub-seeds; reconcile people instead of deleting them | EDT-1 | locked-entity preservation 100 %; regenerated-vs-original density KS p > 0.05; undo coverage 100 % |
| 6 | **Plan–fit–reconcile between roster and layout** (content-first default plus a layout-first preview path) so the map shapes the roster and vice versa, without losing "every building has people" | SIM-1 | roster ↔ map consistency 100 %; population error < tolerance; bounded reconciliation |
| 7 | **Constraint and assignment input**: pinned walls, gates, roads, district outlines, landmarks, coast side; external assignment of one building, one neighbourhood or N dispersed buildings via a placement solver, with drift bounds and precedence over class rules | VAR-2, VAR-1 (+ ASSIGN-hook) | pinned-feature satisfaction 100 %; dispersed-placement criteria met or infeasibility reported |
| 8 | **Complete hierarchical model with stable ids, and one versioned public schema** (districts/neighbourhoods, blocks, lots, buildings, ways, walls, gates; references by id; round-trip import/export; GeoJSON with districts; compact binary) | DAT-1, DAT-2 (+ S2) | containment completeness 100 %; export → import → export identical; 0 dangling references |
| 9 | **Destination-driven, curvature-continuous street network** (arterials between gates, bridges, market and harbour over a cost surface; junction-angle rules; growth-based so it extends incrementally) | GEO-2 (+ EVO) | no turn-angle cliff; junction angle p5 ≥ target; arterial detour index within target |
| 10 | **Fortification as a network**: circuits from growth stages and terrain, gates at every arterial crossing, towers by rule, castle sited by defensibility, conversions (wall → ring road, gate → junction) as first-class operations | GEO-4 (+ EVO) | 100 % arterial crossings gated; 0 ungated crossings; conversion preserves abutting plot ids |
| 11 | **Rule-based land-use siting on a per-lot context vector** (water, gates, market, slope, up/downstream, wealth gradient), with rules as calibratable data tables; the same vector feeds S3 building classes | GEO-6 (+ S3) | rule satisfaction (noxious trades downstream/extramural), wealth Moran's I, faction-turf compactness |
| 12 | **Recipe-based upgrade and evolution hooks**: opt-in replay of old towns under new versions with a diff; lifecycle states and epoch stepping from persisted state + inputs + the seed's epoch stream | EDT-2, EDT-4 (+ EVO) | 100 % edit retention on upgrade; identity continuity across epochs; every change traced to an event |
| 13 | **Lazy deterministic population and an LOD render pipeline**: households and people derived on demand from building ids and pinned once seen; per-district caches; roofs cached per building | PERF-1, PERF-2 | stored bytes per 10 k people; load p95 at 50 k/200 k; roof computations per frame after warm-up = 0 |
| 14 | **Ways as entities, street names and a label engine** (context-derived names, path labels with collision handling, optional addresses) | LAB-1 | 100 % of streets ≥ 50 m named; 0 label collisions; address coverage |
| 15 | **VTT-native, per-layer export at a declared grid scale** (image + walls/doors/lights/regions + building-journal links), plus the embeddable library for native modules; keep the live link as an option | DAT-3, PERF-3 (+ LAYER levels) | 0 px grid misalignment; import with no manual steps; tokens and simulation coexist |

Close runners-up: explicit allocation constraints for the roster (SIM-2, most user reports per feature); a semantic
symbol registry with a generated legend (REN-1); style-as-data over one display list, including a monochrome print
style and underground palettes (REN-2); the S3 building-composition interface (SIM-3; hooks only, per the owner).

## 14. Restraint list: what FTG gets right, and a better design must keep

1. **Every building has a purpose, occupants and workers**, and the answers stay consistent: "a consistent answer … 'If I see it, I can go there'" (Kitt Schlatter, 79527117). This is the content-first
   guarantee; any reconciliation (SIM-1) must preserve it.
2. **Towns are durable, editable, shareable objects** with public view links, public pins and multi-client sync (the
   `stateId` token). A seed complements this persistence; it does not replace it.
3. **Broad strokes and fine control in one tool**: "Other tools are basically one or the other" (Deahal, 157283634).
   Generation, hand editing, regenerate-area and bulk edits coexist.
4. **Real units everywhere**: metre-labelled parameters, ruler, scale bar, 2 m / 5 ft grid, unit toggle, and integer
   centimetres centred on (0,0) in storage.
5. **Landmark-first placement in large district lots**, and districts that own their interior subdivision and road
   style (V2; 120828892).
6. **Staged growth with historical walls**: the wall encloses an early stage and the town grows outside it; the density
   gradient runs dense → gaps → suburb ribbons; perimeter gardens. This is legible and realistic.
7. **Legible ratio rules** ("1 farm per 25 people") in a dependency graph, lifestyle-banded pools, and deliberate rare
   outliers.
8. **Fix causes, validate at the authoring boundary**: the reflex-corner fix instead of filtering; self-intersection
   blocked at draw time.
9. **Water craft**: rivers bridged and oceans terminal as a hard rule; bridge spacing in metres; per-segment
   beach/rock/cliff classes; the "ease into detail" envelope near the centre; depth and foam; desert fields hugging
   rivers (hydrology → agriculture).
10. **The simulation drives the render**: window lights only where an awake adult is; day/night, seasons, weather and
    climates; roads stay brown in snow for legibility; thematic layers desaturate the base and add a legend.
11. **Storage economy**: lazy person details, the family-unit relation model (30 % → 10 %), sint32 coordinates, and
    area-filled forests.
12. **Tiered rendering defaults** and on-demand rendering for weak devices.
13. **A signature texture** (hedgerow tree rows along field edges) and a coherent single light source.
14. **Explanatory documentation** of its own algorithm and parameters, with context-aware links: rare, valuable, and
    the reason this ledger could be evidence-based.
15. **Everything is user data**: races, genders, religions, factions, schedules, sub-location tags, decoration and
    presets, saved and merged per section. The generator is a configurable system whose defaults happen to be good.

## Appendix A. Per-source harvest (raw weakness candidates, written as each source was read)

### A.1 `_critic.md` + `_critic-ftg.md` (binding rulings that shape this ledger)

- **Pipeline order (C12 / F14, binding):** FTG decides buildings + people (+ factions) BEFORE any geometry; the map
  phase is water first → staged road network and districts → suburb → outer settlement (farms, forests, features).
  Creator: "generates the details before the layout … I don't see this ever changing" (127128581 L111). Consequence
  for this ledger: every "the map does not fit the population" complaint traces to a one-way content → geometry
  handoff; the map cannot push back on the roster.
- **Scale (F1/F2, binding HIGH-IMPACT ruling):** wire coordinates are zig-zag sint32 cm centred on (0,0); CITY map =
  ±2500 m; ordinary buildings ≈ 10 × 10 m (median footprint 103 m², quad side median 10.34 m, p95 154 m², max 1600 m²);
  road graph 191.9 km; block-lot median 441 m², 1.52 buildings per lot, 22.9 % of lots EMPTY, 38 % lot coverage; only
  53 % of buildings lie inside any serialised lot polygon (district-stage lots are not persisted as lots, F13, §6.3).
  Built core ≈ 1.4 km across on a 5 km map (sea = 44 % of this map).
- **Roads (F3 settled by the roadlength100 capture, per the task brief and `roadlength100/README.md`):** form metres are real; ordinary district
  streets are laid as separate segments of (L + 0.5)/2, main roads L + 0.5, suburb streets not halved; hard 15° per-vertex
  turn cap (zero mass at 15–16°), junction arm-angle median 90.02° (58 % in 80–100°), flat heading spectrum. Candidate
  weakness: a hard turn cap + orthogonal junction rule gives a characteristic "grid bent by 15° steps" look — no
  terrain-driven curvature exists (no heightfield).
- **Edge-type model (F9–F11):** the road graph also carries the water outline (type 14), the map border (type 3) and
  the piers (type 12) as edges so lot detection treats them as boundaries — a single planar graph for every linear
  feature (good for lot closure; a candidate weakness for semantic export, since roads, shores and borders share one
  record type).
- **Remaining unknowns (§6 of both critics):** road-legality thresholds, district-type scoring, `Number of districts`,
  plot rule constants (frontage, depth, shrink distance), `AROUND_ALL_LOTS` wall tracing, determinism (`seed: null` in
  the only captured request; forest/decoration fills happen at render time), snapping-distance unit, wire field 20.
  Bridges could not be isolated (154 road nodes inside river polygons).
- **Generation time (owner ruling in the task brief supersedes F20/F27's "≈ 300 s"):** FTG's server generates a CITY
  in ≈ 3–7 s; the 300 s was our recorder's wait limit.
- **Version ladder, not contradictions (F15, F19, F21–F27):** walls (2023 % of buildings → per-stage `placeWallAfter`
  + `wallPlacement`); bridge distance 100 → 40 m; farm layouts 2 → 4; calendar fixed 7-day → configurable; person types
  + Studying; performance ladder (gen −8 %/−10 %, sim +20 %/+10 %, file −5 %/−5 %, metropolis load 20 → 10 s, download
  −50 %); size cap 10 000 → 50 000 (2024-03); GeoJSON still lacks districts (F26, open in the product as of the 2026-09
  guide).
- **Two features share one glyph (F16):** market stalls and shanty tents render as the same saturated cone — a
  legibility defect candidate.
- **Lots (F17):** three levels — district lot → block lots by inserted roads until < target area; block lot →
  building plots by recursive perpendicular cuts (2025-07 nearest-edge-to-centroid rule; 2026-07 shrink-then-split with
  an inset blocking ring after the bent cut produced cross-lot artefacts); the creator rewrote level (ii) twice in a
  year → a live robustness/quality pain point.

### A.2 `ftg-posts-a.md` (Patreon 2022-04 → 2023-12, incl. Critic-2 addendum) — read in full

Candidates (source ids in brackets; US = user comment, CR = creator):
- **Generated topology not clean enough for its own tools** — fill tool "sometimes just fills half of the town", with "problems with generated streets but works for self-drawn streets" (US Sazra, 75844005, 2023-02-20; CR "I'll take a look");
  drawing a road/wall over a road "breaks — it's supposed to snap so it splits the existing road in two" (CR, 75844005,
  2023-02-19); "too much walls at once it will not save changes" (US). Root cause: crossing → split-both-edges invariant
  not enforced at write time for generated or edited edges (§2.4). → ROB/EDT.
- **Degenerate hit targets / tool-store confusion** — big fills "only get a single pixel that can be selected for the
  erase tool"; stone fences, placed with the wall tool, "can only be erased by the road-erasing tool" (US, 75844005).
  → UX / DAT (walls, fences and roads share one linear-feature store).
- **Old placement: wasted space and identity-less districts** — CR's own list for the pre-2023-06 algorithm: buildings
  "basically random", no identity "beyond the lifestyle", a single leftover building claiming a large lot → "a lot of
  space would be wasted" (84680671, [SHOWN] image 01: a huge empty lot with a few edge buildings). The road network was
  generated BEFORE district sizes were known, so districts could not shape roads. → GEO (fit between content and map).
- **Backfill invents buildings and people → population drift** — empty space is filled by "randomly pick[ing] buildings";
  re-roll makes it "very easy to make a settlement much larger"; the settlement list's population went stale and was
  replaced by a classification rather than dual-writing two stores (88558259). → SIM/DAT (the roster is not the
  authority the map obeys; two stores disagree).
- **Destructive re-roll** — re-roll district "will delete any existing buildings + decoration" and create a new district "filled with buildings + new people" (84680671). Locality = one lot/area; nothing is kept. → EDT.
- **Old demand model unreadable** — "1 tailor, 3 weavers, 6 farms per 100 people" from a config meant to give 4:2:1;
  "some buildings may never get placed"; "not all shops were actually created" (91451446). Fixed by the dependency
  graph (a creator lesson: legible ratio rules beat an expressive demand web). → restraint note for SIM.
- **Baked text; fixes only for new settlements** — half-elf description corruption and pronoun agreement bugs; "half
  elves will only be fixed for new settlements" (86856028). Persisted derived content cannot be re-derived. → DAT/SIM.
- **No seed / no API / settings in cookies** — "no API"; planned JSON upload of buildings/people (75844005 comments,
  2023-02); a patron contrasts watabou's `?seed=` URLs; form settings live in cookies because "I don't want to commit
  making backwards compatible" (79527117 comments). → DAT (reproducibility, portability of configurations).
- **Scale blocked by generation speed and file size** (88558259); relationships are the biggest file component;
  population LOD ("larger maps where not all the people are actually generated", 91451446 comments) considered. → PERF.
- **Time model has no years** — US 2026-08-03 on 65223067: ageing the population is still not possible; asks for "year
  increases in the time simulation". → SIM / EVO-hook (a settlement that cannot age cannot evolve).
- **Factions cannot shape the map** — "the factions are generated before buildings are placed", so map sense "would need some thought" (CR, 84680671, 2023-07-23; a patron asked for faction turf). → SIM.
- **Islands in rivers** were a generator bug class (91451446 fix). → ROB (topology assumptions about water).
- **Visual (2023 era):** labels at district centroid with near-constant size; tents in saturated random colours with no
  alignment; ragged sawtooth town edge = union of lots; no gate glyph (gates only in names); roads cross walls with no
  gate object. Several are superseded (walls now follow lots, castles/gatehouses 2025) — to be checked against later files.
- **Restraint (what FTG gets right here):** content-first guarantees every building has a purpose and occupants;
  "If I see it, I can go there" / "consistent answer" (patron, 79527117); everything is user-editable data; road graph
  keyed by intersection ids (connectivity without epsilon geometry); dependency ratios a DM can reason about.

### A.3 `ftg-posts-b.md` (Patreon 2024-01 → 2025-06, incl. Critic-2 addendum) — read in full

- **Same-looking towns (CR):** V1 "most of the settlements in FTG look similar": each starts at a 4-way crossroad that "blooms outward in a vaguely circular shape" (112861635); 2024-03 self-critique: uninteresting junctions, no
  landmarks, the settlement "completely surrounded by roads" (buildings never on the outer edge) (99652534); a 50 000
  map = a near-uniform mesh of small blocks, "very uniform size lots across the entirety of the settlement" [SHOWN 03].
  V2 (2025-01) answered with staged spokes, suburbs, initial-road types, a ringed preset. → VAR/GEO.
- **Placement gives up (CR, the pivotal failure):** after the 3× scale fix, reliability "seemed to fall by quite a lot": the algorithm was "struggling to place the larger buildings" and "would regularly give up" (106664214); V1 step 4 = bounded retry then abort the whole generation; retries also slowed the
  algorithm (112861635). Undersized districts were merged → "completely unrelated buildings" in a district; a debug view
  shows a lone single-lot district and a disconnected island district [SHOWN 08/17]. Root cause (CR): district groups
  created before roads; landmark size not scaled with lots. V2 fix: large district lots first, landmarks placed first
  while the lot is big. → ROB (lesson: order hard placements first; keep landmark:lot ratio an invariant).
- **Scale was wrong for years, found by accident:** x/y not 1:1 with metres (only z), buildings ~3× too large, found only
  when street view felt wrong; a ruler was built to diagnose it (106664214). → GEO (units as a tested invariant).
- **Road-layer defects (CR):** "sharp points" (acute slivers) (112861635); zero-length roads created (fixed 2025-03);
  road settings not respected in inner district lots (fixed 2025-03, 123982784); three road algorithms coded and
  discarded, "no obvious best way" (112861635). → ROB/GEO.
- **No terrain (CR + users):** height maps prototyped (Perlin/simplex raster) then SHELVED — "not entirely sure how to display it on the 2-D map", and fitting it into the road algorithm "will be … interesting" (120828892); rivers
  "render below everything"; buildings floated (sign bug); the three most-repeated map requests in 103668405's comments
  are hills/mountains/elevation, cliffs, rock decorations (US). Still "Mountains aren't properly supported yet" in 2026
  (per `_critic-ftg.md` §2). → GEO (the single biggest realism gap), LAYER-hook (drainage needs a heightfield).
- **Water robustness:** "if two oceans are drawn to form an island … this no longer breaks" (fix, 120828892); "a rare
  issue with generated rivers" (fix, 123982784); a red circle forbids water through the core (UI rule). Coast: buildings
  and farmland "too close to the ocean edge", edge "pretty smooth with no interesting details" (CR, 130937474) → fixed
  by beach/cliff/rock bands. → ROB/GEO.
- **New features never reach old settlements:** coast/harbour features "need to be manually added to existing
  settlements"; "the new generation only applies to new settlements" (CR, 130937474 comments). → EDT/DAT (no re-derivation of a stored town).
- **Regeneration destroys authored work (US):** district re-roll rejected by a user because it destroys hand-authored
  content (120828892 comments, 2025-03-06); the real need was bulk edits ("more tanners than I would want"). → EDT.
- **No authored constraints as input (US):** "lay down some initial walls and district boundaries" before the generator fills in the rest (103668405 comments) — unsupported; "generate three candidate layouts before populating"
  refused on architecture (127128581, 2025-05-13). → VAR/EDT (the base's assignment/constraint hook answers this).
- **No round-trip data (CR + US):** building JSON export ≠ edit-request format, "I don't really want to maintain that as
  an API" (120828892, 2025-03-06); GeoJSON omits districts (US 2025-01-12, still open 2026-09); CSV for people; PNG for
  VTTs; settings were in localStorage and users lost them (fixed 2025-04 with a settings file). → DAT.
- **VTT friction (US thread, 120828892 2025-02):** no tokens on the live map — CR: rewriting rendering for Foundry "would
  double all future front-end work"; users export a PNG and "tweak resolution so tokens fit the paths", then add trigger
  tiles. → UX/DAT (export at a known grid scale; per-layer export).
- **Content gaps asked for (US):** road names (asked twice, not done by 2025-06); ruins (to-do); custom building types
  with jobs (not available); visible moving people (not implemented); gender weights per race (not possible); population
  search capped at 50 results. → SIM/LAB.
- **Raw server error surfaced to the user** ("Unexpected token 'N', "Non consec"… is not valid JSON", 106664214,
  2024-07-16); users accidentally generate settlements (127128581). → UX.
- **Render cost tiers:** straight-skeleton roofs cost more faces; old roof renderer kept as the default on weak devices;
  3-D view shipped as an "unstable" toy; web workers for the building render step; "improved render performance of
  larger settlements" (2025-06). Layer z-fighting fixed by polygon subtraction, "some clipping still occurs on roads …
  I plan to leave that as is" (106664214). Snapping depended on camera angle (fixed 2024-05). → PERF/REN.
- **Unfinished district types (CR):** castle districts incomplete (castles slipped three times), university deferred,
  wish for landmark complexes ("groups of buildings to create a larger complex") (106664214, 130937474). → SIM/S3-hook.
- **Restraint (what FTG gets right here):** landmark-first placement in a large lot; districts own their interior road
  style; "gaps" mode (inset) and suburb ribbons give a legible density gradient; the wall as a historical boundary with
  the town grown outside it (`120828892/09`); tiered render defaults; ruler + scale bar; halo+shadow arced labels
  sized by importance; the family-unit relation model (30 % → 10 % of file).

### A.4 `ftg-posts-c.md` (Patreon 2025-07 → 2026-07, incl. Critic-2 addendum) — read in full

- **Building shapes degenerate inside lots (CR, twice rewritten):** after the June 2025 suburb update, "too many thin /
  sliver buildings" and weird shapes — L-shapes, arrowheads, hourglasses, "one spectacular six-pointed star"
  (133016301, [SHOWN] 06–09: a fan of ~12 slivers along a riverside block, razor-thin suburb strips). Cause (CR): the
  longest-edge cut "struggles to do anything with internal corners"; fixes = reflex pre-cut, centroid-nearest-edge rule,
  narrow-section and sharp-angle heuristics that "do not detect everything (e.g. hourglass shaped buildings)"; "due to
  the random nature and the heuristic based approach to filtering, it's not impossible" to still get a bad building;
  wholesale shape validation rejected as "fairly annoying to efficiently detect". July 2026 (164816716): the
  perpendicular-then-bend cut left a mid-line kink and "splits on one end affect the other side of the lot" (cross-lot
  splits, [SHOWN] 08); shrink-then-split replaces it and itself fails "if the area is too small to shrink, or there is
  an odd corner shape" — no fallback described. → GEO-top candidate (plots/buildings), ROB.
- **Planarity/identity bugs in the road graph (CR):** "two different intersections could have the same world position
  … this breaks things" — district re-roll stopped working after editing; "I *think* I've found the root cause";
  existing settlements repaired server-side (153121107); a self-intersecting ocean shape "broke some of the logic in the
  server" → prevented at draw time; "more validation … to try and ensure no invalid layouts are created" (157283634).
  → ROB/EDT (graph invariants enforced only at some entry points).
- **Regeneration is not faithful to generation (US + CR):** regenerated areas come out denser than the original with
  the same settings; no density or road-padding control in the regenerate tool; regenerated buildings lined invisible
  edges (bug, fixed same day unless "place anywhere") (157283634 comments). Bulk regenerate "will delete any residents,
  and new people will be created. This action cannot be undone" ([SHOWN] 159738553/19). → EDT.
- **Old settlements frozen (CR):** "there is no way to automatically regenerate settlements with these features"
  (151265004, 2026-03-13) — new layout features never reach existing towns; only data repairs are retroactive. → EDT/DAT.
- **No terrain, no underground, no mountains (US ×3+):** Underdark/underground settlements not supported (133016301
  comment 2025-08-11); mushroom farms/forests and darker stone requested (137812814); mountains/cliffs/ravines not
  supported (137812814 2026-04-01; 147332188 2026-01-07 "Mountains aren't properly supported yet"). → GEO + LAYER-hook.
- **Render budget cliffs (CR):** > 50 k rendered trees ⇒ "framerate … drastically drop"; 50 k trees ≈ 1 MB stored
  (144226579) ⇒ forest trees became render-time fills of a stored shape (determinism unstated); blurred field edges and
  perimeter smoothing are expensive enough to be hardware-gated and "immediately lost" a round of performance gains;
  maps "only render on demand … animating things are impossible" (153121107); metropolis load ≈ 20 s → ≈ 10 s with a
  progressive draw; download endpoint −50 % (157283634). → PERF/REN.
- **Classification by heuristic (CR):** a water body is an ocean "if a significant portion of the body touches the map border", it is an ocean, otherwise a river — lakes lumped with rivers (153121107). → GEO/DAT (semantic water types).
- **Economy gates the map (CR):** new biomes blocked by "keeping the supply chain happy" ("how do people get food in a desert town with no rivers") (144226579 comment); faction guild building always created 22 (or 20) jobs regardless of
  the faction's requested size (fixed 2026-03); bulk edits could delete a carer and "break simulation as the caree would
  become confused"; a faction meeting at a building that doesn't exist (157283634). → SIM (reference integrity).
- **Social geography is emergent, not designed (CR):** The district "with the largest population" used to be placed first, "closer to the settlement center"; ordering by class became an option only in 2026-05 (157283634).
  A ringed city around a castle is "possible to configure, but it'll be tricky"; placing the castle by hand "might be easier" (144226579 comment); castles exist only with a king/queen feudal government. → VAR/SIM.
- **Legibility confusions (US):** outline-only boxes ("what are the empty spaces for? … you can't click on it") are fence
  decorations (144226579); no per-building colour picker after generation (only pins); grid lines "too thin and won't
  be rendered" when zoomed out (159738553). District names needed a syllable budget (≤ 3 for nicknames) "which improves
  the readability" (157283634). → LAB/REN/UX.
- **Workflow limits (US/CR):** map editor disabled below ≈ 900 px width and needs a reload after maximising
  (151265004); no preview of race/appearance settings without generating a whole settlement (144226579); premium
  races/religions deprecated because of schema coupling ("another form for me to maintain", 149103655); custom layers
  are per settlement. → UX.
- **In development (CR):** building interiors — "very basic room splitting" and window/door placement; to-do: corridors
  vs interconnected rooms, multi-level buildings like castles, editing, 3-D (164816716). → S3-hook evidence (FTG's
  building = one footprint with an interior BSP, not a composition of wings).
- **Restraint (what FTG gets right here):** fixing the generator rather than filtering its output (cause-level fixes); validate at the
  authoring boundary; one closed-outline routine reused for pond / island / coast arm / moat; per-segment coast
  classes (beach / rock / cliff); desert fields hug rivers (hydrology → agriculture); farmsteads create residents;
  lights on only where an awake adult is (render reads the simulation); roads stay brown in snow for legibility;
  thematic layers desaturate the base; "I can use the generation's broad strokes or get super specific whenever I want!"; other tools are "basically one or the other" (patron, 157283634, unchallenged).

### A.5 `ftg-docs-params.md` (36 guide pages + create-request/presets JSON, incl. Critic-2 addendum) — read in full

- **Acknowledged failure modes with no automatic fix (CR, guide):** river "may end up bending back around into the
  ocean" — the only remedy is advice to use straight/gentle shapes (`createSettlement__water.md`); "more segments will
  create larger lots — but … this isn't guaranteed" (layout guide). Roof mode "Flat – roof shape texture": "for buildings
  with bends the texture might not be shaped appropriately". → ROB/VAR/REN.
- **Opaque or indirect controls:** `Number of districts` = Less/Normal/More with no stated effect (not in
  `layoutParameters`); `Default` farmland layout "will change … based on a variety of factors"; two branch counters
  (vertical/horizontal) with one documented meaning; stage `Percentage` = share of buildings, not of area; the layout
  form is 14 fields per stage + 16 suburb fields, several unexposed (`roundedEdges`, `createPerimeterSpokes`,
  `perimeterSpokeDistanceMultiplier`). Control is over the GROWTH PROCESS, not over outcomes (lot size, district count,
  street spacing). → VAR.
- **Resources do not shape the map:** "This doesn't affect generation, but does affect the settlement simulation" —
  the 82/66-value resource vocabulary drives the simulation only; generation sees building counts, pool tags and
  `requiresCoast`/`outsideSettlement` gates. District type is chosen from "the remaining unplaced buildings, and what the
  lot is next to" (scoring unknown). → SIM/GEO (land-use siting is weak: no explicit rules for tanneries downstream,
  markets at gates, etc.; only the INDUSTRIAL tag gloss "you don't want in the settlement center").
- **Ratios vs employment:** "FTG prioritises minimising the unemployment" — the virtual-population loop over-places
  workplaces; to match configured ratios the user must disable `Always place workplace`. Workable but a hidden trade-off.
  → SIM.
- **Retroactive drift from lazy person generation (CR, guide):** "only a few key details are saved per person"; the rest is derived when selected and "locked in" once edited;
  editing a race changes un-persisted attributes of existing people; appearance options are stored BY INDEX, so renaming
  option 2 from 'brown' to 'red' turns brown-haired edited people red. → DAT (identity by index; derived data not
  version-pinned). Good idea (lazy derivation from a stable id) with a bad key (position in a list).
- **Non-reproducible render-time content:** decoration areas "randomly filled with decorations when the map is
  rendered"; 3-D roofs "calculate[d] … every render, it is not stored in the server"; `seed: null` in the request. → DAT /
  ROB (two viewers or two exports may not match; unverified).
- **Export losses:** SVG "you lose certain details — trees are simplified and texture detail is lost"; GeoJSON =
  "backgrounds, edges, buildings, and their outlines" (no districts; semantics of the 14 edge types not documented).
  → DAT.
- **Protected core disc:** water cannot be drawn through a red circle at the origin; "set the size before drawing water"
  because size changes the border. → UX/VAR (the map frame is size-bound; water is authored in a frame that moves).
- **Template geometry:** harbours = one of 6 template polygons "carve[d] out of a waterfront district area"; keeps =
  a fixed cruciform template; "Individually placed" fits catalogue shapes (L, rectangle); castle moat/cliff fields null and
  undocumented. → GEO (template look; S3-hook evidence).
- **Size classes fix the map width:** HAMLET 90 people on 1500 m … METROPOLIS 49 500 on 6000 m; map = square frame
  keyed to class; `BLANK` uses a separate width. → PERF/GEO (hinterland scale is a lookup, not derived from economy).
- **Class-gated education, class-banded pools, deliberate rare outliers** (hidden slavers' den 0.02, mansion 0.5 with a
  limit of 2) — good content design (restraint).
- **Restraint (what FTG gets right here):** a documented, inspectable parameter surface with real units (m, m²);
  an explicit two-phase algorithm the user can read; rivers bridged / oceans terminate roads as a hard legality rule;
  bridge spacing in metres; coast = overall shape + detail erosion + bay/headland classification with an "ease into
  detail" envelope near the centre (the harbour stays usable); four farmland layouts tied to climate and settlement
  size; inner/outer tree mixes; reserved natural area; decoration schema with a class gradient (fences and lawns are
  the upper-class tell); virtual-population dependency loop with legible "1 per N people" rules.

### A.6 `ftg-payload-visual.md` (Galeiaward payload + render, incl. Critic addendum and Critic-2 addenda parts 1–2) — read in full

Only corrected (zig-zag) values are used below; the pre-addendum §2/§5/§9 numbers are ×2 / ×4 and hazards §9.1/9.2/9.4
are retracted (critic F1–F13).
- **No observability:** "FTG emits no stage trace at all"; the only console line is a cosmetic SVG warning; the client
  shows a spinner while the server works (≈ 3 s PUT, scene building 6–7 s after the click, per the roadlength100
  addendum — the "≈ 300 s" was our recorder's cap). → UX/ROB (no generation report; failures cannot be seen).
- **Surviving payload hazards (critic kept §9.3, §9.5, §9.6, §9.7):** sub-metre road edges; tiny/sliver footprints;
  109 / 2798 buildings (3.9 %) without an entrance point; duplicate `key: 9` rows in two district presets (a preset data
  bug). Extended and re-measured by this lane (§2): exact-duplicate building footprints in the second city, hourglass
  footprints, sub-metre edges on both payloads. → ROB.
- **Incomplete data model:** district-stage lots are not serialised (only 53 % of buildings lie in any lot polygon);
  49 % of buildings lie in no district ring (suburbs/outskirts belong to no district); the forest is stored twice (lot +
  tree region); the wall is stored as a tower chain only — the wall band, gates and crenellation are synthesised by the
  client; "the wall passes over streets without a drawn gate in this render"; piers are 12 identical 75.6 m edges
  15 m apart (template regularity). → DAT/GEO.
- **Cheap statistical shortcuts visible in the data:** trees are not Poisson-disc (NN min 0.14 m, median 9.7 m), tree
  sprites assigned round-robin (590/590/589×5), every tree `scale` = 1.0 (size variation lives in the sprite art);
  the three plot-decoration kinds (well/bandstand/statue) have exactly 14 instances each (a deck/rotation draw); water
  outlines resampled at a uniform 50 m step (faceted unless smoothed at draw time). The payload's own author notes
  "three cheap choices … worth deliberately improving on". → REN/GEO.
- **Street geometry signature:** hard 15° per-vertex turn cap (types 0/1/2/10), junction arms median 90.02°, flat global
  heading spectrum ("locally rectilinear blocks, globally organic"); the author recommends an original generator pick a
  different mechanism (curvature-continuous splines, tensor field) rather than a per-vertex clamp. Degree-2 nodes are
  62 % of nodes: a "road" is an emergent run of edges, not a first-class object (no road identity → no road names). → GEO/LAB.
- **Buildings:** ordinary footprint median 103 m² (p5 52, p95 154), quad side median 10.3 m, 90 % quads, corner error
  median 0.68° but p95 22.9° / p99 42.2° (sheared parallelograms/trapezoids fill awkward plots); only 6.4 % share an
  exact vertex with a neighbour — the "terrace" look is tight packing with gaps, not party walls; entrances sit exactly
  on the outline (0.003 m), 2.99 m from the road median. Landmarks are shape-coded templates (6/7-pointed stars and
  octagons for temples, a 9-gon theatre; market squares are blank 27×59 / 51×51 m quads). → GEO/S3-hook.
- **Density recipe:** block lots median 441 m², 1.52 buildings per lot, 22.9 % of lots empty, 38 % coverage; ~3.4
  people per building; core radius p90 715 m on a 5 km map (sea 44 %). Population scales 550× across the size ladder
  while width scales 4× — the map is a fixed canvas, and "size is expressed as density, which caps the largest settlement's legibility". → PERF/GEO.
- **Labels:** district labels only (Title Case, halo, curved); "no street names, no building labels on the map";
  "Ashton is small and nearly hidden". → LAB.
- **VTT embedding:** the Foundry module is an iframe over a 5000 × 5000 empty scene (1 unit = 1 m), `tokenVision:
  false`; two latent bugs in the module (`pins` key never created; `PEOPLE_UPDATE` string collision). Unmatched
  weekday names are simulated as an "unknown" day (everyone relaxes). → DAT/UX.
- **Restraint (what FTG gets right here):** the payload is a compact, complete contract (593 KB for 2798 buildings,
  4303 nodes, 4125 trees and the whole population); integer centimetres centred on (0,0); an explicit typed edge graph
  with adjacency that also carries shorelines, border and piers so lot closure is uniform; entrances stamped on the
  road-facing edge; per-district background textures (paved industrial/waterfront vs lawn residential); consistent
  single light source; the `stateId` optimistic-concurrency token for multi-client sync.

### A.7 `visual-spec.md` (all four generators; §4 FTG and §5–§7 comparison drive this ledger) — read in full

- **FTG is a lit slippy web map, not a plate:** three.js merged BufferGeometry, per-vertex colour, computed normals,
  normal-mapped canopies (`sphere_normal`) and walls (`tall_stone_normal`), 64² tiled land-use textures, SDF text,
  a BVH for per-building picking (§4.1–4.2). "Ink: none (shading replaces outlines)" (§5) — the look depends on colour
  and lighting; the monochrome/print idiom (MFCG's casing, hairlines, hatching) is absent except as a post-process
  crosshatch effect. → REN (print/B&W legibility is PLAUSIBLE-weak; no user complaint found — see Appendix B).
- **Cartographic furniture is thin:** no compass or north arrow (§4.5, §5); a scale bar that steps with zoom; a grid
  toggle whose lines vanish when zoomed out (`ftg-posts-c.md` §2.19); labels = district names only. → LAB/REN.
- **Hedgerows as rows of tree blobs along every field boundary** are "the single most distinctive FTG texture" (§4.4);
  streets are filled corridors (no casing), buildings are lit extrusions with a comb of eave ticks and a soft shadow,
  civic buildings grey, roofs a brown ramp — restraint: keep a recognisable signature texture.
- **Cross-generator facts useful for "beat it":** MFCG caches per ward (46 000 fills → 590 GPU uploads) and draws
  label size ∝ district size; VG's water depth law `W·(i/N)^1.5`; all four use a halo for legibility; layer order is a
  hard requirement in every reference (§6.19–6.20). FTG is the only reference with real directional lighting, a
  day/night cycle and zoom-dependent scale — and the only one with no reproducible paint log (no canvas2D), which is
  why our FTG evidence is screenshots, profiles and the payload.
- **Open (§7.8–7.9):** the material setup (`matrix-green` LUT, `edges_alpha`, `circle_alpha`) and the
  building-colour rule (brown→grey by type/wealth) are unverified.

## Appendix B. User-voice tally from the raw comment threads

Sources: the `## Comments` sections of all 30 `research/patreon/ftg/*/post.md` (200 comments, 67 of them creator
replies, 2022-07 → 2026-08), read in full; and every `research/devlogs/**/post.md` comment section (watabou's threads),
read in full and harvested for FTG-class asks (cross-reference only, marked ⟂). A commenter counts once per theme.
"Status" reflects the latest source.

| theme | distinct users | who (post id, date) | status per the latest source | ledger |
|---|---|---|---|---|
| **Terrain: mountains, hills, cliffs, ravines, elevation** | **7** | Kyle (103668405, 2024-06-01); Thomas Bendesen (103668405, 2025-01-31); Will Lillard (103668405, 2025-02-22, + rock decorations); Peter Hawkins (127128581, 2025-05-13); Bri Rowland (144226579, 2025-11-30, + deserts); leo cameron (147332188, 2026-01-07, "Helms Deep"); 5H4P35H1F7 (137812814, 2026-04-01, "town on a mountain … cliff or ravine") | not supported (CR 2026-01-07, 2026-04-01) | GEO-3 |
| **Layout intent / pre-generation control** (coast side, walls and districts first, castle-centred rings, valley town, layout choice first) | **6** | Kyle (103668405, 2024-06-01); The LoreMaster's Workshop (112861635, 2024-11-03); Peter Hawkins (127128581, 2025-05-13); Kole D (130937474, 2025-06-07); Jason DeGonia (144226579, 2025-12-03); 5H4P35H1F7 (137812814, 2026-04-01) | valley town and water direction shipped; the rest refused or "tricky" | VAR-1, VAR-2, SIM-1 |
| **Data export / API / reproducibility** | **5** | Apophenic Realms (75844005, 2023-02-11: API, same town on every link, cf. watabou URLs); Kitt Schlatter (79527117, 2023-03-04: settings JSON); Scott Franzitta (79527117, 2025-04-15: settings download; copied localStorage via console); DarkEspeon (112861635, 2025-01-12: GeoJSON districts); Dylan Kennedy (120828892, 2025-03-05: JSON round trip) | settings file shipped 2025-04; districts in GeoJSON still missing; no API | DAT-1, ROB-4 |
| **Content counts and control** (too many X, adventurer-guild size) | **4** | Chris Wilson (66499838, 2022-07-14: schools; exclude/max types); Dylan Kennedy (120828892, 2025-03-06: tanners); Daniel Watson (151265004, 2026-03-07: 22 adventurers); NeutronTaboo (153121107, 2026-03-22: 20 adventurers in a village of 100) | guild fixed 2026-03; bulk building edit 2026-06 | SIM-2, EDT-3 |
| **Generated-text quality** | **4** | Lucy Jones (86856028, 2023-07-29: "Has Is clean shaven", pronouns); Brett (79527117, 2023-03-10: same surnames); Gabriella Galvez (120828892, 2025-01-30: beards on women); Bri Rowland (144226579, 2025-11-30: is/are) | fixes for new settlements only | LAB-2 |
| **VTT: tokens, Roll20** | **3** (+2 install) | Zips (120828892, 2025-02-02/03); The LoreMaster's Workshop (120828892, 2025-02-26: Roll20); passivedragon (120828892, 2025-04-04: "Combat … flat out impossible"); install friction: Dustybin (81472775, 2023-07-24), Jacob Kerpan (81472775, 2023-08-06) | Roll20 extension shipped; tokens declined ("double all future front-end work") | DAT-3, PERF-3 |
| **Old towns do not get new features** | **3** | Kole D (130937474, 2025-06-07); yingfortheking (151265004, 2026-03-13); leo cameron (147332188, 2026-01-07: "Time To regen all my northern settlements") | "no way to automatically regenerate" | EDT-2 |
| **Destruction, ruins, ageing, calendar** | **4** | Chris Wilson (91451446, 2023-10-22 and 106664214, 2024-06-22: ruins); Fraser Macdonald (91451446, 2023-11-07: lasso to "rubble-ize"); Mr. Malice (65223067, 2026-08-03: add a year, age everyone); Wolffie (79527117, 2023-04-09: 6-day week) | calendar shipped 2025-03; ruins are an outside decoration only (2026-01); no years | EDT-3, EDT-4 |
| **Regeneration fidelity and preservation** | **2** | Dylan Kennedy (120828892, 2025-03-06: won't re-roll a district and lose custom locations); Deahal (157283634, 2026-05-04: denser than the original, no gap or padding control, invisible-edge lining) | invisible-edge bug fixed; density control "can look into" | EDT-1 |
| **Road names** | **2** | Pablo David Gaytan Rodriguez (112861635, 2024-11-29); rumyrrh (130937474, 2025-06-10) | "on the to-do list" | LAB-1 |
| **Underground / Underdark / biomes** | **2** | Freddy Hewitt (133016301, 2025-08-11); Deahal (137812814, 2025-10-11: darker stone, mushroom farms/forests) | "isn't possible" | GEO-3, REN-2 |
| **Custom content** (types, presets, per-race weights, post-hoc redistribution) | **5** | Callum Wilson (130937474, 2025-06-07: custom building types with jobs); William Matthews (84680671, 2023-07-26: PF2e prices); ByTheTentacles (95869798, 2024-01-07: gender weights per race); peter ngo (79527117, 2023-03-04: redistribute religion, change families); Chris Wilson (66499838, 2022-07-14: custom religion ignored, a bug) | partly: presets 2026-02; custom building types absent | SIM-3, EDT-3 |
| **Finding and marking things** | **4** | ByTheTentacles (95869798, 2024-01-08: list by race; search capped at 50); Peter Hawkins (120828892, 2025-01-29: search residents by more fields); Hunter Pritt (149103655, 2026-02-15: colour favourite buildings); Jason DeGonia (144226579, 2025-12-03: roof-colour variety; the bulk brush misses) | advanced search 2026-02; custom layers 2026-06; players can pin but not colour | UX-2, EDT-3, REN-1 |
| **UX friction** | **5** | anonymous (127128581, 2025-05-31: 6 half-finished cities, wants a confirm step); Chris Wilson (88558259, 2023-09-25: could not find public link); William O'Braidislee (149103655, 2026-01-26: "What's a gender partner?"); Deahal (151265004, 2026-03-14: editor disabled on a large laptop); Jason DeGonia (144226579, 2025-12-04: empty fenced boxes) | partly answered in comments | UX-1, UX-2, REN-1 |
| **Faction turf on the map** | 1 | IronWithinIronWithout (84680671, 2023-07-23) | "would need some thought" | SIM-1, GEO-6 |
| **Visible moving people** | 1 | Alexander Briggs (112861635, 2025-01-14) | not implemented (render on demand) | PERF-2 |
| **Imperial units** | 1 | Tales from the Pythian (137812814, 2025-11-18) | shipped 2026-05 | — |
| **Race-settings preview** | 1 | Bri Rowland (144226579, 2025-11-30) | "nice to have" | UX-1 |
| **LLM dialogue** | 1 | Allen Call (81472775, 2023-04-13) | investigated only | — |

**⟂ Cross-reference: FTG-class asks in watabou's threads.** These are demand for exactly what FTG adds, and they support
the fusion thesis:
- a "demographics generator" listing "the number of each type of establishment", integrated "with an actual map" (LionHeart5, MFCG devlog 22717).
- "Automatic POI generation — taverns, shops, local temples"; "Marking individual buildings with icons, labels, colours,
  and descriptions"; "a procedural floor plan" from a building outline (T. Hill-Hand, 22717).
- "Number all buildings" (Sherevar, 11802; EltharinFireDragon, 153064).
- "Draw out the placements of farms, bridges, and certain buildings, walls" first (BCS, 91172).
- Integrate the mansion generator into the city (arlechinu, 101529; Navylegokid and headzombie, 123268).
- Biomes, seasons and day/night dropdowns (RKB81Labs, VG 613514); wells, livestock and a less tidy village (scott2020,
  VG 426543).
- Scale doubts ("trees … more than 25 m"; watabou: "The scale in the generator is probably wrong", devlog 345262).
- JSON that "resembles GeoJSON without being compatible", and a request for CityJSON (HuguesGauthier, 576591;
  saikofish, 123268).

**Praise worth protecting** (the restraint evidence):
- "It takes care of the details so I can focus on the broader strokes"; "a consistent answer … 'If I see it, I can go there'" (Kitt Schlatter, 79527117).
- "I can use the generations broad strokes or get super specific whenever I want!"; other tools are "basically one or the other" (Deahal, 157283634).
- "a fully featured back end … I'd almost compare it to Dwarf Fortress"; other map tools "took 8x effort and gave you 20% of the function" (Zips, 120828892).
- "The GIS component of this, and the granularity, is really neat" (IronWithinIronWithout, 84680671).
- "As soon as I saw the lighting changes … I knew I had to subscribe" (Teagan, 147332188).
- "By far my preferred town mapper" (Chris Wilson, 66499838).
- "All 30 or so towns/cities I need" (Alexander Briggs, 101576411). Volume use means one-click speed matters.

## Addendum 1 (2026-09-25) — plot model and plot granularity

**Why this exists.** The owner's request that triggered this run adds a neighbourhood-level rule. Wealth, or an assigned
institution or large building, JOINS plots into fewer and larger ones with bigger buildings, yards and courts. A poor
quarter SPLITS into more and smaller plots with small yards or none. The gaps become alleys between the roads. The
rulings are PLOT MODEL and PLOT GRANULARITY, 2026-09-25. This ledger had already landed, so under the resume rule it was
**not redone**. It touched plots only inside GEO-1 (plot geometry), GEO-6 (land use) and SIM-3 (single footprints), and
it never measured whether FTG's grain responds to wealth. This addendum adds that measurement (A1.1), three entries in
the same schema (GEO-8 to GEO-10), two errata to the ledger above, and the effect on §13 and §14. This was a judgment
call within the lane's scope, and the owner can veto it. Nothing above was edited except a one-line pointer in the status
line.

**Read for this addendum.**
- In full: this ledger (all 1 575 lines of the landed file) and the sibling `docs/improvements/mfcg.md` Addendum 1 (for
  format and consistency).
- Findings sections, in full: `ftg-docs-params.md` §1.3–§1.4, §2.5–§2.8, §3.1–§3.2, §3.4, §4.10, §5 and its Critic-2
  addendum; `ftg-payload-visual.md` §3.3–§3.4, §5.2–§5.3, §5.7–§5.8, §8.3–§8.5 and both Critic-2 addenda;
  `ftg-posts-a.md` §2.7 (lifestyle rows), §2.8–§2.13, the end of §3.2, §3.3 and open questions 1–8; `ftg-posts-b.md`
  T-18 (end) to T-20 and T-23 (end) to T-24; `ftg-posts-c.md` §2.1–§2.2, §2.6–§2.8, the regenerate-area gaps in §2.20,
  the district order in §2.22, and §6.
- Raw sources: `research/ftg-docs/createSettlement__districts.md` L1–70, `editSettlement__regenerate_area.md` L85–130
  and `editSettlement__map.md` L1–80. A script searched the `## Comments` section of all 30 `research/patreon/ftg/*/post.md`
  for plot, lot, yard, garden, court, alley, lane, wealth, rich/poor, slum, density, spacing, gap, padding, merge and
  size terms. All 11 matching lines were read, plus the whole 157283634 thread. The two T Mexx comments cited below were
  checked in `research/patreon/watabou-extra/70917627/post.md` and `research/patreon/watabou-extra/141198168/post.md`.
- `research/ftg-capture/create-request.json`: the key structure of `districtsParameters`, listed by script.
- Executed: `research/ftg-capture/improvements-ftg/plot_granularity_census.py` on both decoded payloads, output
  `plot_granularity_census.out.txt` (sections A–O; a rerun is byte-identical).
- Not re-read: the remaining sections of the five FTG findings files and the two critic files, which the landed run read
  in full (§0). No captured JavaScript bundle and no image was opened.

**Quotation note.** Creator and user statements below are paraphrased from the raw threads, with post ids. The one
direct quote is the creator's 2023 default for poor districts.

### A1.1 Recorded census: does FTG's grain respond to wealth? (CONFIRMED, executed)

The decoding is the same as in §2 (zig-zag sint32, 1 unit = 1 cm, settlement centre at the origin). The wealth proxy is
the residence label, ranked squat < lower-class home < house share = middle-class home < upper-class home < mansion,
following the lifestyle-banded residence pools (`ftg-docs-params.md` §3.4). Exact-duplicate footprints (ROB-1) count
once. "Ring" means inside a district ring. "Suburb" means outside every ring, which is where the suburb stage builds.
Both cities come from one request (§2), so every result describes FTG's default configuration.

| quantity | Galeiaward (2026-09-21) | Nevervalley (2026-09-25) |
|---|---|---|
| fields in the three residential class configs of the request | `decoration` only: no placement, size, density or lot field | (same request) |
| in-town serialised lots / empty | 945 (899 suburb, 46 ring) / 26.1 % | 690 (612 suburb, 78 ring) / 29.3 % |
| median lot area, by the dominant residence class inside | **441 m² for squat, lower, middle and upper class alike** (15 / 207 / 143 / 172 lots) | **441 m²** for middle and upper class (201 / 164 lots); the only lower-class-dominated lot is one 2 251 m² ring lot |
| suburb lot shape | median 441 m²; 65 % within ±10 % of it; OBB median **14.7 × 30.0 m** | median 441 m²; 67 % within ±10 %; OBB **14.7 × 30.0 m** |
| buildings per lot / land per building / lot coverage (medians) | 2 / 220–230 m² / 0.51–0.58, every class | 2 / 224–227 m² / 0.53–0.57, every class |
| suburb residence footprint, median | squat 125, lower 120, middle 122, upper 123 m² | middle 124, upper 121 m² |
| suburb neighbours within 30 m / coverage of a 25 m disc (medians) | 5–7 / 0.30–0.35, every class | 6 / 0.34, both classes |
| ring residences: footprint / neighbours within 30 m / coverage (medians) | middle 70 m² / 14 / 0.44; house share 105 m² / 12 / 0.49 | lower 82 m² / 20 / 0.62 (Turnpike Dale); middle 78 m² / 13 / 0.43; upper (n = 20, waterfront) 125 m² / 7 / 0.27 |
| Spearman, wealth rank vs footprint / vs neighbours within 30 m | −0.06 / +0.11 | +0.38 / −0.68 |
| upper-class homes outside every ring; median radius by class | 329 of 330; upper 561 m, lower 522 m, middle 436 m | 371 of 391; upper **817 m**, lower 593 m, middle 605 m |
| nearest gap between footprints | median 1.50 m in every class; 81 % of all gaps within 1.45–1.55 m | median 1.49–1.50 m in every class; 84 % within 1.45–1.55 m |
| buildings sharing a wall (≥ 2 m of boundary within 0.15 m), in rings | industry 96 %, warehouses 94 %, shops 46 %, artisans 22 %, residences 2 % | industry 98 %, warehouses 78 %, shops 43 %, artisans 13 %, residences 5 % |
| buildings sharing a wall, suburb | 0 % in every category | 0 % in every category |
| mansions | 2, each an identical 8-vertex 22.4 × 44.7 m footprint of 889 m² with 20 rooms; entrance 25.9 m from a road | 1, the same shape (edge lengths equal to 0.01 m); entrance 22.7 m from a road |
| institutions, median single footprint | warehouse 639, inn 700, temple 426, market 1 168, faction house 368 (max 1 600) m² | warehouse 672, inn 326, temple 350, market 956, faction house 444 (max 944) m² |
| residence entrance to the nearest road, all non-mansion residences with an entrance point | p95 ≤ 8.6 m; 0 of 1 979 farther than 10 m | p95 ≤ 8.6 m; 0 of 1 810 farther than 10 m |
| edge length inside the rings, m per ha | streets 332, main roads 81, **wall 19**, piers 28, suburb lot outlines 11, rural lanes 5 | streets 323, main roads 41, **wall 21**, rural lanes 29, piers 9, lot outlines 7 |
| same-class share among the 6 nearest residences ÷ the class's overall share | lower ×1.7, middle ×1.4, upper ×1.7, house share ×14.6 | lower ×4.0, middle ×1.6, upper ×2.3, house share ×13.1 |

**What the census says.** Wealth changes three things in FTG:
- which building a household gets, through the lifestyle-banded pools;
- how the unused plots around it are decorated, with fences, lawns and trees as the upper-class tell;
- which zone the class lands in, through the order in which residential districts are placed.

Within a zone it never changes plot size, gap, coverage or party walls. The strong grain contrasts in FTG run between
zones and uses:
- in the district rings, warehouses, industry and shops share walls, while houses stand 1.5 m apart at 49–57 buildings
  per hectare in the residential and market districts;
- in the suburb, a grid of 14.7 × 30 m lots holds two ≈ 120 m² buildings each, and no building shares a wall.

Whether a city shows any wealth gradient therefore depends on where its classes happen to land. Galeiaward shows none,
because the lower and upper classes share the suburb grid. Nevervalley shows a poor-dense, rich-sparse contrast, because
its lower class filled a ring district (Turnpike Dale) while its upper class filled the suburb. That this contrast is
zonal rather than a class rule is PLAUSIBLE: the class configs carry no grain field, so no class rule can produce it.

### GEO-8 · Wealth is decoration, not grain: in the same zone every class gets the same plot, gap and coverage, and plots never join [BASE; S2]
- **Who:** REC (primary, A1.1) · CR · US×1 (Deahal) · ⟂ US×1 in watabou's threads (T Mexx, asking twice).
- **Evidence:**
  - Schema (CONFIRMED): in the captured request the lower-, middle- and upper-class district configs carry only a
    `decoration` block. Placement mode, road segment length, suburb plot density and lot-division area live on the stages
    and on the regenerate call (`ftg-docs-params.md` §1.3–§1.4, §2.5–§2.6). The guide says lifestyle affects which
    districts are created and how they are decorated (§3.2).
  - Measured (A1.1): in the suburb every class gets a 14.7 × 30 m lot of 441 m² holding two buildings. It also gets the
    same ≈ 120 m² footprint, the same 1.5 m gap and the same 0.34–0.35 coverage. Over all residences, footprint barely
    tracks wealth (Spearman −0.06 and +0.38). The one large residence is the mansion, a single fixed 889 m² template drawn
    at weight 0.5 with a limit of two per city (`ftg-docs-params.md` §3.4).
  - The social geography is an accident of placement order. The upper class lives almost entirely outside the rings
    (329 of 330; 371 of 391), and in Nevervalley it has the largest median radius (817 m). The creator explains that the
    most populous residential district used to be placed first and nearest the centre. Since 2026-05 the order can be set
    upper-to-lower or the reverse (157283634). The captured request uses the old default (`MOST_POPULOUS`).
  - The 2023 district overhaul made squalid districts tents and "poor districts to be super dense", with wealthy ones
    getting more trees and decoration (84680671). The 2026 request has no field that could carry the density part. Grain
    moved to the stages in the V2 overhaul (`_critic-ftg.md` §1 version ladder; `ftg-posts-a.md` Critic-2 addendum).
  - Joins: FTG never merges plots for a larger use. After the scale fix, V1 regularly gave up because temples and
    mansions no longer fitted the smaller lots (106664214, `ftg-posts-b.md` T-18/T-19). V2's answer was to place
    landmarks first, while the district lot is still large (120828892). Institutions then occupy one large single
    footprint (warehouses 639–672 m², inns up to 752 m², markets 956–1 168 m², A1.1).
  - The only per-area grain controls sit in the regenerate tool. Its modifier halves or doubles building size or makes
    small tents, its anywhere-in-lot switch fills lot interiors, and its lot-division area sets the maximum lot size
    (`editSettlement__regenerate_area.md` L95–121).
  - Users: Deahal wanted a regenerated area as spread out as the original village. Drawing smaller lots to cap the
    building count left too little room between the roads to place any building. The creator confirmed that area
    regeneration has no density control and offered to look into one (157283634, 2026-05-04).
  - ⟂ T Mexx asked watabou twice for class- or wealth-driven grain, with larger and more spaced-out homes for the wealthy
    and dense, adjoining buildings with more alleys in the slums (70917627, 2022-09-04; 141198168, 2025-10-15).
- **User impact:**
  - A rich quarter and a poor one differ only in fences, lawns and trees.
  - There are no estates, no big merchant plots with courts and no crowded rookeries. The only big house is one stamped
    mansion shape, identical in both captured cities.
  - A DM who wants a slum or a patrician street must hand-edit, or regenerate with a coarse ×0.5 or ×2 modifier.
  - A stage-2 neighbourhood would inherit no wealth-conditioned grain from the city.
- **Root cause:** grain belongs to the generation stage and to the regenerate call, not to the plot's context. Phase 1
  fixes every building and its lifestyle, but phase 2 cuts the plot grid without asking which household each plot is
  for, and then fills it from the manifest. The subdivider stops at a building-sized area threshold that ignores who
  will live there (`ftg-posts-c.md` §2.1). No rule turns lifestyle into land.
- **Beat it:** one code path, as the owner ruled.
  - The block → plot subdivision depth and the merge rules read the per-plot context vector: wealth gradient, district
    type, density, assignment, frontage class, and distance to market, centre, gate and water. This is the same vector
    that land-use siting (GEO-6) and the building-class rules (SIM-3) read.
  - Prosperity joins neighbouring frontage strips into fewer, wider and deeper plots with bigger buildings, yards and
    courts. Poverty splits strips into narrow plots, courts and back plots.
  - An institution or an assigned building claims and joins the contiguous plots that its footprint and yard need. This
    runs before the fabric is cut, which generalises FTG's landmark-first insight, and assignments go first
    (ASSIGN-hook).
  - Coverage, frontage width, plot depth and yard share come from data tables keyed by class, wealth and density, with
    provenance for the corpus phase. FTG's six-tier lifestyle ladder is the right axis to key them on; the values are our
    own.
  - The zonal gradient stays as the baseline, and wealth modulates it. A rich suburb gets larger plots than a poor
    suburb, and a rich core frontage wider plots than a poor core frontage.
  - Which way wealth runs across the town (the centre, the main streets, high ground or the edge) is a rule in a data
    table, not an accident of placement order. The corpus phase calibrates it.
- **Measure:**
  - Within a zone, the rank correlation between wealth rank and plot area, and between wealth rank and land per
    household, exceeds a set threshold. FTG measures about 0 for plot area (441 m² in every class).
  - Coverage falls, and yard area per household rises, with the wealth decile, within table tolerance.
  - Plots and buildings per hectare fall with wealth at equal zone.
  - Every institution and assigned building (100 %) sits on a plot that meets its area and frontage requirement. The
    share formed by joins is reported, and placement never gives up (ROB-3).
  - Variance floor: within any quarter, the coefficient of variation of plot area stays above a set floor.
  - Locality: changing one district's wealth re-plots only that district, and ≥ 95 % of entities elsewhere stay
    identical (ROB-4).
- **Over-correction risk:**
  - FTG's zonal gradient (dense walled core, gapped rings, suburb ribbons) is legible and follows the growth stages.
    Keep it as the baseline.
  - FTG's districts are mixed: a market district also holds middle-class housing, and Turnpike Dale mixes middle and
    lower class. Its pools also keep rare outliers. Wealth must not turn into modern single-class zoning.
  - Keep the lifestyle-banded decoration, with fences and lawns as the upper-class tell. It is a cheap, readable signal,
    and it belongs on top of real grain.
  - Keep one-click defaults. The rules must derive all of this from the lifestyle distribution without extra questions.

### GEO-9 · No alleys or back lanes: every gap is the same 1.5 m slot, lot interiors are unreachable, and the street is the only way in [BASE; S2]
- **Who:** REC (primary, A1.1) · CR (guide) · US×2 (Deahal on gap size, Jason DeGonia on the fenced boxes) · ⟂ T Mexx.
- **Evidence:**
  - Measured: 81 % and 84 % of all nearest-neighbour gaps lie within 1.45–1.55 m, and the median gap is 1.50 m in every
    residential class in both cities. The Gaps mode is therefore a fixed inset of about 0.75 m per side, the same for a
    squat and an upper-class home. This settles `ftg-posts-b.md` open question 8. Gaps has been the default outside the
    centre since 2025-01 (120828892; `createSettlement__settlement_layout.md`).
  - The wire and the editor have no alley class. Inside the rings the graph carries streets (323–332 m per hectare),
    main roads (41–81 m/ha), the wall (19–21 m/ha), piers, suburb lot outlines and rural lanes (A1.1). The editor draws
    roads, main roads, dirt roads and invisible roads only (`editSettlement__map.md`). In our reading, the "alleys" of
    `ftg-payload-visual.md` §8.3 are the ordinary streets, the narrower of the two rendered widths in town.
  - Every residence opens onto a street, except the mansions. Among residences with an entrance point (1 979 and 1 810),
    none is farther than 10 m from a road, and p95 is at most 8.6 m. No residence is reached through a lane or a court.
    The mansions alone sit back, 22.7–25.9 m from the nearest road.
  - Lot interiors are leftovers:
    - Plots are cut from the frontage band (`ftg-docs-params.md` §2.6, inferred).
    - The 2026 shrink-then-split adds an inset ring whose interior core has no stated use (`ftg-posts-c.md` §2.2).
    - Unused plots are decorated with lawn, trees, fences or a single well or statue, and empty lots (26 % and 29 % of
      in-town serialised lots) become parks, plazas or dirt (`ftg-docs-params.md` §4.10).
    - A user took the fenced plots for unfinished buildings (Jason DeGonia, 144226579; REN-1).
  - The anywhere-in-lot option, and the 2023 dense re-roll that tiled a whole lot ([SHOWN] 84680671/12), put buildings in
    lot interiors. No access edge type exists to reach them. That they stay landlocked is inferred; the mode was not
    captured.
  - Deahal asked for control over the gap between buildings and over the padding between buildings and roads. The
    creator replied that road padding cannot be changed and asked why it was wanted (157283634, 2026-05-04).
- **User impact:**
  - Dense quarters have no courts and passages. Rich ones have no lanes to stables and back yards.
  - A DM cannot stage a chase through alleys, find the back door of a shop, or route a cart behind the houses.
  - Every house looks equally detached from the street.
  - For stage 2, a neighbourhood close-up has nothing to draw between its streets.
- **Root cause:** access is modelled only by the street graph that the road agents grow. The space between buildings is
  an inset applied after tiling (`ftg-posts-b.md` T-24), and the space behind them is whatever the subdivider leaves.
  Neither space is a network.
- **Beat it:**
  - Alleys, courts and back lanes form a generated access network inside the same planar graph. FTG's single typed edge
    graph for streets, walls, water and lot outlines is the right substrate. Each way has a class and a width in metres
    from the data tables.
  - The network comes from the same granularity rules as GEO-8. Splitting a poor block adds many narrow alleys and
    courts. Joining a rich block leaves a few wide back lanes that reach yards and stables.
  - Every plot and every building has an access edge: a street, an alley or a court. An interior building is legal only
    when an alley or a court reaches it.
  - A rule chooses what separates two buildings: a shared party wall, a narrow non-passable slot, or a passage wide
    enough to walk. Each width comes from the tables, with our own values to be calibrated.
  - Alleys are ways (LAB-1). They can be named, they are part of the stage-2 seam contract, they are drawn by zoom
    (hidden or as hairlines at city zoom, in full at neighbourhood zoom), and the sewer layer can query them
    (LAYER-hook).
- **Measure:**
  - Alley length per hectare and median alley width by wealth decile, within a zone. Poor blocks exceed rich ones in
    length, and rich ones exceed poor ones in width. FTG has 0 alley length at every decile.
  - Access completeness: 100 % of plots and buildings have an access edge, and 0 buildings are landlocked.
  - Permeability: the median distance along a street frontage between public passages into the block, by district
    class, against targets.
  - The gap-width distribution has one mode per separation rule (party wall, slot, passage). FTG's is a single spike,
    with 81–84 % of gaps at 1.5 m.
- **Over-correction risk:**
  - FTG's street-only read is clean at city zoom, and its uniform gap plus a drop shadow keeps each building legible.
    Alleys must not clutter the city view, and houses that share walls must stay distinguishable by outline or shadow.
  - Keep one planar graph with typed edges, so lot and court detection stays uniform (`ftg-payload-visual.md` §3.2).
  - Do not cut every block through. Passages come from rules and tables, not from a lattice, and the corpus phase
    calibrates their frequency.

### GEO-10 · FTG separates plots from buildings, but its plot is a tiling cell, not an owned parcel with a site plan [BASE; S3 input]
- **Who:** owner ruling (PLOT MODEL) · REC · CR.
- **Evidence:**
  - What FTG gets right:
    - It has a lot → plot → building hierarchy. Plots exist before buildings, a plot can stay unused, and unused plots
      are decorated (`ftg-docs-params.md` §2.6, §4.10).
    - Farmsteads put the house in the middle of a larger plot, with a driveway to the road (144226579). This is FTG's one
      site plan with an access edge. In 2023 maps a farmstead already showed as one to three small buildings inside a
      fenced yard ([SHOWN], `ftg-posts-a.md` §3.2).
    - The suburb perimeter is widened to suggest gardens behind the houses (144226579).
  - What is missing:
    - The wire lot carries a sequential id, its polygon, its group, a flag and a render class. It has no owner, no use,
      no access edge and no reference to the buildings on it, and no building refers to a lot, so containment is only
      geometric (`ftg-payload-visual.md` §3.3, §5.3; field listing re-checked on both payloads). Only 53 % of buildings
      lie in any serialised lot (DAT-2).
    - A lot holds a median of two buildings in every class (A1.1), each with its own household. Nothing in the data
      groups a house, a workshop, a stable and a yard under one owner.
    - Row building follows zone and use, not class. Shared walls go to industry (96–98 % in the rings), warehouses
      (78–94 %) and shops (43–46 %). Residences share walls in 2–5 % of cases in the rings and 0 % in the suburb. So
      FTG has no rows of houses built end to end (A1.1; `ftg-payload-visual.md` §5.2).
    - An institution is one footprint. An inn, a warehouse, a guild house and a temple are each a single polygon; temples
      and the keep are fixed templates, and the mansion is one fixed shape in both cities (A1.1; `ftg-docs-params.md`
      §2.6). None is a complex with a yard, stables and outbuildings. The creator's wish for landmark complexes is still
      unbuilt (106664214; SIM-3).
    - Coverage is not a rule: land per building is about 225 m² in every suburb lot and every class, so the yard share
      cannot express class or use (A1.1).
- **User impact:**
  - The map cannot show that the inn owns the stable yard behind it, or that a merchant's house, warehouse and garden
    form one property.
  - Streets of houses never form the continuous frontages that FTG's own warehouse rows show.
  - The stage-3 building generator would have no parcel, owner or access edge to fit a composition to.
- **Root cause:** a plot is a cell of the frontage tiling (or of the suburb lot grid), sized for one typical building
  and filled from the manifest one building at a time. Ownership lives on buildings and people, not on land.
- **Beat it:** the owner's plot model.
  - A plot is a parcel with an owner, a use, frontage edges and access. It holds 0..n footprints plus a yard.
  - A per-plot site-plan step, the outer layer of the building generator, reads coverage and arrangement tables keyed by
    class, wealth and density:
    - Row houses and row businesses build end to end along the frontage with party walls.
    - Manors, inns, workshops, temples and other institutions set back several buildings around one owner's yard.
    - A hovel is one small footprint on a plot that is mostly yard.
  - FTG's content model supplies the owner. A household or business from the roster owns the plot, which keeps FTG's
    guarantee that every building has a purpose and occupants true at the plot level.
  - The renderer draws footprints and yards, never a plot outline as a building. Plot lines are an optional cadastral
    layer.
- **Measure:**
  - Coverage by class within the table targets. FTG's lot coverage is 0.51–0.58 for every class.
  - The share of plots with two or more buildings of one owner, by class. It must be above 0 for institutions, manors,
    inns and farms. FTG records no owner on any lot, so the measure is undefined for it; its farmsteads are the nearest
    visual equivalent.
  - The party-wall share of frontage length on row classes. FTG's residences reach 0–5 %.
  - Streetwall continuity on dense frontages is at least that of FTG's DENSE core.
  - Every yard belongs to exactly one plot or to a declared common court.
  - Every plot owner exists in the roster (100 %).
- **Over-correction risk:**
  - Extend FTG's hierarchy, its plot-decoration vocabulary (lawns, fences, wells, gardens) and its farmstead site plan;
    do not replace them.
  - Owner-level plots must not bloat the file. FTG stores 2 798 buildings, trees and a whole population in 593 KB.
    Store the rule inputs and derive each site plan lazily from the plot's own sub-seed, as the stage-3 contract
    already requires.
  - Keep FTG's roster guarantee intact.

### Effect on §13 and §14
- **§13 #2 widens.** It changes from "frontage-first plots and buildings" to "a frontage-first **plot model**: owned
  plots with per-plot site plans, granularity set by the context vector (join and split), and a classed network of
  alleys and back lanes". It now answers GEO-1, GEO-8, GEO-9 and GEO-10.
  - New headline metrics: the within-zone rank correlation of plot area with wealth; alley length and width by wealth
    decile; 100 % access edges; coverage by class within the table targets.
  - **#11** supplies the context vector that #2 reads, which is the owner's single code path.
  - No rank changes. #2 was already second, and #1 (the kernel) stays its prerequisite, because joins, splits and
    alleys are exactly the edits the kernel must make safe.
- **§14 gains four items:**
  - 16. The zonal grain gradient by growth stage: a dense walled core, gapped rings and suburb lot ribbons. Wealth
    modulates it rather than replacing it.
  - 17. The farmstead site plan: a building centred in a larger plot with a driveway to the road. It is the precedent
    for site plans with an access edge.
  - 18. Landmark-first reservation of contiguous space before the fabric is cut. It is the precedent for joins.
  - 19. Row building where the use calls for it, as FTG's warehouses, industry and shops already do, with every building
    still legible.

### Errata to the ledger above (found while measuring; the text above is left as landed)
1. **The wall is wire type 7, not only tower points.** This corrects GEO-4 (its title and first evidence line), DAT-2
   and A.6.
   - Type 7 is the town wall line, a chain of edges in the same planar graph as the streets. Every tower lies exactly on
     one of its nodes: 17 of 17 in Galeiaward and 29 of 29 in Nevervalley (census section [I]).
   - Streets meet the wall only at shared nodes; no street crosses it without one. A street passes through the wall at 6
     nodes in Galeiaward and 2 in Nevervalley, and ends at it at 6 and 19 nodes (census section [N]). No gate object
     marks the passing points.
   - So the statements that the wall is serialised only as tower points (GEO-4) and exists only as tower points (DAT-2)
     are wrong. Still true: gates are not objects, and the client draws the wall band and crenellation.
   - The earlier reading "7 = minor" (`ftg-docs-params.md` Critic-2 addendum item 5, following `_critic-ftg.md`) should
     be updated by the owners of those files. This lane did not edit them.
2. **§2 census: its road-type set {0, 1, 2, 6, 7, 10} included the wall.** None of its conclusions change:
   - Type 7 has no edge shorter than 1 m.
   - It adds 1 and 4 edges to the counts of road edges shorter than 5 m.
   - The buildings crossed by a centreline are crossed by streets (a medium inn and a market square in both cities)
     and, in Nevervalley, by a type-10 edge (a farm). The wall crosses none (census section [O]).

**Appendix B addition (not recounted).** Plot grain and gaps: Deahal (157283634, 2026-05-04) and Jason DeGonia
(144226579, 2025-12-04). Appendix B already counts both, under regeneration fidelity and UX friction. ⟂ T Mexx
(watabou-extra 70917627, 2022-09-04; 141198168, 2025-10-15).

**CONFIRMED vs PLAUSIBLE.** Every number in A1.1, the entries and the errata is CONFIRMED, either by executing the census
on both payloads or by reading the cited source. The creator and user statements were read in the raw threads. Four
readings are PLAUSIBLE only:
- Nevervalley's poor-dense contrast is zonal rather than a class rule. This is inferred from the decoration-only class
  configs.
- The ring zone's party-walled core is the stage-1 DENSE area. This is inferred from the towers on the Beer Forest ring
  and from `placeWallAfter` on stage 1.
- Buildings placed by the anywhere-in-lot option have no access. No access edge type exists, but that mode was not
  captured.
- "Every class gets the same grain" is shown for FTG's default request only. Both cities come from one request.
