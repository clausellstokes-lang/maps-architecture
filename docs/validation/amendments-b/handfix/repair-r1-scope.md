# repair-r1-scope — lane handfix-b/repair-scope-r1 (SCOPE part): block file per the BLOCK PROTOCOL. Text before the
# first "=== " line is ignored by apply-blocks.py. Base: docs/ARCHITECTURE.md sha256 5d752c9b… and
# docs/ARCHITECTURE-RATIONALE.md sha256 61477508… (handfix-b/apply's output). Each REPLACE body is the live subsection
# with count-asserted single-occurrence substitutions (scratchpad handfix/rs1/build.py); every other line is verbatim.
#
# PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
# ITEM inputs: planned verify-*-r0 issue sources, closing-report §2/§3, workflow 13, apply-blocks.py | done
# ITEM read: planned §13.1, §13.2, §16, J-A16.01 Part A whole; homes cited (§2.6 steps 3-5, stage-3 contract, §3.4, §3.7, §7.4, §4.7, §10.2) | done
# ITEM blocks: planned REPLACE §13.1, REPLACE §13.2, RATIONALE-A J-A16.01 (restated) | done
# ITEM checks: planned apply-blocks dry run on scratch, restated-row swap, line diff, refs, doc_checks three copies | done (RECEIPTS below)
# ITEM close-out: planned queue row, LANDED line | done
#
# ISSUES -> BLOCKS (the eight distinct issues; VHM-07, VKH-03, VDH-02 and VPH-05 (1) are listed twice in the lane's
# issue list — filed by a sibling verifier, confirmed by verify-scope-r0 — and applied once; VPH-05 (2) is superseded
# by VSH-01 and not applied)
#   VKH-03      REPLACE §13.1 — the tileRings differential's refusal clause gated on the input (as filed)
#   VHM-07      REPLACE §13.2 — T28-3 (1) and T28-2 (2), the walk-out's trapdoor fallback (as filed)
#   VPH-05 (1)  REPLACE §13.2 — T19-4: the empty list off `houses` and the required structure's floor (as filed)
#   VSH-01      REPLACE §13.2 — T11-1: the Frontage split in parentheses, three parts, the undo's two records (as filed)
#   VDH-02      REPLACE §13.2 — T20-2: the epoch undo restores, the dossier-event undo returns F-EDIT (as filed)
#   VSH-04      REPLACE §13.2 — §2.6's test: the stored composition's storey rule (one citation deviation, below)
#   VSH-05      REPLACE §13.2 — T20-6 (1) revert skips dossier events, (2) the carrying epoch refused as undo target (as filed)
#   VSH-02      RATIONALE-A   — J-A16.01 restated: M4's epoch relocation recorded as absorbed (as filed; index row unchanged)
#
# DEVIATION (one, recorded for the verifier). VSH-04's pointer "(§2.6's storey rule)" is written "(the storey rule of
# §2.6's stage-3 contract)": §2.6 also says "storey rule" for a programme room's storey constraint (the plan rung's
# steps 2 and 3, §10.2's `storey` column), so the bare pointer could send a reader there; the rule this bar tests is the
# stage-3 contract's sentence ("A composition's wings — generated or stored, and after every composition edit — reach
# every storey its base wings reach, with at least their area at each storey"), which the intake bullet calls "that
# storey rule". The tested fact is unchanged.
#
# ASSEMBLER HAND-OFF
# (1) RESTATED ROW. The RATIONALE-A block restates J-A16.01 (Part A only; its index row stands unchanged, as VSH-02
#     requires) under its existing id. apply-blocks.py appends it and notes "DUPLICATE ID inserted"; move the appended
#     row into the older row's place and delete the older row, so one row per id remains (assemble-r1-handoff.py's
#     swap_restated, as assemble-r3-handoff.py step 1 runs it). The audit's part_a_without_j_rows will list J-A16.01:
#     expected. No new id.
# (2) §13.2 CARRIES ONE OTHER PART'S CHANGE. This file REPLACEs §13.1 and §13.2 whole and, by name order, is applied
#     after repair-r1-determinism.md, repair-r1-model.md and repair-r1-pipeline.md. The one other-part change inside
#     either section is VHM-01 (3) (model-owned; T30-4's headroom clause). This §13.2 body carries it exactly as filed in
#     verify-model-r0 ("every passage with a `frontBuilding` has its `headroomCm` written and equal to §2.5's rule,
#     after a heights edit of a spanning wing too,"): the model seat's draft (scratchpad handfix/rm1) replaces §2.5,
#     §2.6 and §7.1 and not §13.2, so this carry is where VHM-01 (3) lands, and it agrees with that draft's §2.5
#     headroom rule (re-derived inside a heights edit) and its VHM-02 ruling (a cleared or demolished front building
#     clears `Passage.frontBuilding`, so T30-4's "every passage with a `frontBuilding`" excludes it). If a model file
#     also REPLACEs §13.2, it is applied before this one and superseded (audit: SUPERSEDED), so its T30-4 must read as
#     carried here.
# (3) CROSS-PART CITATIONS (homes these bars cite that a sibling round-1 file installs or re-words; all apply in the
#     same assembly): T11-1 — II.6's split (repair-r1-pipeline.md, VPH-03 (1)) and §6.3's split rule (determinism,
#     VDH-05); T20-2 and T20-6 — §7.4's Replay semantics (VD3-04, installed; its offer re-worded by VDH-01 (1),
#     determinism); T19-4 — §10.2's `houses` (a live-in main slot's flag read as true, repair-r1-pipeline.md VPH-02 (1))
#     and §4.7's required-structure floor (installed, #1); T28-2 and T28-3 — §2.6 step 3's walk-out fallback (#18,
#     installed) and J-A29.25's index row (VHM-05, model).
# (4) DOCUMENT-CHECK ALLOW ROWS. The text adds three chance C3 runs in §13.2, the three the verifiers foresaw
#     (verify-model-r0 / verify-scope-r0 for VHM-07; verify-pipeline-r0 / verify-scope-r0 for the T11-1 phrase). Each is
#     stitched: its 3-grams occur apart in the corpus and the run occurs contiguously in no findings file and no JSON
#     file of research/ or captures/ (scratchpad handfix/rs1/contig.py). Append the "#ALLOW| " lines below, prefix
#     stripped (tab-separated), to docs/validation/doc-checks-allow.tsv; one row covers every occurrence of its run, so
#     "both ends of an interior" (also in II.6 by repair-r1-pipeline.md) is added once, whichever seat proposes it.
#ALLOW| # block: handfix-b/repair-scope-r1, 2026-09-27 (opus standing in for the Fable seat; queued for Fable review in docs/FABLE-REVIEW-QUEUE.md) — the three chance hits the lane's §13.2 bars add, checked by the three-copy method against one corpus snapshot (untouched copy C3 57 before and after, 0 unreviewed).
#ALLOW| C3	both ends of an interior	the hand fix's own bar text (handfix-b/repair-scope-r1, T11-1 by VSH-01, carrying VPH-05 (2)'s phrase 'one spanning both ends of an interior stretch split in three'; the same run in II.6 by VPH-03 (1)); stitched — the run occurs contiguously in no findings file and no JSON file of research/ or captures/; ordinary English
#ALLOW| C3	one 2 6 step 3	the hand fix's own bar text (handfix-b/repair-scope-r1, T28-2 by VHM-07 (2): 'at its outside door where step 3 opens one (§2.6 step 3)'): ordinary English meeting a section pointer's digits; stitched — the run occurs contiguously in no findings file and no JSON file of research/ or captures/
#ALLOW| C3	side of the ring is	the hand fix's own bar text (handfix-b/repair-scope-r1, T28-3 by VHM-07 (1): 'where no side of the ring is long enough for its door'); stitched — the run occurs contiguously in no findings file and no JSON file of research/ or captures/; ordinary English
#
# RECEIPTS (executed on scratch copies; scratchpad handfix/rs1: build.py, gen.py, check.py, contig.py, dc-*.txt)
# * Anchors: every old string occurs exactly once in its subsection and once in the file; every new text once after.
# * apply-blocks.py, this file alone: 3 blocks found, 3 applied, 0 skipped; audit 3 / 3 OK; headings 145 -> 145, fences
#   balanced, title block unchanged; the one note "DUPLICATE ID inserted: J-A16.01" (hand-off (1)). After the swap:
#   one J-A16.01 row, in its old place. Line diff against the base: the document changes 9 lines (10081, 10208, 10297,
#   10330, 10334, 10339, 10368, 10371 and 10416 — the last the carried T30-4), each carrying exactly its required text;
#   the rationale changes 1 line (466, J-A16.01). Line counts unchanged (13021 / 2052).
# * Combined with repair-r1-determinism.md and repair-r1-pipeline.md (the sibling files present): 14 / 14 applied,
#   audit OK, 5 restated rows swapped; §13.1, §13.2 and J-A16.01 identical to this file alone (no sibling edits them).
# * refs.py: base and result identical — 139 headings, 35 D ids, 471 J ids, 2 flags, both pre-existing external.
# * Deferral probe on every added text: 0 hits.
# * doc_checks.py --sections "13", one corpus snapshot (911 940 3-grams): untouched C3 57, 0 unreviewed, exit 0 on three
#   runs spread over the lane (the corpus held still); mine C3 60, the 3 runs above unreviewed, exit 1 — exit 0 with the
#   three allow rows; combined C3 60, exit 0 with the three allow rows. C1 5 / C2 0 / C4 0 / S1 0 / S2 0 in every copy.

