# Blocks — lane amendments-c/amend-pipeline-transitions-informal-character-dossier-calibration-light-authoring (seat T; opus standing in for the Fable seat)

Text before the first "=== " line is ignored by the assembler. Seat T (bundled pass c + d + e): home items 67, 70, 71, 72
and 76; referencing items 20 (h), 50, 68, 75, 77–82, 88 and 101. REPLACE blocks: §4.1 and §4.11 (single-seat / T-owned
subsections, written from the live text of design sha256 1c23190f…). Every other block is APPEND TO SECTION: §4.3, §4.10,
§10.3, §10.4 (single-seat, T); §4.6 (exception 7, after A's REPLACE), §4.7 (exception 3 extended, after B's REPLACE and
D's APPEND), §10.2 (exception 5, after D's REPLACE — the row types D's REPLACE names but leaves to "the paragraphs that
close this subsection"), PART III (exception 6, after D's REPLACE) and §4.5 (exception 4 — this file sorts BEFORE C's
`blocks-pipeline-walls-districts-hinterland.md`, so the §4.5 APPEND needs the two-pass assembly of route §C.9.2: every
REPLACE first, then every INSERT AFTER / APPEND TO SECTION; under the one-pass order C's §4.5 REPLACE erases it).
Report: docs/validation/amendments-c/amend-pipeline-transitions-informal-character-dossier-calibration-light-authoring.md.

=== REPLACE ### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker ===
### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker

```
S0 Blueprint ─► S1 Site ─► S2 Programme ─► S3 Siting, reservations, stage-1 boundary + trace ─► S4 Backbone ─► S5 Stage k (for k = 1 … K) ─────────────────►
 params, sub-    terrain, L0   roster demand,    centre(s) + plazas, lattice, gate picks,      L1 arterial     S5a boundary + trace + gates (k = 1: S3's trace committed;
 seeds, auto     water, river  plot quotas per   gate routes solved, field T, stage-1          graph: S3's     outer moats carved, k ≥ 2)
 features        decks,        stage × class ×   contour, gates, castle + its gate, trace;     gate routes     S5b main-road step (new primaries for stage k)
                 resources     band              L0 carvings + their decks + ponds; L1         + the rest      S5c growth of secondaries (regime rules; district scale in walled cores)
                                                 barrier faces (plazas, precinct, castle …)                    S5d capacity check (one bounded top-up)
     ─► S6 Districts, quarters, field pass 1 ─► S7 Wall strips + fortification lines ─► S7b Allocation + district claims ─► S12a Hinterland siting (no geometry)
        perimeter, grower over coarse faces,     setback / glacis lines, intervallum,     roster → districts, hinterland,     field system, outside sites and seeds,
        typing, quarters, FieldBands             gate plazas, castle paths, quays, piers  sky (staged); claims > 1 block;     decoration sites, crops (count-driven)
                                                                                          edge orchards → hinterland
     ─► S8 Infill (per district) ─► S9 Corridors (L2; districts + hinterland) ─► S10a Block allocation + field pass 2
        bent cuts, deep interior,                                                  ─► S10 (0) Shared-edge bands (eager, both sides
        rear lanes (L1); lane ends                                                      at once: each wall's band, setback, glacis, tower
        on bounding spines = seam portals                                               and gatehouse parts; margin bands, 2 m a side, on the perimeter and shared reservation boundaries)
     ─► per district in the derivation pool, and the hinterland unit on the generation worker, merged in lineage order:
        S10 Plots (per block; the hinterland's furlongs, lots, driveways, trails, orchards)
        ─► S10b Placement ─► S11 Site plans + footprints (per block) ─► S12b Greenery (own faces only)
     ─► S12c Character (town-wide, on the generation worker after the merge: each district's character vector, identity and band range, §4.5)
     ─► S13a Names + label candidates ─► S14 Display list ─► S15 Simulation (optional module)
        (S13b label placement is view data, computed per zoom stop with the display list, §9.2; never in the model)
```

* **Registration and order (COV-VG-VN-002).** Each stage registers a `StageDecl` (§4.12). The pipeline is the directed
  acyclic graph the declared inputs and outputs induce, topologically sorted with the stage id as the deterministic
  tie-break; the base's registrations yield exactly the order drawn above, and a cycle is a registration error caught at
  load. A later product may register a stage the base does not have (the village's density stage before its network,
  its palisade before its roads — PART III) without editing the pipeline. Each growth stage k runs S5a–S5d in order, and
  the same S5 runs incrementally for an epoch (§4.11). The **op form** (`StageDecl.txForm`, the transaction form of
  §3.3) is *callback* for S5c, S8 and S10, whose ops read the faces earlier ops made, and *declared* for S3, S4, S5a,
  S5b, S7, S9, S11 and an edit's inserted feature; every other stage (S6, S7b, S12b and the hinterland unit's stages)
  registers as *callback*, which is always safe.
