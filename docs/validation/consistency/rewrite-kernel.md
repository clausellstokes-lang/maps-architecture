# Consistency rewrite — KERNEL part (§3 geometry kernel)

> Fable-reviewed 2026-09-26: CORRECTED — docs/validation/consistency/validate.md

Status: COMPLETE (2026-09-26). Pipeline artifact for the Assemble and validation seats. Inputs read in full:
`docs/ARCHITECTURE.md` §3 (l.2123–3352), `inventory-kernel.md/.json` (386 items, 13 conflicts), `canon.md/.json` (Part
KERNEL: STATE, MOVE OUT, REFERENCE, RATIONALE OUT, HISTORY OUT, the 16 conflicts touching §3, the open-item routing, the
detail gaps), the section headings of every other part, `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, `docs/DEFINITION.md`,
`still-open-r5.json` rows VK5-1 – VK5-3 and their source `docs/validation/fix-all/r5-verify-kernel.md`. No decision,
mechanism, interface, number, budget, rule or test was added, dropped or changed except the three open items and the
conflict resolutions below.

## Outcome

| file | what |
|---|---|
| `docs/validation/consistency/new/kernel/01-geometry-kernel.md` | the complete new text of `## §3 Geometry kernel` (the part's only top-level section), heading line unchanged |
| `docs/validation/consistency/rewrite-kernel-rationale.md` | the 26 inline "chose … because" passages of §3 copied **verbatim** (they are longer than the Judgment-calls index rows the canon moves) and the dropped history clauses, so nothing is lost |
| `docs/validation/bench/fixall_kernel_r5_checks.py` / `.out` | VK5-3: the by-construction column (iii) dropped; output re-run and re-committed with the change stated in both |
| this file | sizes, open items, conflicts, cross-part notes, and the mapping of all 386 inventory ids |

**Sizes.** Before: 1 230 lines, 147 958 bytes. After: 978 lines, 111 379 bytes — **75 %**. Gone from §3: its 8
per-section "PENDING FABLE REVIEW" lines, all 26 inline judgment passages (≈ 30 KB), the history clauses, the §3.1
table's restatement of §3.3 and §3.6–§3.8, the §3.5 table's restated answers, and every restatement of another part's
fact (41 REFERENCE ids, 2 section restatements, 5 tests moved to §13). The kernel lands above the document-wide
55–65 % target because 309 of its 386 items are home statements and its measured figures are evidence pointers the
pass keeps; the parts that restate the kernel (§2.2 above all) shrink by pointing here. Further cuts would have removed
values or conditions, which the pass forbids.

**Headings.** Every subsection keeps its number (3.1–3.10) and every internal anchor other parts cite keeps its label:
§3.2 (1)–(9); §3.3 pool steps 1–5, clear-region rules 1–3, "the same-level-split rule" (now its own bullet, "A batch's
faces are the faces it names or creates"), the pre-decided fallback; §3.6 steps 1–5, candidates (a)–(c), placement
rule (i)–(iii), `splitFace` items 1–6; §3.7's miss rule and bars; §3.8's convex near-rectangle test (now named so). Two
titles lose round narration: §3.7 drops "(the boolean-library and WASM-kernel choices decided)", §3.8 drops "(the
port-versus-build choice decided)". §3.3's title is unchanged; its body lists all three rebuild moments (KERNEL-C12).

## Open items fixed (routed to this part)

| item | fix | where |
|---|---|---|
| **VK5-1** — a district regroup moves index items between partitions untombstoned | §3.3 "No item changes in place" adds **an item whose partition changes** — every L2–L4 vertex, route edge and face under an L1 face a batch re-owns to another district or to or from the hinterland (S6's regroup, §7.3), and a vertex on an L1 edge two partitions share when that edge's partitions change — tombstoned in its old partition, successor in the grid, so the next freeze finds both partitions dirty and rebuilds both; the tombstone definition reads "deleted, moved to another level or partition, or changed"; §3.10's freshness row reads "deleted, re-levelled, changed or moved to another partition"; §3.9's partition chunk holds "the vertices that belong to it by §3.3's rebuild rule", not "the vertices born in it" | §3.3, §3.9, §3.10; §2.9 (model) and the §13.1 fixture (scope) are routed to those parts — cross-part notes 2 and 4 |
| **VK5-2** — knot rows block the pin release; `opts.pinned` undefined | `insertChain`'s `opts.pinned` defined: chain indices exempt from decimation (§3.6 step 1), never setting the kernel pinned flag, which only `pinVertices` sets; `pinVertices` no longer restates the release rule and points to §2.2 rule 3 (b); §3.6 step 1 reads "unless its index is in `opts.pinned` or it is a knot"; `CommitRecord.unflagged` names "a pin released by §2.2 rule 3 (b)" | §3.3, §3.4, §3.6; the "other than knot rows" wording is §2.2 rule 3 (b)'s (model) and the fixture §13.1's (scope) — cross-part notes 1 and 4 |
| **VK5-3** — a "checked" figure is true by construction | the canon routes the document sentence to §2.2 (model); this part owns the script: `fixall_kernel_r5_checks.py` column (iii) "route restored" dropped (it compared `route[:j] + route[j+1:]` with `[q for q in route if q != V]`, equal by construction), the reason stated in the script header and in a printed line; re-run (15.1 s) and `fixall_kernel_r5_checks.out` re-committed. **CONFIRMED (executed):** a diff of old and new output shows columns (i) and (ii) of table A and all of table B unchanged (the dropped comparison drew no random numbers) — the 0.54–0.66 % refusal rate and the 1.232 / 1.364 / 1.487 / 1.438 cm drifts stand | bench script and output; cross-part note 1 (e) |

## Conflicts resolved

| conflict | resolution in the new text |
|---|---|
| KERNEL-C01 (= SCOPE-C05) Clipper2 ships? | stated once in §3.7: dev dependencies of `@plat/testkit`, no product bundle loads either **unless** the M0 speed fallback fires, which makes Clipper2-WASM the single engine; §3.1's row says "CI oracles, shipped only under §3.7's fallback" |
| KERNEL-C02 W_PLACED | defined once in §3.6's placement rule for both events (a non-nearest seat of a new, re-seated or sliding vertex; the endpoint fallback); §3.1's `Warning` comment points there; §3.7's unattracted test stays sound |
| KERNEL-C03 E_BELOW_MIN_EDGE | both triggers stated in §3.6 (step 4; chain classes); §3.1's comment points there |
| KERNEL-C04 mandatory-chain errors | §3.6: no precision error is left; only §3.1's non-precision codes can reject a mandatory chain (no exhaustive list) |
| KERNEL-C05 skeleton readers | one list in §3.8, by use: `roof` (plain roof), `spine` (sampled medial axis — label spines and S1's coast-simplicity clamp), `regions` (S10's per-frontage regions → reflex pre-cut partition); the M0 fallback names each reader's downgrade, so "nothing else reads skeleton output" is now true. S1 is added to the canon's list because §4.2 S1 reads "the base shape's medial axis, taken from its straight skeleton" (PLAUSIBLE that it uses `spine`; cross-part note 9) |
| KERNEL-C06 L2–L4 partitions | stated once in §3.3 (per district + one outside districts); §3.1 points to §3.3 |
| KERNEL-C07 minFaceAngle class | §3.2 (2) gives the value only and points to §3.10 (soft for mandatory chains, hard for optional) |
| KERNEL-C08 class floors | §3.2 (2): face-size floors are a width and an area, angle floors are angles, none is `minEdge`; §3.10 points to §3.2 (2) |
| KERNEL-C09 kept geometry near a route | §3.3's exception points to §3.6 candidate (b): a finer vertex on a route the chain "ends on or joins" |
| KERNEL-C10 quad gable ridge | §3.8: on the exact path a gable ridge lies on the wing's `ridgeAxis` line (§2.6: rect — the OBB axis parallel to the side it names; quad — the line joining the arc-length midpoints of the two named side chains) and ends where it meets the footprint's boundary, which for a quad is the stored ridge |
| KERNEL-C11 constant name | `attractCm` everywhere |
| KERNEL-C12 rebuild moments | §3.3 "Static partitions are rebuilt at three moments, never per batch": stage end, edit-session overflow (max(256, ¼ static size)), every pool freeze |
| KERNEL-C13 Delaunay uses | "the routing lattice" removed from §3.1's Delaunay row (S4's lattice is `hexLattice`, §3.4) |
| CANON-C04 E_ENGINE_UNAVAILABLE | §3.7 names it as "§11.2's `E_ENGINE_UNAVAILABLE`"; `KernelError` unchanged |
| MODEL-C01 split flag under moves | stated once in §3.6 ("The `split` flag under moves") in rule 3 (b)/(b′) wording, with its two consequences (a re-seated Steiner vertex dissolves at the next `clearFiner`; a warped same-level T-junction stays a shape vertex) |
| MODEL-C02 near-rectangle test | §3.8 canonical, unchanged in substance, now named "the convex near-rectangle test" for §2.6 to cite |
| CANON-C02, CANON-C03 | §3.2 (5) and §3.2 (9) canonical; §3.2 (9) calls the frames "squares of 2, 5 and 8 km at the default aspect" |
| SCOPE-C09 | no change (§3.2 (2)'s 2.5 m floor and O5 (b)'s 3 m bar are two facts) |

