# ARCHITECTURE-RATIONALE — why PLAT is designed the way it is, and how the design got here

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat consistency/rewrite-scope; queued in docs/FABLE-REVIEW-QUEUE.md.

This file is the companion of `docs/ARCHITECTURE.md`. The consistency pass of 2026-09-26 gave every normative fact of
the design one home in that document and moved out of it everything that explains *why* or records *how the text came
to be*: the full judgment calls ("chose X over Y because Z"), the delegated decisions' plain-words rationale, the
provenance and round-by-round history of the design, the design seats' reading records, and the longer inline
reasoning each part's sections carried. The text below is verbatim from the document as it stood before the pass
(`docs/ARCHITECTURE.md` of 2026-09-26, 11 477 lines), except the amendments the pass's conflict rulings and round-5
items required, each marked *(amended by the consistency pass)* where it is made, and the per-section review banners,
which the document now carries once. Nothing here is normative: where this file and `docs/ARCHITECTURE.md` differ, the
architecture document wins; the per-item dispositions of the fix rounds are `docs/ARCHITECTURE-VALIDATION.md` and
`docs/validation/`.

Parts: **A** the judgment calls (the architecture document keeps a one-line index of them); **B** provenance and the
history of the fix rounds (formerly §0); **C** the reading records (formerly Appendix A); **D** the delegated decisions
with their rationale; **E** rationale and history moved out of the scope sections (§1, §13–§17, the Staged list); **F**
the longer inline reasoning moved out of the other parts' sections (§2–§12), by judgment id.

## Part A — Judgment calls ("chose X over Y because Z"; each vetoable)

J-1 – J-18 are the synthesis seat's (seven amended by the fix-all pass). The rows added on 2026-09-25 keep their area
prefixes — J-K (kernel), J-DET (determinism), J-P (pipeline), J-R (rendering), J-S (scope) — because the blocks that
made them cite them by those ids; the full reasoning of each sits in the section it names. The J-I rows are the
integration seat's: each settles a disagreement between two area drafts (the record is
`docs/validation/fix-all/r1-integration-log.md` §3). Round 2 of the fix-all pass added J-K9 – J-K21, J-DET-16 –
J-DET-28, J-P26 – J-P33, J-R19 – J-R37 and J-S20 – J-S27, and restated J-K2, J-K5, J-K6, J-K8, J-R7, J-R9, J-R17, J-I2,
J-I5, J-P3 and J-S4; its integration seat added J-I9 – J-I11 and amended J-K14 (the record is
`docs/validation/fix-all/r2-integration-log.md` §4, its conflict table). Round 3 added J-K22 – J-K27, J-DET-29 –
J-DET-39, J-P34 – J-P40, J-R38 – J-R43 and J-S28 – J-S32, and restated J-K6, J-K14, J-K17, J-K18, J-DET-14, J-DET-23,
J-R19 and J-S4; its integration seat added J-I12 – J-I14 and amended J-K24, J-I10 and J-I11 (the record is
`docs/validation/fix-all/r3-integration-log.md` §4, its conflict table). Round 4 added J-K28 – J-K33, J-DET-40 –
J-DET-43, J-P41 – J-P46, J-R44 – J-R49 and J-S33 – J-S38, and restated J-K11, J-K16, J-K25, J-K26, J-DET-23, J-DET-35,
J-DET-37 – J-DET-39, J-P34, J-P35, J-R17, J-R38, J-R40, J-R42 and J-S32; J-10, J-P10, J-R18, J-I11, J-I13 and J-I14 were
amended; its integration seat added J-I15 – J-I17 (the record is `docs/validation/fix-all/r4-integration-log.md` §4, its
conflict table). Round 5 added J-K34 – J-K35, J-DET-44 – J-DET-51, J-P47 – J-P49, J-R50 – J-R54 and J-S39 – J-S43, and
restated J-K18, J-K26, J-K28, J-K29, J-K32, J-DET-35, J-P35, J-P42, J-P44, J-P45, J-R42, J-S37 and J-S38; J-15, J-S6,
J-R33 and J-I14 were amended, and J-I15's pipe inside code was escaped, which had cut the row short (VS4-1); its
integration seat added J-I18 – J-I19 (the record is `docs/validation/fix-all/r5-integration-log.md` §4, its conflict
table).

The consistency pass of 2026-09-26 added seven rows for inline passages that had no id (J-K36, J-DET-52 – J-DET-54, J-P50, J-R55, J-R56) and amended seven rows to agree with the canonical text (J-K6, J-DET-20, J-S4, J-S34, J-S40, J-I18, J-I19); each is marked where it is made.

| id | call |
|---|---|
| J-1 | Chose the kernel proposal as the base over the improvement winner because it wins two lenses and the sum, ships the fusion as the owner stated it, and its defects are paragraph-sized repairs; the product proposal's mechanisms were grafted, not its skeleton (`docs/design/judging.md` §2). |
| J-2 | Chose to type districts and solve the fields **before** the bent-cut infill (the parity judge's sequencing repair) over reading the stage regime alone, because a poor quarter's blocks should be smaller than a rich one's and the stage regime is only the floor. |
| J-3 | Chose FTG-shaped growth for the secondary streets outside the walls over least-cost connectors (the pipeline proposal's default) because the owner asked for the best of both and the measured suburb signature (cul-de-sacs, 30 m streets, 14.7 m lots) is unreachable by routing alone; inside the walls the bent cut does the street work (J-P4); the fusion gate guards the cost. |
| J-4 | Chose plat-tree scoping as the primary locality mechanism with the dependency graph as audit and optimisation, over the DAG as primary, because tree scoping is sound by over-invalidation and the DAG is sound only when every spatial read is declared — the CI oracle proves that per stage before the DAG is trusted. |
| J-5 | Chose a 128-bit key hash and 32-bit-lane mixing over SplitMix64 or a 32-bit key because JavaScript lacks native 64-bit multiply and a 32-bit key collides with probability ≈ 0.25 per city (the engineering judge's arithmetic). |
| J-6 | Chose `FaceRef` unions with L2 half-corridor strips and junction wedges over restricting the nesting invariant, because a strict tree makes scoped regeneration and containment proofs trivial and the union costs one indirection; nesting is exact by construction because the five levels are views of one arena per layer (J-K1), checked by index, not by coordinates. |
| J-7 | Chose batched transactions (stage / district / block / edit) over per-insertion transactions; static indexes are rebuilt at stage end per partition, never per batch (§3.3, J-K6), because per-batch rebuilds of a growing level cost seconds (1.9 s at S10, 13.4 s at S11 at CITY, measured). |
| J-8 | Chose a snapshot-plus-replay document over events-only because loads must be instant and a version may be unavailable; the digest verification keeps events-only's honesty. |
| J-9 | Chose IMPROVEMENTS' J-S scope for the simulation over the product proposal's widening because the one-click path must never pay for it and nothing is lost by building the module second (D-10). |
| J-10 | Chose Poisson k = 50 over k = 30 because the critic ruled the references evaluate 50 and scatter is render-time; the ranked tiles are built once, when the product is built, and shipped (§8.10; J-R42); a measurement, not an assertion, may relax it (D-11). |
| J-11 | Chose `dmath` from an fdlibm port over in-house polynomials because a vetted algorithm is less risk for the same determinism; the lint makes the choice enforceable; the port is our own TypeScript of fdlibm 5.3 (D-23). |
| J-12 | Chose one generation worker plus a derivation pool for the per-district stages, with the merge protocol written first (§4.1) and the pool primary once M1 measures identical digests for pool sizes 0–3 (§12.3), over worker pools assumed in the budget with parallel mutation of one subdivision unspecified, because after the eager allocation the per-district stages are pure functions of eager upstream state and their own sub-streams. |
| J-13 | Chose to write the greenery rule table, the monotone-control mechanism, the control-surface budget, the forms catalogue schema and the intent-expansion example in this document over deferring them to validation, because the improvement judge listed them as gaps no proposal fills and each is a must-have letter or a keep-test. |
| J-14 | Chose to schedule CONFIDENCE §6's experiments #5 and #10 (no recording needed) and #2 as milestone M-1 — with FTG's two free sizes, MFCG's five-seed sweep, the variety baselines and the clean-room inputs (§16) — over starting M0 with placeholder constants, because they set the stop laws and bands every spike is measured against and cost two to three person-weeks. |
| J-15 | Chose to re-cut M1 to the viewable town only and to state 150–200 pw — 153–204 once the fix-all rounds' own components were priced (D-20, J-S43) — over the proposals' 60–90 and the synthesis draft's 100–130, because the per-reference floors bound the base from below and the content, app and rig lines were missing (IMP-2). |
| J-16 | Chose the anchor rule with `supersedes` on top of lineage-hash addresses (J-DET-1) over ids by creation order alone, because edits and regeneration must keep addressable ids (the assignment hook) while a feature added inside a stage may legitimately shift its siblings — stated as a declared golden shift, never a silent one. |
| J-17 | Chose to keep the kernel's `PLAT` codename over a new name because the winner's structure is the document's structure; the name is a placeholder (D-19). |
| J-18 | Chose to run this lane on a relayed status question (recorded in §0.3 and `docs/design/judging.md` §0) over returning without files, because returning would have sent eleven downstream seats at a missing document. |
| J-K1 | Chose one arena per layer with the five levels as views over five separate per-level DCELs, because nesting cannot hold on the lattice across separate structures (GEO-1) and each boundary is stored once (§2.2). |
| J-K2 | Chose vertex, segment and stretch attraction at 26 cm — an incoming vertex moves at most √2 · 26 ≈ 36.8 cm, onto an edge's endpoint when its foot lies within 26 cm of it — over a 5 cm weld beside a 25 cm minimum edge, because the 5–25 cm band was neither welded nor legal (GEO-3) (§3.6). |
| J-K3 | Chose role and owner tables with resolved views over stored face and edge slots in entities, because stored slots go stale on every edit (GEO-5) (§2.2). |
| J-K4 | Chose booleans, buffers and bands on the kernel's own arrangement, one engine on every host, over Clipper2-WASM with a pure-JS fallback, because two engines give two digests for one seed (GEO-9) (§3.7). |
| J-K5 | Chose an in-house straight skeleton under a numeric contract and a four-part validator, with exact OBB roofs for convex near-rectangles, over adopting a port, because no permissive, mature port exists and every output must be checkable (§3.8). |
| J-K6 | Chose static indexes rebuilt per partition — one per district plus one for everything outside districts — at stage end, on an editing session's grid overflow and at every freeze (§3.3's three moments), with query results sorted by a total canonical key per item kind read on the query's level-n route, so a finer level's derivation cannot re-order a coarser query (VK2-4), over per-batch rebuilds, because per-batch rebuilds of a growing level cost seconds (§3.3). *(Amended by the consistency pass, 2026-09-26: the partition count and the rebuild moments follow §3.3, the canonical rule (KERNEL-C06, KERNEL-C12).)* |
| J-K7 | Chose `Int32` centimetre heights relative to a per-document datum over `Int16` heights above a fixed datum, because `Int16` wraps above ≈ 327 m of relief (GEO-15) (§2.3). |
| J-K8 | Chose no WASM kernel — a byte-identical WebAssembly accelerator only for a hot loop that misses by more than 2× or breaks its stage row, a declared budget amendment for a smaller miss — over a WASM kernel behind the façade, because a second implementation must reproduce every output bit and is worth it only where the budget needs it (§3.7). |
| J-K9 | Chose role-carrying vertices for every entity-held vertex and role signatures for log positions over persisted lattice points re-bound by distance, because a role travels with its vertex through splits, merges and warps and distance alone cannot tell the intended vertex from an unrelated one (GEO-5) (§2.2). |
| J-K10 | Chose knot profiles for varying chain attributes over arc-length profiles from the chain's start, because rings have no stable start and a warp or an inserted junction would slide arc-length breakpoints off their features (VK-2) (§2.2). |
| J-K11 | Chose to promote a finer vertex a coarser batch lands on over clearing and re-deriving the neighbour's finer content, because promotion keeps the neighbour's plots byte-identical and moves nothing (VK-18) (§2.2); its reversal, when the promoting chain is removed by any edit, is demotion (J-K28). |
| J-K12 | Chose one hydrology grid over frame and margin at 16 / 25 / 32 m over a frame-only grid and over the margin at the old cells, because the cell count and measured cost are unchanged and the margin gets defined flow (VK-9) (§2.3). |
| J-K13 | Chose a magnitude-triggered flush at 2⁵² from the range invariant for `area2` over flush intervals derived from the frame table, because it is exact for every ring `snap` admits and ordinary faces never pay a BigInt addition (VK-8) (§3.2). |
| J-K14 | Chose to keep finer content an earlier stage made, and every finer face outside a coarse edit's clear region, as an obstacle with `E_KEPT`, over letting a coarser batch clear everything finer inside its faces and re-running the earlier stages, because a coarse edit inside finished fabric must not erase what it does not re-derive and a wrong stage domain must fail typed rather than erase silently; amended at round-2 integration: the wall's band parts now live in L1 strip faces built after S9 (J-P29, J-I9), so the one-click order produces no kept content and the rule is the safety net and the basis of clear regions (J-I10); a move keeps nothing (VK2-7) (VK-1) (§3.3). |
| J-K15 | Chose two transaction forms — declared op sets in canonical order, callback sequences in issue order — over one canonical order for every batch, because a recursion plans each op on the faces the previous op made (VK-6) (§3.3). |
| J-K16 | Chose read-only transferred arena copies with one copy-on-write overlay per district and a lineage-order merge over a `SharedArrayBuffer` arena written in place, because shared memory needs cross-origin isolation in every embedding page and in-place writes would need locks whose order could leak into the output (VK-3) (§3.3); the price one copy per worker of ≤ ≈ 15 MB at CITY with its static index partitions (≈ 20 MB after edits; VK3-6). |
| J-K17 | Chose an endpoint rule and one constrained placement rule for every new vertex on an existing edge, and every re-seated or sliding vertex of a move (12.9 % → 0 measured failures, VK2-6), over plain nearest-point rounding, because two roundings can stack into an edge the hard invariant rejects (GEO-3) (§3.6). |
| J-K18 | Chose to slide a vertex along the fixed coarser route it lies on under a warp over holding or freeing it, because holding makes every shore-side warp a no-op and freeing takes the vertex off the shore and out of the placement bound (VK4-2); a route whose endpoints are held is fixed too, and the slid vertex is seated by the placement rule (VK-7, VK2-6, VK2-7) (§3.6). |
| J-K19 | Chose a strict oracle comparison on unattracted cases and an attraction-radius bound on attracted ones over normalising the oracles through our own insertion, because normalised oracles would stop being independent (VK-4) (§3.7). |
| J-K20 | Chose S11's geometry share (≤ 3 µs per plot) as the kernel's M0 bar over a looser `offsetFace` bar, because a kernel bar looser than its stage could pass while the stage missed by 2× (VK-5) (§3.7). |
| J-K21 | Chose a convexity gate on the exact OBB roof path over a post-check of each roof line, because convexity makes containment true by construction and a notched footprint's roof is the skeleton's job (VK-10) (§3.8). |
| J-K22 | Chose typed-array open-addressing tables for the role heads and owner heads over `Map`s, because the pool's frozen copy is then ArrayBuffers only, while rebuilding `Map`s costs each pool worker ≈ 10–20 ms at CITY (measured) on the critical path (VK2-9) (§2.2). |
| J-K23 | Chose cut knots carrying the exact sampled value over re-keying the existing knots alone (a width moved by up to 8.47 m, measured) and over rational cut knots, because the exact double stays within 10⁻¹² cm of the original sample while a rational form needs BigInt arithmetic in every kerb sample (VK2-8) (§2.2). |
| J-K24 | Chose to name a coarse insertion's permitted contacts explicitly — `KernelTx.prepared`, by role, each prepared vertex attracted onto and promoted — over attracting onto any nearby finer vertex, because unprepared contacts are then refused (`E_LEVEL`); the deck span is the kept way's own L1 edge between its two promoted bank vertices, not an L0 edge laid on it by edge promotion, so every way stays one chain through the edit and no second promotion kind exists (VK2-3; amended at integration, J-I12) (§3.3, §3.6). |
| J-K25 | Chose to end S10's eager step (0) with a rebuild of the L3 partitions it touched, so the frozen copy carries L0–L3 and every dynamic grid is empty at the freeze (asserted), over shipping the dynamic grid or indexing in each worker, because one checkable precondition keeps any pooled stage from querying an index that misses eager content; ≈ 2.3 ms at CITY (VK2-1) (§3.3); the freeze itself first rebuilds every partition whose grid or tombstone set is not empty — none on the one-click path, those edits left dirty otherwise — and only then asserts (VK3-5). |
| J-K26 | Chose to clear the `split` flag on a move except a re-seat onto, or a slide along, the edge the vertex split (and on a prepared contact's or a stretch end's promotion, while a promotion onto the vertex's own route keeps it, VK3-3), over clearing it on every move or never, because the flag then means exactly 'dissolving me restores my edge'; a step that moves the vertex beside it on its run while it stays clears it too, for a vertex of that run's own level (VK2-5, VK4-3) (§2.2, §3.6). |
| J-K27 | Chose to let a move keep nothing and to hold every route vertex of a locked or pinned entity's geometry and of the finer faces under it, closed over coarser edges carrying a held Steiner vertex, over applying `E_KEPT` to moves and over holding only role-carrying vertices, because that is §7.2's promise expressed on vertices (VK2-7) (§3.3, §3.6). |
| J-K28 | Chose demotion — an edge takes the lowest level among its rows, a vertex is never coarser than every edge and role at it, and a split vertex left beside its run with only finer geometry returns to that geometry's level while its `split` flag stands — the flag the whole guard, because round 4's distance test refused 0.54–0.66 % of restorations after later same-level vertices on the run (VK4-3) — over leaving birth levels where promotion left them and over re-deriving the neighbour's plots, because levels that follow the rows make every removal the inverse of the insertion that made them; the `split` flag is kept through a promotion onto the vertex's own route and cleared when a removal breaks the run it split (VK3-3) (§2.2). |
| J-K29 | Chose a `gate_end` role on a fresh `Gate` for a water gate's bank vertices and transient `anchor` contact names — the entity of the edge's first own-level row, the smallest free ordinal (from 2 on an enceinte), stripped by the promotion that uses them — over persistent anchors on the enceinte, because a gate's ends must be named by its record as a bridge's are, and a contact name nobody references would keep vertices alive and collide with an open trace's ends; the kernel allocates the ordinal as the op applies, because only it knows a declared batch's canonical order (VK3-2, VK4-6 (b)) (§2.2, §3.3, §3.4). |
| J-K30 | Chose to place a warp step's re-seats and slides one at a time in canonical order by pre-step lattice position over slot order or a simultaneous solve, because the placement rule reads moving neighbours (the orders differ in 6.8 % of close pairs, measured) and outputs may not depend on slots (VK3-4) (§3.6). |
| J-K31 | Chose a batch-local `StretchRef` accepted by `removeEdges` and `retypeEdges`, with cut knots at a removed stretch's ends, plus a vertex-role row on `splitThrough` and a `VertexRef` form of `removeEdges`, over stretch-specific operations or whole-chain removal, because every partial edit then passes through the only doors and every remaining profile samples as before (VK3-9) (§2.2, §3.4). |
| J-K32 | Chose a placement bound for the hot pixel and index boxes over the vertices standing on each run over a standing 'every Steiner vertex within 0.71 cm of its route' invariant, because a promotion, a same-level split or a demotion changes routes under finer vertices without moving them (up to ≈ 1.25 cm after one change and ≈ 1.5 cm after several, measured) and re-seating them would change a neighbour's plots (K4-1) (§2.2, §3.3). |
| J-K33 | Chose the first stage of §4.1's order as a move batch's `rederivesFrom` over the first writer of its `fromLevel`, because a move clears nothing and a list of writers goes stale whenever §4.1 moves one (VK3-8) (§3.3). |
| J-K34 | Chose to tombstone every item a batch deletes, re-levels or changes — item keys in one set per static partition, found through a per-slot home column — and to insert its successor in the grid, over moving or rewriting items in place, because a packed partition cannot change an item, so a stale copy would answer until its partition happened to be rebuilt and answers would depend on rebuild timing; one set per partition, because one per level would let a rebuild of one partition be hidden by another's tombstone (VK-15's cross-district slot reuse) (VK4-5) (§2.2, §3.3). |
| J-K35 | Chose to hold a water gate's `gate_end` vertices under a warp unless `fromLevel = 0`, as a deck's are, whatever their level, over an extra L0 batch that would give generated gates L0 bank vertices, because the hold alone makes both kinds behave alike and the batch would add an L0 writer to S5a for no visible output (VK4-4) (§2.2, §3.6). |
| J-K36 | *Chose a pinned, registry-confirmed `robust-predicates` 3.0.3 with an in-house BigInt fallback (VK-16)* over re-verifying at adoption, because the licence is confirmed now and the checker re-runs on every upgrade, so no licence question is left open. (§3.1, archived l. 2188–2190) *(New row added by the consistency pass, 2026-09-26: the canon gave this inline passage, which had no row, the next free id.)* |
| J-DET-1 | Chose opaque address ids whose token is the hash of the entity's lineage key over hierarchical creation-order ids and over a per-kind high-water counter, because a hierarchical id breaks under re-parenting and recycles dead ids, and a counter depends on the order in which lazily derived districts and parallel workers mint, while a lineage-hash token is the same in any order; the tombstone check keeps "never reused" (§6.3). |
| J-DET-2 | Chose to keep the lineage (and so the draws) only for entities that survive un-derived, and to hand only the address to an anchor-matched successor, over carrying the lineage in both cases, because New random must really re-roll its scope while names, locks and assignments must follow the building the user means (§6.3). |
| J-DET-3 | Chose operation-count work limits for every output-affecting budget over wall-clock watchdogs, because a watchdog makes one seed give different towns on slow, throttled or busy machines; wall clock only postpones or resumes lazy work (§5.1). |
| J-DET-4 | Chose a Merkle digest maintained at batch commit over hashing the canonical serialisation, because the serialisation costs ≈ 1.2 s per CITY model (measured, SCL-1) and would run thousands of times per generation; the canonical text stays for golden files and exports (§6.2). |
| J-DET-5 | Chose to keep version stamps, rule slices, derivation inputs and deps out of the model digest (a separate provenance digest) over hashing whole entity records, because otherwise a release that changes no output changes every digest (§2.8, §6.2). |
| J-DET-6 | Chose one ordered replay fold — drawn constraints, epochs, rebases and upgrades applied at their log positions — over hoisting drawn constraints before their stage, because hoisting makes every reload regenerate a different town than the one on screen; hoisting survives only as the explicit "Rebuild around my drawings" rebase (§7.2, §7.4). |
| J-DET-7 | Chose a `rebase` event when a saved state is kept over leaving the recipe and log unchanged, because otherwise every later load, undo and migration silently switches back to the other state (§2.9). |
| J-DET-8 | Chose scoped undo records and cost-driven checkpoints over an eight-deep ring of whole-document snapshots, because one CITY snapshot is ≈ 80 MB (SCL-5) against a ≈ 100 MB heap (§7.4). |
| J-DET-9 | Chose output versions that bump only with a declared shift, with N−1 and N−2 retained as lazy browser chunks and every version installable in the Node CLI, over "the last N minor generator versions stay replayable", because a server-less browser library needs a concrete shipping mechanism and most releases change no output (§6.4). |
| J-DET-10 | Chose to make an edited attribute implicitly pinned (IMPROVEMENTS O9's rule) over protecting only locked entities, because users refuse to reroll districts holding work they "already baked in" and FTG's regenerate deletes it (§7.2). |
| J-DET-11 | Chose lock > assignment in the precedence order over assignment > lock, because the owner's hook asks precedence over the generator's class rules, not over the user's own locks; a host that must override a lock sends an unlock first, which the log records (§7.7). |
| J-DET-12 | Chose to recompute the prosperity, density and greenery fields on load over persisting their rasters, because the rasters gzip to 2.7–11 MB (SCL-11) against 3–8 MB document budgets while the drivers and strokes that define them are tiny (§2.9). |
| J-DET-13 | Chose to state control monotonicity and continuity over 50 seeds per step with a fixed ε formula over a per-seed ε, because the design's discrete stop rules make single seeds jump by construction; a per-seed test would fail or be tuned to pass (§7.8). |
| J-DET-14 | Chose to make `drawBoundary` snap to whole L1 cells over creating invisible `district_bound` edges through blocks, because every seam edge must be typed street, water, wall, reservation boundary (`reserve`), field, cliff or frame for stage 2's `SeamContract` (§7.1). |
| J-DET-15 | Chose MFCG's whole-map Rotate as a view rotation with a compass that points at model north by default (and can be decoupled) over rotating model coordinates, because wind, sun, aspect and slope read model north and GeoJSON must stay in the model frame (§7.1). |
| J-DET-16 | Chose undo and redo as logged events applied at the head through the same fold, with per-session stacks and a conservative independence check, over removing the last event from the log, because a host-stored log only grows and every client must fold the same events; removal survives only as the unshared-document truncation, which leaves the model digest unchanged through a canonical `nextSeq` (§7.4, §2.9; NF-D1). |
| J-DET-17 | Chose to copy every non-shipped setting pack's content into the document and to refuse links that need it or host content, over recording packs by id and version only, because a pack missing on the opening machine can only fail or rebuild another town; the link offers the `.plat` file or `&doc=` instead (§2.9, §6.4, §7.6; NF-D2). |
| J-DET-18 | Chose an upgrade's undo record to be its `from` output version (undo = a replay under the retained version) and a rebase's to be its previous base (the recipe always; an older rebased state only under the undo cap), over storing whole pre-upgrade models outside the cap, because one METROPOLIS model exceeds the 8 MB document budget while the replay reproduces it exactly; past the window or the cap the undo is withdrawn with a notice and the CLI command (§7.4, §7.5; NF-D4). |
| J-DET-19 | Chose content-addressed snapshot chunks per static-index partition, shared between `base.state` and `model`, over a bespoke delta encoding of `model`, because the partitions already exist for the indexes and the checkpoints and deduplication by hash is exact; saving always writes `model` (§2.9; NF-D5). |
| J-DET-20 | Chose to compare each scope entity's identity-free content digest after New random and advance its reroll up to `reroll.maxAdvance` more times (a table value, default 3; §5.1 (6)), keeping the old reroll and reporting when nothing changes, over trusting that a fresh reroll always changes the scope, because a full ladder does not imply a different result on minimal scopes (§5.1 (6); NF-D6). *(Amended by the consistency pass, 2026-09-26: the advance cap is the table value of §5.1 (6) (DETERMINISM-C-2).)* |
| J-DET-21 | Chose to run S13a's scoped delta at each event's log position in replay mode, suppressing only S14 and S13b, over one S13a pass at the end of a replay, because name uniqueness is resolved scope by scope in log order and label events address records S13a creates mid-log; one end pass makes replay differ from the session (§7.3; N-1). |
| J-DET-22 | Chose to remove `labels` from the rerollable concerns and to make rerollability a registry property checked for a reader, over adding a seeded tie-break to label placement, because label candidates are geometric and placement is a deterministic greedy over a total order — view data that should stay a pure function of the model and the zoom stop (§6.1; N-18). |
| J-DET-23 | Chose to make S1's water operator re-site the crossings of the changed reach and chain S4, S5, S6 and S7 in §4.11's order — the new water, its crossing sites, the kept ways' routes, the crossed wall runs and the chain's footprint computed as data; one L1 batch that declares the footprint as its clear region, clears its partition content, re-lays the kept ways through their sited decks' bank vertices, re-traces the crossed wall runs with water-gate bank vertices and cuts the lesser ways at the bank setback; then one L0 batch, declaring the same footprint and clearing nothing, inserting the water through those prepared vertices — over digging the channel first and repairing the crossings afterwards, which §3.3's clear-region contact rule refuses (or, read loosely, which clears the kept arterials' crossings), over clearing only the cells whose L1 edges the chain changes, which leaves a pond inside a block or a widened bank facing kerbs and plot lines no batch prepared (`E_LEVEL`, then a town-wide fallback), and over declaring every reach edit a Re-derive from S1, because moving a river must stay local while bridges follow it and no road is left running into the water; decks stand at the sites `siteCrossings` picks, as at generation, not at each way's existing crossing as in a carve (§7.3 (b); LC-7, VD2-1, VK3-1). |
| J-DET-24 | Chose the terrain brush's `water: 'locked'` default with water and locked footprints masked, drainage re-run into the drainage arrays only, and exact re-basing of everything on the changed ground, over letting every terrain stroke re-trace rivers, because the brush is mostly used to shape ground and a river move re-routes roads — an edit the user chooses with `follow`; exact over tolerance-based re-basing because it costs microseconds per entity (§7.2, §7.3; LC-7). |
| J-DET-25 | Chose work limits as laws over the batch scope's population-derived counts over fixed counts per rung, because size within a rung follows population across a 6.7× (TOWN) or 4× (METROPOLIS) band, so a fixed count fires F-WORK systematically at a band's top and is slack at its bottom; the counts are model values fixed before the batch runs, so limits stay deterministic and a scoped re-run gets the limit its scope had (§5.1 (5); NF-S10). |
| J-DET-26 | Chose grid-bucketed nearest-neighbour succession matching per kind and class family, with a ≤ 2 µs-per-entity budget (measured 0.4–0.6 µs) and district-partition-first matching as the declared-shift fallback, over an unspecified "nearest anchor" search, because the same routine serves regeneration, Re-derive from S1 and the upgrade mapping and needed a stated cost (§6.3; NF-D7). |
| J-DET-27 | Chose, for a control that fails its sweep, a smoothstep over the failing interval of its expansion row and then a declared discrete control, over widening ε until it passes, because a widened ε hides the jump the user sees while the discrete declaration tells the truth (§7.8; NF-D7). |
| J-DET-28 | Chose to require byte identity of the WebAssembly accelerator only, and to admit the Clipper2-WASM fallback as a declared golden shift checked by cross-host digest identity, over requiring byte identity of both, because the fallback engine computes different integers by construction and would otherwise be unshippable (§6.5 (10); VK-13). |
| J-DET-29 | Chose to re-run S10's step (0) one-sided for a scope's own side of every shared edge — `bandUnion` restricted to the scope's faces, cross edges attracted onto the other side's vertices — over re-deriving both sides of every shared edge a scope touches, because the band on each side is a function of the shared edge alone, so the one-sided re-run reproduces it without touching the neighbour's plots; the two-sided form is the pre-decided fallback if the B-EDIT identity fixture ever fails (§7.3 item 2; VK2-2). |
| J-DET-30 | Chose to record a river's control knots as S1's recorded input with stable ordinals and to address a knot move by the water body's address and the ordinal, over making the knots arena vertices, because the course is S1's control polyline and not plat geometry (a knot as a vertex would be an isolated L0 vertex or an antenna in the water face), while an ordinal plus the carried address binds after an upgrade changes the knot count, or is reported orphaned (§7.1, §7.4; VK2-12). |
| J-DET-31 | Chose to carry point-anchored records — pins, point decorations, positional instance overrides, pinned label placements — by their mean-value coordinates in their host face through a warp or vertex move, re-seated inside it at their clearance and held when protected, over leaving them at their world positions or re-placing every one by its rule, because they stand on the ground the user dragged and re-placing would move generated furniture the warp did not need to move; stamp and grid instances stay world-anchored because they are a fill pattern (§7.4; VK2-13). |
| J-DET-32 | Chose to admit harbour works by topology — a `pier` or `quay` way whose connected pier and quay edges meet land in at most one land face — over exempting the `pier` and `quay` classes outright, because a class exemption would let a `quay` way drawn from bank to bank cross a river with no deck (§5.3; VD2-2). |
| J-DET-33 | Chose a lifecycle event block ordered by `seq` from which an undo removes its target's entries (and a redo re-inserts them), with a truncated redo advancing `nextSeq` by one, over an append-only block with compensating entries, because only then does the log with an undone pair fold to the same identity subtree, addresses and model digest as the same log truncated (§2.8, §7.4; VD2-3). |
| J-DET-34 | Chose a session per document and author — minted once outside the model packages, stored in an unshared document's view state, assigned by the host for a shared one — over a session per app start, because undo must survive a reload, and the fold never reads the session, so it cannot affect the model (§7.4; VD2-4). |
| J-DET-35 | Chose to make a selected user corpus a non-shipped pack (`user:<hash>`), to save the content of every non-shipped pack of the document's **pack set** — the base recipe's packs and every pack an `adjust` event in the log names — while the base recipe, any logged event or a truncated event held on a saved redo stack names it, to have an upgrade copy into the document every pack of the pack set its new version stops shipping, to read the log's pack set in the link rule, and to refuse a host provider's output that would pass the 2 MB cap as an F-EDIT conflict, over keeping corpora beside the recipe, over saving and checking only the current recipe's packs, over dropping a pack's content when its last logged event is truncated, and over truncating or dropping an oversized output, because the log is replayed from its first event and a redo after a reload re-appends a truncated event — so a corpus selected after creation, selected and deselected, or selected, undone and redone is still read by a replay — and a replay must never read content the document does not hold (§2.9, §6.4, §7.5, §7.6; VD2-8, VD3-3, VD4-7, VD4-9). |
| J-DET-36 | Chose references by lattice point across chunks, with level-≤ 1 routes in the coarse chunk and each partition's Steiner splits in its own chunk, over (chunk, index) references, because an index into another chunk changes whenever that partition is renumbered, which made every edit rewrite its neighbours' chunks and the coarse chunk; and chose, as pre-decided fallbacks, per-block-group chunks then a declared amendment of the 1.25 × sub-bar under the unchanged rung budgets, root finalisation only when read, and a seeded per-layer subtree in CI (§2.9, §6.2, §3.9; VD2-9). *Amended by the consistency pass (KERNEL-357's split key, §3.9):* chose to keep each split keyed by its route edge's endpoints and to state the rewrite, over keying it by the split vertex's lattice point alone for the loader to find the nearest level-≤ 1 route edge, because the endpoint key needs no uniqueness argument across K4-1's drift (≈ 1.5 cm after several changes, `fixall_kernel_r5_checks.out` B), while the extra rewrites fall on partitions that border a changed coarse edge and the size bar measures them. |
| J-DET-37 | Chose to hand a generated name to a successor with its address and naming record, and to draw names only for entities without a predecessor, on an explicit reroll (town-wide or ids-scoped, with the salts in the event), or for an unedited name whose recorded naming slices changed (a grammar row, or the corpus a row names — case (4), re-drawn with its own salt and listed for confirmation), over re-drawing a successor's name from its fresh lineage and over keeping every carried name through a naming-input edit, because a name, like a lock, belongs to the thing the user means — a re-drawn name would rename a re-sited bridge or a re-cut street the user never asked to rename — while choosing a street-name list or editing a naming rule must change exactly the names that list or rule produced, or the feature does nothing to the town on screen (§6.3, §7.1, §7.6; VD2-10, VD3-2). |
| J-DET-38 | Chose to make the displayed snapshot the working state and apply edits at once — after the load has recomputed the decoded state's own digest tree and matched its root with `model.digest` (≈ 31–34 ms at CITY, measured synthetic) — with the verification replay running beside the edits in a pool worker and a mismatch resolved by rebasing at `h₀` or re-applying the later events to the replayed state, over queueing edits until verification ends and over editing the decoded state before its own digest is checked, because verification takes ≈ 1.4–11 s while an edit must redraw within 100 ms, the edits are ordinary log events so a mismatch only changes the state they are re-applied to, and a snapshot whose content disagrees with its recorded root would otherwise be edited and declared verified; table and preset edits alone wait, for the provenance only the replay rebuilds (§2.9; NR-8, VD3-1). |
| J-DET-39 | Chose to scope the NF-P5 invariant to generation batches and to every edit batch except for the enceintes whose wall-strip parts the edit's chain **declares** it rebuilds by step (0) or removes — a declaration each dry run computes and a registry test requires of every operator that can write a strip — over dropping the invariant for edits and over an enumerated list of exempt edit kinds, because the edits that rebuild or remove a wall's parts must be allowed to clear them while every other edit and every generation batch must still never split them, and a list drifts behind the operators (the round-3 list omitted the carve and part of the water operator) and makes an implementation refuse valid canals and river moves (§5.3; VP2-4, VD3-6). |
| J-DET-40 | Chose, as the pre-decided fallback if the load's full digest recomputation passes §6.2's 150 ms bar, to recompute the tree off the edit path from a copy-on-write checkpoint at `h₀` and catch up the edits made meanwhile by their touched sets — a mismatch then handled as a corrupt cache, the edits re-applied to the replayed state — over storing per-chunk digest nodes in the snapshot and re-hashing a chunk's leaves when an edit first touches it, because the digest tree is organised by layer and containment while chunks follow partitions (the network layer's node spans every chunk that holds a way), so per-chunk nodes would need the tree restructured by chunk and would change again under §2.9's block-group chunking fallback, whereas the checkpoint form changes neither the tree nor the file and still proves the working state before verification can succeed (§6.2 (iii), §2.9 step 3; VD3-1). |
| J-DET-41 | Chose to persist a naming record — the naming slices and salt of the last draw — with every generated name, over reading a name's naming slices from provenance, because provenance is never persisted and cannot be rebuilt in a document rebased from a kept snapshot or a frozen import, where a corpus selection or a naming-table edit could then not tell which names drew from what it changes; the record costs ≈ 0.1 MB raw at CITY before compression, inside the per-building document budget (§2.8, §7.6; VD3-2). |
| J-DET-42 | Chose to let a non-owner client of a bridged document take the replayed town, keep the `doc.load` bytes (≤ 3 MB at CITY) and install the saved town from them when the owner's `keptSnapshot` rebase arrives — and to let a later loader whose log already holds that rebase take the saved town without asking — over making every client wait on the snapshot until the owner chooses and over treating the owner's rebase as a no-op on clients that hold another state, because an absent owner would leave editors on a state the replay has shown to differ, and a no-op leaves the owner and the editors on different states against §11.3's convergence rule (§2.9 step 4, §7.4, §11.3; VD3-4). |
| J-DET-43 | Chose to run the per-district stages of every edit made during load verification in the generation worker by the pool-size-0 path, over running them on the pool less the replay's worker with their frozen copies counted, because the pool-size-0 path gives the same digests by construction, keeps memory on §12.8's counted line (the replay's model stands in for the copies only if none is frozen) and leaves the replay's worker uncontended, while the price — a multi-district edit at its single-worker cost during a ≤ 11 s window — falls on rare edits (§2.9 step 3, §12.8; VD3-5). |
| J-DET-44 | Chose to run every recomputed-root check of a decoded state under the model packages of the output version that recorded that root — `model` under the document's own output version, a rebased `base.state` against its **root of record** for the version the replay runs under (the `rebase` event's `stateDigest` under its new `version` field, or the `baseDigest` each later `upgrade` records under its `to`) — to check a frozen view by its chunks' content hashes only, labelled "made with o<k>; not verified by this version", and to have the `frozenImport` rebase record the root the current version computes, over recomputing every root with the current packages, because a root is a function of the packages that computed it — a changed field driver or leaf encoding moves it — so a cross-version recomputation reports a mismatch on almost every old document and would leave an ordinary kept town read-only after an ordinary upgrade (§2.9 steps 2–4, §7.1, §7.4, §7.5; VD4-1). |
| J-DET-45 | Chose, under the load's off-edit-path recomputation (§6.2 (iii)), to keep edits flowing but to withhold "trust the saved town", step 4's keep, saves, exports, API digest reads, bridged root comparisons and any `verified` report until the recomputed roots match — a mismatch withdrawing the keep for good — over holding edits until the recomputation ends and over offering the keep at once, because waiting edits are what the fallback exists to avoid, while a keep or a save made on an unchecked copy could make a corrupt cache the rebased base and the next load read-only (§2.9 steps 3–4, §6.2 (iii), §5.3; VD4-2). |
| J-DET-46 | Chose to keep a generated name's naming record dormant while the name is edited, locked or assigned, to run case (4) for it at the event that ends the protection — an `unlock`, an `unassign`, or an `undo`, `redo` or `revert` that frees it — with the rename listed, confirmed and stored, and to restore naming records with the names when a naming reroll is undone, over deleting the record at a `setAttr` and over letting a later unrelated re-derivation find a stale record, because a deleted record hides an undone rename from a later corpus change — the kept and the truncated log then give different towns (§6.5 (9)) — and a stale record found later renames a name as a side effect of an edit unrelated to naming (§2.8, §6.3, §7.4; VD4-3). |
| J-DET-47 | Chose one optional `renames` field on `EditBase`, and `fates` on `editTable` and `editPreset`, over a `renames` field on the five kinds that already carry fates, because the events that end a name's protection (unlock, unassign, undo, redo, revert) re-draw names too, and every event that re-draws must store what the user confirmed so that a replay or a bridged client can report a different result exactly as it does for fates; `confirm` carries them, and an action whose dry run lists renames asks for confirmation even with no protected entity in scope (§7.1, §7.3 item 4, §11.2; VD4-4). |
| J-DET-48 | Chose to make each field of a culture or ancestry row its own naming slice — key `<rowKey>/<field>`, hashed with the field's value and, for a corpus field, the corpus's content hash — and to have a name's record cite only the fields its draw read, over whole-row slices, because a culture row names several corpora and a whole-row slice re-draws every name drawn through the row when one list is replaced — rewriting their naming records and, where a scoped uniqueness pass resolves differently, their text — against the rule that a list change leaves every other name alone; every other slice stays at its old granularity, where over-invalidation only re-derives what re-derives identically (§2.8, §6.3, §7.6; VD4-5). |
| J-DET-49 | Chose a separate **records digest** over the persisted derivation and naming records — schema-encoded, maintained at commit, stored in the snapshot, recomputed at every load with the model tree (≈ 4 ms at CITY, ≈ 11 ms at METROPOLIS, measured synthetic) and compared by the verification replay — and, on a records-only mismatch, to adopt the replay's state at `h₀` and re-apply the edits made meanwhile without asking, over folding the records into the model digest, over leaving them unchecked and over replacing only the records of the entities not re-derived meanwhile, because the records steer Regenerate (keep settings) and case (4) without being visible content (folded in, a re-encoding would become an output shift), a wrong record silently changes later edits (in a rebased document for good), and an edit that read a wrong record must itself be re-applied for replay to equal session (§2.9 step 3, §6.2; VD4-6). |
| J-DET-50 | Chose to emit a link only when the document's base is the recipe — refusing it for every rebased base, a kept saved town included, with the `.plat` file or `&doc=` offered, and letting the CLI's `--recipe-only` export refuse one too — and to fold an undone `rebase` with its `undo` as a no-op pair in a replay from the recipe, over an exception for a rebase whose state its recipe could regenerate, because a link replays the recipe and the log and has no way to name a starting state, so for a rebased town it would show the replayed town — for a kept saved town, the very one the owner rejected (§2.9, §6.4, §7.4; VD4-8). |
| J-DET-51 | Chose to remove the rebase reason `keptOldModel` over defining a new trigger for it, because §7.5's "keep the old model" keeps the document at its own output version inside the retention window and hands it to the frozen-view path outside it, so no event could carry the reason, and a schema value nothing produces invites two implementations to disagree about what it means (§2.9, §7.4; D5-1). |
| J-DET-52 | *Chose to re-apply the edits made meanwhile on the replay's records over replacing the records only for the entities those edits did not re-derive, because an edit that read a wrong record would otherwise keep a result that no later replay reproduces.* (§2.9 load step 3, archived l. 1968–1970) *(New row added by the consistency pass, 2026-09-26: the canon gave this inline passage, which had no row, the next free id.)* |
| J-DET-53 | *Chose a transparent successor (seed + 1) over deriving the next seed from the generator's stream state because seed + 1 survives any change of draw order and is readable in the link.* The references derive their successor from the stream state, which is reproducible within one build (VG's Enter chain replays per build, `coverage-audit-vg.md` VN-007; MFCG's successor is its deterministic stream state) but moves whenever a build changes its draw order; MFCG's Enter also drops explicit parameters and takes size and flags from a non-seeded source — PLAT does neither. (§6.1 Enter, archived l. 5334–5340) *(New row added by the consistency pass, 2026-09-26: the canon gave this inline passage, which had no row, the next free id.)* |
| J-DET-54 | Chose to copy a pack the new version stops shipping into the document at the upgrade, over keeping every published version's shipped packs in the browser library, because the upgrade is the last moment the browser is sure to hold `from`'s copy, and the document then carries what it needs wherever it is opened (VD4-9). (§7.5, archived l. 6582–6585; the first half of the same passage is J-DET-44) *(New row added by the consistency pass, 2026-09-26: the canon gave this inline passage, which had no row, the next free id.)* |
| J-P1 | Chose feature-named district kinds over class-typed kinds because MFCG's live taxonomy dropped class wards and its townspeople lived where they worked (§2.5). |
| J-P2 | Chose a quarter level for city-LOD labels over thinning district labels, because MFCG labels every one of its larger districts (§4.5). |
| J-P3 | Chose reservations and gate sites at S3 and the trace before each stage's growth over claims and walls after growth, because nothing then has to cut, gate or reroute streets and the fabric inherits the wall — stage 1's trace at S3 itself (J-P26) (§4.2, §4.4). |
| J-P4 | Chose the bent cut for the intramural fabric and FTG growth outside the walls over FTG growth everywhere, because MFCG's measured intramural signature comes from recursion on the district polygon (§4.4). |
| J-P5 | Chose MFCG's walled share over 0.35–0.5, because a mostly-extramural default reproduces MFCG's shanty case and a compact walled town with ribbons is the constrained medieval pattern (§4.2 S2). |
| J-P6 | Chose plot counts per band with a measured plot share over one area per class with `1 − 0.38`, because 38 % is footprint over lot and plots span 11× in size across bands (§4.2 S2). |
| J-P7 | Chose a network-travel-cost level set with an anisotropy row over isotropic distance-cost, because FTG's creator retired the circular look and its towns are measurably longer along main roads (§4.4). |
| J-P8 | Chose a mean-reverting curvature walk with goal reversion over a random walk on the rate of turn, because the latter curls 600 m streets through 73–108° (§4.4; `docs/validation/bench/fixall_pipeline_ou_heading.out`). |
| J-P9 | Chose an eager town-wide allocation, a laziness contract and a complete city-LOD first paint over lazy per-district S10–S14, because the lazy tier made the town depend on viewing order and the owner wants footprints at city zoom (§4.1). |
| J-P10 | Chose to specify the district pool and its merge protocol now (§4.1) over leaving pools behind a later measured need; reconciled with J-R18 and D-18 by the fix-all pass: the pool is the primary configuration at each size where M1 (TOWN, CITY) or M2b (METROPOLIS) measures it within its law + 10 %, faster than a single worker on the same generations and with identical digests for pool sizes 0–3, and the single worker is the pre-decided fallback elsewhere (§12.3; J-R44). |
| J-P11 | Chose to forbid bent-cut continuation across district boundaries over two-district transactions (§4.6). |
| J-P12 | Chose the vector coast with contours clipped to land over a shoreline extracted as the raster's level set, because it keeps centimetre precision and makes the invariant constructive (§4.2 S1). |
| J-P13 | Chose per-frontage regions from the block's straight skeleton over FTG's reflex pre-cut as the primary construction, keeping the pre-cut as its fallback, because regions are exact on curves (§4.7 S10). |
| J-P14 | Chose row footprints by clipping over fitted rectangles, because party walls must be one shared edge on bent and curved frontages (§4.7 S11). |
| J-P15 | Chose to decide the deep-block interior in S8 by band shares over S10 inserting lanes, because S10 cannot write L1 and dense quarters must keep their courts (§4.6). |
| J-P16 | Chose NG's perpendicular-ray far side with a pre-decided fallback chain over an open rule (§4.6 step 4). |
| J-P17 | Chose wings stored in the base over single-wing L / T (§2.6). |
| J-P18 | Chose an `outline()` / `compose()` split with a cost contract over one lazy `compose` (§2.6). |
| J-P19 | Chose `baseCm` = the highest sample plus a plinth, with foundation skirts and stepped wings, over the lowest sample, because no floor may be buried and nothing may float (§2.6). |
| J-P20 | Chose a sequential grid roster keyed by building ordinal over a capped fixed-point iteration, because only the former is prefix-stable in population (§10.2). |
| J-P21 | Chose a base-schema relation store materialised by the module over relations re-derived on every read (§10.1). |
| J-P22 | Chose pinning by explicit edit only over "pinned once seen", FTG's own rule (§10.3). |
| J-P23 | Chose close-up refinement as derived data and template replacement as a model edit over refinements entering the model (II.4). |
| J-P24 | Chose the gate law `round(1 + 0.47 √A_ha)` fitted on MFCG's size sweep over `2 + round(0.9 √(A/10))`, because it reproduces MFCG's 5 / 8 / 12 / 18 gates and the old law gives 4 / 6 / 9 / 12 (`docs/validation/bench/fixall_pipeline_mfcg_fits.out`). |
| J-P25 | Chose an open waterfront as the default over a sea wall, because MFCG's coastal wall stops at the water and FTG's captured wall is an open chain (§2.7). |
| J-P26 | Chose to solve the gate routes at S3 and take the stage-1 boundary, the gates, the castle weld, the wall trace and the moat from one travel-cost construction over a provisional boundary on straight corridors (which still differs from the routed arterials) or sliding the gates at S5a (which leaves a moat carved at S3 off the wall or forces water into L0 after the arterials), because a moat must enter L0 before any L1 edge and can follow the real wall only if the wall is known then (§4.2 S3; NF-P1; `fixall_pipeline_r2_levelset.out`). |
| J-P27 | Chose to run the hinterland unit (the hinterland's S10–S12b) on the otherwise idle generation worker as one more overlay of disjoint faces, over an eager L1 field partition before S8 (which would add ≈ 12 ms to CITY's critical path), because fields are L3 content of the hinterland's own blocks and the generation worker waits for the pool anyway (§4.1, §4.9; NF-P8). |
| J-P28 | Chose the quarter city cut at `min(N_q, L)` over flooring the district count at N_q, because the floor moves the matched TOWN from 8 to 10 labels — no closer to MFCG's 9 — and shrinks TOWN districts below MFCG's own (§4.5; NF-P9; `fixall_pipeline_r2_quarters.out`). |
| J-P29 | Chose to cut the wall strips off as L1 faces at S7 and build the band, towers and gatehouses inside them after S9 over subtracting band ⊕ setback inside `kerb(F)` while committing the band at L3 before S8, because an L3 face committed before S8 and S9 must be cleared or split by their batches, while an L1 strip boundary makes the wall a barrier the way a reservation is (§4.8; NF-P5). |
| J-P30 | Chose a carve way rule by class — pinned decks for arterials and sole connections, cuts for the rest — over re-routing every way around new water, because a town bridges its through-roads over a new moat or canal while lanes simply end at the new bank (§4.11; NF-P14). |
| J-P31 | Chose a `quad` wing kind that stores the clipped row footprint over re-fitting row houses as rectangles (breaks GEO-26's shared party wall) or storing them as `polygon` wings (loses the ridge the per-wing roofs need) (§2.6; NF-P2). |
| J-P32 | Chose a portal gap that slides a planned lane end away from an existing portal over letting two districts' lanes share a boundary vertex, because a shared vertex is the cross-boundary crossroads GEO-42 forbids and binds either district's reroll to the other's lane (§4.6; NF-P6). |
| J-P33 | Chose one `Seam` record per boundary run, read by both districts, over a contract copied into each district, because one record cannot disagree with itself and a re-derivation then changes the seams a district is party to rather than its neighbour's district record (II.1; NF-P6). |
| J-P34 | Chose one carve footprint — every L1 cell the channel ⊕ (`attractCm` + bank setback) meets or the way rule touches (cells bordering a removed, pruned or replaced stretch, cells a re-route crosses, and where the channel crosses a wall the cells bordering the old run or the strip-line stretches it removes and the cells its re-traced run's new strips take), and nothing else, their union exactly — as the clear region, the re-derived set, the fate report's scope and the locality check, over the channel buffer alone (a pruned remainder, a replaced arterial stretch, a merged cell and a re-traced run's strip lines reshape whole cells beyond it, so a buffer-only check fails by construction and its fallback turns every carve into a town-wide re-derivation) and over the buffer united with the cells (a cell only the 26 cm fringe meets loses faces to the clear and must be re-derived whole); the dry run already computes the cells when it runs the way rule (§4.11; VP2-1, NP3-2). |
| J-P35 | Chose to solve the harbour route after the trace and the moat, through the serving gate (least cost from the gates' exits) and outside `T`'s road set, over keeping it among the gate routes that shape `T` (the boundary would depend on a route whose form depends on the boundary) or adding a gate for it beyond N (breaks MFCG's gate law and "roads leaving = N"); only a sealed town (`N = 0`) gets a harbour water gate by rule, and the serving gate's detour is bounded by the harbour pick (J-P45), with the same harbour-gate rule — the detour guard — as its pre-decided fallback and, where the harbour's nucleus has no unforced pick left, as its rule (§4.2 S3 (4), (7), (11); VP2-2, NP3-7, NP4-4). |
| J-P36 | Chose to carve an `on_enceinte` castle's moat only along its outer arc, joined to the city moat, with a dry ditch (default) or nothing on the town side by the castle row, over a ring band around the whole bailey, because the town wall reaches each weld vertex from outside the bailey and would have to cross a ring, against the rule that a trace crosses water only at a river's water gate (§4.2 S3 (8)–(10), §4.8; VP2-10). |
| J-P37 | Chose a `reserve` seam type for a way-less reservation boundary two districts share over forbidding such boundaries, because the grower's `validateEdge` stops at reservation boundaries by design, so a plaza's or precinct's edge is exactly where districts meet, and the margin band S10 lays there is the shared geometry the type names (II.1; VK2-10). |
| J-P38 | Chose the neighbour step — one `corridor_split` inserted into the neighbour's half-corridor strip, its kerb end landing on (and promoting) a plot-line end or adding one kerb vertex — over re-running `corridorUnion` on the neighbour's whole L1 face, which re-derives its built blocks and so clears and re-derives every plot of that face (II.1 (3), §4.6 step 7, II.4; VK2-11). |
| J-P39 | Chose to store a `quad` wing's four corner indices (`BaseWing.corners`) over inferring its sides from the ring, because a party-wall chain carrying the lot cut's bend has three vertices, so no vertex-count or angle rule can tell a bent party wall from a bent front, while S11 knows the corners when it clips the row (§2.6, §4.7 S11; VP2-5). |
| J-P40 | Chose the deck span of a carve's kept way to be the way's own L1 edge between its two promoted bank vertices, carrying `deck` beside `way`, over a separate L0 deck edge inserted with the channel, because the way stays one chain through every batch, the water body stays one L0 face, and §7.3 (b)'s river operator builds its decks the same way (§4.11, §4.4; VP2-1 with VK2-3). |
| J-P41 | Chose to exclude an enceinte's wall-strip faces from S7b's claim candidates (`claimSubFace` within the district's coarse faces other than its strips) over letting a claim take strip ground, because a reservation there would site an institution or park where nothing may stand — the strip's ground is band, setback and glacis, and "footprints ∩ (band ⊕ setback) = ∅" is hard — so a castle's esplanade is claimed beyond the bailey's outer strip (§4.5 S7b (3); VP2-3, NP3-8 (c)). |
| J-P42 | Chose to carry a building's stored wing rings with its footprint face — boundary runs re-read vertex for vertex from the footprint's rings after every change of them, joints by mean-value coordinates, a de-rectangled rect turned quad, the union check inside a warp's whole-step validation — over making wings L4 sub-faces now (a per-wing entity and the stage-3 face split in the base) and over re-fitting wings from the moved footprint (which changes the ridges and wing split of every warped house), because a carry moves each wing exactly as far as the ground under it and keeps the wings' union equal to the footprint (48 000 of 48 000 tiled carries at 0.25–3 m warps, measured); the carry runs after every committed batch that changes a footprint face (J-P47), carries a stored composition with the wings (J-P48) and decides its check by the wings' pairing (J-P49); and chose to stop storing the slot hint over carrying it too, because nothing after S11 reads it (§2.5, §2.6, §4.7; NP3-1, NP4-2, NP4-3, NP4-6). |
| J-P43 | Chose to give each land face of a carve's footprint, after the water is in, the district, hinterland or `wall_strip` typing of the pre-edit L1 cell holding the larger part of its area, over the merge rule alone ("a cell merged across a removed boundary joins the larger part's district"), because a boundary stretch removed under new water is re-separated by the water, and the merge rule then hands the countryside on both banks of a canal across the perimeter to a district, against §4.5's rule that every face outside the perimeter is the hinterland's (§4.11 (4); NP3-3). |
| J-P44 | Chose to emit every crossing site as a `Bridge` in state `site` — two pinned bank vertices, no span, no way, no furniture, not drawn — that becomes `built` only when a way lays its span through them, with the town bridge the one site S3 makes a destination, over making every emitted site a destination (a river lined with roads to dozens of bridges) and over emitting no site until a route needs one (growth, epochs and drawn bridges would then place decks after L1 exists every time), because FTG turns only crossing road proposals into bridges and MFCG draws one bridge per street crossing (1–4 per city); chose one L0 batch of two same-level shore splits, nothing cleared, for a deck where no site stands on standing water (F-ROUTE's extra bridge, a drawn bridge beyond 20 m of every site) over the carve's preparation path, because nothing enters the water, so the only contact is the two shore points; and, inside S1's water operator or a carve, whose water is not yet inserted, chose to let F-ROUTE's rung only site its deck, placed by the operator's L1 batch and promoted by its L0 batch like the operator's other decks, over splitting shores that the operator's L0 batch removes (§2.7, §4.2 S1 (5), S3 (13), §4.3, §4.4; NP3-4, VD4-10). |
| J-P45 | Chose to force one of the N gate picks at the node where the plaza ↔ harbour least-cost lattice path (the wall ignored) leaves the pick contour, whenever the harbour lies outside it, with the harbour-gate rule as the pre-decided fallback if M1's measurement fails (p99 of harbour route ÷ that path ≤ 1.5 on B-CITY walled coastal seeds), over letting the harbour's bearing only score the picks (a jitter or terrain term can still move the pick away, leaving the detour unbounded) and over always adding a harbour gate beyond N (J-P35's objection), because the forced pick's gate route is that least-cost path's own prefix, so the harbour road leaves on the harbour side by construction and N is kept; where the harbour's nucleus has no unforced pick left (its `N₁` taken by polycentric forced picks), chose the detour guard unconditionally over raising that nucleus's `N₁` (breaks the gate law and the nested-pick prefix) and over releasing a polycentric forced pick (cuts the gate-to-gate route between the nuclei); a declared design change to `T` and the gates of harbour towns (no golden exists) (§4.2 S3 (4), (7), (11); NP3-7, NP4-4). |
| J-P46 | Chose the arena's outer ring (frame + context margin) as one L0 chain carrying `margin`, written first by S1, and the map border (the frame rectangle) as one L1 chain carrying `border`, written first by S3's L1 batch after S3's L0 batch, over both at L1 (every L0 face needs a boundary, and the sea and the rivers run out to the arena's edge) and over the border at L0 (L0 is land and water only, and it would split every water body the frame crosses), because the border then meets no generation L0 batch, S3 stays the first L1 writer, and an outer moat's carve and an edit keep it closed across new water by §3.3 rule 2 (§4.1, §2.2 rule 1; VK3-8). |
| J-P47 | Chose to run §2.6's wing carry after every committed batch whose commit record changes a footprint face — in generation or in an edit, in the pool, the hinterland unit or the generation worker — over naming its callers (S11 and the edit layer) and over forbidding S12b's L4 edges to end on a footprint ring, because a list of callers goes stale with every stage that writes L4 (S12b's gardens now, a stage-2 close-up or a registered stage later) while the commit record names every changed face by construction, and a garden's grid line or an orchard's edge meeting the house wall is the natural layout a ban would distort; generation, every pool size, replay and Regenerate (keep settings) then store the same bytes (§2.6, §4.1; NP4-3). |
| J-P48 | Chose to carry a stored stage-3 composition in the same `carryWings` call as the base wings — its boundary points made footprint vertices by the edit that stores it, boundary runs re-read by identity, other points by mean-value coordinates, the composed union checked, a failure outside a warp orphaning the stored record visibly — over leaving it at fixed coordinates (a warp would leave its roofs, rooms and 3-D export behind the moved house) and over re-composing it from the moved outline (which discards the user's edit that stored it), because the composition's union is the outline's by contract, so the same rules move it exactly as far as the ground under it moved (§2.6; NP4-2). |
| J-P49 | Chose to decide §2.6's wing check by the building's pairing — no union for a wing re-read whole, simple counter-clockwise rings for tiled wings (exact by the winding-number identity; 75 884 of 75 884 agreements with the full geometric test, measured), the arrangement union only for overlapping wings — inside the step's whole-step validation, with a measured cost (≈ 0.4 ms a pass for 450 buildings, ≈ 3.6 ms worst case) counted in §12.6's warp Apply budget and a pre-decided fallback (one check after the final step, F-REDERIVE for a failure), over one union per building per step (up to ≈ 11 ms a pass for 450 buildings) and over checking only after the step, which re-derives a building that halving would have kept (§2.6 rule 4, §12.6; NP4-6). |
| J-P50 | *Chose to drop the stored slot hint over carrying it through every move as the wings are carried, because nothing after S11 reads it — a re-derivation recomputes the site plan and a later `compose()` reads the footprint the hint became.* (§2.5, archived l. 1201–1203) *(New row added by the consistency pass, 2026-09-26: the canon gave this inline passage, which had no row, the next free id.)* |
| J-R1 | Chose a columnar, transferable mark table over `Mark[]` objects because a 60 000-object list costs the receiving thread ≈ 140 ms to deserialise while typed arrays transfer in constant time and slice cheaply into deltas (§8.1). |
| J-R2 | Chose world-aligned tile rasters over per-district rasters because district boundaries are streets and a district bitmap cannot follow continuous zoom (§8.1). |
| J-R3 | Chose low-chroma value steps over saturated hues for the default roles because the restraint clause asks for one ink and a few roles, and eight tones meet every contrast floor (§8.2). |
| J-R4 | Chose Canvas2D as `lit`'s reference backend over WebGL2 because one drawing path keeps screen, PNG and print identical, removes the duplicate render path both creators warned about, and every part of the lit look has a vector or per-tile form within the tile budgets; normal-mapped relief is the only loss (§8.2). |
| J-R5 | Chose the ground tone over kerb hairlines as the city band's figure-ground because a kerb line doubles the linework at city zoom and fights the casing idiom; hairlines are the pre-decided fallback (§8.5). |
| J-R6 | Chose not to draw avenue trees at the city band over a thin green line inside the corridor because at city zoom a corridor is ≈ 2 px, where a line fuses with the casing and adds a ninth tone (§8.5). |
| J-R7 | Chose no S9 preview over a block preview because §12.5's laws hold the one-second bar without one for every TOWN and CITY and for METROPOLIS up to ≈ 14 200 buildings, the slower first map above is declared rather than hidden, and a preview's figure-ground differs from the finished picture (§8.5). |
| J-R8 | Chose settling on exact 2^¼ zoom stops over re-rastering at arbitrary scales because an arbitrary-scale raster defeats the cache and the per-stop label placement; the settled scale is within ± 9 % of the requested one (§8.8). |
| J-R9 | Chose Canvas2D glyphs composed onto the tiles over SDF text because once tiles are composited text never needs the GPU, and one text path keeps text identical on every output (§8.9). |
| J-R10 | Chose a handle-and-tiles worker boundary over sending the document or mark objects to the main thread because structured-cloning a CITY entity table costs ≈ 162 ms and a 60 000-mark list ≈ 140 ms, while bitmaps and typed arrays transfer in constant time (§8.9). |
| J-R11 | Chose stamped, ranked scatter tiles over per-entity Bridson sampling because sampling costs ≈ 12 µs per tree while a stamp costs under 1 µs, and ranked tiles give every band a subset of the finer band by construction (§8.10). |
| J-R12 | Chose label placement as view data measured with our own font metrics over placement in the model, because collisions change with zoom inside a band, and over the host's text engine, because engines shape text differently (§9.1). |
| J-R13 | Chose a minimal own emblem generator plus import over import only and over a full blazon engine, because the legend should carry an emblem in one click at a fraction of a person-week and heraldic depth is not a map-parity item (§9.5). |
| J-R14 | Chose to build CityJSON over leaving it for later because its integer-vertex-plus-transform encoding carries our centimetre lattice losslessly, so the exporter is thin, and it gives GIS users a standard 3-D path (§11.1). |
| J-R15 | Chose host-as-store over a sync service of our own because the product is a standalone, backend-free library, a host already owns accounts and storage, and §11.3's protocol makes any host a correct store (§11.5). |
| J-R16 | Chose a transport-agnostic bridge plus the static VTT exports over a Roll20 extension because an extension needs an account and store publishing outside a standalone program, and FTG's extension only relays the same messages (§11.5). |
| J-R17 | Chose a per-building cost of ≈ 58–75 µs at p95 over matching MFCG's 12–39 µs because PLAT builds what MFCG does not, which D-7 ranks above speed; the first map stays under one second for every TOWN and CITY request and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people), and the slower first map above that — ≈ 2.3 s at the 120 000 cap — is declared for the owner's veto rather than hidden behind a preview (§12.5, §12.9; NR3-5). |
| J-R18 | Chose the derivation pool as the primary configuration over a single worker because after the eager allocation the per-district stages are pure functions of eager upstream state and their own sub-streams, so they run in parallel without shared writes; M1 and M2b keep it primary only at the sizes where it measures faster than a single worker (§12.3, §12.9; J-R44). |
| J-R19 | Chose the low 64 bits of the entity key — the seed key mixed with the lineage hash, layer and island — as the one key of every render-time hash over the bare lineage hash, the address and the interned handle, because the lineage alone carries no seed and would repeat the same looks at the same derivation positions in every town (VD2-6), the entity key is what every stream of the entity is drawn from, so a New random re-rolls its look with its shape, and handles are session-local, which broke pixel identity across reloads (§8.1; NF-D10). |
| J-R20 | Chose a slot-major draw order with passes inside each slot over the pass-major order, because pass-major drew every road casing over masses, fields, woods and shadows against the slot table's reasons, while separate casing and body slots keep GEO-28's guarantee (§8.1; N-7). |
| J-R21 | Chose composing base and labels into one bitmap per tile in the tile worker over two tile layers committed to the main thread, because it halves first-paint commits and per-frame draws at the same memory while a label change still never re-rasters the map (§8.8; N-5). |
| J-R22 | Chose a canvas budget derived from the viewport (3P + 7 MB) with tier ceilings and a tile-DPR step-down over fixed per-tier numbers, because the fixed low and mid budgets could not hold their own worst-case views (§8.8; N-9). |
| J-R23 | Chose to run every model-reading render step — live-layer providers, override resolution, on-demand bands, `compose()`, close-ups — where the model is, and to give the tile worker display-list tables only, over a model replica in the tile worker, because a replica doubles the working set and must follow every edit (§8.9; N-4). |
| J-R24 | Chose to apply an instance override by ordinal only while the entity's lineage and the ordinal's position both hold over applying it whenever the address survives, because a carried successor keeps the address but not the lineage, so the same ordinal lands on another tree (§8.10; NF-D11). |
| J-R25 | Chose bit-reversal (van der Corput) ranks for jittered grids and lines over a second blue-noise ranking, because the rank is then a pure function of the ordinal and as stable as it (§8.10; N-10). |
| J-R26 | Chose pins fixed at their own and finer stops and yielding at coarser ones over pins fixed at every stop, because a pixel-sized pin grows in world units as the view zooms out and would collide there (§9.2; N-28). |
| J-R27 | Chose to decide the quarter-tree rung from geometry before the greedy, with one ancestor candidate per stop, over letting it arise from collisions inside the greedy, because the local evaluation needs every candidate's place in the strict order fixed in advance (§9.2, §9.4; N-11). |
| J-R28 | Chose `ground` as the one fallback halo role, and darker inks for `lit` and `hatched`, over per-family halo roles and lower floors, because the matrix already guarantees ink against ground in every accepted palette and outlines over masses need the separation (§8.2, §9.4; N-3). |
| J-R29 | Chose to draw `ink`'s walls in the ink and its courts as ground at the city band over a ninth city-band tone, because the restraint clause names one ink and 4–8 roles and an enclosed court's small step adds noise at city zoom (§8.2, §8.5; N-25). |
| J-R30 | Chose a bounded random-style repair — fixed row order, ≤ 100 steps, ≤ 3 draws, then the shipped palette — over the unbounded raise, because only a bounded procedure can promise that every presented style meets the floors (§8.2; N-26). |
| J-R31 | Chose a strict WGS84 GeoJSON by an inverse transverse Mercator at a documented default anchor, plus a metric file by prior arrangement, over a local metric CRS with a `crs` member, because the latter fails RFC 7946 and is read by GIS tools as degrees (§11.1; N-14). |
| J-R32 | Chose glyph outlines as SVG's default text over embedded text, keeping the embedded face as an option, because only outlines draw the same glyphs in every consumer (§11.1; N-13). |
| J-R33 | Chose fate confirmation by token and fate equality (or resubmission with fates filled) over a force flag, because the committed event must carry exactly the fates and renames the user saw (§11.2; NF-D14, VD4-4). |
| J-R34 | Chose a per-viewer `stylePreset` view key over treating the canonical style as a last-writer-wins view key, because a viewer's look must neither rewrite the shared style nor silently diverge from it (§11.3; N-15). |
| J-R35 | Chose first-map budgets as laws of the building count, with the one-second knee and the miss above it declared, over one bar per rung, because size follows population inside a rung (§12.5; N-2). |
| J-R36 | Chose to state load verification as a law of the log (V = M(B) + Σ c(e) + S14 + 5 ms) over saving checkpoints, because checkpoints would multiply edit-heavy documents while the wait is already off the path to the picture (§12.6; N-16). |
| J-R37 | Chose to let a CI font test pick each face's small-caps and figure path — the face's features, the family's OFL SC cut, then synthesis — over assuming the GSUB features, because nothing in the project shows the default face carries them (§9.2; N-12). |
| J-R38 | Chose to read O3 (d)'s model-time bars over every size a rung builds and to declare where they hold — p95 up to ≈ 4 500 / 17 700 / 58 800 people, the max (each generation ≤ 1.25 × its own law) up to ≈ 3 400 / 13 600 / 45 800 — and the miss above them for the owner's veto, over reading them at the targets only, because size follows population inside a rung, as N-2 ruled for the first map, and a reading at the targets hides the miss; and chose to judge the max on outliers confirmed by the median of three solo re-timings over the maximum of the contended nightly screen, because one scheduling stall on a shared runner would otherwise fail the gate and, through the fallback, loosen the promise on noise (§12.3; NR-1, NR3-4). |
| J-R39 | Chose explicit passes on `OrderSlot` with most-specific-wins resolution and refusal of any unresolved or tied (semantic, pass), with `derived` entries for the raised under-copy and projected shadows, over one slot per semantic or an order fixed in code, because a way's casing and body must sit in different slots while sheets stay data (§8.2; NR-3). |
| J-R40 | Chose furniture-placement and snap queries answered by the tile worker within one frame — the first class of its queue, served between the steps of resumable raster jobs (`TileBackend.begin` → `RasterJob.step(8)`) — over copying mark kinds and vertices into the main thread's hit-test slices or placing furniture in the generation worker, because the slices would carry model-sized geometry and the generation worker's index has no kinds, vertices or placed labels; and chose the resumable job over a synchronous raster call because a worker serves its message queue only between calls (§8.9; NR-4, NR3-2). |
| J-R41 | Chose a transient display list built in the generation worker for SVG exports and released after writing, over handing SVG to the tile worker or keeping a second resident list, because the SVG writer reads the document, which the tile worker never holds, and exports are occasional (§11.1, §12.8; NR-5). |
| J-R42 | Chose a constant stream key for the stamp-tile library — (class, reference spacing, creation index: 0–3 for the four tiles, 4 for their shared border band), `STAGE_VIEW`, `render.stampTiles` — with integer-centimetre points, `dmath` transcendentals, index-order sums and ties and the stated removal update, built when the product is built by `plat/tools/stamptiles/` and shipped as a hash-checked asset, over a seed- or document-keyed library and over building it in each session, because the tiles are shared by every document, session and host, the per-town variety comes from the stamp's offset, rotation, spacing and seed-dependent variant, and a session build ran unbudgeted on the first district-band settle in both workers (§8.10; NR-6, NR3-7, NR4-1). |
| J-R43 | Chose a declared PLAT CityJSON Extension for `+platGeoAnchor`, validated in CI against the repository's schema, over a sidecar as the primary, with a `<name>.geoanchor.json` sidecar as the pre-decided fallback, because the extension keeps the anchor inside the one file a GIS user moves around and the sidecar leaves the CityJSON file valid by construction (§11.1; NR-7). |
| J-R44 | Chose to keep the derivation pool primary at each size where it runs within its law + 10 %, measures faster than a single worker on the same generations and gives identical digests for pool sizes 0–3 — each size range otherwise running the configuration faster at the nearest measured size — over one bar of p95 ≤ 300 ms at the CITY target, because the pooled law itself puts the default CITY request at 265–340 ms, so that bar would have replaced the pool by a single worker ≈ 85–115 ms slower exactly when the pool met its budget, and pool size never changes the model, so choosing per size range is configuration only (§12.3; NR3-1). |
| J-R45 | Chose a pin pass at placement time — a stop's pins in `moveLabel` order, a pin meeting an earlier fixed pin hidden at that stop and reported — with `moveLabel`'s refusal kept as the interactive guard, over refusing the warps, renames, rerolls and style changes that bring pins together, because those edits are not about labels and must not be blocked by one, while hiding a pin is a reported view change; and chose `moveLabel` order over priority order because the guard already gives the pin that stood first precedence and a stored `seq` does not move when priorities or areas change (§9.1, §9.2; NR3-3). |
| J-R46 | Chose four fixed classes in the tile worker's queue — queries, incoming deltas and band answers, the visible view, exports — run one resumable step at a time, with an export that has waited 100 ms given one step, over first-come order and over strict priority alone, because an A2 print's bands would otherwise hold newly exposed tiles behind up to ≈ 20 s of export work and strict priority lets an animated view stop an export; and chose to apply deltas ahead of the view's rasters because every tile that waits for one is visible work (§8.9; NR3-6). |
| J-R47 | Chose a transient display list, built by the generation worker and transferred with the request, for PNG, print and `.dd2vtt` exports, over rastering them from the view's list, because an edit made during a long export would change the view's list between two bands and tear the picture, and the view's list holds finer bands only for the districts the view has visited; the price is the export-time peak §12.8 already counts for SVG, now held in the tile worker, and its canvases counted against the tier's ceiling (§11.1, §12.8; NR3-6). |
| J-R48 | Chose one set of four stamp tiles per class at a reference spacing of 4 m, scaled per entity by its spacing ÷ 4 m, over a set per (class, spacing), because the spacing is drawn per entity in whole centimetres, so a per-spacing library has hundreds of members per class (≈ 19 ms each to build, megabytes as an asset), while uniformly scaled blue noise keeps its property, its ranks and its ordinals at one multiplication per point (§8.10; NR3-7). |
| J-R49 | Chose a timing phase — every gating CI timing taken last in its tier and alone on the runner, in calibrated batches — over a noise rule per check, because runner contention inflates every gating timing the same way (a five-seed p95 is in effect a maximum), so one mechanism protects the sweeps, the first-map runs, the pool comparison and the max-clause re-timings at ≤ 20 min of the nightly budget (§12.1; NR3-4). |
| J-R50 | Chose four seam-compatible stamp tiles per class sharing one border band — the points within half the reference spacing of a tile edge, cut from a fifth, full toroidal tile, each tile filling the rest by Bridson seeded with the band — over the independent variants (3.5–5 pairs of trees per 64-m seam closer than the spacing), over one larger toroidal tile (every instance position repeats on a periodic lattice), over a band of the full spacing (≈ 23 % of each cell's points repeated instead of ≈ 12 %) and over a band sampled by Bridson inside itself (a density stripe along every lattice line), because the half-width cut band gives 0 close pairs across every seam for every band's subset (measured on all 256 2 × 2 arrangements) while keeping ≈ 88 % of each cell varying and a full tile's density; the price is slightly larger holes along the band's inner edge (largest empty circle 1.20 × r₀ against ≤ 1.08) (§8.10; NR4-1). |
| J-R51 | Chose S13b as a resumable placement job — one decision per unit, the local evaluation on an explicit stack with the memo kept between steps — stepped in the tile worker's queue (class 3 for the view, class 4, first, for an export) over running it whole at a stop, because a large print's placement grows with the candidates in its frame and would hold queries and the view behind one unbounded unit, while every unit boundary is a safe stop that leaves the placement digest unchanged (§8.9, §9.2, §11.1, §12.7; NR4-2). |
| J-R52 | Chose integer-centimetre instance positions computed with `dmath` (R_θ from the integer `rotationCdeg`), the whole instance function under §6.5's allowlist lint, over double positions from the engine's `Math.cos`, because the model-format exporters write those positions and promise files byte-identical on every host, and the centimetre is the model's own lattice, so the face test is exact too; the price is ≤ 1.5 cm off the spacing (§8.10, §11.1; NR4-3). |
| J-R53 | Chose, for a PNG time miss, the None row filter on every row on every host — then zlib level 3 in Node, and in browsers, whose `CompressionStream` takes no level, the D-18 re-declaration — over zlib level 3 alone, which browsers cannot apply and which measured the smaller lever, and over a fixed Sub filter, which measured slower and larger than None on flat, relief and textured synthetic maps; and kept the per-row minimum-sum rule as the default because it gives the smallest file wherever rows carry gradients or texture (§8.8, §12.7; NR4-4). |
| J-R54 | Chose a light step — the path sun quantised to 15° of azimuth and 5° of altitude — for `faceLight`, the two-tone roofs, `hillshade` and the `lit` crown bake, keying the `under` and `over` layers (or `base`) by it and re-rastering them in a light pass that runs to completion, over lighting them by the 1° sun (a full re-raster per 1° step) and over keying only the shadows by the sun (roofs and crowns of several suns side by side, differing by tier); the fallback holds the fixed sun for all but the shadows (§8.4, §8.8, §8.10, §12.7; NR4-5). |
| J-R55 | Chose to build the tiles at build time and ship them over building them in each session because the session build ran on the interaction path — the first zoom to the district band, under §12.5's ≤ 150 ms settle — with no budget, in both workers, and NR-6 had already made the tiles a constant, so a build-time asset costs a bundled ≈ 31 KB and a hash check instead (NR3-7). (§8.10, archived l. 7874–7877) *(New row added by the consistency pass, 2026-09-26: the canon gave this inline passage, which had no row, the next free id.)* |
| J-R56 | Chose a max clause relative to each generation's own law over one absolute maximum per rung because a generation's building count varies with its seed, so only a ratio to its own law separates a slow generation from a large one. Chose confirmation by the median of three solo re-timings over the maximum of the contended screen because one garbage-collection pause or scheduling stall of ≈ 60 ms on a ≈ 240-ms CITY generation — exactly the tail a maximum over 12 000 contended timings picks up — would otherwise fail the gate with no change to the generator, and its fallback would then loosen the owner-facing promise on noise; a generation that is really slow is slow three times out of three (NR3-4). (§12.3, archived l. 8885–8891) *(New row added by the consistency pass, 2026-09-26: the canon gave this inline passage, which had no row, the next free id.)* |
| J-S1 | Chose to tag every acceptance letter C / P / O and to require a P or O letter for each first-weighted improvement over citing the existing numbers as evidence of improvement, because most of them hold by construction and would pass while the town reads worse than MFCG or FTG (IMP-4; §15.2). |
| J-S2 | Chose a written, blind side-by-side protocol with the owner as the declared rater over tester counts and an unstructured "owner's eye", because the program has one human and an eye without fixed seeds, blinding and a pass rule can be steered (IMP-4, IMP-11; §13.6). |
| J-S3 | Chose to give every threshold a number now, with a confirming milestone and a pre-decided fallback, over placeholders set by the corpus phase, because the corpus comes after the whole standalone program and placeholders either block a milestone or get promoted silently (IMP-6; §13.7). |
| J-S4 | Chose byte identity for Regenerate (keep settings) and, for New random, a calibrated rank test — each regenerated statistic's rank among K = 50 from-scratch generations of the same scope, ties broken by a uniform draw, a 10-bin χ² test per statistic with Holm at family-wise 0.01 over a nightly campaign of 800 scopes (400 block, 400 district; VS2-9) — over two-sample KS tests per regeneration and over a fixed 95 % pass rate of an empirical central band, because both of those fail a perfect regenerator (the band passes it only 70–79 % of the time on four statistics, executed) while ranks are exactly uniform for any K; the executed calibration — false-failure rates, detection at ρ = 0.8 and ρ = 1, and the 92–95 % that 400 scopes caught — is §13.2's; the randomised tie-break is what keeps a discrete statistic calibrated (without it a perfect regenerator failed every campaign) (IMP-7; §13.2, §15.2 O9 c). *(Amended by the consistency pass, 2026-09-26: the detection figures point to §13.2's executed counts instead of restating a bound (SCOPE-C03).)* |
| J-S5 | Chose requested-feature delivery by tier and time on MFCG's worst configurations over "0 whole-map restarts" as the acceptance number, because the latter is true by construction (IMP-5; D-9). |
| J-S6 | Chose to state the honest 150–200 pw — now 153–204 with the fix-all rounds' components (J-S43) — and record the possible cuts for the owner's veto over cutting scope to keep 100–130, because the owner asked that nothing be deferred (IMP-2; D-20). |
| J-S7 | Chose to put the editing core before the second preset, split M3 and give the module its own milestone over moving exports, forms and the module out of the base release as the red team proposed, because the owner's no-defer rule keeps them in the program while D-7 still orders the work (IMP-3; D-35). |
| J-S8 | Chose implementer inputs = this document plus a checked digest, a separate repository and a numbers-only baseline file over path-based CI rules alone, because the findings themselves quote GPL code and reference creative data (IMP-1; D-29). |
| J-S9 | Chose a hashed deny-list of non-dictionary tokens, ordered 3-grams, colour values and file bytes over a plain word list, because a plain list would copy the reference content into the product repository and would trip on ordinary words any medieval roster shares (§17.1). |
| J-S10 | Chose a proprietary default licence over leaving the licence undecided or defaulting to an open licence, because it keeps every option for the owner (DEF-14; D-22). |
| J-S11 | Chose FTG's free BIG_TOWN and BIG_CITY sizes and no purchase over a CITY-only FTG comparison or a purchase by the program, because a purchase is the owner's alone and the free sizes cover two of three rungs (FTG-16; D-31). |
| J-S12 | Chose 1 500 inhabitants as both the base's floor and the village ceiling over a 2 000 clamp, because a gap would leave requests between the ladders unanswered exactly where MFCG's creator admits its small towns fail (COV-VG-VN-088; D-33). |
| J-S13 | Chose modest per-rung granularity and greenery modifiers in one `RungProfile` table over identical rows at every rung, because the owner asked for them to be defined per rung and land pressure rises with town size (AM-4; §1.1). |
| J-S14 | Chose to put economy, personality, stats and the family tree in the module with base schema stubs, flagged for the owner's veto, over leaving them unrecorded or putting them on the one-click path (COV-FTG-B10, C03, C11; D-32). |
| J-S15 | Chose IM FELL Great Primer as the default label face over a different serif chosen for "clean-room distance", because fonts are OFL assets outside the clean-room rule and the face belongs to the adopted ink look (IMP-15; §17.2). |
| J-S16 | Chose three CI tiers with fixed wall-clock budgets over one full run per change, because the full rig costs 10–20 CPU-hours (SCL-18; D-34). |
| J-S17 | Chose to resample curves at 10 m and compare junction-to-junction runs over per-vertex turn angles and edge lengths, because the latter measure the polyline representation, not the town (FTG-15; §13.5). |
| J-S18 | Chose MFCG's input idiom, stated in an editable keymap, over leaving hotkeys unstated in the app (COV-MFCG-L08; §14). |
| J-S19 | Chose WCAG 2.2 AA for the app's chrome with the gazetteer and "features in view" lists as the non-visual route to the map over no accessibility statement, because FTG's users asked for list access and the map canvas alone reaches no one who cannot see it (COV-FTG-A24; §14). |
| J-S20 | Chose to let a panel the owner has not rated continue the build with the milestone's D-5 status *provisional — not rated*, never claiming the gate and re-offered at every later milestone and release, over blocking the build until the owner rates and over claiming the gate on the numbers alone, because the no-defer rule forbids idling the program on one person's calendar while D-5 makes the owner's eye part of "mastered" (§13.6 (7), §16; NF-S2). |
| J-S21 | Chose to ship candidate 1 as the `house` sheet — selectable, never the default — when the owner has made no pick by M4's exit, with the pick re-offered, over shipping no `house` sheet or letting a seat choose by its own eye, because the owner's later house style must exist in the release while only the owner's eye may choose among the candidates or change the default (§13.6 (8); D-1; NF-S2). |
| J-S22 | Chose machine-readable shift, cascade, milestone, parity and D-5 records inside `plat/goldens/`, with `docs/validation/` copies generated from them, over keeping the records in `docs/validation/` and exempting them from the repository path rule, because an exemption is a hole in the clean-room boundary while the records hold only numbers, hashes and answers (§13.3, §13.5, §13.6; NF-S1). |
| J-S23 | Chose to declare a moved placement digest as an S13b view shift that bumps the style version of every affected sheet and no output version, over bumping the output version or leaving placements untested across engines, because placement is view data outside the model digest (§9.1) and the style version is already the axis that carries pixel identity (§6.4, §13.3; N-24). |
| J-S24 | Chose `labels ← render` with the renderer's symbol extents and display-list index passed into S13b as parameters (`ObstacleSource`, `RoleIndex`) over `render ← labels` or an undirected pair, because the tile worker runs placement and placement needs the drawn extents, while keeping `labels` free of paint code lets placement run and be tested against a stub obstacle source (§14; N-22). |
| J-S25 | Chose FTG's turning per 100 m as a *target* for organic presets with the row's declared 0.5–1.5 × band over dropping the clause or applying the band rule, because FTG's curvature is a legitimate anchor for organic streets while its per-seed spread over at most eight payloads is too narrow to stand for its generator's variation (§13.5; NF-S3). |
| J-S26 | Chose to mark a letter *not achieved* — entered in `known-defects.json`, never cited as improvement — whenever its fallback moves the threshold to a measured value, over letting such a fallback pass silently, because a threshold reset to its own measurement passes by construction (§13.7; NF-S5). |
| J-S27 | Chose to key town-level draws and per-document furniture (the compass, the emblem) from the town root's entity key, which depends on the seed key alone, over the document id, because `docId` is random and minted outside the model, so the same recipe would draw a different compass in every copy and from every link (§14, §9.5; NF-D12). |
| J-S28 | Chose to generate METROPOLIS from M1 — the rung is a `ladder.json` row on the one pipeline — with M2b measuring and tuning it and its budgets gating from M2b, over "M2b builds METROPOLIS", because M1's goldens, B-CITY runs, determinism tests and diagnostic panel already take all three rungs as inputs, a rung costs no code of its own, and read literally the old wording left M1's gates unable to run a third of their inputs (§1.1, §13.2, §16; VS2-2). |
| J-S29 | Chose `H32(s)` = the first output word of MurmurHash3's x86 128-bit variant over the UTF-8 bytes of `s` with seed 0, over a word-by-word fold through §6.1's lane-0 finaliser, because the published algorithm fixes padding, tail and length handling and has a published verification value that the product CLI and the research-side panel script can each check, and §13.6 (2) now carries check vectors, while a fold through a finaliser whose constants and salt §6.1 does not spell out would still let two faithful readings draw different panels (§13.6 (2); VS2-6). |
| J-S30 | Chose 800 regenerated scopes per nightly faithfulness campaign over 400, because a scope's four statistics move together and, correlated at ρ = 0.8, 400 scopes catch a +0.25 sd bias or 0.8 × snugness on only 92–95 % of nights, while 800 catch them in 2 000 of 2 000 campaigns (executed) for ≈ 6 more CPU-minutes a night; the false-failure rate (1.0–1.4 %) does not depend on n (§13.2; VS2-9). |
| J-S31 | Chose to extend §6.5's allowlist lint to the renderer code that feeds S13b — the `ObstacleSource` and `RoleIndex` implementations, what they call and the S14 writers of the columns they read, found as import closures — over linting all of `@plat/render` or leaving S13b's inputs unlinted, because only these inputs reach a bit-compared digest, while paint programs and backends produce pixels that visual regression compares within a threshold (§6.5 (3), §13.3, §14; VS2-4). |
| J-S32 | Chose scripted document checks before M-1 — identifiers, colour values, token 3-gram runs of five or more tokens against the findings and the captures' JSON, copied lists in any order, table rows and pointers, in `docs/validation/bench/doc_checks.py`, with a reviewed allow file and a non-zero exit, run by every seat that writes this document (a fix-all integration seat, an amendment pass's apply and repair lanes, any finishing or repair seat) before its change lands — over round 2's hand-run identifier grep and over binding the fix-all integration seat alone, because that grep passed any pasted palette, table or grammar and missed a broken table row, and an amendment pass's lanes write this document directly; the 3-gram runs flag a copied list at a size a reviewer clears in minutes (47 runs, 45 distinct, over §13–§17 as they stood after round 2 — executed, `fixall_verify_scope_r3_cleanroom_checks.out` part C and `fixall_scope_r4_cleanroom.out` part A, on the committed slice `fixall_scope_r4_calib_pre_r3_s13_s17.txt`) (§17.1 (2); VS2-8, VS2-1, VS3-4, VS3-5). |
| J-S33 | Chose one FTG pair per FTG capture at the rung's matched size — each capture used once, in capture order, its PLAT side generated at FTG's population and the capture's water setting with a seed hashed from the capture id — and the two-thirds rule counted per rung (2 of 3), over pairing PLAT's ten seeds per rung with three captures, because FTG cannot be seeded and M-1's free allowance gives three captures per size: reusing a capture would count one FTG town several times, and a pairing rule left unstated would let the pairs be chosen after rendering (§13.6 (2), (3), (6); VS3-6). |
| J-S34 | Chose, for M5's panel against NG, five seeded pairs for each of NG's four templates — `area`, `street`, `square` and `ring` — with NG's seed from `H32` reduced into its MINSTD range at NG's `medium` size, and PLAT's side a district opened with the same template — `area` = the base's `bent-cut` fabric opened as a `refine` close-up, `street`, `square` and `ring` by `setAttr(district.fabric, template)` as `replace` close-ups — whose building count is within ± 20 % of the NG hood's, found by a committed search over 32 PLAT towns from the METROPOLIS target to the cap, with a `sizeMismatch` fallback, over the three templates without `ring`, over matching ground scale and over a PLAT district at one fixed size, because PLAT registers all four templates as fabrics (II.2), NG's view rescales its hood to the frame so only the building count can match the two sides, and NG's size tags give building counts in steps (≈ 71–96, 736–779, ring ≈ 1.6–2.1 × those) that a district of one town size may not reach (§13.6 (2), (3); VS3-6). *(Amended by the consistency pass, 2026-09-26: the `area` mapping of VS5-2.)* |
| J-S35 | Chose to add a list check — a line holding five or more members of one list recorded in the captures' JSON, in any order — beside the JSON extension of the 3-gram check, over the 3-gram extension alone, because a 3-gram needs the list's order: on 429 lists of FTG's content database the 3-gram checks catch none of the alphabetised five-name lines (210 of those in the database's order), the list check all 429, at a cost of 8 lines to review over the whole current document once the profiler's recordings — code identifiers and events, which raised 77 such lines — are left to the identifier and 3-gram checks (§17.1 (2) (vi); VS3-4; `fixall_scope_r4_cleanroom.out` parts B–C). |
| J-S36 | Chose to carry the same list check into M-1's hashed deny-list — per reference list, the set of salted digests of its members' words, and a hit when one line or one table column of the product holds five or more of one set, cleared only by a reviewed allow entry — over leaving the scanner with token and ordered 3-gram digests, because an alphabetised copy of a list of ordinary words, such as a building-type or profession list, passes both: its words are in the spell-check list and its order is not the reference's (§17.1 (5); S4-1, found while fixing VS3-4). |
| J-S37 | Chose to measure memory under load verification, and the edit made while it runs, at M2a, to test the naming-input re-draws at M3a, and to give §2.9's rebased-document size test the milestone M2a, over the M1 and M2a timings the requests and §2.9 named, because a milestone can measure only what it or an earlier one builds — the log and load verification arrive at M2a, over the document format M1 builds for generated towns (VS4-3); table edits, setting packs and upgrades, the only inputs a naming re-draw follows, at M3a — while M1 keeps its memory and size tests of generated towns (§16; VS3-1, VD3-5, VD3-2, S4-2). |
| J-S38 | Chose an optional `at` on `EditEngine.rebase` — the log head by default, `h₀` when the saved town is kept after edits made during load verification, anything else refused — over a second method for keeping the saved town, because the `rebase` event already carries `at` (§7.1), one entry point keeps §7.4's single rebase row and its undo, and the head's state and the decoded snapshot are the only states the engine holds materialised; and chose to return an `ApplyResult` — the refusal a `conflict` with one `invalid` action whose message begins `E_REBASE_AT`, nothing appended — over a thrown error or the document returned unchanged, because `apply`, `undo` and `redo` already report through `ApplyResult`, a host bridge relays a status and not an exception, and two faithful implementations must refuse alike (§14, §7.1; VD3-7, VS4-2). |
| J-S39 | Chose to extend the table check with a cell count — every row has its header's number of cells, counting only unescaped pipes — and to escape J-I15's pipe with a backslash, over rewording code spans to avoid pipes or treating a code span as pipe-safe, because GitHub-flavoured Markdown splits a cell at every unescaped pipe character, code spans included, and drops the cells beyond the header's count, so the unescaped count is the renderer's own rule; it flags exactly J-I15 in the round-4 text, which the first-and-last-character rule passed (§17.1 (2) (iv), `doc_checks.py` S1; VS4-1). |
| J-S40 | Chose to build the `.plat` writer and reader for generated towns at M1 — the manifest, content-addressed chunks, gzip and an empty log; a saved town of the running output version opened by checking its recomputed root, a differing root regenerated from the recipe, and a document of another output version never root-checked but opened as §2.9 step 2's frozen view — over moving the document-size test and the *preview* documents to M2a, because a milestone can measure only what it or an earlier one builds and the format needs nothing from the log, while the size budget is best learnt before editing is built on it; M2a keeps the log, the one fold and load verification over that format, and ≈ 0.5–1 pw moves with it from M2a's row to M1's (§16, §2.9, §3.9; VS4-3). *(Amended by the consistency pass, 2026-09-26: M1's reader and a document of another output version, VS5-1.)* |
| J-S41 | Chose to generate the PLAT side of an FTG pair at the capture's recorded population — the residents its decoded payload holds, carried to the product in a committed research-side `ftg-captures.json` with the capture's id, rung and water setting — over FTG's nominal size targets and over the product reading the capture folders, because the picture being compared holds the recorded population (FTG's targets are approximate), a pair must be reproducible from its record (`D5Pair` now holds the population), and the product may not read `captures/` (§17.1 (3)); a capture that yields no count falls back to its size's target, marked (§13.6 (2), (3), (9); VS4-4). |
| J-S42 | Chose `SquareFabric`'s `void` mode for NG's `square` pairs and as the default of II.2's `square` row over the `carved` plaza, because NG's own square is the void its unbuilt plots leave, the panel must compare like with like, and a panel should rate the default a user gets — so the default and the paired form are one (§13.6 (2), II.2; VS4-4). |
| J-S43 | Chose to widen the fix-all line by 3–4 pw for the six new components rounds 4 and 5 added in the other areas — naming records and confirmed renames, `carryWings` with its composition carry and pairing check, crossing-site state, the resumable raster and placement jobs with their queue, the stamp-tile asset and tool, the records digest (≈ 14–22 working days, itemised) — and to name the line that absorbs each refinement, over declaring all of them absorbed, because an absorption with no stated basis is the unpriced state VS4-6 found and the §16 choice is the honest total; the total becomes 153–204 pw, the milestone rows moving with the components, and every later pass prices its build work the same way (§16, D-20; VS4-6). |
| J-I1 | Chose **one quarter merge tree**, built by S6 with one cost (combined area, + 1 000 ha across kind families, + 10 000 ha across a wall or water barrier) and cut at MFCG's count law for the city band, over the two mechanisms the drafts proposed (a flat grouping in §4.5 and a label-side tree in §9.4), because the model and the label ladder must agree on what a quarter is and one tree serves both the count law and the zoom stops between bands (§4.5, §9.1, §9.4; integration C-1). |
| J-I2 | Chose **no preview at any rung** over the pipeline draft's METROPOLIS-only block preview, because the derivation pool meets the one-second bar at every TOWN and CITY and at METROPOLIS up to ≈ 14 200 buildings, a preview's figure-ground differs from the finished picture (MFP-1), and both the slower first map above that knee and the single-worker fallback's lower knee are declared in §12.5 instead of hidden behind a partial map (§4.1, §8.5; C-2). |
| J-I3 | Chose **label placement as view data at every band** (S13b) over eager city-band placement in the model, because placement depends on zoom stop and font metrics (GEO-29) and the bundled fonts' own metrics already make it identical on every engine without entering the digest (§4.1, §4.10, §9.1; C-3). |
| J-I4 | Chose to make every entity schema reach geometry only through the kernel's views and persisted lattice points, and store no seed or stream key, over the pipeline draft's slot lists and stored sub-seeds, because rule 5 of §2.2 (GEO-5) and the lineage-keyed streams of §6.1 (LC-1) are the fixes those findings require; the drafts were written in parallel and the schemas had not yet followed them (§2.4–§2.7, II.1; C-6, C-10). |
| J-I5 | Chose **one travel-cost field** for all growth stages — computed at S3 on the solved gate routes with the road multiplier (recomputed once after S3's L0 batch when a moat was carved) and re-settled incrementally where S5b's main roads lower it; stage 1's boundary is taken at S3, stage k's before its own S5b, each at the cumulative land of stages 1…k — over a fresh field per stage (a Dijkstra per stage) or S4's plaza-rooted field (which lacks the road-corridor anisotropy FTG-5 requires) (§4.2 S3, §4.4, §12.4; C-11; amended by NF-P1). |
| J-I6 | Chose furlong-sized field faces in the model with open-field strips as render-time segmentation over strip faces in the model, because the strip look needs no model faces while crop, livestock and rotation are per furlong (§4.9; C-13). |
| J-I7 | Chose to keep the rendering area's shadow budget (≤ 20 % of a tile's raster time) and add the pipeline area's pre-decided `drop`-mode fallback with an M2b measurement, over a frame-share budget, because tiles are the unit the renderer measures and the fallback costs one mode switch (§8.4; C-15). |
| J-I8 | Chose to re-derive the kernel's range bound at the population cap (120 000; ≈ 6× headroom under 2²³ cm at aspect 2) over the METROPOLIS target (≈ 9×), because the cap is the largest arena the ladder admits (§3.2 (1), §12.2, D-12; C-16). |
| J-I9 | Chose to build, in one eager **shared-edge step** (S10 (0)) on the generation worker after S10a and before the pool's freeze, the bands around every L1 edge two overlays' face sets share without corridors — each wall trace's band, setback, glacis, tower and gatehouse parts on both sides, and a 2 m margin band (a backland strip and a headland) along the settlement perimeter and any reservation boundary two districts share — over running those parts inside the district overlays and letting pooled plot and furlong lines end on the shared edge, because a line ending on an edge splits it and two overlays splitting one base edge fail §3.3's scope check at the merge (or, if allowed, make each side's faces depend on the other's lines); the price is ≈ 3 ms on CITY's critical path and a 2 m unbuildable strip on each side of the perimeter (§3.3, §4.1, §4.5, §4.7, §12.4; round-2 C-3, C-7). |
| J-I10 | Chose to adopt the pipeline's local coarse insertion as the kernel's **clear regions** — a carve, an outer moat or a re-carved reach clears finer content only inside its footprint — its new chains ⊕ (`attractCm` + bank setback) united with every L1 cell its way rule touches (§4.11, J-P34) — and meets finer geometry only at the vertices a preceding finer batch prepared and named in `KernelTx.prepared`, which it promotes (VK2-3) — over the plain rule that an L0 batch clears every finer face of its land component, because the plain rule makes one canal re-derive the whole town while the clear region costs the footprint — the channel's banks and the few blocks its way rule reshapes; confirmed by M3a's carve fixtures, with the plain rule (and `moat: 'all'` only before the outer stage's S5c, an edit carve as a declared town-wide re-derivation) as the pre-decided fallback (§3.3, §4.4, §4.11, §7.3; round-2 C-4). |
| J-I11 | Chose to dissolve, after an edge removal, only degree-2 vertices carrying the kernel's `split` flag (created on an existing edge; cleared by a prepared contact's or a stretch end's promotion, by any move except a re-seat onto, or a slide along, the edge it split, and by a removal that breaks the run it split — J-K26, J-K28), over dissolving any degree-2 vertex without roles whose two edges match, because the broader rule would also delete a chain's own shape vertex on which a removed lane had been attracted and so straighten a street no edit touched (§2.2 rule 3, §3.4; round-2 C-5). |
| J-I12 | Chose the deck span of every bridge to be the carrying way's own L1 edge between the bridge's two `deck_end` bank vertices — placed at L0 by S1 and S3 at generation, placed on the kept way by a carve's or S1's water operator's preparation batch and promoted by the water's L0 batch in an edit — over the kernel draft's L0 deck edge laid on the way's edge by edge promotion, because the pipeline's and the determinism area's operators already build that form, generation builds it too (§4.1's S1 row places only the bank vertices and S4 lays the span), L0 stays land and water only (§2.2 rule 1) so no deck splits a water body's faces, and dropping edge promotion removes a second promotion kind no operator needs — its other use, a new bank along a kept quay, is served by cutting the quay back and extending it to the new bank after the water (§4.11 batch (3)) (§2.2 rules 3 and 7, §3.3, §3.6, §4.2 S1 (5); round-3 C-1). |
| J-I13 | Chose one preparation list for every coarse insertion — deck bank vertices (`deck_end`) on kept ways, water-gate bank vertices (`gate_end`, J-K29) on re-traced wall runs, the map's `border` line prepared at its bank points and kept closed, and transient `anchor` contact names at the two bank points of every other finer edge the new water crosses that is no way (a settlement-perimeter or district-boundary stretch, a setback or glacis line), the stretch between them removed — applied alike by §4.11's carve and §7.3 (b)'s water operator, with a carve that crosses a wall re-tracing the run with a water gate as the water operator does and a reservation in the channel's way an F-EDIT conflict, over the drafts' partial lists (the carve prepared decks only, the water operator decks and water gates only), because the kernel refuses every contact that was not prepared (§3.3 rule 3), so an unprepared perimeter or setback crossing would have made such a canal or river move fail with `E_LEVEL`; and chose that the preparation clears partition content only, whole faces, while the coarse batch clears nothing and only splits the faces it meets, so kept ways, walls and deck spans inside the footprint survive (§3.3, §4.11, §7.3 (b) 3; round-3 C-2). |
| J-I14 | Chose to count a load verification's replay model in the place of the pool's frozen arena copies — no copy is frozen while verification runs, because every edit made meanwhile runs its per-district stages in the generation worker by the pool-size-0 path (J-DET-43) — and to include the reference CITY document's load verification, with a district regeneration and a Re-derive from S3 made during it, in M2a's memory measurement (the milestone that builds the log and load verification over M1's document format; §16) under §12.8's existing fallbacks, over moving the replay to the generation worker when memory is short, because the replay needs its own model wherever it runs, so moving it saves no memory (§2.9 step 3, §12.8; round-3 C-3, round-4 VD3-5, VS3-1). |
| J-I15 | Chose the kernel's naming for the points where S1's water operator meets a wall or a boundary — a water gate's two bank vertices `('gate_end', gate, 0 \| 1)` under a fresh `Gate` whose `banks` name them, and transient `anchor` contact names on every other crossed boundary (the entity of the edge's first own-level row, the smallest free ordinal, stripped at promotion) — over the determinism draft's persistent `('anchor', enceinte, k)` rows at the enceinte's next free ordinals and its own entity list (the lower-id district; the hinterland pseudo-district on the perimeter), because §2.2 rule 7 is the kernel's and one naming must serve generation, the carve and the water operator alike: anchors on the enceinte would persist rows no record references and collide with an open trace's end anchors (J-K29), and two entity rules would give a canal and a river move different names at the same boundary (§2.2 rule 7, §7.3 (b) 3, 4, 7 and item 7 (v); round-4 C-1). |
| J-I16 | Chose the pipeline's levels for the frame lines — the arena's outer ring an L0 `margin` chain written first by S1, the frame rectangle an L1 `border` chain written in S3's L1 batch (J-P46) — and aligned the kernel's clear-region rules to them (only the `border` is prepared at its bank points and kept closed across new water; new water meets the outer ring at its own level), over the kernel draft's text, which prepared both as L1 lines, because the kernel's own contract required an outer ring that water reaches at generation to be L0, and J-K33's first-stage rule needs no list of first writers, so no kernel mechanism changes (§2.2 rules 1 and 7, §3.2 (9), §3.3 rules 2–3, §4.1; round-4 C-2). |
| J-I17 | Chose to carry NP3-4's crossing-site state into S1's water operator — an old unused `site` on the changed reach matched to a successor site as a deck is, every new site no route uses inserted with the new shores as a `site` (two `deck_end` shore vertices, no span), a site left over land removed — over building a deck at every site of the changed reach or dropping the unused sites, because the first would draw bridges no road uses on a moved river while generation draws none, and the second would leave a moved river without the sites later growth, epochs and drawn bridges use, so an edited river would no longer match a regenerated one (§7.3 (b) 2, 4, 9, §2.7; round-4 C-4). |
| J-I18 | Chose to split the writers of a deck's `deck_end` rows by the water they are placed on — L0 rows for S1's crossing sites, S3's carved channels, S4's, S5b's (F-ROUTE's extra-bridge rung at stages k ≥ 2 and in every epoch) or an edit's added deck **on standing water** and an edit's new site; L1 rows for every deck a preparation batch places before its water exists (a carve's, an outer moat's or a water edit's, a deck F-ROUTE's extra-bridge rung sites inside one of these included) — over the kernel draft's unqualified "S4's or an edit's added deck" among the L0 writers, because the pipeline's round-5 rule makes that rung only site its deck inside S1's water operator or a carve, where its bank vertices are placed by the operator's L1 batch, so the unqualified list would have given a deck left over land by a later water edit the wrong level until F-REDERIVE (§2.2 rules 3 and 7, §7.3 (b) 4, §5.2 F-ROUTE; VK4-1 with VD4-10; round-5 C-1). *(Amended by the consistency pass, 2026-09-26: S5b's extra-bridge batch among the L0 `deck_end` writers, the canon ruling CF-PIPE-10 for NP5-2.)* |
| J-I19 | Chose to have the schema transform that adds `recordsDigest` drop the `model` of a document written by M1's generated-town format under the running output version (one of another version opens as §2.9 step 2's frozen view), so the load regenerates it from the recipe and its empty log (step 5) and never reports it verified, over computing a records root for it at the transform or opening it read-only, because nothing recorded a records root for such a file — a root the transform computed would check the records against themselves — while regenerating a generated town from its recipe loses nothing a *preview* file promises (§2.9 step 5, §16 M1 and M2a, §13.3; VS4-3 with VD4-6; round-5 C-2). *(Amended by the consistency pass, 2026-09-26: the regeneration applies to a document of the running output version only, VS5-1.)* |

## Part B — Provenance and the history of the fix rounds (formerly §0 of the architecture document, verbatim)

The architecture document keeps §0.1 (what it is built from, in brief), §0.2 (where the seven late owner rules land) and §0.3 (evidence discipline). The rest of the former §0 follows. Former §0.4 opened with the sentence: "The fix-all pass of 2026-09-25 checked every clause of every rule at its landing and added what was missing; where a rule has several clauses its landing carries a clause map."

#### former §0.1 What this document is built from

The panel (`docs/design/judge-{parity,improvement,engineering}.md`) scored the three proposals 84/83/77 (kernel),
76/81/76 (pipeline) and 71/86/72 (product). `proposal-kernel` is the base; the grafts from the other two (G-P1–G-P17,
G-R1–G-R15) and the repairs the winner owed (K-1–K-6 and the parity/improvement majors) are listed with their landing
sections in `docs/design/judging.md` §3–§4. This file is one design, not a concatenation: every mechanism appears
once, under the section that owns it; where two proposals gave the same mechanism the more precise wording was taken.

#### former §0.2 Reading record (the READING BUDGET rule applied)

Read in full, every line: the three proposals and the three judge reports. Read by outline plus the sections named:
`docs/IMPROVEMENTS.md` §4 (R1–R16), §5.1–5.5, §7.1–7.4, O10, O16, O19 in full — the lettered acceptance criteria of the
other opportunities are taken from `proposal-kernel.md` §15.2 and `proposal-product.md` §16.2, which the improvement
judge checked letter by letter at source; `docs/CONFIDENCE.md` §1, §5, §6 in full — its §4.1–4.4 row tables were not
re-read, every row id and name in §15 comes from `judge-parity.md` §2 and the proposals' matrices, whose row lists
agree. Not read: `docs/confidence/*.md`, `docs/improvements/*.md`, the findings files, the captures, any reference
source or captured bundle (by ruling). Every findings citation below is relayed through a file that read it in full
and is cited that way.

#### former §0.3 The relay call

The harness relayed the owner's chat message as "what's going on?". The seat answered the status question in its
structured summary and ran the lane (see `docs/design/judging.md` §0 for the reasons and the veto).

#### former §0.6 Completion record (two seats)

Written by the ARCHITECTURE synthesis seat (workflow 03 run `wf_e306f20c-a9f`) through §15 and checkpointed at 13:26 EDT
on the coordinator's order; the same seat then wrote §16, §17, PART II, PART III, the delegated decisions, the judgment
calls, the deferrals and Appendix A before its usage limit ended it at about 13:28, without a LANDED line. Completed by
the ARCHITECTURE-finish seat at 15:08 EDT, which read this file, `docs/design/judging.md` and the SPEC and GROUND text
of `workflows/03-assess-design-validate.js` in full and then: **verified** §1–§15 against SPEC items 1–15 and the
owner's PRODUCT SCOPE / PLOT MODEL / PLOT GRANULARITY / GREENERY / EVOLUTION / CITY ADD-ON LAYERS / ASSIGNMENT HOOK
paragraphs (every item present with mechanisms, filled tables and code-block interfaces); **verified** §16, §17,
PART II, PART III, the delegated decisions, the judgment calls, the deferrals and Appendix A as complete at the depth
of §1–§15 — not stubs — and as consistent with judging.md's graft list and flaw answers; **repaired** the stale
sky-context pointer in §0.4 (II.4 → II.1), the undefined `SeamReport` and `Pin` types in II.1, II.5's "four
registrations from M1 (D-15)" (now `BentCutFabric` from M1 and the templates at M5, G-P2) and the improvement matrix's
thumbnail pointer (now §7.8, where the proxy-thumbnail mechanism is stated); **added** delegated decisions D-23
(deterministic maths), D-24 (per-stage goldens with the declared shift) and D-25 (the single incremental path), the
stage-2 acceptance line in II.5, CityJSON to the deferrals, the §16 note on why M-1 and M0 precede the viewable town,
the plot/lot and layer wording notes in §2.1 and §2.5, and Appendix A.4; **replaced** the checkpoint block with this
record; and corrected eight stage or section pointers in `docs/design/judging.md` that named ARCH stages by the kernel
proposal's numbering (each listed in `docs/ARCHITECTURE-VALIDATION.md` §0). The owner's seven adopted defaults are
D-1–D-7, each stated as FINAL.

#### former §0.7 Fix-all round 1 (2026-09-25): five area drafts, one integration


Under the owner's rule "I would prefer if there is no defer and everything is fixed as soon as possible", every item of
the fix-all master list (`docs/validation/fix-all/index.md`: 299 items — the seven red-team lenses, the four coverage
audits' gaps, the seven owner amendments, the four manager notes and the seventeen deferrals) was disposed of by the
area that owns its sections — kernel, determinism, pipeline, rendering, scope (`docs/validation/fix-all/r1-*.md`) — and
the integration seat merged the drafts into this document, applied every change one area asked of another, and settled
the places where two drafts disagreed (judgment calls J-I1–J-I8; the record is
`docs/validation/fix-all/r1-integration-log.md`). Every item ends FIXED, INVALID with checkable evidence, or STAGED BY
THE OWNER with concrete hooks; the per-item table is `docs/ARCHITECTURE-VALIDATION.md`, round 1. All six seats were opus
stand-ins for Fable seats, so every revised section carries the pending-review banner. The owner's evening rules 8–9
(`docs/AMENDMENTS-2026-09-25b.md`: decline and regrowth hooks; size by population within a tier) are the next amendment
pass's input; the drafts already carry size by population (§1.1) and the decline states and conversions (§2.8, §4.11),
which that pass verifies against the rules' full text.

#### former §0.8 Fix-all round 2 (2026-09-25): the items still open after round 1


Round 1's five verification seats (`docs/validation/fix-all/r1-verify-*.md`) re-checked every round-1 item against the
integrated text and listed what was still open: the round-1 items they judged UNRESOLVED and the new defects the
revision had introduced — 99 items (kernel 24, determinism 16, pipeline 18, rendering 27, scope 14). The same five areas
drafted fixes (`docs/validation/fix-all/r2-*.md`), and the round-2 integration seat merged them, applied every request
one area made of another's sections, and settled seven disagreements (C-1–C-7 of `docs/validation/fix-all/r2-integration-log.md`;
new judgment calls J-I9–J-I11, J-K14 amended). The largest design moves of the round: the first wall, its gates, the
castle weld and the moat come from one S3 construction over solved gate routes (§4.2); the wall's band stands in L1
wall strips built after the lanes and corridors (§4.8, J-P29), with its parts built eagerly before the derivation pool
because the trace is shared by two districts, as is the settlement perimeter, which gets a 2 m margin band on each side
(J-I9); a coarse edit inside finished fabric clears only its clear region
(§3.3, J-I10); entity-held vertices carry roles and chain attributes are knot profiles (§2.2); undo and redo are logged
events (§7.4); first-map budgets are laws of the building count with the slower first map of the largest metropolises
declared for the owner's veto (§12.5, D-18). Every item ends FIXED — none INVALID, none staged, none deferred; the
per-item table is `docs/ARCHITECTURE-VALIDATION.md` §R2. All six seats were opus stand-ins for Fable seats, so every
section this round changed carries a banner naming `fixall/integrate-r2`.

#### former §0.9 Fix-all round 3 (2026-09-25): the items still open after round 2


Round 2's five verification seats (`docs/validation/fix-all/r2-verify-*.md`) accepted every round-2 item and listed 55
new defects that the round-2 revision had introduced or exposed (6 major, 49 minor); the pipeline area found one more
while fixing them (R3-P1). The five areas drafted fixes (`docs/validation/fix-all/r3-*.md`: kernel 9, determinism 17,
pipeline 11, rendering 8, scope 11 items), and the round-3 integration seat merged them, applied every request one area
made of another's sections, and settled three disagreements (C-1–C-3 of
`docs/validation/fix-all/r3-integration-log.md`; new judgment calls J-I12–J-I14; J-K24, J-I10 and J-I11 amended). The
largest design moves of the round: S1's water operator works in the carve's order — the new water, its crossings and
its re-routed roads computed first, the kept roads laid across their bridge sites and the lesser ways cut back, and only
then the water inserted through the points prepared for it (§7.3 (b), §3.3); a bridge's deck is its road's own edge
between two bank vertices, at generation and after an edit, so no deck splits a water body (J-I12); a canal's or a moved
river's footprint is the channel's strip plus every block its road rule touches, and everything outside it stays
byte-identical (§4.11, J-P34); every re-derivation re-lays its own side of the wall and margin bands exactly (§7.3
item 2, J-DET-29); the pool's frozen copy carries the eager step's index partitions and typed lookup tables (§3.3,
J-K22, J-K25); generated names follow an entity's address (§6.3, J-DET-37); a saved town is editable while its load
check runs (§2.9, J-DET-38); O3 (d)'s model-time bars are read over every size of a rung, with the miss above them
declared for the owner's veto (§12.3, D-18). Every item ends FIXED — none INVALID, none staged, none deferred; the
per-item table is `docs/ARCHITECTURE-VALIDATION.md` §R3. All six seats were opus stand-ins for Fable seats, so every
section this round changed carries a banner naming `fixall/integrate-r3`.

#### former §0.10 Fix-all round 4 (2026-09-26): the items still open after round 3


Round 3's five verification seats (`docs/validation/fix-all/r3-verify-*.md`) accepted every round-3 item but one — the
amendment-pass half of VS2-8 — and listed 39 new defects the round-3 revision had introduced or exposed (5 major, 34
minor); the kernel and scope areas found three more while fixing them (K4-1, S4-1, S4-2). The five areas drafted fixes
(`docs/validation/fix-all/r4-*.md`: kernel 8 items and the kernel part of VK3-8, determinism 8, pipeline 9, rendering 7,
scope 11), and the round-4 integration seat merged them, applied every request one area made of another's sections, and
settled four disagreements (C-1–C-4 of `docs/validation/fix-all/r4-integration-log.md`; new judgment calls J-I15–J-I17).
The largest design moves of the round: a building's stored wings are carried with its outline by one rule, so a dragged
street moves roofs and the 3-D export with the ground (§2.6, J-P42); a canal or a moved river that crosses a town wall
re-derives exactly the blocks it names, the wall's new strips included (§4.11, J-P34); S1's water operator clears its
whole footprint before the water goes in (§7.3 (b), J-DET-23); a saved town recomputes its own fingerprint before the
first edit (§2.9, J-DET-38, J-DET-40); every generated name remembers its naming inputs, so choosing a name list or
editing a naming rule renames exactly the names it made, after confirmation (§6.3, J-DET-37, J-DET-41); kernel levels
follow the rows, so every removal restores what its insertion changed (§2.2 rule 3, J-K28), water gates name their bank
vertices as bridges do (J-K29, J-I15) and part of a chain is addressed by a `StretchRef` (§3.4, J-K31); the arena's outer
ring is an L0 chain and the map border an L1 chain (§4.1, J-P46, J-I16); a river crossing becomes a bridge only where a
road uses it (§4.2 S1 (5), J-P44, J-I17); a walled port's harbour road leaves through a gate on the harbour side (§4.2 S3
(4), J-P45); the derivation pool is kept at each size where it measures faster (§12.3, J-R44); rasters are resumable and
exports wait for the view (§8.9, J-R40, J-R46, J-R47); pinned labels never overlap (§9.2, J-R45); every gating timing is
taken alone on the runner (§12.1, J-R49); the tree stamps ship with the product (§8.10, J-R42, J-R48); and the document
checks bind every seat that writes this document (§17.1 (2), J-S32). Every item ends FIXED — none INVALID, none staged,
none deferred; the per-item table is `docs/ARCHITECTURE-VALIDATION.md` §R4. All six seats were opus stand-ins for Fable
seats, so every section this round changed carries a banner naming `fixall/integrate-r4`.

#### former §0.11 Fix-all round 5 (2026-09-26): the items still open after round 4


Round 4's five verification seats (`docs/validation/fix-all/r4-verify-*.md`) accepted every round-4 item (43 of 43) and
listed 35 new defects the round-4 revision had introduced or exposed (1 major, 34 minor); the determinism area found one
more while fixing them (D5-1). The five areas drafted fixes (`docs/validation/fix-all/r5-*.md`: kernel 6 items,
determinism 11, pipeline 8, rendering 6, scope 5), and the round-5 integration seat merged them, applied every request
one area made of another's sections, and settled two disagreements the drafts could not see in one another (C-1 and C-2
of `docs/validation/fix-all/r5-integration-log.md`; new judgment calls J-I18 and J-I19). The largest design moves of the
round: a saved town's fingerprint is checked only by the program version that made it — an old town is shown labelled
"made with an older version; not verified by this one", and an upgrade checks a kept town under the old version and
records its new fingerprint under the new one (§2.9, §7.5, J-DET-44); "trust the saved town" and saving wait for the
fingerprint check (J-DET-45); a name freed by an undo or an unlock is re-drawn from a changed list only after
confirmation, and every confirmed rename is stored with its edit (§7.3 item 4, J-DET-46, J-DET-47); a street list chosen
for one culture renames only its streets (§7.6, J-DET-48); the records that steer faithful regeneration and naming have
their own fingerprint (§6.2, J-DET-49); a town kept from its saved copy is shared as its file, never as a link (§6.4,
J-DET-50); the search index never answers with an item's old level (§3.3, J-K34); water gates made with the town and by
an edit both stay put under the street-level warp (§3.6, J-K35); a stored manor-style composition moves with its house
(§2.6, J-P48), and the roof outlines follow every change of a house outline, in generation as in editing (J-P47); the
tree stamps meet without seams (§8.10, J-R50); a large print places its labels in small steps (§9.2, J-R51); tree
positions are the same on every machine (J-R52); a moving sun lights roofs and crowns in whole shared steps (§8.4,
J-R54); M1 builds the saved-file format it measures (§16, J-S40); the D-5 panel pairs PLAT with FTG's recorded
populations (§13.6, J-S41); and the effort estimate rises from 150–200 to **153–204 expert person-weeks**, because the
components rounds 4 and 5 added are now itemised and priced (§16, D-20, J-S43) — an owner-visible number, stated here.
Every item ends FIXED — none INVALID, none staged, none deferred; the one owner-staged subject touched (stage 3, NP4-2)
has its hook made concrete; the per-item table is `docs/ARCHITECTURE-VALIDATION.md` §R5. All six seats were opus
stand-ins for Fable seats, so every section this round changed carries a banner naming `fixall/integrate-r5`.

#### former title block (revision banner and lane line)

**Revision (2026-09-25 and 2026-09-26, fix-all rounds 1–5).** Revised under the owner's no-defer rule by five area
drafts and one integration seat per round (§0.7, §0.8, §0.9, §0.10, §0.11); every revised section carries a pending-review
banner naming its latest round; per-item dispositions are in `docs/ARCHITECTURE-VALIDATION.md` (§R1, §R2, §R3, §R4, §R5).

Lane `ARCHITECTURE` (chief architect, Fable 5.1), workflow 03 run `wf_e306f20c-a9f`, 2026-09-25. Status: **COMPLETE**
(written incrementally by two seats — the synthesis seat and the ARCHITECTURE-finish seat; §0.6 is the completion
record). Built on `docs/design/proposal-kernel.md`
(the panel's winner on two lenses and the sum) with the grafts and repairs recorded in `docs/design/judging.md` §3–§4.
Codename **PLAT** (a plat is a cadastral plan of plots — the single spatial truth of this design); packages `@plat/*`.

## Part C — The reading records (formerly Appendix A, verbatim)

The architecture document keeps A.3 (CONFIRMED versus PLAUSIBLE) and a one-paragraph summary of the reading record.

**A.1 Read in full (every line).** `docs/design/proposal-kernel.md` (1 365 lines), `proposal-pipeline.md` (1 703),
`proposal-product.md` (993), `docs/design/judge-parity.md` (441), `judge-improvement.md` (285), `judge-engineering.md`
(362).

**A.2 Read by outline plus the named sections in full.** `docs/IMPROVEMENTS.md`: §4 (R1–R16, lines 1462–1494), §5
(1495–1594), §7 (1786–1848), O10 (743–823), O16 (682–742), O19 (1279–1331); the other opportunities' acceptance letters
via `proposal-kernel.md` §15.2 and `proposal-product.md` §16.2 (verified letter by letter by the improvement judge).
`docs/CONFIDENCE.md`: §1 (143–177), §5 (684–724), §6 (725–749); its §4.1–4.4 tables via `judge-parity.md` §2 and the
proposals' matrices. Not read: `docs/confidence/*.md`, `docs/improvements/*.md`, the findings and captures, any
reference source or captured bundle (by ruling). Every findings fact in this document is cited through a file that
read it in full.

**A.4 The finishing seat's reading.** The ARCHITECTURE-finish seat (§0.6) read this document, `docs/design/judging.md`
and the SPEC and GROUND text of `workflows/03-assess-design-validate.js` in full, and nothing else; its additions are
consistency and completion work reasoned from those three texts (PLAUSIBLE), and it introduced no new reference number.

**A.5 The fix-all integration seat's reading (2026-09-25).** Read in full: the five area drafts
(`docs/validation/fix-all/r1-{kernel,determinism,pipeline,rendering,scope}.md` — every disposition table, every
cross-area request section and coordination record, and the replacement blocks as applied), this document before and
after integration (every section a cross-area request or a conflict touched), `docs/ARCHITECTURE-VALIDATION.md`,
`docs/AMENDMENTS-2026-09-25.md`, `docs/AMENDMENTS-2026-09-25b.md`, `docs/OWNER-INSTRUCTIONS-2026-09-25.md` and
`docs/validation/fix-all/index.md` §1–§2. Nothing outside the project; no reference source. The conflict resolutions are
this seat's reasoning (PLAUSIBLE); the arithmetic it added (the range bound at the population cap, the §12.4 critical-path
sum) was executed.

## Part D — The delegated decisions with their plain-words rationale (the table as it stood before the consistency pass, verbatim)

The architecture document keeps each decision as one short paragraph — the final choice, the alternative rejected and the cost of reversing it — and points to the section that owns each number. Where a number below differs from the architecture document, the document wins.

For each decision: the choice, the rationale in plain words, the alternative rejected, and what it would cost to
reverse later. D-1–D-7 are the owner's adopted defaults (amendment 7), each clause now tied to its mechanism. Decisions
marked *owner veto* touch a subject the owner keeps (a purchase, the licence, new capability): the program has taken
the most option-preserving default and flags it.

| id | decision (final) | rationale in plain words | alternative rejected | cost to reverse |
|---|---|---|---|---|
| D-1 | **Default look = clean ink (MFCG family) with IM FELL Great Primer as the label face; second preset FTG-like `lit`, on Canvas2D like every preset; a hatched preset for the close-up; the house style (the owner's "later") = our own third preset `house`, drafted as three candidate style sheets at M3b and chosen by the owner on the §13.6 panel at M4, `ink` staying the default unless the owner picks otherwise; with no pick by M4's exit, candidate 1 ships as `house` (never the default) and the pick is offered again at every later panel (§13.6 (8))** | the ink map is the most legible and best-loved default and the cheapest to prove first; `lit` on the one drawing path really is "a style file, not an architecture" (IMP-3, VIS-7); the face is MFCG's label signature and an OFL asset outside the clean room (IMP-15) | lit default; a WebGL2 reference backend for `lit` | low (a style file) |
| D-2 | **Era and region centre of gravity = high-to-late medieval Western Europe (12th–15th c.)**, as presets the corpus phase re-signs through §13.9; walled shares and stage rows per rung MFCG-calibrated (≈ 0.9 of buildings inside the outermost wall, §4.2 S2), FTG's lower walled share reachable as a preset | the owner's adopted default; "the corpus refines later" is the owner's staging, and §13.9 is its interface | a hard-coded culture; a 0.35–0.5 walled share (MFCG's shanty case) | low (table rows) |
| D-3 | **Realism in the base; fantasy only as named toggles, each off by default**: floating islands and their conjured rivers (II.6), fantasy sewers (II.6), the game-system stat pack (D-32), the `night` preset's lights | the owner's default; realism is what the corpus can calibrate | fantasy defaults | low |
| D-4 | **Browser-first embeddable TypeScript library with an app on top; permissive dependencies only (§17.4's checker over the production closure); one generation worker, a derivation pool and a tile worker behind a handle-based API (§11.2)** | one language; the reference evidence is JavaScript-shaped; embedding needs no server; permissive licences keep our own licence open (D-22) | a Rust / WASM core from day one; server-side generation | medium after M1 for the core language — a measured hot loop may get a byte-identical WebAssembly accelerator (§3.7), there is no WASM kernel; low for the worker model |
| D-5 | **"Mastered" = the owner's eye on side-by-sides against MFCG and FTG at town / city / metropolis, run through the written blind protocol of §13.6 (seeds fixed beforehand, matched sizes, three questions, a pass rule, a filed record), plus the parity numbers of §13.5; a panel the owner has not rated lets the build continue with the milestone's D-5 status *provisional — not rated*, and "at parity", "mastered" and the stage-2 gate are claimed only by a rated pass or the owner's recorded acceptance (§13.6 (7))** | the owner's default; numbers alone miss charm, eyes alone miss statistics; the protocol makes the eye repeatable and unsteerable (IMP-4, IMP-11) | numbers only; an eye with no protocol | none |
| D-6 | **Original English-fantasy naming; setting packs in §10.4's format, the base shipping one pack; further packs are data** | the owner's default and the clean-room rule; "setting packs later" now means later contents, not a later format (DEF-10) | reuse of reference corpora | low |
| D-7 | **Improvement weighting: realism, editability, plot texture first; speed and export next; novelty last — and it orders the build: the editing core (M2a) before the second preset and the rest of parity (M2b)** | the owner's default; it decides ties in the build plan, and now visibly does (IMP-3) | speed first; editing after the lit look | none |
| D-8 | **3-D export = glTF 2.0 (OBJ secondary) and CityJSON 2.0** | the widest tool support for VTT and game users; CityJSON's integer vertices with a transform carry our centimetre lattice losslessly, so its exporter is thin (§11.1) | CityJSON left for later | low (an exporter) |
| D-9 | **"No restart path" is a design property; the acceptance numbers are requested-feature delivery by ladder tier (a tier-6 omission of a requested feature is a failure, target 0; degraded ≤ 5 %) and p95 time per delivered town on MFCG's worst configurations (≤ 1.0 s against MFCG's 3.7–4.0 s)** | "0 restarts" was true by construction and measured nothing; these two numbers compare with what a user gets from MFCG (IMP-5); a bounded restart tier would still hide feasibility bugs, and the omission count exposes them | "0 whole-map restarts" as the number; a p99-bounded restart tier | low (criteria) |
| D-10 | **Simulation depth in the base = roster, context vector, allocation and placement, households and lazy people, with the relation store's schema in the base from M1; schedules, calendar, factions' meetings, events, economy and personality in the optional `@plat/sim` module, its own milestone M4b** (IMPROVEMENTS J-S kept; the product proposal's widening rejected) | the map never waits for a simulation; with the schema in the base the module materialises data without changing the model (FTG-9); its own milestone keeps it from crowding hardening (IMP-3) | schedules and the calendar in the first release; the module inside M4 | low |
| D-11 | **Poisson-disc k = 50, all candidates evaluated, builds the per-class ranked tiles once, when the product is built (a hash-checked shipped asset, scaled per entity by its spacing); per-instance placement is the stamp (§8.10)** | matching the recorded scatter costs nothing per tree once the tiles exist; a measurement (NN p1, pair-correlation) may relax it | k = 30; per-entity Bridson sampling | trivial (a table value) |
| D-12 | **Integer centimetres centred on (0, 0), +y north; range invariant 2²³ cm** | exact geometry on every machine; FTG's proven convention; six-fold headroom over the largest frame — METROPOLIS at the population cap and the extreme aspect (§3.2 (1)) | millimetres; doubles | high after M1 |
| D-13 | **Five refinement levels as views of one arena per layer (level-tagged edges, per-level face records), a separate arena per layer and per sky island, unions for multi-face entities** | locality of edits and regeneration is a tree walk; nesting exact by construction; each boundary stored once; sky and underground never cut ground faces | one flat subdivision; five separate per-level DCELs (nesting cannot hold on the lattice, GEO-1) | high after M1 |
| D-14 | **Booleans, buffers and bands on the kernel's own arrangement — one engine on every host; Clipper2 and `polygon-clipping` as CI oracles only; the straight skeleton built in-house under §3.8's contract and validator; the M0 bars and pre-decided fallbacks in §3.7–§3.8 (Clipper2-WASM as the single engine; the downgrades as the default paths)** | one engine means one digest on every host (GEO-9); no permissive, mature skeleton library exists | CGAL (GPL); a JS skeleton port; a runtime pure-JS boolean fallback (a second engine, different digests) | low (adapters) |
| D-15 | **xoshiro128\*\* streams keyed from structured components (seed key, entity lineage, stage, concern, reroll, attempt, epoch, salt), the lineage separate from the address id, concern ids append-only; Enter = a new document with seed (seed + 1) mod 2³² (VS2-6)** | locality, feature growth without reshuffling across concerns, epochs; no BigInt | one global stream; a counter-based RNG | high after M1 |
| D-16 | **The fused layout = routed arterials between named destinations; reservations and gate sites at S3 and each enceinte traced before its stage's growth; inside the walls district-scale secondaries plus NG's bent-cut infill with the measured construction, outside them FTG-shaped growth with explicit legality and stage regimes; districts grown over the coarse skeleton, feature-named and grouped into quarters; frontage-first plots with the granularity law** | the owner's "best of both" under the tiebreaker: constraints and metres for the streets, MFCG's street signature inside the walls, FTG's accretion outside; M0 measures the risk and M1 re-measures it on real terrain | the four rejected shapes of §1.4 and §4.4; FTG growth down to block scale inside the walls | high (the layout core) — hence M0 and M1's gate |
| D-17 | **Enceinte = gate sites picked and castle and plaza reserved at S3; stage 1's enceinte traced at S3 from the travel-cost boundary over its solved gate routes, each later enceinte at S5a from its stage's boundary, both pulled to defensible ground before that stage's streets grow; gates exactly at arterial crossings with exact N by the measured gate law; gate plazas; castle by score with the inside / on-enceinte / outside option; an open waterfront by default** | defence as an explicit constraint; MFCG's wall-first order and gate identity; FTG's staging | a wall on cell edges; tower-per-vertex; walls traced after growth | low |
| D-18 | **Budgets per §12.3 as per-rung laws of the building count — model p95 TOWN ≤ 20 ms + 60 µs × B, CITY ≤ 40 ms + 50 µs × B, METROPOLIS ≤ 100 ms + 52 µs × B (100 / 300 / 800 ms at the targets; O3 (d)'s bars — 100 ms, 300 ms, 1 s — hold for p95 up to ≈ 1 333 / 5 200 / 17 300 buildings (≈ 4 500 / 17 700 / 58 800 people) and, with the max clause that no generation exceeds 1.25 × its own law, up to ≈ 1 000 / 4 000 / 13 460 buildings; above them a declared miss of O3 (d): p95 ≈ 196 ms and ≈ 481 ms at the TOWN and CITY band tops and ≈ 1.92 s at the METROPOLIS cap, §12.3) — with the derivation pool as the primary configuration at every size where it measures within its law + 10 %, faster than a single worker and with identical digests, and the single worker as the pre-decided fallback elsewhere (§12.3's rule, measured at M1 at TOWN and CITY and at M2b at METROPOLIS); the max clause judged on outliers confirmed by solo re-timing (§12.3); time to first map per §12.5 — TOWN ≤ 40 ms + 70 µs × B, CITY ≤ 60 ms + 60 µs × B, METROPOLIS ≤ 120 ms + 62 µs × B — under one second for every TOWN and CITY and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people), ≈ 2.3 s at the 120 000 cap, a declared miss of O12 (g); a per-building cost ≈ 2 × MFCG's at TOWN and CITY and ≈ 5 × at METROPOLIS declared as a trade (§12.9)** — *owner veto on the misses above the knees (the first map's, §12.5, and the model's, §12.3)* | the one-click floor and the references' bars; the trade buys terrain, plots, site plans, roster placement, greenery and labels MFCG does not build, which D-7 ranks above speed; size follows population inside a rung, so the budgets are laws, and the one-click path stays complete at every size; O3 (d)'s model bars are read over every size of a rung, like O12 (g)'s first-map bar | workers assumed without a merge protocol; matching MFCG's per-building cost by dropping plot detail; a preview or a coarser one-click path above the knee | low (numbers); ≈ 1 pw for a district-by-district city band above the knee; medium (architecture) if M0 or M1 miss |
| D-19 | **Codename PLAT and `@plat/*`; terrain resolution 5 / 8 / 10 m; frame areas 4 / 25 / 64 km² with aspect 0.5–2 (square by default) + 30 % margin, the side scaling with √(population ÷ target); min edge 25 cm with attraction at 26 cm; min plot width 2.5 m; min plot angle 12°; the district band derived from the count law; the gate law `round(1 + 0.47 √A_ha)`; stage counts and walled shares per rung (§1.1, §4.2 S2); shadows off by default with a fixed sun; heights always populated; tower spacing and every band as calibratable table rows** | defaults and calibration anchors that cost nothing to change | — | trivial (data) |
| D-20 | **Effort ≈ 153–204 expert person-weeks: the base 139–186 (the content module included) plus stage 2 14–18, re-derived line by line in §16 — the fix-all pass's own mechanisms priced in their own line, rounds 4–5's six new components at 3–4 pw (VS4-6); the cuts that would reduce it to ≈ 136–176 recorded for the owner's veto, not applied** | the earlier 100–130 left out content authoring, the app, the test rig and FTG's non-map scope (IMP-2); the owner asked that nothing be deferred; the components the fix-all rounds added are itemised and priced, not assumed absorbed | 100–130 pw; cutting scope to hold it | none (an estimate) |
| D-21 | **The document persists a base (the recipe, or a rebased state) and the ordered log, with a digest-verified snapshot cache; one replay fold; a rebase when a saved state is kept; output versions N−1 and N−2 retained in the browser and every version in the CLI; an upgrade is an undoable event** | loads are instant, links never silently change, and a mismatch is always reported and resolved once | events only; "the last N minor versions stay replayable" with no mechanism | low |
| D-22 | **Our own licence: proprietary, all rights reserved to the owner, until the owner chooses (§17.3); no dependency may constrain the choice** — *owner veto* | an open licence cannot be withdrawn once granted, while a proprietary default can be opened by one act — the most option-preserving default (DEF-14) | leaving it undecided; an open licence by default | low (a licence file) until code is published |
| D-23 | **Deterministic transcendentals through `dmath` — our TypeScript port of the fdlibm 5.3 routines with Sun's notice — with an allowlist lint (exact `Math` members only; `**` only with literal exponents 0–4, rewritten to multiplications; `ratio()` for computed divisors) that also scans vendored dependencies** | the same digest on every engine; a vetted algorithm, and no 94-package `@stdlib` closure (IMP-14); the lint makes the rule enforceable (J-11) | in-house polynomial approximations; trusting the engine's `Math.*`; the `@stdlib` packages | low (one adapter and one lint rule) |
| D-24 | **Goldens are stage-isolated (new stage code on frozen upstream outputs) and built at M1; end-to-end goldens are re-signed only with a cascade record; every milestone files its declared shifts; a same-seed output change is never let ride silently** | the owner's non-negotiable as a mechanism from the first viewable town, not from hardening (LC-19) | one whole-model hash per seed; goldens at M4 | trivial (test tooling) |
| D-25 | **The evolution hook in the base is exactly one built and tested path — add a growth stage to an existing town, with wall → ring road as a typed conversion — plus the epoch key component and the transformation-event vocabulary, decline included; the evolution engine is staged by the owner with its interfaces concrete (§4.11)** | it is the path "regenerate this area" uses, so it costs little and proves the persisted plat extends; the owner's roadmap puts the engine later | no incremental path; the full engine now | low |
| D-26 | **Identity: opaque lineage-hash addresses with survival and succession (§6.3)** | an address must not depend on creation order, lazily derived districts or worker scheduling (J-DET-1) | hierarchical creation-order ids; a per-kind counter | high after M1 |
| D-27 | **Work limits, never wall clock, bound every output-affecting budget (§5.1)** | a watchdog would make one seed give different towns on different machines (J-DET-3) | wall-clock watchdogs | low |
| D-28 | **The model digest is a Merkle root over the eager model's content only, maintained at batch commit (§6.2)** | the canonical serialisation costs ≈ 1.2 s per CITY model and provenance must not move goldens (J-DET-4, J-DET-5) | hashing the canonical serialisation per batch | high after M1 |
| D-29 | **The clean-room chain (§17.1): implementers read only this document and a checked implementer digest; the product in its own repository `plat/` with a path rule; reference numbers only through committed numbers-only files (`baselines.json`, and the D-5 panel's `ftg-captures.json` and `ng-counts.json`); a hashed content deny-list scan in CI and a palette audit per milestone; reference-derived constants labelled by origin; a seat ledger in `CLEAN-ROOM.md`** | the owner's clean-room ruling must hold by mechanism, not intention; the findings quote GPL code and reference data, so they cannot be implementer inputs (IMP-1) | findings and captures as implementer inputs; path-only CI rules | low (process) — in place before M0's code |
| D-30 | **Every threshold has a number now: reference-settable bands by §13.5's band rule from `baselines.json`; the thresholds no reference can set in §13.7, each with a provisional number, the first milestone that confirms it and a pre-decided fallback; no placeholder can gate or pass** | "set later by the corpus" left M2 unable to exit or invited silent promotion of placeholders (IMP-6, DEF-1) | placeholders set by the corpus phase (the earlier reading of J-T, which §13.7 now defines as a numbered calibration rule) | trivial (data) |
| D-31 | **Matched references: TOWN = MFCG size 40 and FTG BIG_TOWN (≈ 5 600); CITY = MFCG size 80 and FTG BIG_CITY (24 500); METROPOLIS = MFCG size 130. FTG's premium METROPOLIS is not purchased: the METROPOLIS side-by-side uses MFCG 130, with FTG's published metropolis pictures as an unscored reference card; a one-month premium FTG subscription for one measured capture is the owner's option** — *owner veto* | matched on building count (MN-2) and population (FTG-16); the free captures cover two of three rungs; only the owner can make a purchase | a CITY-only FTG comparison; a purchase by the program | low (one capture day if the owner buys) |
| D-32 | **Economy (resource chains, items and services with prices, stock per building, global price edits), personality (trait sentences, motivation, mannerism, hobbies), education gated by class and a stat block with profession modifiers are `@plat/sim` content (M4b), derived from their keys with our own authored tables; their schema stubs are in the base (§10.3); the stat block is a named game-system pack, off by default (D-3); the family-tree view is in the app (§14)** — *owner veto: new capability rather than repair* | the owner's definition names FTG-class "roster-first population and economy", FTG parity includes them, and the module keeps them off the one-click path (COV-FTG-B10, C03, C11) | leaving them unrecorded; putting them on the one-click path | low (module content; dropping it removes ≈ 2–4 pw from M4b) |
| D-33 | **The two ladders meet at 1 500 inhabitants: the village ladder THORP → HAMLET → VILLAGE ends there and the base's TOWN band starts there (1 500–10 000); size within a rung follows population; per-rung rows live in `ladder.json` (§1.1); a request below 1 500 routes to the village product (clamped and reported while none is registered), one above 120 000 is clamped and reported** | the owner's two ladders and "size follows population"; no gap or overlap exactly where MFCG's creator admits its small towns fail (COV-VG-VN-088, AM-4) | an undefined boundary; a 2 000 floor leaving a gap below the base | trivial (data) |
| D-34 | **Three CI tiers with wall-clock budgets (PR ≤ 15 min, nightly ≤ 4 h, milestone ≤ 12 h) on a stated runner; the oracle once per sequence; an over-budget job is split, never re-capped (§13.8)** | a 10–20 CPU-hour rig cannot gate a change; the owner's efficiency standard asks for structural shortening (SCL-18) | one full run per change | trivial |
| D-35 | **Build order: M-1 → M0 → M1 viewable town → M2a editing core → M2b parity (the second preset; METROPOLIS, which generates from M1, measured and tuned) → M3a full editing, migration and API → M3b exports, forms and should-have tiers → M4 hardening and the incremental path → M4b the content module → M5 stage 2; nothing leaves the program** | the owner's weighting orders the build; M3 was overloaded (≈ 31–40 pw itemised against 20–26); the module needs the relation store first (IMP-3) | the lit look before editing; moving exports, forms or the module out of the program | low (a plan) |

## Part E — Rationale and history moved out of the scope sections (verbatim)

### E.1 §1.1 — the rung modifiers (J-S13)

The stage rows are §4.2 S2's (MFCG's measured 0.87–0.92 of buildings inside the outermost wall); the budgets are §12's;
the matched references are §13.6's. *Chose* modest per-rung modifiers — wider and deeper plots and more private green in
a town, narrower frontages, larger joined rich plots and more public parks in a metropolis — *over* identical rows at
every rung *because* the owner asked for granularity and greenery to be defined per rung, and land pressure in the core
rises with town size (the historical pattern the corpus phase will calibrate); the values are PLAUSIBLE defaults with
provenance "architecture 2026-09-25". **Confirmation (M2b, B-CITY):** the modest band's median frontage orders TOWN >
CITY > METROPOLIS and park area per 1 000 inhabitants orders TOWN < CITY < METROPOLIS. **Pre-decided fallback:** if an
ordering fails, that modifier's distance from 1 is doubled once and re-measured; if it still fails, the modifier is set
to neutral (1.0 / 0) and the ordering is reported as not produced.

### E.2 §13.2 — why the faithfulness campaign draws 800 scopes (J-S30; the calibration itself stays in §13.2)

**Why 800 scopes (VS2-9).** A scope's four statistics move together — a denser block has smaller plots, narrower
  frontages and more attached houses — and correlated statistics add less evidence than independent ones: with them
  correlated at ρ = 0.8, a campaign of 400 scopes catches a +0.25 standard-deviation bias in only 92.2 % of nights and a
  regenerator 0.8 × too snug in 95.2 % (922 / 1 000 and 952 / 1 000; the round-2 verifier's independent re-implementation
  gave 92.0 % and 95.0 %), so with the re-run rule below a real fault would be declared on its first night only
  0.85–0.91 of the time. **Executed** at n = 800 (`docs/validation/bench/fixall_scope_r3_o9c_n800.py` → `.out`, own
  code, stdlib; each generation's four statistics share a scope component at ρ = 0, 0.8 and 1): a perfect regenerator
  fails 1.0 % of campaigns on continuous statistics (31 / 3 000 at ρ = 0.8, 15 / 1 500 at ρ = 0) and 1.4 % (14 / 1 000) on
  heavily tied, scope-varying discrete statistics; a +0.25 sd bias and a 0.8 × too-snug regenerator are caught in
  2 000 / 2 000 campaigns each at ρ = 0 and at ρ = 0.8 (95 % lower bound 99.8 %), a 0.6 × too-snug and a 1.5 × too-loose
  one in 500 / 500, and — at the degenerate ρ = 1, where the four statistics move as one — the bias in 99.3 % and the
  snugness in 99.7 %. Without the randomised tie-break a perfect regenerator fails every campaign on a tied statistic
  (`fixall_verify_scope_o9c_rank.out`). A failing statistic's histogram names the fault: a hump is too snug, a U too
  loose, a slope a bias. **A failed campaign is re-run once with the next campaign seed**: a perfect regenerator fails
  two in a row with probability ≈ 1–2 × 10⁻⁴, and a fault of the sizes above is declared on the night it first runs with
  probability ≥ 0.996 at ρ ≤ 0.8 (≥ 0.985 at ρ = 1). A second failure is a regeneration defect — entered in
  `known-defects.json`, and M3a does not exit until it is fixed (§16), because no threshold can be relaxed without
  passing a wrong regenerator.

### E.3 §16 — how the effort estimate grew round by round, the other areas' build work of rounds 4 and 5, and the honest total (J-S6, J-S43, D-20)

The round-2 additions — `ink`'s close-up and building band (M2b), `hatched`'s city and district bands (M5), the
ink-family variants (M3b), the records in `plat/goldens/` and the placement digests (M1), the faithfulness campaign
(M3a) — are style sheets over existing paint programs and test tooling already priced in the O12 renderer, the
verification rig and the stage-2 lines, so the ranges stand (PLAUSIBLE). Round 3's additions — METROPOLIS in M1's test
inputs (a `ladder.json` row on the one pipeline), the doubled faithfulness campaign (≈ 6 more CPU-minutes a night), the
determinism lint over S13b's renderer inputs and the scripted document checks of §17.1 (2) — change no line of the
table either (PLAUSIBLE); nor do round 4's — the D-5 panel's FTG and NG pairing rules (§13.6), the list check of §17.1 (2)
and (5), and the load-verification memory test at M2a instead of M1 — or round 5's in this area — `rebase`'s typed
refusal (§14), the table check's cell count (§17.1 (2) (iv)), the committed FTG capture file (§13.6 (2)) and the
generated-town document format built at M1 instead of M2a (VS4-3), which moves effort between rows, not lines
(PLAUSIBLE).

**The other areas' build work of rounds 4 and 5 (VS4-6).** Six mechanisms are **new components**, priced by the fix-all
line's widening (≈ 14–22 working days, 3–4 pw; PLAUSIBLE): the per-name naming records and the renames an edit confirms
(§2.8, §6.3, §7.1; M1 writes the records, M3a stores the renames; VD3-2, VD4-3 – VD4-5), ≈ 3–4 days; `carryWings`, the
carry of a stored composition and the wing check decided by pairing (§2.6; M1 in generation, M3a under warps; NP3-1,
NP4-2, NP4-3, NP4-6), ≈ 4–6; crossing sites as a `Bridge` in state `site` and their handling in S1's water operator
(§2.7, §7.3 (b); M1 and M3a; NP3-4, J-I17), ≈ 2–3; resumable raster jobs, S13b as a resumable placement job and the tile
worker's four-class queue (§8.9, §9.2; M1; NR3-2, NR3-6, NR4-2), ≈ 3–5; the records digest (§6.2; M2a; VD4-6), ≈ 1–2;
the shipped stamp-tile asset, with its shared seam band, and its build tool `plat/tools/stamptiles/` (§8.10; M1; NR3-7,
NR4-1), ≈ 1–2 days. The rest are **refinements of a mechanism a line already prices**, absorbed by that line
(PLAUSIBLE): the load's digest recomputation, its corrupt-cache path, the version-pinned root checks and the
keep-and-save gating (the O9 line's load verification; VD3-1, VD4-1, VD4-2); the pack held by a saved redo, the pack
copy at an upgrade and the link refusal for a kept town (the O9 line's retention and migration; VD4-7 – VD4-9);
demotion, `StretchRef`, tombstones per partition, the water-gate hold and the deck strip (the parity floors' kernel
share and the fix-all line's arrangement work; VK3-3, VK3-9, VK4-1, VK4-4, VK4-5); the forced harbour pick and the
detour guard (the parity floors' gates and harbour; NP3-7, NP4-4); the pin pass (the fix-all line's label placement
engine; NR3-3); and the integer-centimetre tree positions with their lint, the PNG row-filter rule and the quantised
light steps with their light pass (the O12 renderer and O11 export lines; NR4-3, NR4-4, NR4-5). The milestone rows carry
the widening where the components are built — M1 + 2 / + 3 (with the generated-town format moved in from M2a), M3a + 1 /
+ 1, M2a unchanged (the format out, the records digest in) — so they still sum to the total. **A later pass that adds
build work prices it here:** its scope seat names each new mechanism with the line that absorbs it, or widens a line by
an itemised amount and keeps the milestone rows equal to the total.

*Chose* to state the larger, honest total *over* keeping 100–130 by cutting scope *because* the owner asked that nothing
be deferred and that everything be fixed as soon as possible, and the earlier figure left out the content, the app and
the rig that the base contains. The cuts that would shrink it are recorded for the owner's veto, not applied: the
module M4b (8–14 pw); VTT, glTF / OBJ, CityJSON and the CBOR twin (≈ 3–5 pw); all but three forms (≈ 2–3 pw); the
should-have "full" tiers (4–6 pw) — together a base of ≈ 122–158 pw and a total of ≈ 136–176 pw.

### E.4 §17.1 (2) — the executed calibration of the document checks, and why they are scripted and bind every seat (J-S32, J-S35)

`amendments-repair.md`). From M-1 the hashed scan of (5) — whose list sets do (vi)'s work on salted digests — also runs
   over this document and replaces (i)–(iii) and (vi); (iv) and (v) stay. *Calibration (executed).* On §13–§17 as they
   stood after round 2 (lines 6657–7826 of the pre-round-3 text, md5 `ca2e2066…`, committed as
   `docs/validation/bench/fixall_scope_r4_calib_pre_r3_s13_s17.txt`), 1 196 of 26 236 token 3-grams are shared with the
   findings and they form **47 runs of five or more tokens (45 distinct; §13 24, §14 4, §15 11, §16 6, §17 2)** —
   measured numbers, ordinary phrases and one quoted creator sentence — a hand review of minutes; no run threshold from
   1 to 7 gives the 27 an earlier draft stated (VS3-5; `docs/validation/bench/fixall_verify_scope_r3_cleanroom_checks.out`
   part C, `fixall_scope_r4_cleanroom.out` part A). On the round-3 text the same rule gives 53 runs over §13–§17. (ii)
   finds none of the document's 36 colour values in its sources, the capture JSON included; (iv) found exactly the one
   broken row VS2-1 names, and its cell-count clause, run over the round-4 text, exactly one more — J-I15, whose bare
   pipe inside code hid its reasoning (VS4-1; `fixall_verify_scope_r4_checks.out` part C, `fixall_scope_r5_checks.out`). The round-4 extension, run over the whole round-3 text (2 052 JSON files, ≈ 30–45 s): the JSON
   corpus adds 50 distinct run texts to (iii) — ordinary phrasing the creators' posts and comments also hold, six of them
   lengthened forms of runs reviewed before — and (vi) flags 8 lines of generic vocabulary; each was reviewed into the
   allow file's round-4 block, so the extension adds no unreviewed hit to unchanged text. Of 429 lists in FTG's content
   database written as one line of five or ten names, (vi) catches all 429 in either order, while (iii) catches none of
   the alphabetised five-name lines and 210 of those in the database's order (`fixall_scope_r4_cleanroom.out` parts B–D).
   *Chose* scripted proxies with a reviewed allow file *over* a hand-run grep *because* round 2's hand-run proxy checked
   identifiers only and so passed any pasted palette or table while the rule read as satisfied (VS2-8); *chose* to bind
   every seat that writes this document *over* the integration seat alone *because* an amendment pass's lanes write it
   directly (VS2-8; J-S32); *chose* the list check (vi) beside the extended 3-gram check *because* a reordered list
   shares no 3-gram with its source (J-S35).

### E.5 §17.2 — the default label face (J-S15)

Fonts are third-party assets under the SIL Open Font License and sit outside the clean-room rule: they are neither the
references' code nor their creative data. *Chose* IM FELL Great Primer (OFL) as the default label face *over* a
different serif chosen "for clean-room distance" *because* it is the face of MFCG's labels and part of the ink look the
owner adopted (D-1), and clean-room distance applies to the references' code and content, not to a public OFL font;
EB Garamond and Cinzel ship as alternatives. Fonts ship unmodified; CI reads each face's name table and refuses to
subset a face that declares a Reserved Font Name; the OFL text ships in the notices file. Label metrics are read from
the bundled files (§9.2). The bundled faces are TrueType-flavoured (`glyf`), whose outlines SVG's default text writes
(§11.1); when the default face lacks `smcp`, the family's OFL small-caps cut is bundled unmodified beside it (§9.2); an
SVG export may embed a face unmodified as a data URI (§11.1). CI checks all three (§9.2).

### E.6 §17.3 — the proprietary default (J-S10, D-22)

Until the owner chooses, the `plat/` repository is **proprietary: "Copyright © the owner. All rights reserved."** in its
`LICENSE` file, with no open-source licence. *Chose* this default *over* an open licence *because* it keeps every option:
the owner can later publish under any licence by one act, while an open licence once granted cannot be withdrawn from
those who received the code. Flagged for the owner's veto. What keeps every choice open: permissive-only dependencies
checked over the production closure (§17.4); nothing copyleft linked or bundled; the notices file; the clean-room chain
(§17.1); every file written by the program's seats for the owner, and no outside contribution without the owner's
written assent.

### E.7 The former Staged section's history sentence

The owner ruled on 2026-09-25: "I would prefer if there is no defer and everything is fixed as soon as possible." This
document defers nothing: every entry of the former "Deferrals" list — the numeric targets, the boolean library, the
skeleton, the dd2vtt profile, CityJSON, SDF text, setting packs, host inputs, a sync service, a WASM kernel, the owner's
licence and the worker pools — is now a decision in the body, with its confirming measurement and pre-decided fallback
where only an experiment can confirm it (the entry-by-entry mapping is in `docs/ARCHITECTURE-VALIDATION.md`, round 1;
rounds 2, 3, 4 and 5 disposed of every item still open after the previous round as FIXED, none staged — §R2, §R3, §R4
and §R5 there). The subjects below are the only ones the owner's own roadmap places in a later stage. For each, the base
carries concrete hooks now, in the sections named; they are staged by the owner, not deferred (documented, not bugs to

## Part F — The longer inline reasoning moved out of the other parts' sections (verbatim, by judgment id)

Each part's rewrite removed its inline "chose … because …" passages and left the rule with "(J-x)" in the section. Where a passage is longer than its Part A row — it carries measured figures, rejected alternatives or reasons the row does not — it is kept here verbatim, as each part's rewriter recorded it (the source line numbers are those of the pre-pass document). The history clauses the parts dropped are kept with them.

### F.1 §2 domain model and schemas (extracted from the pre-pass §2 by the scope rewriter; the model part's rows are J-K1, J-K3, J-K7, J-K9–J-K12, J-K22, J-K23, J-K28, J-K29, J-K31, J-K32, J-P1, J-P17, J-P31, J-P39, J-P42, J-P47–J-P50, J-DET-33, J-DET-35, J-DET-36, J-DET-38, J-DET-41, J-DET-44, J-DET-46, J-DET-52)

*(§2, archived l. 926–930)*
*Judgment J-K1.* Chose one arena per layer with level-tagged edges and per-level face records over five separate
per-level DCELs joined by a cross-level `splitThrough` protocol, because the shared arena makes nesting exact by
construction, moves shared boundaries atomically (warp, stage-2 seams, party walls), stores each boundary once and needs
no cross-arena bookkeeping; the price — a finer batch may add sub-centimetre Steiner vertices to a coarser edge — is
bounded by the hot pixel where each is placed and kept out of every coarser-level read.

*(§2, archived l. 932–935)*
*Judgment J-K3.* Chose role and owner tables with kernel-resolved views over stored half-edge, vertex and face id lists
kept current by a lineage table, because the kernel then never has to find and rewrite references it does not own, every
fact is stored once, and a stale handle becomes impossible rather than detected; resolution costs O(length of the chain)
through the reverse index.

*(§2, archived l. 937–943)*
*Judgment J-K9 (GEO-5).* Chose to make every entity-held vertex a role-carrying vertex (`attach`, `anchor`, `weld`,
`deck_end`, `gate_end`, and `gate_opening` sub-edges) and to give log positions a role signature, over persisting
lattice points in entity records and re-binding them by distance, because a role travels with the vertex through every
split, merge, attraction and warp while a stored position goes stale at the first warp, and because distance alone
cannot tell the intended vertex from an unrelated one 20 cm away after an upgrade. A gate opening is an indexed *edge*
role rather than the vertex role the round-1 verifier named, because an opening has a width: it is the open sub-edge
between the two gate ends, and its edge set resolves both ends at once.

*(§2, archived l. 945–949)*
*Judgment J-K10 (VK-2).* Chose knot profiles — values at role-carrying vertices, interpolated by arc length between them
— over profiles keyed by arc length from the chain's start, because a wall ring has no stable start (its lowest-leftmost
vertex changes under a warp) and a warp or an inserted junction would slide arc-length breakpoints away from the feature
they belong to, while a knot is a vertex and moves with it; the price is one role row per knot, and constant attributes
need none.

*(§2, archived l. 951–954)*
*Judgment J-K11 (VK-18).* Chose to promote a finer vertex a coarser batch lands on, over clearing and re-deriving the
neighbour's finer content within `attractCm`, because promotion keeps the neighbour's plots and a close-up's kept fabric
byte-identical (II.1 rule 3 promises "never its plots"), moves nothing, and costs one level byte and one undo entry; its
reversal, when the promoting chain is removed by any edit, is demotion (J-K28).

*(§2, archived l. 956–960)*
*Judgment J-K22 (VK2-9).* Chose typed-array open-addressing tables for the role heads and the owner heads over `Map`s,
because the pool's frozen copy is then ArrayBuffers only — one memory copy, ≈ 1.5 ms per worker at the one-click
freeze's ≈ 15 MB — while rebuilding `Map`s costs every pool worker ≈ 10–20 ms at CITY (≈ 62 ms at METROPOLIS, measured)
on the pool's critical path before its first query; the price is ≈ 2 MB of tables at load ≤ 0.5 and a fixed hash whose
slot layout no output reads.

*(§2, archived l. 962–967)*
*Judgment J-K23 (VK2-8).* Chose cut knots carrying the exact sampled value over re-keying the existing knots alone (each
part then turns constant from its last knot to the cut — a width moved by up to 8.47 m, measured) and over rational or
source-referencing cut knots that would make every sample bit-exact, because the exact double differs from the original
sample by under 10⁻¹² cm — ten orders of magnitude below the 1 cm lattice every consumer snaps to — while a rational
form needs BigInt arithmetic in every `kerb` and `bandUnion` sample; the price is one non-integer knot value per cut,
the same on every engine.

*(§2, archived l. 969–985)*
*Judgment J-K28 (VK3-3; the guard amended for VK4-3).* Chose demotion — an edge takes the lowest level among its rows, a
vertex is never coarser than every edge and role at it, and a split vertex left beside its run with only finer geometry
returns to that geometry's level while its `split` flag stands — over leaving birth levels where promotion left them (a
removal other than an undo then keeps a neighbour's plot-line end in the kerb's L2 route, index and digest, and an old
shore stretch shared with a quay or a wall keeps an L1 feature in the L0 view against rule 1) and over re-deriving the
neighbour's finer content when its street is removed (II.1 (3) promises never its plots), because levels that follow the
rows make every removal the inverse of the insertion that made them — the route restored vertex for vertex on 100 000 of
100 000 random routes, checked — at the cost of one check per touched edge and vertex; and chose to keep the `split`
flag through a promotion onto the route the vertex lies on, and to clear it when a removal breaks the run it split, over
clearing it on every promotion, because the flag is the test that tells a restorable vertex from a chain's own shape
vertex, which demotion must never take out of its chain. Round 5 (VK4-3): chose the flag alone as restoration's guard —
a move of the vertex, or of the vertex beside it on its run while it stays, clears it (§3.6) — over round 4's distance
test against its current run and over a widened test (the hot pixel plus the measured drift, ≈ 2 cm), because the flag
states the exact condition — nothing that defined the edge it split has moved — while any distance is either tighter
than K4-1's drift (round 4's test refused 0.54–0.66 % of restorations after later same-level vertices on the run, so the
vertex stayed in the kerb's L2 route and digest for good, `fixall_kernel_r5_checks.out` A) or loose enough to restore a
vertex that a warp bent by a centimetre or two.

*(§2, archived l. 987–998)*
*Judgment J-K29 (VK3-2).* Chose a `gate_end` vertex role on the water gate's own address — a fresh `Gate` from the
preparation batch on, as a re-sited deck's bank vertices are under a fresh `Bridge` — over `anchor` rows on the
enceinte, and transient `anchor` contact names at the entity's smallest free ordinal (from 2 on an enceinte), stripped
by the promotion that uses them, over persistent anchors at unallocated ordinals, because a water gate's bank vertices
are not the ends of an open chain but the ends of a gate, which its `Gate` record must name as a `Bridge` names its deck
ends, and because a contact name that no record references would otherwise keep its vertex alive after the water leaves,
could collide with an open trace's end anchors, and would accumulate ordinals across edits; and chose the first
own-level row in registry order as a contact name's entity over a per-case list, because it is total — it names an
entity for a district boundary carrying two districts' rows, for the perimeter and for any line a later stage adds — and
slot-free. Round 5 (VK4-6 (b)): chose the kernel to allocate a contact name's ordinal as the op applies, the operator
giving the row without one, over operator-supplied ordinals, because a declared batch's ops are applied in the kernel's
canonical order, which the operator that issues them cannot know.

*(§2, archived l. 1000–1006)*
*Judgment J-K31 (VK3-9).* Chose a `StretchRef` view — a chain between two of its vertices, resolved in the batch and
never stored — accepted by `removeEdges` and `retypeEdges`, with cut knots at a removed stretch's ends, together with a
vertex-role row on `splitThrough`, an entity on `insertChain`'s vertex rows and a `VertexRef` form of `removeEdges`,
over stretch-specific operations or removing whole chains, because every partial edit the operators perform — a cut, a
pruned remainder, a replaced stretch, a boundary cut between two anchors, a way split — then passes through the only
doors (§3.4), inside the kernel's invariant coverage, and every remaining part samples its profiles as before (8.36 m →
1.6 × 10⁻¹² cm on ways, 25.8 m → 5.9 × 10⁻¹² cm on rings, measured).

*(§2, archived l. 1008–1017)*
*Judgment J-K32 (K4-1, found in round 4).* Chose to state the hot pixel as a placement bound — every vertex placed,
re-seated or slid onto a coarser route lies within 0.71 cm of it when placed — and to box each route-edge index item
over the vertices standing on its run, over keeping "every Steiner vertex lies within 0.71 cm of its route" as a
standing invariant, because a promotion, a same-level split or a demotion changes a route under finer vertices without
moving them (one promotion in ten leaves another finer vertex up to 1.25 cm from its new route edge, and successive
changes up to ≈ 1.5 cm, measured), so the standing form was false after ordinary edits — an unchecked claim, or a
spurious `E_INVARIANT` at the next batch that touched that vertex — while re-seating those vertices would change a
neighbour's plots that II.1 (3) promises to keep; nothing reads the standing distance but the index, and the run's box
holds every vertex on the run by construction (the endpoints' box missed 38 of 400 753 under the placement rule's
non-nearest choices, measured).

*(§2, archived l. 1102–1104)*
*Judgment J-K7.* Chose `Int32` centimetres relative to a per-document datum over `Int16` decimetres because slope
thresholds at 2.5 m need centimetre precision (a decimetre step is a 4 % slope quantum at that spacing) and the cost is
small — 1.6 MB at CITY's 625² frame raster, 4.0 MB for the 1 000² frame-and-margin raster, 6.6 MB at METROPOLIS's 1 280².

*(§2, archived l. 1106–1110)*
*Judgment J-K12 (VK-9).* Chose one hydrology raster over frame and margin at 1.6 × the former frame-only cell (16 / 25 /
32 m) over hydrology on the frame alone (the margin's fields, farmsteads and mills had no defined flow and O1 (b) failed
there) and over frame and margin at the former cells (2.56 × the cells: + 25 ms at CITY, + 41 ms at METROPOLIS,
measured), because the cell count — and so the measured cost — is unchanged, and the river is a smoothed control
polyline carved into the 5–10 m height raster, so its trace does not need a finer flow grid.

*(§2, archived l. 1199–1203)*
*Chose to drop the stored slot hint over carrying it through every move as the wings are carried, because nothing after S11 reads it — a re-derivation recomputes the site plan and a later `compose()` reads the footprint the hint became.*

*(§2, archived l. 1207–1212)*
*Judgment:* chose feature-named kinds over the synthesis seat's `patrician` / `slum` kinds because MFCG's live taxonomy dropped class-typed wards and its creator states that townspeople lived where they worked with no purely residential wards except the patriciate (MFP-7); wealth still varies continuously through the prosperity field, which is where the owner put it.

*(§2, archived l. 1316–1325)*
*Judgment:* chose wings stored in the base over a single-wing L/T because NG's per-wing roofs, two-tone law and hatching cannot be derived from one ridge line (VIS-10) and the wing split costs one small array per building.

*(§2, archived l. 1327–1348)*
*Judgment (J-P31):* chose a `quad` wing kind that stores the clipped footprint over re-fitting row houses as rectangles, which breaks GEO-26's shared party wall, and over storing them as `polygon` wings, which loses the ridge the per-wing roofs and NG's two-tone law need, because the quad keeps the party wall exact and still names a ridge by construction.

*(§2, archived l. 1327–1348)*
*Judgment (J-P39; VP2-5):* chose to store the quad's four corner indices over inferring its sides from the ring, because a party-wall chain carrying the lot cut's bend has three vertices, so no rule on vertex count or turning angle can tell a bent party wall from a bent front, while S11 knows the corners exactly when it clips the row.

*(§2, archived l. 1425–1493)*
*Judgment (J-P42):* chose to carry the stored wing rings with their footprint — boundary runs re-read from the footprint's rings, joints by mean-value coordinates — over making wings L4 sub-faces now, which needs a per-wing entity and the stage-3 face split in the base, and over re-fitting wings from the moved footprint, which changes the ridges and wing split of every warped house; a carry moves each wing exactly as far as the ground under it moved.

*(§2, archived l. 1425–1493)*
*Judgment (J-P47; NP4-3):* chose to run the carry after every committed batch whose commit record changes a footprint face, whatever stage or edit wrote it, over naming its callers (S11 and the edit layer) and over forbidding S12b's L4 edges to end on a footprint ring, because a list of callers goes stale with every stage that writes L4 — S12b's gardens now, a stage-2 close-up or a registered stage later — while the commit record names every changed face by construction, and because a garden's grid line or an orchard's edge meeting the house wall is the natural layout, which a ban would push off the wall or onto its corners.

*(§2, archived l. 1425–1493)*
*Judgment (J-P48; NP4-2):* chose to carry a stored stage-3 composition in the same call as the base wings, its boundary points made footprint vertices when it is stored, over leaving it at fixed coordinates (a warp would leave its roofs, rooms and 3-D export behind the moved house — the NP3-1 failure one level down) and over re-composing it from the moved outline (which discards the user's edit that stored it), because the composition's union is the outline's by contract, so the same boundary-run and mean-value rules move it exactly as far as the ground under it moved.

*(§2, archived l. 1425–1493)*
*Judgment (J-P49; NP4-6):* chose a check tiered by the building's pairing — none for a wing re-read whole, simple counter-clockwise rings for tiled wings, the arrangement union only for overlapping ones — inside the step's validation, with a measured cost and a pre-decided fallback (one check after the final step, F-REDERIVE for a failure), over one union per building per step (up to ≈ 25 µs each, ≈ 11 ms a pass for 450 buildings at that bound), because the pairing turns the union into a ring test, exactly, for every building whose wings tile, and over checking only after the step, which re-derives a building that halving would have kept.

*(§2, archived l. 1730–1746)*
*Chose a block ordered by `seq` from which an undo removes its target's entries over an append-only block with compensating entries, because compensating entries make the identity subtree of a log with an undone pair differ from that of the same log truncated, so the model digest would depend on whether the pair was kept.*

*(§2, archived l. 1751–1774)*
*Chose to keep the record dormant under a protection and to run case (4) when the protection ends, over deleting the record at a `setAttr` and over letting the next unrelated re-derivation find a stale record, because a deleted record hides an undone rename from a later corpus change — so the log with the undone pair and the same log truncated give different towns (§6.5 (9)) — and a stale record found later renames a name as a side effect of an edit that has nothing to do with naming.*

*(§2, archived l. 1751–1774)*
*Chose a persisted naming record per generated name over reading a name's naming slices from its provenance, because provenance is never persisted and cannot be rebuilt after a rebase, so selecting a corpus in a rebased document could not tell which names drew from the corpus it replaces.*

*(§2, archived l. 1854–1884)*
*Chose the pack set — every pack the base recipe or any `adjust` event names — over the effective recipe's current pack list as the set that is saved and that the link rule reads, because the log is replayed from its first event: a corpus selected and later deselected is still read by the replay of the first `adjust`, and a corpus selected after creation is not in the base recipe at all.*

*(§2, archived l. 1889–1911)*
*Chose to check a frozen view by its content hashes only, labelled as not verified, over recomputing its root with the current packages, because a root is a function of the model packages that computed it, so a cross-version recomputation cannot tell a damaged copy from an old one and would cheapen the real mismatch report.*

*(§2, archived l. 1912–1998)*
*Chose to re-apply the edits made meanwhile on the replay's records over replacing the records only for the entities those edits did not re-derive, because an edit that read a wrong record would otherwise keep a result that no later replay reproduces.*

*(§2, archived l. 1999–2040)*
*Chose to apply edits at once on the displayed snapshot, with the verification replay beside them, over queueing them until verification ends, because §12.6 puts verification at ≈ 1.4 s for the reference mix and ≈ 11 s for 300 district regenerations, while an edit must redraw within 100 ms (O12 (b)); the edits are ordinary log events, so a mismatch only changes the state they are re-applied to. Chose to recompute the decoded state's own digest before its first edit, over trusting its chunks' content hashes, because a content hash proves only that the bytes are the ones written, not that they encode the model whose root was recorded — a writer or loader bug, or an altered file, would otherwise be edited and declared verified. Chose to let a non-owner client keep the served bytes and install the saved town when the owner keeps it, over making every client wait on the snapshot for the owner's choice, because an owner who is absent would leave the editors working on a state the replay has shown to differ, while the kept bytes cost ≤ 3 MB and a re-decode.*

*(§2, archived l. 2056–2080)*
*Chose content-addressed chunks over a bespoke delta format because the partitions already exist for the static indexes and the checkpoints, deduplication by hash is exact, and a loader needs no delta logic; and chose references by lattice point with level-≤ 1 routes in the coarse chunk over (chunk, index) references, because an index into another chunk changes whenever that chunk's partition is renumbered, which would make every edit rewrite its neighbours and the coarse chunk too.*

### F.2 §3 geometry kernel (from `docs/validation/consistency/rewrite-kernel-rationale.md`)

#### A. Inline judgment passages (verbatim), by J id

Target: append each passage under its J row in `docs/ARCHITECTURE-RATIONALE.md` as the row's full text.

##### J-11 (inventory KERNEL-064; §3.1)

*Chose to build `dmath` rather than adopt a maths package (NF-D15, NF-S8)* because D-23, J-11 and §17.4 already decided it and a port we own keeps the production closure free of a 94-package dependency; the earlier "adopt" wording in this table was stale.

##### J-K36 — new row (inventory KERNEL-065; §3.1)

*Chose a pinned, registry-confirmed `robust-predicates` 3.0.3 with an in-house BigInt fallback (VK-16)* over re-verifying at adoption, because the licence is confirmed now and the checker re-runs on every upgrade, so no licence question is left open.

##### J-K13 (KERNEL-095; §3.2)

*Judgment J-K13 (VK-8).* Chose a magnitude-triggered flush (at 2⁵²) derived from the range invariant over a fixed
16-term flush and over the former 1 024-term flush derived from the frame table, because it is exact for every ring
`snap` admits whatever `ladder.json` says, and ordinary faces never pay a BigInt addition at all (a fixed 16-term flush
would pay one per 16 terms on every face).

##### J-K34, first clause (KERNEL-169; §3.3 index paragraph)

*Chose static-only filtering over forbidding slot reuse until the next rebuild* because the old and new occupants of a slot then live in different structures by construction and the arena stays compact.

##### J-K6 (KERNEL-176; §3.3)

*Judgment J-K6 (amended for VK2-4).* Chose static partitions rebuilt at stage end (per district at L2–L4) with a
dynamic grid inside stages over a rebuild per batch commit, because per-batch rebuilds of a growing level make S10 and
S11 cost seconds (measured 1.9 s and 13.4 s at CITY), and chose query results sorted by a total canonical key per item
kind, read on the query's level-n route, over keys read on the full ring or on sub-edges, so that neither index state
nor a finer level's derivation can change a level-n output (rule 3's promise; the full-ring key reverses two L3 faces
once an L4 vertex lands on their shared edge, measured).

##### J-K14 (KERNEL-177; §3.3)

*Judgment J-K14 (VK-1, as amended at integration).* Chose to keep finer content an earlier stage made, and every finer
face outside a coarse edit's clear region — an obstacle to later coarser batches, with `E_KEPT` for a violation — over
letting a coarser batch clear everything finer inside its faces and re-running the earlier stages afterwards, because a
coarse edit inside finished fabric must not erase what it does not re-derive and a wrong stage domain must fail typed
rather than erase silently; the stage rank per face costs one byte. Integration moved the wall's band parts into L1
strip faces built after S9 (J-P29, J-I9), so the one-click order produces no kept content and the rule is the safety net
and the basis of clear regions (J-I10). Round 3 confines the rule to insertion and clearing: a move keeps nothing,
because a warp is the user's explicit displacement of finished fabric and would otherwise be `E_KEPT` over every
street it touches (VK2-7).

##### J-K24 (KERNEL-178; §3.3)

*Judgment J-K24 (VK2-3; the deck form amended at integration, J-I12).* Chose to name a coarse insertion's permitted
contacts explicitly — `KernelTx.prepared`, by role, each prepared vertex attracted onto and promoted — over letting the
coarse chain attract onto any finer vertex near its route, because the kernel can then refuse every unprepared contact
(`E_LEVEL`) instead of silently welding a canal bank onto whatever plot corner lies within 26 cm; and chose the deck
span to be the kept way's own L1 edge between its two promoted bank vertices over an L0 deck edge laid on it by edge
promotion and over leaving a gap in each kept way for a new deck edge, because generation already builds a deck that
way (S1 and S3 place the bank vertices at L0, S4's L1 spine carries `deck` on its span), so a dug canal and a moved
river leave the structure a regeneration would, every way stays one connected chain through the whole edit (which keeps
§3.10's role-consistency check meaningful after every batch), no deck splits a water body's L0 faces (rule 1: L0 is land
and water only) and no second kind of promotion is needed.

##### J-K15 (KERNEL-179; §3.3)

*Judgment J-K15 (VK-6).* Chose two declared transaction forms — independent op sets in canonical order, dependent op
sequences in issue order — over one canonical order for every batch, because a recursion such as the bent cut plans each
op on the faces the previous op created, so sorting it would apply a child cut before its parent face exists, while its
issue order is already a deterministic function of the stage's inputs and streams.

##### J-K16 (KERNEL-180; §3.3)

*Judgment J-K16 (VK-3).* Chose read-only transferred copies of the arena with one copy-on-write overlay per district and
a lineage-ordered merge, over a `SharedArrayBuffer` arena written in place by the workers, because shared memory makes
cross-origin isolation a requirement of every embedding page (D-4's embed target), in-place writes would need locks
whose order could leak into the output, and a district that starts from the frozen base alone is deterministic whatever
the pool size; the price is one arena copy per worker — ≤ ≈ 15 MB at CITY at the one-click freeze with the typed lookup
tables and the static index partitions, ≈ 20 MB at a freeze after edits (VK3-6) — counted in §12.8.

##### J-K25 (KERNEL-181; §3.3)

*Judgment J-K25 (VK2-1).* Chose to end S10's eager step (0) with a rebuild of the L3 partitions it touched, so that the
frozen copy carries the L0–L3 static partitions and every dynamic grid is empty at the freeze (asserted), over shipping
the generation worker's dynamic grid with the copy (the grid would have to become a transferable structure, and each
worker would query two dynamic structures) and over letting each pool worker index its districts' step-(0) parts at
district start (≈ 0.8 ms per worker in parallel instead of ≈ 2.3 ms once), because one checkable precondition — nothing
at the freeze lives outside a static partition — makes it impossible for any pooled stage to query an index that misses
eager content, whatever later eager steps are added before the freeze; the price is ≈ 2.3 ms on CITY's critical path.
Round 4 (VK3-5) makes the freeze establish that precondition itself — it first rebuilds every partition whose grid or
tombstone set is not empty, and only then asserts — over asserting on trust that the last writer rebuilt, because an
editing session deliberately leaves grids dirty until they overflow (a single plot edit would otherwise pay two
partition rebuilds), so an epoch or a re-derivation after edits would freeze dirty grids and fail the assertion, or,
without it, send pooled stages an index that misses the edited items; the price is nothing on the one-click path and
≈ 2–10 ms after a typical run of edits (≈ 59 ms if edits have touched every partition of a CITY, measured).

##### J-K33 (KERNEL-182; §3.3)

*Judgment J-K33 (VK3-8, kernel part).* Chose the first stage of §4.1's order as a move batch's `rederivesFrom` over the
first stage that writes its `fromLevel`, because a move clears nothing (§3.6), so the value only has to rank at or below
every face the move could reach, and a named list of first writers goes stale whenever §4.1 moves one — VK3-8's
placement of the frame lines had to be checked against such a list (the arena's outer ring is written by S1's L0 batch
and the map border by S3's L1 batch, so S3 stays the first L1 writer, §4.1), and every later move of a writer would
reopen it.

##### J-K34 (KERNEL-183; §3.3)

*Judgment J-K34 (VK4-5).* Chose to tombstone every item a batch deletes, re-levels or changes — keyed by item kind and
slot, in one set per static partition found through a per-slot home column — and to insert its successor in the grid,
over moving or rewriting items in place, because a static packed partition cannot change an item: a
promoted-then-demoted plot-line end would otherwise answer an L2 query as an L2 vertex and an L3 query twice until its
partition happened to be rebuilt, so an answer would depend on rebuild timing, against this section's "neither which
structure holds an item … changes any answer", and a replay that rebuilds at other moments could differ from the session
(§7.3 item 7 (i)); and chose one set per partition over one per level, because a partition's rebuild must drop exactly
the tombstones of the items its old build held — with one set per level, a slot freed in one district and reused in
another (VK-15's own case), or an item re-owned into another district, would be hidden by the old tombstone once the
other partition's rebuild indexed it, or the freeze would have to rebuild every partition of the level; the price is 2 B
per slot (≈ 0.5 MB at a finished CITY) and one grid insertion per changed item, which the overflow rule already bounds.

##### J-K2 (KERNEL-293; §3.6)

*Judgment J-K2.* Chose attraction at `minEdge` + 1 cm — existing geometry wins, an incoming vertex moves at most √2 · 26
≈ 36.8 cm (onto an edge's endpoint from beside the edge) — over a 5 cm weld plus `minEdge` rejection, because the dead
band between the two sent about one cut in ten to the failure ladder and left mandatory chains (walls, coasts, plot
lines) with no repair; the moved distance is a fraction of the narrowest way (an alley's 2 m, §4.6) and of the minimum
plot width (2.5 m), and both references snap rather than reject (FTG's "improved intersection snapping", MFCG 2017's
junction merge).

##### J-K17 (KERNEL-294; §3.6)

*Judgment J-K17 (GEO-3; extended to moves for VK2-6).* Chose to move a vertex whose foot falls within `attractCm` of an
edge's endpoint onto that endpoint, and to place every new vertex on an existing edge — and every vertex a move re-seats
onto a route or slides along one — by the constrained placement rule, over plain nearest-point rounding of feet,
crossings, re-seats and slides, because two roundings can stack — a vertex left 25.3 cm from an edge by one rounding,
then a crossing or a re-seat rounded 0.7 cm towards it — and plain rounding then creates edges the hard invariant
rejects (1.34 % of edge attractions, 0.7 % of such crossings and 12.9 % of such re-seats, measured), which would make a
mandatory chain fail for a precision reason and a warp halve to a no-op; the constrained point moved by under a
centimetre for insertions and at most 4.3 cm along the route for re-seats in every measured case.

##### J-K18 (KERNEL-295; §3.6)

*Judgment J-K18 (VK-7, VK2-6, VK2-7).* Chose to slide a vertex along the fixed route it lies on — an edge of level <
`fromLevel`, or one whose endpoints are held — over holding it (the whole step then halves to a no-op near every shore
junction, an editability regression against MFCG's warp) and over freeing it (it would leave the shore and move out of
the placement bound, §3.10; VK4-2), because sliding keeps the shore exact and gives the drag the user expects at quays,
bridgeheads and riverbanks; the slid vertex is seated by the placement rule for the reason of J-K17.

##### J-K26 (KERNEL-296; §3.6)

*Judgment J-K26 (VK2-5).* Chose to clear the `split` flag of a moved vertex except when the move re-seats it onto, or
slides it along, the edge it split, over clearing it on every move (a re-seated Steiner vertex left with degree 2 would
never dissolve, and the next derivation would attract onto a vertex a derivation on the clean edge would not have) and
over never clearing it (a warped same-level T-junction would dissolve once its lane is removed and straighten the warped
spine), because the flag's one meaning — "dissolving me restores the edge I split exactly" — is true after a re-seat or
a slide and false after any other move — of the vertex or, for a vertex of its run's own level, of the vertex beside it
on that run (VK4-3); a prepared contact's or a stretch end's promotion clears it for the same reason, while a promotion
onto the route the vertex already lies on keeps it, because there the meaning stays true and demotion needs it (VK3-3,
J-K28).

##### J-K30 (KERNEL-297; §3.6)

*Judgment J-K30 (VK3-4).* Chose to place a step's re-seats and slides one at a time in canonical order — by lattice
position before the step, each reading the vertices already placed at their placed points and the rest at their
rounded targets — over slot order, which would make the output depend on slot numbers against §3.3 (the two orders
differ in 6.8 % of close pairs, measured), and over a simultaneous solve of all moved vertices, which has no bounded
deterministic algorithm that the whole-step validation's halving does not already provide.

##### J-K27 (KERNEL-298; §3.6)

*Judgment J-K27 (VK2-7).* Chose to let a move batch keep nothing and to decide what it may not displace by a held set —
every route vertex of a locked or pinned entity's geometry and of the finer faces under it, closed downwards over the
endpoints of coarser edges that carry a held Steiner vertex — over applying the kept-content rule to moves (every warp
over finished fabric would be `E_KEPT`) and over holding only role-carrying vertices (plots, blocks and buildings carry
no vertex roles, so a locked plot would be reshaped against §7.2), because the held set is exactly §7.2's promise
("keeps its existence and position") expressed on vertices, computed once per step in O(held geometry).

##### J-K35 (KERNEL-299; §3.6)

*Judgment J-K35 (VK4-4).* Chose to hold a water gate's `gate_end` vertices under a warp as a deck's are, whatever their
level, over giving a generated water gate L0 bank vertices through an extra L0 batch of two shore splits before the
trace (the form S4's added deck has), because the hold alone makes both kinds behave alike under every warp — the one
place the level difference reached a user — while the extra batch would add an L0 writer to S5a and a row to §4.1's
batch table for no visible output; the difference that remains is whether the bank vertices belong to the L0 view — an
edited gate's do, as vertices the new shore was drawn through, while a generated gate's lie within the hot pixel of a
shore drawn first — which the L0 digest records and which moves no shore by more than that hot pixel.

##### J-K4 (KERNEL-325; §3.7)

*Judgment J-K4.* Chose booleans and buffers on the kernel's own arrangement over adopting Clipper2 with a pure-JS
fallback, because one engine then runs identically on every host without a WebAssembly requirement (the embed target
of D-4), every boolean output obeys the same attraction, `minEdge` and clearance rules as every other chain (no re-snap
round trip), and the corridor faces nest exactly in their L1 faces; the kernel already builds the hard part (exact
insertion with snap rounding), and Clipper2 remains the speed reference, the correctness oracle and the pre-decided
fallback.

##### J-K8 (KERNEL-326; §3.7)

*Judgment J-K8.* Chose a TypeScript kernel on every host, with a byte-identical WebAssembly accelerator for a measured
hot loop as the pre-decided fallback, over a WebAssembly core, because a single portable implementation satisfies the
embed target and the one-engine rule at once, and an accelerator verified byte-identical cannot change a hash; chose to
settle a small miss by a declared budget amendment unless it breaks its stage row, over accelerating every loop that
misses at all, because an accelerator is a second implementation to keep byte-identical and is worth it only where the
budget needs it.

##### J-K19 (KERNEL-327; §3.7)

*Judgment J-K19 (VK-4).* Chose to compare against the oracles strictly on the cases where our engine reports that
nothing was attracted, and to bound the attracted cases by the attraction radius, over normalising the oracles' output
through our own `insertChain`, because the normalised oracle would inherit our rules and stop being independent, while
the split keeps an exact, independent check wherever exactness is promised and a proven bound wherever the design
deliberately differs.

##### J-K20 (KERNEL-328; §3.7)

*Judgment J-K20 (VK-5).* Chose to set the kernel's M0 bar at S11's geometry share (≤ 3 µs per plot median) inside one
S11 row, over the former 10 µs `offsetFace` bar, because a kernel bar looser than the stage it serves could pass while
S11 missed its budget by 2×.

##### J-K5 (KERNEL-346; §3.8)

*Judgment J-K5.* Chose an in-house skeleton under a stated numeric contract, exact OBB roofs for convex near-rectangles
and a validator on every output, over porting a library (none permissive and mature is assumed) and over dropping the
skeleton, because irregular footprints and holed water and wood faces need it, the validator bounds the damage of a
numerical glitch to one downgraded roof or label, and the downgrades are ready as the pre-decided fallback.

##### J-K21 (KERNEL-347; §3.8)

*Judgment J-K21 (VK-10).* Chose a convexity gate on the exact OBB path over checking each ridge and hip line inside the
footprint after construction, because convexity makes "every roof line lies inside" true by a two-line argument at the
cost of one exact turn test per vertex, while a post-check would still have to decide what a notched footprint's roof
should be — which is the skeleton's job.

##### J-DET-36 — addition (inventory KERNEL-357; §3.9; appended to the Part A row by the consistency pass)

*Chose* to keep each split keyed by its route edge's endpoints and to state the rewrite, over keying it by the split vertex's lattice point alone for the loader to find the nearest level-≤ 1 route edge, because the endpoint key needs no uniqueness argument across K4-1's drift (≈ 1.5 cm after several changes, `fixall_kernel_r5_checks.out` B), while the extra rewrites fall on partitions that border a changed coarse edge and the size bar measures them.

#### B. History clauses dropped from the normative text (verbatim)

The validation record (`docs/validation/fix-all/r1–r5-*.md`, `docs/ARCHITECTURE-VALIDATION.md`) already holds each; they
are listed so the mapping table of `rewrite-kernel.md` is checkable.

##### KERNEL-063 — legacy error-code map (§3.1)

The earlier codes map as follows: `E_TIMEOUT` → `E_WORK_LIMIT`; `E_SNAP_UNSTABLE` → the warning `W_SNAP_PASSES`;
`E_MIN_EDGE` → `E_BELOW_MIN_EDGE` (optional chains only); `E_COLLAPSED` and `E_COLLINEAR` → `E_DEGENERATE` with a
detail; `E_NONMANIFOLD` → prevented by the contact semantics and the simple-face invariant (§3.6, §3.10).

##### KERNEL-218 — the pipeline's older op names (§3.4)

The pipeline's older names map directly: `corridorUnion` keeps its name and becomes the corridor use of `bandUnion`; `claimSubFace` may now span several faces (a reservation that crosses coarse faces, a precinct, a bailey); `retypeEdges` acts on role sets; `bufferChain` is `buffer`; `edgeChainBetween` is `resolve(ChainRef)`; `weld` no longer exists (attraction, §3.6); `refine(level)` is a stage, not a kernel op.

##### KERNEL-223 (tail) — a removed argument (§3.4)

the former `ordinalOffset` argument is gone, because the kernel renumbers each entity's knots in chain order itself.

##### KERNEL-366 — the five-DCEL design (§3.9)

the five-DCEL design wrote each inherited edge again at every finer level.

##### KERNEL-075 — the first-written attraction rule (§3.2 (2))

the rule as first written left a sub-`minEdge` edge in 1.34 % of edge attractions (the round-1 verifier's `fixall_verify_kernel_attract_gap.out`).

##### KERNEL-261 — the first-written rule and the replaced 5 cm weld (§3.6)

where the rule as first written left one in 1.34 % of edge attractions (`fixall_verify_kernel_attract_gap.out`); and the round-1 measurement of cut endpoints on Chaikin×2 spines with 7.9 m median segments, re-run from the committed script (`fixall_kernel_r1_attract_check.py` reproduces the round-1 output; `fixall_kernel_r2_attract.py` B applies the revised rule): 6.38 % attracted, displaced p50 12.9 cm and at most 26 cm, shortest resulting edge 25.6 cm — unchanged, because those endpoints lie on the spine. The replaced rule welded only within 5 cm and rejected the rest, so ≈ 5 % of endpoints and ≈ 10 % of two-ended cuts fell to the ladder (GEO-3).

##### KERNEL-087 — the former fixed flush (§3.2 (6))

are exact under this rule and inexact under the former fixed 1 024-term flush, which rested on the frame table instead of the range invariant.

##### KERNEL-080 — the former weld (§3.2 (2))

The earlier 5 cm weld no longer exists: coincidence is lattice-point equality and proximity is attraction (Judgment J-K2).

##### KERNEL-092 — the former frame squares (§3.2 (9))

METROPOLIS 64 km² — the former 2 / 5 / 8 km squares)

##### KERNEL-338 — the old near-rectangle test (§3.8)

under the old test its hip from (0, 0) to the ridge end (5, 5) passed through (1.5, 1.5), inside the notch and outside the footprint

### F.3 §4 generation pipeline, §10 content, PART II and PART III (from `docs/validation/consistency/rewrite-pipeline.md` §9)

Each passage below left the part; the rule it justifies stays in the new text with "(J-x)". Ids from the canon's
RATIONALE OUT: plot counts → J-P6; walled share → J-P5; bent cut inside / FTG outside and the rejected alternatives → J-P4
(+ J-3); quarter level → J-P2 (+ J-I1); continuation prohibition → J-P11; dry-ditch default → J-P36; D-7 widening → J-9;
relation store → J-P21; square default → J-S42; the rest name their row.

- (§4) *Judgment J-P46:* chose the arena's outer ring as an L0 chain written first by S1 and the map border as an L1 chain written first by S3's L1 batch, over both at L1 — every L0 face needs a boundary and the sea and the rivers run out to the arena's edge — and over the border at L0, which is land and water only and would split every water body the frame crosses; laid after S3's L0 batch, the border meets no generation L0 insertion — S4's shore splits keep `attractCm` from it (§4.2 S1 (5)) — and an outer moat's carve and an edit prepare it as §3.3 rule 2 states); S10 never writes L1 — a rear or back lane is decided by S8's deep-interior rule (§4.6), and a lane a user adds later is a `drawWay` edit through §7.3's S5 operator, whose tree scoping re-derives every finer level under it (GEO-25). Static spatial indexes are rebuilt at stage end, never per batch, and S10's eager step (0) ends like a stage: it rebuilds the L3 partitions it touched before the pool's freeze, so the frozen copy carries the static partitions of L0–L3 and every dynamic grid is empty at the freeze (§3.3 pool step 1, §3.10; VK2-1); a freeze after edits first rebuilds every partition the edits left dirty, at every pool size (VK3-5); each stage's `workLimit` counts kernel operations, never milliseconds, and the wall-clock watchdog lives in `@plat/api`'s worker host and only reports (§5.2 F-BUDGET-TIME).

- (§4) *Judgment (J-P10, reconciled with J-R18 at integration):* chose the pool as the primary configuration, measured at M1 with the single worker as the pre-decided fallback, over single-worker-first, because after the eager allocation the per-district stages share no writes, and by the laws the pool keeps CITY's p95 within 300 ms up to ≈ 5 200 buildings (a single worker: ≈ 3 770) and moves METROPOLIS's one-second knee from ≈ 11 400 to ≈ 14 200 buildings (§12.3, §12.5).

- (§4) *Judgment (J-P27):* chose to run the hinterland unit on the otherwise idle generation worker as one more overlay of disjoint faces over keeping the field partition as an eager L1 stage before S8, which would add its ≈ 12 ms to CITY's p50 critical path (§12.4's sum, ≈ 255 ms with round 4's counted index copies, to ≈ 267 ms; NP3-8), because the fields are L3 content of the hinterland's own blocks and the generation worker waits for the pool anyway.

- (§4) *Judgment:* chose plot counts per band with a measured plot share over the synthesis seat's single area per class with `builtBlockShare = 1 − 0.38`, because FTG's 38 % is footprint over lot, not plots over land, and one area per class ignores the 11× plot-size spread across bands. **Measurement:** M-1 #5 (FTG face recovery) measures FTG's plot share; M1 measures B-CITY's own per regime. **Fallback:** if S5d's top-up fires on more than 10 % of B-CITY seeds at a rung, the `plotShare` rows are refitted from B-CITY's measured share per regime by one scripted pass, with a declared golden shift (§13.3).

- (§4) *Judgment:* chose MFCG's walled share over the synthesis seat's 0.35–0.5 (an addition to D-2, not the owner's era default) because a mostly-extramural default reproduces MFCG's size-80 shanty case, the wall is the town's signature silhouette (R6), and a compact walled town with ribbons on its approach roads is the historically constrained medieval pattern; FTG's ≈ 20 % walled preset stays reachable as a preset row, and the corpus phase recalibrates the rows. Output: `Roster` (demand by class with area / frontage requirement classes, district affinities, wealth bands) and `StageQuotas[]` (plot counts per class × band, land area, regime per stage: dense core → gapped rings → ribbon, plus the optional suburb; FTG's zonal gradient, R4).

- (§4) *Judgment (J-P26; NF-P1):* chose to solve the gate routes at S3 and take the stage-1 boundary, the gates, the castle weld and the moat from one travel-cost construction over the two alternatives the verifier named — a provisional boundary on straight corridors along the bearings, which still differs from the routed arterials by their bends, and sliding the gates at S5a, which leaves a moat carved at S3 on a line the wall no longer follows or forces water into L0 after the arterials exist — because a moat must enter L0 before any L1 edge (§2.2 rules 3 and 6), and it can follow the real wall only if the real wall is known then; the plaza-rooted Dijkstra and the field are the work S4 and S5a already did, moved earlier (§12.4).

- (§4) *Judgment (J-P35; VP2-2):* chose to solve the harbour route after the trace and the moat, through the serving gate and outside `T`'s road set, over keeping it among the (5) routes that shape `T`, because whether it must leave through a gate depends on the boundary `T` produces — a route in `T`'s road set would make the boundary depend on a route whose form depends on the boundary — and over adding a gate for it beyond N, which would break MFCG's gate law and "roads leaving = N"; a sealed town (`N = 0`) is the one case that gets a harbour water gate, because no gate exists to serve it — and the detour guard, where M1's measurement of the harbour pick fails or where the harbour's nucleus has no unforced pick left to force (4), (7). This changes `T` slightly on harbour towns whose harbour route used to lower it (a declared design change; no golden exists yet).

- (§4) *Judgment (J-P44; NP3-4):* chose to emit every crossing site as a `site` — two pinned bank vertices and a record, no span — that becomes a built bridge only when a way uses it, with the town bridge the one site S3 makes a destination, over making every emitted site a destination (which would line a river with roads to dozens of bridges) and over emitting no site until a route needs one (which would leave growth, epochs and drawn bridges to place decks after L1 exists every time), because FTG turns only crossing proposals into bridges and MFCG draws one per street crossing, so a bridge should stand where a road needs it; and chose one L0 batch of two same-level shore splits for a deck where no site stands over widening the carve's preparation path to it, because nothing is inserted into the water, so there is no clear region to declare and the only contact is the two shore points; and, inside S1's water operator or a carve, where the water is being inserted, chose to let the rung only site its deck and the operator's own batches place it, over splitting the old shores, which that operator's L0 batch removes (VD4-10).

- (§4) *Judgment (J-P45; NP3-7):* chose to force one of the N picks at the point where the plaza ↔ harbour least-cost path leaves the pick contour, with the detour guard's harbour water gate as the pre-decided fallback, over letting the harbour's bearing only score the picks (a jitter or a terrain term could still move the pick away, leaving the detour unbounded) and over always adding a harbour gate beyond N (J-P35's objection: it breaks MFCG's gate law), because the forced pick's gate route runs along that least-cost path's own prefix, so the harbour road leaves on the harbour side by construction and N is kept; this is a declared design change to `T` and the gates of harbour towns (no golden exists yet). Where the harbour's nucleus has no unforced pick left (NP4-4), chose the detour guard unconditionally over raising that nucleus's `N₁` by one, which breaks the gate law and the nested-pick prefix, and over releasing one of its polycentric forced picks, which cuts the gate-to-gate route §4.3 joins the nuclei by, because the guard's harbour gate is already the declared exception to N and bounds the detour by the same 1.5 × `L*` test.

- (§4) *Judgment (J-P36; VP2-10):* chose to carve an `on_enceinte` castle's moat only along its outer arc, joined to the city moat where there is one, with a dry ditch or nothing on its town side, over a ring band around the whole bailey, because the town wall arrives at each weld vertex from outside the bailey and so must cross a ring band — against §4.4's rule that the trace crosses water only at a river's water gate — while the outer arc is the stretch that faces the field, and the town side, where the castle gate opens, needs no water; the hard filter of (8) keeps every solved route off a planned castle moat, so no castle moat needs a deck except at a ring moat's castle gate.

- (§4) *Judgment:* chose the bent cut for the intramural fabric and FTG growth outside the walls over FTG growth everywhere, because MFCG's intramural signature (coherence, wall alignment, the connected three-valent alley mesh) comes from recursion on the district polygon and the tiebreaker favours the measured construction, while FTG's staged growth along roads is the historically constrained form of extramural expansion.

- (§4) **Alternatives rejected (written, as required).** 1 *Partition seeded from a grown skeleton via Voronoi cells around the arterials*: cell edges are again widthless, classless "streets"; fails the tiebreaker and O4 (a)–(c). 2 *Pure FTG growth including infill*: the 15°-clamp fabric and "vaguely circular" sameness; loses the NG signature R3 requires; a queue cannot guarantee block-size bands. 3 *Pure MFCG partition with FTG plots inside*: no destinations, no growth (the evolution hook needs it), no metres, restart-prone water. 4 *Urban Places' base mesh*: street geometry becomes a function of mesh resolution, which the precision tiebreaker forbids; its warp/edit affordances are obtained by the vertex arena and `warp`. 5 *Least-cost connectors instead of growth for the secondaries* (the pipeline proposal's default): defensible under the tiebreaker, but it leaves FTG's organic staged accretion and the measured suburb signature on the shelf, and the owner asked for the best of both. 6 *Walls traced after growth* (this document's first version): streets grown before the wall must then be cut or gated, and the fabric cannot inherit the wall's direction (GEO-18, MFP-2).

- (§4) *Judgment (J-P28):* chose the cut at `min(N_q, L)` over flooring the district count at N_q, because the floor moves the matched TOWN from 8 to 10 labels — no closer to MFCG's 9 — and would shrink TOWN's districts below MFCG's own size; S13a names every node of the tree, and a zoom stop between the city and district bands may use a finer cut (view data, §9.4).

- (§4) *Judgment:* chose a quarter level over thinning district labels by priority, because thinning leaves named districts unlabelled at the view the owner compares with MFCG, whereas MFCG labels every one of its (larger) districts; and chose one merge tree whose city cut is fixed by the count law over two mechanisms (a flat grouping here and a label-side tree in §9), so the model and the label ladder can never disagree about what a quarter is (integration record C-1).

- (§4) *Judgment (J-P41; VP2-3, NP3-8):* chose to exclude the strips from the claim candidates over letting a claim take strip ground, because a reservation there would site an institution or park where nothing may stand. Test: 100 % of institutions and parks larger than one block placed at their requirement (O18 f), and 0 S7b claims meeting a wall strip.

- (§4) *Judgment (J-P32):* chose a portal gap that slides a planned end away from an existing portal over letting two districts' lane ends share one boundary vertex, because a shared vertex is the crossroads across a district boundary that step 10 forbids and would bind either district's reroll to the other's lane.

- (§4) *Judgment:* chose the prohibition over a two-district transaction because per-district batches, the worker merge rule and per-district reroll isolation all rest on districts never writing each other's faces, and the crossroads it forgoes is rare by design.

- (§4) *Judgment (J-P29; NF-P5):* chose to cut the strips off as L1 faces at S7 and build the band inside them after S9 over subtracting band ⊕ setback inside `kerb(F)` while committing the band at L3 before S8, because an L3 face committed before S8 and S9 must then be cleared or split by their L1 and L2 batches (§2.2 rule 6, §3.10 nesting), whereas an L1 strip boundary makes the wall a barrier for the lane cutter by the same mechanism as a reservation.

- (§4) *Chose `dry_ditch` as the town-side default over `none`, because a castle on the wall keeps its defences toward its own town, and a dry ditch shows that separation on sites without water, at the cost of one residue kind.* The 0.75 compactness gate (MFCG's threshold, kept as a *shape check*) is checked when S3 sites the bailey, before the trace welds to it, and **repaired in place first**, in MFCG's order: equalise the claim polygon's angles toward the regular polygon's (≤ 20 iterations), then bloat it about its centroid in 5 % steps up to its area band's top; only then re-site to the next candidate (reported), and last a keep without a bailey (reported) — never a restart (F-CASTLE, §5.2). The claim polygon is the target of the `warp` `equalize` and `bloat` edits (MFCG's documented castle-resize workflow). Acceptance: castle area and compactness inside the band on ≥ 99 % of seeds with a castle requested; every re-sited castle reported. Several enceintes (citadel, inner, outer, suburb, bailey, palisade, earthwork) are stage rows in the table; up to two castles (§4.2 S0). Every wall carries a lifecycle for wall → ring road conversion (§4.11's `wallToWay`, a `retypeEdges` on the wall's role set).

- (§4) *Judgment (J-P30):* chose a way rule by class — decks for arterials and for sole connections, cuts for the rest — over re-routing every way around the new water, because a town keeps its through-roads across a new moat or canal by bridging them, while lanes that simply end at a new bank are what a carve does to a street pattern.

- (§4) *Judgment (J-P34; VP2-1, NP3-2):* chose one footprint — every L1 cell the channel's buffer (`attractCm` + bank setback) meets or the way rule touches, a crossed wall's old strip lines and new strips included, and nothing else — over the buffer alone, because a pruned remainder, a replaced arterial stretch, a merged cell and a re-traced wall run's strip lines reshape whole L1 cells beyond the buffer, so a check on the buffer alone fails by construction and its fallback would make every carve a town-wide re-derivation; and over the buffer united with those cells, because a cell the buffer's 26 cm fringe meets loses faces to the clear and must be re-derived whole. The cells cost a few blocks beyond the buffer — about 70–120 m of wall and its strips where the channel crosses a wall — and the dry run already computes them when it runs the way rule.

- (§4) *Judgment (J-P43; NP3-3):* chose to give each land face of the footprint the district, hinterland or strip typing of the pre-edit cell holding the larger part of its area, after the water is in, over the merge rule alone ("a cell merged across a removed boundary joins the larger part's district"), because a boundary removed under new water is re-separated by the water itself, and the merge rule then hands the countryside on both banks of a canal across the perimeter to a district, against §4.5's rule that every face outside the perimeter is the hinterland's.

- (§4) *Judgment (J-P40; VP2-1, with VK2-3):* chose the deck span to be the kept way's own L1 edge between its two promoted bank vertices, carrying `deck` beside `way`, over a separate L0 deck edge inserted with the channel, because the way then stays one chain through every batch, the water body stays one L0 face, and §7.3 (b)'s river operator builds its decks the same way, so a dug canal and a moved river leave identical bridge structures.

- (§10) The product proposal's D-7 widening (schedules and the calendar in the base module) is rejected as more than J-S allows for the first release.

- (§10) *Judgment:* chose a relation store whose schema is in the base and whose data the module materialises once and then persists, over relations re-derived on every read, because a re-derivation after any scoped regeneration would reshuffle relations town-wide; the one-click path still never pays for it.

- (PART II) *Judgment (J-P33):* chose one `Seam` record per boundary run, read by both districts, over a contract copied into each district, because one record cannot disagree with itself and a district's re-derivation then changes the seams it is party to rather than its neighbour's district record.

- (PART II) *Judgment (J-P37; VK2-10):* chose a `reserve` seam type over forbidding two districts to meet along a reservation boundary without a way, because the grower's `validateEdge` stops at reservation boundaries by design, so a plaza's or precinct's edge is exactly where districts meet, and the margin band S10 already lays there is the shared geometry the type names.

- (PART II) *Judgment (J-P38; VK2-11):* chose one `corridor_split` insertion into the neighbour's half-corridor strip over re-running `corridorUnion` on the neighbour's whole L1 face, because `corridorUnion` re-derives that face's built blocks and §3.3 keeps only the content of stages before the one re-derived, so it would clear and re-derive every plot of the face, while the strip holds no finer content and the one edge gives the same structure a from-scratch S9 builds at that vertex.

- (PART II, II.2 → J-S42) "(COV-VG-VN-179) … (NG 1.1.0's square, IMPR S4's "keep NG's square as a void")" and "The `square` template row's default is `mode: 'void'` — NG's own square, which IMPR S4 keeps — …" (J-S42; VS4-4).

- (§4.2 S1 (3), moved, not rationale) "VG's live course is a different one, a terrain-independent spline through 6–7 control points laid before its terrain (COV-VG-WC2)" — stated once in PART III.

### F.4 §5 failure handling, §6 determinism, §7 editing (from `docs/validation/consistency/rewrite-determinism-rationale.md`)

#### R01 — §5.1 → J-DET-3 (+ J-DET-25)

Inventory: DETERMINISM-017. Heading of origin: `### 5.1 Principles and the seven tiers (G-P7)`.

> *Chose operation counts over wall-clock watchdogs because a watchdog makes a throttled background tab, a slow laptop or a busy CI runner produce a different town from the same seed; the millisecond budgets of §12 stay as reporting targets and cost tests. Chose laws over the scope's population-derived counts over fixed counts per rung because a fixed count sized for a rung's target fires systematically near the top of its band — coarser output inside one rung and a break in §7.8's monotone population control — and is slack near its bottom.*

#### R02 — §5.3 → J-DET-39

Inventory: DETERMINISM-126. Heading of origin: `### 5.3 The invariant suite, by scope (SCL-1)`.

> *Chose to make the NF-P5 exemption a declaration each edit's dry run computes — the enceintes whose strips its chain rebuilds or removes — with a registry test for every operator that can write a strip, over an enumerated list of exempt edit kinds, because a list drifts behind the operators (round 3's omitted the carve and limited the water operator to re-traced runs), and an implementation that encodes it refuses valid canals and river moves as violations (VD3-6).*

#### R03 — §6.1 → J-DET-53 (new row, canon)

Inventory: DETERMINISM-169. Heading of origin: `### 6.1 RNG and stream design`.

> *Chose a transparent successor (seed + 1) over deriving the next seed from the generator's stream state because seed + 1 survives any change of draw order and is readable in the link. The references derive their successor from the stream state, which is reproducible within one build (VG's Enter chain replays per build, `coverage-audit-vg.md` VN-007; MFCG's successor is its deterministic stream state) but moves whenever a build changes its draw order; MFCG's Enter also drops explicit parameters and takes size and flags from a non-seeded source — PLAT does neither.*

#### R04 — §6.2 → J-DET-49

Inventory: DETERMINISM-198. Heading of origin: `### 6.2 What a seed determines, and the model digest`.

> *Chose a separate records digest over folding the records into the model digest, because the records are what Regenerate (keep settings) and case (4) read, not content the user sees — folding them in would turn a release that only re-encodes a record into a declared output shift — and over leaving them unchecked, because a wrong stored record silently changes what a later faithful regeneration or corpus selection does, in a rebased document for good.*

#### R05 — §6.2 → J-DET-45

Inventory: DETERMINISM-207. Heading of origin: `### 6.2 What a seed determines, and the model digest`.

> *Chose to gate the keep, saves and digest reads on the off-path recomputation over holding edits until it ends, because edits waiting is what this fallback exists to avoid, while a keep or a save made on an unchecked copy is what the check exists to prevent.*

#### R06 — §6.2 → J-DET-40

Inventory: DETERMINISM-207. Heading of origin: `### 6.2 What a seed determines, and the model digest`.

> *Chose, as the fallback, an off-edit-path recomputation on a checkpoint over storing per-chunk digest nodes in the snapshot and re-hashing a chunk's leaves when an edit first touches it, because the digest tree is organised by layer and containment while chunks are organised by partition — the network layer's node alone spans every chunk that holds a way — so per-chunk nodes would require restructuring the tree by chunk, which §2.9's chunking fallback (block groups) would then change, whereas the checkpoint form changes neither the tree nor the file and still proves the working state before verification can succeed.*

#### R07 — §6.3 → J-DET-1

Inventory: DETERMINISM-214. Heading of origin: `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)`.

> *Chose lineage-hash tokens over a per-kind high-water counter because a counter depends on the order in which lazily derived districts and parallel workers mint, while a token computed from the lineage is the same whatever order districts are derived in.*

#### R08 — §6.3 → J-DET-2

Inventory: DETERMINISM-222. Heading of origin: `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)`.

> *Chose to hand only the address to a successor, and to keep the lineage only for survivors, over carrying the lineage in both cases because New random must actually re-roll its scope, while references — a name, a lock, an assignment — must follow the building the user means.*

#### R09 — §6.3 → J-DET-37 (+ J-DET-41)

Inventory: DETERMINISM-233. Heading of origin: `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)`.

> *Chose to hand the generated name on with the address over re-drawing a successor's name from its fresh lineage, because a name, like a lock, belongs to the thing the user means: re-drawing would rename a re-sited bridge or a re-cut street the user never asked to rename, while New random re-rolls geometry and names are re-rolled on request. Chose to re-draw exactly the unedited names whose recorded naming slices changed, over keeping every carried name through a naming-input edit and over re-drawing every name in the town, because choosing a street-name list or editing a naming rule must change the names that list or rule produced — otherwise the feature does nothing to the town on screen — and must leave every other name alone.*

#### R10 — §6.4 → J-DET-50 (+ J-DET-17, J-DET-35)

Inventory: DETERMINISM-271. Heading of origin: `### 6.4 Permalinks, version axes, retention and goldens`.

> *Chose to refuse such links over emitting them with the pack named by id and hash, because a link opened where the pack is missing could only fail or show another town, and the owner's rule is that a shared link never shows a different town; and chose to read the pack set rather than the base recipe, because a link that carries the log (`&l=`) replays every `adjust` in it. Chose to refuse a link for every rebased base, over an exception for a rebase whose state its recipe could regenerate, because a link has no way to name a starting state, and a replay from the seed is exactly what a rebase declares its town cannot be (VD4-8).*

#### R11 — §6.5 → J-DET-28

Inventory: DETERMINISM-304. Heading of origin: `### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10)`.

> *Chose to require byte identity of the accelerator only over requiring it of both, because the fallback engine computes different integers by construction and would otherwise be unshippable, while the property that matters — one engine, one digest on every host — holds for it through the cross-host test.*

#### R12 — §7.1 → J-DET-15

Inventory: DETERMINISM-356 (+ DETERMINISM-357, moved to §11.1). Heading of origin: `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation`.

> *Chose a view rotation over rotating model coordinates because wind, sun, aspect and slope all read model north and a vertex rotation would re-snap the whole arena; picture exports (SVG, PNG, VTT) use the view's rotation while GeoJSON keeps model coordinates and records the rotation.*

#### R13 — §7.1 → J-DET-14

Inventory: DETERMINISM-361. Heading of origin: `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation`.

> *Chose snapping to whole cells over invisible `district_bound` edges because every edge of a district's seam must be typed street, water, wall, reservation boundary (`reserve`), field, cliff or frame (II.1) for stage 2's `SeamContract` (§4.12), and an invisible line through a block would leave a seam with no street to share.*

#### R14 — §7.2 → J-DET-6

Inventory: DETERMINISM-387. Heading of origin: `### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes`.

> *Chose one ordered fold over hoisting drawn features before their stage because hoisting makes every reload regenerate a different town around them than the one the user edited.*

#### R15 — §7.2 → J-DET-24

Inventory: DETERMINISM-396. Heading of origin: `### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes`.

> *Chose `locked` as the default over letting every terrain stroke move water because the brush is mostly used to shape ground, and moving a river re-routes roads and bridges — a larger edit the user should choose knowingly.*

#### R16 — §7.3 → J-DET-29

Inventory: DETERMINISM-404. Heading of origin: `### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)`.

> *Chose a one-sided re-run attracted onto the other side's vertices over re-deriving both sides of every shared edge a scope touches, because the band on each side is a function of the shared edge alone, so the one-sided re-run reproduces it while keeping the neighbour's plots untouched, and the two-sided form stays available as the fallback.*

#### R17 — §7.3 → J-DET-24

Inventory: DETERMINISM-424. Heading of origin: `### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)`.

> *Chose exact re-basing of every entity whose samples changed over a tolerance, because the step costs microseconds per entity and a tolerance would let the model depart from §2.6's datum rule by that tolerance.*

#### R18 — §7.3 → J-DET-23

Inventory: DETERMINISM-452. Heading of origin: `### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)`.

> *Chose to re-lay every kept way through its sited deck and every crossed wall run through its water gate before the water is inserted, over digging the channel first and repairing the crossings afterwards, because a coarse insertion may meet finer geometry only where the same edit prepared it (§3.3): digging first either fails at every street the river crosses or, clearing them, removes the very crossings the kept arterials need. Chose decks at the sites `siteCrossings` picks, with the kept ways routed to them, over the carve's decks at each way's existing crossing, because a river's crossings are chosen by its narrowest reaches exactly as at generation, so a moved river's bridges stand where a regenerated river's would. Chose to have the L1 batch declare and clear the chain's whole footprint (VK3-1), over clearing only the cells whose L1 edges it changes, because a pond drawn inside a block, a bank widened into its riverside blocks or a meander moved inside one hinterland cell changes no L1 edge there, so the L0 batch would meet their kerbs, plot lines and field bounds away from any prepared vertex and every such edit would fall back to a town-wide re-derivation.*

#### R19 — §7.4 → J-DET-34

Inventory: DETERMINISM-498. Heading of origin: `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8`.

> *Chose a session per document and author, stored with an unshared document and assigned by the host for a shared one, over a session per app start, because undo must survive a reload, and a fresh session per start would leave the previous start's events undoable only through an owner's explicit `undo(h, of)`.*

#### R20 — §7.4 → J-DET-16

Inventory: DETERMINISM-513. Heading of origin: `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8`.

> *Chose undo and redo as logged events with per-session stacks and a conservative independence check over removing the last event from the log, because a host-stored log only grows and every client must fold the same events; removal survives only as the unshared-document truncation, which leaves the model digest unchanged.*

#### R21 — §7.4 → J-DET-31

Inventory: DETERMINISM-523. Heading of origin: `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8`.

> *Chose to carry point records by mean-value coordinates in their host face over leaving them at their world positions or re-placing every one by its rule, because a fountain, a shrine or a tree the user moved stands on the ground the user dragged, and re-placing would move generated furniture that the warp did not need to move; stamps stay world-anchored because they are a fill pattern, not objects.*

#### R22 — §7.5 → J-DET-18

Inventory: DETERMINISM-539. Heading of origin: `### 7.5 Migration and upgrade (G-P9)`.

> *Chose the replay under the retained version over storing the pre-upgrade model outside the undo cap, because a METROPOLIS model alone exceeds the 8 MB document budget (§2.9) while the replay reproduces it exactly from inputs the document already holds.*

#### R23 — §7.5 → J-DET-44 (first half) + J-DET-54 (second half, new row, canon)

Inventory: DETERMINISM-543. Heading of origin: `### 7.5 Migration and upgrade (G-P9)`.

> *Chose to check a rebased base under `from` and record its root under `to` in the upgrade event, over comparing a root recomputed under `to` with the one recorded under `from`, because a root is a function of the model packages that computed it — a changed field driver or leaf encoding moves it — so only roots made by the same version can be compared, and the upgrade is the one moment both versions' packages are loaded (VD4-1). Chose to copy a pack the new version stops shipping into the document at the upgrade, over keeping every published version's shipped packs in the browser library, because the upgrade is the last moment the browser is sure to hold `from`'s copy, and the document then carries what it needs wherever it is opened (VD4-9).*

#### R24 — §7.6 → J-DET-48

Inventory: DETERMINISM-556. Heading of origin: `### 7.6 The override layer and editable tables (G-P12; owner amendment 5)`.

> *Chose field slices for these rows over whole-row slices, because a culture or ancestry row names several corpora — streets, districts, people — and a whole-row slice re-draws every name drawn through the row when one list is replaced, rewriting their naming records and, where a scoped uniqueness pass resolves differently, their text, against §6.3's rule that a list change leaves every other name alone.*

#### R25 — §7.7 → J-DET-11

Inventory: DETERMINISM-574. Heading of origin: `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)`.

> *Chose the lock above the assignment because the owner's hook asks for precedence over the generator's own class rules, not over the user's locks; a host that must override a lock sends an unlock first, and the log records it.*

#### R26 — §7.8 → J-DET-27

Inventory: DETERMINISM-584. Heading of origin: `### 7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15)`.

> *Chose a smoothstep over the failing interval, then a declared discrete control, over widening ε until the control passes, because a widened ε hides the jump the user sees, while the smoothstep removes a jump that the expansion row itself makes and the discrete declaration tells the user the truth about the rest.*

### F.5 §8 rendering, §9 labels, §11 export, §12 budgets (from `docs/validation/consistency/rewrite-rendering-rationale.md`, as it stood when this file was written)

#### l.6907–6920 — RENDERING-040, RENDERING-041, RENDERING-042, RENDERING-043

```text
Chose a columnar, transferable mark table over `Mark[]` objects because a 60 000-object list costs the receiving thread
≈ 140 ms to deserialise (redteam-scale §7.3) while typed arrays transfer in constant time and slice cheaply into deltas;
chose world-aligned tile rasters over per-district rasters because district boundaries are streets (GEO-28) and a
district bitmap cannot follow continuous zoom (SCL-7). Chose the entity key's low 64 bits as the one render-time key
over the bare lineage hash, the address and the interned handle: over the lineage hash because it contains no seed, so
every town would repeat the same looks at the same derivation positions (VD2-6), while the entity key is the key every
stream of the entity is drawn from (§6.1), so the entity's render-time and model draws change together; over the
address because a New random that re-rolls a building's shape must also re-roll its look, where the address would
keep a re-rolled building's old colour; and over the interned handle because handles are session-local (NF-D10).
Chose 64 of the entity key's 128 bits because `RH32` folds 32-bit words and two words make an accidental repeat
between two entities of one town negligible (≈ 3 × 10⁻¹⁰ per 10⁵ entities, §6.1) at 8 B per mark. Chose a slot-major order with passes inside each slot over the
pass-major order ("every fill, then every casing, then every body") because pass-major drew every road casing over the
masses, fields, woods and shadows, against the slot table's own reasons (N-7), while slot-major keeps GEO-28's guarantee
through the separate casing and body slots.
```

#### l.6997–6999 — RENDERING-058

```text
and the report says so. The loop ends by construction (≤ 300 steps), where the old rule — raise the lighter role until
every pair passes — could cycle (raising `ground` for ground / building lowers road / ground) or never end (a darker
role above L* 50 against a ΔL* 50 floor). Measured on 2 000 seeded draws per family with every row of the matrix
```

#### l.7003–7005 — RENDERING-061

```text
pre-decided fallback: the L* window narrows from ± 12 to ± 8 and the run repeats. Chose a bounded repair with redraws
and a shipped-palette floor over the unbounded raise because O12 (f) asks that every presented style meet the floors
and only a bounded procedure can promise an answer.
```

#### l.7033–7039 — RENDERING-065, RENDERING-066, RENDERING-067

```text
(`field` is the highest at 17.3) (IMPROVEMENTS O12 restraint: one ink, 4–8 roles). Chose low-chroma value steps over
saturated hues for the default because the restraint clause asks for one ink and a few roles, and eight tones meet
every floor. Chose to draw walls in the ink itself and courts as `ground` at the city band over a ninth city-band tone
because the restraint clause names one ink and 4–8 roles, and at city zoom a court is enclosed by masses on every side,
where its small step from `ground` adds noise rather than information (N-25). Chose to darken `lit`'s and `hatched`'s
ink (L* 25 → 17 and 18 → 14) over lowering the outline floors because building outlines and text over masses need the
separation the `ink` family already has (N-3).
```

#### l.7188–7193 — RENDERING-104, RENDERING-105

```text
so no document holds a sheet whose order two loaders could read differently. Chose explicit passes with
most-specific-wins over one slot per semantic, because a way's casing and body must sit in different slots (N-7)
while a river's share one, and over an order fixed in code, because sheets are data (G-R2) and must say where every
casing goes. Chose to place the raised under-copy and the projected shadows as `derived` per-tile operations over
the caster marks over emitting marks of their own, because they are unions computed per tile from the casters'
geometry and heights (§8.4), so extra marks would add a row per caster to the list for no information.
```

#### l.7228–7230 — RENDERING-119

```text
otherwise; authored in M2b (≈ 1 person-week). Chose Canvas2D as `lit`'s reference backend over WebGL2 because one drawing path keeps screen, PNG
and print identical (O12 c), removes the duplicate render path both creators warned about, and every part of the lit
look has a vector or per-tile raster form inside the tile budgets; normal-mapped relief is the only loss.
```

#### l.7348–7354 — RENDERING-176, RENDERING-177

```text
  only the shadows follow the path — and the report says so. Chose quantised light steps for the lit programs over the
  1° sun because every 1° step would then re-raster the `under` and `over` layers too — a full settle per frame of an
  animated sun — while a 15° / 5° step moves each face's tone in whole steps that every tile shares, a few times per
  simulated hour; and over holding the fixed sun as the primary, because shadows that swing with the hour beside roofs
  whose light never moves contradict each other (the fallback accepts that, reported). Chose to let a light pass
  finish over latest-wins cancellation, which the shadow steps use, because a light pass is a whole settle and an
  animated sun would otherwise cancel it before it completes, leaving tiles of several light steps side by side.
```

#### l.7396–7398 — RENDERING-189

```text
frontage run ≥ 6 m (detached, compound, hovel, vacant and green frontages) and the metric is re-run. Chose the ground
tone over kerb hairlines as the primary because a kerb line doubles the linework at city zoom and fights the casing
idiom, while a value step separates street from block the way FTG's paving tone and NG's street stripe do.
```

#### l.7412–7414 — RENDERING-193

```text
the district band, where a crown is ≥ 4 px. Check: no tree mark covers a tier-1/2 casing at the city band. Chose "not
drawn" over a thin green line inside the corridor because at city zoom a corridor is ≈ 2 px, where a line fuses with the
casing and adds a ninth tone.
```

#### l.7419–7422 — RENDERING-196

```text
Proxy thumbnails (§7.8) draw S0–S4 marks in a distinct preview style and are never presented as the map. Chose no
preview over an S9 block preview because §12.5's first-map laws hold the one-second bar without one for every TOWN and
CITY request and for METROPOLIS up to ≈ 14 200 buildings, the slower first map above that is declared for the owner's
veto (§12.5) rather than hidden, and a preview's figure-ground differs from the finished picture (MFP-1 item 4).
```

#### l.7487–7490 — RENDERING-214

```text
  and `over`, through §8.4's light pass. Chose composition in the tile worker over two tile layers
  committed separately to the main thread because it halves the bitmaps committed at first paint and the main thread's
  draws per frame at the same memory (the worker keeps the base the labels are composed on), while a label change still
  never re-rasters the map.
```

#### l.7520–7522 — RENDERING-224

```text
  Chose a budget derived from the viewport over fixed per-tier numbers because the old low tier's 24 MB equalled the
  visible base and label tiles of a 1 366 × 768 view with nothing left for the fallback stop and the scratch buffers
  (N-9 b), and the mid tier's 64 MB could not hold the reference view at DPR 2.
```

#### l.7528–7531 — RENDERING-227

```text
  and at settle every ready tile is committed in the frame it arrives (§12.5). Chose settling on exact 2^¼ stops over
  re-rastering at arbitrary scales because an arbitrary-scale raster defeats the cache and the per-stop label placement;
  the settled scale is within ± 9 % of the requested one, and every settled view has exact hairlines, exact casings and
  a collision-free label set.
```

#### l.7561–7563 — RENDERING-236

```text
  glyph outlines by default, or as text in the embedded face on request (§11.1, N-13). Chose Canvas2D glyphs composed
  onto the tiles over SDF text because, once tiles are composited, text never needs to be drawn by the GPU, and one text
  path keeps text identical on every output. Measurement at M1: a tile's label composition ≤ 3 ms at ≤ 150 glyph runs;
```

#### l.7680–7683 — RENDERING-269

```text
  export step's share of a settle. Chose queries answered in the tile worker over copying the marks' kinds and vertices
  into the main thread's hit-test slices, because the slices would then carry model-sized geometry to the main thread
  (N-4, SCL-6), and over placing furniture in the generation worker, because its 24-B index has no kinds, vertices or
  placed labels.
```

#### l.7684–7695 — RENDERING-270, RENDERING-271, RENDERING-272

```text
  Chose a resumable job — `begin`, `step`, `finish` — over the synchronous `raster()` call it replaces, because a
  synchronous raster makes a query wait for the longest tile in progress and J-R40's one frame cannot be met by an
  implementation that follows it, and over splitting batched calls to bound the overrun, because a batched fill split
  in two draws anti-aliasing seams between same-role neighbours (NR3-2). Chose four fixed classes with a bounded export
  share over first-come order, because an A2 print's bands (up to ≈ 20 s, §12.7) would otherwise sit ahead of newly
  exposed tiles and every settle during the export would miss §12.5's bound, and over strict priority alone, because an
  animated view never empties class 3 and would stop an export for as long as it runs (NR3-6); chose to apply deltas
  and band answers ahead of the view's rasters, where the verifier's order put band answers after them, because
  applying one is O(changed marks) copying and every tile that waits for it is visible work. Chose to step S13b one
  decision at a time — the view's in class 3, an export's in class 4 — over running it whole as one unit, because a
  large print's placement grows with the candidates in its frame and would hold a query and the view behind it, while
  the strict order with its memo makes every unit boundary a safe stop that leaves the result unchanged (NR4-2).
```

#### l.7696–7698 — RENDERING-273

```text
  Chose a handle-and-tiles boundary over sending the document or `Mark[]` objects to the main thread because
  structured-cloning a CITY entity table costs the receiver ≈ 162 ms and a 60 000-mark object list ≈ 140 ms
  (redteam-scale §7.3) — both inside the first-frame budget — while bitmaps and typed arrays transfer in constant time.
```

#### l.7699–7702 — RENDERING-274

```text
  Chose to run every model-reading step — providers, overrides, on-demand bands, `compose()`, close-ups — where the
  model is, and to hand the tile worker display-list tables only, over a model replica in the tile worker, because a
  replica would double the CITY working set (§12.8) and have to follow every edit, while the tables cross as the same
  typed-array deltas the marks already use (N-4).
```

#### l.7765–7773 — RENDERING-292, RENDERING-293

```text
  class's band and four tiles build in ≈ 19.5 ms (measured cost model, `fixall_rendering_r5_seamstrip.out`). Chose to
  cut the band from a full tile over sampling it by Bridson restricted to the band, because a band sampled on its own
  packs points against its inner edge — measured, 4.7–5.3 points per 100 m² in the band against 2.8–3.6 in the ring
  inside it, a density stripe along every lattice line — while a cut keeps a full tile's density (3.6–4.4 in the band,
  3.6–4.4 elsewhere); the price is slightly larger holes along the band's inner edge (the largest empty circle 1.20 × r₀
  against ≤ 1.08 × r₀ elsewhere; 0.11 % of a tile's area could take one more point, against 0.04 % in an independent
  tile). Chose a band of r₀ ÷ 2 over one of r₀ because both give 0 close pairs across seams — two points outside a
  half-width band are already r₀ apart — while the narrower band repeats ≈ 12 % of a tile's points in every cell
  instead of ≈ 23 % (NR4-1).
```

#### l.7788–7793 — RENDERING-298, RENDERING-299

```text
  scale. The shared band (NR4-1) changed the construction before any asset or golden existed (goldens start at M1,
  §13.3), so it moves no recorded hash and needs no shift record. Chose a
  constant key over the seed or the document because the tiles are a library shared by every document, session and
  host — the per-town variety comes from the stamp's offset, rotation and spacing, drawn from the entity's
  `render.instances` stream, and from the seed-dependent tile variant — and a seed-keyed library would have to be
  rebuilt per document for no visible gain.
```

#### l.7809–7812 — RENDERING-305

```text
  five-engine golden run compares one, §13.3). Chose integer-centimetre world positions computed with `dmath` over
  double positions from the engine's `Math.cos` because the model-format exporters write these positions and promise
  byte-identical files, and a last-bit difference in a cosine can move a coordinate across a GeoJSON file's 7-decimal
  (≈ 1 cm) rounding; the centimetre is the model's own lattice (§3.2), so the face test is exact as well (NR4-3).
```

#### l.7855–7857 — RENDERING-316

```text
  is a batch of instance events (COV-FTG-M04). Chose to apply by ordinal only while the lineage and the position both
  hold over applying by ordinal whenever the address survives, because under §6.3 a carried successor keeps the address
  but not the lineage, so its stamp — drawn from the lineage-keyed stream — puts the same ordinal on a different tree.
```

#### l.7870–7885 — RENDERING-319, RENDERING-320, RENDERING-321, RENDERING-322, RENDERING-323

```text
Chose the stamped, ranked tile over per-entity Bridson sampling because sampling costs ≈ 12 µs per tree (a 36 ha wood
takes 170 ms; redteam-scale §7.2) while a stamp costs under 1 µs, and ranked tiles give every band a subset of the finer
band by construction. Chose bit-reversal ranks for the jittered layouts over a second blue-noise ranking of their points
because the van der Corput order is a pure function of the ordinal, so the rank is as stable as the ordinal itself
(N-10). Chose to build the tiles at build time and ship them over building them in each session because the session
build ran on the interaction path — the first zoom to the district band, under §12.5's ≤ 150 ms settle — with no
budget, in both workers, and NR-6 had already made the tiles a constant, so a build-time asset costs a bundled ≈ 31 KB
and a hash check instead (NR3-7). Chose one set of tiles per class scaled by the entity's spacing over one set per
(class, spacing) because the spacing is drawn per entity in whole centimetres, so a per-spacing library has hundreds of
members per class (≈ 19 ms each in the session, measured cost model; megabytes as an asset), while uniform scaling
keeps the blue-noise property and the ordinals and costs one multiplication per point (NR3-7). Chose four
seam-compatible variants sharing a border band over one larger toroidal tile per class (MFCG's and VG's single tile,
here 128 m at r₀) — which has no seams by construction — because a single tile repeats every instance position on a
periodic lattice, while the variants keep ≈ 88 % of each cell's points varying among four tiles at the same asset
size, for the price of one band per class and slightly larger holes along the band's inner edge; and over the
independent variants they replace, whose seams put 3.5–5 pairs of trees per 64-m seam closer than the spacing (NR4-1).
```

#### l.7935–7938 — RENDERING-336

```text
Chose "placement is view data, measured with our own font metrics" (GEO-29's options b and a together) over fitting
placement into the model because collisions change with the zoom inside a band (SCL-10), so a model placement would be
wrong between stops or recomputed per zoom anyway; and over measuring with the host's text engine because Chromium,
Gecko, WebKit and headless Node shape text differently.
```

#### l.8041–8056 — RENDERING-359, RENDERING-360, RENDERING-361, RENDERING-362, RENDERING-363

```text
Chose fixed pins at their own and finer stops and yielding candidates at coarser ones over pins fixed at every stop,
because a pixel-sized box grows in world units as the view zooms out, so a pin fixed everywhere would collide at coarse
stops with other pins and higher labels, against "0 collisions at every zoom" (N-28). Chose a pin pass at placement
time over refusing, in their dry runs, the warps, renames, rerolls and style changes that bring two pins together,
because those edits are not about labels — a warp is continuous and a rename is the user's wording — so refusing them
for a label overlap would block edits the user means, while hiding a pin is a reported view change the user can undo
by moving either pin (NR3-3). Chose the `moveLabel` order over the greedy's priority order because `moveLabel`'s guard
already makes a new pin give way to the pins already there, so the pass keeps the pin that stood first, and a stored
`seq` does not change when a later edit changes a target's priority or area; the price is a `seq` on the pinned
placement and a 4-B `pinSeq` column (NR3-3). Chose to decide rung (5) from
geometry before the greedy over letting it fall out of collisions inside the greedy, because the quarter candidate must
have a fixed place in the strict order that the local evaluation relies on, and a candidate whose existence depended on
later outcomes would break that order (N-11). Chose a resumable placement job whose unit is one decision over running
S13b whole at a stop, because a large print's placement over its whole frame — tens of thousands of candidates at a
fine band — would be one unbounded unit in the tile worker, against §8.9's rule that a query waits for at most one
step, while an explicit stack with the memo makes every unit boundary a safe stop without changing the result (NR4-2).
```

#### l.8116–8118 — RENDERING-379

```text
  the failing text / halo pairs. Chose `ground` as the one fallback over a per-family choice (`paper` in `lit`) because
  the matrix already guarantees ink / ground in every accepted palette, so the rule needs no family table, and a
  ground-toned halo over a mass reads as the block showing through.
```

#### l.8128–8130 — RENDERING-382

```text
  screen, and the check re-runs. (The old bar, ≥ min(12, number of districts), failed by construction where the cut is
  smaller than 12 — at 7 500 and 10 000 inhabitants, `docs/validation/bench/fixall_pipeline_r2_quarters.out` — and its
  "MFCG size 80 draws 17" was not the plain sweep's 12.)
```

#### l.8165–8168 — RENDERING-392

```text
  `rerollLayer('naming.emblem')`; NF-D12); off by default; drawn in the legend or a corner. Chose a minimal own
  generator plus import over import only because the legend should be able to carry an emblem with one click (MFCG
  fetches one from a third-party service), at a fraction of a person-week; chose it over a full blazon engine because
  heraldic depth is not a map-parity item.
```

#### l.8441–8444 — RENDERING-426

```text
`<name>.metric.json` giving the origin, the unit, the axes, the document id and the anchor if one is set. Chose a strict
WGS84 default with a documented default anchor over the local metric CRS with a `crs` member because the latter cannot
pass an RFC 7946 validator and would be read by GIS tools as degrees, placing the town at meaningless coordinates; the
metric file keeps the lossless path for tools that agree to it.
```

#### l.8449–8452 — RENDERING-428

```text
Chose outlines as the default over embedded text because only outlines draw the same glyphs in every consumer — an
embedded `@font-face` is honoured by browsers but not reliably by desktop editors (PLAUSIBLE; CI renders each variant
in the consumer it targets, §11.1's SVG row), and a substituted face at our per-glyph positions changes widths and can
collide — which is what "text identical on every output" (§8.9) requires.
```

#### l.8476–8483 — RENDERING-434, RENDERING-435

```text
export dialog shows the bands done out of the bands total. Chose a transient list in the generation worker over
handing SVG to the tile worker because the SVG writer also reads the document (addresses, the supersedes table, layer
and entity metadata), which the tile worker never holds (N-4), and over keeping a second full list resident because
exports are occasional and the list is rebuilt in tens of milliseconds. Chose a transient list for raster exports as
well over rastering them from the view's list, because an A2 print takes up to ≈ 20 s and longer while the view
pre-empts it (§8.9), so an edit made meanwhile would reach the view's list between two bands and tear the picture —
bands above and below the edit drawn from two model states — and because the view's list holds the finer bands only
for the districts the view has visited, while the transient list is one model state, complete for the frame (NR3-6).
```

#### l.8500–8501 — RENDERING-440

```text
so. Chose a declared extension over a sidecar as the primary because it keeps the anchor inside the one file a GIS
user moves around, and the sidecar as the fallback because it leaves the CityJSON file valid by construction.
```

#### l.8525–8527 — RENDERING-445

```text
Chose to build CityJSON over leaving it deferred (D-8) because its integer-vertex-plus-transform encoding carries our
centimetre lattice losslessly, so the exporter is a thin view (≤ 1 person-week, M3b), and it gives GIS users a standard
3-D city path that GeoJSON cannot.
```

#### l.8582–8585 — RENDERING-454

```text
true`) with its own confirmation. `cancel` drops the token. Chose confirmation by token plus fate equality over a
fire-and-forget call with a "force" flag because §7.3 requires the user to see and confirm every fate other than *kept*,
and a replay that computes different fates must report a mismatch — so the committed event must carry exactly the fates
and renames the user saw.
```

#### l.8650–8652 — RENDERING-469

```text
  the roles they name, the rest being listed in that viewer's style dialog. Chose a separate preset key over treating
  the canonical style as a last-writer-wins view key because a viewer's look must neither rewrite the shared style nor
  silently diverge from it.
```

#### l.8697–8699 — RENDERING-478

```text
* Chose host-as-store over our own sync service because the product is a standalone, backend-free library (D-4, D-21), a
  host already owns accounts and storage, and §11.3's protocol makes any host a correct store; reversing means writing a
  service that plays the host's role (low cost).
```

#### l.8700–8702 — RENDERING-479

```text
* Chose a transport-agnostic bridge plus the static VTT exports over building a Roll20 extension because an extension
  needs a Roll20 account and store publishing (outside a standalone program), and FTG's extension only relays the same
  messages that `MessagePortTransport` carries.
```

#### l.8757–8759 — RENDERING-490

```text
  generating), while re-timing takes at most 20 generations × 3 runs per rung (≤ ≈ 3.5 min at the band tops). Chose one
  timing phase over a noise rule per check because runner contention inflates every gating timing the same way — a
  five-seed p95 is in effect a maximum — so every check that compares a time with a bound is protected once.
```

#### l.8789–8789 — RENDERING-498

```text
  bar. The earlier TOWN bar at MFCG size 25 (≈ 411 buildings) is replaced by size 40.
```

#### l.8871–8874 — RENDERING-512

```text
buildings), where the single worker's law gives 351–454 ms, so the rule keeps the faster configuration. Chose to keep
the pool wherever it measures faster than a single worker, judged against its own law, over one bar at the target (the
pool's p95 ≤ 300 ms), because the law itself puts the default CITY request above 300 ms, so that bar would have
replaced the pool by the slower single worker exactly when the pool met its budget (NR3-1).
```

#### l.8885–8891 — RENDERING-515

```text
law) as a D-18 amendment, and this section's max columns are re-derived from it. Chose a max clause relative to each
generation's own law over one absolute maximum per rung because a generation's building count varies with its seed,
so only a ratio to its own law separates a slow generation from a large one. Chose confirmation by the median of three
solo re-timings over the maximum of the contended screen because one garbage-collection pause or scheduling stall of
≈ 60 ms on a ≈ 240-ms CITY generation — exactly the tail a maximum over 12 000 contended timings picks up — would
otherwise fail the gate with no change to the generator, and its fallback would then loosen the owner-facing promise
on noise; a generation that is really slow is slow three times out of three (NR3-4).
```

#### l.8923–8924 — RENDERING-530

```text
(§3.7): S9 and S11 are budgeted once, for it, and the generation report names the engine that ran (SCL-22); the earlier
"pure-JS boolean fallback at 2.5×" assumption is withdrawn with the fallback itself (integration record C-8). The
```

#### l.8928–8933 — RENDERING-532

```text
with the pool. (Round 1's integration added the S7b row and the single travel-cost field, +6 ms at CITY; round 2 moved
the gate routes and the stage-1 field into S3 (net 0), added S12a's siting, the eager shared-edge step and the pool's
arena copies (+6 ms at CITY); round 3 added step (0)'s L3 partition rebuild before the freeze (+2.3 ms at CITY, +5.8 ms
at METROPOLIS, ≈ +1 ms at TOWN; VK2-1); round 4 counted the static index partitions in the pool's copies (+2 ms at CITY,
+3 ms at METROPOLIS; TOWN's partitions add ≈ 0.3 ms; the single-worker path makes no copies; VK3-6); all PLAUSIBLE until
the fusion gate and the M0 site-and-fields spike measure them. The p95 laws of §12.3 are unchanged.)
```

#### l.9008–9009 — RENDERING-548

```text
No rung depends on WebGL2 (§8.9). Chose laws of the building count over one bar per rung because a single number held
only at each rung's target population while the ladder builds every population in the band (N-2).
```

#### l.9044–9045 — RENDERING-556

```text
  law replaces the earlier "300 edits in ≤ 1 s", which assumed checkpoints a saved document does not have. Verification
  never delays the picture or an edit: the saved model is displayed at once, editable once its own digest is recomputed
```

#### l.9054–9057 — RENDERING-559

```text
  owner's veto (the verification wait is off the path to the picture, so no mechanism changes). Chose to state the bound
  as a law of the log over saving checkpoints because a checkpoint holds the arena chunks changed since the last one,
  which would multiply the 3 MB CITY document (§2.9) for edit-heavy files, while the verification wait is already off
  the path to the picture.
```

#### l.9160–9165 — RENDERING-583

```text
at CITY across the two threads that hold any of it. The earlier "≈ 6 MB per thread that holds it" undercounted the fixed
columns — 46 B per mark, now 54 B with the render key (N-9 c; §8.1 item 5) — and assumed a full copy in both the
generation worker and the tile worker (≈ 12 MB); keeping one full copy brings the corrected display list back under that
figure. The pool's frozen arena copies (≈ 45 MB at CITY with three workers at the one-click freeze, ≈ 60 MB at a freeze
after edits; `Map`-based tables would have cost each worker more heap and ≈ 10–20 ms of rebuild, VK2-9) are new in round
2 (§3.3); while a loaded document is verified, one pool worker holds the replay's model in their place — no frozen copy
```

#### l.9245–9250 — RENDERING-599

```text
* Chose the derivation pool as the primary configuration over a single worker because after LC-2's eager allocation the
  per-district stages are pure functions of eager upstream state and their own district's sub-stream, so they run in
  parallel without shared writes; by the laws the pool keeps CITY's p95 within 300 ms up to ≈ 5 200 buildings (≈ 17 700
  people), where a single worker holds it only up to ≈ 3 770, and moves the METROPOLIS one-second knee from ≈ 11 400 to
  ≈ 14 200 buildings (§12.5). M1 and M2b keep it primary only at the sizes where it measures faster than a single
  worker, with identical digests (§12.3; NR3-1).
```
