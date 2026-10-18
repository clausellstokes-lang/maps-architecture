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
  | S5, per stage k | k = 1 — S5a L1: S3's trace with its gate vertices · k ≥ 2 — S5b L0, only when F-ROUTE's extra-bridge rung fires on standing water: two same-level shore splits before S5b's L1 batch (§4.2 S1 (5)); S5b L1: the main roads, picked on the stage's boundary (data, no batch); S5a L1: the trace with every arterial crossing on ground part 0 as a gate (§4.4 S5a *Trace* (2)); then an outer moat's carve batches (L1: each arterial's crossing made one straight edge between two deck bank vertices, its deck span; L0: the channel, with those vertices as `KernelTx.prepared`; §3.3, §4.11) · every k — S5c L1: growth, then L1: the between-stage prune and trim · S5d: a top-up re-runs S5a's arc and S5c on the rim, each L1 | F-ROUTE (S5b), F-WALL (S5a), F-BUDGET-STAGE (S5d) |
  | S6 | L1: the settlement perimeter chain, then district owners and `district_bound` roles (one batch) · then, on ground parts ≥ 1, the elevated roads' and aqueducts' raised parts (§4.3) | F-ROUTE (a raised part's course, §4.3); a degenerate district face merges into its neighbour (§4.5) |
  | S7, per enceinte | L1: setback and glacis lines (the wall strips), the intervallum, gate-plaza claims, castle paths and inner-ward trace, quays, piers and moles · a raised way it meets met by §2.7's crossing table (*beneath*; §4.8's lead), a gate plaza cut round its supports, ramps, stairs and feet and no pier, mole or breakwater rooted on them | F-WALL, F-CASTLE |
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
no relaxation reaches takes F-ROUTE's last rung (`unserved`, reported). A raised way is held from the commit that creates it
(§2.7's support step (6)): its standing support rings (`state` absent or `ruined`; a `cleared` one's ground open), ramps, stairs and feet (`RaisedWayRecord.feet`), and once the span rule has run (its one eager run, after §4.6's cut) the under-deck strips of its `vault` spans but one under a wall, read `open` (§2.7's crossing table, *beneath*), are impassable to every route
and growth proposal on ground part 0 laid after it, at generation as after it; the rest of its under-deck strip (§4.6)
is crossed only under a span — an `open` one once the span rule has run — whose clear width between the standing supports' rings is at least the way's width + `raisedWays.structure.clearWidthM` and whose soffit meets §2.7's *The clearance*
for the crossed way, within ± `raisedWays.structure.squareDeg` of square to the deck (V11 §3.24.2), never along the
strip. A route's crossing shifts along the strip to the nearest crossing these admit, else the route takes another
course by F-ROUTE's ladder (§5.2). S5c's proposals (§4.4), stage 2's ways (V01 §3.17.3 (3)), V07's village trackers
(V07 §3.5a (3)) and S7's quays, intervallum and castle paths keep the same crossing rule, each with its own ladder (§2.7's way-and-channel table, row a). At
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
  reading S6's typed wards and pass-1 prosperity. Its stations and spans are placed at that commit and held
  from then (§2.7's support step (6)), so S7b's capacity (§4.5), which subtracts each
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
  its last ground vertex before the basin, named in one line), meets a wall by §2.7's crossing table — an aqueduct crossing a standing wall's band on a span, its ramps, stairs and feet off the band and its under-deck strip clear of the trace's gates and towers (*over the band*); a road deck, a viaduct's or an elevated road's, never crossing a trace standing when its course is laid (at S5b the stage's picked boundary counting as standing; a frame growth's extension, which keeps the deck's course, excepted: §2.7's support step (7)): a deck priced in a route's solve comes down to a ground vertex before the trace, its route crossing it on ground part 0 through the gate there, else re-routed by the solver's ladder or not built, reported, and a raised way whose two ends are fixed before its course is solved — an elevated road, a founded viaduct — is not built across a standing trace, reported, at an epoch waiting (V06 §3.19 (5)) (*down before the wall*; by hand §7.1, file f item 363) — and crosses a moat or a canal standing when it is laid only on a span, no support in its water (a channel laid after it by §2.7's way-and-channel table), and stands no support on a square, a reservation or an oasis's water; a river or canal it may
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
2. **Pull and pin.** The boundary is pulled to defensible ground within a 40 m search band (local ridges, slope breaks, river banks: a cost-surface path around the town with a penalty for leaving high ground, a standing raised way's ramps, stairs and feet and an aqueduct's standing supports impassable to it: §2.7's crossing table, *beneath*), with **the gates pinned**
   where the arterials cross the boundary (stage 1: S3's gates; k ≥ 2: every crossing of an S4, earlier-S5b or this stage's
   S5b arterial) — on ground part 0, a raised way met by §2.7's crossing table (*beneath*): an arterial crossing the boundary on a raised deck pins no gate there, one whose crossing falls on a ramp, stair or foot pins its gate on its ground course beyond the foot, and a pin inside a raised way's under-deck strip moves along its arterial clear of it — and an `on_enceinte` castle **welded through its two weld vertices** (the shared edge is one wall; MFP-3).
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
treats the moat as water. The carve clears no raised-way support: a raised way standing before the trace is held, the trace meeting it by §2.7's crossing table (*beneath*) and the channel by its way-and-channel table (row e), reported (`W_RAISED_CROSSING`); a raised arterial passing over the trace takes no gate and no part-0 deck, and a part-0 way beneath it takes its own ground gate clear of the under-deck strip by §4.2 S3 (4)'s gate law (§4.8 *Gates*).
Nothing finer than L1 exists yet, so the carve's footprint clears nothing else. The innermost
enceinte's moat is S3's (§4.2 S3 (10)).

**S5b Main-road step (FTG-4; stages k ≥ 2 and every epoch stage).** The stage's primaries match its gates: `N_k` = the
gate law of §4.2 S3 (4) on the land inside the stage's enceinte, with its closed-arc reduction and its waterfront reduction where the stage's boundary
runs along a sea or lake shore for at least `gate.waterfrontShare` of its length (walled; J-A46.42), or one primary per
`mainRoadSpacingM` of boundary (unwalled; 450 m at CITY). The existing arterials all continue to the frame, so they cross
the new boundary `c` times on ground part 0 (a crossing on a raised deck no gate, S5a *Trace* (2)); when `N_k > c`, S5b spawns `N_k − c` radial destinations on the boundary's approachable arcs by nested picks
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
  foot, the far side of a steep hill), walls (a run beneath a raised way's standing deck capped at the soffit there, §2.7's crossing table), gatehouses, the castle and great towers, raised ways and retaining walls
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