Also reconciled inside the part (one fact, two wordings): the `E_SCOPE` comment and §3.10's pool-scope row now say
"outside its district's **scope**" (pool step 3's rule, which includes the boundary-split allowance) instead of "face
set". Unions under canon rule R13 (a restatement's detail the home lacked): KERNEL-020 gains "one promotion in ten",
≈ 1.36 cm after two and ≈ 1.49 cm after three or four changes (MODEL-067); KERNEL-118 gains "whose 0 and 1 name an open
trace's ends" (MODEL-126); KERNEL-143 gains "≈ 0.5 MB of it home column" after edits (MODEL-136); KERNEL-320 gains the
list of stages the Clipper2 shift records name (DETERMINISM-303). The other detail gaps listed for kernel homes
(KERNEL-311, -162, -353, -147, -288) carry no missing kernel fact (section numbers; a hash width that is §2.9's;
"≤ 8 halvings" already present).

## Cross-part notes (other parts' canonical text; not edited here)

1. **model §2.2** — (a) `LatticeSpec` comment: drop "soft" (KERNEL-C07); the values are §3.2 (2)'s. (b) `Plat.vertices.flags`
   comment and rule 3 (b)/(b′): the clearing-under-moves wording becomes a pointer to §3.6 "The `split` flag under
   moves" (MODEL-C01); the pin release reads "strips its last vertex role row **other than knot rows**" (VK5-2), and the
   pin is set only by `pinVertices` (§3.4). (c) `LevelIndex.tombstones` comment: "deleted, moved to another level **or
   partition**, or changed" (VK5-1). (d) Rule 3's drift figures and placement-bound sentence (MODEL-067/068) now live in
   §3.6 and §3.10 — point there. (e) VK5-3: the "100 000 of 100 000 for each of one to four later same-level vertices"
   clause must go — column (iii) no longer exists in `fixall_kernel_r5_checks.out` A; column (i)'s 0.54–0.66 % refusal
   figures are unchanged and may still be cited. (f) *Size*: the pool-copy figures are §3.3 pool step 1's (MODEL-136).
2. **model §2.9** — chunks: each partition chunk holds "the vertices that belong to it by §3.3's rebuild rule" (VK5-1,
   canon routing); the block-group fallback (MODEL-422) and load steps 2–3 (MODEL-387) stay §2.9's; §3.9 points to them.
3. **model §2.6** — cite "§3.8's convex near-rectangle test" in the row-footprint paragraph and wing rule 3 (MODEL-C02).
   §3.8's gable ridge on the `ridgeAxis` line agrees with §2.6's stored ridge for quads (KERNEL-C10).
4. **scope §13.1 / §13.2** — MOVE IN: KERNEL-129 (§13.2), KERNEL-131, -282, -343, -363 (§13.1); §3 points there. Add the
   VK5-1 fixture (a `drawBoundary` moves a kept block from district A to B, B's partitions rebuilt before A's — every L3
   query over the block returns each plot once, before and after A's rebuild) and the VK5-2 fixture (a deck whose bank
   vertex also carries a width knot, removed by F-REDERIVE — the vertex ends unpinned, its knot kept). §13.1's B-FUZZ
   line should also carry "the harness reports both shares per operation" (KERNEL-315) if absent.
5. **scope, `docs/ARCHITECTURE-RATIONALE.md`** — attach the verbatim passages of `rewrite-kernel-rationale.md` §A to J-11,
   J-K2, J-K4 – J-K6, J-K8, J-K13 – J-K21, J-K24 – J-K27, J-K30, J-K33 – J-K35; add the new row **J-K36** (robust-predicates
   3.0.3 pinned, BigInt fallback; the canon's new id). The KERNEL-357 passage (split key = the route edge's endpoints,
   VK4-6 (c)) is **not** in J-DET-36's row although the canon maps it there — append it to J-DET-36 or give it its own
   row. J-K6's row should say "per district plus one outside districts" and "rebuilt at stage end, on edit overflow and
   at every freeze" (KERNEL-C06, C12); J-K34's row may add "or an item moved to another partition" (VK5-1).
6. **scope §13.3** — the nightly cross-platform run lists "pool sizes 0 and 3" (SCOPE-240) where §3.2 (4) used to say
   "0–3". §3 now points to §13.3, so §3 no longer disagrees, but §3.3 pool step 5 claims identical digests for sizes 0–3
   by construction and §6.5 / §13.2's pool-size test confirms it: scope may want §13.3 to say which sizes the nightly run
   samples.
7. **rendering §12.4** — the S9 row should carry the M0 bar §3.7 used to state, "one district ≤ 3 ms" (KERNEL-318 detail
   gap; the 25 ms is there); S11's geometry share (≤ 3 µs median, 25 µs compound) and S8's ≈ 12 µs per cut are there.
   §12.6's 5 ms plot-edit budget covers the ≈ 0.5 ms index rebuild §3.3 cites.
8. **determinism §6.5 (7), (10), §7.3** — §6.5 (10) and DETERMINISM-303 point to §3.7 for the Clipper2 fallback
   (KERNEL-C01, canon); r5-verify-kernel names an optional one-clause companion for VK5-1 in §7.3's S6 row (a regroup
   re-owns L1 faces, whose L2–L4 items change partition and are tombstoned, §3.3).
9. **pipeline §4.2 S1** — the coast-simplicity clamp reads "the base shape's medial axis, taken from its straight
   skeleton"; §3.8 now lists it as a `spine` reader with the sampled-medial-axis downgrade. PLAUSIBLE: confirm §4.2 uses
   `skeleton(rings, 'spine')` and takes that downgrade (no downgrade is stated there today).
10. **pipeline §4.1** — static-partition rebuild triggers: point to §3.3's three moments (KERNEL-C12, canon).
11. **scope §1.7, §14 @plat/testkit, §16, §17.4, D-14** — Clipper2's shipping status: point to §3.7 (KERNEL-C01, canon).
12. **§5.4** — the `kernel.engine` comment `'plat-arrangement@<version>', §3.7` stays valid (§3.7 defines the engine; the
    report schema holds its name); no change needed.

## CONFIRMED vs PLAUSIBLE

CONFIRMED (executed): all 386 inventory ids are mapped exactly once below and each mapping's kind matches the canon's
action for that id (script: 0 missing, 0 extra, 0 mismatches); every numeric value of every kernel home item appears in
the new text except the history figures moved to the rationale file (script); VK5-3's re-run leaves columns (i)–(ii)
and table B unchanged (diff). PLAUSIBLE (reading only): that no meaning shifted in the compressed prose (one full
read-through against the old text, no second reader); S1 as a `spine` reader (note 9).

## Mapping table — every inventory id of this part

"state" = homed in §3; "state (restatement)" = homed in another part, now a reference; "rationale" / "move-in" /
"drop-history" / "reference-section" as in the canon.

