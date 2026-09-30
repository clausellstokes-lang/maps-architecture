## §13 Testing and verification

*In plain words.* Five test benches run in continuous integration, in three tiers — a quick one on every change
(minutes), a full one every night (hours) and the largest runs at every milestone: random and deliberately awkward shapes
thrown at the geometry kernel (it must never crash or hang), a thousand towns per size and water setting (every rule
checked), up to a hundred thousand scripted edits (nothing lost, nothing overlapping, nothing outside the edit changed),
fixed "golden" seeds whose fingerprints must not change unless a release says why, and measurements of our towns against
numbers we measured from the references — read from one numbers-only file, never from the captures themselves. Every
acceptance number says what kind of evidence it is; the owner judges side-by-sides through a written, blind protocol;
every threshold has a number today and a stated way to confirm it.

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
     meet cut at their boundary, the water gate's `Gate.banks` on its two `gate_end` vertices; a carve chain that
     touches a finer edge away from its prepared vertices (`E_LEVEL` inside the clear region, `E_KEPT` outside); a
     canal across an open enceinte's glacis line and a river moved through a walled town — every indexed role unique
     per ordinal (§3.10), `Gate.banks` resolving to its two `gate_end` vertices, no `anchor` contact name left; a river
     moved away from a quay-lined and a walled bank — the quay and wall edges back at L1, the L0 view land and water
     only, a deck left over land at the way's level after F-REDERIVE (before it, at the level of its `deck_end` rows,
     with no L0 edge at it), its bank vertices unpinned; a deck whose bank vertex also carries a width knot, removed by
     F-REDERIVE — the vertex ends unpinned, its knot kept; new water across a corner of the frame — the border's
     stretch between its two contact points, the corner included, unchanged and closed; a declared preparation batch
     placing two contact names on one entity, its ops permuted — identical ordinals;
   * *removals, profiles and neighbour steps:* a lane removed from a spine it ended on — the spine's chain restored
     exactly, its own shape vertices untouched (the `split` flag, §2.2 rule 3); an S8 T-junction on a spine with a
     width profile — every sampled half-width unchanged; a way split between two width knots — every sampled half-width
     within 10⁻⁹ cm of its value before — then re-joined, giving the original profile bit for bit; a stretch of a way
     removed between two junctions and a stretch of a ring removed between two anchors — the rest of each chain
     unchanged and every remaining profile sample within 10⁻⁹ cm of its value before (`fixall_kernel_r4_checks.out`
     C); a removal that leaves a way in two parts without a `rekey`, refused by role consistency; II.1 (3)'s neighbour
     step beside finished plots — a plot-line end within `attractCm` of the foot (promoted; every plot ring unchanged)
     and one farther (a kerb split; each ring equal to its prior ring with the vertex removed) — then the street
     removed again, by an undo and by a reroll, at a promoted plot-line end and at a promoted footprint corner: the
     kerb's L2 route, index and digest and the block's, the plot's and the wing rings equal to those before the step;
     two neighbour steps on one kerb edge, the first street removed by a reroll — its plot-line end back at L3 and the
     kerb's L2 route equal to the route with only the second step (`fixall_kernel_r5_checks.out` A); a promotion that
     leaves another finer vertex 1.2 cm from its new route edge commits with no `E_INVARIANT`, and every index query
     whose box meets that vertex returns it;
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
`corridorUnion` faces disjoint and covering; `offset(−d) ∘ offset(+d)` ⊆ original and `insetFace` empties monotonically;
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
for precision; 0 stale references after every batch; every index query's answer identical before and after a rebuild
of the partitions it reads (§3.3); after every removal each edge's level is the lowest among its rows and no vertex is
coarser than every edge and role at it (§3.10's level-consistency row); save → load → save byte-identical and the
loaded arena passing every hard invariant (§3.9, §3.10); a 3 000 m relief fixture stores without a clamp and D8 is
defined on 100 % of the hydrology grid's land cells over frame and margin (§2.3); every routine returns a typed result
on the pathological corpus.

**Ladder coverage:** every rung of every ladder in §5.2 is reachable by a fixture, and each downgrade (medial axis, the
plain-roof downgrade, straight cut, substitution) is exercised; no roof line lies outside its footprint; 0 crashes on
the 1 000 holed polygons; a skeleton failure is never a crash and never a visual surprise.

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
  tiles pass the **seam check** — 0 point pairs closer than r₀ across cells in all 256 2 × 2 arrangements of each class's
  four tiles, for every band's rank subset (§8.3, §8.10).
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
  an overlapping T, a curved row of quads and a holed footprint: every wing union equal to its footprint face (integer
  equality), every roof line inside its footprint, de-rectangled rects turned quads, undo byte-identical; and a building
  with a hand-built stored `Composition` whose composed wings unite to the moved footprint face after each move, its
  rooms inside and its tower centres inside or on it, undo restoring it byte for byte — the stage-3 intake runs the same
  test with every fixture building's composition stored (§2.6); **load verification** — an edit within 100 ms of the
  state becoming editable with a forced mismatch under both choices, the open-to-editable time against T(B), and a
  snapshot with one moved footprint and an unchanged `model.digest` — its chunk hash rewritten, and not — reported as a
  corrupt cache and loaded by replay, never verified (§2.9 steps 3–4); the same snapshot under a forced §6.2 (iii):
  "trust the saved town" and a save wait for the recomputation and the snapshot is never kept; a snapshot with one
  altered naming record — a corrupt cache when its `recordsDigest` is left as written, a records mismatch rebuilt from
  the replay, re-applied and then verified when it is rewritten to match; an Adjust made during load verification in an
  epoch-grown town, saved and reloaded, reports no records mismatch; a `drawBoundary` that moves surviving blocks,
  saved and reloaded, reports no corrupt cache; **naming inputs** (§6.3) — a selected user corpus and an edited naming
  row rename exactly the unedited names citing the changed slices, listed in the fate report and stored in the event,
  in a fresh and in a rebased document, every other name and naming record byte-identical, 0 duplicate ids and 0
  silent re-binds; a bridge re-sited afterwards keeps its new name; an `editTable` of one naming grammar row renames
  exactly the unedited names citing it; a culture row with a street corpus and a district-name corpus, the street
  corpus replaced — every district and quarter name and naming record byte-identical; a frozen fixture whose naming row
  changed imports with its renames listed, and a New random made afterwards renames nothing outside its scope; a canal
  carved across a wall and a river move whose bank cuts a glacis line, each committing with 0 NF-P5 violations, and a
  lane drawn across a wall strip refused (§5.3); the 20-epoch test — a TOWN with ≈ 30 % churn per epoch keeps its heap ≤
  1.3 × and its document ≤ 2 × those of a freshly generated town with the same live entities (M4); and **the thirteen
  MFCG asks of §7.4** as scripted scenarios, each reporting its locality share, its invariant results and its re-run cost
  against §12.6.
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

### 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1

A golden suite of 12 seeds × {TOWN, CITY, METROPOLIS} × the four `WaterSetting`s {`none`, `coast`, `river`,
`coast+river`} stores, per stage, its **stage-isolated digest** (the stage's new code run on the previous output
version's frozen upstream outputs, §6.4), its entity counts, the core statistics record and one PNG per LOD and preset;
and, per shipped preset's label style, a **per-stop placement digest** (below). A release either matches or declares:

* a **shift record** for every stage whose isolated digest moved — the stage, the cause (a rule-table change, a fix, a
  new concern), the seeds and statistics that moved, the expected direction, and the output version the release creates;
* a **cascade record** for every end-to-end golden it re-signs, listing each downstream stage that moved and showing,
  from the isolated goldens, that each moved only through its inputs; a downstream stage whose isolated digest also
  moved needs its own shift record, so an unrelated regression cannot ride on an upstream shift.

An undeclared move fails CI; a declared statistic that moves against its declared direction fails CI until the record
states why; only declared stages are re-signed; stages untouched by a release stay byte-identical (O2 e). A same-seed
output change is never let ride silently (owner non-negotiable 10).

**The records are product files.** Everything the golden gate and the release-notes generator read lives inside
`plat/`, so §17.1 (3)'s path rule and the gate never collide:

```ts
// @plat/testkit — the golden store and its records; JSON with a schema, committed in plat/goldens/
type WaterSetting = 'none'|'coast'|'river'|'coast+river';   // the one spelling of a water setting: B-CITY, the golden store, every record
// a seed in a record is a Seed (u32, §2.9) written as its decimal string, e.g. "1221236157"; permalinks write it in base 36 (§6.4)
interface ShiftRecord {
  id: string; release: string /* generator version */; outputVersion: string | null /* the o<k> it creates; null for a view shift (S13b, render.stampTiles) */;
  stage: StageId | 'S13b' | 'render.stampTiles' /* view shifts: placement digests (S13b) and stamp-tile hashes (§8.10) */;
  cause: { kind: 'table'|'fix'|'concern'|'engine'|'feature'|'calibration'|'baselineShift'; ref: string /* table id@version, issue, concern id, CalibrationRun id, baseline id */; note: string };
  seeds: { seed: string; rung: Rung; water: WaterSetting; before: Hash128; after: Hash128 /* isolated stage digest, or the placement digest for S13b */ }[];
  statistics: { metric: string /* core-record field or §13.5 metric id */; rung: Rung; before: number; after: number; expected: 'up'|'down'|'none'|'any' }[];
  tiles?: { tile: string /* class, tile index (§8.10) */; before: Hash128; after: Hash128 }[] /* render.stampTiles shifts only; their seeds list is empty, the library being seed-independent */;
  d5SeedsChanged: string[] /* seeds of any D-5 panel (§13.6) whose render moved */; milestone: string; date: string; author: string }
interface CascadeRecord {
  id: string; outputVersion: string; upstream: string[] /* ShiftRecord ids that explain it */;
  downstream: { stage: StageId; before: Hash128; after: Hash128 /* end-to-end digests */; isolatedUnchanged: true /* otherwise the stage needs its own ShiftRecord */ }[];
  seeds: string[]; date: string }
interface MilestoneRecord {
  milestone: string; date: string; outputVersions: string[] /* created during the milestone */; shifts: string[]; cascades: string[];
  parity: string /* plat/goldens/parity/<milestone>.json — the ParityReport the exit is judged on, §13.5 */;
  d5: { status: D5Status; record: string /* plat/goldens/d5/<milestone>/record.json, §13.6 */ } | null;
  knownDefects: { opened: string[]; closed: string[] }; exitCriteria: { id: string; result: 'pass'|'fail'|'fallback-applied'; evidence: string }[] }
```

* `plat/goldens/store/o<k>/` holds, per seed and stage, the frozen upstream outputs and the digests, counts, statistics
  and placement digests; PNGs are stored content-addressed in `plat/goldens/png/` (large-file storage) and referenced by
  hash.
* `plat/goldens/shifts/o<k>.json` holds the shift and cascade records that created output version o<k>;
  `plat/goldens/shifts/view/<release>.json` holds a release's view shifts (S13b and `render.stampTiles`).
* `plat/goldens/milestones/<milestone>.json` is each milestone's exit record.
* The golden CLI refuses a record with a missing field; the release-notes generator of `@plat/docs` reads only these
  files and `plat/docs/known-defects.json`.
* `docs/validation/shifts/<milestone>.md` and `docs/validation/d5/<milestone>.md` are **research-side copies** generated
  from these files by `research/baselines/mirror_records.py` (research may read the product; the product never reads
  research); no CI job reads them, and a hand edit there changes nothing.

**Placement digests (§9.1's cross-engine promise).** For every golden town, every shipped preset's label style and
each of B-ZOOM's 27 zoom stops, S13b places the band's area and way labels for all candidates and the addresses and
repeated street names of the default view's visible tiles (§9.2's scope); the placement digest hashes, per candidate in
id order, the label id, the chosen alternate (or *yielded*), the ladder rung, the size and every glyph's position and
angle as exact IEEE doubles. Equal code on equal inputs gives equal bits on every engine because placement and the
renderer code that feeds it are held to §6.5 (3)'s allowlist lint; the rest of `@plat/render` (paint programs,
backends, compositing) produces pixels, compared by visual regression (§13.4), not by bit identity. The PR tier
compares the digests on Node x86 against the store; the nightly tier compares them on all five engines with workers on
and off; a digest that differs between engines is a determinism defect and fails the nightly run. A digest that moves
while every model digest holds is a **view shift**: it needs a `ShiftRecord` with stage `S13b` and
`outputVersion: null`, bumps no output version (placement is view data, §9.1) and bumps the style version of every
shipped sheet whose placements moved, because the style version is the axis that carries pixel identity (§6.4). The
stamp-tile asset's stored hashes (§8.10) are kept with the placement digests; a release whose asset moves a stored hash
while every model digest holds is a view shift of the same kind — stage `render.stampTiles`, `outputVersion: null`,
bumping the style version of every shipped sheet that draws stamped classes; an asset that only adds a new class's
tiles moves no stored hash and needs no record.

**From M1.** The output-version stamp, the shift, cascade and milestone records and the stage-isolated golden tooling
are built at M1, not at hardening (§16). Every milestone from M1 on writes its `MilestoneRecord` — each output version
created, its shift records, the D-5 panel seeds that changed — and a milestone cannot exit with an undeclared shift.
**Preview links:** until M4's exit fixes output version 1, every permalink and document made by the app carries §6.4's
preview flag, and the app shows the preview notice — "preview: made with output version oN; a later release may draw
this seed differently and will say so"; the link carries its `o=` (§6.4). Retention of output versions
N−1 and N−2 (§6.4) is built and its replay test passes at M3a; from then on a link inside the window replays exactly
and one outside it opens with §6.4's notice.

A nightly cross-platform golden run (Node x86 / arm64, Chromium, Firefox, WebKit; workers on and off; pool sizes 0 and
3, the contract tests of §13.2 covering 0–3) is the reproducibility proof: identical model digests per stage, identical
derived-complete digests and identical placement digests on every engine; and, from M3a (the GeoJSON exporter's
milestone), the strict GeoJSON of one golden CITY seed (`coast+river`) with its trees — §8.10's integer-centimetre
instance positions with their species, crown diameters and leaf types — byte-identical on every engine, workers on and
off (§11.1).

### 13.4 Visual regression, B-ZOOM and the app harness

* **Visual regression.** Playwright renders the golden suite per preset, LOD and backend; SSIM / `pixelmatch` against
  the stored PNG with a per-preset threshold; the draw-style census of §8.3 per preset; a "no fills" and a "no outlines"
  render must remain legible (R13).
* **B-ZOOM** (1:50 000 → 1:500, the default view of every rung): legibility floors and no feature popping more than once
  (footprint hash identical across bands); §8.3's checks — hairline fidelity, decoration stability, role continuity
  across band switches, no tree mark over a tier-1/2 casing, no casing pixels in junction mouths, the contrast matrix on
  the rendered city band; §9.4's label checks (the pin-pass fixture of §9.2 among them); §8.3's draw-order census and
  render-key identity; §8.5's figure-ground metrics; and §8.2's role-continuity rule for each family from the milestone
  that ships its four bands (§16).
* **The app harness** (Playwright, the reference machine of §12.1):
  * **Scripted tasks (O16 c)** — share a view link, export a layered SVG, change the coast side, see five variants of
    one kind, recover from a mistaken regenerate, measure a street with the ruler, find a named building through the
    gazetteer: each passes when it completes in the stated number of UI actions (one action where a reference needs a
    detour; recovery = one undo) with every app response ≤ 1 s, run on every PR.
  * **Accessibility** — axe-core on every screen and panel of `@plat/app` reports 0 serious or critical violations;
    every control is reachable and operable by keyboard alone in a scripted run with visible focus; every scripted task
    above also passes keyboard-only; the gazetteer list and search and the "features in view" list reach every
    building, plot, district and pinned person without the canvas.
  * **Input scheme** — every binding of the default `keymap.json` (§14) fires its action while the map has focus and
    none fires while a text field has focus; a user-edited keymap round-trips through save and load.

### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file

The `parity` CLI in `@plat/testkit` reads **only** `baselines.json` — our own measurements of the references, numbers
only, generated research-side by scripts under `research/baselines/` from the captures and committed into
`plat/packages/testkit/baselines/` (§17.1 (4)) — and our B-CITY outputs, and reports every metric against its band. It
never opens `captures/`, `research/` or `reference/`.

```ts
interface Baseline {
  id: string; metric: string; unit: string;
  reference: 'MFCG' | 'FTG' | 'NG' | 'VG' | `corpus:${string}`;       // corpus rows arrive through §13.9
  referenceBuild: string;            // itch build, FTG server date + create-request hash, NG / VG build — required
  capture: string; script: string; date: string;                       // provenance: capture folder, research-side script, run date
  matched?: { rung: Rung; mfcgSize?: number; ftgSize?: 'BIG_TOWN' | 'BIG_CITY' | 'CITY' | 'METROPOLIS'; population?: number };
  role: 'target' | 'weakness' | 'descriptive';                        // what the reference number means for us
  values: { p10?: number; p50?: number; p90?: number; n: number; seeds: number } | { bins: number[]; histogram: number[]; n: number; seeds: number };
}
interface ParityReport {                 // written by the parity CLI per run; read by milestone exits, §13.9's CalibrationRun and the release notes
  runId: string; date: string; outputVersion: string; generatorVersion: string; baselines: Hash128 /* hash of the baselines.json it read */;
  rows: { metric: string; baselineIds: string[]; role: Baseline['role']; rung: Rung; preset?: string;
    band: { lo?: number; hi?: number; ksMax?: number; direction?: 'above'|'below'; margin?: number };
    ours: { p10?: number; p50?: number; p90?: number; ks?: number; n: number; seeds: number };
    verdict: 'pass'|'fail'|'reported' /* descriptive rows are always 'reported' */; note?: string }[];
  summary: { pass: number; fail: number; reported: number } }
```

Each milestone's parity report is stored as `plat/goldens/parity/<milestone>.json` and named in its `MilestoneRecord`
(§13.3). The CLI refuses a row without `referenceBuild`, `capture`, `script` or `date`. A new reference build never
overwrites a row: it adds a row (the id gains the build) and is a **declared baseline shift** in the milestone's shift
record, so a silently drifting reference build (VG changed geometry for the same seed between builds 19251041 and
19365073) can never move a gate unnoticed. Rows hold numbers, units and provenance only — no names, colours, grammars
or code.

**The band rule.** *Target* rows pass when ours lies in [p10 × 0.9, p90 × 1.1] of the reference's seed spread (a
single-value baseline: ± 15 %), and distributions when our KS distance to the reference is ≤ 1.25 × the reference's own
seed-to-seed KS distance at p90. *Weakness* rows are one-sided: ours must beat the reference in the declared direction
by the stated margin. *Descriptive* rows are reported beside ours and gate nothing. The bands below are this rule
applied to today's baselines; when M-1 re-measures a baseline (five seeds per matched MFCG size, FTG's new captures),
the band is recomputed by the same rule with provenance "M-1 ⟨date⟩", and a recomputation that turns a passing gate
into a failing one is declared in the shift record. Thresholds no reference can set are §13.7's. **The ⟨M-1⟩ rule:** a
reference number marked **⟨M-1⟩** is measured by M-1 (§16 lists every such measurement); if M-1 cannot measure it — the
capture lacks the feature, or the measurement is not reproducible across seeds — that cell becomes *descriptive*,
gates nothing, and enters `known-defects.json` with the reason; the parity CLI reports an ⟨M-1⟩ cell without its
baseline row as *fail*, never as *pass*.