=== REPLACE ### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture ===
### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture

**The trace is S3's and S5a's** (§4.2 S3 (6)–(9), §4.4), always fixed before that stage's secondaries grow. S7 builds
everything that stands on the traced wall, once per enceinte, after S6 has typed the districts, in **one L1 batch** per
enceinte; its geometry at L3 and L4 is built inside the wall strips by S10 and S11 after S9. A raised way S7 meets is met by §2.7's crossing table: the strips, band, towers and gates beside a trace laid after it, and the towers S7 lays beside a trace an aqueduct at S6's end crossed (*over the band*), as *beneath* states — the strips and band as anywhere, no tower or gate in its under-deck strip (one the spacing or the gate law would place there moved clear of it), each crossing of a trace laid after it with its deck line reported (`W_RAISED_CROSSING`) —, a gate plaza cut round its supports, ramps, stairs and feet, a quay, the intervallum or a castle path crossing its under-deck strip by §2.7's way-and-channel table (an intervallum ending at the strip leaving the inner strip bounded across it by its inner setback line), and no pier, mole or breakwater rooted on its supports, ramps, stairs or feet, a root moved along the shore to the nearest clear one.

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
(V11 §3.25.3), a `patched` run's material from `walls.patchMaterials` by the enceinte's kind and culture — along an
`on_enceinte` castle's shared stretch (`Castle.cityWeld`) one draw, on the town enceinte, sets the stretch's condition and
material and the bailey's profiles there mirror them in the same batch (§2.7 *An enceinte's condition by run*: the
castle's welded stretch); with the
replay, the replay writes them (§4.11 *History-first generation*). With the row absent, its switch `atGeneration` false,
or its inputs neutral, every run stays `standing` in its robust material (the no-op pin).

