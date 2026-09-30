# repair-r2-determinism — lane amendments-c/repair-determinism-r2 (DETERMINISM part: §5, §6, §7): block file per the
# BLOCK PROTOCOL. Text before the first "=== " line is ignored. The lane's report, ledger and receipts are
# docs/validation/amendments-c/repair-determinism-r2-report.md.
# Base: docs/ARCHITECTURE.md sha256 024c57dabc6b93c8… and docs/ARCHITECTURE-RATIONALE.md sha256 33b21ca8cdc15789…
# (assemble-r1's output). Each REPLACE body is the live subsection with count-asserted substitutions (scratchpad
# rdc2/specs.py through rdc2/compose.py); every untouched line is verbatim.
#
# ASSEMBLER HAND-OFF
# (1) RESTATED ROW. The protocol only appends rows, so the J-ROWS and RATIONALE-A blocks carry one restated row under its
#     existing id, J-A68.73 (index and Part A). apply-blocks.py appends it and notes "DUPLICATE ID inserted"; move the
#     appended row into the older row's place and delete the older row, so one row per id remains (as assemble-r1's
#     hand-off did for the r1 restatements). The new id (index and Part A) is J-A88.73.
# (2) This file REPLACEs §5.2, §5.4, §6.1, §7.1, §7.4, §7.5 and §7.7 — all determinism-owned. At write time the other r2
#     block files on disk REPLACE §3.2 and §3.3 (kernel), §2.x (model) and §4.x, §10.2 and II.7.x (pipeline) only, so no
#     heading is replaced twice. Shared wording: §7.4's light hosts follow model r2's §2.7 `LightSource.host` (V-MC1-03); §6.1's
#     relief pick names the S0 relief toggle that pipeline r2 adds to §4.2 S0 (VPR1-12).
# (3) PIPELINE R2's HAND-OFF (2) IS FOLDED IN. repair-r2-pipeline.md's preamble (2) asks for two substitutions in §5.2's
#     F-SITING row after this file's REPLACE, so the row matches its §4.5 (5) (VPR1-01, J-A72.50). This file's §5.2 block
#     already carries both results, so the hand-off's two old strings are absent by design: skip both and record them as
#     satisfied, not as lost.
# (4) DOCUMENT CHECKS. On a copy with this file applied and the row swapped, doc_checks --sections
#     "5,6,7,Judgment calls" shows no unreviewed hit (counts in the report); no allow row is needed.

=== REPLACE ### 5.2 Failure classes: detection, ladder, test ===
### 5.2 Failure classes: detection, ladder, test

Each row fixes its class's detection, the order of its rungs (each deterministic from the stream key) and its test; a
row marked † names in brackets the section that states how its rungs are computed.

| class | where | detection | ladder (in order) | how it is tested |
|---|---|---|---|---|
| F-NUM† precision failure of an optional chain [§3.6] | kernel | `E_OUT_OF_RANGE`, `E_BELOW_MIN_EDGE`, `E_BELOW_MIN_ANGLE`, `E_SELF_INTERSECT` on an optional chain (growth proposals, optional lanes, decorative lines); warnings `W_SNAP_PASSES`, `W_ACUTE_CORNER` | re-propose from the next attempt stream → reject the chain with a report line (a proposal that cannot be inserted is simply not a street). Mandatory chains do not fail for precision (§3.6): `E_OUT_OF_RANGE` on one is a bug that aborts the batch with its stream key; `E_LOCKED` goes to the dry run (F-EDIT) | B-FUZZ at §13.8's sizes against §13.1's bar (O3 a); 0 mandatory chains rejected on B-CITY |
| F-CUT† bent cut fails [§4.6] | S8, S10 | `E_NOT_TWO_CROSSINGS`; a child fails simple / min area / min width / min angle | reflex pre-cut (a face with a reflex vertex deeper than the band's plot depth is split there first, and at antenna roots) → re-plan in the working frame turned by 36° ×2 (item 39: §4.6 step 8 (a) — attempt k in the frame turned by k × 36°, with fresh `cut.t` draws on the stream key's `attempt` component, §5.1 (6)) → straight cut on the mean normal → the always-succeeding cut perpendicular to the longest side run at its midpoint, clipped to the face's own component, its foot sliding along that run until §3.6's contact rule passes (reported `W_CUT_SLID`; J-Fredteam-1) → substitution (court / green / landmark / a joined plot for the largest unplaced class of the district's **allocation**, never live roster state, §4.7), only for faces ≤ 2 × the band's upper block area | on 10⁵ random concave and holed faces the ladder ends in ≤ 6 kernel calls and the face count never decreases; the built-area share left as court or green residue reported per district (soft band ≤ 5 %); the NG signature regression (§13.5). MFCG 12710731 baseline: 19 skipped cuts; 3 of 16 cities restarted on a polygon it could not cut |
| F-CORRIDOR† union leaves slivers or a collapsed block [§3.6] | S9 | a face below its class minimum width or area after `corridorUnion` | `absorbSliver` (merge across a partition edge, else keep the face as `residue`; a structural edge is never deleted) → downgrade the offending lane to `alley` width → retype the lane `invisible` and log | B-CITY: 0 faces below their class minimum width and area; 0 structural edges deleted |
| F-OUTLINE† a closed outline is not simple [§4.2 S1] | S1 (coasts, lakes, islands, sky-island outlines) | the displaced outline self-intersects or loops | clamp the displacement → repair by non-zero union → type each resulting loop (islet / pond / absorbed), reported | §13.2's outline stage property test |
| F-RIVER† no course / no crossing [§4.2 S1] | S1, S3, S1's water operator (§7.3) | descent stalls in a sink; the carve would exceed `carveMaxCm`; the course leaves the frame before the core; no crossing site in the core band | carve the sink deeper up to `carveMaxCm` → re-trace from the last good knot → move the inlet along the frame edge (attempt) → move the centre to the bank (S3) → declare "no crossing", route arterials to the bank road, report. A requested river island whose branch separation fails is reported "not built". Inside an edit the re-trace is confined to the edited reach and the inlet and centre rungs are not offered (escalation: §7.3's S1 rows); a moved course knot is never re-traced away from the user's position (§7.3 (b) 1) | 1 000 seeds × {`river`, `coast+river`} (the `WaterSetting` spelling, §13.3) × rung: "river within the core when requested" = 100 % (MFCG baseline: 7 of 10 attempts fail at size 80) |
| F-CONTOUR† a contour crosses a shore [§4.2 S1, §8.2] | S1 | a contour level set crosses a shore edge | the coast construction of §4.2 S1 → clip every contour to the land faces in vector space before emission (always succeeds), reported; never an abort path | steep-coast, cliff and spit fixtures: 0 contours crossing water; 0 S1 aborts |
| F-SITE no valid centre | S3 | every candidate fails the slope / land / flood tests; polycentric nuclei closer than the separation floor (§4.2 S3 (6)) | relax the slope threshold one step → the largest land component's centroid band → report; nuclei: re-site the later nucleus (≤ 3) → merge the two under one enceinte with a cross wall, reported | corpus sweep over relief characters; twin-town fixtures: walls apart by the floor, or one enceinte with a cross wall |
| F-ROUTE† no arterial path [§4.3, §4.2 S1 (5)] | S4; S5b at stages k ≥ 2 and in every epoch (S4's router, §4.4); S4's local operator (§7.3) | `E_NO_PATH`; an approach cannot meet a pinned bridge deck within the class's minimum radius | another crossing site on the reach within its search band — one S1 or S3 already emitted, a `site` no way uses yet (river and canal decks; a moat deck is fixed at its gate, §4.3; the deck stays perpendicular to local flow) → one bridge at extra cost: a new deck whose two `deck_end` vertices one L0 batch of two same-level shore splits places, nothing cleared, before the way's L1 batch lays its span (inside an operator whose water is not yet inserted the rung only sites the deck, §4.2 S1 (5)) → relax the slope limit one class → route to the nearest reachable junction and mark the destination `unserved` in the report (MFCG 12710731 only logs a street it cannot build, O16) | scripted requests on 100 seeds with pathological sites; O4 (a): 100 % of through-roads at a named destination or reported; road and deck agree on 100 % of crossings |
| F-BUDGET-STAGE† capacity below demand [§4.2 S2, §4.4] | S5 | S5d's area test: the stage's grown area against its plot demand at the bands' plot areas | one bounded top-up before the next stage (widen the stage boundary by the shortfall at the stage's measured plot density, grow only the added ring, recompute the trace) → accept and report the shortfall; the exact plot check after S10 feeds F-SITING | §13.2's B-CITY `wealthLevel` sweep |
| F-WALL† bad trace / infeasible gate count [§4.2 S3, §4.4, §4.8; §3.6–§3.7] | S3 (stage 1), S5a, S7 | the trace self-intersects or crosses the core; a closed trace does not close, or an open trace has an end not anchored on shore, bank or cliff; fewer arterial crossings than N; a non-gate way reaches the trace | gates: two gate routes cross the stage-1 boundary at one point → re-draw the later gate pick (≤ 3) → drop it and report (§4.2 S3 (7)). Trace (fixed before growth, gates pinned — S3 for stage 1, S5a later): re-offset with a larger radius → topology-preserving union-simplify (`booleans`, §3.7) → anchor open ends by attraction onto the nearest shore, bank or cliff (a shared stretch carrying `bank` and `wall`, §3.6; an open trace is legal when both ends are anchored), adding water gates where the waterfront policy requires a quay wall → divert excess arterials to the nearest gate as lanes → add posterns and report when N cannot be met (N = 0 adds no main gate: a declared sealed circuit whose harbour outside the stage-1 region still gets its harbour gate, §4.2 S3 (7)) → last rung: cut a way that reaches the wall at the setback band and prune the outer stub, reported | B-CITY: gates on arterials 100 %; main gates = N exactly; roads leaving each walled stage = its gate count (§5.3's S7 row); 0 non-gate crossings; 100 % of quays reachable without crossing a wall except at a gate on coastal and river seeds. MFCG baseline: sealed cities at 0 main gates, no fallback |
| F-CASTLE† compactness / overlap [§4.2 S3, §4.8] | S3, S7 | compactness < 0.75; the claim overlaps water or the plaza | at S3, when the bailey is sited and before the trace welds to it (§4.8), inside the reservation, in MFCG 12710731's order (§4.8, item 45): thinness bloat (5 % steps while the claim's nearest boundary vertex lies within `castle.minInnerM` of its centroid, up to the band's top) → equalise toward the claim's best-fit regular polygon (`regularFit`, §3.4; ≤ 20 passes, each moving every free vertex 20 % toward its target; repaired at compactness ≥ 0.75, unrepaired when a pass gains < 0.001) → re-site (reported) → keep without a bailey (reported) | §4.8's castle acceptance; O8 (d) |
| F-PLOT† unusable plot [§4.7, §4.6] | S10; the re-cuts of §7.1's plot `join` / `split` and of §4.11's ladder; S11's cluster packing (§4.7 S11's informal clusters, item 70) | frontage < min, wedge angle < 12°, landlocked; a cluster structure that can take no door on a footpath reaching one of its plot's access edges | per-frontage regions (§4.7; when the block's skeleton downgrades, a reflex pre-cut partition) → merge into the neighbour → insert an alley for access — or, where §4.6's rule allows it on a continuous frontage, a covered passage under the front building (item 30); the rung is skipped on the underground arena (II.7.3 U2) → typed residue (court / vacant). A cluster structure without a connected door is re-packed once at the packer's next free site, else dropped and reported — its households re-housed by §4.7's overflow pass, never omitted; a plot too narrow for a trunk and one structure depth takes the `hovel` arrangement instead, reported (§4.7 S11). A hidden plot passes with a chain of access edges through passage, alley and court faces to a public way (§5.3), never landlocked | every plot has ≥ 1 access edge (100 %) and every hidden plot its chain (§5.3); 0 landlocked buildings; the same after every plot re-cut; every cluster structure with its own door on a footpath that reaches an access edge (§5.3). NG 1.2.2 baseline: ≈ 42 % of lot leaves frontage-less — its courts, by construction rather than by error (item 42) |
| F-SITING† roster item unplaced [§4.7 S10b] | S10a's band-range re-homing (§4.5 (5)); S10b; S11's overflow pass (§4.7) | the eager allocation (§4.7) cannot place a class's demand in its affinity district; S10a's band-range re-homing (§4.5 (5)) finds no district whose capacity holds a household that fills no dossier's population (a household no district's range admits housed at the nearest range, J-A72.50); a post-build request (§7.7) finds no plot inside the hard rows; S11's overflow pass (§4.7, item 28 (f)) finds no residential building of the district with room for a household | reconcile inside the district's allocation (JOIN at block granularity → a whole block → the district edge; cross-district moves only in the allocation's own reconcile (S7b) and in S10a's band-range re-homing (§4.5 (5); J-A72.50)) → the item's soft rows to weight 0 → reduce the manifest, lowest-priority classes first and never a dossier-backed item (item 20: a dossier element that no plot satisfies goes to its first closest option — fewest hard rows failed, then best score, in §4.7 S10b's order — with the hard rows it fails reported, never omitted — §7.7's precedence), the report naming each unplaced item's blocking hard rows and its closest options; a household S10a's band-range re-homing or S11's overflow pass cannot house takes the last rung alone — the manifest reduced by it, reported with the capacities that refused it, no re-cut after S11 — never one of the households that fill a dossier's population (§7.7 item 2), whose housing §4.7 re-provides inside its district by the `dossier` request, which always places (J-A20.42) — decided eagerly, never by the order lazy districts are placed in, never silently (FTG V1 "would regularly give up") | O18 (f) (§15.2): 100 % of institutions on a plot meeting their requirement; §4.5 S7b (3)'s acceptance for claims larger than one block; the derived-complete digest across district orders (§6.5 (9)); every dossier-backed element placed on every map (§5.3); every household S2 demanded housed or reported unplaced, and every household that fills a dossier's population housed (§13.2 T19-4) |
| F-SITEPLAN† footprint does not fit [§4.7 S11] | S11, the terrain operator (§7.3) | setbacks leave no rectangle ≥ the class minimum; after a terrain stroke a row footprint's fall exceeds `skirtMaxCm` | on slopes above `skirtMaxCm`, stepped wings first → lower the coverage one step → next arrangement (compound → detached → hovel → the `tents` row where the class allows) → vacant plot typed yard, reported | O17 (f) (§15.2); 0 renderer fallback rectangles |
| F-PLAN† the room programme does not fit its wings [§2.6] | the plan rung (`BuildingGenerator.plan`, §2.6; stage 3, staged — this row is its hook), per building, never whole-house; every step of a re-cut along the interior ladder (item 28 (f), §7.3) | tier 0: the storey allocation places the household units first — each at its ladder row's unit form, falling to the next poorer form of §2.6's interior ladder, down to the single room the capacity is computed with, before anything is dropped — then trims the rest of the programme to the capacity of the wings that reach each storey, soft rooms first, and reports it (§2.6); tier 1: §13.2's plan bars fail on the overlay — a hard room missing, a room unreachable, a household unit without its own door onto circulation or the street (item 28 (f)), a piece below its row's minimum area, a seed or fixed ring the rung's seed clip or transient arena refuses (`E_DEGENERATE`, detail `seed`, `fixed` or `overlap`; §3.4's `tileRings` and `transientArena`) | tier 2, local repair: merge two under-size pieces, slide a cut to its neighbour's minimum, answer a refusal of the rung's seed clip or transient arena (tier 1) by the ring it refused (a kept room — detail `fixed`, or `overlap` naming its vertex — leaves the kept set and is cut with the rest, its address carried by §6.3's re-match where its anchor falls in a new room, reported; a stair bay or chimney stack is re-placed by §2.6 step 3 onto the side it came near or at least `minEdge` from it, §3.4, in the same attempt, at the next candidate of that step's filtered placement order — a deterministic move that reads no stream, as every tier-2 repair is (§5.1); where that order holds no further candidate, the anchor goes to tier 6 — a chimney stack omitted, its hearth room kept and reported; a stair bay's upper storeys left unreached — the bar failing and the building flagged; any other refused ring — a seed ring (detail `seed`, or `overlap` naming a seed ring's vertex), the passage room or a composer's room — is the shell §2.6's composition contract guarantees (its clip order leaves no seed piece with a hole: §2.6's stage-3 contract, §3.4's `tileRings`), so its refusal is a bug that aborts the rung with its stream key, as tier 6's does; J-A28.73), swap two rooms' storeys → tier 3: the storey's layout pattern re-run on the next `attempt` (≤ 3, on `plan.layout`, §6.1) → tier 4: the simpler primitive — `bisect` on the wing's axes → tier 5: a soft room absorbed into its neighbour or into a generic room, reported; never a household unit, which takes the next poorer unit form instead (tier 0) → tier 6: a hard room omitted and reported (the bar fails and the building is flagged) — never a household unit: the count the rung must house is bounded upstream by §2.6's capacity, which the generation fill (§4.7: S10b's placement, S11's clamped write and its overflow pass), `relet` (§4.11) and §2.6's re-homing on every change that lowers a capacity keep to, so a rung that cannot cut that many single rooms is a bug that aborts the rung with its stream key, as a mandatory chain's precision failure does (§3.6), never a silent drop (J-A28.51). Nothing outside the building is touched | §13.2's B-PLAN fixtures: hard rooms present 100 %, every household of the building (`Building.households`, §2.6) housed in its own unit with its own door (item 28 (f)), every room reachable, stairs stacked, walls equal the wing rings (the stage-3 contract's fourth rung, §2.6) |
| F-UNDER† an underground plot under excluded ground [II.7.3] | the underground stage (II.7; staged — this row is its hook) | a plot sample — its vertices, its frontage midpoint and a 1 m sample of its rear line — lies in an excluded ground face (water, the harbour, a wall strip, a gate, the keep, a reservation, a surface footprint: II.7.3's list), read by `pointLocate` on the ground's `PlatKey`, never a write | band depth → the band's lower depth → the class minimum depth → a `vacant` run, reported; a network run needing more fall than the ground gives is re-routed toward the nearer outfall, never trenched (II.7.2) | 0 committed underground faces with a sample in an excluded face (CI: a 1 m sample grid by `pointLocate`); the fixtures are §13.2's |
| F-VOID† an underground system or the undercity cannot be laid [II.7.5, II.7.6] | the underground systems' stages and the undercity stage (staged — this row is their hook) | a system's extent finds no admissible ground in its depth band (no stone cells, no soluble or volcanic rock, a cover below `minCoverM`); an undercity neighbourhood's void below its minimum capacity (`UndercityRule`: `minHouseholds`, `mainChamberM2`), or a neighbourhood left without a lifeline (II.7.5's condition 4) | a smaller extent inside the depth band → the system omitted, reported; for the undercity: fewer neighbourhoods inside the 1–3 bound, each dropped neighbourhood's allocation re-placed by S7b's reconcile → no undercity, reported — never a household dropped (S7b (7): the population stays whole) | §13.2's T65 fixtures: an undercity only where a void source exists and a lifeline reaches it; the bound on 500 seeds per rung; the population whole |
| F-SKELETON† skeleton fails [§3.8] | S1, S11, S13a, the plan rung (§2.6) | the output validator fails (non-planar skeleton, non-monotone faces, inconsistent heights) or the skeleton's work limit (events processed) is reached — `E_WORK_LIMIT`, never a timeout | each reader takes its typed downgrade (§3.8): `spine` readers — label spines (§9.3), S1's coast simplicity clamp (§4.2 S1 (2)) and the plan rung's room-label spines and room lights (§2.6, item 28): a sampled medial axis; roofs: a **plain roof** — footprint drawn without ridge or hip lines, roof kind `plain`, heights unchanged (MFCG draws a roof whose gable pass fails plain). Near-rectangular footprints never reach this row: their exact OBB roof is the primary construction (§3.8); the `regions` reader (S10) takes F-PLOT's ladder | §13.1's ladder-coverage fixtures |
| F-LABEL† no fit [§9.4] | S13b (view side) | the spine is shorter than the text at the minimum size; an unresolved collision at priority | §9.4's seven rungs, each counted in the report; placement is view data and never changes the model (§9.1) | §9.4's acceptance, by B-ZOOM (§13.4) |
| F-LIGHT† the light pass cannot run as drawn [§8.4] (item 68) | the view — the tile worker and the compositor, outside the model packages | no GPU context, a lost context, the pass over its frame budget (§12.5) | §8.4's fallback ladder: the GPU field → a half-resolution light buffer → the vector pass (§8.2's `shadowPass` program) with glow sprites; each rung counted in the view telemetry, never an error and never a model change; exports, stills and goldens always take the CPU reference (§8.4) | §13.4's fallback run renders a frame on every rung; the CPU reference byte-identical across engines (§6.5 (9)) |
| F-WORK operation count reached | any stage, ladder or kernel call | `E_WORK_LIMIT`: a declared count reached (candidates, proposals, kernel calls, skeleton events, recursion depth), each the stage's law over its batch scope (§5.1 (5)) | the stage's declared coarser rung, entered by the count, never by time (fewer candidates, larger cells, a shallower recursion) → report `work_cut` with the count; the map is valid and identical on every machine | time dilation (§6.5 (9)): per-stage digests byte-identical; work-cut rate per stage reported on B-CITY; hit rate flat across each band (§5.1 (5)) |
| F-BUDGET-TIME stage over its time budget — reporting and scheduling only | `@plat/api` worker host (outside model packages) | wall-clock watchdog | postpone or resume a lazy tier (cancel-and-resume only); telemetry records `time_over`; never a model change | a tier postponed and resumed hashes like the eager tier; per-stage timing against §12 in CI telemetry on reference hardware |
| F-EDIT constraint conflict | S0, edits | a drawn way crosses a locked entity; a targeted assignment names a locked entity; a map event — one a user, or a host's map edit, appends without `EditBase.dossier` — that would close, remove or re-designate a dossier-backed element (§7.7 item 2's list); an assignment cannot be honoured within its drift bounds; a post-build placement — an assignment, a positive placement (`placeAt`) or the re-placement a `rejectSite` causes (§7.7) — that no plot satisfies inside the hard rows, or a user's positive placement over its disruption budget (§7.7); a plot `join` or `split` that would remove an occupied building (item 31, §7.1); a plan edit that would leave a room below its row's minimum area or unreachable, a plan edit or `setRoomUnit` that would leave a household unit without its own door onto circulation or the street, or a hand `relet` above §2.6's capacity (item 28, item 28 (f), §7.1); a hand edit whose capacity re-homing cannot place its excess — locked or pinned households alone above the new capacity, or a household that fills no dossier's population that no residential building of the district has room for (§2.6's capacity rule); a heights edit that would leave a base wing spanning a passage below two floors (§2.5 `Passage.headroomCm`; item 30); a warp would break an invariant or carry a locked or pinned point-anchored record out of its host face (§7.4); the effective scope holds protected entities whose fate is not *kept*; an `undo` or `redo` whose target has dependent live events, or an `undo` naming a `creation` event, a dossier event or an epoch that carried one (§7.4); a water edit's new channel ⊕ bank setback meets a locked or pinned way, wall or finer entity, or a reservation (§7.3 (b) 3); a moved course knot whose carve would exceed `carveMaxCm` (§7.3 (b) 1); a map event that would change a **dossier-owned** value — the name or kind of a dossier-named element or quarter, a `knownTo`, concealment, front or `powers` weights the dossier set, an assignment's `state`, a collective record's count set outside its range, an `adjust` of a dossier-bound map's population or of a slice value the dossier supplied (§7.7 item 11; J-A20.77) — reason `dossier-owned`; an `addUndergroundAccess` whose closure (§7.3 item 9) ends in a refusal — the terrain rules out every basement form (§2.6's requested-mode ladder), the connector's route passes its bound (II.7.6), or the underground layer's stages its pieces need are not yet built (staged; §7.3 item 9 (d)) (item 66); an authoring declaration that contradicts a lock or a dossier fact (item 101 — every other infeasible declaration is bent by its dry run to the nearest lawful one, which it names, §7.1); a Works edit that would leave a plot without access or a building's occupants unhoused (§5.3's Works row; item 67); a table cell set outside its column's declared range (`jitter.minM` below its bound among them, §4.7 S11; §7.6); a host provider's output that would pass §2.9's cap on pack data and host content; an upgrade's copy of a pack `to` stops shipping that would pass that cap (§7.5) | the dry run returns the conflict as an action — for a dossier-owned value the refusal with its reason and the alternative the map itself offers where there is one — a label's display text and visibility (`LabelEntity`, §9.1), a viewer's knowledge key (§11.3), a count inside the range; for an access edit the nearest lawful basement form (half cellar, walk-out, a hatch to a crawl space) or the refusal naming its cause, the terrain, the route's bound or the staged layer; for a declaration the lock or the dossier fact it meets with the closest acceptable declarations (item 20 (g)); otherwise the nearest valid position (for a course knot, along the drag within the cap), the blocking lock, the closest acceptable sites with the hard rows each fails and the disruption over budget (§4.7 S10b, §7.7), `rejectSite` (move the element) or `placeAt` (designate the plot for something else, the element re-placed) for a map event that would close, remove or re-designate a dossier-backed element (§7.7 item 2), "vacate first" (item 17's relocation) or the occupied building's demolition as a fate to confirm, the fate list to confirm (§7.3 item 4), the dependent events to undo first, never a dossier event or an epoch that carried one (a target one of them depends on stays as it is, §7.4's Independence), in place of an `undo` of a `creation` event `unassign` (a blueprint assignment) or `rejectSite` and `placeAt` (a dossier element), and in place of an `undo` of a later dossier event or of an epoch that carried one `rejectSite` and `placeAt` for each dossier element it placed or re-designated (§7.4), Re-derive from S3 for a reservation in a new channel's way, the provider and the size, or the pack and its size with "keep the old model" (§7.5) — decided by §7.7's precedence order; never silently resolved | B-EDIT sequences and conflict fixtures: 0 planarity violations, 0 lost faces, 0 silent re-binds |
| F-REDERIVE coarse re-derivation invalidates finer content or crossings | §7.3's local operators (S1 water and terrain, S4, S5, S6, S7) | a plot, footprint or yard in new water, in a new corridor, across a moved wall band or outside its new cell; a way that new water ⊕ its bank setback will meet off a deck (found on the new water's data before it is inserted, §7.3 (b) 1–2); a deck span no longer over water; a crossing `site` whose bank vertices no longer stand on a shore of its reach | **Plots and buildings:** re-cut the plot along the new boundary (ids kept by the anchor rule, §6.3) → re-fit its site plan (F-SITEPLAN) → demolish what still conflicts, with a lifecycle event whose cause is the edit. **A way new water will meet off a deck** — decided before the water is inserted, in the L1 batch of S1's water operator (§7.3 (b) 3) or of a carve (§4.11 (1)), so the L0 insertion meets no finer edge except at the vertices that batch prepared (§3.3): a **kept way** — an arterial, the only connection of the streets beyond it to a gate or the plaza (§4.11's rule), or a way that crossed the changed water on a deck — is re-routed through a deck as §7.3 (b) 2 states, within the **detour bound** (the re-routed length between its nearest pinned nodes on either side of the water ≤ 1.4 × the old length); every other way is cut at the bank setback: the stretch inside the new water ⊕ bank setback is removed and each land part stays a way — the part keeping the old anchor (end junction, else larger overlap, §6.3) keeps the address, the other is a fresh way — and a land part shorter than the district's minimum block width that ends at the setback (a stub) is removed, leaving a dead end at the bank. **A deck over land** (its reach moved away, no site within the band, §7.3 (b) 2): the `Bridge` becomes a tombstone (`demolish`, cause the edit); its span stays in its way as an ordinary segment of the way's class — the higher class of the two ways it joins where the span was a separate `bridge` way — or leaves with the way if the way was removed; its `deck` and `deck_end` rows are removed (`removeEdges` on `ChainRef('deck', bridge)` and its two `VertexRef('deck_end', bridge, i)`), after which demotion takes its bank vertices to the way's level and clears their kernel pins (§2.2 rule 3). **A site over land** (no successor site matched it, §7.3 (b) 2): its `deck_end` rows are removed by `removeEdges` on their `VertexRef`s and its record becomes a tombstone (§2.7). Every re-cut, demolition, re-route, cut and pruned stub is listed in the fate report with its lifecycle event; a locked or pinned entity is never demolished, re-routed or cut — its conflict returns to the dry run as F-EDIT | the coarse-edit oracle, §7.3 item 7 (v) |