**Matched sizes** (§12.2, §13.6): TOWN ↔ MFCG size 40 and FTG BIG_TOWN; CITY ↔ MFCG size 80 and FTG BIG_CITY;
METROPOLIS ↔ MFCG size 130 (FTG per D-31). MFCG numbers come from its plain-option size sweep (walls, citadel, plaza and
temple on; shanty town, parks, river and coast off; its JSON export is in metres, the internal unit 4.00 m). **Curves**
are measured after both sides are resampled at a 10 m arc-length step, so neither FTG's 25–40 m placement steps nor
PLAT's smoothed vertex spacing enters a number.

| metric | our measure | reference baseline and its role | band | class |
|---|---|---|---|---|
| street turning | turning per 100 m; heading change per 50 m (10 m resampling) | FTG: zero mass above 15° per step and a flat heading spectrum (`_critic-ftg.md` §4 rows 7–9) — **weakness**; FTG's median turning per 100 m after 10 m resampling, on its payloads ⟨M-1⟩ — **target for organic presets**, with this row's own band | weakness clauses: no cliff (no empty bin above 15° while the bin below it holds > 1 %) and heading entropy ≥ FTG's; target clause: organic presets' median turning per 100 m within 0.5–1.5 × FTG's — a declared exception to the band rule, because FTG's per-seed spread over at most eight payloads is too narrow to stand for its generator's variation. *Fallback:* `headingSigma` (a table value, §4.4) is set so the organic median equals FTG's and the growth-drift row re-runs; if drift then fails, `headingSigma` returns to its default, the target clause enters `known-defects.json` as not met, and the row gates on its weakness clauses | P |
| growth drift | net turn of grown streets over 600 m (organic regimes) | — (our heading model, §4.4) | p50 15–30°; > 90° on ≤ 1 % | C |
| junction arm angles and degrees | every L1 junction | NG 361 / 361 T — **target** for organic presets; FTG median 90.02°, 58 % in 80–100°, 36.4 % 4-way in its Medieval city — **weakness** for organic presets, **target** for `ringed` and `american` | median 85–95°; p5 ≥ 30°; 4-way share organic 0–15 %, `ringed` 20–45 %, `american` 40–80 % | P |
| street runs by class | junction-to-junction run lengths per class (never edge lengths) | FTG main L + 0.5, district (L + 0.5) / 2, suburb 30.00 m, lot outlines 14.70 m (roadlength100 README) — **target** for the extramural ribbon and suburb regimes, descriptive inside the walls | class medians by the band rule (extramural, suburb) | P |
| MFCG street signature | lot-orientation coherence R4 within 60 / 120 / 250 m; lot alignment with the wall by distance band; T / Y share; intramural dead ends; blocks per ha; lots per block | MFCG R4 0.84–0.97 / 0.58–0.88 / 0.32–0.68; within 40 m of the wall median deviation 3.5–4.5° and 84–92 % within 15°, 56–70 % at 40–100 m, 38–58 % at 100–200 m (redteam-mfcg MFP-2, from the exports); T / Y share, intramural dead ends, blocks per ha and lots per block from the sweep ⟨M-1⟩ — **target** inside the walls | the band rule, walled districts | P |
| blocks | L2 built-block areas per district | NG block counts per template at `medium` (vertex captures) ⟨M-1⟩ — **target** on the same face shapes; FTG block-lot median 441 m² in every class — **weakness** (no gradient) | KS by the band rule; inside the NG band on the same face shapes (O4 f) | P |
| deep block interiors | court share of deep blocks per band | NG hollow-block frequency (vertex captures) ⟨M-1⟩; MFCG inner-lot removal (sweep) ⟨M-1⟩ — **target** | the band rule per class (§4.6) | P |
| bent-cut signature | infill and lot cuts | NG: start at N(0.5, σ) of the OBB major axis with σ 0.066 (plain faces) and 0.098 (ring faces); one bend at mid-course in 380 / 519; ≥ 85° arrival in 96 %; 53 % filleted (BG-1 / BG-2 / PF-3; manager note 3) — **target** | σ within ± 0.02; corner within 0.10 of mid-course ≥ 80 %; arrivals ≥ 85° ≥ 95 % | P |
| figure-ground and streetwall (plot texture) | city-band street-edge recoverability; gross footprint cover inside the walls; streetwall continuity on dense frontages | MFCG recoverability on its matched plain sweep renders ⟨M-1⟩ — **target**; MFCG gross cover inside the walls 0.60–0.64 at sizes 40–130 — **descriptive, direction declared**: ours lower because yards exist; MFCG streetwall continuity on the same frontage classes ⟨M-1⟩ — **target** | recoverability ≥ MFCG − 0.03; cover reported (expected below 0.60); streetwall ≥ MFCG's on dense frontages | O |
| plots and footprints | L3 plot areas; L4 footprint areas and sides | FTG footprint median 103 m², p95 154 m², quad side 10.3 m, worst-corner p95 22.9° — **target** for ordinary houses; MFCG footprints (median 225–289 m² at sizes 40–250 in metres) are **lots drawn as buildings — descriptive, never a house-size anchor** | ordinary houses median 60–160 m², p95 < 400 m²; a sheared minority kept | P |
| entrance rule | L4 | FTG: on the outline, 2.99 m from the road; 53 % of buildings with a vertex ≤ 2 m from a road — **target** | 100 % on the access edge, 2–4 m | P |
| party walls and attachment | row classes | NG 39–43 % of perimeter, 95–99 % attached — **target** for dense / poor; FTG residences 0–5 %, industry 96–98 % — descriptive | attached ≥ 90 % in dense / poor; party-wall share by the band rule per class | P |
| plot-area gradient | Spearman(prosperity, plot area); Moran's I; within-district plot-area CV | FTG 441 m² in every class; NG Moran's I −0.04 … +0.03 — **weakness** | ≥ 0.8 and > 0 (both follow from the rules: C); within-district CV ≥ 0.25 (§13.7: O) | C / O |
| alleys | alley length per ha by prosperity | FTG 0 alley length at every decile — **weakness** | Spearman ≤ −0.7 | C |
| vacancy runs | share of frontage length in vacancy runs, per band | — (our rule; VG's partly ringed blocks are the motive) | within ± 0.02 of the granularity table's share per band | C |
| quays and substitution | quays reachable from the network; blocks left as substitution residue (F-CUT tier 5) | — | quays reachable 100 %; substitution residue ≤ 5 % of blocks | C |
| walled share and ribbons | buildings inside the outermost wall; extramural buildings within 100 m of an arterial | MFCG 0.87–0.92 at sizes 40–250; 71–85 % (sweep) — **target** | the band rule | P |
| MFCG anchors | district areas; wall vertex spacing; castle area and compactness; plaza area; city-zoom quarter labels | MFCG district areas 2.4–17.6 ha at size 40 and median 29 ha at size 80; wall vertex spacing p50 88 m at size 40; castle 0.5–3.2 ha (8.7 at size 130); plaza 0.32–0.58 ha; 9 / 12 / 18 districts at sizes 40 / 80 / 130 (sweep) — **target** | the band rule; castle in band on ≥ 99 % of seeds | P |
| outline anisotropy | land-sector r90 CV; road / non-road r90 ratio | FTG 0.20–0.33 and 1.26–1.65 (both CITY payloads) — **target** for organic presets | the band rule; monotone in the anisotropy row | P |
| block-level use mix | residential-only block share; per-block use-mix entropy; trade households at their workplace | MFCG's "venue mix with residents, no residential wards" — descriptive | §13.7's bands | O |
| towers and gates | S7 | FTG 39 m median spacing, 17 / 17 towers on ring vertices — **target**; FTG 6 and 2 ungated crossings — **weakness**; MFCG 5 / 8 / 12 gates at sizes 40 / 80 / 130, `gates = N` exact — **target** | spacing by the band rule; ungated crossings 0; main gates = N exact; roads leaving each walled stage = its N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed | P |
| water | L0 | FTG 50 m resampling, rivers ≈ 31 m mean at CITY — **target**; MFCG `riverWidth` in metres (142 m at size 200 with river and coast) — descriptive | outline step ≤ 25 m; width band by class | P |
| tree scatter | §8.10's stamped instances, in the bench | FTG nearest-neighbour median 9.7 m, minimum 0.14 m (not Poisson) — **weakness**; MFCG / NG Bridson k = 50 with a 140-point tile — **target** for the sampler | NN p1 ≥ §13.7's canopy threshold; pair-correlation per class reported | O |
| population and buildings | totals | MFCG ≈ 6.12 persons per building (a multiplier) — **weakness**; FTG 3.4 — descriptive | requested population within ± 5 % on ≥ 95 % of seeds; the ratio reported | C |
| generation time | model p95 and time to first map per rung (§12) | MFCG app timings 57 / 131 / 156 ms at sizes 40 / 80 / 130 — descriptive, with the measured ratios and §12.9's declared trade; FTG CITY: server 2.9–3.2 s, scene 6.4–7.0 s after the click, load 2.0 s busy — **weakness**; NG hood 10–96 ms — **target** for opening a district | §12.3 / §12.5 budgets; model ≤ 2.5 × MFCG at TOWN and CITY and ≤ 5.5 × at METROPOLIS (the ratios at MFCG's matched building counts are §12.9's); first map ≥ 10 × sooner than FTG at FTG's timed CITY preset (9 500 people, 2 798 buildings: PLAT's TOWN law ≈ 0.24 s against 6.4–7.0 s), and at BIG_TOWN and BIG_CITY from M-1's captures | P |
| MFCG-worst configurations | wall-clock p95 per delivered town, ladder costs included: METROPOLIS with river, coast, walls and castle | MFCG size 80 with river and coast: 10 attempts for 3 cities, 3.7–4.0 s (IMPROVEMENTS O1); 24 restarts in 58 attempts — **weakness** | ≤ 1.0 s per delivered town | O |
| requested-feature delivery | the report's delivery tier per requested feature | MFCG: a requested river fails 7 of 10 attempts at size 80; VG: 4 of 13 highway maps discarded — **weakness** | tier-6 omissions of requested features 0; degraded (tiers 4–5) ≤ 5 % (§13.7) | O |
| ladder use | the report | — | tier ≥ 2 on ≤ 2 % of transactions per stage; p99 ≤ 3 attempts | C |
| draw style | the display list and renders against the draw records | MFCG: casing = core + 2h on 7 / 7 maps, round joins 4 062 / 4 063, 17-step order; wall, tower and road-core widths 6.2 / 12.4 / 6.5 px at size 40's scale — **target** (`ink`); NG square caps, ≈ 17.4 hatch triangles and 2.33 shadow quads per wing — **target** (`hatched`); NG roof dark / light ratios 0.787 / 0.802 / 0.834 and VG water bands 5.196 : 2.828 : 1 — **descriptive** (they are their palettes' values; the laws are tested on ours, §8.3) | `ink`: casing law on 100 % of ribbons, round joins ≥ 99.9 %, order parity as §8.3 defines it, widths ± 15 %, outline share ≤ 25 %; `hatched`: 15–20 triangles per wing, no ridge stroke, outline = footprint; the roof law on our palette within ± 0.02 and our bands W · (i / N)^1.5 within 1e-4 | P |
| labels | protected overlaps; inside-area share; curvature; holes; count | MFCG: gates and the keep covered, walls straddled — **weakness**; MFCG district counts (the anchors row) — **target** | 0 / ≥ 99 % / within §13.7's curvature limit / 0 labels crossing holes / the anchors row | O |
| between-seed variety | dispersion of the §7.7 signature vector (radial share of arterials, orthogonality index, street-density profile, block-area CV, enclosed share, outline anisotropy) over 100 seeds per rung and water setting: mean pairwise distance of vectors standardised by the rung's pooled deviations | MFCG over its plain sweep seeds at the matched size ⟨M-1⟩; FTG over every payload at the matched size ⟨M-1⟩ — **target as a floor** | ours ≥ the larger reference dispersion at the matched rung | O |

### 13.6 The owner's side-by-side protocol (D-5)

"Mastered" means the owner's eye on side-by-sides against MFCG and FTG at town, city and metropolis, plus the measured
parity numbers (D-5). This protocol makes the eye a recorded, repeatable judgement that cannot be steered by choosing
flattering seeds, and it never lets a milestone claim the eye's verdict without the eye.

1. **When.** At M1 (diagnostic: the base is not yet complete, so the result is recorded and does not gate; the panel
   covers all three rungs, because METROPOLIS generates from M1), at M2b (gates "the base at parity"), at M4 (gates
   "mastered") and at M5 against NG (gates stage 2, and replaces S2's blind preference test with n ≥ 20 raters, which
   the program has no pool for).
2. **Seeds fixed before rendering.** Every pair's seeds come from a formula and are committed before any render; no
   seed is replaced after it is rendered, and every list is reproducible from its formula. **`H32(s)`** is the first
   32-bit output word (h1) of MurmurHash3's x86 128-bit variant — the published public-domain algorithm §6.2's H128
   already implements — run over the UTF-8 bytes of `s` with seed 0; its implementation passes the algorithm's published
   verification value (SMHasher's procedure gives 0xB3ECE62A). The result is a u32, so it is a `Seed` (§2.9), written in
   records as its decimal string. The product CLI (`plat d5 seeds ⟨milestone⟩`) writes the milestone's pair list — one
   `D5Pair` per pair, (9) — to `plat/goldens/d5/⟨milestone⟩/seeds.json`, committed before any render. Besides the
   formulas below it reads only the two numbers-only files the research-side panel script commits beside it —
   `ftg-captures.json` (M1, M2b, M4) and `ng-counts.json` (M5) — and never `captures/` (§17.1 (3), (4)). ⟨milestone⟩ is
   the id its `MilestoneRecord` carries (`M1`, `M2b`, `M4`, `M5`), ⟨rung⟩ the `Rung` (`TOWN`, `CITY`, `METROPOLIS`),
   ⟨water⟩ the `WaterSetting` (§13.3), ⟨i⟩ and ⟨k⟩ decimal integers.
   * **Against MFCG** (M1, M2b, M4). Five pairs per rung and per water setting (`none`; `coast+river`), ten per rung.
     PLAT's seed is `H32("d5/⟨milestone⟩/⟨rung⟩/⟨water⟩/⟨i⟩")`, i = 0 … 4; check vectors: `H32("d5/M1/TOWN/none/0")` =
     1221236157 and `H32("d5/M1/TOWN/coast+river/4")` = 3998735106 (`docs/validation/bench/fixall_scope_r3_h32.out`).
     MFCG's seed comes from the same formula with the prefix `d5-mfcg/`, reduced as 1 + (H32 mod 2 147 483 646) into
     1 … 2³¹ − 2, the state range of MFCG's Park–Miller stream (`research/findings/profile-mfcg.md`), by the
     research-side panel script (check vector: `d5-mfcg/M1/TOWN/none/0` → 1965791931); MFCG draws `none` with its plain
     options and `coast+river` with its river and coast on.
   * **Against FTG** (M1, M2b, M4; TOWN and CITY, METROPOLIS per D-31). FTG cannot be seeded — its server draws its own
     seed — so a milestone has **one pair per FTG capture** at the rung's matched size (BIG_TOWN for TOWN, BIG_CITY for
     CITY), each capture used once, in capture order: three pairs per rung. M-1 takes each size's three captures with
     FTG's water options nearest to `none` (one capture) and to `coast+river` (two), and records each capture's id — its
     folder name under `captures/ftg/` — its `WaterSetting` and its **recorded population**, the number of residents its
     decoded payload holds, in the capture README (§16). At each of these milestones the research-side panel script
     writes `plat/goldens/d5/⟨milestone⟩/ftg-captures.json` — one `FtgCapture` per capture, in capture order, ids and
     numbers only, (9) — and commits it like `baselines.json` (§17.1 (4)) before `plat d5 seeds` runs. The pair's PLAT
     side is generated at the capture's recorded population and its `WaterSetting`, both read from that file, with seed
     `H32("d5-ftg/⟨milestone⟩/⟨rung⟩/⟨capture id⟩")`, so every milestone pairs the same captures, at the same
     populations, with PLAT seeds of its own. **Pre-decided fallback:** a capture whose payload yields no resident count
     takes its size's nominal target (BIG_TOWN 5 600, BIG_CITY 24 500), marked `populationSource: 'nominal'` and reported
     with the panel; a population outside the rung's band (§1.1) is clamped into the band and the clamp reported. The
     capture file and the seed list are committed before any PLAT render.
   * **Against NG** (M5). NG can be seeded — its MINSTD stream (`docs/CONFIDENCE.md` NG A2) — so the panel has five pairs
     per NG template, for all four templates PLAT registers as fabrics — `area`, `street`, `square` and `ring` (II.2) —
     twenty pairs. NG's seed is `H32("d5-ng/M5/⟨template⟩/⟨i⟩")`, i = 0 … 4, reduced as 1 + (H32 mod 2 147 483 646)
     into MINSTD's state range 1 … 2³¹ − 2 (check vectors: `d5-ng/M5/area/0` → 1819777585, `d5-ng/M5/ring/4` →
     951122398; `docs/validation/bench/fixall_scope_r4_h32.out`), generated at NG's `medium` size — the size of NG's
     vertex captures and of §13.5's NG baselines — by the research-side panel script, which also counts each hood's
     buildings; the counts reach the product as numbers only, in `plat/goldens/d5/M5/ng-counts.json`, committed like
     `baselines.json` (§17.1 (4)). PLAT's side of pair (template, i) is one district of a PLAT town opened at
     neighbourhood LOD with the template's fabric: **for `area`, the district's own `bent-cut` fabric (the base's, II.2)
     opened as a `refine` close-up — no `setAttr`, its building count the city-LOD count (II.1, II.4); for `street`,
     `square` and `ring`, `setAttr(district.fabric, template)`, a `replace` close-up** (II.4), in the template's default
     form — for `square`, `SquareFabric`'s `void` mode, NG's own square (II.2). The district is found by a committed
     search: town k (k = 0, 1, …, 31) is generated with seed `H32("d5/M5/⟨template⟩/⟨i⟩/⟨k⟩")` (check vector:
     `H32("d5/M5/area/0/0")` = 3881605733), water `none` and population ⌊min(50 000 × 1.25^⌊k / 4⌋, 120 000)⌋ — four
     towns at each METROPOLIS size from the target up (50 000, 62 500, 78 125, 97 656) and the rest at the cap, because a
     district's mean building count grows with the town's size under §4.5's count law; in each town the district whose
     city-LOD building count is nearest the NG hood's (ties to the smaller address id) is opened with the template, and
     the first whose opened building count lies within ± 20 % of the NG hood's is the pair's. k, the district's address
     and both counts are committed with the seeds. *Measurement (M5):* the search's k and each pair's count ratio are
     reported with the panel. **Pre-decided fallback:** a pair with no district within ± 20 % after k = 31 takes, of the
     32 opened districts, the one nearest in count, and is marked `sizeMismatch` in the record; the ratio is printed on
     the sealed key and reported beside the verdict, and the pair is rated like any other.
3. **Matched pairs.** Each MFCG and FTG pair shows PLAT and one reference at the same rung, the same ground scale
   (metres per pixel) and the same frame. Against MFCG, PLAT's population is set so that its building count matches
   MFCG's at the matched size (sizes 40 / 80 / 130; §12.2's rate); against FTG, PLAT is generated at the capture's
   recorded population and water setting from `ftg-captures.json` ((2); METROPOLIS per D-31). Against NG, each side
   fills the same frame with its hood or district: NG's view rescales its hood to the frame (`docs/CONFIDENCE.md` NG
   C8), so the two sides' size is matched by the building count of (2), not by metres per pixel. PLAT draws `ink`
   against MFCG's default style, `lit` against FTG's default from M2b (`ink` at M1) and `hatched` against NG's (M5).
   Against FTG, the pair of each rung's first capture shows the extramural suburb at FTG's overview framing, both sides
   framed alike; the other two pairs use the matched frame.
