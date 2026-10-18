# repair-r3-pipeline — the block file of lane amendments-b/repair-pipeline-r3 (PIPELINE part: §4, §10, PART II,
# PART III). Its report, ledger and assembler notes: docs/validation/amendments-b/repair-pipeline-r3-report.md.
# Text before the first "=== " line is ignored. Base: docs/ARCHITECTURE.md sha256 831efd429092adf3…,
# docs/ARCHITECTURE-RATIONALE.md sha256 f2c2a1ca11a0f1da… (assemble-r2's output). Each REPLACE body is the live
# subsection with count-asserted substitutions (scratchpad rp3b/gen.py); every untouched line is verbatim.
#
# ASSEMBLER HAND-OFF
# (1) RESTATED ROWS. The J-ROWS and RATIONALE-A blocks carry restated rows under existing ids J-A30.41, J-A28.46 and
#     J-A11.43 (index and Part A each): move each appended row into the older row's place and delete the older row
#     (assemble-r1-handoff.py's swap_restated, as assemble-r2-handoff.py step 1 runs it). One new id: J-A20.43 (index
#     and Part A), appended.
# (2) This file REPLACEs §4.1, §4.6, §4.7, §4.11, §10.2 and II.6 (pipeline-owned). No other round-3 file replaces them.
# (3) Pointers into other round-3 files: §4.1's stale list follows §2.8's gloss as V-MAB2-06 (model) words it; §4.7
#     points to §2.6's capacity rule (V-MAB2-01, model); §10.2's basementAccess comment to §2.6's Basement.access
#     derivation (V-MAB2-10, model); II.6 to §6.3's tunnel SPLIT rule (VP2-05, determinism). §4.11's paragraph
#     *Dossier content across epochs* is the one §7.7 item 2 and §5.3's row point to (VD2-01, determinism), under
#     J-A20.75 as the determinism file restates it.

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
  roster, S3's reservations, S6's field bands, S7b's and S10a's allocations, S12a's hinterland siting, and S10's
  shared-edge step (0), whose bands lie on L1 edges two face sets share (§4.7; J-I9). The per-district stages S10, S10b,
  S11 and S12b — for every district and for the hinterland unit — may run lazily or in the pool; they read those records
  and their own sub-stream only and **write only inside their own faces**. S12b is held to the same rule: a district
  plants avenue and street-tree rows only in its own half-corridor strips, and an edge orchard is a hinterland allocation
  row built by the hinterland unit, never by the district (§4.9). So any order of derivation — viewer, worker, headless —
  gives the same model (CI: the derived-complete digest test, §6.5 (9)). S8 is eager: it runs in the generation worker,
  district by district in lineage order, and its only writes outside a district's own faces are the vertices where its
  lanes end on a bounding spine, each a `baseLane` portal in the shared `Seam` record (§4.6, II.1). S13a's names and label
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
  | S12a, S10a, S10b | none — decisions and records (field pass 2 is a raster); the hinterland's geometry is written by its unit's S10–S12b |
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

=== REPLACE ### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule ===
### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule

S8 runs per district (one batch each, districts in lineage order in the generation worker) on every coarse face of the
district except its reservations (a reservation inside a face is a hole) and its wall strips (faces S8 never cuts, §4.8)
whose kerb polygon — `kerb(F)`, the kernel's single kerb function: the face minus the buffered spines, §3.7 — is larger
than **the district class's block band** (the granularity table, §4.7, at the district's pass-1 band), floored by the
stage regime's band (§4.4). In walled regimes the faces are district-scale (S5c grew only arterial-connecting
secondaries), so this recursion produces every intramural lane and secondary and propagates the wall's and the shore's
direction into the fabric (MFP-2). S8 plans each cut on `kerb(F)` of the current L1 faces, inserts each accepted lane at
L1 in the district's transaction, extended to the crossed spine as a T-junction (step 7), and recurses on the children's
kerbs; S9's `corridorUnion` then commits exactly those kerbs (contract test "S8's working block ≡ S9's committed block,
Hausdorff 0", §13.2), so no `insetRing` by corridor half-widths is needed (GEO-20). **The wall is a barrier:** S7 has cut
each enceinte's wall strips off the faces beside the trace (§4.8), so the `kerb(F)` of a face beside a wall stops at the
strip's boundary — the inner setback line, or the intervallum's kerb where the era row has one — and no cut is planned
through a wall's band or setback; the band, tower and gatehouse faces are built later inside the strips by S10's step (0)
(§4.7), so S8 never meets an L3 face. **Test:** on every walled B-CITY seed, 0 lanes cross a wall strip and 0 L3 band
faces are cleared or split by an L1 batch.

**Sides (GEO-22).** Before any rule reads a side, the face boundary is reduced to **runs** (the kernel's `sideRuns`,
§3.4): maximal boundary chains whose cumulative turning stays within 10°, each with its chord direction; a crossing
street's fillet arc is replaced by its virtual corner (NG PF-1's method). "Perpendicular to a side" is measured against the
run's chord or, on a curved run, against the tangent over a ± 5 m window at the contact point — never against the one short
segment a cut happens to hit on a Chaikin-smoothed, round-joined kerb. M0 (b)'s face set is §16's.

**The recipe (MN-3; `profile-neighbourhood.md` AN-6, PF-2, BG-1 — the measured default).** Given a face F:

1. **Stop test.** `obb(F)`; if the OBB minor extent < the band's upper bound, F is a block. **Slope term (COV-MFCG-C05):** on
   a face whose mean slope exceeds 5 %, the working major axis is the OBB major axis rotated toward the contour direction
   by the weight `min(0.5, slope / 0.3)`, so cuts on a hillside run with the fall line and blocks lie along the contours
   (MFCG's one elevation effect is on exactly the alleys).
2. **Position.** Draw `f ~ N(0.5, σ)` as a fraction of the (working) major axis — σ = 0.066 on plain faces, 0.098 on holed
   or annular faces — with an outlier term: with probability 0.03 draw `f` uniform over [0.15, 0.85] instead (NG's 2–5 %
   tail); no clamp (the measured law is bell-shaped with no pile-up at a bound); `f` outside [0.1, 0.9] is redrawn once
   from the same stream. Stream `cut.t`.
3. **Start.** The minor-axis line at `f` meets F in one segment around the OBB centre's projection (for a concave face, the
   segment containing the point nearest to it); its two ends are the candidate starts, one on each long side, which
   defines the start and far sides for any face shape — triangles, C-shapes and curved faces included. A coin
   (`cut.side`, p = 0.5; the table row `cut.sideLongerBias` records NG's unconfirmed 2 : 1 lean in plain faces and
   defaults to 0.5) picks the start A. Leave A exactly perpendicular to its run.
4. **Far side (J-P16).** The side hit by the perpendicular ray from A (NG's R1: right in 66 % of cuts, the best face rule
   measured). `cut.farSideAlt` (default 0) is the probability of taking the next reachable side instead.
   **Measurement:** M0 (b) compares our block-area, cut-length and junction-angle distributions with NG's on the same
   faces. **Fallback:** if they fail the KS test with R1 alone, `cut.farSideAlt` is set to 0.34 (NG's measured mismatch
   rate) and the test re-run; if that also fails, the far side is taken from the minor-axis line through A (NG's R4) — each
   step a table value, not a code change.
5. **Straight or bent.** If a straight cut would reach the far side within 2° of perpendicular, keep it straight along the
   mean of the two run normals (NG: 83 of 86 straight cuts join roads within 4–6° of parallel); otherwise place **one corner
   at half the perpendicular projection A–F** (F = where the first leg's line meets the far side; NG AN-4: within 0.05
   chord of the course midpoint in 96 of 120 cuts) and drop the second leg perpendicular to the far side's run. Two bends
   never (3 / 519).
6. **Fillet (COV-NG-N19).** With probability 0.53 (NG: 201 / 379, no predictor found; stream `cut.arc`) replace the corner
   by an equal-chord circular arc whose **tangent length is `r_t` × the shorter leg**, `r_t ~ N(0.73, 0.10)` clipped to
   [0.54, 0.87] (NG PF-2 e: p10 0.54, p50 0.73, p90 0.87, ρ = 0.94 with the shorter leg) — the radius follows from the
   legs, never a constant; chord steps equal and ≥ the lattice minimum edge.
7. **Ends in the model (GEO-21).** Each junction end is extended along its arrival direction from the kerb to the crossed
   spine and inserted there as a T-junction (`splitThrough`, §3.4), so the L1 face splits and the lane joins the street
   graph, the junction census, betweenness and R3. NG's "stop half the crossed road's width short, square caps" is the
   renderer's stroke rule, which S9's corridor union and junction wedge produce without model trimming. A cut end that
   meets a dead end or a hole follows §3.6's contact semantics (an antenna end becomes a T-junction; a hole is joined by
   `connectHole`, §3.4). An end that arrives at a wall strip's setback line — a boundary with no spine — stays there,
   square to the line, as a lane ends at a reservation; an end at the intervallum is a T-junction like any other.
   **Seam portals (J-P32).** When the crossed spine bounds the district — an arterial or a boundary secondary — the
   T-junction's vertex lies on a chain two districts share, so S8 records it as a `baseLane` portal, with its
   `SeamAmendment`, in the shared `Seam` record of that boundary run (II.1), which both districts' contracts read. A
   planned end inside the **portal gap** of an existing portal on that spine — max(6 m, 2 × the wider lane's width), a
   table row — slides along the spine out of the gap, toward the side that keeps its arrival within 85–95°; if neither side
   does, the cut takes its next ladder rung. So two districts' lanes never meet at one boundary vertex (the crossroads step
   10 forbids) and each portal vertex carries exactly one lane. When a re-derivation removes a lane, its end vertex loses
   its `portal` role (`removeEdges` on its `VertexRef`, §3.4) and is dissolved, its portal and amendment leave the `Seam`
   record, so the spine reads exactly as it did before the lane, and the neighbour step's reversal restores the
   neighbour's kerb (II.1 (3)). A district's effective scope — its own faces plus this **seam exception** (the chains,
   corridors, strips, wedges, neighbouring rings and `Seam` records its lane ends touch) — is §7.3 item 1's; every other
   entity of every other district stays byte-identical, and the locality oracle checks exactly that (§7.3, II.4).
8. **Transaction and ladder (GEO-23).** Before step 1, on any face with a reflex vertex deeper than the band's plot depth
   (L- and C-shaped faces, faces wrapped round a cul-de-sac antenna), a **reflex pre-cut** splits the face perpendicular
   to the reflex vertex's longer run, and antennae are split off at their roots (FTG's fix for "internal corners"). Then
   `splitFace(F, cut)` as a transaction; reject if either child violates `minEdge`, min angle or the class's minimum block
   width. The **ladder**, each rung under an operation-count work limit: (a) redraw `f` (≤ 2 more candidates, ≤ 3 in all;
   NG's ≈ 4 % "Alternative cut"); (b) the straight cut on the mean normal; (c) **the always-succeeding cut** — a straight
   cut perpendicular to the longest run through its midpoint, clipped to F's own component by boolean intersection (a
   clipped line cannot make four crossings); (d) substitution — F becomes a court, green or landmark block chosen from the
   district allocation's pending claims (NG's substitution rule, K6) — **only for faces ≤ 2 × the band's upper block
   area**; a larger face reaching (d) is cut by (c) again. No rung restarts anything above F. Every district reports the
   share of its built land left as court or green by substitution (soft bound ≤ 5 %), so MFCG's "empty areas inside city
   walls" cannot return silently.
9. **Width (COV-NG-N20).** The new way's width, one scalar per lane: `w = a_district + b · (L + e · n_free)` — `a` drawn
   once per district (NG: a per-seed intercept), `b` a rung-table slope, L the final course length, `n_free` its free ends
   and `e = 0.025 ×` the district's median cut length (NG: ≈ 5 model units per free end against median lengths of
   150–250); metres: alleys 2–3 m, lanes 3–5 m, and a cut longer than the lane length band in a walled regime is typed
   `secondary`. Never narrower than a lower class (O4 c). Template roads take fixed per-district widths (II.2).
10. **Continuation (J-P11).** A cut may **continue across an existing lower-or-equal-class street** when collinear within
   6° (the rare crossroads) — **only inside its own district**, never across a district-boundary edge (GEO-42).
11. **Recurse** on both children with their own sub-streams.

