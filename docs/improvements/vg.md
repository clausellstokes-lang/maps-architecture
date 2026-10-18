# Weakness ledger — watabou's Village Generator (VG)

Lane `improvements/vg` (Opus weakness miner), 2026-09-25. Purpose: the raw material for designing something BETTER
than VG. The later `IMPROVEMENTS` lane merges this file with the MFCG, NG and FTG ledgers.

**Scope reminder (owner, 2026-09-25).** The village is a separate, later product. The base (the MFCG/FTG-fusion
town/city generator) is built first. So every entry carries a scope tag:

- **BASE**: the weakness also affects a town/city generator, so the base should beat it.
- **STAGE-2**: it concerns composing a city out of neighbourhoods.
- **STAGE-3**: it concerns building compositions on lots.
- **VILLAGE-LATER**: it matters only for the later village product. The base must merely not rule out the fix.

Owner hooks are named where VG evidence supports them: EVOLUTION, ASSIGNMENT, LAYER and the drainage hook.

**Evidence classes.** **CONFIRMED** means the weakness is quoted at source (creator or user, read verbatim) or counted on
our recordings. **PLAUSIBLE** means it rests on reasoning only. The "beat it" proposals are all PLAUSIBLE, because none
has been built yet. Citations use post ids under `research/patreon/watabou-village/` (and `watabou-extra/`), devlog
ids under `research/devlogs/village-generator/`, findings-file sections, and `captures/village/<timestamp>`. Build
stamps: every VG number is from build 19251041 unless it is marked 19365073.

## §0 Reading record

**Read in full, every line:**

| File | Lines | What it covers |
|---|---|---|
| `_critic.md` | 478 | read first, as the standing rulings require |
| `_critic-vg-ng.md` | 226 | |
| `_critic-os.md` | 435 | |
| `vg-posts-a.md` | 1 195 | |
| `vg-posts-b.md` | 995 | |
| `vg-ng-devlogs.md` | 1 038 | |
| `profile-village.md` | 2 362 | body, Appendix A, Critic addendum, River-course addendum R1–R6, Critic-2 addendum, River-course addendum part 2 (P0–P6) |
| `os-geometry.md` | 945 | |
| `watabou-extra-a.md` | 1 161 | |
| `watabou-extra-b.md` | 996 | |
| `visual-spec.md` | 743 | |

Every Critic addendum and Critic-2 addendum inside these files was included.

- **Read in part: `_critic-ftg.md`.** This file is not on this lane's list, but the standing rulings ask for the second
  critics. §0–§2, §5 and §6 were read in full. §3 (FTG spot-checks) and §4 (payload re-derivations) were not read,
  because they are FTG-internal. Its headline rulings are used only for the FTG contrast in group 9.
- **Original sources.**
  - Every "## Comments" section of the 28 `watabou-village` Patreon posts and the 21 VG itch devlogs was read in full
    (31 KB).
  - The Patreon API reports 114 comments on those posts. 110 are archived: 35854256 and 38498864 each miss two.
  - Only 5 of the 21 devlog pages have parsed comments.
  - **The VG itch game-page comment board was never archived.** `research/devlogs/village-generator/` has no
    `_comments.md`, unlike dwellings, manor and procgen-mansion. That board is the usual home of bug reports, so it is
    the largest gap in the user-voice evidence. It was not fetched, because the standalone rule forbids new outside
    inputs.
  - One creator quote came from `research/external/raw/wayback-old-a1wx6h-01fc604279.comments.txt` (Reddit a1wx6h),
    found with a grep for "village".
- **Recordings re-counted for this ledger.** No bundle was opened. The recount used all 13 `console.jsonl` files and
  all 8 `meta.json` files across the 8 `captures/village/*` directories, plus the 8 `draw.json` files (checking
  `logDropped`). Results are in Appendix H10.
- **Not read.**
  - The other findings files: MFCG, NG and FTG readers, `os-model.md`, `os-wards-render.md`, `profile-mfcg.md`,
    `profile-neighbourhood.md`, `manor.md`. They belong to other lanes.
  - No image. Image-based claims are the readers' `[SHOWN]` descriptions.
  - No captured JavaScript bundle.
- **Reading budget.** About 260 k tokens of reading, under the 350 k switch point. Nothing on the lane list was
  downgraded to outline reading.

## §1 Outcome first

VG's weaknesses cluster in five places. Each is evidenced at source or on our recordings.

1. **Hidden robustness debt.**
   - Across our eight VG captures there were 27 unique generation attempts. 4 were discarded whole by the highway
     validator, about 15 %. All 4 were on maps with a highway: 4 of 13 highway attempts (≈31 %) failed, against 0 of 14
     highway-free attempts.
   - Each time, the seed the user entered was silently replaced by another seed.
   - The richer feature combinations ship with defects that the creator himself announced: confluence bridges,
     crossroads loops, fields overlapping inside the palisade, piers "at odd locations".
2. **The layout core has been frozen since 1.2.x.** Only 2 of 21 devlogs add settlement structure.
   - Houses are rectangles, rejection-sampled along tracker roads.
   - There are no lots and no streetwall. The creator made this critique of his own VG method in Urban Places.
   - There is one building archetype.
   - The wall is a convex hull drawn after the village exists.
   - Water, fields, forests and the square are aesthetics-first post-passes that ignore land-use logic.
3. **There is no real-world scale.**
   - Screen geometry is in pixels on a fixed 1100² square.
   - The terrain grid is always 128², whatever the map size.
   - Units are "very… vague", and are metric only on JSON export (0.7 m per unit).
   - There is no scale bar and no compass. A grid arrived only in 1.6.8, in abstract units.
   - Two users asked what the scale is.
4. **Content, annotation and data were never solved.**
   - Points of interest (POIs) were the reason VG was started. They have been generated since 1.2.2, and in the 2026
     builds they are still two console lines per village.
   - Population is an output, not a control.
   - Six users asked for character VG cannot express: manors, fiefdoms, livestock, wells, ruins, biomes, roundhouses.
   - Editing stops at renaming and house marks.
   - Exports are non-standard and incomplete: no terrain, the palisade is a list of polylines, and nothing exists
     beyond the frame.
5. **Seeds are not durable.**
   - The live build changed between two of our recordings four days apart. Seed 3131 went from 29 to 24 buildings.
   - Permalinks carry no version.
   - New entities ghost out of export: the palisade shipped without JSON or City Viewer support.

What VG gets right, and a rewrite must keep, is listed in §3. The main items are:

- a regenerate costs 240–330 ms of JS, including rendering;
- terrain and water form one coherent picture;
- one density field drives the village's centre, packing, extent and enclosure;
- the tag vocabulary is small and simple;
- styles are data, including selective outlining;
- repair rules and deliberately partial connectivity;
- an independent tree stream.

The 15 highest-value opportunities are in §4. All but the last are BASE items.

## §2 Weakness ledger

**Index** (evidence class = CONFIRMED unless marked):

| ID | Weakness (short) | Who says so | Scope |
|---|---|---|---|
| R1 | whole-map discard on highway failure; entered seed replaced | recorded (4/27; 4/13 highway maps); creator's retry doctrine | BASE |
| R2 | feature interactions ship with announced defects | creator ×4 posts | BASE |
| R3 | Boolean-kernel slivers ("thorns") | creator | BASE |
| R4 | land = one region (fields on one bank) | creator ×2 | BASE |
| R5 | pier placement never solved | creator ×3; recorded | BASE |
| R6 | "lonely houses" an unplanned by-product | creator | VILLAGE-LATER / BASE outskirts |
| R7 | seeds not durable across builds; no version in state | recorded; creator; user ×1 | BASE |
| R8 | entity lifecycle ghosting (export/viewer/permalink) | creator ×2; user ×1 | BASE |
| G1 | no lots, no streetwall | creator (UP critique); recorded | BASE + STAGE-3 |
| G2 | one building archetype (rectangle) | creator ×3; users ×4 | BASE + STAGE-3 |
| G3 | settlement not organised by water | user ×1; creator | BASE |
| G4 | rivers decorative, not drainage | creator ×3; recorded | BASE (drainage hook) |
| G5 | roads ignore terrain; no switchbacks; cliffs blocked | creator ×3; users ×2; recorded | BASE |
| G6 | single-highway topology; crossroads unsolved | creator ×2 | BASE |
| G7 | wall = post-hoc convex hull; gates are houses | creator ×3; users ×4; recorded | BASE + EVOLUTION |
| G8 | fields aesthetics-first; code "quite messy" | creator ×4; users ×3 | BASE / VILLAGE-LATER |
| G9 | forests hug the houses ("more dramatic") | users ×2 (5 comments); creator | BASE |
| G10 | open space = one distorted circle | creator | BASE |
| G11 | nothing exists beyond the frame | creator ×2 | BASE |
| G12 | terrain grid fixed at 128² for every map size | recorded (impact PLAUSIBLE) | BASE |
| V1 | population/size are outputs; zero-population villages | creator ×2; user ×1 | BASE |
| V2 | opaque, discontinuous controls; silent tag resolution | users ×1 (2 comments); creator; recorded | BASE |
| V3 | narrow settlement-character vocabulary | users ×6; creator's stance | BASE |
| V4 | random styles weak | creator (user disagrees) | BASE (low) |
| E1 | no layout editing; state = seed | user ×1 (+ "people started asking … more often", MFCG 34822131); sister-generator creator statements | BASE |
| E2 | regeneration locality only for trees | creator; recorded | BASE |
| E3 | "hide" used as a stand-in for "not generated" / scenario variants | creator; users ×2 | BASE (LAYER hook) |
| E4 | no stable identity; numbering = creation order | creator | BASE (ASSIGNMENT hook) |
| P1 | trees dominated cost for years; size compromised | creator ×4; users ×1; recorded | BASE |
| P2 | water extraction is the hot spot; no linear-time method | recorded | BASE |
| P3 | size ceiling; hamlet/city tool split | creator ×2; recorded | BASE (fusion) |
| P4 | heavy runtime and draw overhead | creator; recorded | BASE |
| S1 | fixed frame, screen-pixel geometry, no zoom | recorded; creator ×2 | BASE |
| S2 | style churn; print/round-trip users underserved | creator ×3; users (poll) | BASE |
| S3 | fragile visual controls (plastic shading, discontinuities) | creator ×4 | BASE (low) |
| S4 | empty space fought with a vignette, not content | creator | BASE |
| L1 | POIs never displayed; annotation the blocker | creator ×4; user ×1; recorded | BASE |
| L2 | no scale bar, compass or metric grid | recorded; creator; users ×3 | BASE |
| L3 | title plate only; no feature/street names | recorded (impact PLAUSIBLE) | BASE |
| L4 | naming data typos; syllable-deleting shortener | recorded; creator (PS) | BASE |
| D1 | non-standard, incomplete JSON | creator; users ×3 | BASE |
| D2 | no committed units in the model | creator ×2; users ×2 | BASE |
| D3 | seed-only state; integration through GET parameters | creator ×3 | BASE |
| D4 | no layered export for GM/player/VTT | users ×3 | BASE (LAYER hook) |
| D5 | no nesting across scales in data | users ×2; creator | STAGE-2/3 + BASE hooks |
| C1 | content layer thin and hidden | recorded; creator | BASE |
| C2 | no lordship/land tenure structure | users ×4; creator | BASE / STAGE-3 |
| C3 | static snapshot, no history | users ×2 | BASE (EVOLUTION hook) |
| U1 | features hard to discover | users ×3 | BASE |
| U2 | integration by linking many small apps | user ×1 (+1 wish list); creator | BASE (library API) |

### Group 1: Generation robustness

**VG-R1. The whole map is discarded when the highway fails validation, and the entered seed is silently replaced.**
[BASE · CONFIRMED]

- **Who says so:** our recordings; the creator's stated failure doctrine ("create another village until its population
  is larger than zero", 35854256).
- **Evidence:**
  - `VillageScene.hx:275` prints "The highway intersects itself", "…is terminated by water" and "Unfinished bridge on
    the highway" (profile-village §1.2, §3.2).
  - Our recount (H10.1): 4 of 27 unique attempts were discarded, and all 4 were among the 13 highway maps.
  - Requested → shown: 801393661 → 1450476720; 2087232953 → 1479091611; 4243 → 204813853 (the URL comes back as
    `seed=204813853 …&trees=4243`, `captures/village/2026-09-21T05-37-29/meta.json`); 9191 → 443658761.
  - `Blueprint.adjust` runs only on the retried generations (profile-village R6).
- **User impact:**
  - A seed that someone types or shares shows a different map about one time in three on highway maps.
  - The failed seed is reused as the tree seed, so the forest changes too.
  - A retry pays the elevation and water cost twice (profile gen-2).
- **Root cause:**
  - The highway is one map-crossing tracker walk (`Region.initHighway`, `randomEdge`). It is validated only after the
    whole Region is built, and no local process can repair it (profile-village §3.2 [INFERRED]).
  - This is the watabou doctrine "primitives are permitted to be fragile because the top level retries" (os-geometry
    §1.4). The retry is actually narrower than that doctrine suggests: only four explicit throws reach it (_critic-os
    C1).