| id | kind | item (short) | canon action | where it lives now |
|---|---|---|---|---|
| KERNEL-001 | rule | The kernel never throws for a geometric reason: every primitive returns a typed result … | state | §3 intro (plain words) + §3.1 typed results |
| KERNEL-002 | rule | Every stage of generation changes geometry only through batch transactions that are … | state | §3 intro; §3.3 intro paragraph |
| KERNEL-003 | decision | Build-versus-adopt table: lattice, snapping and attraction are built in-house. | state | §3.1 table, lattice row |
| KERNEL-004 | rule | Every coordinate passes snap(), with a finite-and-range check in every build (not only … | state | §3.2 (7) |
| KERNEL-005 | number | attractCm, the attraction radius. | state | §3.2 (2) value (name `attractCm`, KERNEL-C11) |
| KERNEL-006 | rule | Attraction: a new vertex within attractCm of an existing vertex lands on it; within … | state | §3.6 step 2 (merged with KERNEL-248) |
| KERNEL-007 | rule | A new chain running within attractCm of an existing edge shares that stretch with … | state | §3.6 step 3 (merged with KERNEL-251) |
| KERNEL-008 | rule | Placement rule: every new vertex on an existing edge (a split foot, a stretch's join … | state | §3.6 placement rule (merged with KERNEL-255) |
| KERNEL-009 | mechanism | Crossings are resolved by iterated snap rounding on the 1 cm lattice, at most 3 … | state | §3.6 step 4 (merged with KERNEL-252) |
| KERNEL-010 | rule | There is no separate weld tolerance: coincidence is lattice-point equality; proximity … | state | §3.2 (2) last sentence (merged with KERNEL-080) |
| KERNEL-011 | decision | Exact predicates: orient2d is built (exact in doubles under the §3.2 coordinate … | state | §3.1 table, exact-predicates row (J-K36 tag) |
| KERNEL-012 | rule | Collinear and cocircular ties are broken deterministically on lattice positions, never … | state | §3.2 (3) |
| KERNEL-013 | rule | incircle is never on the topology path. | state | §3.1 table, exact-predicates row (merged with KERNEL-070) |
| KERNEL-014 | rule | Ring orientation is decided by orient2d at the lowest-leftmost vertex; areas are exact … | state | §3.2 (6) (merged with KERNEL-088) |
| KERNEL-015 | decision | Planar subdivision is built in-house as the core asset, struct-of-arrays with … | state | §3.1 table, planar-subdivision row |
| KERNEL-016 | defined-term | Planar subdivision shape: one indexed arena per layer with level-tagged edges, … | reference-section (section-restatement) | referenced to §2.2 (section restatement; the §3.1 row names §2.2) |
| KERNEL-017 | rule | Every insertion is part of a batch transaction. | state | §3.3 intro paragraph |
| KERNEL-018 | rule | Self-touching chains are split into simple runs and inserted run by run. | state | §3.6 step 1 |
| KERNEL-019 | rule | A face below its class floor is absorbed across a partition edge or kept as typed … | state | §3.6 slivers (merged with KERNEL-268) |
| KERNEL-020 | rule | Placement bound: every vertex placed, re-seated or slid onto a coarser edge lies … | state | §3.10 placement-bound row (the invariant) + §3.6 paragraph after the placement rule (later drift; union with MODEL-067: ≈ 1.36 / 1.49 cm) |
| KERNEL-021 | rule | Finer content an earlier stage made is kept, never cleared by a coarser batch. | state | §3.3 kept content (merged with KERNEL-105) |
| KERNEL-022 | rule | Promotion: a finer vertex a coarser chain lands on is promoted, never duplicated; a … | state (restatement) | referenced to §2.2 rule 3 (promotion, MODEL-069); the kernel's attraction use stays in §3.6 candidates (b)–(c) |
| KERNEL-023 | rule | Re-levelling on removal: an edge takes the lowest level among its remaining rows; a … | state (restatement) | referenced to §2.2 rule 3 (demotion, MODEL-076); §3.4 removeEdges points there |
| KERNEL-024 | interface | Part of a chain is addressed by a StretchRef. | state (restatement) | referenced to §2.2 rule 5 / types (MODEL-040); op semantics in §3.4 Stretches |
| KERNEL-025 | decision | Polygon booleans are built on the kernel's arrangement (J-K4): overlay operands in a … | state | §3.7 Decision (merged with KERNEL-300/301) |
| KERNEL-026 | decision | Clipper2 (BSL-1.0, compiled to WASM, run in Node) and polygon-clipping (MIT) are CI … | state | §3.1 table, booleans row (licences) + §3.7 oracles (shipping status, KERNEL-C01) |
| KERNEL-027 | rule | Booleans take and return integer coordinates under the same attraction, placement, … | state | §3.7 Decision (integer coordinates, fill rule per call, empty → E_DEGENERATE `empty`) + §3.7 oracles (split by attraction) |
| KERNEL-028 | mechanism | Buffers, offsets, insets and bands are built on the arrangement: a buffer is the union … | state | §3.7 Decision (merged with KERNEL-302) |
| KERNEL-029 | rule | The half-plane inset is used only for a uniform inset of a face whose convexity is … | state | §3.7 kerb paragraph (`insetRing`: convexity checked exactly, E_NON_CONVEX, collapsed → E_DEGENERATE with last non-empty distance) |
| KERNEL-030 | decision | Straight skeleton is built (J-K5): a wavefront with an event queue in doubles using + … | state | §3.8 numeric contract + convex near-rectangles (merged with KERNEL-329, 332–335) |
| KERNEL-031 | rule | Straight-skeleton uses: roofs of irregular footprints and label spines (the … | state | §3.8 readers and their downgrades (KERNEL-C05); spine definition referenced to §9.3 |
| KERNEL-032 | decision | No permissive, mature JS/TS straight-skeleton library is assumed; CGAL (GPL/LGPL) is … | state | §3.1 table, straight-skeleton row |
| KERNEL-033 | rule | Skeleton input is pre-cleaned (collinear merge, minimum angle 5°); holes supported; a … | state | §3.8 numeric contract (pre-clean, holes) + validator/downgrades (merged with KERNEL-342) |
| KERNEL-034 | decision | OBB, convex hull and largest inscribed rectangle are built: monotone chain + rotating … | state | §3.1 table, OBB row |
| KERNEL-035 | rule | GEO-7 contract: OBB / hull / LIR with fewer than 3 distinct points or a collinear hull … | state | §3.1 table, OBB row (GEO-7 contract) |
| KERNEL-036 | decision | Delaunay / Voronoi adopted: delaunator (ISC), d3-delaunay (ISC); duplicate points … | state | §3.1 table, Delaunay row (routing lattice removed, KERNEL-C13) |
| KERNEL-037 | decision | Poisson-disc / blue noise built: Bridson with k = 50 candidates, all evaluated (the … | state | §3.1 table, Poisson row |
| KERNEL-038 | mechanism | Blue-noise tiles are built at product build time (plat/tools/stamptiles/), once per … | state (restatement) | referenced to §8.10 (RENDERING-284) |
| KERNEL-039 | mechanism | Per-instance placement is the §8.10 stamp: the tile with a per-entity offset, rotation … | state (restatement) | referenced to §8.1 (2), §8.10 (RENDERING-022) |
| KERNEL-040 | budget | Stamp placement cost per instance. | state (restatement) | referenced to §12.7 (RENDERING-564) |
| KERNEL-041 | rule | Poisson/stamp domains are clipped to any polygon with holes; empty domains return … | state | §3.1 table, Poisson row |
| KERNEL-042 | decision | Noise: simplex-noise (MIT) adopted with our seeding; fBm and domain warp built; seeded … | state | §3.1 table, noise row |
| KERNEL-043 | decision | Curves built: Chaikin, centripetal Catmull-Rom → cubic, pinned-vertex Laplacian, … | state | §3.1 table, curves row |
| KERNEL-044 | rule | Smoothing never moves pinned vertices (gates, junctions, portals). | state | §3.4 `pinVertices` comment (+ §3.6 held-vertices bullet names gates, junctions, portals) |
| KERNEL-045 | rule | Whole-step validation: a smoothing or warp step is validated as a whole step — edges … | state | §3.6 whole-step validation (merged with KERNEL-288) |
| KERNEL-046 | rule | Visvalingam–Whyatt is topology-preserving: a removal is refused when the new edge … | state | §3.4 `simplify` comment (merged with KERNEL-213) |
| KERNEL-047 | rule | Fillets are skipped when legs are shorter than the chord; curve results re-enter … | state | §3.1 table, curves row |
| KERNEL-048 | decision | Spatial index: flatbush (ISC) static partitions per level — one per arena at L0–L1, … | state | §3.1 table, spatial-index row (decision) + §3.3 spatial indexes (partitions, KERNEL-C06) and rebuild moments (KERNEL-C12) |
| KERNEL-049 | rule | S10's eager step (0) ends before the pool's freeze and rebuilds the L3 partitions it … | state | §3.3 pool step 1 (merged with KERNEL-137) |
| KERNEL-050 | rule | Each level's index holds that level's items — vertices, whole route edges boxed over … | state | §3.3 what each level's index holds (merged with KERNEL-158/161) |
| KERNEL-051 | rule | Tombstoning: every item a batch deletes, re-levels or changes (a promotion or demotion … | state | §3.3 no item changes in place + tombstones and rebuilds (merged with KERNEL-162/166) |
| KERNEL-052 | rule | Every freeze first rebuilds the partitions edits left dirty (§3.3 step 1). | state | §3.3 pool step 1 + rebuild moment (3) (merged with KERNEL-138) |
| KERNEL-053 | rule | Query order: a level-n query returns level-n items sorted by their canonical key on … | state | §3.3 queries (merged with KERNEL-164) |
| KERNEL-054 | decision | Marching squares / distance transform: d3-contour (ISC) or our own; linear time; VG's … | state | §3.1 table, marching-squares row |
| KERNEL-055 | decision | Path search built: binary-heap A* / Dijkstra on rasters and on the subdivision graph … | state | §3.1 table, path-search row |
| KERNEL-056 | decision | Triangulation for render and fields adopted: earcut (ISC); holes supported; degenerate … | state | §3.1 table, triangulation row |
| KERNEL-057 | decision | Deterministic math: dmath is built — our own TypeScript port of the fdlibm 5.3 … | state (restatement) | referenced to §6.5 (2) (DETERMINISM-280); §3.1 dmath row keeps the build decision with (J-11) |
| KERNEL-058 | rule | Math.sqrt is IEEE-exact and allowed; every other transcendental goes through dmath … | state (restatement) | referenced to §6.5 (2); the `ratio()` rule stays in §3.2 (8) |
| KERNEL-059 | decision | RNG and hashing are built: xoshiro128** streams seeded from a 128-bit key hash. | state (restatement) | referenced to §6.1 (DETERMINISM-135); §3.1 RNG row |
| KERNEL-060 | type | KernelResult<T> = { ok: true; value; warnings: Warning[] } \| { ok: false; code: … | state | §3.1 `KernelResult` |
| KERNEL-061 | type | KernelError codes and meanings: E_OUT_OF_RANGE (snap: non-finite or \|coordinate\| ≥ … | state | §3.1 `KernelError` (E_BELOW_MIN_EDGE triggers point to §3.6, KERNEL-C03) |
| KERNEL-062 | type | Warning = { code; count; at?: LatticePoint } with codes W_ATTRACTED, W_STRETCH_SHARED, … | state | §3.1 `Warning` (W_PLACED defined in §3.6, KERNEL-C02) |
| KERNEL-063 | history | Legacy error-code mapping: E_TIMEOUT → E_WORK_LIMIT; E_SNAP_UNSTABLE → warning … | drop-history | dropped from the normative text (history) → rewrite-kernel-rationale.md §B |
| KERNEL-064 | decision | Judgment note: chose to build dmath rather than adopt a maths package (NF-D15, NF-S8) … | rationale (rationale-copy) | rationale J-11 → rewrite-kernel-rationale.md §A (tag (J-11) left in §3.1) |
| KERNEL-065 | decision | Judgment note (VK-16): chose a pinned, registry-confirmed robust-predicates 3.0.3 with … | rationale-new | rationale J-K36 (new row) → rewrite-kernel-rationale.md §A (tag left in §3.1) |
| KERNEL-066 | interface | Frame { widthCm, heightCm, aspect (width ÷ height, 0.5–2), marginShare = 0.3 (context … | state | §3.2 `Frame` interface |
| KERNEL-067 | rule | Integer world: all persisted geometry is integer cm; intermediate rational points … | state | §3.2 (1) |
| KERNEL-068 | number | Range derivation: METROPOLIS target at aspect 2 is 11.31 km × 5.66 km plus the 30 % … | state | §3.2 (1) |
| KERNEL-069 | rule | Range invariant: \|x\|, \|y\| < 2^23 cm (83.9 km); hence every coordinate difference < … | state | §3.2 (1) |
| KERNEL-070 | rule | incircle uses the adaptive predicate and is kept off the topology path. | state | §3.1 table, exact-predicates row (merged with KERNEL-013) |
| KERNEL-071 | rule | Tolerances are world lengths, never parameter-space (the reference's DELTA = 1e-6 on … | state | §3.2 (2) |
| KERNEL-072 | number | minEdge — the minimum edge length for every writer. | state | §3.2 (2) |
| KERNEL-073 | number | attractCm = minEdge + lattice slack, so a vertex split onto an edge is placed at least … | state | §3.2 (2) (name `attractCm`, KERNEL-C11) |
| KERNEL-074 | number | Maximum displacement of an incoming vertex by attraction: √2 · attractCm ≈ 36.8 cm … | state | §3.6 existing geometry wins (merged with KERNEL-250/259) |
| KERNEL-075 | evidence | Attraction bench evidence (fixall_kernel_r2_attract.out): over 400 000 vertices … | state | §3.6 existing geometry wins, measurement (merged with KERNEL-261); first-written-rule clause → rewrite-kernel-rationale.md §B |
| KERNEL-076 | number | minFaceAngle — the kernel's soft corner floor. | state | §3.2 (2) value only; its class stated in §3.10 (KERNEL-C07) |
| KERNEL-077 | number | Class floors from the tables: minPlotWidth = 2.5 m; minInteriorAnglePlot = 12° (FTG's … | state | §3.2 (2) |
| KERNEL-078 | rule | One minimum-edge rule for every writer (GEO-35): insertChain, booleans, buffers, … | state | §3.2 (2) |
| KERNEL-079 | rule | Face-size floors are always a minimum width and a minimum area, never minEdge. | state | §3.2 (2) (KERNEL-C08 wording) |
| KERNEL-080 | decision | No weld tolerance (J-K2): the earlier 5 cm weld no longer exists; coincidence is … | state | §3.2 (2) last sentence; the 'former 5 cm weld' clause → rewrite-kernel-rationale.md §B |
| KERNEL-081 | rule | No float comparisons for topology: equality is index equality; 'same place' is a … | state | §3.2 (3) |
| KERNEL-082 | rule | A distance comparison against attractCm or minEdge on a computed point (an exact foot, … | state | §3.2 (3) |
| KERNEL-083 | rule | Cross-platform reproducibility: integer geometry + dmath + integer-derived random … | reference-section (section-restatement) | referenced to §6.5 (section restatement); §3.2 (4) keeps the kernel's part |
| KERNEL-084 | test | Nightly cross-platform golden run is the reproducibility proof: Node x86 / arm, … | state (restatement) | referenced to §13.3 (SCOPE-240) |
| KERNEL-085 | rule | Angles and directions are unit vectors in doubles derived from integer endpoints; … | state | §3.2 (5) |
| KERNEL-086 | mechanism | Exact area (GEO-32, VK-8, J-K13): area2(ring) returns twice the signed area as an … | state | §3.2 (6) |
| KERNEL-087 | evidence | area2 evidence (fixall_kernel_r2_attract.out E): three star rings of radius 2^23 − 2 … | state | §3.2 (6) receipt; the former-flush clause → rewrite-kernel-rationale.md §B |
| KERNEL-088 | rule | Ring orientation is orient2d at the ring's lowest-leftmost vertex; no orientation, … | state | §3.2 (6) |
| KERNEL-089 | rule | snap(x, y) is the only door by which a number becomes an arena coordinate; in every … | state | §3.2 (7) |
| KERNEL-090 | rule | Height and depth rasters have their own clamp-and-report check. | state (restatement) | referenced to §2.3 (MODEL-168); pointer in §3.2 (7) |
| KERNEL-091 | interface | Checked ratios: in model packages a division by a computed value goes through … | state | §3.2 (8) |
| KERNEL-092 | rule | Frames are rectangles (COV-VG-VN-156): a rung declares a frame area A (TOWN 4 km², … | state | §3.2 (9) (CANON-C03: 'squares at the default aspect') |
| KERNEL-093 | rule | The range bound of (1) is derived from the largest frame at the extreme aspect, so a … | state | §3.2 (9) |
| KERNEL-094 | rule | The arena's outer ring is an L0 chain carrying the role margin and the frame rectangle … | state (restatement) | referenced to §2.2 rule 1 (MODEL-046); pointer in §3.2 (9) |
| KERNEL-095 | decision | J-K13 (VK-8): chose a magnitude-triggered flush at 2^52 derived from the range … | rationale (rationale-copy) | rationale J-K13 → rewrite-kernel-rationale.md §A (tag left in §3.2 (6)) |
| KERNEL-096 | interface | KernelTx { key: PlatKey; level: Level; ops: KernelOp[] (declared form only — … | state | §3.3 `KernelTx` |
| KERNEL-097 | rule | rederivesFrom is the earliest stage a batch re-derives: equal to stage in generation; … | state | §3.3 `KernelTx.rederivesFrom` comment |
| KERNEL-098 | rule | KernelTx.clearRegion is carried by a coarse batch inserted into finished fabric and … | state | §3.3 `KernelTx.clearRegion` / `prepared` comments + clear regions |
| KERNEL-099 | rule | KernelTx.workLimit is an operation count taken from the stage's declaration. | state | §3.3 `KernelTx.workLimit` comment |
| KERNEL-100 | type | BatchScope = { kind: 'stage'; stage } \| { kind: 'district'; id } \| { kind: 'block'; … | state | §3.3 `BatchScope` |
| KERNEL-101 | interface | CommitRecord (returned by every commit; kernel-internal slots, never persisted): … | state | §3.3 `CommitRecord` (unflagged: pin released by §2.2 rule 3 (b), VK5-2) |
| KERNEL-102 | mechanism | Transaction execution: a batch is one growth stage, one district's infill, one block's … | state | §3.3 intro paragraph |
| KERNEL-103 | rule | One level per transaction: a batch creates vertices, edges, owners and roles of its … | state | §3.3 one level per transaction |
| KERNEL-104 | rule | A lane a finer stage would add to a coarser level is a separate, coarser transaction … | state | §3.3 one level per transaction |
| KERNEL-105 | rule | Kept content (VK-1, J-K14): every face records the rank of the stage whose batch … | state | §3.3 kept content (exception points to §3.6 candidate (b), 'ends on or joins', KERNEL-C09) |
| KERNEL-106 | rule | E_KEPT governs insertion and clearing only (VK2-7 (a)); a warp or smoothing batch … | state | §3.6 moves ('a move batch keeps nothing'; merged with KERNEL-276) + §3.6 after-step paragraph (merged with KERNEL-291); §3.3 kept content points there |
| KERNEL-107 | rule | The re-walk re-parents each kept face into the new face that contains it; a kept face … | state | §3.3 kept content |
| KERNEL-108 | rule | In generation E_KEPT cannot arise on a correct pipeline: a wall's band, setback and … | state | §3.3 kept content |
| KERNEL-109 | acceptance-bar | 0 E_KEPT on the one-click path (stage property tests). | state (restatement) | referenced to §13.2 (SCOPE-185) |
| KERNEL-110 | rule | In an edit, E_KEPT returns to the dry run as a conflict whose offered resolution is to … | state (restatement) | referenced to §7.1 dry run (DETERMINISM-377) |
| KERNEL-111 | rule | A re-derivation whose scope holds wall-strip faces, or faces bordering the settlement … | state (restatement) | referenced to §7.3 item 2 (DETERMINISM-402) |
| KERNEL-112 | rule | A batch's faces are the faces it names or creates (K4, VK2-11): a same-level split of … | state | §3.3 'a batch's faces are the faces it names or creates' |
| KERNEL-113 | rule | clearFiner never removes kept content and never reports it as a conflict; only locked … | state | §3.3 kept content |
| KERNEL-114 | mechanism | Local coarse insertion (NF-P14, NF-P4, LC-7, VK2-3; J-I10, J-I12, J-I13, J-K24): a … | state | §3.3 clear regions and prepared contacts |
| KERNEL-115 | rule | The clear region is the edit's footprint, computed by the operator in its dry run: its … | state | §3.3 clear regions and prepared contacts |
| KERNEL-116 | rule | Clear-region rule 1 (Clearing): clearFiner in a batch that declares a clear region … | state | §3.3 clear-region rule 1 |
| KERNEL-117 | rule | Clear-region rule 2 (Preparation): one or more finer-level batches issued first in the … | state | §3.3 clear-region rule 2 |
| KERNEL-118 | rule | A contact name is placed by splitThrough with its row given without an ordinal; the … | state | §3.3 clear-region rule 2 (union with MODEL-126: 0 and 1 of an enceinte name an open trace's ends); §3.4 `splitThrough` points here |
| KERNEL-119 | rule | A coarse chain never shares a finer edge, so a finer edge the new water would run … | state | §3.3 clear-region rule 2 |
| KERNEL-120 | rule | Every stretch the preparation removes (a cut stretch, a pruned remainder, a kept way's … | state | §3.3 clear-region rule 2 |
| KERNEL-121 | rule | Clear-region rule 3 (Contact): the coarse batch splits the finer faces meeting the … | state | §3.3 clear-region rule 3 (the promotion's effects stated once in §3.6 candidate (c)) |
| KERNEL-122 | rule | The re-derivation after a carve runs on the footprint's cells (§4.11 step 4, §7.3 (b) … | state (restatement) | referenced to §4.11 step 4 / §7.3 (b) 8 (PIPELINE-344); one pointer clause in rule 3 |
| KERNEL-123 | test | M3a carve fixtures (§13.1, §13.2): a canal across a CITY district; a canal across a … | state (restatement) | referenced to §13.1–§13.2 (SCOPE-125) |
| KERNEL-124 | decision | Pre-decided fallback if an M3a fixture cannot be met: the batch clears the finer … | state | §3.3 clear regions, pre-decided fallback |
| KERNEL-125 | rule | Two op forms (GEO-11, VK-6, J-K15): a transaction takes exactly one of two forms … | state | §3.3 two op forms |
| KERNEL-126 | rule | Declared form: KernelTx.ops lists independent ops, none reading another's result (S3's … | state | §3.3 two op forms |
| KERNEL-127 | test | Op-permutation property test: each declared fixture batch's ops are permuted and the … | state (restatement) | referenced to §13.1 (SCOPE-156) |
| KERNEL-128 | rule | Callback form: tx(tx, fn) hands fn the open overlay; each op applies at once, in issue … | state | §3.3 two op forms, callback |
| KERNEL-129 | test | Callback-form test is issue-order determinism: the stage run twice, on a … | move-in (moved-from) | moved to §13.2 (scope MOVE IN); pointer '(the issue-order test: §13.2)' in §3.3 |
| KERNEL-130 | rule | No output depends on slot numbers: every kernel tie-break uses lattice positions (y, … | state | §3.3 no output depends on slot numbers |
| KERNEL-131 | test | Slot-renumbering property test: renumber the arena's slots and require identical output. | move-in (moved-from) | moved to §13.1 (scope MOVE IN); pointer in §3.3 |
| KERNEL-132 | rule | Work limits instead of clocks (GEO-2): every op charges operation counts to its … | state | §3.3 work limits instead of clocks |
| KERNEL-133 | rule | The commit record is the input of the batch-local invariants (§3.10), index … | state | §3.3 the commit record |
| KERNEL-134 | budget | Digest maintenance at commit ≤ 5 % of the batch's time; root finalisation ≤ 5 ms at CITY. | state (restatement) | referenced to §6.2 (DETERMINISM-199) |
| KERNEL-135 | rule | A batch already validated by an edit's dry run (§7.1) commits that validated overlay … | state (restatement) | referenced to §5.3 (DETERMINISM-082) |
| KERNEL-136 | mechanism | Derivation pool overlays (VK-3, J-K16): the per-district stages that run in the pool … | state | §3.3 derivation pool intro |
| KERNEL-137 | rule | Pool step 1 (frozen base; VK2-1, VK3-5, VK3-6, J-K25): after the eager S10a and S10's … | state | §3.3 pool step 1 |
| KERNEL-138 | rule | At the freeze the generation worker first rebuilds every static partition whose … | state | §3.3 pool step 1 |
| KERNEL-139 | number | A partition left dirty by edits holds at most max(256, ¼ of its static size) grid … | state | §3.3 pool step 1 + rebuild moment (2) |
| KERNEL-140 | evidence | Freeze rebuild timing (fixall_kernel_r4_bench.out B): ≈ 2 ms for one district's L3 and … | state | §3.3 pool step 1 |
| KERNEL-141 | mechanism | The generation worker freezes the arena at that version and sends each pool worker one … | state | §3.3 pool step 1 |
| KERNEL-142 | rule | No SharedArrayBuffer is used, so an embedding host needs no cross-origin isolation. | state (restatement) | referenced to §11.2 (RENDERING-457); 'No SharedArrayBuffer is used (§11.2)' |
| KERNEL-143 | budget | Pool copy size (VK3-6): arena and tables ≤ ≈ 12 MB at CITY (§2.2 Size) plus partitions … | state | §3.3 pool step 1, copy size (union with MODEL-136: ≈ 0.5 MB home column after edits) |
| KERNEL-144 | decision | Pre-decided fallback if M1's (or M4's epoch-path) memory measurement exceeds the … | state | §3.3 pool step 1 |
| KERNEL-145 | budget | Step (0)'s own rebuild covers every L3 item it made — at CITY ≈ 9 000 vertices, edges … | state | §3.3 pool step 1 |
| KERNEL-146 | rule | Pool step 2 (one overlay per district): a worker derives each district on a fresh … | state | §3.3 pool step 2 |
| KERNEL-147 | rule | Every district starts from the frozen base alone, never from another district's … | state | §3.3 pool step 2 |
| KERNEL-148 | rule | Pool step 3 (scope check): a district's face set is its L1 faces and every face nested … | state | §3.3 pool step 3 |
| KERNEL-149 | rule | The L1 edges two overlays' face sets share are never written in the pool: a shared … | state | §3.3 pool step 3 |
| KERNEL-150 | number | Margin band: bandUnion of half-width 2 m (2 m each side; a table value ≥ the residue … | state (restatement) | referenced to §4.5 (PIPELINE-195); pool step 3 names the margin band |
| KERNEL-151 | rule | The hinterland unit, run by the generation worker while the pool works (§4.1, §4.9), … | state (restatement) | referenced to §4.1 / §4.9 (PIPELINE-046); pool step 3 names the hinterland unit |
| KERNEL-152 | rule | Each overlay lists the base records it copied; at merge, two overlays that copied the … | state | §3.3 pool step 3 |
| KERNEL-153 | mechanism | Pool step 4 (merge): the generation worker applies overlays in district lineage order … | state | §3.3 pool step 4 |
| KERNEL-154 | budget | Merge cost is O(overlay size): the ≈ 200 000 records S10–S12b create at CITY merge … | state | §3.3 pool step 4 |
| KERNEL-155 | rule | Pool step 5 (pool size 0): the single-worker configuration runs the same … | state | §3.3 pool step 5 |
| KERNEL-156 | decision | Spatial indexes (SCL-2, J-K6): each level has (a) static packed indexes (flatbush) … | state | §3.3 spatial indexes |
| KERNEL-157 | number | Dynamic uniform grid cell sizes (table values). | state | §3.3 spatial indexes |
| KERNEL-158 | rule | What each level's index holds (VK2-1, VK2-4, K4-1): the items of that level (current … | state | §3.3 what each level's index holds |
| KERNEL-159 | rule | A route-edge item's box holds every finer vertex on it by construction: one placed … | state | §3.3 what each level's index holds |
| KERNEL-160 | evidence | Route-box evidence (fixall_kernel_r4_checks.out A): the route edge's endpoints' box, … | state | §3.3 what each level's index holds |
| KERNEL-161 | rule | A finer batch that splits a coarser edge with a Steiner vertex writes only its own … | state | §3.3 what each level's index holds |
| KERNEL-162 | rule | No item changes in place (VK4-5): every item a batch deletes, re-levels or changes — a … | state | §3.3 no item changes in place (VK5-1 case added) |
| KERNEL-163 | mechanism | Query procedure: inside a stage every insertion and deletion goes to the grid; a … | state | §3.3 queries |
| KERNEL-164 | rule | Canonical query key read on the level-n route (VK-14, VK2-4): a vertex by its lattice … | state | §3.3 queries |
| KERNEL-165 | evidence | Face-key evidence (fixall_kernel_r3_checks.out C): the full-ring key reverses two L3 … | state | §3.3 queries |
| KERNEL-166 | defined-term | Tombstones (VK-15, VK4-5): item keys kind · 2^32 + slot (kind = vertex, route edge or … | state | §3.3 tombstones and rebuilds ('or partition', VK5-1) |
| KERNEL-167 | rule | A partition's rebuild indexes the live items that belong to it — every item of its … | state | §3.3 tombstones and rebuilds |
| KERNEL-168 | number | The home column costs 2 B per vertex, edge-pair and face slot (≈ 0.5 MB at a finished … | state | §3.3 tombstones and rebuilds (2 B/slot, ≈ 0.5 MB) + pool step 1 (≈ 0.2 MB at the one-click freeze) |
| KERNEL-169 | decision | Chose static-only tombstone filtering over forbidding slot reuse until the next … | rationale (rationale-copy) | rationale J-K34 → rewrite-kernel-rationale.md §A |
| KERNEL-170 | rule | Static partitions are rebuilt only when a stage ends — an eager stage once after its … | state | §3.3 tombstones and rebuilds ('three moments', KERNEL-C12) |
| KERNEL-171 | evidence | flatbush rebuild cost (bench_index.out): 0.24 ms at 1 000 items, 2.3 ms at 8 000, 4.9 … | state | §3.3 tombstones and rebuilds (evidence) |
| KERNEL-172 | budget | A single plot edit rebuilds at most its district's L3 and L4 partitions (≤ 1 000 items … | state | §3.3 tombstones and rebuilds (the 5 ms budget referenced to §12.6) |
| KERNEL-173 | test | Cost-model test (§13.2): fits each stage's time against commits × level size and fails … | state (restatement) | referenced to §13.2 (SCOPE-168) |
| KERNEL-174 | rule | Commit granularity is part of every stage's declaration (§4.1), so the ≈ 48 s hazard … | state | §3.3 the commit record (commit granularity) |
| KERNEL-175 | budget | First M0 measurement: the cost of insert + snap + attract + re-walk per growth … | state (restatement) | referenced to §12.4 (RENDERING-519); §3.7 no-WASM-kernel names the measurement |
| KERNEL-176 | decision | J-K6 (amended for VK2-4): chose static partitions rebuilt at stage end (per district … | rationale (rationale-copy) | rationale J-K6 → rewrite-kernel-rationale.md §A |
| KERNEL-177 | decision | J-K14 (VK-1): chose to keep finer content an earlier stage made and every finer face … | rationale (rationale-copy) | rationale J-K14 → rewrite-kernel-rationale.md §A |
| KERNEL-178 | decision | J-K24 (VK2-3; deck form amended, J-I12): chose to name a coarse insertion's permitted … | rationale (rationale-copy) | rationale J-K24 → rewrite-kernel-rationale.md §A |
| KERNEL-179 | decision | J-K15 (VK-6): chose two transaction forms — independent op sets in canonical order, … | rationale (rationale-copy) | rationale J-K15 → rewrite-kernel-rationale.md §A |
| KERNEL-180 | decision | J-K16 (VK-3): chose read-only transferred arena copies with one copy-on-write overlay … | rationale (rationale-copy) | rationale J-K16 → rewrite-kernel-rationale.md §A |
| KERNEL-181 | decision | J-K25 (VK2-1, VK3-5): chose to end S10's eager step (0) with a rebuild of the L3 … | rationale (rationale-copy) | rationale J-K25 → rewrite-kernel-rationale.md §A |
| KERNEL-182 | decision | J-K33 (VK3-8, kernel part): chose the first stage of §4.1's order as a move batch's … | rationale (rationale-copy) | rationale J-K33 → rewrite-kernel-rationale.md §A |
| KERNEL-183 | decision | J-K34 (VK4-5): chose to tombstone every item a batch deletes, re-levels or changes — … | rationale (rationale-copy) | rationale J-K34 → rewrite-kernel-rationale.md §A |
| KERNEL-184 | rule | @plat/kernel's ops are the only writers of any arena; every write op takes the open … | state | §3.4 code header |
| KERNEL-185 | interface | insertChain(tx, points, roles: RoleRow[], cls: 'mandatory' \| 'optional', opts?: { … | state | §3.4 `insertChain` (opts.pinned defined, VK5-2) |
| KERNEL-186 | interface | ChainInsert { placed: VertexId[] — one per input point, in input order: the vertex the … | state | §3.4 `ChainInsert` |
| KERNEL-187 | interface | splitThrough(tx, at: HalfEdgeId, p, row?: RoleRow) → KernelResult<VertexId>: a vertex … | state | §3.4 `splitThrough` (anchor-ordinal allocation stated once in §3.3 rule 2) |
| KERNEL-188 | interface | removeEdges(tx, ref: ChainRef \| EdgeSetRef \| StretchRef \| VertexRef) → … | state | §3.4 `removeEdges` |
| KERNEL-189 | interface | clearFiner(tx, faces: FaceRef, level) → KernelResult<Conflict[]>: removes content … | state | §3.4 `clearFiner` |
| KERNEL-190 | interface | retypeEdges(tx, ref: ChainRef \| EdgeSetRef \| StretchRef, add: RoleRow[], remove: … | state | §3.4 `retypeEdges` |
| KERNEL-191 | interface | setOwner(tx, faces: FaceId[], owner) → KernelResult<void>. | state | §3.4 `setOwner` |
| KERNEL-192 | interface | splitFace(tx, face, cut: Point[] — a bent cut is 2–3 vertices) → KernelResult<[FaceId, … | state | §3.4 `splitFace` |
| KERNEL-193 | interface | connectHole(tx, face, cut) → KernelResult<FaceId>: outer ring → hole slit; same face … | state | §3.4 `connectHole` |
| KERNEL-194 | interface | mergeFaces(tx, a, b) → KernelResult<FaceId>: deletes shared partition edges only; a … | state | §3.4 `mergeFaces` |
| KERNEL-195 | interface | absorbSliver(tx, face, floor: { minWidthCm; minAreaCm2 }) → KernelResult<FaceId>; … | state | §3.4 `absorbSliver` |
| KERNEL-196 | interface | claimSubFace(tx, claim: { ring } \| { areaCm2; within: FaceRef \| FaceId[] (as … | state | §3.4 `claimSubFace` |
| KERNEL-197 | interface | radialSplit(tx, face, apex, raysCdeg: number[]) → KernelResult<FaceId[]>: a fan from a … | state | §3.4 `radialSplit` |
| KERNEL-198 | interface | ringBand(tx, face, widthCm) → KernelResult<{ band: FaceId[]; core: FaceId }>: an inner … | state | §3.4 `ringBand` |
| KERNEL-199 | interface | corridorUnion(tx, l1Faces: FaceRef \| FaceId[]) → KernelResult<BandResult>: L2 … | state | §3.4 `corridorUnion` |
| KERNEL-200 | interface | bandUnion(tx, chains: { ref; halfWidthCm: Cm \| ChainProfile; ends: 'round' \| … | state | §3.4 `bandUnion` |
| KERNEL-201 | interface | warp(tx, field: DisplacementField, fromLevel, region, recordCheck? (the edit layer's … | state | §3.4 `warp` |
| KERNEL-202 | interface | pinVertices(tx, refs: VertexRef[]) → KernelResult<void>: sets the kernel pinned flag … | state | §3.4 `pinVertices` (release referenced to §2.2 rule 3 (b); only writer of the flag, VK5-2) |
| KERNEL-203 | rule | Kernel services are read-only and return values, never arena slots that outlive a commit. | state | §3.4 services header |
| KERNEL-204 | interface | resolve(ref: FaceRef \| ChainRef \| EdgeSetRef \| VertexRef, key: PlatKey) → Resolved: … | state | §3.4 `resolve` |
| KERNEL-205 | interface | resolveVertexAt(key, at: LatticePoint, sig: VertexSig, carry: CarryMap (§6.3's … | state | §3.4 `resolveVertexAt` |
| KERNEL-206 | interface | signature(key, v: VertexRef \| LatticePoint) → VertexSig: what an edit stores beside a … | state | §3.4 `signature` |
| KERNEL-207 | interface | sampleProfile(p: ChainProfile, owner, key, atCm: Cm \| 'perVertex') → number[] \| … | state | §3.4 `sampleProfile` |
| KERNEL-208 | interface | kerb(face: L1, committed or in the open overlay) → KernelResult<Ring[]>: face − ⋃ … | state | §3.4 `kerb` (definition in §3.7) |
| KERNEL-209 | interface | booleans(op: 'union' \| 'intersection' \| 'difference' \| 'xor', a, b, fill: 'nonzero' … | state | §3.4 `booleans` |
| KERNEL-210 | interface | buffer(chains: Point[][], halfWidthCm: Cm \| Cm[] (per input point of these transient … | state | §3.4 `buffer` |
| KERNEL-211 | interface | offsetFace(face, perEdgeCm: Cm[]) → KernelResult<Ring[]> = face − ⋃ buffer(edgeᵢ, dᵢ); … | state | §3.4 `offsetFace`, `insetRing` |
| KERNEL-212 | interface | skeleton(rings, use: 'roof' \| 'spine' \| 'regions') → KernelResult<Skeleton>: … | state | §3.4 `skeleton` (readers listed in §3.8, KERNEL-C05) |
| KERNEL-213 | interface | simplify(chain, minSegmentCm, minAngleCdeg, obstacles, pinned) → … | state | §3.4 `simplify` |
| KERNEL-214 | interface | hexLattice(region, spacingCm, jitterCm, rng: Stream) → { points; adjacency: Int32Array … | state | §3.4 `hexLattice` (KERNEL-C13) |
| KERNEL-215 | interface | Geometry services: obb(ring), hull(points), lir(ring, axes), sideRuns(face, … | state | §3.4 geometry services |
| KERNEL-216 | rule | The doors: insertChain is the only door for new edges; removeEdges and clearFiner the … | state | §3.4 doors paragraph |
| KERNEL-217 | rule | Each kernel op has documented preconditions, work local to the touched faces, a typed … | state | §3.4 doors paragraph |
| KERNEL-218 | history | Older pipeline names map directly: corridorUnion keeps its name and becomes the … | drop-history | dropped (history) → rewrite-kernel-rationale.md §B; 'corridorUnion is the corridor use of bandUnion' kept in the §3.4 `corridorUnion` comment; 'refine(level) is a stage' is §4's |
| KERNEL-219 | rule | sideRuns gives stages a side notion that survives curved, round-joined kerbs (maximal … | state | §3.4 second paragraph |
| KERNEL-220 | rule | setOwner and retypeEdges are the calls §6.3's succession uses: when a re-derivation … | state | §3.4 second paragraph |
| KERNEL-221 | rule | buffer's per-point half-widths apply only to transient chains a caller passes (a … | state | §3.4 second paragraph |
| KERNEL-222 | rule | A chain carrying a profile is inserted with its knots (opts.knots: chain index, knot … | state | §3.4 second paragraph |
| KERNEL-223 | rule | A chain cut into parts owned by different entities, a ring opened, or two chains … | state | §3.4 second paragraph; the 'former ordinalOffset' clause → rewrite-kernel-rationale.md §B |
| KERNEL-224 | rule | Stretches (VK3-9, J-K31): every operator edit on part of a chain names the part by a … | state (restatement) | referenced to §2.2 rule 5 Stretches (MODEL-095); §3.4 Stretches keeps the op semantics |
| KERNEL-225 | rule | A StretchRef resolves at the batch's current state: each end must be a vertex of the … | state | §3.4 Stretches |
| KERNEL-226 | rule | removeEdges gives each remaining part of a profiled chain a cut knot at the stretch's … | state | §3.4 Stretches |
| KERNEL-227 | rule | A removal that would leave a linear entity in more parts than it declares fails role … | state | §3.4 Stretches |
| KERNEL-228 | test | Stretch fixture (§13.1): a stretch of a way removed between two junctions and a … | state (restatement) | referenced to §13.1 (SCOPE-145) |
| KERNEL-229 | rule | Failure-class map (§3.5): collapsed / intersecting edges on concave shapes (MFCG) are … | state | §3.5 table (answers now point to their homes) |
| KERNEL-230 | rule | cut() ≠ 2 crossings is E_NOT_TWO_CROSSINGS under exact contact rules (vertex grazes, … | state | §3.5 table (answers now point to their homes) |
| KERNEL-231 | rule | Null OBB / rect crash class is closed by one OBB contract (collinear or < 3 distinct … | state | §3.5 table (answers now point to their homes) |
| KERNEL-232 | rule | Exactly one vertex per lattice point; points within 26 cm of a vertex or edge are … | state | §3.5 table (answers now point to their homes) |
| KERNEL-233 | rule | No record outside the kernel stores an arena slot: geometry is reached through role … | state (restatement) | referenced to §2.2 rule 5 (MODEL-091); §3.5 row points there |
| KERNEL-234 | rule | Hourglass / sliver footprints are closed by the invariant suite (simple faces, … | state | §3.5 table (answers now point to their homes) |
| KERNEL-235 | rule | Self-intersecting user strokes: insertChain decimates to minEdge, splits self-touching … | state | §3.5 table (answers now point to their homes) |
| KERNEL-236 | rule | Bent-cut loops of unknown cap are replaced by the bent-cut transaction's declared … | state (restatement) | referenced to §4.6 (8) (PIPELINE-241); §3.5 row points there |
| KERNEL-237 | rule | Boolean thorns are closed because booleans and buffers are built on the kernel's own … | state | §3.5 table (answers now point to their homes) |
| KERNEL-238 | rule | Per-edge-buffer steps and poor concave shrinking are closed by one kerb function, face … | state | §3.5 table (answers now point to their homes) |
| KERNEL-239 | rule | Skeleton glitches are closed by a stated numeric contract, exact OBB roofs for … | state | §3.5 table (answers now point to their homes) |
| KERNEL-240 | rule | Identity-keyed, un-serialisable topology is replaced by indexed arenas, one arena per … | state | §3.5 table (answers now point to their homes) |
| KERNEL-241 | rule | The allocation hot spot is answered by a struct-of-arrays kernel with allocation-free … | state | §3.5 table (answers now point to their homes) |
| KERNEL-242 | rule | Attraction candidates (GEO-3, VK-18, VK2-3, J-K2): insertChain processes each chain in … | state | §3.6 attraction (candidates (a)–(c); KERNEL-C09 canonical) |
| KERNEL-243 | rule | A clear-region batch never shares a finer edge (the preparation cut back every finer … | state | §3.3 clear-region rule 3 (deck span) + §3.6 attraction ('never shares a finer edge') |
| KERNEL-244 | rule | A finer (b) or (c) vertex a chain vertex lands on, or a chain segment is routed … | state | §3.6 attraction (promotion effects) |
| KERNEL-245 | rule | Kept geometry is an obstacle: a chain that would cross it or come within attractCm of … | state | §3.3 kept content / clear-region rule 3 (E_KEPT / E_LEVEL); §3.6 attraction points there |
| KERNEL-246 | rule | A chain is inserted run by run; the part already inserted counts as existing geometry … | state | §3.6 attraction (run by run) |
| KERNEL-247 | algorithm-step | insertChain step 1 (snap and decimate): every point passes snap; consecutive points … | state | §3.6 step 1 ('its index is in opts.pinned', VK5-2) |
| KERNEL-248 | algorithm-step | insertChain step 2 (vertex attraction): a chain vertex within attractCm of an existing … | state | §3.6 step 2 |
| KERNEL-249 | test | Worked case / fixture: a vertex at (20, 20) beside edge (0, 0)–(1 000, 0) is 28.3 cm … | state | §3.6 step 2 (worked example; the fixture is §13.1's) |
| KERNEL-250 | number | Incoming vertex displacement bound: at most √2 · attractCm ≈ 36.8 cm (or the step-4 … | state | §3.6 existing geometry wins |
| KERNEL-251 | algorithm-step | insertChain step 3 (segment and stretch attraction): a segment passing within … | state | §3.6 step 3 |
| KERNEL-252 | algorithm-step | insertChain step 4 (crossings): remaining crossings are computed exactly, placed by … | state | §3.6 step 4 |
| KERNEL-253 | rule | Wedge routing: two consecutive crossings closer than minEdge lie on the two arms of an … | state | §3.6 step 4 (second E_BELOW_MIN_EDGE trigger, KERNEL-C03) |
| KERNEL-254 | algorithm-step | insertChain step 5 (re-walk): only faces incident to touched edges are re-walked; face … | state | §3.6 step 5 |
| KERNEL-255 | rule | Placement rule (GEO-3, GEO-35, J-K17): every new vertex on an existing edge (split … | state | §3.6 placement rule |
| KERNEL-256 | rule | The nearest lattice point fails the placement rule only where a vertex already stands … | state | §3.6 placement rule |
| KERNEL-257 | evidence | Placement evidence (fixall_kernel_r2_attract.out C): 200 000 crossings next to a … | state | §3.6 placement rule |
| KERNEL-258 | rule | If no placement candidate qualifies, the incoming vertex moves onto the nearer … | state | §3.6 placement rule (W_PLACED defined for both events, KERNEL-C02) |
| KERNEL-259 | rule | Existing geometry wins: an incoming chain vertex moves at most √2 · attractCm (or the … | state | §3.6 existing geometry wins |
| KERNEL-260 | rule | No edge shorter than minEdge can be created: every edge a batch creates is (a) a chain … | state | §3.6 existing geometry wins |
| KERNEL-261 | evidence | Attraction evidence (fixall_kernel_r2_attract.out A–B): 400 000 vertices dropped in … | state | §3.6 existing geometry wins (evidence); history clauses → rewrite-kernel-rationale.md §B |
| KERNEL-262 | test | Constructive fixtures (§13.1): (1) the (20, 20) vertex against edge (0, 0)–(1 000, 0); … | state (restatement) | referenced to §13.1 (SCOPE-124) |
| KERNEL-263 | rule | Chain classes: mandatory chains (coast, shore, bank, river, wall trace, arterial, band … | state | §3.6 chain classes (no precision error left; §3.1's non-precision codes, KERNEL-C04) |
| KERNEL-264 | rule | Optional chains (growth proposals, optional lanes, decorative lines) are also rejected … | state | §3.6 chain classes (both E_BELOW_MIN_EDGE triggers, KERNEL-C03) |
| KERNEL-265 | rule | Clearance invariant: after every commit, every vertex lies at least minEdge from every … | state | §3.10 clearance row (definition) + §3.6 clearance (how it is maintained) |
| KERNEL-266 | rule | A setback smaller than minEdge collapses to zero (a front drawn 10 cm behind the kerb … | state | §3.6 clearance |
| KERNEL-267 | rule | Roles on shared stretches (GEO-4): when a chain shares an edge (stretch attraction or … | state | §3.6 roles on shared stretches, and slivers |
| KERNEL-268 | rule | absorbSliver: a face below its class floor (width or area, never minEdge) merges into … | state | §3.6 roles on shared stretches, and slivers |
| KERNEL-269 | rule | splitFace contact semantics (GEO-6): a cut is a polyline whose interior lies in the … | state | §3.6 splitFace contact semantics, preamble and 1 |
| KERNEL-270 | rule | splitFace (2): any other contact is E_NOT_TWO_CROSSINGS — passing through or within … | state | §3.6 splitFace 2 |
| KERNEL-271 | rule | splitFace (3): an antenna (a dangling chain inside the face — cul-de-sac spine, … | state | §3.6 splitFace 3 |
| KERNEL-272 | rule | splitFace (4): a cut from the outer ring to a hole does not split the face; it is … | state | §3.6 splitFace 4 |
| KERNEL-273 | rule | splitFace (5): the two children are returned in canonical order, the face left of the … | state | §3.6 splitFace 5 |
| KERNEL-274 | rule | splitFace (6): a face's exported area boundary omits its antennae, so a GeoJSON ring … | state | §3.6 splitFace 6 |
| KERNEL-275 | rule | Moves (GEO-10, GEO-35, VK-7, GEO-5 (c), VK2-5–VK2-7): warp(field, fromLevel, region) … | state | §3.6 moves |
| KERNEL-276 | rule | A move batch keeps nothing: E_KEPT governs insertion and clearing only; what a move … | state | §3.6 moves |
| KERNEL-277 | rule | Held vertices (GEO-5 (c), VK2-7 (b)): before the step the kernel computes the held set … | state | §3.6 held vertices |
| KERNEL-278 | rule | Kernel-pinned vertices (gates, junctions, portals) move with everything else under a … | state | §3.6 held vertices |
| KERNEL-279 | rule | A bridge's deck_end vertices and a water gate's gate_end vertices are held unless … | state | §3.6 held vertices |
| KERNEL-280 | rule | Slides (VK-7, VK2-6, J-K18): a route is fixed when its edge is of level < fromLevel or … | state | §3.6 slides |
| KERNEL-281 | number | Default warp fromLevel = 1. | state (restatement) | referenced to §7.1 (DETERMINISM-316: default fromLevel); §3.6 slides points there |
| KERNEL-282 | test | Slide fixture (§13.1): a warp with fromLevel = 1 over a street that ends on a shore … | move-in (moved-from) | moved to §13.1 (scope MOVE IN); pointer '(fixture: §13.1)' in §3.6 slides |
| KERNEL-283 | rule | Re-seats (VK2-6): each Steiner vertex on a moved coarser edge is re-seated at the … | state | §3.6 re-seats |
| KERNEL-284 | evidence | Re-seat evidence (fixall_kernel_r3_checks.out A): over 200 000 re-seats beside a … | state | §3.6 re-seats |
| KERNEL-285 | rule | Order within a step (VK3-4, J-K30): re-seats and slides are placed one at a time in … | state | §3.6 order within a step |
| KERNEL-286 | evidence | Step-order evidence (fixall_kernel_r4_checks.out B): two Steiner vertices re-seated … | state | §3.6 order within a step |
| KERNEL-287 | rule | split flag under moves (VK2-5, VK4-3, J-K26): the step clears the split flag of every … | state | §3.6 the split flag under moves (rule-3 (b)/(b′) wording, MODEL-C01) |
| KERNEL-288 | rule | Whole-step validation (GEO-10, GEO-35): each target is rounded to the lattice … | state | §3.6 whole-step validation |
| KERNEL-289 | number | On whole-step validation failure the step's strength is halved globally — … | state | §3.6 whole-step validation |
| KERNEL-290 | rule | The commit record lists every moved vertex and §3.10's minEdge row checks the new and … | state | §3.6 whole-step validation |
| KERNEL-291 | rule | Faces a committed step leaves below a class floor are re-derived locally, each by its … | state | §3.6 after-step paragraph |
| KERNEL-292 | rule | The named brushes of §7.1 are displacement fields supplied by the edit layer; a … | state | §3.6 after-step paragraph (moveVertex: §3.4) |
| KERNEL-293 | decision | J-K2: chose attraction at minEdge + 1 cm (existing geometry wins; an incoming vertex … | rationale (rationale-copy) | rationale J-K2 → rewrite-kernel-rationale.md §A |
| KERNEL-294 | decision | J-K17 (GEO-3; extended to moves, VK2-6): chose to move a vertex whose foot falls … | rationale (rationale-copy) | rationale J-K17 → rewrite-kernel-rationale.md §A |
| KERNEL-295 | decision | J-K18 (VK-7, VK2-6, VK2-7): chose to slide a vertex along the fixed route it lies on … | rationale (rationale-copy) | rationale J-K18 → rewrite-kernel-rationale.md §A |
| KERNEL-296 | decision | J-K26 (VK2-5): chose to clear the split flag of a moved vertex except when the move … | rationale (rationale-copy) | rationale J-K26 → rewrite-kernel-rationale.md §A |
| KERNEL-297 | decision | J-K30 (VK3-4): chose to place a step's re-seats and slides one at a time in canonical … | rationale (rationale-copy) | rationale J-K30 → rewrite-kernel-rationale.md §A |
| KERNEL-298 | decision | J-K27 (VK2-7): chose to let a move batch keep nothing and decide what it may not … | rationale (rationale-copy) | rationale J-K27 → rewrite-kernel-rationale.md §A |
| KERNEL-299 | decision | J-K35 (VK4-4): chose to hold a water gate's gate_end vertices under a warp as a deck's … | rationale (rationale-copy) | rationale J-K35 → rewrite-kernel-rationale.md §A |
| KERNEL-300 | decision | One geometry engine (GEO-9, DEF-2, J-K4): booleans, buffers, per-edge insets and bands … | state | §3.7 decision |
| KERNEL-301 | algorithm-step | Boolean algorithm: overlay both operands' rings, label every face with its winding … | state | §3.7 decision |
| KERNEL-302 | mechanism | Buffer construction: union of per-segment strips and per-vertex join discs; round … | state | §3.7 decision |
| KERNEL-303 | rule | The kerb, defined once (GEO-20): for an L1 face F, kerb(F) = F − ⋃ buffer(spineᵢ, … | state | §3.7 the kerb, defined once |
| KERNEL-304 | rule | corridorUnion commits exactly the kerb geometry at L2: kerb rings as kerb edges; the … | state | §3.7 the kerb, defined once |
| KERNEL-305 | rule | Finer faces an earlier stage made inside F are kept: each must lie wholly inside one … | state | §3.7 the kerb, defined once |
| KERNEL-306 | rule | kerb is also a read-only service on faces of an open transaction's overlay: S8 plans … | state | §3.7 the kerb, defined once |
| KERNEL-307 | test | S8/S9 kerb identity: the block S8 cut and the block S9 keeps are tested as Hausdorff 0 … | state (restatement) | referenced to §13.2 (SCOPE-178); '(tested, §13.2)' |
| KERNEL-308 | rule | Because a way's width is a knot profile, the T-junction S8 inserts into a crossed … | state | §3.7 the kerb, defined once |
| KERNEL-309 | rule | corridorUnion takes a set of L1 faces and re-derives only those, which is also how an … | state | §3.7 the kerb, defined once |
| KERNEL-310 | rule | The per-edge half-plane inset survives only as insetRing for a uniform inset of a face … | state | §3.7 the kerb, defined once |
| KERNEL-311 | rule | Wall bands, glacis, tower and gatehouse footprints use bandUnion with the band role: … | state | §3.7 the kerb, defined once |
| KERNEL-312 | decision | Oracles, not fallbacks (VK-4, J-K19): Clipper2 (compiled to WebAssembly, run in Node) … | state | §3.7 oracles (never shipped unless the M0 speed fallback fires, KERNEL-C01) |
| KERNEL-313 | acceptance-bar | B-FUZZ unattracted cases (the operation reports no W_ATTRACTED, W_STRETCH_SHARED, … | state | §3.7 oracles |
| KERNEL-314 | acceptance-bar | B-FUZZ attracted cases (thin, near-collinear, near-touching inputs of §13.1's random … | state | §3.7 oracles |
| KERNEL-315 | acceptance-bar | The B-FUZZ harness reports both shares per operation and draws until the unattracted … | state (restatement) | referenced to §13.1 (SCOPE-155) |
| KERNEL-316 | rule | The generation report names the engine (plat-arrangement@<version>, §5.4); changing … | state (restatement) | referenced to §5.4 (engine name) and §6.5 (7) (DETERMINISM-289) |
| KERNEL-317 | acceptance-bar | M0 (a)(i) differential correctness: 10^6 fuzzed and constructive inputs per operation … | state | §3.7 confirmation at M0, criterion (i) |
| KERNEL-318 | budget | M0 (a)(ii) speed: S9's corridor bands over the CITY face set ≤ 25 ms p50 and one … | state (restatement) | referenced to §12.4 (RENDERING-524); §3.7 names what M0 (ii) measures |
| KERNEL-319 | defined-term | S11's geometry share = every kernel call S11 makes for one plot (the base outline … | state | §3.7 confirmation at M0 (S11's geometry share defined) |
| KERNEL-320 | decision | Pre-decided fallback if M0 (ii) fails after one optimisation pass: the shipped engine … | state | §3.7 pre-decided fallback (KERNEL-C01; host error referenced to §11.2, CANON-C04; stage list united from DETERMINISM-303) |
| KERNEL-321 | decision | No WASM kernel (DEF-13, J-K8): the kernel is TypeScript on every host. | state | §3.7 no WASM kernel |
| KERNEL-322 | budget | M0 (a) per-op kernel costs: insert + snap + attract + re-walk ≤ 8 µs per growth … | state (restatement) | referenced to §12.4 (RENDERING-519); §3.7 names the measured loops |
| KERNEL-323 | rule | Miss rule (VK-11), per hot loop after one optimisation pass: a miss by more than 2× → … | state | §3.7 what a miss triggers |
| KERNEL-324 | rule | An accelerator must pass §6.5 (10)'s cross-implementation test byte-identically on the … | state (restatement) | referenced to §6.5 (10) (DETERMINISM-302); §3.7 keeps 'the TypeScript loop stays in every bundle' |
| KERNEL-325 | decision | J-K4: chose booleans and buffers on the kernel's own arrangement over adopting … | rationale (rationale-copy) | rationale J-K4 → rewrite-kernel-rationale.md §A |
| KERNEL-326 | decision | J-K8: chose a TypeScript kernel on every host with a byte-identical WebAssembly … | rationale (rationale-copy) | rationale J-K8 → rewrite-kernel-rationale.md §A |
| KERNEL-327 | decision | J-K19 (VK-4): chose to compare against the oracles strictly on the cases where our … | rationale (rationale-copy) | rationale J-K19 → rewrite-kernel-rationale.md §A |
| KERNEL-328 | decision | J-K20 (VK-5): chose to set the kernel's M0 bar at S11's geometry share (≤ 3 µs per … | rationale (rationale-copy) | rationale J-K20 → rewrite-kernel-rationale.md §A |
| KERNEL-329 | decision | Straight skeleton built in-house (DEF-3, J-K5): no port is assumed because no … | state | §3.8 decision |
| KERNEL-330 | rule | The skeleton never writes an arena: roof ridges and hips are derived per building and … | state | §3.8 decision |
| KERNEL-331 | rule | A stage that wants skeleton-derived topology (e.g. per-frontage regions of a block, … | state | §3.8 decision + readers (KERNEL-C05) |
| KERNEL-332 | rule | Skeleton numeric contract (GEO-8): event times are computed in doubles with + − × ÷ √ … | state | §3.8 numeric contract |
| KERNEL-333 | rule | Skeleton events closer than 1 mm in offset time and 1 cm in position coalesce into one … | state | §3.8 numeric contract |
| KERNEL-334 | number | Skeleton work limit: 4 · (n + r) + 64 events for n vertices and r reflex vertices (a … | state | §3.8 numeric contract |
| KERNEL-335 | rule | Convex near-rectangle exact path (VK-10, J-K21): a footprint that is convex (every … | state | §3.8 convex near-rectangles (the named 'convex near-rectangle test', MODEL-C02 canonical) |
| KERNEL-336 | evidence | Snapping evidence (GEO-8): after snapping, only 33 % of rotated squares keep a single … | state | §3.8 convex near-rectangles (the named 'convex near-rectangle test', MODEL-C02 canonical) |
| KERNEL-337 | rule | OBB roof constructions: a hip roof's ridge ends half the OBB's minor extent in from … | state | §3.8 convex near-rectangles (gable ridge on the ridgeAxis line, KERNEL-C10) |
| KERNEL-338 | test | Notch counter-example (fixall_kernel_r2_attract.out D): a 20 × 10 m rectangle with a 3 … | state | §3.8 convex near-rectangles (notch example); the old-test clause → rewrite-kernel-rationale.md §B |
| KERNEL-339 | rule | Roofs are taken wing by wing by BaseWing.kind (§2.6, NF-P2): rect wings (rectangles, L … | state | §3.8 convex near-rectangles (KERNEL-C10) |
| KERNEL-340 | rule | The skeleton serves quad wings that fail the near-rectangle test, irregular or notched … | state | §3.8 readers (KERNEL-C05) |
| KERNEL-341 | rule | Skeleton post-condition validator, before any use: (1) planarity — no two arcs cross … | state | §3.8 post-condition validator |
| KERNEL-342 | rule | Skeleton downgrade: a validator failure or E_WORK_LIMIT takes a plain roof (footprint … | state | §3.8 post-condition validator |
| KERNEL-343 | test | Skeleton M0 fixtures: squares and rectangles at every centidegree 0°–90°; regular … | move-in (moved-from) | moved to §13.1 (scope MOVE IN); '§13.1's skeleton fixtures' in §3.8 |
| KERNEL-344 | acceptance-bar | Skeleton M0 pass: 0 crashes; 0 validator failures on the fixtures; downgrades ≤ 0.5 % … | state | §3.8 confirmation at M0 |
| KERNEL-345 | decision | Pre-decided fallback if the skeleton corpus bar fails after one repair pass: the … | state | §3.8 pre-decided fallback (each reader's downgrade, KERNEL-C05) |
| KERNEL-346 | decision | J-K5: chose an in-house skeleton under a stated numeric contract, exact OBB roofs for … | rationale (rationale-copy) | rationale J-K5 → rewrite-kernel-rationale.md §A |
| KERNEL-347 | decision | J-K21 (VK-10): chose a convexity gate on the exact OBB path over checking each ridge … | rationale (rationale-copy) | rationale J-K21 → rewrite-kernel-rationale.md §A |
| KERNEL-348 | rule | The snapshot's geometry (§2.9) is one block per PlatKey, never one per level (SCL-11, … | state | §3.9 block |
| KERNEL-349 | interface | Snapshot vertices: live vertices in slot order (slots compacted on save — renumbering … | state | §3.9 block |
| KERNEL-350 | interface | Snapshot edges: one (origin, destination, birth level) triple per edge pair, the level … | state | §3.9 block |
| KERNEL-351 | interface | Snapshot roles: (edge or vertex, role, entity, level, ordinal) rows, entities as … | state | §3.9 block |
| KERNEL-352 | interface | Snapshot faces: per level, one (boundary half-edge, owner, kind, stage rank) row per … | state | §3.9 block |
| KERNEL-353 | rule | Chunks (NF-D5, VD2-9): the block is written as content-addressed chunks. Per arena, … | state | §3.9 chunks ('the vertices that belong to it by §3.3's rebuild rule', VK5-1) |
| KERNEL-354 | rule | Every reference to a vertex another chunk holds is its lattice point, never (chunk, … | state | §3.9 chunks |
| KERNEL-355 | algorithm-step | Chunk load order: the kernel inserts the level-≤ 1 routes, then each partition chunk … | state | §3.9 chunks |
| KERNEL-356 | rule | Chunk rewrite scope: an edit that renumbers one partition's vertices rewrites that … | state | §3.9 chunks |
| KERNEL-357 | decision | Chose to key each Steiner split by its route edge's endpoints and state the rewrite, … | rationale (rationale-copy) | rationale → rewrite-kernel-rationale.md §A (for J-DET-36; the rule itself stays in §3.9) |
| KERNEL-358 | decision | Under §2.9's size fallback the partition chunks are cut per block group (the 200 m … | state (restatement) | referenced to §2.9 (MODEL-422) |
| KERNEL-359 | algorithm-step | On load the kernel rebuilds next / prev by sorting each vertex's outgoing edges by … | state | §3.9 load |
| KERNEL-360 | rule | The per-level digests are recomputed from the rebuilt arena as part of the load's one … | state (restatement) | referenced to §2.9 steps 2–3 (MODEL-387); '§3.9: no per-level digest is stored' |
| KERNEL-361 | decision | Pre-decided fallback for §2.9's open-to-editable bar: each L2–L4 static index … | state | §3.9 load (pre-decided fallback) |
| KERNEL-362 | rule | Entities carry no slots and no vertex positions except the wing rings §2.6 carries … | state (restatement) | referenced to §2.2 rule 5 (MODEL-091) |
| KERNEL-363 | test | Kernel round-trip test: save → load → save is byte-identical and the loaded arena … | move-in (moved-from) | moved to §13.1 (scope MOVE IN); pointer in §3.9 load |
| KERNEL-364 | rule | The compact twin (CBOR, §11) carries the same geometry block with typed-array tags. | state (restatement) | referenced to §11.1 (RENDERING-404) |
| KERNEL-365 | number | Two added snapshot columns — a 2-byte ordinal per role row and a 1-byte stage rank per … | state | §3.9 block (column sizes; the 320 B bar referenced to §2.9) |
| KERNEL-366 | history | The five-DCEL design wrote each inherited edge again at every finer level (replaced by … | drop-history | dropped (history) → rewrite-kernel-rationale.md §B |
| KERNEL-367 | invariant | Invariant: every coordinate is a lattice point inside the range invariant — hard, at … | state | §3.10 table |
| KERNEL-368 | invariant | Invariant: no edge shorter than minEdge, whichever writer made or moved it (insertion, … | state | §3.10 table |
| KERNEL-369 | invariant | Invariant: clearance — every vertex ≥ minEdge from every edge outside its one-ring — … | state | §3.10 table |
| KERNEL-370 | invariant | Invariant: one vertex per lattice point — hard, batch-local; by construction for … | state | §3.10 table |
| KERNEL-371 | invariant | Invariant: faces simple except declared antennae; no two edges cross — hard, … | state | §3.10 table |
| KERNEL-372 | invariant | Invariant: nesting — every face of level n + 1 has exactly one parent at level n and … | state | §3.10 table |
| KERNEL-373 | invariant | Invariant: placement bound — every vertex a batch places, re-seats or slides onto a … | state | §3.10 table |
| KERNEL-374 | invariant | Invariant: level consistency — every edge's birth level is the lowest among its role … | state | §3.10 table |
| KERNEL-375 | invariant | Invariant: held vertices — no vertex of a warp or smoothing step's held set moved — … | state | §3.10 table |
| KERNEL-376 | invariant | Invariant: prepared contacts — a clear-region batch met finer geometry only at its … | state | §3.10 table |
| KERNEL-377 | invariant | Invariant: kept content — no finer face made by a stage before the batch's … | state | §3.10 table |
| KERNEL-378 | invariant | Invariant: role consistency — every role the registry declares linear (way, wall, … | state | §3.10 table |
| KERNEL-379 | invariant | Invariant: every stored reference resolves — each FaceRef, ChainRef, EdgeSetRef, … | state | §3.10 table |
| KERNEL-380 | invariant | Invariant: frozen base complete — at every pool freeze, after the freeze has rebuilt … | state | §3.10 table |
| KERNEL-381 | invariant | Invariant: index levels and freshness — a batch wrote no index of a level coarser than … | state | §3.10 table, freshness row ('or moved to another partition', VK5-1) |
| KERNEL-382 | invariant | Invariant: pool scope — no district overlay wrote outside its district's face set; no … | state | §3.10 table, pool-scope row ('scope', aligned with pool step 3) |
| KERNEL-383 | invariant | Invariant: face corners ≥ minFaceAngle — soft for mandatory chains (W_ACUTE_CORNER), … | state | §3.10 table (canonical class of minFaceAngle, KERNEL-C07) |
| KERNEL-384 | invariant | Invariant: Euler characteristic per level (V − E + F = 1 + components) — hard, in CI … | state | §3.10 table |
| KERNEL-385 | rule | The §3.10 rows are the kernel's part of the §5.3 suite. Batch-local checks read only … | state | §3.10 closing paragraph |
| KERNEL-386 | rule | Class floors (minimum width, area and angle per face class) are the stages' invariants … | state | §3.10 closing paragraph → §3.2 (2) (KERNEL-C08) |
