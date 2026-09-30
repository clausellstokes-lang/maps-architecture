# Canon — one canonical home for every fact of `docs/ARCHITECTURE.md`

> Fable-reviewed 2026-09-26: CORRECTED — docs/validation/consistency/validate.md

Status: COMPLETE (2026-09-26). Inputs: the six inventories `inventory-{model,kernel,pipeline,determinism,rendering,scope}.json` and their conflict lists, `docs/validation/fix-all/still-open-r5.json`, and `docs/ARCHITECTURE.md` itself wherever a conflict needed the text. Machine-readable twin: `canon.json` (query it with python; keys `facts`, `conflicts`, `gaps_and_rulings`, `open_item_routing`, `judgment_index`, `section_restatements`, `parts`, `by_inventory_id`, `home_rules`, `counts`).

## What this is and how to use it

* **A fact** is one normative item of the design, merged across the six inventories. Its **id is the inventory id of the statement at its canonical home** (stable; nothing is renumbered). `canon.json → by_inventory_id` maps **every one of the 3294 inventory ids** to its fact (or, for a summary line, to the section it restates) and says whether that id is the home statement, a restatement to replace by a pointer, a passage that moves to the rationale file, or history to drop.
* **Each rewriter** reads its own part section below: **STATE** (the facts whose home is in your part — state each once, with its value), **MOVE IN** (facts another part states today that you must now state), **REFERENCE** (your inventory ids that restate a fact homed elsewhere — replace by "see §x.y"), **RATIONALE OUT** (inline "chose … because" passages that leave for `docs/ARCHITECTURE-RATIONALE.md`, leaving "(J-x)"), **HISTORY OUT**, the **conflicts** you must resolve and the **open items routed** to text you hold.
* **Conflicts** keep the inventories' ids; the canon added `CANON-Cnn`. Where the canonical home was the stale statement the verdict says so and cites the ruling.
* **Open items**: `workflows/08-consistency.js` gives each round-5 item to its owning part, but several items change text another part holds (for example NP5-4 and VK5-2 change §2, which only the model rewriter writes). The **routing table** says which part edits which text; the model rewriter applies the routed §2 edits although it owns no item.

## Numbers

