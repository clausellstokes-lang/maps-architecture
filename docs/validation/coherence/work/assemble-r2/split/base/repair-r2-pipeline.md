=== REPLACE ### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker ===
### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker

```
S0 Blueprint ─► S1 Site ─► S2 Programme ─► S3 Siting, reservations, stage-1 boundary + trace ─► S4 Backbone ─► S5 Stage k (k = 1 … K) ──►
 params, sub-    terrain, L0   roster demand,    centre(s) + plazas, lattice, gate picks,      L1 arterial     S5a boundary + trace + gates (k = 1: S3's trace committed;
 seeds, auto     water, river  plot quotas per   gate routes solved, field T, stage-1          graph: S3's     outer moats carved, k ≥ 2)
 features,       decks,        stage × class ×   contour, gates, castle + its gate, trace;     gate routes     S5b main-road step (new primaries for stage k)
 history         resources,    band              L0 carvings + their decks + ponds; L1         + the rest;     S5c growth of secondaries (regime rules; district scale in walled cores)
                 oases                           barrier faces (plazas, precinct, castle …)    viaducts        S5d capacity check (one bounded top-up)
  ─► S6 Districts, quarters, field pass 1 ─► S7 Wall strips + fortification lines ─► S7b Allocation + district claims ─► SKY (staged) ─► S12a Hinterland siting
     perimeter, grower, typing, quarters,    setback / glacis lines, intervallum,     roster → districts, hinterland,    islands and     field system, outside sites,
     FieldBands; then elevated roads and     gate plazas, castle paths, quays,        sky; claims > 1 block; edge        their ground    decoration sites, crops
     aqueducts (§4.3)                        piers, moles                             orchards → hinterland             landing claims  (no geometry)
                                                                                      (its hook S7c Fabric selection)
  ─► S8 Infill (per district) ─► S9 Corridors (L2; districts + hinterland) ─► S10a Block allocation (its hook S9b Block dispatch after step (i)) + field pass 2 (+ the way-surface rule)
     bent cuts, deep interior, rear lanes (L1);                                ─► S10 (0) Shared-edge bands (eager, both sides at once: wall bands, setbacks, glacis,
     lane ends on bounding spines = seam portals                                   tower and gatehouse parts; 2 m margin bands on the perimeter and shared reservation boundaries)
  ─► per district in the derivation pool, and the hinterland unit (and each sky island's unit) on the generation worker, merged in lineage order:
     S10 Plots (per block; the hinterland's furlongs, plots, driveways, trails, orchards) ─► S10b Placement ─► S11 Site plans + footprints (per block) ─► S12b Greenery (own faces only)
  ─► S12c Character (town-wide, after the merge: each district's character vector, identity and band range, §4.5)
  ─► S13a Names + label candidates ─► S14 Display list ─► S15 Simulation (optional module)
  ─► the tail (stages declared `phase: 'tail'`: the underground layer, II.7; staged), after the first map
     (S13b label placement is view data, computed per zoom stop with the display list, §9.2; never in the model)
```

The hooks S7c and S9b are stage 2's (V01 §3.1; registered at M5); SKY is the sky layer's (V05 §3.1; M6-sky); the
way-surface rule at S10a's end is built at M2b (V01 §3.7.3); the tail is the underground layer's (M6-U). Before its
milestone each is absent and the stages around it are unchanged.

* **Registration and order (COV-VG-VN-002).** Each stage registers a `StageDecl` (§4.12). The pipeline is the directed
  acyclic graph the declared inputs and outputs induce, topologically sorted with the stage id as the deterministic
  tie-break; the base's registrations yield exactly the order drawn above, and a cycle is a registration error caught at
  load. A stage may declare hook points, whose registrations join the host stage's declared I/O (§4.12). A product
  registers its own stage set (`ProductDecl.stages`, §4.12), so a village's density stage before its network or its
  palisade before its roads needs no pipeline edit (PART III). Each growth stage k runs S5a–S5d in order, and the same S5
  runs incrementally for an epoch (§4.11). The **op form** (`StageDecl.txForm`, §3.3) is *callback* for S5c, S8 and S10,
  whose ops read the faces earlier ops made, and *declared* for S3, S4, S5a, S5b, S7, S9, S11 and an edit's inserted
  feature; every other stage (S6, S7b, S12b, the hinterland unit's stages) registers as *callback*, which is always safe.
  **SKY's keys** (V05 §3.1): SKY declares as inputs S7b's outputs (its hooks' included) and as ground outputs two data keys
  of its own, `reservations.landing` (the ground `landing` reservations) and `allocations.landing` (the positioned
  `sky_landing` rows) — never `reservations` or `allocations` — so nothing that runs before it (S7b's `afterGreedy` hooks
  among them) reads what it writes; S8, S10a with its `afterDrivers` hooks, and S12a declare both keys beside
  `reservations` and `allocations`, so the sort puts SKY after S7b and before S8, S10a and S12a. With the islands setting
  off, SKY registers and writes nothing under either key. **The `raised` key** (item 110 (b); file f item 290 (4)):
  the ground arena's parts from 1 — every raised way's deck strip, supports, feet, spans and an aqueduct's channel — read
  as one data key, produced by the commit of any raised part (a declaration, generation or an epoch) and published by the
  declaration layer, so a product's stage may declare it as an input and re-run when a raised part changes. The key's
  value is one `RaisedRead` per raised way — a view derived on read from the way's `RaisedWayRecord` (§2.7) and its raised
  part, never stored — and every reader of the key reads it (V07's village stages among them, V07 §3.5a):

  ```ts
  interface RaisedRead {   // the `raised` data key's value per raised way; derived on read, never stored
    way: Id; kind: RaisedWayRecord['kind'];
    origin: 'declared'|'generated' /* derived (item 244): declared when the way's lifecycle cause is an edit or a skeleton file, else generated — at village rungs one carried down from a CITY epoch (V07 §3.12) */;
    reason?: RaisedReasonKey /* §2.7's: generated ways only (V06 §2.13) */;
    deck: PolygonCm /* the deck's plan footprint: the under-deck strip */;
    supports: { key: number; ring: Polygon; state?: 'ruined'|'cleared' }[] /* §2.7's supports, by their keys: footprints on ground part 0 */;
    feet: [PointCm, PointCm] /* the positions of the ground-part-0 ends of RaisedWayRecord.feet (§2.7) */;
    spans: { a: number; b: number; state: 'standing'|'ruined'|'cleared' }[] /* §2.7's spans, by their bounding support keys; an absent state reads 'standing' */;
    channel?: { unbroken: boolean /* no span ruined or cleared */; delivery: PointCm[] /* the fountain or basin pins and a cistern terminus it feeds (§2.7's terminal and feeds) */ } /* an aqueduct only */ }
  ```
* **Why this order.** (a) Water before roads, every carved water body included: harbour basins, canals, the castle and
  city moats and the hinterland's decoration ponds enter L0 at S3 with the decks their crossings need, so no street is
  laid on ground that later becomes water and no route meets water without a deck (FTG's order, `_critic.md` C12;
  GEO-19); the one later water body, an outer enceinte's moat, is carved by S5a through §4.11's carve path before that
  stage's secondaries grow, when it meets only the arterials through its gates (§4.4). (b) Programme before layout:
  buildings and people are decided before geometry (FTG's demand side), and geometry answers with capacity (O7).
  (c) Large claims before streets: S3's reservations (§4.2 S3 (12)) enter L1 as barrier faces before S4 commits any way
  (MFP-3); claims larger than one block, large institutions among them, are cut out at S7b before S8 cuts lanes
  (§4.5 S7b (3); FTG-3). (d) Walls before the streets they enclose: the first enceinte is one construction at S3, each
  later stage's boundary and trace are fixed in S5a, gates first, before its secondaries grow (§4.4), so a secondary never
  crosses a wall except at a gate and the intramural fabric inherits the wall's direction (MFCG builds its wall before its
  bisection; GEO-18, MFP-2; J-P3). (e) Districts and field pass 1 before infill (the infill's block band is the district
  class's, J-2); S7's wall strips before S8, so no lane is planned through a wall's band and setback; S12a before S10b, so
  the roster's farms, mills and quarries have outside sites to go to (FTG-7); greenery after site plans (it reads yards and
  claims). (f) Every raised part is committed before S7b (1) (§4.3), so allocation and every later stage see it.
* **The laziness contract (LC-2, FTG-1; J-P9).** A stage may run lazily for a scope X (a district, a block, a tile) only if
  its output for X is a pure function of eager upstream state and X's own sub-streams, it reads no other scope's lazy
  output, and it writes nothing outside X. Everything that decides the town's *content* is eager and town-wide: S2's
  roster, S3's reservations, S6's field bands, S7b's and S10a's allocations (S10a writes each district's band range,
  §4.5), S7c's fabric selection and S9b's block dispatch (V01 §3.3, V01 §3.5), S12a's hinterland siting, and S10's shared-edge
  step (0), whose bands lie on L1 edges two face sets share (§4.7; J-I9). The per-district stages S10, S10b, S11 and S12b
  — for every district, the hinterland unit and each sky island's unit — may run lazily or in the pool; they read those
  records and their own sub-stream only and **write only inside their own faces**. S12b is held to the same rule: a
  district plants avenue and street-tree rows only in its own half-corridor strips, and an edge orchard is a hinterland
  allocation row built by the hinterland unit, never by the district (§4.9). So any order of derivation — viewer, worker,
  headless — gives the same model (CI: the derived-complete digest test, §6.5 (9)). S8 is eager: it runs in the generation
  worker, district by district in lineage order, and its only writes outside a district's own faces are the vertices
  where its lanes end on a bounding spine, each a `baseLane` portal in the shared `Seam` record (§4.6, II.1). S12c is eager
  and town-wide: it runs on the generation worker after the pool's merge, reads every district's placements and buildings
  and writes only the districts' derived character records (§4.5), so no derivation order changes it. S13a's names and
  label candidates are eager for every district, a name being drawn only in §6.3's cases; label placement (S13b) is view
  data (§9.1, §9.2).
* **The one-click first map is the complete city LOD (SCL-4).** `generate({seed})` runs S0–S13a eagerly for every district
  and for the hinterland at city-band detail — every footprint with its wings and heights, every quarter and district
  label candidate, the hinterland's fields and the greenery faces — and S14 with S13b builds the city band's first frame.
  Laziness is restricted to what the city band does not draw: yard sub-part detail at district LOD, entrance glyphs, roof
  constructions and hatching, way names and addresses, pins below the city band (an emitting pin that hosts a light is
  eager with its light: `LightSource` records are model data the night view draws at the city band, §4.7 *Light sources*),
  tree instances and crowns, stage-2 close-up detail and stage-3 compositions — each a pure function under the contract.
  No rung shows a preview; first-map times are §12.5's (J-R7); the model digest covers the eager model (§6.2).
* **The quality budget (item 119; J130).** Every stage works to its §12 target, as fast as possible. A stage runs a
  quality path slower than its target only where a `perf.qualitySpend` row names it (`QualitySpendRow`, V11 §2.8d; its
  rows V11 §3.25.8, registry row 106, shipped empty, `calibratable: false`): the row records the stage (its `StageId`,
  §4.12), the use, the target and the measured extra time, the bar the gain is measured by with the gain, and the
  `CalibrationRun` that measured it (V12) — and the extra time is spent only inside the comfort level for one-time waits
  (item 119: ten seconds of total time; §12), never from an interaction budget (§12). With no row a stage runs its target
  path (the no-op pin), so the shipped empty table changes no output. A stage takes a quality path exactly when its row
  is in the table version the document pins (§7.6), so the paths a run took are read from that version, never stored, and
  the stage's §12.4 timing includes their extra time. The bars are §12.10's register rows and T-V11-44 (b).
* **The tail** (V04; staged, M6-U). Stages declared `phase: 'tail'` (§4.12) — the underground layer's (II.7) — run after
  the first map, eagerly and serially on the generation worker in their topological order, before the worker takes any
  queued edit, yielding between stages only to a queued view request. They write no ground geometry: only their reconcile
  stage writes ground uses and household counts, for what the underground could not seat (V04 §3.7a), and their S13a step
  the neighbourhood openings' places (`HoodPlace` records and labels, V01 §3.7.1). The ground's model digest and the root
  model digest are finalised after them; their time is reported as `timings.tail` (§12.4). A replay runs them at the same
  fold position.
* **Transactions: one level per batch (§3.3), listed per stage, with each stage's failure class.** A degenerate result
  (zero length or area, self-touching, collinear, coincident) is refused by the kernel (§3.1's `E_DEGENERATE`,
  `E_BELOW_MIN_EDGE`, `E_SELF_INTERSECT`, `E_INVARIANT` …) and handled by the stage's failure class below on its §5.2 ladder — never a
  whole-map retry; `F-WORK` and, for optional chains, `F-NUM` apply to every stage.

  | stage | its batches, in order — each writes one level | failure class (§5.2) |
  |---|---|---|
  | S1 | L0: first the arena's outer ring — the frame plus its context margin (§3.2 (9)), one closed chain carrying the structural `margin` role on the arena's `Terrain` entity, so every L0 face has a boundary before any water exists — then water faces, shores and banks (a sea or river reaching the arena's edge shares that ring, one edge carrying both roles), islets, oases, and every crossing site's two pinned `deck_end` bank vertices (§4.2 S1 (5)) | F-OUTLINE, F-RIVER, F-CONTOUR, F-SKELETON |
  | S3 | L0: harbour basins, canals, the castle moat, the city moat, the decoration ponds, and the deck bank vertices of every channel it carves · then L1: the **map border** — the frame rectangle of §3.2 (9), one closed chain carrying the structural `border` role on the arena's `Terrain` entity, laid across land and water alike as a deck span lies across its water (no L0 edge is added, §2.2 rule 1) — and the land reservations as barrier faces (§4.2 S3 (12)), independent ops of one declared batch | F-SITE, F-WALL, F-CASTLE, F-RIVER |
  | S4 | L0, only when F-ROUTE's extra-bridge rung fires on standing water: the new deck's two `deck_end` vertices by two same-level shore splits, nothing cleared (§4.2 S1 (5)) · then L1: the arterial graph's spines, inserted once, each span laid through the deck ends its route uses (those bridges become `built`) · then, on a ground part ≥ 1, each viaduct's raised parts (§4.3) | F-ROUTE |
  | S5, per stage k | k = 1 — S5a L1: S3's trace with its gate vertices · k ≥ 2 — S5b L0, only when F-ROUTE's extra-bridge rung fires on standing water: two same-level shore splits before S5b's L1 batch (§4.2 S1 (5)); S5b L1: the main roads, picked on the stage's boundary (data, no batch); S5a L1: the trace with every arterial crossing as a gate; then an outer moat's carve batches (L1: each arterial's crossing made one straight edge between two deck bank vertices, its deck span; L0: the channel, with those vertices as `KernelTx.prepared`; §3.3, §4.11) · every k — S5c L1: growth, then L1: the between-stage prune and trim · S5d: a top-up re-runs S5a's arc and S5c on the rim, each L1 | F-ROUTE (S5b), F-WALL (S5a), F-BUDGET-STAGE (S5d) |
  | S6 | L1: the settlement perimeter chain, then district owners and `district_bound` roles (one batch) · then, on ground parts ≥ 1, the elevated roads' and aqueducts' raised parts (§4.3) | F-ROUTE (a raised part's course, §4.3); a degenerate district face merges into its neighbour (§4.5) |
  | S7, per enceinte | L1: setback and glacis lines (the wall strips), the intervallum, gate-plaza claims, castle paths and inner-ward trace, quays, piers and moles | F-WALL, F-CASTLE |
  | S7b, per district | L1: district claims (`claimSubFace`) | F-SITING |
  | SKY, per island (V05; staged) | on the island's key: L0 — outer ring, rim, the land and void faces, then its water and each access's rim vertex; L1 — the rim strip line, the landing and institution claims · on the ground: L1 — the landing claims (`claimSubFace`) | V05's classes |
  | S12a, S10a, S10b, S12c, S7c, S9b (hooks) | none — decisions and records (field pass 2 is a raster; S12c's character records, §4.5); the hinterland's geometry is written by its unit's S10–S12b | F-SITING (S10a, S10b) |
  | S8, per district | L1: lanes, rear lanes and through-alleys with their T-junction ends | F-CUT |
  | S9, per district and for the hinterland | L2: `corridorUnion` | F-CORRIDOR |
  | S10 | L3, step (0): eagerly on the generation worker after S10a and before the pool's freeze, the shared-edge bands on both sides at once (§4.7 S10 (0)), ending with the rebuild of the L3 static partitions it touched · then per block, in the pool: claims, plots, alleys-as-faces and residue; in the hinterland unit's blocks, §4.9's recipe | F-CUT, F-PLOT |
  | S11, per block | L4: footprints and yard parts (a row's party wall is the plot's shared L3 side line carrying the `party_wall` rows, §4.7) | F-SITEPLAN, F-PLOT (cluster packing), F-SKELETON |
  | S12b, per district and for the hinterland unit | L3: park and grove layouts on its own reserved green faces and residue · then L4: yard-planting parts; avenue and street-tree rows write no plat edge (§2.7 `Greenery.along`) | a layout the kernel refuses is left out and reported (§4.9) |
  | S13a | none (names and label candidates) | F-SKELETON |
  | edits | one batch per operator and level, in §7.3's chain order (§7.1, §7.3); a multi-level conversion is a declared sequence of single-level batches (§4.11); decks as §4.2 S1 (5) | F-EDIT, F-REDERIVE |

  Every committed batch — in generation or in an edit — whose commit record changes a footprint face's rings is followed
  by §2.6's carry for that building before the next batch (J-P47). L0 is written by S1, S3, S4 and S5b (F-ROUTE's extra
  bridge only) and S5a (an outer moat's carve, §4.4); L1 by S3 — the map border first — S4, S5, S6, S7, S7b, SKY (the
  ground landing claims, V05 §3.10) and S8, in that order, and by no generation stage after S9 (J-P46). At village rungs
  (V07 §3.0) L0 is written by S1 and VS1; L1 by VS1 — the map border first — VS4, VS5, S7, S7b and VS6, in that order, and by
  no generation stage after S9; a product may add data keys to a reused stage's declared inputs
  (`ProductDecl.extraInputs`) to hold that order under the stage-id tie-break. S10 never writes L1: a rear or back lane is
  decided by S8's deep-interior rule (§4.6), and a lane a user adds later is a `drawWay` edit through §7.3's S5 operator,
  whose tree scoping re-derives every finer level under it (GEO-25). Static index partitions are rebuilt as §3.3 states,
  S10's step (0) included; work limits count kernel operations (§5.1 (5)).
* **The generation worker, the derivation pool and the hinterland unit (DEF-16; D-18).** The pipeline runs in one
  generation Web Worker; the tile worker and the main thread are §8.9's. The **primary configuration** at every rung adds
  a derivation pool of up to three workers (`min(3, hardwareConcurrency − 1)`) for S10, S10b, S11 and S12b, which run after
  the eager S10a allocation and S10's step (0). Each district runs on its own copy-on-write overlay over a read-only copy
  of the arena frozen after those two eager steps — its typed arrays and lookup tables and every non-empty level's static
  index partitions (L0–L3 at the one-click freeze, L4 too after edits), every dynamic grid empty, the partitions edits left
  dirty rebuilt first (§3.3 step 1; ≤ ≈ 15 MB at CITY) — and the overlays merge in district lineage order with a slot
  remap and their index partitions (§3.3's merge steps); any write outside a district's face set is `E_SCOPE`, and pool
  size 0 runs the same path in the generation worker. Ids need no reserved ranges (§6.3), and the pool makes no
  shared-edge writes (district boundary edges belong to L1 and L2, committed before S10). **The hinterland unit** — the
  hinterland pseudo-district's S10 (furlongs, outside plots, driveways, trails, woods, edge orchards), S10b (outside
  classes and, under §4.9's `fill` farm mode, the farm households), S11 (farmstead and outside site plans) and S12b (ring
  supply, ambient scatter, shoreline band) — runs on the generation worker while the pool runs the districts, on its own
  overlay over the same frozen arena; its faces are the hinterland's L2 blocks, disjoint from every district's, and its
  overlay merges with the districts' in lineage order under the pseudo-district's lineage; from the freeze to the merge
  no other writer touches the arena (J-P27). On the single-worker fallback the hinterland unit runs first, then the
  districts in lineage order. **Other units of the same kind:** each sky island's districts run as a unit of the
  hinterland unit's kind on the generation worker, on the island's own arena, from its `SkyUnitInput` (V05 §2.3; V01 §3.10),
  and a standalone neighbourhood document runs this pipeline on its own outline (V01 §3.10). While a loaded document is
  verified (§2.9 step 3), every edit runs its S10, S10b, S11 and S12b by the pool-size-0 path (§3.3 step 5). Which
  configuration is primary at each size — the pool, or the single worker that is the pre-decided fallback (also on the
  low tier and in hosts that forbid extra workers) — is measured at M1 and M2b by §12.3's rule; pool size 0 gives the
  same model (J-P10).
* **Emulation-first defaults (item 23; J-A23.41).** Every stage rule of this part follows §7.6's emulation rule, its
  reading rule for absolutes and its marker (J-A23.71); §10.2's `RelationRule.extension` and §4.7 S10b's
  `placement.extensionWeight` are the placement family's form of that marker.
* **The countryside is decided with the town and drawn after it (FTG's order; item 26).** S2 demands the hinterland's
  households and its food, fuel and timber with the town's (§4.2 S2; §4.9's farm table), S12a sites them once the town's
  districts are typed and its claims cut (S7b), and the hinterland unit draws fields and woods into the land the
  settlement perimeter leaves after S9 has committed the town's corridors — concurrently with the districts' pooled
  stages, which changes no output (§4.9; J-A26.41).
* **Elaboration by click — the trigger policy over the laziness contract (item 28; J-A28.41, J-A28.42).** The contract
  says what may be derived lazily; the **trigger policy** says when. It belongs to the viewer: `elaborate` — `click` or
  `view` — is a per-user view key (§2.9) that decides only the moment a pure rung is derived, never its content (CI:
  §6.5 (9)'s derived-complete digest, run over click orders too). `click`, the owner's choice, is the default: at city
  zoom the view draws the eager city LOD above — every footprint, MFCG's look; a "plots only" cadastral view is a view
  option of §8.5, never the default — and derives nothing finer until asked. Clicking a neighbourhood derives its
  close-up (II.4) and raises the `wings` rung of its buildings to `current` (§2.8's elaboration record); clicking a
  building raises its `plan` rung to `current`, after `wings` when that is still absent — the rungs are ordered outline →
  wings → rooms → plan (§2.6), so the plan rung enters the lazy list with §2.6's records, §6.1's streams and §8.5's draw.
  `view` derives every visible tile's rungs inside §12's budgets (§8.6's rule for `compose()`). A derived rung is saved,
  then stale until clicked, as §2.8's `ElaborationRecord` states (a stored plan is re-cut inside the changing event
  instead, §7.3, J-A28.72): the cached result stays on view with §8.5's change marker until the next click re-derives it
  from its canonical prior as a least-disruption mutation, never a re-roll (§2.6, §7.3; J-A28.71); viewing never
  re-derives a `current` rung. **Pre-assigned plots:** the eager content decision — a plot's use, class, assignment and
  `Lifecycle.assigned` — is taken before any building geometry: town-wide by S2, S7b and S10a, and per plot by S10b, which
  the first map runs for every district ahead of S11; a plot the dossier or a user assigns is therefore assigned at the
  city level and, as the owner puts it, "just not generated" — its geometry follows on the click.
* **Declarations read ahead — a skeleton's bones (item 101; J-A101.41).** A skeleton file (§11.1), or any document whose
  log opens with drawn declarations, enters them as the log's creation prefix (§7.7 *One path*) in their resolved form —
  a `points` form's shape derived at its dry run and stored resolved (§7.1). The base derivation reads that prefix ahead,
  each declaration by the stage that owns its subject and as a constraint of that stage — the form **Rebuild around my
  drawings** gives drawn constraints (§7.2), here with no rebase — as S2 already reads the prefix's assignments
  (J-A22.74): S1 takes the declared ground strokes and water (`setField` terrain, `drawWater`, `moveCourseKnot`, a lake's
  spring flag) into its terrain and water; S3 takes the declared walls and gates (`drawWall`, `placeGate`) as the
  enceinte's pinned trace and its forced picks, and a declared road's outer end as a destination; S4 and S5b take the
  declared roads (`drawWay`) as fixed routes; S6 seeds a district at each declared quarter (`quarter`, `drawBoundary`) with
  its declared kind and grows it to the declared boundary; S10b takes the declared places (`placeAt`, `assign`) as positive
  placements; the tail's stages (II.7; staged) take the declared tunnels, galleries, chambers, links, accesses and void
  neighbourhoods (`drawTunnel`, `drawChamber`, `addLink`, `placeAccess`, `addUndergroundAccess`, a `quarter` or
  `drawBoundary` on a void part) as held elements, a declared element making its system exist (V04 §4.7). The prefix's
  events keep their log positions as §7.4 states, so the town grows around its bones and one seed replays it byte for
  byte. A declaration a stage cannot honour is bent at its dry run to the nearest lawful one, named in one line with the
  alternatives (item 101 R2); only one that contradicts a dossier fact or a lock is refused (§7.1). A declared thing is
  held — no later derivation or New random moves it (§7.2, item 101 R13).
=== END ===

=== REPLACE ### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace ===
### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace

**S0 Blueprint.** `Blueprint = { version, seed, size: { rung: Rung /* §1.1 */, population? | areaHa? | buildings?,
tolerance, aspect /* 0.5–2, default 1: frame width ÷ height, §3.2 (9) */ }, intent (§7.7), site request (relief:
'auto'|'plain'|'rolling'|'hilly'|'mountainous' /* item 65; J-A65.49: default 'auto' — the feature table's relief row,
drawn on blueprint.features with the other auto features and recorded in autoResolved; our own weights plain 0.35,
rolling 0.35, hilly 0.2, mountainous 0.1 (calibratable; read under every preset, since S1 (1) scales its amplitude by a
relief class under each); a dossier's site.terrain sets it by §7.7 DR1, a `mountain` terrain being mountainous (item
109 (a)); read by S1 (1), S1 (10)'s geology row, §4.9's farm modes and the terraced-edges column */, coast side / bearing
with two arm rows, river with inflow bearing, islands and mouth, lake, oasis /* item 111: 'auto'|'on'|'off' */, hill, …),
toggles (walls, castle: 'inside'|'on_enceinte'|'outside'|'auto'|'none', castles: 0–2, plaza, temple, harbour, farms,
forests, shanty, greens, waterfront: 'open'|'quay_wall'|'sea_wall', wallPlacement, moat: 'none'|'inner'|'all'|'auto' /*
the innermost enceinte (S3) or every enceinte (outer ones by S5a's carve, §4.4); `auto` resolved by the feature table's
P(moat) row by rung and era to `inner` or `none`; wet only where water reaches it, S3 (10) */, sewers: 'auto'|'on'|'off' /* item 14;
below */ — MFCG's flags kept as intent), circumstances (era /* its row also carries the public-lighting density §8.4's
light rows read (item 68) */, government, biome /* its climate row: aridity, the arid water chances, the water pull and
the sunlight cell (items 102, 111), and the season columns (item 117; J128: `ClimateRow.seasons`, V11 §2.8's
`ClimateSeasonCells` — the winter's severity and the weeks, 0–51 spring first, of leaf colour, leaf fall, blossom, growing, harvest, hay, ice and snow, a band
wrapping the year's end — read only by §8.2's season rows, §11's exports and §7.7's season derivation row, never by a
stage, so no season changes the model or its hash, item 117 (a)); V11 */, economy, magic: 'none'|'low'|'high' /* item 68: 'none' by default, a fantasy
toggle under D-3; read by §8.4's light rows */, landscape toggles: fertile land, mines, quarries, fishing, logging,
geology: 'auto'|'ordinary'|'soluble'|'volcanic' /* item 65: default 'auto', resolved by S1 (10) */), history?: HistoryHint
/* item 113: a standalone history ("once a city, now a village") — the record the dossier port fills as Recipe.history
(§2.7); read by §4.11's history-first generation */, village?: VillageRequest /* V07 §2.7: read by S0 only when the
routed product is `village`; absent, all-`auto` */, style, assignments, edits }`. Intent expansion and the blueprint's
assignments and edits entering the log are §7.7's; the population chooses the rung and the size within it (§1.1; AM-4),
`LadderRouter` routing a population inside a registered product's range to that product (item 202; §4.12, PART III) and
clamping every other request at the ladder's ends as §1.1 states; the ladder coverage test (§13.1) runs S0 at every
rung's floor, target and top. **Auto features (COV-MFCG-A03).** Every toggle left on `auto` is resolved by a per-rung
**feature table** — P(coast), P(river), P(lake), P(oasis), P(castle), P(castle on the enceinte), P(temple),
P(harbour | coast), P(shanty), P(greens), P(moat) by rung and era … — drawn once from its own concern `blueprint.features` before any other stage
and never redrawn by a later rung, so "Enter" varies the structural features the way MFCG's master switch does; every
auto-resolved value is recorded in the report with its reason (O16 b). **What the base supports (COV-MFCG-Q01):** several
enceintes (§4.8); 0–2 castles (a second castle is a citadel on the outer enceinte, by request or by the METROPOLIS row);
islands, confluences and distributaries (S1); non-circular and polycentric settlements (S3); routed non-radial arterials
(§4.3); generated institutions (S2); multi-line labels (§9); continuous zoom, save and load (§8, §2.9).

**Water in dry country (item 111 (a)).** On a biome whose climate row is arid, S0's water rows read that row: P(river),
P(lake) and P(coast) take the arid row's chances (a river from wetter uplands, a lake, a coast all stay possible), and
P(oasis) is the row's oasis chance, multiplied by its no-other-water factor when no river, lake or coast was drawn (so
an oasis is likelier where there is no other water and still possible beside it); on every other climate row P(oasis)
is 0. A dossier's `oasis_water` makes the oasis exist (item 20; §7.7's DR row for it cites DR1); the user adds or removes
one with T2 `ground`'s lake point-and-level form and its spring flag (§7.1, §7.4). An oasis is water for every rule that
reads water — mills where it falls, the water trades, bathhouses, wells, the aqueduct's supply (§4.3), the island and
underground rules. A sky island's terrain draws no oasis and reads no water pull or climate cell (V05 keeps its own
water).

**S0's sewer feature (item 14; II.7.1).** At TOWN a `sewers: 'auto'` is resolved by the feature table's P(sewers) row —
II.7.1's law of the request's population and the intent's `wealthLevel` — drawn from `blueprint.features` with the other
auto features and recorded in `autoResolved`; `on` builds the network whatever the draw. At CITY and METROPOLIS the rung
row fixes existence on, and a requested `off` hides the underground layer instead, reported in `requestedVsBuilt`
(II.7.1). Below TOWN every value resolves to none (the village rows carry `never`, PART III), a requested `on` reported;
a missing toggle reads `auto`. The resolved value is `Features.sewers`, which every dependant reads from the model (II.7).

**S1 Site (O1; the mechanism that removes whole-map restarts).** A requested feature infeasible on the drawn site is
adjusted inside S1's own ladder (F-RIVER, §5.2).
(1) **Heightfield:** 5-octave fBm (VG's measured character, `_critic-vg-ng.md` V7) with a low base frequency and a
relief-character amplitude (metres by S0's relief class), plus **authored site primitives** from the request (hill,
spur, valley along the river bearing, terrace, cliff, ravine, hollow for a lake or an oasis — VG's idea of authored
mount, hollow and ridge primitives). Heights are stored in §2.3's range and datum; S1 sets `datumCm` to sea level on a
coastal site and to the site's base elevation otherwise (a 3 000 m relief is ordinary). *Mechanism (budget: §12.4):* the
fBm is evaluated on a 32 m grid over frame + margin; the stored raster (at §2.3's resolution per rung) is its bilinear
refinement plus one fine octave inside the built extent; slope queries at 2.5 m go through the `TerrainSampler`'s
on-demand interpolation (§2.3).

(2) **Coast.** From a sea bearing (MFCG's `sea` angle, kept as the request's coast bearing) and an intent (bay / headland /
straight / fjord / islands), one **closed-outline routine** draws the sea polygon. *Arms (COV-FTG-H04):* the base line is
two arms from a point near the town toward two frame edges, each with its own **shape** row (smooth / gentle / sharp: the
lateral amplitude and count of the arm's 3–5 control points, then a centripetal Catmull-Rom through them) and **detail**
row (none / bays / deep bays / rough / jagged: fBm amplitude, frequency, warp strength and, for bays, the count and depth
of indentations) — our own values, calibratable. The base line is displaced by domain-warped fBm under an amplitude
envelope that damps detail near the town (FTG's "ease into detail") → resample → Chaikin. **Simplicity (GEO-13):** the
normal displacement at every sample is clamped to 0.8 × the local feature size on that side (the distance to the base
shape's medial axis, read through `skeleton(rings, 'spine')` (§3.4) as §3.8's `spine` reader with its sampled-medial-axis
downgrade; for an open arm, the distance to the facing arm or the frame), which keeps small islands, elongated ovals (end
radius ≈ b²/a) and fjords simple for any fBm draw; a resampled ring that still self-touches is repaired by a non-zero
union — the component containing the anchor (the town side) keeps the outline's id, and every other loop is typed by
rule (a land loop in the sea above the minimum islet area an `islet`, a water loop on land above the minimum pond area a
`pond`, anything smaller absorbed) and reported (property test: §13.2). **Contours and coast (GEO-14; J-P12):** the
vector coast is authoritative — the raster is lowered below sea level on the sea side, every land cell within two cells
of the shore is raised to at least sea level + 10 cm and every sea cell held at most sea level − 10 cm; contour lines
are not model geometry: their extraction and clip to the land faces are §8.2's relief tier (F-CONTOUR, §5.2), so a
contour never crosses the shore, cliffs and sub-cell spits included (steep-coast and cliff fixtures in the golden
suite). The same routine with a closed base curve makes lakes (from sinks), ponds, oases, islands (a raised closed
curve) and — with `elevationCm` set — **the floating-island outline** of the LAYER hook, which gets its own arena,
`Terrain`, datum and frame (§2.2, §2.3) and may carry its own terrain from the same S1 with a request that echoes the
ground (e.g. a conjured river with the ground river's bearing; AM-2); where it floats is II.6's placement rule, its
occlusion §8.4's `LayerSpec.occlusion`. For a standalone or sky outline the base curve comes from an **outline
template** row, `type OutlineTemplateId = 'star'|'star_round'|'street_strip'|'plaza_frame'|'disc'|'d_shape'|'lozenge'|'crescent'|'spindle'`:
`star`, `star_round`, `street_strip` and `plaza_frame` (item 285's: a standalone neighbourhood document's, drawn by its
fabric, V01 §3.10.2), `disc`, `d_shape` (the D-shape), `lozenge`, `crescent` and `spindle`, scaled to the requested area
(COV-NG-N06); V01's `HoodRecipe.outline`, `TemplateRow.outline` and `hood.kinds` and II.1's
`NeighbourhoodRequest.outlineTemplate` name a row by its id.
**The oasis (item 111 (a)).** An oasis is a spring-fed pond or small lake: its site is the best-scored hollow or fault
line (a relief break) within the frame's middle two thirds, scored on accumulation and low ground; its outline is the
routine's closed curve sized by the climate row's oasis area band, entered as a `WaterBody` of kind `lake` whose
spring point (`WaterBody.spring`, §2.3) is its source; around it S12b plants the grove row and S12a sites the irrigated
gardens (§4.9). A site with no hollow takes the lowest ground cell of that band.

(3) **Hydrology.** Sinks are filled by a bucket-queue priority flood on the integer heights of the hydrology grid
`Terrain.hydro` over frame and margin (16 m at TOWN, 25 m at CITY, 32 m at METROPOLIS; §2.3) with exact flat surfaces —
a filled depression keeps its spill height, never raised by ε — and a depression deeper than the table's lake threshold
is typed a lake; then D8 flow direction and accumulation. **Rivers by descent:** the inlet lies on the arena's upstream
edge (frame + margin; the requested bearing or the highest edge), so the drawn margin shows the river arriving; the
course is traced by steepest descent with a lateral meander term — a Chaikin-smoothed control polyline whose knots sit
mostly on alternating sides, our own construction — and **the terrain is carved to the course**, its bed descending
monotonically to the outfall so no depression is created and the flood is not repeated; after the carve, D8 is
recomputed on the carved corridor cells and their neighbours and accumulation once (≈ 2 ms at CITY), so the river always
reaches the sea, a lake or the frame. Width `w = w0 · acc^0.4`, clamped to the class band (FTG's ≈ 31 m mean river width
at CITY is one calibration point); tributaries by the same rule from secondary inlets. **Bounds (GEO-36):** knot offsets
are clamped to half the control spacing (`river.controlSpacingM`); S1 records the control knots in `WaterBody.controls`
with ordinals in course order (§2.3), the recorded input a `moveCourseKnot` edit addresses (§7.1); a self-touching course
is re-traced with the offsets halved; carving is capped at `carveMaxCm` (400 cm at TOWN and CITY, 600 cm at METROPOLIS)
and a course that would need more is re-routed by F-RIVER (§5.2), never trenched. **Mouths (IMP-9, COV-FTG-H11):**
`mouth: 'estuary'` is a widening width profile (MFCG's delta-river option is a widened mouth, `_critic.md` C15);
`mouth: 'delta'` splits the course inside the delta zone (within the table's distance of the sea, where the bed slope is
below its threshold) into 2–4 **distributaries** at splits spaced ≥ 3 channel widths, each carrying a share of the
accumulation drawn from the `water.delta` stream (each ≥ 0.2), of width `w0 · (share · acc)^0.4`, traced by descent to
the sea without rejoining; a distributary that would meet another merges, and the land between becomes a river island
under (4).

(4) **River islands** (the parity judge's shared repair): a `river: { islands: n }` request adds a branch that leaves the
course and rejoins it after k cells, typing the enclosed land as an `islet` L0 face, **only if** the branch's separation
from the main channel stays ≥ (w_main + w_branch)/2 + the minimum islet width (table: 20 m); otherwise the island is
reported as not built. Mid-channel islets appear at reaches wider than a table threshold with a per-reach probability.

(5) **Crossing sites and decks (GEO-17; J-P44).** One function, `siteCrossings(reaches, bandM, existingDecks)`, sites
crossings: S1 runs it over every reach, S1's water operator (§7.3 (b)) over the re-traced reach only. The narrowest and
shallowest reaches within the search band (the base settings cell `crossing.searchBandM`, V11 §3.1) become crossing
sites, typed `ford` (width < table) or `bridge_site`, with a minimum spacing (FTG's 40 m as the default). Each site is a
**pinned deck**: a bank-to-bank segment perpendicular to the local flow (the course tangent averaged over one channel
width upstream and downstream), its two ends inserted by S1's L0 batch into the shores as the `deck_end` vertices of a
`Bridge` in state `site`, pinned against every later smoothing. S3's decks on the water it carves (S3 (2), (10)) have the
same form and the same two states.
* **A site becomes a bridge only when a way uses it** — as FTG turns only its crossing road proposals into bridges,
  gated by its 40 m minimum distance, and MFCG draws one bridge per street crossing (1–4 per city;
  `research/findings/ftg-docs-params.md`, `profile-mfcg.md`). The way S4 or S5 routes through the two vertices lays the
  span — its own L1 edge between them, carrying the structural `deck` role beside `way` — the `Bridge` becomes `built`
  with that way, and S7 builds its furniture (§2.7, §4.8). No L0 edge crosses the water, no deck splits a reach's L0
  face, and every bridge has one structure (§2.2 rule 7; J-I12). S4 routes to a site's ends as a fixed graph edge
  (§4.3), so "bridges within ± 10° of the channel normal" holds on the way itself by construction.
* **A site no way uses by the end of S5 stays a `site`:** two pinned bank vertices and a record — no span, way or
  furniture; not drawn, named, labelled or exported (S13a names a bridge once built; renderers and exports draw deck
  spans only); outside §5.3's deck rows. An epoch's growth (§4.4, §4.11), a drawn bridge (§7.4) and F-ROUTE's move rung
  (§4.3) may use it later. On a sky island's arena, where no S4, S5 or S7 runs, V01's unit run lays the span of each site
  whose two banks border the island's built land in one L1 batch before its seeds, builds each span a street reaches by
  §4.8's bridge rule (`deckCm` — from the two bank elevations through `levelledGroundCm` on the island's key, which
  before S10 returns the island's raster (§4.7 *Levelling*) — `kind`, `piers`) in one L1 batch after its S8 and before
  its S9, so S10's deck plots and S11's `DeckContext` read a built deck, and lays the bridges' furniture in its closing
  batch; a site it does not lay, or whose far deck end no street reaches, stays a `site` (a laid span removed in the
  after-S8 batch), reported (V01 §3.10.3 (4); item 580).
* **A deck where no site stands, on water that already stands** — F-ROUTE's extra-bridge rung (§5.2) in S4 at
  generation (after S1 and S3 committed every shore), in S5b at stages k ≥ 2 and in every epoch (§4.4), or in S4's
  operator in an edit that moves no water; or a drawn bridge with no site within `crossing.snapM` (20 m, half the minimum
  spacing) of the point where it crosses the channel's centreline — is placed by **one L0 batch of two same-level shore
  splits** before the way's L1 batch: `splitThrough` at L0 on each shore at the deck's bank point, perpendicular to the
  local flow, carrying the `deck_end` row of a fresh `Bridge` (`over: 'added'`), pinned. A street end already within
  `attractCm` of that point (a vertex carrying a `way` row) is attracted and promoted (§3.6); any other bank point keeps
  `attractCm` from every vertex on the shore's route, the map border's crossing included; nothing is cleared, and the
  finer faces whose rings run along the shore gain the vertex (§3.3's same-level-split rule). The way's L1 batch then lays
  its span through the two vertices, as at a site.
* **A deck placed before its water exists** is built by the batches of the operator that inserts the water — on a
  carve's kept way (§4.11), on an outer moat's arterial (S5a carves it by the carve path, §4.4), on a kept way of S1's
  water operator (§7.3 (b) 3), and for a deck F-ROUTE's extra-bridge rung sites inside one of these. Inside such an
  operator the rung only **sites** the deck, as data, with the operator's other crossings (§7.3 (b) 2): its two
  `deck_end` vertices are placed on the way's new route at the new bank points, under a fresh `Bridge`, by the operator's
  L1 batch (§7.3 (b) 3; §4.11 batch (1)), and promoted to L0 by its L0 batch when the water is inserted through them
  (§3.3; §7.3 (b) 4; §4.11 batch (2)). No shore split runs, because the shores that exist then are the ones that L0 batch
  removes.

(6) **Harbour candidates:** coast faces with depth ≥ threshold; on a site with no coast face that passes it, the reaches
of a river (never a tributary, distributary or islet channel) and the shores of a lake whose depth passes the same
threshold — a **river or lake harbour**, its basin cut into the bank by S3 (2) and opening on the reach (a dossier's
`deep_harbour` reads it so, V08 §2.6); a site with neither has no candidate, and a `harbour` request or a `deep_harbour`
there is left out (§5.1 (7), tier 6) and reported. (7) **Bank classes (COV-FTG-H06):** every shore segment
is classed `bay`, `headland` or `straight` (`WaterBody.shoreClass`, §2.3) by the signed curvature of the shoreline
smoothed over 200 m (thresholds in a table); its bank kind — beach / rock / cliff / quay / marsh — is drawn from a
per-class weight table (our own weights) conditioned on slope and exposure (G-R5), so bays tend to beaches and headlands
to rock and cliff; the class is kept per segment for §8's shore decoration. (8) Water faces enter L0 with `shore` / `bank`
edges; land components by flood fill (MFCG's land-component build), every one given uses later (O14 g). **Shore setback
(COV-FTG-H07):** a table `shoreSetback` per bank kind — plots: beach 6 m, marsh 10 m, rock 3 m, cliff 5 m from the edge,
quay 0 m (quay plots front the quay way); fields: 10 m — read by S10 and the hinterland unit (§4.9); the band is typed
`shore` greenery or commons. (9) **Drainage stays queryable, and S1 writes `Terrain.outfalls` (§2.3):** per water body,
each 50 m bank stretch (`outfallStretchM`) into which D8 flow from land enters, and each 50 m of frame edge the flow
leaves by, as one `Outfall` at its cell of largest accumulation; recomputed by S1's water operator after a water edit
(§7.3 (b)). Its readers: the sewer network stage (`Terrain.hydro`, `outfalls`; II.6, II.7.2), II.7.6's cavern rule
(`flowAccum`) and §10.2's `BasementGateRow.drainageAccumCells`. (10) **Resources (COV-FTG-B09):** `SiteResources` rasters
on the terrain grid — stone from slope, rock class and cliffs; ore from relief × an fBm propensity (hills only); timber
from the forest propensity (slope and soil class; realised as woods by the hinterland unit, §4.9); fish from water
adjacency and reach width; clay from low damp river flats; fertile land from gentle, dry, non-rock ground; **well yield**
(item 111 (b)) from the ground class — alluvial ground, a dry riverbed's gravels, low ground by the water table — by V11's
water table (wells per hectare and yield by ground). The S0 landscape toggles clamp a kind to zero or raise its floor;
S2's resource gates, S3's water pull, §4.5's water term, S10b's wells and S12a's outside sites read these rasters. S1
also writes the site's **geology flag** (`Terrain.geology`, §2.3; item 65; J-A65.49): the S0 toggle's value, or for
`auto` the feature table's geology row at S0's relief class — P(soluble) plain 0.10, rolling 0.20, hilly 0.30,
mountainous 0.45; P(volcanic) plain 0, rolling 0.02, hilly 0.05, mountainous 0.15 (item 109 (a) (1); our own rows,
calibratable, `extension`) — read against one uniform that S0 draws for it on `blueprint.features` with the other auto
features, before any other stage: `soluble` below P(soluble), `volcanic` at or above 1 − P(volcanic), else `ordinary`,
recorded in `autoResolved` with its reason (§5.4). **Mining** (item 109 (a) (2)): the site holds mining where
at least `miningCellShare` of the frame's land cells hold `SiteResources.ore` ≥ 0.5 (V11 §3.23.1's `under.systems`
cavern-row cell, II.7.6's `UndergroundSystemRow.params`), the roster holds a mining class, or the dossier lists a mining
deposit (iron, precious metals, gemstones, coal, copper) — this test's one statement, which every reader takes through
the flag; S1 records it as `Terrain.mining` (§2.3), which II.7.6's cavern rule reads for
its mine boost and fissure variant. A sky island's terrain takes `ordinary` and no mining, as do the parity presets (no
reference has an underground); only II.7.6's cavern rule reads the flag, and quarry voids read `SiteResources.stone`
(item 65, II.7).

**S2 Programme (the roster demand side; O7).** From `population` (or derived from area or buildings by the size tables)
— the dossier's population and circumstances when the map is bound to a dossier, the blueprint's own as the dossier's
stand-in when there is none (§7.7's derivation table; item 20 (h)): households by wealth band (the band set of §4.5,
whose default shares are FTG's captured lifestyle distribution; item 27); institutions (the markets — one principal and
secondaries by size, below — temple, churches per capita, guild halls, inn, mill on water, tannery; the seats the
`government` circumstance forces, §10.2, COV-FTG-B13); building demand per class from **our own** dependency tables run
as §10.2's sequential, prefix-stable roster (FTG's idea, none of its values), with resource gates read from
`SiteResources` ("no farmland → no farms, shops instead"). A host `ContentProvider` registered through door 4 (§11.4,
§14) replaces the roster here (`roster`), the siting at S10b (`site`) and the people at §10.3 (`people`), its outputs
read from the document's `hostContent` block on replay; with none registered the base's own rows run (the fixture
provider of §13.2's contract tests exercises the three call points). Outside classes (farmsteads, mills, quarries,
lumber yards, fisheries, mines) are demanded here, sited by S12a and placed on the outside plots the hinterland unit
builds (FTG-7).

*Markets — several, by size (item 24; emulation baseline: MFCG's central plaza doubles as its market and its later
wards may add secondary plazas, rarer since 0.9.2; FTG places market squares by its district rules, two in its captured
city).* The `market` class row (§10.2) demands `N_markets`: the **principal** market (`min` 1 at every rung) and the
**secondary** markets — the row's `firstAtPopulation` (10 000, the CITY floor) and `perCapita` (one per 12 000
inhabitants beyond it; our own rows) — plus, our extension, one per growth nucleus beyond the first in a polycentric form
(S3 (1)) and the town-level character's mercantile shift (below); at TOWN a secondary market is drawn with the row's
`secondaryChance` (0.15) rather than by count, so towns rarely have one. A market is a `Reservation` of kind `market`
with a `rank` (§2.5): the principal one is sited by S3 (12), every secondary one is a district claim of S7b (§4.5 S7b
(3)) except a polycentric nucleus's plaza, which S3 (12) ranks secondary, and each has its `market` district (§4.5). The
market hall's and the market trades' rows read a market's rank (§10.2). The sequential roster keys each market by
ordinal, so an epoch's suffix may add a secondary market, which the epoch's S7b claims by the same rule (§4.11).

*The hinterland's demand, decided with the town's (item 26; FTG-7).* The farm table of §4.9 turns the population into
farm households and arable land, and its fuel and timber rows into the wood the settlement burns and builds with:
`farmsteads` (none under §4.9's `perimeter` and `rivers` farm modes, whose farm households are housed in the town — a
mode that depends only on the rung, the climate row, S0's relief class and S1's resources), the farm households
`householdsPerFarmstead` × `farmsteads` (under `perimeter` and `rivers` the town's residential demand takes them),
`coppiceHa` and `managedWoodHa` are demanded here; the outside classes' `produces` and supply edges (§10.2) carry them
into the need propagation below, and the hinterland unit sizes the fields and woods it draws to them under §4.9's mode
and extent rules.

*Demand in plot counts (FTG-2; J-P6).* Stage demand is **plot counts per class × band**: `n(c, b, k)` = the class's
demand × the band shares × stage k's quota share. Residential band shares are the roster's household wealth shares
(shifted by the town-level character, which S2 reads from the circumstances' economy slice — its sector shares — so one
input drives the roster and the economy dial; §10.2, item 72); workplace bands come from the class row's lifestyle band.
Stage land is `A_k = Σ_(c, b) n(c, b, k) · plotArea(c, b) · (1 + λ_b) / plotShare(regime_k)`, with `plotArea` the
*plot* area of the granularity table's band centre (§4.7; footprints and coverage are not in the formula) — for a
residential class the expectation over the class-mix weights at the band centre (§4.7 S10b, item 71), so demand and
capacity keep agreeing when S10b draws a larger class — `λ_b` the block dispatch's land share at band b (V01 §3.5.9; 0
without `@plat/hood` and in the parity presets), and `plotShare` the measured share of a stage's land that is plots (the
rest is corridors, squares, greens and residue): **dense core 0.62** — MFCG's gross cover inside the wall is 0.60–0.65
at sizes 40–250, its lots being plots in our sense (`captures/mfcg/exports-sweep-2026-09-25/README.md`, CONFIRMED) —
gapped rings 0.55, ribbon 0.45 (PLAUSIBLE). **Measurement:** M-1 #5 (FTG face recovery, on its decoded road graphs)
measures the share of FTG's land inside its road-graph faces — FTG's client as captured on 25 September 2026 receives no
plot, FTG's subdivision running on its server on those faces (item 49), so this bounds its plot share from above; M1
measures B-CITY's own per regime. **Fallback:** if S5d's top-up fires on more than 10 % of B-CITY seeds at a rung, the
`plotShare` rows are refitted from B-CITY's measured share per regime by one scripted pass, with a declared golden shift
(§13.3).

*Stages and the walled share (MFP-6; J-P5).* Stage rows per rung (a table, era-calibratable): **TOWN** 2 stages — walled
core 0.90 of buildings, ribbon 0.10; **CITY** 3 — inner walled 0.55, outer walled 0.33, ribbon 0.12; **METROPOLIS** 4 —
inner 0.30, middle 0.30, outer 0.28 (all walled), ribbon 0.12. FTG's cul-de-sac **suburb** regime is added only by the
era or form preset or by the shanty toggle (and, in a history, by V06's suburb regime, §4.4). The share inside the
outermost wall is thus ≈ 0.9 at TOWN and ≈ 0.88 at CITY and METROPOLIS, anchored on MFCG's measured 0.87–0.92 inside the
wall at sizes 40–250 with shanty towns off (sweep README, CONFIRMED); FTG's ≈ 20 % walled preset stays reachable as a
preset row, and the corpus phase recalibrates the rows. Each growth stage stands for `yearsPerStage` years of the town's
age (50, a stage-row column; our own, calibratable), the age II.7.6's catacomb rule reads. **A known history (item 88;
J-A88.42).** When `HistoryHint` is filled (the dossier port's `Recipe.history`, or the blueprint's `history`), the stage
count becomes K′ = min(K, max(1, ⌈`ageYears` ÷ `yearsPerStage`⌉)) — a young settlement is grown in fewer stages: stages 1
to K′ − 1 keep their rows, every later walled stage's share folds into stage K′ − 1 and the ribbon stage stays last (at
K′ = 1 the one stage takes every share) — and only the rules that name a scar's type read it: a `fire` or `flood` scar (a
`RaiseGrade.cause`) by II.7.6's buried old town, any other type by none, the creation week showing a finished town
(J-A67.47). Empty, K is the rung row's. With the evolution engine (M6-E) a history with a peak is generated history-first
instead (§4.11 *History-first generation*), and the stage count is the peak's.
**Output:** `Roster` (demand by class with area / frontage requirement classes, district affinities, wealth bands) and
`StageQuotas[]` (plot counts per class × band, land area and regime per stage: dense core → gapped rings → ribbon, plus
the optional suburb; FTG's zonal gradient, R4).

*Ladder records' members (item 108 (b), (c)).* A collective record (DR9; V08 §2.6's `distribution` row set) — a COUNT step's lesser buildings, a
QUARTER step's trade, a GUILD step's workshops (§10.2's ladder step table) — takes its member count from this roster's
per-capita rows for the lesser class, clamped into the record's numeric range or, unnumbered, into the ladder table's
range per kind and rung; the members are keyed `#k` (J-A74.73) and the record's state spreads over them (J-A80.72).
Where a greater and a lesser of one ladder both reach the map, the lesser becomes a member of the greater's collective,
never an addition, and the roster's own per-capita buildings of that class are the record's members. A SIZE step is one
larger building by its template, a REPLACEMENT step the greater only.

*The grandeur ceiling's manor count (item 115; J127).* At the `territory` rungs S2 reads the rung's `grandeur.ceiling`
row (§10.2 *Grandeur ceiling*): an enabled row caps the manor class's count at its `manor.max` and admits a manor only
where its `manor.requires` is met — `lordOrSpecified` a `seigneurial` government or a specified manor, `specified` a
specified one only (V08 §3.16 (3): a dossier-bound record of a class in `grandeur.ceiling`'s `settings.grandClasses`
(V11 §3.25.4), or a dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1)) —
and a specified manor is a fixed row above the cap (item 115 (c)); a disabled row, and every row at TOWN and
above, leaves S2's count as the roster gives it (V07 §3.8; §4.7 S10b *The rung ceiling*).

**S2 need propagation (item 16 (b); with §10.2's supply edges).** After the sequential roster has produced the manifest,
S2 walks the supply graph: for every manifest building whose class has a `hard` supply edge it counts the providers of
that resource within reach — the site resources `SiteResources` provides (farmland → grain, and timber, stone, ore, fish
and clay; S1 (10)), the hinterland land uses whose kind is a good's `site.landUse` (`ResourceRow.site`, V11 §3.7.1), the
harbour and the gates for the `import` resources (§4.7 S10b), and the manifest's producing classes (`produces`) — at one
provider per `perConsumers` consumers, a provider of any of the edge's `substitutes` counting as a provider of the
resource; where the count falls short, the producing class of highest priority receives its next building through its
own `roster/<class>/<ordinal>` draw, so the addition is prefix-stable (the propagated demand is a monotone function of
the manifest and enters the sequential run as a `perOther` floor), to a table depth (default 3: brewery → maltings →
farmstead). A resource no class produces and no site provides takes the roster's existing substitution (no farmland → no
farms, shops instead) and is reported as an import; the hinterland's food, fuel and timber rows are the outside classes'
edges (§4.9, item 26). The propagated buildings are demanded here, allocated by S7b and S10a and placed by S10b (§4.7).

**S3 Siting, reservations, the stage-1 boundary and its trace (J-P26).** S3 decides everything the first enceinte depends
on in one construction — the gate routes are solved first, the stage-1 boundary is the travel-cost level set over them,
the gates are where the routes cross it, and the castle weld and the moat are placed on the trace pulled from that
boundary, so no later stage recomputes a boundary they were fixed on — and commits it in two batches, L0 (every water
body it carves, with the decks its crossings need) then L1 (the land reservations), before S4 commits a single way.
1. **Centre(s).** Candidate centres on a coarse lattice inside the frame's middle third are scored by a rule table —
   distance to a crossing site (river towns sit at fords and bridges), to the harbour candidate, to reliable water (the
   water pull, (6)), slope, elevation above the flood line, wind exposure, distance from the frame, and a controlled
   random term; the best is the **centre** — the nucleus the main plaza (2), the gate routes (5) and the field `T` (6)
   are rooted at; it is not by law the market, whose principal site is chosen at (12) by where trade meets, the plaza
   itself by default (MFCG's central market) and possibly a bridgehead, the harbour, a gate or a main street instead
   (item 24; J-A24.41). **The site is placed relative to the river** (G-P14), so "no river through the core" cannot occur
   when a river is requested; the invariant is checked here and repaired by moving the centre, never by re-rolling.
   **Polycentric forms (IMP-9):** the `twin-town` and `polycentric` form rows site k = 2–3 nuclei (candidates inside the
   frame's middle half), each scored the same way, each with its own share `A_1,i` of stage 1's land (a form-row share),
   its own main plaza (2) and its own gates (4); the principal market is sited at (12) among every nucleus's candidate
   sites, and the plaza of a nucleus that does not win it is a secondary market when the roster's count allows (S2),
   ranked and committed with the principal at (12). Nuclei are sited at least the **separation floor** apart:
   `sep_ij = τ(a₁) · (R_i + R_j) + (outer setback + glacis)_i + (outer setback + glacis)_j + g`, with `R = √(A_1/π)` a
   nucleus's equal-area radius, `g` one ribbon plot depth (30 m) and `τ(a)` the tip factor of the anisotropic level set
   (its reach along a road over R): table 1.2 at a = 1.3 and 1.4 at a = 1.8 (above the executed 1.13–1.18 and 1.24–1.34,
   receipt `docs/validation/bench/fixall_pipeline_r2_levelset.out`), τ = a for any other a (a safe bound). The form row's
   separation band runs from that floor to 400 m beyond it (≈ 800–1 200 m for two 29 ha nuclei at TOWN); the ground
   between the nuclei is grown as an extramural regime in S5.
2. **Plazas and the reservations that do not read the boundary (MFP-3, GEO-19).** The **main plaza** of every nucleus:
   area band TOWN 0.25–0.45 ha, CITY 0.35–0.6, METROPOLIS 0.45–0.8 (anchored on MFCG's 0.32–0.58 ha across sizes 40–250
   and the red team's 0.36–0.54 ha); a compact 4–6-vertex polygon at the nucleus aligned to the contours, compactness
   ≥ 0.8, whose vertices are the attach points arterials end at, so the plaza acts as MFCG's roundabout. The **temple or
   cathedral precinct** adjacent to the main plaza by score, sized from its institution row — not reserved where the
   creation prefix sends its institution to a sky island (a T5 `sky` declaration of its kind or a T6 `criteria.sky`
   assignment, V05 §3.5), and likewise the reservation a palace takes by the castle's siting rules (8); a reservation
   whose institution a later S7b (5) slot takes up is handed over by V05 §3.5 (the row's hand-over class, else a park;
   `Reservation.handedFrom`, §2.5), never left without an owner. The **markets** are not planned here — the principal
   market is sited at (12), once the sites where trade meets are fixed, and every secondary market is S7b's claim (§4.5
   S7b (3); item 24) but a polycentric nucleus's plaza. The **harbour basin** (a template shape — rectangle,
   semi-octagon, semi-hexagon, L wide or narrow — scaled to port demand) at the chosen harbour candidate; and **canals**
   along a least-cost line between two water bodies, each carrying decks of S1 (5)'s form at the spacing row
   `canalDeckSpacingM` (150 m inside the predicted built extent, 600 m outside it). These are planned polygons here: the
   lattice sees them as reservations and water (water impassable except along its decks), and they are committed in (10)
   and (12).
3. **Lattice and costs.** S4's candidate lattice and its edge costs (§4.3) are built here, once, over the planned water
   and reservations of (2).
4. **Gate picks and bearings (MFP-4, COV-MFCG-E04; J-P24).** `N₁` (per nucleus) = the request, or
   `round(1 + 0.47 · √A_ha)` with A the stage-1 land — a law that reproduces MFCG's 5 / 8 / 12 gates at sizes 40 / 80 /
   130 from their walled areas of 58 / 220 / 548 ha, and 18 at size 200 (receipt
   `docs/validation/bench/fixall_pipeline_mfcg_fits.out`). **The waterfront reduction (J-A46.41).** Where the nucleus has
   a waterfront — the pick contour below runs along a sea or lake shore for at least `gate.waterfrontShare` of its length
   (0.1; our own, calibratable) — the land law's value `N_land` becomes `N₁ = 2 + ⌊0.75 · (N_land − 2) + ½⌋`: fewer land
   gates where water takes part of the circuit, 4 / 7 / 10 / 14 where the land law gives 5 / 8 / 12 / 18, never more than
   `N_land` (provenance `ref:MFCG 12710731 coastal gate reduction (code)`, P11: MFCG 12710731's coded law counts mesh
   cells — 2 + ⌊0.75 × inner cells ÷ 12⌋, recorded 3 / 4 / 5 / 7 gates at sizes 26 / 39 / 51 / 80 — and this rounding of
   0.75 applied to the land law's surplus over two gates is its metric restatement). A requested `N₁` is taken as given,
   and a river takes water gates, not this reduction. **Closed arcs (item 106 (a)).** The barrier closure of §4.4 S5a step
   1 is classified on the pick contour before the picks, each arc by its defensibility row (V11 §3.16.1), and the picks
   fall on its **approachable** arcs only: those whose row does not close (`open`, and `shallowWater` at the base's
   kinds). Where the arcs a barrier other than a sea or lake shore closes (a cliff, a steep slope, a gorge, a marsh, a sheer
   face, a river's banks round a loop) take at least `gate.waterfrontShare` of the contour, `N₁ = max(1, ⌊s · N′ + ½⌋)` —
   `N′` the value after the waterfront reduction, `s` the contour's approachable share (a sea or lake shore counted
   approachable here, the waterfront reduction having priced it), so the land law's gates keep their density along the
   walled share — reported as the waterfront reduction is; a requested `N₁` keeps its count, its picks on the approachable
   arcs. A contour with no approachable arc is (9)'s *every arc closed*. Picks are **sequential nested picks** from the `gate.pick` stream on
   the **pick contour** — the level set of stage 1's land in the terrain-only field (a = 1), which serves only to score
   candidates: pick i scores the contour's candidate points by angular gap to the earlier picks, nearness to a requested
   bearing (a bearing of the site request, or the bearing of a `road` partner of the trade slice — item 77 (b), §7.7
   DR3), terrain (saddles and valley exits up, steep ground down) and a jitter, so a smaller N is always a prefix of a
   larger one. Each pick carries a **bearing**: the requested bearing it serves or, when none was requested, the
   least-cost outward direction from the pick to the frame; a bearing's **trade weight**, which (12) and §4.7 S10b's trade
   rows read, is its gate's weight in `TradeFlow.gates` (§4.3, computed at (7); J-A77.41, J-A77.42), read from the
   circumstances' trade slice (§7.7 layer 2; items 72, 77). A polycentric nucleus's first picks are forced at the bearings
   of its adjacent nuclei.
   **The harbour pick (J-P45).** When the town has a harbour and `N₁ ≥ 1`, let `L*` be the path to the harbour's
   destination node (13) in the plaza-rooted Dijkstra tree over (3)'s lattice (the tree (5) routes the gates with,
   computed here once) from the plaza of the nucleus nearest the harbour — the least-cost lattice path, the wall ignored.
   When that node lies outside the pick contour, that nucleus's first unforced pick is **forced** at `L*`'s first node
   beyond the contour, after any polycentric forced picks, so the nested-prefix property and N are unchanged. If that
   nucleus has **no unforced pick left** — its `N₁` taken by polycentric forced picks (a nucleus of under about 10 ha
   between two neighbours, whose law gives `N₁` = 2, or a twin town's requested `N₁` = 1) — no pick is forced, its forced
   picks stay, and the detour guard of (7) applies to that town unconditionally. The forced pick's bearing is the
   least-cost outward direction to the frame; its gate route's inward part is `L*`'s own prefix, so a walled port has a
   main gate on its harbour side and the harbour route (11) leaves through it. *Measurement (M1):* the committed harbour
   route (11) against `L*` on every B-CITY walled coastal seed, p99 of the ratio ≤ 1.5, and ≤ 1.5 on every §13.2 walled
   coastal fixture. *Pre-decided fallback:* the detour guard of (7).
   Where the river crosses the boundary, **water gates** are added (not counted in N). `N = 0` produces no main gate and
   no external arterial through the wall — a harbour outside the stage-1 region still gets the harbour gate of (7); the
   sealed circuit is reported and the extramural stages are folded into the walled stage.
5. **Gate routes, solved (not committed).** For every pick: the route from its plaza's attach point through the pick to
   the frame at its bearing — the plaza-rooted Dijkstra tree to the pick, heap A\* beyond it — on (3)'s lattice with S4's
   cost function (§4.3); an island town routes to its landings and a polycentric pair gate to gate. S4 commits exactly
   these routes and reuses the plaza-rooted tree for its own plaza-anchored routes (§4.3). The harbour ↔ plaza route is
   **not** among them and never enters `T`'s road set; it is solved in (11), once the boundary and the trace exist
   (J-P35).
6. **The stage-1 field and boundary.** The one travel-cost field `T` of §4.4 S5a is computed here: a multi-source
   Dijkstra from the plaza(s) over (3)'s lattice with the road multiplier `1/a₁` (a₁ = stage 1's regime row: walled core
   1.3) on the lattice edges of (5)'s routes and **the water pull** (item 111 (b)): every lattice edge's cost is
   multiplied by `1 − w_water · q(x)`, with `q(x)` ∈ [0, 1] the proximity to reliable water, the largest over the sources
   — `1 − d ÷ pullRadius` from a river bank, a lake shore or ground of the top well-yield class (S1 (10)), and
   `flow × (1 − d ÷ pullRadius)` from a water body carrying `spring` (an oasis's shore, a spring-fed pond's, its source
   point), `flow` that body's `spring.flow` (§2.3; 1 when made, lowered and restored by V06 §3.12.1), `d` the distance and
   `pullRadius` the climate row's pull radius (0 beyond it), so a spring at `flow` 0 pulls nothing while its water body
   stands — and `w_water` the climate row's water-pull weight (strong in arid rows, weak in temperate, near zero in
   wet ones; below 1), a soft term under §4.5's contract (weight 0: byte-identical). So a dry-country town crowds along its
   water, the same field carrying the pull into every later stage's boundary (§4.4). Each node records its source nucleus,
   so a polycentric town's `T` is partitioned by nearest source; `t_1,i` is chosen so that nucleus i's nodes with
   `T ≤ t_1,i` hold its land `A_1,i` (exact to one cell), and the **stage-1 boundary** is that contour, Chaikin-smoothed and
   resampled. **Less land than the stage asks** (an island town on a small island, FTG-19; a narrow coast, fjord or
   valley; the METROPOLIS cap on high relief): `t_1,i` is capped at the largest `T` over the lattice nodes the nucleus
   reaches inside the frame (§3.2 (9); the context margin is never the town's land), and the shortfall is the stage's,
   reported in `requestedVsBuilt` and carried to S5d (§4.4). Where the capped region meets the frame, the boundary runs
   along the frame's inner line, inset by the outer wall strip's width for a walled stage (§4.8), so the trace and its
   strips stay inside the frame (§4.13); that arc is open ground, walled and gated as any other, and a gate on it has its
   outward arterial across the context margin (§4.3 *Result*), never of zero length. If two nuclei's regions come closer than their setbacks, glacis and `g`, the later-scored nucleus is re-sited
   to its next candidate (≤ 3 attempts); if they still come too close, the two are merged — one enceinte around their
   union and a **cross wall** along `T`'s partition line between them (an open wall chain anchored on that enceinte at both
   ends, with a gate where the inter-nucleus route crosses it) — and the merge is reported.
7. **Gates on the boundary.** Each gate is the **first point at which its solved route, walked outward from its plaza,
   reaches `T = t_1`** — on the boundary by construction; the gate keeps the pick's identity, ordinal, bearing and route.
   Two routes that cross the boundary at one point cannot both be gates, and a route that first reaches `T = t_1` on a
   closed arc ((4)) gives no gate — save (9) (b)'s gate, which stands on a walled closing arc —: the later pick, or that pick, is re-drawn from its next candidate (≤ 3 attempts), then
   dropped and reported (F-WALL). In a walled stage the arcs a land barrier closes (`cliff`, `gorge`, `marsh`, `sheer`)
   are impassable to S4's and S5's routes as the wall is (§4.3's `wallCrossingPenalty`), so a road leaves a walled stage
   only through a gate — through the gate on the nearest walled arc where its bearing lies across such an arc. **The harbour gate:** one gate of kind `water`, not
   counted in N, carrying a way like a quay-access water gate (§4.8) and reported, is placed where `L*` ((4)) first reaches
   `T = t_1`, so the trace (9) pins it and the harbour route (11) leaves through it — (a) for a sealed town (`N = 0`)
   whose harbour destination node (13) lies outside the stage-1 region `{T ≤ t_1}`; (b) as the **detour guard**, for a
   town with gates whose best gate-bound harbour route — solved as data on (3)'s lattice with the stage-1 boundary
   impassable except at the gates just placed — is longer than 1.5 × `L*`, applied when M1's measurement of the harbour
   pick (4) fails and, whatever it finds, when the harbour's nucleus had no unforced pick left to force. With the gates
   placed, §4.3's trade flow derives its gate weights, the harbour's share and the dominant bearing — they read no route —
   which (12) and S10b's trade rows read (§4.3 *Trade flow*; J-A77.42).
8. **The castle (MFP-3, COV-FTG-G09).** When a castle is requested or drawn, the **castle bailey** is sited by
   defensibility (height + water on ≥ 1 side + control of the main route, `docs/IMPROVEMENTS.md` O8 d), restricted by the
   `castle` option to inside / on / outside the stage-1 boundary, under a hard filter that no (5) route crosses the claim
   or, when water is within reach, the castle-moat band planned with it by (10)'s rule: a 5–7-vertex polygon on a jittered
   circle, area band TOWN 1.0–3.0 ha, CITY 1.5–3.5, METROPOLIS 2.0–5.0 (anchored on MFCG's plain-size castles of
   1.3–3.4 ha). A claim's compactness floor is its reservation's `compactnessMin` (§2.5) — the castle's 0.75 (MFCG's
   threshold), checked and repaired here by §4.8's rule before the trace welds to it (F-CASTLE); no other reservation kind
   sets one. `on_enceinte` places the bailey across the boundary so that exactly two of its vertices lie on the boundary —
   the **weld vertices** — and the bailey's **outer arc**, its boundary between the welds on the side outside the
   boundary, becomes the stretch of town wall the castle shares (9). The castle's **town-side gate** is fixed now, at the
   midpoint of the bailey side with the least-cost path to the plaza — for an `on_enceinte` castle, among the sides of its
   town-side arc — so the castle street is a routable destination and a ring castle moat can carry its deck.
9. **The stage-1 trace.** For a walled stage 1 the registered `EnceinteStrategy` traces the enceinte here by S5a's rules
   (§4.4), barrier closure included (item 106): the boundary pulled to defensible ground within the 40 m band — or to a
   natural barrier within `wall.barrierReachM` — with the gates and the weld vertices pinned, then pinned-vertex smoothing
   and topology-preserving simplification. Between the weld vertices of an `on_enceinte` castle the trace is the bailey's
   outer arc itself, one wall carrying both enceintes' `wall` roles (§2.7 `Castle.cityWeld`). The pull and the
   simplification treat the water planned in (2) and an `inside` or `outside` castle's planned ring moat (8) as water,
   which they never cross (§4.4), so no channel (10) carves can cut the trace. S5a commits this trace unchanged for k = 1;
   an unwalled town keeps the boundary itself as stage 1's boundary. **Every arc closed** (no approachable arc, (4)), by
   the closing rows' walls (V11 §3.16.1):
   (a) **every row's wall `none`** (`sheerCliff`, `deepWater`, `gorge`: a mesa ringed by sheer faces; an island town filling
   its island under an `open` waterfront, its shore closed by deep water): the stage walls nothing — no `Enceinte` is
   recorded for it and it has no gate — and reads as an unwalled stage for every rule (§5.3's walled-stage rows do not
   apply to it); its routes (5), picked by the land law on the whole contour as an unwalled town's are, enter across the
   barriers where §4.3's class grade limit admits an edge — a ramp or cleft in a cliff face, a crossing of a gorge (a
   viaduct over it at CITY and METROPOLIS, §4.3), an island town's landings ((13)) — and otherwise take F-ROUTE's last
   rung (`unserved`, reported; §5.2), so a mesa girt by faces steeper than `path`'s `rampMaxGrade` over one lattice step
   has no road in at generation and says so; a requested wall is reported in `requestedVsBuilt` (S3's warning
   `W_WALLED_BY_BARRIERS`, §5.4);
   (b) **some closing rows carry a parapet or a light wall** (the `cliff`, `steepSlope` and `marsh` rows: a mesa below the
   sheer test, a marsh-ringed town): the stage is walled on those arcs by §4.8's grade and records its `Enceinte`, the arcs
   with no wall its closing `arcs` (§4.4 S5a step 1); it takes N₁ = 1 gate (a requested `N₁` keeps its count), picked on
   its walled closing arcs, the least defensible row first — `steepSlope`, then `marsh`, then `cliff` — each pick scored
   among that row's candidates as (4) scores every pick; the gate's route reaches it within §4.3's class grade limit, else
   by F-ROUTE's ladder to `unserved` (§5.2), reported with the walling (`W_WALLED_BY_BARRIERS`). An `on_enceinte` castle whose
   weld vertices would fall on a closed arc is re-sited along the walled arcs by F-CASTLE's re-site rung (§5.2), else kept
   `inside` (reported). The trace is laid `standing`; S7 writes each run's condition at generation (§4.8; item 114 (d)). **Test:** every gate and weld vertex lies on the
   committed trace exactly (lattice equality), and the trace departs from the boundary by ≤ 40 m everywhere except along an
   `on_enceinte` castle's shared stretch, which is the bailey's own outer arc and may bulge up to the bailey's width
   beyond the boundary, and along a barrier reach, which departs by at most `wall.barrierReachM` (one boundary removes the
   two-construction mismatch measured in receipt `fixall_pipeline_r2_levelset.out`).
10. **Water carvings and their decks → the L0 batch (GEO-19; J-P36).** Carved into L0 here, before S4, and seen as water
   by every later stage: the harbour basin and the canals of (2) with their decks; a **castle moat** when water is within
   reach (below) — around an `inside` or `outside` castle a ring band around the bailey, outside its curtain's outer half-band and
   a berm, with **one deck at the castle gate**, perpendicular to the moat; for an `on_enceinte` castle **only its outer
   arc** (8): the channel along the shared stretch between the weld vertices, outside the trace's outer half-band and a
   berm — the city moat's own stretch there when the town has one (one channel, at the wider of the two width rows),
   otherwise a channel clipped at each end by the trace ⊕ (outer half-band + berm), so it ends against the town wall's berm
   beside each weld — while the bailey's town-side arc takes its castle template row's `townSide` (§4.8) and the castle
   gate on that side needs no deck; a **city moat** when the blueprint's `moat` is `inner` or `all` — a channel of the era
   row's width along the (9) trace, outside its outer half-band and a berm (table 2–5 m), never along a barrier arc the
   trace leaves unwalled, and wet only where water reaches it (below) — with **one deck at every main gate and at a
   harbour gate (7)** on a wet stretch, where the gate's route (for a
   harbour gate, the route that placed it) crosses the channel, perpendicular to it; and the hinterland's **decoration
   ponds** — the pond row of §4.9's decoration table (count by rung and biome), sites scored on hollows, flow accumulation
   and damp ground, each at least `pondClearM` (150 m) beyond the predicted built extent `{T ≤ t_K}` and at least 30 m from
   every (5) route and planned canal. No castle moat crosses the city trace — a ring surrounds a bailey the trace keeps
   off (9), and an outer arc runs beside the trace — so §4.4's rule that the trace crosses water only at a river's water
   gate holds with every castle option; and the hard filter of (8) keeps every solved route off a planned castle moat, so
   no castle moat needs a deck except at a ring moat's castle gate. Every deck has S1 (5)'s form and its two states. When
   a moat was carved, `T` is recomputed once over the new water (≈ 4 ms at CITY) for the stages k ≥ 2; stage 1's boundary
   is never re-derived from it. **Where a moat holds water.** The castle moat and the city moat read one rule for
   "water within reach": a source — a river, a lake, a spring-fed pond or the sea — within `moat.waterReachM` of the moat's line (the
   `walls` table's cell, §7.6: 400 m; our own, calibratable). The moat's `WaterBody` names that source in `flowFrom` (§2.3; the
   nearest, ties by id), and its water level is one value per moat, derived on read and never stored: the source's surface
   at its shore point nearest the moat (the terrain's height at that shore, as V04 §3.2 N7 reads a water surface), which
   every reader of the moat's water reads (§8.4's water at its level, V04 §3.2 N2 and N7, §2.6's water table). The channel
   is carved only along the stretches whose ground lies at or above that level by at most `moat.maxFallCm` (the same
   table: 400 cm; our own, calibratable); every
   other stretch, and the whole moat when no source lies within reach, is laid **dry** — no channel and no deck, its glacis
   part typed `ditch` residue by S10 (0) as the town side of an `on_enceinte` bailey is (§4.7, §4.8) — reported
   (S3's warning `W_MOAT_DRY`, §5.4). An outer enceinte's moat takes the same rule (§4.4 *Outer moats*).
11. **The harbour route (J-P35).** Once the L0 batch has committed, the harbour ↔ plaza route is solved on (3)'s lattice
   with the committed water impassable except along its decks, every reservation of (2) and (8) impassable and — for a
   walled stage 1 — the (9) trace impassable except at its gates. A harbour whose destination node lies inside the stage-1
   region `{T ≤ t_1}`, and any harbour of an unwalled town, is routed by heap A\* from the plaza of the nucleus whose
   partition of `T` holds it, and so stays inside the trace. A harbour outside the region is reached **through a gate**:
   one multi-source Dijkstra from every gate's exit — the far bank vertex of its moat deck where (10) carved a city moat,
   the gate itself otherwise — over the lattice outside the trace finds the **serving gate** (the least cost to the
   harbour; ties by gate ordinal; a harbour gate of (7) competes with the rest, and with `N = 0` it is the only gate) and
   the branch to the harbour at once. The harbour route is that gate's inward street, its passage and moat deck (its own
   route to the exit, which S4 re-solves through the deck, §4.3) and the branch: the harbour road leaves through a gate,
   crosses a moat only on that gate's deck and adds no road through the wall, so the roads leaving the walled stage stay
   N, plus a harbour gate of (7) where one was placed. The route is data, committed by S4 with the others, outside `T`'s
   road set (5); it costs one heap search of the castle street's size, inside S3's row of §12.4 (PLAUSIBLE). Its fixtures
   are §13.2's walled coastal harbour fixtures.
12. **The principal market, then the land reservations → the L1 batch.** *The principal market (item 24; owner: "the
   central market does not actually have to be central to the city").* Before the batch, with the gates (7), the trace
   (9) and the harbour route (11) fixed, the principal market's site is chosen by the **trade-convergence score** over the
   candidate sites — a rule table (`market.siting`, §7.6; our own rows) with a controlled random term of share 0.1 from
   the `reserve.market` concern (§6.1). The candidates, each with its form and its score terms (defaults):
   * the **main plaza** of each nucleus (2) — the plaza itself then carries `rank: 'principal'` (MFCG's central market;
     its attach points are the market's): kind 1.0, routes 0.5 × the fraction of gate routes (5) rooted at it;
   * each **gate**, inside or outside (7) — a flanking square around the gate route's stretch just inside or just outside
     the gate, beside the gate plaza (§4.8): kind 0.3 inside or 0.15 outside, trade 0.6 × the gate's trade weight
     (`TradeFlow.gates`, (4));
   * the **town bridge's landward ends** (13) — a flanking square around the bridge approach S4 routes to the deck's bank
     vertex (§4.3): kind 0.35, traffic 0.5 × the fraction of arterials whose bearings lie across the river;
   * the **harbour's landward attach** (11) — a flanking square between the basin's attach point and the harbour route:
     kind 1.0, trade 0.6 × min(1.5, p ÷ `portRef`) — `p` the **port demand fraction**, the share of the manifest's
     buildings whose class `requires: 'coast'` (§10.2), and `portRef` the table's **reference port**, the median `p` over
     B-CITY's harbour seeds — a stored cell of `market.siting` (§7.6) computed by running S0–S2 alone on every B-CITY
     harbour seed: a scripted pass sets it at M1 and re-runs whenever a shipped roster row changes, the new value shipped
     as a table-version bump with its declared shift (§13.3), and a contract test recomputes the median and fails on a
     stored value that differs (§13.2); 0.12 (PLAUSIBLE) until the M1 receipt;
   * the **busiest inward street** — the middle third of the street of the gate of highest trade weight — a flanking
     square astride it, a widened main street: kind 0.25, trade 0.4 × that gate's trade weight.

   Slope, the flood band and wind exposure enter as (1)'s site penalties. **The defaults compared** (before those
   penalties and the random term; J-A24.43): in a single-nucleus town the plaza scores 1.5 (kind 1.0, routes 0.5), a gate
   at most 0.9 (kind 0.3, trade 0.6), the bridgehead at most 0.85 and the busiest street at most 0.65, so an inland walled
   town's plaza wins — the routes converge there — and the default reproduces MFCG; in a port the harbour scores
   1.0 + 0.6 × min(1.5, p ÷ `portRef`) — 1.6 at the median port (`p` = `portRef`), above the plaza, 1.3 at half the median,
   below it, the two equal at `p` = ⅚ `portRef` — so the principal market leaves the plaza for the harbour in at least half
   of the port seeds before the penalties, the share §13.2's T24-1 and §13.7's row require (measured at M2b with §13.7's
   re-tune fallback), and stays on the plaza where a port's trade is mostly overland. The parity presets pin the plaza by
   setting every other kind weight to its off value (item 23). A **flanking square** is a `market` reservation of the
   principal row's area band (the plaza band of (2)) laid astride its way's stretch, that way passing through it as an
   arterial passes a gate plaza (§4.8): the reservation is impassable to every other route except at its `attach` points —
   the two points where its way enters and leaves and the midpoint of each flank, where a side street may end as at a
   plaza — and S4 places `width_knot` vertices at those two points (§4.3), so the square reads as the widening it is. The
   chosen site, its score and the runners-up are recorded in the report; `setAttr` on the reservation's `rank` or a
   `drawBoundary` moves the market by hand (§7.1). *The batch.* The plazas, the precinct, a flanking principal market's
   square, and the castle bailey enter L1 as barrier faces carrying the `reserved` role: no way crosses them (S4, S5) other
   than a flanking market's own way, S8 does not cut them, and the claimed entity is built inside them (§4.7, §4.8). Every
   other claim larger than a block is S7b's (§4.5 S7b (3)), every secondary market among them except a polycentric
   nucleus's plaza, which this step ranks secondary (1).
13. **Destinations** are typed entities: the plazas' attach points and a flanking principal market's (12); each gate and
   its bearing (an **external bearing** per gate for a walled town; an unwalled town derives its bearings by the same law
   on its own land); the **town bridge** — the crossing site nearest the centre when a river passes through the stage-1
   region, which (1) scored the centre against, connected in town (§4.3) — while every other site becomes a bridge only
   when a route (S4) or a growth proposal (S5c) uses it (S1 (5)); the harbour (its destination node is its basin's
   landward attach point; its route, (11)); the castle's town-side gate; the precinct. **Island towns (FTG-19):** when the
   settlement's land component does not touch the frame, external destinations are shore points — the harbour, one
   **landing** per requested bearing (the shore point nearest the bearing with the best deep-water score) and a ferry
   point — and O4 (g) counts landings as the external connections.

**Dossier-backed elements at creation (item 22 (d); with §7.7; J-A22.41).** A brand-new map from an existing dossier holds
every dossier element from the start: the blueprint's assignments and the dossier-backed elements enter S2's manifest as
**fixed rows** — one (class, ordinal) each at the head of its class, present at every population and never withdrawn by
the roster's arithmetic, so prefix stability holds with them — and S7b allocates them before the roster's free demand in
each rank of its order (§4.5), S10 (3) claims them and S10b's `generation` request places them (§4.7). The log's creation
prefix records these placements as the generation run's own (§7.4). A dossier element that arrives after creation is a
`dossier` request on the current map (§4.7 S10b, §7.7), and one that arrives with an epoch's inputs a mutation at that
epoch (§4.11).
=== END ===

=== REPLACE ### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph ===
### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph

**Lattice and costs.** Built once at S3 (§4.2 S3 (3); they depend only on the frame, terrain, water and reservations) and
reused by S3's pick contour, gate routes and field `T`, by S4's routes and by every S5a boundary. Arterials (`through`,
`primary`) are routed between S3's destinations on this **candidate lattice**: a jittered hexagonal point set built by `hexLattice` (§3.4) at ≈ 25 m
spacing whose adjacency is known by construction (six neighbours per point, its jitter below half the spacing, so no edge
crosses another and §3.4's asserts hold; no Poisson sampling, relaxation or triangulation). Edge cost = length × (1 + k_slope · slope²) ×
waterCrossingPenalty (impassable except along a pinned crossing deck — a site or a built bridge, §4.2 S1 (5), S3 (2),
(10)) × reservationPenalty (impassable inside a reservation; the plaza and the castle are reached only at their attach
points and gate) × wallCrossingPenalty (only at gates) × existingFabricCost (epoch > 0: crossing a built face costs by its
class, so growth reuses streets) × landValue (× S3 (6)'s water-pull factor on the field `T`, never on a route). **The class grade limit.** An edge
steeper than the routed class's grade limit is impassable to that route. The limit is the class's `ways.crossing` row's
`rampMaxGrade` (V11 §3.24.5) — one value per class for the grade it is routed at and the ramps it climbs — read by S3 (5)'s
gate routes and S4's routes (`primary`'s inside the pick contour, `through`'s beyond it), by S5b and S5c (§4.4), by a raised
way's end ramps and by §7.3 (a) 5's steepness report; the field `T` reads no limit (it prices slope only). F-ROUTE's slope
rung (§5.2) relaxes a route's limit to the next class's in the order `through`, `primary`, `track`, `path`; a destination
no relaxation reaches takes F-ROUTE's last rung (`unserved`, reported). At
epoch 0 S3's plaza-rooted Dijkstra tree gives every plaza-anchored route; a tree path that crosses a claim or water S3
added after the tree (the castle bailey, a moat) is re-solved by heap A\*, as are routes without a plaza end and every
route at epoch > 0 (with `existingFabricCost`). At village rungs the village product's VS4 replaces S4 and calls this
router (V07 §3.5).

**Routes.** S4 commits the gate routes solved at S3 (§4.2 S3 (5)) without re-solving: each is split at its gate into the
inward street (plaza attach point ↔ gate, `primary`) and the outward arterial (gate ↔ frame edge at the gate's bearing,
`through`), so roads leaving the walled stage = N (plus a harbour gate of §4.2 S3 (7) where one was placed) and each gate
carries one road out and one street in (MFCG's gate identity; MFP-4). Where S3 carved water across a solved route — the
city moat just outside each gate — S4 re-solves only that stretch, from the last lattice node before the channel to the
first beyond it, through the gate's deck, which continues the gate passage straight across the moat, perpendicular to
it. S4 then solves the remaining routes: the town bridge (§4.2 S3 (13)), each of its two ends to the nearest arterial on
its bank in town; a site outside the boundary that a route uses is reached through the nearest gate, never through a new
wall crossing, and every other site stays a `site` unless S5's growth uses it; the castle street (the castle's town-side
gate ↔ plaza, across the castle-moat deck when there is a moat); the precinct's frontage ↔ the plaza side it faces; canal
decks inside the boundary ↔ the nearest arterial. Harbour ↔ plaza and island-town gate ↔ landing were solved at S3. A
polycentric town's gate-to-gate route between adjacent nuclei (solved at S3 between their forced gates) joins their
plazas through both nuclei's gates; for a pair merged under one enceinte it crosses the cross wall at its gate.

**One graph, then one smoothing (GEO-16).** All routes are solved first on the lattice; the arterial graph is the union of
the lattice edges they use, each carrying its multiplicity (how many routes share it). The graph is split into chains at
every node of degree ≠ 2 and at every pinned node (gates, attach points, deck ends, landings); junctions closer than 8 m
are merged *on the graph*; each chain is simplified (Visvalingam) and smoothed (Chaikin × 2, then curvature-limited to the
class's minimum radius) **once**, with its end nodes pinned, and inserted into L1 **once** as a spine — a `mandatory`
chain carrying the `way` role (§3.6), whose attraction folds any residual near-duplicate within `attractCm` (§3.6) into a shared
stretch — so routes sharing a run out of the plaza become one street, never braided near-duplicates. Class and width come
from multiplicity and betweenness on this graph (the width table `ways.widths` keyed by class and rung, the class by
betweenness; O4 c; the village rungs' rows are V07 §3.5's and V07 §3.10a's, the base rungs' unchanged); where a way's width
varies along it (a widening at a market or a gate), S4 places `width_knot` vertices at the class-change junctions
(`insertChain` `opts.knots`, §3.4), so the width is a knot profile on the spine (§2.2 rule 5). Junction rules: minimum
crossing angle 30° (else deflect); **Y → T conversion** where the acute arm can be bent within its class curvature limit
(G-P5). **Decks** are fixed edges of the graph: smoothing never moves their vertices and each approach curve stays within
the class radius; an approach to a river or canal deck that cannot meet the radius takes F-ROUTE's ladder (§5.2) —
another site on the same reach within its search band, then an extra bridge placed as §4.2 S1 (5) states — while a moat
deck stays fixed to its gate, whose passage it continues straight. Every deck a route uses becomes a `built` bridge when
the spine lays its span through its two bank vertices (§2.7). **Test:** on B-CITY no two spines run closer than their
class separation for more than one step length, and every deck's way angle is within ± 10° of the channel normal.

**Result.** Through-roads continue to the context margin with their bearings (O14); MFCG's radial gate → plaza
legibility (CONFIDENCE B7: streets converge on the plaza) with real metres and terrain (O4 a, d). Later growth stages add
main roads through S5b (§4.4), which runs this router incrementally with every existing arterial fixed, under the same
F-ROUTE ladder. S4's local operator for edits is §7.3's.

**Raised ways — viaducts, elevated roads, aqueducts (item 110 (b); file f item 290).** A raised way is a way carried
above the ground on arches over land, other ways or water; its deck, spans and an aqueduct's channel live
in their own arena part of the ground layer (ground parts from 1, allocated once and never reused, §3.4; the records are
§2.7's), so the ground's planar rule is untouched: it crosses the ways beneath without a junction, its two ends are ramps
or stairs joined to ground vertices — each of its two feet a vertex on part 0 joined by record to one on its part (§3.4) —,
its supports are footprints on ground part 0 (§2.7's `supports`), which with its under-deck strip are holes for S8, S10 and
S11 (§4.6), the spaces between supports stay open or hold II.7.6's vaults, and the invariant "a ground-part-0 deck only over water" does not bind it (§5.3). An aqueduct is a
raised water channel of the same kind. It is drawn above what it crosses, with its shadow, and labelled like any way.
* **Where the generator raises one** — at CITY and METROPOLIS only, each for a reason (J-VI.2's reason words), each a soft
  rule with the chance, cap and structure cells of `raisedWays` (V11 §3.24.2): a **viaduct** (`drop`) where a `through`,
  `primary` or `secondary` route's best course crosses a ravine or valley whose drop exceeds `viaduct.minDropM`, priced
  in this route solve against the detour (span length × `viaduct.spanCostFactor`); an **elevated road** (`link`) joining
  two high wards, terraces, or a citadel and a great temple over a lower district — its two endpoints reservations (the
  citadel's site, a great temple's or cathedral's precinct), never the institutions in them, a terrace endpoint read from
  `terraceState(D).asks` (V01 §3.17.1 (1)), never `District.fabric`, so no cycle arises with S7c; likelier with prosperity
  and with dossier landmarks on high ground; an **aqueduct** (`water`) where the city's water need — S2's whole
  population at generation, the ground households at an epoch, against what its wells, river and cisterns supply inside
  the walls (V11 §3.24.6; the cistern rule reads the same distances) — is unmet and a higher spring or upstream river of
  the ground (never a sky arena's) lies within reach, carried across low ground on arches to a basin, cistern or
  fountain, crossing the wall through an arch, the era and culture rows scaling its chance. A TOWN gets them only by
  declaration.
* **The slot.** Every generated raised part is committed before S7b (1), reading the ground arena only: a viaduct inside
  S4's route solve (and each later stage's S5b through this router), an elevated road and an aqueduct at S6's end,
  reading S6's typed wards and pass-1 prosperity. So S7b's capacity (§4.5), which subtracts each district's under-deck
  strips and adds the deck plots it owns, and the sky layer read it, and it reads no island.
* **The derivation unit and the stream.** Each generated raised way's derivation unit is V06 §2.13's `RaisedReasonKey`
  (creation index 0, epoch component 0), with one uniform per key on `raised.reason` (§6.1; epoch component 0); keys are
  taken in the kind order aqueduct, viaduct, elevated road — strength then address inside a kind — with V06 §3.19 (2)'s
  three readings, against the `RaisedWayLedger` (the count of standing generated, suppressed and declared ways against
  V11's caps, suppressed keys skipped). The ledger is exported by this generator's package and read by S4, S6's end, a new
  stage's S5b and V06's `raisedWays` step; the same package exports `raisedOutcome(model, subject): RaisedOutcome[]`
  (V10 §2.13), which evaluates one key exactly as the ledger's admission does — the reading and its bar, the strength,
  the gate's uniform recomputed from the key without advancing the stream (§6.1), the rung's cap and count, the
  suppressions read from the log's live removals and the declared list — enumerating no other candidate and solving no
  course, so its answer equals the generator's decision by construction (T-V10-41). The course solver and the hand
  operator (T4 `road` with `raised`, the aqueduct class) are callable from an epoch's phase with given ends; a ravine or
  valley `SiteFeature` keeps its extent; the aqueduct's terminal follows V06 §3.19 (6) at generation too. The record
  carries `reason?` (generated ways only) and its creation event writes the reason's `detail.why` rows.
* **The rung gate** (provenance `owner`, no table cell): the router prices a span only when the routed rung is CITY or
  METROPOLIS, whichever stage calls it; a product's stage that calls the router, and F-ROUTE's extra-bridge rung, pass
  the routed rung, so a village stage never lays a raised part (V07 §3.5).
* **Ground only, never into the sky.** At an epoch and in every post-build request the generator's endpoints and
  evidence are ground-arena entities (`PlatKey.layer` `'ground'`, any part); a reservation an institution island hands
  over (V05 §3.5) keeps its road, the reason reading through the hand-over. Every raised part laid after SKY — an
  epoch's, a T4 stroke's, or a generation stage's after SKY — reads `skyAccessObstacles` (V05 §2.3b): the deck, its
  parapet and its supports stay outside every access column dilated by `accessSiting.deckGapM` and below every segment by
  its clearance, else the course re-routes by the solver's ladder or is not built, reported. A raised part's two ends
  are ground vertices; a T4 `raised` stroke ending on an island's rim is bent into `placeSkyAccess`, and an aqueduct stroke
  there ends at its last ground vertex (V05 §4.2; J-VI.4 (d)).
* **Where it may not go.** A raised part's course treats the harbour basin and its mouth — between the mole heads or
  shores that carry item 106's harbour-mouth gate — as excluded (masts must pass; a stroke across it is bent to end at
  its last ground vertex before the basin, named in one line), crosses a moat or a city wall only as the aqueduct's wall
  arch or on a gate's line, and stands no support on a square, a reservation or an oasis's water; a river or canal it may
  span between supports on the two banks within `viaduct.maxSpanM` and §2.7's clear-span bound
  (`raisedWays.structure.maxClearSpanM` by material class: a generated course past it drops, `raised_too_long`; a declared
  one bends); the obstacles a support slides off or is omitted over are §2.7's support step's.
* **Edits and shadows.** The user adds one (T4 `road` with `raised`, or the aqueduct class) or removes a generated one —
  a suppression that holds through regeneration (§7.1). Raised ways and retaining walls cast item 102's daylight driver
  (§4.5, §8.4). Their decline is V06's (`DeclineOp`'s raised, retaining and deck members; §4.11).

**Markets as destinations (item 24).** A flanking principal market (§4.2 S3 (12)) is on its way already: S4 commits that
way through the square between its two `attach` points and places a `width_knot` at each, so the square is a widening of
the street's profile (§2.2 rule 5); a side street may end at a flank's midpoint attach as at a plaza. Every other market
— the plaza when it carries the principal rank, and S7b's secondary markets (§4.5) — is reached as a plaza or a claim is,
at its attach points; no market re-roots the plaza-rooted tree or the field `T` (J-A24.41).

**Trade flow — the gates' and the ways' trade weights (items 72 and 77; J-A77.41, J-A77.42).** `TradeFlow` is declared
and derived here: in two parts at generation — `gates`, `harbour` and `dominantBearingCdeg` at §4.2 S3 (7), as soon as
the gates and their bearings exist (they read no route), and `ways` after S4 commits the routes — and both again at each
epoch (§4.11), from the circumstances' trade slice (`CircumstanceSlice.trade`, its partners, their bearings and modes and
their fill, §7.7 layer 2) with the gates' and roads' geometry. It is a derived record — `Document.derived.tradeFlow`
(§2.9) caches it, rebuilt on load, never canonical — and it draws no random number.

```ts
interface TradeFlow { gates: { gate: Id; weight: number }[] /* with harbour, Σ = 1 */; harbour?: number /* the water partners' share, when the town has a harbour */;
  dominantBearingCdeg: Cdeg /* the weighted circular mean of the partners' bearings: where the settlement's trade mostly flows from (item 72 (a)(3)) */;
  ways: { way: Id; weight: number }[] /* each way's trade weight, below; absent ways weigh 0 */ }
```

* **Partners to gates.** A `road` partner goes to the land gate whose bearing lies angularly nearest its bearing (ties by
  gate id) — the gate S3 (4) picked for that bearing; a `river` or `sea` partner goes to the harbour, else to the water
  gate on its river, else to the nearest land gate. A gate's weight adds up its partners' weights, normalised with the
  harbour's to one; this is the **bearing's trade weight** §4.2 S3 (4) and (12) read. With no partner every gate weighs
  the same and the harbour nothing; with no gate (N = 0 and no harbour gate) `gates` is empty and every way weighs 0.
* **Ways.** A way's **trade weight** adds up the weights of every gate, and of the harbour, whose S4 route to the plaza
  (§4.2 S3 (5), (13)) follows it: the main streets in from the busiest gates carry the most and a way on no such route
  weighs 0. §4.5's trade-position component and its gate and main-street kernels read these weights (item 72).
* **Without a dossier** the blueprint's external bearings and the intent's trade setting fill the slice (§7.7 layer 2),
  so a standalone town has the same record; a user's gate or road edit re-derives it with the geometry.

**Two-point roads (item 101 (i)).** A `drawWay` declaration in its `points` form — two points and a class, or more points
for a free-hand line (§7.1) — is routed here at its dry run: each consecutive pair of points is joined by this router on
the lattice with the class's costs and `existingFabricCost` (a route prefers existing streets and plot lines), each point
snapped to the nearest lattice node or existing way vertex (the author's snap, §9.5, resolves the points first); the
chain is smoothed and inserted as S5b inserts a main road (§4.4), and a stretch across water takes a deck by §4.2 S1 (5)'s
crossing rule — its preview draws a bridge there. The dry run returns the derived route as the declaration's resolved
shape, stored resolved (§7.1), its pinned nodes the handles; no later derivation moves it (item 101 R13). A pair of
points no route joins (both inside one reservation, or across a sealed barrier) is bent to the nearest routable pair,
named in one line (item 101 R2).
=== END ===

=== REPLACE ### 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check ===
### 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check

Each growth stage k runs four sub-steps. Stage 1 commits the boundary, gates and trace S3 fixed (§4.2 S3 (6)–(9)); a stage
k ≥ 2 takes its boundary first, then its main roads, then its trace, so every gate lies on the boundary it was picked on.

**S5a Stage boundary and enceinte trace.** *Boundary (FTG-5, COV-FTG-D26; J-P7):* the boundary of stage k is a level set
of **network travel cost** `T(x)` — the least cost from the plaza(s) over the S3 / S4 lattice, where a lattice edge inside
an arterial's corridor costs ρ_road per metre and any other edge ρ_off per metre, both times the slope term and S3 (6)'s
water pull; water is impassable except along decks, reservations are impassable. The **anisotropy ratio**
`a = ρ_off / ρ_road` is a stage-regime and form row (our equivalent of FTG's spoke-priority control): walled core 1.3,
walled rings 1.8, ribbon 4, suburb 3, `linear-street` form 8 — our own values; FTG's measured road / non-road
90th-percentile radius ratio of 1.26–1.65 on its two captured cities is the calibration target for the extramural stages
(B-REF, §13.5). `a` also sets the wide-versus-elongated balance of ribbons and suburbs: on a flat, dry site a walled core
is compact and the outer stages stretch along the main roads. `T` is **one field**: computed at S3 (§4.2 S3 (6); ≈ 4 ms at
CITY), recomputed once after S3's L0 batch only when a moat was carved; S4's remaining routes and the harbour route are
not in its road set; each S5b's new main roads re-settle `T` incrementally, only at the nodes whose cost they lower, so no
stage computes a new field (SCL-3). **Stage 1's boundary is S3's contour, and S5a commits S3's trace for it unchanged.**
For k ≥ 2 the boundary is taken from `T` **as it stands when stage k begins**, before its own S5b: `t_k` is chosen so that
the land of `{T ≤ t_k}` ∪ the enclosure of stage k − 1 equals the land of stages 1…k from S2 (lattice nodes sorted by `T`,
their cell areas accumulated; exact to one cell) — the union keeps the stages nested even where a moat raised `T` just
outside the previous wall — and the boundary is that region's outer contour, Chaikin-smoothed and resampled. `t_k` is
capped as §4.2 S3 (6) caps `t_1` (the reachable land inside the frame; a frame arc open ground, inset as there): the
shortfall is the stage's, reported and carried to S5d, and a stage whose capped boundary adds no land to stage k − 1's
is folded into the last stage that holds land, its quota with it (reported), as `N = 0` folds the extramural stages into
the walled stage (§4.2 S3 (4)). S5b then
picks and routes the stage's primaries on that boundary; their re-settlement of `T` serves stage k + 1 onward, so the
boundary a gate was picked on is the boundary the trace passes through.

*Trace (GEO-18, FTG-8).* For a walled stage the trace is fixed **before the stage's secondaries grow** (stage 1 by S3,
§4.2 S3 (9); k ≥ 2 right after S5b) by one rule set, the registered `EnceinteStrategy`:
1. **Barrier closure (item 106 (a), (b)).** The strategy classifies the boundary's arcs by **defensibility** — a table per
   barrier kind (`shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte`; J-VI.3; rows V11): a sheer cliff, deep water or a
   gorge closes with no wall; a cliff closes behind a parapet, a steep slope or a marsh behind a light wall; open ground
   needs the full wall (V11 §3.16.1). A `cliff` arc is a bank of
   kind `cliff` or terrain whose slope exceeds the table's threshold over its height; a `gorge` a ravine `SiteFeature`; a
   `marsh` a bank of kind `marsh`. The trace walls the approachable arcs and the closing arcs whose row carries a wall (graded by §4.8),
   each stretch's ends anchored on its barrier (the existing anchor kinds) with a tower at each anchor (§4.8); it records
   the closing arcs no wall stands on (the closure features, V11 §3.16.1) as `Enceinte.arcs` (each by its two anchor ends
   and its `BarrierKind`) with the stretch anchors `anchors[].end` (§2.7), and `Enceinte.closure` is `barrier` whenever an
   arc other than a shore closes it, the barrier edges closing the enclosure for every "enclosed" and "sealed" test. A
   river loop or a spur is walled across its neck only (general historical knowledge, not corpus-witnessed). Where a
   barrier edge lies within `wall.barrierReachM` (default 150 m, capped at the table's share of the stage's radius) beyond
   the stage boundary, the trace may extend to it; the spare ground it encloses is typed by S12b as intramural gardens,
   orchards and paddocks (§4.9) and is not counted as the stage's built land; otherwise the 40 m pull below stands. This
   moves the trace further from the settlement's hull, never onto it (the historical checks forbid "settlement hull ⇒
   wall", `partitioned/corpus-preview/history.md` rows 4a–4d). With `barrier` closure and the stretch profile off, the
   trace is the base's (a no-op pin). A stage k ≥ 2 picks its gates on its approachable arcs and takes §4.2 S3 (4)'s
   closed-arc reduction of its gates, classified on its own boundary; a stage with no approachable arc takes
   §4.2 S3 (9)'s *every arc closed* — walled on the closing arcs whose row carries a wall, with one gate there, or walling
   nothing and recording no enceinte where no closing row carries one — and the arcs a land barrier closes are impassable
   to routes as the wall is (§4.2 S3 (7), (9)).
2. **Pull and pin.** The boundary is pulled to defensible ground within a 40 m search band (local ridges, slope breaks,
   river banks: a cost-surface path around the town with a penalty for leaving high ground), with **the gates pinned**
   where the arterials cross the boundary (stage 1: S3's gates; k ≥ 2: every crossing of an S4, earlier-S5b or this stage's
   S5b arterial) and an `on_enceinte` castle **welded through its two weld vertices** (the shared edge is one wall; MFP-3).
3. **Smooth and simplify.** Pinned-vertex Laplacian smoothing in 3 passes (`wall.smoothPasses`, a wall-table row;
   provenance `ref:MFCG 12710731 three pinned smoothing passes (code)`, P12; J-A46.43), the gates, the weld vertices and
   an open chain's two anchors never moving → **topology-preserving** Visvalingam (the kernel's `simplify`, §3.4: minimum
   segment 20 m, no interior angle < 100°; a removal that would make the trace touch itself, cross water, enter a
   reservation or move a pinned vertex is refused) → inserted on L1 through `insertChain` as a `mandatory` chain carrying
   the `wall` role, gate vertices carrying `wall_gate`. On a shore or bank the trace is attracted onto the outline, so the
   shared stretch is one edge carrying both roles (§3.6). The trace is laid `standing`; S7 writes each run's condition at
   generation (§4.8; item 114 (d)).

A second castle on an outer enceinte (the citadel of §4.2 S0) is sited by §4.2 S3 (8)'s rules against its stage's
boundary and entered as an L1 barrier face in that stage's trace batch, with its gate and any moat deck; a castle's
curtain uses the same closure (a cliff-top castle walls only its approach), and a later ring anchors on barriers as it
anchors on the previous enceinte (item 106 (f)). A shoreline change (reclamation, an epoch's water) re-evaluates the
closure by least disruption (item 22).
*Water and the waterfront (COV-MFCG-C07; J-P25).* The trace never crosses water except at a **water gate** where a river
passes: its two vertices on the river's banks carry `('gate_end', gate, 0 | 1)` and the `Gate` names them in `banks`
(§2.2 rule 7, §2.7). A generated gate's bank vertices are the trace's vertices on the shores, placed by S5a's L1 trace
batch after the water exists (L1 Steiner vertices on the L0 shores, or L0 shore vertices where the trace attracted); an
edited gate's (§4.11, §7.3 (b) 3) are promoted to L0 by the water's batch (§3.3 rule 3); both kinds are held under a warp
unless `fromLevel = 0`, as a deck's are (§3.6; J-K35). On a coast or a river bank the trace may be an **open chain** whose
ends are anchored on a barrier (a shore, bank, cliff, gorge, marsh or another enceinte). The **waterfront**: the preset's
`waterfront` row when it is set, else §7.7 DR2's derivation from the circumstances (item 106 (d): `open` by default —
MFCG's coastal wall stops at the water, FTG's captured wall is an open 17-tower chain from bank to coast; `quay_wall`
with sea gates where the threats come by sea or on a sea-exposed port above the table's size; `sea_wall` only by preset
or request); under either wall a water gate stands at every quay access, so every quay stays reachable through a gate,
and a river through the town keeps its water gates. `placement: 'aroundStage'` traces only the stage's new ring, as an
open chain anchored on the previous enceinte (FTG's "around stage plots"). Nothing grown later crosses the trace except at
a gate, and S6 treats it as a barrier. If an inward pull would leave the stage's land short by more than the S5d
tolerance, the pull is capped at the smoothing step (reported); F-WALL's ladder is §5.2's.

*Outer moats.* When the blueprint's `moat` is `all`, S5a carves stage k's moat (k ≥ 2) right after committing its trace,
through §4.11's carve path. Its way rule meets only arterials here — each just outside one of the stage's gates, the
stage's secondaries not yet grown — so every way is kept with a deck and nothing is cut: the L1 batch places each deck's
two pinned bank vertices on its arterial where a wet stretch's banks will cross it — the `deck_end` rows of a fresh
`Bridge`, `built` with that arterial as its way (§2.7) — the span between them carrying `deck` (the arterial is re-routed
between the gate and its next pinned node beyond the channel where it would meet the channel more than 10° off its
normal, as §4.3 re-solves S3's moat stretches); the L0 batch inserts the channel (the era row's width, outside the outer
half-band and a berm, along the walled arcs only, and only on the stretches §4.2 S3 (10)'s rule makes wet — every other
stretch a dry `ditch` (§4.7 S10 (0)) whose arterials take no deck) through those prepared vertices, so each span becomes its deck,
perpendicular to the channel and continuing its gate's passage across. S7 builds the bridge furniture (§4.8) and S5c
treats the moat as water. Nothing finer than L1 exists yet, so the carve's footprint clears nothing. The innermost
enceinte's moat is S3's (§4.2 S3 (10)).

**S5b Main-road step (FTG-4; stages k ≥ 2 and every epoch stage).** The stage's primaries match its gates: `N_k` = the
gate law of §4.2 S3 (4) on the land inside the stage's enceinte, with its closed-arc reduction and its waterfront reduction where the stage's boundary
runs along a sea or lake shore for at least `gate.waterfrontShare` of its length (walled; J-A46.42), or one primary per
`mainRoadSpacingM` of boundary (unwalled; 450 m at CITY). The existing arterials all continue to the frame, so they cross
the new boundary `c` times; when `N_k > c`, S5b spawns `N_k − c` radial destinations on the boundary's approachable arcs by nested picks
(largest angular gaps first, terrain-scored like gates) and routes each with the incremental S4 router (§4.3) from the
nearest junction on an existing primary *outside* the previous enceinte (never through an inner wall) to the frame at its
bearing; when `N_k ≤ c` it spawns none and the crossings are the stage's gates. It routes under S4's F-ROUTE ladder
(§5.2), extra-bridge rung included (where that rung fires on standing water, S5b's L0 batch of two same-level shore
splits precedes its L1 batch; §4.1, §4.2 S1 (5)), and may raise a viaduct by §4.3's rules. The crossings become stage k's
main gates; posterns only for an explicitly requested remainder. An outer enceinte never gets fewer gates than arterials
cross it; a request below that is raised and reported (a requested gate count applies to the innermost enceinte, MFCG's
semantics). **Test:** primary length per km² and the share of gates on primaries in band from TOWN to METROPOLIS; each
epoch stage whose `N_k` exceeds its crossings adds ≥ 1 primary.

**S5c Growth of the secondaries.** Inside the boundary a priority queue of proposals grows streets FTG-style (CONFIDENCE
C5): each proposal `{origin junction, heading, curvature, goalHeading, class, remainingSegments, branchCounter,
priority}`, lowest priority first; step length by class (secondary 25–40 m, lane 15–25 m; FTG's district streets persist
at (L + 0.5)/2 ≈ 25–30 m, `_critic-ftg.md` F3, where our tables start). A stage with no seed inside its boundary (no
arterial junction or gate plaza) grows nothing, and S5d prices its land as it stands.
* **Division of labour with the bent cut (MFP-2; J-P4, J-3).** In **walled regimes** S5c grows only the
  arterial-connecting secondary network at district scale — proposals seeded at arterial junctions and gate plazas,
  separation floor 120 / 160 / 200 m at TOWN / CITY / METROPOLIS, destination bias toward other arterials — and every lane
  and finer intramural street comes from S8's recursive bent cut of the district polygon, which inherits the wall's and
  the shore's direction (the MFCG street-signature targets are §13.5's). In **extramural regimes** (ribbon, suburb,
  unwalled rings, the ground between polycentric nuclei) growth works at block scale as FTG's does.
* **Heading model per proposal class and preset (FTG-17, FTG-6; J-P8).** `ou`, a mean-reverting curvature walk:
  `κ ← ρ·κ + (1 − ρ)·κ_goal + s·√(1 − ρ²)·ξ` per step Δs, with `ρ = e^(−Δs/ℓ)` (correlation length ℓ),
  `κ_goal = (θ_goal − θ)/L_r` (reversion toward the proposal's goal heading over L_r), `s` from `headingSigma` in degrees
  per 100 m; organic defaults 20° per 100 m, ℓ = 90 m, L_r = 250 m; planned 5° per 100 m. At the organic defaults a 600 m
  street's net turn is p50 21°, p90 50°, 0.1 % beyond 90°, and the per-30 m-step turn p95 11.4°, p99 14.9° with Gaussian
  tails — no cliff and no curling (receipt `docs/validation/bench/fixall_pipeline_ou_heading.out`, 4 000 streets per
  setting). `radiusHold`: ring proposals keep the curvature 1/r of their radius about the centre with a small `s` (the
  `ringed` preset); `gridLock`: headings snap to the preset's grid table (`american`). CI tests the drift distribution per
  preset.
* **Branching** after `n` segments with a per-class probability, perpendicular ± jitter (FTG's `Continue`) or tangential to
  the centre (FTG's `Curve around origin`, the `ringed` preset's ring branch).
* **Destination bias**, switchable per class and preset: a proposal that can reach an unserved destination or an existing
  spine within ≈ 1.5 step lengths turns toward it (connecting the fabric, ending cul-de-sacs deliberately); off for suburb
  offshoots and ring proposals.
* **Legality (explicit, unlike FTG's unstated thresholds; GEO-37).** Minimum separation from parallel spines = the
  regime's separation, and the same clearance applies to shores, wall setback bands, reservations and the stage boundary:
  a proposal running within `max(minimum block depth of the regime, separation / 2) + half its corridor` of any of them
  and within 30° of parallel is deflected or rejected, so no strip thinner than a plot depth is left; a proposal meeting a
  shore or a reservation at ≥ 30° ends there (a street arriving at the quay). A wall is never crossed except at a gate: a
  proposal reaching the setback band stops there. Snap to a junction within `0.35 · step`. **Crossings follow the preset's
  crossing matrix** (proposal class × crossed class → stop in a T, cross with a materialised crossroads, or deflect):
  organic crosses only a lower-or-equal class collinear within 6° (the rare crossroads, O4 b); `ringed` crosses radials
  with rings; `american` crosses on the grid. **Water:** a proposal whose class row allows a bridge (`secondary` and
  `lane` by default) and that meets a river or canal bank within `0.35 · step` of a `site`'s bank vertex (§4.2 S1 (5))
  snaps to it and continues across that deck to the far bank vertex, which builds the bridge (§2.7) — FTG's crossing
  proposals becoming bridges, the sites' 40 m minimum spacing playing its minimum distance between bridges; any other
  proposal meeting water ends there as at a shore. Slope ≤ the class's grade limit (§4.3 *Lattice and costs*: its `ways.crossing` row's `rampMaxGrade`). Junction rules as §4.3, with T-preference in
  organic regimes; the junction-degree band is a preset row (organic 4-way 0–15 %, ringed 20–45 %, american 40–80 %).
* **The arable reserve (item 26; off by default).** When the farm table's `reserveArable` is on (§4.9), S5c's legality
  adds one soft term in the extramural regimes — ribbon, suburb, unwalled rings and the ground between polycentric
  nuclei: while the fertile land left outside the built extent (`SiteResources.fertile` cells of frame and margin outside
  the boundary, §4.2 S1 (10)) is below the arable demand S2 recorded (`arableReserveHa`), a proposal onto a fertile cell is
  priced by `reserveArable.penalty` (default 3, a multiplier on its cost), so growth prefers poorer ground; a shortfall S5d
  then finds is reported (F-BUDGET-STAGE), never repaired by a restart. Off, the term is absent and growth ignores
  fertility, as both references do (J-A26.43).
* **Between stages:** prune dangling `secondary` chains shorter than one block width; trim only S5-grown provisional
  spines that run beyond the boundary (FTG-18) — **S4 and S5b arterials are never trimmed**. The boundary becomes the next
  stage's start.

**S5d Capacity check (FTG-2).** Right after S5c the stage's new coarse faces are priced: built land per face = face area
− the corridor reserve of its spines (declared half-widths) − reservations, floored at 0 (a face its reserves cover holds
no built land); each face's band is the driver-only prosperity field at its centroid (S6 pass 1's kernels) cut by
provisional cut points computed as §4.5 computes the recorded bands, over the land grown so far (S6 then records the
town's `FieldBands` once, over all stages). If the land per band falls short of the stage's demand
`Σ n(c, b, k) · plotArea(c, b) · (1 + λ_b) / plotShare` by more than 5 % in total, **one top-up** runs (skipped when no reachable land is left inside
the frame, §4.2 S3 (6)): the level set grows
to cover the shortfall, S5a re-traces only the affected arc between its pinned gates, and S5c grows the added rim —
except along a moat: a moated arc is never re-traced, so a moated stage's shortfall moves to the next stage's quota (the
last stage's to the exact check), reported. A remaining shortfall goes to the exact check after S10 (§4.7) and to the
F-SITING reconcile, reported (F-BUDGET-STAGE, §5.2). **Test:** §13.2's B-CITY `wealthLevel` sweep.

**Stage regimes** (a table; `StageRegime` rows per rung, era and form):

| regime | where | block-depth band floor | separation | `a` | heading / bias | notes |
|---|---|---|---|---|---|---|
| dense core (walled) | stage 1 | 30–45 m (applied by S8) | 120–200 m (district-scale secondaries only) | 1.3 | `ou`, bias on | lanes come from S8; T-preference |
| walled rings | walled stages ≥ 2 | 45–70 m (S8) | 120–200 m | 1.8 | `ou`, bias on | courts and rear lanes (S8) |
| ribbon (default extramural) | outside the last enceinte along arterials | plots directly on the arterial, depth band 30–50 m, **starting beyond the outer setback / glacis** (MFP-9), density falloff by a distance-to-gate kernel (the idea of MFCG's outskirts filter) | — | 4 | — | MFCG's outskirts: 71–85 % of its extramural buildings lie within 100 m of a gate road (red-team EXP) |
| **suburb** (FTG C10; preset, era row or shanty toggle only — MFP-6; and a history epoch's unwalled stage of at least `growth.ribbonMaxHouseholds` households, V06 §3.6) | a final regime outside the last enceinte | 40–60 m | 80 m | 3 | offshoots, bias off | an optional **perimeter lane** (FTG-20) — the previous enceinte's outer boundary offset by setback and glacis, typed `lane`, broken at arterials — seeds offshoots at a 60–90 m spacing row besides the arterial seeds; offshoots grow as `cul_de_sac` / `lane` proposals **without destination-bias termination** (deliberate dead ends), no infill below the band; plots **directly along the offshoots with small plots from the outset**, a per-plot density Bernoulli from the distance-to-gate kernel leaving gaps; calibration references: FTG's 83 cul-de-sacs, 30.00 m suburb streets, 14.70 m plot outlines (`research/ftg-capture/roadlength100/README.md`) |
| `american` / `ringed` presets | on request | — | preset | preset | `gridLock` / `radiusHold` | crossing matrix and junction band per preset; fixture: `ringed` on a flat site gives ≥ 3 closed rings with radius CV ≤ 10 % and ring × radial crossroads |

**The fusion risk gate (O4 f) and its fallbacks.** S4 + S5 + S8 infill ≤ 100 ms at CITY on reference hardware; the
infill's block-area and junction-degree distributions inside the NG-measured bands on the same district shapes **and**
MFCG's street-signature rows (orientation coherence at 60 / 120 / 250 m, wall and shore alignment by distance band, T/Y
share, intramural dead ends, blocks per ha, plots per block) inside their bands (§13.5). M0 measures this before anything
else is built (§16). If the gate fails on time, extramural growth also stops at `secondary` (`lane` becomes infill-only
everywhere) and the gate is re-run; if it fails on statistics, the infill constants are recalibrated against the NG
vertex captures and the MFCG size-sweep exports (spike M0-b) before M1. Neither fallback changes the architecture. The
gate is repeated at M1 on B-CITY-lite's river, coast and relief configurations with M1's pre-decided fallbacks (§16;
IMP-13).

**Markets and `T` (item 24).** `T` keeps its root at the plaza(s) whatever site the principal market takes (§4.2 S3
(12)): an off-centre market is a destination the routes already serve, and the stage boundaries and gates are the
centre's (J-A24.41). A secondary market S7b claims in a later stage (§4.5 S7b (3)) seeds that stage's district typing and
its prosperity kernel (§4.5), never its growth.
=== END ===

=== REPLACE ### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims ===
### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims

**Perimeter and margin band.** S6's one L1 batch first inserts the **settlement perimeter** — the last stage's boundary
offset outward by the ribbon regime's block-depth band top (50 m) and rounded (FTG C17) — as a chain carrying
`district_bound`, closed against the arterials, shores and frame it meets. Every coarse face outside it belongs to the
hinterland pseudo-district and every face inside to a grown district, so the hinterland's faces are fixed before any
district is typed and no later stage splits a district face to make hinterland (§4.9). **The margin band (J-I9):** along
every L1 edge two face sets share without a way — the perimeter, and any reservation boundary two districts share (a
`reserve` seam run, II.1) — S10's eager step (0) (§4.7) lays a band of half-width 2 m (2 m on each side; a table value
≥ the residue class's minimum width), split by the edge into one unbuildable L3 part per side, typed `residue` with its
side's ground role (on the perimeter a backland strip inside and a headland outside), so the pooled districts and the
hinterland unit never write the edge they share (§3.3 pool step 3): their plot, alley and furlong lines end on the band's
inner edge inside their own set. Its re-laying on a regeneration or an edit is §7.3's (item 2 and the S6 operator's row).

**Grower (CONFIDENCE B9).** Seeds = the sited features (every market — the principal's reservation and each secondary's
claim, one `market` district per market, item 24 — the harbour, gates, castle, temple precinct, river banks, the
bridgeheads — both landward ends of every bridge that carries an arterial, the town bridge among them — and parks) plus a
density-guided remainder, `N_d` seeds in all (below). A grower (MFCG 12710731's district-builder idea) claims adjacent
coarse faces of the L1 skeleton **in round-robin turns**: on each turn it skips with probability `1 − rate(kind)` — the
`district.growthRate` table, one row per seed kind: gate, castle and bridgehead seeds 0.1, riverbank seeds 0.5, every
other kind 1 (provenance `ref:MFCG 12710731 growth rate by seed kind (code)`, P13; J-A47.41) — and otherwise absorbs one
admissible neighbour, drawn uniformly among them. A neighbour is **admissible** when the edge it shares passes the
**edge test** = (no arterial of class ≥ primary, no wall trace, no water, no reservation boundary) unless the seed kind
allows it, and the grown patch passes the **patch test** = (area within the district band, compactness ≥ 0.5, no hole);
a hole check → split. A round gives every unfinished grower one turn, in seed-id order; a grower with no admissible
neighbour is finished, and growth ends when every grower is. Each turn's skip and pick draws come from `district.seed`,
keyed by the grower's seed lineage (its feature's; a remainder seed's first face) and the turn's number, so §7.3's S6
operator re-grows a scoped regroup by the same turns. Faces no grower could claim — enclosed by barriers or by band tops
— seed further districts in face-id order, grown by the same turns (MFCG 12710731's leftover rule). A district whose area
ends below the band's floor merges into the neighbour with the longest shared edge, except one grown from a seed whose
rate is below 1: it keeps at least its seed face, so the rates set its size (the small gate, castle and bridgehead wards
behind §13.5's MFCG anchors row, 2.4–17.6 ha at size 40; J-A47.42); a district face the kernel refuses as degenerate
merges the same way. A settlement with a single coarse face is one district. The arterial barriers and the count law are
ours (J-A47.41). **One law for count and band (MFP-10):** `N_d = round(3.5 · √(A_ha / 10))` seeds over the settlement's
land A (FTG's 10 ha anchor sits in its middle; MFCG 12710731 keeps ⌊√(city cells)⌋ seeds, which this law matches in
metric terms on its size sweep), band `[0.5, 1.5] × A / N_d`, so the mean district grows as √(10A)/3.5 — ≈ 7 ha at 60 ha
of land, ≈ 14 ha at 250 ha, ≈ 22 ha at 600 ha. A district's `faces` is §2.5's `FaceRef`; after S8 cuts lanes the finer
faces inherit the district through `parent` (§2.8), so containment is 100 % by construction (O11 b; §5.3's containment
row checks it).

**Quarters (MFP-10, VIS-4; J-P2, J-P28, J-I1).** After typing, S6 builds §9.1's quarter merge tree (`QuarterNode`) once
per model: it repeatedly merges the adjacent pair of nodes with the smallest cost — combined area, plus 1 000 ha when
their kinds are of different families (central + market, docks + riverbank, gate + ribbon, craft + craft … share a
family), plus 10 000 ha when a wall or water barrier separates them — until one root remains, ties by id. The
**quarters** are the tree's cut at `min(N_q, L)` nodes — after `L − min(N_q, L)` merges, L the number of districts the
grower produced, so every district stands alone when `N_q ≥ L` (`QuarterNode.cityCut`; N_q can exceed the district count
at TOWN) — with `N_q = round(1.37 · B^0.267)`, B the roster's building count: the least-squares fit of MFCG's district
counts on its size sweep (9 / 12 / 18 / 22 / 24 districts at 1 475 / 5 242 / 13 091 / 31 951 / 48 379 buildings), giving
N_q = 9–10 at TOWN (1 200–1 500 buildings), 13–14 at CITY (4 500–6 000) and 17–18 at METROPOLIS (12 000–15 000) (receipts
`docs/validation/bench/fixall_pipeline_mfcg_fits.out`, `fixall_pipeline_r2_quarters.out`). S13a names every node of the
tree; the quarters are the city-band label unit (§9.4).

**Typing (G-P5; MFP-7; J-P1).** A data-driven scorer per district kind reads the roster's remaining demand per class,
the kind's relation rows (`RosterTables.districtKinds[].relations`, §10.2 — item 16's templates: docks at the harbour,
gate wards at gates, central → market / merchant, a `market` kind at every market reservation, noxious crafts downstream
and downwind, near the castle → military / administration, waterfront → docks) and a random term; faces are typed
**greedily from the largest** with a **mixed-use floor** (no single-use district unless requested, R5). Kinds are
**feature-named**; wealth is not a kind — "the rich quarter" is a description the naming engine derives from the
prosperity field (§10.4) — so no district is zoned residential or by class. The district's **identity**, read after
placement from its character vector, names and describes it (item 72 below); the kinds stay this typing, which the later
stages read. **A staged power relation (item 88; J-A88.42).** When the dossier port fills a staged `PowerRelation` (§2.7;
empty in the base), the scorer gains one soft row between the S6 kinds the quarter-identity rows name for its two powers
— the `kind` of each identity row whose `power` is that power's `PowerStanding.kind` (§10.2; §7.7 layer 2) — an
`adjacent` row for an alliance and an `avoid` row for a rivalry or a feud (any other pair type none), weight
`relation.adjacencyWeight` (0.3; our own, `extension`, 0 in the parity presets) × its strength. **Shanty districts (FTG's
rule as the default; items 27 and 23).** A **shanty / squalid** kind is admitted only when the roster's **average band** —
the household shares' mean over the band set below — is `poor` or `squalid`, and only once the settlement's first half is
built (`shanty.trigger`, `shanty.afterStageShare` 0.5; provenance `ref:FTG shanty rule`); where admitted it replaces the
typing of the districts of lowest mean pass-1 band **among the districts of the stages whose cumulative quota share (§4.2
S2's stage rows) exceeds `shanty.afterStageShare`** (a district's stage is its `growthStage`, §2.5), as many as its demand
fills, and takes the cluster row (§4.7 S11, item 70; FTG's tents row in the parity presets). Our preference that shanties
lie outside the enceinte is the `shanty` kind's `extramural` relation row — soft, `extension: true`, weight 0.6, zero in
the parity presets — a tendency, not a law (J-A27.43); the `shanty` toggle (S0) forces the kind on where FTG's trigger
would not fire. MFCG's "one prominent feature per named type" survives as the district's `namingFeature`. A district's
`fabric` is set by S7c, S7b's allocation hook, from its context and its provisional character (V01 §3.3) — `bent-cut`
everywhere in the parity presets and without `@plat/hood` — unless a declaration sets it (II.1, II.2).

**Fields (owner: prosperity is a gradient and a band; AM-6).** The **prosperity field**
`P(x) = Σ_i w_i · kernel_i(x) + characterOffset(district) + ε(x)`, clamped once to [0, 1], with driver kernels from a
table: distance decay to the plaza and to every market — the principal at the row's full weight, a secondary at the
secondary row's (item 24) — to main streets, gates, water and the harbour (+); elevation above the flood line and upwind
(+); low, damp, downwind, flood-prone (−); walls (−); attractors at the reserved institutions (castle, precinct, plaza);
the intent's wealth gradient — a planar ramp rising toward `Intent.wealthGradientCdeg` (§7.7), weight
`drivers.wealthGradient` (0.15; 0 when the intent sets no bearing and in the parity presets); the **daylight term** and
the **water term** (below); the three dials' driver terms and the district pressure (item 72); `ε` a low-frequency fBm
from the field's own sub-stream with a declared share (default 0.15); smoothed by a Gaussian of one block width (σ ≈ 60 m
at CITY) so neighbours vary gradually; stored per coarse face and as a raster. *Mechanism (budget: §12.4):* 32 m cells
over frame + margin; each driver kernel splatted within its radius (or one distance transform per driver class); the
Gaussian an O(N) three-box blur. It is computed in **two declared eager passes** (LC-2): **pass 1** at S6 — first the
driver kernels that exist after S5, terrain and wall shade included (the kernels S5d uses; S6's typing reads this
driver-only state), then, after typing, the district-type term `characterOffset(district)`, which completes pass 1 (S8's
block bands read pass 1 complete); **pass 2** at S10a (§4.7), adding the kernels around the noxious trades, prisons,
middens and institutions the block allocation placed, the positive landing kernel at each ground sky landing (V05 §3.10),
and OR-ing into the daylight term's mask the shade strip of every live sky island (V05 §3.19). S10 onward reads pass 2.
The **island-free value** — the same composition without the strips — is composed at an epoch's evaluation for the island
supply law alone and never stored (V05 §3.15 (1)); at S7b the supply law reads pass 1, which holds no island bits.
**Drivers, for the oracle** (item 102 (f), item 101 (d)): `ProsperityField.drivers(points): FieldDrivers` evaluates each
term of `P(x)` separately at the given points — every driver kernel, the daylight and water terms among them, the
`characterOffset`, the brush strokes' composite, an epoch's drift where §4.11 applied one, and `ε` as `chance` — averaged
over the points; the terms sum, before the clamp, to the stored value. Read-only; used by the oracle's prosperity
explainer (§11.2).
* **Soft terms — one contract (E-36; items 102, 103, 105, 107, 111).** Every owner-item preference that bends placement or
  the field is a **soft term**: it declares its weight cell (a §7.6 table value), its kernel and its bar (§13.2); at weight
  0 the model is byte-identical to the model without it (a no-op pin, the parity presets' setting); it is summed with the
  other terms and the field's controlled chance, never iterated; and it yields to dossier facts, assignments, pins, locks
  and declared places (items 20, 20 (h), 101 R13), which no soft term moves. Each term states only its own kernel, weight
  and limits:

  | term | item | where | kernel | weight | its own limits |
  |---|---|---|---|---|---|
  | daylight | 102 | this field | `−w_sun · shade(x)` (below) | `w_sun`, × the climate row's sunlight cell | at full all-day shade about a tenth of a band's width; never alone moves a plot across two bands; terrain and wall shade in pass 1, island shade in pass 2; the island supply law reads the field before the island term |
  | water | 111 (b) | this field; S3 (6)'s `T` | `+w_waterP · q(x)` here, S3 (6)'s cost factor there | the climate row's water-pull weights, rising with aridity | the wealthy hold the land nearest reliable water and its gardens; near zero in wet rows |
  | siting families and signature pairs | 103 (a)–(c) | §4.7 S10b | the families' derived `RelationRule`s and the pair rows (§10.2) | each row's weight | true physical needs stay hard (a watermill on water, a quay on the shore) |
  | coverage | 103 (f) | §4.7 S10b | a pull toward units the class does not yet serve, away from over-served ones | the coverage row's weight | decides where, never how many: the dossier's count is the truth; without a dossier the coverage target is a weighted option beside the per-capita rate, never a minimum |
  | supply links | 105 | §4.7 S10a, S10b; S7b (1) | each link pulls both ends (consumer toward provider, provider toward its bound consumers' weighted centre) | the goods table's volume × transport cost; the district term's weight | links derived, never stored; a loop's one bounded relaxation pass |
  | spread and pull | 107 | §4.7 S10a, S10b; S7b (1) | the balance profile's blend of spread (coverage, same-kind spacing) and pull (links, families), with `comfortM`'s plateau | the balance row's | in balance with the `distribution` column; quarters are never assigned (§4.5 (4)) |

  **The daylight term (item 102).** `shade(x)` ∈ [0, 1] is the share of a representative day's daylight during which the
  ground at x is in shade, read from the settlement's own geometry by **the model sampler**: (i) sun positions from §8.4's
  `sunPath` at the site latitude the model holds (a dossier's by V08 §3.5's latitude row; else the intent's; default 50°)
  — never the style's `sun.latitudeDeg`, which is view data — on the equinox, at the nine hours whose hour angles are
  −80°, −60°, −40°, −20°, 0°, 20°, 40°, 60° and 80° (the midpoints of nine equal slices of the day), each quantised to
  1 cdeg, the shadow reach capped at 8 × height as §8.4 caps it; (ii) sample points: one per 32 m field cell, its centre
  — the table cell `daylight.pointsPerCell` (1; or 4, the quarter-cells' centres, the pre-decided fallback if item 102's
  island bar fails at one point, recorded as a declared shift); (iii) the layout: per cell one bit per (point, sun),
  point-major and sun-minor, the shade share the popcount ÷ (points × suns); every model-side shade source writes bits on
  this layout and they are OR-ed, so a point shaded by two casters at one sun counts once; (iv) the sampler's digest
  (§6.2's hash of the positions, the points and the layout) is recorded by every stored or derived mask that reads it, and
  a mask whose digest differs is recomputed whole by its writer — the terrain, wall and island masks by the pass that reads
  them; the building-shade mask, whose one writer is V06 §3.4's epoch field phase (file f item 275), counts as zero
  building shade until the next epoch's field phase recomputes it (J-V6.129); (v) the islands' strips are computed at every shade evaluation whatever
  the weight (0 included), from each island's persisted `shadeBasis` (V05 §3.19 (6)) — once per evaluation, at their first
  read (an `S10a.afterDrivers` hook's, V01's S9b, where one reads them, else pass 2's), and held for pass 2's fold and
  every later reader; at a re-derivation starting after SKY and at or before S10a the islands' bases are written at
  S10a's start, before step (i) and every hook; an island without a basis (raised or declared since the last evaluation)
  casts and receives none; a reader at weight 0 — the shade map view — reads them as held and never samples an island on
  demand. **The casters** are only geometry that exists before the term is read: terrain (a valley's shaded side, a cliff's
  foot, the far side of a steep hill), walls, gatehouses, the castle and great towers, raised ways and retaining walls
  (§4.3), in pass 1, and floating islands, in pass 2. Ordinary buildings do not cast in generation (their heights are
  chosen from the field); at an epoch the previous epoch's buildings do, through the building-shade mask V06 §3.4's epoch field phase writes
  ((iv)), so a quarter walled in by tall new
  houses drifts down over time (item 102 (e); §4.11). **The climate cell (item 111 (c)):** `w_sun` is multiplied by the
  climate row's sunlight cell — 1 in temperate and cold rows (item 102 exactly as filed); 0, or negative (toward shade),
  in hot arid rows, where the water term carries the prosperity pull. The prosperity brush overrides the result like any
  driver; the shade share is an optional thematic view (a shade map, §8.2) and the clerk answers "why is this quarter
  poor" with it.
  **The water term (item 111 (b)).** `q(x)` is S3 (6)'s proximity to reliable water, the same function (a river bank, a
  lake shore, the top well-yield ground, and a spring-fed body's shore and source weighted by its `spring.flow`); the term
  adds `w_waterP · q(x)`, `w_waterP` the climate row's prosperity water weight. A failing spring weakens its pull through
  `spring.flow` (§2.3; V06 §3.12.1), read at the field's next evaluation, so the quarters around it may decline (V06).
* **The band set — the references' wealth models as the default (item 27; owner: "prosperity is a gradient and a band
  rather than binary").** The bands are one named, versioned table, `prosperity.bands` (`BandSet`; §7.6), read by every
  rule table that keys a row by band: granularity and the designation templates (§4.7; the site-plan table folded into
  them, J-A19.41), greenery (§4.9), the hidden-plot shares (§4.6), the island supply law (II.6), the ladder rows (§4.11),
  the interior ladder's rows, read at the occupants' band (§2.6, item 28 (f)), and the roster's household and lifestyle
  rows (§10.2). The default set has **six bands**, in order, each declared equivalent to the reference class it
  reproduces:

  | band | FTG lifestyle tier it reproduces | MFCG ward class it reproduces (the open-source model's) | default household share (FTG's captured distribution, weights 1 / 1 / 20 / 40 / 20 / 10; provenance `ref:FTG lifestyle distribution`) | rows of the four-row tables it reads |
  |---|---|---|---|---|
  | `squalid` | squalid | slum | 0.011 | poor / dense (with §4.7 S11's hovel and cluster rows — FTG's tents row in the parity presets) |
  | `poor` | poor | slum | 0.011 | poor / dense |
  | `modest` | modest | craftsmen | 0.217 | modest |
  | `comfortable` — **the middle band** | comfortable | craftsmen | 0.435 | interpolated between modest and prosperous |
  | `prosperous` | wealthy | merchant | 0.217 | prosperous |
  | `rich` | aristocratic | patriciate | 0.109 | rich |

  MFCG's ward-class shares — 0.70 / 0.17 / 0.07 / 0.07 of the open-source model's 30 class-typed ward-deck entries for
  craftsmen, slum, merchant and patriciate (receipt: `research/findings/os-model.md`, the deck's composition) — anchor
  §13.5's built-land share per band group, never a district typing (J-P1). A rule table
  may carry rows for some bands only: a band without a row of its own takes the linear interpolation along the value
  between the nearest rowed bands' centres — how the four granularity rows serve six bands, and how the class-mix weights
  (§4.7 S10b, item 71) are read at a plot's value — and an end band takes the end row. A **discrete cell** (an
  enumeration, a flag, a key, or a count read whole: a value no interpolation can blend) at a band without a row reads
  the nearest rowed band below it, and an end band below every row the lowest row — under the four-row tables `squalid`
  reads the poor cell and `comfortable` the modest cell (V03's J-V3.28) — so a discrete column switches at the lower cut of
  the next rowed band above, the one reading §4.7 S11, §10.2's templates, V03 §3.2 and V11 §3.6.1 cite. The **middle band** — the band
  §4.11's geometry floor bounds a once-richer plot's manifested geometry to (item 31: the shell, never the interior, which
  follows its occupants' band through §2.6's interior ladder, item 28 (f)) — is designated per settlement as the band
  that holds its median household under the roster's wealth shares (`comfortable` under the default shares above, where
  the cumulative share first passes one half: 0.239 after `modest`, 0.674 after `comfortable`), recorded as
  `FieldBands.middle` at S6 with the cuts and moved only as they move (J-A27.42, J-A31.45). The continuous gradient between
  and within the bands is our extension; a parity preset keeps the reference's tier count and shares and sets the
  interpolation's blend to a step at each cut (item 23; J-A27.41).
* **Bands (LC-6, FTG-2).** The cut points are computed **once per town** so that the share of built land in each band
  equals that band's share of the plot land the roster demands (household wealth shares × the band's plot areas, S2) —
  band capacity and demand agree by construction — and recorded as the town's `FieldBands` (§2.5), with the band set's ids
  in order and its middle designation. They move only by an explicit `setAttr` on that record, which re-derives every
  block whose band changes, or by an epoch; a field brush (§7.2) never moves them. A block keeps its recorded band unless
  its value crosses a cut point by more than the hysteresis (0.02), so a replay reproduces the session's bands. Bands are
  used **only where a table needs a class**; continuous rules (coverage, plot size, greenery share, building scale)
  **interpolate linearly between band rows along the value**, so quarters blend at their edges.
* **Over time (LC-12; items 22 and 31; J-A31.45).** An epoch re-evaluates the drivers with the new circumstances; it acts
  on a block only by marking it **due** (`Block.due`, §2.5) when its value crosses a cut by more than the hysteresis, and
  §4.11's survivors' wealth ladder does the rest — rungs a due block climbs by duration and by its stock's
  replaceability, bounded by the geometry floor, which reads `FieldBands.middle` (item 31) — so surviving plots keep their
  built state and never change by a re-derivation; under decline the field contracts toward the survivors' core (§4.11).
* **The owner rule, clause by clause (AM-6).** Continuous field: `P(x)`. Predictable drivers: the kernel table. Controlled
  random component: `ε` with its declared share. Banded only where a table needs a class: `FieldBands`. Continuous rules
  interpolate: §4.7, §4.9. Dynamic over time yet predictable: epochs move the drivers, survivors transform by rule.
  Editable: the brush and `setAttr` on `FieldBands`.

The **density field** and the **greenery propensity field** follow the same construction with their own driver tables and
`FieldBands`. Each field's district-type term is applied after typing as the last step of its pass 1, as above.

**S7b Allocation and district claims (after S7; LC-2, FTG-1, FTG-3).** Everything that decides the town's content is
decided here, once for the whole town, before any lane is cut. The steps run in the order (5), (6), (7), (1) with its
hooks, (2), (4), (3): the sky, underground and undercity allocations first, so the ground's districts are allocated the
remainder, then the town's allocation, its sub-districts, the edge-green choice and the claims. S2's fixed dossier rows
are allocated before the free demand in each rank of (1)'s order (§4.2 S2, item 22 (d)).
1. **Town → districts.** The roster's demand per class × band is allocated to the districts — and, for the outside classes
   (farmsteads, mills, quarries, mines, lumber yards, fisheries), to the **hinterland** pseudo-district (§4.9) — by
   capacity and affinity, greedy in a declared order (institutions, then large workplaces, then households; classes by
   priority then id; districts by score then id) from the town's `alloc.district` stream, derived from the town's lineage
   on demand (no allocation record stores a stream key; §2.5, §6.1). **Capacity** is each district's built land per band
   from pass 1, less its expected dispatch land (its sub-block square and green quotas, phase 2's yard expectation and a
   manor block's lost capacity, V01 §3.5.9) and less the under-deck strip of every raised part inside it, plus the
   expected capacity of the deck plots it owns (item 110 (b), (d); V01 §3.17.4, V01 §3.17.6). **Affinity** is the district
   kind's relation rows (§10.2), adjacency to features, resource sites from `SiteResources`, and the **supply term**
   (item 105 (g)): a class's links' satisfaction at the district's centroid against the providers already allocated in
   this declared order (the sky pseudo-district's point read by V01's χ̃, V01 §3.2 (5)), weighted low enough that item 72
   (3)'s dispersal holds with its random share unchanged (J-A72.46), so chance does not split a chain across opposite ends
   of the town; item 107's balance profile (§10.2) weighs this term against the class's spread. Between the greedy pass
   and the reconcile S7b calls its `S7b.afterGreedy` hooks (§4.12) — V01's S7c, which gives each district its fabric and
   the land its template takes (`templateLandM2`, V01 §3.3.7). A bounded reconcile (≤ 3 rounds) then moves counts between
   districts before any placement, on each district's capacity less that template land, moving the households it cannot
   hold, in the declared order, to the first district whose capacity holds them; institutions and workplaces never move
   for a template. The result is persisted as one `Allocation` per district and one for the hinterland. A district with
   zero capacity takes nothing; a town with one district takes the whole demand there.
2. **Sub-districts (COV-FTG-E02).** A class carrying a cluster tag (a trade group) whose allocation in a district exceeds a
   threshold share gets a `SubDistrict`; S10a gives it a contiguous group of blocks sized to its allocation, so industries
   clump inside their district as FTG's sub-districts make them.
3. **District claims (J-P41).** Every item larger than one block — institutions whose requirement exceeds the district's
   upper block area (`e_hi²`, as §4.6's stop test defines it), the district's share of the park and green quota (§4.9),
   area-bearing assignments, a castle's esplanade, and the squares larger than a block that `squares.quota` sets (the base
   table `SquareQuotaRow`, §10.2, read from M2b; its rows V01 §3.5.2) — is sized from its requirement table and cut out of the district's coarse faces **other than its
   `wall_strip` faces** by `claimSubFace` (its `within` is that face list, §3.4) at the best siting score among them, and
   entered as a `Reservation`; S8 cuts around it as a hole (the slit exists), S10 keeps only sub-block claims, and S12b
   builds parks only on reserved faces or residue. No S7b claim takes strip ground, as no S8 cut does (§4.6): a strip's
   ground is the band, setback and glacis S10's step (0) builds, where the hard invariant "footprints ∩ (band ⊕ setback) =
   ∅" leaves a claim nothing to stand on, and only S7's gate plazas use a strip's setback zone (§4.8); a castle's esplanade
   is therefore claimed beyond the bailey's outer strip, so the spacer reads as glacis, then green (§4.9). A claim the
   kernel refuses, or that no face holds, is re-sited on the next-best face and then reported and dropped (F-SITING).
   **Test:** 100 % of institutions and parks larger than one block placed at their requirement (O18 f), and 0 S7b claims
   meeting a wall strip. **Secondary markets (item 24).** The `N_markets − 1` secondary markets S2 demanded, less any
   polycentric plaza S3 (12) ranked secondary, are claims of this step: each is sited by the market row's district score —
   gate wards, the harbour and riverbank districts and the districts of later stages first (MFCG's secondary plazas arise
   in its later wards; FTG's market squares by its district rules), then any district by demand — under two rules whose
   defaults are MFCG's behaviour: **never touching** (`market.minSeparationM` 150 between market reservations, and no shared
   edge with another market or the plaza) and **small patches** (the claim takes the smallest coarse face of the chosen
   district that holds the secondary row's area band, 0.10–0.25 ha at CITY); it enters as a `market` reservation with
   `rank: 'secondary'`, its district is typed `market` (a feature name, J-P1), S8 cuts around it, and §4.7 S11's stall and
   centrepiece rules read its rank. A market that cannot be sited under the rules is reported and dropped (F-SITING), never
   forced (J-A24.42).
4. **Edge greens and orchards (§4.9).** For every district that touches the settlement perimeter and whose band row carries
   the edge-green-or-orchard rule, S7b draws the choice from that district's `alloc.district` stream with the rung's
   probability (`RungProfile.greenery.edgeGreenProb`, §1.1): a **green** becomes one of the district's claims (3), built by
   its own S12b on its own faces; an **orchard** becomes a row of the hinterland's allocation,
   `{ cls: 'orchard', areaM2, near: district }`, built by the hinterland unit's S10 in the first ring beside that district.
   No district stage ever writes a hinterland face.
5. **Sky pseudo-districts (owner-staged; AM-2, AM-10, AM-13, AM-15; II.6).** When the model setting
   `recipe.layers.islands` is on for a rung whose row admits islands (II.6 (1)–(2)), S7b first draws the island count on the
   `island.place` stream by II.6's count law and, for each open slot, creates its sky pseudo-district's `Allocation` —
   before any island exists — filled from the richest band down under II.6's supply law: the allocation's plot land is the
   supported area `A(S_carried, S_town)` × `plotShare`, V01's `hood.constants.sky.plotShare` (V01 §3.14; its default the
   dense core's share, §4.2 S2), the one share the island's district count divides by (V01 §3.16's `skyDistrictCount`),
   recomputed as households are added, until it is used or three districts' worth of households are allocated; a slot
   whose supported area is 0 gets no allocation — the gate, the forced slots, the reasons, the fill with its carried
   workplaces, the district count, the outline and the placement of each slot by V05 §3.2–V05 §3.7, a slot that cannot be
   placed returning its rows before (1). An `institution` island's allocation holds its one institution (the
   `IslandInstitution` row's, or the assignment's) and exists only where the town's supply admits it. `SkyStrategy`,
   registered after S7b by declared I/O (SKY, §4.1), takes these allocations, each with its supported area and altitude,
   and sizes and places each island to hold them (II.6).
6. **The underground pseudo-district (owner-staged; item 12, II.7.3).** S7b creates the underground pseudo-district's
   `Allocation` — (a) the poorest band's `undergroundShare` and (b) the classes whose row is `underground: 'preferred'`,
   where `Features.sewers` is on and the network forecast (II.7.3; V04 §3.3) predicts navigable mains; (c) in an epoch, the
   crowding hook (II.7.3 (c)), whose void part is allocated whether or not `Features.sewers` is on, to the accessible
   cavern and ruin clusters' dwellings and capped by their free capacity; (d) at every rung, the **void-dwelling part** —
   V04 §3.3 P7's derived `voidDwellingHouseholds` (its cells V04 §2.3's `voidDwellings`, `extension` cells) of the poorest
   band, for the cavern and ruin voids whose forecast access chance reaches `accessForecastMin` (V04 §3.3 P7), placed by
   V04's F6 — and the clandestine institutions
   whose mode is underground, except where S7b predicts an undercity, which takes them at (7). Each part is capped at
   `forecastSafety` (0.85) × its forecast capacity; the rows, the law and the cap are II.7.3's; the pseudo-district exists
   wherever this step allocates, (c) or (d) alone included; the ground's districts receive the remainder.
7. **The undercity (owner-staged; item 65, II.7.5).** Where the network forecast's existence verdict (V04 §3.3 P6) gives an
   undercity, S7b creates its allocation — the H households of II.7.5's size law (the squalid band's first, then the
   poor band's), the outlawed, and the clandestine institutions whose mode is underground — capped at `forecastSafety` ×
   the void's forecast capacity; II.7 states the rows and the cap, and the districts above ground receive the remainder,
   so the population stays whole.

**Neighbourhood character, identity, the three dials and the band range (item 72; owner: "neighborhoods … more or less
defined by the mix of assigned lots within them and how they correlate to relevant political powers as well as the
spatial flow of trade … This assignment also helps to assign names to neighborhoods").** A district's kind (Typing, above)
is what the stages read to build it; its **character** is what it has become — derived from what was placed in it, never
assigned once. This is the one statement of the character vector, the quarter identities, the three dials, the band
range, the pressure and the partition. The records are §2.5's (`CharacterVector` — this derived profile, the one meaning of
"character"; the per-district input is `DistrictIntent`, §7.7; J-A72.41 — `District.identity`, `District.bandRange`,
`District.pressure`, `District.nameHistory`, `District.venueMix`) and §2.7's (`Institution.powers`); the row types are
§10.2's; the inputs are §7.7 layer 2's circumstance slices — the dossier's facts, or the blueprint's own as their stand-in
(item 20 (h)). **Which districts:** S12c covers the ground's districts and the districts of every sky island (the town's
S12c, after SKY-F; V01 §3.10.3 step 5, V05 §3.1); a standalone neighbourhood document's unit run runs its own S12c over
its districts (V01 §3.10). The hinterland, sky and underground
pseudo-districts take no character or identity; an undercity or underground neighbourhood reads the identity of the
district above it, which §10.4 names as its underside.

1. **Value, not volume — significance (J-A72.45; owner: "each church individual value is greater than the lodging").**
   Every count, share and dial below weighs a placed instance — a use (workplace, shop, institution) or a residential
   building — by its **significance** `σ = BuildingClassRow.significance × rank × size × patronage`: the class's base value
   (a cathedral far above a church, a church far above a lodging house, a guildhall above a workshop; houses, lodging and
   common shops low — our own rows, §10.2), × the institution's rank (1 unless its institution row or the dossier gives
   one), × its size (its footprint area over its class's median footprint, clamped to [0.5, 2]), × its patronage (1 + the
   dossier's wealth or rank of the institution when it gives one, clamped to [1, 2]). So many lodgings never outweigh a few
   churches.
2. **The character vector — five components, derived (item 72 (a); `CharacterVector`, §2.5).** Written by **S12c
   Character** (§4.1: town-wide, on the generation worker after the pool's merge, before S13a) and by each epoch's
   character step (§4.11): a pure function of the placed plots, the slices and the geometry, draw-free, recomputed on load
   and equal on recomputation (J-DET-12); a district with no placed instance has an all-zero vector and takes the plain
   identity of (4). (1) **Plot mix** — for each class family `f` (a family is a `tags` value of the class, one of the
   families §10.2's identity rows name — religion, craft, trade, lodging, residential, military, administration, harbour,
   noxious, learning, arcane, crime …): `mix[f] = Σ_(i∈f) σ_i ÷ Σ_i σ_i` over the district's instances. (2) **Political
   alignment** — for each power `p` of the powers slice: `powers[p] = Σ_i σ_i · w_i(p) ÷ Σ_i σ_i`, `w_i(p)` the partition
   weight of (7); when the port fills a staged alliance (`PowerRelation`, §2.7; item 88), `powers[p]` gains
   `relation.spill × strength × powers₀[q]` and `powers[q]` the converse, from the unspilled values `powers₀`, the vector
   then scaled back to its unspilled sum (`relation.spill` 0.25; our own, `extension`), while a rivalry or a feud acts only
   through typing's row (above). (3) **Trade position** — `trade` = the district's frontage length on each way × the way's
   trade weight (§4.3's `TradeFlow`), summed and divided by the town's largest such sum (the busiest district 1; all 0 when
   every way weighs 0); `tradeBearingCdeg` the weighted mean bearing of the gates whose routes cross it. (4) **Economic
   role** — for each sector `s`: `sectors[s] = Σ_(i∈d) σ_i · w_i(s) ÷ Σ_(all i) σ_i · w_i(s)`, the district's part in the
   town's weighted presence of that sector. (5) **Relations** — `mainRoad`, the share of its frontage on `through` and
   `primary` ways; and `anchors`, the significant institutions (σ ≥ `character.anchorSigma`, 5) within
   `character.anchorRadiusM` (400 m) from its boundary, each weighted `σ_anchor × (1 + c) ÷ (1 + distance ÷ radius)`, where
   `c` is the district's contribution share — its share of the anchor's suppliers (plots at the tail of the anchor's
   supply edges, §10.2) and of its members (the `Membership` records of the anchor's power housed in the district, §2.7,
   when the module has materialised them, else 0). Its provisional form χ̃ — this function over S7b's allocation rows with
   size 1, its contribution `c` from the allocation-level supply links — is V01's (V01 §3.2), read by S7c and S9b only.
   With the vector S12c writes `District.venueMix` — the district's use mix, the σ-weighted share of its placed uses per
   class — read by §10.4's description, the context vector (§2.5) and II.1's `DistrictContext`.
3. **Three distributions (item 72 (d′); `BuildingClassRow.distribution`, §10.2).** **`district-defining`** — a class that
   IS a district (a dossier QUARTER record's district — a red-light district over its brothels, V11 §3.12; item 108 (a),
   §10.2's step table — whose record also owns its trade's members): inside its district at the raised share and, by the
   class's ordinary spread (item 107), outside it. Each dossier instance claims ONE district:
   S6's typing places the defining instances first — they are known before placement, S2's fixed dossier rows (§4.2 S2) —
   each taking the not-yet-claimed district that scores highest by the relation rows of its identity row's `kind` (§10.2)
   or, for a row without a kind, by its defining class's own relation rows (the `brothel` class row's soft `nearHarbour`, `nearGate` and `near` an inn rows, V11 §3.5; J-A72.51) (a red-light
   district near the docks, the gates and the inns), one district per instance, and two instances in one district only when no unclaimed district scores above zero (reported).
   The instance shapes its district without filling it: S7b allocates it the ordinary demand for its band with the defining
   class's share raised to its identity row's `targetShare` (§10.2; more brothels — still a smith, an inn and houses); its
   band, granularity, greenery and lighting rows are the defining kind's; its identity's source is `dossier`. The slums, a
   foreign quarter and a guild district are naming claims whose kind bias reaches their identity rows (§7.7 item 16; V11
   §3.10), never district-defining instances. A dossier that adds one to
   a town already drawn converts the district whose character vector lies nearest the kind's identity row toward it by item
   22's least-disruption mutation, as a dossier event at §4.11's step (e) (§7.7 item 5): its S6 kind re-typed, the
   allocation's delta placed in S10b's least-disruption order, nothing re-rolled. **`dispersed`** — every ordinary class
   (smiths, alchemists, chapels, bakers, inns, shops, houses): S7b (1) spreads it over all districts by capacity and
   affinity with a controlled random share of the affinity score (`dispersal.random`, 0.3; drawn on `alloc.district`, no
   new concern), so some districts hold several, some one, some none, and no rule gathers a dispersed class into one
   district (J-A72.46); FTG's sub-district clumping (S7b (2), COV-FTG-E02) stays the parity presets' behaviour and a
   cluster-tag option inside one district. **`singular`** — a one-off anchor (V11 §3.5's singular rows, e.g. the
   cathedral, the palace, the principal market's hall): sited by its own rules (S3's reservations, S7b (3)'s claims, its hard rows),
   weighing on its district through its σ and on the districts around it through (2)'s anchors.
4. **Quarter identities (item 72 (d′); `RosterTables.quarterIdentities`, §10.2).** Each row is a σ-weighted count of class
   families with a threshold (a count, or a count per hectare for the rows that scale with the district), an optional band
   condition, a priority and a `singular` flag — the religious quarter: chapels and churches weight 1, a cathedral or a
   great temple 3, threshold 3, so three churches or one cathedral alone suffice. S12c gives each district the
   highest-priority row whose threshold and band condition it meets (a `singular` row goes to its highest-scoring district
   only); else its **dominant component** — the family of its largest `mix` share, or the sector of its largest `sectors`
   share when that exceeds `identity.dominantMin` (0.35) — named by that family's or sector's row; else a **plain
   residential identity** by its band ("the modest quarter"): an identity, never an S6 kind, so typing stays feature-named
   and no district is zoned by class (J-P1 refined, J-A72.42). A dossier-declared identity — a district-defining
   instance's, a ladder QUARTER record's, or the kind bias of a naming claim matched to the district (§7.7, item 82) — wins
   over every emergent one; an author's declaration (item 101) is the other non-emergent source. **Quarters are never
   assigned** (item 107 (e); J-A72.46): no chain or trade is given a neighbourhood by rule — a quarter forms only by the
   dossier, a declaration, or emergence past a row's threshold, whose per-hectare scaling gives cities more quarters than
   towns and villages few or none. `District.identity` records the row, its source (`dossier`, `emergent`, `dominant`,
   `plain`) and the week it was taken (§2.5). The kind stays the typing the later stages read; the identity names and
   describes the district (§10.4; J-A72.42).
5. **The band range (item 72 (d‴); owner: "this neighborhood prosperities defines the bounds (floor, and ceiling) of what
   any building inside of it can be").** S10a writes each district's `bandRange = [floor, ceiling]` (§2.5) from its
   area-weighted mean pass-2 value by `RosterTables.bandRanges` (§10.2: a row per band of the band set, split at the band's
   middle — the rich band's upper half the rich band alone; a prosperous district spanning the middle band to rich, item
   71's mix; a poor one squalid to modest), so S10b and S11 read it before they place and build. Every prosperity-driven
   state of a building inside the district stays in the range: the class a new build or a re-designation takes (item 71's
   weights outside it are 0, the rest renormalised, §4.7 S10b), the template row's band it reads (a band outside the range
   read at the range's nearest end), its condition and upkeep, its extensions (the mutator's adapt and add steps, §4.7
   S11), its occupants' band and its interior-ladder rung (§2.6, read at the occupants' band). **The occupants' band:** S7b
   (1) allocates by the range `RosterTables.bandRanges` gives at the district's area-weighted mean pass-1 value — a
   provisional reading, never stored; S10a, which writes `bandRange` from pass 2 at its step (ii), moves any household S7b
   allocated to a district whose written range excludes its band, before its step (iii) distributes households to blocks,
   each move reported, to the first of these that holds it: (a) the first district in S7b's order whose written range
   admits the band and whose capacity holds it; (b) the district, in S7b's order, whose written range lies nearest the band
   and whose capacity holds it — its band read at that range's nearest end (a derived band, reported); (c) when it fills a
   dossier's population and no district's capacity holds it, its own district, housed there by §4.7's re-provision
   (*Households per building*; J-A20.72), its band read the same way — never a shortfall, so the population stays whole
   (§7.7 item 2), as §13.2's T19-4 bars; only a household that fills no dossier's population and that no district's
   capacity holds meets F-SITING's ladder (§5.2). The range always holds the district's own band (J-A72.50). Item 31's
   geometry floor still keeps a standing shell — a mansion in a district that fell keeps its geometry, while its condition,
   occupants and interior are bounded by the range (subdivided, worn). No informal cluster and no hovel goes up in any
   district whose range excludes the squalid band (§4.7's *Informal clusters*).
6. **The three dials (item 72 (d″), (d4)).** Driver terms of the prosperity field with declared weights, never replacing
   the other drivers, each moving a building's prosperity-driven state within its district's range and clamped there (5);
   they read the **applied** standings and shares of §4.11's hysteresis (`PowerStanding.appliedStanding`, §7.7 layer 2, and
   each sector's applied share, the fold of §4.11's *The dials' inputs over epochs*, derived on replay and never stored),
   from §7.7's `CircumstanceSlice.powers` and economy shares — never from the simulation module (§10.3). With `N` the
   powers of the slice, a power's amplification is `A_p = N × appliedStanding_p` (1 at an even standing). When the dossier
   port fills §10.2's staged rows (`PortRows`; item 88; J-A88.42), the governing power's `A_p` (the standing whose
   `governing` holds) is multiplied by `PortRows.legitimacy`, and a dossier institution's visible impairment
   (`DossierInstitution.impairments`, §14; §7.7's F4 row) whose type is a non-physical row of `PortRows.impairments`
   (`physical: false`) lowers that institution's own term (below) by `conditionSteps × severity × dial.conditionStep`,
   `severity` the impairment's; while the rows are empty legitimacy reads 1 and no impairment acts. **The institution
   dial:** every class and infrastructure element answers to its powers (`BuildingClassRow.powers`,
   `RosterTables.powerLinks`, §10.2; the dossier's `Institution.powers` override, §2.7); an instance's term
   `dial.institutionWeight × Σ_p w_i(p) × (A_p − 1)` scales its institution attractor kernel in field pass 2 and steps its
   condition by one step per `dial.conditionStep` of the term, and a rising power's institutions extend within the range
   (the mutator's adapt budget). **The quarter dial:** a district whose identity row names a power
   (`QuarterIdentityRow.power`) adds `dial.quarterWeight × (A_p − 1)` to its `characterOffset` in pass 1 — at generation
   only for a dossier-declared district-defining quarter (known at S6), for an emergent identity from the next epoch on
   (J-A72.40). **The economy dial (owner: "the market share affects their application"):** a sector's amplification is its
   applied share over the even share, `A_s = S × share_s` (S the sectors the slice lists: an even mix gives every `A_s` =
   1), an instance's the blend `A_i = Σ_s w_i(s) × A_s` of (7); its term `dial.economyWeight × (A_i − 1)` scales its
   class's driver kernel in both passes (a trade-led town lifts its markets, warehouses and quays; a toll-led one its gates,
   bridges and roads) and steps its condition as above — so a 40 % sector amplifies its classes twice as strongly as a
   20 % one, an even mix changes nothing and there is no term for rank (J-A72.49); the same shares shift the roster's
   town-level character (§4.2 S2, §10.2; J-A72.43). **Trade as a driver:** the gate and main-street kernels scale by
   `1 + trade.kernelScale` × their gate's or way's trade weight (§4.3; `trade.kernelScale` 1.0). The map reads the make-up
   and the standings; it never models the economy or the powers (D-10, D-32; item 20). Defaults (our own, calibratable):
   `dial.institutionWeight` 0.10, `dial.quarterWeight` 0.08, `dial.economyWeight` 0.10, `dial.conditionStep` 0.05, each an
   `extension` that the parity presets set to 0, as they do `trade.kernelScale`.
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
   cut past the hysteresis, the range moves and the buildings may follow by §4.11's ladder. No brush writes it; with no
   epoch it is 0.
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
   recomputation, renames and pressure run on the staged evolution engine's epochs (§4.11), whose step and records the base
   carries. The bars are §13.2's (item 72).
=== END ===

=== REPLACE ### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule ===
### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule

S8 runs per district (one batch each, districts in lineage order in the generation worker) on every coarse face of the
district except its reservations and its raised ground (a reservation inside a face is a hole; so is every committed
raised part's under-deck strip — the deck's ground projection over its piers and spans, widened each side by
`raisedWays.structure.stripMarginM` (V11 §3.24.2, shipped with item 110's rows; V01 §3.17.3 (2) reads the same strip) —
with its pier footprints on ground part 0 (§2.7): no block interior, plot, seed or footprint lies in it, so S10 and S11,
which build only inside S8's blocks, never cut a plot or stand a building there, with or without stage 2, and a strip
crossing a face from boundary to boundary cuts it; so is every **cliff inside the district** — an S1 `cliff` `SiteFeature`
(§2.3) or ground over the `walls.barriers` table's `cliff` threshold (V11 §3.16.1), §4.7's hard line — widened above its
top and below its foot by `shoreSetback`'s `cliff` distance (§4.2 S1 (8)), before the face's first cut: no lane, seed,
block interior, plot or footprint lies in it or crosses it, a cliff crossing a face from boundary to boundary cuts it
into faces each cut on its own, their plots backing onto the band (§4.7 *Levelling and retaining walls*), and V01's
fabrics read the band's two edges as V01 §3.6 (7)'s hard `cliff` run; a `landing` reservation's attach vertex that no
way meets when S8 starts — a sky landing claimed at its foot, V05 §3.10 (4) — is a destination the district's infill must
reach: S8's first cut in that face runs from the attach to the nearest way by the lane rule, as a gate's attach is
reached, before the face's own recursion) and its wall strips (faces S8 never cuts, §4.8), whose kerb polygon —
`kerb(F)`, the kernel's single kerb function: the face minus the buffered spines, §3.7 — step 1's stop test does not
already accept as a block (each face's threshold falls inside **the district's block-depth range**, which step 1 derives
from the granularity law's plot depths at the district's pass-1 band, §4.7, and the stage regime's floor, §4.4). In
walled regimes the faces are district-scale (S5c grew only arterial-connecting secondaries), so this recursion produces
every intramural lane and secondary and propagates the wall's and the shore's direction into the fabric (MFP-2). S8 plans
each cut on `kerb(F)` of the current L1 faces, inserts each accepted lane at L1 in the district's transaction, extended to
the crossed spine as a T-junction (step 7), and recurses on the children's kerbs; S9's `corridorUnion` then commits
exactly those kerbs (contract test "S8's working block ≡ S9's committed block, Hausdorff 0", §13.2), so no `insetRing` by
corridor half-widths is needed (GEO-20). **The wall is a barrier:** S7 has cut each enceinte's wall strips off the faces
beside the trace (§4.8), so the `kerb(F)` of a face beside a wall stops at the strip's boundary — the inner setback line,
or the intervallum's kerb where the era row has one — and no cut is planned through a wall's band or setback; the band,
tower and gatehouse faces are built later inside the strips by S10's step (0) (§4.7), so S8 never meets an L3 face.
**Test:** on every walled B-CITY seed, 0 lanes cross a wall strip and 0 L3 band faces are cleared or split by an L1 batch.

**The strategy slot.** S8 calls `FabricStrategy.partition(district, seam, ctx)` for the district's `fabric` row; the base
registers `BentCutFabric` for `bent-cut`; stage 2 registers `TemplateFabric`, which lays the row's seed primitives in the
district's template face and then runs this section's recursion on every face of the district (V01 §3.4); the context
features of V01 §3.6 run in S8's district batch whatever the fabric (G-P2, §14).

**Sides (GEO-22).** Before any rule reads a side, the face boundary is reduced to **runs** (the kernel's `sideRuns`,
§3.4): maximal boundary chains whose cumulative turning stays within 10°, each with its chord direction; a crossing
street's fillet arc is replaced by its virtual corner (NG PF-1's method). "Perpendicular to a side" is measured against
the run's chord or, on a curved run, against the tangent over a ± 5 m window at the contact point — never against the one
short segment a cut happens to hit on a Chaikin-smoothed, round-joined kerb. M0 (b)'s face set is §16's.

**The recipe (MN-3; the mechanism of NG 1.2.2's plain bisector as read in its code — reader-tier, via the digest —
restated in our metric terms; the profile's measured statistics remain the §13.5 targets; MFCG 12710731 and VG 1.6.9
differ where step 5 says).** Given a face F:

1. **Stop test.** `obb(F)`; the face stops as a block when its minor extent is under a threshold drawn for it from
   `cut.stop`: `τ = e_lo · (e_hi / e_lo)^g` (the power by `dmath.pow`, §6.5 (3)), with `g = |(u₁ + u₂ + u₃ + u₄) / 2 − 1|` —
   four uniforms folded into a bell over [0, 1] (mean 7/30, its mass heaped near 0; g = 1 only when every uniform
   is 0, so `τ` lies in [e_lo, e_hi]) — so most faces stop close to the range's shallow end and a few run
   deeper (provenance `ref:NG 1.2.2 per-face stop threshold (code)`, P1 — NG 1.2.2 and MFCG 12710731 compare the face's
   area; ours re-expresses the test on the extent, because a block's depth, not its area, decides whether its frontage rows
   fit; J-A34.41). **The block-depth range**, stated here once: `e_lo = max(2 · d_lo, r_lo)` and `e_hi = max(2 · d_hi, r_hi)`
   — two back-to-back rows of the band's shallowest and deepest plots, floored by the regime — where `[d_lo, d_hi]` is the
   plot-depth band the granularity law gives the district at its pass-1 band (`GranularityLaw.bands(…).depthM`, §4.7 S10
   (2): interpolated along the prosperity value and scaled by the rung's depth factor) and `[r_lo, r_hi]` is the district's
   stage regime's block-depth band floor (§4.4; both 0 for a regime whose row gives none). In this section **the band's plot
   depth** is `d̄ = (d_lo + d_hi) / 2` and **the band's upper block area** is `e_hi²` (J-A34.42); the depth rows and the
   regime floors are re-fitted at M-1 under this reading (§13.5's blocks row).
   **Slope term (COV-MFCG-C05):** on a face whose mean slope exceeds 5 %, the working major axis is the OBB major axis
   rotated toward the contour direction by the weight `min(0.5, slope / 0.3)`, so cuts on a hillside run with the fall
   line and blocks lie along the contours (our own rule: no reference reacts to slope here — MFCG 12710731's model has no
   terrain; provenance `own`, its cell marked `extension: { over: 'both', mode: 'option' }`, so the parity presets switch it
   off, §7.6; J-A33.42).
2. **Position.** `f = (c + b) / 2` along the working major axis, where `c` is the relative position (0 to 1) of F's area
   centroid's projection on that axis and `b` averages three uniforms drawn from `cut.t`, `(u₁ + u₂ + u₃) / 3`; there is no
   outlier term, clamp or redraw — `f` never strays more than 0.25 from `(0.5 + c) / 2`, and a lopsided face is cut toward
   its mass, so its children's plot depths balance (provenance `ref:NG 1.2.2 centroid-and-bell position (code)`, P2; MFCG
   12710731 and VG 1.6.9 place the cut alike). On a holed or annular face `f = m + (1 − 2m) · b` over the outer ring's OBB
   length, so that `f` keeps at least `m` from either end, `m = min(0.45, e_lo ÷ that length)`, with no centroid term (NG
   1.2.2's hole-aware law, P2). The σ of 0.066 (plain) and 0.098 (holed) that §13.5 and §16 M0 (b) read are NG 1.2.2's
   measured outputs of this law, never its inputs (J-A35.41).
3. **Start.** The minor-axis line at `f` meets F in one segment around the OBB centre's projection (for a concave face, the
   segment containing the point nearest to it); its two ends are the candidate starts, one on each long side, which defines
   the start and far sides for any face shape — triangles, C-shapes and curved faces included. The start A is the candidate
   lying on the run whose chord is most nearly parallel to the working major axis (ties: the earlier run in boundary order)
   — a deterministic choice with no draw (provenance `ref:NG 1.2.2 start-run rule (code)`, P3; MFCG 12710731 and VG 1.6.9
   start alike; J-A36.41). The runs are ours (GEO-22): NG 1.2.2 works on raw edges, the cause of its inexact arrivals.
   Leave A exactly perpendicular to its run.
4. **Corner.** The first leg leaves A along its run's inward normal; `λ` is how far it runs inside F before reaching the
   boundary. The corner K sits `o + (λ − 2o) · b` from A on that leg — `b` again averages three uniforms from `cut.t`,
   `o = e_lo` (on a holed or annular face `o = e_lo / 2`) — or at `λ / 2` when `λ < 2o`, so the bend lands near mid-course
   and at least `o` from both ends (provenance `ref:NG 1.2.2 corner-first rule (code)`, P4; MFCG 12710731 and VG 1.6.9
   alike). K is fixed **before** any far side is chosen (J-A37.41).
5. **Far side and second leg.** Among the runs that face the first leg (inward normal against its direction), whose
   perpendicular foot from K falls inside the run and whose segment K–foot crosses no other boundary, the far run is the one
   whose chord — on a curved run, its tangent at the foot (*Sides*) — meets the first leg nearest to a right angle (ties:
   the earlier run in boundary order); the second leg is K's perpendicular onto that run, so every cut arrives square. No
   such run: the plan fails (`E_NOT_TWO_CROSSINGS`) and step 8's ladder takes the face (provenance
   `ref:NG 1.2.2 far-side rule (code)`, P4). Two bends never (3 / 519 in NG's measurement). M0 (b) measures the adopted
   rule against NG on the same faces (§16). **Straight or bent** is the table row `cut.bendMode` (J-A37.42):
   * `flatten` — the default (provenance `ref:NG 1.2.2 flatten test (code)`, P5): the cut is A → K → foot, and K is
     dropped (the cut becomes A → foot) when the triangle A–K–foot has a height below `max(cut.flattenM, 0.02 × |A–foot|)`;
     `cut.flattenM` = 0.7 m (provenance `own` — NG 1.2.2's two model units read as ≈ 0.7 m through its export scale — 0.35
     per unit in the GeoJSON schema MFCG 12710731 writes in metres — an inference, recalibrated at M-1 on the bent-cut
     signature of §13.5);
   * `straightFirst` — the `MFCG` parity preset's value (provenance `ref:MFCG 12710731 square test (code)`, P5; VG 1.6.9
     likewise): the cut runs straight, A → the first leg's hit, if the first leg arrives at the run it hits within
     `asin(√0.99)` of square (≈ 84.3°, tested without trigonometry: the two unit directions' cross product, squared,
     exceeds 0.99) and step 8's checks pass; otherwise it is planned as under `flatten`. The preset also reads
     `cut.flattenM` = 8 m (MFCG 12710731's default flatten height of two model units at its 4 m export unit; all three
     builds share the test; P5), so it reproduces MFCG's own street signature (§13.5) through §7.6's per-preset values.
6. **Fillet (COV-NG-N19).** Lane and street cuts only, never plot cuts (§4.7). At a kept corner with deflection δ and
   shorter leg ℓ, one draw from `cut.arc` keeps the corner sharp with probability `s + (1 − s) · min(1, w_min / ℓ)`, where
   `s = sin²(δ/2) = (1 − cos δ) / 2` and `cos δ = û₁ · û₂`, the legs' unit directions (no trigonometric call), and `w_min`
   is the district's minimum plot frontage (the low end of `GranularityLaw.bands(…).frontageM` at its pass-1 band, §4.7) —
   so a sharp turn or a short leg keeps its corner and a gentle turn between long legs is rounded. Otherwise K gives way to
   an arc of a circle, tangent where the shorter leg ends and, along the longer leg, as far from K as that end is — so the
   curve spans the shorter leg entirely and what remains of the longer one is straight — sampled in equal chords no shorter
   than `w_min` or the lattice minimum edge; an arc with under three sample points, or one leaving the face, leaves the
   corner sharp. The radius follows from the legs, never a constant (provenance `ref:NG 1.2.2 fillet rule (code)`, P6,
   shared by MFCG 12710731; J-A38.41). NG's measured 53 % filleted share is this rule's output on NG's faces (the fillet bar
   of §13.5).
7. **Ends in the model (GEO-21).** Each junction end is extended along its arrival direction from the kerb to the crossed
   spine and inserted there as a T-junction (`splitThrough`, §3.4), so the L1 face splits and the lane joins the street
   graph, the junction census, betweenness and R3. NG's "stop half the crossed road's width short, square caps" is the
   renderer's stroke rule, which S9's corridor union and junction wedge produce without model trimming. A cut end that
   meets a dead end or a hole follows §3.6's contact semantics (an antenna end becomes a T-junction; a hole is joined by
   `connectHole`, §3.4). An end that arrives at a wall strip's setback line — a boundary with no spine — stays there, square
   to the line, as a lane ends at a reservation; an end at the intervallum is a T-junction like any other. **Seam portals
   (J-P32).** When the crossed spine bounds the district — an arterial or a boundary secondary — the T-junction's vertex
   lies on a chain two districts share, so S8 records it as a `baseLane` portal, with its `SeamAmendment`, in the shared
   `Seam` record of that boundary run (II.1), which both districts' contracts read. A planned end inside the **portal gap**
   of an existing portal on that spine — max(6 m, 2 × the wider lane's width), a table row — slides along the spine out of
   the gap, toward the side that keeps its arrival within 85–95°; if neither side does, the cut takes its next ladder rung.
   So two districts' lanes never meet at one boundary vertex (the crossroads step 10 forbids) and each portal vertex carries
   exactly one lane. When a re-derivation removes a lane, its end vertex loses its `portal` role (`removeEdges` on its
   `VertexRef`, §3.4) and is dissolved, its portal and amendment leave the `Seam` record, so the spine reads exactly as it
   did before the lane, and the neighbour step's reversal restores the neighbour's kerb (II.1 (3)). This **seam
   exception** is the part of a district's effective scope beyond its own faces (§7.3 item 1), which the locality oracle
   checks (§7.3, II.4).
8. **Transaction and ladder (GEO-23).** Before step 1, on any face with a reflex vertex deeper than the band's plot depth
   (L- and C-shaped faces, faces wrapped round a cul-de-sac antenna), a **reflex pre-cut** splits the face perpendicular to
   the reflex vertex's longer run, and antennae are split off at their roots (FTG's fix for "internal corners"). Then
   `splitFace(F, cut)` as a transaction; reject if either child violates `minEdge`, min angle or the class's minimum block
   width. The **ladder**, each rung under an operation-count work limit: (a) **a turned frame** — re-plan steps 2–7 in the
   working frame turned by 36° (attempt k in the frame turned by k × 36°; ≤ 2 more frames, ≤ 3 in all), drawing afresh
   from `cut.t` for steps 2 and 4 on the stream key's `attempt` component (§5.1 (6)), because a redraw on the same frame
   often fails the same way while a turned frame is a genuinely different cut (provenance
   `ref:NG 1.2.2 rotated-frame retry (code)`, P7; NG 1.2.2 retries like MFCG 12710731, in frames turned by 36° up to ten
   times, after which NG 1.2.2 leaves the face whole and MFCG 12710731 restarts the whole city — ours is bounded and
   restarts nothing, D-9; J-A39.41); (b) the straight cut from A along the **mean normal** — the average direction of the
   start run's inward normal and the far run's outward normal, both as steps 3 and 5 found them in the unturned working
   frame (the start run's inward normal alone when step 5 found no far run); (c) **the always-succeeding cut** — a
   straight cut perpendicular to the longest run through its midpoint, clipped to F's own component by boolean
   intersection (a clipped line cannot make four crossings); when §3.6's contact rule refuses it — its interior passes
   within `attractCm` of a shallow reflex vertex (one the reflex pre-cut left, being no deeper than the band's plot depth)
   or touches an antenna — its foot **slides along the longest run** in steps of 2 · `attractCm`, alternating sides of
   the midpoint (first toward the run's lower (y, x) end), each candidate re-clipped and re-tested under the rung's work
   limit, until the contact rule passes: for k shallow reflex vertices at most 2k candidates fail, since each refuses a
   foot interval of at most 2 · `attractCm`, and a run as long as the band's minimum block width holds hundreds of steps;
   a run too short to hold one passing candidate is a face below the band's block width, which step 1 already types a
   block; the slide draws nothing and is reported as `W_CUT_SLID` with its step count (J-Fredteam-1); (d) substitution —
   F becomes a court, green or landmark block chosen from the district allocation's pending claims (NG's substitution
   rule, K6) — **only for faces ≤ 2 × the band's upper block area**; a larger face reaching (d) is cut by (c) again — that
   slide, never a repeat of a refused cut. No rung restarts anything above F. Every district reports the share of its built
   land left as court or green by substitution (soft bound ≤ 5 %), so MFCG's "empty areas inside city walls" cannot return
   silently. **Bars (F-CUT, M0 (b); §5.2 cites them):** on 10⁵ random concave and holed faces the ladder ends in ≤ 6 kernel
   calls and the face count never decreases; each district reports its substitution residue share, soft bound ≤ 5 %.
9. **Width (COV-NG-N20).** The new way's width, one scalar per lane: `w = w_lo + Δw · min(1, L / L_ref)^p` with
   `Δw = w_hi − w_lo` — `[w_lo, w_hi]` the cut's class's metric width band (alleys 2–3 m, lanes 3–5 m), L its final
   kerb-to-kerb length, `L_ref` the district OBB's major extent (its working major-axis length), and `p` one draw per
   district on `cut.width`, with ln p uniform between ln 0.5 and ln 2 (`p = 0.5 · 4^u`; both powers by `dmath.pow`, §6.5
   (3)) — longer cuts are wider, saturating at the band's top (provenance `ref:NG 1.2.2 width law (code)`, P8,
   re-expressed in metres; J-A40.41). In a walled regime a cut that exceeds the lane length band is typed `secondary`.
   Never narrower than a lower class (O4 c). Template roads take fixed per-district widths (II.2).
10. **Continuation (J-P11).** A cut may **continue across an existing lower-or-equal-class street** when collinear within
   6° (the rare crossroads) — **only inside its own district**, never across a district-boundary edge (GEO-42).
11. **Recurse** on both children with their own sub-streams.

**The deep-interior rule (IMP-8, GEO-25; J-P15).** When recursion stops, S8 writes each block's `Block.depthClass` (§2.5)
with its `interior`: `deep` when the block's local thickness exceeds twice its band's plot depth, else `standard`. For a
`deep` block the district's band row chooses the interior **now, in S8**, by target shares: `court` (a hollow block,
perimeter plots around a shared court — MFCG's donut and NG's hollow block), `back_lane` (a lane spine through the middle,
parallel to the longer frontage), `through_alley` (an alley spine joining two opposite frontages), `rear_plots` (a second
row of plots reached from the frontage through the front row). Default shares — poor: court 0.35, back lane 0.25,
through-alley 0.30, rear plots 0.10; modest: 0.45 / 0.30 / 0.15 / 0.10; prosperous: 0.65 / 0.15 / 0.05 / 0.15; rich:
0.75 / 0.10 / 0 / 0.15 — our own values, calibrated at M-1 on NG's hollow-block frequency in the vertex captures (an output
of NG 1.2.2's no-frontage rule on its block and plot sizes) and MFCG's inner-plot removal in the size-sweep exports; the
rows are keyed by §4.5's band set (a band without a row interpolates, item 27). The lanes and alleys chosen here are
inserted as L1 spines in S8's own district batch (S10 never writes L1, §4.1), so no sibling block is left stale; dense poor
quarters get many narrow alleys and still keep courts, rich quarters keep gardens behind their houses. Its keep-test is
§13.5's court share per class.

**Hidden plots, and how a court or a rear row is reached (item 30; owner: "plots that do not have a direct access to
streets … only accessible via alleys … slums or hidden or clandestine places outside of public view").** A `court` or
`rear_plots` interior is reached from the public way in one of three ways — the block's **reach**, drawn here with the
treatment and recorded beside it (`Block.reach`, §2.5) — and S10 builds what the reach names:
* `open` — an open slot between two front buildings, an alley face (§4.7 S10 (9)) or the L1 spine of a `back_lane` or a
  `through_alley`: the court or rear row is in view from the street. This is the references' every-plot-fronts-a-street
  baseline — MFCG and FTG give every building a street, NG's infill yields open back lanes and courts — and the parity
  presets' only value (item 23);
* `passage` — a **covered way under a front building**: an L3 face of kind `passage` (an alley-as-face, §4.7 S10 (9); §2.5)
  of width `passage.widthM` (2.4 to 3.5 m by band) that S10 cuts along one side line of the front plot the rule picks — the
  plot of widest frontage in the middle third of the run — from the kerb to the court or the rear row; the front plot keeps
  its identity and its footprint ends at the passage's edge, and S11 gives its building a wing that **spans** the passage
  at every storey above the ground (`BaseWing.spans`, §2.6, which a composition inherits: the passage takes the ground
  storey's cells, the storeys above keep the frontage continuous; the plan rung reserves those cells, item 28). A passage
  is chosen only where the front row is continuous — the band's arrangement is `row` (§4.7 S11) — so the arch sits in a
  streetwall; where the buildings stand apart the reach stays `open`;
* `gated` — an opening in a frontage enclosure: the `PlotBound` gate of a compound's wall or a gatehouse arch (§4.7 S11)
  into a **private court** — a rich house's hidden garden court, a guild's or an inn's court — chosen only where the band's
  arrangement is `compound` or `detached`.

The reach weights are band rows — squalid and poor: open 0.25, passage 0.75, gated 0; modest: 0.70 / 0.30 / 0;
comfortable: 0.80 / 0.15 / 0.05; prosperous: 0.60 / 0.05 / 0.35; rich: 0.30 / 0 / 0.70 — interpolated along the prosperity
value, the non-open weights scaled by the density value (× (0.5 + density), so the densest blocks hide the most) and by the
rung (TOWN 0.6, CITY 1.0, METROPOLIS 1.2; the village rung rows are 0, PART III); the draw is the block's interior draw
(`cut.interior`, one pair: treatment, reach). Each band row also states its **hidden-share target** — the district's share
of plots whose exposure is `hidden`, below: squalid 0.20, poor 0.12, modest 0.04, comfortable 0.02, prosperous 0.04, rich
0.08, ± 0.03 — read for a district at its plots' area-weighted mean prosperity value (interpolated between the band rows)
and scaled as the reach weights are, by the rung's factor and by (0.5 + the district's area-weighted mean density value),
capped at one; the base weights are fitted at M-1 on B-CITY so that every rung's districts meet their scaled targets, and
§13.2's bar checks each district against its own (§13.7's row holds the fit's fallback, JT; our own values, calibratable;
0 in the parity presets and at every village rung). The share is made deliberately, never left over: the slum's back
courts and rear tenements behind a passage at the bottom, private gated courts at the top, few in between (J-A30.41).

**Exposure — how a plot's reach is named (item 30 (a)).** When S10 types a plot's access edges it sets `Plot.exposure`
(§2.5) by reading the block's **interior access graph** — its plots, alley faces, passage faces and court residues, with
an edge between two nodes that share an L3 edge, and the public kerbs (the corridor edges of every L1 way, `alley` and
`cul_de_sac` spines included) as the roots — by adjacency and reach depth, never by a sight line (J-A30.42): `street` — an
access edge on the kerb of a `through`, `primary`, `secondary` or `quay` way; `lane` — on a `lane`, `cul_de_sac`, `track`
or `path` kerb (S8's back lanes among them) and none on a street; `alley` — only on an alley face or a `through_alley`
spine's kerb, each open to a public kerb at its ends; `court` — only on a court residue whose own reach to a public kerb is
one `open` step; `hidden` — every access edge lies on a face whose reach to any public kerb passes through a `passage` face
or a `gated` opening, or through two or more interior faces; `sealed` — a hidden plot whose every reach passes a sealed
passage (§2.8, §4.11). The access guarantee is unchanged: every plot, hidden ones included, has ≥ 1 access edge and a chain
of access faces to a public kerb (F-PLOT, §5.2; the chain-reachability bar is §13.2's). Knowledge is a separate fact:
`knownTo` on the plot, building and institution records (§2.5, §2.6) takes §2.5's default and is otherwise a dossier fact;
it moves label visibility and the reader's answers (§9.2), never geometry, and a `local` or `secret` institution prefers
hidden plots through the placement solver's `exposure` row (§4.7 S10b, item 16; a concealed institution's mode and front:
§4.7, item 63). A hidden court's city-band drawing is §8.5's (a court behind buildings, never an empty block). Hidden plots
arise, are sealed and reopen over epochs by §4.11's kinds, and a user seals or opens a passage, hides or reveals a place,
by §7.1's events; villages have no hidden share by default (PART III).

**Holes (the case of NG 1.2.2's hole-aware bisector, C13 — ours).** A cut that would cross a hole is routed to the hole's
boundary (a *slit*, committed by `connectHole`, §3.4), the annulus becomes simply connected, and the same ladder applies
(step 2's holed position law and step 4's halved offset); this is the primitive the stage-2 ring template needs (II.2).
Cuts are inserted as `lane` / `alley` / `secondary` spines, so lanes are real ways in the same graph (NG's look on FTG's
substrate). Junction fillets at street corners are a style-time smoothing (Urban Places' arcs), not a model change.

**Stairs and ramps (item 110 (a), (b)).** Where a way — an S8 lane or any way of an earlier stage — crosses a retaining
wall or a terrace step (§4.7 *Levelling*), its stretch across the step is a ramp or a stair by the way-class crossing rule
(`ways.crossing`, V11 §3.24.5: a ramp while the step over the run available stays within the class's `rampMaxGrade` or a
switchback fits within `minTerraceDepthM`, else a stair where the class has one; a cart class takes a ramp up to 1.5 ×
`rampMaxGrade`, reported `W_STEEP_RAMP`) — never a gap in the wall; a raised way's two ends (§4.3) are ramps or stairs by
the same rule. The way keeps its one chain in the plat; the stair or ramp is an attribute of the segments it occupies,
drawn and exported with them (§8.2, §11.1).

**Partition recipes (COV-MFCG-G03).** The same module exposes `PartitionRecipe` rows built only from the kernel's
`splitFace`, `radialSplit`, `ringBand` and `insetRing` (§3.4): `fan` (k radial cuts from the centroid with alley-width
gaps), `semiFan` (from a boundary vertex) and `ring` (an inset band around a court, split into segments by slit cuts,
short sides first). Park layouts (§4.9) and institution templates (cloister, quadrangle; §4.7 S11) use them.

**An alley that presents itself; back courts across epochs (items 29, 30 and 31).** For item 29's side and rear entrances
an alley "presents itself" exactly when this rule's `back_lane`, `through_alley` or `rear_plots` treatment, or S10's alley
rung and passage choice (§4.7 S10 (9)), gives the plot an access edge beyond its frontage (`Plot.access`, §2.5); the
entrance rules of §2.6 read that edge set and nothing else. Across epochs §4.11's rung 2 makes and unmakes such interiors
on standing plots: `densify … back_court` cuts a yard into rear plots reached by a new passage where the passage choice
above allows one and the plot's manifested band's row (§4.11's floor) carries a rear-plot or hidden share — a
middle-floored plot's yard is infilled instead — and `thin … back_court` clears one — its households re-homed and its
buildings vacated first, as §4.11's rung 2 states — and seals its passage, each a recorded event through this rule's
shares, never a re-cut of the block's interior.

**The staged crime term (item 88; J-A88.41).** When the dossier port fills §10.2's staged crime row (`PortRows.crime`: the
settlement's crime scalar in [0, 1] from the dossier; schema-complete and empty in the base, like §2.7's staged records),
it multiplies each district's hidden-share target above by `1 + crime.hiddenScale × crime` (default 0.5), item 64 (b)'s
basement-access probability (II.7.3's *Basement accesses* (2)) by `1 + crime.accessScale × crime` (default 1.0) and item
65's undercity demand (II.7.5's size law) by `1 + crime.undercityScale × crime` (default 1.0) — its three readers, each
citing this statement; the row empty, every factor is 1 and nothing changes (our own rows, `extension`, 0 in the parity
presets).
=== END ===

=== REPLACE ### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model ===
### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model

**S9 Corridors (L2).** `corridorUnion(l1Faces)` (§3.7), the single kerb function, commits exactly the kerbs S8 cut
against — half-corridor strips, junction wedges and **built blocks**. It runs once per district and once for the
hinterland's faces; a wall strip's L2 is its half-corridor strips along the arterials at its gates (and along the
intervallum, where there is one) and one built block, the strip block (§4.8). S9 writes every way's `slopeP95` (§2.4).
The main plaza is S3's reservation, typed as a `square` face; the other squares come from S7b claims sized from
population (O7) where larger than a block, and from S9b's dispatch below that size (V01 §3.5) — both read the one base
table `squares.quota` (per band: hectares per 1 000 inhabitants and kind factors; §10.2), so the quota is counted once;
gate plazas and forecourts come from S7 (§4.8). Streets exist as geometry from here on; "negative-space streets" is
purely a style, and §8's figure-ground contract fills blocks in a ground tone.

**S10a Block allocation and field pass 2 (eager, town-wide; LC-2, FTG-1).** Each district's `Allocation` (S7b) is
distributed to its blocks in three declared steps, from the district's `alloc.block` stream (keyed from the district's
lineage; §2.5, §6.1), blocks by score then id: (i) the **field-driving classes** — noxious trades, middens, prisons and
institutions below a block — first, by scores that need no prosperity (downstream, downwind, extramural, frontage class,
adjacency); then S10a calls its `S10a.afterDrivers` hooks (§4.12) — V01's S9b, which types each district's blocks (V01
§3.5); (ii) **field pass 2** adds their kernels to pass 1 (§4.5), from which each district's band range is written and any
household S7b allocated outside it re-homed (§4.5 (5)); (iii) every other class — households by band, ordinary
workplaces, shops — by capacity per band under pass 2, sub-districts receiving contiguous block groups sized to their
clusters (COV-FTG-E02). A block whose `content` is `square`, `green` or `yard` has capacity 0 and a `manor` block one
household of the district's top band inside its band range; after (ii) a `manor` block whose district holds no household
of its band range reverts to `ordinary` (F-DISPATCH, reported; V01 §3.5.10's rows). **The web's order (item 105 (f))**
inside (iii): the anchors are fixed before S10a (terrain resources and outside classes at S12a's sites, the markets,
gates and harbour) and (i)'s field-driving classes are placed first, unchanged; then the source-oriented classes by depth
from their resources (a topological order over the class supply graph, §10.2), then the balanced, then the
market-oriented, then the rest; a loop in the class graph (a smith's tools for the mine whose ore feeds the smelter that
feeds the smith) is broken for the order at its lowest-weight link, and **one bounded relaxation pass** (≤ 2, a table
cap) re-scores the two-way classes with the full provider and consumer rasters, moving a class's block only where the
gain exceeds a table threshold and only inside its district's allocation — deterministic on the `alloc.block` stream, no
new concern. **The block score is S10b's rule score at block granularity (item 16):** a class's relation rows, supply
links and soft terms (§10.2, §4.5's contract) are evaluated against the block's context — its frontage classes, the
distance rasters at its centroid, the classes already allocated to it and to the other blocks of the town — so a
brewery's block scores its distance to the blocks that hold its maltings and granary and a tannery's block its
downstream, downwind and extramural rows before any plot exists; hard rows filter blocks, soft rows and supply distances
weight them. The result is persisted as one block-level `Allocation` per block. S10a's end runs the way-surface rule
(V01 §3.7.3; a way's `surface`, §2.4). From here on every district's S10, S10b, S11 and S12b, and the hinterland unit's,
is a pure function of these records and its own sub-stream, writing only inside its own faces (§4.1), so the town's
content does not depend on derivation order, viewer order or worker count. A district whose allocation is empty allocates
nothing and its blocks are plotted as S10 (6)'s vacant or green residue; a district of one block takes its whole
allocation there, what its capacity cannot hold going to S10b's reconcile. A product that reuses S10a (PART III) passes
its own allocation; the steps are the same at every rung.

**S10 Plots (L3) — frontage-first with the granularity law (O5 / O18), per block.**
**(0) Shared-edge bands, eager (J-I9).** A block whose `interior` is `wall_strip` (§4.8) gets no plots. Its L3 content is
built **eagerly on the generation worker, after S10a and before the pool's freeze**, in one step that covers the strip
blocks on both sides of each trace at once — the band's cross edges split the trace, which the two sides' districts share,
so no district overlay may write it (§3.3 pool steps 1 and 3; cost §12.4). The batch commits, by `bandUnion` (§3.7), the
enceinte's half-band on each side of the wall edge; the rest of each strip — the inner setback, or the outer setback and
glacis, or the berm up to a moat — as typed unbuildable residue (`setback`, `glacis`; `ditch` in place of `glacis` on the
town side of an `on_enceinte` bailey whose castle template row asks for a dry ditch, §4.8, and along a moat's dry
stretches, §4.2 S3 (10)); and each side's parts of every
tower and gatehouse on the trace, the stretch profile's graded parts included (§4.8). The same eager batch lays §4.5's
**margin bands** along the settlement perimeter and along any reservation boundary two districts share. The enceinte's
`band` and `glacis` (its `ditch` parts included) and each tower's and gate's `footprint` are the unions of these parts
across the strip blocks (§2.7). S9 has already committed the strip's corridors and nothing after S10 writes L1 or L2, so
no batch ever clears or splits these faces. The step ends by rebuilding the L3 static partitions it touched, so a pooled
plot line finds the band's inner edge through the index (§3.3 pool step 1). A regeneration re-runs this step one-sided for
its own scope (§7.3 item 2). A castle's curtain band is built the same way inside the bailey's blocks. The hinterland
unit's S10 builds §4.9's hinterland recipe — furlongs, outside plots, driveways, trails, woods and edge orchards — instead
of frontage-first plots.

**The class floors (the one home; §3.2 (2), §3.10, §5.2's F-PLOT and F-CORRIDOR and §5.3's class-floor row cite it
without values; DXC-06, KXC-02).** Every plot: `minPlotWidth` 2.5 m and `minInteriorAnglePlot` 12° (FTG's sheared quads, worst-corner p95 22.9°, stay
legal — invariants police validity, not regularity, §5.1 (4)); every way class c:
`minCorridor(c)` = the smallest corridor width `ways.widths` (§4.3) gives c at any rung (a derivation, no new number).
Floors are widths, areas and angles, never `minEdge` (§3.2 (2)).

For every other built block: (1) classify each kerb edge as a frontage by way class; (2) read the block's context
(district kind, prosperity value and recorded band, density, growth stage) → the **granularity table** gives target
frontage-width and depth bands, a join maximum and a vacancy-run share, interpolated along the prosperity value and
scaled by the rung's `RungProfile.granularity` (frontage × and depth × on every band; the rich band's join maximum +
`joinMaxDelta`; §1.1, AM-4) — `GranularityLaw.bands` takes the rung (§14). The band rows are §4.5's band set (item 27);
every re-derivation other than a rung-3 event of §4.11's ladder reads the block's **manifested band** — the field band
raised to its plots' geometry floor by §4.11's block-level reading (item 31; J-A31.43) — for every geometry row, and the
field band for occupancy, condition and labels; the band row also carries the target share of interior and hidden plots
that S8's deep-interior rule and this stage's cut meet together (§4.6, item 30):

| band (default rows; all calibratable, JT (§13.7)) | frontage width (m) | depth (m) | join max | vacancy-run share of frontage | reference anchors |
|---|---|---|---|---|---|
| poor / dense | 4–6 (log-normal, CV 0.25) | 12–20 | 1 | 0.03 | NG 95–99 % attached, party walls 39–43 % of perimeter |
| modest | 6–9 | 18–30 | 2 | 0.06 | FTG quad side median 10.3 m, footprint median 103 m² |
| prosperous | 9–14 | 25–40 | 3 | 0.08 | MFCG ≈ 18.6 plots per block |
| rich | 14–25 (joined) | 30–60 | 5 | 0.05 | "fewer, bigger buildings, bigger yards and courts" (owner) |
| institution / assigned | by requirement class | by requirement | whole block above a share threshold | — | FTG landmark-first |

(The block's `interior` — court, back lane, through-alley or rear plots — was chosen by S8, §4.6.) (3) **Claims first:**
institutions and assignments *smaller than a block* `claimSubFace` (which may span several faces, §3.4) the contiguous
area and frontage class their requirement demands — the requirement is the designation template's size budget (S11, item
19) — before ordinary plots are cut (larger ones are S7b reservations already), and a block's `voidCorner` claim (V01
§3.4.5 (c)) with them; claims-first covers every claim that exists at generation: the roster's institutions and
requirement classes, and every assignment or dossier element present in the recipe when the town is generated (they enter
S2's demand, so a brand-new map holds them from the start; §7.7, item 22 (d)). An assignment or dossier element that
arrives after the city is built is placed by S10b's solver and applied by S11's mutation instead (§7.7). (4) **Per-frontage
regions (GEO-24; J-P13):** the block (minus claims and the S8 interior) is partitioned into one region per frontage run by
its straight skeleton, each region's depth capped by the skeleton height and the band depth — if the skeleton is
downgraded (F-SKELETON), a reflex pre-cut partition (a perpendicular cut from every reflex vertex, built exactly from
`sideRuns` and `splitFace`) is used instead; the validated skeleton arcs enter the arena through `insertChain` (§3.8) — and
plots are laid as strips perpendicular to each region's frontage, widths drawn from the band, depth = min(band depth,
region depth); side lines are bent plot cuts perpendicular to the frontage arriving at the region's rear line (the
creator's stated use of the primitive for buildings, `watabou-extra-a.md` §2.1); strips never leave their region, so reflex
corners, notches round cul-de-sacs and the inside of tight curves cannot produce overlapping or hourglass plots (property
test: §13.2). (5) **Corners and seams:** the corner plot takes the higher-class frontage and the shorter frontage's depth;
the wedge left between two regions becomes a corner plot when it meets the class floors, else a declared `wedge` class
(bounded < 0.5 %) or residue. (6) The residue is typed: `court` (from the S8 interior), `yard` (assigned to the adjacent
plot when its area < 1.5 × the plot), `green`, `vacant`, `shore` (the shore setback). (7) **Joins and splits, one law:**
strips are cut to the band's lower end, then a merge operator joins k adjacent plots (along a frontage, or back to back
keeping a frontage) up to the band's upper end, keeping `members`; poor bands stay at the lower end; both directions read
the same context vector — one code path (O18 g); a `manor` block's residential plots join into one by this law, as the
cluster row's whole-block join. **Orderings (item 31):** a join takes vacant or same-owner neighbours first, then a rear
plot into its front plot, then the frontage neighbour with the shorter frontage; a split takes the widest frontage first,
then the deepest yard. A designation's size budget (S11's template) is what a join is asked for — by this stage at
generation, by S10b's solver for a later placement (a JOIN request) and by S11's mutator when a designation outgrows its
plot; a larger class placed by S10b's class mix asks this law for its join (item 71). Across epochs the law runs in its
incremental form — a due block re-cut with its neighbours fixed, under §4.11's ladder, churn cap and geometry floor (item
31) — and a plot vacated by decline merges into a neighbour's garden or a field by the same operator (`plotToGarden`,
`amalgamate`; §4.11, item 8). (8) **Vacancy runs (COV-VG-VN-170):** runs of frontage totalling the band's vacancy share,
each at least one band frontage long, are left unbuilt from the `plot.vacancy` stream — typed `vacant`, or a `garden` yard
joined to the neighbour — so no built block is necessarily fully ringed. (9) **Alleys:** slivers narrower than
`minPlotWidth` that connect two ways become `alley` L3 faces, not spines (GEO-25); where the frontage is continuous, §4.6's
rule may reserve a covered **passage** under the front plot's building instead of an open alley (item 30; the passage face
is §2.5's). (10) Every plot gets its `ContextVector`, its `DerivationRecord` and access edges (100 %, O5 a). The
frontage-less plots of NG 1.2.2 — about 42 % of its plot leaves, its courts by construction rather than by error — have
no counterpart here outside the deep-interior rule (§4.6; J-P15, J-A42.41). **Party walls** are shared L3 edges carrying
the `party_wall` role in row classes, one edge per wall (§2.2). **Unbuildable bands:** the shore setback (§4.2 S1 (8)),
the wall strips — the band, the inner setback, the outer setback and glacis (MFP-9; step (0)) — and reservations are never
plotted; ribbon plots begin beyond the outer wall strip. **Exact capacity check (FTG-2):** after the last block of a stage,
plots per class × band are compared with the stage quota; a shortfall goes to S10b's reconcile and the report
(F-BUDGET-STAGE).

**Levelling and retaining walls (item 110 (a); file f items 245, 302, 309).** With `terrace.enabled` (a switch, V11
§3.24.1; false in the parity presets), S10 and S11 level the units the district's fabric returns
(`FabricStrategy.levelledUnits`, §14: the blocks, plots and ward it cut) wherever a unit's ground is steeper than
`terrace.slopeMin` — S10 each block and the ward before its plots are cut, S11 each plot from its site plan — every unit
to its own fronting way. A levelled unit is a **platform datum** (`Plot.platformCm`, `Block.platformCm`, §2.5) and never
a write to the `Terrain` raster. Where two units' datums differ by a step: below `terrace.stepMinCm` it stays the base's
plinth (§2.6); between `stepMinCm` and `stepMaxCm` one `RetainingWall` (§2.7; source `generated`) is raised on the units'
shared line, its high side the higher unit; above `stepMaxCm` an intermediate terrace of at least `minTerraceDepthM` and a
second wall; a slope steeper than `stepMaxCm ÷ minTerraceDepthM` is not levelled (the base's skirt and stepped wings, or no
plot, reported). **A step above `stepMaxCm`** takes ⌈step ÷ `stepMaxCm`⌉ − 1 intermediate terraces, each at least
`minTerraceDepthM` deep and each edge a wall of at most `stepMaxCm`, laid inside the two units — the higher unit first, as
far as its depth allows, then the lower; where they do not fit inside the two units, those units are not levelled on that
line (the base's skirt and stepped wings, reported). **Step regions.** An intermediate terrace splits the unit it lies in
along the contour into step regions, each levelled at its own datum (as V07 §3.8a (2) splits a house platform): the
region fronting the unit's way keeps `platformCm`, and each region beyond an intermediate wall is one `platformSteps`
entry — that wall's line and the region's datum, in order away from the fronting way (`Plot.platformSteps`,
`Block.platformSteps`, §2.5) — written by the same levelling (S11 a plot's; S10 a block's or a ward's), in the unit's leaf
digest and re-derived with it. The datums divide the step into ⌈step ÷ `stepMaxCm`⌉ equal parts, so every wall on the
line retains more than `stepMaxCm` ÷ 2 and at most `stepMaxCm`; each intermediate wall is a `RetainingWall` on its line,
its high side the higher region, and a footprint across a step line is split by §2.6's stepped-wing rule. **A
levelled unit's edge against unlevelled ground** — a way corridor it does not front, a square, a green, an under-deck
strip, a field — takes one `RetainingWall` on the unit's side of the line where the step to the unlevelled ground there
exceeds `terrace.stepMinCm`, by the same rule (up to `stepMaxCm` one wall, above it the terraces, else not levelled), and
none below `stepMinCm` (the base's plinth). **A cliff inside a district** — a `SiteFeature` of kind `cliff` (§2.3) or
ground over the `walls.barriers` table's `cliff` threshold (V11 §3.16.1) — is, like a cliff bank, a hard line: no
`RetainingWall` stands on it and no unit is levelled across it; it and its setback band are S8's hole (§4.6), so no lane,
seed or plot crosses it, S10's per-frontage regions ((4)) end `shoreSetback`'s `cliff` distance (§4.2 S1 (8)) short of it
and plots back onto it at that setback from its top and from its foot and none
is cut across it, the band between typed as the shore setback is; so a building's massing stays off the cliff face (V02
§3.18 (f)). Each wall's material, batter, buttresses, parapet and decorative towers are drawn from the `retaining`
rows at the high side's band (V11 §3.24.1) on the levelling stage's own stream, keyed by the levelling unit's lineage; its
step profile is the derived view `stepProfile(wall)`, never stored. **The district-edge source** (V01 §3.17.1 (4)): for
each district D whose fabric declares `terracedEdges` (the bent cut and `TemplateFabric` true, the village's
`village-ways` false) and for which `terraceState(D)` (V01 §2.3) has `asks` and `walls`, S10 raises, before D's plots are
cut, one `RetainingWall` along D's boundary setback line, inside D's faces, on each **backing soft run** — a `field` run,
or a `way` run along which no block of D has a frontage (S9's `Block.frontages`) — across which D's ground within `d̄` of
the run stands at least `terrace.stepMinCm` above the ground on the other side (the unlevelled terrain at the run's
boundary samples; D the high side); it is split where that step stays below `terrace.stepMinCm` over at least `e_lo`, and
pieces shorter than `e_hi` are dropped. Identity: derivation unit the L1 cell whose face the run bounds on D's side, stage
S10, creation index 4 096 + the run's ordinal on that face; D's edge plots back onto it. **No wall on a hard line:** none
stands on a hard run (`wall`, `water`, `cliff`, `marsh`, `frame`, `sky`: the enceinte, the shore, the barrier or the rim
already holds the ground), on a `reserve` run (the reservation levels itself, S11), or along a bank of kind `cliff`, a
closure arc of kind `cliff` or `sheer` (§4.4) or a cliff inside a district (above) — the cliff face holds the ground. **One producer per wall line:** the plot
and block levelling raises no wall along a line a `RetainingWall` already holds (within 0.5 m and parallel within 10°),
and a district's levelling raises walls only inside its own faces. A way crossing a wall is a stair or a ramp (§4.6).
**`levelledGroundCm(doc, key: PlatKey, p: PointCm): Cm`** is the one reader of levelled heights (pure, draw-free): the
datum of the step region of the levelled plot, block or ward holding `p` on the arena `key` (its `platformCm`, or the
`platformSteps` entry beyond whose line `p` lies) — the ground's, or a sky island's (V05 §3.22
(4)) — else the unlevelled raster there (bilinear); before any unit is levelled, and wherever `terrace.enabled` is false,
it equals the raster sampler. Its readers: the buildings' datum step (V02's `deriveBase`); the ways' stair-or-ramp
crossing rule; `stepProfile`; V01's island bridge build after S8 (§4.2 S1 (5)); V04's wall-face knots, arch-vault floors,
foundation obstacles, the span rule, its buried floor under a raised grade and its village working's depth test (V04
§3.2, V04 §3.5.0, V04 §3.5.4, V04 §3.5.5, V04 §3.5.7 (a)); and the sky's surface top, crypt re-test and clearance check (V05 §3.9
(4)–(5), V05 §3.10 (5)). Every **field** reader of the raster (the prosperity field and its daylight term, the islands'
strips, V06's building shade mask) keeps the unlevelled heights, S1's raster with the T2 terrain strokes, before and after
S10 and S11 alike. Lifecycle: generated walls re-derive with their terrain and levelling (a generated wall's state knots
carried by `retaining.settings.stateSnapCm`, §2.7); drawn ones are held (T3 `wall` in its `retaining` kind, or the edge of
a T2 `ground` terrace stroke, §7.1); undo is the log's; a document without them has none (§7.5).

**Deck plots (item 110 (d); file f item 246).** S10's deck-plot cutter offers plots on every built ground-part-0 deck —
a bridge (never a `ford` or a `draw`, and never one with no `deckCm`), a pier, a mole or a quay platform; raised decks
carry none (V02 J-V2.71) — and on no moat deck at a gate (a gate's approach stays clear; realism tiebreaker). The offer
is drawn once per deck by the `deck` row's chance for its kind and rung (V11 §3.24.4; `deck.offer`, 0 in the parity
presets), keyed by the deck's lineage; an offered deck gets frontage plots along its way on the row's sides, within the
row's frontage band, minimum depth, fill share and end clearance, each with `Plot.deck` (its host, kind, surface height —
null for a quay platform on the bank, which is ground — and whether it is a landmark slot). The landmark slots — a mole's
head and midpoint, and on a bridge whose span is at least `deck.landmarks`' `bridgeMid` minimum a mid-span slot — are
drawn by `deck.landmarks`' claimants (a walled port's mole head holds item 106's harbour-mouth chain tower, §4.8). The
deck plots belong to the district V01 §3.17.6 names, whose capacity S7b (1) counts. S10b admits a use on a deck plot only
where its per-use `deckOk` (V11 §3.24.4) holds the deck's kind; S11 builds within the deck budget and passes
`DeckContext`; no cellar stands on a deck over water (§2.6). Removing or ruining the deck ruins what stands on it by least
disruption and tombstones its deck plots; rebuilding it re-offers them.

**S10b Placement (O7; per district; the allocation honoured) — the one placement solver (item 16).** Each block's
allocated classes are placed onto its plots by the **placement solver**, the one solver every path that puts a use on a
plot calls: this stage at generation, the hinterland unit's S10b on its outside plots, every `assign` event (§7.7), a
dossier event and a positive placement (§7.7, items 20 and 22) and the relocation of a use across epochs (§4.11, item 17).
Its inputs are data: the **relation templates**, **supply edges** and **siting profiles** of the class rows and the
neighbourhood kinds (§10.2), the per-assignment overrides of `PlacementCriteria` (§7.7) and the plot's `ContextVector`
(§2.5); a host `ContentProvider`'s `site` replaces it where one is registered (§4.2 S2). The solver's score reads the
siting families and signature pairs as derived `RelationRule`s (item 103; §10.2), a custom kind through its resolved
profile (item 104 (a); §10.2) — its shape unchanged — and every soft term under §4.5's contract. A block with no allocated
class places nothing; a request with no item returns an empty result.
* **Hard rows filter, soft rows score.** A relation row marked `hard` excludes every plot that fails it; the candidates that
  pass are scored `Σ_rows w_r · s_r(plot) + Σ_links w_l · s_l(plot) + Σ_terms`, each soft row's satisfaction `s_r ∈ [0, 1]`
  read from the context vector — a distance row decays by its `falloff` between `withinM` and `beyondM`; a `sameStreet`
  row is 1 on the frontage way of the named class's nearest placed member, 0 otherwise; a `clustered` row rises with the
  number of the class's members within its radius; `band` and `exposure` rows compare the plot's band and `Plot.exposure`
  with the row's values (item 30); an `upstream` or `downstream` row with a `to` finds the nearest member of `to` on the
  plot's own drainage network (the D8 flow graph, §2.3) within `beyondM` along the course and is 1 when the plot lies above
  (`upstream`) or below (`downstream`) it by at least `min` (a share of the network's length, default 0.02), falling with
  the course distance by its `falloff`, and 0.5 when no member lies on that network; an `upwind` or `downwind` row with a
  `to` is the cosine of the plot's angle off the windward or leeward bearing of `Terrain.wind.bearingCdeg` from the nearest
  member within `beyondM` (0 outside ± 45°) times the distance falloff (without a `to`, these rows read the plot's own
  `ContextVector.upwind` and `upstream`) — and each supply link's `s_l` (below). Capacity rows (`plotArea`, `plotShape`,
  `frontageM`) read the template's size budget (S11): a hard capacity row a plot cannot meet is what a JOIN request answers
  (S10 (7)). Candidates are filled in descending score with capacity accounting, ties by plot id; households take
  residential plots of their band ± drift. The default rows are the references' own placement rules — noxious trades
  downstream and extramural (`upstream` high, outside the enceinte), mills and water trades on water, inns and the market
  hall at tier-1 junctions or gates (the market squares themselves are S3's and S7b's, item 24), religious precincts and
  faction turf as attractors, warehouses at the harbour, frontage class and area fit — and the rows the references lack
  (the supply links, the upwind and high-ground rows, a trade clustering on one street, the siting families, coverage and
  the web) are soft rows whose weights the table's `placement.extensionWeight` cell scales (default 1; 0 in the parity
  presets §13.6's side-by-sides run; item 23). True physical needs stay hard rows (a watermill on water, a quay on the
  shore; item 103 (c)).
* **Supply links and distances by mode (items 16 (b), 105, 107).** A link is a supply relation between two placed members
  carrying one good, derived here — each consumer member binds to its **nearest** provider member of that good by the
  edge's mode (several providers split their consumers; no class-wide centre pulls every member) — and never stored:
  recomputed on every placement path (generation, assignment, dossier event, positive placement, relocation, undo
  re-derivation) and by `explain`, so no path leaves a stale link. **Satisfaction** `s_l` is 1 within the good's `comfortM`
  (the goods table, §10.2) and decays linearly to 0 at the edge's `maxDistanceM` (the base's linear decay is the case
  `comfortM` = 0, which the parity presets keep). **A link pulls both ends:** the consumer toward its provider, and the
  provider toward the weighted centre of its bound consumers; which end leads is the class's **orientation** (§10.2:
  `source` placed near its dominant input, `market` near its dominant demand, `balanced` where its input and output routes
  meet — the route graph's junction nearest the weighted balance point, often a gate, a bridgehead, a landing or a
  crossroads; scored, never forced). A producer with several goods has one outgoing pull per good, weighted by the good's
  volume × transport cost (river and sea legs cheaper than carts), and settles nearest its dominant output's consumers; the
  consumers of a shared provider sit within reach of it and so of each other, demand beyond one provider's `perConsumers`
  adding a provider by S2's need propagation, the consumers re-binding to the nearer; a provider serving consumers spread
  over districts is pulled to their weighted centre, never they to it; a hub (several inputs and outputs) is placed by the
  balance of all its links under its orientation. **Distances:** `street` distance comes from the class distance rasters
  (16 m, one linear distance transform per class) as the land distance × the rung's detour factor (a table cell, default
  1.3, calibrated at M1 against the way-graph Dijkstra on B-CITY; *pre-decided fallback:* the factor refitted per rung);
  `river` and `sea` distance is ∞ unless plot and provider both lie within the shore setback of one navigable water body
  (§4.2 S1 (8)), else the distance along that body's bank chain; `road` distance is the `street` distance to the gate
  through which the provider is reached plus the provider's distance beyond it. **Between arenas** — a plot on a sky island
  and a provider or relation target on the ground, or the reverse, or two islands — every mode's distance is the **route**
  through the island's admitted accesses (V05 §3.20 (1)–(2)): the `street` leg on each arena, a transfer allowance per ride
  and the ride's run, as `road` runs through a gate; a `river` or `sea` leg never crosses arenas (∞). Every relation row and
  link whose two ends lie on different arenas reads the route, except the nuisance rows (emits against sensitive-to,
  upwind and downwind), which read the straight distance in three dimensions; upstream and downstream never cross arenas.
  A cross-arena consumer counts toward its provider's two-way pull at the foot of the access its route used (a ground
  consumer of an island provider at that access's top); `comfortM`'s plateau reads the route length (V05 §3.20 (9)–(12)).
  A gate provides the `import` resources its bearing's trade row lists and the harbour those that arrive by sea, so
  warehouses and inns fall to the harbour and the gates by the same rows. Inside the pooled S10b a provider is **a block
  whose S10a allocation holds a producing class**, a hinterland land-use face of a good's `site.landUse` built like S10a's
  (V11 §3.7.1), or a placed plot of this district; a class on an island stands at its island's land centroid for the
  ground's reads (eager and town-wide, so the laziness contract of §4.1 holds); a post-build request measures to the placed
  plots themselves over the L1 way graph (one multi-source Dijkstra per provider class; budget §12.6). A hard supply edge
  with no provider inside `maxDistanceM` fails the plot; S2 has already demanded the producer (§4.2 S2), so the failure is
  a siting shortfall, never a missing class.
* **Spread and pull (items 103 (f), 107).** Each class's **balance profile** (§10.2, defaulted from its clientele) weighs
  its spread against its pull: everyday services (apothecary, baker, tavern, chapel, barber, bathhouse) strong coverage and
  weak supply, so they spread toward districts lacking one; town-wide specialists (goldsmith, bookbinder, luxury trades)
  neither dominant, free to share a street near a market (the clustering crafts), no coverage target; heavy processors
  (mill, tannery, smelter, brewery, dyer) strong supply and physical needs, no coverage; wholesale and storage at the gates
  and quays. **Coverage** (item 103 (f)): a class with a coverage row (a catchment unit — a district, a neighbourhood, a
  walking radius, or N households — and a soft target per unit) is pulled toward units it does not yet serve and away from
  over-served ones, added to the pools with the other terms, never a quota; with a dossier its members' count is the
  dossier's and coverage decides only where they go (unserved districts first, then by demand). **Same-kind spacing**
  (item 107 (d)): a spreading class carries a soft `far` row to its own class inside a district (a table radius per class),
  off for the clustering crafts. An island counts for coverage as V05 §3.5 (3) states (its k districts, one walking-radius
  unit, or its household units).
* **Water in dry country (item 111 (b)).** The well and public-fountain classes score an extra term on the plot's well
  yield (`SiteResources`, §4.2 S1 (10)) with the climate row's weight, and their walking-coverage radius (V11's
  water-supply family) is multiplied by the climate row's coverage factor (below 1 in arid rows), so a dry town's wells sit
  on its best ground and closer together.
* **Custom chains (item 104 (b), (h); item 105 (i)).** Each **active** reviewed chain of the dossier (SettlementForge's
  activation rule: all its nodes present; §7.7) — custom, and the dossier's `activeChains[]` — becomes links between the
  placed members that are its producer, processor and consumer nodes, weighted by the volume moved (`economicWeight` when
  visible, else moderate) and the good's nature (perishable goods keep their links short; bulky goods favour water and
  main roads; small valuable goods tolerate distance but seek security); an `impaired` or `vulnerable` chain's links weaken
  by the status table (§10.2). It is placed as one connected thing, in the web's order (upstream first, so a downstream node
  sees its suppliers' sites): a **resource** node on the terrain feature its kind implies (water → a river or the coast,
  land → fields or pasture in the hinterland, subterranean → a mine or quarry at the hinterland edge, special → its own
  deposit site by the resource rows), created as a map feature by S12a when the settlement has none, sized by the chain's
  volume; its first processor by the resource or on the road between it and the town (extramural or at the edge where its
  profile emits a nuisance); each later processor a step further in; the final seller on a street feeding a market or
  inside its consumers' catchment; its consumers pull its final node and it pulls them. A chain whose in-town nodes are
  compatible (no node emits what another cannot bear) sits close at street scale — its links within their `comfortM` — and
  is named a working quarter only past item 72's quarter-identity threshold or by a declaration (§4.5 (4)); an
  incompatible chain stretches along its road, the noxious steps at the edge, the clean steps in town, still in flow
  order. A custom node that requires or supplies a catalogue node is pulled by it the same way. A service `providedBy` an
  institution sits inside it (a sub-location) or on an adjoining plot; an institution that subsumes others takes over their
  site needs (one larger compound where they would have stood), never a second site. An import feeds its first consumer
  through a store (a warehouse, a yard) at the gate or quay facing its partner's bearing (the realm block's, items 77, 85),
  else the main gate or the harbour; an export leaves from its last node the same way; an `entrepot` chain's ends are these
  pulls. A chain with nodes on an island and on the ground is measured by the route and reads as stretched through its
  landing, close at street scale only on the ground. An inactive chain pulls nothing; its nodes keep their sites and may
  drift over epochs (item 17); a chain that activates places its new nodes against the existing ones by least disruption,
  upstream first. A chain never forces a hard row and never moves a dossier-declared, author-declared or pinned place.
* **Split sites — a works and a shop (item 105 (h)).** A class whose row declares `split` (default rows: the butcher —
  slaughterhouse and stall; the brewer — brewhouse and taphouse; the potter — kiln yard and shop) may, where its nuisance
  pushes out and its dominant perishable or retail output pulls in beyond the table threshold, be placed as ONE item on TWO
  plots: the works by its nuisance and input rows, the shop by its output and clientele rows. One institution, one dossier
  binding, two buildings: the shop's building carries a `Use` whose `branchOf` names the works' use (§2.7). A state, closure
  or removal of the institution reaches both (item 14's spread); relocation moves each by its own rows; undo restores both;
  the author may merge them back onto one plot (a map-side declaration, item 104 (a) (1)); an absent `branchOf` is no split
  (§7.5). An `assign` whose use carries `branchOf` naming a standing works' use is a **declared split** at any rung, held as
  a declaration and removed by its inverse; a standing pair is never merged by a rung change (V07 §3.12). Generated splits
  follow the threshold at every rung, their one off switch `siting.web.splitEnabled` (V11 §3.7.4; false in the parity
  presets); every split is reported. A split class's shop may stand on an island while its works stays on the ground.
* **Live-in (MFP-7):** craft and shop rows default to `liveIn`; a live-in household is sited first at its workplace and
  recorded as the building's `dwelling`, so the arterial frontages are shop-houses, not workplace strips, and
  residential-only blocks stay the exception (its block-level acceptance is §13.5's). **Outside classes, and under §4.9's
  `fill` farm mode the farm households,** are placed by the hinterland unit's own S10b (under `perimeter` and `rivers` the
  farm households are town households, placed by their districts' S10b) — the same solver over the outside plots its S10
  built at S12a's sites, whose seeding scores are the outside classes' relation rows (§4.9; FTG-7). A `manor` block's
  class draw is restricted to `compound` classes (V01 §3.5.10).
* **Requests after the city is built** — an assignment, a dossier element, a positive placement, a relocation — take the
  **least-disruption order**: vacant plots and vacancy runs first, then under-used plots (a yard part or an outbuilding the
  template can take), then plots whose present use can move within the same district (the displaced use re-placed by this
  solver with one further level of displacement at most — §7.7's `DisruptionBudgetRow.displacementDepth`, default 1 —
  never a cascade), then a JOIN with a neighbour by S10 (7)'s orderings. A rejected site (§7.7's rejection record, item 20)
  is excluded while its rejection holds, a locked plot always, and a pinned assignment's plot is fixed (§7.7's precedence).
  Among the candidates that pass the hard rows the order is lexicographic — disruption cost (§7.7's
  `DisruptionBudgetRow.weights` for the request's kind: per displaced use, per join, per subtracted part and per vacated
  plot), then score descending, then plot id — so the town changes as little as the rules allow. Every displacement, join
  and vacated plot is a lifecycle event of the causing edit (§2.8, §7.4), and the placed plot's buildings then mutate to
  the designation by S11's operator (item 18). **A returning dossier element (item 80)** — a `dossier` request for an
  element whose assignment returns to `active` (§7.7) — ranks first the plot of its former building (the building whose
  `formerUses` names its use), so a reopened institution reopens where it stood, repaired by §4.11's Works when the change
  is dated. A new custom revision (a changed content hash) re-resolves the profile and re-sites the use by this order,
  the report saying why (item 104 (e)).
* **Concealed institutions (item 63).** A concealed institution is placed as one item with its front by this section's
  *Concealed institutions* paragraph.
* **Reconcile and infeasibility (O18 f).** At generation a bounded **plan–fit–reconcile** loop (≤ 3 rounds) adjusts *inside
  the district's allocation* where a class finds no plot (one more JOIN; a class demoted within its band; surplus capacity
  typed as yards, greens or vacant plots); it never reaches into another district — moving demand between districts
  happens only in S7b's reconcile and in S10a's band-range re-homing (§4.5 (5); J-A72.50) — and what it cannot place goes to
  F-SITING's ladder (§5.2), whose rungs this stage computes as: the reconcile above; then every **soft** row's weight set to
  0 for the item; then the manifest reduced, lowest-priority classes first and never a dossier-backed item (item 20) — the
  report naming, for every unplaced item, the hard rows that blocked it and its **closest options** (the plots in order of
  the number of hard rows they fail, then score descending, then plot id — each with the rows it fails; J-A20.42). A custom
  kind always resolves a profile and always finds a site, an unplaceable preference reported with its closest options (item
  104 (d)). **A hard row is never relaxed silently:** a post-build assignment, or the re-placement a `rejectSite` causes, that no plot satisfies
  returns the same closest options as an F-EDIT action (§5.2) — choose one, relax a named row for this item, or withdraw — except a
  `dossier` request, which places at its first closest option with the hard rows it fails reported (§7.7's precedence,
  J-A20.71) — a plot holding a dossier-backed use is never a closest option for another dossier element; **when the map
  has no seat for a dossier element** (every plot of the current map fails it after the
  displacement at depth 1 and a JOIN, as when a DM adds a few dozen custom institutions to a THORP or HAMLET dossier or a
  hamlet lists more institutions than plots), the element takes a new outside plot the hinterland unit's S10 cuts (§4.9)
  from the hinterland face nearest its affinity district along the busiest arterial leaving the settlement perimeter — the
  edge-belt placement of V06 §3.6 (2) (iii)'s overflow ladder — at its class's plot area, its building by S11's template,
  reported (S10b's warning `W_DOSSIER_EDGE`, §5.4): the hinterland always has ground, so this last rung never fails and no dossier element is ever
  left unplaced (§7.7 item 2); a later epoch's siting may move it inward by the least-disruption order; a user's positive placement that no plot satisfies is bent to the site ranked first, and one over its budget
  to the closest acceptable site within it, as §7.1 states (item 101 R2) — so placement never gives up silently (O18 f; FTG
  V1 "would regularly give up").
* **Placement order and the explanation (items 101 (d), 102 (d), 103 (e), 105 (j), 107).** S10b records, for every item it
  places, its `PlacementOrder` on the derivation record of the plot it stands on (§2.8; V10 §2.13) — `seq` the event whose
  run placed it (0 at generation), `k` its index in the run's order (claims first, then the web's anchors), `pass` 2 when
  the relaxation pass moved it — so `explain`'s `asPlaced` reading scores against the members placed before it (a declared
  one-time shift of the records digest at the milestone that lands it; an older document answers `asNow` with
  `exact: false`, V10 §2.14). `explain` decomposes the same score read-only over the committed model — no stream advanced,
  nothing written; its score at a placed item's plot equals the score `place()` computed there on an untouched town:
  every hard row with its verdict; every soft term as a signed contribution grouped by family (the relation rows, item
  103's families, coverage and signature pairs, item 105's links, item 107's balance, item 102's sunlit preference, the
  field, the character, the district allocation); the controlled chance term recomputed from its stream key, which
  advances nothing (§6.1); the top-k candidate plots of the scope by the same score; and the item's links as `place()` binds
  them. The rasters it needs are built lazily for the classes its rows name when not resident (budget V10 §6.1). The author
  may pin, move or cut a link, stored map-side (item 104 (a) (1)), never written to the dossier.
* *Mechanism (budget: §12.4):* context-vector distances come from per-feature-class distance rasters (16 m; one linear
  distance transform per class) computed once per model, and the provider rasters of the producing classes from S10a's
  block allocation the same way; S10b is a top-k over candidates pre-filtered by district affinity and requirement class,
  with incremental capacity. Both entry points exist, read from `recipe.entryMode` (§2.9): content-first (default) and
  layout-first (thumbnails, then populate). People are derived lazily from the household's key and pinned only by an
  explicit edit (§10.3).

```ts
interface PlacementItem { cls: BuildingClass /* roster class id */; band?: string; designation?: Designation /* S11 */; count?: number /* generation: the block's allocation row */;
  id?: Id /* a Use, an assignment member or a dossier element being placed or re-placed */; criteria?: PlacementCriteria /* §7.7's per-assignment overrides of the class's relation rows */;
  pinnedTo?: Id /* a positive placement (§7.7, item 20 (g)) */ }
interface PlacementRequest { kind: 'generation'|'assignment'|'dossier'|'positive'|'relocation'; items: PlacementItem[]; scope: Scope /* the blocks or district the solver may use (§14) */;
  fixed: Id[] /* placed members kept (§7.7) */; exclude: Id[] /* locked entities */; rejected: Id[] /* plots under a live rejection (§7.7) */ }
interface PlacementResult { placed: { item: number; plot: Id; score: number; joined?: Id[]; displaced?: { use: Id; to: Id | null }[] }[];
  unplaced: { item: number; blockedBy: string[] /* relation-row and supply-edge keys */; closest: { plot: Id; fails: string[]; score: number }[] /* the closest options in S10b's order: fewest hard rows failed, then score, then plot id */ }[] }
interface PlacementSolver { place(req: PlacementRequest, ctx: StageContext, k: Kernel): KernelResult<PlacementResult>;
  explain(req: ExplainRequest, ctx: StageContext): Explanation /* read-only (above); ExplainRequest and Explanation as V10 §2.13 declares them */ }
// one implementation, registered by name (§4.12, §14); its draws are the `siting` concern (§6.1)
```

**S11 Site plans and footprints (L4; O17; one batch per block) — the designation template and the designation mutator.**
One rule evaluation per plot, no search: the **designation template** — one per roster class (§10.2's `template` rows;
item 19), keyed by band with its continuous columns interpolated along the plot's prosperity value and its discrete
columns read by §4.5's discrete-cell rule (a band without a row reads the nearest rowed band below) — gives the size budget (plot area, footprint area, floors), the structures (the
slot list: main building, workshop, forge, yard, court, stables, store, journeymen's rooms … by role and count), the
arrangement, coverage, setbacks, separation (party wall / slot / passage), the front-line jitter (item 43, below), the
frontage treatment of the main slot (none, lean-to stall, stall, shopfront, arcaded front, gate, wall), the yard
partition, the **boundary treatments**, the `composition` row key and the heights row (§10.2), and the
**specialisation** — the designation's variant in this band, with its room programme (item 28, §2.6): a farrier or
nail-maker in a lean-to forge, a general smithy with a yard, and a master armourer or cutler with a storefront, a court
and journeymen's rooms are three rows of one smith template (our own rows). Density is a modifier column on coverage and
separation. Geometry columns read the plot's manifested band (§4.11's plot-level read); the specialisation and the
programme read the field band, so a poor smith in a once-rich shell is a poor smith in a big house (item 31). **The
culture specialisation (item 110 (c)):** before the composition resolves, S11 draws the use's culture specialisation
(V11 §3.24.3) once — on `siteplan` keyed by (the use's lineage, `'spec'`), against the row's `chance`, under the cap
`max(capMin, ⌊capShare × S2's building count⌋)` counted in roster sequence order; a user-set, declared or keyword
specialisation is exempt from the chance and the cap, is not counted toward the cap, and is never overwritten (item 101
R13) — and the chosen row's `composition` and
`heights` replace the band template's; `Use.specialisation` holds it once set (§2.7). **Every path that creates or changes
a building reads this one table** — this stage at generation, the mutator below on every designation change, S10b's
relocation (§4.11) and every assignment (§7.7), whose drift bounds bound the mutator's adapt and add steps relative to the
template. Two smiths a few streets apart differ by degree along the value, never by switch; the default rows reproduce
the references' banding — FTG's lifestyle-banded building pools and MFCG's ward-type sizes and spacing (§4.5's band set,
item 27) — and the interpolation between rows is our extension. J-A19.41 holds within a class; the class itself is S10b's
class-mix draw (item 71). A front's building reads the front's template; its concealed function adds only concealed
rooms, a concealed door and a link down (item 63, below). **Materials are not template columns** — the material rule,
texture and colour only, is §2.6's (J-A19.42). The arrangement rows the template chooses among:

| arrangement | geometry | boundary treatment (default rows) | where |
|---|---|---|---|
| row | one or more footprints end to end along the frontage; **footprint = plot ∩ the frontage band of the row depth** (a boolean intersection, GEO-26; J-P14), the band set back by the plot's front-line jitter `h` (below), so every party wall is the plot side line and, the block being one L4 batch, one shared edge even on bent or curved frontages; stored as one `quad` wing with its four corners recorded (`BaseWing.corners`; stepped quads on a slope, each with its own; J-P31, J-P39) and handed to `outline()` as fixed input (§2.6); depth from the coverage; rear yard | frontage none (the house is the frontage); rear wall (dense) or fence | dense and poor bands, shops, workshops (NG 95–99 % attached; FTG's warehouse rows) |
| set-back compound | hall or house set back behind a forecourt; **2–5 disjoint outbuildings** (stables, workshop, chapel, barn, brewhouse) placed by a small greedy packer on the plot's OBB grid around a court — except a structure whose composition role key is attach-main (V02 §3.10.4: a mill's wheel or sails, a church's tower and porch, a court institution's ranges), which takes no slot of its own and is handed to the main slot's `outline()` with its drawn count (`BuildingInput.attached`), whose massing lays it as part of the main building (V02 §3.5 M8b) | **enclosure wall** (rich, prosperous; ours — NG 1.2.2 draws no enclosure — an `extension` the parity presets set to the fence, §7.6; J-A44.41) or fence, with a **gate on the access edge** | manors, inns, temples, guildhalls, farmsteads (FTG's farmstead with a driveway) |
| detached | one OBB-aligned footprint at the frontage with side yards and a path to the access edge | frontage fence, railing (rich) or hedge, with a gate; side hedges | prosperous / semi-rural bands, sparingly (R4/R5) |
| hovel | one small footprint on the frontage of a plot that is mostly bare yard | none or a hedge | squalid bands, outskirts |
| tents | 1–3 small round or rectangular footprints (6–15 m², class `tent`, roof `tent`) with a fire-pit pin, dirt surface | none | squalid and shanty districts after the first half of the stages (COV-FTG-E07) — FTG's row, which the parity presets keep; how the default preset shares these districts with the cluster row is item 70's (below) |
| cluster | many small structures — shacks, tents or lean-to shelters by the cluster rows (§10.2) — packed across the plot, not in frontage rows, each with its own door on a footpath web of the plot's yard that reaches one of its access edges (item 70, below) | none | informal plots of the lowest bands with no standing building, where item 70 admits them |
| institution | the claim's own template (§2.6 footprint templates, the axis-locked composer, the `ring` partition recipe for a cloister) | wall with a gatehouse gap; churchyard wall | claims |
| vacant run | no footprint | wall (dense bands) or fence | vacancy runs (S10 (8)) |

Treatments are stored as §2.5's `PlotBound` records on the plot edges; they are drawn at district LOD as a stroke distinct
from buildings (§8.2's treatment row), **walled or fenced frontage counts toward O17 (d)'s streetwall continuity**, and
walls and fences export to VTT and GeoJSON (VIS-8).

**Front-line jitter — an area-scaled recession (item 43).** Each plot's main slot may stand back from its frontage by a
recession `h`, evaluated once per plot and stored, rounded to the centimetre, as `SitePlan.frontJitterCm` (§2.5):
`h = u · min(√(plot area) / 3, jitter.maxM)`, `u` uniform in [0, 1) — one draw of the plot's `siteplan` stream (§6.1; no
new concern) — and `h` kept only when `h ≥ jitter.minM`, else 0. The law's shape — area-scaled, uniform, floored — is the
emulated default (provenance `ref:MFCG 12710731 front recession (code)`, P9); its construction and values are ours. Under
the default values the area term binds only on plots under ≈ 20 m², so the default recession is in effect uniform up to
the band's maximum. *Construction:* `h` is taken square to the frontage, on the frontage band's normal — a row footprint
is `plot ∩` the frontage band between the offsets `h` and `h +` the row depth, and a detached, hovel or compound main
slot's front stands `h` behind the template's setback (the plot face inset by its per-edge setbacks with `offsetFace`,
§3.4, §3.7) — so the front stays parallel to a bent or curved frontage, every
party wall stays the plot side line (J-P14) and the strip in front of the recession is the plot's `forecourt` yard part
(§2.5). Where the plot's depth cannot hold `h` in front of a footprint that meets the class floors (S10), `h` falls to the
largest value that can, and to 0 when that is below `jitter.minM`. *Values:* `jitter.maxM` and `jitter.minM` are
designation-template columns (§10.2), `jitter.maxM` interpolated along the prosperity value like coverage — defaults ours
(`own`): `jitter.maxM` 0.4 m (poor / dense), 0.7 m (modest), 1.0 m (prosperous), 1.5 m (rich); `jitter.minM` 0.3 m for all
bands — each band cell marked `extension: { over: 'MFCG', mode: 'option' }` over the emulated law, whose values the `MFCG`
parity preset reads through §7.6's per-preset values: `jitter.maxM` 4.8 m and `jitter.minM` 2 m (J-A43.41). The
institution, tents and cluster rows carry `jitter.maxM` 0, unmarked, so no preset changes it and their plots draw no
recession; any row whose `jitter.maxM` lies below its `jitter.minM` draws none. *Floor:* a front nearer its frontage than
`attractCm` (§2.2's `LatticeSpec`; its meaning §3.2 (2)) would be shared with the frontage by §3.6's stretch attraction and the recession would collapse
to 0, so `jitter.minM` is bounded below by `attractCm` + 1 cm — the column's declared range (§7.6), against which an
`editTable` or `editPreset` setting it lower is refused, naming the bound (F-EDIT, §5.2) — and the recessions drawn are
{0} ∪ [`jitter.minM`, `jitter.maxM`] (J-A43.42). *Changes:* a kept main slot keeps its stored recession through a
designation change; an added main slot evaluates `h` at the target template's columns with its draw from the mutation's
`siteplan.mutate` stream, as every added part does (the mutator's step 2); Regenerate (keep settings) re-evaluates the same
draw, so it reproduces the same fronts. The bars: §13.2 (item 43).

**Footprints and heights.** The row arrangement's footprints are made here by the boolean above and passed to
`BuildingGenerator.outline()` as fixed `quad` wings, which it returns with heights and roofs and never re-fits (§2.6); every
other arrangement's footprints come from the registered generator's `outline()` — with stage 3, V02's massing (V02 §3.5),
whose `baseOutline`, template and `axisLocked` families are the base builder's — rectangles and L / T compositions as
`rect` wings with per-wing ridge axes (VIS-10), footprint templates and the axis-locked composer for institutions
(COV-FTG-F16, COV-MFCG-G05), the base outline builder's stepped and deck constructions from M3a (§2.6; item 229) — each
shaped inside its slot's working hint (`SlotPlan.hint`, §2.5, which S11 never stores). The cluster packer hands each
structure to `outline()` as one fixed wing. S11 passes in `BuildingInput` (§2.6) the slot's composition row key — for a dwelling other than the manor capped by the
rung's grandeur ceiling (S10b's class mix (3): the row's `dwellingFamilies`, `towers`, `turrets`, `gatehouse` and `courts`,
which V02's composition chain reads; item 115 (a), (b)) — the plot's
field and manifested bands, its layer (`underground` for II.7.3's sewer-front plots, II.7.5's undercity and item 109 (j)
(4)'s cavern and ruin dwellings), the attached structures and, on a deck plot, its `DeckContext`. S11's yard partition
types every hole of a footprint face as a yard part of kind `court` (from M3a, with item 229; a hole of a base footprint
template such as the ring cloister is retyped `court` once at M3a, a declared shift, §13.3). When the block's batch has
committed, S11 carries every wing onto the committed face by §2.6's wing-carrying rule — the first carry (J-P42), after
which every committed batch carries (§4.1). **Scale (COV-FTG-F09):** footprint targets are multiplied by the district's
`buildingScale` (0.5–2, continuous; FTG's "smaller / bigger" as a district edit or an `Adjust` regeneration). **Heights**
from the class tables on every wing (floors × storey height + roof rise by pitch; eave and ridge per wing; tower heights
for keeps and church towers), with the **ground datum** `baseCm` by §2.6's `deriveBase` (FTG-13; J-P19) through
`levelledGroundCm` — carried although the top-down view never shows them. **Entrances** are §2.6's set (the main entrance
facing the plot's frontage access edge, item 29), re-derived whenever the designation mutates; roof kind by class per
wing (the style sheet chooses the construction, §8.2); **materials** from `MaterialRow` (COV-FTG-F20; §2.6);
**description, opening hours and sub-locations** from the class table and the naming engine (COV-FTG-F21, FTG-11); yards
partitioned into typed parts.

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
   grid by the compound packer from the plot's `siteplan.mutate` stream (§6.1: a geometry concern keyed by the plot's
   lineage, so the same change from the same state draws the same numbers on every host, and a New random of the plot
   changes nothing past); added parts are minted from the causing event's `seq` and ordinal (§6.3), kept parts keep their
   addresses, subtracted parts become tombstones with the event's `seq` (§2.8). The old house stays recognisable inside
   the new workshop.
3. **Land.** When the target's size budget exceeds the plot, the mutator asks S10b's solver for a JOIN with a neighbour by
   S10 (7)'s orderings, the neighbour's use relocated by the same solver; when no join is allowed — a locked neighbour, a
   hard row — the template's `underSize` column decides: the compact rows, or a refusal reported with the blocking rule.
4. **Protection.** A locked part or path is never subtracted, converted or adapted (fate *kept*, §7.3 item 4); a
   user-edited attribute is kept (implicitly pinned, §7.2); an added part that would overlap a kept part is placed
   elsewhere on the plot or reported; the entrance set and the basement decision are re-derived by §2.6's rules on the
   result (item 29), and the plan rung's elaboration cache is marked stale (item 28).
5. **Record and reversal.** The steps are one `MutationRecord`, persisted in the causing event beside its fates (§7.1,
   §7.4) and cited by the plot's lifecycle event; the event's undo record keeps the former parts. Reversing the change — a
   designation set back, an `unassign`, an `undo` — applies the **inverse** of the recorded steps when the plot's design is
   still the record's result (its leaf digest, §6.2), restoring the earlier design exactly; otherwise a fresh forward
   mutation toward the earlier template runs and is reported as such.
6. **Timing.** A host or user change decides and records the whole mutation at once; across epochs the evolution engine
   spreads the same steps — occupy if compatible, then adapt, then extend, and rebuild only what cannot be adapted — as
   recorded events (§4.11, item 18 (c)). How a recorded step is shown on the ground over the weeks it takes is §4.11's
   Works (item 67), which reads the steps and never re-decides them (J-A67.49).
7. **One path.** Generation is the mutation from the empty design: every structure an add, every draw from the plot's
   `siteplan` stream, so this stage's own batch and a later mutation are one code path (`@plat/plots`, §14); Regenerate
   (keep settings) and New random remain re-derivations (§7.1), and `rebuild` (§4.11) the whole replacement that a ruin or
   a redevelopment calls for (item 31's rung 3), never a designation change.

```ts
type Designation = { cls: BuildingClass; use: BuildingClass /* the roster class id */; specialisation?: string /* the template's discrete row; absent: by band */; assignment?: Id }
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
district in an unused plot by a deck draw, campfires in squalid districts; **market stalls**, drawn as small tents, line
each market square's edge band and ring its market hall, by rank: the principal one per ≈ 150 m² of square (≤ 40), a
secondary one per ≈ 200 m² (≤ 20); a flanking principal market takes the main plaza's centrepiece rule and a secondary
market a centrepiece with probability 0.5 (our own rows, calibratable). Each `square` block of V01's dispatch takes its
centrepiece by its `SquareRow`, with no stalls on a `trading` square (stalls stay on market reservations, item 24), and a
church or temple below a block that has no §4.8 forecourt takes a `forecourt` yard part (V01 §3.5.3, V01 §3.5.10). A well or
pump the decoration rows place sits on the unused plot of highest well yield (§4.2 S1 (10); item 111 (b)). At the rungs
whose `RungProfile.frameLaw` is `territory` this step places nothing — no centrepiece, gate-plaza pin, decoration row,
singleton, campfire or market stall — nor the pins by rank below: the village product's pin stage places the whole
furniture (V07 §3.6 (5), V07 §3.10), and a `@pin:<kind>` record binds to its pins; the light rows below still run. What each
band draws — footprints, yards, treatments, pins, and the plot outline as an optional cadastral layer — is §8.5's.

**Markets and hidden plots in this stage (items 24 and 30; the rules are §4.2 S3 (12)'s, §4.5 S7b (3)'s and §4.6's).**
Every market square — the plaza when it carries the principal rank, a flanking principal market, each secondary claim —
takes the pins above by its rank; the market hall's `nearMarket` row (§10.2) binds it to the principal market by default.
A passage the block's reach names (§4.6) is cut by S10 (9) as its `passage` face, and S11 gives the front building the wing
that spans it; a hidden plot's main entrance faces its access face — the court or the passage — as §2.6's entrance rules
put a set-back building's on the court that leads from its gate (item 29), so every plan roots at a door that opens onto
the way its plot is reached by.

**Vacant plots under decline (AM-8).** A plot whose last building is cleared or reused merges into a garden, orchard or
field by `plotToGarden`, or into its occupied neighbour by `amalgamate` (§4.11's ladders), through the merge operator of
S10 (7) with the neighbour's band; the band's vacancy-run share of S10 (8) is the design's deliberate vacancy: regrowth
never fills a run below its share, and decline's vacancies are counted apart from it.

**Households per building (item 28 (f); J-A28.46).** S10b places a residential plot's households — per residential slot (a
structure with `houses`, §10.2) of the plot's designation template row at least one household and at most the row's
`households.built`, by band ± drift, a plot's slots filled in its slot list's order, required slots first (the capacity
itself cannot be read there, because the building and its wings do not exist before S11). A residential slot the demand
cannot fill is dropped from the plot's site plan, its ground typed as yard, never below its structure's least `count` where
the structure is `required`; a residential plot whose required residential slots the demand cannot all fill is typed
vacant by S10b's reconcile, its households placed on the next candidate — surplus capacity, never an empty residential
building. A residential slot on a workplace's or an institution's plot that is its main slot (a live-in class's among
them) or within a `required` structure's least `count`, and that no household of its band or drift can fill, is neither
dropped nor typed vacant — the workplace or institution and its use stand — and S11 builds it as a slot without `houses`,
housing none, `Building.dwelling` absent, reported; its `BuildingSlot.unhoused` (§2.5) records that typing, written by
every run of this fill and cleared by the designation mutator. S11, which creates each building and its wings, writes each
residential building's `Building.households` (a building S11 builds for a slot with `houses`; every other building's list
is empty) from its slot's households in address order, clamped into [1, capacity], a locked or pinned household kept
before the clamp drops any (§7.2) — §2.6's one capacity function, which item 31's `relet` (§4.11) and F-PLAN's
never-omit rule (§5.2) read, evaluated on the wings it has just made. **The overflow pass:** a household the clamp leaves,
or whose slot S11 builds no residential building for, moves by §10.3's relocation (its address and its people's keys
kept): after the district's last S11 block batch, still inside the district's derivation (a pseudo-district's alike), the
overflow households are re-placed in address order by S10b's solver over the district's residential buildings that house
fewer households than their capacity — the household's band first, then the bands its drift admits; score descending,
then building address — each move reported; a household no building of the district has room for is an unplaced item of
F-SITING (§5.2), reported with the capacities that refused it — except a household that fills the dossier's population
(§7.7 item 2), which is never taken off the manifest: its housing is re-provided inside its district (item 20 (e);
J-A20.72) by S10b's `dossier` request in the least-disruption order, its first closest option where no plot passes the hard
rows (J-A20.42), and S11's operator builds there a residential slot of that plot's designation template for it, within
that building's capacity, in the same derivation or causing event — each such build and displacement reported, a hand
edit's among its dry-run fates (§7.3 item 4). So the solver and the plan agree on how many households a shell holds and no
shell houses more than its capacity; the plan rung records the count among its inputs (§4.1). The overflow pass runs
inside every change §2.6's capacity rule lists — S11's operator building or changing a residential shell (an epoch's new
faces, a rung-3 re-cut, a designation mutation, item 18) among them — whenever the result's capacity falls below its
households, each move a lifecycle event of it (§2.8), as `relet` keeps to the capacity (§4.11).

**Concealed institutions — a front and a hidden function (item 63; owner: "some criminal like institutions or buildings
have to be clandestine meaning there are certain lots and assignments that have two functions. A front which can be
anything and a second function").** A clandestine institution does not parade itself: its building stands on the map like
any other, and what it is, is withheld. This is the one statement of how such an institution is resolved, placed and
built; the records are §2.6–§2.7's, the knowledge filter §9.2's and the underground allocations II.7's.
1. **The value and its resolution (J-A63.41).** An institution, a use and an assignment carry
   `concealment: 'none'|'front'|'hidden'|'underground'` (`Institution.concealment`, `Use.concealment`, §2.7;
   `Assignment.concealment` with an optional named front, `Assignment.front`, §7.7), `none` by default. It is resolved when
   the institution is first placed — and again only when a dossier event withdraws the mode the dossier set (below) — from
   the first source that gives one: the dossier's fact (a mode, and optionally a named front); an assignment's value; the
   class table's default-mode weights — `BuildingClassRow.concealment` (§10.2), rows only for the classes our tables mark
   clandestine (a thieves' den, an assassins' house, a smugglers' store, a forbidden cult, a black market, a spy ring … our
   own rows), read at the plot band's row and the district kind and drawn on `siting` keyed by the institution's lineage
   (§6.1; no new concern); else `none`. The resolved mode is stored on the concealed use, with its map-side source
   (`Use.concealmentSource`, §2.7) when the dossier gave none; a map edit sets a mode the dossier did not set by `setAttr`
   (§7.1), and one the dossier set is dossier-owned, a map `setAttr` of it refused (§7.7 items 7, 11; J-A20.77, J-A63.22); a
   dossier event that withdraws the mode it set re-resolves it by this order from the map-side sources, the use re-placed by
   (2)–(6) as that event's least-disruption mutation (§7.7 items 5, 11 (b)), as an open use where the order yields `none`
   (§2.7; J-A63.22).
2. **Feasibility and the fallback chain (J-A63.41).** A mode is feasible where its ground exists: `underground` where an
   underground allocation exists — II.7.3's sewer-front pseudo-district (S7b (6), which needs a navigable run, not only a
   network, J-A14.43) or an undercity neighbourhood (II.7.5, S7b (7)); `hidden` where the district holds a plot whose
   `exposure` is `hidden` (item 30, §4.6); `front` where a cover of the cover table has a plot whose hard rows pass. The
   chain is fixed — `underground` → `front` → `hidden`; `hidden` → `front`; `front` → `hidden` — and where none is feasible
   the front's closest options are F-SITING's (§5.2): a clandestine institution is never placed openly by a fallback and
   never dropped, and every step down the chain is reported with its reason in `requestedVsBuilt`, never silent (J-A16.43).
3. **FRONT — one item, two uses (J-A63.42).** The front is a cover class drawn from the cover table
   (`RosterTables.covers`, §10.2: for each concealed class, weighted plausible covers per band — a tavern, a funeral
   parlour, a fencing hall, an apothecary, a warehouse, a bathhouse, a tailor … our own rows; several per class, since a
   front "can be anything") on `siting` keyed by the concealed use's lineage, unless the dossier or an assignment names one;
   a named front is honoured where its hard rows pass, else F-SITING's closest options are offered for it — never a silent
   substitute. S10b's solver places the pair as ONE item (J-A16.41): its hard rows are the FRONT's, so the front is plausible
   where it stands (a tavern on a street, a warehouse at the docks); its soft rows are the true class's relation rows and
   supply edges (near its targets and markets, the waterfront, alleys, passages, an outfall) plus an `exposure` row
   preferring `alley`, `court` and `hidden` plots, at the true class's weights; both classes' band rows apply, so prosperity
   shapes which fronts and which districts are used. The placed building then carries two `Use` records: the FRONT's —
   `Building.use`, a working business with its households, opening hours, label and description — and the CONCEALED one
   (`Use.concealment`; `Use.front` names the front's use; listed in `Building.concealed`, §2.6–§2.7), whose `knownTo` is
   `secret` by default (item 30's values).
4. **S11 builds the front (J-A63.42).** S11 reads the FRONT's designation template row at the plot's band: class,
   footprint, site plan, labels and public room programme are the front's, so at every public zoom the building reads as
   the front. The concealed use adds three things only, each flagged `concealed` and carrying the concealed use's knowledge:
   (a) a **concealed programme** — the concealed class's room-programme rows marked `concealed` (§10.2's
   `RoomRuleRow.concealed`: back rooms, a strongroom, a cellar room, a hidden stair), which the plan rung (§2.6, stage 3)
   places away from the main entrance and off the public circulation hub, reached only through a service, yard or concealed
   door (`Room.concealed`, §2.6); (b) a **concealed entrance** (`Entrance.concealed`, §2.6) — where the plot has an access
   edge beyond its frontage onto an alley or a passage (§2.6's entrance rule 2's condition), `deriveEntrances` adds one
   `service` or `yard` door there on `siteplan.entrance`, flagged, never the `main` door; with no such edge there is none and
   the concealed programme is reached from the front's service side; (c) a **way down** — the basement decision (§2.6) reads
   the higher of the front's and the concealed class's `cellar.prob` at the band (the terrain gate unchanged), and over an
   underground element within reach the building's access draw takes the concealed class's `accessMultiplier` (II.7.3's
   *Basement accesses*, item 64).
5. **HIDDEN.** The institution goes to a plot whose `exposure` is `hidden` (item 30's plots behind a passage or in a back
   court) — the `exposure` row is hard for this mode — with a front drawn by its class row's `hiddenWithFront` share on
   `siting` (a back-court workshop that also sells something), or bare, its building then of its true class with
   `knownTo: 'secret'`.
6. **UNDERGROUND.** The institution joins an underground allocation: a sewer-front dwelling of II.7.3 (U1–U3; the
   allocation's (b)) or, where one exists, a building of the undercity (II.7.5; its clandestine institutions prefer it),
   there with a front by the same `hiddenWithFront` share; its `knownTo` is `secret`.
7. **Mutation (items 17 and 18; J-A63.43).** A change of the front's designation — an `assign`, the front use's closing, a
   rung-3 rebuild — runs S11's designation mutator on the front: the concealed use persists, its concealed door is
   re-derived with the new entrance set where its access edge survives, and its concealed programme is re-fitted when the
   plan rung, marked `stale`, is next viewed. A relocation of the concealed use (item 17's use step; a dossier event) moves
   it by S10b's request like any use and leaves the front standing as an ordinary business: the building's `concealed`
   list loses it, its concealed door stays as an ordinary `service` door (the flag cleared) and its concealed rooms return
   to the front's programme at the next plan re-cut. The front and the concealed use are two records, so either can close
   without the other.
8. **The dossier stays the authority (items 20 and 22).** The dossier says that the institution exists and is clandestine;
   the map places it and never reveals it on its own. An exposure — a raid, a discovery — arrives as a dossier change and
   is applied as a least-disruption mutation (§7.7): the concealed use may relocate with its mode re-resolved, the front
   close, a passage be sealed (item 30). A map delete of such a place relocates it by `rejectSite` (§7.7 item 3), as for any
   dossier-backed element.
9. **Knowledge, not geometry.** The building's mass and every public part are always on the map (J-A30.83); the concealed
   use, rooms, door and way down carry the concealed use's `knownTo`, drawn, exported and answered through §9.2's filter
   (§11.1, §11.2 withhold them).
10. **Emulation (item 23; J-A63.44).** No reference has concealment: the non-`none` weights of the `concealment` column and
    the cover table are `extension` rows scaled by `placement.extensionWeight`, so the parity presets (weight 0) resolve
    every class to `none` and place every institution openly; with no clandestine class in the roster nothing here runs.
§5.3 holds the check rows (every clandestine institution in an allowed mode or a reported fallback; concealed rooms reached
only from a concealed door or the front's service side; the `underground` mode never without an underground allocation)
and §13.2's T63 group the bars.

**Light sources — placed by rule (item 68; owner: "a night time view with appropriately spaced and partitioned torches or
magical lights").** S11's furniture step places the town's point lights as `LightSource` records (§2.7; the lighting model
that draws them, and the derived lights — lit windows, room lights, light shafts — are §8.4's) by the light table's rows,
each read against its context: the host kind, the way class, the prosperity value along band rows, the era row, the
`magic` circumstance (§4.2 S0), the biome and the arena. A district places lights only on its own faces and its own
half-corridor strips, as §4.9's avenues are planted, so the laziness contract holds (§4.1):

```ts
interface LightRule { host: 'gate'|'bridge'|'plaza'|'market'|'door'|'castle'|'guardPost'|'way'|'shrine'|'pin'|'tunnel'|'gallery'|'chamber'|'accessPoint'|'rim'|'keel'|'skyAccess' /* 'pin': an emitting pin — lamp, campfire, fire_pit; the underground hosts (arena 'underground', (1)); the sky hosts (arena 'sky': the rim's orbs, the keel's downward glow, the access lanterns, V05 §3.13); a 'door' row with arena 'underground' lights a sewer dwelling's or an undercity building's door */;
  cls?: string /* 'door' rows: the class id or tag whose main entrance carries it (inn, tavern, temple …) */; wayClass?: WayClass /* 'way' rows */; arena: 'ground'|'sky'|'underground'; system?: string /* underground rows: the system they light — sewer, undercity, catacomb, cavern, ruin … (II.7.3, II.7.5, II.7.6) */;
  kind: string /* LightSource.kind: torch, lantern, lamp post, brazier, fire pit, campfire, magical orb, shrine lamp … */; source: 'fire'|'magic';
  heightCm: Cm; intensityCd: number /* candela */; radiusCm: Cm /* the smooth cutoff of §8.4's falloff */; radiusMarginM?: number /* the 'keel' row's radius beyond the apex's clearance, V05 §3.13 */; sizeCm: Cm /* the flame's or orb's own radius, §8.4's penumbra — own defaults: torch 5, lantern 8, lamp post 10, brazier, fire pit and campfire 25, magical orb 30, shrine lamp 5 */;
  colour: string /* sRGB, the colour the light pass lights with (§8.4 (c)) — own defaults: fire rows #FF9329 (warm), magic rows #A6C8FF (cool); §8.2's light roles tint only the vector rung's glyph and glow */; flicker: boolean /* default true for source 'fire', false for 'magic' */; count?: number /* per host; default 1 */; offsetCm?: Cm /* 'door' rows: the lantern's distance from its entrance vertex along the footprint ring, on the drawn side — own default 60, calibratable */;
  minLux?: { band: string; lux: number }[] /* 'way' rows: the target minimum ground illuminance at night, by band, interpolated along the value */;
  era?: string[] /* the era rows it belongs to; absent: every era */; magic?: ('none'|'low'|'high')[] /* the circumstance values a row lights under: a magical row's 'low'/'high'; a fire row a magical row replaces, ['none','low'] */; biome?: string[] /* a row admitted by the biome beside the circumstance (II.7.6's glowing fungus) */;
  exposure?: ('street'|'lane'|'alley'|'court'|'hidden'|'sealed')[] /* the exposures it may light; absent: street, lane, alley and court */; extension: boolean }
```

1. **Hosts.** A `gate` row lights each gate (two torches flanking the passage by default); `bridge` each end of a built
   bridge; `plaza` and `market` a square's edge at the way rows' spacing and its centrepiece; `door` rows the main entrance
   (§2.6) of each building of the row's class — an inn's or a tavern's lantern, a temple's door lamp; `castle` its gate and
   ward; `guardPost` each post; `pin` rows every emitting pin, which then carries the light (§2.7); `shrine` a wayside
   shrine. Underground (arena `underground`, each row naming its `system`): `tunnel` rows each junction of a tunnel run,
   `gallery` rows a gallery at the way rows' spacing, `chamber` rows a chamber's altar, hearth or market, `accessPoint` rows
   each access point's foot, and `door` rows the doors of the sewer dwellings and the undercity's buildings (II.7.3, II.7.5,
   II.7.6). A light's address derives from its host's lineage — a door lantern from its building and entrance, a street
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
   light; `low`: orbs on the rich band's squares and the precinct; `high`: on every primary way and square), a fire row a
   magical row replaces lighting only under the values its `magic` cell lists; hidden and sealed plots, and the courts and
   doors of a concealed institution's building (item 63), stay dark unless a row names them; an informal cluster's light
   is its cooking fires — one `fire_pit` pin with its light per `lights.perStructures` (4) structures (item 70). The sky
   rows — the rim's orbs, the keel's downward glow and the access lanterns (V05 §3.13) — light an island by its carried
   supply and are gated by no `magic` value, and the ground rows light the island's ordinary fabric as any district's; the
   underground rows light the underground layer by its system (II.7.3, II.7.5, II.7.6).
4. **Draws and presets.** Each choice reads a rule or a table; one thing only is drawn — a door lantern's side of its door
   — on the concern `pin.light` keyed by the host's lineage and the rule row (§6.1). A door light's point lies on its
   building's footprint ring, at its row's `offsetCm` from the entrance vertex (`LightSource.entrance`), walked along the
   ring on the drawn side and rounded to the lattice; §7.4 carries it and §5.3's light row checks it. Each record copies its
   row's `sizeCm`, `colour` and flicker flag, and a fire light flickers by §8.4 (f)'s pure function of its render key and
   the view's time, never by a draw (J-A68.61, J-A68.42). The default rows are our own (`extension`); the `MFCG` preset
   places no light; the `FTG` preset places one window light per lit building at its main entrance — the anchor at which
   FTG's client as captured on 25 September 2026 draws its night lights (item 50) — and no street light. A user adds, moves
   or removes a light by §7.1's edits.
5. **Over time.** A light follows its host's lifecycle (§2.8): removed with a demolished host, unlit on an abandoned or
   decayed one, unlit while its host's Works stands before FINISHED (§4.11); an epoch re-runs these rows on its new and
   changed faces only.

**Informal clusters — tenure and the cluster arrangement (item 70; owner: "some neighborhoods simply have a lot of for
example, shacks on one block no single individual owns it … each one deserving of a door. Sometimes they're just
tents").**
1. **Tenure (item 70 (a); J-A70.41).** A plot's `tenure` (§2.5) is derived, never drawn: `common` for commons, greens and
   market greens (ground no one owns); `informal` for a plot of the tenure table's bands (`RosterTables.tenure`, §10.2; by
   default squalid and poor) with no standing building but shacks, tents or lean-tos, and for vacant, cleared or ruined
   ground in a declining district (§4.11); `rented` for a residential plot whose buildings house more households than their
   template rows' `households.built` (let out by rung 1's `relet`, §4.11); `owned` otherwise. S10b and S11 write it with the
   plot — at generation a plot is `informal` only where (2) gives it the cluster row, "no standing building" being read over
   epochs, never before S11 has built (J-A70.49) — every event that changes its inputs re-derives it, and a `setAttr`
   overrides it (an edited path, §7.2).
2. **Where (item 70 (d); J-A70.43).** The designation template takes the `cluster` arrangement (§10.2) at generation for the
   residential plots of the squalid and poor band rows of a shanty-typed district (§4.5's FTG trigger and staging) and for
   every residential plot of a block of such a district that the cluster row's `wholeBlock` share picks — over epochs, for
   the plots (1) makes informal — wherever the district's band range admits the squalid band (§4.5 (5)), never on a plot
   whose geometry floor is the middle band or above while its stock stands (a standing large building is subdivided inside
   instead, §2.6's interior ladder, item 28 (f)). That is FTG's staging as the emulation default, and the class mix never
   draws a cluster structure's class (§10.2; J-A70.49); the `shanty` kind's `extramural` preference remains our soft
   extension row (J-A27.43), and the cluster row's relation rows prefer, softly, riverbanks and marsh margins where S1's
   shore setback and flood line allow building, and the lee of walls and ruins. Over epochs the vacant, cleared and ruined
   plots of a declining district join them (§4.11). The undercity's chambers take clusters by II.7.5's rows (item 65),
   while II.7.3's sewer-front plots keep "no compound, detached, hovel or tents". Where the `wholeBlock` share picks a block
   — one draw on the block's `plot.join` stream at S10 (7), which reads the district's kind and the block's band and no
   tenure — S10 (7) joins the block's residential plots into one cluster plot (the owner's "shacks on one block").
3. **The packing — paths first, then structures (item 70 (b); J-A70.45).** S11 builds a cluster plot in one batch from its
   `siteplan` stream, and every structure gets its own door by construction, as frontage-first plots each get a way (O5 a).
   (i) **The footpath web:** from the midpoint of every access edge of the plot a trunk path runs inward, square to that
   edge, ending one structure depth — the largest `depthM` upper end among the cluster row's kinds (§10.2), which every
   later "structure depth" of this step reads — before the opposite side; branch paths leave the trunk on alternate sides
   every `2 × structure depth + path width`, each turned by up to ± 20° (drawn), stopping one structure depth inside the
   plot's boundary. The paths are yard parts of kind `footpath` (§2.5) of width `pathWidthM` (the cluster row's; below an
   alley's) — plot-internal, never a way or a way class, so the plot keeps its access edges and its exposure (J-A30.42).
   (ii) **The structures:** lining each path left and right, every one fronting it; the kind drawn by the cluster row's
   weights by band × climate × era (tents in the squalid band, in camps and at the newest edge; shacks where the settlement
   has persisted; lean-tos against a standing wall), the footprint from the kind's band in the cluster row — a lean-to's
   against a standing wall on its own plot (a ruin's, a party wall or a plot wall; never inside a wall strip, whose band,
   setback and glacis stay unbuildable, §4.8; J-A70.47) — and a clear gap of the cluster row's `fireGapM` at the
   settlement's rung between any two structures; the packing stops when no site fits or the plot's households are housed.
   (iii) **The doors:** every structure's main entrance lies on its path face — §2.6's rule 1 read for a structure whose
   access is a footpath (J-A70.44) — so every structure has its own door on a path that reaches an access edge; no basement
   (the rows' `cellar` 0), one storey, `RoofSpec.kind 'tent'` for a tent, a lean-to's back wall shared with its host wall. A
   plot too narrow for a trunk and one structure depth takes the `hovel` arrangement instead (reported).
4. **People per structure (item 70 (c); J-A70.46).** Each structure is a residential slot (`houses`) whose
   `households.built` is the cluster row's households per structure by rung × band (more in larger towns and poorer bands;
   our own rows); its capacity is §2.6's one capacity function — the shack, tent and lean-to programmes carry no
   circulation and the one-room unit, so the capacity is the floor area over the minimum room — and the generation fill
   houses the households within it, the overflow pass re-homing any excess (never omitting a household, §5.2). The
   households that would crowd a partitioned shell under §2.6's interior ladder here fill many small structures: its
   outdoor twin.
5. **Presets, drawing and time (item 70 (e), (f); J-A70.42).** In the default preset the cluster row takes the squalid and
   shanty districts' informal plots; the parity presets keep FTG's tents row (1–3 tents) and MFCG's hovel, the cluster's
   packing an `extension` (item 23). The city band draws a cluster as a speckle of small roofs over its paths in the ground
   tone (§8.5's cluster exception), the district band each structure with its entrance tick (§8.2), and the naming engine
   names the cluster once, as a place (§10.4; one label, §9.1), never each structure. Accretion, fire and formalisation are
   §4.11's.

**Class mix inside a band — the gradient reaches the building mix (item 71; owner: "a prosperous neighborhood … may have a
mix … of middle class to rich man manors. Keeping with the idea that it is gradient").**
1. **A class draw above the template (item 71 (a); J-A71.41).** When S10b places the households of a block's residential
   plots, each plot's residential **class** — hovel, cottage, house, row house, town house, manor …, distinct class rows
   with their own templates — comes from the class-mix table `RosterTables.classMix` (§10.2): one row per band of §4.5's
   band set, weights over the residential classes, read at the plot's manifested value (J-A19.43) by §4.5's interpolation
   between the band rows' centres, an end row applying flat beyond its centre. The default rows raise the larger classes
   monotonically through every band — just above the prosperous cut mostly houses with a few manors, the manor share rising
   toward the rich row, which is all manors at TOWN and above (the owner's "a very prosperous location may simply have all
   manors"; below TOWN, the rung ceiling, (3)); the same at every band edge (modest houses among the poor near the modest
   cut). J-A19.41 holds within a class — its template's discrete columns read §4.5's discrete-cell rule — while the class
   itself follows the gradient.
2. **The town's wealth shifts the weights (item 71 (b); J-A71.42).** Each class's weight is multiplied by
   `max(0, 1 + wealthShift × (wealthLevel − 0.5))`, after which the row is renormalised: `wealthLevel` the intent's (§7.7;
   with a dossier, the wealth §7.7's derivation table derives), `wealthShift` the class's column in the mix row (positive
   for the larger classes). The cuts stay the town's own (§4.5), so "rich" is relative to this settlement while a rich
   metropolis's prosperous quarter holds more manors than a poor town's.
3. **The rung ceiling (item 115; J127).** Before the class draw, S10b reads the settlement's rung row of
   `grandeur.ceiling` (§10.2 *Grandeur ceiling*; its rows V11 §3.25.4). On a row that is `enabled` and not
   `allManorsRow` — the THORP, HAMLET and VILLAGE rows — the manor class is admitted only up to the row's `manor.max` and
   only where its `manor.requires` is met (`lordOrSpecified`: a `seigneurial` government or a specified manor;
   `specified`: a specified manor only — V08 §3.16 (3): a dossier-bound record of a class in `grandeur.ceiling`'s
   `settings.grandClasses` (V11 §3.25.4), or a dossier government whose `villageSeat` names the manor house, seigneurial
   or crown (V11 §3.21.1)); the manor's weight in the drawn row goes to the row's largest admitted class, so the
   capped row's rich anchor is that class; `wealthShift` ((2)) moves a dwelling only along its capped row and never raises
   the manor count (item 115 (d)); and S11 caps every other dwelling's composition by the row (S11 *Footprints and
   heights*; item 115 (a), (b)). The "all manors" rich row stands only where the row's `allManorsRow` is true (TOWN and
   above). A dossier-named or hand-placed grand building keeps its design — the ceiling is a default, never a refusal
   (item 101 R2), explained by the clerk (V10). Across a rung change the ceiling applies to the buildings new or rebuilt
   from that epoch, the standing ones keeping their design (item 115 (e); V06 §3.8.5). A row `enabled` false is no
   ceiling — S10b reads the mix as at TOWN (the no-op pin; the parity presets disable every row). The bars are §13.2's
   item-115 rows and T-V11-41.
4. **Largest classes on the prime frontages, the sunniest first (item 71 (c); item 102 (d); J-A71.43).** For each block
   S10b draws the multiset of classes — one per residential plot, at that plot's value, on `siting` keyed by the plot (§6.1;
   no new concern), its weights clamped into the district's band range (§4.5 (5)) — and assigns them largest class first
   (by the class's template size budget, ties by class id) to the plots in descending **prestige**: the sum of the prestige
   rows' weights (`ClassMixRow.prestige`, §10.2 — a `through` or `primary` frontage, a square, a park edge, a corner, the
   waterfront) over the plot's frontages, plus the **sunlit term** `ClassMixRow.sun × (1 − shade)` at the plot's frontage
   midpoint (item 102 (d): among otherwise equal prime frontages the larger classes take the sunnier ones — the side of a
   street that faces the sun, a slope that faces it — and the smaller the shadier backs; `sun` × the climate row's
   sunlight cell, 0 in the parity presets), ties by plot id; a hard relation row filters first (item 16's rows win). A mixed
   block so reads as a street of grand houses with modest ones behind. A class whose size budget exceeds its plot asks S10
   (7)'s law for a JOIN by its orderings (the reconcile's JOIN at generation), the joined neighbour's draw discarded, so
   manors stand on joined plots and houses on standard ones in one block.
5. **Households and buildings (item 71 (d); J-A71.44).** The households' bands are the roster's (with a dossier, the
   households that fill its population, §7.7); the mix decides only which building each takes — a household takes any class
   the mix gives a plot within its band ± drift. A manor that falls to the middle band keeps its shell (item 31's floor,
   §4.11) and is subdivided inside (item 28 (f)). S2's land estimate reads the mix's expected plot area at each band's
   centre (§4.2 S2), so demand and capacity keep agreeing.
6. **Emulation.** The mix is our extension: the parity presets set it to a step at each cut — one class per band row, the
   references' banded pools (item 23; T23-1 reads it) — with `wealthShift` and the prestige weights 0.

S10b places each class by its `distribution` as §4.5 (3) states, and every prosperity-driven read of S10b and S11 — the class
the mix draws, the template row's band, a new building's condition, the occupants' band, the mutator's adapt and add steps
— is clamped into the district's band range (§4.5 (5)).

**Notice posts (item 82; J-A82.41).** The furniture step places a `notice` pin (§2.7) where §10.2's notice rule puts one —
at the principal market and at each gate plaza by default, at the main entrance of each class tagged `notice`, and wherever
a named-feature claim of the dossier names one (§7.7, item 82).
=== END ===

=== REPLACE ### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture ===
### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture

**The trace is S3's and S5a's** (§4.2 S3 (6)–(9), §4.4), always fixed before that stage's secondaries grow. S7 builds
everything that stands on the traced wall, once per enceinte, after S6 has typed the districts, in **one L1 batch** per
enceinte; its geometry at L3 and L4 is built inside the wall strips by S10 and S11 after S9.

**Wall strips, band, setbacks, intervallum (GEO-38, MFP-9, COV-FTG-G07; J-P29).** S7's L1 batch cuts two **wall strips**
off the L1 faces beside the trace's walled stretches. Inside: the band's half (wall thickness by era 2–3 m, read along the
stretch profile below) plus the inner setback (table 6–10 m; MFCG's "buildings never touch the wall"), bounded by the
**inner setback line** — or, where the era row asks for an **intervallum** (`lane` on inner and outer enceintes at CITY and
METROPOLIS in the high-medieval preset, `none` at TOWN), by the intervallum spine itself, inserted here as an L1 `lane`
whose kerb is the strip's edge. Outside: the band's half plus the outer setback and glacis (table 10–20 m), bounded by the
**glacis line** — or, where a moat runs along the wall, by the moat's inner bank, the strip then being the band's half plus
the berm. The lines carry the structural `setback` role (§2.2 rule 7), run from gate to gate, stop at each gate's plaza
claim or arterial corridor, and close on the secondaries S5c stopped at the setback band, so each strip is a face of its
own; strip faces inherit their district from the faces they were cut from and are typed `wall_strip`. A barrier arc the
trace leaves unwalled (§4.4) carries no strip. S8 never cuts a strip and its lanes end on the strip's boundary (§4.6);
S10's eager step (0) builds inside each strip block the L3 half-band, the setback and glacis residue and its side's parts
of every tower and gatehouse (§4.7), so nesting holds and no later batch splits them. **Both faces are unbuildable:** no
plot is cut in a strip, so the hard invariant "footprints ∩ (band ⊕ setback) = ∅ on both faces" holds (§5.3), and ribbon
plots start beyond the outer strip (O8 b).

**Graded by stretch (item 106 (c)).** The grade is `Enceinte.stretchClass` (§2.7), a `'full'|'parapet'` step profile on
`wall_class_knot` vertices that S7 writes with the trace's furniture; the wall's thickness, height, walk and tower spacing
read its class's row (V11's `walls.barriers`), keyed by each arc's defensibility class (§4.4): the full curtain on open approaches; a lighter parapet on
cliff tops, steep slopes and waterfronts; no wall where the drop is sheer or the water deep (closure only); the strongest
towers where wall meets barrier and across a neck. The per-enceinte values are the profile's defaults, and an absent
profile is uniform (the base's wall; §7.5). At village kinds the light section reads `village.json`'s
`palisade.lightHeightCm`, and item 106 (b)'s reach cap reads `R_s` for the stage radius and `palisade.barrierReachShare`
for the share (V07 §2.2, V07 §3.4).

**Condition at generation (item 114 (d); J127).** S3 and S5a lay every trace `standing`. With no history replay, S7 then
writes each run's `Enceinte.condition` and material (§2.7; item 114 (b)) from §7.7's condition row — the dossier's defence
readiness and wealth (or the blueprint's stand-ins) mapped to the table shares of `walls.condition`'s `generation` cells
(V11 §3.25.3), a `patched` run's material from `walls.patchMaterials` by the enceinte's kind and culture — along an
`on_enceinte` castle's shared stretch (`Castle.cityWeld`) one draw, on the town enceinte, sets the stretch's condition and
material and the bailey's profiles there mirror them in the same batch (§2.7 *An enceinte's condition by run*: the
castle's welded stretch); with the
replay, the replay writes them (§4.11 *History-first generation*). With the row absent, its switch `atGeneration` false,
or its inputs neutral, every run stays `standing` in its robust material (the no-op pin).

**Gates — exactly N, by construction (MFP-4).** Main gates are where S4's and S5b's arterials cross the trace: N₁ gate sites
were picked in S3 and the arterials routed through them, and each outer enceinte's gates are its S5b primaries'
crossings, so roads leaving each walled stage = its gate count and no arterial ends blind against a wall. Water gates sit
where a river passes (its two bank vertices named by `Gate.banks`, §2.7), at every quay access under a `quay_wall` or
`sea_wall` waterfront (§4.4), and at a harbour gate (§4.2 S3 (7)); the castle has one town-side gate; posterns are a
separate, road-less count added only on request; `N = 0` is honoured in S3. **Gate plazas (G-R1):** a small plaza is
claimed in S7's L1 batch at each main gate inside the wall, taking the inner strip's setback zone around the arterial
(MFCG B14); **forecourt squares** at churches and temples are typed open spaces sized by the institution's class — a church
or temple on a later reservation without one takes its forecourt from S9b's dispatch, and one below a block a `forecourt`
yard part of S11 (V01 §3.5.3). Gate passages stay open by construction: a wall strip ends at the corridor of the way
through each gate, so the band and gatehouse parts S10 builds never meet that corridor, and the intervallum's corridor is
the strip's inner edge. The F-WALL ladder's last rung is §5.2's.

**Towers** — a row per enceinte kind and rung: at every trace vertex whose turn exceeds a threshold and along straight runs
at a spacing (35–60 m by rung and era, read along the stretch profile; FTG's 39 m median and MFCG's tower-per-vertex are
the two reference points), and at every barrier anchor (item 106 (a)); kind (round, square, bastion, octagonal) by era row;
heights and a ground datum per tower; each tower's footprint is built per side of the wall by S10's step (0) (§4.7). At
village rungs `palisade` and `earthwork` carry no towers (a barrier anchor takes an end post, a gate a gatehouse on a
`through` way, else a timber gate), and `inner` carries towers at turns above the threshold and at barrier anchors, none
along runs (V07 §3.4).

**The harbour mouth (item 106 (e)).** A walled port's harbour entrance gets two towers on the mole or breakwater heads (or
the shores) and a chain between them: a `Gate` of kind `water` across the entrance, its banks the two heads (§2.7), S7
furniture drawn raised or lowered by the era row. The mole head's slot holds this tower (the deck-plot landmark slots,
§4.7), a `fort` replacing it as the chain's anchor where `deck.landmarks` draws one.

**The castle (MFP-3, COV-FTG-G09, COV-FTG-G10).** The S3 bailey reservation becomes the castle's plot; its curtain is its
own enceinte of kind `bailey` along the reservation polygon, with towers at its vertices and along its runs, using the
same closure (a cliff-top castle walls only its approach; item 106 (f)); an `on_enceinte` castle is already welded into the
town wall through its two weld vertices (the shared edge is one wall). A **castle template table** places the
**gatehouse** at the town-side gate S3 fixed (§4.2 S3 (8)), with an inward spur; the **keep** — shape `rect` (by `lir`),
`square`, `octagon`, `round` or `cruciform` with corner projections, by era and rank rows — opposite the gate, on the
highest ground or central, by row; an optional **inner ward** (an inset of the bailey by 30–40 % with its own gate, its wall
chain in S7's L1 batch) by rank; **internal paths** as `path` ways keep ↔ gatehouse ↔ wall stairs (S7's L1 batch; the keep
and gatehouse footprints are S11's); a **surround** row (`Castle.surround`, §2.7) — an esplanade (MFCG's green spacer
before an inner castle, §4.9, claimed by S7b beyond the bailey's outer strip, §4.5 S7b (3)), a park with a perimeter path,
a plaza, a cliff skirt on a cliff site, or none; a **moat** (`Castle.moat`; carved at S3 when water is within reach — a ring
with its gate deck around an `inside` or `outside` bailey, only the outer arc around an `on_enceinte` bailey, §4.2 S3
(10)); and, for an `on_enceinte` castle, a **town-side** row, `townSide: 'dry_ditch' | 'none'` by era and rank (default
`dry_ditch`; J-P36): a dry ditch types the glacis part of the bailey's town-side outer strip `ditch` (§4.7 S10 (0); the
bailey enceinte's `glacis` holds it, drawn by §8.2's ditch role; `ditch` names only this dry residue — a wet moat is a
`WaterBody`, named by `Enceinte.moat` and `Castle.moat`, §2.7) and is broken at the castle gate by the castle street's
corridor, as every strip ends at a gate's corridor, so the street crosses on a causeway; `none` leaves plain glacis. No
castle moat crosses the town wall (§4.2 S3 (10)). **Compactness (F-CASTLE).** The floor is the bailey reservation's
`compactnessMin` (0.75: MFCG's threshold on the compactness `4πA / P²`, kept as a *shape check*; §4.2 S3 (8)), checked when
S3 sites the bailey, before the trace welds to it, and **repaired in place first**, in MFCG 12710731's order — thinness
first, then shape (provenance `ref:MFCG 12710731 castle repair order and target (code)`, P10; J-A45.41). The **pinned
vertices** — an `on_enceinte` claim's two weld vertices, which stay on the boundary, and, once the town-side gate is fixed,
the two end vertices of the side that carries it — never move; at generation S3 (8) repairs the claim before it fixes the
gate on the repaired polygon. (1) **Bloat:** while the claim's nearest boundary vertex lies within `castle.minInnerM` (a
castle-table row, 40 m: MFCG 12710731's coded 10 units at its 4 m unit) of its area centroid — `regularFit`'s `centre`
(§3.4) — every free vertex moves radially away from that centre by 5 % of its distance to it (a 5 % scale of the claim when
nothing is pinned), step by step, stopping at the area band's top. (2) **Equalise:** each pass moves every free vertex 20 %
of the way to its place on the claim's best-fit regular polygon (`regularFit`, §3.4 — as many vertices as the claim, its
centre the area centroid, radius and phase from the ring's first Fourier component), for at most 20 passes; the claim is
**repaired** when its compactness reaches the floor and **unrepaired** when a pass gains less than 0.001 or the passes are
spent. A repaired claim is checked again against S3 (8)'s hard filter and counts as unrepaired if it fails it. Two parts
are ours (J-A45.42): the bloat moves only the claim's own vertices inside its reservation, where MFCG 12710731 pushes its
committed mesh; and an unrepaired claim takes the ladder's next rung — re-site to the next candidate (reported), and last
a keep without a bailey (reported) — never a restart (§5.2), where MFCG 12710731 restarts the city. The claim polygon is the
target of the `warp` `equalize` and `bloat` edits (MFCG's documented castle-resize workflow; the `equalize` brush takes the
same step, §7.1). **Acceptance:** castle area and compactness inside the band on ≥ 99 % of seeds with a castle requested (0
ways through reservations; MFCG's census baseline of 178 equalise passes and 11 bloats); every re-sited castle reported.
Several enceintes (citadel, inner, outer, suburb, bailey, palisade, earthwork) are stage rows in the table; up to two
castles (§4.2 S0). Every wall carries a lifecycle for wall → ring road conversion (§4.11's `wallToWay`, a `retypeEdges` on
the wall's role set).

**Water furniture.** **Bridges** stand on pinned decks — S1's on rivers; S3's on the moats and canals it carves (§4.2 S3
(2), (10)); S5a's on outer moats; a carve edit's on its channel by its way rule (§4.11); one L0 shore-split batch's where no
site stood (§4.2 S1 (5)). S7 builds the furniture of every `built` bridge, when a way's span is first laid through its deck
— at generation, or by its operator after an epoch or an edit; on a sky island's arena V01's unit run applies the same rule
(§4.2 S1 (5)) — and none for a `site`: the deck is perpendicular to the flow or channel by construction and S4 or S5 routed
the way to its ends; the class comes from the way; stone or timber by era and prosperity rows; the deck height (`deckCm`)
from the two bank elevations plus a clearance row; minimum spacing 40 m (FTG); fords where the class allows. A deck S1's
water operator re-sites keeps its `Bridge` address (§6.3); bridges and piers are re-based by §2.6's datum step
(`deriveBase`) after a terrain stroke (§7.3 (a)). **Harbour (GEO-19, COV-FTG-H17):** the basin was reserved and carved at
S3, before any street, so S7 builds only its furniture on the reserved shore: a **harbour-wall row** — shape (none, one arm,
two arms; following the coast or projecting) and type (wall, wall with rocks, detached breakwater) — moles, quays as
`quay` ways along the waterfront (bank kind `quay`), piers as `pier` ways at 12–20 m spacing, straight or branching, on the
harbour and on the open coast (FTG's ≈ 75 m length as a reference), timber or stone by era, each pier carrying its deck
height like a bridge (read by the projected shadows (`shadowPass`) and the 3-D export, §8.4, §11.1); no pier, mole or
breakwater arm is rooted on a bank of kind `cliff` (§4.2 S1 (7)) — a cliff-bound shore takes none, so it offers no deck
plot (§4.7 *Deck plots*; §4.13) — and a quay stands only where the bank kind is `quay` (§4.2 S1 (7)); moles, breakwaters, quays and piers are
`pier` / `quay` ways in S7's L1 batch. A pier, a mole, a breakwater arm rooted on one shore and a detached breakwater are
**harbour works** under §5.3's crossing invariant; MFCG's `1.2 ± t` pier casing is a style. **Canals and moats** were carved
with their decks at S3 (`canal` along the chosen line; MFCG 12710731's canal builder, which also draws its rivers, is
covered by S1), outer moats at S5a; S7 adds their quays, their bank kinds and the bridges on their decks. A carve
requested later by an edit goes through §4.11's conversion path, whose way rule gives every arterial it meets a deck and
records every cut, never a silent overwrite.
=== END ===

=== REPLACE ### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base) ===
### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)

**The one built path: add a growth stage (GEO-27, LC-12, FTG-4, FTG-14).** `grow(doc, epochInputs)` appends an `epoch`
event to the log and runs at that log position (§7.1, §7.4) on the persisted model with the epoch sub-stream: S2 (**delta
demand** = the suffix of the sequential roster between the old and the new population, §10.2 — prefix-stable, so no
survivor's use is withdrawn by arithmetic) → S5 for the new stage, when a residual remains after the regrowth-first order
below (S5a: the boundary grown from the previous one and, if walled, its trace and gates; **S5b**, the main-road step, so
each epoch can add main roads; S5c with the built-face legality below; S5d) → S6 (districts extend over the new faces,
existing districts keep their ids; the field's drivers are re-evaluated with the new circumstances, the brush strokes kept
as Δ) → S7 (the new enceinte's furniture) → S7b (allocation of the delta demand in the regrowth-first order below — the old
plan's vacancies, ruins and traces first, new faces only for the residual) → S12a (outside sites for new outside classes;
the hinterland unit builds their plots) → S8–S13 on new faces only (S10–S12b in the derivation pool, over a copy frozen as
§3.3 step 1 states). S5c's proposals cross water only on a deck — a built bridge, or a `site` the proposal builds (§4.4) —
so an epoch's growth uses the crossing sites S1 and S3 left unused (§4.2 S1 (5)). An epoch whose population target equals
the current one places no delta and grows no stage; its other steps (the field, the ladder, the dossier events, the
character step, the Works) run as below.
* **Built-face legality (GEO-27).** In an epoch a growth proposal may not cross a face holding footprints unless it runs
  along plot boundaries or back lanes (§4.3's `existingFabricCost` applies to S5c too, pricing a route along plot lines far
  below one through buildings) or a declared `demolish` conversion is chosen at its table cost (by building class and age),
  recorded as events. Plots cut by a new corridor are re-cut through the conversion path — buildings that still fit are
  kept, the others demolished with lifecycle events — never re-derived from scratch.
* **Survivors — the wealth ladder and the geometry floor (LC-12; item 31).** Surviving plots and buildings keep their built
  state. A re-evaluated field never re-derives them and never removes an occupied building: it acts on them only through
  the explicit, recorded, rate-limited events of the **wealth ladder** — three rungs by the time a block has spent in its
  new band and by what its standing stock allows — drawn from `…/epoch=e` streams (the ladder's own draws on
  `epoch.transform`; a rung-3 re-cut's `plot.*` and `siteplan` concerns keyed by the block's and the new plots' lineage with
  the epoch component, §6.1 — no new concern). The engine that schedules the ladder is the owner's staged evolution stage
  (DEF-8, below); the base carries now the due mark, the table, the operators, the floor and the edit kinds, each usable by
  hand (§7.1) and undoable (§7.4). With no epoch nothing here runs, so the static baseline is unchanged (item 23): neither
  reference evolves — MFCG fixes granularity by ward type and FTG by lifestyle tier at generation, and FTG's "regenerate
  area" is a re-roll, which this ladder never is.
  - **The trigger — a band change past the hysteresis marks the block DUE.** After S6 re-evaluates the drivers (§4.5) each
    block's band is read again against the town's `FieldBands` with their hysteresis (0.02, §4.5): a block whose value has
    crossed a cut by more than it is marked due — `Block.due = { band, since, epochs }` (§2.5): the band it must meet, the
    epoch of the crossing and the epochs spent in that band, counted up at every later epoch — until its stock meets the
    band or the band changes again (a new mark; a flicker inside the hysteresis marks nothing). The mark is per block and
    the memory per plot (`builtBand`, below): "the neighbourhood grew poor" is the aggregate of its blocks' marks and its
    plots' records, never a district switch (J-A31.43).
  - **The rungs.** Every rung acts through operators the base already has — item 18's designation mutator (`mutate`, §4.7
    S11), item 17's use step (below), item 30's passage choice (§4.6), S10 (7)'s join-and-split law in its incremental
    form (§4.7) — as `LadderOp` conversion events (below), so **no occupied building is demolished by a band change** and
    nothing is re-rolled (J-A31.41).
    1. **Rung 1, at every due epoch — use, occupancy and condition.** *Growing poor:* buildings are let out — `relet`
       raises a building's household count within §2.6's **capacity** (its one capacity function, J-A28.23), the roster's
       households (with a dossier, the households that fill its population, §7.7 item 2; item 20 (h)) and item 17's
       relocation filling them (§10.3); the interior follows the occupants down §2.6's **interior ladder** (item 28 (f)):
       the plan rung re-cuts the programme for the new count inside the unchanged wing rings — from one household with its
       staff rooms to a lodging house, a tenement of one-family apartments off a corridor, or single rooms — inside the
       `relet` event itself for a stored plan (§7.3's stored-plan row; J-A28.72), otherwise when next clicked (the unstored
       rung goes `stale`, §2.8); F-PLAN never drops a household (§5.2); outbuildings convert to dwellings and workshops and
       sheds and hovels infill the yard (`mutate` toward the field band's use and specialisation columns; `densify …
       infill` inside the manifested band's yard rows); the garden is built over (§4.9); the fabric's **condition** steps
       down — `Building.condition` `kept → worn → neglected` (§2.6: wear and patched roofs, rendering classes of §8.2,
       never a shape change, item 19); the roof is lost only by the decline ladder's `decay`, after the building's last
       household has left (`vacate`; the derelict state of §2.8's ladder). *Growing rich:* renovation and extension by
       `mutate`'s adapt and add steps toward the richer template (item 18), households re-united (`relet` down to the
       row's built count; the interior re-cut back up the ladder removes what the subdivision added and restores the
       earlier plan where nothing else changed, §2.6), infill cleared once its households are re-homed and the garden
       reclaimed (`thin … infill`; infill whose households cannot be re-homed within the epoch's churn cap waits, as a
       court does in rung 2), condition restored. Use, condition and the interior read the field band; geometry reads the
       manifested band (the floor, below).
    2. **Rung 2, after the ladder table's duration in the band — tenure and yards.** The holding fragments or
       consolidates without its front changing. Growing poor, the yard becomes a back court of rear plots reached by a new
       passage (`densify … back_court`) where §4.6's passage choice allows one and the plot's manifested band's row
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
       above, never on a middle-floored plot; a court `thin` has emptied and cleared is vacant, so its rear row returns to
       the front plot's garden by rung 3's `amalgamate` (J-A31.40).
    3. **Rung 3, on vacancy, ruin, a destructive circumstance event or redevelopment only — the geometry follows.** A
       vacant or ruined plot's ring is re-cut to the band: growing poor, an abandoned or ruined mansion's plot is split into
       row houses or tenements (`subdivide`), or the fallen house's plot is re-cut and rebuilt as lodgings; growing rich, a
       buyer joins two or three worn small plots and replaces their houses with one large building (`amalgamate`, then
       `rebuild` or `build`). **Redevelopment** is a composite the engine issues in order — purchase (the plots' uses
       closed or relocated by the use step under item 17's rules — a dossier-backed use relocated, never closed
       (*Dossier content across epochs*); a pinned assignment or a lock stops it), vacancy (`vacate`), then the re-cut and
       the new stock — so the invariant holds at every step (J-A31.47). The re-cut is S10 (7)'s law in its incremental form
       (§4.7): the due block re-cut with its neighbours fixed (§7.3: the block is the effective scope, with its seam
       exception), under the band's granularity target, fusing and splitting by S10 (7)'s orderings, every survivor's plot
       byte-identical, the new plots' buildings by S11's mutator from the empty design, their residential classes by S10b's
       class mix at the new stock's value (§4.7, item 71). Slums arise where the stock was small and cheap to begin with, or
       from rungs 1 and 2 inside big shells; a district of mansions grows poor as tenements behind grand fronts, never as a
       cleared slum (the owner: "hard to imagine that it would be torn down into a slum if it was filled with mansions").
  - **Asymmetry — speed by direction and by the stock's replaceability (owner: "much easier for a poor neighborhood to grow
    rich and merge plots").** The rung durations are rows of the **ladder table** (`WealthLadderTable` in `@plat/tables`,
    §7.6, §14; our own rows, calibratable, §13.9; tendencies changeable per region and era, item 23), keyed by direction and
    by the stock's `replaceability` — a column of the template rows of the class table (§10.2), read at the plot's
    `builtBand` row: `immediate` (tents, sheds, hovels), `short` (cottages and the row houses of the poorer bands), `long`
    (the row and detached houses of the prosperous bands), `ruin_only` (manors, halls, institutions) (J-A31.42). Growing
    rich reaches rung 3 within a few epochs because it replaces cheap stock; growing poor stays at rungs 1 and 2 for
    generations, because expensive stock is not torn down, so splitting waits for vacancy, ruin or a destructive event.
    The years a block has spent in its band are (the epoch's week − the week of the epoch that marked it, from its
    `EpochRecord`) ÷ 52 (*The clock*). Default rows:

    | replaceability of the standing stock (at `builtBand`) | years in the band before rung 2, growing rich / poor | rung 3 growing rich: fusion after purchase and vacancy | rung 3 growing poor: splitting |
    |---|---|---|---|
    | `immediate` | 0 / 0 | in the due epoch | on vacancy, ruin, a destructive event or redevelopment |
    | `short` | 0 / 10 | after 10 years in the band | the same |
    | `long` | 10 / 20 | after 30 years in the band | the same |
    | `ruin_only` | 10 / 30 | on vacancy, ruin, a destructive event or redevelopment only | the same |

  - **Churn.** The table's **churn cap** rows bound every epoch, per kind — `geometry` (rung-3 re-cuts and rebuilds),
    `fabric` (the strike pool's strikes, below), `use` (the use step's relocations, below) — as a share of a district's
    plots (or uses) per decade, scaled by the epoch's `years` — a fraction of a year allowed, the scaled cap's fractional
    part the chance of one more, drawn on `epoch.transform` keyed by the district, the kind and the epoch (no new concern;
    J-A76.44) — and a maximum per block per epoch; defaults 0.05 / 0.10 / 0.10 per decade and 2 plots per block.
    Candidates beyond a cap wait, in address order, so a neighbourhood changes over many epochs, never all at once; item
    17's cap and the strike pool's bound are rows of this one table (J-A31.46).
  - **The geometry floor (owner: "their floor is bounded to middle class … once a neighborhood generally gets to a middle
    class outcome, that forever remains its geometry until vacancy, ruin, fire, war, or redevelopment shifts things
    entirely. it would cycle … between rich and middle").** Each plot persists `builtBand` and `builtProsperity` — the band
    and field value its present stock was built for (§2.5; in the model digest, §6.2; never recomputed from the field,
    J-DET-12) — and derives, never stores, `geometryFloor = min(builtBand, FieldBands.middle)` by the band order: the
    settlement's middle band (§4.5) for stock built at or above it, the stock's own band below it — a hovel cannot read
    poorer than a hovel; it can only be replaced upward. The plot's **manifested band** is `max(field band,
    geometryFloor)` and its manifested value `max(field value, floor value)`, the floor value being the middle band's lower
    cut, or `builtProsperity` when the floor is the built band. A **block-level read** — S10 (2)'s granularity rows, II.3's
    dispatch — takes the block's manifested band as `max(block band, the floor of its standing plots' area-weighted
    median)`: the plots ordered by `geometryFloor` in the band order (ties by address), the floor at which their cumulative
    area first reaches half their total; a plot-level read takes the plot's own (J-A31.43). Every change other than a
    rung-3 event reads the manifested band and value for what is BUILT — S10 (2)'s granularity rows, S11's template
    geometry columns (size budget, structures, storeys, heights, frontage, court and garden; J-A19.43), the yard partition
    (§4.9), II.3's block dispatch — and the field band and value for who is there and how it fares — households,
    condition, specialisation, the room programme, labels and descriptions (J-P1 stands: "the rich quarter" is still a
    description of the field). So a mansion district that grows poor reads as middle-class geometry — big plots, big
    shells, subdivided into lodgings, yards infilled — while its occupants, condition and names are as poor as the field
    says: **the interior has no floor** (item 28 (f)) — the shell keeps its floor while its rooms follow its occupants down
    §2.6's interior ladder, to single rooms off a corridor at the poorest (the same shells, a different interior; item 30's
    back courts behind them, the cheap stock of item 27's shanty rule at the edge, §4.5); between the rich and the middle
    manifestation it cycles freely and reversibly through rungs 1 and 2 with no frontage change and no shell falling toward
    a poorer band (renovation may extend a shell, item 18); the middle band is each settlement's own (§4.5's per-town
    cuts) (J-A31.43). **What writes `builtBand`** (J-A31.44): generation (the plot's band at S10); a rung-3 event, to the
    band of the new stock (an `amalgamate` that builds nothing — a thinned rear row or a cleared plot returned to its
    neighbour — keeps the `builtBand` and `builtProsperity` of the member whose frontage anchor the joined plot keeps,
    §6.3's JOIN); rung 2's `densify … back_court`, for the rear plots it creates only (their new stock's band; the front plot keeps its
    own); the hand edits of rung 3's kind, each
    re-deriving the stock by the user's act — `rebuild`, `demolish` then `build`, `amalgamate`, `subdivide`, `fill`, a
    `replace` close-up (II.4) and a New random of the block — and the authorial re-derivations that re-derive the stock
    itself: a field brush's or a `FieldBands` `setAttr`'s re-derivation and `Adjust` (§7.2, §7.4 — a brush is how a user
    designs the town, so it re-derives its scope to the current band; the floor governs wealth change over epochs); and a
    **completed upward refurbishment** — a `mutate` whose result meets a higher band's shape template raises `builtBand` to
    that band, so a renovated quarter keeps its floor (the owner's "refurbished housing"). Nothing else lowers it: rungs 1
    and 2 never lower a standing plot's `builtBand`, and wealth change over epochs lowers it only through rung 3. Regenerate
    (keep settings) keeps it (a recorded input, §2.8); a member a split `resurrect`s takes it from the rung-3 event that
    re-cut it, not from its tombstone (§6.3); a document written before the attribute existed gets `builtBand` = its plot's
    `DerivationRecord.band` and `builtProsperity` = its recorded sample, exact for every document without an epoch (§7.5).
    The floor draws no random numbers. With no epoch the manifested band equals the field band everywhere.
  - **Lineage survives, so the seed survives (J-A31.48).** Fusion and splitting continue lineage by §6.3's JOIN and SPLIT
    rule (J-A31.73), an undo returns the former plots exactly (§7.4), and only a re-derivation takes fresh lineage (§6.3; the
    owner: "It's not new rerolls its modifications and variations to the original seed").
  - **The epoch's order** (the engine's loop on the base's path; V06 §3.2's table gives the full twenty steps with the
    engine's own). Before S2: the rung profile and the epoch's product are read at the epoch's population target (*The
    rung at an epoch*, below), the dials' applied standings and shares move past their hysteresis (*The dials' inputs over
    epochs*, below) and `TradeFlow` is re-read from the epoch's trade slice on the current geometry (§4.3; item 77). After
    S2's delta demand: (a) S6 re-evaluates the drivers and the bands — the previous epoch's buildings casting in the
    daylight term (item 102 (e); V06 §3.4) — re-bands every live plot's `fieldBand` against its own column by §4.5's rule
    (§2.5; J-A28.29) before any rung reads the field band, the former values in the epoch's undo record, and marks the due
    blocks; the product's participants registered at `afterField` run here, before (b); (b) the use step (item 17, below)
    closes, opens and relocates uses; (c) when the target fell, the roster's suffix leaves in reverse ordinal order — a
    building whose household count falls but not to zero takes a `relet` down (an unstored plan rung `stale`, a stored plan
    re-cut in the event) and `vacate` fires only when its last household leaves — save at a locked or pinned dwelling a
    dossier population fall emptied (§7.7's precedence), whose last household leaves by a `relet` down to 0 and which is
    never vacated (§13.2's T20-15); which dwellings empty is decided by the
    evolution engine's departure matching (V06 §3.5.1: the roster's suffix matched to exposure-weighted dwellings by band),
    and the strike pool (below; V06 §3.5.2) strikes fabric only, by its exposure (item 28 (f) with item 8; J-A28.45); the participants registered at `decline` run at its end; (d) the ladder runs its rungs on the due blocks
    under the churn cap; (e) the dossier events that arrive with the epoch's inputs (`EpochInputs.dossier`, in the host's
    order) are applied here as mutations at that epoch — S10b's `dossier` request and S11's mutator on the current map
    (§4.7, §7.7; item 22 (e)), never a re-roll (J-A22.42); where the epoch's product declares `ProductDecl.records`, each
    `assign` it places — a record it adds, a member a count step adds, or the greater a REPLACEMENT re-key places new (V08
    §3.5.1 (c), (d); a re-key whose greater keeps the lesser's thing is a `rebind`, never offered) — is first offered to its
    `place`, a declined record taking §7.7's *One path* placement, and its `remove` is called after §7.7 item 2's removal of
    each record it removes (item 202); (f) siting places the delta in the regrowth-first order below, from its step (0) — a
    `relet` up in a standing shell before `reoccupy` of a vacant one (J-A28.45) — or, where the epoch's product declares a
    `siting` phase override, that phase; (g) a residual grows a stage (S5), or the product's `growth` override; the
    participants registered at `afterGrowth` run after (g) and before (h); (h) every live placement rejection (§7.7's
    record, item 20) is re-checked by §7.7's lapse rule (J-A20.74, J-A20.41), the epoch writing `lapsedAt` inside its own
    touched set, and a lapsed site is eligible again from the next placement on; (i) the **character step** (item 72):
    §4.5's S12c on the grown town — each district's character vector, identity (past its hysteresis, re-typing a kind its
    identity row names) and band range re-derived, the clamped excess added to its pressure, a district whose identity
    changed renamed by §6.3's epoch case (§4.5 (8)–(9), §10.4) — and `TradeFlow` re-derived on the grown geometry (§4.3);
    (j) every physical change of steps (a)–(g) is shown on the ground by a Works started inside the epoch's span, and every
    Works that finished more than `works.retainWeeks` before the previous epoch's week is retired (*Works*, below; item
    67). Participants run in (order, id) order, each run's ops one batch of the `epoch` event, called with V06 §2.1's
    `ProductEpochContext`, each returning no ops outside its scope. Each step's events cite the epoch; the whole is one
    `epoch` event's fold (§7.4). A dossier event between epochs is applied at its own log position by the same request and
    mutator (§7.7); a dated one — between epochs or carried by an epoch — keeps its `dossierChange` (§7.1, item 75) and
    starts its Works at the change's week.
  - **Regenerate, Adjust and the derivation record.** A transformed entity's `DerivationRecord` is updated; every other plot
    keeps its record, so "Regenerate (keep settings)" on an untouched block reproduces it byte for byte, and re-deriving it
    with the new field is the explicit `Adjust` (authorial, above). Siting across epochs places only delta demand, in the
    regrowth-first order below.
* **Test (M4).** On a town with walled, ribbon and suburb regimes, adding a stage re-rolls 0 survivors, adds ≥ 1 primary
  when its gate law asks for one, and replays from the log to the session hash. The ladder's, the floor's and the epoch
  order's hook tests are §13.2's (item 31), as are the Works', the clock's and the character step's (items 67, 72 and 76).

**Conversions** are typed plat operations with recorded events. `ConversionOp` is defined here, once, as one union: the
base's own kinds, the ladder's (`LadderOp`, item 31, the Survivors rule above), the decline hooks' (`DeclineOp`, item 8,
below), the use step's (`UseConversionOp`, item 17, below), the terrain and water conversions' (`TerrainWaterOp`, item 25,
below), the passage sealing's (`HiddenOp`, item 30 (e), below), the underground's own kinds (item 65: the buried old
town's `RaiseGrade`, II.7.6, and the undercity's `ClearUndercity`, II.7.5, declared there) and the evolution engine's
(`EvolveOp`, file f item 209, which V06 §2.8 declares). The `convert` event of §7.1 carries it, and `build` below is
§7.1's `build` event:

```ts
type ConversionOp =
  | { op: 'wallToWay'; enceinte: Id; widthCm?: Cm } | { op: 'gateToJunction'; gate: Id; square?: boolean }
  | { op: 'outskirtToDistrict'; region: { ring: Polygon; key: PlatKey } /* the outskirt faces it covers; no stored slots, §2.2 rule 5 */ } | { op: 'demolish'; id: Id }
  | { op: 'rebuild'; building: Id; cls: BuildingClass /* the whole replacement a ruin or a redevelopment calls for (rung 3), never a designation change (§4.7 S11) */ }
  | { op: 'build'; plot: Id; cls: BuildingClass; footprint?: PolygonCm /* as §7.1's build event */ } | { op: 'carve'; kind: 'canal'|'moat'|'harbour_basin'; polygon: Polygon }
  | { op: 'abandon' | 'decay' | 'ruin' | 'robStone' | 'clear' /* removed to a footprint trace */; building: Id } | { op: 'plotToGarden'; plot: Id } | { op: 'contractWall'; enceinte: Id; trace: Polygon }
  | LadderOp | DeclineOp | UseConversionOp | TerrainWaterOp | HiddenOp | RaiseGrade | ClearUndercity | EvolveOp;
// EvolveOp as V06 §2.8 states it — absorbWall, downgradeWay, upgradeWay, burn, wearWall (item 114), repairWall { enceinte,
// stretch?, material? }, retypeLand, repairRaised, repairRetaining — each usable by hand through `convert` (§7.1) with an
// undo record (§7.4) and the cause `convert:<op>`; a hand repair of stone that is gone bends (item 101 R2) to a new
// stretch or part on its line
type LadderOp =                                                                            // item 31's rungs (Survivors, above): each a mutation with an undo record (§7.4), usable by hand (§7.1)
  | { op: 'relet'; building: Id; households: number /* rung 1: the household count the roster fills, within §2.6's capacity (J-A28.23) — 0 only at a locked or pinned dwelling a dossier population fall emptied (§7.7's precedence; §2.6's clamp); a stored plan is re-cut inside this event, an unstored one goes stale and is re-cut on the click, both along §2.6's interior ladder (§7.3; item 28 (f)) */ }
  | { op: 'densify'; plot: Id; as: 'infill' | 'back_court' /* rung 1: sheds, hovels and a workshop in the yard, the garden built over; rung 2: rear plots in the yard reached by a new passage (§4.6, item 30) */ }
  | { op: 'thin'; plot: Id; what: 'infill' | 'back_court' /* the inverse: infill cleared and re-gardened (§4.9) after its uses relocate and its households are re-homed (item 17's relocation, or a `relet` up in a standing shell within §2.6's capacity) and its buildings vacated; a back court likewise, its passage sealed */ }
  | { op: 'subdivide' | 'amalgamate'; plots: Id[] /* rung 3 only, on vacated plots: S10 (7)'s law in its incremental form — the due block re-cut with its neighbours fixed; §7.1's plot split and join are the hand forms */ };
```

**`wallToWay(enceinte)`** is `retypeEdges(ChainRef('wall', enceinte), add ('way', the new ring road), remove 'wall')`: the
wall chain becomes the spine of a `primary` way with a ring-road width, on the same edges; the wall strips' setback and
glacis lines are removed, so the strips merge into the faces beside them, their band, tower and gatehouse faces are cleared
with the rest of their finer content, and S9's `corridorUnion` re-derives the ring road's corridor there; towers are
removed; gates become junctions with a `square` option. A barrier arc the wall left unwalled (§4.4) carries no way. **Clearance
(GEO-38):** the new corridor needs half its width on each side of the old wall line; where the half-band plus setback on a
side is narrower, plots meeting the new corridor are clipped along its edge — a plot keeps its id when its frontage anchor
survives (O8 g), and footprints that no longer fit are demolished with lifecycle events (cause `convert:wallToWay`).

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
  where they met the new water at ≥ 30°, extended from the cut end to the new bank as a quay or a landing. A raised way the
  channel passes under keeps its course; a support the channel meets is re-sited by §2.7's support step (item 244).

**Other crossings (J-I13).** A wall trace that `S` crosses has its **run** — the trace between the nearest unaffected towers
on either side of the crossing — re-traced as data in the dry run, with a water gate where the channel crosses, as §7.3 (b)
2 re-traces a run a moved river crosses. The stretches of the run's strip lines alongside it — the inner setback line, the
glacis line (or the moat's inner bank, which is water and stays) and, where the era row has one, the intervallum — between
the feet of the perpendiculars from the run's two end towers leave with the old run, and S7's operator re-cuts them along
the re-traced run from those feet (batch (3)). Every way the re-traced run's new strips — the new run ⊕ (half its band + its
setback, and + its glacis or berm on the field side) — will meet, other than a kept way through a gate of the run (whose
corridor ends each strip, §4.8), takes the `cut` fate at the strip's boundary, as `drawWall` cuts the ways its new strips
meet (§5.2, §7.4), and every plot inside the new strips is re-derived with the rest of `R`. A locked or pinned way, wall or
finer entity, or a reservation, inside `S` or inside a new strip returns to the dry run as an F-EDIT conflict (lock > drawn
geometry; Re-derive from S3 offered for a reservation, §5.2), as for S1's water operator.

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
removes no edge a kept face uses (no `E_KEPT`); inside `R`, S10 gives every plot an access edge by construction (O5 a), and
S8's deep-interior rule and F-PLOT's alley rung act as in any block. The wall-crossing fixtures are §13.1's and §13.2's.

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

**A cut way's far part — the records that name a way (J-Fpipe-2).** When the carve's batch (1) hands a cut way's far part
to a new way by `retypeEdges`' `rekey` — and S1's water operator, which cuts ways the same way (§7.3 (b) 3), likewise — the
rekey moves the far part's role rows, knot rows and vertex role rows and no record (§3.4), so the same batch **re-points
every record that names the way by id along the far part** to the new way: the `Frontage` records of the blocks along it
(`Frontage.way`, §2.5), `Bridge.way` of a built deck there, `Gate.way` of a gate there (§2.7), the `Greenery.along.way` of
its avenue and street-tree rows (§4.9; §2.7), `Junction.arms` at its junctions (§2.4), `Tunnel.follows` of a main beneath
(§2.7), and the `SeamEdge.chain`, `Portal.wayId` and `SeamAmendment.spine` entries of the `Seam` records that name it
(II.1). Those records lie outside the footprint `R` and change only by that id: this is the carve's **identity exception**,
which the locality oracle admits beside the seam exception (§7.3 item 1, item 7 (ii)) — every such record equals its prior
record except that the new way's id replaces the old, and every other entity outside `R` stays byte-identical. The part
keeping the old anchor keeps the old address and the far part is keyed by §6.3's SPLIT rule (§7.3 (b); J-A31.73,
J-A11.43); it **keeps the parent's name
and naming record without a draw** — a street a canal severs is one street on both banks, so S13a draws nothing and its
label candidates for the new way are built inside the carve's S13a delta (§7.3 item 2). A `Frontage`'s `class` and
`lengthCm` are unchanged (the class is the way's and moves with the rekey). The carve's undo restores the one way and every
re-pointed record (§7.4). *Test (§13.2, with §13.1's carve fixtures):* after a canal that cuts a `lane` and a `secondary`,
§5.3's reference-integrity row holds on every record that named either way, 0 records outside `R` differ from their prior
other than by the new way id, and both parts of each cut way carry one name.

**Coherence from one seed (owner).** Epoch N+1 is derived from epoch N's persisted state, the inputs and the seed's epoch
sub-stream `…/epoch=<n>`: the same town under different inputs has different histories, under the same inputs the same
history, and nothing that survives is re-rolled, because a survivor keeps its lineage and its derivation record (§6.3,
§7.3).

**The evolution engine is the owner's staged stage (DEF-8; V06, M6-E); its hooks are concrete now.** The owner's history —
growth, regression and growth again: houses emptied and robbed for stone, plots turned to gardens, a shorter wall ring
inside the old one, ruins left standing — is expressed with the base's own records: the transformation and conversion kinds
above (`abandon`, `decay`, `ruin`, `robStone`, `plotToGarden`, `contractWall`, the ladder's `LadderOp` and the `DeclineOp`
kinds below), which a user can also apply by hand in the base (§7.1); the lifecycle history on every entity; the epoch
streams; the circumstances timeline (§7.7); and the sequential roster (a population fall selects its suffix in reverse
ordinal order; the decline table's exposure function, below, chooses which buildings empty). A ruined building keeps its
footprint and heights and draws with the ruin program and the `none` roof kind (§2.6, §8.2). The engine plugs in behind one
phase interface:

```ts
interface EpochInputs { week?: number /* item 76: the absolute week at the epoch (The clock, below) — a dossier-bound map's from the dossier's own stamped ticks (The clock (1); item 125); absent on a standalone call, then the previous week + round(52 × years) */;
  years: number /* derived from the weeks: (week − the previous epoch's week, or the creation week) ÷ 52, a fraction allowed */; populationTarget: number;
  circumstances: CircumstanceSlice /* §7.7 layer 2 */;
  events: { week?: number /* the event's own week in (the previous epoch's week, week]; absent: drawn in the span (V06 §3.11.1) */; kind: string /* a hazard row's kind, or 'calamity' */;
    params?: Record<string, number> /* overrides of the hazard row's defaults */; calamity?: CalamityRef /* kind 'calamity': the dossier's calamity as the port carries it (V08 §3.6) */ }[];
  dossier?: EditEvent[] /* the host's dossier events (author 'host', EditBase.dossier set), in the host's order, applied at step (e) (§7.7 item 6); each keeps its EditBase.dossierChange (§7.1, item 75) */;
  wealthLevel?: number /* file f item 343: the intent wealth level at the epoch (§7.7 layer 1) — a dossier's wealth.label through tables/dossier/wealth (DR6), or a standalone trajectory's; absent: the level in force; applied past dial.hysteresis before S6 (V06 §3.3.5) */;
  advance?: { group: string; index: number; of: number /* the planned count */; stoppedAt?: number /* on the group's last epoch only, when Stop ended it early: the count actually folded */; trajectory?: Trajectory /* index 0 only; V06 §2.3 */ } /* file f item 343: the provenance of an epoch an advance request appended (V06 §2.3) */;
  replay?: { index: number; of: number; fromYearsAgo: number; toYearsAgo: number; events: ReplayEventRef[]; destruction?: ReplayEpoch['destruction']; refound?: ReplayEpoch['refound'] } /* item 113: a replay epoch's provenance (V06 §2.14 declares ReplayEventRef and ReplayEpoch) */ }
interface CalamityRef { id: string; name: string; type?: string; severity: 'minor'|'moderate'|'major'|'catastrophic'; targets: Id[] /* the uses bound to the institutions it marked ruined (§7.7 F5) */;
  deaths: number /* its deaths, 0 when none are given — the burial input of the catacomb growth (II.7.6) */ }   // typed by V06's calamity table (DR28)
interface EvolutionStrategy { id: string; phases: EpochPhase[] }   // registered by name in StrategyRegistry.evolution (§4.12); EpochPhase, EpochParticipant, EpochContext (extending ProductEpochContext), EpochOps, HouseholdLedger, EpochScope, ChurnLedger and EpochStep's twenty steps are V06 §2.1's, in V06 §3.2's order
```

**The runner** (in `@plat/edit`'s fold) runs, for each `EpochStep` in order, the phase for that step — the override the
epoch's product declares in `ProductDecl.phases` (`siting`, `growth`; the product the fold gives at the epoch, *The rung at
an epoch*), else the strategy's; a step for which neither registers a phase runs nothing — and then every participant
registered at that step (`ProductDecl.participants` included), at every epoch whatever its product, each scoped participant
returning no ops outside its product, rung or state, in (order, id) order, committing each one's ops in the order given as
single-level batches of the one `epoch` event. The base registers **`'grow-by-stage'`** — the path above — with the phases
`prelude`, `demand`, `field` (without the building mask), `dossier`, `siting`, `growth`, `lapse`, `character` and `works`:
the base's steps before S2, S2, (a), (e), (f), (g), (h), (i) and (j), built once in `@plat/edit` and reused by any strategy,
reproducing the path above byte for byte. V06's `'history'` strategy implements every step of V06 §3.2's order: it
reuses the base phases `demand`, `dossier`, `lapse` and `character`, wraps the base parts of `prelude`, `field`, `siting`,
`growth` and `works` with its own acts, and adds its own phases at `hazards`, `uses`, `departures`, `decline`,
`fortification`, `terrainWater`, `raisedWays`, `ladder` and `close` (V06 §3.1 (2)); participants run at `afterField`,
`decline` and `afterGrowth`. Before V06 lands, `grow-by-stage`
consults a product's two overrides and runs its participants at the call points of the epoch's order (above), called with
the `ProductEpochContext` the grow path fills (item 202; V06's `EpochContext` extends it at M6-E, item 317). The base builds
and tests exactly one path — **add a growth stage to an existing town** — at M4 (G-P13), because it is the same path
"regenerate this area" uses.

**History-first generation (item 113; with V06's replay engine, V08's history reading, V04's buried ruins and lost access,
V07 at village rungs, V11's rows; built with M6-E).** A settlement with a known history is generated as its past and aged
to the present.
1. **The peak.** Built extent follows the high-water mark: SettlementForge's `peakTier` or its high-water population when
   present (`HistoryHint.peak`, §2.7, filled by V08); standalone, the blueprint's history option ("once a city, now a
   village", §4.2 S0) gives it. Where SettlementForge wrote no `peakTier` but the dossier shows the place once stood higher,
   the map uses the **effective peak** (item 113 (f)): the higher tier itself, treated as the peak for everything the replay
   builds, sized at `history.symbolicQuantile` of that tier's population range (V11; default the range's lower quartile),
   every fact it sizes carrying provenance `symbolic` (§2.8). The evidence, strongest first: `tierHistory`'s from-tier on a
   demotion; the maximum of `populationHistory`; losses in `calamityHistory`; institutions of a higher tier still listed as
   ruined or remnant (a village holding a ruined "City walls and gates" or a remnant cathedral was once larger); a
   resettlement after a terminal death (V08 reads them). With no evidence of a higher tier there is no peak, and the
   history's events are soft hints only — §4.2 S2's stage count, the catacomb age, the buried old town — as without replay.
   The symbolic peak only sizes the remnants the replay leaves (the extent of old walls, streets and ruins) and never
   contradicts a present dossier fact; SettlementForge's own rule (never infer a peak) is untouched — this is the map's
   derivation (item 20 (h)), never written back.
2. **The replay.** Generation runs S0–S13a at the peak's population — or at the founding's, with the growth to the peak
   replayed, when the history starts there — then V06's engine runs the recorded history as coarse epochs of
   `history.epochYears` (V11; the owner's default a decade) from the founding or the peak to the present, each on this
   section's path: growth; the events, each mapped to its epoch by V11's event-to-epoch rows (a great fire burns and rebuilds
   a quarter; a great flood raises the grade, II.7.6; plague years and a trade collapse empty the edges; an occupation leaves
   a citadel; a pilgrimage surge adds hostels); decline to the present population, each epoch's target from
   `populationHistory` where given, else interpolated from the peak. The dossier's present facts are met exactly at the end
   (item 20: history shapes only what the dossier does not say) — the present population by the roster, the present
   institutions by the last epoch's dossier step (e). The replay's epochs enter the log as the creation prefix (flagged
   `creation`, never undo targets, §7.4), so the document replays them and its current week is the present's; they draw on
   the concerns of the stages each epoch runs, keyed with the replay's own epoch component (§6.1 *The history replay*:
   the range reserved to the replay), so the replay is deterministic from the seed and the history and no replay draw
   equals a live epoch's; they run inside
   V06's stated generation budget (coarse epochs, detail lazily under §4.1's contract); and the replay record (V06) is what
   the clerk tells the story from ("the walls were built when this was a city of twelve thousand"; for a symbolic peak "its
   exact size is not recorded", V10).
3. **The result carries its past** by the decline ladder and the persistence order: walls far beyond the houses, abandoned
   street lines kept as tracks and field boundaries, a church too big for today's congregation, a market square too large
   for its market, empty plots, roofless and ruined buildings.
4. **Destruction and refounding (item 113 (b)).** Where the history says the place was destroyed outright
   (SettlementForge's terminal death and resettlement, a catastrophic event, or an ancient "Fall of" event on the site), the
   old settlement's geometry becomes ruins — every building `ruined`, every way a trace — and the new settlement, a hamlet,
   village, town or city (V07 at village rungs), is generated on top: its route costs favour the old roads, gate gaps and
   bridges (the lattice's `existingFabricCost` pricing a ruined way at V11's `history.reuseCost`), it builds on old
   foundations first (`reuse … build`), quarries the ruins for stone (the salvage ledger, below), and may follow a different
   plan and culture (the history's culture rows); the old plan persists wherever it helps.
5. **Surface or underground (item 113 (c)).** Ruins younger than `history.burialYears` (V11; default a century, shortened by
   floods, river silt and rebuilding on top, lengthened on bare rock — the table's factors) stand on the surface; older ones
   are buried and become II.7.6's **buried former settlement**, derived from the former geometry — its streets, walls and
   major buildings at their old ground level — distinct from item 109's ruins of an older civilisation. Access to them
   follows item 109 (j) and is lost when its link closes (item 113 (e); II.7.4, V04).
6. **Sewers reopen (item 113 (d)).** Growth over closed sewer runs reopens them before new ones are dug (V04's J-V4.29), in
   the replay as in the live epochs.
7. **Edges and bars.** A history whose founding lies after its present (bad data) replays nothing and is reported; a peak
   below the present population is no peak; a peak above the rung table's top is sized at the cap (§1.1). With the replay
   off (`history.replay` false, the parity presets) generation is byte-identical to the base (a no-op pin). The bars are
   §13.2's (item 113 (g)).

**The clock — weeks (item 76, with item 67's Works; owner: "our simulator advances by units of one week").** "Our
simulator" is the clock that changes the map's inputs — the host's (SettlementForge's, read only through the dossier's
stamped ticks, item 125) or the staged evolution engine's —
never `@plat/sim`'s `time` view key, which changes nothing (§10.3; J-A76.41).
1. **The week.** The map's time is an integer week, in SettlementForge's own weeks — no conversion; never
   `elapsedMonths`, never `history.age`. A dossier-bound map's present week is the dossier's own latest stamped tick — the
   greatest of its conditions' `triggeredAt`, its calamities' and its history's ticks (item 125 (a), (b)), never the
   campaign's calendar or any host input; with none, the clock starts at week 0 and the user's season control sets
   the year position (§2.9's `yearWeek`: midsummer, week 19, by default). Its creation week is the present week of the dossier it is
   created from; a standalone map starts at week 0. `EpochInputs.week` is the absolute week at the epoch and `years` is derived
   from it (above); a standalone `grow` call that gives `years` only takes the previous week + round(52 × years) and
   re-derives `years` from the whole weeks, so every reader sees one clock. A dossier event carries its week in
   `dossierChange.week` (§7.1, item 75). The document's current week is derived — the week of the last folded event that
   carries one — never a stored counter (§2.9), and each epoch's week is its `EpochRecord`'s.
2. **Dating a dossier change.** The port (§14) dates each change it finds by the first of these rungs that gives a week: an
   explicit tick on the change's receipt (`foundedAt.tick`; lifecycle `institutionHistory[].tick`;
   `populationHistory[].tick`; `activeConditions[].triggeredAt.tick`; campaign-era `historicalEvents[].tick`;
   `decrees[].tickRef`; `calamityHistory[].tick`; `previousGovernments[].tick`; a news tick; the provenance ledger's tick),
   then the week suffix of the change's outcome id, then none: a change with no week applies
   finished, with no Works (§7.7 item 1 reads these rungs; the port counts an undated change in its report).
3. **The season — one calendar (J-A76.42).** `CalendarRow` gives the week of the year, `floorMod(week, 52) + 1` (the floored modulo, so a negative week of the
   replayed past maps into 1 … 52; V06 §3.20.3), and its season:
   a dossier-bound map reads the row `sf445` (52 weeks; four seasons of 13 weeks from spring; month ends at weeks 4, 8, 13,
   17, 21, 26, 30, 34, 39, 43, 47, 52), a standalone map our own default row, shaped alike (month ends 4, 9, 13, 17, 22, 26,
   30, 35, 39, 43, 48, 52). The Works' pauses (below), §8.2's season rows for a dossier-bound map's week and the simulation module read
   it; no second calendar of weeks and seasons exists (`tables/dossier/calendar`, §14; the module's day schedule is §10.3's).
4. **The cadence.** The port folds a dossier's discrete changes as standalone dossier events at their weeks, in
   SettlementForge's order (decrees first), and an `epoch` at each 52-week boundary crossed — or sooner, when the dossier's
   population has moved from the last epoch's `populationTarget` by more than the **roster tolerance**, ± 5 % (J-A76.43; the
   one number §7.7 item 3's lapse reads too) — carrying the target, the circumstance slices (§7.7 layer 2), the event kinds
   and that week's dossier events in `EpochInputs.dossier`; a catch-up batch follows the same rule, gaps allowed, coarsened under item 119's comfort level by V06 §6.8 (6) (every
   dossier event still at its own week). No epoch
   is folded per tick: the Works' stages are derived from the week at any drawing (below). A standalone map's epochs are its
   circumstance timeline's (§7.7, dated in weeks) or a user's `grow` calls.
5. **Rates per year (J-A76.45).** Every chance this section states per unit of time is per year, applied over an epoch's
   span as `1 − (1 − p)^years` through `dmath` (§6.5 (3)); dwell bands and ladder durations are in years read as weeks ÷ 52;
   the churn caps scale by `years` (above) — so epochs a few weeks apart and one a decade long change the town at the same
   rate. II.6's island slots follow the same rule.

```ts
interface CalendarRow { id: string /* 'sf445' — the dossier's; 'plat-default' — ours */; weeksPerYear: 52;
  seasons: { season: 'spring'|'summer'|'autumn'|'winter'; fromWeek: number /* week of the year, 1-based */ }[]; monthEnds: number[] /* twelve week-of-year ends */ }
```

**The rung at an epoch (item 81 (b); J-A81.41).** At each epoch the rung profile is read at the epoch's `populationTarget`
(§1.1's ladder): a crossing of one of §1.1's bands changes the rung's row — its granularity, greenery, layer and budget rows
— for everything the epoch builds from then on, and the standing fabric survives exactly as it survives a growth stage
(§6.3). **The product at an epoch** is the fold of V07 §2.1 (the hand-off band `handoff.band`, default 5 %): a
village-product document passes to the base product at `1 500 × (1 + band)` and back below `1 500 × (1 − band)` (item 322),
and a population of 0 at a registered village product's rung routes to THORP and V07's desertion (V07 §3.12; item 202). A
crossing upward whose town the frame no longer holds grows the frame to the one §3.2 (9) gives the new target: S1 derives
terrain, water and the hinterland's ground on the ring between the old margin and its successor — the same terrain field
continued, each water body continued across the old margin with its inner reaches fixed — and the kernel grows the frame by
§3.2 (9)'s single-level batches over one clear region (J-A81.31) — an L1 batch clearing the finer content of the whole L1
faces beside a lapsing stretch of the old chains or under the new rectangle, an L0 batch replacing the `margin` chain, an
L1 batch replacing the `border` chain — each raster growing by whole cells as §3.2 (9) states, every stored height unchanged
and the flow fields recomputed over the grown grid. The pipeline then continues on that region and the ring: S4 continues
every through-road from its old end to the new margin, S12a sites the hinterland on the ring; the stages that own the
cleared faces re-derive them (the hinterland unit for the hinterland's, a district's S8–S12b for a district's; on each
underground part §3.2 (9) grows, that part's stages for its cleared faces — part 0's network stage its bands by
`corridorUnion` (II.7.2) and II.7.3's stage its plots, each other system's stage (catacomb, cavern, quarry, vaults, ruin)
its own part's bands (II.7.6) and II.7.5's stage the undercity's plots there; on the `buried` and `dug` parts, which no stage
re-derives at an epoch — a buried town, laid from a history scar or the replay at generation or made by a `raiseGrade`, and
the passages access edits and undercity lifeline closures dig — their cleared bands re-laid from their kept gallery chains by
`corridorUnion` (§3.7), which draws nothing); every face outside the region, off a deleted stretch and off the ring keeps its
ring, owner and nested faces. The frame never shrinks: a declining town keeps its frame and its hinterland. II.6's island
gate is one reader of the rung. A dossier above the 120 000 cap is refused by the port (§7.7 item 15, item 81; §1.1;
J-A81.01) and never reaches an epoch; a dossier below 1 500 is routed to the village product when one is registered (V07
§2.1, V07 §3.11), else refused (SCOPE-C01); so §3.2 (9)'s clamp of the frame's target at the cap serves only growth that carries
no dossier.

**The dials' inputs over epochs (items 72, 78 and 79).** At each epoch, before S6 re-evaluates the drivers, a power's
applied standing (`PowerStanding.appliedStanding`, §7.7 layer 2) moves to the epoch's standing, and a sector's applied
share to the epoch's share, only when they differ by more than `dial.hysteresis` (0.05, a dial-table row); both are folds
over the epochs' slices in log order, so a replay reproduces them and §4.5 (6)'s dials follow the dossier's powers and
economy without flickering at every small move.

**Uses across epochs (item 17) — the hooks now, the engine's step later.** A **use** — a shop, workshop, inn or institution
— is its own record (`Use`, §2.7), separate from the buildings that house it: a building references its current use or
none (vacant) and keeps `formerUses`, so a use can close in one building and open in another while the building persists —
vacant, re-let or converted. The base builds the hand path: the conversion kinds below, applied by a `convert` event (§7.1)
— `openUse` on a vacant plot or building (the building mutates to the designation by §4.7 S11's operator), `closeUse` (the
building stays, vacant — the first state of the decline hooks — or converts to a named designation), `relocateUse` (a
`closeUse` here and an `openUse` there under one event, `detail.from` and `to` on the use's lifecycle event, §2.8;
`swapUse` is two relocations) and `mutate` (§4.7 S11) — each with its undo record (§7.4) and reported to a host (§11.3). The
staged engine's **use step** runs at each epoch after the roster's delta demand and before siting, as the same events:
(1) **re-score** — for every use, §4.7 S10b's solver scores its present plot and the best alternative within its catchment
(the district and its neighbours, `serviceRadiusM` of §10.2's `useRules`) against the current field, distribution and
supply links (the links re-bind as members open and close); (2) **inertia** — a use moves only when the alternative beats
the present plot by more than the row's `inertia` and the row's `moveChance` draw falls (the `use.relocate` concern on the
use's `…/epoch=e` stream, §6.1), closes only when its catchment's demand (the households within its radius against the
roster's ratio) has been below `closeShare` for `closeAfterEpochs`, or a hard supply edge has had no provider in reach for
`starveAfterEpochs`; a dossier-backed use never closes by this rule (*Dossier content across epochs*, below); new demand
(the roster's suffix) opens uses where the solver scores best — a closed shop's coverage gap raising the pull that reopens
one where people now are (item 103 (f)) — so markets and shops drift toward where people live and inns toward the busiest
gate, by distribution, never by a fixed order; (3) **cap** — at most the churn cap's `use` share of a district's uses
relocates per epoch; (4) **assignments** — a host or owner assignment is a stable identity that moves with its use under
the same rules unless `pinned` (§7.7, item 20 (g)), in which case it stays and the town adapts around it; every change is
reported; (5) **traces** — a vacated building keeps its former use in `formerUses`, which a later opening prefers (a former
inn reopens as an inn first; a dossier element whose assignment returns to `active` reopens in its former building first,
repaired by a Works when the change is dated — item 80, §4.7) and the naming engine may read (§10.4); (6) **concealed uses**
— a concealed use (item 63) relocates by these rules like any use, and its front stays an ordinary business (§4.7). Uses
are visited in address order; one seed and one circumstance timeline therefore give one history of openings, closings and
moves; households and postings follow (§10.3).

**The epoch-spread mutation (item 18 (c), (e); file f item 266).** Across epochs a designation change is not applied at
once: the engine issues §4.7 S11's `MutationRecord`, **decided once at the creating op**, as a sequence of `mutate` events
each applying its own parts of that record, due at the evolution table's `mutation.stepYears` rows (V06 §2.2) — first
occupy, when the present design is compatible (every kept part, nothing added; an always-crypt target's crypt basement
exempt and laid then); otherwise the use opens at the first step whose result is compatible, a relocating use staying at
its former site until then; then adapt; then extend (the adds); and rebuild only the parts that cannot be adapted — the
same steps and the same draws, spread in time, so a smith moving into a richer street mutates toward the richer template
over epochs. A plan cancelled because its use left keeps its done steps; when the building next takes its former
designation, the mutator's record inverts the done steps (item 18 (e)). Each of those events applies and records
its step at once, and a Works shows it on the ground over the weeks it takes (*Works*, below; J-A67.49), so the model
never changes between events.

**Dossier content across epochs (item 20; J-A20.75, J-A20.43).** No step of an epoch closes a dossier-backed use (its
assignment's `existence: 'dossier'`, §7.7 item 2) or leaves one without a building; only a dossier event the epoch applies
at step (e) removes, adds or re-designates one (§7.7 item 2). The use step never closes one: where its catchment or its
supply fails, the use relocates to (1)'s best alternative by the solver's `dossier` request — its first closest option
where no plot passes the hard rows (J-A20.71) — or, where its catchment holds no candidate plot, stays in its building; its
moves by (2)'s inertia rule are any use's. Before any other step would empty or remove the building that houses an unpinned
one — a redevelopment's purchase, step (c)'s `vacate`, the strike pool's strike, the growth step's declared `demolish` or
corridor re-cut, a carve, `wallToWay`'s clearance, `contractWall`, a terrain-and-water repair, `fallIsland`, a tunnel's
closing (II.7.3) or a passage's sealing — the use is first relocated the same way inside the epoch, a `relocateUse` citing
the epoch and counted outside the use cap, the request's scope its catchment less the plots that step empties or removes,
widened to the town where that scope holds no candidate plot; a pinned one keeps its building, which the step treats as it
treats any pinned entity (§7.2). So the dossier element is live and placed at every step (§5.3's row). A dossier-listed
ruin (`Assignment.state` `ruined`, §7.7, item 80) is present as its ruin — its use closed, its building `ruined` — and no
step repairs or clears it but a dossier event; a reopening returns its use to its former building first (above).

The kinds these steps use join `ConversionOp`:

```ts
type UseConversionOp =
  | { op: 'openUse'; plot: Id; to: Designation /* §4.7 S11 */; building?: Id; assignment?: Id }
  | { op: 'closeUse'; use: Id; leave: 'vacant' | 'convert'; to?: Designation }
  | { op: 'relocateUse'; use: Id; to: Id /* the destination plot: a closeUse here and an openUse there under one event */ }
  | { op: 'mutate'; plot: Id; to: Designation; spread?: 'now' | 'epochs' /* §4.7 S11's operator; 'epochs' issues its steps over the ladder's durations */ };
```

**Decline and regrowth (owner, 2026-09-25: "growth, regression and growth where appropriate"; AM-8).** Regression is growth
read the other way: the population target falls, the roster's manifest shrinks by its suffix (§10.2), and the fabric the
suffix leaves behind steps down a ladder of states over epochs — never re-rolled, never removed by arithmetic — until
regrowth reoccupies it. The steps are scheduled by the owner's staged evolution engine (DEF-8, above); the base carries now,
stated here once: the ladders, the decline table with its exposure function, the salvage ledger, the lag rule, the
regrowth-first siting order — which binds the built `grow-by-stage` path today — and the conversion kinds, each applicable
by hand (§7.1) and undoable (§7.4). The states are §2.8's and the style classes that draw them §8.2's; §6.3 holds the
identity rules, §13.2 the hook tests, §16 the price at M4.

* **The ladders** (§2.8's `Existence` value in brackets; every step is one conversion below, a lifecycle event with its
  cause). *Buildings:* occupied → vacant (`abandoned`: the use has left, the fabric stands) → derelict (`decayed`: roofless,
  `RoofSpec.kind 'none'`) → ruin (`ruined`: walls part-standing, the ruin program) → robbed or cleared (`cleared`: a
  footprint trace, its material in the ledger) → reused (`reused`: the trace, keeping its face, drawn as the garden, orchard
  or field it became — `Building.reusedAs`, §2.6 — or a successor building raised on the old foundations, which takes the
  trace's address, §6.3). Upward steps exist at every rung — reoccupy, repair, rebuild, reuse — and regrowth uses them first.
  *Walls and gates:* in use → neglected (`abandoned`) → breached or partly dismantled by stretch (`decayed` while any run is
  not `standing` — `worn` or `patched` (item 114), `breached` or `dismantled`: the run's `Enceinte.condition` profile, §2.7,
  item 575) → superseded by a shorter
  inner ring: `contractWall` traces and builds the new ring inside the old one through S5a's trace step and S7's operator,
  the old ring's record stays live with `Enceinte.supersededBy` naming the new one and its line persists as a trace — or
  becomes the ring road of the owner's original case by `wallToWay`. *Raised ways, retaining walls and decks* (V06 §3.19):
  in use → neglected → a span fallen or a stretch decayed → supports alone or ruined, their `state` fields (§2.7) written by
  `DeclineOp`'s members below. *Tunnels* (II.6's condition table), and the underground's galleries and chambers at the same
  persistence rate (II.7.5, II.7.6; item 65): in use → neglected, silted (`abandoned`) → partly caved in (`decayed`) →
  collapsed or sealed (`ruined`; `Tunnel.closure`), never demolished by the engine. *Islands* (II.6): floating → waning →
  settled → fallen. *Plots:* a plot whose last building is cleared or reused merges into a garden, orchard or field
  (`plotToGarden`) or into its occupied neighbour (`amalgamate`; §4.7 S10), so surviving households absorb the plots beside
  them and the plan coarsens where people are few — fewer, larger plots from loss, through the same merge operator as from
  wealth. Fields are their own layer: a struck farmstead's fields stay worked, their `LandUse.owner` passing to the nearest
  farmstead or to the commons.
* **The decline table** (`DeclineTable` in `@plat/tables`: an editable, versioned rule table with provenance, §7.6; our own
  rows, calibratable, §13.9). Its rows are tendencies — weights and chance, no fixed order (AM-23):

  | row | default | what it does |
  |---|---|---|
  | persistence rate per fabric layer | `use` 1.0 · `building` 0.6 · `plotBoundary` 0.3 · `street` 0.08 (decks too) · `wall` 0.05 · `raised` 0.05 · `retaining` 0.05 · `underground` 0.03 · `terrainWater` 0.005 | scales how readily a layer is struck: uses go first, then buildings, then plot boundaries; street, wall, raised-way and retaining lines persist longest; the underground slower still (AM-11); terrain and water slowest (AM-25's conversions are the rarest events) |
  | exposure drivers | kernels over the context vector (§2.5) with weights, §4.5's construction: extramural (the district outside the outermost enceinte, as S10b reads it) +; `terrainClass` low, damp or flood +; downwind +; near the noxious kernels of field pass 2 +; the intramural periphery (`dist.wall` small inside the enceinte, `dist.centre` and `dist.market` large) +; low `prosperity` +; the resilient core (`dist.market` and `dist.plaza` small; the attractors at churches, the precinct and the castle) − | where decline strikes first, as weights |
  | chance share | 0.25 of the exposure field (the prosperity field's is 0.15) | causes vary and chance plays a part |
  | dwell bands (years; each drawn once as its step's `decay` Works duration, *Works* below) | vacant → derelict [10, 30]; derelict → ruin [20, 60]; ruin → cleared on salvage demand only; walls, raised ways and retaining walls one band slower, tunnels two | the lag on the way down |
  | haul radius | 250 m | how far salvage travels |
  | exemptions | a locked or pinned entity is never struck; an assigned entity only through the use-relocation rule (AM-17); the building of a dossier-backed use only after that use is relocated (*Dossier content across epochs*) | the user's fixings hold |

* **The strike pool (the engine's step, V06 §3.5.2; the exposure function and the table are the base's).** For an epoch whose
  target lies below the manifest, the suffix leaves in reverse ordinal order as the epoch's step (c) states — a `relet` down
  while households remain, `vacate` at a building's last household (J-A28.45), save at a locked or pinned dwelling a
  dossier population fall emptied, which a `relet` down to 0 empties and which is never vacated (§7.7's precedence); which standing fabric then steps down is
  drawn without replacement from the pool of candidates whose dwell band has run — for a building, whose `decay` Works has
  run its span (*Works*, below; J-A67.46) — weight `w = E(x) · rate(layer) · u`: `E(x) = clamp(Σ_j v_j · kernel_j(x) +
  ε_E(x), 0, 1)` the exposure field, computed per epoch on §4.5's 32 m cells from the current context vectors and prosperity
  field with its chance share; `rate` the layer's persistence row; `u` a draw from the `epoch.transform` stream keyed by the
  entity's lineage and the epoch (§6.1; no new concern); the draw bounded by the churn cap per district and per epoch. An
  undefended suburb, a damp low quarter and the plot beside the tannery empty first as a tendency, the market core last, and
  a core house can still fall — a weighted tendency, not a law (J-A8.41).
* **Salvage — the material ledger.** `robStone`, `clear`, `dismantle` and `demolish` credit the town's `MaterialLedger` (§2.7)
  by the building's class-table yield (`salvageM3` per material, §10.2); `build`, `rebuild`, `reuse … build` and a repair
  (`reoccupy` from derelict) debit it by the new class's row from sources within the haul radius. The ledger is a flow
  record, never a hard constraint: a debit it cannot cover is built anyway and the shortfall is reported (J-A8.45). Its mark
  on the map: the strike pool's weight for `robStone` and `clear` is multiplied by the salvage demand within the haul radius
  — the standing debits of planned building, repairs and a new stage's footprints — so cleared zones appear beside active
  building, and a ruin beyond any demand is left standing, the owner's "occasional old decrepit buildings or ruins".
* **Lag and memory.** Built extent follows population with a lag on the way down and none on the way up: a fall's
  households leave at once (step (c)) and the standing stock decays by the dwell bands over later epochs; a rise is met in
  the epoch it arrives by the regrowth-first order below, without a dwell (J-A8.47). Memory is the persistence order itself:
  plot lines, street lines, wall lines and traces outlast the buildings, so the old plan is there for regrowth to refill.
* **Regrowth-first — built now, on the one path (J-A8.44).** In `grow-by-stage` S2's delta demand is placed in this order,
  and only the residual grows a stage: (0) standing shells whose household count fell below what their occupants' band row
  houses relet up within §2.6's capacity (`relet`; J-A28.45); (1) vacant buildings reoccupied (`reoccupy`); (2) derelict
  ones repaired (`reoccupy`, a ledger debit); (3) ruins and cleared traces rebuilt or reused on their foundations
  (`rebuild`, `reuse … build`); (4) vacant plots of the old plan beyond the band's vacancy-run share (S10 (8) keeps the
  share; the design's own runs are never filled below it); (5) plots S10 cuts on the faces the old plan left unbuilt along
  its street lines inside the last boundary; (6) new faces of a new stage — the underground crowding hook first sends
  `crowdingShare` of the residual's poorest-band households underground where there is room: on lived and reopened sewer
  runs where `Features.sewers` is on, and in accessible cavern and ruin clusters at any rung (II.7.3 (c), II.7.4, §4.5 S7b
  (6); item 109 (j) (4)); S5a grows the boundary for the residual only; then, after S11 of the new stage, where
  `Features.sewers` is on, `SewerStrategy.extend` connects the new faces to the network, reopening closed runs on its paths
  first (II.7.2), and the first epoch the feature turns on, `SewerStrategy.derive` lays the network whole over the current
  ways instead, every existing entity kept (V06's `under.extend`); an epoch whose residual is ≤ 0 grows no stage and adds no
  face — the owner-staged history engine's two exceptions excepted (V06 §3.6; file f item 336): a stage for the overflow
  backlog, whose households are those its overflow ladder housed in earlier epochs, and a decrowding stage, whose
  households are the crowded ones it moves. That engine places its own tiers between (5) and (6): (5′) the upgrade of
  downgraded ways and the reopening of hollow ones (V07's hollow ways, `reopenWay`) and (5″) crowding within a factor of
  the band row (V06 §3.8); and every placement that engine makes on a plot whose access edge is a hollow way reopens that
  way, with any hollow way on its path to the ways in use, in the same batch first (V06 §3.8.2). S7b allocates the delta first to (0)–(5) as each district's old-plan capacity and only the remainder to new faces.
  **Test:** §13.2's T8-2 (M4).
* **The prosperity field under decline.** The drivers are re-evaluated per epoch (§4.5); under decline the market, harbour
  and main-street kernels shrink with their activity (§7.7's circumstance slice), and where plots merge the density field
  falls, so the field contracts toward the survivors' core and may concentrate there — the ladder's amalgamations are its
  footprint on the plan. An island that sinks or moves, a new wall or tall new building shifts the shade, and the field and
  the uses move by their normal lag — a sunnier quarter slowly improves, a newly shaded one slowly declines (item 102 (e));
  a spring or oasis that fails weakens its water pull and the quarters around it may decline (item 111 (b); V06).
* **Islands and the underground over epochs** (their laws are II.6's and II.7's). Each epoch re-reads the rung from its
  population target (*The rung at an epoch*) and re-evaluates II.6's supply law: an island whose supported area shrinks past
  the hysteresis is resized (its rim's plots cleared with lifecycle events, cause `convert:resizeIsland`); one whose supply
  falls to zero — or whose settlement falls below the CITY band (to TOWN or a village rung; AM-13) — wanes, settles after its
  dwell band and falls: `fallIsland` archives its arena and converts the ground it lands on — covered buildings demolished,
  covered plots left vacant under a `fallen_island` decoration, covered fields quarried, the stone credited to the salvage
  ledger, no edge added or removed (V05 §3.16); regrowth re-floats a settled island before it raises a new one (J-A10.42) —
  the laws in full, called once per epoch as `IslandEpochStep`, are V05 §3.15. The underground's candidates, weights and
  conversions are `UndergroundFade.candidates` and `.apply` (II.7; the underground's rows in `tables/under/fade.json`): a
  tunnel, gallery or chamber silts, caves in, floods or is sealed by its own draw at the `decline` step, after the fabric
  pool (V06's `under.fade` participant), at the underground's rate with `UndergroundFade.candidates`' weights, uncapped by
  the district's `fabric` cap and outside the pool's persistence order, never demolished by the engine (J-A11.41), and is
  reopened before a new one is dug; the undercity's size is re-read and a neighbourhood cleared by `UndercityEpoch.reread`
  (II.7.5; V06's `under.undercity`).
* **Identity and determinism.** A vacant, derelict, ruined, cleared or reused building is a live record with its address and
  lineage (§6.3); it becomes a tombstone only by `demolish` or when a `reuse … build` successor takes its address
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
  | { op: 'neglect' | 'breach' | 'dismantle'; enceinte: Id; stretch?: StretchRef }        // walls and gates: breach → the stretch's condition 'breached', dismantle → 'dismantled' (the whole trace when no stretch; §2.7, item 575); the old line persists as a trace; contractWall and wallToWay above supersede a ring
  | { op: 'neglect' | 'breach' | 'dismantle'; raised: Id; span?: SpanRef; support?: number }   // item 110 (b)'s raised ways (V06 §3.19.2): neglect the way (abandoned); breach a span (its deck and arch ruined, the rubble left); dismantle a ruined span's rubble or a support whose spans are both down (cleared, stone credited); breach and dismantle collapse the span's arch-vault chambers in the same batch (V04), and removal deletes them
  | { op: 'breach' | 'dismantle'; retaining: Id; stretch?: StretchRef }                   // item 110 (a)'s retaining walls (V06 §3.19.4): a stretch decayed (slumped) or ruined (stone taken), knots of the wall's `state` profile at its ends (§2.7, item 245); no edge removed, no terrain changed
  | { op: 'breach' | 'ruin'; deck: Id /* the deck plots' Plot.deck.host (item 246): a Bridge, or a pier or quay way */ }   // item 110 (d)'s decks (V06 §3.19.5): breach — the host decayed (charred or damaged, impassable); ruin — ruined (fallen or taken down), its way cut only where §5.3's network invariant allows; the buildings on its deck plots ruined by least disruption in the same batch and the deck plots tombstoned; Bridge.state untouched; repairRaised's deck form restores the host's former existence from the striking op's undo record
  | { op: 'retireWay' | 'effaceWay' | 'reopenWay'; way: Id }                                // file f item 268 (b): a way of a land class on ground part 0 at a village rung (V07 §3.12): retire — in use → abandoned (a hollow way, read by no router, tracker or merge test); efface — abandoned → decayed; reopen — a hollow way back to built, regrowth first; issued through the product's epoch rows (V06's ProductDeclEpoch.rows) or by hand through `convert`; never on a deck, a ford or a raised part
  | { op: 'silt' | 'caveIn' | 'seal' | 'reopen' | 'flood'; element: Id /* a tunnel, gallery or chamber (II.6's condition table); flood only on a gallery or chamber whose floor lies below the water table */; stretch?: StretchRef }   // the underground's ladder (II.6; J-A65.48); a `stretch` splits the record first; no engine plan contains demolish on a tunnel
  | { op: 'resizeIsland'; island: Id; areaHa: number; altitudeCm: Cm }                     // the supply law's response: the rim eroded or dilated by the kernel's buffer; rim plots cleared, or new rim faces grown by the grow path on the island's arena (V05 §3.15)
  | { op: 'waneIsland' | 'settleIsland' | 'fallIsland' | 'refloatIsland'; island: Id }      // floating → waning → settled (elevation at the floor of its band, districts declined) → fallen (arena archived, the landfall above); a settled island re-floats first
  | { op: 'raiseIsland'; allocation?: Id; declared?: { ring: PolygonCm /* local */; anchor: PointCm; kind: string; altitudeCm?: Cm } }   // regrowth: a new island for a sky allocation the count law opened at this epoch, placed by SkyStrategy (II.6), or a declared one
  | { op: 'removeIsland'; island: Id }                                                    // an author's removal: the record kept at its address in state 'removed', holding its slot (V05 §3.2 (6))
  | { op: 'reclearIsland'; island: Id; groundRefCm: Cm; altitudeCm: Cm; elevationRaisedCm: Cm };   // the epoch's clearance re-check (V05 §3.15 (7)); returned by the `sky.clearance` participant only
type SpanRef = { raised: Id; from: number; to: number /* support ordinals; a view resolved in its batch, as StretchRef */ };
```

**Terrain and water change slowly (item 25; the engine is owner-staged, the kinds and the hand path are the base's).**
Reclamation, silting and river-course shifts are conversions on the one list — the slowest layer of the persistence order,
never immutable — applied by hand in the base through §7.1's `convert` event and, in the staged engine, drawn at the decline
table's `terrainWater` rate by their own trigger rows (below). Each is a typed operation whose repair is an operator the base
already has (J-A25.41):

```ts
type TerrainWaterOp =
  | { op: 'reclaim'; kind: 'marsh'|'foreshore'; region: Polygon /* marsh: LandUse faces of kind 'marsh' or a damp or flood band re-typed as land; foreshore: a shallow water margin filled */ }
  | { op: 'siltReach'; water: Id; stretch?: StretchRef /* a reach or a basin: its width and depth profiles fall by the row's share; a basin below the harbour's draught loses its harbour use */ }
  | { op: 'shiftCourse'; water: Id; from: number; to: number /* control-knot ordinals (§2.3): the reach between them re-traced — a meander cut-off or an avulsion */ }
  | { op: 'digCanal'; polygon: Polygon /* the carve above, kind 'canal' */ };
```

* **Repair.** `reclaim` runs S1's terrain operator (§7.3 (a)) — the region's ground raised to the flood line plus the row's
  margin (`reclaim.raiseCm` 60), drained by a ditch water body and its `LandUse` faces re-typed with `reclaimed` set, as
  §2.3 states — and, for a foreshore, S1's water operator (§7.3 (b)) with the filled margin as the new shore; `siltReach`
  and `shiftCourse` are S1's water operator on the changed reach (the width and depth profiles, the shores as their buffer,
  the crossings re-sited, the kept ways re-routed, F-RIVER's re-trace confined to the reach, §7.3 (b) 1–2), so their
  footprint, fates and locality are the carve's and byte identity holds outside it; `digCanal` is `carve`. A shoreline
  change re-evaluates a wall's barrier closure by least disruption (§4.4). Every touched entity's lifecycle records the
  cause (`convert:reclaim` …); the record changes each kind makes are §2.3's.
* **Trigger rows (the engine's step; the rows are the decline table's `terrainWater` rows, §7.6).** Candidates and their
  chance per year — applied over the epoch's span as `1 − (1 − p)^years` (*The clock*, above; J-A76.45) — each × the layer's
  persistence rate (0.005) and drawn from `epoch.transform` keyed by the water body's or face's lineage and the epoch (§6.1;
  no new concern, J-A25.42): `siltReach` — a reach whose accumulation has fallen, or a basin whose harbour use has closed
  (the use step), 0.02 per year; `reclaim` — a marsh or foreshore face beside built land whose band's plot demand is short
  (S5d's shortfall record) and whose district's band is `modest` or above, 0.03 per year — reclamation is bought by
  prosperity and pressed by demand; `shiftCourse` — a reach whose sinuosity exceeds `river.cutoffSinuosity` (1.8), or whose
  flood cells beside it exceed the row's share, 0.01 per year; `digCanal` only by demand (a `canal` row of the roster's
  institutions, a dossier element or a user's edit). Each fires at most once per body per epoch; AM-23's tendency wording
  holds — rates, not laws. Emulation note: neither reference has time, and both already let a user reshape water — MFCG's
  warp and FTG's water drawing — which the base keeps as §7.1's edits; nothing here runs without an epoch.

**Hidden plots over epochs (item 30 (e); the base carries the kinds).** A passage can be **sealed** — `sealPassage` sets
`Passage.sealed` (§2.5), so the access edges on its face read as sealed; every plot whose only reach passes it takes
exposure `sealed` (§4.6), and its buildings enter the decline ladder as vacant (`vacate`, cause `convert:sealPassage`) — and
later **reopened** (`openPassage`: the exposure returns to `hidden` and the buildings reoccupy by the regrowth-first order);
both are hand edits in the base and the engine's kinds later. Hidden plots **arise** by densification — the ladder's
`densify … back_court` (rung 2) — and **vanish** by `thin … back_court` (the rear plots cleared after their uses relocate,
their households are re-homed and their buildings vacated, the passage sealed and, on a rising band's re-cut, removed with
the rear row, `amalgamate` returning the land to the front plot's garden: item 31). The sealing kinds are the last kinds of
this section the union admits (`… | TerrainWaterOp | HiddenOp`):

```ts
type HiddenOp = { op: 'sealPassage' | 'openPassage'; passage: Id /* the L3 passage face (§2.5) */ };
```

**Works — every physical change on the ground as a timed project on the weekly clock (item 67; owner: "when a building
gets torn down, ruined, being built, being expanded, Lots need to merge or separate … we should show stages of it being
built. What do you think those stages should be?").**
1. **Decided at once, shown over weeks (J-A67.41).** Every physical change — a build, an extension, a demolition, a repair, a
   conversion, a decay step, a clearance — is decided and recorded by the event that makes it (the designation mutator's
   record, a conversion, a ladder or decline op; §4.7 S11 step 6, J-A67.49), so the log alone still determines the model.
   When that event carries a week — an epoch, a dated dossier change (§7.7 item 1), a hand edit scheduled by `startWorks`
   (§7.1) — and the preset's `works.enabled` holds, the event also creates a **`Works`** record (§2.7): its kind, its target
   (a building, whose added or subtracted wings and storeys are the parts of the `MutationRecord` its `cause.mutation` names;
   or the plots of a join or a split — §2.7's `Works.target`), its start week, its duration in working weeks, the `WorksTable`
   row read, the event and mutation it shows, and what the ground held before that the model no longer holds (the removed
   parts' rings with their heights and roof kinds; the removed plot lines with their treatments). The drawn state at any
   week is DERIVED — computed from the record, never stored per week (2). An event with no week, a hand edit not scheduled,
   generation (the creation week shows a finished town; J-A67.47) and the parity presets create no Works, and the change is
   drawn finished. So a user's `build`, `demolish` or `convert` stays instant unless scheduled; an engine's `demolish` makes
   its tombstone at once while its Works draws the demolition from the kept shell; aborting a change is its undo (§7.4),
   which removes its Works; `cancelWorks` (§7.1) ends a running Works at once — the change it shows stands, drawn finished —
   and a `setAttr` on a Works moves its start or its duration.
2. **The stage at a week.** `stageAt(works, w)`: `e` = the working weeks in [start, w) — the weeks the calendar row does not
   pause for the Works' material in the town's climate (`WorksTable.pauses`: masonry, stone and brick, pauses in winter in
   temperate and cold climates; our own rows) — and `f = min(1, e ÷ duration)`; the stage is the kind's latest scheduled
   stage whose start fraction is ≤ `f`, `before` for w before the start and `finished` at `f` = 1. Weeks are integers, so a
   stage shorter than a week is never drawn (a tick shows the stage it lands in); a zero-week duration (a tent's row) applies
   finished in its week. At most one Works runs on a target: a new change on it ends the running one at the stage reached,
   which the new one takes as its `before` (a repair begun on a decaying house runs back from DECAYING).
3. **Durations (item 67 (b); J-A67.43).** `WorksTable` rows keyed by kind × class (or the designation template's `works`
   key, §10.2) × size (storeys, footprint) × material give a range of working weeks; the duration is drawn once, uniform in
   the range, × the labour factor of the plot's band (richer, faster; a row), on the `works` concern (its key is §6.1's;
   J-A67.61; J-A67.42). Defaults (our own, calibratable, §13.9): a tent 0 weeks; a hovel, shed or shack 1–2 weeks; a small
   timber house 2–6 (the owner's "two weeks or a month"); a town house 8–17; a stone house 17–52; a manor 52–156; a church
   520 or more; a cathedral built part by part — choir, transept, nave, towers, each its own Works in its programme's order,
   the choir in use under a temporary roof while the nave rises; a demolition a quarter of its build's range; a clearance
   1–4; a `decay` Works the decline table's dwell band for its step (below), × 0.6 for timber and thatch. Material enters as
   a duration row only — time, never shape (the owner's materials rule, §2.6; J-A31.42 stands for replaceability).
4. **The stages — the answer to the owner's question (item 67 (c)–(f)).** Start fractions are per class row; what each stage
   draws is §8.2's `states` rows. The table's first column is `WorksRow.kind`; a fire is no Works kind but an instant event
   with a drawn state:

   | kind | stages (default start fractions) |
   |---|---|
   | `build` — and each wing or storey an extension or an adaptation adds | STAKED 0 (a dashed footprint, a material pile) · GROUND BROKEN 0.05 (bare earth, a spoil heap, a cellar pit) · FOUNDATIONS 0.15 (low walls or a sill frame) · WALLS RISING 0.25 (the walls up storey by storey, no roof, the interior open, a scaffold ring) · ROOF FRAMED 0.75 (rafters, no covering) · ROOFED 0.85 (covered, the scaffold still up, a work yard) · FINISHED 1 (the scaffold gone, the yard laid out) |
   | `extend` | the kept building in use throughout; the added wing through the build stages; at ROOF FRAMED the old roof opened where the two join; at FINISHED the joint wall opened and the wings united (item 18's add step, shown over time) |
   | `demolish` | EMPTIED 0 (doors and windows out) · STRIPPED 0.2 (the covering salvaged, rafters bare) · ROOFLESS SHELL 0.4 (rubble inside) · RUBBLE 0.7 (wall stubs, heaps, salvage piles) · CLEARED 1 |
   | `decay` — §2.8's ruin ladder on the way down (5) | toward `decayed`: ABANDONED 0 (shut up, the yard overgrowing, the roof whole) · DECAYING 0.5 (a holed roof, a sagging ridge); then `decayed` is ROOFLESS (weeds and saplings inside), `ruined` COLLAPSED (walls fallen in places, the stone gone to the salvage ledger), `cleared` or `reused` OVERGROWN (a grassy mound and a foundation line, until cleared or built over) |
   | `repair` | the decay stages backwards under a scaffold, to the building's former state |
   | `clear` | RUBBLE 0 (the ruin's heaps being carted) · CLEARED 1 |
   | `convert` (a conversion with no geometry step) | REFIT 0 (a scaffold on the frontage) · FINISHED 1 |
   | a fire (an event, not a kind) | an instant destructive event (rung 3's trigger): the building `decayed` in its week and drawn CHARRED — a blackened roofless shell — until a clearance or a repair starts |

   The ruin stages are the existing ladder's drawn stages (J-A8.46 stands; no new `Existence` value): the target keeps its
   ladder state from the event on and carries its running Works by a link (`Building.works`, §2.6).
5. **The decay Works carries the dwell band (J-A67.46).** A `vacate` (the building `abandoned`) starts a `decay` Works toward
   `decayed` whose duration is its dwell band drawn once (the decline table, above); the strike pool's `decay` candidates are
   the buildings whose `decay` Works has run its span, and the strike's `decay` event (the building `decayed`) starts the
   next toward `ruined` the same way; a `reoccupy` ends it and starts a `repair`. A building left `abandoned` or `decayed` by
   an undated event (a hand edit) gets its decay Works from the next epoch, starting at that epoch's week.
6. **Mutation steps (J-A67.49).** A Works shows its event's `MutationRecord` (§4.7 S11) in the record's order — subtracted
   parts by the demolition stages first, then adapted parts (an added storey's walls rising, an extended wing's build
   stages), then added parts by the build stages — each part's span a share of the duration by its footprint area; kept parts
   stand as they are. A `rebuild` is a demolition then a build, one Works; the epoch-spread mutation's events (above) each
   start their own.
7. **Plots in transition (item 67 (g); J-A67.44).** A join or a split is decided when its event lands — the plot rings change
   then (ownership) — and the ground follows the work: each removed boundary line is drawn from the Works' kept lines, dashed
   as pending removal, until the joined plot's build reaches GROUND BROKEN (or a demolition reaches RUBBLE), and a new
   dividing line is drawn as stakes, dashed, from STAKED and as its fence or wall from WALLS RISING. Item 31's `subdivide` and
   `amalgamate` run through the same stages. Access is the event's, so a Works never leaves a plot without access.
8. **What reads the stage.** Heights at a stage are derived, `heightsAt(works, w)`: WALLS RISING raises the eave storey by
   storey (the eave × the storeys reached ÷ the floors) — for a building with a solid wing or a wing standing on another
   (V02 §3.15) **in stack order**: its courses counted along each chain from the ground (a storeyed wing's floors; a solid
   wing `⌈eaveCm ÷ storeyCm.upper⌉` courses, never a division by its zero floors), the courses reached advancing by this
   rule over the tallest chain's count, a wing's height its `eaveCm ×` the courses it has reached `÷` its courses from its
   stored `baseCm`, a wing neither drawn nor cast until the wing it stands on has reached its eave, a stair rising with the
   tier whose top it reaches, the shrine and a roofed top taking their roofs from ROOF FRAMED as any roof does and a flat
   terrace no roof stage — no roof before ROOF FRAMED (drawn as a `framed` roof), the finished roof from ROOFED, a demolition
   lowering them in reverse (in reverse stack order); the stored heights stay the finished building's, so the shadows of §8.4
   and §11.1's 3-D export follow the stage. The households an event placed are housed at a week only from FINISHED, and a
   demolition's have left before EMPTIED (item 17's relocation, J-A17.41): the module's occupancy, the lit windows (§10.3)
   and the light sources (§4.7, §8.4) read that. The plan rung of a building in progress draws walls without doors or
   furniture, and of a ruin its fallen walls and open rooms (§2.6); the stage counts among the plan rung's recorded inputs, so
   a stage change marks a derived plan stale and §8.5's change marker shows it (item 67 (j)). Descriptions use §10.4's stage
   words; the city band draws the stage glyph on the footprint, the neighbourhood band the walls, scaffolds, frames and
   rubble (§8.5, §8.2).
9. **Which week is drawn (J-A67.45).** Every drawing, export and reader draws the document's current week (*The clock*,
   above) unless the per-viewer view key `week` (§2.9) names another — a host's view command setting a week (item 125 (c); §11.3), or a user scrubbing
   — outside every digest. Scrubbing draws every live Works, and every Works finished within `works.retainWeeks` (52), at
   that week over the current model, forward and back, byte for byte; the full history at an earlier week is the log's
   replay (§7.4). An epoch retires the Works that finished more than `works.retainWeeks` before the week of the previous
   epoch — the start of its span; the creation week for the first — so the model after an epoch holds every Works that ran
   during its span at any cadence (V06's frames draw from it): the record leaves the model and its target's lifecycle event
   keeps the weeks.
10. **Restraint (item 67 (i); J-A67.48).** An epoch's Works start at weeks spread uniformly over its span (the weeks since
   the previous epoch; the offset is the `works` concern's draw before the duration's, §6.1), so the share of stock under
   works at the epoch's week follows the growth or decline rate by construction — a steady town shows a few scaffolds, a boom
   town many, a declining one ruins. A `ConditionOverlay` (§2.7; staged, empty in the base; item 88) scales the share of an
   epoch's changes it starts as Works once the port fills it (a siege stops building). With no epoch and no scheduled edit
   nothing here runs, and the static baseline is byte-identical (item 23: neither reference has time).

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

**Markets over epochs (item 24).** A secondary market the roster's suffix adds is claimed by the epoch's S7b in the new stage
or in a due district by §4.5 S7b (3)'s rule; a market whose institution closes (the use step) keeps its square — a plaza or a
`market_green` — until a `clear` or a claim reuses it, so no market moves by wealth change alone.

**Informal clusters over epochs (item 70 (e); J-A70.48).** On the weekly clock a cluster grows by accretion: delta households
of its band placed on an informal plot add structures by §4.7's packing on the plot's free path sites, each a `build` Works
of its row — a shack or lean-to the hovel-or-shed row's 1–2 working weeks, a tent the zero-week row, finished in its week;
rung 1's `densify … infill` on an informal plot adds structures in that way too. A destructive circumstance event (rung 3's
trigger) burns a cluster fast — its structures `decayed` and drawn CHARRED in one week, then cleared. When its district's
band rises past the hysteresis a cluster is cleared or **formalised** by rung 3 in the due epoch (the replaceability of tents
and shacks is `immediate`, §10.2): its households re-homed by item 17's relocation or re-let, the plot cleared, re-cut by S10
(7) into row-house plots and built by S11 at the new band. In decline, a vacant, cleared or ruined plot of a district whose
value fell past the hysteresis at the epoch takes tenure `informal` (§4.7) and may take a cluster. Each step is an event of
this section's kinds; the engine that schedules them is the staged one.

**Lights, deposits and conditions over epochs (items 68 and 88).** A light follows its host (§4.7's *Light sources*), and an
epoch re-runs the light rows on its new and changed faces only. A `DepositSite` (§2.7; staged, empty in the base) whose state
changes converts the land use it anchors: `depleted` or `removed` — its quarry, mine or claypit `abandoned` and drawn worked
out (a deposit depleted at creation drawn so from the start); `discovered` — a new outside site sited by S12a's rows at that
epoch. A `ConditionOverlay` is read as *Works* (10) states.
=== END ===

=== REPLACE ### 4.13 Edges and meeting points — the defined outcome at every limit ===
### 4.13 Edges and meeting points — the defined outcome at every limit

Every stage commits geometry through kernel transactions, and a degenerate result is handled by the stage's failure class
on its §5.2 ladder (§4.1's transactions table), never by a whole-map retry. Every other limit of this part's mechanisms has
its outcome at its home; the **edge suite** (§13.2, B-EDGE) runs one fixture per row below, or each fixture a row
names — the home's stated outcome, hard, 0 per 1 000 — at every rung the row names and under every preset (the parity presets and each layer on and off).

| id | mechanism | case | outcome, where it is stated | ladder rung |
|---|---|---|---|---|
| EP-01 | every stage | zero-length, zero-area, self-touching, collinear or coincident geometry | refused by the kernel; the stage's failure class (§4.1) | repair locally → retry that piece → simpler shape → leave out and report |
| EP-02 | S0 | a band's floor, a single building, THORP to the METROPOLIS cap | §4.2 S0 (`LadderRouter`, §1.1's clamp; the ladder coverage test, §13.1) | — (defined) |
| EP-03 | S0's sewer feature | `on` at TOWN, `on` below TOWN, `off` at CITY, missing | §4.2 S0 | report |
| EP-04 | S5b / S5c | no new primary owed; no seed inside the boundary | §4.4 S5b, S5c | — (defined) |
| EP-05 | S5d | a face whose reserves cover it | §4.4 S5d (built land floored at 0) | top-up → report |
| EP-06 | S6 | a single coarse face; a degenerate district face | §4.5 *Grower* | merge |
| EP-07 | S7b | zero-capacity district; one district; a claim no face holds | §4.5 S7b (1), (3) | re-site → drop and report |
| EP-08 | S10a | an empty allocation; one block; every rung | §4.7 S10a | reconcile |
| EP-09 | S10b | a block with no class; a request with no item | §4.7 S10b | — (defined) |
| EP-10 | S11 | the village rungs' furniture | §4.7 *Furniture pins* | — (defined) |
| EP-11 | S12a | no hinterland land | §4.9 S12a | F-SITING, import reported |
| EP-12 | S12b | a refused layout; no green face; save, undo, regenerate | §4.9 S12b | leave out and report |
| EP-13 | S13a | no nameable feature of a kind; one district | §4.10 | — (defined) |
| EP-14 | an epoch | a target equal to the population; a residual ≤ 0; a spring at `flow` 0 (it pulls nothing, its water body standing) | §4.11 (the one path; regrowth-first); §4.2 S3 (6) and §4.5's water term (`spring.flow`) | — (defined) |
| EP-15 | history-first generation | no peak, a founding after the present, a peak below the present or above the cap; a replay starting 300 years before a week-0 creation (a valid season at every epoch) | §4.11 *History-first generation* (7); *The clock* (3)'s floored week | report |
| EP-16 | the stop test and the ring spacing | the folded bell at its end (g = 1; f = 1) | §4.6 step 1; II.2 | — (defined) |
| EP-17 | S12c | pseudo-districts, undercity and underground neighbourhoods, unit runs | §4.5's item-72 paragraph (*Which districts*) | — (defined) |
| EP-18 | §10.2 – §10.4 | an empty or contradictory table row; a pack with no names; every rung; save, undo, migrate | §10.2 *Rows at their limits*, §10.3, §10.4 | the compiler's clamp → report |
| EP-19 | II.7.1 – II.7.6 | each edge the underground sections state (no network, one tunnel, the caps, every rung, the toggles and presets, the lifecycle) | II.7.1 – II.7.6 at each rule; II.7.4 *Limits* | F-UNDER, F-VOID |
| EP-20 | S3 (6), S5a, S5d | less reachable land than a stage asks — fixtures: an island town on an island of half the stage-1 land, a fjord site, a METROPOLIS at the cap in a narrow valley | §4.2 S3 (6) (the capped `t`, the frame arc); §4.4 S5a (a stage with no land folded), S5d (no top-up without land) | simpler shape (the capped level set) → leave out and report (`requestedVsBuilt`, F-BUDGET-STAGE) |
| EP-21 | S3 (4), (7), (9); S5a | a barrier closing the arcs a gate falls on, or every arc — fixtures: a river loop with N₁ = 5; a mesa ringed by sheer faces (every route in within its class grade, or `unserved` reported; 0 routes steeper than `path`'s limit); a mesa below the sheer test and a marsh-ringed town (walled on their `cliff`, `steepSlope` or `marsh` arcs with one gate, its route within its class grade or `unserved` reported); an island town filling its island | §4.2 S3 (4)'s closed-arc reduction, (7), (9) (every arc closed: (a) unwalled, (b) walled on its walled closing arcs); §4.4 S5a | retry that piece (the pick re-drawn, ≤ 3) → simpler shape (the next class's grade, F-ROUTE) → leave out and report (F-WALL; `unserved`; `W_WALLED_BY_BARRIERS`); F-CASTLE's re-site |
| EP-22 | S3 (10); S5a's outer moats | a wet moat with no water within reach or on sloping ground — fixtures: a hill town with `moat: 'all'`, an arid town with no river with `moat: 'inner'` | §4.2 S3 (10) *Where a moat holds water*; §4.4 *Outer moats* | simpler shape (the dry `ditch`), reported (`W_MOAT_DRY`) |
| EP-23 | S3 (5), S4, S5b, S5c | the steepest ground — fixture: a mountainous site, arterials within their class grade or `unserved` | §4.3 *Lattice and costs* (the class grade limit); §5.2 F-ROUTE | simpler shape (the next class's grade) → leave out and report (`unserved`) |
| EP-24 | S8's cliff band; S10, S11 levelling | a cliff across a district (0 lanes, seeds or ground way spines crossing the cliff line; the two sides' plots backing onto it at the `cliff` setback); two plots at a cliff's top and foot; a step of 2.5 × `stepMaxCm` (`levelledGroundCm` on each terrace equals its datum; every wall's `stepProfile` lies in (`stepMinCm`, `stepMaxCm`]); a levelled unit beside unlevelled ground | §4.6 (a cliff inside the district a hole); §4.7 *Levelling and retaining walls* (step regions) | simpler shape (terraces, else skirts and stepped wings) → report |
| EP-25 | S1 (6), S3 (2) | a harbour on a site with a river but no coast — fixtures: a river-only site with `harbour: 'on'`, and with `deep_harbour` | §4.2 S1 (6) (the river or lake harbour) | substitute (a river or lake harbour) → leave out and report (tier 6) |
| EP-26 | S10b's `dossier` request | no seat on the current map for a dossier element — fixtures: a 1 500-person TOWN dossier listing more dossier institutions than its plots (every one placed, the report naming each edge plot); and, run with V07 registered (V07's village rows), a THORP dossier with 40 custom institutions absorbed at once, every one placed, the report naming each edge plot | §4.7 S10b *Reconcile and infeasibility* (the last rung) | substitute (a new outside plot), reported `W_DOSSIER_EDGE` |
| EP-27 | §10.2's crisis looks (a look only) | no outskirts land left in the frame and margin; an island town; a siege of an unwalled place; a mesa whose every arc is a closure feature; THORP to the METROPOLIS cap; two and three crises at once; a force larger than the frame and margin; a headcount of 0 or none given; an unmapped stressor type or archetype; a condition whose `untilWeek` is not after its `sinceWeek`; no condition and no preview — at each, the document and its hash unchanged by the look, and nothing on water, a gate's passage or a label's keep-out | §10.2 *Crisis looks* (b)–(h) | simpler shape (what does not fit drawn as §8.8's massed marks; the severity-and-tier scale where no headcount is given) → report (`unmapped_word`) |

**Where features meet (the combination suite, §13.2, B-EDGE).** Each cell is the outcome where the row's feature meets the
column's, then its rung on §5's ladder (— (defined) for a rule with no failure); a raised way is generated
only at CITY and METROPOLIS and declared at any rung (§4.3); a retaining wall and the frame stand at every rung; a deck plot
at VILLAGE and above (V07's village rows at village rungs).

| feature | a raised way (§4.3) | a retaining wall (§4.7 *Levelling*) | a deck plot (§4.7 *Deck plots*) | the frame (§3.2 (9)) |
|---|---|---|---|---|
| cliff or steep slope | a drop the viaduct reason reads; no support taller than `maxPierM` (a generated course drops, `raised_too_tall`; a declared one bends, §2.7's support step); an end's ramp or stair keeps its class grade (§4.6). *Rung:* leave out and report (generated); simpler shape (declared, bent) | none on a cliff bank, a `cliff` or `sheer` closure arc or a cliff inside a district — the cliff holds the ground, plots backing onto it at the `cliff` setback from its top and its foot and none cut across it; on a steep slope levelled only up to `stepMaxCm ÷ minTerraceDepthM`, steeper not levelled (reported). *Rung:* simpler shape (skirts and stepped wings) → report | no deck host on a cliff bank: no pier, mole or breakwater is rooted on one (§4.8); a quay platform on a steep bank is ground, levelled as any plot. *Rung:* — (defined) | clipped at the arena's outer ring by S1; nothing drawn beyond it. *Rung:* — (defined) |
| river, coast, moat | spans between supports on the banks, no support in water (§2.7's support step), within `viaduct.maxSpanM` and §2.7's clear-span bound (`raisedWays.structure.maxClearSpanM` by material) — a crossing wider than it drops a generated course (`raised_too_long`) and bends a declared one; never out over the sea (its ends are ground vertices); a moat spanned outside its wall strip. *Rung:* leave out and report (generated); simpler shape (declared, bent) | none on a `water` run; the bank holds the ground. *Rung:* — (defined) | a bridge, pier, mole or quay deck by the `deck` offer; none on a ford, a drawbridge or a gate's moat deck. *Rung:* — (defined) | a water body reaching the ring shares its edge (§4.1's S1 row); no crossing site whose deck end lies beyond it. *Rung:* — (defined) |
| harbour | the basin and its mouth excluded; a stroke across bends to its last ground vertex. *Rung:* simpler shape (the bent stroke) | quays, moles and piers are harbour works, never retaining walls. *Rung:* — (defined) | moles and quays by offer; a walled port's mole head holds the chain tower (§4.8). *Rung:* — (defined) | as water. *Rung:* — (defined) |
| wall | crosses only on a gate's line or as the aqueduct's arch; no support in a wall strip but the crossing's station on the band (§2.7's support step (3)). *Rung:* — (defined) | none on a `wall` run or in a wall strip. *Rung:* — (defined) | none on a wall strip. *Rung:* — (defined) | the trace stays inside the frame (S3's lattice; a frame arc inset by the outer wall strip, §4.2 S3 (6)). *Rung:* — (defined) |
| bridge | passes over its way without a junction at `raisedWays.structure.clearanceCm`; no support on its deck. *Rung:* — (defined) | a bridge's approach meets a retaining wall as a ramp by `primary`'s crossing row; `bridge`, `pier`, `quay` and `ford` ways never cross one. *Rung:* repair locally (the step re-cut, V11 §3.24.5) → leave out and report (not levelled there) | by the bridge row; a mid-span landmark slot on a span ≥ the `bridgeMid` minimum. *Rung:* — (defined) | a bridge's deck lies inside the frame (its site's two ends do). *Rung:* — (defined) |
| square or reservation | no support on it; spans over it with the clearance. *Rung:* — (defined) | the reservation levels itself (S11); no district-edge wall on a `reserve` run. *Rung:* — (defined) | a deck plot fronts its deck way, never a square. *Rung:* — (defined) | inside the frame by S3's siting. *Rung:* — (defined) |
| hinterland | spans over hinterland land-use faces stay open (reason `country`) at every rung (J-C4; §2.7's span rule). *Rung:* — (defined) | a district-edge wall may stand on a `field` run inside the district; fields are never levelled. *Rung:* — (defined) | a bridge outside the perimeter offers deck plots owned as V01 §3.17.6 states; its `bridgeMid` fort slot on a through route. *Rung:* — (defined) | the hinterland's faces end at the ring. *Rung:* — (defined) |
| oasis | no support in its water or on its grove; an aqueduct may take its spring as a source. *Rung:* — (defined) | none on its water run; its gardens are not levelled. *Rung:* — (defined) | a way across it by a built bridge offers deck plots by the bridge row, else none. *Rung:* — (defined) | sited inside the frame's middle two thirds. *Rung:* — (defined) |
| plots and buildings (S8–S11) | the under-deck strip and its pier footprints are S8's holes: no block interior, plot or footprint in them, with or without stage 2 (§4.6). *Rung:* — (defined) | a levelled unit's edge against unlevelled ground takes one wall above `stepMinCm`; a step above `stepMaxCm` takes terraces or is not levelled (§4.7 *Levelling*). *Rung:* simpler shape → report | a deck plot's building stands within the deck budget; removing or ruining the deck ruins what stands on it by least disruption. *Rung:* — (defined) | every plot and footprint stays inside the frame; the hinterland's outside plots end at the ring. *Rung:* — (defined) |

**Named fixtures beside each cell's own** (B-EDGE): a cliff primitive across a district and two plots at a cliff's top and
foot (the cliff × retaining-wall cell); a cliff-headland coast with the harbour-wall rows on (the cliff × deck-plot cell); a
CITY viaduct at M3a with stage 2 unregistered — 0 plots and 0 footprints in its strip (the plots × raised-way cell).
=== END ===

=== REPLACE ### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values) ===
### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)

The row types below are the base's reading surface; volume 11 owns every table's rows and values (its registry, V11 §3.1)
and declares the row types marked "V11 §2.x" with their fields; the base cites them.

```ts
interface RosterTables { classes: BuildingClassRow[]; districtKinds: DistrictKindRow[] /* the relation templates of the neighbourhood kinds (item 16 (a)) */;
  resources: ResourceRow[] /* the goods table (V11 §2.5): id, kind, bulk, perishable, value, comfortM, maxDistanceM, modes, security, site, demand, volume — the resource ids the supply edges name */;
  institutions: InstitutionRow[]; government: GovernmentRow[] /* offices and seat classes per government kind */; religions: ReligionRow[];
  households: HouseholdRow[] /* size distributions by class */; professions: ProfessionRow[]; farm: FarmTable /* §4.9 */;
  settings: RosterSettings /* the one row of V11 §3.5.1 (registry row 24) */;
  roomProgram: RoomProgramRow[] /* item 28: the room programmes, below, with the plan rung's tables (V03 §2.4) */; basementGate: BasementGateRow /* item 29 (b): the basement's terrain-gate values, one row, below */;
  covers: CoverRow[] /* item 63: the fronts a concealed class may take, below */;
  classMix: ClassMixRow[] /* item 71 */; clusters: ClusterRow[]; tenure: TenureRow[] /* item 70 */;
  quarterIdentities: QuarterIdentityRow[]; powerLinks: PowerLinkRow[]; sectorLinks: SectorLinkRow[]; bandRanges: BandRangeRow[] /* item 72 */;
  sectors: SectorRow[] /* item 78: the sector set the economy slice is keyed by (§7.7 layer 2) */;
  portRows: PortRows /* item 88: the staged rows the dossier port fills — schema-complete, empty, extension */;
  grandeur: { ceiling: GrandeurCeilingRow[]; settings: GrandeurCeilingSettings } /* item 115: the table 'grandeur.ceiling', one row per rung and its named row 'settings', below (*Grandeur ceiling*) */;
  festival: { decorations: DecorationRow[]; staging: StagingKeywordRow[] /* with its named row fallback: Record<FestivalKind, StagingPlace[]> */; motifs: MotifRow[]; generic: GenericFestivalRow[] } /* item 118: a look only, below (*Festival decorations*) */;
  crisis: { looks: CrisisLookRow[]; map: CrisisMapRow[]; settings: CrisisLookSettings } /* item 122: a look only, below (*Crisis looks*) */;
  names: NamePack; provenance: Provenance }   // GovernmentRow, ReligionRow, HouseholdRow, InstitutionRow, ProfessionRow, HeightsRow, CompatibilityRow, ClimateRow (with its ClimateSeasonCells, item 117), EraRow, GrammarDef, TemplateDef, item 110's row types and the tables named above are declared as V11 §2.8 (and V11 §2.4, V11 §2.5) gives them, and DecorationRow, StagingKeywordRow, StagingPlace, FestivalKind, MotifRow, GenericFestivalRow and QualitySpendRow (items 118, 119) as V11 §2.8d gives them; GrandeurCeilingRow and GrandeurCeilingSettings (item 115) and the crisis look shapes (item 122) are declared below; RosterSettings is the settings field's own shape, below (its cells V11 §3.5.1); RosterTableId is the union of these field names; the siting tables (`siting.profiles`, `siting.families` of `RelationFamilyRow`, `siting.pairs` of `SignaturePairRow`, `siting.web`, `siting.custom`) and the dossier tables (`dossier.archetypes`, `dossier.categorySynonyms`, `dossier.keywords`, `dossier.ladders` of `LadderStepRow`, `dossier.status`) are registry tables of their own (V11 §3.1), read beside these
interface BuildingClassRow { id: string; use: string; perCapita: [number, number]; perOther?: { class: string; ratio: number }; min: number; max: number; firstAtPopulation: number;
  requires: ('water'|'coast'|'route'|'farmland'|'ore'|'stone'|'timber'|'fish'|'clay')[] /* the site-resource gates S2 reads from SiteResources (§4.2) */;
  presence?: { member?: number /* 1 when absent */; when?: PresenceWhen; law: PLaw }[] /* read by S2 only at the rungs whose RungProfile.frameLaw is 'territory' (the village rows, V07 §2.4): member m is drawn once on roster/<class>/<m> against the law of the first entry for m whose condition holds, m ≥ 2 only when m − 1 is present; the members after the drawn ones are the per-capita count less those drawn, never below 0; the roster's coverage option adds none there; a government's villageSeat class is present with at least one member whatever its entries (V07 §3.11 DR11); absent: perCapita, min and firstAtPopulation as at every rung; PLaw and PresenceWhen are V07 §2.2's and V07 §2.4's */;
  outside: boolean; liveIn: boolean; cluster?: string; noxious: boolean; lifestyleBand: string; shopProb: number; priority: number;
  relations: RelationRule[] /* the class's relation template (item 16 (a)) */; produces: string[] /* resource ids */; producesShare?: Record<string, number> /* item 105 (c): the output shares, equal when absent */; supply: SupplyEdge[] /* its supply chain (item 16 (b)) */;
  profile: SitingProfile /* item 103: the compiled siting profile — family, emits, sensitive-to, needs, clientele, alignment, competition, coverage, balance, orientation, split, landmark; SitingProfile, NeedSpec, CoverageSpec, Nuisance, Lvl, Need and Clientele are V11 §2.3's */;
  staff: { band: string; workers: [number, number] }[]; villageForm?: string /* the class that plays this class at village rungs — a `v.` class key (V11 §2.3, V11 §2.9); absent, the class plays itself */; templateFamily: string;
  template: DesignationTemplateRow[] /* one row per band: the designation template S11 reads (item 19; §4.7) */; useRules: UseRuleRow /* item 17; §4.11; absent: V06 §3.9.9's clientele defaults */;
  secondaryChance?: number /* market rows: the TOWN chance of a secondary market (§4.2 S2) */; salvageM3: Record<string, number> /* item 8: the material yield and debit §4.11's ledger reads */;
  drain: 'none'|'pit'|'channel'; underground: 'never'|'allowed'|'preferred'; undercity: 'never'|'allowed'|'preferred' /* item 65 */;
  undergroundAccess: { prob: Record<string, number> /* item 64: per band row, interpolated along the value — the chance that a basement within reach of an underground element holds an access (II.7.3) */ };
  crypt: 'always'|'basement'|'never' /* item 109 (k) (2); default 'never'; the values V11 §2.3, the ladder §2.6 */;
  cryptM2?: [number, number, number, number] /* m²: the crypt ring's growth target at poor, modest, prosperous, rich; required when crypt ≠ never */;
  deckOk: ('bridge'|'pier'|'mole'|'quay')[] /* item 110 (d): compiled — the deck kinds a class may stand on; absent = [] (V11 §3.24.4) */;
  concealment?: ConcealmentRow[] /* item 63: the default-mode weights of a class our tables mark clandestine; absent: never concealed unless the dossier or an assignment says so */;
  distribution: 'district-defining'|'dispersed'|'singular'; significance: number; powers: { kind: string; weight: number }[]; sectors: { sector: string; weight: number }[] /* items 72, 78 and 79: how the class spreads, its weight in a neighbourhood's reading, its association with the power kinds and the sectors (weights summing to 1 per column) — read by §4.5's neighbourhood character */;
  subLocations: SubLocationRow[]; openingHours: OpeningRow[] /* §2.6's */; tags: string[];
  label: string; icon?: string /* a V09 §5.1 sprite id, compiled from the family */; synonyms: string[]; commonness: number /* the roster reader's tie-break (V11 §3.5.1) */ }
interface RelationRule {   // one row of a class's or a neighbourhood kind's relation template; read by the placement solver (§4.7 S10a, S10b) and, for district kinds, by §4.5's typing scorer
  kind: 'adjacent'|'near'|'far'|'sameStreet'|'clustered'|'avoid'                                  // to another class, cluster tag or feature class
      | 'upwind'|'downwind'|'upstream'|'downstream'|'nearWater'|'highGround'|'lowGround'|'dry'   // environmental: without a `to`, the plot's own ContextVector.upwind and upstream, terrainClass, dist.water (§2.5); with a `to`, relative to the nearest member of `to` (§4.7 S10b)
      | 'frontage'|'nearGate'|'nearMarket'|'nearHarbour'|'nearCentre'|'extramural'|'intramural'  // access: roadClass, dist.* (the nearest of N markets, item 24)
      | 'plotArea'|'plotShape'|'frontageM'                                                        // capacity: areaM2, shape, frontageM, against the template's size budget
      | 'band'|'exposure'                                                                         // the prosperity band; Plot.exposure and knownTo (item 30)
      | 'coverage';                                                                               // item 103 (f): unit, per and target below
  to?: string /* a class, a cluster tag, or a feature class of V11 §3.3.3 (emit:<n>:<L>, sens:<n>, align:*, #<tag>, landuse:<kind>, deposit:<family>, bridge, quay, wall, wallInner, open:square, open:green, gate, harbour, raised:terminal), whose distance rasters §4.7 S10b builds like its provider rasters */;
  withinM?: number; beyondM?: number; min?: number; max?: number; values?: string[]; falloff?: 'step'|'linear'|'smoothstep';
  strength: 'hard'|'soft'; weight: number /* soft rows: the score at full satisfaction; hard rows: 0 */; extension: boolean /* true: a row the references lack, scaled by placement.extensionWeight (§4.7 S10b) */;
  id: string /* V11 §2.4's row id forms (cls/, fam/, sig/, sup/, cov/, spc/, bal/, dk/, pc/, drv/, rw/, ter/, ret/, deck/, deckok/, slot/, spec/, cross/), reported by PlacementSolver.explain */;
  unit?: 'district'|'walk'|'households'|'settlement'|'parish'; per?: number; target?: number /* kind 'coverage' only */ }
interface SupplyEdge { resource: string; maxDistanceM: number; mode: 'street'|'river'|'sea'|'road'; strength: 'hard'|'soft'; weight: number;
  perConsumers: number /* S2's need propagation: one provider per this many consumers (§4.2 S2) */; substitutes?: string[] /* resources whose provider also satisfies this edge (S2's need propagation, S10b's links) */ }
interface DesignationTemplateRow {   // one per band of §4.5's band set; continuous columns interpolate along the prosperity value, discrete ones read §4.5's discrete-cell rule — a band without a row reads the nearest rowed band below (§4.7 S11)
  band: string; specialisation?: string /* discrete: the designation's variant in this band; drives the use's specialisation, its description and its room programme (item 28) */;
  plotAreaM2: [number, number] /* the size budget a join is asked for (§4.7 S10 (7)) */; footprintM2: [number, number, number] /* p10, p50, p90 */; floors: [number, number];
  heights: string /* the template family's HeightsRow (V11 §2.8), with its attic, parapetCm and towerStoreyCm columns */;
  structures: { role: string; count: [number, number]; footprintShare: number; required: boolean; houses: boolean /* item 28 (f): a residential slot — its building houses households by §4.7's generation fill; a live-in class's main slot is one whatever this cell holds, unless §4.7's fill finds it no household (BuildingSlot.unhoused, §2.5) */;
    composition?: string /* stage 3: the slot's own CompositionRow (V02 §2.3); absent: V02 §3.2's role chain */ }[] /* the slot list: main building, workshop, forge, yard, court, stables, store, dwelling, journeymen's rooms … data-defined roles */;
  arrangement: 'row'|'compound'|'detached'|'hovel'|'tents'|'cluster'|'institution'; coverage: number; densityShift: number;
  jitter: { maxM: number; minM: number } /* m — item 43's cap and floor (§4.7 S11) */; separation: 'party_wall'|'slot'|'passage';
  frontage: 'none'|'lean_to'|'stall'|'shopfront'|'arcade'|'gate'|'wall' /* discrete: the main slot's frontage treatment; the entrance set is §2.6's */;
  yard: { part: string; share: number }[] /* court, garden, formal_garden, forecourt, orchard, midden, pen … (§2.5 YardPart) */; bounds: 'none'|'fence'|'hedge'|'wall'|'railing' /* the compound rows' 'wall' is an extension the parity presets set to 'fence' (item 44) */;
  programme: string /* item 28: the key of a RoomProgramRow, read by §2.6's plan rung */;
  composition?: string /* stage 3 and item 110 (c): the CompositionRow (V02 §2.3) the massing and the composer read for the main slot — the base outline builder's stepped construction from M3a (item 426); absent: V02 §3.2's resolution chain */;
  underSize: 'compact'|'refuse' /* what the mutator does when the plot cannot be joined to the size budget (§4.7 S11) */;
  replaceability: 'immediate'|'short'|'long'|'ruin_only' /* item 31: read at the plot's builtBand row */;
  works?: string /* item 67: the key of the WorksTable row (§4.11); absent: the class's default row */;
  households: { built: number; max: number } /* item 31: the households the design is built for, and the most it holds when let out */;
  entrances: { side: number; rear: number; service: number; capSide: number; capRear: number; yardDoorMinM2: number } /* item 29: side, rear or service door probabilities given an access edge beyond the frontage, their caps, the yard area that recommends a yard door — §2.6 reads them */;
  cellar: { prob: number; kinds: { full: number; half: number; walkout: number }; slopeCm: Cm; rockCost: number; depthCm: Cm /* default 220 */; insetCm: Cm /* default 60 */ } /* item 29 (b): §2.6's basement decision's inputs; the terrain gate is §2.6's, its values the basementGate row */ }
interface UseRuleRow { serviceRadiusM: number; closeShare: number; closeAfterYears: number; starveAfterYears: number; inertia: number; moveChance: number /* per year */ }   // §4.11's use step (item 17): a use closes when its Use.strain (§2.7) of kind demand has lasted closeAfterYears, or of kind supply starveAfterYears, on the weekly clock; a document's epoch counts migrate to years one for one (§7.5)
interface DistrictKindRow { kind: string; relations: RelationRule[] /* read by §4.5's typing scorer and S7b's affinity rows, and by the solver for a whole-neighbourhood assignment (§7.7) */;
  affinity: { tag: string /* a class tag */; band?: [string, string]; weight: number }[] /* read by §4.5's typing scorer (a kind's score gains Σ weight × the remaining demand of the matching classes) and S7b (1)'s affinity (V11 §3.9) */ }
interface ConcealmentRow {   // item 63: one row of a clandestine class's default-mode weights (§4.7's Concealed institutions); our own rows, extension
  band?: string /* absent: every band; rows interpolate like every band row (§4.5) */; districtKind?: string /* absent: every kind */;
  weights: { none: number; front: number; hidden: number; underground: number } /* the non-none weights are extension, scaled by placement.extensionWeight (0 in the parity presets) */;
  hiddenWithFront: number /* the share of hidden and undercity placements that also take a front, drawn on siting */;
  accessMultiplier: number /* item 64: × the access probability of a surface building that carries this concealed use (II.7.3); default 6 */ }
interface CoverRow {   // item 63: the plausible fronts of one concealed class; our own rows, extension
  trueCls: string /* the concealed class */; band?: string /* absent: every band */;
  covers: { cls: string /* a front class whose designation template has a row at the band */; weight: number }[] }
interface RosterSettings {   // the 'settings' row of roster.settings (V11 registry row 24); the cells' values and meanings are V11 §3.5.1's
  rosterMode: 'minimiseUnemployment'|'matchRatios'; unemploymentThreshold: number; propagation: { depth: number }; placement: { extensionWeight: number };
  detourFactor: number; crypt: { rankShare: number }; coverage: { rosterWeight: number } }
interface SubLocationRow {   // a class's sub-location template: each building of the class takes one `SubLocation` (§2.6) per row (§4.7 S11); read by §10.3's schedules; empty in the base's rows, @plat/sim's M4b rows fill them (V11 §3.21.4)
  name: string; tags: string[] /* table, counter, stage, bed, bath, pickup, deliver, … */; capacities: SubLocation['capacities'] /* §2.6 */; relax?: string[] }
interface SquareQuotaRow {   // table 'squares.quota' (V11 registry row 91; file f item 301): the one square quota, a base table in @plat/tables read from M2b — by S7b (3)'s claims larger than a block (§4.5) and by S9b's sub-block remainder (§4.7 S9; V01 §3.5); key 'band'; its default rows V01 §3.5.2
  band: string; haPer1000: number /* typed-square target per 1 000 inhabitants of the district */; kind: Partial<Record<DistrictKind, number>> /* factor */ }
interface GrandeurCeilingRow {   // table 'grandeur.ceiling' (V11 registry row 97); key 'rung'; its rows V11 §3.25.4 (item 115)
  rung: Rung; enabled: boolean /* false on every row = no ceiling (the no-op pin); the parity presets false */;
  dwellingFamilies: string[] | 'all' /* V02's composition families a dwelling other than the manor may take */;
  towers: boolean; turrets: boolean; gatehouse: boolean; courts: boolean /* on a dwelling other than the manor */;
  manor: { max: number | 'unbounded'; requires: 'specified'|'lordOrSpecified'|'none' }; allManorsRow: boolean /* S10b's rich row "all manors" applies */ }
interface GrandeurCeilingSettings {   // the named row 'settings' of the same table (V11 §2.1's settings form)
  grandClasses: BuildingClass[] /* the classes whose dossier-bound record SPECIFIES a grand building (V08 §3.16 (3)); live roster.classes keys, V11 §3.25.4 */ }
type CrisisLookKind = 'siege'|'blockade'|'refugeeCamp'|'quarantine'|'famine'|'beast'|'raiders'|'disaster'|'occupation'|'rebellion'|'boom'|'bust';   // item 122 (b)'s looks
type CrisisPlace = 'beyondWalls'|'approachRoads'|'approachByGate'|'outside'|'affectedQuarter'|'fields'|'edge'|'outlyingFarms'|'gatesAndKeep'|'streets'|'neighbourhoods';   // *Crisis looks* (d)
interface CrisisLookRow {   // table 'crisis.looks'; key 'kind'; its rows V11's (item 122; J135)
  kind: CrisisLookKind; place: CrisisPlace /* where its main part stands; a kind's further parts are (f)'s */;
  band: 'city'|'district'|'neighbourhood' /* the coarsest band it shows at (item 122 (d)); §8.2's look rows add detail at each finer band */;
  scale: Record<Rung, [number, number]> /* its extent at severity 0 and 1, linear between — m² of camped ground at a camp place, else the share of its place's units ((c)) */;
  priority: number /* the camp looks' turn on the outskirts, lowest first: siege, then quarantine, then refugees ((e)) */;
  lookLevel?: [number, number] /* the disaster row only: item 123's decay level its districts' buildings draw at severity 0 and 1, linear between */ }
interface CrisisMapRow {   // table 'crisis.map'; key 'from/key': the closed mapping, a dossier row set read at the pinned baseline (V08; its rows V11's)
  from: 'stressor'|'archetype'|'event' /* a SettlementForge stressor type, condition archetype or simulator event */; key: string; look: CrisisLookKind | 'none' }
interface CrisisLookSettings {   // the named row 'settings' of 'crisis.looks' (V11 §2.1's settings form); every cell V11's
  densityCap: number /* the share of the outskirts' free land the camp looks may take together */;
  siegeStandoffM: number /* item 122 (b)'s ≈ 300 m beyond bowshot */;
  areaPerHeadM2: number /* item 122 (h)'s 45 m²: a camp's ground per head, an army's or a travelling group's */;
  enginesPerBesiegers: number /* item 122 (h)'s 1 500: about one siege engine per this many besiegers */;
  previewSeverity: number /* the severity a preview draws its look at (§2.9's `crises`) */ }
```

**The sequential roster (FTG-14; J-P20).** FTG's documented *shape* (`ftg-docs-params.md` §3.3), none of its 209 types, 80
nodes, 299 professions or 323 items. A **virtual population** advances on a fixed grid of Δ = 10 people up to the rung's
maximum. At each grid point the target count of every class is a monotone step function of the virtual population —
`perCapita` or `perOther` ratios converted to per-person ratios, core versus shop pools, lifestyle-banded pools with rare
outliers (weights ours), hard `min` / `max`, **size gates** (`firstAtPopulation`), **resource gates** read from
`SiteResources` (no farmland → no farms, shops instead), and, where a class has a coverage row and no dossier gives its
count, the coverage target as a weighted option beside its per-capita rate, never a minimum (item 103 (f);
`coverage.rosterWeight`, V11) — and every class below its target receives its next building, in class-priority then
class-id order (the compiler orders the classes so that every class a `with`, `without` or `perOther` names is drawn first,
refusing a cycle). Every draw is keyed by the building's ordinal (`roster/<class>/<ordinal>`: shop or core, lifestyle
outlier), so the n-th chandler is the same chandler at any population. The run records each building's **appearance
population**; the manifest for population P is every (class, ordinal) that appeared at or below P. Hence manifest(P₂) ⊇
manifest(P₁) whenever P₂ > P₁ (property test on 1 000 seeds, §13.2), an epoch's delta demand is exactly the suffix, a
population fall selects the suffix in reverse order, negative deltas arise only from declared circumstance events, and
§7.8's population control is monotone by construction. **Mode (COV-FTG-B06):** `settings.rosterMode`:
`'minimiseUnemployment'` (default: at each grid point, when the unemployed share of the virtual population exceeds
`unemploymentThreshold`, the workplace class with the largest weighted job deficit receives one extra building) or
`'matchRatios'` (the configured ratios only, FTG's alternative); both are grid-sequential, so both are prefix-stable.

**Output:** demand per class with area / frontage requirement classes, district affinities, cluster tags, live-in flags,
outside flags and wealth bands; the **town-level character** shifts the ratios — read from the economy slice's sector
shares (`circumstances.economy`, §7.7 layer 2) through each class's `sectors` weights, so one input drives both the roster
and the neighbourhoods' economy dial (items 72 and 78; an even mix, the neutral default, shifts nothing). **Government
(COV-FTG-B13):** the blueprint's `government` circumstance selects a `GovernmentRow` whose offices force seats — a crown
seat a royal castle or palace, a seigneurial lordship a lord's castle or keep, an ecclesiastical lordship a bishop's palace
beside the cathedral, a chartered commune a town hall and guild halls, a merchant oligarchy a merchants' hall — plus a
military share (guard posts per 1 000 inhabitants; barracks at CITY and above near the castle or the gates); the castle
toggle `auto` reads it. At the rungs whose `RungProfile.frameLaw` is `territory` the step reads the row's `villageSeat`
alone — a dossier government's (§7.7 DR11) or an `@seat` record's `villageSeat` class present with at least one member, a
request government's feeding only the `presence` conditions — and reads neither the row's seat class, nor its offices'
seat classes, nor its military share; there an `@office` record binds to the `villageSeat` member's building and a
religious office to the parish church, and a guard post arises only from a town-watch record or a class's `presence`
entries (V07 §3.2 (3), V07 §3.11). **Religion (COV-FTG-B14):** religions come from `ReligionRow`s with worshipper shares
(shifted by the town-level character), a practice share and clergy per 1 000; temples per religion are proportional to its
practising worshippers; each religion has a faction (§2.7). S2 writes each `Religion` record (§2.7) from them: its
`practiceShare` and `clergyPerThousand` copied from the row, its `deities` the dossier's `religion.deityKey` or
`deityName` when present (§7.7 DR14), else the row's pantheon — read by §10.4's dedication of the principal temple. S7b
then allocates the demand and S10b places it (§4.5, §4.7); where capacity is short, placement's reconcile and F-SITING's
ladder decide, and surplus capacity is typed as yards, greens or vacant plots (§4.7 S10b); population is honoured within
tolerance and reported (O7 a, e).

**Relation templates, supply edges, designation templates and use rules (items 16, 17 and 19; rows are data, §7.6,
re-signed by the corpus phase, §13.9).** A class's `relations` are the rows the placement solver filters and scores by (§4.7
S10a, S10b); its `produces` and `supply` are the resource and dependency graph S2's need propagation walks (§4.2 S2) and the
solver's links are bound on; a neighbourhood kind's rows serve §4.5's typing scorer and a whole-neighbourhood assignment
(§7.7). Default rows are the references' placement rules where a reference has one and soft tendencies where it has none
(item 23; `extension: true`, scaled by §4.7 S10b's `placement.extensionWeight`); the rows and their values are V11 §3.5's,
by class (the tannery's, brewery's, maltings', bakery's, warehouse's, inn's, market hall's, a trade group's shops' and the
mill's, its outside row §4.9's, among them). A row is hard only for a physical need (item 103 (c)), and in the parity preset
whose reference has the rule (§7.6's per-preset values).
The `template` rows are S11's (§4.7); the `useRules` are §4.11's use step's; the `produces` of the outside classes — grain,
timber, fuel, stone, ore, fish — are the hinterland's food, fuel and timber rows (§4.9, item 26). No row of this table names
a material: a material is a rendering attribute (§2.6), and §4.11's `WorksTable` alone reads it, for durations — time, never
shape (item 67).

**The siting rulebook (item 103; the rows V11's).** Each class carries a **siting profile** (`BuildingClassRow.profile`):
EMITS (smell, smoke, noise, fire risk, water pollution, heavy traffic, crowds, disorder, sacredness) and IS SENSITIVE TO (the
same list); NEEDS (running water, a river bank, a road, a gate, the harbour, the market, space, security, secrecy);
CLIENTELE (daily-local, town-wide, travellers, elite, clandestine), which sets access — daily needs dispersed by catchment
near homes, town-wide trades on streets feeding a market, travellers' services at gates, bridges and quays; SUPPLY (its
inputs and outputs, attracting by transport cost × volume); ALIGNMENT (law and enforcement versus crime; sacred versus
profane; elite versus common: opposites repel, like attracts); COMPETITION (a craft that clusters on its own street versus a
service that spaces itself for its catchment — the `distribution` column); COVERAGE (a catchment unit and a soft target per
unit); BALANCE, ORIENTATION and SPLIT (item 105, 107; below). A dozen **relation families** (`RelationFamilyRow`) turn
profiles into the solver's pulls automatically: `resolveSiting` (V11 §3.3.4) derives, per class, `RelationRule` rows (ids
`fam/…`) from the families; a sparse **signature-pair table** (`SignaturePairRow`, ids `sig/…`) adds, with its reason, the
relations the families do not capture (a bakery near the mill and the granary; a tannery near the shambles yet downstream
and downwind of homes; dyers upstream of tanners; smiths and farriers at gates and stables; the thieves' guild away from the
garrison, watch and courts yet near crowds and wealth). A catalogue kind gets a default profile from SettlementForge's tag
vocabulary, its own row refining it. Every family and pair row is soft with a weight, except true physical needs; the solver
sums the pulls with the field and the character under §4.5's soft-term contract (item 103 (c)). Provenance per row
(§7.6): emulation first — what FTG's resource graph and professions and MFCG's ward logic imply — then historically attested
siting, each row marked "general historical knowledge, not corpus-witnessed" where the historical checks record nothing
(item 104 (f); the corpus law "possibility, not prevalence" binds).

**Custom kinds — a profile from what the dossier carries (item 104 (a)–(e); the rows V11 §3.13).** A custom institution
(`source: 'custom'`, keyed by its `localUid`, §7.7) resolves its siting profile — and with it its class — by this order,
strongest first, each contribution recorded with its source: (1) the author's map-side declaration for that kind (item 101:
a place, a quarter, a pin, or a profile override stored in the map document by `localUid`, never written to the dossier);
(2) the scene archetype `sceneProfileId` → one of the 17 rows of `dossier.archetypes` (agrarian-farmstead, agrarian-mill, civic-archive,
civic-hall, domestic-house, exotic-tower, industrial-forge, industrial-workshop, martial-barracks, martial-keep,
martial-watchtower, mercantile-guildhall, mercantile-inn, mercantile-market, ruined-landmark, sacred-sanctuary,
sacred-shrine); (3) the free-text `category` → the generic profile of its catalogue category or content group, through a
small synonym table (`dossier.categorySynonyms`); (4) the `tags` → profile deltas through the canonical tag vocabulary
(its tag delta rows, V11 §3.13); (5) the definition fields when the port receives them, which it does only through the dossier (item 125 (a); §7.7; optional) — `authority` → the alignment family,
`defenseRole` → garrison, watch and fortification siting, `criminal` → clandestine and alignment rows (item 63's
concealment), `magical` → arcane rows, `foodImpact: produces` → an agrarian edge, `economicWeight` → significance (§4.5 (1))
and link volume (§4.7); (6) keywords of the name and description (`dossier.keywords`) — the weakest signal, flagged low-confidence
in the report; (7) the fallback, the generic `Other` profile (main-street frontage by `landmarkLevel`, no nuisance,
dispersed). `landmarkLevel: landmark` raises significance and asks for a prominent site (a square frontage, high ground, a
vista). The resolved profile, its sources and their weights are stored with the use, shown by the clerk and editable by the
author. Distribution and coverage default by the resolved profile (a service-like kind disperses by catchment, a guild-like
kind may cluster, a landmark is singular). Resolution is a pure function of the custom record, our tables and the map's
declarations, keyed by `localUid` (a rename changes nothing); a new revision (a changed content hash) re-resolves the
profile and re-sites the use by least disruption (§4.7 S10b). It never fails: a custom kind always resolves a profile.

**The supply web's rows (items 105, 107; V11 §2.5, V11 §3.7).** The goods table (`ResourceRow`) gives each good `bulk`,
`perishable`, `value`, `comfortM` (the satisfaction plateau, §4.7 S10b), `maxDistanceM`, `modes`, `security`, `site` (a
good sited on a hinterland land use, §4.2 S2), `demand` and `volume`; absent, `comfortM` is 0 and orientation `balanced`,
the base's linear decay. A class's **orientation** is derived from the goods table — `source` when its inputs' bulk × volume
exceeds its outputs' by a table factor (ore into iron, logs into charcoal), `market` when an output is perishable or bulkier
than the inputs (bread, beer, fresh meat), `balanced` otherwise — and overridable per row; its **balance profile** (everyday
service, town-wide specialist, heavy processor, wholesale and storage, defaulted from its clientele) weighs spread against
pull; its **same-kind spacing** row a radius per class; its **split** row declares a works and a shop (the butcher, the
brewer, the potter by default). Their on-off switches are V11 §3.7.4's (`siting.web.orientEnabled`,
`siting.web.splitEnabled`, false in the parity presets). A dossier chain's links weaken by the status table (`dossier.status`) for an
`impaired` or `vulnerable` status (item 105 (i)); an `entrepot` chain's ends are the import and export pulls (§4.7 S10b).

**Institution ladders (item 108; `dossier.ladders` of `LadderStepRow`, V11 §3.12, rows pinned to the port's baseline, provenance `ref:SettlementForge
institutionLadders.js`, re-checked when the baseline moves).** Every ladder pair and subsumption rule is typed by what the
step means on the map: COUNT (more of the same, numbered or "multiple") — a collective record whose members are n buildings
of the lesser class; QUARTER (a trade's district or quarter) — a district-defining record whose district holds the raised
share and which owns the trade's members (§4.5 (3)); GUILD (a trade's guild) — one guild hall, the record's own
building, plus a collective of the trade's workshops tied to the record; SIZE (a bigger single establishment: brewery, major
hospital, city hall, garrison, shipyard; city granaries as one compound of several stores) — one larger building or compound
by its template, no extra members; REPLACEMENT (a professional watch over the militia, city walls over town walls) — the
greater only. A custom institution whose library `subsumes` names other kinds is typed the same way — a guild-like kind over
a craft GUILD, a larger same-function kind SIZE — default SIZE when unknown. Member counts are S2's (§4.2 S2); a ladder step
over time adds or removes members by least disruption (V06): an upgrade keeps the existing building as member #1 and places
the rest; a demotion keeps the member nearest its demand and vacates or ruins the rest by fate (item 17). A step's
`identity` names the QUARTER row its district takes (`QuarterIdentityRow.definedBy`).

**Markets, wealth bands and the countryside's rows (items 24, 26 and 27).** The `market` class row demands the markets by
size — `min` 1 (the principal), `firstAtPopulation` 10 000 and `perCapita` one per 12 000 inhabitants for the secondaries,
`secondaryChance` 0.15 at TOWN (our own rows; §4.2 S2; §13.5's anchors are MFCG's secondary plazas and FTG's two market
squares) — and the market hall's and the market trades' rows cite the market they serve by rank (`nearMarket`, the
principal by default). `HouseholdRow.band` and every class row's `lifestyleBand` name a band of §4.5's band set; the
household shares' default weights are FTG's captured lifestyle distribution (§4.5's table; provenance `ref:FTG lifestyle
distribution`), shifted by the town-level character, and every band-keyed row set of this table may omit bands, which
interpolate (§4.5, item 27). The farm table's fuel and timber rows, the farm modes and the outside classes' seeding rows are
§4.9's. The sky rows (item 213; V05 §2.4; their values V11's): the district kinds `sky-island`, `sky-palace`, `sky-temple`,
`sky-prison` and `sky-tower` (keyed apart from every ground kind), and the classes `sky_landing` and `sky_landing_top`, a
positioned pair placed by their access and never by a pull, `sky_landing` with a `front` column for a secret access's
landing.

**Under a fall (AM-8).** A population fall selects the suffix in reverse ordinal order, and its households leave by §4.11's
step (c); it never removes a building by arithmetic: the standing stock follows with §4.11's dwell lag, and a later rise
reoccupies the same suffix first. `BuildingClassRow.salvageM3` is the class's material yield when robbed, cleared or
dismantled, and the debit of a build or repair of that class — read by §4.11's ledger.

**Replaceability, households, entrances, cellars and the room programme (items 28, 29 and 31; J-A28.43, J-A29.41).**
`DesignationTemplateRow` carries them in its `replaceability`, `households`, `entrances` and `cellar` columns (above);
`RosterTables.roomProgram` holds the room programmes and the plan rung's tables — the role table (`RoomRoleRow`), the
furniture catalogue (`FurnitureRow`), the plan geometry row (`PlanGeometryRow`), `PatternRow`, `EntranceAnchorRow`,
`WingAffinityRow`, `SubLocationRoleRow` and `AccessHostRow`, their types and default rows V03 §2.4 — and
`RosterTables.basementGate` the basement's terrain-gate values:

```ts
interface RoomProgramRow { for: { cls: BuildingClass | string /* a V11 class id, or '*' in a generic slot row */; family?: string /* a V11 template family */; slot?: string /* a structure slot role, '#n' for the n-th of that role */; half?: 'works'|'shop'; band: string; use?: string /* a specialisation name (V11 §3.6.2) */; era?: string };
  rooms: RoomRuleRow[] /* the programme */; shared?: 'all'|'none'|RoomRole[]; unitHearth?: boolean; unitOneRoom?: boolean; fill?: RoomRole[]; staffSleepIn?: number; seatingExits?: boolean /* V03 §2.4, V03 §3.3 S6 (d) */;
  pattern: Record<'basement'|'ground'|'upper'|'top', { weight: number; pattern: LayoutPattern }[]> /* §2.6's layout patterns, weighted per storey class */; circulation: { num: number; den: number } /* integers: the share num/den of a storey given to halls and corridors — §2.6's capacity reads it exactly */;
  stair: { placement: 'by_entrance'|'rear'|'centre'|'tower'; kind: StairCore['kind'] } /* the stair core §2.6 places before any cut */; basementAccess: 'core'|'trapdoor' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand */;
  furnish: { density: number; wallBias: number } /* multipliers (default 1) of the role table's cells */ }
interface RoomRuleRow { role: RoomRole /* §2.6: data-defined */; scope: 'unit'|'shared'|'service'|'circulation' /* item 28 (f): a room of one household's unit, one the households share, the use's or the staff's, or a corridor or stair hall — §2.6's interior ladder says which scopes a band's row allows */;
  count: { n: number; law: 'const'|'perHousehold'|'perStorey'|'perCapacity'|'perSubLocation'; capacity?: string; tag?: string; perRoom?: number /* the perCapacity divisor */ };
  area?: [number, number, number] /* m²: min, target, max; absent: the role table's cell (V03 §2.4) */; storey?: 'any'|'ground'|'upper'|'top'|'basement'|'notBasement'|'belowTop' /* absent: the role's */; exterior?: 'none'|'some'|'max'; door?: 'door'|'arch'|'open' /* absent: the role's */; maxDoors?: number;
  adjacency?: { kind: 'hard'|'soft'; to: 'core'|'entrance:main'|'entrance:yard'|RoomRole; via?: 'direct'|'corridor'|'under' }[] /* absent: none */; priority: 'hard'|'soft'; hearth?: boolean; half?: 'works'|'shop'|'both' /* default both */;
  concealed?: boolean /* item 63: a room of a concealed use's programme — placed away from the main entrance and off the public circulation hub (§4.7) */;
  furnish?: { density: number; wallBias: number; glyphs: string[] } /* absent: the role's */ }
interface BasementGateRow {   // item 29 (b): the values §2.6's basement gate reads; one row per table version
  waterTableM: M /* default 40: within this distance of a shore the water table is the nearest water body's surface plus the freeboard */;
  freeboardCm: Cm /* default 50 */; drainageAccumCells: number /* default 100: the flowAccum at which a hydro cell is the drainage line elsewhere (§2.3; our own, calibratable) */ }
```

The **room programme** lists the rooms a building of that class, use and band must and may have — each with its size band in
m², its storey, its openings, its adjacencies and how many (a fixed number, a number per storey, one for each household of
item 31's `relet`, or a sub-location's capacity) — which §2.6's plan rung writes first and then cuts the walls to fit (item
28), so rooms are never cut before the programme is known. The programme rows follow §2.6's **interior ladder** (item 28
(f)): the ladder's row for the occupants' band gives the cross-class structure — how many households the shell holds, each
unit's rooms, the shared rooms, the staff rooms and their size beside the owners', the circulation form and how large the
rooms may be — and a class's programme row adds what a smithy, an inn or a chapel needs; the `programme` row is read at the
occupants' band (the field band, J-A19.43) and the `households` column at the plot's `builtBand` (the shell's capacity,
§2.6), so the interior has no floor while the shell keeps its own (§4.11). `LayoutPattern`, `StairCore` and `RoomRole` are
§2.6's, with the role names. The plan rung's `plan.program`
stream draws the fractional part of a count law (§6.1). Households per building follow the roster's households — with a
dossier, the households that fill its population (§7.7's derivation table; item 20 (h)) — and item 17's relocation (§10.3);
the `households` row and the shell's floor area bound `relet` through §2.6's one capacity function, which the generation
fill (§4.7), `relet` and F-PLAN (§5.2) all read; with no epoch every residential building houses what §4.7's generation
fill gives it — at least one household and never above its capacity — so the static baseline is unchanged (item 23). Every
column is data with provenance, editable and calibratable (§7.6, §13.9). The entrance rows default to one street entrance
per building — the owner's rule (item 29; provenance `owner`): the FTG client of the 2026-09-25 capture sends no door, its
road-facing anchor being a night light (item 50), and MFCG 12710731's model carries no door record (an inference) — with
side, rear and service doors as our tendencies (`extension`, 0 in the parity presets, item 23); the cellar rows are item 29
(b)'s class rows, whose extensions §2.6's emulation note names; the reference's basement share is a descriptive baseline
only (§13.5).

**The `drain`, `underground`, `undercity`, `undergroundAccess` and `crypt` columns (II.7; items 12, 14, 64, 65 and 109).**
`BuildingClassRow.drain` is the class's drainage need: `none` (tents, sheds, hovels), `pit` (households and most workplaces:
a cess pit or the street gutter of their own), `channel` (the trades and institutions that discharge foul water: tanners,
dyers, fullers, brewers, slaughterhouses, baths, hospitals, monasteries); `underground` names which classes a sewer-front
underground neighbourhood may hold or prefers (II.7.3); `undercity` which classes the undercity may hold or prefers (II.7.5)
— `preferred` for its microcosm: the black market, a fence's hall, a criminal guild's seat, a tavern, a forbidden shrine, a
fighting pit, a healer; `allowed` for the dwellings of the squalid and poor bands and the small trades that serve them;
`never` for the rest; `undergroundAccess.prob` is, per band row interpolated along the value, the chance that a surface
building of the class whose basement reaches an underground element holds an access down to it (II.7.3's *Basement
accesses*) — higher for breweries, bathhouses, warehouses and inns (0.15–0.30 by band), low for houses (0.02, raised with
the plot's age by II.7.3's age term), 0 for a barracks, a courthouse and a temple; a user adds an access to any building by
item 66's edit (§7.3 item 9); `crypt` and `cryptM2` are the churches' crypts (the cathedral `always`, the largest crypt in the
settlement; other churches by their rows; crypts are never catacombs, II.7.6). Every non-`never`, non-zero cell is an
`extension` (no reference has an underground).

**The `concealment` column and the cover table (item 63).** `BuildingClassRow.concealment` gives, for a class our tables
mark clandestine — a thieves' den, an assassins' house, a smugglers' store, a forbidden cult, a black market, a spy ring —
its default-mode weights per band and district kind (`front` highest in every band, `hidden` next in the poor and squalid
bands, `underground` where an underground allocation may exist), the share of hidden and undercity placements that also take
a front, and the multiplier on the building's access draw; `RosterTables.covers` gives each concealed class its weighted
plausible fronts per band (an assassins' house behind a tavern, a fencing hall or an apothecary; a smugglers' store behind a
warehouse or a chandler's; a thieves' den behind a tavern, a pawnshop or a bathhouse; a forbidden cult behind an almshouse,
a bathhouse or a bookbinder's …), and `RoomRuleRow.concealed` marks the rooms of a concealed programme. Every row is our
own and an `extension`, so the parity presets conceal nothing; how they are read is §4.7's *Concealed institutions*.

**The rows of items 70–72, 78, 79, 82 and 88 — their types and default rows.** Every row is our own, calibratable (§13.9)
and an `extension` — zero, a step or empty in the parity presets (item 23) — unless it says otherwise.

```ts
interface ClassMixRow {   // item 71 (§4.7's class mix): one row per band of the band set; a band without a row interpolates (§4.5)
  band: string; weights: { cls: string /* a residential class id */; weight: number; wealthShift: number /* × (wealthLevel − 0.5), §4.7 */ }[];
  prestige: { frontage: 'tier1'|'square'|'park'|'corner'|'water'; weight: number }[]; sun: number /* item 102 (d): prestige.sun, × the climate row's sunlight cell */ }
interface ClusterRow {   // item 70 (§4.7's informal clusters): by band × climate × era
  band: string; climate?: string; era?: string; kinds: { cls: 'shack'|'tent'|'lean_to_shelter'; weight: number; footprintM2: [number, number]; depthM: [number, number] /* drawn in the range on siteplan */ }[];
  householdsPerStructure: { rung: string; range: [number, number] /* households.built of a structure, drawn on siteplan */ }[];
  pathWidthM: number; fireGapM: { rung: string; m: number }[]; wholeBlock: number /* the share of eligible blocks S10 (7) joins into one informal plot */; relations: RelationRule[] }
interface TenureRow { band: string; informal: boolean /* this band's plots with no standing building but shacks, tents or lean-tos are informal (§4.7) */ }
interface QuarterIdentityRow {   // item 72 (d′) (§4.5 (4)): an emergent or dossier-declared identity
  id: string; families: { family: string /* a V11 §3.4 profile family key */; weight: number }[]; threshold: number; perHa?: boolean /* the threshold per hectare of the district */;
  bands?: [string, string] /* the district's band within */; priority: number; singular: boolean;
  power?: string /* the power kind its quarter dial follows */; sector?: string; kind?: string /* the S6 kind an epoch re-types a district to past the hysteresis */;
  definedBy?: string /* a class whose dossier record is district-defining — a QUARTER record's member class (item 108 (a); LadderStepRow.identity names this row) or a class whose row is district-defining: the identity a dossier instance of it claims */;
  targetShare?: number /* its share of that district's placed uses */; magicOnly?: boolean /* admitted only where the magic circumstance is not 'none' or the dossier lists an arcane power */; naming: string /* the naming slice its names draw from (§10.4) */ }
interface PowerLinkRow { element: 'gate'|'wall'|'tower'|'bridge'|'road'|'quay'|'market'|'tollHouse'|'customsHouse'; powers: { kind: string; weight: number }[] }   // item 72 (d″): the infrastructure's powers (the classes' are their `powers` column)
interface SectorLinkRow { element: PowerLinkRow['element']; sectors: { sector: string; weight: number }[] }   // item 72 (d4): the infrastructure's sectors, weights summing to 1 per element
interface BandRangeRow { band: string; lower: [string, string] /* [floor, ceiling] for a district in the band's lower half */; upper: [string, string] /* in its upper half */ }   // item 72 (d‴) (§4.5 (5))
interface SectorRow { id: string; tags: string[] /* the class tags whose classes serve the sector by default */ }   // item 78
interface PortRows {   // item 88: the staged rows the dossier port fills (§14) — schema-complete and empty in the base
  impairments: { type: string; physical: boolean; conditionSteps: number /* a physical type's condition steps per severity band on the building (§7.7's F4 row); a non-physical type's steps per unit of severity on the institution's own dial term (§4.5 (6)) */ }[];
  hinterland: { importPct: number /* 0–1 */; foodChain: Record<string, boolean>; farmlandScale: number } | null /* one row; null while empty (§4.9) */;
  crime: number | null /* in [0, 1]; the staged crime term of §4.6 */;
  customKinds: { kind: string; criticality?: number; economicWeight?: number; defenseRoles?: string[]; powerAuthorities?: string[] }[] /* the rows in force are this table's (empty in the base) overlaid at read time by one row per carried custom institution, from its carried custom-def fact (V08 §3.11); never written into the recipe's params; a custom kind's class is item 104 (a)'s resolution (V11 §3.13) */;
  legitimacy: number | null /* on the government record: × the governing power's amplification in §4.5 (6)'s institution dial, 1 while empty */ }
```

* **Class mix (item 71).** Default weights over the residential classes — squalid: hovel 0.8, row house 0.2; poor: hovel
  0.3, row house 0.6, cottage 0.1; modest: row house 0.6, cottage 0.2, house 0.2; comfortable: row house 0.3, house 0.6, town
  house 0.1; prosperous: house 0.5, town house 0.35, manor 0.15; rich: manor 1.0 — the manor share rises monotonically from
  the prosperous row to all manors in the rich row; `wealthShift` manor +1.0, town house +0.5, house 0, cottage −0.2, row
  house −0.3, hovel −0.6; prestige weights `tier1` 1.0, `square` 0.8, `park` 0.6, `water` 0.6, `corner` 0.4; `sun` 0.3.
  The parity presets make each band row one class, its class rows' `lifestyleBand` pool (a step at each cut), with `sun` 0.
  The `shack`, `tent` and `lean_to_shelter` rows are the cluster's structure classes (§4.7), never drawn by the class mix
  (J-A70.49).
* **Clusters and tenure (item 70).** Squalid: shacks 0.5, tents 0.4, lean-to shelters 0.1; poor: shacks 0.7, lean-to
  shelters 0.2, tents 0.1; footprints shack 6–20 m² (depth 3–4 m), tent 6–15 m² (round or oblong, depth 3 m), lean-to
  shelter 4–12 m² (depth 2 m); households per structure 1 at TOWN, up to 2 at CITY and up to 3 at METROPOLIS in the squalid
  row, while the poor row gives 1, 1 and up to 2; `pathWidthM` 1.2, `fireGapM` 1.0 (in the squalid row 0.8 at CITY and
  METROPOLIS), `wholeBlock` 0.2 in the squalid row, 0 otherwise; relations `nearWater` and the lee of walls and ruins, soft.
  The `shack`, `tent` and `lean_to_shelter` class rows (distinct from the `lean_to` frontage treatment): `drain` `none`,
  `replaceability` `immediate`, cellar 0, one floor, a programme of the one-room unit with no circulation, `households` from
  the cluster row. Tenure: squalid and poor `informal: true`.
* **Distribution and significance (item 72).** `distribution`: `singular` and `district-defining` are the rows V11 §3.5
  marks (a QUARTER record's members are district-defining by item 108 (a)); every other class `dispersed`. `significance`:
  cathedral, great temple and palace 30; castle 20; university 15; church 8; guildhall, town hall and market hall 5; chapel
  3; inn 1.5; workshop 1; shop 0.5; lodging house 0.3; house 0.2; cottage 0.1; shack, tent and lean-to shelter 0.05.
* **Quarter identities (item 72).** The identity rows are V11 §3.10's, their family keys V11 §3.4's profile families: the
  religious, craftsmen's, merchants', harbour, garrison, learned and arcane quarters (the arcane `magicOnly`, the row a
  Mages' Quarter naming claim biases toward, item 82), the defined districts (red-light, by its QUARTER record, J-A72.51)
  and the quarter-claim identities (slums, foreign, guild district), and the plain residential identities, one per band,
  lowest priority; each row's `naming` slice is our naming pack's (§10.4).
* **Powers and sectors (items 72, 78 and 79).** The classes' `powers` column — guildhalls and workshops `guild`; merchant
  houses and warehouses `company`; churches, chapels and temples `religion`; the castle, manors and keeps `lordship`; the
  town hall and the courthouse `council`; barracks and guard posts `military`; mage towers and alchemists `arcane` (only where
  the magic circumstance or a dossier arcane power admits it); the clandestine classes `criminal` — each an association the
  dossier's `Institution.powers` overrides (§2.7). `powerLinks`: gates 0.5 `military`, 0.5 `council`; walls and towers
  `military`; bridges, roads and quays `council`; the market square `council`; the toll and customs houses `council`. The
  sector set (`sectors`, item 78): trade, taxes and tolls, crafts, agriculture, extraction, fishing, finance, religion,
  military, magic, crime. The classes' `sectors` column and `sectorLinks`: markets, warehouses and quays → trade; gates,
  bridges and roads → taxes and tolls 0.7, trade 0.3; walls, toll houses and the customs house → taxes and tolls 1.0;
  workshops and guildhalls → crafts; farms, mills and granaries → agriculture; quarries and mines → extraction; fisheries →
  fishing; moneylenders → finance; churches → religion; barracks → military; mage towers → magic; the clandestine classes →
  crime.
* **Band ranges (item 72).** squalid: squalid–poor in both halves; poor: squalid–modest; modest: poor–comfortable;
  comfortable: modest–prosperous; prosperous: comfortable–rich (the middle band to rich, item 71's mix); rich: prosperous–
  rich in its lower half, rich alone in its upper half.
* **Notice posts (item 82).** A `notice` pin stands where §4.7's furniture step puts one: at the principal market and at each
  gate plaza by default, at the main entrance of every class whose `tags` hold `notice` (a town hall, a market hall, a
  guildhall), and wherever a named-feature claim of the dossier names one (§7.7).
* **The port's staged rows (items 88, 104; W-DOS-03).** `portRows` is declared in full and empty; the values in force of
  `crime`, `hinterland.importPct`, `hinterland.foodChain` and `legitimacy` are the current slice's `port` values when not null
  (`CircumstanceSlice.port`, §7.7; V08 §2.5), else this table's. Each acts only through its readers: `impairments` §4.5 (6)
  and §7.7's F4 row; `hinterland` §4.9's farm table (`importPct`, `farmlandScale`, `foodChain`); `crime` §4.6's hidden share,
  II.7.3's access and II.7.5's undercity demand; `customKinds` item 104 (a)'s resolution (its definition fields), §4.5 (1)'s
  significance and §4.7 S10b's chain links (`economicWeight`); `legitimacy` §4.5 (6). While empty every factor is 1 and every
  list empty.
* **Grandeur ceiling (item 115; J127).** `RosterTables.grandeur` holds the table `grandeur.ceiling` (its shapes above;
  its rows V11 §3.25.4, registry row 97): one `GrandeurCeilingRow` per rung — `enabled`, the limits on every dwelling but
  the manor (`dwellingFamilies`, `towers`, `turrets`, `gatehouse`, `courts`), the manor's `max` and `requires`, and
  `allManorsRow` — and the named row `settings`, whose `grandClasses` are the classes whose dossier-bound record specifies
  a grand building (V08 §3.16 (3), the one home of "specified"). Its readers: S2's manor
  count at the `territory` rungs (§4.2 S2), S10b's class mix (the rung ceiling, §4.7 S10b *Class mix* (3)) and S11, which
  hands the dwelling limits to V02's composition chain (§4.7 S11), and V06's epochs at the epoch's rung (V06 §3.8.5). A row
  `enabled` false is no ceiling (the no-op pin; the parity presets). Its bars: §13.2's item-115 rows and T-V11-41.
* **Seasons (item 117; J128).** The climate row's season columns, `ClimateRow.seasons` (V11 §2.8's `ClimateSeasonCells`;
  values V11 §3.25.6): the winter's severity (`none`, `mild`, `cold`, `severe`) and the weeks, 0–51 spring first, of leaf
  colour, leaf fall, blossom, growing, harvest, hay, ice and snow, a band wrapping the year's end. A look only: read by
  §8.2's season rows, §11's exports and §7.7's season derivation row, never by a stage, so no season changes the model or
  its hash (item 117 (a); §4.2 S0, §4.9 *Species and climate*). Its bars: §13.2's item-117 rows and T-V11-42.
* **Festival decorations (item 118; J129).** `RosterTables.festival` (V11 §2.8d's shapes; rows V11 §3.25.7, registry rows
  102–105): the decoration table by tier and kind (`decorations`: each row's rung or `SKY`, item, place, band, count rule),
  the staging keyword table (`staging`: a keyword's place kind) with its fallbacks by festival kind (the named row
  `fallback`), the culture and season motifs (`motifs`) and the generic festivals of a standalone map (`generic`). A look
  only, read by §8.2's decoration rows and §11's image exports, never by a stage (item 118 (a)): a festival's place is the
  dossier's named place, else its staging keyword's place kind, else its kind's fallback, and never over a keep-out or a
  gate's passage; each tier draws its own rows and never a larger tier's (item 118 (d)). Its bars: §13.2's item-118 rows and
  T-V11-43.
* **Crisis looks (item 122, with (h)–(i); J135, J138).** `RosterTables.crisis` (its shapes above): the look rows by
  kind (`looks`), the closed mapping from SettlementForge's words to a look (`map`) and the `settings` row — every value
  V11's: the look rows, the `map` rows (a dossier row set whose totality V08 checks at the pinned baseline), the density
  cap, the standoff, the preview severity and item 122 (h)'s rates. The look rows and settings land at M3b with item 118's
  decoration engine, the `map` rows with the port at M-SF (§16); before them the `map` set is empty and every condition
  reads `none`.
  (a) **A look only.** The table is read by §7.7's DR44, §8.2's crisis look rows, §11's picture exports (a battle map's
  image only, never its walls or obstacles), V09's Find listing and the placement services below — never by a stage — so
  no crisis moves, adds or removes a building, way, wall, plot or water edge or changes the model, a digest or the hash,
  and a look stores nothing. What stands in a view is DR44's: each `ConditionOverlay` whose weeks hold the view's week (§2.7's
  reader comment) and whose map row gives a look, admitted at the viewer's key (a withheld condition is never drawn, listed,
  counted or named); §2.9's `crises` key switches the looks off or previews one look with no condition, at
  `previewSeverity` and the map's rung. What a crisis leaves reaches the map only through the epoch path (V06's
  hand-over). An edited row (§7.6) redraws the looks and changes nothing else.
  (b) **The closed mapping.** An overlay reads the `map` row of its source — a `cond:stress:<type>` overlay the `stressor`
  row of its type, an overlay V08 made from a simulator event that event's row, any other the `archetype` row of its
  archetype (V08 §3.11) — and draws the look its row names, or nothing for `none`; the regional_* pressures are `none`. A
  source with no row reads `none`, reported `unmapped_word` (V08), so nothing falls through (T122-4).
  (c) **Scale.** A look's extent at the map's rung is its row's `scale` at severity 0 and 1, linear between (severity
  clamped into [0, 1]): camped ground in m² at a camp place (`beyondWalls`, `approachRoads`, `approachByGate`, `outside`,
  `gatesAndKeep`'s camp), else the share of its place's units ((d)). **By headcount** (item 122 (h)): where the dossier
  gives a force's or a group's size (V08's fields, in development, confirmed by item 125 (d)), its camp is sized by it,
  never by severity — each army its own camp of `areaPerHeadM2` × its heads, a travelling group's (migrants, pilgrims, a
  caravan) at the same rate, so two armies joined make twice the camped ground; where it gives none, the condition's or
  calamity's own count (`exodus`, arrivals) stands for the heads; a size of 0 or less reads as none given; with no count
  at all the scale by severity and tier holds.
  (d) **Placement** is by keyed draws on §8.10's render keys from the seed, the condition's id and the place (DR44; a
  preview keys on its look kind in the condition's stead), never a model stream, so a crisis draws the same in every view
  and export. A look stands only on the ground arena's part 0 and never on water, a way's carriageway, a gate's passage
  (its opening and 4 m along its way each side, as §8.2's festival rows keep it) or a label's keep-out. The outskirts'
  land is V01's `campLand(doc)` — the commons and fallow faces at the districts' outer edges and the approach roads'
  verges by the gates. The **main approach road** is the arterial out of the gate of greatest trade weight (§4.3's
  `TradeFlow`), else the way of greatest trade weight leaving the built edge. Each place ranks its land or units, ties by
  the keyed draw:
  * `beyondWalls` — the land faces at least `siegeStandoffM` beyond the outermost standing enceinte's outer strip
    (`campLand`'s and the hinterland's land-use faces there) along its walled arcs; a closure arc with no wall (V11
    §3.16.1) draws none;
  * `approachRoads` — the verges of each arterial leaving the settlement beyond its built edge, one camp per road; a place
    no road reaches (S3 (9) (a)'s `unserved` mesa) takes the `campLand` nearest its boundary;
  * `approachByGate` — the `campLand` faces along the main approach road by its gate, nearest V06's
    `frontierFor(doc, households)`: where the next growth would seat the camp's people (V06);
  * `outside` — the `campLand` faces furthest from the main approach road, beyond the outermost enceinte's outer strip or,
    unwalled, the built edge;
  * `affectedQuarter` — the district a calamity's `targets` name (matched as `disasterDistricts` matches them, below),
    else the district with the most households per hectare of its land;
  * `fields` — the hinterland's field and pasture faces with the farms' pens (§4.9);
  * `edge` — the outermost enceinte's walled arcs or, unwalled, the districts' outer boundary;
  * `outlyingFarms` — the hinterland's farmsteads (the farm classes' outside plots, §4.9), outermost first;
  * `gatesAndKeep` — the main gates and the castle, else the principal plaza, for its banners; its camp on the
    `campLand` faces nearest them;
  * `streets` — the junctions and frontages of the districts' ways, the principal market's first;
  * `neighbourhoods` — whole districts by V01's `disasterDistricts(doc, overlay, key)`: the calamity's `targets` first,
    else its pattern (fire through contiguous blocks downwind from a keyed seed district, flood on the low ground by the
    water, earthquake scattered), the `disaster` row's `scale` the share of districts; at THORP, HAMLET and VILLAGE V07's
    ends (V07). Every building of a returned district draws item 123's damage at the row's `lookLevel` by severity, or at
    its own decay level where that is higher (V02, V03, V04; nothing stored) — no second, per-building share.
  (e) **Several at once** (item 122 (c)). The camp looks take the outskirts in `priority` order (siege, then quarantine,
  then refugees; ties by condition id), each from what the earlier left, together at most `densityCap` of the outskirts'
  free land. A camp that cannot take its ground — the cap reached, the frame and its margin full, a force too large for
  that land (item 122 (i)) — fills what is left out to the margin, and the rest is drawn as §8.8's massed camp marks on
  the surrounding ring at the city band, the panel giving the full number (V09).
  (f) **The kinds' own parts** (item 122 (b)). `siege`: camps at the standoff, a line of trenches and earthworks round
  the walled arcs at it, burned farmsteads outside, and siege engines facing the weakest stretches first (`breached`, then
  `patched`, then `worn` runs, item 114), then the gates — one per `enginesPerBesiegers` heads (the heads its ground
  implies, ÷ `areaPerHeadM2`, where no size is given), capped at one per gate and per curtain run of the walled arcs; a
  coalition's armies each pitch their own camp in their own colours (§8.2), spread round the town at bearings evenly
  spaced from a keyed start, so the larger the coalition the fuller the ring; a `siege` of a place with no standing
  enceinte draws the `blockade` row. `quarantine`: a fenced camp with huts, a pest-house, fresh grave rows and smoke at
  its place, and inside, at the neighbourhood band, marked doors and a cordon in the `affectedQuarter`. `famine`: its
  fields bare, over item 117's crop stage (§8.2), empty pens and the principal market's stalls shuttered. `disaster`:
  (d)'s `neighbourhoods`, ending in the week its `reconstruction` Works begins (V06: no week draws both). `occupation`:
  foreign banners on the main gates and the castle (else the principal plaza) and a garrison camp on its place's camp
  land. The rest at their places: `refugeeCamp` tents, carts and cooking fires; `beast` torn palisade sections,
  watch-fires and stake barricades; `raiders` burned farms, smoke, abandoned carts and barricaded roads; `rebellion` street
  barricades; `boom` scaffolding; `bust` shuttered shops.
  (g) **Framing** (item 122 (i)). The placed camps' bounds are the camps §2.9's opening view, Fit and item 116's zoom-out
  limit take in with the town while a look stands (model §2.9; the limit's stop 0 where nothing fits, §8.8).
  (h) **At its limits** (EP-27). No outskirts land left, an island town with no land beyond its shore, or a force larger
  than the frame and its margin: the remainder drawn as (e)'s ring marks; a siege of a place with no standing enceinte (a
  mesa whose every arc is a closure feature among them): the `blockade` row by `approachRoads`' rule, no engines; THORP to
  the METROPOLIS cap: each rung's `scale` cell; a headcount of 0 or none: (c); an unmapped source: (b); a condition whose
  `untilWeek` is not after its `sinceWeek`: never stands; no condition and no preview: every tile byte-identical to the
  base (`item122.crises`).
  (i) **Bars**: §13.2's T122-1 – T122-7 and V12's item-122 (h)–(i) measurements.
* **Rows at their limits (EP-18).** V11's compiler checks every row set before a model reads it (V11 §3.1, T-V11 bars): a
  range whose ends cross, a weight set that sums to 0, a band set missing its middle band, or two rows that contradict (a
  `hard` row no plot of the class's own template can meet) is clamped to the nearest lawful value and named in one line, or
  refused with its reason where no lawful value exists (item 101 R2 for an edit); a band without a row interpolates (§4.5).
  An edited row's lifecycle — saved in the document's override layer, undone, re-read by a regeneration, migrated by its
  table version and orphaned when its base row changes — is §7.6's and §7.4's.
=== END ===

=== REPLACE ### 10.3 People, households, relations, sub-locations, schedules ===
### 10.3 People, households, relations, sub-locations, schedules

**Households and people.** A person is a pure function `derivePerson(seed, key, tableVersion)` of its key — `(household
address, member ordinal, birth epoch)`, a successor's with its `bornWeek` (§2.7; a founding member's key unchanged, a
successor's `bornEpoch` held as 0), so identities do not depend on the cadence; the address is what survives a re-derivation
of the household's plot (§6.3), whereas the household's lineage changes on New random — and of the person tables its
household's `tableVersion` names (those current at its creation, advanced only by the re-derive people action below,
§7.4); it yields name, age, status, role, ancestry, height and
appearance. A host `ContentProvider`'s `people` replaces it where one is registered (§4.2 S2). **Pinning is an explicit
edit, never a view (LC-16, FTG-10; J-P22):** opening a person in the gazetteer writes nothing to the document, the hash or
the undo stack; which people a viewer has seen is per-user view state (§2.9). A table edit applies to households created
afterwards; existing people change only through the diffed **re-derive people** action — §7.5's diffed pattern, a
`regenerate` event of scope `people` over the chosen households (§7.1), its lifecycle §7.4's regenerate row. An epoch ages
everyone by its years through the key's birth epoch; **deaths and successions are derived, never stored**: `derivePerson`
makes two draws after all its others — `lifespanYears` in the ancestry row's `lifespan` and `entryAge` (a birth, or an heir
or spouse joining) — and a member slot passes to ordinal `k + n × j` at its person's **death week** (`birthWeek +
round(52 × lifespanYears)`), the successor keyed by that week (`Person.key.bornWeek`) and shown from the first drawn week at
or after it (V06 §3.14); a pinned person is never succeeded. `AncestryRow` carries `lifespan` (default [45, 80]) and
`entryAge` (`birth` 0.6, `joining` [16, 30]), our own. When regeneration supersedes a household, its pinned or edited people
are fixed inputs re-homed by rule to the household that inherits its address (§6.3), or reported as orphans (their
edit-lifecycle row is §7.4's). **Storage:** aggregates plus explicitly pinned people — kilobytes for a 50 000-person
metropolis (FTG PERF-1 answered; R14) — until the module materialises the relation store, after which relations and
postings are persisted (≈ 12 bytes per relation in the binary block; ≈ 1.8 MB raw for 50 000 people at ≈ 3 relations each,
reported per 10 k population as the O7 module metric). People are derived the same way at every rung, the village's
included (V07); the rung changes only the roster that makes the households.

**People model (COV-FTG-C01, COV-FTG-C08).** `AncestryRow { id, lifeStages: {name, fromAge}[], maxAge, heightCmBand,
nameGrammar, appearanceTemplates, lifespan, entryAge }` and a partnering matrix (pair weights and the child's ancestry rule)
are data; the realism base ships one human ancestry, and further ancestries arrive only through setting packs (§10.4).
`Person.status` ∈ worker, unemployed, retired, student, dependent; a dependent has a `carer` whose schedule it follows; when a
carer is removed the household (then the family unit) supplies the next carer by rule and the change is reported — a
dangling carer is a reference-integrity violation (§5.3). **Appearance (COV-FTG-C02):** appearance text comes from the §10.4
engine — weighted option tables per ancestry, line templates with substitution, conditional lines (by gender, age or a value
predicate), fallback lines and article agreement — our own templates.

**The module (`@plat/sim`).** *Relations (FTG-9, COV-FTG-C04):* the first run materialises the relation store by one global
pass on its own stream (`content/relations`) in person-key order — family units, partnerships, parent / child, siblings,
carer / caree, friends, rivals, business and religious ties, affairs — and persists it with lifecycle and reference integrity
(§10.1's locality contract). *Work (COV-FTG-B11):* professions ↔ workplaces by greedy matching with id tie-breaks, persisted
as `Posting` records; after an edit only the postings of changed workplaces and the unemployed pool are re-matched, in
person-key order; unfilled postings are tracked and reported. *Sub-locations and occupancy (FTG-11):*
`occupancy(dayType, hour)` resolves the whole population in person-key order in two passes — primary behaviours (home, work,
study, care, following carers) from profession templates, then occupancy criteria (leisure, guest workers, temporary
residence) filling `SubLocation` capacities with their relax options — cached per (day type, hour) and invalidated by edits
that touch the people or buildings involved; `whereIs(person, day, hour)` reads the cache; resource *provides / uses* edges
on roster rows are data the schedules may read; its budget is §12.7's. The module registers the live layer `live.people`
through §14's `LiveLayerProvider` registry (§8.2): favourite persons' positions from its occupancy at the view-state hour.
*The day schedule:* hours per day, days per week, rest days and weekday names; the hour is the view key `time`, set by
`view.set { time }` and advanced by the module's `sim.advance { hours }` over the bridge (§11.3), and occupancy is recomputed
for the new hour; neither changes the model or logs an event, and it is never the map's week (§4.11's clock) nor compared
with it (item 76). *Factions (COV-FTG-B12):* seats on plots, an influence field over districts — its weights the base's
power standings (`CircumstanceSlice.powers`, §7.7 layer 2), read by the module's own queries and the naming grammar only
(the prosperity field's power terms are §4.5 (6)'s dials, which need no module) — named roles with member criteria
(predicates over person fields) and counts, goals with methods and progress, a secret flag; role headcounts are reconciled
with the seat building's working capacity (excess roles are filled by members housed elsewhere; the reconciliation is
reported). Government offices and religions are §10.2's. *Events (COV-FTG-C05):* `EventTemplate { id, preconditions
(predicates over relations, factions, buildings), weight, effects: EditEvent[] }` rank candidate events per building;
starting one applies its effects as logged, undoable edit events. Data dictionaries (ages, genders, ancestries) are
append-only and id-referenced, so renaming never re-colours (FTG DAT-3 avoided). The relation store answers the
family-tree query (§11.2).

**Economy, personality and stat-block schema stubs (D-32; COV-FTG-B10, COV-FTG-C03, COV-FTG-C11).** In the base registry
from M1, empty until `@plat/sim` materialises them (their other end is the module's, M4b); every table is our own:

```ts
interface ItemRow { id: string; category: string; unit: string; basePrice: number /* in the setting pack's coin unit */; providedBy?: string[] /* roster class ids */ }
interface ServiceRow { id: string; providedBy: string[]; basePrice: number }
interface Stock { building: Id; item: string; qty: number }
interface PriceTable { multiplier: number; overrides: Record<string, number> }   // global price edits are `editTable` events (§7.6)
interface PersonTraits { traits: string[]; motivation: string; mannerism: string; hobbies: string[]; education: string }   // derived from the person key
interface StatBlockPack { id: string; attributes: string[]; base: Record<string, [number, number]>; professionModifiers: Record<string, Record<string, number>> }   // a named game-system pack, off by default (D-3)
```

**Uses that move (item 17).** When a use relocates (§4.11) its live-in household (`Building.dwelling`) moves with it when the
destination's designation template has a residential slot (a structure with `houses`, §10.2; §4.7 S11) and otherwise stays
in the vacated building as an ordinary household, reported; its people keep their keys, the household address surviving
(§6.3). The module re-matches only the postings of the closed and the opened workplaces and carries business ties over by
the use's address; a household re-homed by item 31's re-letting takes the same path.

**Lit windows, cluster households and dossier people (items 68, 70 and 88).**
* **Lit windows (item 68).** At the view's hour the module's occupancy selects the lit windows — a building is lit while its
  sub-locations hold anyone awake at that hour. Without the module a dwelling is lit in the evening hours of the lighting row
  (`lights.windowHours`, 17–22 h by default; our own row, `extension`) while its households live there at the drawn week
  (§4.11's Works), and a workplace during its `openingHours` rows (§10.2). Window lights are derived per view — §8.4's derived
  sources and §8.2's `live.windows` layer, never records; the `FTG` preset lights each lit building at its main entrance only
  (§4.7's *Light sources*).
* **Cluster households (item 70).** A cluster structure houses the cluster row's households per structure (§4.7, §10.2);
  their people derive as any household's.
* **Dossier people (item 88).** A dossier-backed `Person` (§2.7; staged with the port) is pinned, housed by rule in the
  district of its institution or its power's seat, and never derived away.
=== END ===

=== REPLACE ## II.1 The district → neighbourhood interface ===
## II.1 The district → neighbourhood interface

```ts
interface Seam {                               // one per boundary run, created by S6 and read by both districts it separates — from milestone 1 (G-P1)
  id: Id; sides: [Id, Id | null];              // the two districts in address order; null: a one-sided run (frame, water, cliff, marsh, sky)
  edges: SeamEdge[];                           // in the first side's ring order; each: { chain: ChainRef /* the shared way, shore, wall, reservation-boundary or perimeter chain */, type: 'way'|'water'|'wall'|'reserve'|'field'|'cliff'|'marsh'|'frame'|'sky', reservation?: Id /* 'reserve' only: the reservation whose `reserved` boundary the run follows */, wayClass?, widthCm?, frontageSide?, hard: boolean }
  portals: Portal[];                           // every way that crosses or meets the run: { id, wayId, class, widthCm, at: VertexRef /* ('portal', id) */, bearing, from: 'growth'|'baseLane'|'closeup', by?: Id /* the district whose lane or close-up added it */ } — every one must be connected
  amendments: SeamAmendment[];                 // the vertices inserted on a shared spine after S6: S8's lane ends and close-up T-junctions — one record, so both sides always agree
  boundarySamples: { prosperity: Sample[]; density: Sample[]; greenery: Sample[]; terrain: Sample[] };   // along the run; `hard` seams jump, soft seams interpolate
}
type Sample = { at: PointCm /* a boundary sample's position on the run; an interior sample's on the lattice */; value: number /* the field's [0, 1] value; terrain in metres */ };
interface SeamAmendment { kind: 'baseLane'|'tJunction'; spine: Id /* the shared boundary way */; vertex: VertexRef /* ('junction', the new junction's id): inserted at level 1 by splitThrough or as a lane's end */; portal: Id; by: Id /* the district whose batch inserted it */; cause: 'generation' | EditId /* S8's run, a regenerate, or the close-up's event */ }
interface SeamContract {                       // a district's view, assembled on demand from its Seam records; never stored
  district: Id; seams: Id[] /* in ring order */; sharedGeometry: 'ownedByBase';   // shared edges are generated once by the base; neighbourhoods change them only through a SeamAmendment
  plotLinesOnBoundary: EdgeSetRef[]; alleysOnBoundary: Id[];   // resolved from the district's own plots and alleys
  interiorSamples: { prosperity: Sample[]; density: Sample[]; greenery: Sample[]; terrain: Sample[] };   // on an interior lattice
}
interface SeamReport {                         // written by every close-up; its numbers are stage-2 feature S1's acceptance (II.5)
  portalsTotal: number; portalsConnected: number /* must equal portalsTotal */; unconnected: Id[]; addedPortals: SeamAmendment[];
  sharedEdgeHausdorffCm: Cm /* must be 0: shared edges are read from the base; an amendment only inserts a vertex on them */;
  fieldJumps: { at: PointCm /* a sample position, not a vertex */; field: 'prosperity'|'density'|'greenery'; delta: number; hard: boolean }[] /* a jump on a soft seam outside its band is a soft-invariant failure */;
  superseded: { old: Id; new: Id }[];          // §6.3's successions for the entities a template replacement re-derived (anchor rule, §2.1, §6.3)
  landingsReached?: number /* the landing attach vertices a walk along the run's ways joins to the district's largest way component; present where the run holds a landing attach — a sky unit run, whose portalsTotal is 0 (rule (5)), or a ground district holding a ground landing's S8 destination (V01 §3.11 (6)) */;
}
interface NeighbourhoodStrategy { generate(req: NeighbourhoodRequest, ctx: StageContext, k: Kernel): KernelResult<NeighbourhoodResult> }
interface NeighbourhoodRequest {   // file f item 539
  district: Id; key: PlatKey; layer: 'ground'|'sky'|'underground';
  boundary: TypedBoundary;
  seam?: SeamContract; context?: DistrictContext /* present for 'refine' and 'replace'; absent exactly when `laid` is empty (mode 'unit'): the unit's districts do not exist
    when the request is made, so the unit runner builds each district's DistrictContext and SeamContract after its partition, from the island's SkyUnitInput (sky;
    V05 §2.3) or the document's HoodRecipe (a standalone neighbourhood document) (V01 §3.10) */;
  laid: { blocks: Id[]; plots: Id[]; alleys: Id[] } /* the committed fabric under the district; empty for a unit run (V01 §3.10) */;
  strategy?: FabricStrategyId /* absent for a sky unit run: S7c picks per island district (V05 §2.3) */;
  params?: Record<string, number> /* District.fabricParams for the strategy; absent for a unit run (each district's S7c writes its own) */;
  closeup?: CloseupParams /* 'refine' only; absent for a unit run */;
  outlineTemplate?: OutlineTemplateId /* standalone unit runs only (§4.2 S1 (2)) */; lod: 'neighbourhood' /* every mode, a unit run's included */ }
// The mode is derived, never passed (J-V1.3): 'unit' when `laid` is empty; 'refine' when `strategy` equals the district's committed fabric;
// 'replace' otherwise — a model edit (V01 §3.9). A sky island's reason is SkyIsland.reason (§2.7), not a request field.
interface NeighbourhoodResult { mode: 'refine'|'replace'|'unit'; blocks: Block[]; ways: Way[]; plots: Plot[]; buildings: Building[]; greens: Greenery[];
  pins: Pin[] /* model pins (S11) */; hoodPins: HoodPin[] /* refine only: derived */; places: HoodPlace[]; labels: LabelEntity[] /* §9.1 */; seams: SeamReport; report: StageReport;
  districts: Id[] /* mode 'unit': the districts the run made, in partition order — SKY-F writes a sky run's to SkyIsland.districts (V05 §3.12); [] for 'refine' and 'replace' */ }
// DistrictContext is V01 §2.3's and TypedBoundary §2.5's; Pin is §2.7's (the complete furniture vocabulary, in the entity registry from M1).
```

**Seam records (J-P33).** One `Seam` record per boundary run, read by both districts it separates, so the two contracts
cannot disagree and a district's re-derivation changes only the seams it is party to (§4.6, II.4). **Seam edge types
(J-P37).** An edge's type is the first its role rows give: `way` → `way`; `wall` → `wall`; `shore` or `bank` → `water`, or
`cliff` where the bank kind is cliff, or `marsh` where the bank kind is marsh; a barrier-closure arc (item 106 (a), (f)) →
by its barrier kind (J-VI.3's six): `shore` → `water`, `cliff` and `gorge` → `cliff`, `marsh` → `marsh`, `enceinte` →
`wall` (an earlier ring's curtain), while `sheer`, an island's rim, never types a ground seam (its run is `sky`); `reserved`
→ `reserve`; `district_bound` alone (the settlement perimeter) → `field`; `border` or `margin` → `frame`; a sky arena's
outline → `sky`. A **`reserve`** run is a reservation boundary two districts share with no way on it — a plaza's,
precinct's or market's edge where the grower's edge test stopped (§4.5): its shared geometry is the `reserved` chain and the
two parts of §4.5's margin band along it; it has no portals; a close-up ends its plot lines on its own part's inner edge and
writes neither part (a `replace` close-up's scoped regeneration re-lays its own side's part, §7.3 item 2). `hard` comes from
the seam-type row of the editable tables (§7.6): `wall`, `water`, `cliff`, `marsh`, `frame` and `sky` hard; `way` and
`field` soft; `reserve` by the reservation's kind — castle and precinct hard; plaza, market, park and institution soft.

Rules: (1) the base generates every shared edge once and both districts read it; (2) a close-up either **refines** — adds the
neighbourhood-LOD presentation detail (roof construction and hatching, surfaces, pins, trees, local street names) as a pure
function of the district's committed base state, its sub-seed, strategy and params, never changing L1–L4 geometry — or
**replaces** the base's plots with a template layout inside its boundary with `ring` / `square` / `street`; the templates are
`FabricStrategy` registrations selected per district (G-P2) — by S7c (V01 §3.3) or a declaration — so a template district is
laid by the base's own engine with seams by construction, and a `refine` close-up applies to whatever fabric the district has;
(3) **seam amendment (GEO-30):** a close-up may end a street on a shared boundary spine (NG's cuts end on existing roads,
361 / 361; the ring template's radials run to the edge); each such end is a T-junction inserted with `splitThrough` at level
1, so the shared spine stays one chain, recorded as a `SeamAmendment` of kind `tJunction` when an edit event inserts the end
itself (a `drawWay` ending on the spine) — an end S8 inserts, at generation or in a district's re-derivation, whatever its
fabric, is kind `baseLane` (rule (6); V01 §3.11) — and a new portal in the shared `Seam` record both districts' contracts
read.
**The neighbour step (J-P38)** is the only write on the other side, the same for a close-up's T-junction and for a lane a
district's reroll adds or removes on a shared spine (§4.6 step 7): one L2 batch whose only face is the neighbour's
half-corridor strip along the split spine edge inserts one `corridor_split` edge from the junction vertex to the foot of its
perpendicular on the neighbour's kerb — the edge `corridorUnion` builds on a side the spine passes straight through (§3.7),
so each spine sub-edge keeps its own strip (§2.2 rule 1) and that side gets no wedge. A half-corridor strip holds no L3
content (avenue and street-tree rows are `Greenery.along` records, §2.7), so the batch clears and re-derives nothing: the
neighbour's blocks, plots, footprints and greenery are neither in its face nor re-derived. The edge's kerb end lands, by
§3.6's attraction, on a vertex of the kerb's route within `attractCm` — a plot-line end or footprint corner there is promoted
to L2 (§2.2 rule 3): every ring of the vertex's own level and finer stays as it was, and each coarser ring along the kerb
gains it (the neighbour's block at L2, and its plot at L3 when the promoted vertex is an L4 footprint corner) — or otherwise
splits the kerb at L2 by the placement rule, adding that one vertex to the rings through it and, by §2.6's wing-carrying
rule, to the wing ring of a building whose footprint fronts that stretch of kerb; either way each changed ring equals its
prior ring with the vertex removed (II.4's seam exception). Removing the street reverses the step, whether by an undo, the
district's reroll or any later edit: `removeEdges` takes the `corridor_split` out, the strip is one face again, a kerb vertex
the step created dissolves (`split` flag, no role) and leaves the wing ring it joined, and a plot-line end or footprint
corner the step promoted returns to its level by demotion — it kept its `split` flag, which only a warp that has since moved
it or the kerb vertices beside it clears, making the bend part of the kerb's true shape (§3.6) — so the kerb's L2 route,
index and digest, and every ring the step touched, are those before the step, with any later change to the kerb kept (§2.2
rule 3; test §13.1). Every portal stays connected (stage-2 feature S1's acceptance: portal connection 100 %, shared-edge
Hausdorff 0; II.5).
(4) Footprint hashes at city LOD and neighbourhood LOD are identical for every entity a `refine` close-up covers (refinement
never changes geometry); the close-up's persistence is II.4's; a `replace` close-up re-derives its entities under the anchor
rule and records §6.3's successions in `SeamReport.superseded`. (5) The standalone no-portal mode is the same call with a
synthetic boundary drawn from an **outline template** (§4.2 S1 (2); NG's template outlines, our own shapes; COV-NG-N06)
through §4.2's closed-outline routine; the **sky-island call** is the same request with `layer: 'sky'`, an outline from that
routine, optional own terrain echoing the ground and no roads in or out, its shadow projected onto the ground layer by §8.4
(the island's reason is `SkyIsland.reason`, §2.7). A request with an empty `laid` runs as a **unit** on its own arena (V01
§3.10): the standalone neighbourhood document (`Recipe.product = 'hood'`) and each sky island's districts. (6) **Base lanes
on shared spines:** the lanes the base's own S8 ends on a district-boundary spine are the same kind of vertex, recorded in the
same `Seam` record with kind `baseLane` and kept at least a portal gap from every other portal on the spine (§4.6 step 7), so
a close-up reads them like any portal and a reroll of either district changes only the seam records it is party to, the
vertices it inserts or removes and their neighbour steps (3) (II.4).

**Close-ups and the geometry floor (item 31).** A `refine` close-up reads the committed plots and changes no plot record —
`builtBand` included; a `replace` close-up is a model edit of the redevelopment class (II.4): the plots its template lays take
`builtBand` and `builtProsperity` from the band and value the template read, as a rung-3 event of §4.11 does.

**The underground close-up (II.7.3).** With `layer: 'underground'` the underground pseudo-district opens as a `refine`
close-up — its key the sewer's part (part 0 of the underground layer), no portals and no roads in or out, its tunnels the
ways its plots front, no `replace` fabric. An undercity neighbourhood (II.7.5) opens the same way — a `refine` close-up with
its void's part as key, its walkways the ways its plots front, no portals and no `replace` fabric.
=== END ===

=== REPLACE ## II.6 The staged layers — floating islands and sewers: the hooks the base carries now ===
## II.6 The staged layers — floating islands and sewers: the hooks the base carries now

*In plain words.* The owner stages both layers after the city is mastered; whether a layer exists is a model rule (the
island rule below; II.7.1's tier row), and its layer toggle shows it. Nothing here is built in the base, but every record and
interface they need exists now, so adding them later is a registration, not a redesign. The sky layer at build depth is V05's.

**Floating islands (AM-2; DEF-7).** A settlement has 0–3 islands by the island rule below — with the model setting on, the
rung, the count slots and the supply decide them, and the view toggle only shows them. **Why an island exists**
(`SkyIsland.reason`, §2.7) is one of two reasons, by rule or by assignment: `prosperity` — the island carries a very
prosperous neighbourhood or set of neighbourhoods: by rule — where the model setting `recipe.layers.islands` is on, the rung
admits islands and a count slot opens ((1)–(4) below) — S7b (5) allocates the roster's richest demand to that slot's sky
pseudo-district under the supply law (5), so the population stays whole; `institution` — the island carries one unique
institution chosen from an `IslandInstitution` row (a palace overlooking the land, a cathedral, a prison isolating
criminals) or named by an assignment. **What it is:** a `SkyIsland` (§2.7) with an organic oval outline from §4.2's routine
(an outline template of §4.2 S1 (2)), an altitude from the supply law (5), and optionally its own terrain from S1 run on the
sky plat with an *echo* request — its relief `echo` or `own`, and a conjured river that takes the ground river's bearing and
width law; its districts are laid by V01's unit run through a `NeighbourhoodRequest` with `layer: 'sky'` (no portals, no
roads in or out; II.1 (5)). **Where it floats:** a placement rule reads the ground plan — over water, fields or outskirts by
default, over the built core only by assignment (`SkyIsland.placement`, §2.7); the occlusion mode (opaque, ghost the covered
ground, offset view) is a rendering choice (§8.4). **What it does not do:** it has no relation to the underground layer; it
exports as its own layer (§11); item 111's oasis, water pull and climate cell do not apply on it (its water stays V05's).
**Its light, shadow and shade (items 68, 102).** In §8.4's lighting model an island casts shadow from above — an occluder
slab with a top and an underside, so its shadow falls from its underside onto whatever lies below and the ground under it is
shaded from above yet lit from the side; its **shade strip** — the ground its shadow sweeps across the model sampler's day —
enters §4.5's daylight term in field pass 2 only (V05 §3.19; item 102 (c)), after the island supply law has read the field;
its magical lights are the sky rows of §4.7's light table, scaled by the island's carried supply `h(S_carried)` — magic is the
resource that keeps it aloft, so a waning island's lights fade with it.

**Sewers (DEF-7).** A `SewerStrategy` registers as a tail stage after S11 (declared inputs — the one list II.7.2 cites:
`Features.sewers`, the ways with `flowToward` (§2.4), `Terrain.hydro` and `outfalls` (§2.3), the plots and buildings with their
class table's `drain` column, the underground plat; outputs: the sewer system with its `Tunnel`, `Junction` and `AccessPoint`
records, §2.7). Its rule families are data: `follow-streets` (mains under the ways, falling with `flowToward` to the
outfalls), `drainage-lines` (along the natural drainage), `mixed`; which buildings need drains is the class table's column;
two presets — `historical` (restrained: open gutters, a few culverted mains, cess pits by class) and `navigable` (the fantasy
preset: large vaulted mains with chambers). It renders through the ground by §8.4's cut-away or overlay and exports as the
underground layer.

```ts
interface SewerStrategy {
  derive(doc: Document, rules: { family: 'follow-streets'|'drainage-lines'|'mixed'; preset: 'historical'|'navigable' }, ctx: StageContext, k: Kernel):
    KernelResult<{ system: UndergroundSystem; tunnels: Tunnel[]; junctions: Junction[]; access: AccessPoint[] }>;
  extend(doc: Document, epoch: number, ctx: StageContext, k: Kernel): KernelResult<{ tunnels: Tunnel[]; junctions: Junction[]; access: AccessPoint[]; reopened: Id[] }> /* an epoch's growth (§4.11 (6)): closed runs on its paths reopened first */ }
```

**The island rule — existence, count and the supply law (owner: "Floating islands are also a product of prosperity … magic
… a resource that needs to constantly be supplied"; "limited only to cities and metropolises"; "not all cities or
Metropolis have floating islands"; AM-10, AM-13, AM-15).** One rule decides whether a settlement has islands, how many and
how large; the toggle only shows them. Its rows interpolate along the prosperity value as coverage, plot granularity and
greenery do (§4.9), keyed by absolute values rather than bands — a town-wide supply must compare towns, which the per-town
cuts cannot (V05 §3.3).
1. **Two settings, not one.** `recipe.layers.islands ∈ {'off', 'on'}` is a MODEL setting — off by default, the named fantasy
   toggle of D-3, so the realism base has no island and its ground model is byte-identical to the realism golden; changing it
   is an `adjust` of the recipe that re-derives from S7b (§7.6, §7.7; its control row is §7.8's). The sky layer's
   `LayerSpec.visible` (§8.4) is the VIEW toggle the owner speaks of: it shows the islands a settlement has and creates none;
   a hidden island still exists and still carries its households, and hiding or showing the layer leaves the model digest
   unchanged (J-A15.41).
2. **The gate — rung.** Islands are possible only where the rung's row allows them: `RungProfile.layers.islands` (§1.1) is
   `none` at TOWN and at every village rung (PART III) and `possible` at CITY and METROPOLIS. The rung is the one the
   request's population chooses at generation and, in an epoch, the one the epoch's population target chooses (§4.11), so a
   settlement that falls below the CITY band (to TOWN or a village rung) can no longer sustain islands and one that enters it
   may gain them (J-A13.41).
3. **The supply** (definition and calibration V05 §3.3). Magic is a supplied resource, so an island's existence and size are
   functions of two supplies on the field's absolute value (§4.5): `townSupply`, `h(S_town)` of the area-weighted mean of the
   prosperity value over the settlement's built land (one scalar per town, recomputed per epoch), and `carriedSupply`,
   `h(S_carried)` of the band values of the households the island carries (S7b (5) fills it from the richest band down, so
   `S_carried` is high where the town has a rich band and modest where it has none) — value-keyed rows, 0 up to the rule's
   threshold and rising to 1. No island exists where `h(S_town) = 0`, the owner's "if there is no prosperity, there is no
   floating islands", and none is carried where `h(S_carried) = 0`. A dossier whose `site.deposits` lists a `magical_node` in
   state `available` (or `discovered`, from the next epoch) raises `h(S_town)` by the rule's `node.bonus` (V05 §2.4; clamped
   to 1) wherever it is above 0 — never from 0, so the owner's rule stands (V05 §3.3; the deposit mapped by V08 §2.6's deposits
   row). An `institution` island reads the same gate: it exists only where `h(S_town) > 0`, its `S_carried` being its
   institution's requirement (J-A10.41).
4. **The count** (V05 §3.2). How many islands the settlement has, 0–3, is drawn once per town on the `island.place` stream
   (§6.1), before any allocation, from three ordered **slots** (each island's `SkyIsland.slot`, §2.7; a requested or edited count is `recipe.params['islands.count']`, V05 §3.2): slot k opens with
   probability `chance_k · h(S_town)` and only if slot k − 1 opened (defaults 0.6, 0.5 and 0.35), so a poor city has none, a
   rich one may have none or several, and the count depends on the seed and on prosperity, never on the toggle (J-A15.42). A
   slot holding a supplied island is never redrawn (V05 §3.15); an epoch re-draws each other slot with the epoch component at
   the per-year rate `redrawPerYear` (default 0.1, our own) converted to the epoch's span as 1 − (1 − `redrawPerYear`)^years,
   the power by `dmath.pow` (§6.5 (3); §4.11's per-year rule; J-A67.40), so a weekly epoch re-decides a slot no more often per
   year than a decade-long one: a slot that opens raises a new island only where the supply admits one (`raiseIsland`), and a
   slot that closes is read by the decline ladder, never as an instant removal.
5. **Size and altitude** (V05 §3.4–V05 §3.7). For an open slot the SUPPORTED AREA is `A = areaHaMax(rung) · h(S_carried) ·
   h(S_town)` and the altitude `altitudeCm = E_min + (E_max − E_min) · h(S_town)` above the island's `groundRefCm`, floored by
   V05 §3.9 (4) (`elevationCm` derived as `groundRefCm + altitudeCm`, §2.7) — area from both supplies, altitude from the
   city's alone: a rich neighbourhood in a poor city floats low and small, a rich one in a rich city high and large
   (J-A10.43). S7b (5) fills the island's allocation from the richest band down until the plot land of `A` (× V01's
   `plotShare`, §4.5 S7b (5)) is used or three districts' worth of households are allocated, recomputing `S_carried` and `A`
   as it adds — `A` falls as poorer households join, so the fill converges — and makes no allocation for a slot whose `A` is
   0. `SkyStrategy` then sizes each outline to its allocation's area and floats it at its altitude.
6. **Over epochs** (§4.11; V05 §3.15): the supply is re-evaluated each epoch; an island whose `A` shrinks by more than the
   rule's `hysteresis` (V05 §2.4) of its area is resized, one whose `h(S_town)` or `h(S_carried)` falls to 0 wanes, settles and falls, and
   regrowth re-floats a settled island before raising a new one (J-A10.42). An island's lifecycle state is `SkyIsland.state`
   (§2.7).
7. **Editable** (V05 §4.2). The count (`recipe.params['islands.count']`), each island's slot, area, altitude and state are
   attributes under `setAttr` and `lock` (§7.1, §7.2) — a locked slot is neither opened nor closed by a re-draw; the island conversions of
   §4.11's `DeclineOp` are `convert` events a user may apply by hand; every draw is on `island.place`, so an edited island
   survives regeneration by §6.3's rules.
8. **Emulation note.** No reference has islands: the rule is our extension, and with the model setting off nothing of it
   runs.

```ts
// IslandRule (one row per rung that admits islands; read by S7b (5) and SkyStrategy; a rule table, §7.6) is V05 §2.4's, with CarryRule,
// IslandInstitution (the unique-institution rows a slot may carry, their hand-over class) and SkyAccessRow; (3) reads its `node.bonus`.
interface SkyStrategy { place(doc: Document, rule: IslandRule, allocations: Allocation[] /* S7b (5)'s sky allocations: the open slots with A > 0, each with its supported area and altitude */, ctx: StageContext, k: Kernel):
  KernelResult<{ islands: SkyIsland[]; unitInputs: SkyUnitInput[] /* V05 §2.3: each island's inputs to V01's unit run */; groundClaims: Id[] }> }
// SKY (§4.1): a Stage registered after S7b by declared I/O; inputs the sky allocations and the ground plan; outputs the islands (outline sized to the
// allocation's area, placement by rule), their arenas and, through the unit run, their districts; its ground outputs under reservations.landing and allocations.landing
```

**The underground fades like the walls (owner: "Sewer systems and the underground like the walls fade slowly, rather some
tunnels simply cave in or become decommissioned rather than intentionally taken down by populations"; AM-11).** A tunnel's
lifecycle is a ladder like a wall's, moved only by §4.11's underground fade at the underground's persistence rate — after
streets and walls, before terrain and water: the slowest fabric but the ground itself (J-A11.42) — and by hand: in use →
neglected, silted (`abandoned`) → partly caved in (`decayed`) → collapsed or decommissioned, sealed (`ruined`, with
`Tunnel.closure ∈ {'collapsed', 'sealed'}`, §2.7); the conversions `silt`, `caveIn` and `seal` act on one tunnel record —
`DeclineOp`'s `element` names it (§4.11; an older `convert` event's `tunnel` field reads as `element`, §7.5) — and `reopen`
undoes them. A conversion given a `stretch` first widens it, at both ends, out to the first centreline vertex at or beyond
that end whose station no underground plot's frontage straddles on either side of the tunnel (a plot's frontage read as the
interval of centreline stations its frontage edges project onto) — a vertex where the frontages break on both sides, a
junction or the tunnel's end — so that no plot fronts two records (U1, II.7.3), the widening shown by the dry run and
reported with the event's fates; it then splits the tunnel at the stretch's two ends, handing the stretch (and, for an
interior stretch, the part beyond it) to new `Tunnel` records by `retypeEdges`' `rekey` on their `StretchRef`s (§3.4), as a
cut way hands its far part to a new way (§4.11's carve), so that the stretch changes condition alone: each part keyed by
§6.3's SPLIT rule for a tunnel record, each keeping the record's attributes on its own stretch (its invert knots, the outfall
at its end, the plots and buildings whose connections meet it, its chambers (`Tunnel.chambers`) and the access points whose
vertex lies on it (`AccessPoint.under.element`, II.7.4)), the `Frontage` records of the underground blocks along it (§2.5)
split wherever one spans a stretch end, all in the one step that splits the tunnel (a record spanning both ends of an
interior stretch in three parts) — each part beyond an end a new record, its kerb edges' `('frontage', id)` rows moved to it
by `retypeEdges`' `rekey` (§3.4), each part's `lengthCm` its own, every part keyed by §6.3's rule for a split `Frontage` — and
each re-pointed (`Frontage.way`) to the part it fronts; an `undo` restores the one tunnel record and each split `Frontage`'s
one record (§7.4; J-A11.43). Each run the condition table names, and the tunnel run of II.7.3's frontage and lifecycle
rules, is one `Tunnel` record. **The condition table** — the one statement of a tunnel's condition, which §2.7's `Tunnel`,
§2.8's decline hooks and II.7.3 read:

| condition | `existence` (§2.8) | `Tunnel.closure` | `open` — may carry frontage plots (II.7.3) | reached by |
|---|---|---|---|---|
| in use | `generated`, `built`, `altered` or `converted` | — | yes | generation or a drawn tunnel; `reopen` from any other condition |
| neglected, silted | `abandoned` | — | yes | `silt` on a run in use |
| partly caved in | `decayed` | — | no | `caveIn` on a run in use or neglected |
| collapsed | `ruined` | `collapsed` | no | `caveIn` on a partly caved-in run |
| sealed (decommissioned) | `ruined` | `sealed` | no | `seal` on a run in any other condition |
| flooded — galleries and chambers of II.7.5 and II.7.6 only (item 65) | `ruined` | `flooded` | no | `flood` on an element whose floor lies below the water table (§2.6's gate values) |

The condition is this reading of `existence` and `closure`, never a second stored state (J-A11.21): it changes only by these
conversions — a hand change of a tunnel's condition is the matching `convert` event (§7.1) — and its `open` column is what
II.7.3's frontage rule and its lifecycle read. **The same table serves the whole layer (items 64 and 65).** Every gallery and
chamber of the underground layer's other systems (II.7.6) and of the undercity (II.7.5) takes this ladder, these conversions
and this table (`Gallery.closure` and `Chamber.closure`, §2.7), the `flooded` row theirs alone — reached by `DeclineOp`'s
`flood` on the element (§4.11; J-A65.48) — and undone by `reopen` as the others are, and a chamber closes its plots as a
tunnel run closes its frontage plots (II.7.5). An **access point's state follows its element** (item 64): it reads
`collapsed` while the element it reaches is partly caved in or collapsed and `bricked` while that element is sealed —
derived readings, never stored by the conversion, so a `reopen` gives back the access's own stored state (`open`, `locked`
or `bricked`, II.7.4); a link of the connection graph (II.7.6) reads `collapsed` or `flooded` by the same rule. No epoch rule
ever demolishes a tunnel: the engine's plan may not contain `demolish` on a tunnel record (a hook test lints it), while a
user's `delete` stays available, because everything is editable (J-A11.41). A closed tunnel persists as an underground ruin
— its record live at its address, its centreline and invert kept, drawn by §8.2's silted, caved-in and sealed classes
through the underground layer's cut-away (§8.4) — and later growth reopens it (`reopen`; regrowth-first: a closed tunnel on
the network's line is reopened before a new one is dug, in a history replay as in a live epoch, item 113 (d)) or reuses it:
AM-12's underground plots front a reopened tunnel as they front any navigable one. Decline follows the surface's drivers and
lag: a tunnel's exposure is the exposure of the ground it runs under, and its dwell bands are two steps slower than a
building's (§4.11's table). Emulation note: no reference has sewers or time; with the network absent nothing of it runs.

**Where the rest of the sewer layer is stated (items 12, 14, 64 and 65).** Existence by tier and the toggle-as-visibility
rule, the `drain` connection rule, the network stage's gate, its levels on the underground arena, the tunnel profile with its
wall thickness, depth and outfalls, the underground neighbourhoods along navigable tunnels and the basement accesses are
II.7.1–II.7.4's; the undercity is II.7.5's; the underground layer's other systems, their depths, the connection graph and the
pieces an access edit generates are II.7.6's; this section keeps the islands, the network stage's declaration, its rule
families and presets, and the lifecycle of every underground element.
=== END ===

=== REPLACE ### II.7.2 The network stage: the gate, the underground arena's levels, the tunnel profile, depth and outfalls, editing ===
### II.7.2 The network stage: the gate, the underground arena's levels, the tunnel profile, depth and outfalls, editing

**The declaration and its declared inputs are II.6's** (`SewerStrategy`, a tail stage registered after S11 by declared I/O;
rule families `follow-streets`, `drainage-lines`, `mixed`; presets `historical` and `navigable`; the lifecycle of item 11);
this subsection adds what the owner's rules need of it. **The gate.** The stage runs only when `Features.sewers` is true;
otherwise it commits nothing and part 0 stays schema-complete and empty (§2.1); every other part of the layer is II.7.6's. It
runs eagerly on the generation worker after the derivation pool's merge (it reads every district's committed L3 and L4,
§4.1); it names its tunnels with S13a's naming engine as the underground stage names its own entities (II.7.3; §10.4's
`sewer` slice), and S14's display list and §11's exporters read the model through the entity registry (§4.10, §8.1) after
every registered stage, so the tunnels are drawn and exported with no change to S14.

**The underground arena's levels (the kernel's J-A12.31 and J-A12.32; the level mapping is §2.2 rule 1's).** The stage writes,
on the sewer's part 0 (J-A65.31) in §3.3's one-level batches: L0 — one land face, the rock, bounded by the arena's outer ring
(the ground's frame plus its context margin, §3.2 (9)), written before any tunnel as S1 writes the ground's ring; L1 — every
tunnel's centreline as a `tunnel` chain, never a `way` (no alley, lane or street exists underground: rule U2 of II.7.3); L2 —
`corridorUnion` on the L1 faces (§3.7, S9's function unchanged): each tunnel's band — its bore plus a wall on each side — as
two half-corridor strips with junction wedges, and the rock between the bands as the underground's built blocks. The band's
outer ring is **the tunnel's external wall**: the kerb every underground plot line ends on (§3.7). L3 and L4 are the
underground stage's (II.7.3). Nothing here writes the ground: the outfall is an entity link (`Tunnel.outfall`), the served
plots are ids (`serves`), and the street a main follows is `follows` (§2.7). A degenerate centreline (zero length, a
self-touching run) is refused by the kernel and the run re-routed by the stage's ladder row, else left out and reported
(§5.2).

**The tunnel profile** is a rule table keyed by `(kind, preset)`; the kernel reads a tunnel's corridor half-width as
`widthCm ÷ 2 + wallCm` from it (§3.7):

| kind × preset (defaults, calibratable; cm) | bore `widthCm` | `headroomCm` | `wallCm` | `navigable` |
|---|---|---|---|---|
| `drain`, either preset | 40 | 60 | 25 | never |
| `culvert`, historical / navigable | 80 / 120 | 120 / 180 | 40 / 50 | no / yes |
| `main`, historical | 100 · (servedHa ÷ 10)^0.3, in [100, 180] | 150 · (servedHa ÷ 10)^0.2, in [150, 210] | 50 | where the bore and the headroom both reach the thresholds — a large trunk main in a big city, rarely a whole system |
| `main`, navigable | 240 | 260 | 60 | always |
| `passage`, navigable only | 150 | 220 | 50 | always |

`navigable` is derived per tunnel — `widthCm ≥ 110 ∧ headroomCm ≥ 160` (the thresholds are table values) — and stored on the
record (`Tunnel.navigable`, `Tunnel.headroomCm`, §2.7); it is what item 12 (b) means by a navigable tunnel, so the
`historical` preset has few or no underground quarters and the `navigable` preset can have many (J-A14.43). The `navigable`
preset is D-3's fantasy toggle, off by default; the `historical` preset is realism and is the network every CITY and
METROPOLIS carries.

**Depth and fall.** A tunnel's `invert` profile (§2.7; `invert_knot` on the centreline) is laid from the head of its run to
the outfall: at every knot `invert = groundHeightAt(p) − coverCm − headroomCm`, lowered where needed so the profile falls
monotonically toward the outfall at no less than `minGradient` (1 : 200) — the monotone-bed rule the river's carve uses (§4.2
S1 (3)) — with `coverCm` (the crown's depth under the street: 150; 600 for the navigable `main` where II.7.3's
within-reach surface rule applies) a table value; a run that would need more fall than the ground gives is re-routed toward
the nearer outfall by the family's rule, never trenched (the stage's ladder row, §5.2). `elevationCm` (§2.1's layer field)
on every tunnel is its invert's mean, negative below the ground datum. Outfalls are §2.3's water `outfalls`
on the settlement's downstream side (`ContextVector.upstream ≥ 0.5` at the outfall's cell) — downstream of the harbour
and of every water mill's intake (a policy row); a frame-edge `Outfall` serves the drainage queries only and is never a sewer
outfall. Each bank of the network (V04 §3.2 N3: the parts the water divides, never crossed by a sewer) with no admitted water
outfall takes its own moat candidates at their penalty, else its own field outfall beyond the outermost enceinte's outer
strip — the cess field of a dry town — either reported, and a bank whose stretch of the boundary lies wholly on water and that holds no
candidate drains by gutter and pit, its area reported unsewered (V04 §3.2 N2, N3; J-V4.129; F-NET, §5.2); V04's T-V4-2
no-water fixture and T-V4-80 (j) name the cases.

**Editing.** A tunnel is an edit target like a way (§7.1's edit-target table: draw, move, delete, `setAttr` on its kind, bore
and headroom; its condition changes only through the conversions `silt`, `caveIn`, `seal` and `reopen` of II.6's condition
table, a hand change of the condition being the matching `convert`; the preset is the network's): in the base a user may
cut, move, seal, reopen or delete any tunnel; the evolution engine never demolishes one (item 11, II.6). Every tunnel edit
re-derives the underground blocks the edited edges bound (II.7.3's scoping) and nothing on the ground.
=== END ===

=== REPLACE ### II.7.4 The hook interfaces and the base's part ===
### II.7.4 The hook interfaces and the base's part

```ts
interface SewerExistenceRow { existence: 'never'|'law'|'always'; law?: { base: number; populationWeight: number; wealthWeight: number; cap: number } }   // RungProfile.layers.sewers (§1.1); II.7.1's law
interface Features { sewers: boolean /* resolved at S0 from the request and the rung row; re-derived on replay (§2.9) and re-resolved at each epoch (II.7.1); read by every dependant */;
  underground: boolean /* items 65 and 66: true while any underground system exists — the sewer network, a system of II.7.6, or a dug passage alone (II.7.6's closure pieces); derived from the model on every replay (§2.9); the underground layer's presence, its exporters and the reader read it, never a view */ }
interface TunnelProfileRow { kind: Tunnel['kind']; preset: 'historical'|'navigable'; widthCm: Cm | { base: Cm; exp: number; band: [Cm, Cm] }; headroomCm: Cm | { base: Cm; exp: number; band: [Cm, Cm] }; wallCm: Cm;
  coverCm: Cm; minGradient: number; navigableMinWidthCm: Cm; navigableMinHeadroomCm: Cm }   // II.7.2's table; the kernel reads widthCm ÷ 2 + wallCm as the corridor half-width (§3.7)
interface AccessPoint { id: Id; kind: 'stair'|'ladder'|'hatch'|'door'|'shaft'|'well'|'cellar_stair'|'grating'|'mouth'|'sinkhole'|'collapsed_shaft'|'ruin_entrance'
    /* ladder, hatch and door: item 64's basement accesses; mouth: an opening in outside ground — a cave mouth, a dug passage's outlet (II.7.6);
       sinkhole, collapsed_shaft, ruin_entrance: public openings by chance into a cavern, a quarry or mine, or a ruin (item 109 (j) (3) (ii)) — each public opening of role access a HoodPlace of kind opening on the surface (V01 §3.7.1) */;
  role: 'access'|'air'|'light';
  ground: { at: PointCm /* moves with its host face under a warp (§7.4) */; host: Id /* the corridor, square, yard, building (for a basement access, its basement) or outside face it opens in */ };
  under: { part: number /* the underground part it reaches (§3.4; 0 the sewer network) */; element: Id /* the tunnel, gallery, chamber or underground building (a sewer dwelling's side or rear wall: item 64's door) */; at: VertexRef /* ('access_point', id) on that element's kerb or wall, §2.2 rule 7 */ };
  state: 'open'|'locked'|'bricked' /* item 64 (c): stored, set by the rule's row, an edit, or the access closures of its host's change (a use turned to a class whose access row is 0, a ground host no longer admitted: bricked; V04 §3.10); it reads collapsed or bricked while its element is closed (II.6), a derived reading, never stored */;
  knownTo: 'public'|'local'|'secret' /* item 64 (c), item 30's values: public for a stair, shaft or grating on public ground, local in a yard, and in a building by II.7.3's Basement accesses (4) — secret too where an undercity lifeline's row makes it so (II.7.5) */;
  source: 'neighbourhood'|'basement'|'system'|'lifeline'|'edit'|'dig'|'opening'|'overlap'|'crypt'|'dossier' /* II.7.3's neighbourhood rule or its basement accesses, a system's own entrance (II.7.6), an undercity lifeline (II.7.5), an edit (§7.1; §7.3 item 9's closure), a building's dig into a void, a public opening, a system grown through a void (item 109 (j) (3), (3b)), a church's crypt joining a catacomb (item 109 (k) (2)), a dossier's requirement */;
  cause: AccessCause /* persisted: the rule, the system and the event that made it; absent in an older document `legacy` (V04 §2.2) */; lifecycle: Lifecycle }   // §2.8's entity registry; its lifecycle row V04 §2.6's
interface UndergroundRule {
  undergroundShare: Record<Rung, number> /* an `extension` cell: 0 under the parity presets (§7.6), as are crowdingShare, the class table's underground and undercity 'preferred' shares and V04 §2.3's voidDwellings.share */;
  crowdingShare: number /* II.7.3 (c): the share of an epoch's residual poorest-band households the crowding hook sends underground (§4.11 (6)); default 0.10, our own, calibratable with the staged engine */;
  accessForecastMin: number /* 0.5: P7's forecast access chance at which a cavern or ruin void counts for S7b (6) (V04 §3.3 P7) */; forecastSafety: number /* 0.85 */ /* II.7.3 (d) and S7b (6)'s caps (V04 §3.3; the void-dwelling part is P7's derived voidDwellingHouseholds) */;
  undergroundOffset: number; depthScale: number; institutionDepthM: [number, number] /* [8, 15] */; vacancyRunShare: number; minRunM: number; floorAboveInvertCm: Cm; vaultAllowanceCm: Cm; depthBandCm: Cm;
  arrangements: DesignationTemplateRow['arrangement'][] /* default ['row', 'institution']: the arrangements S11 admits along the sewer, part 0 (II.7.3) */;
  access: { reachM: number /* 5 */; ageGain: number /* 1 */; ruinGain: number /* item 109 (d): × over a ruin (V11) */; cap: number /* 0.9 */; doorDropCm: Cm /* 60 */; stairDropCm: Cm /* 300 */; state: { open: number; locked: number; bricked: number } /* 0.6 / 0.3 / 0.1 */ } /* item 64: II.7.3's Basement accesses; our own values, extension */;
  shaftSpacingM: Record<'historical'|'navigable', number>; surfaceClearCm: Cm /* 600: II.7.3's pre-decided fallback */; excluded: ('water'|'damp'|'flood'|'wall_strip'|'tower'|'gatehouse'|'castle'|'precinct_main'|'footprint')[];
  connection: { reachM: Record<'historical'|'navigable', number>; pitShareByBand: Record<'historical'|'navigable', Record<string, number>> } }   // II.7.1's and II.7.3's tables as one editable rule record (§7.6)
interface UndergroundStrategy { derive(doc: Document, tunnels: Tunnel[], allocation: Allocation /* the underground pseudo-district's, S7b (6) */, rules: UndergroundRule, ctx: StageContext, k: Kernel):
  KernelResult<{ blocks: Block[]; plots: Plot[]; buildings: Building[]; access: AccessPoint[] }> }
// a tail Stage registered after the network stage by declared I/O: inputs under.tunnels, the ground plat (read), the fields, the underground Allocation and the access pass's
// outputs — its access points, links and ExcavationRecord (U-ACCESS, which runs before it; F6 reads the excavation reading, V04 §3.1 T3); outputs under.blocks, under.plots, under.buildings, under.access;
// runs S9 → S10 → S10b → S11 on the underground arena with the underground context; the StrategyRegistry's `underground` map (§14)
```

**The base's part, for the staged row (*Staged by the owner's roadmap*):** `RungProfile.layers.sewers` and `Features.sewers`
with S0's draw, and `Features.underground`; the underground `LayerSpec` hidden by default; the class table's `drain`,
`underground`, `undercity`, `undergroundAccess`, `crypt` and `concealment` columns and the cover table (§10.2);
`Tunnel.navigable`, `Tunnel.headroomCm` and the profile table with its wall thickness; the `AccessPoint` record with its
state, knowledge, source and cause; `ContextVector.arena`; `UndergroundRule`'s depth scale, vacancy share, crowding share,
arrangement restriction and access row, and S7b (6)'s void-dwelling part (V04 §3.3 P7); the undercity's existence row and rule (II.7.5); the system
rows, the link rule and the `raiseGrade` kind (II.7.6); the records `UndergroundSystem` (its kinds with `ruin`), `Gallery`,
`Chamber` and `UndergroundLink` (its via kinds with `breach` and `reuse`) and the district's `parent` and `outskirts` links
(§2.5, §2.7), schema-complete and empty; the `UndergroundStrategy`, `UndercityStrategy`, `UndergroundSystemStrategy`,
`AccessPassStrategy` and `UndergroundLinkStrategy` registration slots; the U1–U3 invariants, F-UNDER's and F-VOID's ladder
rows, §5.3's rows for the accesses, the concealed modes and the undercity, and §13.2's hook tests (T12, T63–T66); and the
closure rule with `addUndergroundAccess` (§7.3 item 9, §7.1), whose underground pieces run once the layer's stages exist.
Staged by the owner's roadmap (M6-U) and not built here: the stages themselves — the network, the sewer-front
neighbourhoods, the void systems, the undercity, the access pass and the connection stage.

**Limits (EP-19).** A degenerate gallery, chamber, plot or link the kernel refuses is handled on its stage's ladder — F-UNDER
for the sewer front, F-VOID for the systems and the undercity (§5.2) — the element left out and reported, never a whole-map
retry. With `Features.sewers` off the network stage commits nothing; with every system's chance 0 and `maxNeighbourhoods` 0
(the parity presets) nothing of the layer runs — no cavern and no ruin at any rung (item 109 (i)'s no-op pin; V04 T-V4-35);
outside the parity presets an unexcavated cavern or ruin draws only under the view key `showUnexcavated` (V04 §5.2;
J-VI.19); the islands setting changes nothing underground; the layer's `LayerSpec.visible`
changes nothing in the model. Every underground record persists in its part (§2.9), undoes by the log (§7.4), re-derives with
the tail at the same fold position (§4.1) and migrates by its table version — a document without a part has none, and
`nextUndergroundPart` is never reused (§7.5).
=== END ===

=== REPLACE ### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65) ===
### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65)

**One layer, several systems (item 65 (a); J-A65.31, J-A65.42).** The underground layer holds the derived sewer network — the
central piece, system kind `sewer`, part 0 (II.7.1–II.7.4) — and beside it the systems below, each an `UndergroundSystem`
record (§2.7) with its kind, its source, its arena part and its depth range: `ruin` (an older civilisation's remains, item
109), `catacomb`, `cavern`, `quarry` (quarries and mine voids), `vaults` (cisterns, street and bridge vaults and a raised
way's arch vaults), `buried` (a buried old town or former settlement) and `dug` (the private passages an access edit, an
undercity lifeline's closure or the connection stage digs, item 66). Each is its own arena part of the `underground` layer
(§3.4): the sewer keeps part 0, and every further system takes the next unused part number when it is first created — at
generation in the stage order below, one system per kind; a `buried` system when a `raiseGrade` first makes one, or at
generation from a history scar or the replay (*A buried old town*, below); a `dug` system at the first closure or generation
dig that needs one (§7.3 item 9 (d)) — stored on the record (`UndergroundSystem.part`), counted by the document's
`nextUndergroundPart` (§2.9) and never renumbered or reused, because the number is part of its entities' keys and addresses
(§6.3). One system per kind: two complexes of one kind that meet join, as galleries of one kind may; what passes over or
under without meeting belongs to another kind and so to another part. Inside one part every plan crossing is a junction
(§3.4), so no rule lays an element across another of its part without meeting it: a catacomb or quarry laid beside a complex
of its kind joins it at a common depth band; a dug connector's path search treats every other building's dug passage as a
foundation (step 3 below); and a drawn gallery or chamber that would cross one of its system's at another depth band is
refused by its dry run, naming the crossing (F-EDIT, §5.2; J-A65.47). A system's elements are **galleries** (`Gallery`,
§2.7: a chain at the part's L1 with `widthCm`, `wallCm` and `headroomCm` from its system row below, banded by
`corridorUnion` as a tunnel is, §3.7) and **chambers** (`Chamber`, §2.7: a void wider than a band — an ossuary, a cavern
hall, a ruin's hall, a quarry room, a cistern, an arch vault — a closed outline chain carrying the `chamber_wall` role, its
floor an L1 face; J-A65.32), each with its floor `elevationCm` and its `ceilingCm`.

**Depth bands.** Every gallery and chamber keeps its own depth, laid inside its system row's `depthM` range (catacombs 3–10 m,
vaults 3–8 m and a raised way's arch vaults at grade, quarries 10–30 m, caverns 5–60 m following the rock, ruins 4–30 m by
their age (V04 §3.5.0a), a buried town or former settlement at its old grade, dug passages 2.5–6 m) and never above the ground
less its system's `coverM`; inside one part depth is per entity (J-A12.45), and systems in different parts pass over and under
one another. The view groups every part's items into the depth bands of `depthBandCm` (II.7.3), so the layer draws and exports
as one (§8.4, §11.1), a crossing of two parts drawn over and under.

**The derivations.** Each system is a registered tail stage with declared I/O (§4.12) — `UndergroundSystemStrategy`, below —
running after the network stage in the order ruins (first, so the later systems meet them), catacombs, caverns, quarries,
vaults — then, at generation, a buried town or former settlement where a history scar or the replay makes one (below) — each
reading the ground and part 0 through the services only (J-A12.32) and writing its own part; every draw is on `sewer`, keyed
by the system's lineage and the element's source (§6.1; no new concern). Caverns and ruins exist at every rung, their extent
the site's, not the settlement's, so a hamlet may sit over a large one (item 109 (j) (1); PART III); every other system is
gated to TOWN and above (PART III) and by its row's chance per rung — a history scar's buried town by the `buried` row's
`scarSeverity` instead, drawing nothing; the chances are 0, and the scar rule off, in the parity presets. **Unexcavated by
default (item 109 (j) (2)):** a cavern or ruin exists whole whether or not anyone can reach it; it is `unexcavated` until an
access exists (the excavation state is V04's), drawn only under the view key `showUnexcavated` (dashed, faded), and the clerk
says so.
- **Ruins (item 109 (b)–(i); V04 §3.5.0a builds them).** An older, different civilisation's remains — distinct from `buried`,
  this settlement's own earlier level. **Existence**, from what explains it, strongest first: the dossier's `ancient_ruins`
  resource or a ruined-landmark record (scene archetype `ruined-landmark`); a `magical_node` or a ley-line income row; a
  `magical` history event or an ancient founding ("The Fall of …"); an adventuring institution that implies delving nearby, as
  supporting evidence; without a dossier, a blueprint chance by rung and relief under the fantasy toggle (D-3; V11's ruin
  chance rows); 0 in the parity presets (§7.7's DR rows map the dossier sources). The surface `ancient_ruins` decoration stays
  as the system's surface marker and, where placed, its entrance. **Structure — a remnant plan, not a cave:** laid as an
  ancient plan from an ancient-culture row (a grid, an axial temple precinct, a radial citadel, a terraced cliff city — V11's
  rows, each differing from every current culture row in at least block size, grid regularity and orientation law, so a ruin
  never copies the streets overhead), at its own orientation or, with a table chance, sharing one axis with today's main
  street, sized by its source's significance (a shrine complex, a palace, a sunken district; capped at a share of the frame);
  then decayed by a persistence order (monumental halls, walls, colonnades, cisterns, gates and paved axes survive longest;
  ordinary rooms least), keeping a survival share by age and cover, the rest collapsed or filled; its stepped monuments laid by
  V02's tiers (item 110 (c)). Galleries are its old streets and corridors, chambers its halls, temples, courts, tombs and
  vaults — straight walls, right angles, columns and axial symmetry. **Magic:** under `magic` ≥ `low` its chambers may carry
  lights (source `magic`), and a dossier's `magical_node` sits at its heart — the node term II.6 and V08 read, taken at the
  ruin's centre. **Named** from the `ruin` slice or the civilisation the dossier's history names (§10.4); **drawn** in V04's
  masonry style (§8.2's ruin style).
- **Catacombs (item 109 (k); V04 §3.5.1 builds them).** Only under cemeteries: a churchyard, a separate burial ground (a
  cemetery, or SettlementForge's `Cemetery network` ground beyond the gates), a monastery's burial ground, and, at CITY and
  METROPOLIS, a worked-out quarry turned ossuary for a cemetery's bones — each source with its chance by kind and rung (V11's
  `CatacombRule` cells, V11 §3.23.8). **Crypts are not catacombs:** a church's crypt is part of its own basement (§2.6; §10.2's
  `crypt` column; the cathedral always has one, the largest), never a catacomb source, and it opens into a catacomb only by
  V04's crypt join where a gallery grows beneath it. **How many:** at most one at TOWN; at CITY and METROPOLIS one plus one
  per `churchesPer` churches (the dossier's church records and ranges, item 108's members, or the roster's), capped by rung
  (V11's `CatacombRule`); candidates are taken in order — cemeteries by the burials they serve, then a quarry ossuary — until
  the count is reached, each still subject to dry ground, the age gate and its chance, so not every town has one; the largest
  catacomb is the largest cemetery's. A source qualifies when its ground is not `damp` or `flood` (the water table of §2.6's
  gate values) and its **age** reaches `minAgeYears` (100): a source's age is its own — at generation `(K − k + 1) ×
  yearsPerStage` for a source built in growth stage k of K (§4.4; `yearsPerStage`, the stage rows' 50 years; with a known
  history K and the stage years are §4.2 S2's history-scaled ones, so a stage-1 source is as old as the settlement's
  `ageYears`), after the replay or epochs the log's years since its use opened. **Extent — moderate and never shrinking:** the
  ossuary need `A = Σ_years servedPopulation × burialRate ÷ 1 000 × ossuaryShare × m2PerBurial` — the population its source
  serves (the town's population history × the source's **burial share**, the share of households whose nearest open burial
  face it is; at generation each growth stage's population at its built share; an epoch's calamity deaths included,
  `CalamityRef.deaths`), `burialRate` 30 per 1 000 a year, `ossuaryShare` 0.1, `m2PerBurial` 0.05 — is a **ratchet**: every
  derivation (a growth stage, an epoch, a dossier event, a regeneration) may only add galleries and chambers, the extent being
  the larger of the current extent and the need, its growth per epoch at most `max(extent × ((1 + growthCapShare)^years − 1), growthFloorM2)`,
  `growthCapShare` a share per year compounded over the epoch's span (the power by `dmath.pow`, §6.5 (3); V11 §3.23.8;
  J-VI.6; V04 §3.5.1 (6)); a
  new cemetery or church taking a share of burials never removes an older catacomb's galleries, and closed galleries stay part
  of the extent. Laid as galleries on a grid of `gridM` (6 m) under and beside the source within `reachM` (80 m), an ossuary
  chamber at every fourth crossing, and an **entrance stair on the source's burial face**, its head in the face's chapel where
  one stands, never inside a church-class building — a churchyard's catacomb is entered from the churchyard, and through its
  church only by the crypt join; a quarry ossuary by its working's shaft and a stair at the working's surface head (an
  `AccessPoint` of source `system`; V04 §3.5.1 (9); V01 makes it a place, V01 §3.7.1). **Stagnation:** where growth is blocked
  — its reach limit, wet ground, another system or a foundation in the way, the wall strip, the rock's depth, or its source
  closed — the catacomb is `stagnant`: its extent holds and the unmet need is absorbed by reuse (the ossuaries' fill rising,
  drawn denser), never as loss; when the block lifts, growth resumes by least disruption; a catacomb whose cemetery closes
  stops growing and stays; a new cemetery begins a new one only where the count allows. So a catacomb is as large as its town's
  dead and as old as its cemetery.
- **Caverns (item 109 (a)).** From geology: where S1's geology flag (`Terrain.geology`, §2.3) is `soluble` or `volcanic`, over
  the frame's rock (S1's `rock`, `high` and `mid` terrain classes), a cavern system exists with the row's chance (soluble 0.7,
  volcanic 0.4), multiplied where the site holds mining (`Terrain.mining`, §4.2 S1 (10)) by `cavern.mineBoost` (1.4, capped at
  0.9); in `ordinary` rock of hilly or mountainous relief a `fissure` variant applies with its own chance (0.15): narrow
  fissure galleries along the steepest relief with one or two chambers, never great halls — rock type stays the physical gate
  for large systems (general knowledge, not corpus-witnessed). Soluble rock: galleries along the terrain's drainage lines
  beneath the rock (§2.3's `hydro` cells whose `flowAccum` passes the row's threshold), at the local water table — a gallery
  below it carries water (`Gallery.water`) — with a hall where two galleries meet under high relief; volcanic rock: one to three
  tubes descending from high ground along the steepest descent, with breakdown chambers. The extent is capped at
  `maxRockShare` (0.1) of the rock area, and a gallery that meets a slope's face or a bank opens there as a cave mouth (an
  `AccessPoint` of kind `mouth`). **Mines break into caves:** a mine working within `cavern.breachM` (40 m) of a cavern gallery
  joins it by a `breach` link, the mine's shaft then an access to the cavern (V11's cavern rows hold these cells).
- **Quarries and mine voids** — from S1's stone resource and the town's stone stock: the volume taken is the stone the town is
  built of — the wall volume of the stock whose material is stone (§2.6's material rule, read here as a quantity of stone,
  never as a shape; J-A65.45) and of the enceinte's walls and towers — × `wasteFactor` (1.6); the workings are laid on the
  frame's stone cells (`SiteResources.stone` ≥ 0.5) ranked by stone value, then nearness to the town, within `reachM` (2 km),
  under the town first where its own ground holds the stone (as the old quarries lay under Paris), as room-and-pillar galleries
  on a `roomM` (5 m) grid leaving `pillarShare` (0.35) of the rock, the area (m²) = volume (m³) ÷ (`headroomCm` (250) ÷ 100);
  a working whose cover would be under `minCoverM` (6 m) is left to the hinterland's surface quarry (§4.9) and laid nowhere
  underground; a shaft opens at each working's centre (an `AccessPoint` of kind `shaft`). Mine voids read `SiteResources.ore`
  the same way, where the roster holds a mining class.
- **Vaults** — cisterns and street, bridge and raised-way vaults: under every bridge approach whose way rises over the ground
  beyond the banks; under way segments on slopes steeper than `vaultSlope` (0.12) where a street is carried on arches; a
  cistern under the oldest precincts and the castle where the lesser of `dist.water` and the distance to the nearest aqueduct
  delivery point exceeds `cisternDistM` (400 m) — each a chamber or a short run of vaults under its way or precinct, under
  public ground only (II.7.3's surface constraint applies, a cistern's own precinct or castle court admitted); an aqueduct's
  cistern terminal takes a terminal cistern under its conduit house's yard; and each span a raised way's record marks `vault`
  holds one arch vault at grade (`archVault`), following its raised way at every rung — the TOWN gate binds the other vault
  sources only. The aqueduct's need test (§4.3) reads only eager inputs and never these placed cisterns, so no cycle arises; the
  cistern rule reads the aqueduct's delivery points (`terminal.at` and `feeds`) in return.
- **A buried old town** — the settlement's own earlier street level under a raised grade (item 65 ruling 5; J-A65.46): the
  conversion kind `raiseGrade` (below; §4.11's union names it) is applied by an epoch (the evolution engine) or by hand (a
  `convert`, §7.1). S1's terrain operator raises the region's ground by `raiseCm` (≥ 200 cm, a storey); the region's ways,
  plots and buildings at the old grade end on the ground (their existence `cleared`, §2.8) and fresh records of the `buried`
  part are the system's elements — each old way's centreline a gallery, each old building's ground storey a chamber, each
  square a `square` chamber, each new record minted from the conversion event's `seq` and ordinal as a mutation's added parts
  are (§6.3), the cleared records keeping their addresses on the ground: an address names its part and no batch writes two
  (§3.4) — while the ground above is re-derived on the new grade from the old centrelines (regrowth-first, §4.11: the streets
  keep their lines, the buildings rise on their plots). The conversion records the system it created or extended in
  `RaiseGrade.system`, so a replay after a log truncation reads its part number there, as a closure's `ClosureRecord.created`
  does (§2.9). So an undercity in it walks the old town's streets under the new. **At generation from a scar:** where
  `HistoryHint` carries a `fire` or `flood` scar (the `RaiseGrade.cause` types §4.2 S2 routes here) of `severity` ≥ the
  `buried` row's `scarSeverity` (0.5), the most severe such scar (ties: the oldest, by `yearsAgo`) makes one `buried` system —
  its region the districts whose `growthStage` is 1 (its `sources`, §2.7), its galleries that region's way centrelines, its
  chambers their buildings' ground storeys and its squares (a `square` chamber each: every square face and every square block
  of the region), fresh records of the `buried` part (the system's lineage children, §6.3), its floors at `scarBaseCm +
  scarGainCm × severity` (200 + 200 × severity) cm below the present grade — the town above generated on the present grade as
  it stands, no `raiseGrade` event recorded and nothing cleared, the rule drawing nothing (our own rows, calibratable,
  `extension`, off in the parity presets); with the hint empty, none. **The buried former settlement (item 113 (c)):** under
  history-first generation (§4.11) a destroyed or shrunken former settlement older than `history.burialYears` is buried the same
  way from the replay's own former geometry — its streets, walls and major buildings at their old ground level — as fresh
  `buried` records minted from the replay epoch that buried them; it is this settlement's past, distinct from a ruin's older
  civilisation, and access to it follows item 109 (j) below.
- **Dug passages** — item 66's pieces (below), and those the connection stage digs at generation for an undercity lifeline and
  for a subterranean dossier institution, keyed by the district's lineage or the institution's binding key (no
  `ClosureRecord`: generated pieces re-derive with their owner, edit-made pieces are held, and a `regenerate` on the `dug`
  system re-derives only its generated pieces; §7.3 item 9 (d)).

**The connection graph (item 65 (d), item 109 (d), (j); J-A65.47).** A link (`UndergroundLink`, §2.7) joins two elements of
different parts — each end one vertex in its part carrying the `link_end` role (§2.2 rule 7), never a vertex two parts share
(J-A65.31) — with a `kind` (`open`, `gated`, `secret`, `collapsed`, `flooded`), a `via` (`breach`, `reuse`, `stair`,
`shaft`, `door`) and a `knownTo`; the surface links are `AccessPoint`s (II.7.4). Two tail stages make them: **the access pass**
(`AccessPassStrategy`, V04's U-ACCESS), after the void systems and before the undercity, writes the proximity, overlap,
mine-breach, crypt and reuse links, the dig, opening and crypt accesses and a mine's heading galleries; **the connection stage**
(`UndergroundLinkStrategy`) runs last, after the undercity: (1) the undercity's lifelines (II.7.5) first; (2) for every pair of
elements of different systems within `linkReachM` (10 m) in plan and `linkDepthM` (8 m) in depth — found by reads across parts
— one link per pair within `linkSpacingM` (60 m), existing with the row's chance for the pair of kinds (sewer–vaults 0.6,
catacomb–quarry 0.5, any–buried 0.5, sewer–catacomb 0.3, sewer–quarry 0.3, cavern–quarry 0.3, sewer–cavern 0.2, others 0.2;
our own), so a catacomb may meet the sewer or not; (3) its kind drawn by the row's weights (open 0.3, gated 0.25, secret 0.25,
collapsed 0.15, flooded 0.05 — `flooded` only below the water table); (4) its `knownTo` `secret` for a `secret` link or a link
into a building with a concealed use, else `local`; (5) II.7.3's basement accesses (item 64). **Ruin links, only where the
rules allow (item 109 (d)):** a cavern gallery crossing a ruin street breaks into it (`breach`); a mine or quarry working within
reach breaks into a hall (`breach`); a catacomb may reuse a ruin's tombs (`reuse`); the sewer may adopt an ancient drain as a
trunk stretch where one lies along its course (`reuse`, never against the sewer's own hydraulics); a well shaft piercing a
chamber is an access; a buried old town above may reach it by a stair; its surface marker, a ruined landmark or a cave mouth
is its entrance. **Access to caverns and ruins (item 109 (j) (3), (3b); V04's excavation reading):** each access is an
`AccessPoint` with its cause — dug from above (every building standing over a chamber or gallery within `dig.reachM` of its
footprint's floor draws once, when it is built, for an access down, at a chance by its class, the void's depth — falling
steeply below the reach, so even at METROPOLIS a share of deep chambers stays sealed — and its basement; keyed per building on
`sewer`, so the chance of access rises as the settlement grows); a public opening (a sinkhole, a cave mouth, a collapsed shaft,
a ruin entrance, each by its row's chance); or none. When any system grows — the sewer extending, a catacomb's growth, a working,
a dug passage, an undercity lifeline — and one of its tunnels or galleries crosses or meets a sealed cavern or ruin where their
depth ranges meet, the crossing becomes a `breach` link (the grower's own course never bent for it) and the void is reached
through that system; at different depths they stay apart, save a small row chance of a connecting shaft. Access is
**transitive**: a void is `accessible` while the graph links it to a surface access point through **open** links only; when
every open path closes — its sewer sealed or caved in, a cellar filled, the building above lost, a disaster — the void is
`lost` (item 113 (e)): remembered as once known, drawn faded like an unexcavated void, until refound (the sewer reopened, a new
dig, a collapse, an excavation); dwellings in a lost void empty by the vacancy rules and may return with access. A link's kind
follows the elements it joins (II.6), and every link is an edit target (add, delete, `setAttr` on `kind` and `knownTo`, §7.1).

**The same engine, and the rest of the family's rules (item 65 (e)).** Every system is laid by the kernel's one cut (J-A65.32):
galleries as chains banded by `corridorUnion`, chambers as closed outline chains. Plots and buildings exist only where a system
hosts people — the sewer's frontage (II.7.3), an accessible cavern's or ruin's scattered dwellings (II.7.3 (c), (d)) and the
undercity (II.7.5); a catacomb's, quarry's or vault's chambers carry none unless the undercity takes them. Every element is an
edit target (draw, move, delete, `setAttr` on kind, depth, width, state and `knownTo`; II.6's conversions and `flood`; the
author draws or pins ruins with `drawTunnel` and `drawChamber` with system `ruin`), every rule is a data row (§7.6), the seed
survives edits (§6.3), the dossier stays the authority for institutions (item 20), and every element fades by II.6's condition
table — a ruin decaying slowly, excavated by a `dug` link, reoccupied or sealed over epochs (V06). **Light (item 68 (d′)):**
catacombs are dark but for their shrine and ossuary lamps at the chamber altars, caverns dark but where lived in (a
glowing-fungus row only where the `magic` circumstance or the biome allows, `LightRule.biome`), quarries and vaults dark but at
their shafts and where lived in, ruins by their magic rows — §4.7's light table, context `arena` underground and the system
kind; every access or cave mouth that breaks the surface is a light shaft (§8.4).

**The pieces an access edit generates (item 66; owner: "if a user edits a building to have an access to the underground, it
generates all the necessary pieces"; the closure rule — one event whose batches commit together, the record of what it
created, exact undo, shared pieces kept — is §7.3 item 9's; J-A66.41).** `addUndergroundAccess(building, target?)` (§7.1)
calls these generators in dependency order at its dry run, each drawing on `sewer` keyed by the building's lineage, the
target's and the event's `seq` (§6.1; minted as J-A18.43 mints), so the same edit on the same seed gives the same pieces:
1. **The basement** — §2.6's basement decision with its probability forced: the request overrides the chance, never the
   terrain gate — a full cellar where the gate allows, else a half cellar or a walk-out on a slope, else a hatch to a crawl
   space under a raised floor (§2.6's requested-mode ladder), else a refusal naming the gate (F-EDIT, §5.2), never silent
   (J-A29.22 stands).
2. **The target** — the named element; else the most plausible reachable one: an open navigable sewer tunnel or an
   underground building's wall within `accessReachM` (II.7.3's targets), then within `digReachM` (60 m) the nearest open gallery
   or chamber of a ruin, catacomb, cavern, quarry or vaults, or an undercity walkway — ties by plan distance, then address.
3. **The connector** — when the target lies beyond `accessReachM`: a `dug` passage, a gallery chain in the `dug` system's part,
   routed by the kernel's path search (§3.1) on the frame's grid from the basement ring to the target — its cost infinite within
   `foundationClearM` (0.5 m) of every other building's footprint, basement ring and dug passage and wherever the water table
   (§2.6's gate values) lies above the passage's floor, rising with the rock class — inside the `dug` row's depth range, below
   the street's services (the network's `coverCm`, II.7.2) and above the water table; a route longer than 2 × `digReachM` is a
   refusal with the reason, and so is a route the search does not find (`E_NO_PATH`, §3.1: the basement ring enclosed
   within `foundationClearM` by other footprints, basement rings or dug passages, or the water table above every floor
   between it and the target): the dry run refuses with its reason, naming the blocking building or the water table
   (F-EDIT, §5.2), never silently and never a whole-map retry, and the basement of step 1 is not laid (§13.2's T66 group
   covers a target within `digReachM` whose route exceeds it and an enclosed basement).
4. **The system itself** — where no underground element lies within `digReachM` (a town without sewers, a village): the minimal
   private underground, the `dug` system with one passage to the most plausible outlet by the building's outlet row (default:
   another cellar of the same owner within reach, a catacomb or cave the site has, the riverbank, the shore, beyond the
   outermost enceinte; where the building carries a concealed use: beyond the walls, the riverbank, the shore, a catacomb or
   cave) — its outer end an `AccessPoint` of kind `mouth`, or a door into the other cellar. The settlement's sewer rows are
   unchanged — a dug passage is no network and `Features.sewers` is untouched — while `Features.underground` turns true
   (II.7.4).
5. **The access point** — II.7.4's record, its kind by the drop (II.7.3's *Basement accesses* (3)), `state` `open`, `knownTo` by
   II.7.3's *Basement accesses* (4), `source` `edit`.
6. **The plan** — the plan rung reserves the stair, ladder or hatch in the basement plan (§2.6, item 28), and the building's plan
   rung is marked `stale`.
7. **The links** — the connection graph gains the new links, typed (`open` at a dug passage's two ends).
The closure's other instances (§7.3 item 9 (d)) declare their own generators: a concealed front's missing door by §2.6's
entrance rules (§4.7's *Concealed institutions* (4)), an undercity neighbourhood's missing lifeline by the target, connector,
access-point and link steps above (II.7.5), run from that neighbourhood's district ring in place of a basement ring, its target
the nearest element of another system with an access to the surface (II.7.5's condition 4), and keyed by that district's
lineage. The bars are §13.2's T66 group.

```ts
interface UndergroundSystemRow {   // one per system kind; II.7.6's rules as data (§7.6); our own values, extension (every chance 0 in the parity presets)
  kind: 'ruin'|'catacomb'|'cavern'|'quarry'|'vaults'|'buried'|'dug'; chance: Partial<Record<Rung, Record<string /* source kind */, number>>> /* absent: none (the buried row's generation-time town reads scarSeverity instead); below TOWN only the ruin and cavern rows */;
  depthM: [number, number]; coverM: number; gallery: { widthCm: Cm; wallCm: Cm; headroomCm: Cm } /* the kerb reads widthCm ÷ 2 + wallCm (§3.7) */; chamber: { minM2: number; ceilingCm: Cm };
  params: Record<string, number> /* the kind's own values named above: minAgeYears, burialRate, ossuaryShare, m2PerBurial, gridM, reachM; mineBoost, fissureChance, breachM, maxRockShare, miningCellShare (§4.2 S1 (10)'s mining test); wasteFactor, roomM, pillarShare, minCoverM; vaultSlope, cisternDistM; scarSeverity, scarBaseCm, scarGainCm; digReachM, foundationClearM — the catacomb and ruin rows' own cells being V11's CatacombRule and ruin rows */;
  outlets?: { use: 'default'|'concealed'; order: ('cellar'|'void'|'riverbank'|'shore'|'beyondWalls')[] }[] /* dug only: the outlet rows of item 66's step 4 */ }
interface LinkRule { linkReachM: number /* 10 */; linkDepthM: number /* 8 */; linkSpacingM: number /* 60 */; chance: Record<string /* the sorted pair of system kinds, 'catacomb|sewer' … */, number>;
  kinds: Record<UndergroundLink['kind'], number> /* the kind weights */ }
interface RaiseGrade { op: 'raiseGrade'; region: Id[] /* the blocks or districts raised */; raiseCm: Cm /* ≥ 200 */; cause: 'fire'|'flood'|'rebuild'|'hand';
  system?: Id /* the buried system it created or extended, written when the conversion is applied; its address's under<n>/ prefix carries the part number a replay reads (§2.9) */ }   // a conversion kind (§4.11's union names it): the buried old town above
interface UndergroundSystemStrategy { derive(doc: Document, row: UndergroundSystemRow, ctx: StageContext, k: Kernel): KernelResult<{ system: UndergroundSystem; galleries: Gallery[]; chambers: Chamber[]; access: AccessPoint[] }> }
interface AccessPassStrategy { run(doc: Document, rules: { link: LinkRule; dig: DigRule; openings: UnderOpeningRow[]; catacomb: CatacombRule }, ctx: StageContext, k: Kernel,
  scope?: EpochScope /* V06 §2.1's; absent at T2b (the whole document), V06's under.access passes the epoch's */):
  KernelResult<{ links: UndergroundLink[]; access: AccessPoint[]; headings: Gallery[]; reached: ExcavationRecord[] /* the ExcavationRecord entries the commit adds (V04 §2.2) */ }> }
  // V04's U-ACCESS (V04 §1b.2, V04 §3.5.7); DigRule, UnderOpeningRow and CatacombRule are V04 §2.3's (their rows V11's)
interface UndergroundLinkStrategy { link(doc: Document, rule: LinkRule, access: UndergroundRule['access'], ctx: StageContext, k: Kernel):
  KernelResult<{ links: UndergroundLink[]; access: AccessPoint[]; outskirts: { district: Id; blocks: Id[] }[]; dug: { system?: UndergroundSystem; galleries: Gallery[]; chambers: Chamber[] } }> }
// Tail stages registered after the network stage by declared I/O (§4.12): the systems in the order ruin, catacomb, cavern, quarry, vaults and, at generation, a scar's or the replay's buried system, each writing
// its own part; then the access pass (AccessPassStrategy, U-ACCESS), II.7.3's stage (U-FRONT, which reads the access pass's excavation reading for F6),
// II.7.5's stage; then the connection stage last (V04 §3.1), which writes link records and access points and no geometry but their link_end and access_point
// vertices and the dug pieces of lifeline closures and of the dossier's subterranean institutions, each on the dug part, one part per transaction; the StrategyRegistry's `underground` map (§14)
```
=== END ===

=== REPLACE # PART III — What a later village product needs from the base (one page; the hooks are concrete) ===
# PART III — What a later village product needs from the base (one page; the hooks are concrete)

*In plain words.* The village generator is a separate product the owner stages beside the town's later milestones (V-M0 to
V-M4), with its own ladder (thorp → hamlet → village); V07 designs it at build depth. This page lists the hooks the base
carries for it and confirms nothing here stands in its way; the base does not pay for it.

**What it reuses unchanged** (V07 §3.2 (2)): the kernel and plat (§2–§3); the site model — descent-traced rivers with a carved
field, level-set ponds, the coast routine (§4.2) — and, for VG's own order, a `RiverStrategy` that lays a terrain-independent
spline course first (VG's live course runs through 6–7 control points laid before its terrain; COV-VG-WC2) and asks S1 to
carve the field to it, which S1's carve step already does; the sequential roster and lazy people (§10); the frontage-first plot
machinery, the one placement solver, the designation templates and the designation mutator (§4.7 S10b, S11; §10.2), whose
rows gain the village classes as their own `v.` keys (V07 §2.4; V11 §2.9), and the `Use` record with its relocation path
(§2.7, §4.11) — a village adds rows, not code; the hinterland presets incl. the VG sector look, orchards and commons (§4.9);
the `palisade` enceinte kind (§2.7); the display list, style sheets, the base's relief tier and the reserved `painterly` preset
slot (§8.2); the document, edits, exports and the API (§7, §11).

**The hooks it registers against (DEF-15; each built by V07; numbers kept):**
1. **Its registration and a density stage before its network (COV-VG-VN-002; item 202).** The product registers its
   `ProductDecl` in `StrategyRegistry.products` (§4.12). The pipeline is the topological order of declared stage I/O (§4.1,
   §4.12), so the village's density `StageDecl` feeds an input its network stage declares: VG computes its density before its
   roads, and the base's S6 order does not bind it. Its writer order and `ProductDecl.extraInputs` are §4.1's (V07 §3.0, V07 §3.5).
2. **A palisade before its roads (MN-4, COV-VG-VN-003).** VG 1.6.9 (itch 19365073) builds its palisade before the roads — the
   hull of the populated points of a 10 × 10 lattice over the density field, cleaned and smoothed — and its road trackers
   consult it at every step, a per-type terrain weight plus terms for water, the destination's pull and the wall's push, gates
   falling where they meet it (reader-tier, for the village rung's calibration; provenance row D5, item 61; `profile-village.md`
   New-build addendum N2, P1). The village's `EnceinteStrategy` of kind `palisade` (§2.7) builds exactly that from its density
   stage, and its tracker-steered `NetworkStrategy` receives it through the `enceintes` input every network strategy takes
   (V07 §3.4).
3. **A tracker-steered network** (VG's roads are steered trackers, not A*; V07 §1b W15) with one through-road and partial
   driveways, and a "houses along ways" `FabricStrategy` with no block cutting.
4. **One district (COV-VG-WC4).** A village is modelled as one district of kind `village` (one quarter) covering the
   settlement; its blocks are the large faces between ways and its plots line the ways, so the containment
   invariant building ⊂ plot ⊂ block ⊂ district holds unchanged and nothing in §2–§4 needs a village exception.
5. **A size ladder below TOWN (D-33).** `LadderRouter` routes a population inside the village range (THORP [1, 80), HAMLET
   [80, 400), VILLAGE [400, 1 500) inhabitants; our own rows, calibratable, §1.1's with V07 §2.1's households, the THORP floor
   of 1 by J-V7.1) to the product, and a request of 1 500 or more is a base TOWN; the port consults
   `LadderRouter` at creation and at every absorb, and one document
   crosses the 1 500 boundary by §4.11's fold of the product at an epoch (item 322). VG itself spans ≈ 130–1 700 inhabitants;
   a village request's default is not a walled circle (walls are a rule keyed on rung); VG's independent tree stream is a keyed
   sub-stream (already the design); VG's spotlight vignette and grass-tuft look are `painterly` programs, and the hillshade,
   contour and hachure marks are the base's relief tier (§8.2, built at M2b), so the village adds none of them
   (COV-VG-VN-029).

**Its rung rows** carry the village's baselines as data: `frameLaw` `territory`, a hidden-share target of 0 and reach weights
of `open` only (§4.6), a `market` row of `min` 0 with at most one market sited by §4.2 S3 (12)'s score with the plaza kind
absent, the farm mode by plan form (§4.9; V07 §3.2 (3)), the band set's cuts computed per village from its own roster
shares over its one district (§4.5), `layers.islands = 'none'` (II.6), `layers.sewers.existence = 'never'` (II.7.1: no
network is laid at a village rung, where the network stage registers only in V04 §3.1's maintenance mode for a network a
larger rung left; a request's `toggles.sewers` reported as not applicable, the `drain` column read by nothing) and
`layers.undercity.existence = 'never'` (II.7.5). The furniture pins at its rungs are its own pin stage's (§4.7), a concealed
institution takes the `front` mode (§4.7), and §4.11's terrain and water conversions apply unchanged.

**The underground below TOWN (item 109 (j) (1)).** The village derives no sewer network, catacomb, quarry, vaults or
buried-town system (their rows of II.7.6 are gated to TOWN and above); caverns and ruins exist at every rung by the site
(V07 §3.16), unexcavated until an access exists, with scattered dwellings only after access; an author's
`addUndergroundAccess` (item 66) digs a private passage (II.7.6); a town shrunk into a village keeps its standing systems in
maintenance mode (V07 §3.12).

**A dossier below the town floor (item 81; J80).** A dossier whose population lies below 1 500 is refused by the port
(`E_RUNG_UNAVAILABLE`, naming the village product; §7.7 item 15) only while no village product is registered — the
dossier's population is a dossier fact a clamped town would contradict; with one registered, the port routes it through
`LadderRouter`, an absorb at population 0 routing to THORP and V07's desertion (V07 §3.12) while a creation below 1 stays
refused (SCOPE-C01; item 202). §1.1's clamp to a 1 500-person TOWN stays for a request that carries no dossier.

**Not-precluded checks** (the parity judge's 44 / 44): the strategy registry admits every strategy above; the level
model tolerates nearly empty L2 / L3; model time is near-linear in building count; every VG rendering row has a program or a
preset slot; terrain-and-water-as-one-picture is the base's own model. **What the base does not pay for:** tracker steering,
the palisade construction, VG's spotlight and painterly look, the palisade look, VG's grammar and its tag vocabulary.
=== END ===

