=== REPLACE ### 5.3 The invariant suite, by scope (SCL-1) ===
### 5.3 The invariant suite, by scope (SCL-1)

Every invariant declares a **scope**: *batch-local* invariants are evaluated on the batch's touched faces plus their
one-ring and on the records it created, changed or removed; *stage-end* ones once when a stage (or its scoped re-run)
completes; *save* and *load* ones when a document is written or verified; *CI-only* ones in the test harnesses. An
edit's dry run (§7.1) evaluates its batch-local and stage-end invariants once on the scratch overlay, and the commit
reuses that result (the overlay is committed as validated): one validation per edit. **For an edit whose operators
chain several batches** (§7.3 item 3) the batch-local rows are evaluated once, after the chain's last batch, over the
union of the chain's touched faces, their one-ring and the records the chain touched — a river move places its decks'
bank vertices in an L1 batch before its L0 batch inserts the water (§7.3 (b)), so the deck row can only hold at the
chain's end. The kernel invariants (first row) still hold at every batch, which is why each chained batch keeps every
way and enceinte one connected chain (§7.3 (b) 3). Each row states its check and scope; the rule it checks is stated at
the section it cites. A stage declares the rows it checks as `Invariant` entries — the entries of `StageDecl.invariants`
(§4.12) and of `KernelTx.expect` (§3.3):

```ts
interface Invariant {   // a row of this suite as a stage declares it
  name: string /* the row's name, as GenerationReport.stages[].invariants reports it (§5.4) */;
  scope: 'batch'|'stage'|'save'|'load'|'ci' /* this section's five scopes: batch-local, stage-end, save, load, CI-only */;
  class: 'hard'|'soft' /* hard: aborts the batch; soft (a statistics band): goes to the report (below) */;
  kind: 'classFloor'|'check' /* classFloor: a face class's floor — its width, area and angle, §4.7's class-floor row — whose failure returns E_BELOW_MIN_WIDTH, E_BELOW_MIN_AREA or E_BELOW_MIN_ANGLE; check: any other row, whose failure returns E_INVARIANT (§3.3) */;
  faceClass?: string /* kind classFloor: the face class whose floor it is */;
  check?: string /* kind check: the named predicate of this suite's row */ }
```

| invariant | scope | how it is checked |
|---|---|---|
| the kernel invariants (§3.10) | batch-local | the commit record's faces, edges and role keys (§3.3, §3.10) |
| class floors (§4.7's class-floor row; never `minEdge` as a face floor, §3.2 (2)) | batch-local | touched faces |
| no footprint overlap | batch-local | touched footprints against the spatial index |
| stage 3 (item 332): every wing inside its plot; the ground wings that are not towers tile, every wing that stands on another lies inside that wing's ring, and the wings standing on one wing are pairwise disjoint (V02 §3.15.1 ST6; item 333); every tower attached (overlap share in its band; a tower on a block contained in it) and not through a wing; every footprint hole a court yard part (V02 §3.5 M13) | batch-local | the touched buildings' wings |
| stage 3: the union of a stored composition's wings and towers equals its footprint (item 332) | batch-local | the touched buildings with a stored composition |
| basements (§2.6 *Basements*; items 29, 66, 226, 371): a basement lies inside and is smaller than its ground wings (those standing on no other wing); one other than a crawl space or a raised crypt never under the flood band or below the water table (§2.6's terrain gate; a raised crypt's floor above the water table by `crypt.freeboardCm`, V02 §3.14.5); a crawl space only where the lowest terrain sample under its footprint lies above the water table; a basement never joins a tunnel — a cellar stair to one is an `AccessPoint` (II.7.3) | batch-local | touched buildings |
| dossier existence (§7.7 item 2): every dossier-backed element is live and placed on every map, or present as its ruin while its assignment's `state` is `ruined` (§7.7 item 14) — no map event, `delete`, F-SITING or epoch step removes, closes or re-designates it (§4.11's *Dossier content across epochs*) | batch-local (the assignments the batch touched); stage-end (each `epoch` event: every dossier-backed assignment); save | the assignment index against live placements |
| **coherence** (§7.7 item 11; item 20 (h) (iii)): no derived fact contradicts a dossier fact — every dossier record placed or present as its ruin; every dossier count met within its tolerance (the population by §4.11's roster tolerance); every dossier kind, name and membership unchanged on the element its binding key names; the realm-level trade facts the trade slice's (§7.7 layer 2) | stage-end (every derivation; each dossier event, and each epoch that carries one) | the dossier facts the map carries by their binding keys (`Document.dossier`, §7.7) against the elements those keys name |
| the stored binding (`Document.dossier`, §7.7 item 12) equals the binding rebuilt by folding the log's dossier events | load; CI-only | the fold of the log's dossier events, compared row by row |
| a stored plan's storeys tile the extents of the wings that reach them (§2.6's stage-3 contract, its fourth rung; §3.10's seed-tiling row, per storey; J-A30.23) | batch-local | the buildings whose stored composition the batch wrote or carried |
| the interior ladder (§2.6, item 28 (f)): in every stored plan, and in every cached plan at its derivation, each household unit has its own entry door onto circulation or the street, never opens through another unit's room, and is reached from the main entrance through circulation rooms and stair cores only (V03 §3.2 A6; item 334); a re-cut along the ladder leaves the shell's leaf digest (its wings, heights, entrances, roof and basement) byte-identical (its rings read without the `composition`-role vertices a stored plan's re-cut adds; §2.6, J-P48 (1)) | batch-local (a stored plan the batch re-cut, §7.3); at derivation, on the rung's transient arena, for a cached plan (F-PLAN tier 1) | the plan's room graph walked door by door per unit; the shell's digest before and after |
| capacity: `Building.households` within §2.6's bounds — 1 ≤ households ≤ capacity(b) for a residential building, 0 only for a `vacant` one and for a locked or pinned dwelling a dossier population fall emptied (§7.7's precedence), 0 for a non-residential one — (§2.6's one capacity function and its clamp) after every committed change (J-A28.23, J-A28.46) | batch-local (the buildings whose wings, heights, class, plot `builtBand` or household count the batch wrote, and the receivers of its re-homing); stage-end (S11 per district after the overflow pass; each `epoch` event; a §7.6 table edit's re-derived set) | the capacity function recomputed on the touched buildings against `Building.households`; a residential building at 0 is `vacant`, or locked or pinned (§7.7's precedence) |
| a live-in dwelling stays among its building's households (§2.6's `Building.dwelling`, §10.2's `liveIn`; J-A28.29) | stage-end (S11 per district after the overflow pass; each `epoch` event; every edit, at its dry run) | the touched buildings' `dwelling` against their `households` and their use's `liveIn` |
| a mutation's kept parts keep their addresses and its added parts are minted from the causing event (§4.7 S11, §6.3); after a plot `join` or `split` the party walls agree on both sides and every plot keeps its class floors (item 31) | batch-local | the plots of the mutation or re-cut and their one-ring |
| declared means held (§7.2): no re-derivation, New random or epoch moves or removes an entity its declaring event pinned | batch-local (every re-derivation's scope) | the scope's declared set before and after the batch, by address |
| the epoch rows (§4.11, item 31; J-A31.75): no occupied building removed by a band change — a redevelopment first vacates through item 17's relocation; the ladder's rungs 1–2 change no frontage edge and shrink or re-cut no building shell toward a poorer band but by rung 1's yard buildings and rung 2's back-court split or reversal; every other change of a plot's ring or a shell carries the lifecycle event of the step that made it; every plot's geometry band at or above its floor | stage-end (each `epoch` event) | the epoch's touched plots' frontage edges and their buildings' shell subtrees (read as the interior-ladder row reads them) against their pre-epoch values: every difference matched to a lifecycle event recorded in the epoch, none matched only to a rung-1 or rung-2 `LadderOp` other than those named; every plot's band pair |
| Works (§4.11, item 67): no plot without an access edge at any stage of a Works (the old line kept as a pending bound until its clearing stage, the new line in place before its occupants move in); a building's occupants rehoused by item 17's relocation before its demolition or conversion begins — within an `epoch` event, rehoused or held in transit (`Household.transit`, §2.7) after every batch (item 335); a Works' drawn stage derived from its record and the week, never stored (§6.2) | batch-local (the Works an event started, changed or cancelled, and their plots); stage-end (each `epoch` event, with zero households in transit) | the plots' access rows at each of the Works' stage boundaries; the households' buildings against the Works' start; the transit count |
| decline and the staged layers (§4.11, II.6, II.7): a `cleared` building's footprint face persists; no `EvolutionStrategy` plan contains `demolish` on a tunnel; II.7.3's U1–U3 on the sewer network's part 0 (J-A65.42); ≥ 1 access point per underground neighbourhood; every `AccessPoint.ground.at` where II.7.3 admits it (item 64), never in water or a wall strip; no committed underground plot with a sample in an excluded ground face (F-UNDER); the underground stages write nothing on the ground `PlatKey` and each only its own system's part and the far `link_end` vertices of the links ending on it (§3.4) | batch-local (U1, U3, the trace face, the surface exclusion: touched records); stage-end (U2, the access rows, the tunnel-demolish lint over an engine plan); CI-only (the cross-arena write count) | the role index and `pointLocate` (§3.4) — for the surface exclusion, F-UNDER's samples found against the ground arena, never a write; the engine plan's op list |
| the sky (V05 §3.2 (6), V05 §3.7–V05 §3.10, V05 §3.15, V05 §3.22 (3)–(5); item 331): every island in state `floating` has a supported area > 0 unless held by a lock or declaration; every island's apex clears the tallest caster beneath by `clearanceM`, unless a lock holds the island or its `altitudeCm` path (V05 §3.9 (5): it stays where it hangs, listed `clearance held by your lock`); its land area within 1 % of `areaHa`; no plot on its rim strip; every live, unsettled island has an access or is reported `unreachable`; no two islands within `gapM`; a slot held by a `removed` island carries no island; no raised deck or raised-way pier inside an access's column or landing yard and no access foot on a deck face; no island `RetainingWall` on a rim strip; no raised part with an endpoint, a deck or a source on a sky arena | batch-local (touched islands and their arenas); stage-end (S7b (5), SKY) | the islands' records against their arenas' role index and the casters beneath |
| basement accesses (II.7.3, item 64): an access of source `basement` only within `UndergroundRule.access.reachM` of the open element it reaches; a concealed use's accesses `knownTo: 'secret'`; a stored `state` `open`, `locked` or `bricked`, read `collapsed` only while its element is closed (II.6) | batch-local (the buildings and access points the batch touched) | the basement ring against its element by the kernel's read services on the element's part (J-A12.32) |
| the underground systems and the undercity (II.7.5, II.7.6; item 65): an undercity only where a void source exists and a lifeline reaches it, never above its rung row's `maxNeighbourhoods` (II.7.5); every underground building's heights under its chamber's ceiling less `ceilingClearCm`; every `UndergroundLink` typed, carrying `knownTo`, its ends `link_end` vertices of two different parts, never a vertex two parts share | batch-local (touched links, galleries, chambers and buildings); stage-end (the undercity stage; the connection stage) | the links' vertex roles in each part; the ceilings against the heights; the lifeline walk from each undercity neighbourhood |
| closures (§7.3 item 9, item 66): every piece a closure created is named in its event's closure record, every piece it names exists, and a generated connector is reachable end to end inside its system's depth band | batch-local (the closure's batches) | the closure record against the committed pieces; one walk along each connector |
| access and entrances (§2.6 rules 1–2; §2.5; items 29, 30, 50, 70; J-A30.71): every plot with ≥ 1 access edge; every building with exactly one `main` entrance on the side §2.6 rule 1 gives it, and a side or rear entrance only where its plot has an access edge beyond the frontage; a hidden plot reachable by a chain of access edges through passage, alley and court faces to a public corridor, an access edge on a sealed passage skipped | batch-local (entrances, access edges); stage-end (S10, and after every re-cut of §7.1's `join` / `split` and of §4.11's ladder: the reachability walk) | touched plots and buildings; one walk per hidden plot of the touched blocks (`faceNeighbours`, §3.4) |
| concealed institutions (§4.7, item 63): every concealment other than `none` placed in one of its allowed modes, its concealed rooms reachable only from its concealed entrance or its front's service side | stage-end (S10b, S11 per district); batch-local (the buildings an edit re-fits) | the placements against the concealment value; a stored plan's room graph walked from its concealed and service doors |
| informal clusters (§4.7 S11, item 70): every structure with its own door on a footpath face connected to an access edge; each pair at its row's fire gap; each structure's households within its row; no cluster on a plot floored at middle or above while that stock stands, nor in a district whose band range excludes the squalid band | batch-local (touched plots) | a walk from each structure's door over the plot's footpath faces; the gaps by the spatial index |
| no way centreline crosses a footprint; no way crosses a reservation (§4.2 S3) | batch-local | touched ways, footprints and reservations |
| a way on ground part 0 crosses an enceinte's trace only at a gate (§4.2 S3 (7), §4.8): at the base rungs an epoch's growth crosses at gates alone (S5c's legality, §4.4), and a drawn way across any run — a `breached` or `dismantled` one of item 114's condition (§2.7) included — makes its gate there by S7's operator (§7.1, §7.3's S7 row), drawn as its run is; the one exception is a refounded village's tracker crossing a ruined former enceinte at a gate gap or a `breached` or `dismantled` run (item 114's openings; V07 §3.12a (4) (d)); a raised way's deck, on its own part, meets a trace by §2.7's support step (3) and (6) (d) (§4.8 *Gates*) | batch-local | touched ways and wall edges against the runs' `condition`; §13.2's fixtures: a refounded village's tracker crossing a breach with 0 violations, and a TOWN epoch beside a breached run growing no way through it |
| **a way crosses water only on a deck, and a ground-part-0 deck only over water** (item 110 (b)): every part-0 edge with a `way` role whose two sides lie in water (the L0 parents of both side faces are water faces) belongs to a `Bridge`'s deck span (the edges between its two deck vertices, carrying `deck`; fords included) or to a **harbour work** (§4.8's definition), which stands in the water rather than crossing it; a `pier` or `quay` way joining two land faces across water crosses on a deck like any way. Every part-0 deck span crosses a water face with both ends on its banks; a raised way's deck, on a ground part from 1 (§3.4), may span land, ways and water, its piers footprints on part 0. A wall trace crosses water only at a water gate | batch-local | touched way, deck and wall edges against the L0 parents of their two sides, by index (§2.2 rule 2); for a touched `pier` or `quay` edge with water on both sides, one walk of its connected `pier` and `quay` edges counting the distinct L0 land faces its vertices touch (a harbour-wall row's few hundred edges at most). It covers S1's river decks, S3's moat and canal decks, S5a's outer-moat decks, a carve's decks and S7's harbour furniture; §13.2's harbour fixtures include a two-arm mole and a detached breakwater; a raised way crossing ground ways with zero junctions (item 110 (f)) |
| **NF-P5**: no lane crosses a wall strip, and no L3 band, setback, glacis, tower or gatehouse face is cleared or split by an L1 or L2 batch — in every generation batch, and in every edit batch except for the enceintes whose wall-strip parts the edit's chain **declares** it rebuilds by S10's step (0) or removes. The dry run of every chained edit computes that declaration — the enceintes whose strips any of its batches changes, each "rebuilt" or "removed" — and every batch of the chain carries it; the check reads the declaration, never a list of edit kinds. Edits that declare: a tree-scoped re-derivation of a scope holding wall-strip faces (§7.3 item 2); S7's operator (`drawWall`, a moved trace vertex, a re-traced run, `gateToJunction`); S1's water operator for every strip its L1 batch changes — a re-traced run's strips, and a setback or glacis line it anchors and cuts outside a re-traced run (§7.3 (b) 3, 7, 8); a carve for every strip its batches (1)–(3) change and its step 4 re-derives (§4.11); as removals, `wallToWay`, `contractWall` (§4.11) and an enceinte's `delete` (§7.1); and, in a refounded village's VS4 batch, the crossing of a ruined former enceinte at a gate gap or a `breached` or `dismantled` run (V07 §3.12a (4) (d)), declared removed over the crossing's width. A lane still never crosses a strip (J-DET-39) | batch-local | touched lanes against the `setback` and wall edges; the commit record's removed and changed L3 faces of kind band, setback, glacis, tower or gatehouse against the declared enceintes; a CI registry test fails when an edit operator or conversion that can write a wall strip's L1 lines or L3 parts has no declaration path; §13.2's fixtures commit a canal carved across a wall between two towers and a river move whose new bank cuts a glacis line without crossing the wall with 0 NF-P5 violations, while a `drawWay` lane across a strip is refused |
| footprints ∩ (wall band ⊕ setback) = ∅ on both faces of every wall | batch-local | touched footprints and wall bands |
| every building's wing rings (and a stored composition's composed wings) pass §2.6's wing rule 4 after every carry, in generation and in edits | batch-local | the buildings whose footprint faces the batch changed, by §2.6 rule 4's tiered test |
| water ∩ footprints = ∅ | batch-local | touched footprints and water faces |
| every built bridge within ± 10° of the channel normal, measured on the deck and on the way; a `site` has no span and is outside every deck row (§2.7) | batch-local | touched crossings |
| exclusive land uses never overlap | batch-local | touched land-use faces |
| every `LightSource` stands in its host's faces on its host's arena by §2.7's rule (a door light within half a lattice diagonal of its ring edge, §7.4's world-point table), its height within its rule row's band; no light lit on a building whose Works stands before its finished stage, its record kept and unlit (§4.7's *Light sources* (5); §4.11) | batch-local (touched lights and their hosts) | `pointLocate` on the host's `PlatKey` (a door light: its squared distance to its host footprint ring's nearest edge at most ½ cm², in exact integer arithmetic); the rule row's band |
| reference integrity: every reference out of a touched record — people, relations and uses included (a dependent's carer resolves; a building's `use` and a use's `buildings` resolve both ways, §2.7) — names a live id; every reference into a record the batch removed is carried over (§6.3) or reported as an orphan | batch-local | the reverse-reference index |
| identity: every fresh address differs from every live and tombstoned address, and no two live entities share a lineage key (§6.3) | batch-local | at mint, O(1) against the identity set |
| every length field carries a unit (§2.1) | batch-local | at schema write (and §2.1's lint) |
| every stored geometry reference resolves; no geometry carries a dead entity (§3.10) | stage-end, save | the kernel's reverse indexes |
| every gate joined to the network and the plaza; the roads leaving each walled stage (on ground part 0 or at a raised gate; a deck passing over a stretch laid after its raised way is no crossing, §2.7's support step (6) (d)) equal its gate count (§4.2 S3 (7): its N main gates and any harbour gate placed); an outer enceinte's gates ≥ its arterial crossings (on ground part 0 or at a raised gate; a deck passing over a stretch laid after its raised way is no crossing, §2.7's support step (6) (d)); a coastal town's harbour joined to its plaza through a gate, crossing a moat only on a deck (§4.2 S3 (11)) | stage-end (S7) | one graph search per enceinte |
| every gate and weld vertex on its trace; stage 1's trace within its distance bound of the stage-1 boundary (§4.2 S3 (9)) | stage-end (S5) | the trace's role rows; one distance pass per trace |
| every `baseLane` portal matches one S8 lane end and vice versa, spaced by the portal gap (§4.6 (7)) | stage-end (S8) | the `Seam` records against the lanes' end vertices |
| every quay reachable from the town without crossing a wall except at a gate | stage-end (S7, S9) | one graph search |
| no branch re-joins its parent within k segments (§4.4) | stage-end (S5) | per growth stage |
| a sealed enclosure only when declared | stage-end (S7) | per trace |
| contours never cross a shore — a check of the clip construction, never an abort path | stage-end (S1) | F-CONTOUR's clip (§5.2) |
| names unique within their kind's scope (§9.6); a new entity never renames an existing one; a generated name changes only by one of §6.3's draw cases | stage-end (S13a) | per naming run |
| neighbourhood character (§4.5, item 72): one district per district-defining dossier instance; every building's prosperity-driven state inside its district's band range; a shared building's partition weights summing to one over its powers and over its sectors; the character vector and band range recomputed from committed state equal the maintained ones | stage-end (S12c; each epoch's character step); load (the recomputation) | the district assignments against the dossier's district-defining instances; the bands against the ranges; the vector recomputed from the plots (J-DET-12) |
| every requested feature (river through the core, N gates, a harbour when coastal, …) delivered, degraded or omitted and reported with its tier (§5.1 (7)) | stage-end | the report's `requested` list |
| containment complete: building ⊂ plot ⊂ block ⊂ district, 100 % | stage-end | per-batch containment counters summed, not a model walk |
| the canonical document validates against its schema (`Recipe.salts` keyed by rerollable concerns only, §6.1); the recorded digests are the maintained model and records roots (§6.2) | save | at write |
| the decoded snapshot passes §2.9 step 3's checks (a frozen view: chunk hashes only, §2.9 step 2); the replayed model and records roots equal the recorded ones | load | §2.9 step 3's recomputation before the first edit, or §6.2 (iii)'s off-edit-path one; the verification replay (§2.9) |
| a full recomputation of the model tree's root and the records tree's root from their leaves equals the maintained root (§6.2) | CI-only | every B-CITY generation and B-EDIT sequence (the digest-maintenance oracle) |
| digests equal across platforms, under time dilation, under district permutation (the derived-complete digest), and replay = session | CI-only | §6.5 (9), §7.3 item 7 |

Label collisions are not a model invariant: label placement is view data (§9.4). Hard invariants abort the batch, which
rolls back to the previous arena version while its ladder continues; soft ones (statistics bands) go to the report. CI
counts hard violations per 1 000 cities and requires 0 (O3 b). **Cost rule:** validating a batch costs O(touched faces ×
log n), never O(model); per-edit validation time for a fixed scope is flat from TOWN to METROPOLIS within ± 20 % (a
cost test, §13.2: TOWN → CITY at M2a; TOWN → METROPOLIS at M2b, which measures METROPOLIS — generated from M1 on, §16).
*Pre-decided fallback:* an invariant whose batch-local check breaks that flat cost moves to stage-end scope — still
hard, checked later in the same stage. Every row runs at every rung (§5.1 (10)); a row whose subject a rung lacks (an
island below CITY, an undercity at TOWN) holds vacuously and reports its count as 0.
=== END ===

=== REPLACE ### 5.4 The generation report ===
### 5.4 The generation report

```ts
interface GenerationReport { outputVersion: string;
  recipe: { seed: Seed; rung: Rung; presetId?: string /* Recipe.presetId (§2.9): the preset the town was made from; absent when none */ } /* the recipe line, read by V09's Report panel */;
  stages: { name: StageId; work: Record<string, number> /* operation counts against the stage's declared work limits (§5.1 (5)) */;
    attempts: number /* the stage's tier-3 retries (its ladderUses at attempt > 0); read by §13.5's ladder-use row */;
    warnings?: Record<string, number> /* a stage's own non-kernel warning codes — S3's `W_WALLED_BY_BARRIERS` and `W_MOAT_DRY` (§4.2 S3), S10b's `W_DOSSIER_EDGE` (§4.7 S10b), S5a's and S7's `W_RAISED_CROSSING` (§2.7's support step (6); §4.4 *Outer moats*; §4.8) and the underground's (V04 §1b.1; item 338) */;
    ladderUses: { cause: FailureClass; code?: ReportCode; rung: number; tier: 0|1|2|3|4|5|6; entity: Id; key: string /* the stream key's textual form, §6.1 */ }[];
    invariants: { name: string; scope: 'batch'|'stage'|'save'|'load'|'ci'; pass: boolean; count: number }[] }[];
  requested: { feature: string; delivered: 'full'|'degraded'|'omitted'; tier: number; entity?: Id; cause?: FailureClass }[];   // §5.1 (7)
  prefix: { seq: number; state: 'applied'|'bent'|'refused'; bent?: string; reason?: string; closest?: Id[] }[];   // the outcome of each creation-prefix declaration read ahead (§4.1): a skeleton's import and a clerk's creation check read it (item 470)
  requestedVsBuilt: Diff[]; autoResolved: { param: string; value: unknown; reason: string; layer: OverrideLayer }[]; unserved: Id[]; unplaced: Id[];
  bugs: { cls: FailureClass; entity: Id; key: string /* the stream key */; stage: StageId }[];   // §5.1 (8); CI requires it empty
  dossier: { element: Id; state: 'placed'|'rejectedSite'|'blocked'; site?: Id; rules?: string[] /* the hard rows the placement fails, if any */; closest?: Id[] }[];   // §7.7: every dossier-backed element's standing placement state, its live rejections and any blocked positive placement (item 20)
  dossierNotes: PortNote[];   // the document's DossierBinding.notes (§7.7 item 12) at the report's seq, in identity order; [] for a document with no binding (V08 §4.6; item 390)
  epochs: EpochReport[];   // one per folded epoch, with its chronicle (V06 §2.10; item 339); kept across a rebase: the reports of epochs before `base.seq`, which no replay can rebuild, stay in the saved block and a verification replay never drops them (V06 §3.15.5)
  changes: ReportEntry[];   // items 17 (d), 20, 22 (b): what moved, in `seq` order — derived from the log's events and the lifecycle events they wrote, never stored; §11.2's `report.changed` sends the entries appended since its last delivery
  kernel: { engine: string /* the engine id, §3.7 */; warnings: Record<string, number> /* a count per Warning code of §3.1 */; downgrades: number /* W_DOWNGRADE's count (§3.8) */; workLimitHits: number } }
interface Diff { subject: string /* the requested parameter, feature or row — e.g. a district's fabric row */; entity?: Id; requested: unknown; built: unknown; reason: FailureClass | ReportCode }
type ReportEntry = { seq: number /* the event that caused it */; epoch: number /* the epoch it folded in; 0 before the first */;
    change?: { changeId: string; reason?: string } /* on an entry a dossier event caused: its DossierChange's id and reason (§7.7 item 13; item 75) */ } & (
    { kind: 'reject' | 'lapse' | 'place'; element: Id /* the dossier-backed element or assignment member */; site: Id /* the plot */ }
  | { kind: 'open' | 'close' | 'relocate'; use: Id; from?: Id; to?: Id /* plots: `from` for close and relocate, `to` for open and relocate */ }
  | { kind: 'mutate'; plot: Id; mutation: number /* index into the event's EditBase.mutations */ }
  | { kind: 'disruption'; overBudget: boolean /* the event's EditBase.disruption holds the detail */ }
  | ({ kind: 'rename' } & Rename /* §7.1: an epoch's rename of a district past its identity hysteresis, §6.3 case (5) (item 72) */)
  | { kind: 'works'; works: Id; op: 'start' | 'cancel' | 'finish' /* item 67: a Works started, cancelled or reaching its last stage (§4.11); its stages between are derived from the week, never entries */ });
type FailureClass = string;   // a class id: a row of §5.2's two tables, or of a volume's own failure section (V04 §3.11, V06 §3.17)
type ReportCode = 'work_cut'|'time_over'|'no_crossing'|'not_built'|'unserved'|'unplaced'|'no_alternative'|'bug'|'aqueduct_no_source'|'toll_bridge_dry';   // the table below
interface Telemetry { stageMs: Record<StageId, number>; timeOver: StageId[]; verifyMs?: number }   // session-only; never saved, never in any digest
```

**Report codes.** A rung that needs more than its (class, rung, tier) triple names one of these codes — the only codes
a ladder writes; each is a `MsgRef` key whose arguments the report panel renders (V09 §4.9):

| code | class | where it lands |
|---|---|---|
| `work_cut` | F-WORK | `kernel.workLimitHits`, the stage's `work` counts |
| `time_over` | F-BUDGET-TIME | `Telemetry.timeOver` (session only) |
| `no_crossing` | F-RIVER | `ladderUses`; the river's `requested` row |
| `not_built` | F-RIVER (a requested river island) | `requested` (`omitted`) |
| `unserved` | F-ROUTE | `unserved` |
| `unplaced` | F-SITING | `unplaced`, with its blocking hard rows and closest options |
| `no_alternative` | New random's content check (§5.1 (6)) | the dry run's report and the event's rerolls |
| `bug` | a bug abort (§5.1 (8)) | `bugs` |
| `aqueduct_no_source` | the aqueduct reason met with no higher source within reach (V08 §2.6b (1) (b); item 337) | `ladderUses` |
| `toll_bridge_dry` | a dossier toll bridge on a site with no water to cross (V08 §2.6b (3); item 337) | `ladderUses` |

Every kernel warning (`W_CUT_SLID` among them, F-CUT's foot slide) is counted under `kernel.warnings` by its §3.1 code.

The **recipe line** names the seed, the rung and the preset the town was made from (`Recipe.seed`, `.rung`, `.presetId`;
§2.9) — provenance only, since the recipe's delta already holds the preset's values. The report is a **derived cache**: rebuilt by every derivation (and by the verification replay on load), saved only in
the document's `derived` section so the panel can show it before verification finishes, and excluded from the
canonical form and every digest. It records stream keys **only for ladder uses** (any rung from tier 2 up, retries at
attempt > 0 included) and bug aborts, not for every stream the town used. Timings are telemetry: the worker host
measures them outside the model packages, the UI shows them, and nothing saved or hashed contains a millisecond. The
same object is the UI's compact, dismissable panel (O16) and the API's `report(doc)`; every ladder use is replayable
from its printed key (MFCG's replayable attempts kept). A dossier event's or a positive placement's own consequences —
what moved, was joined or vacated, and why — are that event's disruption report (`EditBase.disruption`, §7.1, §7.3
item 4, §7.7), stored in the event; the `dossier` list is the standing state the report shows after any derivation, and
`dossierNotes` beside it the port's standing account of how it read the host's record (§14 `PortNote`), which the panel
lists after the placement state. The **`changes`** list is the report's account of what moved: every placement,
rejection and lapse (§7.7), every use opened, closed or relocated (§4.11, item 17), every mutation record (§4.7 S11),
every disruption report (§7.1), an epoch's renames (item 72) and each Works' start, cancellation and completion (item
67), each entry naming the event whose record holds the detail; the whole report recomputes it in `seq` order, and
§11.2's `report.changed` delivers it — the host's one account of every move, closing and reopening (§7.7; J-A22.75). An
entry a dossier event caused names that change's `changeId` and reason (item 75), so the host sees why, and nothing
flows back (J-A20.81). A dossier the port refuses (§7.7 item 15) makes no model, or at an absorb no event, and so
nothing in the report: the refusal is the port's result (§14), never a report entry. A derivation that meets missing
or empty inputs still produces a whole report: an empty list is `[]`, never absent, and a document with no binding,
no epoch or no creation prefix carries empty `dossier`, `dossierNotes`, `epochs` and `prefix` lists (the report's
schema test, §13.2).
=== END ===

=== REPLACE ### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated) ===
### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)

Every entity has two identities: an **address** that everything points at (edits, locks, assignments, pins, labels,
households, exports, the host) and a **lineage** that keys its random streams. They start equal and separate only when
an entity is re-derived.

* **Lineage key** = (arena key — layer and part, §2.2 —, the derivation unit's lineage hash, stage, creation epoch,
  creation index, the derivation unit's reroll[, dup]); `lineageHash` is its 64-bit hash, cached in the arena. The
  **derivation unit** is the entity whose derivation run created this one, declared per stage in the registry: the town
  for S4 routes (in destination order) and S6 districts (in seed order); the growth stage for S5 ways (in acceptance
  order); the L1 cell a way split, for new cells (split ordinal); the cell for S8 blocks and lanes; a template's seed
  ways and plazas take the stage id `S8.seed` (§6.1; item 345), so no seed's lineage key can equal a lane's of the same
  cell; the block for S10 plots and alleys; the plot for S11 buildings, yard parts and households; the household for
  people (member ordinal); S6's run for `Seam` records (creation index by the run's lowest-then-leftmost vertex); the
  S5c growth run, the district's S8 run (for `baseLane` portals) or the creating edit for portals; the parent surface
  district for an undercity neighbourhood (II.7.5), whose district's lineage continues its parent's; the system for its
  galleries and chambers (II.7.6; its part in the arena key); the connection stage's run for links (creation index by
  the pair's canonical order); the host for a light source (its light rule row and its ordinal along the host — a door
  light's entrance ordinal, a street light's ordinal along its way strip — as the creation index; §4.7 *Light sources*
  (1)); the target for a Works (its start week as the creation index); the creating edit event (its `seq`) for
  anything a user draws or builds; for any other kind (cells and junctions made by a growth commit, walls, water
  bodies, bridges, greenery), the stage run that created it. The **creation index** is the deterministic creation order
  of that unit's run, or the canonical order the stage declares (for faces and vertices: by their lowest-then-leftmost
  lattice point). `StageDecl.lineageUnit` (§4.12) names each stage's derivation unit by its kind:

  ```ts
  type EntityKind = string;   // a type of §2.8's entity registry, as Identity.kind and an address's `kind:` prefix spell it ('cell', 'block', 'plot', 'building', 'household', 'district', 'system' …), or a run unit: 'town' (the town root), 'run' (the stage run that created the entity, its creation index the run's canonical order) or 'edit' (the creating event, its `seq`)
  ```

* **Address id** = `kind:token`, prefixed `<layer><part>/` outside the ground layer — the island's part on the sky
  layer (item 203), the system's part on the underground layer, the sewer network's part 0 written bare (`sky2/plot:…`,
  `under/tunnel:…`, `under3/gallery:…`); a part number is part of the address and, like it, never reused (§3.4,
  J-A65.31). For a generated entity the token is the base-32 form of its lineage hash at creation (13 characters); for
  a user-created one it is the hash of the creating event's `seq` and its ordinal — the pieces a closure creates (§7.3
  item 9, item 66) and the entities a sugar event's expansion creates (§7.1, item 101) are user-created entities of
  their event, their ordinals in the closure's dependency order and the expansion's order. The address is opaque: the
  parent is a field and is never parsed from the id (J-DET-1).
* **Never reused; one collision rule.** Minting runs after the succession matching below. A fresh entity whose natural
  address equals a live address, a tombstone, or an address its own batch retires takes the suffix `~k` with the
  smallest free k. A fresh lineage key equal to that of a live entity outside the batch's re-derived set (a survivor —
  a locked plot, say) takes the smallest free `dup` component, so no two live entities share draws; the entities the
  batch itself replaces are not collisions, which is what lets a faithful Regenerate (keep settings) re-mint their
  lineage keys, match them by anchor and reproduce them exactly. Collisions are resolved in the batch's canonical order
  (records sorted by lineage hash), so the session and a replay resolve them identically. An address that an `undo`
  withdraws (§7.4) is free again, but only the same derivation — the same unit, lineage and reroll, which is what a
  `redo` or a repeated New random re-runs — can mint it, so nothing is re-bound to an unrelated entity.
* **Carry-over — survival and succession.** Whenever a scope is re-derived (regenerate, Adjust, re-derive from Sk, a
  local operator of §7.3, template replacement, migration, an epoch, the history replay):
  - an entity that is **not re-derived** — outside the invalidation set, a fixed input (locked, pinned, edited,
    assigned or declared, §7.2), or merely re-parented — **survives**: it keeps its address and its lineage (so its
    draws do not change); only its `parent` field and a `reparent` lifecycle event change;
    - the kept parts of a designation mutation (§4.7 S11), the rooms a re-cut of a stored plan keeps along the interior
      ladder (item 28 (f), §7.3) and the standing fabric of an epoch — a vacant, derelict, ruined, cleared or reused
      building, a neglected, breached or superseded enceinte, a silted, caved-in or sealed tunnel, a waning or settled
      island (§4.11, II.6) — survive in exactly this sense: address and lineage kept, their state a lifecycle change; a
      `reuse … build` successor raised on a cleared trace succeeds it at the trace's address (`supersede`), regrowth on
      an old plot re-uses the plot's address, and a `raiseIsland` mints the island's arena key and lineage from the
      town's lineage, the slot index and the epoch component, so the same history raises the same island (item 8;
      J-A8.61); a use (§2.7) keeps its own address as it moves — its anchor is (its plot's address, its role) — while
      the building it leaves keeps its own (item 17); the parts a mutation adds are user-created entities minted from
      the causing event's `seq` and ordinal (below); a dossier-backed assignment is a fixed input like any assignment,
      so its element survives every re-derivation of the ground under it (§7.7);
  - an entity that **is re-derived** is matched to the fresh entities by its anchor: the fresh entity with the same kind
    and class family whose anchor lies nearest within the kind's hysteresis radius **succeeds** it — it takes the old
    address and the old generated name with its naming record (every reference re-binds to it; §7.3 item 4 decides which
    overrides move with it) and keeps its own fresh lineage (its draws are the new ones: New random really re-rolls); a
    `carry` event records the lineage change, and the same batch re-owns the successor's faces and roles under the
    address (`setOwner`, `retypeEdges`, §3.4), so geometry and address move together;
  - an old entity with no successor becomes a **tombstone** in the archive (§2.8) whose `supersededBy` names the fresh
    entity covering its anchor point, if any; a fresh entity with no predecessor keeps its fresh address;
  - lifecycle events are written only for changes (existence, flags, a lineage change, supersession, re-parenting), so
    a re-derivation that reproduces its entities exactly leaves the model digest unchanged (J-DET-2).
* **Names follow the address, and follow their inputs.** A generated name — its text and short form — is handed to a
  successor with the address, together with its naming record (§2.8: the naming slices its last draw consulted and the
  salt it used), as a lock or an assignment is; so the bridge a river edit re-sites, the street a New random re-cuts and
  the district a boundary edit regroups keep their names. S13a **draws** a name only in five cases:
  1. for an entity with no predecessor, with the town salt;
  2. for every unedited name under a town-wide `rerollLayer(naming)`, with the new town salt;
  3. for the entities an ids-scoped `rerollLayer(naming)` lists (§7.1), each with its per-entity salt: the dry run gives
     each listed entity the salt one above the largest its name has been drawn with (the town salt and every earlier
     ids-scoped salt the log gave it), and a re-drawn name equal to the old one advances that salt by §5.1 (6)'s
     advance rule; the event stores the salts actually used, so a replay repeats neither the choice nor the advances;
  4. for an unedited generated name whose **naming inputs changed**, with the salt its naming record holds. Case (4)
     runs whenever S13a runs over the name's entity: after an `adjust` of the pack list (a pack added or removed, a
     corpus selected or deselected, §7.6); after an `editTable` or `editPreset` that changes a naming slice (§7.6); in
     an upgrade's mapping (§7.5); in a `frozenImport` rebase (§2.9 step 2), over every unedited generated name; at the
     event that ends the name's protection — an `unlock` or an `unassign` that frees it, or an `undo`, `redo` or
     `revert` whose result removes the `setAttr`, `lock` or `assign` that held it (§2.8's dormant record); and in any
     re-derivation whose scope reaches S13a. It compares every slice the name's naming record cites with the current
     effective tables, and a slice whose hash differs, or that no longer resolves (a deselected corpus, a removed row),
     re-draws the name;
  5. at an epoch, for a district whose identity row changed at that epoch's character step (§4.5, item 72 — a change the
     identity's hysteresis already filtered): its unedited generated name is re-drawn on its `naming` stream with the
     renaming epoch's component (§6.1) and the salt its naming record holds, the old text moved to
     `District.nameHistory` (§2.5); a protected name — a `setAttr`, a lock, an assignment, a dossier naming claim
     (§7.7 item 16, item 82) — is never re-drawn, its naming record staying dormant (§2.8). The rename is listed in the
     epoch's report (§5.4) and stored in the event (`EditBase.renames`, §7.1) like case (4)'s, without a confirmation:
     an epoch is the history's own step (§4.11). A replay re-draws it identically (J-A72.62).

  Each field of a culture or ancestry row is its own naming slice (§7.6), and a name's record cites only the fields its
  draw read, so selecting another corpus for one field re-draws exactly the names drawn from that field: a street list
  chosen for a culture renames that culture's streets, never its districts or quarters. So **a carried name is kept
  exactly while its naming inputs are unchanged**; a change of the features a grammar guard reads (a district that lost
  its gate) is not a naming input and renames nothing (§9.6) — in generation and in every edit; only case (5) renames a
  district at an epoch, and only past its identity's hysteresis. Every draw uses the entity's `naming` stream — keyed
  from its entity key (§6.1) with the salt of its case and the attempt — and writes the name's naming record anew.
  **Case (4)'s renames are confirmed like fates** (the one statement; §7.3 item 4 and §7.4 cite it as "case (4)"): the
  dry run lists each, old and new text side by side, in the edit's fate report with its other unprotected
  consequences; the edit commits after the user confirms them (an action whose dry run lists any returns `confirm`, a
  `frozenImport` rebase included), and the confirmed renames are stored in the event (`EditBase.renames`, §7.1). A
  replay or a receiving client re-draws them identically, because the draw is a function of the stream, the salt and
  the inputs at that log position; one that computes different renames reports a mismatch under §7.3 item 4's rule. A
  user-set name (`setAttr`) is an edited attribute, a locked name path a fixed input and an assigned name held at its
  assignment (§7.7); none is re-drawn while protected, and each keeps its naming record dormant for the event that ends
  the protection (§2.8). When carrying or a re-draw brings two equal names into one uniqueness scope (§9.6 — a district
  merge that joins two lanes of the same name), the entity whose address sorts later re-draws on its own stream, and
  the rename is listed in the edit's fate report (J-DET-37, J-DET-46).
* **Anchors and hysteresis.** Matching is by distance, never by quantised cell: candidate (old, fresh) pairs within the
  radius and of the same class family are sorted by (distance, old id, fresh id) and assigned one-to-one greedily in
  that order, so coincident anchors resolve by id. An overlap-anchored entity of zero length or area never reaches
  matching — the kernel refuses it first (§5.1 (9)).

| kind | anchor | radius | class family |
|---|---|---|---|
| plot | its highest-class frontage: (way address, start offset along the way) | 0.5 m along the same way or its successor | use family (residential, commercial, institutional, agricultural) |
| building | footprint centroid | 0.5 m | building class family (a table row: small dwellings; halls and manors; religious; workshops and stores; towers and keeps; …) |
| yard part (§2.5) | (its plot's address, its part kind, its ordinal in the site plan) | the same plot | part kind |
| block, cell | centroid | 2 m (block), 5 m (cell) | — |
| `Frontage` record (§2.5) | (its block's address, the address of the way it fronts); its split by a stretch conversion below | the same block and way | — |
| district | its seed feature's address | same feature | district kind family |
| way | its end junctions' addresses; else overlap ≥ 50 % of its length | — | way class family |
| `Corridor` record (§2.4) | its way's address | the same way | — |
| junction, gate, tower, pin | position | 1 m (junction, pin), 2 m (gate, tower) | kind |
| castle (§2.7) | its claim's centroid | 2 m | — |
| decoration (§2.7) | (its host face's owner address, its rule row, its ordinal) | half its row's spacing from its recorded point | decoration class |
| bridge | its deck's midpoint, on the same river (the water body's address or its successor) | the crossing-site search band of §4.2 S1 (5) (`crossing.searchBandM`, a cell of the base settings row, V11 §3.1) | kind (bridge, ford) |
| enceinte, water body, greenery, land use | overlap ≥ 50 % (IoU) | — | kind |
| household, person, label | (plot address, ordinal); (household address, ordinal); target address | — | — |
| use (§2.7) | (plot address, role); a relocation moves it by its event (item 17) | — | use class family |
| institution (§2.7) | its binding key when dossier-backed (§7.7 item 12); else its use's address | the same key or use | institution kind |
| base wing (§2.6; V02) | (its building's address, its key); after a re-derivation, by role, then its ridge midpoint in the building's frame (item 346) | 0.5 m | wing role |
| room of a stored plan (§2.6) | centroid within its wing, per storey — for a wing standing on another (V02's `BaseWing.on`), per its storey counted from its first level (`s − s₀`, V03 §3.3); the address's level part records the level at minting and is never re-read as the storey (item 347) | 0.5 m in the wing's frame | any role: a re-cut along the interior ladder keeps a room's address on its ring even when its role changes, an owner's parlour becoming a family's room (item 28 (f), §7.3) |
| entrance (an indexed vertex role `('entrance', building, i)`, §2.2 rule 7) | carried with its wing by `carryWings` (§2.6); re-matched by (wing, side, offset) when the wing is re-derived | half the side's length | entrance role |
| passage (§2.5, item 30) | (its front plot's address, its kerb end — the midpoint of the passage face's edge on that plot's frontage kerb) | 0.5 m along the same kerb | — (one family) |
| access point (II.7.4, items 12 and 64) | (its element's address — the tunnel, gallery, chamber or underground building it reaches, in its part — and the position of its `('access_point', id)` vertex on that element's kerb or wall) | 1 m | `AccessPoint.kind` |
| tunnel, gallery (§2.7, II.7, II.7.6) | its end junctions' addresses; else overlap ≥ 50 % of its length, in its own part | — | `Tunnel.kind`; the gallery's system kind |
| chamber (II.7.6, item 65) | its floor face's centroid, in its own part | 2 m | the system kind |
| underground link (II.7.6, item 65) | its two ends' element addresses | the same pair | `UndergroundLink.via` |
| undercity neighbourhood (II.7.5, item 65) | its parent surface district's address and its void system's part | the same parent and part | — |
| light source (§2.7, item 68) | (its host's address, its light rule row, its ordinal along the host) — a door lantern by its building and entrance, a street light by its way strip and ordinal | 1 m from its recorded point | the light kind |
| Works (§4.11, item 67) | (its target's address, its start week) | the same target and week | the Works kind |
| condition overlay, deposit site, power relation (§2.7, item 88; staged, empty in the base) | its binding key (§7.7 item 12) | the same key | the record kind |
| sky island (II.6, item 10) | its slot: the key `raiseIsland` mints from the town's lineage, the slot index and the epoch (J-A8.61) | the same slot | — |
| sky access (V05) | (its island's address, its role, its ordinal) (item 476) | the same island | `SkyAccess.kind` |
| seam (NF-P6) | its two districts' addresses and its first chain's address | same pair and chain | — |
| portal | position | 1 m | portal kind (`baseLane`, growth, edit) |

  *Split through an anchor:* the child left of the directed cut keeps the id (§3.6 (5)). *Households and people:* a
  household's address survives a re-derivation of its plot by succession (anchor: plot address and ordinal), so a
  person's key — (household address, member ordinal, birth epoch), §10.3 — is stable wherever the household is.
  *Bridges:* when S1's water operator re-sites the crossings of an edited reach (§7.3 (b) 2), each old deck is succeeded
  by the re-sited deck nearest its old midpoint within the band, so the bridge keeps its name, its assignment and its
  way's reference. *Measurement (M1, B-EDIT-lite):* 1 cm perturbations of every vertex keep ≥ 99.9 % of addresses.
  *Pre-decided fallback:* the building and plot radii double to 1 m and an IoU ≥ 0.5 test joins the class-family check.
* **The matching routine, its budget and its fallback.** One routine hands addresses on in every re-derivation —
  scoped regeneration, Adjust, Re-derive from Sk (from S1 the whole town is re-derived and matched), a local operator,
  template replacement, epochs, migration and the upgrade mapping of §7.5. *Point-anchored kinds* (plots by frontage
  offset, buildings, blocks, cells, junctions, gates, towers, pins, the castle, decorations, bridges, passages by kerb
  end, access points) are matched through a uniform grid per (kind, class family) whose cell is the kind's hysteresis
  radius, so every candidate of an old entity lies in its 3 × 3 cell neighbourhood; candidate pairs are collected,
  sorted by (distance, old id, fresh id) and assigned greedily. *Overlap-anchored kinds* (ways and tunnels without
  matched end junctions, enceintes, water bodies, greenery, land use) take their candidates from the kernel's spatial
  index (§3.3) and compute the overlap on those candidates only; a sky island is matched by its slot, a staged dossier
  record or a dossier-backed institution by its binding key, and a key-anchored kind (yard parts, `Frontage` and
  `Corridor` records, base wings, sky accesses) by its key, no distance read. *Budget:* ≤ 2 µs per re-derived
  point-anchored entity and ≤ 20 µs per overlap-anchored one, median, included in the scope costs of §12.6. Measured on
  synthetic anchor sets (Apple M1, Node 24; `docs/validation/bench/fixall_det_r2_match.out`): 0.60 µs per entity for a
  450-building district regeneration, 0.59 µs for a 30 000-entity CITY re-derivation (0.38 µs when the fresh town is
  unrelated to the old one) and 0.59 µs for an 80 000-entity METROPOLIS mapping at a 2 m radius. *Measurement (M0 d,
  then M1 on B-EDIT-lite and a Re-derive-from-S1 fixture):* the routine inside the engine, on real anchors, per kind.
  *Pre-decided fallback:* matching runs per static-index partition (§3.3) — each old entity's candidates are first
  taken from the fresh entities of its own district's partition, and only the entities left unmatched are matched
  across partitions — which bounds every grid by one partition; because an entity near a district boundary can then
  take a farther candidate inside its own district, the switch is a declared shift (§6.4).
* **JOIN and SPLIT — the address by the anchor, the lineage continued (item 31 (c); J-A31.73).** A joined plot takes its
  address by the anchor rule from the member whose frontage anchor it keeps; the other members become tombstones with
  `supersededBy` = the joined plot, and `members` is history. Its **lineage** is not fresh: the fused plot continues the
  lineage key of its largest member by area (ties by address id) — the exception to J-DET-2, which gives a re-derived
  successor the address only — so the streams of its buildings and yard parts continue from that member's and the same
  seed under the same history re-cuts the same fabric; the epoch component of every draw (§6.1) keeps an epoch's re-cut
  distinct from the parent's original draws without breaking the tie to them (the owner: modifications of the original
  seed, not new rolls). A SPLIT keys each child by the parent's lineage key with the child's index as its creation
  index: the child that keeps the parent's frontage anchor keeps the address and the others take fresh addresses; every
  child takes the continued lineage, the parent's lineage key with its child index; a later SPLIT **resurrects** a
  member whose anchor matches — the one permitted reuse of a tombstoned id, recorded as a `resurrect` event, safe
  because a JOIN's member ids were never given to another entity — and the resurrected member takes its address from the
  tombstone, its lineage from the parent and the child index, and its `builtBand` (§2.5) from the rung-3 event that
  re-cut it, never from the tombstone's last record; only an `undo` restores that record exactly (§7.4). A **tunnel
  record** split by a stretch conversion (II.6, J-A11.43) follows the same rule, the centreline's first vertex standing
  for the frontage anchor: the part holding it keeps the address, the other parts take addresses minted from the
  causing event's `seq` and ordinal, and every part continues the tunnel's lineage with its part index. A block's
  `Frontage` record (§2.5) that the same split cuts at a stretch end (II.6) follows the same rule: the part holding the
  record's first kerb edge in the centreline's order keeps its address, every other part — two where the record spans
  a whole interior stretch — takes an address minted from the causing event's `seq` and ordinal, each part continues the
  record's lineage with its part index, and an `undo` restores the one record (§7.4). A mutation continues lineage; only
  a re-derivation takes a fresh one — New random, and every successor the matching above gives in a re-derived scope
  (Adjust, Re-derive from Sk, a local operator of §7.3, template replacement, migration, what an epoch re-derives)
  (J-DET-2).
* **Plan damage — one threshold per plan element, no new id (g item 123; J136).** Each plan element of a building — each
  wall run (an outer wall or a partition), floor area, door, window, stair, roof bay over a room and furniture piece,
  and below ground the cellar's and the crypt's kinds (V04) — draws ONE uniform u on `plan.damage` (§6.1), keyed by (the
  building's lineage — an underground building's own; a cellar's or crypt's element the building above's —, the
  element's id): the id's parts — its element kind and V03 §2.2's plan-part id (`wall:`, `op:`, `win:`, `core:`,
  `furn:`); a floor area, the roof bay over a room, a choir flight and a `cellarVault` by their room's address; a
  `cryptVault` cell by its room's address and its grid node, the one `cryptVault` of a crypt whose ring holds no cell
  centre by its room's address (V04 §5.6 (2)) — folded into the key through the one mixer as structured components,
  never a string, with creation epoch and epoch component 0 and no rung counter, reroll or salt, at the stage id its
  `plan.*` concerns carry (§6.1). Its **threshold** is t = lo + u · (hi − lo), [lo, hi] its element kind's range (V11
  §3.25.10's `damage.elements` row: outer walls and ground floors late, partitions and upper floors early; item 123
  (c)); the walls material acts only through the decay level's rate (V06's `decayLevel`, V11's `damage.materials`). The
  draw is §6.1's fixed-key draw in all but persistence: fixed for the element's life, never re-drawn, minting no id and
  moving nothing, and compared, wherever a reader draws the plan, with the building's **decay level** (V06's
  `decayLevel`, derived and never stored; §2.6 step 7): the element shows damaged exactly while the level is above 0 and
  at least t, compared only from its entry week into the plan (V03 §5.6 (2) (a)–(b); for an element a restoring event's
  re-cut mints, the week that restoration ends, before which it draws as built, V06 §3.23 (3)) — but for §2.6 step 7's
  one case without a threshold: a roof bay over a room of a roofless wing (`RoofSpec.kind` `none`) of a `decayed` or
  `ruined` building is damaged whatever its t and level. A level of 0 damages nothing else, so a building never decayed
  and under no disaster look (§2.6 step 7) draws its plan unchanged (`item123.damage`) whatever its kinds' ranges.
  Damage is therefore monotone in the level (a higher level's damaged set contains a lower's), never relocated, and
  leaves in reverse threshold order as a restoration lowers the level. Every room, wall, opening and id is the intact
  plan's (T123-1); for a seed, each element breaks at one level on every engine (T123-3; §6.5 (9)). An element a stored
  plan's re-cut mints (V03 §3.11) draws by its own new id; a kept element keeps its id and so its threshold.
* **Dossier bindings never re-key (item 74).** A dossier re-binding (§7.7 item 12) re-points a binding row of
  `Document.dossier` and never re-keys a map address: the element's records keep their ids, lineage and geometry. A
  dossier name change that carries no receipt is a removal plus an addition (§7.7 item 12), and the addition mints
  nothing until the solver places the new element, from its placing event's `seq` (above).
* **Document identity.** `docId` (a UUID) is minted when a document is created, or taken from the host when it passes
  one (§11.2; item 459), kept on save, and re-minted on clone and save-as; addresses are document-scoped, so a clone
  keeps them. At the API and bridge boundary every id is rendered `<docId>/<id>`, so a host holding two towns never
  confuses their plots. Exports carry addresses and a supersedes table (tombstone → successor).
* **Workers** merge results in lineage order, never arrival order (the one statement; §6.2 and §6.5 (6) cite it).

**The scope of stability, stated** (O2 b, e):
1. *Independent concerns* — adding or changing a concern (a decoration layer, a name grammar, label rules) changes no
   other concern's draws; changing a naming input re-draws only the names whose records cite it (case (4) above).
2. *Scoped rerolls* — New random on a scope changes nothing outside its effective scope (§7.3).
3. *Upstream changes* — a change to stage k's code or tables changes stage k's outputs and, through their lineage and
   inputs, what is derived from them: a declared cascade shift (§6.4, §13.3), never a silent one; stages upstream of k
   and independent of it stay byte-identical.
4. *Edited documents* — stability across such changes comes from carry-over by anchor and from migration (§7.5), never
   from stream keys.

*Measurement (M0 d and M1):* minting and matching within the budget above; B-EDIT fixtures for `drawBoundary`, district
merge and split, `outskirtToDistrict`, regenerate around a lock, a course-knot move that re-sites a bridge (the bridge
keeps its address and name), New random on a district (every matched successor keeps its name; only entities without a
predecessor draw one), a district merge that joins two equal lane names (the later address re-draws, reported), and the
recycling case (a superseded, assigned building whose creation slot is reused) — 0 duplicate ids and 0 silent re-binds
(every reference resolves to its successor or is reported). The naming-input fixtures are §13.2's.
=== END ===

=== REPLACE ### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10) ===
### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10)

1. Topology is §3.2's (integer centimetres, exact predicates).
2. Fields, costs and weights are IEEE doubles; `+ − × ÷` and `Math.sqrt` are exact by specification; every other
   real function goes through `dmath`, the vetted fdlibm port (§3.1; D-23).
3. **The lint is an allowlist.** In model packages — and in every adapter or provider whose output reaches the model —
   the only `Math` members allowed are `abs, floor, ceil, round, trunc, sign, min, max, sqrt, imul, clz32, fround`,
   plus the arithmetic operators. The allowlist also holds for the view code whose output reaches a bit-compared
   digest: `@plat/labels`, every implementation of `ObstacleSource` and `RoleIndex` (§14), the functions they call, and
   the S14 builder code that writes the display-list columns they read — `bbox`, the geometry ranges and `GeomTable`,
   `layer`, `z` and the symbol extents computed from the style sheet's sizes (a rotated symbol's extent uses `dmath`) —
   and §8.10's instance function with every function it calls (the stamp, grid and line layouts, the per-instance look
   draws and the density edge test), which the model-format exporters and override resolution run in the generation
   worker and whose positions §13.3 compares byte for byte across engines; and the CPU reference light pass of §8.4 with
   every function it calls (item 68) — its buffers and light values are compared byte for byte across engines by (9)'s
   lighting test, while the GPU implementation, held to it by a tolerance, stays outside (J-A68.62); and the weather
   stream's timeline function (§6.1 *The weather stream*: the spell draws, the gap's exponential through `dmath.log`,
   the rate integral, the kind's pick and the length) with every function it calls, whose spells (9)'s weather-timeline
   test compares across engines (T124-9). CI finds that code as the import closure of those implementations, column
   writers, the instance function, the CPU reference light pass and the timeline function, from the TypeScript program,
   so a module that joins it is linted without being listed; the rest of `@plat/render` — paint programs, backends,
   compositing — stays outside, because its output is pixels compared by visual regression (§13.3, §13.4).
   `**` is allowed only with a literal integer exponent from 0 to 4, and the build rewrites it into explicit
   multiplications (exponentiation is implementation-approximated in JavaScript); every other power goes through
   `dmath.pow` (S1's river-width law `w0 · acc^0.4` is `dmath.pow(acc, 0.4)`). Also forbidden: `Math.random`, `Date`,
   `performance`, timers, `crypto.getRandomValues`, DOM access, locale-dependent string operations (`toLocaleString`,
   `localeCompare`, `Intl`), `Array.prototype.sort` without a comparator, and any dependence on object-key or `Map`
   iteration order beyond insertion order. The lint also enforces §3.2 (8)'s division rule (`ratio()`), and it scans the
   dossier port's adapter boundary (item 73): no module of `plat/` outside `@plat/port`'s adapter folders names a key of
   the host's dossier — the adapter's key list (§14; its field table, V08 §2.4) is the scan's input — so the host's
   vocabulary lives in one folder.
4. **Vendored dependencies are scanned too.** Every third-party library a kernel adapter imports is vendored at a pinned
   version and passes the same allowlist scan at each version change; an audit record (library, version, scan result,
   each exception with its wrapper) is kept in `@plat/kernel`. A library that fails (for example one that calls
   `Math.hypot`) is patched or wrapped in its adapter before adoption.
5. Every sort uses a total-order comparator with an id tie-break (the OS `ObjectMap` key-order hazard cannot occur).
6. Pool workers follow §3.3's overlay-and-merge protocol (§6.3 *Workers*); no result depends on arrival order, and no
   model package reads time (§5.1 (5)).
7. **One boolean and offset engine per output version, on every host** (D-14): no host may silently run a different
   engine; changing the engine is an output-version bump with a declared shift.
8. **Host providers.** Host tables are §6.2's. Host code registered as a provider (`ContentProvider`, §14) passes a
   double-run check at registration — the same request run twice in two fresh workers must return identical digests —
   and its results are recorded in the document's `hostContent` block, keyed by (provider id, version, input hash), and
   read from there on replay (§2.9, §11.4), so the document replays without the host. Setting packs follow the same rule
   through the document's `packs` block (§2.9).
9. **Determinism tests (CI)** — each on one fixture per base rung (§5.1 (10)), with a METROPOLIS fixture at the
   population cap:
   * *cross-host* — identical digests on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, pool
     sizes 0–3;
   * *time dilation* — the golden suite under a shim that scales every clock read × 10 and × 0.1 gives byte-identical
     per-stage digests;
   * *derived-complete digest* — every district's S10, S10b, S11 and S12b and the hinterland unit's (S12b named
     explicitly), derived for 50 METROPOLIS seeds in three random orders with pool sizes 0–3, give identical digests
     (the laziness contract, §4.1);
   * *op-order determinism* (§13.2) and *placement digests* (§13.3);
   * *headless = UI* (O11 f);
   * *replay = session* — replaying base and log gives the session's model digest **and records digest** on every
     B-EDIT sequence (§7.3 item 7 (i)), including the naming-collision fixture of §7.3 item 7 (i), sequences with undo
     and redo from several sessions, edits made during load verification under both choices of a forced mismatch (§2.9
     step 4), and edits made before a records mismatch, re-applied (§2.9 step 3);
   * *truncation identity* — a B-EDIT sequence folded with its undone pairs kept and with them truncated gives the same
     model digest **and records digest** (§7.4), including a redo followed by a user-created entity, whose address must
     be the same in both folds, a `setAttr(name)` + `undo` pair, a `lock` + `unlock` pair and a naming `rerollLayer` +
     `undo` pair, each around a corpus selection — the freeing event re-drawing the name by §6.3's case (4), listed,
     confirmed and stored in the event, and the naming records restored with the names (§2.8) — and a corpus selection
     + `undo`, truncated, saved, reloaded and redone, its pack still in `packs` (§2.9);
   * *links and documents without their inputs* — §6.4's pack, user-corpus, provider and rebased-town cases;
   * *checks under the recording version* — a `keptSnapshot`-rebased CITY document upgraded across a test output
     version whose field driver and digest leaf encoding differ from `from`'s opens editable after a reload and replays
     to the session's digest; a frozen view of a fixture written by a test build labelled o(N−3) opens with no mismatch
     message, while one with a chunk's bytes altered reports damage and refuses the `frozenImport` rebase (§2.9 steps
     2–3, §7.5);
   * the double-run check of registered providers (8), and the distinct-key test of §6.1;
   * *click-order identity* (item 28) — the derived-complete digest extended to the elaboration rungs: for 50 CITY
     seeds, every district's wings and every clicked building's plan derived in three random click orders, under
     `elaborate: 'click'` and `'view'`, with the cache dropped to `absent` between runs, give identical model digests and
     records digests and byte-identical cached results per (entity, rung, input digest) across hosts; a layout re-roll
     leaves the wings, entrances and stair core byte-identical and a roles re-roll leaves every ring and opening
     position byte-identical (§6.1; the B-PLAN fixtures are §13.2's); **the interior ladder** (item 28 (f)) — a building
     whose occupants' band and household count change twice between clicks (a `relet` by hand and a band fall by an
     epoch) gives the same plan, byte for byte, with a click after each change and with one click at the end, and the
     same again with the cache dropped between them; its shell's leaf digest is unchanged by every re-cut; and a return
     to the as-built band and count gives the as-built plan exactly (§7.3's canonical prior);
   * *history determinism* (items 20, 22) — the same seed with the same ordered history of dossier events, rejections,
     positive placements and edits gives one model digest on every host, and two histories that reach one dossier give
     two valid maps whose difference is confined to their events' disruption sets (§6.2, §7.7; the fixtures are
     §13.2's); the history replay at generation (g item 113) is byte-stable per seed and history;
   * *epoch keys* (g item 113) — on a document generated from its history, live epochs folded across 0x8000 (0x7FFF to
     0x8001) key draws none of which equals a replay epoch's (`0x8000_0000 + r`): §6.1's distinct-key test over both
     ranges, the live epochs numbered from 1 after the prefix whatever R, and no lineage key a replay epoch mints
     equal to one a live epoch mints (§6.1's epoch component);
   * *session-history independence* (item 52; J-A52.61) — for 20 seeds, a seed's model digest generated first in a
     fresh process equals its digest when generated after 50 other maps generated earlier in that session and after
     every view toggle and zoom stop: no render draw touches a model stream (§6.1), Enter's successor is (seed + 1) mod
     2³², not a stream's state (§6.1), and no cache is keyed by anything but its content (§8.10's stamp tiles are built
     with the product and content-hashed). The references' mechanisms are the reason the test exists: in MFCG 12710731,
     VG 1.6.9 and NG 1.2.2 the renderer's leftover stream state becomes the following map's seed, and each caches its
     tree-spacing tiles per session; Dwellings (itch 17195045) resets its generator from the clock for some houses;
     Fantasy Manor 1.0.0 build 890 seeds from the page's load time. Ours is independent of the session by construction,
     and the test keeps it so;
   * *dossier fixtures* (item 83, T73-8) — the same dossier fixture of §13.2's B-DOSSIER-lite and the same seed give the
     same model digest on Node x86 and arm64 and in the nightly five-engine run;
   * *works stages* (item 67) — a Works' drawn stage at week w is a pure function of its record and w: the drawing at a
     week, reached directly or by scrubbing weeks forward and back, is byte-identical, and no digest moves (§6.2);
   * *lighting* (item 68) — the CPU reference light pass gives byte-identical light for the same model, lights, view and
     time on the five engines; the GPU pass lies within §13.4's tolerance of it; a light's flicker is a pure function of
     its render key and the view's time (§8.4);
   * *plan damage* (g item 123) — for every building of a B-CITY-lite fixture, its decay level stepped from 0 to 1, the
     damaged elements at each level are byte-identical on the five engines and contain the previous level's, each
     element breaking at the same level for a seed (T123-3); every element id equals the intact plan's (T123-1), and a
     level of 0 under no disaster look draws the plan byte-identically (`item123.damage`; §6.3 *Plan damage*) but for a
     `decayed` or `ruined` building's roof bays over a roofless wing's rooms, damaged at every level (§2.6 step 7);
   * *weather timeline* (g item 124) — a fixed session seed, view time and set of **Start a shower now** presses replay
     the same spells — kind, start and length — on the five engines (T124-9); a scripted year-position change from a
     week with no live kind into a live week, and back, replays identically on the five engines, a spell starting in the
     live week and a press in the week with no live kind starting none, and so does a view hour crossing a kind's
     `hours` under `light: 'time'`, and a press while a spell is in force, the running spell fading out before the
     pressed one starts (T124-9); two session seeds give byte-identical model digests and tiles, with the effects on and
     off (§6.1 *The weather stream*);
   * *skeleton round trip* (item 101) — a map's declared subset exported as a skeleton (§11.1) and re-imported under its
     seed reproduces its model digest; a clerk's transcript of tool calls, replayed, gives the session's digest; one
     declaration made on the canvas, through the tool API and in a skeleton file gives one event (the elegance bars that
     schedule these are §13.2's).
10. **Second implementations.** *The WebAssembly accelerator* of §3.7 (J-K8) compiles a hot loop from the same integer
    algorithm as the TypeScript loop it replaces, so it must reproduce that loop's integer outputs byte for byte: a
    cross-implementation test runs the golden suite with the accelerator on and off and requires identical per-stage
    digests. It is output-neutral and moves no golden; the TypeScript loop stays in every bundle. *The Clipper2-WASM
    engine* (§3.7's pre-decided fallback) is a different engine: it cannot reproduce the arrangement engine's integers,
    replaces it as the single engine on every host (7) with a declared golden shift (§3.7, §13.3), is pinned and
    vendored (4) and named in the report (§5.4); its determinism test is (9)'s cross-host one (J-DET-28).
=== END ===

=== REPLACE ### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation ===
### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation

```ts
interface EditBase { seq: number /* from the document's nextSeq; never reset; survives rebase; an event an epoch carries in `EpochInputs.dossier` takes its seq when the epoch is appended (§7.7 item 6; J-A22.76) */; author: 'user'|'host'|'epoch'|'migration';
  session: string /* the authoring session, per document and author (§7.4): its undo and redo stacks; never read by the fold. Every event the dossier port emits carries the reserved session 'host:port', constant, with no group (V08 §3.6 (6); item 359): no user's stack ever holds one */;
  group?: number /* one undo step: every event of one `edit` (or `confirm`) call that carries a group shares it; the engine writes it at commit as the `seq` of that call's first event, whatever number the client sent, so a group is unique in the log and `undo.of` names it (§7.4 Targets) */;
  renames?: Rename[] /* on every event whose fold re-draws a name by §6.3's case (4), and an epoch's case (5) renames */;
  dossier?: DossierRef /* set by the dossier port (`@plat/port`, §14) on every event a dossier change generates through the host door (§11.4): the element's binding key, opaque to the module (§7.7 item 12) */;
  dossierChange?: DossierChange /* set by the port with `dossier`: the change envelope (§7.7 item 13) */;
  proposedBy?: 'clerk' /* item 101: an event a clerk proposed and the user accepted — the author stays the user; the exports' provenance reads it (§11.1) */;
  closure?: ClosureRecord /* §7.3 item 9 */;
  creation?: true /* set by `generate` on the log's creation prefix at positions 0…k (§7.4 Replay semantics); a prefix event keeps its `proposedBy` through `generate`, the skeleton export and its import (V10; item 365) */;
  mutations?: MutationRecord[] /* §4.7 S11's records of the designation mutations the event ran, persisted with it like `renames` (item 18) */;
  disruption?: DisruptionReport /* a dossier event's, a positive placement's or a relocation's consequences as its dry run listed them (§7.7 item 5) */ }
type Rename = { id: Id; from: string; to: string };   // the name's text before and after, as the user saw them; also §5.4's ReportEntry rename
type DossierRef = { element: string; version?: string };   // `element` the binding key of §7.7 item 12, `version` the host's product line; the module reads it, never writes it
type EditId = number;   // an event's `seq`: what a batch's edit scope (`BatchScope`, §3.3) and a seam amendment's cause (II.1) name
type PointsForm = { points: PointCm[] /* the declared anchors: one seed, two to four corners, a source and a mouth, a shore point, or a brush's or lasso's samples */;
  levelCm?: Cm /* water's level form */; spring?: true /* a lake's point-and-level form fed by a spring: an oasis (g item 111) */;
  sizeM2?: number /* a harbour basin's size; for a quarter, its target area, clamped into its kind's size band — absent: the band's median, the grower's default (item 348) */ };   // item 101 (i): the minimal declaration of a shaped thing — the event stores the derived shape, resolved, as its geometry
type Cardinal = 'N'|'E'|'S'|'W';
type Locus = { rel: 'in'|'on'|'at'|'near'; target: Id; side?: Cardinal };   // a roster line's or a place's locus: "in <quarter>", "on the harbour", "at <gate>", "north side of <square>", "near <place>" — item 16's relation templates as hints
type RosterLine = { name: string /* '' for an unnamed place, which S13a names (item 571) */; cls: BuildingClass; locus?: Locus; element?: string /* with a dossier connected: the binding key of the dossier element the line places */ };
type RungKey = string;   // `${Id}#${rung}`: a stage-3 rung's reroll counter in a `regenerate` event's map (§6.1)
interface DisruptionReport { cost: number; budget: number /* the request kind's row, §7.7 */; overBudget: boolean; moved: { use: Id; from: Id; to: Id | null /* null: vacated */ }[]; joined: Id[][]; vacated: Id[]; mutated: Id[]; why: { id: Id; rule: string }[] }
type EditScope = { ids: Id[] } | { ring: PolygonCm; key: PlatKey; level: Level } | { kind: 'shade'; island: Id /* V05: Update shade now */ }
  | { kind: 'people'; households: Id[] /* §10.3's re-derive people: the chosen households' people re-derived, diffed, under the current person tables */ };   // resolved to the effective scope at dry run and stored resolved
type EditFate = { id: Id; fate: 'kept'|'carried'|'orphaned'|'discarded'; to?: Id; reason: string };
type FieldStroke = { path: PointCm[]; radiusCm: Cm; falloff: 'linear'|'cosine'; amount: number /* relative Δ: field units, or cm for terrain; with `mode`, a share 0–1 */;
  mode?: 'flattenTo' /* terrain only: move the ground under the stroke toward `levelCm` by `amount` instead of adding a Δ — the base's one flatten mechanism (item 366) */;
  levelCm?: Cm /* flattenTo's level — absent: the mean ground height under the stroke's footprint, resolved into the event by the dry run */;
  water?: 'locked'|'follow' /* terrain only; default 'locked' (§7.2, §7.3) */ };
type EditEvent = EditBase & (
  | { t: 'lock'; ids: Id[]; paths?: string[] } | { t: 'unlock'; ids: Id[]; paths?: string[] }          // paths: attribute-level locks
  | { t: 'pin'; ids: Id[] } | { t: 'unpin'; ids: Id[] }                                                  // only ever an explicit user action — never emitted by viewing
  | { t: 'moveVertex'; key: PlatKey; at: LatticePoint /* the vertex's position before the move */; sig: VertexSig /* its role signature at the edit, §2.2 rule 5 */; to: LatticePoint }
  | { t: 'moveCourseKnot'; water: Id; ordinal: number /* the knot's ordinal in WaterBody.controls, §2.3 */; at: PointCm /* its position before the move */; to: PointCm }   // a river's control knot is S1's recorded input, not an arena vertex
  | { t: 'warp'; key: PlatKey; fromLevel: 0 | 1 /* 1 by default; 0 also moves water and coast */; strokes: WarpStroke[] }   // one staged warp session, committed on Apply
  | { t: 'drawWay'; points: PointCm[]; class: WayClass /* 'aqueduct' among them, §2.4 */; widthCm: Cm; raised?: true /* item 110 (b): the deck in its own ground arena part (§3.4), its two ends its feet (§2.7's `RaisedWayRecord.feet`), crossing the ways beneath with no junction */;
      walk?: { headingCdeg: Cdeg; class: 'road'|'track'; maxLengthM?: M } /* V07 §4.2: resolved into `points` at the dry run */; key?: PlatKey /* V05: a sky island's arena; default the ground */;
      from?: PointsForm /* two or more points: each consecutive pair routed by S4's router at the dry run (§4.3); with `raised`, by the raised-way course solver */ }
  | { t: 'drawWater'; kind: WaterKind; add: PolygonCm[]; subtract?: PolygonCm[]; line?: PointCm[]; widthCm?: Cm; key?: PlatKey; from?: PointsForm /* a lake: one point and a level, with `spring` an oasis; a river: a source and a mouth; a harbour: a sea level, a shore point and a size */ }   // add rings unioned, subtract rings = land brush (islands)
  | { t: 'drawWall'; points: PointCm[]; kind: Enceinte['kind'] | 'retaining'; closed: boolean; highSide?: 'left'|'right' /* retaining only, relative to the points' order; absent: the side whose mean ground within 10 m of the chain is higher */; key?: PlatKey;
      from?: PointsForm /* two or more points: the run derived along ridges and contours by S5a's trace; for a retaining wall, along the slope break nearest the drawn run */ }
  | { t: 'placeGate'; enceinte: Id; at: PointCm; expansion: number }   // sugar (item 101)
  | { t: 'drawGreen'; polygon: PolygonCm; kind: Greenery['kind']; densityPerHa?: number; key?: PlatKey }
  | { t: 'drawBoundary'; polygon: PolygonCm; district?: Id; kind?: string /* the district-kind row that steers a points form's snap */; key?: PlatKey; from?: PointsForm /* one seed, two to four corners or a lasso: grown along block edges (below) */ }   // snaps to whole L1 cells
  | { t: 'quarter'; boundary: PolygonCm /* resolved at dry run */; from?: PointsForm; kind: string /* a district-kind row */; name?: string; band?: string; district?: Id;
      fabric?: FabricStrategyId | 'auto' /* V01: the layout the quarter asks for (item 349) */; terrace?: 'on'|'off' /* V01: the terracing it asks for (item 350) */;
      sky?: { altitudeCm?: Cm; institution?: string /* an IslandInstitution kind */ } /* V05 §4.2: its points are world points */; expansion: number }   // sugar (item 101)
  | { t: 'roster'; lines: RosterLine[]; expansion: number }   // sugar (item 101)
  | { t: 'group'; name: string; quarters: Id[]; expansion: number }   // sugar (item 101): a region label group on §9.1's quarter tree
  | { t: 'terrace'; stroke: FieldStroke; levelCm?: Cm /* absent: the ground height at the stroke's first point */; expansion: number }   // sugar (item 110 (a)): below
  | { t: 'declareEnd'; anchor?: Id | PointCm; boundary?: PolygonCm; kind: VillageEnd['kind']; name?: string }   // V07 §4.2 (item 357): the lasso's plots join the declared end, keyed by the event's address and held
  | { t: 'drawFootprint'; polygon: PolygonCm; cls?: BuildingClass; use?: Id; heights?: Partial<Heights>; key?: PlatKey }
  | { t: 'build'; plot: Id; cls: BuildingClass; use?: Id; footprint?: PolygonCm; heights?: Partial<Heights> }
  | { t: 'moveFootprint'; id: Id; deltaCm: VecCm; rotateCdeg?: number }
  | { t: 'swapUse'; a: Id; b: Id }
  | { t: 'fill'; scope: EditScope; arrangement: SitePlan['arrangement']; cls?: BuildingClass }
  | { t: 'setAttr'; id: Id; path: string; value: unknown }
  | { t: 'setAttrMany'; ids: Id[] /* resolved at dry run */; query?: Query /* what the user asked, kept for display */; path: string; value: unknown }
  | { t: 'paint'; target: 'roofKind'|'roofColour'|'wallColour'; ids: Id[] /* resolved under the brush */; brush: BrushPath; value: string }
  | { t: 'paintGround'; region: PolygonCm; cover: string; colour?: string }                           // a style region (FTG's texture brush) — outside the model digest
  | { t: 'instance'; entity: Id /* or a plan room, `room:<building>/<level>/<i>` (V03) */; ordinal?: string /* for a room: its furniture item's ordinal */; point?: PointCm; op: 'add'|'move'|'remove'|'restyle'; to?: PointCm;
      style?: Partial<InstanceStyle> /* §8.10's; for a room's furniture Partial<{ glyph: string; rotCdeg: number; wCm: Cm; dCm: Cm }> */ }   // an ordinal-addressed event's dry run also fills `point` with the instance's generated position; the first on a room stores the composition (item 374)
  | { t: 'delete'; id: Id } | { t: 'merge'; ids: Id[] } | { t: 'split'; id: Id; cut: PointCm[] } | { t: 'join'; ids: Id[] }   // on plots, split and join are item 31's splitting and fusion; delete: below
  | { t: 'rejectSite'; element: Id /* the dossier-backed assignment or its placed member */; site: Id /* the plot */; op: 'reject'|'lift' }   // item 20 (b): a rejection, never a removal (§7.7 item 3)
  | { t: 'placeAt'; plot: Id /* '' when `from` is given: the plot derived by the dry run and written into the event (item 367) */; element?: Id /* a dossier-backed element or assignment member pinned here */; designation?: Designation /* §4.7 S11: a use the generator controls, designated here */; lift?: boolean; from?: PointsForm /* one point */ }   // item 20 (g): positive placement; lift frees the plot
  | { t: 'setEntrance'; building: Id; op: 'add'|'move'|'remove'; index?: number /* the entrance edited, by its indexed role */; role?: Entrance['role']; wing?: number; side?: number; offsetCm?: Cm }   // item 29
  | { t: 'drawPassage'; plot: Id; from: PointCm; to: PointCm; widthCm: Cm }   // item 30 (c): a covered passage under the front building's ground storey, as §2.5's passage face; sealing and reopening are convert ops (§4.11)
  | { t: 'drawTunnel'; points: PointCm[]; kind: Tunnel['kind']; widthCm?: Cm; headroomCm?: Cm; system?: Id /* item 65: a gallery of that underground system, in its part (II.7.6); absent: the sewer network, part 0 */; from?: PointsForm /* two points: the route derived at the dry run (II.7); item 355 */ }   // items 11, 12: a `tunnel` chain on the underground arena — never a `drawWay` (U2, II.7.3); width and headroom default to II.7.2's profile row, `navigable` derived (§2.7)
  | { t: 'drawChamber'; system: Id | { newKind: 'ruin'|'cavern'|'catacomb' }; polygon: PolygonCm; floorCm?: Cm; from?: PointsForm /* one point and a size, or three or more points */ }   // item 65; with `newKind`, a closure (§7.3 item 9) creating the system with its first chamber (item 361)
  | { t: 'addLink'; a: Id; b: Id; kind: UndergroundLink['kind']; via: UndergroundLink['via'] }   // item 65: a link between elements of different parts (II.7.6)
  | { t: 'addUndergroundAccess'; building: Id; target?: Id /* an element, else the closure's target order (II.7.6) */; kind?: AccessPoint['kind'] }   // item 66: a closure edit (§7.3 item 9)
  | { t: 'placeAccess'; kind: AccessPoint['kind']; role: AccessPoint['role']; ground: PointCm; element: Id /* the tunnel, gallery, chamber or underground building it reaches (II.7.4) */ }   // item 12 (d): a new AccessPoint opening at `ground`, its `access_point` vertex on `element`'s kerb or wall at the nearest point; its underground end moved by `moveVertex` on that vertex, its opening by `setAttr` on `ground.at` (re-hosted by `pointLocate` on the ground's `PlatKey`, `ground.host` rewritten, refused outside II.7.3's admitted ground); removed by `delete`
  | { t: 'placeSkyAccess'; island: Id; top: PointCm /* local; snapped to the rim at the dry run */; foot: PointCm /* world */; kind?: SkyAccess['kind']; role?: SkyAccess['role'] }   // V05 §4.2
  | { t: 'setRoomRole'; building: Id; storey: number; room: Id; role: RoomRole }   // the plan events (item 28; records §2.6's): a role change re-derives what hangs off roles — windows, door kinds, furniture — and moves no wall
  | { t: 'moveWall'; building: Id; storey: number; wall: Id; deltaCm: Cm }         // slides a partition wall along its normal (mergeFaces then splitFace on the rung's transient arena, §3.4)
  | { t: 'splitRoom'; building: Id; storey: number; room: Id; cut: [PointCm, PointCm]; roles?: [RoomRole, RoomRole] }   // splitFace
  | { t: 'mergeRooms'; building: Id; storey: number; rooms: [Id, Id]; role?: RoomRole }   // mergeFaces, never across a wing joint; the surviving role chosen or given, the removed wall's openings dropped
  | { t: 'setOpening'; building: Id; storey: number; wall: Id; at?: Cm; kind: 'door'|'arch'|'open'|'none'; hinge?: 0|1; swing?: Id /* V03 §2.1; item 354 */ }   // an entrance's door moves with its entrance (setEntrance) and is never removed here
  | { t: 'setWindow'; building: Id; storey: number; wall: Id; at?: Cm; op: 'add'|'move'|'remove'; kind?: 'window'|'slit'|'light' /* V03 §2.1 */ }   // exterior walls only
  | { t: 'moveStairCore'; building: Id; core: Id; bay?: PolygonCm; kind?: StairCore['kind'] }   // at least one of bay and kind; the bay on every storey it serves, each storey's partition re-running around it, plan.layout kept where the wing is unchanged
  | { t: 'setRoomUnit'; building: Id; storey: number; room: Id; unit?: Id }             // item 28 (f): the household whose dwelling unit the room belongs to (`Room.unit`, §2.6); absent for a shared, service or circulation room
  | { t: 'setHearth'; building: Id; storey: number; room: Id; op: 'add'|'move'|'remove'; wall?: Id; at?: Cm }   // V03 §4.2 (item 352): the stack re-placed under the rung's rules, each storey it crosses re-cut
  | { t: 'setMassing'; building: Id; op: MassingOp } | { t: 'setComposition'; building: Id; op: CompositionOp }   // stage 3 (V02 §4.1, which declares both ops; item 351); the first one stores the composition
  | { t: 'revert'; id: Id }   // "reset to generated": one undoable event applying, in reverse log order, the inverses of every logged event whose target is this entity (its own edits only; §7.4); ctrl / cmd+click (§14's keymap, MFCG's ctrl-click reset)
  | { t: 'regenerate'; scope: EditScope; mode: 'keep'|'newRandom'; rerolls: Record<Id | RungKey, number> /* absolute, per scope entity — with `rung`, the rung's counter: the rerolls actually used (§5.1 (6)) */; rung?: 'wings'|'rooms'|'plan'|'plan.layout'|'plan.roles'|'plan.furnish' /* item 28: New random on one rung of one building */; discardEdits?: boolean; fates: EditFate[] }
  | { t: 'adjust'; param: string; value: unknown; fromStage: StageId; fates: EditFate[] }                 // Adjust, and Re-derive from stage k
  | { t: 'setField'; field: 'prosperity'|'density'|'greenery'|'terrain'; stroke: FieldStroke; key?: PlatKey }          // a relative Δ (or terrain's flattenTo); the stroke list is composited once (§7.2)
  | { t: 'assign'; assignment: Assignment } | { t: 'unassign'; id: Id }
  | { t: 'moveLabel'; id: Id; placement: Placement } | { t: 'hideLabel'; id: Id; hidden: boolean }      // LabelEntity.pinned / hidden — model data (§9)
  | { t: 'setLayer'; layer: Layer; spec: Partial<LayerSpec> }
  | { t: 'editTable'; table: TableId; ops: RowOp[]; provenance?: 'host'; fates?: EditFate[] /* the confirmed fates of §7.6's first-reader-stage re-derivation */ }
  | { t: 'editPreset'; preset: string; ops: RowOp[]; provenance?: 'host'; fates?: EditFate[] } | { t: 'setStyle'; ops: RowOp[]; provenance?: 'host' }
  | { t: 'rerollLayer'; concern: RerollableConcern /* generated from the concern registry (§6.1) */; salt: number /* town-wide: the concern's new salt; 0 with `ids` */;
      ids?: Id[] /* `naming` only: re-draw these entities' names */; salts?: Record<Id, number> /* with `ids`: the per-entity salts actually used (§6.3) */ }
  | { t: 'convert'; op: ConversionOp /* §4.11, V06's EvolveOp and V05's island ops among them */ }
  | { t: 'startWorks'; target: Id; kind: Works['kind']; startWeek?: number /* default: the document's week */; change?: WorksChange /* the hand change the Works shows, folded at once at this event's position under its `seq`, author and session (§4.11 (1)); absent only for a repair, decay or clear of the target */ } | { t: 'cancelWorks'; works: Id }   // item 67: a timed Works on the weekly clock (§4.11; J-A67.72)
  | { t: 'placeLight'; kind: string /* a light rule row's kind */; point: PointCm; host?: Id /* default: the entity under the point */; heightCm?: Cm; key?: PlatKey }   // item 68: a hand-placed LightSource (§2.7)
  | { t: 'closeup'; district: Id; strategy: FabricStrategyId /* informative: the district's fabric at the event */; params: CloseupParams /* V01 §2.5 */ }   // logged before the first presentation edit inside a close-up (PART II)
  | { t: 'epoch'; epoch: number; inputs: EpochInputs }                                                  // an epoch is an event in the log (§4.11)
  | { t: 'dossierFacts'; changes: DossierChange[] /* each with its full before and after carried facts */; quarantined: { key: string; reason: string; since: number }[]; lateCalamities: string[] /* the whole held list after this absorb (§4.11 *The clock* (4); V08 §3.6 (4)) */; notes: PortNote[]; notesCleared: string[] }   // V08 §3.6 (4): the absorb's ledger; no model effect; folding it rebuilds Document.dossier
  | { t: 'dossierRecord'; kind: 'condition'|'deposit'|'powerRelation'|'person'|'customChain'|'customService'; key: string /* the binding key */; op: 'put'|'retire'; fields?: Record<string, unknown> /* on put: §2.7's fields less id, lifecycle and derived fields */ }   // V08 §2.5: the staged records' one event
  | { t: 'rebase'; reason: RebaseReason; stateDigest: Hash128; version: string /* the output version whose model packages computed stateDigest — the document's output version from this event on; a frozenImport sets it to the library's current version (§2.9 steps 2–3) */;
      at: number /* the log head its state materialises: the previous event's seq, or h₀ when kept after edits made during load verification (§2.9 step 4); any other value is refused with E_REBASE_AT and nothing is appended (§14) */ }   // §2.9
  | { t: 'upgrade'; from: string; to: string; mapping: MigrationMap /* §7.5 */; baseDigest?: Hash128 /* with a rebased base: base.state's model root computed under `to`, the root later loads under `to` check it against (§2.9 step 3, §7.5) */ }
  | { t: 'undo'; of: number /* seq of the event undone, or of the first event of its group */ }        // applied at the head through the same fold (§7.4)
  | { t: 'redo'; of: number /* seq of the undo it reverses */ } );
type RowOp = { op: 'set'|'insert'|'delete'; rowKey: string; field?: string; value?: unknown; baseRowHash?: Hash64 };   // rows by stable key, never by position
type WarpKernel = 'displace'|'liquify'|'relax'|'bloat'|'pinch'|'equalize'|'swirl'|'jitter';
type WarpStroke = { kernel: WarpKernel; centre: PointCm; radiusCm: Cm; innerRadiusCm?: Cm; strength: number; dragCm?: VecCm };
type WithoutBase<E> = E extends unknown ? Omit<E, keyof EditBase> : never;   // an event's own fields, member by member of a union
type WorksChange = WithoutBase<Extract<EditEvent, { t: 'build' | 'convert' | 'join' | 'split' | 'delete' }>>;   // J-A67.72: exactly these five kinds; its EditBase fields are the wrapping event's
// Designation and MutationRecord are §4.7 S11's, RoomRole, Entrance and StairCore §2.6's, ConversionOp §4.11's; Works, LightSource and UndergroundLink §2.7's (their rules §4.11's, §4.7's and II.7.6's); AccessPoint II.7.4's; DossierChange §7.7's;
// ClosureRecord §7.3 item 9's; MassingOp and CompositionOp V02 §4.1's; SkyAccess V05 §2.2's; VillageEnd V07 §2.5's; CloseupParams V01 §2.5's; PortNote §14's
```

No event stores a `VertexId`, `HalfEdgeId` or `FaceId` (§2.2 rule 5): geometry is addressed by entity address, by
lattice point with a role signature (bound by `resolveVertexAt`, never by distance alone), by a water body's address
with a course-knot ordinal (bound as §7.4's `moveCourseKnot` row states), or by a ring. A point-form event with `key`
takes its points in that arena's frame, a sky island's converted from the world by the island's anchor at the dry run,
so a later move of the island never invalidates the event (V05 §4.2). Undo and redo are events like the rest (§7.4): the
log only grows, which is what lets a host store it (§11.3).

**The named actions** (G-R4; O16-core) are separate operations with distinct semantics, never one flag:
* **Regenerate (keep settings)** re-derives the scope with each entity's *recorded* inputs and unchanged rerolls
  (§7.3): faithful, and byte-identical when nothing upstream changed; used after a lock or a drawn constraint.
* **New random** — always on a scope (item 101 R5; J-A101.75; the one statement): a block, a quarter, a building's rung,
  a person, a tunnel run or system, or a rerollable layer such as the trees (`rerollLayer`); an unscoped new town is only
  the empty state's action, before anything is declared. It advances the reroll of every scope entity by one, written
  into the event as an absolute map, so a replay is exact and blocks at different rerolls each move on; §5.1 (6)'s
  content check advances again a scope entity whose content comes out unchanged, and the map records the rerolls used.
  "Try again" is only its catalogue label (V09 §4.9).
* **A designation change is neither.** `assign`, `unassign`, a `setAttr` on a plot's use or class, a relocated use and
  a dossier event run §4.7 S11's mutation of the standing design toward the new designation's template — kept parts
  kept, additions and subtractions recorded — never a re-derivation and never a re-roll (§7.3 item 8, item 18); a click
  on a stale elaboration rung re-derives it from its canonical prior (§7.3's table; never the cache; item 28, item 28 (f)).
* **Adjust** re-solves with a changed parameter. Locality is promised only for parameters the control registry (§7.8)
  lists as consumed at S10 or later, or that carry a spatial scope (a district's density, a block's granularity). A
  parameter consumed earlier (seed, rung, water setting and side, walls, castle option, gate count, planned ↔ organic,
  wealth level, the recipe's pack list) has no local operator and is offered as **Re-derive from stage k**: everything
  from Sk down re-derives with carry-over (§6.3), and the user confirms the edit-fate report first.
* **Same kind, new seed** is Enter's successor — a new document with seed + 1 that keeps the recipe and the dossier
  (§6.1); per district (PART II) it is New random on the district. **Surprise me** is §7.7 layer 1's.

**Warp is MFCG's staged edit.** Strokes in a warp session preview on the L1 overlay at interactive rate — vertex moves
and a redraw of the affected tiles, no invariants (§8.8) — and **Apply** commits one `warp` event holding the strokes
in order (a warp event is committed only on Apply, and Apply on a session without strokes commits nothing); **Discard**
drops them. On Apply, and on every replay, each stroke is applied as its **operation** to the geometry current at that
log position, never as stored displacements: the operation computes, from the current geometry, a displacement field
over the vertices under the brush, and the kernel's `warp(field, fromLevel, region)` applies it with §3.6's whole-step
validation, halving, re-seating, sliding and held vertices (the dry run lists the held entities), re-deriving locally
any face that then fails a class floor, logged. Records that stand on a point rather than a vertex move with their host
face, and every footprint, trace and deck the warp moved is re-based on the ground it now stands on (§7.4, *Warp and
what stands on the ground*). A warp with `fromLevel = 0` that moves water hands the moved shores to S1's water operator
as its new water (§7.3 (b) 1).

| MFCG tool | PLAT | semantics |
|---|---|---|
| Displace | `displace` | drags vertices under the brush by `dragCm`: full weight inside `innerRadiusCm`, falling linearly to 0 at `radiusCm` |
| Liquify (a softer Displace) | `liquify` | as `displace` with a smooth cosine falloff over the whole radius |
| Relax (repairs too-short mesh edges) | `relax` | Laplacian relaxation of the vertices under the brush toward equal edge lengths |
| Bloat (enlarges cells) | `bloat` | each L1 cell under the brush grows about its centroid by `strength`, neighbours yielding |
| Pinch (inverse of Bloat) | `pinch` | each L1 cell under the brush shrinks about its centroid |
| Equalize (regularises one cell's shape) | `equalize` | each cell under the brush moves its vertices `strength` × 20 % toward the targets `regularFit` returns for the cell's ring (§3.4) — MFCG 12710731's tool is its castle routine (§4.8, item 45) |
| Rotate (the whole map about its centre) | the `rotation` view key (§2.9) | a whole-map rotation about the frame centre as view state — never a vertex operation, which would re-snap every vertex (§3.6): model north (+y) is unchanged; the compass is decoupled — its view key is `trueNorth` (default: it keeps pointing at model north) or `free` (its own angle, MFCG's behaviour); exports apply the rotation as §11.1 states (J-DET-15) |
| Measure (a ruler, not a warp) | the measure tool of §9.5 | view data — no model event |
| — | `swirl` | our local rotation about the brush centre (not an MFCG tool) |
| — | `jitter` | seeded random displacement from the `warp.jitter` stream |

**Drawing at the authoring boundary.** Pointer samples are resampled along arc length to a spacing of at least
`minEdge`, simplified with a topology-preserving Visvalingam at `minEdge`, and a self-crossing stroke is split into
simple runs before `insertChain` (§3.4); a stroke that resamples to fewer than two points, or a ring to zero area, is an
empty edit (below). `drawWater` takes `add` rings, unioned by the boolean engine, and `subtract` rings — a land brush —
so an island is a subtract ring inside an add ring and two overlapping sea shapes simply union (FTG's documented
method); rivers and canals take a `line` and a width. `drawBoundary` selects the L1 cells whose area lies at least 50 %
inside the drawn polygon, and the district boundary becomes the boundary of those cells; a polygon that covers no cell
by half is bent to the one cell it covers most (ties by address), the bend named in one line (item 101 R2), and a
polygon of zero area is an empty edit (below); the dry run shows the snapped boundary before commit (J-DET-14). A `drawWay`
of class `bridge` across a river face places its `Bridge` by §4.2 S1 (5)'s rule for a drawn bridge; S4's operator
routes the drawn way's ends to its deck (§7.3).

**Raised ways, aqueducts and retaining walls (item 110 (a)–(b); items 362–364).** A raised `drawWay`'s ends resolve onto
ground vertices (an end on a way's centre-line splits that way, making the vertex; an end elsewhere moves along the
course to the nearest one; a course drawn beyond the frame bends to the arena's outer ring, its foot at the ring point,
§2.7 *At the frame*); its interior points never split a way on ground part 0; a course meeting an enceinte's trace
comes down to a ground vertex before it and passes through the gate its ground way makes there, while an aqueduct
crosses a wall by an arch in the curtain, never a gate (item 363); an aqueduct's first point is a source lying above its
terminal within `aqueduct.sourceReachKm`, else it is bent to the nearest such source, else to a well at the terminal
(J-VI.4 (h)); a terminal on open ground receives a fountain pin in the same event's closure (§7.3 item 9); a raised or
aqueduct stroke ending on a floating island's rim makes no way and is bent into `placeSkyAccess` with the stroke's ends
as top and foot, and one lying on an island's key is drawn as the island's own way (an aqueduct there a fountain pin)
(J-VI.4 (d)–(e); V05 §4.2). A `drawWall` of kind `retaining` folds into a `RetainingWall` (§2.7) — never an `Enceinte`:
no gate, no tower spacing of S7, no circuit and no barrier closure; `closed: true` is a platform whose high side is
inside; `placeGate` never targets one. Its dry run never refuses on the ground's account: a run on flat ground — at least
`terrace.coverShare` of its stations, sampled every 2 m, stepping less than `terrace.stepMinCm` and sloping less than
`terrace.slopeMin` across ± 3 m — moves onto the nearest slope break, terrace edge or retaining wall stepping at least
`terrace.stepMinCm` within `terrace.retainingReachM` of that share of the stations, else becomes a `terrace` over the strip
on the high side between the drawn line and `terrace.flatDepthM`, levelled to the strip's highest ground plus
`terrace.stepMinCm` (V09 §4.20.1 (3); the cells V11's); each way it crosses takes a stair or a ramp by the way-class rule
(item 110 (a)). The `terrace` sugar expands at its fold into `setField { field: 'terrain', stroke: { …stroke, mode:
'flattenTo', amount: 1, levelCm } }` and one `drawWall { kind: 'retaining', points, closed, highSide }` per edge run of the
levelled footprint along which the step reaches `terrace.stepMinCm`, each minted from the sugar's `seq` (§6.3); an
expansion replaces, in the same group, the retaining walls an earlier `terrace` expansion made inside its footprint, so a
re-levelled terrace never leaves a wall of the old step.

**Building-level editing**, each acting through the plot model: `drawFootprint` places a hand-drawn footprint
(concave allowed, simple) on the plot that contains it — a footprint spanning several plots proposes their JOIN in the
dry run; one on unplotted land (a green, a residue, a field) creates a plot around it with access to the nearest way,
or returns a conflict if none is reachable — and the host plot's site plan is re-fitted around it as a fixed slot
(buildings that no longer fit are listed in the fate report). `build` places a building of a class on a plot (the site
plan picks the footprint when none is given) — §4.11's `build(...)`. `moveFootprint` moves or turns a footprint;
leaving its plot re-homes it to the plot it lands on, with both site plans re-fitted. `swapUse` exchanges two
buildings' uses, households and assignments atomically, footprints staying — two `relocateUse` conversions under one
event (§4.11, item 17); a use is opened, closed or relocated by hand through `convert` with `openUse`, `closeUse` and
`relocateUse`, the building persisting vacant or converted (§4.11). `fill` forces an arrangement (dense row fill, for
instance) on the scope's plots and re-runs S11 there.

**Entrances, basements, passages and plans (items 28–30).** `setEntrance` adds, moves or removes a side, rear, yard or
service door under §2.6's rules — never the main entrance, which may only move along the footprint side §2.6 rule 1 puts
it on — and `setAttr(basement)` overrides the derived basement decision (an edited attribute, §7.2); `drawPassage`
reserves a covered passage under the front building of a plot as a passage face (§2.5) that gives the plots behind it
their access rows, and `convert` with `sealPassage` / `openPassage` (§4.11) seals or reopens one by setting
`Passage.sealed` (§2.5); `Passage.headroomCm` and `Passage.frontBuilding` are derived — S11 writes them with the spanning
wings' `spans`, a heights edit of a spanning wing re-derives the headroom, and the event that makes the front building a
footprint trace or a tombstone clears `frontBuilding` (§2.5, §2.6) — and have no edit kind of their own.
`setAttr(knownTo)` hides or reveals a place's name and purpose for §9.2's label policy (a value the dossier set is
dossier-owned, §7.7 item 11); a front's concealed programme (item 63) is edited like any other, through `setEntrance` and
the plan events. The plan events edit a building's stored plan storey by storey, the first of them — like the first
`setComposition` or furniture `instance` — storing the composition (§2.6), each dry-run against §13.2's plan bars on the
overlay and bent, never silently repaired (V03 §4.2; the outcome table below); a building's household count is changed by
hand through `convert` with `relet` (§4.11) within §2.6's capacity, which marks an unstored plan stale and re-cuts a stored
one inside the event (§7.3); an edit that lowers a building's capacity below its households — any change §2.6's
capacity rule lists — re-homes the excess by that rule, each move among its fates (§7.3 item 4); a click on a building
or a neighbourhood logs nothing (item 28 (c)).

**Brushes.** `paint` sets roof kind, roof colour or wall colour on every building whose footprint centroid lies under
the brush path (ids resolved at dry run and stored). `paintGround` records a ground-cover region in the style (FTG's
texture brush): pixels only. The tree brush is a batch of `instance` events on the entities under the brush (§8.10),
one undo step; painting trees where no green entity exists first logs a `drawGreen` (a `wood` on open land, a
`yard_planting` in a yard) to host them. `instance` events also carry close-up presentation edits (II.4) and a plan
room's furniture (V03). The field brushes are `setField` strokes (§7.2); the terrain brush's `water` mode chooses
whether water stays where it is (`locked`, the default) or follows the new ground (`follow`), and its `flattenTo` mode is
T2 `ground`'s flatten gesture.

**People.** A lock with `paths` fixes chosen attributes of a person (name, age, role …); New random on a person
re-derives it with a new reroll keeping locked paths; relations and schedules are not re-derived by a person reroll
(they are town-wide, §10). `setAttrMany` edits many entities at once — job, workplace, schedule, household
(relocation), land use — from a query whose result is resolved to ids at dry run and stored, so a replay never re-runs
the query; it is one undo step.

**Delete.** A `delete` of generated content is the plain `delete { id }`: a dossier-backed element's is recorded as
`rejectSite` (§7.7 item 3), a dossier-declared record's is refused, and the delete operator — never a client — records
what the removal suppresses: `LifecycleEvent.detail.suppress` for a raised way, a harbour-mouth chain, a quay wall, a
retaining wall or a deck plot (§2.8; item 260), V05's removed slot for an island or a sky access; its dry run names the
suppression in plain words ("the town will not rebuild this aqueduct; undo brings it back") with the entity's fates
(V06 §3.19.3 (6)), and its preview carries `holds`. The removal holds through regeneration, every absorb and every epoch
(item 110 (b)), lifted only by its undo or by the user's own re-add serving the same key (item 260); a journal or a
transcript replays the call exactly. Any other generated entity's delete holds by carry-over: the event follows the
entity's successor (§7.3 item 4).

**Empty edits.** An edit whose dry run resolves to nothing — a warp applied with no strokes, a stroke of fewer than two
resampled points or a ring of zero area, a `setAttrMany` whose query matches no id, a `roster` with no lines, a `group`
with no quarters, a `fill` or `regenerate` whose scope covers no face, a New random or `rerollLayer` whose every scope
entity reports `no_alternative`, a terrain stroke whose every cell `locked` mode masks (§7.2) — appends nothing: its dry run reports it empty with the reason (V09 §4.9), and applying
it leaves the log head and every digest unchanged. *Test (B-EDIT):* each empty form leaves `nextSeq` and both digests
unchanged, a zero-area `drawBoundary` among them; and a thin `drawBoundary` polygon covering no L1 cell by half commits
the one-cell bend with its line, the cell the one it covers most (ties by address).

**Edit targets — owner amendment 5.** Every generated element is editable (the table below); every rule table and
preset is editable (§7.6), by a user through the preference layer and by us through new table versions; edits are
first-class events that persist (the log, §2.9), undo (§7.4 — undo and redo are log events, so they work in a shared
document too), survive regeneration (§7.2–§7.3: protection, carry-over and fates) and migrate between versions (§7.5);
the generator repairs around them locally (§7.3's operators, F-REDERIVE); the preference and override layer sits above
the defaults (§7.6). The entity registry (§2.8) declares each type's edit kinds with their undo path and lifecycle row;
its completeness test is §13.2's. "Derived" below names attributes written only by the paths given, with no edit kind of
their own.

| element | edit events |
|---|---|
| terrain | `setField(terrain)` with `water: 'locked'` or `'follow'` and its `flattenTo` mode, the `terrace` sugar, `drawWater` (hollows and lakes; with `spring`, an oasis — g item 111), `setAttr` on site features; `setAttr` on `geology` — an override of S1's value (§2.3), re-deriving the underground systems that read it (II.7.6's caverns) |
| water, coast, rivers | `drawWater`, `moveVertex` on shores and coasts, `moveCourseKnot` on a river's control knots, `setAttr` (bank class; `WaterBody.spring.flow` — a spring's flow, item 111, V06 §4.2), `delete` (an oasis's water body with its spring, grove and gardens, §2.3) |
| ways, junctions, bridges, raised ways | `drawWay` (class `bridge` for a new crossing; `raised` and the `aqueduct` class, item 110 (b)), `moveVertex` (a raised way's interior points on its part's lattice; its ends only onto ground vertices), `warp`, `split`, `merge`, `delete`, `setAttr` (class, width, surface, name; a bridge's kind; on a raised way `spans/<ordinal>/use` = `open` · `vault`, a held user edit, kept `open` over a part-0 way, water or a flood cell by the span's recorded reason; `crossings/<retaining wall id>/form` = `stair` · `ramp`; `clearanceCm` and `spanSpacingCm`, item 364), `convert` (`downgradeWay`, `upgradeWay`, `repairRaised`; V06); derived: `formerClass` (V06 §2.8; a `setAttr` of `class` clears it) |
| districts | `drawBoundary` (its points form, item 101), `quarter` (sugar, item 101), `merge`, `split`, `setAttr` (kind, name, its `DistrictIntent` — §7.7 layer 2 —, `identity` — an override of the derived identity, item 72; §4.5 —, `fabric`, `fabricParams.*`, `terrace`), `regenerate`, `adjust`; `setAttr(fabric)` + `regenerate` is a stage-2 template replacement; derived: the character vector and the band range (§4.5), `pressure` (epochs only) and `nameHistory` (§6.3's case (5) and a dossier rename, §2.5); an undercity neighbourhood (II.7.5) is a district like any, with `convert` `clearUndercity` |
| reservations (§2.5) | `setAttr` on a market's `rank` (`principal` or `secondary`, item 24): a Re-derive from S3 with its fate report, §4.2 S3 (12)'s batch taking the edited rank as a fixed input (J-A24.71) |
| blocks, plots | `split` and `join` (item 31's splitting and fusion: the least-disruption re-cut of §4.7 S10 (7) with S11's mutator, neighbours fixed, undo exact — §7.4), `merge`, `fill`, `setAttr` (use, owner, `knownTo`; `tenure` — an override of the value derived from the owner and the band, kept like `knownTo`, item 70; `frontJitterCm` — 0 or in [`jitter.minM`, `jitter.maxM`], the footprint re-fitted by S11's mutator with the neighbours fixed, item 43; a block's `reach` — `open`, `passage` or `gated` — re-deriving the block's interior by S10 (7)'s re-cut with its neighbours fixed, J-A30.72; a block's `content`, V01), `regenerate`, `lock`, `assign`, `placeAt`, `rejectSite`, `drawPassage`, `convert` (`plotToGarden`, `amalgamate`, `subdivide`, `densify` (`infill`, `back_court`), `thin` (`infill`, `back_court`), `sealPassage`, `openPassage`; §4.11); derived: `builtBand` and `builtProsperity` (§4.11's floor paragraph; J-A31.44, J-A31.71), `fieldBand` (§2.5; J-A28.29), `exposure` (from the access rows), a block's `due` (§4.11's ladder); a cluster's structures are buildings, and a re-pack of a cluster is its plot's `regenerate` (item 70) |
| buildings | `drawFootprint`, `build`, `moveFootprint`, `swapUse`, `paint`, `setAttr` (class, heights, roof, basement, `knownTo`, `condition` — an edited attribute §4.11's rung 1 then leaves as set, §7.2, J-A31.76; `wings/<key>/heights` and `wings/<key>/roof`, V02), `setEntrance`, `delete` (a generator-added building; a dossier-backed one becomes `rejectSite`), `convert` (demolish, abandon, decay, ruin, clear, rebuild; vacate, reoccupy, reuse; openUse, closeUse, relocateUse, mutate — with a `MutationPlan` step, V06 —; `relet`, within §2.6's capacity, item 28 (f); `burn`, V06; §4.11), `startWorks` / `cancelWorks` (item 67), `addUndergroundAccess` (item 66; §7.3 item 9), `assign`, `regenerate` with `rung`, the plan events (item 28; `setRoomUnit`, item 28 (f)), `setHearth` and `instance` on a room's furniture (V03), `setMassing` and `setComposition` (stage 3, V02), `lock` on a room's path (`plan/rooms/<id>`), `setAttr` of a room's name (`plan/rooms/<id>/name`, V03 §4.2); derived: `nextEntrance` (§2.6's entrance derivation and `setEntrance`), `reusedAs` (`convert reuse`), `formerUses` (the use conversions that close or move a building's use), `predecessor` (`reuse … build`), each base wing's `spans` (S11 when it builds or re-fits a passage's front building, cleared by S11 or by the event that makes that building a footprint trace or a tombstone, §2.6), each slot's `frontage` (the designation template, re-derived by S11's mutator) and `unhoused` (§4.7's generation fill, cleared by the designation mutator) |
| mutation plans (V06) | `setAttr` of a step's `dueWeek`; `delete`; a `mutate` with its step (item 264) |
| walls, gates, towers | `drawWall` (its points form, item 101), `placeGate` (sugar, item 101), `moveVertex`, `setAttr` (among them `pathway` — a ring's fate and its week, V06 §4.2 —, a stretch's grade, `profile/<arc ordinal>/grade` = `full` · `light` · `closure`, item 106 (c): an edited path S7's operator keeps as a fixed input, `closure` admitted only on an arc whose barrier closes by item 106 (a)'s defensibility table and otherwise bent to `light`; item 360), `delete`, `convert` (wallToWay, gateToJunction; neglect, breach, dismantle, contractWall; `absorbWall`, `wearWall` and `repairWall`, V06 §2.8 — `repairWall` with its material, robust or a patch row of V11's `walls.patchMaterials` (item 114), a hand repair of a dismantled stretch bent to a new stretch drawn on its line, J-VI.4) — §4.11; derived: an enceinte's `supersededBy` (`contractWall`) and each run's `condition`, material and last-change epoch (§2.7; item 114), written by those conversions, an epoch's walls step (V06 §3.7.7) and S3 and S7's generation-time condition (§7.7 DR41) |
| retaining walls (§2.7) | `drawWall` (kind `retaining`), the `terrace` sugar, `moveVertex`, `setAttr` (material, towers, `highSide`), `delete`, `convert` `repairRetaining` (V06; a ruined stretch's repair bent to a new drawn stretch); a generated one re-derives with its terrain until edited, then held (§7.2) |
| uses (§2.7) | `convert` (openUse, closeUse, relocateUse — §4.11), `swapUse`, `setAttr` (specialisation; a concealed use's `concealment`, `front` and `knownTo`, item 63 — dossier-owned where the dossier set them), `assign` / `unassign` and the assignment's `pinned` (§7.7); derived: `concealmentSource` (written with `concealment`, `edit` for a map value); a use's address moves with it (§6.3) |
| institutions (§2.7) | `setAttr` (`knownTo`, name, `concealment`, `front`, `powers`), `assign` / `unassign` (§7.7); the values the dossier set are dossier-owned (§7.7 item 11) |
| tunnels, galleries, chambers, links, access points (II.6, II.7; staged, editable in the base) | tunnels: `drawTunnel`, `moveVertex`, `setAttr` (kind, `widthCm`, `headroomCm` — `navigable` re-derived from them, §2.7 —, `depthOffsetCm` — the invert re-laid, bent to the cover limit —, `name`), `delete`, `convert` (silt, caveIn, seal, reopen, flood) — a tunnel's condition is no `setAttr` path: it reads `existence` and `closure`, so a condition change is the matching `convert` (J-A11.21), and the profile preset is II.7.2's network choice, not a tunnel field; galleries of another system are `drawTunnel` with its `system` and chambers `drawChamber` (with `newKind`, a new ruin, cavern or catacomb system, bent as below), each in its system's part (J-A65.71), edited like tunnels, a chamber's `setAttr` also on `kind` and `ceilingCm`, a gallery's `walkway` derived (II.7.5), a catacomb's `fill` a `setAttr`; links: `addLink`, `setAttr` (kind, `knownTo`), `delete`; a buried old town is `convert` `raiseGrade` (II.7.6); access points: `placeAccess` (from public ground), `addUndergroundAccess` (from a building's basement: a closure), `moveVertex` on the `access_point` vertex (the underground end), `setAttr` (kind, role, `state` — open, locked or bricked, a collapsed reading never set — and `knownTo`, item 64; `ground.at`, the opening — re-hosted by `pointLocate` on the ground's `PlatKey`), `delete`; `setLayer` on `underground` is the CITY / METROPOLIS visibility toggle (§7.8); J-A12.71 |
| sky islands and their accesses (V05) | `quarter` with `sky`, `setAttr` (`anchor`, `altitudeCm`, `areaHa`, `occlusion`, `underside.*`, `field.*` — `field.prosperity` a declared target mean —, name), `setField` with `key` (terrain and the prosperity, density and greenery brushes), `drawWall` with `key`, `moveVertex` and `warp` on the island's key, `regenerate` (the island's scope; the scope `shade` — Update shade now), `lock`, `delete` (folded as `convert removeIsland`, the record kept in state `removed` holding its slot), `convert` (`resizeIsland`, `waneIsland`, `settleIsland`, `fallIsland`, `refloatIsland`, `raiseIsland`, `removeIsland`); accesses: `placeSkyAccess`, `setAttr` (kind — re-checked against `magic` and the row's limits —, role, `state`, `knownTo`, `ground.at` — re-landed as a move), `delete` (a generated access's ordinal held in `removedAccesses`); derived: `groundRefCm`, `elevationCm`, `shadeBasis`, `supply`, `state`'s dates, `slot`, `landfall`, `removed`, `removedAccesses`; `recipe.layers.islands` and `islands.count` are `adjust`s that re-derive from S7b (§7.8), an integer `islands.count` counting the slots removed islands hold as filled and opening only free slots — a count never releases a hold (V05 §3.2 (6); item 260) |
| the village (V07 §4.1, V07 §4.4) | `declareEnd`, `drawWay` with `walk`, `setAttr` on `VillagePlan`, `VillageRequest`, `VillageField` and `VillageEnd`, a village density stroke, `drawGreen` (`kind: 'green'`), `convert` (`retypeLand`, `retireWay`, `effaceWay`, `reopenWay`); the other kinds as above |
| terrain and water conversions (§4.11, item 25) | `convert` (`reclaim`, `siltReach`, `shiftCourse`, `digCanal`, `retypeLand` — the slow conversions the evolution engine schedules, usable by hand), repaired through S1's terrain or water operator or the carve: a marsh's `reclaim` by the terrain operator (§7.3 (a)), a foreshore's `reclaim`, `siltReach` and `shiftCourse` by the water operator (§7.3 (b)), `digCanal` by the carve (§4.11); derived: `LandUse.reclaimed` (§2.3) |
| works (§4.11, item 67; J-A67.71) | `startWorks`, `cancelWorks`, `setAttr` on the Works (`startWeek`, its duration within its `WorksTable` row); its stage at a week derived |
| lights (§2.7, item 68; J-A68.72) | `placeLight`, `setAttr` (kind, `heightCm`, colour, intensity, `radiusCm`; `point` — re-hosted by `pointLocate` on its host's `PlatKey`), `delete`, `lock`; derived lights (lit windows, the plan rung's room lights) have no edit kind; the view's light keys (§2.9) are not logged |
| greenery, trees | `drawGreen`, tree brush, `instance`, `setAttr`, `delete` |
| fields | `setField` (prosperity, density, greenery); `setAttr` on the town's `FieldBands` (an explicit re-banding) — both authorial: the blocks they re-derive past τ take the new field as their built state and their plots' `builtBand` (§7.2, item 31) |
| names, labels | `setAttr` (text; a label's `displayText`, §9.1, cleared by `revert`), `moveLabel`, `hideLabel`, `rerollLayer(naming)` town-wide or on chosen entities (`ids`), `group` (a region label group — `RegionGroup`, §9.1 —, sugar, item 101; renamed by `setAttr`, removed by `delete`), `setAttr` on a `HoodPlace` and a new place (V01); a name the dossier gave or claimed is dossier-owned, its label's display text a map-side choice (item 20 (h)) |
| layers, style | `setLayer`, `setStyle`, `paintGround`; view keys are not logged (§2.9) |
| people, households | `setAttr`, `setAttrMany`, `lock` with paths, `regenerate` (person scope; a household's people by the scope `people`, §10.3's re-derive people), `pin`; a household's building and its dwelling unit (§2.7, item 28 (f)) follow `relet` and item 17's relocation (§4.11, §10.3), never a bare `setAttr` |
| close-ups (stage 2; V01 §4.1) | `instance` on a hood pin (its block and ordinal) and the close-up's params, after a `closeup` event; every other close-up entity is a base entity edited as one, with no `closeup` event; a district's layout is `setAttr(fabric)` + `regenerate` (T8 `fill`), a block's content `setAttr(content)` (T9 `shape`), a local place's name and knowledge `setAttr` (T11 `name`) (item 272) |
| rule tables, presets | `editTable`, `editPreset` (row operations, §7.6) |
| history | `epoch`, `convert`, `rebase`, `upgrade`, `undo`, `redo`; the dossier events — `assign`, `unassign`, `setAttr`, `dossierFacts` (the absorb's ledger; no model effect) and `dossierRecord` (a staged record put or retired), with `EditBase.dossier` and `EditBase.dossierChange` set, produced by the dossier port and folded in the host's order (§7.7; items 73, 75, 358); the creation prefix's events carry `EditBase.creation` (§7.4) |

**Dry-run validation (G-R10).** Every event is validated before commit on the scratch overlay: the schema, the
batch-local and stage-end invariants of its scope (§5.3), and the edit-fate report of its effective scope with its
case-(4) renames (§7.3 item 4) — for a chained operator (§7.3 item 3) the whole chain runs on the overlay, so the report
lists every re-sited bridge, re-routed or cut way and re-based building before anything commits; for a declaration's
points form, the derived shape with its handles; for an area declaration (`quarter`, `fill`, `roster`), the plots,
households and buildings it will hold — the count the ghost's badge shows (§9.5; item 101 R14); for an `undo` or
`redo`, the independence check of §7.4; for a dossier event or a positive placement, its disruption against the request
kind's budget row, stored in the event (§7.7 item 5). Conflicts come back as actions, never silently resolved, by the
outcome table below. A host's bridge commands map onto these events (§11.3).

**The dry run's outcomes** (E-07; the one home of every refusal, conflict and bend cause of a dry run; §5.2's F-EDIT
row cites it. The gates outside a dry run — §11.1's export tier, §11.2's `advance` on a dossier-bound document (V06
§2.3), the shell's layer gate (V09 §4.2), V09 §3.9's restore and V10 §3.16's harness and model refusals — are their own
sections, V09 §4.9's lead naming each.) A declaration is **refused** only where it contradicts a dossier fact or a lock
(item 101 R2), or where an availability gate stops it — an assignment's bounds, a dependent later change, the role, a
staged layer, the rung (J-VI.4, J-VI.30) —, or where the input has no lawful form to bend to — a table edit's dangling
reference, type error or required row (V11 §4.1), a host provider's output past §2.9's cap, an edit of a device-only
table (V10 §2.10), an `epoch` past §6.1's epoch cap; every other infeasible declaration is **bent** to the nearest
lawful one, which the dry run names in one line, the former offer becoming the bend or its first alternative; the
other rows are **conflicts** returned with their actions, or **confirmations**. Each outcome carries its catalogue key
(V09 §4.9) as a `MsgRef` (§5.2 F-EDIT).

| cause | outcome | the action, or the bend's target | key |
|---|---|---|---|
| a map event (no `EditBase.dossier`; a dossier event is never refused by a lock or a pin, §7.7's precedence) crosses, targets or moves a locked or pinned entity or attribute path — a drawn way across a locked entity, a targeted assignment on one (§7.7's precedence), new water ⊕ bank setback meeting a locked or pinned way, wall or finer entity (§7.3 (b) 3), a warp carrying a held point-anchored record out of its host face (§7.4) | refused | the blocking lock — unlock; one of the closest acceptable declarations that leave the locked entity untouched (item 20 (g); `PreviewResult.alternatives`); or keep the lock; a host's map event that must override a lock sends an unlock first | `refuse.locked`, `refuse.water`, `refuse.warp` |
| new water reaching a reservation (§7.3 (b) 3) | conflict | Re-derive from S3 | `refuse.water.reservation` |
| an edit of an assigned attribute beyond its drift bounds (§7.7) | refused | remove the assignment, or change within the bounds | `refuse.assigned` |
| a map event changing a dossier-owned value (§7.7 item 11) | refused `dossier-owned` | the map-side alternative where one exists (§7.7 item 11) | `refuse.dossierOwned` |
| a map event closing, removing or re-designating a dossier-backed element (§7.7 item 2's list) | refused | `rejectSite` (move it) or `placeAt` (designate the plot for something else, the element re-placed) — a `delete` of one is recorded as `rejectSite` instead | `refuse.dossierRemove` |
| a declaration contradicting a dossier fact or a lock (item 101) | refused | the lock or the dossier fact it meets, with the closest acceptable declarations (item 20 (g)) | `refuse.dossierOwned`, `refuse.locked` |
| with a dossier connected, a roster line naming no dossier element | refused `dossier-owned` | the dossier's unplaced elements | `refuse.roster.dossier` |
| a `dossierFacts` or `dossierRecord` from any author but the port, or a delete of a dossier-declared record (§7.7) | refused `dossier-owned` | — | `refuse.dossierOwned` |
| an assignment, or the re-placement a `rejectSite` causes, that no plot satisfies inside the hard rows (a dossier fact's conflict; item 582) | conflict | the closest acceptable sites with the hard rows each fails (§4.7 S10b) | `refuse.assignment.noSite` |
| an `undo` naming a `creation` event | refused | `unassign` (a blueprint assignment); `rejectSite` and `placeAt` (a dossier element) | `refuse.undo.creation` |
| an `undo`, `redo` or `revert` naming an event of the port's session `host:port` — a dossier event, a `dossierFacts` or `dossierRecord`, or a port epoch, whether or not it carried a dossier change (§7.4 *Replay semantics*) | refused | `rejectSite` and `placeAt` for each dossier element it placed or re-designated (a dossier `unassign` leaves none) | `refuse.undo.dossier` |
| an `undo` or `redo` whose target has dependent live events (§7.4 *Independence*) | conflict | the dependent events and their authors, to undo first — never an event of session `host:port`, so a target one of them depends on stays as it is | `refuse.undo.dependent` |
| `E_KEPT` or `E_LEVEL`: the edit would cross or clear finer content an earlier stage made, or content outside a coarse edit's clear region (§3.3) | conflict | one resolution: start the re-derivation at the stage that made that content (for a wall's band parts or a margin band's part, S10's step (0) for the wall strips of the touched run or for the scope's side of the touched stretch, §4.7, §7.3 item 2) | `refuse.kept` |
| a tool or closure piece of a staged layer not yet built (the underground's pieces of `addUndergroundAccess`, §7.3 item 9 (d)) | refused | naming the staged layer | `refuse.staged` |
| an `addUndergroundAccess` whose terrain rules out every basement form (§2.6's requested-mode ladder), or whose connector passes its route's bound or finds no route (II.7.6 step 3: `E_NO_PATH`, the basement ring enclosed within `foundationClearM` by other footprints, basement rings or dug passages, or the water table above every floor between it and the target) | bent, else refused | the nearest lawful basement form (half cellar, walk-out, a hatch to a crawl space); else the refusal naming the terrain, the route's bound, or the blocking building or the water table, the basement not laid | `bend.under.basement`, `refuse.under.basement`, `refuse.under.route` |
| a dwelling declaration in an underground cluster nobody can reach (§7.3 item 9 (d)) | bent | the closure's dug access, else a public opening, else the declaration onto ground part 0 over the same footprint | `bend.under.accessDug`, `bend.under.accessOpening`, `bend.under.noAccess` |
| a user's positive placement that no plot satisfies inside the hard rows | bent | the closest acceptable site (the one §4.7 S10b ranks first), naming it and the reason; the other acceptable sites as alternatives (item 582) | `bend.place.noSite` |
| a user's positive placement over its disruption budget | bent | the closest acceptable site within the budget; the exact site with its disruption and the other acceptable sites as alternatives (item 582) | `bend.place.overBudget` |
| a plot `join` or `split` that would remove an occupied building | bent | the demolition carried as a fate, its households relocated by item 17; accepting the dry run is item 31's confirmation, and "keep the building" withdraws the edit (item 582) | `bend.vacate` |
| a plan edit leaving a room below its row's minimum area; a plan edit or a `setRoomUnit` leaving a unit without its own door onto circulation or the street (item 28 (f)) | bent | the smallest lawful split; the nearest wall position that keeps each unit's door (V03 §4.2) | `bend.room.minArea`, `bend.room.noDoor` |
| a plan edit (`setOpening`, `moveWall`, `splitRoom`, `mergeRooms`, `moveStairCore`) or a `setRoomUnit` leaving a room the main entrance no longer reaches (V03 §3.6 O2's tree; item 28 (f)) | bent | the nearest lawful form that keeps every room reached — the door kept, or moved to the nearest wall of the room whose other side reaches circulation (V03 §4.2) | `bend.room.unreachable` |
| a hand `relet` above §2.6's capacity | bent | clamped to the capacity | `bend.capacity` |
| a heights edit leaving a base wing spanning a passage below two floors (`Passage.headroomCm`, §2.5; item 30) | bent | the passage moved to the nearest run its front building covers with two storeys | `bend.passage` |
| a capacity re-homing that cannot place its excess (§2.6's capacity rule): locked or pinned households alone above the new capacity | refused | the lock | `refuse.locked` |
| the same, a household that fills no dossier's population that no residential building of the district has room for | conflict | the capacities that refuse it; relocation first (item 17) | `refuse.capacity.household` |
| a Works edit that would leave a plot without access or a building's occupants unhoused (§5.3's Works row; item 67) | conflict | the plots and households named; relocation first (item 17) | `refuse.works.access` |
| a moved course knot whose carve would exceed `carveMaxCm` (§7.3 (b) 1) | bent | the deepest lawful course, the knot at the nearest position along the drag within the cap | `bend.carve` |
| a value outside its declared range — a table cell (`jitter.minM` below its bound among them, §4.7 S11; §7.6) or an edited path with a range | bent | clamped to the nearest lawful value | `bend.invalid` |
| a host provider's output that would pass §2.9's cap on pack data and host content | refused | naming the provider and the size | `refuse.host.cap` |
| an upgrade's copy of a pack `to` stops shipping that would pass that cap (§7.5) | conflict | "keep the old model", the one resolution | `refuse.upgrade.packCap` |
| an `epoch` whose number would pass the live epochs' bound of §6.1's epoch component (2³¹ − 1) | refused | naming the cap; nothing commits | `refuse.epoch.cap` |
| the effective scope holds protected entities whose fate is not *kept*, or the edit re-draws names by §6.3's case (4) | confirmation | the fate list and the renames to confirm (§7.3 item 4) | the fates sheet (V09) |
| a warp step that would break an invariant | bent | the step halved (§3.6), named in one line | `bend.warp.halved` |
| a bug abort on the overlay (§5.1 (8)) | conflict | nothing commits; the cause `bug` with the stream key | `refuse.bug` |
| a declaration from a viewer role (§11.2's `role`) | refused `role` | none: nothing is computed, so no list, count or shape | `refuse.viewer` |
| an `adjust` of the islands setting (`recipe.layers.islands`, `islands.count`) below CITY, from any client (II.6; §7.8's disabled control) | refused, the rung | the rung change to CITY (T1 `intend`'s size chips) | `refuse.islandsRung` |
| an `editTable` setting a `raisedWays` row below CITY (item 110 (b)'s rung gate), or carrying a dangling `ref` or a type error (V11 §4.1) | refused F-EDIT, naming the rule | for the rung gate, declaring the raised way (T4 `road`'s Raised mode); none for the others | `refuse.table.rung`, `refuse.table.invalid` |
| an `editTable` row `delete`, or a pack's patch, removing a row readers fall back to or need — the schema's `defaultRow`, a `TotalityRule.allowFallback` target, the only row covering a value a totality rule requires (a `crisis.looks` row for its look kind and a `damage.elements` row for its element kind among them), a table's named row (V11 §2.1's settings form: `settings`, `structure`, `festival.staging`'s `fallback`), or the last row of a table not `mayEmpty` (V11 §4.1; J-V11.113); a pack's such op is refused at load, the row standing (V11 §3.2.3) | refused F-EDIT, naming the readers | editing the row's cells | `refuse.table.required` |
| a `setStyle` whose sheet leaves an unresolved or ambiguous layer-order pair (§8.2; J-R39) | conflict `invalid` | the offending pairs, which the style dialog lists; nothing applied | `refuse.style.order` |
| an `editTable` on `knowledge.admit` by which a `public` row would admit finer than `city`, or a higher tier finer than a lower one (§9.2) | conflict `invalid` | the offending rows | `refuse.table.knowledge` |
| an `editTable` on `clerk.ops` from a document's override layer, a skeleton or a host (V10 §2.10) | refused `invalid` | none: the device's preference layer alone edits it | `refuse.clerk.opsDevice` |
| a preview or an apply whose base changed before it committed (§11.2) | conflict | a new preview | `refuse.stale` |
| a Re-derive — a rung change or a population `adjust` — whose frame law gives a frame not enclosing the locked, pinned or declared entities and drawn constraints (§7.4's frame row; §3.2 (9)) | bent | the smallest frame of the rule that encloses them, at the frame's `aspect`, its centre (0, 0) | `bend.frame.held` |
| a hand `convert` `breach` or `dismantle` of an enceinte stretch, or a `delete` of the enceinte or of its raised gate or wall opening there, meeting the stretch held under a raised way's crossing station while its deck stands (§2.7's support step (3)) | bent | the op on its stretch less the held stretch, named in one line; an op wholly on the held stretch changes nothing, with its line; a `delete` of the enceinte takes the rest as a `dismantle` of every other run, the record kept with the held stretch standing as a free-standing gate tower or arch carrying the deck (as `wallToWay` and `absorbWall` leave it, V06 §3.7.6 (5)) | `bend.wall.held` |
| a hand `drawWall`, a moved trace vertex or a re-anchored stretch across a standing raised way (§2.7's support step (6) (d)) | bent | the stretch on its course beneath the deck, built against each support, ramp, stair, foot or `vault` span in its band and topped at a span's soffit, no gate or tower in the under-deck strip (moved along the way or the trace clear of it), its setback, glacis and berm stopped at the under-deck strip's edges and its channel passing beneath only where it meets none of these; the raised way unchanged; named in one line | `bend.wall.raisedCrossing` |
| a ground `drawWay`, a moved way or a hand carve meeting a standing raised way's supports, ramps, stairs, feet or a `vault` span's strip, or crossing its under-deck strip where §4.3's crossing rule does not admit it (§2.7's support step (6) (a)–(b)) | bent | the way or channel moved along the deck to cross under the nearest span that admits it (`bend.raised.underSpan`); where none does (`bend.raised.around`), a way takes another course by §4.3's router as a route does — round the raised way — else the nearest routable pair (§4.3 *Two-point roads*; item 101 R2), and a carve's channel stops at the under-deck strip's edges, ending against the ground as against a berm; named in one line | `bend.raised.underSpan`, `bend.raised.around` |
| every other infeasible declaration (item 101 R2) | bent | the nearest lawful declaration, named in one line — a quarter's snap and size, a lake's level, a harbour's size, a river's course, a road's route and bridge, a wall's ridge, reach, waterfront and open ground, the arch a wall takes for an aqueduct drawn across it, a fill's band, a roster line, a place's site, a retaining wall's flat ground, move and rim, a raised way's clearance, ends, wall and island strokes, an aqueduct's source, terminal and uphill run (a well), a crossing's steep ramp, a chamber's catacomb ladder (below), a crypt, a deck, a stack and its tiers, a ruin's axis, a tunnel's depth offset (to the cover limit), a stair kind or bay (V03 §4.2), a wall stretch's `closure` grade (to `light`), a hand repair of stone that is gone (a new stretch or part on its line; V06) | V09 §4.9's `bend.*` rows |

**The returned kinds** (§11.2's `ConflictAction.kind`; the one statement). A refused or conflicting outcome returns its
action as a `ConflictAction` only where the action is one of these kinds: `unlock` — the rows whose action is the
blocking lock: the first row (a map event meeting a lock or pin; its keys `refuse.locked`, `refuse.water`,
`refuse.warp`), a declaration meeting a lock and a capacity re-homing held by locked or pinned households (both
`refuse.locked`) — its `target` the blocking entity; `unassign` — `refuse.assigned`, its `target` the
assignment; `moveTo` — `refuse.assignment.noSite`, one per closest acceptable site, its `target` the plot; `stale` — the
stale-base row; `invalid` — the three rows that refuse or conflict as `invalid` (a style sheet's order, the knowledge
admission, the clerk's operations). Every other row returns its catalogue key alone, its offered actions being that
key's event forms (V09 §4.9: a re-derivation, the dependents to show, `rejectSite` and `placeAt`) or the preview's
`alternatives` (the closest acceptable declarations of a refusal); a bend is no conflict — it applies, named in one line
with its alternatives. No row returns `reroute`: a route is bent, never refused (the last row).

**A new catacomb from a chamber** (item 109 (k); item 361). The dry run of `drawChamber { system: { newKind: 'catacomb' } }`
bends to the nearest lawful form and never refuses: (a) its centroid inside a church-class building's footprint →
`setAttr(building, 'basement/crypt/ring', <the drawn ring clipped to the building's crypt region>)` and no chamber is laid,
and on a building without a basement V03's crypt ladder makes a crypt-only basement (V03 §4.2); (b) on a burial face (V04
§3.5.1 (1)) with the settlement's catacomb count reached → it joins the complex of which an element lies within
`accessReachM`, else becomes one `ossuary` chamber of the `dug` system under that face capped at `charnelMaxM2` (a charnel
vault); (c) below TOWN → the charnel vault; (d) on no burial face, or on a worked-out quarry below CITY → the chamber stays
in the `dug` system; a worked-out quarry at CITY or METROPOLIS within `ossuaryReachM` is a quarry ossuary. Otherwise it
forms a complex under that face within the count. Each outcome carries its `bend.catacomb.*` key. `newKind: 'ruin'` creates
the system with its record of source `declared` and its axis from the chamber, `newKind: 'cavern'` one of the site's
geology; the undo of any of them removes both the system and the chamber.

**The authoring toolkit (item 101; owner: "come up with an elegant set of tools for both an ai clerk and a user where a
dedicated user can build it or emulate it"): declare, then derive (J-A101.71).** Authoring is a set of DECLARATIONS,
each one of the events above or sugar over one, with one dry run, one fate report, one commit and one undo, so nothing
changes silently. The rules derive everything undeclared — item 20 (h) applied to human input: a declared fact stays
fixed, like a dossier fact, until its author changes it (§7.2; §2.8's `factTier` reads it `declared`); its infeasible
forms are the outcome table's. **Emulating** a city is declaring its intent, bones and programme (the INTENT, GROUND AND
BONES and PROGRAMME layers) and letting the rules fill the fabric; **building** it is declaring the fabric too (FABRIC and
FINISH) — the same tools at a different depth. The twelve tools, in five layers of commitment (the author may stop at
any layer; everything below it is derived; the sky parameters of V05 §4.1 ride T2 `ground` – T6 `place` and T8 `fill` –
T10 `hold` through `key` and `quarter`'s `sky`):

| layer | tools |
|---|---|
| L0 INTENT | T1 `intend` — the recipe's intent at creation (§7.7 layer 1: site, size, form, era and style, prosperity, walls; `Recipe.product`, V01), afterwards the basic panel's sliders and chips (§7.8) |
| L1 GROUND AND BONES | T2 `ground`, T3 `wall`, T4 `road`, T5 `quarter` |
| L2 PROGRAMME | T6 `place`, T7 `roster` |
| L3 FABRIC | T8 `fill` (its three variations are §7.3 item 10's), T9 `shape`, T10 `hold` |
| L4 FINISH | T11 `name`, T12 `dress` — beyond its events, the close-up's `pinGate` and vignette (V01), the furniture (§9.5) and the exports (§11); the underlay is view state (§2.9, §9.5) |

The events each tool homes are the binding's below; a mode may also emit a kind another tool homes (`toolkit.json`'s
`emits`, V09 §2.3), as T9 `shape`'s footprint drag emits `drawFootprint` (E-04: one table).

A new capability adds a parameter to an existing tool, never a thirteenth tool (§13.2's elegance bars). **The binding**
(E-04; the one home, keyed by event kind and target class or path; T101-1's registry, T101-2's enumeration, V09's
T-V9-12 and V10's T-V10-1 check it over every `EditEvent` kind; V09 §4.3 adds each row's gestures, V10 §3.5's encoders
read it):

| home tool | event kinds (the target class or path where it decides the home) |
|---|---|
| T1 `intend` | `adjust` (intent, recipe, layers, islands, the sewer family, ruins, a standalone neighbourhood document's outline) — the basic panel's Adjust and Re-derive events |
| T2 `ground` | `setField(terrain)` (its `flattenTo` mode), `terrace` (item 110 (a)), `warp`, `drawWater` (its points and level forms; a lake's `spring`, an oasis), `moveCourseKnot`; `moveVertex` on a shore or coast; `setAttr` on `geology`, a bank class, a site feature, `WaterBody.spring.flow` (item 111; V06 §4.2); `convert` `reclaim`, `siltReach`, `shiftCourse`, `digCanal`, `retypeLand` (item 209) |
| T3 `wall` | `drawWall` (every kind, its points form, `retaining` included, item 110 (a)), `placeGate`; `moveVertex` on an enceinte's trace — a stretch's anchor vertex and a gate's crossing among them — or a retaining wall's chain; `setAttr` on a retaining wall, on the castle (`site`, `baileyArea`) and on `Enceinte.pathway` (a ring's fate and its week; V06 §4.2); `convert` `wallToWay`, `gateToJunction`, `neglect`, `breach`, `dismantle`, `contractWall`, `absorbWall`, `wearWall`, `repairWall` (with its material: robust, or a patch row of V11's `walls.patchMaterials`; item 114), `repairRetaining` |
| T4 `road` | `drawWay` (every class — a road across water a bridge, by the drawing rule above —, its points form, `raised`, the `aqueduct` class, item 110 (b), V07's walk mode), `drawTunnel`, `addLink`, `placeSkyAccess`; `moveVertex` on a way's, a raised way's (its ends onto ground vertices) or a tunnel's chain |
| T5 `quarter` | `quarter`, `drawBoundary`, `declareEnd` (at a village rung); `setAttr` on a district (kind, identity, `DistrictIntent`, band); `merge` and `split` of districts |
| T6 `place` | `placeAt` (its point form, and its `lift`), `assign`, `unassign`, `build`, `drawFootprint`, `rejectSite` (and its `lift`), `drawChamber`, `placeAccess`, `addUndergroundAccess`, `instance` on a hood pin (add, move, remove, restyle; V01's furniture stamp, item 349), `roster` of one line (a place by a locus — the drop target or the typed words, V09 §4.5; item 570); `convert` `relet` (item 353), `openUse`, `closeUse`, `relocateUse`, `mutate`; `swapUse`; `setAttr` on a market's `rank`, a use's `concealment` and `front`, an institution's `powers` |
| T7 `roster` | `roster` of any number of lines |
| T8 `fill` | `fill`, `setField` (density, greenery, prosperity), `drawGreen`, `setAttrMany` of land use, `instance` on trees and §8.10's other decoration instances (add, move, remove, restyle; the tree brush's groups); `setAttr(fabric)`, `setAttr(fabricParams.*)`, `setAttr(terrace)` with their `regenerate` (each pair one undo group: the layout card, the Terraces chip) |
| T9 `shape` | `split`, `join` and `merge` of ways and plots; `moveFootprint`, `setEntrance`, `paint`; `setAttr` on the shape paths (a building's class, heights, roof and basement; a plot's tenure, reach and front jitter; a way's class, width, surface and name; a bridge's kind; a square's type; a block's content; a raised way's spans, crossings, `clearanceCm` and `spanSpacingCm`; a wall stretch's grade; an access point's paths; a catacomb's `fill`; an island's and a sky access's paths; a mutation plan's step); `moveVertex` on an access point and on an island's key; `setMassing`, `setComposition`; the plan events, `setHearth`, `instance` on furniture; `drawPassage`; `convert` `sealPassage`, `openPassage`, `densify`, `thin`, `subdivide`, `amalgamate`, `plotToGarden`, the decline kinds, `rebuild`, `burn`, `downgradeWay`, `upgradeWay`, `repairRaised`, the tunnel and island kinds, `raiseGrade`, `clearUndercity`; `startWorks`, `cancelWorks`, `setAttr` on a Works; `editTable` on `siting.declared` and `siting.linkEdits`; `delete` of an access point or of catacomb galleries; every `setAttr` path no other row homes (a person's attributes, a use's specialisation) |
| T10 `hold` | `lock`, `unlock`, `pin`, `unpin`, `revert`, `regenerate` (keep, New random, a rung, a tunnel run or system, an island's `shade`, a household's people — the scope `people`, §10.3), `rerollLayer('village.track')`, `delete` of anything else (a dossier-backed element's recorded as `rejectSite`, a dossier-declared record's refused, a generated removal holding — *Delete* above; item 368) |
| T11 `name` | `setAttr(name)` (a room's on `plan/rooms/<id>/name`, V03 §4.2; a new `HoodPlace`'s, V01), `setAttr(displayText)`, `setAttr(knownTo)` on a plot, building or institution, `moveLabel`, `hideLabel`, `group`, `rerollLayer(naming)` |
| T12 `dress` | `setStyle`, `setLayer`, `paintGround`, `placeLight`, `setAttr` and `delete` of a light, `rerollLayer` of `style.compass`, `naming.emblem`, `render.instances`, `style.jitter` and `style.crowns` |
| no tool — its producer | `setAttrMany` other than land use (the multi-selection's context panel); `closeup` (the first presentation edit inside a close-up); `editTable`, `editPreset` (the tables editor and the presets dialog, §7.6); `epoch` (V06's `advance` from T1 `intend`'s time card, a timeline entry, the port's cadence; the history replay's runner at generation, §4.11 *History-first generation* (2), §7.4's `epoch` row); `undo`, `redo` (the undo keys, the API, a host's `doc.apply`); `upgrade`, `rebase` (the upgrade offer, the load-mismatch choice, the frozen view, Rebuild around my drawings); `dossierFacts`, `dossierRecord` and every dossier event (the port only); `convert` from an epoch (the engine) |

* **Sugar events** (J-A101.72; the one statement of their expansion) are logged as themselves — one undo step, one fate
  report — and expanded at their fold into the events they stand for by the sugar expansion table (`sugar.json`, §7.6)
  at the version the event records (`expansion`), so a replay and an upgrade expand them exactly as the session did
  (§7.5); what an expansion creates is minted from the sugar event's `seq` (§6.3). `placeGate(enceinte, at)` is a short
  through-way stub of the enceinte's gate class crossing the trace at `at`, square to it, so S7's operator builds the
  gate there — and a gate also arises wherever a declared road on ground part 0 crosses a wall (§7.3's S7 row), while an
  aqueduct crosses by an arch and a raised road comes down before the trace (above). `quarter` is a `drawBoundary` (with
  its kind's size band and snap), a whole-neighbourhood `assign` naming that kind as its `function` — which §4.5's
  character reads as it reads a dossier kind, a declared kind winning over an emergent identity —, a `setAttr(name)`,
  `setAttr(district.fabric)` when `fabric` is given and `setAttr(district.terrace)` when `terrace` is given (V01), and,
  when a band is given, a `setField(prosperity)` stroke over the boundary moving its mean to the band's centre; at a
  village rung it expands to `declareEnd` carrying its `boundary` (V07 §4.1). `roster` is one `assign` per line (its
  class, name and locus as `PlacementCriteria` hints; a line whose `name` is `''` makes an assignment with no `name`,
  which S13a names as it names any place the rules placed — item 571), all in one group and solved together by §4.7
  S10b's solver in one dry run in its claims-first order; a line the rules cannot honour is bent, listed with its
  closest options (`bend.roster.line`). With a dossier connected the roster is the dossier's: a line must name a dossier
  element (`RosterLine.element`) and expands to a `placeAt` of it — the author may only place. `group(name, quarters)`
  creates a named region label group over those nodes of §9.1's quarter tree. `terrace` is above.
* **Points in, shape out, handles always** (item 101 (i); J-A101.73). `drawBoundary`, `drawWater`, `drawWall`, `drawWay`,
  `drawTunnel`, `drawChamber` and `placeAt` take a points form (`PointsForm`; water also a level): the dry run derives the
  shape with the operator that builds that class and stores it in the event's geometry fields, resolved, as `EditScope`
  is, so no replay and no later derivation re-derives or moves an accepted shape. A client sends a points-form event with
  each geometry field the dry run resolves written empty — `points: []` (`drawWay`, `drawWall`, `drawTunnel`), `boundary:
  []` (`quarter`), `add: []` (`drawWater`), `polygon: []` (`drawBoundary`, `drawChamber`), and a `placeAt`'s `plot: ''`
  (item 367) — beside its `from`; the dry run fills them, so every surface writes one byte form (T101-3). A **quarter** grows from its seed point
  along block edges to its kind's size band by §4.5's grower, or to `sizeM2` within that band when given (two to four
  points give its far edges; a lasso its outline), its boundary snapped to street centre-lines, water, walls and ridges
  and never through a block, the kind steering the snap (a harbour quarter hugs the shore, a manor quarter prefers high
  dry ground, a market quarter centres on a square); a **lake** fills the basin S1's terrain gives it to the declared
  level, and with `spring` it is an oasis — S1's spring-fed pond or small lake with its grove and irrigated gardens (§4.2
  S1, g item 111); a **river** runs from a source to a mouth by S1's water operator; a **coast and harbour** take a sea
  level and one shore point with a basin size, their quays by §4.8's harbour rules; a **wall** follows ridges and contours
  between two or more points by S5a's trace, closing when its ends meet, its ends snapped to barriers and the barrier arcs
  shown as part of the circuit (item 106 (g)); a **road** joins its points, pair by pair, by S4's router with its class (§4.3); a
  **tunnel** its two points by the network's router (II.7); a **chamber** takes one point and a size or three or more
  points; a **place** takes the plot its one point selects — the plot under it, else the nearest lawful one by §4.7 S10b
  — and S11's site plan. The derived shape keeps four to eight handles by default (more on demand); dragging one is a new
  declaration of the same kind on the same entity (a `drawBoundary` with the district's id, a `moveVertex`, a
  `moveCourseKnot`), so its fates list what re-derives, locally. The authoring surface's feature snap (§9.5) is visible
  and escapable and is resolved into the event's points before the dry run; the kernel's attraction (§3.6) applies to
  every insertion and is never escaped. A brush is many seeds and a lasso many points: one event kind per thing.
* **Three surfaces, one vocabulary.** The canvas (§14's reference UI), the clerk's tool API, over §11.2's embedding API,
  and the skeleton file (§11.1 — the ordered declarations, imported as the log's creation prefix and read ahead by their
  stages, §7.4) produce identical events. A clerk's proposal is a dry run shown as a ghost; accepted, it commits with
  `proposedBy: 'clerk'` and the user as its author (J-A101.74). The clerk never bypasses the dry run or the undo, never
  writes a dossier fact, and reads only what its viewer may know (§9.2). The tool API and these events are the base's;
  the built-in clerk is staged (M3c; *Staged by the owner's roadmap*), and plots on a bridge deck, a mole, a jetty or a
  quay platform are built with item 110 (d).
=== END ===

=== REPLACE ### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3) ===
### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)

1. **Effective scope.** `regenerate(scope)` finds the coarsest faces covering the scope at the scope's level; that set
   — possibly larger than the drawn area — is the **effective scope**, shown before commit and stored in the event as
   the resolved `EditScope`. For an edit that chains local operators (§7.3 item 3) it is the union of every chained
   operator's scope. For a designation change, a dossier event, a positive placement or a relocation (§7.3 item 8) it is the
   plots the placement and the mutation touched — the site, its joined neighbour if any, and each displaced use's new
   site — bounded by the request kind's disruption budget (§7.7 item 5), except a dossier event over budget, whose scope
   is the touched set of its least-disruptive placement, reported over budget. **Stored compositions, spanned passages,
   stacked and deck buildings, and re-homed households** (§2.6): the edit that stores a composition — and every event
   whose re-cut of a stored plan establishes J-P48 (1) for its new walls (§2.6) — holds the faces sharing an edge J-P48
   (1) splits and the row neighbours' wing rings its carry changes; an edit whose batches change a `Passage` face (L3) or
   move one of its vertices holds the passage's front building (`Passage.frontBuilding`, §2.5) when that building's stored
   composition has a wing spanning the passage (§2.6's carry trigger); an event that changes a spanning wing's heights, or
   makes its building a footprint trace or a tombstone, holds the passage it spans, whose `headroomCm` or
   `frontBuilding` it rewrites (§2.5, §2.6); the step that re-bases a deck holds the buildings on it and their plots
   (§2.6); and an edit that lowers a building's capacity below its households holds that building, the buildings §2.6's
   capacity rule re-homes its households into and, where §4.7 re-provides a dossier household's housing, the plots its
   `dossier` request touches — the site, its joined neighbour if any, and each displaced use's new site — bounded as a
   dossier event's scope is (above). **The seam exception** (NF-P6): a district-scoped re-derivation's effective scope
   also includes its bounding ways' chains, `Corridor` records, `surface` attribute and naming record (both read by both
   sides; V01 §3.7.2–V01 §3.7.3; item 369), the half-corridor strips on both sides and the junction wedges at the vertices its
   batches insert or remove on those spines — on a neighbour's side only II.1 (3)'s neighbour step, one `corridor_split`
   edge and the one kerb vertex it lands on (promoted) or adds —, the neighbouring cells, plots and footprints whose rings
   pass through those vertices and the wing rings of the buildings on them (§2.6), all changed only by those vertices — a
   promoted vertex returns to its level when the lane goes (§2.2 rule 3) — and the `Seam` records it is party to (§4.6,
   II.4); a replace dry run lists each bounding way whose surface or name changes among its fates.
2. **Fine levels (L1 cells and below): tree scoping.** Every unprotected finer entity under the effective scope is
   discarded and the refinement stages re-run for those faces — recorded inputs and unchanged rerolls for Regenerate
   (keep settings), advanced rerolls for New random; the batch's `rederivesFrom` and the finer content it keeps follow
   §3.3. This is **sound by over-invalidation** and is the primary mechanism.
   **Shared-edge parts.** The L3 parts S10's step (0) builds on both sides of an L1 edge two face sets share without
   corridors (§4.7) are cleared by a re-derivation from S8, S9 or S10 inside its scope. A scope that holds wall-strip
   faces, or faces bordering the settlement perimeter or a reservation boundary two districts share, therefore **re-runs
   step (0) for its own side's parts** after its S8 and S9 (first, when it re-derives from S10), before its plots:
   `bandUnion` restricted to the scope's faces, its cross edges ending on the shared edge by attraction onto the vertices
   the other side's parts already placed, and the scope's plot, alley and furlong lines ending on the re-laid band's
   inner edge; the other side is never written. So a Regenerate (keep settings) of a perimeter district lays the same
   backland part, and one of the hinterland (the S12 row) the same headland, at the same lattice points — byte-identical
   to the one-click result when nothing upstream changed. *Measurement (M2a, B-EDIT):* Regenerate (keep settings) of a
   perimeter district, a walled district and the hinterland on B-CITY-lite seeds is byte-identical. *Pre-decided
   fallback* if a one-sided re-run ever differs from the eager two-sided batch: cover both sides of every shared stretch
   the scope borders — the other side's parts and the blocks fronting them re-derive from S10 with the scope, declared
   in its effective scope — which is the eager batch restricted to those stretches (J-DET-29).
   S13a re-derives label candidates inside the scope and draws names only in §6.3's draw cases; the display list,
   tiles and label placement update as §8.1 item 4 and §9.2 state.
   **Replay mode** (load verification, migration, undo beyond the scoped records, the undo of an upgrade after a
   reload) folds the log through exactly the session's code path: every model stage, **S13a's scoped delta
   included**, runs at its event's log position — name uniqueness is resolved scope by scope in log order (§9.6), and
   `moveLabel`, `hideLabel` and `setAttr(name)` address `LabelEntity` records and names S13a creates mid-log. Only the
   view stages wait: S14 and S13b run once at the end (J-DET-21).
3. **Coarse stages: a local operator each, with pinned boundaries.** L1 and L0 are not per-face refinements — S4 routes
   across the frame, S5 grows a town-wide queue, S6 grows districts across cells, S7 traces an enceinte — so each has
   its own operator. An operator may chain others (S1's water operator chains S4, S5, S6 and S7): the chain's batches
   commit in the order stated, each operator draws from the operated entity's lineage under its own stage's concerns,
   and the whole chain runs in the dry run first (§7.1), so session and replay run the same chain at the same log
   position. An edit with no local operator — a parameter §7.1 lists as consumed early — is Re-derive from stage k.

| edit reaches | local operator | pinned | beyond it (declared, never presented as local) |
|---|---|---|---|
| S1 terrain (terrain brush in either water mode, the `terrace` sugar, site features, a marsh's `reclaim`, item 25) | (a) below: masked stroke, local drainage, terrain-reading field drivers, exact re-basing of what stands on the changed ground, slope re-sampling; in `follow` mode, (b) for every reach whose bed changed | all water in `locked` mode; the heightfield outside the stroke; every way's geometry | in `follow` mode, Re-derive from S1 when a course leaves its drainage basin or F-RIVER needs its inlet or centre rung (§5.2) |
| S1 water (`drawWater` — an oasis's spring-fed pond among them —, a moved shore or coast vertex, `moveCourseKnot`, a `warp` from level 0, the terrain brush in `follow` mode, `siltReach`, `shiftCourse` and a foreshore's `reclaim`, item 25) | (b) below, in §4.11's order: new water, crossings, routes, wall runs and the chain's footprint as data; one L1 batch that clears the footprint's partition content, re-lays the kept ways through their decks, re-traces the crossed wall runs and cuts the lesser ways; one L0 batch inserting the water through the vertices that batch prepared, both declaring the footprint as clear region; then S5, S6, S7, tree scoping and F-REDERIVE | reaches and coasts outside the edit; every way, wall and district not named in (b); every finer face outside the footprint, less the seam exception at its boundary | Re-derive from S1 when the course leaves its drainage basin or F-RIVER needs its inlet or centre rung (§5.2) |
| S4 (`drawWay` of an arterial, a moved arterial vertex, a moved destination, the castle placed or resized, a deck re-sited or removed by S1's water operator) | re-route only the arterials whose corridors meet the edit region or whose destination or deck moved, each between its nearest pinned nodes (junctions of degree ≥ 3 or destination nodes) on either side of the region, over S3's lattice, every deck a fixed graph edge | their endpoints; every spine outside the region | a gate-count change (a destination added or removed) re-derives from the stage that picks those gates: S3 for stage 1 (§4.2 S3 (7)), S5 of its stage for a later enceinte (§4.4) |
| S5 (`drawWay` of a secondary, a deleted street, a secondary now crossing water off a deck) | regrow only inside the affected L1 cells, from the proposals whose origins lie there, under S5c's legality (water only on a deck) | the cells' boundary spines | — |
| S6 (`drawBoundary`, district merge or split, `outskirtToDistrict`, land vacated or covered by a moved channel) | regroup and re-type only the districts touching the region, the grower restricted to their cells, its turn skips and picks drawn from `district.seed` as §6.1 keys them, so unchanged cells regroup as before; then **re-lay the margin bands**: along every L1 edge without corridors whose sharing changed (a moved stretch of the settlement perimeter, a reservation boundary two districts now share) S10's step (0) lays the margin band (§4.7) on both sides, and where a merge or conversion ends the sharing it removes both parts; the blocks fronting such a stretch on either side (a neighbour's or the hinterland's included) re-derive from S10 and join the effective scope shown in the dry run | every other district, and every block fronting no changed stretch | — |
| S7 (`drawWall`, a moved trace vertex, `wallToWay`, `gateToJunction`, a river whose course crosses an enceinte moved; a declared way of a class above lane on ground part 0 crossing an enceinte — a `placeGate`'s stub or a declared road, item 101; an aqueduct's crossing adds an arch to the curtain's run and no gate, item 110 (b)) | re-trace only the run between the nearest unaffected towers on each side, with water gates where the course now crosses and a gate at each declared crossing (a lane across a strip stays refused, NF-P5; J-A101.76); re-cut the strips' setback and glacis lines along it; re-derive the strip blocks' S10 step (0); on each standing raised way the new run meets, the run passing beneath its deck and its strips stopped at the under-deck strip's edges (§2.7's support step (6) (d)) — nothing of the raised way re-derived or in the effective scope | the rest of the trace, its gates and its strips | Re-derive from S7 when the enceinte kind changes |
| a carve (a canal, moat or basin drawn by an edit, `digCanal` among them; §4.11) | §4.11's way rule (pinned decks for arterials and sole connections, cuts for the rest) and footprint, in its declared batch order, the channel inserted with the footprint as its clear region (§3.3) | every way and finer face outside the carve's footprint (§4.11: the channel ⊕ (`attractCm` + bank setback) united with every L1 cell that buffer, the way rule and the wall re-trace touch — the rules (b)'s footprint follows), less the seam exception | if the clear region cannot be kept, §3.3's pre-decided fallback: a declared town-wide re-derivation with the fate report |
| S8–S11 | per cell, block and plot (tree scope, §7.3 item 2; wall-strip blocks and the scope's side of every shared margin band from S10's step (0)) | the other side of every shared edge | — |
| S12 | the covered hinterland faces and greenery entities; the hinterland unit re-lays its headland parts along the perimeter by step (0) first (§7.3 item 2) | the districts' side of the perimeter | — |
| a designation change (`assign` / `unassign`, `setAttr` use or class, `openUse` / `closeUse` / `relocateUse`, a dossier event, `placeAt`, the re-placement a `rejectSite` causes; item 18) | §4.7 S10b's solver for the site, then §4.7 S11's mutator on each placed plot (the inverse mutation on reversal); a displaced use re-placed by the same solver, one displacement level (§4.7 S10b) | every plot outside the touched set; every locked part; the plots' faces beyond a joined neighbour | — (a JOIN the mutator needs is a `join` of the two plots, chained as §7.3 item 3 states) |
| a plot fusion or splitting (`join` / `split`, item 31) | S10 (7)'s re-cut of the members with their neighbours fixed, under the band's target, then S11's mutator on the new plots (an occupied building kept, or its demolition carried as a confirmed fate, §7.1) | the block's other plots and every neighbour's ring; the members' party-wall vertices on the fixed side | — |
| a click on a stale elaboration rung (item 28; no event) — the re-cut of an unstored plan along the interior ladder among them (item 28 (f)) | `BuildingGenerator.plan` from its **canonical prior** — committed state, never the cache (§6.2): the stored plan where one exists, else the as-built plan (the class's programme at the plot's `builtBand` row with the template's `households.built` clamped into [1, capacity], §2.6, §10.2) carried along §2.6's interior ladder one row or one household at a time, in the order §2.6 states, to the occupants' current band and household count, each step §2.6's re-cut rule — its FIXED set, its re-derived set and its kept-room rule, stated there (J-A28.26) — with its draws keyed by the step (§6.1); the cache holds any step already derived and is only a memo (§6.2); the wings rung likewise through `compose`, with the stored or as-built wings as its prior | everything — a click writes only the cache (§6.2) | — |
| a change of a building's plan inputs while its plan is STORED — a `relet`, a household moved in or out (§4.7's overflow pass, §2.6's capacity re-homing, item 17's relocation, §10.3), an occupants' band change at an epoch, a designation mutation (item 28 (f)) | §2.6's re-cut rule run inside the changing event, from the stored plan as its prior, around its edited and locked rooms as fixed inputs (§7.2), one ladder step per row or household crossed, recorded in the event (`EditBase.mutations`) and listed as fates (§7.3 item 4); an unstored plan is only marked stale (§2.8) and waits for the click above (J-A28.72) | the shell — wing rings (read without the `composition`-role vertices the re-cut adds, §2.6, J-P48 (1)), entrances, heights, roof, basement — and every room outside the wings whose demand changed | — |
| an edit whose prerequisites are missing — `addUndergroundAccess` and the other instances of §7.3 item 9 (d) | the closure (§7.3 item 9): its generators in dependency order on the overlay, each through its own stage's operator, as one event whose batches commit together | everything outside the closure's pieces and their clear regions | — |
| the staged layers (II.6, II.7) | a ground edit re-derives the underground blocks whose recorded ground cells its clear region covers (II.7's declared reads), a tunnel edit the blocks its edges bound, an island edit its own arena; the underground's and an island's reroll writes only its own arena (their seam exception is empty); each underground system's edit and reroll writes only its own part (§3.4, item 65) and the far `link_end` vertices of the links ending on it (§3.4), an undercity neighbourhood's only its void system's part and, the same way, its links' far ends, and a closure's underground pieces the part II.7.6 gives each | the ground arena under an underground edit; every other arena and part, less those far link ends | — |

   **(a) S1's terrain operator**, in order:
   1. *Stroke:* the stroke list is composited on the heightfield and clamped once (§7.2), with `locked` mode's mask.
   2. *Drainage, locally:* priority-flood filling and flat resolution (§2.3) on the stroke's bounding box dilated by 8
      cells, ring cells' levels fixed as spill heights; the box doubles until no ring cell's filled level changes (at
      worst the whole hydrology grid, S1's own cost, §12.4). Filled levels go into the drainage arrays (`flowDir`,
      `flatRank`, `flowAccum`) only, never into the stored heights, so a brushed hollow stays a hollow and drains to its
      spill point; accumulation is re-propagated downstream along D8 from the box. A new hollow deeper than the lake
      threshold is reported ("a hollow: draw water to make it a pond or a lake"), never turned into water. *Test
      (B-EDIT terrain fixtures):* the arrays equal a whole-grid re-run's on the same heights. *Pre-decided fallback:*
      re-run drainage over the whole hydrology grid (frame and margin; its cost §2.3's, §12.4's) — output-neutral, the
      whole-grid run being the reference.
   3. *Fields:* the terrain-reading drivers (elevation above the flood line, low and damp ground, §4.5) are
      re-evaluated on the dilated box, and blocks whose plot samples moved beyond τ re-derive as for a field brush
      (§7.2) — what a reload computes from the drivers and the stroke list (§2.9). Inside an `epoch` event (a `reclaim`
      the engine schedules, §4.11) the re-evaluated drivers only mark due blocks for §4.11's ladder and re-derive
      nothing by τ (§7.2).
   4. *Re-basing, exact* (the one statement; §7.2 and §7.4 cite it): every entity on a changed sample is re-based by
      §2.6's per-entity datum step (the function S11 and S7 call), and a building with a wing standing on another (V02)
      is re-based whole by §2.6's building datum pass when any of its ground wings is on a changed sample (item 370): a
      wing's `baseCm = max(samples) + plinthCm` with its foundation skirt; a row footprint whose fall now exceeds
      `skirtMaxCm` re-split into stepped wings (F-SITEPLAN's first rung; footprint face and address unchanged); towers
      and gates from the samples under their footprints; the wall's `base` profile — each knot whose sample changed
      takes the new value, and a trace vertex whose sample changed and carries no knot gains one (§2.2 rule 5); a
      bridge's `deckCm` and a pier's deck height from their bank elevations plus the clearance row, the buildings on a
      deck re-based with it. A user-edited `baseCm` is kept (fate *kept*, listed) (J-DET-24); every building whose
      terrain gate changed re-derives its basement decision by §2.6's rules — a cellar under a raised water table becomes
      `none`, a slope past the class threshold a walk-out cellar — an edited `basement` kept (item 29).
   5. *Slopes:* every way whose spine crosses changed cells re-samples `slopeP95`; a way now steeper than its class's
      limit is reported with an offer to re-route it (a `regenerate` on that way through S4's or S5's operator), never
      re-routed silently.
   6. *Water:* in `follow` mode, (b) runs for every reach whose bed cells changed.

   **(b) S1's water operator** runs in §4.11's carve order — prepare the finer structure the new water will meet,
   insert the water, re-grow what it displaced — because a coarse insertion may meet finer geometry only at vertices an
   earlier batch of the same edit placed (§3.3). Both geometry batches declare the chain's footprint as their clear
   region under §3.3's clearing and preparation rules, as the carve's batches (1)–(2) do. The terrain and water
   conversions of §4.11 (item 25: silting, a course shift and a foreshore's reclamation) run through this operator as
   their local repair, their new water or land being (1)'s data; a marsh's reclamation runs the terrain operator (a),
   and `digCanal` the carve (§4.11).
   1. *New water, as data* (nothing committed). By trigger: **`moveCourseKnot`** — the course between the moved knot's
      neighbours is recomputed through the knots by S1's control-polyline construction (§4.2 S1 (3)) with the moved knot
      fixed (an edited knot is implicitly pinned, §7.2, so every later re-trace keeps it), width and depth from
      accumulation, shores = the course buffered by its width; a carve beyond `carveMaxCm` is bent (§7.1's outcome
      table). **A `follow` terrain stroke** — each reach whose bed cells changed is re-traced by descent from the nearest
      pinned upstream point to where the new course first meets the old (or its outfall), F-RIVER's re-trace rungs
      confined to the reach; its knots are re-sampled at the control spacing with fresh ordinals, except an edited knot,
      which the new course must pass within half a control spacing of — else F-EDIT, offering to discard that edit.
      **`drawWater`** — the drawn rings (add unioned, subtract removed; a `line` buffered by its width), a drawn river's or
      canal's course being its line; a spring-fed lake's basin and grove by S1's oasis construction (§4.2 S1). **A moved
      shore or coast vertex, or a level-0 `warp`** — the shores as the move leaves them (the stroke's field applied to the
      reach's L0 shore and coast vertices; the rest of the brush moves the land at level 1 by §3.6's warp first), the
      course recomputed as their centreline and the knots re-sampled from it; nothing is re-traced, the user's shore
      being authoritative (§2.3). The **changed reach** is where the new shores differ from the old; an edited coast
      stretch has its sea side re-lowered and its contours clipped (F-CONTOUR); new shore segments take bank class and
      kind by §4.2 S1 (7).
   2. *Crossings, routes, wall runs and footprint, as data.* `siteCrossings` (§4.2 S1 (5)) runs on the changed reach
      (sites perpendicular to the new flow, ends on the new banks); each old deck there — built bridge or unused `site`
      (§2.7) — is matched to its **successor site**, the new site nearest its old midpoint within the search band (§6.3's
      bridge row). The kept ways (F-REDERIVE, §5.2) are re-routed by S4's router over S3's lattice between their nearest
      pinned nodes on either side — the new channel ⊕ `attractCm` impassable except across a deck, every site a
      candidate deck and fixed graph edge, the way's own successor site preferred within the detour bound; F-ROUTE's
      rungs decide, so an extra-bridge deck is sited now (§4.2 S1 (5)). A deck is built at every site a route uses; the
      one at an old deck's successor site takes the old bridge's address, name (§6.3) and assignments when its way uses
      it; every other new site stays a `site` (two bank vertices on the new shores, no span) that (4) inserts with the
      shores. A way whose old deck lay on the changed reach but which the new water no longer meets keeps its geometry,
      and (9) turns that deck into an ordinary segment. Every enceinte run the new or old course crosses is re-traced
      between its nearest unaffected towers, with a water gate where the new course crosses and none at the old (S7's
      operator). **The footprint** is computed last, before any batch: with `B` = (new channel ∪ changed old channel) ⊕
      (`attractCm` + bank setback), it is the exact union of the L1 cells that (i) `B` meets (the vacated land and the
      cells S6 re-assigns); (ii) border a stretch (3) cuts, prunes or replaces — so every cell S5 regrows in (5) — or
      that a kept way's new route crosses; (iii) border the old run of a re-traced wall or a stretch of its setback,
      glacis or intervallum line (3) removes with it (between the feet of the perpendiculars from the run's end towers),
      or meet the re-traced run ⊕ (half its band + setback, + glacis or berm on the field side). These are the carve's
      footprint rules (§4.11); the fate report lists exactly the protected entities inside it.
   3. *One L1 batch — structure first.* It declares the footprint as `KernelTx.clearRegion` and clears it by §3.3 rule
      1, structural finer edges only as it re-lays or cuts them. It inserts each kept way's new route and removes the
      replaced stretch — every way stays one connected chain (§3.10) — placing at the new bank points the two `deck_end`
      vertices of each deck it crosses, under a fresh `Bridge` (§6.3's matching hands it the old address when (4)
      removes the old span), the edge between them carrying `deck` beside `way` (the L0 batch adds none). It replaces
      each crossed wall run by its re-traced run, the water gate's two bank vertices carrying `('gate_end', gate, 0 | 1)`
      under a fresh `Gate` (§2.2 rule 7) whose record (7) builds, and removes the old run with the stretches of its
      strips' setback, glacis and intervallum lines alongside, each through its `StretchRef` (§2.2 rule 5), ends placed
      by `splitThrough` at the feet of the perpendiculars from the run's end towers (the new lines are cut in (7)). By
      F-REDERIVE's way rung (§5.2) it cuts every other way the new channel ⊕ bank setback meets, and every way but a
      kept way at a gate that the new strips will meet, the part not keeping the old anchor handed to a new way first by
      `retypeEdges`' `rekey` on its `StretchRef` (§3.4). It splits every other **structural edge, of any level,** that
      the new banks will cross and that is no way — a settlement-perimeter or district-boundary stretch (L1), a setback or
      glacis line outside a re-traced run (L3, the faces §5.3's NF-P5 row names) — at its two bank points, each carrying
      an `anchor` contact name (§2.2 rule 7), removing the stretch between; and it prepares the map's `border` line at its
      two bank points without cutting it (§3.3 rule 2). What the chain may not move — a locked or pinned way, wall or
      finer entity in the new channel ⊕ setback or in a new strip, or a reservation there — returns to the dry run
      (§7.1's outcome table).
   4. *One L0 batch — the water.* It declares the same footprint and clears nothing (§3.3 rule 1). It removes the
      changed reach's old shore stretches (`removeEdges` on each `StretchRef` between the points where the new shores
      leave and rejoin the old, §3.4) and inserts the new ones through the vertices (3) prepared — the `deck_end`,
      `gate_end` and contact-name vertices listed in `KernelTx.prepared`, promoted to L0 with their contact names
      stripped (§3.3, §3.6). Each deck's span (the way's edge between its promoted bank vertices, carrying `deck` beside
      `way`) now lies across the water in S1 (5)'s form, so no L0 edge crosses water (§2.2 rule 7), and each old
      `Bridge` address passes to its successor (§6.3); each unused new site's two `deck_end` vertices are placed on the
      new shores as S1's L0 batch places a site's (§4.2 S1 (5)). An old shore stretch shared with a quay or riverside
      wall keeps its `way` or `wall` row and is demoted to L1 with its L0-only vertices. A deck left over land keeps no
      L0 edge: where its `deck_end` rows are L1 (a deck a carve, outer moat or earlier water edit prepared, an F-ROUTE
      deck sited inside one of these included) its bank vertices take L1 at once; where they are L0 (placed by S1, S3,
      S4's or an edit's added deck on standing water, or an edit's new site) they keep L0, with no L0 edge at them,
      until (9) removes the rows (§2.2 rule 3) — so the L0 view stays land and water only. The new shores split the
      finer faces they cross, which keep their owners until (6)–(8) re-own them (§3.3 rule 3); the batch meets no finer
      edge but the prepared vertices, because (3) cleared the footprint's partition faces and re-laid or cut every
      structural edge the new water ⊕ `attractCm` reaches. The old decks' and sites' bank vertices on the changed reach
      leave with their shores (their spans having left with the replaced stretches in (3)), except the deck of a way the
      new water no longer meets. Tree scoping (8) and F-REDERIVE (9) act only inside the footprint, and §7.3 item 7 (ii)
      checks byte identity outside it less the seam exception.
   5. *S5:* lesser connections re-grow inside the cells whose ways (3) cut, from the proposals whose origins lie there,
      under S5c's legality (water only on a deck).
   6. *S6:* each land face of the footprint that (4) split from a pre-edit L1 cell takes the district — or the
      hinterland, or the `wall_strip` typing — of the pre-edit cell that held the larger part of its area; a cell merged
      across a removed boundary stretch joins the district holding its larger part only where the stretch was removed on
      land (a cut way) and no boundary re-separates the parts. Vacated land joins the district across its longest
      boundary unless a wall or an arterial separates them (then the next longest; ties by id), or the hinterland; every
      L1 face whose L0 parent is now water leaves the district face set it inherited (§2.2 rule 4) for the water body's
      faces; the perimeter and district boundaries are re-typed on the L1 edges between their face sets, and the margin
      bands follow the S6 row above.
   7. *S7:* re-cuts the strips' setback, glacis and intervallum lines along each re-traced run from the feet (3) left,
      closing them on the new banks, and builds the furniture — towers at its vertices; the water gate's `Gate` record at
      the new crossing, its `banks` naming the two `gate_end` vertices (3) placed; none at the old. The strip blocks'
      band parts come from S10's step (0) in (8).
   8. *Tree scoping:* S8–S12b re-derive every cell of the footprint, vacated land included, by §7.3 item 2 — shared-edge
      parts too (the strips (3) and (7) changed re-run step (0), declared for NF-P5, §5.3) — with succession by anchor
      and fresh addresses for new faces (§6.3); the height samples the edit changed run (a) 2–4 on what stands outside
      the footprint.
   9. *F-REDERIVE* (§5.2) removes every deck and site the edit left over land and lists every re-route, cut, pruned
      stub, succession and demolition of the chain in the fate report with its lifecycle event.

   The deck invariant (§5.3) is evaluated once after (9), over the chain's touched faces; the kernel's invariants hold
   at every batch (J-DET-23).
4. **Edit fates.** The dry run lists every protected entity in the effective scope — locked, pinned, edited or assigned;
   declared (§7.2, listed *kept (declared)*); a closure's created piece (§7.3 item 9, with the event that created it);
   hosting a pin; the target of a pinned label placement; housing a pinned or edited person; an edited close-up entity
   — with its fate: **kept** (a fixed input); **carried** (to its anchor-matched successor, §6.3, after the class-family
   check — an override moves with the address only if the successor's class family accepts the attribute, never by id
   alone); **orphaned** (no successor: the edit stays in the log, is listed in the document's orphan table and can be
   re-attached); or **discarded** (only with "discard edits in scope", recorded as supersede events). A chained edit's
   report also lists its unprotected consequences — bridges re-sited or removed, ways re-routed, cut or pruned,
   buildings re-based or demolished — with their lifecycle events; every edit's report lists the households §2.6's
   capacity rule re-homes, each with its `relocate` event (from and to), the residential slots §4.7 builds to re-provide
   a dossier household's housing, with the uses that re-provision displaces and the plots it joins, and its case-(4)
   renames (§6.3). The user sees counts and the list and confirms every fate other than kept and every rename; an
   action whose dry run lists a rename returns `confirm` even when its scope holds no protected entity (§11.2). The
   confirmed fates and renames are stored in the event (`EditBase.renames`, §7.1). **A replay, or a receiving client,
   compares an event's stored fates and renames with those it computes only when it folds the event under the output
   version that confirmed them** — the `from` of the first live `upgrade` after the event, else the document's own
   output version — and reports a mismatch when they differ. Folded under a later version, the recomputed values are the
   ones applied: the upgrade names those events once in its diff (`MigrationMap.changedConfirmations`, §7.5), and no
   later load re-reports them; the upgrade's undo, replaying under `from`, compares them again.
5. **Recorded inputs.** Regenerate (keep settings) re-derives the kinds that persist a derivation record (§2.8) —
   plots, blocks and buildings — with their *recorded* inputs, so it reproduces an untouched entity byte-identically even
   after an epoch or a field edit elsewhere moved the current inputs; re-deriving with the current inputs is Adjust.
   Kinds without a derivation record (ways, districts, walls) re-derive from their current upstream state, which only an
   explicit edit or an epoch changes; the provenance rebuilt by their last derivation or by the verification replay holds
   what they read (§2.8). Every generated name keeps its naming record (§2.8).
6. **The dependency graph is the audit.** `Provenance.deps` (every entity records what it read) serves (a) as the audit
   of §7.3 item 7 and (b) as an optimisation for Adjust — invalidating exactly the closure of a changed parameter or table
   slice — only where the oracle has proven that stage's declarations complete; elsewhere tree scoping applies. Both
   routes leave the same records, because a re-derivation that reproduces an entity's leaf digest keeps its old
   derivation record (§2.8).
7. **The oracle** (run on every B-EDIT sequence):
   (i) **replay = session** — replaying base and log in log order gives the session's model digest and records digest
   (§6.2), on sequences that mix drawn features with later attribute edits, epochs, rebases, undo and redo; among them
   the **naming-collision fixture** — two scoped regenerations in different districts whose new ways draw the same
   street name, then a `moveLabel` on the second way's label and a `setAttr(name)` on the first: the replay's names,
   `LabelEntity` records and digest equal the session's — and a corpus selection and a naming-row edit with their
   case-(4) renames, stored in the events and recomputed equal;
   (ii) **outside the scope, byte-identical** — every entity outside the effective scope keeps its leaf digest; the
   oracle **computes** the seam exception (§7.3 item 1) from the batches' commit records (changed faces per level, portal
   roles added or removed) and checks each excepted neighbour cell, plot, footprint and wing ring (a stored
   composition's rings included, §2.6) equal to its prior ring after removing those vertices, and, for an edit that
   stores a stage-3 composition or an event that re-cuts a stored plan (§2.6), each face and wing ring §2.6's
   composition rule (1) adds to its scope equal to its prior ring after removing the vertices that rule inserted, with
   the `composition` role rows it adds present;
   (iii) **content** — content and relation digests outside the scope are unchanged;
   (iv) **faithfulness** — Regenerate (keep settings) by byte identity; New random per regenerated scope against K = 50
   independent from-scratch generations of the same scope (same context, rerolls 32 768 + i, i = 0 … K − 1): for each
   of median plot area, frontage width, density and attached share, the **rank** of the regenerated value among the K —
   the references below it plus a uniform draw from 0 … t over the t references equal to it, drawn from the campaign's
   own stream (exactly uniform on 0 … K for a perfect regenerator, ties included). The nightly campaign judging these
   ranks — its size, test and calibration — is §13.2's (O9 c);
   (v) **coarse edits** — terrain-brush (both water modes), course-knot, drawn-water, moved-shore, level-0 warp,
   drawn-way and drawn-wall sequences end with 0 hard invariant violations, 0 decks and 0 sites over land, 0 off-deck
   crossings, 0 wings off §2.6's datum rule, 0 footprints in water, an event for every demolition, cut and re-route,
   every arterial at its destinations or reported `unserved`, and every bridge that still has a site within the band
   keeping its address and name. A river move across a street grid commits (no `E_LEVEL` or `E_KEPT`) with its decks on
   the kept ways and its cuts on the others, every face outside (b)'s footprint byte-identical; **a pond drawn inside a
   block, and a river bank widened into its riverside blocks between two bridges, each commit with no `E_LEVEL` or
   `E_KEPT` and every face outside the footprint byte-identical**; a river moved across a wall between two towers
   commits likewise, every indexed role unique per ordinal, the water gate's `Gate.banks` on its two `gate_end`
   vertices, no `anchor` contact name left, 0 NF-P5 violations; a river moved across the settlement perimeter leaves 0
   district faces outside it; a course-knot move replayed after an upgrade that changed S1's knot count binds its knot by
   address and ordinal or is reported orphaned, never bound to another body's knot;
   (vi) **shared-edge identity** — Regenerate (keep settings) of a perimeter district, a walled district and the
   hinterland is byte-identical to the one-click result; after `outskirtToDistrict`, `drawBoundary` and a district
   merge, every L1 edge two face sets share without corridors carries a margin band on both sides and no other edge
   carries one (§7.3 item 3's S6 row);
   (vii) **mutations and dossier events** — a designation change, a relocation, a plot `join` or `split`, a dossier
   event, a positive placement, a rejection, a `relet` with the re-cut of a stored plan it runs (item 28 (f)), a plan
   edit or rung re-roll, a closure edit with its undo and the deletion of its edited thing (§7.3 item 9), and a sugar event
   with its expansion (item 101) are edits under (i)–(iii): byte identity outside their touched set (the effective scope
   of §7.3 item 1), the same record on every host, and A → B → A by the inverse mutation byte-identical when nothing else
   changed (§4.7 S11 rule 5; the fixtures are §13.2's).
8. **Designation changes are mutations, not re-derivations (item 18; J-A18.71).** Where an edit changes what a plot is
   for — `assign` and `unassign`, a `setAttr` on a plot's use or class, `openUse`, `closeUse` and `relocateUse`, a
   dossier event, `placeAt` and the re-placement a `rejectSite` causes — the engine does not discard the plot's finer
   content and re-run S11 (§7.3 item 2): it runs §4.7 S11's designation mutator on the plot, which keeps every part that still
   fits the new designation's template, adapts, converts, adds and subtracts the rest as a recorded `MutationRecord`
   drawn from the plot's `siteplan.mutate` stream (§6.1), and joins a neighbour only when the template's size budget
   needs the land (a `join`, chained as §7.3 item 3 states). Its effective scope is those plots' faces (§7.3 item 1); its fates are
   §7.3 item 4's (a locked part is *kept*, never subtracted); reversal applies the inverse record (§7.4). Tree scoping remains
   the path of Regenerate (keep settings) and New random on the same plot, which are re-derivations and say so (§7.1).
9. **Closure edits — an edit generates the prerequisites it implies (item 66; owner: "if a user edits a building to
   have an access to the underground, it generates all the necessary pieces"; J-A66.71).**
   (a) *The rule.* An edit whose target lacks what it needs to stand — its **prerequisites** — is expanded at its dry
   run into its **closure**: the minimal set of pieces that makes it lawful, in dependency order (each piece's own
   prerequisites first). An edit kind that can imply prerequisites declares its **closure generators** in the entity
   registry (§2.8), in that order, each naming the stage operator it calls; an edit kind that declares none is never
   expanded. The closure is the edit's ONE event: its batches — each one level of one arena, and on the underground
   layer of one part (§3.3's transactions, §3.4's parts, §4.1) — run in dependency order on the dry run's overlay and
   commit together from it, so it commits whole or not at all.
   (b) *Seed and locality.* Every piece draws from the edited entity's and its target's lineage streams under the
   calling stage's concerns, keyed with the event's `seq` (§6.1), and is minted from the event's `seq` and its ordinal
   in dependency order (§6.3; J-A18.43's pattern): one edit, at one log position of one seed, always yields one set of
   pieces. Its effective scope (§7.3 item 1) is the pieces and their clear regions; byte identity holds outside them (§7.3 item 7
   (ii)).
   (c) *Record, undo and ownership.* The event stores its closure record (`EditBase.closure`): the pieces it created,
   in dependency order, and the existing pieces it reused (a connector already dug, another cellar). `undo` removes
   exactly the created pieces and restores what they replaced (§7.4); nothing it reused is touched. A later deletion of
   the edited thing — a `delete` of the access point — removes the created pieces nothing else now uses: a connector a
   second access has come to share stays, that access's closure record naming it among its reused pieces. A basement
   the closure created returns to §2.6's derived basement decision unless the user has edited it since (an edited
   `basement`, §7.2). The pieces are held while the edit that created them is live (§7.2). A closure creates map facts
   only, never a dossier fact (item 20 (h)); a closure that would change a dossier-owned value is refused (§7.7 item 11).
   (d) *Instances.* `addUndergroundAccess(building, target?)` (§7.1) is the first. Its generators are II.7.6's pieces
   (J-A66.41): the basement by §2.6's requested-mode ladder — the request overrides the probability, never the terrain
   gate: a full cellar, else a half cellar or a walk-out on a slope, else a hatch to a crawl space, else a refusal naming
   the gate —; the target in II.7.6's order; the dug connector; the minimal private underground where none exists; the
   access point; the plan reservation (the basement plan's stair, ladder or hatch, its rung marked `stale`, §2.8); and
   the links. A clandestine front that lacks its concealed door (§4.7, item 63; the `setAttr` that sets a placed use's
   `concealment` to `front`, acting on the use's building; T66-5), an undercity neighbourhood that an edit leaves
   without a lifeline (II.7.5's condition 4, item 65; a `drawBoundary` that adds one on the undercity's part or a `split`
   of one, acting on that neighbourhood's `District`, whose lineage keys the lifeline's draws), a `drawChamber` with
   `newKind` (§7.1), an aqueduct's terminal fountain (§7.1) and a declaration that places dwellings in an underground
   cluster nobody can reach (V04's excavation reading `unexcavated`) — a `quarter` or `drawBoundary` on a void part, a
   `placeAt` of a dwelling class on a void plot — are closures too, each built by the generators its edit kind declares
   (§2.8) — a concealed door by §2.6's entrance rules (§4.7's *Concealed institutions* (4)), a lifeline by II.7.6's
   target, connector, access and link pieces —, and every later edit kind that implies missing prerequisites declares its
   generators the same way. **The dwelling closure** (item 372; J-VI.4): a dug access from the ground building nearest
   above the cluster whose dig floor lies within `DigRule.maxM` of the cluster's nearest element (V04 §3.5.7 (d)'s kinds,
   cause `edit`), else a public opening at the nearest of V04 §3.5.7 (e)'s candidates, its chance waived (cause `edit`),
   else a public opening of kind `collapsed_shaft` at the point of public ground over the cluster nearest, in plan, to its
   shallowest element (cause `edit`); where none of the three exists — no public ground lies over the cluster — the dry
   run bends the declaration onto ground part 0 over the same footprint, named `bend.under.noAccess`, offering "add a way
   down". With the dug access the dry run lists in `PreviewResult.alternatives` the further buildings the same rule
   qualifies, in its order (plan distance, then address), at most three; an `addUndergroundAccess` without a `target`,
   grouped before a dwelling declaration on that cluster from one of those buildings, takes as its target the cluster's
   element nearest in plan to the building's footprint (ties by address) — the element the dug access measures from — so
   the declaration's closure finds the cluster reachable and generates no access of its own. **At generation** the
   connection stage calls the lifeline and dossier-institution generators (II.7.6; item 561) with no `ClosureRecord`:
   generated pieces re-derive with their owner, edit-made pieces are held, and a `regenerate` on the `dug` system
   re-derives only its generated pieces. The closure rule and the edit kind are the base's; `addUndergroundAccess`'s
   underground pieces (II.7.6) run once the underground layer's stages exist (II.7.4; *Staged by the owner's roadmap*),
   and until then its dry run refuses naming the staged layer (§7.1's outcome table).
   (e) *Failure.* A generator that cannot produce its piece ends the expansion: the dry run returns the nearest lawful
   form its ladder reached, bent, or the refusal with its reason (§7.1's outcome table), and nothing commits.

```ts
interface ClosureRecord { created: { id: Id; piece: 'basement'|'target'|'connector'|'system'|'access'|'reservation'|'link'|'door'|'chamber'|'fountain' }[] /* in dependency order */;
  reused: Id[] /* existing pieces the closure attached to */ }   // EditBase.closure (§7.1); read by undo, by a later delete and by §5.3's closure row
```

10. **Variations** (item 101 R5; J-A101.75). A derived fill — a `fill`, T8 `fill`'s brush, a scoped New random — offers
   **three variations**: its dry run derives the scope at its next three distinct rerolls on three overlays — §5.1 (6)'s
   check advancing a variation whose content equals the current scope's or an earlier variation's to the next unused
   reroll, within `reroll.maxAdvance` — and the ghost shows them side by side; the variation the user accepts commits as
   that `regenerate` with its absolute reroll map, and the others leave nothing behind. A variation whose advances run out
   without a distinct content is not shown, so the ghost shows the one or two distinct variations found, never a
   duplicate, or reports `no_alternative` when none differs. Declared entities are kept in every variation (§7.2).
=== END ===

=== REPLACE ### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8 ===
### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8

**Replay semantics.** The log is an **ordered fold**: each event applies to the state its predecessors produced,
through the same code path interactively and on replay; nothing is hoisted, and epochs, rebases, upgrades, undo and redo
are events like any other. **The one read-ahead** (the one statement; §6.2, §7.1 and §7.7 cite it) is the log's
**creation prefix** — the events at positions 0…k flagged `creation` (`EditBase.creation`): the base derivation's S2
reads its `assign` events (the blueprint's and the creation dossier's) as fixed rows before it runs; each stage reads a
skeleton's drawn declarations there as its constraints (§4.1, item 101; J-A101.41); and S12a reads its `dossierRecord`
puts of deposit sites (writing their derived bearing and land use) and §4.5's typing its power relations the same way
(V08 §3.11; item 395) — so a town grows around its declared bones and one seed replays it exactly; folding those events
afterwards records the generation run's placements and places nothing a second time (§4.2; J-A22.41, J-A22.72,
J-A22.74). Under history-first generation (§4.11 *History-first generation* (2); V06 §3.20.3) the creation prefix also
holds the replay's `epoch` events, appended by the runner after `generate` and flagged `creation`; S2 then runs at the
replay plan's start population (V06 §3.20.3) without the creation dossier's `assign` events, which the last replay epoch applies at its
dossier step (e) by least disruption, so the replay ends meeting the dossier's present facts exactly. **No undo target** (the one statement of the rule; the outcome table of §7.1 gives the actions): a
`creation` event belongs to the base derivation it feeds, not an edit of the map it made, and is never an `undo`, `redo`
or `revert` target and never truncated — a blueprint assignment is removed by `unassign` (§7.3 item 8's mutation), a
skeleton's declaration by a later declaration or a `delete`, a dossier element only by a dossier event (§7.7 item 2);
a replay epoch of the creation prefix is a `creation` event like the rest. Every event of the port's reserved session
`host:port` (§7.1; V08 §3.6 (6)) — dossier events, `dossierFacts`, `dossierRecord` and the port's epochs alike, whether or not
a port epoch carried a dossier change in `EpochInputs.dossier` — is likewise
no `undo`, `redo` or `revert` target of a map event, named by the undo key, an owner's `undo(h, of)` (§11.2) or V09's
*Go back to here* alike, because undoing one would change dossier content or the host's clock without a dossier
instruction (item 20 (c)); the undo key and `revert` skip all of them, and the port's events sit on no user's stack.
*Fixture (B-EDIT, §13.2):* an owner's `undo(h, of)` naming a port year-end epoch that carried no dossier change returns
F-EDIT (`refuse.undo.dossier`) and changes nothing. In the
table, "case (4)" means the event runs §6.3's case (4) for the name it frees or whose inputs it changes.

| kind | create | read | persist | regenerate (how the engine honours it) | undo | migrate between output versions |
|---|---|---|---|---|---|---|
| lock / unlock / pin / unpin | T10 `hold` or the API on any address, optionally on attribute paths | entity `flags` (derived from the log) | log | a fixed input; dependants re-derive around it; a lock on a name path keeps the naming record dormant (§2.8); an `unlock` that frees the name runs case (4) | inverse event; undoing a `lock` that frees a name runs case (4); an unlock that re-drew a name keeps the former name and naming record in its undo record, which its undo restores | address mapped (§7.5); an orphaned lock re-imposes its last geometry as a drawn constraint unless the user drops it |
| setAttr / setAttrMany / paint | the binding's home tool (§7.1); a bulk query resolved to ids at dry run | entity attributes; `flags.edited`, `editedPaths` | log | an input override at the stage that computes the attribute (a name: S13a keeps it and never re-draws it while edited, its naming record dormant; a district kind: S6 reads it as fixed; heights and roof: S11); implicitly pinned (§7.2); a plot's `tenure` and a district's `identity` are overrides of derived values, kept until reverted (items 70, 72); a change of a front's designation runs S11's mutator on the front, the concealed use persisting and its concealed rooms re-fitted (item 63); a `setAttr` of a dossier-owned value never reaches the fold (§7.1's outcome table) | inverse (old values in the undo record); undoing or reverting a `setAttr` on a generated name returns it to unedited with its dormant naming record and runs case (4), the text it replaces kept in that event's undo record; a `setAttr` of heights or class that re-homed households keeps their former buildings in its undo record, which its undo restores (§2.6) | attribute names schema-versioned with a rename table; unmappable → orphan, reported |
| moveVertex / warp | a vertex handle, stored as lattice point + role signature; T2 `ground`'s staged warp session with Apply (§7.1) | geometry | log: the operation (arena key, strokes, `fromLevel`; a `moveVertex`'s `at` with its `VertexSig`); per-vertex displacements only as a verification record | the kernel's whole-step validation, halving, sliding and holding (§3.6); kernel-pinned vertices move (pins constrain smoothing, simplification and cutting); what stands on the ground is carried and re-based (below); moved water goes to S1's water operator (§7.3 (b)) | undo record: moved vertices, re-derived faces, the former birth levels and flags of promoted and demoted vertices and edges, the former points of displaced records, former wing rings, basement rings and stored compositions, former bases of re-based entities, and the households §2.6's capacity rule re-homed, with their former buildings | the operation replays at its log position; a `moveVertex` binds by `resolveVertexAt` — the exact point, else a signature match within the rebind radius, else orphaned and reported |
| moveCourseKnot | T2 `ground`: dragging a river's control knot | `WaterBody.controls` (§2.3); the knot's path `controls/<ordinal>` in `editedPaths` (implicitly pinned, §7.2) | log: the water body's address, the knot's ordinal, `at`, `to` | S1's water operator (§7.3 (b)); every later re-trace keeps the moved knot | undo record: the replaced scope of the whole chain and the knot's former position | once the water body's address is carried (§6.3), binds (1) the knot with that ordinal if within the rebind radius of `at` — half the body's control spacing (§4.2 S1 (3)); (2) else the body's nearest knot within the radius, ties by ordinal; (3) else orphaned and reported; never a knot of another body |
| drawWay / drawWater / drawWall / drawGreen / drawBoundary (their raised, aqueduct, retaining, spring, walk and `key` forms included) | T2 `ground` – T5 `quarter` with resampling, snapping (first-crossing split, attraction) and validation at the authoring boundary (§7.1); their points forms (item 101) | entities with `existence = built`, author `user`; declared, so held (§7.2) — a raised way's record and parts, a `RetainingWall`, an oasis's water body with its spring, grove and gardens (§2.3, §2.7) | log (the geometry is the payload — for a points form the shape its dry run derived, stored resolved and never re-derived) | at its log position through its class's local operator (§7.2, §7.3), chained operators included — a raised way through the raised-way course solver on its own ground part, a retaining wall by S10–S11's levelling on its high side, an oasis through S1's water operator with its grove and gardens re-derived by S12 on their faces | undo record: the replaced scope of the whole chain | the same geometry replays at its log position under the new version; an older document has none of item 110's or item 111's forms, and none is invented |
| drawTunnel / drawChamber / addLink / placeAccess (items 11, 12, 64, 65; J-A12.71) | T4 `road` (tunnels, links) and T6 `place` (chambers, accesses) on the underground layer (II.7; a staged layer, editable in the base) | the `Tunnel` or `Gallery` record and its chain, the `Chamber` record and its outline, the `UndergroundLink` record and its two `link_end` vertices, each in its system's part (II.7.6); the `AccessPoint` record, its `state` — set by its rule's row, an edit, or the access closures of its host's change (a use turned to a class whose access row is 0, a ground host no longer admitted: `bricked`; V04 §3.10; item 555) — and `knownTo`, and its `access_point` vertex (§2.7, II.7.4) | log (the geometry is the payload) | at its log position: a drawn tunnel through II.7's network stage (its chain inserted on the underground arena, `navigable` derived) and the underground stage re-deriving the underground blocks its edges bound (§7.3's staged-layers row); a placed access point by II.7.3's access rules, its ground host found by `pointLocate` on the ground's `PlatKey`, nothing on the ground written; a gallery or chamber through its system's stage on its own part, a chamber with `newKind` as a closure (§7.3 item 9), and a link between its two parts' vertices, one part per batch (§3.4); an access point's underground end moves by `moveVertex` on its `access_point` vertex and its opening by `setAttr` on `ground.at`, re-hosted the same way and refused outside II.7.3's admitted ground; its `state` re-set by its host's access closures | undo record: the replaced underground scope; a moved opening's former `ground.at` and `host`; a `newKind` chamber's system with it | the same geometry replays at its log position; an access point whose element is unmapped is orphaned and reported |
| addUndergroundAccess (item 66) | T6 `place` (a building's "Add a way down"); the API | the `AccessPoint` and the pieces of its closure; the event's closure record (`EditBase.closure`) | log: the building, the optional target and kind, and the closure record | at its log position, the closure's generators in dependency order (§7.3 item 9); its pieces held while it is live (§7.2) | undo record: the created pieces removed and what they replaced restored, the reused pieces untouched, a created basement back to its former state; a later `delete` of the access removes only the created pieces nothing else uses (§7.3 item 9 (c)) | replays at its log position; an event whose building is unmapped is orphaned and reported |
| placeSkyAccess (V05; item 375) | T4 `road`'s stroke to a rim, or the API | `SkyAccess` and its landings | log | kept by regeneration, its top re-seated on a re-derived rim (V05 §4.3) | removing its top, its claims and its landing designation | address mapping |
| placeGate / quarter / roster / group / terrace (sugar, items 101, 110 (a)) | the authoring tools (§7.1's toolkit), the clerk's tool API (§11.2), a skeleton file (§11.1) | the entities its expansion made; declared, so held (§7.2) | log: the sugar event itself, with its `expansion` version — one undo step, one fate report | expanded at its fold into its events (§7.1's sugar rule) | undo record: the whole expansion's scope, as one step | §7.5's sugar rule |
| declareEnd; drawWay with `walk` (V07 §4.4) | T5 `quarter` at a village rung (the `quarter` sugar there); T4 `road`'s walk mode | the `VillageEnd` and its plots; the resolved spine | log (the end, the spine resolved) | held: the end's lasso plots re-joined on every re-derivation, never merged or capped (V07 §3.10); a walked spine never re-walked — the stored spine is the recorded input | the event's inverse (the end removed; the way removed, its faces re-joined) | the event's schema version; an event without `boundary` reads a point declaration; a walked way as `drawWay` |
| startWorks / cancelWorks / setAttr on a Works (item 67) | T9 `shape` ("Build it over time" on a build, convert, join, split or delete); an epoch's step (§4.11) | the `Works` record; its stage at a week derived from it (§4.11) | log: the event with the change it wraps (the epoch's own for an epoch's Works) | §4.11's Works: a `startWorks` folds the change it wraps at once at its position (§4.11 (1); J-A67.72) and creates the Works that shows it — the change of ownership at its start and the stages derived from the record and the week; a `cancelWorks` ends it by §4.11's rule | undo record: the wrapped change's inverse and the Works record, with the plots and buildings its start changed | the record replays; its stages follow the output version's `WorksTable` |
| placeLight / setAttr / delete on a light (item 68) | T12 `dress` | the `LightSource` record (§2.7) | log | a hand-placed light is declared (§7.2): it survives a regeneration by its anchor — its host's address, rule row and ordinal (§6.3) — and follows its host's lifecycle (§2.8: removed with a demolished host, unlit on an abandoned one); rule-placed lights re-derive with their host's faces (§4.7, §4.11) | inverse; exact | by its host's address; a light whose host is unmapped is orphaned and reported |
| drawFootprint / build / moveFootprint / swapUse / fill | T6 `place`, T8 `fill`, T9 `shape` | building and plot entities | log | S11 re-fits the host plot(s) with the footprint as a fixed slot; `fill` re-runs S11 on its scope with the forced arrangement | undo record | replays; a footprint whose host plot is unmapped re-creates a plot around it |
| delete / merge / split / join / convert (incl. the ladder kinds — `relet`, `densify`, `thin`, `subdivide`, `amalgamate` —, the decline kinds, the tunnel and island kinds, the use kinds, the sealing kinds, the terrain and water kinds of §4.11, V06's `EvolveOp`s — `absorbWall`, `downgradeWay`, `upgradeWay`, `burn`, `retypeLand`, `repairRaised`, `repairRetaining`, each with cause `convert:<op>` (item 209); the wall-condition ops `wearWall` and `repairWall` are the next row — and the underground layer's `flood`, `raiseGrade` and `clearUndercity`, II.7.5–II.7.6) | context actions of the binding's home tools; the evolution engine's plan (§4.11) | lifecycle events with cause | log | structural ops on the plat (§3.4): a district or way `split` / `merge` with dependants re-derived; a plot `join` or `split` is item 31's fusion or splitting — S10 (7)'s re-cut of the members with their neighbours fixed, S11's mutator on the result, an occupied building's demolition only as a confirmed fate (§7.1, §7.3 item 8); `convert` = `retypeEdges` plus lifecycle events; decline conversions change `existence` and the drawing (§2.8), credit or debit the material ledger (§4.11), and a `reuse … build` succeeds at the trace's address (§6.3); tunnel conversions change the tunnel's `existence` and `closure` (its condition reads them, §2.7; J-A11.21) and close or reopen the frontage plots on the run (II.7.3); island conversions resize an arena or archive it (`fallIsland` lays the ruin face through the carve path, §4.11); use conversions open, close or relocate a `Use` (§2.7) with `detail.from` / `to` and mutate the buildings by S11; `relet` sets a building's household count within §2.6's capacity (item 28 (f)) — households added are minted from the event, households leaving go by item 17's relocation (§4.11, §10.3) —, marks an unstored plan stale and re-cuts a stored one inside the event (§7.3), no shell geometry changed; `densify … infill` and `thin … infill` add or clear yard buildings by S11's mutator; `densify … back_court` and `thin … back_court` re-cut the plot's yard by S10 (7) with its neighbours fixed, adding or removing a rear row and its passage face (§4.6, §4.11); `subdivide` and `amalgamate` are rung 3's re-cuts, whose hand forms are §7.1's plot `split` and `join`; `sealPassage` / `openPassage` set `Passage.sealed` (§2.5), change no geometry, and vacate or reoccupy the plots behind it (§4.11; item 30); `siltReach`, `shiftCourse` and a foreshore's `reclaim` run S1's water operator (§7.3 (b)), a marsh's `reclaim` its terrain operator (§7.3 (a)), and `digCanal` is the carve (§4.11); a split or join of a chain carrying a profile (a way's width, a wall's base, a tunnel's invert, a shore's bank kind or class, a retaining wall's state) goes through `retypeEdges`' `rekey` on the part's `StretchRef` (§3.4) — each part gets a cut knot carrying the sampled value, a join knot is dropped only where the joined profile is unchanged (§2.2 rule 5) — and the event writes both records' returned profiles; a `delete` records its suppression (§7.1) | undo record: members resurrect with their former rings, records and `builtBand`, tombstones return to live, both records' former profiles; a decline or tunnel conversion's former state and ledger rows; a fallen island's arena restored from the archive and its ruin face removed through the carve path's inverse; a `reuse … build` undo returning the address to the trace; a use conversion's former use and building links; a `relet`'s former count, household links and stored plan; a ladder conversion's former rings, records and passage face; a terrain or water conversion's replaced chain scope with the records §2.3 lists; an `EvolveOp`'s former state; a mutation's inverse record; a delete's suppression lifted | replays at its log position; a target the migration cannot map is orphaned and reported (§7.5) |
| wearWall / repairWall with its material (item 114; V06 §2.8's ops) | T3 `wall` (a run's grip: **Wear**; **Repair** with its material chip — robust, or a patch row of V11's `walls.patchMaterials` for the enceinte's kind and culture, V09 §4.21.4; a neglected ring's **Back in use**, the no-stretch repair); an epoch's walls step (V06 §3.7.7), with cause `convert:<op>` | `Enceinte.condition` per run — `standing` · `worn` · `patched` · `breached` · `dismantled` — with each run's material and last-change epoch (§2.7), read by §8.2's state rows, §11's exports, the `enceinte` explainer (V10) and V06's need-and-means transitions | log | held by the run's knot profile (§2.2 rule 5): S7's operator carries the profile through a re-trace, a re-derivation never re-derives a condition, and the run keeps its state until an epoch's walls step or a later edit changes it; a `wearWall` on a run not `standing` and a repair with nothing to repair are no-ops with their line, and a repair on a `dismantled` run bends to a new stretch drawn on its line (`drawWall`; J-VI.4) | inverse: the run's former condition, material and last-change epoch — for a no-stretch repair also the ring's former existence and pathway — restored | an older `repairWall` without a material reads robust; an older profile's runs keep their values and read material robust (§7.5) |
| regenerate / adjust / re-derive from Sk | T10 `hold` (regenerate on an area, district, block, plot, person, rung, tunnel run or system, island, or a household's people — the scope `people`, §10.3) and T1 `intend` (adjust) | report entry; the fate list | log: resolved scope, mode, absolute rerolls used, confirmed fates and renames | §7.3; New random's content check (§5.1 (6)); a pack-list `adjust` and any re-derivation reaching S13a run case (4) for the unedited names citing a changed slice; `Adjust` re-derives with the current field and sets `builtBand` in its scope, listed in the fate report, while Regenerate (keep settings) keeps it (item 31); a `people` scope re-derives the chosen households' people under the current person tables (`Household.tableVersion` advanced), pinned and edited people kept as fixed inputs (§10.3) | undo record: the effective scope's faces, entities (names and naming records included), lifecycle events and tombstones, O(scope) — an undo restores the former names, never re-draws them; for a `people` scope, the households' former `tableVersion`, so their people derive as before | the scope replays; fates and renames recomputed and compared under §7.3 item 4's rule |
| regenerate with the scope `shade` (V05) | T10 `hold`, or a shade fate's button | the island's `shadeBasis`, its strips and the field cells of its two windows | log | replayed as the same scoped shade evaluation | restoring the former basis, strips and field cells | as any `regenerate` |
| convert removeIsland (V05) | T10 `hold`'s delete on an island, or the clerk | the island record's state `removed`; every re-derivation's S7b (5) and every epoch | log | honoured as a hold: the slot is never drawn, filled or re-opened while the record stays `removed` and unreleased (V05 §3.2 (6)) | the island restored from the undo record (its arena from the archive, its households, accesses and landing uses) | address mapping |
| reclearIsland (V05) | the epoch participant `sky.clearance` only | the island's altitude readers | inside the epoch event | replayed with its epoch | with the epoch | as the epoch |
| assign / unassign (a dossier event among them, `EditBase.dossier` set) | T6 `place`; the assignment dialog; the host API; the host door (§11.4) | `assignment` fields, `flags.assigned`; a dossier-backed assignment's `existence: 'dossier'` (§7.7) | log; blueprint and dossier-at-creation assignments in the creation prefix (Replay semantics) | §4.7 S10b places (claims-first in the creation prefix, the least-disruption order after the city is built) and §4.7 S11 mutates each placed plot, the record in `EditBase.mutations`; an assigned name keeps the naming record dormant; an `unassign` leaves the plot vacant (`closeUse`, §4.11) and frees the name, which runs case (4); a dossier-backed element's existence is held (§7.7 item 2) | the inverse mutation from the undo record (§4.7 S11 rule 5) and the former placements — for an event that is neither a `creation` event nor an event of session `host:port` (Replay semantics) | addresses and criteria; unmapped members re-solve around the mapped ones (§7.7); a dossier element re-binds by its `DossierRef` |
| dossierFacts / dossierRecord (V08) | the port only (author `host`, session `host:port`) | `Document.dossier` (the ledger's fold — `DossierBinding.quarantined`, `.lateCalamities` and `.notes` among it, each rebuilt by folding the `dossierFacts` events, §7.7; `lateCalamities` read by the port's next absorb, §4.11 *The clock* (4)); the staged records (§2.7) | log | replayed by fold; `dossierFacts` has no model effect; a `dossierRecord` put creates the record or rewrites its fields in place, a retire ends its lifecycle, the record staying as a tombstone for §6.3's supersedes table | none: never an undo, redo or revert target (Replay semantics) | none needed |
| rejectSite / placeAt (item 20 (b), (g)) | T6 `place` ("Not here" on a dossier-backed element; "make this place X"; "Free this plot") | the rejection record and the plot's pin (§2.8, §7.7) — model data | log | `rejectSite`: the element is re-placed by §4.7 S10b's solver at the event's position and the site is excluded while the rejection holds; the hold lapses — the site eligible again — by §7.7 item 3's lapse rule, the lapsing event writing the lapse into the record inside its own touched set, never as a log event of its own (J-A20.74); `placeAt`: the plot is pinned to its element or designation, honoured by every later placement and re-application that can, reported when one cannot | inverse (`lift`); the re-placement's scope restored from the undo record; an undo of a lapsing epoch that is an undo target — one outside session `host:port` — restores the hold, while a lapsing event of session `host:port`, a dossier event or a port epoch, is no undo target (Replay semantics) | by the site's and the element's addresses; an orphaned rejection or pin is reported |
| setEntrance / setAttr(basement) (item 29) | T9 `shape` | `Building.entrances`, `Building.basement` (§2.6); `editedPaths` | log | edited attributes: a moved main entrance and an added, moved or removed door are fixed inputs of the site plan, carried with the wing (§2.6) and re-fitted around by S11's mutator on a designation change — a house that becomes a shop gains its street door, a shop that closes keeps its door as a house door (§4.7 S11); an edited basement is kept through terrain changes (§7.3 (a) 4) | inverse | with the building's address; an entrance whose wing is unmapped is re-placed by §2.6's rules and reported |
| drawPassage / sealPassage / openPassage / setAttr(knownTo) / setAttr(reach) (item 30) | T9 `shape` and T11 `name` on a plot, a block, a building or an institution | the passage face and its `Passage.sealed` bit (§2.5; an access row on a sealed passage face reads sealed), `Block.reach`, `Plot.knownTo` / `Building.knownTo` / `Institution.knownTo` | log | the passage face and the rear plots' access rows are fixed inputs of S10's re-cut; an access row on a sealed passage is skipped by §5.3's reachability walk and the plots behind it decay as vacant under §4.11's ladder; a `setAttr` of a block's `reach` re-derives its interior by S10 (7)'s re-cut with its neighbours fixed (J-A30.72); `knownTo` is read by §9.2's label policy only — no model geometry changes; a dossier event that sets one writes it as any dossier fact (§7.7 item 7) | inverse | by address; a passage whose building is unmapped is reported |
| plan events (setRoomRole, moveWall, splitRoom, mergeRooms, setOpening, setWindow, moveStairCore; item 28; setRoomUnit, item 28 (f); setHearth and `instance` on a room's furniture, V03) | T9 `shape` at the building band (§8.5) | the stored composition's plan (§2.6); a room's `unit` (§2.6); the furniture items | log; the first plan event or furniture `instance` stores the composition (§2.6) | a fixed input to the rung's re-derivation — a stored plan whose inputs change is re-cut inside the changing event around the edited rooms, as any edited attribute is (§7.2), from the stored plan as its canonical prior (§7.3's table); an edited unit is kept while its household still lives in the building and listed as a fate when it leaves; `carryWings` carries the rooms with the wings | undo record: the former storey — for `setHearth`, every storey the stack crosses | by the building's address and the room's anchor (§6.3); else orphaned and reported |
| setMassing / setComposition (stage 3; V02 §4.4) | T9 `shape` at the building band; the clerk; a skeleton file line | `Building.wings` (roles, keys), `Building.massing`, `nextWingKey`; the stored composition's dormer rows, porches and edited rooms | log; the wings are model data; the first `setComposition` stores the composition | the edited wings a fixed input to every later S11 run on the plot (implicitly pinned, §7.2), carried by `carryWings` under warps, an edited wing kept by a designation mutation; an edited composition a fixed input to the `wings` and `rooms` rungs, re-matched by key when the wings change (V02 §3.9 W8); orphans to §7.3's orphan table with re-attach and discard (V02 §4.4) | the former wings and massing reference with S11's re-fit; the former composition, or none | by the building's address and each wing's key (§6.3's base-wing row); an op naming a key that no longer exists orphaned and reported; a retired family mapped through the grammar's migration row |
| regenerate with `rung` (item 28) | T10 `hold`: New random on one elaboration rung | the rung's counter (§6.1; the event's map under `<building id>#<rung>`) | log | the rung re-derives with its advanced counter under §5.1 (6)'s content check; re-rolling a finer rung changes no coarser stream (§6.1): `plan.layout` keeps the wings, entrances and stair core, `plan.roles` every wall and opening position | the previous counter; the rung's cached result is recomputed, never stored in the record | replays |
| `builtBand` (a plot attribute, item 31 — not an event kind: its paths) | the writers §4.11's floor paragraph lists (J-A31.44) | §4.11's ladder; S10 and S11 through the manifested band `max(field band, geometryFloor)` (§4.7 S10 (2), S11) | the plot's attribute columns (§2.9), in the leaf digest | Regenerate (keep settings) keeps it; `Adjust` and a brush reset it in their scope (authorial, §7.2; J-A31.72); an epoch writes it only through §4.11's writers — a rung-3 event, rung 2's back court for the new rear plots it creates (which take their stock's band), a completed upward refurbishment (which raises it) — so a standing plot's `builtBand` is lowered only by a rung-3 event | restored by the undo record of whichever event wrote it | §7.5's table |
| `fieldBand` (a plot attribute, item 28 (f) — not an event kind: its paths) | every derivation that reads the current field (generation, `Adjust` and a brush's re-derivation past τ among them) and the epoch's re-banding after S6 (§2.5, §4.11) | §2.6's interior ladder, `ClassRules.pick` and the plan rung's recorded inputs (§2.8) | the plot's attribute columns (§2.9), in the leaf digest | Regenerate (keep settings) keeps it; `Adjust` and a brush set it in their scope; an epoch re-bands it | restored by the undo record of whichever event wrote it, an epoch's among the entities it replaced | §7.5's table |
| setField (brush) | T2 `ground` (terrain, its `flattenTo` mode) and T8 `fill` (prosperity, density, greenery); the terrain brush's `water` mode (§7.2) | the stroke list; the composited field or heightfield | log (strokes) | field strokes: blocks whose inputs moved beyond τ re-derive (§7.2); terrain strokes: S1's terrain operator (§7.3 (a)), in `follow` mode with the water operator; a brush is authorial and sets `builtBand` in the blocks it re-derives (§7.2) | the stroke leaves the list; the field or heightfield re-composites (exact) and the operator re-runs on the stroke's region; the households §2.6's capacity rule re-homed restored to their former buildings from its undo record (§2.6) | strokes are geometry and replay |
| editTable / editPreset | the tables editor, the presets dialog; T9 `shape` for `siting.declared` and `siting.linkEdits` | the override layer (§7.6) | log: row operations by key with the base row's hash; the fallback's confirmed fates; renames | entities whose derivation record, naming record or provenance cites a changed slice hash re-derive; a changed naming slice runs case (4) for exactly the unedited names citing it; a predicate table, or a kind whose recorded slices are unavailable, re-derives from the table's first reader stage with fates (§7.6) | inverse row operations; the re-derived entities — renamed names with their former naming records among them — restored from the undo record, never re-drawn; the households its capacity re-homing moved restored to their former buildings | a row that changed or vanished in the new table version → orphan, reported and kept |
| instance (and the tree brush) | T6 `place` (a hood pin), T8 `fill` (tree groups), T9 `shape` (furniture), instance handles | the entity's instance set with its overrides | log | applied by ordinal while the entity's lineage is unchanged since the event (no `carry` or supersession after its `seq`) and the ordinal's generated position lies within 0.5 × the spacing of the recorded `point`; otherwise re-matched by position to the nearest unclaimed instance within 0.5 × the spacing (a superseded entity's overrides move to its `supersededBy` successor), else orphaned and reported (§8.10) — for an entity that is a plan room, the plan-event row applies instead (V03 §4.3) | inverse | ordinals are geometry-stable only under the same lineage; otherwise re-match by position |
| rerollLayer | T10 `hold` (`village.track`), T11 `name` (`naming`), T12 `dress` (the style and render concerns) — §6.1's rerollable concerns; names also on chosen entities (`ids`) | the effective salt: the recipe's initial value set by the log's town-wide `rerollLayer` events; for an ids-scoped naming reroll, the per-entity salts in the event | log: absolute salts (with `ids`, those used after §6.3's case (3) advance) | naming: S13a re-draws every unedited name (town-wide) or the listed entities' unedited names, uniqueness by §9.6; instances, crowns, jitter: display only; compass and emblem: furniture only (§9.5); `village.track`: a Re-derive from VS4 with its fates (§6.1) | the previous salt; for naming, the previous names and naming records from the undo record; for `village.track`, the replaced scope | replays |
| revert (reset to generated) | ctrl / cmd+click, T10 `hold`'s context action | the entity's own logged edits | log (one event) | the inverses of the entity's own events applied in reverse log order at the revert's position; edits to other entities stay; a name it frees runs case (4) | inverse: re-applies them | follows the entity's address; an event whose target no longer maps is reported |
| moveLabel / hideLabel | T11 `name`: label handles; the dry run refuses a placement whose box at its stop meets another pinned label's box there, returning the nearest free position (§9.2) | `LabelEntity.pinned` / `hidden` — model data, in the digest (§6.2) | log | honoured by S13b (§9); the `LabelEntity` exists at the event's log position in session and replay, S13a running per event (§7.3 item 2) | inverse | follows the target address; unmapped → orphan |
| setLayer / setStyle / paintGround | T12 `dress` | style state (canonical, outside the model digest) | log | no model re-derivation; the display list rebuilds | inverse | style schema versioned |
| people: pin, setAttr, lock with paths, regenerate a person | an explicit action or edit only — never viewing | the pinned or edited fields; everyone else is derived | log | pinned and edited people are fixed inputs, re-homed to the household that inherits their household's address (§6.3), else orphans reported (§10.3) | undo record | person-table version recorded per household; person keys map through the household's address; orphans reported |
| closeup (stage 2) | the first presentation edit inside a close-up | `CloseupRecord` in `closeups` (V01 §2.5) | log (strategy, params) and the edits after it | kept across the district's re-derivations, a pure function of the district's committed state, sub-seed, strategy and params; a merged or split district's record carried to its anchor successor, the others archived with their overrides re-matched by §8.10 or orphaned; presentation `instance` edits re-matched by position, orphans reported | restores the former `CloseupRecord`; the first `closeup` of a district is undoable only while no `instance` event on its blocks with a `seq` above the record's `since` is live (the independence check; item 373) | `tableVersion` kept within §6.4's window, then migrated with a report |
| stage-2 edits (V01 §4.4): `setAttr(fabric \| fabricParams.*)`, `setAttr(terrace)`, `setAttr(content \| squareType)` on a block, `setAttr(surface)` on a way, `setAttr` / `delete` on a `HoodPlace` and a place T11 `name` creates, a `quarter` with `fabric` or `terrace`, `Recipe.hood`, `editTable` / `editPreset` on the stage-2 switch | T8 `fill`, T9 `shape`, T11 `name`, T5 `quarter`, T1 `intend`; the tables editor | the district's, block's, way's or place's leaf; the recipe | log (the recipe for `Recipe.hood`) | V01 §4.4's rows: S7c, S9b and `terraceState` keep an edited path and D re-derives from S8 in the grouped `regenerate`; a succeeded place keeps its edited name, a deleted name stays deleted; the stage-2 switch a Re-derive from S2 with carry-over | the group's undo: the former value and D's undo record; the recipe's former value; the document as it stood for the switch | an unknown fabric row → `bent-cut`, reported; `content` absent → `ordinary` (`market` → `trading`); `Recipe.product` absent → `town` |
| epoch | `grow(doc, inputs)` (§4.11), V06's `advance` from T1 `intend`'s time card, a timeline entry, the port's cadence; the history replay's runner at generation, appending the creation prefix's epochs flagged `creation` (§4.11 *History-first generation* (2); V06 §3.20.3) | the derived `EpochRecord`; lifecycle events with cause | log | §4.11's incremental path at its log position: each plot's `fieldBand` re-banded after S6 (§2.5), regrowth-first siting, the survivors' ladder bounded by the geometry floor — its rung-1 `relet` marking unstored plans stale and re-cutting stored ones along the interior ladder inside the epoch (item 28 (f), §7.3) —, the use step, the strike pool, the island and underground laws; every live rejection is re-checked by §7.7 item 3's lapse rule; a dossier change the host sends with the epoch rides in `EpochInputs.dossier` and is applied at §4.11's step (e) (§7.7 item 6); the epoch carries its absolute week (§4.11, item 76), the Works it starts are records whose stages the week derives (item 67), and its character step recomputes each district's vector, moves identities past their hysteresis, writes the pressures and renames by §6.3's case (5) (§4.5, item 72); a replay epoch is re-run only by a Re-derive from S1 or a `generate`, which re-runs the replay whole from the recipe's history (V06 §3.20.7) | undo record: the faces and entities it replaced (O(epoch scope)), with the identities, pressures and names it wrote — an epoch of session `host:port` and a replay epoch of the creation prefix are no undo targets (Replay semantics) | a multi-epoch document upgrades by replaying the whole ordered log with a per-epoch diff, or stays pinned to its output version |
| rebase | keeping the saved town on a mismatch; Rebuild around my drawings; editing a frozen import — a `frozenImport` rebase, which runs case (4) over every unedited generated name and returns `confirm` with the renames listed (keeping the old model at an upgrade needs none: the document stays at its own output version, §7.5) | the document's base | the base state and the event: `version` names the output version that computed `stateDigest`, `at` the log head the state materialises (`h₀` when the saved town is kept after edits made during load verification, §2.9 step 4); the events before `at` stay in the log (§2.9) | replay starts from the rebased state, checked against its root of record for the replay's output version (§2.9 step 3), and folds the events after `at`; on other clients see *Rebases* below | the previous base (below) | the rebased state migrates by the schema chain; an `upgrade` checks it under `from` against its root of record and records its root under `to` as `baseDigest` (§7.5); it is not seed-reproducible |
| upgrade | explicit, after the diff (§7.5) | the document's output version | log, with `baseDigest` for a rebased base and the saved packs in its mapping | §7.5 | §7.5's upgrade undo (the undo record is `upgrade.from`) | — |
| undo / redo | ctrl / cmd+Z, ctrl / cmd+shift+Z, the API's `undo(h)` / `redo(h)`, a host's `doc.apply` | each event's live or undone status, derived from the log | log (`of`) | after the independence check below: `undo` restores its target's scope from the target's undo record; `redo` re-applies the target at the head, its lifecycle events citing the target's `seq` and its minted addresses the target's own; a result that frees a name runs case (4) | an `undo` is undone by a `redo`, a `redo` by an `undo` (exact inverses) | replays; a target's record is rebuilt under the new version by the replay |
| host provider output | a host-registered provider's answer, after the double-run check (§6.5 (8)) | the document's `hostContent` block | `hostContent`, keyed by (provider id, version, input hash) | read from `hostContent` on replay, never re-requested | removed with the event that first requested it | replays without the host |

**Rebases.** The `rebase` event is a no-op for a client whose base it already is. A replay from the recipe folds an
undone `rebase` and its `undo` as a no-op pair, every event between them being undone (a whole-town event is undoable
only as the latest live event). *Undo:* when the previous base is the recipe — always kept in a rebased base — the undo
restores it and replays the kept log; when it is an earlier rebased state, that state is the undo record, held in the
undo section under its cap; past the cap, or when the replay would need an output version outside the browser's
window, the undo is withdrawn with a notice (the CLI replays any version, §6.4). A `redo` re-installs the rebased
state, which the undo keeps in the undo section under the same cap (past it the redo is withdrawn with a notice).
*Rebases on other clients* of a bridged document: a `keptSnapshot` rebase whose `at` lies behind the client's head and
whose `stateDigest` differs from the client's root at `at` installs the snapshot at `at` from the `doc.load` bytes the
client kept and re-applies the events after `at` through the fold (fates recomputed and differences reported, undo
records rebuilt; §2.9 step 4); one whose `stateDigest` equals that root changes nothing; any other rebase behind the
head (a hand-built log) is a reported no-op; a load whose log already holds a `keptSnapshot` rebase at `model.seq` with
`stateDigest = model.digest` takes `model` as that base without asking.

**Undo and redo are events.** Undo never removes an event from a shared log: a host stores the log and it only grows
(§11.3), so `{ t: 'undo'; of }` and `{ t: 'redo'; of }` are appended at the head and applied through the same fold,
identically by every client and every replay (J-DET-16).
* **Sessions.** A session is an authoring identity **per document and author**, not per app start. `@plat/api` mints
  one (a 128-bit random value in base 32, outside the model packages) the first time an author edits a document and
  reuses it on every later open: an unshared document stores it in its view state (`view.keys['session']`, outside every
  digest, saved with the file, §2.9), so a reload — or reopening the file next week — continues the same undo and redo
  stacks, and a file made without one (by the CLI or from a link) mints it on first edit. A client attached to a host
  bridge takes the session the host assigns in `doc.load` (§11.3) and never writes the view key; the dossier port's
  events carry `host:port` (§7.1). The session enters the log only as `EditBase.session`; the fold never reads it (an
  `undo` names its target by `of`), so sessions decide which event the undo key picks, never the model (J-DET-34).
* **Targets.** Each session has its own stacks. `undo` targets the session's latest **live** event that is an undo
  target (Replay semantics) — live unless an `undo` targets it and no later `redo` re-applies it; a `group` counts as one
  step and `of` names its first event (the group's value, which the engine writes at commit, §7.1's `group`). `redo` targets the session's latest undo whose target is still undone; a new
  event from the session clears its redo stack. An unshared document has one stored session, so its undo is linear and
  continues across reloads. A session with the `owner` role — the app's role for an unshared document — may name any
  live event that is an undo target (`undo(h, of)`, §11.2), which is how an earlier session's events (a file once shared) are undone.
* **Application.** Every committed event keeps an **undo record**: the inverse event when one is exact; otherwise the
  faces, entity records, lifecycle events and tombstones its effective scope replaced, the former birth levels, `split`
  flags and stripped contact names of the vertices it promoted, and the former levels and flags of the vertices and
  edges it demoted or unflagged (§2.2 rule 3; `CommitRecord.promoted`, `demoted`, `unflagged`); and always the addresses
  it created, changed or removed — its **touched set** — so undo costs O(scope), never a copy of the model. `undo`
  restores the target's scope from that record and withdraws the addresses the target minted (§6.3); `redo` re-applies
  the target at the head from its stored, already-resolved payload (scope, absolute rerolls, confirmed fates), so from
  the restored state it reproduces the target's result exactly. An edit whose capacity re-homing moves households (§2.6)
  keeps in its undo record, whatever its row's undo, the former records of the buildings it moves them out of and into
  and, where it re-provides a dossier household's housing (§4.7), the plots the re-provision touched (§7.3 item 1) — the
  site with the residential slot built there, its joined neighbour, each displaced use's new site — and its undo restores
  them with the households it re-homed.
* **Independence** (the check that keeps undo exact when others have edited since). An undo is applied only if every
  live event after its target is independent of it: the later event's touched set and effective-scope faces are
  disjoint from the target's touched set and from the target's effective-scope faces dilated by one ring of adjacent
  faces at the coarsest level either touches. Otherwise the dry run returns the dependent events and their authors
  (§7.1's outcome table); the session may undo its own dependent events first (each its own `undo`), and an owner may
  undo through a chain — never through an event that is no undo target (Replay semantics), so a target one of them
  depends on stays live. A `redo` is checked the same way against the live events after its undo. Every client folds the
  same events in the host's order on the same state, so the check has the same outcome everywhere; an `undo` or `redo`
  whose check fails at its log position (possible only in a hand-built log) is a reported no-op, identically on every
  client and on replay. A whole-town event (an upgrade, a rebase, a Re-derive from S1) is therefore undoable only while
  it is the latest live event.
  **Independence through the input layer** (J-Fdet-1). The check above reads touched sets and effective-scope faces,
  which see geometry and records but not the inputs a derivation reads, so it also holds a later live event
  **dependent** on its target when the target changed an input that event's derivation read. For an `editTable` or
  `editPreset`: when an entity the later event derived — one in its touched set whose leaf digest a stage, S13a's delta,
  a re-cut or a rung wrote, which the touched set marks apart from the addresses the event merely set — cites, in its
  derivation record, its naming record or its provenance (§2.8), a slice whose hash the target's row operations changed
  (the slices, recomputed from the target's operations and their base rows by §7.6's slice kinds). For an `adjust` — a
  parameter, a Re-derive from stage k or the pack list — and for a town-wide `rerollLayer` of `naming`: whenever the
  later event derived any entity, because every derivation reads the effective parameters, the pack set and the town
  salt. An `undo` or `redo` whose target is one of these events counts as one. An event that derived nothing depends on
  no such target. So an input change is undone through its dependants, as the chain rule above states, or stays; the
  state after a permitted undo is the fold of the log without its target, and no derivation record is left citing a
  slice the effective tables no longer hold. The check costs the later events' touched sets and their records' slice
  references, kept for every event (Records on other clients, below). *Fixtures (B-EDIT, §13.2):* an `editTable` on a
  heights row followed by a `build` on a plot the edit did not touch, an `adjust` followed by a `drawWay`, and a
  town-wide `rerollLayer(naming)` followed by a scoped regeneration that draws a name — each later event is reported
  dependent, and once it is undone first the target's undo gives the model digest and records digest of the log without
  the pair; an `editTable` followed by a `build` whose derivation cites none of the changed slices is independent, and
  the target's undo gives the digests of the log without the target.
* **Records on other clients and after a reload.** Records are kept for the session and saved in the file's `undo`
  section (the last 64 events or 20 MB, whichever is smaller; rebase and upgrade records as their rows state), so undo
  survives a reload; a single record larger than the cap is not saved, and its target's undo after a reload rebuilds it
  as below. A client with no record for a target — it joined later, or the record left the cap — rebuilds it by
  replaying from its nearest checkpoint before the target, or from the base, and says it is slow; the replay keeps full
  records only for the events later `undo` events target (found by a pre-scan of the log) and touched sets for all. The
  replay is deterministic, so every client reaches the same state.
* **Truncation, in unshared documents only.** When an unshared document's `undo` targets the event immediately before
  it, the engine may drop both from the log and hold the target on the session's redo stack. A redo then re-appends the
  target with its original `seq` **and advances `nextSeq` by one** — the `seq` the kept log's `redo` would have spent —
  so every later event, and every address a later user-created entity mints from its event's `seq` (§6.3), is the same
  in both logs; the canonical `nextSeq` (§2.9) never moves back. An `undo` removes its target's lifecycle entries and
  tombstones and a `redo` re-inserts them, both citing the target's `seq` (§2.8), so the lifecycle block, the archive
  and the model digest of the truncated log equal those of the log with the pair kept. The truncated target is held on
  the session's redo stack in the saved `undo` section (`UndoRecord.redo`, §2.9), so a redo after a reload re-appends
  it, and the packs it names stay in `packs` while it is held (§2.9's pack set). A B-EDIT property test over random
  sequences folds each both ways — §6.5 (9)'s truncation cases among them — and requires equal model and records
  digests and equal addresses. A document attached to a host bridge never truncates.
* **Checkpoints.** The engine takes a copy-on-write checkpoint (arenas are chunked per district, so it costs only the
  chunks changed since the previous one) whenever the replay cost accumulated since the last one passes 80 ms at the
  session's rung, and before every epoch, rebase and upgrade — so any replay from a checkpoint stays ≤ 100 ms; a load
  that takes §6.2 (iii)'s off-edit-path recomputation also takes one at `h₀`. *Measurement (M2a):* undo of a CITY
  district regeneration ≤ 30 ms; undo memory ≤ 25 % of the model's working set after 100 edits; a METROPOLIS district
  re-derivation and a METROPOLIS epoch whose undo records exceed the 20 MB cap are saved without their records, and
  after a reload each undo rebuilds its record by replay and gives the pre-edit digests; a rebase whose previous base
  passes the cap, and a redo whose rebased state passes it, are withdrawn with the notice; (M3a) the
  host-and-three-clients convergence test of §11.3 with interleaved undo and redo from every client. *Pre-decided
  fallback:* the saved undo section shrinks to 16 events and checkpoints are taken every 40 ms of replay cost.
* The **enumeration test** checks that every EditEvent kind — `undo` and `redo` included — has an exact inverse or an
  undo record, or is listed as no undo target (O9 d). Save → load → save is byte-identical over the canonical form (O9 a).

**Warp and what stands on the ground.** A warp and a `moveVertex` move arena vertices (§3.6). The records below hold a
world point instead of a vertex and move with the ground they stand on (E-10). After the kernel's commit the edit layer
takes every such record whose host face has a moved vertex (the commit record's `moved` list, §3.3) and computes its new
point from the move itself: the point's mean-value coordinates in its host face's outer ring before the move, applied to
the ring after it (`+ − × ÷` and `sqrt` only, §6.5), rounded to the lattice. A record whose new point lies outside its
host face, or nearer its boundary than its clearance, is **re-seated** at the nearest lattice point of the host face
inset by that clearance, ties by (y, x); if the inset is empty, a generated record is re-placed by its placement rule
and a user's record is orphaned and reported. A record of a locked or pinned entity is held like a held vertex: the
warp's whole-step validation requires it to stay inside its host face at its clearance and halves the step otherwise
(§3.6); the dry run lists it. Of a host's several faces, the host face is the one `pointLocate` on its `PlatKey` returns
for the record's point (§5.3's light row).

| record | host face | clearance | when re-seating fails |
|---|---|---|---|
| `Pin.point` | `Pin.host`'s faces | the pin's footprint radius | generated: re-placed by §4.7 S11's rule; a user-placed or edited pin: orphaned |
| `Decoration.point` | the L3 face containing it | `Decoration.keepClearCm` | re-placed by §4.9's rule |
| a positional `instance` override's current position — a `move`'s `to`, an `add`'s `point`, a `line` layout's recorded generated `point` — held in its entity's override table (§8.10) | its entity's faces | half an instance spacing | orphaned (a user's override) |
| a pinned label's `Placement` anchor and spine (§9.1) | its target's faces, or its target's corridor for a way | the label's box | orphaned (a user's pin) |
| `LightSource.point` (§2.7, item 68), on its host's arena | the face its host stands on — a building's footprint face, a way's or a bridge's half-corridor strip, a square's face, a gate's footprint, a pin's host face, a gallery's band, a chamber's floor, a tunnel's band faces at the junction a junction light marks (its junction wedge and half-corridor strips), the faces of the underground element an access point's `access_point` vertex lies on for the light at its foot (a tunnel's strips, a gallery's band, a chamber's floor, an underground building's footprint), a castle's inner ward, bailey and gatehouse footprint (`Castle.innerWard`, `.bailey`, `.gatehouse`), a point decoration's L3 face (a wayside shrine's), and for a hand-placed light on any other entity the face that entity is or stands on | the light's `sizeCm` | generated: re-placed by §4.7's *Light sources*; a hand-placed light: orphaned |
| a **door light** — beside its door on the footprint's ring, on the side §4.7's *Light sources* (4) draws | none: it keeps its fraction of the ring edge nearest its point — the foot of its point on that edge, clamped to [0, 1] (a lattice point seldom lies exactly on an edge, §2.2 rule 3; of two edges the nearer by squared distance, a tie going to the edge first in the ring's order) — its new point that edge's two end vertices where the move leaves them, blended at that fraction (the mean-value image of a boundary point; `+ − × ÷` only), rounded to the lattice | — | never re-seated or held as a point: it stays within half a lattice diagonal of the moved facade whether the warp slides or turns it, the rounding never accumulating, and goes with its ring edge even on a locked or pinned entity |
| `AccessPoint.ground.at` (II.7.4, item 64) | the ground face its `ground.host` names or stands on — a corridor strip, a square, a yard, a building's footprint (a basement access's too), an outside face | none | generated: re-placed by II.7.3's rule; one an edit placed: orphaned |
| the rings and lines of `Works.before` (§2.7, item 67) | its target's plot face — the building's plot, or for a join or a split the plot whose face holds the point | — | never: drawn history, each point taking its mean-value image wherever it falls, never re-seated, re-placed or orphaned |

**A building's stored wing rings** — with a stored stage-3 composition's rings, its plan's points (rooms, wall ends, bays
and columns) and tower centres, and the building's basement ring — are carried with its footprint face in the same pass
by §2.6's wing-carrying rule, and the whole-step validation includes §2.6's check through `warp`'s `recordCheck`, halving
the step when it fails, as for a held pin (§3.6). The check requires the basement's ring within its ground wings (§2.6
*Basements*; an unedited basement that fails it re-derived by §2.6's basement decision, an edited one failing the step),
every ring of a wing standing on another inside the ring it stands on, and for a stored composition its composed wings
to unite to the moved face, its rooms to lie inside the moved face united with the span rings of the passages its wings
span (§2.6; J-A30.23) and its tower centres inside or on it. Every entity whose footprint, trace, deck or pier the move
carried is re-based on the ground it now stands on by §7.3 (a) 4 (a building with a wing standing on another by the
building datum pass, whole), a user-edited base kept. The undo record keeps every former point (a light's point, an access point's opening, a Works' kept rings
and lines among them), wing ring, basement ring, stored composition and base, and a replay recomputes the same points and rings by replaying the same operation on
the same geometry. Stamp and grid instances are world-anchored patterns and are not displaced (§8.10). The B-EDIT warp
fixtures are §13.2's (J-DET-31; J-A68.73).

**Every kind at the edit boundary** (the edge catalogue's combinations; §5.1 (9)–(10)). Each model kind is edited,
locked, undone, saved and loaded, and regenerated by the rows above, at every rung where it exists; where two meet, the
outcome is:

| kind | edit | lock | undo; save and load | regenerate |
|---|---|---|---|---|
| a cliff (bank kind `cliff`, a closure barrier of item 106) | the terrain brush and `drawWater` (§7.3 (a)–(b)); an enceinte stretch anchored on a cliff that a stroke flattens is re-traced by S7's operator and re-anchored or walled by F-WALL, listed in the fates | a locked enceinte masks the stroke under its band (`locked` mode) | the stroke leaves the list; the heightfield and strokes persist | S1 re-derives it; an edited cliff is a stroke kept in the list |
| steep ground | the terrain brush; `slopeP95` re-sampled and a way past its class limit offered a re-route; a footprint past `skirtMaxCm` stepped (§7.3 (a) 4–5) | a locked building's footprint masks the stroke | as a stroke | as a stroke |
| a river, a coast, a harbour, a moat, a bridge | S1's water operator or the carve (§7.3 (b), §4.11); decks re-sited by succession | a locked way, wall or finer entity refuses the new water; a pinned bridge's deck is a fixed graph edge | the undo record restores the whole chain's scope, decks and names included; the log replays | the operator's footprint re-derives, the rest byte-identical |
| a raised way | `drawWay` with `raised`, T9 `shape`'s span, crossing and measure paths | its deck and piers held, as every raised way is from its creation (§2.7's support step (6)); a raised way over a locked way keeps its span `open` | the event's undo or the delete's undo (its suppression lifted) | kept by its reason key; a removed generated one stays removed (§7.1 *Delete*) |
| a retaining wall | T3 `retaining`, the `terrace` sugar | a locked wall masks the stroke on its high side | the event's inverse; its state profile's former knots restored | a generated wall re-derives with its terrain until edited |
| a deck plot | T6 `place` on a deck face; the deck's width by `setAttr` | a locked deck plot's building holds while its deck stands | inverse | held while its deck stands, falling with it and re-offered when the deck is rebuilt (item 110 (d)) |
| a square | V01's `setAttr(squareType)` on its block; the plaza's reservation through S3 | a locked square's faces are fixed inputs of S9b | V01 §4.4's undo | S9b re-derives it by its quota |
| an oasis | T2 `ground`'s spring flag; `delete` of its water body | a locked oasis masks the terrain stroke and refuses new water through it | the event's inverse restores the pond, spring, grove and gardens | declared: held; generated: S1's arid draw, its delete holding by carry-over |
| the frame (§3.2 (9)) | never moved by an edit: a stroke or drawn feature is clipped to it, and one wholly outside is an empty edit (§7.1) | locked, pinned and declared entities and every drawn constraint are fixed inputs of the frame: a re-derivation whose frame law gives a frame not enclosing them takes the smallest frame of the rule that does — the frame's `aspect`, its centre (0, 0) — named in the dry run's one line (`bend.frame.held`), never an *orphaned* fate for a protection | the Re-derive's undo (a whole-town event, undoable while it is the latest live event); the frame is the recipe's and the log's, re-derived identically on load | fixed by the rung; a rung change is a Re-derive from S0 and a population `adjust` one from the population control's consuming stage (§7.8: the earliest stage that reads it — at the latest S1, which lays the frame from the frame law, §4.1's S1 row), each under the lock cell's rule, so a re-derivation never shrinks the frame below its protected content |

*Test (B-EDIT, §13.2):* one fixture per kind and rung where the kind exists, each edited, locked, undone, redone, saved,
loaded and regenerated, with byte identity outside the effective scope and the named outcome at each meeting; for the
frame, a CITY → TOWN rung change with a locked building and a drawn wall beyond TOWN's frame keeps both, the frame held
at the smallest enclosing rectangle and reported.

**MFCG's recorded edit asks** (IMPROVEMENTS O9 (f): the list behind B6, asked for by twelve users). Each is a scripted
B-EDIT scenario that reports its locality share (entities outside the effective scope byte-identical) and its invariant
results (§13.2); "expressible" counts working, measured edits, not event names.

| ask | PLAT events | what re-runs |
|---|---|---|
| add a district | `drawBoundary` | S6 regroups the covered cells; S8–S11 where the class band changed |
| delete a district | `merge` (district into its neighbour) | S6 re-types the merged district; S8–S11 where the band changed |
| add roads | `drawWay` | S4 (arterial) or S5 (secondary) local operator; S8–S11 in the split cells |
| remove roads | `delete` (way) | S5 regrows the merged cell (or S4 re-routes); S8–S11 there |
| move / remove labels | `moveLabel`, `hideLabel` | `LabelEntity.pinned` / `hidden` only (model data, §9.1); 0 other model changes; S13b re-decides the labels whose boxes meet it |
| set district colours | `setStyle` (a thematic row keyed by the district's address) | style only — 0 model changes |
| add / delete vertices | `split` (a way at a point), `merge` (edges), `moveVertex` | the L1 edit; S8–S11 in the touched cells |
| place the castle | `setAttr(castle, site)` | S4 re-routes the castle street; S7 re-traces its run when the castle is on the enceinte; the cells under the old and new reservations re-derive |
| size the castle grounds | `setAttr(castle, baileyArea)` | the reservation resizes; the cells under it re-derive; S7's run when on the enceinte |
| farms in chosen areas | `setAttrMany` (the land-use faces under a drawn region → arable) | S12 on those faces |
| draw walls | `drawWall` | S7 re-traces the run or adds an enceinte and cuts its wall strips; F-REDERIVE on plots in the new strips |
| draw bridges | `drawWay` (class `bridge`) across a river face | a `Bridge` placed by §4.2 S1 (5)'s rule for a drawn bridge; S4's operator lays the drawn way's ends through its deck, pinned; §5.3's deck row holds |
| drag points in the sea | `moveVertex` on the coast (L0) | S1's water operator (§7.3 (b)): the moved coast is the new water (no re-trace, §2.3), contours clipped, decks on it re-sited, the footprint's partition content cleared, kept ways re-laid through their decks and the others cut before the water is inserted; S5 and S6 for the cut cells and the vacated land; F-REDERIVE |
=== END ===

=== REPLACE ### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook) ===
### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)

Three input layers above the parameter vector, all persisted in the recipe — a pointer names one as §7.7 layer n,
while §7.7 item n names the dossier contract's item n (below) and a bare item n is an owner or amendment item:

1. **Intent** (outcome targets; `Intent`, below): form archetype, size as population / area / buildings with a
   tolerance, water setting and coast side, gate count, wall rings, planned ↔ organic, wealth level and gradient
   direction, era and region preset, defence level, density, latitude. **Expansion** (intent → ≈ 200 internal
   parameters) is a pure function held in data: each intent field maps to internal parameters by `{param, fn:
   'const'|'linear'|'smoothstep'|'table', args}` rows (tables interpolate linearly), evaluated in a fixed order. **Rows
   are continuous**: no rounding and no comparison inside a continuous control — a discrete outcome is a probability
   drawn per entity or a discrete control that declares itself (§7.8). Example — `wealthLevel ∈ [0, 1]` →
   `field.characterOffset = lerp(−0.3, +0.3)`, `granularity.joinMaxBonus = 2 · wealthLevel` (fractional: its fractional
   part is the probability that a candidate plot takes one more join, drawn from the `plot.join` stream),
   `greenery.parkPer1000 = lerp(0.1, 0.8)`; item 71's class mix reads `wealthLevel` itself — no expansion row — moving
   every band row's weights toward the larger classes in a rich town and the smaller in a poor one, the cuts staying the
   town's own (§4.7 S10b; J-A71.42); `planned ∈ [0, 1]` → `growth.headingSigma = lerp(20, 5)` degrees per 100 m of
   street, `growth.crossroadProb = lerp(0.02, 0.15)`, `avenues.probability = smoothstep(0.3, 0.7, planned)` per eligible
   tier-1 way. Every internal parameter is documented (unit, range, effect, provenance, consuming stage) and reachable in
   the advanced panel (O10 a); the registry test proves 100 %. **Surprise me** (the one statement) draws every intent
   field from its declared range and weights on the `intent.surprise` stream of a fresh seed and writes the drawn intent
   into the recipe of a new document, so the town's link reproduces it. For a dossier-bound map the port's creation half
   fills the intent from the dossier by the derivation table (§7.7 item 10; `wealthLevel` from the dossier's prosperity
   word, `latitudeDeg` by DR29); the filled values are map facts (§7.7 item 9) and stay editable.
2. **Character and circumstances** (items 72 and 76–79): the per-district **intent** — `DistrictIntent` (wealth,
   density, age, function mix, planned / organic, greenery, fortification, building scale), supplied automatically per
   district and overridable — is the input that shapes a district's generation; a district's **character** is item
   72's derived profile (`CharacterVector`, §2.5), read from what was built and naming the district (§4.5), never an
   input. The **circumstances** are one `CircumstanceSlice` (below) per entry of a **timeline** dated in weeks — §4.11's
   week (*The clock*; item 76) — on a dossier-bound map the dossier's own weeks, its present week the dossier's latest
   stamped tick (item 125) — that *schedules* epoch events: an epoch
   happens only as an `epoch` event in the log (§7.1, hook 8), proposed by the app at a timeline entry or by the port at
   §4.11's cadence, and the timeline's first entry is the creation slice S0 reads (§4.2). The season is read from the
   week through §4.11's calendar row and never stored (the view's default season: DR42, item 117); an epoch's population target and terrain events ride its
   `EpochInputs` (§4.11); a government's kind names its lordship (§10.2). The slice carries the activity scalars —
   market, harbour and main-street activity, default 1 — that the prosperity field's kernels read under decline
   (§4.11), the port's per-settlement values (`port`, V08 §2.5's; null standalone; item 389), and the recipe's feature set holds `layers.islands`, II.6's model setting (§7.8).
   **The typed slices** (items 77–79) are read by item 72's dials and terms (§4.5) and by S2 and S3 (§4.2); each is
   recipe data at creation and epoch data afterwards; the port fills them from a dossier, and standalone the blueprint
   and our own rows fill them by the same rules, so every reader sees the same fields with or without a dossier
   (J-A77.71).
   - *Trade* (`trade`, `entrepot`; item 77). **Partners**, in order: the dossier's named neighbours and the partners its
     trade links name, each keyed by its binding key (§7.7 item 12); with none, one derived partner per through route of
     the settlement's access row (`source: 'derived'`); standalone, one per external bearing the blueprint requests, else
     per through route of its access intent. **Weight**: a partner's listed trade links (a named neighbour with none
     counts one), zero for a `hostile` relationship or a suppressed economy — a rival's or a cold-war partner's listed
     links are kept, as SettlementForge keeps them — normalised to Σ = 1, derived partners sharing equally. **Mode**:
     where the site has navigable water, the partners in weight order take `sea` (a harbour) or `river` (docks on a
     river) until their weights cover the water fraction of all toll and duty income — the income rows the port marks
     water (port duties, river tolls) over all it marks water or road (gate and road tolls) — and the rest `road`; with
     no such income the water fraction is the site's default (one half for a harbour town, one quarter for a river town;
     our own values, calibratable); without navigable water every partner is `road`. **Bearing**: the user's setting
     where the blueprint gives the partner one (a standalone partner's requested bearing); else a draw on `gate.pick`
     (§6.1), uniform over the arc the site admits for its mode — open water for `sea`, the river's upstream and
     downstream reaches for `river`, the land arc for `road` — so a partner's bearing never moves when unrelated facts
     change; no host input gives one (item 125 (b)). The `road` partners' bearings are among S3
     (4)'s requested external bearings (§4.2); every partner's bearing and weight feed `TradeFlow` — the per-gate and
     harbour weights and the dominant bearing — which is derived from the slice, `entrepot` and the road-and-gate
     geometry at §4.3. No input sends a true bearing after creation (item 125 (a)):
     a partner's bearing changes by a user's edit alone, and the geo anchor's `bearingDeg` (§11.1) stays a user setting.
   - *Economy* (`economy`; item 78). Shares over the sectors of §10.2's `RosterTables.sectors`, Σ = 1: with a dossier,
     its income sources mapped to sectors by the port's revenue rows (a revenue with no sector — rents — drops out and
     the rest renormalise; J-A78.71); standalone, the blueprint's economy setting, by default an even mix, which
     amplifies no class (J-A78.72). Read by item 72's economy dial (§4.5) at creation and at each epoch past its
     hysteresis (§4.11) and by S2's town-level character (§4.2 S2, §10.2); the shares are read, never modelled (D-10,
     D-32).
   - *Powers* (`powers`; item 79). One standing per power: with a dossier, `standing` = its power ÷ the settlement's
     total, its kind by the port's category-and-name rows (military and arcane powers included, §2.7), `governing` and
     `secret` from the dossier; standalone, the governing power the `government` row names and the established religion
     (§10.2's rows), 0.6 and 0.4 (our own defaults, calibratable). `appliedStanding` starts at `standing` and moves only
     past the dials' hysteresis at an epoch (§4.11). The base reads standings, never materialised factions — `Faction`
     stays the module's (§10.1); an `arcane` standing is honoured whenever a dossier states it and, standalone, arises
     only under a `magic` circumstance above `none` (D-3).
   The **undercity** setting (item 65; `auto` by default) is `require` when the dossier lists a subterranean
   district-scale record — placed as a `neighbourhood` assignment that II.7.5's existence test must host — and `forbid`
   when the blueprint or the host's circumstances rule one out; `disorder` (0–1, default 0) is the lawlessness II.7.5's
   size law reads, the blueprint's setting (a timeline entry's over epochs); the dossier's crime scalar never fills it —
   it reaches the undercity through §4.6's staged crime term alone (item 88; J-A88.41, J-A88.73), so crime is counted
   once.
3. **Constraints**: pins and **assignments**:

```ts
// — layer 1's record: the recipe's intent, `Recipe.intent` (§2.9); layer 1's expansion rows turn it into the internal parameters
interface Intent { form: string /* a forms-catalogue row (below) */; population?: number; areaHa?: number; buildings?: number /* the size: any of the three */; tolerance: number /* the size's relative tolerance */;
  water: WaterSetting /* §13.3's one spelling */; coastSideCdeg?: Cdeg; gates?: number; wallRings?: number; planned: number /* 0–1: planned ↔ organic */; wealthLevel: number /* 0–1 */;
  wealthGradientCdeg?: Cdeg /* the wealth gradient's direction */; era: string /* a row key of the `era` table (`EraRow`, V11 §2.8, V11 §3.19.1); item 400 */; defence: number /* 0–1: the defence level */; density: number /* 0–1: the density control (§7.8) */;
  latitudeDeg?: number /* degrees north; the model-side sun's latitude (item 102 (a)); DR29 fills it for a dossier-bound map; absent reads 50 (§7.5) */ }
interface Assignment { id: Id; granularity: 'building'|'neighbourhood'|'dispersed'|'feature';
  target?: Id /* one building / plot, one district, or — granularity 'feature' — the way, bridge, quay or pin a named-feature claim names (§7.7 item 16) */;
  dispersed?: { count: number; kind: BuildingClass | string; criteria: PlacementCriteria };
  criteria?: PlacementCriteria /* a building or neighbourhood assignment's own soft rows: a naming claim's location phrase (§7.7 item 16) */;
  claim?: { kind: 'name'; bias: { identity: string /* a quarter identity row (§10.2) */; weight: number }[] } /* a naming claim (§7.7 item 16): it names and biases, never zones */;
  name?: string; function?: string; shapeClass?: BuildingClass; drift: DriftBounds /* ± area %, ± floors, allowed layouts and roof kinds, class family — read against §4.7 S11's designation template (item 19); typed in §2.6 */;
  precedence: 'overClassRules'; placed?: Id[] /* the solver's placements, persisted with the event */;
  existence: 'map'|'dossier' /* dossier: the element exists on every map the module returns (§7.7 item 2) */; dossier?: DossierRef /* §7.1: its `element` is the binding key (§7.7 item 12) */;
  state: 'active'|'ruined'|'removed' /* item 80: written only by dossier events through §7.7 item 14's rows; a map assignment stays 'active' */;
  memberState?: Record<Id /* a placed member */, 'ruined'|'removed'> /* a dispersed assignment's members a collective record's state reached (§7.7 item 14); an absent member is active */;
  custom?: { uid: string; revision: string; contentHash: string } /* dossier-owned: a custom record's definition revision; a setAttr of custom.revision with cause custom_revision re-reads the carried fact, re-resolves item 104 (a)'s profile and re-sites the use by least disruption (V08 §2.8, V08 §3.13 (10); item 394) */;
  use?: Id /* the Use record the assignment names (§2.7); the assignment moves with it (item 17 (d)) */; pinned: boolean /* stays where it is under epochs and re-applications; the town adapts around it */;
  knownTo?: 'public'|'local'|'secret' /* item 30 (d): a dossier fact when the dossier sets it (§7.7 item 9); §9.2's label policy reads it */;
  concealment?: 'none'|'front'|'hidden'|'underground' /* item 63: a dossier fact when the dossier sets it; resolved and placed by §4.7's concealment rule */;
  front?: string /* item 63: a front the dossier names — its class or its name; absent: §4.7's cover table picks it */ }
type PlacementCriteria = RelationRule[];   // per-assignment overrides of the class's relation rows (§10.2, §4.7 S10b): nearM → a `near` row, minSpacingM → an `avoid` row on the assignment's own members, frontageClass → a `frontage` row, districts / districtKinds / prosperityBands → `band`-class filters; also written by item 110 (b)'s raised-way generator on the one conduit house bound to an aqueduct's cistern terminal (V11 §3.24.7 (1), id pc/aqueduct/<way lineage>; item 401)
// PlacementSolver, PlacementRequest and PlacementResult are §4.7 S10b's — the one solver every placement path calls (item 16)
interface Rejection { element: Id; site: Id; seq: number /* the rejectSite event */; held: { epoch: number; populationTarget: number /* the target in force when the rejection was made: the last folded epoch's EpochInputs.populationTarget, else the population the recipe resolves to at S2 (§4.2) */ }; lapsedAt?: number /* the seq of the epoch or dossier event that lapsed it */ }   // model data, in the digest (§2.8 lists it); the solver reads it as PlacementRequest.rejected while lapsedAt is unset
interface DisruptionBudgetRow { kind: 'dossier'|'positive'|'relocation'|'assignment'; weights: { displacedUse: number; join: number; subtractedPart: number; vacated: number }; budget: number; displacementDepth: number }   // a rule table (§7.6); defaults displacedUse 1, join 2, subtractedPart 0.5, vacated 1, budget 6, displacementDepth 1 — our own values, calibratable
// — layer 2's records (items 72, 76–79); declared here once and read at their homes
interface DistrictIntent { district?: Id /* absent: the town-wide default */; wealth?: number; density?: number; age?: number; functionMix?: Record<string, number> /* Σ = 1 */;
  planned?: number; greenery?: number; fortification?: number; buildingScale?: number }   // each 0–1; an absent field is derived; the input a district is generated from, never item 72's derived CharacterVector (§2.5)
interface CircumstanceSlice {
  era: string /* a row key of the `era` table (`EraRow`, V11 §2.8, V11 §3.19.1): tower kinds and spacing, moat width, intervallum, market paving, public lighting, fuel and timber per head, pump date, harbour chain, suburb regime, material rows */; biome: string /* §4.9's climate rows */;
  government: Government['kind'] /* its row forces the seats (§10.2) */; threat: number /* 0–1: the defence level's source at creation (§7.7 item 10, DR2); the evolution engine's over epochs */;
  disorder: number /* 0–1, default 0 (item 65) */; undercity: 'auto'|'require'|'forbid' /* item 65 */; magic: 'none'|'low'|'high' /* item 68; 'none' by default under D-3 */;
  landscape: { fertileLand: boolean; mines: boolean; quarries: boolean; fishing: boolean; logging: boolean } /* the S0 landscape toggles (§4.2) */;
  activity: { market: number; harbour: number; mainStreet: number } /* default 1 each: the prosperity kernels under decline (§4.11) */;
  trade: TradePartner[]; entrepot: boolean; economy: EconomyShares; powers: PowerStanding[] /* items 77–79 */;
  port: PortValues | null /* V08 §2.5's per-settlement values; null standalone (item 389) */ }
interface CircumstanceTimeline { entries: { week: number /* §4.11's week */; populationTarget?: number; slice: CircumstanceSlice; events?: EpochInputs['events'] }[] }   // Recipe.circumstances (§2.9): entries in week order, the first the creation slice; applied only through `epoch` events (§7.1)
interface TradePartner { key: string /* the partner's binding key, or a standalone name */; mode: 'road'|'river'|'sea'; weight: number /* Σ = 1 over the partners; 0 for a hostile one */;
  bearingCdeg: Cdeg; relationship?: string /* the dossier's word for the neighbour relation */;
  source: 'dossier'|'derived' /* an older schema's stored 'realm' reads 'dossier', its bearing kept (§7.5's schema chain; item 125) */ }
type Sector = string;   // a row key of §10.2's RosterTables.sectors — trade, taxes and tolls, crafts, agriculture, extraction, fishing, finance, religion, military, magic, crime
type EconomyShares = Record<Sector, number>;   // Σ = 1 (item 78)
interface PowerStanding { key: string /* the power's binding key, or a standalone name */; kind: Faction['kind']; standing: number /* Σ = 1 over the settlement's powers */; governing: boolean; secret: boolean;
  appliedStanding: number /* the value item 72's dials last applied: moves only past their hysteresis at an epoch (§4.11) */ }
// — the dossier contract's records (§7.7 items 10, 12–14; the port that fills them is §14's)
interface DerivationRow { row: string /* DR1 … */; family: string; covers: string[] /* the §2.8 registry kinds and attribute paths the row derives */; inputs: string[] /* digest fields, in the order read */;
  rule: string /* the section whose rule derives it */; chance: string /* a §6.1 concern, or 'none' */; bar: string /* the coherence bar it holds (§7.7 item 11) */ }   // tables/dossier/derivation, provenance own
interface DossierBinding { line: string /* the SettlementForge line (item 73) */; adapter: { line: string; version: string };
  rows: { dossierKey: string /* the binding key */; entity: Id /* the address that carries Identity.dossier (§2.8, §6.3) */; kind: string; since: { seq: number }; rebound?: { from: string; seq: number; receipt: string }[] }[];
  quarantined: { key: string; reason: string; since: number /* the seq of the dossierFacts event that first carried it */ }[];
  lateCalamities: string[] /* the binding keys of late calamities held for the first epoch a later absorb folds (§4.11 *The clock* (4)); set by folding each dossierFacts event's list, as quarantined is; [] in an older document */;
  notes: PortNote[] /* the standing notes, rebuilt by folding the dossierFacts events' notes and notesCleared (V08 §3.6 (4)) */;
  factHash: Hash128 /* of `carried` */; absorbed: { seq: number; week: number | null; factHash: Hash128; changeIds?: string[] /* kept for the newest 64 entries */ }[] /* every absorbed state, newest last (§7.7 item 5's convergence report) */ }   // item 390
type CarriedFacts = Record<string /* binding key */, CarriedFact /* V08 §2.3's union with V08 §2.8's custom kinds: the dossier fact's fields as the port's digest holds them */>;   // the "previous dossier" §7.7 item 1's diff runs against
interface DossierChange { changeId: string /* the host's event, outcome or decree id; else a Hash128 of (element, op, week) */;
  source: 'event'|'pulse'|'decree'|'regeneration'|'edit'|'diff'; week: number | null /* §4.11's dating rungs; null: applied finished, without transition stages */;
  cause?: { kind: string; ref?: string; author?: string /* the host's author word */ };
  element: { kind: 'settlement'|'institution'|'power'|'notable'|'resource'|'condition'|'trade'|'quarter'|'government'|'deity'|'relation'|'port-values'|'chain'|'dependency'|'calamity'|'evidence'|'custom-def'|'custom-chain'|'custom-service'|'site'|'history'|'tradition'; key: string /* the binding key */ };
  op: 'add'|'remove'|'state'|'attr'|'tier'|'population'|'prosperity'|'power'|'rename'|'reopen'; before?: unknown; after?: unknown; fate?: string;
  reason?: string /* the host's reason, shown beside the map's rule in the disruption report */; receipts: string[] /* the receipt fields found (§7.7 item 13) */ }   // EditBase.dossierChange (§7.1)
interface ReceiptRow { row: string /* F1 … F22, F-V8-1 … F-V8-8 */; element: DossierChange['element']['kind']; op: DossierChange['op'];
  receipts: string[] /* the receipt fields in precedence order: the first present decides cause, fate and week */;
  response: 'assign'|'unassign'|'setAttr'|'status'|'rebind'|'epoch'|'converge'|'none'; dating: 'receipt'|'arrival' }   // tables/dossier/receipts, provenance own, the SettlementForge line in its header; `rebind` is emitted as a setAttr of the bound entity's dossier ref (V08 §3.6 (5))
interface StatusRow { status: string; fates?: string[] /* keyed first (§7.7 item 14) */; response: 'open'|'wear'|'dial'|'smaller'|'removed'|'ruined'|'none' }   // tables/dossier/status
```

**Precedence: lock > dossier existence > assignment > user-drawn geometry > rule tables > defaults** — the one order for
every meeting of protections and inputs (§7.2, §7.1's outcome table); S10–S11 apply it to assignments. A targeted
assignment on a locked entity (or a locked attribute path) is refused with the actions unlock, one of the closest
acceptable declarations that leave the locked entity untouched (item 20 (g)), or keep the lock (§7.1's outcome table);
the dispersed solver never places a member on a locked entity. A host's map event (no `EditBase.dossier`) that must
override a lock sends an unlock first, and the log records it (J-DET-11). **Dossier existence** — with every dossier-owned value (§7.7 item 11)
— sits below the lock for every map event, re-derivation and epoch (a dossier event that changes a locked value
supersedes that lock, below) and above every assignment, drawn shape and rule (the one statement): a dossier-backed element is
never removed by anything on the map and never placed on a locked entity — it takes the best unlocked site the hard rows
allow and, when no site passes them, its first closest option — the fewest hard rows failed, then the best score, in
§4.7 S10b's order — with the rows it fails reported (§5.2 F-SITING), never omitted (J-A20.71).
**A dossier event is never refused by a lock or a pin** (items 20 and 22 first, principle (3)'s precedence; V08 §3.3). A
lock or pin on a dossier-owned value, or on a dossier-backed element's existence, state, name, kind or membership, holds
against every map event, re-derivation and epoch; a dossier event that changes it supersedes it for what it changes —
the lock or pin reported orphaned in the event's disruption report (`why`: the dossier fact) and kept in the log as
history (§7.7 item 5), its other paths still held: a dossier rename lands on a locked name path, a dossier `ruined` or
`removed` state on an institution whose building is locked ruins or closes that building's use (§7.7 item 14), a class
change re-classes a locked class path, a dossier `knownTo` replaces a locked one. A lock on anything else the event
touches is honoured, the event applied around it by its least-disruption order. A dossier population is met through the
epoch's departures and arrivals: where the unlocked dwellings cannot absorb a fall, the leaving households (the roster's
suffix, §4.11) leave locked and pinned dwellings too, each by a `relet` down (V06 §3.5.1 (4)) — even a protected dwelling's
last household, its building then standing empty but never `vacate`d, so it keeps its state, shell, existence
and every locked path — counted `uses.heldByProtection` in the epoch's report. Where the unlocked households cannot
meet the fall, the leaving households are taken from locked and pinned households too, in the roster's suffix order
(§4.11), each lock or pin reported orphaned in the epoch's disruption report (`why`: the dossier's population) and kept
in the log as history: the population is the dossier's (item 8 (f)).
*Fixtures (B-DOSSIER-lite, §13.2's T20-14 – T20-16):* a dossier rename on a locked name path, and a `ruined` and a
`removed` state on an institution whose building is locked — each lands, the lock reported orphaned, every other locked
entity byte-identical (T20-14); a dossier population fall over a town whose remaining households all live in locked
dwellings — the population met within the roster tolerance, every locked building's state and shell byte-identical,
the emptied ones counted in `uses.heldByProtection`, no `vacate` emitted on a locked or pinned building (T20-15); a
fall over a town whose remaining households are all locked — met within the roster tolerance, every superseded
household lock reported orphaned (T20-16).

**One path — placement, then mutation (items 16, 18).** A blueprint's assignments and edits, every element of a dossier
a new document starts from — the port's creation half (§14, item 73) builds that blueprint and this prefix through the
derivation table (§7.7 item 10), the recipe's seed derived one way from the dossier's (§14, item 85) — and the
declarations of a skeleton file imported as a new document (§11.1, item 101), become `assign`, `dossierRecord` and edit
events of the creation prefix (§7.4 *Replay semantics*: S2 reads its `assign` events ahead — the dossier's elements
counted in S2's demand as well, so their land is claimed eagerly at S7b and S10 (3) places them claims-first, J-A22.72;
its staged-record puts and a skeleton's drawn declarations are read ahead by the stages that use them); every `assign`
event — from the blueprint, the dialog, the host bridge or the host door (§11.4) — is placed by §4.7 S10b's one solver
for its scope (claims-first in the creation prefix, the least-disruption order after the city is built) and applied to
each placed plot by §4.7 S11's designation mutator, so an assignment gives the same town whichever way it arrived and
never re-rolls what stood there. **A product's records placement** (item 202): at a rung of a product that declares
`ProductDecl.records` (V07 §2.1), an added record is first offered to that placement, which places it or declines it, a
declined record taking S10b's placement as above; each removal of a record by §7.7 item 2 (through `closeUse`) is
followed by the placement's `remove` call — on an epoch's path at §4.11's dossier step (e) and on an absorb without an
epoch alike, drawing and minting as a post-build placement does (§6.1, §6.3). **Re-solving:** when a member of a
dispersed assignment is superseded without a successor, only that member is re-placed, with every mapped placement as a
fixed point (the minimum spacing is measured from them); nothing still mapped moves. **Epochs (item 17 (d);
J-A17.71):** an assignment is a stable identity that moves with its use under §4.11's use step unless `pinned`, in which
case it stays and the town adapts around it; members are added only by an event that changes the count or the criteria
and are then placed with the existing members fixed; every move, closing and reopening is reported (§5.4's `changes`,
§11.3).

**The dossier contract (items 20 and 22; owner: "the map does not edit the dossier … This module only takes input from
SettlementForge and returns back the map").**
1. *One way.* SettlementForge → map module → map. The dossier enters through the host door of §11.4 as dossier events —
   `assign`, `unassign`, `setAttr`, `dossierFacts` and `dossierRecord` events with `author: 'host'`, `EditBase.dossier`
   and `EditBase.dossierChange` set (§7.1) — in the host's order; the module never writes to, patches or proposes a
   change to the dossier, and the bridge has no message that does (§11.3). Map edits live in the map's own document
   (§2.9), which the host may store as an opaque artifact; nothing in it flows back. **The port produces the events**
   (§14, item 73). SettlementForge sends whole dossiers and no change list, so the port DIFFS the incoming dossier against
   the dossier facts the map already carries by their binding keys (`Document.dossier.carried`, §7.7 item 12) — no
   host-side history is needed — writes one `DossierChange` per changed element (§7.7 item 13), dates it by §4.11's
   dating rungs (item 76) and emits its events, the absorb's first event its `dossierFacts` ledger (V08 §3.6 (4)).
   **The map never asks** (item 20 (h) (iv); the owner: "it is one directional"): a gap in the dossier is the map's to
   fill by the derivation table (§7.7 item 10), never a request — no message, report or field asks the host for a fact,
   and neither the doors (§11.4) nor the port takes a data input beyond the dossier (item 125 (a); J-A20.79):
   `HostContext` (§14) carries no fact — its `audience`, `displayNames` and `line` change no document a dossier makes
   (T125-2) — and the host's commands (§11.3: a week and a selection by `view.set`, a layer's visibility by a logged
   `setLayer` sent by `doc.apply`, as a user's toggle) are commands, never inputs, which the map never needs (item 125
   (c)). The port reads a custom institution's dossier record —
   `source: 'custom'`, its `localUid`, category, tags, description, `required` and scene tokens — and the library's
   definition fields only where the dossier itself carries them, in its `customContentRoster` and
   `customContentProvenance` entries (item 104 (a) (5)'s "when the port receives them", received only through the
   dossier); without them item 104's generic siting supplies what they would, the absence reported —
   `HostContext.customLibrary` is no input (item 125 (a), (e)). **What the port never reads** (item 86; J-A86.71), by reason — the paths are V08 §2.4's field table, the
   one list (its `ignored` rows, each with its reason), read by `AdapterManifest.keyList`, T-V8-20's ignore clause and
   §6.5 (3)'s key-list lint: a host's own map-side layers and its derived reads (the spatial substrate and every spatial
   ledger included); its generation log, internals and sliders; its NPC social groups and the NPC layer beside them; raw
   inputs (the resolved configuration is read); copies of institution records and generation scores (walls come from the
   `@wall` kinds rows, defence from `monsterThreat`, the deposits from `config.nearbyResources*`); the host's own
   verdicts; the lived keys; and prose beyond a description seed the clerk may read (item 101) — a custom record's
   description is read only inside the adapter, reduced to keyword keys and never carried (item 104 (a) (6); V08 §3.13
   (3)). Two parts are read by the owner's rules: the defence readiness (`defenseProfile.readiness` alone; item 114,
   V08 §3.16 (2)) and the traditions with the custom-content traditions bucket (item 118, V08 §3.16 (5)). **The
   closed-digest rule** (W-DOS-01a): inside a record the port reads, a field no `DossierDigest` field names is not
   read. Nothing of the campaign beyond the dossier is read — its placements of the settlement and its partners, the
   realm map, its scale and latitude scale, the frozen `spatialDigest` (item 125 (a); item 396's realm block is no
   input): the latitude and the site's words they would give are the dossier's where it carries them — its culture
   (DR29), its terrain type, access and deposits (DR1, DR19, DR42) — else the generator's defaults; the partners' and
   the deposits' bearings are the generator's draws or the user's settings, never an input (layer 2's *Bearing*, DR3,
   DR19; item 125 (b)). The adapter reports every key it dropped
   (`ignored_key`, §14). The reasons: a host's own map
   memory would make its map program the base, against the owner's rule that what we build stays the base; the sliders'
   effect already sits in the institutions and the income shares, so reading them would count it twice; and
   SettlementForge's own district names — in its news — are never matched to our districts (owner, J80 Q6; J-A86.72).
2. *Existence* (the one statement; §7.2 and §5.3 cite it). Everything the dossier specifies — buildings, institutions,
   assignments, named features — is a dossier-backed assignment (`existence: 'dossier'`) and exists on every map the
   module returns, live or — when the dossier lists it ruined — present as its ruin (§7.7 item 14): F-SITING never drops
   it, `delete` never removes it, and only a dossier event removes, adds or re-designates it; a removal (`state:
   'removed'`, §7.7 item 14) leaves the plot vacant through `closeUse` (§4.11) for item 17's rules to re-use. The
   dossier's population is a dossier fact as well — a count, which the households that fill it honour: they are map facts
   (§7.7 item 9), derived and housed through the roster's demand (§10.2). A map event — one a user, or a host's map edit,
   appends without `EditBase.dossier` — that would close, remove or re-designate a dossier-backed element is refused
   (§7.1's outcome table), with the actions `rejectSite` (move it) and `placeAt` (designate the plot for something else,
   the element re-placed): an `unassign`; a `setAttr` of its use or class; a `convert` `closeUse` of its use or `mutate`
   of its plot to another designation; a conversion that empties or removes the building that houses it (`vacate`,
   `abandon`, `decay`, `ruin`, `robStone`, `clear`, `demolish`); a plot `join` or `split` whose fate would demolish that
   building. A map `delete` of it is recorded as `rejectSite` (§7.7 item 3), and a `relocateUse` or `swapUse` moves it and
   is not refused (J-A20.75). An `epoch` is bound by the same rule without being refused by it: no step of an epoch closes
   a dossier-backed use or leaves one without its building — §4.11's *Dossier content across epochs* relocates it first,
   or keeps it in its building, wherever a step would close it or empty or remove that building — so every dossier-backed
   element is live and placed — or present as its listed ruin — after every epoch (§5.3's row). Elements the generator
   added on its own — filler houses, trees, lanes — may be deleted on the map with local repair, and whatever the dossier
   needs of them (housing for its population, a demanded class) is re-provided elsewhere by the same solver (J-A20.72).
3. *Rejection, not deletion.* A map "delete" of a dossier-backed element is the `rejectSite` event (§7.1). A generated
   entity that no dossier record binds — a raised way, a retaining wall (a generated terrace's walls among them) or a deck
   plot among them (item 110) — is deleted as any generated content (§7.1 *Delete*), and the deletion holds through
   regeneration, every absorb and every epoch; a dossier record read as an input of its reason does not bind it (item
   260). For a rejection, the site is excluded (`Rejection`, above; `PlacementRequest.rejected`), the solver re-places
   the element by the least-disruption order (§4.7 S10b) and the surroundings repair locally (§7.3), from the same seed.
   The rejection is not permanent (owner: "it is not permanent because if a settlement grows or declines that might be
   appropriate to put something there"): it holds while the settlement stays in the state it was made in and **lapses** —
   the site eligible again under the ordinary rules, the element staying where it is — at the first `epoch` event folded
   after it whose `populationTarget` differs from `held.populationTarget` by more than the roster tolerance (§4.11; item
   76; J-A76.43, J-A76.71) — the settlement has grown or declined, not drifted — or at the first dossier event folded
   after it whose effective scope holds the site's block; the lapsing event writes `lapsedAt` into the record inside its
   own touched set, so no event is logged for the lapse, and an undo of a lapsing epoch outside the port's session
   `host:port` restores the hold (§7.4's no-undo-target rule; J-A20.74, with J-A20.41). A user lifts a rejection with `rejectSite` and
   `op: 'lift'`.
4. *Positive placement* (owner: "maybe you want a specific place to be something"). `placeAt` pins a dossier-backed
   element, an assignment member or a designation the generator controls to a chosen plot: the solver honours it when
   the hard rows allow — joining plots and mutating the buildings by §4.7 S10 (7) and S11, relocating whatever was there
   by the least-disruption order — and otherwise the dry run bends it to the closest acceptable site with the blocking
   rows named (§7.1's outcome table). It never creates or deletes dossier content, persists until the user lifts it or the
   dossier removes the element, and draws on `siting` keyed by the plot and the event (§6.1), so it follows the same
   determinism.
5. *Re-application* (the one statement of the disruption report). A dossier change after the first map is a mutation of
   the CURRENT map, never a reshuffle: the solver's least-disruption order (vacant or under-used plots first, then a use
   that can move within the same district, one displacement level, then a join only when the new use needs the land —
   §4.7 S10b) finds the site, S11's mutator adapts the buildings, a removal vacates; households the dossier adds fill
   standing shells first by `relet`, up to §2.6's capacity, before any new plot (item 28 (f), §4.11), their plans re-cut
   as §7.3 states. Positive placements and the map's other edits are honoured first, as pins and protected entities
   (§7.2), and the dossier event is applied around them; an edit it can no longer honour is reported and orphaned, never
   dropped silently (J-A20.73) — a user's value of a field the dossier now sets is superseded by the dossier fact, the
   user's event staying in the log as history and listed in the disruption report (`why`: the dossier fact). Its
   **disruption** — every moved use, joined or vacated plot and mutated building, each with the rule that caused it — is
   computed in the dry run against the request kind's `DisruptionBudgetRow`, stored in the event (`EditBase.disruption`,
   §7.1) and shown as its fate report (§7.3 item 4); the budget bounds the search — the first rung of the order that fits
   is taken — and the effective scope (§7.3 item 1), never the dossier's authority: an event no rung fits within budget
   still lands at the least-disruptive site and is reported over budget (J-A22.73). Every request kind has its row (a
   schema test); a budget of 0 admits only a placement that moves, joins, subtracts and vacates nothing, so a dossier
   event with none lands at its least-disruptive site over budget and a user's positive placement bends to the closest
   site of cost 0, the exact site offered with its disruption. Everything not in the disruption set keeps its exact
   geometry and identity (the oracle, §7.3 item 7 (vii)).
   **A host's undo (item 87).** A host that restores an earlier dossier state sends it as a dossier change like any
   other; the port diffs it (§7.7 item 1), and because §4.7 S10b's least-disruption order takes vacant plots first and
   §4.11 prefers a building's `formerUses`, an element the host removed and then restored returns to its own vacated
   building and an element added and then withdrawn leaves the plot it took — the map converges to its earlier state
   wherever nothing else changed; the residue is reported, and the report names the earlier absorbed state the dossier
   now equals (`state_matches_absorbed`, by the binding's `absorbed` hashes, §7.7 item 12). No rewind of dossier events
   exists: a dossier event stays no undo target (§7.4; J-A87.71).
6. *Continuity.* The map is a function of the seed, the ordered history of dossier events and the map's own edits —
   continuity over path-independence (§6.2 *Histories, not states*; J-A22.71), because the owner asked that the seed
   "respect the previous layout prior to the addition or subtraction". A brand-new map from an existing dossier has every
   element present from the start (*One path*, above). Inside the evolution stage the same rules apply. A dossier change
   the host sends with an epoch rides in that epoch's `EpochInputs.dossier` (§4.11) and is applied at §4.11's step (e),
   after the use step and the ladder and before siting (J-A22.42); one sent between epochs folds at its own log position
   and mutates the map the last epoch left (item 22 (e)). The events an epoch carries take their `seq` from `nextSeq` when
   the `epoch` event is appended — the epoch's own first, then the carried events' in the host's order — so their draws
   and minted addresses are keyed as a standalone event's are (§6.1, §6.3); they fold only inside the epoch and are
   no undo targets, and neither is the epoch that carries them (§7.4) (J-A22.76). The port groups a host's changes into
   these events and epochs by §4.11's cadence (item 76): an element change folds at its own week as a standalone dossier
   event, in the host's order — a late one, dated at or before the last epoch's week, never at a week before it (§4.11
   *The clock* (4)); a population change or a typed-slice change rides the epoch the cadence schedules, in its
   `EpochInputs`.
7. *Knowledge.* A dossier may designate an institution hidden or secret and, for a clandestine one, its concealment and
   its front (item 63): `Assignment.knownTo`, `concealment` and `front` are then dossier facts; the solver prefers
   hidden plots through the class's relation rows (§4.6, §4.7 S10b; item 30), places a front and the function it hides
   as one item by §4.7's concealment rule, and §9.2's label policy reads them. A raid or a discovery is a dossier event,
   applied as a least-disruption mutation — the front may close, the hidden function relocate, a passage be sealed
   (items 17, 22, 30) — and a map delete relocates by `rejectSite` (§7.7 item 3). A value the dossier set is dossier-owned
   (§7.7 item 11; J-A20.77, superseding the override clauses of J-A30.71 and J-A30.72); where the dossier sets no such
   value it is a map fact, edited as §7.1 lists.
8. *What is staged.* The port's creation half is the base's (M1, exercised by the frozen dossier fixtures of §13.2 —
   items 83, 84 — never by a live host), its absorb half lands with this contract at M3a, and its wiring to a live host
   bridge is the owner's SettlementForge stage (§11.4, §14, *Staged by the owner's roadmap*; item 73); no door opens the
   other way — the host's simulator never reads the map's geometry (J86, §11.4). The records and rows the port fills when
   a host supplies them are declared schema-complete and empty in the base: `ConditionOverlay`, `DepositSite`,
   `PowerRelation`, the dossier-backed `Person`, `CustomChainRecord` and `CustomServiceRecord` (§2.7; items 88, 256),
   each written only by `dossierRecord`, `HistoryHint` on the recipe (§2.9), written once by the port's creation (V08
   §3.15), and the impairment, hinterland, crime, custom-weight and
   legitimacy rows (§10.2) (item 88). Everything else in this contract — the events, records, precedence, rejection,
   positive placement, budget, continuity and §7.7 items 9–16 — is the base's, exercised today through the dialog, the API
   and the fixtures.

**The derivation rule and the port's contract** (item 20 (h), 2026-09-27; items 74–87; owner: "whatever the dossier
doesn't provide, the rest of the map code must compensate. it is one directional. only the dossier is the source of
immutable truth while the rest can be constructed at whim. better if the rest of the map code coherently derives things
from the dossier and in accordance with our rules").

9. *Two tiers of fact* (item 20 (h) (i)). Every fact the map holds is either a **dossier fact** — a record or value the
   dossier supplies, carried by the map under its binding key (§7.7 item 12), immutable on the map and changed only by a
   dossier event (§7.7 item 1) — or a **map fact** — everything else: positions and geometry, plots, buildings and their
   classes, the households that fill the dossier's population, plot assignments, prosperity values, the settlement-level
   trade direction and the partners' derived bearings, a collective record's count inside its range, the names the
   dossier does not give, each district's character. Map facts belong to the map — generated, regenerated, edited and
   replaced freely, subject only to §7.7 items 10 and 11. The dossier facts, by kind: the settlement's name, tier word
   and population; each dossier-backed element's existence, state (§7.7 item 14), name, kind and membership and, where
   the dossier gives them, its `knownTo`, concealment and front; a collective record's count range; each quarter's name
   (§7.7 item 16); the typed slices' dossier-sourced values — partners, relationships and listed links, income shares,
   power standings, the government; the conditions; a custom record's definition revision. For every field, §2.8's
   `factTier` derives which tier holds it (never stored; J-A20.23), read by §7's edit rules (§7.7 item 11), §9.2's
   reader, §11's exports and the API through which any clerk reads (§11.2). An author's declarations (item 101) are map
   facts `factTier` reads as `declared`: held against generation and re-rolls until the author changes them (§7.2), and
   never above a dossier fact — a declaration that would contradict one is refused, with the closest acceptable
   alternatives (item 20 (g)) (J-A20.76).
10. *Derive before invent — the derivation table* (item 20 (h) (ii)). A map fact the dossier does not supply is derived
   from what it does supply, by the design's rules, before any recourse to chance. The table is an INDEX: one row per
   map-fact family — the dossier inputs it reads (the port's `DossierDigest` fields, §14), the section whose rule
   derives it (stated there, never here), where seeded chance enters (a concern of §6.1, or none) and the coherence bar
   it never contradicts (§7.7 item 11). A row's inputs are read in the order written — the dossier's, then the
   blueprint's own; no host input is a data input (item 125 (a)) — and when none is present the rule's default applies,
   the generator's own choice exactly as on a map made without a dossier, reported with the fallback taken (item 125
   (b); T125-1) — at an absorb a field that takes its fallback changes nothing, the carried fact standing (V08 §3.5); a
   missing input never refuses, stalls or becomes a request (§7.7 item 1). Standalone, the blueprint
   and our own roster are the inputs of every row — the same rows, so connecting a dossier changes inputs, not rules;
   the tests run the rows
   from M1 on the frozen dossier fixtures and on blueprints alike (§13.2, items 83, 84). The rows are data
   (`DerivationRow`, above; `tables/dossier/derivation`, provenance `own`), each naming the §2.8 registry kinds and
   attribute paths it `covers`; §13.2's totality test proves that every map-fact family of the registry is covered by a
   row and that every row's chance names a registered concern or none (item 20 (h), with item 83's vocabulary test;
   J-A20.78). The rows DR26–DR35 are the volumes' (items 383, 384, 387, 388, 391, 398; the volumes' working names for them are retired, ID-DR),
   DR36–DR39 history's (item 113), DR40 the oasis's (item 111), and DR41–DR44 the item-114, item-117, item-118 and
   item-122 rows: the walls' generation-time condition, the default view season, the festival decorations and the crisis
   looks — the last three a look only, never in the model or its hash.

| row | map fact | dossier inputs, in the order read | rule (its home) | chance (§6.1) | the bar it holds |
|---|---|---|---|---|---|
| DR1 | the site: relief, coast and its side, river course and inflow, lake, marsh | `site.terrain`, `site.access`, the water deposits, `site.culture`; a dossier record whose `kinds` row implies a bridge | S0's site request (`tables/dossier/site`); S1 (§4.2); on a site whose terrain, access and water deposits give no river or canal, the site row's river chance becomes 1 for the smallest watercourse class (a brook) whose course crosses the through route of the longest approach inside the frame — at creation only; on `desert` without an oasis, or where S1's relief cannot carry it, no brook, the build report noting `toll_bridge_dry` (V08 §2.6b (3); item 399) | `blueprint.features`; S1's `terrain.*` and `water.*` | at creation, a coastal dossier has a coast, a riverside one a river, a port one a harbour basin; a later site change is reported, never re-derived (V08 §3.5) |
| DR2 | walls, enceintes and gates; the waterfront | `walls.records`, `walls.citadel`, `walls.flagged`, `site.access`, the population, `site.threat`; the threats by sea (a naval or raider threat, a hostile sea partner, a coastal monster threat) | the access row's gate counts; S0's walls and castle toggles; S3's gate law (§4.2); the wall furniture (§4.8); item 106's barrier closure and the waterfront from circumstances — `open` by default, `quay_wall` with sea gates where the threats come by sea or on a sea-exposed port above a table size, `sea_wall` only by preset or request, the preset row still overriding (item 106 (d)) | `gate.pick` | walls exactly when the dossier lists a wall institution; the gate count inside the access row; a citadel record gives a citadel; a sea-threat dossier gets a quay wall with sea gates and a peaceful one an open front; every walled port gets its harbour-mouth chain (item 106 (e)) |
| DR3 | trade partners, their weights, modes and bearings | `economy.partners`, `economy.tradeLinks`, the toll and duty income rows, `site.access` | layer 2's trade fill (above), its `road` partners' bearings read by S3 (4) as requested bearings (§4.2) | `gate.pick` (§6.1) | a `hostile` partner carries no trade; a rival's listed links are kept; a bearing never moves on an unrelated change |
| DR4 | trade flow: per-gate and harbour weights, the dominant bearing | DR3's slice; `entrepot` | `TradeFlow` (§4.3) | none | weights sum to one; a harbour town's harbour carries the sea share; a derived partner is marked `derived` |
| DR5 | districts: count, kinds, boundaries, identities | the population; quarter claims (§7.7 item 16); district-scale records; `site.culture` (the forms weights); power seats (DR11) | S6's typing and grower, item 72's identities (§4.5) | `district.seed`, `district.type` | every quarter name on at most one district, and on exactly one unless reported waiting (§7.7 item 16); each district-scale record on a neighbourhood of its own; no district named for a social class |
| DR6 | the prosperity field and each plot's band | `wealth.label` (to `intent.wealthLevel` by `tables/dossier/wealth`), and over epochs the changed word as `EpochInputs.wealthLevel` (receipt F9 through V08 §3.5's diff row; W-DOS-02); the economy and power slices; quarter hints | the field with item 72's dials (§4.5) | `field.chance` | the population-weighted mean band within one band of the wealth row's band |
| DR7 | households: count, sizes, bands | the population; `wealth.label`; the rung; the housing record's range; the economy slice | S2's roster (§4.2, §10.2) | `roster` (its ordinal draws) | the members sum to the population within the roster tolerance; the residential building count inside the housing record's range; every household housed |
| DR8 | the class mix inside a neighbourhood | DR6's field; `intent.wealthLevel` | S10b's class mix (§4.7, item 71) | `siting` | the larger classes' share monotone in the value within a band row |
| DR9 | institution instances: a collective record's count, each instance's class and band, the members a ladder step stands for | `institutions[].kind`, `.count`, `.districtScale`; the population; `wealth.label`; the institution ladders (`tables/dossier/ladders`, V11 §2.6 — each pair and subsumption typed COUNT, QUARTER, GUILD, SIZE or REPLACEMENT, provenance `ref:SettlementForge institutionLadders.js`, pinned to the port's baseline and re-checked when it moves; item 108), with the `kinds` row set's rows for the unnumbered qualifiers (V08 §2.6) | S2's per-capita rows clamped into the record's range (§4.2), the class's coverage target, clamped into the range, a weighted option beside them (item 103 (f); V08 §3.5; item 392); the step type's members (item 108 (a)–(c): a COUNT record's members n buildings of the lesser class, a QUARTER a district-defining record owning the trade's members, a GUILD one hall plus a collective of workshops, a SIZE one larger building or compound, a REPLACEMENT the greater only), an unnumbered record's range a table range per kind and rung; DR24's class; its distribution (§4.5's three distributions); S11's templates (§4.7) | `roster` (its ordinal draws) | the count inside the record's range; a singular record placed once; no ladder pair counted twice — a lesser reaching the map beside its greater is a member, never an addition; members rise monotonically across a population sweep |
| DR10 | positions: where each element stands | class, `tags`, `facets`, `forbidden`, the landmarks naming it, chains and dependencies, the power association, `knownTo` | S10b's one solver, claims-first from the creation prefix (§4.7; *One path*) | `siting` (keyed by the assignment and member); `alloc.district` (a dispersed class's controlled random share per district, §4.5) | every dossier-backed element placed (§7.7 item 2); a hard row never broken silently |
| DR11 | power seats and turf | `powers[]` (standing, governing, controlled); `government` | §10.2's government rows (the seat classes) and §4.7 S10b's faction-turf attractor rows; item 72's significance weighs them (§4.5) | none (ties by address) | the governing power's seat is the government's seat institution |
| DR12 | a district's political alignment | the institution's own political role (`DossierInstitution.role`, SettlementForge's per-record `priorityCategory`; V08 §2.5; item 397) first; DR10's plots; the class-to-power rows (§10.2) with `Institution.powers` overrides; the power slice | item 72 (§4.5) | none | shares sum to one per district; a shared building counts once |
| DR13 | a district's economic role | DR10's plots; the class-to-sector column (§10.2); the economy slice | item 72 (§4.5) | none | a building serving two sectors counts once, partitioned |
| DR14 | the names the dossier does not give — ways, districts, quarters and V01's local places (`HoodPlace`) | the dossier's names (protected); `religion.deityName` (the principal temple's dedication, §10.4); `site.culture` | §10.4 with item 72's dominant components | `naming`, `naming.quarter` | no generated name repeats a dossier name within its kind |
| DR15 | buildings: class, footprint, storeys, heights, materials, entrances, basements | the use's class and the plot's band (DR6, DR10); `site.culture` (a template-family row) | S11's designation templates (§4.7, item 19); §2.6 | `siteplan`, `siteplan.entrance`, `heights`, `material` | a material never changes a shape |
| DR16 | hidden plots, passages, fronts | `facets`; criminal categories; covert impairments; the crime scalar (§10.2's staged crime row, item 88) | the hidden share with its staged crime term (§4.6); the concealment rule (§4.7, item 63) | `siting` (the front pick) | a clandestine record's public views show only its front |
| DR17 | the underground: sewers, accesses, the undercity, the ruin and the voids | the population; sanitation records; subterranean kinds; the crime scalar (§10.2's staged crime row, item 88); the blueprint's `disorder`; `undercity`; the ruin's sources, the mining deposits and `mountain` terrain, the church-class records and their counts, the burial records and the `Cemetery network` (DR30–DR32) | II.7's feature law — a sanitation record (an institution matching `tables/dossier/sanitation`) sets `toggles.sewers` to `on`; a subterranean institution matching `tables/dossier/subterranean` forces its system kind (II.7.6), one matching none takes the `arena: 'underground'` hard row and, placed on the surface, a dug underground from its cellar (II.7.6's connection stage), only on a plot whose terrain gate (§2.6) admits at least a half cellar (a hard row), its basement forced; the two row sets' rows and binding targets are V04 §2.3a's (`Sewage system` → the sewer system; `Underground network` → the dug network; `Underground city` → `undercity: 'require'` and the first neighbourhood; `Black market bazaar` → the core's black market; a catacomb record → one complex on a burial face, its surface seated as a `cemetery` use at S10b where the roster holds no burial face; a crypt record → its church's crypt, never a system; a mine or cistern record → its working or cistern); a custom record matches by its resolved profile (item 104 (a)); II.7.5 with §4.6's staged crime term (item 386) | `blueprint.features`, `sewer` | the underground mode only with a navigable run; a required undercity exists; a sanitation record gives sewers; a subterranean record has an underground |
| DR18 | informal clusters and camps | DR6's field; the rung; slum claims | the cluster rows (§4.7, item 70); the shanty staging (§4.5) | `siteplan` | never on a standing plot floored at the middle band or above |
| DR19 | the hinterland: land uses, their bearings and sizes | `site.deposits`, `economy.foodImportPct`, `site.isolation`, `site.terrain` | S12a and §4.9; `economy.foodImportPct` through §10.2's staged hinterland row (`PortRows.hinterland`, item 88), which scales §4.9's farmland once the port fills it | `hinterland.outside` (§6.1) | every listed deposit has its land use |
| DR20 | the knowledge of places | `facets`; covert impairments | item 30's defaults (§4.6); item 63 (§4.7); each `HoodPlace`'s default by `hood.placeKnowledge` where the dossier says nothing, an opening's its `AccessPoint`'s (V01; item 384) | none | a covert fact never reaches a public view |
| DR21 | transition timing | the change's week (§4.11's rungs); the calendar row's season; conditions | the `Works` (§4.11, item 67) | `works` (§6.1) | the stage shown at week w depends only on the record and w |
| DR22 | persons beyond the notables | the households (DR7) | `derivePerson` (§10.3) | `people` | a person derives from its key alone |
| DR23 | the rung and the frame | the population | §1.1's size ladders and the registered products (`ProductDecl`, §4.12); §3.2 (9)'s frame rule | none | the rung is the population's; a dossier outside the ladder is handled by §7.7 item 15 |
| DR24 | a record's class | its name, `kind`, `category`, `tags`; a demotion or upgrade receipt; for a custom record, the inputs of item 104 (a)'s resolution — its scene archetype, free-text category, tags, admitted definition fields and keyword keys — its class decided at fold, not at digest (V08 §3.5 (5) (f); V11 §3.13.1; item 511) | the class rule (§7.7 item 12) | none | a kind without a class row takes its category's generic class, reported, never refused |
| DR25 | a collective record's state over its members | the record's state and severity band | the distribution rule (§7.7 item 14) | `siting` (§6.1) | the affected share equals the severity band's share |
| DR26 | a district's layout (its fabric) and its blocks' content (squares, greens, yards, manor blocks) | DR5's kinds and identities (ladder QUARTER records among them), DR6's field, DR8's class mix, DR9's instances (ladder SIZE and GUILD records among them), DR12's and DR13's alignment and role (through the provisional character), the chains' links (item 105 (i)), DR1's and DR2's site and walls | S7c and S9b (V01 §3.3, V01 §3.5; item 384) | `fabric.select`, `hood.dispatch` | a dossier element's plot is never typed away — its block stays `ordinary` and holds it; the district's population stays whole (T-V1-12) |
| DR27 | floating islands: the gate, count, reason, size, altitude and access kinds; what the sky fill carries of a chain; the shares it may not take | the population (DR23); `wealth.label` (DR6); the households' bands (DR7); the institutions (DR9, DR24: a palace, cathedral, great temple, prison or mage's instance; a custom institution by its resolved scene archetype and `landmarkLevel`); the ladder records by their step type (only a singular or SIZE record may go up; COUNT, GUILD and QUARTER members counted across both arenas); the district-defining records (their raised shares never taken by the fill); `government` (DR11); `site.magic`; `site.deposits` (a `magical_node`); the active reviewed custom chains (item 104 (b)) and `activeChains[]` (item 105 (i)) | V05 §3.2–V05 §3.10, V05 §3.15 (1b), V05 §3.20 (9)–(12) (item 387) | `island.place` | every bound CITY or METROPOLIS map with the setting on has its gate resolved, its node term traced to a deposit or to none, each island's reason traced to a DR7 or DR9 fact, and no ladder pair counted twice across the arenas |
| DR28 | destructive events at an epoch | `calamityHistory[]` with its tick, severity and the institutions it marked ruined (F5) | the evolution engine's calamity table (V06 §2.4, `tables/evolution.json#calamities`) to the `HazardRow` kinds, the place at the centroid of the calamity's F5 targets, the cap or count by severity; the port only carries the records into `EpochInputs.events` (a calamity's `deaths` feed the catacomb need, V06 §3.18.2 (3)) (item 388) | `epoch.transform` (the hazard operators' draws) | a calamity no row maps is reported and ignored; its F5 targets are struck in place, never relocated; no hazard is invented for a dossier-bound map (`evolution.hazards` is `none` by rule) |
| DR29 | the site latitude the model-side sun reads (item 102 (a)) | `site.culture` through `tables/dossier/cultures`; else 50° N, the generator's default (item 125 (b)) | the port writes it into `Intent.latitudeDeg` at creation, a map fact the user may edit (§7.7 item 9); a later `site.culture` change is reported (`frozen_fact_changed`, V08 §3.5), never re-derived; V05's model sampler reads the latitude in force (V08 §2.5); §8.4's path mode reads it for the document's views (item 391) | none | a dossier map's population-weighted mean band stays within one band of its wealth row with the sun term on (T73-7; T-V8-22) |
| DR30 | the ruin system's existence, source, age and centre (item 109 (b)) | `site.ruinEvidence`; `history.ageYears`; the `ancient_ruins` and `magical_node` deposit sites | V04 §3.5.0a (1)–(3) | `sewer` (keyed by the source's lineage) | a dossier with `ancient_ruins` or a `ruined-landmark` record has a ruin system, else a stated reason (T-V8-32) |
| DR31 | the cavern drivers (item 109 (a)) | `site.terrain` → the relief class (`site` row); the mining deposits | V04 §3.5.2's relief rows, fissure gate and mining test | `sewer` | a `mountain` dossier's relief is `mountainous`; a mining deposit sets the mining test (T-V8-32) |
| DR32 | the burial faces, the crypted churches and the church count | the church-class and burial records (V08 §2.6a (3)); `stone_quarry`; `history.ageYears` | the classes by V11's `kinds` and `ladders` rows; the crypts by V03 §2.4 with V02's basement; faces, rank, count, ratchet and stagnation by V04 §3.5.1 and V04 §3.10 | none | T-V8-33 |
| DR33 | the supply links between the chains' bound members, their goods and weights (item 105 (i)) | `economy.chains` — SettlementForge's `activeChains[]`: processors resolved, outputs through `goodWords`, upstream, the neutral status —, `economy.dependencies`, `economy.goods`, `entrepot` | item 105 (a)–(h)'s web at S10a/S10b and every epoch, each link × V11's `siting.web.chainStatus` of its chain's status; an `entrepot` chain's ends are item 104 (b)'s import and export pulls through the store at the gate or quay facing the partner | none | every chain with two joined members yields a link; an impaired chain's pull equals the status factor × a running one's; an entrepot chain's end pulls toward the gate or quay facing its partner (T-V8-35) |
| DR34 | the aqueduct reason's inputs: whether the water need counts as met, the terminal, the cap step, the source candidates and the chance modifiers | the rung (DR23); the records bound to `conduit_house` through V11's `kinds` and `ladders` rows; the demand records (bound to `bathhouse` and to the classes whose V11 row needs running water); `site.terrain` through the `site` row (`riverside` → a river inside the walls; `desert` → the arid biome; `hills`, `mountain` → a relief that can hold a higher spring); the river DR1 gives; the `hot_springs` deposits (never a source); `site.culture` | item 110 (b)'s aqueduct reason with V11's chance, need, cap and terminal rows | `raised.reason` | T-V8-36 |
| DR35 | the landmarks an elevated road may link | the dossier-bound institutions whose class significance (§10.2; item 72) is at least V11 §3.24.2's `elevated.landmarkMinSignificance` through V11's `kinds` rows, and the custom records with `landmarkLevel` `landmark`; each read at its S3 reservation (castle, palace, precinct), fixed before the end of S6 where the road is committed; its high ground is the relief's | item 110 (b)'s elevated-road reason | `raised.reason` | T-V8-38 |
| DR36 | the peak: the built extent's high-water mark the history replay grows to (item 113 (a) (1), (f)) | `peakTier` and the high-water population; without them the evidence of a higher tier, strongest first — `tierHistory`'s from-tier on a demotion, the maximum of `populationHistory`, the losses in `calamityHistory`, a higher tier's institutions listed ruined or remnant, a resettlement after a terminal death; standalone, the blueprint's history option (§4.2 S0) | §4.11's history-first generation (V06): the peak's tier, or an **effective peak** — the higher tier itself sized at a representative value inside that tier's population range (V11's cell; by default the range's lower quartile), marked `symbolic` in the fact's provenance, which only sizes the remnants the replay leaves | none | no peak without evidence of a higher tier; a symbolic peak sized inside its tier and marked; never a contradiction of a present dossier fact, and never written back (SettlementForge's own rule that a peak is never inferred stays its own) |
| DR37 | the replay's epochs and the events it plays (item 113 (a) (2)) | `history.ageYears` (the founding); `history.events` (their types, years ago and severity); `tierHistory`, `populationHistory`, `calamityHistory` | §4.11's replay as coarse epochs from the founding or the peak to the present, each event mapped to its epoch by V11's event-to-epoch rows (V06) | the concerns of the stages each coarse epoch runs, with the replay's epoch component (§6.1) | the dossier's present facts met exactly at the replay's end (item 20); the replay byte-stable per seed and history |
| DR38 | destruction and refounding (item 113 (b)) | the lifecycle's terminal death and resettlement (`destroyedByEventId`, `lifecyclePatch`); a catastrophic event; an ancient "Fall of" event on the site | §4.11: the old settlement's geometry becomes ruins and the new one is generated on top, reusing old roads, gate gaps and bridges (the route cost favouring them), building on old foundations and quarrying the ruins (the salvage ledger), its plan and culture its own | as DR37 | a refounded fixture reuses old roads where they serve |
| DR39 | burial: when the former settlement's ruins lie underground (item 113 (c)) | the ruins' ages from the replay; floods, river silt and rebuilding on top; bare rock (`site.terrain`) | II.7.6's buried former settlement, derived from the former geometry at its old ground level, past V11's burial threshold (a century by default, shortened by floods, silt and rebuilding, lengthened on bare rock); distinct from DR30's older civilisation | none | buried ruins only past the threshold, matching the former geometry |
| DR40 | an oasis (item 111 (a)) | `site.deposits`'s `oasis_water`; `site.terrain` (an arid site) — the site itself DR1's | S0's and S1's oasis feature (§4.2): a spring-fed pond or small lake in a hollow or at a fault line, its grove and irrigated gardens | none with the deposit; standalone, `blueprint.features` at the arid row's chance | a dossier with `oasis_water` has an oasis; an oasis only on an arid site unless drawn or supplied |
| DR41 | the enceinte runs' generation-time condition (item 114 (d); the item-114 row) | `defence.readiness` (V08's `readiness` row: its band; standalone, the band the creation slice's `threat` gives by that row); `wealth.label` (DR6's `intent.wealthLevel`, its MEANS class against V11's `walls.condition.meansLow` and `meansHigh`); `site.culture` (the patch rows admitted); the enceintes and their stretches (DR2) | S3 and S7 lay each run's condition — `standing`, `worn`, `patched` or `breached` — from V11's `walls.condition` generation shares for (readiness band, MEANS class), and a `patched` run's material from `walls.patchMaterials` by the enceinte's kind and culture (V11 §3.25.3), each run's last-change epoch 0; with `atGeneration` false every run `standing`; under history-first generation the replay's condition instead (V06 §3.7.7 (5)); over epochs the need reads max(`threat`, `PortValues.readiness`) and the means the wealth level in force (V06 §3.7.7; V08 §3.16 (2)) | `walls.condition` (§6.1) | a `vulnerable`, poor town shows patched and breached runs; a `fortress` in a rich city stands whole; with `atGeneration` false every run stands (the no-op pin) |
| DR42 | the default view season (item 117: a look only, never in the model or its hash; the item-117 row) | the present week — the dossier's own latest stamped tick, the greatest of its conditions' `triggeredAt`, its calamities' and its history's ticks (§2.9's *The week's source*; §4.11 *The clock* (1); item 125); the `calendar` row (`sf445`); the climate: the `climates` row's terrain column for `site.terrain` (item 125 (b)), else the blueprint's choice; S0's relief class | §2.9's view state: under its "follow SettlementForge" flag the year position is the present week mod 52 on the `sf445` year (52 weeks, 13-week seasons from spring); with no stamped tick, and standalone, the view keeps the user's season control, midsummer (week 19) by default (item 125 (b)); the biome's climate row is the climate's first source present, set at creation (§4.2 S0); the season look reads that row's season columns (V11's), except that a `hilly` or `mountainous` relief (S0's class; item 117 (d)'s "mountain and upland colder") reads the next colder row's — warm → temperate → cold → severe, an arid or semi-arid row unchanged — the height correction, applied whichever source gave the row but once: a `mountain` terrain's terrain-column row, which already reads `cold` by its height, is not corrected again; the correction never changes the model's row; §8.2's season rows draw it; a later `site.terrain` word is reported (`frozen_fact_changed`, V08 §3.5), never re-drawn | none | a dossier map opens on its dossier's latest stamped week, one with no stamped tick on the user's season (midsummer by default); the same document hashes identically in all 52 weeks; a temperate row on hilly or mountainous relief draws the `cold` row's season cells, a `mountain` terrain's `cold` row is not corrected to `severe` |
| DR43 | festival decorations (item 118: a look only, never in the model or its hash; the item-118 row) | the carried `tradition` facts (`trad:` keys: the name, the kind by the `festivals` row, the weeks of the `sf445` year, the staging keys, the deity; V08 §2.3, V08 §3.16 (5)); `site.culture`; the view's year position (DR42) | §2.9's festival display (follow, off, or preview one festival): following, a festival's decorations show while the view's week lies inside its weeks — a window whose end precedes its start wrapping past week 51 — drawn by §8.2's festival rows from §10.2's decoration table by tier and kind at the place its staging keys name, else the festival kind's fallback, never over a keep-out or a gate's passage, their colours and motifs by `site.culture` and the deity; two festivals in one week both show; a tradition with no readable week is unscheduled, shown only in preview; standalone no tradition exists and none is invented | `render.instances` (view draws only: §8.10's keyed placement, as §8.2's festival rows key it) | no festival changes a digest; a festival shows exactly in its weeks |
| DR44 | the crisis looks (item 122, with (h)–(i): a look only, never in the model or its hash; the item-122 row) | the `ConditionOverlay`s standing in the view (§2.7: archetype, severity, `sinceWeek`, `untilWeek`; a stressor, a condition or a simulator event as V08 carries it) — §2.9's `week` in [`sinceWeek`, `untilWeek`), or from `sinceWeek` on while the overlay stands where it has no `untilWeek`, never the year position; a calamity's `targets` (`calamityHistory[]`); the forces', coalitions' and travelling groups' headcounts where the dossier gives them, else the condition's or calamity's own counts (`exodus`, arrivals) (item 122 (h); V08); the map's rung | each standing overlay → the `map` row of the source word V08 §3.16 (7) (b) gives the overlay (a stressor's type, a simulator crisis event, the `calamity` word of a linked condition, else its archetype) → its look row → its scale at the rung by severity, or by headcount at `areaPerHeadM2` where the dossier gives one, placed by §10.2's *Crisis looks* (c)–(f) and drawn by §8.2's look rows under §2.9's `crises` key (`off` none; `preview` one look at `previewSeverity` with no condition). The `map` rows are §10.2's `RosterTables.crisis` (its `stressor`, `archetype` and `event` rows): every SettlementForge stressor type, condition archetype and crisis event at the pinned baseline has exactly one, a look kind or `none` — `regional_migration_pressure` the refugee camp (item 122 (b)'s mass immigration), the other regional_* pressures `none`; a source with no row reads `none`, reported `unmapped_word` (V08); a stressor's overlay draws no look while a condition's overlay whose map row gives the same look kind stands (V08 §3.16 (7) (b)). Knowledge admission at the viewer's effective key (§9.2's admission function, as a band-less reader, §11.2): a condition's `knownTo` is `public` where its `map` row gives a look (a camp, a quarantine, smoke and ruins are sights) and `secret` where the row is `none`; a key form listing the overlay's address admits it whatever its tier (J-V8.128); a withheld condition is never drawn, listed, counted or named. What a crisis leaves reaches the model only through the epoch path (DR28's calamity in `EpochInputs.events`, the population target; V06's hand-over); standalone no condition exists and none is invented — only a preview draws | `render.instances` (view draws only: §8.10's render keys from the seed, the condition's id and the place, a preview keyed on its look kind; never a model stream) | the same document hashes identically with crises on and off and in every week (T122-1); each look shows exactly in its condition's weeks (T122-2); every SettlementForge stressor type, condition archetype and crisis event at the baseline has its `map` row (T122-4) |

   **The history replay's record.** A settlement generated from its history (DR36–DR39) carries the replay's record —
   §2.7's `HistoryRecord` (its peak with `symbolic` and the evidence used, its coarse epochs and the events each played,
   refoundings, buried systems; written by V06's replay) — which the report's `epochs` list (§5.4) and the clerk read (V10), so the story can be told ("the walls were built when this was a
   city of twelve thousand"; "its exact size is not recorded" for a symbolic peak).
11. *Coherence* (item 20 (h) (iii)). The derivation obeys four rules, proved by §13.2's coherence bars (item 20 (h)) on
   the design's own dossier events and by the port's bars on the frozen dossier fixtures (item 83), and checked at run
   time by §5.3's coherence rows: (a) no derived fact contradicts a dossier fact — counts, kinds, existence and state,
   membership, the realm-level trade facts (each table row's bar); (b) a dossier change re-derives exactly the dependent
   map facts — the rows whose inputs it changed — inside its disruption set, by §7.7 item 5's least-disruption mutation,
   never a re-roll; (c) the derivation reads nothing beyond three inputs — the seed, the ordered dossier history and the
   map's edits (§7.7 item 6), so the same inputs reproduce the same map; (d) nothing derived flows back (§7.7 item 1).
   The rules bind the DERIVATION — generation, re-derivation and every dossier event; a user's edit of a map fact (a
   prosperity stroke, a moved building, a renamed lane) belongs to the user and stands, since it alters no dossier fact.
   **The dossier-owned refusal** (the one statement; §7.1, §7.4, §5.2 and §7.7 items 2 and 7 cite it): an edit that
   WOULD alter a dossier fact — a rename of a dossier-named element or quarter (a claimed quarter name, item 82), a
   change of its kind or class (§7.7 item 2), a `setAttr` of a value the dossier set (`knownTo`, `concealment`, `front`,
   `powers`, `state`, `custom.revision`), a collective record's count set outside its range, an `adjust` of a
   dossier-bound map's population or of a slice value the dossier supplied, a declaration or a closure that would
   contradict one, a user's or clerk's `dossierFacts` or `dossierRecord` — is refused with the reason `dossier-owned`, the
   map-side alternative offered where one exists: a label's display text and its visibility (§9.1), what each viewer
   sees by the viewer's knowledge key (§11.3), a count inside the range (J-A20.77). Where the dossier's `site.magic`
   resolves `none`, the islands setting is refused (DR27; V05 §4.4).
12. *The binding — identity without dossier ids* (item 20 (h) (v), made concrete by item 74). SettlementForge keys most
   of its records by NAME and gives most institutions no id at birth, so the map binds its own stable addresses (§6.3) to
   the dossier's keys in the document's `dossier` block (§2.9: a `DossierBinding` and the `CarriedFacts`, above), which
   the port's events write at creation and at every absorb (the `dossierFacts` ledger folds into it). The KEY LAW for SettlementForge's records,
   stated here, with the port's own keys V08 §2.3's, applied by the port's adapter (§14) — the only code that reads
   SettlementForge's fields (J-A74.72):

| element | binding key | re-binding receipts |
|---|---|---|
| the settlement | `settlement:<id>` — the dossier's own id; where the dossier's `id` is empty or not of its line's form, at a creation `settlement:map:<mapId>`, the creating map's id, kept for the document's life (a later readable `id` neither replaces it nor is checked against it), and at an absorb the bound document's key (V08 §2.4's `id` row; item 125 (b)) — stable across reloads, same-seed regeneration and section rerolls; between readable ids, a new id is a new dossier and a new map | `rename-settlement` renames the title label only |
| an institution | `inst:cat:<catalogId>`, else `inst:uid:<localUid>`, else `inst:name:<slug(name)>` — SettlementForge's own anchor precedence; `#k` appended for a collective record's k-th member; two records of one key told apart by their order in the dossier, reported `duplicate_key` | `demotedFrom` with the fate `demoted_by_disaster`, `promotedFrom` with `upgraded_by_reconstruction`: the row is kept and the record re-classed by its new name |
| a power | `power:id:<faction.id>` when the dossier authored one, else `power:<slug(name)>` | `rename-faction` |
| a notable | `npc:<id>` | a successor's `replacedNpc` links the successor's row to the one it replaces |
| a condition; a resource; a quarter; the government; a custom chain; a custom service; a custom library entry | `cond:<id>`; `res:<key>`, or `res:uid:<localUid>` for a custom resource; `quarter:<slug(name)>`; `government`; `chain:<chainId>`; `svc:uid:<localUid>`; `def:<definitionId>` (item 256) | none |
| the port's own keys — V08 §2.3's singletons and pair keys and V08 §2.5's derived deposit key | V08 §2.3's (cited, not restated) | none |

   `slug` is the line's own name normalisation, applied by the adapter, so a name key agrees with the catalogue key the
   line writes at birth. **Class is read apart from identity** (DR24): a record's class comes from its current NAME when
   a demotion or upgrade receipt is present — its kept catalogue key then names the old kind — else from its catalogue
   kind, else from its name, category and tags, the fallback every record without a catalogue key needs; a kind with no
   class row takes its category's generic class and is reported (`unmapped_kind`), never refused (at M1 the rows cover
   M1's classes). **Re-binding** happens only on a receipt of the table: a name change without one is a removal plus an
   addition, reported (`rename_without_receipt`), because a guessed identity is how silent mis-bindings begin
   (J-A74.73). A power's controlled-institution list is resolved to binding keys through the stable part the line itself
   stores — the slug of the institution's own id, else of its name — against the current roster, never through the
   catalogue key. `DossierRef.element` is the binding key and `DossierRef.version` the SettlementForge line (§7.1);
   `Identity.dossier` carries the ref on the entity the element is (§2.8; J-A20.22); a re-binding re-points a binding
   row and never re-keys a map address (§6.3). The model digest does not cover the block, because the model already
   carries each entity's current key in `Identity.dossier`, and `carried` holds dossier facts the map does not draw (a
   notable's role), whose change must not change the map's digest; `binding` is rebuilt from the log's dossier events at
   load and must equal the stored rows (§5.3), and `factHash` is the hash of `carried` (J-A74.71).
13. *The change envelope and the receipt table* (item 75). Every event a dossier change generates carries its
   `DossierChange` (above) in `EditBase.dossierChange` (§7.1), so the disruption report, `LifecycleEvent.cause` and
   §5.4's `changes` say why — the host's reason beside the map's rule (item 22 (b)). SettlementForge records a change
   only through scattered receipts — stamps on the record, capped history lists, decrees, a news feed — so the port reads
   them through the RECEIPT TABLE (`ReceiptRow`, above; `tables/dossier/receipts`): per change kind, the receipt fields
   in precedence order — the first present decides the cause, the fate and the week, by §4.11's dating rungs — and the
   response. The design states the rows below (J-A75.71); the others — F6 reopened, F7 population, F9 prosperity, F10
   power standings, F11 government, F12 conditions, F13 resources, F16 the deity, F17 notables, F19 a confirmed table
   event, F21 a reroll — and the port's own kinds of V08 §3.6 (1) — F-V8-1 `relation` (the powers' pulse week when the
   line stamps one, else arrival; a `setAttr` through a `dossierRecord` put), F-V8-2 `port-values` (arrival; `epoch`; the
   government's legitimacy read as an `attr` on this key), F-V8-3 `custom-def`, `custom-chain` and `custom-service`
   (arrival; the responses of V08 §3.5's diff table), F-V8-4 `chain`, F-V8-5 `dependency` and F-V8-7 `evidence`
   (arrival; `epoch`), F-V8-6 `calamity` (its own tick; `epoch`, riding `EpochInputs.events`) (item 393), F-V8-8 `site`, `history` and
   `tradition` (arrival; `none` — the ledger event alone: `carried` updated, a `site` or `history` change noted
   `frozen_fact_changed`, a tradition's new schedule read by the festival display, DR43; V08 §3.5, V08 §3.6 (1)) — are data rows
   of the same type, their completeness §13.2's vocabulary totality tests (item 83; T73-10). A change no rung dates is
   applied finished, without transition stages, and reported (`unreceipted_change`).

| row | change | receipts read, the first present deciding | response |
|---|---|---|---|
| F1 | an institution added | a new binding key; `createdByEventId` or an `add-institution` decree; `_worldPulseTierAdded`, `_worldPulseEconomyBuilt` or `_worldPulseFounded` with their outcome ids and `foundedAt`; the fate `founded_by_flourishing`, which writes nothing else and is dated by arrival alone | an `assign` with `existence: 'dossier'`, placed by S10b's `dossier` request (§4.7); an addition under a key the map carries as removed or ruined is a REOPEN (row F6, §7.7 item 14); a missing `foundedAt` never reads as "stood since the founding" |
| F2 | an institution removed | `worldPulseFate` and `_worldPulseInactive` FIRST — the closure fates `hollowed_out`, `abandoned`, `bankrupt`, `closed_for_want_of_custom`, `shuttered`, `abolished`, `disbanded`, `captured_by_local_powers`, `abandoned_with_the_settlement` under status `remnant` — then status `removed` with `removedByEventId`, or a `remove-institution` decree | §7.7 item 14's `removed`: `unassign`, `closeUse`, the plot vacant |
| F3 | reduced or converted | the fates `privatized`, `downsized`, `reduced_to_watch_post`, `survives_as_remnant`; `demotedFrom` or `promotedFrom` | a `setAttr` of the designation in place (item 18's mutation); a demotion or upgrade is also row F15's re-binding, the record re-classed by its new name |
| F4 | impaired or restored | the visible `impairments[]` (the state `impaired` derived from them) | the physical types — capacity, infrastructure, access, supply — one `condition` step per severity band; the non-physical — legitimacy, influence, wealth, staffing, corruption — the impaired institution's own dial term only (§4.5's three dials; J-A88.42) |
| F5 | ruined | status `ruined` with `destroyed_by_disaster`, `remnantReason` and the calamity's targets (never `destroyedByEventId`, which is the settlement's) | §7.7 item 14's `ruined`: present as its ruin |
| F8 | the tier moved | a `tierHistory[]` entry, or a bare `tier` change with none (a calamity, a resettlement, a preset that applies proposals at once) | the rung re-read at the next epoch's target (§4.11); the tier word re-titles the map (§7.7 item 15) |
| F14 | trade | `_cutRoutes`, `_userRoutes`, a route link, `tradeLinks`, a partner's relationship — a rival's or a cold-war partner's listed links kept, only `hostile` or a suppressed economy carrying none | the trade slice at the next epoch |
| F15 | a rename | `rename-settlement`, `rename-faction`, `rename-npc`; for an institution only `demotedFrom` or `promotedFrom` | §7.7 item 12's re-binding; without a receipt a removal plus an addition, reported |
| F18 | a decree | `decrees[]` applied with `tickRef`; the week's `decreeCauses[]` | the decree's own change rows; a decree whose verb binds no world effect expects no change |
| F20 | the settlement ended or born | `destroyedByEventId` on the settlement root; `lifecyclePatch`; `memberBirths` | an END is an epoch that ruins every building by the decline hooks (§4.11); a resettlement of the same site is the SAME map regrowing on its old plan by item 8's regrowth-first order (owner, J80 Q4; J-A75.72); a member birth is a new dossier and a new map |
| F22 | the host undid a change | the incoming dossier's fact hash equals an earlier absorbed state's | §7.7 item 5's forward convergence, reported `state_matches_absorbed` |

14. *A listed element's state* (item 80). SettlementForge never deletes a record — a removed, ruined or closed
   institution stays listed with its status — so an assignment carries `state`, written only by dossier events through
   these rows (`StatusRow`, above; `tables/dossier/status`), keyed on the fate word and the inactive flag BEFORE the
   status, so that a bankrupt shop is never kept open as a smaller designation:

| the dossier's state (fate first) | the map's response |
|---|---|
| absent or `active` | open |
| `impaired` (derived from the visible impairments) | open; the physical types wear the building one `condition` step per severity band, the non-physical reach the impaired institution's own dial term only (§4.5's three dials) |
| `remnant` with `privatized`, `downsized`, `reduced_to_watch_post` or `survives_as_remnant` | a smaller designation in place (item 18's mutation) |
| `remnant` with a closure fate (row F2's list), or `removed` | `removed`: `unassign`, `closeUse`, the plot vacant (§7.7 item 2) |
| `ruined`, `destroyed`, `destroyed_by_disaster`, `ruined_by_decree` | `ruined`: PRESENT as its ruin — its use closed, its building `ruined` (§2.8's existence), counted present by §5.3's dossier row |
| `vacant` (an empty seat, not an empty building) | no physical change |

   A listed ruin stays on the map as its ruin, so a dossier that lists a ruin is never contradicted by a map that shows
   the element open or gone (J-A80.71); an epoch keeps it as it stands — the decline ladder never robs, clears or
   rebuilds its building (§4.11's exemptions) until a dossier event changes its state. A reopen — an element returning
   to `active` — re-opens its use in its own former building first (S10b's `dossier` request ranks it first, §4.7),
   repaired by a `Works` where item 67's clock runs (§4.11) and at once otherwise. A collective record's state is
   distributed over its placed members: the affected share is the severity band's share (all members when the state
   carries no severity), the members chosen on `siting` keyed by the assignment, the dossier event's `seq` its creation
   index (§6.1), and recorded in `memberState`; the record's `state` stays `active` while any member is (J-A80.72).
15. *Population, rung and tier word* (item 81; owner, J80 Q3; item 202). While no village product is registered, a
   dossier whose population lies below the TOWN floor (§1.1) is refused by the port (`E_RUNG_UNAVAILABLE`, naming the
   village product, PART III): §1.1's clamp to the floor applies only to a blueprint request that carries no dossier,
   because a dossier's population is a dossier fact and a clamped town would contradict it (J-A81.71). With the village
   product registered (`ProductDecl` in `StrategyRegistry.products`, §4.12), the port consults `LadderRouter` at creation
   and at every absorb: a population inside the product's range routes to its rung, an absorb whose population is 0 routes
   to THORP and runs V07's desertion (V07 §3.12; an outcome, not a refusal), and a creation below 1 stays refused. A
   dossier whose population lies above the METROPOLIS cap (§1.1) is refused the same way — `E_RUNG_UNAVAILABLE` naming
   the cap, nothing absorbed — at creation and at every absorb (§14's `creation` and `absorb`): §1.1's clamp to the cap
   serves only a request that carries no dossier, because a clamped town would contradict the dossier's population there
   too (J-A81.01). Inside the ladder the population chooses the rung (§1.1) at creation and, at each epoch's target, by
   §4.11's rung at an epoch; the dossier's own tier WORD is a dossier fact and the map's title word (§9.5) — a "city" of
   5 001 people is drawn on the TOWN rung and still titled a city (J-A81.72). A bare tier change with no history entry
   fires row F8 like any tier receipt (§7.7 item 13).
16. *Quarters and landmarks — naming claims* (item 82; owner, J80 Q5 and Q6). SettlementForge picks its quarters by a
   name test at generation and never refreshes them, so a quarter enters the map as a NAMING CLAIM, never a zoning
   (J-A82.71): a `neighbourhood` assignment with `claim` set, carrying the quarter's `name`, a kind bias from the
   quarter rows (`tables/dossier/quarters`: Market toward a market identity; Religious toward temple; Noxious Trades
   toward craft with the noxious rows; Waterfront toward docks or riverbank by its phrase; Government toward the seat's
   district; Mages' toward an arcane identity; Artisan toward craft; Shadows toward a low band and a larger hidden
   share; Wealthy and Common Residential toward band biases; Roadside Shrine a shrine claim with a soft edge row; the
   village quarters — Alehouse & Common, Fishing Landing, Woodcutters' Ground — one row apiece), and its location phrase
   as SOFT rows in `criteria`: "Downstream/downwind" → `downstream` and `downwind`; the high-ground phrases →
   `highGround`; "Central" and "Village centre" → `nearCentre`; the water phrases → `nearWater`; "Between market and
   residential" → `nearMarket`; "At the forest edge" → toward the wood land use; "Isolated area (safety concerns)" →
   `far` from the centre; "Old town or slums" → the oldest stage and a low band; "At the settlement edge" → the edge;
   "Spread throughout" → no district; "Eastern district (traditional)" → a soft east row at low weight, a placeholder
   dropped on the owner's word (J80 Q5; J-A82.72). At creation S6's typing reads the claim's bias and rows as soft
   terms (§4.5), so a matching district arises wherever the site allows one; the district whose emergent identity (item
   72, §4.5) best matches the claim carries the name — protected as an assigned name (§10.4) and kept past item 72's
   hysteresis; when no district matches above the claim floor (0.5 of a perfect match; our own value, calibratable) the
   name waits, reported, and is matched again at each epoch — never forced onto a poor match (J-A82.73). An ABSENT
   quarter is never a fact, and SettlementForge's own district names — in its news — are never matched (J80 Q6). A
   landmark string the roster already demands becomes a NAMED-FEATURE claim (granularity `feature`: the way, bridge, quay
   or pin it names — a notice post among the pin kinds, §2.7; `tables/dossier/landmarks`); nothing is created for a
   string alone.

A whole-neighbourhood assignment sets the district's intent (layer 2) and its class mix — overriding the class-mix
table's weights inside the assigned district (§4.7 S10b, item 71) — while every building stays individually diversified
by the class rules within the drift bounds, read against §4.7 S11's designation template (item 19) and passed to
`BuildingGenerator.compose`; a district-defining dossier institution is such an assignment with `existence: 'dossier'`,
one district per instance (item 72, §4.5); assignments are events (persist, undo, migrate) and take precedence over
class rules (O10 e). Stable addresses for districts, neighbourhoods, plots and buildings that survive regeneration and
edits are §6.3's.

**Forms catalogue.** A form is a row `{ id, constraints, growthProgramme, signature }`: constraints (site request, wall
rings, plaza position, planned flag, gate count band), a growth programme (stage regimes and branch tables, §4.4), and a
morphometric signature (radial share of arterials, orthogonality index, street-density profile, block-area CV, enclosed
share). Its schema and its thirteen rows ship at the milestone §16 names for the forms (T1 `intend`'s site cards read
them, §7.8): `organic`, `bastide-grid`, `linear-street` (growth anisotropy a = 8 along the main road, §4.4), `radial`,
`hill-acropolis`, `bridge-town`, `port-quay-parallel`, `monastic-close`, `island-city` (shore destinations, §4.2 S3),
`confluence`, `twin-town`, `polycentric` (two or three nuclei, §4.2 S3) and `citadel-and-port` (item 101: a walled upper
town on high ground over a walled lower port — two nuclei of §4.2 S3, the upper on a hill site primitive with its own
enceinte, the lower on the quay front with its own, one arterial joining them); forms compose by growth stage (an
organic core with a planned extension). O10 (g)'s classifier runs on the signature vector.
=== END ===

