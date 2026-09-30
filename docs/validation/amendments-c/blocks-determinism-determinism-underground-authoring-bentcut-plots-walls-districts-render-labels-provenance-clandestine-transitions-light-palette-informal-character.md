=== REPLACE ### 5.1 Principles and the seven tiers (G-P7) ===
### 5.1 Principles and the seven tiers (G-P7)

1. **The unit of failure is a kernel transaction (a batch), never the map.** The pipeline has no restart path
   (IMPROVEMENTS J-K adopted; D-9). Removed — the references' whole-map retries (item 51; J-A51.51): MFCG 12710731's
   retry of all nine of its stages whenever a polygon cannot be cut, which continues its one stream
   (`profile-mfcg.md` ST-8; 24 restarts in 58 recorded attempts); VG 1.6.9's retry of a failed build on the failed seed's
   next generator state — a deterministic step, not a random swap (4 of 27 attempts); and NG 1.2.2's rebuild of the entire
   map from seed + 1 on any exception (no recorded map shows it firing). Here a failure stays inside its
   batch, and every retry is a rung of that batch's ladder on its own keyed stream (the tier-3 rung of (6); the keys are §6.1's).
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
   value before the event. An entity whose content is unchanged advances its reroll (for a rung, the rung's counter,
   §6.1) once more and re-derives, up to `reroll.maxAdvance` times (a table value, default 3); if still unchanged it
   keeps its original reroll — nothing about it changes, not even its lineage — and the report lists it as "no
   alternative within the ladder". The advances run on the dry run's overlay (§7.1), so only the chosen result commits;
   the event stores the rerolls actually used, so a replay repeats neither the comparison nor the advances (J-DET-20).
   **For a `regenerate` with `rung`** (item 28) the content compared is the rung's own derived result, before and after,
   with identity left out by the same encoding — the composition's wings, towers and courts, or the plan's rooms, walls,
   openings, roles and units. For an unstored rung both results are derived on the dry run's overlay, the one before
   read from the elaboration cache when that entry is `current` (`ElaborationChunk`, §2.9), and neither is stored; for
   an edited rung the stored composition's subtree (§6.2) is compared. An unstored rung lies outside the model subtree
   (§6.2), so the building's own content digest could never show the re-roll (J-A28.61). *Test (B-EDIT, minimal
   scopes):* New random on a block holding one plot, a plot with a one-building row site plan, a one-cell district, a
   ruined building, a person whose every attribute path is locked and the `plan.roles` rung of a one-room plan either
   changes the scope's content or reports it — never a silent no-op, never a change of identity without a change of
   content.
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
                                       skeleton → sampled medial axis (spine readers) / plain roof (roofs)
tier 5  substitution                   an uncuttable block becomes a court, a green or a landmark plot (NG's rule)
tier 6  documented omission            the feature is dropped for this entity and the report says so; never silent
```

Tiers 2–5 run inside the transaction on the overlay; tier 6 commits without the feature. No tier re-runs another stage
or re-rolls anything outside the failing entity's scope, because every retry draws from (entity lineage, concern,
reroll, attempt) and nothing else reads that stream (§6.1).
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
| F-PLOT† unusable plot [§4.7, §4.6] | S10; the re-cuts of §7.1's plot `join` / `split` and of §4.11's ladder; S11's cluster packing (§4.7 S11's informal clusters, item 70) | frontage < min, wedge angle < 12°, landlocked; a cluster structure that can take no door on a footpath reaching one of its plot's access edges | per-frontage regions (§4.7; when the block's skeleton downgrades, a reflex pre-cut partition) → merge into the neighbour → insert an alley for access — or, where §4.6's rule allows it on a continuous frontage, a covered passage under the front building (item 30); the rung is skipped on the underground arena (II.7.3 U2) → typed residue (court / vacant). A cluster structure without a connected door is re-packed once at the packer's next free site, else dropped and reported — its households re-housed by §4.7's overflow pass, never omitted. A hidden plot passes with a chain of access edges through passage, alley and court faces to a public way (§5.3), never landlocked | every plot has ≥ 1 access edge (100 %) and every hidden plot its chain (§5.3); 0 landlocked buildings; the same after every plot re-cut. every cluster structure with its own door on a footpath that reaches an access edge (§5.3). NG 1.2.2 baseline: ≈ 42 % of lot leaves frontage-less — its courts, by construction rather than by error (item 42) |
| F-SITING† roster item unplaced [§4.7 S10b] | S10b; S11's overflow pass (§4.7) | the eager allocation (§4.7) cannot place a class's demand in its affinity district; a post-build request (§7.7) finds no plot inside the hard rows; S11's overflow pass (§4.7, item 28 (f)) finds no residential building of the district with room for a household | reconcile inside the district's allocation (JOIN at block granularity → a whole block → the district edge; cross-district moves only in the allocation's own reconcile, S7b) → the item's soft rows to weight 0 → reduce the manifest, lowest-priority classes first and never a dossier-backed item (item 20: a dossier element that no plot satisfies goes to its first closest option — fewest hard rows failed, then best score, in §4.7 S10b's order — with the hard rows it fails reported, never omitted — §7.7's precedence), the report naming each unplaced item's blocking hard rows and its closest options; a household S11's overflow pass cannot house takes the last rung alone — the manifest reduced by it, reported with the capacities that refused it, no re-cut after S11 — never one of the households that fill a dossier's population (§7.7 item 2), whose housing §4.7 re-provides inside its district by the `dossier` request, which always places (J-A20.42) — decided eagerly, never by the order lazy districts are placed in, never silently (FTG V1 "would regularly give up") | O18 (f) (§15.2): 100 % of institutions on a plot meeting their requirement; §4.5 S7b (3)'s acceptance for claims larger than one block; the derived-complete digest across district orders (§6.5 (9)); every dossier-backed element placed on every map (§5.3); every household S2 demanded housed or reported unplaced, and every household that fills a dossier's population housed (§13.2 T19-4) |
| F-SITEPLAN† footprint does not fit [§4.7 S11] | S11, the terrain operator (§7.3) | setbacks leave no rectangle ≥ the class minimum; after a terrain stroke a row footprint's fall exceeds `skirtMaxCm` | on slopes above `skirtMaxCm`, stepped wings first → lower the coverage one step → next arrangement (compound → detached → hovel → the `tents` row where the class allows) → vacant plot typed yard, reported | O17 (f) (§15.2); 0 renderer fallback rectangles |
| F-PLAN† the room programme does not fit its wings [§2.6] | the plan rung (`BuildingGenerator.plan`, §2.6; stage 3, staged — this row is its hook), per building, never whole-house; every step of a re-cut along the interior ladder (item 28 (f), §7.3) | tier 0: the storey allocation places the household units first — each at its ladder row's unit form, falling to the next poorer form of §2.6's interior ladder, down to the single room the capacity is computed with, before anything is dropped — then trims the rest of the programme to the capacity of the wings that reach each storey, soft rooms first, and reports it (§2.6); tier 1: §13.2's plan bars fail on the overlay — a hard room missing, a room unreachable, a household unit without its own door onto circulation or the street (item 28 (f)), a piece below its row's minimum area, a seed or fixed ring the rung's seed clip or transient arena refuses (`E_DEGENERATE`, detail `seed`, `fixed` or `overlap`; §3.4's `tileRings` and `transientArena`) | tier 2, local repair: merge two under-size pieces, slide a cut to its neighbour's minimum, answer a refusal of the rung's seed clip or transient arena (tier 1) by the ring it refused (a kept room — detail `fixed`, or `overlap` naming its vertex — leaves the kept set and is cut with the rest, its address carried by §6.3's re-match where its anchor falls in a new room, reported; a stair bay or chimney stack is re-placed by §2.6 step 3 onto the side it came near or at least `minEdge` from it, §3.4, in the same attempt, at the next candidate of that step's filtered placement order — a deterministic move that reads no stream, as every tier-2 repair is (§5.1); where that order holds no further candidate, the anchor goes to tier 6 — a chimney stack omitted, its hearth room kept and reported; a stair bay's upper storeys left unreached — the bar failing and the building flagged; any other refused ring — a seed ring (detail `seed`, or `overlap` naming a seed ring's vertex), the passage room or a composer's room — is the shell §2.6's composition contract guarantees (its clip order leaves no seed piece with a hole: §2.6's stage-3 contract, §3.4's `tileRings`), so its refusal is a bug that aborts the rung with its stream key, as tier 6's does; J-A28.73), swap two rooms' storeys → tier 3: the storey's layout pattern re-run on the next `attempt` (≤ 3, on `plan.layout`, §6.1) → tier 4: the simpler primitive — `bisect` on the wing's axes → tier 5: a soft room absorbed into its neighbour or into a generic room, reported; never a household unit, which takes the next poorer unit form instead (tier 0) → tier 6: a hard room omitted and reported (the bar fails and the building is flagged) — never a household unit: the count the rung must house is bounded upstream by §2.6's capacity, which the generation fill (§4.7: S10b's placement, S11's clamped write and its overflow pass), `relet` (§4.11) and §2.6's re-homing on every change that lowers a capacity keep to, so a rung that cannot cut that many single rooms is a bug that aborts the rung with its stream key, as a mandatory chain's precision failure does (§3.6), never a silent drop (J-A28.51). Nothing outside the building is touched | §13.2's B-PLAN fixtures: hard rooms present 100 %, every household of the building (`Building.households`, §2.6) housed in its own unit with its own door (item 28 (f)), every room reachable, stairs stacked, walls equal the wing rings (the stage-3 contract's fourth rung, §2.6) |
| F-UNDER† an underground plot under excluded ground [II.7.3] | the underground stage (II.7; staged — this row is its hook) | a plot sample — its vertices, its frontage midpoint and a 1 m sample of its rear line — lies in an excluded ground face (water, the harbour, a wall strip, a gate, the keep, a reservation, a surface footprint: II.7.3's list), read by `pointLocate` on the ground's `PlatKey`, never a write | band depth → the band's lower depth → the class minimum depth → a `vacant` run, reported; a network run needing more fall than the ground gives is re-routed toward the nearer outfall, never trenched (II.7.2) | 0 committed underground faces with a sample in an excluded face (CI: a 1 m sample grid by `pointLocate`); the fixtures are §13.2's |
| F-VOID† an underground system or the undercity cannot be laid [II.7.5, II.7.6] | the underground systems' stages and the undercity stage (staged — this row is their hook) | a system's extent finds no admissible ground in its depth band (no stone cells, no soluble or volcanic rock, a cover below `minCoverM`); an undercity neighbourhood's void below its minimum capacity (`UndercityRule`: `minHouseholds`, `mainChamberM2`), or a neighbourhood left without a lifeline (II.7.5's condition 4) | a smaller extent inside the depth band → the system omitted, reported; for the undercity: fewer neighbourhoods inside the 1–3 bound, each dropped neighbourhood's allocation re-placed by S7b's reconcile → no undercity, reported — never a household dropped (S7b (7): the population stays whole) | §13.2's T65 fixtures: an undercity only where a void source exists and a lifeline reaches it; the bound on 500 seeds per rung; the population whole |
| F-SKELETON† skeleton fails [§3.8] | S1, S11, S13a, the plan rung (§2.6) | the output validator fails (non-planar skeleton, non-monotone faces, inconsistent heights) or the skeleton's work limit (events processed) is reached — `E_WORK_LIMIT`, never a timeout | each reader takes its typed downgrade (§3.8): `spine` readers — label spines (§9.3), S1's coast simplicity clamp (§4.2 S1 (2)) and the plan rung's room-label spines and room lights (§2.6, item 28): a sampled medial axis; roofs: a **plain roof** — footprint drawn without ridge or hip lines, roof kind `plain`, heights unchanged (MFCG draws a roof whose gable pass fails plain). Near-rectangular footprints never reach this row: their exact OBB roof is the primary construction (§3.8); the `regions` reader (S10) takes F-PLOT's ladder | §13.1's ladder-coverage fixtures |
| F-LABEL† no fit [§9.4] | S13b (view side) | the spine is shorter than the text at the minimum size; an unresolved collision at priority | §9.4's seven rungs, each counted in the report; placement is view data and never changes the model (§9.1) | §9.4's acceptance, by B-ZOOM (§13.4) |
| F-LIGHT† the light pass cannot run as drawn [§8.4] (item 68) | the view — the tile worker and the compositor, outside the model packages | no GPU context, a lost context, the pass over its frame budget (§12.5) | §8.4's fallback ladder: the GPU field → a half-resolution light buffer → the vector `ShadowPass` with glow sprites; each rung counted in the view telemetry, never an error and never a model change; exports, stills and goldens always take the CPU reference (§8.4) | §13.4's fallback run renders a frame on every rung; the CPU reference byte-identical across engines (§6.5 (9)) |
| F-WORK operation count reached | any stage, ladder or kernel call | `E_WORK_LIMIT`: a declared count reached (candidates, proposals, kernel calls, skeleton events, recursion depth), each the stage's law over its batch scope (§5.1 (5)) | the stage's declared coarser rung, entered by the count, never by time (fewer candidates, larger cells, a shallower recursion) → report `work_cut` with the count; the map is valid and identical on every machine | time dilation (§6.5 (9)): per-stage digests byte-identical; work-cut rate per stage reported on B-CITY; hit rate flat across each band (§5.1 (5)) |
| F-BUDGET-TIME stage over its time budget — reporting and scheduling only | `@plat/api` worker host (outside model packages) | wall-clock watchdog | postpone or resume a lazy tier (cancel-and-resume only); telemetry records `time_over`; never a model change | a tier postponed and resumed hashes like the eager tier; per-stage timing against §12 in CI telemetry on reference hardware |
| F-EDIT constraint conflict | S0, edits | a drawn way crosses a locked entity; a targeted assignment names a locked entity; a map event — one a user, or a host's map edit, appends without `EditBase.dossier` — that would close, remove or re-designate a dossier-backed element (§7.7 item 2's list); an assignment cannot be honoured within its drift bounds; a post-build placement — an assignment, a positive placement (`placeAt`) or the re-placement a `rejectSite` causes (§7.7) — that no plot satisfies inside the hard rows, or a user's positive placement over its disruption budget (§7.7); a plot `join` or `split` that would remove an occupied building (item 31, §7.1); a plan edit that would leave a room below its row's minimum area or unreachable, a plan edit or `setRoomUnit` that would leave a household unit without its own door onto circulation or the street, or a hand `relet` above §2.6's capacity (item 28, item 28 (f), §7.1); a hand edit whose capacity re-homing cannot place its excess — locked or pinned households alone above the new capacity, or a household that fills no dossier's population that no residential building of the district has room for (§2.6's capacity rule); a heights edit that would leave a base wing spanning a passage below two floors (§2.5 `Passage.headroomCm`; item 30); a warp would break an invariant or carry a locked or pinned point-anchored record out of its host face (§7.4); the effective scope holds protected entities whose fate is not *kept*; an `undo` or `redo` whose target has dependent live events, or an `undo` naming a `creation` event, a dossier event or an epoch that carried one (§7.4); a water edit's new channel ⊕ bank setback meets a locked or pinned way, wall or finer entity, or a reservation (§7.3 (b) 3); a moved course knot whose carve would exceed `carveMaxCm` (§7.3 (b) 1); a map event that would change a **dossier-owned** value — the name or kind of a dossier-named element or quarter, a `knownTo`, concealment, front or `powers` weights the dossier set, an assignment's `state`, a collective record's count set outside its range, an `adjust` of a dossier-bound map's population or of a slice value the dossier supplied (§7.7 item 11; J-A20.77) — reason `dossier-owned`; an `addUndergroundAccess` whose closure (§7.3 item 9) ends in a refusal — the terrain rules out every basement form (§2.6's requested-mode ladder) or the connector's route passes its bound (II.7.6) (item 66); an authoring declaration that contradicts a lock or a dossier fact (item 101 — every other infeasible declaration is bent by its dry run to the nearest lawful one, which it names, §7.1); a Works edit that would leave a plot without access or a building's occupants unhoused (§5.3's Works row; item 67); a table cell set outside its column's declared range (`jitter.minM` below its bound among them, §4.7 S11; §7.6); a host provider's output that would pass §2.9's cap on pack data and host content; an upgrade's copy of a pack `to` stops shipping that would pass that cap (§7.5) | the dry run returns the conflict as an action — for a dossier-owned value the refusal with its reason and the alternative the map itself offers where there is one — a label's display text and visibility (`LabelEntity`, §9.1), a viewer's knowledge key (§11.3), a count inside the range; for an access edit the nearest lawful basement form (half cellar, walk-out, a hatch to a crawl space) or the refusal naming its cause, the terrain or the route's bound; for a declaration the lock or the dossier fact it meets with the closest acceptable declarations (item 20 (g)); otherwise the nearest valid position (for a course knot, along the drag within the cap), the blocking lock, the closest acceptable sites with the hard rows each fails and the disruption over budget (§4.7 S10b, §7.7), `rejectSite` (move the element) or `placeAt` (designate the plot for something else, the element re-placed) for a map event that would close, remove or re-designate a dossier-backed element (§7.7 item 2), "vacate first" (item 17's relocation) or the occupied building's demolition as a fate to confirm, the fate list to confirm (§7.3 item 4), the dependent events to undo first, never a dossier event or an epoch that carried one (a target one of them depends on stays as it is, §7.4's Independence), in place of an `undo` of a `creation` event `unassign` (a blueprint assignment) or `rejectSite` and `placeAt` (a dossier element), and in place of an `undo` of a later dossier event or of an epoch that carried one `rejectSite` and `placeAt` for each dossier element it placed or re-designated (§7.4), Re-derive from S3 for a reservation in a new channel's way, the provider and the size, or the pack and its size with "keep the old model" (§7.5) — decided by §7.7's precedence order; never silently resolved | B-EDIT sequences and conflict fixtures: 0 planarity violations, 0 lost faces, 0 silent re-binds |
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
| every dossier-backed element (an assignment with `existence: 'dossier'`, §7.7) is live and placed on every map — or present as its ruin while its assignment's `state` is `ruined` (item 80, §7.7): its use closed, its building standing in `ruined` existence — and a `delete` never removes it, F-SITING never drops it, a rejection re-places it, and no map event closes, removes or re-designates it (§7.7 item 2), and no step of an epoch closes it or leaves it without its building (§4.11's *Dossier content across epochs*) | batch-local (the assignments the batch touched); stage-end (each `epoch` event: every dossier-backed assignment); save | the assignment index against live placements |
| **coherence** (item 20 (h) (iii); §7.7): no derived fact contradicts a dossier fact — every dossier record the map carries is placed, or present as its ruin (above); every dossier count is met within its tolerance (the population by §4.11's roster tolerance); every dossier kind, name and membership stands unchanged on the element its binding key names; the realm-level trade facts are the trade slice's (§7.7 item 2) | stage-end (every derivation; each dossier event, and each epoch that carries one) | the dossier facts the map carries by their binding keys (`Document.dossier`, §7.7) against the elements those keys name |
| the stored binding (`Document.dossier`, §7.7, item 74) equals the binding rebuilt by folding the log's dossier events | load; CI-only | the fold of the log's dossier events, compared row by row |
| a stored plan's storeys tile the extents of the wings that reach them — at the ground storey with the span ring of each passage a wing spans, the passage room (the stage-3 contract's fourth rung, §2.6; J-A30.23): each exterior wall segment lying on an extent's edge, each room's ring simple and within its wing's extent or the span ring, no overlap, no gap (§3.10's seed-tiling row, per storey) | batch-local | the buildings whose stored composition the batch wrote or carried |
| the interior ladder (item 28 (f), §2.6): in every stored plan, and in every cached plan at its derivation, each household unit has its own entry door onto circulation (a corridor, stair hall or landing) or onto the street and never opens through another unit's room; a re-cut along the ladder changes no wing ring, stair core, entrance, hearth, chimney stack, passage room or basement ring — the shell's leaf digest (wings, heights, entrances, roof, basement), its rings read with the `composition`-role vertices a stored plan's re-cut adds removed (§2.6, J-P48 (1)), is byte-identical across it | batch-local (a stored plan the batch re-cut, §7.3); at derivation, on the rung's transient arena, for a cached plan (F-PLAN tier 1, §5.2) | the plan's room graph walked door by door per unit; the shell's digest before and after the re-cut, its rings read without those vertices |
| no building houses more households than its capacity: `Building.households ≤ capacity(b)` (§2.6's one capacity function) after every committed change — the generation fill (§4.7), `relet` (§4.11) and every change §2.6's capacity rule lists, whose excess §4.7's overflow pass re-homes inside the causing event (J-A28.23, J-A28.46) | batch-local (the buildings whose wings, heights, class, plot `builtBand` or household count the batch wrote, and the receivers of its re-homing); stage-end (S11 per district after the overflow pass; each `epoch` event; a §7.6 table edit's re-derived set) | the capacity function recomputed on the touched buildings against `Building.households` |
| a live-in dwelling stays among its building's households: a building's `Building.dwelling`, where present, names one of its `Building.households` and is present only while its use is a live-in class's (§2.6's `Building.dwelling`, §10.2's `liveIn`; J-A28.29), after every committed change | stage-end (S11 per district after the overflow pass; each `epoch` event; every edit, at its dry run) | the touched buildings' `dwelling` against their `households` and their use's `liveIn` |
| a mutation's kept parts keep their addresses and its added parts are minted from the causing event (§4.7 S11, §6.3); after a plot `join` or `split` the party walls agree on both sides and every plot keeps its class minimums (item 31) | batch-local | the plots of the mutation or re-cut and their one-ring |
| declared means held (item 101, §7.2): no re-derivation, scoped re-roll or epoch moves or removes an entity its declaring event pinned; only a later declaration, an `unpin` or its declaring event's undo changes it | batch-local (every re-derivation's scope) | the scope's declared set before and after the batch, by address |
| the epoch rows (item 31, §4.11): no occupied building is removed by a band change — a redevelopment first vacates through item 17's relocation. Across the epoch the ladder's rungs 1 and 2 change no frontage edge and shrink or re-cut no building shell toward a poorer band — a shell being the subtree the interior-ladder row names: wings, heights, entrances, roof, basement, its rings read as that row reads them (without the `composition`-role vertices a stored plan's re-cut adds, §2.6, J-P48 (1)). Their only geometry is rung 1's yard buildings (`densify … infill`, `thin … infill`) and rung 2's one ring change, the `densify … back_court` split or its `thin … back_court` reversal (§4.11). Every other change of a plot's ring or a building's shell in the epoch carries the lifecycle event of the step that made it: a rung-3 event; a designation or renovation mutation (item 18: the use step, rung 1 growing rich); any other conversion of §4.11's `ConversionOp` — a decline, terrain-and-water, island, carve, `wallToWay` or `contractWall` conversion among them; or the growth step's own changes — regrowth's builds and the built-face legality's declared `demolish` and corridor re-cuts (§4.11). Every plot's geometry band is at or above its floor (`max(field band, geometryFloor)`, §4.11) (J-A31.75) | stage-end (each `epoch` event) | the epoch's touched plots' frontage edges and their buildings' shell subtrees, so read, against their pre-epoch values: every difference matched to a lifecycle event recorded in the epoch, and none matched only to a rung-1 or rung-2 `LadderOp` other than the yard buildings and the back court named above; every plot's band pair |
| Works (§4.11, item 67): at no stage of a Works is a plot left without an access edge (the old line kept as a pending bound until its clearing stage, the new line in place before its occupants move in); a building's occupants are rehoused by item 17's relocation before its demolition or conversion begins; a Works' drawn stage is derived from its record and the week, never stored (§6.2) | batch-local (the Works an event started, changed or cancelled, and their plots); stage-end (each `epoch` event) | the plots' access rows at each of the Works' stage boundaries; the households' buildings against the Works' start |
| decline and the staged layers (§4.11, II.6, II.7): a `cleared` building's footprint face persists (no dangling trace); no `EvolutionStrategy` plan contains `demolish` on a tunnel; every island in state `floating` has a supported area > 0; U1 — on the sewer network's part (part 0; U1–U3 are its rules, J-A65.42) every underground plot's frontage rows lie on the kerb of exactly one navigable, open tunnel run and its access rows ⊆ its frontage rows; U2 — the underground L1 carries `tunnel` chains only, no `way` chain and no `alley` face on L1 or L3; U3 — every underground building's frontage side lies on its plot's frontage edge; ≥ 1 access point per underground neighbourhood; every `AccessPoint.ground.at` in public ground, a yard, outside ground (a `mouth`) or a surface building — a `cellar_stair` only where II.7.3 admits one (the class's `undergroundAccess.prob` above zero at its band, or a `secret` plot), a basement access only in its building's basement (item 64); never in water or a wall strip; no committed underground plot has a sample in an excluded ground face (II.7.3's list; F-UNDER, §5.2); the underground stages' commit records show 0 writes on the ground `PlatKey`, and each writes only its own system's part (§3.4) | batch-local (U1, U3, the trace face, the island area: touched records; the surface exclusion: the touched underground plots); stage-end (U2, the access rows, the tunnel-demolish lint over an engine plan); CI-only (the cross-arena write count) | the role index and `pointLocate` (§3.4, kernel-supplied) — for the surface exclusion, F-UNDER's samples, each found by `pointLocate` against the ground arena, never a write; the engine plan's op list |
| basement accesses (II.7.3, item 64): an access of source `basement` only where its building's basement ring lies within `UndergroundRule.access.reachM` of the open element it reaches (an open navigable tunnel's kerb, an underground building's side or rear wall, another system's open gallery or chamber); a building with a concealed use holds its accesses `knownTo: 'secret'`; an access's stored `state` is `open`, `locked` or `bricked`, and reads `collapsed` only while its element is closed (II.6) | batch-local (the buildings and access points the batch touched) | the basement ring against its element by the kernel's read services on the element's part (J-A12.32) |
| the underground systems and the undercity (II.7.5, II.7.6; item 65): an undercity only where a void source exists and a lifeline reaches it, never more neighbourhoods than its rung row's `maxNeighbourhoods` (TOWN rarely 1, CITY 1–2, METROPOLIS ≤ 3); every underground building's heights under its chamber's ceiling less `ceilingClearCm`; every `UndergroundLink` typed, carrying `knownTo`, one end a `link_end` vertex of one part and the other a `link_end` vertex of the other, never a vertex two parts share | batch-local (touched links, galleries, chambers and buildings); stage-end (the undercity stage; the connection stage) | the links' vertex roles in each part; the ceilings against the heights; the lifeline walk from each undercity neighbourhood |
| closures (§7.3 item 9, item 66): every piece a closure created is named in its event's closure record, every piece it names exists, and a generated connector is reachable end to end inside its system's depth band | batch-local (the closure's batches) | the closure record against the committed pieces; one walk along each connector |
| every plot with ≥ 1 access edge, every building with exactly one `main` entrance on one, facing its street or court (§2.6, item 29), a side or rear entrance only on an access edge beyond the frontage; a hidden plot (`Plot.exposure = 'hidden'`, §2.5) reachable by a chain of access edges through passage, alley and court faces to a public corridor — an access edge on a sealed passage (`Passage.sealed`, §2.5) is skipped by the walk, so a sealed plot reads sealed (item 30; J-A30.71; the walk uses `faceNeighbours`, §3.4) | batch-local (entrances, access edges); stage-end (S10, and after every re-cut of §7.1's `join` / `split` and of §4.11's ladder: the reachability walk) | touched plots and buildings; one walk per hidden plot of the touched blocks |
| concealed institutions (§4.7, item 63): every institution or assignment with a `concealment` other than `none` is placed in one of its allowed modes — `underground` only in an underground allocation (II.7.3, S7b (6)) or an undercity neighbourhood (II.7.5), `front` with its front's building built to the front's template, `hidden` on a hidden plot — and its concealed rooms are reachable only from its concealed entrance or its front's service side, never through the public rooms | stage-end (S10b, S11 per district); batch-local (the buildings an edit re-fits) | the placements against the concealment value; a stored plan's room graph walked from its concealed and service doors |
| informal clusters (§4.7 S11, item 70): every cluster structure has its own door on a footpath face connected to one of its plot's access edges; every pair of structures keeps its row's fire gap; each structure's households lie within its row; no cluster stands on a plot whose geometry floor is middle or above while that stock stands, nor in a district whose band range excludes the squalid band (§4.5) | batch-local (touched plots) | a walk from each structure's door over the plot's footpath faces; the gaps by the spatial index |
| no way centreline crosses a footprint; no way crosses a reservation (§4.2 S3) | batch-local | touched ways, footprints and reservations |
| walls not crossed by ways except at gates | batch-local | touched ways and wall edges |
| **a way crosses water only on a deck, and a deck only over water**: every edge with a `way` role whose two sides lie in water (the L0 parents of both side faces are water faces) belongs to a `Bridge`'s deck span (the edges between its two deck vertices, carrying `deck`; fords included) or to a **harbour work** — a way of class `pier` or `quay` whose connected set of `pier` and `quay` edges meets land in at most one L0 land face (a pier, mole or breakwater arm rooted on one shore; a detached breakwater touching none, §4.8), which stands in the water rather than crossing it; a `pier` or `quay` way joining two land faces across water crosses on a deck like any way. Every deck span crosses a water face with both ends on its banks; a wall trace crosses water only at a water gate | batch-local | touched way, deck and wall edges against the L0 parents of their two sides, by index (§2.2 rule 2); for a touched `pier` or `quay` edge with water on both sides, one walk of its connected `pier` and `quay` edges counting the distinct L0 land faces its vertices touch (a harbour-wall row's few hundred edges at most). It covers S1's river decks, S3's moat and canal decks, S5a's outer-moat decks, a carve's decks and S7's harbour furniture; §13.2's harbour fixtures include a two-arm mole and a detached breakwater |
| **NF-P5**: no lane crosses a wall strip, and no L3 band, setback, glacis, tower or gatehouse face is cleared or split by an L1 or L2 batch — in every generation batch, and in every edit batch except for the enceintes whose wall-strip parts the edit's chain **declares** it rebuilds by S10's step (0) or removes. The dry run of every chained edit computes that declaration — the enceintes whose strips any of its batches changes, each "rebuilt" or "removed" — and every batch of the chain carries it; the check reads the declaration, never a list of edit kinds. Edits that declare: a tree-scoped re-derivation of a scope holding wall-strip faces (§7.3 item 2); S7's operator (`drawWall`, a moved trace vertex, a re-traced run, `gateToJunction`); S1's water operator for every strip its L1 batch changes — a re-traced run's strips, and a setback or glacis line it anchors and cuts outside a re-traced run (§7.3 (b) 3, 7, 8); a carve for every strip its batches (1)–(3) change and its step 4 re-derives (§4.11); as removals, `wallToWay`, `contractWall` (§4.11) and an enceinte's `delete` (§7.1's walls row). A lane still never crosses a strip (J-DET-39) | batch-local | touched lanes against the `setback` and wall edges; the commit record's removed and changed L3 faces of kind band, setback, glacis, tower or gatehouse against the declared enceintes; a CI registry test fails when an edit operator or conversion that can write a wall strip's L1 lines or L3 parts has no declaration path; §13.2's fixtures commit a canal carved across a wall between two towers and a river move whose new bank cuts a glacis line without crossing the wall with 0 NF-P5 violations, while a `drawWay` lane across a strip is refused |
| footprints ∩ (wall band ⊕ setback) = ∅ on both faces of every wall | batch-local | touched footprints and wall bands |
| every building's wing rings (and a stored composition's composed wings) pass §2.6's wing rule 4 after every carry, in generation and in edits | batch-local | the buildings whose footprint faces the batch changed, by §2.6 rule 4's tiered test (≈ 0.06–2.7 µs a building) |
| water ∩ footprints = ∅ | batch-local | touched footprints and water faces |
| every built bridge within ± 10° of the channel normal, measured on the deck and on the way; a `site` has no span and is outside every deck row (§2.7) | batch-local | touched crossings |
| exclusive land uses never overlap | batch-local | touched land-use faces |
| every `LightSource` (§2.7, item 68) stands in its host's faces on its host's arena, its height within its rule row's band; no light on a building whose Works stands before its finished stage (§4.11) | batch-local (touched lights and their hosts) | `pointLocate` on the host's `PlatKey`; the rule row's band |
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
| neighbourhood character (§4.5, item 72): one district per district-defining dossier instance; every building's prosperity-driven state inside its district's band range; a shared building's partition weights summing to one over its powers and over its sectors; the character vector and the band range recomputed from committed state equal to the maintained ones | stage-end (S12c; each epoch's character step); load (the recomputation) | the district assignments against the dossier's district-defining instances; the buildings' bands against their districts' ranges; the vector recomputed from the lots (J-DET-12) |
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
  dossier: { element: Id; state: 'placed'|'rejectedSite'|'blocked'; site?: Id; rules?: string[] /* the hard rows the placement fails, if any */; closest?: Id[] }[];   // §7.7: the standing placement state of every dossier-backed element, its live rejections and any blocked positive placement (item 20)
  changes: ReportEntry[];   // items 17 (d), 20, 22 (b): what moved, in `seq` order — derived from the log's events and the lifecycle events they wrote, never stored; §11.2's `report.changed` sends the entries appended since its last delivery
  kernel: { engine: string /* the engine id, §3.7 */; warnings: Record<string, number> /* W_ATTRACTED, W_STRETCH_SHARED, W_WEDGE_ROUTED, W_SNAP_PASSES, W_ACUTE_CORNER, W_SLIVER_RETYPED, W_HEIGHT_CLAMPED (§3.1) */; downgrades: number; workLimitHits: number } }
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
`report.changed` delivers — the host's one account of every move, closing and reopening (§7.7; J-A22.75). An entry a dossier event caused names that change's `changeId` and its reason (item 75), so the host sees why, and nothing flows back (J-A20.81); an epoch's renames and each Works' start, cancellation and completion are entries too (items 72 and 67). A dossier the port refuses — one below the 1 500-person floor, `E_RUNG_UNAVAILABLE` (§7.7, item 81) — makes no model and so no report: the refusal is the port's result (§14), never a report entry.
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
  is not retried — a turned frame re-plans steps 2–7 only), `works` (non-rerollable, attempt cap 0: a Works' duration
  drawn inside its `WorksTable` row's range, §4.11, keyed by the Works' target's lineage with its start week as the
  creation index; J-A67.61) and `pin.light` (a geometry concern, non-rerollable, attempt cap 0: S11's placement of the light
  sources, §4.7, keyed by the host's lineage with the light rule row as the creation index; a light's flicker is never a
  stream — a pure function of its render key and the view's time, §8.4; J-A68.61). **Retired by the same amendments (items 36 and
  37):** `cut.side` and `cut.farSideAlt` — the start run and the far side are deterministic rules now (§4.6 steps 3 and
  5) — keep their u16 ids, reserved, with no reader, never reused, so no key moves (J-A41.61).
* **Readers the amendments of 2026-09-27 and 2026-09-28 add to existing concerns** (no concern of their own; each keyed
  as stated, so nothing that already draws moves):
  - the bent cut (§4.6, items 34–40): `cut.t` twice per attempt — step 2's position bell and step 4's corner bell, three
    uniforms each; `cut.arc` one uniform per corner the fillet predictor keeps; `cut.width` one uniform u per district,
    the exponent `p` = `4^u` ÷ 2 through `dmath.pow`; step 8's turned frames on the stream key's `attempt` component (item 39);
  - `district.seed` also draws each grower's turn skips and its absorbed neighbour (§4.5's Grower, item 47), keyed by the
    grower's seed lineage (its feature's; a remainder seed's first face) with the turn number as the creation index, so
    §7.3's S6 operator re-grows a scoped regroup exactly;
  - `siting` also draws a concealed institution's default mode and its cover (§4.7, item 63), keyed by the institution's
    lineage; a residential plot's building class from the class mix (§4.7 S10b, item 71), keyed by the plot and its
    request; and the members of a collective dossier record that a status reaches (§7.7, item 80), keyed by the record's
    assignment with the dossier event's `seq` as its creation index;
  - `siteplan` also draws a plot's front recession (§4.7 S11, item 43) and a cluster's packing (§4.7 S11, item 70),
    keyed by the plot; `siteplan.mutate` an added main slot;
  - `sewer` also draws the basement access lottery (II.7.3, item 64), keyed by the building's lineage; every draw of the
    layer's other systems (II.7.6, item 65), keyed by the system's lineage — its arena part in the key — and the
    element's source; the undercity's existence and size (II.7.5), keyed by the settlement's lineage; the connection
    stage's links; and a closure's generators (§7.3 item 9, item 66), keyed by the building's lineage, the target's and the
    event's `seq`. The undercity's neighbourhoods draw on the ordinary `plot.*`, `siting`, `siteplan` and `heights`
    concerns from their own lineage (§6.3);
  - `gate.pick` also draws a trade partner's bearing where the dossier gives none (§7.7's circumstance slice, item 77), keyed by the
    partner's key — hashed as the derivation unit, as the roster's ordinal-keyed draws hash their class — so the
    bearing never moves when unrelated facts change;
  - `alloc.district` also draws dispersal's controlled random share (§4.5, item 72), and `naming` an epoch's district
    rename (§6.3 case (5), item 72), with the renaming epoch's component;
  - the **variations** of a derived fill (§7.3 item 10, item 101) are its scope's next three rerolls, derived on the dry
    run's overlay; the one accepted commits as a `regenerate` with that absolute reroll, so no component is added;
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
  params, intent, character, entry mode, table pins, packs — without edits, locks, map assignments or salts. The
  dossier is kept: the new document's creation prefix holds one `creation` `assign` event, carrying its `DossierRef`,
  per live dossier-backed assignment of the current document — the assignment as the dossier's live events leave it
  (each live dossier `setAttr` on the element written into the copy's matching `Assignment` field: `name`,
  `function`, `shapeClass`, `knownTo`, `drift`), without `placed`, `target` or `use`, which name the old town's
  entities — so every dossier element is present from the start, as the dossier now says it (item 20 (c), item
  22 (d), §7.7 One path). Rejections and positive placements, which are map edits, are not carried. When
  the current document has edits the app first warns and offers to save it (J-DET-53).
* Seed-exact parity with the references is ≈ 0 by the evidence and not a goal (`docs/CONFIDENCE.md` §1).
=== REPLACE ### 6.2 What a seed determines, and the model digest ===
### 6.2 What a seed determines, and the model digest

`model = G(outputVersion, base, log)` — a pure function, where the base is the canonical recipe (§2.9's `Recipe`,
which holds every model-affecting input that is not an event) or a rebased state, and the log is folded in order (§7.4)
— its one declared read-ahead being the log's **creation prefix** (the events at positions 0…k
flagged `creation`, §7.1), taken in before the base derivation runs: S2 reads its `assign` events as fixed rows before it runs (§7.4; J-A22.74),
and the stage that owns each drawn declaration of a skeleton's prefix reads it as that stage's constraint (§4.1, item
101; J-A101.41), so a town grows around its declared bones and one seed replays it exactly. Tables, presets and
styles a host supplies are not in the recipe: they arrive as logged `editTable`, `editPreset` and `setStyle` events
whose content is copied into the log (§6.5 (8), §7.6); packs a later `adjust` adds
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
  created (§7.6);
* no host seed — a dossier-bound document's seed is the port's one-way derivation from the host's own seed (§14, item
  85), written into the recipe once at creation: the derived seed replays exactly like any seed, and the host's seed
  never enters a digest, a document or a link (§6.4);
* no pointer — the cursor sun (§8.4) and every other pointer-driven view reads the pointer as a transient view input,
  never stored, logged or hashed (item 68), and an underlay image (§9.5, item 101) is view state the model never reads.

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
               districts — district → block → plot → buildings, yards, households, pins, its Passage records
               hinterland, content (Allocation, FieldBands, institutions, factions, relations, Use records, Rejection
               records, the MaterialLedger, Works records, LightSource records), names and LabelEntity records,
               closeups (edited close-ups only)
               underground — UndergroundSystem, Tunnel, Gallery, Chamber, UndergroundLink and AccessPoint records (its
               plots stay under districts, through the underground pseudo-district and the undercity's
               neighbourhoods); sky — SkyIsland records (their districts under districts, their arenas under plats)
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
  persisted records form the records digest, below); `style`, `view`, `derived`, `hostContent`, `dossier` (the binding and
  the carried facts, §2.9 — rebuilt from the log's dossier events and checked against that fold at load; §7.7, item 74)
  and telemetry (§2.9); the lighting — the light pass, its height-and-normal buffers and its light maps (§8.4, item 68);
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

**Histories, not states (item 22 (c); J-A22.71).** Because the log is folded in order, the map is a function of the seed,
the ordered history of dossier events and the map's own edits: replaying the same history from the same seed reproduces
the same map exactly, and two players who reach the same dossier by different histories may hold different, equally
valid maps — continuity is chosen over path-independence, because each dossier event is a least-disruption mutation of
the map that stood when it arrived (§7.7) and the document keeps the whole history (§2.9), so any map can be reproduced.
A dossier event's draws are keyed by the plots it touches and its own `seq` (§6.1, §6.3), never by the dossier's contents,
so one history gives one digest on every host (§6.5 (9)'s history test). Item 20 (h)'s rule — every map fact derived
from the dossier's facts by the design's rules — is this same fold: the derivation table's rows (§7.7) read only the
dossier facts the log has delivered and the map's committed state, so no derived fact depends on anything but the seed,
the ordered history and the edits.

**State that time and history write (items 67, 68 and 72).** A Works record (§4.11) is model data in the digest; its
drawn stage at any week follows from the record and that week and is never stored or hashed, so scrubbing weeks changes
no digest. A `LightSource` is model data; the lighting it gives is view (above). A district's character vector and
band range (§4.5) are pure functions of committed state, recomputed on load and equal on recomputation (§5.3); they are
never hashed; its `identity`, `pressure` and `nameHistory` depend on the epochs it lived through — the identity's
hysteresis, the retained pressure, the renames — and are model data in the digest, written only by generation and by
epochs. The dials' inputs are recorded — the circumstance slices in the recipe and in each `EpochInputs`, the dossier's
facts in the log — so a load's recomputation reproduces the field (J-DET-12; J-A72.61).

**The elaboration cache is outside both digests (item 28 (c); J-A28.62).** A rung derived by a click — a neighbourhood's
wings, a building's plan — is a pure function of the building's committed state and its own streams (§4.1's laziness
contract, §2.6), so its cached result and its elaboration record (§2.8: the rung's state and the digest of the inputs it
was derived from) sit outside the model digest and outside the records digest, beside the report in the document's
non-canonical blocks (§2.9): a click logs nothing and writes nothing a replay would have to reproduce (replay = session
compares both digests, §6.5 (9)), and a rung's `absent` / `current` / `stale` state is recomputed from the recorded input
digest against the current one at load and after every batch that touches the building. What a click derives enters a
digest only when an edit materialises it — the first plan edit stores the composition (§2.6), and from then on the stored
rings and rooms are model data, as an edited close-up is. The rungs' reroll counters, which their streams read (§6.1),
are not cache state: each is the count the log's `regenerate` events naming that rung give the building, stored
absolutely in those events under `<building id>#<rung>`, so a replay rebuilds them exactly and the cache can be dropped
to `absent` at any time without loss. That is why a
re-cut of an unstored plan along the interior ladder (item 28 (f)) never takes the cache as its prior: its prior is
committed state — the as-built plan carried along the ladder step by step (§7.3's row) — so a building whose occupants
changed twice between clicks derives the same plan whether the user clicked after each change or once at the end
(§6.5 (9)); a stored plan is model data and is re-cut inside the event that changes its inputs (§7.3, §7.4), so no digest
ever depends on a click (J-A28.71, J-A28.72).
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
  district's S8 run (for `baseLane` portals) or the creating edit for portals; the parent surface district for an undercity neighbourhood (II.7.5), whose district's lineage continues its
  parent's; the system for its galleries and chambers (II.7.6; its part in the arena key); the connection stage's run for
  links (creation index by the pair's canonical order); the host for a light source (the light rule row as the creation
  index, item 68); the target for a Works (its start week as the creation index, item 67); the creating edit event (its
  `seq`) for anything a user draws or builds; for any other kind (cells and junctions made by a growth commit, walls, water bodies,
  bridges, greenery), the stage run that created it. The **creation index** is the deterministic creation order of that
  unit's run, or the canonical order the stage declares (for faces and vertices: by their lowest-then-leftmost lattice
  point).
* **Address id** = `kind:token`, prefixed `<layer><part>/` outside the ground layer — the island's slot on the sky layer,
  the system's part on the underground layer, the sewer network's part 0 written bare (`sky2/plot:…`, `under/tunnel:…`,
  `under3/gallery:…`); a part number is part of the address and, like it, never reused (§3.4, J-A65.31). For a generated entity the token is the base-32 form of its lineage hash at creation (13
  characters); for a user-created one it is the hash of the creating event's `seq` and its ordinal — the pieces a closure creates
  (§7.3 item 9, item 66) and the entities a sugar event's expansion creates (§7.1, item 101) are user-created entities of
  their event, their ordinals in the closure's dependency order and the expansion's order. The address is
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
  the district a boundary edit regroups keep their names. S13a **draws** a name only in five cases:
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
     and a slice whose hash differs, or that no longer resolves (a deselected corpus, a removed row), re-draws the name;
  5. at an epoch, for a district whose identity row changed at that epoch's character step (§4.5, item 72 — a change the
     identity's hysteresis already filtered): its unedited generated name is re-drawn on its `naming` stream with the
     renaming epoch's component (§6.1) and the salt its naming record holds, the old text moved to
     `District.nameHistory` (§2.5); a protected name — a `setAttr`, a lock, an assignment, a dossier naming claim
     (§7.7, item 82) — is never re-drawn, its naming record staying dormant (§2.8). The rename is listed in the epoch's
     report (§5.4) and stored in the event (`EditBase.renames`, §7.1) like case (4)'s, without a confirmation: an epoch
     is the history's own step (§4.11). A replay re-draws it identically (J-A72.62).

  Each field of a culture or ancestry row is its own naming slice (§7.6), and a name's record cites only the fields its
  draw read, so selecting another corpus for one field re-draws exactly the names drawn from that field: a street list
  chosen for a culture renames that culture's streets, never its districts or quarters. So **a carried name is kept
  exactly while its naming inputs are unchanged**; a change of the features a grammar guard reads (a district that lost
  its gate) is not a naming input and renames nothing (§9.6) — in generation and in every edit; only case (5) renames a
  district at an epoch, and only past its identity's hysteresis. Every draw uses the entity's `naming` stream — keyed from
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
| access point (II.7.4, items 12 and 64) | (its element's address — the tunnel, gallery, chamber or underground building it reaches, in its part — and the position of its `('access_point', id)` vertex on that element's kerb or wall) | 1 m | `AccessPoint.kind` |
| tunnel, gallery (§2.7, II.7, II.7.6) | its end junctions' addresses; else overlap ≥ 50 % of its length, in its own part | — | `Tunnel.kind`; the gallery's system kind |
| chamber (II.7.6, item 65) | its floor face's centroid, in its own part | 2 m | the system kind |
| underground link (II.7.6, item 65) | its two ends' element addresses | the same pair | `UndergroundLink.via` |
| undercity neighbourhood (II.7.5, item 65) | its parent surface district's address and its void system's part | the same parent and part | — |
| light source (§2.7, item 68) | (its host's address, its light rule row, its ordinal along the host) — a door lantern by its building and entrance, a street light by its way strip and ordinal | 1 m from its recorded point | the light kind |
| Works (§4.11, item 67) | (its target's address, its start week) | the same target and week | the Works kind |
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
  restores that record exactly (§7.4). A **tunnel record** split by a stretch conversion (II.6, J-A11.43) follows the
  same rule, the centreline's first vertex standing for the frontage anchor: the part holding it keeps the address,
  the other parts take addresses minted from the causing event's `seq` and ordinal, and every part continues the
  tunnel's lineage with its part index. A block's `Frontage` record (§2.5) that the same split cuts at a stretch end (II.6) follows the same rule: the part holding the record's first kerb edge in the centreline's order keeps its address, every other part — two where the record spans a whole interior stretch — takes an address minted from the causing event's `seq` and ordinal, each part continues the record's lineage with its part index, and an `undo` restores the one record (§7.4). A mutation continues lineage; only a re-derivation takes a fresh one — New
  random, and every successor the matching above gives in a re-derived scope (Adjust, Re-derive from Sk, a local
  operator of §7.3, template replacement, migration, what an epoch re-derives) (J-DET-2, amended so).
* **Dossier bindings never re-key (item 74).** A dossier re-binding (§7.7) re-points a binding row of `Document.dossier`
  and never re-keys a map address: the element's records keep their ids, lineage and geometry. A dossier name change that
  carries no receipt is a removal plus an addition (§7.7), and the addition mints nothing until the solver places the
  new element, from its placing event's `seq` (above).
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
   and whose positions §13.3 compares byte for byte across engines; and the CPU reference light pass of §8.4 with every
   function it calls (item 68) — its buffers and light values are compared byte for byte across engines by (9)'s
   lighting test, while the GPU implementation, held to it by a tolerance, stays outside (J-A68.62). CI finds that code as the import closure of those
   implementations, column writers and the instance function, from the TypeScript program, so a module that joins it is
   linted without being listed; the rest of `@plat/render` — paint programs, backends, compositing — stays outside,
   because its output is pixels compared by visual regression (§13.3, §13.4). `**` is allowed only with a literal
   integer exponent from 0 to 4, and the build rewrites it into explicit multiplications (exponentiation is
   implementation-approximated in JavaScript); every other power goes through `dmath.pow` (S1's river-width law
   `w0 · acc^0.4` is `dmath.pow(acc, 0.4)`). Also forbidden: `Math.random`, `Date`, `performance`, timers,
   `crypto.getRandomValues`, DOM access, locale-dependent string operations (`toLocaleString`, `localeCompare`, `Intl`),
   `Array.prototype.sort` without a comparator, and any dependence on object-key or `Map` iteration order beyond
   insertion order. The lint also enforces §3.2 (8)'s division rule (`ratio()`), and it scans the dossier port's adapter
   boundary (item 73): no module of `plat/` outside `@plat/port`'s adapter folders names a key of the host's dossier —
   the adapter's key list (§14) is the scan's input — so the host's vocabulary lives in one folder.
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
     §13.2's);
   * *session-history independence* (item 52; J-A52.61) — for 20 seeds, a seed's model digest generated first in a
     fresh process equals its digest when generated after 50 other maps generated earlier in that session and after every view
     toggle and zoom stop: no render draw touches a model stream (§6.1), Enter's successor is (seed + 1) mod 2³², not a
     stream's state (§6.1), and no cache is keyed by anything but its content (§8.10's stamp tiles are built with the
     product and content-hashed). The references' mechanisms are the reason the test exists: in MFCG 12710731, VG 1.6.9
     and NG 1.2.2 the renderer's leftover stream state becomes the following map's seed, and each caches its tree-spacing tiles per
     session; Dwellings (itch 17195045) resets its generator from the clock for some houses; Fantasy Manor 1.0.0 build 890 seeds from the
     page's load time. Ours is independent of the session by construction, and the test keeps it so;
   * *dossier fixtures* (item 83, T73-8) — the same dossier fixture of §13.2's B-DOSSIER-lite and the same seed give the
     same model digest on Node x86 and arm64 and in the nightly five-engine run;
   * *works stages* (item 67) — a Works' drawn stage at week w is a pure function of its record and w: the drawing at a
     week, reached directly or by scrubbing weeks forward and back, is byte-identical, and no digest moves (§6.2);
   * *lighting* (item 68) — the CPU reference light pass gives byte-identical light for the same model, lights, view and
     time on the five engines; the GPU pass lies within §13.4's tolerance of it; a light's flicker is a pure function of
     its render key and the view's time (§8.4);
   * *skeleton round trip* (item 101) — a map's declared subset exported as a skeleton (§11.1) and re-imported under its
     seed reproduces its model digest; a clerk's transcript of tool calls, replayed, gives the session's digest; one
     declaration made on the canvas, through the tool API and in a skeleton file gives one event (the elegance bars that
     schedule these are §13.2's);
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
  | { t: 'setEntrance'; building: Id; op: 'add'|'move'|'remove'; index?: number /* the entrance edited, by its indexed role */; role?: Entrance['role']; wing?: number; side?: number; offsetCm?: Cm }   // item 29: the main entrance may be moved along its street-facing side, never removed
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
  | { t: 'startWorks'; target: Id; kind: Works['kind']; startWeek?: number /* default: the document's week */ } | { t: 'cancelWorks'; works: Id }   // item 67: a timed Works on the weekly clock (§4.11)
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
// Designation and MutationRecord are §4.7 S11's, RoomRole and Entrance §2.6's, ConversionOp and Works §4.11's, DossierChange §7.7's, ClosureRecord §7.3 item 9's, UndergroundLink II.7.6's
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
service door under §2.6's rules — it never removes the main entrance, which may only move along its street-facing side —
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
| terrain | `setField(terrain)` with `water: 'locked'` or `'follow'`, `drawWater` (hollows and lakes), `setAttr` on site features |
| water, coast, rivers | `drawWater`, `moveVertex` on shores and coasts, `moveCourseKnot` on a river's control knots, `setAttr` (bank class), `delete` |
| ways, junctions, bridges | `drawWay` (class `bridge` for a new crossing), `moveVertex`, `warp`, `split`, `merge`, `delete`, `setAttr` (class, width, surface, name; a bridge's kind) |
| districts | `drawBoundary` (its points form, item 101), `quarter` (sugar, item 101), `merge`, `split`, `setAttr` (kind, name, its per-district intent — `DistrictIntent`, §7.7's layer 2 —, `identity` — an override of the derived identity, item 72; §4.5), `regenerate`, `adjust`; `setAttr(fabric)` + `regenerate` is a stage-2 template replacement; derived, no edit kind of its own: the character vector and the band range (§4.5), `pressure` (written only by epochs) and `nameHistory` (written by §6.3's case (5)); an undercity neighbourhood (II.7.5) is a district like any, with `convert` `clearUndercity` |
| reservations (§2.5) | `setAttr` on a market's `rank` (`principal` or `secondary`, item 24): a Re-derive from S3 with its fate report, §4.2 S3 (12)'s batch taking the edited rank as a fixed input (J-A24.71) |
| blocks, plots | `split` and `join` (item 31's splitting and fusion: the least-disruption re-cut of §4.7 S10 (7) with S11's mutator, neighbours fixed, undo exact — §7.4), `merge`, `fill`, `setAttr` (use, owner, `knownTo`; `tenure` — derived from the owner and the band, the edit an override kept like `knownTo`, item 70 (a cluster's structures are buildings, edited as such, and a re-pack of a cluster is its plot's `regenerate`); `frontJitterCm` — 0 or in [`jitter.minM`, `jitter.maxM`], the footprint re-fitted by S11's mutator with the neighbours fixed, item 43; a block's `reach` — `open`, `passage` or `gated` — which re-derives the block's interior by S10 (7)'s re-cut with its neighbours fixed, J-A30.72; never `builtBand` or `builtProsperity`, derived state written only by the paths §4.11's floor paragraph lists — J-A31.44, J-A31.71; never `fieldBand`, derived state written only by a derivation that reads the current field and by the epoch's re-banding (§2.5, J-A28.29); never `exposure`, derived from the access rows; never a block's `due`, derived and written only by §4.11's ladder), `regenerate`, `lock`, `assign`, `placeAt`, `rejectSite`, `drawPassage`, `convert` (`plotToGarden`, `amalgamate`, `subdivide`, `densify` (`infill`, `back_court`), `thin` (`infill`, `back_court`), `sealPassage`, `openPassage`; §4.11) |
| buildings | `drawFootprint`, `build`, `moveFootprint`, `swapUse`, `paint`, `setAttr` (class, heights, roof, basement, `knownTo`, `condition` — an edited attribute §4.11's rung 1 then leaves as set, §7.2, J-A31.76), `setEntrance`, `delete` (a generator-added building only; a dossier-backed one becomes `rejectSite`, §7.7), `convert` (demolish, abandon, decay, ruin, clear, rebuild; vacate, reoccupy, reuse; openUse, closeUse, relocateUse, mutate; `relet` — the household count within §2.6's capacity, item 28 (f) — §4.11), `startWorks` / `cancelWorks` (item 67), `addUndergroundAccess` (item 66; §7.3 item 9), `assign`, `regenerate` with `rung`, the plan events (item 28; `setRoomUnit`, item 28 (f)), `lock` on a room's path (`plan/rooms/<id>`); derived, no edit kind of their own: `nextEntrance` (written by §2.6's entrance derivation and `setEntrance`), `reusedAs` (written by `convert` `reuse`, §4.11), `formerUses` (written by the use conversions that close a building's use or move it elsewhere, §4.11), `predecessor` (written by `reuse … build`, §4.11), each base wing's `spans` (written only by S11 when it builds or re-fits a passage's front building, and cleared by S11 or by the event that makes that building a footprint trace or a tombstone, §2.6), each slot's `frontage` (§2.5's `BuildingSlot`: from the designation template, re-derived by S11's mutator) and each slot's `unhoused` (§2.5's `BuildingSlot`: written by every run of §4.7's generation fill, cleared by the designation mutator) |
| walls, gates, towers | `drawWall` (its points form, item 101), `placeGate` (sugar, item 101), `moveVertex`, `setAttr`, `delete`, `convert` (wallToWay, gateToJunction; neglect, breach, dismantle, contractWall — §4.11); derived, no edit kind of its own: an enceinte's `supersededBy` (written by `contractWall`, §4.11) |
| uses (§2.7) | `convert` (openUse, closeUse, relocateUse — §4.11), `swapUse`, `setAttr` (specialisation; a concealed use's `concealment`, `front` and `knownTo`, item 63 — dossier-owned where the dossier set them), `assign` / `unassign` and the assignment's `pinned` (§7.7); a use's address moves with it (§6.3) |
| institutions (§2.7) | `setAttr` (`knownTo`, name, `concealment`, `front`, `powers`), `assign` / `unassign` (§7.7); a value the dossier set — a dossier-named institution's name or kind, its `knownTo`, concealment, front or `powers`, its assignment's `state` (item 80), a claimed quarter name (item 82) — is **dossier-owned**: a map `setAttr` of it returns F-EDIT `dossier-owned` and changes nothing, while a label's display text and visibility (§9.1) and a viewer's knowledge key (§11.3) remain map-side choices (§7.7 items 7 and 11; J-A20.77) |
| tunnels, galleries, chambers, links, access points (II.6, II.7; staged, editable in the base) | galleries of another system are `drawTunnel` with its `system` and chambers `drawChamber`, each in its system's part (J-A65.71), edited like tunnels (`moveVertex`, `setAttr` on kind, depth, width and `knownTo`, `delete`, `convert` silt, caveIn, seal, reopen and `flood`, II.6, item 65); links: `addLink`, `setAttr` (kind, `knownTo`), `delete`; a buried old town is `convert` `raiseGrade` (II.7.6); tunnels: `drawTunnel`, `moveVertex`, `setAttr` (kind, `widthCm`, `headroomCm` — `navigable` re-derived from them, §2.7), `delete`, `convert` (silt, caveIn, seal, reopen) — a tunnel's condition is no `setAttr` path: it reads `existence` and `closure`, so a condition change is the matching `convert` (J-A11.21), and the profile preset is II.7.2's network choice, not a tunnel field; access points: `placeAccess` (from public ground), `addUndergroundAccess` (from a building's basement: a closure, §7.3 item 9, item 66), `moveVertex` on the `access_point` vertex (the underground end), `setAttr` (kind, role, `state` — open, locked or bricked, a collapsed reading never set — and `knownTo`, item 64; `ground.at`, the opening — re-hosted by `pointLocate` on the ground's `PlatKey` and refused as F-EDIT outside II.7.3's admitted ground), `delete`; `setLayer` on `underground` is the CITY / METROPOLIS visibility toggle (§7.8); J-A12.71 |
| sky islands (II.6; staged, editable in the base) | `setAttr` (area, altitude, state), `lock`, `convert` (resizeIsland, settleIsland, fallIsland, refloatIsland, raiseIsland); `recipe.layers.islands` is an `adjust` that re-derives from S7b (§7.8) |
| terrain and water conversions (§4.11, item 25) | `convert` (`reclaim`, `siltReach`, `shiftCourse`, `digCanal` — the slow conversions the evolution engine will schedule, usable by hand now), repaired through S1's terrain or water operator or the carve: a marsh's `reclaim` by the terrain operator (§7.3 (a)), a foreshore's `reclaim`, `siltReach` and `shiftCourse` by the water operator (§7.3 (b)), `digCanal` by the carve (§4.11); derived, no edit kind of its own: `LandUse.reclaimed` (written by `reclaim`, §2.3, §4.11) |
| works (§4.11, item 67; J-A67.71) | `startWorks`, `cancelWorks`, `setAttr` on the Works (`startWeek`, its duration within its `WorksTable` row) — its stage at a week derived, never set |
| lights (§2.7, item 68; J-A68.72) | `placeLight`, `setAttr` (kind, `heightCm`, colour, intensity, `radiusCm`; `point` — re-hosted by `pointLocate` on its host's `PlatKey`, refused as F-EDIT off its host), `delete`, `lock`; derived lights (lit windows, the plan rung's room lights) have no edit kind; the view's light keys (§2.9) are not logged |
| greenery, trees | `drawGreen`, tree brush, `instance`, `setAttr`, `delete` |
| fields | `setField` (prosperity, density, greenery); `setAttr` on the town's `FieldBands` (an explicit re-banding) — both authorial: the blocks they re-derive past τ take the new field as their built state and their plots' `builtBand` (§7.2, item 31) |
| names, labels | `setAttr` (text), `moveLabel`, `hideLabel`, `rerollLayer(naming)` town-wide or on chosen entities (`ids`), `group` (a region label group, sugar, item 101); a name the dossier gave or claimed is dossier-owned, its label's display text a map-side choice (item 20 (h)) |
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
fixed, like a dossier fact, until its author changes it (§7.2; the tier marker `declared`, §2.8). A declaration is
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
* **Declared means held** (item 101 R13; J-A101.71). Every entity an authoring declaration (§7.1's toolkit) made,
  placed or shaped is held without a lock to remember: the declaring event pins it (existence and position; its other
  attributes may re-derive) — a drawn feature is locked besides (below), a placed or assigned thing is held as `placeAt`
  and assignments hold it, a quarter's boundary and a points form's derived shape are pinned by their event, a
  hand-placed light by `placeLight` — so Regenerate, New random, every scoped re-roll, an epoch and every later
  derivation keep it (§5.3's declared row), the regenerate brush skips it, and the fates list names it *kept (declared)*
  (§7.3 item 4). Its author changes it by a new declaration (a handle drag, §7.1), by `unpin`, or by undoing the
  declaring event; a skeleton's declarations are held the same way (§4.1). The pieces a closure edit created (§7.3 item
  9) are held while the edit that created them is live.
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
=== REPLACE ### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3) ===
### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)

1. **Effective scope.** `regenerate(scope)` finds the coarsest faces covering the scope at the scope's level; that set
   — possibly larger than the drawn area — is the **effective scope**, shown before commit and stored in the event as
   the resolved `EditScope`. For an edit that chains local operators (item 3) it is the union of every chained
   operator's scope. For a designation change, a dossier event, a positive placement or a relocation (item 8) it is the
   plots the placement and the mutation touched — the site, its joined neighbour if any, and each displaced use's new
   site — bounded by the request kind's disruption budget (§7.7), except a dossier event over budget, whose scope is the
   touched set of its least-disruptive placement, reported over budget (§7.7 item 5). **Stored compositions, spanned
   passages and re-homed households** (§2.6): the edit that stores a composition — and every event whose re-cut of a
   stored plan establishes J-P48 (1) for its new walls (§2.6) — holds the faces sharing an edge J-P48 (1) splits and
   the row neighbours' wing rings its carry changes; an edit whose batches change a `Passage` face (L3) or move one of
   its vertices holds the passage's front building (`Passage.frontBuilding`, §2.5) when that building's stored
   composition has a wing spanning the passage (§2.6's carry trigger); an event that changes a spanning wing's heights, or makes its building a footprint trace or a tombstone, holds the passage it spans, whose `headroomCm` or `frontBuilding` it rewrites (§2.5's `Passage`, §2.6's `BaseWing.spans`); and an edit that lowers a building's capacity
   below its households holds that building, the buildings §2.6's capacity rule re-homes its households into and, where §4.7 re-provides a dossier household's housing, the plots its `dossier` request touches — the site, its joined neighbour if any, and each displaced use's new site — bounded as a dossier event's scope is (above). **The seam exception** (NF-P6): a
   district-scoped re-derivation's effective scope also includes its bounding ways' chains and `Corridor` records, the
   half-corridor strips on both sides and the junction wedges at the
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
| S1 terrain (terrain brush in either water mode, site features, a marsh's `reclaim`, item 25) | (a) below: masked stroke, local drainage, terrain-reading field drivers, exact re-basing of what stands on the changed ground, slope re-sampling; in `follow` mode, (b) for every reach whose bed changed | all water in `locked` mode; the heightfield outside the stroke; every way's geometry | in `follow` mode, Re-derive from S1 when a course leaves its drainage basin or F-RIVER needs its inlet or centre rung (§5.2) |
| S1 water (`drawWater`, a moved shore or coast vertex, `moveCourseKnot`, a `warp` from level 0, the terrain brush in `follow` mode, `siltReach`, `shiftCourse` and a foreshore's `reclaim`, item 25) | (b) below, in §4.11's order: new water, crossings, routes, wall runs and the chain's footprint as data; one L1 batch that clears the footprint's partition content, re-lays the kept ways through their decks, re-traces the crossed wall runs and cuts the lesser ways; one L0 batch inserting the water through the vertices that batch prepared, both declaring the footprint as clear region; then S5, S6, S7, tree scoping and F-REDERIVE | reaches and coasts outside the edit; every way, wall and district not named in (b); every finer face outside the footprint, less the seam exception at its boundary | Re-derive from S1 when the course leaves its drainage basin or F-RIVER needs its inlet or centre rung (§5.2) |
| S4 (`drawWay` of an arterial, a moved arterial vertex, a moved destination, the castle placed or resized, a deck re-sited or removed by S1's water operator) | re-route only the arterials whose corridors meet the edit region or whose destination or deck moved, each between its nearest pinned nodes (junctions of degree ≥ 3 or destination nodes) on either side of the region, over S3's lattice, every deck a fixed graph edge | their endpoints; every spine outside the region | a gate-count change (a destination added or removed) re-derives from the stage that picks those gates: S3 for stage 1 (§4.2 S3 (7)), S5 of its stage for a later enceinte (§4.4) |
| S5 (`drawWay` of a secondary, a deleted street, a secondary now crossing water off a deck) | regrow only inside the affected L1 cells, from the proposals whose origins lie there, under S5c's legality (water only on a deck) | the cells' boundary spines | — |
| S6 (`drawBoundary`, district merge or split, `outskirtToDistrict`, land vacated or covered by a moved channel) | regroup and re-type only the districts touching the region, the grower restricted to their cells, its turn skips and picks drawn from `district.seed` keyed by each grower's seed lineage and turn (§4.5, §6.1; item 47), so unchanged cells regroup as before; then **re-lay the margin bands**: along every L1 edge without corridors whose sharing changed (a moved stretch of the settlement perimeter, a reservation boundary two districts now share) S10's step (0) lays the 2 m band on both sides, and where a merge or conversion ends the sharing it removes both parts; the blocks fronting such a stretch on either side (a neighbour's or the hinterland's included) re-derive from S10 and join the effective scope shown in the dry run | every other district, and every block fronting no changed stretch | — |
| S7 (`drawWall`, a moved trace vertex, `wallToWay`, `gateToJunction`, a river whose course crosses an enceinte moved; a declared way of a class above lane crossing an enceinte — a `placeGate`'s stub or a declared road, item 101) | re-trace only the run between the nearest unaffected towers on each side, with water gates where the course now crosses and a gate at each declared crossing (a lane across a strip stays refused, NF-P5; J-A101.76); re-cut the strips' setback and glacis lines along it; re-derive the strip blocks' S10 step (0) | the rest of the trace, its gates and its strips | Re-derive from S7 when the enceinte kind changes |
| a carve (a canal, moat or basin drawn by an edit, `digCanal` among them; §4.11) | §4.11's way rule (pinned decks for arterials and sole connections, cuts for the rest) and footprint, in its declared batch order, the channel inserted with the footprint as its clear region (§3.3) | every way and finer face outside the carve's footprint (§4.11: the channel ⊕ (`attractCm` + bank setback) united with every L1 cell that buffer, the way rule and the wall re-trace touch — the rules (b)'s footprint follows), less the seam exception | if the clear region cannot be kept, §3.3's pre-decided fallback: a declared town-wide re-derivation with the fate report |
| S8–S11 | per cell, block and plot (tree scope, item 2; wall-strip blocks and the scope's side of every shared margin band from S10's step (0)) | the other side of every shared edge | — |
| S12 | the covered hinterland faces and greenery entities; the hinterland unit re-lays its headland parts along the perimeter by step (0) first (item 2) | the districts' side of the perimeter | — |
| a designation change (`assign` / `unassign`, `setAttr` use or class, `openUse` / `closeUse` / `relocateUse`, a dossier event, `placeAt`, the re-placement a `rejectSite` causes; item 18) | §4.7 S10b's solver for the site, then §4.7 S11's mutator on each placed plot (the inverse mutation on reversal); a displaced use re-placed by the same solver, one displacement level (§4.7 S10b) | every plot outside the touched set; every locked part; the plots' faces beyond a joined neighbour | — (a JOIN the mutator needs is a `join` of the two plots, chained as item 3 states) |
| a plot fusion or splitting (`join` / `split`, item 31) | S10 (7)'s re-cut of the members with their neighbours fixed, under the band's target, then S11's mutator on the new plots (an occupied building kept, or the edit refused, §7.1) | the block's other plots and every neighbour's ring; the members' party-wall vertices on the fixed side | — |
| a click on a stale elaboration rung (item 28; no event) — the re-cut of an unstored plan along the interior ladder among them (item 28 (f)) | `BuildingGenerator.plan` from its **canonical prior** — committed state, never the cache (§6.2): the stored plan where one exists, else the as-built plan (the class's programme at the plot's `builtBand` row with the template's `households.built` clamped into [1, capacity], §2.6, §10.2) carried along §2.6's interior ladder one row or one household at a time, in the order §2.6 states, to the occupants' current band and household count, each step §2.6's re-cut rule — its FIXED set, its re-derived set and its kept-room rule, stated there (J-A28.26) — with its draws keyed by the step (§6.1); the cache holds any step already derived and is only a memo (§6.2); the wings rung likewise through `compose`, with the stored or as-built wings as its prior | everything — a click writes only the cache (§6.2) | — |
| a change of a building's plan inputs while its plan is STORED — a `relet`, a household moved in or out (§4.7's overflow pass, §2.6's capacity re-homing, item 17's relocation, §10.3), an occupants' band change at an epoch, a designation mutation (item 28 (f)) | §2.6's re-cut rule run inside the changing event, from the stored plan as its prior, around its edited and locked rooms as fixed inputs (§7.2), one ladder step per row or household crossed, recorded in the event (`EditBase.mutations`) and listed as fates (item 4); an unstored plan is only marked stale (§2.8) and waits for the click above (J-A28.72) | the shell — wing rings (read without the `composition`-role vertices the re-cut adds, §2.6, J-P48 (1)), entrances, heights, roof, basement — and every room outside the wings whose demand changed | — |
| an edit whose prerequisites are missing — `addUndergroundAccess` and the other instances of item 9 (d) (item 66) | the closure (item 9): its generators in dependency order on the overlay, each through its own stage's operator, as one event and one transaction | everything outside the closure's pieces and their clear regions | — |
| the staged layers (II.6, II.7) | a ground edit re-derives the underground blocks whose recorded ground cells its clear region covers (II.7's declared reads), a tunnel edit the blocks its edges bound, an island edit its own arena; the underground's and an island's reroll writes only its own arena (their seam exception is empty); each underground system's edit and reroll writes only its own part (§3.4, item 65), an undercity neighbourhood's only its void system's part, and a closure's underground pieces the part II.7.6 gives each | the ground arena under an underground edit; every other arena and part | — |

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
      (§7.2) — what a reload computes from the drivers and the stroke list (§2.9). Inside an `epoch` event (a `reclaim`
      the engine schedules, §4.11) the re-evaluated drivers only mark due blocks for §4.11's ladder and re-derive
      nothing by τ (§7.2).
   4. *Re-basing, exact:* every entity on a changed sample is re-based by §2.6's per-entity datum step (the function S11
      and S7 call): a wing's `baseCm = max(samples) + plinthCm` with its foundation skirt; a row footprint whose fall now exceeds `skirtMaxCm`
      re-split into stepped wings (F-SITEPLAN's first rung; footprint face and address unchanged); towers and gates from
      the samples under their footprints; the wall's `base` profile — each knot whose sample changed takes the new
      value, and a trace vertex whose sample changed and carries no knot gains one (§2.2 rule 5); a bridge's `deckCm`
      and a pier's deck height from their bank elevations plus the clearance row. A user-edited `baseCm` is kept (fate
      *kept*, listed) (J-DET-24); every building whose terrain gate changed re-derives its basement decision by §2.6's
      rules — a cellar under a raised water table becomes `none`, a slope past the class threshold a walk-out cellar —
      an edited `basement` kept (item 29).
   5. *Slopes:* every way whose spine crosses changed cells re-samples `slopeP95`; a way now steeper than its class's
      limit is reported with an offer to re-route it (a `regenerate` on that way through S4's or S5's operator), never
      re-routed silently.
   6. *Water:* in `follow` mode, (b) runs for every reach whose bed cells changed.

   **(b) S1's water operator** runs in §4.11's carve order — prepare the finer structure the new water will meet,
   insert the water, re-grow what it displaced — because a coarse insertion may meet finer geometry only at vertices an
   earlier batch of the same edit placed (§3.3). Both geometry batches declare the chain's footprint as their clear
   region under §3.3's clearing and preparation rules, as the carve's batches (1)–(2) do. The terrain and water conversions
   of §4.11 (item 25: silting, a course shift and a foreshore's reclamation) run through this operator as their local
   repair, their new water or land being (1)'s data; a marsh's reclamation runs the terrain operator (a), and
   `digCanal` the carve (§4.11).
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
      splits every other **structural edge, of any level,** that the new banks will cross and that is no way — a
      settlement-perimeter or district-boundary stretch (L1), a setback or glacis line outside a re-traced run (L3, the
      faces §5.3's NF-P5 row names) — at its two bank points, each carrying an `anchor`
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
   declared (§7.2, listed *kept (declared)*); a closure's created piece (item 9, with the event that created it);
   hosting a pin; the target of a pinned label placement; housing a pinned or edited person; an edited close-up entity
   — with its fate: **kept** (a fixed input); **carried** (to its anchor-matched successor, §6.3, after the class-family
   check — an override moves with the address only if the successor's class family accepts the attribute, never by id
   alone); **orphaned** (no successor: the edit stays in the log, is listed in the document's orphan table and can be
   re-attached); or **discarded** (only with "discard edits in scope", recorded as supersede events). A chained edit's
   report also lists its unprotected consequences — bridges re-sited or removed, ways re-routed, cut or pruned,
   buildings re-based or demolished — with their lifecycle events; every edit's report lists the households §2.6's capacity rule re-homes, each with its `relocate` event (from and to), the residential slots §4.7 builds to re-provide a dossier household's housing, with the uses that re-provision displaces and the plots it joins, and the names it re-draws by
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
   carries one (item 3's S6 row).
   (vii) **mutations and dossier events** — a designation change, a relocation, a plot `join` or `split`, a dossier
   event, a positive placement, a rejection, a `relet` with the re-cut of a stored plan it runs (item 28 (f)), a plan
   edit or rung re-roll, a closure edit with its undo and the deletion of its edited thing (item 9), and a sugar event
   with its expansion (item 101) are edits under (i)–(iii): byte identity
   outside their touched set (the effective scope of item 1), the same record on every host, and A → B → A by the
   inverse mutation byte-identical when nothing else changed (§4.7 S11 rule 5; the fixtures are §13.2's).
8. **Designation changes are mutations, not re-derivations (item 18; J-A18.71).** Where an edit changes what a plot is
   for — `assign` and `unassign`, a `setAttr` on a plot's use or class, `openUse`, `closeUse` and `relocateUse`, a dossier
   event, `placeAt` and the re-placement a `rejectSite` causes — the engine does not discard the plot's finer content and
   re-run S11 (item 2): it runs §4.7 S11's designation mutator on the plot, which keeps every part that still fits the new
   designation's template, adapts, converts, adds and subtracts the rest as a recorded `MutationRecord` drawn from the
   plot's `siteplan.mutate` stream (§6.1), and joins a neighbour only when the template's size budget needs the land (a
   `join`, chained as item 3 states). Its effective scope is those plots' faces (item 1); its fates are item 4's (a locked
   part is *kept*, never subtracted); reversal applies the inverse record (§7.4). Tree scoping remains the path of
   Regenerate (keep settings) and New random on the same plot, which are re-derivations and say so (§7.1).
9. **Closure edits — an edit generates the prerequisites it implies (item 66; owner: "if a user edits a building to
   have an access to the underground, it generates all the necessary pieces"; J-A66.71).**
   (a) *The rule.* An edit whose target lacks what it needs to stand — its **prerequisites** — is expanded at its dry
   run into its **closure**: the minimal set of pieces that makes it lawful, in dependency order (each piece's own
   prerequisites first). An edit kind that can imply prerequisites declares its **closure generators** in the entity
   registry (§2.8), in that order, each naming the stage operator it calls; an edit kind that declares none is never
   expanded. The closure is the edit's ONE event and ONE transaction — its batches one arena, and on the underground
   layer one part, each (§3.3, §3.4), in dependency order — so it commits whole or not at all.
   (b) *Seed and locality.* Every piece draws from the edited entity's and its target's lineage streams under the
   calling stage's concerns, keyed with the event's `seq` (§6.1), and is minted from the event's `seq` and its ordinal
   in dependency order (§6.3; J-A18.43's pattern): one edit, at one log position of one seed, always yields
   one set of pieces. Its effective scope (item 1) is the pieces and their clear regions; byte identity holds outside them
   (item 7 (ii)).
   (c) *Record, undo and ownership.* The event stores its closure record (`EditBase.closure`): the pieces it created,
   in dependency order, and the existing pieces it reused (a connector already dug, another cellar). `undo` removes
   exactly the created pieces and restores what they replaced (§7.4); nothing it reused is touched. A later deletion of
   the edited thing — a `delete` of the access point — removes the created pieces nothing else now uses: a connector a
   second access has come to share stays, that access's closure record naming it among its reused pieces. A basement
   the closure created returns to §2.6's derived basement decision unless the user has edited it since (an edited
   `basement`, §7.2). The pieces are held while the edit that created them is live (§7.2). A closure creates map facts
   only, never a dossier fact (item 20 (h)); a closure that would change a dossier-owned value is refused
   `dossier-owned` (§5.2).
   (d) *Instances.* `addUndergroundAccess(building, target?)` (§7.1) is the first. Its generators are II.7.6's pieces
   (J-A66.41): the basement by §2.6's requested-mode ladder — the request overrides the probability, never the terrain
   gate: a full cellar, else a half cellar or a walk-out on a slope, else a hatch to a crawl space, else a refusal naming
   the gate —; the target in II.7.6's order; the dug connector; the minimal private underground where none exists; the
   access point; the plan reservation (the basement plan's stair, ladder or hatch, its rung marked `stale`, §2.8); and
   the links. A clandestine front that lacks its concealed door (§4.7, item 63) and an undercity entrance that lacks its
   lifeline (II.7.5, item 65) are closures too, built by those generators, and every later edit kind that implies
   missing prerequisites declares its generators the same way.
   (e) *Failure.* A generator that cannot produce its piece ends the expansion: the dry run returns F-EDIT with the
   nearest lawful form its ladder reached, or the refusal with its reason (§5.2), and nothing commits.

```ts
interface ClosureRecord { created: { id: Id; piece: 'basement'|'target'|'connector'|'system'|'access'|'reservation'|'link'|'door' }[] /* in dependency order */;
  reused: Id[] /* existing pieces the closure attached to */ }   // EditBase.closure (§7.1); read by undo, by a later delete and by §5.3's closure row
```

10. **Scoped re-rolls and variations (item 101 R5; J-A101.75).** Every re-roll is scoped — `regenerate` with
   `newRandom` on a scope (a block, a quarter, a building's rung) or `rerollLayer` on one rerollable layer (the trees,
   the names); an unscoped new town is only the empty state's action, before anything is declared. A derived fill — a
   `fill`, T8's brush, a scoped New random — offers **three variations**: its dry run derives the scope at the scope's
   next three rerolls on three overlays, §5.1 (6)'s content check applying to each, and the ghost shows them side by
   side; the variation the user accepts commits as that `regenerate` with its absolute reroll map, and the others leave
   nothing behind. Declared entities are kept in every variation (§7.2).
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
| drawTunnel / drawChamber / addLink / placeAccess (items 11, 12, 64, 65; J-A12.71) | the underground tools (II.7; a staged layer, editable in the base) | the `Tunnel` or `Gallery` record and its chain, the `Chamber` record and its outline, the `UndergroundLink` record and its two `link_end` vertices, each in its system's part (II.7.6); the `AccessPoint` record, its `state` and `knownTo` and its `access_point` vertex (§2.7, II.7.4) | log (the geometry is the payload) | at its log position: a drawn tunnel through II.7's network stage (its chain inserted on the underground arena, `navigable` derived) and the underground stage re-deriving the underground blocks its edges bound (§7.3's staged-layers row); a placed access point by II.7.3's access rules, its ground host found by `pointLocate` on the ground's `PlatKey`, nothing on the ground written; a gallery or chamber through its system's stage on its own part, and a link between its two parts' vertices, one part per batch (§3.4); an access point's underground end moves by `moveVertex` on its `access_point` vertex and its opening by `setAttr` on `ground.at`, re-hosted the same way and refused as F-EDIT outside II.7.3's admitted ground (§7.1) | undo record: the replaced underground scope; a moved opening's former `ground.at` and `host` | the same geometry replays at its log position; an access point whose tunnel is unmapped is orphaned and reported |
| addUndergroundAccess (item 66) | a building's context action (§7.1); the API | the `AccessPoint` and the pieces of its closure; the event's closure record (`EditBase.closure`) | log: the building, the optional target and kind, and the closure record | at its log position, the closure's generators in dependency order (§7.3 item 9); its pieces held while it is live (§7.2) | undo record: the created pieces removed and what they replaced restored, the reused pieces untouched, a created basement back to its former state; a later `delete` of the access removes only the created pieces nothing else uses (§7.3 item 9 (c)) | replays at its log position; an event whose building is unmapped is orphaned and reported |
| placeGate / quarter / roster / group (sugar, item 101) | the authoring tools (§7.1's toolkit), the clerk's tool API (§11.2), a skeleton file (§11.1) | the entities its expansion made; declared, so held (§7.2) | log: the sugar event itself, with its `expansion` version — one undo step, one fate report | expanded at its fold into its events by `sugar.json` at the recorded version (§7.6), what it creates minted from its `seq` (§6.3) | undo record: the whole expansion's scope, as one step | the recorded expansion version replays; an upgrade whose expansion table changed maps the event as it maps the events it expands to, listed once in its diff (§7.5) |
| startWorks / cancelWorks / setAttr on a Works (item 67) | the Works tools (§7.1); an epoch's step (§4.11) | the `Works` record; its stage at a week derived from it (§4.11) | log (the epoch's own for an epoch's Works) | §4.11's Works: the change of ownership at its start and the stages derived from the record and the week; a `cancelWorks` ends it by §4.11's rule | undo record: the Works record and the plots and buildings its start changed | the record replays; its stages follow the output version's `WorksTable` |
| placeLight / setAttr / delete on a light (item 68) | the light tool (§7.1) | the `LightSource` record (§2.7) | log | a hand-placed light is declared (§7.2): it survives a regeneration by its anchor — its host's address, rule row and ordinal (§6.3) — and follows its host's lifecycle (§2.8: removed with a demolished host, unlit on an abandoned one); rule-placed lights re-derive with their host's faces (§4.7, §4.11) | inverse; exact | by its host's address; a light whose host is unmapped is orphaned and reported |
| drawFootprint / build / moveFootprint / swapUse / fill | building tools (§7.1) | building and plot entities | log | S11 re-fits the host plot(s) with the footprint as a fixed slot; `fill` re-runs S11 on its scope with the forced arrangement | undo record | replays; a footprint whose host plot is unmapped re-creates a plot around it |
| delete / merge / split / join / convert (incl. the ladder kinds — `relet`, `densify`, `thin`, `subdivide`, `amalgamate` —, the decline kinds, the tunnel and island kinds, the use kinds, the sealing kinds, the terrain and water kinds of §4.11 and the underground layer's `flood`, `raiseGrade` and `clearUndercity`, II.7.5–II.7.6) | context actions; the evolution engine's plan (§4.11) | lifecycle events with cause | log | structural ops on the plat (§3.4): a district or way `split` / `merge` with dependants re-derived; a plot `join` or `split` is item 31's fusion or splitting — S10 (7)'s re-cut of the members with their neighbours fixed, S11's mutator on the result, no occupied building removed unless confirmed (§7.1, §7.3 item 8); `convert` = `retypeEdges` plus lifecycle events; decline conversions change `existence` and the drawing (§2.8), credit or debit the material ledger (§4.11), and a `reuse … build` succeeds at the trace's address (§6.3); tunnel conversions change the tunnel's `existence` and `closure` (its condition reads them, §2.7; J-A11.21) and close or reopen the frontage plots on the run (II.7.3); island conversions resize an arena or archive it (`fallIsland` lays the ruin face through the carve path, §4.11); use conversions open, close or relocate a `Use` (§2.7) with `detail.from` / `to` and mutate the buildings by S11; `relet` sets a building's household count within §2.6's capacity (item 28 (f)) — households added are minted from the event, households leaving go by item 17's relocation (§4.11, §10.3) —, marks an unstored plan stale and re-cuts a stored one inside the event (§7.3), no shell geometry changed; `densify … infill` and `thin … infill` add or clear yard buildings by S11's mutator; `densify … back_court` and `thin … back_court` re-cut the plot's yard by S10 (7) with its neighbours fixed, adding or removing a rear row and its passage face (§4.6, §4.11); `subdivide` and `amalgamate` are rung 3's re-cuts, whose hand forms are §7.1's plot `split` and `join`; `sealPassage` / `openPassage` set `Passage.sealed` (§2.5), change no geometry, and vacate or reoccupy the plots behind it (§4.11; item 30); `siltReach`, `shiftCourse` and a foreshore's `reclaim` run S1's water operator (§7.3 (b)), a marsh's `reclaim` its terrain operator (§7.3 (a)), and `digCanal` is the carve (§4.11); a split or join of a chain carrying a profile (a way's width, a wall's base, a tunnel's invert, a shore's bank kind or class) goes through `retypeEdges`' `rekey` on the part's `StretchRef` (§3.4) — each part gets a cut knot carrying the sampled value, a join knot is dropped only where the joined profile is unchanged (§2.2 rule 5) — and the event writes both records' returned profiles | undo record: members resurrect with their former rings, records and `builtBand`, tombstones return to live, both records' former profiles; a decline or tunnel conversion's former state and ledger rows; a fallen island's arena restored from the archive and its ruin face removed through the carve path's inverse; a `reuse … build` undo returning the address to the trace; a use conversion's former use and building links; a `relet`'s former count, household links and stored plan; a ladder conversion's former rings, records and passage face; a terrain or water conversion's replaced chain scope with the records §2.3 lists; a mutation's inverse record | same |
| regenerate / adjust / re-derive from Sk | the named actions on an area, district, block, plot or person | report entry; the fate list | log: resolved scope, mode, absolute rerolls used, confirmed fates and renames | §7.3; New random's content check (§5.1 (6)); a pack-list `adjust` and any re-derivation reaching S13a run case (4) for the unedited names citing a changed slice; `Adjust` re-derives with the current field and sets `builtBand` in its scope, listed in the fate report, while Regenerate (keep settings) keeps it (item 31) | undo record: the effective scope's faces, entities (names and naming records included), lifecycle events and tombstones, O(scope) — an undo restores the former names, never re-draws them | the scope replays; fates and renames recomputed and compared under §7.3 item 4's rule |
| assign / unassign (a dossier event among them, `EditBase.dossier` set) | assignment dialog / host API / the host door (§11.4) | `assignment` fields, `flags.assigned`; a dossier-backed assignment's `existence: 'dossier'` (§7.7) | log; blueprint and dossier-at-creation assignments at positions 0…k, flagged `creation` and read ahead by S2 (Replay semantics, above) | §4.7 S10b places (claims-first at positions 0…k, the least-disruption order after the city is built) and §4.7 S11 mutates each placed plot, the record in `EditBase.mutations`; an assigned name keeps the naming record dormant; an `unassign` leaves the plot vacant (`closeUse`, §4.11) and frees the name, which runs case (4); a dossier-backed element's existence is held (§7.2) | the inverse mutation from the undo record (§4.7 S11 rule 5) and the former placements — for an event that is neither a `creation` event nor a dossier event, which are no undo targets (Replay semantics, above) | addresses and criteria; unmapped members re-solve around the mapped ones (§7.7); a dossier element re-binds by its `DossierRef` |
| rejectSite / placeAt (item 20 (b), (g)) | the map's "delete" of a dossier-backed element; the "make this place X" action | the rejection record and the plot's pin (§2.8, §7.7) — model data | log | `rejectSite`: the element is re-placed by §4.7 S10b's solver at the event's position and the site is excluded while the rejection holds; the hold lapses — the site eligible again — by §7.7's lapse rule (item 3), the lapsing event writing the lapse into the record inside its own touched set, never as a log event of its own (J-A20.74); `placeAt`: the plot is pinned to its element or designation, honoured by every later placement and re-application that can, reported when one cannot | inverse (`lift`); the re-placement's scope restored from the undo record; an undo of a lapsing epoch that carried no dossier event restores the hold, while an `undo` naming a lapsing dossier event, or an epoch that carried one, returns F-EDIT (Replay semantics, above) | by the site's and the element's addresses; an orphaned rejection or pin is reported |
| setEntrance / setAttr(basement) (item 29) | building tools (§7.1) | `Building.entrances`, `Building.basement` (§2.6); `editedPaths` | log | edited attributes: a moved main entrance and an added, moved or removed door are fixed inputs of the site plan, carried with the wing (§2.6) and re-fitted around by S11's mutator on a designation change — a house that becomes a shop gains its street door, a shop that closes keeps its door as a house door (§4.7 S11); an edited basement is kept through terrain changes (§7.3 (a) 4) | inverse | with the building's address; an entrance whose wing is unmapped is re-placed by §2.6's rules and reported |
| drawPassage / sealPassage / openPassage / setAttr(knownTo) / setAttr(reach) (item 30) | context actions on a plot, a block, a building or an institution | the passage face and its `Passage.sealed` bit (§2.5; an access row on a sealed passage face reads sealed), `Block.reach`, `Plot.knownTo` / `Building.knownTo` / `Institution.knownTo` | log | the passage face and the rear plots' access rows are fixed inputs of S10's re-cut; an access row on a sealed passage is skipped by §5.3's reachability walk and the plots behind it decay as vacant under §4.11's ladder; a `setAttr` of a block's `reach` re-derives its interior by S10 (7)'s re-cut with its neighbours fixed (J-A30.72); `knownTo` is read by §9.2's label policy only — no model geometry changes; a dossier-backed institution's later dossier value re-imposes over a map override, reported (§7.7) | inverse | by address; a passage whose building is unmapped is reported |
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
=== APPEND TO SECTION ### 7.5 Migration and upgrade (G-P9) ===
**The schema transforms the amendments of 2026-09-27 and 2026-09-28 add** (items 20 (h), 63–72, 74–82 and 101) — each
pure and forward-only, checking the old records root and writing the new one (§6.2), as above. A use, an institution
or an assignment without `concealment` reads `none`, with no front; an assignment without `state` reads `active`. An
`AccessPoint` without `state` reads `open`, its `knownTo` derived at first load by II.7.3's rule, its `source`
`neighbourhood`, and its `under` built from the older tunnel reference as part 0 and that tunnel; a `placeAccess` event's
`tunnel` reads as its `element`. A plot without `tenure` derives it at first load (§4.7, item 70); a district without
`identity` takes the one its character step derives at first load (§4.5), with `pressure` 0 and no `nameHistory`. The
`Document.dossier` block is rebuilt from the log's dossier events at first load (§7.7, item 74). An older event has no
`dossierChange`, `proposedBy`, `closure` or points form, and none is invented; an older `epoch` event without a `week`
takes the week its predecessor's week and its own `years` give (52 weeks a year; the first epoch's predecessor week 0;
§4.11, item 76; J-A76.72). Model data a later output version derives that an older document never held — Works records, rule-placed
lights, the underground layer's other systems, galleries, chambers, links and undercity, clusters — appears in it only by
an `upgrade` to that version, whose diff lists it (above), never by the schema chain.

**Sugar events migrate by their expansion** (item 101; J-A101.72). A `placeGate`, `quarter`, `roster` or `group` event
records the version of `sugar.json` it was expanded with (`expansion`), and every replay under the document's own output
version expands it at that version, so the session and the replay make the same events. An `upgrade` whose output
version changed an expansion re-expands the event under `to` and hands its entities on by §6.3's matching like any
re-derived scope; the events whose expansion changed are named in the diff with the other changed confirmations
(`MigrationMap.changedConfirmations`), once.
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
  sewer existence law (II.6, II.7), the underground rule `UndergroundRule` and the tunnel profile table
  `TunnelProfileRow` (II.7.2, II.7.4), the disruption budget rows (§7.7), the entrance and cellar columns of the
  designation templates (§10.2, read by §2.6's rules), the basement-gate row `RosterTables.basementGate` (§10.2), the
  band set `prosperity.bands` (§4.5), the market-siting weights
  `market.siting` (§4.2 S3 (12)), the farmland modes `FarmModeRow` (§4.9), the reach weights (§4.6), the knowledge admission table `knowledge.admit` (§9.2), and the rows the amendments of 2026-09-27 and 2026-09-28 add — the bent cut's `cut.bendMode` and `cut.flattenM` (§4.6), `castle.minInnerM`, `wall.smoothPasses`, the gates' waterfront share and `district.growthRate` (the tables §4.2, §4.4, §4.5 and §4.8 name), the front-recession columns `jitter.maxM` and `jitter.minM` (§4.7 S11; `jitter.minM`'s declared range starting above `attractCm`, the refusal stated there), the class-mix table and its prestige rows (§4.7 S10b, §10.2), the cluster rows and tenure defaults (§4.7 S11, §10.2), the quarter identities, significance, power and sector links and band ranges with the dials' weights (§4.5, §10.2), the `concealment` column and the cover table (§10.2, read by §4.7), the underground system rows, `UndercityRule`, `LinkRule` and the basement-access rows (II.7.3–II.7.6), `WorksTable` with its calendar row (§4.11), the light rules `LightRule` (`lights.json`; §4.7, §8.4), the palette's role values on the owner-opened targets (§8.2), the sugar expansion table `sugar.json` (§7.1) and the dossier row sets `tables/dossier/*` (§14) — is versioned
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
  for an emulated default (or its `(code)` form, for a behaviour read in a reference's compiled code, with its P-id,
  §17.1 (6); item 62), otherwise `own`, `architecture ⟨date⟩` or another of its values; a cell that extends the
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
  presets leave the plan rung alone: with no epoch and no `relet` every residential building houses what §4.7's
  generation fill gives it — at least one household and never above its capacity — so the static baseline is
  unchanged. No corpus content enters the design by this rule except the palette bands the owner released on
  2026-09-27 (item 69; §8.2's palette targets), whose role values carry provenance `corpus` with that release as their
  evidence; the corpus phase re-signs every other table value through §13.9.
* **Per-preset values (items 37, 43 and 44; J-A37.71).** A parity preset zeroes a chance or a weight and switches an
  option off (above), which is enough wherever the reference simply lacks our tendency. Where the reference's behaviour
  is a VALUE that differs from our default — a mode, a length, a treatment — the cell carries it:
  `presets?: { MFCG?: CellValue; FTG?: CellValue }`, each entry with its own provenance (`ref:⟨build⟩ ⟨behaviour⟩
  (code)` and its P-id where it was read in code). A parity preset resolves every cell in one order: its own `presets`
  entry; else, for an `extension` cell, 0 for a chance, a weight or a number and off for an option; else the cell's
  default. So a reference-choice row runs the reference's own value under that reference's preset and ours under the
  default. A categorical `option` cell has no neutral value, so the table schema refuses one without an entry for each
  parity preset. Rows carried this way: `cut.bendMode` and `cut.flattenM` (§4.6 step 5 — the `MFCG` preset's
  `straightFirst` and its 8 m; the `FTG` preset reads the default); `jitter.maxM` and `jitter.minM` (§4.7 S11 — the
  `MFCG` preset's 4.8 m and 2 m; the `FTG` preset reads 0, no recession, since no front-recession fact of the FTG
  client has been read, J-A43.71); the compound enclosure (§4.7 S11 — `extension: { over: 'both' }`, its parity value
  stated there and read by both presets; no third preset is added for NG 1.2.2, whose comparison of §13.6 compares
  fabric, J-A44.71); and the light rows (§4.7 and §8.4 state which carry a `presets` value). §13.5's parity rows run
  under this resolution (T23-1).
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
=== REPLACE ### 7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15) ===
### 7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15)

* **The control registry** declares for every control its output metric (e.g. `density` → buildings per ha;
  `wealthLevel` → median plot area and greenery share; `greenery` → private green share), its range, its **consuming
  stage** (the earliest stage that reads it), its **locality class** — *local* (consumed at S10 or later, or spatially
  scoped: Adjust is local) or *re-derive from Sk* (the action shows the fate report first, §7.1) — its **continuity
  class** (*continuous* or *discrete*, with a discrete control's levels) and a **documentation anchor** that the app
  links from the control as context help. The same registry fields (label, range, unit, output metric, consuming stage,
  locality class, continuity class, anchor) generate `@plat/docs`' reference pages.
* **Layer controls (II.6, II.7; items 13, 14, 15).** *Islands:* at TOWN and at every village rung the control is disabled
  with the reason "islands only at CITY and METROPOLIS (II.6)"; at CITY and METROPOLIS it is the model feature
  `recipe.layers.islands` (off / on; consuming stage S7b; locality *re-derive from S7b*; discrete), and the sky layer's
  visibility is a separate view control (`LayerSpec.visible`, §8.4; no model effect) — the view toggle shows the islands
  a settlement has and never creates one. *Sewers:* one control with two meanings by rung — at TOWN a model feature (auto
  / on / off; consuming stage S0; locality *re-derive from the network stage*, confined to the underground arena;
  discrete), at CITY and METROPOLIS a view control (the underground layer's `LayerSpec.visible`; no model effect) — the
  layer hidden by default at every rung (II.7.1). Both rows carry their locality class and anchor in the registry and sit
  in the advanced panel, outside the basic panel's count below. `elaborate` (item 28) is no control: it is per-viewer
  view state (§2.9) that decides when a pure rung is derived, never what.
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
  test); new templates and presets are data, not code; release notes name known defects. The authoring toolkit's
  T1 `intend` (§7.1, item 101) is this panel, not a thirteenth control: its site cards are the water setting and side,
  each card carrying a form of the forms catalogue and an era-and-region preset (§7.7), its size the size rung, its two
  sliders the wealth level and the walls (item 101 (g)), its style the style preset — so the toolkit adds no basic
  control, and every slider keeps its sweep below (J-A101.77).
* **Light controls (item 68; J-A68.71).** The day and night switch (`light`), the sun's mode and height (`sunMode`,
  `sunHeight`) and the underground hand lantern (`handLantern`) are per-viewer view keys (§2.9), set from the view bar
  beside the layer toggles: view controls with no model effect, never logged and in no digest, outside the basic panel's
  count as a layer's visibility is (§8.4). Each has its registry row — label, range, documentation anchor, continuity
  class (`sunHeight` continuous, the others discrete) — and its default is §8.4's; the pointer that moves the cursor sun
  is a transient input, never a key (§6.2).
=== J-ROWS ===
| J-A51.51 | the three references' whole-map retries named by build (MFCG 12710731 all nine stages on its one stream; the failed seed's next generator state for VG 1.6.9; NG 1.2.2 seed + 1); no restart path kept, every retry a rung of the failing batch's ladder | §5.1 |
| J-A52.61 | the session-history independence test (20 seeds, fresh process against after 50 maps and every view toggle and zoom stop) stated in §6.5 (9) as a determinism test, its motive the references' mechanisms only; §13.3 points to it | §6.5 |
| J-A41.61 | the stream registry appends `cut.stop` with the next u16 id and retires `cut.side` and `cut.farSideAlt` as reserved ids with no reader, over deleting them and inserting `cut.stop` after `cut.t` | §6.1 |
| J-A67.61 | a Works' duration drawn inside its `WorksTable` row's range on an appended concern `works`, keyed by its target's lineage with the start week as creation index | §6.1 |
| J-A68.61 | the light sources placed on an appended geometry concern `pin.light`, keyed by the host's lineage with the rule row as creation index; a light's flicker never a stream, a pure function of its render key and the view's time | §6.1 |
| J-A68.62 | the CPU reference light pass inside the determinism lint's allowlist closure and byte-identical across the five engines; the GPU pass held to it by §13.4's tolerance, outside the lint | §6.5 |
| J-A72.61 | a district's character vector and band range derived, recomputed on load and never hashed; its `identity`, `pressure` and `nameHistory` model data in the digest, written only by generation and epochs | §6.2 |
| J-A72.62 | a fifth naming draw case: at an epoch, a district whose identity row changed re-draws its unprotected name on its `naming` stream with the epoch component, the old name to `nameHistory`, reported and stored in the event without a confirmation | §6.3 |
| J-A37.71 | per-preset values: a cell may carry `presets: { MFCG?; FTG? }`; a parity preset reads its own entry, else zero or off for an `extension` cell, else the default; a categorical option cell must carry both entries | §7.6 |
| J-A43.71 | under the `FTG` parity preset the front recession is 0 (no FTG front-recession fact read); the `MFCG` preset reads 4.8 m and 2 m | §7.6 |
| J-A44.71 | the compound enclosure an `extension` with `over: 'both'`, read by both parity presets; no third parity preset is added for NG | §7.6 |
| J-A66.71 | the closure rule general and homed in §7.3 item 9: an edit with missing prerequisites expanded at dry run by registry-declared generators into one event and one transaction, its closure record stored, undo exact, a later deletion removing only unshared created pieces, never a dossier fact | §7.3 |
| J-A65.71 | the underground layer's other systems edited with the tunnel events on their own parts — galleries by `drawTunnel` with a `system`, chambers by `drawChamber`, links by `addLink` — one event kind per thing | §7.1 |
| J-A67.71 | a Works edited by `startWorks`, `cancelWorks` and `setAttr` on its record; its stage at a week derived and never set; the Works report entries at start, cancellation and finish only | §7.1, §5.4 |
| J-A68.72 | a hand-placed light a declared `LightSource` record (`placeLight`, re-hosted like an access point's opening), surviving regeneration by its host anchor; derived lights have no edit kind | §7.1, §7.4 |
| J-A68.71 | the day and night switch, the sun's mode and height and the hand lantern are view controls on the view bar, outside the basic panel's twelve | §7.8 |
| J-A76.72 | an older `epoch` event without a week takes its predecessor's week plus its own `years` × 52 at load | §7.5 |
| J-A101.71 | authoring is declare-then-derive over the existing events, in twelve tools and five layers; declared means held — every declared entity pinned by its declaring event, a declaration refused only against a dossier fact or a lock, otherwise bent to the nearest lawful one and named | §7.1, §7.2 |
| J-A101.72 | the four sugar events logged as themselves (one undo step, one fate report) and expanded at fold by the versioned `sugar.json`; an upgrade re-expands under its version and lists the changed ones once | §7.1, §7.5 |
| J-A101.73 | a points form's shape derived at the dry run by the operator that builds that class and stored resolved in the event, never re-derived; handles are new declarations of the same kind; the surface snap escapable, the kernel's attraction never | §7.1 |
| J-A101.74 | a clerk's accepted proposal logged with `EditBase.proposedBy: 'clerk'`, the user its author | §7.1 |
| J-A101.75 | every re-roll scoped; a derived fill's three variations are its scope's next three rerolls on the dry-run overlay, the accepted one committed as that `regenerate` | §7.3 |
| J-A101.76 | a declared way of a class above lane across an enceinte (a `placeGate` stub or a declared road) makes a gate by S7's operator; a lane across a strip stays refused | §7.3 |
| J-A101.77 | T1 `intend` is the basic panel itself (site cards with a form and an era preset, the size rung, the wealth and walls sliders, the style preset); the toolkit adds no basic control | §7.8 |
=== RATIONALE-A ===
| J-A51.51 | Chose to keep the design's rule — the unit of failure is one batch, retried only as a rung of its own ladder on its own keyed stream, with no restart path (D-9) — and to correct the citations of what it removes to the three references' own whole-map retries, each with its build (MFCG 12710731 re-runs all nine of its stages when a polygon cannot be cut and continues its one stream; VG 1.6.9 retries a failed build on the failed seed's next generator state, a deterministic step and not the "silent seed swap" the design had said; NG 1.2.2 regenerates the whole map at seed + 1 on any exception), over leaving the old wording, because the old sentence misdescribed VG's retry, omitted NG's and carried a reference source file and line that gate (c) forbids in the design. Provenance note (not a design sentence): MFCG 12710731's per-cell seeds, which keep each ward's geometry on its own seed, are prior art for our keyed sub-streams; ours key every entity and never restart (§5.1; item 51; CONFIRMED on the code readings, critic R-V1, P1). |
| J-A52.61 | Chose to state the session-history independence test — for 20 seeds a map's model digest generated first in a fresh process equals its digest when generated after 50 other maps and after every view toggle and zoom stop — in §6.5 (9) among the determinism tests, with §13.3 pointing to it, over adding it to §13.3 as the item wrote, because the canon makes §6.5 the home of the determinism tests and §13 their scheduler; and chose to give as its motive only the references' read mechanisms (the next map's seed taken from the renderer's leftover stream state in MFCG 12710731, VG 1.6.9 and NG 1.2.2, per-session tree-tile caches, Dwellings' clock rewind, Fantasy Manor's load-time seed) and not the claim that their maps visibly differ, which is held for Fable's retrovalidation as PLAUSIBLE; ours is immune by construction and the test keeps it so (§6.5; item 52). |
| J-A41.61 | Chose to append the new stop-test concern `cut.stop` with the next u16 id and to mark `cut.side` and `cut.farSideAlt` retired — reserved ids with no reader, never reused — over deleting the two and inserting `cut.stop` after `cut.t` as the item's text says, because concern ids are append-only and never renumbered (D-15) and an append keeps every other stream key unchanged; with no build yet both forms are output-neutral, so no golden shift is declared, and the append form keeps D-15 literal (§6.1; items 34, 36, 37, 41). |
| J-A67.61 | Chose to draw a Works' duration inside its `WorksTable` row's range (a small timber house 2–6 weeks, a stone house 4–12 months) on a new concern `works`, keyed by the target's lineage with the start week as the creation index, over table-exact durations, because the owner's words give ranges ("two weeks or a month") and a fixed duration per row would make every house of a class finish in step, while the keyed draw keeps the same history giving the same weeks on every host and never disturbs another concern's draws (§6.1; item 67). |
| J-A68.61 | Chose one appended geometry concern `pin.light` for the placement of light sources, keyed by the host's lineage with the light rule row as the creation index, over drawing lights on `pin.decor` or on the host's site-plan stream, because a light added or re-tuned must never move a tree, a pin or a footprint (streams are never shared across concerns); and chose to make flicker a pure function of the light's render key and the view's time rather than a stream, so an animated night view changes no model and no digest (§6.1; item 68). |
| J-A68.62 | Chose to put the CPU reference light pass — the one that feeds exports, stills, goldens and tests — inside §6.5 (3)'s allowlist closure, its transcendentals through `dmath`, and to require its output byte-identical on the five engines, while the GPU pass for the moving cursor sun is held to it by §13.4's tolerance and stays outside the lint, over treating the whole light pass as pixels compared only by visual regression, because the item asks that lighting be identical for the same model, lights and view, which only a bit-exact reference can prove, and a GPU cannot be bit-exact across drivers (§6.5; item 68, ruling 7). |
| J-A72.61 | Chose to treat a district's character vector and band range as derived — pure functions of committed state, recomputed on load and never hashed — and its `identity`, `pressure` and `nameHistory` as model data in the digest, written only by generation and epochs, over hashing all five or deriving all five, because the vector and range can always be recomputed from the lots and the slices, while the identity depends on the epochs it lived through (the hysteresis's dwell), the pressure is a retained accumulation and the name history a record of renames, none of which the present state alone reproduces (§6.2; item 72, ruling 7). |
| J-A72.62 | Chose a fifth naming draw case — at an epoch, a district whose identity row changed re-draws its unprotected name on its own `naming` stream with the renaming epoch's component, the old name kept in `nameHistory`, the rename reported and stored in the epoch event without a confirmation — over renaming at any generation or edit that changes a district's features, and over asking the user to confirm an epoch's rename, because §6.3's rule that a feature change renames nothing must stay true for generation and edits (names follow their address), the identity's hysteresis already filters flicker, and an epoch is the history's own step — a host's or the engine's — with no user at its dry run; a protected name (set, locked, assigned or claimed by the dossier) is never re-drawn (§6.3; item 72, ruling 4). |
| J-A37.71 | Chose per-preset values in the table cell — `presets: { MFCG?; FTG? }`, each entry with its provenance — and one resolution order for a parity preset (its own entry, else 0 or off for an `extension` cell, else the default), with the table schema refusing a categorical option cell that lacks an entry for each preset, over a separate preset table or over zeroing only, because zeroing turns off a tendency the reference lacks but cannot express a reference whose behaviour is a different VALUE (MFCG 12710731's straight-first cut and its 8 m flatten height, its 4.8 m and 2 m front recession, a fence where we draw a wall), and keeping the value beside the default in the same cell keeps one source for each rule (§7.6; items 37, 43, 44; J-A23.71 extended, not replaced). |
| J-A43.71 | Chose to let the `FTG` parity preset read a front recession of 0 — the unmarked resolution of an `extension` number — while the `MFCG` preset reads MFCG 12710731's 4.8 m and 2 m, over giving the FTG preset MFCG's values as the plots seat suggested as a default, because no front-recession fact of the FTG client has been read (P9 names MFCG 12710731 and NG 1.2.2 only), so MFCG's values would assert a behaviour FTG was never shown to have, while 0 simply switches our extension off as J-A23.71 does for every tendency a reference lacks (§7.6; item 43). |
| J-A44.71 | Chose `extension: { over: 'both' }` for the compound enclosure, read by both existing parity presets through its per-preset value, over adding an NG parity preset to switch it off, because neither MFCG 12710731 nor the FTG client draws an enclosure wall, the design's parity presets are exactly those two, and §13.6's comparison with NG 1.2.2 compares fabric, not boundary treatments — a third preset would be new scope for §13.6 with nothing to test (§7.6; item 44). |
| J-A66.71 | Chose a general closure rule homed in §7.3 — an edit whose target lacks prerequisites is expanded at its dry run, by generators the entity registry declares per edit kind, into the minimal pieces in dependency order, applied as one event and one transaction, its closure record stored, its undo removing exactly the created pieces, a later deletion removing only the created pieces nothing else uses, a created basement returning to its derived state unless edited, and never touching a dossier fact — over a rule stated only for the underground access in II.7, because the owner's words ("it generates all the necessary pieces") describe what an edit must do to stay lawful, which is §7's subject, and the same rule already serves a front's missing concealed door and an undercity's missing lifeline; the underground pieces themselves stay II.7.6's (§7.3 item 9; item 66). |
| J-A65.71 | Chose to edit the underground layer's other systems with the tunnel family of events — a gallery as `drawTunnel` naming its system, a chamber as `drawChamber`, a link as `addLink`, each in its own system's part — over one generic "draw underground element" event, because the item's rule is one event kind per thing, galleries are chains exactly as tunnels are while chambers are closed outlines and links join two parts, and reusing `drawTunnel` for galleries keeps the sewer's editing unchanged (§7.1; item 65). |
| J-A67.71 | Chose to edit a Works through `startWorks`, `cancelWorks` and `setAttr` on its record (its start week, its duration within the row), with its stage at any week derived and never set, and to report only a Works' start, cancellation and finish, over storing or editing stages or reporting every stage change, because the owner's weekly clock shows stages as a function of the week (so scrubbing costs nothing and changes no digest), and a report entry per stage would flood the host's account with changes the week already implies (§7.1, §5.4; item 67). |
| J-A68.72 | Chose to make a hand-placed light a declared `LightSource` record — `placeLight`, moved by `setAttr` on its point and re-hosted like an access point's opening, deleted by `delete` — that survives regeneration by its anchor (its host's address, rule row and ordinal) and follows its host's lifecycle, while derived lights (lit windows, the plan rung's room lights) have no edit kind, over making every light an editable record, because windows and room lights are functions of occupancy and the view's hour and would otherwise need endless re-syncing (§7.1, §7.4; item 68, ruling 5). |
| J-A68.71 | Chose to place the day and night switch, the sun's mode and height and the underground hand lantern on the view bar as view controls — per-viewer keys, never logged, in no digest, outside the basic panel's count like a layer's visibility — over adding a thirteenth basic-panel control, because the basic panel is held to twelve (R15) and these change only what one viewer sees, never the town (§7.8; item 68). |
| J-A76.72 | Chose to give an older `epoch` event without a week the week its predecessor's week plus its own `years` × 52 implies (the first from week 0), over leaving it weekless, because every Works stage and the cadence read an absolute week and a weekless epoch would leave them undefined; no such document exists yet, so the transform only keeps the schema chain total (§7.5; item 76). |
| J-A101.71 | Chose declare-then-derive over the events the editor already has — twelve tools in five layers of commitment, every tool a set of existing events or sugar over them, each with one dry run, one fate report, one commit and one undo — and declared means held (every entity a declaration made or placed pinned by its declaring event; a declaration refused only against a dossier fact or a lock, every other infeasible one bent by its dry run to the nearest lawful one and named), over a separate authoring model or locks the user must remember, because the owner asked for one elegant set of tools for the user and the clerk to build or emulate a city, the UX survey's strongest finding is that deriving must be visible, previewed and cheap to override, and re-rolls that destroy hand work are the most-cited failure of comparable tools (§7.1, §7.2; item 101, rulings 1 and 6's placement in §7). |
| J-A101.72 | Chose to log the sugar events (`placeGate`, `quarter`, `roster`, `group`) as themselves — one undo step, one fate report — expanded at their fold by a versioned expansion table (`sugar.json`) at the version the event records, over logging only their expansion, because the user made one gesture and must undo it as one, while the recorded version makes a replay expand exactly as the session did and lets an upgrade re-expand under its own version and list the difference once (§7.1, §7.5; item 101, ruling 3). |
| J-A101.73 | Chose to derive a points form's shape at the dry run with the operator that builds that class (the grower for a quarter, S1's water operator for a lake or river, S5a's trace for a wall, S4's router for a road, S10b and S11 for a place) and store it resolved in the event, as `EditScope` is, over re-deriving it at every replay, because a replay must never move an accepted shape (the owner: edit the boundaries after generation) and a stored result is independent of later code changes; its handles are new declarations of the same kind, and the surface's feature snap is escapable while the kernel's 26 cm attraction never is, so no text promises a placement below the kernel's tolerance (§7.1; item 101 (i), ruling 5). |
| J-A101.74 | Chose `EditBase.proposedBy: 'clerk'` on an accepted clerk proposal, the user remaining its author, over a clerk author kind, because the user decides and undoes it like any of their edits, while the exports can still say what the clerk proposed, as R19 asks (§7.1; item 101, ruling 4). |
| J-A101.75 | Chose to make every re-roll scoped (a block, a quarter, a rung, a rerollable layer), an unscoped new town only the empty state's action, and to derive a fill's three variations as its scope's next three rerolls on the dry-run overlay, the accepted one committed as that `regenerate`, over a variations tray with its own random stream, because the reroll counter already gives each scope its alternatives deterministically and replayably, and nothing uncommitted leaves a trace (§7.3 item 10, §6.1; item 101 R5). |
| J-A101.76 | Chose to let a declared way of a class above lane that crosses an enceinte — a `placeGate`'s stub or a road the author draws through the wall — make a gate there through S7's operator, while a lane across a wall strip stays refused, over refusing every declared crossing, because the owner's toolkit says gates arise where declared roads cross the wall and a walled town's roads enter only through gates (§5.3), whereas a lane through a wall is the failure NF-P5 exists to stop (§7.3; item 101). |
| J-A101.77 | Chose to make T1 `intend` the basic panel itself — its site cards the water setting and side, each carrying a form and an era-and-region preset, its size the size rung, its two sliders the wealth level and the walls, its style the style preset — over adding intent controls, because the toolkit's intent layer and the basic panel ask the same questions and R15 caps the panel at twelve controls (§7.8; item 101 (g)). |
=== END ===
