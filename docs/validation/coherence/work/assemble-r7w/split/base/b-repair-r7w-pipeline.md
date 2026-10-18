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
  | S5, per stage k | k = 1 — S5a L1: S3's trace with its gate vertices · k ≥ 2 — S5b L0, only when F-ROUTE's extra-bridge rung fires on standing water: two same-level shore splits before S5b's L1 batch (§4.2 S1 (5)); S5b L1: the main roads, picked on the stage's boundary (data, no batch); S5a L1: the trace with every arterial crossing on ground part 0, and a carried way's lawful pin, as a gate (§4.4 S5a *Trace* (2)); then an outer moat's carve batches (L1: each arterial's or carried way's crossing made one straight edge between two deck bank vertices, its deck span; L0: the channel, with those vertices as `KernelTx.prepared`; §3.3, §4.11) · every k — S5c L1: growth, then L1: the between-stage prune and trim · S5d: a top-up re-runs S5a's arc and S5c on the rim, each L1 | F-ROUTE (S5b), F-WALL (S5a), F-BUDGET-STAGE (S5d) |
  | S6 | L1: the settlement perimeter chain, then district owners and `district_bound` roles (one batch) · then, on ground parts ≥ 1, the elevated roads' and aqueducts' raised parts (§4.3) | F-ROUTE (a raised part's course, §4.3); a degenerate district face merges into its neighbour (§4.5) |
  | S7, per enceinte | L1: setback and glacis lines (the wall strips), the intervallum, gate-plaza claims, castle paths and inner-ward trace, quays, piers and moles · a raised way it meets met by §2.7's laws (law 1 (1)–(9); its worked example the crossing table's *beneath*; §4.8's lead), a gate plaza cut round its supports, ramps, stairs and feet and no pier, mole or breakwater rooted on them | F-WALL, F-CASTLE |
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
wrapping the year's end — read only by §8.2's season rows, §11's exports and §7.7's DR42, never by a
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
  carve's kept way (§4.11), on an outer moat's arterial or carried way (S5a carves it by the carve path, §4.4), on a kept way of S1's
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
its mine boost and fissure variant. With no `under.systems` cavern row (before the underground layer's rows ship, or
in a pack without that row) the ore clause reads false and the flag rests on the roster and dossier clauses — its one
reader, II.7.6's cavern rule, runs only with that layer, and §7.6's invalidation by slice re-derives S1 when the row
lands. A sky island's terrain takes `ordinary` and no mining, as do the parity presets (no
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
   reaches `T = t_1`** — on the boundary by construction; the gate keeps the pick's identity, ordinal, bearing and route. A route whose first point at `T = t_1` lies on a raised stretch of its solved course (a viaduct (5)'s solve priced, §4.3) — or would put its gate where §2.7's laws admit none: on a ramp or stair, nearer its foot than the first point beyond the foot, or with its gate's footprint in a strip where law 1 (5) bars it, or the band or wall strips there over the ends (law 1 (1), (4), (5)) — is re-solved whole as (5) solves it, every deck edge whose ends straddle the stage-1 boundary, or with an end nearer the boundary than the first point beyond the foot there (§2.7's laws' terms, read with the band and gatehouse rows there), excluded — a search over the routes whose first point at `T = t_1` §2.7's laws admit (law 2 (a)) — (the boundary counting as standing, §4.3 *Where it may not go*; §2.7's laws, law 1 (3); its worked example *down before the wall*); its gate is the re-solved route's first point at `T = t_1`, on ground part 0, which the rest of this step reads as any gate; the harbour gate of (7) is placed likewise, where `L*`, re-solved with every deck edge across the stage-1 boundary excluded, first reaches `T = t_1` (a search over lawful points, §2.7's laws, law 1 (1), law 2 (a)); `T` and the boundary keep (5)'s routes and are not re-derived, and a route the re-solve cannot serve takes F-ROUTE's ladder (§5.2), reported. The raised stretches of (5)'s routes, so re-solved, stand for every later step of S3 as standing raised ways whose courses are dated after the stage-1 trace (§2.7's laws' *Order*: the trace by S3 (6), these stretches by S3 (7)), so that (9)'s pull keeps off their deck lines (law 1 (3)) as off their ends: (8)'s siting filter and (9)'s pull, anchors and water gates read their ramps, stairs, feet, under-deck strips and fixed-place zones (their supports placed at S4's commit by §2.7's support step (6), against the trace's band) as §2.7's laws read a standing raised way's (law 1 (3)–(6), its worked examples *beneath* and the fixed-place sentence; the pull keeping each such route's crossing of the boundary as §4.4 S5a *Trace* (2) keeps an arterial's), and S4 commits them unchanged — their stations and spans read, from S3 (10) on (S3 (10)'s channels, S3 (11)'s harbour route, S4's own routes), as the support step will place them at S4's commit from what stands at S3 (10), the trace's band among it, and S4's commit placing exactly those (§2.7's laws, law 2 *Not yet built*) —; a raised stretch S4 solves on a route of its own is laid after the trace and meets it as one (§2.7's laws, law 1 (3), (6); its worked examples *down before the wall* and the fixed-place sentence). A carried way standing before the stage (a creation prefix's, or one a regeneration keeps) takes a gate of the stage where `T = t_1` crosses its ground course or ends, beyond its foot, beside the N main gates, decked and counted as the harbour gate is, and none where `T = t_1` crosses only its deck, a crossing (9)'s pull keeps; its gate, where law 1 (4) or (5) bars it there, moved along the way within (9)'s search band as S5a's pin is (§4.4 S5a *Trace* (2); §2.7's laws, law 2 (a)), and only where §2.7's laws give it no lawful gate so, the way re-routed through one of the stage's gates (§2.7's laws, law 2 *Carried way*, (a), (b)).
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
   or, when water is within reach, the castle-moat band planned with it by (10)'s rule, and no weld vertex lies where §2.7's laws bar a fixed place — in a standing road deck's zone, or in an aqueduct's strip but where law 1 (5) admits a gate or tower (law 1 (6); its worked example the fixed-place sentence) — (every raised way standing before the stage — a creation prefix's declared ones and, at a regeneration, each one it keeps where it stands (§2.7's laws, law 2 *Newer*) —, the raised stretches of (5)'s routes at S3, S4's and S5b's viaducts at a stage's citadel; and no claim whose curtain, inner ward or outer arc — fixed by the claim — or whose vertex tower §2.7's laws bar: the siting a search over the claims law 1 admits, law 2 (a)): a 5–7-vertex polygon on a jittered
   circle, area band TOWN 1.0–3.0 ha, CITY 1.5–3.5, METROPOLIS 2.0–5.0 (anchored on MFCG's plain-size castles of
   1.3–3.4 ha). A claim's compactness floor is its reservation's `compactnessMin` (§2.5) — the castle's 0.75 (MFCG's
   threshold), checked and repaired here by §4.8's rule before the trace welds to it (F-CASTLE); no other reservation kind
   sets one. `on_enceinte` places the bailey across the boundary so that exactly two of its vertices lie on the boundary —
   the **weld vertices** — and the bailey's **outer arc**, its boundary between the welds on the side outside the
   boundary, becomes the stretch of town wall the castle shares (9). The castle's **town-side gate** is fixed now, at the
   midpoint of the bailey side with the least-cost path to the plaza — for an `on_enceinte` castle, among the sides of its town-side arc; for every castle, among the sides whose gate, with its footprint, lies where §2.7's laws admit a fixed place (law 1 (6)), a claim with none failing the filter above (§2.7's laws, law 1 (6), law 2 (a); its worked example the fixed-place sentence: a castle sited, never reshaped) — so the castle street is a routable destination and a ring castle moat can carry its deck.
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
   beyond the boundary, and along a barrier reach or a stretch F-WALL's raised-way rung re-pulled round a raised way (§5.2; §2.7's laws, law 2 (c)), each of which departs by at most `wall.barrierReachM` (one boundary removes the
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
   trace leaves unwalled, and wet only where water reaches it (below) — with **one deck at every main gate, at a harbour gate (7) and at a carried way's gate (7)** (§2.7's laws, law 2 *Carried way*) on a wet stretch, where the gate's route (for a harbour gate, the route that placed it; for a carried way's gate, the carried way) crosses the channel, perpendicular to it; and the hinterland's **decoration
   ponds** — the pond row of §4.9's decoration table (count by rung and biome), sites scored on hollows, flow accumulation
   and damp ground, each at least `pondClearM` (150 m) beyond the predicted built extent `{T ≤ t_K}` and at least 30 m from
   every (5) route and planned canal. No castle moat crosses the city trace — a ring surrounds a bailey the trace keeps
   off (9), and an outer arc runs beside the trace — so §4.4's rule that the trace crosses water only at a river's water
   gate holds with every castle option; and the hard filter of (8) keeps every solved route off a planned castle moat, so
   no castle moat needs a deck except at a ring moat's castle gate. Every deck has S1 (5)'s form and its two states. A raised way standing when this step carves — a creation prefix's declared one and, at a regeneration, one it keeps where it stands (§2.7's support step (6); §2.7's laws, law 2 *Newer*); at generation and at a regeneration, besides, the raised stretches of (5)'s routes, their stations and spans read as §4.2 S3 (7) reads them (§2.7's laws, law 2 *Not yet built*) — meets the moat and the canals by §2.7's laws (law 1 (1), (8); its worked example the way-and-channel table, row (e)), each channel stopped at its under-deck strip counted in S3's `W_RAISED_CROSSING`. When
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
   crosses a moat only on that gate's deck and adds no road through the wall, so the roads leaving the walled stage stay N, plus a harbour gate of (7) where one was placed and a carried way's gate of (7). The route is data, committed by S4 with the others, outside `T`'s
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
   each stretch's ends anchored on its barrier (the existing anchor kinds) with a tower at each anchor (§4.8), never in a standing raised way's strip nor a road deck's zone (§2.7's laws, law 1 (4), (6); its worked example the fixed-place sentence); it records
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
2. **Pull and pin.** The boundary is pulled to defensible ground within a 40 m search band (local ridges, slope breaks, river banks: a cost-surface path around the town with a penalty for leaving high ground, the impassables §2.7's laws give a trace (law 1 (2)–(4), law 1 (9) and (10); the one list of them, which every pull, cost field and reader of them cites) impassable to it — a standing raised way's ramps, stairs and feet widened by the wall strips' width there, its strip, widened each side by the band's half there, but to cross its deck line once (law 1 (4)), the deck line of every road deck whose stretch there is dated after the stage's boundary pick (S3 (7)'s stretches at stage 1, the stage's own S5b decks), where an aqueduct's channel runs above the wall's top (its crossing there over), its standing supports and the strip of each span whose soffit does not clear the wall's top, each widened so that the band's half at most touches the ring or that strip (*the edge*; law 1 (2): a crossing that fits neither form unlawful), a carried way's ground course beyond each foot where the stage's boundary crossed only its deck (law 2 *Carried way*), every held building's strip and a shape-locked raised way's `vault`-use spans' strips, each widened all round by the wall strips' width there (law 1 (10): no line, band or wall strip across one)), with **the gates pinned**
   where the arterials cross the boundary (stage 1: S3's gates; k ≥ 2: every crossing of an S4, earlier-S5b or this stage's S5b arterial, and a carried way's lawful pin, §2.7's laws, law 2 *Carried way*) — on ground part 0, a raised way met by §2.7's laws (law 1 (1), (3)–(5); its worked example *beneath*): an arterial crossing the boundary on a raised deck pins no gate there, and the pull keeps that crossing beneath its deck — that arterial's ground course beyond each foot of the deck, within the search band, impassable to the pull as the deck's ramps, stairs and feet are — so the pulled trace crosses each arterial as the picked boundary did: on ground part 0 at its pin, or under its deck (§2.7's laws, law 1 (1), (3); its worked example *beneath*), and the stage's gates are its pins (`N_k`, §4.4 S5b); one whose crossing falls on a ramp, stair or foot, or nearer its foot than the first point beyond the foot, pins its gate on its ground course at the first point beyond the foot (§2.7's laws' terms); and a pin whose gate's footprint, read from the gatehouse row it will be built by, meets a raised way's under-deck strip where §2.7's laws bar a gate (law 1 (5): any but under an aqueduct's arch that clears it), or whose band or wall strips there would lie over a raised way's ends (law 1 (4)), moves along its arterial until both are clear, within the pull's search band, else — a carried way's pin first re-routed as §2.7's laws, law 2 *Carried way*, says — that crossing takes F-WALL's raised-way rung (§2.7's laws, law 1 (5); law 2 *Not yet built*, (a), (c)) — and an `on_enceinte` castle **welded through its two weld vertices** (the shared edge is one wall; MFP-3).
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
*Water and the waterfront (COV-MFCG-C07; J-P25).* The trace never crosses water except at a **water gate** where a river passes — never in a standing road deck's zone, nor in an aqueduct's strip but where law 1 (5) admits a gate there (§2.7's laws, law 1 (5), (6); its worked example the fixed-place sentence): its two vertices on the river's banks carry `('gate_end', gate, 0 | 1)` and the `Gate` names them in `banks`
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
through §4.11's carve path. Its way rule meets only arterials and a carried way standing before the stage here — each
just outside one of the stage's gates, the stage's secondaries not yet grown — so every way is kept with a deck and
nothing is cut, a carried way decked at its gate as at stage 1 (§4.2 S3 (10); §2.7's laws, law 2 *Carried way*): the L1
batch places each deck's two pinned bank vertices on its arterial or carried way where a wet stretch's banks will cross
it — the `deck_end` rows of a fresh `Bridge`, `built` with that arterial or carried way as its way (§2.7) — the span
between them carrying `deck` (the arterial is re-routed
between the gate and its next pinned node beyond the channel where it would meet the channel more than 10° off its
normal, as §4.3 re-solves S3's moat stretches); the L0 batch inserts the channel (the era row's width, outside the outer
half-band and a berm, along the walled arcs only, and only on the stretches §4.2 S3 (10)'s rule makes wet — every other
stretch a dry `ditch` (§4.7 S10 (0)) whose arterials take no deck) through those prepared vertices, so each span becomes its deck,
perpendicular to the channel and continuing its gate's passage across. S7 builds the bridge furniture (§4.8) and S5c
treats the moat as water. The carve clears no raised-way support: a raised way standing before the trace is kept (§2.7's support step (6)), the trace meeting it by §2.7's laws (law 1 (2)–(9); its worked example *beneath*, its crossings S7's to count, §4.8) and the channel by the way-and-channel table (§2.7's laws, law 1 (1), (8); its worked example row (e)), a channel stopped there counted in S5a's `W_RAISED_CROSSING`; a raised arterial passing over the trace takes no gate and no part-0 deck (§2.7's laws, law 1 (1)), and a part-0 way beneath it takes its own ground gate where those laws admit one (law 1 (5)) by §4.2 S3 (4)'s gate law (§4.8 *Gates*).
Nothing finer than L1 exists yet, so the carve's footprint clears nothing else. The innermost
enceinte's moat is S3's (§4.2 S3 (10)).

**S5b Main-road step (FTG-4; stages k ≥ 2 and every epoch stage).** The stage's primaries match its gates: `N_k` = the
gate law of §4.2 S3 (4) on the land inside the stage's enceinte, with its closed-arc reduction and its waterfront reduction where the stage's boundary
runs along a sea or lake shore for at least `gate.waterfrontShare` of its length (walled; J-A46.42), or one primary per
`mainRoadSpacingM` of boundary (unwalled; 450 m at CITY). The existing arterials all continue to the frame, so they cross
the new boundary `c` times on ground part 0 (a crossing on a raised deck no gate, and one on a ramp, stair or foot, pinned beyond the foot, one of them where that pin is lawful — S5a *Trace* (2); §2.7's laws, law 1 (4), law 2 *Not yet built*; its worked example the way-and-channel table's row (d); a carried way standing before the stage one of them where §2.7's laws, law 2 *Carried way*, give it a lawful pin); when `N_k > c`, S5b spawns `N_k − c` radial destinations on the boundary's approachable arcs by nested picks
(largest angular gaps first, terrain-scored like gates) and routes each with the incremental S4 router (§4.3) from the
nearest junction on an existing primary *outside* the previous enceinte (never through an inner wall) to the frame at its
bearing; when `N_k ≤ c` it spawns none and the crossings are the stage's gates. It routes under S4's F-ROUTE ladder
(§5.2), extra-bridge rung included (where that rung fires on standing water, S5b's L0 batch of two same-level shore
splits precedes its L1 batch; §4.1, §4.2 S1 (5)), and may raise a viaduct by §4.3's rules, its course coming down before the stage's picked boundary (§4.3 *Where it may not go*), so each spawned primary crosses the boundary on ground part 0 and is a main gate (§2.7's way-and-channel table, row d). The crossings become stage k's
main gates; posterns only for an explicitly requested remainder. An outer enceinte never gets fewer gates than arterials
cross it on ground part 0; a request below that is raised and reported (a requested gate count applies to the innermost enceinte, MFCG's
semantics). **Test:** primary length per km² and the share of gates on primaries in band from TOWN to METROPOLIS; each epoch stage whose `N_k` exceeds its crossings adds ≥ 1 primary; a stage whose spawned primary's best course is raised across its boundary still has `N_k` gates, each on ground part 0.

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
  §4.3 *Lattice and costs* states: a proposal meeting what that rule makes impassable, or meeting its under-deck strip anywhere else than where that rule admits a crossing, is deflected along the strip to the nearest crossing it admits, or ends at the strip as at a reservation (§2.7's way-and-channel table, row a). A wall is never crossed except at a gate: a
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
to cover the shortfall, S5a re-traces only the affected arc between its pinned gates, keeping each arterial's and each carried way's crossing as the stage's picked boundary had it (S5a *Trace* (2): under a deck where it crossed on one; §2.7's laws, law 2 *Carried way*, law 4), the land beyond a deck's foot the re-traced arc cannot then take moved to the next stage's quota as a moated arc's is, reported, and S5c grows the added rim —
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
  cistern terminal takes a terminal cistern under its conduit house's yard; and each span a raised way's record marks `vault` — but one read `open` (§2.7's laws, law 1 (8); its worked example the crossing table's *beneath*) and one whose inset rectangle V04 §3.5.4 (d) (1) finds too small, reported — holds one arch vault at grade (`archVault`), following its raised way at every rung — the TOWN gate binds the other vault
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


