# repair-r7v-pipeline — lane coherence/repair-pipeline-r7v (unit pipeline: base §4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-pipeline-r7v; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-c/apply-blocks.py): text before the first block header is
# ignored. Base: docs/ARCHITECTURE.md sha256 14304a3d… (assemble-r7's output); rationale untouched. Each REPLACE body is
# the live subsection with asserted substitutions (each old text matched exactly once in its subsection and once in the
# whole document; every untouched line verbatim; generator and edit list in the lane's scratch folder,
# coherence/r7v-pipe/gen.py and edits.py). 5 blocks, all REPLACE (§4.1, §4.2, §4.4, §4.5, §4.8); 9 edits, each the exact
# words of adjudication-r7v.md Part H · pipeline (P1–P7), checked programmatically against that file. 0 RULING REQUEST
# blocks; no J-ROWS or RATIONALE-A block.
#
# PROGRESS
# - P1 brief read whole; adjudication-r7v.md read (head, decision table, Part H · pipeline P1–P7, builders' choices,
#   held notes); sources famverify-generation-r7.md (VF7-GEN-01 – -08) and famverify-readers-r7.md (VF7-RDR-04) read;
#   adjudication-r7.md Part H's head (the citation rule, the one rule for the rest); §2.7's laws (law 1, law 2, row (d),
#   *the cap* in *beneath*) read; the live text of every subsection concerned read at each site: done
# - P2 5 REPLACE blocks composed by count-asserted substitutions: done
# - P3 dry run on a scratch copy, receipts below: done
# - P4 result file and LANDED: done
#
# DISPOSITIONS (adjudication-r7v.md Part H · pipeline) — 8 issues routed: 7 FIX (one of them FIX, VALID CHOICE PICKED),
# 1 VALID CHOICE LISTED; 0 RULING REQUEST
# - VF7-GEN-01 (major; FIX, VF7-TBL-02 merged into it) — P1: §4.4 S5a *Trace* (2), the pull's impassables: "an aqueduct's
#   standing supports where its channel runs above the wall's top (its crossing there over)," → "where an aqueduct's
#   channel runs above the wall's top (its crossing there over), its standing supports and the strip of each span whose
#   soffit does not clear the wall's top (law 1 (2): a crossing that fits neither form unlawful),". *beneath*'s half is
#   the model's (M8); V06 §3.7.4 (2) cites this list unchanged.
# - VF7-GEN-02 (major; FIX) — P2: §4.2 S3 (8)'s list of standing raised ways now opens with every raised way standing
#   before the stage (a creation prefix's declared ones; at a regeneration each one it keeps where it stands, law 2
#   *Newer*), replacing "every held one at a regeneration"; S3 (10)'s "at a regeneration, one held" → "a creation
#   prefix's declared one and, at a regeneration, one it keeps where it stands", "at generation" → "at generation,
#   besides,".
# - VF7-GEN-03 (major; FIX) — P3: §4.2 S3 (9)'s **Test** excepts, beside a barrier reach, a stretch F-WALL's raised-way
#   rung re-pulled round a raised way (§5.2; law 2 (c)), each departing by at most `wall.barrierReachM`. §5.3's distance
#   row cites S3 (9) and stays.
# - VF7-GEN-04 (minor; FIX) — P4: §4.4 S5b's `c` names the ramp, stair or foot crossing pinned beyond the foot as one of
#   them where that pin is lawful, citing law 1 (4), law 2 *Not yet built*, its worked example row (d). §5.3's gate row
#   ("or ends") is determinism's (D6).
# - VF7-GEN-05 (minor; FIX, VALID CHOICE PICKED) — P5: §4.2 S3 (7)'s re-solve trigger: "or with its gate's footprint or
#   the band there over the ends or in the strip" → "or with its gate's footprint in a strip where law 1 (5) bars it, or
#   the band or wall strips there over the ends".
# - VF7-GEN-06 (minor; VALID CHOICE LISTED) — nothing written; the kind of a carried way's stage-1 gate is listed in
#   adjudication-r7v.md's builders' choices for fix-list.md.
# - VF7-GEN-08 (minor; FIX) — P6: §4.1's S7 row and §4.8 *Gates* cite §2.7's laws (law 1 (1)–(9); law 1 (1)) with the
#   crossing table as their worked example.
# - VF7-RDR-04 (minor; FIX) — P7: §4.5 *The casters*: the restatement of law 1 (7) written as its citation, "walls (each
#   run at its top as §2.7's laws give it, law 1 (7); its worked example *the cap* in *beneath*)" — the same words §8.4's
#   surface layer and casters already carry.
# No END line of another unit's finding names this unit (adjudication-r7v.md Part H: none).
#
# SWEEP (R7-01 (2): every restatement in this unit of a text changed here) — grepped §4, §10, PART II and PART III for the
# pull's aqueduct impassables ("above the wall's top", "standing supports", "soffit", "impassable"), the lists of standing
# raised ways ("held one", "one held", "raised stretches of (5)'s routes", "creation prefix", "Newer"), the trace's distance
# bound ("departs", "barrier reach", "≤ 40 m", "raised-way rung"), the ramp pin and `c` ("ramp, stair or foot", "beyond
# the foot", "raised deck no gate", "pins no gate", "row (d)"), S3 (7)'s trigger ("re-solved whole", "gate's footprint",
# "over the ends", "admit none"), bare crossing-table citations ("crossing table") and the run's cap ("capped at",
# "capping", "law 1 (7)"): no other restatement of a changed text. Every other crossing-table citation in the unit
# (§4.3 l. 6388, 6490; §4.8's lead l. 8332; §4.11 l. 8949; §4.13 l. 9697; II.7.6 l. 22741) already cites the laws
# first. Noted, not edited (outside every finding and END line here, so left for the next full round): §4.4 S5b's
# closing "(§2.7's way-and-channel table, row d)" (l. 6643), and the way-and-channel table cited bare at §4.3 l. 6394,
# 6490, §4.4 l. 6678, §4.11 l. 8939 and §4.13 l. 9695 — raised way × way or channel rows, citation form only.
#
# RECEIPTS (scratch: coherence/r7v-pipe/)
# - apply-blocks.py dry run on a copy of the live files: 5 blocks found, 5 applied, 0 skipped; audit not OK: 0; headings
#   153 → 153; fences balanced; title block unchanged; rationale byte-identical; 24 062 → 24 062 lines.
# - diff live → patched: exactly 9 lines changed (l. 5700, 6214, 6231, 6267, 6285, 6589, 6638, 6873, 8378), each the
#   one edit named above (word diff in wdiff.txt); no other byte moved.
# - doc_checks.py, live and patched: identical — C1 5 hits / 0 unreviewed, C2 1 / 0, C3 1768 / 0, C4 6 / 0, S1 0 / 0,
#   S2 314 / 0; WARNING reference corpus INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs,
#   research/external absent in this checkout) — the result is NOT authoritative, provisional.
# - Every cited anchor resolves: §2.7's laws law 1 (2), (4), (5), (7); law 2 *Newer*, *Not yet built*, (c); the
#   way-and-channel table's row (d); *the cap* in *beneath* (l. 3087); §5.2's F-WALL raised-way rung (l. 9840).
# - No review id, deferral word or narration written into the design.
#
# WORDS (principle (9); this pass adds the words its fixes need): the five subsections 30 699 → 30 835 (+136); the unit
# (§4, §10, PART II, PART III) 115 902 → 116 038 (+136, +0.1 %). Sources: RESTATEMENT −3 (P7, a restated law written as
# its citation); NARRATION 0; DUPLICATED MECHANISMS 0; VERBOSE PROSE 0; the +139 added are content each finding requires
# (the over form's span condition in the pull's list; the prefix's declared raised ways in S3 (8) and (10); the rung's
# exception in S3 (9)'s Test; the ramp pin in `c`; law 1 (4)'s wall strips and law 1 (5)'s exception in S3 (7)'s trigger;
# the laws' citations at §4.1 and §4.8). The unit's irreducible content holds it against the shrink band in this pass.

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
  | S5, per stage k | k = 1 — S5a L1: S3's trace with its gate vertices · k ≥ 2 — S5b L0, only when F-ROUTE's extra-bridge rung fires on standing water: two same-level shore splits before S5b's L1 batch (§4.2 S1 (5)); S5b L1: the main roads, picked on the stage's boundary (data, no batch); S5a L1: the trace with every arterial crossing on ground part 0, and a carried way's lawful pin, as a gate (§4.4 S5a *Trace* (2)); then an outer moat's carve batches (L1: each arterial's crossing made one straight edge between two deck bank vertices, its deck span; L0: the channel, with those vertices as `KernelTx.prepared`; §3.3, §4.11) · every k — S5c L1: growth, then L1: the between-stage prune and trim · S5d: a top-up re-runs S5a's arc and S5c on the rim, each L1 | F-ROUTE (S5b), F-WALL (S5a), F-BUDGET-STAGE (S5d) |
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
   reaches `T = t_1`** — on the boundary by construction; the gate keeps the pick's identity, ordinal, bearing and route. A route whose first point at `T = t_1` lies on a raised stretch of its solved course (a viaduct (5)'s solve priced, §4.3) — or would put its gate where §2.7's laws admit none: on a ramp or stair, nearer its foot than the first point beyond the foot, or with its gate's footprint in a strip where law 1 (5) bars it, or the band or wall strips there over the ends (law 1 (1), (4), (5)) — is re-solved whole as (5) solves it, every deck edge whose ends straddle the stage-1 boundary, or with an end nearer the boundary than the first point beyond the foot there (§2.7's laws' terms, read with the band and gatehouse rows there), excluded — a search over the routes whose first point at `T = t_1` §2.7's laws admit (law 2 (a)) — (the boundary counting as standing, §4.3 *Where it may not go*; §2.7's laws, law 1 (3); its worked example *down before the wall*); its gate is the re-solved route's first point at `T = t_1`, on ground part 0, which the rest of this step reads as any gate; the harbour gate of (7) is placed likewise, where `L*`, re-solved with every deck edge across the stage-1 boundary excluded, first reaches `T = t_1` (a search over lawful points, §2.7's laws, law 1 (1), law 2 (a)); `T` and the boundary keep (5)'s routes and are not re-derived, and a route the re-solve cannot serve takes F-ROUTE's ladder (§5.2), reported. The raised stretches of (5)'s routes, so re-solved, stand for every later step of S3 as standing raised ways whose courses are dated after the stage-1 trace (§2.7's laws' *Order*: the trace by S3 (6), these stretches by S3 (7)), so that (9)'s pull keeps off their deck lines (law 1 (3)) as off their ends: (8)'s siting filter and (9)'s pull, anchors and water gates read their ramps, stairs, feet, under-deck strips and fixed-place zones (their supports placed at S4's commit by §2.7's support step (6), against the trace's band) as §2.7's laws read a standing raised way's (law 1 (3)–(6), its worked examples *beneath* and the fixed-place sentence; the pull keeping each such route's crossing of the boundary as §4.4 S5a *Trace* (2) keeps an arterial's), and S4 commits them unchanged — their stations and spans read, from S3 (10) on (S3 (10)'s channels, S3 (11)'s harbour route, S4's own routes), as the support step will place them at S4's commit from what stands at S3 (10), the trace's band among it, and S4's commit placing exactly those (§2.7's laws, law 2 *Not yet built*) —; a raised stretch S4 solves on a route of its own is laid after the trace and meets it as one (§2.7's laws, law 1 (3), (6); its worked examples *down before the wall* and the fixed-place sentence). A carried way standing before the stage (a creation prefix's, or one a regeneration keeps) takes a gate of the stage where `T = t_1` crosses its ground course or ends, beyond its foot, beside the N main gates, decked and counted as the harbour gate is, and none where `T = t_1` crosses only its deck, a crossing (9)'s pull keeps; where §2.7's laws give it no lawful gate, the way is re-routed through one of the stage's gates (§2.7's laws, law 2 *Carried way*, (a), (b)).
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
   no castle moat needs a deck except at a ring moat's castle gate. Every deck has S1 (5)'s form and its two states. A raised way standing when this step carves — a creation prefix's declared one and, at a regeneration, one it keeps where it stands (§2.7's support step (6); §2.7's laws, law 2 *Newer*); at generation, besides, the raised stretches of (5)'s routes, their stations and spans read as §4.2 S3 (7) reads them (§2.7's laws, law 2 *Not yet built*) — meets the moat and the canals by §2.7's laws (law 1 (1), (8); its worked example the way-and-channel table, row (e)), each channel stopped at its under-deck strip counted in S3's `W_RAISED_CROSSING`. When
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
2. **Pull and pin.** The boundary is pulled to defensible ground within a 40 m search band (local ridges, slope breaks, river banks: a cost-surface path around the town with a penalty for leaving high ground, the impassables §2.7's laws give a trace (law 1 (2)–(4), law 1 (9) and (10)) impassable to it — a standing raised way's ramps, stairs and feet widened by the wall strips' width there, its strip but to cross its deck line once, the deck line of every road deck whose stretch there is dated after the stage's boundary pick (S3 (7)'s stretches at stage 1, the stage's own S5b decks), where an aqueduct's channel runs above the wall's top (its crossing there over), its standing supports and the strip of each span whose soffit does not clear the wall's top (law 1 (2): a crossing that fits neither form unlawful), a carried way's ground course beyond each foot where the stage's boundary crossed only its deck (law 2 *Carried way*), every held building's strip and a shape-locked raised way's `vault`-use spans' strips), with **the gates pinned**
   where the arterials cross the boundary (stage 1: S3's gates; k ≥ 2: every crossing of an S4, earlier-S5b or this stage's S5b arterial, and a carried way's lawful pin, §2.7's laws, law 2 *Carried way*) — on ground part 0, a raised way met by §2.7's laws (law 1 (1), (3)–(5); its worked example *beneath*): an arterial crossing the boundary on a raised deck pins no gate there, and the pull keeps that crossing beneath its deck — that arterial's ground course beyond each foot of the deck, within the search band, impassable to the pull as the deck's ramps, stairs and feet are — so the pulled trace crosses each arterial as the picked boundary did: on ground part 0 at its pin, or under its deck (§2.7's laws, law 1 (1), (3); its worked example *beneath*), and the stage's gates are its pins (`N_k`, §4.4 S5b); one whose crossing falls on a ramp, stair or foot pins its gate on its ground course at the first point beyond the foot (§2.7's laws' terms); and a pin whose gate's footprint, read from the gatehouse row it will be built by, meets a raised way's under-deck strip where §2.7's laws bar a gate (law 1 (5): any but under an aqueduct's arch that clears it) moves along its arterial until that footprint is clear, within the pull's search band, else — a carried way's pin first re-routed as §2.7's laws, law 2 *Carried way*, says — that crossing takes F-WALL's raised-way rung (§2.7's laws, law 1 (5); law 2 *Not yet built*, (a), (c)) — and an `on_enceinte` castle **welded through its two weld vertices** (the shared edge is one wall; MFP-3).
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
through §4.11's carve path. Its way rule meets only arterials here — each just outside one of the stage's gates, the
stage's secondaries not yet grown — so every way is kept with a deck and nothing is cut: the L1 batch places each deck's
two pinned bank vertices on its arterial where a wet stretch's banks will cross it — the `deck_end` rows of a fresh
`Bridge`, `built` with that arterial as its way (§2.7) — the span between them carrying `deck` (the arterial is re-routed
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
  foot, the far side of a steep hill), walls (each run at its top as §2.7's laws give it, law 1 (7); its worked example *the cap* in *beneath*), gatehouses, the castle and great towers, raised ways and retaining walls
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
enceinte; its geometry at L3 and L4 is built inside the wall strips by S10 and S11 after S9. A raised way S7 meets is met by §2.7's laws (their worked example the crossing table): the strips, band, towers and gates beside a trace laid after it, and the towers S7 lays beside a trace an aqueduct at S6's end crossed (law 1 (2), (5); its worked example *over the band*), as the laws give them (law 1 (2)–(9); its worked example *beneath*) — the strips and band as anywhere, no gate's, postern's or tower's footprint in its under-deck strip but under an aqueduct's arch that clears it (law 1 (5); one whose footprint the spacing or the gate law would place there moved clear to the nearest place the laws admit, law 2 (a), law 3), no fixed place (the laws' terms) where law 1 (6) bars it and none moved along the trace, whichever is laid later keeping them apart (its worked example the fixed-place sentence), each crossing of a trace laid after it with its deck line reported (`W_RAISED_CROSSING`) —, a gate plaza cut round its supports, ramps, stairs and feet, a quay, the intervallum or a castle path crossing its under-deck strip by §2.7's way-and-channel table, row (a) (a worked example of §2.7's laws, law 1 (1), (8); an intervallum ending at the strip leaving the inner strip bounded across it by its inner setback line), and no pier, mole or breakwater rooted on its supports, ramps, stairs or feet, a root moved along the shore to the nearest clear one.

**Wall strips, band, setbacks, intervallum (GEO-38, MFP-9, COV-FTG-G07; J-P29).** S7's L1 batch cuts two **wall strips**
off the L1 faces beside the trace's walled stretches. Inside: the band's half (wall thickness by era 2–3 m, read along the
stretch profile below) plus the inner setback (table 6–10 m; MFCG's "buildings never touch the wall"), bounded by the
**inner setback line** — or, where the era row asks for an **intervallum** (`lane` on inner and outer enceintes at CITY and
METROPOLIS in the high-medieval preset, `none` at TOWN), by the intervallum spine itself, inserted here as an L1 `lane`
whose kerb is the strip's edge. Outside: the band's half plus the outer setback and glacis (table 10–20 m), bounded by the
**glacis line** — or, where a moat runs along the wall, by the moat's inner bank, the strip then being the band's half plus the berm; across an under-deck strip where the moat is stopped (§2.7's laws, law 1 (1), (8); its worked example the way-and-channel table, row (e)) by the glacis line, as on a dry stretch. The lines carry the structural `setback` role (§2.2 rule 7), run from gate to gate, stop at each gate's plaza
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

**Gates — exactly N, by construction (MFP-4).** Main gates are where S4's and S5b's arterials cross the trace on ground part 0 — a deck passing over a trace is no crossing (§2.7's laws, law 1 (1)): N₁ gate sites
were picked in S3 and the arterials routed through them, and each outer enceinte's gates are its S5b primaries' crossings on ground part 0 (§4.4 S5b), a carried way standing before a stage taking its gate as §2.7's laws, law 2 *Carried way*, give it, so roads leaving each walled stage, so counted, = its gate count and no arterial ends blind against a wall. Water gates sit
where a river passes (its two bank vertices named by `Gate.banks`, §2.7), at every quay access under a `quay_wall` or
`sea_wall` waterfront (§4.4), and at a harbour gate (§4.2 S3 (7)); the castle has one town-side gate; posterns are a
separate, road-less count added only on request; `N = 0` is honoured in S3. **Gate plazas (G-R1):** a small plaza is
claimed in S7's L1 batch at each main gate inside the wall, taking the inner strip's setback zone around the arterial
(MFCG B14); **forecourt squares** at churches and temples are typed open spaces sized by the institution's class — a church
or temple on a later reservation without one takes its forecourt from S9b's dispatch, and one below a block a `forecourt`
yard part of S11 (V01 §3.5.3). Gate passages stay open by construction: a wall strip ends at the corridor of the way
through each gate, so the band and gatehouse parts S10 builds never meet that corridor, and the intervallum's corridor is
the strip's inner edge. A raised way and a trace meet by §2.7's laws (law 1 (1); its worked example the crossing table): no station, gate or opening on a deck. The F-WALL ladder's last
rung is §5.2's.

**Towers** — a row per enceinte kind and rung: at every trace vertex whose turn exceeds a threshold and along straight runs
at a spacing (35–60 m by rung and era, read along the stretch profile; FTG's 39 m median and MFCG's tower-per-vertex are
the two reference points), and at every barrier anchor (item 106 (a)), never moved off it for a raised way (§2.7's laws, law 1 (6), (11); its worked example the fixed-place sentence); kind (round, square, bastion, octagonal) by era row;
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