**The deep-interior rule (IMP-8, GEO-25; J-P15).** When recursion stops and a block's local thickness exceeds twice its
band's plot depth, the district's band row chooses the interior **now, in S8**, by target shares: `court` (a hollow block,
perimeter plots around a shared court — MFCG's donut and NG's hollow block), `back_lane` (a lane spine through the middle,
parallel to the longer frontage), `through_alley` (an alley spine joining two opposite frontages), `rear_plots` (a second
row of plots reached from the frontage through the front row). Default shares — poor: court 0.35, back lane 0.25,
through-alley 0.30, rear plots 0.10; modest: 0.45 / 0.30 / 0.15 / 0.10; prosperous: 0.65 / 0.15 / 0.05 / 0.15; rich:
0.75 / 0.10 / 0 / 0.15 — our own values, calibrated at M-1 on NG's hollow-block frequency in the vertex captures and
MFCG's inner-lot removal in the size-sweep exports; the rows are keyed by §4.5's band set (a band without a row
interpolates, item 27). The lanes and alleys chosen here are inserted as L1 spines in S8's own district batch (S10 never
writes L1, §4.1), so no sibling block is left stale; dense poor quarters get many narrow alleys and still keep courts,
rich quarters keep gardens behind their houses. Keep-test: the court share of deep blocks within band per class (§13.5).

**Hidden plots, and how a court or a rear row is reached (item 30; owner: "plots that do not have a direct access to
streets … only accessible via alleys … slums or hidden or clandestine places outside of public view").** A `court` or
`rear_plots` interior is reached from the public way in one of three ways — the block's **reach**, drawn here with the
treatment and recorded beside it (`Block.reach`, §2.5) — and S10 builds what the reach names:
* `open` — an open slot between two front buildings, an alley face (§4.7 S10 (9)) or the L1 spine of a `back_lane` or a
  `through_alley`: the court or rear row is in view from the street. This is the references' every-plot-fronts-a-street
  baseline — MFCG and FTG give every building a street, NG's infill yields open back lanes and courts — and the parity
  presets' only value (item 23);
* `passage` — a **covered way under a front building**: an L3 face of kind `passage` (an alley-as-face, §4.7 S10 (9);
  §2.5) of width `passage.widthM` (2.4 to 3.5 m by band) that S10 cuts along one side line of the front plot the rule picks —
  the plot of widest frontage in the middle third of the run — from the kerb to the court or the rear row; the front plot
  keeps its identity and its footprint ends at the passage's edge, and S11 gives its building a wing that **spans** the
  passage at every storey above the ground (`BaseWing.spans`, §2.6, which a composition inherits: the passage takes the
  ground storey's cells, the storeys
  above keep the frontage continuous; the plan rung reserves those cells, item 28). A passage is chosen only where the
  front row is continuous — the band's arrangement is `row` (§4.7 S11) — so the arch sits in a streetwall; where the
  buildings stand apart the reach stays `open`;
* `gated` — an opening in a frontage enclosure: the `PlotBound` gate of a compound's wall or a gatehouse arch (§4.7 S11)
  into a **private court** — a rich house's hidden garden court, a guild's or an inn's court — chosen only where the band's
  arrangement is `compound` or `detached`.

The reach weights are band rows — squalid and poor: open 0.25, passage 0.75, gated 0; modest: 0.70 / 0.30 / 0;
comfortable: 0.80 / 0.15 / 0.05; prosperous: 0.60 / 0.05 / 0.35; rich: 0.30 / 0 / 0.70 — interpolated along the prosperity
value, the non-open weights scaled by the density value (× (0.5 + density), so the densest blocks hide the most) and by
the rung (TOWN 0.6, CITY 1.0, METROPOLIS 1.2; the village rung rows are 0, PART III); the draw is the block's interior
draw (`cut.interior`, one pair: treatment, reach). Each band row also states its **hidden-share target** — the district's
share of plots whose exposure is `hidden`, below: squalid 0.20, poor 0.12, modest 0.04, comfortable 0.02, prosperous
0.04, rich 0.08, ± 0.03 — read for a district at its plots' area-weighted mean prosperity value (interpolated between the band
rows) and scaled as the reach weights are, by the rung's factor (TOWN 0.6, CITY 1.0, METROPOLIS 1.2) and by (0.5 + the
district's area-weighted mean density value), capped at one; the base weights are fitted at M-1 on B-CITY so that
every rung's districts meet their scaled targets, and §13.2's bar checks each district against its own (§13.7's row
holds the fit's fallback; our own values, calibratable, J-T; 0 in the parity presets and at every village rung). The share is made deliberately,
never left over: the slum's back courts and rear tenements behind a passage at the bottom, private gated courts at the
top, few in between (J-A30.41).

**Exposure — how a plot's reach is named (item 30 (a)).** When S10 types a plot's access edges it sets `Plot.exposure`
(§2.5) by reading the block's **interior access graph** — its plots, alley faces, passage faces and court residues, with an edge
between two nodes that share an L3 edge, and the public kerbs (the corridor edges of every L1 way, `alley` and
`cul_de_sac` spines included) as the roots — by adjacency and reach depth, never by a sight line (J-A30.42): `street` —
an access edge on the kerb of a `through`, `primary`, `secondary` or `quay` way; `lane` — on a `lane`, `cul_de_sac`,
`track` or `path` kerb (S8's back lanes among them) and none on a street; `alley` — only on an alley face or a
`through_alley` spine's kerb, each open to a public kerb at its ends; `court` — only on a court residue whose own reach to
a public kerb is one `open` step; `hidden` — every access edge lies on a face whose reach to any public kerb passes
through a `passage` face or a `gated` opening, or through two or more interior faces; `sealed` — a hidden plot whose every
reach passes a sealed passage (§2.8, §4.11). The access guarantee is unchanged: every plot, hidden ones included, has ≥ 1
access edge and a chain of access faces to a public kerb (F-PLOT, §5.2; the chain-reachability bar is §13.2's). Knowledge
is a separate fact: `knownTo` on the plot, building and institution records (§2.5, §2.6) takes §2.5's default and is
otherwise a dossier fact; it moves label visibility and the reader's answers (§9.2), never geometry, and a `local` or `secret`
institution prefers hidden plots through the placement solver's `exposure` row (§4.7 S10b, item 16). At the city band a
hidden court draws as a court behind buildings — ground and `court` tones under the building masses (§8.5) — never as an
empty block. Hidden plots arise, are sealed and reopen over epochs by §4.11's kinds, and a user seals or opens a passage,
hides or reveals a place, by §7.1's events; villages have no hidden share by default (PART III).

**Holes (the `BisectorEx` case, C13 — ours).** A cut that would cross a hole is routed to the hole's boundary (a *slit*,
committed by `connectHole`, §3.4), the annulus becomes simply connected, and the same ladder applies (σ = 0.098); this is
the primitive the stage-2 ring template needs (II.2). Cuts are inserted as `lane` / `alley` / `secondary` spines, so lanes
are real ways in the same graph (NG's look on FTG's substrate). Junction fillets at street corners are a style-time
smoothing (Urban Places' arcs), not a model change.

**Partition recipes (COV-MFCG-G03).** The same module exposes `PartitionRecipe` rows built only from the kernel's
`splitFace`, `radialSplit`, `ringBand` and `insetRing` (§3.4): `fan` (k radial cuts from the centroid with alley-width
gaps), `semiFan` (from a boundary vertex) and `ring` (an inset band around a court, split into segments by slit cuts, short
sides first). Park layouts (§4.9) and institution templates (cloister, quadrangle; §4.7 S11) use them.

**The strategy slot.** S8 calls `FabricStrategy.partition(district)`; the base registers `BentCutFabric`; stage 2
registers `RingFabric`, `SquareFabric`, `StreetFabric` (G-P2, §14).

**An alley that presents itself; back courts across epochs (items 29, 30 and 31).** For item 29's side and rear
entrances an alley "presents itself" exactly when this rule's `back_lane`, `through_alley` or `rear_plots` treatment,
or S10's alley rung and passage choice (§4.7 S10 (9)), gives the plot an access edge beyond its frontage (`Plot.access`,
§2.5); the entrance rules of §2.6 read that edge set and nothing else. Across epochs §4.11's rung 2 makes and unmakes such
interiors on standing plots: `densify … back_court` cuts a yard into rear plots reached by a new passage where the
passage choice above allows one and the plot's manifested band's row (§4.11's floor) carries a rear-plot or hidden share
— a middle-floored plot's yard is infilled instead — and `thin … back_court` clears one — its households re-homed and
its buildings vacated first, as §4.11's rung 2 states — and seals its passage, each a recorded event through this rule's shares, never a re-cut of the block's interior.

=== REPLACE ### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model ===
### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model

**S9 Corridors (L2).** `corridorUnion(l1Faces)` (§3.7), the single kerb function, commits exactly the kerbs S8 cut
against — half-corridor strips, junction wedges and **built blocks**. It runs once per district and once for the
hinterland's faces; a wall strip's L2 is its half-corridor strips along the arterials at its gates (and along the
intervallum, where there is one) and one built block, the strip block (§4.8). The main plaza is S3's reservation, typed
as a `square` face; other squares come from S7b claims sized from population (O7); gate plazas and forecourts from S7
(§4.8). Streets exist as geometry from here on; "negative-space streets" is purely a style, and §8's figure-ground
contract fills blocks in a ground tone.

**S10a Block allocation and field pass 2 (eager, town-wide; LC-2, FTG-1).** Each district's `Allocation` (S7b) is
distributed to its blocks in three declared steps, from the district's `alloc.block` stream (keyed from the district's
lineage; §2.5, §6.1), blocks by score then id: (i) the **field-driving classes** — noxious trades, middens, prisons and
institutions below a block — first, by scores that need no prosperity (downstream, downwind, extramural, frontage class,
adjacency); (ii) **field pass 2** adds their kernels to pass 1 (§4.5); (iii) every other class — households by band,
ordinary workplaces, shops — by capacity per band under pass 2, sub-districts receiving contiguous block groups sized to
their clusters (COV-FTG-E02). **The block score is S10b's rule score at block granularity (item 16):** a class's relation
rows and supply edges (§10.2) are evaluated against the block's context — its frontage classes, the distance rasters at
its centroid, the classes already allocated to it and to the other blocks of the town — so a brewery's block scores its distance
to the blocks that hold its maltings and granary and a tannery's block its downstream, downwind and extramural rows before
any plot exists; hard rows filter blocks, soft rows and supply distances weight them. The result is persisted as one
block-level `Allocation` per block. From here on every district's S10, S10b, S11 and S12b, and the hinterland unit's, is a
pure function of these records and its own sub-stream, writing only inside its own faces (§4.1), so the town's content
does not depend on derivation order, viewer order or worker count.

**S10 Plots (L3) — frontage-first with the granularity law (O5 / O18), per block.**
**(0) Shared-edge bands, eager (J-I9).** A block whose `interior` is `wall_strip` (§4.8) gets no plots. Its L3 content is
built **eagerly on the generation worker, after S10a and before the pool's freeze**, in one step that covers the strip
blocks on both sides of each trace at once — the band's cross edges split the trace, which the two sides' districts share,
so no district overlay may write it (§3.3 pool steps 1 and 3; cost §12.4). The batch commits, by `bandUnion` (§3.7), the
enceinte's half-band on each side of the wall edge; the rest of each strip — the inner setback, or the outer setback and
glacis, or the berm up to a moat — as typed unbuildable residue (`setback`, `glacis`; `ditch` in place of `glacis` on the
town side of an `on_enceinte` bailey whose castle template row asks for a dry ditch, §4.8); and each side's parts of every
tower and gatehouse on the trace. The same eager batch lays §4.5's **margin bands** along the settlement perimeter and
along any reservation boundary two districts share. The enceinte's `band` and `glacis` (its `ditch` parts included) and
each tower's and gate's `footprint` are the unions of these parts across the strip blocks (§2.7). S9 has already committed
the strip's corridors and nothing after S10 writes L1 or L2, so no batch ever clears or splits these faces. The step ends
by rebuilding the L3 static partitions it touched, so a pooled plot line finds the band's inner edge through the index
(§3.3 pool step 1). A regeneration re-runs this step one-sided for its own scope (§7.3 item 2). A castle's curtain band is
built the same way inside the bailey's blocks. The hinterland unit's S10 builds §4.9's hinterland recipe — furlongs,
outside lots, driveways, trails, woods and edge orchards — instead of frontage-first plots.

For every other built block: (1) classify each kerb edge as a frontage by way class; (2) read the block's context
(district kind, prosperity value and recorded band, density, growth stage) → the **granularity table** gives target
frontage-width and depth bands, a join maximum and a vacancy-run share, interpolated along the prosperity value and scaled
by the rung's `RungProfile.granularity` (frontage × and depth × on every band; the rich band's join maximum
+ `joinMaxDelta`; §1.1, AM-4) — `GranularityLaw.bands` takes the rung (§14). The band rows are §4.5's band set, whose
default cuts reproduce the references' wealth classes (item 27); every re-derivation other than a rung-3 event of §4.11's
ladder reads the block's **manifested band** — the field band raised to its plots' geometry floor by §4.11's block-level
reading (item 31; J-A31.43) — for every geometry row, and the field band for occupancy, condition and labels; the band row also carries the target share of
interior and hidden plots that S8's deep-interior rule and this stage's cut meet together (§4.6, item 30):

| band (default rows; all calibratable, J-T (§13.7)) | frontage width (m) | depth (m) | join max | vacancy-run share of frontage | reference anchors |
|---|---|---|---|---|---|
| poor / dense | 4–6 (log-normal, CV 0.25) | 12–20 | 1 | 0.03 | NG 95–99 % attached, party walls 39–43 % of perimeter |
| modest | 6–9 | 18–30 | 2 | 0.06 | FTG quad side median 10.3 m, footprint median 103 m² |
| prosperous | 9–14 | 25–40 | 3 | 0.08 | MFCG ≈ 18.6 lots per block |
| rich | 14–25 (joined) | 30–60 | 5 | 0.05 | "fewer, bigger buildings, bigger yards and courts" (owner) |
| institution / assigned | by requirement class | by requirement | whole block above a share threshold | — | FTG landmark-first |

(The block's `interior` — court, back lane, through-alley or rear plots — was chosen by S8, §4.6.) (3) **Claims first:**
institutions and assignments *smaller than a block* `claimSubFace` (which may span several faces, §3.4) the contiguous area
and frontage class their requirement demands — the requirement is the designation template's size budget (S11, item 19) —
before ordinary plots are cut (larger ones are S7b reservations already); claims-first covers every claim that exists at
generation: the roster's institutions and requirement classes, and every assignment or dossier element present in the
recipe when the town is generated (they enter S2's demand, so a brand-new map holds them from the start; §7.7, item 22 (d)).
An assignment or dossier element that arrives after the city is built is placed by S10b's solver and applied by S11's
mutation instead (§7.7). (4) **Per-frontage regions
(GEO-24; J-P13):** the block (minus claims and the S8 interior) is partitioned into one region per frontage run by its
straight skeleton, each region's depth capped by the skeleton height and the band depth — if the skeleton is downgraded
(F-SKELETON), a reflex pre-cut partition (a perpendicular cut from every reflex vertex, built exactly from `sideRuns` and
`splitFace`) is used instead; the validated skeleton arcs enter the arena through `insertChain` (§3.8) — and plots are laid
as strips perpendicular to each region's frontage, widths drawn from the band, depth = min(band depth, region depth); side
lines are bent lot cuts perpendicular to the frontage arriving at the region's rear line (the creator's stated use of the
primitive for buildings, `watabou-extra-a.md` §2.1); strips never leave their region, so reflex corners, notches round
cul-de-sacs and the inside of tight curves cannot produce overlapping or hourglass plots (property test: §13.2).
(5) **Corners and seams:** the corner plot takes the higher-class frontage and the shorter frontage's depth; the wedge left
between two regions becomes a corner plot when it meets the minimum width and angle, else a declared `wedge` class
(bounded < 0.5 %) or residue. (6) The residue is typed: `court` (from the S8 interior), `yard` (assigned to the adjacent
plot when its area < 1.5 × the plot), `green`, `vacant`, `shore` (the shore setback). (7) **Joins and splits, one law:**
strips are cut to the band's lower end, then a merge operator joins k adjacent plots (along a frontage, or back to back
keeping a frontage) up to the band's upper end, keeping `members`; poor bands stay at the lower end; both directions read
the same context vector — one code path (O18 g). **Orderings (item 31):** a join takes vacant or same-owner neighbours
first, then a rear plot into its front plot, then the frontage neighbour with the shorter frontage; a split takes the widest
frontage first, then the deepest yard. A designation's size budget (S11's template) is what a join is asked for — by this
stage at generation, by S10b's solver for a later placement (a JOIN request) and by S11's mutator when a designation
outgrows its plot. Across epochs the law runs in its incremental form — a due block re-cut with its neighbours fixed, under
§4.11's ladder, churn cap and geometry floor (item 31) — and a plot vacated by decline merges into a neighbour's garden or
a field by the same operator (`plotToGarden`, `amalgamate`; §4.11, item 8). (8) **Vacancy runs (COV-VG-VN-170):** runs of
frontage totalling the band's vacancy share, each at least one band frontage long, are left unbuilt from the
`plot.vacancy` stream — typed `vacant`, or a `garden` yard joined to the neighbour — so no built block is necessarily fully
ringed. (9) **Alleys:** slivers narrower than the minimum plot width that connect two ways become `alley` L3 faces, not
spines (GEO-25); where the frontage is continuous, §4.6's rule may reserve a covered **passage** under the front plot's
building instead of an open alley (item 30; the passage face is §2.5's).
(10) Every plot gets its `ContextVector`, its `DerivationRecord` and access edges (100 %, O5 a); NG's ≈ 42 % discard becomes
0 by construction. **Party walls** are shared L3 edges carrying the `party_wall` role in row classes, one edge per wall
(§2.2). **Unbuildable bands:** the shore setback (§4.2 S1 (8)), the wall strips — the band, the inner setback, the outer
setback and glacis (MFP-9; step (0)) — and reservations are never plotted; ribbon plots begin beyond the outer wall strip.
**Exact capacity check (FTG-2):** after the last block of a stage, plots per class × band are compared with the stage
quota; a shortfall goes to S10b's reconcile and the report (F-BUDGET-STAGE).

**S10b Placement (O7; per district; the allocation honoured) — the one placement solver (item 16).** Each block's allocated
classes are placed onto its plots by the **placement solver**, the one solver every path that puts a use on a plot calls:
this stage at generation, the hinterland unit's S10b on its outside plots, every `assign` event (§7.7), a dossier event
and a positive placement (§7.7, items 20 and 22) and the relocation of a use across epochs (§4.11, item 17). Its inputs are
data: the **relation templates** and **supply edges** of the class rows and the neighbourhood kinds (§10.2), the
per-assignment overrides of `PlacementCriteria` (§7.7) and the plot's `ContextVector` (§2.5).
* **Hard rows filter, soft rows score.** A relation row marked `hard` excludes every plot that fails it; the candidates
  that pass are scored `Σ_rows w_r · s_r(plot) + Σ_edges w_e · s_e(plot)`, each soft row's satisfaction `s_r ∈ [0, 1]` read
  from the context vector — a distance row decays by its `falloff` between `withinM` and `beyondM`; a `sameStreet` row is
  1 on the frontage way of the named class's nearest placed member, 0 otherwise; a `clustered` row rises with the number
  of the class's members within its radius; `band` and `exposure` rows compare the plot's band and `Plot.exposure` with the
  row's values (item 30) — and each supply edge's `s_e` decaying from 1 at the plot to 0 at the edge's `maxDistanceM` along
  its **mode** (below). Capacity rows (`plotArea`, `plotShape`, `frontageM`) read the template's size budget (S11): a hard
  capacity row a plot cannot meet is what a JOIN request answers (S10 (7)). Candidates are filled in descending score with
  capacity accounting, ties by plot id; households take residential plots of their band ± drift. The default rows are the
  references' own placement rules — noxious trades downstream and extramural (`upstream` high, outside the enceinte),
  mills and water trades on water, inns and the market hall at tier-1 junctions or gates (the market squares themselves are
  S3's and S7b's, item 24), religious precincts and faction turf as attractors, warehouses at the harbour, frontage class
  and area fit — and the rows the references lack (the supply edges, the upwind and high-ground rows, a trade clustering on
  one street) are soft rows whose weights the table's `placement.extensionWeight` cell scales (the default is 1; the parity
  presets that §13.6's side-by-sides run set it to 0; item 23).
* **Supply distances by mode (item 16 (b)).** `street` distance comes from the class distance rasters (16 m, one linear
  distance transform per class, below) as the land distance × the rung's detour factor (a table cell, default 1.3,
  calibrated at M1 against the way-graph Dijkstra on B-CITY; *pre-decided fallback:* the factor refitted per rung); `river`
  and `sea` distance is ∞ unless plot and provider both lie within the shore setback of one navigable water body (§4.2 S1
  (8)), else the distance along that body's bank chain; `road` distance is the `street` distance to the gate through which
  the provider is reached plus the provider's distance beyond it. A gate provides the `import` resources its bearing's
  trade row lists and the harbour those that arrive by sea, so warehouses and inns fall to the harbour and the gates by the
  same rows. Inside the pooled S10b a provider is **a block whose S10a allocation holds a producing class** (eager and
  town-wide, so the laziness contract of §4.1 holds) or a placed plot of this district; a post-build request measures to
  the placed plots themselves over the L1 way graph (one multi-source Dijkstra per provider class; budget §12.6). A hard
  supply edge with no provider inside `maxDistanceM` fails the plot; S2 has already demanded the producer (§4.2 S2's need
  propagation), so the failure is a siting shortfall, never a missing class.
