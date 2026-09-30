# repair-r2-determinism — lane amendments-b/repair-determinism-r2 (DETERMINISM part: §5, §6, §7): block file per the
# BLOCK PROTOCOL. Text before the first "=== " line is ignored. The lane's report, ledger and receipts are
# docs/validation/amendments-b/repair-determinism-r2-report.md.
# Base: docs/ARCHITECTURE.md sha256 365e19f24743c88a… and docs/ARCHITECTURE-RATIONALE.md sha256 50a94f2d6fca8b86…
# (assemble-r1's output). Each REPLACE body is the live subsection with asserted single-occurrence substitutions
# (scratchpad rd2/specs/*.py through rd2/lib.py); every untouched line is verbatim.
#
# ASSEMBLER HAND-OFF
# (1) RESTATED ROWS. The protocol only appends rows, so the J-ROWS and RATIONALE-A blocks carry restated rows under their
#     existing ids: J-A31.75, J-A22.74, J-DET-2, J-DET-53, J-A31.71, J-A20.75 and J-A12.71 (index and Part A).
#     apply-blocks.py appends them and notes "DUPLICATE ID inserted"; for each, move the appended row into the older
#     row's place and delete the older row, so one row per id remains (assemble-r1-handoff.py step 1 does exactly this).
#     The new ids (index and Part A) are J-A28.73 and J-A22.76.
# (2) This file REPLACEs §5.2, §5.3, §6.1, §6.3, §7.1, §7.2, §7.4, §7.5, §7.6 and §7.7 (determinism-owned). If another round-2
#     file REPLACEs one of these headings, it is applied after this one (name order) and must carry these edits.

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
| F-CONTOUR† a contour crosses a shore [§4.2 S1, §8.2] | S1 | a contour level set crosses a shore edge | the coast construction of §4.2 S1 → clip every contour to the land faces in vector space before emission (always succeeds), reported; never an abort path | steep-coast, cliff and spit fixtures: 0 contours crossing water; 0 S1 aborts |
| F-SITE no valid centre | S3 | every candidate fails the slope / land / flood tests; polycentric nuclei closer than the separation floor (§4.2 S3 (6)) | relax the slope threshold one step → the largest land component's centroid band → report; nuclei: re-site the later nucleus (≤ 3) → merge the two under one enceinte with a cross wall, reported | corpus sweep over relief characters; twin-town fixtures: walls apart by the floor, or one enceinte with a cross wall |
| F-ROUTE† no arterial path [§4.3, §4.2 S1 (5)] | S4; S5b at stages k ≥ 2 and in every epoch (S4's router, §4.4); S4's local operator (§7.3) | `E_NO_PATH`; an approach cannot meet a pinned bridge deck within the class's minimum radius | another crossing site on the reach within its search band — one S1 or S3 already emitted, a `site` no way uses yet (river and canal decks; a moat deck is fixed at its gate, §4.3; the deck stays perpendicular to local flow) → one bridge at extra cost: a new deck whose two `deck_end` vertices one L0 batch of two same-level shore splits places, nothing cleared, before the way's L1 batch lays its span (inside an operator whose water is not yet inserted the rung only sites the deck, §4.2 S1 (5)) → relax the slope limit one class → route to the nearest reachable junction and mark the destination `unserved` in the report (MFCG's "Unable to build a street!" is only logged, O16) | scripted requests on 100 seeds with pathological sites; O4 (a): 100 % of through-roads at a named destination or reported; road and deck agree on 100 % of crossings |
| F-BUDGET-STAGE† capacity below demand [§4.2 S2, §4.4] | S5 | S5d's area test: the stage's grown area against its plot demand at the bands' plot areas | one bounded top-up before the next stage (widen the stage boundary by the shortfall at the stage's measured plot density, grow only the added ring, recompute the trace) → accept and report the shortfall; the exact plot check after S10 feeds F-SITING | §13.2's B-CITY `wealthLevel` sweep |
| F-WALL† bad trace / infeasible gate count [§4.2 S3, §4.4, §4.8; §3.6–§3.7] | S3 (stage 1), S5a, S7 | the trace self-intersects or crosses the core; a closed trace does not close, or an open trace has an end not anchored on shore, bank or cliff; fewer arterial crossings than N; a non-gate way reaches the trace | gates: two gate routes cross the stage-1 boundary at one point → re-draw the later gate pick (≤ 3) → drop it and report (§4.2 S3 (7)). Trace (fixed before growth, gates pinned — S3 for stage 1, S5a later): re-offset with a larger radius → topology-preserving union-simplify (`booleans`, §3.7) → anchor open ends by attraction onto the nearest shore, bank or cliff (a shared stretch carrying `bank` and `wall`, §3.6; an open trace is legal when both ends are anchored), adding water gates where the waterfront policy requires a quay wall → divert excess arterials to the nearest gate as lanes → add posterns and report when N cannot be met (N = 0 adds no main gate: a declared sealed circuit whose harbour outside the stage-1 region still gets its harbour gate, §4.2 S3 (7)) → last rung: cut a way that reaches the wall at the setback band and prune the outer stub, reported | B-CITY: gates on arterials 100 %; main gates = N exactly; roads leaving each walled stage = its gate count (§5.3's S7 row); 0 non-gate crossings; 100 % of quays reachable without crossing a wall except at a gate on coastal and river seeds. MFCG baseline: sealed cities at 0 main gates, no fallback |
| F-CASTLE† compactness / overlap [§4.2 S3, §4.8] | S3, S7 | compactness < 0.75; the claim overlaps water or the plaza | at S3, when the bailey is sited and before the trace welds to it (§4.8), inside the reservation: equalise the claim's angles (≤ 20 passes) → bloat in 5 % steps up to the band's top → re-site (reported) → keep without a bailey (reported) | §4.8's castle acceptance; O8 (d) |
| F-PLOT† unusable plot [§4.7, §4.6] | S10; the re-cuts of §7.1's plot `join` / `split` and of §4.11's ladder | frontage < min, wedge angle < 12°, landlocked | per-frontage regions (§4.7; when the block's skeleton downgrades, a reflex pre-cut partition) → merge into the neighbour → insert an alley for access — or, where §4.6's rule allows it on a continuous frontage, a covered passage under the front building (item 30); the rung is skipped on the underground arena (II.7.3 U2) → typed residue (court / vacant). A hidden plot passes with a chain of access edges through passage, alley and court faces to a public way (§5.3), never landlocked | every plot has ≥ 1 access edge (100 %) and every hidden plot its chain (§5.3); 0 landlocked buildings; the same after every plot re-cut. NG baseline: 42 % of lot leaves discarded |
| F-SITING† roster item unplaced [§4.7 S10b] | S10b | the eager allocation (§4.7) cannot place a class's demand in its affinity district; a post-build request (§7.7) finds no plot inside the hard rows | reconcile inside the district's allocation (JOIN at block granularity → a whole block → the district edge; cross-district moves only in the allocation's own reconcile, S7b) → the item's soft rows to weight 0 → reduce the manifest, lowest-priority classes first and never a dossier-backed item (item 20: a dossier element that no plot satisfies goes to its first closest option — fewest hard rows failed, then best score, in §4.7 S10b's order — with the hard rows it fails reported, never omitted — §7.7's precedence), the report naming each unplaced item's blocking hard rows and its closest options — decided eagerly, never by the order lazy districts are placed in, never silently (FTG V1 "would regularly give up") | O18 (f) (§15.2): 100 % of institutions on a plot meeting their requirement; §4.5 S7b (3)'s acceptance for claims larger than one block; the derived-complete digest across district orders (§6.5 (9)); every dossier-backed element placed on every map (§5.3) |
| F-SITEPLAN† footprint does not fit [§4.7 S11] | S11, the terrain operator (§7.3) | setbacks leave no rectangle ≥ the class minimum; after a terrain stroke a row footprint's fall exceeds `skirtMaxCm` | on slopes above `skirtMaxCm`, stepped wings first → lower the coverage one step → next arrangement (compound → detached → hovel → the `tents` row where the class allows) → vacant plot typed yard, reported | O17 (f) (§15.2); 0 renderer fallback rectangles |
| F-PLAN† the room programme does not fit its wings [§2.6] | the plan rung (`BuildingGenerator.plan`, §2.6; stage 3, staged — this row is its hook), per building, never whole-house; every step of a re-cut along the interior ladder (item 28 (f), §7.3) | tier 0: the storey allocation places the household units first — each at its ladder row's unit form, falling to the next poorer form of §2.6's interior ladder, down to the single room the capacity is computed with, before anything is dropped — then trims the rest of the programme to the capacity of the wings that reach each storey, soft rooms first, and reports it (§2.6); tier 1: §13.2's plan bars fail on the overlay — a hard room missing, a room unreachable, a household unit without its own door onto circulation or the street (item 28 (f)), a piece below its row's minimum area, a seed or fixed ring the rung's transient arena refuses (`E_DEGENERATE`, detail `seed`, `fixed` or `overlap`; §3.4) | tier 2, local repair: merge two under-size pieces, slide a cut to its neighbour's minimum, answer a refusal of the rung's transient arena (tier 1) by the ring it refused (a kept room — detail `fixed`, or `overlap` naming its vertex — leaves the kept set and is cut with the rest, its address carried by §6.3's re-match where its anchor falls in a new room, reported; a stair bay or chimney stack is re-placed by §2.6 step 3 onto the side it came near or at least `minEdge` from it, §3.4, at its next `attempt`; any other refused ring — a seed ring (detail `seed`, or `overlap` naming a seed ring's vertex), the passage room or a composer's room — is the shell §2.6's composition contract guarantees, so its refusal is a bug that aborts the rung with its stream key, as tier 6's does; J-A28.73), swap two rooms' storeys → tier 3: the storey's layout pattern re-run on the next `attempt` (≤ 3, on `plan.layout`, §6.1) → tier 4: the simpler primitive — `bisect` on the wing's axes → tier 5: a soft room absorbed into its neighbour or into a generic room, reported; never a household unit, which takes the next poorer unit form instead (tier 0) → tier 6: a hard room omitted and reported (the bar fails and the building is flagged) — never a household unit: the count the rung must house is bounded upstream by §2.6's capacity, which S10b's fill and `relet` keep to (§4.7 S10b, §4.11), so a rung that cannot cut that many single rooms is a bug that aborts the rung with its stream key, as a mandatory chain's precision failure does (§3.6), never a silent drop (J-A28.51). Nothing outside the building is touched | §13.2's B-PLAN fixtures: hard rooms present 100 %, every household of the building (`Building.households`, §2.6) housed in its own unit with its own door (item 28 (f)), every room reachable, stairs stacked, walls equal the wing rings (the stage-3 contract's fourth rung, §2.6) |
| F-UNDER† an underground plot under excluded ground [II.7.3] | the underground stage (II.7; staged — this row is its hook) | a plot sample — its vertices, its frontage midpoint and a 1 m sample of its rear line — lies in an excluded ground face (water, the harbour, a wall strip, a gate, the keep, a reservation, a surface footprint: II.7.3's list), read by `pointLocate` on the ground's `PlatKey`, never a write | band depth → the band's lower depth → the class minimum depth → a `vacant` run, reported; a network run needing more fall than the ground gives is re-routed toward the nearer outfall, never trenched (II.7.2) | 0 committed underground faces with a sample in an excluded face (CI: a 1 m sample grid by `pointLocate`); the fixtures are §13.2's |
| F-SKELETON† skeleton fails [§3.8] | S1, S11, S13a, the plan rung (§2.6) | the output validator fails (non-planar skeleton, non-monotone faces, inconsistent heights) or the skeleton's work limit (events processed) is reached — `E_WORK_LIMIT`, never a timeout | each reader takes its typed downgrade (§3.8): `spine` readers — label spines (§9.3), S1's coast simplicity clamp (§4.2 S1 (2)) and the plan rung's room-label spines and room lights (§2.6, item 28): a sampled medial axis; roofs: a **plain roof** — footprint drawn without ridge or hip lines, roof kind `plain`, heights unchanged (MFCG draws a roof whose gable pass fails plain). Near-rectangular footprints never reach this row: their exact OBB roof is the primary construction (§3.8); the `regions` reader (S10) takes F-PLOT's ladder | §13.1's ladder-coverage fixtures |
| F-LABEL† no fit [§9.4] | S13b (view side) | the spine is shorter than the text at the minimum size; an unresolved collision at priority | §9.4's seven rungs, each counted in the report; placement is view data and never changes the model (§9.1) | §9.4's acceptance, by B-ZOOM (§13.4) |
| F-WORK operation count reached | any stage, ladder or kernel call | `E_WORK_LIMIT`: a declared count reached (candidates, proposals, kernel calls, skeleton events, recursion depth), each the stage's law over its batch scope (§5.1 (5)) | the stage's declared coarser rung, entered by the count, never by time (fewer candidates, larger cells, a shallower recursion) → report `work_cut` with the count; the map is valid and identical on every machine | time dilation (§6.5 (9)): per-stage digests byte-identical; work-cut rate per stage reported on B-CITY; hit rate flat across each band (§5.1 (5)) |
| F-BUDGET-TIME stage over its time budget — reporting and scheduling only | `@plat/api` worker host (outside model packages) | wall-clock watchdog | postpone or resume a lazy tier (cancel-and-resume only); telemetry records `time_over`; never a model change | a tier postponed and resumed hashes like the eager tier; per-stage timing against §12 in CI telemetry on reference hardware |
| F-EDIT constraint conflict | S0, edits | a drawn way crosses a locked entity; a targeted assignment names a locked entity; a map event — one without `EditBase.dossier` — that would close, remove or re-designate a dossier-backed element (§7.7 item 2's list); an assignment cannot be honoured within its drift bounds; a post-build placement — an assignment, a positive placement (`placeAt`) or the re-placement a `rejectSite` causes (§7.7) — that no plot satisfies inside the hard rows, or a user's positive placement over its disruption budget (§7.7); a plot `join` or `split` that would remove an occupied building (item 31, §7.1); a plan edit that would leave a room below its row's minimum area or unreachable, a plan edit or `setRoomUnit` that would leave a household unit without its own door onto circulation or the street, or a hand `relet` above §2.6's capacity (item 28, item 28 (f), §7.1); a warp would break an invariant or carry a locked or pinned point-anchored record out of its host face (§7.4); the effective scope holds protected entities whose fate is not *kept*; an `undo` or `redo` whose target has dependent live events, or an `undo` naming a `creation` event (§7.4); a water edit's new channel ⊕ bank setback meets a locked or pinned way, wall or finer entity, or a reservation (§7.3 (b) 3); a moved course knot whose carve would exceed `carveMaxCm` (§7.3 (b) 1); a host provider's output that would pass §2.9's cap on pack data and host content; an upgrade's copy of a pack `to` stops shipping that would pass that cap (§7.5) | the dry run returns the conflict as an action — the nearest valid position (for a course knot, along the drag within the cap), the blocking lock, the closest acceptable sites with the hard rows each fails and the disruption over budget (§4.7 S10b, §7.7), `rejectSite` (move the element) or `placeAt` (designate the plot for something else, the element re-placed) for a map event that would close, remove or re-designate a dossier-backed element (§7.7 item 2), "vacate first" (item 17's relocation) or the occupied building's demolition as a fate to confirm, the fate list to confirm (§7.3 item 4), the dependent events to undo first, in place of an `undo` of a `creation` event `unassign` (a blueprint assignment) or `rejectSite` and `placeAt` (a dossier element; §7.4), Re-derive from S3 for a reservation in a new channel's way, the provider and the size, or the pack and its size with "keep the old model" (§7.5) — decided by §7.7's precedence order; never silently resolved | B-EDIT sequences and conflict fixtures: 0 planarity violations, 0 lost faces, 0 silent re-binds |
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
| a basement lies inside and is smaller than its ground storey's wings, never under the flood band or below the water table (§2.6's terrain gate, item 29), and never joins a tunnel — a cellar stair to one is an `AccessPoint` (II.7.3) | batch-local | touched buildings |
| every dossier-backed element (an assignment with `existence: 'dossier'`, §7.7) is live and placed on every map: a `delete` never removes it, F-SITING never drops it, a rejection re-places it, and no map event closes, removes or re-designates it (§7.7 item 2) | batch-local (the assignments the batch touched); save | the assignment index against live placements |
| a stored plan's storeys tile the extents of the wings that reach them — at the ground storey with the span ring of each passage a wing spans, the passage room (the stage-3 contract's fourth rung, §2.6; J-A30.23): each exterior wall segment lying on an extent's edge, each room's ring simple and within its wing's extent or the span ring, no overlap, no gap (§3.10's seed-tiling row, per storey) | batch-local | the buildings whose stored composition the batch wrote or carried |
| the interior ladder (item 28 (f), §2.6): in every stored plan, and in every cached plan at its derivation, each household unit has its own entry door onto circulation (a corridor, stair hall or landing) or onto the street and never opens through another unit's room; a re-cut along the ladder changes no wing ring, stair core, entrance, hearth, chimney stack, passage room or basement ring — the shell's leaf digest (wings, heights, entrances, roof, basement), its rings read with the `composition`-role vertices a stored plan's re-cut adds removed (§2.6, J-P48 (1)), is byte-identical across it | batch-local (a stored plan the batch re-cut, §7.3); at derivation, on the rung's transient arena, for a cached plan (F-PLAN tier 1, §5.2) | the plan's room graph walked door by door per unit; the shell's digest before and after the re-cut, its rings read without those vertices |
| a mutation's kept parts keep their addresses and its added parts are minted from the causing event (§4.7 S11, §6.3); after a plot `join` or `split` the party walls agree on both sides and every plot keeps its class minimums (item 31) | batch-local | the plots of the mutation or re-cut and their one-ring |
| the epoch rows (item 31, §4.11): no occupied building is removed by a band change — a redevelopment first vacates through item 17's relocation. Across the epoch the ladder's rungs 1 and 2 change no frontage edge and shrink or re-cut no building shell toward a poorer band — a shell being the subtree the interior-ladder row names: wings, heights, entrances, roof, basement. Their only geometry is rung 1's yard buildings (`densify … infill`, `thin … infill`) and rung 2's one ring change, the `densify … back_court` split or its `thin … back_court` reversal (§4.11). Every other change of a plot's ring or a building's shell in the epoch carries the lifecycle event of the step that made it: a rung-3 event; a designation or renovation mutation (item 18: the use step, rung 1 growing rich); any other conversion of §4.11's `ConversionOp` — a decline, terrain-and-water, island, carve, `wallToWay` or `contractWall` conversion among them; or the growth step's own changes — regrowth's builds and the built-face legality's declared `demolish` and corridor re-cuts (§4.11). Every plot's geometry band is at or above its floor (`max(field band, geometryFloor)`, §4.11) (J-A31.75) | stage-end (each `epoch` event) | the epoch's touched plots' frontage edges and their buildings' shell subtrees against their pre-epoch values: every difference matched to a lifecycle event recorded in the epoch, and none matched only to a rung-1 or rung-2 `LadderOp` other than the yard buildings and the back court named above; every plot's band pair |
| decline and the staged layers (§4.11, II.6, II.7): a `cleared` building's footprint face persists (no dangling trace); no `EvolutionStrategy` plan contains `demolish` on a tunnel; every island in state `floating` has a supported area > 0; U1 — every underground plot's frontage rows lie on the kerb of exactly one navigable, open tunnel run and its access rows ⊆ its frontage rows; U2 — the underground L1 carries `tunnel` chains only, no `way` chain and no `alley` face on L1 or L3; U3 — every underground building's frontage side lies on its plot's frontage edge; ≥ 1 access point per underground neighbourhood; every `AccessPoint.ground.at` in public ground, a yard or — a `cellar_stair` only — a surface building II.7.3 admits (`undergroundAccess`, or a `secret` plot); never in water or a wall strip; no committed underground plot has a sample in an excluded ground face (II.7.3's list; F-UNDER, §5.2); the underground stage's commit records show 0 writes on the ground `PlatKey` | batch-local (U1, U3, the trace face, the island area: touched records; the surface exclusion: the touched underground plots); stage-end (U2, the access rows, the tunnel-demolish lint over an engine plan); CI-only (the cross-arena write count) | the role index and `pointLocate` (§3.4, kernel-supplied) — for the surface exclusion, F-UNDER's samples, each found by `pointLocate` against the ground arena, never a write; the engine plan's op list |
| every plot with ≥ 1 access edge, every building with exactly one `main` entrance on one, facing its street or court (§2.6, item 29), a side or rear entrance only on an access edge beyond the frontage; a hidden plot (`Plot.exposure = 'hidden'`, §2.5) reachable by a chain of access edges through passage, alley and court faces to a public corridor — an access edge on a sealed passage (`Passage.sealed`, §2.5) is skipped by the walk, so a sealed plot reads sealed (item 30; J-A30.71; the walk uses `faceNeighbours`, §3.4) | batch-local (entrances, access edges); stage-end (S10, and after every re-cut of §7.1's `join` / `split` and of §4.11's ladder: the reachability walk) | touched plots and buildings; one walk per hidden plot of the touched blocks |
| no way centreline crosses a footprint; no way crosses a reservation (§4.2 S3) | batch-local | touched ways, footprints and reservations |
| walls not crossed by ways except at gates | batch-local | touched ways and wall edges |
| **a way crosses water only on a deck, and a deck only over water**: every edge with a `way` role whose two sides lie in water (the L0 parents of both side faces are water faces) belongs to a `Bridge`'s deck span (the edges between its two deck vertices, carrying `deck`; fords included) or to a **harbour work** — a way of class `pier` or `quay` whose connected set of `pier` and `quay` edges meets land in at most one L0 land face (a pier, mole or breakwater arm rooted on one shore; a detached breakwater touching none, §4.8), which stands in the water rather than crossing it; a `pier` or `quay` way joining two land faces across water crosses on a deck like any way. Every deck span crosses a water face with both ends on its banks; a wall trace crosses water only at a water gate | batch-local | touched way, deck and wall edges against the L0 parents of their two sides, by index (§2.2 rule 2); for a touched `pier` or `quay` edge with water on both sides, one walk of its connected `pier` and `quay` edges counting the distinct L0 land faces its vertices touch (a harbour-wall row's few hundred edges at most). It covers S1's river decks, S3's moat and canal decks, S5a's outer-moat decks, a carve's decks and S7's harbour furniture; §13.2's harbour fixtures include a two-arm mole and a detached breakwater |
| **NF-P5**: no lane crosses a wall strip, and no L3 band, setback, glacis, tower or gatehouse face is cleared or split by an L1 or L2 batch — in every generation batch, and in every edit batch except for the enceintes whose wall-strip parts the edit's chain **declares** it rebuilds by S10's step (0) or removes. The dry run of every chained edit computes that declaration — the enceintes whose strips any of its batches changes, each "rebuilt" or "removed" — and every batch of the chain carries it; the check reads the declaration, never a list of edit kinds. Edits that declare: a tree-scoped re-derivation of a scope holding wall-strip faces (§7.3 item 2); S7's operator (`drawWall`, a moved trace vertex, a re-traced run, `gateToJunction`); S1's water operator for every strip its L1 batch changes — a re-traced run's strips, and a setback or glacis line it anchors and cuts outside a re-traced run (§7.3 (b) 3, 7, 8); a carve for every strip its batches (1)–(3) change and its step 4 re-derives (§4.11); as removals, `wallToWay`, `contractWall` (§4.11) and an enceinte's `delete` (§7.1's walls row). A lane still never crosses a strip (J-DET-39) | batch-local | touched lanes against the `setback` and wall edges; the commit record's removed and changed L3 faces of kind band, setback, glacis, tower or gatehouse against the declared enceintes; a CI registry test fails when an edit operator or conversion that can write a wall strip's L1 lines or L3 parts has no declaration path; §13.2's fixtures commit a canal carved across a wall between two towers and a river move whose new bank cuts a glacis line without crossing the wall with 0 NF-P5 violations, while a `drawWay` lane across a strip is refused |
| footprints ∩ (wall band ⊕ setback) = ∅ on both faces of every wall | batch-local | touched footprints and wall bands |
| every building's wing rings (and a stored composition's composed wings) pass §2.6's wing rule 4 after every carry, in generation and in edits | batch-local | the buildings whose footprint faces the batch changed, by §2.6 rule 4's tiered test (≈ 0.06–2.7 µs a building) |
| water ∩ footprints = ∅ | batch-local | touched footprints and water faces |
| every built bridge within ± 10° of the channel normal, measured on the deck and on the way; a `site` has no span and is outside every deck row (§2.7) | batch-local | touched crossings |
| exclusive land uses never overlap | batch-local | touched land-use faces |
| reference integrity: every reference out of a touched record — people, relations and uses included (a dependent's carer resolves; a building's `use` and a use's `buildings` resolve both ways, §2.7) — names a live id; every reference into a record the batch removed is carried over (§6.3) or reported as an orphan | batch-local | the reverse-reference index |
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
    derivation unit's reroll, so New random on a block changes that block's plots and nothing else. **The stage-3
    rungs** (item 28) are their own derivation units, with one reroll counter per `regenerate.rung` value — `wings`,
    `rooms`, `plan`, `plan.layout`, `plan.roles`, `plan.furnish`, in that order from the coarsest. Their streams —
    `plan.*` and the composition's concerns — carry S11's stage id, the stage that made the building (§4.7; for an
    underground building, the underground stage's S11 run, II.7.3), which a transient arena's batches carry too
    (§3.3). Each counter is an
    absolute count, advanced only by a `regenerate` that names its rung (§7.1's `rung`) and stored in that event's map
    under the key `<building id>#<rung>`; a rung's reroll is that count as the log gives it, never a field of the
    elaboration record (§2.8), so a replay rebuilds it exactly and the cache can be dropped at any time (§6.2). A
    stage-3 concern's stream mixes the counters of its own level and of every coarser level, through the one mixer
    (§14 `Rng.stream`): the coarser counters are folded into the building's key for these streams, one finaliser round
    per level in rung order, and the concern's own counter is its reroll component —
      - `plan.program` reads `#wings`, `#rooms` and `#plan`;
      - `plan.layout` reads those and `#plan.layout`;
      - `plan.roles` reads those and `#plan.roles`;
      - `plan.furnish` reads all six;
      - the composition's own concerns (stage 3's, appended to the registry below when stage 3 registers them) read
        `#wings`, and at `rooms` also `#rooms`.

    So a finer re-roll leaves every coarser concern's stream unchanged — re-rolling the layout keeps the wings, the
    entrances and the stair core by construction, and re-rolling the roles moves no wall — while a coarser one re-rolls
    everything below it (J-A28.61). A user's reroll count, a rung's counter included,
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
  §8.10: non-rerollable, attempt cap 0; keyed by a constant entity key — the four 32-bit-lane finalisers (as for the
  seed key) over the words (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index —
  0–3 for the class's four tiles, 4 for their shared border band) —, with `STAGE_VIEW` and reroll, attempt, epoch and
  salt 0; read by `@plat/kernel`'s `poisson` builder when `plat/tools/stamptiles/` builds the shipped asset, and in a
  worker only by the fallback rebuild of a tile whose hash differs; appended, so no other key moves).
  `alloc.district` also draws S7b's edge-green-or-orchard choice per district; `island.place` draws the island count —
  three ordered slots (II.6) — and the sky allocations' supported-area fills and outlines (§4.5 S7b (5), II.6);
  `epoch.transform` also draws the decline lottery's `u` and each entity's dwell spans (§4.11), keyed by the entity's
  lineage and the epoch, and the terrain and water conversions of §4.11 (reclamation, silting, a course shift), keyed by
  the water body's or land-use face's lineage (J-A25.61); the `sewer` concern's readers are the network stage's routing,
  connection and `pit` draws, the existence draw being S0's on `blueprint.features`, and the underground stage reads the
  ordinary `plot.*`, `siting`, `siteplan` and `heights` concerns keyed from the underground pseudo-district's lineage
  (II.7); a post-build placement — an `assign`, a dossier event, a positive placement or a relocation (§7.7) — draws on
  `siting` with the causing event's `seq` as its creation index (§6.3); a fusion or splitting of plots (item 31) draws
  on the `plot.*` concerns keyed from the due block's lineage, the members' buildings keeping their streams because
  their lineage continues (§6.3). None of these has a concern of its own. **Appended by the amendments of 2026-09-25
  (items 17, 18, 28, 29):** `siteplan.mutate` (a geometry concern, non-rerollable, attempt cap 3; read by §4.7 S11's
  designation mutator, keyed by the plot's lineage), `use.relocate` (non-rerollable, attempt cap 0; read by §4.11's use
  step on the use's `…/epoch=e` stream), `siteplan.entrance` (a geometry concern, non-rerollable, attempt cap 3: the
  side, rear and yard door draws and the basement decision of §2.6, keyed by the building's lineage, so re-deriving the
  entrances after a mutation or a terrain change disturbs no site-plan draw — J-A29.61) and the plan rung's four —
  `plan.program`, `plan.layout`, `plan.roles`, `plan.furnish` (geometry concerns, non-rerollable by salt; attempt cap 3
  for `plan.layout`, 0 for the rest; read by `BuildingGenerator.plan`, §2.6; keyed with the rung counters, above):
  `plan.roles` re-derives what hangs off roles (window demand, door kinds, furniture) and `plan.layout` keeps the wings,
  the entrances and the stair core. The geometry floor of item 31 draws nothing and adds no concern, and neither does the
  interior ladder (item 28 (f)): each step of a re-cut along it is its own derivation of the rung on the same four
  concerns under the rung's lineage and counters, keyed by the step's target — its ladder row and household count — as
  the creation index of §6.3's lineage key, so a step's draws are a function of what it cuts toward and never of when a
  click, an epoch or a `relet` reached it (§7.3's canonical prior; J-A28.63). **Appended with them (items 24 and 30):**
  `reserve.market` (a geometry concern, non-rerollable, attempt cap 0: §4.2 S3 (12)'s trade-convergence random term,
  keyed by the town root's entity key — the town's lineage) and `cut.interior` (a geometry concern, non-rerollable,
  attempt cap 0: §4.6's deep-interior draw, one (treatment, reach) pair per deep block, keyed by the block's lineage),
  each with the next append-only u16 id, so no other key moves.
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
  params, intent, character, entry mode, table pins, packs — without edits, locks, map assignments or salts. The
  dossier is kept: the new document's creation prefix holds one `creation` `assign` event, carrying its `DossierRef`,
  per live dossier-backed assignment of the current document — the assignment as the dossier gave it, without
  `placed`, `target` or `use`, which name the old town's entities — so every dossier element is present from the
  start (item 22 (d), §7.7 One path). Rejections and positive placements, which are map edits, are not carried. When
  the current document has edits the app first warns and offers to save it (J-DET-53).
* Seed-exact parity with the references is ≈ 0 by the evidence and not a goal (`docs/CONFIDENCE.md` §1).

=== REPLACE ### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated) ===
### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)

Every entity has two identities: an **address** that everything points at (edits, locks, assignments, pins, labels,
households, exports, the host) and a **lineage** that keys its random streams. They start equal and separate only when
an entity is re-derived.

* **Lineage key** = (arena key — layer and part, §2.2 —, the derivation unit's lineage hash, stage, creation epoch,
  creation index, the derivation unit's reroll[, dup]); `lineageHash` is its 64-bit hash, cached in the arena. The
  **derivation unit** is the entity whose derivation run created this one, declared per stage in the registry: the town
  for S4 routes (in destination order) and S6 districts (in seed order); the growth stage for S5 ways (in acceptance
  order); the L1 cell a way split, for new cells (split ordinal); the cell for S8 blocks and lanes; the block for S10
  plots and alleys; the plot for S11 buildings, yard parts and households; the household for people (member ordinal);
  S6's run for `Seam` records (creation index by the run's lowest-then-leftmost vertex); the S5c growth run, the
  district's S8 run (for `baseLane` portals) or the creating edit for portals; the creating edit event (its `seq`) for
  anything a user draws or builds; for any other kind (cells and junctions made by a growth commit, walls, water bodies,
  bridges, greenery), the stage run that created it. The **creation index** is the deterministic creation order of that
  unit's run, or the canonical order the stage declares (for faces and vertices: by their lowest-then-leftmost lattice
  point).
* **Address id** = `kind:token`, prefixed `<layer><island>/` outside the ground layer (`sky2/plot:…`,
  `under/tunnel:…`). For a generated entity the token is the base-32 form of its lineage hash at creation (13
  characters); for a user-created one it is the hash of the creating event's `seq` and its ordinal. The address is
  opaque: the parent is a field and is never parsed from the id (J-DET-1).
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
  local operator of §7.3, template replacement, migration, an epoch):
  - an entity that is **not re-derived** — outside the invalidation set, a fixed input (locked, pinned, edited or
    assigned, §7.2), or merely re-parented — **survives**: it keeps its address and its lineage (so its draws do not
    change); only its `parent` field and a `reparent` lifecycle event change;
    - the kept parts of a designation mutation (§4.7 S11), the rooms a re-cut of a stored plan keeps along the interior
      ladder (item 28 (f), §7.3) and the standing fabric of an epoch — a vacant, derelict,
      ruined, cleared or reused building, a neglected, breached or superseded enceinte, a silted, caved-in or sealed
      tunnel, a waning or settled island (§4.11, II.6) — survive in exactly this sense: address and lineage kept, their
      state a lifecycle change; a `reuse … build` successor raised on a cleared trace succeeds it at the trace's address
      (`supersede`), regrowth on an old plot re-uses the plot's address, and a `raiseIsland` mints the island's arena key
      and lineage from the town's lineage, the slot index and the epoch component, so the same history raises the same
      island (item 8; J-A8.61); a use (§2.7) keeps its own address as it moves — its anchor is (its plot's address, its
      role) — while the building it leaves keeps its own (item 17); the parts a mutation adds are user-created entities
      minted from the causing event's `seq` and ordinal (below); a dossier-backed assignment is a fixed input like any
      assignment, so its element survives every re-derivation of the ground under it (§7.7);
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
  the district a boundary edit regroups keep their names. S13a **draws** a name only in four cases:
  1. for an entity with no predecessor, with the town salt;
  2. for every unedited name under a town-wide `rerollLayer(naming)`, with the new town salt;
  3. for the entities an ids-scoped `rerollLayer(naming)` lists (§7.1), each with its per-entity salt: the dry run gives
     each listed entity the salt one above the largest its name has been drawn with (the town salt and every earlier
     ids-scoped salt the log gave it), and a re-drawn name equal to the old one advances that salt once more, up to
     `reroll.maxAdvance` times (§5.1 (6)); the event stores the salts actually used, so a replay repeats neither the
     choice nor the advances;
  4. for an unedited generated name whose **naming inputs changed**, with the salt its naming record holds. Case (4)
     runs whenever S13a runs over the name's entity: after an `adjust` of the pack list (a pack added or removed, a
     corpus selected or deselected, §7.6); after an `editTable` or `editPreset` that changes a naming slice (§7.6); in an
     upgrade's mapping (§7.5); in a `frozenImport` rebase (§2.9 step 2), over every unedited generated name; at the event
     that ends the name's protection — an `unlock` or an `unassign` that frees it, or an `undo`, `redo` or `revert` whose
     result removes the `setAttr`, `lock` or `assign` that held it (§2.8's dormant record); and in any re-derivation
     whose scope reaches S13a. It compares every slice the name's naming record cites with the current effective tables,
     and a slice whose hash differs, or that no longer resolves (a deselected corpus, a removed row), re-draws the name.

  Each field of a culture or ancestry row is its own naming slice (§7.6), and a name's record cites only the fields its
  draw read, so selecting another corpus for one field re-draws exactly the names drawn from that field: a street list
  chosen for a culture renames that culture's streets, never its districts or quarters. So **a carried name is kept
  exactly while its naming inputs are unchanged**; a change of the features a grammar guard reads (a district that lost
  its gate) is not a naming input and renames nothing (§9.6). Every draw uses the entity's `naming` stream — keyed from
  its entity key (§6.1) with the salt of its case and the attempt — and writes the name's naming record anew. The
  renames of case (4) are confirmed like fates: the dry run lists each, old and new text side by side, in the edit's
  fate report with its other unprotected consequences, the edit commits after the user confirms them (an action whose
  dry run lists any returns `confirm`, a `frozenImport` rebase included), and the confirmed renames are stored in the
  event (`EditBase.renames`, §7.1). A replay or a receiving client re-draws them identically, because the draw is a
  function of the stream, the salt and the inputs at that log position; one that computes different renames reports a
  mismatch under §7.3 item 4's rule. A user-set name (`setAttr`) is an edited attribute, a locked name path a fixed input
  and an assigned name held at its assignment (§7.7); none is re-drawn while protected, and each keeps its naming record
  dormant for the event that ends the protection (§2.8). When carrying or a re-draw brings two equal names into one
  uniqueness scope (§9.6 — a district merge that joins two lanes of the same name), the entity whose address sorts later
  re-draws on its own stream, and the rename is listed in the edit's fate report (J-DET-37, J-DET-46).
* **Anchors and hysteresis.** Matching is by distance, never by quantised cell: candidate (old, fresh) pairs within the
  radius and of the same class family are sorted by (distance, old id, fresh id) and assigned one-to-one greedily in
  that order.

| kind | anchor | radius | class family |
|---|---|---|---|
| plot | its highest-class frontage: (way address, start offset along the way) | 0.5 m along the same way or its successor | use family (residential, commercial, institutional, agricultural) |
| building | footprint centroid | 0.5 m | building class family (a table row: small dwellings; halls and manors; religious; workshops and stores; towers and keeps; …) |
| block, cell | centroid | 2 m (block), 5 m (cell) | — |
| district | its seed feature's address | same feature | district kind family |
| way | its end junctions' addresses; else overlap ≥ 50 % of its length | — | way class family |
| junction, gate, tower, pin | position | 1 m (junction, pin), 2 m (gate, tower) | kind |
| bridge | its deck's midpoint, on the same river (the water body's address or its successor) | the crossing-site search band of §4.2 S1 (5) (`crossing.searchBandM`, default 120 m) | kind (bridge, ford) |
| enceinte, water body, greenery, land use | overlap ≥ 50 % (IoU) | — | kind |
| household, person, label | (plot address, ordinal); (household address, ordinal); target address | — | — |
| use (§2.7) | (plot address, role); a relocation moves it by its event (item 17) | — | use class family |
| room of a stored plan (§2.6) | centroid within its wing, per storey | 0.5 m in the wing's frame | any role: a re-cut along the interior ladder keeps a room's address on its ring even when its role changes, an owner's parlour becoming a family's room (item 28 (f), §7.3) |
| entrance (an indexed vertex role `('entrance', building, i)`, §2.2 rule 7) | carried with its wing by `carryWings` (§2.6); re-matched by (wing, side, offset) when the wing is re-derived | half the side's length | entrance role |
| passage (§2.5, item 30) | (its front plot's address, its kerb end — the midpoint of the passage face's edge on that plot's frontage kerb) | 0.5 m along the same kerb | — (one family) |
| access point (II.7.4, item 12) | (its tunnel's address, the position of its `('access_point', id)` kerb vertex) | 1 m | `AccessPoint.kind` |
| tunnel (§2.7, II.7) | its end junctions' addresses; else overlap ≥ 50 % of its length | — | `Tunnel.kind` |
| sky island (II.6, item 10) | its slot: the key `raiseIsland` mints from the town's lineage, the slot index and the epoch (J-A8.61) | the same slot | — |
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
  offset, buildings, blocks, cells, junctions, gates, towers, pins, bridges, passages by kerb end, access points) are
  matched through a uniform grid per (kind, class family) whose cell is the kind's hysteresis radius, so every candidate
  of an old entity lies in its 3 × 3 cell neighbourhood; candidate pairs are collected, sorted by (distance, old id,
  fresh id) and assigned greedily.
  *Overlap-anchored kinds* (ways and tunnels without matched end junctions, enceintes, water bodies, greenery, land use)
  take their candidates from the kernel's spatial index (§3.3) and compute the overlap on those candidates only; a sky
  island is matched by its slot, no distance read. *Budget:* ≤ 2 µs
  per re-derived point-anchored entity and ≤ 20 µs per overlap-anchored one, median, included in the scope costs of
  §12.6. Measured on synthetic anchor sets (Apple M1, Node 24; `docs/validation/bench/fixall_det_r2_match.out`): 0.60 µs
  per entity for a 450-building district regeneration, 0.59 µs for a 30 000-entity CITY re-derivation (0.38 µs when the
  fresh town is unrelated to the old one) and 0.59 µs for an 80 000-entity METROPOLIS mapping at a 2 m radius.
  *Measurement (M0 d, then M1 on B-EDIT-lite and a Re-derive-from-S1 fixture):* the routine inside the engine, on real
  anchors, per kind. *Pre-decided fallback:* matching runs per static-index partition (§3.3) — each old entity's
  candidates are first taken from the fresh entities of its own district's partition, and only the entities left
  unmatched are matched across partitions — which bounds every grid by one partition; because an entity near a district
  boundary can then take a farther candidate inside its own district, the switch is a declared shift (§6.4).
* **JOIN and SPLIT — the address by the anchor, the lineage continued (item 31 (c); J-A31.73).** A joined plot takes its
  address by the anchor rule from the member whose frontage anchor it keeps; the other members become tombstones with
  `supersededBy` = the joined plot, and `members` is history. Its **lineage** is not fresh: the fused plot continues the
  lineage key of its largest member by area (ties by address id) — the exception to J-DET-2, which gives a re-derived
  successor the address only — so the streams of its buildings and yard parts continue from that member's and the same
  seed under the same history re-cuts the same fabric; the epoch component of every draw (§6.1) keeps an epoch's re-cut
  distinct from the parent's original draws without breaking the tie to them (the owner: modifications of the original
  seed, not new rolls). A SPLIT keys each child by the parent's lineage key with the child's index as its creation index:
  the child that keeps the parent's frontage anchor keeps the address and the others take fresh addresses; every child
  takes the continued lineage, the parent's lineage key with its child index; a later SPLIT **resurrects** a member
  whose anchor matches — the one permitted reuse of a tombstoned id, recorded as a `resurrect` event, safe because a
  JOIN's member ids were never given to another entity — and the resurrected member takes its address from the
  tombstone, its lineage from the parent and the child index, and
  its `builtBand` (§2.5) from the rung-3 event that re-cut it, never from the tombstone's last record; only an `undo`
  restores that record exactly (§7.4). A mutation continues lineage; only a re-derivation takes a fresh one — New
  random, and every successor the matching above gives in a re-derived scope (Adjust, Re-derive from Sk, a local
  operator of §7.3, template replacement, migration, what an epoch re-derives) (J-DET-2, amended so).
* **Document identity.** `docId` (a UUID) is minted when a document is created, kept on save, and re-minted on clone
  and save-as; addresses are document-scoped, so a clone keeps them. At the API and bridge boundary every id is rendered
  `<docId>/<id>`, so a host holding two towns never confuses their plots. Exports carry addresses and a supersedes table
  (tombstone → successor).
* **Workers** merge results in lineage order, never arrival order.

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

=== REPLACE ### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation ===
### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation

```ts
interface EditBase { seq: number /* from the document's nextSeq; never reset; survives rebase; an event an epoch carries in `EpochInputs.dossier` takes its seq when the epoch is appended (§7.7 item 6; J-A22.76) */; author: 'user'|'host'|'epoch'|'migration';
  session: string /* the authoring session, per document and author (§7.4): its undo and redo stacks; never read by the fold */; group?: number /* one undo step */;
  renames?: Rename[] /* on every event whose fold re-draws a name by §6.3's case (4): the renames its dry run listed and the user confirmed (§7.3 item 4) */;
  dossier?: DossierRef /* set by the host door (§11.4) on every event a dossier change generates: the dossier's own element id, opaque to the module (§7.7, item 20) */;
  creation?: true /* set by `generate` on the blueprint's and the creation dossier's `assign` events at positions 0…k — the log's creation prefix, which the base derivation's S2 reads ahead as fixed rows (§7.4, §4.2; J-A22.74); never an undo, redo or revert target and never truncated (§7.4) */;
  mutations?: MutationRecord[] /* §4.7 S11's records of the designation mutations the event ran, persisted with it like `renames` (item 18) */;
  disruption?: DisruptionReport /* a dossier event's, a positive placement's or a relocation's consequences — what moved, was joined or vacated, and why — as its dry run listed them (§7.3 item 4, §7.7, item 22 (b)) */ }
type Rename = { id: Id; from: string; to: string };   // the name's text before and after, as the user saw them
type DossierRef = { element: string; version?: string };   // the dossier's identifier for the element; the module reads it, never writes it (§7.7)
type RungKey = string;   // `${Id}#${rung}`: a stage-3 rung's reroll counter in a `regenerate` event's map — `<building id>#wings` … `#plan.furnish` (§6.1)
interface DisruptionReport { cost: number; budget: number /* the request kind's row, §7.7 */; overBudget: boolean; moved: { use: Id; from: Id; to: Id | null }[]; joined: Id[][]; vacated: Id[]; mutated: Id[]; why: { id: Id; rule: string }[] }
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
  | { t: 'delete'; id: Id } | { t: 'merge'; ids: Id[] } | { t: 'split'; id: Id; cut: PointCm[] } | { t: 'join'; ids: Id[] }   // on plots, split and join are item 31's splitting and fusion (below); delete never removes a dossier-backed element — it becomes rejectSite (§7.7)
  | { t: 'rejectSite'; element: Id /* the dossier-backed assignment or its placed member */; site: Id /* the plot */; op: 'reject'|'lift' }   // item 20 (b): a rejection, never a removal; its lapse is written by the epoch or dossier event that causes it (§7.7)
  | { t: 'placeAt'; plot: Id; element?: Id /* a dossier-backed element or assignment member pinned here */; designation?: Designation /* §4.7 S11: a use the generator controls, designated here */; lift?: boolean }   // item 20 (g): positive placement; lift frees the plot
  | { t: 'setEntrance'; building: Id; op: 'add'|'move'|'remove'; index?: number /* the entrance edited, by its indexed role */; role?: Entrance['role']; wing?: number; side?: number; offsetCm?: Cm }   // item 29: the main entrance may be moved along its street-facing side, never removed
  | { t: 'drawPassage'; plot: Id; from: PointCm; to: PointCm; widthCm: Cm }   // item 30 (c): a covered passage under the front building's ground storey, as §2.5's passage face; sealing and reopening are convert ops (§4.11)
  | { t: 'drawTunnel'; points: PointCm[]; kind: Tunnel['kind']; widthCm?: Cm; headroomCm?: Cm }   // items 11, 12: a `tunnel` chain on the underground arena — never a `drawWay`, which U2 forbids there (II.7.3); width and headroom default to II.7.2's profile row, `navigable` derived from them (§2.7)
  | { t: 'placeAccess'; kind: AccessPoint['kind']; role: AccessPoint['role']; ground: PointCm; tunnel: Id }   // item 12 (d): a new AccessPoint (II.7.4) opening at `ground`, its `access_point` vertex placed on `tunnel`'s kerb at the nearest point; its tunnel end moved by `moveVertex` on that vertex, its opening by `setAttr` on `ground.at` (re-hosted by `pointLocate` on the ground's `PlatKey`, `ground.host` rewritten, refused as F-EDIT outside II.7.3's admitted ground); removed by `delete`
  | { t: 'setRoomRole'; building: Id; storey: number; room: Id; role: RoomRole }   // the plan events (item 28; the records are §2.6's): a role change re-derives what hangs off roles — windows, door kinds, furniture — and moves no wall
  | { t: 'moveWall'; building: Id; storey: number; wall: Id; deltaCm: Cm }         // slides a partition wall along its normal (mergeFaces then splitFace on the rung's transient arena, §3.4); both rooms re-checked against their rows' minimum area — F-EDIT when one falls below it
  | { t: 'splitRoom'; building: Id; storey: number; room: Id; cut: [PointCm, PointCm]; roles?: [RoomRole, RoomRole] }   // splitFace
  | { t: 'mergeRooms'; building: Id; storey: number; rooms: [Id, Id]; role?: RoomRole }   // mergeFaces, refused across a wing joint; one room, the surviving role chosen or given, the removed wall's openings dropped
  | { t: 'setOpening'; building: Id; storey: number; wall: Id; at?: Cm; kind: 'door'|'arch'|'open'|'none' }   // an entrance's door moves with its entrance (setEntrance) and is never removed here
  | { t: 'setWindow'; building: Id; storey: number; wall: Id; at?: Cm; op: 'add'|'move'|'remove' }   // exterior walls only
  | { t: 'moveStairCore'; building: Id; core: Id; bay: Polygon }                      // moves the bay on every storey it serves; each storey's partition re-runs around it, plan.layout kept where the wing is unchanged
  | { t: 'setRoomUnit'; building: Id; storey: number; room: Id; unit?: Id }             // item 28 (f): the household whose dwelling unit the room belongs to (§2.6's `Room.unit`); absent for a shared, service or circulation room; F-EDIT when it would leave a unit without its own door onto circulation or the street
  | { t: 'revert'; id: Id }   // "reset to generated": one undoable event that applies, in reverse log order, the inverses of every logged event whose target is this entity (its own edits only, never a `creation` event, §7.4); ctrl / cmd+click (§14's keymap, MFCG's ctrl-click reset)
  | { t: 'regenerate'; scope: EditScope; mode: 'keep'|'newRandom'; rerolls: Record<Id | RungKey, number> /* absolute, per scope entity — with `rung`, the rung's counter: the rerolls actually used (§5.1 (6)) */; rung?: 'wings'|'rooms'|'plan'|'plan.layout'|'plan.roles'|'plan.furnish' /* item 28: New random on one rung of one building, advancing that rung's counter only (§6.1; the map's key is `<building id>#<rung>`); absent: the whole scope as today */; discardEdits?: boolean; fates: EditFate[] }
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
// Designation and MutationRecord are §4.7 S11's, RoomRole and Entrance §2.6's, ConversionOp §4.11's
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
* **A designation change is neither.** `assign`, `unassign`, a `setAttr` on a plot's use or class, a relocated use and
  a dossier event run §4.7 S11's mutation of the standing design toward the new designation's template — kept parts
  kept, additions and subtractions recorded — never a re-derivation and never a re-roll (§7.3 item 8, item 18); a click
  on a stale elaboration rung re-derives it the same way, from its canonical prior (§7.3's table: the stored plan, else
  the as-built plan carried along §2.6's interior ladder — never the cache; item 28, item 28 (f)).
* **Adjust** re-solves with a changed parameter. Locality is promised only for parameters the control registry (§7.8)
  lists as consumed at S10 or later, or that carry a spatial scope (a district's density, a block's granularity). A
  parameter consumed earlier (seed, rung, water setting and side, walls, castle option, gate count, planned ↔ organic,
  wealth level, the recipe's pack list) has no local operator and is offered as **Re-derive from stage k**: everything
  from Sk down re-derives with carry-over (§6.3), and the user confirms the edit-fate report first.
* **Same kind, new seed** is Enter's successor — a new document with seed + 1 that keeps the recipe and the
  dossier (§6.1); per district
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
buildings' uses, households and assignments atomically, footprints staying — two `relocateUse` conversions under one
event (§4.11, item 17); a use is opened, closed or relocated by hand through `convert` with `openUse`, `closeUse` and
`relocateUse`, the building persisting vacant or converted (§4.11). `fill` forces an arrangement (dense row
fill, for instance) on the scope's plots and re-runs S11 there.

**Entrances, basements, passages and plans (items 28–30).** `setEntrance` adds, moves or removes a side, rear, yard or
service door under §2.6's rules — it never removes the main entrance, which may only move along its street-facing side —
and `setAttr(basement)` overrides the derived basement decision (an edited attribute, §7.2); `drawPassage` reserves a
covered passage under the front building of a plot as a passage face (§2.5) that gives the plots behind it their access
rows, and `convert` with `sealPassage` / `openPassage` (§4.11) seals or reopens one by setting `Passage.sealed` (§2.5);
`setAttr(knownTo)` hides or reveals a place's name and purpose for §9.2's label policy, a dossier-backed institution's
`knownTo` being the dossier's fact,
which a later dossier event re-imposes over a map override, reported (§7.7, item 30); the plan events above edit a
building's stored plan storey by storey, the first of them storing the composition (§2.6), each dry-run against §13.2's
plan bars on the overlay, so a move that would leave a room below its row's minimum or unreachable, or a unit without
its own door (item 28 (f)), returns F-EDIT and never a silent repair; a building's household count is changed by hand
through `convert` with `relet` (§4.11) within §2.6's capacity, which marks an unstored plan stale and re-cuts a stored
one inside the event (§7.3); a click on a building or a neighbourhood logs nothing (item 28 (c)).

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
| reservations (§2.5) | `setAttr` on a market's `rank` (`principal` or `secondary`, item 24): a Re-derive from S3 with its fate report, §4.2 S3 (12)'s batch taking the edited rank as a fixed input (J-A24.71) |
| blocks, plots | `split` and `join` (item 31's splitting and fusion: the least-disruption re-cut of §4.7 S10 (7) with S11's mutator, neighbours fixed, undo exact — §7.4), `merge`, `fill`, `setAttr` (use, owner, `knownTo`; a block's `reach` — `open`, `passage` or `gated` — which re-derives the block's interior by S10 (7)'s re-cut with its neighbours fixed, J-A30.72; never `builtBand` or `builtProsperity`, derived state written only by the paths §4.11's floor paragraph lists — J-A31.44, J-A31.71; never `exposure`, derived from the access rows; never a block's `due`, derived and written only by §4.11's ladder), `regenerate`, `lock`, `assign`, `placeAt`, `rejectSite`, `drawPassage`, `convert` (`plotToGarden`, `amalgamate`, `subdivide`, `densify` (`infill`, `back_court`), `thin` (`infill`, `back_court`), `sealPassage`, `openPassage`; §4.11) |
| buildings | `drawFootprint`, `build`, `moveFootprint`, `swapUse`, `paint`, `setAttr` (class, heights, roof, basement, `knownTo`, `condition` — an edited attribute §4.11's rung 1 then leaves as set, §7.2, J-A31.76), `setEntrance`, `delete` (a generator-added building only; a dossier-backed one becomes `rejectSite`, §7.7), `convert` (demolish, abandon, decay, ruin, clear, rebuild; vacate, reoccupy, reuse; openUse, closeUse, relocateUse, mutate; `relet` — the household count within §2.6's capacity, item 28 (f) — §4.11), `assign`, `regenerate` with `rung`, the plan events (item 28; `setRoomUnit`, item 28 (f)), `lock` on a room's path (`plan/rooms/<id>`); derived, no edit kind of their own: `nextEntrance` (written by §2.6's entrance derivation and `setEntrance`), `reusedAs` (written by `convert` `reuse`, §4.11), `formerUses` (written by the use conversions that close a building's use or move it elsewhere, §4.11), `predecessor` (written by `reuse … build`, §4.11) and each slot's `frontage` (§2.5's `BuildingSlot`: from the designation template, re-derived by S11's mutator) |
| walls, gates, towers | `drawWall`, `moveVertex`, `setAttr`, `delete`, `convert` (wallToWay, gateToJunction; neglect, breach, dismantle, contractWall — §4.11); derived, no edit kind of its own: an enceinte's `supersededBy` (written by `contractWall`, §4.11) |
| uses (§2.7) | `convert` (openUse, closeUse, relocateUse — §4.11), `swapUse`, `setAttr` (specialisation), `assign` / `unassign` and the assignment's `pinned` (§7.7); a use's address moves with it (§6.3) |
| institutions (§2.7) | `setAttr` (`knownTo`, name), `assign` / `unassign` (§7.7); a dossier-backed institution's `knownTo` is the dossier's fact, which the next dossier event setting it re-imposes over a map override, reported (§7.7 item 7; J-A30.72) |
| tunnels, access points (II.6, II.7; staged, editable in the base) | tunnels: `drawTunnel`, `moveVertex`, `setAttr` (kind, `widthCm`, `headroomCm` — `navigable` re-derived from them, §2.7), `delete`, `convert` (silt, caveIn, seal, reopen) — a tunnel's condition is no `setAttr` path: it reads `existence` and `closure`, so a condition change is the matching `convert` (J-A11.21), and the profile preset is II.7.2's network choice, not a tunnel field; access points: `placeAccess`, `moveVertex` on the `access_point` vertex (the tunnel end), `setAttr` (kind, role; `ground.at`, the opening — re-hosted by `pointLocate` on the ground's `PlatKey` and refused as F-EDIT outside II.7.3's admitted ground), `delete`; `setLayer` on `underground` is the CITY / METROPOLIS visibility toggle (§7.8); J-A12.71 |
| sky islands (II.6; staged, editable in the base) | `setAttr` (area, altitude, state), `lock`, `convert` (resizeIsland, settleIsland, fallIsland, refloatIsland, raiseIsland); `recipe.layers.islands` is an `adjust` that re-derives from S7b (§7.8) |
| terrain and water conversions (§4.11, item 25) | `convert` (`reclaim`, `siltReach`, `shiftCourse`, `digCanal` — the slow conversions the evolution engine will schedule, usable by hand now), repaired through S1's terrain or water operator or the carve: a marsh's `reclaim` by the terrain operator (§7.3 (a)), a foreshore's `reclaim`, `siltReach` and `shiftCourse` by the water operator (§7.3 (b)), `digCanal` by the carve (§4.11); derived, no edit kind of its own: `LandUse.reclaimed` (written by `reclaim`, §2.3, §4.11) |
| greenery, trees | `drawGreen`, tree brush, `instance`, `setAttr`, `delete` |
| fields | `setField` (prosperity, density, greenery); `setAttr` on the town's `FieldBands` (an explicit re-banding) — both authorial: the blocks they re-derive past τ take the new field as their built state and their plots' `builtBand` (§7.2, item 31) |
| names, labels | `setAttr` (text), `moveLabel`, `hideLabel`, `rerollLayer(naming)` town-wide or on chosen entities (`ids`) |
| layers, style | `setLayer`, `setStyle`, `paintGround`; view keys are not logged (§2.9) |
| people, households | `setAttr`, `setAttrMany`, `lock` with paths, `regenerate` (person scope), `pin`; a household's building and its dwelling unit (§2.7, item 28 (f)) follow `relet` and item 17's relocation (§4.11, §10.3), never a bare `setAttr` |
| close-ups (stage 2) | every kind above on close-up entities, after `closeup`; `instance` for presentation edits |
| rule tables, presets | `editTable`, `editPreset` (row operations, §7.6) |
| history | `epoch`, `convert`, `rebase`, `upgrade`, `undo`, `redo`; the dossier events — `assign`, `unassign` and `setAttr` with `EditBase.dossier` set, in the host's order (§7.7); the creation prefix's `assign` events carry `EditBase.creation` (§7.4) |

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
A dossier event or a positive placement is dry-run like any edit: its disruption — every moved use, joined or vacated
plot and mutated building, each with the rule that caused it — is computed against the request kind's budget row
(§7.7) and stored in the event (`EditBase.disruption`); a dossier event over budget still lands, because the dossier's
authority is absolute (§7.7), and is reported over budget, while a user's positive placement over budget, or one that no
plot satisfies inside the hard rows, returns F-EDIT with the closest acceptable sites (§4.7 S10b). A `join` or `split`
of plots that would remove an occupied building returns F-EDIT — "vacate first", item 17's relocation — unless the user
confirms the demolition as a fate (item 31). A map event — one without `EditBase.dossier` — that would close,
remove or re-designate a dossier-backed element (§7.7 item 2's list) returns F-EDIT with `rejectSite` and `placeAt`
offered (J-A20.75).

=== REPLACE ### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes ===
### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes

* **Protection.** A **locked** entity — or the locked attribute paths of one — is a fixed input: regeneration never
  changes it and re-derives its dependants around it. A **pinned** entity keeps its existence and position; its other
  attributes may re-derive. An **edited** attribute implicitly pins that attribute and the entity's existence against
  Regenerate and New random (IMPROVEMENTS O9's "locked and edited entities are never mutated") unless the user chooses
  **discard edits in scope**, which is only possible by confirming the fate list (§7.3 item 4) and is recorded in the
  event. An **assigned** attribute is held at its assignment within the drift bounds (§7.7). A **dossier-backed** element (an
  assignment with `existence: 'dossier'`, §7.7) has its existence held on every map: a map `delete` of it is recorded
  as `rejectSite` (§7.7), a map event that would close, remove or re-designate it is refused as F-EDIT (§7.7 item 2's
  list),
  and a regeneration under it re-places it by §4.7 S10b's solver when its plot goes; its position
  is not held unless the assignment is `pinned` or a positive placement pins it. A **positive placement** (`placeAt`,
  §7.7) pins its element or designation to its plot and is kept by every re-derivation and dossier re-application that
  can honour it, reported when one cannot. Every finer face under a
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
  re-composites it over its new drivers. A brush is authorial: the blocks it re-derives take the new field as their built
  state — S10 and S11 read it and the plots' `builtBand` (§2.5) is set to the band they are re-cut for — so the static
  base behaves exactly as it did before item 31, whose geometry floor governs wealth change over epochs only (§4.11;
  J-A31.72); an epoch never re-derives a block by τ — it acts on survivors only through §4.11's ladder, bounded by the
  floor.
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
  stands on the new ground exactly as a reload would compute it (J-DET-24) — the field re-evaluation authorial like a
  brush (above) — and re-derives the basement decision of every building whose terrain gate changed (§2.6, item 29).

=== REPLACE ### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8 ===
### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8

**Replay semantics.** The log is an **ordered fold**: each event applies to the state its predecessors produced,
through the same code path interactively and on replay; nothing is hoisted, and epochs, rebases, upgrades, undo and redo
are events like any other. **The one read-ahead** is the creation prefix: the base derivation's S2 reads the log's
`creation` events — the blueprint's and the creation dossier's `assign` events at positions 0…k (`EditBase.creation`,
§7.1) — as fixed rows before it runs, and folding those events afterwards records the generation run's placements and
places nothing a second time (§4.2; J-A22.41, J-A22.72, J-A22.74). A `creation` event belongs to the base derivation
it feeds, not an edit of the map it made: it is never an `undo`, `redo` or `revert` target — the undo key and `revert`
skip it, and an `undo(h, of)` naming it returns F-EDIT offering `unassign` for a blueprint assignment and `rejectSite`
and `placeAt` for a dossier element (§5.2) — and it is never truncated. A blueprint assignment is removed by
`unassign` (§7.3 item 8's mutation), a dossier element only by a dossier event (§7.7 item 2). In the table,
"case (4)" means the event runs §6.3's case (4) for the name it frees or whose inputs it changes, the rename listed,
confirmed and stored in the event (§7.3 item 4).

| kind | create | read | persist | regenerate (how the engine honours it) | undo | migrate between output versions |
|---|---|---|---|---|---|---|
| lock / unlock / pin / unpin | UI or API on any address, optionally on attribute paths | entity `flags` (derived from the log) | log | a fixed input; dependants re-derive around it; a lock on a name path keeps the naming record dormant (§2.8); an `unlock` that frees the name runs case (4) | inverse event; undoing a `lock` that frees a name runs case (4); an unlock that re-drew a name keeps the former name and naming record in its undo record, which its undo restores | address mapped (§7.5); an orphaned lock re-imposes its last geometry as a drawn constraint unless the user drops it |
| setAttr / setAttrMany / paint | UI / API; a bulk query resolved to ids at dry run | entity attributes; `flags.edited`, `editedPaths` | log | an input override at the stage that computes the attribute (a name: S13a keeps it and never re-draws it while edited, its naming record dormant; a district kind: S6 reads it as fixed; heights and roof: S11); implicitly pinned (§7.2) | inverse (old values in the undo record); undoing or reverting a `setAttr` on a generated name returns it to unedited with its dormant naming record and runs case (4), the text it replaces kept in that event's undo record | attribute names schema-versioned with a rename table; unmappable → orphan, reported |
| moveVertex / warp | vertex handle, stored as lattice point + role signature / staged warp session with Apply (§7.1) | geometry | log: the operation (arena key, strokes, `fromLevel`; a `moveVertex`'s `at` with its `VertexSig`); per-vertex displacements only as a verification record | the kernel's whole-step validation, halving, sliding and holding (§3.6); kernel-pinned vertices move (pins constrain smoothing, simplification and cutting); what stands on the ground is carried and re-based (below); moved water goes to S1's water operator (§7.3 (b)) | undo record: moved vertices, re-derived faces, the former birth levels and flags of promoted and demoted vertices and edges, the former points of displaced records, former wing rings, basement rings and stored compositions, former bases of re-based entities | the operation replays at its log position; a `moveVertex` binds by `resolveVertexAt` — the exact point, else a signature match within the rebind radius, else orphaned and reported |
| moveCourseKnot | dragging a river's control knot | `WaterBody.controls` (§2.3); the knot's path `controls/<ordinal>` in `editedPaths` (implicitly pinned, §7.2) | log: the water body's address, the knot's ordinal, `at`, `to` | S1's water operator (§7.3 (b)); every later re-trace keeps the moved knot | undo record: the replaced scope of the whole chain and the knot's former position | once the water body's address is carried (§6.3), binds (1) the knot with that ordinal if within the rebind radius of `at` — half the body's control spacing (§4.2 S1 (3)); (2) else the body's nearest knot within the radius, ties by ordinal; (3) else orphaned and reported; never a knot of another body |
| drawWay / drawWater / drawWall / drawGreen / drawBoundary | drawing tools with resampling, snapping (first-crossing split, attraction) and validation at the authoring boundary (§7.1) | entities with `existence = built`, author `user` | log (the geometry is the payload) | at its log position through its class's local operator (§7.2, §7.3), chained operators included | undo record: the replaced scope of the whole chain | the same geometry replays at its log position under the new version |
| drawTunnel / placeAccess (items 11, 12; J-A12.71) | the underground tools (II.7; a staged layer, editable in the base) | the `Tunnel` record and its `tunnel` chain; the `AccessPoint` record and its `access_point` vertex (§2.7, II.7.4) | log (the geometry is the payload) | at its log position: a drawn tunnel through II.7's network stage (its chain inserted on the underground arena, `navigable` derived) and the underground stage re-deriving the underground blocks its edges bound (§7.3's staged-layers row); a placed access point by II.7.3's access rules, its ground host found by `pointLocate` on the ground's `PlatKey`, nothing on the ground written; an access point's tunnel end moves by `moveVertex` on its `access_point` vertex and its opening by `setAttr` on `ground.at`, re-hosted the same way and refused as F-EDIT outside II.7.3's admitted ground (§7.1) | undo record: the replaced underground scope; a moved opening's former `ground.at` and `host` | the same geometry replays at its log position; an access point whose tunnel is unmapped is orphaned and reported |
| drawFootprint / build / moveFootprint / swapUse / fill | building tools (§7.1) | building and plot entities | log | S11 re-fits the host plot(s) with the footprint as a fixed slot; `fill` re-runs S11 on its scope with the forced arrangement | undo record | replays; a footprint whose host plot is unmapped re-creates a plot around it |
| delete / merge / split / join / convert (incl. the ladder kinds — `relet`, `densify`, `thin`, `subdivide`, `amalgamate` —, the decline kinds, the tunnel and island kinds, the use kinds, the sealing kinds and the terrain and water kinds of §4.11) | context actions; the evolution engine's plan (§4.11) | lifecycle events with cause | log | structural ops on the plat (§3.4): a district or way `split` / `merge` with dependants re-derived; a plot `join` or `split` is item 31's fusion or splitting — S10 (7)'s re-cut of the members with their neighbours fixed, S11's mutator on the result, no occupied building removed unless confirmed (§7.1, §7.3 item 8); `convert` = `retypeEdges` plus lifecycle events; decline conversions change `existence` and the drawing (§2.8), credit or debit the material ledger (§4.11), and a `reuse … build` succeeds at the trace's address (§6.3); tunnel conversions change the tunnel's `existence` and `closure` (its condition reads them, §2.7; J-A11.21) and close or reopen the frontage plots on the run (II.7.3); island conversions resize an arena or archive it (`fallIsland` lays the ruin face through the carve path, §4.11); use conversions open, close or relocate a `Use` (§2.7) with `detail.from` / `to` and mutate the buildings by S11; `relet` sets a building's household count within §2.6's capacity (item 28 (f)) — households added are minted from the event, households leaving go by item 17's relocation (§4.11, §10.3) —, marks an unstored plan stale and re-cuts a stored one inside the event (§7.3), no shell geometry changed; `densify … infill` and `thin … infill` add or clear yard buildings by S11's mutator; `densify … back_court` and `thin … back_court` re-cut the plot's yard by S10 (7) with its neighbours fixed, adding or removing a rear row and its passage face (§4.6, §4.11); `subdivide` and `amalgamate` are rung 3's re-cuts, whose hand forms are §7.1's plot `split` and `join`; `sealPassage` / `openPassage` set `Passage.sealed` (§2.5), change no geometry, and vacate or reoccupy the plots behind it (§4.11; item 30); `siltReach`, `shiftCourse` and a foreshore's `reclaim` run S1's water operator (§7.3 (b)), a marsh's `reclaim` its terrain operator (§7.3 (a)), and `digCanal` is the carve (§4.11); a split or join of a chain carrying a profile (a way's width, a wall's base, a tunnel's invert, a shore's bank kind or class) goes through `retypeEdges`' `rekey` on the part's `StretchRef` (§3.4) — each part gets a cut knot carrying the sampled value, a join knot is dropped only where the joined profile is unchanged (§2.2 rule 5) — and the event writes both records' returned profiles | undo record: members resurrect with their former rings, records and `builtBand`, tombstones return to live, both records' former profiles; a decline or tunnel conversion's former state and ledger rows; a fallen island's arena restored from the archive and its ruin face removed through the carve path's inverse; a `reuse … build` undo returning the address to the trace; a use conversion's former use and building links; a `relet`'s former count, household links and stored plan; a ladder conversion's former rings, records and passage face; a terrain or water conversion's replaced chain scope with the records §2.3 lists; a mutation's inverse record | same |
| regenerate / adjust / re-derive from Sk | the named actions on an area, district, block, plot or person | report entry; the fate list | log: resolved scope, mode, absolute rerolls used, confirmed fates and renames | §7.3; New random's content check (§5.1 (6)); a pack-list `adjust` and any re-derivation reaching S13a run case (4) for the unedited names citing a changed slice; `Adjust` re-derives with the current field and sets `builtBand` in its scope, listed in the fate report, while Regenerate (keep settings) keeps it (item 31) | undo record: the effective scope's faces, entities (names and naming records included), lifecycle events and tombstones, O(scope) — an undo restores the former names, never re-draws them | the scope replays; fates and renames recomputed and compared under §7.3 item 4's rule |
| assign / unassign (a dossier event among them, `EditBase.dossier` set) | assignment dialog / host API / the host door (§11.4) | `assignment` fields, `flags.assigned`; a dossier-backed assignment's `existence: 'dossier'` (§7.7) | log; blueprint and dossier-at-creation assignments at positions 0…k, flagged `creation` and read ahead by S2 (Replay semantics, above) | §4.7 S10b places (claims-first at positions 0…k, the least-disruption order after the city is built) and §4.7 S11 mutates each placed plot, the record in `EditBase.mutations`; an assigned name keeps the naming record dormant; an `unassign` leaves the plot vacant (`closeUse`, §4.11) and frees the name, which runs case (4); a dossier-backed element's existence is held (§7.2) | the inverse mutation from the undo record (§4.7 S11 rule 5) and the former placements | addresses and criteria; unmapped members re-solve around the mapped ones (§7.7); a dossier element re-binds by its `DossierRef` |
| rejectSite / placeAt (item 20 (b), (g)) | the map's "delete" of a dossier-backed element; the "make this place X" action | the rejection record and the plot's pin (§2.8, §7.7) — model data | log | `rejectSite`: the element is re-placed by §4.7 S10b's solver at the event's position and the site is excluded while the rejection holds; the hold lapses — the site eligible again — by §7.7's lapse rule (item 3), the lapsing event writing the lapse into the record inside its own touched set, never as a log event of its own (J-A20.74); `placeAt`: the plot is pinned to its element or designation, honoured by every later placement and re-application that can, reported when one cannot | inverse (`lift`); the re-placement's scope restored from the undo record; an undo of the lapsing event restores the hold | by the site's and the element's addresses; an orphaned rejection or pin is reported |
| setEntrance / setAttr(basement) (item 29) | building tools (§7.1) | `Building.entrances`, `Building.basement` (§2.6); `editedPaths` | log | edited attributes: a moved main entrance and an added, moved or removed door are fixed inputs of the site plan, carried with the wing (§2.6) and re-fitted around by S11's mutator on a designation change — a house that becomes a shop gains its street door, a shop that closes keeps its door as a house door (§4.7 S11); an edited basement is kept through terrain changes (§7.3 (a) 4) | inverse | with the building's address; an entrance whose wing is unmapped is re-placed by §2.6's rules and reported |
| drawPassage / sealPassage / openPassage / setAttr(knownTo) / setAttr(reach) (item 30) | context actions on a plot, a block, a building or an institution | the passage face and its `Passage.sealed` bit (§2.5; an access row on a sealed passage face reads sealed), `Block.reach`, `Plot.knownTo` / `Building.knownTo` / `Institution.knownTo` | log | the passage face and the rear plots' access rows are fixed inputs of S10's re-cut; an access row on a sealed passage is skipped by §5.3's reachability walk and the plots behind it decay as vacant under §4.11's ladder; a `setAttr` of a block's `reach` re-derives its interior by S10 (7)'s re-cut with its neighbours fixed (J-A30.72); `knownTo` is read by §9.2's label policy only — no model geometry changes; a dossier-backed institution's later dossier value re-imposes over a map override, reported (§7.7) | inverse | by address; a passage whose building is unmapped is reported |
| plan events (setRoomRole, moveWall, splitRoom, mergeRooms, setOpening, setWindow, moveStairCore; item 28; setRoomUnit, item 28 (f)) | the plan tools on the building band (§8.5) | the stored composition's plan (§2.6); a room's `unit` (§2.6) | log; the first plan event stores the composition (§2.6) | a fixed input to the rung's re-derivation — a stored plan whose inputs change is re-cut inside the changing event around the edited rooms, as any edited attribute is (§7.2), from the stored plan as its canonical prior (§7.3's table); an edited unit is kept while its household still lives in the building and listed as a fate when it leaves; `carryWings` carries the rooms with the wings | undo record: the former storey | by the building's address and the room's anchor (§6.3); else orphaned and reported |
| regenerate with `rung` (item 28) | New random on one elaboration rung | the rung's counter (§6.1; the event's map under `<building id>#<rung>`) | log | the rung re-derives with its advanced counter under §5.1 (6)'s content check, which compares the rung's own derived result, identity left out (an unstored rung is outside every digest, §6.2); re-rolling a finer rung changes no coarser stream (§6.1): `plan.layout` keeps the wings, entrances and stair core, `plan.roles` every wall and opening position | the previous counter; the rung's cached result is recomputed, never stored in the record | replays |
| `builtBand` (a plot attribute, item 31 — not an event kind: its paths) | the writers §4.11's floor paragraph lists (J-A31.44) | §4.11's ladder; S10 and S11 through the manifested band `max(field band, geometryFloor)` (§4.7 S10 (2), S11) | the plot's attribute columns (§2.9), in the leaf digest | Regenerate (keep settings) keeps it; `Adjust` and a brush reset it in their scope (authorial, §7.2; J-A31.72); an epoch writes it only through §4.11's writers — a rung-3 event, rung 2's back court for the new rear plots it creates (which take their stock's band), a completed upward refurbishment (which raises it) — so a standing plot's `builtBand` is lowered only by a rung-3 event | restored by the undo record of whichever event wrote it | a document written before the attribute existed gets `builtBand` = the band its plot's `DerivationRecord.band` holds (§7.5) |
| setField (brush) | prosperity / density / greenery / terrain brush; the terrain brush's `water` mode (§7.2) | the stroke list; the composited field or heightfield | log (strokes) | field strokes: blocks whose inputs moved beyond τ re-derive (§7.2); terrain strokes: S1's terrain operator (§7.3 (a)), in `follow` mode with the water operator; a brush is authorial and sets `builtBand` in the blocks it re-derives (§7.2) | the stroke leaves the list; the field or heightfield re-composites (exact) and the operator re-runs on the stroke's region | strokes are geometry and replay |
| editTable / editPreset | tables editor, presets dialog | the override layer (§7.6) | log: row operations by key with the base row's hash; the fallback's confirmed fates; renames | entities whose derivation record, naming record or provenance cites a changed slice hash re-derive; a changed naming slice runs case (4) for exactly the unedited names citing it; a predicate table, or a kind whose recorded slices are unavailable, re-derives from the table's first reader stage with fates (§7.6) | inverse row operations; the re-derived entities — renamed names with their former naming records among them — restored from the undo record, never re-drawn | a row that changed or vanished in the new table version → orphan, reported and kept |
| instance (and the tree brush) | tree tools (a batch of `instance` events), instance handles | the entity's instance set with its overrides | log | applied by ordinal while the entity's lineage is unchanged since the event (no `carry` or supersession after its `seq`) and the ordinal's generated position lies within 0.5 × the spacing of the recorded `point`; otherwise re-matched by position to the nearest unclaimed instance within 0.5 × the spacing (a superseded entity's overrides move to its `supersededBy` successor), else orphaned and reported (§8.10) | inverse | ordinals are geometry-stable only under the same lineage; otherwise re-match by position |
| rerollLayer | "reroll names / trees / decoration / compass / emblem" — §6.1's rerollable concerns; names also on chosen entities (`ids`) | the effective salt: the recipe's initial value set by the log's town-wide `rerollLayer` events; for an ids-scoped naming reroll, the per-entity salts in the event | log: absolute salts (with `ids`, those used after §6.3's case (3) advance) | naming: S13a re-draws every unedited name (town-wide) or the listed entities' unedited names, uniqueness by §9.6; instances, crowns, jitter: display only; compass and emblem: furniture only (§9.5) | the previous salt; for naming, the previous names and naming records from the undo record | replays |
| revert (reset to generated) | ctrl / cmd+click, context action | the entity's own logged edits | log (one event) | the inverses of the entity's own events applied in reverse log order at the revert's position; edits to other entities stay; a name it frees runs case (4) | inverse: re-applies them | follows the entity's address; an event whose target no longer maps is reported |
| moveLabel / hideLabel | label handles; the dry run refuses a placement whose box at its stop meets another pinned label's box there, returning the nearest free position (§9.2) | `LabelEntity.pinned` / `hidden` — model data, in the digest (§6.2) | log | honoured by S13b (§9); the `LabelEntity` exists at the event's log position in session and replay, S13a running per event (§7.3 item 2) | inverse | follows the target address; unmapped → orphan |
| setLayer / setStyle / paintGround | UI, style dialog | style state (canonical, outside the model digest) | log | no model re-derivation; the display list rebuilds | inverse | style schema versioned |
| people: pin, setAttr, lock with paths, regenerate a person | an explicit action or edit only — never viewing | the pinned or edited fields; everyone else is derived | log | pinned and edited people are fixed inputs, re-homed to the household that inherits their household's address (§6.3), else orphans reported (§10.3) | undo record | person-table version recorded per household; person keys map through the household's address; orphans reported |
| closeup (stage 2) | logged before the first edit inside a close-up | the close-up's entities, a refinement level of the district | log (strategy, params) and the edits after it | a pure function of the district's committed state, sub-seed, strategy and params; a base re-derivation of the district re-derives its close-up with carry-over, re-matches presentation `instance` edits by position and reports orphans | undo record | replays |
| epoch | `grow(doc, inputs)` (§4.11) or a circumstance-schedule entry | the derived `EpochRecord`; lifecycle events with cause | log | §4.11's incremental path at its log position: regrowth-first siting, the survivors' ladder bounded by the geometry floor — its rung-1 `relet` marking unstored plans stale and re-cutting stored ones along the interior ladder inside the epoch (item 28 (f), §7.3) —, the use step, the decline lottery, the island and underground laws; every live rejection is re-checked by §7.7's lapse rule (item 3); a dossier change the host sends with the epoch rides in `EpochInputs.dossier` and is applied at §4.11's step (e), one sent between epochs folding at its own log position (§7.7 item 6; item 22 (e)) | undo record: the faces and entities it replaced (O(epoch scope)) | a multi-epoch document upgrades by replaying the whole ordered log with a per-epoch diff, or stays pinned to its output version |
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
* **Targets.** Each session has its own stacks. `undo` targets the session's latest **live** event other than a
  `creation` event (above) — live unless an `undo` targets it and no later `redo` re-applies it; a `group` counts as
  one step and `of` names its first event.
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
rings** — with a stored stage-3 composition's rings, its plan's points (rooms, wall ends, bays and columns) and tower
centres, and the building's basement ring — are carried with its footprint face in the same pass by §2.6's
wing-carrying rule, and the whole-step validation includes §2.6's check through `warp`'s `recordCheck`, halving the step
when it fails, as for a held pin (§3.6). The check requires the basement's ring within the wings of its ground storey (an
unedited basement that fails it re-derived by §2.6's basement decision, an edited one failing the step); and for a
stored composition its composed wings to unite to the moved face, its rooms to lie inside the moved face united with
the span rings of the passages its wings span (§2.6; J-A30.23) and its tower centres inside or on it. Every entity
whose footprint, trace, deck or pier the move carried is re-based by §2.6's datum step on the ground it now stands on
(§7.3 (a) 4), a user-edited base kept. The undo record keeps every former point, wing ring, basement ring, stored
composition and base, and a replay recomputes the same points and rings by replaying the same operation on the same
geometry. Stamp and grid instances are world-anchored patterns and are not displaced (§8.10). The B-EDIT warp fixtures
are §13.2's
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

=== REPLACE ### 7.5 Migration and upgrade (G-P9) ===
### 7.5 Migration and upgrade (G-P9)

`migrate(doc, to)` has two parts.

1. **The schema chain** — a sequence of pure, versioned transforms over the document format, forward only. A document
   whose schema is newer than the running library opens read-only with a message (view and export).
2. **The upgrade** (a new output version) — an explicit, undoable `upgrade` event:
   * the base and the whole ordered log — epochs included — replay under the new output version into a new model. **A
     rebased base is checked, then re-rooted:** before the replay, `base.state` is decoded under `from` and its model
     root compared with its root of record for `from` (§2.9 step 3) — a mismatch refuses the upgrade with a message,
     the document staying at `from` —, and the replay decodes it under `to`; the upgrade records the model root of that
     decoded state as `baseDigest`, the root every later load under `to` checks it against;
   * **the mapping**: entities of the old model are matched to the new one by kind, anchor within the kind's hysteresis
     radius, class family and, for faces and chains, overlap (IoU ≥ 0.5), through §6.3's matching routine and budget; a
     matched entity hands its address to its successor (§6.3), and edits follow it only through §7.3 item 4's
     class-family check; **nothing is matched by string equality**;
   * the fates and renames of the events before the upgrade are recomputed under `to`; the events whose recomputed
     values differ from the confirmed ones are named in `changedConfirmations` and their differences shown in the diff,
     once (§7.3 item 4);
   * **packs the new version stops shipping**: before the upgrade commits, every pack of the pack set (§2.9) that `to`
     does not ship and `packs` does not hold is copied into `packs` from `from`'s shipped copy — at hand in the browser,
     where `from` is the document's own version inside the window and its retained chunk carries its shipped packs
     (§6.4), and in the CLI — and the mapping names it in `packsSaved`, so the upgrade event names the pack and its
     content stays (§2.9). A copy that would pass §2.9's 2 MB cap is an F-EDIT conflict naming the pack and its size;
     nothing is committed, and the one resolution offered is keeping the old model — removing the pack cannot help,
     because the pack set keeps every pack the log ever named (§2.9). Such a town stays at its output version; once that
     version leaves the browser's window it opens as a frozen view whose `frozenImport` the same cap refuses (§2.9 step
     2), viewable and exportable, and the CLI still replays it exactly (§6.4);
   * an unmatched edit is a reported **orphan**, kept in the log and listed in the orphan table, never silently bound
     to another entity;
   * an **orphaned lock re-imposes its last geometry** as a drawn constraint (a `drawFootprint`, `drawWay`,
     `drawBoundary` or `drawWater` event appended at the upgrade's position) unless the user drops it, so a locked
     building stays where it was;
   * a **diff** — entities changed, orphans, changed confirmations, statistics deltas, and a per-epoch diff for a
     multi-epoch document — is shown before commit;
   * **undo**: the upgrade's undo record is its `from` output version, not a stored copy of the old model. Undoing it
     replays the base and the log before the upgrade under `from` — the retained N−1 or N−2 chunk in the browser, any
     published version in the CLI (§6.4) — which reproduces the pre-upgrade model exactly, digest included (a rebased
     base checked there against its root of record for `from`, §2.9 step 3); within the session the checkpoint taken
     before the upgrade (§7.4) makes the undo instant. When `from` has left the browser's window (the library was
     updated twice since), the undo is withdrawn there with a notice and the CLI command; the upgrade's diff stays
     viewable (J-DET-18).

   The user may instead **keep the old model**: the document stays at its output version while that version is inside
   the retention window (§6.4); outside it the document opens as a frozen view, and its one edit is a `rebase` (§2.9).
   FTG's "no way to regenerate old towns with new features" and "cannot be undone" are the weaknesses answered
   (J-DET-44, J-DET-54).

```ts
interface MigrationMap {                  // what the upgrade computed and the user saw in its diff; a replay recomputes it and reports a difference, as for fates (§7.3 item 4)
  orphans: Id[];                          // the targets of logged edits left without a successor: kept in the log, listed in the orphan table
  packsSaved: { id: string; version: string; hash: Hash128 }[];   // the pack-set packs `to` does not ship whose content this upgrade copied into `packs`
  changedConfirmations: number[];         // seqs of the events before the upgrade whose fates or renames, recomputed under `to`, differ from the confirmed ones (§7.3 item 4)
}   // the address hand-offs are recomputed by §6.3's matching routine on every replay, never stored, so an upgrade event stays small; its renames are EditBase.renames (§7.1)
```

*Test (M3a):* the golden suite replays under N−1 and N−2; a corpus of edited documents upgraded across one output
version keeps 100 % of edited entities or reports each orphan (O9 e); an upgrade undone — in the session and after a
reload — restores the pre-upgrade digest exactly; a METROPOLIS document's saved size does not grow with its upgrades
beyond the upgrade events themselves; a `keptSnapshot`-rebased CITY document upgraded across a test output version whose
field driver and digest leaf encoding differ from `from`'s opens editable after a reload and replays to the session's
digest, and the upgrade undone restores the pre-upgrade digest; a document using a pack that `to` stops shipping holds
it in `packs` after the upgrade and reopens with it once `from` has left the window; a document using such a pack whose
copy would pass 2 MB gets the F-EDIT conflict with only "keep the old model" offered and commits nothing; and an
upgraded document whose pre-upgrade corpus selection renames differently under `to` lists that change once in the
upgrade's diff and reloads with no mismatch report, while a divergence forced under the confirming version is still
reported.

**The schema transforms the amendments of 2026-09-25 add** (items 11, 12, 17, 20, 28, 29, 30, 31) — each a pure, forward-only
transform of the chain that checks the old records root and writes the new one (§6.2): a plot without `builtBand` gets
it from the band its `DerivationRecord.band` holds and its value companion from the record's field sample, which is
exact for every document without an epoch and, for one with epochs, the band its last derivation read; a building's
single `entrance` becomes `entrances` with one `main` entrance at that vertex (ordinal 0, `nextEntrance` 1), its
basement derived at the first load by §2.6's rules (an `absent` decision, never a random one); every building's `use`
becomes a `Use` record (§2.7) with the building as its only member and no `formerUses`; a building's `households` is
filled from its households' `Household.building` in address order and its retired `occupants` list is dropped
(J-A28.29); `condition` is `kept` and `reusedAs` absent; a block's `reach` is `open`, the parity presets' value, and
each plot's `exposure` is derived at the first load by §4.6's rule from its access rows (no older document has a
passage), its `knownTo` and its buildings' defaulting from that exposure (§2.5, §2.6) — an institution's optional
`knownTo` stays absent and reads its plots' (§2.7); a stored tunnel without `headroomCm` takes II.7.2's profile row
for its kind and the network's preset, and its `navigable` is derived from its width and headroom against that
row's thresholds (§2.7); an older assignment gets `existence: 'map'` and `pinned: false`, and
its `use` is linked at first load to the `Use` its member's building received above; `Composition.lod` admits `plan`
with no data change; a stored plan written before `Room.scope` and `Room.unit` existed gets each room's `scope` from its
role's programme row (`circulation` for corridors and stair halls) and then each room's unit at first load by §2.6's
rule from the building's households and the plan's doors (one household: the whole shell is its unit; item 28 (f)); an
elaboration cache is non-canonical and is dropped at upgrade; no rejection, positive placement, `DossierRef` or `Passage`
exists in an older document, so none is invented.

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
* **Tables have keyed rows.** Every rule table — size ladder, stage regimes, way widths, granularity, class rules
  and class families, heights, wall spacing, greenery, drivers, naming, style sheets, the dependency graph, S0's
  feature probabilities, the work-limit coefficients (§5.1 (5)), and the rows the amendments of 2026-09-25 add — the
  relation templates, supply edges and designation templates (§10.2, §4.7), the room-programme rows and layout patterns
  (§2.6, §10.2), the interior ladder's rows — households per shell, unit forms, shared and staff rooms, circulation and
  room-size bands per band (§2.6; item 28 (f)) —, the decline table and the survivors' ladder with its durations per rung by direction and stock
  replaceability, its churn caps, its orderings, the middle-band designation and each rung's manifestation column (§4.11,
  §4.5; item 31), the class table's replaceability column (§10.2), the hidden-share rows (§4.6), the island rule and the
  sewer existence law (II.6, II.7), the disruption budget rows (§7.7), the entrance and cellar columns of the
  designation templates (§10.2, read by §2.6's rules), the basement-gate row `RosterTables.basementGate` (§10.2), the
  band set `prosperity.bands` (§4.5), the market-siting weights
  `market.siting` (§4.2 S3 (12)), the farmland modes `FarmModeRow` (§4.9), the reach weights (§4.6) and the knowledge admission table `knowledge.admit` (§9.2) — is versioned
  JSON: a map from a stable row key to a row whose cells carry `{value, unit, provenance: {source, date, note},
  calibratable, extension?: {over, mode}}`. Each table's schema declares its **readers** (the stages that consult it)
  and its **slice kinds** (row, weights, bracket, thresholds, match — §2.8). **A naming slice of a culture or ancestry
  row is one field of it**: a `SliceRef` of kind `row` with key `<rowKey>/<field>`, hashed over that field's value and,
  for a corpus field, the named corpus's content hash, so a slice's hash changes when the corpus behind it changes; a
  naming draw cites only the fields it read, so a `set` on one corpus field — a user corpus pack's binding among them —
  changes exactly the names drawn from that field. Every other slice, of these rows and of every other table, stays a
  whole row, weight vector, bracket, threshold set or match set (§2.8) (J-DET-48).
* **Emulation first: the defaults layer is the references' behaviour (item 23; owner: "based in our base of MFCG and
  FTG emulation first"; J-A23.71).** Every rule's DEFAULT reproduces what MFCG or FTG does where they have the behaviour
  — §1.4's tiebreaker chooses between them where both do — and our extensions are layered above it as data-driven
  tendencies with a chance or a weight, or as options, never as fixed laws or fixed orders. The mechanism is the cell:
  a cell's `provenance.source` names where its value comes from in §17.1 (6)'s grammar — `ref:⟨reference⟩ ⟨behaviour⟩`
  for an emulated default, otherwise `own`, `architecture ⟨date⟩` or another of its values; a cell that extends the
  references carries `extension: { over: 'MFCG'|'FTG'|'both'|'none'; mode: 'chance'|'weight'|'option' }`, so a reader
  tells an emulated default from an extension in the table itself; and the **parity presets** `MFCG` and `FTG` — the
  presets §13.6's side-by-sides run — set every `extension` cell's chance or weight to 0 and its option off (the
  hidden-plot share, the supply edges, the upwind rows, the island and sewer rules and the ladder's tendencies among
  them). That is the principle's proof: with a parity preset on, B-REF's parity rows (§13.5) hold on the references' own
  behaviour; with the default preset the extensions run at their table values (the test is §13.5's). **The reading rule
  for absolutes:** where this document says a settlement "always", "never" or
  "first … then" does something, it means "by default, as a table value that can be changed per region, era and
  setting"; an engineering invariant — planarity, "never re-rolled", "never stored", a work limit — is not a settlement
  rule and stays absolute. The interior ladder's rows (§2.6, item 28 (f)) are defaults in the same sense — a region, era or class may change
  what a band's households share and how small a poor unit gets — and neither reference draws an interior, so the parity
  presets leave the plan rung alone: with no epoch and no `relet` every building houses its built count and the static
  baseline is unchanged. No corpus content enters the design by this rule; the corpus phase re-signs table values
  through §13.9.
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
   (§7.1, hook 8). The circumstance slice also carries the activity scalars — market, harbour and main-street activity,
   default 1 — that the prosperity field's kernels read under decline (§4.11), and the recipe's feature set holds
   `layers.islands`, II.6's model setting (§7.8).
3. **Constraints**: pins and **assignments**:

```ts
interface Assignment { id: Id; granularity: 'building'|'neighbourhood'|'dispersed'; target?: Id /* one building / plot or one district */;
  dispersed?: { count: number; kind: BuildingClass | string; criteria: PlacementCriteria };
  name?: string; function?: string; shapeClass?: BuildingClass; drift: DriftBounds /* ± area %, ± floors, allowed layouts and roof kinds, class family — read against §4.7 S11's designation template (item 19) */;
  precedence: 'overClassRules'; placed?: Id[] /* the solver's placements, persisted with the event */;
  existence: 'map'|'dossier' /* dossier: the element exists on every map the module returns (item 20) */; dossier?: DossierRef /* §7.1: the dossier's own id */;
  use?: Id /* the Use record the assignment names (§2.7); the assignment moves with it (item 17 (d)) */; pinned: boolean /* stays where it is under epochs and re-applications; the town adapts around it */;
  knownTo?: 'public'|'local'|'secret' /* item 30 (d): a dossier fact for a dossier-backed institution; §9.2's label policy reads it */ }
type PlacementCriteria = RelationRule[];   // per-assignment overrides of the class's relation rows (§10.2, §4.7 S10b): nearM → a `near` row, minSpacingM → an `avoid` row on the assignment's own members, frontageClass → a `frontage` row, districts / districtKinds / prosperityBands → `band`-class filters
// PlacementSolver, PlacementRequest and PlacementResult are §4.7 S10b's — the one solver every placement path calls (item 16)
interface Rejection { element: Id; site: Id; seq: number /* the rejectSite event */; held: { epoch: number; populationTarget: number /* the target in force when the rejection was made: the last folded epoch's EpochInputs.populationTarget, else the population the recipe resolves to at S2 (§4.2) */ }; lapsedAt?: number /* the seq of the epoch or dossier event that lapsed it */ }   // model data, in the digest (§2.8 lists it); the solver reads it as PlacementRequest.rejected while lapsedAt is unset
interface DisruptionBudgetRow { kind: 'dossier'|'positive'|'relocation'|'assignment'; weights: { displacedUse: number; join: number; subtractedPart: number; vacated: number }; budget: number; displacementDepth: number }   // a rule table (§7.6); defaults displacedUse 1, join 2, subtractedPart 0.5, vacated 1, budget 6, displacementDepth 1 — our own values, calibratable
```

**Precedence: lock > dossier existence > assignment > user-drawn geometry > rule tables > defaults** — the one order for
every meeting of protections and inputs (§7.2, §5.2 F-EDIT); S10–S11 apply it to assignments. A targeted assignment on a
locked entity (or a locked attribute path) is an F-EDIT conflict returned as an action — unlock, choose another target,
or keep the lock; the dispersed solver never places a member on a locked entity. A host that must override a lock sends
an unlock first, and the log records it (J-DET-11). **Dossier existence** sits below the lock and above every
assignment, drawn shape and rule: a dossier-backed element is never removed by anything on the map and never placed on a
locked entity — it takes the best unlocked site the hard rows allow and, when no site passes them, its first closest
option — the fewest hard rows failed, then the best score, in §4.7 S10b's order — with the rows it fails reported
(§5.2 F-SITING), never omitted (J-A20.71).

**One path — placement, then mutation (items 16, 18).** A blueprint's assignments and edits, and every element of a
dossier the document is created from, become `assign` and edit events at log positions 0…k, the `assign` events flagged
`creation` (the prefix the base derivation's S2 reads ahead as fixed rows, §7.4, J-A22.74: the dossier's elements are
counted in S2's demand as well, so their land is claimed eagerly at S7b and S10 (3) places them claims-first — J-A22.72);
every `assign` event — from the blueprint, the dialog, the host bridge or the host door (§11.4) — is placed by §4.7 S10b's
one solver for its scope (claims-first at positions 0…k, the least-disruption order after the city is built) and applied
to each placed plot by §4.7 S11's designation mutator, so an assignment gives the same town whichever way it arrived and
never re-rolls what stood there. **Re-solving:** when a member of a dispersed assignment is superseded without a
successor, only that member is re-placed, with every mapped placement as a fixed point (the minimum spacing is measured
from them); nothing still mapped moves. **Epochs (item 17 (d); J-A17.71):** an assignment is a stable identity that moves
with its use under §4.11's use step unless `pinned`, in which case it stays and the town adapts around it; members are
added only by an event that changes the count or the criteria and are then placed with the existing members fixed; every
move, closing and reopening is reported (§5.4's `changes`, §11.3).

**The dossier contract (items 20 and 22; owner: "the map does not edit the dossier … This module only takes input from
SettlementForge and returns back the map").**
1. *One way.* SettlementForge → map module → map. The dossier enters through the host door of §11.4 as dossier events —
   `assign`, `unassign` and `setAttr` events with `author: 'host'` and `EditBase.dossier` set — in the host's order; the
   module never writes to, patches or proposes a change to the dossier, and the bridge has no message that does (§11.3).
   Map edits live in the map's own document (§2.9), which the host may store as an opaque artifact; nothing in it flows
   back.
2. *Existence.* Everything the dossier specifies — buildings, institutions, assignments, the population (the roster's
   demand, §10.2), named features — is a dossier-backed assignment (`existence: 'dossier'`) and exists on every map the
   module returns: F-SITING never drops it, `delete` never removes it, and only a dossier event removes, adds or
   re-designates it; a removal leaves the plot vacant through `closeUse` (§4.11) for item 17's rules to re-use. A map
   event — one without `EditBase.dossier` — that would close, remove or re-designate a dossier-backed element is refused
   as F-EDIT (§5.2), with the actions `rejectSite` (move it) and `placeAt` (designate the plot for something else, the
   element re-placed): an `unassign`; a `setAttr` of its use or class; a `convert` `closeUse` of its use or `mutate` of
   its plot to another designation; a conversion that empties or removes the building that houses it (`vacate`,
   `abandon`, `decay`, `ruin`, `robStone`, `clear`, `demolish`); a plot `join` or `split` whose fate would demolish that
   building. A map `delete` of it is recorded as `rejectSite` (item 3), and a `relocateUse` or `swapUse` moves it and
   is not refused (J-A20.75). Elements
   the generator added on its own — filler houses, trees, lanes — may be deleted on the map with local repair, and
   whatever the dossier needs of them (housing for its population, a demanded class) is re-provided elsewhere by the same
   solver (J-A20.72).
3. *Rejection, not deletion.* A map "delete" of a dossier-backed element is the `rejectSite` event (§7.1): the site is
   excluded (`Rejection`, above; `PlacementRequest.rejected`), the solver re-places the element by the least-disruption
   order (§4.7 S10b) and the surroundings repair locally (§7.3), from the same seed. The rejection is not permanent
   (owner: "it is not permanent because if a settlement grows or declines that might be appropriate to put something
   there"): it holds while the settlement stays in the state it was made in and **lapses** — the site eligible again
   under the ordinary rules, the element staying where it is — at the first `epoch` event folded after it whose
   `populationTarget` differs from `held.populationTarget` (the settlement has grown or declined), or at the first
   dossier event folded after it whose effective scope holds the site's block; the lapsing event writes `lapsedAt` into
   the record inside its own touched set, so its undo restores the hold and no event is logged for the lapse (J-A20.74,
   with J-A20.41). A user
   lifts a rejection with `rejectSite` and `op: 'lift'`.
4. *Positive placement* (owner: "maybe you want a specific place to be something"). `placeAt` pins a dossier-backed
   element, an assignment member or a designation the generator controls to a chosen plot: the solver honours it when
   the hard rows allow — joining plots and mutating the buildings by §4.7 S10 (7) and S11, relocating whatever was there
   by the least-disruption order — and otherwise returns F-EDIT with the blocking rows and the closest acceptable sites
   (§5.2). It never creates or deletes dossier content, persists until the user lifts it or the dossier removes the
   element, and draws on `siting` keyed by the plot and the event (§6.1), so it follows the same determinism.
5. *Re-application.* A dossier change after the first map is a mutation of the CURRENT map, never a reshuffle: the
   solver's least-disruption order (vacant or under-used plots first, then a use that can move within the same
   district, one displacement level, then a join only when the new use needs the land — §4.7 S10b) finds the site, S11's
   mutator adapts the buildings, a removal vacates; households the dossier adds fill standing shells first by `relet`, up
   to §2.6's capacity, before any new plot (item 28 (f), §4.11), their plans re-cut as §7.3 states. Positive placements and the map's other edits are honoured first, as
   pins and protected entities (§7.2), and the dossier event is applied around them; an edit it can no longer honour is
   reported and orphaned, never dropped silently (J-A20.73). Its **disruption** — every moved use, joined or vacated plot
   and mutated building, each with the rule that caused it — is computed in the dry run against the request kind's
   `DisruptionBudgetRow`, stored in the event (`EditBase.disruption`, §7.1) and shown as its fate report (§7.3 item 4);
   the budget bounds the search — the first rung of the order that fits is taken — and the effective scope (§7.3 item
   1), never the dossier's authority: an event no rung fits within budget still lands at the least-disruptive site and is
   reported over budget (J-A22.73). Everything not in the disruption set keeps its exact geometry and identity (the
   oracle, §7.3 item 7 (vii)).
6. *Continuity.* The map is a function of the seed, the ordered history of dossier events and the map's own edits
   (§6.2): the same history replays to the same map exactly; two histories reaching one dossier may give different,
   equally valid maps — continuity over path-independence, because the owner asked that the seed "respect the previous
   layout prior to the addition or subtraction" (J-A22.71). A brand-new map from an existing dossier has every element
   present from the start (One path, above). Inside the evolution stage the same rules apply. A dossier change the host
   sends with an epoch rides in that epoch's `EpochInputs.dossier` (§4.11) and is applied at §4.11's step (e), after the
   use step and the ladder and before siting (J-A22.42); one sent between epochs folds at its own log position and
   mutates the map the last epoch left (item 22 (e)). The events an epoch carries take their `seq` from `nextSeq` when
   the `epoch` event is appended — the epoch's own first, then the carried events' in the host's order — so their draws
   and minted addresses are keyed as a standalone event's are (§6.1, §6.3); they fold only inside the epoch, are undone
   with it and are never undo targets on their own, and a truncated epoch that a `redo` re-appends keeps them (§7.4)
   (J-A22.76).
7. *Knowledge.* A dossier may designate an institution hidden or secret: `Assignment.knownTo` is the dossier's fact, the
   solver prefers hidden plots for it through the class's relation rows (§4.6, §4.7 S10b; item 30) and §9.2's label
   policy reads it; a map `setAttr(knownTo)` on such a place is a map override that the next dossier event setting it
   re-imposes, reported (J-A30.71).
8. *What is staged.* The mapping of SettlementForge's own data onto the host door is the owner's later stage (§11.4,
   *Staged by the owner's roadmap*); the events, records, precedence, rejection, positive placement, budget and continuity
   rule above are the base's, exercised now by the dialog and the API.

A whole-neighbourhood assignment sets the district's character and class mix while every building stays individually
diversified by the class rules within the drift bounds — drift bounds read against §4.7 S11's designation template (item
19) and passed to `BuildingGenerator.compose`; assignments are events (persist, undo, migrate) and take precedence over
class rules (O10 e). Stable addresses for districts, neighbourhoods, plots and buildings that survive regeneration and
edits are §6.3's.

**Forms catalogue (should-have; the schema is the must-have hook).** A form is a row `{ id, constraints,
growthProgramme, signature }`: constraints (site request, wall rings, plaza position, planned flag, gate count band), a
growth programme (stage regimes and branch tables, §4.4), and a morphometric signature (radial share of arterials,
orthogonality index, street-density profile, block-area CV, enclosed share). Initial rows: `organic`, `bastide-grid`,
`linear-street` (growth anisotropy a = 8 along the main road, §4.4), `radial`, `hill-acropolis`, `bridge-town`,
`port-quay-parallel`, `monastic-close`, `island-city` (shore destinations, §4.2 S3), `confluence`, `twin-town` and
`polycentric` (two or three nuclei, §4.2 S3); forms compose by growth stage (an organic core with a planned extension).
O10 (g)'s classifier runs on the signature vector.

=== J-ROWS ===
| J-A31.75 | the epoch invariant compares the touched plots' frontage edges and their buildings' shells with their pre-epoch values, every difference matched to a lifecycle event recorded in the epoch — a rung-3 event; rung 1's yard buildings (`densify … infill`, `thin … infill`) or rung 2's back-court split or its reversal, the ladder's only geometry below rung 3; a designation or renovation mutation; any other `ConversionOp` (decline, terrain-and-water, island, carve, `wallToWay`, `contractWall`); the growth step's own builds, declared `demolish` and corridor re-cuts — in place of "ring and shells unchanged without a rung-3 event" | §5.3 |
| J-A22.74 | the creation prefix — the blueprint's and the creation dossier's `assign` events at positions 0…k, flagged `EditBase.creation` — is read by the base derivation's S2 as fixed rows before it runs, the fold's one declared read-ahead; folding those events records the run's placements and places nothing twice (amends J-DET-6); a `creation` event belongs to the base derivation it feeds, never an `undo`, `redo` or `revert` target and never truncated — a blueprint assignment is removed by `unassign`, a dossier element only by a dossier event | §7.4, §7.1, §6.2, §7.7 |
| J-DET-2 | lineage kept only for entities surviving un-derived; successors get the address only *(amended by amendments b: a mutation — a fusion, a splitting, a ladder step, an interior re-cut — continues lineage; only a re-derivation takes fresh lineage; J-A31.73, J-A28.63, J-A8.61)* | §6.3 |
| J-DET-53 | a transparent successor seed (seed + 1) for Enter *(amended by amendments b: Enter keeps the dossier — the new document's creation prefix holds one `creation` `assign` per live dossier-backed assignment, without its placement; item 22 (d), J-A22.74)* | §6.1 |
| J-A31.71 | `setAttr(builtBand)` refused; the attribute is written only by the paths §4.11 lists (J-A31.44), each of which re-derives or re-sets the stock to the band it records | §7.1, §7.4 |
| J-A20.75 | a map event — one without `EditBase.dossier` — that would close, remove or re-designate a dossier-backed element is refused as F-EDIT with `rejectSite` and `placeAt` offered: an `unassign`, a `setAttr` of its use or class, a `convert` `closeUse` of its use or `mutate` of its plot to another designation, a conversion that empties or removes the building that houses it, a plot `join` or `split` whose fate would demolish that building; a map `delete` is recorded as `rejectSite`; never recorded as a removal or a re-designation | §7.7, §7.1, §7.2, §5.2 |
| J-A12.71 | a tunnel is drawn by `drawTunnel` (a `tunnel` chain on the underground arena, never `drawWay`) and an access point created by `placeAccess`; a tunnel's condition is no `setAttr` path (a condition change is the matching `convert`, J-A11.21) and its profile preset is the network's, not a tunnel field; an access point's tunnel end moves by `moveVertex` on its `access_point` vertex and its opening by `setAttr` on `ground.at`, re-hosted by `pointLocate` on the ground's `PlatKey` and refused as F-EDIT outside II.7.3's admitted ground | §7.1, §7.4 |
| J-A28.73 | F-PLAN's tier 2 answers a transient arena's refusal by what was refused: a kept room leaves the kept set and is cut with the rest (its address re-matched by §6.3), a stair bay or chimney stack is re-placed at its next attempt, and a refused seed ring, passage room or composer's room — the shell the composition contract guarantees — aborts the rung with its stream key as a bug | §5.2 |
| J-A22.76 | the events an epoch carries in `EpochInputs.dossier` take their `seq` from `nextSeq` when the `epoch` event is appended, the epoch's own first and then the carried events' in the host's order; they fold only inside the epoch, are undone with it, are never undo targets on their own, and keep their `seq`s when a `redo` re-appends a truncated epoch | §7.7, §7.1 |

=== RATIONALE-A ===
| J-A31.75 | Chose to state the epoch invariant as a comparison of the touched plots' frontage edges and their buildings' shell subtrees (wings, heights, entrances, roof, basement) with their pre-epoch values, every difference matched to a lifecycle event recorded in the epoch — a rung-3 event; rung 1's yard buildings (`densify … infill`, `thin … infill`) or rung 2's `densify … back_court` split or its `thin … back_court` reversal, the only geometry the ladder makes below rung 3; a designation or renovation mutation; any other conversion of §4.11's `ConversionOp` (a decline, terrain-and-water, island, carve, `wallToWay` or `contractWall` conversion); or the growth step's own changes (regrowth's builds, the built-face legality's declared `demolish` and its corridor re-cuts) — while rungs 1 and 2 change no frontage and shrink or re-cut no shell toward a poorer band, and no difference is matched only to a rung-1 or rung-2 `LadderOp` beyond those yard buildings and that back court, over "a plot without a rung-3 event keeps its ring and its buildings' shells" and over a closed list of rung 3, the back court, a mutation and four conversion kinds, because the owner's rung 2 fragments the holding into a back court "without the front changing", rung 1 fills and clears the yard, renovation extends shells when an area grows rich, decline changes geometry and an ordinary growth epoch demolishes and re-cuts where a new corridor passes, so each narrower list aborted ordinary epochs, while the owner's guarantee is the unchanged front and the shell that never falls toward poverty (§5.3, with §4.11's rungs and growth step; restated by repair round 2 for VD1-01). |
| J-A22.74 | Chose to let the base derivation's S2 read the log's creation prefix — the blueprint's and the creation dossier's `assign` events at positions 0…k, flagged `EditBase.creation` by `generate` — as fixed rows before it runs, the fold's one declared read-ahead, folding those events afterwards recording the generation run's placements and placing nothing a second time, over copying the creation assignments into the recipe or placing them only when their events fold, because a brand-new map from an existing dossier must hold every element from the start (item 22 (d)), so S2 must count them before any fabric is cut, while the log must stay the one source of truth for assignments (LC-24) — a recipe copy would be a second one — and a replay must reach the session's map without reading any other event ahead (§7.4, §7.1, §6.2, §7.7; amends J-DET-6). A `creation` event therefore belongs to the base derivation it feeds, not an edit of the map it made: it is never an `undo`, `redo` or `revert` target and never truncated — the undo key and `revert` skip it, and an `undo(h, of)` naming it returns F-EDIT offering `unassign` for a blueprint assignment and `rejectSite` and `placeAt` for a dossier element — over giving it an undo of its own, because its fold owns no placement to restore (generation made it) and dropping it would change what S2 reads ahead, so the replayed town would differ from the log with the pair kept and truncation identity (§6.5 (9)) would fail (added by repair round 2 for VD1-02; §5.2). |
| J-DET-2 | Chose to keep the lineage (and so the draws) only for entities that survive un-derived, and to hand only the address to an anchor-matched successor, over carrying the lineage in both cases, because New random must really re-roll its scope while names, locks and assignments must follow the building the user means (§6.3). *(amended by amendments b: a mutation — a fusion, a splitting, a ladder step, an interior re-cut — continues lineage; only a re-derivation takes fresh lineage; J-A31.73, J-A28.63, J-A8.61)* |
| J-DET-53 | *Chose a transparent successor (seed + 1) over deriving the next seed from the generator's stream state because seed + 1 survives any change of draw order and is readable in the link.* The references derive their successor from the stream state, which is reproducible within one build (VG's Enter chain replays per build, `coverage-audit-vg.md` VN-007; MFCG's successor is its deterministic stream state) but moves whenever a build changes its draw order; MFCG's Enter also drops explicit parameters and takes size and flags from a non-seeded source — PLAT does neither. (§6.1 Enter, archived l. 5334–5340) *(New row added by the consistency pass, 2026-09-26: the canon gave this inline passage, which had no row, the next free id.)* *(amended by amendments b: Enter keeps the current document's dossier — the new document's creation prefix holds one `creation` `assign` event per live dossier-backed assignment, without `placed`, `target` or `use`, which name the old town's entities — over dropping it with the map's assignments, because item 20 (b) makes everything the dossier specifies exist on every map the module returns and item 22 (d) puts every element of an existing dossier on a brand-new map from the start, while rejections and positive placements are the old map's own edits; J-A22.74)* |
| J-A31.71 | Chose to refuse a direct `setAttr` of `builtBand` as derived state — the attribute is written only by the paths §4.11 lists (J-A31.44), each of which re-derives or re-sets the stock to the band it records — over allowing a bare value change, because a value that disagreed with the standing stock would make the floor lie (§7.1, §7.4; restated by repair round 2 for VD1-07, to follow J-A31.44's list). |
| J-A20.75 | Chose to refuse every map event — one without `EditBase.dossier` — that would close, remove or re-designate a dossier-backed element as an F-EDIT conflict whose actions are `rejectSite` (move the element) and `placeAt` (designate the plot for something else, the element re-placed) — an `unassign`, a `setAttr` of its use or class, a `convert` `closeUse` of its use or `mutate` of its plot to another designation, a conversion that empties or removes the building that houses it, a plot `join` or `split` whose fate would demolish that building — over recording such an event as a removal, a re-designation or a silent rejection, or refusing only `unassign` and `setAttr`, because the owner ruled that only an instruction from the dossier removes, adds or re-designates a dossier-backed element and each of these routes reaches the same removal or re-designation; a map `delete` already has its own meaning (a rejection), a move (`relocateUse`, `swapUse`) is a map edit and stays allowed, and the two actions offered are exactly what a user can do to such an element on the map (§7.7, §7.1, §7.2, §5.2, §5.3; widened by repair round 2 for VD1-08). |
| J-A12.71 | Chose to give the underground's editable records their own create events — `drawTunnel`, which inserts a `tunnel` chain on the underground arena with its kind and its width and headroom (from II.7.2's profile row unless given), and `placeAccess`, which creates an `AccessPoint` with its ground point and its `access_point` vertex on the tunnel's kerb — and to leave a tunnel's condition and its profile preset off the `setAttr` list, over drawing tunnels with `drawWay` and creating access points through `setAttr`, because U2 forbids `way` chains underground, a `setAttr` edits a record that exists and cannot create one, a tunnel's condition is a reading of its existence and closure (J-A11.21) that changes only through `silt`, `caveIn`, `seal` and `reopen`, and the preset is the network's choice, not a field of the tunnel (§7.1, §7.4, II.7). An access point's two ends are edited apart — its tunnel end by `moveVertex` on its `access_point` vertex, its opening by `setAttr` on `ground.at`, re-hosted by `pointLocate` on the ground's `PlatKey` with `ground.host` rewritten and refused as F-EDIT outside II.7.3's admitted ground — over moving the opening only with the tunnel end, because the opening stands in a street, yard or cellar of the ground, which no underground edit writes, and everything stays editable (added by repair round 2 for VD1-11). |
| J-A28.73 | Chose to answer a transient arena's refusal (`E_DEGENERATE`, detail `seed`, `fixed` or `overlap`, §3.4) in F-PLAN's tier 2 by what was refused — a kept room leaves the kept set and is cut with the rest, its address carried by §6.3's re-match where its anchor falls in a new room, reported; a stair bay or chimney stack is re-placed by §2.6 step 3 on its wall or at least `minEdge` from it, at its next `attempt`; a refused seed ring, passage room or composer's room aborts the rung with its stream key as a bug — over leaving the refusal to the later tiers, because the arena refuses at its open, before any cut, so a re-run of the layout or a simpler primitive re-opens the same refused rings and dropping rooms never removes a refused kept room or anchor; a kept room is only the re-cut's least-disruption preference (J-A28.26) and an anchor's position the planner's own choice, while the seed rings, the passage room and the composer's rooms are the shell §2.6's composition contract guarantees, so their refusal can only be a bug (§5.2, with §3.4 and §2.6; the kernel verifier's VK1-02). |
| J-A22.76 | Chose to number the dossier events an epoch carries (`EpochInputs.dossier`) from `nextSeq` when the `epoch` event is appended — the epoch's own `seq` first, then the carried events' in the host's order — and to fold them only inside the epoch, undo them with it, never make them undo targets on their own, and keep their `seq`s when a `redo` re-appends a truncated epoch, over letting the host number them or giving them the epoch's one `seq`, because a dossier event's draws and minted addresses are keyed by its own `seq` (§6.1, §6.3), so every party must number it the same way and each carried event needs a `seq` of its own, while §7.4's truncation arithmetic stays exact when every `seq` an event spends is spent at its append and never re-used (§7.7, §7.1; repair round 2, VD1-12). |

=== END ===
