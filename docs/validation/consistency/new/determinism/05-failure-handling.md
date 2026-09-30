## §5 Failure handling — no whole-map discard-and-retry

*In plain words.* When a step cannot produce a valid result — a lane that would leave a sliver block, a river with no
way downhill, a wall with too few gates — the program never throws the town away and starts again. Each step has a
short, fixed list of things to try, in order: check first, repair locally, retry that one piece with its next random
stream, use a simpler shape, substitute (an uncuttable block becomes a courtyard or a green, as Neighbourhood does),
and finally leave the feature out and say so in the report. Nothing on the list touches anything outside the failing
piece.

### 5.1 Principles and the seven tiers (G-P7)

1. **The unit of failure is a kernel transaction (a batch), never the map.** The pipeline has no restart path
   (IMPROVEMENTS J-K adopted; D-9). Removed: MFCG's catch-all that restarts the city on a bisector exception (`City.hx:156`;
   `profile-mfcg.md` ST-8; 24 restarts in 58 recorded attempts) and VG's silent seed swap (4 of 27 attempts).
2. **Feasibility by construction before geometry** (tier 0): S1 guarantees river descent, S2 derives the stage budgets
   from demand, S3 places the site relative to the river and reserves the castle, plaza and institution precincts
   (§4.2) — the hard constraints MFCG leaves to its restart tier hold before any fabric is cut.
3. **Every stochastic step has a declared, bounded, deterministic ladder.** Every rung taken writes a report line with
   its cause code and tier (§5.4); the ladder path is replayable from the printed stream key.
4. **Invariants police validity, not regularity** (FTG's sheared minority of quads and NG's wedge class stay).
5. **Every limit that can change output is a work limit, never a time limit, and it follows the size of its scope.**
   Each stage declares its limits — counts of kernel calls, proposals, candidates, skeleton events and recursion depth
   — as laws over its batch scope's counts, not as fixed numbers per rung:

   ```ts
   type WorkUnit = 'plots' | 'buildings' | 'households' | 'landHa' | 'frameCells' | 'latticeNodes' | 'faces' | 'vertices';
   interface WorkLimitLaw { counter: string; unit: WorkUnit; perUnit: number; floor: number; log2?: boolean }
   // limit = floor + perUnit × count(unit, scope); with log2, floor + perUnit × ⌈log2(count)⌉ (recursion depths)
   type WorkLimits = WorkLimitLaw[];          // StageDecl.workLimits (§4.12, §14); coefficients are rows of `workLimits.json` (§7.6)
   ```

   `count(unit, scope)` reads only model values committed before the batch runs — the request's population through
   S2's demand and stage quotas, the `Allocation` records, the scope's land area, frame cells or lattice size — never a
   measurement. So a limit grows with population inside a rung's band (§1.1), a district batch gets a limit
   proportional to its district, and a scoped re-run (an edit, a regeneration, a replay) gets exactly the limit its
   scope had in the full run. A kernel call that reaches its count returns `E_WORK_LIMIT` (§3.1), handled as F-WORK
   (§5.2), so the same inputs take the same rungs on every machine.
   * *Coefficients:* each is the 99.9th percentile of the measured work per unit on B-CITY-lite × 1.5, computed by the
     spike or milestone that builds the stage and recomputed whenever the stage's code changes; a change that moves
     output is a declared shift (§6.4).
   * *Confirmation (M1, then every nightly cost-model run, §13.2):* the F-WORK hit rate per stage is flat across each
     population band — at the top of a band it exceeds the rate at the bottom by at most 1 per 1 000 batches.
     *Pre-decided fallback:* a failing counter's `perUnit` is raised to the measured 99.9th percentile per unit at the
     band's top × 1.5 and the sweep re-runs.
   * **Wall-clock time** is read only by `@plat/api`'s worker host, never by a model package (§6.5): it may postpone or
     resume a lazy tier (F-BUDGET-TIME) and writes telemetry, but never changes what is computed — a tier computed late
     hashes exactly like one computed at once. §12's millisecond budgets are reporting targets and cost tests, never
     output-changing limits (J-DET-3, J-DET-25).