* **Live-in (MFP-7):** craft and shop rows default to `liveIn`; a live-in household is sited first at its workplace and
  recorded as the building's `dwelling`, so the arterial frontages are shop-houses, not workplace strips, and
  residential-only blocks stay the exception (its block-level acceptance is §13.5's). **Outside classes, and under §4.9's
  `fill` farm mode the farm households,** are placed by the hinterland unit's own S10b (under `perimeter` and `rivers` the
  farm households are town households, placed by their districts' S10b) — the same solver over the outside plots its S10
  built at S12a's sites, whose seeding scores are the outside classes' relation rows (§4.9; FTG-7).
* **Requests after the city is built** — an assignment, a dossier element, a positive placement, a relocation — take the
  **least-disruption order**: vacant plots and vacancy runs first, then under-used plots (a yard part or an outbuilding
  the template can take), then plots whose present use can move within the same district (the displaced use re-placed by
  this solver with one further level of displacement at most — §7.7's `DisruptionBudgetRow.displacementDepth`,
  default 1 — never a cascade), then a JOIN with
  a neighbour by S10 (7)'s orderings. A rejected site (§7.7's rejection record, item 20) is excluded while its rejection
  holds, a locked plot always, and a pinned assignment's plot is fixed (§7.7's precedence). Among the candidates that pass
  the hard rows the order is lexicographic — disruption cost (§7.7's `DisruptionBudgetRow.weights` for the
  request's kind: per displaced use, per join, per subtracted part and per vacated plot), then score descending, then plot id — so the town changes as little as the rules allow. Every displacement, join
  and vacated plot is a lifecycle event of the causing edit (§2.8, §7.4), and the placed plot's buildings then mutate to
  the designation by S11's operator (item 18).
* **Reconcile and infeasibility (O18 f).** At generation a bounded **plan–fit–reconcile** loop (≤ 3 rounds) adjusts
  *inside the district's allocation* where a class finds no plot (one more JOIN; a class demoted within its band; surplus
  capacity typed as yards, greens or vacant plots); it never reaches into another district — moving demand between districts
  happens only in S7b's reconcile — and what it cannot place goes to F-SITING's ladder (§5.2), whose rungs this stage
  computes as: the reconcile above; then every **soft** row's weight set to 0 for the item; then the manifest reduced,
  lowest-priority classes first and never a dossier-backed item (item 20) — the report naming, for every unplaced item,
  the hard rows that blocked it and its **closest options** (the plots in order of the number of hard rows they fail,
  then score descending, then plot id — each with the rows it fails; J-A20.42). **A hard row is never relaxed
  silently:** a post-build request that no plot satisfies returns
  the same closest options as an F-EDIT action (§5.2) — choose one, relax a named row for this item, or withdraw — except a
  `dossier` request, which places at its first closest option with the hard rows it fails reported (§7.7's precedence,
  J-A20.71) — so placement never gives up silently (O18 f; FTG V1 "would regularly give up").
* *Mechanism (budget: §12.4):* context-vector distances come from per-feature-class distance rasters (16 m; one linear
  distance transform per class) computed once per model, and the provider rasters of the producing classes from S10a's
  block allocation the same way; S10b is a top-k over candidates pre-filtered by district affinity and requirement class,
  with incremental capacity. Both entry points exist, read from `recipe.entryMode` (§2.9): content-first (default) and
  layout-first (thumbnails, then populate). People are derived lazily from the household's key and pinned only by an
  explicit edit (§10.3).