=== REPLACE ### 5.4 The generation report ===
### 5.4 The generation report

```ts
interface GenerationReport { outputVersion: string;
  stages: { name: StageId; work: Record<string, number> /* operation counts against the stage's declared work limits (§5.1) */; attempts: number;
    ladderUses: { cause: string; rung: number; tier: 0|1|2|3|4|5|6; entity: Id; key: string /* the stream key's textual form, §6.1 */ }[];
    invariants: { name: string; scope: 'batch'|'stage'|'save'|'ci'; pass: boolean; count: number }[] }[];
  requested: { feature: string; delivered: 'full'|'degraded'|'omitted'; tier: number; entity?: Id; cause?: string }[];   // §5.1 (7)
  requestedVsBuilt: Diff[]; autoResolved: { param: string; value: unknown; reason: string; layer: OverrideLayer }[]; unserved: Id[]; unplaced: Id[];
  dossier: { element: Id; state: 'placed'|'rejectedSite'|'blocked'; site?: Id; rules?: string[] /* the hard rows the placement fails, if any */; closest?: Id[] }[];   // §7.7: the standing placement state of every dossier-backed element, its live rejections and any blocked positive placement (item 20)
  changes: ReportEntry[];   // items 17 (d), 20, 22 (b): what moved, in `seq` order — derived from the log's events and the lifecycle events they wrote, never stored; §11.2's `report.changed` sends the entries appended since its last delivery
  kernel: { engine: string /* the engine id, §3.7 */; warnings: Record<string, number> /* W_ATTRACTED, W_STRETCH_SHARED, W_WEDGE_ROUTED, W_SNAP_PASSES, W_ACUTE_CORNER, W_SLIVER_RETYPED, W_HEIGHT_CLAMPED, W_CUT_SLID (§3.1; F-CUT's foot slide, J-Fredteam-1) */; downgrades: number; workLimitHits: number } }
type ReportEntry = { seq: number /* the event that caused it */; epoch: number /* the epoch it folded in; 0 before the first */;
    change?: { changeId: string; reason?: string } /* item 75: on an entry a dossier event caused — its DossierChange's id and reason (§7.7 item 13) */ } & (
    { kind: 'reject' | 'lapse' | 'place'; element: Id /* the dossier-backed element or assignment member */; site: Id /* the plot */ }
  | { kind: 'open' | 'close' | 'relocate'; use: Id; from?: Id; to?: Id /* plots: `from` for close and relocate, `to` for open and relocate */ }
  | { kind: 'mutate'; plot: Id; mutation: number /* index into the event's EditBase.mutations */ }
  | { kind: 'disruption'; overBudget: boolean /* the event's EditBase.disruption holds the detail */ }
  | { kind: 'rename'; id: Id; from: string; to: string /* an epoch's rename of a district past its identity hysteresis, §6.3 case (5) (item 72) */ }
  | { kind: 'works'; works: Id; op: 'start' | 'cancel' | 'finish' /* item 67: a Works started, cancelled or reaching its last stage (§4.11); its stages between are derived from the week, never entries */ });
interface Telemetry { stageMs: Record<StageId, number>; timeOver: StageId[]; verifyMs?: number }   // session-only; never saved, never in any digest
```

The report is a **derived cache**: rebuilt by every derivation (and by the verification replay on load), saved only in
the document's `derived` section so the panel can show it before verification finishes, and excluded from the
canonical form and every digest. It records stream keys **only for ladder uses** (any rung from tier 2 up, retries at
attempt > 0 included), not for every stream the town used. Timings are telemetry: the worker host measures them outside
the model packages, the UI shows them, and nothing saved or hashed contains a millisecond. The same object is the UI's
compact, dismissable panel (O16) and the API's `report(doc)`; every ladder use is replayable from its printed key
(MFCG's replayable attempts kept). A dossier event's or a positive placement's own consequences — what moved, was
joined or vacated, and why — are that event's disruption report (§7.1 `EditBase.disruption`, §7.3 item 4, §7.7), stored in
the event; the `dossier` list above is the standing state the report shows after any derivation. The **`changes`** list
is the report's account of what moved: every placement, rejection and lapse (§7.7), every use opened, closed or
relocated (§4.11, item 17), every mutation record (§4.7 S11) and every disruption report (§7.1), each entry naming the
event whose record holds the detail. The whole report recomputes it, in `seq` order, and it is what §11.2's
`report.changed` delivers — the host's one account of every move, closing and reopening (§7.7; J-A22.75). An entry a dossier event caused names that change's `changeId` and its reason (item 75), so the host sees why, and nothing flows back (J-A20.81); an epoch's renames and each Works' start, cancellation and completion are entries too (items 72 and 67). A dossier the port refuses — one whose population lies outside the ladder, below the 1 500-person floor or above the 120 000 cap, `E_RUNG_UNAVAILABLE` (§7.7 item 15, item 81; J-A81.01) — makes no model, or at an absorb no event, and so nothing in the report: the refusal is the port's result (§14), never a report entry.

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
  `field.chance`, `cut.t`, `cut.side` (retired, below), `cut.arc`, `cut.width`, `cut.farSideAlt` (retired, below), `plot.width`, `plot.join`,
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
  each with the next append-only u16 id, so no other key moves. **Appended by the amendments of 2026-09-27 (items 34,
  67 and 68), each with the next append-only u16 id:** `cut.stop` (a geometry concern, non-rerollable, attempt cap 0:
  the per-face stop threshold of §4.6's first step, one draw of four uniforms per face, keyed by the face's lineage; the threshold
  is not retried — a turned frame re-plans steps 2–7 only), `works` (non-rerollable, attempt cap 0: for a Works an
  epoch starts, keyed by its target's lineage with the epoch's week as the creation index and the epoch component — the
  start offset within the epoch's span (§4.11 *Works* (10)) drawn first, the duration inside its `WorksTable` row's
  range second; for a Works a dated change or a scheduled edit starts, keyed by its target's lineage with its given
  start week as the creation index — the duration alone; J-A67.61) and `pin.light` (a geometry concern, non-rerollable, attempt cap 0: S11's placement of the light
  sources, §4.7, keyed by the host's lineage with the light rule row as the creation index; a light's flicker is never a
  stream — a pure function of its render key and the view's time, §8.4; J-A68.61). **Retired by the same amendments (items 36 and
  37):** `cut.side` and `cut.farSideAlt` — the start run and the far side are deterministic rules now (§4.6 steps 3 and
  5) — keep their u16 ids, reserved, with no reader, never reused, so no key moves (J-A41.61).
* **Readers the amendments of 2026-09-27 and 2026-09-28 add to existing concerns** (no concern of their own; each keyed
  as stated, so nothing that already draws moves):
  - `blueprint.features` also draws the geology flag's uniform (§4.2 S1 (10), item 65; J-A65.49) and then the relief
    toggle's `auto` pick (§4.2 S0; S1 (1) reads the class) — keyed as S0's other auto features are, on the town root's
    entity key, appended after them in that order, and each drawn whether its toggle is `auto` or set (a set toggle
    ignores its draw), so no existing feature's draw moves and setting either toggle moves no other draw;
  - the bent cut (§4.6, items 34–40): `cut.t` twice per attempt — step 2's position bell and step 4's corner bell, three
    uniforms each; `cut.arc` one uniform per corner step 5 keeps on a lane or street cut — the fillet predictor's one test (§4.6 step 6); `cut.width` one uniform u per district,
    the exponent `p` = `4^u` ÷ 2 through `dmath.pow`; step 8's turned frames on the stream key's `attempt` component (item 39);
  - `cut.arc` also draws stage 2's ring courses (II.2, item 58 (a): the district's one shared phase, each vertex's jitter,
    each ring's spacing factor), keyed by the district, the ring's ordinal as the creation index, and `pin.decor` the
    neighbourhood tier's pin picks with their weight decay (II.3, item 58 (c)), keyed by the block, the pick's ordinal;
  - `district.seed` also draws each grower's turn skips and its absorbed neighbour (§4.5's Grower, item 47), keyed by the
    grower's seed lineage (its feature's; a remainder seed's first face) with the turn number as the creation index, so
    §7.3's S6 operator re-grows a scoped regroup exactly;
  - `siting` also draws a concealed institution's default mode and its cover (§4.7, item 63), keyed by the institution's
    lineage; a residential plot's building class from the class mix (§4.7 S10b, item 71), keyed by the plot and its
    request; and the members of a collective dossier record that a status reaches (§7.7, item 80), keyed by the record's
    assignment with the dossier event's `seq` as its creation index;
  - `siteplan` also draws a plot's front recession (§4.7 S11, item 43) and a cluster's packing (§4.7 S11, item 70),
    keyed by the plot; `siteplan.mutate` an added main slot;
  - `plot.join` also draws the cluster row's `wholeBlock` pick (§4.7 S11, item 70), keyed by the block;
  - `sewer` also draws the basement access lottery (II.7.3, item 64), keyed by the building's lineage; every draw of the
    layer's other systems (II.7.6, item 65), keyed by the system's lineage — its arena part in the key — and the
    element's source; the undercity's existence and size (II.7.5), keyed by the settlement's lineage; the connection
    stage's links; and an underground closure's generators (II.7.6; §7.3 item 9, item 66), keyed by the building's
    lineage, the target's and the event's `seq` — a closure's other generators draw on the concerns of the stage they
    call, keyed the same way (§7.3 item 9 (b)). The undercity's neighbourhoods draw on the ordinary `plot.*`, `siting`, `siteplan` and `heights`
    concerns from their own lineage (§6.3);
  - `gate.pick` also draws a trade partner's bearing where the dossier gives none (§7.7's circumstance slice, item 77), keyed by the
    partner's key — hashed as the derivation unit, as the roster's ordinal-keyed draws hash their class — so the
    bearing never moves when unrelated facts change;
  - `hinterland.outside` also draws a listed deposit's bearing where the dossier gives none (§7.7 DR19; item 88, staged),
    keyed by its binding key hashed as the derivation unit, as a partner's bearing on `gate.pick` is;
  - `alloc.district` also draws dispersal's controlled random share (§4.5, item 72), and `naming` an epoch's district
    rename (§6.3 case (5), item 72), with the renaming epoch's component;
  - `epoch.transform` also draws a churn cap's extra — the fractional part of a cap scaled by a fractional `years`, the
    chance of one more (§4.11's churn cap; J-A76.44) — keyed by the district's lineage with the cap's kind as the
    creation index and the epoch component;
  - the **variations** of a derived fill (§7.3 item 10, item 101) are its scope's next three distinct rerolls (§7.3 item 10's advance
    rule), derived on the dry run's overlay; the one accepted commits as a `regenerate` with that absolute reroll, so no component is added;
  - every chance entry of §7.7's derivation table (item 20 (h)) names a concern of this registry or "none".
* **Distinctness:** a CI test asserts that every stream key and every lineage hash in a B-CITY city **and in a
  sky-island fixture** (two islands carrying districts, underground tunnels) is distinct; the birthday bound is
  negligible (2¹²⁸ for stream keys; ≈ 3 × 10⁻¹⁰ per city of 10⁵ entities for the 64-bit lineage hashes, and §6.3's
  collision rule covers even that) — the test guards the encoder, not the arithmetic.
