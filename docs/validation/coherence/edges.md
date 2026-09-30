# Edge catalogue — every mechanism at its limits, and the cross-unit combinations (principle (11))

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/canon; covered by the whole-design retrovalidation (J84).

Machine twin: `edges.json` (`mechanisms`, `edges`, `combinations`, `named_combinations`, `general_rules`, `method`).

**Method.** Mechanisms are the subsections of each unit's mechanism chapters (base §2–§11, PART II, PART III, with §4's stage blocks split at their bold stage leads; a volume's §2–§5 subsections). An edge class applies where the mechanism's text uses its vocabulary three times or more; the edge is DEFINED where a sentence of the mechanism's own text states the case (quoted as evidence), UNTESTED where it is defined but no test id appears in the text or cites the section, UNDEFINED otherwise. Inventory-reported edges (edges_observed, edge_gaps, undefined_edges, undefined-edge conflicts) are listed as UNDEFINED entries EI-…. Combinations: every pair of features from different units that can meet on one map (rungs intersect; layers meet directly, through accesses, basements, foundations, shade or landfall; or a time, dossier, edit, view, export, clerk, content or preset feature over a physical one); DEFINED where one sentence of either unit (or the outcome's owner) names both, else UNDEFINED, routed to the owner (the later-built unit for two physical features; the time, dossier, edit, view, export, clerk, content or preset unit otherwise). The evidence is a scan: a verifier confirms each quoted sentence states the outcome, its failure rung and its test.

**Edge classes.** E1 no input; E2 exactly one item; E3 the maximum and its caps; E4 degenerate geometry; E5 missing, empty or contradictory data (the dossier included); E6 every rung from THORP to the METROPOLIS cap; E7 every toggle and preset; E8 save, load, undo, redo, regenerate and migrate. **An UNDEFINED edge is a MAJOR finding to close (a BLOCKER where its outcome would be a crash, a hang, lost data, a silent wrong result or a whole-map retry); an UNTESTED one needs its test.** Each owner writes the outcome, the failure rung (§5's ladder: check, repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and the test.

**General rule for E4-degenerate (E-GEN-1).** General rule (to be stated once at §5.1 by the determinism editor if absent): every stage commits geometry through kernel transactions; a degenerate result is refused by the kernel (§3.1: E_DEGENERATE, E_BELOW_MIN_EDGE, E_NON_SIMPLE …) and handled by the stage's failure class (§5.2, or the volume's own F-class) on its ladder, never a whole-map retry. A mechanism with no local statement is DEFINED by that rule once its stage's failure class is named in its text.

## Summary by unit

| unit | mechanisms | edges | DEFINED | UNTESTED | UNDEFINED | combinations owned (UNDEFINED) |
|---|---|---|---|---|---|---|
| model | 9 | 19 | 15 | 1 | 3 | 3 |
| kernel | 10 | 75 | 37 | 15 | 23 | 0 |
| pipeline | 35 | 210 | 137 | 30 | 43 | 39 |
| determinism | 17 | 132 | 95 | 4 | 33 | 39 |
| rendering | 21 | 134 | 86 | 11 | 37 | 38 |
| scope | 9 | 60 | 52 | 0 | 8 | 0 |
| V01 | 89 | 287 | 55 | 99 | 133 | 15 |
| V02 | 35 | 159 | 91 | 21 | 47 | 28 |
| V03 | 28 | 105 | 50 | 26 | 29 | 6 |
| V04 | 33 | 152 | 38 | 62 | 52 | 62 |
| V05 | 40 | 169 | 61 | 48 | 60 | 31 |
| V06 | 39 | 179 | 67 | 64 | 48 | 42 |
| V07 | 37 | 173 | 91 | 44 | 38 | 0 |
| V08 | 36 | 147 | 86 | 20 | 41 | 62 |
| V09 | 71 | 261 | 100 | 67 | 94 | 25 |
| V10 | 48 | 158 | 93 | 14 | 51 | 8 |
| V11 | 36 | 151 | 87 | 12 | 52 | 21 |
| V12 | 39 | 135 | 84 | 11 | 40 | 17 |

## The combinations the owner named

* **a settlement that grows over a sealed void** (V06, V04; owner V06) — DEFINED (to confirm: outcome, rung, test): canon reading: "V06 §3.11.6 and §3.5.2 (passages sealed by decline and reopened by regrowth); V04 §0/§3.5.7 (a house built over a void may dig down into it; a new sewer or a growing catacomb may cut through it); g item 113 (d)–(e) (sewers reopen; LOST until refound)"
* **a catacomb growing into a sewer** (V04, pipeline; owner V04) — DEFINED (to confirm: the typed opening, rung, test): canon reading: "V04 §0 l.195: 'A catacomb may break into a sewer, a quarry into a cave; each meeting is a typed opening' — V04 §3.5.1's growth and U-LINK's breach link state the mechanism; II.7.6 carries the base's link kinds"
* **a raised way under an island's shade** (V05, model, pipeline; owner V05) — DEFINED (to confirm): canon reading: "V05 §1b / §3.15 (7): sky.clearance and reclearIsland read every caster an epoch commits under an island (EpochScope.raised); file f item 290: raised ways and retaining walls are casters of item 102's daylight driver; the island's groundRefCm counts the caster…"
* **a raised way over a harbour mouth** (pipeline, model, V04; owner pipeline) — UNDEFINED: canon reading: "no text states whether a generated raised way may cross a harbour mouth, its chain (item 106) or a mole; the owner (the raised-way generation, §4.3 with file f items 244 and 290) states the outcome (the route solver's cost row or an exclusion), its rung and a…"
* **a deck plot on a bridge over a moat** (pipeline, model; owner pipeline) — DEFINED (to confirm realism): canon reading: "file f item 246: a Bridge of kind ford or draw, or with no deckCm, offers no deck plot — a drawbridge over a moat carries none; a fixed moat bridge with a deck offers them by the deck rows (V11 deck, deckOk); the pipeline editor confirms or narrows it for gat…"
* **a retaining wall on a cliff edge** (model, pipeline; owner pipeline) — UNDEFINED: canon reading: "no text states the outcome where S10/S11's levelling or a district edge would raise a retaining wall along a cliff line (a closure barrier of kind cliff, item 106): the pipeline editor states it (the cliff face holds the ground; no wall is raised on a cliff e…"
* **a dossier removing what an edit pinned** (V08, determinism; owner determinism) — DEFINED (to confirm): canon reading: "§7.7's precedence (the dossier is the sole immutable truth, items 20, 22) and its dossier contract items 1–5: a dossier event removes the institution; the user's pin on its place yields (the pin is reported as orphaned, §7.4); V08 §3.6 applies the removal"
* **an epoch undone after a save** (V06, determinism; owner V06) — DEFINED (to confirm): canon reading: "V06 §0 ('survives saving and reloading), undo while it is the latest thing that happened, or branch from') and V06 §4's undo of an epoch as one event; §7.4's epoch row"

## UNDEFINED and UNTESTED edges, by unit (the defined ones are in edges.json with their evidence)

### model

* M-model-943-E5-data — UNDEFINED — §2.4 *2.4 Ways (the skeleton) and typed edges* — missing, empty or contradictory data (the dossier included)
* M-model-943-E8-lifecycle — UNTESTED — §2.4 *2.4 Ways (the skeleton) and typed edges* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table §7.4 (confirm this section's records have their rows)"
* EI-MC-05 — UNDEFINED (inventory MC-05) — ['§2.5 ContextVector.arena', '§2.5 Allocation.target (sky pseudo-district)', '§… — ContextVector.arena is 'ground'¦'underground' only, yet plots exist on sky islands (sky pseudo-districts receive allocations, II.6; the island is handed to the unit run, II.1) — the arena value a sky plot's context vector takes, and so which arena-specific granularity and designation rows it reads, is undefined.
* EI-MC-09 — UNDEFINED (inventory MC-09) — ['§2.6 Building.households (clamped into [1, capacity] for a residential buildi… — A residential building is clamped into [1, capacity] and "every residential building houses ... at least one household", while capacity is 0 for a building S11 builds for a slot without houses (BuildingSlot.unhoused reads as such) and floor(Σ A(s)·(den−num)/(2·den·minRoomCm2)) can be 0 for a very small residential shell; the clamp interval [1, 0] and the at-least-one guarantee then conflict, and …

### kernel

* M-kernel-2460-E1-none — UNTESTED — §3.1 *3.1 Build-versus-adopt, per primitive* — no input / nothing to act on; defined by: "J-K5, J-A21.31) ¦ none adopted: no permissive, mature JS/TS skeleton that could be held to §3.8's numeric contract is known to this design;"
* M-kernel-2460-E2-one — UNTESTED — §3.1 *3.1 Build-versus-adopt, per primitive* — exactly one item; defined by: "LIR sampled deterministically over four candidate axes — OBB long axis, frontage normal, ± 45° (G-R13) ¦ — ¦ **one contract (GEO-7):** fewer than 3 d…"
* M-kernel-2460-E3-cap — UNDEFINED — §3.1 *3.1 Build-versus-adopt, per primitive* — the maximum and its caps
* M-kernel-2460-E4-degenerate — UNTESTED — §3.1 *3.1 Build-versus-adopt, per primitive* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); defined by: "primitive ¦ decision ¦ candidate (licence) ¦ degenerate input; where specified ¦ ¦---¦---¦---¦---¦"
* M-kernel-2460-E5-data — UNDEFINED — §3.1 *3.1 Build-versus-adopt, per primitive* — missing, empty or contradictory data (the dossier included)
* M-kernel-2460-E8-lifecycle — UNDEFINED — §3.1 *3.1 Build-versus-adopt, per primitive* — save, load, undo, redo, regenerate and migrate
* M-kernel-2618-E4-degenerate — UNDEFINED — §3.3 *3.3 The transaction protocol — batches, one level each, canonical ord…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0563, SCOPE-0203, SCOPE-0218, SCOPE-0221
* M-kernel-2916-E6-rungs — UNDEFINED — §3.4 *3.4 Kernel operations the pipeline needs (complete list)* — every rung from THORP to the METROPOLIS cap; tests seen: SCOPE-0210, T65-6
* M-kernel-2916-E7-toggles — UNDEFINED — §3.4 *3.4 Kernel operations the pipeline needs (complete list)* — every toggle and preset (parity presets, every layer on and off); tests seen: SCOPE-0210, T65-6
* M-kernel-3163-E1-none — UNTESTED — §3.5 *3.5 Why this kernel closes the creators' failure classes* — no input / nothing to act on; defined by: "the NG 1.2.2 build's silent rotated-frame retries and its hole-aware bisector's two logged loops (a balance retry, up to 20 in random frames, then ac…"
* M-kernel-3163-E2-one — UNTESTED — §3.5 *3.5 Why this kernel closes the creators' failure classes* — exactly one item; defined by: "null OBB / `rect` crash (61026228) ¦ one OBB contract (§3.1);"
* M-kernel-3163-E3-cap — UNTESTED — §3.5 *3.5 Why this kernel closes the creators' failure classes* — the maximum and its caps; defined by: "silent no-op of the 2017 cut routine whenever a cut did not make exactly two crossings, and its unbounded recursion (`os-model.md` §13.4) ¦ `E_NOT_TW…"
* M-kernel-3163-E4-degenerate — UNTESTED — §3.5 *3.5 Why this kernel closes the creators' failure classes* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); defined by: ""two intersections with the same world position" (FTG 153121107) ¦ exactly one vertex per lattice point; points within `attractCm` (26 cm) of a verte…"
* M-kernel-3163-E6-rungs — UNTESTED — §3.5 *3.5 Why this kernel closes the creators' failure classes* — every rung from THORP to the METROPOLIS cap; defined by: "P7) ¦ the bent cut's declared ladder (§4.6 step 8), each rung under an operation-count work limit (§3.3): its first rung re-plans in a turned frame a…"
* M-kernel-3163-E8-lifecycle — UNDEFINED — §3.5 *3.5 Why this kernel closes the creators' failure classes* — save, load, undo, redo, regenerate and migrate
* M-kernel-3181-E1-none — UNTESTED — §3.6 *3.6 Insertion, contact and move semantics — attraction instead of a w…* — no input / nothing to act on; defined by: "Nothing finer is a candidate."
* M-kernel-3181-E2-one — UNTESTED — §3.6 *3.6 Insertion, contact and move semantics — attraction instead of a w…* — exactly one item; defined by: "Consecutive points closer than `minEdge` are decimated — the later one is dropped unless its index is in `opts.pinned` or it is a knot (§3.4); two su…"
* M-kernel-3181-E3-cap — UNTESTED — §3.6 *3.6 Insertion, contact and move semantics — attraction instead of a w…* — the maximum and its caps; defined by: "Either way the chain moves at most `minEdge / (2 tan(θ/2))` for a corner of angle θ: 0.47 m at the 30° junction floor, 1.2 m at the 12° plot floor."
* M-kernel-3181-E4-degenerate — UNTESTED — §3.6 *3.6 Insertion, contact and move semantics — attraction instead of a w…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); defined by: "Consecutive points closer than `minEdge` are decimated — the later one is dropped unless its index is in `opts.pinned` or it is a knot (§3.4); two su…"
* M-kernel-3181-E5-data — UNTESTED — §3.6 *3.6 Insertion, contact and move semantics — attraction instead of a w…* — missing, empty or contradictory data (the dossier included); defined by: "Otherwise, within `attractCm` of an existing edge (the nearest; ties by the edges' canonical keys, §3.3), take the exact foot of the vertex on that e…"
* M-kernel-3181-E6-rungs — UNDEFINED — §3.6 *3.6 Insertion, contact and move semantics — attraction instead of a w…* — every rung from THORP to the METROPOLIS cap
* M-kernel-3181-E7-toggles — UNTESTED — §3.6 *3.6 Insertion, contact and move semantics — attraction instead of a w…* — every toggle and preset (parity presets, every layer on and off); defined by: "Example: a vertex at (20, 20) beside the edge (0, 0)–(1 000, 0) is 28.3 cm from (0, 0), so not vertex-attracted, and 20 cm from the edge; its foot (2…"
* M-kernel-3181-E8-lifecycle — UNTESTED — §3.6 *3.6 Insertion, contact and move semantics — attraction instead of a w…* — save, load, undo, redo, regenerate and migrate; defined by: "The commit record lists the (b′) vertices in `unflagged`, and the edit's undo record restores their flags (§3.3, §7.4)."
* M-kernel-3403-E6-rungs — UNDEFINED — §3.7 *3.7 One geometry engine on every host — booleans, buffers and the ker…* — every rung from THORP to the METROPOLIS cap; tests seen: SCOPE-0221
* M-kernel-3403-E7-toggles — UNDEFINED — §3.7 *3.7 One geometry engine on every host — booleans, buffers and the ker…* — every toggle and preset (parity presets, every layer on and off); tests seen: SCOPE-0221
* M-kernel-3518-E6-rungs — UNDEFINED — §3.8 *3.8 The straight skeleton — numeric contract, validator, downgrades* — every rung from THORP to the METROPOLIS cap; tests seen: SCOPE-0207
* M-kernel-3518-E8-lifecycle — UNDEFINED — §3.8 *3.8 The straight skeleton — numeric contract, validator, downgrades* — save, load, undo, redo, regenerate and migrate; tests seen: SCOPE-0207
* M-kernel-3585-E4-degenerate — UNDEFINED — §3.9 *3.9 Geometry in the document — each arena stored once* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: SCOPE-0207
* M-kernel-3585-E5-data — UNDEFINED — §3.9 *3.9 Geometry in the document — each arena stored once* — missing, empty or contradictory data (the dossier included); tests seen: SCOPE-0207
* M-kernel-3638-E5-data — UNDEFINED — §3.10 *3.10 Kernel invariants — what is checked, when, and at what cost* — missing, empty or contradictory data (the dossier included); tests seen: KERNEL-0295, SCOPE-0203, SCOPE-0207, T28-14
* EI-KERNEL-EDGESOBSERVED-001 — UNDEFINED (inventory KERNEL-EDGESOBSERVED-001) — None — buffer() accepts joins 'miter' and ends 'flat', but §3.7 describes only round joins (2 cm sagitta) and square ends - miter limit and flat-end behaviour undefined.
* EI-KERNEL-EDGESOBSERVED-002 — UNDEFINED (inventory KERNEL-EDGESOBSERVED-002) — None — §3.8 pre-clean 'minimum angle 5 deg': how a sub-5-degree corner (legal on a mandatory chain with W_ACUTE_CORNER) is cleaned, and whether the cleaned ring can change the roof, is not stated.
* EI-KERNEL-EDGESOBSERVED-003 — UNDEFINED (inventory KERNEL-EDGESOBSERVED-003) — None — hexLattice on an empty region, zero spacing or jitter >= spacing/2: outcome not stated.
* EI-KERNEL-EDGESOBSERVED-004 — UNDEFINED (inventory KERNEL-EDGESOBSERVED-004) — None — kerb(F) for an L1 face with no bounding spine (a face bounded only by shore or border): outcome by the formula (F itself) - implicit, no test named.
* EI-KERNEL-EDGESOBSERVED-005 — UNDEFINED (inventory KERNEL-EDGESOBSERVED-005) — None — transientArena with an empty seed list, or tileRings with no rings: outcome not stated.
* EI-KERNEL-EDGESOBSERVED-006 — UNDEFINED (inventory KERNEL-EDGESOBSERVED-006) — None — sampleProfile at a zero-length chain or a single-knot ring: outcome not stated (the §3.10 row requires at least one knot per ring).
* EI-KERNEL-EDGESOBSERVED-007 — UNDEFINED (inventory KERNEL-EDGESOBSERVED-007) — None — Frame growth when the new frame equals the old (population target at the cap already): no-op implied, not stated.
* EI-KERNEL-EDGESOBSERVED-008 — UNDEFINED (inventory KERNEL-EDGESOBSERVED-008) — None — skeleton() with h holes where a hole touches the outer ring at a vertex (allowed for faces): validator check (4) cycle count for touching holes not stated.

### pipeline

* M-pipeline-3689-E4-degenerate — UNDEFINED — §4.1 *4.1 Stage graph, evaluation model, laziness contract, transactions, t…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: DETERMINISM-0231
* M-pipeline-3864-E2-one — UNDEFINED — §4.2 *S0 Blueprint.** `Blueprint = { version, seed, size: { rung: TOWN¦CITY…* — exactly one item; tests seen: RENDERING-0215, SCOPE-0221, SCOPE-0222, SCOPE-0224
* M-pipeline-3864-E6-rungs — UNDEFINED — §4.2 *S0 Blueprint.** `Blueprint = { version, seed, size: { rung: TOWN¦CITY…* — every rung from THORP to the METROPOLIS cap; tests seen: RENDERING-0215, SCOPE-0221, SCOPE-0222, SCOPE-0224
* M-pipeline-4072-E4-degenerate — UNDEFINED — §4.2 *S3 Siting, reservations, the stage-1 boundary and its trace (J-P26).*…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0215, SCOPE-0221, SCOPE-0222, SCOPE-0224
* M-pipeline-4284-E5-data — UNDEFINED — §4.2 *S0's sewer feature (item 14; II.7.1).** `toggles.sewers ∈ { auto, on,…* — missing, empty or contradictory data (the dossier included); tests seen: RENDERING-0215, SCOPE-0221, SCOPE-0222, SCOPE-0224
* M-pipeline-4290-E4-degenerate — UNDEFINED — §4.3 *4.3 S4 Backbone — arterials routed between named destinations, built …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: SCOPE-0798, T77-1
* M-pipeline-4290-E6-rungs — UNDEFINED — §4.3 *4.3 S4 Backbone — arterials routed between named destinations, built …* — every rung from THORP to the METROPOLIS cap; tests seen: SCOPE-0798, T77-1
* M-pipeline-4383-E4-degenerate — UNDEFINED — §4.4 *S5a Stage boundary and enceinte trace.** *Boundary (FTG-5, COV-FTG-D2…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: SCOPE-0481, SCOPE-0482, SCOPE-0798, SCOPE-0804
* M-pipeline-4442-E1-none — UNDEFINED — §4.4 *S5b Main-road step (FTG-4; stages k ≥ 2 and every epoch stage).** The…* — no input / nothing to act on; tests seen: SCOPE-0481, SCOPE-0482, SCOPE-0798, SCOPE-0804
* M-pipeline-4456-E1-none — UNDEFINED — §4.4 *S5c Growth of the secondaries.** Inside the boundary a priority queue…* — no input / nothing to act on; tests seen: SCOPE-0481, SCOPE-0482, SCOPE-0798, SCOPE-0804
* M-pipeline-4498-E4-degenerate — UNDEFINED — §4.4 *S5d Capacity check (FTG-2).** Right after S5c the stage's new coarse …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: SCOPE-0481, SCOPE-0482, SCOPE-0798, SCOPE-0804
* M-pipeline-4677-E4-degenerate — UNDEFINED — §4.5 *S7b Allocation and district claims (after S7; LC-2, FTG-1, FTG-3).** …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0415, SCOPE-0820, SCOPE-0822, T16-1
* M-pipeline-5122-E4-degenerate — UNDEFINED — §4.7 *S9 Corridors (L2).** `corridorUnion(l1Faces)` (§3.7), the single kerb…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: DETERMINISM-0408, KERNEL-0297, RENDERING-0225, SCOPE-0801
* M-pipeline-5130-E1-none — UNDEFINED — §4.7 *S10a Block allocation and field pass 2 (eager, town-wide; LC-2, FTG-1…* — no input / nothing to act on; tests seen: DETERMINISM-0408, KERNEL-0297, RENDERING-0225, SCOPE-0801
* M-pipeline-5130-E2-one — UNDEFINED — §4.7 *S10a Block allocation and field pass 2 (eager, town-wide; LC-2, FTG-1…* — exactly one item; tests seen: DETERMINISM-0408, KERNEL-0297, RENDERING-0225, SCOPE-0801
* M-pipeline-5130-E6-rungs — UNDEFINED — §4.7 *S10a Block allocation and field pass 2 (eager, town-wide; LC-2, FTG-1…* — every rung from THORP to the METROPOLIS cap; tests seen: DETERMINISM-0408, KERNEL-0297, RENDERING-0225, SCOPE-0801
* M-pipeline-5224-E1-none — UNDEFINED — §4.7 *S10b Placement (O7; per district; the allocation honoured) — the one …* — no input / nothing to act on; tests seen: DETERMINISM-0408, KERNEL-0297, RENDERING-0225, SCOPE-0801
* M-pipeline-5224-E4-degenerate — UNDEFINED — §4.7 *S10b Placement (O7; per district; the allocation honoured) — the one …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: DETERMINISM-0408, KERNEL-0297, RENDERING-0225, SCOPE-0801
* M-pipeline-5306-E6-rungs — UNDEFINED — §4.7 *S11 Site plans and footprints (L4; O17; one batch per block) — the de…* — every rung from THORP to the METROPOLIS cap; tests seen: DETERMINISM-0408, KERNEL-0297, RENDERING-0225, SCOPE-0801
* M-pipeline-5713-E4-degenerate — UNDEFINED — §4.8 *4.8 S7 Fortification furniture (per enceinte) · the castle · water fu…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: SCOPE-0804, SCOPE-0823
* M-pipeline-5812-E4-degenerate — UNDEFINED — §4.9 *S12a Hinterland siting (eager, no geometry; after S7b, before S8; O14…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: SCOPE-0542, SCOPE-0548, SCOPE-0803, SCOPE-0812
* M-pipeline-5916-E4-degenerate — UNDEFINED — §4.9 *S12b Greenery (after S11; O19; owner base ruling AM-1) — the rule tab…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: SCOPE-0542, SCOPE-0548, SCOPE-0803, SCOPE-0812
* M-pipeline-5916-E8-lifecycle — UNDEFINED — §4.9 *S12b Greenery (after S11; O19; owner base ruling AM-1) — the rule tab…* — save, load, undo, redo, regenerate and migrate; tests seen: SCOPE-0542, SCOPE-0548, SCOPE-0803, SCOPE-0812
* M-pipeline-5982-E1-none — UNTESTED — §4.10 *4.10 S13 Names and labels · S14 Display list · S15 Simulation* — no input / nothing to act on; defined by: "GEO-29), so the one-click first paint is complete and the same for every viewer without any placement entering the model."
* M-pipeline-5982-E2-one — UNTESTED — §4.10 *4.10 S13 Names and labels · S14 Display list · S15 Simulation* — exactly one item; defined by: "**Names and descriptions from character (items 67, 70 and 72).** Since S13a follows S12c (§4.1), a district's naming and its one-line description rea…"
* M-pipeline-6000-E4-degenerate — UNDEFINED — §4.11 *4.11 Incremental mode, transformations and conversions (the evolution…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0197, SCOPE-0203, SCOPE-0801, SCOPE-0804
* M-pipeline-11467-E4-degenerate — UNDEFINED — §10.2 *10.2 Roster (data-driven, replaceable; sequential and prefix-stable; …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: SCOPE-0551, T16-1, T88-1
* M-pipeline-11467-E8-lifecycle — UNDEFINED — §10.2 *10.2 Roster (data-driven, replaceable; sequential and prefix-stable; …* — save, load, undo, redo, regenerate and migrate; tests seen: SCOPE-0551, T16-1, T88-1
* M-pipeline-11741-E6-rungs — UNDEFINED — §10.3 *10.3 People, households, relations, sub-locations, schedules* — every rung from THORP to the METROPOLIS cap; tests seen: SCOPE-0816
* M-pipeline-11822-E1-none — UNDEFINED — §10.4 *10.4 Names, descriptions and setting packs* — no input / nothing to act on; tests seen: SCOPE-0808
* M-pipeline-11822-E4-degenerate — UNDEFINED — §10.4 *10.4 Names, descriptions and setting packs* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: SCOPE-0808
* M-pipeline-15596-E1-none — UNTESTED — II.7.1 *II.7.1 Existence by tier (item 14): the rung row, the S0 draw, the to…* — no input / nothing to act on; defined by: "Until the two staged stages are built, `Features.sewers` is resolved and reported and the sewer network's arena (part 0) stays empty: the layer's `re…"
* M-pipeline-15596-E2-one — UNTESTED — II.7.1 *II.7.1 Existence by tier (item 14): the rung row, the S0 draw, the to…* — exactly one item; defined by: "**The rung row.** `RungProfile.layers.sewers` (§1.1; one row per rung in `ladder.json`, calibratable like every table, §7.6) states whether the netwo…"
* M-pipeline-15596-E3-cap — UNTESTED — II.7.1 *II.7.1 Existence by tier (item 14): the rung row, the S0 draw, the to…* — the maximum and its caps; defined by: "TOWN ¦ `law` ¦ P(sewers) = clamp(base + populationWeight · (population − 1 500) ÷ 8 500 + wealthWeight · wealthLevel, 0, cap), defaults base 0.05, po…"
* M-pipeline-15596-E5-data — UNTESTED — II.7.1 *II.7.1 Existence by tier (item 14): the rung row, the S0 draw, the to…* — missing, empty or contradictory data (the dossier included); defined by: "TOWN ¦ `law` ¦ P(sewers) = clamp(base + populationWeight · (population − 1 500) ÷ 8 500 + wealthWeight · wealthLevel, 0, cap), defaults base 0.05, po…"
* M-pipeline-15596-E6-rungs — UNTESTED — II.7.1 *II.7.1 Existence by tier (item 14): the rung row, the S0 draw, the to…* — every rung from THORP to the METROPOLIS cap; defined by: "**The rung row.** `RungProfile.layers.sewers` (§1.1; one row per rung in `ladder.json`, calibratable like every table, §7.6) states whether the netwo…"
* M-pipeline-15596-E7-toggles — UNTESTED — II.7.1 *II.7.1 Existence by tier (item 14): the rung row, the S0 draw, the to…* — every toggle and preset (parity presets, every layer on and off); defined by: "`Blueprint.toggles.sewers ∈ { auto, on, off }`; a TOWN's `auto` is resolved by this law from the `blueprint.features` concern (§6.1) before any other…"
* M-pipeline-15596-E8-lifecycle — UNTESTED — II.7.1 *II.7.1 Existence by tier (item 14): the rung row, the S0 draw, the to…* — save, load, undo, redo, regenerate and migrate; defined by: "The resolved value is **`Features.sewers: boolean`**, a derived field of the document, recomputed on every replay from seed and request (§2.9) and li…"
* M-pipeline-15644-E1-none — UNTESTED — II.7.2 *II.7.2 The network stage: the gate, the underground arena's levels, t…* — no input / nothing to act on; defined by: "It runs only when `Features.sewers` is true; otherwise it commits nothing and part 0 stays schema-complete and empty (§2.1); every other part of the …"
* M-pipeline-15644-E2-one — UNTESTED — II.7.2 *II.7.2 The network stage: the gate, the underground arena's levels, t…* — exactly one item; defined by: "L0 — one land face, the rock, bounded by the arena's outer ring (the ground's frame plus its context margin, §3.2 (9)), written before any tunnel as …"
* M-pipeline-15644-E4-degenerate — UNDEFINED — II.7.2 *II.7.2 The network stage: the gate, the underground arena's levels, t…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-pipeline-15644-E5-data — UNTESTED — II.7.2 *II.7.2 The network stage: the gate, the underground arena's levels, t…* — missing, empty or contradictory data (the dossier included); defined by: "It runs only when `Features.sewers` is true; otherwise it commits nothing and part 0 stays schema-complete and empty (§2.1); every other part of the …"
* M-pipeline-15644-E6-rungs — UNDEFINED — II.7.2 *II.7.2 The network stage: the gate, the underground arena's levels, t…* — every rung from THORP to the METROPOLIS cap
* M-pipeline-15644-E7-toggles — UNTESTED — II.7.2 *II.7.2 The network stage: the gate, the underground arena's levels, t…* — every toggle and preset (parity presets, every layer on and off); defined by: "**The declaration is II.6's** (`SewerStrategy`, registered after S11 by declared I/O; rule families `follow-streets`, `drainage-lines`, `mixed`; pres…"
* M-pipeline-15644-E8-lifecycle — UNTESTED — II.7.2 *II.7.2 The network stage: the gate, the underground arena's levels, t…* — save, load, undo, redo, regenerate and migrate; defined by: "**The declaration is II.6's** (`SewerStrategy`, registered after S11 by declared I/O; rule families `follow-streets`, `drainage-lines`, `mixed`; pres…"
* M-pipeline-15698-E1-none — UNTESTED — II.7.3 *II.7.3 The underground neighbourhoods (item 12): the owner's three ru…* — no input / nothing to act on; defined by: "* **U2 — no sewer alleys.** The underground L1 carries `tunnel` chains only; no `way` chain, no `alley` face and no S8 lane exists underground, so no…"
* M-pipeline-15698-E2-one — UNTESTED — II.7.3 *II.7.3 The underground neighbourhoods (item 12): the owner's three ru…* — exactly one item; defined by: "* **U1 — frontage on one tunnel, doors onto it.** Every underground plot's `frontage` rows lie on the kerb (the external wall) of exactly one navigab…"
* M-pipeline-15698-E4-degenerate — UNDEFINED — II.7.3 *II.7.3 The underground neighbourhoods (item 12): the owner's three ru…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-pipeline-15698-E5-data — UNTESTED — II.7.3 *II.7.3 The underground neighbourhoods (item 12): the owner's three ru…* — missing, empty or contradictory data (the dossier included); defined by: "(a) households of the **poorest** band, a share `undergroundShare` of that band's demand (defaults TOWN 0.02, CITY 0.04, METROPOLIS 0.06 — the crowde…"
* M-pipeline-15698-E6-rungs — UNTESTED — II.7.3 *II.7.3 The underground neighbourhoods (item 12): the owner's three ru…* — every rung from THORP to the METROPOLIS cap; defined by: "Nothing stands in a village's way: the village rows carry `never` (PART III)."
* M-pipeline-15698-E7-toggles — UNTESTED — II.7.3 *II.7.3 The underground neighbourhoods (item 12): the owner's three ru…* — every toggle and preset (parity presets, every layer on and off); defined by: "**S7b (6)** — after the sky pseudo-districts (5) and before the districts (1) — creates its `Allocation` when `Features.sewers` is on and the preset …"
* M-pipeline-15698-E8-lifecycle — UNTESTED — II.7.3 *II.7.3 The underground neighbourhoods (item 12): the owner's three ru…* — save, load, undo, redo, regenerate and migrate; defined by: "**The prosperity underground is the ground's field, shifted:** a plot's `ContextVector.prosperity` is the ground raster sampled at the plot's frontag…"
* M-pipeline-15868-E1-none — UNTESTED — II.7.4 *II.7.4 The hook interfaces and the base's part* — no input / nothing to act on; defined by: "`UndergroundRule`'s depth scale, vacancy share, crowding share, arrangement restriction and access row; the undercity's existence row and rule (II.7.…"
* M-pipeline-15868-E4-degenerate — UNDEFINED — II.7.4 *II.7.4 The hook interfaces and the base's part* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-pipeline-15868-E5-data — UNTESTED — II.7.4 *II.7.4 The hook interfaces and the base's part* — missing, empty or contradictory data (the dossier included); defined by: "**The base's part, for the staged row (*Staged by the owner's roadmap*):** `RungProfile.layers.sewers` and `Features.sewers` with S0's draw, and `Fea…"
* M-pipeline-15868-E6-rungs — UNTESTED — II.7.4 *II.7.4 The hook interfaces and the base's part* — every rung from THORP to the METROPOLIS cap; defined by: "**The base's part, for the staged row (*Staged by the owner's roadmap*):** `RungProfile.layers.sewers` and `Features.sewers` with S0's draw, and `Fea…"
* M-pipeline-15868-E7-toggles — UNDEFINED — II.7.4 *II.7.4 The hook interfaces and the base's part* — every toggle and preset (parity presets, every layer on and off)
* M-pipeline-15868-E8-lifecycle — UNDEFINED — II.7.4 *II.7.4 The hook interfaces and the base's part* — save, load, undo, redo, regenerate and migrate
* M-pipeline-15907-E1-none — UNTESTED — II.7.5 *II.7.5 The undercity (item 65): what it requires, existence and the 1…* — no input / nothing to act on; defined by: "Under `law` it exists when (i) the rung admits it (and, at TOWN, its draw comes up), (ii) a void source with capacity for one neighbourhood exists or…"
* M-pipeline-15907-E2-one — UNTESTED — II.7.5 *II.7.5 The undercity (item 65): what it requires, existence and the 1…* — exactly one item; defined by: "It is one to three neighbourhoods at most, each the underside of a real quarter above, peopled by the settlement's own poorest and outlawed, trading …"
* M-pipeline-15907-E3-cap — UNTESTED — II.7.5 *II.7.5 The undercity (item 65): what it requires, existence and the 1…* — the maximum and its caps; defined by: "It is one to three neighbourhoods at most, each the underside of a real quarter above, peopled by the settlement's own poorest and outlawed, trading …"
* M-pipeline-15907-E5-data — UNTESTED — II.7.5 *II.7.5 The undercity (item 65): what it requires, existence and the 1…* — missing, empty or contradictory data (the dossier included); defined by: "`P` the poverty share, the share of households in the `squalid` and `poor` bands (§4.5), and `P_ref` 0.022 the default roster's;"
* M-pipeline-15907-E6-rungs — UNTESTED — II.7.5 *II.7.5 The undercity (item 65): what it requires, existence and the 1…* — every rung from THORP to the METROPOLIS cap; defined by: "J-A65.41).** One rule: an undercity exists in cities and metropolises, and in a large town only where a void source exists — rarely; never below TOWN."
* M-pipeline-15907-E7-toggles — UNTESTED — II.7.5 *II.7.5 The undercity (item 65): what it requires, existence and the 1…* — every toggle and preset (parity presets, every layer on and off); defined by: "At the default roster and the `navigable` preset a city holds one neighbourhood and a metropolis two, a poorer or more disordered one up to the bound…"
* M-pipeline-15907-E8-lifecycle — UNTESTED — II.7.5 *II.7.5 The undercity (item 65): what it requires, existence and the 1…* — save, load, undo, redo, regenerate and migrate; defined by: "Its existence and size draws are on `sewer`, keyed by the settlement's lineage; each neighbourhood's streams derive from its district's lineage, itse…"
* EI-EDGE-PIPE-01 — UNDEFINED (inventory EDGE-PIPE-01) — None — Basement access age term with one growth stage (K = 1): 'age ∈ [0,1] the plot's growth-stage rank (1 for the first stage, 0 for the last)' is undefined when first = last.
* EI-EDGE-PIPE-02 — UNDEFINED (inventory EDGE-PIPE-02) — None — Dug connector: target beyond digReachM but reachable by a route ≤ 2 × digReachM — step (2) limits targets to digReachM, step (3) refuses routes longer than 2 × digReachM; the case where no target is within digReachM goes to step (4). Consistent, but the refusal test for a target within digReachM whose route exceeds 2 × digReachM has no test named.
* EI-EDGE-PIPE-03 — UNDEFINED (inventory EDGE-PIPE-03) — None — S12c on pseudo-districts (hinterland, sky, underground, undercity) — see CF-PIPE-06.
* EI-EDGE-PIPE-04 — UNDEFINED (inventory EDGE-PIPE-04) — None — Catacomb source age with a staged HistoryHint: 'replaced by the staged HistoryHint.ageYears' — whether every source takes the settlement's age or its stage-scaled age is not stated.
* EI-EDGE-PIPE-05 — UNDEFINED (inventory EDGE-PIPE-05) — None — Sewer and undercity light 'fuel by the settlement's circumstances' — which circumstance row selects which fuel rows is not stated.
* EI-EDGE-PIPE-06 — UNDEFINED (inventory EDGE-PIPE-06) — None — Island 'count' as a setAttr/lock target — the record that holds the count (the slots) is not named.
* EI-EDGE-PIPE-07 — UNDEFINED (inventory EDGE-PIPE-07) — None — Ring spacing factor 1 + f is stated as '[1, 2)' but the folded bell reaches 1 when every uniform is 0, so 2 is reachable.
* EI-EDGE-PIPE-08 — UNDEFINED (inventory EDGE-PIPE-08) — None — Underground institution depth 8–15 m is stated as a value while the granularity 'institution / assigned' row gives depth 'by requirement' — the depthScale rule cannot produce it.

### determinism

* M-determinism-6803-E4-degenerate — UNDEFINED — §5.1 *5.1 Principles and the seven tiers (G-P7)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: SCOPE-0217, SCOPE-0218, SCOPE-0225
* M-determinism-6918-E6-rungs — UNDEFINED — §5.3 *5.3 The invariant suite, by scope (SCL-1)* — every rung from THORP to the METROPOLIS cap; tests seen: MODEL-0350, MODEL-0359, PIPELINE-0378, PIPELINE-0494
* M-determinism-6994-E5-data — UNDEFINED — §5.4 *5.4 The generation report* — missing, empty or contradictory data (the dossier included); tests seen: SCOPE-0807, SCOPE-0820, T20-5
* M-determinism-6994-E6-rungs — UNDEFINED — §5.4 *5.4 The generation report* — every rung from THORP to the METROPOLIS cap; tests seen: SCOPE-0807, SCOPE-0820, T20-5
* M-determinism-7043-E4-degenerate — UNDEFINED — §6.1 *6.1 RNG and stream design* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: DETERMINISM-0234, SCOPE-0793, SCOPE-0820, SCOPE-0826
* M-determinism-7043-E6-rungs — UNDEFINED — §6.1 *6.1 RNG and stream design* — every rung from THORP to the METROPOLIS cap; tests seen: DETERMINISM-0234, SCOPE-0793, SCOPE-0820, SCOPE-0826
* M-determinism-7238-E4-degenerate — UNDEFINED — §6.2 *6.2 What a seed determines, and the model digest* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: DETERMINISM-0236, DETERMINISM-0403, MODEL-0560, RENDERING-0558
* M-determinism-7408-E4-degenerate — UNDEFINED — §6.3 *6.3 Identity: address ids, lineage keys, carry-over (and the scope of…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: DETERMINISM-0153, DETERMINISM-0233, RENDERING-0432, SCOPE-0225
* M-determinism-7408-E6-rungs — UNDEFINED — §6.3 *6.3 Identity: address ids, lineage keys, carry-over (and the scope of…* — every rung from THORP to the METROPOLIS cap; tests seen: DETERMINISM-0153, DETERMINISM-0233, RENDERING-0432, SCOPE-0225
* M-determinism-7620-E2-one — UNDEFINED — §6.4 *6.4 Permalinks, version axes, retention and goldens* — exactly one item; tests seen: DETERMINISM-0234, SCOPE-0451, SCOPE-0818
* M-determinism-7620-E6-rungs — UNDEFINED — §6.4 *6.4 Permalinks, version axes, retention and goldens* — every rung from THORP to the METROPOLIS cap; tests seen: DETERMINISM-0234, SCOPE-0451, SCOPE-0818
* M-determinism-7685-E3-cap — UNDEFINED — §6.5 *6.5 Floating-point policy, determinism lint, determinism tests (G-P10)* — the maximum and its caps; tests seen: RENDERING-0222, SCOPE-0212, SCOPE-0221, SCOPE-0225
* M-determinism-7685-E4-degenerate — UNDEFINED — §6.5 *6.5 Floating-point policy, determinism lint, determinism tests (G-P10)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0222, SCOPE-0212, SCOPE-0221, SCOPE-0225
* M-determinism-7685-E6-rungs — UNDEFINED — §6.5 *6.5 Floating-point policy, determinism lint, determinism tests (G-P10)* — every rung from THORP to the METROPOLIS cap; tests seen: RENDERING-0222, SCOPE-0212, SCOPE-0221, SCOPE-0225
* M-determinism-7808-E6-rungs — UNDEFINED — §7.1 *7.1 Edits are ordered events on addresses; the named actions; the edi…* — every rung from THORP to the METROPOLIS cap; tests seen: SCOPE-0807, SCOPE-0826, T101-1, T101-9
* M-determinism-8133-E1-none — UNTESTED — §7.2 *7.2 Locks, pins, edited and assigned entities, drawn constraints, fie…* — no input / nothing to act on; defined by: "* **`locked`** (the default): the stroke is masked — its Δ is zero — on every cell whose centre lies in a water face or within one cell of a shore or…"
* M-determinism-8133-E2-one — UNTESTED — §7.2 *7.2 Locks, pins, edited and assigned entities, drawn constraints, fie…* — exactly one item; defined by: "A **positive placement** (`placeAt`, §7.7) pins its element or designation to its plot and is kept by every re-derivation and dossier re-application …"
* M-determinism-8133-E4-degenerate — UNDEFINED — §7.2 *7.2 Locks, pins, edited and assigned entities, drawn constraints, fie…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-determinism-8133-E5-data — UNTESTED — §7.2 *7.2 Locks, pins, edited and assigned entities, drawn constraints, fie…* — missing, empty or contradictory data (the dossier included); defined by: "* **Drawn constraints** (G-P8) — ways, water, walls, greens, district boundaries, footprints — enter the plat through `insertChain` as mandatory chai…"
* M-determinism-8133-E6-rungs — UNDEFINED — §7.2 *7.2 Locks, pins, edited and assigned entities, drawn constraints, fie…* — every rung from THORP to the METROPOLIS cap
* M-determinism-8133-E8-lifecycle — UNTESTED — §7.2 *7.2 Locks, pins, edited and assigned entities, drawn constraints, fie…* — save, load, undo, redo, regenerate and migrate; defined by: "**Protection.** A **locked** entity — or the locked attribute paths of one — is a fixed input: regeneration never changes it and re-derives its depen…"
* M-determinism-8198-E4-degenerate — UNDEFINED — §7.3 *7.3 Locality — effective scope, local operators, edit fates, recorded…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: DETERMINISM-0232, DETERMINISM-0235, MODEL-0311, SCOPE-0203
* M-determinism-8532-E4-degenerate — UNDEFINED — §7.4 *7.4 Lifecycle of every edit kind (create · read · persist · regenerat…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: DETERMINISM-0233, SCOPE-0225, SCOPE-0226, SCOPE-0231
* M-determinism-8532-E6-rungs — UNDEFINED — §7.4 *7.4 Lifecycle of every edit kind (create · read · persist · regenerat…* — every rung from THORP to the METROPOLIS cap; tests seen: DETERMINISM-0233, SCOPE-0225, SCOPE-0226, SCOPE-0231
* M-determinism-8750-E4-degenerate — UNDEFINED — §7.5 *7.5 Migration and upgrade (G-P9)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: DETERMINISM-0234, SCOPE-0818
* M-determinism-8750-E6-rungs — UNDEFINED — §7.5 *7.5 Migration and upgrade (G-P9)* — every rung from THORP to the METROPOLIS cap; tests seen: DETERMINISM-0234, SCOPE-0818
* M-determinism-8967-E4-degenerate — UNDEFINED — §7.7 *7.7 Intent, character, constraints, assignments, the forms catalogue …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: DETERMINISM-0236, SCOPE-0511, SCOPE-0820, SCOPE-0824
* M-determinism-9454-E1-none — UNDEFINED — §7.8 *7.8 Controls: monotone, continuous, documented; the control-surface b…* — no input / nothing to act on; tests seen: PIPELINE-0443, SCOPE-0235, SCOPE-0807, T101-1
* EI-DETERMINISM-EDGESOBSERVED-001 — UNDEFINED (inventory DETERMINISM-EDGESOBSERVED-001) — None — A bug abort (F-NUM mandatory chain, F-PLAN ring refusal, F-PLAN count): outcome after the abort undefined (DWG-01).
* EI-DETERMINISM-EDGESOBSERVED-002 — UNDEFINED (inventory DETERMINISM-EDGESOBSERVED-002) — None — reroll.maxAdvance exhausted while building the three variations of §7.3 item 10: how many variations are shown (fewer than three? duplicates?) is not stated.
* EI-DETERMINISM-EDGESOBSERVED-003 — UNDEFINED (inventory DETERMINISM-EDGESOBSERVED-003) — None — New random on a scope entity (or a rung counter) already at the user cap 32 767: the next reroll is not stated (rerolls from 32 768 are reserved for faithfulness references).
* EI-DETERMINISM-EDGESOBSERVED-004 — UNDEFINED (inventory DETERMINISM-EDGESOBSERVED-004) — None — A warp session applied with no strokes (Apply on an empty session): whether an empty warp event is committed is not stated.
* EI-DETERMINISM-EDGESOBSERVED-005 — UNDEFINED (inventory DETERMINISM-EDGESOBSERVED-005) — None — drawBoundary whose polygon covers no L1 cell by at least 50 %: outcome (refused, bent to the nearest cell, empty district) not stated.
* EI-DETERMINISM-EDGESOBSERVED-006 — UNDEFINED (inventory DETERMINISM-EDGESOBSERVED-006) — None — setAttrMany whose query resolves to zero ids; roster with zero lines; group with zero quarters; fill or regenerate on an EditScope ring covering no face: outcomes not stated.
* EI-DETERMINISM-EDGESOBSERVED-007 — UNDEFINED (inventory DETERMINISM-EDGESOBSERVED-007) — None — A request kind with no DisruptionBudgetRow, or a budget of 0: outcome not stated.
* EI-DETERMINISM-EDGESOBSERVED-008 — UNDEFINED (inventory DETERMINISM-EDGESOBSERVED-008) — None — A dossier event that changes a value a user edit had already overridden as a map fact (e.g. a later dossier knownTo on a place whose knownTo the user set while it was a map fact): whether the user's value is superseded and listed as a fate is not stated.
* EI-DETERMINISM-EDGESOBSERVED-009 — UNDEFINED (inventory DETERMINISM-EDGESOBSERVED-009) — None — An undo section record larger than the 20 MB cap by itself: whether it is kept, dropped with a rebuild-by-replay, or withdrawn is not stated (the cap is stated for the section).

### rendering

* M-rendering-9527-E3-cap — UNDEFINED — §8.1 *8.1 The display list (renderer-independent, columnar, incremental)* — the maximum and its caps; tests seen: RENDERING-0215, RENDERING-0226, RENDERING-0229
* M-rendering-9527-E4-degenerate — UNDEFINED — §8.1 *8.1 The display list (renderer-independent, columnar, incremental)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0215, RENDERING-0226, RENDERING-0229
* M-rendering-9665-E4-degenerate — UNDEFINED — §8.2 *8.2 Style sheets as data: roles, contrast, symbolisation, paint progr…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0181, RENDERING-0185, RENDERING-0226, RENDERING-0230
* M-rendering-10110-E4-degenerate — UNDEFINED — §8.3 *8.3 Symbol catalogue and draw-style census* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0155, RENDERING-0415, SCOPE-0221, SCOPE-0465
* M-rendering-10193-E4-degenerate — UNDEFINED — §8.4 *8.4 Layers, shadows, heights* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0178, RENDERING-0209, RENDERING-0211, RENDERING-0212
* M-rendering-10193-E8-lifecycle — UNDEFINED — §8.4 *8.4 Layers, shadows, heights* — save, load, undo, redo, regenerate and migrate; tests seen: RENDERING-0178, RENDERING-0209, RENDERING-0211, RENDERING-0212
* M-rendering-10480-E4-degenerate — UNDEFINED — §8.5 *8.5 Level of detail, the city-band figure-ground contract, way select…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: PIPELINE-0443, RENDERING-0196, RENDERING-0198, RENDERING-0202
* M-rendering-10590-E4-degenerate — UNDEFINED — §8.6 *8.6 Stage-2 render tier and stage-3 LOD* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0205, SCOPE-0825
* M-rendering-10590-E6-rungs — UNDEFINED — §8.6 *8.6 Stage-2 render tier and stage-3 LOD* — every rung from THORP to the METROPOLIS cap; tests seen: RENDERING-0205, SCOPE-0825
* M-rendering-10627-E1-none — UNDEFINED — §8.7 *8.7 Export resolution* — no input / nothing to act on
* M-rendering-10635-E4-degenerate — UNDEFINED — §8.8 *8.8 Tiles, zoom stops, print and the canvas budget* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0178, RENDERING-0215, RENDERING-0221, SCOPE-0814
* M-rendering-10635-E6-rungs — UNDEFINED — §8.8 *8.8 Tiles, zoom stops, print and the canvas budget* — every rung from THORP to the METROPOLIS cap; tests seen: RENDERING-0178, RENDERING-0215, RENDERING-0221, SCOPE-0814
* M-rendering-10782-E4-degenerate — UNDEFINED — §8.9 *8.9 Backends, text, threads and the worker boundary* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0176, RENDERING-0177, RENDERING-0551
* M-rendering-10782-E8-lifecycle — UNDEFINED — §8.9 *8.9 Backends, text, threads and the worker boundary* — save, load, undo, redo, regenerate and migrate; tests seen: RENDERING-0176, RENDERING-0177, RENDERING-0551
* M-rendering-10914-E4-degenerate — UNDEFINED — §8.10 *8.10 Decoration instances (trees, scatter, crowns, roof detail)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: DETERMINISM-0236, RENDERING-0189, SCOPE-0221, SCOPE-0463
* M-rendering-10914-E6-rungs — UNDEFINED — §8.10 *8.10 Decoration instances (trees, scatter, crowns, roof detail)* — every rung from THORP to the METROPOLIS cap; tests seen: DETERMINISM-0236, RENDERING-0189, SCOPE-0221, SCOPE-0463
* M-rendering-11057-E1-none — UNTESTED — §9.1 *9.1 What is model and what is view* — no input / nothing to act on; defined by: "`displayText` is the drawing's text and nothing else: the reader, the gazetteer and every export give the name, with the display text beside it where…"
* M-rendering-11057-E2-one — UNTESTED — §9.1 *9.1 What is model and what is view* — exactly one item; defined by: "An informal cluster (item 70) has one `LabelEntity` of kind `place` targeting its plot — a place name from §10.4, never one per structure — and a nam…"
* M-rendering-11057-E4-degenerate — UNDEFINED — §9.1 *9.1 What is model and what is view* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-rendering-11057-E5-data — UNTESTED — §9.1 *9.1 What is model and what is view* — missing, empty or contradictory data (the dossier included); defined by: "`displayText` is the drawing's text and nothing else: the reader, the gazetteer and every export give the name, with the display text beside it where…"
* M-rendering-11057-E6-rungs — UNDEFINED — §9.1 *9.1 What is model and what is view* — every rung from THORP to the METROPOLIS cap
* M-rendering-11057-E8-lifecycle — UNTESTED — §9.1 *9.1 What is model and what is view* — save, load, undo, redo, regenerate and migrate; defined by: "**Model** (S13a; in the model hash; persisted): every entity's name and short form; a `LabelEntity` per labelled thing with its candidates; the quart…"
* M-rendering-11105-E4-degenerate — UNDEFINED — §9.2 *9.2 Placement (S13b): font metrics, zoom stops, the global greedy eva…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0177, RENDERING-0199, RENDERING-0228, SCOPE-0221
* M-rendering-11262-E1-none — UNDEFINED — §9.3 *9.3 Spines and candidates* — no input / nothing to act on; tests seen: SCOPE-0545
* M-rendering-11262-E4-degenerate — UNDEFINED — §9.3 *9.3 Spines and candidates* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: SCOPE-0545
* M-rendering-11262-E6-rungs — UNDEFINED — §9.3 *9.3 Spines and candidates* — every rung from THORP to the METROPOLIS cap; tests seen: SCOPE-0545
* M-rendering-11262-E8-lifecycle — UNDEFINED — §9.3 *9.3 Spines and candidates* — save, load, undo, redo, regenerate and migrate; tests seen: SCOPE-0545
* M-rendering-11291-E4-degenerate — UNDEFINED — §9.4 *9.4 Sizes, floors, the ladder, quarters, overflow, halos* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0181, RENDERING-0195, RENDERING-0205, RENDERING-0224
* M-rendering-11347-E4-degenerate — UNDEFINED — §9.5 *9.5 Furniture, framing and tools* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0066, SCOPE-0794, T30-5, T63-2
* M-rendering-11347-E6-rungs — UNDEFINED — §9.5 *9.5 Furniture, framing and tools* — every rung from THORP to the METROPOLIS cap; tests seen: RENDERING-0066, SCOPE-0794, T30-5, T63-2
* M-rendering-11411-E1-none — UNDEFINED — §9.6 *9.6 Names* — no input / nothing to act on
* M-rendering-11411-E5-data — UNDEFINED — §9.6 *9.6 Names* — missing, empty or contradictory data (the dossier included)
* M-rendering-11411-E6-rungs — UNDEFINED — §9.6 *9.6 Names* — every rung from THORP to the METROPOLIS cap
* M-rendering-11411-E8-lifecycle — UNTESTED — §9.6 *9.6 Names* — save, load, undo, redo, regenerate and migrate; defined by: "**Uniqueness (LC-17)** within its kind — districts, quarters and water bodies per town; ways per district, and tier-1 ways town-wide: in a full gener…"
* M-rendering-11898-E4-degenerate — UNDEFINED — §11.1 *11.1 Formats* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: RENDERING-0551, SCOPE-0463, T28-19, T29-5
* M-rendering-11898-E6-rungs — UNDEFINED — §11.1 *11.1 Formats* — every rung from THORP to the METROPOLIS cap; tests seen: RENDERING-0551, SCOPE-0463, T28-19, T29-5
* M-rendering-12051-E3-cap — UNDEFINED — §11.2 *11.2 The embedding API and the worker boundary (SCL-6)* — the maximum and its caps; tests seen: T20-13, T30-5, T63-2
* M-rendering-12051-E6-rungs — UNDEFINED — §11.2 *11.2 The embedding API and the worker boundary (SCL-6)* — every rung from THORP to the METROPOLIS cap; tests seen: T20-13, T30-5, T63-2
* M-rendering-12273-E1-none — UNTESTED — §11.4 *11.4 Host inputs (DEF-11)* — no input / nothing to act on; defined by: "**A dossier comes through the port (items 73–87; §14).** For a dossier, door (1)'s blueprint and the log's creation prefix, and door (2)'s events and…"
* M-rendering-12273-E2-one — UNTESTED — §11.4 *11.4 Host inputs (DEF-11)* — exactly one item; defined by: "(2) edit events through the API or `doc.apply`, which are logged — a dossier change arrives as such events with `author: 'host'` and `EditBase.dossie…"
* M-rendering-12273-E3-cap — UNTESTED — §11.4 *11.4 Host inputs (DEF-11)* — the maximum and its caps; defined by: "J-A85.83) — accepted only after a **double-run check** (at registration it runs twice on the same input and stream; the two outputs must be byte-iden…"
* M-rendering-12273-E5-data — UNTESTED — §11.4 *11.4 Host inputs (DEF-11)* — missing, empty or contradictory data (the dossier included); defined by: "J-A85.83) — accepted only after a **double-run check** (at registration it runs twice on the same input and stream; the two outputs must be byte-iden…"
* M-rendering-12273-E6-rungs — UNTESTED — §11.4 *11.4 Host inputs (DEF-11)* — every rung from THORP to the METROPOLIS cap; defined by: "The port refuses a dossier whose population lies below 1 500 with `E_RUNG_UNAVAILABLE`, naming the village product, while none is registered (§7.7 it…"
* M-rendering-12273-E8-lifecycle — UNTESTED — §11.4 *11.4 Host inputs (DEF-11)* — save, load, undo, redo, regenerate and migrate; defined by: "(3) tables, presets and styles as `editTable`, `editPreset` or `setStyle` events, whose content is copied into the document with provenance `host` (s…"
* EI-REDGE-01 — UNDEFINED (inventory REDGE-01) — None — A region group may name 'any set of nodes whose districts are disjoint' - not necessarily contiguous - and its spine is 'from the union of the members' faces by §9.3's area rule', which is defined for one face (simplify, hole-aware skeleton, spine); the outcome for a union of several components (one spine on the largest, one per component, a leader) is undefined and untested.
* EI-REDGE-02 — UNDEFINED (inventory REDGE-02) — None — The knowledge filter's list of always-`public` rows (ways, districts, quarters, water bodies, woods, gates, the title, annotations) omits the kinds `region`, `landmark`, `place` and `address`; landmark, place and address take their target's record, but a region row's knownTo has no stated source.
* EI-REDGE-03 — UNDEFINED (inventory REDGE-03) — None — The greedy's default priority order (region > quarter / district > water > landmark > place > gate > way > address) omits the LabelEntity kinds `wood` and `annotation`, so their default priority - and hence their place in the strict order - is unstated.
* EI-REDGE-04 — UNDEFINED (inventory REDGE-04) — None — The island rows draw `waning` / `settled` at 'alpha x 0.8 / alpha x 0.6 with the ghost share raised (§8.4)'; §8.4 defines only ghostAlpha (default 0.35) - whether 'raised' is the effect of the alpha factor or a separate raise, and by how much, is undefined.

### scope

* M-scope-13670-E6-rungs — UNDEFINED — §13.3 *13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), fro…* — every rung from THORP to the METROPOLIS cap; tests seen: DETERMINISM-0231, RENDERING-0066, RENDERING-0166, RENDERING-0177
* M-scope-13824-E8-lifecycle — UNDEFINED — §13.5 *13.5 Reference-parity metrics (B-REF), read from one numbers-only bas…* — save, load, undo, redo, regenerate and migrate; tests seen: PIPELINE-0177, PIPELINE-0278, RENDERING-0286, SCOPE-0798
* M-scope-13935-E4-degenerate — UNDEFINED — §13.6 *13.6 The owner's side-by-side protocol (D-5)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: SCOPE-0539, SCOPE-0544, SCOPE-0823
* M-scope-13935-E8-lifecycle — UNDEFINED — §13.6 *13.6 The owner's side-by-side protocol (D-5)* — save, load, undo, redo, regenerate and migrate; tests seen: SCOPE-0539, SCOPE-0544, SCOPE-0823
* M-scope-14071-E4-degenerate — UNDEFINED — §13.7 *13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: SCOPE-0298, SCOPE-0471, SCOPE-0493, SCOPE-0500
* M-scope-14135-E1-none — UNDEFINED — §13.8 *13.8 CI tiers and compute budgets (SCL-18; D-34)* — no input / nothing to act on; tests seen: RENDERING-0517, RENDERING-0519, SCOPE-0197, SCOPE-0215
* M-scope-14135-E5-data — UNDEFINED — §13.8 *13.8 CI tiers and compute budgets (SCL-18; D-34)* — missing, empty or contradictory data (the dossier included); tests seen: RENDERING-0517, RENDERING-0519, SCOPE-0197, SCOPE-0215
* M-scope-14177-E1-none — UNDEFINED — §13.9 *13.9 The corpus-calibration interface (staged by the owner; DEF-9)* — no input / nothing to act on; tests seen: RENDERING-0066, SCOPE-0819

### V01

* M-V01-482-E5-data — UNDEFINED — V01 §2.1 *2.1 Identifiers and the fabric table* — missing, empty or contradictory data (the dossier included)
* M-V01-598-E5-data — UNDEFINED — V01 §2.3 *2.3 Views and services (derived, never stored)* — missing, empty or contradictory data (the dossier included); tests seen: T-V1-5
* M-V01-695-E8-lifecycle — UNTESTED — V01 §2.4 *2.4 The request, the result and the report (II.1 revised by BCR-2)* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table V01 §2.7 (confirm this section's records have their rows)"
* M-V01-732-E8-lifecycle — UNTESTED — V01 §2.5 *2.5 The close-up's records* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table V01 §2.7 (confirm this section's records have their rows)"
* M-V01-760-E5-data — UNTESTED — V01 §2.7 *2.7 Lifecycle of every state field this volume adds (create · read · …* — missing, empty or contradictory data (the dossier included); defined by: "New random on the district keeps it; the draw is keyed by the district's lineage (V1-3.12) ¦ the `setAttr`'s undo record restores the former value; t…"
* M-V01-760-E8-lifecycle — UNTESTED — V01 §2.7 *2.7 Lifecycle of every state field this volume adds (create · read · …* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table V01 §2.7 (confirm this section's records have their rows)"
* M-V01-819-E2-one — UNDEFINED — V01 §3.1 *3.1 Where stage 2 enters the pipeline (the stage graph delta, BCR-3)* — exactly one item; tests seen: T-V1-35
* M-V01-819-E4-degenerate — UNDEFINED — V01 §3.1 *3.1 Where stage 2 enters the pipeline (the stage graph delta, BCR-3)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-35
* M-V01-819-E6-rungs — UNDEFINED — V01 §3.1 *3.1 Where stage 2 enters the pipeline (the stage graph delta, BCR-3)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V1-35
* M-V01-860-E2-one — UNDEFINED — V01 §3.2 *3.2 The provisional character χ̃ — item 72's vector before anything i…* — exactly one item; tests seen: T-V1-2
* M-V01-860-E3-cap — UNDEFINED — V01 §3.2 *3.2 The provisional character χ̃ — item 72's vector before anything i…* — the maximum and its caps; tests seen: T-V1-2
* M-V01-860-E4-degenerate — UNDEFINED — V01 §3.2 *3.2 The provisional character χ̃ — item 72's vector before anything i…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-2
* M-V01-860-E5-data — UNDEFINED — V01 §3.2 *3.2 The provisional character χ̃ — item 72's vector before anything i…* — missing, empty or contradictory data (the dossier included); tests seen: T-V1-2
* M-V01-860-E6-rungs — UNDEFINED — V01 §3.2 *3.2 The provisional character χ̃ — item 72's vector before anything i…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V1-2
* M-V01-896-E1-none — UNDEFINED — V01 §3.3.1 *3.3.1 The step* — no input / nothing to act on
* M-V01-896-E2-one — UNTESTED — V01 §3.3.1 *3.3.1 The step* — exactly one item; defined by: "One uniform u on `fabric.select` (V1-3.3.4) picks the row by cumulative weight in table row order. 7."
* M-V01-896-E5-data — UNTESTED — V01 §3.3.1 *3.3.1 The step* — missing, empty or contradictory data (the dossier included); defined by: "Write `D.fabric = r.id` and `D.fabricParams` = r's `params` defaults (V1-3.4.7)."
* M-V01-915-E1-none — UNDEFINED — V01 §3.3.2 *3.3.2 Eligibility (`TemplateRequirement` on `DistrictContext`)* — no input / nothing to act on
* M-V01-915-E2-one — UNTESTED — V01 §3.3.2 *3.3.2 Eligibility (`TemplateRequirement` on `DistrictContext`)* — exactly one item; defined by: "`minFaceAreaM2Law: 'ring'` ¦ `inscribedRadiusM ≥ 2.5 × eLo + w_tpl` [`elig.ringELo`] (one ring course with a band outside it and a centre inside it;"
* M-V01-915-E4-degenerate — UNDEFINED — V01 §3.3.2 *3.3.2 Eligibility (`TemplateRequirement` on `DistrictContext`)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-915-E5-data — UNTESTED — V01 §3.3.2 *3.3.2 Eligibility (`TemplateRequirement` on `DistrictContext`)* — missing, empty or contradictory data (the dossier included); defined by: "`landmarkSigma` ¦ a reservation inside the template face whose class σ ≥ the value (`character.anchorSigma`, 5, by default) ¦"
* M-V01-940-E1-none — UNTESTED — V01 §3.3.3 *3.3.3 The weights (in-town)* — no input / nothing to act on; defined by: "`w_r = select.base × κ(D) × Π_terms (1 + gain × value) × (1 + plannedGain × intent.planned) × fabric.extensionWeight`, with **`κ(D)` = `select.kind[D…"
* M-V01-940-E2-one — UNTESTED — V01 §3.3.3 *3.3.3 The weights (in-town)* — exactly one item; defined by: "*Pre-decided fallback:* all non-`bent-cut` bases scale by one common factor to bring the share to 25 %, a declared shift; if the classifier fails, th…"
* M-V01-940-E4-degenerate — UNDEFINED — V01 §3.3.3 *3.3.3 The weights (in-town)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-940-E5-data — UNTESTED — V01 §3.3.3 *3.3.3 The weights (in-town)* — missing, empty or contradictory data (the dossier included); defined by: "`w_r = select.base × κ(D) × Π_terms (1 + gain × value) × (1 + plannedGain × intent.planned) × fabric.extensionWeight`, with **`κ(D)` = `select.kind[D…"
* M-V01-940-E6-rungs — UNTESTED — V01 §3.3.3 *3.3.3 The weights (in-town)* — every rung from THORP to the METROPOLIS cap; defined by: "**Confirmation (M5, B-CITY):** the share of districts not `bent-cut` lies in 15–35 % at CITY in the default preset (realism: most medieval districts …"
* M-V01-940-E7-toggles — UNTESTED — V01 §3.3.3 *3.3.3 The weights (in-town)* — every toggle and preset (parity presets, every layer on and off); defined by: "`sky-temple` reads `temple`, `sky-palace` `castle`, `sky-island` the town's richest ground kind (the kind of the ground district with the highest pas…"
* M-V01-990-E4-degenerate — UNDEFINED — V01 §3.3.5 *3.3.5 A standalone neighbourhood's `auto` (NG's odds)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-998-E1-none — UNTESTED — V01 §3.3.6 *3.3.6 Epochs — the `hood.fabric` participant (volume 6)* — no input / nothing to act on; defined by: "(4) nothing else: a surviving district keeps its fabric and a standing square, green or manor block its content, as every survivor keeps its geometry."
* M-V01-998-E2-one — UNDEFINED — V01 §3.3.6 *3.3.6 Epochs — the `hood.fabric` participant (volume 6)* — exactly one item
* M-V01-998-E4-degenerate — UNDEFINED — V01 §3.3.6 *3.3.6 Epochs — the `hood.fabric` participant (volume 6)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-998-E5-data — UNTESTED — V01 §3.3.6 *3.3.6 Epochs — the `hood.fabric` participant (volume 6)* — missing, empty or contradictory data (the dossier included); defined by: "(4) nothing else: a surviving district keeps its fabric and a standing square, green or manor block its content, as every survivor keeps its geometry."
* M-V01-998-E8-lifecycle — UNTESTED — V01 §3.3.6 *3.3.6 Epochs — the `hood.fabric` participant (volume 6)* — save, load, undo, redo, regenerate and migrate; defined by: "(3) the districts a raised part in the epoch's `scope.raised` crosses (V06 §3.19): their derived readings (`DistrictContext`, the template face with …"
* M-V01-1020-E4-degenerate — UNDEFINED — V01 §3.3.7 *3.3.7 The template's land and the reconcile (V1C-02)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-12, T-V1-2
* M-V01-1061-E5-data — UNDEFINED — V01 §3.3.8 *3.3.8 The kinds and their layouts (S4 (a); V1C-24)* — missing, empty or contradictory data (the dossier included); tests seen: T-V1-6
* M-V01-1086-E2-one — UNDEFINED — V01 §3.4.1 *3.4.1 The template face* — exactly one item
* M-V01-1086-E4-degenerate — UNDEFINED — V01 §3.4.1 *3.4.1 The template face* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1086-E5-data — UNDEFINED — V01 §3.4.1 *3.4.1 The template face* — missing, empty or contradictory data (the dossier included)
* M-V01-1098-E1-none — UNTESTED — V01 §3.4.2 *3.4.2 What every seed primitive shares* — no input / nothing to act on; defined by: "`axis` — the template face's OBB major axis's two ends projected onto its boundary (virtual anchors; used when fewer usable portals exist than a spin…"
* M-V01-1098-E2-one — UNTESTED — V01 §3.4.2 *3.4.2 What every seed primitive shares* — exactly one item; defined by: "**(b) The template street width** `w_tpl`, one per district, drawn once on `hood.template` (creation index 0):"
* M-V01-1098-E4-degenerate — UNTESTED — V01 §3.4.2 *3.4.2 What every seed primitive shares* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); defined by: "**(d) Validation**, per seed, on the overlay before its commit: every segment ≥ `minEdge`; every interior turn ≤ 60°; clearance from the face boundar…"
* M-V01-1098-E5-data — UNTESTED — V01 §3.4.2 *3.4.2 What every seed primitive shares* — missing, empty or contradictory data (the dossier included); defined by: "`axis` — the template face's OBB major axis's two ends projected onto its boundary (virtual anchors; used when fewer usable portals exist than a spin…"
* M-V01-1098-E6-rungs — UNDEFINED — V01 §3.4.2 *3.4.2 What every seed primitive shares* — every rung from THORP to the METROPOLIS cap
* M-V01-1147-E1-none — UNTESTED — V01 §3.4.3 *3.4.3 The spine primitive* — no input / nothing to act on; defined by: "Level 0 must lay, else F-TEMPLATE: rung 1 has nothing to redraw (the series draws nothing), rung 2 offsets level 0 by ± `eLo / 2` along the fall (+ f…"
* M-V01-1147-E2-one — UNTESTED — V01 §3.4.3 *3.4.3 The spine primitive* — exactly one item; defined by: "The chord A→B; one control point at the chord's midpoint displaced perpendicular by `δ = (m3 − ½) × 0.3 × ¦AB¦` (`m3` the mean of three uniforms, §6.…"
* M-V01-1147-E4-degenerate — UNTESTED — V01 §3.4.3 *3.4.3 The spine primitive* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); defined by: "The series grows outward from k = 0 in the order 0, +1, −1, +2, −2, … until a level leaves the face or ¦k¦ reaches `terrace.maxLevels` (15; reported …"
* M-V01-1147-E5-data — UNTESTED — V01 §3.4.3 *3.4.3 The spine primitive* — missing, empty or contradictory data (the dossier included); defined by: "Each end continues by a square leg to the nearest way on the face boundary within `2 × eHi` (a T-junction), else stops at the setback line (a reporte…"
* M-V01-1147-E6-rungs — UNDEFINED — V01 §3.4.3 *3.4.3 The spine primitive* — every rung from THORP to the METROPOLIS cap
* M-V01-1191-E1-none — UNTESTED — V01 §3.4.4 *3.4.4 The ring primitive (item 58 (a); the courses are II.2's)* — no input / nothing to act on; defined by: "Precinct rings draw nothing. 4."
* M-V01-1191-E2-one — UNTESTED — V01 §3.4.4 *3.4.4 The ring primitive (item 58 (a); the courses are II.2's)* — exactly one item; defined by: "II.2 states the ring courses (hexagons sharing one phase, the radial bell of `ringJitter` × the spacing, three corner-cutting passes to 48 vertices, …"
* M-V01-1191-E3-cap — UNTESTED — V01 §3.4.4 *3.4.4 The ring primitive (item 58 (a); the courses are II.2's)* — the maximum and its caps; defined by: "**Radius budget** `R` = the distance from `c` to the **nearest** point of the template face's boundary, less `eLo` (the boundary's inset); with `c` a…"
* M-V01-1191-E4-degenerate — UNDEFINED — V01 §3.4.4 *3.4.4 The ring primitive (item 58 (a); the courses are II.2's)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1191-E6-rungs — UNDEFINED — V01 §3.4.4 *3.4.4 The ring primitive (item 58 (a); the courses are II.2's)* — every rung from THORP to the METROPOLIS cap
* M-V01-1230-E1-none — UNTESTED — V01 §3.4.5 *3.4.5 The plaza primitive* — no input / nothing to act on; defined by: "Nothing is carved in S8."
* M-V01-1230-E2-one — UNTESTED — V01 §3.4.5 *3.4.5 The plaza primitive* — exactly one item; defined by: "**Insertion:** the plaza ring as one closed L1 chain with the `square` role, owned by a `Reservation` (kind `plaza`, stage S8, V1-2.2) of D, so S9 ty…"
* M-V01-1230-E4-degenerate — UNDEFINED — V01 §3.4.5 *3.4.5 The plaza primitive* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1230-E5-data — UNTESTED — V01 §3.4.5 *3.4.5 The plaza primitive* — missing, empty or contradictory data (the dossier included); defined by: "**(a) Size.** `A = clamp(SquareRow[type].m2PerInhabitant × inhabitants, SquareRow.minM2, SquareRow.maxShareOfFace × templateFaceAreaM2) × fabricParam…"
* M-V01-1267-E1-none — UNDEFINED — V01 §3.4.6 *3.4.6 The fan primitive* — no input / nothing to act on
* M-V01-1267-E2-one — UNDEFINED — V01 §3.4.6 *3.4.6 The fan primitive* — exactly one item
* M-V01-1275-E1-none — UNDEFINED — V01 §3.4.7 *3.4.7 The rows* — no input / nothing to act on
* M-V01-1275-E2-one — UNDEFINED — V01 §3.4.7 *3.4.7 The rows* — exactly one item
* M-V01-1275-E4-degenerate — UNDEFINED — V01 §3.4.7 *3.4.7 The rows* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1275-E5-data — UNTESTED — V01 §3.4.7 *3.4.7 The rows* — missing, empty or contradictory data (the dossier included); defined by: "row (card) ¦ seeds, in order ¦ `fabricParams` (default) ¦ fallback ¦ ¦---¦---¦---¦---¦"
* M-V01-1298-E4-degenerate — UNDEFINED — V01 §3.4.8 *3.4.8 Unit runs* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1309-E1-none — UNDEFINED — V01 §3.5.1 *3.5.1 The step* — no input / nothing to act on
* M-V01-1309-E2-one — UNDEFINED — V01 §3.5.1 *3.5.1 The step* — exactly one item
* M-V01-1309-E5-data — UNDEFINED — V01 §3.5.1 *3.5.1 The step* — missing, empty or contradictory data (the dossier included)
* M-V01-1309-E6-rungs — UNDEFINED — V01 §3.5.1 *3.5.1 The step* — every rung from THORP to the METROPOLIS cap
* M-V01-1309-E8-lifecycle — UNTESTED — V01 §3.5.1 *3.5.1 The step* — save, load, undo, redo, regenerate and migrate; defined by: "**The band S9b reads per block** is the band §4.7 S10 (2) reads for its geometry rows: at generation the pass-1 field band (no plot floor exists yet)…"
* M-V01-1329-E1-none — UNDEFINED — V01 §3.5.2 *3.5.2 The quotas* — no input / nothing to act on
* M-V01-1329-E2-one — UNTESTED — V01 §3.5.2 *3.5.2 The quotas* — exactly one item; defined by: "* **Squares:** `Q_sq = max(0, N ÷ 1 000 × haPer1000(value) × kind[D.kind] × 10 000 − squaresM2)` m², read from **`squares.quota`** — the one square q…"
* M-V01-1329-E3-cap — UNDEFINED — V01 §3.5.2 *3.5.2 The quotas* — the maximum and its caps
* M-V01-1329-E5-data — UNTESTED — V01 §3.5.2 *3.5.2 The quotas* — missing, empty or contradictory data (the dossier included); defined by: "Default `haPer1000`: squalid 0.05, poor 0.05, modest 0.07, comfortable 0.08, prosperous 0.10, rich 0.12; kind factors market 1.5, central 1.3, temple…"
* M-V01-1329-E6-rungs — UNDEFINED — V01 §3.5.2 *3.5.2 The quotas* — every rung from THORP to the METROPOLIS cap
* M-V01-1349-E1-none — UNDEFINED — V01 §3.5.3 *3.5.3 Squares* — no input / nothing to act on
* M-V01-1349-E2-one — UNTESTED — V01 §3.5.3 *3.5.3 Squares* — exactly one item; defined by: "V1-2.3), one of them tier 1 (`through`, `primary`) or two of them tier 2 (`secondary`, `quay`; §8.5's tiers);"
* M-V01-1386-E1-none — UNTESTED — V01 §3.5.5 *3.5.5 Manor blocks* — no input / nothing to act on; defined by: "* **sun** — `1 − manor.sunWeight × shade(centroid)` [`manor.sunWeight` 0.5, ours, `extension`], `shade(x)` item 102's daylight shade share at x: the …"
* M-V01-1386-E2-one — UNDEFINED — V01 §3.5.5 *3.5.5 Manor blocks* — exactly one item
* M-V01-1386-E4-degenerate — UNDEFINED — V01 §3.5.5 *3.5.5 Manor blocks* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1386-E5-data — UNTESTED — V01 §3.5.5 *3.5.5 Manor blocks* — missing, empty or contradictory data (the dossier included); defined by: "* **siting** — `Π (1 − push)` over the blocks S10a (i) filled, `push` the weight of the derived family row (`fam/nuisance/<n>/L<level>`, V11 §2.4) fo…"
* M-V01-1386-E6-rungs — UNDEFINED — V01 §3.5.5 *3.5.5 Manor blocks* — every rung from THORP to the METROPOLIS cap
* M-V01-1386-E8-lifecycle — UNTESTED — V01 §3.5.5 *3.5.5 Manor blocks* — save, load, undo, redo, regenerate and migrate; defined by: "* **sun** — `1 − manor.sunWeight × shade(centroid)` [`manor.sunWeight` 0.5, ours, `extension`], `shade(x)` item 102's daylight shade share at x: the …"
* M-V01-1410-E1-none — UNTESTED — V01 §3.5.6 *3.5.6 Small blocks and ring centres (phase 2)* — no input / nothing to act on; defined by: "NG 1.2.2 empties every small block (its empty blocks are 0–3 % of blocks, `profile-neighbourhood.md` §3.3; the `NG` preset does, V1-3.15), calibrated…"
* M-V01-1410-E2-one — UNDEFINED — V01 §3.5.6 *3.5.6 Small blocks and ring centres (phase 2)* — exactly one item
* M-V01-1410-E6-rungs — UNDEFINED — V01 §3.5.6 *3.5.6 Small blocks and ring centres (phase 2)* — every rung from THORP to the METROPOLIS cap
* M-V01-1434-E6-rungs — UNDEFINED — V01 §3.5.8 *3.5.8 The seam guard (S3)* — every rung from THORP to the METROPOLIS cap
* M-V01-1441-E6-rungs — UNDEFINED — V01 §3.5.9 *3.5.9 Land in the programme (BCR-8)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V1-12
* M-V01-1454-E1-none — UNTESTED — V01 §3.5.10 *3.5.10 What each content does downstream* — no input / nothing to act on; defined by: "V1C-12) ¦ none ¦ a `HoodPlace` (V1-3.7.1); drawn in the `road` role (V1-5.1.2) ¦"
* M-V01-1454-E4-degenerate — UNDEFINED — V01 §3.5.10 *3.5.10 What each content does downstream* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1454-E6-rungs — UNDEFINED — V01 §3.5.10 *3.5.10 What each content does downstream* — every rung from THORP to the METROPOLIS cap
* M-V01-1454-E8-lifecycle — UNDEFINED — V01 §3.5.10 *3.5.10 What each content does downstream* — save, load, undo, redo, regenerate and migrate
* M-V01-1474-E1-none — UNDEFINED — V01 §3.5.12 *3.5.12 Fixed inputs, ladder records and catacomb sources (V1C-06, V1C…* — no input / nothing to act on
* M-V01-1474-E2-one — UNTESTED — V01 §3.5.12 *3.5.12 Fixed inputs, ladder records and catacomb sources (V1C-06, V1C…* — exactly one item; defined by: "(2) a **SIZE** ladder record's compound (g item 108 (a): one larger building or compound by its template, never typed away);"
* M-V01-1474-E4-degenerate — UNDEFINED — V01 §3.5.12 *3.5.12 Fixed inputs, ladder records and catacomb sources (V1C-06, V1C…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1474-E5-data — UNDEFINED — V01 §3.5.12 *3.5.12 Fixed inputs, ladder records and catacomb sources (V1C-06, V1C…* — missing, empty or contradictory data (the dossier included)
* M-V01-1474-E8-lifecycle — UNTESTED — V01 §3.5.12 *3.5.12 Fixed inputs, ladder records and catacomb sources (V1C-06, V1C…* — save, load, undo, redo, regenerate and migrate; defined by: "**Fixed inputs.** S9b never types a fixed input's block `square`, `green`, `manor` or `yard`, and a re-derivation (a replace close-up, a content edit…"
* M-V01-1496-E1-none — UNTESTED — V01 §3.6 *3.6 Context features (stage-2 feature S2)* — no input / nothing to act on; defined by: "**Gate approach.** The base's gate plaza (§4.8); nothing added."
* M-V01-1496-E2-one — UNTESTED — V01 §3.6 *3.6 Context features (stage-2 feature S2)* — exactly one item; defined by: "The intervallum where the era row has one and the stretch is `full` (§4.8); otherwise — a `parapet` stretch, or an era without intervallum — the base…"
* M-V01-1496-E4-degenerate — UNDEFINED — V01 §3.6 *3.6 Context features (stage-2 feature S2)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1496-E5-data — UNTESTED — V01 §3.6 *3.6 Context features (stage-2 feature S2)* — missing, empty or contradictory data (the dossier included); defined by: "S8 lays a **bank path** — a `path`-class spine along the shore setback's inner line (a parallel spine at `onEdge` with the path's own width, V1-3.4.3…"
* M-V01-1496-E6-rungs — UNDEFINED — V01 §3.6 *3.6 Context features (stage-2 feature S2)* — every rung from THORP to the METROPOLIS cap
* M-V01-1549-E1-none — UNTESTED — V01 §3.7.1 *3.7.1 Named local places (`HoodPlace`)* — no input / nothing to act on; defined by: "Its place kind `court` names a **block's court residue** (§4.7 S10 (6)) and nothing else: a footprint's court — a hole of a footprint face, which vol…"
* M-V01-1549-E2-one — UNTESTED — V01 §3.7.1 *3.7.1 Named local places (`HoodPlace`)* — exactly one item; defined by: "**(a) the creation pass**, before the ways are named, creates or keeps one `HoodPlace` record — kind, host, lineage, no name — for every block of con…"
* M-V01-1549-E4-degenerate — UNDEFINED — V01 §3.7.1 *3.7.1 Named local places (`HoodPlace`)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1549-E5-data — UNTESTED — V01 §3.7.1 *3.7.1 Named local places (`HoodPlace`)* — missing, empty or contradictory data (the dossier included); defined by: "Its **knowledge** defaults from `hood.placeKnowledge`:"
* M-V01-1549-E6-rungs — UNTESTED — V01 §3.7.1 *3.7.1 Named local places (`HoodPlace`)* — every rung from THORP to the METROPOLIS cap; defined by: "**A catacomb entrance** sits only on cemetery ground (g item 109 (k) (2) as revised ~20:05, "switch it then, cathedral also gets crypts but cemetarie…"
* M-V01-1549-E8-lifecycle — UNTESTED — V01 §3.7.1 *3.7.1 Named local places (`HoodPlace`)* — save, load, undo, redo, regenerate and migrate; defined by: "**A place made by hand (V1C-57).** T11's name tool on an unnamed court residue, yard or square creates its `HoodPlace` with the typed name: a `setAtt…"
* M-V01-1600-E2-one — UNTESTED — V01 §3.7.2 *3.7.2 Local street names — the way-naming context (BCR-16)* — exactly one item; defined by: "The grammar's rows (volume 11) guard on these features with weights — a street to the gate for its gate, a lane of tanners for its trade, a crooked l…"
* M-V01-1600-E4-degenerate — UNDEFINED — V01 §3.7.2 *3.7.2 Local street names — the way-naming context (BCR-16)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1600-E5-data — UNTESTED — V01 §3.7.2 *3.7.2 Local street names — the way-naming context (BCR-16)* — missing, empty or contradictory data (the dossier included); defined by: "`shape` — `ring` for a ring course, `stepped` by V1-3.6 (3), `curved` when a fillet arc spans ≥ 30 % [`name.curvedShare`] of its length, `bent` when …"
* M-V01-1621-E5-data — UNTESTED — V01 §3.7.3 *3.7.3 Way surfaces (BCR-6)* — missing, empty or contradictory data (the dossier included); defined by: "Default rows (ours):"
* M-V01-1621-E8-lifecycle — UNTESTED — V01 §3.7.3 *3.7.3 Way surfaces (BCR-6)* — save, load, undo, redo, regenerate and migrate; defined by: "An epoch re-derives surfaces on ways whose fronting band changes past the hysteresis (§4.5)."
* M-V01-1647-E1-none — UNDEFINED — V01 §3.8.1 *3.8.1 Trigger* — no input / nothing to act on
* M-V01-1647-E4-degenerate — UNDEFINED — V01 §3.8.1 *3.8.1 Trigger* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1647-E6-rungs — UNDEFINED — V01 §3.8.1 *3.8.1 Trigger* — every rung from THORP to the METROPOLIS cap
* M-V01-1660-E4-degenerate — UNDEFINED — V01 §3.8.2 *3.8.2 The neighbourhood-tier pins (`HoodPin`; II.3, item 58 (c))* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-26, T-V1-31
* M-V01-1660-E6-rungs — UNDEFINED — V01 §3.8.2 *3.8.2 The neighbourhood-tier pins (`HoodPin`; II.3, item 58 (c))* — every rung from THORP to the METROPOLIS cap; tests seen: T-V1-26, T-V1-31
* M-V01-1660-E8-lifecycle — UNDEFINED — V01 §3.8.2 *3.8.2 The neighbourhood-tier pins (`HoodPin`; II.3, item 58 (c))* — save, load, undo, redo, regenerate and migrate; tests seen: T-V1-26, T-V1-31
* M-V01-1731-E1-none — UNTESTED — V01 §3.8.3 *3.8.3 The cache* — no input / nothing to act on; defined by: "The derived content (`HoodPin`s and nothing else — the close-up's names, squares, greens and places are eager model data; the ground `AccessPoint` sy…"
* M-V01-1731-E2-one — UNTESTED — V01 §3.8.3 *3.8.3 The cache* — exactly one item; defined by: "The derived content (`HoodPin`s and nothing else — the close-up's names, squares, greens and places are eager model data; the ground `AccessPoint` sy…"
* M-V01-1731-E4-degenerate — UNDEFINED — V01 §3.8.3 *3.8.3 The cache* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1741-E8-lifecycle — UNTESTED — V01 §3.8.4 *3.8.4 Staleness and re-derivation* — save, load, undo, redo, regenerate and migrate; defined by: "A batch that changes any input sets the district's `closeup` record `stale` (§2.8), with the change marker at the city band (§8.5); the cached pins s…"
* M-V01-1749-E8-lifecycle — UNDEFINED — V01 §3.8.5 *3.8.5 Overrides* — save, load, undo, redo, regenerate and migrate
* M-V01-1760-E5-data — UNDEFINED — V01 §3.8.6 *3.8.6 Persistence (LC-18, J-P23)* — missing, empty or contradictory data (the dossier included)
* M-V01-1760-E8-lifecycle — UNTESTED — V01 §3.8.6 *3.8.6 Persistence (LC-18, J-P23)* — save, load, undo, redo, regenerate and migrate; defined by: "A later `closeup` event on the same district replaces the params (its undo restores the former record)."
* M-V01-1769-E4-degenerate — UNDEFINED — V01 §3.8.7 *3.8.7 Frame and surroundings (S2 (c))* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1775-E4-degenerate — UNDEFINED — V01 §3.8.8 *3.8.8 Underground, sky, and the ground access symbols* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-4
* M-V01-1775-E6-rungs — UNDEFINED — V01 §3.8.8 *3.8.8 Underground, sky, and the ground access symbols* — every rung from THORP to the METROPOLIS cap; tests seen: T-V1-4
* M-V01-1775-E8-lifecycle — UNDEFINED — V01 §3.8.8 *3.8.8 Underground, sky, and the ground access symbols* — save, load, undo, redo, regenerate and migrate; tests seen: T-V1-4
* M-V01-1813-E1-none — UNDEFINED — V01 §3.8.9 *3.8.9 The outline close-up (V1C-09; §16 M5's "arbitrary boundary"; J-…* — no input / nothing to act on
* M-V01-1813-E2-one — UNDEFINED — V01 §3.8.9 *3.8.9 The outline close-up (V1C-09; §16 M5's "arbitrary boundary"; J-…* — exactly one item
* M-V01-1813-E4-degenerate — UNDEFINED — V01 §3.8.9 *3.8.9 The outline close-up (V1C-09; §16 M5's "arbitrary boundary"; J-…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1813-E6-rungs — UNDEFINED — V01 §3.8.9 *3.8.9 The outline close-up (V1C-09; §16 M5's "arbitrary boundary"; J-…* — every rung from THORP to the METROPOLIS cap
* M-V01-1813-E8-lifecycle — UNDEFINED — V01 §3.8.9 *3.8.9 The outline close-up (V1C-09; §16 M5's "arbitrary boundary"; J-…* — save, load, undo, redo, regenerate and migrate
* M-V01-1827-E1-none — UNTESTED — V01 §3.9 *3.9 The replace close-up — choosing another layout for a district* — no input / nothing to act on; defined by: "A refine close-up emits no notice and moves nothing."
* M-V01-1827-E2-one — UNTESTED — V01 §3.9 *3.9 The replace close-up — choosing another layout for a district* — exactly one item; defined by: "Choosing a card other than the district's fabric is a **model edit** (II.4): one undo group of `setAttr(D.fabric, r)` (and any `setAttr(D.fabricParam…"
* M-V01-1827-E4-degenerate — UNDEFINED — V01 §3.9 *3.9 The replace close-up — choosing another layout for a district* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1827-E5-data — UNTESTED — V01 §3.9 *3.9 The replace close-up — choosing another layout for a district* — missing, empty or contradictory data (the dossier included); defined by: "The dry run (§7.1) runs the whole re-derivation on the overlay and returns: the ghost of the new ways and blocks (`live.ghost`, §8.2) with the count …"
* M-V01-1827-E8-lifecycle — UNTESTED — V01 §3.9 *3.9 The replace close-up — choosing another layout for a district* — save, load, undo, redo, regenerate and migrate; defined by: "Choosing a card other than the district's fabric is a **model edit** (II.4): one undo group of `setAttr(D.fabric, r)` (and any `setAttr(D.fabricParam…"
* M-V01-1859-E2-one — UNDEFINED — V01 §3.10 *3.10 The unit run — a close-up with no base under it (RV-pc-1; II.1 (…* — exactly one item
* M-V01-1868-E6-rungs — UNDEFINED — V01 §3.10.1 *3.10.1 The standalone neighbourhood document (`Recipe.product = 'hood…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V4-75
* M-V01-1955-E2-one — UNTESTED — V01 §3.10.2 *3.10.2 The standalone outline rows (BCR-13)* — exactly one item; defined by: "`n = 4 + ⌊8 (1 − bell4)⌋` vertices (4–12, mostly 9–12); vertex i at angle `2π (i + m3) ÷ n` and radius `0.35 + 0.65 × m3` (the 0.35 floor ours, `hood…"
* M-V01-1955-E4-degenerate — UNDEFINED — V01 §3.10.2 *3.10.2 The standalone outline rows (BCR-13)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-1977-E4-degenerate — UNDEFINED — V01 §3.10.3 *3.10.3 A sky island's districts (V1C-31; J-V1.49)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-21, T-V5-9
* M-V01-1977-E6-rungs — UNDEFINED — V01 §3.10.3 *3.10.3 A sky island's districts (V1C-31; J-V1.49)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V1-21, T-V5-9
* M-V01-2098-E6-rungs — UNDEFINED — V01 §3.10.4 *3.10.4 An arbitrary outline inside a town* — every rung from THORP to the METROPOLIS cap
* M-V01-2105-E1-none — UNTESTED — V01 §3.11 *3.11 Seams — what stage 2 adds to II.1* — no input / nothing to act on; defined by: "`sheer` never types a ground seam — all hard; none carries a portal. 5."
* M-V01-2105-E2-one — UNTESTED — V01 §3.11 *3.11 Seams — what stage 2 adds to II.1* — exactly one item; defined by: "`portalsConnected` — those from which a walk along D's L1 ways reaches D's largest way component (a BFS over D's way graph — part 0 (V1-2.3's parts t…"
* M-V01-2105-E4-degenerate — UNDEFINED — V01 §3.11 *3.11 Seams — what stage 2 adds to II.1* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-2105-E5-data — UNTESTED — V01 §3.11 *3.11 Seams — what stage 2 adds to II.1* — missing, empty or contradictory data (the dossier included); defined by: "BCR-33 puts the `surface` attribute and the naming record of D's bounding ways inside D's seam exception, and the locality oracle checks everything e…"
* M-V01-2105-E8-lifecycle — UNTESTED — V01 §3.11 *3.11 Seams — what stage 2 adds to II.1* — save, load, undo, redo, regenerate and migrate; defined by: "**Portals and ends.** Every seed end and every lane end on a district-boundary spine is a `baseLane` amendment made by S8 (generation or a replace re…"
* M-V01-2149-E4-degenerate — UNDEFINED — V01 §3.12 *3.12 Determinism* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-36
* M-V01-2185-E1-none — UNTESTED — V01 §3.13 *3.13 Failure handling (BCR-18)* — no input / nothing to act on; defined by: "**the household-less manor block reverts to `ordinary`**, reported, never left empty;"
* M-V01-2185-E2-one — UNTESTED — V01 §3.13 *3.13 Failure handling (BCR-18)* — exactly one item; defined by: "(4) `bent-cut`, whose §4.6 ladder always completes — and lays a lane to an unreached landing attach or deck end; a deck end still unreached leaves it…"
* M-V01-2185-E4-degenerate — UNTESTED — V01 §3.13 *3.13 Failure handling (BCR-18)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); defined by: "F-UNIT ¦ the unit run (V1-3.10) ¦ the outline not simple after F-OUTLINE's repair; its area below `4 × eLo²` (not one block's worth); the standalone …"
* M-V01-2185-E5-data — UNTESTED — V01 §3.13 *3.13 Failure handling (BCR-18)* — missing, empty or contradictory data (the dossier included); defined by: "(4) `bent-cut`, whose §4.6 ladder always completes — and lays a lane to an unreached landing attach or deck end; a deck end still unreached leaves it…"
* M-V01-2185-E6-rungs — UNDEFINED — V01 §3.13 *3.13 Failure handling (BCR-18)* — every rung from THORP to the METROPOLIS cap
* M-V01-2196-E4-degenerate — UNDEFINED — V01 §3.14 *3.14 Constants (with provenance and table home)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-12, T-V1-31, T-V1-4, T-V1-50
* M-V01-2196-E8-lifecycle — UNDEFINED — V01 §3.14 *3.14 Constants (with provenance and table home)* — save, load, undo, redo, regenerate and migrate; tests seen: T-V1-12, T-V1-31, T-V1-4, T-V1-50
* M-V01-2307-E3-cap — UNDEFINED — V01 §3.15 *3.15 The `NG` preset — Neighbourhood's own rules (V1C-26; item 23; J-…* — the maximum and its caps; tests seen: T-V1-26, T-V1-31, T-V1-32, T-V1-4
* M-V01-2307-E4-degenerate — UNDEFINED — V01 §3.15 *3.15 The `NG` preset — Neighbourhood's own rules (V1C-26; item 23; J-…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-26, T-V1-31, T-V1-32, T-V1-4
* M-V01-2307-E6-rungs — UNDEFINED — V01 §3.15 *3.15 The `NG` preset — Neighbourhood's own rules (V1C-26; item 23; J-…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V1-26, T-V1-31, T-V1-32, T-V1-4
* M-V01-2375-E1-none — UNDEFINED — V01 §3.16 *3.16 Services other volumes call (`@plat/hood`; V1C-04, V1C-08)* — no input / nothing to act on
* M-V01-2375-E2-one — UNTESTED — V01 §3.16 *3.16 Services other volumes call (`@plat/hood`; V1C-04, V1C-08)* — exactly one item; defined by: "**`district` and `neighbourhood` are one unit, the district a close-up opens** (J-V1.35) — the plots of the plot's district;"
* M-V01-2375-E4-degenerate — UNDEFINED — V01 §3.16 *3.16 Services other volumes call (`@plat/hood`; V1C-04, V1C-08)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-2375-E5-data — UNDEFINED — V01 §3.16 *3.16 Services other volumes call (`@plat/hood`; V1C-04, V1C-08)* — missing, empty or contradictory data (the dossier included)
* M-V01-2375-E6-rungs — UNTESTED — V01 §3.16 *3.16 Services other volumes call (`@plat/hood`; V1C-04, V1C-08)* — every rung from THORP to the METROPOLIS cap; defined by: "Pure, draw-free functions of committed state, memoised per commit, each ≤ 1 ms per call at CITY (V1-6):"
* M-V01-2414-E4-degenerate — UNDEFINED — V01 §3.17 *3.17 Item 110 inside the neighbourhood — terraces, walls, raised ways…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-4
* M-V01-2421-E1-none — UNTESTED — V01 §3.17.1 *3.17.1 The terraced ward (V1C-64; J-V1.60 – J-V1.62)* — no input / nothing to act on; defined by: "BCR-39 (c)) read one value, and none reads `District.fabric` (no cycle with S7c). 2."
* M-V01-2421-E2-one — UNTESTED — V01 §3.17.1 *3.17.1 The terraced ward (V1C-64; J-V1.60 – J-V1.62)* — exactly one item; defined by: "BCR-39 (c)) read one value, and none reads `District.fabric` (no cycle with S7c). 2."
* M-V01-2421-E4-degenerate — UNDEFINED — V01 §3.17.1 *3.17.1 The terraced ward (V1C-64; J-V1.60 – J-V1.62)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-2421-E5-data — UNTESTED — V01 §3.17.1 *3.17.1 The terraced ward (V1C-64; J-V1.60 – J-V1.62)* — missing, empty or contradictory data (the dossier included); defined by: "**The state.** `terraceState(D)` (V1-2.3) says whether D is terraced: declared (`District.terrace`, BCR-41), else the relief rows' `terracedEdges` ce…"
* M-V01-2421-E8-lifecycle — UNDEFINED — V01 §3.17.1 *3.17.1 The terraced ward (V1C-64; J-V1.60 – J-V1.62)* — save, load, undo, redo, regenerate and migrate
* M-V01-2453-E1-none — UNDEFINED — V01 §3.17.2 *3.17.2 Held walls in every re-derivation (V1C-73)* — no input / nothing to act on
* M-V01-2453-E2-one — UNDEFINED — V01 §3.17.2 *3.17.2 Held walls in every re-derivation (V1C-73)* — exactly one item
* M-V01-2453-E4-degenerate — UNDEFINED — V01 §3.17.2 *3.17.2 Held walls in every re-derivation (V1C-73)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-2453-E5-data — UNDEFINED — V01 §3.17.2 *3.17.2 Held walls in every re-derivation (V1C-73)* — missing, empty or contradictory data (the dossier included)
* M-V01-2453-E8-lifecycle — UNTESTED — V01 §3.17.2 *3.17.2 Held walls in every re-derivation (V1C-73)* — save, load, undo, redo, regenerate and migrate; defined by: "V1-3.5.12's fixed input (5), kept by every re-derivation of the district it lies in — a replace close-up, New random, a content edit's scope, an epoc…"
* M-V01-2465-E1-none — UNDEFINED — V01 §3.17.3 *3.17.3 Raised ways in the close-up (V1C-68; J-V1.65)* — no input / nothing to act on; tests seen: T-V1-51
* M-V01-2465-E2-one — UNDEFINED — V01 §3.17.3 *3.17.3 Raised ways in the close-up (V1C-68; J-V1.65)* — exactly one item; tests seen: T-V1-51
* M-V01-2465-E4-degenerate — UNDEFINED — V01 §3.17.3 *3.17.3 Raised ways in the close-up (V1C-68; J-V1.65)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-51
* M-V01-2465-E5-data — UNDEFINED — V01 §3.17.3 *3.17.3 Raised ways in the close-up (V1C-68; J-V1.65)* — missing, empty or contradictory data (the dossier included); tests seen: T-V1-51
* M-V01-2465-E6-rungs — UNDEFINED — V01 §3.17.3 *3.17.3 Raised ways in the close-up (V1C-68; J-V1.65)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V1-51
* M-V01-2493-E4-degenerate — UNDEFINED — V01 §3.17.4 *3.17.4 Raised-way land and the slot (V1C-69)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-12
* M-V01-2509-E1-none — UNDEFINED — V01 §3.17.5 *3.17.5 Removing or adding a raised way (V1C-71; J-V1.67)* — no input / nothing to act on
* M-V01-2509-E4-degenerate — UNDEFINED — V01 §3.17.5 *3.17.5 Removing or adding a raised way (V1C-71; J-V1.67)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-2509-E8-lifecycle — UNTESTED — V01 §3.17.5 *3.17.5 Removing or adding a raised way (V1C-71; J-V1.67)* — save, load, undo, redo, regenerate and migrate; defined by: "**The base's edit.** Both are the base's (item 110 (b): a removal of a generated part is an edit whose tombstone holds through regeneration)."
* M-V01-2521-E4-degenerate — UNDEFINED — V01 §3.17.6 *3.17.6 Deck plots (V1C-72; J-V1.68)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-2521-E5-data — UNTESTED — V01 §3.17.6 *3.17.6 Deck plots (V1C-72; J-V1.68)* — missing, empty or contradictory data (the dossier included); defined by: "**The owner.** A deck's plots and its placed landmarks (item 110 (d): frontage plots along the deck's way on a mole, a pier or jetty, a quay platform…"
* M-V01-2521-E8-lifecycle — UNTESTED — V01 §3.17.6 *3.17.6 Deck plots (V1C-72; J-V1.68)* — save, load, undo, redo, regenerate and migrate; defined by: "**A fallen or ruined deck.** Its plots and buildings take the base's least-disruption fates (item 110 (d)); the owner's chunk re-derives because its …"
* M-V01-2544-E4-degenerate — UNDEFINED — V01 §3.17.7 *3.17.7 Unit runs, islands and epochs (V1C-84)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-2544-E8-lifecycle — UNTESTED — V01 §3.17.7 *3.17.7 Unit runs, islands and epochs (V1C-84)* — save, load, undo, redo, regenerate and migrate; defined by: "**Epochs.** An epoch that lifts a town to CITY may generate raised ways (V06 §3.19), clearing the land under each strip itself (V06 §3.19 (7)) before…"
* M-V01-2564-E8-lifecycle — UNDEFINED — V01 §3.17.8 *3.17.8 The aqueduct's terminal (V1C-85)* — save, load, undo, redo, regenerate and migrate; tests seen: T-V1-51
* M-V01-2585-E1-none — UNTESTED — V01 §4.1 *4.1 What is edited, by which event and tool, with its effective scope* — no input / nothing to act on; defined by: "opening any area (the outline close-up) ¦ none — a view action (V1-3.8.9) ¦ the view's open gesture (rectangle, lasso, a named site;"
* M-V01-2585-E2-one — UNTESTED — V01 §4.1 *4.1 What is edited, by which event and tool, with its effective scope* — exactly one item; defined by: "a district's fabric (a layout card) ¦ one undo group:"
* M-V01-2585-E4-degenerate — UNTESTED — V01 §4.1 *4.1 What is edited, by which event and tool, with its effective scope* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); defined by: "a lone neighbourhood's outline ¦ `adjust(hood.outline, polygon)` from the outline's handles (points in, shape out, §7.1) ¦ T1 / T2 handles ¦ Re-deriv…"
* M-V01-2585-E5-data — UNTESTED — V01 §4.1 *4.1 What is edited, by which event and tool, with its effective scope* — missing, empty or contradictory data (the dossier included); defined by: "a template's parameters (plaza size, void square, quay on the water, ring jitter, through radials, street width) ¦ `setAttr(D.fabricParams.k, v)` + `…"
* M-V01-2585-E6-rungs — UNDEFINED — V01 §4.1 *4.1 What is edited, by which event and tool, with its effective scope* — every rung from THORP to the METROPOLIS cap
* M-V01-2585-E7-toggles — UNTESTED — V01 §4.1 *4.1 What is edited, by which event and tool, with its effective scope* — every toggle and preset (parity presets, every layer on and off); defined by: "B, ordinal: 'hood:<n>', op }` — `move`, `remove`, `restyle` (its `InstanceStyle.pinKind` may change the kind, BCR-34); preceded in the same group by …"
* M-V01-2585-E8-lifecycle — UNTESTED — V01 §4.1 *4.1 What is edited, by which event and tool, with its effective scope* — save, load, undo, redo, regenerate and migrate; defined by: "a district's fabric (a layout card) ¦ one undo group:"
* M-V01-2617-E7-toggles — UNTESTED — V01 §4.2 *4.2 The tool parameters (BCR-12, BCR-35)* — every toggle and preset (parity presets, every layer on and off); defined by: "With `hood` its card asks for a shape (the outline templates as thumbnails, "by the layout" — the default, V1-3.10.1 — or "draw"), a size (the chips …"
* M-V01-2639-E2-one — UNDEFINED — V01 §4.3 *4.3 Locality, stated as the oracle checks it* — exactly one item; tests seen: T-V1-15
* M-V01-2639-E7-toggles — UNDEFINED — V01 §4.3 *4.3 Locality, stated as the oracle checks it* — every toggle and preset (parity presets, every layer on and off); tests seen: T-V1-15
* M-V01-2666-E5-data — UNTESTED — V01 §4.4 *4.4 Undo and lifecycle rows (§7.4; BCR-25)* — missing, empty or contradictory data (the dossier included); defined by: "D re-derives from S8 in the grouped `regenerate` ¦ the group's undo: the attribute's former value and D's undo record (its successions reversed, §7.4…"
* M-V01-2666-E8-lifecycle — UNTESTED — V01 §4.4 *4.4 Undo and lifecycle rows (§7.4; BCR-25)* — save, load, undo, redo, regenerate and migrate; defined by: "event on stage-2 state ¦ persisted where ¦ regeneration ¦ undo ¦ migration ¦ ¦---¦---¦---¦---¦---¦"
* M-V01-2681-E4-degenerate — UNDEFINED — V01 §4.5 *4.5 The clerk's view and the "why" providers (item 101; volume 10 bui…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-37
* M-V01-2681-E6-rungs — UNDEFINED — V01 §4.5 *4.5 The clerk's view and the "why" providers (item 101; volume 10 bui…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V1-37
* M-V01-2733-E1-none — UNDEFINED — V01 §5.1 *5.1 The `hatched` family at all four bands (BCR-14)* — no input / nothing to act on
* M-V01-2733-E2-one — UNDEFINED — V01 §5.1 *5.1 The `hatched` family at all four bands (BCR-14)* — exactly one item
* M-V01-2733-E6-rungs — UNTESTED — V01 §5.1 *5.1 The `hatched` family at all four bands (BCR-14)* — every rung from THORP to the METROPOLIS cap; defined by: "The family's roles and values are §8.2's (`hatched` column); its lighting is §8.4 (h)'s (the prism pass at every rung, the night glow)."
* M-V01-2739-E1-none — UNDEFINED — V01 §5.1.1 *5.1.1 Per band* — no input / nothing to act on
* M-V01-2739-E2-one — UNTESTED — V01 §5.1.1 *5.1.1 Per band* — exactly one item; defined by: "`green` blocks, parks and wood fills in `green` / `tree`; water in `water`; walls in `wall`; one prism shadow pass under the masses (§8.4 (h)); label…"
* M-V01-2739-E4-degenerate — UNDEFINED — V01 §5.1.1 *5.1.1 Per band* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-2739-E6-rungs — UNDEFINED — V01 §5.1.1 *5.1.1 Per band* — every rung from THORP to the METROPOLIS cap
* M-V01-2753-E1-none — UNTESTED — V01 §5.1.2 *5.1.2 The programs* — no input / nothing to act on; defined by: "Each line's two crossings with its facet's boundary each carry one filled tapered triangle, base one stroke width (0.5 px at 1×) on the crossing, poi…"
* M-V01-2753-E2-one — UNTESTED — V01 §5.1.2 *5.1.2 The programs* — exactly one item; defined by: "The hatch runs **per roof facet** of the sheet's `roofConstruction`: under `fakeGablePerWing` (every sheet before stage 3 registers, and the NG parit…"
* M-V01-2753-E4-degenerate — UNDEFINED — V01 §5.1.2 *5.1.2 The programs* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-2753-E5-data — UNTESTED — V01 §5.1.2 *5.1.2 The programs* — missing, empty or contradictory data (the dossier included); defined by: "Lines at a **world pitch** `hatch.pitchM` — a model length, as Neighbourhood's spacing is (`code-neighbourhood.md` §2.11), so a facet has the same li…"
* M-V01-2753-E6-rungs — UNDEFINED — V01 §5.1.2 *5.1.2 The programs* — every rung from THORP to the METROPOLIS cap
* M-V01-2753-E7-toggles — UNTESTED — V01 §5.1.2 *5.1.2 The programs* — every toggle and preset (parity presets, every layer on and off); defined by: "NG 1.2.2 scales its roof colour by a power of two, provenance `ref:NG 1.2.2 roof tone (code)`), clamped per channel; so terraces read as separate hou…"
* M-V01-2753-E8-lifecycle — UNDEFINED — V01 §5.1.2 *5.1.2 The programs* — save, load, undo, redo, regenerate and migrate
* M-V01-2850-E1-none — UNDEFINED — V01 §5.1.3 *5.1.3 Layer order at the neighbourhood and building bands (`hatched`)* — no input / nothing to act on
* M-V01-2850-E2-one — UNDEFINED — V01 §5.1.3 *5.1.3 Layer order at the neighbourhood and building bands (`hatched`)* — exactly one item
* M-V01-2850-E6-rungs — UNDEFINED — V01 §5.1.3 *5.1.3 Layer order at the neighbourhood and building bands (`hatched`)* — every rung from THORP to the METROPOLIS cap
* M-V01-2850-E7-toggles — UNTESTED — V01 §5.1.3 *5.1.3 Layer order at the neighbourhood and building bands (`hatched`)* — every toggle and preset (parity presets, every layer on and off); defined by: "`hatched`'s city and district bands take the shared list, and its neighbourhood and building bands take this one, of which NG 1.2.2's order (greens →…"
* M-V01-2922-E5-data — UNTESTED — V01 §5.2.1 *5.2.1 The hood title* — missing, empty or contradictory data (the dossier included); defined by: "It is view data (never model, never hashed) — except in a **district export**, whose title is the export's title label (§9.5), and in a **standalone*…"
* M-V01-2932-E6-rungs — UNDEFINED — V01 §5.2.2 *5.2.2 Place labels* — every rung from THORP to the METROPOLIS cap
* M-V01-2951-E1-none — UNDEFINED — V01 §5.3 *5.3 Exports* — no input / nothing to act on
* M-V01-2951-E4-degenerate — UNDEFINED — V01 §5.3 *5.3 Exports* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V01-2951-E6-rungs — UNDEFINED — V01 §5.3 *5.3 Exports* — every rung from THORP to the METROPOLIS cap
* M-V01-2951-E7-toggles — UNTESTED — V01 §5.3 *5.3 Exports* — every toggle and preset (parity presets, every layer on and off); defined by: "VTT (scene JSON, `.dd2vtt`) ¦ scope a district or a rectangle (§11.1); the scene image drawn with the close-up; walls from footprints and boundary tr…"
* M-V01-2951-E8-lifecycle — UNDEFINED — V01 §5.3 *5.3 Exports* — save, load, undo, redo, regenerate and migrate

### V02

* M-V02-529-E5-data — UNDEFINED — V02 §2.2 *2.2 The composition's records (lazy; stored only when edited)* — missing, empty or contradictory data (the dossier included)
* M-V02-658-E5-data — UNDEFINED — V02 §2.4 *2.4 Derived at read (never stored)* — missing, empty or contradictory data (the dossier included)
* M-V02-875-E6-rungs — UNDEFINED — V02 §3.1 *3.1 Where stage 3 runs* — every rung from THORP to the METROPOLIS cap; tests seen: T-V2-26
* M-V02-894-E4-degenerate — UNDEFINED — V02 §3.2 *3.2 The row a building reads, and its band* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V2-25, T-V2-26, T-V2-33, T-V2-38
* M-V02-956-E4-degenerate — UNDEFINED — V02 §3.3 *3.3 The massing families — the vocabulary of plans* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: V02-0288
* M-V02-989-E4-degenerate — UNDEFINED — V02 §3.4 *3.4 Fitting to the plot — the frame and the region* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V2-1
* M-V02-989-E5-data — UNDEFINED — V02 §3.4 *3.4 Fitting to the plot — the frame and the region* — missing, empty or contradictory data (the dossier included); tests seen: T-V2-1
* M-V02-1015-E1-none — UNTESTED — V02 §3.5 *3.5 The massing — `outline()`, step by step* — no input / nothing to act on; defined by: "`outline(input, k)` is **the add step of V2 §3.9 from the empty design** (the base's "one path", §4.7 S11 step 7): a generation run and a later mutat…"
* M-V02-1015-E2-one — UNTESTED — V02 §3.5 *3.5 The massing — `outline()`, step by step* — exactly one item; defined by: "`outline(input, k)` is **the add step of V2 §3.9 from the empty design** (the base's "one path", §4.7 S11 step 7): a generation run and a later mutat…"
* M-V02-1015-E3-cap — UNTESTED — V02 §3.5 *3.5 The massing — `outline()`, step by step* — the maximum and its caps; defined by: "*Budget (J-V2.35):* the family's **least footprint** `Amin` (closed form, at `w₀`, the row's least lengths and `courtMinM`;"
* M-V02-1015-E4-degenerate — UNTESTED — V02 §3.5 *3.5 The massing — `outline()`, step by step* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); defined by: "`gridWalk`: a `g × g` grid (`g = gridCells`, 4) fitted to `Rr` with pitch `p = min(W, D)/g`, required `p ≥ w + max(walkGapM, 0.3w)` (else `g` drops b…"
* M-V02-1015-E5-data — UNTESTED — V02 §3.5 *3.5 The massing — `outline()`, step by step* — missing, empty or contradictory data (the dossier included); defined by: "`frontage` (the default):"
* M-V02-1015-E6-rungs — UNTESTED — V02 §3.5 *3.5 The massing — `outline()`, step by step* — every rung from THORP to the METROPOLIS cap; defined by: "Every rung past 0 is counted per class in the generation report; no building is refused, and no retry reaches beyond the building."
* M-V02-1015-E7-toggles — UNTESTED — V02 §3.5 *3.5 The massing — `outline()`, step by step* — every toggle and preset (parity presets, every layer on and off); defined by: "`sunBias` is 0.7 (own, `extension`) and 0.5 in the `MFCG`, `FTG`, `VG` and `FM` presets (reconciliation round 4, SCC-85: each zeroing preset carries …"
* M-V02-1361-E1-none — UNTESTED — V02 §3.6 *3.6 The composer — `compose()`, the `wings` rung* — no input / nothing to act on; defined by: "Nothing the composer makes is model data until an edit stores it (V2 §4)."
* M-V02-1361-E2-one — UNTESTED — V02 §3.6 *3.6 The composer — `compose()`, the `wings` rung* — exactly one item; defined by: "**Composed wings and towers, one to one.** One `Wing { base }` per base wing that is not a tower or turret, in key order; one `ComposedTower { base }…"
* M-V02-1361-E4-degenerate — UNDEFINED — V02 §3.6 *3.6 The composer — `compose()`, the `wings` rung* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V02-1361-E5-data — UNDEFINED — V02 §3.6 *3.6 The composer — `compose()`, the `wings` rung* — missing, empty or contradictory data (the dossier included)
* M-V02-1379-E4-degenerate — UNDEFINED — V02 §3.7 *3.7 Façade bays, dormers, the entrance gable and the porch* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V2-13
* M-V02-1379-E6-rungs — UNDEFINED — V02 §3.7 *3.7 Façade bays, dormers, the entrance gable and the porch* — every rung from THORP to the METROPOLIS cap; tests seen: T-V2-13
* M-V02-1469-E4-degenerate — UNDEFINED — V02 §3.8 *3.8 The `rooms` rung — the composer's principal rooms* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V2-35
* M-V02-1469-E6-rungs — UNDEFINED — V02 §3.8 *3.8 The `rooms` rung — the composer's principal rooms* — every rung from THORP to the METROPOLIS cap; tests seen: T-V2-35
* M-V02-1521-E4-degenerate — UNDEFINED — V02 §3.9 *3.9 Mutation — the wing step of the designation mutator (item 18)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V2-15
* M-V02-1521-E6-rungs — UNDEFINED — V02 §3.9 *3.9 Mutation — the wing step of the designation mutator (item 18)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V2-15
* M-V02-2029-E4-degenerate — UNDEFINED — V02 §3.11 *3.11 Elaboration by click, staleness and the canonical prior* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V2-14, T-V2-21
* M-V02-2029-E6-rungs — UNDEFINED — V02 §3.11 *3.11 Elaboration by click, staleness and the canonical prior* — every rung from THORP to the METROPOLIS cap; tests seen: T-V2-14, T-V2-21
* M-V02-2065-E4-degenerate — UNDEFINED — V02 §3.12 *3.12 Determinism* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V2-13
* M-V02-2065-E5-data — UNDEFINED — V02 §3.12 *3.12 Determinism* — missing, empty or contradictory data (the dossier included); tests seen: T-V2-13
* M-V02-2117-E4-degenerate — UNDEFINED — V02 §3.14 *3.14 The owner's rules of 2026-09-28 at the building (file g, items 1…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V2-36, T-V2-39, T-V2-40, T-V2-53
* M-V02-2117-E6-rungs — UNDEFINED — V02 §3.14 *3.14 The owner's rules of 2026-09-28 at the building (file g, items 1…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V2-36, T-V2-39, T-V2-40, T-V2-53
* M-V02-2201-E6-rungs — UNDEFINED — V02 §3.15 *3.15 Stepped massing — the `stepped` family (item 110 (c); item 110 f…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V2-44, T-V2-46, T-V2-50, T29-4
* M-V02-2428-E4-degenerate — UNDEFINED — V02 §3.16 *3.16 Buildings on moles, jetties, quay platforms and bridge decks (it…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-21
* M-V02-2428-E6-rungs — UNDEFINED — V02 §3.16 *3.16 Buildings on moles, jetties, quay platforms and bridge decks (it…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V1-21
* M-V02-2481-E4-degenerate — UNDEFINED — V02 §3.17 *3.17 The rest of item 110 at the building — retaining walls, raised w…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V2-42, T-V2-44, T-V2-47, T-V2-51
* M-V02-2519-E1-none — UNTESTED — V02 §4.1 *4.1 The declarations — two event kinds under T9 `shape` (BCR-V2-12)* — no input / nothing to act on; defined by: "**Draws (J-V2.18, as V2 §3.12 states once):** the geometric ops draw nothing — a default an op leaves out is the row's deterministic central value (t…"
* M-V02-2519-E2-one — UNTESTED — V02 §4.1 *4.1 The declarations — two event kinds under T9 `shape` (BCR-V2-12)* — exactly one item; defined by: "The building tool T9 `shape` (L3) gains parameters, each an existing event or one of two new event kinds; a new building is still T6 `place` / `build…"
* M-V02-2519-E4-degenerate — UNDEFINED — V02 §4.1 *4.1 The declarations — two event kinds under T9 `shape` (BCR-V2-12)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V02-2519-E8-lifecycle — UNTESTED — V02 §4.1 *4.1 The declarations — two event kinds under T9 `shape` (BCR-V2-12)* — save, load, undo, redo, regenerate and migrate; defined by: "A lock on `wings/<key>` (an attribute-level lock, §7.2) holds that wing against every mutation, re-derivation and edit of another wing."
* M-V02-2608-E1-none — UNTESTED — V02 §4.3 *4.3 What each `setComposition` does* — no input / nothing to act on; defined by: "S23-40); turning a room on where no host admits it **bends** (second revision, V2C-47; item 101 R2): a gate hall without a `gate` range becomes a **g…"
* M-V02-2608-E5-data — UNTESTED — V02 §4.3 *4.3 What each `setComposition` does* — missing, empty or contradictory data (the dossier included); defined by: "`room`: turns the hall, the gate hall or the chapel on or off and sets its extent along its host's ridge, bent to the nearest lawful extent by V2 §3.…"
* M-V02-2608-E6-rungs — UNDEFINED — V02 §4.3 *4.3 What each `setComposition` does* — every rung from THORP to the METROPOLIS cap
* M-V02-2608-E8-lifecycle — UNTESTED — V02 §4.3 *4.3 What each `setComposition` does* — save, load, undo, redo, regenerate and migrate; defined by: "`room`: turns the hall, the gate hall or the chapel on or off and sets its extent along its host's ridge, bent to the nearest lawful extent by V2 §3.…"
* M-V02-2629-E2-one — UNTESTED — V02 §4.4 *4.4 The lifecycle rows (for §7.4's table; BCR-V2-12)* — exactly one item; defined by: "`setComposition` ¦ T9 `shape` at the building band; the clerk ¦ the stored composition's dormer rows, porch, secondary porch and edited rooms ¦ log; …"
* M-V02-2629-E5-data — UNTESTED — V02 §4.4 *4.4 The lifecycle rows (for §7.4's table; BCR-V2-12)* — missing, empty or contradictory data (the dossier included); defined by: "`setMassing` ¦ T9 `shape` handles and family picker at the building band; the clerk's `shape` call; a skeleton file line ¦ `Building.wings` (roles, k…"
* M-V02-2629-E6-rungs — UNDEFINED — V02 §4.4 *4.4 The lifecycle rows (for §7.4's table; BCR-V2-12)* — every rung from THORP to the METROPOLIS cap
* M-V02-2629-E8-lifecycle — UNTESTED — V02 §4.4 *4.4 The lifecycle rows (for §7.4's table; BCR-V2-12)* — save, load, undo, redo, regenerate and migrate; defined by: "kind ¦ create ¦ read ¦ persist ¦ regenerate (how the engine honours it) ¦ undo ¦ migrate ¦ ¦---¦---¦---¦---¦---¦---¦---¦"
* M-V02-2647-E4-degenerate — UNDEFINED — V02 §4.5 *4.5 The canvas, the clerk and the skeleton file* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V2-43
* M-V02-2647-E5-data — UNDEFINED — V02 §4.5 *4.5 The canvas, the clerk and the skeleton file* — missing, empty or contradictory data (the dossier included); tests seen: T-V2-43
* M-V02-2647-E6-rungs — UNDEFINED — V02 §4.5 *4.5 The canvas, the clerk and the skeleton file* — every rung from THORP to the METROPOLIS cap; tests seen: T-V2-43
* M-V02-2647-E8-lifecycle — UNDEFINED — V02 §4.5 *4.5 The canvas, the clerk and the skeleton file* — save, load, undo, redo, regenerate and migrate; tests seen: T-V2-43
* M-V02-2683-E4-degenerate — UNDEFINED — V02 §4.6 *4.6 Editing stacks and deck buildings (item 110 fold; rewritten by th…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V2-48, T-V2-49
* M-V02-2803-E1-none — UNTESTED — V02 §5.1 *5.1 What each band draws (§8.5's bands, with stage 3)* — no input / nothing to act on; defined by: "**neighbourhood** ¦ the district band's, plus — where the building's `wings` rung is current or stored — dormers, the entrance gable, the porch, and …"
* M-V02-2803-E2-one — UNDEFINED — V02 §5.1 *5.1 What each band draws (§8.5's bands, with stage 3)* — exactly one item
* M-V02-2803-E6-rungs — UNDEFINED — V02 §5.1 *5.1 What each band draws (§8.5's bands, with stage 3)* — every rung from THORP to the METROPOLIS cap
* M-V02-2821-E4-degenerate — UNDEFINED — V02 §5.2 *5.2 The roofscape — one roof plan per building (BCR-V2-15)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V2-10, T-V2-8, T-V2-9
* M-V02-2821-E6-rungs — UNDEFINED — V02 §5.2 *5.2 The roofscape — one roof plan per building (BCR-V2-15)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V2-10, T-V2-8, T-V2-9
* M-V02-2897-E1-none — UNDEFINED — V02 §5.3 *5.3 Style rows and paint programs* — no input / nothing to act on; tests seen: T-V2-1, T-V2-2, T-V2-44
* M-V02-2897-E6-rungs — UNDEFINED — V02 §5.3 *5.3 Style rows and paint programs* — every rung from THORP to the METROPOLIS cap; tests seen: T-V2-1, T-V2-2, T-V2-44
* M-V02-2936-E4-degenerate — UNDEFINED — V02 §5.5 *5.5 Exports (BCR-V2-21)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V2-24
* M-V02-2936-E6-rungs — UNDEFINED — V02 §5.5 *5.5 Exports (BCR-V2-21)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V2-24
* M-V02-2936-E7-toggles — UNDEFINED — V02 §5.5 *5.5 Exports (BCR-V2-21)* — every toggle and preset (parity presets, every layer on and off); tests seen: T-V2-24
* M-V02-2936-E8-lifecycle — UNDEFINED — V02 §5.5 *5.5 Exports (BCR-V2-21)* — save, load, undo, redo, regenerate and migrate; tests seen: T-V2-24
* M-V02-2947-E1-none — UNTESTED — V02 §5.6 *5.6 Stacks, stairs and deck buildings on the map (item 110 fold)* — no input / nothing to act on; defined by: "District band and finer: the roofscape with the stack's occlusion and order (V2 §5.2 steps 4 and 6) — terraces as flat facets with their parapet line…"
* M-V02-2947-E2-one — UNDEFINED — V02 §5.6 *5.6 Stacks, stairs and deck buildings on the map (item 110 fold)* — exactly one item
* M-V02-2947-E4-degenerate — UNDEFINED — V02 §5.6 *5.6 Stacks, stairs and deck buildings on the map (item 110 fold)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V02-2947-E5-data — UNDEFINED — V02 §5.6 *5.6 Stacks, stairs and deck buildings on the map (item 110 fold)* — missing, empty or contradictory data (the dossier included)
* M-V02-2947-E6-rungs — UNDEFINED — V02 §5.6 *5.6 Stacks, stairs and deck buildings on the map (item 110 fold)* — every rung from THORP to the METROPOLIS cap
* M-V02-2947-E7-toggles — UNTESTED — V02 §5.6 *5.6 Stacks, stairs and deck buildings on the map (item 110 fold)* — every toggle and preset (parity presets, every layer on and off); defined by: "* **The per-wing constructions** (the parity presets' sheets, and the base outline builder's drawing from M3a until the roofscape lands at M6a): a wi…"

### V03

* M-V03-445-E5-data — UNDEFINED — V03 §2.1 *2.1 Record additions (typed; applied by BCR-V3-2 and the BCRs named)* — missing, empty or contradictory data (the dossier included); tests seen: T-V3-34
* M-V03-535-E5-data — UNTESTED — V03 §2.2 *2.2 Identity of the plan's parts* — missing, empty or contradictory data (the dossier included); defined by: "furniture ¦ `furn:<room id>/<ordinal>` ¦ F3 (3.8), `instance` ¦ its room's id and ordinal; an item whose room is re-cut away is re-placed by F1–F4 (u…"
* M-V03-1032-E1-none — UNTESTED — V03 §3.1 *3.1 One derivation, in order* — no input / nothing to act on; defined by: "A building with no storeyed wing has no level at or above the ground and no room there (S6's `solidMonument`): where it has a basement (a crypt-only …"
* M-V03-1032-E2-one — UNTESTED — V03 §3.1 *3.1 One derivation, in order* — exactly one item; defined by: "A building with no storeyed wing has no level at or above the ground and no room there (S6's `solidMonument`): where it has a basement (a crypt-only …"
* M-V03-1032-E5-data — UNTESTED — V03 §3.1 *3.1 One derivation, in order* — missing, empty or contradictory data (the dossier included); defined by: "S23-34) and the table slices, nothing else; the only draws are the four `plan.*` streams at the creation indices of 3.10."
* M-V03-1372-E1-none — UNTESTED — V03 §3.4 *3.4 Seed pieces per storey* — no input / nothing to act on; defined by: "Per §2.6 steps 1 and 4: the extents of the wings reaching the storey (a wing reaches the levels of volume 2's `storeyRange`, a solid wing none — 3.3'…"
* M-V03-1372-E2-one — UNDEFINED — V03 §3.4 *3.4 Seed pieces per storey* — exactly one item
* M-V03-1372-E4-degenerate — UNDEFINED — V03 §3.4 *3.4 Seed pieces per storey* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V03-1384-E1-none — UNTESTED — V03 §3.4a *3.4a Roof terraces (item 110 (c) "a flat roof or a shrine on the top …* — no input / nothing to act on; defined by: "* **Its level.** `T(x)` belongs to level `s₀(y)` of the storeyed wing `y` standing on `x`, whose floor is `deckLevel(x)`; with none, to `storeyRange(…"
* M-V03-1384-E4-degenerate — UNDEFINED — V03 §3.4a *3.4a Roof terraces (item 110 (c) "a flat roof or a shrine on the top …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V03-1384-E8-lifecycle — UNDEFINED — V03 §3.4a *3.4a Roof terraces (item 110 (c) "a flat roof or a shrine on the top …* — save, load, undo, redo, regenerate and migrate
* M-V03-1497-E4-degenerate — UNDEFINED — V03 §3.6 *3.6 Openings — doors, unit entries, loops, windows, dormers* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V3-34, T28-2
* M-V03-1497-E6-rungs — UNDEFINED — V03 §3.6 *3.6 Openings — doors, unit entries, loops, windows, dormers* — every rung from THORP to the METROPOLIS cap; tests seen: T-V3-34, T28-2
* M-V03-1636-E6-rungs — UNDEFINED — V03 §3.7 *3.7 Basements, the crypt and the heads of the ways down* — every rung from THORP to the METROPOLIS cap; tests seen: T-V1-47, T-V3-23, T28-2, T28-3
* M-V03-1921-E1-none — UNTESTED — V03 §3.8 *3.8 Furnishing* — no input / nothing to act on; defined by: "The glyphs are the role's list filtered by each row's `band` (absent: every band);"
* M-V03-1921-E2-one — UNDEFINED — V03 §3.8 *3.8 Furnishing* — exactly one item
* M-V03-1921-E4-degenerate — UNDEFINED — V03 §3.8 *3.8 Furnishing* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V03-1921-E5-data — UNTESTED — V03 §3.8 *3.8 Furnishing* — missing, empty or contradictory data (the dossier included); defined by: "The glyphs are the role's list filtered by each row's `band` (absent: every band);"
* M-V03-1921-E6-rungs — UNDEFINED — V03 §3.8 *3.8 Furnishing* — every rung from THORP to the METROPOLIS cap
* M-V03-1945-E4-degenerate — UNDEFINED — V03 §3.9 *3.9 Failure handling — every step's failure, on F-PLAN's ladder (§5.2)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V3-17
* M-V03-1988-E1-none — UNDEFINED — V03 §3.10 *3.10 Determinism* — no input / nothing to act on; tests seen: T-V3-20
* M-V03-1988-E2-one — UNDEFINED — V03 §3.10 *3.10 Determinism* — exactly one item; tests seen: T-V3-20
* M-V03-2008-E4-degenerate — UNDEFINED — V03 §3.11 *3.11 Re-cuts — the chain steps, the kept-room test and the kept openi…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V3-9
* M-V03-2030-E1-none — UNTESTED — V03 §3.12 *3.12 Buildings below ground* — no input / nothing to act on; defined by: "**No basement**: 3.7.1, 3.7.4–3.7.7 do not run; a head it hosts (none by volume 4's rules) would be headed on level 0. 2."
* M-V03-2030-E2-one — UNTESTED — V03 §3.12 *3.12 Buildings below ground* — exactly one item; defined by: "W1–W3 run on it (windows in the arch's infill, bays by W2 — volume 2's `facadeBays` on that side — along the span, `outsideCm` the ground under the s…"
* M-V03-2030-E4-degenerate — UNDEFINED — V03 §3.12 *3.12 Buildings below ground* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V03-2030-E5-data — UNTESTED — V03 §3.12 *3.12 Buildings below ground* — missing, empty or contradictory data (the dossier included); defined by: "A building whose `ContextVector.arena` is `underground` — a sewer-front dwelling (II.7.3), an undercity building (II.7.5), a dwelling in a cavern or …"
* M-V03-2030-E8-lifecycle — UNTESTED — V03 §3.12 *3.12 Buildings below ground* — save, load, undo, redo, regenerate and migrate; defined by: "Removing a raised way — a user's removal of a generated one holds through regeneration (item 110 (b)) — takes its vault chambers and their buildings …"
* M-V03-2075-E8-lifecycle — UNTESTED — V03 §4.1 *4.1 The declarations — item 101's vocabulary, no new tool* — save, load, undo, redo, regenerate and migrate; defined by: "T10 `hold` ¦ `lock` on `plan/rooms/<id>` (a room kept through every re-cut), `regenerate` with `rung` (`plan`, `plan.layout`, `plan.roles`, `plan.fur…"
* M-V03-2091-E4-degenerate — UNDEFINED — V03 §4.2 *4.2 The edits the plan needs, each with its semantics and its bend* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V3-20
* M-V03-2183-E4-degenerate — UNDEFINED — V03 §4.3 *4.3 Locality, stored plans, carries, New random and undo* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T28-7
* M-V03-2223-E1-none — UNTESTED — V03 §4.5 *4.5 The click, the storey switcher and the plan panel — the viewer's …* — no input / nothing to act on; defined by: "`absent` — the wings draw, the panel offers "Show plan";"
* M-V03-2223-E2-one — UNTESTED — V03 §4.5 *4.5 The click, the storey switcher and the plan panel — the viewer's …* — exactly one item; defined by: "V3C-65 (3), V3C-66 (5)): a vertical radio group beside the building, accessible name "Storey", one option per storeyed level (−k … n) and per walkabl…"
* M-V03-2223-E4-degenerate — UNDEFINED — V03 §4.5 *4.5 The click, the storey switcher and the plan panel — the viewer's …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V03-2223-E5-data — UNTESTED — V03 §4.5 *4.5 The click, the storey switcher and the plan panel — the viewer's …* — missing, empty or contradictory data (the dossier included); defined by: "`absent` — the wings draw, the panel offers "Show plan";"
* M-V03-2223-E6-rungs — UNDEFINED — V03 §4.5 *4.5 The click, the storey switcher and the plan panel — the viewer's …* — every rung from THORP to the METROPOLIS cap
* M-V03-2223-E8-lifecycle — UNTESTED — V03 §4.5 *4.5 The click, the storey switcher and the plan panel — the viewer's …* — save, load, undo, redo, regenerate and migrate; defined by: "`stale` — the cached plan draws under §8.5's marker, the panel says what changed (the input group whose digest moved: households, band, use, wings, a…"
* M-V03-2268-E1-none — UNTESTED — V03 §4.6 *4.6 The clerk's view — plan queries and "why?"* — no input / nothing to act on; defined by: "Id; storey?: number }` returns the plan's storeys as §11.1's JSON `plan` block, derived first — `wings`, then `rooms`, then `plan`, each where absent…"
* M-V03-2268-E2-one — UNDEFINED — V03 §4.6 *4.6 The clerk's view — plan queries and "why?"* — exactly one item
* M-V03-2268-E5-data — UNTESTED — V03 §4.6 *4.6 The clerk's view — plan queries and "why?"* — missing, empty or contradictory data (the dossier included); defined by: "Id; storey?: number }` returns the plan's storeys as §11.1's JSON `plan` block, derived first — `wings`, then `rooms`, then `plan`, each where absent…"
* M-V03-2268-E8-lifecycle — UNDEFINED — V03 §4.6 *4.6 The clerk's view — plan queries and "why?"* — save, load, undo, redo, regenerate and migrate
* M-V03-2295-E1-none — UNTESTED — V03 §5.1 *5.1 The plan at the building band* — no input / nothing to act on; defined by: "J-V3.56), by the `PlanGeometryRow.view` stops: from the threshold to coarser than 1:350 — walls by kind, openings as gaps, the heads as solid symbols…"
* M-V03-2295-E2-one — UNTESTED — V03 §5.1 *5.1 The plan at the building band* — exactly one item; defined by: "The building band's threshold is the stop nearest 1:700 (entered there, left one stop coarser, §8.5's hysteresis;"
* M-V03-2295-E4-degenerate — UNDEFINED — V03 §5.1 *5.1 The plan at the building band* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V03-2295-E5-data — UNTESTED — V03 §5.1 *5.1 The plan at the building band* — missing, empty or contradictory data (the dossier included); defined by: "A room's label is its `name` where set, else its role's display text from the setting pack (§10.4), in §9.4's room-label range (5–9 px); a unit room …"
* M-V03-2295-E6-rungs — UNDEFINED — V03 §5.1 *5.1 The plan at the building band* — every rung from THORP to the METROPOLIS cap
* M-V03-2360-E1-none — UNDEFINED — V03 §5.2 *5.2 Picture exports* — no input / nothing to act on
* M-V03-2369-E1-none — UNTESTED — V03 §5.3 *5.3 Interchange and scene exports* — no input / nothing to act on; defined by: "`accesses: { id, kind, state, storey /* null for 3.7.2 (1)'s outside door */, room? /* absent then */, door? /* { wing, side, at }, present then */, …"
* M-V03-2369-E2-one — UNTESTED — V03 §5.3 *5.3 Interchange and scene exports* — exactly one item; defined by: "PointCm` where one is drawn;"
* M-V03-2369-E4-degenerate — UNDEFINED — V03 §5.3 *5.3 Interchange and scene exports* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V03-2369-E5-data — UNTESTED — V03 §5.3 *5.3 Interchange and scene exports* — missing, empty or contradictory data (the dossier included); defined by: "`accesses: { id, kind, state, storey /* null for 3.7.2 (1)'s outside door */, room? /* absent then */, door? /* { wing, side, at }, present then */, …"
* M-V03-2369-E6-rungs — UNDEFINED — V03 §5.3 *5.3 Interchange and scene exports* — every rung from THORP to the METROPOLIS cap
* M-V03-2369-E7-toggles — UNTESTED — V03 §5.3 *5.3 Interchange and scene exports* — every toggle and preset (parity presets, every layer on and off); defined by: "* **glTF (BCR-V3-7)**: an export option `interiors` (default off, so the default file and its budget are unchanged): per storey the walls extruded fr…"
* M-V03-2417-E2-one — UNDEFINED — V03 §5.4 *5.4 Concealment at a public key* — exactly one item; tests seen: T-V3-12, T-V3-14
* EI-V03-EDGE-1 — UNDEFINED (inventory V03-EDGE-1) — §3.3 storey heights and floor datums — Undefined inputs of the storey-height rule: E(w) = deckLevel(w) - heights.baseCm <= 0 or below one riser per storey (a degenerate or edited wing), and G + (n - 1) x U = 0 in the ratio; and for s < 0 'the baseCm of the ground wing above' when the basement ring spans ground wings of different baseCm (which wing's datum sets each basement storey) - no defined outcome, fallback or test (principle (11…

### V04

* M-V04-551-E5-data — UNDEFINED — V04 §2.2 *2.2 New and changed fields* — missing, empty or contradictory data (the dossier included)
* M-V04-551-E8-lifecycle — UNTESTED — V04 §2.2 *2.2 New and changed fields* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table V04 §1b (confirm this section's records have their rows)"
* M-V04-671-E5-data — UNTESTED — V04 §2.3 *2.3 New rule tables (data, editable by `editTable`, §7.6; every cell …* — missing, empty or contradictory data (the dossier included); defined by: "`NetworkRule` field ¦ default ¦ note ¦ ¦---¦---¦---¦"
* M-V04-671-E8-lifecycle — UNTESTED — V04 §2.3 *2.3 New rule tables (data, editable by `editTable`, §7.6; every cell …* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table V04 §1b (confirm this section's records have their rows)"
* M-V04-863-E5-data — UNTESTED — V04 §2.3a *2.3a The dossier's row sets (BCR-14; C4-05, C4-16)* — missing, empty or contradictory data (the dossier included); defined by: "`Black market bazaar` ¦ the core's black market use (C5), else an `undercity: 'preferred'` placement ¦ that use ¦"
* M-V04-863-E8-lifecycle — UNTESTED — V04 §2.3a *2.3a The dossier's row sets (BCR-14; C4-05, C4-16)* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table V04 §1b (confirm this section's records have their rows)"
* M-V04-892-E5-data — UNDEFINED — V04 §2.4 *2.4 Derived transients (never persisted)* — missing, empty or contradictory data (the dossier included)
* M-V04-914-E5-data — UNDEFINED — V04 §2.5 *2.5 Identity: lineage units and creation keys* — missing, empty or contradictory data (the dossier included)
* M-V04-914-E8-lifecycle — UNTESTED — V04 §2.5 *2.5 Identity: lineage units and creation keys* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table V04 §1b (confirm this section's records have their rows)"
* M-V04-953-E5-data — UNTESTED — V04 §2.6 *2.6 The lifecycle of every state field this volume adds or gives a pr…* — missing, empty or contradictory data (the dossier included); defined by: "S1's water operator after a water edit (§7.3 (b)) ¦ U-NET N2 ¦ the terrain chunk ¦ re-derived with S1's hydrology ¦ the water edit's replaced scope ¦…"
* M-V04-953-E8-lifecycle — UNTESTED — V04 §2.6 *2.6 The lifecycle of every state field this volume adds or gives a pr…* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table V04 §1b (confirm this section's records have their rows)"
* M-V04-992-E1-none — UNTESTED — V04 §3.1 *3.1 The underground tail: order, registration, scheduling* — no input / nothing to act on; defined by: "`District.outskirts` ¦ `sewer` ¦ the settlement; each building; each district; each dossier institution ¦ F-VOID, F-EDIT (none at generation) ¦"
* M-V04-992-E2-one — UNTESTED — V04 §3.1 *3.1 The underground tail: order, registration, scheduling* — exactly one item; defined by: "No quarry, generated or forced vault or buried town is laid, and U-FORECAST's P5 and P7 forecast only the kinds this set lays: a ruin, a cavern and t…"
* M-V04-992-E3-cap — UNTESTED — V04 §3.1 *3.1 The underground tail: order, registration, scheduling* — the maximum and its caps; defined by: "In a hood document U-FORECAST runs after the one-district allocation, not before S7b (5), and P7's cap reads that allocation's poorest-band household…"
* M-V04-992-E4-degenerate — UNDEFINED — V04 §3.1 *3.1 The underground tail: order, registration, scheduling* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V04-992-E5-data — UNTESTED — V04 §3.1 *3.1 The underground tail: order, registration, scheduling* — missing, empty or contradictory data (the dossier included); defined by: "**A standalone neighbourhood document (volume 1, V1-3.10.1 step 6 and (7);"
* M-V04-992-E6-rungs — UNTESTED — V04 §3.1 *3.1 The underground tail: order, registration, scheduling* — every rung from THORP to the METROPOLIS cap; defined by: "T2b ¦ U-ACCESS the access pass (V4 §3.5.7) ¦ every part; ground buildings with their footprints, basements and `Basement.crypt` (read); the foundatio…"
* M-V04-992-E7-toggles — UNTESTED — V04 §3.1 *3.1 The underground tail: order, registration, scheduling* — every toggle and preset (parity presets, every layer on and off); defined by: "`NetworkRule`, `TunnelProfileRow`, the connection table (II.7.1); the family and preset controls; the creation prefix's tunnels (V4 §4.7) ¦ the `sewe…"
* M-V04-992-E8-lifecycle — UNTESTED — V04 §3.1 *3.1 The underground tail: order, registration, scheduling* — save, load, undo, redo, regenerate and migrate; defined by: "J-V4.90).** At a village rung, a system that an earlier, larger rung left (V07's hand-off down) — the sewer network, a catacomb, a quarry, vaults or …"
* M-V04-1051-E6-rungs — UNDEFINED — V04 §3.2 *3.2 U-NET — the sewer network by medieval rules* — every rung from THORP to the METROPOLIS cap; tests seen: T-V4-67
* M-V04-1228-E1-none — UNTESTED — V04 §3.3 *3.3 U-FORECAST — what S7b needs before any tunnel exists (J-V4.13; fi…* — no input / nothing to act on; defined by: "* **vaults** by the part-0 bridges and steep ways present (exact), and the **forced vaults** under `require` (V4 §3.5.6) by their law (exact) — never…"
* M-V04-1228-E2-one — UNTESTED — V04 §3.3 *3.3 U-FORECAST — what S7b needs before any tunnel exists (J-V4.13; fi…* — exactly one item; defined by: "P6 runs at TOWN and above; in a hood document (V4 §3.1's hood line) P5 and P7 forecast a ruin, a cavern and at most one catacomb only. 1."
* M-V04-1228-E3-cap — UNTESTED — V04 §3.3 *3.3 U-FORECAST — what S7b needs before any tunnel exists (J-V4.13; fi…* — the maximum and its caps; defined by: "S7b (6) and (7) cap the underground and undercity allocations by predicted capacities (II.7.3, II.7.5); the base states the prediction for street-fol…"
* M-V04-1228-E4-degenerate — UNDEFINED — V04 §3.3 *3.3 U-FORECAST — what S7b needs before any tunnel exists (J-V4.13; fi…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V04-1228-E5-data — UNTESTED — V04 §3.3 *3.3 U-FORECAST — what S7b needs before any tunnel exists (J-V4.13; fi…* — missing, empty or contradictory data (the dossier included); defined by: "**P4 — the admissible share.** A way run's side strips lie under the street where `halfWidth(way) − (widthCm ÷ 2 + wallCm)` reaches the poorest band'…"
* M-V04-1228-E6-rungs — UNTESTED — V04 §3.3 *3.3 U-FORECAST — what S7b needs before any tunnel exists (J-V4.13; fi…* — every rung from THORP to the METROPOLIS cap; defined by: "P5 and P7 run at every rung for caverns and ruins and at TOWN and above for the other kinds;"
* M-V04-1228-E8-lifecycle — UNDEFINED — V04 §3.3 *3.3 U-FORECAST — what S7b needs before any tunnel exists (J-V4.13; fi…* — save, load, undo, redo, regenerate and migrate
* M-V04-1276-E1-none — UNDEFINED — V04 §3.4 *3.4 U-FRONT — the sewer-front neighbourhoods (II.7.3's rules, as step…* — no input / nothing to act on; tests seen: T-V4-41, T12-1
* M-V04-1276-E4-degenerate — UNDEFINED — V04 §3.4 *3.4 U-FRONT — the sewer-front neighbourhoods (II.7.3's rules, as step…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V4-41, T12-1
* M-V04-1276-E6-rungs — UNDEFINED — V04 §3.4 *3.4 U-FRONT — the sewer-front neighbourhoods (II.7.3's rules, as step…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V4-41, T12-1
* M-V04-1892-E1-none — UNTESTED — V04 §3.6 *3.6 U-CITY — the undercity (II.7.5's rules, as steps)* — no input / nothing to act on; defined by: "Under `require` at least one neighbourhood forms (V4 §3.5.6 lays its void where none is counted), and the first neighbourhood takes the `Underground …"
* M-V04-1892-E2-one — UNTESTED — V04 §3.6 *3.6 U-CITY — the undercity (II.7.5's rules, as steps)* — exactly one item; defined by: "Under `require` at least one neighbourhood forms (V4 §3.5.6 lays its void where none is counted), and the first neighbourhood takes the `Underground …"
* M-V04-1892-E4-degenerate — UNDEFINED — V04 §3.6 *3.6 U-CITY — the undercity (II.7.5's rules, as steps)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V04-1892-E5-data — UNTESTED — V04 §3.6 *3.6 U-CITY — the undercity (II.7.5's rules, as steps)* — missing, empty or contradictory data (the dossier included); defined by: "C4-13).** The core (`District.core`, BCR-4) is, in order: a ruin `court`, `temple` or `hall` chamber of at least `mainChamberM2` (an ancient forum is…"
* M-V04-1892-E6-rungs — UNDEFINED — V04 §3.6 *3.6 U-CITY — the undercity (II.7.5's rules, as steps)* — every rung from THORP to the METROPOLIS cap
* M-V04-1892-E8-lifecycle — UNDEFINED — V04 §3.6 *3.6 U-CITY — the undercity (II.7.5's rules, as steps)* — save, load, undo, redo, regenerate and migrate
* M-V04-1962-E5-data — UNDEFINED — V04 §3.6a *3.6a The cross-arena distance (items 103, 105, 107; II.7.5 (3); C4-15…* — missing, empty or contradictory data (the dossier included); tests seen: T-V4-60
* M-V04-1981-E4-degenerate — UNDEFINED — V04 §3.7 *3.7 U-LINK — the connection stage (II.7.6's rules, as steps)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V4-34
* M-V04-1981-E6-rungs — UNDEFINED — V04 §3.7 *3.7 U-LINK — the connection stage (II.7.6's rules, as steps)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V4-34
* M-V04-1981-E8-lifecycle — UNDEFINED — V04 §3.7 *3.7 U-LINK — the connection stage (II.7.6's rules, as steps)* — save, load, undo, redo, regenerate and migrate; tests seen: T-V4-34
* M-V04-2025-E1-none — UNDEFINED — V04 §3.7a *3.7a T8 — U-RECONCILE, the tail's only writer of ground uses and hous…* — no input / nothing to act on; tests seen: T-V4-3, T12-1
* M-V04-2025-E2-one — UNDEFINED — V04 §3.7a *3.7a T8 — U-RECONCILE, the tail's only writer of ground uses and hous…* — exactly one item; tests seen: T-V4-3, T12-1
* M-V04-2025-E4-degenerate — UNDEFINED — V04 §3.7a *3.7a T8 — U-RECONCILE, the tail's only writer of ground uses and hous…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V4-3, T12-1
* M-V04-2025-E6-rungs — UNDEFINED — V04 §3.7a *3.7a T8 — U-RECONCILE, the tail's only writer of ground uses and hous…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V4-3, T12-1
* M-V04-2041-E1-none — UNTESTED — V04 §3.8 *3.8 U-DIG — the pieces an access generates (II.7.6's seven steps, as …* — no input / nothing to act on; defined by: "* **The minimal system.** Where nothing lies within `digReachM`, the outlet row's first kind with a candidate within `2 × digReachM` — another cellar…"
* M-V04-2041-E2-one — UNTESTED — V04 §3.8 *3.8 U-DIG — the pieces an access generates (II.7.6's seven steps, as …* — exactly one item; defined by: "The buildings **above the cluster** are the ground buildings (ground part 0; never a raised-way pier, C4-110-5) that §3.5.7 (d)'s geometry admits ove…"
* M-V04-2041-E4-degenerate — UNTESTED — V04 §3.8 *3.8 U-DIG — the pieces an access generates (II.7.6's seven steps, as …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); defined by: "The path's cell centres are simplified (Visvalingam at `minEdge`) and snapped."
* M-V04-2041-E5-data — UNTESTED — V04 §3.8 *3.8 U-DIG — the pieces an access generates (II.7.6's seven steps, as …* — missing, empty or contradictory data (the dossier included); defined by: "They are ordered by that plan distance, then address, and the first digs: its target that element (a `reused` piece of the closure record); its piece…"
* M-V04-2041-E6-rungs — UNDEFINED — V04 §3.8 *3.8 U-DIG — the pieces an access generates (II.7.6's seven steps, as …* — every rung from THORP to the METROPOLIS cap
* M-V04-2041-E8-lifecycle — UNTESTED — V04 §3.8 *3.8 U-DIG — the pieces an access generates (II.7.6's seven steps, as …* — save, load, undo, redo, regenerate and migrate; defined by: "Generated pieces re-derive with their owner (the neighbourhood's New random; the institution's relocation); edit-made pieces are held (§7.3 item 9 (c…"
* M-V04-2110-E1-none — UNTESTED — V04 §3.9 *3.9 Light underground — the rows (item 68 (d′); J-V4.33; C4-28, C4-60)* — no input / nothing to act on; defined by: "`magic` is the row's admitted circumstance values (BCR-39 lets it include `'none'`); a row with no `magic` field lights under every value."
* M-V04-2110-E2-one — UNTESTED — V04 §3.9 *3.9 Light underground — the rows (item 68 (d′); J-V4.33; C4-28, C4-60)* — exactly one item; defined by: "sewer, void dwellings (F6) ¦ `door` ¦ the band's fuel, fire (below) ¦ 170 ¦ 6 ¦ 500 ¦ 3 ¦ one per entrance ¦ — ¦"
* M-V04-2110-E5-data — UNDEFINED — V04 §3.9 *3.9 Light underground — the rows (item 68 (d′); J-V4.33; C4-28, C4-60)* — missing, empty or contradictory data (the dossier included)
* M-V04-2110-E6-rungs — UNDEFINED — V04 §3.9 *3.9 Light underground — the rows (item 68 (d′); J-V4.33; C4-28, C4-60)* — every rung from THORP to the METROPOLIS cap
* M-V04-2143-E4-degenerate — UNDEFINED — V04 §3.10 *3.10 U-FADE and the underground at an epoch (item 11; J-V4.28 – J-V4.…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V4-72
* M-V04-2266-E1-none — UNTESTED — V04 §3.11 *3.11 Failure handling (no whole-map retry; §5)* — no input / nothing to act on; defined by: "U-CITY ¦ a void, a core, a lifeline missing ¦ C1's read-only test: the cluster is not a candidate → fewer neighbourhoods → none (F-VOID; never under …"
* M-V04-2266-E3-cap — UNTESTED — V04 §3.11 *3.11 Failure handling (no whole-map retry; §5)* — the maximum and its caps; defined by: "U-FORECAST vs built ¦ capacity missed ¦ S10b's reconcile, F-SITING (II.7.3) ¦ the miss in households ¦"
* M-V04-2266-E4-degenerate — UNDEFINED — V04 §3.11 *3.11 Failure handling (no whole-map retry; §5)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V04-2266-E5-data — UNTESTED — V04 §3.11 *3.11 Failure handling (no whole-map retry; §5)* — missing, empty or contradictory data (the dossier included); defined by: "U-CITY ¦ a void, a core, a lifeline missing ¦ C1's read-only test: the cluster is not a candidate → fewer neighbourhoods → none (F-VOID; never under …"
* M-V04-2266-E6-rungs — UNTESTED — V04 §3.11 *3.11 Failure handling (no whole-map retry; §5)* — every rung from THORP to the METROPOLIS cap; defined by: "U-FRONT plots ¦ a sample under excluded ground ¦ F-UNDER (II.7.3) ¦ per rung ¦"
* M-V04-2266-E7-toggles — UNTESTED — V04 §3.11 *3.11 Failure handling (no whole-map retry; §5)* — every toggle and preset (parity presets, every layer on and off); defined by: "SLR4-06) ¦ no opening place made, the underground kept whole; unregistered, the first tail run after it registers makes them, a declared shift (§13.3…"
* M-V04-2266-E8-lifecycle — UNTESTED — V04 §3.11 *3.11 Failure handling (no whole-map retry; §5)* — save, load, undo, redo, regenerate and migrate; defined by: "SLR4-06) ¦ no opening place made, the underground kept whole; unregistered, the first tail run after it registers makes them, a declared shift (§13.3…"
* M-V04-2295-E4-degenerate — UNDEFINED — V04 §3.12 *3.12 Determinism (§6; C4-58, C4-20, C4-06)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V4-70, T-V6-34
* M-V04-2295-E5-data — UNDEFINED — V04 §3.12 *3.12 Determinism (§6; C4-58, C4-20, C4-06)* — missing, empty or contradictory data (the dossier included); tests seen: T-V4-70, T-V6-34
* M-V04-2340-E1-none — UNDEFINED — V04 §4.1 *4.1 Declarations — points in, shape out (item 101 (i); BCR-8; C4-31, …* — no input / nothing to act on
* M-V04-2340-E2-one — UNTESTED — V04 §4.1 *4.1 Declarations — points in, shape out (item 101 (i); BCR-8; C4-31, …* — exactly one item; defined by: "`drawChamber` ¦ one point and a size, or three or more points ¦ a rounded rectangle of the size aligned with the nearest gallery of the system (a `ru…"
* M-V04-2340-E4-degenerate — UNDEFINED — V04 §4.1 *4.1 Declarations — points in, shape out (item 101 (i); BCR-8; C4-31, …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V04-2340-E5-data — UNTESTED — V04 §4.1 *4.1 Declarations — points in, shape out (item 101 (i); BCR-8; C4-31, …* — missing, empty or contradictory data (the dossier included); defined by: "`drawTunnel` (sewer, no `system`) ¦ two points; the kind optional ¦ a route: where both points lie within `outfall.linkM` of ways, U-NET's tree searc…"
* M-V04-2340-E7-toggles — UNTESTED — V04 §4.1 *4.1 Declarations — points in, shape out (item 101 (i); BCR-8; C4-31, …* — every toggle and preset (parity presets, every layer on and off); defined by: "`drawTunnel` (sewer, no `system`) ¦ two points; the kind optional ¦ a route: where both points lie within `outfall.linkM` of ways, U-NET's tree searc…"
* M-V04-2340-E8-lifecycle — UNTESTED — V04 §4.1 *4.1 Declarations — points in, shape out (item 101 (i); BCR-8; C4-31, …* — save, load, undo, redo, regenerate and migrate; defined by: "Over an `unexcavated` cluster it is the user's excavation: the dry run lists every cluster that becomes `accessible`, transitively, and says that dwe…"
* M-V04-2366-E3-cap — UNTESTED — V04 §4.2 *4.2 Attribute paths (`setAttr`), with ranges and effects* — the maximum and its caps; defined by: "tunnel ¦ `depthOffsetCm` ¦ such that every crown stays ≤ `coverMaxCm` ¦ N7 re-run over the connected network's inverts (plan unchanged); an offset pa…"
* M-V04-2366-E4-degenerate — UNDEFINED — V04 §4.2 *4.2 Attribute paths (`setAttr`), with ranges and effects* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V04-2366-E5-data — UNDEFINED — V04 §4.2 *4.2 Attribute paths (`setAttr`), with ranges and effects* — missing, empty or contradictory data (the dossier included)
* M-V04-2366-E8-lifecycle — UNTESTED — V04 §4.2 *4.2 Attribute paths (`setAttr`), with ranges and effects* — save, load, undo, redo, regenerate and migrate; defined by: "entity ¦ path ¦ range ¦ effect (re-derived, locally) ¦ ¦---¦---¦---¦---¦"
* M-V04-2385-E1-none — UNTESTED — V04 §4.3 *4.3 Locality (§7.3; J-V4.14; C4-04, C4-30, C4-42, C4-43, C4-48, C4-50)* — no input / nothing to act on; defined by: "N8 for the plots it re-cut; a building created or given a basement over a cavern or ruin element draws U-ACCESS (d) in the edit's commit, keyed as at…"
* M-V04-2385-E2-one — UNTESTED — V04 §4.3 *4.3 Locality (§7.3; J-V4.14; C4-04, C4-30, C4-42, C4-43, C4-48, C4-50)* — exactly one item; defined by: "A tunnel whose followed way is deleted keeps its course, `follows` absent; one whose way is split re-points `follows` to the part over the run's midp…"
* M-V04-2385-E4-degenerate — UNDEFINED — V04 §4.3 *4.3 Locality (§7.3; J-V4.14; C4-04, C4-30, C4-42, C4-43, C4-48, C4-50)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V04-2385-E5-data — UNTESTED — V04 §4.3 *4.3 Locality (§7.3; J-V4.14; C4-04, C4-30, C4-42, C4-43, C4-48, C4-50)* — missing, empty or contradictory data (the dossier included); defined by: "A tunnel whose followed way is deleted keeps its course, `follows` absent; one whose way is split re-points `follows` to the part over the run's midp…"
* M-V04-2385-E6-rungs — UNDEFINED — V04 §4.3 *4.3 Locality (§7.3; J-V4.14; C4-04, C4-30, C4-42, C4-43, C4-48, C4-50)* — every rung from THORP to the METROPOLIS cap
* M-V04-2385-E7-toggles — UNTESTED — V04 §4.3 *4.3 Locality (§7.3; J-V4.14; C4-04, C4-30, C4-42, C4-43, C4-48, C4-50)* — every toggle and preset (parity presets, every layer on and off); defined by: "an `editTable` or `editPreset` that changes the resolved `fabric.extensionWeight` (volume 1's stage-2 switch, V1-3.15) — across 0, or inside (0, 1] (…"
* M-V04-2385-E8-lifecycle — UNTESTED — V04 §4.3 *4.3 Locality (§7.3; J-V4.14; C4-04, C4-30, C4-42, C4-43, C4-48, C4-50)* — save, load, undo, redo, regenerate and migrate; defined by: "edit ¦ re-derives ¦ byte-identical ¦ ¦---¦---¦---¦"
* M-V04-2409-E5-data — UNDEFINED — V04 §4.4 *4.4 Undo and the closure record* — missing, empty or contradictory data (the dossier included)
* M-V04-2409-E8-lifecycle — UNTESTED — V04 §4.4 *4.4 Undo and the closure record* — save, load, undo, redo, regenerate and migrate; defined by: "Every row is §7.4's; the closure record (§7.3 item 9 (c)) names U-DIG's pieces."
* M-V04-2422-E1-none — UNDEFINED — V04 §4.5 *4.5 The clerk's view (§11.2's tool API; item 101)* — no input / nothing to act on
* M-V04-2422-E2-one — UNDEFINED — V04 §4.5 *4.5 The clerk's view (§11.2's tool API; item 101)* — exactly one item
* M-V04-2422-E8-lifecycle — UNDEFINED — V04 §4.5 *4.5 The clerk's view (§11.2's tool API; item 101)* — save, load, undo, redo, regenerate and migrate
* M-V04-2441-E1-none — UNTESTED — V04 §4.6 *4.6 Migration (§7.5; C4-38, C4-59)* — no input / nothing to act on; defined by: "A document saved before U-NET's output version holds `Features.sewers` true and an empty part 0."
* M-V04-2441-E2-one — UNTESTED — V04 §4.6 *4.6 Migration (§7.5; C4-38, C4-59)* — exactly one item; defined by: "A complex whose source is a church building (the old crypted-church row) is kept whole, re-sourced to that church plot's `churchyard` part where one …"
* M-V04-2441-E3-cap — UNTESTED — V04 §4.6 *4.6 Migration (§7.5; C4-38, C4-59)* — the maximum and its caps; defined by: "Every existing catacomb complex is kept — the ratchet outranks the count — and gets a `CatacombComplex` with `extentFloorM2` equal to its laid extent…"
* M-V04-2441-E5-data — UNTESTED — V04 §4.6 *4.6 Migration (§7.5; C4-38, C4-59)* — missing, empty or contradictory data (the dossier included); defined by: "A complex whose source is a church building (the old crypted-church row) is kept whole, re-sourced to that church plot's `churchyard` part where one …"
* M-V04-2441-E7-toggles — UNTESTED — V04 §4.6 *4.6 Migration (§7.5; C4-38, C4-59)* — every toggle and preset (parity presets, every layer on and off); defined by: "`recipe.layers.ruins`, absent, reads `off`."
* M-V04-2441-E8-lifecycle — UNTESTED — V04 §4.6 *4.6 Migration (§7.5; C4-38, C4-59)* — save, load, undo, redo, regenerate and migrate; defined by: "A document saved before U-NET's output version holds `Features.sewers` true and an empty part 0."
* M-V04-2467-E5-data — UNDEFINED — V04 §4.7 *4.7 Read-ahead — the skeleton file's underground bones (item 101; §4.…* — missing, empty or contradictory data (the dossier included); tests seen: T-V4-40
* M-V04-2489-E1-none — UNTESTED — V04 §5.1 *5.1 The underground view (§8.4; BCR-10; J-V4.31)* — no input / nothing to act on; defined by: "The **band ladder** in the layer panel lists every non-empty band as its depth range (−2.5 to −5 m …) with the kinds present, the drawn band marked;"
* M-V04-2489-E2-one — UNTESTED — V04 §5.1 *5.1 The underground view (§8.4; BCR-10; J-V4.31)* — exactly one item; defined by: "When the underground layer is visible, one depth band draws at a time (`depthBand`, §2.9; its default §8.4's), in one of three modes, `LayerSpec.unde…"
* M-V04-2489-E5-data — UNTESTED — V04 §5.1 *5.1 The underground view (§8.4; BCR-10; J-V4.31)* — missing, empty or contradictory data (the dossier included); defined by: "Hidden by default at every rung (§8.4)."
* M-V04-2489-E6-rungs — UNTESTED — V04 §5.1 *5.1 The underground view (§8.4; BCR-10; J-V4.31)* — every rung from THORP to the METROPOLIS cap; defined by: "Hidden by default at every rung (§8.4)."
* M-V04-2489-E7-toggles — UNDEFINED — V04 §5.1 *5.1 The underground view (§8.4; BCR-10; J-V4.31)* — every toggle and preset (parity presets, every layer on and off)
* M-V04-2509-E1-none — UNDEFINED — V04 §5.2 *5.2 Marks and programs (§8.1, §8.2)* — no input / nothing to act on
* M-V04-2509-E2-one — UNDEFINED — V04 §5.2 *5.2 Marks and programs (§8.1, §8.2)* — exactly one item
* M-V04-2509-E4-degenerate — UNDEFINED — V04 §5.2 *5.2 Marks and programs (§8.1, §8.2)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V04-2509-E5-data — UNTESTED — V04 §5.2 *5.2 Marks and programs (§8.1, §8.2)* — missing, empty or contradictory data (the dossier included); defined by: "The `states` rows of §8.2 cover every declined condition; the undeclined defaults are the rows above."
* M-V04-2509-E6-rungs — UNDEFINED — V04 §5.2 *5.2 Marks and programs (§8.1, §8.2)* — every rung from THORP to the METROPOLIS cap
* M-V04-2509-E7-toggles — UNTESTED — V04 §5.2 *5.2 Marks and programs (§8.1, §8.2)* — every toggle and preset (parity presets, every layer on and off); defined by: "Its surface head — an outfall's `mouth` at the bank (a small arch glyph facing the water) included — is volume 1's ground symbol (V1-3.8.8, V1-5.1.2)…"
* M-V04-2560-E1-none — UNDEFINED — V04 §5.3 *5.3 Light underground (§8.4; item 68 (d′); J-V4.32)* — no input / nothing to act on
* M-V04-2560-E2-one — UNTESTED — V04 §5.3 *5.3 Light underground (§8.4; item 68 (d′); J-V4.32)* — exactly one item; defined by: "**rock as a prism** to the band's roof — the highest ceiling in the band plus 100 cm — so no point light passes through rock and a torch in one tunne…"
* M-V04-2560-E6-rungs — UNDEFINED — V04 §5.3 *5.3 Light underground (§8.4; item 68 (d′); J-V4.32)* — every rung from THORP to the METROPOLIS cap
* M-V04-2577-E5-data — UNTESTED — V04 §5.4 *5.4 Labels (§9; BCR-17, BCR-18; J-V4.34)* — missing, empty or contradictory data (the dossier included); defined by: "a ruin ¦ `system` ¦ at its outline's centroid, in its main band ¦ `RuinRecord.name`: the ancient civilisation the dossier's history names (a protecte…"
* M-V04-2577-E6-rungs — UNDEFINED — V04 §5.4 *5.4 Labels (§9; BCR-17, BCR-18; J-V4.34)* — every rung from THORP to the METROPOLIS cap
* M-V04-2593-E4-degenerate — UNDEFINED — V04 §5.5 *5.5 Exports (§11.1; BCR-16; J-V4.35, J-V4.36)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V4-21
* M-V04-2593-E6-rungs — UNDEFINED — V04 §5.5 *5.5 Exports (§11.1; BCR-16; J-V4.35, J-V4.36)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V4-21
* M-V04-2593-E7-toggles — UNDEFINED — V04 §5.5 *5.5 Exports (§11.1; BCR-16; J-V4.35, J-V4.36)* — every toggle and preset (parity presets, every layer on and off); tests seen: T-V4-21
* EI-V04-EDGE-1 — UNDEFINED (inventory V04-EDGE-1) — §3.7 L5, §4.4 held pieces — L5's dug pieces for a subterranean dossier institution are 'held while that institution is live' (delete refused dossier-owned); what becomes of them when the dossier removes or closes the institution (an epoch's dossier phase or an absorb) is not stated - kept as closed dug elements (the underground is never torn down), re-derived, or removed with the institution - nor tested (principle (11): a …
* EI-V04-EDGE-2 — UNDEFINED (inventory V04-EDGE-2) — §3.5.7 (g) excavation reading — The reading counts links of kind secret and accesses in state locked as joins to the surface for every viewer, so a cluster reached only through a secret link is 'accessible' (dwellings may settle) while its knownTo hides the way; the outcome for dwellers vs viewers is defined, but the interplay with g item 113 (e)'s 'access counts only through OPEN links' is undefined (see the missing finding).

### V05

* M-V05-417-E5-data — UNDEFINED — V05 §2.1 *2.1 The island record, revised (applied by BCR-V5-1 and BCR-V5-2)* — missing, empty or contradictory data (the dossier included); tests seen: T-V5-20
* M-V05-489-E5-data — UNDEFINED — V05 §2.2 *2.2 The access record (new; registry row by BCR-V5-1)* — missing, empty or contradictory data (the dossier included)
* M-V05-489-E8-lifecycle — UNTESTED — V05 §2.2 *2.2 The access record (new; registry row by BCR-V5-1)* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table V05 §2.6 (confirm this section's records have their rows)"
* M-V05-517-E5-data — UNTESTED — V05 §2.3 *2.3 The hand-over to the unit run (a derived view; never persisted)* — missing, empty or contradictory data (the dossier included); defined by: "SKY builds, per island, the `NeighbourhoodRequest` of V01 §2.4 — `district` the island's sky pseudo-district, `key` its arena, `layer: 'sky'`, `bound…"
* M-V05-517-E8-lifecycle — UNTESTED — V05 §2.3 *2.3 The hand-over to the unit run (a derived view; never persisted)* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table V05 §2.6 (confirm this section's records have their rows)"
* M-V05-549-E5-data — UNDEFINED — V05 §2.3a *2.3a The shade strip (derived with the prosperity field; item 102)* — missing, empty or contradictory data (the dossier included)
* M-V05-549-E8-lifecycle — UNTESTED — V05 §2.3a *2.3a The shade strip (derived with the prosperity field; item 102)* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table V05 §2.6 (confirm this section's records have their rows)"
* M-V05-597-E5-data — UNTESTED — V05 §2.4 *2.4 The rule tables (data, editable by `editTable`, §7.6; every cell …* — missing, empty or contradictory data (the dossier included); defined by: "**Default rows** — our own values (provenance `own`, `extension`: no reference has islands, II.6 (8)), each calibratable; the three marked ⟨P0⟩ are s…"
* M-V05-741-E8-lifecycle — UNTESTED — V05 §2.5 *2.5 Identity* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table V05 §2.6 (confirm this section's records have their rows)"
* M-V05-755-E5-data — UNTESTED — V05 §2.6 *2.6 The lifecycle of every state field this volume adds or gives a pr…* — missing, empty or contradictory data (the dossier included); defined by: "`underside` ¦ `SKY` (V5 §3.9) from the rule row and `island.place` ¦ the slab tiers, the offset view, glTF, the clearance ¦ model digest ¦ re-scaled …"
* M-V05-755-E8-lifecycle — UNTESTED — V05 §2.6 *2.6 The lifecycle of every state field this volume adds or gives a pr…* — save, load, undo, redo, regenerate and migrate; defined by: "covered by the unit's lifecycle table V05 §2.6 (confirm this section's records have their rows)"
* M-V05-875-E4-degenerate — UNDEFINED — V05 §3.3 *3.3 The two supplies, on absolute values (answering RV-pc-3)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V5-3, T10-1
* M-V05-875-E6-rungs — UNDEFINED — V05 §3.3 *3.3 The two supplies, on absolute values (answering RV-pc-3)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V5-3, T10-1
* M-V05-875-E8-lifecycle — UNDEFINED — V05 §3.3 *3.3 The two supplies, on absolute values (answering RV-pc-3)* — save, load, undo, redo, regenerate and migrate; tests seen: T-V5-3, T10-1
* M-V05-916-E1-none — UNTESTED — V05 §3.4 *3.4 Purpose — a prosperity island or an institution island* — no input / nothing to act on; defined by: "With no candidate the slot closes, reported `no supply` or `nothing to carry`."
* M-V05-916-E2-one — UNTESTED — V05 §3.4 *3.4 Purpose — a prosperity island or an institution island* — exactly one item; defined by: "**Otherwise the candidates are:** `prosperity`, weight 1.0, where the roster's households of the bands with `h_carried(v(b)) > 0` not yet carried by …"
* M-V05-916-E5-data — UNTESTED — V05 §3.4 *3.4 Purpose — a prosperity island or an institution island* — missing, empty or contradictory data (the dossier included); defined by: "**Otherwise the candidates are:** `prosperity`, weight 1.0, where the roster's households of the bands with `h_carried(v(b)) > 0` not yet carried by …"
* M-V05-916-E8-lifecycle — UNDEFINED — V05 §3.4 *3.4 Purpose — a prosperity island or an institution island* — save, load, undo, redo, regenerate and migrate
* M-V05-944-E3-cap — UNDEFINED — V05 §3.5 *3.5 The sky allocation (S7b (5) at depth)* — the maximum and its caps; tests seen: T-V1-42, T-V1-43, T-V1-44, T73-4
* M-V05-944-E4-degenerate — UNDEFINED — V05 §3.5 *3.5 The sky allocation (S7b (5) at depth)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-42, T-V1-43, T-V1-44, T73-4
* M-V05-944-E6-rungs — UNDEFINED — V05 §3.5 *3.5 The sky allocation (S7b (5) at depth)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V1-42, T-V1-43, T-V1-44, T73-4
* M-V05-944-E8-lifecycle — UNDEFINED — V05 §3.5 *3.5 The sky allocation (S7b (5) at depth)* — save, load, undo, redo, regenerate and migrate; tests seen: T-V1-42, T-V1-43, T-V1-44, T73-4
* M-V05-1036-E4-degenerate — UNDEFINED — V05 §3.6 *3.6 Shape (S7b (5), per open slot, in the island's local frame)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V05-1048-E1-none — UNTESTED — V05 §3.7 *3.7 Placement — where the island floats (S7b (5), per open slot, in s…* — no input / nothing to act on; defined by: "**F-SKY-PLACE** (V5 §3.17) when no candidate passes."
* M-V05-1048-E2-one — UNTESTED — V05 §3.7 *3.7 Placement — where the island floats (S7b (5), per open slot, in s…* — exactly one item; defined by: "**Candidates.** The centroids of a `latticeM` lattice over the frame whose translated outline lies inside the frame inset by `frameInsetM`, does not …"
* M-V05-1048-E4-degenerate — UNDEFINED — V05 §3.7 *3.7 Placement — where the island floats (S7b (5), per open slot, in s…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V05-1048-E5-data — UNDEFINED — V05 §3.7 *3.7 Placement — where the island floats (S7b (5), per open slot, in s…* — missing, empty or contradictory data (the dossier included)
* M-V05-1075-E2-one — UNTESTED — V05 §3.8 *3.8 The island arena: frame, land, rim, terrain, the conjured river (…* — exactly one item; defined by: "**Frame.** Computed after the outline (V5 §3.6 (3)): a square centred on the local origin of side 2 × `r_max` × √1.5 + 2 × `frameMarginM` (40 m), rou…"
* M-V05-1075-E4-degenerate — UNTESTED — V05 §3.8 *3.8 The island arena: frame, land, rim, terrain, the conjured river (…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); defined by: "(The earlier disc-sized side, 2.6 × the radius of a disc of 1.5 × `areaHaMax`, was too small for an elongated outline: 568 m against a 618–874 m CITY…"
* M-V05-1075-E5-data — UNDEFINED — V05 §3.8 *3.8 The island arena: frame, land, rim, terrain, the conjured river (…* — missing, empty or contradictory data (the dossier included)
* M-V05-1075-E6-rungs — UNTESTED — V05 §3.8 *3.8 The island arena: frame, land, rim, terrain, the conjured river (…* — every rung from THORP to the METROPOLIS cap; defined by: "**Terrain.** The island's own `Terrain` (§2.3): the ground's terrain cell; a `hydro` grid at half the ground's hydro cell (12.5 m at CITY, 16 m at ME…"
* M-V05-1110-E1-none — UNTESTED — V05 §3.9 *3.9 The underside, the ground reference and the altitude (the owner's…* — no input / nothing to act on; defined by: "**The underside tiers** — a pure function `undersideTiers(island)` (`@plat/sky`), view data computed by S14, never stored: for tier i = 1 … n (`n = t…"
* M-V05-1110-E2-one — UNTESTED — V05 §3.9 *3.9 The underside, the ground reference and the altitude (the owner's…* — exactly one item; defined by: "The island's **surface top** — the `surfaceTopPercentile` (95th) percentile over the land face of its height at each point: the levelled ground there…"
* M-V05-1110-E3-cap — UNDEFINED — V05 §3.9 *3.9 The underside, the ground reference and the altitude (the owner's…* — the maximum and its caps
* M-V05-1110-E4-degenerate — UNDEFINED — V05 §3.9 *3.9 The underside, the ground reference and the altitude (the owner's…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V05-1110-E5-data — UNTESTED — V05 §3.9 *3.9 The underside, the ground reference and the altitude (the owner's…* — missing, empty or contradictory data (the dossier included); defined by: "The island's **surface top** — the `surfaceTopPercentile` (95th) percentile over the land face of its height at each point: the levelled ground there…"
* M-V05-1110-E6-rungs — UNTESTED — V05 §3.9 *3.9 The underside, the ground reference and the altitude (the owner's…* — every rung from THORP to the METROPOLIS cap; defined by: "**Measurement (P0):** over 1 000 islands at CITY and METROPOLIS, the share raised here ≤ 1 %."
* M-V05-1110-E8-lifecycle — UNTESTED — V05 §3.9 *3.9 The underside, the ground reference and the altitude (the owner's…* — save, load, undo, redo, regenerate and migrate; defined by: "SKY-F never writes `shadeBasis`, so the island's strip in the field keeps its pass-2 basis until the next epoch or a re-derivation, across saves and …"
* M-V05-1165-E1-none — UNTESTED — V05 §3.10 *3.10 Access — the tops, the feet, the landing claims (SKY)* — no input / nothing to act on; defined by: "J-V5.62): at every re-siting (a Re-derive from S7b or SKY) the ordinals in `SkyIsland.removedAccesses` are skipped — no top, no foot, no claims — and…"
* M-V05-1165-E2-one — UNTESTED — V05 §3.10 *3.10 Access — the tops, the feet, the landing claims (SKY)* — exactly one item; defined by: "One weighted draw among the admitted kinds on `island.place` (index `access:k`)."
* M-V05-1165-E3-cap — UNTESTED — V05 §3.10 *3.10 Access — the tops, the feet, the landing claims (SKY)* — the maximum and its caps; defined by: "J-V5.60) — and the altitude is within the row's limit;"
* M-V05-1165-E4-degenerate — UNTESTED — V05 §3.10 *3.10 Access — the tops, the feet, the landing claims (SKY)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); defined by: "If no site passes, the best site by score is taken and the crypt takes the half-sunk form (volume 2's basement ladder, full → half → raised), listed …"
* M-V05-1165-E5-data — UNTESTED — V05 §3.10 *3.10 Access — the tops, the feet, the landing claims (SKY)* — missing, empty or contradictory data (the dossier included); defined by: "A foot and its landing yard stand on part-0 land only: never on a deck face, a raised-way pier or inside a raised deck's plan dilated by `deckGapM` —…"
* M-V05-1241-E6-rungs — UNDEFINED — V05 §3.11 *3.11 The island's field and its context vector* — every rung from THORP to the METROPOLIS cap; tests seen: T-V5-9
* M-V05-1293-E1-none — UNTESTED — V05 §3.12 *3.12 The hand-over to the unit run, and what it must honour* — no input / nothing to act on; defined by: "Seven of the unit run's inputs are this volume's and govern where the two volumes' words differ; each names the V01 line it replaces, and all seven a…"
* M-V05-1293-E2-one — UNTESTED — V05 §3.12 *3.12 The hand-over to the unit run, and what it must honour* — exactly one item; defined by: "J-V5.26); reach every landing attach with a way (the island's gates); cut the institution claim as a hole and place its institution there by S10b; us…"
* M-V05-1293-E3-cap — UNDEFINED — V05 §3.12 *3.12 The hand-over to the unit run, and what it must honour* — the maximum and its caps
* M-V05-1293-E4-degenerate — UNDEFINED — V05 §3.12 *3.12 The hand-over to the unit run, and what it must honour* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V05-1293-E5-data — UNTESTED — V05 §3.12 *3.12 The hand-over to the unit run, and what it must honour* — missing, empty or contradictory data (the dossier included); defined by: "**SKY-F checks** that every landing yard holds a `sky_landing_top` plot, that a way meets every island attach, and that a walkable part-0 way meets e…"
* M-V05-1293-E6-rungs — UNDEFINED — V05 §3.12 *3.12 The hand-over to the unit run, and what it must honour* — every rung from THORP to the METROPOLIS cap
* M-V05-1347-E1-none — UNDEFINED — V05 §3.13 *3.13 Lights (SKY-F; the sky rows of §4.7's light table, BCR-V5-8)* — no input / nothing to act on
* M-V05-1347-E2-one — UNTESTED — V05 §3.13 *3.13 Lights (SKY-F; the sky rows of §4.7's light table, BCR-V5-8)* — exactly one item; defined by: "`keel` ¦ one downward magical source at the root's apex (a `flat` island's: the rim slab's base under the land centroid): the glow beneath the island…"
* M-V05-1347-E5-data — UNTESTED — V05 §3.13 *3.13 Lights (SKY-F; the sky rows of §4.7's light table, BCR-V5-8)* — missing, empty or contradictory data (the dossier included); defined by: "host ¦ what ¦ defaults (own, `extension`) ¦ ¦---¦---¦---¦"
* M-V05-1360-E6-rungs — UNDEFINED — V05 §3.14 *3.14 Names* — every rung from THORP to the METROPOLIS cap
* M-V05-1370-E4-degenerate — UNDEFINED — V05 §3.15 *3.15 Over time — the island laws an epoch applies (`IslandEpochStep`,…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V5-21, T-V5-31, T8-6
* M-V05-1370-E6-rungs — UNDEFINED — V05 §3.15 *3.15 Over time — the island laws an epoch applies (`IslandEpochStep`,…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V5-21, T-V5-31, T8-6
* M-V05-1469-E1-none — UNTESTED — V05 §3.16 *3.16 The fall and the landfall (`fallIsland`)* — no input / nothing to act on; defined by: "**Item 110's parts** (C5-53): every covered raised span and raised-way pier becomes `ruined`, and a span whose pier is ruined becomes `ruined` with i…"
* M-V05-1469-E2-one — UNTESTED — V05 §3.16 *3.16 The fall and the landfall (`fallIsland`)* — exactly one item; defined by: "J-V5.79); a bridge, pier, mole or quay-platform deck that is covered becomes `ruined` (the deck falls; under a bridge the river stays one L0 face and…"
* M-V05-1469-E4-degenerate — UNDEFINED — V05 §3.16 *3.16 The fall and the landfall (`fallIsland`)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V05-1469-E5-data — UNTESTED — V05 §3.16 *3.16 The fall and the landfall (`fallIsland`)* — missing, empty or contradictory data (the dossier included); defined by: "**Undo** restores all of it from the event's undo record (§7.4's convert row) — each covered way's `class`, surface and prior `formerClass` among it …"
* M-V05-1469-E6-rungs — UNDEFINED — V05 §3.16 *3.16 The fall and the landfall (`fallIsland`)* — every rung from THORP to the METROPOLIS cap
* M-V05-1469-E8-lifecycle — UNTESTED — V05 §3.16 *3.16 The fall and the landfall (`fallIsland`)* — save, load, undo, redo, regenerate and migrate; defined by: "Every covered wall stretch and gate steps down §4.11's wall decline ladder to `breached` over its covered length: the landfall writes `breached` over…"
* M-V05-1565-E2-one — UNDEFINED — V05 §3.18 *3.18 Determinism — every draw on an existing concern (no new concern;…* — exactly one item; tests seen: T-V5-15
* M-V05-1588-E4-degenerate — UNDEFINED — V05 §3.19 *3.19 The island's shade strip (the owner's item 102 on the island's s…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V5-19, T-V5-21
* M-V05-1679-E4-degenerate — UNDEFINED — V05 §3.20 *3.20 The siting rulebook on and across the island (the owner's items …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V5-22, T-V5-24
* M-V05-1679-E6-rungs — UNDEFINED — V05 §3.20 *3.20 The siting rulebook on and across the island (the owner's items …* — every rung from THORP to the METROPOLIS cap; tests seen: T-V5-22, T-V5-24
* M-V05-1820-E4-degenerate — UNDEFINED — V05 §3.21 *3.21 The rim as a barrier (the owner's item 106 where it reaches isla…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V5-27
* M-V05-1847-E4-degenerate — UNDEFINED — V05 §3.22 *3.22 Item 110 on, under and against the island (the owner's "they go …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V5-15
* M-V05-1939-E3-cap — UNTESTED — V05 §4.1 *4.1 The declarations — item 101's twelve tools, no thirteenth* — the maximum and its caps; defined by: "Every island edit is an existing tool with at most one new parameter (§7.1's elegance rule):"
* M-V05-1939-E4-degenerate — UNDEFINED — V05 §4.1 *4.1 The declarations — item 101's twelve tools, no thirteenth* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V05-1939-E8-lifecycle — UNTESTED — V05 §4.1 *4.1 The declarations — item 101's twelve tools, no thirteenth* — save, load, undo, redo, regenerate and migrate; defined by: "T1 `intend` ¦ the islands setting (off / on) and the count (`auto`, 0–3) ¦ `adjust('layers.islands')`, `adjust('islands.count')` — both Re-derive fro…"
* M-V05-1967-E4-degenerate — UNDEFINED — V05 §4.2 *4.2 The new and extended events and their semantics (BCR-V5-10)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V5-16
* M-V05-1967-E6-rungs — UNDEFINED — V05 §4.2 *4.2 The new and extended events and their semantics (BCR-V5-10)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V5-16
* M-V05-2135-E2-one — UNDEFINED — V05 §4.3 *4.3 Locality and undo* — exactly one item; tests seen: T-V5-16
* M-V05-2135-E4-degenerate — UNDEFINED — V05 §4.3 *4.3 Locality and undo* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V5-16
* M-V05-2164-E1-none — UNTESTED — V05 §4.4 *4.4 The dossier — derivation row DR-SKY and coherence (BCR-V5-12)* — no input / nothing to act on; defined by: "`site.deposits` (a `magical_node`: the node term of `h_town`, V5 §3.3); the active reviewed custom chains (item 104 (b)) and `activeChains[]` (item 1…"
* M-V05-2164-E2-one — UNTESTED — V05 §4.4 *4.4 The dossier — derivation row DR-SKY and coherence (BCR-V5-12)* — exactly one item; defined by: "A `magical_node` deposit that turns `depleted` or `removed` at an absorb drops the node term at the next epoch's evaluation — the islands' supply fal…"
* M-V05-2164-E3-cap — UNDEFINED — V05 §4.4 *4.4 The dossier — derivation row DR-SKY and coherence (BCR-V5-12)* — the maximum and its caps
* M-V05-2164-E5-data — UNTESTED — V05 §4.4 *4.4 The dossier — derivation row DR-SKY and coherence (BCR-V5-12)* — missing, empty or contradictory data (the dossier included); defined by: "**The reverse** — the dossier removes the institution an island carries (a palace, a cathedral, a custom tower) — removes the institution at once (th…"
* M-V05-2164-E6-rungs — UNDEFINED — V05 §4.4 *4.4 The dossier — derivation row DR-SKY and coherence (BCR-V5-12)* — every rung from THORP to the METROPOLIS cap
* M-V05-2164-E8-lifecycle — UNDEFINED — V05 §4.4 *4.4 The dossier — derivation row DR-SKY and coherence (BCR-V5-12)* — save, load, undo, redo, regenerate and migrate
* M-V05-2186-E1-none — UNTESTED — V05 §4.5 *4.5 The clerk's view* — no input / nothing to act on; defined by: "`why` on a use on an island, or on a ground use pulled by one, names the rows and the links that pulled it — the good, the bound provider or consumer…"
* M-V05-2186-E2-one — UNTESTED — V05 §4.5 *4.5 The clerk's view* — exactly one item; defined by: "The prosperity field's `drivers()` (V10's `FieldDrivers`) gives the daylight term one entry as the base defines it and, beside it, one attribution pe…"
* M-V05-2186-E4-degenerate — UNTESTED — V05 §4.5 *4.5 The clerk's view* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); defined by: "`why` on an island answers with its gate, its slot's draw against `chance · h_town`, its reason's candidates and weights (a custom institution's matc…"
* M-V05-2186-E8-lifecycle — UNTESTED — V05 §4.5 *4.5 The clerk's view* — save, load, undo, redo, regenerate and migrate; defined by: "`why` on a use on an island, or on a ground use pulled by one, names the rows and the links that pulled it — the good, the bound provider or consumer…"
* M-V05-2228-E1-none — UNTESTED — V05 §5.1 *5.1 Marks (S14; every sky coordinate is `anchor` + the local one)* — no input / nothing to act on; defined by: "States (§8.2's `states`, BCR-V5-13, BCR-V5-18): the base's island rows stand, with the `fallen` row drawing its rubble over the faces and bands of th…"
* M-V05-2228-E2-one — UNTESTED — V05 §5.1 *5.1 Marks (S14; every sky coordinate is `anchor` + the local one)* — exactly one item; defined by: "`sky.island.land` ¦ `area` ¦ the land face, in the style's `sky.ground` role (one step lighter than the ground's block tone in `ink`; the patch tone …"
* M-V05-2228-E4-degenerate — UNDEFINED — V05 §5.1 *5.1 Marks (S14; every sky coordinate is `anchor` + the local one)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V05-2228-E5-data — UNDEFINED — V05 §5.1 *5.1 Marks (S14; every sky coordinate is `anchor` + the local one)* — missing, empty or contradictory data (the dossier included)
* M-V05-2228-E6-rungs — UNDEFINED — V05 §5.1 *5.1 Marks (S14; every sky coordinate is `anchor` + the local one)* — every rung from THORP to the METROPOLIS cap
* M-V05-2228-E7-toggles — UNTESTED — V05 §5.1 *5.1 Marks (S14; every sky coordinate is `anchor` + the local one)* — every toggle and preset (parity presets, every layer on and off); defined by: "`hatched`: the patch's drop shadow, as the Neighbourhood look draws its lone patch (`research/findings/vg-ng-devlogs.md` §B3.5;"
* M-V05-2228-E8-lifecycle — UNDEFINED — V05 §5.1 *5.1 Marks (S14; every sky coordinate is `anchor` + the local one)* — save, load, undo, redo, regenerate and migrate
* M-V05-2280-E1-none — UNDEFINED — V05 §5.3 *5.3 Light and shadow — the underside's shadow (the owner's J98; BCR-V…* — no input / nothing to act on; tests seen: T-V5-20
* M-V05-2280-E4-degenerate — UNDEFINED — V05 §5.3 *5.3 Light and shadow — the underside's shadow (the owner's J98; BCR-V…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V5-20
* M-V05-2280-E5-data — UNDEFINED — V05 §5.3 *5.3 Light and shadow — the underside's shadow (the owner's J98; BCR-V…* — missing, empty or contradictory data (the dossier included); tests seen: T-V5-20
* M-V05-2280-E6-rungs — UNDEFINED — V05 §5.3 *5.3 Light and shadow — the underside's shadow (the owner's J98; BCR-V…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V5-20
* M-V05-2280-E7-toggles — UNDEFINED — V05 §5.3 *5.3 Light and shadow — the underside's shadow (the owner's J98; BCR-V…* — every toggle and preset (parity presets, every layer on and off); tests seen: T-V5-20
* M-V05-2318-E4-degenerate — UNDEFINED — V05 §5.4 *5.4 Labels* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V05-2318-E6-rungs — UNDEFINED — V05 §5.4 *5.4 Labels* — every rung from THORP to the METROPOLIS cap
* M-V05-2327-E1-none — UNDEFINED — V05 §5.5 *5.5 Exports (§11.1's rows extended, BCR-V5-13)* — no input / nothing to act on
* M-V05-2327-E2-one — UNTESTED — V05 §5.5 *5.5 Exports (§11.1's rows extended, BCR-V5-13)* — exactly one item; defined by: "GeoJSON ¦ FeatureCollection `sky`: one feature per island — its projected land face, with address, name, reason, state, `areaHa`, `altitudeM`, `eleva…"
* M-V05-2327-E4-degenerate — UNDEFINED — V05 §5.5 *5.5 Exports (§11.1's rows extended, BCR-V5-13)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V05-2327-E7-toggles — UNDEFINED — V05 §5.5 *5.5 Exports (§11.1's rows extended, BCR-V5-13)* — every toggle and preset (parity presets, every layer on and off)
* M-V05-2327-E8-lifecycle — UNDEFINED — V05 §5.5 *5.5 Exports (§11.1's rows extended, BCR-V5-13)* — save, load, undo, redo, regenerate and migrate
* EI-V05-EDGE-1 — UNDEFINED (inventory V05-EDGE-1) — V5 §3.15 (1b) vs §3.15 locks paragraph; §4.4 reverse — A locked island (or locked state path) whose institution the dossier removes: (1b) re-reasons the island (rewrites reason and institution by conversion), while 'A locked island, or a locked state, areaHa or altitudeCm path, is held by these steps (§7.2)'. The outcome of a dossier removal against a lock — held as an institution island with no institution, or re-reasoned despite the lock — is undef…
* EI-V05-EDGE-2 — UNDEFINED (inventory V05-EDGE-2) — V5 §3.16 (2)-(4) combined with another island's access — A landfall whose footprint covers another island's ground landing plot or access foot is not defined: the covered set includes every L3 plot (so the landing house is demolished and the use vacated) but nothing states what happens to the other island's SkyAccess (closed, unserved, re-landed, or its island left unreachable) until a re-derivation re-sites it.
* EI-V05-EDGE-3 — UNDEFINED (inventory V05-EDGE-3) — V5 §4.2 placeSkyAccess vs §2.3b '≤ 9 entries' and §6 budget — No cap limits hand-placed accesses per island (placeSkyAccess checks kind, magic and run only; accessCount.max binds generated accesses), yet §2.3b and §6 bound skyAccessObstacles at '≤ 9 entries per document' and price the solver on that bound; the maximum-access edge is undefined.
* EI-V05-EDGE-4 — UNDEFINED (inventory V05-EDGE-4) — V5 §3.15 (7) locks; T-V5-31 (b) — The sky.clearance step's lock case — a locked island or altitudeCm path keeps elevationCm, the floor may fail, the conflict 'clearance held by your lock' is listed and the island is exempt from the clearance invariant — has no test (T-V5-31 (b) and T-V5-10 test only unlocked islands).

### V06

* M-V06-524-E5-data — UNDEFINED — V06 §2.1 *2.1 The engine's interfaces (`@plat/evolve`)* — missing, empty or contradictory data (the dossier included); tests seen: T-V6-52
* M-V06-689-E5-data — UNDEFINED — V06 §2.3 *2.3 The trajectory and the `advance` event* — missing, empty or contradictory data (the dossier included); tests seen: T-V6-16, T-V6-17, T-V6-18
* M-V06-724-E5-data — UNTESTED — V06 §2.4 *2.4 Hazard rows* — missing, empty or contradictory data (the dossier included); defined by: "Default rows (our own; historically attested kinds, rates calibratable):"
* M-V06-761-E5-data — UNDEFINED — V06 §2.5 *2.5 `MutationPlan` — a designation change spread over epochs (item 18…* — missing, empty or contradictory data (the dossier included)
* M-V06-774-E5-data — UNDEFINED — V06 §2.6 *2.6 `BuildingShadeMask` — the buildings' share of the daylight driver…* — missing, empty or contradictory data (the dossier included)
* M-V06-795-E5-data — UNDEFINED — V06 §2.8 *2.8 The new conversion kinds and `Way.formerClass` (BCR-V6-5)* — missing, empty or contradictory data (the dossier included)
* M-V06-821-E5-data — UNDEFINED — V06 §2.10 *2.10 The epoch report and the chronicle (non-canonical, rebuilt by re…* — missing, empty or contradictory data (the dossier included)
* M-V06-935-E5-data — UNDEFINED — V06 §2.13 *2.13 Item 110's epoch records — the reason key, the ledger and the su…* — missing, empty or contradictory data (the dossier included)
* M-V06-973-E4-degenerate — UNDEFINED — V06 §3.1 *3.1 Where the engine runs: the epoch runner* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V6-1
* M-V06-1024-E4-degenerate — UNDEFINED — V06 §3.2 *3.2 The phase order* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V6-25, T-V6-26
* M-V06-1104-E1-none — UNTESTED — V06 §3.3 *3.3 Epoch inputs* — no input / nothing to act on; defined by: "The engine reads them and invents none of them: the population target, the slices and the calamities are the dossier's; everything else the map deriv…"
* M-V06-1104-E2-one — UNTESTED — V06 §3.3 *3.3 Epoch inputs* — exactly one item; defined by: "Above `advance.maxEpochs` the request **bends**: the cadence becomes the smallest whole number of weeks that fits, `⌈spanYears × 52 ÷ advance.maxEpoc…"
* M-V06-1104-E4-degenerate — UNDEFINED — V06 §3.3 *3.3 Epoch inputs* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V06-1104-E5-data — UNTESTED — V06 §3.3 *3.3 Epoch inputs* — missing, empty or contradictory data (the dossier included); defined by: "The engine reads them and invents none of them: the population target, the slices and the calamities are the dossier's; everything else the map deriv…"
* M-V06-1104-E6-rungs — UNTESTED — V06 §3.3 *3.3 Epoch inputs* — every rung from THORP to the METROPOLIS cap; defined by: "`points`: piecewise linear in the week, `P0` held before the first point and the last point's value after it; each rounded to the nearest integer (ha…"
* M-V06-1104-E8-lifecycle — UNTESTED — V06 §3.3 *3.3 Epoch inputs* — save, load, undo, redo, regenerate and migrate; defined by: "The app appends the epochs one at a time in one `group` (§7.4), each folded before the next is built, so a century runs as a cancellable background j…"
* M-V06-1154-E4-degenerate — UNDEFINED — V06 §3.4 *3.4 Sunlight over time — the building shade mask (item 102 (b), (e))* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V6-12
* M-V06-1154-E6-rungs — UNDEFINED — V06 §3.4 *3.4 Sunlight over time — the building shade mask (item 102 (b), (e))* — every rung from THORP to the METROPOLIS cap; tests seen: T-V6-12
* M-V06-1227-E1-none — UNTESTED — V06 §3.5 *3.5 Decline* — no input / nothing to act on; defined by: "So an undefended suburb, a damp low quarter and the plot beside the tannery empty first, the market core last, and a core house can still empty — the…"
* M-V06-1227-E2-one — UNTESTED — V06 §3.5 *3.5 Decline* — exactly one item; defined by: "Dwellings are taken in descending key until their band-`b` households number at least `n_b`; the last one taken may keep some (a `relet` down to the …"
* M-V06-1227-E3-cap — UNTESTED — V06 §3.5 *3.5 Decline* — the maximum and its caps; defined by: "Departures take no churn cap: the population is the truth, and a fall's households leave at once (item 8 (f))."
* M-V06-1227-E4-degenerate — UNDEFINED — V06 §3.5 *3.5 Decline* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V06-1227-E5-data — UNTESTED — V06 §3.5 *3.5 Decline* — missing, empty or contradictory data (the dossier included); defined by: "* **building** (`rate` 0.6): an `abandoned` building whose `decay` Works has run its span (→ `decay`, starting the next `decay` Works toward `ruined`…"
* M-V06-1227-E6-rungs — UNTESTED — V06 §3.5 *3.5 Decline* — every rung from THORP to the METROPOLIS cap; defined by: "At an epoch whose product declares `rows` (V07's village), the same pool reads them and nothing else changes: a building's `rate` is × `persistence[c…"
* M-V06-1227-E8-lifecycle — UNTESTED — V06 §3.5 *3.5 Decline* — save, load, undo, redo, regenerate and migrate; defined by: "**Swap.** A household of an emptying dwelling that is not in `L_b` moves into a slot a member of `L_b` frees in a dwelling that is not emptying — pai…"
* M-V06-1368-E1-none — UNTESTED — V06 §3.6 *3.6 Growth — fill first, crowd next, spread last* — no input / nothing to act on; defined by: "* **Overflow.** When `0 < R` and `R + B < q`: the **overflow ladder**, rung by rung until every household is housed (none is ever dropped, §5.2 F-PLA…"
* M-V06-1368-E2-one — UNTESTED — V06 §3.6 *3.6 Growth — fill first, crowd next, spread last* — exactly one item; defined by: "**The stage.** §4.11's grow path from S5 on — S5a's boundary grown from the previous one for the stage's households at their bands' plot areas, S5b's…"
* M-V06-1368-E3-cap — UNTESTED — V06 §3.6 *3.6 Growth — fill first, crowd next, spread last* — the maximum and its caps; defined by: "(i) crowding past `growth.crowdFactor` up to §2.6's capacity, poorest bands first;"
* M-V06-1368-E4-degenerate — UNDEFINED — V06 §3.6 *3.6 Growth — fill first, crowd next, spread last* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V06-1368-E5-data — UNTESTED — V06 §3.6 *3.6 Growth — fill first, crowd next, spread last* — missing, empty or contradictory data (the dossier included); defined by: "* **Decrowding.** Else, when `C ≥ max(q, growth.crowdShareMax × H)`, a stage grows for the crowded excess — **decrowding**: at each crowded dwelling …"
* M-V06-1368-E6-rungs — UNDEFINED — V06 §3.6 *3.6 Growth — fill first, crowd next, spread last* — every rung from THORP to the METROPOLIS cap
* M-V06-1368-E7-toggles — UNTESTED — V06 §3.6 *3.6 Growth — fill first, crowd next, spread last* — every toggle and preset (parity presets, every layer on and off); defined by: "BCR-V6-19 admits the suburb regime for a history epoch's unwalled stage of that size, beside the base's preset, era row and shanty toggle) — small gr…"
* M-V06-1368-E8-lifecycle — UNTESTED — V06 §3.6 *3.6 Growth — fill first, crowd next, spread last* — save, load, undo, redo, regenerate and migrate; defined by: "`B` = the **overflow backlog**: the households the overflow ladder (2) housed in earlier epochs and still houses — those on informal plots and in ten…"
* M-V06-1427-E1-none — UNTESTED — V06 §3.7 *3.7 Fortification — new circuits, old rings, shorter rings* — no input / nothing to act on; defined by: "The line: the registered `EnceinteStrategy` traces the region's boundary under item 106's barrier closure (only the approachable arcs walled, each st…"
* M-V06-1427-E2-one — UNTESTED — V06 §3.7 *3.7 Fortification — new circuits, old rings, shorter rings* — exactly one item; defined by: "A circuit makes the new stage a walled ring with `placement: 'aroundAll'` — it encloses every earlier stage **on its approachable arcs** (item 106 (a…"
* M-V06-1427-E3-cap — UNTESTED — V06 §3.7 *3.7 Fortification — new circuits, old rings, shorter rings* — the maximum and its caps; defined by: "TT-04), crediting the ledger (§4.11 *Salvage*); charged to the `fabric` cap of the district the stretch's midpoint lies in."
* M-V06-1427-E4-degenerate — UNDEFINED — V06 §3.7 *3.7 Fortification — new circuits, old rings, shorter rings* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V06-1427-E5-data — UNTESTED — V06 §3.7 *3.7 Fortification — new circuits, old rings, shorter rings* — missing, empty or contradictory data (the dossier included); defined by: "`fate` = `keep` while `threat ≥ walls.keepThreat`, else drawn from `walls.fateWeights` (`road` 0.7, `absorb` 0.3) on `stream(EVO_FORT, enceinte)`;"
* M-V06-1427-E6-rungs — UNDEFINED — V06 §3.7 *3.7 Fortification — new circuits, old rings, shorter rings* — every rung from THORP to the METROPOLIS cap
* M-V06-1427-E8-lifecycle — UNTESTED — V06 §3.7 *3.7 Fortification — new circuits, old rings, shorter rings* — save, load, undo, redo, regenerate and migrate; defined by: "DR2 for a dossier); the share of households outside the outermost enceinte — the new stage's counted — `≥ walls.extramuralShareMin`; the town's house…"
* M-V06-1599-E1-none — UNTESTED — V06 §3.8 *3.8 Regrowth, siting order and the ladder's schedule* — no input / nothing to act on; defined by: "Upgrades and reopenings take no cap, as the tier's placements take none (a rise is met in the epoch it arrives, item 8 (f)), so no cap can make tier …"
* M-V06-1599-E2-one — UNTESTED — V06 §3.8 *3.8 Regrowth, siting order and the ladder's schedule* — exactly one item; defined by: "A retired way that is locked or pinned is never reopened by the engine (V6 §3.1's protection): a plot whose path to the ways in use needs one is no c…"
* M-V06-1599-E3-cap — UNTESTED — V06 §3.8 *3.8 Regrowth, siting order and the ladder's schedule* — the maximum and its caps; defined by: "At every placement an epoch makes — every siting tier (0)–(5), the village's (6v)–(9v) (V07 §3.12), the use phase's openings and moves (V6 §3.9.5, §3…"
* M-V06-1599-E4-degenerate — UNDEFINED — V06 §3.8 *3.8 Regrowth, siting order and the ladder's schedule* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V06-1599-E5-data — UNTESTED — V06 §3.8 *3.8 Regrowth, siting order and the ladder's schedule* — missing, empty or contradictory data (the dossier included); defined by: "* (3) `rebuild` or `reuse … build` on ruins, burned shells and cleared traces — the class by S10b's class mix at the plot's field band (item 71); the…"
* M-V06-1599-E6-rungs — UNTESTED — V06 §3.8 *3.8 Regrowth, siting order and the ladder's schedule* — every rung from THORP to the METROPOLIS cap; defined by: "At every placement an epoch makes — every siting tier (0)–(5), the village's (6v)–(9v) (V07 §3.12), the use phase's openings and moves (V6 §3.9.5, §3…"
* M-V06-1599-E8-lifecycle — UNTESTED — V06 §3.8 *3.8 Regrowth, siting order and the ladder's schedule* — save, load, undo, redo, regenerate and migrate; defined by: "At every placement an epoch makes — every siting tier (0)–(5), the village's (6v)–(9v) (V07 §3.12), the use phase's openings and moves (V6 §3.9.5, §3…"
* M-V06-1678-E4-degenerate — UNDEFINED — V06 §3.9 *3.9 Uses that move (item 17), the siting rulebook over time (item 103…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V6-14, T-V6-41, T-V6-42, T-V6-43
* M-V06-1934-E1-none — UNTESTED — V06 §3.10 *3.10 Designation mutations over epochs — the `MutationPlan` (item 18 …* — no input / nothing to act on; defined by: "* **occupy** — nothing geometric: the use opens in the building as it stands."
* M-V06-1934-E2-one — UNTESTED — V06 §3.10 *3.10 Designation mutations over epochs — the `MutationPlan` (item 18 …* — exactly one item; defined by: "A plan is **cancelled** (tombstoned, its done steps standing) when the use it was made for leaves the building, when its plot is re-derived, or when …"
* M-V06-1934-E3-cap — UNTESTED — V06 §3.10 *3.10 Designation mutations over epochs — the `MutationPlan` (item 18 …* — the maximum and its caps; defined by: "Adapt and extend steps are charged to the district's `fabric` cap and rebuild steps to its `geometry` cap; a step a cap refuses waits for the next ep…"
* M-V06-1934-E5-data — UNTESTED — V06 §3.10 *3.10 Designation mutations over epochs — the `MutationPlan` (item 18 …* — missing, empty or contradictory data (the dossier included); defined by: "Otherwise the plan's first geometric step is due at once (its `dueWeek` the creation week) and the use **opens at the first step whose result is comp…"
* M-V06-1934-E8-lifecycle — UNTESTED — V06 §3.10 *3.10 Designation mutations over epochs — the `MutationPlan` (item 18 …* — save, load, undo, redo, regenerate and migrate; defined by: "`crypt: 'always'`, J-VI.17 H34) the crypt is laid at the occupy step — V02's crypt basement re-derivation, whose ladder never refuses (V02 §3.14.5, B…"
* M-V06-1975-E1-none — UNTESTED — V06 §3.11 *3.11 Hazards — fire, flood and collapse* — no input / nothing to act on; defined by: "On a dossier-bound document the mode is `none` **by rule** — an `adjust` to `minor` or `full` is refused with R2's line "this town's disasters come f…"
* M-V06-1975-E2-one — UNTESTED — V06 §3.11 *3.11 Hazards — fire, flood and collapse* — exactly one item; defined by: "Their count per epoch is `⌊λ⌋` plus one more when a draw falls below `λ − ⌊λ⌋`, with `λ = rate × years` (fire: × the live buildings ÷ 1 000), drawn f…"
* M-V06-1975-E3-cap — UNTESTED — V06 §3.11 *3.11 Hazards — fire, flood and collapse* — the maximum and its caps; defined by: "`params.week` its week — an integer in `(prevWeek, week]`, a value outside clamped to that range and reported."
* M-V06-1975-E4-degenerate — UNDEFINED — V06 §3.11 *3.11 Hazards — fire, flood and collapse* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V06-1975-E5-data — UNTESTED — V06 §3.11 *3.11 Hazards — fire, flood and collapse* — missing, empty or contradictory data (the dossier included); defined by: "**3.11.1 Where hazards come from.** (a) **Circumstance events** — `EpochInputs.events` entries whose `kind` names a `HazardRow` (V6 §2.4), from the s…"
* M-V06-1975-E6-rungs — UNDEFINED — V06 §3.11 *3.11 Hazards — fire, flood and collapse* — every rung from THORP to the METROPOLIS cap
* M-V06-1975-E8-lifecycle — UNDEFINED — V06 §3.11 *3.11 Hazards — fire, flood and collapse* — save, load, undo, redo, regenerate and migrate
* M-V06-2063-E1-none — UNDEFINED — V06 §3.12 *3.12 Terrain and water over epochs (item 25)* — no input / nothing to act on
* M-V06-2063-E2-one — UNDEFINED — V06 §3.12 *3.12 Terrain and water over epochs (item 25)* — exactly one item
* M-V06-2063-E3-cap — UNTESTED — V06 §3.12 *3.12 Terrain and water over epochs (item 25)* — the maximum and its caps; defined by: "The `terrainWater` phase visits candidates in address order; each fires at most once per body per epoch."
* M-V06-2063-E4-degenerate — UNDEFINED — V06 §3.12 *3.12 Terrain and water over epochs (item 25)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V06-2063-E5-data — UNTESTED — V06 §3.12 *3.12 Terrain and water over epochs (item 25)* — missing, empty or contradictory data (the dossier included); defined by: "The region is the whole face when it is at most `reclaim.maxHa`, else its part within `reclaim.bufferM` of built land, clipped to `reclaim.maxHa` fro…"
* M-V06-2063-E7-toggles — UNTESTED — V06 §3.12 *3.12 Terrain and water over epochs (item 25)* — every toggle and preset (parity presets, every layer on and off); defined by: "(b) a reach within `silt.downstreamM` below a course change or a canal off-take made since the reach's last silting;"
* M-V06-2063-E8-lifecycle — UNDEFINED — V06 §3.12 *3.12 Terrain and water over epochs (item 25)* — save, load, undo, redo, regenerate and migrate
* M-V06-2097-E1-none — UNTESTED — V06 §3.13 *3.13 Works on the weekly clock (item 67) — scheduling what the epoch …* — no input / nothing to act on; defined by: "**Displaced people.** A demolition's or a fire's households enter the ledger (V6 §2.1) and are housed by `siting` in the same epoch, so none is in tr…"
* M-V06-2097-E2-one — UNTESTED — V06 §3.13 *3.13 Works on the weekly clock (item 67) — scheduling what the epoch …* — exactly one item; defined by: "The `works` phase (step 18) is the one place the engine creates them, after every other phase has committed its ops: 1."
* M-V06-2097-E4-degenerate — UNDEFINED — V06 §3.13 *3.13 Works on the weekly clock (item 67) — scheduling what the epoch …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V06-2097-E5-data — UNDEFINED — V06 §3.13 *3.13 Works on the weekly clock (item 67) — scheduling what the epoch …* — missing, empty or contradictory data (the dossier included)
* M-V06-2097-E8-lifecycle — UNDEFINED — V06 §3.13 *3.13 Works on the weekly clock (item 67) — scheduling what the epoch …* — save, load, undo, redo, regenerate and migrate
* M-V06-2138-E5-data — UNTESTED — V06 §3.14 *3.14 People over time — ageing and the derived succession of househol…* — missing, empty or contradictory data (the dossier included); defined by: "`lifespanYears`, uniform in its ancestry row's `lifespan` (default [45, 80]; our own), and `entryAge`, the age a successor enters at — 0 with weight …"
* M-V06-2138-E8-lifecycle — UNTESTED — V06 §3.14 *3.14 People over time — ageing and the derived succession of househol…* — save, load, undo, redo, regenerate and migrate; defined by: "**Moves and ends.** A household that relocates keeps its address, so its people persist; one that leaves the town (departures) takes them with it; a …"
* M-V06-2163-E1-none — UNTESTED — V06 §3.15 *3.15 The history record, replay and time scrubbing* — no input / nothing to act on; defined by: "**3.15.4 The timeline bar's reading.** The bar spans the creation week to the current week (and, for a standalone document, the planned trajectory's …"
* M-V06-2163-E2-one — UNTESTED — V06 §3.15 *3.15 The history record, replay and time scrubbing* — exactly one item; defined by: "`decline` for a district whose households fell by at least `chronicle.declineShare` in the epoch, `regrowth` for one whose reoccupations reached `chr…"
* M-V06-2163-E4-degenerate — UNDEFINED — V06 §3.15 *3.15 The history record, replay and time scrubbing* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V06-2163-E5-data — UNTESTED — V06 §3.15 *3.15 The history record, replay and time scrubbing* — missing, empty or contradictory data (the dossier included); defined by: "**3.15.2 Frames — the town at any week.** `locate(w)` (J-V6.36): for `w` after the last epoch's week, the current model; for `w` at or before the cre…"
* M-V06-2163-E8-lifecycle — UNTESTED — V06 §3.15 *3.15 The history record, replay and time scrubbing* — save, load, undo, redo, regenerate and migrate; defined by: "The frame builder (in the generation worker) makes the model for an epoch `e` by the cheapest of: 1. a cached `HistoryFrame` (LRU, the device's frame…"
* M-V06-2243-E4-degenerate — UNDEFINED — V06 §3.16 *3.16 Determinism* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-1
* M-V06-2293-E1-none — UNTESTED — V06 §3.17 *3.17 Failure handling — never a whole-map retry (§5)* — no input / nothing to act on; defined by: "**The report.** Every skip, wait, hit, clamp, re-plan and held entity is an entry of the `EpochReport` with its cause; nothing the engine declined to…"
* M-V06-2293-E2-one — UNTESTED — V06 §3.17 *3.17 Failure handling — never a whole-map retry (§5)* — exactly one item; defined by: "**A refused op** (a conflict the candidate filter could not see; an invariant a batch would break, §5.3) is rolled back alone — its batch is one tran…"
* M-V06-2293-E4-degenerate — UNDEFINED — V06 §3.17 *3.17 Failure handling — never a whole-map retry (§5)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V06-2293-E5-data — UNTESTED — V06 §3.17 *3.17 Failure handling — never a whole-map retry (§5)* — missing, empty or contradictory data (the dossier included); defined by: "**A refused op** (a conflict the candidate filter could not see; an invariant a batch would break, §5.3) is rolled back alone — its batch is one tran…"
* M-V06-2293-E8-lifecycle — UNDEFINED — V06 §3.17 *3.17 Failure handling — never a whole-map retry (§5)* — save, load, undo, redo, regenerate and migrate
* M-V06-2323-E4-degenerate — UNDEFINED — V06 §3.18 *3.18 The underground over epochs (item 109 (h), (j) (1)–(5) with (3b)…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V6-34, T-V6-36, T-V6-37, T-V6-52
* M-V06-2540-E4-degenerate — UNDEFINED — V06 §3.19 *3.19 Item 110 over epochs — raised ways, retaining walls and decks (i…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-39, T-V1-40, T-V1-41, T-V3-30
* M-V06-2905-E1-none — UNTESTED — V06 §4.1 *4.1 Advancing time (`advance`) — T1's time card, the clerk and the CLI* — no input / nothing to act on; defined by: ""Advance … years", a shape chip (grow by a share, reach a population, decline, hold, follow the timeline — mapped to the trajectory by V6 §2.3's tabl…"
* M-V06-2905-E2-one — UNTESTED — V06 §4.1 *4.1 Advancing time (`advance`) — T1's time card, the clerk and the CLI* — exactly one item; defined by: "* **A lone neighbourhood document** (V01 J-V1.36;"
* M-V06-2905-E4-degenerate — UNDEFINED — V06 §4.1 *4.1 Advancing time (`advance`) — T1's time card, the clerk and the CLI* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V06-2905-E5-data — UNTESTED — V06 §4.1 *4.1 Advancing time (`advance`) — T1's time card, the clerk and the CLI* — missing, empty or contradictory data (the dossier included); defined by: ""Advance … years", a shape chip (grow by a share, reach a population, decline, hold, follow the timeline — mapped to the trajectory by V6 §2.3's tabl…"
* M-V06-2905-E8-lifecycle — UNTESTED — V06 §4.1 *4.1 Advancing time (`advance`) — T1's time card, the clerk and the CLI* — save, load, undo, redo, regenerate and migrate; defined by: "* **What it appends.** One `group` (§7.4) of `epoch` events, one per cadence step (V6 §3.3.2), each folded before the next is built and each carrying…"
* M-V06-2939-E1-none — UNTESTED — V06 §4.2 *4.2 The hand forms of the engine's changes* — no input / nothing to act on; defined by: ""clear its trouble" ¦ `setAttr` on `Use.strain` (absent) ¦ the event's undo ¦"
* M-V06-2939-E2-one — UNTESTED — V06 §4.2 *4.2 The hand forms of the engine's changes* — exactly one item; defined by: "a fire, a flood, a collapse ¦ a hazard tray on the history panel: drop a spark, draw a flood depth, tap a tower ¦ the operator's dry run (V6 §3.11) —…"
* M-V06-2939-E4-degenerate — UNDEFINED — V06 §4.2 *4.2 The hand forms of the engine's changes* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V06-2939-E5-data — UNTESTED — V06 §4.2 *4.2 The hand forms of the engine's changes* — missing, empty or contradictory data (the dossier included); defined by: ""clear its trouble" ¦ `setAttr` on `Use.strain` (absent) ¦ the event's undo ¦"
* M-V06-2939-E6-rungs — UNDEFINED — V06 §4.2 *4.2 The hand forms of the engine's changes* — every rung from THORP to the METROPOLIS cap
* M-V06-2939-E8-lifecycle — UNTESTED — V06 §4.2 *4.2 The hand forms of the engine's changes* — save, load, undo, redo, regenerate and migrate; defined by: "change ¦ tool and gesture (item 101) ¦ event ¦ undo and lifecycle ¦ ¦---¦---¦---¦---¦"
* M-V06-2988-E1-none — UNDEFINED — V06 §4.3 *4.3 Locality, locks and the order of events* — no input / nothing to act on; tests seen: T-V6-3
* M-V06-2988-E2-one — UNDEFINED — V06 §4.3 *4.3 Locality, locks and the order of events* — exactly one item; tests seen: T-V6-3
* M-V06-3004-E8-lifecycle — UNDEFINED — V06 §4.4 *4.4 Editing the past — forks and re-runs* — save, load, undo, redo, regenerate and migrate; tests seen: T-V6-22, T-V6-27, T-V6-28, T-V6-29
* M-V06-3029-E6-rungs — UNDEFINED — V06 §4.5 *4.5 The clerk's view (volume 10 owns the prompts; this volume owns wh…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V6-53
* M-V06-3064-E1-none — UNTESTED — V06 §5.1 *5.1 Rendering — every new state has its drawing* — no input / nothing to act on; defined by: "an absorbed wall (`absorbWall`) ¦ the `plot_line` rows it now is; the runs not yet `dismantled` draw by the base's superseded-wall `trace` treatment …"
* M-V06-3064-E2-one — UNTESTED — V06 §5.1 *5.1 Rendering — every new state has its drawing* — exactly one item; defined by: "BCR-V6-11): a track from the creation year to the current year (a dashed tail to a standalone trajectory's end); ticks for epochs, dots for chronicle…"
* M-V06-3064-E4-degenerate — UNDEFINED — V06 §5.1 *5.1 Rendering — every new state has its drawing* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V06-3064-E5-data — UNTESTED — V06 §5.1 *5.1 Rendering — every new state has its drawing* — missing, empty or contradictory data (the dossier included); defined by: "BCR-V6-11): a track from the creation year to the current year (a dashed tail to a standalone trajectory's end); ticks for epochs, dots for chronicle…"
* M-V06-3064-E7-toggles — UNTESTED — V06 §5.1 *5.1 Rendering — every new state has its drawing* — every toggle and preset (parity presets, every layer on and off); defined by: "a void unexcavated, opened, settled, sealed ¦ V04's unexcavated style under V09's `showUnexcavated` toggle; its access symbols; its dwellings by the …"
* M-V06-3064-E8-lifecycle — UNDEFINED — V06 §5.1 *5.1 Rendering — every new state has its drawing* — save, load, undo, redo, regenerate and migrate
* M-V06-3103-E4-degenerate — UNDEFINED — V06 §5.2 *5.2 Labels, names and words* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V6-26
* M-V06-3126-E4-degenerate — UNDEFINED — V06 §5.3 *5.3 Exports* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V6-21, T-V6-27, T-V6-28, T-V6-29
* EI-V06-EDGE-1 — UNDEFINED (inventory V06-EDGE-1) — V6 §2.3 Trajectory, §3.3.2 expansion — Degenerate advance inputs have no defined outcome: a spanYears below half a week rounds spanYears × 52 to 0, so W_n = W0 and f_i = (W_i − W0) ÷ (W_n − W0) is 0 ÷ 0; cadenceWeeks ≤ 0 (the field is a free number) makes n = ⌈spanYears × 52 ÷ cadenceWeeks⌉ undefined; a points trajectory with unsorted or duplicate weeks, or a negative target or perYear ≤ −1, is not addressed (the clamp covers only the…
* EI-V06-EDGE-2 — UNDEFINED (inventory V06-EDGE-2) — V6 §4.1 Undo, §2.12 advance row — An advance group undoes 'by restoring the checkpoint taken before the group's first epoch … in an unshared document'; the outcome is undefined (and untested) when the document was saved and reloaded after the group (checkpoints and the history store are memory, not saved) and when the document is shared (the truncation is stated only for an unshared one) — principle (11)'s 'an epoch undone after …

### V07

* M-V07-833-E5-data — UNTESTED — V07 §2.3 *2.3 Records* — missing, empty or contradictory data (the dossier included); defined by: "`YardPart.kind` is data-defined; each with its V07 §5.1 role and its V07 §5.4 export row); a **named beach** is no record — the `beach` run of the sh…"
* M-V07-1235-E5-data — UNTESTED — V07 §2.7 *2.7 The request block, the field groups and the class column* — missing, empty or contradictory data (the dossier included); defined by: "`BuildingClassRow` gains `villageForm?: string` (BCR-V7-21; file f item 432): it **names a `v.` class** — the village row that plays this class at vi…"
* M-V07-1281-E1-none — UNDEFINED — V07 §3.0 *3.0 The village pipeline — stages, order and data keys* — no input / nothing to act on; tests seen: T-V7-3
* M-V07-1281-E4-degenerate — UNDEFINED — V07 §3.0 *3.0 The village pipeline — stages, order and data keys* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V7-3
* M-V07-1354-E1-none — UNTESTED — V07 §3.1 *3.1 S0 — the village draws* — no input / nothing to act on; defined by: "IN-V07-3) — forces a watercourse that the through road crosses: when terrain, access, the realm cell and this draw give none (`none`, or a still wate…"
* M-V07-1354-E2-one — UNTESTED — V07 §3.1 *3.1 S0 — the village draws* — exactly one item; defined by: "**u** — a single draw, uniform on (0, 1);"
* M-V07-1354-E5-data — UNTESTED — V07 §3.1 *3.1 S0 — the village draws* — missing, empty or contradictory data (the dossier included); defined by: "With such a fixed word, or on `desert` without `oasis_water`, no brook is forced: the toll house stands at an entry (else on the heart's approach) an…"
* M-V07-1354-E6-rungs — UNTESTED — V07 §3.1 *3.1 S0 — the village draws* — every rung from THORP to the METROPOLIS cap; defined by: "S0 resolves the `VillageRequest` (§2.7): a value the request or a dossier gives is taken (its source recorded), and every `auto` is drawn once on `bl…"
* M-V07-1354-E8-lifecycle — UNDEFINED — V07 §3.1 *3.1 S0 — the village draws* — save, load, undo, redo, regenerate and migrate
* M-V07-1395-E4-degenerate — UNDEFINED — V07 §3.2 *3.2 S1 over the territory, S2 at village rungs, and VS1 — heart, nucl…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V7-13, T-V7-24
* M-V07-1395-E8-lifecycle — UNDEFINED — V07 §3.2 *3.2 S1 over the territory, S2 at village rungs, and VS1 — heart, nucl…* — save, load, undo, redo, regenerate and migrate; tests seen: T-V7-13, T-V7-24
* M-V07-1512-E3-cap — UNDEFINED — V07 §3.3 *3.3 VS2 — the density raster* — the maximum and its caps; tests seen: T-V7-19, T-V7-20, T-V7-21
* M-V07-1544-E1-none — UNTESTED — V07 §3.4 *3.4 VS3 — the palisade, before the roads* — no input / nothing to act on; defined by: "VS6 marks every block face there that lies outside the pre-reach trace as **reached** (`village.reached`, §2.7; no frontage runs on it);"
* M-V07-1544-E2-one — UNTESTED — V07 §3.4 *3.4 VS3 — the palisade, before the roads* — exactly one item; defined by: "*Reaching the barrier.* With `reach = min(wall.barrierReachM, palisade.barrierReachShare · R_s)` (the base's 150 m cap at the VILLAGE target, ≈ 120 m…"
* M-V07-1544-E4-degenerate — UNDEFINED — V07 §3.4 *3.4 VS3 — the palisade, before the roads* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V07-1544-E5-data — UNTESTED — V07 §3.4 *3.4 VS3 — the palisade, before the roads* — missing, empty or contradictory data (the dossier included); defined by: "By default: a."
* M-V07-1544-E6-rungs — UNTESTED — V07 §3.4 *3.4 VS3 — the palisade, before the roads* — every rung from THORP to the METROPOLIS cap; defined by: "`policy = { waterfront: 'open', placement: 'aroundAll' }`; the density raster is read through the stage's declared input `village.density` in `ctx`."
* M-V07-1604-E4-degenerate — UNDEFINED — V07 §3.5 *3.5 VS4 — the tracker-steered network* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V7-46
* M-V07-1604-E8-lifecycle — UNDEFINED — V07 §3.5 *3.5 VS4 — the tracker-steered network* — save, load, undo, redo, regenerate and migrate; tests seen: T-V7-46
* M-V07-1722-E4-degenerate — UNDEFINED — V07 §3.5a *3.5a A raised way on a village map (file g item 110 (b) as revised ~2…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V7-46, T-V7-52
* M-V07-1807-E1-none — UNTESTED — V07 §3.6 *3.6 The open space — a green or a small square* — no input / nothing to act on; defined by: "The member binds to it (its row builds nothing)."
* M-V07-1807-E2-one — UNTESTED — V07 §3.6 *3.6 The open space — a green or a small square* — exactly one item; defined by: "**Shape.** A `square`: round with probability `open.round[dry¦water]` (0.7 / 0.9) — a regular polygon of one vertex per ≈ 3.5 m of circumference, ran…"
* M-V07-1807-E4-degenerate — UNDEFINED — V07 §3.6 *3.6 The open space — a green or a small square* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V07-1807-E5-data — UNTESTED — V07 §3.6 *3.6 The open space — a green or a small square* — missing, empty or contradictory data (the dossier included); defined by: "**Shape.** A `square`: round with probability `open.round[dry¦water]` (0.7 / 0.9) — a regular polygon of one vertex per ≈ 3.5 m of circumference, ran…"
* M-V07-1807-E6-rungs — UNTESTED — V07 §3.6 *3.6 The open space — a green or a small square* — every rung from THORP to the METROPOLIS cap; defined by: "All draws on `village.open` keyed by the nucleus ordinal. 1."
* M-V07-1807-E8-lifecycle — UNDEFINED — V07 §3.6 *3.6 The open space — a green or a small square* — save, load, undo, redo, regenerate and migrate
* M-V07-1869-E1-none — UNTESTED — V07 §3.7 *3.7 VS5 — the perimeter and the one village district* — no input / nothing to act on; defined by: "The result is inserted as L1 chains with the `perimeter` role by the base's same-level splits (the base's §3.3), so every network face it crosses is …"
* M-V07-1869-E2-one — UNTESTED — V07 §3.7 *3.7 VS5 — the perimeter and the one village district* — exactly one item; defined by: "**The perimeter.** The region where the density is at least `populated`, closed by a 20 m morphological close and Chaikin-smoothed, united with the p…"
* M-V07-1869-E4-degenerate — UNDEFINED — V07 §3.7 *3.7 VS5 — the perimeter and the one village district* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V07-1869-E6-rungs — UNTESTED — V07 §3.7 *3.7 VS5 — the perimeter and the one village district* — every rung from THORP to the METROPOLIS cap; defined by: "**The perimeter.** The region where the density is at least `populated`, closed by a 20 m morphological close and Chaikin-smoothed, united with the p…"
* M-V07-1896-E1-none — UNTESTED — V07 §3.8 *3.8 VS6 and S9–S11 — houses along ways: tofts, crofts and the slot ra…* — no input / nothing to act on; defined by: "**VS6, the fabric** (`FabricStrategy 'village-ways'`, PART III item 3): no block is cut."
* M-V07-1896-E2-one — UNTESTED — V07 §3.8 *3.8 VS6 and S9–S11 — houses along ways: tofts, crofts and the slot ra…* — exactly one item; defined by: "Each slot is cut perpendicular to its frontage into **one plot** with two yard parts, the **toft** (the house yard, `toft.toftM` deep) and the **crof…"
* M-V07-1896-E3-cap — UNTESTED — V07 §3.8 *3.8 VS6 and S9–S11 — houses along ways: tofts, crofts and the slot ra…* — the maximum and its caps; defined by: "A block face deeper than twice the band's toft-plus-croft depth keeps its interior beyond the crofts as a **back close** — a `close` plot owned by th…"
* M-V07-1896-E4-degenerate — UNTESTED — V07 §3.8 *3.8 VS6 and S9–S11 — houses along ways: tofts, crofts and the slot ra…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); defined by: "VS6 estimates the slot count of every frontage run as its length ÷ the frontage centre of the band its prosperity (pass 1) reads, and the institution…"
* M-V07-1896-E5-data — UNTESTED — V07 §3.8 *3.8 VS6 and S9–S11 — houses along ways: tofts, crofts and the slot ra…* — missing, empty or contradictory data (the dossier included); defined by: "**Block quotas (S10a).** The village dwellings `D_v` (§3.2 (3)) and the institutions are allocated to blocks (reached faces excluded) in proportion t…"
* M-V07-1896-E6-rungs — UNTESTED — V07 §3.8 *3.8 VS6 and S9–S11 — houses along ways: tofts, crofts and the slot ra…* — every rung from THORP to the METROPOLIS cap; defined by: "**VS6, the fabric** (`FabricStrategy 'village-ways'`, PART III item 3): no block is cut."
* M-V07-1973-E4-degenerate — UNDEFINED — V07 §3.8a *3.8a Levelling and retaining walls at village rungs (file g item 110 …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V7-3
* M-V07-2035-E4-degenerate — UNDEFINED — V07 §3.9 *3.9 S12a and the hinterland unit at village rungs — fields, meadow, c…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-37, T-V7-17, T-V8-17, T-V8-18
* M-V07-2108-E1-none — UNTESTED — V07 §3.10 *3.10 The wharf and piers (VS4's step); VS8 — ends, pins and names* — no input / nothing to act on; defined by: "The rows above run first; then a `@pin:<kind>` record (V11 §3.11) binds to a standing pin of its kind within `presence.siteReachM` of the frame's cen…"
* M-V07-2108-E2-one — UNTESTED — V07 §3.10 *3.10 The wharf and piers (VS4's step); VS8 — ends, pins and names* — exactly one item; defined by: "**The wharf, landings and piers — VS4's seeding step 5** (ref:VG 1.6.9 wharf and piers (code), D5.11, restated in metres; laid in VS4's one L1 batch,…"
* M-V07-2108-E3-cap — UNTESTED — V07 §3.10 *3.10 The wharf and piers (VS4's step); VS8 — ends, pins and names* — the maximum and its caps; defined by: "Without a wharf, every `Landing` recorded, with no bridge nearby, takes a single pier `s · (1 − ½F4)` long when that fits the river's maximum."
* M-V07-2108-E4-degenerate — UNDEFINED — V07 §3.10 *3.10 The wharf and piers (VS4's step); VS8 — ends, pins and names* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V07-2108-E5-data — UNTESTED — V07 §3.10 *3.10 The wharf and piers (VS4's step); VS8 — ends, pins and names* — missing, empty or contradictory data (the dossier included); defined by: "A `market_cross` stands at the centre of the reservation that carries the market (the open space, or the flanking square; §3.6 (4)), replacing the ce…"
* M-V07-2108-E6-rungs — UNTESTED — V07 §3.10 *3.10 The wharf and piers (VS4's step); VS8 — ends, pins and names* — every rung from THORP to the METROPOLIS cap; defined by: "Draws on `village.slot` keyed by the wharf's lineage."
* M-V07-2108-E8-lifecycle — UNTESTED — V07 §3.10 *3.10 The wharf and piers (VS4's step); VS8 — ends, pins and names* — save, load, undo, redo, regenerate and migrate; defined by: "The churchyard `cross` of a wayside shrine merged into a parish church (§2.4's REPLACEMENT row) is laid in the parish church's `churchyard` yard part…"
* M-V07-2185-E4-degenerate — UNDEFINED — V07 §3.10a *3.10a Deck plots at village rungs (file g item 110 (d); J-V7.91)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V7-2
* M-V07-2217-E4-degenerate — UNDEFINED — V07 §3.11 *3.11 The SettlementForge small-settlement dossiers — what the village…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V7-13, T-V7-21, T-V8-46
* M-V07-2411-E4-degenerate — UNDEFINED — V07 §3.12 *3.12 Over time — the village's epochs, desertion, and the ladder hand…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-1, T-V6-1
* M-V07-2746-E1-none — UNDEFINED — V07 §3.13 *3.13 Failure handling — the village ladders (never a whole-map retry,…* — no input / nothing to act on; tests seen: T-V7-10, T-V7-11, T-V7-13, T-V7-31
* M-V07-2746-E4-degenerate — UNDEFINED — V07 §3.13 *3.13 Failure handling — the village ladders (never a whole-map retry,…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V7-10, T-V7-11, T-V7-13, T-V7-31
* M-V07-2746-E5-data — UNDEFINED — V07 §3.13 *3.13 Failure handling — the village ladders (never a whole-map retry,…* — missing, empty or contradictory data (the dossier included); tests seen: T-V7-10, T-V7-11, T-V7-13, T-V7-31
* M-V07-2770-E1-none — UNDEFINED — V07 §3.14 *3.14 Determinism — streams, addresses, locality* — no input / nothing to act on; tests seen: T-V7-18
* M-V07-2858-E1-none — UNDEFINED — V07 §3.16 *3.16 Caverns and ruins under a thorp, hamlet or village (file g item …* — no input / nothing to act on; tests seen: T-V7-38
* M-V07-2858-E2-one — UNDEFINED — V07 §3.16 *3.16 Caverns and ruins under a thorp, hamlet or village (file g item …* — exactly one item; tests seen: T-V7-38
* M-V07-2858-E4-degenerate — UNDEFINED — V07 §3.16 *3.16 Caverns and ruins under a thorp, hamlet or village (file g item …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V7-38
* M-V07-2950-E4-degenerate — UNDEFINED — V07 §4.1 *4.1 The twelve tools on a village* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V7-19, T-V7-20, T-V7-21, T-V7-52
* M-V07-2987-E2-one — UNDEFINED — V07 §4.2 *4.2 The new event forms* — exactly one item
* M-V07-2987-E6-rungs — UNTESTED — V07 §4.2 *4.2 The new event forms* — every rung from THORP to the METROPOLIS cap; defined by: "`setAttr` reaches the village's recorded inputs — `VillagePlan.form`, `.roads`, `.nuclei`, `.character.*` (each a recorded input, §2.3), `VillageRequ…"
* M-V07-2987-E8-lifecycle — UNTESTED — V07 §4.2 *4.2 The new event forms* — save, load, undo, redo, regenerate and migrate; defined by: "`setAttr` reaches the village's recorded inputs — `VillagePlan.form`, `.roads`, `.nuclei`, `.character.*` (each a recorded input, §2.3), `VillageRequ…"
* M-V07-3007-E4-degenerate — UNDEFINED — V07 §4.3 *4.3 Locality — what each village edit re-derives* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V07-3007-E6-rungs — UNTESTED — V07 §4.3 *4.3 Locality — what each village edit re-derives* — every rung from THORP to the METROPOLIS cap; defined by: ""the village is re-laid around the new heart;"
* M-V07-3007-E8-lifecycle — UNTESTED — V07 §4.3 *4.3 Locality — what each village edit re-derives* — save, load, undo, redo, regenerate and migrate; defined by: "edit ¦ re-derives from ¦ effective scope (§7.3) ¦ fate report says ¦ ¦---¦---¦---¦---¦"
* M-V07-3036-E1-none — UNTESTED — V07 §4.4 *4.4 Lifecycle of every village edit kind (§7.4's columns)* — no input / nothing to act on; defined by: "`retireWay`, `effaceWay`, `reopenWay` (a hand `convert`, or the epoch's ops at a village rung) ¦ the event or the epoch's op ¦ the network's readers …"
* M-V07-3036-E2-one — UNTESTED — V07 §4.4 *4.4 Lifecycle of every village edit kind (§7.4's columns)* — exactly one item; defined by: "`retypeLand` (one lifecycle row with volume 6's, file f item 209) ¦ `convert` (hand) or an epoch's op ¦ S12b, the hinterland unit, render ¦ log / the…"
* M-V07-3036-E4-degenerate — UNDEFINED — V07 §4.4 *4.4 Lifecycle of every village edit kind (§7.4's columns)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V07-3036-E5-data — UNTESTED — V07 §4.4 *4.4 Lifecycle of every village edit kind (§7.4's columns)* — missing, empty or contradictory data (the dossier included); defined by: "`drawWall` `retaining`; the T2 terrace stroke ¦ the event ¦ S10–S11's levelling, the hinterland unit, render, exports, the clerk ¦ log ¦ held (a draw…"
* M-V07-3036-E6-rungs — UNTESTED — V07 §4.4 *4.4 Lifecycle of every village edit kind (§7.4's columns)* — every rung from THORP to the METROPOLIS cap; defined by: "`declareEnd` ¦ the event (sugar `quarter` at a village rung) ¦ VS8, labels, exports ¦ log ¦ held: its lasso's plots re-joined on every re-derivation;…"
* M-V07-3036-E8-lifecycle — UNTESTED — V07 §4.4 *4.4 Lifecycle of every village edit kind (§7.4's columns)* — save, load, undo, redo, regenerate and migrate; defined by: "edit kind ¦ create ¦ read ¦ persist ¦ regenerate ¦ undo ¦ migrate ¦ ¦---¦---¦---¦---¦---¦---¦---¦"
* M-V07-3052-E4-degenerate — UNDEFINED — V07 §4.5 *4.5 The clerk's view* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V07-3052-E5-data — UNDEFINED — V07 §4.5 *4.5 The clerk's view* — missing, empty or contradictory data (the dossier included)
* M-V07-3052-E6-rungs — UNTESTED — V07 §4.5 *4.5 The clerk's view* — every rung from THORP to the METROPOLIS cap; defined by: "The clerk (V10, over §11.2's tool API) reads the same records a person sees: the `VillagePlan` (form, heart, character), the ends, the fields, the pa…"
* M-V07-3052-E8-lifecycle — UNDEFINED — V07 §4.5 *4.5 The clerk's view* — save, load, undo, redo, regenerate and migrate
* M-V07-3084-E1-none — UNDEFINED — V07 §5.1 *5.1 The look — the `painterly` family built, `ink` one click away* — no input / nothing to act on; tests seen: T-V7-25
* M-V07-3084-E4-degenerate — UNDEFINED — V07 §5.1 *5.1 The look — the `painterly` family built, `ink` one click away* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V7-25
* M-V07-3084-E8-lifecycle — UNDEFINED — V07 §5.1 *5.1 The look — the `painterly` family built, `ink` one click away* — save, load, undo, redo, regenerate and migrate; tests seen: T-V7-25
* M-V07-3179-E6-rungs — UNTESTED — V07 §5.2 *5.2 Bands, the first view and level of detail* — every rung from THORP to the METROPOLIS cap; defined by: "The four bands read at village scale (§8.5's `LodBand`):"
* M-V07-3189-E5-data — UNTESTED — V07 §5.3 *5.3 Labels and map furniture* — missing, empty or contradictory data (the dossier included); defined by: ""the hamlet of …"; else the rung's), then a **water qualifier** from the resolved water type (our own row: riverside, by the sea, on the island, at t…"
* M-V07-3189-E6-rungs — UNTESTED — V07 §5.3 *5.3 Labels and map furniture* — every rung from THORP to the METROPOLIS cap; defined by: "* **The title plate** — the village's name, its tier word (the dossier's when bound:"
* M-V07-3207-E1-none — UNDEFINED — V07 §5.4 *5.4 Exports* — no input / nothing to act on
* M-V07-3207-E2-one — UNTESTED — V07 §5.4 *5.4 Exports* — exactly one item; defined by: "VTT scenes (one at the district band — the palisade and buildings as walls, gates as doors — and one at the city band); glTF / OBJ with heights;"
* M-V07-3207-E4-degenerate — UNDEFINED — V07 §5.4 *5.4 Exports* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V07-3207-E6-rungs — UNTESTED — V07 §5.4 *5.4 Exports* — every rung from THORP to the METROPOLIS cap; defined by: "Every base format exports a village (§11.1):"

### V08

* M-V08-387-E5-data — UNDEFINED — V08 §2.1 *2.1 The map record — what SettlementForge stores beside the dossier* — missing, empty or contradictory data (the dossier included)
* M-V08-444-E5-data — UNDEFINED — V08 §2.2 *2.2 The bridge additions and the host client* — missing, empty or contradictory data (the dossier included); tests seen: T-V8-3, T73-1, T73-7
* M-V08-544-E5-data — UNDEFINED — V08 §2.3 *2.3 The binding in practice — additions to `DossierBinding`, the carr…* — missing, empty or contradictory data (the dossier included); tests seen: T-V8-5
* M-V08-677-E5-data — UNDEFINED — V08 §2.5 *2.5 The digest's additions, the staged-record event and the per-settl…* — missing, empty or contradictory data (the dossier included); tests seen: T88-1
* M-V08-1218-E5-data — UNTESTED — V08 §2.8 *2.8 Custom content — the records, the chains and the optional library…* — missing, empty or contradictory data (the dossier included); defined by: "`research/sf/dossier-outputs.md` §3.5, `research/sf/dossier-model.md` §13, and the line's custom-content manifest read read-only for item 104).** A c…"
* M-V08-1312-E4-degenerate — UNDEFINED — V08 §3.1 *3.1 The embed: the Map tab, the frame, the boot* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-1, T-V8-2, T-V8-3
* M-V08-1417-E8-lifecycle — UNDEFINED — V08 §3.2 *3.2 When a dossier is offered, and coalescing* — save, load, undo, redo, regenerate and migrate; tests seen: T-V8-6
* M-V08-1468-E1-none — UNDEFINED — V08 §3.4 *3.4 The refresh queue — campaign scale* — no input / nothing to act on
* M-V08-1468-E2-one — UNTESTED — V08 §3.4 *3.4 The refresh queue — campaign scale* — exactly one item; defined by: "The client creates ONE hidden frame (`embed.html#p=2&mode=refresh`: no tile worker, no view, no thumbnail pass until the end) and processes the queue…"
* M-V08-1468-E3-cap — UNTESTED — V08 §3.4 *3.4 The refresh queue — campaign scale* — the maximum and its caps; defined by: "C8-30) → `doc.load` + tail → `dossier.offer` → commit the result → if the tail now exceeds its compaction threshold, compact (V08 §3.7) → render the …"
* M-V08-1468-E5-data — UNDEFINED — V08 §3.4 *3.4 The refresh queue — campaign scale* — missing, empty or contradictory data (the dossier included)
* M-V08-1468-E6-rungs — UNDEFINED — V08 §3.4 *3.4 The refresh queue — campaign scale* — every rung from THORP to the METROPOLIS cap
* M-V08-1468-E8-lifecycle — UNTESTED — V08 §3.4 *3.4 The refresh queue — campaign scale* — save, load, undo, redo, regenerate and migrate; defined by: "The queue is persisted by `refreshPending`, so the next page resumes it."
* M-V08-1490-E4-degenerate — UNDEFINED — V08 §3.5 *3.5 `digest` and the diff — from a whole dossier to a list of changes* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-20, T-V8-22, T-V8-34, T-V8-35
* M-V08-1623-E4-degenerate — UNDEFINED — V08 §3.5.1 *3.5.1 The institution ladders (item 108; C8-07)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V7-35, T-V7-36, T-V7-37
* M-V08-1736-E1-none — UNTESTED — V08 §3.6 *3.6 From changes to events and epochs* — no input / nothing to act on; defined by: "From the last epoch's week `W₀` (its `EpochRecord`, else the creation week) to the absorb's week `W₁` (the latest dated week, else `HostContext.week`…"
* M-V08-1736-E2-one — UNTESTED — V08 §3.6 *3.6 From changes to events and epochs* — exactly one item; defined by: "V06 writes the reader, this volume the inputs).** Each newly carried calamity is one entry `{ week, kind: 'calamity', calamity:"
* M-V08-1736-E4-degenerate — UNDEFINED — V08 §3.6 *3.6 From changes to events and epochs* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V08-1736-E5-data — UNTESTED — V08 §3.6 *3.6 From changes to events and epochs* — missing, empty or contradictory data (the dossier included); defined by: "The kinds this volume adds are dated by rows F-V8-1 – F-V8-7 of `tables/dossier/receipts` (BCR-V8-20): a relation by its powers' pulse week when the …"
* M-V08-1736-E6-rungs — UNTESTED — V08 §3.6 *3.6 From changes to events and epochs* — every rung from THORP to the METROPOLIS cap; defined by: "**Emission, by the receipt row's response.** `assign` → an `assign` of a dossier-backed assignment (§7.7 One path: placed by S10b's `dossier` request…"
* M-V08-1736-E8-lifecycle — UNDEFINED — V08 §3.6 *3.6 From changes to events and epochs* — save, load, undo, redo, regenerate and migrate
* M-V08-1813-E4-degenerate — UNDEFINED — V08 §3.7 *3.7 Persistence inside the host — commit, compaction, thumbnails, bac…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-5
* M-V08-1862-E4-degenerate — UNDEFINED — V08 §3.8 *3.8 Versions and migrations on both sides* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-10, T-V8-11
* M-V08-1898-E4-degenerate — UNDEFINED — V08 §3.9 *3.9 Failure handling — every failure, its detection, its rung and wha…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-14, T-V8-15, T-V8-16
* M-V08-1932-E5-data — UNDEFINED — V08 §3.10 *3.10 The village-tier hand-off* — missing, empty or contradictory data (the dossier included); tests seen: T-V8-19
* M-V08-1932-E8-lifecycle — UNDEFINED — V08 §3.10 *3.10 The village-tier hand-off* — save, load, undo, redo, regenerate and migrate; tests seen: T-V8-19
* M-V08-2021-E8-lifecycle — UNDEFINED — V08 §3.12 *3.12 Determinism* — save, load, undo, redo, regenerate and migrate; tests seen: T-V8-3, T-V8-41, T73-8
* M-V08-2032-E1-none — UNTESTED — V08 §3.13 *3.13 Custom content's arrival — records, keywords, chains, services a…* — no input / nothing to act on; defined by: "**Scene tokens.** `sceneProfileId`, `landmarkLevel` and `materialFamily` are checked against the adapter's copy of the line's enumerations (17, 2 and…"
* M-V08-2032-E2-one — UNTESTED — V08 §3.13 *3.13 Custom content's arrival — records, keywords, chains, services a…* — exactly one item; defined by: "Unicode NFKC, lower-cased, split on every character that is not a letter or a digit, tokens shorter than 3 characters dropped; each token and each ad…"
* M-V08-2032-E4-degenerate — UNDEFINED — V08 §3.13 *3.13 Custom content's arrival — records, keywords, chains, services a…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V08-2032-E5-data — UNTESTED — V08 §3.13 *3.13 Custom content's arrival — records, keywords, chains, services a…* — missing, empty or contradictory data (the dossier included); defined by: "The port carries custom content to the map; what the map does with it — the resolution order's rows, the chain's flow order, its closeness at street …"
* M-V08-2032-E8-lifecycle — UNTESTED — V08 §3.13 *3.13 Custom content's arrival — records, keywords, chains, services a…* — save, load, undo, redo, regenerate and migrate; defined by: "The admitted fields are carried in the document, so replay never needs the host (§11.4's rule for host input)."
* M-V08-2104-E6-rungs — UNDEFINED — V08 §3.14 *3.14 The players' view — the party picture set and the party gazettee…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V8-17, T-V8-47
* M-V08-2104-E8-lifecycle — UNDEFINED — V08 §3.14 *3.14 The players' view — the party picture set and the party gazettee…* — save, load, undo, redo, regenerate and migrate; tests seen: T-V8-17, T-V8-47
* M-V08-2175-E1-none — UNDEFINED — V08 §4.1 *4.1 No new declaration; two host-only events; item 110's generated co…* — no input / nothing to act on
* M-V08-2175-E2-one — UNTESTED — V08 §4.1 *4.1 No new declaration; two host-only events; item 110's generated co…* — exactly one item; defined by: "A DM who wants an aqueduct at a TOWN draws it (T4 `road` with `raised`, or the aqueduct class; item 110 (b)); a drawn one is a declaration, held like…"
* M-V08-2175-E5-data — UNTESTED — V08 §4.1 *4.1 No new declaration; two host-only events; item 110's generated co…* — missing, empty or contradictory data (the dossier included); defined by: "The stage adds no authoring tool: a DM edits a SettlementForge map with item 101's twelve tools exactly as a standalone map (§7.1, §14), under §7.7's…"
* M-V08-2175-E8-lifecycle — UNDEFINED — V08 §4.1 *4.1 No new declaration; two host-only events; item 110's generated co…* — save, load, undo, redo, regenerate and migrate
* M-V08-2197-E6-rungs — UNDEFINED — V08 §4.2 *4.2 The host-side actions in the Map tab* — every rung from THORP to the METROPOLIS cap; tests seen: T-V8-47, T-V9-67
* M-V08-2227-E2-one — UNDEFINED — V08 §4.3 *4.3 Locality, protection and the dossier's reach* — exactly one item; tests seen: T20-8
* M-V08-2246-E1-none — UNTESTED — V08 §4.4 *4.4 The host clerk — SettlementForge's assistant as a client of the t…* — no input / nothing to act on; defined by: "SettlementForge's assistant is a clerk in §11.2's sense: it drives the map through the tool API alone, over the bridge, with nothing added for it (§1…"
* M-V08-2246-E2-one — UNTESTED — V08 §4.4 *4.4 The host clerk — SettlementForge's assistant as a client of the t…* — exactly one item; defined by: "When no map is open, the client opens a headless session (the refresh mode's frame, V08 §3.4) for the call and closes it after; the cost is one load …"
* M-V08-2246-E5-data — UNTESTED — V08 §4.4 *4.4 The host clerk — SettlementForge's assistant as a client of the t…* — missing, empty or contradictory data (the dossier included); defined by: "**Prose.** The map passes no dossier prose to any assistant: this port line carries no description seed (V10 §1b.5;"
* M-V08-2246-E8-lifecycle — UNDEFINED — V08 §4.4 *4.4 The host clerk — SettlementForge's assistant as a client of the t…* — save, load, undo, redo, regenerate and migrate
* M-V08-2295-E1-none — UNDEFINED — V08 §4.5 *4.5 Custom content under editing* — no input / nothing to act on
* M-V08-2295-E2-one — UNDEFINED — V08 §4.5 *4.5 Custom content under editing* — exactly one item
* M-V08-2295-E5-data — UNDEFINED — V08 §4.5 *4.5 Custom content under editing* — missing, empty or contradictory data (the dossier included)
* M-V08-2295-E8-lifecycle — UNDEFINED — V08 §4.5 *4.5 Custom content under editing* — save, load, undo, redo, regenerate and migrate
* M-V08-2306-E4-degenerate — UNDEFINED — V08 §4.6 *4.6 The DM's view of what the dossier did* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-14, T-V8-15, T-V8-16
* M-V08-2418-E1-none — UNDEFINED — V08 §5.1 *5.1 The Map tab — what SettlementForge draws and what the frame draws* — no input / nothing to act on; tests seen: T-V9-28
* M-V08-2418-E4-degenerate — UNDEFINED — V08 §5.1 *5.1 The Map tab — what SettlementForge draws and what the frame draws* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-28
* M-V08-2461-E4-degenerate — UNDEFINED — V08 §5.2 *5.2 Drawing the dossier's records and custom content* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-25, T-V9-68
* M-V08-2461-E6-rungs — UNDEFINED — V08 §5.2 *5.2 Drawing the dossier's records and custom content* — every rung from THORP to the METROPOLIS cap; tests seen: T-V8-25, T-V9-68
* M-V08-2482-E1-none — UNDEFINED — V08 §5.3 *5.3 Pictures for SettlementForge's own surfaces* — no input / nothing to act on
* M-V08-2482-E2-one — UNTESTED — V08 §5.3 *5.3 Pictures for SettlementForge's own surfaces* — exactly one item; defined by: "`knowledge` — an `Admission`, BCR-V10-22's type and BCR-V9-14's union (SR2-06) — lowers the requesting editor's key for that one export and never rai…"
* M-V08-2482-E5-data — UNTESTED — V08 §5.3 *5.3 Pictures for SettlementForge's own surfaces* — missing, empty or contradictory data (the dossier included); defined by: "* **Thumbnails** (V08 §3.7): two per map record, `public` and `secret`, 512 px on the long side, the city band, the document's style, the fixed sun, …"
* M-V08-2482-E8-lifecycle — UNDEFINED — V08 §5.3 *5.3 Pictures for SettlementForge's own surfaces* — save, load, undo, redo, regenerate and migrate
* M-V08-2510-E5-data — UNDEFINED — V08 §5.4 *5.4 What leaves the frame — door 1 closed by ruling, and structurally…* — missing, empty or contradictory data (the dossier included); tests seen: T-V8-27
* M-V08-2555-E1-none — UNDEFINED — V08 §5.5 *5.5 Labels* — no input / nothing to act on
* M-V08-2555-E2-one — UNDEFINED — V08 §5.5 *5.5 Labels* — exactly one item
* M-V08-2555-E5-data — UNTESTED — V08 §5.5 *5.5 Labels* — missing, empty or contradictory data (the dossier included); defined by: "The history panel speaks in SettlementForge's own reason words (`DossierChange.reason`) beside the map's rule, and in the DM's language only as far a…"

### V09

* M-V09-477-E5-data — UNDEFINED — V09 §2.3 *2.3 Tools as data — `toolkit.json`* — missing, empty or contradictory data (the dossier included)
* M-V09-544-E5-data — UNDEFINED — V09 §2.5 *2.5 Selection, handles and the count badge* — missing, empty or contradictory data (the dossier included)
* M-V09-572-E5-data — UNTESTED — V09 §2.6 *2.6 The map-side declarations file g asks the interface to store* — missing, empty or contradictory data (the dossier included); defined by: "They live in volume 11's two **document-only tables**, `siting.declared` and `siting.linkEdits` (V11 §4.2, BCR-V11-10), edited by `editTable` row ope…"
* M-V09-598-E5-data — UNTESTED — V09 §2.7 *2.7 The answers the panels render* — missing, empty or contradictory data (the dossier included); defined by: "**item 110** (V9 §4.20.6): a raised way's line is its own `raised` section row — `info.raised.built` (at an epoch with its year), `.carried` or `.dec…"
* M-V09-682-E5-data — UNDEFINED — V09 §2.8 *2.8 History rows and restore points* — missing, empty or contradictory data (the dossier included); tests seen: T-V9-12, T101-1, T101-2
* M-V09-795-E5-data — UNTESTED — V09 §2.10 *2.10 The clerk slot — what the drawer drives* — missing, empty or contradictory data (the dossier included); defined by: "`'secret'` when its tier is `secret`, else `{ tier, places }`."
* M-V09-876-E5-data — UNTESTED — V09 §2.11 *2.11 Machine preferences and the local store* — missing, empty or contradictory data (the dossier included); defined by: "The standalone app is the file `DocResolver` of §11.5 over this store:"
* M-V09-959-E6-rungs — UNTESTED — V09 §3.1 *3.1 Boot and open* — every rung from THORP to the METROPOLIS cap; defined by: "(a) a URL with a permalink (`?o=…&s=…`, `&r=`, `&l=`; §6.4) opens that town — `generate` from the decoded recipe then the log's events through `edit`…"
* M-V09-959-E8-lifecycle — UNDEFINED — V09 §3.1 *3.1 Boot and open* — save, load, undo, redo, regenerate and migrate
* M-V09-980-E4-degenerate — UNDEFINED — V09 §3.2 *3.2 The empty state and a new town* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-1
* M-V09-980-E6-rungs — UNDEFINED — V09 §3.2 *3.2 The empty state and a new town* — every rung from THORP to the METROPOLIS cap; tests seen: T-V9-1
* M-V09-1001-E4-degenerate — UNDEFINED — V09 §3.3 *3.3 The declaration pipeline — gesture, draft, preview, ghost, commit* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T101-3
* M-V09-1045-E1-none — UNTESTED — V09 §3.4 *3.4 Snapping and free placement* — no input / nothing to act on; defined by: "T4 with **Raised** on, or the **Aqueduct** chip (V9 §4.20.2) ¦ **the two ends only**: junction vertices, way centre-lines (the end splits that way at…"
* M-V09-1045-E2-one — UNTESTED — V09 §3.4 *3.4 Snapping and free placement* — exactly one item; defined by: "The feature snap of §9.5 answers from the tile worker's `RoleIndex.snap` within one frame, the unsnapped point shown until the answer arrives."
* M-V09-1045-E4-degenerate — UNDEFINED — V09 §3.4 *3.4 Snapping and free placement* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V09-1045-E5-data — UNTESTED — V09 §3.4 *3.4 Snapping and free placement* — missing, empty or contradictory data (the dossier included); defined by: "The radius is `AppPrefs.snapRadiusPx` (default 8 px, §9.5), scaled to 22 px under a coarse pointer (a finger's contact area;"
* M-V09-1087-E1-none — UNDEFINED — V09 §3.5 *3.5 Handles* — no input / nothing to act on; tests seen: T-V9-10, T-V9-12, T101-1, T101-2
* M-V09-1087-E4-degenerate — UNDEFINED — V09 §3.5 *3.5 Handles* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-10, T-V9-12, T101-1, T101-2
* M-V09-1087-E6-rungs — UNDEFINED — V09 §3.5 *3.5 Handles* — every rung from THORP to the METROPOLIS cap; tests seen: T-V9-10, T-V9-12, T101-1, T101-2
* M-V09-1143-E1-none — UNDEFINED — V09 §3.6 *3.6 Variations* — no input / nothing to act on; tests seen: T-V9-7
* M-V09-1174-E1-none — UNDEFINED — V09 §3.7 *3.7 Scoped re-rolls* — no input / nothing to act on
* M-V09-1174-E2-one — UNTESTED — V09 §3.7 *3.7 Scoped re-rolls* — exactly one item; defined by: "The re-roll control is one button, "Try again", in the context panel of any selection and in the tray, with a scope chip row:"
* M-V09-1174-E5-data — UNDEFINED — V09 §3.7 *3.7 Scoped re-rolls* — missing, empty or contradictory data (the dossier included)
* M-V09-1174-E6-rungs — UNDEFINED — V09 §3.7 *3.7 Scoped re-rolls* — every rung from THORP to the METROPOLIS cap
* M-V09-1174-E7-toggles — UNTESTED — V09 §3.7 *3.7 Scoped re-rolls* — every toggle and preset (parity presets, every layer on and off); defined by: "T10's **keep these, re-roll the rest**: the user lassos a scope, clicks the things to keep (each click toggles a pending lock, drawn as a lock ghost)…"
* M-V09-1174-E8-lifecycle — UNTESTED — V09 §3.7 *3.7 Scoped re-rolls* — save, load, undo, redo, regenerate and migrate; defined by: "**this building** (a building's rung, `regenerate` with `rung`), **this block**, **this quarter**, **this lasso** (the selection's `scope`), on the B…"
* M-V09-1195-E1-none — UNTESTED — V09 §3.8 *3.8 Autosave, compaction and crash recovery (R15)* — no input / nothing to act on; defined by: "The first mismatch stops recovery there, keeps the unreplayed calls in the record's quarantine (downloadable as a JSON file from the history panel), …"
* M-V09-1195-E2-one — UNTESTED — V09 §3.8 *3.8 Autosave, compaction and crash recovery (R15)* — exactly one item; defined by: "**Compaction.** When the journal holds 50 `done` entries past the snapshot, or 60 s pass without a commit after at least one entry, or the page is hi…"
* M-V09-1195-E8-lifecycle — UNTESTED — V09 §3.8 *3.8 Autosave, compaction and crash recovery (R15)* — save, load, undo, redo, regenerate and migrate; defined by: "Every API call that changes the log — `edit` (a fates-sheet `confirm` among them, journalled in its resubmission form: the events with their fates an…"
* M-V09-1226-E1-none — UNTESTED — V09 §3.9 *3.9 Undo, redo, restore points and "open a copy from here"* — no input / nothing to act on; defined by: "On a rebased document (§2.9's `Base`) a `seq` below `base.seq` is never refused and no control is disabled:"
* M-V09-1226-E2-one — UNTESTED — V09 §3.9 *3.9 Undo, redo, restore points and "open a copy from here"* — exactly one item; defined by: "A target that is not undoable — a creation event, a dossier event, an epoch that carried one — is skipped by §7.4's target rule; when the latest live…"
* M-V09-1226-E5-data — UNTESTED — V09 §3.9 *3.9 Undo, redo, restore points and "open a copy from here"* — missing, empty or contradictory data (the dossier included); defined by: "A dependent-event conflict (§7.4 independence) cannot arise in a standalone document with one session; over a bridge the refusal card names the depen…"
* M-V09-1226-E6-rungs — UNTESTED — V09 §3.9 *3.9 Undo, redo, restore points and "open a copy from here"* — every rung from THORP to the METROPOLIS cap; defined by: "**Its cost** is the sum of the targets' undo-record costs (each O(its scope), §7.4), so going back a few hundred edits at METROPOLIS can take seconds…"
* M-V09-1226-E8-lifecycle — UNTESTED — V09 §3.9 *3.9 Undo, redo, restore points and "open a copy from here"* — save, load, undo, redo, regenerate and migrate; defined by: "**Undo and redo** are `undo(h)` and `redo(h)` for the document's session (§7.4): the top bar's two arrows, ctrl / cmd+Z and ctrl / cmd+shift+Z (§14)."
* M-V09-1307-E1-none — UNTESTED — V09 §3.12 *3.12 The skeleton: export, import, the canvas script* — no input / nothing to act on; defined by: "*applied* ("Made as written"), *bent* (the bend's `MsgRef`, "Show"), *refused* (its reason and its `closest` options as "Put it here instead" buttons…"
* M-V09-1307-E2-one — UNTESTED — V09 §3.12 *3.12 The skeleton: export, import, the canvas script* — exactly one item; defined by: "* **What was declared** — one row per prefix declaration from `GenerationReport.prefix` (BCR-V10-6 (d)):"
* M-V09-1307-E5-data — UNDEFINED — V09 §3.12 *3.12 The skeleton: export, import, the canvas script* — missing, empty or contradictory data (the dossier included)
* M-V09-1307-E8-lifecycle — UNTESTED — V09 §3.12 *3.12 The skeleton: export, import, the canvas script* — save, load, undo, redo, regenerate and migrate; defined by: "`export(h, 'skeleton')` writes §11.1's declared subset with the author's removals of generated content (BCR-V9-32); the dialog says "This file holds …"
* M-V09-1354-E4-degenerate — UNDEFINED — V09 §3.14 *3.14 Failure ladders* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-67
* M-V09-1354-E6-rungs — UNDEFINED — V09 §3.14 *3.14 Failure ladders* — every rung from THORP to the METROPOLIS cap; tests seen: T-V9-67
* M-V09-1374-E1-none — UNDEFINED — V09 §3.15 *3.15 The link cache (item 105 (j) at METROPOLIS)* — no input / nothing to act on
* M-V09-1398-E1-none — UNTESTED — V09 §4.2 *4.2 The tool rail, the five layers and the working layer* — no input / nothing to act on; defined by: "**No layer bookkeeping (R6).** Nothing in the application orders, stacks or groups what is drawn: draw order is §8.2's semantic order, a new thing la…"
* M-V09-1398-E2-one — UNTESTED — V09 §4.2 *4.2 The tool rail, the five layers and the working layer* — exactly one item; defined by: "A layer group expands when the user opens its chevron, when a hint or the guided town points into it, or when the user first uses one of its tools; t…"
* M-V09-1398-E4-degenerate — UNDEFINED — V09 §4.2 *4.2 The tool rail, the five layers and the working layer* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V09-1398-E6-rungs — UNTESTED — V09 §4.2 *4.2 The tool rail, the five layers and the working layer* — every rung from THORP to the METROPOLIS cap; defined by: "V9 §2.4): a three-way switch in the view bar — **Ground**, **Sky** (enabled at CITY and METROPOLIS when the town has islands, II.6; a menu of the isl…"
* M-V09-1398-E7-toggles — UNTESTED — V09 §4.2 *4.2 The tool rail, the five layers and the working layer* — every toggle and preset (parity presets, every layer on and off); defined by: "A mode that does not act on the working layer is shown disabled with its reason ("Tunnels are dug below the ground" for T4's Tunnel on Sky)."
* M-V09-1398-E8-lifecycle — UNTESTED — V09 §4.2 *4.2 The tool rail, the five layers and the working layer* — save, load, undo, redo, regenerate and migrate; defined by: "The **Sky group** holds the island menu and **Update shade now** for a selected island (V05's `regenerate { kind: 'shade', island }`, T10's)."
* M-V09-1444-E4-degenerate — UNDEFINED — V09 §4.3 *4.3 The tool binding table — every edit kind and where a user reaches…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-12, T-V9-37, T101-1, T101-2
* M-V09-1513-E1-none — UNTESTED — V09 §4.4 *4.4 The context panel — generated from the entity registry* — no input / nothing to act on; defined by: "A tab with nothing to show for the kind is omitted; the building kind adds V03's plan tab and V02's massing controls at the building band; a district…"
* M-V09-1513-E2-one — UNTESTED — V09 §4.4 *4.4 The context panel — generated from the entity registry* — exactly one item; defined by: "* **Tabs** — **About** (every attribute the registry lists for the kind, each with its tier chip; an editable path is a control, a derived one is tex…"
* M-V09-1513-E5-data — UNTESTED — V09 §4.4 *4.4 The context panel — generated from the entity registry* — missing, empty or contradictory data (the dossier included); defined by: "**Try again** (with the kind's default scope);"
* M-V09-1513-E8-lifecycle — UNTESTED — V09 §4.4 *4.4 The context panel — generated from the entity registry* — save, load, undo, redo, regenerate and migrate; defined by: "**Over time** (the kind's `convert` ops and "Build it over time" for Works, §4.11; the lifecycle lines — "ruined since year N", "once an inn" — from …"
* M-V09-1549-E4-degenerate — UNDEFINED — V09 §4.5 *4.5 The twelve tools at build depth* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-12, T-V9-13, T-V9-15, T101-1
* M-V09-1579-E1-none — UNTESTED — V09 §4.6 *4.6 Multi-selection and moving things (R16)* — no input / nothing to act on; defined by: "**Selecting several.** Shift+click adds or removes a thing; shift+drag on empty map draws a box; the lasso (T10's lasso, or the lasso chip in the sel…"
* M-V09-1579-E2-one — UNTESTED — V09 §4.6 *4.6 Multi-selection and moving things (R16)* — exactly one item; defined by: "* **Moving.** Dragging any selected thing moves the whole selection by the same world offset, each thing by its own event kind, all in one `group` (o…"
* M-V09-1579-E4-degenerate — UNDEFINED — V09 §4.6 *4.6 Multi-selection and moving things (R16)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V09-1579-E8-lifecycle — UNTESTED — V09 §4.6 *4.6 Multi-selection and moving things (R16)* — save, load, undo, redo, regenerate and migrate; defined by: "* **Moving.** Dragging any selected thing moves the whole selection by the same world offset, each thing by its own event kind, all in one `group` (o…"
* M-V09-1600-E1-none — UNDEFINED — V09 §4.7 *4.7 The file-g edits: siting, links, splits, wall stretches, records* — no input / nothing to act on
* M-V09-1600-E2-one — UNTESTED — V09 §4.7 *4.7 The file-g edits: siting, links, splits, wall stretches, records* — exactly one item; defined by: "**"What it cares about" (items 103 (e), 104 (a)).** A place's Shape tab shows how the rules site its kind, read from its `why` answer (V9 §2.7): the …"
* M-V09-1600-E3-cap — UNDEFINED — V09 §4.7 *4.7 The file-g edits: siting, links, splits, wall stretches, records* — the maximum and its caps
* M-V09-1600-E4-degenerate — UNDEFINED — V09 §4.7 *4.7 The file-g edits: siting, links, splits, wall stretches, records* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V09-1600-E5-data — UNDEFINED — V09 §4.7 *4.7 The file-g edits: siting, links, splits, wall stretches, records* — missing, empty or contradictory data (the dossier included)
* M-V09-1600-E6-rungs — UNDEFINED — V09 §4.7 *4.7 The file-g edits: siting, links, splits, wall stretches, records* — every rung from THORP to the METROPOLIS cap
* M-V09-1600-E8-lifecycle — UNDEFINED — V09 §4.7 *4.7 The file-g edits: siting, links, splits, wall stretches, records* — save, load, undo, redo, regenerate and migrate
* M-V09-1656-E1-none — UNDEFINED — V09 §4.8 *4.8 Knowledge in the editor — "View as"* — no input / nothing to act on
* M-V09-1656-E5-data — UNTESTED — V09 §4.8 *4.8 Knowledge in the editor — "View as"* — missing, empty or contradictory data (the dossier included); defined by: "SR-08), and the export dialog's default knowledge is that same key (BCR-V9-14)."
* M-V09-1681-E4-degenerate — UNDEFINED — V09 §4.9 *4.9 The words — the message catalogue's rows (English, our own)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-29, T-V9-13, T-V9-15, T101-3
* M-V09-1978-E3-cap — UNDEFINED — V09 §4.10 *4.10 The history panel — every change in plain words, restore points,…* — the maximum and its caps; tests seen: T-V10-29, T-V9-15
* M-V09-1978-E4-degenerate — UNDEFINED — V09 §4.10 *4.10 The history panel — every change in plain words, restore points,…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-29, T-V9-15
* M-V09-1978-E6-rungs — UNDEFINED — V09 §4.10 *4.10 The history panel — every change in plain words, restore points,…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V10-29, T-V9-15
* M-V09-2070-E1-none — UNTESTED — V09 §4.11 *4.11 The clerk's view — the drawer (the clerk itself is volume 10's)* — no input / nothing to act on; defined by: "In host mode with `clerkMode` `off` or `host` the clerk slot is of kind `host` (V9 §2.2): no Assistant button shows and nothing is sent to a model fr…"
* M-V09-2070-E2-one — UNTESTED — V09 §4.11 *4.11 The clerk's view — the drawer (the clerk itself is volume 10's)* — exactly one item; defined by: "The drawer's menu holds **New topic** (`ClerkHandle.newTopic`: the next message starts a fresh conversation on its route, V10 §3.2; the earlier one s…"
* M-V09-2070-E3-cap — UNTESTED — V09 §4.11 *4.11 The clerk's view — the drawer (the clerk itself is volume 10's)* — the maximum and its caps; defined by: "* **The meter.** The drawer's foot reads "This month: about ${usd} of ${cap}" from `ClerkHandle.usage()`; past V10's `warnShare` the line takes the b…"
* M-V09-2070-E4-degenerate — UNDEFINED — V09 §4.11 *4.11 The clerk's view — the drawer (the clerk itself is volume 10's)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V09-2070-E5-data — UNTESTED — V09 §4.11 *4.11 The clerk's view — the drawer (the clerk itself is volume 10's)* — missing, empty or contradictory data (the dossier included); defined by: "SS-08) and, standalone only, **Start a new map from this** (below;"
* M-V09-2070-E6-rungs — UNDEFINED — V09 §4.11 *4.11 The clerk's view — the drawer (the clerk itself is volume 10's)* — every rung from THORP to the METROPOLIS cap
* M-V09-2070-E7-toggles — UNTESTED — V09 §4.11 *4.11 The clerk's view — the drawer (the clerk itself is volume 10's)* — every toggle and preset (parity presets, every layer on and off); defined by: "**Off until opened; always labelled; three cards the first time** (J-V9.35)."
* M-V09-2070-E8-lifecycle — UNTESTED — V09 §4.11 *4.11 The clerk's view — the drawer (the clerk itself is volume 10's)* — save, load, undo, redo, regenerate and migrate; defined by: "V10 §3.20's notice, shown as volume 10 writes it — **I agree** writes `ClerkSettings.consent` with the notice's version; 3. the **key** (configuratio…"
* M-V09-2178-E4-degenerate — UNDEFINED — V09 §4.12 *4.12 Touch, pen and small screens — decided* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-22
* M-V09-2208-E6-rungs — UNDEFINED — V09 §4.13 *4.13 The keyboard* — every rung from THORP to the METROPOLIS cap
* M-V09-2208-E8-lifecycle — UNDEFINED — V09 §4.13 *4.13 The keyboard* — save, load, undo, redo, regenerate and migrate
* M-V09-2226-E1-none — UNTESTED — V09 §4.14 *4.14 The advanced panel, the tables editor and the presets dialog* — no input / nothing to act on; defined by: "The "Streets" group adds the row **Raised ways the town builds by itself: as the rules say · none** (item 110 (b)):"
* M-V09-2226-E2-one — UNDEFINED — V09 §4.14 *4.14 The advanced panel, the tables editor and the presets dialog* — exactly one item
* M-V09-2226-E5-data — UNTESTED — V09 §4.14 *4.14 The advanced panel, the tables editor and the presets dialog* — missing, empty or contradictory data (the dossier included); defined by: ""default", "preset", "your preferences", "this town", "SettlementForge"), the locality badge ("changes nearby" for a local control, "rebuilds from {s…"
* M-V09-2226-E7-toggles — UNTESTED — V09 §4.14 *4.14 The advanced panel, the tables editor and the presets dialog* — every toggle and preset (parity presets, every layer on and off); defined by: ""default", "preset", "your preferences", "this town", "SettlementForge"), the locality badge ("changes nearby" for a local control, "rebuilds from {s…"
* M-V09-2226-E8-lifecycle — UNTESTED — V09 §4.14 *4.14 The advanced panel, the tables editor and the presets dialog* — save, load, undo, redo, regenerate and migrate; defined by: "A change is `adjust`; a Re-derive shows the fates sheet first with an auto restore point (V9 §2.8)."
* M-V09-2282-E4-degenerate — UNDEFINED — V09 §4.16 *4.16 Reading typed words — the roster line and the locus* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-13, T-V9-70, T101-3
* M-V09-2311-E4-degenerate — UNDEFINED — V09 §4.17 *4.17 The underground in the editor — item 109's screens (as revised ~…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-34, T-V9-38
* M-V09-2480-E2-one — UNDEFINED — V09 §4.18 *4.18 People, the family tree and the clock (§10.3's module, M4b)* — exactly one item
* M-V09-2522-E1-none — UNDEFINED — V09 §4.20 *4.20 Item 110 on the canvas (file g item 110 as revised ~23:40; the o…* — no input / nothing to act on; tests seen: T-V9-12, T-V9-3
* M-V09-2522-E2-one — UNDEFINED — V09 §4.20 *4.20 Item 110 on the canvas (file g item 110 as revised ~23:40; the o…* — exactly one item; tests seen: T-V9-12, T-V9-3
* M-V09-2522-E4-degenerate — UNDEFINED — V09 §4.20 *4.20 Item 110 on the canvas (file g item 110 as revised ~23:40; the o…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-12, T-V9-3
* M-V09-2565-E1-none — UNDEFINED — V09 §4.20.1 *4.20.1 Retaining walls and terraces (item 110 (a); V9C-53)* — no input / nothing to act on; tests seen: T-V9-51, T-V9-54, T-V9-59
* M-V09-2565-E4-degenerate — UNDEFINED — V09 §4.20.1 *4.20.1 Retaining walls and terraces (item 110 (a); V9C-53)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-51, T-V9-54, T-V9-59
* M-V09-2612-E4-degenerate — UNDEFINED — V09 §4.20.2 *4.20.2 Raised ways and aqueducts (item 110 (b); V9C-54, V9C-73)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-51, T-V9-52
* M-V09-2612-E5-data — UNDEFINED — V09 §4.20.2 *4.20.2 Raised ways and aqueducts (item 110 (b); V9C-54, V9C-73)* — missing, empty or contradictory data (the dossier included); tests seen: T-V9-51, T-V9-52
* M-V09-2612-E8-lifecycle — UNDEFINED — V09 §4.20.2 *4.20.2 Raised ways and aqueducts (item 110 (b); V9C-54, V9C-73)* — save, load, undo, redo, regenerate and migrate; tests seen: T-V9-51, T-V9-52
* M-V09-2670-E4-degenerate — UNDEFINED — V09 §4.20.3 *4.20.3 Removing a generated thing, and adding it again (item 110 (b),…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-53, T-V9-63
* M-V09-2670-E6-rungs — UNDEFINED — V09 §4.20.3 *4.20.3 Removing a generated thing, and adding it again (item 110 (b),…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V9-53, T-V9-63
* M-V09-2724-E4-degenerate — UNDEFINED — V09 §4.20.4 *4.20.4 Decks: moles, jetties, quay platforms and bridges (item 110 (d…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-55
* M-V09-2751-E2-one — UNDEFINED — V09 §4.20.5 *4.20.5 Tiers — stepped massing at the building band (item 110 (c); V2…* — exactly one item; tests seen: T-V9-13, T-V9-51, T-V9-59
* M-V09-2751-E3-cap — UNDEFINED — V09 §4.20.5 *4.20.5 Tiers — stepped massing at the building band (item 110 (c); V2…* — the maximum and its caps; tests seen: T-V9-13, T-V9-51, T-V9-59
* M-V09-2751-E4-degenerate — UNDEFINED — V09 §4.20.5 *4.20.5 Tiers — stepped massing at the building band (item 110 (c); V2…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-13, T-V9-51, T-V9-59
* M-V09-2780-E4-degenerate — UNDEFINED — V09 §4.20.6 *4.20.6 The new records' panels, handles, spans, crossings and why lin…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-12, T-V9-51, T-V9-59, T-V9-60
* M-V09-2780-E8-lifecycle — UNDEFINED — V09 §4.20.6 *4.20.6 The new records' panels, handles, spans, crossings and why lin…* — save, load, undo, redo, regenerate and migrate; tests seen: T-V9-12, T-V9-51, T-V9-59, T-V9-60
* M-V09-2821-E1-none — UNDEFINED — V09 §4.20.7 *4.20.7 What else a change does — the effects list (BCR-V9-27; V9C-56)* — no input / nothing to act on; tests seen: T-V9-60
* M-V09-2821-E8-lifecycle — UNDEFINED — V09 §4.20.7 *4.20.7 What else a change does — the effects list (BCR-V9-27; V9C-56)* — save, load, undo, redo, regenerate and migrate; tests seen: T-V9-60
* M-V09-2838-E1-none — UNDEFINED — V09 §4.20.8 *4.20.8 Reaching what lies under a deck — the hit stack (BCR-V9-28; V9…* — no input / nothing to act on; tests seen: T-V9-58
* M-V09-2838-E4-degenerate — UNDEFINED — V09 §4.20.8 *4.20.8 Reaching what lies under a deck — the hit stack (BCR-V9-28; V9…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-58
* M-V09-2855-E1-none — UNDEFINED — V09 §4.20.9 *4.20.9 Item 110 on the Sky layer (V05 §3.22 (4), §4.1; V9C-60)* — no input / nothing to act on
* M-V09-2855-E2-one — UNDEFINED — V09 §4.20.9 *4.20.9 Item 110 on the Sky layer (V05 §3.22 (4), §4.1; V9C-60)* — exactly one item
* M-V09-2855-E4-degenerate — UNDEFINED — V09 §4.20.9 *4.20.9 Item 110 on the Sky layer (V05 §3.22 (4), §4.1; V9C-60)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V09-2877-E4-degenerate — UNDEFINED — V09 §5.1 *5.1 The frame, and the chrome's own look* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-4, T-V7-56
* M-V09-2877-E6-rungs — UNDEFINED — V09 §5.1 *5.1 The frame, and the chrome's own look* — every rung from THORP to the METROPOLIS cap; tests seen: T-V11-4, T-V7-56
* M-V09-2921-E4-degenerate — UNDEFINED — V09 §5.2 *5.2 The empty state and a new town* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-29, T-V9-15
* M-V09-2921-E6-rungs — UNDEFINED — V09 §5.2 *5.2 The empty state and a new town* — every rung from THORP to the METROPOLIS cap; tests seen: T-V10-29, T-V9-15
* M-V09-2930-E1-none — UNDEFINED — V09 §5.3 *5.3 The overlays: ghost, handles, badge, bend line, refusal card, sna…* — no input / nothing to act on
* M-V09-2930-E4-degenerate — UNDEFINED — V09 §5.3 *5.3 The overlays: ghost, handles, badge, bend line, refusal card, sna…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V09-2960-E1-none — UNTESTED — V09 §5.4 *5.4 The thematic views — Show: prosperity, shade, supply links and th…* — no input / nothing to act on; defined by: "**None**;"
* M-V09-2960-E2-one — UNTESTED — V09 §5.4 *5.4 The thematic views — Show: prosperity, shade, supply links and th…* — exactly one item; defined by: "**Coverage** (for a selected class, each district or catchment tinted by whether it holds a member — "one in every district" gaps shown, from V01's `…"
* M-V09-2960-E4-degenerate — UNDEFINED — V09 §5.4 *5.4 The thematic views — Show: prosperity, shade, supply links and th…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V09-2960-E5-data — UNDEFINED — V09 §5.4 *5.4 The thematic views — Show: prosperity, shade, supply links and th…* — missing, empty or contradictory data (the dossier included)
* M-V09-2960-E6-rungs — UNTESTED — V09 §5.4 *5.4 The thematic views — Show: prosperity, shade, supply links and th…* — every rung from THORP to the METROPOLIS cap; defined by: "It serves the town and the village products alike (V07 §5's palisade relies on it)."
* M-V09-2960-E7-toggles — UNTESTED — V09 §5.4 *5.4 The thematic views — Show: prosperity, shade, supply links and th…* — every toggle and preset (parity presets, every layer on and off); defined by: "J-V9.54) is an option of the wall layer, `LayerSpec.showCircuit` (BCR-V9-25), toggled in the layer toggles and in T3's options: while it is on, S14 d…"
* M-V09-2960-E8-lifecycle — UNTESTED — V09 §5.4 *5.4 The thematic views — Show: prosperity, shade, supply links and th…* — save, load, undo, redo, regenerate and migrate; defined by: "The legend reads "Shade through the day" with the six steps, then "Under {island}'s shadow for a third of the day or more" (solid) and "Where {island…"
* M-V09-3008-E1-none — UNDEFINED — V09 §5.5 *5.5 The fates sheet — confirming what moves* — no input / nothing to act on
* M-V09-3008-E2-one — UNDEFINED — V09 §5.5 *5.5 The fates sheet — confirming what moves* — exactly one item
* M-V09-3008-E6-rungs — UNDEFINED — V09 §5.5 *5.5 The fates sheet — confirming what moves* — every rung from THORP to the METROPOLIS cap
* M-V09-3032-E1-none — UNDEFINED — V09 §5.7 *5.7 The other panels* — no input / nothing to act on
* M-V09-3032-E2-one — UNTESTED — V09 §5.7 *5.7 The other panels* — exactly one item; defined by: ""What moved" — the `changes` entries newest first, each by its `report.moved.<kind>` row (V9 §4.9) — in both lists each `{ id }` argument rendered un…"
* M-V09-3032-E4-degenerate — UNDEFINED — V09 §5.7 *5.7 The other panels* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V09-3032-E5-data — UNDEFINED — V09 §5.7 *5.7 The other panels* — missing, empty or contradictory data (the dossier included)
* M-V09-3032-E6-rungs — UNDEFINED — V09 §5.7 *5.7 The other panels* — every rung from THORP to the METROPOLIS cap
* M-V09-3032-E7-toggles — UNTESTED — V09 §5.7 *5.7 The other panels* — every toggle and preset (parity presets, every layer on and off); defined by: "* **Dress** (T12's panel): style cards (a 120 px render of the current view in each style, drawn by the tile worker at the city band), the tint toggl…"
* M-V09-3032-E8-lifecycle — UNTESTED — V09 §5.7 *5.7 The other panels* — save, load, undo, redo, regenerate and migrate; defined by: ""Details" (collapsed) — the ladder uses with their replay keys, the kernel warnings, the stage timings (telemetry)."
* M-V09-3063-E1-none — UNDEFINED — V09 §5.8 *5.8 The "Why here?" card* — no input / nothing to act on
* M-V09-3063-E2-one — UNDEFINED — V09 §5.8 *5.8 The "Why here?" card* — exactly one item
* M-V09-3063-E4-degenerate — UNDEFINED — V09 §5.8 *5.8 The "Why here?" card* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V09-3063-E5-data — UNDEFINED — V09 §5.8 *5.8 The "Why here?" card* — missing, empty or contradictory data (the dossier included)
* M-V09-3085-E1-none — UNTESTED — V09 §5.9 *5.9 Onboarding and help* — no input / nothing to act on; defined by: "T1's on the empty state's card, T5, T6 and T12's the first time each is picked, the others likewise, `hint.variations` on the first tray, `hint.resto…"
* M-V09-3085-E2-one — UNTESTED — V09 §5.9 *5.9 Onboarding and help* — exactly one item; defined by: "T1's on the empty state's card, T5, T6 and T12's the first time each is picked, the others likewise, `hint.variations` on the first tray, `hint.resto…"
* M-V09-3085-E8-lifecycle — UNDEFINED — V09 §5.9 *5.9 Onboarding and help* — save, load, undo, redo, regenerate and migrate
* M-V09-3102-E1-none — UNTESTED — V09 §5.10 *5.10 The export dialogs* — no input / nothing to act on; defined by: ""No real place" (0°, 0°, the default) · latitude, longitude and the turn of north (§11.1's geo anchor, remembered per town in `exportAnchor`); trees:…"
* M-V09-3102-E2-one — UNTESTED — V09 §5.10 *5.10 The export dialogs* — exactly one item; defined by: "One **Export** dialog (E, or the top bar) with five families as tabs; each tab's options are the format's §11.1 options in plain words, with defaults…"
* M-V09-3102-E4-degenerate — UNDEFINED — V09 §5.10 *5.10 The export dialogs* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V09-3102-E6-rungs — UNDEFINED — V09 §5.10 *5.10 The export dialogs* — every rung from THORP to the METROPOLIS cap
* M-V09-3102-E7-toggles — UNTESTED — V09 §5.10 *5.10 The export dialogs* — every toggle and preset (parity presets, every layer on and off); defined by: "**Picture** ¦ PNG (default), SVG (raised parts in their own group `layer.ground.raised`, BCR-V9-31 (b)) ¦ frame: current view · whole town (§9.5's fr…"
* M-V09-3142-E1-none — UNTESTED — V09 §5.12 *5.12 Settings* — no input / nothing to act on; defined by: "**Problems found** — the device's defect records (`ClerkHandle.defects()`, V10 §2.8), one line each with its date and its kind in words (`clerk.defec…"
* M-V09-3142-E2-one — UNTESTED — V09 §5.12 *5.12 Settings* — exactly one item; defined by: "**Assistant** — rendered from and written to `ClerkSettings` (V10 §2.2) through `ClerkHandle.settings` / `setSettings`, the one store (J-V9.34), and …"
* M-V09-3142-E5-data — UNTESTED — V09 §5.12 *5.12 Settings* — missing, empty or contradictory data (the dossier included); defined by: "**Editing** — snap radius (4–24 px), handles (fewer · default · more), "Show three more" page size (fixed at three; not a setting), the §13.4 fallbac…"
* M-V09-3142-E7-toggles — UNTESTED — V09 §5.12 *5.12 Settings* — every toggle and preset (parity presets, every layer on and off); defined by: "**Editing** — snap radius (4–24 px), handles (fewer · default · more), "Show three more" page size (fixed at three; not a setting), the §13.4 fallbac…"
* M-V09-3172-E6-rungs — UNDEFINED — V09 §5.13 *5.13 Open, recent and new* — every rung from THORP to the METROPOLIS cap
* M-V09-3172-E8-lifecycle — UNDEFINED — V09 §5.13 *5.13 Open, recent and new* — save, load, undo, redo, regenerate and migrate
* M-V09-3180-E6-rungs — UNDEFINED — V09 §5.14 *5.14 Labels in the application* — every rung from THORP to the METROPOLIS cap
* M-V09-3191-E1-none — UNTESTED — V09 §5.15 *5.15 Every new thing: drawn, labelled, exported, persisted* — no input / nothing to act on; defined by: "V11's tables) ¦ through their effects: the link view's pin dots and crossed stubs; nothing else of their own ¦ in the why card's chips ("yours"), the…"
* M-V09-3191-E2-one — UNTESTED — V09 §5.15 *5.15 Every new thing: drawn, labelled, exported, persisted* — exactly one item; defined by: "link rows (2.7; derived) ¦ `live.links` (5.4) ¦ the legend by good; the Link card ¦ GeoJSON: with "include supply links", one LineString per link in …"
* M-V09-3191-E4-degenerate — UNDEFINED — V09 §5.15 *5.15 Every new thing: drawn, labelled, exported, persisted* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V09-3191-E5-data — UNTESTED — V09 §5.15 *5.15 Every new thing: drawn, labelled, exported, persisted* — missing, empty or contradictory data (the dossier included); defined by: "V11's tables) ¦ through their effects: the link view's pin dots and crossed stubs; nothing else of their own ¦ in the why card's chips ("yours"), the…"
* M-V09-3191-E7-toggles — UNDEFINED — V09 §5.15 *5.15 Every new thing: drawn, labelled, exported, persisted* — every toggle and preset (parity presets, every layer on and off)
* M-V09-3191-E8-lifecycle — UNTESTED — V09 §5.15 *5.15 Every new thing: drawn, labelled, exported, persisted* — save, load, undo, redo, regenerate and migrate; defined by: "thing (V9 §) ¦ drawn ¦ labelled ¦ exported ¦ persisted ¦ ¦---¦---¦---¦---¦---¦"
* EI-V09-EDGE-1 — UNDEFINED (inventory V09-EDGE-1) — V09 §4.20.2 (6), §4.9 catalogue, T-V9-52 vs J-VI.4 (f) — J-VI.4 (f) (docs/volumes/_integrate.md) bends a raised course that would cut a sky access's column or rope line, where skyAccessObstacles offers no re-route, to end at the last ground vertex before it ('this would cut {island}'s hoist; it ends here'). V09 — which carries every bend row (T-V9-15 fails CI on a code with no row) and words J-VI.4 (d), (e), (g), (h) — has no catalogue row, no rule tex…

### V10

* M-V10-456-E5-data — UNTESTED — V10 §2.1 *2.1 Package, threads and the dependency rule (BCR-V10-8)* — missing, empty or contradictory data (the dossier included); defined by: "It imports `@plat/api` (the facade and its types), `@plat/model` (the event schemas, `Id`, `FactTier`, `Blueprint`, `MsgRef`), `@plat/tables` (`clerk…"
* M-V10-504-E5-data — UNTESTED — V10 §2.3 *2.3 Sessions, segments and turns (session memory)* — missing, empty or contradictory data (the dossier included); defined by: "Every rule of this volume that says "the session's key" means it: the harness passes it as `admitAs` — `'secret'` at that tier, else the key form `{ …"
* M-V10-570-E5-data — UNDEFINED — V10 §2.4 *2.4 Drafts (session memory)* — missing, empty or contradictory data (the dossier included)
* M-V10-781-E5-data — UNDEFINED — V10 §2.9 *2.9 Critique findings and refusals (session memory)* — missing, empty or contradictory data (the dossier included); tests seen: T-V10-4, T-V9-13, T101-3
* M-V10-795-E5-data — UNTESTED — V10 §2.10 *2.10 The clerk tables — `clerk.ops` (device only) and `clerk.content`…* — missing, empty or contradictory data (the dossier included); defined by: "**Default rows** (provenance `own` unless named; no row calibratable by the corpus stage — V11 §3.1 registers `clerk.ops` and `clerk.content` as rows…"
* M-V10-900-E5-data — UNDEFINED — V10 §2.12 *2.12 The tools' inputs (the vocabulary the model writes; schemas gene…* — missing, empty or contradictory data (the dossier included)
* M-V10-1215-E4-degenerate — UNDEFINED — V10 §3.1 *3.1 Entries, routes and the turn* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T101-1
* M-V10-1215-E8-lifecycle — UNDEFINED — V10 §3.1 *3.1 Entries, routes and the turn* — save, load, undo, redo, regenerate and migrate; tests seen: T101-1
* M-V10-1265-E1-none — UNTESTED — V10 §3.2 *3.2 The request: the cached prefix, segments and map updates* — no input / nothing to act on; defined by: "Each route therefore has its own cached prefix; the explain and help routes send two tools and one, so their prefixes are small and no call is wasted…"
* M-V10-1265-E2-one — UNTESTED — V10 §3.2 *3.2 The request: the cached prefix, segments and map updates* — exactly one item; defined by: "`system` — one text block, the rendered prompt (V10 §3.3), with an explicit cache breakpoint of TTL `clerk.ops.cache.staticTtl`: the tools and the sy…"
* M-V10-1265-E4-degenerate — UNDEFINED — V10 §3.2 *3.2 The request: the cached prefix, segments and map updates* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V10-1265-E8-lifecycle — UNDEFINED — V10 §3.2 *3.2 The request: the cached prefix, segments and map updates* — save, load, undo, redo, regenerate and migrate
* M-V10-1306-E4-degenerate — UNDEFINED — V10 §3.3 *3.3 The system prompt, the map block and the vocabulary block* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-43
* M-V10-1441-E4-degenerate — UNDEFINED — V10 §3.4 *3.4 The tool schemas* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T101-1
* M-V10-1503-E4-degenerate — UNDEFINED — V10 §3.5 *3.5 Running the tools* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-4, T-V9-13, T-V9-15, T-V9-32
* M-V10-1503-E6-rungs — UNDEFINED — V10 §3.5 *3.5 Running the tools* — every rung from THORP to the METROPOLIS cap; tests seen: T-V10-4, T-V9-13, T-V9-15, T-V9-32
* M-V10-1598-E4-degenerate — UNDEFINED — V10 §3.6 *3.6 The spatial resolver — words to points* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-5, T-V9-13, T101-3
* M-V10-1636-E1-none — UNTESTED — V10 §3.7 *3.7 Natural language to a skeleton draft (creation mode)* — no input / nothing to act on; defined by: "An unspecified field stays absent: the rules and the auto features derive it (item 20 (h) applied to words, §7.7 layer 1); the clerk never asks the u…"
* M-V10-1636-E2-one — UNDEFINED — V10 §3.7 *3.7 Natural language to a skeleton draft (creation mode)* — exactly one item
* M-V10-1636-E4-degenerate — UNDEFINED — V10 §3.7 *3.7 Natural language to a skeleton draft (creation mode)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V10-1636-E5-data — UNTESTED — V10 §3.7 *3.7 Natural language to a skeleton draft (creation mode)* — missing, empty or contradictory data (the dossier included); defined by: "An unspecified field stays absent: the rules and the auto features derive it (item 20 (h) applied to words, §7.7 layer 1); the clerk never asks the u…"
* M-V10-1636-E6-rungs — UNTESTED — V10 §3.7 *3.7 Natural language to a skeleton draft (creation mode)* — every rung from THORP to the METROPOLIS cap; defined by: ""a green village" → V07's `green`), `water` and `coastSide`, `walls`, `wealth`, `planned`, `era`, `magic`, `castle`, `harbour`, `temple`, and at a vi…"
* M-V10-1677-E1-none — UNTESTED — V10 §3.8 *3.8 Rosters* — no input / nothing to act on; defined by: "With a dossier connected every line must name an unplaced dossier element (the brief lists them); a line naming none is refused by the engine as doss…"
* M-V10-1677-E2-one — UNTESTED — V10 §3.8 *3.8 Rosters* — exactly one item; defined by: "A roster has one variation (J-V10.16); its cards are the choice."
* M-V10-1677-E4-degenerate — UNDEFINED — V10 §3.8 *3.8 Rosters* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V10-1677-E5-data — UNDEFINED — V10 §3.8 *3.8 Rosters* — missing, empty or contradictory data (the dossier included)
* M-V10-1690-E4-degenerate — UNDEFINED — V10 §3.9 *3.9 The oracle at depth — providers, sections, the solver's explanati…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-10, T-V10-37, T-V10-9
* M-V10-1820-E4-degenerate — UNDEFINED — V10 §3.9a *3.9a The underground and the crypt, explained (item 109; J-V10.40)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-29
* M-V10-1820-E6-rungs — UNDEFINED — V10 §3.9a *3.9a The underground and the crypt, explained (item 109; J-V10.40)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V10-29
* M-V10-1820-E8-lifecycle — UNDEFINED — V10 §3.9a *3.9a The underground and the crypt, explained (item 109; J-V10.40)* — save, load, undo, redo, regenerate and migrate; tests seen: T-V10-29
* M-V10-1862-E3-cap — UNDEFINED — V10 §3.10 *3.10 The critique engine — rules checked by code, explained by the mo…* — the maximum and its caps; tests seen: T-V10-39
* M-V10-1862-E4-degenerate — UNDEFINED — V10 §3.10 *3.10 The critique engine — rules checked by code, explained by the mo…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-39
* M-V10-1862-E8-lifecycle — UNDEFINED — V10 §3.10 *3.10 The critique engine — rules checked by code, explained by the mo…* — save, load, undo, redo, regenerate and migrate; tests seen: T-V10-39
* M-V10-1962-E4-degenerate — UNDEFINED — V10 §3.12 *3.12 Knowledge gating — the guard* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-6
* M-V10-1962-E6-rungs — UNDEFINED — V10 §3.12 *3.12 Knowledge gating — the guard* — every rung from THORP to the METROPOLIS cap; tests seen: T-V10-6
* M-V10-1962-E8-lifecycle — UNDEFINED — V10 §3.12 *3.12 Knowledge gating — the guard* — save, load, undo, redo, regenerate and migrate; tests seen: T-V10-6
* M-V10-2014-E4-degenerate — UNDEFINED — V10 §3.13 *3.13 Never inventing a dossier fact — structure first, then the groun…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-29
* M-V10-2118-E1-none — UNDEFINED — V10 §3.15 *3.15 Transcripts that replay as skeletons* — no input / nothing to act on; tests seen: T-V10-12, T101-4, T101-6
* M-V10-2149-E4-degenerate — UNDEFINED — V10 §3.16 *3.16 Refusals with alternatives* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-29, T-V9-15, T101-3
* M-V10-2149-E6-rungs — UNDEFINED — V10 §3.16 *3.16 Refusals with alternatives* — every rung from THORP to the METROPOLIS cap; tests seen: T-V10-29, T-V9-15, T101-3
* M-V10-2220-E4-degenerate — UNDEFINED — V10 §3.17 *3.17 The host clerk seam* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-20, T-V8-27
* M-V10-2316-E1-none — UNDEFINED — V10 §3.18 *3.18 The usage meter and the caps* — no input / nothing to act on
* M-V10-2316-E2-one — UNDEFINED — V10 §3.18 *3.18 The usage meter and the caps* — exactly one item
* M-V10-2316-E3-cap — UNTESTED — V10 §3.18 *3.18 The usage meter and the caps* — the maximum and its caps; defined by: "Before every request the harness refuses to send when the month's estimate has reached `monthlyCapUsd` (`budget`), warns in the drawer when it passes…"
* M-V10-2316-E5-data — UNDEFINED — V10 §3.18 *3.18 The usage meter and the caps* — missing, empty or contradictory data (the dossier included)
* M-V10-2329-E5-data — UNDEFINED — V10 §3.19 *3.19 Failure handling — every failure has a bounded ladder, and nothi…* — missing, empty or contradictory data (the dossier included); tests seen: T-V10-18
* M-V10-2329-E8-lifecycle — UNDEFINED — V10 §3.19 *3.19 Failure handling — every failure has a bounded ladder, and nothi…* — save, load, undo, redo, regenerate and migrate; tests seen: T-V10-18
* M-V10-2357-E1-none — UNTESTED — V10 §3.20 *3.20 Safety and privacy — what is sent, what is kept* — no input / nothing to act on; defined by: "**Never sent:** the document's bytes, any image, coordinates, a withheld name or purpose, a concealed use, an unexcavated element below `secret`, the…"
* M-V10-2357-E2-one — UNDEFINED — V10 §3.20 *3.20 Safety and privacy — what is sent, what is kept* — exactly one item
* M-V10-2357-E5-data — UNDEFINED — V10 §3.20 *3.20 Safety and privacy — what is sent, what is kept* — missing, empty or contradictory data (the dossier included)
* M-V10-2357-E8-lifecycle — UNDEFINED — V10 §3.20 *3.20 Safety and privacy — what is sent, what is kept* — save, load, undo, redo, regenerate and migrate
* M-V10-2403-E1-none — UNDEFINED — V10 §3.22 *3.22 Determinism* — no input / nothing to act on; tests seen: T-V10-11, T-V10-3, T-V10-30, T-V10-4
* M-V10-2403-E6-rungs — UNDEFINED — V10 §3.22 *3.22 Determinism* — every rung from THORP to the METROPOLIS cap; tests seen: T-V10-11, T-V10-3, T-V10-30, T-V10-4
* M-V10-2425-E4-degenerate — UNDEFINED — V10 §4.1 *4.1 The encoders — each tool's input to its events* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-1, T-V10-33, T-V10-4, T-V10-7
* M-V10-2560-E2-one — UNDEFINED — V10 §4.5 *4.5 Locality and scope* — exactly one item; tests seen: T-V10-25
* M-V10-2569-E5-data — UNDEFINED — V10 §4.6 *4.6 What is not an edit* — missing, empty or contradictory data (the dossier included)
* M-V10-2569-E7-toggles — UNDEFINED — V10 §4.6 *4.6 What is not an edit* — every toggle and preset (parity presets, every layer on and off)
* M-V10-2569-E8-lifecycle — UNTESTED — V10 §4.6 *4.6 What is not an edit* — save, load, undo, redo, regenerate and migrate; defined by: "`clerk.content`'s rows change by `editTable` on the document's override layer or through the preference layer, `clerk.ops`' through the device's pref…"
* M-V10-2586-E8-lifecycle — UNDEFINED — V10 §5.1 *5.1 On the map (view state; never exported, never hashed)* — save, load, undo, redo, regenerate and migrate
* M-V10-2602-E1-none — UNDEFINED — V10 §5.3 *5.3 Exports* — no input / nothing to act on
* M-V10-2602-E2-one — UNDEFINED — V10 §5.3 *5.3 Exports* — exactly one item
* M-V10-2602-E8-lifecycle — UNTESTED — V10 §5.3 *5.3 Exports* — save, load, undo, redo, regenerate and migrate; defined by: "* **The defect store** — "Save as file" in the drawer's settings writes the device's `DefectRecord`s as JSON (V10 §2.8): counts and codes only, so it…"
* M-V10-2618-E1-none — UNDEFINED — V10 §5.4 *5.4 The drawer's text (semantics; V09 draws it)* — no input / nothing to act on; tests seen: T-V10-29, T-V9-15
* M-V10-2618-E4-degenerate — UNDEFINED — V10 §5.4 *5.4 The drawer's text (semantics; V09 draws it)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-29, T-V9-15
* EI-V10-EDGE-1 — UNDEFINED (inventory V10-EDGE-1) — V10 §4.2 (3) creation acceptance and V09 §4.11 creation preview vs V09 §3.2 (3)… — V10 says that when a creation proposal replaces the untouched empty-state town 'the old handle closes — nothing is lost, the old town being its seed and still in the recent documents (R15)', and V09 §4.11 says 'the old one stays in Recent towns'; but V09 §3.2 (3) writes nothing to the local store while the log holds only its creation prefix (the LocalDocRecord is created on the first committed ev…

### V11

* M-V11-513-E5-data — UNDEFINED — V11 §2.4 *2.4 Relation families, signature pairs and the derived rows* — missing, empty or contradictory data (the dossier included)
* M-V11-549-E5-data — UNDEFINED — V11 §2.5 *2.5 The goods columns on `ResourceRow` (BCR-V11-3)* — missing, empty or contradictory data (the dossier included)
* M-V11-563-E5-data — UNDEFINED — V11 §2.6 *2.6 Ladder steps (BCR-V11-4)* — missing, empty or contradictory data (the dossier included); tests seen: T-V11-2
* M-V11-577-E5-data — UNDEFINED — V11 §2.7 *2.7 Walls on natural barriers (BCR-V11-5)* — missing, empty or contradictory data (the dossier included)
* M-V11-599-E5-data — UNDEFINED — V11 §2.8 *2.8 The row types the base names without declaring (BCR-V11-7, BCR-V1…* — missing, empty or contradictory data (the dossier included)
* M-V11-655-E5-data — UNTESTED — V11 §2.8b *2.8b The underground content rows (item 109): shapes cited, one cell …* — missing, empty or contradictory data (the dossier included); defined by: "The values are V11 §3.23's, and V04's defaults table reads them."
* M-V11-762-E5-data — UNDEFINED — V11 §2.9 *2.9 Identity* — missing, empty or contradictory data (the dossier included); tests seen: T-V11-3
* M-V11-827-E4-degenerate — UNDEFINED — V11 §3.1 *3.1 The complete catalogue of tables* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-5, T-V11-1, T-V11-2, T-V11-4
* M-V11-991-E4-degenerate — UNDEFINED — V11 §3.2 *3.2 The compiler, the loader and their failure handling* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-0, T-V11-1, T-V11-25, T-V11-3
* M-V11-1106-E4-degenerate — UNDEFINED — V11 §3.3 *3.3 The relation families (item 103 (a)) — rows and derivation* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-3, T-V11-30, T-V11-5, T-V11-6
* M-V11-1106-E6-rungs — UNDEFINED — V11 §3.3 *3.3 The relation families (item 103 (a)) — rows and derivation* — every rung from THORP to the METROPOLIS cap; tests seen: T-V11-3, T-V11-30, T-V11-5, T-V11-6
* M-V11-1207-E1-none — UNDEFINED — V11 §3.4 *3.4 The profile families (`siting.profiles`) — every tag family's and…* — no input / nothing to act on; tests seen: T-V11-4, T-V7-52, T-V7-53, T-V7-54
* M-V11-1292-E4-degenerate — UNDEFINED — V11 §3.5 *3.5 The class ladder (`roster.classes`) — every town and city class* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-13, T-V11-25, T-V11-3, T-V11-4
* M-V11-1862-E4-degenerate — UNDEFINED — V11 §3.6 *3.6 Designation templates, the compatibility table and heights* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-7
* M-V11-1862-E6-rungs — UNDEFINED — V11 §3.6 *3.6 Designation templates, the compatibility table and heights* — every rung from THORP to the METROPOLIS cap; tests seen: T-V11-7
* M-V11-2039-E4-degenerate — UNDEFINED — V11 §3.7 *3.7 The goods table, orientation and the supply web's settings (items…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-18, T-V11-21, T-V11-28, T-V6-44
* M-V11-2183-E1-none — UNDEFINED — V11 §3.8 *3.8 The signature pairs (`siting.pairs`; item 103 (b); all soft, `ext…* — no input / nothing to act on; tests seen: T-V11-3
* M-V11-2183-E6-rungs — UNDEFINED — V11 §3.8 *3.8 The signature pairs (`siting.pairs`; item 103 (b); all soft, `ext…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V11-3
* M-V11-2234-E1-none — UNDEFINED — V11 §3.9 *3.9 District kinds (`roster.districtKinds`)* — no input / nothing to act on; tests seen: T-V11-3
* M-V11-2234-E5-data — UNDEFINED — V11 §3.9 *3.9 District kinds (`roster.districtKinds`)* — missing, empty or contradictory data (the dossier included); tests seen: T-V11-3
* M-V11-2234-E6-rungs — UNDEFINED — V11 §3.9 *3.9 District kinds (`roster.districtKinds`)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V11-3
* M-V11-2271-E5-data — UNTESTED — V11 §3.10 *3.10 Quarter identities (`roster.quarterIdentities`; item 72 (d′); `o…* — missing, empty or contradictory data (the dossier included); defined by: "Dominant-component identities (§4.5 (4)) read the family's or sector's row of this table when one names it, else a generated `dominant-<family>` row …"
* M-V11-2271-E6-rungs — UNDEFINED — V11 §3.10 *3.10 Quarter identities (`roster.quarterIdentities`; item 72 (d′); `o…* — every rung from THORP to the METROPOLIS cap
* M-V11-2271-E8-lifecycle — UNDEFINED — V11 §3.10 *3.10 Quarter identities (`roster.quarterIdentities`; item 72 (d′); `o…* — save, load, undo, redo, regenerate and migrate
* M-V11-2318-E4-degenerate — UNDEFINED — V11 §3.11 *3.11 The institution map — every SettlementForge catalogue kind (`dos…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-2
* M-V11-2318-E7-toggles — UNDEFINED — V11 §3.11 *3.11 The institution map — every SettlementForge catalogue kind (`dos…* — every toggle and preset (parity presets, every layer on and off); tests seen: T-V11-2
* M-V11-2318-E8-lifecycle — UNDEFINED — V11 §3.11 *3.11 The institution map — every SettlementForge catalogue kind (`dos…* — save, load, undo, redo, regenerate and migrate; tests seen: T-V11-2
* M-V11-2636-E4-degenerate — UNDEFINED — V11 §3.12 *3.12 The ladder step types (`dossier.ladders`; item 108)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-2
* M-V11-2636-E8-lifecycle — UNDEFINED — V11 §3.12 *3.12 The ladder step types (`dossier.ladders`; item 108)* — save, load, undo, redo, regenerate and migrate; tests seen: T-V11-2
* M-V11-2786-E4-degenerate — UNDEFINED — V11 §3.13 *3.13 Custom content — item 104's rows and the custom-chain placement …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-29, T-V7-21, T-V8-25
* M-V11-2786-E8-lifecycle — UNDEFINED — V11 §3.13 *3.13 Custom content — item 104's rows and the custom-chain placement …* — save, load, undo, redo, regenerate and migrate; tests seen: T-V11-29, T-V7-21, T-V8-25
* M-V11-3175-E2-one — UNDEFINED — V11 §3.14 *3.14 Concealment and the cover table (item 63; `roster.classes[].conc…* — exactly one item; tests seen: T-V11-8
* M-V11-3175-E5-data — UNDEFINED — V11 §3.14 *3.14 Concealment and the cover table (item 63; `roster.classes[].conc…* — missing, empty or contradictory data (the dossier included); tests seen: T-V11-8
* M-V11-3175-E6-rungs — UNDEFINED — V11 §3.14 *3.14 Concealment and the cover table (item 63; `roster.classes[].conc…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V11-8
* M-V11-3241-E1-none — UNTESTED — V11 §3.16 *3.16 Walls on natural barriers (item 106; `walls.barriers`, `walls.wa…* — no input / nothing to act on; defined by: "`sheerCliff` ¦ slope ≥ 100 % over a drop ≥ 12 m; or, by rule (`islandRim`), an arc of a sky island's rim chain (V5 §3.21: closure only, no wall) ¦ ye…"
* M-V11-3241-E2-one — UNDEFINED — V11 §3.16 *3.16 Walls on natural barriers (item 106; `walls.barriers`, `walls.wa…* — exactly one item
* M-V11-3241-E4-degenerate — UNDEFINED — V11 §3.16 *3.16 Walls on natural barriers (item 106; `walls.barriers`, `walls.wa…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V11-3241-E5-data — UNTESTED — V11 §3.16 *3.16 Walls on natural barriers (item 106; `walls.barriers`, `walls.wa…* — missing, empty or contradictory data (the dossier included); defined by: "DR2 reads the neutral threat keys V08's `threats` row set derives from the dossier — V08 §2.6, J-V8.50, never restated here — and takes the highest-w…"
* M-V11-3241-E6-rungs — UNTESTED — V11 §3.16 *3.16 Walls on natural barriers (item 106; `walls.barriers`, `walls.wa…* — every rung from THORP to the METROPOLIS cap; defined by: "`shallowWater` ¦ a sea or lake arc whose bank kind is `beach`; a river arc whose course `depthCm` < 200 (fordable) ¦ no (village kinds: yes, below) ¦…"
* M-V11-3289-E1-none — UNDEFINED — V11 §3.17 *3.17 Climate and land use* — no input / nothing to act on
* M-V11-3289-E5-data — UNTESTED — V11 §3.17 *3.17 Climate and land use* — missing, empty or contradictory data (the dossier included); defined by: "`arable` — role `field.arable`, crops by climate (grain default);"
* M-V11-3312-E1-none — UNDEFINED — V11 §3.18 *3.18 Decline, ruin and salvage by material* — no input / nothing to act on
* M-V11-3312-E2-one — UNTESTED — V11 §3.18 *3.18 Decline, ruin and salvage by material* — exactly one item; defined by: "The *ruin persistence* column is the one scale of survival for the town's own ruins (§4.11); an ANCIENT ruin's elements survive by V04's `RuinRule.su…"
* M-V11-3312-E4-degenerate — UNDEFINED — V11 §3.18 *3.18 Decline, ruin and salvage by material* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V11-3312-E5-data — UNDEFINED — V11 §3.18 *3.18 Decline, ruin and salvage by material* — missing, empty or contradictory data (the dossier included)
* M-V11-3351-E1-none — UNDEFINED — V11 §3.19 *3.19 Era, region and materials* — no input / nothing to act on
* M-V11-3351-E2-one — UNDEFINED — V11 §3.19 *3.19 Era, region and materials* — exactly one item
* M-V11-3351-E4-degenerate — UNDEFINED — V11 §3.19 *3.19 Era, region and materials* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V11-3351-E5-data — UNTESTED — V11 §3.19 *3.19 Era, region and materials* — missing, empty or contradictory data (the dossier included); defined by: "`c14` (default) ¦ 1300–1399 ¦ 0.6 · 0.3 · 0 · 0.1 ¦ 35–50 ¦ 8–16 ¦ 0.5 ¦ 0.5 ¦ sparse ¦ 1.0 · 0.15 ¦ — ¦ raised ¦ no ¦ 1.0 ¦ 1.0 ¦"
* M-V11-3351-E6-rungs — UNTESTED — V11 §3.19 *3.19 Era, region and materials* — every rung from THORP to the METROPOLIS cap; defined by: "structure `retaining` (a retaining wall) ¦ V11 §3.24.1's `retaining` row at the band of the high side's plot (its `material` weights; the rich row on…"
* M-V11-3396-E4-degenerate — UNDEFINED — V11 §3.20 *3.20 Naming — the grammars, their features and the authoring of their…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-15
* M-V11-3396-E7-toggles — UNDEFINED — V11 §3.20 *3.20 Naming — the grammars, their features and the authoring of their…* — every toggle and preset (parity presets, every layer on and off); tests seen: T-V11-15
* M-V11-3485-E1-none — UNDEFINED — V11 §3.21 *3.21 Government, religion, households, institutions and the module's …* — no input / nothing to act on
* M-V11-3485-E3-cap — UNDEFINED — V11 §3.21 *3.21 Government, religion, households, institutions and the module's …* — the maximum and its caps
* M-V11-3485-E5-data — UNTESTED — V11 §3.21 *3.21 Government, religion, households, institutions and the module's …* — missing, empty or contradictory data (the dossier included); defined by: "`crown` ¦ `palace` (else `castle`) ¦ `v.manor_house` (the lord's hall;"
* M-V11-3485-E6-rungs — UNTESTED — V11 §3.21 *3.21 Government, religion, households, institutions and the module's …* — every rung from THORP to the METROPOLIS cap; defined by: "kind ¦ seat class ¦ village seat (`villageSeat`;"
* M-V11-3485-E7-toggles — UNTESTED — V11 §3.21 *3.21 Government, religion, households, institutions and the module's …* — every toggle and preset (parity presets, every layer on and off); defined by: "`seigneurial` ¦ `castle` (a `tower_house` below CITY when the castle toggle is off) ¦ `v.manor_house` ¦ steward · castle 1; bailiff · courthouse 1 ¦ …"
* M-V11-3485-E8-lifecycle — UNDEFINED — V11 §3.21 *3.21 Government, religion, households, institutions and the module's …* — save, load, undo, redo, regenerate and migrate
* M-V11-3527-E2-one — UNDEFINED — V11 §3.22 *3.22 The `villageForm` column (V07's BCR-V7-21, filled here)* — exactly one item; tests seen: T-V11-3
* M-V11-3527-E8-lifecycle — UNDEFINED — V11 §3.22 *3.22 The `villageForm` column (V07's BCR-V7-21, filled here)* — save, load, undo, redo, regenerate and migrate; tests seen: T-V11-3
* M-V11-3547-E4-degenerate — UNDEFINED — V11 §3.23 *3.23 The underground's content rows (item 109; the catacombs as revis…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-23, T-V11-24, T-V4
* M-V11-3678-E4-degenerate — UNDEFINED — V11 §3.24 *3.24 Item 110's rows — terraces, raised ways, stepped massing, decks …* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-1, T-V11-31, T-V11-32, T-V11-33
* EI-V11-EDGE-1 — UNDEFINED (inventory V11-EDGE-1) — V11 §3.24.5 'The rule' and 'The pre-decided failure for a cart class' — A crossing is a ramp (step over run <= rampMaxGrade, or a switchback within minTerraceDepthM), else a stair when the class has one; a cart class takes a ramp 'up to 1.5 x rampMaxGrade' (W_STEEP_RAMP), 'never a stair and never a gap'. The case where a cart class's crossing needs more than 1.5 x rampMaxGrade and no switchback fits (e.g. a 4 m step, stepMaxCm 400, on a through way at 0.08 with a sho…
* EI-V11-EDGE-2 — UNDEFINED (inventory V11-EDGE-2) — V11 §2.3 CoverageSpec {per, target} — Satisfaction clamp(2 - n / target, 0, 1) and the households radius sqrt(per x a_res / pi) are undefined for target = 0 or per = 0 (and a_res = 0 in a district with no residential plots); no range for per/target is stated in the schema comment. PLAUSIBLE.

### V12

* M-V12-531-E5-data — UNDEFINED — V12 §2.3 *2.3 The baselines file* — missing, empty or contradictory data (the dossier included)
* M-V12-588-E5-data — UNDEFINED — V12 §2.5 *2.5 Calibration runs (tuning against a reference, a threshold fallbac…* — missing, empty or contradictory data (the dossier included)
* M-V12-624-E5-data — UNTESTED — V12 §2.6 *2.6 The calibration register* — missing, empty or contradictory data (the dossier included); defined by: "One knob has one entry and one column: the register check fails when two entries, or two compiled columns, name one mechanism under different names (…"
* M-V12-684-E5-data — UNDEFINED — V12 §2.7 *2.7 The correlation harness* — missing, empty or contradictory data (the dossier included); tests seen: T-V11-12, T-V11-13, T71-3
* M-V12-733-E5-data — UNDEFINED — V12 §2.7b *2.7b Share, sweep, paired and two-sample bars* — missing, empty or contradictory data (the dossier included); tests seen: T-V4-54
* M-V12-793-E5-data — UNTESTED — V12 §2.8 *2.8 Panels and sittings* — missing, empty or contradictory data (the dossier included); defined by: "Every milestone id this volume's records and commands carry — a `PanelSpec.id`, a register entry's `due` and a history row's `milestone`, `--defaults…"
* M-V12-849-E5-data — UNDEFINED — V12 §2.9 *2.9 Corpus records (M-CAL)* — missing, empty or contradictory data (the dossier included)
* M-V12-880-E5-data — UNDEFINED — V12 §2.10 *2.10 Provenance evidence (BCR-V12-5)* — missing, empty or contradictory data (the dossier included)
* M-V12-924-E5-data — UNDEFINED — V12 §2.12 *2.12 The known-city fixtures (V12 §3.14)* — missing, empty or contradictory data (the dossier included); tests seen: T101-6
* M-V12-957-E5-data — UNDEFINED — V12 §2.13 *2.13 The no-op pins (V12 §3.7.8)* — missing, empty or contradictory data (the dossier included); tests seen: T-V11-31, T-V2-46, T-V2-50, T-V6-64
* M-V12-974-E1-none — UNDEFINED — V12 §3.1 *3.1 The loop at a glance* — no input / nothing to act on
* M-V12-974-E5-data — UNDEFINED — V12 §3.1 *3.1 The loop at a glance* — missing, empty or contradictory data (the dossier included)
* M-V12-974-E7-toggles — UNDEFINED — V12 §3.1 *3.1 The loop at a glance* — every toggle and preset (parity presets, every layer on and off)
* M-V12-996-E4-degenerate — UNDEFINED — V12 §3.2 *3.2 The capture-and-measure loop (research side)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V12-28, T-V12-3, T-V12-6
* M-V12-1060-E2-one — UNDEFINED — V12 §3.3 *3.3 The crossing — how numbers, and only numbers, enter `plat/`* — exactly one item; tests seen: T-V12-1
* M-V12-1060-E5-data — UNDEFINED — V12 §3.3 *3.3 The crossing — how numbers, and only numbers, enter `plat/`* — missing, empty or contradictory data (the dossier included); tests seen: T-V12-1
* M-V12-1293-E4-degenerate — UNDEFINED — V12 §3.6 *3.6 The correlation harness — every "above a random baseline" bar* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-12, T-V11-13, T-V11-14, T-V11-18
* M-V12-1399-E4-degenerate — UNDEFINED — V12 §3.6b *3.6b Share, sweep, paired and two-sample bars* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-12, T-V11-13, T-V11-14, T-V11-16
* M-V12-1568-E4-degenerate — UNDEFINED — V12 §3.7 *3.7 Tuning runs — table-version bumps with declared shifts* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V11-31, T-V12-37, T-V2-50, T-V4-69
* M-V12-1709-E1-none — UNTESTED — V12 §3.8 *3.8 Reference drift* — no input / nothing to act on; defined by: "On a change, the pin stays; the capture plan runs its same formulas on the new build and the rows are added under the new build, reported beside the …"
* M-V12-1709-E2-one — UNTESTED — V12 §3.8 *3.8 Reference drift* — exactly one item; defined by: "VG's change of geometry for one seed between builds 19251041 and 19365073 (§13.5) is the precedent this rule answers."
* M-V12-1709-E8-lifecycle — UNDEFINED — V12 §3.8 *3.8 Reference drift* — save, load, undo, redo, regenerate and migrate
* M-V12-1722-E4-degenerate — UNDEFINED — V12 §3.9 *3.9 The owner's sittings — one panel engine* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-32
* M-V12-1798-E4-degenerate — UNDEFINED — V12 §3.10 *3.10 The corpus reconciliation — a process, milestone M-CAL* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V12-24
* M-V12-1949-E4-degenerate — UNDEFINED — V12 §3.11 *3.11 The calibration register — no provisional number dangles* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-50, T-V10-8, T-V11-23, T-V11-24
* M-V12-2221-E5-data — UNDEFINED — V12 §3.12 *3.12 Failure handling — every failure, its rung, its report* — missing, empty or contradictory data (the dossier included); tests seen: T-V12-3, T-V12-36
* M-V12-2221-E8-lifecycle — UNDEFINED — V12 §3.12 *3.12 Failure handling — every failure, its rung, its report* — save, load, undo, redo, regenerate and migrate; tests seen: T-V12-3, T-V12-36
* M-V12-2252-E1-none — UNDEFINED — V12 §3.13 *3.13 Determinism* — no input / nothing to act on; tests seen: T-V12-8
* M-V12-2252-E6-rungs — UNDEFINED — V12 §3.13 *3.13 Determinism* — every rung from THORP to the METROPOLIS cap; tests seen: T-V12-8
* M-V12-2265-E4-degenerate — UNDEFINED — V12 §3.14 *3.14 The known-city fixtures — one engine for both (item 110 (e), (f)…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V1-54, T-V12-36, T-V2-44, T-V2-47
* M-V12-2265-E8-lifecycle — UNDEFINED — V12 §3.14 *3.14 The known-city fixtures — one engine for both (item 110 (e), (f)…* — save, load, undo, redo, regenerate and migrate; tests seen: T-V1-54, T-V12-36, T-V2-44, T-V2-47
* M-V12-2350-E1-none — UNDEFINED — V12 §4.1 *4.1 No new map event: calibration reaches a town as tables and presets* — no input / nothing to act on; tests seen: T-V12-40
* M-V12-2350-E6-rungs — UNDEFINED — V12 §4.1 *4.1 No new map event: calibration reaches a town as tables and presets* — every rung from THORP to the METROPOLIS cap; tests seen: T-V12-40
* M-V12-2371-E1-none — UNTESTED — V12 §4.2 *4.2 The records' verbs* — no input / nothing to act on; defined by: "`plat baselines check --previous <file>` then the baseline seat's commit ¦ adds `Baseline` rows, a pin, a `CrossingRecord` ¦ a superseding row (C9: n…"
* M-V12-2371-E5-data — UNTESTED — V12 §4.2 *4.2 The records' verbs* — missing, empty or contradictory data (the dossier included); defined by: "`plat calibrate register --defaults --milestone <id>` ¦ the default line's entries for calibratable columns that hold a compiled cell and have no ent…"
* M-V12-2371-E8-lifecycle — UNTESTED — V12 §4.2 *4.2 The records' verbs* — save, load, undo, redo, regenerate and migrate; defined by: "The harness's records are repository data, changed only by these commands, each append-only with its undo:"
* M-V12-2386-E1-none — UNDEFINED — V12 §4.3 *4.3 The owner's inputs* — no input / nothing to act on
* M-V12-2386-E2-one — UNTESTED — V12 §4.3 *4.3 The owner's inputs* — exactly one item; defined by: "The owner acts at six points, each recorded with its date: the sittings' answers, strip picks and `house` pick (`D5Record`), the M4-110 group's among…"
* M-V12-2395-E1-none — UNDEFINED — V12 §4.4 *4.4 The clerk's view and the cell inspector* — no input / nothing to act on
* M-V12-2395-E5-data — UNDEFINED — V12 §4.4 *4.4 The clerk's view and the cell inspector* — missing, empty or contradictory data (the dossier included)
* M-V12-2408-E1-none — UNDEFINED — V12 §5.1 *5.1 The parity dashboard* — no input / nothing to act on
* M-V12-2408-E5-data — UNDEFINED — V12 §5.1 *5.1 The parity dashboard* — missing, empty or contradictory data (the dossier included)
* M-V12-2408-E6-rungs — UNDEFINED — V12 §5.1 *5.1 The parity dashboard* — every rung from THORP to the METROPOLIS cap
* M-V12-2408-E7-toggles — UNTESTED — V12 §5.1 *5.1 The parity dashboard* — every toggle and preset (parity presets, every layer on and off); defined by: "`plat parity --html` writes one self-contained page (inline SVG, no external script or font request, our own UI colours — no reference palette): a he…"
* M-V12-2421-E1-none — UNDEFINED — V12 §5.2 *5.2 Run, register and correlation reports* — no input / nothing to act on
* M-V12-2421-E2-one — UNDEFINED — V12 §5.2 *5.2 Run, register and correlation reports* — exactly one item
* M-V12-2421-E4-degenerate — UNDEFINED — V12 §5.2 *5.2 Run, register and correlation reports* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V12-2421-E5-data — UNTESTED — V12 §5.2 *5.2 Run, register and correlation reports* — missing, empty or contradictory data (the dossier included); defined by: "`plat calibrate register --html`: counts by status and owner, entries due at the next milestone, overdue entries first, and the default line's entrie…"
* M-V12-2421-E8-lifecycle — UNDEFINED — V12 §5.2 *5.2 Run, register and correlation reports* — save, load, undo, redo, regenerate and migrate
* M-V12-2454-E1-none — UNDEFINED — V12 §5.5 *5.5 Release notes and the owner's reconciliation report* — no input / nothing to act on
* M-V12-2454-E2-one — UNTESTED — V12 §5.5 *5.5 Release notes and the owner's reconciliation report* — exactly one item; defined by: "At M-CAL, the owner's reconciliation report is one page per frame in plain words: what the historical maps changed, what they were not allowed to cha…"

## Cross-unit combinations — UNDEFINED, by owner (the DEFINED ones are in edges.json with their quoted sentence)

### model

* C-raised-frame — raised (model) × frame (kernel) at TOWN, CITY, METROPOLIS
* C-retaining-frame — retaining (model) × frame (kernel) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-frame — deckplot (model) × frame (kernel) at VILLAGE, TOWN, CITY, METROPOLIS

### pipeline

* C-cliff-raised — cliff (pipeline) × raised (model) at TOWN, CITY, METROPOLIS
* C-cliff-retaining — cliff (pipeline) × retaining (model) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-deckplot — cliff (pipeline) × deckplot (model) at VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-frame — cliff (pipeline) × frame (kernel) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-raised — steep (pipeline) × raised (model) at TOWN, CITY, METROPOLIS
* C-steep-retaining — steep (pipeline) × retaining (model) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-deckplot — steep (pipeline) × deckplot (model) at VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-frame — steep (pipeline) × frame (kernel) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-river-raised — river (pipeline) × raised (model) at TOWN, CITY, METROPOLIS
* C-river-retaining — river (pipeline) × retaining (model) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-river-deckplot — river (pipeline) × deckplot (model) at VILLAGE, TOWN, CITY, METROPOLIS
* C-river-frame — river (pipeline) × frame (kernel) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-raised — coast (pipeline) × raised (model) at TOWN, CITY, METROPOLIS
* C-coast-retaining — coast (pipeline) × retaining (model) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-deckplot — coast (pipeline) × deckplot (model) at VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-frame — coast (pipeline) × frame (kernel) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-harbour-raised — harbour (pipeline) × raised (model) at TOWN, CITY, METROPOLIS
* C-harbour-retaining — harbour (pipeline) × retaining (model) at TOWN, CITY, METROPOLIS
* C-harbour-deckplot — harbour (pipeline) × deckplot (model) at TOWN, CITY, METROPOLIS
* C-wall-raised — wall (pipeline) × raised (model) at TOWN, CITY, METROPOLIS
* C-wall-retaining — wall (pipeline) × retaining (model) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-wall-deckplot — wall (pipeline) × deckplot (model) at VILLAGE, TOWN, CITY, METROPOLIS
* C-moat-raised — moat (pipeline) × raised (model) at TOWN, CITY, METROPOLIS
* C-moat-retaining — moat (pipeline) × retaining (model) at TOWN, CITY, METROPOLIS
* C-moat-deckplot — moat (pipeline) × deckplot (model) at TOWN, CITY, METROPOLIS
* C-bridge-raised — bridge (pipeline) × raised (model) at TOWN, CITY, METROPOLIS
* C-bridge-retaining — bridge (pipeline) × retaining (model) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-bridge-frame — bridge (pipeline) × frame (kernel) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-raised-square — raised (model) × square (pipeline) at TOWN, CITY, METROPOLIS
* C-raised-hinterland — raised (model) × hinterland (pipeline) at TOWN, CITY, METROPOLIS
* C-raised-oasis — raised (model) × oasis (pipeline) at TOWN, CITY, METROPOLIS
* C-retaining-square — retaining (model) × square (pipeline) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-retaining-hinterland — retaining (model) × hinterland (pipeline) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-retaining-oasis — retaining (model) × oasis (pipeline) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-square — deckplot (model) × square (pipeline) at VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-hinterland — deckplot (model) × hinterland (pipeline) at VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-oasis — deckplot (model) × oasis (pipeline) at VILLAGE, TOWN, CITY, METROPOLIS
* C-hinterland-frame — hinterland (pipeline) × frame (kernel) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-frame — oasis (pipeline) × frame (kernel) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS

### determinism

* C-cliff-edit — cliff (pipeline) × edit (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-undo — cliff (pipeline) × undo (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-saveload — cliff (pipeline) × saveload (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-regen — cliff (pipeline) × regen (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-edit — steep (pipeline) × edit (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-lock — steep (pipeline) × lock (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-undo — steep (pipeline) × undo (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-saveload — steep (pipeline) × saveload (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-regen — steep (pipeline) × regen (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-river-undo — river (pipeline) × undo (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-saveload — coast (pipeline) × saveload (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-harbour-undo — harbour (pipeline) × undo (determinism) at TOWN, CITY, METROPOLIS
* C-moat-undo — moat (pipeline) × undo (determinism) at TOWN, CITY, METROPOLIS
* C-moat-saveload — moat (pipeline) × saveload (determinism) at TOWN, CITY, METROPOLIS
* C-bridge-undo — bridge (pipeline) × undo (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-raised-edit — raised (model) × edit (determinism) at TOWN, CITY, METROPOLIS
* C-raised-lock — raised (model) × lock (determinism) at TOWN, CITY, METROPOLIS
* C-raised-undo — raised (model) × undo (determinism) at TOWN, CITY, METROPOLIS
* C-raised-saveload — raised (model) × saveload (determinism) at TOWN, CITY, METROPOLIS
* C-raised-regen — raised (model) × regen (determinism) at TOWN, CITY, METROPOLIS
* C-retaining-edit — retaining (model) × edit (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-retaining-lock — retaining (model) × lock (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-retaining-undo — retaining (model) × undo (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-retaining-saveload — retaining (model) × saveload (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-retaining-regen — retaining (model) × regen (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-edit — deckplot (model) × edit (determinism) at VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-undo — deckplot (model) × undo (determinism) at VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-saveload — deckplot (model) × saveload (determinism) at VILLAGE, TOWN, CITY, METROPOLIS
* C-square-undo — square (pipeline) × undo (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-square-regen — square (pipeline) × regen (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-edit — oasis (pipeline) × edit (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-lock — oasis (pipeline) × lock (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-undo — oasis (pipeline) × undo (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-saveload — oasis (pipeline) × saveload (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-regen — oasis (pipeline) × regen (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-lock — frame (kernel) × lock (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-undo — frame (kernel) × undo (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-saveload — frame (kernel) × saveload (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-regen — frame (kernel) × regen (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS

### rendering

* C-cliff-light — cliff (pipeline) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-labels — cliff (pipeline) × labels (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-export — cliff (pipeline) × export (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-light — steep (pipeline) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-labels — steep (pipeline) × labels (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-export — steep (pipeline) × export (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-river-light — river (pipeline) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-light — coast (pipeline) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-moat-light — moat (pipeline) × light (rendering) at TOWN, CITY, METROPOLIS
* C-moat-labels — moat (pipeline) × labels (rendering) at TOWN, CITY, METROPOLIS
* C-moat-export — moat (pipeline) × export (rendering) at TOWN, CITY, METROPOLIS
* C-bridge-light — bridge (pipeline) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-raised-light — raised (model) × light (rendering) at TOWN, CITY, METROPOLIS
* C-raised-labels — raised (model) × labels (rendering) at TOWN, CITY, METROPOLIS
* C-raised-export — raised (model) × export (rendering) at TOWN, CITY, METROPOLIS
* C-retaining-light — retaining (model) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-retaining-labels — retaining (model) × labels (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-retaining-export — retaining (model) × export (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-light — deckplot (model) × light (rendering) at VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-labels — deckplot (model) × labels (rendering) at VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-export — deckplot (model) × export (rendering) at VILLAGE, TOWN, CITY, METROPOLIS
* C-square-light — square (pipeline) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-hinterland-export — hinterland (pipeline) × export (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-light — oasis (pipeline) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-labels — oasis (pipeline) × labels (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-export — oasis (pipeline) × export (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-light — frame (kernel) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-labels — frame (kernel) × labels (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-terraced-ward-light — terraced-ward (V01) × light (rendering) at TOWN, CITY, METROPOLIS
* C-terraced-ward-labels — terraced-ward (V01) × labels (rendering) at TOWN, CITY, METROPOLIS
* C-composed-light — composed (V02) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-crypt-light — crypt (V02) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-plan-light — plan (V03) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cavern-light — cavern (V04) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-catacomb-light — catacomb (V04) × light (rendering) at TOWN, CITY, METROPOLIS
* C-void-light — void (V04) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-landfall-light — landfall (V05) × light (rendering) at CITY, METROPOLIS
* C-village-light — village (V07) × light (rendering) at THORP, HAMLET, VILLAGE

### V01

* C-cliff-hood — cliff (pipeline) × hood (V01) at TOWN, CITY, METROPOLIS
* C-cliff-terraced-ward — cliff (pipeline) × terraced-ward (V01) at TOWN, CITY, METROPOLIS
* C-steep-terraced-ward — steep (pipeline) × terraced-ward (V01) at TOWN, CITY, METROPOLIS
* C-coast-hood — coast (pipeline) × hood (V01) at TOWN, CITY, METROPOLIS
* C-coast-terraced-ward — coast (pipeline) × terraced-ward (V01) at TOWN, CITY, METROPOLIS
* C-moat-hood — moat (pipeline) × hood (V01) at TOWN, CITY, METROPOLIS
* C-moat-terraced-ward — moat (pipeline) × terraced-ward (V01) at TOWN, CITY, METROPOLIS
* C-bridge-terraced-ward — bridge (pipeline) × terraced-ward (V01) at TOWN, CITY, METROPOLIS
* C-raised-hood — raised (model) × hood (V01) at TOWN, CITY, METROPOLIS
* C-oasis-hood — oasis (pipeline) × hood (V01) at TOWN, CITY, METROPOLIS
* C-oasis-terraced-ward — oasis (pipeline) × terraced-ward (V01) at TOWN, CITY, METROPOLIS
* C-frame-hood — frame (kernel) × hood (V01) at TOWN, CITY, METROPOLIS
* C-frame-terraced-ward — frame (kernel) × terraced-ward (V01) at TOWN, CITY, METROPOLIS
* C-terraced-ward-lock — terraced-ward (V01) × lock (determinism) at TOWN, CITY, METROPOLIS
* C-terraced-ward-saveload — terraced-ward (V01) × saveload (determinism) at TOWN, CITY, METROPOLIS

### V02

* C-cliff-composed — cliff (pipeline) × composed (V02) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-composed — steep (pipeline) × composed (V02) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-tiers — steep (pipeline) × tiers (V02) at TOWN, CITY, METROPOLIS
* C-steep-crypt — steep (pipeline) × crypt (V02) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-river-crypt — river (pipeline) × crypt (V02) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-composed — coast (pipeline) × composed (V02) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-crypt — coast (pipeline) × crypt (V02) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-harbour-composed — harbour (pipeline) × composed (V02) at TOWN, CITY, METROPOLIS
* C-moat-composed — moat (pipeline) × composed (V02) at TOWN, CITY, METROPOLIS
* C-moat-tiers — moat (pipeline) × tiers (V02) at TOWN, CITY, METROPOLIS
* C-moat-crypt — moat (pipeline) × crypt (V02) at TOWN, CITY, METROPOLIS
* C-bridge-composed — bridge (pipeline) × composed (V02) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-raised-composed — raised (model) × composed (V02) at TOWN, CITY, METROPOLIS
* C-raised-tiers — raised (model) × tiers (V02) at TOWN, CITY, METROPOLIS
* C-raised-crypt — raised (model) × crypt (V02) at TOWN, CITY, METROPOLIS
* C-square-composed — square (pipeline) × composed (V02) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-square-crypt — square (pipeline) × crypt (V02) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-composed — oasis (pipeline) × composed (V02) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-tiers — oasis (pipeline) × tiers (V02) at TOWN, CITY, METROPOLIS
* C-oasis-crypt — oasis (pipeline) × crypt (V02) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-composed — frame (kernel) × composed (V02) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-tiers — frame (kernel) × tiers (V02) at TOWN, CITY, METROPOLIS
* C-frame-crypt — frame (kernel) × crypt (V02) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-hood-composed — hood (V01) × composed (V02) at TOWN, CITY, METROPOLIS
* C-terraced-ward-composed — terraced-ward (V01) × composed (V02) at TOWN, CITY, METROPOLIS
* C-terraced-ward-crypt — terraced-ward (V01) × crypt (V02) at TOWN, CITY, METROPOLIS
* C-composed-lock — composed (V02) × lock (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-crypt-undo — crypt (V02) × undo (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS

### V03

* C-cliff-plan — cliff (pipeline) × plan (V03) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-plan — steep (pipeline) × plan (V03) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-plan — coast (pipeline) × plan (V03) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-moat-plan — moat (pipeline) × plan (V03) at TOWN, CITY, METROPOLIS
* C-oasis-plan — oasis (pipeline) × plan (V03) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-plan — frame (kernel) × plan (V03) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS

### V04

* C-cliff-sewer — cliff (pipeline) × sewer (V04) at TOWN, CITY, METROPOLIS
* C-cliff-cavern — cliff (pipeline) × cavern (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-ruin — cliff (pipeline) × ruin (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-catacomb — cliff (pipeline) × catacomb (V04) at TOWN, CITY, METROPOLIS
* C-cliff-undercity — cliff (pipeline) × undercity (V04) at TOWN, CITY, METROPOLIS
* C-cliff-void — cliff (pipeline) × void (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-access — cliff (pipeline) × access (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-vault — cliff (pipeline) × vault (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-sewer — steep (pipeline) × sewer (V04) at TOWN, CITY, METROPOLIS
* C-steep-cavern — steep (pipeline) × cavern (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-ruin — steep (pipeline) × ruin (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-catacomb — steep (pipeline) × catacomb (V04) at TOWN, CITY, METROPOLIS
* C-steep-undercity — steep (pipeline) × undercity (V04) at TOWN, CITY, METROPOLIS
* C-steep-void — steep (pipeline) × void (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-access — steep (pipeline) × access (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-vault — steep (pipeline) × vault (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-access — coast (pipeline) × access (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-moat-cavern — moat (pipeline) × cavern (V04) at TOWN, CITY, METROPOLIS
* C-moat-ruin — moat (pipeline) × ruin (V04) at TOWN, CITY, METROPOLIS
* C-moat-catacomb — moat (pipeline) × catacomb (V04) at TOWN, CITY, METROPOLIS
* C-moat-access — moat (pipeline) × access (V04) at TOWN, CITY, METROPOLIS
* C-moat-vault — moat (pipeline) × vault (V04) at TOWN, CITY, METROPOLIS
* C-bridge-access — bridge (pipeline) × access (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-sewer — deckplot (model) × sewer (V04) at TOWN, CITY, METROPOLIS
* C-deckplot-cavern — deckplot (model) × cavern (V04) at VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-ruin — deckplot (model) × ruin (V04) at VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-catacomb — deckplot (model) × catacomb (V04) at TOWN, CITY, METROPOLIS
* C-deckplot-undercity — deckplot (model) × undercity (V04) at TOWN, CITY, METROPOLIS
* C-deckplot-void — deckplot (model) × void (V04) at VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-access — deckplot (model) × access (V04) at VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-vault — deckplot (model) × vault (V04) at VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-sewer — oasis (pipeline) × sewer (V04) at TOWN, CITY, METROPOLIS
* C-oasis-cavern — oasis (pipeline) × cavern (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-ruin — oasis (pipeline) × ruin (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-catacomb — oasis (pipeline) × catacomb (V04) at TOWN, CITY, METROPOLIS
* C-oasis-undercity — oasis (pipeline) × undercity (V04) at TOWN, CITY, METROPOLIS
* C-oasis-void — oasis (pipeline) × void (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-access — oasis (pipeline) × access (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-vault — oasis (pipeline) × vault (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-cavern — frame (kernel) × cavern (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-ruin — frame (kernel) × ruin (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-catacomb — frame (kernel) × catacomb (V04) at TOWN, CITY, METROPOLIS
* C-frame-undercity — frame (kernel) × undercity (V04) at TOWN, CITY, METROPOLIS
* C-frame-void — frame (kernel) × void (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-access — frame (kernel) × access (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-vault — frame (kernel) × vault (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-hood-vault — hood (V01) × vault (V04) at TOWN, CITY, METROPOLIS
* C-terraced-ward-sewer — terraced-ward (V01) × sewer (V04) at TOWN, CITY, METROPOLIS
* C-terraced-ward-cavern — terraced-ward (V01) × cavern (V04) at TOWN, CITY, METROPOLIS
* C-terraced-ward-ruin — terraced-ward (V01) × ruin (V04) at TOWN, CITY, METROPOLIS
* C-terraced-ward-undercity — terraced-ward (V01) × undercity (V04) at TOWN, CITY, METROPOLIS
* C-terraced-ward-access — terraced-ward (V01) × access (V04) at TOWN, CITY, METROPOLIS
* C-terraced-ward-vault — terraced-ward (V01) × vault (V04) at TOWN, CITY, METROPOLIS
* C-composed-sewer — composed (V02) × sewer (V04) at TOWN, CITY, METROPOLIS
* C-composed-cavern — composed (V02) × cavern (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-composed-catacomb — composed (V02) × catacomb (V04) at TOWN, CITY, METROPOLIS
* C-composed-undercity — composed (V02) × undercity (V04) at TOWN, CITY, METROPOLIS
* C-composed-access — composed (V02) × access (V04) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-tiers-access — tiers (V02) × access (V04) at TOWN, CITY, METROPOLIS
* C-cavern-undo — cavern (V04) × undo (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-ruin-undo — ruin (V04) × undo (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-vault-lock — vault (V04) × lock (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS

### V05

* C-cliff-shade — cliff (pipeline) × shade (V05) at CITY, METROPOLIS
* C-cliff-landfall — cliff (pipeline) × landfall (V05) at CITY, METROPOLIS
* C-steep-shade — steep (pipeline) × shade (V05) at CITY, METROPOLIS
* C-steep-landfall — steep (pipeline) × landfall (V05) at CITY, METROPOLIS
* C-coast-shade — coast (pipeline) × shade (V05) at CITY, METROPOLIS
* C-coast-landfall — coast (pipeline) × landfall (V05) at CITY, METROPOLIS
* C-harbour-shade — harbour (pipeline) × shade (V05) at CITY, METROPOLIS
* C-moat-shade — moat (pipeline) × shade (V05) at CITY, METROPOLIS
* C-moat-skyaccess — moat (pipeline) × skyaccess (V05) at CITY, METROPOLIS
* C-moat-landfall — moat (pipeline) × landfall (V05) at CITY, METROPOLIS
* C-bridge-shade — bridge (pipeline) × shade (V05) at CITY, METROPOLIS
* C-retaining-shade — retaining (model) × shade (V05) at CITY, METROPOLIS
* C-deckplot-shade — deckplot (model) × shade (V05) at CITY, METROPOLIS
* C-square-landfall — square (pipeline) × landfall (V05) at CITY, METROPOLIS
* C-oasis-shade — oasis (pipeline) × shade (V05) at CITY, METROPOLIS
* C-frame-shade — frame (kernel) × shade (V05) at CITY, METROPOLIS
* C-frame-skyaccess — frame (kernel) × skyaccess (V05) at CITY, METROPOLIS
* C-frame-landfall — frame (kernel) × landfall (V05) at CITY, METROPOLIS
* C-hood-skyaccess — hood (V01) × skyaccess (V05) at CITY, METROPOLIS
* C-terraced-ward-shade — terraced-ward (V01) × shade (V05) at CITY, METROPOLIS
* C-terraced-ward-skyaccess — terraced-ward (V01) × skyaccess (V05) at CITY, METROPOLIS
* C-terraced-ward-landfall — terraced-ward (V01) × landfall (V05) at CITY, METROPOLIS
* C-composed-shade — composed (V02) × shade (V05) at CITY, METROPOLIS
* C-composed-landfall — composed (V02) × landfall (V05) at CITY, METROPOLIS
* C-plan-landfall — plan (V03) × landfall (V05) at CITY, METROPOLIS
* C-vault-island — vault (V04) × island (V05) at CITY, METROPOLIS
* C-vault-shade — vault (V04) × shade (V05) at CITY, METROPOLIS
* C-vault-skyaccess — vault (V04) × skyaccess (V05) at CITY, METROPOLIS
* C-shade-lock — shade (V05) × lock (determinism) at CITY, METROPOLIS
* C-shade-undo — shade (V05) × undo (determinism) at CITY, METROPOLIS
* C-landfall-saveload — landfall (V05) × saveload (determinism) at CITY, METROPOLIS

### V06

* C-cliff-history — cliff (pipeline) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-works — cliff (pipeline) × works (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-epoch — steep (pipeline) × epoch (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-history — steep (pipeline) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-works — steep (pipeline) × works (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-river-history — river (pipeline) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-history — coast (pipeline) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-harbour-history — harbour (pipeline) × history (V06) at TOWN, CITY, METROPOLIS
* C-moat-history — moat (pipeline) × history (V06) at TOWN, CITY, METROPOLIS
* C-moat-works — moat (pipeline) × works (V06) at TOWN, CITY, METROPOLIS
* C-deckplot-history — deckplot (model) × history (V06) at VILLAGE, TOWN, CITY, METROPOLIS
* C-square-history — square (pipeline) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-square-works — square (pipeline) × works (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-history — oasis (pipeline) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-works — oasis (pipeline) × works (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-history — frame (kernel) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-works — frame (kernel) × works (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-hood-history — hood (V01) × history (V06) at TOWN, CITY, METROPOLIS
* C-terraced-ward-history — terraced-ward (V01) × history (V06) at TOWN, CITY, METROPOLIS
* C-composed-history — composed (V02) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-tiers-history — tiers (V02) × history (V06) at TOWN, CITY, METROPOLIS
* C-crypt-history — crypt (V02) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-plan-history — plan (V03) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-sewer-history — sewer (V04) × history (V06) at TOWN, CITY, METROPOLIS
* C-cavern-history — cavern (V04) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-ruin-history — ruin (V04) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-catacomb-history — catacomb (V04) × history (V06) at TOWN, CITY, METROPOLIS
* C-undercity-history — undercity (V04) × history (V06) at TOWN, CITY, METROPOLIS
* C-void-history — void (V04) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-access-history — access (V04) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-access-works — access (V04) × works (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-vault-history — vault (V04) × history (V06) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-island-history — island (V05) × history (V06) at CITY, METROPOLIS
* C-shade-history — shade (V05) × history (V06) at CITY, METROPOLIS
* C-skyaccess-history — skyaccess (V05) × history (V06) at CITY, METROPOLIS
* C-landfall-history — landfall (V05) × history (V06) at CITY, METROPOLIS
* C-epoch-light — epoch (V06) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-history-lock — history (V06) × lock (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-history-saveload — history (V06) × saveload (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-history-light — history (V06) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-history-export — history (V06) × export (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-works-light — works (V06) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS

### V08

* C-cliff-dossier — cliff (pipeline) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-custom — cliff (pipeline) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-players — cliff (pipeline) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-dossier — steep (pipeline) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-custom — steep (pipeline) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-players — steep (pipeline) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-river-custom — river (pipeline) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-river-players — river (pipeline) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-dossier — coast (pipeline) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-custom — coast (pipeline) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-harbour-dossier — harbour (pipeline) × dossier (V08) at TOWN, CITY, METROPOLIS
* C-harbour-custom — harbour (pipeline) × custom (V08) at TOWN, CITY, METROPOLIS
* C-harbour-players — harbour (pipeline) × players (V08) at TOWN, CITY, METROPOLIS
* C-moat-dossier — moat (pipeline) × dossier (V08) at TOWN, CITY, METROPOLIS
* C-moat-custom — moat (pipeline) × custom (V08) at TOWN, CITY, METROPOLIS
* C-moat-players — moat (pipeline) × players (V08) at TOWN, CITY, METROPOLIS
* C-raised-custom — raised (model) × custom (V08) at TOWN, CITY, METROPOLIS
* C-raised-players — raised (model) × players (V08) at TOWN, CITY, METROPOLIS
* C-retaining-custom — retaining (model) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-retaining-players — retaining (model) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-custom — deckplot (model) × custom (V08) at VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-players — deckplot (model) × players (V08) at VILLAGE, TOWN, CITY, METROPOLIS
* C-square-dossier — square (pipeline) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-square-custom — square (pipeline) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-square-players — square (pipeline) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-dossier — oasis (pipeline) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-custom — oasis (pipeline) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-players — oasis (pipeline) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-dossier — frame (kernel) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-custom — frame (kernel) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-players — frame (kernel) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-hood-dossier — hood (V01) × dossier (V08) at TOWN, CITY, METROPOLIS
* C-hood-custom — hood (V01) × custom (V08) at TOWN, CITY, METROPOLIS
* C-hood-players — hood (V01) × players (V08) at TOWN, CITY, METROPOLIS
* C-terraced-ward-dossier — terraced-ward (V01) × dossier (V08) at TOWN, CITY, METROPOLIS
* C-terraced-ward-custom — terraced-ward (V01) × custom (V08) at TOWN, CITY, METROPOLIS
* C-terraced-ward-players — terraced-ward (V01) × players (V08) at TOWN, CITY, METROPOLIS
* C-tiers-custom — tiers (V02) × custom (V08) at TOWN, CITY, METROPOLIS
* C-crypt-players — crypt (V02) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-plan-dossier — plan (V03) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-plan-custom — plan (V03) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-sewer-custom — sewer (V04) × custom (V08) at TOWN, CITY, METROPOLIS
* C-cavern-custom — cavern (V04) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-ruin-custom — ruin (V04) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-catacomb-custom — catacomb (V04) × custom (V08) at TOWN, CITY, METROPOLIS
* C-access-custom — access (V04) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-vault-dossier — vault (V04) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-vault-custom — vault (V04) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-island-players — island (V05) × players (V08) at CITY, METROPOLIS
* C-shade-dossier — shade (V05) × dossier (V08) at CITY, METROPOLIS
* C-shade-custom — shade (V05) × custom (V08) at CITY, METROPOLIS
* C-shade-players — shade (V05) × players (V08) at CITY, METROPOLIS
* C-skyaccess-dossier — skyaccess (V05) × dossier (V08) at CITY, METROPOLIS
* C-skyaccess-players — skyaccess (V05) × players (V08) at CITY, METROPOLIS
* C-landfall-custom — landfall (V05) × custom (V08) at CITY, METROPOLIS
* C-landfall-players — landfall (V05) × players (V08) at CITY, METROPOLIS
* C-history-players — history (V06) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-dossier-light — dossier (V08) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-custom-edit — custom (V08) × edit (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-custom-undo — custom (V08) × undo (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-custom-saveload — custom (V08) × saveload (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-custom-light — custom (V08) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS

### V09

* C-steep-tools — steep (pipeline) × tools (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-layers — steep (pipeline) × layers (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-moat-tools — moat (pipeline) × tools (V09) at TOWN, CITY, METROPOLIS
* C-bridge-layers — bridge (pipeline) × layers (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-tools — oasis (pipeline) × tools (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-layers — oasis (pipeline) × layers (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-tools — frame (kernel) × tools (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-layers — frame (kernel) × layers (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-hood-layers — hood (V01) × layers (V09) at TOWN, CITY, METROPOLIS
* C-terraced-ward-tools — terraced-ward (V01) × tools (V09) at TOWN, CITY, METROPOLIS
* C-terraced-ward-layers — terraced-ward (V01) × layers (V09) at TOWN, CITY, METROPOLIS
* C-composed-layers — composed (V02) × layers (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-crypt-tools — crypt (V02) × tools (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-crypt-layers — crypt (V02) × layers (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-plan-layers — plan (V03) × layers (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-shade-tools — shade (V05) × tools (V09) at CITY, METROPOLIS
* C-shade-layers — shade (V05) × layers (V09) at CITY, METROPOLIS
* C-skyaccess-layers — skyaccess (V05) × layers (V09) at CITY, METROPOLIS
* C-landfall-tools — landfall (V05) × tools (V09) at CITY, METROPOLIS
* C-landfall-layers — landfall (V05) × layers (V09) at CITY, METROPOLIS
* C-history-tools — history (V06) × tools (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-history-layers — history (V06) × layers (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-dossier-tools — dossier (V08) × tools (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-custom-tools — custom (V08) × tools (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-custom-layers — custom (V08) × layers (V09) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS

### V10

* C-steep-clerk — steep (pipeline) × clerk (V10) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-moat-clerk — moat (pipeline) × clerk (V10) at TOWN, CITY, METROPOLIS
* C-square-clerk — square (pipeline) × clerk (V10) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-clerk — frame (kernel) × clerk (V10) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-sewer-clerk — sewer (V04) × clerk (V10) at TOWN, CITY, METROPOLIS
* C-access-clerk — access (V04) × clerk (V10) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-vault-clerk — vault (V04) × clerk (V10) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-custom-clerk — custom (V08) × clerk (V10) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS

### V11

* C-cliff-tables — cliff (pipeline) × tables (V11) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-tables — steep (pipeline) × tables (V11) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-moat-tables — moat (pipeline) × tables (V11) at TOWN, CITY, METROPOLIS
* C-bridge-tables — bridge (pipeline) × tables (V11) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-raised-tables — raised (model) × tables (V11) at TOWN, CITY, METROPOLIS
* C-retaining-tables — retaining (model) × tables (V11) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-tables — deckplot (model) × tables (V11) at VILLAGE, TOWN, CITY, METROPOLIS
* C-hinterland-tables — hinterland (pipeline) × tables (V11) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-tables — frame (kernel) × tables (V11) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-hood-tables — hood (V01) × tables (V11) at TOWN, CITY, METROPOLIS
* C-terraced-ward-tables — terraced-ward (V01) × tables (V11) at TOWN, CITY, METROPOLIS
* C-composed-tables — composed (V02) × tables (V11) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-plan-tables — plan (V03) × tables (V11) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-sewer-tables — sewer (V04) × tables (V11) at TOWN, CITY, METROPOLIS
* C-catacomb-tables — catacomb (V04) × tables (V11) at TOWN, CITY, METROPOLIS
* C-undercity-tables — undercity (V04) × tables (V11) at TOWN, CITY, METROPOLIS
* C-void-tables — void (V04) × tables (V11) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-access-tables — access (V04) × tables (V11) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-vault-tables — vault (V04) × tables (V11) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-shade-tables — shade (V05) × tables (V11) at CITY, METROPOLIS
* C-dossier-tables — dossier (V08) × tables (V11) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS

### V12

* C-cliff-presets — cliff (pipeline) × presets (V12) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-presets — steep (pipeline) × presets (V12) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-river-presets — river (pipeline) × presets (V12) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-presets — coast (pipeline) × presets (V12) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-harbour-presets — harbour (pipeline) × presets (V12) at TOWN, CITY, METROPOLIS
* C-moat-presets — moat (pipeline) × presets (V12) at TOWN, CITY, METROPOLIS
* C-bridge-presets — bridge (pipeline) × presets (V12) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-retaining-presets — retaining (model) × presets (V12) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-presets — oasis (pipeline) × presets (V12) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-presets — frame (kernel) × presets (V12) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-terraced-ward-presets — terraced-ward (V01) × presets (V12) at TOWN, CITY, METROPOLIS
* C-crypt-presets — crypt (V02) × presets (V12) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-catacomb-presets — catacomb (V04) × presets (V12) at TOWN, CITY, METROPOLIS
* C-vault-presets — vault (V04) × presets (V12) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-shade-presets — shade (V05) × presets (V12) at CITY, METROPOLIS
* C-landfall-presets — landfall (V05) × presets (V12) at CITY, METROPOLIS
* C-history-presets — history (V06) × presets (V12) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS

