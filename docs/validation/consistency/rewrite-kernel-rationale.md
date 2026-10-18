# §3 geometry kernel — rationale and history moved out of the normative text

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Status: COMPLETE (2026-09-26). Companion of `docs/validation/consistency/rewrite-kernel.md`. The consistency pass removes
every inline "chose … because" passage and every history clause from §3 of `docs/ARCHITECTURE.md` and leaves "(J-x)"
behind. The canon (`canon.md`, *Judgment calls*) moves the **index rows** of the Judgment-calls section verbatim to
`docs/ARCHITECTURE-RATIONALE.md`; the inline passages below are **longer** than those rows (they carry reasons, measured
figures and rejected alternatives the rows do not), so they are copied here **verbatim** from the pre-pass text
(`docs/ARCHITECTURE.md` l.2123–3352 as of 2026-09-26 06:10) for the rationale file's assembler to attach to each row —
nothing is lost. Part B keeps the history clauses the normative text dropped (the validation record under
`docs/validation/fix-all/` holds them too).

## A. Inline judgment passages (verbatim), by J id

Target: append each passage under its J row in `docs/ARCHITECTURE-RATIONALE.md` as the row's full text.

### J-11 (inventory KERNEL-064; §3.1)

*Chose to build `dmath` rather than adopt a maths package (NF-D15, NF-S8)* because D-23, J-11 and §17.4 already decided it and a port we own keeps the production closure free of a 94-package dependency; the earlier "adopt" wording in this table was stale.

### J-K36 — new row (inventory KERNEL-065; §3.1)

*Chose a pinned, registry-confirmed `robust-predicates` 3.0.3 with an in-house BigInt fallback (VK-16)* over re-verifying at adoption, because the licence is confirmed now and the checker re-runs on every upgrade, so no licence question is left open.

### J-K13 (KERNEL-095; §3.2)

*Judgment J-K13 (VK-8).* Chose a magnitude-triggered flush (at 2⁵²) derived from the range invariant over a fixed
16-term flush and over the former 1 024-term flush derived from the frame table, because it is exact for every ring
`snap` admits whatever `ladder.json` says, and ordinary faces never pay a BigInt addition at all (a fixed 16-term flush
would pay one per 16 terms on every face).

### J-K34, first clause (KERNEL-169; §3.3 index paragraph)

*Chose static-only filtering over forbidding slot reuse until the next rebuild* because the old and new occupants of a slot then live in different structures by construction and the arena stays compact.

### J-K6 (KERNEL-176; §3.3)

*Judgment J-K6 (amended for VK2-4).* Chose static partitions rebuilt at stage end (per district at L2–L4) with a
dynamic grid inside stages over a rebuild per batch commit, because per-batch rebuilds of a growing level make S10 and
S11 cost seconds (measured 1.9 s and 13.4 s at CITY), and chose query results sorted by a total canonical key per item
kind, read on the query's level-n route, over keys read on the full ring or on sub-edges, so that neither index state
nor a finer level's derivation can change a level-n output (rule 3's promise; the full-ring key reverses two L3 faces
once an L4 vertex lands on their shared edge, measured).

### J-K14 (KERNEL-177; §3.3)

*Judgment J-K14 (VK-1, as amended at integration).* Chose to keep finer content an earlier stage made, and every finer
face outside a coarse edit's clear region — an obstacle to later coarser batches, with `E_KEPT` for a violation — over
letting a coarser batch clear everything finer inside its faces and re-running the earlier stages afterwards, because a
coarse edit inside finished fabric must not erase what it does not re-derive and a wrong stage domain must fail typed
rather than erase silently; the stage rank per face costs one byte. Integration moved the wall's band parts into L1
strip faces built after S9 (J-P29, J-I9), so the one-click order produces no kept content and the rule is the safety net
and the basis of clear regions (J-I10). Round 3 confines the rule to insertion and clearing: a move keeps nothing,
because a warp is the user's explicit displacement of finished fabric and would otherwise be `E_KEPT` over every
street it touches (VK2-7).

### J-K24 (KERNEL-178; §3.3)

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

### J-K15 (KERNEL-179; §3.3)

*Judgment J-K15 (VK-6).* Chose two declared transaction forms — independent op sets in canonical order, dependent op
sequences in issue order — over one canonical order for every batch, because a recursion such as the bent cut plans each
op on the faces the previous op created, so sorting it would apply a child cut before its parent face exists, while its
issue order is already a deterministic function of the stage's inputs and streams.