6. **Retries are not rerolls, and New random is checked to change its scope.** Ladder retries (tier 3) draw from the
   stream key's `attempt` component, which restarts at 0, with the same cap, for every reroll of the scope entity; New
   random advances the `reroll` component (§6.1, §7.1), so every reroll has its full ladder. After a New random's
   re-derivation the engine compares each scope entity's **content digest** — the Merkle node of its subtree (§6.2)
   computed with identity (address, lineage) and lifecycle left out: kinds, geometry and attributes only — with its
   value before the event. An entity whose content is unchanged advances its reroll once more and re-derives, up to
   `reroll.maxAdvance` times (a table value, default 3); if still unchanged it keeps its original reroll — nothing about
   it changes, not even its lineage — and the report lists it as "no alternative within the ladder". The advances run on
   the dry run's overlay (§7.1), so only the chosen result commits; the event stores the rerolls actually used, so a
   replay repeats neither the comparison nor the advances (J-DET-20). *Test (B-EDIT, minimal scopes):* New random on a
   block holding one plot, a plot with a one-building row site plan, a one-cell district, a ruined building and a person
   whose every attribute path is locked either changes the scope's content or reports it — never a silent no-op, never
   a change of identity without a change of content.
7. **Requested features are counted by delivery tier.** For every feature the request names the report records
   whether it was delivered at tier ≤ 3 (*full*), at tiers 4–5 (*degraded*) or dropped at tier 6 (*omitted*);
   acceptance counts a tier-6 omission of a requested feature as a failure, with the bars of §13.5's requested-feature
   delivery row (§15.2). "No restart path" is a design property, not an acceptance number.

```
tier 0  feasibility by construction    the constraint is satisfied by how the input was made
tier 1  constraint check               typed KernelResult / invariant; nothing committed
tier 2  local repair                   a deterministic geometric fix: attract, widen, merge, re-inset, re-claim, re-site
tier 3  bounded local regeneration     retry the same entity with the next ATTEMPT inside its current REROLL; ≤ 3 attempts per reroll
tier 4  simpler primitive              bent cut → straight cut on the mean normal → perpendicular mid-run cut;
                                       skeleton → medial axis (labels) / plain roof (roofs)
tier 5  substitution                   an uncuttable block becomes a court, a green or a landmark plot (NG's rule)
tier 6  documented omission            the feature is dropped for this entity and the report says so; never silent
```

Tiers 2–5 run inside the transaction on the overlay; tier 6 commits without the feature. No tier re-runs another stage
or re-rolls anything outside the failing entity's scope, because every retry draws from (entity lineage, concern,
reroll, attempt) and nothing else reads that stream (§6.1).

### 5.2 Failure classes: detection, ladder, test

Each row fixes its class's detection, the order of its rungs (each deterministic from the stream key) and its test; a
row marked † names in brackets the section that states how its rungs are computed.