* **Draw helpers:** `u32`, `float01` (`(u32 >>> 8) · 2⁻²⁴`), `int(lo, hi)`, `bool(p)`, `normal()` (Irwin–Hall of 12
  uniforms — no transcendental in the RNG layer, G-R12; the NG roof jitter's 6-uniform pseudo-normal is a style-time
  helper), `bell4()` (the folded bell `|(u₁ + u₂ + u₃ + u₄) / 2 − 1|` on [0, 1], whose mean is seven thirtieths — the stop test's draw), `mean3()`
  (three uniforms averaged, for §4.6's position and corner draws), `fuzzy(f)`, `weighted(table)`, `deck(table)` (draw without replacement — MFCG 12710731's deck selection idea). The helpers draw uniforms only; every
  power of a draw (`(e_hi / e_lo)^g`, `4^u`) goes through `dmath.pow` (§6.5 (3)).
* **Decoration** (the instance model is §8.10's): trees, scatter, crowns, roof detail and hatch phase are keyed by the
  entity's **render key** — the low 64 bits (words 0 and 1) of its entity key (§8.1 item 5) — and the **instance
  ordinal**, never by LOD band; the stamp-tile library and each entity's stamp placement are §8.10's, so nothing
  re-scatters with zoom. Nothing is stored except the user's instance overrides (`instance` events, §7.1) and the
  current positions of positional overrides in the entity's override table, which a warp or a vertex move carries with
  the ground (§7.4).
* **Enter** creates a **new document** with seed (seed + 1) mod 2³² (a `Seed` is a u32, §2.9) and the same recipe —
  params, intent, the district intents (`districtIntent`), entry mode, table pins, packs — without edits, locks, map assignments or salts. The
  dossier is kept: the new document's creation prefix holds one `creation` `assign` event, carrying its `DossierRef`,
  per live dossier-backed assignment of the current document — the assignment as the dossier's live events leave it
  (each live dossier `setAttr` on the element written into the copy's matching `Assignment` field: `name`,
  `function`, `shapeClass`, `knownTo`, `drift`), without `placed`, `target` or `use`, which name the old town's
  entities — so every dossier element is present from the start, as the dossier now says it (item 20 (c), item
  22 (d), §7.7 One path). Rejections and positive placements, which are map edits, are not carried. When
  the current document has edits the app first warns and offers to save it (J-DET-53).
* Seed-exact parity with the references is ≈ 0 by the evidence and not a goal (`docs/CONFIDENCE.md` §1).

=== REPLACE ### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation ===
### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation

```ts
interface EditBase { seq: number /* from the document's nextSeq; never reset; survives rebase; an event an epoch carries in `EpochInputs.dossier` takes its seq when the epoch is appended (§7.7 item 6; J-A22.76) */; author: 'user'|'host'|'epoch'|'migration';
  session: string /* the authoring session, per document and author (§7.4): its undo and redo stacks; never read by the fold */; group?: number /* one undo step */;
  renames?: Rename[] /* on every event whose fold re-draws a name by §6.3's case (4): the renames its dry run listed and the user confirmed (§7.3 item 4) */;
  dossier?: DossierRef /* set by the dossier port (`@plat/port`, §14) on every event a dossier change generates through the host door (§11.4): the element's binding key, opaque to the module (§7.7, items 20, 74) */;
  dossierChange?: DossierChange /* set by the port with `dossier`: the change envelope — its id, source, week, cause, element, operation and reason (§7.7 item 13, item 75) */;
  proposedBy?: 'clerk' /* item 101: an event a clerk proposed and the user accepted — the author stays the user; the exports' provenance reads it (§11.1) */;
  closure?: ClosureRecord /* §7.3 item 9 (item 66): the pieces a closure edit created, in dependency order, and those it reused */;
  creation?: true /* set by `generate` on the blueprint's, the creation dossier's and a skeleton file's events at positions 0…k — the log's creation prefix, whose `assign` events the base derivation's S2 reads ahead as fixed rows (§7.4, §4.2; J-A22.74) and whose drawn declarations their stages read ahead as constraints (§4.1, item 101; J-A101.41); never an undo, redo or revert target and never truncated (§7.4) */;
  mutations?: MutationRecord[] /* §4.7 S11's records of the designation mutations the event ran, persisted with it like `renames` (item 18) */;
  disruption?: DisruptionReport /* a dossier event's, a positive placement's or a relocation's consequences — what moved, was joined or vacated, and why — as its dry run listed them (§7.3 item 4, §7.7, item 22 (b)) */ }
type Rename = { id: Id; from: string; to: string };   // the name's text before and after, as the user saw them
type DossierRef = { element: string; version?: string };   // `element` the binding key of §7.7 (item 74), `version` the host's product line; the module reads it, never writes it (§7.7)
type PointsForm = { points: PointCm[] /* the declared anchors: one seed, two to four corners, a source and a mouth, a shore point, or a brush's or lasso's samples */; levelCm?: Cm /* water's level form */; sizeM2?: number /* a harbour basin's size */ };   // item 101 (i): the minimal declaration of a shaped thing — the event stores the derived shape, resolved, as its geometry
type Cardinal = 'N'|'E'|'S'|'W';
type Locus = { rel: 'in'|'on'|'at'|'near'; target: Id; side?: Cardinal };   // a roster line's or a place's locus: "in <quarter>", "on the harbour", "at <gate>", "north side of <square>", "near <place>" — item 16's relation templates as hints
type RosterLine = { name: string; cls: BuildingClass; locus?: Locus; element?: string /* with a dossier connected: the binding key of the dossier element the line places */ };
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
  | { t: 'drawWay'; points: PointCm[]; class: WayClass; widthCm: Cm; from?: PointsForm /* two points: the route derived by S4's router at the dry run (§4.3) */ }
  | { t: 'drawWater'; kind: WaterKind; add: PolygonCm[]; subtract?: PolygonCm[]; line?: PointCm[]; widthCm?: Cm; from?: PointsForm /* a lake: one point and a level; a river: a source and a mouth; a harbour: a sea level, a shore point and a size */ }   // add rings unioned, subtract rings = land brush (islands)
  | { t: 'drawWall'; points: PointCm[]; kind: Enceinte['kind']; closed: boolean; from?: PointsForm /* two or more points: the run derived along ridges and contours by S5a's trace */ }
  | { t: 'placeGate'; enceinte: Id; at: PointCm; expansion: number }   // sugar (item 101): a gate declared by one point on its enceinte
  | { t: 'drawGreen'; polygon: PolygonCm; kind: Greenery['kind']; densityPerHa?: number }
  | { t: 'drawBoundary'; polygon: PolygonCm; district?: Id; kind?: string /* the district-kind row that steers a points form's snap */; from?: PointsForm /* one seed, two to four corners or a lasso: grown along block edges (below) */ }   // snaps to whole L1 cells
  | { t: 'quarter'; boundary: PolygonCm /* resolved at dry run */; from?: PointsForm; kind: string /* a district-kind row */; name?: string; band?: string; district?: Id; expansion: number }   // sugar (item 101)
  | { t: 'roster'; lines: RosterLine[]; expansion: number }   // sugar (item 101)
  | { t: 'group'; name: string; quarters: Id[]; expansion: number }   // sugar (item 101): a region label group on §9.1's quarter tree
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
  | { t: 'placeAt'; plot: Id; element?: Id /* a dossier-backed element or assignment member pinned here */; designation?: Designation /* §4.7 S11: a use the generator controls, designated here */; lift?: boolean; from?: PointsForm /* one point: the plot derived (below) */ }   // item 20 (g): positive placement; lift frees the plot
  | { t: 'setEntrance'; building: Id; op: 'add'|'move'|'remove'; index?: number /* the entrance edited, by its indexed role */; role?: Entrance['role']; wing?: number; side?: number; offsetCm?: Cm }   // item 29: the main entrance may be moved along the footprint side §2.6 rule 1 puts it on, never removed
  | { t: 'drawPassage'; plot: Id; from: PointCm; to: PointCm; widthCm: Cm }   // item 30 (c): a covered passage under the front building's ground storey, as §2.5's passage face; sealing and reopening are convert ops (§4.11)
  | { t: 'drawTunnel'; points: PointCm[]; kind: Tunnel['kind']; widthCm?: Cm; headroomCm?: Cm; system?: Id /* item 65: a gallery of that underground system, in its part (II.7.6); absent: a tunnel of the sewer network, part 0 */ }   // items 11, 12: a `tunnel` chain on the underground arena — never a `drawWay`, which U2 forbids there (II.7.3); width and headroom default to II.7.2's profile row, `navigable` derived from them (§2.7)
  | { t: 'drawChamber'; system: Id; polygon: PolygonCm; floorCm?: Cm }   // item 65: a chamber of an underground system, in its part (II.7.6)
  | { t: 'addLink'; a: Id; b: Id; kind: UndergroundLink['kind']; via: UndergroundLink['via'] }   // item 65: a link between two elements of different parts (II.7.6); its `knownTo` by `setAttr`
  | { t: 'addUndergroundAccess'; building: Id; target?: Id /* an element, else the closure's target order (II.7.6) */; kind?: AccessPoint['kind'] }   // item 66: an access from a building's basement — a closure edit (§7.3 item 9)
  | { t: 'placeAccess'; kind: AccessPoint['kind']; role: AccessPoint['role']; ground: PointCm; element: Id /* the tunnel, gallery, chamber or underground building it reaches (II.7.4); an older event's `tunnel` reads as `element`, §7.5 */ }   // item 12 (d): a new AccessPoint (II.7.4) opening at `ground`, its `access_point` vertex placed on `element`'s kerb or wall at the nearest point; its underground end moved by `moveVertex` on that vertex, its opening by `setAttr` on `ground.at` (re-hosted by `pointLocate` on the ground's `PlatKey`, `ground.host` rewritten, refused as F-EDIT outside II.7.3's admitted ground); removed by `delete`
  | { t: 'setRoomRole'; building: Id; storey: number; room: Id; role: RoomRole }   // the plan events (item 28; the records are §2.6's): a role change re-derives what hangs off roles — windows, door kinds, furniture — and moves no wall
  | { t: 'moveWall'; building: Id; storey: number; wall: Id; deltaCm: Cm }         // slides a partition wall along its normal (mergeFaces then splitFace on the rung's transient arena, §3.4); both rooms re-checked against their rows' minimum area — F-EDIT when one falls below it
  | { t: 'splitRoom'; building: Id; storey: number; room: Id; cut: [PointCm, PointCm]; roles?: [RoomRole, RoomRole] }   // splitFace
  | { t: 'mergeRooms'; building: Id; storey: number; rooms: [Id, Id]; role?: RoomRole }   // mergeFaces, refused across a wing joint; one room, the surviving role chosen or given, the removed wall's openings dropped
  | { t: 'setOpening'; building: Id; storey: number; wall: Id; at?: Cm; kind: 'door'|'arch'|'open'|'none' }   // an entrance's door moves with its entrance (setEntrance) and is never removed here
  | { t: 'setWindow'; building: Id; storey: number; wall: Id; at?: Cm; op: 'add'|'move'|'remove' }   // exterior walls only
  | { t: 'moveStairCore'; building: Id; core: Id; bay: Polygon }                      // moves the bay on every storey it serves; each storey's partition re-runs around it, plan.layout kept where the wing is unchanged
  | { t: 'setRoomUnit'; building: Id; storey: number; room: Id; unit?: Id }             // item 28 (f): the household whose dwelling unit the room belongs to (§2.6's `Room.unit`); absent for a shared, service or circulation room; F-EDIT when it would leave a unit without its own door onto circulation or the street
  | { t: 'revert'; id: Id }   // "reset to generated": one undoable event that applies, in reverse log order, the inverses of every logged event whose target is this entity (its own edits only, never a `creation` or dossier event, §7.4); ctrl / cmd+click (§14's keymap, MFCG's ctrl-click reset)
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
  | { t: 'startWorks'; target: Id; kind: Works['kind']; startWeek?: number /* default: the document's week */; change?: WorksChange /* the hand change the Works shows — a build, convert, join, split or delete — folded at once at this event's position under its `seq`, author and session, carrying no EditBase fields of its own (§4.11 (1)); absent only for a repair, decay or clear of the target */ } | { t: 'cancelWorks'; works: Id }   // item 67: a timed Works on the weekly clock (§4.11; J-A67.72)
  | { t: 'placeLight'; kind: string /* a light rule row's kind */; point: PointCm; host?: Id /* default: the entity under the point */; heightCm?: Cm }   // item 68: a hand-placed LightSource (§2.7)
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
type WithoutBase<E> = E extends unknown ? Omit<E, keyof EditBase> : never;   // an event's own fields, member by member of a union, its EditBase fields removed
type WorksChange = WithoutBase<Extract<EditEvent, { t: 'build' | 'convert' | 'join' | 'split' | 'delete' }>>;   // J-A67.72: the change a startWorks wraps — exactly these five kinds; its EditBase fields are the wrapping event's
// Designation and MutationRecord are §4.7 S11's, RoomRole and Entrance §2.6's, ConversionOp §4.11's; Works, LightSource and UndergroundLink §2.7's (their rules §4.11's, §4.7's and II.7.6's); AccessPoint II.7.4's; DossierChange §7.7's; ClosureRecord §7.3 item 9's
```

No event stores a `VertexId`, `HalfEdgeId` or `FaceId` (§2.2 rule 5): geometry is addressed by entity address, by
lattice point with a role signature (bound by `resolveVertexAt`, never by distance alone), by a water body's address
with a course-knot ordinal (bound as §7.4's `moveCourseKnot` row states), or by a ring. Undo and redo are events like
the rest (§7.4): the log only grows, which is what lets a host store it (§11.3).

**The named actions** (G-R4; O16-core) are separate operations with distinct semantics, never one flag:
* **Regenerate (keep settings)** re-derives the scope with each entity's *recorded* inputs and unchanged rerolls
  (§7.3): faithful, and byte-identical when nothing upstream changed; used after a lock or a drawn constraint.
* **New random** — always on a scope: a block, a quarter, a building's rung, a person, or a rerollable layer such as the
  trees (`rerollLayer`); an unscoped new town is only the empty state's action, before anything is declared (§7.3 item
  10, item 101) — advances the reroll of every scope entity by one, written into the event as an absolute map, so a
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
| Equalize (regularises one cell's shape) | `equalize` | each cell under the brush moves its vertices `strength` × 20 % toward the targets `regularFit` returns for the cell's ring (§3.4) — MFCG 12710731's tool is its castle routine (§4.8, item 45) |
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
service door under §2.6's rules — it never removes the main entrance, which may only move along the footprint side §2.6 rule 1 puts it on —
and `setAttr(basement)` overrides the derived basement decision (an edited attribute, §7.2); `drawPassage` reserves a
covered passage under the front building of a plot as a passage face (§2.5) that gives the plots behind it their access
rows, and `convert` with `sealPassage` / `openPassage` (§4.11) seals or reopens one by setting `Passage.sealed` (§2.5); `Passage.headroomCm` and `Passage.frontBuilding` are derived — S11 writes them with the spanning wings' `spans`, a heights edit of a spanning wing re-derives the headroom, and the event that makes the front building a footprint trace or a tombstone clears `frontBuilding` (§2.5's `Passage`, §2.6's `BaseWing.spans`) — and have no edit kind of their own;
`setAttr(knownTo)` hides or reveals a place's name and purpose for §9.2's label policy; a `knownTo` the dossier set is
**dossier-owned** and a map `setAttr` of it is refused (F-EDIT `dossier-owned`; §7.7 items 7 and 11, J-A20.77), while
a label's display text and visibility (§9.1) and a viewer's knowledge key (§11.3) remain map-side choices (item 30); a front's
concealed programme (item 63) is edited like any other, through `setEntrance` and the plan events; the plan events above edit a
building's stored plan storey by storey, the first of them storing the composition (§2.6), each dry-run against §13.2's
plan bars on the overlay, so a move that would leave a room below its row's minimum or unreachable, or a unit without
its own door (item 28 (f)), returns F-EDIT and never a silent repair; a building's household count is changed by hand
through `convert` with `relet` (§4.11) within §2.6's capacity, which marks an unstored plan stale and re-cuts a stored
one inside the event (§7.3); an edit that lowers a building's capacity below its households — any change §2.6's capacity rule lists — re-homes the excess by that rule, each move among its fates (§7.3 item 4); a click on a building or a neighbourhood logs nothing
(item 28 (c)).

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
| terrain | `setField(terrain)` with `water: 'locked'` or `'follow'`, `drawWater` (hollows and lakes), `setAttr` on site features; `setAttr` on `geology` — an override of S1's value (§2.3), re-deriving the underground systems that read it (II.7.6's caverns) |
| water, coast, rivers | `drawWater`, `moveVertex` on shores and coasts, `moveCourseKnot` on a river's control knots, `setAttr` (bank class), `delete` |
| ways, junctions, bridges | `drawWay` (class `bridge` for a new crossing), `moveVertex`, `warp`, `split`, `merge`, `delete`, `setAttr` (class, width, surface, name; a bridge's kind) |
| districts | `drawBoundary` (its points form, item 101), `quarter` (sugar, item 101), `merge`, `split`, `setAttr` (kind, name, its per-district intent — `DistrictIntent`, §7.7's layer 2 —, `identity` — an override of the derived identity, item 72; §4.5), `regenerate`, `adjust`; `setAttr(fabric)` + `regenerate` is a stage-2 template replacement; derived, no edit kind of its own: the character vector and the band range (§4.5), `pressure` (written only by epochs) and `nameHistory` (written by §6.3's case (5) and by a dossier rename, §2.5); an undercity neighbourhood (II.7.5) is a district like any, with `convert` `clearUndercity` |
| reservations (§2.5) | `setAttr` on a market's `rank` (`principal` or `secondary`, item 24): a Re-derive from S3 with its fate report, §4.2 S3 (12)'s batch taking the edited rank as a fixed input (J-A24.71) |
| blocks, plots | `split` and `join` (item 31's splitting and fusion: the least-disruption re-cut of §4.7 S10 (7) with S11's mutator, neighbours fixed, undo exact — §7.4), `merge`, `fill`, `setAttr` (use, owner, `knownTo`; `tenure` — derived from the owner and the band, the edit an override kept like `knownTo`, item 70 (a cluster's structures are buildings, edited as such, and a re-pack of a cluster is its plot's `regenerate`); `frontJitterCm` — 0 or in [`jitter.minM`, `jitter.maxM`], the footprint re-fitted by S11's mutator with the neighbours fixed, item 43; a block's `reach` — `open`, `passage` or `gated` — which re-derives the block's interior by S10 (7)'s re-cut with its neighbours fixed, J-A30.72; never `builtBand` or `builtProsperity`, derived state written only by the paths §4.11's floor paragraph lists — J-A31.44, J-A31.71; never `fieldBand`, derived state written only by a derivation that reads the current field and by the epoch's re-banding (§2.5, J-A28.29); never `exposure`, derived from the access rows; never a block's `due`, derived and written only by §4.11's ladder), `regenerate`, `lock`, `assign`, `placeAt`, `rejectSite`, `drawPassage`, `convert` (`plotToGarden`, `amalgamate`, `subdivide`, `densify` (`infill`, `back_court`), `thin` (`infill`, `back_court`), `sealPassage`, `openPassage`; §4.11) |
| buildings | `drawFootprint`, `build`, `moveFootprint`, `swapUse`, `paint`, `setAttr` (class, heights, roof, basement, `knownTo`, `condition` — an edited attribute §4.11's rung 1 then leaves as set, §7.2, J-A31.76), `setEntrance`, `delete` (a generator-added building only; a dossier-backed one becomes `rejectSite`, §7.7), `convert` (demolish, abandon, decay, ruin, clear, rebuild; vacate, reoccupy, reuse; openUse, closeUse, relocateUse, mutate; `relet` — the household count within §2.6's capacity, item 28 (f) — §4.11), `startWorks` / `cancelWorks` (item 67), `addUndergroundAccess` (item 66; §7.3 item 9), `assign`, `regenerate` with `rung`, the plan events (item 28; `setRoomUnit`, item 28 (f)), `lock` on a room's path (`plan/rooms/<id>`); derived, no edit kind of their own: `nextEntrance` (written by §2.6's entrance derivation and `setEntrance`), `reusedAs` (written by `convert` `reuse`, §4.11), `formerUses` (written by the use conversions that close a building's use or move it elsewhere, §4.11), `predecessor` (written by `reuse … build`, §4.11), each base wing's `spans` (written only by S11 when it builds or re-fits a passage's front building, and cleared by S11 or by the event that makes that building a footprint trace or a tombstone, §2.6), each slot's `frontage` (§2.5's `BuildingSlot`: from the designation template, re-derived by S11's mutator) and each slot's `unhoused` (§2.5's `BuildingSlot`: written by every run of §4.7's generation fill, cleared by the designation mutator) |
| walls, gates, towers | `drawWall` (its points form, item 101), `placeGate` (sugar, item 101), `moveVertex`, `setAttr`, `delete`, `convert` (wallToWay, gateToJunction; neglect, breach, dismantle, contractWall — §4.11); derived, no edit kind of its own: an enceinte's `supersededBy` (written by `contractWall`, §4.11) |
| uses (§2.7) | `convert` (openUse, closeUse, relocateUse — §4.11), `swapUse`, `setAttr` (specialisation; a concealed use's `concealment`, `front` and `knownTo`, item 63 — dossier-owned where the dossier set them; `concealmentSource` written with `concealment` — `edit` for a map value —, no edit kind of its own), `assign` / `unassign` and the assignment's `pinned` (§7.7); a use's address moves with it (§6.3) |
| institutions (§2.7) | `setAttr` (`knownTo`, name, `concealment`, `front`, `powers`), `assign` / `unassign` (§7.7); a value the dossier set — a dossier-named institution's name or kind, its `knownTo`, concealment, front or `powers`, its assignment's `state` (item 80), a claimed quarter name (item 82) — is **dossier-owned**: a map `setAttr` of it returns F-EDIT `dossier-owned` and changes nothing, while a label's display text and visibility (§9.1) and a viewer's knowledge key (§11.3) remain map-side choices (§7.7 items 7 and 11; J-A20.77) |
| tunnels, galleries, chambers, links, access points (II.6, II.7; staged, editable in the base) | galleries of another system are `drawTunnel` with its `system` and chambers `drawChamber`, each in its system's part (J-A65.71), edited like tunnels (`moveVertex`, `setAttr` on kind, depth, width and `knownTo`, `delete`, `convert` silt, caveIn, seal, reopen and `flood`, II.6, item 65; a gallery's `walkway` derived by II.7.5, no edit kind of its own); links: `addLink`, `setAttr` (kind, `knownTo`), `delete`; a buried old town is `convert` `raiseGrade` (II.7.6); tunnels: `drawTunnel`, `moveVertex`, `setAttr` (kind, `widthCm`, `headroomCm` — `navigable` re-derived from them, §2.7), `delete`, `convert` (silt, caveIn, seal, reopen) — a tunnel's condition is no `setAttr` path: it reads `existence` and `closure`, so a condition change is the matching `convert` (J-A11.21), and the profile preset is II.7.2's network choice, not a tunnel field; access points: `placeAccess` (from public ground), `addUndergroundAccess` (from a building's basement: a closure, §7.3 item 9, item 66), `moveVertex` on the `access_point` vertex (the underground end), `setAttr` (kind, role, `state` — open, locked or bricked, a collapsed reading never set — and `knownTo`, item 64; `ground.at`, the opening — re-hosted by `pointLocate` on the ground's `PlatKey` and refused as F-EDIT outside II.7.3's admitted ground), `delete`; `setLayer` on `underground` is the CITY / METROPOLIS visibility toggle (§7.8); J-A12.71 |
| sky islands (II.6; staged, editable in the base) | `setAttr` (area, altitude, state), `lock`, `convert` (resizeIsland, settleIsland, fallIsland, refloatIsland, raiseIsland); `recipe.layers.islands` is an `adjust` that re-derives from S7b (§7.8) |
| terrain and water conversions (§4.11, item 25) | `convert` (`reclaim`, `siltReach`, `shiftCourse`, `digCanal` — the slow conversions the evolution engine will schedule, usable by hand now), repaired through S1's terrain or water operator or the carve: a marsh's `reclaim` by the terrain operator (§7.3 (a)), a foreshore's `reclaim`, `siltReach` and `shiftCourse` by the water operator (§7.3 (b)), `digCanal` by the carve (§4.11); derived, no edit kind of its own: `LandUse.reclaimed` (written by `reclaim`, §2.3, §4.11) |
| works (§4.11, item 67; J-A67.71) | `startWorks`, `cancelWorks`, `setAttr` on the Works (`startWeek`, its duration within its `WorksTable` row) — its stage at a week derived, never set |
| lights (§2.7, item 68; J-A68.72) | `placeLight`, `setAttr` (kind, `heightCm`, colour, intensity, `radiusCm`; `point` — re-hosted by `pointLocate` on its host's `PlatKey`, refused as F-EDIT off its host), `delete`, `lock`; derived lights (lit windows, the plan rung's room lights) have no edit kind; the view's light keys (§2.9) are not logged |
| greenery, trees | `drawGreen`, tree brush, `instance`, `setAttr`, `delete` |
| fields | `setField` (prosperity, density, greenery); `setAttr` on the town's `FieldBands` (an explicit re-banding) — both authorial: the blocks they re-derive past τ take the new field as their built state and their plots' `builtBand` (§7.2, item 31) |
| names, labels | `setAttr` (text; a label's `displayText`, §9.1, cleared by `revert`), `moveLabel`, `hideLabel`, `rerollLayer(naming)` town-wide or on chosen entities (`ids`), `group` (a region label group — `RegionGroup`, §9.1 — sugar, item 101; renamed by `setAttr`, removed by `delete`); a name the dossier gave or claimed is dossier-owned, its label's display text a map-side choice (item 20 (h)) |
| layers, style | `setLayer`, `setStyle`, `paintGround`; view keys are not logged (§2.9) |
| people, households | `setAttr`, `setAttrMany`, `lock` with paths, `regenerate` (person scope), `pin`; a household's building and its dwelling unit (§2.7, item 28 (f)) follow `relet` and item 17's relocation (§4.11, §10.3), never a bare `setAttr` |
| close-ups (stage 2) | every kind above on close-up entities, after `closeup`; `instance` for presentation edits |
| rule tables, presets | `editTable`, `editPreset` (row operations, §7.6) |
| history | `epoch`, `convert`, `rebase`, `upgrade`, `undo`, `redo`; the dossier events — `assign`, `unassign` and `setAttr` with `EditBase.dossier` and `EditBase.dossierChange` set, produced by the dossier port and folded in the host's order (§7.7, items 73, 75); the creation prefix's `assign` events carry `EditBase.creation` (§7.4) |

**Dry-run validation (G-R10).** Every event is validated before commit on the scratch overlay: the schema, the
batch-local and stage-end invariants of its scope (§5.3), and the edit-fate report of its effective scope with its
case-(4) renames (§7.3 item 4) — for a chained operator (§7.3 item 3) the whole chain runs on the overlay, so the report
lists every re-sited bridge, re-routed or cut way and re-based building before anything commits; for a declaration's points
form, the derived shape with its handles; for an area declaration (`quarter`, `fill`, `roster`), the plots, households and
buildings it will hold — the count the ghost's badge shows (§9.5; item 101 R14); for an `undo` or
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
confirms the demolition as a fate (item 31). A map event — one a user, or a host's map edit, appends without
`EditBase.dossier` — that would close, remove or re-designate a dossier-backed element (§7.7 item 2's list) returns
F-EDIT with `rejectSite` and `placeAt` offered (J-A20.75). A map event that would change a dossier-owned value (the
institutions row above; §7.7 item 11, J-A20.77) returns F-EDIT with the reason `dossier-owned`, the map-side
alternative named with it where there is one (§5.2).

**The authoring toolkit (item 101; owner: "come up with an elegant set of tools for both an ai clerk and a user where a
dedicated user can build it or emulate it"): declare, then derive (J-A101.71).** Authoring is a set of DECLARATIONS,
each one of the events above or sugar over one, with one dry run, one fate report, one commit and one undo, so nothing
changes silently. The rules derive everything undeclared — item 20 (h) applied to human input: a declared fact stays
fixed, like a dossier fact, until its author changes it (§7.2; §2.8's `factTier` reads it `declared`). A declaration is
refused only where it contradicts a dossier fact or a lock, with its reason and the closest acceptable declarations
(item 20 (g); §5.2 F-EDIT); every other infeasible declaration is bent by its dry run to the nearest lawful one, which
the dry run names in one line (item 101 R2). **Emulating** a city is declaring its intent, bones and programme (L0–L2)
and letting the rules fill the fabric; **building** it is declaring the fabric too (L3–L4) — the same tools at a
different depth. The twelve tools, in five layers of commitment (the author may stop at any layer; everything below
it is derived):

| layer | tool | the events it emits |
|---|---|---|
| L0 intent | T1 `intend` | the recipe's intent at creation (§7.7 layer 1: site, size, form, era and style, prosperity, walls); afterwards the Adjust and Re-derive events of the basic panel's controls, which are its sliders (§7.8) |
| L1 ground and bones | T2 `ground` | `setField(terrain)`, `warp`, `drawWater` (its points and level forms), `moveCourseKnot` |
| | T3 `wall` | `drawWall` (its points form), `placeGate` |
| | T4 `road` | `drawWay` with its class — a road across water a bridge (§7.1's drawing rule) — in its points form |
| | T5 `quarter` | `quarter` |
| L2 programme | T6 `place` | `placeAt` (its point form), `assign`, `build`, `drawFootprint` |
| | T7 `roster` | `roster` |
| L3 fabric | T8 `fill` | `fill`, `setField` (density, greenery, prosperity), `drawGreen`; its three variations are §7.3 item 10's |
| | T9 `shape` | `split`, `join`, `drawFootprint`, `moveFootprint`, `setAttr`, `setEntrance`, `paint`, the plan events |
| | T10 `hold` | `lock`, `pin`, `revert`, `regenerate` (keep, or New random on a scope) |
| L4 finish | T11 `name` | `setAttr(name)`, `moveLabel`, `hideLabel`, `group` |
| | T12 `dress` | `setStyle`, `setLayer`, `paintGround`; the furniture (§9.5) and the exports (§11); the underlay is view state (§2.9, §9.5) |

A new capability adds a parameter to an existing tool, never a thirteenth tool (§13.2's elegance bars).
* **Sugar events** (J-A101.72) are logged as themselves — one undo step, one fate report — and expanded at their fold
  into the events they stand for by the sugar expansion table (`sugar.json`, §7.6) at the version the event records
  (`expansion`), so a replay and an upgrade expand them exactly as the session did (§7.5); what an expansion creates is
  minted from the sugar event's `seq` (§6.3). `placeGate(enceinte, at)` is a short through-way stub of the enceinte's
  gate class crossing the trace at `at`, square to it, so S7's operator builds the gate there — and a gate also arises
  wherever a declared road crosses a wall (§7.3's S7 row). `quarter` is a `drawBoundary` (with its kind's size band and
  snap), a whole-neighbourhood `assign` naming that kind as its `function` — which §4.5's character reads as it reads a
  dossier kind, a declared kind winning over an emergent identity —, a `setAttr(name)` and, when a band is given, a `setField(prosperity)`
  stroke over the boundary moving its mean to the band's centre. `roster` is one `assign` per line (its class, name and
  locus as `PlacementCriteria` hints), all in one group and solved together by §4.7 S10b's solver in one dry run in its
  claims-first order; a line the rules cannot honour is listed with its closest options and not committed. With a
  dossier connected the roster is the dossier's: a line must name a dossier element (`RosterLine.element`) and expands to
  a `placeAt` of it — the author may only place — and a line that names none returns F-EDIT `dossier-owned` with the
  dossier's unplaced elements offered. `group(name, quarters)` creates a named region label group over those nodes of
  §9.1's quarter tree.
* **Points in, shape out, handles always** (item 101 (i); J-A101.73). `drawBoundary`, `drawWater`, `drawWall`, `drawWay`
  and `placeAt` take a points form (`PointsForm`; water also a level): the dry run derives the shape with the operator
  that builds that class and stores it in the event's geometry fields, resolved, as `EditScope` is, so no replay and no later
  derivation re-derives or moves an accepted shape. A **quarter** grows from its seed point along block edges to its
  kind's size band by §4.5's grower (two to four points give its far edges; a lasso its outline), its boundary snapped to
  street centre-lines, water, walls and ridges and never through a block, the kind steering the snap (a harbour quarter
  hugs the shore, a manor quarter prefers high dry ground, a market quarter centres on a square); a **lake** fills the
  basin S1's terrain gives it to the declared level; a **river** runs from a source to a mouth by S1's water operator;
  a **coast and harbour** take a sea level and one shore point with a basin size, their quays by §4.8's harbour rules; a
  **wall** follows ridges and contours between two or more points by S5a's trace, closing when its ends meet; a **road**
  joins two points by S4's router with its class (§4.3); a **place** takes the plot its one point selects — the plot under
  it, else the nearest lawful one by §4.7 S10b — and S11's site plan. The derived shape keeps four to eight handles by
  default (more on demand); dragging one is a new declaration of the same kind on the same entity (a `drawBoundary` with
  the district's id, a `moveVertex`, a `moveCourseKnot`), so its fates list what re-derives, locally. The authoring
  surface's feature snap (§9.5) is visible and escapable and is resolved into the event's points before the dry run;
  the kernel's attraction (§3.6) applies to every insertion and is never escaped. A brush is many seeds and a lasso
  many points: one event kind per thing.
* **Three surfaces, one vocabulary.** The canvas (§14's reference UI), the clerk's tool API, over §11.2's embedding API, and the skeleton
  file (§11.1 — the ordered declarations, imported as the log's creation prefix and read ahead by their stages, §4.1,
  §7.7) produce identical events. A clerk's proposal is a dry run shown as a ghost; accepted, it commits with
  `proposedBy: 'clerk'` and the user as its author (J-A101.74). The clerk never bypasses the dry run or the undo, never
  writes a dossier fact, and reads only what its viewer may know (§9.2). The tool API and these events are the base's;
  the built-in clerk and plots on a bridge deck are staged (*Staged by the owner's roadmap*).

=== REPLACE ### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8 ===
### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8

**Replay semantics.** The log is an **ordered fold**: each event applies to the state its predecessors produced,
through the same code path interactively and on replay; nothing is hoisted, and epochs, rebases, upgrades, undo and redo
are events like any other. **The one read-ahead** is the creation prefix: the base derivation's S2 reads the log's
`creation` events — the blueprint's and the creation dossier's `assign` events at positions 0…k (`EditBase.creation`,
§7.1) — as fixed rows before it runs, and each stage reads a skeleton's drawn declarations there as its constraints
(§4.1, item 101; J-A101.41), and folding those events afterwards records the generation run's placements and
places nothing a second time (§4.2; J-A22.41, J-A22.72, J-A22.74). A `creation` event belongs to the base derivation
it feeds, not an edit of the map it made: it is never an `undo`, `redo` or `revert` target — the undo key and `revert`
skip it, and an `undo(h, of)` naming it returns F-EDIT offering `unassign` for a blueprint assignment and `rejectSite`
and `placeAt` for a dossier element (§5.2) — and it is never truncated. A blueprint assignment is removed by
`unassign` (§7.3 item 8's mutation), a skeleton's declaration by a later declaration or a `delete` (§7.1's toolkit), a
dossier element only by a dossier event (§7.7 item 2). Every later dossier event (`EditBase.dossier` set, §7.7 item 1) is likewise no `undo`, `redo` or `revert` target of a map event: `revert` skips it, and an `undo(h, of)` naming it returns F-EDIT offering `rejectSite` and `placeAt` for each dossier element it placed or re-designated (a dossier `unassign` leaves none to offer); an `epoch` that carried one in `EpochInputs.dossier` is refused as an `undo` target the same way, because undoing either would change dossier content without a dossier instruction (item 20 (c)). In the table,
"case (4)" means the event runs §6.3's case (4) for the name it frees or whose inputs it changes, the rename listed,
confirmed and stored in the event (§7.3 item 4).

| kind | create | read | persist | regenerate (how the engine honours it) | undo | migrate between output versions |
|---|---|---|---|---|---|---|
| lock / unlock / pin / unpin | UI or API on any address, optionally on attribute paths | entity `flags` (derived from the log) | log | a fixed input; dependants re-derive around it; a lock on a name path keeps the naming record dormant (§2.8); an `unlock` that frees the name runs case (4) | inverse event; undoing a `lock` that frees a name runs case (4); an unlock that re-drew a name keeps the former name and naming record in its undo record, which its undo restores | address mapped (§7.5); an orphaned lock re-imposes its last geometry as a drawn constraint unless the user drops it |
| setAttr / setAttrMany / paint | UI / API; a bulk query resolved to ids at dry run | entity attributes; `flags.edited`, `editedPaths` | log | an input override at the stage that computes the attribute (a name: S13a keeps it and never re-draws it while edited, its naming record dormant; a district kind: S6 reads it as fixed; heights and roof: S11); implicitly pinned (§7.2); a plot's `tenure` and a district's `identity` are overrides of derived values, kept until reverted (items 70, 72); a change of a front's designation runs S11's mutator on the front, the concealed use persisting and its concealed rooms re-fitted (item 63); a `setAttr` of a dossier-owned value never reaches the fold — its dry run refuses it (§7.1) | inverse (old values in the undo record); undoing or reverting a `setAttr` on a generated name returns it to unedited with its dormant naming record and runs case (4), the text it replaces kept in that event's undo record; a `setAttr` of heights or class that re-homed households keeps their former buildings in its undo record, which its undo restores (§2.6) | attribute names schema-versioned with a rename table; unmappable → orphan, reported |
| moveVertex / warp | vertex handle, stored as lattice point + role signature / staged warp session with Apply (§7.1) | geometry | log: the operation (arena key, strokes, `fromLevel`; a `moveVertex`'s `at` with its `VertexSig`); per-vertex displacements only as a verification record | the kernel's whole-step validation, halving, sliding and holding (§3.6); kernel-pinned vertices move (pins constrain smoothing, simplification and cutting); what stands on the ground is carried and re-based (below); moved water goes to S1's water operator (§7.3 (b)) | undo record: moved vertices, re-derived faces, the former birth levels and flags of promoted and demoted vertices and edges, the former points of displaced records, former wing rings, basement rings and stored compositions, former bases of re-based entities, and the households §2.6's capacity rule re-homed, with their former buildings | the operation replays at its log position; a `moveVertex` binds by `resolveVertexAt` — the exact point, else a signature match within the rebind radius, else orphaned and reported |
| moveCourseKnot | dragging a river's control knot | `WaterBody.controls` (§2.3); the knot's path `controls/<ordinal>` in `editedPaths` (implicitly pinned, §7.2) | log: the water body's address, the knot's ordinal, `at`, `to` | S1's water operator (§7.3 (b)); every later re-trace keeps the moved knot | undo record: the replaced scope of the whole chain and the knot's former position | once the water body's address is carried (§6.3), binds (1) the knot with that ordinal if within the rebind radius of `at` — half the body's control spacing (§4.2 S1 (3)); (2) else the body's nearest knot within the radius, ties by ordinal; (3) else orphaned and reported; never a knot of another body |
| drawWay / drawWater / drawWall / drawGreen / drawBoundary | drawing tools with resampling, snapping (first-crossing split, attraction) and validation at the authoring boundary (§7.1); their points forms (item 101) | entities with `existence = built`, author `user`; declared, so held (§7.2) | log (the geometry is the payload — for a points form the shape its dry run derived, stored resolved and never re-derived) | at its log position through its class's local operator (§7.2, §7.3), chained operators included | undo record: the replaced scope of the whole chain | the same geometry replays at its log position under the new version |
| drawTunnel / drawChamber / addLink / placeAccess (items 11, 12, 64, 65; J-A12.71) | the underground tools (II.7; a staged layer, editable in the base) | the `Tunnel` or `Gallery` record and its chain, the `Chamber` record and its outline, the `UndergroundLink` record and its two `link_end` vertices, each in its system's part (II.7.6); the `AccessPoint` record, its `state` and `knownTo` and its `access_point` vertex (§2.7, II.7.4) | log (the geometry is the payload) | at its log position: a drawn tunnel through II.7's network stage (its chain inserted on the underground arena, `navigable` derived) and the underground stage re-deriving the underground blocks its edges bound (§7.3's staged-layers row); a placed access point by II.7.3's access rules, its ground host found by `pointLocate` on the ground's `PlatKey`, nothing on the ground written; a gallery or chamber through its system's stage on its own part, and a link between its two parts' vertices, one part per batch (§3.4); an access point's underground end moves by `moveVertex` on its `access_point` vertex and its opening by `setAttr` on `ground.at`, re-hosted the same way and refused as F-EDIT outside II.7.3's admitted ground (§7.1) | undo record: the replaced underground scope; a moved opening's former `ground.at` and `host` | the same geometry replays at its log position; an access point whose element is unmapped is orphaned and reported |
| addUndergroundAccess (item 66) | a building's context action (§7.1); the API | the `AccessPoint` and the pieces of its closure; the event's closure record (`EditBase.closure`) | log: the building, the optional target and kind, and the closure record | at its log position, the closure's generators in dependency order (§7.3 item 9); its pieces held while it is live (§7.2) | undo record: the created pieces removed and what they replaced restored, the reused pieces untouched, a created basement back to its former state; a later `delete` of the access removes only the created pieces nothing else uses (§7.3 item 9 (c)) | replays at its log position; an event whose building is unmapped is orphaned and reported |
| placeGate / quarter / roster / group (sugar, item 101) | the authoring tools (§7.1's toolkit), the clerk's tool API (§11.2), a skeleton file (§11.1) | the entities its expansion made; declared, so held (§7.2) | log: the sugar event itself, with its `expansion` version — one undo step, one fate report | expanded at its fold into its events by `sugar.json` at the recorded version (§7.6), what it creates minted from its `seq` (§6.3) | undo record: the whole expansion's scope, as one step | the recorded expansion version replays; an upgrade whose expansion table changed maps the event as it maps the events it expands to, listed once in its diff (§7.5) |
| startWorks / cancelWorks / setAttr on a Works (item 67) | the Works tools (§7.1); an epoch's step (§4.11) | the `Works` record; its stage at a week derived from it (§4.11) | log: the event with the change it wraps (the epoch's own for an epoch's Works) | §4.11's Works: a `startWorks` folds the change it wraps at once at its position (§4.11 (1); J-A67.72) and creates the Works that shows it — the change of ownership at its start and the stages derived from the record and the week; a `cancelWorks` ends it by §4.11's rule | undo record: the wrapped change's inverse and the Works record, with the plots and buildings its start changed | the record replays; its stages follow the output version's `WorksTable` |
| placeLight / setAttr / delete on a light (item 68) | the light tool (§7.1) | the `LightSource` record (§2.7) | log | a hand-placed light is declared (§7.2): it survives a regeneration by its anchor — its host's address, rule row and ordinal (§6.3) — and follows its host's lifecycle (§2.8: removed with a demolished host, unlit on an abandoned one); rule-placed lights re-derive with their host's faces (§4.7, §4.11) | inverse; exact | by its host's address; a light whose host is unmapped is orphaned and reported |
| drawFootprint / build / moveFootprint / swapUse / fill | building tools (§7.1) | building and plot entities | log | S11 re-fits the host plot(s) with the footprint as a fixed slot; `fill` re-runs S11 on its scope with the forced arrangement | undo record | replays; a footprint whose host plot is unmapped re-creates a plot around it |
| delete / merge / split / join / convert (incl. the ladder kinds — `relet`, `densify`, `thin`, `subdivide`, `amalgamate` —, the decline kinds, the tunnel and island kinds, the use kinds, the sealing kinds, the terrain and water kinds of §4.11 and the underground layer's `flood`, `raiseGrade` and `clearUndercity`, II.7.5–II.7.6) | context actions; the evolution engine's plan (§4.11) | lifecycle events with cause | log | structural ops on the plat (§3.4): a district or way `split` / `merge` with dependants re-derived; a plot `join` or `split` is item 31's fusion or splitting — S10 (7)'s re-cut of the members with their neighbours fixed, S11's mutator on the result, no occupied building removed unless confirmed (§7.1, §7.3 item 8); `convert` = `retypeEdges` plus lifecycle events; decline conversions change `existence` and the drawing (§2.8), credit or debit the material ledger (§4.11), and a `reuse … build` succeeds at the trace's address (§6.3); tunnel conversions change the tunnel's `existence` and `closure` (its condition reads them, §2.7; J-A11.21) and close or reopen the frontage plots on the run (II.7.3); island conversions resize an arena or archive it (`fallIsland` lays the ruin face through the carve path, §4.11); use conversions open, close or relocate a `Use` (§2.7) with `detail.from` / `to` and mutate the buildings by S11; `relet` sets a building's household count within §2.6's capacity (item 28 (f)) — households added are minted from the event, households leaving go by item 17's relocation (§4.11, §10.3) —, marks an unstored plan stale and re-cuts a stored one inside the event (§7.3), no shell geometry changed; `densify … infill` and `thin … infill` add or clear yard buildings by S11's mutator; `densify … back_court` and `thin … back_court` re-cut the plot's yard by S10 (7) with its neighbours fixed, adding or removing a rear row and its passage face (§4.6, §4.11); `subdivide` and `amalgamate` are rung 3's re-cuts, whose hand forms are §7.1's plot `split` and `join`; `sealPassage` / `openPassage` set `Passage.sealed` (§2.5), change no geometry, and vacate or reoccupy the plots behind it (§4.11; item 30); `siltReach`, `shiftCourse` and a foreshore's `reclaim` run S1's water operator (§7.3 (b)), a marsh's `reclaim` its terrain operator (§7.3 (a)), and `digCanal` is the carve (§4.11); a split or join of a chain carrying a profile (a way's width, a wall's base, a tunnel's invert, a shore's bank kind or class) goes through `retypeEdges`' `rekey` on the part's `StretchRef` (§3.4) — each part gets a cut knot carrying the sampled value, a join knot is dropped only where the joined profile is unchanged (§2.2 rule 5) — and the event writes both records' returned profiles | undo record: members resurrect with their former rings, records and `builtBand`, tombstones return to live, both records' former profiles; a decline or tunnel conversion's former state and ledger rows; a fallen island's arena restored from the archive and its ruin face removed through the carve path's inverse; a `reuse … build` undo returning the address to the trace; a use conversion's former use and building links; a `relet`'s former count, household links and stored plan; a ladder conversion's former rings, records and passage face; a terrain or water conversion's replaced chain scope with the records §2.3 lists; a mutation's inverse record | same |
| regenerate / adjust / re-derive from Sk | the named actions on an area, district, block, plot or person | report entry; the fate list | log: resolved scope, mode, absolute rerolls used, confirmed fates and renames | §7.3; New random's content check (§5.1 (6)); a pack-list `adjust` and any re-derivation reaching S13a run case (4) for the unedited names citing a changed slice; `Adjust` re-derives with the current field and sets `builtBand` in its scope, listed in the fate report, while Regenerate (keep settings) keeps it (item 31) | undo record: the effective scope's faces, entities (names and naming records included), lifecycle events and tombstones, O(scope) — an undo restores the former names, never re-draws them | the scope replays; fates and renames recomputed and compared under §7.3 item 4's rule |
| assign / unassign (a dossier event among them, `EditBase.dossier` set) | assignment dialog / host API / the host door (§11.4) | `assignment` fields, `flags.assigned`; a dossier-backed assignment's `existence: 'dossier'` (§7.7) | log; blueprint and dossier-at-creation assignments at positions 0…k, flagged `creation` and read ahead by S2 (Replay semantics, above) | §4.7 S10b places (claims-first at positions 0…k, the least-disruption order after the city is built) and §4.7 S11 mutates each placed plot, the record in `EditBase.mutations`; an assigned name keeps the naming record dormant; an `unassign` leaves the plot vacant (`closeUse`, §4.11) and frees the name, which runs case (4); a dossier-backed element's existence is held (§7.2) | the inverse mutation from the undo record (§4.7 S11 rule 5) and the former placements — for an event that is neither a `creation` event nor a dossier event, which are no undo targets (Replay semantics, above) | addresses and criteria; unmapped members re-solve around the mapped ones (§7.7); a dossier element re-binds by its `DossierRef` |
| rejectSite / placeAt (item 20 (b), (g)) | the map's "delete" of a dossier-backed element; the "make this place X" action | the rejection record and the plot's pin (§2.8, §7.7) — model data | log | `rejectSite`: the element is re-placed by §4.7 S10b's solver at the event's position and the site is excluded while the rejection holds; the hold lapses — the site eligible again — by §7.7's lapse rule (item 3), the lapsing event writing the lapse into the record inside its own touched set, never as a log event of its own (J-A20.74); `placeAt`: the plot is pinned to its element or designation, honoured by every later placement and re-application that can, reported when one cannot | inverse (`lift`); the re-placement's scope restored from the undo record; an undo of a lapsing epoch that carried no dossier event restores the hold, while an `undo` naming a lapsing dossier event, or an epoch that carried one, returns F-EDIT (Replay semantics, above) | by the site's and the element's addresses; an orphaned rejection or pin is reported |
| setEntrance / setAttr(basement) (item 29) | building tools (§7.1) | `Building.entrances`, `Building.basement` (§2.6); `editedPaths` | log | edited attributes: a moved main entrance and an added, moved or removed door are fixed inputs of the site plan, carried with the wing (§2.6) and re-fitted around by S11's mutator on a designation change — a house that becomes a shop gains its street door, a shop that closes keeps its door as a house door (§4.7 S11); an edited basement is kept through terrain changes (§7.3 (a) 4) | inverse | with the building's address; an entrance whose wing is unmapped is re-placed by §2.6's rules and reported |
| drawPassage / sealPassage / openPassage / setAttr(knownTo) / setAttr(reach) (item 30) | context actions on a plot, a block, a building or an institution | the passage face and its `Passage.sealed` bit (§2.5; an access row on a sealed passage face reads sealed), `Block.reach`, `Plot.knownTo` / `Building.knownTo` / `Institution.knownTo` | log | the passage face and the rear plots' access rows are fixed inputs of S10's re-cut; an access row on a sealed passage is skipped by §5.3's reachability walk and the plots behind it decay as vacant under §4.11's ladder; a `setAttr` of a block's `reach` re-derives its interior by S10 (7)'s re-cut with its neighbours fixed (J-A30.72); `knownTo` is read by §9.2's label policy only — no model geometry changes; a `knownTo` the dossier set is dossier-owned and a map `setAttr` of it is refused (§7.1, §7.7 item 7; J-A20.77), and a dossier event that sets one writes it as any dossier fact | inverse | by address; a passage whose building is unmapped is reported |
| plan events (setRoomRole, moveWall, splitRoom, mergeRooms, setOpening, setWindow, moveStairCore; item 28; setRoomUnit, item 28 (f)) | the plan tools on the building band (§8.5) | the stored composition's plan (§2.6); a room's `unit` (§2.6) | log; the first plan event stores the composition (§2.6) | a fixed input to the rung's re-derivation — a stored plan whose inputs change is re-cut inside the changing event around the edited rooms, as any edited attribute is (§7.2), from the stored plan as its canonical prior (§7.3's table); an edited unit is kept while its household still lives in the building and listed as a fate when it leaves; `carryWings` carries the rooms with the wings | undo record: the former storey | by the building's address and the room's anchor (§6.3); else orphaned and reported |
| regenerate with `rung` (item 28) | New random on one elaboration rung | the rung's counter (§6.1; the event's map under `<building id>#<rung>`) | log | the rung re-derives with its advanced counter under §5.1 (6)'s content check, which compares the rung's own derived result, identity left out (an unstored rung is outside every digest, §6.2); re-rolling a finer rung changes no coarser stream (§6.1): `plan.layout` keeps the wings, entrances and stair core, `plan.roles` every wall and opening position | the previous counter; the rung's cached result is recomputed, never stored in the record | replays |
| `builtBand` (a plot attribute, item 31 — not an event kind: its paths) | the writers §4.11's floor paragraph lists (J-A31.44) | §4.11's ladder; S10 and S11 through the manifested band `max(field band, geometryFloor)` (§4.7 S10 (2), S11) | the plot's attribute columns (§2.9), in the leaf digest | Regenerate (keep settings) keeps it; `Adjust` and a brush reset it in their scope (authorial, §7.2; J-A31.72); an epoch writes it only through §4.11's writers — a rung-3 event, rung 2's back court for the new rear plots it creates (which take their stock's band), a completed upward refurbishment (which raises it) — so a standing plot's `builtBand` is lowered only by a rung-3 event | restored by the undo record of whichever event wrote it | a document written before the attribute existed gets `builtBand` = the band its plot's `DerivationRecord.band` holds (§7.5) |
| `fieldBand` (a plot attribute, item 28 (f) — not an event kind: its paths) | every derivation that reads the current field (generation, `Adjust` and a brush's re-derivation past τ among them) and the epoch's re-banding after S6 (§2.5, §4.11) | §2.6's interior ladder, `ClassRules.pick` and the plan rung's recorded inputs (§2.8) | the plot's attribute columns (§2.9), in the leaf digest | Regenerate (keep settings) keeps it; `Adjust` and a brush set it in their scope; an epoch re-bands it | restored by the undo record of whichever event wrote it, an epoch's among the entities it replaced | a document written before the attribute existed gets `fieldBand` = the band its plot's `DerivationRecord.band` holds (§7.5) |
| setField (brush) | prosperity / density / greenery / terrain brush; the terrain brush's `water` mode (§7.2) | the stroke list; the composited field or heightfield | log (strokes) | field strokes: blocks whose inputs moved beyond τ re-derive (§7.2); terrain strokes: S1's terrain operator (§7.3 (a)), in `follow` mode with the water operator; a brush is authorial and sets `builtBand` in the blocks it re-derives (§7.2) | the stroke leaves the list; the field or heightfield re-composites (exact) and the operator re-runs on the stroke's region; the households §2.6's capacity rule re-homed restored to their former buildings from its undo record (§2.6) | strokes are geometry and replay |
| editTable / editPreset | tables editor, presets dialog | the override layer (§7.6) | log: row operations by key with the base row's hash; the fallback's confirmed fates; renames | entities whose derivation record, naming record or provenance cites a changed slice hash re-derive; a changed naming slice runs case (4) for exactly the unedited names citing it; a predicate table, or a kind whose recorded slices are unavailable, re-derives from the table's first reader stage with fates (§7.6) | inverse row operations; the re-derived entities — renamed names with their former naming records among them — restored from the undo record, never re-drawn; the households its capacity re-homing moved restored to their former buildings | a row that changed or vanished in the new table version → orphan, reported and kept |
| instance (and the tree brush) | tree tools (a batch of `instance` events), instance handles | the entity's instance set with its overrides | log | applied by ordinal while the entity's lineage is unchanged since the event (no `carry` or supersession after its `seq`) and the ordinal's generated position lies within 0.5 × the spacing of the recorded `point`; otherwise re-matched by position to the nearest unclaimed instance within 0.5 × the spacing (a superseded entity's overrides move to its `supersededBy` successor), else orphaned and reported (§8.10) | inverse | ordinals are geometry-stable only under the same lineage; otherwise re-match by position |
| rerollLayer | "reroll names / trees / decoration / compass / emblem" — §6.1's rerollable concerns; names also on chosen entities (`ids`) | the effective salt: the recipe's initial value set by the log's town-wide `rerollLayer` events; for an ids-scoped naming reroll, the per-entity salts in the event | log: absolute salts (with `ids`, those used after §6.3's case (3) advance) | naming: S13a re-draws every unedited name (town-wide) or the listed entities' unedited names, uniqueness by §9.6; instances, crowns, jitter: display only; compass and emblem: furniture only (§9.5) | the previous salt; for naming, the previous names and naming records from the undo record | replays |
| revert (reset to generated) | ctrl / cmd+click, context action | the entity's own logged edits | log (one event) | the inverses of the entity's own events applied in reverse log order at the revert's position; edits to other entities stay; a name it frees runs case (4) | inverse: re-applies them | follows the entity's address; an event whose target no longer maps is reported |
| moveLabel / hideLabel | label handles; the dry run refuses a placement whose box at its stop meets another pinned label's box there, returning the nearest free position (§9.2) | `LabelEntity.pinned` / `hidden` — model data, in the digest (§6.2) | log | honoured by S13b (§9); the `LabelEntity` exists at the event's log position in session and replay, S13a running per event (§7.3 item 2) | inverse | follows the target address; unmapped → orphan |
| setLayer / setStyle / paintGround | UI, style dialog | style state (canonical, outside the model digest) | log | no model re-derivation; the display list rebuilds | inverse | style schema versioned |
| people: pin, setAttr, lock with paths, regenerate a person | an explicit action or edit only — never viewing | the pinned or edited fields; everyone else is derived | log | pinned and edited people are fixed inputs, re-homed to the household that inherits their household's address (§6.3), else orphans reported (§10.3) | undo record | person-table version recorded per household; person keys map through the household's address; orphans reported |
| closeup (stage 2) | logged before the first edit inside a close-up | the close-up's entities, a refinement level of the district | log (strategy, params) and the edits after it | a pure function of the district's committed state, sub-seed, strategy and params; a base re-derivation of the district re-derives its close-up with carry-over, re-matches presentation `instance` edits by position and reports orphans | undo record | replays |
| epoch | `grow(doc, inputs)` (§4.11) or a circumstance-schedule entry | the derived `EpochRecord`; lifecycle events with cause | log | §4.11's incremental path at its log position: each plot's `fieldBand` re-banded after S6 (§2.5), regrowth-first siting, the survivors' ladder bounded by the geometry floor — its rung-1 `relet` marking unstored plans stale and re-cutting stored ones along the interior ladder inside the epoch (item 28 (f), §7.3) —, the use step, the decline lottery, the island and underground laws; every live rejection is re-checked by §7.7's lapse rule (item 3); a dossier change the host sends with the epoch rides in `EpochInputs.dossier` and is applied at §4.11's step (e), one sent between epochs folding at its own log position (§7.7 item 6; item 22 (e)); the epoch carries its absolute week (§4.11, item 76), the Works it starts are records whose stages the week derives (item 67), and its character step recomputes each district's vector, moves identities past their hysteresis, writes the pressures and renames by §6.3's case (5) (§4.5, item 72) | undo record: the faces and entities it replaced (O(epoch scope)), with the identities, pressures and names it wrote | a multi-epoch document upgrades by replaying the whole ordered log with a per-epoch diff, or stays pinned to its output version |
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
  `creation` event, a dossier event or an epoch that carried one (above) — live unless an `undo` targets it and no later `redo` re-applies it; a `group` counts as
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
  the restored state it reproduces the target's result exactly. An edit whose capacity re-homing moves households (§2.6) keeps in its undo record, whatever its row's undo, the former records of the buildings it moves them out of and into and, where it re-provides a dossier household's housing (§4.7), the plots the re-provision touched (§7.3 item 1) — the site with the residential slot built there, its joined neighbour, each displaced use's new site — and its undo restores them with the households it re-homed.
* **Independence** (the check that keeps undo exact when others have edited since). An undo is applied only if every
  live event after its target is independent of it: the later event's touched set and effective-scope faces are
  disjoint from the target's touched set and from the target's effective-scope faces dilated by one ring of adjacent
  faces at the coarsest level either touches. Otherwise the dry run returns an F-EDIT conflict listing the dependent
  events and their authors; the session may undo its own dependent events first (each its own `undo`), and an owner may
  undo through a chain — never through a dossier event or an epoch that carried one, which are no undo targets (Replay semantics, above), so a target one of them depends on stays live. A `redo` is checked the same way against the live events after its undo. Every client folds the
  same events in the host's order on the same state, so the check has the same outcome everywhere; an `undo` or `redo`
  whose check fails at its log position (possible only in a hand-built log) is a reported no-op, identically on every
  client and on replay. A whole-town event (an upgrade, a rebase, a Re-derive from S1) is therefore undoable only while
  it is the latest live event.
  **Independence through the input layer** (Fable review 2026-09-27; J-Fdet-1). The check above reads touched sets and
  effective-scope faces, which see geometry and records but not the inputs a derivation reads, so it also holds a later
  live event **dependent** on its target when the target changed an input that event's derivation read. For an
  `editTable` or `editPreset`: when an entity the later event derived — one in its touched set whose leaf digest a
  stage, S13a's delta, a re-cut or a rung wrote, which the touched set marks apart from the addresses the event merely
  set — cites, in its derivation record, its naming record or its provenance (§2.8), a slice whose hash the target's row
  operations changed (the slices, recomputed from the target's operations and their base rows by §7.6's slice kinds).
  For an `adjust` — a parameter, a Re-derive from stage k or the pack list — and for a town-wide `rerollLayer` of
  `naming`: whenever the later event derived any entity, because every derivation reads the effective parameters, the
  pack set and the town salt. An `undo` or `redo` whose target is one of these events counts as one. An event that
  derived nothing depends on no such target. So an input change is undone through its dependants, as the chain rule
  above states, or stays; the state after a permitted undo is the fold of the log without its target, and no derivation
  record is left citing a slice the effective tables no longer hold. The check costs the later events' touched sets and
  their records' slice references, kept for every event (Records on other clients, below). *Fixtures (B-EDIT, §13.2):*
  an `editTable` on a heights row followed by a `build` on a plot the edit did not touch, an `adjust` followed by a
  `drawWay`, and a town-wide `rerollLayer(naming)` followed by a scoped regeneration that draws a name — each later event
  is reported dependent, and once it is undone first the target's undo gives the model digest and records digest of the
  log without the pair; an `editTable` followed by a `build` whose derivation cites none of the changed slices is
  independent, and the target's undo gives the digests of the log without the target.
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

**Warp and what stands on the ground.** A warp and a `moveVertex` move arena vertices (§3.6). Seven kinds of record
hold a world point instead of a vertex and move with the ground they stand on: `Pin.point` (host: `Pin.host`'s
faces), `Decoration.point` (the L3 face containing it), the current position of a positional `instance` override — a
`move`'s `to`, an `add`'s `point`, and for a `line` layout the recorded generated `point` — held in the model's
override table of its entity (§8.10), a pinned label's `Placement` anchor and spine (its target's faces, or its
target's corridor for a way, §9.1), `LightSource.point` (§2.7, item 68; host: the face its host stands on, on its host's
arena — the footprint face of a building, the half-corridor strip of a way or a bridge, a square's face, a gate's footprint, a
pin's host face, a gallery's band, a chamber's floor, a tunnel's band faces at the junction a junction light marks (its
junction wedge and half-corridor strips), the faces of the underground element an access point's `access_point` vertex
lies on for the light at its foot (a tunnel's strips, a gallery's band, a chamber's floor, an underground building's
footprint), a castle's inner ward, bailey and gatehouse footprint (`Castle.innerWard`, `Castle.bailey`, `Castle.gatehouse`),
a decoration's face (for a point decoration — a wayside shrine's — the L3 face containing the light's point), and for a
hand-placed light on any other entity the face that entity is or stands on (§7.1's `placeLight`); of a host's several
faces, the one `pointLocate` on its `PlatKey` returns for the light's point (§5.3's light row); a door light, which stands
at its door on the footprint's edge, instead takes the displacement of its entrance vertex, which §2.6 carries with its
wing), `AccessPoint.ground.at`
(II.7.4, item 64; host: the ground face its `ground.host` names or stands on — a corridor strip, a square, a yard, a
building's footprint (a basement access's too), an outside face) and the rings and lines of `Works.before` (§2.7,
item 67; host: its target's plot face — the building's plot, or for a join or a split the plot whose face holds the
point). After the kernel's commit the edit layer takes every such record whose host face
has a moved vertex (the commit record's `moved` list, §3.3) and computes its new point from the move itself: the
point's mean-value coordinates in its host face's outer ring before the move, applied to the ring after it (`+ − × ÷`
and `sqrt` only, §6.5), rounded to the lattice. A record whose new point lies outside its host face, or nearer its
boundary than its clearance (a pin's footprint radius, `Decoration.keepClearCm`, half an instance spacing, a label's
box, a light's `sizeCm`; none for an access point's opening), is **re-seated** at the nearest lattice point of the host face inset by that clearance, ties by (y, x) —
never a door light, which keeps its entrance vertex's displaced point wherever it falls, so no warp pushes it indoors; if the
inset is empty, a generated pin, decoration, light or access point is re-placed by its placement rule in its host
(§4.7 S11, §4.7's *Light sources*, §4.9, II.7.3) and a user's record — an override, a pinned label, a user-placed or
edited pin, a hand-placed light, an access point an edit placed — is orphaned and reported. A Works' kept rings and
lines are drawn history: each point takes its mean-value image wherever it falls, never re-seated, re-placed or
orphaned. A record of a
locked or pinned entity — a door light excepted, which goes with its entrance vertex (§2.6) — is held like a held vertex: the warp's whole-step validation requires it to stay inside its
host face at its clearance and halves the step otherwise (§3.6); the dry run lists it. **A building's stored wing
rings** — with a stored stage-3 composition's rings, its plan's points (rooms, wall ends, bays and columns) and tower
centres, and the building's basement ring — are carried with its footprint face in the same pass by §2.6's
wing-carrying rule, and the whole-step validation includes §2.6's check through `warp`'s `recordCheck`, halving the step
when it fails, as for a held pin (§3.6). The check requires the basement's ring within the wings of its ground storey (an
unedited basement that fails it re-derived by §2.6's basement decision, an edited one failing the step); and for a
stored composition its composed wings to unite to the moved face, its rooms to lie inside the moved face united with
the span rings of the passages its wings span (§2.6; J-A30.23) and its tower centres inside or on it. Every entity
whose footprint, trace, deck or pier the move carried is re-based by §2.6's datum step on the ground it now stands on
(§7.3 (a) 4), a user-edited base kept. The undo record keeps every former point (a light's point, an access point's opening, a
Works' kept rings and lines among them), wing ring, basement ring, stored composition and base, and a replay recomputes the same points and rings by replaying the same operation on the same
geometry. Stamp and grid instances are world-anchored patterns and are not displaced (§8.10). The B-EDIT warp fixtures
are §13.2's
(J-DET-31; J-A68.73).

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
exact for every document without an epoch and, for one with epochs, the band its last derivation read; its `fieldBand`
is that same band; a building's single `entrance` becomes `entrances` with one `main` entrance at that vertex
(ordinal 0, `nextEntrance` 1), its
basement derived at the first load by §2.6's rules (an `absent` decision, never a random one); every building's `use`
becomes a `Use` record (§2.7) with the building as its only member and no `formerUses`; a building's `households` is
filled from its households' `Household.building` in address order and its retired `occupants` list is dropped
(J-A28.29); `condition` is `kept` and `reusedAs` absent; a block's `reach` is `open`, the parity presets' value, and
each plot's `exposure` is derived at the first load by §4.6's rule from its access rows (no older document has a
passage, so no base wing carries `spans`), its `knownTo` and its buildings' defaulting from that exposure (§2.5,
§2.6) — an institution's optional
`knownTo` stays absent and reads its plots' (§2.7); a stored tunnel without `headroomCm` takes II.7.2's profile row
for its kind and the network's preset, and its `navigable` is derived from its width and headroom against that
row's thresholds (§2.7); an older assignment gets `existence: 'map'` and `pinned: false`, and
its `use` is linked at first load to the `Use` its member's building received above; `Composition.lod` admits `plan`
with no data change; a stored plan written before `Room.scope` and `Room.unit` existed gets each room's `scope` from its
role's programme row (`circulation` for corridors and stair halls) and then each room's unit at first load by §2.6's
rule from the building's households and the plan's doors (one household: the whole shell is its unit; item 28 (f)); an
elaboration cache is non-canonical and is dropped at upgrade; no rejection, positive placement, `DossierRef` or `Passage`
exists in an older document, so none is invented.

**The schema transforms the amendments of 2026-09-27 and 2026-09-28 add** (items 20 (h), 63–72, 74–82 and 101) — each
pure and forward-only, checking the old records root and writing the new one (§6.2), as above. A use, an institution
or an assignment without `concealment` reads `none`, with no front; an assignment without `state` reads `active`. An
`AccessPoint` without `state` reads `open`, its `knownTo` derived at first load by II.7.3's rule, its `source`
`neighbourhood`, and its `under` built from the older tunnel reference as part 0 and that tunnel; a `placeAccess` event's
`tunnel` reads as its `element`, and so does the `tunnel` of an older `convert` event's underground decline op (`silt`,
`caveIn`, `seal`, `reopen`; `DeclineOp`, §4.11 — `flood` is new and has no older form). A plot without `tenure` derives it at first load (§4.7, item 70); a district without
`identity` takes the one its character step derives at first load (§4.5), with `pressure` 0 and no `nameHistory`. An
older recipe's `character` entries become its `districtIntent` entries field for field (wealth, density, age, function
mix, planned / organic, greenery, fortification, building scale; the entry without a district the town-wide default);
an older district record's stored `character` is dropped, the derived `CharacterVector` recomputed at first load (§4.5;
J-A72.21). A document without `nextUndergroundPart` takes 1, part 0 being the sewer's (§2.9); a `Terrain` without
`geology` reads `ordinary` (§2.3). The `Document.dossier` block is rebuilt from the log's dossier events at first load (§7.7, item 74). An older event has no
`dossierChange`, `proposedBy`, `closure` or points form, and none is invented; an older `epoch` event without a `week`
takes its predecessor's week + round(52 × `years`), §4.11's `EpochInputs.week` rule (the first epoch's predecessor week
0; item 76; J-A76.72). Model data a later output version derives that an older document never held — Works records, rule-placed
lights, the underground layer's other systems, galleries, chambers, links and undercity, clusters — appears in it only by
an `upgrade` to that version, whose diff lists it (above), never by the schema chain.

**Sugar events migrate by their expansion** (item 101; J-A101.72). A `placeGate`, `quarter`, `roster` or `group` event
records the version of `sugar.json` it was expanded with (`expansion`), and every replay under the document's own output
version expands it at that version, so the session and the replay make the same events. An `upgrade` whose output
version changed an expansion re-expands the event under `to` and hands its entities on by §6.3's matching like any
re-derived scope; the events whose expansion changed are named in the diff with the other changed confirmations
(`MigrationMap.changedConfirmations`), once.

=== REPLACE ### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook) ===
### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)

Three input layers above the parameter vector, all persisted in the recipe:

1. **Intent** (outcome targets; `Intent`, below): form archetype, size as population / area / buildings with a tolerance, water setting
   and coast side, gate count, wall rings, planned ↔ organic, wealth level and gradient direction, era and region
   preset, defence level, density. **Expansion** (intent → ≈ 200 internal parameters) is a pure function held in data:
   each intent field maps to internal parameters by `{param, fn: 'const'|'linear'|'smoothstep'|'table', args}` rows
   (tables interpolate linearly), evaluated in a fixed order. **Rows are continuous**: no rounding and no comparison
   inside a continuous control — a discrete outcome is a probability drawn per entity or a discrete control that
   declares itself (§7.8). Example — `wealthLevel ∈ [0, 1]` → `field.characterOffset = lerp(−0.3, +0.3)`,
   `granularity.joinMaxBonus = 2 · wealthLevel` (fractional: its fractional part is the probability that a candidate
   plot takes one more join, drawn from the `plot.join` stream), `greenery.parkPer1000 = lerp(0.1, 0.8)`;
   item 71's class mix reads `wealthLevel` itself — no expansion row — moving every band row's weights toward the
   larger classes in a rich town and the smaller in a poor one, the cuts staying the town's own (§4.7 S10b; J-A71.42);
   `planned ∈ [0, 1]` → `growth.headingSigma = lerp(20, 5)` degrees per 100 m of street, `growth.crossroadProb = lerp(0.02,
   0.15)`, `avenues.probability = smoothstep(0.3, 0.7, planned)` per eligible tier-1 way. Every internal parameter is
   documented (unit, range, effect, provenance, consuming stage) and reachable in the advanced panel (O10 a); the
   registry test proves 100 %. **Surprise me** draws every intent field from its declared range and weights on the
   `intent.surprise` stream of a fresh seed and writes the drawn intent into the recipe, so the town's link reproduces
   it. For a dossier-bound map the port's creation half fills the intent from the dossier by the derivation table
   (item 10 below; `wealthLevel` from the dossier's prosperity word); the filled values are map facts (item 9) and stay
   editable.
2. **Character and circumstances** (items 72 and 76–79): the per-district **intent** — `DistrictIntent` (wealth,
   density, age, function mix, planned / organic, greenery, fortification, building scale), supplied automatically per
   district and overridable — is the input that shapes a district's generation; a district's **character** is item
   72's derived profile (`CharacterVector`, §2.5), read from what was built and naming the district (§4.5), never an
   input. The **circumstances** are one `CircumstanceSlice` (below) per entry of a **timeline** dated in weeks — §4.11's
   week, which for a dossier-bound map is the host's campaign week (item 76) — that *schedules* epoch events: an epoch
   happens only as an `epoch` event in the log (§7.1, hook 8), proposed by the app at a timeline entry or by the port at
   §4.11's cadence, and the timeline's first entry is the creation slice S0 reads (§4.2). The season is read from the
   week through §4.11's calendar row and never stored; an epoch's population target and terrain events ride its
   `EpochInputs` (§4.11); a government's kind names its lordship (§10.2). The slice carries the activity scalars —
   market, harbour and main-street activity, default 1 — that the prosperity field's kernels read under decline
   (§4.11), and the recipe's feature set holds `layers.islands`, II.6's model setting (§7.8).
   **The typed slices** (items 77–79) are read by item 72's dials and terms (§4.5) and by S2 and S3 (§4.2); each is
   recipe data at creation and epoch data afterwards; the port fills them from a dossier, and standalone the blueprint
   and our own rows fill them by the same rules, so every reader sees the same fields with or without a dossier
   (J-A77.71).
   - *Trade* (`trade`, `entrepot`; item 77). **Partners**, in order: the dossier's named neighbours and the partners its
     trade links name, each keyed by its binding key (item 12); with none, one derived partner per through route of the
     settlement's access row (`source: 'derived'`); standalone, one per external bearing the blueprint requests, else
     per through route of its access intent. **Weight**: a partner's listed trade links (a named neighbour with none
     counts one), zero for a `hostile` relationship or a suppressed economy — a rival's or a cold-war partner's listed
     links are kept, as SettlementForge keeps them — normalised to Σ = 1, derived partners sharing equally. **Mode**:
     where the site has navigable water, the partners in weight order take `sea` (a harbour) or `river` (docks on a
     river) until their weights cover the water fraction of all toll and duty income — the income rows the port marks
     water (port duties, river tolls) over all it marks water or road (gate and road tolls) — and the rest `road`; with
     no such income the water fraction is the site's default (one half for a harbour town, one quarter for a river town;
     our own values, calibratable); without navigable water every partner is `road`. **Bearing**: the realm block's true
     bearing when the host sends one (`source: 'realm'`); else a draw on `gate.pick` keyed by the partner's key (§6.1),
     uniform over the arc the site admits for its mode — open water for `sea`, the river's upstream and downstream
     reaches for `river`, the land arc for `road` — so a partner's bearing never moves when unrelated facts change. The
     `road` partners' bearings are among S3 (4)'s requested external bearings (§4.2); every partner's bearing and weight
     feed `TradeFlow` — the per-gate and harbour weights and the dominant bearing — which is derived from the slice,
     `entrepot` and the road-and-gate geometry at §4.3. **North first**: when true bearings arrive for a map drawn on derived ones, the port first turns
     the geo anchor's `bearingDeg` (§11.1) to fit the derived gates to them — no geometry moves — and moves gates or
     roads only for the residual, as a dossier event under item 5's least-disruption budget (J-A77.72).
   - *Economy* (`economy`; item 78). Shares over the sectors of §10.2's `RosterTables.sectors`, Σ = 1: with a dossier,
     its income sources mapped to sectors by the port's revenue rows (a revenue with no sector — rents — drops out and
     the rest renormalise; J-A78.71); standalone, the blueprint's economy setting, by default an even mix, which amplifies
     no class (J-A78.72).
     Read by item 72's economy dial (§4.5) at creation and at each epoch past its hysteresis (§4.11) and by S2's
     town-level character (§4.2 S2, §10.2); the shares are read, never modelled (D-10, D-32).
   - *Powers* (`powers`; item 79). One standing per power: with a dossier, `standing` = its power ÷ the settlement's
     total, its kind by the port's category-and-name rows (military and arcane powers included, §2.7), `governing` and
     `secret` from the dossier; standalone, the governing power the `government` row names and the established religion
     (§10.2's rows), 0.6 and 0.4 (our own defaults, calibratable). `appliedStanding` starts at `standing` and moves only
     past the dials' hysteresis at an epoch (§4.11). The base reads standings, never materialised factions — `Faction`
     stays the module's (§10.1); an `arcane` standing is honoured whenever a dossier states it and, standalone, arises
     only under a `magic` circumstance above `none` (D-3).
   The **undercity** setting (item 65; `auto` by default) is `require` when the dossier lists a subterranean
   district-scale record — placed as a `neighbourhood` assignment that II.7.5's existence test must host — and `forbid`
   when the blueprint or the host's circumstances rule one out; `disorder` (0–1, default 0) is the lawlessness
   II.7.5's size law reads, the blueprint's setting (a timeline entry's over epochs); the dossier's crime scalar never
   fills it — it reaches the undercity through §4.6's staged crime term alone (item 88; J-A88.41, J-A88.73), so crime is
   counted once.
3. **Constraints**: pins and **assignments**:

```ts
// — layer 1's record (item 1): the recipe's intent, `Recipe.intent` (§2.9); item 1's rows expand it to the internal parameters
interface Intent { form: string /* a forms-catalogue row (below) */; population?: number; areaHa?: number; buildings?: number /* the size: any of the three */; tolerance: number /* the size's relative tolerance */;
  water: WaterSetting /* §13.3's one spelling */; coastSideCdeg?: Cdeg; gates?: number; wallRings?: number; planned: number /* 0–1: planned ↔ organic */; wealthLevel: number /* 0–1 */;
  wealthGradientCdeg?: Cdeg /* the wealth gradient's direction */; era: string /* the era and region preset row (§10.2) */; defence: number /* 0–1: the defence level */; density: number /* 0–1: the density control (§7.8) */ }
interface Assignment { id: Id; granularity: 'building'|'neighbourhood'|'dispersed'|'feature';
  target?: Id /* one building / plot, one district, or — granularity 'feature' — the way, bridge, quay or pin a named-feature claim names (item 16 below) */;
  dispersed?: { count: number; kind: BuildingClass | string; criteria: PlacementCriteria };
  criteria?: PlacementCriteria /* a building or neighbourhood assignment's own soft rows: a naming claim's location phrase (item 16) */;
  claim?: { kind: 'name'; bias: { identity: string /* a quarter identity row (§10.2) */; weight: number }[] } /* a naming claim (item 16): it names and biases, never zones */;
  name?: string; function?: string; shapeClass?: BuildingClass; drift: DriftBounds /* ± area %, ± floors, allowed layouts and roof kinds, class family — read against §4.7 S11's designation template (item 19) */;
  precedence: 'overClassRules'; placed?: Id[] /* the solver's placements, persisted with the event */;
  existence: 'map'|'dossier' /* dossier: the element exists on every map the module returns (item 20) */; dossier?: DossierRef /* §7.1: its `element` is the binding key (item 12) */;
  state: 'active'|'ruined'|'removed' /* item 80: written only by dossier events through item 14's rows; a map assignment stays 'active' */;
  memberState?: Record<Id /* a placed member */, 'ruined'|'removed'> /* a dispersed assignment's members a collective record's state reached (item 14); an absent member is active */;
  use?: Id /* the Use record the assignment names (§2.7); the assignment moves with it (item 17 (d)) */; pinned: boolean /* stays where it is under epochs and re-applications; the town adapts around it */;
  knownTo?: 'public'|'local'|'secret' /* item 30 (d): a dossier fact when the dossier sets it (item 9); §9.2's label policy reads it */;
  concealment?: 'none'|'front'|'hidden'|'underground' /* item 63: a dossier fact when the dossier sets it; resolved and placed by §4.7's concealment rule */;
  front?: string /* item 63: a front the dossier names — its class or its name; absent: §4.7's cover table picks it */ }
type PlacementCriteria = RelationRule[];   // per-assignment overrides of the class's relation rows (§10.2, §4.7 S10b): nearM → a `near` row, minSpacingM → an `avoid` row on the assignment's own members, frontageClass → a `frontage` row, districts / districtKinds / prosperityBands → `band`-class filters
// PlacementSolver, PlacementRequest and PlacementResult are §4.7 S10b's — the one solver every placement path calls (item 16)
interface Rejection { element: Id; site: Id; seq: number /* the rejectSite event */; held: { epoch: number; populationTarget: number /* the target in force when the rejection was made: the last folded epoch's EpochInputs.populationTarget, else the population the recipe resolves to at S2 (§4.2) */ }; lapsedAt?: number /* the seq of the epoch or dossier event that lapsed it */ }   // model data, in the digest (§2.8 lists it); the solver reads it as PlacementRequest.rejected while lapsedAt is unset
interface DisruptionBudgetRow { kind: 'dossier'|'positive'|'relocation'|'assignment'; weights: { displacedUse: number; join: number; subtractedPart: number; vacated: number }; budget: number; displacementDepth: number }   // a rule table (§7.6); defaults displacedUse 1, join 2, subtractedPart 0.5, vacated 1, budget 6, displacementDepth 1 — our own values, calibratable
// — layer 2's records (items 72, 76–79); declared here once and read at their homes
interface DistrictIntent { district?: Id /* absent: the town-wide default */; wealth?: number; density?: number; age?: number; functionMix?: Record<string, number> /* Σ = 1 */;
  planned?: number; greenery?: number; fortification?: number; buildingScale?: number }   // each 0–1; an absent field is derived; the input a district is generated from, never item 72's derived CharacterVector (§2.5)
interface CircumstanceSlice {
  era: string /* the era and region preset (§10.2); its row carries the public-lighting density (item 68) */; biome: string /* §4.9's climate rows */;
  government: Government['kind'] /* its row forces the seats (§10.2) */; threat: number /* 0–1: the defence level's source at creation (item 10, DR2); the evolution engine's over epochs */;
  disorder: number /* 0–1, default 0 (item 65) */; undercity: 'auto'|'require'|'forbid' /* item 65 */; magic: 'none'|'low'|'high' /* item 68; 'none' by default under D-3 */;
  landscape: { fertileLand: boolean; mines: boolean; quarries: boolean; fishing: boolean; logging: boolean } /* the S0 landscape toggles (§4.2) */;
  activity: { market: number; harbour: number; mainStreet: number } /* default 1 each: the prosperity kernels under decline (§4.11) */;
  trade: TradePartner[]; entrepot: boolean; economy: EconomyShares; powers: PowerStanding[] /* items 77–79 */ }
interface CircumstanceTimeline { entries: { week: number /* §4.11's week */; populationTarget?: number; slice: CircumstanceSlice; events?: EpochInputs['events'] }[] }   // Recipe.circumstances (§2.9): entries in week order, the first the creation slice; applied only through `epoch` events (§7.1)
interface TradePartner { key: string /* the partner's binding key, or a standalone name */; mode: 'road'|'river'|'sea'; weight: number /* Σ = 1 over the partners; 0 for a hostile one */;
  bearingCdeg: Cdeg; relationship?: string /* the dossier's word for the neighbour relation */; source: 'dossier'|'derived'|'realm' }
type Sector = string;   // a row key of §10.2's RosterTables.sectors — trade, taxes and tolls, crafts, agriculture, extraction, fishing, finance, religion, military, magic, crime
type EconomyShares = Record<Sector, number>;   // Σ = 1 (item 78)
interface PowerStanding { key: string /* the power's binding key, or a standalone name */; kind: Faction['kind']; standing: number /* Σ = 1 over the settlement's powers */; governing: boolean; secret: boolean;
  appliedStanding: number /* the value item 72's dials last applied: moves only past their hysteresis at an epoch (§4.11) */ }
// — the dossier contract's records (items 10, 12–14 below; the port that fills them is §14's)
interface DerivationRow { row: string /* DR1 … */; family: string; covers: string[] /* the §2.8 registry kinds and attribute paths the row derives */; inputs: string[] /* digest fields, in the order read */;
  rule: string /* the section whose rule derives it */; chance: string /* a §6.1 concern, or 'none' */; bar: string /* the coherence bar it holds (item 11) */ }   // tables/dossier/derivation, provenance own
interface DossierBinding { line: string /* the SettlementForge line (item 73) */;
  rows: { dossierKey: string /* the binding key */; entity: Id /* the address that carries Identity.dossier (§2.8, §6.3) */; kind: string; since: { seq: number }; rebound?: { from: string; seq: number; receipt: string }[] }[];
  factHash: Hash128 /* of `carried` */; absorbed: { seq: number; week: number | null; factHash: Hash128; changeIds: string[] }[] /* every absorbed state, newest last (item 5's convergence report) */ }
type CarriedFacts = Record<string /* binding key */, unknown /* the dossier fact's fields as the port's digest holds them */>;   // the "previous dossier" item 1's diff runs against
interface DossierChange { changeId: string /* the host's event, outcome or decree id; else a Hash128 of (element, op, week) */;
  source: 'event'|'pulse'|'decree'|'regeneration'|'edit'|'diff'; week: number | null /* §4.11's dating rungs; null: applied finished, without transition stages */;
  cause?: { kind: string; ref?: string; author?: string /* the host's author word */ };
  element: { kind: 'settlement'|'institution'|'power'|'notable'|'resource'|'condition'|'trade'|'quarter'|'government'|'deity'; key: string /* the binding key */ };
  op: 'add'|'remove'|'state'|'attr'|'tier'|'population'|'prosperity'|'power'|'rename'|'reopen'; before?: unknown; after?: unknown; fate?: string;
  reason?: string /* the host's reason, shown beside the map's rule in the disruption report */; receipts: string[] /* the receipt fields found (item 13) */ }   // EditBase.dossierChange (§7.1)
interface ReceiptRow { row: string /* F1 … F22 */; element: DossierChange['element']['kind']; op: DossierChange['op'];
  receipts: string[] /* the receipt fields in precedence order: the first present decides cause, fate and week */;
  response: 'assign'|'unassign'|'setAttr'|'status'|'rebind'|'epoch'|'converge'|'none'; dating: 'receipt'|'arrival' }   // tables/dossier/receipts, provenance own, the SettlementForge line in its header
interface StatusRow { status: string; fates?: string[] /* keyed first (item 14) */; response: 'open'|'wear'|'dial'|'smaller'|'removed'|'ruined'|'none' }   // tables/dossier/status
```

**Precedence: lock > dossier existence > assignment > user-drawn geometry > rule tables > defaults** — the one order for
every meeting of protections and inputs (§7.2, §5.2 F-EDIT); S10–S11 apply it to assignments. A targeted assignment on a
locked entity (or a locked attribute path) is an F-EDIT conflict returned as an action — unlock, choose another target,
or keep the lock; the dispersed solver never places a member on a locked entity. A host that must override a lock sends
an unlock first, and the log records it (J-DET-11). **Dossier existence** — with every dossier-owned value (item 11) —
sits below the lock and above every assignment, drawn shape and rule: a dossier-backed element is never removed by
anything on the map and never placed on a locked entity — it takes the best unlocked site the hard rows allow and, when
no site passes them, its first closest option — the fewest hard rows failed, then the best score, in §4.7 S10b's order
— with the rows it fails reported (§5.2 F-SITING), never omitted (J-A20.71).

**One path — placement, then mutation (items 16, 18).** A blueprint's assignments and edits, every element of a dossier
a new document starts from — the port's creation half (§14, item 73) builds that blueprint and this prefix through the
derivation table (item 10), the recipe's seed derived one way from the dossier's (§14, item 85) —
and the declarations of a skeleton file imported as a new document (§11.1, item 101), become `assign` and edit events at
log positions 0…k, the `assign` events flagged `creation` (the prefix the base derivation's S2 reads ahead as fixed
rows, §7.4, J-A22.74: the dossier's elements are counted in S2's demand as well, so their land is claimed eagerly at S7b
and S10 (3) places them claims-first — J-A22.72; a skeleton's drawn declarations are read ahead by the stages that make
what they declare, §4.1);
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
   `assign`, `unassign` and `setAttr` events with `author: 'host'`, `EditBase.dossier` and `EditBase.dossierChange` set
   (§7.1) — in the host's order; the module never writes to, patches or proposes a change to the dossier, and the bridge
   has no message that does (§11.3). Map edits live in the map's own document (§2.9), which the host may store as an
   opaque artifact; nothing in it flows back. **The port produces the events** (§14, item 73). SettlementForge sends
   whole dossiers and no change list, so the port DIFFS the incoming dossier against the dossier facts the map already
   carries by their binding keys (`Document.dossier.carried`, item 12) — no host-side history is needed — writes one
   `DossierChange` per changed element (item 13), dates it by §4.11's dating rungs (item 76) and emits its events.
   **The map never asks** (item 20 (h) (iv); the owner: "it is one directional"): a gap in the dossier is the map's to
   fill by the derivation table (item 10), never a request — no message, report or field asks the host for a fact, and
   the doors (§11.4) and the port declare OPTIONAL inputs they use when present (`HostContext`, §14), never a required
   one beyond what the dossier holds today (J-A20.79). **What the port never reads** (item 86; J-A86.71): a host's own
   map-side layers (`urbanFabric`, `mapEdits`, `fogSessions`, every `worldState.spatialLedgers.*` sub-ledger, the
   spatial substrate included), its derived reads (the district profile, the map profile, the causal state, the system
   state, capacities, daily life, threat profiles, the spine), its generation log (`simulationTrace`), `aiOverlays`,
   `generationCoherenceReceipt`, its generation sliders (`config.priority*`), its NPC social groups, and prose beyond a
   description seed the clerk may read (item 101); the campaign's frozen `spatialDigest` is the one campaign fact the
   optional realm block may carry (§14). The adapter reports every key it dropped (`ignored_key`, §14). The reasons: a
   host's own map memory would make its map program the base, against the owner's rule that what we build stays the
   base; the sliders' effect already sits in the institutions and the income shares, so reading them would count it
   twice; and SettlementForge's own district names — in its news — are never matched to our districts (owner, J80 Q6;
   J-A86.72).
2. *Existence.* Everything the dossier specifies — buildings, institutions, assignments, named features — is a
   dossier-backed assignment (`existence: 'dossier'`) and exists on every map the module returns, live or — when the
   dossier lists it ruined — present as its ruin (item 14): F-SITING never drops it, `delete` never removes it, and only
   a dossier event removes, adds or re-designates it; a removal (`state: 'removed'`, item 14) leaves the plot vacant
   through `closeUse` (§4.11) for item 17's rules to re-use. The dossier's population is a dossier fact as well — a
   count, which the households that fill it honour: they are map facts (item 9), derived and housed through the roster's
   demand (§10.2). A map event — one a user, or a host's map edit, appends without `EditBase.dossier` — that would
   close, remove or re-designate a dossier-backed element is refused as F-EDIT (§5.2), with the actions `rejectSite`
   (move it) and `placeAt` (designate the plot for something else, the element re-placed): an `unassign`; a `setAttr` of
   its use or class; a `convert` `closeUse` of its use or `mutate` of its plot to another designation; a conversion that
   empties or removes the building that houses it (`vacate`, `abandon`, `decay`, `ruin`, `robStone`, `clear`,
   `demolish`); a plot `join` or `split` whose fate would demolish that building. A map `delete` of it is recorded as
   `rejectSite` (item 3), and a `relocateUse` or `swapUse` moves it and is not refused (J-A20.75). An `epoch` is bound
   by the same rule without being refused by it: no step of an epoch closes a dossier-backed use or leaves one without
   its building — §4.11's *Dossier content across epochs* relocates it first, or keeps it in its building, wherever a
   step would close it or empty or remove that building — so every dossier-backed element is live and placed — or
   present as its listed ruin (item 14) — after every epoch (§5.3's row). Elements the generator added on its own —
   filler houses, trees, lanes — may be deleted on the map with local repair, and whatever the dossier needs of them
   (housing for its population, a demanded class) is re-provided elsewhere by the same solver (J-A20.72).
3. *Rejection, not deletion.* A map "delete" of a dossier-backed element is the `rejectSite` event (§7.1): the site is
   excluded (`Rejection`, above; `PlacementRequest.rejected`), the solver re-places the element by the least-disruption
   order (§4.7 S10b) and the surroundings repair locally (§7.3), from the same seed. The rejection is not permanent
   (owner: "it is not permanent because if a settlement grows or declines that might be appropriate to put something
   there"): it holds while the settlement stays in the state it was made in and **lapses** — the site eligible again
   under the ordinary rules, the element staying where it is — at the first `epoch` event folded after it whose
   `populationTarget` differs from `held.populationTarget` by more than the roster tolerance (§4.11; item 76; J-A76.43, J-A76.71)
   — the settlement has grown or declined, not drifted — or at the first dossier event folded after it whose effective
   scope holds the site's block; the lapsing event writes `lapsedAt` into the record inside its own touched set, so no
   event is logged for the lapse, and an undo of a lapsing epoch that carried no dossier event restores the hold (a
   dossier event, or an epoch that carried one, is no undo target: §7.4; J-A20.74, with J-A20.41). A user lifts a
   rejection with `rejectSite` and `op: 'lift'`.
4. *Positive placement* (owner: "maybe you want a specific place to be something"). `placeAt` pins a dossier-backed
   element, an assignment member or a designation the generator controls to a chosen plot: the solver honours it when
   the hard rows allow — joining plots and mutating the buildings by §4.7 S10 (7) and S11, relocating whatever was there
   by the least-disruption order — and otherwise returns F-EDIT with the blocking rows and the closest acceptable sites
   (§5.2). It never creates or deletes dossier content, persists until the user lifts it or the dossier removes the
   element, and draws on `siting` keyed by the plot and the event (§6.1), so it follows the same determinism.
5. *Re-application.* A dossier change after the first map is a mutation of the CURRENT map, never a reshuffle: the
   solver's least-disruption order (vacant or under-used plots first, then a use that can move within the same district,
   one displacement level, then a join only when the new use needs the land — §4.7 S10b) finds the site, S11's mutator
   adapts the buildings, a removal vacates; households the dossier adds fill standing shells first by `relet`, up to
   §2.6's capacity, before any new plot (item 28 (f), §4.11), their plans re-cut as §7.3 states. Positive placements and
   the map's other edits are honoured first, as pins and protected entities (§7.2), and the dossier event is applied
   around them; an edit it can no longer honour is reported and orphaned, never dropped silently (J-A20.73). Its
   **disruption** — every moved use, joined or vacated plot and mutated building, each with the rule that caused it — is
   computed in the dry run against the request kind's `DisruptionBudgetRow`, stored in the event (`EditBase.disruption`,
   §7.1) and shown as its fate report (§7.3 item 4); the budget bounds the search — the first rung of the order that
   fits is taken — and the effective scope (§7.3 item 1), never the dossier's authority: an event no rung fits within
   budget still lands at the least-disruptive site and is reported over budget (J-A22.73). Everything not in the
   disruption set keeps its exact geometry and identity (the oracle, §7.3 item 7 (vii)).
   **A host's undo (item 87).** A host that restores an earlier dossier state sends it as a dossier change like any
   other; the port diffs it (item 1), and because §4.7 S10b's least-disruption order takes vacant plots first and
   §4.11 prefers a building's `formerUses`, an element the host removed and then restored returns to its own vacated
   building and an element added and then withdrawn leaves the plot it took — the map converges to its earlier state
   wherever nothing else changed; the residue is reported, and the report names the earlier absorbed state the dossier
   now equals (`state_matches_absorbed`, by the binding's `absorbed` hashes, item 12). No rewind of dossier events
   exists: a dossier event stays no undo target (§7.4; J-A87.71).
6. *Continuity.* The map is a function of the seed, the ordered history of dossier events and the map's own edits
   (§6.2): the same history replays to the same map exactly; two histories reaching one dossier may give different,
   equally valid maps — continuity over path-independence, because the owner asked that the seed "respect the previous
   layout prior to the addition or subtraction" (J-A22.71). A brand-new map from an existing dossier has every element
   present from the start (One path, above). Inside the evolution stage the same rules apply. A dossier change the host
   sends with an epoch rides in that epoch's `EpochInputs.dossier` (§4.11) and is applied at §4.11's step (e), after the
   use step and the ladder and before siting (J-A22.42); one sent between epochs folds at its own log position and
   mutates the map the last epoch left (item 22 (e)). The events an epoch carries take their `seq` from `nextSeq` when
   the `epoch` event is appended — the epoch's own first, then the carried events' in the host's order — so their draws
   and minted addresses are keyed as a standalone event's are (§6.1, §6.3); they fold only inside the epoch and are
   never undo targets, and neither is the epoch that carries them (§7.4) (J-A22.76).
   The port groups a host's changes into these events and epochs by §4.11's cadence (item 76): an element change folds
   at its own week as a standalone dossier event, in the host's order; a population change or a typed-slice change
   rides the epoch the cadence schedules, in its `EpochInputs`.
7. *Knowledge.* A dossier may designate an institution hidden or secret and, for a clandestine one, its concealment and
   its front (item 63): `Assignment.knownTo`, `concealment` and `front` are then dossier facts; the solver prefers
   hidden plots through the class's relation rows (§4.6, §4.7 S10b; item 30), places a front and the function it hides
   as one item by §4.7's concealment rule, and §9.2's label policy reads them. A raid or a discovery is a dossier event,
   applied as a least-disruption mutation — the front may close, the hidden function relocate, a passage be sealed
   (items 17, 22, 30) — and a map delete relocates by `rejectSite` (item 3). A map `setAttr` of a value the dossier set
   — `knownTo`, `concealment`, `front` — is refused as dossier-owned (item 11; J-A20.77, superseding the override
   clauses of J-A30.71 and J-A30.72); the drawing's display stays the user's — a label's display text and its visibility
   (§9.1), and what each viewer sees by the viewer's knowledge key (§11.3). Where the dossier sets no such value it is a
   map fact, edited as §7.1 lists.
8. *What is staged.* The port's creation half is the base's (M1, exercised by the frozen dossier fixtures of §13.2 —
   items 83, 84 — never by a live host), its absorb half lands with this contract at M3a, and its wiring to a live host
   bridge is the owner's SettlementForge stage (§11.4, §14, *Staged by the owner's roadmap*; item 73); no door opens the
   other way — the host's simulator never reads the map's geometry (J86, §11.4). The records and rows the port will fill
   when a host supplies them are declared schema-complete and empty in the base: `ConditionOverlay`, `DepositSite`,
   `HistoryHint`, `PowerRelation` and the dossier-backed `Person` (§2.7), and the impairment, hinterland, crime,
   custom-weight and legitimacy rows (§10.2) (item 88). Everything else in this contract — the events, records,
   precedence, rejection, positive placement, budget, continuity and items 9–16 below — is the base's, exercised today
   through the dialog, the API and the fixtures.

**The derivation rule and the port's contract** (item 20 (h), 2026-09-27; items 74–87; owner: "whatever the dossier
doesn't provide, the rest of the map code must compensate. it is one directional. only the dossier is the source of
immutable truth while the rest can be constructed at whim. better if the rest of the map code coherently derives things
from the dossier and in accordance with our rules").

9. *Two tiers of fact* (item 20 (h) (i)). Every fact the map holds is either a **dossier fact** — a record or value the
   dossier supplies, carried by the map under its binding key (item 12), immutable on the map and changed only by a
   dossier event (item 1) — or a **map fact** — everything else: positions and geometry, plots, buildings and their
   classes, the households that fill the dossier's population, lot assignments, prosperity values, the settlement-level
   trade direction and the partners' derived bearings, a collective record's count inside its range, the names the
   dossier does not give, each district's character. Map facts belong to the map — generated,
   regenerated, edited and replaced freely, subject only to items 10 and 11. The dossier facts, by kind: the
   settlement's name, tier word and population; each dossier-backed element's existence, state (item 14), name, kind and
   membership and, where the dossier gives them, its `knownTo`, concealment and front; a collective record's count
   range; each quarter's name (item 16); the typed slices' dossier-sourced values — partners, relationships and listed
   links, income shares, power standings, the government; the conditions. For every field, §2.8's `factTier`
   derives which tier holds it (never stored; J-A20.23), read by §7's edit rules (item 11), §9.2's reader, §11's exports
   and the API through which any clerk reads (§11.2). An author's declarations (item 101) are map facts `factTier` reads
   as `declared`: held
   against generation and re-rolls until the author changes them (§7.2), and never above a dossier fact — a declaration
   that would contradict one is refused as dossier-owned, with the closest acceptable alternatives (item 20 (g))
   (J-A20.76).
10. *Derive before invent — the derivation table* (item 20 (h) (ii)). A map fact the dossier does not supply is derived
   from what it does supply, by the design's rules, before any recourse to chance. The table is an INDEX: one row per
   map-fact family — the dossier inputs it reads (the port's `DossierDigest` fields, §14), the section whose rule
   derives it (stated there, never here), where seeded chance enters (a concern of §6.1, or none) and the coherence bar
   it never contradicts (item 11). A row's inputs are read in the order written — a host's optional input when present
   (`HostContext`, §14), then the dossier's, then the blueprint's own — and when none is present the rule's default
   applies; a missing input never becomes a request (item 1). Standalone, the blueprint and our own roster are the
   inputs of every row — the same rows, so connecting a dossier changes inputs, not rules; the tests run the rows from
   M1 on the frozen dossier fixtures and on blueprints alike (§13.2, items 83, 84). The rows are data (`DerivationRow`,
   above; `tables/dossier/derivation`, provenance `own`), each naming the §2.8 registry kinds and attribute paths it
   `covers`; §13.2's totality test proves that every map-fact family of the registry is covered by a row and that every
   row's chance names a registered concern or none (item 20 (h), with item 83's vocabulary test; J-A20.78).

| row | map fact | dossier inputs, in the order read | rule (its home) | chance (§6.1) | the bar it holds |
|---|---|---|---|---|---|
| DR1 | the site: relief, coast and its side, river course and inflow, lake, marsh | the realm cell's terrain, river and coast (optional); `site.terrain`, `site.access`, the water deposits, `site.culture` | S0's site request (`tables/dossier/site`); S1 (§4.2) | `blueprint.features`; S1's `terrain.*` and `water.*` | a coastal dossier has a coast, a riverside one a river, a port one a harbour basin |
| DR2 | walls, enceintes and gates | the realm gates (optional); `walls.records`, `walls.citadel`, `walls.flagged`, `site.access`, the population, `site.threat` | the access row's gate counts; S0's walls and castle toggles; S3's gate law (§4.2); the wall furniture (§4.8) | `gate.pick` | walls exactly when the dossier lists a wall institution; the gate count inside the access row; a citadel record gives a citadel |
| DR3 | trade partners, their weights, modes and bearings | the realm partners (optional); `economy.partners`, `economy.tradeLinks`, the toll and duty income rows, `site.access` | layer 2's trade fill (above), its `road` partners' bearings read by S3 (4) as requested bearings (§4.2) | `gate.pick` (keyed by the partner's key) | a `hostile` partner carries no trade; a rival's listed links are kept; a bearing never moves on an unrelated change |
| DR4 | trade flow: per-gate and harbour weights, the dominant bearing | DR3's slice; `entrepot` | `TradeFlow` (§4.3) | none | weights sum to one; a harbour town's harbour carries the sea share; a derived partner is marked `derived` |
| DR5 | districts: count, kinds, boundaries, identities | the population; quarter claims (item 16); district-scale records; `site.culture` (the forms weights); power seats (DR11) | S6's typing and grower, item 72's identities (§4.5) | `district.seed`, `district.type` | every quarter name on at most one district, and on exactly one unless reported waiting (item 16); each district-scale record on a neighbourhood of its own; no district named for a social class |
| DR6 | the prosperity field and each plot's band | `wealth.label` (to `intent.wealthLevel` by `tables/dossier/wealth`); the economy and power slices; quarter hints | the field with item 72's dials (§4.5) | `field.chance` | the population-weighted mean band within one band of the wealth row's band |
| DR7 | households: count, sizes, bands | the population; `wealth.label`; the rung; the housing record's range; the economy slice | S2's roster (§4.2, §10.2) | `roster` (its ordinal draws) | the members sum to the population within the roster tolerance; the residential building count inside the housing record's range; every household housed |
| DR8 | the class mix inside a neighbourhood | DR6's field; `intent.wealthLevel` | S10b's class mix (§4.7, item 71) | `siting` | the larger classes' share monotone in the value within a band row |
| DR9 | institution instances: a collective record's count, each instance's class and band | `institutions[].kind`, `.count`, `.districtScale`; the population; `wealth.label` | S2's per-capita rows clamped into the record's range (§4.2); DR24's class; its distribution (§4.5 (3)); S11's templates (§4.7) | `roster` (its ordinal draws) | the count inside the record's range; a singular record placed once |
| DR10 | positions: where each element stands | class, `tags`, `facets`, `forbidden`, the landmarks naming it, chains and dependencies, the power association, `knownTo` | S10b's one solver, claims-first from the creation prefix (§4.7; One path) | `siting` (keyed by the assignment and member); `alloc.district` (a dispersed class's controlled random share per district, §4.5) | every dossier-backed element placed (item 2); a hard row never broken silently |
| DR11 | power seats and turf | `powers[]` (standing, governing, controlled); `government` | §10.2's government rows (the seat classes) and §4.7 S10b's faction-turf attractor rows; item 72's significance weighs them (§4.5) | none (ties by address) | the governing power's seat is the government's seat institution |
| DR12 | a district's political alignment | DR10's lots; the class-to-power rows (§10.2) with `Institution.powers` overrides; the power slice | item 72 (§4.5) | none | shares sum to one per district; a shared building counts once |
| DR13 | a district's economic role | DR10's lots; the class-to-sector column (§10.2); the economy slice | item 72 (§4.5) | none | a building serving two sectors counts once, partitioned |
| DR14 | the names the dossier does not give | the dossier's names (protected); `site.culture` | §10.4 with item 72's dominant components | `naming`, `naming.quarter` | no generated name repeats a dossier name within its kind |
| DR15 | buildings: class, footprint, storeys, heights, materials, entrances, basements | the use's class and the plot's band (DR6, DR10); `site.culture` (a template-family row) | S11's designation templates (§4.7, item 19); §2.6 | `siteplan`, `siteplan.entrance`, `heights`, `material` | a material never changes a shape |
| DR16 | hidden plots, passages, fronts | `facets`; criminal categories; covert impairments; the crime scalar (§10.2's staged crime row, item 88) | the hidden share with its staged crime term (§4.6); the concealment rule (§4.7, item 63) | `siting` (the front pick) | a clandestine record's public views show only its front |
| DR17 | the underground: sewers, accesses, the undercity | the population; sanitation records; subterranean kinds; the crime scalar (§10.2's staged crime row, item 88); the blueprint's `disorder`; `undercity` | II.7's feature law; II.7.5 with §4.6's staged crime term | `blueprint.features`, `sewer` | the underground mode only with a navigable run; a required undercity exists |
| DR18 | informal clusters and camps | DR6's field; the rung; slum claims | the cluster rows (§4.7, item 70); the shanty staging (§4.5) | `siteplan` | never on a standing plot floored at the middle band or above |
| DR19 | the hinterland: land uses, their bearings and sizes | the realm cell's resources (optional); `site.deposits`, `economy.foodImportPct`, `site.isolation`, `site.terrain` | S12a and §4.9; `economy.foodImportPct` through §10.2's staged hinterland row (`PortRows.hinterland`, item 88), which scales §4.9's farmland once the port fills it | `hinterland.outside` (a deposit's bearing keyed by its key) | every listed deposit has its land use |
| DR20 | the knowledge of places | `facets`; covert impairments | item 30's defaults (§4.6); item 63 (§4.7) | none | a covert fact never reaches a public view |
| DR21 | transition timing | the change's week (§4.11's rungs); the calendar row's season; conditions | the `Works` (§4.11, item 67) | `works` (an epoch's Works: its start offset in the epoch's span, then its duration inside its row's range, keyed by the target's lineage with the epoch's week and the epoch component; a dated change's or a scheduled edit's Works: its duration alone, keyed by the target's lineage with its start week — §6.1) | the stage shown at week w depends only on the record and w |
| DR22 | persons beyond the notables | the households (DR7) | `derivePerson` (§10.3) | `people` | a person derives from its key alone |
| DR23 | the rung and the frame | the population | §1.1's size ladders; §3.2 (9)'s frame rule | none | the rung is the population's; a dossier below the floor or above the cap is refused (item 15) |
| DR24 | a record's class | its name, `kind`, `category`, `tags`; a demotion or upgrade receipt | the class rule (item 12) | none | a kind without a class row takes its category's generic class, reported, never refused |
| DR25 | a collective record's state over its members | the record's state and severity band | the distribution rule (item 14) | `siting` (keyed by the assignment, the event's `seq` as creation index) | the affected share equals the severity band's share |

11. *Coherence* (item 20 (h) (iii)). The derivation obeys four rules, proved by §13.2's coherence bars (item 20 (h)) on
   the design's own dossier events and by the port's bars on the frozen dossier fixtures (item 83), and checked at run
   time by §5.3's coherence rows: (a) no derived fact contradicts a dossier fact — counts, kinds, existence and state,
   membership, the realm-level trade facts (each table row's bar); (b) a dossier change re-derives exactly the dependent
   map facts — the rows whose inputs it changed — inside its disruption set, by item 5's least-disruption mutation,
   never a re-roll; (c) the derivation reads nothing beyond three inputs — the seed, the ordered dossier history and the
   map's edits (item 6), so the same inputs reproduce the same map; (d) nothing derived flows back (item 1). The rules
   bind the DERIVATION — generation, re-derivation and every dossier event; a user's edit of a map fact (a prosperity
   stroke, a moved building, a renamed lane) belongs to the user and stands, since it alters no dossier fact. An edit
   that WOULD alter one — a rename of a dossier-named element or quarter, a change of its kind or class (item 2), a
   `setAttr` of a value the dossier set (`knownTo`, `concealment`, `front`, `state`), a collective record's count set
   outside its range, an `adjust` of a dossier-bound map's population or of a slice value the dossier supplied — is
   refused as F-EDIT with the reason `dossier-owned` (§5.2), as item 2 refuses a removal, the map-side alternative
   offered where one exists (the label's display text, §9.1; a count inside the range) (J-A20.77).
12. *The binding — identity without dossier ids* (item 20 (h) (v), made concrete by item 74). SettlementForge keys most
   of its records by NAME and gives most institutions no id at birth, so the map binds its own stable addresses (§6.3) to
   the dossier's keys in the document's `dossier` block (§2.9: a `DossierBinding` and the `CarriedFacts`, above), which
   the port writes at creation and at every absorb. The KEY LAW, stated here and applied by the port's adapter (§14) —
   the only code that reads SettlementForge's fields (J-A74.72):

| element | binding key | re-binding receipts |
|---|---|---|
| the settlement | `settlement:<id>` — the dossier's own id, stable across reloads, same-seed regeneration and section rerolls; a new id is a new dossier and a new map | `rename-settlement` renames the title label only |
| an institution | `inst:cat:<catalogId>`, else `inst:uid:<localUid>`, else `inst:name:<slug(name)>` — SettlementForge's own anchor precedence; `#k` appended for a collective record's k-th member; two records of one key told apart by their order in the dossier, reported `duplicate_key` | `demotedFrom` with the fate `demoted_by_disaster`, `promotedFrom` with `upgraded_by_reconstruction`: the row is kept and the record re-classed by its new name |
| a power | `power:id:<faction.id>` when the dossier authored one, else `power:<slug(name)>` | `rename-faction` |
| a notable | `npc:<id>` | a successor's `replacedNpc` links the successor's row to the one it replaces |
| a condition; a resource; a quarter; the government | `cond:<id>`; `res:<key>`; `quarter:<slug(name)>`; `government` | none |

   `slug` is the line's own name normalisation, applied by the adapter, so a name key agrees with the catalogue key the
   line writes at birth. **Class is read apart from identity** (row DR24): a record's class comes from its current NAME
   when a demotion or upgrade receipt is present — its kept catalogue key then names the old kind — else from its
   catalogue kind, else from its name, category and tags, the fallback every record without a catalogue key needs; a
   kind with no class row takes its category's generic class and is reported (`unmapped_kind`), never refused (at M1 the
   rows cover M1's classes). **Re-binding** happens only on a receipt of the table: a name change without one is a
   removal plus an addition, reported (`rename_without_receipt`), because a guessed identity is how silent mis-bindings
   begin (J-A74.73). A power's controlled-institution list is resolved to binding keys through the stable part the line
   itself stores — the slug of the institution's own id, else of its name — against the current roster, never through
   the catalogue key. `DossierRef.element` is the binding key and `DossierRef.version` the SettlementForge line (§7.1);
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
   response. The design states the ten rows the survey's verification corrected and F22, the undo row item 87 answers (J-A75.71); the others — F6 reopened, F7
   population, F9 prosperity, F10 power standings, F11 government, F12 conditions, F13 resources, F16 the deity, F17
   notables, F19 a confirmed table event, F21 a reroll — are data rows of the same type, their completeness §13.2's
   vocabulary totality test (item 83). A change no rung dates is applied finished, without
   transition stages, and reported (`unreceipted_change`).

| row | change | receipts read, the first present deciding | response |
|---|---|---|---|
| F1 | an institution added | a new binding key; `createdByEventId` or an `add-institution` decree; `_worldPulseTierAdded`, `_worldPulseEconomyBuilt` or `_worldPulseFounded` with their outcome ids and `foundedAt`; the fate `founded_by_flourishing`, which writes nothing else and is dated by arrival alone | an `assign` with `existence: 'dossier'`, placed by S10b's `dossier` request (§4.7); an addition under a key the map carries as removed or ruined is a REOPEN (row F6, item 14); a missing `foundedAt` never reads as "stood since the founding" |
| F2 | an institution removed | `worldPulseFate` and `_worldPulseInactive` FIRST — the closure fates `hollowed_out`, `abandoned`, `bankrupt`, `closed_for_want_of_custom`, `shuttered`, `abolished`, `disbanded`, `captured_by_local_powers`, `abandoned_with_the_settlement` under status `remnant` — then status `removed` with `removedByEventId`, or a `remove-institution` decree | item 14's `removed`: `unassign`, `closeUse`, the plot vacant |
| F3 | reduced or converted | the fates `privatized`, `downsized`, `reduced_to_watch_post`, `survives_as_remnant`; `demotedFrom` or `promotedFrom` | a `setAttr` of the designation in place (item 18's mutation); a demotion or upgrade is also row F15's re-binding, the record re-classed by its new name |
| F4 | impaired or restored | the visible `impairments[]` (the state `impaired` derived from them) | the physical types — capacity, infrastructure, access, supply — one `condition` step per severity band; the non-physical — legitimacy, influence, wealth, staffing, corruption — the power slice's dial only |
| F5 | ruined | status `ruined` with `destroyed_by_disaster`, `remnantReason` and the calamity's targets (never `destroyedByEventId`, which is the settlement's) | item 14's `ruined`: present as its ruin |
| F8 | the tier moved | a `tierHistory[]` entry, or a bare `tier` change with none (a calamity, a resettlement, a preset that applies proposals at once) | the rung re-read at the next epoch's target (§4.11); the tier word re-titles the map (item 15) |
| F14 | trade | `_cutRoutes`, `_userRoutes`, a route link, `tradeLinks`, a partner's relationship — a rival's or a cold-war partner's listed links kept, only `hostile` or a suppressed economy carrying none | the trade slice at the next epoch |
| F15 | a rename | `rename-settlement`, `rename-faction`, `rename-npc`; for an institution only `demotedFrom` or `promotedFrom` | item 12's re-binding; without a receipt a removal plus an addition, reported |
| F18 | a decree | `decrees[]` applied with `tickRef`; the week's `decreeCauses[]` | the decree's own change rows; a decree whose verb binds no world effect expects no change |
| F20 | the settlement ended or born | `destroyedByEventId` on the settlement root; `lifecyclePatch`; `memberBirths` | an END is an epoch that ruins every building by the decline hooks (§4.11); a resettlement of the same site is the SAME map regrowing on its old plan by item 8's regrowth-first order (owner, J80 Q4; J-A75.72); a member birth is a new dossier and a new map |
| F22 | the host undid a change | the incoming dossier's fact hash equals an earlier absorbed state's | item 5's forward convergence, reported `state_matches_absorbed` |

14. *A listed element's state* (item 80). SettlementForge never deletes a record — a removed, ruined or closed
   institution stays listed with its status — so an assignment carries `state`, written only by dossier events through
   these rows (`StatusRow`, above; `tables/dossier/status`), keyed on the fate word and the inactive flag BEFORE the
   status, so that a bankrupt shop is never kept open as a smaller designation:

| the dossier's state (fate first) | the map's response |
|---|---|
| absent or `active` | open |
| `impaired` (derived from the visible impairments) | open; the physical types wear the building one `condition` step per severity band, the non-physical reach the power slice's dial only |
| `remnant` with `privatized`, `downsized`, `reduced_to_watch_post` or `survives_as_remnant` | a smaller designation in place (item 18's mutation) |
| `remnant` with a closure fate (row F2's list), or `removed` | `removed`: `unassign`, `closeUse`, the plot vacant (item 2) |
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
15. *Population, rung and tier word* (item 81; owner, J80 Q3). A dossier whose population lies below 1 500 is refused by
   the port (`E_RUNG_UNAVAILABLE`, naming the village product, PART III) while no village product is registered: §1.1's
   clamp to a 1 500-person TOWN applies only to a blueprint request that carries no dossier, because a dossier's
   population is a dossier fact and a clamped town would contradict it (J-A81.71). A dossier whose population lies above the 120 000 cap is
   refused the same way — `E_RUNG_UNAVAILABLE` naming the cap, nothing absorbed — and both refusals hold at creation and
   at every absorb (§14's `creation` and `absorb`): §1.1's clamp to the cap serves only a request that carries no
   dossier, because a clamped town would contradict the dossier's population there too (J-A81.01). Inside the ladder the population
   chooses the rung (§1.1) at creation and at each epoch's target (§4.11); the dossier's own tier WORD is a dossier fact
   and the map's title word (§9.5) — a "city" of 5 001 people is drawn on the TOWN rung and still titled a city
   (J-A81.72). A bare tier change with no history entry fires row F8 like any tier receipt (item 13).
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
   hysteresis; when no district matches above the claim floor (0.5 of a perfect match; our own value, calibratable) the name waits, reported, and is
   matched again at each epoch — never forced onto a poor match (J-A82.73). An ABSENT quarter is never a fact, and
   SettlementForge's own district names — in its news — are never matched (J80 Q6). A landmark string the roster already
   demands becomes a NAMED-FEATURE claim (granularity `feature`: the way, bridge, quay or pin it names — a notice post
   among the pin kinds, §2.7; `tables/dossier/landmarks`); nothing is created for a string alone.

A whole-neighbourhood assignment sets the district's intent (layer 2) and its class mix — overriding the class-mix
table's weights inside the assigned district (§4.7 S10b, item 71) — while every building stays individually diversified
by the class rules within the drift bounds — drift bounds read against §4.7 S11's designation template (item 19) and
passed to `BuildingGenerator.compose`; a district-defining dossier institution is such an assignment with `existence:
'dossier'`, one district per instance (item 72, §4.5); assignments are events (persist, undo, migrate) and take
precedence over class rules (O10 e). Stable addresses for districts, neighbourhoods, plots and buildings that survive
regeneration and edits are §6.3's.

**Forms catalogue (should-have; the schema is the must-have hook).** A form is a row `{ id, constraints,
growthProgramme, signature }`: constraints (site request, wall rings, plaza position, planned flag, gate count band), a
growth programme (stage regimes and branch tables, §4.4), and a morphometric signature (radial share of arterials,
orthogonality index, street-density profile, block-area CV, enclosed share). Initial rows: `organic`, `bastide-grid`,
`linear-street` (growth anisotropy a = 8 along the main road, §4.4), `radial`, `hill-acropolis`, `bridge-town`,
`port-quay-parallel`, `monastic-close`, `island-city` (shore destinations, §4.2 S3), `confluence`, `twin-town`,
`polycentric` (two or three nuclei, §4.2 S3) and `citadel-and-port` (item 101: a walled upper town on high ground over a
walled lower port — two nuclei of §4.2 S3, the upper on a hill site primitive with its own enceinte, the lower on the
quay front with its own, one arterial joining them); forms compose by growth stage (an organic core with a planned
extension). O10 (g)'s classifier runs on the signature vector.

=== J-ROWS ===
| J-A68.73 | the warp's mean-value rule carries three more point records — a light's point, an access point's opening and a Works' kept rings and lines — each in its host's face, for every host §4.7's light rows or `placeLight` give a light (of several faces, the one `pointLocate` returns); a light (a door light excepted: it keeps its entrance vertex's displacement, never re-seated) or an access point re-seated at its clearance, else re-placed or orphaned as a pin is; a Works' rings never re-seated | §7.4 |
| J-A88.73 | the circumstance slice's `disorder` stays the blueprint's setting, never filled from the dossier's crime scalar, which reaches the undercity only through §4.6's staged crime term — crime counted once | §7.7 |

=== RATIONALE-A ===
| J-A68.73 | Chose to carry a light's point, an access point's opening and a Works' kept rings and lines by the warp's one mean-value rule (§7.4), each in its host's face — a light in the face its host stands on, for every host §4.7's light rows name and any entity `placeLight` names or finds (a junction light in its tunnel's band faces, an access point's foot light in the faces of the element it reaches, a castle's lights in its inner ward, bailey or gatehouse, a shrine's in its decoration's face), the one `pointLocate` returns for the point where the host has several; an access point in its ground host's face; a Works' rings in its target's plot face — with a light or an access point re-seated at its clearance or, when the inset is empty, re-placed by its placement rule if generated and orphaned if placed by hand, a door light taking its entrance vertex's displacement instead and never re-seated, and a Works' rings never re-seated, over leaving these records at their old points or re-deriving them after every warp, because each is a stored world point that §2.7 and II.7.4 say moves with its host, a warp during a running demolition must not draw the kept shell where the ground no longer is (the write that survives one path and ghosts another), a light whose host names no face would have neither a carry nor a re-seat test, a door light stands at its door on the footprint's edge, where any clearance test would push it indoors on every warp and, were it locked, halve every step near it, and a Works' kept rings are drawn history rather than things that must stand inside a face (§7.4; items 64, 67, 68; repair r1, V-MC0-04; repair r2, VD1-04, VD1-05). |
| J-A88.73 | Chose to keep the circumstance slice's `disorder` the blueprint's setting — a timeline entry's over epochs, 0 by default, a map fact the author may set with or without a dossier — and never to fill it from the dossier's crime scalar, which reaches II.7.5's undercity demand only through §4.6's staged crime term, over filling `disorder` from §10.2's crime row and dropping the crime term's undercity factor, because II.7.5's size law multiplies by both, so filling both from the one scalar would count the dossier's crime twice once the port fills its row; J-A88.41 states the crime term once for its three readers — the hidden share, the basement accesses and the undercity — and taking the undercity out of it would split that single statement; and item 65 drives the undercity by the settlement's crime or disorder, which this keeps as two inputs with one source each (§7.7 layer 2 and DR17, §4.6, II.7.5; items 65, 88; repair r2, VD1-03). |

=== END ===