| measure | count |
|---|---|
| inventory records merged | 3294 |
| distinct facts | 2771 |
| — stated at their home in the normative text | 2452 |
| — moved into their home part (MOVE IN) | 14 |
| — judgment calls (home: the rationale file, index row kept) | 269 |
| — inline rationale without a J-id (new J-id assigned here) | 6 |
| — history / evidence narration to drop (validation record keeps it) | 30 |
| facts stated in more than one place (the inventories' restated-at lists included) | 1610 |
| facts stated in more than one part | 409 |
| summary / section restatements (no fact of their own; point to a section) | 49 |
| conflicts (after merging duplicates) | 72 |
| conflict ids covered (inventory ids incl. duplicates + CANON ids) | 84 |
| gaps and rulings this pass may not make | 3 |
| still-open round-5 items routed | 20 |
| facts whose restatements carry a number the home lacks (detail_gaps) | 64 |

## Home rules (how each canonical home was chosen)

The inventories proposed a home for every item; the canon kept those proposals except where two parts claimed one fact or the text itself already points one way. The rules applied:

* **R1 record types.** §2 owns record types, schemas and the plat's data rules (levels, roles, references, knot profiles, the wing and composition carry, identity parts, the document and snapshot text of §2.9). A type the document declares once in its mechanism section stays there: KernelResult/KernelTx/KernelError (§3), the display-list tables (§8.1), LayerSpec (§8.4), LabelEntity/QuarterNode (§9.1), edit events (§7.1), API types (§11.2), StageDecl (§4.12), Seam/SeamContract (II.1).
* **R2 kernel.** §3 owns geometry, numeric policy (the lattice values live in §3.2 (2); §2.2 LatticeSpec names the fields), transactions, indexes, kernel operations and kernel invariants.
* **R3 stages.** §4 owns stage behaviour, stage algorithms and stage parameters, including the mechanism a §12.4 budget assumes; §10 content; PART II stage-2 interfaces; PART III village hooks and the village ladder rows.
* **R4 failure.** §5.2 owns each failure class row — detection, rung order and its test column; a stage section states how a rung is computed. §5.3 owns each invariant's check row (scope, timing); the rule it checks lives at its domain section (kernel invariants in §3.10). §5.4 the report. Exception kept from the document: the F-LABEL rungs live in §9.4 (its heading names the ladder).
* **R5 determinism.** §6 owns streams, keys, salts, the concern registry, digests (model and records trees), identity, versions, permalinks, retention and the determinism tests of §6.5 (its heading names them; §13.2 schedules them).
* **R6 editing.** §7 owns edit events, named actions, locks and pins, locality and effective scope (the seam exception included), operators, the lifecycle table, migration, overrides, intent and controls, and the locality oracle of §7.3 item 7.
* **R7 rendering.** §8 rendering and styles, §9 labels and furniture (the title is furniture, §9.5), §11 formats, API and host bridge (logHead and bridged load verification are §11.3's).
* **R8 budgets.** §12 owns every performance budget it states and its measured law; a budget stated only at its subject section with its own measurement and fallback stays there and §12 points to it where it already does (§6.3 matching, §7.4 undo, §7.8 proxies, §2.9 document size and open-to-editable, §6.4 retention size). §12.4 keeps work counts, times and p50; the mechanism is §4's.
* **R9 tests.** §13 owns every test, fixture and acceptance bar it states and every test a surveyor assigned to it; a test stated both in §13 and elsewhere lives in §13, except where the other section's heading names it (§5.2 test column, §5.3 CI-only rows, §6.5 determinism tests, §7.3 item 7 oracle, §8.3 census, §13.7's thresholds are §13's). Kernel tests stated only in §3 move to §13.1.
* **R10 matrices, plan, legal.** §15 maps each row to its home and states no number of its own except a bar that exists nowhere else; §16 places work in milestones and points to the criteria's homes; §17 owns licences and the clean-room chain; D-rows stay in the main document (one short paragraph each, pointing to the home); J-rows move verbatim to docs/ARCHITECTURE-RATIONALE.md with a one-line index row left in the main document.
* **R11 summaries, history, evidence.** The one-page summary and each part's plain-words intro may paraphrase but carry only canonical figures; history and round narration leave the normative text (the validation record keeps them); an executed-evidence citation stays as a one-line receipt pointer beside the fact it supports.
* **R12 interfaces.** An interface lives in the section whose subject it is; a second code copy (§14's copies of TileRasterOpts, LabelPlacer, RasterJob, StageDecl fields) becomes a pointer. §14 keeps the package map, dependency rules, extension points and the interfaces it alone declares (Rng.stream, StreamOpts, Kernel façade, EditEngine, Exporter, ContentProvider, ObstacleSource, RoleIndex).
* **R13 union on merge.** When a restatement carries a detail its home lacks (a qualifier, a number, a case), the home's editor adds it to the home statement: this is the union of existing statements, not a new fact. canon.json lists the numeric ones per fact under detail_gaps (a heuristic: numbers only; a verifier checks meaning).

## Conflicts — the same fact stated two ways

Each entry: the statements, the canonical statement, the verdict (the canonical home wins unless it is the stale one — then the ruling is cited), and the edit each part makes. Confidence: CONFIRMED = the texts disagree as written; PLAUSIBLE = a reading.

### MODEL-C01 — When a split vertex loses its split flag under a move

*minor · CONFIRMED*

* **A.** §2.2 Plat.vertices.flags comment: cleared "by a move that takes it off that edge's route or — for a vertex of that route's own level — moves the vertex beside it on that route"
* **B.** §2.2 rule 3 (b)/(b′) and §3.6 (split flag under moves, J-K26 amended VK4-3): cleared by any move (warp or smoothing) that displaces the vertex, except a Steiner vertex re-seated onto its coarser edge's route and a vertex sliding along a fixed route; (b′) the neighbour-move clause
* **Canonical:** §3.6 split flag under moves (fact KERNEL-287), with the wording of rule 3 (b)/(b′).
* **Verdict:** canonical home wins; the flags comment is the stale wording (VK4-3 amended J-K26/J-K28 to the displacement rule).
* **Resolution:** State the move rule once in §3.6 in the rule-3 (b)/(b′) wording; §2.2's flags comment and rule 3 (b) name the flag and point to §3.6 for clearing under moves (rule 3 keeps the demotion/dissolution cases, which are §2.2's).
* **Edits:** **kernel** — §3.6: state the clearing-under-moves rule once, (b) and (b′) included; **model** — §2.2 flags comment, rule 3 (b)/(b′): replace the move wording by a pointer to §3.6; VK5-2's wording change to rule 3 (b) applies here too.
* **Facts:** KERNEL-287, MODEL-021; inventory items MODEL-074, MODEL-021, KERNEL-287.

### MODEL-C02 — The convex near-rectangle test

*minor · CONFIRMED*

* **A.** §2.6 "Row footprints are quads": four OBB corners matched by footprint vertices within 30 cm, area ≥ 0.97 of its OBB (no convexity clause)
* **B.** §2.6 wing rule 3 and §3.8: convex (every turn non-negative by exact orient2d), four OBB corners matched within 30 cm, area ≥ 0.97 of its OBB
* **Canonical:** §3.8 convex near-rectangle exact path (fact KERNEL-335).
* **Verdict:** canonical home wins.
* **Resolution:** §2.6 references §3.8's test in both places and restates none of its terms.
* **Edits:** **model** — §2.6 row footprints; wing rule 3: replace both copies of the test by "§3.8's convex near-rectangle test"; **kernel** — §3.8: no change (canonical).
* **Facts:** KERNEL-335, MODEL-252; inventory items MODEL-243, MODEL-252, KERNEL-335.

### MODEL-C03 — Two interfaces named Tower in @plat/model

*minor · CONFIRMED · open item **NP5-4***

* **A.** §2.6: interface Tower { centre: Point; radiusCm; heights; roof } — a stage-3 composition tower
* **B.** §2.7: interface Tower { id; enceinte; vertex: VertexRef; radiusCm; heights; kind; footprint } — a wall tower entity
* **Canonical:** §2.7 Tower (the wall-tower entity keeps the name).
* **Verdict:** both are live declarations; open item NP5-4 rules the rename.
* **Resolution:** Rename the composition's tower to ComposedTower in §2.6 (and in any copy, e.g. §14); "tower centre" in the composition carry then names exactly one type (NP5-4).
* **Edits:** **model** — §2.6 Composition types and carry text: rename to ComposedTower (NP5-4); **scope** — §14: if §14 copies the composition types, rename there too (or point to §2.6).
* **Facts:** MODEL-228, MODEL-285; inventory items MODEL-228, MODEL-285.

### MODEL-C04 — Castle surround values

*minor · CONFIRMED*

* **A.** §2.7 Castle.surround: 'none'|'esplanade'|'park'|'plaza'|'cliff'
* **B.** §2.7 Castles bullet: "a surround row (esplanade, park with a perimeter path, plaza, cliff skirt, moat)"
* **Canonical:** §2.7 Castle type (fact MODEL-286).
* **Verdict:** canonical home wins.
* **Resolution:** The prose names the type's values and says the moat is the separate Castle.moat field; no value is added or dropped.
* **Edits:** **model** — §2.7 Castles bullet: align the prose with Castle.surround; moat via Castle.moat.
* **Facts:** MODEL-286, PIPELINE-291; inventory items MODEL-286, MODEL-311.

### MODEL-C05 — Which entities carry a derivation record

*minor · CONFIRMED*

* **A.** §2.5: "DerivationRecord is the per-plot memory…"; only Plot declares derivedFrom
* **B.** §2.8 (the one definition) and §7.3 (5): persisted with plots, blocks and buildings (the kinds whose stage declares it); §2.8 intro: the derivation record is an entity part "persisted for kinds whose stage declares one"
* **C.** §2.9 step 4: "A rebase fills in … the derivation record of any entity that lacks one"
* **Canonical:** §2.8 Derivation records (fact MODEL-342): plots, blocks and buildings — the kinds whose stage declares one.
* **Verdict:** canonical home wins.
* **Resolution:** §2.5 says "a plot's, block's or building's memory (§2.8)"; §2.9 step 4 says "every entity of a kind that declares one (§2.8)". No type field is added: §2.8's entity-record part carries the record for the declaring kinds.
* **Edits:** **model** — §2.5 DerivationRecord prose; §2.9 load step 4: point to §2.8 and use its scope.
* **Facts:** MODEL-214, MODEL-329, MODEL-342, MODEL-406; inventory items MODEL-329, MODEL-342, MODEL-406, MODEL-214, DETERMINISM-458.

### MODEL-C06 — Where "which people a user has opened" lives

*minor · CONFIRMED*

* **A.** §2.7: per-user view state outside the document
* **B.** §2.9 View state: it lives in view (a Document field), outside every digest; the ViewState comment's key list omits it
* **Canonical:** §2.9 View state (fact MODEL-428).
* **Verdict:** canonical home wins.
* **Resolution:** §2.7 says "per-user view state (§2.9), outside every digest"; the ViewState comment's key list names the key.
* **Edits:** **model** — §2.7 people paragraph; §2.9 ViewState comment: align as stated.
* **Facts:** MODEL-306, MODEL-365, MODEL-428; inventory items MODEL-306, MODEL-428, MODEL-365.

### MODEL-C07 — Where positions may be stored

*minor · CONFIRMED*

* **A.** §2.2 LatticePoint comment and §2.4: never in an entity record; "only log events carry positions"
* **B.** §2.2 rule 5 and §2.6: wing rings, a stored composition's rings and tower centres store world lattice points; WaterBody.controls, Pin.point, Decoration.point, Greenery.overrides store non-vertex points
* **Canonical:** §2.2 rule 5 (fact MODEL-091): no record stores an arena slot; vertex positions only in log events, view state, label placements and a StretchRef's ends, except the wing rings and a stored composition's geometry; non-vertex points are ordinary attributes.
* **Verdict:** canonical home wins.
* **Resolution:** The LatticePoint comment and §2.4 point to rule 5 and distinguish vertex positions from non-vertex points.
* **Edits:** **model** — §2.2 LatticePoint comment; §2.4 prose: point to rule 5 with its exception.
* **Facts:** MODEL-041, MODEL-091, MODEL-183; inventory items MODEL-041, MODEL-183, MODEL-091.

### MODEL-C08 — Duplicate point types

*minor · CONFIRMED*

* **A.** §2.2: type LatticePoint = { x: Cm; y: Cm }
* **B.** §2.8: type PointCm = { x: Cm; y: Cm } (VecCm = PointCm); records also use undeclared Point and Polygon
* **Canonical:** §2.2 types (LatticePoint), with PointCm, Point and Polygon declared once as aliases in §2.8's type list.
* **Verdict:** canonical home wins.
* **Resolution:** Declare the shape once; the other names are aliases (PointCm = LatticePoint; Point = PointCm; Polygon = PolygonCm). No field changes.
* **Edits:** **model** — §2.2 / §2.8 type blocks: declare once, alias the others.
* **Facts:** MODEL-041, MODEL-322; inventory items MODEL-041, MODEL-322.

### MODEL-C09 — "Every load" checks the recorded roots

*minor · CONFIRMED*

* **A.** §2.8 intro, Snapshot.digest and Snapshot.recordsDigest comments: recomputed/checked "at every load"
* **B.** §2.9 load step 2: a frozen view is never checked against its recorded model root; step 1: newer-schema documents open read-only without replay
* **Canonical:** §2.9 load steps (facts MODEL-382, MODEL-383, MODEL-387).
* **Verdict:** canonical home wins.
* **Resolution:** The comments say "at every in-window load (step 3)".
* **Edits:** **model** — §2.8 intro; §2.9 Snapshot comments: say "every in-window load (§2.9 step 3)".
* **Facts:** DETERMINISM-192, MODEL-363, MODEL-383; inventory items MODEL-321, MODEL-363, MODEL-383.

### MODEL-C10 — Unit-suffix and angle conventions vs the schema

*minor · CONFIRMED (the lint as written refuses the schema); the reading of RoofSpec.pitch is PLAUSIBLE*

* **A.** §2.1: a schema lint refuses any length field without a unit suffix (…Cm, …M); angles, where stored, are i32 centidegrees
* **B.** §2.3–§2.6 fields without a suffix: Way.width (Cm | ChainProfile), WaterBody.widthProfile, ContextVector.shape.obbW/obbD and dist.{…}; ContextVector.aspect, RoofSpec.pitch
* **Canonical:** §2.1 Units (fact MODEL-006).
* **Verdict:** canonical rule wins; the schema fields carry their units in their types instead of their names.
* **Resolution:** State in §2.1 that a length field carries its unit either as a suffix (…Cm, …M) or as a unit-branded type (Cm, M, ChainProfile of Cm), and give the listed fields their branded unit types (ContextVector distances M, aspect Cdeg); RoofSpec.pitch is a ratio (not an angle) unless §2.6 says otherwise. No field is renamed, no value changes.
* **Edits:** **model** — §2.1 lint sentence; the listed field declarations: as stated.
* **Facts:** MODEL-005, MODEL-006; inventory items MODEL-006, MODEL-005, DETERMINISM-104.

### MODEL-C11 — Which operators place deck bank vertices by a preparation batch

*minor · CONFIRMED*

* **A.** §2.2 rule 7 (deck): a carve's or S1's water operator's preparation batch places them on a kept way
* **B.** §2.2 rule 3 (c): L1 deck_end rows from a carve's, an outer moat's or a water edit's preparation batch; §2.7 Bridges and §4.2 S1 (5): a carve's kept way, an outer moat's arterial (§4.4, by §4.11's carve path), a kept way of S1's water operator, and a deck F-ROUTE's extra-bridge rung sites inside one of these
* **Canonical:** §4.2 S1 (5) (who places a deck before its water exists; fact PIPELINE-083).
* **Verdict:** canonical home wins.
* **Resolution:** §2.2 rule 7 defines the deck role only and points to §4.2 S1 (5); §2.2 rule 3 (c) and §2.7 Bridges point there too; the outer moat is covered as a carve (§4.4, §4.11).
* **Edits:** **model** — §2.2 rule 7; rule 3 (c); §2.7 Bridges: role definition + pointer; **pipeline** — §4.2 S1 (5): canonical list (carve, outer moat as a carve, S1's water operator, F-ROUTE's rung inside them).
* **Facts:** MODEL-080, MODEL-120, PIPELINE-083; inventory items MODEL-120, MODEL-313, MODEL-080, PIPELINE-083.

### MODEL-C12 — What the document file holds besides base and log

*minor · CONFIRMED*

* **A.** §2.9 intro: everything else is input recorded for replay, a verified cache, or per-user state
* **B.** §2.9 Document.style: canonical style state (sheet id@version, style row operations, ground-cover regions), outside the model digest
* **Canonical:** §2.9 Document (fact MODEL-356).
* **Verdict:** canonical home wins.
* **Resolution:** Add "the canonical style state" to the intro's list (no new field; the intro becomes true to Document).
* **Edits:** **model** — §2.9 intro sentence: as stated.
* **Facts:** MODEL-355, MODEL-356; inventory items MODEL-355, MODEL-356.

### KERNEL-C01 (same as SCOPE-C05) — Whether Clipper2 ever ships

*minor · CONFIRMED*

* **A.** §3.1: Clipper2 and polygon-clipping are CI oracles in @plat/testkit only, "never shipped"; §3.7: "no product bundle ever loads either"; §1.7 numeric-core row and D-14: "CI oracles only"
* **B.** §3.7: if M0 (ii) fails after one optimisation pass the shipped engine becomes Clipper2-WASM as the only engine on every host; J-K4 "the pre-decided fallback"; §16, §17.4, D-14 (closing clause), J-DET-28 name the shipping fallback
* **Canonical:** §3.7 (facts KERNEL-312, KERNEL-320): the oracles never ship unless §3.7's M0 speed fallback fires, in which case Clipper2-WASM becomes the single shipped engine (a declared golden shift, J-DET-28).
* **Verdict:** canonical home wins.
* **Resolution:** State both halves once in §3.7. §3.1, §1.7, §14, §16, §17.4 and D-14 point to §3.7 and restate neither half.
* **Edits:** **kernel** — §3.1 build-vs-adopt row; §3.7: one statement in §3.7; §3.1 points; **scope** — §1.7, §14 @plat/testkit, §16 riskiest items, §17.4, D-14: point to §3.7; **determinism** — §6.5 (10): point to §3.7 for the fallback (DETERMINISM-303 is a restatement).
* **Facts:** KERNEL-026, KERNEL-312, KERNEL-320, SCOPE-110, SCOPE-363, SCOPE-475, SCOPE-507, SCOPE-523, SCOPE-581; inventory items KERNEL-026, KERNEL-312, KERNEL-320, KERNEL-325, SCOPE-110, SCOPE-363, SCOPE-475, SCOPE-507, SCOPE-523.

### KERNEL-C02 — What W_PLACED means

*minor · CONFIRMED*

* **A.** §3.1: a new, re-seated or sliding vertex placed away from its nearest lattice point by the placement rule
* **B.** §3.6: reported when no placement candidate qualifies and the incoming vertex moves onto the nearer endpoint
* **Canonical:** §3.6 placement rule, one definition covering both events.
* **Verdict:** canonical home wins.
* **Resolution:** Define W_PLACED once in §3.6 covering both events (non-nearest placement, endpoint fallback); §3.1's warning list points to §3.6.
* **Edits:** **kernel** — §3.1 Warning list; §3.6: as stated.
* **Facts:** KERNEL-062, KERNEL-258, KERNEL-313; inventory items KERNEL-062, KERNEL-258, KERNEL-313.

### KERNEL-C03 — The triggers of E_BELOW_MIN_EDGE

*minor · CONFIRMED*

* **A.** §3.1 and §3.6: an optional chain that collapses below one edge after decimation
* **B.** §3.6: an optional chain that wedge routing would move more than attractCm is rejected with E_BELOW_MIN_EDGE
* **Canonical:** §3.6 (both triggers).
* **Verdict:** canonical home wins.
* **Resolution:** Define the code once in §3.6 with both triggers; §3.1's comment points there.
* **Edits:** **kernel** — §3.1 KernelError comment; §3.6: as stated.
* **Facts:** KERNEL-061, KERNEL-253, KERNEL-264; inventory items KERNEL-061, KERNEL-253, KERNEL-264.

### KERNEL-C04 — Which errors remain for mandatory chains

*minor · PLAUSIBLE (depends on whether the list was meant as exhaustive)*

* **A.** §3.6: for mandatory chains "the only errors left are E_OUT_OF_RANGE, E_LEVEL, E_KEPT and E_LOCKED"
* **B.** §3.1 applies E_SELF_INTERSECT to a drawn boundary; E_SCOPE and E_WORK_LIMIT can also reach a mandatory chain
* **Canonical:** §3.1 error codes; §3.6 chain classes.
* **Verdict:** canonical homes win; the §3.6 list read as exhaustive is the stale wording.
* **Resolution:** §3.6 says no precision error is left for a mandatory chain and refers to §3.1 for the non-precision codes.
* **Edits:** **kernel** — §3.6: as stated.
* **Facts:** KERNEL-061, KERNEL-263; inventory items KERNEL-263, KERNEL-061.

### KERNEL-C05 — Who reads straight-skeleton output

*minor · CONFIRMED*

* **A.** §3.1: roofs and label spines; §3.8 fallback: "nothing else changes, because nothing else reads skeleton output"
* **B.** §3.4 and §3.8: per-frontage regions of a block (§4.7 S10); §5.2 F-PLOT: reflex pre-cut partition when the block's skeleton downgrades
* **Canonical:** §3.8: one consumer list — roofs, label spines, S10's per-frontage regions.
* **Verdict:** canonical home wins.
* **Resolution:** One consumer list in §3.8; the M0 fallback sentence names each consumer's downgrade (plain roof, sampled medial axis, reflex pre-cut partition). §3.1 points.
* **Edits:** **kernel** — §3.1; §3.4; §3.8: as stated.
* **Facts:** KERNEL-031, KERNEL-212, KERNEL-331, KERNEL-340, KERNEL-345; inventory items KERNEL-031, KERNEL-212, KERNEL-331, KERNEL-340, KERNEL-345.

### KERNEL-C06 — Static index partitions at L2–L4

*minor · CONFIRMED*

* **A.** §3.1 and J-K6: one per district at L2–L4
* **B.** §3.3 and §3.9: one per district plus one for everything outside districts (hinterland, margin)
* **Canonical:** §3.3 partition rule.
* **Verdict:** canonical home wins.
* **Resolution:** §3.1 and the J-K6 row point to §3.3.
* **Edits:** **kernel** — §3.1: point to §3.3; **scope** — J-K6 in the rationale file: point to §3.3 (or add the outside-districts partition).
* **Facts:** KERNEL-048, KERNEL-156, KERNEL-353, SCOPE-583; inventory items KERNEL-048, KERNEL-176, KERNEL-156, KERNEL-353.

### KERNEL-C07 — Whether minFaceAngle is soft or hard

*minor · CONFIRMED*

* **A.** §3.2 (2) and the model's LatticeSpec comment: "the kernel's soft corner floor" / "(soft, §3.10)"
* **B.** §3.10 and §3.6: soft for mandatory chains (W_ACUTE_CORNER), hard for optional chains
* **Canonical:** §3.10 (class by chain class).
* **Verdict:** canonical home wins.
* **Resolution:** §3.2 states the value only and points to §3.10 for its class; the LatticeSpec comment drops "soft".
* **Edits:** **kernel** — §3.2 (2): value only + pointer; **model** — §2.2 LatticeSpec comment: drop "soft"; values by pointer to §3.2 (2).
* **Facts:** KERNEL-076, KERNEL-264, KERNEL-383, MODEL-025; inventory items KERNEL-076, KERNEL-383, KERNEL-264, MODEL-025.

### KERNEL-C08 — What class floors are stated in

*minor · CONFIRMED*

* **A.** §3.10: class floors (minimum width, area and angle per face class) are always stated in width and area, never in minEdge
* **B.** §3.2 (2): lists an angle floor (minInteriorAnglePlot = 12°) among the class floors; face-size floors are a minimum width and a minimum area
* **Canonical:** §3.2 (2).
* **Verdict:** canonical home wins.
* **Resolution:** Say once in §3.2 (2): face-size floors are a width and an area, angle floors are angles, and none is minEdge; §3.10 points.
* **Edits:** **kernel** — §3.2 (2); §3.10: as stated.
* **Facts:** KERNEL-077, KERNEL-079, KERNEL-386; inventory items KERNEL-386, KERNEL-077, KERNEL-079.

### KERNEL-C09 — Which kept finer geometry an op may come near

*minor · PLAUSIBLE*

* **A.** §3.3: only "a finer vertex on a route the chain ends on, which is promoted"
* **B.** §3.6 candidate (b): a finer vertex on a route where the chain ends on or joins such a route, incl. a close-up's kept fabric beside a new junction
* **Canonical:** §3.6 attraction candidates.
* **Verdict:** canonical home wins.
* **Resolution:** §3.3's exception points to §3.6 candidate (b) ("ends on or joins").
* **Edits:** **kernel** — §3.3: as stated.
* **Facts:** KERNEL-105, KERNEL-242; inventory items KERNEL-105, KERNEL-242.

### KERNEL-C10 — Which ridge a passing quad's gable uses

*minor · PLAUSIBLE*

* **A.** §3.8: on the exact OBB path a gable ridge ends where the ridge line meets the footprint boundary
* **B.** §3.8: a quad wing passing the near-rectangle test takes this path and its gable draws the stored ridge (arc-length midpoints of the two side chains its ridgeAxis names; §2.6)
* **Canonical:** §3.8 roof paths, with the ridge line defined by §2.6 ridgeAxis (fact MODEL-221).
* **Verdict:** canonical home wins.
* **Resolution:** State in §3.8 that on the exact path the gable's ridge line is the wing's ridgeAxis line (§2.6: for rect the OBB axis it names; for quad the line between the named arc-length midpoints) and ends where it meets the footprint boundary.
* **Edits:** **kernel** — §3.8: as stated.
* **Facts:** KERNEL-335, KERNEL-337, KERNEL-339, MODEL-221; inventory items KERNEL-337, KERNEL-339, MODEL-221, MODEL-243.

### KERNEL-C11 — The attraction constant's name

*minor · CONFIRMED*

* **A.** §3.2 (2): `attract = 26 cm`
* **B.** every other place: `attractCm`
* **Canonical:** attractCm (§3.2 (2) value; §2.2 LatticeSpec field).
* **Verdict:** canonical home wins.
* **Resolution:** Use attractCm everywhere.
* **Edits:** **kernel** — §3.2 (2): rename in text.
* **Facts:** KERNEL-005, KERNEL-073; inventory items KERNEL-073, KERNEL-005.

### KERNEL-C12 — When static partitions are rebuilt

*minor · CONFIRMED*

* **A.** §3.1, §3.3 and J-K6: rebuilt only at stage end
* **B.** §3.3 pool step 1: also on editing-session grid overflow (max(256, ¼ static size)) and at every freeze
* **Canonical:** §3.3 (three triggers).
* **Verdict:** canonical home wins.
* **Resolution:** Drop "only"; list the three triggers once in §3.3; §3.1, J-K6 and §4.1 point.
* **Edits:** **kernel** — §3.1; §3.3: as stated; **pipeline** — §4.1: point to §3.3 (PIPELINE-041 is a restatement); **scope** — J-K6: point to §3.3.
* **Facts:** KERNEL-048, KERNEL-138, KERNEL-170, SCOPE-583; inventory items KERNEL-048, KERNEL-170, KERNEL-176, KERNEL-138, PIPELINE-041.

### KERNEL-C13 — What Delaunay / Voronoi is used for

*minor · CONFIRMED*

* **A.** §3.1: used only for the routing lattice, site sampling, Lloyd relaxation, field seeds, medial axes
* **B.** §3.4: hexLattice builds S4's routing lattice; §12.4: the S4 lattice uses no Poisson-disc, no Lloyd, no Delaunay; §17.4: delaunator for site sampling and medial axes
* **Canonical:** §3.4 hexLattice.
* **Verdict:** canonical home wins.
* **Resolution:** Remove "the routing lattice" from §3.1's Delaunay row.
* **Edits:** **kernel** — §3.1: as stated.
* **Facts:** KERNEL-036, KERNEL-214; inventory items KERNEL-036, KERNEL-214.

### CF-PIPE-01 — Which large claims S3 reserves

*minor · CONFIRMED*

* **A.** §4.1 order rationale: castle bailey, main plazas, market, church precincts "and large institutions" are L1 barrier reservations at S3
* **B.** §4.2 S3 (2)/(12) and §4.1's S3 batch row: plazas, precinct, market square, castle bailey; §4.5 S7b (3): every institution larger than a block is an S7b district claim
* **Canonical:** §4.2 S3 (12) for S3's reservations; §4.5 S7b (3) for claims larger than a block.
* **Verdict:** canonical home wins.
* **Resolution:** Drop "and large institutions" from §4.1's order rationale (or say "large institutions are S7b claims") and make it a pointer.
* **Edits:** **pipeline** — §4.1 order rationale: as stated.
* **Facts:** PIPELINE-010, PIPELINE-132; inventory items PIPELINE-010, PIPELINE-132.

### CF-PIPE-02 — The Stage declaration's field list

*minor · CONFIRMED*

* **A.** §4.1 prose list {inputs, outputs, streamKeys, invariants, ladder, work-limit laws, budgetMs per rung, batch scope, lineageUnit, op form}
* **B.** §4.12 StageDecl (also id and lazy; names workLimits, batch, txForm)
* **Canonical:** §4.12 StageDecl (§14's Stage extends it).
* **Verdict:** canonical home wins.
* **Resolution:** Replace §4.1's prose list with "each stage registers a StageDecl (§4.12)"; keep the op-form table.
* **Edits:** **pipeline** — §4.1: as stated; **scope** — §14 Stage<I, O>: keeps only its extra fields and points to §4.12.
* **Facts:** PIPELINE-003, PIPELINE-357, SCOPE-369; inventory items PIPELINE-003, PIPELINE-357, SCOPE-369.

### CF-PIPE-03 — The level of a row's party walls

*minor · CONFIRMED · open item **NP5-1***

* **A.** §4.1 S11 batch row: a row's party walls are "one shared L4 edge"
* **B.** §4.7 S10 and S11: the party wall is the plot's shared L3 side line carrying the party_wall role
* **Canonical:** §4.7 S10 party-wall rule (fact PIPELINE-267).
* **Verdict:** canonical home wins.
* **Resolution:** Correct §4.1's S11 row: the party wall is the plot's shared L3 side line carrying the party_wall rows (§4.7) — NP5-1's companion correction.
* **Edits:** **pipeline** — §4.1 S11 row: as stated.
* **Facts:** PIPELINE-035, PIPELINE-267; inventory items PIPELINE-035, PIPELINE-267.

### CF-PIPE-04 — What placement does when capacity is short

*minor · CONFIRMED*

* **A.** §4.7 S10b: placement "never gives up" (one more JOIN, demotion within a band, surplus typed)
* **B.** §10.2: the loop "trims the lowest-priority classes where capacity is short"
* **C.** §5.2 F-SITING: JOIN at block granularity → a whole block → the district edge → reduce the manifest and report unplaced
* **Canonical:** §5.2 F-SITING ladder (fact DETERMINISM-056) with §4.7 S10b as the stage.
* **Verdict:** canonical home wins.
* **Resolution:** §4.7 S10b and §10.2 point to the F-SITING ladder and use one wording: "never gives up" means never silently; the last rung reduces the manifest and reports unplaced.
* **Edits:** **pipeline** — §4.7 S10b; §10.2: as stated; **determinism** — §5.2 F-SITING: canonical, no change.
* **Facts:** DETERMINISM-056, PIPELINE-273, PIPELINE-375; inventory items PIPELINE-273, PIPELINE-375, DETERMINISM-056.

### CF-PIPE-05 — When a name is drawn

*minor · CONFIRMED*

* **A.** §4.1 and §4.10: only for an entity without a predecessor or on a reroll
* **B.** §10.4 and §6.3: four cases (adds an unedited name whose naming inputs changed, VD3-2)
* **Canonical:** §6.3 draw cases (fact DETERMINISM-224).
* **Verdict:** canonical home wins.
* **Resolution:** Replace the case lists in §4.1, §4.10 and §10.4 with "drawn only in §6.3's cases".
* **Edits:** **pipeline** — §4.1; §4.10; §10.4: as stated.
* **Facts:** DETERMINISM-224, PIPELINE-324; inventory items PIPELINE-018, PIPELINE-324, PIPELINE-393, DETERMINISM-224.

### CF-PIPE-06 — How long a non-shipped pack's content stays in the file

*minor · CONFIRMED · open item **VD5-6***

* **A.** §10.4: a user corpus "while the first [adjust] names it"; every pack "while any event of the log names it"; §7.4 truncation and §7.6 restate
* **B.** §2.9 pack retention: while the base recipe, any log event, or a truncated event held on a saved redo stack names it (VD4-7)
* **Canonical:** §2.9 pack retention (fact MODEL-374).
* **Verdict:** canonical home wins (VD5-6 ruling in docs/validation/fix-all/still-open-r5.json).
* **Resolution:** Replace both §10.4 sentences by a pointer to §2.9's pack set and retention; §7.4 and §7.6 point too.
* **Edits:** **pipeline** — §10.4: pointer (VD5-6); **determinism** — §7.4 truncation; §7.6: pointer to §2.9.
* **Facts:** MODEL-374, PIPELINE-399; inventory items PIPELINE-397, PIPELINE-399, DETERMINISM-508, DETERMINISM-549, MODEL-374.

### CF-PIPE-07 (same as SCOPE-C08) — The "area" template

*minor · CONFIRMED · open item **VS5-2***

* **A.** PART II intro and II.2 and §13.6 (2): area is one of NG's four templates PLAT registers as a fabric
* **B.** II.1 FabricStrategyId: bent-cut (refine) | ring | square | street (replace); §4.5: a district's fabric is bent-cut unless a template is requested
* **Canonical:** II.1 FabricStrategyId (fact PIPELINE-403 family).
* **Verdict:** canonical home wins (VS5-2 ruling).
* **Resolution:** State in II.2 that the area template is the base's bent-cut fabric (FabricStrategyId bent-cut), the default; §13.6 (2) opens area as a refine close-up (VS5-2).
* **Edits:** **pipeline** — II.2: add the area = bent-cut sentence; **scope** — §13.6 (2); D5Pair NG comment; J-S34: VS5-2 wording.
* **Facts:** PIPELINE-402, PIPELINE-406, PIPELINE-428, SCOPE-299, SCOPE-300, SCOPE-313, SCOPE-392, SCOPE-406, SCOPE-469, SCOPE-800; inventory items PIPELINE-402, PIPELINE-406, PIPELINE-428, SCOPE-299, SCOPE-300, SCOPE-313, SCOPE-800, SCOPE-392, SCOPE-469, SCOPE-406.

### CF-PIPE-08 — Stage-2 feature ids collide with pipeline stage ids

*minor · CONFIRMED*

* **A.** II.1–II.4 use IMPROVEMENTS' stage-2 feature ids S1, S2, S4, S5, S6 ("S1 acceptance", "(S2 context features)", "Templates chosen by context (S4)", "(S5, S6)")
* **B.** §4.1: S0–S15 are pipeline stages
* **Canonical:** §4.1 stage ids.
* **Verdict:** canonical home wins.
* **Resolution:** Spell the feature references as "stage-2 feature S1" etc. (or name them) so S<n> means only a pipeline stage.
* **Edits:** **pipeline** — II.1–II.4 headings and text: as stated.
* **Facts:** PIPELINE-417; inventory items PIPELINE-417.

### CF-PIPE-09 — Which outline templates a sky island may use

*minor · CONFIRMED*

* **A.** §4.2 S1 (2) and II.1 rule (5): disc, D-shape, lozenge, crescent and spindle for standalone and sky outlines
* **B.** II.6: a SkyIsland has "the disc or lozenge outline template"
* **Canonical:** §4.2 S1 (2) outline template row.
* **Verdict:** canonical home wins.
* **Resolution:** II.6 points to §4.2 S1 (2) ("an outline template of §4.2 S1 (2)") and drops the narrower list.
* **Edits:** **pipeline** — II.6: as stated.
* **Facts:** PIPELINE-067, PIPELINE-419, PIPELINE-440; inventory items PIPELINE-419, PIPELINE-440, PIPELINE-067.

### CF-PIPE-10 — S5b's L0 writes and failure rungs

*minor · PLAUSIBLE (a design choice made to close the item; the alternative — no extra bridge at S5b — was rejected for the reason given) · open item **NP5-2***

* **A.** §4.4 S5b routes each new primary with the incremental S4 router, whose F-ROUTE extra-bridge rung writes an L0 batch
* **B.** §4.1's L0-writer sentence, §4.1's S5 batch row, §5.2 F-ROUTE's "where" and J-I18 list no L0 batch or ladder for S5b
* **Canonical:** CANON RULING for NP5-2 (option 1 of the item): S5b routes with S4's router and S4's F-ROUTE ladder, extra-bridge rung included.
* **Verdict:** the open item requires the rule decided; this canon decides it so that the four parts edit in parallel coherently (vetoable; Fable-reviewed 2026-09-26 — verdict in docs/validation/consistency/SUMMARY.md).
* **Resolution:** State once: "k ≥ 2 — S5b L0, only when F-ROUTE's extra-bridge rung fires on standing water: two same-level shore splits before S5b's L1 batch". §4.1 S5 row and L0-writer sentence (L0 writers: S1, S3, S4 and S5b — extra bridge only — and S5a), §4.4 S5b pointer, §5.2 F-ROUTE "where" (S4, S5b at stages k ≥ 2 and every epoch, S4's local operator), J-I18's L0 rows. Reason: one router, one ladder; a main road that must cross a river gets a bridge (realism tiebreaker).
* **Edits:** **pipeline** — §4.1 S5 row, L0-writer sentence; §4.4 S5b: as stated; **determinism** — §5.2 F-ROUTE "where": add S5b; **scope** — J-I18 (rationale file): add S5b's extra-bridge batch to the L0 deck_end writers.
* **Facts:** DETERMINISM-045, PIPELINE-028, PIPELINE-029, PIPELINE-038, PIPELINE-169; inventory items PIPELINE-028, PIPELINE-029, PIPELINE-038, PIPELINE-169, DETERMINISM-045.

### DETERMINISM-C-1 (same as C-1) — The lineage key's components

*minor · CONFIRMED*

* **A.** §6.1: entity key mixes seed key, lineage hash, layer and island; lineage component = (layer, island, derivation unit, stage, creation epoch, creation index)
* **B.** §6.3: lineage key = (arena key = layer and part, the derivation unit's lineage hash, stage, creation epoch, creation index, the derivation unit's reroll [, dup])
* **Canonical:** §6.3 lineage key (fact DETERMINISM-210).
* **Verdict:** canonical home wins.
* **Resolution:** §6.1 points to §6.3 (part, not island; the unit's lineage hash; reroll and dup included).
* **Edits:** **determinism** — §6.1: as stated.
* **Facts:** DETERMINISM-138, DETERMINISM-145, DETERMINISM-210; inventory items DETERMINISM-138, DETERMINISM-145, DETERMINISM-210.

### DETERMINISM-C-2 (same as C-2) — How many times New random may advance an unchanged scope entity

*minor · CONFIRMED*

* **A.** §5.1 (6): up to reroll.maxAdvance times (a table value, default 3)
* **B.** §7.1 named actions and J-DET-20: "up to three times" (hard-coded)
* **Canonical:** §5.1 (6) reroll.maxAdvance (fact DETERMINISM-020).
* **Verdict:** canonical home wins.
* **Resolution:** §7.1 and J-DET-20 reference the table value.
* **Edits:** **determinism** — §7.1: point to §5.1 (6); **scope** — J-DET-20 (rationale file): say reroll.maxAdvance (default 3).
* **Facts:** DETERMINISM-020, DETERMINISM-021, DETERMINISM-344, SCOPE-632; inventory items DETERMINISM-020, DETERMINISM-021, DETERMINISM-344, SCOPE-632.

### DETERMINISM-C-3 (same as C-3) — Which deck a kept way is re-routed through

*minor · CONFIRMED*

* **A.** §5.2 F-REDERIVE: the nearest deck within the detour bound, F-ROUTE's extra-bridge rung siting one when none does
* **B.** §7.3 (b) 2: every site a candidate deck, a way's own successor site preferred within the detour bound; F-ROUTE's rungs decide
* **Canonical:** §7.3 (b) 2 (fact DETERMINISM-433).
* **Verdict:** canonical home wins.
* **Resolution:** F-REDERIVE points to §7.3 (b) 2.
* **Edits:** **determinism** — §5.2 F-REDERIVE: as stated.
* **Facts:** DETERMINISM-074, DETERMINISM-075, DETERMINISM-433; inventory items DETERMINISM-074, DETERMINISM-075, DETERMINISM-433.

### DETERMINISM-C-4 (same as C-4) — setStyle appears in two lifecycle rows

*minor · CONFIRMED*

* **A.** §7.4 row editTable / editPreset / setStyle: read through the override layer; citing entities re-derive
* **B.** §7.4 row setLayer / setStyle / paintGround: style state outside the model digest; no model re-derivation
* **Canonical:** the setLayer / setStyle / paintGround row (fact DETERMINISM-486).
* **Verdict:** canonical home wins.
* **Resolution:** setStyle appears in that row only; the editTable row names editTable and editPreset.
* **Edits:** **determinism** — §7.4 lifecycle table: as stated.
* **Facts:** DETERMINISM-481, DETERMINISM-486; inventory items DETERMINISM-481, DETERMINISM-486.

### DETERMINISM-C-5 (same as C-5) — Where a drawn bridge's deck goes

*minor · CONFIRMED*

* **A.** §7.1 drawing: the perpendicular deck at the point where the drawn line crosses the channel centreline
* **B.** §7.4 and §4.2 S1 (5): the unused site within crossing.snapM (20 m) of that point, else a new deck by an L0 batch of two shore splits
* **Canonical:** §4.2 S1 (5) (crossing sites and snapM).
* **Verdict:** canonical home wins.
* **Resolution:** §7.1 and §7.4 point to §4.2 S1 (5).
* **Edits:** **determinism** — §7.1; §7.4: as stated.
* **Facts:** DETERMINISM-362, DETERMINISM-526; inventory items DETERMINISM-362, DETERMINISM-526.

### DETERMINISM-C-6 (same as C-6) — Which cases pass the 2 MB cap as an F-EDIT conflict

*minor · CONFIRMED · open item **VD5-2***

* **A.** §5.2 F-EDIT: only a host provider's output that would pass the cap
* **B.** §7.5: an upgrade's copy of a no-longer-shipped pack that would pass the cap is also an F-EDIT conflict
* **Canonical:** §7.5 for the upgrade case (fact DETERMINISM-533), as amended by VD5-2.
* **Verdict:** canonical home wins.
* **Resolution:** §5.2 F-EDIT names both cases by pointer (§2.9 cap; §7.5 upgrade). VD5-2 (canon ruling below) removes "removing the pack" from §7.5's offer.
* **Edits:** **determinism** — §5.2 F-EDIT; §7.5: as stated + VD5-2.
* **Facts:** DETERMINISM-068, DETERMINISM-533; inventory items DETERMINISM-068, DETERMINISM-533.

### DETERMINISM-C-7 (same as C-7) — The precedence order when protections meet

*minor · CONFIRMED*

* **A.** §7.7: precedence at S10–S11: lock > assignment > user-drawn geometry > rule tables > defaults
* **B.** §7.2: the same order "when they meet"; §5.2 F-EDIT: four levels "lock > assignment > drawn geometry > rules" for every edit conflict
* **Canonical:** §7.7 (fact DETERMINISM-573).
* **Verdict:** canonical home wins.
* **Resolution:** State the order once in §7.7 with its scope (general; S10–S11 apply it to assignments); §7.2 and §5.2 point.
* **Edits:** **determinism** — §7.2; §5.2 F-EDIT: as stated.
* **Facts:** DETERMINISM-069, DETERMINISM-382, DETERMINISM-573; inventory items DETERMINISM-069, DETERMINISM-382, DETERMINISM-573.

### DETERMINISM-C-8 (same as C-8) — Which stage a gate-count change re-derives from

*minor · PLAUSIBLE*

* **A.** §7.3 operator table S4 row: Re-derive from S3 when a destination is added or removed (gate count)
* **B.** §7.3 S7 row: Re-derive from S7 when the enceinte kind or the gate count changes
* **Canonical:** §7.3, S4 row's rule: gates are picked at S3 for stage 1 (§4.2 S3 (7); J-P26, D-17) and at S5a for a later enceinte (§4.4).
* **Verdict:** the S7 row's "or the gate count" is the stale clause: since round 3 S7 builds furniture only, the trace and gates being S3's and S5a's (J-P26, D-17; docs/validation/fix-all/r3-pipeline.md).
* **Resolution:** A gate-count change re-derives from the stage that picks those gates: S3 for stage 1, S5 of that stage for a later enceinte; the S7 row keeps "when the enceinte kind changes".
* **Edits:** **determinism** — §7.3 operator table S7 row: as stated.
* **Facts:** DETERMINISM-412, DETERMINISM-415; inventory items DETERMINISM-412, DETERMINISM-415.

### DETERMINISM-C-9 (same as C-9) — When a water edit escalates to Re-derive from S1

*minor · CONFIRMED*

* **A.** §5.2 F-RIVER: inside an edit the inlet and centre rungs are not offered and the edit is then declared Re-derive from S1
* **B.** §7.3 S1 rows: escalate only "when a course leaves its drainage basin"
* **Canonical:** §7.3 operator table (both triggers stated there once).
* **Verdict:** canonical home wins.
* **Resolution:** §7.3 states both triggers; F-RIVER points to §7.3.
* **Edits:** **determinism** — §7.3 S1 rows; §5.2 F-RIVER: as stated.
* **Facts:** DETERMINISM-039, DETERMINISM-410, DETERMINISM-411; inventory items DETERMINISM-039, DETERMINISM-410, DETERMINISM-411.

### DETERMINISM-C-10 (same as C-10) — Which concerns are rerollable

*minor · PLAUSIBLE*

* **A.** §6.1 definition: rerollable = non-geometry concerns that a registered stage or paint program draws from
* **B.** §6.1 enumeration: exactly naming, render.instances, style.jitter, style.crowns, style.compass, naming.emblem (naming.quarter and style.random have readers and are not listed)
* **Canonical:** §6.1 enumeration, with rerollability a registry property (J-DET-22).
* **Verdict:** the enumeration wins; the definition clause is a necessary condition, per J-DET-22 ("rerollability a registry property checked for a reader").
* **Resolution:** Reword §6.1: a concern is rerollable only if non-geometry and read by a registered stage or paint program, and the registry marks which — exactly the six listed; naming.quarter and style.random are registered non-rerollable (style.random is re-drawn by a new setStyle event).
* **Edits:** **determinism** — §6.1: as stated.
* **Facts:** DETERMINISM-151, DETERMINISM-159; inventory items DETERMINISM-151, DETERMINISM-159.

### RENDERING-C01 — The LabelPlacer input

*minor · CONFIRMED · open item **NR5-2***

* **A.** §9.2: LabelPlacer.begin and place take `labels: LabelEntity[]`
* **B.** §9.2, §8.1, §8.9, §8.6: S13b runs from the LabelTable alone in a tile worker that holds no model; it reads LabelTable.areaM2, parent and revision
* **Canonical:** §9.2 placer interface (§14 points to it) with §8.1 LabelTable.
* **Verdict:** NR5-2 ruling.
* **Resolution:** Apply NR5-2: declare a LabelRows view (the LabelTable columns with the StringTable and GeomTable ranges they index) in @plat/model beside LodBand, Role and ZoomStop; begin and place take it; the tile worker's list and each export's transient list implement it; LabelEntity stays the S13a model record. State the interface once in §9.2.
* **Edits:** **rendering** — §9.2; §8.1 (LodBand/Role/ZoomStop sentence): NR5-2; **scope** — §14 LabelPlacer copy; §14 @plat/model pointer list: replace the copy by a pointer to §9.2; add LabelRows to the @plat/model pointer list.
* **Facts:** RENDERING-013, RENDERING-200, RENDERING-240, RENDERING-346, RENDERING-348, RENDERING-350, RENDERING-358; inventory items RENDERING-346, RENDERING-358, RENDERING-350, RENDERING-013, RENDERING-240, RENDERING-200, RENDERING-348, SCOPE-381.

### RENDERING-C02 — What a raster export and the view's jobs are told about light and look

*minor · CONFIRMED · open item **NR5-1***

* **A.** §8.4, §8.8, §8.9, §12.7, §11.1: light steps key the lit programs and tiles; an export must be byte-identical to one made with the view idle and show the model as it stood at the request
* **B.** §8.9: TileRasterOpts carries only sun?; the raster-export request carries only frame, scale, band, layers, post operations and zoom stop; the export's crown set may be evicted
* **Canonical:** §8.9 (TileRasterOpts; what-crosses table) and §11.1 (raster exports); §8.4 owns the light step.
* **Verdict:** NR5-1 ruling.
* **Resolution:** Apply NR5-1 in full (lightStep? in TileRasterOpts; the request carries the look and view state at request time; the export's crown set baked as class-4 units and held, counted in §12.8; §12.7 adds the lit path-sun export run).
* **Edits:** **rendering** — §8.9; §11.1; §12.7; §12.8: NR5-1; **scope** — §14 TileRasterOpts copy: replace the copy by a pointer to §8.9.
* **Facts:** RENDERING-166, RENDERING-174, RENDERING-215, RENDERING-246, RENDERING-251, RENDERING-267, RENDERING-311, RENDERING-432, RENDERING-433, RENDERING-575, RENDERING-590; inventory items RENDERING-251, RENDERING-246, RENDERING-174, RENDERING-166, RENDERING-215, RENDERING-575, RENDERING-267, RENDERING-433, RENDERING-432, RENDERING-311, RENDERING-590, SCOPE-383.

### RENDERING-C03 — The PNG size figure of the per-row filter rule

*minor · CONFIRMED · open item **NR5-3***

* **A.** §12.7: the per-row filter rule gives files "7–10 % smaller on the relief and textured looks"
* **B.** §12.7 (same paragraph) and fixall_rendering_r5_png.out: None's files are 4 % smaller to 10 % larger; the receipt gives 9.0 % and 6.3 % smaller
* **Canonical:** §12.7 with the receipt's figures.
* **Verdict:** NR5-3 ruling (the stated figure is inverted).
* **Resolution:** Write "6–9 % smaller on the relief and textured looks" (or "None's files 7–10 % larger"). The sentence stays in §12.7 (fact RENDERING-574); only its "because" clauses move to J-R53.
* **Edits:** **rendering** — §12.7: NR5-3.
* **Facts:** RENDERING-573, RENDERING-574; inventory items RENDERING-574, RENDERING-573.

### RENDERING-C04 — How many tiles bench/calibrate rasters

*minor · CONFIRMED (8 vs 32 as written); which figure is right is PLAUSIBLE*

* **A.** §8.8: the tier is chosen from "the Canvas2D part of bench/calibrate (8 fixed tiles, ≈ 40 ms)"
* **B.** §12.1: bench/calibrate's browser part is "a Canvas2D raster of 32 fixed tiles"
* **Canonical:** §12.1 (defines bench/calibrate; fact RENDERING-485).
* **Verdict:** canonical home wins: 32 tiles × ≈ 1.2 ms per city-band tile (§8.9, §12.5) ≈ 40 ms; §8.8's "8" is the stale figure (§8.8's sentence dates from round 2, §12.1's from round 1, and only 32 fits the ≈ 40 ms).
* **Resolution:** §8.8 points to §12.1 ("the Canvas2D part of bench/calibrate, §12.1"); §12.1 states the tile count once and carries the ≈ 40 ms.
* **Edits:** **rendering** — §8.8; §12.1: as stated.
* **Facts:** RENDERING-223, RENDERING-485; inventory items RENDERING-223, RENDERING-485.

### RENDERING-C05 — Whether the map title is placed by S13b or is furniture

*minor · PLAUSIBLE (the text may intend two objects; if the rendering editor finds a world-space title label defined elsewhere it names the two objects distinctly instead, and reports)*

* **A.** §9.1: LabelEntity.kind includes 'title'; §9.2: title first in S13b's strict order
* **B.** §9.5: the title is furniture in the emptiest corner, movable; §8.2 slot 24 "title, legend, emblem" is screen-space furniture drawn by the main thread
* **Canonical:** §9.5 (the title is placed as furniture, slot 24).
* **Verdict:** canonical home wins (the draw-order table and the furniture section agree; the greedy's "title >" is the stray clause).
* **Resolution:** State in §9.1 that the 'title' LabelEntity carries the title's text (model data, S13a) and is placed by §9.5's furniture rule, not by S13b's greedy; §9.2's strict order drops "title >".
* **Edits:** **rendering** — §9.1; §9.2; §9.5: as stated.
* **Facts:** RENDERING-096, RENDERING-098, RENDERING-326, RENDERING-344; inventory items RENDERING-326, RENDERING-344, RENDERING-098, RENDERING-096.

### RENDERING-C06 — The greedy's kind order omits wood and annotation

*minor · PLAUSIBLE*

* **A.** §9.1: LabelEntity has ten kinds and a numeric priority
* **B.** §9.2: order "by priority (title > quarter / district > water > landmark > gate > way > address)" — wood and annotation have no place
* **Canonical:** §9.2 (order by the numeric LabelEntity.priority).
* **Verdict:** canonical: the order key is the numeric priority; the kind list is its default ranking.
* **Resolution:** Say the order is by LabelEntity.priority (numeric) and present the kind list as the default ranking of the kinds it lists. Ranking wood and annotation needs a value this pass may not invent: see GAP-2.
* **Edits:** **rendering** — §9.2: as stated.
* **Facts:** RENDERING-326, RENDERING-344; inventory items RENDERING-326, RENDERING-344.

### RENDERING-C07 — The interaction bar is stated above the size cap

*minor · PLAUSIBLE*

* **A.** §12.2: the ladder's cap is ≤ 35 000 buildings; larger requests are clamped
* **B.** §12.5: the pan/zoom bar is stated "at 40 000 buildings and 200 000 trees (O12 b)"
* **Canonical:** §12.5.
* **Verdict:** no value disagrees; the bar's size is O12 (b)'s stress figure, above what a request can build.
* **Resolution:** Keep O12 (b)'s 40 000 / 200 000 and say it is a stress view above the request cap measured on the bench (no generated request reaches it).
* **Edits:** **rendering** — §12.5: as stated.
* **Facts:** RENDERING-493, RENDERING-541; inventory items RENDERING-541, RENDERING-493.

### RENDERING-C08 — The band of the warp-preview budget

*minor · PLAUSIBLE*

* **A.** §8.8: warp preview ≥ 30 fps for a brush radius ≤ 150 m at the district band
* **B.** §12.6: warp preview ≥ 30 fps for a brush radius ≤ 150 m (band unstated)
* **Canonical:** §12.6 (the budget; fact RENDERING-560).
* **Verdict:** canonical home wins.
* **Resolution:** State the budget once in §12.6 with "at the district band"; §8.8 keeps the mechanism and points.
* **Edits:** **rendering** — §8.8; §12.6: as stated.
* **Facts:** RENDERING-230, RENDERING-560; inventory items RENDERING-230, RENDERING-560.

### SCOPE-C01 — Model time against MFCG

*minor · PLAUSIBLE*

* **A.** §13.5 generation-time row: PLAT model ≤ 2.5 × MFCG at TOWN and CITY, ≤ 5.5 × at METROPOLIS (MFCG 57 / 131 / 156 ms)
* **B.** §1.1 rung table: model p95 CITY ≈ 300 ms (265–340), METROPOLIS ≈ 800 ms (724–880); D-18: ≈ 2 × / ≈ 5 ×; §12.9: 1.8 × / 2.3 × / 5.1 × at MFCG's building counts
* **Canonical:** §12.9 for the measured ratios (fact RENDERING-596); §13.5 keeps its bar.
* **Verdict:** no value disagrees: the ratios are taken at MFCG's matched building counts (§12.9), where 2.3 × ≤ 2.5 × and 5.1 × ≤ 5.5 ×; D-18's "≈ 2 × / ≈ 5 ×" round §12.9.
* **Resolution:** State the matched-count ratios once in §12.9; §13.5's row keeps its bar and points to §12.9; D-18 points to §12.9 instead of rounding.
* **Edits:** **scope** — §13.5 row; D-18; §1.1: point to §12.9 / §12.3; **rendering** — §12.9: canonical.
* **Facts:** RENDERING-596, SCOPE-067, SCOPE-068, SCOPE-283, SCOPE-527, SCOPE-729; inventory items SCOPE-283, SCOPE-067, SCOPE-068, SCOPE-527, SCOPE-729, RENDERING-596.

### SCOPE-C02 — What the D-5 panel commits into the product

*minor · CONFIRMED · open item **VS5-3***

* **A.** §17.1 (4) and D-29: the only inputs are two numbers-only files (ftg-captures.json, ng-counts.json)
* **B.** §13.6 (9): the sitting's record.json lives in the product (MilestoneRecord.d5.record)
* **Canonical:** §17.1 (4) as rewritten by VS5-3.
* **Verdict:** VS5-3 ruling.
* **Resolution:** Rewrite §17.1 (4) to name three committed files (VS5-3); D-29 points to §17.1 (4).
* **Edits:** **scope** — §17.1 (4); D-29: VS5-3.
* **Facts:** SCOPE-294, SCOPE-311, SCOPE-315, SCOPE-491, SCOPE-538; inventory items SCOPE-491, SCOPE-311, SCOPE-315, SCOPE-538, SCOPE-294.

### SCOPE-C03 — The faithfulness campaign's detection bound

*minor · CONFIRMED*

* **A.** §13.2 executed: 2 000 / 2 000 for the +0.25 sd bias and 0.8 × too-snug; 500 / 500 for 0.6 × and 1.5 ×; at ρ = 1 bias 99.3 %, snugness 99.7 %
* **B.** §15.2 O9 (c): "≥ 99.5 % detection (2 000 / 2 000 each)"; J-S4: ≥ 99.5 % for all four
* **Canonical:** §13.2 (the executed evidence; fact SCOPE-212 / SCOPE-215).
* **Verdict:** canonical home wins.
* **Resolution:** Keep the executed counts in §13.2 only; §15.2 O9 (c) and J-S4 point to §13.2 without restating a bound.
* **Edits:** **scope** — §15.2 O9 (c); J-S4 (rationale file): as stated.
* **Facts:** SCOPE-212, SCOPE-215, SCOPE-426, SCOPE-770, SCOPE-796; inventory items SCOPE-215, SCOPE-426, SCOPE-770, SCOPE-796, DETERMINISM-465.

### SCOPE-C04 — The scripted tasks of §13.4

*minor · CONFIRMED*

* **A.** §13.4: seven tasks (link, layered SVG, coast side, five variants, recover from a mistaken regenerate, ruler, gazetteer)
* **B.** §15.2 O16 (c): "the scripted tasks of §13.4 —" listing five
* **Canonical:** §13.4.
* **Verdict:** canonical home wins.
* **Resolution:** §15.2 O16 (c) refers to "the scripted tasks of §13.4" without a list.
* **Edits:** **scope** — §15.2 O16 (c): as stated.
* **Facts:** SCOPE-246, SCOPE-334, SCOPE-432; inventory items SCOPE-246, SCOPE-432, SCOPE-334.

### SCOPE-C06 — How M1's reader opens a file of another output version

*minor · CONFIRMED · open item **VS5-1***

* **A.** §16 M1 and J-S40: a differing root loads as a corrupt cache by regeneration
* **B.** one-page summary, J-DET-44, §2.9 step 2, §13.3: a town made by an output version no longer run opens as a frozen view, labelled, not re-checked
* **Canonical:** §2.9 step 2 (frozen view); §16 M1 for when it is built.
* **Verdict:** VS5-1 ruling.
* **Resolution:** Apply VS5-1: M1's reader never root-checks a document of another outputVersion (frozen view with the offer to reopen the recipe); M1 exit fixture; §2.9 step 5 and M1's M2a clause restrict regeneration to an M1 document of the running version; J-S40 amended.
* **Edits:** **scope** — §16 M1 content and exit; J-S40: VS5-1; **model** — §2.9 load step 5: VS5-1 companion: restrict the regeneration clause to a document of the running output version.
* **Facts:** DETERMINISM-263, MODEL-410, SCOPE-451, SCOPE-456, SCOPE-656, SCOPE-806; inventory items SCOPE-451, SCOPE-456, SCOPE-028, SCOPE-238, SCOPE-806, SCOPE-656, MODEL-410.

### SCOPE-C07 — When a kept town's link is refused

*minor · CONFIRMED · open item **VD5-7***

* **A.** §16 M2a builds keep-the-saved-town; the link refusal lands at M3a
* **B.** summary and J-DET-50: a town kept from its saved copy is shared as its file, never as a link
* **Canonical:** §6.4 link rule; §16 for its placement.
* **Verdict:** VD5-7 ruling.
* **Resolution:** Apply VD5-7 (move §6.4's "the base is the recipe" condition into M2a with the keep, or state M2a offers no link for an edited or rebased town); add the kept-town refusal case to M2a's exit.
* **Edits:** **scope** — §16 M2a row and exit: VD5-7.
* **Facts:** SCOPE-457, SCOPE-458, SCOPE-461, SCOPE-463, SCOPE-662; inventory items SCOPE-457, SCOPE-458, SCOPE-461, SCOPE-463, SCOPE-029, SCOPE-662.

### SCOPE-C09 — Plot width 3 m (O5 b) vs 2.5 m (D-19, §3.2 (2))

*minor · PLAUSIBLE (reading of floor vs bar)*

* **A.** §15.2 O5 (b): "0 plots < 3 m" [C]
* **B.** D-19 and §3.2 (2): min plot width 2.5 m (minPlotWidth)
* **Canonical:** both stand: §3.2 (2)'s 2.5 m is the hard geometric class floor (what is legal); O5 (b)'s 3 m is the acceptance bar on generated plots, whose narrowest frontage row is 4 m (§4.7 granularity table).
* **Verdict:** INVALID as a conflict — two different facts (a floor and a bar); nothing to change.
* **Resolution:** No edit. §15.2 keeps O5 (b); §3.2 (2) keeps the floor.
* **Facts:** KERNEL-077, PIPELINE-259, SCOPE-419, SCOPE-528; inventory items SCOPE-419, SCOPE-528, KERNEL-077, PIPELINE-259.

### SCOPE-C10 — Whether CityJSON is built

*minor · CONFIRMED*

* **A.** §0.6 completion record: "added … CityJSON to the deferrals"
* **B.** D-8, J-R14, §16, §14, M3b: CityJSON 2.0 is built
* **Canonical:** D-8 / §11.1.
* **Verdict:** the §0.6 text is history (the validation record keeps it).
* **Resolution:** §0.6 leaves the normative text, which removes the contradiction.
* **Edits:** **scope** — §0.6: drop (history).
* **Facts:** SCOPE-052, SCOPE-359, SCOPE-476, SCOPE-517, SCOPE-726; inventory items SCOPE-052, SCOPE-517, SCOPE-726, SCOPE-476, SCOPE-359.

### SCOPE-C11 — The staged-subject list

*minor · CONFIRMED*

* **A.** §16 and §1.1's stage table: stage 2 is built in this program at M5 (D-35)
* **B.** Staged section: "the only subjects the owner's roadmap places in a later stage" includes stage 2; the summary lists close-ups under "what comes later"
* **Canonical:** the Staged section (one list).
* **Verdict:** canonical home wins.
* **Resolution:** Keep one list in the Staged section; mark the stage-2 row "built in this program at M5 (§16), after the base"; §1.1, §16 and the summary point to that list.
* **Edits:** **scope** — Staged section; §1.1; §16; summary: as stated.
* **Facts:** SCOPE-061, SCOPE-476, SCOPE-545, SCOPE-546; inventory items SCOPE-545, SCOPE-546, SCOPE-476, SCOPE-061, SCOPE-037.

### CANON-C01 — The pin vocabulary

*minor · CONFIRMED*

* **A.** §2.7 Pin.kind: well, fountain, large_tree, cross, market_cross, shrine, pump, gallows, statue, monument, bandstand, campfire, fire_pit, stall, trough, lamp (16 kinds; no tent)
* **B.** §8.2 symbol(glyph) and §8.3 census: "the whole pin vocabulary of §2.7: tent, stall, well, …, lamp post" (17 items, tent included)
* **Canonical:** §2.7 Pin.kind (fact MODEL-293).
* **Verdict:** canonical home wins; "tent" is a building class and roof kind (§2.5–§2.6, §4.7 tents arrangement), not a pin.
* **Resolution:** §8.2 and §8.3 say "a symbol for every Pin.kind of §2.7" and list nothing; tents are drawn as buildings.
* **Edits:** **rendering** — §8.2 symbol(glyph); §8.3 census: pointer to §2.7 Pin.kind.
* **Facts:** MODEL-293; inventory items MODEL-293, RENDERING-081.

### CANON-C02 — What a direction is

*minor · CONFIRMED*

* **A.** §2.1 Units: "directions used in geometry are integer vectors"
* **B.** §3.2 (5): "Angles and directions are unit vectors in doubles derived from integer endpoints; growth headings are stored as centidegrees"
* **Canonical:** §3.2 (5) numeric policy (fact KERNEL-085).
* **Verdict:** canonical home wins.
* **Resolution:** §2.1 points to §3.2 (5) for directions (stored angles stay "i32 centidegrees", which agrees).
* **Edits:** **model** — §2.1 Units: pointer to §3.2 (5).
* **Facts:** KERNEL-085, MODEL-005; inventory items MODEL-005, KERNEL-085.

### CANON-C03 — Frames called squares

*minor · CONFIRMED*

* **A.** §1.1 rung table: frame 4 km² (2.0 km square), 25 km² (5.0 km square), 64 km² (8.0 km square); §12.2: "(2 × 2 km)" etc.
* **B.** §3.2 (9): frames are rectangles of area A with the blueprint's aspect ∈ [0.5, 2] (default 1)
* **Canonical:** §3.2 (9) (fact KERNEL-092).
* **Verdict:** canonical home wins.
* **Resolution:** §1.1 and §12.2 give the area and point to §3.2 (9); "square" only as "square at the default aspect 1".
* **Edits:** **scope** — §1.1 rung table: as stated; **rendering** — §12.2: as stated.
* **Facts:** KERNEL-092, RENDERING-493, SCOPE-066, SCOPE-067, SCOPE-068; inventory items KERNEL-092, SCOPE-066, SCOPE-067, SCOPE-068, RENDERING-493.

### CANON-C04 — Who returns E_ENGINE_UNAVAILABLE

*minor · CONFIRMED*

* **A.** §3.7: names E_ENGINE_UNAVAILABLE for the Clipper2 fallback as if a kernel result
* **B.** §11.2: an API error returned by generate and open when a host lacks WebAssembly under that fallback; it is not in §3.1's KernelError union
* **Canonical:** §11.2 (fact RENDERING-458).
* **Verdict:** canonical home wins.
* **Resolution:** §3.7 points to §11.2 for the host-facing error; §3.1's KernelError union is unchanged.
* **Edits:** **kernel** — §3.7: pointer to §11.2.
* **Facts:** KERNEL-320, RENDERING-458; inventory items KERNEL-320, RENDERING-458.

### CANON-C05 — Who owns a stage's mechanism: §4 or §12.4

*minor · CONFIRMED*

* **A.** §12.4 header: "mechanism the budget assumes (§4 follows it)" — §12.4 as the authority for S1–S14 mechanisms
* **B.** §4 stage sections state the same mechanisms (grids, lattice, flood, blur) as stage behaviour
* **Canonical:** §4 (stage behaviour) for mechanisms; §12.4 for work counts, times and p50.
* **Verdict:** task rule (stage behaviour in §4, budgets in §12).
* **Resolution:** §12.4 keeps each row's budget, work counts and p50, points to the stage section for the mechanism, and its header drops "§4 follows it".
* **Edits:** **rendering** — §12.4 header and rows: as stated; **pipeline** — §4.2, §4.5, §4.7, §4.9: state the mechanisms once (they already do; facts PIPELINE-059, PIPELINE-208, PIPELINE-274, PIPELINE-305).
* **Facts:** RENDERING-516, RENDERING-520, RENDERING-524, RENDERING-525; inventory items RENDERING-516, RENDERING-520, RENDERING-524, RENDERING-525.

### CANON-C06 — The overflow-rung inference in the label acceptance

*minor · CONFIRMED (arithmetic)*

* **A.** §9.4 acceptance: "≥ 99 % of all area-label glyph area inside its face (O13 a), which caps the overflow rung at 5 % of the on-map area labels"
* **B.** §9.4 rung (6): an overflow puts ≤ 20 % of a label's glyph area outside; a label that spills less lets more labels overflow, so ≥ 99 % inside caps the overflow count only if every overflow spills the full 20 %
* **Canonical:** §9.4 acceptance (fact RENDERING-380).
* **Verdict:** the inference is invalid as written (determinism inventory O-1).
* **Resolution:** Keep the ≥ 99 % bar; drop the "which caps the overflow rung at 5 %" clause (it is a consequence, not a bar, and does not follow). §5.2 F-LABEL points to §9.4.
* **Edits:** **rendering** — §9.4 acceptance: as stated; **determinism** — §5.2 F-LABEL test: pointer to §9.4.
* **Facts:** RENDERING-380; inventory items RENDERING-380, DETERMINISM-063.

### CANON-C07 — The water operator's step 8 speaks of "the carve"

*minor · CONFIRMED*

* **A.** §7.3 (b) 8 (S1's water operator): "the height samples the carve changed run (a) 2–4"
* **B.** §7.3 (b) is the water operator, not a carve (§4.11)
* **Canonical:** §7.3 (b).
* **Verdict:** wording carried over from §4.11 (determinism inventory O-2).
* **Resolution:** Read "the height samples the edit changed".
* **Edits:** **determinism** — §7.3 (b) 8: as stated.
* **Facts:** DETERMINISM-449; inventory items DETERMINISM-449.

### CANON-C08 — Stage 1's determinism row lists six key components

*minor · CONFIRMED (rounding of a list)*

* **A.** §1.4 determinism row: sub-streams per (stage, entity lineage, concern, reroll, attempt, epoch)
* **B.** D-15 and §6.1: seed key, entity lineage, stage, concern, reroll, attempt, epoch, salt
* **Canonical:** §6.1 stream key (fact DETERMINISM-141).
* **Verdict:** canonical home wins.
* **Resolution:** §1.4 names the choice and points to §6.1 for the components; D-15 points too.
* **Edits:** **scope** — §1.4 determinism row; D-15: pointer to §6.1.
* **Facts:** DETERMINISM-141, SCOPE-095, SCOPE-524; inventory items SCOPE-095, SCOPE-524, DETERMINISM-141.

### CANON-C09 — FTG's entrance distance

*minor · CONFIRMED*

* **A.** §1.4 buildings row: FTG's entrance 3 m from the road
* **B.** §13.5 entrance rule: FTG 2.99 m from the road
* **Canonical:** §13.5 (fact SCOPE-269).
* **Verdict:** canonical home wins.
* **Resolution:** §1.4 points to §13.5 (or uses 2.99 m).
* **Edits:** **scope** — §1.4: as stated.
* **Facts:** SCOPE-269; inventory items SCOPE-269.

### CANON-C10 — Delivery-tier acceptance numbers

*minor · CONFIRMED*

* **A.** D-9: requested-feature delivery by tier — tier-6 omission a failure, target 0; degraded ≤ 5 %
* **B.** §5.1 (7): counts full / degraded / omitted and counts a tier-6 omission as a failure (§15.2); no ≤ 5 %
* **Canonical:** §13.5 requested-feature delivery row (fact SCOPE-285: tier-6 omissions 0; degraded ≤ 5 %, §13.7).
* **Verdict:** no value disagrees; §5.1 (7) omits the degraded bar.
* **Resolution:** §5.1 (7) and D-9 point to §13.5 for the numbers; §5.1 (7) keeps the counting rule.
* **Edits:** **determinism** — §5.1 (7): pointer; **scope** — D-9: pointer.
* **Facts:** DETERMINISM-023, SCOPE-285, SCOPE-518; inventory items DETERMINISM-023, SCOPE-518, SCOPE-285.

## Gaps and rulings this pass may not make

Recorded so nothing is decided silently; the final validator lists them for the owner / Fable.

| id | subject | where | why not fixed here | owner | what this pass does |
|---|---|---|---|---|---|
| GAP-1 | The branch re-join invariant has no value for k | §5.3 stage-end (S5) row "no branch re-joins its parent within k segments" (DETERMINISM-110); no section gives k a value (also absent from every fix round, docs/validation/fix-all/r1–r5-determinism.md) | the pass may not add a number | pipeline (§4.4 growth owns the value) | the invariant stays in §5.3 as written; the pipeline editor states no number; the validator lists it for the owner / Fable |
| GAP-2 | The label greedy has no rank for wood and annotation labels | §9.2 strict order vs §9.1 LabelEntity.kind (RENDERING-C06) | ranking them would add a design decision | rendering | RENDERING-C06's wording change only; the validator lists the gap |
| RULING-1 | Our own licence: the owner's stated GPL-3 intent | docs/OWNER-INSTRUCTIONS-2026-09-25.md l.120 ("I intend to make this module … GPL three license") vs §17.3 and D-22 (proprietary default until the owner chooses) | a licence change is an owner-gated decision, not a consistency repair | scope | §17.3 / D-22 unchanged; the validator and SUMMARY.md raise it for the owner |

## Routing of the 20 still-open round-5 items

The item's owner (from `still-open-r5.json`) is accountable; every part listed edits the text it holds, reading the required change in `still-open-r5.json`. Where an item offers two options and more than one part must edit in parallel, the canon chose one so the parts agree (NP5-2, NP5-4, VD5-2, VD5-5); each choice is vetoable and pending Fable.

| item | owner | part | where | what |
|---|---|---|---|---|
| NR5-1 | rendering | rendering | §8.9 TileRasterOpts, request row; §11.1; §12.7 run; §12.8 export canvases | required change in full |
| NR5-1 | rendering | scope | §14 | TileRasterOpts copy → pointer to §8.9 |
| NR5-2 | rendering | rendering | §9.2 interface; §8.1 @plat/model sentence | LabelRows |
| NR5-2 | rendering | scope | §14 | LabelPlacer copy → pointer; add LabelRows to the @plat/model pointer list |
| NR5-3 | rendering | rendering | §12.7 | "6–9 % smaller" |
| VK5-1 | kernel | kernel | §3.3 "No item changes in place"; §3.10 freshness row; §3.9 chunk sentence | required change |
| VK5-1 | kernel | model | §2.9 chunks | each partition chunk holds "the vertices that belong to it by §3.3's rebuild rule" |
| VK5-1 | kernel | scope | §13.1 | the drawBoundary regroup fixture |
| VK5-2 | kernel | model | §2.2 rule 3 (b); Plat flags comment | "strips its last vertex role row other than knot rows" |
| VK5-2 | kernel | kernel | §3.4 insertChain opts.pinned | exempt from decimation only; the flag is set only by pinVertices |
| VK5-2 | kernel | scope | §13.1 | the F-REDERIVE width-knot deck fixture |
| VK5-3 | kernel | model | §2.2 rule 3 evidence sentence | "by construction for any number of later same-level vertices on that route" |
| VK5-3 | kernel | kernel | bench script (outside the document) | fixall_kernel_r5_checks.py column (iii) — not part of docs/ARCHITECTURE.md; the kernel lane records it in its report |
| NP5-1 | pipeline | model | §2.6 NP4-2 rule (1) | every face sharing a split edge in the effective scope; the levels; the indexed vertex role row guard |
| NP5-1 | pipeline | pipeline | §4.1 S11 row | party wall = shared L3 side line (CF-PIPE-03) |
| NP5-2 | pipeline | pipeline | §4.1; §4.4 S5b | canon ruling CF-PIPE-10 |
| NP5-2 | pipeline | determinism | §5.2 F-ROUTE | add S5b |
| NP5-2 | pipeline | scope | J-I18 | add S5b's batch |
| NP5-3 | pipeline | pipeline | §10.4 | (a) — the sentence becomes a pointer to §7.6/§6.3; if any clause stays it uses (a)'s order |
| NP5-3 | pipeline | determinism | §7.6 (the canonical sentence, fact DETERMINISM-550); §7.4 warp paragraph | the canonical sentence reads "…, listed for confirmation (§6.3 case (4)), and never the row's other names"; (b) wording in §7.4 |
| NP5-4 | pipeline | model | §2.6 | define Room { ring; wing; subLocation? }; Porch in relative form (wing side index, offset and width along that side, depth; no world point) — canon choice of the item's first option; rename the composition tower ComposedTower |
| NP5-4 | pipeline | scope | §14 | rename in any copy |
| VD5-1 | determinism | determinism | §7.3 item 4; §7.4 upgrade row; §7.5 MigrationMap and tests | required change in full |
| VD5-2 | determinism | determinism | §7.5; §5.2 F-EDIT | drop "removing the pack"; canon choice of the item's first option: offer only "keep the old model" and state the town becomes a frozen view that cannot be imported (the second option needs a new size bound this pass may not invent); add the >2 MB dropped-pack test to §7.5 |
| VD5-3 | determinism | determinism | §7.4 rebase row; §6.3 case (4) triggers | frozenImport runs case (4) over every unedited generated name, renames stored in the rebase event |
| VD5-3 | determinism | scope | §13.2 naming-input fixtures (fact SCOPE-207) | the frozen-fixture B-EDIT case |
| VD5-4 | determinism | determinism | §6.2 records tree; §5.3 CI maintenance row | node keying rule incl. one town node; moves re-hash both nodes |
| VD5-4 | determinism | scope | §13.2 | the drawBoundary save/reload B-EDIT fixture |
| VD5-5 | determinism | model | §2.8 Derivation records (fact MODEL-342) | canon choice of the item's preferred option: a re-derivation that reproduces an entity's leaf digest exactly keeps its old derivation record |
| VD5-5 | determinism | determinism | §6.5 (9) replay = session and truncation identity; §7.3 item 7 oracle (i) | require equal records digests |
| VD5-5 | determinism | scope | §13.2 | the epoch-grown Adjust-during-verification B-EDIT fixture |
| VD5-6 | pipeline | pipeline | §10.4 | pointer to §2.9 pack set and retention |
| VD5-6 | pipeline | determinism | §7.4; §7.6 | pointer to §2.9 |
| VD5-7 | scope | scope | §16 M2a row and exit | required change (either option; single-part edit) |
| VS5-1 | scope | scope | §16 M1 content and exit; J-S40 | required change |
| VS5-1 | scope | model | §2.9 load step 5 (the C-2 sentence) | restrict the regeneration to a document of the running output version |
| VS5-2 | scope | scope | §13.6 (2); D5Pair NG comment; J-S34 | area = the district's own bent-cut fabric opened as a refine close-up |
| VS5-2 | scope | pipeline | II.2 | the area = bent-cut sentence |
| VS5-3 | scope | scope | §17.1 (4); D-29 pointer | three committed files |

## Judgment calls: the rationale file and the index

All 269 J rows (J-1–J-18, J-K1–35, J-DET-1–51, J-P1–49, J-R1–54, J-S1–43, J-I1–19) move verbatim to `docs/ARCHITECTURE-RATIONALE.md` (scope rewriter), each leaving a one-line index row. Rows the conflicts amend on the way: J-DET-20 (DETERMINISM-C-2), J-K6 (KERNEL-C06, KERNEL-C12), J-S4 (SCOPE-C03), J-S34 (VS5-2), J-S40 (VS5-1), J-I18 (NP5-2). Inline rationale passages that duplicate a J row are listed per part under RATIONALE OUT: the owning rewriter removes the "because" text and leaves the rule plus "(J-x)". Six inline passages, and the second half of a seventh, have no J row; the canon assigns the next free ids below — the scope rewriter adds each as a new row (text verbatim from the archived document) and an index row, and the owning rewriter leaves "(J-x)" behind.

| new id | inventory id | passage (archived text) |
|---|---|---|
| J-P50 | MODEL-206 | §2.5 slot paragraph (unnamed judgment) — Slot shape is S11 working data, never stored: after S11 the footprint face and wings are the slot's geometry; chose to drop the stored slot… |
| J-DET-52 | MODEL-398 | §2.9 load step 3 — Unnamed judgment: re-apply the edits made meanwhile on the replay's records over replacing records only for entities those edits did not re… |
| J-K36 | KERNEL-065 | §3.1 — Judgment note (VK-16): chose a pinned, registry-confirmed robust-predicates 3.0.3 with an in-house BigInt fallback over re-verifying at ado… |
| J-DET-53 | DETERMINISM-169 | §6.1 — Rationale: transparent successor seed + 1 chosen over the generator's stream state (survives draw-order changes, readable in the link); the… |
| J-R55 | RENDERING-321 | §8.10 — Chose to build tiles at build time and ship them over a per-session build (the session build ran on the interaction path under §12.5's ≤ 15… |
| J-R56 | RENDERING-515 | §12.3 — Chose a max clause relative to each generation's own law over one absolute maximum per rung (building count varies with seed); chose confir… |
| J-DET-54 | DETERMINISM-543 | §7.5 — second half of DETERMINISM-543 (copying a pack a new output version stops shipping); the first half stays J-DET-44 |

## Part MODEL — §2

STATE 304 facts · MOVE IN 0 · MOVE OUT 6 · REFERENCE 84 · summary/section restatements 5 · RATIONALE OUT 28 · HISTORY OUT 4 · conflicts 15 · routed open-item edits 7

**Conflicts to resolve:** CANON-C02, KERNEL-C07, MODEL-C01, MODEL-C02, MODEL-C03, MODEL-C04, MODEL-C05, MODEL-C06, MODEL-C07, MODEL-C08, MODEL-C09, MODEL-C10, MODEL-C11, MODEL-C12, SCOPE-C06.

**Routed open-item edits:** VK5-1 (§2.9 chunks); VK5-2 (§2.2 rule 3 (b); Plat flags comment); VK5-3 (§2.2 rule 3 evidence sentence); NP5-1 (§2.6 NP4-2 rule (1)); NP5-4 (§2.6); VD5-5 (§2.8 Derivation records (fact MODEL-342)); VS5-1 (§2.9 load step 5 (the C-2 sentence)).

**STATE — facts whose canonical home is in this part** (by home section; the fact id is the inventory id of its home statement; `canon.json → facts` holds each with every place it is stated):

* **§2** (1; 0 stated more than once): MODEL-001
* **§2.1** (9; 5 stated more than once): MODEL-002, MODEL-005, MODEL-006, MODEL-007, MODEL-008, MODEL-010, MODEL-012, MODEL-013, MODEL-015
* **§2.2** (97; 53 stated more than once): MODEL-016, MODEL-017, MODEL-018, MODEL-019, MODEL-020, MODEL-021, MODEL-022, MODEL-023, MODEL-024, MODEL-025, MODEL-026, MODEL-027, MODEL-028, MODEL-029, MODEL-031, MODEL-032, MODEL-033, MODEL-034, MODEL-035, MODEL-036, MODEL-037, MODEL-038, MODEL-039, MODEL-040, MODEL-041, MODEL-042, MODEL-043, MODEL-044, MODEL-045, MODEL-046, MODEL-047, MODEL-048, MODEL-049, MODEL-050, MODEL-052, MODEL-053, MODEL-054, MODEL-055, MODEL-057, MODEL-058, MODEL-059, MODEL-060, MODEL-061, MODEL-062, MODEL-063, MODEL-064, MODEL-065, MODEL-066, MODEL-069, MODEL-071, MODEL-072, MODEL-073, MODEL-076, MODEL-077, MODEL-078, MODEL-079, MODEL-080, MODEL-081, MODEL-082, MODEL-083, MODEL-084, MODEL-090, MODEL-091, MODEL-092, MODEL-094, MODEL-095, MODEL-096, MODEL-098, MODEL-099, MODEL-100, MODEL-101, MODEL-102, MODEL-103, MODEL-105, MODEL-107, MODEL-108, MODEL-109, MODEL-112, MODEL-115, MODEL-116, MODEL-117, MODEL-118, MODEL-119, MODEL-120, MODEL-121, MODEL-122, MODEL-123, MODEL-124, MODEL-125, MODEL-128, MODEL-130, MODEL-131, MODEL-132, MODEL-134, MODEL-135, MODEL-137, MODEL-138
* **§2.3** (19; 11 stated more than once): MODEL-150, MODEL-151, MODEL-152, MODEL-153, MODEL-154, MODEL-155, MODEL-156, MODEL-157, MODEL-158, MODEL-160, MODEL-161, MODEL-162, MODEL-168, MODEL-171, MODEL-172, MODEL-173, MODEL-174, MODEL-175, MODEL-176
* **§2.4** (7; 4 stated more than once): MODEL-178, MODEL-179, MODEL-180, MODEL-181, MODEL-182, MODEL-183, MODEL-184
* **§2.5** (21; 11 stated more than once): MODEL-186, MODEL-187, MODEL-189, MODEL-190, MODEL-191, MODEL-192, MODEL-193, MODEL-194, MODEL-195, MODEL-197, MODEL-198, MODEL-199, MODEL-200, MODEL-201, MODEL-202, MODEL-203, MODEL-204, MODEL-209, MODEL-210, MODEL-214, MODEL-215
* **§2.6** (49; 26 stated more than once): MODEL-217, MODEL-218, MODEL-219, MODEL-220, MODEL-221, MODEL-222, MODEL-223, MODEL-224, MODEL-225, MODEL-226, MODEL-227, MODEL-228, MODEL-229, MODEL-230, MODEL-231, MODEL-232, MODEL-233, MODEL-234, MODEL-235, MODEL-236, MODEL-237, MODEL-238, MODEL-240, MODEL-241, MODEL-242, MODEL-247, MODEL-248, MODEL-249, MODEL-250, MODEL-251, MODEL-252, MODEL-253, MODEL-254, MODEL-255, MODEL-258, MODEL-259, MODEL-260, MODEL-261, MODEL-262, MODEL-263, MODEL-269, MODEL-270, MODEL-271, MODEL-272, MODEL-273, MODEL-275, MODEL-276, MODEL-277, MODEL-281
* **§2.7** (23; 9 stated more than once): MODEL-283, MODEL-284, MODEL-285, MODEL-286, MODEL-287, MODEL-288, MODEL-290, MODEL-291, MODEL-292, MODEL-293, MODEL-295, MODEL-296, MODEL-297, MODEL-298, MODEL-299, MODEL-300, MODEL-302, MODEL-303, MODEL-304, MODEL-306, MODEL-307, MODEL-309, MODEL-317
* **§2.8** (26; 17 stated more than once): MODEL-319, MODEL-320, MODEL-322, MODEL-323, MODEL-324, MODEL-325, MODEL-326, MODEL-327, MODEL-328, MODEL-329, MODEL-330, MODEL-331, MODEL-332, MODEL-333, MODEL-335, MODEL-336, MODEL-337, MODEL-338, MODEL-340, MODEL-342, MODEL-343, MODEL-344, MODEL-348, MODEL-349, MODEL-352, MODEL-353
* **§2.9** (52; 23 stated more than once): MODEL-355, MODEL-356, MODEL-357, MODEL-359, MODEL-360, MODEL-361, MODEL-362, MODEL-363, MODEL-364, MODEL-365, MODEL-366, MODEL-367, MODEL-368, MODEL-369, MODEL-372, MODEL-373, MODEL-374, MODEL-376, MODEL-377, MODEL-378, MODEL-379, MODEL-381, MODEL-382, MODEL-383, MODEL-384, MODEL-386, MODEL-387, MODEL-389, MODEL-391, MODEL-392, MODEL-393, MODEL-394, MODEL-395, MODEL-396, MODEL-397, MODEL-400, MODEL-401, MODEL-402, MODEL-404, MODEL-405, MODEL-406, MODEL-410, MODEL-411, MODEL-412, MODEL-413, MODEL-419, MODEL-420, MODEL-421, MODEL-422, MODEL-423, MODEL-425, MODEL-428

**MOVE OUT — these leave this part (replace by a pointer to the new home):** MODEL-164 → §4.2; MODEL-167 → §4.2; MODEL-274 → §13.2; MODEL-339 → §13.2; MODEL-354 → §13.2; MODEL-430 → §13.2.

**REFERENCE — these inventory ids restate a fact homed elsewhere; replace each by a pointer to the home (keep only a part-specific use):**

| inventory id | stated at | fact | home | note |
|---|---|---|---|---|
| MODEL-003 | §2.1 Units | KERNEL-092 | §3.2 (9) (kernel) |  |
| MODEL-004 | §2.1 Units | KERNEL-088 | §3.2 (6) (kernel) |  |
| MODEL-011 | §2.1 Layers | RENDERING-154 | §8.4 (rendering) |  |
| MODEL-014 | §2.1 Ids | DETERMINISM-209 | §6.3 (determinism) |  |
| MODEL-030 | §2.2 comment | KERNEL-141 | §3.3 step 1 (kernel) |  |
| MODEL-051 | §2.2 rule 1 | KERNEL-311 | §3.7 (kernel) | §2.2 rule 1 keeps only which level holds wall bands |
| MODEL-056 | §2.2 rule 2 | KERNEL-372 | §3.10 (kernel) |  |
| MODEL-067 | §2.2 rule 3 | KERNEL-020 | §3.1 (kernel) |  |
| MODEL-068 | §2.2 rule 3 | KERNEL-020 | §3.1 (kernel) |  |
| MODEL-070 | §2.2 rule 3 | KERNEL-098 | §3.3 (kernel) |  |
| MODEL-074 | §2.2 rule 3 | KERNEL-287 | §3.6 (kernel) |  |
| MODEL-075 | §2.2 rule 3 | KERNEL-287 | §3.6 (kernel) |  |
| MODEL-085 | §2.2 rule 3 | KERNEL-287 | §3.6 (kernel) |  |
| MODEL-086 | §2.2 rule 3 | KERNEL-162 | §3.3 (kernel) |  |
| MODEL-087 | §2.2 rule 3 | KERNEL-374 | §3.10 (kernel) |  |
| MODEL-088 | §2.2 rule 4 | KERNEL-216 | §3.4 (kernel) |  |
| MODEL-089 | §2.2 rule 4 | KERNEL-254 | §3.6 step 5 (kernel) |  |
| MODEL-093 | §2.2 rule 5 | KERNEL-204 | §3.4 (kernel) |  |
| MODEL-097 | §2.2 rule 5 Stretches | KERNEL-225 | §3.4 (kernel) |  |
| MODEL-110 | §2.2 rule 5 positions in log | DETERMINISM-474 | §7.4 lifecycle (determinism) |  |
| MODEL-111 | §2.2 rule 5 warp and pins | KERNEL-278 | §3.6 (kernel) |  |
| MODEL-113 | §2.2 rule 6 | DETERMINISM-399 | §7.3 (2) (determinism) |  |
| MODEL-114 | §2.2 rule 6 | KERNEL-105 | §3.3 (kernel) |  |
| MODEL-126 | §2.2 rule 7 anchors | KERNEL-118 | §3.3 rule 2 (kernel) |  |
| MODEL-127 | §2.2 rule 7 anchors | KERNEL-121 | §3.3 rule 3 (kernel) |  |
| MODEL-129 | §2.2 rule 7 anchors | PIPELINE-164 | §4.4 S5a (pipeline) |  |
| MODEL-133 | §2.2 rule 8 | KERNEL-102 | §3.3 (kernel) |  |
| MODEL-136 | §2.2 Size | KERNEL-143 | §3.3 step 1 (kernel) |  |
| MODEL-163 | §2.3 hydrology grid | SCOPE-158 | §13.1 (scope) |  |
| MODEL-165 | §2.3 hydrology grid | RENDERING-533 | §12.4 (rendering) |  |
| MODEL-169 | §2.3 Heights | SCOPE-158 | §13.1 (scope) |  |
| MODEL-170 | §2.3 Flats | PIPELINE-069 | §4.2 S1 (3) (pipeline) |  |
| MODEL-177 | §2.3 Water attributes | DETERMINISM-428 | §7.3 (b) 1 (determinism) |  |
| MODEL-188 | §2.5 comment | RENDERING-327 | §9.1 (rendering) |  |
| MODEL-196 | §2.5 Plot.access comment | DETERMINISM-055 | §5.2 F-PLOT (determinism) |  |
| MODEL-205 | §2.5 prose | PIPELINE-276 | §4.7 S11 (pipeline) |  |
| MODEL-208 | §2.5 "Quarters" | RENDERING-375 | §9.4 (rendering) |  |
| MODEL-212 | §2.5 "Seams" | PIPELINE-403 | II.1 (pipeline) |  |
| MODEL-213 | §2.5 "FieldBands" | PIPELINE-210 | §4.5 (pipeline) | §2.5 keeps the FieldBands record fields |
| MODEL-216 | §2.5 "Vacant frontage runs" | PIPELINE-265 | §4.7 S10 (8) (pipeline) |  |
| MODEL-243 | §2.6 Row footprints | KERNEL-335 | §3.8 (kernel) |  |
| MODEL-244 | §2.6 Row footprints | SCOPE-188 | §13.2 (scope) |  |
| MODEL-256 | §2.6 wing rule 4 | RENDERING-561 | §12.6 (rendering) |  |
| MODEL-264 | §2.6 Test | SCOPE-203 | §13.2 (scope) |  |
| MODEL-265 | §2.6 Test | DETERMINISM-469 | §7.3 (7) (vi) (determinism) |  |
| MODEL-278 | §2.6 stage-3 hook | RENDERING-577 | §12.7 (rendering) |  |
| MODEL-279 | §2.6 stage-3 hook | RENDERING-577 | §12.7 (rendering) |  |
| MODEL-280 | §2.6 stage-3 hook | SCOPE-184 | §13.2 (scope) |  |
| MODEL-282 | §2.6 stage-3 intake | SCOPE-203 | §13.2 (scope) |  |
| MODEL-289 | §2.7 Greenery comment | RENDERING-022 | §8.1 (2) §8.1 item 2 (rendering) |  |
| MODEL-294 | §2.7 comment | RENDERING-325 | §9.1 (rendering) |  |
| MODEL-301 | §2.7 comment | PIPELINE-362 | §10.1 (pipeline) |  |
| MODEL-305 | §2.7 people paragraph | PIPELINE-376 | §10.3 (pipeline) |  |
| MODEL-308 | §2.7 Open traces | PIPELINE-165 | §4.4 S5a (pipeline) |  |
| MODEL-310 | §2.7 Nesting and build order | PIPELINE-285 | §4.8 (pipeline) |  |
| MODEL-311 | §2.7 Castles | PIPELINE-291 | §4.8 castle (pipeline) |  |
| MODEL-312 | §2.7 Bridges | PIPELINE-297 | §4.8 water (pipeline) |  |
| MODEL-313 | §2.7 Bridges | PIPELINE-083 | §4.2 S1 (5) (pipeline) |  |
| MODEL-314 | §2.7 Bridges | PIPELINE-081 | §4.2 S1 (5) (pipeline) |  |
| MODEL-315 | §2.7 Bridges | PIPELINE-080 | §4.2 S1 (5) (pipeline) |  |
| MODEL-316 | §2.7 Bridges | PIPELINE-082 | §4.2 S1 (5) (pipeline) |  |
| MODEL-318 | §2.7 staged layers | PIPELINE-438 | II.6 (pipeline) |  |
| MODEL-321 | §2.8 intro | DETERMINISM-192 | §6.2 (determinism) |  |
| MODEL-334 | §2.8 decline hooks | PIPELINE-353 | §4.11 (pipeline) |  |
| MODEL-345 | §2.8 Naming records | DETERMINISM-231 | §6.3 (determinism) |  |
| MODEL-350 | §2.8 Provenance bullet | DETERMINISM-260 | §6.4 (determinism) |  |
| MODEL-351 | §2.8 Provenance bullet | DETERMINISM-192 | §6.2 (determinism) |  |
| MODEL-358 | §2.9 Document.undo | DETERMINISM-505 | §7.4 records (determinism) |  |
| MODEL-370 | §2.9 One source of truth | DETERMINISM-575 | §7.7 (determinism) |  |
| MODEL-371 | §2.9 One source of truth | DETERMINISM-132 | §5.4 (determinism) |  |
| MODEL-375 | §2.9 pack set bullet | DETERMINISM-532 | §7.5 (2) (determinism) |  |
| MODEL-388 | §2.9 load step 3 | DETERMINISM-200 | §6.2 (determinism) |  |
| MODEL-390 | §2.9 load step 3 | DETERMINISM-530 | §7.5 (2) (determinism) |  |
| MODEL-399 | §2.9 load step 3 | DETERMINISM-206 | §6.2 (iii) (determinism) |  |
| MODEL-403 | §2.9 load step 3 test | SCOPE-205 | §13.2 (scope) |  |
| MODEL-407 | §2.9 load step 4 | RENDERING-471 | §11.3 (rendering) |  |
| MODEL-408 | §2.9 load step 4 test | SCOPE-205 | §13.2 (scope) |  |
| MODEL-414 | §2.9 snapshot holds | DETERMINISM-131 | §5.4 (determinism) |  |
| MODEL-415 | §2.9 chunks | KERNEL-353 | §3.9 (kernel) |  |
| MODEL-416 | §2.9 chunks | KERNEL-354 | §3.9 (kernel) |  |
| MODEL-417 | §2.9 chunks | KERNEL-356 | §3.9 (kernel) |  |
| MODEL-424 | §2.9 Formats | RENDERING-404 | §11.1 (rendering) |  |
| MODEL-427 | §2.9 Canonical form | RENDERING-461 | §11.3 (rendering) |  |
| MODEL-429 | §2.9 View state | DETERMINISM-497 | §7.4 sessions (determinism) |  |

**Summary / section restatements** (plain-words lead or a line restating a section; point to the section; keep only canonical figures): MODEL-009 (§2.1 Layers) → §8.4; MODEL-185 (§2.4 prose) → §6.1; MODEL-211 (§2.5 "Allocations") → §6.1; MODEL-426 (§2.9 Canonical form and digests) → §6.2; MODEL-431 (§2.9 last bullet) → §6.4.

**RATIONALE OUT** (remove the "because" text, keep the chosen rule where it is not stated elsewhere, leave "(J-x)"): MODEL-139 → J-K1; MODEL-140 → J-K3; MODEL-141 → J-K9; MODEL-142 → J-K10; MODEL-143 → J-K11; MODEL-144 → J-K22; MODEL-145 → J-K23; MODEL-146 → J-K28; MODEL-147 → J-K29; MODEL-148 → J-K31; MODEL-149 → J-K32; MODEL-159 → J-K12; MODEL-166 → J-K7; MODEL-206 → J-P50; MODEL-207 → J-P1; MODEL-239 → J-P17; MODEL-245 → J-P31; MODEL-246 → J-P39; MODEL-267 → J-P42; MODEL-268 → J-P49; MODEL-341 → J-DET-33; MODEL-346 → J-DET-46; MODEL-347 → J-DET-41; MODEL-380 → J-DET-35 (+J-DET-50); MODEL-385 → J-DET-44; MODEL-398 → J-DET-52; MODEL-409 → J-DET-38 (+J-DET-42); MODEL-418 → J-DET-36 (+J-DET-19).

**HISTORY OUT** (drop; keep at most a one-line receipt pointer beside the fact it supports): MODEL-104 (§2.2 rule 5 cutting/joining); MODEL-106 (§2.2 rule 5 cutting/joining); MODEL-257 (§2.6 wing rule 4); MODEL-266 (§2.6 measured on a model).

## Part KERNEL — §3

STATE 309 facts · MOVE IN 0 · MOVE OUT 5 · REFERENCE 41 · summary/section restatements 2 · RATIONALE OUT 26 · HISTORY OUT 3 · conflicts 16 · routed open-item edits 3

**Conflicts to resolve:** CANON-C04, KERNEL-C01, KERNEL-C02, KERNEL-C03, KERNEL-C04, KERNEL-C05, KERNEL-C06, KERNEL-C07, KERNEL-C08, KERNEL-C09, KERNEL-C10, KERNEL-C11, KERNEL-C12, KERNEL-C13, MODEL-C01, MODEL-C02.

**Routed open-item edits:** VK5-1 (§3.3 "No item changes in place"; §3.10 freshness row; §3.9 chunk sentence); VK5-2 (§3.4 insertChain opts.pinned); VK5-3 (bench script (outside the document)).

**STATE — facts whose canonical home is in this part** (by home section; the fact id is the inventory id of its home statement; `canon.json → facts` holds each with every place it is stated):

* **§3** (2; 1 stated more than once): KERNEL-001, KERNEL-002
* **§3.1** (50; 37 stated more than once): KERNEL-020, KERNEL-003, KERNEL-004, KERNEL-005, KERNEL-006, KERNEL-007, KERNEL-008, KERNEL-009, KERNEL-010, KERNEL-011, KERNEL-012, KERNEL-013, KERNEL-014, KERNEL-015, KERNEL-017, KERNEL-018, KERNEL-019, KERNEL-021, KERNEL-025, KERNEL-026, KERNEL-027, KERNEL-028, KERNEL-029, KERNEL-030, KERNEL-031, KERNEL-032, KERNEL-033, KERNEL-034, KERNEL-035, KERNEL-036, KERNEL-037, KERNEL-041, KERNEL-042, KERNEL-043, KERNEL-044, KERNEL-045, KERNEL-046, KERNEL-047, KERNEL-048, KERNEL-049, KERNEL-050, KERNEL-051, KERNEL-052, KERNEL-053, KERNEL-054, KERNEL-055, KERNEL-056, KERNEL-060, KERNEL-061, KERNEL-062
* **§3.2** (25; 18 stated more than once): KERNEL-092, KERNEL-088, KERNEL-066, KERNEL-067, KERNEL-068, KERNEL-069, KERNEL-070, KERNEL-071, KERNEL-072, KERNEL-073, KERNEL-074, KERNEL-075, KERNEL-076, KERNEL-077, KERNEL-078, KERNEL-079, KERNEL-080, KERNEL-081, KERNEL-082, KERNEL-085, KERNEL-086, KERNEL-087, KERNEL-089, KERNEL-091, KERNEL-093
* **§3.3** (64; 49 stated more than once): KERNEL-141, KERNEL-098, KERNEL-162, KERNEL-105, KERNEL-118, KERNEL-121, KERNEL-102, KERNEL-143, KERNEL-096, KERNEL-097, KERNEL-099, KERNEL-100, KERNEL-101, KERNEL-103, KERNEL-104, KERNEL-106, KERNEL-107, KERNEL-108, KERNEL-112, KERNEL-113, KERNEL-114, KERNEL-115, KERNEL-116, KERNEL-117, KERNEL-119, KERNEL-120, KERNEL-124, KERNEL-125, KERNEL-126, KERNEL-128, KERNEL-130, KERNEL-132, KERNEL-133, KERNEL-136, KERNEL-137, KERNEL-138, KERNEL-139, KERNEL-140, KERNEL-144, KERNEL-145, KERNEL-146, KERNEL-147, KERNEL-148, KERNEL-149, KERNEL-152, KERNEL-153, KERNEL-154, KERNEL-155, KERNEL-156, KERNEL-157, KERNEL-158, KERNEL-159, KERNEL-160, KERNEL-161, KERNEL-163, KERNEL-164, KERNEL-165, KERNEL-166, KERNEL-167, KERNEL-168, KERNEL-170, KERNEL-171, KERNEL-172, KERNEL-174
* **§3.4** (42; 32 stated more than once): KERNEL-216, KERNEL-204, KERNEL-225, KERNEL-184, KERNEL-185, KERNEL-186, KERNEL-187, KERNEL-188, KERNEL-189, KERNEL-190, KERNEL-191, KERNEL-192, KERNEL-193, KERNEL-194, KERNEL-195, KERNEL-196, KERNEL-197, KERNEL-198, KERNEL-199, KERNEL-200, KERNEL-201, KERNEL-202, KERNEL-203, KERNEL-205, KERNEL-206, KERNEL-207, KERNEL-208, KERNEL-209, KERNEL-210, KERNEL-211, KERNEL-212, KERNEL-213, KERNEL-214, KERNEL-215, KERNEL-217, KERNEL-219, KERNEL-220, KERNEL-221, KERNEL-222, KERNEL-223, KERNEL-226, KERNEL-227
* **§3.5** (11; 11 stated more than once): KERNEL-229, KERNEL-230, KERNEL-231, KERNEL-232, KERNEL-234, KERNEL-235, KERNEL-237, KERNEL-238, KERNEL-239, KERNEL-240, KERNEL-241
* **§3.6** (48; 42 stated more than once): KERNEL-287, KERNEL-254, KERNEL-278, KERNEL-242, KERNEL-243, KERNEL-244, KERNEL-245, KERNEL-246, KERNEL-247, KERNEL-248, KERNEL-249, KERNEL-250, KERNEL-251, KERNEL-252, KERNEL-253, KERNEL-255, KERNEL-256, KERNEL-257, KERNEL-258, KERNEL-259, KERNEL-260, KERNEL-261, KERNEL-263, KERNEL-264, KERNEL-265, KERNEL-266, KERNEL-267, KERNEL-268, KERNEL-269, KERNEL-270, KERNEL-271, KERNEL-272, KERNEL-273, KERNEL-274, KERNEL-275, KERNEL-276, KERNEL-277, KERNEL-279, KERNEL-280, KERNEL-283, KERNEL-284, KERNEL-285, KERNEL-286, KERNEL-288, KERNEL-289, KERNEL-290, KERNEL-291, KERNEL-292
* **§3.7** (19; 14 stated more than once): KERNEL-311, KERNEL-300, KERNEL-301, KERNEL-302, KERNEL-303, KERNEL-304, KERNEL-305, KERNEL-306, KERNEL-308, KERNEL-309, KERNEL-310, KERNEL-312, KERNEL-313, KERNEL-314, KERNEL-317, KERNEL-319, KERNEL-320, KERNEL-321, KERNEL-323
* **§3.8** (16; 9 stated more than once): KERNEL-335, KERNEL-329, KERNEL-330, KERNEL-331, KERNEL-332, KERNEL-333, KERNEL-334, KERNEL-336, KERNEL-337, KERNEL-338, KERNEL-339, KERNEL-340, KERNEL-341, KERNEL-342, KERNEL-344, KERNEL-345
* **§3.9** (12; 10 stated more than once): KERNEL-353, KERNEL-354, KERNEL-356, KERNEL-348, KERNEL-349, KERNEL-350, KERNEL-351, KERNEL-352, KERNEL-355, KERNEL-359, KERNEL-361, KERNEL-365
* **§3.10** (20; 19 stated more than once): KERNEL-372, KERNEL-374, KERNEL-367, KERNEL-368, KERNEL-369, KERNEL-370, KERNEL-371, KERNEL-373, KERNEL-375, KERNEL-376, KERNEL-377, KERNEL-378, KERNEL-379, KERNEL-380, KERNEL-381, KERNEL-382, KERNEL-383, KERNEL-384, KERNEL-385, KERNEL-386

**MOVE OUT — these leave this part (replace by a pointer to the new home):** KERNEL-129 → §13.2; KERNEL-131 → §13.1; KERNEL-282 → §13.1; KERNEL-343 → §13.1; KERNEL-363 → §13.1.

**REFERENCE — these inventory ids restate a fact homed elsewhere; replace each by a pointer to the home (keep only a part-specific use):**

| inventory id | stated at | fact | home | note |
|---|---|---|---|---|
| KERNEL-022 | §3.1 | MODEL-069 | §2.2 rule 3 (model) |  |
| KERNEL-023 | §3.1 | MODEL-076 | §2.2 rule 3 demotion (model) |  |
| KERNEL-024 | §3.1 | MODEL-040 | §2.2 types (model) |  |
| KERNEL-038 | §3.1 | RENDERING-284 | §8.10 (rendering) |  |
| KERNEL-039 | §3.1 | RENDERING-022 | §8.1 (2) §8.1 item 2 (rendering) |  |
| KERNEL-040 | §3.1 | RENDERING-564 | §12.7 (rendering) |  |
| KERNEL-057 | §3.1 | DETERMINISM-280 | §6.5 (2) (determinism) |  |
| KERNEL-058 | §3.1 | DETERMINISM-280 | §6.5 (2) (determinism) |  |
| KERNEL-059 | §3.1 | DETERMINISM-135 | §6.1 (determinism) |  |
| KERNEL-084 | §3.2 (4) | SCOPE-240 | §13.3 (scope) |  |
| KERNEL-090 | §3.2 (7) | MODEL-168 | §2.3 Heights (model) |  |
| KERNEL-094 | §3.2 (9) | MODEL-046 | §2.2 rule 1 (model) |  |
| KERNEL-109 | §3.3 | SCOPE-185 | §13.2 (scope) |  |
| KERNEL-110 | §3.3 | DETERMINISM-377 | §7.1 dry run (determinism) |  |
| KERNEL-111 | §3.3 | DETERMINISM-402 | §7.3 (2) (determinism) |  |
| KERNEL-122 | §3.3 rule 3 | PIPELINE-344 | §4.11 (4) (pipeline) |  |
| KERNEL-123 | §3.3 | SCOPE-125 | §13.1 (scope) |  |
| KERNEL-127 | §3.3 | SCOPE-156 | §13.1 (scope) |  |
| KERNEL-134 | §3.3 | DETERMINISM-199 | §6.2 (determinism) |  |
| KERNEL-135 | §3.3 | DETERMINISM-082 | §5.3 (determinism) |  |
| KERNEL-142 | §3.3 step 1 | RENDERING-457 | §11.2 (rendering) |  |
| KERNEL-150 | §3.3 step 3 | PIPELINE-195 | §4.5 (pipeline) |  |
| KERNEL-151 | §3.3 step 3 | PIPELINE-046 | §4.1 (pipeline) |  |
| KERNEL-173 | §3.3 | SCOPE-168 | §13.2 (scope) |  |
| KERNEL-175 | §3.3 | RENDERING-519 | §12.4 (rendering) |  |
| KERNEL-224 | §3.4 | MODEL-095 | §2.2 rule 5 Stretches (model) |  |
| KERNEL-228 | §3.4 | SCOPE-145 | §13.1 (scope) |  |
| KERNEL-233 | §3.5 | MODEL-091 | §2.2 rule 5 (model) |  |
| KERNEL-236 | §3.5 | PIPELINE-241 | §4.6 (8) (pipeline) |  |
| KERNEL-262 | §3.6 | SCOPE-124 | §13.1 (scope) |  |
| KERNEL-281 | §3.6 | DETERMINISM-316 | §7.1 (determinism) |  |
| KERNEL-307 | §3.7 | SCOPE-178 | §13.2 (scope) |  |
| KERNEL-315 | §3.7 | SCOPE-155 | §13.1 (scope) |  |
| KERNEL-316 | §3.7 | DETERMINISM-289 | §6.5 (7) (determinism) |  |
| KERNEL-318 | §3.7 | RENDERING-524 | §12.4 (rendering) |  |
| KERNEL-322 | §3.7 | RENDERING-519 | §12.4 (rendering) |  |
| KERNEL-324 | §3.7 | DETERMINISM-302 | §6.5 (10) (determinism) |  |
| KERNEL-358 | §3.9 | MODEL-422 | §2.9 Size budget (model) |  |
| KERNEL-360 | §3.9 | MODEL-387 | §2.9 load step 3 (model) |  |
| KERNEL-362 | §3.9 | MODEL-091 | §2.2 rule 5 (model) |  |
| KERNEL-364 | §3.9 | RENDERING-404 | §11.1 (rendering) |  |

**Summary / section restatements** (plain-words lead or a line restating a section; point to the section; keep only canonical figures): KERNEL-016 (§3.1) → §2.2; KERNEL-083 (§3.2 (4)) → §6.5.

**RATIONALE OUT** (remove the "because" text, keep the chosen rule where it is not stated elsewhere, leave "(J-x)"): KERNEL-357 → J-DET-36; KERNEL-064 → J-11; KERNEL-065 → J-K36; KERNEL-095 → J-K13; KERNEL-169 → J-K34; KERNEL-183 → J-K34; KERNEL-176 → J-K6; KERNEL-177 → J-K14; KERNEL-178 → J-K24; KERNEL-179 → J-K15; KERNEL-180 → J-K16; KERNEL-181 → J-K25; KERNEL-182 → J-K33; KERNEL-293 → J-K2; KERNEL-294 → J-K17; KERNEL-295 → J-K18; KERNEL-296 → J-K26; KERNEL-297 → J-K30; KERNEL-298 → J-K27; KERNEL-299 → J-K35; KERNEL-325 → J-K4; KERNEL-326 → J-K8; KERNEL-327 → J-K19; KERNEL-328 → J-K20; KERNEL-346 → J-K5; KERNEL-347 → J-K21.

**HISTORY OUT** (drop; keep at most a one-line receipt pointer beside the fact it supports): KERNEL-063 (§3.1); KERNEL-218 (§3.4); KERNEL-366 (§3.9).

## Part PIPELINE — §4, §10, PART II, PART III

STATE 365 facts · MOVE IN 2 · MOVE OUT 2 · REFERENCE 48 · summary/section restatements 3 · RATIONALE OUT 29 · HISTORY OUT 2 · conflicts 13 · routed open-item edits 5

**Conflicts to resolve:** CANON-C05, CF-PIPE-01, CF-PIPE-02, CF-PIPE-03, CF-PIPE-04, CF-PIPE-05, CF-PIPE-06, CF-PIPE-07, CF-PIPE-08, CF-PIPE-09, CF-PIPE-10, KERNEL-C12, MODEL-C11.

**Routed open-item edits:** NP5-1 (§4.1 S11 row); NP5-2 (§4.1; §4.4 S5b); NP5-3 (§10.4); VD5-6 (§10.4); VS5-2 (II.2).

**STATE — facts whose canonical home is in this part** (by home section; the fact id is the inventory id of its home statement; `canon.json → facts` holds each with every place it is stated):

* **§4** (1; 1 stated more than once): PIPELINE-001
* **§4.1** (34; 28 stated more than once): PIPELINE-046, PIPELINE-002, PIPELINE-003, PIPELINE-004, PIPELINE-005, PIPELINE-006, PIPELINE-007, PIPELINE-008, PIPELINE-009, PIPELINE-010, PIPELINE-011, PIPELINE-012, PIPELINE-013, PIPELINE-014, PIPELINE-015, PIPELINE-016, PIPELINE-020, PIPELINE-021, PIPELINE-026, PIPELINE-027, PIPELINE-028, PIPELINE-029, PIPELINE-030, PIPELINE-031, PIPELINE-032, PIPELINE-033, PIPELINE-034, PIPELINE-035, PIPELINE-036, PIPELINE-038, PIPELINE-040, PIPELINE-044, PIPELINE-045, PIPELINE-047
* **§4.2** (73; 34 stated more than once): PIPELINE-069, PIPELINE-083, PIPELINE-081, PIPELINE-080, PIPELINE-082, PIPELINE-052, PIPELINE-056, PIPELINE-057, PIPELINE-058, PIPELINE-059, PIPELINE-060, PIPELINE-061, PIPELINE-062, PIPELINE-063, PIPELINE-065, PIPELINE-067, PIPELINE-068, PIPELINE-070, PIPELINE-071, PIPELINE-072, PIPELINE-073, PIPELINE-074, PIPELINE-075, PIPELINE-076, PIPELINE-077, PIPELINE-078, PIPELINE-079, PIPELINE-084, PIPELINE-085, PIPELINE-086, PIPELINE-087, PIPELINE-088, PIPELINE-090, PIPELINE-091, PIPELINE-092, PIPELINE-093, PIPELINE-094, PIPELINE-096, PIPELINE-097, PIPELINE-099, PIPELINE-100, PIPELINE-101, PIPELINE-102, PIPELINE-103, PIPELINE-104, PIPELINE-105, PIPELINE-106, PIPELINE-107, PIPELINE-108, PIPELINE-109, PIPELINE-110, PIPELINE-111, PIPELINE-112, PIPELINE-113, PIPELINE-114, PIPELINE-115, PIPELINE-116, PIPELINE-117, PIPELINE-118, PIPELINE-119, PIPELINE-120, PIPELINE-121, PIPELINE-122, PIPELINE-123, PIPELINE-125, PIPELINE-126, PIPELINE-127, PIPELINE-128, PIPELINE-129, PIPELINE-130, PIPELINE-132, PIPELINE-133, PIPELINE-134
* **§4.3** (14; 8 stated more than once): PIPELINE-140, PIPELINE-141, PIPELINE-142, PIPELINE-143, PIPELINE-144, PIPELINE-145, PIPELINE-146, PIPELINE-147, PIPELINE-148, PIPELINE-149, PIPELINE-150, PIPELINE-152, PIPELINE-153, PIPELINE-154
* **§4.4** (33; 18 stated more than once): PIPELINE-164, PIPELINE-165, PIPELINE-156, PIPELINE-157, PIPELINE-158, PIPELINE-159, PIPELINE-160, PIPELINE-162, PIPELINE-163, PIPELINE-166, PIPELINE-168, PIPELINE-169, PIPELINE-170, PIPELINE-171, PIPELINE-172, PIPELINE-173, PIPELINE-176, PIPELINE-177, PIPELINE-178, PIPELINE-179, PIPELINE-180, PIPELINE-181, PIPELINE-182, PIPELINE-183, PIPELINE-184, PIPELINE-185, PIPELINE-186, PIPELINE-187, PIPELINE-188, PIPELINE-189, PIPELINE-190, PIPELINE-192, PIPELINE-193
* **§4.5** (23; 15 stated more than once): PIPELINE-210, PIPELINE-195, PIPELINE-194, PIPELINE-196, PIPELINE-197, PIPELINE-199, PIPELINE-200, PIPELINE-205, PIPELINE-206, PIPELINE-207, PIPELINE-208, PIPELINE-209, PIPELINE-212, PIPELINE-213, PIPELINE-214, PIPELINE-215, PIPELINE-216, PIPELINE-217, PIPELINE-218, PIPELINE-219, PIPELINE-221, PIPELINE-222, PIPELINE-223
* **§4.6** (23; 10 stated more than once): PIPELINE-241, PIPELINE-224, PIPELINE-225, PIPELINE-226, PIPELINE-227, PIPELINE-229, PIPELINE-230, PIPELINE-231, PIPELINE-232, PIPELINE-233, PIPELINE-234, PIPELINE-235, PIPELINE-236, PIPELINE-237, PIPELINE-238, PIPELINE-242, PIPELINE-243, PIPELINE-244, PIPELINE-246, PIPELINE-247, PIPELINE-248, PIPELINE-249, PIPELINE-250
* **§4.7** (27; 15 stated more than once): PIPELINE-276, PIPELINE-265, PIPELINE-252, PIPELINE-253, PIPELINE-254, PIPELINE-255, PIPELINE-258, PIPELINE-259, PIPELINE-260, PIPELINE-261, PIPELINE-263, PIPELINE-264, PIPELINE-266, PIPELINE-267, PIPELINE-268, PIPELINE-269, PIPELINE-270, PIPELINE-271, PIPELINE-272, PIPELINE-273, PIPELINE-274, PIPELINE-275, PIPELINE-277, PIPELINE-279, PIPELINE-280, PIPELINE-281, PIPELINE-282
* **§4.8** (14; 12 stated more than once): PIPELINE-285, PIPELINE-291, PIPELINE-297, PIPELINE-284, PIPELINE-286, PIPELINE-288, PIPELINE-289, PIPELINE-290, PIPELINE-292, PIPELINE-294, PIPELINE-295, PIPELINE-296, PIPELINE-299, PIPELINE-301
* **§4.9** (21; 11 stated more than once): PIPELINE-302, PIPELINE-303, PIPELINE-304, PIPELINE-305, PIPELINE-306, PIPELINE-307, PIPELINE-308, PIPELINE-309, PIPELINE-310, PIPELINE-311, PIPELINE-312, PIPELINE-313, PIPELINE-314, PIPELINE-315, PIPELINE-316, PIPELINE-317, PIPELINE-318, PIPELINE-319, PIPELINE-320, PIPELINE-321, PIPELINE-323
* **§4.10** (1; 1 stated more than once): PIPELINE-324
* **§4.11** (21; 13 stated more than once): PIPELINE-353, PIPELINE-344, PIPELINE-327, PIPELINE-328, PIPELINE-329, PIPELINE-330, PIPELINE-331, PIPELINE-332, PIPELINE-333, PIPELINE-334, PIPELINE-335, PIPELINE-336, PIPELINE-337, PIPELINE-339, PIPELINE-341, PIPELINE-342, PIPELINE-343, PIPELINE-347, PIPELINE-352, PIPELINE-354, PIPELINE-355
* **§4.12** (4; 3 stated more than once): PIPELINE-356, PIPELINE-357, PIPELINE-358, PIPELINE-359
* **§10** (1; 1 stated more than once): PIPELINE-360
* **§10.1** (5; 2 stated more than once): PIPELINE-362, PIPELINE-361, PIPELINE-363, PIPELINE-364, PIPELINE-366
* **§10.2** (8; 5 stated more than once): PIPELINE-368, PIPELINE-369, PIPELINE-370, PIPELINE-371, PIPELINE-372, PIPELINE-373, PIPELINE-374, PIPELINE-375
* **§10.3** (14; 4 stated more than once): PIPELINE-376, PIPELINE-377, PIPELINE-378, PIPELINE-379, PIPELINE-380, PIPELINE-381, PIPELINE-382, PIPELINE-383, PIPELINE-384, PIPELINE-385, PIPELINE-387, PIPELINE-388, PIPELINE-389, PIPELINE-390
* **§10.4** (6; 2 stated more than once): PIPELINE-392, PIPELINE-394, PIPELINE-395, PIPELINE-398, PIPELINE-399, PIPELINE-401
* **II.1** (17; 13 stated more than once): PIPELINE-403, PIPELINE-404, PIPELINE-405, PIPELINE-406, PIPELINE-407, PIPELINE-408, PIPELINE-409, PIPELINE-410, PIPELINE-411, PIPELINE-412, PIPELINE-413, PIPELINE-414, PIPELINE-415, PIPELINE-417, PIPELINE-418, PIPELINE-419, PIPELINE-420
* **II.2** (4; 2 stated more than once): PIPELINE-424, PIPELINE-425, PIPELINE-427, PIPELINE-428
* **II.3** (2; 1 stated more than once): PIPELINE-429, PIPELINE-430
* **II.4** (3; 2 stated more than once): PIPELINE-432, PIPELINE-433, PIPELINE-434
* **II.5** (3; 2 stated more than once): PIPELINE-435, PIPELINE-436, PIPELINE-437
* **II.6** (5; 4 stated more than once): PIPELINE-438, PIPELINE-439, PIPELINE-440, PIPELINE-441, PIPELINE-442
* **PART II** (1; 1 stated more than once): PIPELINE-402
* **PART III** (7; 4 stated more than once): PIPELINE-443, PIPELINE-444, PIPELINE-445, PIPELINE-446, PIPELINE-447, PIPELINE-448, PIPELINE-449

**MOVE IN — state these here (today stated only elsewhere; take the text from the archived location):**

* **MODEL-164** → §4.2: River course (§4.2 S1 (3)) traced on hydro and carved into the height raster; after the carve D8 is recomputed on the carved corridor cells and neighbours and accumulation recomputed once (≈2 ms at CITY); carve bed descends monotonically to outfall so no depression is created and the flood is not repeated — from MODEL-164 (model, §2.3 hydrology grid)
* **MODEL-167** → §4.2: S1 sets datumCm to sea level for a coastal site and to the site's base elevation otherwise; a 3 000 m relief is ordinary — from MODEL-167 (model, §2.3 Heights)

**MOVE OUT — these leave this part (replace by a pointer to the new home):** PIPELINE-017 → §5.2; PIPELINE-228 → §16.

**REFERENCE — these inventory ids restate a fact homed elsewhere; replace each by a pointer to the home (keep only a part-specific use):**

| inventory id | stated at | fact | home | note |
|---|---|---|---|---|
| PIPELINE-018 | §4.1 | DETERMINISM-224 | §6.3 (determinism) |  |
| PIPELINE-019 | §4.1 | RENDERING-330 | §9.1 (rendering) |  |
| PIPELINE-022 | §4.1 | RENDERING-538 | §12.5 (rendering) |  |
| PIPELINE-023 | §4.1 | DETERMINISM-597 | §6.2 (determinism) |  |
| PIPELINE-024 | §4.1 | DETERMINISM-293 | §6.5 (9) (determinism) |  |
| PIPELINE-025 | §4.1 | KERNEL-103 | §3.3 (kernel) |  |
| PIPELINE-041 | §4.1 | KERNEL-138 | §3.3 step 1 (kernel) |  |
| PIPELINE-042 | §4.1 | DETERMINISM-015 | §5.1 (5) (determinism) |  |
| PIPELINE-043 | §4.1 | RENDERING-241 | §8.9 (rendering) |  |
| PIPELINE-048 | §4.1 | RENDERING-509 | §12.3 (rendering) |  |
| PIPELINE-049 | §4.1 | RENDERING-500 | §12.3 (rendering) |  |
| PIPELINE-053 | §4.2 S0 | DETERMINISM-564 | §7.7 (1) (determinism) |  |
| PIPELINE-054 | §4.2 S0 | DETERMINISM-575 | §7.7 (determinism) |  |
| PIPELINE-055 | §4.2 S0 | SCOPE-063 | §1.1 (scope) |  |
| PIPELINE-064 | §4.2 S1 (2) | SCOPE-183 | §13.2 (scope) |  |
| PIPELINE-066 | §4.2 S1 (2) | RENDERING-084 | §8.2 (rendering) |  |
| PIPELINE-089 | §4.2 S1 | DETERMINISM-038 | §5.2 F-RIVER (determinism) |  |
| PIPELINE-131 | §4.2 S3 (11) | SCOPE-191 | §13.2 (scope) |  |
| PIPELINE-151 | §4.3 | DETERMINISM-045 | §5.2 F-ROUTE (determinism) |  |
| PIPELINE-155 | §4.3 | DETERMINISM-412 | §7.3 operator table (determinism) |  |
| PIPELINE-161 | §4.4 S5a | SCOPE-277 | §13.5 table (scope) |  |
| PIPELINE-167 | §4.4 S5a | DETERMINISM-050 | §5.2 F-WALL (determinism) |  |
| PIPELINE-174 | §4.4 S5c | SCOPE-263 | §13.5 table (scope) |  |
| PIPELINE-202 | §4.5 | RENDERING-375 | §9.4 (rendering) |  |
| PIPELINE-211 | §4.5 | DETERMINISM-388 | §7.2 field brushes (determinism) |  |
| PIPELINE-239 | §4.6 (7) | DETERMINISM-398 | §7.3 (1) (determinism) |  |
| PIPELINE-251 | §4.7 S9 | KERNEL-304 | §3.7 (kernel) |  |
| PIPELINE-256 | §4.7 S10 (0) | RENDERING-523 | §12.4 (rendering) |  |
| PIPELINE-257 | §4.7 S10 (0) | DETERMINISM-402 | §7.3 (2) (determinism) |  |
| PIPELINE-262 | §4.7 S10 (4) | SCOPE-183 | §13.2 (scope) |  |
| PIPELINE-278 | §4.7 S11 | MODEL-197 | §2.5 PlotBound (model) |  |
| PIPELINE-283 | §4.7 | RENDERING-180 | §8.5 (rendering) |  |
| PIPELINE-298 | §4.8 water | DETERMINISM-248 | §6.3 (determinism) |  |
| PIPELINE-300 | §4.8 water | DETERMINISM-091 | §5.3 (determinism) |  |
| PIPELINE-322 | §4.9 | RENDERING-192 | §8.5 (rendering) |  |
| PIPELINE-325 | §4.10 | RENDERING-330 | §9.1 (rendering) |  |
| PIPELINE-338 | §4.11 | DETERMINISM-435 | §7.3 (b) 2 (determinism) |  |
| PIPELINE-340 | §4.11 | SCOPE-126 | §13.1 (scope) |  |
| PIPELINE-345 | §4.11 (4) | SCOPE-193 | §13.2 (scope) |  |
| PIPELINE-346 | §4.11 (4) | DETERMINISM-398 | §7.3 (1) (determinism) |  |
| PIPELINE-386 | §10.3 | RENDERING-578 | §12.7 (rendering) |  |
| PIPELINE-391 | §10.3 | RENDERING-450 | §11.2 (rendering) |  |
| PIPELINE-393 | §10.4 | DETERMINISM-224 | §6.3 (determinism) |  |
| PIPELINE-396 | §10.4 | DETERMINISM-550 | §7.6 (determinism) |  |
| PIPELINE-397 | §10.4 | MODEL-374 | §2.9 pack set bullet (model) |  |
| PIPELINE-400 | §10.4 | DETERMINISM-557 | §7.6 (determinism) |  |
| PIPELINE-416 | II.1 (3) | SCOPE-142 | §13.1 (scope) |  |
| PIPELINE-431 | II.4 | RENDERING-110 | §8.2 (rendering) |  |

**Summary / section restatements** (plain-words lead or a line restating a section; point to the section; keep only canonical figures): PIPELINE-037 (§4.1) → §7.3; PIPELINE-198 (§4.5) → §2.5; PIPELINE-326 (§4.10) → §8.1.

**RATIONALE OUT** (remove the "because" text, keep the chosen rule where it is not stated elsewhere, leave "(J-x)"): PIPELINE-039 → J-P46; PIPELINE-050 → J-P10; PIPELINE-051 → J-P27; PIPELINE-095 → J-P6; PIPELINE-098 → J-P5; PIPELINE-135 → J-P26; PIPELINE-136 → J-P35; PIPELINE-137 → J-P44; PIPELINE-138 → J-P45; PIPELINE-139 → J-P36; PIPELINE-293 → J-P36; PIPELINE-175 → J-P4; PIPELINE-191 → J-P4 (+J-3); PIPELINE-203 → J-P28; PIPELINE-204 → J-P2 (+J-I1); PIPELINE-220 → J-P41; PIPELINE-240 → J-P32; PIPELINE-245 → J-P11; PIPELINE-287 → J-P29; PIPELINE-348 → J-P30; PIPELINE-349 → J-P34; PIPELINE-350 → J-P43; PIPELINE-351 → J-P40; PIPELINE-365 → J-9; PIPELINE-367 → J-P21; PIPELINE-421 → J-P33; PIPELINE-422 → J-P37; PIPELINE-423 → J-P38; PIPELINE-426 → J-S42.

**HISTORY OUT** (drop; keep at most a one-line receipt pointer beside the fact it supports): PIPELINE-124 (§4.2 S3 (9)); PIPELINE-201 (§4.5).

## Part DETERMINISM — §5, §6, §7

STATE 504 facts · MOVE IN 1 · MOVE OUT 2 · REFERENCE 68 · summary/section restatements 1 · RATIONALE OUT 26 · HISTORY OUT 0 · conflicts 17 · routed open-item edits 8

**Conflicts to resolve:** CANON-C06, CANON-C07, CANON-C10, CF-PIPE-04, CF-PIPE-06, CF-PIPE-10, DETERMINISM-C-1, DETERMINISM-C-10, DETERMINISM-C-2, DETERMINISM-C-3, DETERMINISM-C-4, DETERMINISM-C-5, DETERMINISM-C-6, DETERMINISM-C-7, DETERMINISM-C-8, DETERMINISM-C-9, KERNEL-C01.

**Routed open-item edits:** NP5-2 (§5.2 F-ROUTE); NP5-3 (§7.6 (the canonical sentence, fact DETERMINISM-550); §7.4 warp paragraph); VD5-1 (§7.3 item 4; §7.4 upgrade row; §7.5 MigrationMap and tests); VD5-2 (§7.5; §5.2 F-EDIT); VD5-3 (§7.4 rebase row; §6.3 case (4) triggers); VD5-4 (§6.2 records tree; §5.3 CI maintenance row); VD5-5 (§6.5 (9) replay = session and truncation identity; §7.3 item 7 oracle (i)); VD5-6 (§7.4; §7.6).

**STATE — facts whose canonical home is in this part** (by home section; the fact id is the inventory id of its home statement; `canon.json → facts` holds each with every place it is stated):

* **§5** (1; 1 stated more than once): DETERMINISM-002
* **§5.1** (23; 11 stated more than once): DETERMINISM-015, DETERMINISM-001, DETERMINISM-003, DETERMINISM-004, DETERMINISM-005, DETERMINISM-006, DETERMINISM-007, DETERMINISM-008, DETERMINISM-009, DETERMINISM-011, DETERMINISM-012, DETERMINISM-013, DETERMINISM-014, DETERMINISM-016, DETERMINISM-018, DETERMINISM-019, DETERMINISM-020, DETERMINISM-021, DETERMINISM-022, DETERMINISM-023, DETERMINISM-024, DETERMINISM-025, DETERMINISM-026
* **§5.2** (40; 8 stated more than once): DETERMINISM-055, DETERMINISM-038, DETERMINISM-045, DETERMINISM-050, DETERMINISM-027, DETERMINISM-028, DETERMINISM-031, DETERMINISM-032, DETERMINISM-033, DETERMINISM-034, DETERMINISM-035, DETERMINISM-036, DETERMINISM-039, DETERMINISM-040, DETERMINISM-041, DETERMINISM-042, DETERMINISM-043, DETERMINISM-044, DETERMINISM-047, DETERMINISM-048, DETERMINISM-051, DETERMINISM-052, DETERMINISM-054, DETERMINISM-056, DETERMINISM-058, DETERMINISM-060, DETERMINISM-064, DETERMINISM-065, DETERMINISM-066, DETERMINISM-067, DETERMINISM-068, DETERMINISM-069, DETERMINISM-070, DETERMINISM-072, DETERMINISM-073, DETERMINISM-074, DETERMINISM-075, DETERMINISM-076, DETERMINISM-077, DETERMINISM-078
* **§5.3** (37; 5 stated more than once): DETERMINISM-082, DETERMINISM-091, DETERMINISM-081, DETERMINISM-083, DETERMINISM-085, DETERMINISM-086, DETERMINISM-087, DETERMINISM-088, DETERMINISM-089, DETERMINISM-090, DETERMINISM-092, DETERMINISM-093, DETERMINISM-094, DETERMINISM-095, DETERMINISM-096, DETERMINISM-097, DETERMINISM-099, DETERMINISM-100, DETERMINISM-101, DETERMINISM-102, DETERMINISM-103, DETERMINISM-106, DETERMINISM-109, DETERMINISM-110, DETERMINISM-111, DETERMINISM-112, DETERMINISM-113, DETERMINISM-114, DETERMINISM-115, DETERMINISM-116, DETERMINISM-119, DETERMINISM-120, DETERMINISM-121, DETERMINISM-122, DETERMINISM-123, DETERMINISM-124, DETERMINISM-125
* **§5.4** (6; 3 stated more than once): DETERMINISM-132, DETERMINISM-131, DETERMINISM-127, DETERMINISM-129, DETERMINISM-130, DETERMINISM-133
* **§6** (1; 1 stated more than once): DETERMINISM-134
* **§6.1** (35; 10 stated more than once): DETERMINISM-135, DETERMINISM-136, DETERMINISM-137, DETERMINISM-138, DETERMINISM-139, DETERMINISM-140, DETERMINISM-141, DETERMINISM-142, DETERMINISM-143, DETERMINISM-144, DETERMINISM-145, DETERMINISM-146, DETERMINISM-147, DETERMINISM-148, DETERMINISM-149, DETERMINISM-150, DETERMINISM-151, DETERMINISM-152, DETERMINISM-153, DETERMINISM-154, DETERMINISM-155, DETERMINISM-156, DETERMINISM-157, DETERMINISM-158, DETERMINISM-159, DETERMINISM-160, DETERMINISM-161, DETERMINISM-162, DETERMINISM-163, DETERMINISM-164, DETERMINISM-165, DETERMINISM-167, DETERMINISM-168, DETERMINISM-170, DETERMINISM-599
* **§6.2** (32; 7 stated more than once): DETERMINISM-192, DETERMINISM-200, DETERMINISM-206, DETERMINISM-199, DETERMINISM-597, DETERMINISM-171, DETERMINISM-173, DETERMINISM-174, DETERMINISM-177, DETERMINISM-178, DETERMINISM-180, DETERMINISM-181, DETERMINISM-182, DETERMINISM-183, DETERMINISM-184, DETERMINISM-185, DETERMINISM-186, DETERMINISM-187, DETERMINISM-188, DETERMINISM-189, DETERMINISM-191, DETERMINISM-194, DETERMINISM-195, DETERMINISM-196, DETERMINISM-197, DETERMINISM-201, DETERMINISM-202, DETERMINISM-203, DETERMINISM-204, DETERMINISM-205, DETERMINISM-208, DETERMINISM-601
* **§6.3** (46; 11 stated more than once): DETERMINISM-209, DETERMINISM-231, DETERMINISM-224, DETERMINISM-248, DETERMINISM-210, DETERMINISM-211, DETERMINISM-212, DETERMINISM-213, DETERMINISM-215, DETERMINISM-216, DETERMINISM-217, DETERMINISM-218, DETERMINISM-219, DETERMINISM-220, DETERMINISM-221, DETERMINISM-223, DETERMINISM-225, DETERMINISM-226, DETERMINISM-227, DETERMINISM-228, DETERMINISM-229, DETERMINISM-230, DETERMINISM-232, DETERMINISM-234, DETERMINISM-235, DETERMINISM-236, DETERMINISM-237, DETERMINISM-238, DETERMINISM-239, DETERMINISM-240, DETERMINISM-241, DETERMINISM-242, DETERMINISM-243, DETERMINISM-244, DETERMINISM-245, DETERMINISM-247, DETERMINISM-249, DETERMINISM-250, DETERMINISM-251, DETERMINISM-252, DETERMINISM-253, DETERMINISM-254, DETERMINISM-255, DETERMINISM-256, DETERMINISM-257, DETERMINISM-258
* **§6.4** (17; 3 stated more than once): DETERMINISM-260, DETERMINISM-261, DETERMINISM-262, DETERMINISM-263, DETERMINISM-264, DETERMINISM-265, DETERMINISM-266, DETERMINISM-267, DETERMINISM-268, DETERMINISM-269, DETERMINISM-270, DETERMINISM-272, DETERMINISM-273, DETERMINISM-274, DETERMINISM-275, DETERMINISM-276, DETERMINISM-277
* **§6.5** (19; 13 stated more than once): DETERMINISM-280, DETERMINISM-289, DETERMINISM-302, DETERMINISM-293, DETERMINISM-281, DETERMINISM-282, DETERMINISM-283, DETERMINISM-284, DETERMINISM-286, DETERMINISM-287, DETERMINISM-290, DETERMINISM-291, DETERMINISM-292, DETERMINISM-296, DETERMINISM-297, DETERMINISM-298, DETERMINISM-299, DETERMINISM-300, DETERMINISM-301
* **§7** (1; 0 stated more than once): DETERMINISM-305
* **§7.1** (64; 12 stated more than once): DETERMINISM-377, DETERMINISM-316, DETERMINISM-306, DETERMINISM-307, DETERMINISM-308, DETERMINISM-309, DETERMINISM-310, DETERMINISM-311, DETERMINISM-312, DETERMINISM-313, DETERMINISM-314, DETERMINISM-315, DETERMINISM-317, DETERMINISM-318, DETERMINISM-319, DETERMINISM-320, DETERMINISM-321, DETERMINISM-322, DETERMINISM-323, DETERMINISM-324, DETERMINISM-325, DETERMINISM-326, DETERMINISM-327, DETERMINISM-328, DETERMINISM-329, DETERMINISM-330, DETERMINISM-331, DETERMINISM-333, DETERMINISM-334, DETERMINISM-335, DETERMINISM-336, DETERMINISM-337, DETERMINISM-338, DETERMINISM-339, DETERMINISM-340, DETERMINISM-341, DETERMINISM-342, DETERMINISM-343, DETERMINISM-344, DETERMINISM-345, DETERMINISM-346, DETERMINISM-347, DETERMINISM-348, DETERMINISM-349, DETERMINISM-351, DETERMINISM-352, DETERMINISM-353, DETERMINISM-354, DETERMINISM-358, DETERMINISM-359, DETERMINISM-360, DETERMINISM-362, DETERMINISM-363, DETERMINISM-364, DETERMINISM-365, DETERMINISM-366, DETERMINISM-367, DETERMINISM-368, DETERMINISM-369, DETERMINISM-370, DETERMINISM-371, DETERMINISM-373, DETERMINISM-375, DETERMINISM-376
* **§7.2** (12; 2 stated more than once): DETERMINISM-388, DETERMINISM-379, DETERMINISM-380, DETERMINISM-382, DETERMINISM-383, DETERMINISM-384, DETERMINISM-385, DETERMINISM-386, DETERMINISM-391, DETERMINISM-392, DETERMINISM-394, DETERMINISM-395
* **§7.3** (65; 28 stated more than once): DETERMINISM-399, DETERMINISM-428, DETERMINISM-469, DETERMINISM-402, DETERMINISM-412, DETERMINISM-398, DETERMINISM-435, DETERMINISM-467, DETERMINISM-397, DETERMINISM-403, DETERMINISM-405, DETERMINISM-407, DETERMINISM-408, DETERMINISM-409, DETERMINISM-410, DETERMINISM-411, DETERMINISM-413, DETERMINISM-414, DETERMINISM-415, DETERMINISM-416, DETERMINISM-417, DETERMINISM-418, DETERMINISM-419, DETERMINISM-420, DETERMINISM-421, DETERMINISM-422, DETERMINISM-423, DETERMINISM-425, DETERMINISM-426, DETERMINISM-427, DETERMINISM-429, DETERMINISM-430, DETERMINISM-431, DETERMINISM-432, DETERMINISM-433, DETERMINISM-434, DETERMINISM-436, DETERMINISM-437, DETERMINISM-438, DETERMINISM-439, DETERMINISM-440, DETERMINISM-442, DETERMINISM-443, DETERMINISM-444, DETERMINISM-445, DETERMINISM-446, DETERMINISM-447, DETERMINISM-448, DETERMINISM-449, DETERMINISM-450, DETERMINISM-451, DETERMINISM-453, DETERMINISM-454, DETERMINISM-455, DETERMINISM-456, DETERMINISM-457, DETERMINISM-459, DETERMINISM-460, DETERMINISM-461, DETERMINISM-462, DETERMINISM-463, DETERMINISM-464, DETERMINISM-466, DETERMINISM-468, DETERMINISM-594
* **§7.4** (52; 20 stated more than once): DETERMINISM-474, DETERMINISM-505, DETERMINISM-497, DETERMINISM-470, DETERMINISM-471, DETERMINISM-472, DETERMINISM-473, DETERMINISM-475, DETERMINISM-476, DETERMINISM-477, DETERMINISM-478, DETERMINISM-479, DETERMINISM-480, DETERMINISM-481, DETERMINISM-482, DETERMINISM-483, DETERMINISM-484, DETERMINISM-485, DETERMINISM-486, DETERMINISM-487, DETERMINISM-488, DETERMINISM-489, DETERMINISM-490, DETERMINISM-491, DETERMINISM-492, DETERMINISM-493, DETERMINISM-494, DETERMINISM-495, DETERMINISM-496, DETERMINISM-499, DETERMINISM-500, DETERMINISM-501, DETERMINISM-502, DETERMINISM-503, DETERMINISM-504, DETERMINISM-506, DETERMINISM-507, DETERMINISM-509, DETERMINISM-510, DETERMINISM-511, DETERMINISM-512, DETERMINISM-514, DETERMINISM-515, DETERMINISM-516, DETERMINISM-517, DETERMINISM-519, DETERMINISM-520, DETERMINISM-524, DETERMINISM-525, DETERMINISM-526, DETERMINISM-595, DETERMINISM-596
* **§7.5** (15; 10 stated more than once): DETERMINISM-532, DETERMINISM-530, DETERMINISM-527, DETERMINISM-528, DETERMINISM-529, DETERMINISM-531, DETERMINISM-533, DETERMINISM-534, DETERMINISM-535, DETERMINISM-536, DETERMINISM-537, DETERMINISM-540, DETERMINISM-541, DETERMINISM-542, DETERMINISM-544
* **§7.6** (13; 9 stated more than once): DETERMINISM-550, DETERMINISM-557, DETERMINISM-545, DETERMINISM-546, DETERMINISM-548, DETERMINISM-552, DETERMINISM-553, DETERMINISM-554, DETERMINISM-555, DETERMINISM-558, DETERMINISM-559, DETERMINISM-560, DETERMINISM-561
* **§7.7** (16; 6 stated more than once): DETERMINISM-575, DETERMINISM-564, DETERMINISM-562, DETERMINISM-563, DETERMINISM-565, DETERMINISM-566, DETERMINISM-567, DETERMINISM-568, DETERMINISM-569, DETERMINISM-570, DETERMINISM-571, DETERMINISM-572, DETERMINISM-573, DETERMINISM-576, DETERMINISM-577, DETERMINISM-578
* **§7.8** (9; 5 stated more than once): DETERMINISM-579, DETERMINISM-580, DETERMINISM-581, DETERMINISM-582, DETERMINISM-583, DETERMINISM-585, DETERMINISM-586, DETERMINISM-587, DETERMINISM-589

**MOVE IN — state these here (today stated only elsewhere; take the text from the archived location):**

* **PIPELINE-017** → §5.2: The F-CUT substitution rung reads the district’s allocation, never live roster state. — from PIPELINE-017 (pipeline, §4.1)

**MOVE OUT — these leave this part (replace by a pointer to the new home):** DETERMINISM-294 → §13.2; DETERMINISM-357 → §11.1.

**REFERENCE — these inventory ids restate a fact homed elsewhere; replace each by a pointer to the home (keep only a part-specific use):**

| inventory id | stated at | fact | home | note |
|---|---|---|---|---|
| DETERMINISM-010 | §5.1 (5) | SCOPE-063 | §1.1 (scope) |  |
| DETERMINISM-029 | §5.2 F-NUM | KERNEL-263 | §3.6 (kernel) |  |
| DETERMINISM-030 | §5.2 F-NUM | SCOPE-119 | §13.1 (scope) |  |
| DETERMINISM-037 | §5.2 F-OUTLINE | SCOPE-183 | §13.2 (scope) |  |
| DETERMINISM-046 | §5.2 F-ROUTE | PIPELINE-083 | §4.2 S1 (5) (pipeline) |  |
| DETERMINISM-049 | §5.2 F-BUDGET-STAGE | SCOPE-184 | §13.2 (scope) |  |
| DETERMINISM-053 | §5.2 F-CASTLE | PIPELINE-295 | §4.8 castle (pipeline) |  |
| DETERMINISM-057 | §5.2 F-SITING | PIPELINE-221 | §4.5 S7b (3) (pipeline) |  |
| DETERMINISM-059 | §5.2 F-SITEPLAN | SCOPE-421 | §15.2 (scope) |  |
| DETERMINISM-061 | §5.2 F-SKELETON | SCOPE-159 | §13.1 (scope) |  |
| DETERMINISM-062 | §5.2 F-LABEL | RENDERING-371 | §9.4 (rendering) |  |
| DETERMINISM-063 | §5.2 F-LABEL | RENDERING-380 | §9.4 (rendering) |  |
| DETERMINISM-071 | §5.2 F-EDIT | MODEL-379 | §2.9 pack set bullet (model) |  |
| DETERMINISM-079 | §5.2 F-REDERIVE | DETERMINISM-467 | §7.3 (7) (v) (determinism) |  |
| DETERMINISM-080 | §5.2 F-REDERIVE | MODEL-270 | §2.6 Heights and ground datum (model) |  |
| DETERMINISM-098 | §5.3 | MODEL-253 | §2.6 wing rule 4 (model) |  |
| DETERMINISM-104 | §5.3 | MODEL-006 | §2.1 Units (model) |  |
| DETERMINISM-105 | §5.3 | KERNEL-379 | §3.10 (kernel) |  |
| DETERMINISM-107 | §5.3 | PIPELINE-123 | §4.2 S3 (9) (pipeline) |  |
| DETERMINISM-108 | §5.3 | PIPELINE-237 | §4.6 (7) (pipeline) |  |
| DETERMINISM-117 | §5.3 | MODEL-387 | §2.9 load step 3 (model) |  |
| DETERMINISM-118 | §5.3 | MODEL-397 | §2.9 load step 3 (model) |  |
| DETERMINISM-128 | §5.4 | KERNEL-062 | §3.1 (kernel) |  |
| DETERMINISM-166 | §6.1 | RENDERING-285 | §8.10 (rendering) |  |
| DETERMINISM-172 | §6.2 | MODEL-361 | §2.9 Recipe (model) |  |
| DETERMINISM-175 | §6.2 | PIPELINE-013 | §4.1 (pipeline) |  |
| DETERMINISM-176 | §6.2 | MODEL-378 | §2.9 pack set bullet (model) |  |
| DETERMINISM-179 | §6.2 | DETERMINISM-293 | §6.5 (9) (determinism) |  |
| DETERMINISM-190 | §6.2 | RENDERING-586 | §12.8 (rendering) |  |
| DETERMINISM-193 | §6.2 | RENDERING-586 | §12.8 (rendering) |  |
| DETERMINISM-246 | §6.3 | KERNEL-273 | §3.6 (kernel) |  |
| DETERMINISM-259 | §6.3 | SCOPE-207 | §13.2 (scope) |  |
| DETERMINISM-278 | §6.4 | SCOPE-222 | §13.3 (scope) |  |
| DETERMINISM-279 | §6.5 (1) | KERNEL-081 | §3.2 (3) (kernel) |  |
| DETERMINISM-285 | §6.5 (3) | KERNEL-091 | §3.2 (8) (kernel) |  |
| DETERMINISM-288 | §6.5 (6) | KERNEL-147 | §3.3 step 2 (kernel) |  |
| DETERMINISM-295 | §6.5 (9) | SCOPE-240 | §13.3 (scope) |  |
| DETERMINISM-303 | §6.5 (10) | KERNEL-320 | §3.7 (kernel) |  |
| DETERMINISM-332 | §7.1 | PIPELINE-332 | §4.11 (pipeline) |  |
| DETERMINISM-350 | §7.1 warp | KERNEL-288 | §3.6 (kernel) |  |
| DETERMINISM-355 | §7.1 warp table | RENDERING-394 | §9.5 (rendering) |  |
| DETERMINISM-372 | §7.1 edit targets | MODEL-353 | §2.8 entity registry (model) |  |
| DETERMINISM-374 | §7.1 edit targets | MODEL-428 | §2.9 View state (model) |  |
| DETERMINISM-378 | §7.1 dry run | RENDERING-472 | §11.3 (rendering) |  |
| DETERMINISM-381 | §7.2 | KERNEL-277 | §3.6 (kernel) |  |
| DETERMINISM-389 | §7.2 field brushes | DETERMINISM-388 | §7.2 field brushes (determinism) |  |
| DETERMINISM-390 | §7.2 field brushes | PIPELINE-210 | §4.5 (pipeline) |  |
| DETERMINISM-393 | §7.2 terrain brush | PIPELINE-065 | §4.2 S1 (2) (pipeline) |  |
| DETERMINISM-400 | §7.3 (2) | KERNEL-377 | §3.10 (kernel) |  |
| DETERMINISM-401 | §7.3 (2) | PIPELINE-255 | §4.7 S10 (0) (pipeline) |  |
| DETERMINISM-406 | §7.3 (2) | RENDERING-029 | §8.1 (4) §8.1 item 4 (rendering) |  |
| DETERMINISM-441 | §7.3 (b) 3 | MODEL-095 | §2.2 rule 5 Stretches (model) |  |
| DETERMINISM-458 | §7.3 (5) | MODEL-342 | §2.8 Derivation records (model) |  |
| DETERMINISM-465 | §7.3 (7) (iv) | SCOPE-212 | §13.2 (scope) |  |
| DETERMINISM-508 | §7.4 truncation | MODEL-374 | §2.9 pack set bullet (model) |  |
| DETERMINISM-518 | §7.4 warp ground | MODEL-261 | §2.6 stored composition (2)–(5) (model) |  |
| DETERMINISM-521 | §7.4 warp ground | RENDERING-303 | §8.10 (rendering) |  |
| DETERMINISM-522 | §7.4 warp ground | SCOPE-202 | §13.2 (scope) |  |
| DETERMINISM-538 | §7.5 (2) | MODEL-419 | §2.9 Size budget (model) |  |
| DETERMINISM-547 | §7.6 | MODEL-374 | §2.9 pack set bullet (model) |  |
| DETERMINISM-549 | §7.6 | MODEL-374 | §2.9 pack set bullet (model) |  |
| DETERMINISM-551 | §7.6 | MODEL-376 | §2.9 pack set bullet (model) |  |
| DETERMINISM-588 | §7.8 | PIPELINE-056 | §4.2 S0 (pipeline) |  |
| DETERMINISM-590 | §5.1 (1) | SCOPE-518 | Delegated decisions (scope) |  |
| DETERMINISM-591 | §6.2; §6.5 (7) | SCOPE-523 | Delegated decisions (scope) |  |
| DETERMINISM-592 | §6.5 (2) | SCOPE-532 | Delegated decisions (scope) |  |
| DETERMINISM-598 | §6.4 goldens | SCOPE-222 | §13.3 (scope) |  |
| DETERMINISM-600 | §6.4 | MODEL-373 | §2.9 pack set bullet (model) |  |

**Summary / section restatements** (plain-words lead or a line restating a section; point to the section; keep only canonical figures): DETERMINISM-084 (§5.3 row 1) → §3.10.

**RATIONALE OUT** (remove the "because" text, keep the chosen rule where it is not stated elsewhere, leave "(J-x)"): DETERMINISM-543 → J-DET-44 (+J-DET-54 (new)); DETERMINISM-593 → J-K8; DETERMINISM-017 → J-DET-3 (+J-DET-25); DETERMINISM-126 → J-DET-39; DETERMINISM-169 → J-DET-53; DETERMINISM-198 → J-DET-49; DETERMINISM-207 → J-DET-40 (+J-DET-45); DETERMINISM-214 → J-DET-1; DETERMINISM-222 → J-DET-2; DETERMINISM-233 → J-DET-37 (+J-DET-41); DETERMINISM-271 → J-DET-50 (+J-DET-17, J-DET-35); DETERMINISM-304 → J-DET-28; DETERMINISM-356 → J-DET-15; DETERMINISM-361 → J-DET-14; DETERMINISM-387 → J-DET-6; DETERMINISM-396 → J-DET-24; DETERMINISM-424 → J-DET-24; DETERMINISM-404 → J-DET-29 (+J-DET-29); DETERMINISM-452 → J-DET-23; DETERMINISM-498 → J-DET-34; DETERMINISM-513 → J-DET-16; DETERMINISM-523 → J-DET-31; DETERMINISM-539 → J-DET-18; DETERMINISM-556 → J-DET-48; DETERMINISM-574 → J-DET-11; DETERMINISM-584 → J-DET-27.

## Part RENDERING — §8, §9, §11, §12

STATE 500 facts · MOVE IN 1 · MOVE OUT 1 · REFERENCE 29 · summary/section restatements 1 · RATIONALE OUT 60 · HISTORY OUT 8 · conflicts 13 · routed open-item edits 3

**Conflicts to resolve:** CANON-C01, CANON-C03, CANON-C05, CANON-C06, RENDERING-C01, RENDERING-C02, RENDERING-C03, RENDERING-C04, RENDERING-C05, RENDERING-C06, RENDERING-C07, RENDERING-C08, SCOPE-C01.

**Routed open-item edits:** NR5-1 (§8.9 TileRasterOpts, request row; §11.1; §12.7 run; §12.8 export canvases); NR5-2 (§9.2 interface; §8.1 @plat/model sentence); NR5-3 (§12.7).

**STATE — facts whose canonical home is in this part** (by home section; the fact id is the inventory id of its home statement; `canon.json → facts` holds each with every place it is stated):

* **§8** (1; 0 stated more than once): RENDERING-001
* **§8.1** (35; 20 stated more than once): RENDERING-022, RENDERING-029, RENDERING-002, RENDERING-003, RENDERING-004, RENDERING-005, RENDERING-006, RENDERING-007, RENDERING-008, RENDERING-009, RENDERING-010, RENDERING-011, RENDERING-012, RENDERING-013, RENDERING-014, RENDERING-015, RENDERING-016, RENDERING-017, RENDERING-018, RENDERING-019, RENDERING-020, RENDERING-021, RENDERING-023, RENDERING-024, RENDERING-025, RENDERING-026, RENDERING-027, RENDERING-028, RENDERING-031, RENDERING-032, RENDERING-034, RENDERING-035, RENDERING-037, RENDERING-038, RENDERING-039
* **§8.2** (67; 39 stated more than once): RENDERING-084, RENDERING-110, RENDERING-044, RENDERING-045, RENDERING-046, RENDERING-047, RENDERING-048, RENDERING-049, RENDERING-050, RENDERING-051, RENDERING-052, RENDERING-053, RENDERING-054, RENDERING-055, RENDERING-057, RENDERING-059, RENDERING-060, RENDERING-062, RENDERING-063, RENDERING-064, RENDERING-068, RENDERING-069, RENDERING-070, RENDERING-071, RENDERING-072, RENDERING-073, RENDERING-074, RENDERING-075, RENDERING-076, RENDERING-077, RENDERING-078, RENDERING-079, RENDERING-080, RENDERING-082, RENDERING-083, RENDERING-085, RENDERING-086, RENDERING-087, RENDERING-088, RENDERING-089, RENDERING-090, RENDERING-091, RENDERING-092, RENDERING-093, RENDERING-094, RENDERING-095, RENDERING-096, RENDERING-097, RENDERING-098, RENDERING-099, RENDERING-100, RENDERING-101, RENDERING-102, RENDERING-103, RENDERING-106, RENDERING-107, RENDERING-108, RENDERING-109, RENDERING-111, RENDERING-112, RENDERING-113, RENDERING-114, RENDERING-115, RENDERING-116, RENDERING-117, RENDERING-118, RENDERING-120
* **§8.3** (32; 24 stated more than once): RENDERING-121, RENDERING-122, RENDERING-123, RENDERING-124, RENDERING-125, RENDERING-126, RENDERING-127, RENDERING-128, RENDERING-129, RENDERING-130, RENDERING-131, RENDERING-132, RENDERING-133, RENDERING-134, RENDERING-135, RENDERING-136, RENDERING-137, RENDERING-138, RENDERING-139, RENDERING-140, RENDERING-141, RENDERING-142, RENDERING-143, RENDERING-144, RENDERING-145, RENDERING-146, RENDERING-147, RENDERING-148, RENDERING-149, RENDERING-150, RENDERING-151, RENDERING-152
* **§8.4** (22; 13 stated more than once): RENDERING-154, RENDERING-153, RENDERING-155, RENDERING-157, RENDERING-158, RENDERING-159, RENDERING-160, RENDERING-161, RENDERING-162, RENDERING-163, RENDERING-164, RENDERING-165, RENDERING-166, RENDERING-167, RENDERING-168, RENDERING-169, RENDERING-170, RENDERING-171, RENDERING-172, RENDERING-173, RENDERING-174, RENDERING-175
* **§8.5** (13; 10 stated more than once): RENDERING-180, RENDERING-192, RENDERING-179, RENDERING-181, RENDERING-182, RENDERING-183, RENDERING-184, RENDERING-185, RENDERING-186, RENDERING-188, RENDERING-190, RENDERING-191, RENDERING-194
* **§8.6** (6; 6 stated more than once): RENDERING-197, RENDERING-198, RENDERING-199, RENDERING-200, RENDERING-201, RENDERING-202
* **§8.7** (4; 4 stated more than once): RENDERING-203, RENDERING-204, RENDERING-205, RENDERING-206
* **§8.8** (21; 18 stated more than once): RENDERING-207, RENDERING-208, RENDERING-209, RENDERING-210, RENDERING-211, RENDERING-212, RENDERING-213, RENDERING-215, RENDERING-216, RENDERING-217, RENDERING-218, RENDERING-219, RENDERING-220, RENDERING-221, RENDERING-222, RENDERING-223, RENDERING-225, RENDERING-226, RENDERING-228, RENDERING-229, RENDERING-230
* **§8.9** (37; 33 stated more than once): RENDERING-241, RENDERING-231, RENDERING-232, RENDERING-233, RENDERING-234, RENDERING-235, RENDERING-237, RENDERING-238, RENDERING-239, RENDERING-240, RENDERING-242, RENDERING-243, RENDERING-244, RENDERING-245, RENDERING-246, RENDERING-247, RENDERING-248, RENDERING-249, RENDERING-250, RENDERING-251, RENDERING-252, RENDERING-253, RENDERING-254, RENDERING-255, RENDERING-256, RENDERING-257, RENDERING-258, RENDERING-259, RENDERING-260, RENDERING-261, RENDERING-262, RENDERING-263, RENDERING-264, RENDERING-265, RENDERING-266, RENDERING-267, RENDERING-268
* **§8.10** (35; 31 stated more than once): RENDERING-284, RENDERING-285, RENDERING-303, RENDERING-275, RENDERING-276, RENDERING-277, RENDERING-278, RENDERING-279, RENDERING-280, RENDERING-281, RENDERING-282, RENDERING-283, RENDERING-287, RENDERING-288, RENDERING-289, RENDERING-290, RENDERING-291, RENDERING-294, RENDERING-295, RENDERING-296, RENDERING-300, RENDERING-301, RENDERING-302, RENDERING-304, RENDERING-306, RENDERING-307, RENDERING-308, RENDERING-309, RENDERING-310, RENDERING-311, RENDERING-313, RENDERING-314, RENDERING-315, RENDERING-317, RENDERING-318
* **§9** (1; 0 stated more than once): RENDERING-324
* **§9.1** (8; 7 stated more than once): RENDERING-327, RENDERING-325, RENDERING-330, RENDERING-326, RENDERING-328, RENDERING-329, RENDERING-331, RENDERING-333
* **§9.2** (22; 19 stated more than once): RENDERING-337, RENDERING-338, RENDERING-339, RENDERING-340, RENDERING-341, RENDERING-342, RENDERING-343, RENDERING-344, RENDERING-345, RENDERING-346, RENDERING-347, RENDERING-348, RENDERING-349, RENDERING-350, RENDERING-351, RENDERING-352, RENDERING-353, RENDERING-354, RENDERING-355, RENDERING-356, RENDERING-357, RENDERING-358
* **§9.3** (5; 3 stated more than once): RENDERING-364, RENDERING-366, RENDERING-367, RENDERING-368, RENDERING-369
* **§9.4** (10; 9 stated more than once): RENDERING-375, RENDERING-371, RENDERING-380, RENDERING-370, RENDERING-372, RENDERING-374, RENDERING-376, RENDERING-377, RENDERING-378, RENDERING-381
* **§9.5** (12; 10 stated more than once): RENDERING-394, RENDERING-383, RENDERING-384, RENDERING-385, RENDERING-386, RENDERING-387, RENDERING-388, RENDERING-389, RENDERING-390, RENDERING-391, RENDERING-393, RENDERING-395
* **§9.6** (3; 3 stated more than once): RENDERING-397, RENDERING-399, RENDERING-400
* **§11** (1; 0 stated more than once): RENDERING-401
* **§11.1** (36; 29 stated more than once): RENDERING-404, RENDERING-403, RENDERING-405, RENDERING-406, RENDERING-407, RENDERING-408, RENDERING-409, RENDERING-410, RENDERING-411, RENDERING-412, RENDERING-413, RENDERING-414, RENDERING-415, RENDERING-416, RENDERING-417, RENDERING-418, RENDERING-419, RENDERING-421, RENDERING-422, RENDERING-423, RENDERING-424, RENDERING-425, RENDERING-427, RENDERING-429, RENDERING-430, RENDERING-431, RENDERING-432, RENDERING-433, RENDERING-436, RENDERING-437, RENDERING-438, RENDERING-439, RENDERING-441, RENDERING-442, RENDERING-443, RENDERING-444
* **§11.2** (11; 11 stated more than once): RENDERING-457, RENDERING-450, RENDERING-446, RENDERING-447, RENDERING-448, RENDERING-449, RENDERING-451, RENDERING-453, RENDERING-455, RENDERING-456, RENDERING-458
* **§11.3** (11; 10 stated more than once): RENDERING-471, RENDERING-461, RENDERING-472, RENDERING-459, RENDERING-460, RENDERING-462, RENDERING-463, RENDERING-464, RENDERING-465, RENDERING-468, RENDERING-470
* **§11.4** (1; 1 stated more than once): RENDERING-473
* **§11.5** (2; 2 stated more than once): RENDERING-476, RENDERING-477
* **§12** (1; 1 stated more than once): RENDERING-480
* **§12.1** (11; 8 stated more than once): RENDERING-481, RENDERING-482, RENDERING-483, RENDERING-484, RENDERING-485, RENDERING-486, RENDERING-487, RENDERING-488, RENDERING-489, RENDERING-491, RENDERING-492
* **§12.2** (4; 4 stated more than once): RENDERING-493, RENDERING-494, RENDERING-495, RENDERING-497
* **§12.3** (14; 13 stated more than once): RENDERING-509, RENDERING-500, RENDERING-501, RENDERING-502, RENDERING-503, RENDERING-504, RENDERING-505, RENDERING-506, RENDERING-507, RENDERING-508, RENDERING-510, RENDERING-511, RENDERING-513, RENDERING-514
* **§12.4** (16; 16 stated more than once): RENDERING-533, RENDERING-519, RENDERING-524, RENDERING-523, RENDERING-516, RENDERING-517, RENDERING-518, RENDERING-520, RENDERING-521, RENDERING-522, RENDERING-525, RENDERING-526, RENDERING-527, RENDERING-528, RENDERING-529, RENDERING-531
* **§12.5** (14; 14 stated more than once): RENDERING-538, RENDERING-534, RENDERING-535, RENDERING-536, RENDERING-537, RENDERING-539, RENDERING-540, RENDERING-541, RENDERING-542, RENDERING-543, RENDERING-544, RENDERING-545, RENDERING-546, RENDERING-547
* **§12.6** (10; 9 stated more than once): RENDERING-561, RENDERING-549, RENDERING-550, RENDERING-551, RENDERING-552, RENDERING-553, RENDERING-554, RENDERING-555, RENDERING-558, RENDERING-560
* **§12.7** (16; 14 stated more than once): RENDERING-577, RENDERING-564, RENDERING-578, RENDERING-563, RENDERING-565, RENDERING-566, RENDERING-567, RENDERING-568, RENDERING-569, RENDERING-570, RENDERING-571, RENDERING-572, RENDERING-573, RENDERING-574, RENDERING-575, RENDERING-576
* **§12.8** (15; 13 stated more than once): RENDERING-586, RENDERING-579, RENDERING-580, RENDERING-581, RENDERING-582, RENDERING-584, RENDERING-587, RENDERING-588, RENDERING-589, RENDERING-590, RENDERING-591, RENDERING-592, RENDERING-593, RENDERING-594, RENDERING-595
* **§12.9** (3; 3 stated more than once): RENDERING-596, RENDERING-597, RENDERING-598

**MOVE IN — state these here (today stated only elsewhere; take the text from the archived location):**

* **DETERMINISM-357** → §11.1: Picture exports (SVG, PNG, VTT) use the view's rotation; GeoJSON keeps model coordinates and records the rotation — from DETERMINISM-357 (determinism, §7.1)

**MOVE OUT — these leave this part (replace by a pointer to the new home):** RENDERING-402 → §13.2.

**REFERENCE — these inventory ids restate a fact homed elsewhere; replace each by a pointer to the home (keep only a part-specific use):**

| inventory id | stated at | fact | home | note |
|---|---|---|---|---|
| RENDERING-030 | §8.1 (4) §8.1 item 4 | DETERMINISM-407 | §7.3 (2) (determinism) |  |
| RENDERING-033 | §8.1 (5) §8.1 item 5 | DETERMINISM-599 | §6.1 (determinism) |  |
| RENDERING-056 | §8.2 | DETERMINISM-160 | §6.1 (determinism) |  |
| RENDERING-081 | §8.2 | MODEL-293 | §2.7 Pin (model) |  |
| RENDERING-156 | §8.4 | PIPELINE-441 | II.6 (pipeline) |  |
| RENDERING-178 | §8.4 | MODEL-269 | §2.6 Heights and the ground datum (model) |  |
| RENDERING-187 | §8.5 | SCOPE-267 | §13.5 table (scope) | the road/ground contrast rule stays in §8.5 |
| RENDERING-195 | §8.5 | DETERMINISM-585 | §7.8 (determinism) |  |
| RENDERING-286 | §8.10 | DETERMINISM-161 | §6.1 (determinism) |  |
| RENDERING-297 | §8.10 | SCOPE-236 | §13.3 (scope) |  |
| RENDERING-312 | §8.10 | DETERMINISM-321 | §7.1 (determinism) |  |
| RENDERING-332 | §9.1 | DETERMINISM-514 | §7.4 warp ground (determinism) |  |
| RENDERING-334 | §9.1 | SCOPE-240 | §13.3 (scope) |  |
| RENDERING-335 | §9.1 | DETERMINISM-328 | §7.1 (determinism) |  |
| RENDERING-365 | §9.3 | SCOPE-326 | §13.7 table (scope) |  |
| RENDERING-373 | §9.4 | PIPELINE-199 | §4.5 (pipeline) |  |
| RENDERING-396 | §9.6 | DETERMINISM-224 | §6.3 (determinism) |  |
| RENDERING-398 | §9.6 | DETERMINISM-232 | §6.3 (determinism) |  |
| RENDERING-420 | §11.1 | DETERMINISM-269 | §6.4 (determinism) |  |
| RENDERING-452 | §11.2 | DETERMINISM-455 | §7.3 (4) (determinism) |  |
| RENDERING-466 | §11.3 | MODEL-428 | §2.9 View state (model) |  |
| RENDERING-467 | §11.3 | PIPELINE-387 | §10.3 (pipeline) |  |
| RENDERING-474 | §11.4 | MODEL-379 | §2.9 pack set bullet (model) |  |
| RENDERING-475 | §11.4 | SCOPE-552 | Staged by the roadmap (scope) |  |
| RENDERING-496 | §12.2 | SCOPE-076 | §1.1 (scope) |  |
| RENDERING-499 | §12.3 | PIPELINE-044 | §4.1 (pipeline) |  |
| RENDERING-557 | §12.6 | MODEL-392 | §2.9 load step 3 (model) |  |
| RENDERING-562 | §12.6 | DETERMINISM-586 | §7.8 (determinism) |  |
| RENDERING-585 | §12.8 | PIPELINE-047 | §4.1 (pipeline) |  |

**Summary / section restatements** (plain-words lead or a line restating a section; point to the section; keep only canonical figures): RENDERING-036 (§8.1 (5) §8.1 item 5) → §6.3.

**RATIONALE OUT** (remove the "because" text, keep the chosen rule where it is not stated elsewhere, leave "(J-x)"): RENDERING-040 → J-R1; RENDERING-041 → J-R2; RENDERING-042 → J-R19; RENDERING-043 → J-R20; RENDERING-061 → J-R30; RENDERING-065 → J-R3; RENDERING-066 → J-R29; RENDERING-067 → J-R28; RENDERING-379 → J-R28; RENDERING-104 → J-R39; RENDERING-105 → J-R39; RENDERING-119 → J-R4; RENDERING-176 → J-R54; RENDERING-177 → J-R54; RENDERING-189 → J-R5; RENDERING-193 → J-R6; RENDERING-196 → J-R7 (+J-I2); RENDERING-214 → J-R21; RENDERING-224 → J-R22; RENDERING-227 → J-R8; RENDERING-236 → J-R9; RENDERING-269 → J-R40; RENDERING-270 → J-R40; RENDERING-271 → J-R46; RENDERING-272 → J-R51; RENDERING-363 → J-R51; RENDERING-273 → J-R10; RENDERING-274 → J-R23; RENDERING-292 → J-R50; RENDERING-293 → J-R50; RENDERING-323 → J-R50; RENDERING-299 → J-R42; RENDERING-305 → J-R52; RENDERING-316 → J-R24; RENDERING-319 → J-R11; RENDERING-320 → J-R25; RENDERING-321 → J-R55; RENDERING-322 → J-R48; RENDERING-336 → J-R12; RENDERING-359 → J-R26; RENDERING-360 → J-R45; RENDERING-361 → J-R45; RENDERING-362 → J-R27; RENDERING-392 → J-R13; RENDERING-426 → J-R31; RENDERING-428 → J-R32; RENDERING-434 → J-R41; RENDERING-435 → J-R47; RENDERING-440 → J-R43; RENDERING-445 → J-R14; RENDERING-454 → J-R33; RENDERING-469 → J-R34; RENDERING-478 → J-R15; RENDERING-479 → J-R16; RENDERING-490 → J-R49; RENDERING-512 → J-R44; RENDERING-515 → J-R56; RENDERING-548 → J-R35; RENDERING-559 → J-R36; RENDERING-599 → J-R18.

**HISTORY OUT** (drop; keep at most a one-line receipt pointer beside the fact it supports): RENDERING-058 (§8.2); RENDERING-298 (§8.10); RENDERING-382 (§9.4); RENDERING-498 (§12.2); RENDERING-530 (§12.4); RENDERING-532 (§12.4); RENDERING-556 (§12.6); RENDERING-583 (§12.8).

## Part SCOPE — title, one-page summary, §0, PART I heading, §1, §13–§17, Delegated decisions, Judgment calls (index), Staged by the roadmap, Appendix A

STATE 470 facts · MOVE IN 10 · MOVE OUT 0 · REFERENCE 36 · summary/section restatements 37 · RATIONALE OUT 3 · HISTORY OUT 13 · conflicts 22 · routed open-item edits 13

**Conflicts to resolve:** CANON-C03, CANON-C08, CANON-C09, CANON-C10, CF-PIPE-02, CF-PIPE-07, CF-PIPE-10, DETERMINISM-C-2, KERNEL-C01, KERNEL-C06, KERNEL-C12, MODEL-C03, RENDERING-C01, RENDERING-C02, SCOPE-C01, SCOPE-C02, SCOPE-C03, SCOPE-C04, SCOPE-C06, SCOPE-C07, SCOPE-C10, SCOPE-C11.

**Routed open-item edits:** NR5-1 (§14); NR5-2 (§14); VK5-1 (§13.1); VK5-2 (§13.1); NP5-2 (J-I18); NP5-4 (§14); VD5-3 (§13.2 naming-input fixtures (fact SCOPE-207)); VD5-4 (§13.2); VD5-5 (§13.2); VD5-7 (§16 M2a row and exit); VS5-1 (§16 M1 content and exit; J-S40); VS5-2 (§13.6 (2); D5Pair NG comment; J-S34); VS5-3 (§17.1 (4); D-29 pointer).

**STATE — facts whose canonical home is in this part** (by home section; the fact id is the inventory id of its home statement; `canon.json → facts` holds each with every place it is stated):

* **title** (5; 3 stated more than once): SCOPE-001, SCOPE-002, SCOPE-003, SCOPE-005, SCOPE-006
* **§0.1** (2; 1 stated more than once): SCOPE-038, SCOPE-039
* **§0.2** (1; 1 stated more than once): SCOPE-040
* **§0.4** (7; 1 stated more than once): SCOPE-042, SCOPE-043, SCOPE-044, SCOPE-045, SCOPE-046, SCOPE-047, SCOPE-048
* **§0.5** (3; 1 stated more than once): SCOPE-049, SCOPE-050, SCOPE-051
* **§0.6** (1; 1 stated more than once): SCOPE-053
* **§0.11** (1; 0 stated more than once): SCOPE-059
* **§1** (1; 1 stated more than once): SCOPE-060
* **§1.1** (11; 6 stated more than once): SCOPE-063, SCOPE-076, SCOPE-061, SCOPE-062, SCOPE-064, SCOPE-065, SCOPE-066, SCOPE-067, SCOPE-068, SCOPE-074, SCOPE-075
* **§1.2** (3; 1 stated more than once): SCOPE-077, SCOPE-079, SCOPE-080
* **§1.3** (2; 1 stated more than once): SCOPE-081, SCOPE-082
* **§1.4** (20; 8 stated more than once): SCOPE-083, SCOPE-084, SCOPE-085, SCOPE-086, SCOPE-087, SCOPE-088, SCOPE-089, SCOPE-090, SCOPE-091, SCOPE-092, SCOPE-093, SCOPE-094, SCOPE-095, SCOPE-096, SCOPE-097, SCOPE-098, SCOPE-099, SCOPE-100, SCOPE-101, SCOPE-102
* **§1.7** (10; 6 stated more than once): SCOPE-108, SCOPE-109, SCOPE-110, SCOPE-111, SCOPE-112, SCOPE-113, SCOPE-114, SCOPE-115, SCOPE-116, SCOPE-117
* **§13** (1; 1 stated more than once): SCOPE-118
* **§13.1** (41; 12 stated more than once): SCOPE-158, SCOPE-125, SCOPE-156, SCOPE-145, SCOPE-124, SCOPE-155, SCOPE-126, SCOPE-142, SCOPE-119, SCOPE-159, SCOPE-120, SCOPE-121, SCOPE-122, SCOPE-123, SCOPE-127, SCOPE-128, SCOPE-129, SCOPE-130, SCOPE-131, SCOPE-132, SCOPE-133, SCOPE-134, SCOPE-135, SCOPE-136, SCOPE-137, SCOPE-138, SCOPE-139, SCOPE-140, SCOPE-141, SCOPE-143, SCOPE-144, SCOPE-146, SCOPE-147, SCOPE-148, SCOPE-149, SCOPE-150, SCOPE-151, SCOPE-152, SCOPE-153, SCOPE-154, SCOPE-157
* **§13.2** (43; 22 stated more than once): SCOPE-188, SCOPE-203, SCOPE-184, SCOPE-205, SCOPE-185, SCOPE-168, SCOPE-178, SCOPE-183, SCOPE-191, SCOPE-193, SCOPE-207, SCOPE-212, SCOPE-202, SCOPE-160, SCOPE-162, SCOPE-163, SCOPE-164, SCOPE-165, SCOPE-166, SCOPE-170, SCOPE-179, SCOPE-181, SCOPE-186, SCOPE-187, SCOPE-189, SCOPE-190, SCOPE-192, SCOPE-194, SCOPE-195, SCOPE-196, SCOPE-197, SCOPE-198, SCOPE-199, SCOPE-206, SCOPE-210, SCOPE-213, SCOPE-214, SCOPE-215, SCOPE-216, SCOPE-217, SCOPE-218, SCOPE-219, SCOPE-220
* **§13.3** (18; 10 stated more than once): SCOPE-240, SCOPE-222, SCOPE-236, SCOPE-221, SCOPE-223, SCOPE-224, SCOPE-225, SCOPE-226, SCOPE-227, SCOPE-228, SCOPE-229, SCOPE-230, SCOPE-231, SCOPE-232, SCOPE-234, SCOPE-235, SCOPE-237, SCOPE-239
* **§13.4** (5; 1 stated more than once): SCOPE-241, SCOPE-242, SCOPE-246, SCOPE-247, SCOPE-248
* **§13.5** (41; 21 stated more than once): SCOPE-277, SCOPE-263, SCOPE-267, SCOPE-249, SCOPE-250, SCOPE-251, SCOPE-252, SCOPE-253, SCOPE-254, SCOPE-255, SCOPE-256, SCOPE-257, SCOPE-258, SCOPE-259, SCOPE-260, SCOPE-261, SCOPE-262, SCOPE-264, SCOPE-265, SCOPE-266, SCOPE-268, SCOPE-269, SCOPE-270, SCOPE-271, SCOPE-272, SCOPE-273, SCOPE-274, SCOPE-275, SCOPE-276, SCOPE-278, SCOPE-279, SCOPE-280, SCOPE-281, SCOPE-282, SCOPE-283, SCOPE-284, SCOPE-285, SCOPE-286, SCOPE-287, SCOPE-288, SCOPE-289
* **§13.6** (27; 15 stated more than once): SCOPE-290, SCOPE-291, SCOPE-292, SCOPE-293, SCOPE-294, SCOPE-295, SCOPE-296, SCOPE-297, SCOPE-298, SCOPE-299, SCOPE-300, SCOPE-301, SCOPE-302, SCOPE-303, SCOPE-304, SCOPE-305, SCOPE-306, SCOPE-307, SCOPE-308, SCOPE-309, SCOPE-310, SCOPE-311, SCOPE-312, SCOPE-313, SCOPE-314, SCOPE-315, SCOPE-316
* **§13.7** (21; 11 stated more than once): SCOPE-326, SCOPE-317, SCOPE-318, SCOPE-319, SCOPE-320, SCOPE-321, SCOPE-322, SCOPE-323, SCOPE-324, SCOPE-325, SCOPE-327, SCOPE-328, SCOPE-329, SCOPE-330, SCOPE-331, SCOPE-332, SCOPE-333, SCOPE-334, SCOPE-335, SCOPE-336, SCOPE-337
* **§13.8** (5; 4 stated more than once): SCOPE-338, SCOPE-339, SCOPE-340, SCOPE-342, SCOPE-343
* **§13.9** (3; 3 stated more than once): SCOPE-344, SCOPE-345, SCOPE-346
* **§14** (40; 20 stated more than once): SCOPE-347, SCOPE-348, SCOPE-349, SCOPE-350, SCOPE-351, SCOPE-352, SCOPE-353, SCOPE-354, SCOPE-355, SCOPE-356, SCOPE-357, SCOPE-358, SCOPE-359, SCOPE-360, SCOPE-361, SCOPE-362, SCOPE-363, SCOPE-365, SCOPE-366, SCOPE-368, SCOPE-369, SCOPE-370, SCOPE-371, SCOPE-372, SCOPE-374, SCOPE-375, SCOPE-376, SCOPE-377, SCOPE-378, SCOPE-379, SCOPE-380, SCOPE-382, SCOPE-385, SCOPE-386, SCOPE-387, SCOPE-388, SCOPE-389, SCOPE-390, SCOPE-391, SCOPE-392
* **§15** (1; 0 stated more than once): SCOPE-393
* **§15.1** (15; 6 stated more than once): SCOPE-394, SCOPE-395, SCOPE-396, SCOPE-397, SCOPE-398, SCOPE-399, SCOPE-400, SCOPE-401, SCOPE-402, SCOPE-403, SCOPE-404, SCOPE-406, SCOPE-407, SCOPE-408, SCOPE-409
* **§15.2** (28; 24 stated more than once): SCOPE-421, SCOPE-410, SCOPE-411, SCOPE-412, SCOPE-413, SCOPE-414, SCOPE-415, SCOPE-416, SCOPE-417, SCOPE-418, SCOPE-419, SCOPE-420, SCOPE-422, SCOPE-424, SCOPE-425, SCOPE-426, SCOPE-427, SCOPE-428, SCOPE-429, SCOPE-430, SCOPE-431, SCOPE-432, SCOPE-433, SCOPE-434, SCOPE-435, SCOPE-436, SCOPE-437, SCOPE-438
* **§16** (36; 30 stated more than once): SCOPE-439, SCOPE-440, SCOPE-441, SCOPE-442, SCOPE-443, SCOPE-444, SCOPE-445, SCOPE-446, SCOPE-447, SCOPE-448, SCOPE-449, SCOPE-450, SCOPE-451, SCOPE-452, SCOPE-453, SCOPE-454, SCOPE-455, SCOPE-456, SCOPE-457, SCOPE-458, SCOPE-459, SCOPE-460, SCOPE-461, SCOPE-462, SCOPE-463, SCOPE-464, SCOPE-465, SCOPE-466, SCOPE-467, SCOPE-468, SCOPE-469, SCOPE-470, SCOPE-472, SCOPE-473, SCOPE-475, SCOPE-476
* **§17** (1; 1 stated more than once): SCOPE-477
* **§17.1** (20; 10 stated more than once): SCOPE-478, SCOPE-479, SCOPE-480, SCOPE-481, SCOPE-482, SCOPE-483, SCOPE-484, SCOPE-485, SCOPE-486, SCOPE-487, SCOPE-490, SCOPE-491, SCOPE-492, SCOPE-493, SCOPE-494, SCOPE-495, SCOPE-496, SCOPE-497, SCOPE-498, SCOPE-499
* **§17.2** (2; 1 stated more than once): SCOPE-500, SCOPE-501
* **§17.3** (2; 2 stated more than once): SCOPE-502, SCOPE-503
* **§17.4** (5; 4 stated more than once): SCOPE-504, SCOPE-505, SCOPE-506, SCOPE-507, SCOPE-508
* **Delegated decisions** (36; 32 stated more than once): SCOPE-518, SCOPE-523, SCOPE-532, SCOPE-509, SCOPE-510, SCOPE-511, SCOPE-512, SCOPE-513, SCOPE-514, SCOPE-515, SCOPE-516, SCOPE-517, SCOPE-519, SCOPE-520, SCOPE-521, SCOPE-522, SCOPE-524, SCOPE-525, SCOPE-526, SCOPE-527, SCOPE-528, SCOPE-529, SCOPE-530, SCOPE-531, SCOPE-533, SCOPE-534, SCOPE-535, SCOPE-536, SCOPE-537, SCOPE-538, SCOPE-539, SCOPE-540, SCOPE-541, SCOPE-542, SCOPE-543, SCOPE-544
* **Judgment calls** (1; 1 stated more than once): SCOPE-558
* **Staged** (8; 8 stated more than once): SCOPE-552, SCOPE-545, SCOPE-546, SCOPE-547, SCOPE-548, SCOPE-549, SCOPE-550, SCOPE-551
* **Appendix A** (3; 3 stated more than once): SCOPE-553, SCOPE-554, SCOPE-555

**MOVE IN — state these here (today stated only elsewhere; take the text from the archived location):**

* **MODEL-274** → §13.2: Heights acceptance: heights on 100 % of buildings, wings, towers and wall runs; on hilly golden seeds and after every terrain stroke 0 wings whose baseCm differs from highest terrain sample under the wing + plinth, user-edited bases excepted (rule exact, §7.3 (a)) — from MODEL-274 (model, §2.6 Heights and ground datum)
* **MODEL-339** → §13.2: M4 test (with the epoch path): a 20-epoch TOWN with ≈30 % churn per epoch keeps heap ≤ 1.3× and document ≤ 2× those of a freshly generated town with the same live entities — from MODEL-339 (model, §2.8 History)
* **MODEL-354** → §13.2: A CI test fails when a type is missing from any path — generation, digest, render, export, persistence, edit, undo, migration (VG palisade ghost cannot recur; O11 a; owner amendment 5, §7.1) — from MODEL-354 (model, §2.8 entity registry)
* **MODEL-430** → §13.2: Round trip is a hard test: export → import → export byte-identical over the canonical form (O9 a, O11 c) — from MODEL-430 (model, §2.9 Round trip); RENDERING-402 (rendering, §11.1)
* **KERNEL-129** → §13.2: Callback-form test is issue-order determinism: the stage run twice, on a slot-renumbered arena, and inside the pool at sizes 0–3 gives identical digests; op permutation does not apply. — from DETERMINISM-294 (determinism, §6.5 (9)); KERNEL-129 (kernel, §3.3)
* **KERNEL-131** → §13.1: Slot-renumbering property test: renumber the arena's slots and require identical output. — from KERNEL-131 (kernel, §3.3)
* **KERNEL-282** → §13.1: Slide fixture (§13.1): a warp with fromLevel = 1 over a street that ends on a shore moves the junction along the shore and commits. — from KERNEL-282 (kernel, §3.6)
* **KERNEL-343** → §13.1: Skeleton M0 fixtures: squares and rectangles at every centidegree 0°–90°; regular n-gons n = 3…64; equal-width strips; rotated L, T and U shapes; near-rectangles with a notch on a long side (must take the skeleton path and pass the validator); 1 000 holed polygons; snapped rotated squares; plus the B-CITY-lite corpus of irregular footprints and district and water faces. — from KERNEL-343 (kernel, §3.8)
* **KERNEL-363** → §13.1: Kernel round-trip test: save → load → save is byte-identical and the loaded arena passes every hard invariant (§3.10). — from KERNEL-363 (kernel, §3.9)
* **PIPELINE-228** → §16: M0 (b) includes curved, round-joined, triangular, C-shaped and holed faces and re-measures the NG signature on them before calibration. — from PIPELINE-228 (pipeline, §4.6)

**REFERENCE — these inventory ids restate a fact homed elsewhere; replace each by a pointer to the home (keep only a part-specific use):**

| inventory id | stated at | fact | home | note |
|---|---|---|---|---|
| SCOPE-069 | §1.1 | RENDERING-502 | §12.3 (rendering) |  |
| SCOPE-070 | §1.1 | RENDERING-504 | §12.3 (rendering) |  |
| SCOPE-071 | §1.1 | RENDERING-538 | §12.5 (rendering) |  |
| SCOPE-078 | §1.2 | RENDERING-194 | §8.5 (rendering) |  |
| SCOPE-103 | §1.5 | PIPELINE-327 | §4.11 (pipeline) |  |
| SCOPE-105 | §1.5 | PIPELINE-355 | §4.11 (pipeline) |  |
| SCOPE-161 | §13.2 | DETERMINISM-119 | §5.3 (determinism) |  |
| SCOPE-167 | §13.2 | RENDERING-552 | §12.6 (rendering) |  |
| SCOPE-169 | §13.2 | RENDERING-594 | §12.8 (rendering) |  |
| SCOPE-171 | §13.2 | RENDERING-578 | §12.7 (rendering) |  |
| SCOPE-172 | §13.2 | RENDERING-539 | §12.5 (rendering) |  |
| SCOPE-173 | §13.2 | RENDERING-575 | §12.7 (rendering) |  |
| SCOPE-174 | §13.2 | RENDERING-513 | §12.3 (rendering) |  |
| SCOPE-175 | §13.2 | RENDERING-488 | §12.1 (rendering) |  |
| SCOPE-176 | §13.2 | DETERMINISM-291 | §6.5 (9) (determinism) |  |
| SCOPE-180 | §13.2 | RENDERING-146 | §8.3 (rendering) |  |
| SCOPE-182 | §13.2 | RENDERING-136 | §8.3 (rendering) |  |
| SCOPE-200 | §13.2 | DETERMINISM-469 | §7.3 (7) (vi) (determinism) |  |
| SCOPE-201 | §13.2 | DETERMINISM-467 | §7.3 (7) (v) (determinism) |  |
| SCOPE-204 | §13.2 | DETERMINISM-298 | §6.5 (9) (determinism) |  |
| SCOPE-208 | §13.2 | DETERMINISM-298 | §6.5 (9) (determinism) |  |
| SCOPE-209 | §13.2 | DETERMINISM-300 | §6.5 (9) (determinism) |  |
| SCOPE-211 | §13.2 | DETERMINISM-524 | §7.4 MFCG asks (determinism) |  |
| SCOPE-233 | §13.3 | DETERMINISM-282 | §6.5 (3) (determinism) |  |
| SCOPE-238 | §13.3 | DETERMINISM-263 | §6.4 (determinism) |  |
| SCOPE-243 | §13.4 | RENDERING-380 | §9.4 (rendering) |  |
| SCOPE-244 | §13.4 | RENDERING-132 | §8.3 (rendering) |  |
| SCOPE-245 | §13.4 | RENDERING-107 | §8.2 (rendering) |  |
| SCOPE-341 | §13.8 | RENDERING-489 | §12.1 (rendering) |  |
| SCOPE-367 | §14 | DETERMINISM-282 | §6.5 (3) (determinism) |  |
| SCOPE-373 | §14 interfaces | DETERMINISM-139 | §6.1 (determinism) |  |
| SCOPE-381 | §14 interfaces | RENDERING-346 | §9.2 (rendering) |  |
| SCOPE-383 | §14 interfaces | RENDERING-251 | §8.9 (rendering) |  |
| SCOPE-384 | §14 interfaces | RENDERING-252 | §8.9 (rendering) |  |
| SCOPE-405 | §15.1 FTG | RENDERING-538 | §12.5 (rendering) |  |
| SCOPE-423 | §15.2 | PIPELINE-321 | §4.9 (pipeline) |  |

**Summary / section restatements** (plain-words lead or a line restating a section; point to the section; keep only canonical figures): SCOPE-007 (one-page summary) → §1.1; SCOPE-008 (one-page summary) → §1; SCOPE-009 (one-page summary) → §4.2; SCOPE-010 (one-page summary) → §4.2; SCOPE-011 (one-page summary) → §4.2; SCOPE-012 (one-page summary) → §4.8; SCOPE-013 (one-page summary) → §4.3; SCOPE-014 (one-page summary) → §4.5; SCOPE-015 (one-page summary) → §4.7; SCOPE-016 (one-page summary) → §2.6; SCOPE-017 (one-page summary) → §4.9; SCOPE-018 (one-page summary) → §8; SCOPE-019 (one-page summary) → §11.1; SCOPE-020 (one-page summary) → §12.5; SCOPE-021 (one-page summary) → §12.3; SCOPE-022 (one-page summary) → §9.4; SCOPE-023 (one-page summary) → §7.1; SCOPE-024 (one-page summary) → §7.3; SCOPE-025 (one-page summary) → §2.6; SCOPE-026 (one-page summary) → §6.3; SCOPE-027 (one-page summary) → §2.9; SCOPE-028 (one-page summary) → §2.9; SCOPE-029 (one-page summary) → §6.4; SCOPE-030 (one-page summary) → §7.4; SCOPE-031 (one-page summary) → §6; SCOPE-032 (one-page summary) → §5; SCOPE-033 (one-page summary) → §16; SCOPE-034 (one-page summary) → §13; SCOPE-035 (one-page summary) → §16; SCOPE-036 (one-page summary) → §17; SCOPE-037 (one-page summary) → Staged; SCOPE-072 (§1.1) → §4.2; SCOPE-104 (§1.5) → §4.11; SCOPE-106 (§1.6) → II.1; SCOPE-107 (§1.6) → PART III; SCOPE-177 (§13.2) → §6.5; SCOPE-364 (§14) → §4.1.

**RATIONALE OUT** (remove the "because" text, keep the chosen rule where it is not stated elsewhere, leave "(J-x)"): SCOPE-073 → J-S13; SCOPE-474 → J-S6 (+D-20); SCOPE-489 → J-S32 (+J-S35).

**HISTORY OUT** (drop; keep at most a one-line receipt pointer beside the fact it supports): SCOPE-004 (title block); SCOPE-041 (§0.3); SCOPE-052 (§0.6); SCOPE-054 (§0.7); SCOPE-055 (§0.8); SCOPE-056 (§0.9); SCOPE-057 (§0.10); SCOPE-058 (§0.11); SCOPE-471 (§16); SCOPE-488 (§17.1 (2)); SCOPE-556 (Appendix A.4); SCOPE-557 (Appendix A.5); SCOPE-559 (Judgment calls header).

**Judgment calls index:** one row per J id — 276 rows (269 existing + 7 new: J-P50, J-DET-52, J-DET-53, J-DET-54, J-K36, J-R55, J-R56).

## Detail gaps (union on merge, rule R13)

Facts whose restatements carry a number the home statement lacks. The home's editor checks each and, where the number is part of the same fact, states it at the home. (Heuristic on numbers only; a restatement's qualifiers need the same care.)

* **KERNEL-311** (§3.7): MODEL-051: 0
* **KERNEL-020** (§3.1): MODEL-067: 1.36 cm, 1.49 cm; MODEL-068: 0.71 cm
* **KERNEL-162** (§3.3): MODEL-086: 5
* **MODEL-095** (§2.2 rule 5 Stretches): DETERMINISM-441: 5
* **KERNEL-118** (§3.3 rule 2): MODEL-126: 0, 1
* **PIPELINE-164** (§4.4 S5a): MODEL-129: 3
* **KERNEL-143** (§3.3 step 1): MODEL-136: 0, 0.5 MB, 1
* **DETERMINISM-428** (§7.3 (b) 1): MODEL-177: 0
* **SCOPE-188** (§13.2): MODEL-244: 3
* **SCOPE-203** (§13.2): MODEL-282: 3
* **SCOPE-184** (§13.2): DETERMINISM-049: 95 %
* **RENDERING-022** (§8.1 (2) §8.1 item 2): KERNEL-039: 4 m
* **PIPELINE-285** (§4.8): MODEL-310: 0
* **PIPELINE-083** (§4.2 S1 (5)): DETERMINISM-046: 2, 4; MODEL-313: 3
* **PIPELINE-080** (§4.2 S1 (5)): MODEL-315: 5
* **PIPELINE-082** (§4.2 S1 (5)): MODEL-316: 5
* **DETERMINISM-192** (§6.2): MODEL-321: 3, 4; MODEL-351: 3, 4
* **DETERMINISM-231** (§6.3): MODEL-345: 4
* **DETERMINISM-200** (§6.2): MODEL-388: 150 m, 4 m
* **MODEL-392** (§2.9 load step 3): RENDERING-557: 0, 3, 35, 38 m, 4
* **MODEL-397** (§2.9 load step 3): DETERMINISM-118: 3
* **RENDERING-471** (§11.3): MODEL-407: 3 MB
* **KERNEL-353** (§3.9): MODEL-415: 128
* **RENDERING-284** (§8.10): KERNEL-038: 4 m
* **DETERMINISM-280** (§6.5 (2)): KERNEL-057: 5.3
* **DETERMINISM-402** (§7.3 (2)): KERNEL-111: 2
* **PIPELINE-344** (§4.11 (4)): KERNEL-122: 8
* **KERNEL-147** (§3.3 step 2): DETERMINISM-288: 5
* **RENDERING-519** (§12.4): KERNEL-322: 12 µs
* **PIPELINE-241** (§4.6 (8)): KERNEL-236: 3
* **SCOPE-124** (§13.1): KERNEL-262: 10, 3, 4, 5, 6, 7, 8, 9
* **KERNEL-288** (§3.6): DETERMINISM-350: 8
* **SCOPE-155** (§13.1): KERNEL-315: 5
* **RENDERING-524** (§12.4): KERNEL-318: 25 m, 25 µs, 3 m
* **KERNEL-320** (§3.7): DETERMINISM-303: 0, 4, 9
* **DETERMINISM-302** (§6.5 (10)): KERNEL-324: 8 µs
* **RENDERING-538** (§12.5): PIPELINE-022: 120000; SCOPE-071: 120000; SCOPE-405: 120000, 13600, 17700, 3400, 4500, 45800, 58800
* **RENDERING-509** (§12.3): PIPELINE-048: 10 %
* **RENDERING-500** (§12.3): PIPELINE-049: 0, 3
* **DETERMINISM-564** (§7.7 (1)): PIPELINE-053: 200
* **PIPELINE-065** (§4.2 S1 (2)): DETERMINISM-393: 2
* **PIPELINE-123** (§4.2 S3 (9)): DETERMINISM-107: 1, 9
* **SCOPE-263** (§13.5 table): PIPELINE-174: 60 m
* **DETERMINISM-388** (§7.2 field brushes): DETERMINISM-389: 0.01; PIPELINE-211: 0.01
* **RENDERING-523** (§12.4): PIPELINE-256: 2.3 m, 3 m
* **PIPELINE-295** (§4.8 castle): DETERMINISM-053: 0, 11, 178
* **RENDERING-110** (§8.2): PIPELINE-431: 25
* **SCOPE-119** (§13.1): DETERMINISM-030: 0 m, 0 s, 10, 6
* **SCOPE-159** (§13.1): DETERMINISM-061: 0, 1000
* **DETERMINISM-467** (§7.3 (7) (v)): DETERMINISM-079: 0, 0 ha, 0 s
* **RENDERING-586** (§12.8): DETERMINISM-190: 15000, 16 B, 30000
* **SCOPE-207** (§13.2): DETERMINISM-259: 0, 0 s, 4
* **DETERMINISM-291** (§6.5 (9)): SCOPE-176: 0, 3
* **DETERMINISM-298** (§6.5 (9)): SCOPE-208: 4
* **DETERMINISM-407** (§7.3 (2)): RENDERING-030: 2
* **DETERMINISM-455** (§7.3 (4)): RENDERING-452: 4
* **SCOPE-212** (§13.2): DETERMINISM-465: 0.01, 0.25 s, 0.6, 0.8, 1, 1.0, 1.4 %, 1.5, 10, 400 s, 92, 95 %, 99.3 %, 99.5 %
* **DETERMINISM-599** (§6.1): RENDERING-033: 0, 1
* **RENDERING-132** (§8.3): SCOPE-244: 95 %
* **RENDERING-146** (§8.3): SCOPE-180: 1
* **RENDERING-489** (§12.1): SCOPE-341: 15 %
* **RENDERING-502** (§12.3): SCOPE-069: 1.25 ×
* **RENDERING-504** (§12.3): SCOPE-070: 1 s, 1.25 ×, 1.92 s, 100 m, 2.4 s, 300 m
* **RENDERING-594** (§12.8): SCOPE-169: 0, 3

## Verification of this canon

* CONFIRMED (executed): every one of the 3294 inventory ids is mapped exactly once in `by_inventory_id` (asserted by the build script); every conflict item id exists in an inventory; the 64 inventory conflicts are all present (62 entries + 2 merged duplicates, KERNEL-C01 ≡ SCOPE-C05 and CF-PIPE-07 ≡ SCOPE-C08); the facts whose home is another part carry an explicit decision (632 cross-part items reviewed one by one against their best text matches).
* CONFIRMED (read in the document): CANON-C01 (l.1587 vs l.7086, l.7243), CANON-C02 (l.530–531 vs l.2238), CANON-C06 (l.8097 rung (6) ≤ 20 % vs l.8125), CANON-C07 (l.6273), RENDERING-C04 (l.7518 vs l.8739–8740), DETERMINISM-C-8 (l.6119 S4 row vs l.6122 S7 row), GAP-1 (l.5181 is the only statement of k, in every round's draft too).
* PLAUSIBLE: the choice of home where two parts claimed one fact (rules R1–R13 applied by reading), the canon's four option choices for NP5-2, NP5-4, VD5-2 and VD5-5, and the conflicts marked PLAUSIBLE. A match between a restatement and its home was accepted only where the texts state the same fact; an unsure one was left as the part's own fact (no silent merge).