=== REPLACE ### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test ===
### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test

Every kernel primitive is fuzzed with two input families, held to one bar — **0 crashes, 0 hangs (hard timeout), 0
invalid outputs** (no self-intersecting output, no undeclared sliver) — at the sizes of §13.8's tiers.

1. **Random inputs** (`fast-check`): concave, holed, thin, near-collinear, self-touching, snapped, duplicated-vertex,
   ≥ 300-vertex and zero-area polygons and chains.
2. **Constructive degeneracies.** Random sampling almost never lands on an exact degeneracy — a line across a 2²⁴ frame
   holds at most 2²⁴ of its 2⁴⁸ lattice points, so a random third point is collinear with probability ≤ 2⁻²⁴ — so every
   degenerate class is built on purpose from random parameters:
   * *geometry classes:* lattice points exactly on a segment, placed by gcd stepping (`p₀ + k · d / gcd(dx, dy)`);
     collinear triples and collinear overlapping edges (shared runs from 1 cm to the whole edge, same and opposite
     direction); cuts through a vertex and cuts grazing a reflex vertex (through it, and offset by 0 and ± 1 lattice
     unit); antennae (chains dangling into a face) and chains touching a boundary at one point; coincident typed chains
     — a wall on a bank, a quay on a shore, a street on a district boundary, a track on a field boundary; rectangles,
     squares and regular n-gons (n = 3 … 12) rotated by random angles and snapped; holes touching the outer ring at a
     vertex and along an edge, and holes touching each other; simultaneous skeleton events (regular polygons,
     equal-sided rectangles, symmetric notches); star rings of radius 2²³ − 2 (`area2` exact);
   * *quantisation:* half-centimetre ties before snapping and ± (2²³ − 1); values `snap` must refuse (± 2²³, NaN, ± ∞);
   * *attraction and moves:* a vertex at (20, 20) against the edge (0, 0)–(1 000, 0) moves onto (0, 0), leaving no
     sub-`minEdge` edge; a chain crossing an edge next to a vertex standing 25.0–25.7 cm from it; a stretch whose join
     point lies within `attractCm` of an edge endpoint; a `pinch` that would shorten an edge below `minEdge` and a step
     that would put two vertices on one lattice point (both halve); a `warp` with `fromLevel = 1` over a street ending
     on a shore (the junction slides along the shore and the step commits); a warp moving a kerb beside a vertex 25.3 cm
     from it — the kerb (0, 0)–(1 000, 9) past (517, 30) — commits, its re-seated vertex placed by the placement rule
     (`fixall_kernel_r3_checks.out` A); a warp re-seating two Steiner vertices whose projections lie within `minEdge` +
     1 cm of each other gives identical output after a slot renumbering (the two placement orders differ in 6.8 % of
     such pairs, `fixall_kernel_r4_checks.out` B); a warp over a locked plot and over a pinned building holds every
     corner (a neighbour's footprint corner on the locked plot's line slides); a `warp` with `fromLevel = 1` over
     finished fabric gives 0 `E_KEPT`, and over a generated and an edited water gate moves neither gate's bank vertices;
     a warp over a spine carrying a same-level T-junction, and one moving the spine's vertices around the unmoved
     junction, then the lane removed — the junction stays a shape vertex of the warped spine; a warp that re-seats a
     Steiner vertex, then `clearFiner` — the vertex dissolves and the coarser edge is restored exactly;
   * *kept content, carves and water edits* (§3.3's clear regions, §4.11's footprints): an L1 lane into a face holding
     kept L3 content of an earlier stage (`E_KEPT`); a canal across a CITY district that cuts a lane whose remainder is
     pruned and re-routes a `primary` — every face outside its footprint (the channel buffer ∪ every L1 cell its way
     rule touches) byte-identical except the seam exception at its boundary, its L0 channel attracting onto exactly its
     prepared vertices (each promoted, no other finer vertex promoted), each deck carrying `deck` beside `way` in §2.2
     rule 7's form (the kept way's own L1 edge, no L0 edge across the channel); a course-knot move and a river move
     across a street grid, with the same footprint and contact assertions (§7.3 (b)); a canal crossing a walled CITY's
     wall between two towers — no `E_KEPT`, no `E_LEVEL`, every face outside the footprint (the old run's strip-line
     stretches and the new strips' ground included) byte-identical less the seam exception, every way the new strips
     meet cut at their boundary, the water gate's `Gate.banks` on its two `gate_end` vertices; an outer moat carved at
     S5a (§4.4) — every face outside its footprint byte-identical less the seam exception, attraction onto exactly its
     prepared vertices, every indexed role unique per ordinal and no contact name left; a carve chain that touches a
     finer edge away from its prepared vertices (`E_LEVEL` inside the clear region, `E_KEPT` outside); a canal across an
     open enceinte's glacis line and a river moved through a walled town — every indexed role unique per ordinal
     (§3.10), `Gate.banks` resolving to its two `gate_end` vertices, no `anchor` contact name left; a river moved away
     from a quay-lined and a walled bank — the quay and wall edges back at L1, the L0 view land and water only, a deck
     left over land at the way's level after F-REDERIVE (before it, at the level of its `deck_end` rows, with no L0 edge
     at it), its bank vertices unpinned; a deck whose bank vertex also carries a width knot, removed by F-REDERIVE — the
     vertex ends unpinned, its knot kept; new water across a corner of the frame — the border's stretch between its two
     contact points, the corner included, unchanged and closed; a declared preparation batch placing two contact names
     on one entity, its ops permuted — identical ordinals;
   * *removals, profiles and neighbour steps:* a lane removed from a spine it ended on — the spine's chain restored
     exactly, its own shape vertices untouched (the `split` flag, §2.2 rule 3); an S8 T-junction on a spine with a
     width profile — every sampled half-width unchanged; a way split between two width knots — every sampled half-width
     within 10⁻⁹ cm of its value before — then re-joined, giving the original profile bit for bit; a stretch of a way
     removed between two junctions and a stretch of a ring removed between two anchors — the rest of each chain
     unchanged, every remaining profile sample within 10⁻⁹ cm of its value before and every other role unchanged
     (`fixall_kernel_r4_checks.out` C); a removal that leaves a way in two parts without a `rekey`, refused by role
     consistency; II.1 (3)'s neighbour step beside finished plots — a plot-line end within `attractCm` of the foot
     (promoted; every plot ring unchanged) and one farther (a kerb split; each ring equal to its prior ring with the
     vertex removed) — then the street removed again, by an undo and by a reroll, at a promoted plot-line end and at a
     promoted footprint corner: the kerb's L2 route, index and digest and the block's, the plot's and the wing rings
     equal to those before the step; two neighbour steps on one kerb edge, the first street removed by a reroll — its
     plot-line end back at L3 and the kerb's L2 route equal to the route with only the second step
     (`fixall_kernel_r5_checks.out` A); a promotion that leaves another finer vertex 1.2 cm from its new route edge
     commits with no `E_INVARIANT`, and every index query whose box meets that vertex returns it;
   * *indexes, slots and the pool:* a pool overlay writing outside its district (`E_SCOPE`); a logged `moveVertex`
     replayed after an upgrade that puts an unrelated vertex 20 cm from its position — bound to the signature-matching
     vertex or orphaned, never to the unrelated one; a slot freed and reused inside a stage — the query returns the new
     item; a slot freed in one district and reused in another, the second district's partition rebuilt before the
     first's — returned as its new item, never as its old one; after a neighbour step and its removal by a reroll with
     no partition rebuilt in between, level-2 and level-3 queries over the kerb return exactly what they return after a
     rebuild; a `drawBoundary` that moves a kept block from district A to district B, B's partitions rebuilt before
     A's — every L3 query over the block returns each plot once, before and after A's rebuild; an L3 query in a block
     before and after S11 derives L4 there (two plots sharing their lowest-leftmost vertex with an L4 vertex on their
     shared edge) returns its results in the same order (`fixall_kernel_r3_checks.out` C); a pooled district beside
     the settlement perimeter commits plot lines ending on the backland part's inner edge with 0 unresolved crossings
     at pool sizes 0 and 3, and every freeze finds every dynamic grid and tombstone set empty after its rebuild (§3.3
     pool step 1); the frozen copy sent to a pool worker holds typed arrays only — no `Map` or `Set` reachable from the
     message;
   * *straight-skeleton fixtures (M0):* squares and rectangles at every centidegree 0°–90°; regular n-gons n = 3 … 64;
     equal-width strips; rotated L, T and U shapes; near-rectangles with a notch on a long side, which take the skeleton
     path and pass the validator (a 20 × 10 m rectangle with a 3 × 2 m notch: no roof line outside); 1 000 holed
     polygons; snapped rotated squares; plus B-CITY-lite's irregular footprints and district and water faces.

