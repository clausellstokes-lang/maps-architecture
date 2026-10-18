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
  | S7, per enceinte | L1: setback and glacis lines (the wall strips), the intervallum, gate-plaza claims, castle paths and inner-ward trace, quays, piers and moles · after the last enceinte's batches and before S7b, §2.7's support step once more on every raised way (§4.8's lead), where a station can be neither slid nor omitted the S7 part it meets cut round its ring or ended at it in one L1 batch (§2.7's support step (6) (a)) | F-WALL, F-CASTLE |
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
no relaxation reaches takes F-ROUTE's last rung (`unserved`, reported). A standing
raised way's support rings, ramps, stairs and feet (`RaisedWayRecord.feet`) and the under-deck strips of its `vault`
spans are impassable to every route and growth proposal on ground part 0 once generation has ended, and at generation
where the raised way is locked or pinned (held, §2.7's support step (6) (b)); elsewhere its under-deck strip (§4.6) is
crossed only under an `open` span whose clear width is at least the way's width + `raisedWays.structure.clearWidthM` and
whose soffit meets §2.7's *The clearance* for the crossed way, within ± `raisedWays.structure.squareDeg` of square to
the deck (V11 §3.24.2), never along the strip. At generation, before the span rule has run, a later stage's way keeps
off an unlocked raised way's ramps, stairs and feet and crosses its strip only where the deck's soffit meets *The
clearance* for it, never along the strip, and the support step's last run (*The slot*, below) slides the supports off
it ((6) (a)). A route's crossing shifts along the
strip to the nearest crossing these admit, else the route takes another course by F-ROUTE's ladder (§5.2) — the one
rule S5c's proposals (§4.4) and stage 2's ways (V01 §3.17.3 (3)) keep. At
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
§2.7's), so the ground's planar rule is untouched: it crosses the ways beneath without a junction, its two ends are its feet
on ground part 0 (`RaisedWayRecord.feet`, §2.7),
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
  reading S6's typed wards and pass-1 prosperity. After S7's batches and before S7b, §2.7's support step runs once more
  on every raised way, its keys kept (§2.7's support step (5), (6) (a)). So S7b's capacity (§4.5), which subtracts each
  district's under-deck
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
   nothing and recording no enceinte where no closing row carries one — and in a walled stage the arcs a land barrier
   closes are impassable to routes as the wall is (§4.2 S3 (7)), while an unwalled one's routes cross them where §4.3's
   class grade limit admits an edge, else F-ROUTE's `unserved` (§4.2 S3 (9) (a)).
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
treats the moat as water. The carve clears no raised-way support: §2.7's support step (6) (a) re-sites one first in the
same commit, and where a crossing's spans or piers cannot keep their bounds, or the berm or channel would meet a ramp, a
stair or a foot, the berm and channel stop at the under-deck strip's edges, reported (`W_RAISED_CROSSING`); after
generation, or across a locked or pinned raised way, the trace passes through its station on the deck at its level nearest where it would
cross, and the berm and channel pass under the deck only where the span is `open` and no other support, ramp, stair or
foot stands in them, else stop alike (§2.7's support step (6) (b));
a stage gate on a raised arterial is a raised gate whose tower carries the deck, the deck itself crossing the
channel (no part-0 deck added for it), the part-0 way beneath taking its own ground gate (S7 lays both, §4.8 *Gates*).
Nothing finer than L1 exists yet, so the carve's footprint clears nothing else. The innermost
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
  shore or a reservation at ≥ 30° ends there (a street arriving at the quay). A standing raised way is crossed only as
  §4.3 *Lattice and costs* states: a proposal meeting what that rule makes impassable (its supports, ramps, stairs, feet
  or a `vault` span's strip where it is held; else, at generation, its ramps, stairs and feet), or meeting its under-deck strip
  anywhere else than where that rule admits a crossing, is deflected along the strip to the nearest crossing it admits,
  or ends at the strip as at a reservation. A wall is never crossed except at a gate: a
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

=== REPLACE ### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture ===
### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture

**The trace is S3's and S5a's** (§4.2 S3 (6)–(9), §4.4), always fixed before that stage's secondaries grow. S7 builds
everything that stands on the traced wall, once per enceinte, after S6 has typed the districts, in **one L1 batch** per
enceinte; its geometry at L3 and L4 is built inside the wall strips by S10 and S11 after S9. After S7's batches and
before S7b, §2.7's support step runs once more on every raised way, its keys kept (§2.7's support step (5), (6) (a)):
where a station can be neither slid nor omitted, the S7 part it meets gives way round its ring (§2.7's support step
(6) (a)), reported.

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
writes each run's `Enceinte.condition` and material (§2.7; item 114 (b)) from §7.7's DR41 — the dossier's defence
readiness and wealth (or the blueprint's stand-ins) mapped to the table shares of `walls.condition`'s `generation` cells
(V11 §3.25.3), a `patched` run's material from `walls.patchMaterials` by the enceinte's kind and culture, a `breached`
draw on the band's stretch under a raised way's crossing station read as `worn` while its deck stands (§2.7's support
step (3)) — along an
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
the strip's inner edge. **A trace across a standing raised way** (at generation a stage's trace across an S4 or S5b
viaduct, the stage's own included, its crossing station put on the trace by §2.7's support step (6) (a); after
generation any trace across a standing raised way, through one of its stations by (6) (b)) takes the crossing as
furniture, at
generation as at an epoch, in the form V06 §3.7.6 (5) gives it: for an aqueduct a **wall opening** — an arch in the curtain under the
deck, no gate (no portal, no gate law); for a viaduct or an elevated road a **raised gate** at deck level — a gate whose
tower carries the deck, its portal on the raised part only, the raised arterial's crossing of the trace (S5b) — the
part-0 way beneath, if any, taking its own ground gate (§4.4 *Outer moats*) by §4.2 S3 (4)'s gate law. The F-WALL ladder's last
rung is §5.2's.

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
demand** = the suffix of the sequential roster between the old and the new population, §10.2 — prefix-stable, read over
the households the town holds where a fall held one (V06 §3.5.1 (1)) — so no
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
  channel passes under keeps its course; a support the channel meets is re-sited at generation by §2.7's support step
  (6) (a); after generation the channel passes under an `open` span, its course bent at the dry run (§2.7's support step
  (6) (b)).

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
   the year position (§2.9's `yearWeek`: midsummer, week 19, by default). Its **present at creation** is the dossier's present
   week (a standalone map's, week 0). Its **creation week** — the week of its `generate` event, its first model's — is
   that present, except on a history-first document, whose `generate` event stands at the replay's start,
   `W_p − round(52 × start.yearsAgo)`, `W_p` that present (V06 §3.20.3); the first epoch's `years` (above) and V06's
   `prevWeek` read the creation week, and a replayed past lies between it and the present. `EpochInputs.week` is the
   absolute week at the epoch and `years` is derived
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
   one number §7.7 item 3's lapse reads too), and at the week of each newly carried calamity dated after the last
   epoch's week that no other epoch falls on
   (DR28: a destructive event is epoch content; V08 §3.6 (3); J-V8.55) — carrying the target, the circumstance slices
   (§7.7 layer 2), the event kinds
   and that week's dossier events in `EpochInputs.dossier`; a catch-up batch follows the same rule, gaps allowed, coarsened under item 119's comfort level by V06 §6.8 (6) (every
   dossier event still at its own week; a calamity then riding the coarse epoch that holds its week). A newly carried
   calamity dated at or before the last epoch's week folds no epoch at its own week: it rides the first epoch folded by
   the absorb that carries it (`DossierPort.absorb`; with none, the port folds one at the absorb's week for it), its
   `EpochInputs.events` entry at that epoch's first week (the last epoch's week + 1), its own tick kept in its receipt,
   so its hazard strikes and its deaths reach the burial need; with the absorb's week itself before the last epoch's
   (V08 §3.6's degenerate row) it folds no epoch and its dated changes apply finished, noted. No epoch
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
faces beside a lapsing stretch of the old chains or under the new rectangle,
an L0 batch replacing the `margin` chain (on part 0 two, a raised way's ring-end foot moved between them, §3.2 (9)), an
L1 batch replacing the `border` chain — each raster growing by whole cells as §3.2 (9) states, every stored height unchanged
and the flow fields recomputed over the grown grid. The pipeline then continues on that region and the ring: S4 continues
every through-road from its old end to the new margin, S12a sites the hinterland on the ring; the stages that own the
cleared faces re-derive them (the hinterland unit for the hinterland's, a district's S8–S12b for a district's; on each
underground part §3.2 (9) grows, that part's stages for its cleared faces — part 0's network stage its bands by
`corridorUnion` (II.7.2) and II.7.3's stage its plots, each other system's stage (catacomb, cavern, quarry, vaults, ruin)
its own part's bands (II.7.6) and II.7.5's stage the undercity's plots there; on the `buried` and `dug` parts, which no stage
re-derives at an epoch — a buried town, laid from a history scar or the replay at generation or made by a `raiseGrade`, and
the passages access edits and undercity lifeline closures dig — their cleared bands re-laid from their kept gallery chains by
`corridorUnion` (§3.7), which draws nothing; on each raised part of the ground layer §3.2 (9) grows, its raised way's
re-derivation (§3.4) for that part's cleared faces, which also extends a deck ending on the old ring to the new ring and
re-places both ends of that foot (§2.7 `RaisedFoot`)); every face outside the region, off a deleted stretch and off the ring keeps its
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
| EP-15 | history-first generation | no peak, a founding after the present, a peak below the present or above the cap; a replay starting 300 years before a week-0 present (a valid season at every epoch) | §4.11 *History-first generation* (7); *The clock* (3)'s floored week | report |
| EP-16 | the stop test and the ring spacing | the folded bell at its end (g = 1; f = 1) | §4.6 step 1; II.2 | — (defined) |
| EP-17 | S12c | pseudo-districts, undercity and underground neighbourhoods, unit runs | §4.5's item-72 paragraph (*Which districts*) | — (defined) |
| EP-18 | §10.2 – §10.4 | an empty or contradictory table row; a pack with no names; every rung; save, undo, migrate | §10.2 *Rows at their limits*, §10.3, §10.4 | the compiler's clamp → report |
| EP-19 | II.7.1 – II.7.6 | each edge the underground sections state (no network, one tunnel, the caps, every rung, the toggles and presets, the lifecycle) | II.7.1 – II.7.6 at each rule; II.7.4 *Limits* | F-UNDER, F-VOID |
| EP-20 | S3 (6), S5a, S5d | less reachable land than a stage asks — fixtures: an island town on an island of half the stage-1 land, a fjord site, a METROPOLIS at the cap in a narrow valley | §4.2 S3 (6) (the capped `t`, the frame arc); §4.4 S5a (a stage with no land folded), S5d (no top-up without land) | simpler shape (the capped level set) → leave out and report (`requestedVsBuilt`, F-BUDGET-STAGE) |
| EP-21 | S3 (4), (7), (9); S5a | a barrier closing the arcs a gate falls on, or every arc — fixtures: a river loop with N₁ = 5; a mesa ringed by sheer faces (every route in within its class grade, or `unserved` reported; 0 routes steeper than `path`'s limit); a mesa below the sheer test and a marsh-ringed town (walled on their `cliff`, `steepSlope` or `marsh` arcs with one gate, its route within its class grade or `unserved` reported); an island town filling its island | §4.2 S3 (4)'s closed-arc reduction, (7), (9) (every arc closed: (a) unwalled, (b) walled on its walled closing arcs); §4.4 S5a | retry that piece (the pick re-drawn, ≤ 3) → simpler shape (the next class's grade, F-ROUTE) → leave out and report (F-WALL; `unserved`; `W_WALLED_BY_BARRIERS`); F-CASTLE's re-site |
| EP-22 | S3 (10); S5a's outer moats | a wet moat with no water within reach or on sloping ground — fixtures: a hill town with `moat: 'all'` (a plot within `waterTableM` of a wet moat on the slope reads the moat's derived level (§4.2 S3 (10)) + `freeboardCm` as its water table, never its bank top — its cellar or crypt taking the full rung where that level allows (§2.6)), an arid town with no river with `moat: 'inner'` | §4.2 S3 (10) *Where a moat holds water*; §4.4 *Outer moats*; §2.6's water table | simpler shape (the dry `ditch`), reported (`W_MOAT_DRY`) |
| EP-23 | S3 (5), S4, S5b, S5c | the steepest ground — fixture: a mountainous site, arterials within their class grade or `unserved` | §4.3 *Lattice and costs* (the class grade limit); §5.2 F-ROUTE | simpler shape (the next class's grade) → leave out and report (`unserved`) |
| EP-24 | S8's cliff band; S10, S11 levelling | a cliff across a district (0 lanes, seeds or ground way spines crossing the cliff line; the two sides' plots backing onto it at the `cliff` setback); two plots at a cliff's top and foot; a step of 2.5 × `stepMaxCm` (`levelledGroundCm` on each terrace equals its datum; every wall's `stepProfile` lies in (`stepMinCm`, `stepMaxCm`]); a levelled unit beside unlevelled ground | §4.6 (a cliff inside the district a hole); §4.7 *Levelling and retaining walls* (step regions) | simpler shape (terraces, else skirts and stepped wings) → report |
| EP-25 | S1 (6), S3 (2) | a harbour on a site with a river but no coast — fixtures: a river-only site with `harbour: 'on'`, and with `deep_harbour` | §4.2 S1 (6) (the river or lake harbour) | substitute (a river or lake harbour) → leave out and report (tier 6) |
| EP-26 | S10b's `dossier` request | no seat on the current map for a dossier element — fixtures: a 1 500-person TOWN dossier listing more dossier institutions than its plots (every one placed, the report naming each edge plot); and, run with V07 registered (V07's village rows), a THORP dossier with 40 custom institutions absorbed at once, every one placed, the report naming each edge plot | §4.7 S10b *Reconcile and infeasibility* (the last rung) | substitute (a new outside plot), reported `W_DOSSIER_EDGE` |
| EP-27 | §10.2's crisis looks (a look only) | no outskirts land left in the frame and margin; an island town; a siege of an unwalled place; a mesa whose every arc is a closure feature; a mesa no way leaves (S3 (9) (a)'s unserved mesa) with a refugee camp and a quarantine standing — each on `campLand` measured from the reference point, else on the ring marks, never undefined; an unwalled TOWN with an `inside` castle (the blockade on its approach roads), a walled CITY with an `outside` castle, a twin town with two rings and a walled town with extramural ribbons inside the standoff — no look on a building footprint; THORP to the METROPOLIS cap, a siege at THORP and HAMLET drawing no siege line, a positive share of a place with few units taking at least one; two and three crises at once; a force larger than the frame and margin; a headcount of 0 or none given; a refugee camp of two heads (fewer than one household); an unmapped stressor type or archetype; a condition whose `untilWeek` is not after its `sinceWeek`; no condition and no preview — at each, the document and its hash unchanged by the look, and nothing on water, a gate's passage, a label's keep-out or a building footprint (the parts drawn on a building itself excepted), a carriageway holding only a barrier across it (§10.2 (d)) | §10.2 *Crisis looks* (b)–(h) | simpler shape (what does not fit drawn as §8.8's massed marks; the severity-and-tier scale where no headcount is given) → report (`unmapped_word`) |

**Where features meet (the combination suite, §13.2, B-EDGE).** Each cell is the outcome where the row's feature meets the
column's, then its rung on §5's ladder (— (defined) for a rule with no failure); a raised way is generated
only at CITY and METROPOLIS and declared at any rung (§4.3); a retaining wall and the frame stand at every rung; a deck plot
at VILLAGE and above (V07's village rows at village rungs).

| feature | a raised way (§4.3) | a retaining wall (§4.7 *Levelling*) | a deck plot (§4.7 *Deck plots*) | the frame (§3.2 (9)) |
|---|---|---|---|---|
| cliff or steep slope | a drop the viaduct reason reads; no support taller than `maxPierM` (a generated course drops, `raised_too_tall`; a declared one bends, §2.7's support step); an end's ramp or stair keeps its class grade (§4.6). *Rung:* leave out and report (generated); simpler shape (declared, bent) | none on a cliff bank, a `cliff` or `sheer` closure arc or a cliff inside a district — the cliff holds the ground, plots backing onto it at the `cliff` setback from its top and its foot and none cut across it; on a steep slope levelled only up to `stepMaxCm ÷ minTerraceDepthM`, steeper not levelled (reported). *Rung:* simpler shape (skirts and stepped wings) → report | no deck host on a cliff bank: no pier, mole or breakwater is rooted on one (§4.8); a quay platform on a steep bank is ground, levelled as any plot. *Rung:* — (defined) | clipped at the arena's outer ring by S1; nothing drawn beyond it. *Rung:* — (defined) |
| river, coast, moat | spans between supports on the banks, no support in water (§2.7's support step), within `viaduct.maxSpanM` and §2.7's clear-span bound (`raisedWays.structure.maxClearSpanM` by material) — a crossing wider than it drops a generated course (`raised_too_long`) and bends a declared one; never out over the sea (its ends are ground vertices); a moat spanned outside its wall strip, and one laid after the course stopped at the under-deck strip where it cannot pass under the deck, the course kept (§2.7's support step (6); `W_RAISED_CROSSING`). *Rung:* leave out and report (generated); simpler shape (declared, bent) | none on a `water` run; the bank holds the ground. *Rung:* — (defined) | a bridge, pier, mole or quay deck by the `deck` offer; none on a ford, a drawbridge or a gate's moat deck. *Rung:* — (defined) | a water body reaching the ring shares its edge (§4.1's S1 row); no crossing site whose deck end lies beyond it. *Rung:* — (defined) |
| harbour | the basin and its mouth excluded; a stroke across bends to its last ground vertex. *Rung:* simpler shape (the bent stroke) | quays, moles and piers are harbour works, never retaining walls. *Rung:* — (defined) | moles and quays by offer; a walled port's mole head holds the chain tower (§4.8). *Rung:* — (defined) | as water. *Rung:* — (defined) |
| wall | crosses a town enceinte only on a gate's line or as the aqueduct's arch; no support in a wall strip but the crossing's station on the band (§2.7's support step (3), (6)); a village palisade abuts its supports, the deck passing over with no gate (V07 §3.5a (4)). *Rung:* — (defined) | none on a `wall` run or in a wall strip. *Rung:* — (defined) | none on a wall strip. *Rung:* — (defined) | the trace stays inside the frame (S3's lattice; a frame arc inset by the outer wall strip, §4.2 S3 (6)). *Rung:* — (defined) |
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
  names: NamePack; provenance: Provenance }   // GovernmentRow, ReligionRow, HouseholdRow, InstitutionRow, ProfessionRow, HeightsRow, CompatibilityRow, ClimateRow (with its ClimateSeasonCells, item 117, and WeatherSpells, item 124) and ClimateSettings, EraRow, GrammarDef, TemplateDef, item 110's row types and the tables named above are declared as V11 §2.8 (and V11 §2.4, V11 §2.5) gives them, and DecorationRow, StagingKeywordRow, StagingPlace, FestivalKind, MotifRow, GenericFestivalRow and QualitySpendRow (items 118, 119) as V11 §2.8d gives them; GrandeurCeilingRow and GrandeurCeilingSettings (item 115) and the crisis look shapes (item 122) are declared below; RosterSettings is the settings field's own shape, below (its cells V11 §3.5.1); RosterTableId is the union of these field names; the siting tables (`siting.profiles`, `siting.families` of `RelationFamilyRow`, `siting.pairs` of `SignaturePairRow`, `siting.web`, `siting.custom`) and the dossier tables (`dossier.archetypes`, `dossier.categorySynonyms`, `dossier.keywords`, `dossier.ladders` of `LadderStepRow`, `dossier.status`) are registry tables of their own (V11 §3.1), read beside these
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
  lookLevel?: [number, number] /* the disaster row only: item 123's decay level its districts' buildings draw at severity 0 and 1, linear between */;
  label: string; icon?: string /* the display cells (V11 §2.3, V11 §3.1's *Display cells*): the words V09's Show crises list, Find's list of looks and §8.2's legend give the look; read by no stage */ }
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
  §8.2's season rows, §11's exports and §7.7's DR42, never by a stage, so no season changes the model or
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
  reads `none`. Until V01's W10 (M5) the `disaster` look draws no district (its legend line and Find's listing stand) and
  `affectedQuarter` is the district with the most households per hectare; until V06's E2 (M6-E) `approachByGate` ranks
  the main approach road's `campLand` faces by nearness to its gate (V06 §3.22 (2) (d)'s no-frontier answer);
  until V06's E2 (M6-E) a building leaves the `disaster` look by the yield read directly over the base's records
  (`Building.works`, §2.6; the lifecycle's weeks once a record retires, §4.11 *Works* (9)) — V06 §3.22 (3)'s rule: a
  Works other than a `decay` Works begun on it by the view's week and not finished before the overlay's `sinceWeek`,
  never for a preview — so §8.2's `ruinTone`, the buildings' damage and V09's rows read one answer from the look's
  first milestone; at the
  village rungs before V07's step the village draws no disaster unit — a part whose subject is not yet built draws
  nothing (§16).
  (a) **A look only.** The table is read by §7.7's DR44, §8.2's crisis look rows, §11's picture exports (a battle map's
  image only, never its walls or obstacles), V09's Find listing and the placement services below — never by a stage — so
  no crisis moves, adds or removes a building, way, wall, plot or water edge or changes the model, a digest or the hash,
  and a look stores nothing. What stands in a view is DR44's: each `ConditionOverlay` whose weeks hold the view's week (§2.7's
  reader comment) and whose map row gives a look, admitted at the viewer's key (a withheld condition is never drawn, listed,
  counted or named); §2.9's `crises` key switches the looks off or previews one look with no condition, at
  `previewSeverity` and the map's rung. What a crisis leaves reaches the map only through the epoch path (V06's
  hand-over). An edited row (§7.6) redraws the looks and changes nothing else.
  (b) **The closed mapping.** An overlay reads the `map` row of the source word V08 §3.16 (7) (b) gives it (a stressor's
  type, a simulator crisis event, the `calamity` word of a linked condition, else its archetype) and draws the look its
  row names, or nothing for `none` — `regional_migration_pressure` the refugee camp (item 122 (b)'s mass immigration), the
  other regional_* pressures `none`; a stressor's overlay draws no look while a condition's overlay of the same look kind
  stands (V08 §3.16 (7) (b)). A source with no row reads `none`, reported `unmapped_word` (V08), so nothing falls through
  (T122-4).
  (c) **Scale.** A look's extent at the map's rung is its row's `scale` at severity 0 and 1, linear between (severity
  clamped into [0, 1]): camped ground in m² at a camp place (`beyondWalls`, `approachRoads`, `approachByGate`,
  `outside`, `gatesAndKeep`'s camp), else the share of its place's units ((d)) — a share s of a place's n units takes
  round(s × n) clamped to [1, n] where s > 0 and none where s ≤ 0, V01 §3.16 (5)'s count, one rule for every place at
  every rung; the `neighbourhoods` place then draws at least every matched target (max(k, |`matched`|), k that count)
  and, by fire, stops where its order ends, the shortfall reported (V01 §3.16 (5)).
  **By headcount** (item 122 (h)): where the dossier gives a force's or a group's size (V08's fields, in
  development, confirmed by item 125 (d)), its camp is sized by it, never by severity — each army its own camp of
  `areaPerHeadM2` × its heads, a travelling group's (migrants, pilgrims, a caravan) at the same rate, so two armies
  joined make twice the camped ground; where it gives none, the condition's or calamity's own count (`exodus`, arrivals)
  stands for the heads; a size of 0 or less reads as none given; with no count at all the scale by severity and tier
  holds.
  (d) **Placement** is by keyed draws on §8.10's render keys from the seed, the condition's id and the place (DR44; a
  preview keys on its look kind in the condition's stead), never a model stream, so a crisis draws the same in every view
  and export. A look stands only on the ground arena's part 0 and never on water, a gate's passage (its opening and 4 m
  along its way each side, as §8.2's festival rows keep it) or a label's keep-out, and on a way's carriageway only a
  barrier across it — a `barricade` ((f)'s `raiders` barricaded roads and `rebellion` street barricades, §8.2's
  `blockade` barricade), `beast`'s `stakes` where the edge crosses a way, and the quarantine's `cordon` where it crosses
  a way into its quarter; item 122 (b) — never a camp or any other part; no camp, siege line or other part stands on a building
  footprint, save the parts (f) draws on the buildings themselves (the burned farmsteads and farms, a disaster's ruins
  and its districts' tone, the marked doors, the banners, the scaffolding and the shutters), a siege line broken where
  it would cross an extramural plot's building. The outskirts' land is V01's `campLand(doc)` (V01 §3.16): the `commons`
  faces and the fields in their fallow course within `camp.reachM` of the built edge and along the approach roads by the
  gates — every camp place below takes its faces from it and from nothing else. The walls a siege reads, and every place
  below that reads the outermost enceinte, are the place's **town enceintes** — its enceintes of kinds other than
  `bailey` (a castle's curtain only along its shared stretch with the town wall, `Castle.cityWeld`; its keep is
  `gatesAndKeep`'s); **outermost** is the outer envelope of their walled arcs — for rings that are not nested, the
  walled arcs of each ring that no other ring encloses. The **main approach road** is the arterial out of the gate of
  greatest trade weight (§4.3's `TradeFlow`), else the way of greatest trade weight leaving the built edge; where no way
  leaves the built edge there is none, and the places measure from the reference point (below). Each place ranks its
  land or units, ties by the keyed draw; at THORP, HAMLET and VILLAGE the main approach road, the outskirts' land and
  each place below read on the village's records as V07 §5.6 (2) states, `affectedQuarter` a unit of V07 §5.6 (3):
  * `beyondWalls` — the `campLand` faces lying at least `siegeStandoffM` beyond the outermost standing town enceinte's
    outer strip along its walled arcs (the walls above); a closure arc with no wall (V11 §3.16.1) draws none;
  * `approachRoads` — `campLand`'s verges of each arterial leaving the settlement (V01 §3.16's `campLand` (2)), one camp per road, the
    look's camped ground divided equally among them (the remainder to the roads one each, in trade-weight order); with the
    dossier's forces, each army's camp ((c)) whole on one road, the armies in descending size onto the roads in
    trade-weight order, a road taking a second army only when every road holds one; a road whose verges hold no
    `campLand` takes the `campLand` nearest where it leaves; a place no road reaches takes one camp on the `campLand`
    nearest the reference point (below);
  * `approachByGate` — the `campLand` faces along the main approach road by its gate, nearest V06's
    `frontierFor(doc, h)`, `h` the households the sequential roster adds between the present population and that
    population plus the camp's heads (its headcount by (c), else its camped ground ÷ `areaPerHeadM2`), at least 1, so a
    camp smaller than one household is seated where the next household would be:
    where the next growth would seat the camp's people (V06 §3.22 (2)); with no main approach road, nearest `frontierFor`'s answer, else
    nearest the reference point;
  * `outside` — the `campLand` faces furthest from the main approach road (with none, from the reference point), beyond
    the outermost standing town enceinte's outer strip or, unwalled, the built edge;
  * the **reference point** where no way leaves the built edge (S3 (9) (a)'s unserved mesa): the boundary point closest
    to the growth centre (S3's root reservation, §4.2);
  * `affectedQuarter` — the district a calamity's `targets` name (matched as `disasterDistricts` matches them, below),
    else the district with the most households per hectare of its land;
  * `fields` — the hinterland's field and pasture faces with the farms' pens (§4.9);
  * `edge` — the outermost town enceinte's walled arcs (the walls above) or, unwalled, the districts' outer boundary;
  * `outlyingFarms` — the hinterland's farmsteads (the farm classes' outside plots, §4.9), outermost first;
  * `gatesAndKeep` — the main gates and the castle, else the principal plaza, for its banners; its camp on the
    `campLand` faces nearest them;
  * `streets` — the junctions and frontages of the districts' ways, the principal market's first;
  * `neighbourhoods` — whole districts by V01's `disasterDistricts(doc, overlay, key)`: the calamity's `targets` first,
    else its pattern (fire through contiguous blocks downwind from a keyed seed district, flood on the low ground by the
    water, earthquake scattered), the `disaster` row's `scale` the share of districts; at THORP, HAMLET and VILLAGE V07 §5.6 (3)'s
    units (`villageDisasterUnits`: its ends, or an end-less thorp's toft groups). Every building of a returned unit — a
    district's, or one on a returned unit's plots (`villageUnitPlots`) — draws item 123's damage at the row's `lookLevel`
    by severity, or at its own decay level where that is higher (V02, V03, V04; nothing stored), while the look stands
    over it ((f)) — no second, per-building share.
  (e) **Several at once** (item 122 (c)). The camp looks take the outskirts in `priority` order (siege, then quarantine,
  then refugees; ties by condition id), each from what the earlier left, together at most `densityCap` of `campLand`'s
  free land. A camp that cannot take its ground — the cap reached, the frame and its margin full, a force too large for
  that land (item 122 (i)) — fills what is left out to the margin, and the rest is drawn as §8.8's massed camp marks on
  the surrounding ring at the city band, the panel giving the full number (V09).
  (f) **The kinds' own parts** (item 122 (b)). `siege`: camps at the standoff; at VILLAGE and above, a line of trenches
  and earthworks round the walled arcs at it — none at THORP and HAMLET, item 122 (c)'s war band's camp (V07 §5.6 (1));
  burned farmsteads outside; and siege engines facing the weakest stretches first (`breached`, then `patched`, then
  `worn` runs, item 114), then the gates — one per `enginesPerBesiegers` heads (the heads its ground implies, ÷
  `areaPerHeadM2`, where no size is given), capped at one per gate and per curtain run of the walled arcs; a coalition's
  armies each pitch their own camp in their own colours (§8.2), spread round the town at bearings evenly spaced from a
  keyed start, so the larger the coalition the fuller the ring; a `siege` of a place with no standing town enceinte
  draws the `blockade` row. `quarantine`: a fenced camp with huts, a pest-house, fresh grave rows and smoke at its
  place, and inside, at the neighbourhood band, marked doors and a cordon closing the
  `affectedQuarter` — along its boundary on the quarter's side of each bounding way's corridor, across each way that
  enters it. `famine`: its fields
  bare, over item 117's crop stage (§8.2), empty pens and the principal market's stalls shuttered. `disaster`: (d)'s
  `neighbourhoods`; the look **stands over** a building of one of its units until V06 §3.22 (3)'s `crisisLookYields`
  turns true on it — a Works other than a `decay` Works begun on it by the view's week, unless finished before the
  overlay's `sinceWeek` — the building leaving the look in that week; a building no such Works reaches stays under it
  until its condition ends, and a preview never hands over (every building of its units under it), so no week draws both
  on a building. `occupation`: foreign banners on the main gates and the castle (else the
  principal plaza) and a garrison camp on its place's camp land. The rest at their places: `refugeeCamp` tents, carts
  and cooking fires; `beast` torn palisade sections, watch-fires and stake barricades; `raiders` burned farms, smoke,
  abandoned carts and barricaded roads; `rebellion` street barricades; `boom` scaffolding; `bust` shuttered shops.
  (g) **Framing** (item 122 (i)). The placed camps' and the ring arcs' bounds are the camps §2.9's opening view, Fit and
  item 116's zoom-out limit take in with the town while a look stands (§2.9's *The crisis framing*; the limit's stop 0 where nothing fits,
  §8.8).
  (h) **At its limits** (EP-27). No outskirts land left, an island town with no land beyond its shore, or a force larger
  than the frame and its margin: the remainder drawn as (e)'s ring marks; a siege of a place with no standing town
  enceinte (a mesa whose every arc is a closure feature and an unwalled town with a castle among them): the `blockade`
  row by `approachRoads`' rule, no engines; a place no way leaves: every camp measured from the reference point ((d));
  THORP to the METROPOLIS cap: each rung's `scale` cell, and no siege line at THORP and HAMLET; a headcount of 0 or
  none: (c); a camp smaller than one household: by the gate, `approachByGate`'s `h` at least 1
  ((d)); an unmapped source: (b); a condition whose `untilWeek` is not after its `sinceWeek`: never stands; no
  condition and no preview: every tile byte-identical to the base (`item122.crises`).
  (i) **Bars**: §13.2's T122-1 – T122-7 and V12's item-122 (h)–(i) measurements.
* **Rows at their limits (EP-18).** V11's compiler checks every row set before a model reads it (V11 §3.1, T-V11 bars): a
  range whose ends cross, a weight set that sums to 0, a band set missing its middle band, or two rows that contradict (a
  `hard` row no plot of the class's own template can meet) is clamped to the nearest lawful value and named in one line, or
  refused with its reason where no lawful value exists (item 101 R2 for an edit); a band without a row interpolates (§4.5).
  An edited row's lifecycle — saved in the document's override layer, undone, re-read by a regeneration, migrated by its
  table version and orphaned when its base row changes — is §7.6's and §7.4's.
=== END ===

=== RATIONALE-A ===
| J-A81.41 | Chose to read the rung profile at every epoch's population target and, where an upward crossing needs more room, to grow the frame by an S1-derived ring and the kernel's single-level batches over one clear region — an L1 clearing, an L0 batch that replaces the margin chain (on part 0 two where a raised way's foot lies at a deck end on the old ring), an L1 batch that replaces the border chain (§3.2 (9); J-A81.31) — the pipeline re-deriving the cleared region, S4 continuing every through-road to the new margin and every raster growing by whole cells about its old grid, the frame never shrinking, over a rung fixed at creation, because a dossier's town may cross a band as it grows (its tier moves under SettlementForge's simulator) and the kernel seat found no mechanism for a frame that grows after the document exists; keeping every face outside the cleared region, the deleted stretches and the ring as it was makes the growth local, and a declining town keeping its frame loses nothing it had (§4.11, §3.2; item 81 (b); the kernel seat's finding; repair round 1, VKC-08). |
=== END ===

