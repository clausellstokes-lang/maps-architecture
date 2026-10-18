# Repair round 1 — SCOPE part (title, §0, §1, §13–§17, Delegated decisions, Judgment calls, Staged, Appendix A) — lane consistency/repair-scope-r1

Six blocks, each the complete text of the smallest subsection holding a fix, generated from the current
docs/ARCHITECTURE.md by exact substitutions (each asserted to match once), so everything else in a block is
byte-identical to the current text except the re-flow of a touched paragraph's tail at the 120-column width. The §16
and Judgment-calls blocks are `##` / `#` sections without subsections: each runs to the next heading of its own or a
higher level (§17; Staged by the owner's roadmap).

Issue → block: V-SCOPE-07 (= VDC-16; the determinism repair's §7.1 already states "its completeness test is §13.2's
(§2.8)") → §0.2 row 5. V-SCOPE-01 / V-MODEL-02 (hill-acropolis site), V-SCOPE-04 / VK-R0-10 (every other role
unchanged), V-SCOPE-05 / VK-R0-1 (outer moat at S5a), V-SCOPE-06 / VK-R0-13 (`insetRing`) → §13.1. V-SCOPE-02 /
V-MODEL-03 (§2.6's test, four clauses), V-SCOPE-03 / V-MODEL-04 (load verification, four pass criteria), VR-R0-12 (the
seam check as a pointer to §8.3) → §13.2. VR-R0-13 → §13.7 O13 (a). V-SCOPE-11 (closing paragraph) and V-SCOPE-05's
"§16 M3a may then point to §13.1" → §16. V-SCOPE-10 (J-DET-36 index row) and V-SCOPE-12 (J-S43 index row) → Judgment
calls.

Resolutions recorded (each vetoable):
* VK-R0-9 — the home §13.3 wins: the nightly cross-platform golden run samples pool sizes 0 and 3; §13.2's stage
  contract tests cover 0–3 on the five engines. §13.3 already says both, so no block touches it; KERNEL-084's "pool
  sizes 0–3 … is the proof" survives as that pair.
* VR-R0-13 — "next candidate" was the intent: §9.3 stated the mechanism ("takes the next candidate") before the scope
  seat's §13.7 cell paraphrased it as "§9.4's next ladder rung" (fix-all rounds 1–2), and §9.2's alternate order (its
  spines in order, then §9.4's ladder) is the rule that keeps both statements' meaning; "next ladder rung" alone would
  skip the trimmed spine (§9.3's second candidate), a mechanism change this pass may not make. §13.7's O13 (a) fallback
  now reads "takes its next alternate (§9.2: its next spine, then §9.4's ladder)"; §9.3's pointer to §13.7 stands.
* §16 M3a's exit no longer restates the carve fixtures and their bars (the restatement is what let V-SCOPE-05 drift):
  it points to the carve fixtures of §13.1–§13.2 (§3.3's clear regions), §3.3's pre-decided fallback kept.

Applied directly by this lane (V-SCOPE-10; not ARCHITECTURE.md): docs/ARCHITECTURE-RATIONALE.md — Part A's J-DET-36
row gains KERNEL-357's split-key passage, marked as amended by the consistency pass; the F.2 heading that carried the
instruction "append it to J-DET-36 or give it its own row" now reads "(inventory KERNEL-357; §3.9; appended to the
Part A row by the consistency pass)". Nothing else in that file changed.

=== REPLACE ### 0.2 Where the seven late owner rules (`docs/AMENDMENTS-2026-09-25.md`) land ===
### 0.2 Where the seven late owner rules (`docs/AMENDMENTS-2026-09-25.md`) land

Every clause of every rule is checked at its landing; where a rule has several clauses its landing carries a clause
map.

| rule | landing (the mechanism) | clause map |
|---|---|---|
| 1 greenery by prosperity | §4.9 S12b rule table (reads the prosperity field and the district kind; yard planting by plot class); §15.2 O19 | §4.9 |
| 2 floating islands (a toggle, staged by the owner) | §2.7 `SkyIsland` with its own terrain and a `reason` (prosperous quarter or unique institution); II.1 rule 5 (the sky call) and II.6 (the staged layers' hooks); §4.2 (island outline); §11 (per-layer export) | II.6 |
| 3 heights for shadows | §2.6 heights and the ground datum on every building, wing, tower and roof; §8.4 the shadow pass and the display list's shadow hook | §2.6 |
| 4 size ladders | §1.1 (both ladders; the `RungProfile` table; size within a rung follows population); §12.2 (bands and matched reference sizes); PART III (the village ladder THORP → HAMLET → VILLAGE and its ceiling) | §1.1 |
| 5 everything editable | §7.1 (the edit targets, clause by clause, and the edit-target table), §7.2–§7.6, §2.8 (edit paths in the entity registry, whose completeness test is §13.2's) | §7.1 |
| 6 prosperity a gradient and a band | §4.5 (the field, its drivers, bands only where a table needs one, continuous interpolation, evolution moves the field), §4.7 (interpolating rules), §7.2 (brush edits) | §4.5 |
| 7 adopted defaults | D-1–D-7, each FINAL and tied to its mechanism: the ink default and `lit` on Canvas2D; era rows refined by §13.9; the named fantasy toggles; the browser-first library under §17's checker; "mastered" through §13.6's protocol plus the parity numbers; naming through §10.4's packs; the weighting ordering the build (§16) | D-1–D-7 |


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
CI oracles (Clipper2-WASM in Node, `polygon-clipping`) on booleans and buffers, split by attraction (§3.7) — unattracted
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
  §3.3). S8's working block equals S9's committed block (Hausdorff 0; §3.7). The per-stop placement digests of §13.3
  are the contract test of S13b; a stop placed whole and placed one unit per step gives identical placement digests
  (§8.3, §9.2). The stamp-tile asset's hash and rebuild tests and the view-data contracts are §8.3's; the shipped stamp
  tiles pass §8.3's seam check (§8.10).
* **Stage property tests.** 10 000 coast / island / fjord / sky outlines per intent → 0 self-intersections and 0 untyped
  loops; 0 overlapping or self-intersecting plots on concave, notched and curved blocks before any fallback; attached
  and party-wall shares on curved-street blocks inside the dense band; roster `manifest(P₂) ⊇ manifest(P₁)` for P₂ > P₁
  on 1 000 seeds; the stage-3 contract (the union of composed wings equals the outline, §2.6); the `ringed` fixture (≥ 3
  closed rings, radius CV ≤ 10 %); a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 % on ≥ 95 % of
  seeds, walled share in band); the derived-complete digest identical across district orders; opening a person leaves
  the digest, the log and the undo stack unchanged; **heights** on 100 % of buildings, wings, towers and wall runs, and on
  hilly golden seeds and after every terrain stroke 0 wings whose `baseCm` differs from the highest terrain sample under
  the wing plus the plinth, user-edited bases excepted (§2.6, §7.3 (a)); **0 `E_KEPT` on the one-click path** over
  B-CITY (a stage whose domain overlaps an earlier stage's kept content is a pipeline bug); every gate and weld vertex on
  its trace, and stage 1's trace within 40 m of its boundary except along an `on_enceinte` castle's shared stretch; 0
  lanes crossing a wall strip and 0 L3 band faces split or cleared (NF-P5); 0 S7b claims meeting a wall strip; the seam
  exception (NF-P6) on New random of 20 districts per B-CITY-lite city; the union rule (composed wings = outline) on
  curved-street row fixtures with `quad` wings, including rear lines oblique to the frontage — bent party-wall chains,
  `corners` recorded, the ridge at the arc-length midpoints; decks on 100 % of way–water crossings, moats and canals
  included; harbour fixtures with a two-arm mole and a detached breakwater pass the crossing invariant as harbour works,
  and a `quay` way drawn across a river without a deck fails it (§5.3); the walled coastal harbour fixtures of §4.2 S3
  (11) — the harbour outside the stage-1 region, with and without `moat: 'inner'`, sealed with `N = 0`, and a
  polycentric coastal town whose nucleus nearest the harbour has no unforced pick left — each with the harbour served,
  0 non-gate ways reaching the trace, every way–moat crossing on a deck, roads leaving = the N main gates plus a harbour
  gate of §4.2 S3 (7) where one was placed, the harbour route at most 1.5 × the plaza ↔ harbour least-cost lattice path
  with the wall ignored, and one main gate on the harbour side (§4.2 S3 (4)); a river town whose growth leaves crossing
  sites unused — 0 site furniture and 0 site marks in the display list, every built bridge's span the way's own L1 edge;
  an epoch whose growth builds a site; a drawn bridge 15 m from a site builds that site, and one 30 m from every site
  adds a deck by one L0 shore-split batch, §5.3's crossing invariant holding throughout (§4.2 S1 (5)); a canal across
  the settlement perimeter — 0 district faces outside the perimeter, the land on both banks the hinterland's;
  `castle: 'on_enceinte'` with water in reach, with and without a city moat — 0 trace–water crossings off a river's
  water gate, the outer-arc channel beside the shared stretch, the town side dry-ditched or plain by its row; every seam
  edge typed, a way-less shared reservation boundary typed `reserve` (II.5).
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
  its rooms inside and its tower centres inside or on it, undo restoring it byte for byte — the stage-3 intake runs the
  same test with every fixture building's composition stored (§2.6); **load verification** — an edit within 100 ms of
  the state becoming editable with a forced mismatch, each choice taken in turn: the edit applies at once, and after
  either choice the session's digest equals the digest a fresh load of the saved document replays to, and that load
  reports no mismatch; the open-to-editable time against T(B); a snapshot with one moved footprint and an unchanged
  `model.digest` — its chunk hash rewritten, and not — reported as a corrupt cache and loaded by replay, never verified
  and never offered as the saved town, the session's digest after the replay equal to a fresh replay's (§2.9 steps 3–4);
  the same snapshot under a forced §6.2 (iii): "trust the saved town" and a save wait for the recomputation and the
  snapshot is never kept; a snapshot with one altered naming record — a corrupt cache when its `recordsDigest` is left
  as written; rewritten to match, loaded, reported by the replay as a records mismatch, the edits made meanwhile
  re-applied, then verified, and a corpus selection made afterwards renames exactly what a session that never saved
  renames; an Adjust made during load verification in an epoch-grown town, saved and reloaded, reports no records
  mismatch; a `drawBoundary` that moves surviving blocks, saved and reloaded, reports no corrupt cache; **naming
  inputs** (§6.3) — a selected user corpus and an edited naming row rename exactly the unedited names citing the changed
  slices, listed in the fate report and stored in the event, in a fresh and in a rebased document, every other name and
  naming record byte-identical, 0 duplicate ids and 0 silent re-binds; a bridge re-sited afterwards keeps its new name;
  an `editTable` of one naming grammar row renames exactly the unedited names citing it; a culture row with a street
  corpus and a district-name corpus, the street corpus replaced — every district and quarter name and naming record
  byte-identical; a frozen fixture whose naming row changed imports with its renames listed, and a New random made
  afterwards renames nothing outside its scope; a canal carved across a wall and a river move whose bank cuts a glacis
  line, each committing with 0 NF-P5 violations, and a lane drawn across a wall strip refused (§5.3); the 20-epoch test
  — a TOWN with ≈ 30 % churn per epoch keeps its heap ≤ 1.3 × and its document ≤ 2 × those of a freshly generated town
  with the same live entities (M4); and **the thirteen MFCG asks of §7.4** as scripted scenarios, each reporting its
  locality share, its invariant results and its re-run cost against §12.6.
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


=== REPLACE ### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30) ===
### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30)

Every threshold is in one of two classes and there is no third. **Reference-settable** bands are §13.5's, set by its band
rule from `baselines.json`. **Thresholds no reference can set** — the properties the references lack, which is where the
base claims to improve — are listed here: each has a number now (provenance "architecture 2026-09-25"), is confirmed at
the first milestone at which its mechanism runs, and has a pre-decided fallback. The corpus phase may later re-sign any
of them as a declared shift (§13.9).

**J-T, the calibration rule every table row and threshold cites.** Every value has a number now and a provenance
(§17.1 (6)); a reference-settable value is set from `baselines.json` by §13.5's band rule; any value may later be
re-signed only by a declared shift — an M-1 re-measurement, an owner pick on the panel of §13.6 (8), a calibration run
(§13.9); and no acceptance run treats an unset value as passed — a table with an empty cell fails to load. §4.7's
granularity table, §4.9's greenery table and this section cite it as "J-T".

**Fallbacks that move a threshold.** A fallback may change a *mechanism* (a table value, a weight, a radius) and
re-measure against the same threshold. A fallback that instead moves the *threshold* to a measured value makes the
letter pass by construction, so it is marked **not achieved**: the letter and the measured value are entered in
`known-defects.json`, reported in the parity report and the release notes, and never cited as evidence that an
improvement was achieved (§15.2's O class). The rows below say which fallbacks do this. An owner pick on the threshold
panel (§13.6 (8)) is not a fallback: it is the owner setting the number, with provenance "owner-eye ⟨milestone⟩".

| letter | threshold (number now) | confirmed at | pre-decided fallback if the confirmation fails |
|---|---|---|---|
| O18 (i) smooth field | p99 of \|∇P\| ≤ 0.5 per 100 m of the normalised prosperity field, outside hard seams | M2b: B-CITY measurement, and a §13.6 strip at σ = 45 / 60 / 90 m | σ rises one step (60 → 75 m) and the measurement repeats; an owner pick of σ sets σ, and the threshold is re-signed at that σ's measured p99 with provenance "owner-eye" |
| O18 (j) plot-size variety | within-district plot-area CV ≥ 0.25 for districts with ≥ 30 plots | M2b | the granularity rows' frontage CV rises from 0.25 to 0.35 and the measurement repeats; if still failing, the floor becomes the measured p10 — **not achieved** |
| O18 (h), O7 (f), S3 soft seams | across soft seams: Δ median frontage ≤ 25 %, Δ median plot area ≤ 35 %, Δ median storeys ≤ 1 | M2b | the fields' seam smoothing radius doubles and the measurement repeats; if still failing, the band becomes the measured p95 + 5 points — **not achieved** |
| O19 (d) canopy | tree nearest-neighbour p1 ≥ 0.5 × the class's mean crown diameter (orchard, avenue, garden); ≥ 0.3 × for woods | M2b (bench, §8.10's stamps) | the class's stamp spacing range (a table value, §4.9) is raised until its lower end meets the threshold — the scaled tiles' minimum distance is the entity's own spacing (§8.10), so the shipped asset does not change |
| O19 (g) city-zoom greenery | every green face ≥ 0.3 ha drawn at the city band with a short side ≥ 2 px; the green / ground and green / paper pairs at or above §8.2's contrast floors; no option coupling drops the layer | M2b, for `ink` and `lit` — the milestone that builds S12's greenery rules | the `green` role steps one value step from `ground` (a style row) and the check repeats |
| O12 (a) legibility floors | minimum drawn feature ≥ 2 px; area-label cap height ≥ 7 px (§9.4) | M1: B-ZOOM and a §13.6 strip at 6 / 7 / 8 px | the owner's pick; with no pick, 7 px stands |
| O13 (a) label curvature | a label's spine turns ≤ 45° over any window of the label's length (§9.3) | M1 | the spine's smoothing step doubles; a label still over the limit takes its next alternate (§9.2: its next spine, then §9.4's ladder) |
| O13 (c) name–feature consistency | a name that references a feature type has that feature within 250 m | M1 | the grammar's feature guard — which admits a feature-referencing name only when the feature lies within the guard radius — shrinks its radius from 250 m to 200 m, and the measurement repeats against 250 m |
| O7 (b) water-dependent trades | within 100 m of water | M2b | the placement score's water term weight doubles |
| O14 (b) farmsteads | every farmstead within 300 m of one of its own fields and within 1 500 m of all of them | M2b | the hinterland unit's S10 re-sites a violating farmstead to its fields' area-weighted centroid (§4.9) |
| O14 (c) wood edges | edge straightness (chord ÷ path length over 200 m windows) median ≤ 0.90; canopy fraction monotone in the wildness control | M3b | the edge-noise amplitude rises by half and the measurement repeats |
| O14 (e) built / map area | settlement-perimeter area ÷ frame area (without margin) within 0.06–0.25 at every rung and population | M1 | the frame side per rung is rescaled in `ladder.json` so the median ratio is 0.12 (a declared shift) |
| block-level use mix | residential-only blocks ≤ 60 % of blocks in core districts; per-block use-mix entropy p50 ≥ 0.5 bits; ≥ 70 % of trade households live at their workplace | M2b | the live-in default share of craft and shop rows rises one step (§10.2) |
| requested features | degraded delivery (tiers 4–5) on ≤ 5 % of requested features | M1 | the F-* ladder whose degraded rung fires most gets 5 instead of 3 tier-3 attempts and the measurement repeats; if still over, the band becomes the measured rate + 2 points and the top three causes enter `known-defects.json` — **not achieved** |
| O16 (c) scripted tasks | one UI action where a reference needs a detour; recovery = one undo; every app response ≤ 1 s | M1 (link, SVG, coast side, variants), M2a (undo), M3b (the rest) | a task over its action count gets a toolbar shortcut and repeats |
| O2 (c) carry-over | edited entities kept or carried ≥ 95 % for local actions and re-derivation from S7 on, ≥ 80 % from S4–S6, ≥ 60 % from S1–S3 | M3a (B-EDIT) | §6.3's doubled anchor radii with the IoU test; then an edited building or plot left without a successor re-imposes its last geometry as a drawn constraint |
| S4 (d) square area (stage 2) | typed squares (market, church forecourt, well square, bridgehead, crossroads) inside a district: 0.03–0.15 ha per 1 000 of its inhabitants, over districts of ≥ 1 000 inhabitants | M5 | the square-sizing rows (m² per inhabitant served, per square type) are scaled so the median is 0.08 ha per 1 000, a declared shift, and the measurement repeats |

Realism against real towns is measured by the corpus phase (§13.9), which the owner's roadmap stages after the
standalone generators; until then the base's realism evidence is the D-5 realism question and the P rows of §13.5, and
§15.2 says so.


=== REPLACE ## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2 ===
## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

*In plain words.* Before building anything we measure what we still need from the recordings and take a few small new
ones (FTG towns at two sizes, MFCG towns at five seeds per size), then build the riskiest pieces first as short spikes
with pass/fail numbers: the geometry kernel, the bent cut, the fused street layout with its speed gate, and the
determinism machinery. The first real milestone (M1) is a town the owner can look at next to MFCG and FTG. Because the
owner ranks editability first, editing comes next (M2a), before the second look and the rest of parity (M2b). Then full
editing and the API (M3a), the exports and the should-have extras (M3b), hardening (M4), the simulation module (M4b) and
stage 2 (M5). Effort is stated honestly as a range with its basis: about 153–204 expert person-weeks. The subjects the
owner's roadmap puts later are listed in *Staged by the owner's roadmap*; nothing else is out of scope.

Person-weeks are expert estimates (PLAUSIBLE) for two implementers plus a verifier seat — about 77–102 calendar weeks
at that staffing; staffing per the owner (architecture and rulings on Fable seats; build, verify and measure on Opus
seats). Every milestone ends on executed evidence, never on intention, and every exit writes its `MilestoneRecord`
with the milestone's declared shifts and fails on an undeclared one (§13.3). **The owner's panel at every gating exit:**
M2b ("the base at parity"), M4 ("mastered") and M5 (the stage-2 gate) claim their D-5 verdict only by a rated pass of
§13.6's protocol or by the owner's acceptance recorded in the `D5Record`; an unrated panel follows §13.6 (7) — the build
continues, the milestone's status is *provisional — not rated*, the claim is not made and the panel is offered again.

| milestone | content | exit criteria (executed, not asserted) | est. |
|---|---|---|---|
| **M-1 — calibration and the clean-room inputs** | `docs/CONFIDENCE.md` §6 **#5** FTG face recovery (block sizes inside rings, dividing-road position vs OBB, plot depth and frontage, FTG's plot share of land) and **#10** NG adjacent-footprint pairing; **#2** the NG size sweep; the NG baselines of `docs/IMPROVEMENTS.md` §7.2 (detour index, 4-way share, cycles per km², plot minimum-width distribution, streetwall gap per 100 m); NG's hollow-block frequency and MFCG's inner-lot removal; **the MFCG sweep at five seeds per matched size** (40 / 80 / 130, plain options, plus a river-and-coast variant) with lot-orientation coherence, wall alignment, walled and ribbon shares, district areas, gates, towers, castle and plaza, and every ⟨M-1⟩ number of §13.5 — streetwall continuity on dense frontages, lots per block, T / Y share, intramural dead ends, blocks per ha, inner-lot removal and street-edge recoverability on its plain renders (the metric of §8.5, implemented research-side and cross-checked against the product's implementation on M1's golden renders within 0.01); **FTG captures at BIG_TOWN and BIG_CITY**, three of each — one with FTG's water options nearest to `none` and two nearest to `coast+river`, each capture's id (its folder name), `WaterSetting` and recorded population (the residents its decoded payload holds) recorded in its README for §13.6 (2)'s pairs — over six days on the free daily allowance, decoded with the existing tools; outline anisotropy and turning per 100 m after 10 m resampling on every FTG payload; NG block counts per template at `medium` from the vertex captures; the variety dispersions of MFCG and FTG; **`baselines.json`** generated research-side with `referenceBuild` on every row and committed into `plat/`; **the sanitised implementer digest**, written by one seat and checked by another; the hashed content deny-list; `CLEAN-ROOM.md`'s seat ledger (§17.1) | every §13.5 baseline row present with its provenance — or, for an ⟨M-1⟩ number M-1 could not measure, the row made descriptive and entered in `known-defects.json` by §13.5's ⟨M-1⟩ rule — and every band computed by the band rule; a `docs/calibration/` record per experiment; FTG's six captures decoded, each with its resident count or §13.6 (2)'s nominal fallback, marked; the digest checker's report shows 0 code excerpts, 0 reference word lists, palettes or tables and 0 deny-list hits | 2–3 pw |
| **M0 — kernel, bent cut, fusion, determinism and site spikes** (risk retirement) | (a) `@plat/kernel`: lattice, predicates, one arena per layer with the levels as views, role and owner tables and reference resolution, attraction and contact semantics, batched transactions with stage-end index partitions, booleans / buffers / bands on the arrangement with the CI oracles, OBB / LIR, snap rounding, the straight skeleton with its validator and exact OBB roofs; (b) the **bent-cut transaction** with the hole slit, calibrated on NG's vertex captures after NG's signature is re-measured on curved, round-joined, triangular, C-shaped and holed faces; (c) the **fused-layout spike**: S4 routing + S5 growth + S8 infill on a flat synthetic site at CITY face counts; (d) the **determinism spike**: structured stream keys, lineage-hash minting, the Merkle digest, `dmath`, the time-dilation shim, the allowlist lint with its vendored scan; (e) the **site-and-fields spike**: S1 + S4 + S6 with §12.4's mechanisms; (f) the CI tiers timed on the runner (§13.8) | (a) B-FUZZ 0 crashes / hangs / invalid outputs on 10⁶ random inputs per primitive and on the whole constructive set (§13.1); insert + snap + attract + re-walk ≤ 8 µs per proposal, or §3.7's miss rule applied before M1; S11's geometry share ≤ 3 µs per plot median; §3.7's bars (i)–(ii) and §3.8's bar, with their pre-decided fallbacks applied before M1 if a bar fails; op-order determinism (§13.2); (b) start position σ within ± 0.02 of 0.066 (plain faces) and 0.098 (ring faces), corner within 0.10 of mid-course on ≥ 80 %, arrival ≥ 85° on ≥ 95 %, block-area and cut-length KS by the band rule — on curved, round-joined, triangular, C-shaped and holed faces; (c) **the fusion gate**: S4 + S5 + S8 ≤ 100 ms at CITY, block-area and junction-degree distributions inside the NG bands on the same district shapes and the MFCG street-signature rows of §13.5, no turn cliff, 0 whole-map restarts on 1 000 seeds — if it fails, §4.4's fallback applies before M1; (d) digests identical on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, 100 seeds; every stream key distinct; ≤ 0.1 µs per structured key; digest maintenance ≤ 5 % of stage time and a full recompute ≤ 150 ms at CITY; (e) S1 + S4 + S6 ≤ 50 ms at CITY, or §12.4's coarsening fallback applied and re-measured; (f) each CI tier inside its budget, or §13.8's fallback applied | 9–12 pw |
| **M1 — a viewable MFCG/FTG-class town** (the first product milestone) | S0–S11 with row / detached / hovel site plans and heights (compounds in M2b), at all three rungs (§1.1: METROPOLIS is in the goldens, B-CITY, the determinism tests and the diagnostic panel; M2b measures and tunes it); S3 reservations and gate sites; S5 with each trace before its stage's growth; S7 walls / gates / towers / castle; the eager allocation; S13a names with the quarter merge tree (quarter labels at the city band, district names at the district band); the `ink` preset at the city and district bands on the Canvas2D tile pyramid (its close-up and building bands at M2b); SVG / PNG export; **the `.plat` writer and reader for generated towns** (§2.9, §3.9) — the manifest, the content-addressed chunks with §3.9's geometry layout, gzip compression and an empty log — which the document-size test and the *preview* documents need and M2a's log builds on: a saved town of the running output version opens by decoding its snapshot and comparing its recomputed root with `model.digest` (M0's full recomputation), a differing root loading as a corrupt cache by regeneration from the recipe (§2.9 steps 3 and 5); **a document whose `outputVersion` is not the running one is never root-checked: it opens as §2.9 step 2's frozen view — each chunk checked by its content hash, the state decoded for view and export only, labelled "made with oK; not verified by this version" — with the offer to open its recipe under the running version and §6.4's preview notice; the `frozenImport` rebase arrives with M3a's rebases**; the records digest joins the snapshot at M2a, whose reader opens an M1 document of the running output version, which lacks it, by the same regeneration (§2.9 step 5); permalinks marked *preview* (§13.3); the report panel with delivery tiers; the B-CITY harness in the PR and nightly tiers; **the output-version stamp, the shift, cascade and milestone records in `plat/goldens/`, and the stage-isolated golden tooling with the per-stop placement digests (§13.3)**; `SeamContract` on every district; the derivation pool; the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1 (O2, O6, O3, O11 schema + PNG / SVG, O1, O4, O5, O18 with a flat field, O17 basic, O8 basic, O12 ink, O16-core). **Named work items:** the M1 content, authored fresh — roster rows for the M1 classes, households, the naming grammar and word lists, the era table, the `ink` palette (≈ 3–4 pw of the estimate); the app shell — one click, basic panel, report, gazetteer and "features in view", the keymap, the accessibility contract, context-help skeleton (≈ 2–3 pw) | the **D-5 protocol's first run** (diagnostic, §13.6) with its threshold panel; on B-CITY-lite (200 seeds × 4 water settings): 0 tier-6 omissions of requested features and degraded ≤ 5 %, plots with access 100 %, population ± 5 %; **the fusion gate re-run on B-CITY-lite's river, coast and relief configurations with the reordered stages** — pre-decided fallbacks: on time, §4.4's class-boundary move (growth stops at district-scale secondaries everywhere; lanes infill-only), then the CITY model budget re-declared at the measured p95 as a D-18 amendment for the owner's veto; on statistics, the infill band table gains a slope class (face mean slope < 5 %, 5–15 %, > 15 %) calibrated on NG's faces, and the gate re-runs; model within §12.3 at TOWN and CITY with the pool measurement (§12.3's rule for which configuration is primary at each size — its p95 within the pooled law + 10 % at the band's bottom, target and top, below a single worker's on the same generations, digests identical for pool sizes 0–3 on 200 seeds — with that rule's pre-decided outcomes); the label-composition measurement (§8.9); the figure-ground metrics against MFCG's M-1 recoverability, contrast matrix, `ink` symbolisation census, label floors and counts and hairline fidelity (§8.3, §8.5, §9.4); B-ZOOM's role continuity across `ink`'s city → district switch; placement digests identical on Node x86 and in the nightly five-engine run; the walled share and extramural ribbon share in MFCG's band (§13.5); the between-seed dispersion against MFCG's and FTG's; the B-EDIT-lite identity fixtures (≥ 99.9 %); the document-size test (≤ 320 B per building at CITY) and the generated-town round trip — save → load → save byte-identical over the canonical form on B-CITY-lite's towns (§2.9); **a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message**; the control-continuity sweep; the parity report by the band rule; every district carries a complete `SeamContract`; the scripted tasks of §13.4 that M1 supports, keyboard-only included; the first-map, settle and re-raster runs at TOWN and CITY band bottom / default / top (§12.5); the model max clause at TOWN and CITY, judged on confirmed outliers (§12.3); the furniture and snap query round trip (§8.9); the sliced-raster census rows (§8.3); the pan-and-zoom run during an A2 export (§8.9, §12.7); the stamp-tile asset load (§8.10, §12.7); the stamp tiles' seam check (§8.3); the sliced-placement census row, and the export's placement stepped in class 4 during the pan-and-zoom export run (§8.3, §8.9); the pin-pass B-ZOOM fixture (§9.2); the harbour pick's measurement on B-CITY walled coastal seeds — p99 of harbour route ÷ the least-cost path with the wall ignored ≤ 1.5, and if it fails the detour guard becomes the default (§4.2 S3 (4), (7)); the SVG export's transient-list peak (§12.8); memory within §12.8's lines at TOWN and CITY on generated towns at pool sizes 0 and 3 (the load-verification case is M2a's); the font-feature test (§9.2); the SVG and PNG export budgets (§12.7) | 35–46 pw |
| **M2a — the editing core** (D-7: before the second preset) | the log and the one replay fold over M1's document format; locks and pins; scoped faithful regeneration; the named actions (Regenerate keep settings, Adjust with the fate report, New random, Same kind new seed); undo / redo as logged events with per-session stacks, the independence check and unshared truncation (§7.4); per-document sessions (§7.4); load verification over M1's reader — the load's recomputation of the decoded state's own digest and of its records digest before its first edit, then edits applied at once during load verification with both mismatch choices (§2.9 steps 3–4); **with the keep, §6.4's link rule that the base is the recipe, with its message — a link is emitted only for a town that rule and §6.4's log rules allow, and a rebased town, a kept saved town included, is offered as its `.plat` file**; replay with S13a per event (§7.3); dry-run validation with conflicts returned as actions; `setAttr`, `delete`, `merge`, `split`, `join`; the app's selection, context panel, lock and the keymap's pointer idioms; B-EDIT at 10³ (PR) and 10⁴ (nightly) with the oracle once per sequence | O9 (a), (b), (d); the oracle's (i)–(iii) green on 10⁴ sequences; a CITY district undo ≤ 30 ms; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to CITY (METROPOLIS joins at M2b, which measures it); "recover from a mistaken regenerate" in one undo; the verification reference mix within §12.6's V + 10 %; open-to-editable within T(B) at TOWN and CITY, and the corrupt-cache fixture — a snapshot with one moved footprint and an unchanged `model.digest` reported and loaded by replay, never verified (§2.9 step 3); the records-mismatch fixture and the §6.2 (iii) keep-and-save gating fixture (§13.2); **a `keptSnapshot`-rebased town's link refused, its `.plat` file offered (§6.4)**; on the reference 300-edit CITY document, an edit made 100 ms after the state becomes editable applies within its §12.6 cost + 10 ms with pool size ≥ 1 (§2.9 step 3); memory at CITY while that document is load-verified, with a district regeneration and a Re-derive from S3 applied during it, within §12.8's line at pool sizes 0 and 3 — or §12.8's fallbacks applied; the rebased-document size test — a CITY document rebased by keeping the saved town, after 20 edits, ≤ 1.25 × the unrebased document, or §2.9's block-group fallback applied | 9–12 pw |
| **M2b — the base at parity** | the prosperity field with drivers and the brush; the full granularity law with the rung modifiers (§1.1) — joins, splits, alleys, back lanes, the deep-interior shares; S10b placement from the roster; compound site plans with the packer; roofs; S12 hinterland presets, greenery rules, outskirts and the suburb regime; harbour, bridges, canals; O13-core street names; O14-core; the bench statistics; **`lit` on Canvas2D at all four bands** with our procedural texture set (≈ 1 pw); **`ink`'s neighbourhood close-up and building band** with the roofs (§8.2); the relief tier; METROPOLIS measured and tuned, with the single-thread METROPOLIS measurement (§4.1), the compositor measurement (§8.9) and the projected-shadow budget measurement (§8.4). **Named work item:** the rest of the base content — the remaining roster classes, institutions, government and religion rows, the greenery and hinterland tables, the `lit` palette (≈ 4–6 pw) | every must-have letter run on B-CITY (1 000 seeds) against its §13.5 or §13.7 band — no letter without a number; every §13.7 threshold due at M2b confirmed or its fallback applied, O19 (g) city-zoom greenery for `ink` and `lit` among them; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS; B-ZOOM role continuity across every band switch of `ink` and `lit`; O17 / O18 / O19 runs; roster placed 100 %; site plans ≤ 5 µs per plot median; 300 dpi export; ≥ 60 fps at 40 k buildings; METROPOLIS first-map runs at 30 000 / 50 000 / 120 000 people (§12.5); the pool rule, the model max clause and the export-time peak at METROPOLIS (§12.3, §12.8); the query round trip at METROPOLIS (§8.9); open-to-editable within T(B) and memory within §12.8's line at METROPOLIS (§2.9 step 3, §12.8); the moving-sun step budget (§8.4); the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7); the METROPOLIS SVG budget (§12.7); the rung-profile orderings of §1.1; **the D-5 protocol passes** against MFCG (`ink`) and FTG (`lit`) at TOWN and CITY (METROPOLIS per D-31), or the owner's acceptance is recorded — unrated: *provisional — not rated*, and "the base at parity" is not claimed | 33–42 pw |
| **M3a — full editing, migration and the API** | warp kernels with whole-step validation; drawn constraints and the "rebuild around my drawings" rebase; assignments and the placement solver; rule-table overrides, the preference layer and the tables editor; migration and upgrade as undoable events with their diff; rebase; **retention of output versions N−1 and N−2** (§6.4); the dependency audit with the locality oracle at full scale; B-EDIT 10⁵ in the milestone tier; the handle-based embedding API (§11.2); the host bridge and `DocResolver` (§11.3, §11.5); S1's water and terrain operators with re-sited crossings and exact re-basing (§7.3), the water operator in §4.11's order with course-knot edits (§7.3 (b)); point-anchored records under a warp (§7.4); the carve edit with §4.11's way rule and the kernel's clear regions (§3.3); the `packs` block and the pack and host-content link refusals (§2.9, §6.4); the naming-input re-draws on table, pack and upgrade edits (§6.3 case (4)) with their renames stored in the events and carried by `confirm`, the dormant naming record of a protected name and field slices; the version-pinned checks of a rebased base across an upgrade and of a frozen view; packs held by a saved redo stack and packs a new version stops shipping; GeoJSON; the app's drawing, warp, brush, assignment and tables-editor tools | O9 (c) faithfulness — Regenerate (keep settings) byte-identical, and §13.2's rank campaign for New random passing in the nightly tier (a failed campaign is re-run once with the next seed; a second failure is a regeneration defect, fixed before exit) — (e) and (f), the thirteen MFCG asks as scripted scenarios; §7.3 item 7 (v)'s coarse-edit assertions on B-EDIT's terrain and water sequences; the carve fixtures of §13.1–§13.2 (§3.3's clear regions), or §3.3's pre-decided fallback applied before exit; B-EDIT 0 planarity violations and 0 lost faces over 10⁵ sequences; O2 (c)'s carry-over rates, or §13.7's fallback; goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped; the bridge convergence test (a host and three headless clients, 1 000 interleaved random events — undo and redo from every client and one owner undo through a chain among them, and one forced load mismatch settled by an owner's keep of the saved town while two editors edit on the replayed town — one digest, 0 lost accepted events; §11.3, §2.9 step 4); the naming-input fixtures of §13.2, in a fresh and in a rebased document (§6.3 case (4)); a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them; a kept-and-rebased CITY document upgraded across a field-driver change opens editable and replays to the session's digest, and a frozen o(N−3) fixture shows no mismatch message; a document using a pack the new version stops shipping reopens after `from` leaves the window; GeoJSON loads in QGIS with districts; the GeoJSON with trees byte-identical on the five engines (§13.3); the warp cost measurement — a 150 m brush over a CITY core on B-CITY-lite seeds, Apply within §12.6's budget with §2.6's wing carry and check counted, or §12.6's pre-decided fallback (one check after the final step, F-REDERIVE for a failure) applied before exit | 16–20 pw |
| **M3b — exports, forms and the should-have tiers** | VTT (Foundry-class scene JSON and dd2vtt, one scene per layer); glTF / OBJ; CityJSON; the CBOR twin with its decoder; S0–S4 proxy thumbnails; O10 intent expansion and the forms catalogue with its classifier; O13 full (path labels, addresses, the annotation layer and legend sheet); O14 full (rings, presets, wildness, feasibility); O16 full (drafts, discoverable export, the responsive editor); O12 extras (the low tier); the `@plat/docs` guide and generated release notes; three candidate `house` style sheets (D-1); the ink-family variants `parchment`, `bw-print` and `night` at all four bands (the `night` sheet's occupancy-driven window lights arrive with the module at M4b); random styles with the bounded repair (§8.2) | VTT import with no manual steps; every format validator green; scripted intent tasks 10 / 10; the forms classifier ≥ 90 %; six thumbnails < 1 s at TOWN; every scripted task of §13.4; monotonicity sweeps green at every rung; documentation coverage 100 %; B-ZOOM role continuity across every band switch of the ink-family variants; the random-style shipped-palette fallback ≤ 2 % of 10 000 draws per family (§8.2); the anchored CityJSON file validated with PLAT's extension, or the sidecar fallback taken and reported (§11.1) | 16–21 pw |
| **M4 — hardening and the incremental path** | the performance tiers and the low-end tier measured on the named device (§12.1); the table-provenance audit; **the one incremental path: add a growth stage to an existing town** (surviving entities byte-identical, new entities on epoch components, wall → ring road as `retypeEdges`; §4.11, D-25); output version 1 fixed, ending the *preview* label; release notes naming known defects; **the D-5 protocol's "mastered" run**, with the owner's pick among the three `house` sheets (§13.6 (8)) | nightly cross-platform goldens green for two weeks; the epoch test (0 re-rolled survivors); a document with interleaved edits and two epochs replays to the session digest; the conversion test; the 20-epoch heap and document budgets (§13.2); METROPOLIS first map within §12.5's law at 30 000, 50 000 and 120 000 people; "mastered" claimed only when the D-5 protocol passes, rated, at all three rungs (METROPOLIS per D-31) or the owner's acceptance is recorded — unrated: M4 closes with "mastered" *provisional — not rated* and the panel offered again at M4b, M5 and every release; every table value replaceable with provenance | 11–16 pw |
| **M4b — the content module `@plat/sim`** (after the relation store's schema, which is in the base from M1) | the relation store materialised (family units, relations, memberships); postings and re-matching; occupancy and schedules as a query; the calendar; factions with roles, goals and reconciliation; religions' meetings; events as templates; the economy and personality content of D-32 with its authored tables; the family-tree view | O7's module letters (§15.2); one hour for 50 000 people ≤ 50 ms (§12.7); a scoped regeneration changes 0 relations outside its scope; the family-tree view keyboard-operable and pins nothing | 8–14 pw |
| **M5 — stage 2: neighbourhood composition** | `@plat/hood`: `RingFabric`, `SquareFabric`, `StreetFabric`; the block-content dispatch table and pins; the `hatched` family at all four bands (§8.2); the close-up workflow on any district and on an arbitrary boundary (sky context); the "same kind, new seed" per-district workflow with locks | every district of every B-CITY city opens as an NG-class close-up; portals connected 100 %; shared-edge geometry byte-equal across adjacent neighbourhoods (Hausdorff 0); per-district regeneration ≤ 30 ms and open ≤ NG's 10–96 ms at comparable counts; footprint hash identical to city LOD; every stage-2 letter of §15.2 (S1–S6) run against its number, S4 (d)'s §13.7 band confirmed or its fallback applied; B-ZOOM role continuity across every band switch of `hatched`; the stage-2 gate claimed only when **the D-5 protocol against NG** (twenty pairs over the four templates, §13.6 (2)) passes, rated, or the owner's acceptance is recorded — unrated: M5 closes *provisional — not rated* and the panel is offered with every release until it is rated | 14–18 pw |

**Effort, with its basis (D-20).** Re-derived line by line (PLAUSIBLE; each line a range with its basis):

| line | pw | basis |
|---|---|---|
| parity floors after sharing: (MFCG 46 + FTG map subset 52) × 0.65–0.75 | 64–74 | `docs/CONFIDENCE.md` §1; sharing the kernel, the display list and the document removes 25–35 % of the two floors, not 50 % |
| O1 terrain and hydrology beyond the references' water | 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes |
| O9 document and edit system (events with inverses and undo records, dry run, locks, scoped regeneration, the named actions, rebase, migration with diff, retention, the locality oracle, B-EDIT) | 9–13 | neither reference has it |
| O12 renderer beyond the floors (columnar display list, paint programs, tile pyramid and tile worker, label composition, SVG, print bands, `lit` on Canvas2D, the relief tier) | 4–6 | one drawing path; no second backend |
| O11 exports and interop beyond PNG / SVG / GeoJSON (VTT × 2 per layer, glTF / OBJ, CityJSON, CBOR, CSV, the handle API, the host bridge and resolver) | 5–7 | §11 |
| O17 + O18 + O19 (plot model, site plans, packer, heights; the field and the granularity law; greenery rules) | 7–11 | new in both references |
| O10 (intent expansion over ≈ 200 parameters, the forms catalogue, assignments, the placement solver) | 4–6 | forms tuned by eye and the D-5 panel |
| should-have "full" tiers (O13, O14, O16, O12 extras) | 4–6 | §15.2 should rows |
| original content under the clean room (≈ 60–100 roster classes, institutions, households, government and religion rows, naming grammar and corpora, era tables, presets, the symbol set, the procedural textures) | 8–12 | ≈ 40–50 % of CONFIDENCE's 25 pw FTG content line (§3.4's re-pricing), plus presets and symbols |
| `@plat/sim` (relations, postings, schedules, calendar, factions, events, economy and personality) | 8–14 | inside FTG's 125 − 52 = 73 pw non-map scope; the relation schema already in the base |
| the reference app's UI (panels, drawing and snapping tools, four field brushes, the tables editor, the style dialog, the advanced panel over ≈ 200 documented parameters, accessibility, context help, keymap) | 7–10 | no reference line covers it |
| the verification rig (five benches in three CI tiers, stage-isolated goldens with shift and cascade records, the five-engine nightly run, visual regression, the option matrix, control and cost-model sweeps, `baselines.json`, the clean-room scanner, the D-5 tooling) | 7–10 | §13 |
| mechanisms the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine; the six components below) | 8–11 | 5–7 for the first group; 3–4 (≈ 14–22 working days) for the six components itemised below |
| **base subtotal (M-1 – M4b)** | **139–186** | |
| stage 2 (M5) | 14–18 | |
| **total** | **153–204** | equal to the milestone sum above |

**The six new components** priced by the last line's 3–4 pw (≈ 14–22 working days; PLAUSIBLE): the per-name naming
records and the renames an edit confirms (§2.8, §6.3, §7.1; M1 writes the records, M3a stores the renames), ≈ 3–4
days; `carryWings`, the carry of a stored composition and the wing check decided by pairing (§2.6; M1 in generation,
M3a under warps), ≈ 4–6; crossing sites as a `Bridge` in state `site` and their handling in S1's water operator (§2.7,
§7.3 (b); M1 and M3a), ≈ 2–3; resumable raster jobs, S13b as a resumable placement job and the tile worker's four-class
queue (§8.9, §9.2; M1), ≈ 3–5; the records digest (§6.2; M2a), ≈ 1–2; the shipped stamp-tile asset, with its shared
seam band, and its build tool `plat/tools/stamptiles/` (§8.10; M1), ≈ 1–2 days. The other mechanisms of the same kind
are refinements a line already prices, absorbed by that line (PLAUSIBLE): the load's digest recomputation, its
corrupt-cache path, the version-pinned root checks and the keep-and-save gating (the O9 line's load verification); the
pack held by a saved redo, the pack copy at an upgrade and the link refusal for a kept town (the O9 line's retention and
migration); demotion, `StretchRef`, tombstones per partition, the water-gate hold and the deck strip (the parity floors'
kernel share and the arrangement work); the forced harbour pick and the detour guard (the parity floors' gates and
harbour); the pin pass (the label placement engine); and the integer-centimetre tree positions with their lint, the
PNG row-filter rule and the quantised light steps with their light pass (the O12 renderer and O11 export lines). The
milestone rows carry the six components where they are built — M1 + 2 / + 3 pw, M3a + 1 / + 1, M2a unchanged — so they
sum to the total. **A pass that adds build work prices it here:** it names each new mechanism with the line that
absorbs it, or widens a line by an itemised amount and keeps the milestone rows equal to the total.

The cuts that would shrink the total are recorded for the owner's veto, not applied (J-S6, D-20): the module M4b
(8–14 pw); VTT, glTF / OBJ, CityJSON and the CBOR twin (≈ 3–5 pw); all but three forms (≈ 2–3 pw); the should-have
"full" tiers (4–6 pw) — together a base of ≈ 122–158 pw and a total of ≈ 136–176 pw.

The riskiest items, in order: the fusion timing and statistics on real terrain (M0 c, M1); the bent-cut engine on
concave and holed faces (M0 b); the kernel's own booleans and bands (M0 a; §3.7's pre-decided fallback); the straight
skeleton's robustness (M0 a); the content authoring cost (M1, M2b, M4b — CONFIDENCE §3.4's re-pricing is the warning);
the thin CITY budget headroom (§12); the D-5 protocol's dependence on the owner's time (§13.6 (7) answers it: an
unrated panel never stops the build and never lets a gate be claimed).

**Staged by the owner:** the subjects the owner's roadmap places after the base — stage 2 at M5 above, the others staged
by the owner — each with concrete hooks, are the one list in *Staged by the owner's roadmap*; nothing else is out of
scope — CityJSON is built (§11.1), the host-input contract is decided (§11.4), sharing needs no hosted service (§11.5),
setting packs have their format (§10.4), there is no WASM kernel (§3.7), and the relief tier is a base program (§8.2).


=== REPLACE # Judgment calls ("chose X over Y because Z"; each vetoable) ===
# Judgment calls ("chose X over Y because Z"; each vetoable)

Every judgment call is vetoable. Its full text — the choice, the alternative rejected and the reason — is in
`docs/ARCHITECTURE-RATIONALE.md` (Part A); this index names the choice and the section that states the rule it chose.
J-1 – J-18 are the synthesis seat's; the area rows keep their prefixes — J-K (kernel), J-DET (determinism), J-P
(pipeline), J-R (rendering), J-S (scope) — because the sections cite them by those ids; the J-I rows settle a
disagreement between two area drafts.

| id | the choice | where |
|---|---|---|
| J-1 | the kernel proposal as the base, with the other proposals' mechanisms grafted | §0.1 |
| J-2 | districts typed and fields solved before the bent-cut infill | §4.5, §4.6 |
| J-3 | FTG-shaped growth for the secondary streets outside the walls | §4.4 |
| J-4 | plat-tree scoping as the primary locality mechanism; the dependency graph as audit | §7.3 |
| J-5 | a 128-bit key hash with 32-bit-lane mixing | §6.1 |
| J-6 | `FaceRef` unions with half-corridor strips and junction wedges; nesting exact by construction | §2.2 |
| J-7 | batched transactions (stage / district / block / edit), static indexes rebuilt per partition | §3.3 |
| J-8 | a snapshot-plus-replay document | §2.9 |
| J-9 | IMPROVEMENTS' J-S scope for the simulation | §10.1, D-10 |
| J-10 | Poisson k = 50, ranked tiles built with the product and shipped | §8.10, D-11 |
| J-11 | `dmath` as our own port of fdlibm | §3.1, D-23 |
| J-12 | one generation worker plus a derivation pool, the merge protocol written first | §4.1, §12.3 |
| J-13 | the greenery table, control rules, control budget, forms schema and intent example written here | §4.9, §7.7, §7.8 |
| J-14 | CONFIDENCE §6's experiments #5, #10 and #2 as milestone M-1 | §16 |
| J-15 | M1 re-cut to the viewable town; the honest effort range | §16, D-20 |
| J-16 | the anchor rule with `supersedes` on top of lineage-hash addresses | §6.3 |
| J-17 | the codename PLAT | D-19 |
| J-18 | running the lane on a relayed status question | rationale file |
| J-K1 | one arena per layer with the five levels as views | §2.2 |
| J-K2 | vertex, segment and stretch attraction at 26 cm | §3.6 |
| J-K3 | role and owner tables with resolved views | §2.2 |
| J-K4 | booleans, buffers and bands on the kernel's own arrangement, one engine on every host | §3.7 |
| J-K5 | an in-house straight skeleton under a numeric contract and validator; exact OBB roofs | §3.8 |
| J-K6 | static indexes rebuilt per partition (per district, plus one outside districts) at §3.3's three moments, queries sorted by a canonical key | §3.3 |
| J-K7 | `Int32` centimetre heights relative to a per-document datum | §2.3 |
| J-K8 | no WASM kernel; a byte-identical WebAssembly accelerator only for a missed hot loop | §3.7 |
| J-K9 | role-carrying vertices for entity-held vertices; role signatures for log positions | §2.2 |
| J-K10 | knot profiles for varying chain attributes | §2.2 |
| J-K11 | promote a finer vertex a coarser batch lands on | §2.2 |
| J-K12 | one hydrology grid | §2.3 |
| J-K13 | a magnitude-triggered flush at 2⁵² for `area2` | §3.2 |
| J-K14 | finer content of an earlier stage kept as an obstacle (`E_KEPT`) outside a clear region | §3.3 |
| J-K15 | two transaction forms: declared op sets in canonical order, callbacks in issue order | §3.3 |
| J-K16 | read-only transferred arena copies with one copy-on-write overlay per district | §3.3 |
| J-K17 | one endpoint rule and one constrained placement rule for every new or moved vertex on an edge | §3.6 |
| J-K18 | a warped vertex slides along the fixed coarser route it lies on | §3.6 |
| J-K19 | strict oracle comparison on unattracted cases, an attraction bound on attracted ones | §3.7 |
| J-K20 | S11's geometry share (≤ 3 µs per plot) as the kernel's M0 bar | §3.7 |
| J-K21 | a convexity gate on the exact OBB roof path | §3.8 |
| J-K22 | typed-array open-addressing tables for the role and owner heads | §2.2 |
| J-K23 | cut knots carrying the exact sampled value | §2.2 |
| J-K24 | a coarse insertion's permitted contacts named explicitly (`KernelTx.prepared`) | §3.3, §3.6 |
| J-K25 | S10's eager step (0) ends with an L3 partition rebuild, so every dynamic grid is empty at the freeze | §3.3 |
| J-K26 | the `split` flag cleared on a move except a re-seat onto, or slide along, its own edge | §2.2, §3.6 |
| J-K27 | a move batch keeps nothing and holds locked and pinned geometry | §3.3, §3.6, §7.2 |
| J-K28 | demotion: an edge takes the lowest level among its rows | §2.2 |
| J-K29 | `gate_end` roles on a fresh `Gate` for water-gate bank vertices; transient `anchor` contact names | §2.2, §3.3, §3.4 |
| J-K30 | a warp step's re-seats and slides placed one at a time in canonical order | §3.6 |
| J-K31 | a batch-local `StretchRef` for removing and retyping part of a chain | §2.2, §3.4 |
| J-K32 | a placement bound for the hot pixel and index boxes | §2.2, §3.3 |
| J-K33 | the first stage of §4.1's order as a move batch's `rederivesFrom` | §3.3, §4.1 |
| J-K34 | tombstones for every item a batch deletes, re-levels, changes or moves to another partition | §3.3 |
| J-K35 | a water gate's `gate_end` vertices held under a warp unless `fromLevel = 0` | §2.2, §3.6 |
| J-K36 | a pinned, registry-confirmed `robust-predicates` 3.0.3 with an in-house BigInt fallback | §3.1, §17.4 |
| J-DET-1 | opaque address ids hashed from the entity's lineage key | §6.3 |
| J-DET-2 | lineage kept only for entities surviving un-derived; successors get the address only | §6.3 |
| J-DET-3 | operation-count work limits for every output-affecting budget | §5.1 |
| J-DET-4 | a Merkle digest maintained at batch commit | §6.2 |
| J-DET-5 | version stamps, rule slices, derivation inputs and deps kept out of the model digest | §2.8, §6.2 |
| J-DET-6 | one ordered replay fold for constraints, epochs, rebases and upgrades | §7.2, §7.4 |
| J-DET-7 | a `rebase` event when a saved state is kept | §2.9 |
| J-DET-8 | scoped undo records and cost-driven checkpoints | §7.4 |
| J-DET-9 | output versions bump only with a declared shift; N−1 and N−2 retained | §6.4 |
| J-DET-10 | an edited attribute is implicitly pinned | §7.2 |
| J-DET-11 | lock > assignment in the precedence order | §7.7 |
| J-DET-12 | the prosperity, density and greenery fields recomputed on load | §2.9 |
| J-DET-13 | control monotonicity and continuity stated as rules | §7.8 |
| J-DET-14 | `drawBoundary` snaps to whole L1 cells | §7.1 |
| J-DET-15 | MFCG's Rotate as a view rotation with a model-north compass | §7.1 |
| J-DET-16 | undo and redo as logged events at the head, per-session stacks, an independence check | §7.4 |
| J-DET-17 | non-shipped pack content copied into the document; links needing it refused | §2.9, §6.4 |
| J-DET-18 | an upgrade's undo record is its `from` version; a rebase's is its previous base | §7.4, §7.5 |
| J-DET-19 | content-addressed snapshot chunks per static-index partition | §2.9 |
| J-DET-20 | New random advances an unchanged scope entity's reroll up to `reroll.maxAdvance` (default 3) times | §5.1 |
| J-DET-21 | S13a's scoped delta runs at each event's log position in replay | §7.3 |
| J-DET-22 | `labels` removed from the rerollable concerns; rerollability a registry property | §6.1 |
| J-DET-23 | S1's water operator re-sites crossings and chains S4–S7 in §4.11's order | §4.11, §7.3 |
| J-DET-24 | the terrain brush defaults to `water: 'locked'` with exact re-basing | §7.2, §7.3 |
| J-DET-25 | work limits as laws | §5.1 |
| J-DET-26 | grid-bucketed nearest-neighbour succession matching per kind | §6.3 |
| J-DET-27 | a failing control gets a smoothstep, then becomes a declared discrete control | §7.8 |
| J-DET-28 | byte identity for the WebAssembly accelerator; Clipper2-WASM only as a declared golden shift | §6.5 |
| J-DET-29 | S10's step (0) re-run one-sided for a scope's own side of every shared edge | §7.3 |
| J-DET-30 | a river's control knots as S1's recorded input, addressed by body and ordinal | §7.1, §7.4 |
| J-DET-31 | point-anchored records carried by mean-value coordinates through warps | §7.4 |
| J-DET-32 | harbour works admitted by topology | §5.3 |
| J-DET-33 | a lifecycle event block ordered by `seq`, undone and redone with its target | §2.8, §7.4 |
| J-DET-34 | a session per document and author | §7.4 |
| J-DET-35 | a selected user corpus as a non-shipped pack; the document's pack set saved | §2.9, §6.4, §7.5 |
| J-DET-36 | references by lattice point across chunks; Steiner splits in their partition's chunk, keyed by their route edge's endpoints | §2.9, §3.9, §6.2 |
| J-DET-37 | a generated name handed to its successor with its address and naming record | §6.3, §7.1, §7.6 |
| J-DET-38 | the displayed snapshot as the working state, editable after its own digest matches | §2.9 |
| J-DET-39 | the NF-P5 invariant scoped to generation batches and undeclared edit batches | §5.3 |
| J-DET-40 | the pre-decided fallback for a slow load recomputation: off the edit path | §2.9, §6.2 |
| J-DET-41 | a naming record persisted with every generated name | §2.8, §7.6 |
| J-DET-42 | a non-owner bridged client keeps the load bytes to install a kept town | §2.9, §7.4, §11.3 |
| J-DET-43 | edits during load verification run their per-district stages in the generation worker | §2.9, §12.8 |
| J-DET-44 | every root check runs under the model packages of the version that recorded it | §2.9, §7.1, §7.4 |
| J-DET-45 | under the off-edit-path check, edits flow but keep, save and export wait | §2.9, §5.3, §6.2 |
| J-DET-46 | a protected name's naming record stays dormant until the protection ends | §2.8, §6.3, §6.5 |
| J-DET-47 | one optional `renames` field on `EditBase`; `fates` on table and preset edits | §7.1, §7.3, §11.2 |
| J-DET-48 | each field of a culture or ancestry row is its own naming slice | §2.8, §6.3, §7.6 |
| J-DET-49 | a separate records digest for derivation and naming records | §2.9, §6.2 |
| J-DET-50 | a link only when the document's base is the recipe | §2.9, §6.4, §7.4 |
| J-DET-51 | the rebase reason `keptOldModel` removed | §2.9, §7.4, §7.5 |
| J-DET-52 | edits made during load verification re-applied on the replay's records | §2.9 |
| J-DET-53 | a transparent successor seed (seed + 1) for Enter | §6.1 |
| J-DET-54 | a pack the new version stops shipping copied into the document at the upgrade | §7.5 |
| J-P1 | feature-named district kinds | §2.5 |
| J-P2 | a quarter level for city-LOD labels | §4.5 |
| J-P3 | reservations and gate sites at S3, and the trace before each stage's growth | §4.2, §4.4 |
| J-P4 | the bent cut inside the walls, FTG growth outside | §4.4 |
| J-P5 | MFCG's walled share | §4.2 |
| J-P6 | plot counts per band with a measured plot share | §4.2 |
| J-P7 | a network-travel-cost level set with an anisotropy row | §4.4 |
| J-P8 | a mean-reverting curvature walk with goal reversion | §4.4 |
| J-P9 | an eager town-wide allocation, a laziness contract and a complete first paint | §4.1 |
| J-P10 | the district pool and its merge protocol specified now | §4.1, §12.3, D-18 |
| J-P11 | no bent-cut continuation across district boundaries | §4.6 |
| J-P12 | the vector coast with contours clipped to land | §4.2 |
| J-P13 | per-frontage regions from the block's straight skeleton | §4.7 |
| J-P14 | row footprints by clipping | §4.7 |
| J-P15 | the deep-block interior decided in S8 by band shares | §4.6 |
| J-P16 | NG's perpendicular-ray far side with a fallback chain | §4.6 |
| J-P17 | wings stored in the base | §2.6 |
| J-P18 | an `outline()` / `compose()` split with a cost contract | §2.6 |
| J-P19 | `baseCm` = the highest sample plus a plinth, with skirts and stepped wings | §2.6 |
| J-P20 | a sequential grid roster keyed by building ordinal | §10.2 |
| J-P21 | a base-schema relation store materialised by the module | §10.1 |
| J-P22 | pinning by explicit edit only | §10.3 |
| J-P23 | close-up refinement as derived data; template replacement as a model edit | II.4 |
| J-P24 | the gate law fitted on MFCG's size sweep | §4.2 |
| J-P25 | an open waterfront as the default | §2.7, §4.4 |
| J-P26 | gate routes, boundary, gates, castle weld, trace and moat from one travel-cost construction | §4.2 |
| J-P27 | the hinterland unit on the generation worker as one more overlay | §4.1, §4.9 |
| J-P28 | the quarter city cut at `min(N_q, L)` | §4.5 |
| J-P29 | wall strips cut as L1 faces at S7, the band built inside them after S9 | §4.8 |
| J-P30 | a carve way rule by class: pinned decks for arterials and sole links, cuts for the rest | §4.11 |
| J-P31 | a `quad` wing kind storing the clipped row footprint | §2.6 |
| J-P32 | a portal gap that slides a planned lane end away from a portal | §4.6 |
| J-P33 | one `Seam` record per boundary run, read by both districts | II.1 |
| J-P34 | one carve footprint: every L1 cell the channel meets or the way rule touches | §4.11 |
| J-P35 | the harbour route solved after the trace and moat, through the serving gate | §4.2 |
| J-P36 | an `on_enceinte` castle's moat carved only along its outer arc | §4.2, §4.8 |
| J-P37 | a `reserve` seam type for a way-less shared reservation boundary | II.1 |
| J-P38 | the neighbour step: one `corridor_split` in the neighbour's strip | II.1, §4.6 |
| J-P39 | a `quad` wing's four corner indices stored | §2.6, §4.7 |
| J-P40 | a carve's kept-way deck is the way's own L1 edge between its bank vertices | §4.11, §7.3 |
| J-P41 | wall-strip faces excluded from S7b's claim candidates | §4.5 |
| J-P42 | a building's stored wing rings carried with its footprint face | §2.6, §4.7 |
| J-P43 | each land face of a carve's footprint takes the typing of its pre-edit L1 cell | §4.5, §4.11 |
| J-P44 | every crossing site a `Bridge` in state `site` until a way builds it | §2.7, §4.2 |
| J-P45 | one gate pick forced where the harbour's least-cost path leaves the pick contour | §4.2 |
| J-P46 | the arena's outer ring an L0 `margin` chain; the map border an L1 `border` chain | §2.2, §3.3, §4.1 |
| J-P47 | §2.6's wing carry after every batch that changes a footprint face | §2.6, §4.1 |
| J-P48 | a stored stage-3 composition carried in the same call as the base wings | §2.6 |
| J-P49 | the wing check decided by the building's pairing | §2.6, §12.6 |
| J-P50 | a slot's shape kept as S11 working data, never stored | §2.5 |
| J-R1 | a columnar, transferable mark table | §8.1 |
| J-R2 | world-aligned tile rasters | §8.1 |
| J-R3 | low-chroma value steps | §8.2 |
| J-R4 | Canvas2D as `lit`'s reference backend | §8.2 |
| J-R5 | the ground tone | §8.5 |
| J-R6 | no avenue trees at the city band | §8.5 |
| J-R7 | no S9 preview | §8.5, §12.5 |
| J-R8 | settling on exact 2^¼ zoom stops | §8.8 |
| J-R9 | Canvas2D glyphs composed onto the tiles | §8.9 |
| J-R10 | a handle-and-tiles worker boundary | §8.9 |
| J-R11 | stamped, ranked scatter tiles | §8.10 |
| J-R12 | label placement as view data, measured with our own font metrics | §9.1 |
| J-R13 | a minimal own emblem generator plus import | §9.5 |
| J-R14 | CityJSON built | §11.1 |
| J-R15 | host-as-store | §11.3, §11.5 |
| J-R16 | a transport-agnostic bridge plus the static VTT exports | §11.5 |
| J-R17 | the per-building cost against MFCG as a declared trade | §12.9, D-7 |
| J-R18 | the derivation pool as the primary configuration | §12.3, §12.9 |
| J-R19 | the low 64 bits of the entity key as the one key of every render-time hash | §8.1 |
| J-R20 | a slot-major draw order with passes inside each slot | §8.1 |
| J-R21 | base and labels composed into one bitmap per tile in the tile worker | §8.8 |
| J-R22 | a canvas budget derived from the viewport with tier ceilings | §8.8 |
| J-R23 | model-reading render steps run where the model is; the tile worker gets tables only | §8.9 |
| J-R24 | an instance override applied by ordinal only while lineage and position hold | §8.10 |
| J-R25 | bit-reversal (van der Corput) ranks for jittered grids and lines | §8.10 |
| J-R26 | pins fixed at their own and finer stops, yielding at coarser ones | §9.2 |
| J-R27 | the quarter-tree rung decided from geometry before the greedy | §9.2, §9.4 |
| J-R28 | `ground` as the one fallback halo role; darker inks for `lit` and `hatched` | §8.2, §9.4 |
| J-R29 | `ink`'s walls drawn in ink and its courts as ground at the city band | §8.2, §8.5 |
| J-R30 | a bounded random-style repair, then the shipped palette | §8.2 |
| J-R31 | a strict WGS84 GeoJSON by inverse transverse Mercator, plus a metric file | §11.1 |
| J-R32 | glyph outlines as SVG's default text | §11.1 |
| J-R33 | fate confirmation by token and fate equality | §11.2 |
| J-R34 | a per-viewer `stylePreset` view key | §11.3 |
| J-R35 | first-map budgets as laws of the building count, the miss above the knee declared | §12.5 |
| J-R36 | load verification stated as a law of the log | §12.6 |
| J-R37 | a CI font test picks each face's small-caps and figure path | §9.2 |
| J-R38 | O3 (d)'s model-time bars read over every size of a rung | §12.3 |
| J-R39 | explicit passes on `OrderSlot` with most-specific-wins resolution | §8.2 |
| J-R40 | furniture and snap queries answered by the tile worker between resumable raster steps | §8.9 |
| J-R41 | a transient display list for SVG exports, released after writing | §11.1, §12.8 |
| J-R42 | a constant stream key for the stamp-tile library | §8.10 |
| J-R43 | a declared PLAT CityJSON Extension for `+platGeoAnchor` | §11.1 |
| J-R44 | the derivation pool primary at each size where it measures faster | §12.3 |
| J-R45 | a pin pass at placement time | §9.1, §9.2 |
| J-R46 | four fixed classes in the tile worker's queue | §8.9 |
| J-R47 | a transient display list for PNG, print and `.dd2vtt` exports | §11.1, §12.8 |
| J-R48 | one set of four stamp tiles per class at 4 m, scaled per entity | §8.10 |
| J-R49 | a timing phase: every gating timing taken last and alone on the runner | §12.1 |
| J-R50 | four seam-compatible stamp tiles per class sharing one border band | §8.10 |
| J-R51 | S13b as a resumable placement job | §8.9, §9.2, §11.1 |
| J-R52 | integer-centimetre instance positions computed with `dmath` | §6.5, §8.10, §11.1 |
| J-R53 | for a PNG time miss, the None row filter, then fixed compression settings | §8.8, §12.7, D-18 |
| J-R54 | a light step: the path sun quantised for lit programs | §8.4, §8.8, §8.10 |
| J-R55 | stamp tiles built at build time and shipped | §8.10 |
| J-R56 | a max clause relative to each generation's own law, confirmed by solo re-timing | §12.3 |
| J-S1 | every acceptance letter tagged C / P / O; a P or O letter for each first-weighted improvement | §15.2 |
| J-S2 | a written, blind side-by-side protocol with the owner as rater | §13.6 |
| J-S3 | every threshold numbered now, with a confirming milestone and a fallback | §13.7 |
| J-S4 | byte identity for Regenerate (keep settings); a calibrated rank campaign for New random | §13.2, §15.2 |
| J-S5 | requested-feature delivery by tier and time on MFCG's worst configurations | §13.5, D-9 |
| J-S6 | the honest effort range, with the possible cuts recorded for the owner's veto | §16, D-20 |
| J-S7 | the editing core before the second preset; M3 split; the module its own milestone | §16, D-7, D-35 |
| J-S8 | implementer inputs: this document, a checked digest, a separate repository, numbers-only baselines | §17.1, D-29 |
| J-S9 | a hashed deny-list of tokens, ordered 3-grams, colour values and file bytes | §17.1 |
| J-S10 | a proprietary default licence | §17.3, D-22 |
| J-S11 | FTG's free BIG_TOWN and BIG_CITY sizes and no purchase | D-31 |
| J-S12 | 1 500 inhabitants as the base's floor and the village ceiling | §1.1, D-33 |
| J-S13 | modest per-rung granularity and greenery modifiers in one `RungProfile` table | §1.1 |
| J-S14 | economy, personality, stats and the family tree in the module, flagged for veto | D-32 |
| J-S15 | IM FELL Great Primer as the default label face | §17.2 |
| J-S16 | three CI tiers with fixed wall-clock budgets | §13.8, D-34 |
| J-S17 | curves resampled at 10 m; junction-to-junction runs compared | §13.5 |
| J-S18 | MFCG's input idiom, stated in an editable keymap | §14 |
| J-S19 | WCAG 2.2 AA for the app's chrome; the gazetteer lists as the non-visual route | §14 |
| J-S20 | an unrated panel continues the build as *provisional — not rated* | §13.6, §16, D-5 |
| J-S21 | candidate 1 ships as `house` when the owner has made no pick by M4's exit | §13.6, D-1 |
| J-S22 | machine-readable shift, cascade, milestone, parity and D-5 records inside `plat/goldens/` | §13.3, §13.5 |
| J-S23 | a moved placement digest is an S13b view shift bumping style versions only | §6.4, §9.1, §13.3 |
| J-S24 | `labels ← render` with renderer inputs passed as parameters | §14 |
| J-S25 | FTG's turning per 100 m as a target for organic presets | §13.5 |
| J-S26 | a letter whose fallback moves its threshold is *not achieved* | §13.7 |
| J-S27 | town-level draws keyed from the town root's entity key | §9.5, §14 |
| J-S28 | METROPOLIS generated from M1, measured and tuned at M2b | §1.1, §13.2, §16 |
| J-S29 | `H32(s)` = the first output word of MurmurHash3 x86 128-bit | §6.1, §13.6 |
| J-S30 | 800 regenerated scopes per nightly faithfulness campaign | §13.2 |
| J-S31 | §6.5's allowlist lint extended to the renderer code that feeds S13b | §6.5, §13.3, §14 |
| J-S32 | scripted document checks, binding every seat that writes this document | §17.1 |
| J-S33 | one FTG pair per FTG capture at the matched size | §13.6 |
| J-S34 | five seeded pairs per NG template for M5's panel (`area` = the base's `bent-cut`) | §13.6, II.2 |
| J-S35 | a list check for copied lists in any order | §17.1 |
| J-S36 | the list check carried into M-1's hashed deny-list | §17.1 |
| J-S37 | memory under load verification at M2a; naming re-draws tested at M3a | §2.9, §16 |
| J-S38 | an optional `at` on `EditEngine.rebase`, anything but the head or h₀ refused | §7.1, §7.4, §14 |
| J-S39 | the table check's cell count; pipes in code escaped | §17.1 |
| J-S40 | the `.plat` writer and reader for generated towns built at M1 | §2.9, §16 |
| J-S41 | an FTG pair's PLAT side generated at the capture's recorded population | §13.6, §17.1 |
| J-S42 | `SquareFabric`'s `void` mode for NG's `square` pairs | §13.6, II.2 |
| J-S43 | the unpriced-mechanisms line of §16's effort table widened by 3–4 pw for six new components | §16, D-20 |
| J-I1 | one quarter merge tree, built by S6 with one cost, cut at MFCG's count law | §4.5, §9.1, §9.4 |
| J-I2 | no preview at any rung | §4.1, §8.5, §12.5 |
| J-I3 | label placement as view data at every band | §4.1, §9.1 |
| J-I4 | entity schemas reach geometry only through the kernel's views; no stored seed or key | §2.2, §2.4, §6.1 |
| J-I5 | one travel-cost field for all growth stages | §4.2, §4.4, §12.4 |
| J-I6 | furlong-sized field faces; open-field strips as render-time segmentation | §4.9 |
| J-I7 | the shadow budget kept, with a pre-decided `drop`-mode fallback | §8.4 |
| J-I8 | the kernel's range bound re-derived at the population cap | §3.2, §12.2, D-12 |
| J-I9 | one eager shared-edge band step (S10 (0)) before the pool's freeze | §3.3, §4.1, §4.5 |
| J-I10 | the pipeline's local coarse insertion adopted as the kernel's clear regions | §3.3, §4.4, §4.11 |
| J-I11 | only split-flagged degree-2 vertices dissolve after an edge removal | §2.2, §3.4 |
| J-I12 | every bridge's deck is its way's own L1 edge between two `deck_end` vertices | §2.2, §4.1, §4.11 |
| J-I13 | one preparation list for every coarse insertion | §3.3, §4.11, §7.3 |
| J-I14 | load verification's replay model counted in place of the pool's frozen copies | §2.9, §12.8, §16 |
| J-I15 | the kernel's naming for water gates and transient contact names | §2.2, §7.3 |
| J-I16 | the pipeline's levels for the frame lines; clear regions aligned to them | §2.2, §3.2, §3.3 |
| J-I17 | crossing-site state carried into S1's water operator | §2.7, §7.3 |
| J-I18 | a deck's `deck_end` writers split by the water they are placed on (S5b's extra-bridge batch included) | §2.2, §5.2, §7.3 |
| J-I19 | an M1-format document of the running version regenerated from its recipe when the records digest arrives | §2.9, §13.3, §16 |