### J-K16 (KERNEL-180; §3.3)

*Judgment J-K16 (VK-3).* Chose read-only transferred copies of the arena with one copy-on-write overlay per district and
a lineage-ordered merge, over a `SharedArrayBuffer` arena written in place by the workers, because shared memory makes
cross-origin isolation a requirement of every embedding page (D-4's embed target), in-place writes would need locks
whose order could leak into the output, and a district that starts from the frozen base alone is deterministic whatever
the pool size; the price is one arena copy per worker — ≤ ≈ 15 MB at CITY at the one-click freeze with the typed lookup
tables and the static index partitions, ≈ 20 MB at a freeze after edits (VK3-6) — counted in §12.8.

### J-K25 (KERNEL-181; §3.3)

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

### J-K33 (KERNEL-182; §3.3)

*Judgment J-K33 (VK3-8, kernel part).* Chose the first stage of §4.1's order as a move batch's `rederivesFrom` over the
first stage that writes its `fromLevel`, because a move clears nothing (§3.6), so the value only has to rank at or below
every face the move could reach, and a named list of first writers goes stale whenever §4.1 moves one — VK3-8's
placement of the frame lines had to be checked against such a list (the arena's outer ring is written by S1's L0 batch
and the map border by S3's L1 batch, so S3 stays the first L1 writer, §4.1), and every later move of a writer would
reopen it.

### J-K34 (KERNEL-183; §3.3)

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

### J-K2 (KERNEL-293; §3.6)

*Judgment J-K2.* Chose attraction at `minEdge` + 1 cm — existing geometry wins, an incoming vertex moves at most √2 · 26
≈ 36.8 cm (onto an edge's endpoint from beside the edge) — over a 5 cm weld plus `minEdge` rejection, because the dead
band between the two sent about one cut in ten to the failure ladder and left mandatory chains (walls, coasts, plot
lines) with no repair; the moved distance is a fraction of the narrowest way (an alley's 2 m, §4.6) and of the minimum
plot width (2.5 m), and both references snap rather than reject (FTG's "improved intersection snapping", MFCG 2017's
junction merge).

### J-K17 (KERNEL-294; §3.6)

*Judgment J-K17 (GEO-3; extended to moves for VK2-6).* Chose to move a vertex whose foot falls within `attractCm` of an
edge's endpoint onto that endpoint, and to place every new vertex on an existing edge — and every vertex a move re-seats
onto a route or slides along one — by the constrained placement rule, over plain nearest-point rounding of feet,
crossings, re-seats and slides, because two roundings can stack — a vertex left 25.3 cm from an edge by one rounding,
then a crossing or a re-seat rounded 0.7 cm towards it — and plain rounding then creates edges the hard invariant
rejects (1.34 % of edge attractions, 0.7 % of such crossings and 12.9 % of such re-seats, measured), which would make a
mandatory chain fail for a precision reason and a warp halve to a no-op; the constrained point moved by under a
centimetre for insertions and at most 4.3 cm along the route for re-seats in every measured case.

### J-K18 (KERNEL-295; §3.6)

*Judgment J-K18 (VK-7, VK2-6, VK2-7).* Chose to slide a vertex along the fixed route it lies on — an edge of level <
`fromLevel`, or one whose endpoints are held — over holding it (the whole step then halves to a no-op near every shore
junction, an editability regression against MFCG's warp) and over freeing it (it would leave the shore and move out of
the placement bound, §3.10; VK4-2), because sliding keeps the shore exact and gives the drag the user expects at quays,
bridgeheads and riverbanks; the slid vertex is seated by the placement rule for the reason of J-K17.

### J-K26 (KERNEL-296; §3.6)

*Judgment J-K26 (VK2-5).* Chose to clear the `split` flag of a moved vertex except when the move re-seats it onto, or
slides it along, the edge it split, over clearing it on every move (a re-seated Steiner vertex left with degree 2 would
never dissolve, and the next derivation would attract onto a vertex a derivation on the clean edge would not have) and
over never clearing it (a warped same-level T-junction would dissolve once its lane is removed and straighten the warped
spine), because the flag's one meaning — "dissolving me restores the edge I split exactly" — is true after a re-seat or
a slide and false after any other move — of the vertex or, for a vertex of its run's own level, of the vertex beside it
on that run (VK4-3); a prepared contact's or a stretch end's promotion clears it for the same reason, while a promotion
onto the route the vertex already lies on keeps it, because there the meaning stays true and demotion needs it (VK3-3,
J-K28).

### J-K30 (KERNEL-297; §3.6)

*Judgment J-K30 (VK3-4).* Chose to place a step's re-seats and slides one at a time in canonical order — by lattice
position before the step, each reading the vertices already placed at their placed points and the rest at their
rounded targets — over slot order, which would make the output depend on slot numbers against §3.3 (the two orders
differ in 6.8 % of close pairs, measured), and over a simultaneous solve of all moved vertices, which has no bounded
deterministic algorithm that the whole-step validation's halving does not already provide.

### J-K27 (KERNEL-298; §3.6)

*Judgment J-K27 (VK2-7).* Chose to let a move batch keep nothing and to decide what it may not displace by a held set —
every route vertex of a locked or pinned entity's geometry and of the finer faces under it, closed downwards over the
endpoints of coarser edges that carry a held Steiner vertex — over applying the kept-content rule to moves (every warp
over finished fabric would be `E_KEPT`) and over holding only role-carrying vertices (plots, blocks and buildings carry
no vertex roles, so a locked plot would be reshaped against §7.2), because the held set is exactly §7.2's promise
("keeps its existence and position") expressed on vertices, computed once per step in O(held geometry).

### J-K35 (KERNEL-299; §3.6)

*Judgment J-K35 (VK4-4).* Chose to hold a water gate's `gate_end` vertices under a warp as a deck's are, whatever their
level, over giving a generated water gate L0 bank vertices through an extra L0 batch of two shore splits before the
trace (the form S4's added deck has), because the hold alone makes both kinds behave alike under every warp — the one
place the level difference reached a user — while the extra batch would add an L0 writer to S5a and a row to §4.1's
batch table for no visible output; the difference that remains is whether the bank vertices belong to the L0 view — an
edited gate's do, as vertices the new shore was drawn through, while a generated gate's lie within the hot pixel of a
shore drawn first — which the L0 digest records and which moves no shore by more than that hot pixel.

### J-K4 (KERNEL-325; §3.7)

*Judgment J-K4.* Chose booleans and buffers on the kernel's own arrangement over adopting Clipper2 with a pure-JS
fallback, because one engine then runs identically on every host without a WebAssembly requirement (the embed target
of D-4), every boolean output obeys the same attraction, `minEdge` and clearance rules as every other chain (no re-snap
round trip), and the corridor faces nest exactly in their L1 faces; the kernel already builds the hard part (exact
insertion with snap rounding), and Clipper2 remains the speed reference, the correctness oracle and the pre-decided
fallback.

### J-K8 (KERNEL-326; §3.7)

*Judgment J-K8.* Chose a TypeScript kernel on every host, with a byte-identical WebAssembly accelerator for a measured
hot loop as the pre-decided fallback, over a WebAssembly core, because a single portable implementation satisfies the
embed target and the one-engine rule at once, and an accelerator verified byte-identical cannot change a hash; chose to
settle a small miss by a declared budget amendment unless it breaks its stage row, over accelerating every loop that
misses at all, because an accelerator is a second implementation to keep byte-identical and is worth it only where the
budget needs it.

### J-K19 (KERNEL-327; §3.7)

*Judgment J-K19 (VK-4).* Chose to compare against the oracles strictly on the cases where our engine reports that
nothing was attracted, and to bound the attracted cases by the attraction radius, over normalising the oracles' output
through our own `insertChain`, because the normalised oracle would inherit our rules and stop being independent, while
the split keeps an exact, independent check wherever exactness is promised and a proven bound wherever the design
deliberately differs.

### J-K20 (KERNEL-328; §3.7)

*Judgment J-K20 (VK-5).* Chose to set the kernel's M0 bar at S11's geometry share (≤ 3 µs per plot median) inside one
S11 row, over the former 10 µs `offsetFace` bar, because a kernel bar looser than the stage it serves could pass while
S11 missed its budget by 2×.

### J-K5 (KERNEL-346; §3.8)

*Judgment J-K5.* Chose an in-house skeleton under a stated numeric contract, exact OBB roofs for convex near-rectangles
and a validator on every output, over porting a library (none permissive and mature is assumed) and over dropping the
skeleton, because irregular footprints and holed water and wood faces need it, the validator bounds the damage of a
numerical glitch to one downgraded roof or label, and the downgrades are ready as the pre-decided fallback.

### J-K21 (KERNEL-347; §3.8)

*Judgment J-K21 (VK-10).* Chose a convexity gate on the exact OBB path over checking each ridge and hip line inside the
footprint after construction, because convexity makes "every roof line lies inside" true by a two-line argument at the
cost of one exact turn test per vertex, while a post-check would still have to decide what a notched footprint's roof
should be — which is the skeleton's job.

### J-DET-36 — addition (KERNEL-357; §3.9). The canon maps this passage to J-DET-36, whose row does not contain it (it is round 5's VK4-6 (c) endpoint-key choice); append it to J-DET-36 or give it its own row

*Chose* to keep each split keyed by its route edge's endpoints and to state the rewrite, over keying it by the split vertex's lattice point alone for the loader to find the nearest level-≤ 1 route edge, because the endpoint key needs no uniqueness argument across K4-1's drift (≈ 1.5 cm after several changes, `fixall_kernel_r5_checks.out` B), while the extra rewrites fall on partitions that border a changed coarse edge and the size bar measures them.

## B. History clauses dropped from the normative text (verbatim)

The validation record (`docs/validation/fix-all/r1–r5-*.md`, `docs/ARCHITECTURE-VALIDATION.md`) already holds each; they
are listed so the mapping table of `rewrite-kernel.md` is checkable.

### KERNEL-063 — legacy error-code map (§3.1)

The earlier codes map as follows: `E_TIMEOUT` → `E_WORK_LIMIT`; `E_SNAP_UNSTABLE` → the warning `W_SNAP_PASSES`;
`E_MIN_EDGE` → `E_BELOW_MIN_EDGE` (optional chains only); `E_COLLAPSED` and `E_COLLINEAR` → `E_DEGENERATE` with a
detail; `E_NONMANIFOLD` → prevented by the contact semantics and the simple-face invariant (§3.6, §3.10).

### KERNEL-218 — the pipeline's older op names (§3.4)

The pipeline's older names map directly: `corridorUnion` keeps its name and becomes the corridor use of `bandUnion`; `claimSubFace` may now span several faces (a reservation that crosses coarse faces, a precinct, a bailey); `retypeEdges` acts on role sets; `bufferChain` is `buffer`; `edgeChainBetween` is `resolve(ChainRef)`; `weld` no longer exists (attraction, §3.6); `refine(level)` is a stage, not a kernel op.

### KERNEL-223 (tail) — a removed argument (§3.4)

the former `ordinalOffset` argument is gone, because the kernel renumbers each entity's knots in chain order itself.

### KERNEL-366 — the five-DCEL design (§3.9)

the five-DCEL design wrote each inherited edge again at every finer level.

### KERNEL-075 — the first-written attraction rule (§3.2 (2))

the rule as first written left a sub-`minEdge` edge in 1.34 % of edge attractions (the round-1 verifier's `fixall_verify_kernel_attract_gap.out`).

### KERNEL-261 — the first-written rule and the replaced 5 cm weld (§3.6)

where the rule as first written left one in 1.34 % of edge attractions (`fixall_verify_kernel_attract_gap.out`); and the round-1 measurement of cut endpoints on Chaikin×2 spines with 7.9 m median segments, re-run from the committed script (`fixall_kernel_r1_attract_check.py` reproduces the round-1 output; `fixall_kernel_r2_attract.py` B applies the revised rule): 6.38 % attracted, displaced p50 12.9 cm and at most 26 cm, shortest resulting edge 25.6 cm — unchanged, because those endpoints lie on the spine. The replaced rule welded only within 5 cm and rejected the rest, so ≈ 5 % of endpoints and ≈ 10 % of two-ended cuts fell to the ladder (GEO-3).

### KERNEL-087 — the former fixed flush (§3.2 (6))

are exact under this rule and inexact under the former fixed 1 024-term flush, which rested on the frame table instead of the range invariant.

### KERNEL-080 — the former weld (§3.2 (2))

The earlier 5 cm weld no longer exists: coincidence is lattice-point equality and proximity is attraction (Judgment J-K2).

### KERNEL-092 — the former frame squares (§3.2 (9))

METROPOLIS 64 km² — the former 2 / 5 / 8 km squares)

### KERNEL-338 — the old near-rectangle test (§3.8)

under the old test its hip from (0, 0) to the ridge end (5, 5) passed through (1.5, 1.5), inside the notch and outside the footprint