- **Beat it:**
  - Plan the arterial skeleton first, under constraints: choose the entry and exit edges, put crossings where the
    channel is narrow and straight, and rule out self-crossing by construction.
  - Validate each stage as it is produced, and retry only that stage with a derived sub-seed
    (hash(seed, stage, attempt)).
  - Cap the retries, report the reason, and never let the displayed map disagree with the seed shown.
- **Measure:** over 10 000 seeds per tag set:
  - seed → map identity 100 %;
  - whole-map discards 0;
  - stage retries ≤ 2 % of generations, with p99 ≤ 3 attempts;
  - VG baseline for comparison: 4 of 13 highway maps (the rate is PLAUSIBLE only, because n is small).
- **Risk of over-correcting:** VG's retry is cheap (a 13.6–143 ms model) and invisible. A heavy global solver would
  cost speed and lose the loose, grown look of tracker roads. Keep a deterministic, reported whole-plan retry as the
  last resort.

**VG-R2. Interacting features ship with defects the creator announces himself.** [BASE · CONFIRMED]

- **Who says so:** the creator, in four release posts.
- **Evidence:**
  - "Bridges near confluences tend to cross the water at wrong angles" (91692684).
  - "odd road forks around bridges and docks" were fixed only later (91692684).
  - Crossroads: "highway branches loop back to the original road or get cut off by secondary roads" (116745476).
  - Palisade: "quite common to get fields overlapping each other"; palisade plus water is "not supposed to be used"
    (104796798).
- **User impact:** the glitches appear exactly in the richer configurations people choose on purpose: confluence,
  crossroads, walled, coastal.
- **Root cause:**
  - Features are post-passes over a finished layout: the palisade after the houses, the wall cutting fields
    afterwards, highway branches reconciled after they have grown (vg-posts-b §2.19, §2.25; profile-village Critic
    addendum stage order).
  - Validation is local to each pass. No global invariant set exists.
- **Beat it:**
  - Generate in dependency order: plan the defensive line and the arterials before the local fill.
  - Run a hard-invariant checker on every map:
    - exclusive land uses never overlap;
    - every bridge is within tolerance of the channel normal;
    - no branch re-joins its parent within k segments;
    - every gate sits on a road crossing.
- **Measure:** hard-invariant violations = 0 per 10 000 maps; bridge-angle error p95 ≤ 15°, confluences included;
  field-overlap area = 0 m².
- **Risk of over-correcting:** permissive tags are a feature ("The result will look not unlike a coastal city", 104796798).
  Keep combinations allowed and make them correct, rather than forbidding them.

**VG-R3. The home-grown polygon Boolean library produces slivers ("thorns").** [BASE · CONFIRMED]

- **Evidence:**
  - "Often fields along the main road have a small shape defect like a thorn. Most likely it's a bug in my library
    for Boolean operations with polygons" (50688261).
  - `PolyBool.and` runs 28–92 times per map (profile-village App. A).
  - The ancestral kernel's robustness ranking: non-robust predicates, exact float compares, NaN-swallowing sign/clamp
    (os-geometry §4).
- **User impact:** visible spikes on field edges along the main road.
- **Root cause:** near-degenerate intersections without robust predicates or snap rounding.
- **Beat it:** use a robust integer or snap-rounded clipping kernel, then filter slivers and spikes after every
  operation.
- **Measure:** 0 output vertices with an interior angle < 10° or an edge < 0.2 m after any Boolean; a property test on
  10⁵ random polygon pairs with 0 invalid outputs.
- **Risk of over-correcting:** none worth naming. Keep VG's rounded field corners (`semiSmooth`/`getArc`).

**VG-R4. Land is modelled as one connected region, so fields appear on only one river bank.** [BASE · CONFIRMED]

- **Evidence:**
  - "When there is a river on a map, fields are spawned only on one of its banks… Sometimes there are no fields
    spawned at all" (50688261).
  - The creator's diagnosis: "a problem … with the method I used to calculate earth bounds" (57968729).
  - Land patches are still built lazily during field layout (profile-village R4).
- **User impact:** lopsided villages; half the map is unused.
- **Beat it:** make land a multi-component polygon set from day one, and have every land pass iterate over the
  components.
- **Measure:** on 1 000 river and confluence maps, every eligible land component adjacent to the settlement receives
  uses. Eligible components left empty: 0.
- **Risk of over-correcting:** none.

**VG-R5. Pier placement was never solved; piers are suppressed silently.** [BASE (harbours) · CONFIRMED]

- **Evidence:**
  - "surprisingly tricky to implement, so expect occasional glitches" (38498864).
  - "Piers intersect each other or end on land much less often now. They still get spawned at odd locations though"
    (50688261).
  - Narrow rivers get no piers, and this was accepted (89314043).
  - Recorded: `Region.buildPiers` runs on every watered map, yet `drawPier` fires 0 times on rivers, twice on the
    island and 4 times on the coast (profile-village R3, R5).
- **User impact:** odd or absent waterfronts. Riverside villages have no quays.
- **Root cause:** a stochastic placer with validation bolted on afterwards. There is no waterfront plan.
- **Beat it:** plan the waterfront (quay line, landing roads, water-front uses) and derive the piers from it. FTG's
  evenly spaced jetties perpendicular to the quay are the planned alternative (_critic-ftg F11).
- **Measure:** 0 pier–pier or pier–land intersections; 100 % of pier roots on a quay or waterfront road; pier spacing
  coefficient of variation ≤ 0.3 within a harbour.
- **Risk of over-correcting:** a few piers are part of the charm. Don't turn every shore into a port.

**VG-R6. "Lonely houses" are an unplanned by-product, tuned only statistically.** [VILLAGE-LATER / BASE outskirts ·
CONFIRMED]

- **Evidence:** "This wasn't something I planned, but more like a byproduct of other processes … sometimes there were
  just too many of them and it looked odd". The fix was fewer, longer trails (57968729).
- **User impact:** outliers have no purpose, and their number can't be controlled.
- **Root cause:** a house is dropped on any tracker that wanders out of the dense zone.
- **Beat it:** place outlying buildings on purpose, by rule: a farmstead beside its fields, a mill at the water, a
  shrine at a crossing. Then generate trails to them.
- **Measure:** 100 % of outlying buildings carry a purpose; the outlier count is controllable within ±20 %.
- **Risk of over-correcting:** users like lonely houses, which read as farmsteads. Keep them and make them intentional.

**VG-R7. Seeds are not durable across builds, and the saved state carries no version.** [BASE · CONFIRMED]

- **Who says so:** our recordings; the creator; one user.
- **Evidence:**
  - Seed 3131 went from 29 to 24 buildings and 196 to 162 population; its river went from 51 to 94 segments; and its
    Enter-successor seed changed from 202429973 to 1198911812. Its name and POIs stayed the same (profile-village
    Critic-2 item 1, P0). The two recordings were four days apart.
  - The creator flagged the 1.6.1 density rewrite as a behaviour shift that made villages denser, "not sure it's a
    good thing" (105215836).
  - The URL is only `?seed=&tags=&trees=` (profile-village §3.1).
  - A user asked for a preserved "benchmark build" before any rewrite (Heath Rezabek, 117634240).
- **User impact:** shared permalinks and campaign maps silently change.
- **Root cause:** the generator version is not part of the state, and random-number consumption is shared across
  stages (only six re-seed points, Critic-2 item 4).
- **Beat it:** stamp permalinks and saved documents with a version; derive sub-streams per stage and per entity by
  hashing; keep a golden-seed regression suite; keep old versions replayable.
- **Measure:** on the golden seeds, stages untouched by a release stay byte-identical (100 %); a permalink replays the
  exact version that created it.
- **Risk of over-correcting:** freezing everything blocks improvement. Allow deliberate shifts with a version bump and
  a changelog, which is also the owner's non-negotiable 10.

**VG-R8. New entities ghost out of some lifecycle paths (export, viewer, permalink).** [BASE · CONFIRMED]

- **Evidence:**
  - The creator: "I was expecting bug reports related to palisades, but instead I found a whole chunk of
    functionality missing: those palisades weren't exported to JSON and weren't displayed in City Viewer" (740285).
  - A user: the exporter still reported "version 1.5.4" in 1.6.0 (Sylvain Donnet, 104796798).
  - Towers could not be numbered or opened, and house marks were not stored in permalinks until 1.6.5 (116745476,
    117634240).
- **User impact:** features on screen vanish in export, in 3-D and in saved links.
- **Root cause:** every entity type is threaded by hand through generate → render → export → viewer → permalink →
  picking.
- **Beat it:** an entity-type registry. Each type must declare its generator, renderer, export schema, state or
  permalink encoding, and picking/numbering behaviour. CI fails otherwise, and the exporter version is taken from the
  build.
- **Measure:** a registry round-trip test in which 100 % of entity types survive JSON, SVG, PNG, permalink and
  save/load.
- **Risk of over-correcting:** none.

### Group 2: Geometric quality and realism

**VG-G1. There are no lots and no streetwall; houses are free rectangles at varying gaps.** [BASE + STAGE-3 ·
CONFIRMED]