* **Why this order.** (a) Water before roads, every carved water body included: harbour basins, canals, the castle and
  city moats and the hinterland's decoration ponds enter L0 at S3 with the decks their crossings need, so no street is
  laid on ground that later becomes water and no route meets water without a deck (FTG's order, `_critic.md` C12;
  GEO-19); the one later water body, an outer enceinte's moat, is carved by S5a through §4.11's carve path before that
  stage's secondaries grow, when it meets only the arterials through its gates (§4.4). (b) Programme before layout:
  buildings and people are decided before geometry (FTG's demand side), and geometry answers with capacity (O7).
  (c) Large claims before streets: S3's reservations (§4.2 S3 (12)) enter L1 as barrier faces before S4 commits any way
  (MFP-3); claims larger than one block, large institutions among them, are cut out at S7b before S8 cuts lanes
  (§4.5 S7b (3); FTG-3). (d) Walls before the streets they enclose: the first enceinte is one construction at S3
  (§4.2 S3), each later stage's boundary and trace are fixed in S5a, gates first, before its secondaries grow (§4.4), so
  a secondary never crosses a wall except at a gate and the intramural fabric inherits the wall's direction (MFCG builds
  its wall before its bisection; GEO-18, MFP-2; J-P3). (e) Districts and field pass 1 before infill (the infill's block
  band is the district class's, J-2); S7's wall strips before S8, so no lane is planned through a wall's band and setback;
  S12a before S10b, so the roster's farms, mills and quarries have outside sites to go to (FTG-7); greenery after site
  plans (it reads yards and claims).
* **The laziness contract (LC-2, FTG-1; J-P9).** A stage may run lazily for a scope X (a district, a block, a tile) only if
  its output for X is a pure function of eager upstream state and X's own sub-streams, it reads no other scope's lazy
  output, and it writes nothing outside X. Everything that decides the town's *content* is eager and town-wide: S2's
  roster, S3's reservations, S6's field bands, S7b's and S10a's allocations (S10a writes each district's band range,
  §4.5, item 72), S12a's hinterland siting, and S10's
  shared-edge step (0), whose bands lie on L1 edges two face sets share (§4.7; J-I9). The per-district stages S10, S10b,
  S11 and S12b — for every district and for the hinterland unit — may run lazily or in the pool; they read those records
  and their own sub-stream only and **write only inside their own faces**. S12b is held to the same rule: a district
  plants avenue and street-tree rows only in its own half-corridor strips, and an edge orchard is a hinterland allocation
  row built by the hinterland unit, never by the district (§4.9). So any order of derivation — viewer, worker, headless —
  gives the same model (CI: the derived-complete digest test, §6.5 (9)). S8 is eager: it runs in the generation worker,
  district by district in lineage order, and its only writes outside a district's own faces are the vertices where its
  lanes end on a bounding spine, each a `baseLane` portal in the shared `Seam` record (§4.6, II.1). S12c is eager and
  town-wide: it runs on the generation worker after the pool's merge, reads every district's placements and buildings —
  which the one-click path derives for every district (below) — and writes only the districts' derived character records
  (§4.5, item 72), so no derivation order changes it. S13a's names and label
  candidates are eager for every district, a name being drawn only in §6.3's cases; label placement (S13b) is view data
  (§9.1, §9.2).
* **The one-click first paint is the complete city LOD (SCL-4).** `generate({seed})` runs S0–S13a eagerly for every
  district and for the hinterland at city-band detail — every footprint with its wings and heights, every quarter and
  district label candidate, the hinterland's fields and the greenery faces — and S14 with S13b builds the city band's
  first frame. Laziness is restricted to what the city band does not draw: yard sub-part detail at district LOD, entrance
  glyphs, roof constructions and hatching, way names and addresses, pins below the city band, tree instances and crowns,
  stage-2 close-up detail and stage-3 compositions — each a pure function under the contract. No rung shows a preview;
  the first-map times and their knees are declared in §12.5 (J-R7). The model digest covers the eager model (§6.2).
* **Transactions: one level per batch (§3.3), listed per stage.**

  | stage | its batches, in order — each writes one level |
  |---|---|
  | S1 | L0: first the arena's outer ring — the frame plus its context margin (§3.2 (9)), one closed chain carrying the structural `margin` role on the arena's `Terrain` entity, so every L0 face has a boundary before any water exists — then water faces, shores and banks (a sea or river reaching the arena's edge shares that ring, one edge carrying both roles), islets, and every crossing site's two pinned `deck_end` bank vertices (§4.2 S1 (5)) |
  | S3 | L0: harbour basins, canals, the castle moat, the city moat, the decoration ponds, and the deck bank vertices of every channel it carves · then L1: the **map border** — the frame rectangle of §3.2 (9), one closed chain carrying the structural `border` role on the arena's `Terrain` entity, laid across land and water alike as a deck span lies across its water (no L0 edge is added, §2.2 rule 1) — and the land reservations as barrier faces (§4.2 S3 (12)), independent ops of one declared batch |
  | S4 | L0, only when F-ROUTE's extra-bridge rung fires on standing water: the new deck's two `deck_end` vertices by two same-level shore splits, nothing cleared (§4.2 S1 (5)) · then L1: the arterial graph's spines, inserted once, each span laid through the deck ends its route uses (those bridges become `built`) |
  | S5, per stage k | k = 1 — S5a L1: S3's trace with its gate vertices · k ≥ 2 — S5b L0, only when F-ROUTE's extra-bridge rung fires on standing water: two same-level shore splits before S5b's L1 batch (§4.2 S1 (5)); S5b L1: the main roads, picked on the stage's boundary (data, no batch); S5a L1: the trace with every arterial crossing as a gate; then an outer moat's carve batches (L1: each arterial's crossing made one straight edge between two deck bank vertices, its deck span; L0: the channel, with those vertices as `KernelTx.prepared`; §3.3, §4.11) · every k — S5c L1: growth, then L1: the between-stage prune and trim · S5d: a top-up re-runs S5a's arc and S5c on the rim, each L1 |
  | S6 | L1: the settlement perimeter chain, then district owners and `district_bound` roles (one batch) |
  | S7, per enceinte | L1: setback and glacis lines (the wall strips), the intervallum, gate-plaza claims, castle paths and inner-ward trace, quays, piers and moles |
  | S7b, per district | L1: district claims (`claimSubFace`) |
  | S12a, S10a, S10b, S12c | none — decisions and records (field pass 2 is a raster; S12c's character records, §4.5); the hinterland's geometry is written by its unit's S10–S12b |
  | S8, per district | L1: lanes, rear lanes and through-alleys with their T-junction ends |
  | S9, per district and for the hinterland | L2: `corridorUnion` |
  | S10 | L3, step (0): eagerly on the generation worker after S10a and before the pool's freeze, the shared-edge bands on both sides at once (§4.7 S10 (0)), ending with the rebuild of the L3 static partitions it touched · then per block, in the pool: claims, plots, alleys-as-faces and residue; in the hinterland unit's blocks, §4.9's recipe |
  | S11, per block | L4: footprints and yard parts (a row's party wall is the plot's shared L3 side line carrying the `party_wall` rows, §4.7) |
  | S12b, per district and for the hinterland unit | L3: park and grove layouts on its own reserved green faces and residue · then L4: yard-planting parts; avenue and street-tree rows write no plat edge (§2.7 `Greenery.along`) |
  | edits | one batch per operator and level, in §7.3's chain order (§7.1, §7.3); a multi-level conversion is a declared sequence of single-level batches (§4.11); decks as §4.2 S1 (5) |

  Every committed batch — in generation or in an edit — whose commit record changes a footprint face's rings (a
  formal-garden grid line or an orchard part's edge ending on a house wall, for instance) is followed by §2.6's carry for
  that building before the next batch (J-P47). L0 is written by S1, S3, S4 and S5b (F-ROUTE's extra bridge only) and S5a
  (an outer moat's carve, §4.4); L1 by S3 — the map border first — S4, S5, S6, S7, S7b and S8, in that order, and by no
  generation stage after S9 (J-P46). S10 never writes L1: a rear or back lane is decided by S8's deep-interior rule
  (§4.6), and a lane a user adds later is a `drawWay` edit through §7.3's S5 operator, whose tree scoping re-derives every
  finer level under it (GEO-25). Static index partitions are rebuilt as §3.3 states; S10's eager step (0) ends like a
  stage, rebuilding the L3 partitions it touched before the pool's freeze. Work limits count kernel operations, never
  milliseconds (§5.1 (5)).
* **The generation worker, the derivation pool and the hinterland unit (DEF-16; D-18).** The pipeline runs in one
  generation Web Worker; the tile worker and the main thread are §8.9's. The **primary configuration** at every rung adds
  a derivation pool of up to three workers (`min(3, hardwareConcurrency − 1)`) for S10, S10b, S11 and S12b, which run after
  the eager S10a allocation and S10's step (0). Each district runs on its own copy-on-write overlay over a read-only copy
  of the arena frozen after those two eager steps — its typed arrays and lookup tables and every non-empty level's static
  index partitions (L0–L3 at the one-click freeze, L4 too after edits), every dynamic grid empty, the partitions edits left
  dirty rebuilt first (§3.3 step 1; ≤ ≈ 15 MB at CITY) — and the overlays merge in district lineage order with a slot
  remap and their index partitions (§3.3's merge steps); any write outside a district's face set is `E_SCOPE`, and pool
  size 0 runs the same path in the generation worker. Addresses and lineage keys derive from lineage (§6.3), so no id
  ranges are reserved, and the pool makes no shared-edge writes (district boundary edges belong to L1 and L2, committed
  before S10). **The hinterland unit** — the hinterland pseudo-district's S10 (furlongs, outside lots, driveways, trails,
  woods, edge orchards), S10b (outside classes and, under §4.9's `fill` farm mode, the farm households), S11 (farmstead
  and outside site plans) and S12b (ring
  supply, ambient scatter, shoreline band) — runs on the generation worker while the pool runs the districts, on its own
  overlay over the same frozen arena; its faces are the hinterland's L2 blocks, disjoint from every district's, and its
  overlay merges with the districts' in lineage order under the pseudo-district's lineage; from the freeze to the merge no
  other writer touches the arena (J-P27). On the single-worker fallback the hinterland unit runs first, then the districts
  in lineage order. While a loaded document is verified (§2.9 step 3), every edit runs its S10, S10b, S11 and S12b in the
  generation worker by the pool-size-0 path (§3.3 step 5), so the pool freezes no copy while a pool worker holds the
  verification replay's model. Which configuration is primary at each size — the pool, or the single worker that is the
  pre-decided fallback (also on the low tier and in hosts that forbid extra workers) — is measured at M1 and M2b by
  §12.3's rule; pool size 0 gives the same model (J-P10).

* **Emulation-first defaults (item 23; J-A23.41).** Every stage rule of this part — its default, its extensions and
  every "always", "never" or "first … then" it states — follows §7.6's emulation rule, its reading rule for absolutes
  and its marker (J-A23.71); §10.2's `RelationRule.extension` and §4.7 S10b's `placement.extensionWeight` are the
  placement family's form of that marker.
* **The countryside is decided with the town and drawn after it (FTG's order; item 26).** S2 demands the hinterland's
  households and its food, fuel and timber with the town's (§4.2 S2; §4.9's farm table), S12a sites them once the town's
  districts are typed and its claims cut (S7b), and the hinterland unit draws fields and woods into the land the
  settlement perimeter leaves after S9 has committed the town's corridors — concurrently with the districts' pooled
  stages, which changes no output (§4.9; J-A26.41).

* **Elaboration by click — the trigger policy over the laziness contract (owner, 2026-09-26; item 28; J-A28.41,
  J-A28.42).** The contract above says what may be derived lazily; the **trigger policy** says when. It belongs to the
  viewer, not to the model: `elaborate` — `click` or `view` — is a per-user view key (§2.9); the key decides only the
  moment at which a pure rung gets derived, never its content, and the contract yields one model either way (CI: §6.5 (9)'s derived-complete
  digest, run over click orders too). `click`, the owner's choice, is the default: at city zoom the view draws the eager city LOD above —
  every footprint, MFCG's look at city zoom; a "plots only" cadastral view is a view option of §8.5, never the default —
  and derives nothing finer until asked. Clicking a neighbourhood derives its close-up (II.4) and raises the `wings` rung of
  its buildings to `current` (§2.8's elaboration record); clicking a building raises its `plan` rung to `current`,
  after `wings` when that is still absent — the rungs are ordered outline → wings → rooms → plan (§2.6), so the plan
  rung enters the lazy list above with §2.6's records, §6.1's streams and §8.5's draw. `view` derives every visible
  tile's rungs inside §12's budgets — §8.6's existing rule for `compose()`. **Saved, then stale until clicked:** a derived rung is kept
  (the elaboration cache, §2.9) and shown across zooms and sessions; a batch that changes one of its recorded inputs —
  a designation, an assignment, the band, the storeys, the wing rings or a spanned passage's face, the households, a
  table slice it cites, or a dossier event of items 18, 22 or 31 (§2.8's `ElaborationRecord.inputs`) — sets it `stale` (an unstored rung; a stored plan is re-cut inside the changing
  event instead, §7.3, J-A28.72); the cached result stays on view, flagged at every zoom stop with a change marker
  (§8.5), until the next click re-derives it from its canonical prior — committed state, never the cache (§6.2): the
  stored plan where one exists, else the as-built plan carried along §2.6's interior ladder (the wings rung reads the
  stored or as-built wings) — as a least-disruption mutation, never by a re-roll (§2.6, §7.3; J-A28.71); viewing never
  re-derives a `current` rung. **Pre-assigned plots:** the eager content decision — a plot's use,
  class, assignment and `Lifecycle.assigned` — is taken before any building geometry: town-wide by S2, S7b and
  S10a (the allocation records above), and per plot by S10b, which the first paint runs for every district ahead of
  S11; a plot the dossier or a user assigns is therefore assigned at the
  city level and, as the owner puts it, "just not generated" — its geometry follows on the click.
* **Declarations read ahead — a skeleton's bones (item 101; J-A101.41).** A skeleton file (§11.1), or any document whose
  log opens with drawn declarations, enters them as the log's creation prefix (§7.7 "One path") in their resolved form —
  a `points` form's shape derived at its dry run and stored resolved (§7.1). The base derivation reads that prefix ahead,
  each declaration by the stage that owns its subject and as a constraint of that stage — the form **Rebuild around my
  drawings** gives drawn constraints (§7.2), here with no rebase — as S2 already reads the prefix's assignments
  (J-A22.74): S1 takes the declared ground strokes and water (`setField` terrain, `drawWater`, `moveCourseKnot`) into its
  terrain and water; S3 takes the declared walls and gates (`drawWall`, `placeGate`) as the enceinte's pinned trace and
  its forced picks, and a declared road's outer end as a destination; S4 and S5b take the declared roads (`drawWay`) as
  fixed routes; S6 seeds a district at each declared quarter (`quarter`, `drawBoundary`) with its declared kind and grows
  it to the declared boundary; S10b takes the declared places (`placeAt`, `assign`) as positive placements. The prefix's
  events keep their log positions 0…k, flagged `creation` as the prefix's assignments are, and their fold inserts nothing
  the derivation has already made (§7.4), so the town grows around its bones and one seed replays it byte for byte. A
  declaration a stage cannot honour is refused at its dry run with the reason and the closest alternatives (item 20 (g));
  a declared thing is held — no later derivation or scoped re-roll moves it (§7.2, item 101's R13).

=== APPEND TO SECTION ### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph ===

**Trade flow — the gates' and the ways' trade weights (items 72 and 77; J-A77.41).** `TradeFlow` is declared and derived
here: after S4 at generation, and again at each epoch (§4.11), from the circumstances' trade slice
(`CircumstanceSlice.trade`, its partners, their bearings and modes and their fill, §7.7 item 2) with the gates' and roads'
geometry. It is a derived record — `Document.derived.tradeFlow` (§2.9) caches it, rebuilt on load, never canonical — and
it draws no random number.

```ts
interface TradeFlow { gates: { gate: Id; weight: number }[] /* with harbour, Σ = 1 */; harbour?: number /* the water partners' share, when the town has a harbour */;
  dominantBearingCdeg: Cdeg /* the weighted circular mean of the partners' bearings: where the settlement's trade mostly flows from (item 72 (a)(3)) */;
  ways: { way: Id; weight: number }[] /* each way's trade weight, below; absent ways weigh 0 */ }
```

* **Partners to gates.** A `road` partner goes to the land gate whose bearing lies angularly nearest its bearing (ties by
  gate id) — the gate S3 (4) picked for that bearing; a `river` or `sea` partner goes to the harbour, else to the water
  gate on its river, else to the nearest land gate. A gate's weight adds up its partners' weights, normalised with
  the harbour's to one; this is the **bearing's trade weight** §4.2 S3 (4) and (12) read. With no partner every gate
  weighs the same and the harbour nothing.
* **Ways.** A way's **trade weight** adds up the weights of every gate, and of the harbour, whose S4 route to the plaza
  (§4.2 S3 (5), (13)) follows it: the main streets in from the busiest gates carry the most and a way on no such
  route weighs 0. §4.5's trade-position component and its gate and main-street kernels read these weights (item 72).
* **Without a dossier** the blueprint's external bearings and the intent's trade setting fill the slice (§7.7 item 2), so a
  standalone town has the same record; a user's gate or road edit re-derives it with the geometry.

**Two-point roads (item 101 (i)).** A `drawWay` declaration in its `points` form — two points and a class, or more points
for a free-hand line (§7.1) — is routed here at its dry run: each consecutive pair of points is joined by this router on
the lattice with the class's costs and `existingFabricCost` (a route prefers existing streets and plot lines), each point
snapped to the nearest lattice node or existing way vertex (the author's snap, §9.5, resolves the points first); the chain
is smoothed and inserted as S5b inserts a main road (§4.4), and a stretch across water takes a deck by §4.2 S1 (5)'s
crossing rule — its preview draws a bridge there. The dry run returns the derived route as the declaration's resolved
shape, stored resolved (§7.1), its pinned nodes the handles; no later derivation moves it (item 101's R13).

=== APPEND TO SECTION ### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims ===

**Neighbourhood character, identity, the three dials and the band range (item 72; owner: "neighborhoods …
more or less defined by the mix of assigned lots within them and how they correlate to relevant political powers as well
as the spatial flow of trade … This assignment also helps to assign names to neighborhoods").** A district's kind (Typing,
above) is what the stages read to build it; its **character** is what it has become — derived from what was placed in it,
never assigned once. This paragraph is the one statement of the character vector, the quarter identities, the three dials,
the band range, the pressure and the partition. The records are §2.5's (`CharacterVector` — this derived profile, the one
meaning of "character"; the per-district input once also called character is `DistrictIntent`, §7.7; J-A72.41 —
`District.identity`,
`District.bandRange`, `District.pressure`, `District.nameHistory`) and §2.7's (`Institution.powers`); the row types are
§10.2's; the inputs are §7.7 item 2's circumstance slices — the dossier's facts, or the blueprint's own as their stand-in
(item 20 (h)).

1. **Value, not volume — significance (J-A72.45; owner: "each church individual value is greater than the lodging").**
   Every count, share and dial below weighs a placed instance — a use (workplace, shop, institution) or a residential
   building — by its **significance** `σ = BuildingClassRow.significance × rank × size × patronage`: the class's base value
   (a cathedral far above a church, a church far above a lodging house, a guildhall above a workshop; houses, lodging and
   common shops low — our own rows, §10.2), × the institution's rank (1 unless its institution row or the dossier gives
   one), × its size (its footprint area over its class's median footprint, clamped to [0.5, 2]), × its patronage (1 + the
   dossier's wealth or rank of the institution when it gives one, clamped to [1, 2]). So many lodgings never outweigh a
   few churches.
2. **The character vector — five components, derived (item 72 (a); `CharacterVector`, §2.5).** Written by **S12c
   Character** (§4.1: town-wide, on the generation worker after the pool's merge, before S13a) and by each epoch's
   character step (§4.11): a pure function of the placed lots, the slices and the geometry, draw-free, recomputed on load
   and equal on recomputation (J-DET-12). (1) **Lot mix** — for each class family `f` (a family is a `tags` value of the class,
   one of the families §10.2's identity rows name — religion, craft, trade, lodging, residential, military,
   administration, harbour, noxious, learning, arcane, crime …): `mix[f] = Σ_(i∈f) σ_i ÷ Σ_i σ_i` over the district's
   instances. (2) **Political alignment** — for each power `p` of the powers slice: `powers[p] = Σ_i σ_i · w_i(p) ÷ Σ_i σ_i`,
   `w_i(p)` the partition weight of (7). (3) **Trade position** — `trade` = the district's frontage length on each way × the
   way's trade weight (§4.3's `TradeFlow`), summed and divided by the town's largest such sum (the busiest district 1);
   `tradeBearingCdeg` the weighted mean bearing of the gates whose routes cross it. (4) **Economic role** — for each
   sector `s`: `sectors[s] = Σ_(i∈d) σ_i · w_i(s) ÷ Σ_(all i) σ_i · w_i(s)`, the district's part in the town's weighted
   presence of that sector. (5) **Relations** — `mainRoad`, the share of its frontage on `through` and `primary` ways; and
   `anchors`, the significant institutions (σ ≥ `character.anchorSigma`, 5) within `character.anchorRadiusM` (400 m) from its
   boundary, each weighted `σ_anchor × (1 + c) ÷ (1 + distance ÷ radius)`, where `c` is the district's contribution share —
   its share of the anchor's suppliers (plots at the tail of the anchor's supply edges, §10.2) and of its members (the
   `Membership` records of the anchor's power housed in the district, §2.7, when the module has materialised them, else 0).
3. **Three distributions (item 72 (d′); `BuildingClassRow.distribution`, §10.2).** **`district-defining`** — a class that IS a
   district (a red-light district, the slums, a foreign quarter, a guild district: dossier institution kinds). Each dossier
   instance claims ONE district: S6's typing places the defining instances first — they are known before placement, S2's
   fixed dossier rows (§4.2 S2) — each taking the not-yet-claimed district that its identity row's kind (§10.2) scores
   highest by its relation rows (a
   red-light district near the docks, the gates and the inns; the slums at the poorest edge, by the `shanty` kind's rows),
   one district per instance, and two instances in one district only when no unclaimed district scores above zero
   (reported). The instance shapes its district without filling it: S7b allocates it the ordinary demand for its band with
   the defining class's share raised to its identity row's `targetShare` (§10.2; more brothels — still a smith, an inn
   and houses); its
   band, granularity, greenery and lighting rows are the defining kind's (the slums: the squalid band through the kind's
   `characterOffset`, and §4.7 S11's cluster rows, item 70); its identity's source is `dossier`. A dossier that adds one to a
   town already drawn converts the district whose character vector lies nearest the kind's identity row toward it by item
   22's least-disruption mutation, as a dossier event at §4.11's step (e) (§7.7 item 5): its S6 kind re-typed, the
   allocation's delta placed in S10b's least-disruption order, nothing re-rolled. **`dispersed`** — every ordinary class
   (smiths, alchemists, chapels, bakers, inns, shops, houses): S7b (1) spreads it over all districts by capacity and
   affinity with a controlled random share of the affinity score (`dispersal.random`, 0.3; drawn on `alloc.district`, no
   new concern), so some districts hold several, some one, some none, and no rule gathers a dispersed class into one
   district (J-A72.46); FTG's sub-district clumping (S7b (2), COV-FTG-E02) stays the parity presets' behaviour and a
   cluster-tag option inside one district. **`singular`** — a one-off anchor (a cathedral, the palace, the university,
   the great market): sited by its own rules (S3's reservations, S7b (3)'s claims, its hard rows), weighing on its district
   through its σ and on the districts around it through (5)'s anchors.
4. **Quarter identities (item 72 (d′); `RosterTables.quarterIdentities`, §10.2).** Each row is a σ-weighted count of class
   families with a threshold (a count, or a count per hectare for the rows that scale with the district), an optional band
   condition, a priority and a `singular` flag — the religious quarter: chapels and churches weight 1, a cathedral or a great
   temple 3, threshold 3, so three churches or one cathedral alone suffice. S12c gives each district the highest-priority
   row whose threshold and band condition it meets (a `singular` row goes to its highest-scoring district only); else its
   **dominant component** — the family of its largest `mix` share, or the sector of its largest `sectors` share when that
   exceeds `identity.dominantMin` (0.35) — named by that family's or sector's row; else a **plain residential identity** by
   its band ("the modest quarter"): an identity, never an S6 kind, so typing stays feature-named and no district is zoned
   by class (J-P1 refined, J-A72.42). A dossier-declared identity — a district-defining instance's, or the kind bias of a
   naming claim matched to the district (§7.7, item 82) — wins over every emergent one. `District.identity` records the
   row, its source (`dossier`, `emergent`, `dominant`, `plain`) and the week it was taken (§2.5). The kind stays the
   typing the later stages read; the identity names and describes the district (§10.4; J-A72.42).
5. **The band range (item 72 (d‴); owner: "this neighborhood prosperities defines the bounds (floor, and ceiling) of what
   any building inside of it can be").** S10a writes each district's `bandRange = [floor, ceiling]` (§2.5) from its
   area-weighted mean pass-2 value by `RosterTables.bandRanges` (§10.2: a row per band of the band set, split at the band's
   middle — the rich band's upper half the rich band alone; a prosperous district spanning the middle band to rich, item
   71's mix; a poor one squalid to modest), so S10b and S11 read it before they place and build. Every prosperity-driven
   state of a building inside the district stays in the range: the class a new build or a re-designation takes (item 71's
   weights outside it are 0, the rest renormalised, §4.7 S10b), the template row's band it reads (a band outside the range
   read at the range's nearest end), its condition and upkeep, its extensions (the mutator's adapt and add steps, §4.7
   S11), its occupants' band (S7b (1) allocates a district no household whose band lies outside its range; the range always
   holds the district's own band) and its interior-ladder rung (§2.6, read at the occupants' band). Item 31's geometry
   floor still keeps a standing shell — a mansion in a district that fell keeps its geometry, while its condition,
   occupants and interior are bounded by the range (subdivided, worn). No informal cluster and no hovel goes up in any
   district whose range excludes the squalid band (§4.7's *Informal clusters*).
6. **The three dials (item 72 (d″), (d4)).** Driver terms of the prosperity field with declared weights, never replacing the
   other drivers, each moving a building's prosperity-driven state within its district's range and clamped there (5); they
   read the **applied** standings and shares of §4.11's hysteresis (`PowerStanding.appliedStanding` and the sectors'
   applied shares, §7.7 item 2). With `N` the powers of the slice, a power's amplification is `A_p = N × appliedStanding_p`
   (1 at an even standing). **The institution dial:** every class and infrastructure element answers to its powers
   (`BuildingClassRow.powers`, `RosterTables.powerLinks`, §10.2; the dossier's `Institution.powers` override, §2.7); an
   instance's term `dial.institutionWeight × Σ_p w_i(p) × (A_p − 1)` scales its institution attractor kernel in field pass 2
   (the kernels S10a adds, above) and steps its condition by one step per `dial.conditionStep` of the term, and a rising
   power's institutions extend within the range (the mutator's adapt budget). **The quarter dial:** a district whose
   identity row names a power (`QuarterIdentityRow.power`) adds `dial.quarterWeight × (A_p − 1)` to its `characterOffset`
   in pass 1 — at generation only for a dossier-declared district-defining quarter (known at S6), for an emergent identity
   from the next epoch on (J-A72.40). **The economy dial (owner: "the market share affects their application"):** a
   sector's amplification is its applied share over the even share, `A_s = S × share_s` (S the sectors the slice lists: an
   even mix gives every `A_s` = 1), an instance's the blend `A_i = Σ_s w_i(s) × A_s` of (7); its term
   `dial.economyWeight × (A_i − 1)` scales its class's driver kernel in both passes (a trade-led town lifts its markets,
   warehouses and quays; a toll-led one its gates, bridges and roads) and steps its condition as above — so a 40 % sector
   amplifies its classes twice as strongly as a 20 % one, an even mix changes nothing and there is no term for rank
   (J-A72.49); the same shares shift the roster's town-level character (§4.2 S2, §10.2; J-A72.43). **Trade as a driver:** the gate and main-street kernels (above) scale by `1 + trade.kernelScale` × their
   gate's or way's trade weight (§4.3; `trade.kernelScale` 1.0). The map reads the make-up and the standings; it never
   models the economy or the powers (D-10, D-32; item 20). Defaults (our own, calibratable): `dial.institutionWeight`
   0.10, `dial.quarterWeight` 0.08, `dial.economyWeight` 0.10, `dial.conditionStep` 0.05, each an `extension` that the
   parity presets set to 0, as they do `trade.kernelScale`.
7. **Shared buildings are partitioned, never doubled (item 72 (d5); J-A72.48).** An instance serving several powers or
   sectors receives one amplification: its weight toward power p is `w_i(p) = link_i(p) × appliedStanding_p ÷ Σ_q link_i(q)
   × appliedStanding_q` over the powers it serves (`link` its class or override weights), toward sector s likewise with the
   applied shares; each set sums to one, its amplification is the weighted blend of theirs, never their sum, and its
   contributions — its σ in (2)'s mix, powers and sectors and in the pressure — split in the same proportions. A guild
   chapel serving the craft guild and the church counts once, split by their relative strength.
8. **The pressure (item 72 (d‴); J-A72.47).** What a dial or any building-specific amplifier would push past the range is
   kept: at each epoch's character step (§4.11) `District.pressure` (§2.5; in the model digest; written only by epochs)
   becomes `pressure.retain × pressure + Σ_i σ_i × excess_i ÷ Σ_i σ_i`, `excess_i` the amount by which instance i's
   amplified value would lie above the ceiling band's upper cut (positive) or below the floor band's lower cut (negative),
   `pressure.retain` 0.5; the next epoch's pass 1 adds `pressure.weight × pressure` (0.5) to the district's
   `characterOffset`. So a thriving institution lifts its neighbourhood over epochs until the district's value crosses its
   cut past the hysteresis (above), the range moves and the buildings may follow by §4.11's ladder. No brush writes it;
   with no epoch it is 0.
9. **Over time (item 72 (b)).** At each epoch the character step recomputes the vector, adds the clamped excess to the
   pressure and re-derives each identity with hysteresis: a district takes a new identity row only when that row's
   weighted count exceeds its threshold by `identity.hysteresis` (20 %) while the held row's has fallen below its own, for
   `identity.dwellEpochs` (2) epochs running; a district whose held identity row names an S6 kind
   (`QuarterIdentityRow.kind`) is re-typed to it by the epoch (a lifecycle `edit` of `District.kind`, cause the epoch) —
   later placements read the new kind's rows, nothing standing is re-rolled and the stock follows by §4.11's ladder. A new
   identity renames the district only by §6.3's epoch case (§10.4), the old name kept in `District.nameHistory`.
10. **Emulation and staging.** The vector, the identities, the range and the partition are derived and draw-free; the
   dispersal share, the identities' kinds, the dials and the pressure are `extension` rows, zero or off in the parity
   presets, where the kinds stay S6's and no dial enters the field (item 23). The dossier's standings, shares, partners and
   district-defining institutions are SettlementForge inputs, typed now as §7.7's slices and assignments; the epoch's
   recomputation, renames and pressure run on the staged evolution engine's epochs (§4.11), whose step and records the
   base carries. The bars are §13.2's (item 72).

=== APPEND TO SECTION ### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule ===

**The staged crime term (item 88; J-A88.41).** When the dossier port fills §10.2's staged crime row (`PortRows.crime`: the
settlement's crime scalar in [0, 1] from the dossier; schema-complete and empty in the base, like §2.7's staged records),
it multiplies each district's hidden-share target above by `1 + crime.hiddenScale × crime` (default 0.5) and item 64
(b)'s basement-access probability (II.7.3) by `1 + crime.accessScale × crime` (default 1.0); the row empty, both factors
are 1 and nothing here changes (our own rows, `extension`, 0 in the parity presets).

=== APPEND TO SECTION ### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model ===

**Light sources — placed by rule (item 68; owner: "a night time view with appropriately spaced and partitioned torches or
magical lights").** S11's furniture step (the furniture pins above) places the town's point lights as `LightSource`
records (§2.7; the lighting model that draws them, and the derived lights — lit windows, room lights, light shafts — are
§8.4's) by the light table's rows, each read against its context: the host kind, the way class, the prosperity value along
band rows, the era row, the `magic` circumstance (§4.2 S0) and the arena. A district places lights only on its own faces
and its own half-corridor strips, as §4.9's avenues are planted, so the laziness contract holds (§4.1):

```ts
interface LightRule { host: 'gate'|'bridge'|'plaza'|'market'|'door'|'castle'|'guardPost'|'way'|'shrine'|'pin' /* 'pin': an emitting pin — lamp, campfire, fire_pit */;
  cls?: string /* 'door' rows: the class id or tag whose main entrance carries it (inn, tavern, temple …) */; wayClass?: WayClass /* 'way' rows */; arena: 'ground'|'sky'|'underground'; system?: string /* underground rows: the system they light — sewer, undercity, catacomb, cavern … (II.7.3, II.7.5, II.7.6) */;
  kind: string /* LightSource.kind: torch, lantern, lamp post, brazier, fire pit, campfire, magical orb, shrine lamp … */; source: 'fire'|'magic';
  heightCm: Cm; intensityCd: number /* candela */; radiusCm: Cm /* the smooth cutoff of §8.4's falloff */; count?: number /* per host; default 1 */;
  minLux?: { band: string; lux: number }[] /* 'way' rows: the target minimum ground illuminance at night, by band, interpolated along the value */;
  era?: string[] /* the era rows it belongs to; absent: every era */; magic?: ('low'|'high')[] /* magical rows: only under these values of the circumstance */;
  exposure?: ('street'|'lane'|'alley'|'court'|'hidden'|'sealed')[] /* the exposures it may light; absent: street, lane, alley and court */; extension: boolean }
```

1. **Hosts.** A `gate` row lights each gate (two torches flanking the passage by default); `bridge` each end of a built
   bridge; `plaza` and `market` a square's edge at the way rows' spacing and its centrepiece; `door` rows the main entrance
   (§2.6) of each building of the row's class — an inn's or a tavern's lantern, a temple's door lamp; `castle` its gate and
   ward; `guardPost` each post; `pin` rows every emitting pin, which then carries the light (§2.7); `shrine` a wayside
   shrine. A light's address derives from its host's lineage — a door lantern from its building and entrance, a street
   light from its way strip and ordinal (§2.8, §6.3).
2. **Street lights, spaced by what they give (J-A68.41).** A `way` row lights each way of its class whose band row targets a
   minimum night illuminance `E*` (interpolated along the value of the plots fronting it — a gradient, never a switch). The
   spacing `s` is the largest at which two neighbouring lights of the row still give `E*` on the way's centre-line midway
   between them: `2 · I · h ÷ (h² + (s/2)²)^1.5 × f((s/2) ÷ r) ≥ E*`, with `I` the intensity, `h` the height, `r` the radius
   and `f` §8.4's cutoff, solved by bisection through `dmath` (§6.5 (3)) — a 25 cd lantern at 3 m and a target of 0.1 lx
   give lights about 22 m apart. Each district lights its own half-corridor strip at spacing `2s`, the strip on the way's
   left (by the chain's direction, §2.2) from `s/2` past the way's first junction and the right-hand strip from `3s/2`, so
   the two sides alternate and together meet the target without either district reading the other. A site on a door, a
   gate passage or a deck moves to the next; a light that cannot stand is skipped and reported (§5.4).
3. **How much light — "partitioned" (J-A68.41).** Read as distributed by way class, district and band through these rows:
   the era row sets the density of public lighting — sparse in the medieval default (the plaza, the principal market, the
   gates and the `through` and `primary` ways of the prosperous and rich bands), denser in later eras — so rich streets are
   well lit and poor alleys dark; the `magic` circumstance adds the magical rows (`none` by default under D-3: no magical
   light; `low`: orbs on the rich band's squares and the precinct; `high`: on every primary way and square); hidden and
   sealed plots, and the courts and doors of a concealed institution's building (*Concealed institutions*, item 63), stay
   dark unless a row names them; an informal cluster's light is its cooking fires — one `fire_pit` pin with its light per
   `lights.perStructures` (4) structures (item 70). The sky rows light an island by its supply (II.6); the underground
   rows light the underground layer by its system (II.7.3, II.7.5, II.7.6).
4. **Draws and presets.** Each choice reads a rule or a table; two things only are drawn — a door lantern's side of its door and
   a flicker phase — both on the concern `pin.light` keyed by the host's lineage and the rule row (§6.1). The default rows are
   our own (`extension`); the `MFCG` preset places no light; the `FTG` preset places one window light per lit building at
   its main entrance — the anchor at which FTG's client as captured on 25 September 2026 draws its night lights (item 50) —
   and no street light. A user adds, moves or removes a light by §7.1's edits.
5. **Over time.** A light follows its host's lifecycle (§2.8): removed with a demolished host, unlit on an abandoned or
   decayed one, unlit while its host's Works stands before FINISHED (§4.11); an epoch re-runs these rows on its new and
   changed faces only.

**Informal clusters — tenure and the cluster arrangement (item 70; owner: "some neighborhoods simply have a lot of for
example, shacks on one block no single individual owns it … each one deserving of a door. Sometimes they're just
tents").**

1. **Tenure (item 70 (a); J-A70.41).** A plot's `tenure` (§2.5) is derived, never drawn: `common` for commons, greens and
   market greens (ground no one owns); `informal` for a plot of the tenure table's bands (`RosterTables.tenure`, §10.2; by
   default squalid and poor) with no standing building but shacks, tents or lean-tos, and for vacant, cleared or ruined
   ground in a declining district (§4.11); `rented` for a residential plot whose buildings house more households than
   their template rows' `households.built` (let out by rung 1's `relet`, §4.11); `owned` otherwise. S10b and S11 write it
   with the plot, every event that changes its inputs re-derives it, and a `setAttr` overrides it (an edited path, §7.2).
2. **Where (item 70 (d); J-A70.43).** The designation template takes the `cluster` arrangement (§10.2) for an informal
   residential plot whose district's band range admits the squalid band (item 72, §4.5 (5)) — never on a plot whose
   geometry floor is the middle band or above while its stock stands (a standing large building is subdivided inside
   instead, §2.6's interior ladder, item 28 (f)). At generation that is FTG's staging as the emulation default: the shanty
   districts of §4.5 (FTG's trigger — the roster's average band poor or squalid — after the first half of the stages) take
   the cluster row; the `shanty` kind's `extramural` preference remains our soft extension row (J-A27.43 stands: the
   owner's words name no wall), and the cluster row's relation rows prefer, softly, riverbanks and marsh margins where
   S1's shore setback and flood line allow building, and the lee of walls and ruins. Over epochs the vacant, cleared and
   ruined plots of a declining district join them (§4.11). The undercity's chambers take clusters by II.7.5's rows (item
   65), while II.7.3's sewer-front plots keep "no compound, detached, hovel or tents". Where the cluster row's `wholeBlock`
   share picks it (a draw on the `plot.join` stream of the block), S10 (7) joins a block's informal plots into one plot — the owner's
   "shacks on one block" — by its join law over every plot of the block.
3. **The packing — paths first, then structures (item 70 (b); J-A70.45).** S11 builds a cluster plot in one batch from its
   `siteplan` stream, and every structure gets its own door by construction, as frontage-first plots each get a way (O5
   a). (i) **The footpath web:** from the midpoint of every access edge of the plot a trunk path runs inward, square to that
   edge, ending one structure depth before the opposite side; branch paths leave the trunk on alternate
   sides every `2 × structure depth + path width`, each turned by up to ± 20° (drawn), stopping one structure depth
   inside the plot's boundary. The paths are yard parts of kind `footpath` (§2.5) of width `pathWidthM` (1.2 m, below an
   alley's) — plot-internal, never a way or a way class, so the plot keeps its access edges and its exposure (J-A30.42).
   (ii) **The structures:** lining each path left and right, every one fronting it; the kind drawn by the cluster row's
   weights by band × climate × era (tents in the squalid band, in camps and at the newest edge; shacks where the
   settlement has persisted; lean-tos against a standing wall), the footprint from the kind's band — a shack 6–20 m², a tent
   6–15 m², a lean-to 4–12 m² against a standing wall on its own plot (a ruin's, a party wall or a plot wall; never inside a
   wall strip, whose band, setback and glacis stay unbuildable, §4.8; J-A70.47) — and a clear gap of `fireGapM` (1.0 m,
   less in the larger rungs and the poorer bands by the row) between any two structures; the packing stops when no site
   fits or the plot's households are housed. (iii) **The doors:** every structure's main entrance lies on its path face —
   §2.6's rule 1 read for a structure whose access is a footpath, as a hidden plot's faces its access face (J-A70.44) — so
   every structure has its own door on a path that reaches an access edge; no basement (the rows' `cellar` 0), one storey,
   `RoofSpec.kind 'tent'` for a tent, a lean-to's back wall shared with its host wall. A plot too narrow for a trunk and
   one structure depth takes the `hovel` arrangement instead (reported).
4. **People per structure (item 70 (c); J-A70.46).** Each structure is a residential slot (`houses`) whose
   `households.built` is the cluster row's households per structure by rung × band (more in larger towns and poorer bands;
   our own rows); its capacity is §2.6's one capacity function — the shack, tent and lean-to programmes carry no circulation
   and the one-room unit, so the capacity is the floor area over the minimum room — and the generation fill above houses
   the households within it, the overflow pass re-homing any excess (never omitting a household, §5.2). The households that
   would crowd a partitioned shell under §2.6's interior ladder here fill many small structures: its outdoor twin.
5. **Presets, drawing and time (item 70 (e), (f); J-A70.42).** In the default preset the cluster row takes the squalid and
   shanty districts' informal plots; the parity presets keep FTG's tents row (1–3 tents) and MFCG's hovel, the cluster's
   packing an `extension` (item 23). The city band draws a cluster as a speckle of small roofs over its paths in the ground
   tone (§8.5's cluster exception), the district band each structure with its entrance tick (§8.2), and the naming engine
   names the cluster once, as a place (§10.4; one label, §9.1), never each structure. Accretion, fire and formalisation
   are §4.11's.

**Class mix inside a band — the gradient reaches the building mix (item 71; owner: "a prosperous neighborhood …
may have a mix … of middle class to rich man manors. Keeping with the idea that it is gradient").**

1. **A class draw above the template (item 71 (a); J-A71.41).** When S10b places the households of a block's residential
   plots, each plot's residential **class** — hovel, cottage, house, row house, town house, manor …, distinct class rows
   with their own templates — comes from the class-mix table `RosterTables.classMix` (§10.2): one row per band of §4.5's
   band set, weights over the residential classes, read at the plot's manifested value (J-A19.43) by §4.5's interpolation
   between the band rows' centres, an end row applying flat beyond its centre. The default rows raise the larger classes
   monotonically through every band — just above the prosperous cut mostly houses with a few manors, the manor share rising
   toward the rich row, which is all manors (the owner's "a very prosperous location may simply have all manors"); the same
   at every band edge (modest houses among the poor near the modest cut). J-A19.41 holds within a class — its template's
   discrete columns switch at the cut — while the class itself follows the gradient.
2. **The town's wealth shifts the weights (item 71 (b); J-A71.42).** Each class's weight is multiplied by
   `max(0, 1 + wealthShift × (wealthLevel − 0.5))`, after which the row is renormalised: `wealthLevel` the intent's (§7.7; with a
   dossier, the wealth §7.7's derivation table derives), `wealthShift` the class's column in the mix row (positive for the
   larger classes). The cuts stay the town's own (§4.5), so "rich" is relative to this settlement while a rich
   metropolis's prosperous quarter holds more manors than a poor town's.
3. **Largest classes on the prime frontages, not salt and pepper (item 71 (c); J-A71.43).** For each block S10b draws the
   multiset of classes — one per residential plot, at that plot's value, on `siting` keyed by the plot (§6.1; no new
   concern), its weights clamped into the band range of the district (item 72, §4.5 (5)) — and assigns them largest class first
   (by the class's template size budget, ties by class id) to the plots in descending **prestige**: the sum of the prestige
   rows' weights (`ClassMixRow.prestige`, §10.2 — a `through` or `primary` frontage, a square, a park edge, a corner, the
   waterfront) over the plot's frontages, ties by plot id; a hard relation row filters first (item 16's rows win). A mixed
   block so reads as a street of grand houses with modest ones behind. A class whose size budget exceeds its plot asks S10
   (7)'s law for a JOIN by its orderings (the reconcile's JOIN at generation), the joined neighbour's draw discarded, so
   manors stand on joined plots and houses on standard ones in one block.
4. **Households and buildings (item 71 (d); J-A71.44).** The households' bands are the roster's (with a dossier, the
   households that fill its population, §7.7); the mix decides only which building each takes — a household takes any class
   the mix gives a plot within its band ± drift. A manor that falls to the middle band keeps its shell (item 31's floor,
   §4.11) and is subdivided inside (item 28 (f)). S2's land estimate reads the mix's expected plot area at each band's
   centre (§4.2 S2), so demand and capacity keep agreeing.
5. **Emulation.** The mix is our extension: the parity presets set it to a step at each cut — one class per band row, the
   references' banded pools (item 23; T23-1 reads it) — with `wealthShift` and the prestige weights 0.

**Neighbourhood placement and the band range (item 72).** S10b places a class by its `distribution` (§10.2, read as §4.5 (3) states):
`dispersed` classes by S7b's allocation over all districts, never gathered into one by rule; a `district-defining`
instance's district taking its defining class up to its identity row's `targetShare` of its placed uses; a `singular` class by the rules
proper to it. Every prosperity-driven read of S10b and S11 — the class the mix draws, the template row's band, a new
building's condition, the occupants' band, the mutator's adapt and add steps — is clamped into the district's band range
(§4.5 (5)).

**A returning dossier element (item 80).** Among the *Requests after the city is built*, a `dossier` request for an element
whose assignment returns to `active` (§7.7, item 80) ranks first the plot of its former building — the building whose
`formerUses` names its use — ahead of the least-disruption order, so a reopened institution reopens where it stood,
repaired by §4.11's Works when the change is dated.

**Notice posts (item 82; J-A82.41).** The furniture step places a `notice` pin (§2.7) where §10.2's notice rule puts one — at the
principal market and at each gate plaza by default, at the main entrance of each class tagged `notice`, and wherever a
named-feature claim of the dossier names one (§7.7, item 82).

=== APPEND TO SECTION ### 4.10 S13 Names and labels · S14 Display list · S15 Simulation ===

**Names and descriptions from character (items 67, 70 and 72).** Since S13a follows S12c (§4.1), a district's naming and
its one-line description read its identity and character vector beside its venue mix, features and prosperity (§4.5,
§10.4; item 72); an informal cluster takes one place name and one label, never one per structure (§4.7, §10.4; item 70);
and a building's description reads its Works stage at the document's week — "being built", "being demolished", "ruined
since …" (§4.11, §10.4; item 67).

=== REPLACE ### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base) ===
### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)

**The one built path: add a growth stage (GEO-27, LC-12, FTG-4, FTG-14).** `grow(doc, epochInputs)` appends an `epoch`
event to the log and runs at that log position (§7.1, §7.4) on the persisted model with the epoch sub-stream: S2 (**delta
demand** = the suffix of the sequential roster between the old and the new population, §10.2 — prefix-stable, so no
survivor's use is withdrawn by arithmetic) → S5 for the new stage, when a residual remains after the regrowth-first order
below (S5a: the boundary grown from the previous one and, if walled, its trace and gates; **S5b**, the main-road step, so each epoch can add main roads; S5c with the built-face legality
below; S5d) → S6 (districts extend over the new faces, existing districts keep their ids; the field's drivers are
re-evaluated with the new circumstances, the brush strokes kept as Δ) → S7 (the new enceinte's furniture) → S7b (allocation
of the delta demand in the regrowth-first order below — the old plan's vacancies, ruins and traces first, new faces only for
the residual) → S12a (outside sites for new outside classes; the hinterland unit builds their plots) → S8–S13 on new faces only (S10–S12b in the derivation pool, over a copy frozen as §3.3
step 1 states). S5c's proposals cross water only on a deck — a built bridge, or a `site` the proposal builds (§4.4) — so an
epoch's growth uses the crossing sites S1 and S3 left unused (§4.2 S1 (5)).
* **Built-face legality (GEO-27).** In an epoch a growth proposal may not cross a face holding footprints unless it runs
  along plot boundaries or back lanes (§4.3's `existingFabricCost` applies to S5c too, pricing a route along plot lines far
  below one through buildings) or a declared `demolish` conversion is chosen at its table cost (by building class and age),
  recorded as events. Plots cut by a new corridor are re-cut through the conversion path — buildings that still fit are
  kept, the others demolished with lifecycle events — never re-derived from scratch.
* **Survivors — the wealth ladder and the geometry floor (LC-12; owner, 2026-09-26; item 31).** Surviving plots and
  buildings keep their built state. A re-evaluated field never re-derives them and never removes an occupied building: it
  acts on them only through the explicit, recorded, rate-limited events of the **wealth ladder** — three rungs by the
  time a block has spent in its new band and by what its standing stock allows — drawn from `…/epoch=e` streams (the
  ladder's own draws on `epoch.transform`; a rung-3 re-cut's `plot.*` and `siteplan` concerns keyed by the block's and
  the new plots' lineage with the epoch component, §6.1 — no new concern). The engine that schedules the ladder is the
  owner's staged evolution stage (DEF-8, below); the base carries now the due mark, the table, the operators, the floor
  and the edit kinds, each usable by hand (§7.1) and undoable (§7.4). With no epoch nothing here runs, so the static
  baseline is unchanged (item 23): neither reference evolves — MFCG fixes granularity by ward type and FTG by lifestyle
  tier at generation, and FTG's "regenerate area" is a re-roll, which this ladder never is.
  - **The trigger — a band change past the hysteresis marks the block DUE.** After S6 re-evaluates the drivers (§4.5)
    each block's band is read again against the town's `FieldBands` with their hysteresis (0.02, §4.5): a block whose value
    has crossed a cut by more than it is marked due — `Block.due = { band, since, epochs }` (§2.5): the band it must
    meet, the epoch of the crossing and the epochs spent in that band, counted up at every later epoch — until its stock
    meets the band or the band changes again (a new mark; a flicker inside the hysteresis marks nothing). The mark is per
    block and the memory per plot (`builtBand`, below): "the neighbourhood grew poor" is the aggregate of its blocks'
    marks and its plots' records, never a district switch (J-A31.43).
  - **The rungs.** Every rung acts through operators the base already has — item 18's designation mutator (`mutate`,
    §4.7 S11), item 17's use step (below), item 30's passage choice (§4.6), S10 (7)'s join-and-split law in its
    incremental form (§4.7) — as `LadderOp` conversion events (below), so **no occupied building is demolished by a band
    change** and nothing is re-rolled (J-A31.41).
    1. **Rung 1, at every due epoch — use, occupancy and condition.** *Growing poor:* buildings are let out — `relet`
       raises a building's household count within §2.6's **capacity** (its one capacity function, J-A28.23),
       the roster's households (with a dossier, the households that fill its population, §7.7 item 2; item 20 (h)) and item 17's
       relocation filling them (§10.3);
       the interior follows the occupants down §2.6's **interior ladder** (item 28 (f)): the plan rung re-cuts the
       programme for the new count inside the unchanged wing rings — from one household with its staff rooms to a
       lodging house, a tenement of one-family apartments off a corridor, or single rooms — inside the `relet` event
       itself for a stored plan (§7.3's stored-plan row; J-A28.72), otherwise when next clicked (the unstored rung goes
       `stale`, §2.8); F-PLAN never drops a household (§5.2);
       outbuildings convert to dwellings and workshops and sheds and hovels infill the yard (`mutate` toward the field
       band's use and specialisation columns; `densify … infill` inside the manifested band's yard rows); the garden is
       built over (§4.9); the fabric's **condition** steps down — `Building.condition` `kept → worn → neglected` (§2.6:
       wear and patched roofs, rendering classes of §8.2, never a shape change, item 19); the roof is lost only by the
       decline ladder's `decay`, after the building's last household has left (`vacate`; the derelict state of §2.8's
       ladder). *Growing rich:* renovation and extension by `mutate`'s adapt and add steps toward the
       richer template (item 18), households re-united (`relet` down to the row's built count; the interior re-cut back
       up the ladder removes what the subdivision added and restores the earlier plan where nothing else changed, §2.6),
       infill cleared once its households are re-homed and the garden reclaimed (`thin … infill`; infill whose
       households cannot be re-homed within the epoch's churn cap waits, as a court does in rung 2), condition restored.
       Use, condition and the interior read the field band; geometry reads the manifested band (the floor, below).
    2. **Rung 2, after the ladder table's duration in the band — tenure and yards.** The holding fragments or
       consolidates without its front changing. Growing poor, the yard becomes a back court of rear plots reached by a
       new passage (`densify … back_court`) where §4.6's passage choice allows one and the plot's manifested band's row
       carries a rear-plot or hidden share — a middle-floored plot's yard is infilled, not cut into tenements; growing
       rich, a back court is cleared and re-gardened (`thin … back_court`: its uses relocated by the use step, its
       households re-homed — item 17's relocation, or a `relet` up in a standing shell within §2.6's capacity — and its
       buildings vacated (`vacate`), then the rear buildings cleared (`clear`) and the passage sealed, item 30; a court
       whose households cannot be re-homed within the epoch's churn cap waits); and big houses change class keeping their
       shells — a mansion to a tenement, an inn, a workshop or a chapel — by `mutate` (item 18). Rung 2 keeps every
       frontage and every main shell; its one plot-line change is `densify … back_court`, which splits the yard off the
       plot into rear plots and a passage face by S10 (7)'s incremental re-cut — the front plot, the child that keeps the
       frontage anchor, keeping its address and `builtBand`, every child's lineage continued by §6.3's SPLIT rule (the
       parent's key with its child index), the rear plots taking their new stock's band as `builtBand` — admitted only as
       above, never on a middle-floored plot; a court
       `thin` has emptied and cleared is vacant, so its rear row returns to the front plot's garden by rung 3's
       `amalgamate` (J-A31.40).
    3. **Rung 3, on vacancy, ruin, a destructive circumstance event or redevelopment only — the geometry follows.** A
       vacant or ruined plot's ring is re-cut to the band: growing poor, an abandoned or ruined mansion's plot is split
       into row houses or tenements (`subdivide`), or the fallen house's plot is re-cut and rebuilt as lodgings; growing
       rich, a buyer joins two or three worn small plots and replaces their houses with one large building (`amalgamate`,
       then `rebuild` or `build`). **Redevelopment** is a composite the engine issues in order — purchase (the plots'
       uses closed or relocated by the use step under item 17's rules — a dossier-backed use relocated, never closed
       (*Dossier content across epochs*); a pinned assignment or a lock stops it),
       vacancy (`vacate`), then the re-cut and the new stock — so the invariant holds at every step (J-A31.47). The
       re-cut is S10 (7)'s law in its incremental form (§4.7): the due block re-cut with its neighbours fixed (§7.3: the
       block is the effective scope, with its seam exception), under the band's granularity target, fusing by S10 (7)'s
       orderings (vacant or same-owner neighbours first, then a rear plot into its front plot) and splitting by them
       (the widest frontage first, then the deepest yard), every survivor's plot byte-identical, the new plots' buildings
       by S11's mutator from the empty design, their residential classes by S10b's class mix at the new stock's value (§4.7,
       item 71). Slums arise where the stock was small and cheap to begin with, or from
       rungs 1 and 2 inside big shells; a district of mansions grows poor as tenements behind grand fronts, never as a
       cleared slum (the owner: "hard to imagine that it would be torn down into a slum if it was filled with
       mansions").
  - **Asymmetry — speed by direction and by the stock's replaceability (owner: "much easier for a poor neighborhood
    to grow rich and merge plots").** The rung durations are rows of the **ladder table** (`WealthLadderTable` in
    `@plat/tables`, §7.6, §14; our own rows, calibratable, §13.9; tendencies changeable per region and era, item 23),
    keyed by direction and by the stock's `replaceability` — a column of the template rows of the class table (§10.2), read
    at the plot's `builtBand` row: `immediate` (tents, sheds, hovels), `short` (cottages and the row houses of the
    poorer bands), `long` (the row and detached houses of the prosperous bands), `ruin_only` (manors, halls,
    institutions) (J-A31.42). Growing rich reaches rung 3 within a few epochs because it replaces cheap stock; growing
    poor stays at rungs 1 and 2 for generations, because expensive stock is not torn down, so splitting waits for
    vacancy, ruin or a destructive event. Every duration in years here is read on the weekly clock (*The clock*, below):
    the years a block has spent in its band are (the epoch's week − the week of the epoch that marked it, from its
    `EpochRecord`) ÷ 52. Default rows:

    | replaceability of the standing stock (at `builtBand`) | years in the band before rung 2, growing rich / poor | rung 3 growing rich: fusion after purchase and vacancy | rung 3 growing poor: splitting |
    |---|---|---|---|
    | `immediate` | 0 / 0 | in the due epoch | on vacancy, ruin, a destructive event or redevelopment |
    | `short` | 0 / 10 | after 10 years in the band | the same |
    | `long` | 10 / 20 | after 30 years in the band | the same |
    | `ruin_only` | 10 / 30 | on vacancy, ruin, a destructive event or redevelopment only | the same |

  - **Churn.** The table's **churn cap** rows bound every epoch, per kind — `geometry` (rung-3 re-cuts and rebuilds),
    `fabric` (the decline lottery's strikes, below), `use` (the use step's relocations, below) — as a share of a
    district's plots (or uses) per decade, scaled by the epoch's `years` — a fraction of a year allowed, the scaled cap's
    fractional part the chance of one more, drawn on `epoch.transform` keyed by the district, the kind and the epoch (no
    new concern; J-A76.44) — and a maximum per block per epoch; defaults
    0.05 / 0.10 / 0.10 per decade and 2 plots per block (the former "10 % of a district's plots per decade" is the
    `fabric` row). Candidates beyond a cap wait, in address order, so a neighbourhood changes over many epochs, never
    all at once; item 17's cap and the lottery's bound are rows of this one table (J-A31.46).
  - **The geometry floor (owner: "their floor is bounded to middle class … once a neighborhood generally gets to a
    middle class outcome, that forever remains its geometry until vacancy, ruin, fire, war, or redevelopment shifts
    things entirely. it would cycle … between rich and middle").** Each plot persists `builtBand` and
    `builtProsperity` — the band and field value its present stock was built for (§2.5; in the model digest, §6.2; never
    recomputed from the field, unlike the fields themselves, J-DET-12) — and derives, never stores, `geometryFloor =
    min(builtBand, FieldBands.middle)` by the band order: the settlement's middle band (§4.5 names it) for stock built
    at or above it, the stock's own band below it — a hovel cannot read poorer than a hovel; it can only be replaced
    upward. The plot's **manifested band** is `max(field band, geometryFloor)` and its manifested value `max(field
    value, floor value)`, the floor value being the middle band's lower cut, or `builtProsperity` when the floor is the
    built band. A **block-level read** — S10 (2)'s granularity rows, II.3's dispatch — takes the block's manifested band
    as `max(block band, the floor of its standing plots' area-weighted median)`: the plots ordered by `geometryFloor` in
    the band order (ties by address), the floor at which their cumulative area first reaches half their total; a
    plot-level read takes the plot's own (J-A31.43). Every change other than a rung-3 event reads the manifested band and value for what is BUILT — S10 (2)'s
    granularity rows, S11's template geometry columns (size budget, structures, storeys, heights, frontage, court and
    garden; J-A19.43), the yard partition (§4.9), II.3's block dispatch — and the field band and value for who is there
    and how it fares — households, condition, specialisation, the room programme, labels and descriptions (J-P1 stands:
    "the rich quarter" is still a description of the field). So a mansion district that grows poor reads as
    middle-class geometry — big plots, big shells, subdivided into lodgings, yards infilled — while its occupants,
    condition and names are as poor as the field says: **the interior has no floor** (item 28 (f)) — the shell keeps its
    floor while its rooms follow its occupants down §2.6's interior ladder, to single rooms off a corridor at the
    poorest, which is where the poor live when every area is developed (the same shells, a different interior; item 30's
    back courts behind them, the cheap stock of item 27's shanty rule at the edge, §4.5); between the rich and the middle
    manifestation it cycles freely and reversibly through rungs 1 and 2 (renovation and re-unification upward,
    subdivision and infill downward) with no frontage change and no shell falling toward a poorer band (renovation may
    extend a shell, item 18); the middle band is each settlement's own (§4.5's per-town cuts), so a town's middle and a
    metropolis's middle each bound their own districts (J-A31.43). **What writes `builtBand`** (J-A31.44): generation
    (the plot's band at S10); a rung-3 event, to the band of the new stock (an `amalgamate` that builds nothing — a
    thinned rear row or a cleared plot returned to its neighbour — keeps the `builtBand` and `builtProsperity` of the
    member whose frontage anchor the joined plot keeps, §6.3's JOIN); rung 2's `densify … back_court`, for the rear
    plots it creates only (their new stock's band; the front plot keeps its own); the hand edits of rung 3's kind, each
    re-deriving the stock by the user's act — `rebuild`, `demolish` then `build`, `amalgamate`, `subdivide`, `fill`, a
    `replace` close-up (II.4) and a New random of the block — and the authorial re-derivations
    that re-derive the stock itself: a field brush's or a `FieldBands` `setAttr`'s re-derivation and `Adjust` (§7.2,
    §7.4 — a brush is how a user designs the town, so it re-derives its scope to the current band; the floor governs
    wealth change over epochs); and a **completed upward refurbishment** — a `mutate` whose result meets a higher band's
    shape template raises `builtBand` to that band, so a renovated quarter keeps its floor (the owner's "refurbished
    housing"). Nothing else lowers it: rungs 1 and 2 never lower a standing plot's
    `builtBand`, and wealth change over epochs lowers it only through rung 3 (a completed upward refurbishment raises it,
    and rung 2's rear plots take their stock's band). Regenerate (keep settings) keeps it (a recorded input, §2.8); a member a split
    `resurrect`s takes it from the rung-3 event that re-cut it, not from its tombstone (§6.3); a document written before
    the attribute existed gets `builtBand` = its plot's `DerivationRecord.band` and `builtProsperity` = its recorded
    sample, exact for every document without an epoch (§7.5). The floor draws no random numbers. With no epoch the
    manifested band equals the field band everywhere.
  - **Lineage survives, so the seed survives (J-A31.48).** Fusion and splitting continue lineage by §6.3's JOIN and
    SPLIT rule (J-A31.73), so one seed with one history gives one town, and an undo returns the former plots exactly from
    the undo record's rings and records (§7.4). Every ladder event is a mutation that continues lineage; only a
    re-derivation takes fresh lineage (§6.3's succession rule; the owner: "It's not new rerolls its modifications and
    variations to the original seed").
  - **The epoch's order** (the engine's loop on the base's path). Before S2: the rung profile is read at the epoch's
    population target (*The rung at an epoch*, below), the dials' applied standings and shares move past their hysteresis
    (*The dials' inputs over epochs*, below) and `TradeFlow` is re-read from the epoch's trade slice on the current
    geometry (§4.3; item 77). After S2's delta demand: (a) S6 re-evaluates the
    drivers and the bands, re-bands every live plot's `fieldBand` against its own column by §4.5's rule (§2.5;
    J-A28.29) — before any rung reads the field band, the former values in the epoch's undo record — and marks the due
    blocks; (b) the use step (item 17, below) closes, opens and relocates uses;
    (c) when the target fell, the roster's suffix leaves in reverse ordinal order — a building whose household count
    falls but not to zero takes a `relet` down (an unstored plan rung `stale`, a stored plan re-cut in the event) and `vacate` fires only when its last household
    leaves; the decline lottery (below) draws per building, deciding whose households leave first, and strikes fabric by
    its exposure (item 28 (f) with item 8; J-A28.45); (d) the
    ladder runs its rungs on the due blocks under the churn cap; (e) the dossier events that arrive with the epoch's inputs
    (`EpochInputs.dossier`, below, in the host's order) are applied here as mutations at that epoch — S10b's `dossier` request and S11's mutator on the current map (§4.7,
    §7.7; item 22 (e)), never a re-roll — it remains what the seed, the ordered history and its own edits make it
    (J-A22.42); (f) siting places the delta in the regrowth-first order below, from its step (0) — a `relet` up in a
    standing shell before `reoccupy` of a vacant one (J-A28.45); (g) a
    residual grows a stage (S5); (h)
    every live placement rejection (§7.7's record, item 20) is re-checked by §7.7's lapse rule (J-A20.74, J-A20.41), the
    epoch writing `lapsedAt` inside its own touched set, and a lapsed site is eligible again from the next placement on;
    (i) the **character step** (item 72): §4.5's S12c on the grown town — each district's character vector, identity
    (past its hysteresis, re-typing a kind its identity row names) and band range re-derived, the clamped excess added
    to its pressure, a district whose identity changed renamed by §6.3's epoch case (§4.5 (8)–(9), §10.4) — and
    `TradeFlow` re-derived on the grown geometry (§4.3); (j) every physical change of steps (a)–(g) is shown on the
    ground by a Works started inside the epoch's span, and every Works that finished more than `works.retainWeeks`
    before the epoch's week is retired (*Works*, below; item 67).
    Each step's events cite the epoch; the whole is one `epoch` event's fold (§7.4). A dossier event between epochs is
    applied at its own log position by the same request and mutator (§7.7); a dated one — between epochs or carried by an
    epoch — keeps its `dossierChange` (§7.1, item 75) and starts its Works at the change's week.
  - **Regenerate, Adjust and the derivation record.** A transformed entity's `DerivationRecord` is updated; every other
    plot keeps its record, so "Regenerate (keep settings)" on an untouched block reproduces it byte for byte, and
    re-deriving it with the new field is the explicit `Adjust` (authorial, above). Siting across epochs places only delta
    demand, in the regrowth-first order below.
* **Test (M4).** On a town with walled, ribbon and suburb regimes, adding a stage re-rolls 0 survivors, adds ≥ 1 primary
  when its gate law asks for one, and replays from the log to the session hash. The ladder's, the floor's and the epoch order's hook tests are §13.2's
  (item 31), as are the Works', the clock's and the character step's (items 67, 72 and 76).

**Conversions** are typed plat operations with recorded events. `ConversionOp` is defined here, once, as one union: the
base's own kinds, the ladder's (`LadderOp`, item 31, the Survivors rule above), the decline hooks' (`DeclineOp`, item 8, below),
the use step's (`UseConversionOp`, item 17, below), the terrain and water conversions' (`TerrainWaterOp`, item 25, below)
the passage sealing's (`HiddenOp`, item 30 (e), below) and the underground's own kinds (item 65: the buried old town's
`RaiseGrade`, II.7.6, and the undercity's `ClearUndercity`, II.7.5, declared there); §7.1's `convert` event carries it, and
`build` below is §7.1's
`build` event:

```ts
type ConversionOp =
  | { op: 'wallToWay'; enceinte: Id; widthCm?: Cm } | { op: 'gateToJunction'; gate: Id; square?: boolean }
  | { op: 'outskirtToDistrict'; region: { ring: Polygon; key: PlatKey } /* the outskirt faces it covers; no stored slots, §2.2 rule 5 */ } | { op: 'demolish'; id: Id }
  | { op: 'rebuild'; building: Id; cls: BuildingClass /* the whole replacement a ruin or a redevelopment calls for (rung 3), never a designation change (§4.7 S11) */ }
  | { op: 'build'; plot: Id; cls: BuildingClass; footprint?: PolygonCm /* as §7.1's build event */ } | { op: 'carve'; kind: 'canal'|'moat'|'harbour_basin'; polygon: Polygon }
  | { op: 'abandon' | 'decay' | 'ruin' | 'robStone' | 'clear' /* removed to a footprint trace */; building: Id } | { op: 'plotToGarden'; plot: Id } | { op: 'contractWall'; enceinte: Id; trace: Polygon }
  | LadderOp | DeclineOp | UseConversionOp | TerrainWaterOp | HiddenOp | RaiseGrade | ClearUndercity;
type LadderOp =                                                                            // item 31's rungs (Survivors, above): each a mutation with an undo record (§7.4), usable by hand (§7.1)
  | { op: 'relet'; building: Id; households: number /* rung 1: the household count the roster fills, within §2.6's capacity (J-A28.23); a stored plan is re-cut inside this event, an unstored one goes stale and is re-cut on the click, both along §2.6's interior ladder (§7.3; item 28 (f)) */ }
  | { op: 'densify'; plot: Id; as: 'infill' | 'back_court' /* rung 1: sheds, hovels and a workshop in the yard, the garden built over; rung 2: rear plots in the yard reached by a new passage (§4.6, item 30) */ }
  | { op: 'thin'; plot: Id; what: 'infill' | 'back_court' /* the inverse: infill cleared and re-gardened (§4.9) after its uses relocate and its households are re-homed (item 17's relocation, or a `relet` up in a standing shell within §2.6's capacity) and its buildings vacated; a back court likewise, its passage sealed */ }
  | { op: 'subdivide' | 'amalgamate'; plots: Id[] /* rung 3 only, on vacated plots: S10 (7)'s law in its incremental form — the due block re-cut with its neighbours fixed; §7.1's plot split and join are the hand forms */ };
```

**`wallToWay(enceinte)`** is `retypeEdges(ChainRef('wall', enceinte), add ('way', the new ring road), remove 'wall')`: the
wall chain becomes the spine of a `primary` way with a ring-road width, on the same edges; the wall strips' setback and
glacis lines are removed, so the strips merge into the faces beside them, their band, tower and gatehouse faces are
cleared with the rest of their finer content, and S9's `corridorUnion` re-derives the ring road's corridor there; towers
are removed; gates become junctions with a `square` option. **Clearance (GEO-38):** the new corridor needs half its width
on each side of the old wall line; where the half-band plus setback on a side is narrower, plots meeting the new corridor
are clipped along its edge — a plot keeps its id when its frontage anchor survives (O8 g), and footprints that no longer
fit are demolished with lifecycle events (cause `convert:wallToWay`).

**`carve` — a canal, moat or basin added by an edit, or an outer moat by S5a (§4.4).** The dry run decides every way's fate
and the carve's one **footprint** before any batch runs. Let `S` be the channel ⊕ its bank setback. Every way whose corridor
meets `S` takes a fate by class (J-P30), recorded as lifecycle events with cause `convert:carve`:
* **kept with a pinned deck** — every `through` and `primary` way, and any other way that is the only connection of the
  streets on its far side to a gate or the plaza. Its deck (S1 (5)'s form, perpendicular to the channel) and its
  **re-route** are solved in the dry run by §7.3's S4 local operator — between the way's nearest pinned nodes on either side
  of `S`, on S3's lattice with `existingFabricCost` (so it keeps near its old line), through the deck as a fixed graph edge;
  a way that already meets the channel within ± 10° of its normal keeps its line and only its stretch across the channel
  changes. The old stretch between the re-route's two ends is the way's **replaced stretch**. S7's rules give the deck its
  `Bridge` (events: `altered` on the way, `built` on the bridge);
* **cut** — every other `secondary`, `lane`, `alley`, `cul_de_sac`, `track` and `path`: its stretch inside the channel ⊕
  max(bank setback, 1 m) is removed, so every cut end lies at least 1 m from the channel, and a remainder that now dangles
  shorter than one block depth is pruned (events: `altered`, `demolished`); `quay` and `pier` ways are cut the same way and,
  where they met the new water at ≥ 30°, extended from the cut end to the new bank as a quay or a landing.

**Other crossings (J-I13).** A wall trace that `S` crosses has its **run** — the trace between the nearest unaffected towers
on either side of the crossing — re-traced as data in the dry run, with a water gate where the channel crosses, as §7.3
(b) 2 re-traces a run a moved river crosses. The stretches of the run's strip lines alongside it — the inner setback line,
the glacis line (or the moat's inner bank, which is water and stays) and, where the era row has one, the intervallum —
between the feet of the perpendiculars from the run's two end towers leave with the old run, and S7's operator re-cuts them
along the re-traced run from those feet (batch (3)). Every way the re-traced run's new strips — the new run ⊕ (half its band
+ its setback, and + its glacis or berm on the field side) — will meet, other than a kept way through a gate of the run
(whose corridor ends each strip, §4.8), takes the `cut` fate at the strip's boundary, as `drawWall` cuts the ways its new
strips meet (§5.2, §7.4), and every plot inside the new strips is re-derived with the rest of `R`. A locked or pinned way,
wall or finer entity, or a reservation, inside `S` or inside a new strip returns to the dry run as an F-EDIT conflict (lock
> drawn geometry; Re-derive from S3 offered for a reservation, §5.2), as for S1's water operator.

**The footprint (J-P34).** `C` is the set of L1 cells (the faces of the L1 view) that (a) the channel ⊕ (`attractCm` + bank
setback) meets; (b) border a removed stretch, a pruned remainder or a stretch the new strips' cuts remove; (c) border a kept
way's replaced stretch or are crossed by its new route; (d) where the channel crosses a wall, border the old run or the
strip-line stretches batch (1) removes with it, or meet the re-traced run ⊕ (half its band + its setback, and + its glacis
or berm on the field side) — the ground its new strips will take. The **footprint** is `R` = ⋃ `C`, exactly: every point of
the arena lies in one L1 cell, so the channel's buffer lies inside the cells (a) names, and no cell outside `C` holds a face
any batch of the carve clears, splits or re-derives. `R` is the carve's one clear region: batches (1) and (2) declare it as
`KernelTx.clearRegion`, step (4) re-derives exactly its cells, the fate report lists exactly the protected entities inside
it, and the locality checks — §3.3's clear-region confirmation, §7.3's carve row, the §13.1 and §16 M3a fixtures and the
O18 (g) / O2 (c) perturbation test — require byte identity outside it, less the seam exception at its boundary (step (4)).
By (b)–(d) no plot outside `R` loses its access (a plot's access edge lies on a kerb of a way it fronts) and batch (1)
removes no edge a kept face uses (no `E_KEPT`); inside `R`, S10 gives every plot an access edge by construction (O5 a),
and S8's deep-interior rule and F-PLOT's alley rung act as in any block. The wall-crossing fixtures are §13.1's and
§13.2's.

**The batches**, each single-level (§3.3):
1. **L1, clear region `R`.** `clearFiner` on `R`'s cells; the cut stretches, the pruned remainders and the kept ways'
   replaced stretches are removed, each through its `StretchRef` (§3.4) — a way cut in two first hands its far part to a new
   way by `retypeEdges`' `rekey` on that part's `StretchRef`; each kept way's new route is inserted whole, across the line the
   channel will take, with its deck's two bank vertices placed on it at the new bank points — carrying `deck_end`, pinned —
   and the span between them carrying the structural `deck` role beside `way`, so every kept way stays one connected chain
   through every batch; each crossed wall run is replaced by its re-traced run, with its water gate's two bank vertices
   carrying `('gate_end', gate, 0 | 1)` under a fresh `Gate` (§2.2 rule 7), the old run leaving with the stretches of its
   strip lines alongside it (each through its `StretchRef`, its ends placed by `splitThrough` at the feet of the end towers'
   perpendiculars); the ways the new strips will meet are cut at the strips' boundaries; and every other L1 edge the
   channel's banks will cross that is no way — a settlement-perimeter or other district-boundary stretch, a wall strip's
   setback or glacis line outside a re-traced run — is split at its two bank points by `splitThrough`, each carrying an
   `anchor` contact name (§2.2 rule 7: the entity of the edge's first own-level row, the smallest free ordinal — from 2 on an
   enceinte), with the stretch between them removed through its `StretchRef`; the map's `border` line is split at its bank
   points the same way but kept whole across the channel (§3.3 clear regions, rule 2; the arena's outer ring is L0 and meets
   the channel at its own level, §4.1). Those `deck_end`, `gate_end` and contact-name vertices are the carve's **prepared**
   vertices; every cut end lies ≥ 1 m from the channel, so no way is prepared except at its deck.
2. **L0, clear region `R`, `KernelTx.prepared` = the `deck_end`, `gate_end` and contact-name vertices of (1) (J-P40).** The
   channel's ring is inserted and attracts onto and promotes the prepared vertices, stripping the contact names (§3.3 rule
   3, §3.6); each deck span — the kept way's own edge between its two promoted bank vertices — now crosses the water as the
   `Bridge`'s deck (§2.2 rule 7), and no L0 edge crosses the channel, so the water body stays one L0 face. Any other contact
   with finer geometry is `E_LEVEL` or `E_KEPT` and returns to the dry run.
3. **L1.** Each kept quay or pier is extended from its cut end to the new bank (its end a Steiner vertex on the L0 bank line,
   §2.2 rule 3); S7's operator re-cuts the wall strips' setback, glacis and intervallum lines along each re-traced run from
   the feet (1) left, closing them on the new banks, and builds its towers and the water gate's `Gate` record, whose `banks`
   name its two `gate_end` vertices (§7.3's S7 row).
4. **Re-derivation of `R` (J-P43).** S6's operator, restricted to `R`'s cells, after the L0 batch: each land face of `R`
   takes the district — or the hinterland pseudo-district, or the `wall_strip` typing — of the pre-edit L1 cell that held
   the larger part of its area (ties by id). A boundary stretch removed under the water lies between its two bank anchors,
   so the L0 batch re-separates the land on either bank along the boundary that remains and no land face spans it: a canal
   across the settlement perimeter leaves the land outside it with the hinterland on both banks (0 district faces outside the
   perimeter; fixture §13.2), and a block part beside a crossed glacis line keeps its own block's typing. The same rule
   settles a boundary stretch removed on land — a cut way that carried a district boundary — by the larger part. The new
   strips (3) cut are typed `wall_strip` and take their district as S7's strips do (§4.8), and the channel's water faces
   leave the district face sets they were cut from. Then S8–S12b re-derive `R`'s cells by tree scoping (§7.3 item 2) — S8
   first, because cuts and replaced stretches merge and reshape L1 cells — with S10's step (0) for `R`'s faces beside a wall
   trace, the settlement perimeter or a shared reservation boundary (§4.7). Where a batch of the carve adds or removes a
   junction vertex on a spine that bounds `R`, the far side takes II.1 (3)'s neighbour step or its reversal; those steps and
   the `Seam` records of `R`'s districts are the carve's seam exception, the same set a district's reroll has (§7.3 item 1),
   which the locality oracle computes from the commit records. A carve therefore costs its footprint, not the town.

At S5a nothing finer than L1 exists yet and the channel meets only the arterials through the stage's gates: every way is
kept with a deck, nothing is cut, and `R` clears nothing (§4.4). Every touched entity's lifecycle records the event with its
cause.

**A cut way's far part — the records that name a way (J-Fpipe-2, from Fable's review of 27 September 2026).** When the carve's batch (1)
hands a cut way's far part to a new way by `retypeEdges`' `rekey` — and S1's water operator, which cuts ways the same way
(§7.3 (b) 3), likewise — the rekey moves the edges' role rows and knot rows and nothing else (§3.4), so the same batch
**re-points every record that names the way by id along the far part** to the new way: the `Frontage` records of the
blocks along it (`Frontage.way`, §2.5), `Bridge.way` of a built deck there, `Gate.way` of a gate there (§2.7),
the `Greenery.along.way` of its avenue and street-tree rows (§4.9; §2.7), `Junction.arms` at its junctions
(§2.4), `Tunnel.follows` of a main beneath (§2.7), and the `SeamEdge.chain`, `Portal.wayId` and `SeamAmendment.spine`
entries of the `Seam` records that name it (II.1). Those records lie outside the footprint `R` and change only by that id:
this is the carve's **identity exception**, which the locality oracle admits beside the seam exception (§7.3 item 1, item 7
(ii)) — every such record equals its prior record except that the new way's id replaces the old, and every other entity
outside `R` stays byte-identical. Which part keeps the old address is §6.3's anchor rule — the part keeping the old anchor
(§7.3 (b)); the far part is keyed by §6.3's SPLIT rule as a split plot's or tunnel's part is (J-A31.73, J-A11.43),
continues the lineage, and **keeps the parent's name and naming record without a draw** — a street a canal severs is one
street on both banks, so S13a draws nothing and its label candidates for the new way are built inside the carve's S13a
delta (§7.3 item 2). A `Frontage`'s `class` and `lengthCm` are unchanged (the class is the way's and moves with the
rekey). The carve's undo restores the one way and every re-pointed record (§7.4). *Test (§13.2, with §13.1's carve
fixtures):* after a canal that cuts a `lane` and a `secondary`, §5.3's reference-integrity row holds on every record that
named either way, 0 records outside `R` differ from their prior other than by the new way id, and both parts of each cut
way carry one name.

**Coherence from one seed (owner).** Epoch N+1 is derived from epoch N's persisted state, the inputs and the seed's epoch
sub-stream `…/epoch=<n>`: the same town under different inputs has different histories, under the same inputs the same
history, and nothing that survives is re-rolled, because a survivor keeps its lineage and its derivation record (§6.3,
§7.3).

**The evolution engine is the owner's later stage (DEF-8); its hooks are concrete now.** The owner's history — growth,
regression and growth again: houses emptied and robbed for stone, plots turned to gardens, a shorter wall ring inside the
old one, ruins left standing — is expressed with the base's own records: the transformation and conversion kinds above
(`abandon`, `decay`, `ruin`, `robStone`, `plotToGarden`, `contractWall`, the ladder's `LadderOp` and the `DeclineOp` kinds
below), which a user can also apply by hand in the base (§7.1); the lifecycle history on every entity; the epoch streams; the circumstances timeline (§7.7); and the sequential
roster (a population fall selects its suffix in reverse ordinal order; the decline table's exposure lottery, below,
chooses which buildings empty). A ruined building keeps its footprint and heights and draws with the ruin program and the `none` roof kind (§2.6, §8.2); when and where the engine
applies these kinds is its own rule table over the `…/epoch=e` streams. The engine plugs in behind one interface, and the
base registers only its own path:

```ts
interface EpochInputs { week?: number /* item 76: the absolute week at the epoch (The clock, below) — a dossier-bound map's is SettlementForge's calendar.elapsedWeeks; absent on a standalone call, then the previous week + round(52 × years) */;
  years: number /* derived from the weeks: (week − the previous epoch's week, or the creation week) ÷ 52, a fraction allowed */; populationTarget: number;
  circumstances: CircumstanceSlice /* §7.7 item 2 */; events: { kind: string; params: Record<string, number> }[];
  dossier?: EditEvent[] /* the host's dossier events (author 'host', EditBase.dossier set), in the host's order, applied at step (e) (§7.7 item 6); each keeps its EditBase.dossierChange (§7.1, item 75) */ }
interface EvolutionStrategy { plan(doc: Document, inputs: EpochInputs, tables: TableView, rng: Stream): KernelResult<(ConversionOp | EditEvent)[]> }   // registered by name (§4.12)
// base registration: 'grow-by-stage' — the path above; the owner-staged engine registers its own strategy and reuses every event kind
```

The base builds and tests exactly one path — **add a growth stage to an existing town** — at M4 (G-P13), because it is the
same path "regenerate this area" uses.

**The clock — weeks (item 76, with item 67's Works; owner: "our simulator advances by units of one week").** "Our
simulator" is the clock that changes the map's inputs — the host's (SettlementForge's) or the staged evolution engine's —
never `@plat/sim`'s `time` view key, which changes nothing (§10.3; J-A76.41).
1. **The week.** The map's time is an integer week. For a dossier-bound map it is SettlementForge's
   `calendar.elapsedWeeks` — no conversion; never `elapsedMonths`, never `history.age` — and its creation week is the
   port's `HostContext.week` (§14) or 0; a standalone map starts at week 0. `EpochInputs.week` is the absolute week at the
   epoch and `years` is derived from it (above); a standalone `grow` call that gives `years` only takes the previous week +
   round(52 × years) and re-derives `years` from the whole weeks, so every reader sees one clock. A dossier event carries
   its week in `dossierChange.week` (§7.1, item 75). The document's current week is derived — the week of the last folded
   event that carries one — never a stored counter (§2.9), and each epoch's week is its `EpochRecord`'s.
2. **Dating a dossier change.** The port (§14) dates each change it finds by the first of these rungs that gives a week: an
   explicit tick on the change's receipt (`foundedAt.tick`; lifecycle `institutionHistory[].tick`;
   `populationHistory[].tick`; `activeConditions[].triggeredAt.tick`; campaign-era `historicalEvents[].tick`;
   `decrees[].tickRef`; `calamityHistory[].tick`; `previousGovernments[].tick`; a news tick; the provenance ledger's tick),
   then the week suffix of the change's outcome id, then `HostContext.week`, then none: a change with no week applies
   finished, with no Works (§7.7 item 1 reads these rungs; the port counts an undated change in its report).
3. **The season — one calendar (J-A76.42).** `CalendarRow` gives the week of the year, `(week mod 52) + 1`, and its
   season: a dossier-bound map reads the row `sf445` (52 weeks; four seasons of 13 weeks from spring; month ends at weeks
   4, 8, 13, 17, 21, 26, 30, 34, 39, 43, 47, 52), a standalone map our own default row, shaped alike (month ends 4, 9,
   13, 17, 22, 26, 30, 35, 39, 43, 48, 52). The Works' pauses (below), §8.2's season rows for a campaign week and the
   module read it, and no second calendar exists (`tables/dossier/calendar`, §14).
4. **The cadence.** The port folds a dossier's discrete changes as standalone dossier events at their weeks, in
   SettlementForge's order (decrees first), and an `epoch` at each 52-week boundary crossed — or sooner, when the dossier's
   population has moved from the last epoch's `populationTarget` by more than the **roster tolerance**, ± 5 % (J-A76.43;
   the one number §7.7 item 3's lapse reads too) — carrying the target, the circumstance slices (§7.7 item 2), the event
   kinds and that week's dossier events in `EpochInputs.dossier`; a catch-up batch follows the same rule, gaps allowed.
   No epoch is folded per tick: the Works' stages are derived from the week at any drawing (below), so no weekly epoch is
   needed to show them. A standalone map's epochs are its circumstance timeline's (§7.7, dated in weeks) or a user's
   `grow` calls.
5. **Rates per year (J-A76.45).** Every chance this section states per unit of time is per year, applied over an epoch's
   span as `1 − (1 − p)^years` through `dmath` (§6.5 (3)); dwell bands and ladder durations are in years read as weeks ÷
   52; the churn caps scale by `years` (above) — so epochs a few weeks apart and one a decade long change the town at the
   same rate. II.6's island slots follow the same rule.

```ts
interface CalendarRow { id: string /* 'sf445' — the dossier's; 'plat-default' — ours */; weeksPerYear: 52;
  seasons: { season: 'spring'|'summer'|'autumn'|'winter'; fromWeek: number /* week of the year, 1-based */ }[]; monthEnds: number[] /* twelve week-of-year ends */ }
```

**The rung at an epoch (item 81 (b); J-A81.41).** At each epoch the rung profile is read at the epoch's
`populationTarget` (§1.1's ladder): a crossing of one of §1.1's bands changes the rung's row — its granularity,
greenery, layer and budget rows — for everything the epoch builds from then on, and the standing fabric survives exactly
as it survives a growth stage (§6.3). A crossing upward whose town the frame no longer holds grows the frame to the one §3.2 (9)
gives the new target: S1 derives terrain, water and the hinterland's ground on the ring between the old margin and its
successor — the same terrain field continued, each water body continued across the old margin with its inner reaches fixed
— and one L0 batch replaces the `margin` and `border` chains (§2.2 rule 1; the kernel's statement is §3.2 (9)'s), every
face inside the old margin byte-identical. The frame never shrinks: a declining town keeps its frame and its hinterland.
II.6's island gate is one reader of the rung. A dossier below 1 500 is refused by the port (§7.7, item 81) and never
reaches an epoch.

**The dials' inputs over epochs (items 72, 78 and 79).** At each epoch, before S6 re-evaluates the drivers, a power's
applied standing (`PowerStanding.appliedStanding`, §7.7 item 2) moves to the epoch's standing, and a sector's applied share
to the epoch's share, only when they differ by more than `dial.hysteresis` (0.05, a dial-table row); both are folds over
the epochs' slices in log order, so a replay reproduces them and §4.5 (6)'s dials follow the dossier's powers and economy
without flickering at every small move.

**Uses across epochs (item 17) — the hooks now, the engine's step later.** A **use** — a shop, workshop, inn or
institution — is its own record (`Use`, §2.7), separate from the buildings that house it: a building references its
current use or none (vacant) and keeps `formerUses`, so a use can close in one building and open in another while the
building persists — vacant, re-let or converted. The base builds the hand path: the conversion kinds below, applied by a
`convert` event (§7.1) — `openUse` on a vacant plot or building (the building mutates to the designation by §4.7 S11's
operator), `closeUse` (the building stays, vacant — the first state of the decline hooks above — or converts to a named
designation), `relocateUse` (a `closeUse` here and an `openUse` there under one event, `detail.from` and `to` on the use's
lifecycle event, §2.8; `swapUse` is two relocations) and `mutate` (§4.7 S11) — each with its undo record (§7.4) and
reported to a host (§11.3). The staged engine's **use step** runs at each epoch after the roster's delta demand and before
siting, as the same events: (1) **re-score** — for every use, §4.7 S10b's solver scores its present plot and the best
alternative within its catchment (the district and its neighbours, `serviceRadiusM` of §10.2's `useRules`) against the
current field, distribution and supply graph; (2) **inertia** — a use moves only when the alternative beats the present
plot by more than the row's `inertia` and the row's `moveChance` draw falls (the `use.relocate` concern on the use's
`…/epoch=e` stream, §6.1), closes only when its catchment's demand (the households within its radius against the roster's
ratio) has been below `closeShare` for `closeAfterEpochs`, or a hard supply edge has had no provider in reach for
`starveAfterEpochs`; a dossier-backed use never closes by this rule (*Dossier content across epochs*, below); new demand (the roster's suffix) opens uses where the solver scores best — so markets and shops drift
toward where people live and inns toward the busiest gate, by distribution, never by a fixed order; (3) **cap** — at most
the churn cap's share of a district's uses relocates per epoch (the survivors' ladder's churn cap above carries one row
per kind — fabric transformation, use relocation; item 31); (4)
**assignments** — a host or owner assignment is a stable identity that moves with its use under the same rules unless
`pinned` (§7.7, item 20 (g)), in which case it stays and the town adapts around it; every change is reported; (5)
**traces** — a vacated building keeps its former use in `formerUses`, which a later opening prefers (a former inn reopens
as an inn first; a dossier element whose assignment returns to `active` reopens in its former building first, repaired by a
Works when the change is dated — item 80, §4.7) and the naming engine may read (§10.4); (6) **concealed uses** — a
concealed use (item 63) relocates by these rules like any use, and its front stays an ordinary business (§4.7's
*Concealed institutions*). Uses are visited in address order; one seed and one circumstance
timeline therefore give one history of openings, closings and moves; households and postings follow (§10.3).

**The epoch-spread mutation (item 18 (c)).** Across epochs a designation change is not applied at once: the engine issues
§4.7 S11's `MutationRecord` as a sequence of `mutate` events over the ladder's rung durations (item 31) — first occupy,
when the present design is compatible (every kept part, nothing added); then adapt; then extend (the adds); and rebuild
only the parts that cannot be adapted — the same steps and the same draws, spread in time, so a smith moving into a richer
street mutates toward the richer template over epochs. Each of those events decides and records its step at once, as a
host or user change does (§4.7 S11 step 6), and a Works shows it on the ground over the weeks it takes (*Works*, below;
J-A67.49), so the model never changes between events.

**Dossier content across epochs (item 20; J-A20.75, J-A20.43).** No step of an epoch closes a dossier-backed use (its
assignment's `existence: 'dossier'`, §7.7 item 2) or leaves one without a building; only a dossier event the epoch
applies at step (e) removes, adds or re-designates one (§7.7 item 2). The use step never closes one: where its catchment
or its supply fails, the use relocates to (1)'s best alternative by the solver's `dossier` request — its first closest
option where no plot passes the hard rows (J-A20.71) — or, where its catchment holds no candidate plot, stays in its
building; its moves by (2)'s inertia rule are any use's. Before any other step would empty or remove the building that
houses an unpinned one — a redevelopment's purchase, step (c)'s `vacate`, the decline lottery's strike, the growth
step's declared `demolish` or corridor re-cut, a carve, `wallToWay`'s clearance, `contractWall`, a terrain-and-water
repair, `fallIsland`, a tunnel's closing (II.7.3) or a passage's sealing — the use is first relocated the same way
inside the epoch, a `relocateUse` citing the epoch and counted outside the use cap, the request's scope its catchment
less the plots that step empties or removes, widened to the town where that scope holds no candidate plot; a pinned one
keeps its building, which the step treats as it treats any pinned entity (§7.2). So the dossier element is live and
placed at every step (§5.3's row). A dossier-listed ruin (`Assignment.state` `ruined`, §7.7, item 80) is present as its
ruin — its use closed, its building `ruined` — and no step repairs or clears it but a dossier event; a reopening returns
its use to its former building first (above).

The kinds these steps use join `ConversionOp`, defined above:

```ts
type UseConversionOp =
  | { op: 'openUse'; plot: Id; to: Designation /* §4.7 S11 */; building?: Id; assignment?: Id }
  | { op: 'closeUse'; use: Id; leave: 'vacant' | 'convert'; to?: Designation }
  | { op: 'relocateUse'; use: Id; to: Id /* the destination plot: a closeUse here and an openUse there under one event */ }
  | { op: 'mutate'; plot: Id; to: Designation; spread?: 'now' | 'epochs' /* §4.7 S11's operator; 'epochs' issues its steps over the ladder's durations */ };
```

**Decline and regrowth (owner, 2026-09-25: "growth, regression and growth where appropriate"; AM-8).** Regression is
growth read the other way: the population target falls, the roster's manifest shrinks by its suffix (§10.2), and the
fabric the suffix leaves behind steps down a ladder of states over epochs — never re-rolled, never removed by arithmetic
— until regrowth reoccupies it. The steps are scheduled by the owner's staged evolution engine (DEF-8, above); the base
carries now, stated here once: the ladders, the decline table with its exposure function, the salvage ledger, the lag
rule, the regrowth-first siting order — which binds the built `grow-by-stage` path today — and the conversion kinds, each
applicable by hand (§7.1) and undoable (§7.4). The states are §2.8's and the style classes that draw them §8.2's; §6.3
holds the identity rules, §13.2 the hook tests, §16 the price at M4.

* **The ladders** (§2.8's `Existence` value in brackets; every step is one conversion below, a lifecycle event with its
  cause). *Buildings:* occupied → vacant (`abandoned`: the use has left, the fabric stands) → derelict (`decayed`:
  roofless, `RoofSpec.kind 'none'`) → ruin (`ruined`: walls part-standing, the ruin program) → robbed or cleared
  (`cleared`: a footprint trace, its material in the ledger) → reused (`reused`: the trace, keeping its face, drawn as the
  garden, orchard or field it became — `Building.reusedAs`, §2.6 — or a successor building raised on the old
  foundations, which takes the trace's address, §6.3). Upward steps exist at every rung — reoccupy, repair, rebuild, reuse — and regrowth
  uses them first. *Walls and gates:* in use → neglected (`abandoned`) → breached or partly dismantled (`decayed`; the gap
  a `StretchRef`) → superseded by a shorter inner ring: `contractWall` traces and builds the new ring inside the old one
  through S5a's trace step and S7's operator, the old ring's record stays live with `Enceinte.supersededBy` naming the new
  one and its line persists as a trace — or becomes the ring road of the owner's original case by `wallToWay`. *Tunnels*
  (II.6's condition table), and the underground's galleries and chambers at the same persistence rate (II.7.5, II.7.6; item 65):
  in use → neglected, silted (`abandoned`) → partly caved in (`decayed`) → collapsed or sealed (`ruined`;
  `Tunnel.closure`), never demolished by the engine. *Islands* (II.6): floating → waning → settled → fallen. *Plots:* a
  plot whose last building is cleared or reused merges into a garden, orchard or field (`plotToGarden`) or into its
  occupied neighbour (`amalgamate`; §4.7 S10), so surviving households absorb the plots beside them and the plan coarsens
  where people are few — fewer, larger plots from loss, through the same merge operator as from wealth. Fields are their
  own layer: a struck farmstead's fields stay worked, their `LandUse.owner` passing to the nearest farmstead or to the
  commons.
* **The decline table** (`DeclineTable` in `@plat/tables`: an editable, versioned rule table with provenance, §7.6; our
  own rows, calibratable, §13.9). Its rows are tendencies — weights and chance, no fixed order (AM-23):

  | row | default | what it does |
  |---|---|---|
  | persistence rate per fabric layer | `use` 1.0 · `building` 0.6 · `plotBoundary` 0.3 · `street` 0.08 · `wall` 0.05 · `underground` 0.03 · `terrainWater` 0.005 | scales how readily a layer is struck: uses go first, then buildings, then plot boundaries; street and wall lines persist longest; the underground slower still (AM-11); terrain and water slowest (AM-25's conversions are the rarest events) |
  | exposure drivers | kernels over the context vector (§2.5) with weights, §4.5's construction: extramural (the district outside the outermost enceinte, as S10b reads it) +; `terrainClass` low, damp or flood +; downwind +; near the noxious kernels of field pass 2 +; the intramural periphery (`dist.wall` small inside the enceinte, `dist.centre` and `dist.market` large) +; low `prosperity` +; the resilient core (`dist.market` and `dist.plaza` small; the attractors at churches, the precinct and the castle) − | where decline strikes first, as weights |
  | chance share | 0.25 of the exposure field (the prosperity field's is 0.15) | causes vary and chance plays a part |
  | dwell bands (years; each drawn once as its step's `decay` Works duration, *Works* below) | vacant → derelict [10, 30]; derelict → ruin [20, 60]; ruin → cleared on salvage demand only; walls one band slower, tunnels two | the lag on the way down |
  | haul radius | 250 m | how far salvage travels |
  | exemptions | a locked or pinned entity is never struck; an assigned entity only through the use-relocation rule (AM-17); the building of a dossier-backed use only after that use is relocated (*Dossier content across epochs*) | the user's fixings hold |

* **The strike lottery** (the engine's step; the exposure function and the table are the base's). For an epoch whose
  target lies below the manifest, the suffix leaves in reverse ordinal order as the epoch's step (c) states — a `relet`
  down while households remain, `vacate` at a building's last household (J-A28.45); which
  standing fabric then steps down is drawn without replacement from a lottery over the candidates whose dwell band has
  run — for a building, whose `decay` Works has run its span (*Works*, below; J-A67.46) — weight `w = E(x) · rate(layer) · u`: `E(x) = clamp(Σ_j v_j · kernel_j(x) + ε_E(x), 0, 1)` the exposure field,
  computed per epoch on §4.5's 32 m cells from the current context vectors and prosperity field with its chance share;
  `rate` the layer's persistence row; `u` a draw from the `epoch.transform` stream keyed by the entity's lineage and the
  epoch (§6.1; no new concern); the draw bounded by the Survivors rule's churn cap per district and per epoch. An
  undefended suburb, a damp low quarter and the plot beside the tannery empty first as a tendency, the market core last,
  and a core house can still fall — a weighted tendency, not a law (J-A8.41).
* **Salvage — the material ledger.** `robStone`, `clear`, `dismantle` and `demolish` credit the town's `MaterialLedger`
  (§2.7) by the building's class-table yield (`salvageM3` per material, §10.2); `build`, `rebuild`, `reuse … build` and a
  repair (`reoccupy` from derelict) debit it by the new class's row from sources within the haul radius. The ledger is a
  flow record, never a hard constraint: a debit it cannot cover is built anyway and the shortfall is reported (J-A8.45).
  Its mark on the map: the lottery's weight for `robStone` and `clear` is multiplied by the salvage demand within the haul
  radius — the standing debits of planned building, repairs and a new stage's footprints — so cleared zones appear beside
  active building, and a ruin beyond any demand is left standing, the owner's "occasional old decrepit buildings or
  ruins".
* **Lag and memory.** Built extent follows population with a lag on the way down and none on the way up: a fall's
  households leave at once (step (c): a `relet` down, `vacate` at the last household) and the standing stock decays by the dwell bands over later epochs; a rise is met in the epoch it arrives by
  the regrowth-first order below, without a dwell (J-A8.47). Memory is the persistence order itself: plot lines, street
  lines, wall lines and traces outlast the buildings, so the old plan is there for regrowth to refill.
* **Regrowth-first — built now, on the one path.** In `grow-by-stage` (above) S2's delta demand is placed in this order,
  and only the residual grows a stage: (0) standing shells whose household count fell below what their occupants'
  band row houses relet up within §2.6's capacity (`relet`; J-A28.45); (1) vacant buildings reoccupied (`reoccupy`); (2) derelict ones repaired
  (`reoccupy`, a ledger debit); (3) ruins and cleared traces rebuilt or reused on their foundations (`rebuild`, `reuse …
  build`); (4) vacant plots of the old plan beyond the band's vacancy-run share (S10 (8) keeps the share; the design's own
  runs are never filled below it); (5) plots S10 cuts on the faces the old plan left unbuilt along its street lines inside
  the last boundary; (6) new faces of a new stage — where `Features.sewers` is on, the underground crowding hook first sends
  `crowdingShare` of the residual's poorest-band households underground (II.7.3 (c), II.7.4, §4.5 S7b (6)); S5a grows the boundary for the residual only, and an epoch whose
  residual is ≤ 0 grows no stage and adds no face. S7b allocates the delta first to (0)–(5) as each district's old-plan
  capacity and only the remainder to new faces; this replaces the rule that an epoch placed delta demand only on new or
  transformed plots (J-A8.44). **Test:** §13.2's T8-2 (M4).
* **The prosperity field under decline.** The drivers are re-evaluated per epoch (§4.5); under decline the market,
  harbour and main-street kernels shrink with their activity (§7.7's circumstance slice), and where plots merge the
  density field falls, so the field contracts toward the survivors' core and may concentrate there — the ladder's
  amalgamations are its footprint on the plan.
* **Islands and the underground over epochs** (their laws are II.6's). Each epoch re-reads the rung from its population
  target (§1.1; *The rung at an epoch*, below) and re-evaluates II.6's supply law: an island whose supported area shrinks past the hysteresis is resized
  (its rim's plots cleared with lifecycle events, cause `convert:resizeIsland`); one whose supply falls to zero — or whose
  settlement has left the CITY band (AM-13) — wanes, settles after its dwell band and falls: `fallIsland` archives its
  arena and lays a `ruin` decoration face (§2.7) over its projected outline on the ground through the carve path's
  clear-region protocol above, every entity under it demolished with that cause; regrowth re-floats a settled island
  before it raises a new one (J-A10.42). A tunnel silts, caves in and is sealed by the same lottery at the underground's
  rate, is never demolished by the engine (J-A11.41), and is reopened before a new one is dug.
* **Identity and determinism.** A vacant, derelict, ruined, cleared or reused building is a live record with its address
  and lineage (§6.3); it becomes a tombstone only by `demolish` or when a `reuse … build` successor takes its address
  (`supersede`, §2.8) (J-A8.42). Every draw above comes from `epoch.transform` or, for islands, `island.place`, keyed by
  lineage and epoch, so the same seed under the same circumstance timeline gives the same history of decline and regrowth
  and a different timeline a different one (§6.2, §7.7).
* **Emulation note.** Neither reference has time: with no epoch the static baseline is unchanged byte for byte (§13.3's
  goldens), and every rate above is a table value (AM-23).

The kinds this adds to `ConversionOp` — one list with the union above, which reads `… | DeclineOp`; §7.1's `convert` event
carries them all:

```ts
type DeclineOp =
  | { op: 'vacate' | 'reoccupy'; building: Id }                                          // occupied ⇄ vacant; reoccupy from derelict is a repair: roof restored, ledger debited
  | { op: 'reuse'; building: Id; as: 'garden'|'orchard'|'field' | { build: BuildingClass } } // a ruin or trace reused: the trace drawn as that kind (Building.reusedAs, §2.6), or a successor on the old foundations (Building.predecessor, §2.6)
  | { op: 'neglect' | 'breach' | 'dismantle'; enceinte: Id; stretch?: StretchRef }        // walls and gates; the old line persists as a trace; contractWall and wallToWay above supersede a ring
  | { op: 'silt' | 'caveIn' | 'seal' | 'reopen'; tunnel: Id; stretch?: StretchRef }       // the underground's ladder (II.6); a `stretch` splits the record first; no engine plan contains demolish on a tunnel
  | { op: 'resizeIsland'; island: Id; areaHa: number; elevationCm: Cm }                    // the supply law's response: the outline re-drawn by §4.2's routine from the island's own stream; rim plots cleared, or new rim faces grown by the grow path on the island's arena
  | { op: 'settleIsland' | 'fallIsland' | 'refloatIsland'; island: Id }                    // waning → settled (elevation at the floor of its band, districts declined) → fallen (arena archived, a ruin face on the ground); a settled island re-floats first
  | { op: 'raiseIsland'; allocation: Id };                                                 // regrowth: a new island for a sky allocation the count law opened at this epoch, placed by SkyStrategy (II.6)
```

**Terrain and water change slowly (item 25; the engine is owner-staged, the kinds and the hand path are the base's).**
Reclamation, silting and river-course shifts are conversions on the one list — kinds `ConversionOp`'s union admits, the
slowest layer of the persistence order, never immutable — applied by hand in the base through §7.1's `convert` event and, in the staged engine, drawn at
the decline table's `terrainWater` rate by their own trigger rows (below). Each is a typed operation whose repair is an
operator the base already has (J-A25.41):

```ts
type TerrainWaterOp =
  | { op: 'reclaim'; kind: 'marsh'|'foreshore'; region: Polygon /* marsh: LandUse faces of kind 'marsh' or a damp or flood band re-typed as land; foreshore: a shallow water margin filled */ }
  | { op: 'siltReach'; water: Id; stretch?: StretchRef /* a reach or a basin: its width and depth profiles fall by the row's share; a basin below the harbour's draught loses its harbour use */ }
  | { op: 'shiftCourse'; water: Id; from: number; to: number /* control-knot ordinals (§2.3): the reach between them re-traced — a meander cut-off or an avulsion */ }
  | { op: 'digCanal'; polygon: Polygon /* the carve above, kind 'canal' */ };
```

* **Repair.** `reclaim` runs S1's terrain operator (§7.3 (a)) — the region's ground raised to the flood line plus the row's
  margin (`reclaim.raiseCm` 60), drained by a ditch water body and its `LandUse` faces re-typed with `reclaimed` set,
  as §2.3 states — and, for a foreshore, S1's water operator (§7.3 (b)) with the filled margin
  as the new shore; `siltReach` and `shiftCourse` are S1's water operator on the changed reach (the width and depth profiles,
  the shores as their buffer, the crossings re-sited, the kept ways re-routed, F-RIVER's re-trace confined to the reach,
  §7.3 (b) 1–2), so their footprint, fates and locality are the carve's and byte identity holds outside it; `digCanal` is
  `carve`. Every touched entity's lifecycle records the cause (`convert:reclaim` …); the record changes each kind makes
  are §2.3's.
* **Trigger rows (the engine's step; the rows are the decline table's `terrainWater` rows, §7.6).** Candidates and their
  chance per year — applied over the epoch's span as `1 − (1 − p)^years` (*The clock*, below; J-A76.45) — each × the layer's persistence rate (0.005) and drawn from `epoch.transform` keyed by the water body's
  or face's lineage and the epoch (§6.1; no new concern, J-A25.42): `siltReach` — a reach whose accumulation has fallen, or a
  basin whose harbour use has closed (the use step), 0.02 per year; `reclaim` — a marsh or foreshore face beside built
  land whose band's plot demand is short (S5d's shortfall record) and whose district's band is `modest` or above, 0.03
  per year — reclamation is bought by prosperity and pressed by demand; `shiftCourse` — a reach whose sinuosity exceeds
  `river.cutoffSinuosity` (1.8), or whose flood cells beside it exceed the row's share, 0.01 per year; `digCanal` only by
  demand (a `canal` row of the roster's institutions, a dossier element or a user's edit). Each fires at most once per body
  per epoch; AM-23's tendency wording holds — rates, not laws. Emulation note: neither reference has time, and both
  already let a user reshape water — MFCG's warp and FTG's water drawing — which the base keeps as §7.1's edits; nothing
  here runs without an epoch.

**Hidden plots over epochs (item 30 (e); the base carries the kinds).** A passage can be **sealed** — `sealPassage` sets
`Passage.sealed` (§2.5), so the access edges on its face read as sealed; every plot whose only reach passes it takes exposure `sealed` (§4.6), and
its buildings enter the decline ladder as vacant (`vacate`, cause `convert:sealPassage`) — and later **reopened**
(`openPassage`: the exposure returns to `hidden` and the buildings reoccupy by the regrowth-first order); both are hand
edits in the base and the engine's kinds later. Hidden plots **arise** by densification — the ladder's `densify …
back_court` (rung 2) cuts a plot's yard into rear plots reached by a new passage where §4.6's reach weights allow one,
through S10's incremental re-cut with the neighbours fixed (§4.7 S10 (7)) — and **vanish** by `thin … back_court` (the
rear plots cleared after their uses relocate, their households are re-homed and their buildings vacated, the passage
sealed and, on a rising band's re-cut, removed with the rear
row, `amalgamate` returning the land to the front plot's garden: item 31). The sealing kinds are the last kinds of this section the union admits
(`… | TerrainWaterOp | HiddenOp`):

```ts
type HiddenOp = { op: 'sealPassage' | 'openPassage'; passage: Id /* the L3 passage face (§2.5) */ };
```

**Works — every physical change on the ground as a timed project on the weekly clock (item 67; owner: "when a building
gets torn down, ruined, being built, being expanded, Lots need to merge or separate … we should show stages of it being
built. What do you think those stages should be?").**
1. **Decided at once, shown over weeks (J-A67.41).** Every physical change — a build, an extension, a demolition, a
   repair, a conversion, a decay step, a clearance — is decided and recorded by the event that makes it, as it is today
   (the designation mutator's record, a conversion, a ladder or decline op; §4.7 S11 step 6, J-A67.49), so the log alone still
   determines the model. When that event carries a week — an epoch, a dated dossier change (§7.7 item 1), a hand edit
   scheduled by `startWorks` (§7.1) — and the preset's `works.enabled` holds, the event also creates a **`Works`** record
   (§2.7): its kind, its target (a building; the wings or storeys a mutation adds or subtracts; the plots of a join or a
   split), its start week, its duration in working weeks, the `WorksTable` row read, the event and mutation it shows, and
   what the ground held before that the model no longer holds (the removed parts' rings with their heights and roof kinds;
   the removed plot lines with their treatments). The drawn state at any week is DERIVED — computed from the record, never stored per
   week (2). An event with no week, a hand edit not scheduled, generation (the creation week shows a finished town;
   J-A67.47) and the parity presets create no Works, and the change is drawn finished. So a user's `build`, `demolish` or
   `convert` stays instant unless scheduled; an engine's `demolish` makes its tombstone at once while its Works draws the
   demolition from the kept shell; aborting a change is its undo (§7.4), which removes its Works; `cancelWorks` (§7.1) ends a
   running Works at once — the change it shows stands, drawn finished — and a `setAttr` on a Works moves its start or its
   duration.
2. **The stage at a week.** `stageAt(works, w)`: `e` = the working weeks in [start, w) — the weeks the calendar row does
   not pause for the Works' material in the town's climate (`WorksTable.pauses`: masonry, stone and brick, pauses in winter
   in temperate and cold climates; our own rows) — and `f = min(1, e ÷ duration)`; the stage is the kind's latest
   scheduled stage whose start fraction is ≤ `f`, `before` for w before the start and `finished` at `f` = 1. Weeks are integers,
   so a stage shorter than a week is never drawn (a tick shows the stage it lands in); a tent's zero-week duration applies
   finished in its week. At most one Works runs on a target: a new change on it ends the running one at the stage reached,
   which the new one takes as its `before` (a repair begun on a decaying house runs back from DECAYING).
3. **Durations (item 67 (b); J-A67.43).** `WorksTable` rows keyed by kind × class (or the designation template's `works`
   key, §10.2) × size (storeys, footprint) × material give a range of working weeks; the duration is drawn once, uniform in
   the range, × the labour factor of the plot's band (richer, faster; a row), on the `works` concern (its key is §6.1's;
   J-A67.61; J-A67.42). Defaults (our own, calibratable, §13.9): a hovel or shed 1–2 weeks; a small timber
   house 2–6 (the owner's "two weeks or a month"); a town house 8–17; a stone house 17–52; a manor 52–156; a church 520 or
   more; a cathedral built part by part — choir, transept, nave, towers, each its own Works in its programme's order, the
   choir in use under a temporary roof while the nave rises; a demolition a quarter of its build's range; a clearance 1–4;
   a `decay` Works the decline table's dwell band for its step (below), × 0.6 for timber and thatch. Material enters as a
   duration row only — time, never shape (the owner's materials rule, §2.6; J-A31.42 stands for replaceability).
4. **The stages — the answer to the owner's question (item 67 (c)–(f)).** Start fractions are per class row; what each
   stage draws is §8.2's `states` rows:

   | kind | stages (default start fractions) |
   |---|---|
   | build — and each wing or storey an extension or an adaptation adds | STAKED 0 (a dashed footprint, a material pile) · GROUND BROKEN 0.05 (bare earth, a spoil heap, a cellar pit) · FOUNDATIONS 0.15 (low walls or a sill frame) · WALLS RISING 0.25 (the walls up storey by storey, no roof, the interior open, a scaffold ring) · ROOF FRAMED 0.75 (rafters, no covering) · ROOFED 0.85 (covered, the scaffold still up, a work yard) · FINISHED 1 (the scaffold gone, the yard laid out) |
   | extension | the kept building in use throughout; the added wing through the build stages; at ROOF FRAMED the old roof opened where the two join; at FINISHED the joint wall opened and the wings united (item 18's add step, shown over time) |
   | demolition | EMPTIED 0 (doors and windows out) · STRIPPED 0.2 (the covering salvaged, rafters bare) · ROOFLESS SHELL 0.4 (rubble inside) · RUBBLE 0.7 (wall stubs, heaps, salvage piles) · CLEARED 1 |
   | decay — §2.8's ruin ladder on the way down (5) | toward `decayed`: ABANDONED 0 (shut up, the yard overgrowing, the roof whole) · DECAYING 0.5 (a holed roof, a sagging ridge); then `decayed` is ROOFLESS (weeds and saplings inside), `ruined` COLLAPSED (walls fallen in places, the stone gone to the salvage ledger), `cleared` or `reused` OVERGROWN (a grassy mound and a foundation line, until cleared or built over) |
   | repair | the decay stages backwards under a scaffold, to the building's former state |
   | fire | an instant destructive event (rung 3's trigger): the building `decayed` in its week and drawn CHARRED — a blackened roofless shell — until a clearance or a repair starts |
   | conversion with no geometry step | REFIT 0 (a scaffold on the frontage) · FINISHED 1 |

   The ruin stages are the existing ladder's drawn stages (J-A8.46 stands; no new `Existence` value): the target keeps its
   ladder state from the event on and carries its running Works by a link (`Building.works`, §2.6).
5. **The decay Works carries the dwell band (J-A67.46).** A `vacate` (the building `abandoned`) starts a `decay` Works toward
   `decayed` whose duration is its dwell band drawn once (the decline table, above); the lottery's `decay` candidates are
   the buildings whose `decay` Works has run its span, and the strike's `decay` event (the building `decayed`) starts the
   next toward `ruined` the same way; a `reoccupy` ends it and starts a `repair`. A building left `abandoned` or `decayed`
   by an undated event (a hand edit) gets its decay Works from the next epoch, starting at that epoch's week.
6. **Mutation steps (J-A67.49).** A Works shows its event's `MutationRecord` (§4.7 S11) in the record's order — subtracted
   parts by the demolition stages first, then adapted parts (an added storey's walls rising, an extended wing's build
   stages), then added parts by the build stages — each part's span a share of the duration by its footprint area; kept
   parts stand as they are. A `rebuild` is a demolition then a build, one Works; the epoch-spread mutation's events (above)
   each start their own.
7. **Plots in transition (item 67 (g); J-A67.44).** A join or a split is decided when its event lands — the plot rings
   change then (ownership) — and the ground follows the work: each removed boundary line is drawn from the Works' kept
   lines, dashed as pending removal, until the joined plot's build reaches GROUND BROKEN (or a demolition reaches
   RUBBLE), and a new dividing line is drawn as stakes, dashed, from STAKED and as its fence or wall from WALLS RISING.
   Item 31's `subdivide` and `amalgamate` run through the same stages. Access is the event's, so a Works never leaves a
   plot without access.
8. **What reads the stage.** Heights at a stage are derived, `heightsAt(works, w)`: WALLS RISING raises the eave storey by
   storey (the eave × the storeys reached ÷ the floors), no roof before ROOF FRAMED (drawn as a `framed` roof), the finished
   roof from ROOFED, a demolition lowering them in reverse; the stored heights stay the finished building's, so the shadows
   of §8.4 and §11.1's 3-D export follow the stage. The households an event placed are housed at a week only from
   FINISHED, and a demolition's have left before EMPTIED (item 17's relocation, J-A17.41): the module's occupancy, the lit
   windows (§10.3) and the light sources (§4.7, §8.4) read that. The plan rung of a building in progress draws walls
   without doors or furniture, and of a ruin its fallen walls and open rooms (§2.6); the stage counts among the plan rung's
   recorded inputs, so a stage change marks a derived plan stale and §8.5's change marker shows it (item 67 (j)).
   Descriptions say "being built", "being demolished", "ruined since …" (§10.4); the city band draws the stage glyph on the
   footprint, the neighbourhood band the walls, scaffolds, frames and rubble (§8.5, §8.2).
9. **Which week is drawn (J-A67.45).** Every drawing, export and reader draws the document's current week (*The clock*,
   above) unless the per-viewer view key `week` (§2.9) names another — a host setting its campaign week, or a user
   scrubbing — outside every digest. Scrubbing draws every live Works, and every Works finished within `works.retainWeeks`
   (52), at that week over the current model, forward and back, byte for byte; the full history at an earlier week is the
   log's replay (§7.4). An epoch retires the Works that finished more than `works.retainWeeks` before its week: the record
   leaves the model and its target's lifecycle event keeps the weeks.
10. **Restraint (item 67 (i); J-A67.48).** An epoch's Works start at weeks spread uniformly over its span (the weeks since
   the previous epoch; the offset is the `works` concern's draw before the duration's, §6.1), so the share of stock under works at the epoch's week
   follows the growth or decline rate by construction — a steady town shows a few scaffolds, a boom town many, a declining
   one ruins. A `ConditionOverlay` (§2.7; staged, empty in the base; item 88) scales the share of an epoch's changes it
   starts as Works once the port fills it (a siege stops building). With no epoch and no scheduled edit nothing here runs,
   and the static baseline is byte-identical (item 23: neither reference has time).

```ts
type WorksStage = 'before'|'staked'|'groundBroken'|'foundations'|'wallsRising'|'roofFramed'|'roofed'|'finished'
  | 'emptied'|'stripped'|'rooflessShell'|'rubble'|'cleared' | 'abandoned'|'decaying'|'roofless'|'collapsed'|'overgrown' | 'charred'|'refit';
interface WorksRow { key: string /* a class id, or a designation template's `works` key (§10.2) */; kind: 'build'|'extend'|'demolish'|'repair'|'convert'|'decay'|'clear';
  storeys?: [number, number]; footprintM2?: [number, number]; material?: string /* a duration row only (item 67 (b)); never a shape input */;
  weeks?: [number, number] /* working weeks, drawn once; absent on a decay row, whose span is the decline table's dwell band × 52 */; factor?: number /* a decay row's material factor: timber and thatch 0.6 */;
  stages: { stage: WorksStage; from: number /* a fraction of the duration */ }[] }
interface WorksTable { rows: WorksRow[]; labour: { band: string; factor: number }[] /* the duration × the factor of the plot's band */;
  pauses: { material: string; climate: string; seasons: ('spring'|'summer'|'autumn'|'winter')[] }[]; retainWeeks: number /* 52 */; enabled: boolean /* false in the parity presets */ }
```

`WorksTable` lives in `@plat/tables` (`works.json`, §14), editable with provenance (§7.6); its decay rows read the decline
table's dwell bands, never a second number.

**Markets over epochs (item 24).** A secondary market the roster's suffix adds is claimed by the epoch's S7b in the new
stage or in a due district by §4.5 S7b (3)'s rule; a market whose institution closes (the use step) keeps its square — a
plaza or a `market_green` — until a `clear` or a claim reuses it, so no market moves by wealth change alone.

**Informal clusters over epochs (item 70 (e); J-A70.48).** On the weekly clock a cluster grows by accretion: delta
households of its band placed on an informal plot add structures by §4.7's packing on the plot's free path sites, each a
`build` Works of days (a shack) or less than a week (a tent, finished in its week); rung 1's `densify … infill` on an
informal plot adds structures in that way too. A destructive circumstance event (rung 3's trigger) burns a cluster fast — its
structures `decayed` and drawn CHARRED in one week, then cleared. When its district's band rises past the hysteresis a
cluster is cleared or **formalised** by rung 3 in the due epoch (the replaceability of tents and shacks is `immediate`,
§10.2): its households re-homed by item 17's relocation or re-let, the plot cleared, re-cut by S10 (7) into row-house
plots and built by S11 at the new band. In decline, a vacant, cleared or ruined plot of a district whose value fell past
the hysteresis at the epoch takes tenure `informal` (§4.7) and may take a cluster. Each step is an event of this section's
kinds; the engine that schedules them is the staged one.

**Lights, deposits and conditions over epochs (items 68 and 88).** A light follows its host (§4.7's *Light sources*), and
an epoch re-runs the light rows on its new and changed faces only. A `DepositSite` (§2.7; staged, empty in the base) whose
state changes converts the land use it anchors: `depleted` or `removed` — its quarry, mine or claypit `abandoned` and
drawn worked out (a deposit depleted at creation drawn so from the start); `discovered` — a new outside site sited by
S12a's rows at that epoch. A `ConditionOverlay` is read as *Works* (10) states.

=== APPEND TO SECTION ### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values) ===

**The rows of items 70–72, 78, 79, 82 and 88 — their types and default rows.** The fields `RosterTables` and
`BuildingClassRow` name above are typed here; how each is read is the section named beside it. Every row is our own,
calibratable (§13.9) and an `extension` — zero, a step or empty in the parity presets (item 23) — unless it says otherwise.

```ts
interface ClassMixRow {   // item 71 (§4.7's Class mix inside a band): one row per band of the band set; a band without a row interpolates (§4.5)
  band: string; weights: { cls: string /* a residential class id */; weight: number; wealthShift: number /* × (wealthLevel − 0.5), §4.7 */ }[];
  prestige: { frontage: 'tier1'|'square'|'park'|'corner'|'water'; weight: number }[] /* §4.7's prestige order */ }
interface ClusterRow {   // item 70 (§4.7's Informal clusters): by band × climate × era
  band: string; climate?: string; era?: string; kinds: { cls: 'shack'|'tent'|'lean_to_shelter'; weight: number; footprintM2: [number, number]; depthM: number }[];
  householdsPerStructure: { rung: string; range: [number, number] /* households.built of a structure, drawn in the range on siteplan */ }[];
  pathWidthM: number; fireGapM: number; wholeBlock: number /* the share of eligible blocks S10 (7) joins into one informal plot */; relations: RelationRule[] }
interface TenureRow { band: string; informal: boolean /* this band's plots with no standing building but shacks, tents or lean-tos are informal (§4.7) */ }
interface QuarterIdentityRow {   // item 72 (d′) (§4.5 (4)): an emergent or dossier-declared identity
  id: string; families: { family: string /* a class tag */; weight: number }[]; threshold: number; perHa?: boolean /* the threshold per hectare of the district */;
  bands?: [string, string] /* the district's band within */; priority: number; singular: boolean;
  power?: string /* the power kind its quarter dial follows */; sector?: string; kind?: string /* the S6 kind an epoch re-types a district to past the hysteresis */;
  definedBy?: string /* a district-defining class (BuildingClassRow.distribution): the identity a dossier instance of it claims */; targetShare?: number /* its share of that district's placed uses */;
  magicOnly?: boolean /* admitted only where the magic circumstance is not 'none' or the dossier lists an arcane power */; naming: string /* the naming slice its names draw from (§10.4) */ }
interface PowerLinkRow { element: 'gate'|'wall'|'tower'|'bridge'|'road'|'quay'|'market'|'tollHouse'|'customsHouse'; powers: { kind: string; weight: number }[] }   // item 72 (d″): the infrastructure's powers (the classes' are their `powers` column)
interface SectorLinkRow { element: PowerLinkRow['element']; sectors: { sector: string; weight: number }[] }   // item 72 (d4): the infrastructure's sectors (the classes' are their `sectors` column)
interface BandRangeRow { band: string; lower: [string, string] /* [floor, ceiling] for a district in the band's lower half */; upper: [string, string] /* in its upper half */ }   // item 72 (d‴) (§4.5 (5))
interface SectorRow { id: string; tags: string[] /* the class tags whose classes serve the sector by default */ }   // item 78: the sector set `CircumstanceSlice.economy` is keyed by (§7.7 item 2)
interface PortRows {   // item 88: the staged rows the dossier port fills (§14) — schema-complete and empty in the base
  impairments: { type: string; physical: boolean; conditionSteps: number /* physical: condition steps per severity band; non-physical types read §4.5's institution dial only */ }[];
  hinterland: { importPct: number; foodChain: Record<string, boolean>; farmlandScale: number /* §4.9's own farmland × (1 − importPct × farmlandScale) */ }[];
  crime: number | null /* 0–1; the factor of §4.6's hidden share and of II.7.3's access */;
  customKinds: { kind: string; criticality?: number; economicWeight?: number; defenseRoles?: string[]; powerAuthorities?: string[]; fallbackClass: string /* the class a custom kind is built as */ }[];
  legitimacy: number | null /* on the government record: × the governing power's amplification in §4.5 (6)'s institution dial, 1 while empty */ }
```

* **Class mix (item 71).** Default weights over the residential classes — squalid: shack 0.5, hovel 0.4, row house 0.1;
  poor: hovel 0.3, row house 0.6, cottage 0.1; modest: row house 0.6, cottage 0.2, house 0.2; comfortable: row house 0.3,
  house 0.6, town house 0.1; prosperous: house 0.5, town house 0.35, manor 0.15; rich: manor 1.0 — the manor share thus
  rises monotonically from the prosperous row to all manors in the rich row; `wealthShift` manor +1.0, town house +0.5,
  house 0, row house −0.3, hovel −0.6, shack −0.8; prestige weights `tier1` 1.0, `square` 0.8, `park` 0.6, `water` 0.6,
  `corner` 0.4. The parity presets make each band row one class, its class rows' `lifestyleBand` pool (a step at each cut).
* **Clusters and tenure (item 70).** Squalid: shacks 0.5, tents 0.4, lean-to shelters 0.1; poor: shacks 0.7, lean-to
  shelters 0.2, tents 0.1; footprints shack 6–20 m² (depth 3–4 m), tent 6–15 m² (round or oblong, depth 3 m), lean-to
  shelter 4–12 m² (depth 2 m); households per structure 1 at TOWN, up to 2 at CITY and up to 3 at METROPOLIS in the squalid
  row, while the poor row gives 1, 1 and up to 2;
  `pathWidthM` 1.2, `fireGapM` 1.0 (in the squalid row 0.8 at CITY and METROPOLIS), `wholeBlock` 0.2 in the squalid row, 0
  otherwise; relations `nearWater` and the lee of walls and ruins, soft. The `shack`, `tent` and `lean_to_shelter` class
  rows (distinct from the `lean_to` frontage treatment): `drain` `none`, `replaceability` `immediate`, cellar 0, one floor,
  a programme of the one-room unit with no circulation, `households` from the cluster row. Tenure: squalid and poor
  `informal: true`.
* **Distribution and significance (item 72).** `distribution`: `singular` for the cathedral, a great temple, the palace, the
  castle, the university and the principal market's hall; `district-defining` for the dossier kinds that are districts (a
  red-light district's brothels, the slums, a foreign quarter, a guild district); `dispersed` for every other class.
  `significance`: cathedral, great temple and palace 30; castle 20; university 15; church 8; guildhall, town hall and
  market hall 5; chapel 3; inn 1.5; workshop 1; shop 0.5; lodging house 0.3; house 0.2; cottage 0.1; shack and tent 0.05.
* **Quarter identities (item 72).** The religious quarter (families religion; chapels and churches 1, a cathedral or a
  great temple 3; threshold 3; power `religion`; kind `temple`); the craftsmen's quarter (craft 1; 0.6 per hectare; power
  `guild`; kind `craft`); the merchants' quarter (trade and warehouse 1; threshold 5; bands prosperous to rich; power
  `company`; sector trade); the harbour quarter (harbour 1; threshold 4; kind `docks`); the garrison quarter (military 2;
  threshold 4; power `military`); the learned quarter (learning 2, a university 5; threshold 5); the arcane quarter (arcane
  1, a mage tower 3; threshold 3; power `arcane`; `magicOnly` — the row a Mages' Quarter naming claim biases toward, item
  82); the defined districts (the red-light district `definedBy` its brothels, `targetShare` 0.15; the slums `definedBy`
  the dossier's slum kind, kind `shanty`, the squalid band's rows); and the plain residential identities, one per band,
  lowest priority. Each row's `naming` slice is our naming pack's (§10.4).
* **Powers and sectors (items 72, 78 and 79).** The classes' `powers` column — guildhalls and workshops `guild`; merchant
  houses and warehouses `company`; churches, chapels and temples `religion`; the castle, manors and keeps `lordship`; the
  town hall and the courthouse `council`; barracks and guard posts `military` (item 79's kind); mage towers and alchemists
  `arcane` (item 79's kind, only where the magic circumstance or a dossier arcane power admits it); the clandestine
  classes `criminal` — each an association the dossier's `Institution.powers` overrides (§2.7). `powerLinks`: gates 0.5
  `military`, 0.5 `council`; walls and towers `military`; bridges, roads and quays `council`; the market square `council`;
  the toll and customs houses `council`. The sector set (`sectors`, item 78): trade, taxes and tolls, crafts, agriculture,
  extraction, fishing, finance, religion, military, magic, crime. The classes' `sectors` column and `sectorLinks` (the
  owner's examples as rows): markets, warehouses and quays → trade; gates, toll houses, bridges, roads, walls and the
  customs house → taxes and tolls (0.7) with trade (0.3) on gates, bridges and roads; workshops and guildhalls → crafts;
  farms, mills and granaries → agriculture; quarries and mines → extraction; fisheries → fishing; moneylenders → finance;
  churches → religion; barracks → military; mage towers → magic; the clandestine classes → crime.
* **Band ranges (item 72).** squalid: squalid–poor in both halves; poor: squalid–modest; modest: poor–comfortable;
  comfortable: modest–prosperous; prosperous: comfortable–rich (the middle band to rich, item 71's mix); rich: prosperous–
  rich in its lower half, rich alone in its upper half.
* **Notice posts (item 82).** A `notice` pin stands at the principal market and at each gate plaza by default (§4.7's
  furniture step), at the main entrance of every class whose `tags` hold `notice` (a town hall, a market hall, a
  guildhall), and wherever a named-feature claim of the dossier names one (§7.7).
* **The port's staged rows (item 88).** `portRows` is declared in full and empty; a row the port fills acts only through
  the reader its comment names (the hidden share of §4.6, the farmland of §4.9, the access of II.7.3 and the dials of §4.5 (6)), and while empty every factor is 1 and every list empty.

=== APPEND TO SECTION ### 10.3 People, households, relations, sub-locations, schedules ===

**Lit windows, cluster households, standings and the week (items 68, 70, 76, 79 and 88).**
* **Lit windows (item 68).** At the view's hour (the `time` key, above) the module's occupancy selects the lit windows — a
  building is lit while its sub-locations hold anyone awake at that hour. Without the module a dwelling is lit in the
  evening hours of the lighting row (`lights.windowHours`, 17–22 h by default; our own row, `extension`) while its
  households live there at the drawn week (§4.11's Works), and a workplace during its `openingHours` rows (§10.2). Window
  lights are derived per view — §8.4's derived sources, never records; the `FTG` preset lights each lit building at its
  main entrance only (§4.7's *Light sources*).
* **Cluster households (item 70).** A cluster structure houses the cluster row's households per structure (§4.7's
  *Informal clusters*, §10.2); their people derive as any household's.
* **Standings (item 79).** The module's faction influence field (above) takes its weights from the base's power standings
  (`CircumstanceSlice.powers`, §7.7 item 2) — the inputs the base's own dials read (§4.5 (6)), which need no module. A
  dossier-backed `Person` (§2.7; staged with the port, item 88) is pinned, housed by rule in the district of its
  institution or its power's seat, and never derived away.
* **Hours are not weeks (item 76).** The module's calendar counts hours for the `time` view key; it is never the map's
  week (§4.11's clock) and never compared with it.

=== APPEND TO SECTION ### 10.4 Names, descriptions and setting packs ===

**Names from character, claimed names, stage words and clusters (items 67, 70, 72 and 82).**
* **Names follow character (item 72 (c)).** S13a names a district from its identity (§4.5 (4)): the identity row's `naming`
  slice, whose feature guards read the district's dominant components — its trade (Tanners' Row), its anchor institution
  (Temple Hill), its power (the Guildquarter), its gate or trade bearing (the Northgate — the gate of the largest trade
  weight among its routes, §4.3) or its terrain. A name once given is kept: a district whose identity changes past its
  hysteresis at an epoch re-draws its name on its `naming` stream by §6.3's epoch case (J-A72.44), the old name kept in
  `District.nameHistory` (the reader shows it as a former name; the change is reported); a protected name — a `setAttr`,
  a lock, an assignment, a claimed name — is never re-drawn. A quarter node's name reads its members' dominant identity
  (§9.1).
* **Claimed quarter names (item 82).** A quarter the dossier names becomes the name of whichever district §7.7's claim rule matches,
  protected as an assigned name (§2.8's dormant naming record) and re-matched only past §4.5 (9)'s identity hysteresis;
  an unmatched claim waits, reported, never forced (§7.7).
* **Stage words (item 67).** A building's description reads its Works stage at the drawn week: "being built", "being
  extended", "being demolished", "under repair", or "ruined since" the calendar year of the ladder event that ruined it
  (§4.11).
* **An informal cluster (item 70)** takes one place name from our naming pack's cluster slice, drawn once for the
  cluster plot on its `naming` stream, and one label (§9.1); its structures are unnamed.

=== APPEND TO SECTION # PART III — What a later village product needs from the base (one page; the hooks are concrete) ===

**A dossier below the town floor (item 81; owner's ruling, J80 Q3).** A dossier whose population lies below 1 500 is
refused by the port (§7.7, item 81: `E_RUNG_UNAVAILABLE`, naming the village product) while no village product is
registered — the dossier's population is a dossier fact, and a clamped town would contradict it — so a village-sized
SettlementForge settlement waits for the village product's own port path, which registers its rung rows behind the same
port (§14) rather than a second one; §1.1's clamp to a 1 500-person TOWN stays for a request that carries no dossier.

=== J-ROWS ===
| J-A76.45 | every per-unit-time chance of §4.11 stated per year (II.6's island slots by the same rule, J-A67.40) and applied over an epoch's span as 1 − (1 − p)^years; dwell bands and ladder durations in years read as weeks ÷ 52 | §4.11, II.6 |
| J-A67.41 | a physical change decided and recorded at once by its event; a `Works` record shows it on the ground over its weeks, its stage derived at any week and never stored; no new `Existence` value (J-A8.46 stands); an engine `demolish` tombstones at once, its Works keeping the shell; a hand edit instant unless scheduled; an abort is the change's undo | §4.11, §2.7, §7.1 |
| J-A67.42 | a Works' duration scaled by the labour factor of its plot's band (richer, faster) on top of the uniform draw in its `WorksTable` row's range (E2's `works` concern, J-A67.61) | §4.11 |
| J-A67.43 | material admitted as a duration row of `WorksTable` only (stone builds and decays slower), never a shape input; J-A31.42 stands for replaceability | §4.11, §2.6 |
| J-A67.44 | a join or split changes the plot rings when its event lands; the removed lines kept in the Works and drawn dashed until the build's GROUND BROKEN (a demolition's RUBBLE) stage, new lines as stakes from STAKED and as fence or wall from WALLS RISING | §4.11, §2.5, §8.2 |
| J-A67.45 | the drawn week: the document's current week (the last folded event's) unless the per-viewer view key `week` names another; scrubbing over live Works and those finished within `works.retainWeeks` (52); earlier history by the log's replay; old Works retired by epochs | §4.11, §2.9 |
| J-A67.46 | the decay Works carries the dwell band: `vacate` starts a decay Works whose duration is the dwell band drawn once; the lottery's decay candidates are the buildings whose decay Works has run its span | §4.11 |
| J-A67.47 | no Works at generation: the creation week shows a finished town; Works come only from dated events (epochs, dated dossier changes, scheduled edits) | §4.11 |
| J-A67.48 | restraint by construction: an epoch's Works start at weeks spread uniformly over its span, so the share under works follows the growth or decline rate; a staged `ConditionOverlay` scales it | §4.11 |
| J-A76.41 | the map's week is SettlementForge's `calendar.elapsedWeeks` (never `elapsedMonths` or `history.age`); `EpochInputs.week` absolute, `years` derived from the weeks, one field serving item 67's span; "our simulator" is the map's history clock (host or engine), never `@plat/sim`'s `time` key; epochs by the cadence, never one per tick | §4.11, §10.3 |
| J-A76.42 | one calendar: `CalendarRow` with the dossier's `sf445` row and our default of the same shape, read by the Works' pauses, §8.2's season rows and the module, superseding a separate `WorksTable.calendar` | §4.11 |
| J-A76.43 | the roster tolerance ± 5 % as the one number for the epoch cadence's population trigger and §7.7 item 3's lapse | §4.11, §7.7 |
| J-A76.44 | a churn cap scaled by a fractional `years` keeps its fractional part, as a chance of one extra, drawn on `epoch.transform` keyed by the district, the kind and the epoch | §4.11 |
| J-A81.41 | at each epoch the rung profile is read at the population target; an upward crossing the frame cannot hold grows the frame by an S1-derived ring and one L0 batch, the old arena byte-identical; the frame never shrinks | §4.11, §3.2 |
| J-A77.41 | `TradeFlow` declared and derived at §4.3: road partners to the gate of nearest bearing, water partners to the harbour; a way's trade weight the sum of the gate weights whose routes run along it; a derived cache, never canonical | §4.3, §2.9 |
| J-A101.41 | a skeleton's drawn declarations read ahead by the stages that own their subjects as the base derivation's constraints (the form Rebuild around my drawings gives them, without a rebase), their `creation` events folding nothing twice | §4.1, §7.4 |
| J-A68.41 | lights placed by rule: "partitioned" read as distribution by way class, district and band; street-light spacing solved from the row's target illuminance; each district lights its own half-strip, the two sides alternating; the `FTG` preset one light at each lit building's main entrance, the `MFCG` preset none | §4.7, §8.4 |
| J-A70.41 | a plot's tenure derived (owned, rented, common, informal) from the owner record, the band and the standing stock, with a `setAttr` override, never an independent draw | §4.7, §2.5 |
| J-A70.42 | the `cluster` arrangement takes the default preset's informal squalid and shanty plots, subsuming the tents row there; the parity presets keep FTG's tents row and MFCG's hovel | §4.7 |
| J-A70.43 | clusters placed by FTG's trigger and staging as the emulation default, the extramural preference kept as J-A27.43's soft extension row (the owner's words name no wall); never on a middle-floored standing plot or in a district whose range excludes the squalid band | §4.7, §4.5 |
| J-A70.44 | a cluster structure's main entrance faces its footpath — §2.6's rule 1 read as for a hidden plot | §4.7, §2.6 |
| J-A70.45 | clusters packed paths first: a trunk footpath from each access edge and alternating branches, structures fronting the paths, the paths plot-internal `footpath` yard parts narrower than an alley | §4.7, §2.5 |
| J-A70.46 | households per structure a rung × band row of our own, clamped by §2.6's capacity through a one-room, no-circulation programme | §4.7, §10.2 |
| J-A70.47 | lean-to shelters only against a standing wall on their own plot, never inside a wall strip | §4.7, §4.8 |
| J-A70.48 | clusters over epochs: accretion as short build Works, fire as a destructive event (charred, then cleared), formalisation by rung 3 under `immediate` replaceability, informal tenure on declining ground | §4.11 |
| J-A71.41 | the class mix as a draw of the residential class above the template, so J-A19.41 holds within a class | §4.7, §10.2 |
| J-A71.42 | the town-wealth shift read from the intent's `wealthLevel` (with a dossier, its derived wealth), never from the town's relative field mean | §4.7, §7.7 |
| J-A71.43 | a block's classes drawn as a multiset at each plot's value, then assigned largest first to the plots in descending frontage prestige, hard relation rows first, larger classes joining plots | §4.7 |
| J-A71.44 | a household takes any class the mix gives a plot within its band ± drift; S2's land estimate reads the mix's expected plot area at each band's centre | §4.7, §4.2 |
| J-A72.40 | the dials' passes: the institution dial on pass 2's institution kernels, the quarter dial and the pressure on pass 1's `characterOffset` (at generation only for dossier-declared quarters), the economy dial on class kernels in both passes | §4.5 |
| J-A72.41 | "character" has one meaning — `CharacterVector` is the derived five-component profile on `District.character`; the per-district input becomes `DistrictIntent` (§7.7) | §4.5 (with §2.5, §7.7) |
| J-A72.42 | typing before placement, identity after it: S6 keeps its feature-named typing; S12c derives the identity after placement; a plain residential identity by band is an identity, never a kind; an epoch re-types a kind only past the identity hysteresis | §4.5, §4.1 |
| J-A72.43 | the roster's town-level character read from the economy slice's sector shares, so one input drives the roster and the economy dial | §4.2 (with §4.5, §10.2) |
| J-A72.44 | renames at epochs: a district whose identity changed past its hysteresis re-draws its name on its naming stream, the old name kept as a former name; protected names never re-drawn | §10.4, §6.3 |
| J-A72.45 | significance = the class's value × rank × size × patronage weighs every count, share and dial | §4.5, §10.2 |
| J-A72.46 | dispersed classes spread over all districts by affinity with a controlled random share; FTG's sub-district clumping kept for the parity presets and as an option inside one district | §4.5 |
| J-A72.47 | the pressure a persisted per-district scalar, a leaky sum of the clamped excess (retaining 0.5), written only by epochs and read by the next epoch's field | §4.5, §4.11, §2.5 |
| J-A72.48 | a shared building's amplification a blend partitioned by relative standing or share, its contributions split the same way, never a sum | §4.5 |
| J-A72.49 | the economy dial proportional to a sector's share over the even share (neutral at an even mix, no rank term), scaling class kernels | §4.5 |
| J-A82.41 | notice posts by default at the principal market, each gate plaza and every class tagged `notice`, beside the dossier's named-feature claims | §4.7, §10.2 |
| J-A88.41 | the staged crime term as multipliers on the hidden-share target and the basement-access probability, 1 while the port's row is empty | §4.6, §10.2 |
| J-Fpipe-2 | a way a carve or a water move cuts in two: the batch that re-keys its far part re-points every record naming the way by id along it (`Frontage.way`, `Bridge.way`, `Gate.way`, `Greenery.along.way`, `Junction.arms`, `Tunnel.follows`, `SeamEdge.chain`, `Portal.wayId`, `SeamAmendment.spine`) — the identity exception the locality oracle admits beside the seam exception — and the far part keeps the parent's name | §4.11 |

=== RATIONALE-A ===
| J-A76.45 | Chose to state every chance of §4.11 per year and apply it over an epoch's span as `1 − (1 − p)^years` (dwell bands and ladder durations staying in years, read as weeks ÷ 52), — item 67's second route ruling, taken under item 76's clock — over keeping the rows "per epoch", because once the map's clock is the week (item 67; item 76's cadence folds epochs at each 52-week boundary or sooner on a population move) a per-epoch chance would fire as often as epochs happen to come — a town advanced in small steps would silt its harbours and shift its rivers many times faster than one advanced a decade at a time — while a per-year rate composed over the span gives the same expected change for the same elapsed time whatever the cadence; II.6's island slots take the same rule by their own row (J-A67.40) (§4.11, II.6; items 67 and 76). |
| J-A67.41 | Chose to keep every physical change decided and recorded at once by the event that makes it, and to show it on the ground over weeks through a `Works` record whose stage at any week follows from its start and duration, over storing a stage per week or letting the model change at the stages (a building becoming `built` at FINISHED by a completion event), because the log alone then determines the model — no week-driven model change, no completion event, undo and the mutation record exact (J-A67.49), a scrub never touching the model — while the owner's "show stages of it being built" is met in full by the drawing; no new `Existence` value is needed (the ruin stages are the ladder's drawn stages, J-A8.46), an engine `demolish` tombstones at once while its Works keeps the shell's rings and heights to draw the demolition, a user's `build`, `demolish` or `convert` stays instant unless scheduled with `startWorks` (so the base's edit semantics are unchanged), and stopping a change is its undo, while `cancelWorks` only ends its timeline, the change drawn finished (§4.11, §2.7, §7.1; item 67, route rulings 3 and 4). |
| J-A67.42 | Chose to scale a Works' duration by the labour factor of its plot's band — richer builders faster — on top of the uniform draw in its row's range that E2's `works` concern makes (J-A67.61), over a duration that ignores prosperity, because item 67 (b) keys the durations by "prosperity (labour and money)" beside class, size and material, and a rich patron's house did rise faster than a poor family's; the factor is a table row, so the parity-free default can be tuned or flattened (§4.11; item 67 (b)). |
| J-A67.43 | Chose to admit material as a duration row of `WorksTable` — stone and brick building and decaying slower than timber and thatch — and nowhere else, over keeping material out of the durations, because the owner's rule is that material "has nothing to do with the shape", whereas a duration is time, not shape, while realism (the design tiebreaker) makes a stone house slower to raise and slower to fall; J-A31.42 stays true for replaceability, which is still never keyed by material (§4.11, §2.6; item 67, route ruling 5). |
| J-A67.44 | Chose to change the plot rings of a join or a split when its event lands and to keep the removed boundary lines, with their treatments, in the Works so the drawing can show them dashed until the work clears them (the build's GROUND BROKEN or a demolition's RUBBLE) and a new line as stakes and then as its fence or wall, over changing the rings only at a late stage, because ownership changes at the start (the owner's "Lots need to merge or separate"), the kernel's rings then follow from the events alone, and the old line — gone from the arena — needs a kept copy to be drawn at all (§4.11, §2.5, §8.2; item 67 (g), route ruling 6). |
| J-A67.45 | Chose to draw the document's current week — the last folded event's — unless the per-viewer view key `week` names another (a host's campaign week, a user's scrub), scrubbing live Works and those finished within a retention span of 52 weeks over the current model and leaving earlier history to the log's replay, over storing a history of drawings, because a view key never touches a digest, the drawing at any week is already a pure function of the records and the week, and the log replay is the design's one way back in time (§4.11, §2.9, §7.4; item 67 (a), route ruling 7). |
| J-A67.46 | Chose to make the decline table's dwell band the duration of a `decay` Works that `vacate` starts, and the lottery's decay candidates the buildings whose decay Works has run its span, over a separate decay timetable beside the dwell bands, because the owner's "decay years to decades" and the ladder's lag are one fact, which this states once, and the DECAYING stage (a holed roof, a sagging ridge) then shows how far along its dwell a building is (§4.11; items 8 and 67 (f); J-A8.47). |
| J-A67.47 | Chose to create no Works at generation — the creation week shows a finished town — over drawing a share of the newest buildings under construction, because a generated town has no recorded history to say what is being built, a share without a growth rate would be invented, and the static baseline stays byte-identical to the references' timeless maps (item 23); the first epoch, a dated dossier change or a scheduled edit brings the scaffolds (§4.11; item 67 (i)). |
| J-A67.48 | Chose to spread an epoch's Works starts uniformly over the weeks since the previous epoch, over starting them all at the epoch's week or capping the share by a separate table, because the share of stock under works at any week then follows the growth or decline rate by construction — a steady town a few scaffolds, a boom town many, a declining town ruins, as the owner's restraint rule asks — and a staged `ConditionOverlay` can still scale it when the dossier reports a siege or a plague (§4.11; item 67 (i), item 88). |
| J-A76.41 | Chose SettlementForge's `calendar.elapsedWeeks` as the map's week with no conversion — never `elapsedMonths`, a derived legacy field, nor `history.age`, a frozen second clock — and `EpochInputs.week` as the absolute week with `years` derived from it, over item 67's recommended per-epoch `weeks` count, because one absolute week serves both the Works (item 67's span is the difference) and the port's dating, a standalone call can still give `years`, and epochs follow the cadence rather than every tick, the Works' stages being derived from the week at any drawing; "our simulator" is read as the clock that changes the map's inputs — the host's or the staged engine's — never `@plat/sim`'s `time` view key, which changes nothing (§4.11, §10.3; items 67 and 76; the plan's J-M9). |
| J-A76.42 | Chose one `CalendarRow` type — the dossier's `sf445` row for a bound map and our default of the same shape for a standalone one — read by the Works' pauses, §8.2's season rows and the module, over a calendar inside `WorksTable` beside the module's, because two calendars could disagree on when winter falls, while one row keyed by the map's source keeps the season of a campaign week SettlementForge's own (§4.11; items 67 and 76). |
| J-A76.43 | Chose the roster tolerance of ± 5 % as the one threshold for both the cadence's early epoch and §7.7 item 3's lapse, over any population difference, because the dossier's population drifts by a few people almost every week and the owner's words for a lapse were "if a settlement grows or declines", which a drift is not; one number keeps the two readers agreeing (§4.11, §7.7; item 76, the plan's J-P6). |
| J-A76.44 | Chose to keep a churn cap scaled by a fractional `years` exact in expectation by taking its fractional part as a chance of one extra, drawn on `epoch.transform` keyed by the district, the kind and the epoch, over flooring it, because under a cadence of short epochs a floored cap of a small district would be zero at every epoch and nothing would ever change there, while the keyed draw adds no stream and no stored carry (§4.11; items 31 and 76). |
| J-A81.41 | Chose to read the rung profile at every epoch's population target and, where an upward crossing needs more room, to grow the frame by an S1-derived ring and one L0 batch that replaces the margin and border chains, the frame never shrinking, over a rung fixed at creation, because a dossier's town may cross a band as it grows (its tier moves under SettlementForge's simulator) and the kernel seat found no mechanism for a frame that grows after the document exists; keeping every face inside the old margin byte-identical makes the growth local, and a declining town keeping its frame loses nothing it had (§4.11, §3.2; item 81 (b); the kernel seat's finding). |
| J-A77.41 | Chose to declare and derive `TradeFlow` at §4.3 — road partners assigned to the gate of nearest bearing, water partners to the harbour, a way's trade weight the sum of the gate weights whose routes run along it — as a derived cache in `Document.derived`, over storing trade weights on the ways, because the direction trade flows from is a map fact derived from the dossier's partners and the road-and-gate geometry (item 20 (h)), it must follow every gate or road edit, and the routes S4 already solved carry exactly the gate-to-plaza flow the owner's "spatial flow of trade … to main streets" names (§4.3, §2.9; items 72 and 77). |
| J-A101.41 | Chose to read a skeleton's drawn declarations ahead in the base derivation, each by the stage that owns its subject, as the constraints the "Rebuild around my drawings" form gives them — with no rebase, the prefix's events folding nothing twice — over folding them after the base derivation with local repair, because an emulated city needs its bones before it grows (its gates before its streets, its walls before its infill), and a skeleton re-imported under one seed must reproduce the city byte for byte (§4.1, §7.4; item 101 (b), (i), ruling 2). |
| J-A68.41 | Chose to place lights by rule rows read against their context, with street lights spaced by solving the row's target night illuminance from each light's intensity, height and radius, each district lighting only its own half-strip, the two sides alternating, and to read the owner's "partitioned" as distributed by way class, district and band — the medieval default sparse, rich streets lit, poor alleys and hidden plots dark — over lights at a fixed spacing or a free scatter, because the owner asked for lights "appropriately spaced" with "optimal distances", a spacing derived from what a light gives meets that exactly, the half-strip rule keeps the laziness contract, and the parity presets keep FTG's one window light at a building's main entrance (its night-light anchor, item 50) and MFCG's none (§4.7, §8.4; item 68). |
| J-A70.41 | Chose to derive a plot's tenure — common, informal, rented or owned — from its owner record, its band and its standing stock, with a `setAttr` override, over an independent stored draw, because tenure follows from the buildings standing and who lives there, a derived value stays coherent through every edit and epoch, and a user can still fix it by hand (§4.7, §2.5; item 70 (a), route ruling 1). |
| J-A70.42 | Chose to let the `cluster` arrangement take the default preset's informal squalid and shanty plots, subsuming the tents row there, while the parity presets keep FTG's tents row of 1–3 tents and MFCG's hovel, over keeping the tents row in the default, because the owner describes "a lot of … shacks on one block", which three tents cannot show, while emulation-first keeps the references' own look in their presets (§4.7; item 70 (b), route ruling 2; item 23). |
| J-A70.43 | Chose FTG's shanty trigger and staging as the emulation default for where clusters stand, keeping the extramural preference as J-A27.43's soft extension row, over placing clusters "outside the enceinte" as a rule, because the owner's words name no wall and Fable's review found FTG's own rule says nothing of the enceinte; realism adds our soft preferences (riverbanks, marsh margins, the lee of walls and ruins), and the band range keeps clusters out of districts whose range excludes the squalid band (§4.7, §4.5; item 70 (d), route ruling 3). |
| J-A70.44 | Chose to face each cluster structure's main entrance onto its footpath, reading §2.6's rule 1 as it is read for a hidden plot, over requiring a street-facing door, because a structure in a cluster has no street face and the owner's "each one deserving of a door" is met only by a door on the path that reaches the plot's access edge (§4.7, §2.6; item 70 (b), route ruling 4; J-A29.21). |
| J-A70.45 | Chose to pack a cluster paths first — a trunk footpath from each access edge and alternating branches, then structures fronting the paths — with the paths as plot-internal `footpath` yard parts narrower than an alley, over scattering structures and repairing access afterwards, because building the paths first guarantees every structure its door on a path that reaches an access edge by construction, as frontage-first plots guarantee every plot its way, and paths that are yard parts leave the plot's access edges, exposure and the way graph unchanged (§4.7, §2.5; item 70 (b), route ruling 5; J-A30.42). |
| J-A70.46 | Chose a table of households per structure by rung × band, clamped by §2.6's capacity through a one-room programme with no circulation, over a fixed one household per structure, because the owner's "more people in each depending on how big the city or town is and how low the prosperity is" needs both inputs, and the one capacity function keeps every structure within what its floor can hold (§4.7, §10.2; item 70 (c), route ruling 6). |
| J-A70.47 | Chose to set lean-to shelters only against a standing wall on their own plot — a ruin's, a party wall, a plot wall — and never inside a wall strip, over the item's "the town wall's outer strip where the band allows", because a strip's band, setback and glacis are kept unbuildable by a hard invariant for the defence line and a lean-to there would break it; a neglected wall's strips stay strips until a conversion removes them (§4.7, §4.8; item 70 (b)). |
| J-A70.48 | Chose to express a cluster's life over time through kinds the design already has — accretion as short build Works of the packing, fire as a destructive circumstance event leaving charred structures then cleared, formalisation as rung 3 under `immediate` replaceability, informal tenure on the vacant, cleared or ruined ground of a declining district — over new cluster-specific operations, because each already has its trigger, its churn cap and its undo, and the owner's "grow by accretion", "burn fast" and "formalised when prosperity rises" are exactly those events on the weekly clock (§4.11; item 70 (e), route ruling 8). |
| J-A71.41 | Chose to make the class mix a draw of the residential class itself (hovel, row house, house, town house, manor — each with its own template) above the templates, over mixing rows of one template, because J-A19.41 then holds within a class — a template's discrete columns still switch at the cut — while the class follows the gradient as the owner asked ("keeping with the idea that it is gradient"), and no designation template has to be re-ruled (§4.7, §10.2; item 71 (a), route ruling 1). |
| J-A71.42 | Chose the intent's `wealthLevel` (with a dossier, the wealth §7.7's derivation table derives) as the town-wealth input that shifts the mix, over the town's own mean prosperity, because the field is relative by construction — its bands follow the town's own shares — so its mean cannot tell a rich metropolis from a poor town and would cancel the owner's "and the prosperity of the city" (§4.7, §7.7; item 71 (b), route ruling 2). |
| J-A71.43 | Chose to draw a block's classes as a multiset at each plot's value and assign them largest first to the plots in descending frontage prestige, hard relation rows first and larger classes joining plots, over a soft prestige term inside per-plot draws, because an assignment by order makes "a street of grand houses with modest ones behind" certain rather than likely, keeps the mix's proportions exact, and still yields to item 16's hard rows (§4.7; item 71 (c), route ruling 3). |
| J-A71.44 | Chose to let a household take any class the mix gives a plot within its band ± drift, and to have S2's land estimate read the mix's expected plot area at each band's centre, over pairing classes to bands one to one, because the owner lets a prosperous neighbourhood hold "middle class to rich man manors", the drift already bounds how far a household's band and its plot may differ, and demand and capacity stay in agreement when the mix draws a larger class (§4.7, §4.2; item 71 (d), route rulings 4 and 5). |
| J-A72.40 | Chose to enter the institution dial on field pass 2's institution kernels, the quarter dial and the pressure on pass 1's district term — at generation the quarter dial only for dossier-declared district-defining quarters — and the economy dial on class kernels in both passes, over one pass for all, because each input is known at a different stage: institutions are placed by pass 2, a district's emergent identity only after placement (its dial then enters from the next epoch), and the economy's shares from the start (§4.5; item 72, route ruling 10). |
| J-A72.41 | Chose to give "character" one meaning — `CharacterVector` the derived five-component profile on `District.character` — and to rename the per-district input it named `DistrictIntent` (§7.7), over keeping `character` for the input and adding a new `profile` field, because the owner's "what defines a neighbourhood" is the derived character, three undeclared uses of one type name needed one reading, and the input remains as the overrides that shape generation (§4.5 with §2.5 and §7.7; item 72, route ruling 1). |
| J-A72.42 | Chose to keep S6's feature-named typing before placement and derive the identity after it (the S12c step), a plain residential identity by band being an identity and never an S6 kind, and to re-type a kind at an epoch only past the identity hysteresis, over re-typing districts after placement at generation, because S8 to S11 read the kind, so re-typing after placement would be circular, while J-P1's "no district is zoned residential or by class" still holds for the typing; the names and descriptions read the identity (§4.5, §4.1; item 72 (a), (d′), route ruling 2). |
| J-A72.43 | Chose to read the roster's town-level character (mercantile, ecclesiastic …) from the economy slice's sector shares, over a separate character input, because one input then drives both the roster's ratios and the economy dial, and a dossier's economic make-up reaches the town's demand without a second, possibly contradicting, field (item 72, route ruling 3; item 78; the roster in §10.2, S2 in §4.2, the dial in §4.5). |
| J-A72.44 | Chose a new naming case at epochs — a district whose identity changed past its hysteresis re-draws its name on its own naming stream, the old name kept as a former name, a protected name never re-drawn — over names fixed forever or renamed at every change, because the owner's "this assignment also helps to assign names" asks names to follow character, the hysteresis keeps them stable, and real quarters keep their outdated names as the item's former-name rule does; §6.3's rule that features are not naming inputs stays true for generation and edits (§10.4, §6.3; item 72 (c), route ruling 4). |
| J-A72.45 | Chose a per-class significance scaled by rank, size and patronage to weigh every count, share and dial, over counting instances, because the owner warned that more lodging "doesn't mean that anything related to lodging is more prosperous than churches" — value, not volume (§4.5, §10.2; item 72 (d″), route ruling 5). |
| J-A72.46 | Chose to spread dispersed classes over all districts by affinity with a controlled random share, keeping FTG's sub-district clumping for the parity presets and as an option inside one district, over clumping by default, because the owner asked for smiths, alchemists and churches "dispersed out across all neighborhoods and districts, randomly someone with more than other some may not have it at all", while emulation keeps FTG's look where it is asked for (§4.5; item 72 (d′), route ruling 6; COV-FTG-E02). |
| J-A72.47 | Chose a persisted per-district pressure — a leaky sum, retaining half each epoch, of the excess the dials and amplifiers would push past the district's range — written only by epochs and read by the next epoch's field, over discarding the excess or letting buildings break the range, because the owner bounded buildings by their neighbourhood "until the neighborhood itself upgrades", which needs the excess to accumulate somewhere and lift the neighbourhood over time; reading it as upward pressure is the program's interpretation, flagged to the owner (§4.5, §4.11, §2.5; item 72 (d‴), route ruling 7). |
| J-A72.48 | Chose to partition a shared building's amplification by the relative standing of the powers (or the shares of the sectors) it serves, normalised to one, and to split its contributions the same way, over summing its amplifications, because the owner said shared buildings "should not get a double amplification, but a partition amplification relative to the strength of both or more powers" (§4.5; item 72 (d5), route ruling 8). |
| J-A72.49 | Chose an economy dial proportional to a sector's share over the even share — neutral at an even mix, with no term for rank — scaling the class kernels, over a bonus for the leading sectors, because the owner corrected the item to "there's like a market share however, much any one controls, the market share affects their application", so a 40 % sector amplifies its classes twice as strongly as a 20 % one (§4.5; item 72 (d4), route ruling 9). |
| J-A82.41 | Chose default notice posts at the principal market, at each gate plaza and at each notice-tagged class's main door, beside the dossier's named-feature claims, over posts only where a claim names one, because a town's public notices stood where people passed — the market and the gates — and a standalone map has no claims; the defaults are our own extension rows (§10.2 and §4.7; item 82). |
| J-A88.41 | Chose to apply the staged crime term as multipliers on the hidden-share target and the basement-access probability, each 1 while the port's row is empty, over a separate crime layer, because the dossier's crime figure then shapes the hidden places and the ways down that items 30 and 64 already build, and the base is unchanged until the port fills it (§4.6, §10.2; item 88). |
| J-Fpipe-2 | Chose to have the carve's batch (1) — and S1's water operator, which cuts ways the same way — re-point every record that names a cut way by id along its re-keyed far part (`Frontage.way` on the blocks fronting it, `Bridge.way`, `Gate.way`, `Greenery.along.way`, `Junction.arms`, `Tunnel.follows`, a `Seam`'s `SeamEdge.chain`, `Portal.wayId` and `SeamAmendment.spine`) in the same batch, to admit those id-only changes as an **identity exception** the locality oracle checks beside the seam exception (each record equal to its prior with the old id replaced; everything else outside the footprint `R` byte-identical), and to give the far part the parent's name and naming record without a draw, over three alternatives: leaving the records as they were (the `rekey` moves only edge role rows, §3.4, so `Frontage.way` and the rest would name the near part, whose spine no longer bounds those blocks — a dangling reference against §5.3's reference-integrity row, and the fixtures' "byte identity outside `R` less the seam exception" would fail on every canal that cuts a lane); one `Way` record with a gap, as a breached wall keeps one record (a way's spine is one L1 chain, §2.4, and a linear entity in more parts than it declares fails §3.10's role consistency — the reason the rekey exists); and re-deriving the far part's blocks with `R` (cells the canal never touched would change, against the owner's "everything not involved keeps its exact geometry and identity", item 22 (b)). II.6's tunnel split already re-points `Frontage.way` on the underground blocks (J-A11.43), so this states the same discipline once for ways. The name: a street a canal severs stays one street on both banks under the realism tiebreaker, and a fresh draw would rename a street the user never touched (§6.3's succession cases). Found by the Fable review of the round-3 pipeline draft (VP2-1's footprint, J-P34): the gap was introduced with batch (1)'s rekey sentence and closed by no later round (§4.11; from Fable's pipeline review of 27 September 2026). |

=== END ===