```ts
interface PlacementItem { cls: string /* roster class id */; band?: string; designation?: Designation /* S11 */; count?: number /* generation: the block's allocation row */;
  id?: Id /* a Use, an assignment member or a dossier element being placed or re-placed */; criteria?: PlacementCriteria /* §7.7's per-assignment overrides of the class's relation rows */;
  pinnedTo?: Id /* a positive placement (§7.7, item 20 (g)) */ }
interface PlacementRequest { kind: 'generation'|'assignment'|'dossier'|'positive'|'relocation'; items: PlacementItem[]; scope: Scope /* the blocks or district the solver may use (§14) */;
  fixed: Id[] /* placed members kept (§7.7) */; exclude: Id[] /* locked entities */; rejected: Id[] /* plots under a live rejection (§7.7) */ }
interface PlacementResult { placed: { item: number; plot: Id; score: number; joined?: Id[]; displaced?: { use: Id; to: Id | null }[] }[];
  unplaced: { item: number; blockedBy: string[] /* relation-row and supply-edge keys */; closest: { plot: Id; fails: string[]; score: number }[] /* the closest options in S10b's order: fewest hard rows failed, then score, then plot id */ }[] }
interface PlacementSolver { place(req: PlacementRequest, ctx: StageContext, k: Kernel): KernelResult<PlacementResult> }   // one implementation, registered by name (§4.12, §14); its draws are the `siting` concern (§6.1)
```