4. **Blind order.** Generator-identifying furniture is removed from both sides (titles, legends, compasses, interface
   chrome) and the blind pairs are rendered without labels; labels are judged in a separate, non-blind pass. Left or
   right is a seeded coin per pair and the pair order is shuffled; the key is sealed — only its hash is committed — and
   opened after the answers.
5. **The rubric** — three questions per pair, each answered *left*, *right* or *same*, with an optional one-line note:
   (1) *Legibility:* which lets you read the town — its streets, walls and quarters — more easily at this size?
   (2) *Realism:* which looks more like a real medieval town? (3) *Charm:* which would you rather use for a game or a
   story?
6. **Pass rule.** For each reference and each question, PLAT is judged better or the same on at least two thirds
   (⌈2n / 3⌉ of n) of that reference's pairs, counted per group — against MFCG over the milestone's MFCG pairs (20 of 30
   when all three rungs are rated), against FTG per rung (2 of 3 per rung and question), against NG over its twenty
   pairs (14 of 20) — and in no rung (MFCG) or template (NG) is PLAT judged worse on every pair of that rung or
   template. A gating milestone whose rated run fails a question does not exit until a re-run passes or the owner
   accepts the failure in the record; the failing question and the owner's notes enter `known-defects.json`.
7. **The rater, and one rule for an unrated panel.** The owner is the declared rater; no seat rates on the owner's
   behalf. If the owner has not rated within seven days of the panel being ready, the build continues on the milestone's
   measured numbers and the milestone's D-5 status is recorded **provisional — not rated** in its `D5Record` and its
   `MilestoneRecord` (§13.3). A provisional status never claims what the panel gates: M2b's "the base at parity", M4's
   "mastered" and M5's stage-2 gate are claimed only by a rated pass or by an owner acceptance recorded in the
   `D5Record`. The same panel — the same seeds, re-rendered under the current output version — is offered again at
   every later milestone and, after M5, with every release, until it is rated; a later rated pass turns the status into
   *passed* with its date, and a later rated failure follows (6). The release notes state every provisional status
   (§14 `@plat/docs`); §16 applies this rule at each gating exit.