- **Who says so:** the creator, about his own VG method; our recordings.
- **Evidence:**
  - Urban Places (141198168): "rectangular houses at slightly varying distances from each other along a street
    (similarly to Village Generator). Even when these distances are very small (they can't be zero), gaps are visible
    where the street turns or bends… the old buildings fail to form a streetwall."
  - MFCG's outskirts adopted VG placement: "placed more sparsely … they all are proper rectangles" (37407181).
  - Recorded: `buildAlong → validateBuilding`, with 63–82 % acceptance (profile-village §4.8).
- **User impact:**
  - Dense villages and small towns never read as urban.
  - There are no plots for building generation, and frontage is undefined.
- **Root cause:** rejection sampling of free rectangles along road offsets. There is no lot subdivision.
- **Beat it:**
  - Make frontage lots first-class: plots cut across the band along each road, with depth set by district and
    density.
  - Fit buildings to the lots, with party walls where density calls for them.
  - Keep detached plots as a class, as the creator did in Urban Places (141879891).
- **Measure:**
  - A streetwall continuity index per street class: the share of frontage occupied by building fronts within the
    setback tolerance. It should be tunable from about 0.2 to 0.95.
  - The gap at bends in the urban class ≤ 1 m.
  - 100 % of buildings sit on a lot.
- **Risk of over-correcting:** detached cottages with grass between them are the village look. Keep a semi-rural plot
  class.

**VG-G2. There is one building archetype, the rectangle: no range from hovel to manor.** [BASE + STAGE-3 · CONFIRMED]

- **Who says so:** the creator in three posts; four users.
- **Evidence:**
  - "In Village Generator all buildings on a map are currently rectangular in shape" (66544756). In Procgen Mansion
    this gave "boring floor plans" (66544756).
  - "Better buildings … more diverse in size and shape … I'll have to abandon the 'fake perspective' style"
    (117634240); non-rectangular houses are planned (169696051).
  - VG needs no skeleton roofs because its buildings are strictly rectangular (101173551).
  - Users asked for: roundhouses and whole Celtic villages (Maezar, 50688261; the creator's "I'll give it a try" never
    shipped); roof variety (scott2020, 426543); a manor or small castle (Varpilah Chase, 91692684); a farmhouse with an
    adjacent barn (Quenten Walker, 37407181).
- **User impact:** every building looks alike. There are no halls, barns, courtyards or manors.
- **Root cause:**
  - The renderer draws obliquely extruded rectangles.
  - Placement draws fixed rectangles.
  - The creator ties building shape to road topology: "It's very easy to replace rectangles with circles, but that
    would look unnatural with grid-like road patterns" (50688261).
- **Beat it:**
  - A building is a composition generated from its lot. Its class is chosen by data-table rules reading the lot's
    context vector (the STAGE-3 hook).
  - Draw it top-down, with roofs derived from the footprint, at every level of detail.
- **Measure:**
  - Footprint-class entropy per map.
  - The class mix matches the rule table within ±5 %.
  - 100 % of footprints fit their lots.
  - No fallback rectangles in the renderer.
- **Risk of over-correcting:**
  - Gabled rectangles are legible and charming.
  - Roof detail is scale-dependent: ridges become noise on large maps and expose flaws on small ones (101173551).
  - Keep simple roofs at small scales through the level-of-detail system.

**VG-G3. The settlement is not organised by water.** [BASE · CONFIRMED]

- **Evidence:**
  - A user: "all these villages seem aloof from the water, like the people didn't even know it was there" (Allen
    Varney, 36199609).
  - The creator: "the water and the 'potential village area' are created independently" (36199609).
  - The square's centrepiece is suppressed if the square overlaps water, which is a downstream veto rather than a
    water-aware density field (80494491; vg-ng-devlogs A2.1).
  - Watermills are to be "suitable existing buildings" marked as such (36199609).
- **User impact:** villages sit beside rivers they don't use. Quays, mills and fords are accidental.
- **Root cause:** the density field ignores water. Water uses are bolted on afterwards.
- **Beat it:** site selection and density treat water as both attractor and constraint (crossings, landings, mill
  sites). Water-dependent uses are placed by rules.
- **Measure:** on maps with water:
  - the density peak lies within X m of a crossing or landing in ≥ 80 % of seeds;
  - at least one water-dependent use appears in ≥ 90 %;
  - no square overlaps water.
- **Risk of over-correcting:** inland villages exist. Keep water optional.

**VG-G4. Rivers are decorative curves, not a drainage system.** [BASE (drainage hook) · CONFIRMED (recorded); beat
PLAUSIBLE]

- **Evidence:**
  - Old rivers were "slightly bent stripes", up to half the map wide, and the rewrite is "not perfect" (89314043).
  - Rivers were "much more difficult than I expected" (36199609).
  - Recorded: the course is made before any terrain (`River.new` inside `createElevation`, R1). On build 19365073 it
    is a spline through 6–7 knots (P4). The terrain is then carved to it. No flow direction or bed slope is recorded.
  - Rivers end at the frame (37407181, 45360377).
- **User impact:**
  - Visually coherent ("relief follows rivers").
  - But there is no downstream direction or width law; confluence widths are ad hoc; and nothing can be asked where
    water drains, which sewers and mills will need.
- **Root cause:** the course is an independent shape, and the terrain is made to agree with it.
- **Beat it:**
  - Keep "course first, carve the terrain".
  - Give every course a flow direction, a monotone bed and a width that grows downstream (widths add at confluences),
    plus an outfall.
  - Expose flow and outfall queries: the owner's drainage/sewer hook.
- **Measure:**
  - Beds monotone along the flow in 100 % of rivers.
  - Width never decreases downstream.
  - Every river has an outfall.
  - Contours cross water 0 times.
- **Risk of over-correcting:** a meander or erosion simulation is costly and unnecessary. The creator: "apophenia works
  better than detailed simulation" (41103311). Keep the cheap spline course.

**VG-G5. Roads barely respond to terrain; there are no switchbacks, and cliffs are blocked.** [BASE · CONFIRMED]

- **Who says so:** the creator in three posts; two users; our recordings.
- **Evidence:**
  - The creator:
    - "unreasonably curvy" roads: "it was hard to get a regular right-angled road pattern even on a perfectly flat
      land" (105215836);
    - roads that prefer contour lines (isohypses): "not 100% sure if they look better/more correct" (104226049);
    - cliffs need "all map objects [to] interact with them", so they stayed unimplemented from 2023 to 2026 (90033685,
      117634240, 169696051).
  - Users: Moritz Hackl and Fotis Stamatelopoulos (90033685) ask for serpentines, because roads "appear to kind of
    ignore the terrain". The creator declined: slopes are "not steep enough".
  - Recorded: `Elevation.g` is called 1–5 times against 130–372 tracker steps (Critic-2 V3).
- **User impact:** roads look arbitrary on hills. Steep sites and cliffs are impossible, so the terrain is kept gentle.
- **Root cause:** tracker steering blends momentum with a field. There is no explicit grade cost.
- **Beat it:**
  - Build a cost field for arterials: slope by road class, water, obstacles.
  - Apply grade limits with switchbacks, and treat cliffs as barriers in the same field.
  - Let trackers keep doing the organic local fill.
- **Measure:**
  - The grade distribution per road class.
  - 0 % of arterial length above its class limit.
  - Straightness ≥ 0.9 for planned road classes on flat terrain.
  - Switchbacks appear wherever relief exceeds the limit.
- **Risk of over-correcting:** organic roads are loved (the `organic` tag). Don't engineer a village like a highway.

**VG-G6. The road topology has a single highway; crossroads are unsolved.** [BASE · CONFIRMED]

- **Evidence:**
  - Crossroads "turned out to be more difficult than I expected" and were postponed (84106820).
  - They then shipped with glitches, branches looping or being cut off (116745476).
  - Exactly one road tag is always selected (88749133).
- **User impact:** a village can't reliably sit at a real route junction.
- **Root cause:** the highway is one tracker walk; branches grow independently and are reconciled afterwards.
- **Beat it:** build the arterial graph first: N external connections with destinations, then the junction site, then
  the local fill.
- **Measure:** for an N-way request:
  - exactly N external connections;
  - the junction inside the core in ≥ 95 % of seeds;
  - 0 loops or cut-offs.
- **Risk of over-correcting:** keep the single-road village as a common case. The creator even judges a through-highway
  atypical (84106820).

**VG-G7. The wall is a convex hull added after the village; gates are ordinary houses.** [BASE + EVOLUTION hook ·
CONFIRMED]

- **Who says so:** the creator in three posts; four users; our recordings.
- **Evidence:**
  - The creator:
    - his open questions: wall first or village first, how many gates, what a wall should look like at village scale
      (90033685);
    - the wall cuts woods, which "doesn't make much sense", and fields overlap (104796798);
    - "no real gates … regular houses placed where roads cross the wall", and the JSON is "just another list of
      polylines" (105215836);
    - no keeps or ditches (613514 reply).
  - Recorded: `ConvexHull.ofSet` → a 32-segment cubic → 1 463 raster tests to push the wall off buildings (§4.9,
    Critic-2 item 5).
  - Users: Andonome (motte-and-bailey); Maseiken (settlements "that have expanded beyond their walls for farmland or
    dwellings", walled orchards); Roger Bron (a stake texture); Sylvain Donnet (the wall as a polygon).
- **User impact:**
  - Walls ignore terrain, water and defence.
  - Gates are generic houses.
  - A village can't have grown beyond its walls.
- **Root cause:** the enclosure is wrapped around the finished village, and a convex hull cannot follow a concave
  settlement.
- **Beat it:**
  - Plan the defensive line together with the settlement: a trace that follows terrain and water, gates on arterials,
    gatehouses as a building class.
  - Store the wall as a polygon entity with gates.
  - Allow extramural growth and a later wall → road conversion (the EVOLUTION hook).
- **Measure:**
  - 0 buildings intersecting the wall.
  - 100 % of gates on arterial crossings.
  - Wall-to-built-edge distance distribution reported.
  - Field overlaps = 0.
- **Risk of over-correcting:** routing a wall is a judgement problem. The creator on the Urban Places wall: "There's
  nothing special about the algorithms, but for a long time, all the results looked wrong" (139540343). VG's palisade
  is cheap and pretty, so keep a simple default.

**VG-G8. Fields and farmland are aesthetics-first; the creator calls the code "quite messy".** [BASE (town hinterland) /
VILLAGE-LATER · CONFIRMED]

- **Who says so:** the creator in four posts; three users.
- **Evidence:**
  - The creator:
    - fields are deliberately not historically accurate, and they adjoin only the main road (50688261);
    - more than one house in a field discards the field; bad shapes are discarded; the ring layout is "not entirely
      sure" (57968729);
    - "The part of the generator which is responsible for creating fields was (and still is) quite messy"; the
      sectors are "probably not a very realistic layout, but it looks nice" (88749133).
  - Users: Moritz Hackl (Rundling layouts, commons, gardens and paddocks near the centre, woods and meadows further out,
    38498864); Allen Varney (fields should push back the trees, 42521165); Quenten Walker (a barn beside the fields,
    37407181).
- **User impact:** the farmland doesn't express land-use logic, which is visible to anyone who knows villages.
- **Root cause:** the tiling is Voronoi cells of the land, recursively bisected along their oriented bounding boxes,
  with discard filters (profile-village §4.7). There is no land-use model.
- **Beat it:**
  - Use data-driven land-use rings or presets: gardens and closes → arable strips or open fields → pasture and meadow →
    commons → woodland.
  - Every field is reachable, and farmsteads sit beside their fields.
  - Keep the genre "sector" look as a style preset.
- **Measure:**
  - Land-use shares by distance band, per preset.
  - 100 % of fields have access.
  - The field aspect-ratio distribution per field system.
  - Overlaps = 0.
- **Risk of over-correcting:** the "fantasy village map" look is VG's brand. Keep a genre preset.

**VG-G9. Forests hug the houses because it "looks kind of more dramatic".** [BASE outskirts · CONFIRMED]

- **Who says so:** two users (five comments); the creator.
- **Evidence:**
  - Allen Varney, three times:
    - "creeping way close … I'd prefer larger (or configurable) clearings" (42144467);
    - trees "encroach on the village layout to a disturbing degree" (42521165);
    - "Trees > Some … the whole map is thickly blanketed" (50688261).
  - Eric Scheid: "gigantic trees" (42144467).
  - The creator: "In reality the trees are this close because it looks kind of more dramatic", with no clearing option
    (42144467).
  - Contrast: the creator on MFCG forests, "historically incorrect anyway since they were cut down around settlements
    for timber" (Reddit a1wx6h, `research/external/raw/wayback-old-a1wx6h-01fc604279.comments.txt`).
- **User impact:** settlements look swallowed, and the density control doesn't help.
- **Root cause:** fill-then-carve, with a fixed clearance around houses and roads (42521165 reply).
- **Beat it:** treat woodland as an outer-ring land use. Its clearance comes from agrarian use plus a user "wildness"
  control, with managed woods (coppice, orchards) nearer in.
- **Measure:** the distribution of house-to-forest-edge distances per preset; canopy fraction monotone in the control.
- **Risk of over-correcting:** drama is a legitimate style, and the `grove` tag is liked. Keep it as an option.

**VG-G10. Open space is one generic distorted circle.** [BASE · CONFIRMED]

- **Evidence:**
  - "I didn't actually know how village squares were supposed to look… in medieval villages they didn't really have
    squares (village greens were different)" (80494491).
  - Round squares are preferred over rectangular ones (89314043).
  - A 1 700-person map still has one small plaza (vg-ng-devlogs A2.2).
  - Recorded: a 44-gon disc (profile-village §4.5).
- **User impact:** every settlement has the same kind of heart. There are no greens, market places or churchyards.
- **Root cause:** the square is a circle placed at the density peak.
- **Beat it:** an open-space typology chosen by rule (green, market place, churchyard, widened street market,
  crossroads), sized by population and function.
- **Measure:** the open-space type mix per settlement class; the fit of open-space area against population, reported.
- **Risk of over-correcting:** one clear focal point makes the map legible. Keep it.

**VG-G11. Nothing exists beyond the frame.** [BASE · CONFIRMED]

- **Evidence:**
  - "roads, waterbodies end right where the original map ends" (37407181).
  - The creator: in City Viewer the missing "bigger world" "looks very silly". Stretching water edges works for seas
    but is "not very convincing" for rivers (45360377).
- **User impact:** exports and 3-D views look truncated; roads lead nowhere.
- **Root cause:** the generation domain is the display frame.
- **Beat it:**
  - Generate a context margin: roads continue to named destinations, rivers enter and exit, terrain continues.
  - Crop only for display.
  - Perilous Shores' "virtual towns" are a precedent (60165082).
- **Measure:** 100 % of roads leaving the frame have a destination; the export extent covers the frame plus the margin;
  no truncation in 3-D.
- **Risk of over-correcting:** extra cost. Keep the margin modest.

**VG-G12. The terrain grid is 128² for every map size.** [BASE · CONFIRMED (recorded) / impact PLAUSIBLE]

- **Evidence:**
  - The heightmap is 128 × 128 with 127² shading normals in every run (profile-village §4.2, §4.10; P1 loop counts).
  - Map sides are 300, 500 or 800 units (84106820).
- **User impact:** relief and hillshade detail per metre falls on large maps. The shading is a blurred 128² bitmap.
- **Beat it:** set terrain resolution in metres (≤ 4 m cells at town scale, for example), with multi-resolution or
  analytic sampling.
- **Measure:** cell size in metres is constant across map sizes; no visible blur at print scale.
- **Risk of over-correcting:** cost. VG's smooth relief already reads well.

### Group 3: Variety and control

**VG-V1. Population and size are outputs; early builds even produced zero-population villages.** [BASE · CONFIRMED]

- **Evidence:**
  - "villages with zero population", with the planned fix being to retry (35854256).
  - A user: "Oakfont, population 0" (Jog Brogzin, 35854256).
  - "you still can't request a village with a specific number of villagers" (56941736).
  - Recorded: 3.6–6.9 people per building; the settlement type is a threshold on building count (profile-village
    §3.3).
- **User impact:** "a hamlet of 80" or "a town of 1 200" can't be requested.
- **Root cause:** population is derived after the layout.
- **Beat it:** make target population or building count an input, and report the realised numbers. FTG decides
  buildings and people before geometry (_critic.md C12).
- **Measure:** realised values within ±5 % of target in ≥ 95 % of seeds; 0 empty settlements.
- **Risk of over-correcting:** random size is part of the fun. Keep "random" as the default.

**VG-V2. Controls are opaque or discontinuous, and tag resolution is silent.** [BASE · CONFIRMED]

- **Evidence:**
  - "I can't tell the difference between 'Some' and 'Many' trees" (Allen Varney, 42521165). A second complaint
    followed (50688261).
  - The creator: "Some" is random and "sometimes its result is indistinguishable from 'many'" (42521165).
  - "Setting this parameter to 1 and to 0.999 may produce very different results!" (169696051).
  - Recorded: a request for `tags=river` came back as `river,isolated` (profile-village R6).
- **User impact:** users can't predict what a control does.
- **Beat it:**
  - Controls with monotone, continuous, measured semantics.
  - Tags the generator adds are shown, with the reason.
  - A short description of each tag's effect, as in One Page Dungeon Generator's shift-click (52012066).
- **Measure:** each numeric control's output metric is monotone and continuous (no jump > ε anywhere); 100 % of
  auto-resolved tags are reported.
- **Risk of over-correcting:** having few controls is a strength ("I'm not sure that adding a bazillion of parameters to
  customize is a good idea", 53482923).

**VG-V3. The vocabulary for settlement character is narrow.** [BASE · CONFIRMED]

- **Who says so:** six users; the creator's own stance.
- **Evidence:**
  - Users asked for:
    - "dirty up the place … built around big rocks or large trees … Where are all the cows and horses kept? … wells …
      roof types … tree types" (scott2020, 426543);
    - separate biome, season and day/night drop-downs (RKB81Labs, 613514);
    - a ruin slider (Tubal, 91692684);
    - a manor or fiefdom (Varpilah Chase, 91692684);
    - Celtic roundhouse villages (Maezar, 50688261);
    - economic tags that change density, building size and alleys (T Mexx, Urban Places 141198168).
  - The creator avoids "assumptions about technological level, social organization" (38498864).
- **User impact:** villages differ in layout but not in era, economy or character.
- **Root cause:** there is no model of circumstances; tags are layout switches.
- **Beat it:**
  - Circumstances as data inputs (era, economy, lordship, biome, season, prosperity), with presets.
  - A feature catalogue held as data (pens, pounds, wells, mills, crosses).
  - Ruin as a continuous state (the lifecycle hook).
- **Measure:** presets produce distinct, measurable signatures (land-use shares, building-class mix); the ruin level
  gives a monotone ruined fraction.
- **Risk of over-correcting:** visual noise. The creator: "busier, but not noisier" (149496680). Keep the defaults calm.

**VG-V4. Random styles are weak.** [BASE, low · CONFIRMED]

- **Evidence:** the creator: "It's surprisingly hard to generate a colour scheme that looks good" (89314043). A user
  disagrees: "Random preset do not look that bad".
- **Beat it:** harmony rules plus contrast constraints.
- **Measure:** 100 % of random styles meet a minimum luminance contrast between the ground, road, building and water
  classes.
- **Risk of over-correcting:** minor.

### Group 4: Editing and regeneration locality

**VG-E1. The layout can't be edited; the state is only the seed.** [BASE · CONFIRMED]

- **Evidence:**
  - What can be edited: the name (38498864), the population text (56941736) and house marks (116745476).
  - A user asks for "a JSON output of a granular view of the data … a picking UI and query/edit API" (John Wheeler,
    169696051).
  - In sister generators: custom names can't be saved (Perilous Shores, 93887809); "the only thing about the place
    you can currently change" is its name (Urban Places, 145997186); saving and loading is deferred "before the
    architecture is stable (currently it is not)" (32650629).
- **User impact:** one bad house, road or field can't be fixed without rerolling everything.
- **Root cause:** the model is rebuilt from (seed, tags). There is no persistent document and no stable ids.
- **Beat it:**
  - A persistent, versioned document.
  - Edits recorded as events on stable ids.
  - Local regeneration of a region with its own sub-seed (the owner's EVOLUTION and ASSIGNMENT hooks).
- **Measure:** a locality test (an edit or local reroll changes only entities in its declared region; hashes equal
  everywhere else, 100 %); save and load round-trip identically.
- **Risk of over-correcting:** editing must not slow down or complicate the one-click default.

**VG-E2. Regeneration can be kept local only for trees.** [BASE · CONFIRMED]

- **Evidence:**
  - Tree coverage "can be rerolled without affecting the rest of a map" with Shift+T (50688261).
  - The URL carries a separate `trees=` value (profile-village §3.1–3.2).
  - Enter makes a new village; Shift+Enter rerolls the current one (426543).
  - `Random.reset` runs six times per generation (Critic-2 item 4).
- **User impact:** a user who likes the roads can't reroll only the houses, or only one field.
- **Beat it:** per-layer and per-region rerolls on derived sub-streams.
- **Measure:** rerolling layer L leaves every other layer byte-identical.
- **Risk of over-correcting:** none.

**VG-E3. "Hide" stands in for "not generated" and for scenario variants.** [BASE (LAYER hook) · CONFIRMED]

- **Evidence:**
  - Wilderness mode hides the buildings but leaves the village-shaped clearing (66544756 and its image 04).
  - Roads can be hidden while keeping houses, "for camps or wilderness maps" (121415691).
  - The `uncultivated` tag differs from hiding fields (71653886).
  - Perilous Shores workarounds: export → hide → export for GM and player versions (93887809); no "uninhabited" tag
    (109092851).
- **User impact:** traces of the hidden layer remain. Players' and GMs' versions need manual workarounds.
- **Beat it:** separate "regenerate without X" from "hide X", and add per-layer export presets (GM and player).
- **Measure:** "without X" leaves no X-induced artefacts; exports respect layer visibility 100 %.
- **Risk of over-correcting:** the cheap hide toggles are valued ("I also didn't even know I wanted a village free map",
  Brian Korten, 66544756). Keep them.

**VG-E4. There is no stable identity; house numbers follow creation order.** [BASE (ASSIGNMENT hook) · CONFIRMED]

- **Evidence:**
  - The order is "interesting, but maybe not the most convenient" (116745476).
  - Gates could be marked but towers could not, and marks were not stored in permalinks until 1.6.5 (116745476,
    117634240).
  - Towers are still props in the model (Critic-2 V16).
- **User impact:** "building 17" can't be referenced across sessions or versions, and the numbering is awkward in play.
- **Root cause:** ids are positions in a list.
- **Beat it:** stable ids for districts, lots and buildings that survive regeneration of other layers. Numbering
  schemes (by street, by district, by importance) become views over those ids.
- **Measure:** 100 % id persistence after unrelated edits; street-order numbering is monotone along each street.
- **Risk of over-correcting:** none.

### Group 5: Scale and performance

**VG-P1. Trees dominated cost for years, and tree size was compromised for speed.** [BASE · CONFIRMED]

- **Evidence:**
  - The creator:
    - "the smaller the trees, the more of them are there to process, the slower everything works" (42144467);
    - "Trees are still VERY slow" (50688261);
    - still "not fast enough" (80494491);
    - trees were off by default for years.
  - A user: "gigantic trees as compared to the buildings" (Eric Scheid, 42144467).
  - Recorded:
    - 546–751 crowns per map, each with its own gradient and six draw operations;
    - `ForestView` 1.5–40.8 ms;
    - `Bloater` 9.7 k–38.8 k extrusion steps (profile-village §4.6, §7.3, §8, R4).
- **Beat it:** instanced vegetation with levels of detail (area fill + edge crowns + instanced interior), with crown
  size in real units.
- **Measure:** ≥ 10 000 trees within a 16 ms frame; crown diameters in metres consistent with building sizes.
- **Risk of over-correcting:** none. VG's "Improved" three-zone forest look is the model to keep.

**VG-P2. Water extraction is the model's hot spot, with no linear-time method.** [BASE · CONFIRMED]

- **Evidence** (profile-village §5, R4, P1):
  - `createDeflection` takes 16.8–86.5 ms: about 945 inner steps per land cell (a window of about 31 × 31), 13.8–14.5 M
    steps per map.
  - `linkSegments` takes about 235 steps per link.
  - River carving is O(cells × segments): 1.0–1.5 M tests.
  - `Region.new` takes 13.6 ms without water and 45.6–143 ms with it.
- **User impact:** fine for one village; it would not scale to city maps or finer grids.
- **Beat it:** linear-time distance transforms, marching squares, and a segment index for carving.
- **Measure:** the water stage is O(cells), ≤ 5 ms at a 128² equivalent, scaling linearly with cell count.
- **Risk of over-correcting:** none.

**VG-P3. There is a size ceiling: hamlets and cities need different tools.** [BASE (fusion) · CONFIRMED]

- **Evidence:**
  - "villages with 15K population should be generated in MFCG" (38498864).
  - VG exists because MFCG's small towns fail: "The smaller the town, the less it resembles anything real" (35854256).
  - Recorded villages have 5–56 buildings (21–323 people); posts show up to about 1 700 people (vg-posts-b scale
    note).
- **User impact:** users switch tools across the size range, and the outputs don't match.
- **Root cause:** two generators built on different ideas.
- **Beat it:** one engine whose paradigms blend by size: road-first growth for hamlets, planned or partitioned cores
  for towns.
- **Measure:**
  - Generation time against building count: report the scaling exponent (target near-linear).
  - Hamlet outputs pass the same street and plot metrics that VG passes.
- **Risk of over-correcting:** VG exists precisely because MFCG's small towns looked wrong. Village feel must not be
  lost to a city machine.

**VG-P4. The runtime and the drawing path are heavy.** [BASE · CONFIRMED]

- **Evidence** (profile-village §5.1, §5.3, §7.2):
  - A cold load takes 2.45 s: shader compilation 356 ms, AudioContext 129 ms, fonts 242 ms.
  - About 85 % of all calls are graphics-engine plumbing, and there are 250 k–515 k `lineTo` calls per map.
  - Every curve is pre-tessellated.
  - The creator: "Generation itself is quite fast but drawing is not" (66544756).
  - H10.3: without water, drawing costs 2× the model.
- **Beat it:** a lean renderer that batches paths, keeps curves as curves and caches per group.
- **Measure:** time to first map < 1 s on reference hardware; render time and operations per map.
- **Risk of over-correcting:** none.

### Group 6: Rendering and style

**VG-S1. The frame is fixed, geometry is in screen pixels, and there is no zoom.** [BASE · CONFIRMED]

- **Evidence:**
  - A 1500 × 1100 viewport with a letterboxed 1100² square; all line widths in pixels (visual-spec §2.1).
  - No zoom anywhere in VG; a user proposed one in 2020 (38498864; H10.4).
  - Non-square maps "took much time to implement and debug it. Too much time" (541652).
  - Map rotation was removed to make non-square maps possible (71653886).
- **User impact:** no close-up scenes and no clean large prints. Aspect ratio and rotation were structural pains.
- **Root cause:** the map is composed in screen space.
- **Beat it:**
  - World units plus a camera.
  - Resolution-independent rendering with levels of detail: outline → wings and roofs → rooms.
  - Aspect ratio and rotation become camera properties.
- **Measure:** renders at three zoom levels and at 300 dpi on A2 with no artefacts; the model is identical for any
  aspect ratio or rotation.
- **Risk of over-correcting:** the one-page composition is a strength ("I would really like to have all the results of
  generation on a single screen/printed page", 38498864). Keep a print-first default frame.

**VG-S2. Style history churned, and print or round-trip users were underserved until presets arrived.** [BASE ·
CONFIRMED]

- **Evidence:**
  - Three styles were removed after a poll, and the "printer-unfriendliness" complaints produced the Outlines and
    Minimal presets (44111493).
  - Four separate style codebases had blocked SVG export (43602231). In that poll, users wanted monochrome styles to
    round-trip into Photoshop, Campaign Cartographer and Inkarnate.
  - Palettes were specific to one style (42521165).
  - The style gallery "doesn't look great" (635140) and is "inconvenient" (watabou-extra-b T30).
- **Beat it:** one renderer with a complete style schema, print, mono and export presets, and an in-app gallery.
- **Measure:** every style renders every entity type; print presets pass a greyscale legibility test (a minimum
  lightness difference between adjacent classes).
- **Risk of over-correcting:** VG already fixed most of this. Keep its schema discipline.

**VG-S3. Some visual controls are fragile.** [BASE, low · CONFIRMED]

- **Evidence:**
  - Pressure 1 against 0.999 (169696051).
  - Hillshade can look "plastic" (110526365).
  - Tree gradients "may make the rest of the map look somewhat not detailed enough" (169047704).
  - The Grass relief mode is "perhaps … not needed at all" (169047704).
  - Relief marks overlapped until the isolines were evened out (71653886).
- **Beat it:** continuous, bounded parameters with defaults chosen by measurement.
- **Measure:** a continuity test on every parameter; minimum spacing between relief marks.
- **Risk of over-correcting:** minor.

**VG-S4. Empty space is fought with a vignette instead of content.** [BASE · CONFIRMED]

- **Evidence:** "The main purpose of the spotlight is to fight the monotony of empty spaces … some kind of ground clutter
  would help more" (104226049); the vignette layer (visual-spec §2.4).
- **Beat it:** semantic ground cover from land use (tracks, hedges, pens, gardens, commons, scrub).
- **Measure:** ≥ 95 % of the map carries a land-use class; the share of "empty" area is reported.
- **Risk of over-correcting:** noise. Keep calm areas.

### Group 7: Labels and typography

**VG-L1. POIs were never shown on the map; annotation was the blocker.** [BASE · CONFIRMED]

- **Evidence:**
  - POIs were the reason VG was started (35854256).
  - "I don't know where to place their descriptions on a map without obscuring too much" (38498864).
  - Their names appear only in the browser console (42521165).
  - "I am sick and tired of implementing the legend in my every generator" (57968729).
  - Recorded: two POIs per village, console-only, in both 2026 builds (profile-village §4.11; vg-posts-a Critic-2
    item 4).
  - A user proposed pins with hover text, labels revealed on zoom, and the legend exported as a separate file (Allen
    Varney, 38498864).
- **User impact:** the promised "One Page Dungeon for towns" never arrived, so GMs annotate by hand.
- **Root cause:** annotation was treated as a legend problem on a fixed one-page canvas.
- **Beat it:**
  - An annotation layer: numbered markers placed without collisions.
  - A legend as a sidebar or separate sheet, hover in the app, and progressive disclosure by zoom.
  - Content drawn from building functions (C1).
- **Measure:**
  - 0 overlaps between labels or markers and key features.
  - ≥ 95 % of POIs labelled at print scale at ≥ 7 pt.
  - The legend fits the page or is exported separately.
- **Risk of over-correcting:** clutter. Keep the clean one-page look through progressive disclosure.

**VG-L2. There is no scale bar, no compass and no metric grid.** [BASE · CONFIRMED]

- **Evidence:**
  - None of these exist in VG (visual-spec §2.8).
  - The 1.6.8 grid is in "abstract units; I might replace them with meters or feet later" (169696051).
  - Users ask "What scale in miles …?" (Johnn & Jochen, 84106820) and "is a 300x300 map what 300 meters?" (Murlynd,
    613514).
  - A cyan grid for GM handouts (Heath Rezabek, 56941736).
  - Urban Places later added a scale bar and a 25 m grid (145997186): the creator's own later fix.
- **User impact:** GMs can't measure distance or movement.
- **Beat it:** a metric model, with a scale bar, a grid in metres, feet or squares, and a compass. Grid colour and grid
  export are separable.
- **Measure:** all three are present; grid pitch accurate within 0.5 %.
- **Risk of over-correcting:** keep them toggleable.

**VG-L3. There is only a title plate: no street, feature or field names.** [BASE · CONFIRMED absence / impact
PLAUSIBLE]

- **Evidence:**
  - Two `fillText` calls per map (visual-spec §2.8).
  - The only placement logic is choosing a corner (profile-village §7.5).
  - Contrast: MFCG's curved district labels, and Perilous Shores' curved labels with their stated failure modes —
    blind to holes, curving too wildly (109092851).
- **Beat it:** labels for streets, landmarks, waters and farms, with curved placement that is aware of holes.
- **Measure:** no collisions; 0 labels overlapping enclosed features.
- **Risk of over-correcting:** at village scale many names become noise, and name quality degrades with density (L4).

**VG-L4. The naming data has typos, and name shortening deletes syllables.** [BASE · CONFIRMED]

- **Evidence:**
  - `JUCTION` and "Nothern" are in the shipped grammar and word lists (profile-village §4.11, R6).
  - "Shrinking" cut `amelriceing` to Amelceing in 2 of 23 unique successful generations (H10.2).
  - The creator on Perilous Shores: toponyms are "pretty terrible. The more names there are, the more obvious it gets"
    (77490818).
- **Beat it:** original, curated grammars under quality checks (a spell-check step in CI), shortening that respects
  morphology, and better naming before adding more names.
- **Measure:** 0 spelling errors in content data; shortening never breaks a morpheme boundary.
- **Risk of over-correcting:** keep the charming compound pattern, with original content.

### Group 8: Data model, export and interoperability

**VG-D1. The JSON is non-standard and incomplete.** [BASE · CONFIRMED]

- **Evidence:**
  - Strict GeoJSON was abandoned for "GeoJSON-like" (37407181).
  - User Tom (37407181) wrote his own converter and asked for CityJSON. The creator: two formats would be "too much
    code to maintain".
  - The palisade is "just another list of polylines" (105215836). A user asked "A new kind of 'walls'
    (GeometryCollection/Polygon)?" and got no reply (104796798).
  - Height-maps are not exported, so City Viewer is flat (37407181).
  - John Wheeler asks for granular JSON and an API (169696051).
- **User impact:** users write converters; 3-D views are flat; walls are not areas.
- **Beat it:** one canonical model with standard exports: GeoJSON (RFC 7946, metric), CityJSON or glTF, layered SVG,
  and a terrain model. All are generated from one schema.
- **Measure:** exports validate against the official schemas; importing reproduces the model; the terrain model is
  present.
- **Risk of over-correcting:** maintenance cost. Generate the exporters from the schema.

**VG-D2. The model has no committed units.** [BASE · CONFIRMED]

- **Evidence:**
  - Map sides of 300/500/800 units, "The scale there is very... vague", with 0.7 m per unit only on export (84106820).
  - For a 300 × 300 map, "about 300 or maybe 200 meters" (613514).
  - The 1.6.8 grid is in abstract units (169696051).
- **User impact:** screen and export disagree. The creator's two answers differ: 300 units × 0.7 m = 210 m.
- **Root cause:** the design is in screen space.
- **Beat it:** metres throughout the model, with units declared in every export.
- **Measure:** 100 % of lengths stored in metres. Building dimensions fall in plausible real ranges; the historical
  corpus calibrates these later.
- **Risk of over-correcting:** none. The owner's tiebreaker favours precision.

**VG-D3. The state is only a seed; integration goes through GET parameters.** [BASE · CONFIRMED]

- **Evidence:**
  - Permalinks took "5 days" in VG (56941736).
  - "so far all the integration users requested could be implemented via GET method requests" (reply to BoJustBo,
    382428).
  - Perilous Shores permalinks don't save legend edits (watabou-extra-a §2.21).
- **User impact:** edits, marks and assignments can't be saved or passed between tools, and URL length caps what can be
  handed over.
- **Beat it:** a versioned document (save, load, import) alongside permalinks for unedited seeds, plus a library API
  for embedding.
- **Measure:** save, load and import round-trip identically; permalinks still replay.
- **Risk of over-correcting:** keep the simplicity of permalinks for sharing.

**VG-D4. There is no layered export for GM, player or VTT use.** [BASE (LAYER hook) · CONFIRMED]

- **Evidence:**
  - A cyan grid "so that the DM could read them but then photocopy it in B&W and have those features disappear"
    (Heath Rezabek, 56941736).
  - "hide from players but show to DM" (John Wheeler, 169696051).
  - The export → hide → export workaround (93887809).
  - SVG masks for every layer and OBJ export (Javin Bond, 103335095).
- **Beat it:** layers with per-layer export and visibility presets.
- **Measure:** a player export excludes GM layers 100 %; per-layer SVG groups and PNG masks.
- **Risk of over-correcting:** none.

**VG-D5. The data can't be nested across scales.** [STAGE-2/3 + BASE hooks · CONFIRMED]

- **Evidence:**
  - A user wants per-building objects "so a mansion can be dropped into a neighbourhood", neighbourhoods into cities,
    and cities into the realm map (Javin Bond, 103335095).
  - The Procgen Mansion hand-off passes only dimensions, later a shape, through the URL (66544756, 70917627).
  - "Most likely, it won't be possible to reproduce a district in Neighbourhood Generator exactly as it looks in MFCG"
    (70917627 comment).
  - Users repeatedly ask for NG-fidelity districts stitched into a city (58808794 and 59046807 threads).
- **Beat it:** a nested model (building ⊂ lot ⊂ neighbourhood ⊂ settlement ⊂ region) with ids and boundary contracts.
- **Measure:** a seam test. A neighbourhood regenerated in close-up matches its city-level footprint: street endpoints
  within tolerance and lots preserved.
- **Risk of over-correcting:** none at the data level.

### Group 9: Simulation and content (contrast with FTG)

**VG-C1. The content layer is thin and hidden.** [BASE · CONFIRMED]

- **Evidence:**
  - The grammar has eight building categories, but only two notes per village are generated, and they appear only in
    the console (profile-village §4.11).
  - Watermills would be "suitable existing buildings" marked as such (36199609).
  - Population is a printed number.
  - FTG by contrast decides buildings and people before geometry, from an 80-node dependency graph and 209 building
    definitions (_critic-ftg §2; _critic.md C12).
- **User impact:** a VG map says little about who lives there and what is there.
- **Beat it:** per-building function and occupancy from data tables driven by size and circumstances. A simulation
  module is optional. Functions are shown through symbols and labels.
- **Measure:** 100 % of buildings have a function; the function mix per settlement class stays within table tolerances
  (calibrated later).
- **Risk of over-correcting:** the creator deliberately avoids social assumptions. Keep content optional and
  data-driven; don't force FTG-scale simulation into one click.

**VG-C2. There is no lordship or land-tenure structure.** [BASE / STAGE-3 · CONFIRMED]

- **Evidence:**
  - Users: a manor or fiefdom (Varpilah Chase, 91692684); motte-and-bailey (Andonome, 613514); fortress layouts
    (Sandbox Construction Kit, 84106820); walled orchards (Maseiken, 613514).
  - The creator provides a palisade only (613514).
- **Beat it:** manor, church and demesne as building classes and land uses, drawn from circumstances.
- **Measure:** presets with a lordship produce a manor complex and its demesne in ≥ 90 % of seeds.
- **Risk of over-correcting:** not every village has a lord.

**VG-C3. Each map is a static snapshot with no history.** [BASE (EVOLUTION hook) · CONFIRMED]

- **Evidence:**
  - Maseiken: "settlements that have expanded beyond their walls" (613514).
  - Tubal: a ruin slider (91692684).
  - "Ruin" exists only as a roof style (91692684, 426543).
- **Beat it:** entity lifecycles (built, altered, ruined), and epochs driven by circumstances. Ruin becomes a state,
  not a style.
- **Measure:** epoch N+1 keeps ≥ X % of surviving ids unchanged; 100 % of changes are traced to a recorded event.
- **Risk of over-correcting:** history must not burden the one-click default.

### Group 10: UX and workflow

**VG-U1. Features are hard to discover.** [BASE · CONFIRMED]

- **Evidence:**
  - "How do you use the 'custom' palette - I didn't know anything about it" (Quenten Walker, 37407181).
  - "I did not know about styles" (Johnn & Jochen, 117634240).
  - In 2026: "is this a usable software currently? if so, where do I download?" (killjinx, 117634240).
  - The itch devlogs are teasers, and a user's request for the algorithm went unanswered (RKB81Labs, 613514).
- **Beat it:** discoverable menus and tooltips, an in-app gallery, an offline package, and documentation.
- **Measure:** a usability test measuring time to find style import and export (qualitative).
- **Risk of over-correcting:** keep the minimal interface.

**VG-U2. Integration means linking many small apps.** [BASE · CONFIRMED]

- **Evidence:**
  - A user asked whether all the generators would become one program (BoJustBo, 382428). The creator: "Developing one
    giant … application is significantly more difficult for me than several smaller ones".
  - A power user's wish list (Javin Bond, 103335095).
- **Beat it:** an embeddable library API with a clean boundary (the owner's roadmap), usable headless.
- **Measure:** a headless API run produces the same model and exports as the interface.
- **Risk of over-correcting:** keep small, focused front-ends.

## §3 What VG gets right: the restraint list (a rewrite that loses these is a regression)

1. **One-click speed and one-page output.** A regenerate costs 240–330 ms of JS including rendering, and the whole
   model 13.6–143 ms (profile-village §5). Everything fits on one printable page (38498864).
2. **Terrain and water tell one story.** Each water type is a primitive shape in the height field, extracted along one
   shared path, so "relief follows rivers" and contours never cross a shore (profile-village R1–R6; 89314043).
3. **One density field as the spine.** It fixes the village's centre, packing, extent, spotlight and enclosure
   (vg-ng-devlogs Part C 1).
4. **Organic tracker roads with a negative aesthetic constraint.** Driveways connect only some buildings, because
   connecting all "looked wrong, like modern suburbia" (104226049). The `organic` tag and road merging are also valued.
5. **Style as data.** Twelve styles over one seed prove the separation of style and geometry. The renderer survives
   having no fills and having no outlines (635140). Colour formulas are closed (profile-village §7.4). Selective
   outlining is "gorgeous" (Heath Rezabek, 169696051).
6. **Repair over rejection, where cheap.**
   - A trail truncated at a field moves its house to the new end and re-aligns it (57968729).
   - "Make the rejection unit small where rejection is likely": small fields where density is high (57968729).
   - "No empty roads" (36199609).
7. **Tag versus hide.** `uncultivated` differs from hiding fields (71653886). Layer toggles are the architecture:
   twelve of them (426543).
8. **An independent tree stream.** Shift+T and `trees=` reroll the vegetation without touching anything else
   (50688261).
9. **Descriptive tags feed the names.** Tags written back after generation drive `TAG?-rule` grammar guards, so names
   describe the map. The deck selector avoids repeated names (profile-village §3.1, §4.11).
10. **Soft lights and single-pass shadows.** Urban Places copied VG's lights (145997186). Overlapping shadows never
    double-darken (visual-spec §2.7).
11. **Deterministic permalinks within a build.** The Enter-successor seed is identical across browsers (R6).
12. **Honest, small, frequent releases** with named known defects (vg-posts-b §4). The ledger's "beat it" items must
    keep this cadence possible: data-driven presets and registries rather than monolith rewrites.

## §4 The 15 highest-value improvement opportunities from VG

Ranked by user value × evidence strength ÷ cost, BASE first.

1. **Seed-honest, stage-level robust generation.**
   - What: an invariant suite, a robust geometry kernel, and deterministic, bounded stage retries; never discard the
     whole map and never swap the user's seed.
   - Answers: R1–R5.
   - Measure over 10 000 seeds per tag set:
     - seed → map identity 100 %;
     - whole-map discards 0 (VG: 4 of 13 highway maps);
     - hard-invariant violations 0;
     - Boolean property tests pass.
   - Restraint: VG's speed and loose, grown look.
   - Scope: BASE.
2. **A metric model with cartographic furniture.**
   - What: metres everywhere; scale bar, grid in m/ft/squares, compass; print DPI.
   - Answers: D2, L2, S1; two users asking about scale; the GM grid request.
   - Measure: 100 % of lengths in m; grid accurate within 0.5 %.
   - Restraint: toggleable, one-page look.
   - Scope: BASE.
3. **Durable identity and versioning.**
   - What: version-stamped permalinks and documents; hash-derived sub-streams per stage and per entity; stable ids;
     golden seeds.
   - Answers: R7, E2, E4.
   - Measure: untouched stages byte-identical across releases; id persistence 100 %; per-layer reroll isolation.
   - Scope: BASE, plus the ASSIGNMENT and EVOLUTION hooks.
4. **An entity registry with complete, standard, layered exports.**
   - What: GeoJSON (metric), CityJSON or glTF, layered SVG, a terrain model, the context margin, GM and player
     presets.
   - Answers: R8, D1, D4, G11, E3.
   - Measure: registry round-trip 100 %; schema validation passes; layered exports honour visibility.
   - Scope: BASE (LAYER hook).
5. **A planned arterial skeleton on a terrain and water cost model.**
   - What: grade limits and switchbacks; bridges where the channel is narrow and straight; N-way junctions. Trackers
     keep the organic local fill.
   - Answers: R1, R2, G5, G6, G3.
   - Measure: 0 % of arterial length over its grade limit; bridge-angle error p95 ≤ 15°; N connections as requested;
     0 loops.
   - Restraint: organic curves.
   - Scope: BASE.
6. **Lots with a tunable streetwall, and buildings composed by class rules.**
   - What: frontage plots whose streetwall can be tuned; buildings composed from class-rule data tables, from hovel to
     manor (the STAGE-3 hook).
   - Answers: G1, G2, C2; the creator's own Urban Places diagnosis.
   - Measure: continuity index per street class; footprint-class entropy; class mix within ±5 % of the table; 100 % of
     buildings on lots.
   - Restraint: keep detached semi-rural plots and legible simple roofs.
   - Scope: BASE + STAGE-3.
7. **An annotation layer.**
   - What: POIs and landmarks with collision-free numbered markers, a legend as sidebar or separate sheet, street and
     water labels, progressive disclosure.
   - Answers: L1, L3, C1 (visibility).
   - Measure: 0 overlaps; ≥ 95 % of POIs labelled at print scale.
   - Restraint: one-page cleanliness.
   - Scope: BASE.
8. **A hinterland land-use model.**
   - What: data presets for gardens, strips or open fields, pasture, commons and woodland; farmsteads by their fields;
     water uses; forest clearance as a land use; the genre "sector" preset kept.
   - Answers: G8, G9, G3, R4, R6, S4.
   - Measure: land-use shares by distance band; 100 % access; 0 overlaps.
   - Scope: BASE (village later).
9. **Walls planned with the settlement.**
   - What: a terrain- and water-following trace; gates on arterials; gatehouse buildings; extramural growth and wall →
     road conversion.
   - Answers: G7, C3.
   - Measure: 0 building–wall intersections; 100 % of gates on arterials.
   - Restraint: a simple, cheap default.
   - Scope: BASE + EVOLUTION.
10. **Population, size and function as inputs.**
    - What: targets met within tolerance; per-building function tables; an optional simulation hook with FTG-style
      decisions before geometry.
    - Answers: V1, C1, C2.
    - Measure: ±5 % of target in ≥ 95 % of seeds; 100 % function coverage.
    - Restraint: random remains the default.
    - Scope: BASE.
11. **Editing and local regeneration.**
    - What: edits recorded as events on stable ids; per-layer and per-region rerolls; "without X" distinct from "hide
      X".
    - Answers: E1–E3.
    - Measure: locality tests (hashes unchanged outside the declared region).
    - Restraint: never slow the one-click path.
    - Scope: BASE.
12. **Resolution-independent, fast rendering.**
    - What: a world-unit camera with zoom levels of detail and print output; aspect ratio and rotation as camera
      properties; instanced trees; batched paths; fast start-up.
    - Answers: S1, P1, P4, G12.
    - Measure: three zoom levels and 300 dpi A2 without artefacts; 10 000 trees within 16 ms; first map < 1 s.
    - Scope: BASE.
13. **Hydrologically consistent water that can be queried for drainage.**
    - What: flow direction, monotone beds, widening downstream, a confluence width law, outfalls, and linear-time
      extraction.
    - Answers: G4, P2.
    - Measure: 100 % monotone beds; every river has an outfall; the water stage is O(cells) and ≤ 5 ms at a 128²
      equivalent.
    - Restraint: keep the cheap course-first spline and "relief follows rivers".
    - Scope: BASE (drainage/sewer hook).
14. **Character from circumstances, with predictable controls.**
    - What: era, economy, lordship, biome, season and ruin level as data presets; monotone continuous controls;
      auto-added tags explained.
    - Answers: V2, V3, C2, C3.
    - Measure: preset signatures are distinct; controls monotone; 100 % of auto-tags reported.
    - Restraint: "busier, but not noisier".
    - Scope: BASE.
15. **One engine across the hamlet-to-city range.**
    - What: road-first growth at small sizes blending into planned or partitioned cores at larger ones.
    - Answers: P3, G1; the reason VG exists at all (35854256).
    - Measure: hamlet outputs pass the street and plot metrics; near-linear time against building count.
    - Restraint: village feel must survive.
    - Scope: BASE (village product not precluded).

**One-sentence evidence verdict.** The weaknesses above are CONFIRMED. Each is quoted verbatim at source (creator or
user comments read in this lane) or counted on our recordings (H10); only G12's and L3's impacts are PLAUSIBLE. Every
"beat it" proposal and every numeric target is PLAUSIBLE design intent, still to be validated against a generated
corpus.

## Appendix H — raw harvest, per source (the evidence trail §2 is built from)

### H1. From `vg-posts-a.md` (14 Patreon posts 2020-04 → 2023-06, with the Critic-2 addendum)

- H1.1 Zero-population villages (35854256): planned fix = whole-map retry "until its population is larger than zero"; users joke "Oakfont, population 0" (§6). Population is an OUTPUT; "you still can't request a village with a specific number of villagers" (56941736) — only a textual override.
- H1.2 Water and "potential village area" generated independently → villages "weirdly detached" (creator reply, 36199609); user Allen Varney: villages "aloof from the water". Greenchurch exhibit.
- H1.3 Water quality self-assessed: rivers "more difficult than I expected … kind of works, but not perfectly" (36199609); "too many rivers are boring or weird" (38498864); islands "not very realistic, but … cute" (42521165); waterbody code optimized but "most computationally expensive piece … found too late" (50688261).
- H1.4 Earth-bounds bug: with a river, fields only on one bank or none (50688261), diagnosed as the land polygon being computed as one region (57968729). → multi-component land from day one.
- H1.5 Field "thorn" defects from the creator's own polygon-Boolean library (50688261).
- H1.6 Fields adjoin the main road only, not smaller streets — "That's how my algorithm works" (50688261).
- H1.7 Houses on top of fields "bother people" → kept as crofts → orchards (1.4.0); rule: >1 house in a field ⇒ field discarded (57968729). Bad-shaped fields (triangular/sectorial/not compact) discarded; holes hidden by making fields small where density is high (57968729) — the "make the rejection unit small where rejection is likely" trick.
- H1.8 "Lonely houses" = unplanned by-product; "too many of them and it looked odd"; fix distributional (fewer/longer trails) (57968729).
- H1.9 Piers "surprisingly tricky … expect occasional glitches" (38498864); after fixes piers still "spawned at odd locations" (50688261).
- H1.10 Crossroads of two highways attempted and abandoned as "more difficult than I expected" (84106820); single-highway model; `isolated`/`dead end` tags; creator thinks a through-highway is not the typical case.
- H1.11 Trees: "inconvenient middle scale" (42144467); "VERY slow" (50688261); off by default for years; "drawn faster, but still not fast enough" (80494491); trees vs tiny buildings (Eric Scheid ↔ "buildings being tiny!"); 3 of 4 tree methods deleted (1.4.0). "Some" vs "Many" trees confusion raised twice by the same user (42521165, 50688261).
- H1.12 Performance: generation "ridiculously long, up to a couple of seconds" → fixed; "Generation itself is quite fast but drawing is not" (66544756).
- H1.13 POIs never shipped: blocker is annotation — no room for a legend, "all the results of generation on a single screen/printed page", "sick and tired of implementing the legend in my every generator" (38498864, 57968729); still console-only in the 2026 builds (Critic-2 item 4).
- H1.14 All buildings rectangles → "boring floor plans" in Procgen Mansion (66544756); roundhouse request declined: "would look unnatural with grid-like road patterns" (50688261 comments).
- H1.15 Export: height map not exported → City Viewer flat (37407181); "nothing exists beyond the map border" — roads/water end at the edge (37407181); strict GeoJSON abandoned for "GeoJSON-like"; user Tom asks for GeoJSON then CityJSON and wrote his own converter; "two formats … too much code to maintain" (37407181).
- H1.16 SVG export first missed title, lights and non-default trees (44111493); fixed by a draw-list-style rewrite ~1K lines shorter (56941736).
- H1.17 Styles removed after a poll and "printer-unfriendliness" complaints (44111493); palettes are per-style schemas, so a palette for another style "won't cause much effect" (42521165).
- H1.18 Map rotation removed (1.3.0) to unlock non-square maps — a feature traded away.
- H1.19 Scale: 300/500/800 units, "The scale there is very… vague"; metric only on JSON export at 0.7 m/unit (84106820). "Large" might be removed — "villages with 15K population should be generated in MFCG" (38498864).
- H1.20 Genre over history: fields not historically accurate by design; rings round the centre "I don't think that happened much in real life … not entirely sure about this idea"; squares built although "medieval villages … didn't really have squares" (50688261, 57968729, 80494491).
- H1.21 Detail cascade / content refusal: trees imply fields/hedges and "assumptions about technological level, social organization" (38498864); a universal field generator is hard (fishing villages, modern tourist villages) (38498864 reply).
- H1.22 Permalinks took "5 days" in VG vs 5 minutes in PS (56941736) — determinism retro-fitted.
- H1.23 Wilderness = render filter; the village-shaped forest clearing remains (66544756/04) — hide ≠ regenerate.
- H1.24 Good patterns to keep: tree coverage rerollable alone (Shift+T, own stream); stroke width decoupled from geometric street width (80494491); tag vs hide distinction (`uncultivated` ≠ hide fields); repair rules (trail truncated at a field, house moved and re-aligned); "no empty roads".
- H1.25 User asks: cyan non-photo-blue grid/numbers for GM handouts (Heath Rezabek, 56941736); Rundling/vegetable gardens/woodland-further-out field proposal (Moritz Hackl, 38498864); 2-D castle schematics (84106820).
_(reading log: `vg-posts-b.md` (995 lines incl. Critic-2 addendum) — read in full.)_

### H2. From `vg-posts-b.md` (14 Patreon posts 2023-09 → 2026-09, VG 1.5.1 → 1.6.8)

- H2.1 Rivers rewritten from scratch in 1.5.2 because the 1.1.0 code was "a total mess" inside; old rivers were "slightly bent stripes", up to half the map wide; meandering forced narrowing ("wouldn't be possible without making rivers more narrow"); knock-on: rivers "too narrow to place piers" — accepted; "the way they do it is not perfect" (89314043).
- H2.2 Pre-1.5.2 glitch: contour lines running into the water; fixed by carving relief to the river (89314043; Critic-2: course exists before terrain).
- H2.3 Coasts "looked unrealistically straight (even if broken)" → coves/rarer headlands in 1.5.3; straight shores remain as degenerate cases (91692684).
- H2.4 Shipped known defects, each announced in its release post: confluence bridges "cross the water at wrong angles" (91692684); `crossroads` tag "much harder to implement than I expected" — highway branches "loop back to the original road or get cut off by secondary roads" (116745476); palisade cutting fields "much more complex and more glitchy … quite common to get fields overlapping each other" (104796798). Earlier: "odd road forks around bridges and docks" (fixed 1.5.3).
- H2.5 "Unreasonably curvy" roads bug: "hard to get a regular right-angled road pattern even on a perfectly flat land" (105215836); fixed together with a density-map rewrite that made villages denser — "not sure it's a good thing"; same seed no longer reproduces pre-1.6.1 maps (behaviour shift, unversioned in the URL).
- H2.6 Honest doubt about own changes: isohypse roads "not 100% sure if they look better/more correct" (104226049); Grass relief "Perhaps it is not needed at all" (169047704); hillshade can look "plastic" (110526365); tree gradients "may make the rest of the map look somewhat not detailed enough" (169047704).
- H2.7 Hairpins/serpentines asked for by two patrons (90033685 thread); declined: slopes "not steep enough"; cliffs would need them. Cliffs unimplemented 2023 → 2026 because "I'll have to make all map objects interact with them" (90033685, 117634240, 169696051).
- H2.8 Palisade: village first, wall second; gates are just houses where roads cross the wall; palisade + water "not supposed to be used" but allowed; wall cuts woods ("doesn't make much sense, but it looks more interesting"); JSON = "just another list of polylines" (not a polygon; a user's "GeometryCollection/Polygon?" left unanswered); exporting it as a city wall "would make it look really weird in the City Viewer"; exporter still self-reported 1.5.4 in 1.6.0 and lacked the palisade (104796798, 105215836 threads). Users ask for a stake texture instead of a smooth wall (105215836).
- H2.9 Road merging "quite crude" (104226049); driveways deliberately partial ("like modern suburbia" if all).
- H2.10 Fields: "The part of the generator which is responsible for creating fields was (and still is) quite messy"; sector fields "probably not a very realistic layout, but it looks nice. I may want to tone this effect down"; furrows "still straight and making them curved seems too difficult" (1.5.1) → curvilinear in 1.5.3 with "individual fields may look a bit odd" (88749133, 91692684).
- H2.11 Random style presets "don't look great … surprisingly hard to generate a colour scheme that looks good" (89314043); a patron disagrees.
- H2.12 `Pressure` 1.0 vs 0.999 "may produce very different results" — a discontinuous control (169696051).
- H2.13 Grid overlay in "abstract units; I might replace them with meters or feet later" (169696051); no scale bar or legend in any VG image; JSON is metric at 0.7 m/unit (Critic V17).
- H2.14 House numbering began as a debug feature; order "interesting, but maybe not the most convenient" (= creation order); gates markable, towers not (1.6.4, towers were props); marks not stored in permalinks until 1.6.5 (116745476, 117634240). Model still treats towers as props (Critic V16).
- H2.15 Rectangular houses are a consequence of the fake-perspective renderer: "Better buildings … more diverse in size and shape … I'll have to abandon the 'fake perspective' style" (117634240); non-rectangular houses, chimneys, dormers planned (169696051); Top-down option to become permanent (169047704).
- H2.16 Rebuild "from scratch" anticipated since 2024-12, not done by 2026-09; a patron asks for a preserved "benchmark build" (117634240).
- H2.17 Requests not taken up: a manor or small castle for a fiefdom (91692684); a ruin slider for partial ruination (91692684); stake texture for the palisade (105215836); granular JSON + picking UI + query/edit API for third-party tools (169696051, unanswered).
- H2.18 Empty space: spotlight exists to fight "the monotony of empty spaces"; "some kind of ground clutter would help more" (104226049).
- H2.19 Scale range: VG outputs 130 → 1 700 inhabitants (a small town with a radial-concentric web), not only hamlets.
- H2.20 Good patterns to keep: tags as a closed vocabulary with one mutually exclusive road slot; estuary = composition of river + bay; bridges "as right as possible"; bridges make villages "interact with a river"; shared user style gallery; view-side merging/driveways toggleable; "Hide population"; Arcana build sizes the map to the window.
_(reading log: `vg-ng-devlogs.md` (1 038 lines incl. Critic-2 addendum) — read in full.)_

### H3. From `vg-ng-devlogs.md` (21 VG + 6 NG itch devlogs)

- H3.1 Only 2 of 21 VG devlogs add settlement STRUCTURE (square+orchards, palisade); the layout core was "essentially frozen from 1.2.x onward" and the product improved through terrain, water and rendering (§A1 arc).
- H3.2 Non-square maps "took much time to implement and debug it. Too much time — after all a map of unequal width and height is not such a wild idea" (541652) — aspect independence retro-fitted.
- H3.3 Palisade shipped with no JSON export and no City Viewer support: "I was expecting bug reports related to palisades, but instead I found a whole chunk of functionality missing" (740285) — the write that survives one lifecycle path and ghosts another.
- H3.4 Square centrepiece vetoed only by a downstream water-overlap test (507254) — the density field is not water-aware; the square does not scale with population (1 700-pop Alberven still has one small plaza, 1667364).
- H3.5 Fortification scope deliberately minimal: "not planning to implement keeps, bridges, ditches or anything like that"; villages "quite often placed on top of (or next to) a hill" (613514 reply to Andonome).
- H3.6 Cross-generator integration only through GET parameters; "Developing one giant … application is significantly more difficult for me than several smaller ones" (382428 reply to BoJustBo) — payload bounded by URL length; no shared runtime.
- H3.7 User asks left unanswered: scott2020 (426543) — dirt/wear, villages built around rocks and big trees, livestock enclosures, wells, roof-type variety, tree-type/colour variety (wells/tree colours later shipped; livestock and wear never); RKB81Labs (613514) — the algorithm, separate biome/season/day-night drop-downs; Maseiken (613514) — walled orchards. jgkane (541652) uses VG output as a base for 3-D landscape work.
- H3.8 Style collection hosting: "It doesn't look great and I can't make the browser download files instead of opening them" (635140).
- H3.9 Elevation apparently not in the JSON (City Viewer shows a flat plane, 740285 image).
- H3.10 Good patterns to keep: 12 independent layer toggles (426543) = the layer architecture; `Ctrl+T` tree reroll and `Shift+Enter` reroll-current vs `Enter` new village (two RNG scopes); 12 styles over one seed prove style/geometry separation and a renderer that survives no-fill (`bw`, `subtle`) and no-outline (`minimal`) extremes (635140); selective outlining; NG's "substitute a landmark when a subdivision target is too small" fallback (419786).
- H3.11 NG notes relevant to stage 2: bent-cut bisection was "too slow and too unstable" for MFCG (315495); NG patches float on empty colour — no terrain, water or context (§B3.5).
_(reading log: `profile-village.md` (2 362 lines: body §0–§10, Appendix A call counts, Critic addendum, River-course addendum R1–R6, Critic-2 addendum, River-course addendum part 2 P0–P6) — read in full.)_

### H4. From `profile-village.md` (our recordings; build 19251041 unless marked 19365073)

- H4.1 Whole-map discard-and-retry on highway validation (`VillageScene.hx:275`): "The highway intersects itself", "The highway is terminated by water", "Unfinished bridge on the highway" (§1.2, §3.2). The retry uses a DIFFERENT seed (seed+1 or a fresh draw) and parks the failed seed in `&trees=`, so the requested seed never produces the map shown; `Blueprint.adjust` runs on the retried generations; a retry re-runs elevation + water (gen-2 of 05-04-05 shows the whole sequence twice). Only the highway is validated — the one globally-generated element the local processes cannot repair (§3.2 inference).
- H4.2 Tag resolution silently augments the user's request: `tags=river` came back as `river,isolated` (mandatory road slot filled) (R6); `Params.resolve`'s exclusion table is unknown (§10 item 7).
- H4.3 Cost (§5, R4): regenerate = 240–330 ms JS, of which the village model is 13.6–143 ms and the view 27–99 ms; water extraction dominates the model (`createDeflection` 17–87 ms; part 2: a ≈31×31-cell window per land cell, 13.8–14.5 M inner steps per map; `linkSegments` quadratic ≈235 inner steps per link); river carving is a naïve O(cells × segments) scan (1.0–1.5 M point–segment tests, 94 segments on the new build); `Region.new` is 10× cheaper with no water. ≈85 % of all calls are OpenFL vector plumbing — "the actual algorithm is a few hundred thousand calls" (§5.3). Cold load 2.45 s wall, dominated by engine start-up (shader compile 356 ms, AudioContext 129 ms, fonts 242 ms).
- H4.4 Fixed-resolution terrain: the heightmap is 128 × 128 and the shading normals 127 × 127 at every map size (§4.2, §4.10), so relief and hillshade detail do not scale with the map; shading is a stack-blurred 128² bitmap stretched over the map.
- H4.5 Fixed canvas: 1500 × 1100 with the map in the central 1100 × 1100 square and black bars left/right (R5) — only the Arcana build sizes to the window (vg-posts-b §2.38).
- H4.6 POIs: exactly two per village, console only (`Note.new` = 2), nothing drawn; `NumbersLayer`/`GridLayer`/`MapPlate` built every run and paint nothing by default (§4.11, §10 item 11).
- H4.7 Population is an output: pop/building 3.6–6.9 (mean 5.1), printed rounded to the nearest 10; settlement type (roadhouse/hamlet/village + riverside/coastal/island) is a threshold on building count computed in code (§3.3, R6).
- H4.8 Shipped content data carries typos (`JUCTION` in the grammar, "Nothern" in the tavern adjectives) (§4.11, R6); name "shrinking" deletes interior syllables to meet a length budget (`amelriceing` → `Amelceing`).
- H4.9 Build drift without notice: between 2026-09-21 (build 19251041) and 2026-09-25 (19365073) seed 3131 kept its name and POIs but went 29 → 24 buildings, 196 → 162 population, 51 → 94 river segments; the Enter-successor seed changed too (Critic-2 item 1, P0). No build/version stamp in the URL; old permalinks silently change.
- H4.10 Palisade = convex hull of the "populated" buildings' points → 32-segment cubic → pushed off buildings by 1 463 raster tests → gates where roads cross (3 accepted of 5 validated) (§4.9, Critic-2 item 5): a hull cannot follow a concave settlement, and the wall is a post-hoc wrapper, not a planned element.
- H4.11 Houses: rejection sampling along frontages (acceptance 63–82 %, ≈33–43 neighbour queries per candidate, `BinGrid` hash) (§4.8); `Region.removeBuilding` exists (a later pass deletes a house).
- H4.12 Trees: ≈1 200–1 600 candidates → 546–751 drawn (≈half rejected); each crown = 6 draw ops with its own linear gradient (694–1 496 `createLinearGradient` per map); crowns are ~40-vertex prototypes Chaikin-doubled twice (153–189 segments) (§4.6, §7.3). `Bloater` runs 9.7 k–38.8 k extrusion steps — second-hottest village code (§8).
- H4.13 Relief = 79–114 iso-level walkers emitting 1 008–10 714 identical 4-point marks per map in two ground colours (§6); no `bezierCurveTo` anywhere — every curve is pre-tessellated (§7.2).
- H4.14 Title placement picks among corners by measuring emptiness (`measureRect`, `layoutPlate`) — the only label placement logic in VG (§7.5).
- H4.15 Water bands are boundary strokes of width `W·k^1.5` masked by the water polygon (screen-space, palette-dependent band count 0–10) — a cheap stand-in for a distance field (§4.3); the three band strokes carry different segment counts (147/219/439) for unknown reasons (§10 item 4).
- H4.16 Piers: `Region.buildPiers` runs on every watered map, drawn only where the water is wide (0 on both recorded rivers, 2 on the island, 4 on a coast); piers reuse the bridge plank routine and cast no shadow (R3).
- H4.17 Good patterns to keep: model → view split with a closed palette formula (`outline = lerp(fill, ink, factor × pressure)`, §7.4); two tag layers — request tags vs descriptive tags written back by `Region.updateTags` and consumed by the name grammar (§3.1); `TAG?-rule` grammar guards; `DeckRuleSelector` draw-without-replacement for names; the separate `trees` stream; `Random.reset` = 6 re-seed points per regeneration (Critic-2 item 4); Enter-successor seed reproducible across browsers per build (R6); every water type authored as a height-field primitive + one shared extraction path ("relief follows rivers" for free).
_(reading log: `os-geometry.md` (945 lines incl. Critic-2 addendum) — read in full.)_

### H5. From `os-geometry.md` (2017 TownGeneratorOS geometry/utility layer — the ancestor of the substrate VG shares, per profile-village §8)

- H5.1 "Primitives are permitted to be fragile because the top level retries" (§1.4); corrected by Critic-2 item 1: only four explicit throws reach the retry; a failed `cut` (≠ 2 crossings) is a SILENT no-op, a `null` road is silently dropped, native errors escape. Unbounded retry + URL-pinned seed = possible infinite hang with no diagnostic (§1.4). VG inherits the pattern (whole-map retry, H4.1).
- H5.2 One global PRNG stream: "any change to the order or count of random draws changes every map for every seed" (§1.3) — rewrite verdict: named, hash-derived sub-streams. (VG has partly moved on: `trees` stream, 6 re-seed points; the build drift of H4.9 shows seeds still do not survive code changes.)
- H5.3 Numerical robustness ranking (§4): non-robust circumcentre (NaN on horizontal edges), sqrt in-circle test, exact float compares, identity-based topology with no tolerance merge, NaN-swallowing `sign`/`gate`, parameter-space DELTA tolerance. VG's own polygon-Boolean library produced field "thorns" (H1.5) — the same class of weakness.
- H5.4 Rewrite verdicts reusable for the base (§5): half-edge/indexed vertex arena instead of shared mutable points; Delaunator + robust predicates; Clipper2-class offsetting; real heap Dijkstra/A*; PCG/xoshiro sub-streams; bounded retries with deterministic per-attempt re-seed and surfaced failure. Keep: compactness as a shape gate, `fuzzy(f)`, per-edge inset by half the adjoining street width, pinned-vertex smoothing.
_(reading log: `watabou-extra-a.md` (1 161 lines) — read in full.)_

### H6. From `watabou-extra-a.md` (33 other watabou posts 2019-07 → 2022-04 — VG-relevant and cross-cutting items)

- H6.1 VG style poll (43602231): four styles were "similar but separate pieces of code … one of the reasons why there is still no SVG export"; users wanted non-Vivid styles to round-trip into Photoshop / Campaign Cartographer / Inkarnate (export-friendly monochrome), several changed their vote once palette JSONs were attached — argument for monochrome as a preset of one renderer.
- H6.2 "Village Generator doesn't create anything outside map bounds … if you see a bend of a river there it means there is only that bend … when you export such map and then import it in City Viewer this lack of a 'bigger world' becomes clearly visible and it looks very silly"; edge stretching works for seas, "not very convincing" for rivers; roads "easy", woods "probably harder" (45360377).
- H6.3 Building counter promised for NG and VG, stalled on "how to display the value because a window with a single number looks... sad" (64375271 comment).
- H6.4 Label count is a real performance limit: "placing a thousand text labels on a map visibly slowed everything" (PS, 60165082); PS dropped map labels for a legend because "everything got too noisy" (44405211).
- H6.5 Permalinks do not capture edits (PS legend changes lost) (§2.21); JSON save/load deferred "before the architecture is stable (currently it is not)" (32650629); user-placed castles blocked because the architecture "is changing constantly … people started asking about it more often" (34822131).
- H6.6 Strongest recurring request in that slice: MFCG districts at NG fidelity stitched into a whole city with matching roads across seams (58808794/59046807 threads) — watabou resists on visual-noise grounds (STAGE-2 relevance).
- H6.7 Single-stream fragility admitted: "apparently I missed a random generator call and from some point generation went differently" (PS, 41103311).
- H6.8 Design statements that bound "better": "apophenia works better than detailed simulation" at low resolution (41103311); maps "look better, but they don't provide more information per square unit" (59046807); "a whole city drawn like this … would look too visually noisy" (58808794); stroke fidelity deliberately traded for parameter diversity (60165082).
- H6.9 Transferable fixes from sister generators: generic draw-call → SVG export library (55050649; dashed lines exported as many solid segments, no text/gradients at first); tag-dialog UX — remembered, alphabetised, shift-click shows a tag's effect, collapsible (52012066); PS roads as a relative-neighbourhood graph with a connectivity guarantee and "virtual towns" off-map (60165082); "snap the simulation to the grid, never the drawing" (1PDG water, 55959636).
_(reading log: `watabou-extra-b.md` (996 lines) — read in full.)_

### H7. From `watabou-extra-b.md` (32 other watabou posts 2022-07 → 2026-08 — VG-relevant and cross-cutting items)

- H7.1 The creator's own critique of VG's house placement (Urban Places, 141198168): "The old method places rectangular houses at slightly varying distances from each other along a street (similarly to Village Generator). Even when these distances are very small (they can't be zero), gaps are visible where the street turns or bends. As a result, the old buildings fail to form a streetwall" — fixed in UP by wall-to-wall frontage-band plots; the VG method kept as a rarer "semi-rural" block type (141879891).
- H7.2 VG buildings are strictly rectangular, so VG "needs nothing" from straight skeletons (101173551); UP's non-rectangular plots force skeleton roofs; roof detail is scale-dependent (ridges good on medium maps, noise on large, flaws visible on small).
- H7.3 Style collections: VG's lives on itch and is "inconvenient to use" (T30); PS cannot save custom names — the GM/player workaround is export → hide → export (93887809); no "uninhabited region" tag, workaround = hide layers (109092851).
- H7.4 Economic/social character requests unanswered or declined: socio-economic neighbourhood classes (70917627 — "there aren't many tools for this: it can only choose different values for the minimum and maximum street widths, the average building and block size"), economic tags changing density/building size/alleys (T Mexx, 141198168).
- H7.5 Power-user integration wish list (Javin Bond, 103335095, unanswered): per-building objects in the JSON so a mansion can drop into a neighbourhood, neighbourhoods into cities, cities into the realm map; SVG masks for every layer; OBJ for shadow maps; layered UV-mapped OBJs.
- H7.6 Label lessons: PS curved labels are hole-blind ("a village inside a forest gets overlapped by the forest's label … quite difficult to fix"), sometimes curve too wildly, sometimes mis-draw (109092851); compass placed to avoid features but not the legend, so they "more often overlap each other than they don't" (68936414); "automatic notes placement is far from perfect" → draggable notes (78826680); toponyms "pretty terrible. The more names there are, the more obvious it gets" — a bigger vocabulary does not fix it (77490818).
- H7.7 "There's nothing special about the algorithms, but for a long time, all the results looked wrong" — UP city wall (139540343): wall routing is a judgement problem. UP added a scale bar and a metric grid (~25 m) (145997186) — VG still has neither.
- H7.8 Editability is bolted on late and expensive: in UP the name is "the only thing about the place you can currently change" (145997186); "Most likely, it won't be possible to reproduce a district in Neighbourhood Generator exactly as it looks in MFCG" (70917627 comment).
- H7.9 Transferable techniques: exposed-few → internal-many parameters with hidden randomisation (Sails 3 → ~20, 115426745); stencil rendering removes draw-order decisions (115606722); multi-colour parameters with index-0 as the aggregate-fill colour (149496680); `Outline` = lerp(object colour, linework) — VG's selective outlining came from PS (149496680); UP lights "soft like the lights in Village Generator" (VG's lights are the reference others copy).
_(reading log: `visual-spec.md` (743 lines) — read in full.)_

### H8. From `visual-spec.md` (our draw records and screenshots)

- H8.1 VG draws everything in screen pixels (round line widths 0.5/1/2/4/8/16; water bands 59.188 px …) on a fixed 1100 × 1100 square letterboxed in a 1500 × 1100 viewport — there is no world→screen transform to re-render at another resolution (§2.1).
- H8.2 "No grid, no compass, no scale bar, no north arrow anywhere in VG" (§2.8) — the grid arrives only in 1.6.8, in abstract units; MFCG and FTG both carry a scale bar (§5 table).
- H8.3 Draw volume (re-checked for this ledger): all eight VG paint logs are complete (`logDropped` = 0; 4 951–15 405 logged ops per map) — the cap hits in visual-spec §8 are MFCG metropolis and NG records, not VG. Per map VG issues 250 k–515 k `lineTo` and 63 k–131 k `moveTo` (profile-village §7.2); 2 linear gradients per tree (694 for 347 trees); ≈15 ops per building.
- H8.4 Unexplained render steps: a 128 × 128 procedural texture + `getImageData/putImageData` pass and an invisible `#ff0000` water mask; the beach band is not in the water op list (§2.3, §7 items 4–5).
- H8.5 Good patterns to keep: a single flat-colour shadow pass so overlapping shadows never double-darken (§2.7); roads-as-light-mask "settlement glow" (§2.4); content-aware title corner (§2.8); per-object jittered palettes with a dark partner ≈0.78× (§6 item 10).

### H9. Original comment threads — every "## Comments" section of the 28 `watabou-village` Patreon posts and the 21 VG itch devlogs (read in full, 31 KB)

Coverage note: Patreon API counts 114 comments on these 28 posts, 110 archived (35854256 and 38498864 each miss 2). Only 5 of the 21 devlog pages carry parsed comments; the VG itch GAME-PAGE comment board (the usual home of bug reports) was never archived (`research/devlogs/village-generator/` has no `_comments.md`, unlike dwellings/manor/procgen-mansion) — a real gap in the user-voice evidence, recorded, not filled (standalone rule).

User asks / complaints / workarounds, by theme (user × count; creator replies noted):
- Trees encroach / density control unclear — Allen Varney ×3 (42144467 "forest is creeping way close … I'd prefer larger (or configurable) clearings"; 42521165 trees "encroach on the village layout to a disturbing degree. I can't tell the difference between 'Some' and 'Many'"; 50688261 "I choose 'Trees > Some,' and the whole map is thickly blanketed"), Eric Scheid ×2 (42144467 "gigantic trees as compared to the buildings"; "back off the stroke on the trees" to reduce visual noise). Creator: no clearing option, "Some" is random and "sometimes … indistinguishable from 'many'"; added Shift+T reroll. Cross-reference: of MFCG forests the creator said "historically incorrect anyway since they were cut down around settlements for timber" (Reddit a1wx6h, `research/external/raw/wayback-old-a1wx6h-01fc604279.comments.txt`).
- Settlement ignores water — Allen Varney ×1 (36199609 "aloof from the water"; asks for docks, mills).
- Fields / rural economy — Moritz Hackl ×2 (38498864 long proposal: density↔plot size, Rundling, commons, vegetable gardens/orchards/paddocks near centre, woods/meadows further out; 80494491 orchards), Allen Varney ×1 (42521165 fields should push back the trees), Quenten Walker ×1 (37407181 farmhouses bigger, with an adjacent barn, beside rather than in fields), Jack ×1 praises houses-on-fields.
- POIs / labels — Allen Varney ×1 (38498864: Google-Maps pins with hover text, labels at closer zoom, legend exported as a separate file).
- Building shape variety — Maezar ×1 (50688261 roundhouses, whole Celtic villages; creator "I'll give it a try" — never shipped in any later changelog); scott2020 ×1 (426543 roof-type variety).
- Lordly / defensive structures — Varpilah Chase (91692684 manor or small castle, "how a fiefdom could look"), Andonome (613514 motte-and-bailey), Maseiken (613514 settlements expanded beyond their walls; walled orchards), Sandbox Construction Kit (84106820 overhead fortress layouts) — ×4 users; creator: palisade only, "not planning to implement keeps, bridges, ditches".
- Terrain-aware roads — Moritz Hackl, Fotis Stamatelopoulos ×2 (90033685 serpentines; roads "appear to kind of ignore the terrain"); creator: slopes "not steep enough".
- Scale — Johnn & Jochen (84106820 "What scale in miles …?"), Murlynd (613514 "is a 300x300 map what 300 meters?") ×2; creator: "very… vague", "about 300 or maybe 200 meters".
- Grid / GM-handout — Heath Rezabek ×1 (56941736 numbered grid in cyan so a B&W photocopy drops it for players).
- Data / export / integration — Tom ×1 (37407181 standard GeoJSON, then CityJSON; wrote his own converter), Sylvain Donnet ×1 (104796798 exporter still "1.5.4", palisade missing; "A new kind of 'walls' (GeometryCollection/Polygon)?"), John Wheeler ×1 (169696051 granular JSON + picking UI + query/edit API, hide-from-players/show-DM), BoJustBo ×1 (382428 one integrated program), jgkane ×1 (541652 uses VG as a base for 3-D landscapes).
- Discoverability — Quenten Walker (37407181 did not know how to use custom palettes), Johnn & Jochen (117634240 "I did not know about styles"), killjinx (117634240, 2026: "is this a usable software currently? if so, where do I download?") ×3.
- Content richness — scott2020 ×1 (426543: "dirty up the place", villages built around big rocks or large trees, dusty roads, where are cows and horses kept, wells, roof and tree variety); RKB81Labs ×1 (613514 separate biome / season / day-night drop-downs; asks for the algorithm — unanswered); Tubal ×1 (91692684 a ruin slider for partial ruination); Roger Bron ×1 (105215836 stake texture on the palisade).
- Fear of losing what works — Heath Rezabek ×1 (117634240: if VG is rebuilt "and lose features (like false perspective), would you archive … some sort of benchmark build"); rizen ×1 (110526365) values a generator that neither does "so little" nor "too much".
- Unclear — Rivaldo carmo (169696051 "fixed a natural barriers!").

Praise that marks what must NOT be lost: "adorable" villages and steady progress (Allen Varney), selective outlining "gorgeous … verisimilitude" (Heath Rezabek), gate shadows showing the arch (Steve Davies), wilderness mode useful between sessions (Brian Korten), "finally have a reason to start printing colour maps" (Dale Poole), "a one stop shop for every map … for FREE" (CitznSnips), merging roads and driveways (Roger Bron).

### H10. Our recordings, re-counted for this ledger (captures/village/*, console.jsonl + meta.json; no bundle opened)

- H10.1 Discard rate: 27 unique (build, seed) generation attempts across all eight VG captures; 4 were rejected by `VillageScene.hx:275` (15 %). All four are highway failures on build 19251041, and all four occurred on highway-bearing maps (`highway` / `dead end`): 4 of 13 highway attempts (≈ 31 %) versus 0 of 14 `isolated` attempts. Requested → shown: 801393661 → 1450476720 (intersects itself), 2087232953 → 1479091611 (terminated by water), 4243 → 204813853 (unfinished bridge), 9191 → 443658761 (intersects itself). CONFIRMED counts; the 31 % rate is PLAUSIBLE only (n = 13).
- H10.2 Name shrinking fired in 2 of 23 successful unique generations (`amelriceing` → Amelceing; `hunterborough` → Hunborough).
- H10.3 Model vs render cost on the six sampled (profile-pass) generations: with water the model (45.6–143 ms) exceeds the view (30.6–98.8 ms); without water the view (26.9 ms) is 2× the model (13.6 ms) — the creator's "Generation itself is quite fast but drawing is not" (66544756) holds only for waterless maps in the 2026 builds. Building count does not predict model cost (5-building Lost Pit 13.6 ms vs 19-building Agnuster's Rest 95.4 ms): water extraction does.
- H10.4 Resolution/zoom/export: canvas 1500 × 1100 with a fixed 1100² map square (letterboxed); all widths in screen pixels; no zoom control appears in any VG post, devlog or recording (a user proposes one in 2020, 38498864); PNG export resolution is not evidenced for VG (the 121415691 lower-resolution forest-export note is about MFCG).