**Properties** (checked after every operation): output simple; nesting by index (every face inside its parent); no edge
shorter than `minEdge` from any writer, after every insertion and every warp step, and clearance ≥ `minEdge`; Euler
characteristic after every insertion; `remove(insert(x)) ≡ id` on the topology; **`splitFace` children tile the parent
exactly at the child level (integer `area2` equality)**; `mergeFaces ∘ splitFace` restores the ring and the id;
`corridorUnion` faces disjoint and covering; `offset(−d) ∘ offset(+d)` ⊆ original and `insetRing` empties monotonically;
**every straight-skeleton output passes the §3.8 validator — a connected graph inside the face whose number of
independent cycles equals the number of holes — or is a reported downgrade**; OBB contains the hull and collinear input
returns `E_DEGENERATE`; LIR inside the face; snap rounding idempotent and terminating within its bound; the `orient2d`
sign equal to a BigInt reference on adversarial triples; Poisson minimum distance ≥ r; differential agreement with the
CI oracles (Clipper2-WASM in Node, `polygon-clipping`) on booleans, `tileRings` (each ring's pieces against the oracle's result for that ring less every earlier ring, and a refusal — detail `overlap` — exactly where that result has a hole on a case whose rings keep §2.6's composition contract, at least `attractCm` apart except at their joints, so the overlay moves no vertex (§3.4); on any other case a refusal only where that result has a hole or two of its boundary parts lie within `attractCm` of each other, which attraction may join (§3.7)) and buffers, split by attraction (§3.7) — unattracted
cases with equal face counts and symmetric difference ≤ perimeter × 1 cm, attracted cases valid and within perimeter ×
√2 · `attractCm`, the harness reporting both shares per operation and drawing ≥ 10⁵ unattracted cases per operation;
roles preserved on coincident chains (a sliver between a spine and a shore keeps both); a declared batch's result
identical under any permutation of its ops (the callback-form test is §13.2's); renumbering the arena's slots gives
identical output; `clearFiner` after a refinement restores the coarser level exactly; mandatory chains never rejected
for precision; 0 stale references after every batch; every index query's answer identical before and after a rebuild of
the partitions it reads (§3.3); after every removal each edge's level is the lowest among its rows and no vertex is
coarser than every edge and role at it (§3.10's level-consistency row); save → load → save byte-identical and the loaded
arena passing every hard invariant (§3.9, §3.10); a 3 000 m relief fixture with a hill-acropolis site stores without a
clamp and D8 is defined on 100 % of the hydrology grid's land cells over frame and margin (§2.3); every routine returns
a typed result on the pathological corpus.

**Ladder coverage:** every rung of every ladder in §5.2 is reachable by a fixture, and each downgrade (medial axis, the
plain-roof downgrade, straight cut, substitution) is exercised; no roof line lies outside its footprint; 0 crashes on
the 1 000 holed polygons; a skeleton failure is never a crash and never a visual surprise.

**Fixtures added by amendments b (items 12 and 28; the kernel's rows in §3.4, in §3.7 and in §3.10).** *The underground
arena* (II.7): `corridorUnion` over a fixture of `tunnel` chains, where the kerb is the tunnel's external wall — a plot
line ending on it lands by attraction, and a tunnel junction yields wedges like a street junction. *The transient arena*
(the composition rungs', §3.4): the seed-tiling `area2` identity after random partitions of rect, L, T and curved-quad rings, a
rotated T's two wings, its stem crossing one side of the bar twice, clipped to tile as the faces of one overlay
(§3.4's seed clip) — every crossing vertex a vertex of both rings, the joint shared vertex for vertex, and the seeds
accepted; `tileRings` on a ring the earlier rings cover (no piece), on one they cut in two (two pieces, each simple and
counter-clockwise) and on an earlier ring wholly inside a later one (refused, `E_DEGENERATE`, detail `overlap`, naming
a vertex of the hole); a side two seed rings share becoming one edge; a seed vertex within the hot pixel
of another ring's side splitting that side, and one 20 cm from it refused with `E_DEGENERATE` (detail `seed`), the
construction moving nothing; overlapping seed rings, and a fixed ring outside the seeds or across a seed ring's side,
refused with `E_DEGENERATE` (detail `overlap`); a fixed bay with a slit and a cut; `mergeFaces` across a seed edge
refused with `E_STRUCTURAL`; the `readBack` order identical after a slot renumbering. *The re-cut* (item 28 (f)): the arena opened from the same seed rings with three kept
rooms and a chimney-stack ring on a partition wall passed as `fixed` — the kept rings and the stack ring come back as the
same polygons — every input vertex unmoved and in order, any added vertex within the hot pixel of one of their
sides — including a kept vertex split 25.3–25.9 cm from a seed corner in the earlier arena (the exact insertion,
§3.4) and a kept room on a rotated rect wing whose outer side four unkept walls split in the earlier arena
before the room's corners were placed on it, accepted with every corner within the hot pixel of that side's straight
line (the input sides as the arena's routes, §3.4); where a kept room's side lies along a joint, an unkept wall ending
on it, its end within the hot pixel of each of the three input sides it lies on; the faces' `area2` sum equals the seed rings' sum and the
stack's wall segment survives; a second call with no kept rooms reproduces the first cut.

=== END ===

=== REPLACE ### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT ===
### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT

* **Invariants.** The §5.3 suite runs by scope — batch-local invariants per batch, stage-end invariants per stage,
  save / load invariants per document, CI-only invariants (§5.3's digest-maintenance oracle among them, on every
  B-CITY-lite city) in the harness — on B-CITY: 1 000 seeds × the 4 `WaterSetting`s of §13.3 × 3 rungs in the nightly
  tier, 50 seeds per rung in the PR tier (§13.8), all three rungs from M1 (§1.1). Each invariant has an id, a severity,
  a count in the report and a CI threshold: hard = 0 per 1 000 cities; soft within its band.
* **The statistics record.** The **core record** is O(n) and is emitted by every generation within 4 ms at CITY
  (§12.4): counts per entity kind and class; areas per class and band; fixed-bin histograms per district and band of
  plot area, frontage, depth, footprint area and storeys; way length per class; the junction-degree histogram; turning
  per 100 m on ways resampled at 10 m; the walled share and built extent; ladder uses per cause and rung; every
  requested feature's delivery tier (§5.1 principle 7); stage timings. The **bench metrics** — detour index over sampled
  destination pairs, Moran's I, KS distances, junction-to-junction runs, orientation coherence and wall alignment,
  figure-ground metrics on renders (§8.5), tree nearest-neighbour and pair-correlation statistics computed from §8.10's
  stamped scatter — run through `stats(doc, { level: 'bench' })` on demand or in the bench, never on the one-click path.
* **Cost-model tests.** Each stage is timed on **nine sizes — three per rung: the band's bottom, its target and its
  top** — 1 500, 5 000 and 9 900 (TOWN); 10 000, 20 000 and 29 900 (CITY); 30 000, 50 000 and 120 000 (METROPOLIS)
  inhabitants, five seeds each, nightly (the METROPOLIS sizes reported from M1, gating from M2b). A stage's log-log
  slope of time against its declared work measure (its work-limit laws, §5.1 (5), §14) must not exceed **1.15** for a
  stage declared linear and **1.25** for one declared n log n; §12.3's per-rung cost laws are fitted on the same runs.
  **Work limits follow population:** each run reports, per stage, the F-WORK hit rate (work cuts per 1 000 batches), and
  CI fails when the rate at the top of a band exceeds the rate at its bottom by more than 1 per 1 000 — §5.1 (5)'s
  pre-decided coefficient fallback then applies and the sweep re-runs. **Index work** is fitted against commits × level
  size (§3.3). The budgets these runs time, and their measurement rules, are §12's: the per-edit cost and validation
  flatness across rungs (§12.6), the memory test per rung (§12.8), the first map by size (§12.5), the pan-and-zoom run
  during an A2 300-dpi export (§12.7), the model max clause judged on re-timed outliers (§12.3), the simulation module's
  occupancy test at M4b (§12.7), all taken in §12.1's timing phase.
* **Document tests.** The entity registry's path test fails when a type is missing from any path — generation, digest,
  render, export, persistence, edit, undo, migration (O11 a); export → import → export is byte-identical over the
  canonical form (O9 a, O11 c); the **document-size test** per rung holds ≤ 320 B per building at CITY (§2.9).
* **Stage contract tests.** The same inputs and stream give the same digest on Node x86 / arm64, Chromium, Firefox and
  WebKit, with workers on and off and pool sizes 0–3, beside §6.5 (9)'s determinism tests. **Op-order determinism:** a
  declared batch's ops permuted give the same result (§13.1); a callback-form stage run twice, on a slot-renumbered
  arena and inside the pool at sizes 0–3 gives identical digests (issue order; op permutation does not apply to it,
  §3.3). S8's working block equals S9's committed block (Hausdorff 0; §3.7). The stored `market.siting` cell `portRef` equals the median port demand fraction recomputed by running S0–S2 alone on every B-CITY harbour seed, from M1, where the scripted pass first sets it (§4.2 S3 (12); J-A24.43); a differing value fails. The per-stop placement digests of §13.3
  are the contract test of S13b; a stop placed whole and placed one unit per step gives identical placement digests
  (§8.3, §9.2). The stamp-tile asset's hash and rebuild tests and the view-data contracts are §8.3's; the shipped stamp
  tiles pass §8.3's seam check (§8.10).
* **Stage property tests.** 10 000 coast / island / fjord / sky outlines per intent → 0 self-intersections and 0 untyped
  loops; 0 overlapping or self-intersecting plots on concave, notched and curved blocks before any fallback; attached
  and party-wall shares on curved-street blocks inside the dense band; roster `manifest(P₂) ⊇ manifest(P₁)` for P₂ > P₁
  on 1 000 seeds; the stage-3 contract (the union of composed wings equals the outline, §2.6); the `ringed` fixture (≥ 3
  closed rings, radius CV ≤ 10 %); a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 % on ≥ 95 % of seeds,
  walled share inside its rung band, §4.2 S2); the derived-complete digest identical across district orders; opening a
  person leaves the digest, the log and the undo stack unchanged; **heights** on 100 % of buildings, wings, towers and
  wall runs, and on hilly golden seeds and after every terrain stroke 0 wings whose `baseCm` differs from the highest
  terrain sample under the wing plus the plinth, user-edited bases excepted (§2.6, §7.3 (a)); **0 `E_KEPT` on the
  one-click path** over B-CITY (a stage whose domain overlaps an earlier stage's kept content is a pipeline bug); every
  gate and weld vertex on its trace, and stage 1's trace within 40 m of its boundary except along an `on_enceinte`
  castle's shared stretch; 0 lanes crossing a wall strip and 0 L3 band faces split or cleared (NF-P5); 0 S7b claims
  meeting a wall strip; the seam exception (NF-P6) on New random of 20 districts per B-CITY-lite city; the union rule
  (composed wings = outline) on curved-street row fixtures with `quad` wings, including rear lines oblique to the
  frontage — bent party-wall chains, `corners` recorded, the ridge at the arc-length midpoints; decks on 100 % of
  way–water crossings, moats and canals included; harbour fixtures with a two-arm mole and a detached breakwater pass
  the crossing invariant as harbour works, and a `quay` way drawn across a river without a deck fails it (§5.3); the
  walled coastal harbour fixtures of §4.2 S3 (11) — the harbour outside the stage-1 region, with and without
  `moat: 'inner'`, sealed with `N = 0`, and a polycentric coastal town whose nucleus nearest the harbour has no unforced
  pick left — each with the harbour served, 0 non-gate ways reaching the trace, every way–moat crossing on a deck, roads
  leaving = the N main gates plus a harbour gate of §4.2 S3 (7) where one was placed, the harbour route at most 1.5 ×
  the plaza ↔ harbour least-cost lattice path with the wall ignored, and one main gate on the harbour side (§4.2 S3
  (4)); a river town whose growth leaves crossing sites unused — 0 site furniture and 0 site marks in the display list,
  every built bridge's span the way's own L1 edge; an epoch whose growth builds a site; a drawn bridge 15 m from a site
  builds that site, and one 30 m from every site adds a deck by one L0 shore-split batch, §5.3's crossing invariant
  holding throughout (§4.2 S1 (5)); a canal across the settlement perimeter — 0 district faces outside the perimeter,
  the land on both banks the hinterland's; `castle: 'on_enceinte'` with water in reach, with and without a city moat — 0
  trace–water crossings off a river's water gate, the outer-arc channel beside the shared stretch, the town side
  dry-ditched or plain by its row; every seam edge typed, a way-less shared reservation boundary typed `reserve` (II.5).
* **B-EDIT and the locality oracle.** §7.3 item 7 (i)–(iii) and (v), and (iv)'s byte identity of Regenerate (keep
  settings), run **once per sequence** — at its end and at one seeded random position — never per edit. Fixtures: the
  re-parenting set (`drawBoundary`, district merge and split, `outskirtToDistrict`, regenerate around a lock, the
  id-recycling case); terrain-brush sequences in both water modes, and course-knot, drawn-water and drawn-bridge
  sequences with §7.3 item 7 (v)'s assertions and its water-edit fixtures; table weight edits and row insertions; drawn
  features mixed with later attribute edits; epochs and rebases; an epoch after 20 edits and a Re-derive from S10 after
  20 edits, each at pool sizes 0 and 3 with identical digests, every freeze finding every dynamic grid and tombstone set
  empty after its rebuild (§3.3 pool step 1); undo and redo from several sessions and §6.5 (9)'s truncation, naming and
  version-pinned cases (§7.4); an undo after a reload of an unshared document undoing the pre-reload event (§7.4); New
  random on minimal scopes (§5.1 (6)); the naming-collision replay fixture (§7.3 item 7 (i)); the B-EDIT-lite identity
  fixtures (≥ 99.9 % of addresses kept under 1 cm perturbation, §6.3); §7.3 item 7 (vi)'s shared-edge identity, and
  Regenerate (keep settings) of a block holding a rich compound whose yard has a formal-garden grid and an orchard part
  with edges ending on the house wall — byte-identical to the one-click result, the wing rings after generation already
  carrying those wall vertices (§2.6); a warp over a square keeping its fountain, over a yard keeping a user-moved tree,
  and one halved by a pinned pin (§7.4); **§2.6's test** — a warp and a `moveVertex` over a built block with an L house,
  an overlapping T, a curved row of quads and a holed footprint: after each, every wing union equal to its footprint
  face (integer equality), every carried ring simple, every roof line inside its footprint, de-rectangled rects turned
  quads, a neighbouring plot re-fitted onto a shared party wall adding its corner to the wing ring along that wall, undo
  restoring every ring byte for byte and a replay reproducing them; and a building with a hand-built stored
  `Composition` — its composed wings the base wings each cut in two, a court on the footprint's hole, a tower centred on
  a corner and one inside, rooms in one wing — whose composed wings unite to the moved footprint face after each move,
  its rooms inside, its tower centres inside or on it and its wings reaching every storey the base wings reach with at least their area at each (the storey rule of §2.6's stage-3 contract), undo restoring it byte for byte — the stage-3 intake runs the
  same test with every fixture building's composition stored (§2.6); **load verification** — an edit within 100 ms of
  the state becoming editable on an edited CITY document, with a mismatch forced by a snapshot whose one moved footprint
  has its recorded digest recomputed to match, each choice taken in turn: the edit applies at once, and after either
  choice the session's digest equals the digest a fresh load of the saved document replays to, and that load reports no
  mismatch; the open-to-editable time against T(B); a snapshot with one moved footprint and an unchanged `model.digest`
  — its chunk hash rewritten, and not — reported as a corrupt cache and loaded by replay, never verified and never
  offered as the saved town, the session's digest after the replay equal to a fresh replay's (§2.9 steps 3–4); the same
  snapshot under a forced §6.2 (iii): "trust the saved town" and a save wait for the recomputation, the mismatch
  withdraws the keep, and the snapshot is never kept; a snapshot with one altered naming record — a corrupt cache when
  its `recordsDigest` is left as written; rewritten to match, loaded, reported by the replay as a records mismatch, the
  edits made meanwhile re-applied, then verified, and a corpus selection made afterwards renames exactly what a session
  that never saved renames; an Adjust made during load verification in an epoch-grown town, saved and reloaded, reports
  no records mismatch; a `drawBoundary` that moves surviving blocks, saved and reloaded, reports no corrupt cache;
  **naming inputs** (§6.3) — a selected user corpus and an edited naming row rename exactly the unedited names citing
  the changed slices, listed in the fate report and stored in the event, in a fresh and in a rebased document, every
  other name and naming record byte-identical, 0 duplicate ids and 0 silent re-binds; a bridge re-sited afterwards keeps
  its new name; an `editTable` of one naming grammar row renames exactly the unedited names citing it; a culture row
  with a street corpus and a district-name corpus, the street corpus replaced — every district and quarter name and
  naming record byte-identical; a frozen fixture whose naming row changed imports with its renames listed, and a New
  random made afterwards renames nothing outside its scope; a canal carved across a wall and a river move whose bank
  cuts a glacis line, each committing with 0 NF-P5 violations, and a lane drawn across a wall strip refused (§5.3); the
  20-epoch test — a TOWN with ≈ 30 % churn per epoch keeps its heap ≤ 1.3 × and its document ≤ 2 × those of a freshly
  generated town with the same live entities (M4); and **the thirteen MFCG asks of §7.4** as scripted scenarios, each
  reporting its locality share, its invariant results and its re-run cost against §12.6.
* **The faithfulness campaign (O9 c; §7.3 item 7 (iv)).** New random is judged by a campaign, not per sequence. Each
  nightly run draws **n = 800 regenerated scopes** from its B-EDIT New-random events — 400 block scopes and 400 district
  scopes, by a seeded draw; a night whose B-EDIT run holds fewer than 400 New-random events of a kind adds New random on
  seeded scopes of that kind in its B-CITY-lite towns until it has 400 — and for each generates **K = 50 from-scratch
  references** of the same scope: the same upstream state and context, rerolls 32 768 + i for i = 0 … 49, a range no user
  reroll reaches. For each of four statistics (median plot area, median frontage width, density, attached share) the
  rank r of the regenerated value among the K references counts the references below it plus a uniform draw from 0 … t
  over the t references equal to it (drawn from the campaign's own stream), so r is exactly uniform on 0 … K for a
  perfect regenerator, whatever K and however discrete the statistic. The ranks are binned into 10 bins of
  ⌊r · 10 / (K + 1)⌋ with expected counts proportional to the number of rank values each bin holds; a χ² test per
  statistic gives four p-values, and the campaign **fails when Holm's procedure rejects at family-wise 0.01** (the
  smallest p-value below 0.0025). Cost ≈ 40 800 scope generations (800 × 51), ≈ 12.5 CPU-min at §12.6's block and
  district costs (20 400 × ≈ 6.6 ms + 20 400 × ≤ 30 ms), inside the nightly budget (§13.8). **Calibration (executed,
  `docs/validation/bench/fixall_scope_r3_o9c_n800.py` → `.out`; `fixall_scope_r2_o9c_power.out`):** the four statistics
  move together, and at ρ = 0.8 a campaign of 400 scopes catches a +0.25 sd bias in only 92.2 % of nights and a 0.8 ×
  too-snug regenerator in 95.2 %, hence 800. At n = 800 a perfect regenerator fails 1.0 % of campaigns on continuous
  statistics (31 / 3 000 at ρ = 0.8, 15 / 1 500 at ρ = 0) and 1.4 % (14 / 1 000) on heavily tied, scope-varying discrete
  ones; a +0.25 sd bias and a 0.8 × too-snug regenerator are caught in 2 000 / 2 000 campaigns each at ρ = 0 and ρ =
  0.8 (95 % lower bound 99.8 %), a 0.6 × too-snug and a 1.5 × too-loose one in 500 / 500, and at ρ = 1 the bias in
  99.3 % and the snugness in 99.7 %; without the randomised tie-break a perfect regenerator fails every campaign on a
  tied statistic (`fixall_verify_scope_o9c_rank.out`). A failing statistic's histogram names the fault: a hump is too
  snug, a U too loose, a slope a bias. **A failed campaign is re-run once with the next campaign seed:** a perfect
  regenerator fails two in a row with probability ≈ 1–2 × 10⁻⁴, and a fault of the sizes above is declared on the night
  it first runs with probability ≥ 0.996 at ρ ≤ 0.8 (≥ 0.985 at ρ = 1). A second failure is a regeneration defect —
  entered in `known-defects.json`, and M3a does not exit until it is fixed (§16), because no threshold can be relaxed
  without passing a wrong regenerator.
* **Control sweeps.** §7.8's statistical monotonicity and continuity: 21 steps × 50 seeds at TOWN and CITY (nightly);
  METROPOLIS in the milestone tier. The population control's sweep also reports the F-WORK hit rate per stage, which
  must stay flat across each band as above.
* **Option-interaction matrix.** Every pair of toggles rendered and diffed; no option silently disables another (O12 c).
* **Documentation coverage.** 100 % of controls and entity kinds have a guide anchor (§14 `@plat/docs`); every in-app
  help link resolves (CI link check); the release notes list every open entry of `known-defects.json`.

* **Amendments b (items 8–31): hook tests and acceptance bars.** They are stated once, here (R9); the mechanisms they
  prove are at the homes §0.2 names, and the fixture ids the editing seats coined (`T⟨item⟩-⟨n⟩`) are kept. A bar is
  hard — 0 violations, or 100 % — unless it names a band. Each runs in the CI tier §13.8 names, from the milestone §16
  names (a stage-3 bar from stage 3's intake, *Staged by the owner's roadmap*); the bars of a staged engine run on hook fixtures, its conversions applied by hand,
  until the engine lands, when the same bars bind it. The entity registry's path test above covers every record and
  attribute §2.8's registry paragraph lists for amendments b — `Passage` and the tunnel's `navigable`, `headroomCm`
  and `closure` among them — with `Block.due` and `ElaborationRecord`, and the enumeration test the
  new event kinds (`rejectSite`, `placeAt`, `setEntrance`, `drawPassage`, `drawTunnel`, `placeAccess`, `sealPassage`, `openPassage`, `relet`,
  `densify`, `thin`, the seven plan events and `setRoomUnit`, `regenerate.rung` and the `convert` kinds of
  `DeclineOp`,
  `UseConversionOp`, `LadderOp`, `TerrainWaterOp` and `HiddenOp`). No golden exists before M1 (D-24), so none of the
  new attributes needs a declared shift.
  * *Decline and regrowth (item 8; §4.11).* (T8-1) every `DeclineOp` kind applied by hand on the golden TOWN undoes to
    byte identity; (T8-2) the regrowth-first fixture — a TOWN with 12 % of its buildings vacated, derelict or cleared by
    hand, then grown by +6 % population: 0 new S5 faces, ≥ 95 % of the delta placed inside the old plan, every
    vacancy-run share within ± 0.02 of its table share; (T8-3) 20 epochs of hand-applied decline and regrowth keep the
    address of every ruin, trace and superseded ring (100 %), and no cleared building gets a tombstone unless
    demolished or succeeded; (T8-4) the exposure function is monotone in each driver's weight, and its chance share
    equals the table's; (T8-5) the salvage ledger's credits equal the yields of the robbed and the cleared, are never
    negative, and every shortfall is reported; (T8-6) a CITY dropped below 10 000 inhabitants loses its islands over
    their dwell spans — waning, settled, fallen — never in one epoch; (T8-7) after a −6 % population fall on a TOWN
    whose buildings are let out, no building with a surviving household reads `vacant`, and every `relet` down marks
    an unstored plan rung `stale` and re-cuts a stored plan inside its own event (item 28 (f)).
  * *Islands (items 10, 13, 15; II.6).* (T10-1) 200 CITY seeds with `recipe.layers.islands` on: a town supply below the
    threshold gives 0 islands, and the supported area is monotone non-decreasing in the town's supply and in the
    carried districts' supply over the band rows; (T13-1) TOWN and village requests never carry a sky allocation; a
    CITY with the setting off carries none, and its ground digest equals the realism golden; (T15-1) 500 CITY seeds at
    the target at each of `wealthLevel` 0.5 and 1 with the setting on: for each count 0–3 the number of seeds drawing
    it lies within ± 3 s.e. of its expectation under II.6 (4)'s slot law at each seed's own h(S_town) — with the
    defaults a count of 0 has probability 1 − 0.6 · h(S_town); on 1 000 seeds of a hook fixture whose town supply gives
    h(S_town) = 1 every count 0–3 is observed; and hiding the sky layer changes no model digest (J-A15.01).
  * *The underground (items 11, 12, 14; II.6, II.7).* (T11-1) tunnel conversions by hand undo exactly; a `caveIn` given a stretch splits the tunnel at the stretch's widened ends (II.6, §6.3; J-A11.43) — the first-vertex part keeping the address, every part continuing the lineage, the chambers and access points re-pointed, and each underground block's `Frontage` that spans an end split there (each part beyond an end a new record with its kerb edges' rows, one spanning both ends of an interior stretch split in three, each part keyed by §6.3's rule for a split `Frontage` and re-pointed to the part it fronts) — closes only the plots fronting the stretch, leaves U1 holding on every plot, and its undo restores the one tunnel record and each split `Frontage`'s one record; no
    `EvolutionStrategy` plan on the hook fixture contains a tunnel `demolish` (a lint); a sealed tunnel persists at its
    address and reopens; (T12-1) a schema fixture of one underground neighbourhood — two navigable tunnels, a junction,
    six cells, one vault, one stair, two gratings — validates and passes every row of §5.3's U1–U3 family: each
    underground plot's frontage rows on exactly one navigable open tunnel run, no `way` chain and no `alley` face on
    the underground arena, every building's frontage side on its plot's frontage edge, ≥ 1 access per neighbourhood,
    every access point in public ground, a yard or — a `cellar_stair` only — a surface building
    II.7.3 admits (`undergroundAccess`, or a `secret` plot), every `grating` on public ground, 0 underground faces under an excluded ground face (also on
    B-CITY-lite with the `navigable` preset), and the underground stage's commit records holding 0 writes on the
    ground `PlatKey`; the underground reroll-isolation fixture leaves the ground byte-identical, and the cut-away or
    overlay draws one depth band at a time (§8.4); (T14-1) the TOWN
    existence draw's frequency over 1 000 seeds at three populations × three wealth levels lies within II.7.1's law
    ± 3 s.e. and never reaches 1; `Features.sewers` is true on 100 % of CITY and METROPOLIS seeds; a TOWN with `off`
    and a village request carry 0 tunnels; with the layer hidden a CITY's render matches, pixel for pixel, the render
    the same seed gave before the staged stages registered.
  * *Assignments (items 16–19; §4.7 S10b, S11; §4.11).* (T16-1) hard relation rows satisfied on 100 % of placed items;
    every unplaced item reported with its blocking rows and ≥ 1 closest option; soft-row satisfaction ≥ 95 % reported
    per city — O7 (b) extended: noxious trades downstream or extramural, water trades on water, the market hall at a
    tier-1 junction or gate, inns at gates; (T16-2) hard supply edges within their `maxDistanceM` on ≥ 90 % of items
    at generation, the rest reported; (T16-3) the one-solver contract — S10b's placement of a class and an `assign` of
    the same class from the same state give the same plots; (T16-4) the detour factor — block-raster distance against
    the way-graph Dijkstra within the factor's band on B-CITY at M1, the fallback a per-rung refit; (T17-1) a hand
    relocation keeps the use's address, the building persists vacant with its `formerUses`, and undo restores;
    (T17-2) a pinned assignment never moves under an epoch, and the use row of the churn cap holds; (T17-3) one seed
    with one circumstance timeline replays to a single digest of openings, closings and moves; (T18-1) a designation
    mutation keeps every kept part byte-identical (leaf digests) and leaves everything beyond the plot and its joined
    neighbour untouched (the locality oracle); (T18-2) locked parts are never subtracted; (T18-3) A → B → A by the
    inverse mutation is byte-identical when nothing else changed, and one change from one starting state yields one
    mutation record on every host; (T18-4) S11 run as a mutation from the empty design reproduces generation
    byte-identically; (T19-1) every roster class has a designation template with every band row (registry test);
    (T19-2) the size budget is monotone along prosperity (Spearman ≥ 0.9 over B-CITY) and continuous between adjacent
    samples by §7.8's rule on the template's continuous columns — two smiths a few streets apart differ by degree;
    (T19-3) a `setAttr` material change leaves the geometry subtree of the digest unchanged; (T19-4) with no epoch
    every residential building houses at least one household and at most its capacity (§2.6's function) — the households S10b placed in its slot (one to its template row's `households.built`) clamped into [1, capacity], but for the moves §4.7's overflow pass reports — every building S11 builds for a slot without `houses` (§10.2) houses none, no plot's site plan holds a `required` structure below its least `count`, and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46); on a dossier fixture whose squalid district's shells hold fewer households than their template rows, every household of the dossier's roster is housed — those no building has room for in a residential slot the `dossier` request re-provides in their district —, no building exceeds its capacity, and each re-provided slot is reported (§7.7 item 2; the dossier clause, from M3a).
  * *The dossier (items 20 and 22; §7.7).* (T20-1) a map delete of a dossier-backed element re-places it coherently from
    the same seed, every plot outside the disruption set byte-identical; (T20-2) by §7.7's lapse rule, the rejection lapses at
    a dossier event touching its block (the dossier-event clause) and at the first epoch whose population target differs
    from the one it recorded (the epoch clause, from M4), and an undo of a lapsing epoch that carried no dossier event restores the hold, while an `undo` naming a lapsing dossier event returns F-EDIT (§7.4); (T20-3) a blocked positive placement returns its blocking rows and ≥ 1 closest site;
    (T20-4) generator-added filler deleted, the dossier's housing re-provided elsewhere; (T20-5) the one-way
    door (item 20 (a)) — an enumeration of the bridge's message kinds (§11.3) finds no PLAT → host message that
    addresses the dossier (`doc.changed` carries map-document events only, `report.changed` the map's report), and over a
    B-EDIT sequence `report.changed` carries every rejection, placement, lapse, relocation and mutation record the
    sequence made (§5.4's entries); (T20-6) by §7.7 item 2, a map `unassign` of a dossier-backed element, a map `setAttr` of its use or class, a hand `convert` `closeUse` of its use or `mutate` of its plot to another designation, and a plot `join` or `split` whose fate would demolish the building that houses it each return F-EDIT with `rejectSite` and `placeAt` offered and change nothing, while a `relocateUse` of it commits, and a `revert` of it skips every later dossier event (`EditBase.dossier` set) that placed or re-designated it, its dossier content unchanged (§7.4; item 20 (c)) (the refusal clause); on a B-CITY dossier fixture whose dossier-backed use stands in a declining quarter, a hand `convert` `vacate` or `demolish` of the building that houses it returns F-EDIT, and in every epoch whose use step, redevelopment, population fall or conversion reaches the use or its building the use is never closed and its building is emptied or removed only after the use has moved — a pinned use keeping its building (§4.11's *Dossier content across epochs*) — with §5.3's dossier row holding after every epoch, and an `undo` naming an epoch that carried a dossier event in `EpochInputs.dossier` returns F-EDIT and changes nothing (§7.4) (the epoch clause, from M4; J-A17.01); (T22-1) the same history from
    the same seed gives one digest; (T22-2) two histories reaching one dossier give two valid maps whose differences
    are confined to their disruption sets; (T22-3) an over-budget dossier event lands and is reported; (T22-4) a
    brand-new map from a dossier holds every dossier element from the start, and everything outside the report is
    byte-identical after any dossier event.
  * *Emulation (items 23, 24, 26, 27; §7.6 with §4.2, §4.9 and §4.5).* (T23-1) with the parity presets `MFCG` and
    `FTG` every `extension` cell reads 0 or off and B-REF's parity rows hold; with the default preset the extensions
    run at their table values; a registry test that every table cell has `provenance.source` and, where it extends a
    reference, its `extension` marker; (T24-1) under the defaults the principal market sits on the plaza for ≥ 90 % of
    inland walled B-CITY seeds and elsewhere for ≥ 50 % of port seeds (§13.7's row); (T24-2) the market count equals
    the roster's demand; (T24-3) no two market reservations share an edge or lie within `market.minSeparationM`;
    (T26-1) wood area lies within the fuel and timber rows' demand, the import share reported; (T26-2) the `fill`
    mode at TOWN and CITY on flat fertile fixtures and `perimeter` at METROPOLIS or on hilly fixtures; under `perimeter`
    and `rivers` no farmstead plot exists and every farm household is allocated to a town district; on an arid river
    fixture at TOWN on flat fertile land the mode is `rivers` and every field lies within `riverBandM` of a bank but
    those of the band's reported shortfall, laid beyond it as `perimeter` lays them, and on an arid fixture without a
    river the mode reads as `perimeter`; (T26-3) with
    `reserveArable` on, fertile land outside the boundary ≥ the reserve wherever the fixture makes it feasible;
    (T27-1) a schema test that the band set has one `middle`, that every band-keyed table resolves a row or an
    interpolation for every band, and that the parity preset's household shares equal FTG's captured distribution;
    (T27-2) the shanty fixture — an average band of poor gives a shanty kind once half the stages have run, the
    extramural share reported.
  * *Terrain and water (item 25; §4.11).* (T25-1) a hand `reclaim` and a hand `siltReach` are byte-identical outside their
    footprint, in the carve fixtures' form (§13.1), and undo exactly.
  * *The plan rung and elaboration (item 28; §2.6 beside §2.8's record, §2.9's cache and §4.1's policy) — the B-PLAN fixtures.* 24 fixture
    buildings (rectangles, L and T shapes, a court closed by a U, a quad from a curved row, a rectangle carrying a round tower, a
    manor of three wings at unequal storey counts), each in six classes and three bands with one to four storeys, the
    entrance sets of item 29 and a cellar wherever the class row gives one; from stage 3's landing, the plans of every clicked
    building of B-CITY-lite as well. Hard: (T28-1) each room the programme marks hard is present; soft rooms are
    delivered, folded into a neighbour or dropped, each with its tier in the report; (T28-2) starting at the main entrance — and, for a basement whose `Basement.access` is `external`, at its outside door where step 3 opens one (§2.6 step 3) —
    openings and stair cores lead to every room of every storey; each entrance gives onto a room; a passage can be
    entered from either of its ways; (T28-3) stairs stacked — a stair core occupies one bay through all the storeys it
    serves, and the basement is entered by that core, through a trapdoor — the one `Basement.access` names, or the `trapdoor` core the plan reports where no bay of the core fits the basement ring or, for a walk-out, where no side of the ring is long enough for its door (§2.6's fallback, step 3; J-A29.25) — or, for any other walk-out (`Basement.access` `'external'`), by its outside stair; (T28-4) the outer walls
    coincide with the wings: on each storey the rooms together cover exactly the extents of the wings reaching that level
    plus the span ring of each passage a wing spans, at the ground storey only — the passage room (§2.6's fourth rung) —,
    each exterior wall segment sits along the edge of such an extent or span ring, each room's ring is simple and lies
    within its wing's extent at its storey (the passage room within its span ring), and no gap or overlap remains between rooms (§3.10's seed-tiling row per storey); (T28-5) each chimney rises from a hearth's
    column, and a dormer exists only where a roofed room needs light; (T28-6) one building state, one plan, host after
    host (§6.5 (9) applied at the building band); re-rolling the layout preserves the stair core, the wings and the
    entrances bit for bit, and re-rolling the roles keeps every ring and every opening's position bit for bit; (T28-7) no edit or
    re-roll of a plan touches anything beyond its own building; (T28-8) `plan()` meets §12.7's row at its median per
    building, one plan for each click, and the cache stays within §12.8's line; (T28-19) the JSON `plan` block validates against its schema
    and round-trips, and every storey scene's portals equal the plan's openings and entrances (§11.1). Soft bands, reported: no unit room used as a
    passage (its door count within its row's cap); corridors never doubled in parallel; the share of each storey given
    to circulation, by class and band; room areas ordered as their rows' target areas; unit and service rooms no shallower in the door
    graph than the shared and circulation rooms of their storey; a loop in the door graph only when a row calls for one (§13.7's row). Elaboration: (T28-9) click order
    changes no digest — one document elaborated in two orders has identical model, records and derived-complete
    digests, and the cache holds byte-identical results per (entity, rung, input digest); (T28-10) a `stale` rung
    re-derived by mutation keeps every surviving room's address, and viewing never re-derives a `current` rung;
    (T28-11) an evicted cache re-derives to the same bytes, and a corrupt cache chunk is dropped and re-derived, never
    trusted; (T28-12) clicking a neighbourhood makes its buildings' `wings` rung `current`; clicking a building does
    the same for `plan`, after `wings` where that is still absent.
  * *The interior ladder (item 28 (f); §2.6).* (T28-13) the owner's bar — when a building's occupants' band falls two
    rows, the re-cut plan houses every household of the building (`Building.households`, §2.6) with its own door off a
    corridor or stair hall, within unchanged wing rings and around an unmoved stair core; (T28-14) the shell stays
    byte-identical through any interior re-cut — its wings, entrances, heights, roof and basement — checked by the
    shell's leaf digest before and after the re-cut, a stored plan's rings read with the `composition`-role vertices its
    re-cut adds removed (§2.6's bar, §5.3's interior-ladder row), with §3.10's seed-tiling row proving the re-cut rooms
    tile that unchanged shell; (T28-15) re-uniting the households restores the earlier plan where nothing else changed — exactly for an unstored plan (§2.6's canonical chain); for a stored plan, every household's unit with its own door, the shell read without the `composition`-role vertices (§2.6, J-P48 (1)), and the subdividing event's undo restoring the plan byte for byte (§7.4) (item 18 (e)'s
    inverse); (T28-16) a schema test that every band of the band set maps to an interior row, and that every row names
    its unit, shared, staff, circulation and size columns; (T28-17) the owner's concern — after a district's two-band
    fall every roster household is housed without a new plot, bounded by each shell's capacity (the housing clause — in
    the base on a hook fixture, the `relet`s applied by hand), and no F-PLAN tier drops a household unit, a unit
    falling to the next poorer form first (the F-PLAN clause, from stage 3's intake); (T28-18) a hand `relet` above §2.6's
    capacity returns F-EDIT (the `relet` clause), and a `setRoomUnit` that would leave a unit without its own door
    returns F-EDIT (the `setRoomUnit` clause, from stage 3's intake); on a B-EDIT fixture a `setAttr` of a tenement's heights, a `moveVertex` that shrinks its footprint, a moved face of a passage it spans and a §7.6 edit of its template's `households.max` each lower its capacity below its households, and each edit's dry run lists the households past the capacity (the last in address order, a locked or pinned one passed over) with their `relocate` moves and holds that building and the receiving buildings in its effective scope; after commit no building houses more households than its capacity (§5.3); the undo of each returns every household to its former building byte-identically; and an edit whose excess cannot be re-homed — its locked and pinned households alone above the new capacity, or a household of no dossier's roster that no residential building of the district has room for — returns F-EDIT (§2.6's capacity rule; the re-homing clause).
  * *Entrances and basements (item 29; §2.6).* (T29-1) each building has one main entrance and only one, facing its
    street or its court (100 %; O5 (f)'s doorless count stays 0); (T29-2) no side or rear entrance without an access
    edge beyond the frontage, and the caps per class hold; (T29-3) no cellar under the flood band or on the water
    table's damp ground; (T29-4) every basement inside its ground-floor footprint and smaller, with its storey in
    `Heights` and its access by one of the three ways §2.6 gives it — the stair core, a trapdoor or, for a walk-out, an outside stair; the FTG entrance row of §13.5 stands for the main door; (T29-5) a VTT portal at every
    entrance of the set, and glTF and CityJSON basements below `baseCm` that validate (§11.1).
  * *Hidden plots (item 30; §4.6, §9.2).* (T30-1) every hidden plot is reachable by a chain of access edges — alley,
    court and passage faces — from a public way, 100 %; a sealed plot reads `sealed`, is reported, is never landlocked,
    and reopens; (T30-2) the hidden share per district lies within its target ± 0.03 — §4.6's band rows interpolated at the district's area-weighted mean prosperity value and scaled by its rung and density factors (§13.7); (T30-3) no label
    of a local or secret place appears at the settlement band without the viewer's knowledge key, and no secret name
    enters an export made under a view state without it; (T30-4) the parity presets and the village rungs produce 0
    hidden plots, and a hidden court passes §8.5's figure-ground metrics, reading as a court behind buildings; every passage with a `frontBuilding` has its `headroomCm` written and equal to §2.5's rule, after a heights edit of a spanning wing too, each base wing spanning it has at least two floors and an eave above that headroom, and a heights edit that would leave a spanning wing below two floors returns F-EDIT;
    (T30-5) by §11.2's knowledge rule, on a document holding a `secret` institution, `query` of every kind (`gazetteer`,
    `people`, `whereIs`, `relations`, `hit`, `inView`) and hover list its row with `withheld: true` at the `public` tier
    — a view-bound kind (`hit`, `inView`, hover) at every band coarser than the building band, the one band §9.2's table
    admits it at; a person working there naming it by its address only; the band-less kinds and a GeoJSON export
    withholding it as at the city band — and its name at `secret`; `export` of `.plat` and of a permalink under a
    `public` key fails with `E_KNOWLEDGE_TIER` and succeeds under `secret`; a bridged `export.request` for `.plat` from a client whose key is `public` is answered by `export.refused` carrying `E_KNOWLEDGE_TIER`, and never by `export.ready`; and by §9.5 a withheld place gets no number,
    letter or row in the legend.
  * *Prosperity change (item 31; §4.11).* (T31-1) after a re-cut every plot keeps ≥ 1 access edge and the class
    minimums, and party walls agree on both sides; (T31-2) granularity lies within the band's target ± tolerance;
    (T31-3) the churn cap holds for each kind, in each district and each block; (T31-4) no occupied building is
    removed by a band change — a redevelopment first vacates — and a plot `join` or `split` that would remove an
    occupied building returns F-EDIT ('vacate first') unless the user confirms the demolition as a fate, while one that
    keeps the building through S11's mutator commits (§7.1); (T31-5) generation-then-mutation equals the same history replayed; (T31-6) an undo of a
    fusion or a split restores rings, records and `builtBand` exactly, and a resurrected member takes `builtBand` from
    the event; (T31-7) a direct `setAttr` of `builtBand` is refused; a brush sets `builtBand` in its scope, and with
    no epoch the static base's digest is unchanged; (T31-8) a schema test that every class has a replaceability and
    every ladder row a duration per direction and replaceability. The floor's bars: (T31-9) across any run of epochs, no
    rung-1 or rung-2 event changes a plot's frontage edge or shrinks or re-cuts a shell of its buildings toward a poorer
    band — every change of its ring or its buildings' shells (read, as §5.3's epoch row reads them, without the `composition`-role vertices a stored plan's re-cut adds, §2.6, J-P48 (1)) matched to a lifecycle event the epoch recorded (§5.3's
    epoch row: a rung-3 event, rung 1's yard buildings, rung 2's back court, a designation or renovation mutation, a
    conversion — `wallToWay` and `contractWall` among them — or the growth step's regrowth builds, `demolish` and
    corridor re-cuts) — and its geometry band is at or above its floor; (T31-10) after a rung-3 event that builds, `builtBand` is the band of the new stock, and after an `amalgamate` that builds nothing it is the `builtBand` of the member whose frontage anchor the joined plot keeps (§4.11, J-A31.44); (T31-11) a rich → poor →
    rich run with no rung-3 event leaves rings and shells byte-identical, a stored plan's shell read without the `composition`-role vertices its re-cuts add (§2.6, J-P48 (1)), and returns the rung-1 and rung-2 attributes
    to the rich manifestation within the ladder's durations; (T31-12) with no epoch `builtBand` equals each plot's
    generation band and the geometry band equals the field band; a town and a metropolis each resolve their own middle
    band; every band set names its middle band.

=== END ===

=== RATIONALE-A ===
| J-A16.01 | Chose to price amendments b's build work by widening seven lines of §16's effort table by itemised amounts — O10 +4–5 pw (the one placement solver with its relation and supply data, the designation mutator, the dossier contract), O17 + O18 + O19 with O14-core +3–4 (designation templates and the compatibility table, the band set, the entrance set and basements, exposure, hidden shares and passages, and O14-core's farmland modes, fuel and timber rows and arable reserve), O9 +2 (the `Use` record and hand relocation, the plan rung's base hooks, the wealth-ladder edit kinds and the regrowth-first order of the grow path), O11 +1 (the knowledge key and filter with the reader's and every export's withholding, `report.changed`), the content line +1 (the parity presets and the marker, the new tables' rows), the verification rig +1 (the hook, B-PLAN and underground fixtures, the parity-preset run) and the unpriced-mechanisms line +1–2 (the transient arena and the M4 hooks) — +13–16 pw in all, the `states`, entrance-tick and arch-glyph rows and `live.stale` absorbed by the O12 line, carried by the milestone rows M1 +1 / +1, M2b +3 / +4, M3a +7 / +8 and M4 +2 / +3, so the rows still sum to the total of 166–220 (153–204 before amendments b), over absorbing the work silently or re-estimating the whole plan, because §16's own rule is "a pass that adds build work prices it here", and J-S43 set the precedent; the staged engines themselves are not priced, by the roadmap. Repair round 1 (2026-09-27) moved O14-core's farmland work from the should-have line, which the cuts paragraph offers for the owner's veto, to the must line O17 + O18 + O19, because it serves a must letter (O14-core (h)) and item 26's emulation default (VS-06); and it priced the rendering part's knowledge work on the O11 line rather than naming it absorbed, because it spans the reader, every export and the bridge as well as the app's lists (VS-22); the cuts then leave ≈ 135–174 pw for the base and ≈ 149–192 in total (§16, D-20). Repair round 3 (2026-09-27) moved §2.6's household capacity, with the programme rows' `circulation` share and least `room`-form area that it reads, from M3a's content to M2b's, because the generation fill clamps to it at S11 (J-A28.46) and T19-4 gates M2b; the closing round added to M3a the capacity re-homing on the edit paths and the re-provision of a dossier household's housing, which reuse the overflow pass, the `dossier` request and S11's operator that M2b and M3a already build; the work moves between the rows and is absorbed there, the rows' amounts and the total unchanged (verify-scope-r3 VS3-02; closing). The hand fix then added to M4's content the relocation of a dossier-backed use inside an epoch (§4.11's *Dossier content across epochs*, J-A20.43), which reuses the `dossier` request and `relocateUse` that M3a builds and is absorbed by the unpriced-mechanisms line's M4 hooks, M4's amount unchanged (verify-scope-r3 VS3-01; handfix-b verify-scope-r0 VSH-02). |

=== END ===