**S11 Site plans and footprints (L4; O17; one batch per block) — the designation template and the designation mutator.** One
rule evaluation per plot, no search: the **designation template** — one per roster class (§10.2's `template` rows; item
19), keyed by band with its continuous columns interpolated along the plot's prosperity value and its discrete columns
switching at the band cut (§4.5) — gives the size budget (plot area, footprint area, floors), the structures (the slot list:
main building, workshop, forge, yard, court, stables, store, journeymen's rooms … by role and count), the arrangement,
coverage, setbacks, separation (party wall / slot / passage), front-line jitter (MFCG `Offset`, NG's uneven streetwall — a
parameter; a jitter below `minEdge` would collapse to zero by attraction, so the table's jitter values are {0} ∪ [25 cm,
max], §3.6), the frontage treatment of the main slot (none, lean-to stall, stall, shopfront, arcaded front, gate, wall), the
yard partition, the **boundary treatments** and the **specialisation** — the designation's variant in this band, with its
room programme (item 28, §2.6): a farrier or nail-maker in a lean-to forge, a general smithy with a yard, and a master
armourer or cutler with a storefront, a court and journeymen's rooms are three rows of one smith template (our own rows).
Density is a modifier column on coverage and separation. Geometry columns read the plot's manifested band
(§4.11's plot-level read); the specialisation and the programme read the field band, so a poor smith in a once-rich
shell is a poor smith in a big house
(item 31). **Every path that creates or changes a building reads this one table** — this stage at generation, the mutator
below on every designation change, S10b's relocation (§4.11) and every assignment (§7.7), whose drift bounds bound the
mutator's adapt and add steps relative to the template. Two smiths a few streets apart differ by degree along the value,
never by switch; the default rows reproduce the references' banding — FTG's lifestyle-banded building pools and MFCG's
ward-type sizes and spacing (§4.5's band set, item 27) — and the interpolation between rows is our extension. **Materials
are not template columns** — the material rule, texture and colour only, is §2.6's (J-A19.42).
The arrangement rows the template chooses among:

| arrangement | geometry | boundary treatment (default rows) | where |
|---|---|---|---|
| row | one or more footprints end to end along the frontage; **footprint = plot ∩ the frontage band of the row depth** (a boolean intersection, GEO-26; J-P14), so every party wall is the plot side line and, the block being one L4 batch, one shared edge even on bent or curved frontages; stored as one `quad` wing with its four corners recorded (`BaseWing.corners`; stepped quads on a slope, each with its own; J-P31, J-P39) and handed to `outline()` as fixed input (§2.6); depth from the coverage; rear yard | frontage none (the house is the frontage); rear wall (dense) or fence | dense and poor bands, shops, workshops (NG 95–99 % attached; FTG's warehouse rows) |
| set-back compound | hall or house set back behind a forecourt; **2–5 disjoint outbuildings** (stables, workshop, chapel, barn, brewhouse) placed by a small greedy packer on the plot's OBB grid around a court | **enclosure wall** (rich, prosperous) or fence, with a **gate on the access edge** (NG's walled manor compound) | manors, inns, temples, guildhalls, farmsteads (FTG's farmstead with a driveway) |
| detached | one OBB-aligned footprint at the frontage with side yards and a path to the access edge | frontage fence, railing (rich) or hedge, with a gate; side hedges | prosperous / semi-rural bands, sparingly (R4/R5) |
| hovel | one small footprint on the frontage of a plot that is mostly bare yard | none or a hedge | squalid bands, outskirts |
| tents | 1–3 small round or rectangular footprints (6–15 m², class `tent`, roof `tent`) with a fire-pit pin, dirt surface | none | squalid and shanty districts after the first half of the stages (COV-FTG-E07) |
| institution | the claim's own template (§2.6 footprint templates, the axis-locked composer, the `ring` partition recipe for a cloister) | wall with a gatehouse gap; churchyard wall | claims |
| vacant run | no footprint | wall (dense bands) or fence | vacancy runs (S10 (8)) |

Treatments are stored as §2.5's `PlotBound` records on the plot edges; they are drawn at district LOD as a stroke distinct
from buildings (§8.2's treatment row), **walled or fenced frontage counts toward O17 (d)'s streetwall continuity**, and walls and fences
export to VTT and GeoJSON (VIS-8).

The row arrangement's footprints are made here by the boolean above and passed to `BuildingGenerator.outline()` as fixed
`quad` wings, which it returns with heights and roofs and never re-fits (§2.6); every other arrangement's footprints come
from `outline()` itself — rectangles and L / T compositions as `rect` wings with per-wing ridge axes (VIS-10), footprint
templates and the axis-locked composer for institutions (COV-FTG-F16, COV-MFCG-G05) — each shaped inside its slot's
working hint (`SlotPlan.hint`, §2.5, which S11 never stores). **The first carry (J-P42).** S11 inserts each footprint's
rings through every wing vertex on the wings' union boundary and, when the block's batch has committed, carries every wing
onto the committed face by §2.6's wing-carrying rule — from the ring it inserted to the ring the kernel committed
(attraction may have moved a vertex up to `attractCm`, §3.6), each boundary run re-read from the committed rings, a rect
whose sides now carry other vertices recording its `corners` — so every stored wing's boundary runs are its footprint's
rings vertex for vertex and the union of a building's wings is its footprint face exactly (§2.6's check).
**Scale (COV-FTG-F09):** footprint targets are multiplied by the district's `buildingScale` (0.5–2, continuous; FTG's
"smaller / bigger" as a district edit or an `Adjust` regeneration). **Heights** from the class tables on every wing (floors
× storey height + roof rise by pitch; eave and ridge per wing; tower heights for keeps and church towers), with the
**ground datum** `baseCm` from the terrain by §2.6's `deriveBase` (FTG-13; J-P19) — carried although the top-down view never
shows them.
**Entrances:** the building's entrance set by §2.6's rules — the main entrance on the access edge 3 ± 1 m from the corridor
(FTG's measured rule, §13.5), side, rear and yard doors and the basement decision as §2.6 states (item 29) — re-derived
whenever the designation mutates (below); roof kind by class per wing (the style sheet chooses the construction, §8.2);
**materials** from `MaterialRow` (COV-FTG-F20; §2.6); **description, opening
hours and sub-locations** from the class table and the naming engine (COV-FTG-F21, FTG-11); yards partitioned into typed
parts.

**The designation mutator (item 18).** A change of designation — an `assign` or `unassign`, a `setAttr` on a plot's use or
class, a relocated use (§4.11), a dossier re-designation (§7.7) — never replaces the plot's buildings with a fresh roll.
`mutate(plot, to)` derives the new design from the present one by a recorded delta toward the target template, evaluated
at the plot's current prosperity (item 19 (c)):
1. **Match.** The present design's parts — slots by `BuildingSlot.role`, wings, storeys, roofs, entrances, yard parts,
   treatments, and a stored composition's or plan's rings (§2.6) — are matched to the target template's structures by role
   through a **compatibility table** (a house and a hall, a shop's storefront and a house front, a stable and a store, a
   workshop and a forge … our own rows, editable): each part is **kept** (it fits the target's role within the template's
   tolerance on size), **adapted** (kept with an attribute change — a storey added within the floors band, a wing extended
   within the size budget, a frontage treatment or a roof kind changed), **converted** (kept as another role the table
   allows) or **subtracted** (no role in the target and no protection); each required structure without a match is
   **added**.
2. **Order and draws.** Subtract, convert, adapt, then add, so the added parts pack around the kept ones on the plot's OBB
   grid by the compound packer (above) from the plot's `siteplan.mutate` stream (§6.1: a geometry concern keyed by the
   plot's lineage, so the same change from the same state draws the same numbers on every host, and a New random of the
   plot changes nothing past); added parts are minted from the causing event's `seq` and ordinal (§6.3), kept parts keep
   their addresses, subtracted parts become tombstones with the event's `seq` (§2.8). The old house stays recognisable
   inside the new workshop.
3. **Land.** When the target's size budget exceeds the plot, the mutator asks S10b's solver for a JOIN with a neighbour by
   S10 (7)'s orderings, the neighbour's use relocated by the same solver; when no join is allowed — a locked neighbour, a
   hard row — the template's `underSize` column decides: the compact rows, or a refusal reported with the blocking rule.
4. **Protection.** A locked part or path is never subtracted, converted or adapted (fate *kept*, §7.3 item 4); a
   user-edited attribute is kept (implicitly pinned, §7.2); an added part that would overlap a kept part is placed elsewhere
   on the plot or reported; the entrance set and the basement decision are re-derived by §2.6's rules on the result (item
   29), and the elaboration cache of the plan rung is marked stale (item 28).
5. **Record and reversal.** The steps are one `MutationRecord`, persisted in the causing event beside its fates (§7.1, §7.4)
   and cited by the plot's lifecycle event; the event's undo record keeps the former parts. Reversing the change — a
   designation set back, an `unassign`, an `undo` — applies the **inverse** of the recorded steps when the plot's design is
   still the record's result (its leaf digest, §6.2), restoring the earlier design exactly; otherwise a fresh forward
   mutation toward the earlier template runs and is reported as such.
6. **Timing.** A host or user change applies the whole mutation at once; across epochs the evolution engine spreads the
   same steps — occupy if compatible, then adapt, then extend, and rebuild only what cannot be adapted — as recorded events
   (§4.11, item 18 (c)).
7. **One path.** Generation is the mutation from the empty design: every structure an add, every draw from the plot's
   `siteplan` stream, so this stage's own batch and a later mutation are one code path (`@plat/plots`, §14); Regenerate
   (keep settings) and New random remain re-derivations (§7.1), and `rebuild` (§4.11) the whole replacement that a ruin or
   a redevelopment calls for (item 31's rung 3), never a designation change.

```ts
type Designation = { cls: BuildingClass; use: string /* the roster class id */; specialisation?: string /* the template's discrete row; absent: by band */; assignment?: Id }
interface MutationStep { op: 'keep'|'adapt'|'convert'|'add'|'subtract'; part: { kind: 'slot'|'wing'|'storey'|'roof'|'entrance'|'yard'|'bound'|'frontage'|'composition'|'plan'; id?: Id; role: string };
  from?: unknown; to?: unknown; rule: SliceRef /* the template or compatibility row read (§2.8) */ }
interface MutationRecord { plot: Id; from: Designation | null /* null: generation, from the empty design */; to: Designation; band: { field: string; manifested: string }; steps: MutationStep[];
  joined?: Id[]; displaced?: { use: Id; to: Id | null }[]; seq: number /* the causing event; 0 for the generation run */ }
interface DesignationMutator { mutate(plot: Id, to: Designation, cause: EditRef | RuleRef | 'generation', ctx: StageContext, k: Kernel): KernelResult<MutationRecord> }
// one implementation, registered by name (§4.12, §14); called by S11, by every assign, setAttr and dossier event (§7.7) and by §4.11's use step
```

**Furniture pins (COV-MFCG-I01, COV-FTG-J02, COV-FTG-J05; `pin.*` streams).** The main plaza always gets one centrepiece —
statue 0.6, fountain 0.3, market cross 0.1 by default weights (MFCG places one in every market square, 60 % statues) —
offset toward the plaza's longest edge for statues and for 30 % of fountains; each gate plaza gets a well, cross or trough
with probability 0.5; every block draws one **weighted decoration row** from a deck and applies it to its unused plots and
vacancy runs (wells, pumps, troughs, large trees); **singletons** — bandstand, statue, monument — are placed once per
district in an unused plot by a deck draw, campfires in squalid districts; **market stalls**, drawn as small tents, line each
market square's edge band and ring its market hall, by rank: the principal one per ≈ 150 m² of square (≤ 40), a
secondary one per ≈ 200 m² (≤ 20); a flanking principal market takes the main plaza's centrepiece rule and a secondary
market a centrepiece with probability 0.5 (our own rows, calibratable). What each band
draws — footprints, yards, treatments, pins, and the plot outline as an optional cadastral layer — is §8.5's.

**Markets and hidden plots in this stage (items 24 and 30; the rules are §4.2 S3 (12)'s, §4.5 S7b (3)'s and §4.6's).**
Every market square — the plaza when it carries the principal rank, a flanking principal market, each secondary claim —
takes the pins above by its rank; the market hall's `nearMarket` row (§10.2) binds it to the principal market by
default. A passage the block's reach names
(§4.6) is cut by S10 (9) as its `passage` face, and S11 gives the front building the wing that spans it; a hidden plot's
main entrance faces its access face — the court or the passage — as §2.6's entrance rules put a set-back building's on
the court that leads from its gate (item 29), so every plan roots at a door that opens onto the way its plot is reached
by.

**Vacant plots under decline (AM-8).** A plot whose last building is cleared or reused merges into a garden, orchard or
field by `plotToGarden`, or into its occupied neighbour by `amalgamate` (§4.11's ladders), through the merge operator of
S10 (7) with the neighbour's band; the band's vacancy-run share of S10 (8) is the design's deliberate vacancy: regrowth
never fills a run below its share, and decline's vacancies are counted apart from it.

**Households per building (item 28 (f); J-A28.46).** S10b places a residential plot's households — per residential slot
of the plot's designation template row at least one household and at most the row's `households.built`, by band ±
drift, a plot's slots filled in its slot list's order, required slots first (the capacity accounting above; the
capacity itself cannot be read there, because the building and its wings do not exist before S11). A residential slot
the demand cannot fill is dropped from the plot's site plan, its ground typed as yard, and a residential plot none of
whose slots it can fill is typed vacant by S10b's reconcile (above) — surplus capacity, never an empty residential
building. S11,
which creates each building and its wings, writes `Building.households` from its slot's households in address order,
clamped into [1, capacity] — §2.6's one capacity function, the one item 31's `relet` (§4.11) and F-PLAN's never-omit
rule (§5.2) read, evaluated on the wings it has just made. A household the clamp leaves, or whose slot S11 builds no
residential building for, moves by §10.3's relocation (its address and its people's keys kept): after the district's
last S11 block batch, still inside the district's derivation (a pseudo-district's alike), the overflow households are
re-placed in address order by S10b's solver over the district's residential buildings that house fewer households
than their capacity — the household's band first, then the bands its drift admits; score descending, then building
address — each move reported, and a household no building of the district has room for is an unplaced item of
F-SITING (§5.2), reported with the capacities that refused it. So the solver and the plan agree on how many households
a shell holds and no shell houses more than its capacity; the plan rung records the count among its inputs (§4.1). The
overflow pass runs inside every change §2.6's capacity rule lists — S11's operator building or changing a residential
shell (an epoch's new faces, a rung-3 re-cut, a designation mutation, item 18) among them — whenever the result's
capacity falls below its households, each move a lifecycle event of it (§2.8), as `relet` keeps to the capacity
(§4.11).

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
       the roster's households (the dossier's roster where one exists, §7.7) and item 17's relocation filling them (§10.3);
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
       by S11's mutator from the empty design. Slums arise where the stock was small and cheap to begin with, or from
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
    vacancy, ruin or a destructive event. Default rows:

    | replaceability of the standing stock (at `builtBand`) | years in the band before rung 2, growing rich / poor | rung 3 growing rich: fusion after purchase and vacancy | rung 3 growing poor: splitting |
    |---|---|---|---|
    | `immediate` | 0 / 0 | in the due epoch | on vacancy, ruin, a destructive event or redevelopment |
    | `short` | 0 / 10 | after 10 years in the band | the same |
    | `long` | 10 / 20 | after 30 years in the band | the same |
    | `ruin_only` | 10 / 30 | on vacancy, ruin, a destructive event or redevelopment only | the same |

  - **Churn.** The table's **churn cap** rows bound every epoch, per kind — `geometry` (rung-3 re-cuts and rebuilds),
    `fabric` (the decline lottery's strikes, below), `use` (the use step's relocations, below) — as a share of a
    district's plots (or uses) per decade, scaled by the epoch's `years`, and a maximum per block per epoch; defaults
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
  - **The epoch's order** (the engine's loop on the base's path). After S2's delta demand: (a) S6 re-evaluates the
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
    epoch writing `lapsedAt` inside its own touched set, and a lapsed site is eligible again from the next placement on.
    Each step's events cite the epoch; the whole is one `epoch` event's fold (§7.4). A dossier event between epochs is
    applied at its own log position by the same request and mutator (§7.7).
  - **Regenerate, Adjust and the derivation record.** A transformed entity's `DerivationRecord` is updated; every other
    plot keeps its record, so "Regenerate (keep settings)" on an untouched block reproduces it byte for byte, and
    re-deriving it with the new field is the explicit `Adjust` (authorial, above). Siting across epochs places only delta
    demand, in the regrowth-first order below.
* **Test (M4).** On a town with walled, ribbon and suburb regimes, adding a stage re-rolls 0 survivors, adds ≥ 1 primary
  when its gate law asks for one, and replays from the log to the session hash. The ladder's, the floor's and the epoch order's hook tests are §13.2's
  (item 31).

**Conversions** are typed plat operations with recorded events. `ConversionOp` is defined here, once, as one union: the
base's own kinds, the ladder's (`LadderOp`, item 31, the Survivors rule above), the decline hooks' (`DeclineOp`, item 8, below),
the use step's (`UseConversionOp`, item 17, below), the terrain and water conversions' (`TerrainWaterOp`, item 25, below)
and the passage sealing's (`HiddenOp`, item 30 (e), below); §7.1's `convert` event carries it, and `build` below is §7.1's
`build` event:

```ts
type ConversionOp =
  | { op: 'wallToWay'; enceinte: Id; widthCm?: Cm } | { op: 'gateToJunction'; gate: Id; square?: boolean }
  | { op: 'outskirtToDistrict'; region: { ring: Polygon; key: PlatKey } /* the outskirt faces it covers; no stored slots, §2.2 rule 5 */ } | { op: 'demolish'; id: Id }
  | { op: 'rebuild'; building: Id; cls: BuildingClass /* the whole replacement a ruin or a redevelopment calls for (rung 3), never a designation change (§4.7 S11) */ }
  | { op: 'build'; plot: Id; cls: BuildingClass; footprint?: PolygonCm /* as §7.1's build event */ } | { op: 'carve'; kind: 'canal'|'moat'|'harbour_basin'; polygon: Polygon }
  | { op: 'abandon' | 'decay' | 'ruin' | 'robStone' | 'clear' /* removed to a footprint trace */; building: Id } | { op: 'plotToGarden'; plot: Id } | { op: 'contractWall'; enceinte: Id; trace: Polygon }
  | LadderOp | DeclineOp | UseConversionOp | TerrainWaterOp | HiddenOp;
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
interface EpochInputs { years: number; populationTarget: number; circumstances: CircumstanceSlice; events: { kind: string; params: Record<string, number> }[];
  dossier?: EditEvent[] /* the host's dossier events (author 'host', EditBase.dossier set), in the host's order, applied at step (e) (§7.7 item 6) */ }
interface EvolutionStrategy { plan(doc: Document, inputs: EpochInputs, tables: TableView, rng: Stream): KernelResult<(ConversionOp | EditEvent)[]> }   // registered by name (§4.12)
// base registration: 'grow-by-stage' — the path above; the owner-staged engine registers its own strategy and reuses every event kind
```

The base builds and tests exactly one path — **add a growth stage to an existing town** — at M4 (G-P13), because it is the
same path "regenerate this area" uses.

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
as an inn first) and the naming engine may read (§10.4). Uses are visited in address order; one seed and one circumstance
timeline therefore give one history of openings, closings and moves; households and postings follow (§10.3).

**The epoch-spread mutation (item 18 (c)).** Across epochs a designation change is not applied at once: the engine issues
§4.7 S11's `MutationRecord` as a sequence of `mutate` events over the ladder's rung durations (item 31) — first occupy,
when the present design is compatible (every kept part, nothing added); then adapt; then extend (the adds); and rebuild
only the parts that cannot be adapted — the same steps and the same draws, spread in time, so a smith moving into a richer
street mutates toward the richer template over epochs.

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
placed at every step (§5.3's row).

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
  (II.6's condition table): in use → neglected, silted (`abandoned`) → partly caved in (`decayed`) → collapsed or sealed (`ruined`;
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
  | dwell bands (years) | vacant → derelict [10, 30]; derelict → ruin [20, 60]; ruin → cleared on salvage demand only; walls one band slower, tunnels two | the lag on the way down |
  | haul radius | 250 m | how far salvage travels |
  | exemptions | a locked or pinned entity is never struck; an assigned entity only through the use-relocation rule (AM-17); the building of a dossier-backed use only after that use is relocated (*Dossier content across epochs*) | the user's fixings hold |

* **The strike lottery** (the engine's step; the exposure function and the table are the base's). For an epoch whose
  target lies below the manifest, the suffix leaves in reverse ordinal order as the epoch's step (c) states — a `relet`
  down while households remain, `vacate` at a building's last household (J-A28.45); which
  standing fabric then steps down is drawn without replacement from a lottery over the candidates whose dwell band has
  run, weight `w = E(x) · rate(layer) · u`: `E(x) = clamp(Σ_j v_j · kernel_j(x) + ε_E(x), 0, 1)` the exposure field,
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
  target (§1.1) and re-evaluates II.6's supply law: an island whose supported area shrinks past the hysteresis is resized
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
  chance per epoch, each × the layer's persistence rate (0.005) and drawn from `epoch.transform` keyed by the water body's
  or face's lineage and the epoch (§6.1; no new concern, J-A25.42): `siltReach` — a reach whose accumulation has fallen, or a
  basin whose harbour use has closed (the use step), 0.02 per epoch; `reclaim` — a marsh or foreshore face beside built
  land whose band's plot demand is short (S5d's shortfall record) and whose district's band is `modest` or above, 0.03
  per epoch — reclamation is bought by prosperity and pressed by demand; `shiftCourse` — a reach whose sinuosity exceeds
  `river.cutoffSinuosity` (1.8), or whose flood cells beside it exceed the row's share, 0.01 per epoch; `digCanal` only by
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
row, `amalgamate` returning the land to the front plot's garden: item 31). The sealing kinds are the last the union admits
(`… | TerrainWaterOp | HiddenOp`):

```ts
type HiddenOp = { op: 'sealPassage' | 'openPassage'; passage: Id /* the L3 passage face (§2.5) */ };
```

**Markets over epochs (item 24).** A secondary market the roster's suffix adds is claimed by the epoch's S7b in the new
stage or in a due district by §4.5 S7b (3)'s rule; a market whose institution closes (the use step) keeps its square — a
plaza or a `market_green` — until a `clear` or a claim reuses it, so no market moves by wealth change alone.

=== REPLACE ### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values) ===
### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)

```ts
interface RosterTables { classes: BuildingClassRow[]; districtKinds: DistrictKindRow[] /* the relation templates of the neighbourhood kinds (item 16 (a)) */;
  resources: ResourceRow[] /* {id, kind: 'site'|'made'|'import'} — the resource ids the supply edges name (grain, malt, hides, import …), our own rows */;
  institutions: InstitutionRow[]; government: GovernmentRow[] /* offices and seat classes per government kind */; religions: ReligionRow[];
  households: HouseholdRow[] /* size distributions by class */; professions: ProfessionRow[]; farm: FarmTable /* §4.9 */;
  roomProgram: RoomProgramRow[] /* item 28: the room programmes, below */; basementGate: BasementGateRow /* item 29 (b): the basement's terrain-gate values, one row, below */; names: NamePack; provenance: Provenance }
interface BuildingClassRow { id: string; use: string; perCapita: [number, number]; perOther?: { class: string; ratio: number }; min: number; max: number; firstAtPopulation: number;
  requires: ('water'|'coast'|'route'|'farmland'|'ore'|'stone'|'timber'|'fish'|'clay')[] /* the site-resource gates S2 reads from SiteResources (§4.2) */;
  outside: boolean; liveIn: boolean; cluster?: string; noxious: boolean; lifestyleBand: string; shopProb: number; priority: number;
  relations: RelationRule[] /* the class's relation template (item 16 (a)) */; produces: string[] /* resource ids */; supply: SupplyEdge[] /* its supply chain (item 16 (b)) */;
  template: DesignationTemplateRow[] /* one row per band: the designation template S11 reads (item 19; §4.7) */; useRules: UseRuleRow /* catchment, inertia and closing rows (item 17; §4.11) */;
  secondaryChance?: number /* market rows: the TOWN chance of a secondary market (§4.2 S2) */; salvageM3: Record<string, number> /* item 8: the material yield and debit §4.11's ledger reads (below) */;
  drain: 'none'|'pit'|'channel'; underground: 'never'|'allowed'|'preferred'; undergroundAccess: boolean /* II.7's columns (below) */;
  subLocations: SubLocationRow[]; openingHours: OpeningRow[]; tags: string[] }
interface RelationRule {   // one row of a class's or a neighbourhood kind's relation template; read by the placement solver (§4.7 S10a, S10b) and, for district kinds, by §4.5's typing scorer
  kind: 'adjacent'|'near'|'far'|'sameStreet'|'clustered'|'avoid'                                  // to another class, cluster tag or feature class
      | 'upwind'|'downwind'|'upstream'|'downstream'|'nearWater'|'highGround'|'lowGround'|'dry'   // environmental: ContextVector.upwind, upstream, terrainClass, dist.water (§2.5)
      | 'frontage'|'nearGate'|'nearMarket'|'nearHarbour'|'nearCentre'|'extramural'|'intramural'  // access: roadClass, dist.* (the nearest of N markets, item 24)
      | 'plotArea'|'plotShape'|'frontageM'                                                        // capacity: areaM2, shape, frontageM, against the template's size budget
      | 'band'|'exposure';                                                                        // the prosperity band; Plot.exposure and knownTo (item 30)
  to?: string; withinM?: number; beyondM?: number; min?: number; max?: number; values?: string[]; falloff?: 'step'|'linear'|'smoothstep';
  strength: 'hard'|'soft'; weight: number /* soft rows: the score at full satisfaction; hard rows: 0 */; extension: boolean /* true: a row the references lack, scaled by placement.extensionWeight (§4.7 S10b) */ }
interface SupplyEdge { resource: string; maxDistanceM: number; mode: 'street'|'river'|'sea'|'road'; strength: 'hard'|'soft'; weight: number;
  perConsumers: number /* S2's need propagation: one provider per this many consumers (§4.2 S2) */; substitutes?: string[] }
interface DesignationTemplateRow {   // one per band of §4.5's band set; continuous columns interpolate along the prosperity value, discrete ones switch at the cut (§4.7 S11)
  band: string; specialisation?: string /* discrete: the designation's variant in this band; drives the use's specialisation, its description and its room programme (item 28) */;
  plotAreaM2: [number, number] /* the size budget a join is asked for (§4.7 S10 (7)) */; footprintM2: [number, number, number] /* p10, p50, p90 */; floors: [number, number]; heights: string /* the class heights row */;
  structures: { role: string; count: [number, number]; footprintShare: number; required: boolean }[] /* the slot list: main building, workshop, forge, yard, court, stables, store, dwelling, journeymen's rooms … data-defined roles */;
  arrangement: 'row'|'compound'|'detached'|'hovel'|'tents'|'institution'; coverage: number; densityShift: number; frontJitterCm: number; separation: 'party_wall'|'slot'|'passage';
  frontage: 'none'|'lean_to'|'stall'|'shopfront'|'arcade'|'gate'|'wall' /* discrete: the main slot's frontage treatment; the entrance set is §2.6's */;
  yard: { part: string; share: number }[] /* court, garden, formal_garden, forecourt, orchard, midden, pen … (§2.5 YardPart) */; bounds: 'none'|'fence'|'hedge'|'wall'|'railing';
  programme: string /* item 28: the key of a RoomProgramRow (below), which the plan rung of §2.6 reads */; underSize: 'compact'|'refuse' /* what the mutator does when the plot cannot be joined to the size budget (§4.7 S11) */;
  replaceability: 'immediate'|'short'|'long'|'ruin_only' /* item 31: read at the plot's builtBand row — how soon §4.11's wealth ladder may replace the stock */;
  households: { built: number; max: number } /* item 31: the households the design is built for, and the most it holds when let out (rung 1's relet) */;
  entrances: { side: number; rear: number; service: number; capSide: number; capRear: number; yardDoorMinM2: number } /* item 29: the probability of a side, rear or service door given an access edge beyond the frontage, their caps, and the yard or court area that recommends a yard door — §2.6's entrance rules read them */;
  cellar: { prob: number; kinds: { full: number; half: number; walkout: number }; slopeCm: Cm; rockCost: number; depthCm: Cm /* default 220: a full cellar's floor below the ground storey's baseCm */; insetCm: Cm /* default 60: the basement ring's inset inside the ground-storey wings */ } /* item 29 (b): the base probability §2.6's basement decision starts from, the kind weights, the fall under the footprint past which the decision turns to a half or walk-out cellar, the rock cost that lowers the probability, and the cellar's depth and inset; the terrain gate is §2.6's, its values the basementGate row below */; }
interface UseRuleRow { serviceRadiusM: number; closeShare: number; closeAfterEpochs: number; starveAfterEpochs: number; inertia: number; moveChance: number }   // §4.11's use step (item 17)
interface DistrictKindRow { kind: string; relations: RelationRule[] /* read by §4.5's typing scorer and S7b's affinity rows, and by the solver for a whole-neighbourhood assignment (§7.7) */ }
```

**The sequential roster (FTG-14; J-P20).** FTG's documented *shape* (`ftg-docs-params.md` §3.3), none of its 209 types, 80
nodes, 299 professions or 323 items. A **virtual population** advances on a fixed grid of Δ = 10 people up to the rung's
maximum. At each grid point the target count of every class is a monotone step function of the virtual population —
`perCapita` or `perOther` ratios converted to per-person ratios, core versus shop pools, lifestyle-banded pools with rare
outliers (weights ours), hard `min` / `max`, **size gates** (`firstAtPopulation`), **resource gates** read from
`SiteResources` (no farmland → no farms, shops instead) — and every class below its target receives its next building, in
class-priority then class-id order. Every draw is keyed by the building's ordinal (`roster/<class>/<ordinal>`: shop or
core, lifestyle outlier), so the n-th chandler is the same chandler at any population. The run records each building's
**appearance population**; the manifest for population P is every (class, ordinal) that appeared at or below P. Hence
manifest(P₂) ⊇ manifest(P₁) whenever P₂ > P₁ (property test on 1 000 seeds, §13.2), an epoch's delta demand is exactly the
suffix, a population fall selects the suffix in reverse order, negative deltas arise only from declared circumstance
events, and §7.8's population control is monotone by construction. **Mode (COV-FTG-B06):** `rosterMode:
'minimiseUnemployment'` (default: at each grid point, when the unemployed share of the virtual population exceeds a table
threshold, the workplace class with the largest weighted job deficit receives one extra building) or `'matchRatios'` (the
configured ratios only, FTG's alternative); both are grid-sequential, so both are prefix-stable.

**Output:** demand per class with area / frontage requirement classes, district affinities, cluster tags, live-in flags,
outside flags and wealth bands; the **character vector** (mercantile / ecclesiastic / military / agrarian / squalid …)
shifts the ratios. **Government (COV-FTG-B13):** the blueprint's `government` circumstance selects a `GovernmentRow` whose
offices force seats — a crown seat a royal castle or palace, a seigneurial lordship a lord's castle or keep, an
ecclesiastical lordship a bishop's palace beside the cathedral, a chartered commune a town hall and guild halls, a merchant
oligarchy a merchants' hall — plus a military share (guard posts per 1 000 inhabitants; barracks at CITY and above near the
castle or the gates); the castle toggle `auto` reads it. **Religion (COV-FTG-B14):** religions come from `ReligionRow`s with
worshipper shares (shifted by the character vector), a practice share and clergy per 1 000; temples per religion are
proportional to its practising worshippers; each religion has a faction (§2.7). S7b then allocates the demand and S10b
places it (§4.5, §4.7); where capacity is short, placement's reconcile and F-SITING's ladder decide, and surplus capacity is
typed as yards, greens or vacant plots (§4.7 S10b); population is honoured within tolerance and reported (O7 a, e).

**Relation templates, supply edges, designation templates and use rules (items 16, 17 and 19; rows are data, §7.6,
re-signed by the corpus phase, §13.9).** A class's `relations` are the rows the placement solver filters and scores by
(§4.7 S10a, S10b); its `produces` and `supply` are the resource and dependency graph S2's need propagation walks (§4.2 S2)
and the solver measures distance on; a neighbourhood kind's rows serve §4.5's typing scorer and a whole-neighbourhood
assignment (§7.7). Default rows are the references' placement rules where a reference has one and soft tendencies where it
has none (item 23; `extension: true`, scaled by §4.7 S10b's `placement.extensionWeight`) — for instance a tannery
`downstream` hard, `nearWater` hard and `extramural` soft, with supply `hides` 800 m by street and `bark` 2 000 m by road;
a brewery with supply `malt` 1 000 m by street (hard) and `nearWater` soft; a maltings with supply `grain` 3 000 m by
road; a bakery with supply `flour` 600 m by street; a warehouse `nearHarbour` 150 m hard with supply `import` by sea; an
inn `frontage` primary or through hard and `nearGate` 150 m soft; a market hall `nearMarket` 60 m hard; a trade group's
shops `sameStreet` and `clustered` soft; a mill `nearWater` hard with a fall (its outside row, §4.9). The `template` rows
are S11's (§4.7); the `useRules` are §4.11's use step's; the `produces` of the outside classes — grain, timber, fuel,
stone, ore, fish — are the hinterland's food, fuel and timber rows (§4.9, item 26). No row names a material: a material
is a rendering attribute (§2.6).

**Markets, wealth bands and the countryside's rows (items 24, 26 and 27).** The `market` class row demands the markets by
size — `min` 1 (the principal), `firstAtPopulation` 10 000 and `perCapita` one per 12 000 inhabitants for the secondaries,
`secondaryChance` 0.15 at TOWN (our own rows; §4.2 S2; §13.5's anchors are MFCG's secondary plazas and FTG's two market
squares) — and the market hall's and the market trades' rows cite the market they serve by rank (`nearMarket`, the
principal by default). `HouseholdRow.band` and every class row's `lifestyleBand` name a band of §4.5's band set; the
household shares' default weights are FTG's captured lifestyle distribution (§4.5's table; provenance `ref:FTG lifestyle
distribution`), shifted by the character vector, and every band-keyed row set of this table may omit bands, which
interpolate (§4.5, item 27). The farm table's fuel and timber rows, the farm modes and the outside classes' seeding rows
are §4.9's.

**Under a fall (AM-8).** A population fall selects the suffix in reverse ordinal order, as above, and its households leave
by §4.11's step (c) — a `relet` down, `vacate` at a building's last household — and it never removes a building by
arithmetic: the standing stock follows with §4.11's dwell lag, and a later rise reoccupies the same suffix
first. `BuildingClassRow.salvageM3` is the class's material yield when robbed, cleared or dismantled, and the debit of a
build or repair of that class — read by §4.11's ledger.

**Replaceability, households, entrances, cellars and the room programme (items 28, 29 and 31; J-A28.43, J-A29.41).**
`DesignationTemplateRow` — one per band of each `BuildingClassRow` — carries them in its `replaceability`, `households`,
`entrances` and `cellar` columns (above); `RosterTables.roomProgram` holds the room programmes and
`RosterTables.basementGate` the basement's terrain-gate values:

```ts
interface RoomProgramRow { for: { cls: BuildingClass; band: string; use?: string; era?: string } /* the designation and its band (item 19's rows) */; rooms: RoomRuleRow[] /* the programme */;
  pattern: Record<'basement'|'ground'|'upper'|'top', { weight: number; pattern: LayoutPattern }[]> /* §2.6's layout patterns, weighted per storey class */; circulation: { num: number; den: number } /* integers: the share num/den of a storey given to halls and corridors — §2.6's capacity reads it exactly */;
  stair: { placement: 'by_entrance'|'rear'|'centre'|'tower'; kind: StairCore['kind'] } /* the stair core §2.6 places before any cut */; basementAccess: 'core'|'trapdoor'|'external' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand; the plan rung reads Basement.access */; furnish: { density: number; wallBias: number } /* item 28's abstract furniture by role */ }
interface RoomRuleRow { role: RoomRole /* §2.6: data-defined */; scope: 'unit'|'shared'|'service'|'circulation' /* item 28 (f): a room of one household's dwelling unit, one the households share (a kitchen, a common room), the use's or the staff's rooms (a forge, a shop, a store, a staff chamber), or a corridor or stair hall — §2.6's interior ladder says which scopes a band's row allows */; count: { n: number; law: 'const'|'perHousehold'|'perStorey'|'perCapacity'|'perSubLocation' /* per household: item 31's relet; per capacity: a sub-location's */; capacity?: string; tag?: string };
  area: [number, number, number] /* m²: min, target, max */; storey: 'any'|'ground'|'upper'|'top'|'basement' /* the storey rule */; exterior: 'none'|'some'|'max' /* windows */; door: 'door'|'arch'|'open' /* the opening kind */; maxDoors?: number;
  adjacency: { kind: 'hard'|'soft'; to: 'core'|'entrance:main'|'entrance:yard'|RoomRole; via?: 'direct'|'corridor'|'under' }[]; priority: 'hard'|'soft'; hearth?: boolean;
  furnish: { density: number; wallBias: number; glyphs: string[] } }
interface BasementGateRow {   // item 29 (b): the values §2.6's basement gate reads; one row per table version
  waterTableM: M /* default 40: within this distance of a shore the water table is the nearest water body's surface plus the freeboard */;
  freeboardCm: Cm /* default 50 */; drainageAccumCells: number /* default 100: the flowAccum at which a hydro cell is the drainage line elsewhere (§2.3; our own, calibratable) */ }
```

The **room programme** lists the rooms a building of that class, use and band must and may have — each with its
size band in m², its storey, its openings, its adjacencies and how many — a fixed number, a number per storey, one for each household of
item 31's `relet`, or a sub-location's capacity — which §2.6's plan rung writes first and then cuts the walls
to fit (item 28), so rooms are never cut before the programme is known. The programme rows follow §2.6's **interior
ladder** (item 28 (f)): the ladder's row for the occupants' band gives the cross-class structure — how many households
the shell holds, each unit's rooms, the shared rooms, the staff rooms and their size beside the owners' rooms, the
circulation form and how large the rooms may be — and a class's programme row adds what a smithy, an inn or a chapel needs; the
`programme` row is read at the occupants' band (the field band, J-A19.43) and the `households` column at the plot's
`builtBand` (the shell's capacity, §2.6), so the interior has no floor while the shell keeps its own (§4.11).
`LayoutPattern`, `StairCore` and `RoomRole` are §2.6's, the role names our own data rows (hall, chamber, solar, parlour,
kitchen, buttery, common room, cooking place, staff chamber, corridor, stair hall, forge, shop, store, undercroft,
chapel, nave, passage …). The plan rung's `plan.program` stream draws the fractional part of a count law (§6.1), as
`plot.join` draws a join (§7.7). Households per building follow the roster's households (the dossier's roster where one
exists, §7.7) and item 17's relocation (§10.3); the `households` row and the shell's floor area bound the ladder's
`relet` through §2.6's one capacity function, which the generation fill (§4.7: S10b's placement, S11's clamped write),
`relet` and F-PLAN (§5.2) all read; with no epoch every residential building houses what §4.7's generation fill gives it — at
least one household and never above its capacity — so the static baseline is unchanged (item 23).
Every column is data with provenance, editable and calibratable (§7.6, §13.9). The entrance and cellar rows default to
the references' behaviour — one street entrance per building, side and rear probabilities 0, a cellar by the class rows
of item 29 (b) — with our extensions as tendencies (item 23); the reference's basement share is a descriptive baseline
only (§13.5).

**The `drain`, `underground` and `undergroundAccess` columns (II.7).** `BuildingClassRow.drain` is the class's drainage
need: `none` (tents, sheds, hovels), `pit` (households and most workplaces: a cess pit or the
street gutter of their own), `channel` (the trades and institutions that discharge foul water: tanners, dyers, fullers,
brewers, slaughterhouses, baths, hospitals, monasteries); `underground` names which classes an underground neighbourhood
may hold or prefers, and `undergroundAccess` whether a surface building of the class may hold a cellar stair to a
tunnel. Which plots a network connects, what a class does when none exists, and how
the underground rows are used are II.7.1's and II.7.3's rules; the columns are data like every other, our own rows.

=== REPLACE ## II.6 The staged layers — floating islands and sewers: the hooks the base carries now ===
## II.6 The staged layers — floating islands and sewers: the hooks the base carries now

*In plain words.* The owner stages both layers after the city is mastered; whether a layer exists is a
model rule (the island rule below; II.7.1's tier row), and its layer toggle shows it. Nothing here is built in the base, but
every record and interface they need exists now, so adding them later is a registration, not a redesign.

**Floating islands (AM-2; DEF-7).** A settlement has 0–3 islands by the island rule below — with the model setting on,
the rung, the count slots and the supply decide them, and the view toggle only shows them. **Why an island exists** is one of two reasons, by
rule or by assignment: `prosperity` — the island carries a very prosperous neighbourhood or set of neighbourhoods: by rule — where
the model setting `recipe.layers.islands` is on, the rung admits islands and a count slot opens (the island rule below,
(1)–(4)) — S7b (5) allocates the roster's richest demand to that slot's sky pseudo-district under the supply law (5), so
the population stays whole; `institution` — the island carries one
unique institution chosen from an `IslandInstitution` row (a palace overlooking the land, a cathedral, a prison isolating
criminals) or named by an assignment. **What it is:** a `SkyIsland` (§2.7) with an organic oval outline from §4.2's
routine (an outline template of §4.2 S1 (2)), an altitude from the supply law (5), and optionally its own terrain from S1 run on
the sky plat with an *echo* request — its relief `echo` or `own`, and a conjured river that takes the ground river's bearing
and width law; its districts are laid by the ordinary pipeline through a `NeighbourhoodRequest` with `layer: 'sky'` (no
portals, no roads in or out; II.1 (5)). **Where it floats:** a placement rule reads the ground plan — over water, fields or
outskirts by default, over the built core only by assignment (`SkyIsland.placement`, §2.7); the occlusion mode (opaque,
ghost the covered ground, offset view) is a rendering choice (§8.4). **What it does not do:** it has no relation to the
underground layer; its shadow falls on the ground through the shadow pass; it exports as its own layer (§11). Its hook interfaces, `IslandRule` and `SkyStrategy`, have one declaration each, after the island rule below.

**Sewers (DEF-7).** A `SewerStrategy` registers as a stage after S11 (declared inputs: ways with `flowToward`, the drainage
raster and outfalls of §2.3, plots and buildings with their class table's `drain` column, the underground plat; output:
`Tunnel` records, §2.7). Its rule families are data: `follow-streets` (mains under the ways, falling with `flowToward` to the
outfalls), `drainage-lines` (along the natural drainage), `mixed`; which buildings need drains is the class table's column;
two presets — `historical` (restrained: open gutters, a few culverted mains, cess pits by class) and `navigable` (the fantasy
preset: large vaulted mains with chambers). It renders through the ground by §8.4's cut-away or overlay and exports as the
underground layer.

```ts
interface SewerStrategy { derive(doc: Document, rules: { family: 'follow-streets'|'drainage-lines'|'mixed'; preset: 'historical'|'navigable' }, ctx: StageContext, k: Kernel): KernelResult<Tunnel[]> }
```

**The island rule — existence, count and the supply law (owner: "Floating islands are also a product of prosperity …
magic … a resource that needs to constantly be supplied"; "limited only to cities and metropolises"; "not all cities or
Metropolis have floating islands"; AM-10, AM-13, AM-15).** One rule decides whether a settlement has islands, how many and
how large; the toggle only shows them. Its rows are band rows of the family that coverage, plot granularity and greenery
belong to (§4.7, §4.9): they interpolate along the prosperity value and read the same field (§4.5).
1. **Two settings, not one.** `recipe.layers.islands ∈ {'off', 'on'}` is a MODEL setting — off by default, the named
   fantasy toggle of D-3, so the realism base has no island and its ground model is byte-identical to the realism
   golden; changing it is an `adjust` of the recipe that re-derives from S7b (§7.6, §7.7; its control row is §7.8's).
   The sky layer's `LayerSpec.visible` (§8.4) is the VIEW toggle the owner speaks of: it shows the islands a settlement
   has and creates none; a hidden island still exists and still carries its households, and hiding or showing the
   layer leaves the model digest unchanged (J-A15.41).
2. **The gate — rung.** Islands are possible only where the rung's row allows them: `RungProfile.layers.islands` (§1.1)
   is `none` at TOWN and at every village rung (PART III) and `possible` at CITY and METROPOLIS. The rung is the one the
   request's population chooses at generation and, in an epoch, the one the epoch's population target chooses (§4.11),
   so a settlement that leaves the CITY band can no longer sustain islands and one that enters it may gain them
   (J-A13.41).
3. **The supply.** Magic is a supplied resource, so an island's existence and size are functions of two prosperity values
   read from §4.5's field: `S_town`, the area-weighted mean of the prosperity value over the settlement's built land (one
   scalar per town, recomputed per epoch), and `S_carried`, the mean band value of the households the island carries
   (S7b (5) fills it from the richest band down, so `S_carried` is high where the town has a rich band and modest where it
   has none). The supply function `h(v)` is a band row per rung interpolated along the value: 0 up to the threshold τ —
   the lower cut that the town's own `FieldBands` record for the `thresholdCut` band, the prosperous band by default —
   rising to 1 at the rich band's top. No island exists where `h(S_town) = 0`, the owner's "if there is no prosperity, there is
   no floating islands", and none is carried where `h(S_carried) = 0`. An `institution` island reads the same gate: it
   exists only where `h(S_town) > 0`, its `S_carried` being its institution's requirement band (J-A10.41).
4. **The count.** How many islands the settlement has, 0–3, is drawn once per town on the `island.place` stream (§6.1),
   before any allocation, from three ordered slots: slot k opens with probability `chance_k · h(S_town)` and only if slot
   k − 1 opened (defaults 0.6 for the first slot, 0.5 for the second and 0.35 for the third), so a poor city has none, a
   rich one may have none or several, and the count depends on the seed and on prosperity, never on the toggle
   (J-A15.42). An epoch re-draws the slots
   with the epoch component: a slot that opens raises a new island only where the supply admits one (§4.11's
   `raiseIsland`), and a slot that closes is read by the decline ladder, never as an instant removal.
5. **Size and altitude.** For an open slot the SUPPORTED AREA is `A = areaHaMax(rung) · h(S_carried) · h(S_town)` and the
   altitude `elevationCm = E_min + (E_max − E_min) · h(S_town)` — area from both prosperities, altitude from the city's
   alone: a rich neighbourhood in a poor city floats low and small, a rich one in a rich city high and large (J-A10.43).
   S7b (5) fills the island's allocation from the richest band down until the plot land of `A` (× the dense core's plot
   share, §4.2 S2) is used or three districts' worth of households are allocated, recomputing `S_carried` and `A` as it
   adds — `A` falls as poorer households join, so the fill converges — and makes no allocation for a slot whose `A` is 0.
   `SkyStrategy` then sizes each outline to its allocation's area and floats it at its altitude (below).
6. **Over epochs** (§4.11): the supply is re-evaluated each epoch; an island whose `A` shrinks by more than the
   hysteresis (0.05 of its area) is resized, one whose `h(S_town)` or `h(S_carried)` falls to 0 wanes, settles and falls,
   and regrowth re-floats a settled island before raising a new one — the program's proposed response, adopted as
   conversion kinds and vetoable (J-A10.42). An island's lifecycle state is `SkyIsland.state` (§2.7).
7. **Editable.** The count, each island's area and altitude and its state are attributes under `setAttr` and `lock`
   (§7.1, §7.2); `resizeIsland`, `settleIsland`, `fallIsland`, `refloatIsland` and `raiseIsland` are `convert` events a
   user may apply by hand; every draw is on `island.place`, so an edited island survives regeneration by §6.3's rules.
8. **Emulation note.** No reference has islands: the rule is our extension, and with the model setting off nothing of it
   runs.

```ts
interface IslandRule {                      // one row per rung that admits islands; read by S7b (5) and by SkyStrategy; a rule table (§7.6)
  rung: 'CITY'|'METROPOLIS'; chance: [number, number, number] /* the three ordered slots, each × h(S_town) */;
  thresholdCut: 'prosperous'|'rich' /* τ = the lower cut the town's FieldBands give this band */; supply: { band: string; h: number }[] /* h(v) per band row, interpolated along the value */;
  areaHaMax: number; elevationCmBand: [Cm, Cm]; placement: ('water'|'fields'|'outskirts')[]; terrain: 'none'|'echo'|'own';
  institutions: IslandInstitution[] /* { kind, requirementBand, areaHa }: the unique-institution rows a slot may carry by rule or by assignment */;
  hysteresis: number /* share of area; default 0.05 */; dwellYears: [number, number] /* waning → settled, settled → fallen (§4.11's dwell bands) */ }
interface SkyStrategy { place(doc: Document, rule: IslandRule, allocations: Allocation[] /* S7b (5)'s sky allocations: the open slots with A > 0, each with its supported area and altitude */, ctx: StageContext, k: Kernel): KernelResult<SkyIsland[]> }
// a Stage registered after S7b by declared I/O: inputs the sky allocations and the ground plan; outputs the islands (outline sized to the
// allocation's area, placement by rule), their arenas and their districts, which run the ordinary pipeline through a NeighbourhoodRequest
```

**The underground fades like the walls (owner: "Sewer systems and the underground like the walls fade slowly, rather some
tunnels simply cave in or become decommissioned rather than intentionally taken down by populations"; AM-11).** A tunnel's
lifecycle is a ladder like a wall's, moved only by §4.11's lottery at the underground's persistence rate — after streets
and walls, before terrain and water: the slowest fabric but the ground itself (J-A11.42) — and by hand: in use →
neglected, silted (`abandoned`) → partly caved in (`decayed`) → collapsed or decommissioned, sealed (`ruined`, with
`Tunnel.closure ∈ {'collapsed', 'sealed'}`, §2.7); the conversions `silt`, `caveIn` and `seal` act on one tunnel record,
and `reopen` undoes them. A conversion given a `stretch` first widens it, at both ends, out to the first centreline vertex at or beyond that end
whose station no underground plot's frontage straddles on either side of the tunnel (a plot's frontage read as the
interval of centreline stations its frontage edges project onto) — a vertex where the frontages break on both sides, a
junction or the tunnel's end — so that no plot fronts two records (U1, II.7.3), the widening shown by the dry run and
reported with the event's fates; it then splits the tunnel at the stretch's two ends, handing the
stretch (and, for an interior stretch, the part beyond it) to new `Tunnel` records by `retypeEdges`' `rekey` on their
`StretchRef`s (§3.4), as a cut way hands its far part to a new way (§4.11's carve), so that the stretch changes
condition alone: each part keyed by §6.3's SPLIT rule for a tunnel record, each keeping the record's attributes on its
own stretch (its invert knots, the outfall at its end, the plots and buildings whose connections meet it, its chambers
(`Tunnel.chambers`) and the access points whose kerb vertex lies on it (`AccessPoint.under.tunnel`, II.7.4)), the
`Frontage` records of the underground blocks along it (§2.5) split where one spans an end, keyed as the tunnel's parts
are, and each re-pointed (`Frontage.way`) to the part it fronts; an `undo` restores the one record (§7.4; J-A11.43). Each run the condition table names, and the tunnel run of II.7.3's frontage and lifecycle
rules, is one `Tunnel` record. **The condition table** — the one statement of a tunnel's condition, which §2.7's
`Tunnel`, §2.8's decline hooks and II.7.3 read:

| condition | `existence` (§2.8) | `Tunnel.closure` | `open` — may carry frontage plots (II.7.3) | reached by |
|---|---|---|---|---|
| in use | `generated`, `built`, `altered` or `converted` | — | yes | generation or a drawn tunnel; `reopen` from any other condition |
| neglected, silted | `abandoned` | — | yes | `silt` on a run in use |
| partly caved in | `decayed` | — | no | `caveIn` on a run in use or neglected |
| collapsed | `ruined` | `collapsed` | no | `caveIn` on a partly caved-in run |
| sealed (decommissioned) | `ruined` | `sealed` | no | `seal` on a run in any other condition |

The condition is this reading of `existence` and `closure`, never a second stored state (J-A11.21): it changes only by
these conversions — a hand change of a tunnel's condition is the matching `convert` event (§7.1) — and its `open` column
is what II.7.3's frontage rule and its lifecycle read. No epoch rule ever demolishes a tunnel: the engine's plan may not contain `demolish` on a tunnel record (a
hook test lints it), while a user's `delete` stays available, because everything is editable (J-A11.41). A closed tunnel
persists as an underground ruin — its record live at its address, its centreline and invert kept, drawn by §8.2's silted,
caved-in and sealed classes through the underground layer's cut-away (§8.4) — and later growth reopens it (`reopen`;
regrowth-first: a closed tunnel on the network's line is reopened before a new one is dug) or reuses it: AM-12's
underground plots front a reopened tunnel as they front any navigable one. Decline follows the surface's drivers and lag: a
tunnel's exposure is the exposure of the ground it runs under, and its dwell bands are two steps slower than a building's
(§4.11's table). Emulation note: no reference has sewers or time; with the network absent nothing of it runs.

**Where the rest of the sewer layer is stated (items 12 and 14).** Existence by tier and the toggle-as-visibility rule, the
`drain` connection rule, the network stage's gate, its levels on the underground arena, the tunnel profile with its wall
thickness, depth and outfalls, and the underground neighbourhoods along navigable tunnels are II.7's; this section keeps
the islands, the network stage's declaration, its rule families and presets, and the underground's lifecycle.

=== J-ROWS ===
| J-A30.41 | hidden plots made deliberately by S8's reach draw and S10's cut against per-band hidden-share targets; 0 in the parity presets and at village rungs; the target interpolated to each district's mean value and scaled by the rung and density factors that scale the reach weights | §4.6, §4.7, PART III |
| J-A28.46 | the generation fill split at the stages that can read each quantity: S10b places at least one and at most the template row's `households.built` households per residential slot (a slot the demand cannot fill dropped from the site plan, its ground a yard; a plot none of whose slots it fills typed vacant), S11 writes `Building.households` clamped to §2.6's capacity on the wings it made; an overflow is re-placed by S10b's solver inside the district after its last S11 batch (band, then drift; score, then address), else an F-SITING item; every later shell change keeps to the same capacity | §4.7 |
| J-A11.43 | a conversion given a tunnel stretch first splits the record at the stretch's ends (`rekey` on `StretchRef`s; the part holding the centreline's first vertex keeps the address, every part continues the lineage), so a condition stays one reading per record; the stretch widened to plot-frontage boundaries, and the chambers, access points and block frontages re-pointed (amended by verify-pipeline-r2) | II.6, §4.11, §6.3 |
| J-A20.43 | an epoch's forced relocation of a dossier-backed use: issued inside the epoch before the step that would empty or remove its building, a `relocateUse` outside the use cap, by the solver's `dossier` request over the use's catchment less the plots that step empties or removes, widened to the town where that holds no candidate; where the use step would close it, it relocates by the same request, or stays in its building where its catchment holds no candidate | §4.11 |

=== RATIONALE-A ===
| J-A30.41 | Chose to make hidden plots deliberately — S8 draws a reach (`open`, `passage`, `gated`) with each court or rear-row interior from band rows, S10 cuts the passage face and the rear plots, and the band row states a hidden-share target the reach weights are fitted to and §13.2 checks — with 0 as the parity presets' and the village rungs' value, over leaving hidden plots to F-PLOT's residue or to a post-hoc pass, because the owner asks for "some plots" of a definite character (slums, clandestine places, private courts) in definite quarters, which only a target per band gives, and the references' every-plot-fronts-a-street baseline must stay the default (item 23) (§4.6, §4.7, PART III; item 30). The target is read at the district's mean prosperity value and scaled by the same rung and density factors as the reach weights, so a town hides less than a city and a dense quarter more, as the owner's "city and metropolis bands higher than town" asks, and the bar checks what the rule produces (validate, VAL-02). |
| J-A28.46 | Chose to split the generation fill between the two stages that can each read what they need — S10b placing a residential plot's households per residential slot, at least one and up to the template row's `households.built` (a table read), a slot the demand cannot fill dropped from the plot's site plan with its ground a yard and a plot none of whose slots it fills typed vacant by the reconcile, and S11, which creates the building and its wings, writing `Building.households` clamped into [1, capacity] by §2.6's one capacity function evaluated on those wings — and to re-place a household the clamp leaves by S10b's own solver over the district's residential buildings with room (the household's band first, then the bands its drift admits; score, then building address) after the district's last S11 block batch, an F-SITING item where no building has room, every later path that builds or changes a residential shell keeping to the same capacity inside its own event, over having S10b read the capacity (it cannot: no building or wing exists before S11), enlarging a shell to fit its households (the designation template and the geometry floor decide a shell, never its occupants), leaving an unfillable residential slot standing as an empty residential building (the clamp's lower bound of one would have no household to hold, and generation would make a vacancy that belongs to decline's ladder) or dropping the household before any re-placement (the population is the dossier's, and F-PLAN never omits a unit; F-SITING's last rung alone takes off the manifest a household no building of its district can hold, reported — VP2-07), because the owner's interior ladder needs the solver and the plan to agree on how many households a shell holds, and item 16's one placement solver is what puts a household anywhere; the re-placement follows the model verifier's proposal (V-MAB1-04) with the solver's score in place of a bare distance, so that no second ranking exists (§4.7; items 28 (f) and 16; the slot rule added for VP2-01). |
| J-A11.43 | Chose that `silt`, `caveIn` or `seal` given a stretch first splits the tunnel at the stretch's two ends into its own records — by `retypeEdges`' `rekey` on their `StretchRef`s, as a cut way hands its far part to a new way, the part holding the centreline's first vertex keeping the address and every part continuing the tunnel's lineage with its part index, each keeping the attributes on its own stretch — over a per-stretch closure list on one record or a conversion that always takes the whole tunnel, because a list would be a second stored condition beside `existence` and `closure` (J-A11.21 rules that out) and II.7.3's frontage and lifecycle rules read one `open` value per record, while the owner's "some tunnels simply cave in" and the ladder's partly caved-in state are local: a cave-in under one street closes the plots along that stretch, not every plot along a main (II.6, §4.11; items 11 and 12). The stretch is first widened at each end to the nearest centreline vertex no underground plot's frontage straddles, over splitting at exactly the given ends, because a plot whose frontage crossed a split would front two records against U1 (II.7.3); and the split re-points the chambers, the access points and the underground blocks' frontage records to the part they lie on, so that a cave-in closes exactly the plots along its part; the parts are keyed by §6.3's SPLIT rule, identity's home (amended for verify-pipeline-r2's VP2-04 and VP2-05). |
| J-A20.43 | Chose to issue the relocation that §4.11's *Dossier content across epochs* requires before the step that would empty or remove the building housing a dossier-backed use — inside the epoch, as a `relocateUse` citing it and counted outside the use step's churn cap, by the placement solver's `dossier` request over the use's catchment with the plots that step empties or removes left out, widened to the whole town only where the catchment then holds no candidate plot — and, where the use step would close a dossier-backed use, to relocate it by the same request or, where its catchment holds no candidate plot, to leave it in its building, over letting the relocation wait under the cap, relocating into a building the same step removes, or keeping the use in place by exempting its building from the step, because a use that waited or moved into doomed fabric would stand without a building at the step's end, against item 20 (b)'s "EXISTS on every map", while an exemption would let one dossier element freeze a carve, a clearance, a sealing or a falling island that the history requires; the `dossier` request always places (J-A20.71), so the rule has no unplaced case, and it reads only committed state and the solver's own order, so the same history gives the same moves (§4.11; items 20, 17 and 8; validate, VD2-02). |

=== END ===
