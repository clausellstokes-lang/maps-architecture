=== REPLACE ### 5.2 Failure classes: detection, ladder, test ===
### 5.2 Failure classes: detection, ladder, test

Each row fixes its class's detection, the order of its rungs (each deterministic from the stream key) and its test; a
row marked † names in brackets the section that states how its rungs are computed.

| class | where | detection | ladder (in order) | how it is tested |
|---|---|---|---|---|
| F-NUM† precision failure of an optional chain [§3.6] | kernel | `E_OUT_OF_RANGE`, `E_BELOW_MIN_EDGE`, `E_BELOW_MIN_ANGLE`, `E_SELF_INTERSECT` on an optional chain (growth proposals, optional lanes, decorative lines); warnings `W_SNAP_PASSES`, `W_ACUTE_CORNER` | re-propose from the next attempt stream → reject the chain with a report line (a proposal that cannot be inserted is simply not a street). Mandatory chains do not fail for precision (§3.6): `E_OUT_OF_RANGE` on one is a bug that aborts the batch with its stream key; `E_LOCKED` goes to the dry run (F-EDIT) | B-FUZZ at §13.8's sizes against §13.1's bar (O3 a); 0 mandatory chains rejected on B-CITY |
| F-CUT† bent cut fails [§4.6] | S8, S10 | `E_NOT_TWO_CROSSINGS`; a child fails simple / min area / min width / min angle | reflex pre-cut (a face with a reflex vertex deeper than the band's block depth is split there first, and at antenna roots) → redraw the cut position ×2 → straight cut on the mean normal → the always-succeeding cut perpendicular to the longest side run at its midpoint, clipped to the face's own component → substitution (court / green / landmark / a joined plot for the largest unplaced class of the district's **allocation**, never live roster state, §4.7), only for faces ≤ 2 × the band's upper block area | on 10⁵ random concave and holed faces the ladder ends in ≤ 6 kernel calls and the face count never decreases; the built-area share left as court or green residue reported per district (soft band ≤ 5 %); the NG signature regression (§13.5). MFCG baseline: 19 skipped cuts; 3 of 16 cities restarted for "bad poly" |
| F-CORRIDOR† union leaves slivers or a collapsed block [§3.6] | S9 | a face below its class minimum width or area after `corridorUnion` | `absorbSliver` (merge across a partition edge, else keep the face as `residue`; a structural edge is never deleted) → downgrade the offending lane to `alley` width → retype the lane `invisible` and log | B-CITY: 0 faces below their class minimum width and area; 0 structural edges deleted |
| F-OUTLINE† a closed outline is not simple [§4.2 S1] | S1 (coasts, lakes, islands, sky-island outlines) | the displaced outline self-intersects or loops | clamp the displacement → repair by non-zero union → type each resulting loop (islet / pond / absorbed), reported | §13.2's outline stage property test |
| F-RIVER† no course / no crossing [§4.2 S1] | S1, S3, S1's water operator (§7.3) | descent stalls in a sink; the carve would exceed `carveMaxCm`; the course leaves the frame before the core; no crossing site in the core band | carve the sink deeper up to `carveMaxCm` → re-trace from the last good knot → move the inlet along the frame edge (attempt) → move the centre to the bank (S3) → declare "no crossing", route arterials to the bank road, report. A requested river island whose branch separation fails is reported "not built". Inside an edit the re-trace is confined to the edited reach and the inlet and centre rungs are not offered (escalation: §7.3's S1 rows); a moved course knot is never re-traced away from the user's position (§7.3 (b) 1) | 1 000 seeds × {`river`, `coast+river`} (the `WaterSetting` spelling, §13.3) × rung: "river within the core when requested" = 100 % (MFCG baseline: 7 of 10 attempts fail at size 80) |
| F-CONTOUR† a contour crosses a shore [§4.2 S1] | S1 | a contour level set crosses a shore edge | the coast construction of §4.2 S1 → clip every contour to the land faces in vector space before emission (always succeeds), reported; never an abort path | steep-coast, cliff and spit fixtures: 0 contours crossing water; 0 S1 aborts |
| F-SITE no valid centre | S3 | every candidate fails the slope / land / flood tests; polycentric nuclei closer than the separation floor (§4.2 S3 (6)) | relax the slope threshold one step → the largest land component's centroid band → report; nuclei: re-site the later nucleus (≤ 3) → merge the two under one enceinte with a cross wall, reported | corpus sweep over relief characters; twin-town fixtures: walls apart by the floor, or one enceinte with a cross wall |
| F-ROUTE† no arterial path [§4.3, §4.2 S1 (5)] | S4; S5b at stages k ≥ 2 and in every epoch (S4's router, §4.4); S4's local operator (§7.3) | `E_NO_PATH`; an approach cannot meet a pinned bridge deck within the class's minimum radius | another crossing site on the reach within its search band — one S1 or S3 already emitted, a `site` no way uses yet (river and canal decks; a moat deck is fixed at its gate, §4.3; the deck stays perpendicular to local flow) → one bridge at extra cost: a new deck whose two `deck_end` vertices one L0 batch of two same-level shore splits places, nothing cleared, before the way's L1 batch lays its span (inside an operator whose water is not yet inserted the rung only sites the deck, §4.2 S1 (5)) → relax the slope limit one class → route to the nearest reachable junction and mark the destination `unserved` in the report (MFCG's "Unable to build a street!" is only logged, O16) | scripted requests on 100 seeds with pathological sites; O4 (a): 100 % of through-roads at a named destination or reported; road and deck agree on 100 % of crossings |
| F-BUDGET-STAGE† capacity below demand [§4.2 S2, §4.4] | S5 | S5d's area test: the stage's grown area against its plot demand at the bands' plot areas | one bounded top-up before the next stage (widen the stage boundary by the shortfall at the stage's measured plot density, grow only the added ring, recompute the trace) → accept and report the shortfall; the exact plot check after S10 feeds F-SITING | §13.2's B-CITY `wealthLevel` sweep |
| F-WALL† bad trace / infeasible gate count [§4.2 S3, §4.4, §4.8; §3.6–§3.7] | S3 (stage 1), S5a, S7 | the trace self-intersects or crosses the core; a closed trace does not close, or an open trace has an end not anchored on shore, bank or cliff; fewer arterial crossings than N; a non-gate way reaches the trace | gates: two gate routes cross the stage-1 boundary at one point → re-draw the later gate pick (≤ 3) → drop it and report (§4.2 S3 (7)). Trace (fixed before growth, gates pinned — S3 for stage 1, S5a later): re-offset with a larger radius → topology-preserving union-simplify (`booleans`, §3.7) → anchor open ends by attraction onto the nearest shore, bank or cliff (a shared stretch carrying `bank` and `wall`, §3.6; an open trace is legal when both ends are anchored), adding water gates where the waterfront policy requires a quay wall → divert excess arterials to the nearest gate as lanes → add posterns and report when N cannot be met (N = 0 adds no main gate: a declared sealed circuit whose harbour outside the stage-1 region still gets its harbour gate, §4.2 S3 (7)) → last rung: cut a way that reaches the wall at the setback band and prune the outer stub, reported | B-CITY: gates on arterials 100 %; main gates = N exactly; roads leaving each walled stage = its gate count (§5.3's S7 row); 0 non-gate crossings; 100 % of quays reachable without crossing a wall except at a gate on coastal and river seeds. MFCG baseline: sealed cities at 0 main gates, no fallback |
| F-CASTLE† compactness / overlap [§4.2 S3, §4.8] | S3, S7 | compactness < 0.75; the claim overlaps water or the plaza | at S3, when the bailey is sited and before the trace welds to it (§4.8), inside the reservation: equalise the claim's angles (≤ 20 passes) → bloat in 5 % steps up to the band's top → re-site (reported) → keep without a bailey (reported) | §4.8's castle acceptance; O8 (d) |
| F-PLOT† unusable plot [§4.7] | S10 | frontage < min, wedge angle < 12°, landlocked | per-frontage regions (§4.7; when the block's skeleton downgrades, a reflex pre-cut partition) → merge into the neighbour → insert an alley for access → typed residue (court / vacant) | every plot has ≥ 1 access edge (100 %); 0 landlocked buildings. NG baseline: 42 % of lot leaves discarded |
| F-SITING† roster item unplaced [§4.7] | S10b | the eager allocation (§4.7) cannot place a class's demand in its affinity district | reconcile inside the district's allocation (JOIN at block granularity → a whole block → the district edge; cross-district moves only in the allocation's own reconcile, S7b) → reduce the manifest, lowest-priority classes first, and report `unplaced` — decided eagerly, never by the order lazy districts are placed in, never silently (FTG V1 "would regularly give up") | O18 (f) (§15.2): 100 % of institutions on a plot meeting their requirement; §4.5 S7b (3)'s acceptance for claims larger than one block; the derived-complete digest across district orders (§6.5 (9)) |
| F-SITEPLAN† footprint does not fit [§4.7 S11] | S11, the terrain operator (§7.3) | setbacks leave no rectangle ≥ the class minimum; after a terrain stroke a row footprint's fall exceeds `skirtMaxCm` | on slopes above `skirtMaxCm`, stepped wings first → lower the coverage one step → next arrangement (compound → detached → hovel → the `tents` row where the class allows) → vacant plot typed yard, reported | O17 (f) (§15.2); 0 renderer fallback rectangles |
| F-SKELETON† skeleton fails [§3.8] | S11, S13a | the output validator fails (non-planar skeleton, non-monotone faces, inconsistent heights) or the skeleton's work limit (events processed) is reached — `E_WORK_LIMIT`, never a timeout | labels: a sampled medial axis (§3.8, used by §9.3); roofs: a **plain roof** — footprint drawn without ridge or hip lines, roof kind `plain`, heights unchanged (MFCG draws a roof whose gable pass fails plain). Near-rectangular footprints never reach this row: their exact OBB roof is the primary construction (§3.8) | §13.1's ladder-coverage fixtures |
| F-LABEL† no fit [§9.4] | S13b (view side) | the spine is shorter than the text at the minimum size; an unresolved collision at priority | §9.4's seven rungs, each counted in the report; placement is view data and never changes the model (§9.1) | §9.4's acceptance, by B-ZOOM (§13.4) |
| F-WORK operation count reached | any stage, ladder or kernel call | `E_WORK_LIMIT`: a declared count reached (candidates, proposals, kernel calls, skeleton events, recursion depth), each the stage's law over its batch scope (§5.1 (5)) | the stage's declared coarser rung, entered by the count, never by time (fewer candidates, larger cells, a shallower recursion) → report `work_cut` with the count; the map is valid and identical on every machine | time dilation (§6.5 (9)): per-stage digests byte-identical; work-cut rate per stage reported on B-CITY; hit rate flat across each band (§5.1 (5)) |
| F-BUDGET-TIME stage over its time budget — reporting and scheduling only | `@plat/api` worker host (outside model packages) | wall-clock watchdog | postpone or resume a lazy tier (cancel-and-resume only); telemetry records `time_over`; never a model change | a tier postponed and resumed hashes like the eager tier; per-stage timing against §12 in CI telemetry on reference hardware |
| F-EDIT constraint conflict | S0, edits | a drawn way crosses a locked entity; a targeted assignment names a locked entity; an assignment cannot be honoured within its drift bounds; a warp would break an invariant or carry a locked or pinned point-anchored record out of its host face (§7.4); the effective scope holds protected entities whose fate is not *kept*; an `undo` or `redo` whose target has dependent live events (§7.4); a water edit's new channel ⊕ bank setback meets a locked or pinned way, wall or finer entity, or a reservation (§7.3 (b) 3); a moved course knot whose carve would exceed `carveMaxCm` (§7.3 (b) 1); a host provider's output that would pass §2.9's cap on pack data and host content; an upgrade's copy of a pack `to` stops shipping that would pass that cap (§7.5) | the dry run returns the conflict as an action — the nearest valid position (for a course knot, along the drag within the cap), the blocking lock, the fate list to confirm (§7.3 item 4), the dependent events to undo first, Re-derive from S3 for a reservation in a new channel's way, the provider and the size, or the pack and its size with "keep the old model" (§7.5) — decided by §7.7's precedence order; never silently resolved | B-EDIT sequences and conflict fixtures: 0 planarity violations, 0 lost faces, 0 silent re-binds |
| F-REDERIVE coarse re-derivation invalidates finer content or crossings | §7.3's local operators (S1 water and terrain, S4, S5, S6, S7) | a plot, footprint or yard in new water, in a new corridor, across a moved wall band or outside its new cell; a way that new water ⊕ its bank setback will meet off a deck (found on the new water's data before it is inserted, §7.3 (b) 1–2); a deck span no longer over water; a crossing `site` whose bank vertices no longer stand on a shore of its reach | **Plots and buildings:** re-cut the plot along the new boundary (ids kept by the anchor rule, §6.3) → re-fit its site plan (F-SITEPLAN) → demolish what still conflicts, with a lifecycle event whose cause is the edit. **A way new water will meet off a deck** — decided before the water is inserted, in the L1 batch of S1's water operator (§7.3 (b) 3) or of a carve (§4.11 (1)), so the L0 insertion meets no finer edge except at the vertices that batch prepared (§3.3): a **kept way** — an arterial, the only connection of the streets beyond it to a gate or the plaza (§4.11's rule), or a way that crossed the changed water on a deck — is re-routed through a deck as §7.3 (b) 2 states, within the **detour bound** (the re-routed length between its nearest pinned nodes on either side of the water ≤ 1.4 × the old length); every other way is cut at the bank setback: the stretch inside the new water ⊕ bank setback is removed and each land part stays a way — the part keeping the old anchor (end junction, else larger overlap, §6.3) keeps the address, the other is a fresh way — and a land part shorter than the district's minimum block width that ends at the setback (a stub) is removed, leaving a dead end at the bank. **A deck over land** (its reach moved away, no site within the band, §7.3 (b) 2): the `Bridge` becomes a tombstone (`demolish`, cause the edit); its span stays in its way as an ordinary segment of the way's class — the higher class of the two ways it joins where the span was a separate `bridge` way — or leaves with the way if the way was removed; its `deck` and `deck_end` rows are removed (`removeEdges` on `ChainRef('deck', bridge)` and its two `VertexRef('deck_end', bridge, i)`), after which demotion takes its bank vertices to the way's level and clears their kernel pins (§2.2 rule 3). **A site over land** (no successor site matched it, §7.3 (b) 2): its `deck_end` rows are removed by `removeEdges` on their `VertexRef`s and its record becomes a tombstone (§2.7). Every re-cut, demolition, re-route, cut and pruned stub is listed in the fate report with its lifecycle event; a locked or pinned entity is never demolished, re-routed or cut — its conflict returns to the dry run as F-EDIT | the coarse-edit oracle, §7.3 item 7 (v) |

=== REPLACE ### 5.3 The invariant suite, by scope (SCL-1) ===
### 5.3 The invariant suite, by scope (SCL-1)

Every invariant declares a **scope**; only batch-local ones run per batch. *Batch-local* invariants are evaluated on the
batch's touched faces plus their one-ring and on the records it created, changed or removed; *stage-end* ones once when
a stage (or its scoped re-run) completes; *save* and *load* ones when a document is written or verified; *CI-only* ones
in the test harnesses. An edit's dry run (§7.1) evaluates its batch-local and stage-end invariants once on the scratch
overlay, and the commit reuses that result (the overlay is committed as validated): one validation per edit, not two.
**For an edit whose operators chain several batches** (§7.3 item 3) the batch-local rows are evaluated once, after the
chain's last batch, over the union of the chain's touched faces, their one-ring and the records the chain touched — a
river move places its decks' bank vertices in an L1 batch before its L0 batch inserts the water (§7.3 (b)), so the deck
row can only hold at the chain's end. The kernel invariants (first row) still hold at every batch, which is why each
chained batch keeps every way and enceinte one connected chain (§7.3 (b) 3).

| invariant | scope | how it is checked |
|---|---|---|
| the kernel invariants (§3.10) | batch-local | the commit record's faces, edges and role keys (§3.3, §3.10) |
| class floors: min width / area / angle per class (never `minEdge` as a face floor) | batch-local | touched faces |
| no footprint overlap | batch-local | touched footprints against the spatial index |
| every plot with ≥ 1 access edge, every building with its entrance on one | batch-local | touched plots and buildings |
| no way centreline crosses a footprint; no way crosses a reservation (§4.2 S3) | batch-local | touched ways, footprints and reservations |
| walls not crossed by ways except at gates | batch-local | touched ways and wall edges |
| **a way crosses water only on a deck, and a deck only over water**: every edge with a `way` role whose two sides lie in water (the L0 parents of both side faces are water faces) belongs to a `Bridge`'s deck span (the edges between its two deck vertices, carrying `deck`; fords included) or to a **harbour work** — a way of class `pier` or `quay` whose connected set of `pier` and `quay` edges meets land in at most one L0 land face (a pier, mole or breakwater arm rooted on one shore; a detached breakwater touching none, §4.8), which stands in the water rather than crossing it; a `pier` or `quay` way joining two land faces across water crosses on a deck like any way. Every deck span crosses a water face with both ends on its banks; a wall trace crosses water only at a water gate | batch-local | touched way, deck and wall edges against the L0 parents of their two sides, by index (§2.2 rule 2); for a touched `pier` or `quay` edge with water on both sides, one walk of its connected `pier` and `quay` edges counting the distinct L0 land faces its vertices touch (a harbour-wall row's few hundred edges at most). It covers S1's river decks, S3's moat and canal decks, S5a's outer-moat decks, a carve's decks and S7's harbour furniture; §13.2's harbour fixtures include a two-arm mole and a detached breakwater |
| **NF-P5**: no lane crosses a wall strip, and no L3 band, setback, glacis, tower or gatehouse face is cleared or split by an L1 or L2 batch — in every generation batch, and in every edit batch except for the enceintes whose wall-strip parts the edit's chain **declares** it rebuilds by S10's step (0) or removes. The dry run of every chained edit computes that declaration — the enceintes whose strips any of its batches changes, each "rebuilt" or "removed" — and every batch of the chain carries it; the check reads the declaration, never a list of edit kinds. Edits that declare: a tree-scoped re-derivation of a scope holding wall-strip faces (§7.3 item 2); S7's operator (`drawWall`, a moved trace vertex, a re-traced run, `gateToJunction`); S1's water operator for every strip its L1 batch changes — a re-traced run's strips, and a setback or glacis line it anchors and cuts outside a re-traced run (§7.3 (b) 3, 7, 8); a carve for every strip its batches (1)–(3) change and its step 4 re-derives (§4.11); as removals, `wallToWay`, `contractWall` (§4.11) and an enceinte's `delete` (§7.1's walls row). A lane still never crosses a strip (J-DET-39) | batch-local | touched lanes against the `setback` and wall edges; the commit record's removed and changed L3 faces of kind band, setback, glacis, tower or gatehouse against the declared enceintes; a CI registry test fails when an edit operator or conversion that can write a wall strip's L1 lines or L3 parts has no declaration path; §13.2's fixtures commit a canal carved across a wall between two towers and a river move whose new bank cuts a glacis line without crossing the wall with 0 NF-P5 violations, while a `drawWay` lane across a strip is refused |
| footprints ∩ (wall band ⊕ setback) = ∅ on both faces of every wall | batch-local | touched footprints and wall bands |
| every building's wing rings (and a stored composition's composed wings) pass §2.6's wing rule 4 after every carry, in generation and in edits | batch-local | the buildings whose footprint faces the batch changed, by §2.6 rule 4's tiered test (≈ 0.06–2.7 µs a building) |
| water ∩ footprints = ∅ | batch-local | touched footprints and water faces |
| every built bridge within ± 10° of the channel normal, measured on the deck and on the way; a `site` has no span and is outside every deck row (§2.7) | batch-local | touched crossings |
| exclusive land uses never overlap | batch-local | touched land-use faces |
| reference integrity: every reference out of a touched record — people and relations included (a dependent's carer resolves) — names a live id; every reference into a record the batch removed is carried over (§6.3) or reported as an orphan | batch-local | the reverse-reference index |
| identity: every fresh address differs from every live and tombstoned address, and no two live entities share a lineage key (§6.3) | batch-local | at mint, O(1) against the identity set |
| every length field carries a unit (§2.1) | batch-local | at schema write (and §2.1's lint) |
| every stored geometry reference resolves; no geometry carries a dead entity (§3.10) | stage-end, save | the kernel's reverse indexes |
| every gate joined to the network and the plaza; the roads leaving each walled stage equal its gate count (its N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed — a sealed town's, or the detour guard's); an outer enceinte's gates ≥ its arterial crossings; a coastal town's harbour joined to its plaza through a gate, crossing a moat only on a deck (§4.2 S3 (11)) | stage-end (S7) | one graph search per enceinte |
| every gate and weld vertex on its trace; stage 1's trace within its distance bound of the stage-1 boundary (§4.2 S3 (9)) | stage-end (S5) | the trace's role rows; one distance pass per trace |
| every `baseLane` portal matches one S8 lane end and vice versa, spaced by the portal gap (§4.6 (7)) | stage-end (S8) | the `Seam` records against the lanes' end vertices |
| every quay reachable from the town without crossing a wall except at a gate | stage-end (S7, S9) | one graph search |
| no branch re-joins its parent within k segments (§4.4) | stage-end (S5) | per growth stage |
| a sealed enclosure only when declared | stage-end (S7) | per trace |
| contours never cross a shore — a check of the clip construction, never an abort path | stage-end (S1) | F-CONTOUR's clip (§5.2) |
| names unique within their kind's scope (§9.6); a new entity never renames an existing one; a generated name changes only by one of §6.3's draw cases | stage-end (S13a) | per naming run |
| every requested feature (river through the core, N gates, a harbour when coastal, …) delivered, degraded or omitted and reported with its tier (§5.1 (7)) | stage-end | the report's `requested` list |
| containment complete: building ⊂ plot ⊂ block ⊂ district, 100 % | stage-end | per-batch containment counters summed, not a model walk |
| the canonical document validates against its schema (`Recipe.salts` keyed by rerollable concerns only, §6.1); the recorded digests are the maintained model and records roots (§6.2) | save | at write |
| the decoded snapshot's roots and chunk hashes pass §2.9 step 3's checks (a frozen view: chunk hashes only, §2.9 step 2) | load | §2.9 step 3's recomputation before the first edit, or §6.2 (iii)'s off-edit-path one |
| the replayed model and records roots equal the recorded ones (§2.9 step 3) | load | the verification replay (§2.9) |
| a full recomputation of the model tree's root and the records tree's root from their leaves equals the maintained root (§6.2) | CI-only | every B-CITY generation and B-EDIT sequence (the digest-maintenance oracle) |
| digests equal across platforms, under time dilation, under district permutation (the derived-complete digest), and replay = session | CI-only | §6.5 (9), §7.3 item 7 |

Label collisions are not a model invariant: placement is view data; its "0 collisions" is tested by B-ZOOM (§9.4). Hard
invariants abort the batch, which rolls back to the previous arena version while its ladder continues; soft ones
(statistics bands) go to the report. CI counts hard violations per 1 000 cities and requires 0 (O3 b). **Cost rule:**
validating a batch costs O(touched faces × log n), never O(model); per-edit validation time for a fixed scope is flat
from TOWN to METROPOLIS within ± 20 % (a cost test, §13.2: TOWN → CITY at M2a; TOWN → METROPOLIS at M2b, which
measures METROPOLIS — generated from M1 on, §16). *Pre-decided fallback:* an invariant whose batch-local check breaks
that flat cost moves to stage-end scope — still hard, checked later in the same stage.

=== REPLACE ### 5.4 The generation report ===
### 5.4 The generation report

```ts
interface GenerationReport { outputVersion: string;
  stages: { name: StageId; work: Record<string, number> /* operation counts against the stage's declared work limits (§5.1) */; attempts: number;
    ladderUses: { cause: string; rung: number; tier: 0|1|2|3|4|5|6; entity: Id; key: string /* the stream key's textual form, §6.1 */ }[];
    invariants: { name: string; scope: 'batch'|'stage'|'save'|'ci'; pass: boolean; count: number }[] }[];
  requested: { feature: string; delivered: 'full'|'degraded'|'omitted'; tier: number; entity?: Id; cause?: string }[];   // §5.1 (7)
  requestedVsBuilt: Diff[]; autoResolved: { param: string; value: unknown; reason: string; layer: OverrideLayer }[]; unserved: Id[]; unplaced: Id[];
  kernel: { engine: string /* 'plat-arrangement@<version>', §3.7 */; warnings: Record<string, number> /* W_ATTRACTED, W_STRETCH_SHARED, W_WEDGE_ROUTED, W_SNAP_PASSES, W_ACUTE_CORNER, W_SLIVER_RETYPED, W_HEIGHT_CLAMPED (§3.1) */; downgrades: number; workLimitHits: number } }
interface Telemetry { stageMs: Record<StageId, number>; timeOver: StageId[]; verifyMs?: number }   // session-only; never saved, never in any digest
```

The report is a **derived cache**: rebuilt by every derivation (and by the verification replay on load), saved only in
the document's `derived` section so the panel can show it before verification finishes, and excluded from the
canonical form and every digest. It records stream keys **only for ladder uses** (any rung from tier 2 up, retries at
attempt > 0 included), not for every stream the town used. Timings are telemetry: the worker host measures them outside
the model packages, the UI shows them, and nothing saved or hashed contains a millisecond. The same object is the UI's
compact, dismissable panel (O16) and the API's `report(doc)`; every ladder use is replayable from its printed key
(MFCG's replayable attempts kept).

=== REPLACE ### 6.1 RNG and stream design ===
### 6.1 RNG and stream design

* **Engine:** xoshiro128\*\* per stream (four 32-bit words; period 2¹²⁸ − 1; fast in JS, no BigInt).
* **Keys are mixed from structured components, never from strings** (K-6 / R-1 kept). The **seed key** (128 bits) is
  derived once from the seed by four 32-bit-lane finalisers with distinct salts (all `Math.imul`). An entity's
  **entity key** — the mix of the seed key, its lineage hash (§6.3) and its arena key (layer and part, §2.2) — is
  computed once when the entity is minted and cached in the arena beside the lineage hash. Town-level draws — S0's
  feature draws, terrain noise and the per-document furniture (the compass and the emblem, §9.5) — use the **town
  root's** entity key, the seed key mixed with the fixed town lineage (ground arena, no parent, creation epoch 0, index
  0), so they depend on the recipe alone and never on `docId`. Paint programs and furniture pass the reserved stage id
  `STAGE_VIEW` (0xffff) to the one mixer (§14 `Rng.stream`). A **stream key** is one finaliser round over the entity key
  combined with the packed components (stage id u16, concern id u16, reroll u16, attempt u8, epoch u16, salt u16); its
  four words seed the state directly (the all-zero state is replaced by a fixed nudge). A stream is created once per
  derivation and continued; a second request in the same derivation returns the same stream. No string is built on the
  generation path: the textual form `S11/siteplan@plot:7kq2m9x4c1b0a/arrangement[/r=1][/a=2][/e=0]` is rendered from the
  same components for reports only. *Budget:* ≤ 0.1 µs per stream key (string paths measured 0.73 µs). *Measurement:*
  the M0 (d) determinism spike times key derivation over a B-CITY city. *Pre-decided fallback:* derive a batch's stream
  keys in one vectorised pass over a typed array — output-neutral, so no golden moves.
* **The components:**
  - **lineage** — the entity's stream identity, its lineage key (§6.3); a surviving entity keeps it, so nothing that
    survives is re-rolled;
  - **concern** — what the draw is for (registry below); streams are never shared across concerns;
  - **reroll** — the scope entity's New random count, an absolute number stored in its identity and written into the
    `regenerate` event as an explicit per-entity map (the rerolls actually used, §5.1 (6)); children draw with their
    derivation unit's reroll, so New random on a block changes that block's plots and nothing else. A user's reroll count
    is capped at 32 767; rerolls from 32 768 up are reserved for the faithfulness references (§7.3 item 7 (iv));
  - **attempt** — the ladder's retry number (§5.1), restarting at 0 inside each reroll; its cap is declared per concern
    in the registry: 3 for every geometric ladder (tier 3), 8 for the naming re-draw of §9.6 (a repeated name re-draws
    on its own stream before taking a distinguishing suffix);
  - **epoch** — `e` for draws made by epoch e (epoch 0 is the original town);
  - **salt** — a per-concern number in the recipe (default 0) that `rerollLayer(concern)` bumps (§7.1), for
    **rerollable** concerns only. A concern can be rerollable only if it is not a geometry concern and a registered stage
    or paint program reads it (a `StageDecl.streamKeys` entry or a paint program names it), and the registry marks which
    are: exactly `naming`, `render.instances`, `style.jitter`, `style.crowns`, `style.compass` and `naming.emblem` (the
    last two read by the compass furniture program and the emblem generator, §9.5). `naming.quarter` and `style.random`
    are registered non-rerollable (a new `setStyle` event re-draws the random style, §8.2), as is every geometry concern,
    whose reroll is the regenerate action — so rerolling the trees or the names moves nothing else. `rerollLayer`'s
    concern type is generated from the registry, the recipe's initial salts are keyed by the same type and its schema
    refuses any other key (§2.9), so no recipe, link delta or log can give a geometry stream a salt; a CI test fails when
    a rerollable concern has no reader (J-DET-22). A town-wide `rerollLayer` sets the concern's town salt; an
    **ids-scoped** `rerollLayer` of `naming` re-draws only the names of the entities it lists, each with the per-entity
    salt the event carries in place of the town salt. Every other name draw takes its salt by §6.3's draw case — the
    town salt for an entity with no predecessor, the salt its naming record holds for a changed naming input — so a
    name's salt is never in the model digest: the event that set it holds it, and the naming record caches it (§2.8).
    Label candidates are geometric (S13a, §9.3) and label placement is a deterministic greedy over a total order (S13b,
    §9.2), so no draw reads a labels stream and none is registered: "reroll the labels" is not offered, and re-placing a
    label is `moveLabel`.
  - Draws keyed by an ordinal rather than by an entity — the roster's prefix-stable `roster/<class>/<ordinal>` draws
    (§10.2) — use the class's registry entry as the derivation unit and the ordinal as the creation index, through the
    same mixer.
* **Concern registry (G-P6):** adding a concern is a reviewed change to a registry file; concern ids are u16,
  append-only and never renumbered, so adding a concern changes no other key. Each entry declares its reader stages,
  whether it is rerollable and its attempt cap. Initial concerns: `terrain.noise`, `terrain.controls`, `water.coast`,
  `water.river`, `water.islands`, `water.delta`, `site.centre`, `blueprint.features` (S0's per-rung feature draws,
  §4.2), `intent.surprise` (§7.7), `gate.pick`, `reserve.plaza`, `reserve.castle`, `reserve.precinct`, `reserve.water`,
  `roster` (with the ordinal-keyed `roster/<class>/<ordinal>` draws), `route`, `growth.heading`, `growth.branch`,
  `growth.mainroad`, `growth.curvature`, `district.seed`, `district.type`, `alloc.district`, `alloc.block`,
  `field.chance`, `cut.t`, `cut.side`, `cut.arc`, `cut.width`, `cut.farSideAlt`, `plot.width`, `plot.join`,
  `plot.vacancy`, `plot.bounds`, `siting`, `siteplan`, `siteplan.template`, `heights`, `material`, `greenery`, `fields`,
  `crop`, `forest`, `hinterland.outside`, `hinterland.decor`, `pin.centrepiece`, `pin.decor`, `pin.stall`, `people`,
  `content/relations`, `naming`, `naming.quarter`, `naming.emblem`, `warp.jitter`, `epoch.transform`, `island.place`,
  `sewer`, `style.jitter`, `style.crowns`, `style.compass`, `render.instances`, `style.random` (the random-style draw of
  §8.2: creation index = the `setStyle` event's `seq`, attempt 0–2), `render.stampTiles` (the stamp-tile library of
  §8.10: non-rerollable, attempt cap 0; keyed by a constant entity key over (stamp-tile domain, decoration class index,
  the reference spacing 400 cm, creation index — 0–3 for the class's four tiles, 4 for their shared border band), with
  `STAGE_VIEW` and reroll, attempt, epoch and salt 0; read by `@plat/kernel`'s `poisson` builder when
  `plat/tools/stamptiles/` builds the shipped asset, and in a worker only by the fallback rebuild of a tile whose hash
  differs; appended, so no other key moves).
  `alloc.district` also draws S7b's edge-green-or-orchard choice per district, and `island.place` the sky allocations'
  areas (§4.5 S7b (4)–(5)); neither choice has a concern of its own.
* **Distinctness:** a CI test asserts that every stream key and every lineage hash in a B-CITY city **and in a
  sky-island fixture** (two islands carrying districts, underground tunnels) is distinct; the birthday bound is
  negligible (2¹²⁸ for stream keys; ≈ 3 × 10⁻¹⁰ per city of 10⁵ entities for the 64-bit lineage hashes, and §6.3's
  collision rule covers even that) — the test guards the encoder, not the arithmetic.
* **Draw helpers:** `u32`, `float01` (`(u32 >>> 8) · 2⁻²⁴`), `int(lo, hi)`, `bool(p)`, `normal()` (Irwin–Hall of 12
  uniforms — no transcendental in the RNG layer, G-R12; the NG roof jitter's 6-uniform pseudo-normal is a style-time
  helper), `fuzzy(f)`, `weighted(table)`, `deck(table)` (draw without replacement — MFCG's `DeckRuleSelector` idea).
* **Decoration** (the instance model is §8.10's): trees, scatter, crowns, roof detail and hatch phase are keyed by the
  entity's **render key** — the low 64 bits (words 0 and 1) of its entity key (§8.1 item 5) — and the **instance
  ordinal**, never by LOD band; the stamp-tile library and each entity's stamp placement are §8.10's, so nothing
  re-scatters with zoom. Nothing is stored except the user's instance overrides (`instance` events, §7.1) and the
  current positions of positional overrides in the entity's override table, which a warp or a vertex move carries with
  the ground (§7.4).
* **Enter** creates a **new document** with seed (seed + 1) mod 2³² (a `Seed` is a u32, §2.9) and the same recipe —
  params, intent, character, entry mode, table pins, packs — without edits, locks, assignments or salts; when the
  current document has edits the app first warns and offers to save it (J-DET-53).
* Seed-exact parity with the references is ≈ 0 by the evidence and not a goal (`docs/CONFIDENCE.md` §1).

=== REPLACE ### 6.2 What a seed determines, and the model digest ===
### 6.2 What a seed determines, and the model digest

`model = G(outputVersion, base, log)` — a pure function, where the base is the canonical recipe (§2.9's `Recipe`,
which holds every model-affecting input that is not an event) or a rebased state, and the log is folded in order
(§7.4). Tables, presets and styles a host supplies are not in the recipe: they arrive as logged `editTable`,
`editPreset` and `setStyle` events whose content is copied into the log (§6.5 (8), §7.6); packs a later `adjust` adds
are named by that event and belong to the document's pack set (§2.9). Nothing else reaches the model:

* no wall clock — every output-affecting limit is an operation count (§5.1 (5));
* no host text engine — label **placement** (S13b) is view data, derived per zoom stop from the model's names,
  `LabelEntity` records and the bundled fonts' own metrics (§9), and is not in the model digest;
* no viewing order — a stage may be lazy only under §4.1's laziness contract, tested by the derived-complete digest
  (§6.5 (9));
* no worker timing — results merge in lineage order (§6.3);
* one boolean and offset engine per output version on every host (§6.5 (7));
* no host code — a host provider's outputs are read from the document's `hostContent` block on replay (§6.5 (8));
* no installed pack — every pack of the pack set is resolved by content hash as §2.9 states;
* no machine preference read at run time — user-global preferences are folded into the recipe when the document is
  created (§7.6).

Two machines or browsers produce identical model digests (O2 a); two renders of one model are pixel-identical at a given
backend, DPR and style version.

**The model digest is a Merkle digest over the eager model's content only.** The **eager model** is everything the
city LOD draws plus the town-level `Allocation` and `FieldBands` records (§4.5, §4.7); lazily derived content
(close-ups, people, stage-3 compositions) enters the digest when an edit materialises it.

```
leaf(record) = H128(kind ‖ id ‖ lineage ‖ parent ‖ existence ‖ flags ‖ attributes in schema order ‖ digests of the faces and chains it owns)
node(n)      = H128(tag(n) ‖ digests of n's children, sorted by address id)
root         = node(model), per layer:
               site      — terrain raster, fields, L0 water
               network   — ways, junctions, walls, gates, towers
               districts — district → block → plot → buildings, yards, households, pins
               hinterland, content (Allocation, FieldBands, institutions, factions, relations), names and LabelEntity records,
               closeups (edited close-ups only)
               identity  — tombstone ids and supersededBy links, the lifecycle event block
               plats     — per arena and per level, the kernel's level digests
```

* **Geometry is hashed once, by the kernel, per level.** Each arena keeps a digest per level over its level-n route —
  vertices, roles, face owners and kinds of level ≤ n, never arena slots — updated along each commit record's dirty set
  (§3.3). A finer level's Steiner vertices belong to that finer level's digest, so deriving L3 never changes the L2
  digest. Per-level digests read each vertex's and each edge's *current* birth level: a promotion (§2.2 rule 3) moves a
  vertex into the coarser level's digest from that commit on and a demotion moves a vertex or an edge back out of it
  (the neighbour step's reversal restores the kerb's L2 digest exactly), and kept finer content (§3.3) keeps its digest
  leaves through a coarser re-derivation. An entity's leaf takes the digests of the faces and chains it owns (its
  `FaceRef` and `ChainRef` resolved), so no coordinate is hashed twice. Coordinates enter in canonical order (a level-n
  ring from its lowest-then-leftmost vertex of level ≤ n, finer vertices skipped — §3.3's key, so deriving a finer level
  never re-orders a coarser digest's input); integers enter as 32-bit lanes, doubles as their IEEE-754 bit patterns
  (−0 normalised to +0; NaN refused by the schema), strings as UTF-8 — no text serialisation on the digest path, and no
  dependence on byte order.
* **H128** is MurmurHash3's x86 128-bit variant (a published public-domain algorithm in 32-bit operations; our own
  implementation, tested against the published test vectors) with seed 0, so the digest's hash is specified exactly, as
  `H32` is (§13.6 (2)).
* **Included and excluded.** Names and `LabelEntity` records (text, candidates, `pinned`, `hidden`) are model data and
  are hashed. **Excluded:** provenance, derivation records and naming records (the provenance digest, §2.8; the
  persisted records form the records digest, below); `style`, `view`, `derived`, `hostContent` and telemetry (§2.9);
  label placement decisions (S13b, view data, §9); and close-ups never edited — a close-up is a pure function of its
  district's committed state, its sub-seed, strategy and params, and enters the digest under `closeups` with its first
  edit (§7.4).
* **Maintenance:** at every batch commit the kernel re-hashes the leaves of the records the batch touched and the nodes
  on their paths to the root — O(touched × depth) — never by serialising the model (§3.3). The tree is built by the
  generation run in a session and, for a loaded document, by the load's one full recomputation from the decoded
  snapshot under the model packages of the document's own output version (§2.9 step 3) — the snapshot stores only the
  root — so every edit, from the first one after opening, maintains a complete tree. Its memory is counted in §12.8's
  entity-store line. The canonical text serialisation (sorted keys, integer coordinates, floats as shortest round-trip
  strings) is used only for golden files and exports.
* **The records digest.** The persisted derivation and naming records (§2.8) form a second Merkle tree beside the
  model's: one leaf per record — `H128(id ‖ record kind ‖ its fields in schema order ‖ each cited slice as (table,
  version, kind, key, hash))` —, one node per static-index partition (§3.3) plus one **town node**, each over its
  records sorted by address id, and a root over the nodes. A record belongs to the node of its entity's partition — its
  district's, or the partition outside districts — and the records of entities that belong to no partition (ways,
  walls, water bodies, districts) to the town node. The tree is maintained as the model tree is: a batch re-hashes the
  leaf of every record it rewrites and that leaf's node, and a batch that moves an entity between nodes — a re-parent
  across districts, a district merge or split, `outskirtToDistrict` — moves its records' leaves from the old node to
  the new and re-hashes both, although no record changed. The root is finalised when read, stored in the snapshot as
  `recordsDigest`, and recomputed by every in-window load (§2.9 step 3) with the model tree; its memory is counted with
  the model tree's (§12.8). Its leaf encoding belongs to the file schema, not to an output version — the records are
  stored inputs, not derived output — so any version checks it, and a schema transform that changes a record column
  (§7.5) checks the old
  root and writes the new one. Recomputation measured ≈ 4 ms at CITY and ≈ 11 ms at METROPOLIS for ≈ 10 900 derivation
  and 3 500 naming records at CITY (≈ 29 300 and 9 500 at METROPOLIS), on a synthetic, schema-shaped workload on the
  reference machine, two runs within 0.1 ms (`docs/validation/bench/fixall_det_r5_recordsdigest.out`) — PLAUSIBLE until
  M0 (d) times it in the engine, under the same 150 ms bar. The records digest is not a model digest: goldens, the
  locality checks of §7.3 item 7 (ii)–(vi) and the bridge's convergence read the model digest alone, while replay =
  session and truncation identity compare both (§6.5 (9), §7.3 item 7 (i)) (J-DET-49).
* **Bars (M0 d, decided before any golden is signed):** digest maintenance ≤ 5 % of each batch's own time at CITY; root
  finalisation at a stage end ≤ 5 ms at CITY; full recomputation of the root from its leaves ≤ 150 ms at CITY, the
  records tree's included — used by the CI oracle and by **every in-window load** (§2.9 step 3). Measured ≈ 31–34 ms at
  CITY and ≈ 95–101 ms at METROPOLIS for the model tree (the records tree's ≈ 4 and ≈ 11 ms more, above), on a synthetic,
  schema-shaped workload on the reference machine (`docs/validation/bench/fixall_det_r4_loaddigest.out`) — PLAUSIBLE
  until M0 (d) times it inside the engine. Each bar has its own *pre-decided fallback*, and none moves a golden, because
  the root is a pure function of the leaves whenever it is computed:
  (i) *maintenance* over 5 % — leaves are re-hashed at the next coarser batch boundary (per district instead of per
  block and plot); the root at every stage end is unchanged;
  (ii) *root finalisation* over 5 ms — the layer nodes (site, network, districts, …) stay maintained at every commit,
  and the root over them is finalised only when it is read: at save, at the end of a verification replay, at export, on
  an API digest request, and at each stage end of a CI golden run;
  (iii) *full recomputation* over 150 ms — the CI oracle recomputes, per run, one subtree per layer chosen by the run's
  seed (so every subtree is covered across nightly runs) and compares it with the maintained node; and the load's
  recomputation leaves the edit path without leaving the load. The load takes a copy-on-write checkpoint of the decoded
  state at **`h₀`** (§7.4's checkpoints), makes the working state editable at once, and recomputes the model tree and the
  records tree from the checkpoint in the generation worker between edits. Each edit made before it finishes keeps its
  touched set (§7.4); when it finishes, the leaves those edits touched are re-hashed on the new trees in log order,
  which yields the working state's trees. Their roots at `h₀` are compared with `model.digest` and
  `model.recordsDigest` exactly as in §2.9 step 3: a mismatch is a corrupt cache, the replay's state replaces the
  working state when it reaches the head, and the edits made meanwhile are re-applied to it in log order as "take the
  replayed town" re-applies them (§2.9 step 4), their fates recomputed and differences reported. Until the roots have
  matched, nothing is reported verified, "trust the saved town" and step 4's keep are shown disabled ("checking the saved
  copy…"), and a save (which
  records the maintained roots), an export, an API digest request and a bridged client's comparison of its root with a
  `rebase`'s `stateDigest` wait for the recomputation and complete when it does; edits do not wait. A mismatch withdraws
  the keep for good — a corrupt cache is never a base (J-DET-40, J-DET-45). A New random made meanwhile computes its
  scope's content digests from the scope's own leaves (§5.1 (6)), which needs no tree.

=== REPLACE ### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10) ===
### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10)

1. Topology lives on integer centimetres with exact predicates (§3.2).
2. Fields, costs and weights are IEEE doubles; `+ − × ÷` and `Math.sqrt` are exact by specification; every other
   real function goes through `dmath`, the vetted fdlibm port (§3.1; D-23).
3. **The lint is an allowlist.** In model packages — and in every adapter or provider whose output reaches the model —
   the only `Math` members allowed are `abs, floor, ceil, round, trunc, sign, min, max, sqrt, imul, clz32, fround`,
   plus the arithmetic operators. The allowlist also holds for the view code whose output reaches a bit-compared digest:
   `@plat/labels`, every implementation of `ObstacleSource` and `RoleIndex` (§14), the functions they call, and the S14
   builder code that writes the display-list columns they read — `bbox`, the geometry ranges and `GeomTable`, `layer`,
   `z` and the symbol extents computed from the style sheet's sizes (a rotated symbol's extent uses `dmath`) — and
   §8.10's instance function with every function it calls (the stamp, grid and line layouts, the per-instance look draws
   and the density edge test), which the model-format exporters and override resolution run in the generation worker
   and whose positions §13.3 compares byte for byte across engines. CI finds that code as the import closure of those
   implementations, column writers and the instance function, from the TypeScript program, so a module that joins it is
   linted without being listed; the rest of `@plat/render` — paint programs, backends, compositing — stays outside,
   because its output is pixels compared by visual regression (§13.3, §13.4). `**` is allowed only with a literal
   integer exponent from 0 to 4, and the build rewrites it into explicit multiplications (exponentiation is
   implementation-approximated in JavaScript); every other power goes through `dmath.pow` (S1's river-width law
   `w0 · acc^0.4` is `dmath.pow(acc, 0.4)`). Also forbidden: `Math.random`, `Date`, `performance`, timers,
   `crypto.getRandomValues`, DOM access, locale-dependent string operations (`toLocaleString`, `localeCompare`, `Intl`),
   `Array.prototype.sort` without a comparator, and any dependence on object-key or `Map` iteration order beyond
   insertion order. The lint also enforces §3.2 (8)'s division rule (`ratio()`).
4. **Vendored dependencies are scanned too.** Every third-party library a kernel adapter imports is vendored at a pinned
   version and passes the same allowlist scan at each version change; an audit record (library, version, scan result,
   each exception with its wrapper) is kept in `@plat/kernel`. A library that fails (for example one that calls
   `Math.hypot`) is patched or wrapped in its adapter before adoption.
5. Every sort uses a total-order comparator with an id tie-break (the OS `ObjectMap` key-order hazard cannot occur).
6. Pool workers follow §3.3's overlay-and-merge protocol, merging in lineage order (§6.3); no result depends on arrival
   order, and no model package reads time (§5.1 (5)).
7. **One boolean and offset engine per output version, on every host** (D-14): no host may silently run a different
   engine; changing the engine is an output-version bump with a declared shift.
8. **Host providers.** A table a host supplies arrives as an `editTable`, `editPreset` or `setStyle` event whose content
   is copied into the log with provenance `host` (§7.6). Host code registered as a provider (`ContentProvider`, §14)
   passes a double-run check at registration — the same request run twice in two fresh workers must return identical
   digests — and its results are recorded in the document's `hostContent` block, keyed by (provider id, version, input
   hash), and read from there on replay (§2.9, §11.4), so the document replays without the host. Setting packs follow
   the same rule through the document's `packs` block (§2.9).
9. **Determinism tests (CI):**
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
   * the double-run check of registered providers (8), and the distinct-key test of §6.1.
10. **Second implementations.** *The WebAssembly accelerator* of §3.7 (J-K8) compiles a hot loop from the same integer
    algorithm as the TypeScript loop it replaces, so it must reproduce that loop's integer outputs byte for byte: a
    cross-implementation test runs the golden suite with the accelerator on and off and requires identical per-stage
    digests. It is output-neutral and moves no golden; the TypeScript loop stays in every bundle. *The Clipper2-WASM
    engine* (§3.7's pre-decided fallback) is a different engine: it cannot reproduce the arrangement engine's integers,
    replaces it as the single engine on every host (7) with a declared golden shift (§3.7, §13.3), is pinned and
    vendored (4) and named in the report (§5.4); its determinism test is (9)'s cross-host one (J-DET-28).

=== REPLACE ### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation ===
### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation

```ts
interface EditBase { seq: number /* from the document's nextSeq; never reset; survives rebase */; author: 'user'|'host'|'epoch'|'migration';
  session: string /* the authoring session, per document and author (§7.4): its undo and redo stacks; never read by the fold */; group?: number /* one undo step */;
  renames?: Rename[] /* on every event whose fold re-draws a name by §6.3's case (4): the renames its dry run listed and the user confirmed (§7.3 item 4) */ }
type Rename = { id: Id; from: string; to: string };   // the name's text before and after, as the user saw them
type EditScope = { ids: Id[] } | { ring: PolygonCm; key: PlatKey; level: Level };   // resolved to the effective scope at dry run and stored resolved
type EditFate = { id: Id; fate: 'kept'|'carried'|'orphaned'|'discarded'; to?: Id; reason: string };
type FieldStroke = { path: PointCm[]; radiusCm: Cm; falloff: 'linear'|'cosine'; amount: number /* relative Δ: field units, or cm for terrain */;
  water?: 'locked'|'follow' /* terrain only; default 'locked' (§7.2, §7.3) */ };
type EditEvent = EditBase & (
  | { t: 'lock'; ids: Id[]; paths?: string[] } | { t: 'unlock'; ids: Id[]; paths?: string[] }          // paths: attribute-level locks
  | { t: 'pin'; ids: Id[] } | { t: 'unpin'; ids: Id[] }                                                  // only ever an explicit user action — never emitted by viewing
  | { t: 'moveVertex'; key: PlatKey; at: LatticePoint /* the vertex's position before the move */; sig: VertexSig /* its role signature at the edit, §2.2 rule 5 */; to: LatticePoint }
  | { t: 'moveCourseKnot'; water: Id; ordinal: number /* the knot's ordinal in WaterBody.controls, §2.3 */; at: PointCm /* its position before the move */; to: PointCm }   // a river's control knot is S1's recorded input, not an arena vertex
  | { t: 'warp'; key: PlatKey; fromLevel: 0 | 1 /* 1 by default; 0 also moves water and coast */; strokes: WarpStroke[] }   // one staged warp session, committed on Apply
  | { t: 'drawWay'; points: PointCm[]; class: WayClass; widthCm: Cm }
  | { t: 'drawWater'; kind: WaterKind; add: PolygonCm[]; subtract?: PolygonCm[]; line?: PointCm[]; widthCm?: Cm }   // add rings unioned, subtract rings = land brush (islands)
  | { t: 'drawWall'; points: PointCm[]; kind: Enceinte['kind']; closed: boolean }
  | { t: 'drawGreen'; polygon: PolygonCm; kind: Greenery['kind']; densityPerHa?: number }
  | { t: 'drawBoundary'; polygon: PolygonCm; district?: Id }                                           // snaps to whole L1 cells
  | { t: 'drawFootprint'; polygon: PolygonCm; cls?: BuildingClass; use?: Id; heights?: Partial<Heights> }
  | { t: 'build'; plot: Id; cls: BuildingClass; use?: Id; footprint?: PolygonCm; heights?: Partial<Heights> }
  | { t: 'moveFootprint'; id: Id; deltaCm: VecCm; rotateCdeg?: number }
  | { t: 'swapUse'; a: Id; b: Id }
  | { t: 'fill'; scope: EditScope; arrangement: SitePlan['arrangement']; cls?: BuildingClass }
  | { t: 'setAttr'; id: Id; path: string; value: unknown }
  | { t: 'setAttrMany'; ids: Id[] /* resolved at dry run */; query?: Query /* what the user asked, kept for display */; path: string; value: unknown }
  | { t: 'paint'; target: 'roofKind'|'roofColour'|'wallColour'; ids: Id[] /* resolved under the brush */; brush: BrushPath; value: string }
  | { t: 'paintGround'; region: PolygonCm; cover: string; colour?: string }                           // a style region (FTG's texture brush) — outside the model digest
  | { t: 'instance'; entity: Id; ordinal?: string; point?: PointCm; op: 'add'|'move'|'remove'|'restyle'; to?: PointCm; style?: Partial<InstanceStyle> }   // for an ordinal-addressed event the dry run also fills `point` with the instance's generated position; `InstanceStyle` is §8.10's
  | { t: 'delete'; id: Id } | { t: 'merge'; ids: Id[] } | { t: 'split'; id: Id; cut: PointCm[] } | { t: 'join'; ids: Id[] }
  | { t: 'revert'; id: Id }   // "reset to generated": one undoable event that applies, in reverse log order, the inverses of every logged event whose target is this entity (its own edits only); ctrl / cmd+click (§14's keymap, MFCG's ctrl-click reset)
  | { t: 'regenerate'; scope: EditScope; mode: 'keep'|'newRandom'; rerolls: Record<Id, number> /* absolute, per scope entity: the rerolls actually used (§5.1 (6)) */; discardEdits?: boolean; fates: EditFate[] }
  | { t: 'adjust'; param: string; value: unknown; fromStage: StageId; fates: EditFate[] }                 // Adjust, and Re-derive from stage k
  | { t: 'setField'; field: 'prosperity'|'density'|'greenery'|'terrain'; stroke: FieldStroke }          // a relative Δ; the stroke list is composited once (§7.2)
  | { t: 'assign'; assignment: Assignment } | { t: 'unassign'; id: Id }
  | { t: 'moveLabel'; id: Id; placement: Placement } | { t: 'hideLabel'; id: Id; hidden: boolean }      // LabelEntity.pinned / hidden — model data (§9)
  | { t: 'setLayer'; layer: Layer; spec: Partial<LayerSpec> }
  | { t: 'editTable'; table: TableId; ops: RowOp[]; provenance?: 'host'; fates?: EditFate[] /* the confirmed fates of §7.6's fallback re-derivation from the table's first reader stage */ }
  | { t: 'editPreset'; preset: string; ops: RowOp[]; provenance?: 'host'; fates?: EditFate[] /* as for editTable */ } | { t: 'setStyle'; ops: RowOp[]; provenance?: 'host' }
  | { t: 'rerollLayer'; concern: RerollableConcern /* generated from the concern registry (§6.1) */; salt: number /* town-wide: the concern's new salt; 0 with `ids` */;
      ids?: Id[] /* `naming` only: re-draw these entities' names */; salts?: Record<Id, number> /* with `ids`: the per-entity salts actually used (§6.3) */ }
  | { t: 'convert'; op: ConversionOp /* §4.11 */ }
  | { t: 'closeup'; district: Id; strategy: FabricStrategyId; params: Record<string, number> }         // logged before the first edit inside a close-up (PART II)
  | { t: 'epoch'; epoch: number; inputs: EpochInputs }                                                  // an epoch is an event in the log (§4.11)
  | { t: 'rebase'; reason: RebaseReason; stateDigest: Hash128; version: string /* the output version whose model packages computed stateDigest — the document's output version from this event on; a frozenImport sets it to the library's current version (§2.9 steps 2–3) */;
      at: number /* the log head its state materialises: the previous event's seq, or h₀ when kept after edits made during load verification (§2.9 step 4); any other value is refused with E_REBASE_AT and nothing is appended (§14) */ }   // §2.9
  | { t: 'upgrade'; from: string; to: string; mapping: MigrationMap /* §7.5 */; baseDigest?: Hash128 /* with a rebased base: base.state's model root computed under `to`, the root later loads under `to` check it against (§2.9 step 3, §7.5) */ }   // undoable
  | { t: 'undo'; of: number /* seq of the event undone, or of the first event of its group */ }        // applied at the head through the same fold (§7.4)
  | { t: 'redo'; of: number /* seq of the undo it reverses */ } );
type RowOp = { op: 'set'|'insert'|'delete'; rowKey: string; field?: string; value?: unknown; baseRowHash?: Hash64 };   // rows by stable key, never by position
type WarpKernel = 'displace'|'liquify'|'relax'|'bloat'|'pinch'|'equalize'|'swirl'|'jitter';
type WarpStroke = { kernel: WarpKernel; centre: PointCm; radiusCm: Cm; innerRadiusCm?: Cm; strength: number; dragCm?: VecCm };
```

No event stores a `VertexId`, `HalfEdgeId` or `FaceId` (§2.2 rule 5): geometry is addressed by entity address, by
lattice point with a role signature (bound by `resolveVertexAt`, never by distance alone), by a water body's address
with a course-knot ordinal (bound as §7.4's `moveCourseKnot` row states), or by a ring. Undo and redo are events like
the rest (§7.4): the log only grows, which is what lets a host store it (§11.3).

**The named actions** (G-R4; O16-core) are separate operations with distinct semantics, never one flag:
* **Regenerate (keep settings)** re-derives the scope with each entity's *recorded* inputs and unchanged rerolls
  (§7.3): faithful, and byte-identical when nothing upstream changed; used after a lock or a drawn constraint.
* **New random** advances the reroll of every scope entity by one, written into the event as an absolute map, so a
  replay is exact and blocks at different rerolls each move on; a scope entity whose content comes out unchanged
  advances again under §5.1 (6)'s check, and the map records the rerolls used.
* **Adjust** re-solves with a changed parameter. Locality is promised only for parameters the control registry (§7.8)
  lists as consumed at S10 or later, or that carry a spatial scope (a district's density, a block's granularity). A
  parameter consumed earlier (seed, rung, water setting and side, walls, castle option, gate count, planned ↔ organic,
  wealth level, the recipe's pack list) has no local operator and is offered as **Re-derive from stage k**: everything
  from Sk down re-derives with carry-over (§6.3), and the user confirms the edit-fate report first.
* **Same kind, new seed** is Enter's successor — a new document with seed + 1 and the same recipe (§6.1); per district
  (PART II) it is New random on the district. **Surprise me** is a new document whose intent is drawn from the
  `intent.surprise` stream of a fresh seed and written into its recipe (§7.7).

**Warp is MFCG's staged edit.** Strokes in a warp session preview on the L1 overlay at interactive rate — vertex moves
and a redraw of the affected tiles, no invariants (§8.8) — and **Apply** commits one `warp` event holding the strokes
in order (a warp event is committed only on Apply); **Discard** drops them. On Apply, and on every replay, each stroke
is applied as its **operation** to the geometry current at that log position, never as stored displacements: the
operation computes, from the current geometry, a displacement field over the vertices under the brush, and the kernel's
`warp(field, fromLevel, region)` applies it with §3.6's whole-step validation, halving, re-seating, sliding and held
vertices (the dry run lists the held entities), re-deriving locally any face that then fails a class floor, logged.
Records that stand on a point rather than a vertex move with their host face, and every footprint, trace and deck the
warp moved is re-based on the ground it now stands on (§7.4, "Warp and what stands on the ground"). A warp with
`fromLevel = 0` that moves water hands the moved shores to S1's water operator as its new water (§7.3 (b) 1).

| MFCG tool | PLAT | semantics |
|---|---|---|
| Displace | `displace` | drags vertices under the brush by `dragCm`: full weight inside `innerRadiusCm`, falling linearly to 0 at `radiusCm` |
| Liquify (a softer Displace) | `liquify` | as `displace` with a smooth cosine falloff over the whole radius |
| Relax (repairs too-short mesh edges) | `relax` | Laplacian relaxation of the vertices under the brush toward equal edge lengths |
| Bloat (enlarges cells) | `bloat` | each L1 cell under the brush grows about its centroid by `strength`, neighbours yielding |
| Pinch (inverse of Bloat) | `pinch` | each L1 cell under the brush shrinks about its centroid |
| Equalize (regularises one cell's angles) | `equalize` | each cell under the brush moves its vertices toward equal interior angles |
| Rotate (the whole map about its centre) | the `rotation` view key (§2.9) | a whole-map rotation about the frame centre as view state — never a vertex operation, which would re-snap every vertex (§3.6): model north (+y) is unchanged; the compass is decoupled — its view key is `trueNorth` (default: it keeps pointing at model north) or `free` (its own angle, MFCG's behaviour); exports apply the rotation as §11.1 states (J-DET-15) |
| Measure (a ruler, not a warp) | the measure tool of §9.5 | view data — no model event |
| — | `swirl` | our local rotation about the brush centre (not an MFCG tool) |
| — | `jitter` | seeded random displacement from the `warp.jitter` stream |

**Drawing at the authoring boundary.** Pointer samples are resampled along arc length to a spacing of at least
`minEdge`, simplified with a topology-preserving Visvalingam at `minEdge`, and a self-crossing stroke is split into
simple runs before `insertChain` (§3.4). `drawWater` takes `add` rings, unioned by the boolean engine, and `subtract`
rings — a land brush — so an island is a subtract ring inside an add ring and two overlapping sea shapes simply union
(FTG's documented method); rivers and canals take a `line` and a width. `drawBoundary` selects the L1 cells whose area
lies at least 50 % inside the drawn polygon, and the district boundary becomes the boundary of those cells; the dry run
shows the snapped boundary before commit (J-DET-14). A `drawWay` of class `bridge` across a river face places its
`Bridge` by §4.2 S1 (5)'s rule for a drawn bridge; S4's operator routes the drawn way's ends to its deck (§7.3).

**Building-level editing**, each acting through the plot model: `drawFootprint` places a hand-drawn footprint
(concave allowed, simple) on the plot that contains it — a footprint spanning several plots proposes their JOIN in the
dry run; one on unplotted land (a green, a residue, a field) creates a plot around it with access to the nearest way,
or returns a conflict if none is reachable — and the host plot's site plan is re-fitted around it as a fixed slot
(buildings that no longer fit are listed in the fate report). `build` places a building of a class on a plot (the site
plan picks the footprint when none is given) — §4.11's `build(...)`. `moveFootprint` moves or turns a footprint;
leaving its plot re-homes it to the plot it lands on, with both site plans re-fitted. `swapUse` exchanges two
buildings' uses, occupants and assignments atomically, footprints staying. `fill` forces an arrangement (dense row
fill, for instance) on the scope's plots and re-runs S11 there.

**Brushes.** `paint` sets roof kind, roof colour or wall colour on every building whose footprint centroid lies under
the brush path (ids resolved at dry run and stored). `paintGround` records a ground-cover region in the style (FTG's
texture brush): pixels only. The tree brush is a batch of `instance` events on the entities under the brush (§8.10),
one undo step; painting trees where no green entity exists first logs a `drawGreen` (a `wood` on open land, a
`yard_planting` in a yard) to host them. `instance` events also carry close-up presentation edits (II.4). The field
brushes are `setField` strokes (§7.2); the terrain brush's `water` mode chooses whether water stays where it is
(`locked`, the default) or follows the new ground (`follow`).

**People.** A lock with `paths` fixes chosen attributes of a person (name, age, role …); New random on a person
re-derives it with a new reroll keeping locked paths; relations and schedules are not re-derived by a person reroll
(they are town-wide, §10). `setAttrMany` edits many entities at once — job, workplace, schedule, household
(relocation) — from a query whose result is resolved to ids at dry run and stored, so a replay never re-runs the query;
it is one undo step.

**Edit targets — owner amendment 5.** Every generated element is editable (the table below); every rule table and
preset is editable (§7.6), by a user through the preference layer and by us through new table versions; edits are
first-class events that persist (the log, §2.9), undo (§7.4 — undo and redo are log events, so they work in a shared
document too), survive regeneration (§7.2–§7.3: protection, carry-over and fates) and migrate between versions (§7.5);
the generator repairs around them locally (§7.3's operators, F-REDERIVE); the preference and override layer sits above
the defaults (§7.6). The entity registry (§2.8) declares each type's edit kinds with their undo path and lifecycle row;
its completeness test is §13.2's (§2.8).

| element | edit events |
|---|---|
| terrain | `setField(terrain)` with `water: 'locked'` or `'follow'`, `drawWater` (hollows and lakes), `setAttr` on site features |
| water, coast, rivers | `drawWater`, `moveVertex` on shores and coasts, `moveCourseKnot` on a river's control knots, `setAttr` (bank class), `delete` |
| ways, junctions, bridges | `drawWay` (class `bridge` for a new crossing), `moveVertex`, `warp`, `split`, `merge`, `delete`, `setAttr` (class, width, surface, name; a bridge's kind) |
| districts | `drawBoundary`, `merge`, `split`, `setAttr` (kind, character, name), `regenerate`, `adjust`; `setAttr(fabric)` + `regenerate` is a stage-2 template replacement |
| blocks, plots | `split`, `join`, `merge`, `fill`, `setAttr` (use, owner), `regenerate`, `lock`, `assign` |
| buildings | `drawFootprint`, `build`, `moveFootprint`, `swapUse`, `paint`, `setAttr` (class, heights, roof), `delete`, `convert` (demolish, abandon, decay, ruin, clear, rebuild), `assign` |
| walls, gates, towers | `drawWall`, `moveVertex`, `setAttr`, `delete`, `convert` (wallToWay, gateToJunction) |
| greenery, trees | `drawGreen`, tree brush, `instance`, `setAttr`, `delete` |
| fields | `setField` (prosperity, density, greenery); `setAttr` on the town's `FieldBands` (an explicit re-banding) |
| names, labels | `setAttr` (text), `moveLabel`, `hideLabel`, `rerollLayer(naming)` town-wide or on chosen entities (`ids`) |
| layers, style | `setLayer`, `setStyle`, `paintGround`; view keys are not logged (§2.9) |
| people, households | `setAttr`, `setAttrMany`, `lock` with paths, `regenerate` (person scope), `pin` |
| close-ups (stage 2) | every kind above on close-up entities, after `closeup`; `instance` for presentation edits |
| rule tables, presets | `editTable`, `editPreset` (row operations, §7.6) |
| history | `epoch`, `convert`, `rebase`, `upgrade`, `undo`, `redo` |

**Dry-run validation (G-R10).** Every event is validated before commit on the scratch overlay: the schema, the
batch-local and stage-end invariants of its scope (§5.3), and the edit-fate report of its effective scope with its
case-(4) renames (§7.3 item 4) — for a chained operator (§7.3 item 3) the whole chain runs on the overlay, so the report
lists every re-sited bridge, re-routed or cut way and re-based building before anything commits; for an `undo` or
`redo`, the independence check of §7.4. Conflicts come back as actions (§5.2 F-EDIT), never silently resolved; a warp
that would break an invariant is halved and reported. An `E_KEPT` conflict (the edit would cross or clear finer content
an earlier stage made, or content outside a coarse edit's clear region, §3.3) is offered with one resolution: start the
re-derivation at the stage that made that content (for a wall's band parts or a margin band's part, S10's step (0) for
the wall strips of the touched run or for the scope's side of the touched stretch, §4.7, §7.3 item 2). A host's bridge
commands map onto these events (§11.3).

=== REPLACE ### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes ===
### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes

* **Protection.** A **locked** entity — or the locked attribute paths of one — is a fixed input: regeneration never
  changes it and re-derives its dependants around it. A **pinned** entity keeps its existence and position; its other
  attributes may re-derive. An **edited** attribute implicitly pins that attribute and the entity's existence against
  Regenerate and New random (IMPROVEMENTS O9's "locked and edited entities are never mutated") unless the user chooses
  **discard edits in scope**, which is only possible by confirming the fate list (§7.3 item 4) and is recorded in the
  event. An **assigned** attribute is held at its assignment within the drift bounds (§7.7). Every finer face under a
  locked or pinned entity is a fixed input too, and under a `warp` or smoothing step the kernel holds its route vertices
  as §3.6 states, so "keeps its position" holds for plots, blocks and buildings, which carry no vertex roles; the dry run
  lists the held entities. When protections and inputs meet, §7.7's precedence order decides.
* **Drawn constraints** (G-P8) — ways, water, walls, greens, district boundaries, footprints — enter the plat through
  `insertChain` as mandatory chains with their roles (§3.6), after the resampling of §7.1; they are locked by default
  and apply **at their log position**: the feature is inserted into the current state and, for the coarsest faces its
  chain touches, its class's local operator (§7.3) re-derives the affected scope — drawn water through S1's water
  operator (which re-sites the crossings on the reaches it moves and re-routes the ways that used them), drawn ways
  through S4's and S5's (arterials re-route to reuse them), drawn walls through S7's run re-trace, drawn boundaries
  through S6's regrouping, drawn greens through S12 on the covered faces, drawn footprints through S11 on the host plot.
  The session and a replay run the same code at the same log position, in the same canonical insertion order, so they
  produce the same digest (§6.5). The old rule "insert before the stage that would create the class" survives only as
  the explicit action **Rebuild around my drawings**: it moves the drawn constraints into the recipe as constraints of
  their stages, regenerates the town, shows the diff as a migration does (§7.5), and commits as a `rebase` (reason
  `drawnConstraintsRebuilt`) (J-DET-6).
* **Field brushes** (the field model is §4.5). A stroke is a relative Δ over the driver field (`FieldStroke`, §7.1).
  The field is the driver field plus the stroke list composited in log order and **clamped once at the end**, so undo
  removes a stroke from the list and re-composites — exact, where a per-stroke clamp is not (+0.3 then −0.3 on 0.9
  would give 0.7). A stroke re-derives every block whose plot samples moved — against the samples their
  `DerivationRecord` holds (§2.8) — by more than τ = 0.01 of the field's range, with the same τ on replay. Bands move
  only as §4.5 states, so a stroke in one quarter never re-bands another; an epoch keeps the stroke list and
  re-composites it over its new drivers.
* **The terrain brush** edits the heightfield raster under S1's terrain operator (§7.3 (a)), with the same stroke list
  and single clamp (to the declared relief limit, §2.3). Its `water` mode decides what the ground may do to water:
  * **`locked`** (the default): the stroke is masked — its Δ is zero — on every cell whose centre lies in a water face
    or within one cell of a shore or bank edge, and under the footprints, bands and decks of locked or pinned entities;
    land cells near the sea keep §4.2 S1 (2)'s floor, so a lowering stroke cannot sink the coast. Water bodies, their
    courses and their widths do not change; the dry run shows the masked cells.
  * **`follow`**: the stroke may change bed and bank cells too; every reach whose bed cells changed is then re-traced by
    S1's water operator (§7.3 (b)), which re-sites its crossings and re-routes the ways that used them — the edit the
    user means by "raise a hill across the river and let it find a new course".

  In both modes S1's terrain operator re-bases every building, wing, tower, gate, wall vertex, bridge and pier whose
  terrain samples changed, re-runs drainage locally, and re-evaluates the field drivers that read terrain, so the town
  stands on the new ground exactly as a reload would compute it (J-DET-24).

=== REPLACE ### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3) ===
### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)

1. **Effective scope.** `regenerate(scope)` finds the coarsest faces covering the scope at the scope's level; that set
   — possibly larger than the drawn area — is the **effective scope**, shown before commit and stored in the event as
   the resolved `EditScope`. For an edit that chains local operators (item 3) it is the union of every chained
   operator's scope. **The seam exception** (NF-P6): a district-scoped re-derivation's effective scope also includes its
   bounding ways' chains and `Corridor` records, the half-corridor strips on both sides and the junction wedges at the
   vertices its batches insert or remove on those spines — on a neighbour's side only II.1 (3)'s neighbour step, one
   `corridor_split` edge and the one kerb vertex it lands on (promoted) or adds —, the neighbouring cells, plots and
   footprints whose rings pass through those vertices and the wing rings of the buildings on them (§2.6), all changed
   only by those vertices — a promoted vertex returns to its level when the lane goes (§2.2 rule 3) — and the `Seam`
   records it is party to (§4.6, II.4).
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
| S1 terrain (terrain brush in either water mode, site features) | (a) below: masked stroke, local drainage, terrain-reading field drivers, exact re-basing of what stands on the changed ground, slope re-sampling; in `follow` mode, (b) for every reach whose bed changed | all water in `locked` mode; the heightfield outside the stroke; every way's geometry | in `follow` mode, Re-derive from S1 when a course leaves its drainage basin or F-RIVER needs its inlet or centre rung (§5.2) |
| S1 water (`drawWater`, a moved shore or coast vertex, `moveCourseKnot`, a `warp` from level 0, the terrain brush in `follow` mode) | (b) below, in §4.11's order: new water, crossings, routes, wall runs and the chain's footprint as data; one L1 batch that clears the footprint's partition content, re-lays the kept ways through their decks, re-traces the crossed wall runs and cuts the lesser ways; one L0 batch inserting the water through the vertices that batch prepared, both declaring the footprint as clear region; then S5, S6, S7, tree scoping and F-REDERIVE | reaches and coasts outside the edit; every way, wall and district not named in (b); every finer face outside the footprint, less the seam exception at its boundary | Re-derive from S1 when the course leaves its drainage basin or F-RIVER needs its inlet or centre rung (§5.2) |
| S4 (`drawWay` of an arterial, a moved arterial vertex, a moved destination, the castle placed or resized, a deck re-sited or removed by S1's water operator) | re-route only the arterials whose corridors meet the edit region or whose destination or deck moved, each between its nearest pinned nodes (junctions of degree ≥ 3 or destination nodes) on either side of the region, over S3's lattice, every deck a fixed graph edge | their endpoints; every spine outside the region | a gate-count change (a destination added or removed) re-derives from the stage that picks those gates: S3 for stage 1 (§4.2 S3 (7)), S5 of its stage for a later enceinte (§4.4) |
| S5 (`drawWay` of a secondary, a deleted street, a secondary now crossing water off a deck) | regrow only inside the affected L1 cells, from the proposals whose origins lie there, under S5c's legality (water only on a deck) | the cells' boundary spines | — |
| S6 (`drawBoundary`, district merge or split, `outskirtToDistrict`, land vacated or covered by a moved channel) | regroup and re-type only the districts touching the region, the grower restricted to their cells; then **re-lay the margin bands**: along every L1 edge without corridors whose sharing changed (a moved stretch of the settlement perimeter, a reservation boundary two districts now share) S10's step (0) lays the 2 m band on both sides, and where a merge or conversion ends the sharing it removes both parts; the blocks fronting such a stretch on either side (a neighbour's or the hinterland's included) re-derive from S10 and join the effective scope shown in the dry run | every other district, and every block fronting no changed stretch | — |
| S7 (`drawWall`, a moved trace vertex, `wallToWay`, `gateToJunction`, a river whose course crosses an enceinte moved) | re-trace only the run between the nearest unaffected towers on each side, with water gates where the course now crosses; re-cut the strips' setback and glacis lines along it; re-derive the strip blocks' S10 step (0) | the rest of the trace, its gates and its strips | Re-derive from S7 when the enceinte kind changes |
| a carve (a canal, moat or basin drawn by an edit; §4.11) | §4.11's way rule (pinned decks for arterials and sole connections, cuts for the rest) and footprint, in its declared batch order, the channel inserted with the footprint as its clear region (§3.3) | every way and finer face outside the carve's footprint (§4.11: the channel ⊕ (`attractCm` + bank setback) united with every L1 cell that buffer, the way rule and the wall re-trace touch — the rules (b)'s footprint follows), less the seam exception | if the clear region cannot be kept, §3.3's pre-decided fallback: a declared town-wide re-derivation with the fate report |
| S8–S11 | per cell, block and plot (tree scope, item 2; wall-strip blocks and the scope's side of every shared margin band from S10's step (0)) | the other side of every shared edge | — |
| S12 | the covered hinterland faces and greenery entities; the hinterland unit re-lays its headland parts along the perimeter by step (0) first (item 2) | the districts' side of the perimeter | — |

   **(a) S1's terrain operator**, in order:
   1. *Stroke:* the stroke list is composited on the heightfield and clamped once (§7.2), with `locked` mode's mask.
   2. *Drainage, locally:* priority-flood filling and flat resolution (§2.3) on the stroke's bounding box dilated by 8
      cells, ring cells' levels fixed as spill heights; the box doubles until no ring cell's filled level changes (at
      worst the whole hydrology grid, S1's own cost, §12.4). Filled levels go into the drainage arrays (`flowDir`,
      `flatRank`, `flowAccum`) only, never into the stored heights, so a brushed hollow stays a hollow and drains to its
      spill point; accumulation is re-propagated downstream along D8 from the box. A new hollow deeper than the lake
      threshold is reported ("a hollow: draw water to make it a pond or a lake"), never turned into water. *Test
      (B-EDIT terrain fixtures):* the arrays equal a whole-grid re-run's on the same heights. *Pre-decided fallback:*
      re-run drainage over the whole hydrology grid (frame and margin; ≈ 16–17 ms at CITY, §2.3, §12.4) —
      output-neutral, the whole-grid run being the reference.
   3. *Fields:* the terrain-reading drivers (elevation above the flood line, low and damp ground, §4.5) are
      re-evaluated on the dilated box, and blocks whose plot samples moved beyond τ re-derive as for a field brush
      (§7.2) — what a reload computes from the drivers and the stroke list (§2.9).
   4. *Re-basing, exact:* every entity on a changed sample is re-based by §2.6's per-entity datum step (the function S11
      and S7 call): a wing's `baseCm = max(samples) + plinthCm` with its foundation skirt; a row footprint whose fall now exceeds `skirtMaxCm`
      re-split into stepped wings (F-SITEPLAN's first rung; footprint face and address unchanged); towers and gates from
      the samples under their footprints; the wall's `base` profile — each knot whose sample changed takes the new
      value, and a trace vertex whose sample changed and carries no knot gains one (§2.2 rule 5); a bridge's `deckCm`
      and a pier's deck height from their bank elevations plus the clearance row. A user-edited `baseCm` is kept (fate
      *kept*, listed) (J-DET-24).
   5. *Slopes:* every way whose spine crosses changed cells re-samples `slopeP95`; a way now steeper than its class's
      limit is reported with an offer to re-route it (a `regenerate` on that way through S4's or S5's operator), never
      re-routed silently.
   6. *Water:* in `follow` mode, (b) runs for every reach whose bed cells changed.

   **(b) S1's water operator** runs in §4.11's carve order — prepare the finer structure the new water will meet,
   insert the water, re-grow what it displaced — because a coarse insertion may meet finer geometry only at vertices an
   earlier batch of the same edit placed (§3.3). Both geometry batches declare the chain's footprint as their clear
   region under §3.3's clearing and preparation rules, as the carve's batches (1)–(2) do.
   1. *New water, as data* (nothing committed). By trigger: **`moveCourseKnot`** — the course between the moved knot's
      neighbours is recomputed through the knots by S1's control-polyline construction (§4.2 S1 (3)) with the moved knot
      fixed (an edited knot is implicitly pinned, §7.2, so every later re-trace keeps it), width and depth from
      accumulation, shores = the course buffered by its width; a carve beyond `carveMaxCm` returns F-EDIT with the
      nearest position along the drag within it. **A `follow` terrain stroke** — each reach whose bed cells changed is
      re-traced by descent from the nearest pinned upstream point to where the new course first meets the old (or its
      outfall), F-RIVER's re-trace rungs confined to the reach; its knots are re-sampled at the control spacing with
      fresh ordinals, except an edited knot, which the new course must pass within half a control spacing of — else
      F-EDIT, offering to discard that edit. **`drawWater`** — the drawn rings (add unioned, subtract removed; a `line`
      buffered by its width), a drawn river's or canal's course being its line. **A moved shore or coast vertex, or a
      level-0 `warp`** — the shores as the move leaves them (the stroke's field applied to the reach's L0 shore and coast
      vertices; the rest of the brush moves the land at level 1 by §3.6's warp first), the course recomputed as their
      centreline and the knots re-sampled from it; nothing is re-traced, the user's shore being authoritative (§2.3).
      The **changed reach** is where the new shores differ from the old; an edited coast stretch has its sea side
      re-lowered and its contours clipped (F-CONTOUR); new shore segments take bank class and kind by §4.2 S1 (7).
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
   3. *One L1 batch — structure first.* It declares the footprint as `KernelTx.clearRegion` and clears it by §3.3 rule 1,
      structural finer edges only as it re-lays or cuts them. It inserts each kept way's new route and removes the replaced stretch — every way stays one connected
      chain (§3.10) — placing at the new bank points the two `deck_end` vertices of each deck it crosses, under a fresh
      `Bridge` (§6.3's matching hands it the old address when (4) removes the old span), the edge between them carrying
      `deck` beside `way` (the L0 batch adds none). It replaces each crossed wall run by its re-traced run, the water
      gate's two bank vertices carrying `('gate_end', gate, 0 | 1)` under a fresh `Gate` (§2.2 rule 7) whose record (7)
      builds, and removes the old run with the stretches of its strips' setback, glacis and intervallum lines alongside,
      each through its `StretchRef` (§2.2 rule 5), ends placed by `splitThrough` at the feet of the perpendiculars from
      the run's end towers (the new lines are cut in (7)). By F-REDERIVE's way rung (§5.2) it cuts every other way the
      new channel ⊕ bank setback meets, and every way but a kept way at a gate that the new strips will meet, the part
      not keeping the old anchor handed to a new way first by `retypeEdges`' `rekey` on its `StretchRef` (§3.4). It
      splits every other L1 edge the new banks will cross that is no way — a settlement-perimeter or district-boundary
      stretch, a setback or glacis line outside a re-traced run — at its two bank points, each carrying an `anchor`
      contact name (§2.2 rule 7), removing the stretch between; and it prepares the map's `border` line at its two bank
      points without cutting it (§3.3 rule 2). What the chain may not move — a locked or pinned way, wall or finer entity
      in the new channel ⊕ setback or in a new strip, or a reservation there — returns to the dry run as F-EDIT
      (Re-derive from S3 offered for a reservation).
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
      S4's or an edit's added deck on standing water, or an edit's new site) they keep L0, with no L0 edge at them, until
      (9) removes the rows (§2.2 rule 3) — so the L0 view stays land and water only. The new shores split the finer faces
      they cross, which keep their owners until (6)–(8) re-own them (§3.3 rule 3); the batch meets no finer edge but the
      prepared vertices, because (3) cleared the footprint's partition faces and re-laid or cut every structural edge the
      new water ⊕ `attractCm` reaches. The old decks' and sites' bank vertices on the changed reach leave with their
      shores (their spans having left with the replaced stretches in (3)), except the deck of a way the new water no
      longer meets. Tree scoping (8) and F-REDERIVE (9) act only inside the footprint, and item 7 (ii) checks byte
      identity outside it less the seam exception.
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
   8. *Tree scoping:* S8–S12b re-derive every cell of the footprint, vacated land included, by item 2 — shared-edge
      parts too (the strips (3) and (7) changed re-run step (0), declared for NF-P5, §5.3) — with succession by anchor
      and fresh addresses for new faces (§6.3); the height samples the edit changed run (a) 2–4 on what stands outside
      the footprint.
   9. *F-REDERIVE* (§5.2) removes every deck and site the edit left over land and lists every re-route, cut, pruned
      stub, succession and demolition of the chain in the fate report with its lifecycle event.

   The deck invariant (§5.3) is evaluated once after (9), over the chain's touched faces; the kernel's invariants hold
   at every batch (J-DET-23).
4. **Edit fates.** The dry run lists every protected entity in the effective scope — locked, pinned, edited or assigned;
   hosting a pin; the target of a pinned label placement; housing a pinned or edited person; an edited close-up entity
   — with its fate: **kept** (a fixed input); **carried** (to its anchor-matched successor, §6.3, after the class-family
   check — an override moves with the address only if the successor's class family accepts the attribute, never by id
   alone); **orphaned** (no successor: the edit stays in the log, is listed in the document's orphan table and can be
   re-attached); or **discarded** (only with "discard edits in scope", recorded as supersede events). A chained edit's
   report also lists its unprotected consequences — bridges re-sited or removed, ways re-routed, cut or pruned,
   buildings re-based or demolished — with their lifecycle events, and every edit's report lists the names it re-draws by
   §6.3's case (4), old and new text side by side. The user sees counts and the list and confirms every fate other than
   kept and every rename; an action whose dry run lists a rename returns `confirm` even when its scope holds no protected
   entity (§11.2). The confirmed fates and renames are stored in the event (`EditBase.renames`, §7.1). **A replay, or a
   receiving client, compares an event's stored fates and renames with those it computes only when it folds the event
   under the output version that confirmed them** — the `from` of the first live `upgrade` after the event, else the
   document's own output version — and reports a mismatch when they differ. Folded under a later version, the
   recomputed values are the ones applied: the upgrade names those events once in its diff
   (`MigrationMap.changedConfirmations`, §7.5), and no later load re-reports them; the upgrade's undo, replaying under
   `from`, compares them again.
5. **Recorded inputs.** Regenerate (keep settings) re-derives the kinds that persist a derivation record (§2.8) —
   plots, blocks and buildings — with their *recorded* inputs, so it reproduces an untouched entity byte-identically even
   after an epoch or a field edit elsewhere moved the current inputs; re-deriving with the current inputs is Adjust.
   Kinds without a derivation record (ways, districts, walls) re-derive from their current upstream state, which only an
   explicit edit or an epoch changes; the provenance rebuilt by their last derivation or by the verification replay holds
   what they read (§2.8). Every generated name keeps its naming record (§2.8).
6. **The dependency graph is the audit.** `Provenance.deps` (every entity records what it read) serves (a) as the audit
   of item 7 and (b) as an optimisation for Adjust — invalidating exactly the closure of a changed parameter or table
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
   oracle **computes** the seam exception (item 1) from the batches' commit records (changed faces per level, portal
   roles added or removed) and checks each excepted neighbour cell, plot, footprint and wing ring (a stored
   composition's rings included, §2.6) equal to its prior ring after removing those vertices, and, for an edit that
   stores a stage-3 composition, each face §2.6's composition rule (1) adds to its scope equal to its prior ring after
   removing the vertices that rule inserted, with the `composition` role rows it adds present;
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
   carries one (item 3's S6 row).

=== REPLACE ### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8 ===
### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8

**Replay semantics.** The log is an **ordered fold**: each event applies to the state its predecessors produced,
through the same code path interactively and on replay; nothing is hoisted, and epochs, rebases, upgrades, undo and redo
are events like any other. In the table, "case (4)" means the event runs §6.3's case (4) for the name it frees or whose
inputs it changes, the rename listed, confirmed and stored in the event (§7.3 item 4).

| kind | create | read | persist | regenerate (how the engine honours it) | undo | migrate between output versions |
|---|---|---|---|---|---|---|
| lock / unlock / pin / unpin | UI or API on any address, optionally on attribute paths | entity `flags` (derived from the log) | log | a fixed input; dependants re-derive around it; a lock on a name path keeps the naming record dormant (§2.8); an `unlock` that frees the name runs case (4) | inverse event; undoing a `lock` that frees a name runs case (4); an unlock that re-drew a name keeps the former name and naming record in its undo record, which its undo restores | address mapped (§7.5); an orphaned lock re-imposes its last geometry as a drawn constraint unless the user drops it |
| setAttr / setAttrMany / paint | UI / API; a bulk query resolved to ids at dry run | entity attributes; `flags.edited`, `editedPaths` | log | an input override at the stage that computes the attribute (a name: S13a keeps it and never re-draws it while edited, its naming record dormant; a district kind: S6 reads it as fixed; heights and roof: S11); implicitly pinned (§7.2) | inverse (old values in the undo record); undoing or reverting a `setAttr` on a generated name returns it to unedited with its dormant naming record and runs case (4), the text it replaces kept in that event's undo record | attribute names schema-versioned with a rename table; unmappable → orphan, reported |
| moveVertex / warp | vertex handle, stored as lattice point + role signature / staged warp session with Apply (§7.1) | geometry | log: the operation (arena key, strokes, `fromLevel`; a `moveVertex`'s `at` with its `VertexSig`); per-vertex displacements only as a verification record | the kernel's whole-step validation, halving, sliding and holding (§3.6); kernel-pinned vertices move (pins constrain smoothing, simplification and cutting); what stands on the ground is carried and re-based (below); moved water goes to S1's water operator (§7.3 (b)) | undo record: moved vertices, re-derived faces, the former birth levels and flags of promoted and demoted vertices and edges, the former points of displaced records, former wing rings and stored compositions, former bases of re-based entities | the operation replays at its log position; a `moveVertex` binds by `resolveVertexAt` — the exact point, else a signature match within the rebind radius, else orphaned and reported |
| moveCourseKnot | dragging a river's control knot | `WaterBody.controls` (§2.3); the knot's path `controls/<ordinal>` in `editedPaths` (implicitly pinned, §7.2) | log: the water body's address, the knot's ordinal, `at`, `to` | S1's water operator (§7.3 (b)); every later re-trace keeps the moved knot | undo record: the replaced scope of the whole chain and the knot's former position | once the water body's address is carried (§6.3), binds (1) the knot with that ordinal if within the rebind radius of `at` — half the body's control spacing (§4.2 S1 (3)); (2) else the body's nearest knot within the radius, ties by ordinal; (3) else orphaned and reported; never a knot of another body |
| drawWay / drawWater / drawWall / drawGreen / drawBoundary | drawing tools with resampling, snapping (first-crossing split, attraction) and validation at the authoring boundary (§7.1) | entities with `existence = built`, author `user` | log (the geometry is the payload) | at its log position through its class's local operator (§7.2, §7.3), chained operators included | undo record: the replaced scope of the whole chain | the same geometry replays at its log position under the new version |
| drawFootprint / build / moveFootprint / swapUse / fill | building tools (§7.1) | building and plot entities | log | S11 re-fits the host plot(s) with the footprint as a fixed slot; `fill` re-runs S11 on its scope with the forced arrangement | undo record | replays; a footprint whose host plot is unmapped re-creates a plot around it |
| delete / merge / split / join / convert (incl. abandon, decay, ruin, clear, rebuild) | context actions | lifecycle events with cause | log | structural ops on the plat (§3.4) with dependants re-derived; `convert` = `retypeEdges` plus lifecycle events; decline conversions change `existence` and the drawing (§2.8); a split or join of a chain carrying a profile (a way's width, a wall's base, a tunnel's invert, a shore's bank kind or class) goes through `retypeEdges`' `rekey` on the part's `StretchRef` (§3.4) — each part gets a cut knot carrying the sampled value, a join knot is dropped only where the joined profile is unchanged (§2.2 rule 5) — and the event writes both records' returned profiles | undo record: members resurrect, tombstones return to live, both records' former profiles | same |
| regenerate / adjust / re-derive from Sk | the named actions on an area, district, block, plot or person | report entry; the fate list | log: resolved scope, mode, absolute rerolls used, confirmed fates and renames | §7.3; New random's content check (§5.1 (6)); a pack-list `adjust` and any re-derivation reaching S13a run case (4) for the unedited names citing a changed slice | undo record: the effective scope's faces, entities (names and naming records included), lifecycle events and tombstones, O(scope) — an undo restores the former names, never re-draws them | the scope replays; fates and renames recomputed and compared under §7.3 item 4's rule |
| assign / unassign | assignment dialog / host API | `assignment` fields, `flags.assigned` | log; blueprint assignments at positions 0…k | the claims-first re-derivation of its scope (§7.7); an assigned name keeps the naming record dormant; an `unassign` that frees it runs case (4) | undo record | addresses and criteria; unmapped members re-solve around the mapped ones (§7.7) |
| setField (brush) | prosperity / density / greenery / terrain brush; the terrain brush's `water` mode (§7.2) | the stroke list; the composited field or heightfield | log (strokes) | field strokes: blocks whose inputs moved beyond τ re-derive (§7.2); terrain strokes: S1's terrain operator (§7.3 (a)), in `follow` mode with the water operator | the stroke leaves the list; the field or heightfield re-composites (exact) and the operator re-runs on the stroke's region | strokes are geometry and replay |
| editTable / editPreset | tables editor, presets dialog | the override layer (§7.6) | log: row operations by key with the base row's hash; the fallback's confirmed fates; renames | entities whose derivation record, naming record or provenance cites a changed slice hash re-derive; a changed naming slice runs case (4) for exactly the unedited names citing it; a predicate table, or a kind whose recorded slices are unavailable, re-derives from the table's first reader stage with fates (§7.6) | inverse row operations; the re-derived entities — renamed names with their former naming records among them — restored from the undo record, never re-drawn | a row that changed or vanished in the new table version → orphan, reported and kept |
| instance (and the tree brush) | tree tools (a batch of `instance` events), instance handles | the entity's instance set with its overrides | log | applied by ordinal while the entity's lineage is unchanged since the event (no `carry` or supersession after its `seq`) and the ordinal's generated position lies within 0.5 × the spacing of the recorded `point`; otherwise re-matched by position to the nearest unclaimed instance within 0.5 × the spacing (a superseded entity's overrides move to its `supersededBy` successor), else orphaned and reported (§8.10) | inverse | ordinals are geometry-stable only under the same lineage; otherwise re-match by position |
| rerollLayer | "reroll names / trees / decoration / compass / emblem" — §6.1's rerollable concerns; names also on chosen entities (`ids`) | the effective salt: the recipe's initial value set by the log's town-wide `rerollLayer` events; for an ids-scoped naming reroll, the per-entity salts in the event | log: absolute salts (with `ids`, those used after §6.3's case (3) advance) | naming: S13a re-draws every unedited name (town-wide) or the listed entities' unedited names, uniqueness by §9.6; instances, crowns, jitter: display only; compass and emblem: furniture only (§9.5) | the previous salt; for naming, the previous names and naming records from the undo record | replays |
| revert (reset to generated) | ctrl / cmd+click, context action | the entity's own logged edits | log (one event) | the inverses of the entity's own events applied in reverse log order at the revert's position; edits to other entities stay; a name it frees runs case (4) | inverse: re-applies them | follows the entity's address; an event whose target no longer maps is reported |
| moveLabel / hideLabel | label handles; the dry run refuses a placement whose box at its stop meets another pinned label's box there, returning the nearest free position (§9.2) | `LabelEntity.pinned` / `hidden` — model data, in the digest (§6.2) | log | honoured by S13b (§9); the `LabelEntity` exists at the event's log position in session and replay, S13a running per event (§7.3 item 2) | inverse | follows the target address; unmapped → orphan |
| setLayer / setStyle / paintGround | UI, style dialog | style state (canonical, outside the model digest) | log | no model re-derivation; the display list rebuilds | inverse | style schema versioned |
| people: pin, setAttr, lock with paths, regenerate a person | an explicit action or edit only — never viewing | the pinned or edited fields; everyone else is derived | log | pinned and edited people are fixed inputs, re-homed to the household that inherits their household's address (§6.3), else orphans reported (§10.3) | undo record | person-table version recorded per household; person keys map through the household's address; orphans reported |
| closeup (stage 2) | logged before the first edit inside a close-up | the close-up's entities, a refinement level of the district | log (strategy, params) and the edits after it | a pure function of the district's committed state, sub-seed, strategy and params; a base re-derivation of the district re-derives its close-up with carry-over, re-matches presentation `instance` edits by position and reports orphans | undo record | replays |
| epoch | `grow(doc, inputs)` (§4.11) or a circumstance-schedule entry | the derived `EpochRecord`; lifecycle events with cause | log | §4.11's incremental path at its log position | undo record: the faces and entities it replaced (O(epoch scope)) | a multi-epoch document upgrades by replaying the whole ordered log with a per-epoch diff, or stays pinned to its output version |
| rebase | keeping the saved town on a mismatch; Rebuild around my drawings; editing a frozen import — a `frozenImport` rebase, which runs case (4) over every unedited generated name and returns `confirm` with the renames listed (keeping the old model at an upgrade needs none: the document stays at its own output version, §7.5) | the document's base | the base state and the event: `version` names the output version that computed `stateDigest`, `at` the log head the state materialises (`h₀` when the saved town is kept after edits made during load verification, §2.9 step 4); the events before `at` stay in the log (§2.9) | replay starts from the rebased state, checked against its root of record for the replay's output version (§2.9 step 3), and folds the events after `at`; on other clients see *Rebases on other clients* below | the previous base (below) | the rebased state migrates by the schema chain; an `upgrade` checks it under `from` against its root of record and records its root under `to` as `baseDigest` (§7.5); it is not seed-reproducible |
| upgrade | explicit, after the diff (§7.5) | the document's output version | log, with `baseDigest` for a rebased base and the saved packs in its mapping | §7.5: a rebased base checked under `from` and re-rooted under `to`; every pack `to` stops shipping copied into `packs` first; the mapping hands names on with addresses and runs case (4) for the unedited names whose naming slices the new tables changed, listed in the diff; earlier events' fates and renames are recomputed under `to` and their differences listed once in the diff (§7.3 item 4) | the undo record is `upgrade.from`: undo replays base and log before the upgrade under that version — a rebased base checked against its root of record for `from` — to exactly the pre-upgrade digest; in the session the pre-upgrade checkpoint makes it instant; outside the browser's version window the undo is withdrawn there with the CLI command shown | — |
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
  bridge takes the session the host assigns in `doc.load` (§11.3) and never writes the view key. The session enters the
  log only as `EditBase.session`; the fold never reads it (an `undo` names its target by `of`), so sessions decide which
  event the undo key picks, never the model (J-DET-34).
* **Targets.** Each session has its own stacks. `undo` targets the session's latest **live** event — live unless an
  `undo` targets it and no later `redo` re-applies it; a `group` counts as one step and `of` names its first event.
  `redo` targets the session's latest undo whose target is still undone; a new event from the session clears its redo
  stack. An unshared document has one stored session, so its undo is linear and continues across reloads. A session
  with the `owner` role — the app's role for an unshared document — may name any live event (`undo(h, of)`, §11.2),
  which is how an earlier session's events (a file once shared) are undone.
* **Application.** Every committed event keeps an **undo record**: the inverse event when one is exact; otherwise the
  faces, entity records, lifecycle events and tombstones its effective scope replaced, the former birth levels, `split`
  flags and stripped contact names of the vertices it promoted, and the former levels and flags of the vertices and
  edges it demoted or unflagged (§2.2 rule 3; `CommitRecord.promoted`, `demoted`, `unflagged`); and always the addresses
  it created, changed or removed — its **touched set** — so undo costs O(scope), never a copy of the model. `undo`
  restores the target's scope from that record and withdraws the addresses the target minted (§6.3); `redo` re-applies
  the target at the head from its stored, already-resolved payload (scope, absolute rerolls, confirmed fates), so from
  the restored state it reproduces the target's result exactly.
* **Independence** (the check that keeps undo exact when others have edited since). An undo is applied only if every
  live event after its target is independent of it: the later event's touched set and effective-scope faces are
  disjoint from the target's touched set and from the target's effective-scope faces dilated by one ring of adjacent
  faces at the coarsest level either touches. Otherwise the dry run returns an F-EDIT conflict listing the dependent
  events and their authors; the session may undo its own dependent events first (each its own `undo`), and an owner may
  undo through a chain. A `redo` is checked the same way against the live events after its undo. Every client folds the
  same events in the host's order on the same state, so the check has the same outcome everywhere; an `undo` or `redo`
  whose check fails at its log position (possible only in a hand-built log) is a reported no-op, identically on every
  client and on replay. A whole-town event (an upgrade, a rebase, a Re-derive from S1) is therefore undoable only while
  it is the latest live event.
* **Records on other clients and after a reload.** Records are kept for the session and saved in the file's `undo`
  section (the last 64 events or 20 MB, whichever is smaller; rebase and upgrade records as their rows state), so undo
  survives a reload. A client with no record for a target — it joined later, or the record left the cap — rebuilds it by
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
  district regeneration ≤ 30 ms; undo memory ≤ 25 % of the model's working set after 100 edits; (M3a) the
  host-and-three-clients convergence test of §11.3 with interleaved undo and redo from every client. *Pre-decided
  fallback:* the saved undo section shrinks to 16 events and checkpoints are taken every 40 ms of replay cost.
* The **enumeration test** checks that every EditEvent kind — `undo` and `redo` included — has an exact inverse or an
  undo record (O9 d). Save → load → save is byte-identical over the canonical form (O9 a).

**Warp and what stands on the ground.** A warp and a `moveVertex` move arena vertices (§3.6). Four kinds of record
hold a world point instead of a vertex and move with the ground they stand on: `Pin.point` (host: `Pin.host`'s
faces), `Decoration.point` (the L3 face containing it), the current position of a positional `instance` override — a
`move`'s `to`, an `add`'s `point`, and for a `line` layout the recorded generated `point` — held in the model's
override table of its entity (§8.10), and a pinned label's `Placement` anchor and spine (its target's faces, or its
target's corridor for a way, §9.1). After the kernel's commit the edit layer takes every such record whose host face
has a moved vertex (the commit record's `moved` list, §3.3) and computes its new point from the move itself: the
point's mean-value coordinates in its host face's outer ring before the move, applied to the ring after it (`+ − × ÷`
and `sqrt` only, §6.5), rounded to the lattice. A record whose new point lies outside its host face, or nearer its
boundary than its clearance (a pin's footprint radius, `Decoration.keepClearCm`, half an instance spacing, a label's
box), is **re-seated** at the nearest lattice point of the host face inset by that clearance, ties by (y, x); if the
inset is empty, a generated pin or decoration is re-placed by its placement rule in its host (§4.7 S11, §4.9) and a
user's record — an override, a pinned label, a user-placed or edited pin — is orphaned and reported. A record of a
locked or pinned entity is held like a held vertex: the warp's whole-step validation requires it to stay inside its
host face at its clearance and halves the step otherwise (§3.6); the dry run lists it. **A building's stored wing
rings** — and a stored stage-3 composition's rings and tower centres — are carried with its footprint face in the same
pass by §2.6's wing-carrying rule, and the whole-step validation includes §2.6's check through `warp`'s `recordCheck`,
halving the step when it fails, as for a held pin (§3.6); for a stored composition the check also requires its composed
wings to unite to the moved face, its rooms to lie inside it and its tower centres inside or on it (§2.6). Every entity
whose footprint, trace, deck or pier the move carried is re-based by §2.6's datum step on the ground it now stands on
(§7.3 (a) 4), a user-edited base kept. The undo record keeps every former point, wing ring, stored composition and
base, and a replay recomputes the same points and rings by replaying the same operation on the same geometry. Stamp and
grid instances are world-anchored patterns and are not displaced (§8.10). The B-EDIT warp fixtures are §13.2's
(J-DET-31).

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

=== REPLACE ### 7.6 The override layer and editable tables (G-P12; owner amendment 5) ===
### 7.6 The override layer and editable tables (G-P12; owner amendment 5)

`effectiveParams = defaults(pinned table versions) ⊕ packs ⊕ preset ⊕ userGlobal ⊕ documentOverrides ⊕ log events`, each
layer a sparse delta with provenance; setting packs are recorded in the recipe, or in the `adjust` that adds them, by
id, version and content hash (§2.9); the UI shows which layer set a value and the report lists auto-resolved values
with reasons (O16 a–b).

* **Preferences are folded in at creation.** When a document is created, the packs, the preset, the user's global
  preferences and any document overrides are copied into the recipe's `params` delta, shown in the panel as "from your
  preferences". A later change to the machine's preferences never changes an existing document; applying them is the
  explicit action "apply my current preferences", logged as one `adjust` per changed parameter with its locality class.
* **Packs.** A pack's content is §10.4's; its place in the document's pack set, its retention in `packs` and a
  user-uploaded corpus as a pack are §2.9's. Adding or removing a pack in an existing document — selecting or
  deselecting a corpus included (§10.4) — is an `adjust` of the recipe's pack list (`param: 'packs'`): a Re-derive from
  the pack's first reader stage, with the fate report (§7.1). When the added or removed pack changes a naming slice — a grammar row, or
  the corpus a field of a culture or ancestry row names — S13a re-draws exactly the unedited names whose naming records
  cite a changed slice, listed for confirmation (§6.3 case (4)), and never the row's other names. A replay resolves every
  pack of the pack set by hash from the document first (§2.9), so it never depends on what is installed; a link is
  emitted only when every pack of the pack set is shipped, so never for a town whose history selects a user corpus
  (§6.4).
* **Tables have keyed rows.** Every rule table — size ladder, stage regimes, way widths, granularity, site plans, class
  rules and class families, heights, wall spacing, greenery, drivers, naming, style sheets, the dependency graph, S0's
  feature probabilities, the work-limit coefficients (§5.1 (5)) — is versioned JSON: a map from a stable row key to a
  row whose cells carry `{value, unit, provenance: {source, date, note}, calibratable}`. Each table's schema declares its
  **readers** (the stages that consult it) and its **slice kinds** (row, weights, bracket, thresholds, match — §2.8).
  **A naming slice of a culture or ancestry row is one field of it**: a `SliceRef` of kind `row` with key
  `<rowKey>/<field>`, hashed over that field's value and, for a corpus field, the named corpus's content hash, so a
  slice's hash changes when the corpus behind it changes; a naming draw cites only the fields it read, so a `set` on one
  corpus field — a user corpus pack's binding among them — changes exactly the names drawn from that field. Every other
  slice, of these rows and of every other table, stays a whole row, weight vector, bracket, threshold set or match set
  (§2.8) (J-DET-48).
* **Overrides are row operations, never positional patches.** An override records `{op, rowKey, field, value,
  baseRowHash}`; when a newer table version changes or removes that row, the override is reported as an **orphan** —
  kept, not applied — with the old base row, the new row and the user's value side by side; an `insert` whose key
  already exists is an orphan too.
* **Invalidation by slice.** A table edit changes the hashes of the slices it touches, and exactly the entities whose
  recorded slices cite a changed slice re-derive (audited by the oracle, §7.3 item 7). The recorded slices are read from
  the persisted `DerivationRecord.slices` for the kinds that persist one (plots, blocks, buildings, §2.8), from the
  persisted `NamingRecord.slices` for every generated name (§2.8) — so a naming-table edit re-draws exactly the unedited
  names that cite a changed slice, in a rebased document too — and from the provenance rebuilt by the last derivation or
  by the verification replay for every other kind. Where neither exists — a kind without a derivation record in a
  document rebased from a kept snapshot or a frozen import, whose provenance no replay can rebuild — and for a row
  inserted into a table read by predicate (a new class row that may now match entities that never consulted it, which
  changes the table's match slice), the fallback applies: **Re-derive from the table's first reader stage**, with the
  fate report, its confirmed fates stored in the `editTable` or `editPreset` event (§7.1).
* **Host tables** arrive as `editTable`, `editPreset` or `setStyle` events whose content is copied into the log with
  provenance `host` (source, date, version), so a document replays without its host (§11.4).
* **Users and us.** Users edit through the tables editor and presets dialog (the preference layer); we change the
  system through new table versions — a declared shift whenever output changes (§6.4). The corpus phase replaces values
  and updates provenance without code changes; the default path with no edits is byte-identical to the shipped defaults
  (O10 h).

=== REPLACE ### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook) ===
### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)

Three input layers above the parameter vector, all persisted in the recipe:

1. **Intent** (outcome targets): form archetype, size as population / area / buildings with a tolerance, water setting
   and coast side, gate count, wall rings, planned ↔ organic, wealth level and gradient direction, era and region
   preset, defence level, density. **Expansion** (intent → ≈ 200 internal parameters) is a pure function held in data:
   each intent field maps to internal parameters by `{param, fn: 'const'|'linear'|'smoothstep'|'table', args}` rows
   (tables interpolate linearly), evaluated in a fixed order. **Rows are continuous**: no rounding and no comparison
   inside a continuous control — a discrete outcome is a probability drawn per entity or a discrete control that
   declares itself (§7.8). Example — `wealthLevel ∈ [0, 1]` → `field.characterOffset = lerp(−0.3, +0.3)`,
   `granularity.joinMaxBonus = 2 · wealthLevel` (fractional: its fractional part is the probability that a candidate
   plot takes one more join, drawn from the `plot.join` stream), `greenery.parkPer1000 = lerp(0.1, 0.8)`; `planned ∈
   [0, 1]` → `growth.headingSigma = lerp(20, 5)` degrees per 100 m of street, `growth.crossroadProb = lerp(0.02,
   0.15)`, `avenues.probability = smoothstep(0.3, 0.7, planned)` per eligible tier-1 way. Every internal parameter is
   documented (unit, range, effect, provenance, consuming stage) and reachable in the advanced panel (O10 a); the
   registry test proves 100 %. **Surprise me** draws every intent field from its declared range and weights on the
   `intent.surprise` stream of a fresh seed and writes the drawn intent into the recipe, so the town's link reproduces
   it.
2. **Character and circumstances**: a district character vector (wealth, density, age, function mix, planned / organic,
   greenery, fortification, building scale) supplied automatically per district and overridable; circumstances (era,
   economy, lordship, government, biome, season, threat, trade, population, terrain events, the landscape toggles) as
   data presets on a **timeline** that *schedules* epoch events — an epoch happens only as an `epoch` event in the log
   (§7.1, hook 8).
3. **Constraints**: pins and **assignments**:

```ts
interface Assignment { id: Id; granularity: 'building'|'neighbourhood'|'dispersed'; target?: Id /* one building / plot or one district */;
  dispersed?: { count: number; kind: BuildingClass | string; criteria: PlacementCriteria };
  name?: string; function?: string; shapeClass?: BuildingClass; drift: DriftBounds /* ± area %, ± floors, allowed layouts and roof kinds, class family */;
  precedence: 'overClassRules'; placed?: Id[] /* the solver's placements, persisted with the event */ }
interface PlacementCriteria { districts?: Id[]; districtKinds?: DistrictKind[]; prosperityBands?: string[]; minSpacingM?: number; nearM?: { to: 'water'|'gate'|'market'|'centre'|Id; maxM: number }[]; frontageClass?: WayClass[]; avoid?: Id[] }
interface PlacementSolver { solve(doc: Document, a: Assignment, fixed: Id[] /* mapped placements, kept */, exclude: Id[] /* locked entities */, rng: Stream): KernelResult<Id[]> }   // greedy max-min-distance by score with a bounded swap pass; reports infeasibility with the nearest achievable count
```

**Precedence: lock > assignment > user-drawn geometry > rule tables > defaults** — the one order for every meeting of
protections and inputs (§7.2, §5.2 F-EDIT); S10–S11 apply it to assignments. A targeted assignment on a locked entity
(or a locked attribute path) is an F-EDIT conflict returned as an action — unlock, choose another target, or keep the
lock; the dispersed solver never places a member on a locked entity. A host that must override a lock sends an unlock
first, and the log records it (J-DET-11).

**One path.** A blueprint's assignments and edits become `assign` and edit events at log positions 0…k when the
document is created; every `assign` event — from the blueprint, the dialog or the host bridge — runs the same
claims-first re-derivation for its scope (S10 step 3 on the target's block, or on the blocks of a dispersed
assignment's chosen plots, §4.7), so an
assignment gives the same town whichever way it arrived. **Re-solving:** when a member of a dispersed assignment is
superseded without a successor, only that member is re-placed, with every mapped placement as a fixed point (the minimum
spacing is measured from them); nothing still mapped moves. **Epochs** keep placed members; members are added only by
an event that changes the count or the criteria, and are then placed with the existing members fixed.

A whole-neighbourhood assignment sets the district's character and class mix while every building stays individually
diversified by the class rules within the drift bounds; drift bounds are inputs to `BuildingGenerator.compose`;
assignments are events (persist, undo, migrate) and take precedence over class rules (O10 e). Stable addresses for
districts, neighbourhoods, plots and buildings that survive regeneration and edits are §6.3's.

**Forms catalogue (should-have; the schema is the must-have hook).** A form is a row `{ id, constraints,
growthProgramme, signature }`: constraints (site request, wall rings, plaza position, planned flag, gate count band), a
growth programme (stage regimes and branch tables, §4.4), and a morphometric signature (radial share of arterials,
orthogonality index, street-density profile, block-area CV, enclosed share). Initial rows: `organic`, `bastide-grid`,
`linear-street` (growth anisotropy a = 8 along the main road, §4.4), `radial`, `hill-acropolis`, `bridge-town`,
`port-quay-parallel`, `monastic-close`, `island-city` (shore destinations, §4.2 S3), `confluence`, `twin-town` and
`polycentric` (two or three nuclei, §4.2 S3); forms compose by growth stage (an organic core with a planned extension).
O10 (g)'s classifier runs on the signature vector.

=== REPLACE ### 7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15) ===
### 7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15)

* **The control registry** declares for every control its output metric (e.g. `density` → buildings per ha;
  `wealthLevel` → median plot area and greenery share; `greenery` → private green share), its range, its **consuming
  stage** (the earliest stage that reads it), its **locality class** — *local* (consumed at S10 or later, or spatially
  scoped: Adjust is local) or *re-derive from Sk* (the action shows the fate report first, §7.1) — its **continuity
  class** (*continuous* or *discrete*, with a discrete control's levels) and a **documentation anchor** that the app
  links from the control as context help. The same registry fields (label, range, unit, output metric, consuming stage,
  locality class, continuity class, anchor) generate `@plat/docs`' reference pages.
* **Monotone and continuous, stated statistically.** Discrete stop rules downstream (the OBB band test, the
  straight-or-bent test, minimum widths, ladder rungs) make any single seed jump, so the promise is about the
  expectation. The CI sweep runs each continuous control over 21 evenly spaced steps × 50 seeds at TOWN and CITY
  (METROPOLIS nightly): **monotone** — the mean of the control's metric moves in the declared direction between adjacent
  steps, a reversal of at most 2 standard errors allowed; **continuous** — no adjacent step moves the mean by more than
  ε = max(3 standard errors, 3 × the median adjacent change of the mean); **per seed** — at most 10 % of seeds jump by
  more than 5 × the median per-seed step at any one step. The formula is fixed now; the standard errors and medians are
  what the M1 sweep measures. Continuous controls are smooth maps with no thresholds inside (VG's "1 vs 0.999" is the
  failure); discrete controls (walls on / off, form) declare their effect in the report.
* **A control that fails its sweep — the pre-decided fallback.** The *failing interval* is the smallest run of adjacent
  steps whose checks fail, widened by one step on each side. (1) The control's expansion row (§7.7) is replaced, over
  that interval, by a `smoothstep` between the row's values at the interval's ends — a table change with provenance
  "sweep fallback" and a declared shift (§6.4) — and the sweep re-runs. (2) If the control still fails, it is declared
  **discrete**: the registry's continuity class becomes *discrete* with the levels at which the metric's mean is stable
  (the steps between failing intervals, each represented by its median step), the basic and advanced panels show it as a
  stepped control, and the report and the release notes list it. The population control is continuous by construction
  (§10.2's prefix-stable roster) and is checked the same way; its work-limit side is §5.1 (5)'s flat F-WORK rate
  (J-DET-27).
* **Proxy thumbnails** (G-R4; O16 e). "Surprise me" and the size / water controls preview six candidate towns as **the
  towns' own S0–S4 runs** — site, water and backbone, drawn at city LOD from those stages' display list in §8.5's
  distinct preview style — under the same deterministic work limits as a full generation (§5.1), so a proxy is
  bit-identical to the first stages of the town it previews. Choosing one continues that recipe from its committed S4
  state and asserts that the S4 digest equals the proxy's. Budgets on reference hardware (§12): all six **within 1 s at
  TOWN** (O16 (e)); at CITY and METROPOLIS the proxies appear progressively — the first within 300 ms, each within
  250 ms at CITY and 500 ms at METROPOLIS.
* **The control surface is a budget** (R15): the front door is one action; the basic panel holds ≤ 12 controls — seed
  (with the "Surprise me" dice as its button), size rung, water setting and side, walls, castle, gates, **features** (one
  checkbox strip — plaza, temple, shanty town, farms, greens: MFCG's first-level toggles, counted as one control),
  planned ↔ organic, wealth level, greenery, style preset, labels. A feature left at *auto* is drawn as §4.2 S0 states
  and reported (§5.4). Everything else sits behind an advanced panel; 100 % of parameters are documented (registry
  test); new templates and presets are data, not code; release notes name known defects.