**Gates — exactly N, by construction (MFP-4).** Main gates are where S4's and S5b's arterials cross the trace on ground part 0 — a deck passing over a trace is no crossing (§2.7's crossing table): N₁ gate sites
were picked in S3 and the arterials routed through them, and each outer enceinte's gates are its S5b primaries' crossings on ground part 0 (§4.4 S5b), so roads leaving each walled stage, so counted, = its gate count and no arterial ends blind against a wall. Water gates sit
where a river passes (its two bank vertices named by `Gate.banks`, §2.7), at every quay access under a `quay_wall` or
`sea_wall` waterfront (§4.4), and at a harbour gate (§4.2 S3 (7)); the castle has one town-side gate; posterns are a
separate, road-less count added only on request; `N = 0` is honoured in S3. **Gate plazas (G-R1):** a small plaza is
claimed in S7's L1 batch at each main gate inside the wall, taking the inner strip's setback zone around the arterial
(MFCG B14); **forecourt squares** at churches and temples are typed open spaces sized by the institution's class — a church
or temple on a later reservation without one takes its forecourt from S9b's dispatch, and one below a block a `forecourt`
yard part of S11 (V01 §3.5.3). Gate passages stay open by construction: a wall strip ends at the corridor of the way
through each gate, so the band and gatehouse parts S10 builds never meet that corridor, and the intervallum's corridor is
the strip's inner edge. A raised way and a trace meet by §2.7's crossing table: no station, gate or opening on a deck. The F-WALL ladder's last
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

=== REPLACE ### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19) ===
### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19)

**S12a Hinterland siting (eager, no geometry; after S7b, before S8; O14-core; FTG-7).** S12a makes the hinterland's
content decisions once for the town and writes no plat edge: the field-system preset and its parameters, the land-use ring
radii, the outside sites and seeds of the count-driven outside plots below, the decoration sites (ponds excepted: carved at
S3, §4.2 S3 (10), or at village rungs by VS1 with the leat, V07 §3.2 (8); a pond sited after the L0 batch is an uncarved
`pond` part drawn in the water tone), an oasis's irrigated gardens, and the crop rotation, all recorded in the hinterland's
`Allocation` and its derivation record. The geometry is the **hinterland unit**'s (§4.1), at L3 inside the hinterland's L2
blocks — the faces outside the settlement perimeter S6 inserted (§4.5), with the corridors S9 committed for them and the
headland S10's step (0) laid along the perimeter, on whose inner edge the unit's lines end. **The order is FTG's — decided
with the town, drawn after it (item 26; J-A26.41):** the countryside's content is S2's demand, sited here after the town's
districts are typed and its claims cut; its geometry is drawn after the town's L1 and L2 fabric is complete, into the land
the perimeter leaves, concurrently with the districts' pooled stages — which changes no output, the unit's faces and every
district's being disjoint (§4.1) — so the town never reads the countryside and the countryside reads the whole town. A
hinterland re-derivation (§7.3's S12 row) first re-runs step (0) for its headland parts, restricted to its faces, then the
unit's S10. **No land left:** where the perimeter meets the frame on every side (or an island town's land is all built),
the hinterland has no faces: S12a sites nothing, the outside classes go to F-SITING's ladder (reported), the farm
households are housed as under `perimeter`, and the arable, fuel and timber demand is the settlement's import (reported).
The unit's S10 partitions those blocks under the **farm mode** (below) by the field-system preset: **open-field strips**
(long narrow faces perpendicular to lanes), **enclosed fields** (FTG-style, the hedgerows a `green_line` role on their L3
boundaries), or the **sector look** as a style preset in either of its two recorded constructions — VG 1.6.9's (Voronoi
cells seeded along the main road, on the shores and on a ring, clipped to the land and to either side of that road and
bisected at right angles; provenance `ref:VG 1.6.9 field sectors claimed outward (code)`, P17) or MFCG 12710731's variant (a
lobed farm belt split recursively into 0.6–1.3 ha fields by square or skewed cuts with 8 m paths, a farmstead on one field
in five; provenance `ref:MFCG 12710731 farm-cell recursive split (code)`, P18); at village rungs the three registered
presets `great_fields` (the open field as 2–3 great fields, each carrying one rotation slot for all its furlongs, the furrow
axis downslope above 2 %, headlands at the furlong ends), `infield_outfield` (the infield's `rotation.scheme 'continuous'`,
the outfield's five-year cycle cropped in slot 0) and `forest_strip` (each toft's own strip to the wood edge), constructed as
V07 §3.9 (3) states. The preset works inside the mode's extent, and its cells become fields in **outward order** — the
cells nearest the settlement's edge first, ties by cell id: VG 1.6.9's greedy claim outward from its houses, re-derived for
a town whose built extent is not a point — under the mode's extent rule: under `demand` the claim stops when the arable
demand is met, under `fill` it runs over all the land the mode gives the fields (J-A57.41). The MFCG variant's split runs in
the model down to the furlong-sized field faces below and continues at render time to its 0.6–1.3 ha fields and 8 m paths,
drawn from each furlong's `render.instances` stream, as the strips are render-time segmentation (J-I6; J-A57.42); its
farmsteads are the farm table's count, as under every preset (J-A57.43); land-use rings (gardens / closes / orchards →
fields → meadow / pasture / commons → coppice → wild wood); managed woodland and coppice sized by the wood rows below and
wild wood beyond, as L3 wood faces, with forest edges by domain-warped density noise (a render-time property); every land
component gets uses (both banks, islands); the arterials continue to the frame at their bearings (S4). Fields keep the shore
setback of §4.2 S1 (8). *Model and render split (SCL-3):* the model's field faces are FTG-sized furlongs (≈ 2.5 ha; ≈ 1 600
in CITY's 39 km² margin), each carrying its crop, livestock and rotation slot — their ≈ 12 ms at CITY runs in the
hinterland unit, hidden behind the pool (§12.4); the open-field **strips** inside a furlong are render-time segmentation
(their count and width a style and era parameter), so the strip look costs no model faces.
* **One farm table (FTG-7; item 26).** `FarmTable { arableHaPerCapita (era, with provenance), householdsPerFarmstead,
  fieldHaPerFarmstead, fuelM3PerCapitaYear, timberM3PerCapitaYear, coppiceM3PerHaYear, woodM3PerHaYear,
  meadowHaPerCapita?, pastureHaPerCapita? /* ha per head of meadow, and of pasture and commons: the village rows' cells
  (V07 §3.9 (1)), read at the village rungs by V07 §3.2 (1)'s land law and V07 §3.9 (1)'s land budget (E-38's derived
  2.275 ha per head is the sum of the village rows' five land cells); absent on the base rungs' rows, where the land-use
  rings lay meadow, pasture and commons on the land the fields leave, as below */, extent: 'fill'|'demand', reserveArable:
  boolean }` is the only source of the countryside's numbers: S2 demands `farmsteads =
  round(arableHaPerCapita · P / fieldHaPerFarmstead)` farm plots and `householdsPerFarmstead` × `farmsteads` farm households
  — under the `perimeter` and `rivers` modes (below) the same households, housed in the settlement, and no farmstead plot —
  and the hinterland unit's S10 gives each farmstead, or each such household group, its fields at the sites S12a chose, so
  farmland per capita and the farm classes' field area agree by construction (MFCG's "not enough farms" removed). **The
  staged port rows (item 88; J-A88.42).** When the dossier port fills §10.2's staged hinterland row (`PortRows.hinterland`;
  empty in the base): the arable demand `arableHaPerCapita · P` — and with it the farmsteads and their fields — is
  multiplied by `max(0, 1 − importPct × farmlandScale)`, `importPct` the dossier's share of its food imported, in [0, 1]:
  food brought in needs no field of its own, and it is served through the gates' and the harbour's `import` rows (§4.7
  S10b); and `foodChain` — the dossier's food chains present (`PortValues.foodChain`, V08 §2.5) — sets to 0 the share of
  every land use whose chain the dossier marks absent (no `Pastoral & livestock` → no pasture), the freed land taking the
  next ring's use. While the row is empty the factor is 1 and every chain counts as present. **Fuel and timber (item 26).**
  The same table turns the population into the wood it burns and builds with — `coppiceHa = fuelM3PerCapitaYear · P /
  coppiceM3PerHaYear` and `managedWoodHa = timberM3PerCapitaYear · P / woodM3PerHaYear` (era rows; defaults 1.0 and 0.15 m³
  per head and year against yields of 4 and 2 m³ per hectare and year; provenance `own`, calibratable) — which S2 demands
  with the farmsteads, and which the outside classes' `produces` (grain, fuel, timber …) and supply edges carry into S2's
  need propagation (§10.2; the lumber yards and charcoal burners are the providers). The unit lays coppice in ring 4 and
  managed woodland beyond it, up to the land the frame's wood propensity offers; what the frame cannot hold is the
  settlement's **import**, reported and served through the gates' and the harbour's `import` rows (§4.7 S10b), never a
  failure (J-A26.42). **Extent (our extension, `extent`; default `fill`, the references').** `fill`: the demand fixes the
  counts and the woods follow the landscape — the countryside fills the frame as both references fill it; `demand`: the
  fields and woods are sized to the demand and the frame's remainder stays wild wood, pasture and waste. **The arable
  reserve (`reserveArable`, default false):** when on, S2 records `arableReserveHa` and S5c prices growth onto fertile ground
  while the reserve is short (§4.4) — only as a tendency. **Test:** 100 % of outside-class buildings on outside plots with
  occupants; farmland per capita ± 20 % of the era row and equal to the farm classes' area; wood area against the fuel and
  timber rows with the import share reported (the bars are §13.2's).
* **Farm modes — FTG's three farmland layouts, chosen as its `Default` chooses them, by size and landscape (item 26;
  provenance `ref:FTG farmland modes`, the keys ours; J-A26.43, J-A26.44).** FTG has four farmland settings: three layouts —
  `Farmsteads`, `Around perimeter` and `Around rivers` — and a `Default` that picks among them by the settlement's size and
  landscape, its climate presets overriding. A `FarmModeRow { rung: Rung; relief: 'plain'|'rolling'|'hilly'|'mountainous';
  land: 'fertile'|'poor'; form?: PlanForm /* V07 §2.2's plan forms; read only at village rungs (V07 §3.2 (3)) */; mode: 'fill'|'perimeter'|'rivers';
  riverBandM: M }` per rung × landscape — S0's relief class (§4.2 S0) and the fertile share of the frame's land
  (`SiteResources.fertile` ≥ 0.4 on at least half the cells: fertile, else poor) — plays `Default` and chooses one mode:
  - `fill` — FTG's `Farmsteads`: farmsteads whose households live on their land, the farmsteads and their fields filling
    the remaining countryside from the perimeter outward, the plots larger where land is plentiful; each farmstead plot a
    count-driven outside plot, its driveway included (below);
  - `perimeter` — FTG's `Around perimeter`: no farmsteads — the farm households live in the settlement (S2 demands them as
    households of their band, which S7b allocates with the town's, §4.5 S7b (1)) — and their fields lie close to the
    settlement, laid ring by ring outward from the perimeter along the main roads out until the arable demand is met, the
    remaining frame in its landscape uses;
  - `rivers` — FTG's `Around rivers`: as `perimeter`, but the fields lie only on the land within the row's `riverBandM`
    (default 300 m; our own, calibratable) of a river's banks, on both banks; where the frame has no river the mode reads as
    `perimeter`, FTG's rule; where the band holds less land than the arable demand, the remaining fields are laid as
    `perimeter` lays them, on the land beyond the band, and the band's shortfall is reported (never a failure).

  Defaults: `fill` at TOWN and CITY on plain or rolling fertile land, `perimeter` at METROPOLIS and wherever the land is
  hilly, mountainous or poor; the `ClimateTable` row's `farmLayout: 'rows'|'perimeter'|'rivers'` (below) is FTG's climate
  override — the arid row sets `rivers` and the cold row `perimeter` (FTG's Desert and Polar presets), and a temperate row's
  `rows` leaves the rung × landscape choice. At the village rungs the mode follows the plan form (V07 §3.2 (3)): `perimeter`
  for the grown, street, green, nucleated, polyfocal and row forms, with `village.json`'s `farm.outlyingShare` of the farm
  households at outlying farmsteads sited at the tracks' ends (V07 §3.9 (5)), and `fill` for the dispersed form. The mode
  depends only on the rung (and at village rungs the plan form), the climate row, S0's relief class and S1's resources, so
  S2 reads it before it demands the farm plots (§4.2 S2); the hinterland's derivation record carries it; the field-system
  preset lays the fields inside every mode.
* **Count-driven outside plots (COV-FTG-I03, COV-FTG-B09).** The hinterland allocation (S7b) lists the outside classes —
  farmsteads (under the `fill` mode), water and wind mills, quarries, mines, lumber yards, charcoal burners, fisheries,
  lodges — and the decorations below. Their sites are seeded by score on `SiteResources` — the outside classes' relation rows
  (§10.2), the same rows the placement solver reads (§4.7 S10b): quarries on stone, mines on ore, lumber at the woodland
  edge, fisheries on the shore, water mills at a reach with fall, windmills on exposed high ground, farmsteads on fertile
  land near a lane, a custom chain's resource node on its kind's feature (§4.7 S10b) — with a **clustering term** (a seed's
  score rises for each seed of its own kind within the cluster radius, so similar features sit together, FTG's rule); S12a
  fixes the seeds, and the hinterland unit's S10 divides the outside land into exactly that many plots by a weighted
  Voronoi (power diagram with area targets) clipped to the land. Each plot is an outside plot (L3 in the hinterland's
  blocks) with its yard and a `driveway` face to the nearest way corridor (VG's lonely houses, on purpose); the edge
  orchards of §4.5 S7b (4) are plots of their allocated area in the first ring beside the district they serve. The unit's
  S10b places the allocated outside classes and, under the `fill` mode, the farm households on the outside plots.
* **An oasis's gardens (item 111 (a)).** Around an oasis (§4.2 S1 (2)) S12a sites irrigated gardens — `LandUse` faces of
  kind `garden` (§2.7) whose `fedBy` names the oasis's water body, fed by short channels drawn from that link (§8.2),
  within the climate row's channel reach of the water, sized by the oasis's area band (V11) — which the hinterland unit lays before the fields when the oasis lies outside the
  perimeter; inside it, the plots nearest the water take garden yards by prosperity (§4.5's water term) and S12b's grove
  row plants the shore.
* **Crops and livestock (COV-NG-VS27).** Every field face takes `crop` and `livestock` from the era / region crop table (our
  own rows) under a rotation scheme (three-field by default: winter grain, spring crop, fallow per furlong, each field's slot
  from its furlong index, or per great field where a `VillageField` groups the furlongs); pastures take livestock. The `lit`
  preset's field textures read these attributes.
* **Hinterland decorations (COV-FTG-I12).** A decoration table — rows `{kind, count by rung and biome, placement score,
  trail: yes / no, keepClearCm}` — places ponds (small closed outlines from S1's routine, carved at S3, §4.2 S3 (10)),
  copses (wood faces), stone circles, ruins (an outline footprint in the `ruined` lifecycle state), wayside shrines (one per
  through-road by default) and boundary stones at the margin crossings — sited by S12a and built by the hinterland unit; a
  row with `trail` links its decoration to the nearest way corridor by an L3 `path` face; fields and woods keep back by
  `keepClearCm`. Our own rows and counts, calibratable.

**S12b Greenery (after S11; O19; owner base ruling AM-1) — the rule table.** Greenery is a rule family that reads the
prosperity value, the district kind and the greenery propensity field, never leftover space. It is **the same rule family
as coverage and plot granularity**: every share below is a band row of §4.5's band set (a band without a row of its own
interpolates, item 27), and the value used for a plot is interpolated along its prosperity value between the band rows, so
a quarter's greenery blends at its edges. Rows are defaults with provenance "owner ruling + O19 answers", all calibratable
(JT, §13.7), scaled by the rung's `RungProfile.greenery` (park area per 1 000 inhabitants ×, the edge-green or orchard
probability, the private-green shift; §1.1, AM-4). S12b writes only inside its own faces (§4.1): its L3 batch lays parks
and groves on its own reserved green faces and residue, then its L4 batch types yard-planting parts; avenue and
street-tree rows are `Greenery` entities along its own half-corridor strips (`Greenery.along`, §2.7) that write no plat
edge; the hinterland's rows are the hinterland unit's. A layout the kernel refuses as degenerate is left out and reported
(its face stays residue); a district with no green face and no qualifying way plants nothing but its yard rows. Greenery is
re-derived with its district's S12b (§7.3), persisted with its faces (§2.9); an edited greenery entity is held (§7.2) and
its undo is the log's (§7.4).

| rule | reads | fires when | places (typed, owned entities) |
|---|---|---|---|
| yard planting by plot class | site plan, value | every plot | row → rear kitchen garden (≥ modest), else bare / midden; compound → formal or kitchen garden + orchard part; detached → garden; hovel → bare, pen or midden; cluster → bare ground, paths, a midden (item 70); institution → forecourt / churchyard |
| formal gardens | value | compound plots: share rising from 0 at the modest band's centre through 0.3 at the prosperous centre to ≥ 0.6 in the rich band | `formal_garden` yard parts (grid layout) |
| parks and ornamental grounds | value, institutions, `greens` | rich or planned districts: **0.4–0.8 ha of park per 1 000 inhabitants of the district**, only on S7b reserved faces or residue ≥ 0.3 ha, or on a green block of S9b's dispatch or a `park` template's green plaza at any size (V01 §3.4.5, V01 §3.5.4); palace / cathedral close / monastery: an ornamental claim of 0.5–2 ha | `park`, `garden` faces owned by the institution or the commons |
| court greening (V01 §3.5.7; `extension`) | band, greenery value, `leafy` | every court residue of an ordinary block, with the band's probability × (0.5 + greenery) (× 1.5 when `leafy`), drawn on `greenery` keyed by the block; while `hood.constants`' `ng.courts` is on (the `NG` preset's entry, V01 §3.15), exactly when the block's frontage ring is complete | the court as a green with trees |
| green and yard blocks (V01 §3.5.10; `extension`) | `Block.content` | every `green` block and every grassed `yard` block | a `green` on its residue face, owned by the commons, a grove layout by the park rule for small faces |
| avenues | way class, value, planned flag | tier-1 ways (`through`, `primary`) bounding or crossing rich or planned districts; prosperous districts with probability 0.5 (the district's `greenery` stream) | `avenue` rows at 8–12 m spacing in each qualifying district's **own** half-corridor strip: a boundary way gets a row on each side whose district's rule fires — both, one or neither |
| street trees (COV-FTG-I09) | way class, value | `secondary` streets in prosperous and rich districts with probability 0.3 | `street_trees`: one row at 10–14 m in the half-corridor strip of the wider side (by corridor half-width; ties: the side left of the way's direction), planted only by that side's district when its rule fires |
| edge green or orchard | value, position | modest districts touching the settlement perimeter: S7b draws the choice (§4.5 S7b (4)) — a `green` / `commons` claim of 0.1–0.3 ha inside the district at its edge, **or** an `orchard` of 0.2–0.5 ha as a hinterland allocation row in the first ring beside it | the green: built by the district's S12b on its claim; the orchard: built by the hinterland unit's S10 — both owned by the commons |
| intramural gardens (item 106 (b)) | the barrier reach | the spare ground a barrier reach encloses (§4.4), not counted as built land | `garden`, `orchard` and `paddock` faces owned by the commons |
| churchyard | institution | every church / temple plot: a `churchyard` part ≥ 30 % of the plot's yard | yard part |
| market green | era preset | an unpaved market square (era table) | `market_green` |
| castle esplanade (MFP-11) | castle surround row | an inside or inner castle: a 20–40 m green spacer between the bailey and the town | `esplanade` |
| oasis grove (item 111 (a)) | climate row | the shore band of an oasis | `grove` of the climate row's grove trees (palms or the culture's), its `Greenery` naming the water body in `fedBy` (§2.7) |
| poor quarters | value | little: yard planting on ≤ 15 % of plots; **a tree by the well** (a pin rule at squares and wells) — charm, not zero | yard parts, pins |
| hinterland ring supply | O14 rings | orchards in ring 1, commons in ring 3, coppice in ring 4 (the hinterland unit) | `orchard`, `commons`, `coppice` |
| ambient scatter (COV-FTG-I09) | land use, biome | pasture, meadow and commons: 0.5–2 single trees per ha by biome row, clumped by a cluster process — each unit on its own land-use faces | `ambient` |
| shoreline band (COV-FTG-I09) | bank kind, biome | round ponds and lakes where the bank is not a quay or a beach: a 5–15 m tree band — each unit on its own faces along the shore | `shore_band` |
| rim walk (V01 §3.10.3; V05) | a sky island | the `rim_strip` face (§2.5) | one `esplanade` on the face and one `street_trees` row along the strip's inner setback line, spaced by the street-trees row; no way laid; planted once per island by V01's `plantRimWalk`, never by a district's S12b (`Greenery.along.way` absent for this row alone, §2.7) |
| trees at render | ecology, species | every green entity: instanced by §8.10's layouts — the ranked tile stamp for areas (woods, gardens, parks, copses: wood 3–5 m, garden 4–6 m), a jittered grid for orchards (6–8 m), a jittered line for avenues and street trees (at their rows' spacings above) and for hedgerows (8–12 m) — keyed by entity and instance ordinal from the `render.instances/<entity>` stream (§6.1); positions independent of the LOD band; crown diameters in metres consistent with building sizes; species from the entity's mix | never stored; overrides are `instance` events (§7.1) |

* **The `greens` toggle (MFP-11).** `on`: the park row fires in every band at a floor rate (0.1 ha per 1 000 inhabitants in
  modest districts, 0.05 in poor) and one park district is seeded per 25 000 inhabitants regardless of wealth (MFCG grows
  its park districts independently of wealth); `off`: parks and park districts are not generated, yard planting and every
  other row unchanged; `auto`: the feature table (§4.2 S0). The resolved mapping is written to the report.
* **Park layout (COV-MFCG-I03, COV-MFCG-G03).** A park's inside is laid by a `PartitionRecipe` (§4.6): a radial `fan` of
  groves with alley-width paths when its compactness is ≥ 0.7, otherwise a `semiFan` from the vertex at its longest edge
  (MFCG's rule), plus a perimeter path (FTG's); groves are `grove` L3 faces and the paths L3 `path` faces (the fan's
  alley-width gaps and the perimeter band), not ways, so S12b never writes L1 after S9; formal gardens use a grid.
* **Species and climate (COV-FTG-I11, COV-FTG-I15).** A `ClimateTable` row per biome (temperate-deciduous,
  temperate-coniferous, mixed, maritime, arid, cold — the biome is a circumstance, §7.7) sets the ground-cover role, the
  tree-species mix with separate inner and outer shares for woods (e.g. a coniferous interior with a deciduous edge), the
  default field system and `farmLayout` (the farm modes' climate override, above), the default roof form and pitch, the
  scatter densities, the dry-country cells (aridity, the arid water chances, the oasis rows, the water-pull weights,
  the sunlight cell; items 102, 111; V11) and the season columns (item 117; J128: `ClimateRow.seasons`, the shape V11
  §2.8's `ClimateSeasonCells`, its values V11 §3.25.6 — the winter's severity and the leaf, blossom, growing, harvest,
  hay, ice and snow weeks; read only by §8.2's season rows, §11's exports and §7.7's DR42, never by a
  stage, so no season changes the model or its hash, item 117 (a)); `Greenery.species` carries each entity's resulting mix, which the crown symbols
  and the orchard kinds read. Our own rows.

**Acceptance (O19, adopted):** (a) Spearman(prosperity, private green share) ≥ 0.7 within ± 5 points of the table mean,
σ ≤ 8 across seeds; (b) public-green rule satisfaction ≥ 95 % and park / green area per 1 000 inhabitants within its band,
reported; (c) 100 % of greenery typed and owned or common, untyped leftover green = 0; (d) tree scatter NN p1 above the
canopy threshold and a pair-correlation per class; (e) ≥ 10 000 trees within a 16 ms frame at district LOD (per rung and
tier in §12.7); (f) the greenery control monotone and continuous (§7.8); (g) city-zoom greenery passes the legibility check
and no option coupling drops the layer. Restraint at city zoom is §8.5's; the `grove` tag and VG's dramatic forest are kept
as options; trees are a drawing-group switch (`StyleSheet.groups.trees`, §8.2).

**The owner rule, clause by clause (AM-1).** Trees and greens here and there: the poor-quarter tree-by-the-well pin, edge
greens, street trees, ambient scatter. Parks: the park row with its per-capita band and the `greens` toggle. Artificial
landscapes — formal gardens, orchards, avenues, ornamental grounds: their rows. Placed by rules reading prosperity and
district type: every row's `reads` column and the interpolated band rows. Rich quarters gardens, parks and tree-lined ways;
modest ones a green or an orchard at the edge; poor ones little: the rows' band conditions. Yard planting follows the plot
class: the first row. Same rule family as coverage and plot granularity: band rows interpolated along the prosperity value.

**One more member of the family (AM-10).** II.6's island supply law is a row of this family: an island's supported area and
altitude interpolate along the prosperity value between rows as coverage, granularity and greenery do — its rows keyed by
absolute values rather than bands, since a town-wide supply must compare towns, which the per-town cuts cannot (V05 §3.3) —
read the same field, and are zero below the supporting threshold; its rows are II.6's `IslandRule`.

**Gardens over epochs (item 31).** The yard rows read the plot's manifested band for the yard parts that exist (S11's yard
partition is geometry, bounded by §4.11's floor) and the field value for what is planted in them: rung 1's
`densify … infill` builds over the garden part and `thin … infill` re-gardens it, re-running the yard-planting row for that
plot alone (§4.11).
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
removed; gates become junctions with a `square` option. Where the old line meets a standing raised way the ring road meets it as a way laid after it (§2.7's way-and-channel table, row c): in the dry run its spine there is re-routed by §7.3's S4 local operator, between its nearest nodes on either side of the under-deck strip, to cross under the nearest span §4.3's crossing rule admits, else it ends at the strip's edges as at a reservation, reported; it takes no junction with the raised way, nothing of which changes, and V04 lays again the arch vault of a `vault` span the old wall stood over (V04 §3.5.4 (d)). A barrier arc the wall left unwalled (§4.4) carries no way. **Clearance
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
  where they met the new water at ≥ 30°, extended from the cut end to the new bank as a quay or a landing. A raised way keeps its course and every station; the channel meets it by §2.7's way-and-channel table (row e), reported (`W_RAISED_CROSSING`; by hand §7.1's `bend.raised.underSpan`, `bend.raised.around`).

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
   `dossierChange.week` (§7.1, item 75). The document's current week is derived — the greatest week the folded events carry, so an event folded after one of a later week (a late change at `W₀` + 1 or `W₀`, (4); a dossier change dated before an event an earlier absorb folded) never moves it back — never a stored counter (§2.9), and each epoch's week is its `EpochRecord`'s.
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
   dossier event still at its own week; a calamity then riding the coarse epoch that holds its week). A newly carried change dated at or before the last epoch's week `W₀` is **late**: it never folds at a week before `W₀`. A late **calamity** folds no epoch at its own week and is never lost. Where the absorb's week `W₁` is after `W₀` it rides the first epoch this absorb folds (`DossierPort.absorb`; with none, the port folds one at `W₁` for it), its `EpochInputs.events` entry at that epoch's first week `W₀` + 1 and its F5 targets' dossier events in that epoch's `EpochInputs.dossier` at the same week, struck in place (V06 §3.11.1). Where `W₁` is not after `W₀` (a second absorb in the last epoch's own week, or a clock turned back) the absorb carries neither the calamity, nor the records of its F5 targets (each whole, its other changes waiting with it), nor a condition naming it — their carried facts stay as they were, noted (`unreceipted_change`'s `lateDeferred` variant, a standing note, V08 §4.6; an absorb carrying nothing else answers `unchanged`, V08 §3.2, its note in the host's report, V08 §3.6 (4)) — so the first later absorb whose week passes `W₀` finds them newly carried and folds them by the rule before; nothing is held in the binding, and a copy forked meanwhile never receives them (V06 §4.4). Either way its own tick stays in its receipt, its hazard strikes once and its deaths reach the burial need. Every other late change folds after the last epoch at `W₀` + 1 where `W₁` is after `W₀`, else at `W₀`, applied finished (no Works), noted (`unreceipted_change`'s `late` variant, V08 §4.6); a population move carried by an absorb whose week is not after `W₀` crosses at the next absorb whose week passes `W₀` (V08 §3.6 (3)). No epoch
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
re-derivation (§3.4) for that part's cleared faces, which also extends a deck ending on the old ring to the new ring, the old deck's stations kept and its end span's condition carried (§2.7's support step (7)), and re-places both ends of that foot (§2.7 `RaisedFoot`)); every face outside the region, off a deleted stretch and off the ring keeps its
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
| river, coast, moat | spans between supports on the banks, no support in water (§2.7's support step), within `viaduct.maxSpanM` and §2.7's clear-span bound (`raisedWays.structure.maxClearSpanM` by material) — a crossing wider than it drops a generated course (`raised_too_long`) and bends a declared one; never out over the sea (its ends are ground vertices); a moat spanned with no support in its water, and one laid after the course by §2.7's way-and-channel table (row e), the course kept (`W_RAISED_CROSSING`). *Rung:* leave out and report (generated); simpler shape (declared, bent) | none on a `water` run; the bank holds the ground. *Rung:* — (defined) | a bridge, pier, mole or quay deck by the `deck` offer; none on a ford, a drawbridge or a gate's moat deck. *Rung:* — (defined) | a water body reaching the ring shares its edge (§4.1's S1 row); no crossing site whose deck end lies beyond it. *Rung:* — (defined) |
| harbour | the basin and its mouth excluded; a stroke across bends to its last ground vertex. *Rung:* simpler shape (the bent stroke) | quays, moles and piers are harbour works, never retaining walls. *Rung:* — (defined) | moles and quays by offer; a walled port's mole head holds the chain tower (§4.8). *Rung:* — (defined) | as water. *Rung:* — (defined) |
| wall | meets a wall by §2.7's crossing table: created across a standing one *over the band* (an aqueduct) or *down before the wall* (a road deck); a wall laid after it — a village palisade among them — *beneath*. *Rung:* — (defined) | none on a `wall` run or in a wall strip. *Rung:* — (defined) | none on a wall strip. *Rung:* — (defined) | the trace stays inside the frame (S3's lattice; a frame arc inset by the outer wall strip, §4.2 S3 (6)). *Rung:* — (defined) |
| bridge | passes over its way without a junction at `raisedWays.structure.clearanceCm`; no support on its deck. *Rung:* — (defined) | a bridge's approach meets a retaining wall as a ramp by `primary`'s crossing row; `bridge`, `pier`, `quay` and `ford` ways never cross one. *Rung:* repair locally (the step re-cut, V11 §3.24.5) → leave out and report (not levelled there) | by the bridge row; a mid-span landmark slot on a span ≥ the `bridgeMid` minimum. *Rung:* — (defined) | a bridge's deck lies inside the frame (its site's two ends do). *Rung:* — (defined) |
| square or reservation | no support on it; spans over it with the clearance. *Rung:* — (defined) | the reservation levels itself (S11); no district-edge wall on a `reserve` run. *Rung:* — (defined) | a deck plot fronts its deck way, never a square. *Rung:* — (defined) | inside the frame by S3's siting. *Rung:* — (defined) |
| hinterland | spans over hinterland land-use faces stay open (reason `country`) at every rung (J-C4; §2.7's span rule). *Rung:* — (defined) | a district-edge wall may stand on a `field` run inside the district; fields are never levelled. *Rung:* — (defined) | a bridge outside the perimeter offers deck plots owned as V01 §3.17.6 states; its `bridgeMid` fort slot on a through route. *Rung:* — (defined) | the hinterland's faces end at the ring. *Rung:* — (defined) |
| oasis | no support in its water or on its grove; an aqueduct may take its spring as a source. *Rung:* — (defined) | none on its water run; its gardens are not levelled. *Rung:* — (defined) | a way across it by a built bridge offers deck plots by the bridge row, else none. *Rung:* — (defined) | sited inside the frame's middle two thirds. *Rung:* — (defined) |
| plots and buildings (S8–S11) | the under-deck strip and its pier footprints are S8's holes: no block interior, plot or footprint in them, with or without stage 2 (§4.6). *Rung:* — (defined) | a levelled unit's edge against unlevelled ground takes one wall above `stepMinCm`; a step above `stepMaxCm` takes terraces or is not levelled (§4.7 *Levelling*). *Rung:* simpler shape → report | a deck plot's building stands within the deck budget; removing or ruining the deck ruins what stands on it by least disruption. *Rung:* — (defined) | every plot and footprint stays inside the frame; the hinterland's outside plots end at the ring. *Rung:* — (defined) |

**Named fixtures beside each cell's own** (B-EDGE): a cliff primitive across a district and two plots at a cliff's top and
foot (the cliff × retaining-wall cell); a cliff-headland coast with the harbour-wall rows on (the cliff × deck-plot cell); a
CITY viaduct at M3a with stage 2 unregistered — 0 plots and 0 footprints in its strip (the plots × raised-way cell).
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
  cistern terminal takes a terminal cistern under its conduit house's yard; and each span a raised way's record marks `vault` — but one under a wall, read `open` (§2.7's crossing table, *beneath*; V04 §3.5.4 (d) (1)) — holds one arch vault at grade (`archVault`), following its raised way at every rung — the TOWN gate binds the other vault
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