| class | where | detection | ladder (in order) | how it is tested |
|---|---|---|---|---|
| F-NUM† precision failure of an optional chain [§3.6] | kernel | `E_OUT_OF_RANGE`, `E_BELOW_MIN_EDGE`, `E_BELOW_MIN_ANGLE`, `E_SELF_INTERSECT` on an optional chain (growth proposals, optional lanes, decorative lines); warnings `W_SNAP_PASSES`, `W_ACUTE_CORNER` | re-propose from the next attempt stream → reject the chain with a report line (a proposal that cannot be inserted is simply not a street). Mandatory chains do not fail for precision (§3.6): `E_OUT_OF_RANGE` on one is a bug that aborts the batch with its stream key; `E_LOCKED` goes to the dry run (F-EDIT) | B-FUZZ (§13.1), 10⁶ inputs per primitive: 0 crashes, 0 hangs, 0 self-intersecting outputs, 0 undeclared slivers (O3 a); 0 mandatory chains rejected on B-CITY |
| F-CUT† bent cut fails [§4.6] | S8, S10 | `E_NOT_TWO_CROSSINGS`; a child fails simple / min area / min width / min angle | reflex pre-cut (a face with a reflex vertex deeper than the band's block depth is split there first, and at antenna roots) → redraw the cut position ×2 → straight cut on the mean normal → the always-succeeding cut perpendicular to the longest side run at its midpoint, clipped to the face's own component → substitution (court / green / landmark / a joined plot for the largest unplaced class of the district's **allocation**, never live roster state, §4.7), only for faces ≤ 2 × the band's upper block area | on 10⁵ random concave and holed faces the ladder ends in ≤ 6 kernel calls and the face count never decreases; the built-area share left as court or green residue reported per district (soft band ≤ 5 %); the NG signature regression (§13.5). MFCG baseline: 19 skipped cuts; 3 of 16 cities restarted for "bad poly" |
| F-CORRIDOR† union leaves slivers or a collapsed block [§3.6] | S9 | a face below its class minimum width or area after `corridorUnion` | `absorbSliver` (merge across a partition edge, else keep the face as `residue`; a structural edge is never deleted) → downgrade the offending lane to `alley` width → retype the lane `invisible` and log | B-CITY: 0 faces below their class minimum width and area; 0 structural edges deleted |
| F-OUTLINE† a closed outline is not simple [§4.2 S1] | S1 (coasts, lakes, islands, sky-island outlines) | the displaced outline self-intersects or loops | clamp the displacement → repair by non-zero union → type each resulting loop (islet / pond / absorbed), reported | §13.2's outline tests (island, fjord, sky-island): 0 non-simple outlines committed |
| F-RIVER† no course / no crossing [§4.2 S1] | S1, S3, S1's water operator (§7.3) | descent stalls in a sink; the carve would exceed `carveMaxCm`; the course leaves the frame before the core; no crossing site in the core band | carve the sink deeper up to `carveMaxCm` → re-trace from the last good knot → move the inlet along the frame edge (attempt) → move the centre to the bank (S3) → declare "no crossing", route arterials to the bank road, report. A requested river island whose branch separation fails is reported "not built". Inside an edit the re-trace is confined to the edited reach and the inlet and centre rungs are not offered (escalation: §7.3's S1 rows); a moved course knot is never re-traced away from the user's position (§7.3 (b) 1) | 1 000 seeds × {`river`, `coast+river`} (the `WaterSetting` spelling, §13.3) × rung: "river within the core when requested" = 100 % (MFCG baseline: 7 of 10 attempts fail at size 80) |
| F-CONTOUR† a contour crosses a shore [§4.2 S1] | S1 | a contour level set crosses a shore edge | the coast construction of §4.2 S1 → clip every contour to the land faces in vector space before emission (always succeeds), reported; never an abort path | steep-coast, cliff and spit fixtures: 0 contours crossing water; 0 S1 aborts |
| F-SITE no valid centre | S3 | every candidate fails the slope / land / flood tests; polycentric nuclei closer than the separation floor (§4.2 S3 (6)) | relax the slope threshold one step → the largest land component's centroid band → report; nuclei: re-site the later nucleus (≤ 3) → merge the two under one enceinte with a cross wall, reported | corpus sweep over relief characters; twin-town fixtures: walls apart by the floor, or one enceinte with a cross wall |
| F-ROUTE† no arterial path [§4.3, §4.2 S1 (5)] | S4; S5b at stages k ≥ 2 and in every epoch (S4's router, §4.4); S4's local operator (§7.3) | `E_NO_PATH`; an approach cannot meet a pinned bridge deck within the class's minimum radius | another crossing site on the reach within its search band — one S1 or S3 already emitted, a `site` no way uses yet (river and canal decks; a moat deck is fixed at its gate, §4.3; the deck stays perpendicular to local flow) → one bridge at extra cost: a new deck whose two `deck_end` vertices one L0 batch of two same-level shore splits places, nothing cleared, before the way's L1 batch lays its span (inside an operator whose water is not yet inserted the rung only sites the deck, §4.2 S1 (5)) → relax the slope limit one class → route to the nearest reachable junction and mark the destination `unserved` in the report (MFCG's "Unable to build a street!" is only logged, O16) | scripted requests on 100 seeds with pathological sites; O4 (a): 100 % of through-roads at a named destination or reported; road and deck agree on 100 % of crossings |
| F-BUDGET-STAGE† capacity below demand [§4.2 S2, §4.4] | S5 | S5d's area test: the stage's grown area against its plot demand at the bands' plot areas | one bounded top-up before the next stage (widen the stage boundary by the shortfall at the stage's measured plot density, grow only the added ring, recompute the trace) → accept and report the shortfall; the exact plot check after S10 feeds F-SITING | §13.2's B-CITY `wealthLevel` sweep: population ± 5 % on ≥ 95 % of seeds, walled share in its band |
| F-WALL† bad trace / infeasible gate count [§4.2 S3, §4.4, §4.8; §3.6–§3.7] | S3 (stage 1), S5a, S7 | the trace self-intersects or crosses the core; a closed trace does not close, or an open trace has an end not anchored on shore, bank or cliff; fewer arterial crossings than N; a non-gate way reaches the trace | gates: two gate routes cross the stage-1 boundary at one point → re-draw the later gate pick (≤ 3) → drop it and report (§4.2 S3 (7)). Trace (fixed before growth, gates pinned — S3 for stage 1, S5a later): re-offset with a larger radius → topology-preserving union-simplify (`booleans`, §3.7) → anchor open ends by attraction onto the nearest shore, bank or cliff (a shared stretch carrying `bank` and `wall`, §3.6; an open trace is legal when both ends are anchored), adding water gates where the waterfront policy requires a quay wall → divert excess arterials to the nearest gate as lanes → add posterns and report when N cannot be met (N = 0 adds no main gate: a declared sealed circuit whose harbour outside the stage-1 region still gets its harbour gate, §4.2 S3 (7)) → last rung: cut a way that reaches the wall at the setback band and prune the outer stub, reported | B-CITY: gates on arterials 100 %; main gates = N exactly; roads leaving each walled stage = its gate count (§5.3's S7 row); 0 non-gate crossings; 100 % of quays reachable without crossing a wall except at a gate on coastal and river seeds. MFCG baseline: sealed cities at 0 main gates, no fallback |
| F-CASTLE† compactness / overlap [§4.2 S3, §4.8] | S3, S7 | compactness < 0.75; the claim overlaps water or the plaza | at S3, when the bailey is sited and before the trace welds to it (§4.8), inside the reservation: equalise the claim's angles (≤ 20 passes) → bloat in 5 % steps up to the band's top → re-site (reported) → keep without a bailey (reported) | §4.8's castle acceptance; 0 ways through reservations (§5.3); O8 (d). MFCG baseline: 178 equalize passes and 11 bloats per census |
| F-PLOT† unusable plot [§4.7] | S10 | frontage < min, wedge angle < 12°, landlocked | per-frontage regions (§4.7; when the block's skeleton downgrades, a reflex pre-cut partition) → merge into the neighbour → insert an alley for access → typed residue (court / vacant) | every plot has ≥ 1 access edge (100 %); 0 landlocked buildings. NG baseline: 42 % of lot leaves discarded |
| F-SITING† roster item unplaced [§4.7] | S10b | the eager allocation (§4.7) cannot place a class's demand in its affinity district | reconcile inside the district's allocation (JOIN at block granularity → a whole block → the district edge; cross-district moves only in the allocation's own reconcile, S7b) → reduce the manifest and report `unplaced` — decided eagerly, never by the order lazy districts are placed in, never silently (FTG V1 "would regularly give up") | §4.5 S7b (3)'s placement acceptance (O18 f); the derived-complete digest across district orders (§6.5 (9)) |
| F-SITEPLAN† footprint does not fit [§4.7 S11] | S11, the terrain operator (§7.3) | setbacks leave no rectangle ≥ the class minimum; after a terrain stroke a row footprint's fall exceeds `skirtMaxCm` | on slopes above `skirtMaxCm`, stepped wings first → lower the coverage one step → next arrangement (compound → detached → hovel → the `tents` row where the class allows) → vacant plot typed yard, reported | O17 (f) (§15.2); 0 renderer fallback rectangles |
| F-SKELETON† skeleton fails [§3.8] | S11, S13a | the output validator fails (non-planar skeleton, non-monotone faces, inconsistent heights) or the skeleton's work limit (events processed) is reached — `E_WORK_LIMIT`, never a timeout | labels: a sampled medial axis (§3.8, used by §9.3); roofs: a **plain roof** — footprint drawn without ridge or hip lines, roof kind `plain`, heights unchanged (MFCG draws a roof whose gable pass fails plain). Near-rectangular footprints never reach this row: their exact OBB roof is the primary construction (§3.8) | §13.1's ladder-coverage fixtures (every downgrade rendered, no roof line outside its footprint); 0 crashes on 1 000 holed polygons (§3.8) |
| F-LABEL† no fit [§9.4] | S13b (view side) | the spine is shorter than the text at the minimum size; an unresolved collision at priority | §9.4's seven rungs, each counted in the report; placement is view data and never changes the model (§9.1) | §9.4's acceptance, by B-ZOOM (§13.4) |
| F-WORK operation count reached | any stage, ladder or kernel call | `E_WORK_LIMIT`: a declared count reached (candidates, proposals, kernel calls, skeleton events, recursion depth), each the stage's law over its batch scope (§5.1 (5)) | the stage's declared coarser rung, entered by the count, never by time (fewer candidates, larger cells, a shallower recursion) → report `work_cut` with the count; the map is valid and identical on every machine | time dilation (§6.5 (9)): per-stage digests byte-identical; work-cut rate per stage reported on B-CITY; hit rate flat across each band (§5.1 (5)) |
| F-BUDGET-TIME stage over its time budget — reporting and scheduling only | `@plat/api` worker host (outside model packages) | wall-clock watchdog | postpone or resume a lazy tier (cancel-and-resume only); telemetry records `time_over`; never a model change | a tier postponed and resumed hashes like the eager tier; per-stage timing against §12 in CI telemetry on reference hardware |
| F-EDIT constraint conflict | S0, edits | a drawn way crosses a locked entity; a targeted assignment names a locked entity; an assignment cannot be honoured within its drift bounds; a warp would break an invariant or carry a locked or pinned point-anchored record out of its host face (§7.4); the effective scope holds protected entities whose fate is not *kept*; an `undo` or `redo` whose target has dependent live events (§7.4); a water edit's new channel ⊕ bank setback meets a locked or pinned way, wall or finer entity, or a reservation (§7.3 (b) 3); a moved course knot whose carve would exceed `carveMaxCm` (§7.3 (b) 1); a host provider's output that would pass §2.9's cap on pack data and host content; an upgrade's copy of a pack `to` stops shipping that would pass that cap (§7.5) | the dry run returns the conflict as an action — the nearest valid position (for a course knot, along the drag within the cap), the blocking lock, the fate list to confirm (§7.3 item 4), the dependent events to undo first, Re-derive from S3 for a reservation in a new channel's way, the provider and the size, or the pack and its size with "keep the old model" (§7.5) — decided by §7.7's precedence order; never silently resolved | B-EDIT sequences and conflict fixtures: 0 planarity violations, 0 lost faces, 0 silent re-binds |
| F-REDERIVE coarse re-derivation invalidates finer content or crossings | §7.3's local operators (S1 water and terrain, S4, S5, S6, S7) | a plot, footprint or yard in new water, in a new corridor, across a moved wall band or outside its new cell; a way that new water ⊕ its bank setback will meet off a deck (found on the new water's data before it is inserted, §7.3 (b) 1–2); a deck span no longer over water; a crossing `site` whose bank vertices no longer stand on a shore of its reach | **Plots and buildings:** re-cut the plot along the new boundary (ids kept by the anchor rule, §6.3) → re-fit its site plan (F-SITEPLAN) → demolish what still conflicts, with a lifecycle event whose cause is the edit. **A way new water will meet off a deck** — decided before the water is inserted, in the L1 batch of S1's water operator (§7.3 (b) 3) or of a carve (§4.11 (1)), so the L0 insertion meets no finer edge except at the vertices that batch prepared (§3.3): a **kept way** — an arterial, the only connection of the streets beyond it to a gate or the plaza (§4.11's rule), or a way that crossed the changed water on a deck — is re-routed through a deck as §7.3 (b) 2 states, within the **detour bound** (the re-routed length between its nearest pinned nodes on either side of the water ≤ 1.4 × the old length); every other way is cut at the bank setback: the stretch inside the new water ⊕ bank setback is removed and each land part stays a way — the part keeping the old anchor (end junction, else larger overlap, §6.3) keeps the address, the other is a fresh way — and a land part shorter than the district's minimum block width that ends at the setback (a stub) is removed, leaving a dead end at the bank. **A deck over land** (its reach moved away, no site within the band, §7.3 (b) 2): the `Bridge` becomes a tombstone (`demolish`, cause the edit); its span stays in its way as an ordinary segment of the way's class — the higher class of the two ways it joins where the span was a separate `bridge` way — or leaves with the way if the way was removed; its `deck` and `deck_end` rows are removed (`removeEdges` on `ChainRef('deck', bridge)` and its two `VertexRef('deck_end', bridge, i)`), after which demotion takes its bank vertices to the way's level and clears their kernel pins (§2.2 rule 3). **A site over land** (no successor site matched it, §7.3 (b) 2): its `deck_end` rows are removed by `removeEdges` on their `VertexRef`s and its record becomes a tombstone (§2.7). Every re-cut, demolition, re-route, cut and pruned stub is listed in the fate report with its lifecycle event; a locked or pinned entity is never demolished, re-routed or cut — its conflict returns to the dry run as F-EDIT | the coarse-edit oracle, §7.3 item 7 (v) |

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
generates METROPOLIS from M1, §16). *Pre-decided fallback:* an invariant whose batch-local check breaks that flat cost
moves to stage-end scope — still hard, checked later in the same stage.

### 5.4 The generation report

```ts
interface GenerationReport { outputVersion: string;
  stages: { name: StageId; work: Record<string, number> /* operation counts against the stage's declared work limits (§5.1) */; attempts: number;
    ladderUses: { cause: string; rung: number; tier: 0|1|2|3|4|5|6; entity: Id; key: string /* the stream key's textual form, §6.1 */ }[];
    invariants: { name: string; scope: 'batch'|'stage'|'save'|'ci'; pass: boolean; count: number }[] }[];
  requested: { feature: string; delivered: 'full'|'degraded'|'omitted'; tier: number; entity?: Id; cause?: string }[];   // §5.1 (7)
  requestedVsBuilt: Diff[]; autoResolved: { param: string; value: unknown; reason: string; layer: OverrideLayer }[]; unserved: Id[]; unplaced: Id[];
  kernel: { engine: string /* the engine id, §3.7 */; warnings: Record<string, number> /* per §3.1 warning code */; downgrades: number; workLimitHits: number } }
interface Telemetry { stageMs: Record<StageId, number>; timeOver: StageId[]; verifyMs?: number }   // session-only; never saved, never in any digest
```

The report is a **derived cache**: rebuilt by every derivation (and by the verification replay on load), saved only in
the document's `derived` section so the panel can show it before verification finishes, and excluded from the
canonical form and every digest. It records stream keys **only for ladder uses** (any rung from tier 2 up, retries at
attempt > 0 included), not for every stream the town used. Timings are telemetry: the worker host measures them outside
the model packages, the UI shows them, and nothing saved or hashed contains a millisecond. The same object is the UI's
compact, dismissable panel (O16) and the API's `report(doc)`; every ladder use is replayable from its printed key
(MFCG's replayable attempts kept).