8. **The threshold panel and the `house` pick.** At the same sitting the owner sees the strips of §13.7 (renders of one
   seed at a threshold's number and one step either side) and picks one or answers *same*; the pick becomes the
   threshold with provenance "owner-eye ⟨milestone⟩". From M4 on, the sitting also shows the three candidate `house`
   sheets drafted at M3b (D-1) on the milestone's seeds. **Pre-decided outcome if no `house` pick is recorded by M4's
   exit:** candidate 1 — the first sheet in the M3b draft order — ships as `house`, selectable and never the default;
   `ink` stays the default; the pick is offered again at every later sitting, and a later pick replaces `house`'s sheet
   as a style-version change (pixels only; no model digest moves).
9. **Record and clean room.** The panel is assembled research-side (`research/d5/`) from PNG exports that the product's
   CLI writes and from the reference images in `captures/`; the product repository never reads the captures (§17.1).
   The machine-readable record lives in the product, committed by the seat that ran the sitting, like `baselines.json`
   (§17.1 (4)) — numbers, hashes and answers only, no reference image or reference data:

   ```ts
   type D5Status = 'diagnostic' /* M1 */ | 'passed' | 'failed' | 'accepted' /* a failure or an unrated panel accepted by the owner in writing */ | 'provisional-not-rated';
   type D5Pair =                           // one per pair, in seeds.json and the record, in the order (2) lists them
     | { reference: 'MFCG'; rung: Rung; water: Extract<WaterSetting, 'none'|'coast+river'>; i: number; platSeed: string; refSeed: string /* 1 … 2³¹ − 2 */ }
     | { reference: 'FTG'; rung: Extract<Rung, 'TOWN'|'CITY'>; capture: string /* its folder name under captures/ftg/ */; water: WaterSetting;
         population: number /* PLAT's requested population: its FtgCapture's, from ftg-captures.json (2), (3) */; populationSource: 'recorded'|'nominal';
         platSeed: string; suburbFrame: boolean /* the rung's first capture, (3) */ }
     | { reference: 'NG'; template: 'area'|'street'|'square'|'ring' /* NG's names; PLAT's side: area = the district's own bent-cut fabric as a refine close-up, the others setAttr(district.fabric, template) as a replace close-up, (2) */;
         i: number; refSeed: string /* 1 … 2³¹ − 2 */; k: number /* the town of (2)'s search */;
         platSeed: string; population: number; district: string /* address id */; buildings: { ref: number; plat: number }; sizeMismatch: boolean };
   type FtgCapture = { capture: string; rung: Extract<Rung, 'TOWN'|'CITY'>; water: WaterSetting;   // plat/goldens/d5/<milestone>/ftg-captures.json: FtgCapture[], capture order (2)
     population: number /* the residents its decoded payload holds, or the size's nominal target */; populationSource: 'recorded'|'nominal' };   // research-side, numbers and ids only
   interface D5Record {                    // plat/goldens/d5/<milestone>/record.json
     milestone: string; status: D5Status; date: string; offeredAgainAt: string[] /* later milestones and releases */;
     pairs: D5Pair[] /* every seed a Seed as its decimal string */;
     platImages: Hash128[] /* PNG hashes of PLAT's side, in pair order */; key: { commitment: Hash128; revealed?: string };
     answers: { pair: number /* index into pairs */; question: 'legibility'|'realism'|'charm'; answer: 'left'|'right'|'same'; note?: string }[];
     verdicts: { reference: 'MFCG'|'FTG'|'NG'; question: 'legibility'|'realism'|'charm'; group: 'all' | Rung /* FTG: per rung, (6) */;
       betterOrSame: number; pairs: number; needed: number /* ⌈2n / 3⌉ */; worseOnEveryPairInARungOrTemplate: boolean; pass: boolean }[];
     thresholdPicks: { letter: string; picked: number | 'same' }[]; houseSheet?: string; acceptance?: { by: 'owner'; text: string; date: string } }
   ```

   The research-side `docs/validation/d5/⟨milestone⟩.md` — the human-readable record with the reference images'
   hashes — is generated from this file (§13.3); no CI job reads it.

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
| O13 (a) label curvature | a label's spine turns ≤ 45° over any window of the label's length (§9.3) | M1 | the spine's smoothing step doubles; a label still over the limit takes §9.4's next ladder rung |
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

### 13.8 CI tiers and compute budgets (SCL-18; D-34)

The full verification rig costs ≈ 10–20 CPU-hours (12 000 B-CITY generations ≈ 1.6 CPU-h before the suite; 10⁵ oracle
regenerations ≈ 8 CPU-h; 10⁶ fuzz inputs × ≈ 20 primitives ≈ 0.3–5.5 CPU-h), so it cannot gate a single change. It runs
in three tiers, each with a wall-clock budget on a stated runner (a 16-core x86-64 Linux machine; timings normalised by
§12.1's calibration score):

| tier | runs | budget | contents |
|---|---|---|---|
| **PR** | every change | ≤ 15 min on 8 cores | lint (the determinism allowlist, units, dependency direction, the repository path rule), type check, unit and contract tests; B-FUZZ with 10⁴ random inputs per primitive plus the whole constructive-degeneracy set; B-CITY-lite 50 seeds per rung × 4 water settings; B-EDIT 10³ sequences with the oracle once per sequence; stage-isolated goldens and the per-stop placement digests on Node x86 (§13.3); every shipped style sheet through §8.2's slot resolution at every band and the render keys across two B-CITY-lite seeds per rung (§8.3); the stamp-tile asset's loaded hashes and its seam check (§8.3, §8.10); the licence, notices and deny-list scans; the app's scripted and accessibility tasks on Chromium |
| **nightly** | every night | ≤ 4 h on 16 cores | B-CITY 1 000 seeds × 4 water settings × 3 rungs with the invariant suite and the screen of §12.3's model max clause on every generation; B-FUZZ 10⁶ per primitive; B-EDIT 10⁴ sequences; **the O9 (c) faithfulness campaign** (n = 800 scopes × K = 50, ≈ 12.5 CPU-min, §13.2); the five-engine golden run with one PNG per LOD and preset, the placement digests, the stamp-tile asset rebuilt on the five engines and its loaded hashes in both workers, the sliced-raster and sliced-placement census rows (§8.3), and from M3a the five-engine GeoJSON with trees (§13.3); visual regression and B-ZOOM; control sweeps at TOWN and CITY; the option matrix; the B-REF parity report; and, last and alone on the runner, **§12.1's timing phase** (≤ 20 min: the cost-model sweeps with the F-WORK flatness check, the first-map runs, the in-Chrome re-measure of the model budgets and the re-timing of the max clause's flagged generations) |
| **milestone** | every milestone exit, and weekly | ≤ 12 h on 16 cores | B-EDIT 10⁵ sequences; METROPOLIS control sweeps; the 20-epoch test; the parity report at five seeds per matched size; the D-5 renders, including every earlier panel still *provisional — not rated* (§13.6 (7)); §12.3's pool comparison in the timing phase at every rung the milestone confirms; memory and document-size tests at every rung |

A tier whose normalised wall-clock exceeds its budget by more than 10 % fails with *over budget*; the answer is to split
the job or make it faster, never to raise the cap — a budget changes only by a recorded decision. **Measurement (M0):**
the harness times each tier on the runner. **Pre-decided fallback:** if the PR tier exceeds 15 min, B-CITY-lite drops to
25 seeds per rung and the random fuzz to 5 × 10³ inputs per primitive (the constructive set is never cut), and the
nightly tier absorbs the difference.

### 13.9 The corpus-calibration interface (staged by the owner; DEF-9)

The owner's roadmap puts calibration against the historical map corpus after the standalone generators (the base,
neighbourhoods, buildings, the village) are built; the corpus lies outside this folder and is not read by this program
(the standalone ruling). The base carries the interface now, so the corpus phase needs one adapter and no other code:

```ts
interface CorpusAdapter { id: string; version: string; maps(): AsyncIterable<CorpusMap> }     // written in the owner's staged phase
interface CorpusMap { id: string; source: string /* archive, sheet, date */; era: string; region: string; populationEstimate?: number;
  features: FeatureCollection /* GeoJSON in metres: ways, blocks, plots, buildings, walls, water, greens, with their kinds */ }
interface CalibrationRun {
  id: string; corpus: { adapter: string; version: string; maps: string[] };
  metrics: string[];                                      // §13.5 metric ids, computed on corpus maps by the same parity code
  changes: { table: string; rowKey: string; column: string; from: unknown; to: unknown; evidence: string[] /* baseline ids */ }[];
  before: ParityReport; after: ParityReport /* §13.5 */; shifts: ShiftRecord[] /* one per moved stage, §13.3; cause.kind 'calibration' */;
}
```

1. The parity code computes every §13.5 metric on the adapter's maps research-side and writes `baselines.json` rows with
   `reference: 'corpus:⟨map id⟩'`, role *target* and `referenceBuild` = the corpus version.
2. A `CalibrationRun` changes table cells only; every cell is `{value, unit, provenance, calibratable}` (§7.6), and each
   changed cell's provenance becomes `{ source: 'corpus', evidence, date }`.
3. The run ships as a table-version bump inside an output-version bump with a shift record for every moved stage
   (§13.3, §6.4), stored in `plat/goldens/shifts/o<k>.json` with the run's id as their cause, so every existing document
   keeps replaying under its own output version.
4. The first tables it re-signs are the era and region presets (D-2), the rung profiles (§1.1), the granularity,
   site-plan and greenery rows (§4.7, §4.9) and the forms' signatures (§7.7); the §13.7 thresholds whose provenance is
   "architecture" or "owner-eye" are re-signed where the corpus measures them.
