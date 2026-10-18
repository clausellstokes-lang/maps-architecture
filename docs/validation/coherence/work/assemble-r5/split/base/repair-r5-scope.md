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
   * *stretch-state writes* (§2.2 rule 5's *Write*): random writes on open and closed chains that already carry a
     profile — each `StretchRef` inside an existing run, across one or more existing knots, ending on an existing
     knot's vertex, and over the whole chain — for `RetainingWall.state` and for an enceinte's three parallel profiles
     (`condition`, `conditionMaterial`, `conditionEpoch`) written in one batch: after every write each profile's knot
     rows lie on the chain in ordinal order from 0, no ordinal is held by two vertices at any step, no knot vertex
     dissolves, the canonical form holds, §3.10's stored-reference row passes at stage end and at save, and the undo
     restores every profile byte for byte; a negative control — the dropped knots stripped last — fails the bar;
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
     polygons; snapped rotated squares; plus B-CITY-lite's irregular footprints and district and water faces;
   * *the kernel at its limits (§3.11):* every case its rows name — no input, one item, the caps, degenerate geometry,
     missing or contradictory data, every rung from THORP to the METROPOLIS cap, every toggle and preset, and save, load,
     undo, redo, regenerate and migrate — each built on purpose and returning the outcome and tier its row states;
   * *expectations (§3.3 *Expectations*):* a batch whose `expect` carries a class floor its result breaks, under each
     `onFail` — `reject` (the version kept, the `E_BELOW_MIN_WIDTH`, `E_BELOW_MIN_AREA` or `E_BELOW_MIN_ANGLE` code
     returned to the stage's class), `repair` (a sliver below its width or area floor absorbed by `absorbSliver`, re-checked
     and the batch committed; a face below its angle floor still rejected after the repair) and `downgrade` (the version
     kept, the code returned for the ladder's simpler rung) — and a batch whose failed entry is not a class floor
     (`E_INVARIANT`); and
   the kernel's further limits: `buffer` with `miter` and `square` joins and `flat` ends (§3.7); `insetRing` at 0 (the
   face's ring), below 0 (outward, never collapsing) and on a non-convex face (`E_NON_CONVEX`, the caller taking
   `offsetFace` or a buffer union; §3.7 *Insets*); an arena holding only its outer ring saved and loaded (one face,
   §3.9); a frame growth whose frame and arena would be no larger (nothing runs), and one whose law would move a side
   out by at most `attractCm` — a CITY frame kept through a decline below 10 000 people, re-crossing two people above
   its peak (frame and arena kept, nothing runs, no chain stripped; §3.2 (9)) —, a village → town fold (the frame kept,
   the arena by the new law's margin, neither shrinking; §3.2 (9)), and its reverse — a TOWN made at 9 000 people handed
   down to the village product, falling below 400 and re-crossing it (the frame grown to the territory law's 3 373 m
   square, the arena kept at 4 293 m: (a) and (c) only, `Plat.frame` the new frame as (c) commits, its `marginShare` the
   kept arena's share; the hand-off up at 1 575 then growing the arena by (b) to 5 397 m; §3.2 (9)); a part-0 warp under
   a raised way (its feet held, §3.6); a raised way crossing part-0 ways (no junction, the two parts sharing no topology;
   §3.4, §3.10).

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
the 1 000 holed polygons; a skeleton failure is never a crash and never a visual surprise. The fixtures hold, per
failure class, one degenerate input of each kind — zero-length, zero-area, self-touching, collinear and coincident (§5.1
(9)) — and a fault-injection hook forcing each of the three bug aborts on B-CITY-lite: the batch rolls back, the report
holds one `bugs` entry with a replayable key, the entity takes tier 6 and every other entity's leaf digest equals the
run without the fault (§5.1 (8)). **`bugs` empty:** every CI run fails on a `bugs` entry outside those fixtures.

**Fixtures of items 12 and 28 (the kernel's rows in §3.4, §3.7 and §3.10).** *The underground
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

**Fixtures of items 45, 53 and 65 (the kernel's rows in §3).** *The regular
fit* (item 45's castle repair): regular n-gons (n = 3 … 12, radius ≥ 5 m), rotated and snapped, return every target
within 1 cm of its vertex and a compactness within 10⁻³ of that n-gon's own; every rotation of a ring's vertex order
and its reversal (clockwise input) return identical targets bit for bit; a thin rectangle (sides 1 : 3 or thinner) falls
below compactness 0.75, its targets lying on a square; a side split into many short edges leaves the centre unchanged; fewer
than three vertices, a zero-area ring and a vanishing first component return `E_DEGENERATE` (detail `fit`); the
service's doubles are identical under §6.5 (10)'s cross-implementation test. *The sampler* (item 53): every accepted
point lies within [r₀, (1 + a) r₀] of the active point it was drawn from, beside the existing Poisson minimum distance
≥ r. *The underground parts* (item 65): two systems crossing in plan without meeting commit in two parts with no vertex
at the crossing in either, each part passing every hard invariant; a link record resolves one vertex in each part; a
transaction on one part handed a slot of another asserts in a debug build; `corridorUnion` over a gallery chain gives
its kerb at `widthCm ÷ 2 + wallCm`; a chamber outline at L1 separates floor from rock, and S10's frontage cut lands on
the floor.
=== END ===

=== REPLACE ### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT ===
### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT

* **Invariants.** The §5.3 suite runs by scope — batch-local invariants per batch, stage-end invariants per stage,
  save / load invariants per document, CI-only invariants (§5.3's digest-maintenance oracle among them, on every
  B-CITY-lite city) in the harness — on B-CITY: 1 000 seeds × the 4 `WaterSetting`s of §13.3 × 3 rungs — seed i of a setting
  `H32("bcity/<rung>/<water>/<i>")`, B-CITY-lite its first 50, rehashed by V12 §2.4's collision rule, and every
  measurement family disjoint from them by that rule — in the nightly tier, 50 seeds per rung in the PR tier (§13.8), all three rungs from M1 (§1.1). Each invariant has an id, a severity,
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
  size (§3.3). **Batch cost:** every commit record's `work` and its `edgesAdded`, `edgesRemoved`, `steinerAdded` and
  `steinerDissolved` counts stay within a constant × the batch's touched faces — §3.10's O(touched) claim (SCL-1) — and a
  count that grows with the arena fails. The budgets these runs time, and their measurement rules, are §12's: the per-edit cost and validation
  flatness across rungs (§12.6), the memory test per rung (§12.8), the first map by size (§12.5), the pan-and-zoom run
  during an A2 300-dpi export (§12.7), the model max clause judged on re-timed outliers (§12.3), the simulation module's
  occupancy test at M4b (§12.7), all taken in §12.1's timing phase.
* **Document tests.** The entity registry's path test fails when a type is missing from any path — generation, digest,
  render, export, persistence, edit, undo, migration (O11 a) — its cases include `HistoryRecord`, `WaterBody.spring`
  and the `fedBy` links, `Enceinte.arcs` and `stretchClass`, `Gate.mouth` (§2.3, §2.7) and the `Way` and `Junction`
  lifecycles under §2.4's missing and contradictory data; export → import → export is byte-identical over the
  canonical form (O9 a, O11 c); the **document-size test** per rung holds ≤ 320 B per building at CITY (§2.9); the
  schema tests of the generation report (§5.4: a derivation meeting missing or empty inputs gives a whole report, its
  lists `[]`, never absent) and of the disruption budgets (§7.7 item 5: every request kind has its row), and the control
  registry test (§7.8: a disabled state without its reason row fails).
* **Stage contract tests.** The same inputs and stream give the same digest on Node x86 / arm64, Chromium, Firefox and
  WebKit, with workers on and off and pool sizes 0–3 and no merge raising `E_SCOPE` (§3.3 pool step 3, §3.10's
  pool-scope row), beside §6.5 (9)'s determinism tests (each on one fixture per base
  rung and a METROPOLIS fixture at the population cap). **Op-order determinism:** a
  declared batch's ops permuted give the same result (§13.1); a callback-form stage run twice, on a slot-renumbered
  arena and inside the pool at sizes 0–3 gives identical digests (issue order; op permutation does not apply to it,
  §3.3). S8's working block equals S9's committed block (Hausdorff 0; §3.7). The stored `market.siting` cell `portRef` equals the median port demand fraction recomputed by running S0–S2 alone on every B-CITY harbour seed, from M1, where the scripted pass first sets it (§4.2 S3 (12); J-A24.43); a differing value fails. The per-stop placement digests of §13.3
  are the contract test of S13b; a stop placed whole and placed one unit per step gives identical placement digests
  (§8.3, §9.2). The stamp-tile asset's hash and rebuild tests and the view-data contracts are §8.3's; the shipped stamp
  tiles pass §8.3's seam check (§8.10). **The host-content door (door 4, §11.4; J-S46):** a fixture `ContentProvider`
  registered after §11.4's double-run check replaces the roster, the siting and the people derivation at their call
  points (§4.2 S2, §4.7 S10b, §10.3), its outputs recorded in the document; the document replays to its digest with the
  provider unregistered, from the recorded outputs, and a provider whose two runs differ is refused registration.
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
* **The edge suite B-EDGE** — one fixture per row of §4.13's edge table (its EP rows) and per cell of its combination
  table, at every rung the row names and under every preset (the parity presets, each layer on and off): the home's
  stated outcome, hard, 0 per 1 000.
* **The rendering, label and export edges** — the T-ER rows of §8.11, §9.7 and
  §11.6: census rows of §8.3's kind, each fixture holding the outcome and ladder rung its row defines; their bars are
  those rows, scheduled by §13.8.
* **B-EDIT and the locality oracle.** §7.3 item 7 (i)–(iii) and (v), and (iv)'s byte identity of Regenerate (keep
  settings), run **once per sequence** — at its end and at one seeded random position — never per edit. Fixtures: §7.1's
  empty-edit forms, each leaving `nextSeq` and both digests unchanged; §7.2's lock, pin and declaration fixtures; §7.4's
  *every kind at the edit boundary* fixtures — each kind edited, locked, undone, saved and loaded, and regenerated at
  every rung where it exists; the re-parenting set (`drawBoundary`, district merge and split, `outskirtToDistrict`, regenerate around a lock, the
  id-recycling case); terrain-brush sequences in both water modes, and course-knot, drawn-water and drawn-bridge
  sequences with §7.3 item 7 (v)'s assertions and its water-edit fixtures; table weight edits and row insertions; drawn
  features mixed with later attribute edits; epochs and rebases; an epoch after 20 edits and a Re-derive from S10 after
  20 edits, each at pool sizes 0 and 3 with identical digests, every freeze finding every dynamic grid and tombstone set
  empty after its rebuild (§3.3 pool step 1) and no merge failing with `E_SCOPE` (§3.3 pool step 3, §3.10's pool-scope
  row); undo and redo from several sessions and §6.5 (9)'s truncation, naming and
  version-pinned cases (§7.4); an undo after a reload of an unshared document undoing the pre-reload event (§7.4); New
  random on minimal scopes (§5.1 (6)); the naming-collision replay fixture (§7.3 item 7 (i)); the B-EDIT-lite identity
  fixtures (≥ 99.9 % of addresses kept under 1 cm perturbation, §6.3); §7.3 item 7 (vi)'s shared-edge identity, and
  Regenerate (keep settings) of a block holding a rich compound whose yard has a formal-garden grid and an orchard part
  with edges ending on the house wall — byte-identical to the one-click result, the wing rings after generation already
  carrying those wall vertices (§2.6); a warp over a square keeping its fountain, over a yard keeping a user-moved tree,
  and one halved by a pinned pin (§7.4); a warp and a `moveVertex` over a lit street with an inn — every street light,
  the inn's door light, a hand-placed light on a pin and a junction light on a tunnel carried in their host faces by
  §7.4's rule, the door light keeping its fraction of the footprint ring's edge nearest it and never re-seated, through two successive warps, the second starting from its lattice-rounded point off that edge, and passing §5.3's light row after each, a
  light pushed inside its `sizeCm` clearance re-seated, one whose inset empties re-placed when generated and orphaned
  and reported when hand-placed; an access point's opening carried in its ground host; a building under a demolition
  Works whose kept rings take their mean-value images unre-seated; undo restoring every former point byte for byte and
  a replay reproducing them (§7.4; J-A68.73); **§2.6's test** — a warp and a `moveVertex` over a built block with an L house,
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

* **The owner-item bars and their convention.** The bars `T⟨item⟩-⟨n⟩` of the owner items are stated once, here, and prove
  the mechanisms at the homes §0.2 names. Every group keeps one convention: (1) a bar is hard — 0 violations, or 100 % —
  unless it names a band; (2) it runs in the CI tier and from the milestone §13.8's schedule gives it; (3) a staged
  engine's bars run on hook fixtures, its conversions applied by hand, until the engine lands, when the same bars bind
  it and the volume tests the table at the end of this section names take the clauses it names; (4) a bar that meets a
  golden follows §13.3's declared-shift rule — no golden exists before M1 (D-24), so the attributes that land before it
  need none; (5) every no-op pin is a `NoOpPin` registration on V12 §3.7.8's engine, its off form the item's
  switch cells in volume 11 (V11 §3.24.0 for items 110, 111 and 113–115, V11 §3.7.4's web off form for items 105 and
  107, the cells the bar names otherwise) — a view pin's off form the view state its bar names (`view`: items 117,
  118, 120–122, 124 and 126), an input pin's the input withheld (`input`: item 125's host context) and an entity-scope
  pin's the entities its bar names (`entityScope`: item 123's never-decayed buildings) (V12 §3.7.8 (5)); (6) a bar that compares with a random or shuffled baseline is a `NullModelSpec` run by V12 §3.6's
  harness, §13.7's correlation row its pass rule unless the bar states its own, and a tendency bar of another shape —
  "in most placements", "at or above the floor", "at the ranked share", "at every rung", "rises with", "higher with than
  without", "rising monotonically", "differs from", "beats the baseline", "within tolerance of the base's" — a
  `StatBarSpec` run by V12 §3.6b under §13.7's tendency row (V12 §3.6b's bar map lists each); a fixture
  property is a conformance clause, listed in the harness registry's `conformance` list — items 120–126's statistics
  and pins measure such clauses (V12 §3.15); (7) a bar a register line names
  as `bar.<id>` that no `NullModelSpec` or `StatBarSpec` carries is a `BenchBarDef` (V12 §2.1; `@plat/testkit/bars`,
  §14) keyed by the bar's own id, registered by the seat landing the milestone whose exit writes the entry — the base's
  T16-4 by volume 11's C1 seat (V11 §8), T112-1 by the M3b seat, T113-1, T113-3, T113-4 and T113-6 by the M6-E and M6-U
  seats, and the bench bars of items 114–126 by the seats landing their mechanisms (§13.8's schedule). The entity registry's path
  test (above) covers every record and attribute §2.8's registry lists — `Passage` and the tunnel's `navigable`,
  `headroomCm` and `closure`, `Block.due`, `ElaborationRecord`, `Works`, `LightSource`, `UndergroundSystem`, `Gallery`,
  `Chamber`, `UndergroundLink`, each kind's dossier paths, `Plot.tenure`, `District.character`, `identity`, `pressure` and
  `nameHistory`, `Assignment.state`, `Institution.powers` and the staged records, schema-complete and empty — and the
  enumeration test every event kind of §7.1.
* **Items 8–31.**
  * *Decline and regrowth (item 8; §4.11).* (T8-1) every `DeclineOp` kind applied by hand on the golden TOWN undoes to
    byte identity; (T8-2) the regrowth-first fixture — a TOWN with 12 % of its buildings vacated, derelict or cleared by
    hand, then grown by +6 % population: 0 new S5 faces, ≥ 95 % of the delta placed inside the old plan, every
    vacancy-run share within ± 0.02 of its table share; (T8-3) 20 epochs of hand-applied decline and regrowth keep the
    address of every ruin, trace and superseded ring (100 %), and no cleared building gets a tombstone unless
    demolished or succeeded, and a front building made a footprint trace or demolished leaves its passage with no `frontBuilding` and no base wing spanning it, the undo restoring both (§2.6's `BaseWing.spans`); (T8-4) the exposure function is monotone in each driver's weight, and its chance share
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
    defaults a count of 0 has probability 1 − 0.6 · h(S_town); on 1 000 seeds of a hook fixture whose built land lies
    wholly in the rich band every count 0–3 is observed, the sky's own bars being V05 §7's; and hiding the sky layer changes no model digest (J-A15.01).
  * *The underground (items 11, 12, 14; II.6, II.7).* (T11-1) tunnel conversions by hand undo exactly; a `caveIn` given a stretch splits the tunnel at the stretch's widened ends (II.6, §6.3; J-A11.43) — the first-vertex part keeping the address, every part continuing the lineage, the chambers and access points re-pointed, and each underground block's `Frontage` that spans an end split there (each part beyond an end a new record with its kerb edges' rows, one spanning both ends of an interior stretch split in three, each part keyed by §6.3's rule for a split `Frontage` and re-pointed to the part it fronts) — closes only the plots fronting the stretch, leaves U1 holding on every plot, and its undo restores the one tunnel record and each split `Frontage`'s one record; no
    `EvolutionStrategy` plan on the hook fixture contains a tunnel `demolish` (a lint); a sealed tunnel persists at its
    address and reopens; (T12-1) a schema fixture of one underground neighbourhood — two navigable tunnels, a junction,
    six cells, one vault, one stair, two gratings — validates and passes every row of §5.3's U1–U3 family: each
    underground plot's frontage rows on exactly one navigable open tunnel run, no `way` chain and no `alley` face on
    the underground arena, every building's frontage side on its plot's frontage edge, ≥ 1 access per neighbourhood,
    every access point in public ground, a yard or a building's basement — a `cellar_stair`, `ladder`, `hatch` or
    `door` only from the basement of a building II.7.3 admits (its neighbourhood rule's class row or a `secret` plot, or
    its *Basement accesses*, item 64) or that an access edit gave one (§7.3 item 9) —, every `grating` on public ground, 0 underground faces under an excluded ground face (also on
    B-CITY-lite with the `navigable` preset), and the underground stage's commit records holding 0 writes on the
    ground `PlatKey`; the underground reroll-isolation fixture leaves the ground byte-identical, and the cut-away or
    overlay draws one depth band at a time (§8.4); (T14-1) the TOWN
    existence draw's frequency over 1 000 seeds at three populations × three wealth levels lies within II.7.1's law
    ± 3 s.e. and never reaches 1; `Features.sewers` is true on 100 % of CITY and METROPOLIS seeds; a TOWN with `off`
    and a village request carry 0 tunnels; with the layer hidden and a parity preset (`MFCG` or `FTG`) on, a CITY's render matches, pixel for pixel, the render
    the same seed gave before the staged stages registered; under the default presets the ground differs only by the
    households and `preferred` uses S7b (6) and (7) send below, a one-time shift of the M6-U output version recorded in
    `plat/goldens/` (§13.3).
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
    mutation keeps every kept part byte-identical (leaf digests) and leaves everything outside its event's effective scope untouched (§7.3 item 1: the plot, its joined neighbour, each displaced use's new site and the buildings and plots its capacity re-homing touches; the locality oracle); (T18-2) locked parts are never subtracted; (T18-3) A → B → A by the
    inverse mutation is byte-identical when nothing else changed, and one change from one starting state yields one
    mutation record on every host; (T18-4) S11 run as a mutation from the empty design reproduces generation
    byte-identically; (T19-1) every roster class has a designation template with every band row (registry test);
    (T19-2) the size budget is monotone along prosperity (Spearman ≥ 0.9 over B-CITY) and continuous between adjacent
    samples by §7.8's rule on the template's continuous columns — two smiths a few streets apart differ by degree;
    (T19-3) a `setAttr` material change leaves the geometry subtree of the digest unchanged; (T19-4) with no epoch
    every residential building houses at least one household and at most its capacity (§2.6's function) — the households S10b placed in its slot (one to its template row's `households.built`) clamped into [1, capacity], but for the moves §4.7's overflow pass reports — every building S11 builds for a slot without `houses` (§10.2; `BuildingSlot.unhoused`, §2.5) houses none, no plot's site plan holds a `required` structure below its least `count`, and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46); on a fixture whose district holds a live-in workshop and no household of its band or drift, the workshop's plot keeps its use and its main slot, which S11 builds without `houses` — `BuildingSlot.unhoused` set (§2.5), capacity 0 (§2.6), housing none, `Building.dwelling` absent — the typing reported (§4.7); on a dossier fixture whose squalid district's shells hold fewer households than their template rows, every household that fills the dossier's population is housed — those no building has room for in a residential slot the `dossier` request re-provides in their district —, no building exceeds its capacity, and each re-provided slot is reported (§7.7 item 2; the dossier clause, from M3a).
  * *The dossier (items 20 and 22; §7.7).* (T20-1) a map delete of a dossier-backed element re-places it coherently from
    the same seed, every plot outside the disruption set byte-identical; (T20-2) by §7.7's lapse rule, the rejection lapses at
    a dossier event touching its block (the dossier-event clause) and at the first epoch whose population target has moved
    from the one it recorded by more than the roster tolerance (± 5 %, §4.11; item 76), a drift inside it lapsing nothing
    (the epoch clause, from M4), and an undo of a lapsing epoch outside the port's session `host:port` restores the hold, while an `undo` naming a lapsing event of session `host:port` (a dossier event, or a port epoch whether or not it carried a dossier change) returns F-EDIT (§7.4 *Replay semantics*); (T20-3) a blocked positive placement returns its blocking rows and ≥ 1 closest site;
    (T20-4) generator-added filler deleted, the dossier's housing re-provided elsewhere; (T20-5) the one-way
    door (item 20 (a)) — an enumeration of the bridge's message kinds (§11.3) finds no PLAT → host message that
    addresses the dossier (`doc.changed` carries map-document events only, `report.changed` the map's report), and over a
    B-EDIT sequence `report.changed` carries every rejection, placement, lapse, relocation and mutation record the
    sequence made (§5.4's entries); (T20-6) by §7.7 item 2, a map `unassign` of a dossier-backed element, a map `setAttr` of its use or class, a hand `convert` `closeUse` of its use or `mutate` of its plot to another designation, and a plot `join` or `split` whose fate would demolish the building that houses it each return F-EDIT with `rejectSite` and `placeAt` offered and change nothing, while a `relocateUse` of it commits, and a `revert` of it skips every later event of session `host:port` that placed or re-designated it, its dossier content unchanged (§7.4 *Replay semantics*; item 20 (c)) (the refusal clause); on a B-CITY dossier fixture whose dossier-backed use stands in a declining quarter, a hand `convert` `vacate` or `demolish` of the building that houses it returns F-EDIT, and in every epoch whose use step, redevelopment, population fall or conversion reaches the use or its building the use is never closed and its building is emptied or removed only after the use has moved — a pinned use keeping its building (§4.11's *Dossier content across epochs*) — with §5.3's dossier row holding after every epoch, and an `undo` naming an epoch of session `host:port` — one that carried a dossier event in `EpochInputs.dossier`, and a year-end epoch that carried none — returns F-EDIT and changes nothing (§7.4 *Replay semantics*) (the epoch clause, from M4; J-A17.01); (T22-1) the same history from
    the same seed gives one digest; (T22-2) two histories reaching one dossier give two valid maps whose differences
    are confined to their disruption sets; (T22-3) an over-budget dossier event lands and is reported; (T22-4) a
    brand-new map from a dossier holds every dossier element from the start, and everything outside the report is
    byte-identical after any dossier event. §7.7's precedence (a dossier event is never refused by a lock or a pin; it
    supersedes the lock on what it changes, reported orphaned): (T20-14) a dossier rename on a locked name path, and a
    `ruined` and a `removed` state on an institution whose building is locked — each lands, the lock is reported
    orphaned in the event's disruption report, and every other locked entity is byte-identical; (T20-15) a dossier
    population fall over a town whose remaining households all live in locked dwellings — the population met within
    the roster tolerance by `relet`s down, every locked building's state and shell byte-identical, the emptied ones
    counted in `uses.heldByProtection` and no `vacate` emitted on a locked or pinned building; (T20-16) a fall over a
    town whose remaining households are all locked — met within the roster tolerance, the locked and pinned households
    taken in the roster's suffix order, every superseded household lock reported orphaned.
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
    buildings (rectangles, L and T shapes, a court closed by a U, a quad from a curved row, a rectangle carrying a round tower, a rectangle holding a round tower wholly inside it, a rectangle carrying two round towers whose rings overlap, a T of two overlapping wings whose second wing holds a round tower that also overlaps the first, a rectangle carrying a stair turret (a round tower whose spiral core's bay fills its round room), a
    manor of three wings at unequal storey counts), each in six classes and three bands with one to four storeys, the
    entrance sets of item 29 and a cellar wherever the class row gives one; from M6-P's intake, the plans of every clicked
    building of B-CITY-lite as well. Hard: (T28-1) each room the programme marks hard is present, and soft rooms are
    delivered, folded into a neighbour or dropped, each with its tier in the report — except on a building with no
    storeyed wing, where a room, hard or soft, whose storey rule admits none of its basement storeys is dropped under
    the plan report's note `solidMonument` (E-28) and listed in the report with no tier (V03 §3.1 step 2, V03 §3.2 A5 (b),
    V03 §2.3); (T28-2) starting at the main entrance — on a building whose every ground wing is solid, at the landing door of the
    first storeyed wing its stair chain reaches (§2.6 *Entrances* rule 5; V03 §3.3 S6), and a building with no
    storeyed wing has no room above the ground to test, its basement storeys, where it has a basement, reached from the
    room its outside door at `basementDoor(b)` opens into (V03 §3.1 step 2) — and, for a basement whose
    `Basement.access` is `external`, at its outside door where step 3 opens one (§2.6 step 3), openings and stair cores
    lead to every room of every storey but a structural face's (roles `stack`, `shaft`, `column`, V03 §2.4) — a
    concealed room, for a key that admits its use, from its concealed entrance where it has one (item 63), a lifted
    chancel through its choir flights (V03 §3.7.6), and a wing standing on another through the exterior flights of
    its stair chain and its landing door, terrace exit or terrace door (V03 §3.3 S6); each entrance gives onto a room; a passage can be
    entered from either of its ways; (T28-3) stairs stacked — a stair core occupies one bay through all the storeys it
    serves, and the basement is entered by that core, through a trapdoor — the one `Basement.access` names, or the `trapdoor` core the plan reports where no bay of the core fits the basement ring or, for an external access, where `basementDoor(b)` gives no door (§2.6's fallback, step 3; J-A29.25) — or, for any other external access (a walk-out, or a building with no storeyed ground wing), by its outside stair at `basementDoor(b)` (V03 §3.7.1); (T28-4) the outer walls
    coincide with the wings: on each storey the rooms together cover exactly the extents of the wings reaching that level
    plus the span ring of each passage a wing spans, at the ground storey only — the passage room (§2.6's fourth rung) —,
    each exterior wall segment sits along the edge of such an extent or span ring, each room's ring is simple and lies
    within its wing's extent at its storey (the passage room within its span ring), each composed tower's round room at each storey the tower reaches — with any spiral core's bay (`StairCore.tower`) or chimney stack standing in it, or that bay alone where it fills the room (a stair turret) — covers exactly the tower's ring there less those of the earlier towers in the clip order that the tower overlaps (§2.6's stage-3 contract), and no gap or overlap remains between rooms (§3.10's seed-tiling row per storey); (T28-5) each chimney rises from a hearth's
    column, and a dormer exists only where a roofed room needs light; (T28-6) one building state, one plan, host after
    host (§6.5 (9) applied at the building band); re-rolling the layout preserves the stair core, the wings and the
    entrances bit for bit, and re-rolling the roles keeps every ring and every opening's position bit for bit; (T28-7) no edit or
    re-roll of a plan touches anything beyond its own building; (T28-8) `plan()` meets §12.7's row at its median per
    building, one plan for each click, and the cache stays within §12.8's line; (T28-19) the JSON `plan` block validates against its schema
    and round-trips, and every storey scene's portals equal the plan's openings and entrances (§11.1). Every T-V3
    test (V03 §7) runs on the same fixtures from M6-P's intake, T-V3-23 (a)–(d), (f) and (g) also at the model level
    from the crypt's landing (M6-U; file f item 238). Soft bands, reported: no unit room used as a
    passage (its door count within its row's cap); corridors never doubled in parallel; the share of each storey given
    to circulation, by class and band; room areas ordered as their rows' target areas; unit and service rooms no shallower in the door
    graph than the shared and circulation rooms of their storey; a loop in the door graph only when a row calls for one (§13.7's row). Elaboration: (T28-9) click order
    changes no digest — one document elaborated in two orders has identical model, records and derived-complete
    digests, and the cache holds byte-identical results per (entity, rung, input digest); (T28-10) a `stale` rung
    re-derived by mutation keeps every surviving room's address, and viewing never re-derives a `current` rung;
    (T28-11) an evicted cache re-derives to the same bytes, and a corrupt cache chunk is dropped and re-derived, never
    trusted; (T28-12) clicking a neighbourhood makes its buildings' `wings` rung `current`; clicking a building does
    the same for `plan`, after `wings` where that is still absent.
  * *Stage 3 (V02 §7).* Every T-V2 test (V02 §7) and the B-MASS fixtures, in the tiers V02 §7.6 and V02 §7.7 name — the
    bars of V02 §7.7 whose subject a base item lands before M6 run from that item's milestone (T-V2-44 – T-V2-47,
    T-V2-50 and T-V2-51 at M3a; T-V2-52 at M2b).
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
    falling to the next poorer form first (the F-PLAN clause, from M6-P's intake); (T28-18) a hand `relet` above §2.6's
    capacity returns F-EDIT (the `relet` clause), and a `setRoomUnit` that would leave a unit without its own door
    returns F-EDIT (the `setRoomUnit` clause, from M6-P's intake); on a B-EDIT fixture a `setAttr` of a tenement's heights, a `moveVertex` that shrinks its footprint, a moved face of a passage it spans and a §7.6 edit of its template's `households.max` each lower its capacity below its households, and each edit's dry run lists the households past the capacity (the last in address order, a locked or pinned one passed over) with their `relocate` moves and holds that building and the receiving buildings in its effective scope; after commit no building houses more households than its capacity (§5.3); the undo of each returns every household to its former building byte-identically; a prosperity-brush stroke that lowers the tenement's plot `builtBand`, bringing its capacity below its households, re-homes its excess the same way, and the stroke's undo returns every household to its former building byte-identically (§7.4's setField row); a `setAttr` of the tenement's plot use to a class that leaves it no residential slot (capacity 0, §2.6) re-homes every household it houses the same way, and its undo returns the tenement's design and every household to its former building byte-identically (§4.7 S11 rule 5; §7.4's Application); and an edit whose excess cannot be re-homed — its locked and pinned households alone above the new capacity, or a household that fills no dossier's population that no residential building of the district has room for — returns F-EDIT; on B-EDIT dossier fixtures whose district has no residential room for the excess and whose tenement holds no locked or pinned household — one whose re-provision moves a use, one whose re-provision joins two plots — each of these edits, the brush stroke among them, commits, the households past the capacity that fill the dossier's population housed in the residential slots the `dossier` request re-provides inside the district (§4.7), its dry run listing each such slot with the use its re-provision displaces or the plots it joins (§7.3 item 4) and holding the plots that request touches — each site with its joined neighbour or the displaced use's new site — in its effective scope (§7.3 item 1), and its undo restoring those plots and every household byte-identically (§7.4; §2.6's capacity rule; the re-homing clause).
  * *Entrances and basements (item 29; §2.6).* (T29-1) each building has one main entrance and only one, facing its
    street, its court or passage, or — a cluster structure — its footpath (§2.6 rule 1) (100 %; O5 (f)'s doorless count stays 0); (T29-2) no side or rear entrance without an access
    edge beyond the frontage, and the caps per class hold; (T29-3) no cellar under the flood band or on the water
    table's damp ground; (T29-4) every basement inside its ground-floor footprint and smaller, with its storey in
    `Heights` and its access by one of the three ways §2.6 gives it — the stair core, a trapdoor or, for an `external` access (a walk-out, or a building with no storeyed ground wing), an outside stair; the entrance row of §13.5, class C — the owner's rule (item 50) — stands for the main door; (T29-5) a VTT portal at every
    entrance of the set, and glTF and CityJSON basements below `baseCm` that validate (§11.1).
  * *Hidden plots (item 30; §4.6, §9.2).* (T30-1) every hidden plot is reachable by a chain of access edges — alley,
    court and passage faces — from a public way, 100 %; a sealed plot reads `sealed`, is reported, is never landlocked,
    and reopens; (T30-2) the hidden share per district lies within its target ± 0.03 — §4.6's band rows interpolated at the district's area-weighted mean prosperity value and scaled by its rung and density factors (§13.7); (T30-3) no label
    of a local or secret place appears at the settlement band without the viewer's knowledge key, and no secret name
    enters an export made under a view state without it; (T30-4) the parity presets and the village rungs produce 0
    hidden plots, and a hidden court passes §8.5's figure-ground metrics, reading as a court behind buildings; every passage with a `frontBuilding` has its `headroomCm` written and equal to §2.5's rule, after a heights edit of a spanning wing too, each base wing spanning it has at least two floors and an eave above that headroom, and a heights edit that would leave a spanning wing below two floors returns F-EDIT;
    (T30-5) by §11.2's knowledge rule, on a document holding a `secret` institution, `query` of every kind (`gazetteer`,
    `people`, `whereIs`, `relations`, `hit`, `inView`, `why`) and hover list its row with `withheld: true` at the `public` tier
    — a view-bound kind (`hit`, `inView`, hover) at every band coarser than the building band, the one band §9.2's table
    admits it at; a person working there naming it by its address only; the band-less kinds and a GeoJSON export
    withholding it as at the city band — and its name at `secret`; a `why` on the withheld place answers at `public` with
    its address and kind only, `withheld: true`, and no rule, input or alternative, and on T63-2's front fixture the front's
    `why` is the front's own and a `why` on a concealed part answers empty, no answer naming the concealed function; and at
    `public` a `why` on another building whose relation rows, supply edges or alternative sites include the withheld place
    gives that place by its address and kind only, `withheld: true` (§11.2's oracle rules (1)–(4)); a viewer's `preview` of
    any event returns `status: 'refused'`, `reason: 'role'`, with no fates, renames, counts or shape, and an `editor`'s
    `preview` of the same event returns its dry run (§11.2's *Knowledge*);
    `export` of `.plat` and of a permalink under a
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

* **The code-reading items 33–62.** The mechanisms restated from the references' code change no golden, and the
  reference numbers they reproduce stay §13.5's rows (J-A41.01, J-A41.02).
  * *The bent cut (items 34–41; §4.6).* (T34-1) every block S8 commits has an OBB minor extent below the `τ` drawn for
    its face and every face it cut one at or above it, replayed from the `cut.stop` draws; over 10 000 faces the mean of
    `g` lies within 7/30 ± 3 s.e.; (T36-1) the start A draws nothing — a face planned with a different `cut.t` stream
    keeps its A — and lies on the run most nearly parallel to the working major axis (ties: the earlier run); (T37-1)
    every kept corner K lies at least `o` from both ends of its first leg, or at `λ / 2` when `λ < 2o`; every second leg
    meets its far run square within the lattice tolerance; under `flatten` no kept corner's triangle A–K–foot is lower
    than `max(cut.flattenM, 0.02 × |A–foot|)`; under the `MFCG` preset every cut whose first leg meets its run within
    `asin(√0.99)` of perpendicular, and passes step 8's checks, is straight; no cut bends twice; (T38-1) fillets on lane and street
    cuts only, never on a plot cut; each arc touching both legs tangentially and curving the shorter leg from end to end, its chords no shorter
    than `w_min` or the lattice minimum edge; the filleted share on NG's recorded face shapes within §13.5's fillet bar;
    (T39-1) rung (a) plans at most three frames per face, each turned 36° from the last, and never restarts anything
    above the face; a face every frame fails reaches rung (b), reported; (T40-1) inside one district lane widths are
    non-decreasing in the lane's length, inside the class's width band, and never narrower than a lower class; (T41-1) a
    registry test — `cut.stop` registered with its reader, `cut.side` and `cut.farSideAlt` reserved ids that no reader
    draws (§6.1); and §13.5's bent-cut signature row, its fillet share included, on NG's recorded shapes at M0 (b).
  * *Plots (items 43, 44; §4.7 S11).* (T43-1) every plot's `frontJitterCm` is 0 or in [`jitter.minM`, min(√(plot
    area)/3, `jitter.maxM`)] at its interpolated columns, and over the plots whose depth does not bind, the share of
    receded main slots per band row lies within ± 0.05 of the law's expectation — the mean over those plots of max(0,
    1 − `jitter.minM` ÷ cap), cap = min(√(plot area)/3, `jitter.maxM`); (T43-2) on bent and curved frontages every row
    footprint's front chain lies at `h` from its frontage along the normal (within the 0.71 cm hot pixel) and every party
    wall is its plot side line; (T43-3) no recession lies in (0, `attractCm` + 1 cm), and an `editTable` or `editPreset`
    setting `jitter.minM` below that bound is refused naming it (F-EDIT); (T43-4) under the `MFCG` preset the recessions
    follow 4.8 m and 2 m, and the institution, tents and cluster rows draw none under every preset; (T43-5) a designation
    mutation that keeps the main slot keeps its `frontJitterCm`, and Regenerate (keep settings) reproduces every front;
    (T44-1) under the default preset every prosperous or rich set-back compound carries a `wall` PlotBound with a gate on
    each access edge, and under the parity presets none carries a wall.
  * *Walls, gates and districts (items 45–47; §4.8, §4.2 S3 (4), §4.4, §4.5).* (T45-1) a thin castle claim — its nearest
    boundary vertex within `castle.minInnerM` of its centroid — is bloated before any equalise pass; a repaired claim
    reaches compactness ≥ 0.75 with an `on_enceinte` claim's weld vertices and, once fixed, its gate side's ends unmoved;
    a claim the repair cannot bring to the gate goes to re-site with a report and never restarts anything; (T46-1) on
    walled B-CITY seeds whose pick contour follows a sea or lake shore over at least a `gate.waterfrontShare` share of it, the main gates equal §4.2 S3 (4)'s reduced `N₁` exactly unless N was requested, and every trace is smoothed by
    exactly `wall.smoothPasses` passes with its gates, welds and shore vertices unmoved; (T47-1) districts seeded at a
    gate, the castle or a bridgehead have a median area below the town's median district area on ≥ 90 % of B-CITY seeds,
    and a scoped regroup (§7.3's S6 row) replays the same turns by seed lineage (J-A47.01).
  * *The hinterland (item 57; §4.9).* (T57-1) under the sector-look preset in `demand` mode no field cell is more distant from the settlement's edge than a non-field cell of the preset's admissible land (the outward order); under `fill`
    the field land equals the mode's; the farmstead count equals the farm table's under both sector variants.
  * *Drawing and labels (items 54, 55; §8.2, §9.3).* (T54-1) under `ink` every footprint's raised under-copy is swept by
    the sheet's base offset times its class's ratio — house 1, landmark 2, farm building 0.6 —, on 100 % of footprints;
    (T55-1) the horizontal spine is the first candidate of every area label whose tree has ≤ 64 leaves, and the candidates depend on the model alone — identical under every view rotation and zoom, as §6.2 requires of hashed label
    candidates.

* **The owner rules 20 (h) and 63–72.**
  * *Clandestine institutions (item 63; §4.7).* (T63-1) every clandestine institution is placed in one of its allowed
    modes — front, hidden or underground — or in its reported fallback (underground → front → hidden); (T63-2) at the
    `public` tier every view, label, query answer and export shows only the front — the true function, its concealed
    rooms, door and link withheld (T30-5's enumeration, run on a fixture holding a front with its hidden function) — and
    at `secret` both; (T63-3) the B-PLAN fixtures confirm that a front's concealed rooms are reachable only from its
    concealed entrance or its service side (from M6-P's intake; in the base the schema fixture carries the flag and the door);
    (T63-4) over 1 000 seeds the `underground` mode is never chosen without an underground allocation (II.7.3), and the
    parity presets place no concealment.
  * *Basement access (item 64; II.7.3).* (T64-1) an access point stands only where a basement lies within the access reach
    of a tunnel or a sewer dwelling; (T64-2) over 500 CITY seeds on the layer's hook fixture the access rate of each class lies
    within its row's probability ± 3 s.e.; (T64-3) clandestine buildings over a network carry an access at least at their
    row's rate times the concealment multiplier. T12-1's clause on where an access point stands is the amendments-b
    group's (public ground, a yard or a building's basement).
  * *The underground family and the undercity (item 65; II.7.5, II.7.6; the geology flag, §4.2 S1).* (T65-1) an undercity exists only where a void
    source exists and at least one lifeline reaches it; (T65-2) on 500 seeds per rung its neighbourhoods stay within
    `RungProfile.layers.undercity` (§1.1) — none on the village rungs, at most one at TOWN and only above that row's
    population floor, at most two at CITY and three at METROPOLIS — and the circumstance `require` gives one at TOWN and
    above while `forbid` gives none; (T65-3) every building under a ceiling is capped by it (its eave below the chamber's
    ceiling less the row's clearance); (T65-4) every connection link is typed (open, gated, secret, collapsed, flooded)
    and knowledge-gated; (T65-5) the population stays whole — the settlement's households are the same set with and
    without an undercity; (T65-6) U1–U3 hold on the sewer's part with an undercity present, and re-deriving one
    underground system leaves the ground and every other part byte-identical but for the far `link_end` vertices of its
    links, each placed, kept or stripped by one transaction on its own part — a stripped one restoring the edge it split
    unless other geometry has met the vertex since (§3.4) (the per-part twin of T12-1's reroll isolation; §3.10's row);
    (T65-7) with `geology: 'auto'` and each relief class set by the site request's `relief` toggle (§4.2 S0), over 1 000
    seeds per class the shares S1 resolves to `soluble` and `volcanic` lie within ± 3 s.e. of the feature table's geology
    row at that class, each resolution recorded in `autoResolved`; with `relief: 'auto'`, over 1 000 seeds per rung the
    classes' shares lie within ± 3 s.e. of the rung's relief row, and a digest whose `site.terrain` is given — a
    test-side edit of a fixture's digest — takes the class §7.7 DR1 maps it to; setting either toggle moves no other S0
    draw (§6.1); and every run under the parity presets, and a sky island's terrain (from M4, on the islands' hook
    fixture, II.6), reads `ordinary` (§4.2 S1 (10); J-A65.49, J-A65.02); (T65-8) on a TOWN hook fixture with the
    undercity forbidden, a test-side `HistoryHint` (item 88) carrying one `fire` scar of severity 0.6 makes one `buried`
    system at generation — its region the districts of growth stage 1, its galleries their way centrelines 320 cm below
    the present grade, its chambers their buildings' ground storeys — and the log records no `raiseGrade`; a scar of
    severity 0.4, an empty hint and the parity presets make none; and the ground arena's digest is the same in the 0.6
    and 0.4 runs and in a run whose hint keeps their `ageYears` and no scar (II.7.6's *A buried old town*; J-A65.46,
    J-A88.42).
  * *The closure rule (item 66; §7.3 item 9).* (T66-1) `addUndergroundAccess` on a building without a basement gives a
    lawful basement — full, half or a hatch to a crawl space, by the terrain gate — or a stated refusal, never a silent
    change; (T66-2) every generated connector is reachable end to end and lies inside its depth band, and a target within
    `digReachM` whose route is longer than 2 × `digReachM` is refused with its reason, and so is an enclosed basement — its
    ring within `foundationClearM` of other footprints, basement rings or dug passages on every side, and, apart, the
    water table above every floor between it and the target: the dry run refuses with `E_NO_PATH`'s reason naming the
    blocking building or the water table (F-EDIT), the basement of step 1 is not laid and nothing else changes (II.7.6
    step 3); (T66-3) its undo
    restores the document byte for byte; (T66-4) a second access sharing a connector survives the first one's deletion,
    and the last one's deletion removes only the pieces nothing else uses; (T66-5) the closure's first base instance
    (J-A66.01): a `setAttr` that sets a placed use's `concealment` to `front`, its `front` another use of that building
    (§4.7's *Concealed institutions* (1); `Use.front`), on a building whose plot
    has an access edge beyond its frontage onto an alley or a passage, adds the concealed door by §2.6's entrance rules in
    the same event (*Concealed institutions* (4) (b)), its closure record naming the door, and its undo removes exactly
    that door; with no such edge it adds none, the concealed programme reached from the front's service side (§4.7's *Concealed institutions* (4) (b)); (T66-6) a `drawBoundary` that adds an undercity neighbourhood no lifeline reaches, and a `split` of one that leaves a part no lifeline reaches, each adds that neighbourhood's nearest lifeline by II.7.6's target, connector, access-point and link steps in the same event, its closure record naming them and, where it digs a connector, the dug system's `sources` naming the neighbourhood's `District`; its undo removes exactly them (§7.3 item 9 (d); J-A66.72).
  * *The underground layer built (M6-U).* Every T-V4 test (V04 §7), run from M6-U's steps; the hook tests above
    run on its generated output.
  * *Works and the weekly clock (items 67, 76; §4.11).* (T67-1) the stage drawn at week w is a pure function of the
    Works record and w: reached directly or by scrubbing forward and back, every drawing is byte-identical and no model
    digest moves; (T67-2) no Works leaves a plot without an access edge at any week; (T67-3) a merge or a split shows the
    old boundary until its clearing stage; (T67-4) a demolition's households are rehoused (item 17) before its first
    stage; (T67-5) no Works at generation and none under the parity presets, the goldens unchanged; (T67-6) on the hook
    fixture an epoch's share of buildings in works lies within ± 3 s.e. of growth × mean duration ÷ span, and a decay
    Works within its dwell band; (T76-1) its cadence clauses (from M3a, on the port's `EpochInputs`) —
    an epoch folds at each 52-week boundary, at a population move past the roster tolerance and at the week of each
    newly carried calamity no other epoch falls on (one dated at or before the last epoch's week folding none at its own
    week: it rides, at that epoch's first week, the first epoch its absorb folds where the absorb's week is after the
    last epoch's (one folded at the absorb's week where no other is), else the first epoch a later absorb folds, held
    meanwhile in `DossierBinding.lateCalamities`; §4.11 *The clock* (4)), none on a 2 % drift, with
    `years` = Δweeks ÷ 52 — on fixtures adding a calamity carried at a mid-year week with no population crossing (one
    epoch at its week, the calamity in its `EpochInputs.events`), one at a week-52 boundary (no second epoch), one
    inside a coarsened catch-up (riding the coarse epoch that holds its week, V06 §6.8 (6); from M6-E), a calamity
    carried one year late, riding the absorb's first epoch, its event at that epoch's first week, and one carried by a
    second absorb in the last epoch's own week — no epoch, its targets applied, the calamity riding the next absorb's
    first epoch at that epoch's first week, its deaths in that epoch's burial need; and a late non-calamity change in an
    absorb whose week is after the last epoch's — folded at the last epoch's week + 1, the document's current week never
    before it —; its per-year clause (from M4, with the epochs) — per-year rates give equal expected firings under a
    weekly and a decade cadence.
  * *Light (item 68; §8.4, §4.7).* (T68-1) a spot lit from every side by several point lights carries no shadow;
    (T68-2) no shadow climbs a taller roof; (T68-3) a shadow falling on a lower roof is shortened by that roof's height
    and continues beyond that roof onto the next building or the ground; (T68-4) on the CPU reference the lighting is
    byte-identical for the same model, lights, view and time on the five engines (§6.5 (9)); (T68-5) at night every way
    class × band reaches its light rows' target minimum illuminance on the CPU reference, interpolated along the value;
    (T68-6) no light stands on a hidden, sealed or clandestine plot unless a row places one; (T68-7) the GPU pass lies
    within §13.4's tolerance of the CPU reference; (T68-8) with the GPU lighting unavailable (no GPU, a lost context) the
    next rung of §8.4's ladder is drawn and reported, never an error (§5.2); (T68-9) no light on a building in Works
    before it is finished (item 67).
  * *Informal clusters (item 70; §4.7 S11).* (T70-1) every structure has its own door on a footpath that reaches an access
    edge of its plot; (T70-2) the fire-gap minimum holds between structures; (T70-3) the households per structure
    lie within the row and within each structure's capacity; (T70-4) no cluster stands on a standing plot whose geometry
    floor is the middle band or above, none in a district whose band range excludes the squalid band, and no structure in
    a wall strip; (T70-5) under the parity presets the shanty districts draw FTG's tents row and MFCG's hovel (T27-2's
    shanty fixture extended); (T70-6) at generation every `informal` plot is one that §4.7 S11's *Informal clusters* (2)
    gives the cluster row, so none lies outside a shanty-typed district, and no class-mix draw (§4.7 S10b) yields a
    cluster structure's class — `shack`, `tent` or `lean_to_shelter` (§10.2; *Informal clusters* (1)–(2); J-A70.49).
  * *The class mix inside a band (item 71; §4.7 S10b).* (T71-1) inside a band row the manor share rises monotonically
    with the prosperity value, reaching 1 at the extreme of the table; (T71-2) at equal relative position a wealthier town shifts
    the share in the declared direction; (T71-3) in mixed blocks the largest classes stand on the highest-prestige
    frontages at a share above a shuffled-placement baseline by §13.7's margin (V12 §3.6's harness, the spec `T71-3`:
    block scope, 20 permutations, the margin rule); (T71-4) manors on joined plots and houses
    on standard ones within one block.
  * *The neighbourhood's character (item 72; §4.5).* (T72-1) the character vector is a pure function — recomputed from a
    saved model it is equal; (T72-2) a district's name changes only past the hysteresis or by a rename; (T72-3) value,
    not volume — the owner's fixture: many lodgings never outweigh a few churches, and three churches or one cathedral
    alone make the religious quarter; (T72-4) one district per district-defining dossier instance, its defining trade at
    the row's share and not on every plot; (T72-5) dispersed classes spread, none gathered into one district by rule;
    (T72-6) every building's prosperity-driven state lies inside its district's band range, an institution's excess
    raising the district's pressure; (T72-7) a shared building's total amplification and contribution never exceed a
    single-power building's of equal significance; (T72-8) the economy dial is proportional to the sector's share with no
    rank bonus, and an even mix is neutral; (T72-9) after S10a every household it distributes to blocks has its band inside
    its district's written band range (a household no admitting district has room for housed in the district whose range
    lies nearest its band and has room, its band read at that range's end — a derived band, reported —, so none is left
    unplaced for its band, F-SITING meeting only one outside a dossier's population that no capacity holds, T19-4), each household S10a
    moved from S7b's provisional allocation is reported, and no record holds the
    provisional range (a schema test); its dossier clause (from M3a, with T19-4's): on a dossier fixture whose written
    ranges exclude households S7b allocated and whose other districts lack the capacity for them, every household that
    fills the dossier's population is housed in its own district by §4.7's re-provision (§4.5 (5); J-A72.50).
  * *Derivation fills every gap (item 20 (h); §7.7 items 9–11).* On the dossier fixtures of the port's group below and,
    standalone, on blueprints (J-A20.06): (T20-7) no derived fact contradicts a dossier fact — every derivation row's bar
    holds, counted by §5.3's coherence rows; (T20-8) a dossier change re-derives exactly its disruption set — the rows
    whose inputs it changed — and nothing else; (T20-9) a map edit of a dossier-owned value (a dossier name or kind, a
    dossier-set `knownTo`, concealment, front or state, a count outside its range, the population) returns F-EDIT
    `dossier-owned` and changes nothing; (T20-10) the totality test — every map-fact family of §2.8's registry is covered
    by a derivation row, and every row's chance is a registered §6.1 concern or none (one test with T73-10; J-A83.01);
    (T20-11) a schema test that every door and `HostContext` field beyond the dossier's content is optional; (T20-12) from
    M1 the rows run on the frozen fixtures and, as the stand-in dossier, on a blueprint's own roster, T20-7 and T20-10
    holding on both (T22-1's purity and T20-5's one-way bar stand); (T20-13) on the fixtures and on a blueprint,
    `factTier` (§2.8; J-A20.23, J-A20.24) reads `dossier` on exactly the paths §2.8's three conditions give — a dossier
    ref, a registry dossier path and a carried value —, `declared` on exactly the paths an author's declaration set
    (`flags.editedPaths`, and the existence and position a declaring event pinned; item 101), and `map` on every other
    path, a blueprint with no dossier reading no `dossier` tier; §9.2's reader, every export (`plat:tier`) and the tool
    API (§11.2) show that tier (J-A20.82).
* **The dossier port (items 73–88): B-DOSSIER-lite and the port's bars.** The frozen dossier fixtures (item 84; J-A84.01,
  J-A84.02) live in `plat/tests/fixtures/dossier/` — inside `plat/` by §17.1 (3)'s path rule, and never under `research/`
  or `captures/`, whose JSON the document checks read as corpus. They are cut only from runs of the named SettlementForge
  line — the first `fp/integration-2026-09-23` at commit `5d699cc68` (J86 Q1) — never from an on-disk working tree, and
  are re-cut by the same scripts when the owner names another line; the build copies them at M1. Their `manifest.json`
  holds one row per file:

```ts
// @plat/testkit — the dossier fixtures' manifest (items 83, 84)
interface DossierFixtureRow { file: string; sfLine: string; commit: string; generatorVersion: string; seed: string /* the synthetic seed the file was generated from */;
  config: string; generatedBy: { lane: string; date: string }; kind: 'birth'|'after-events'|'after-ticks'|'world-state'; pairsWith?: string /* the file it pairs with */;
  population: number /* persons */; tierWord: string; ourRung: Rung | 'refused'; notes: string;
  neverPublish: ('seed'|'config')[] /* the host's seed and config fields inside the file: kept for re-cutting, never carried by an export or a document (item 85) */ }
```

  The set: nine at-rung births — town-1 Berghafen (2 130 people, TOWN), town-2 Novaorum (3 174), town-3 Glenford
  (2 492), sample-mossgate (4 155), town-nb-1 Novasaltus (4 921; the one set of partner-level trade links), town-cc-1
  Großmark (4 196; a custom-content record keyed by its local uid), city-1 Pianopagus (23 178, CITY), sample-blackcrag
  (18 911, CITY) and metropolis-2 Ventovicus (47 734, METROPOLIS); three refusal births — culture-latin Collevilla
  (1 287), sample-cnocby (767) and village-1 Lipopol (782); the totality-only files — the twelve culture towns,
  metropolis-1 and metropolis-3; and the pairs for the absorb half — the probe town before and after seven events with
  its per-event record; town-1 and city-1 after one week, one season and one year under the birth default and after a
  lit year, each with its world state; the probe town after a plain and a lit year; village-1 after its years.
  **B-DOSSIER-lite** runs each at-rung birth × 5 seeds (the fixture's derived seed, then four `rerollLayer` salts) through
  `digest`, `creation` and `generate`, and holds:
  * *the creation bars* (M1): (T73-1) every dossier record placed — 0 tier-6 omissions; (T73-2) the population within
    ± 5 %; (T73-3) the residential building count inside the housing record's range; (T73-4) every collective record's
    count inside its range; (T73-5) walls exactly when the walls bucket holds a record, the number of gates inside the access
    row's range; (T73-6) every quarter name on exactly one district, or reported waiting (§7.7 item 16); (T73-7) the
    population-weighted mean household band within one band of the wealth row's mapped band; (T73-8) the cross-engine
    digest, stated in §6.5 (9) and scheduled here; (T73-9) while no village product is registered, the three refusal
    fixtures refused with `E_RUNG_UNAVAILABLE` naming the village product, at birth and after their ticks (§1.1, §7.7
    item 15); with volume 7's `ProductDecl` registered they route to its rungs (V08's T-V8-19 on V07's rows); (T73-10) the vocabulary totality — every enumeration
    value of the fixtures has a table row or the declared fallback, the port's `unmapped_word` notes 0 and its
    `unmapped_kind` notes equal to the M1 class gap, listed (one test with T20-10; J-A83.01);
  * *the absorb bars* (M3a), on the pairs: (T75-1) every `DossierChange` dated by a rung of §4.11 or reported
    `unreceipted_change`; (T75-2) every removed element's plot vacant and every ruined one present as its ruin; (T75-3)
    the seven-event pair's disruption within its budget or reported over it; (T75-4) the host's undo — the before-dossier
    fed after the after-dossier — converging with `state_matches_absorbed`, its residue reported; (T75-5) a rename with
    a receipt re-bound, one without reported as a removal plus an addition;
  * *the typed slices and the rung* (M1, M2b, M3a and M4): (T77-1) its slice clause (from M1) — a partner's bearing,
    drawn on its own key when the dossier gives none, does not move when an unrelated fact changes, and a partner the
    slice no longer holds keeps its road, bearing and key, weighed 0 by `TradeFlow` (§2.4) —; its weight clauses
    (from M2b) — `TradeFlow`'s gate weights sum to one, a harbour town's harbour carries the sea share, a way's trade
    weight equals the sum of the gate weights routed over it, and `TradeFlow`'s S3 (7) values — the gate weights, the
    harbour's share and the dominant bearing — equal their values after S4, S3 (12)'s principal-market score reading
    those gate weights (§4.3; J-A77.42); (T81-1) (from M4) an epoch whose population target crosses
    a band upward changes the rung's row and grows the frame by §3.2 (9)'s batches, every entity outside the growth's
    region keeping its address, and every face outside that region and beside no deleted stretch of the old margin or
    border keeping its ring, its owner and its nested faces, re-parented where its parent was joined, every raster keeping
    its `cellCm` with every old cell in its place and every stored height unchanged, the `hydro` fields equal to a fresh
    computation over the grown grid and every river's traced course inside the old arena unchanged — or, where M4's
    memory measurement took §3.2 (9)'s pre-decided re-grid, each raster at the new rung's `cellCm`, every standing
    entity keeping its stored `baseCm` and the report naming the re-grid (§3.2 (9);
    J-A81.31); (T81-2) a digest built from the town-1 fixture with its population set to 150 000 — a test-side edit of
    the digest, never a fixture file — is refused `E_RUNG_UNAVAILABLE` naming the population cap by `creation` (the
    creation clause, from M1) and by `absorb` against the document town-1 made (the absorb clause, from M3a), nothing
    absorbed (§1.1; J-A81.01); (T88-1) with the staged rows and records empty (`PortRows`, §10.2; `Recipe.history`'s
    `HistoryHint`, §2.9; every `PowerRelation`, §2.7) the staged readers of J-A88.41 and J-A88.42 (S2's stage count at
    §4.2, the typing row, the alliance spill and the dials at §4.5, the crime term at §4.6 with its readers at II.7.3 and
    II.7.5, the import share at §4.9, and the catacomb age and the buried old town at II.7.6) change nothing: on the golden suite the model
    digest equals the one a test build gives with each reader replaced by its base value, each reader from the milestone
    that lands its stage; (T88-2) (from M2b) on a dossier fixture whose `PortRows.impairments`, filled test-side, holds a
    non-physical row (`physical: false`), a visible impairment of that type on one dossier institution
    (`DossierInstitution.impairments`, §14) lowers that institution's own dial term by §4.5's rule and changes no other
    institution's term and no district's dial (J-A88.42);
  * *the seam's bars* (item 85; M1): (T85-1) CI runs hostile names — markup, script, event attributes, entities and
    control characters, very long and right-to-left strings — through every exporter as dossier names, display names and
    user renames, and every output is well-formed and inert by §11.1's bar; (T85-2) a dossier-bound document, its
    snapshot, its permalinks and every export hold no occurrence of the host's seed, and the recipe's seed equals
    `H32("plat:sf-seed" ‖ that seed)`; (T85-3) from M3a, display names reach only the export they were given to — the
    document and the next export are unchanged.
* **The SettlementForge stage (V08 §7).** Every T-V8 test (V08 §7) on the host harness `plat/tools/hostharness/`, with the
  frozen fixtures and test-side mutations only.
* **The authoring toolkit (item 101; §7.1, §14): elegance bars and fixtures.** (T101-1) at most twelve tools — a
  registry test that every tool maps to its declaration kinds in §7.1's binding, so a thirteenth tool fails it (a new
  capability is a parameter of a tool); (T101-2) each tool is one declaration kind with one dry run, one fate report and
  one undo step (an enumeration over the binding); (T101-3) the same declaration made on the canvas (a scripted gesture),
  through the tool API and in a skeleton file gives one event, byte for byte; (T101-4) a map's declared subset exported
  as a skeleton and re-imported under its seed reproduces its model digest, and a clerk's transcript of tool calls,
  replayed, gives the session's digest (§6.5 (9)); (T101-5) no declaration contradicts a dossier fact or a lock without
  a refusal carrying its reason and at least one closest alternative; (T101-6) J78's acceptance fixture and item 110 (e)'s second
  fixture (M3a) — each an original skeleton with a known city's structure and our own names, its brief, structure list,
  seed and golden in V12 §3.14 — each authored three ways: as a skeleton file, by hand through the scripted
  canvas, and through the tool API from a clerk's recorded transcript — at M3a a scripted transcript of tool-API calls
  for each fixture, from M3c the built-in clerk's cassettes for their descriptions and rosters (V10 §3.15, V10 §7.3
  group A) —; the skeleton file and the hand-authored map share one model digest under
  one seed, and all three meet its fixture's structure list (every declared quarter by kind and name, both enceintes with
  their gates, every named place in its declared quarter); (T101-7) points in, shape out — a two-point wall over the
  ridge fixture follows the ridge and closes when its ends meet; a seed quarter never crosses a block and its boundary
  lies on street centre-lines, water, walls or ridges; a level lake's shoreline equals the terrain's contour at that
  level; (T101-8) declared means held — a New random over a quarter holding declared entities moves no declared entity,
  the fates list naming each one held; (T101-9) the count badge of a quarter, a fill or a roster equals the plots,
  households and buildings its committed event makes.
* **File g's items.**
  * *Sunlight (item 102; §4.5).* (T102-1) with `w_sun` = 0 and item 111's climate cell at its temperate value the field and
    the town are byte-identical to a build without the term (a `NoOpPin`); (T102-2) on a fixture with an island over a
    uniform district, the island's shade strip averages lower prosperity than the sunlit remainder by the declared weight
    within tolerance — volume 5's T-V5-19, with T-V5-20 and T-V5-21, from M6-sky, and volume 6's drift fixture (T-V6-12)
    its epoch form; (T102-3) the term alone moves no plot across two bands (volume 11's T-V11-30: `w_sun` at its default
    against 0 under common random numbers on B-CITY, 0 plots); (T102-4) the term's computation within its per-rung budget
    (§12.4).
  * *The siting rulebook (item 103; §10.2, §4.7 S10b).* (T103-1) the siting statistics suite: each family's effect shows
    as a measured shift against a random-placement baseline across seeds — tanneries downstream in most river towns (at
    0.80 of towns), a nuisance's sensitive members farther from its emitters, the thieves' den farther from the law,
    shops nearer the market — never as a guarantee (volume 11's T-V11-12, one Holm family; volume 5's T-V5-22 on its
    island seeds); (T103-2) the share of districts a coverage class serves above its random-placement baseline by 0.1
    (volume 11's T-V11-13); (T103-3) with the coverage weight at 0, placement byte-identical to the build without the
    coverage rows (a `NoOpPin`).
  * *Custom content (item 104; §7.7, §10.2).* (T104-1) fixtures of custom institutions carrying only a category; a
    category and tags; a scene archetype; the optional definition fields; and an active reviewed chain — each resolves,
    sites and reports as §10.2 specifies, with zero placement failures; (T104-2) a chain's nodes closer together than a
    random baseline across seeds (volume 11's T-V11-16; volume 5's T-V5-23 on islands); (T104-3) the flow order — the
    resource farther from the market than the final seller — in most placements (at 0.75), a compatible chain's in-town
    nodes within their links' comfortable distances in most placements, and a chain toggled off and on returning its nodes
    to their sites where nothing else changed (volume 5's T-V5-24 on islands); (T104-4) a revision re-sites with least
    disruption.
  * *The supply web (item 105; §4.7 S10a–S10b).* (T105-1) across seeds a multi-output producer sits nearer its dominant
    output's consumers, consumers of a shared provider nearer it, source-oriented classes nearer their inputs and
    market-oriented classes nearer their demand than a random baseline (volume 11's T-V11-14); (T105-2) a loop fixture
    settles within the relaxation cap, its second pass moving fewer members than its first, byte-stable across runs;
    (T105-3) the share of districts holding a dispersed class within 0.05 of the base's (J-A72.46 holds; volume 11's
    T-V11-18), and split pairs for split classes past the threshold, never under the parity presets; (T105-4) with the
    web's weights at 0 — V11 §3.7.4's off form — placement byte-identical to the base (a `NoOpPin`).
  * *Walls that use natural barriers (item 106; §4.2 S3 (9), §4.4 S5a, §4.8).* (T106-1) a river-loop fixture walls only
    the neck and is sealed; a cliff-backed coastal fixture anchors on the cliff and the shore with zero wall edges along
    sheer arcs; (T106-2) 100 % of quays reachable through a gate or an open front; (T106-3) a sea-threat dossier gets a
    quay wall with sea gates and a peaceful one an open front, and every walled port gets its harbour-mouth chain;
    (T106-4) F-WALL's check extended — every open stretch's ends anchored on a barrier or an enceinte (§5.2); (T106-5) with
    `barrier` closure and the stretch profile off, byte-identical to the base (a `NoOpPin`); volume 11's T-V11-19 checks
    its rows.
  * *Spread and pull in balance (item 107; §10.2, §4.7 S10a–S10b).* (T107-1) a coverage class's served-district share
    above its random baseline with the web's weights on — the pull never defeats coverage; (T107-2) a spaced class's
    nearest-member distance above its baseline; (T107-3) consumer-to-provider distance within `comfortM` in most
    placements (at 0.70; volume 11's T-V11-14); (T107-4) with `comfortM` and spacing at 0, byte-identical to items 103
    and 105 alone (a `NoOpPin`).
  * *Institution ladders (item 108; §7.7, §10.2, §4.2 S2).* (T108-1) on the surveyed dossiers every COUNT, QUARTER and
    GUILD record shows members inside its range, rising monotonically across a population sweep (× 0.5, 0.75, 1, 1.5, 2;
    a level outside [1 500, 120 000] `notApplicable`; volume 11's T-V11-17); (T108-2) no ladder pair double-counted;
    (T108-3) a SIZE record is one building, and the `kinds` row set's rows for the unnumbered qualifiers read as §7.7's DR9 extends them;
    (T108-4) a promotion or demotion changes the member count by least disruption.
  * *Caverns, ruins and catacombs (item 109; §4.2 S1, II.7.5, II.7.6).* (T109-1) across seeds cavern frequency rises with
    relief and is higher with mining than without, per relief class (volume 4's T-V4-55), and every mine–cavern breach
    lies within `breachM`; (T109-2) a dossier carrying `ancient_ruins` gets a ruin system or a reported reason, its
    surface marker linked; ruin plans beat the cavern baseline on the structure test (right angles, straight walls) and
    differ from the town above on block size, grid regularity and orientation (volume 4's T-V4-44, T-V4-45; volume 6's
    T-V6-37); every ruin link obeys the connection graph; an undercity takes a ruin void over a cavern when both qualify,
    at the ranked share (volume 4's T-V4-58); (T109-3) a system growing through a sealed void at a shared depth yields a
    breach and makes it accessible; across METROPOLIS seeds the sealed share of voids deeper than `dig.reachM` stays at or
    above the row's floor (volume 4's T-V4-54; volume 6's T-V6-36); caverns and ruins occur at every rung (volume 4's
    T-V4-43); the share of voids with an access rises with the buildings over them across a growth sweep (volume 4's
    T-V4-49; volume 6's T-V6-34); no dwelling in a void without an access, and every access carries its cause; (T109-4)
    at most one catacomb at TOWN, the counts at CITY and METROPOLIS within the table bound, the largest under the largest
    cemetery, every catacomb under a cemetery or a quarry ossuary and none under a church, the cathedral always with a
    crypt (volume 4's T-V4-50; volume 6's T-V6-40; volume 11's T-V11-25); (T109-5) a catacomb's extent non-decreasing
    over every epoch sequence (a property test), its growth per epoch within the cap, a stagnant catacomb's ossuary fill
    rising while its extent holds, and its sources only those item 109 (k) (2) admits (volume 4's T-V4-51, T-V4-52;
    volume 6's T-V6-38, T-V6-39); (T109-6) with the ruin chance 0 and the relief, boost and fissure rows at the base's
    values, byte-identical to the base (a `NoOpPin`).
  * *Retaining walls, raised ways, stepped massing, deck plots (item 110; §2.7, §4.3, §4.6, §4.7 S10–S11, §5.3).*
    (T110-1) retaining walls on terraced slopes above the thresholds and nowhere flat, every way crossing one a stair
    or a ramp, and one meeting the frame's outer ring ending on it; (T110-2) a raised way crosses ground ways with zero
    junctions and its parts never share a planar arrangement with part 0 — at the frame (§2.7 *At the frame*), its part
    sized to the ground's frame plus margin and growing with it, an aqueduct sourced beyond the frame laid to the outer
    ring without a ramp, and the same aqueduct through an epoch's frame growth — §3.10's stored-references row passing
    at every stage end of the epoch, no part-0 vertex left with a row and no edge, and after §4.11 both ends of its
    ring-end foot on the new rings (§2.7 `RaisedFoot`, §3.2 (9)) and every station of the old deck at its key, position
    and ring after the growth (§2.7's support step (7)) —, a declared course drawn beyond the frame bent to the ring; the
    support step's obstacles and bounds (§2.7): a
    viaduct over a square and an aqueduct over an oasis's grove, 0 piers in either, each span over one `open` with
    reason `clear`; a generated viaduct and aqueduct over a 200 m river dropped (`raised_too_long`, the epoch candidate
    waiting as `raised_too_tall`'s does), a declared one bent to a course whose clear spans fit
    `raisedWays.structure.maxClearSpanM`, no support in water; a CITY masonry aqueduct across a moated c15 wall with an
    intervallum and a timber viaduct on a gate's line, both built, each crossing's one station on the trace the wall's
    band (the aqueduct's arch, the raised gate's tower; §2.7's support step (3)), 0 piers in a setback, glacis, berm
    or moat, and every clear span on either side of the station within its bound; later work across a raised way, held
    from its creation (§2.7's support step (6)): a CITY c14 fixture whose S4 viaduct over a valley is crossed by
    stage 2's moated ring — the ring running on beneath the deck, each support, ramp or stair in its band taken into the
    line, no crossing station and no gate on the deck, the arterial on the deck pinning no gate and S5b's count read on
    ground part 0, the setback, glacis and berm stopped at the under-deck strip's edges and the channel passing beneath
    only where it meets no support, ramp, stair or foot, every station, key and span as S4's commit laid them; (1) a
    CITY c15 town with `moat: 'all'` whose S4 timber viaduct is crossed by stage 2's ring at the widest moat row — the
    channel stopped at the under-deck strip's edges, no support in water, `W_RAISED_CROSSING` reported; (2) a stage-2
    S5b viaduct crossed by stage 2's own moated ring, and a stage-2 ring whose boundary falls on an S4 viaduct's ramp at
    a valley rim — the ramp taken into the line, no ramp, stair or foot in a strip or the channel; (3) on the CITY and
    METROPOLIS fixtures, 0 piers in a setback, glacis, berm, moat, gate plaza, quay's corridor, pier, mole or a way's
    corridor — among them a CITY masonry viaduct across a `quay`-banked river at its clear-span bound (both bank
    stations behind the quays' corridors, each quay one connected way passing under its span) and a CITY S4 timber
    viaduct crossed by a `through` S5b road and an S5c street, each crossing under a span clear of its supports; (4) an
    epoch circuit across a standing aqueduct and one across a standing timber elevated road, a hand `drawWall` across a
    standing aqueduct and one across a declared one-span masonry viaduct, and an epoch contraction meeting an aqueduct
    within p ÷ 2 of an older ring's crossing station, each run again with the raised way locked — the stretch on its
    course beneath the deck, each support, ramp, stair, foot or `vault` span in its band taken into the line, an
    ordinary run beneath every other span topped at its soffit, no gate or tower in the under-deck strip, its setback,
    glacis and berm stopped at the under-deck strip's edges and its channel beneath only where it meets none of these,
    the older ring's crossing station untouched, every station, key, span and state of the raised way unchanged, the
    hand case naming `bend.wall.raisedCrossing`; and a hand `delete` of a wall whose raised gate carries a standing
    viaduct's deck — every other run dismantled, the gate tower kept carrying the deck, `bend.wall.held`; (5) an H-AQUA
    epoch growing a stage over a standing aqueduct's land, an epoch route re-solved under a viaduct, a hand road drawn
    across one and a hand road wider than every `open` span's clear width drawn across one — 0 way corridors over a
    support ring, ramp, stair, foot or `vault` span, every crossing under a span §4.3 admits (`bend.raised.underSpan`;
    the wide road routed round the raised way, `bend.raised.around`); (6) a Re-derive from S4 of (1)'s c15 fixture with
    its S4 timber viaduct locked — stage 2's ring and moat meeting it as in (1), no station moved, added or omitted and
    no key minted, 0 S5b or S5c way corridors over a support ring, ramp, stair or foot; (T110-3) generated raised ways only at CITY and METROPOLIS, each with its reason recorded
    (`drop`, `link` or `water`), within the rung's cap, and a removed one still removed after regeneration — with the
    tendency specs `T110b.viaduct`, `T110b.aqueduct`, `T110b.elevated.prosperity` and `T110b.elevated.landmarks` (volume
    12 §3.6b's bar map); (T110-4) a stepped building's tiers nest and cast one shadow each; (T110-5) deck plots within the
    deck's width and budget, falling with the deck, and a deck slot whose face would cross the outer ring left out,
    reported and re-offered by a frame growth; a walled, moated fixture with stone moat bridges holds 0 deck plots on a
    bridge over a `moat` or `castle_moat` whose way is a `Gate.way`; (T110-6) both known-city fixtures pass (T101-6); (T110-7) with the
    terrace, raised-way and deck-plot rows off — V11 §3.24.0's switches — byte-identical to the base (a `NoOpPin`;
    volume 2's T-V2-50, volume 6's T-V6-65, volume 7's village pin and volume 11's T-V11-31 register theirs on the same
    engine). Volume 6 runs T110-2's epoch clauses (4) and (5) on its engine (T-V6-47).
  * *Water in dry country (item 111; §4.2 S0–S1, §4.2 S3, §4.4, §4.5, §4.7 S10b).* (T111-1) on arid seeds the share of
    households within walking distance of water — the coverage radius of volume 11's water-supply family — exceeds the
    non-arid baseline (a `StatBarSpec`, higher-with); (T111-2) an oasis stands only on an arid site unless drawn (T2
    `ground`'s spring flag) or supplied by a dossier's `oasis_water`, and an oasis reads as water for every rule that reads
    water (conformance); (T111-3) arid sites still draw rivers, lakes and coasts at the arid row's chances (a rate
    `StatBarSpec` per water kind under §13.7's tendency row); (T111-4) on arid seeds the richest band's mean distance to water below the
    middle band's in most towns (a `StatBarSpec`); (T111-5) with item 111's climate dry cells at V11 §3.24.0's off
    form — the oasis chance, the water pull, the water prosperity term and the well yield weight 0, the sun cell and the
    well coverage factor 1 — byte-identical to the base (a `NoOpPin`). Volume 7 runs them at the village rungs
    (T-V7-58), volume 6 over epochs, a failing spring weakening its pull (T-V6-72), volume 8 the port's clauses
    (T-V8-50), volumes 10 and 11 T111-5's registration on their goldens and sites (T-V10-45, T-V11-38) and volume 12 the
    specs, the pin and the register lines (T-V12-44).
  * *Colour-blind-safe maps and the trial (item 112; §8.2, §9).* (T112-1) the style check: in every checked variant (`StyleSheet.variants`' `protan`, `deutan` and `tritan`, selected
    per viewer by the view key `cvdVariant`, §8.2) of every shipped family, every pair of categories a legend distinguishes (district tints, prosperity, ownership,
    knowledge, the underground's systems, water and ground classes) passes the simulated-deficiency contrast check —
    protanopia, deuteranopia and tritanopia simulated on the legend's swatches — at or above §8.2's deficiency-contrast
    threshold (a table value), and each such category carries its second cue (a pattern, line style, label or shape) at
    the legend-bearing zoom stops and in the thematic views; (T112-2) the game-master trial's report exists before the
    public release (§16's release gate), its findings entered in volume 12's calibration record and the fix list.
    Volume 9 runs T112-1 on its thematic views and T112-2's trial (T-V9-72) and volume 12 the style line (T-V12-45).
  * *History at generation (item 113; §4.2 S0, §4.11, §7.7, II.7.6).* (T113-1) a "city to village" history fixture shows
    walls and street lines beyond the present fabric and an oversized church, while the dossier's present facts match
    exactly; (T113-2) the replay is byte-stable per seed and history — one digest on the five engines; (T113-3) a refounded
    fixture reuses the old roads, gate gaps, bridges and foundations wherever the route cost admits them for the new
    plan's destinations; (T113-4) buried ruins appear only past the burial threshold and match the former geometry — its
    streets, walls and major buildings at their old ground level; (T113-5) closing a void's last open link makes it LOST
    and reopening restores it, its dwellings emptied by the vacancy rules and returning with access; (T113-6) a symbolic
    peak only with evidence of a higher tier, sized inside that tier (by default at its range's lower quartile) and
    marked `symbolic`, and no peak without evidence; (T113-7) with history replay off, byte-identical to the base (a
    `NoOpPin`). Volume 6 runs them on its replay engine (T-V6-71), volume 4 T113-4 and T113-5 on the underground's output
    (T-V4-77, T-V4-76), volume 7 the village halves of T113-1 and T113-3 (T-V7-59), volume 8 the dossier's history
    (T-V8-51), volume 11 T113-7's registration (T-V11-39), volume 12 their register lines, T113-7's pin and the
    replay's budget (T-V12-46).
  * *Walls that decay and recover (item 114; §2.7, §5.3, §7.1, §7.4, §7.7, §8.2, §11).* (T114-1) a poor, threatened fixture —
    the need sustained high, the means sustained low — shows its breached runs `patched`, each in a patch row of its wall
    kind and culture, and no robust rebuild; (T114-2) a rich, threatened one rebuilds its breached and patched runs
    robust, inside the `fabric` cap; (T114-3) a safe one decays through `worn` to `breached`, no run going from `standing`
    to `breached` in one change, and on a neglected, poor CITY ring over 20 epochs with a masonry aqueduct through its
    wall arch and a viaduct on a raised gate, the stretch under each crossing station is never `breached` or `dismantled`
    while its deck stands (§2.7's support step (3)), every other stretch decaying as the first clause states, and a
    crossing station whose spans have both fallen keeps its stretch as a wall run, never dismantled as a support; its
    landfall clause, on volume 5's landfall (V05 §3.16): a landfall over a raised gate, then the deck's repair — the
    stretch repaired with the deck, never a deck on a breached run; its regrowth clause: on a CITY fixture whose
    aqueduct crosses the ring at a crossing station, both spans beside the station toppled (as T-V6-11's second run),
    then the curtain absorbed (`absorbWall`, the stretch `dismantled`), then the aqueduct repaired — by a hand
    `repairRaised` and, on a second run, by V06 §3.19.2 (5) at the first epoch its reason is live — the stretch re-laid
    on its line by `repairWall`'s bend in the same batch before the spans (item 114's patch material), never a deck over
    a gap at any commit, and the hand repair's undo restoring the gap and both fallen spans; (T114-4) recovery replaces
    patches oldest first, by the week of each run's last-change epoch (`EpochRecord.inputs.week` of its
    `conditionEpoch`; generation's epoch 0 first, every replay epoch's week before every live one's — §6.1,
    V06 §3.7.7 (3)), never the epoch's number (volume 12's spec `T114g.oldestFirst`); (T114-5) no run changes its
    condition without a driver sustained over its
    table window — a driver alternating across its threshold every epoch changes no run (`T114g.sustained`); (T114-6)
    every state is told from every other in greyscale — T112-1's contrast check on luma alone, at §8.2's threshold — at
    every band where both of a pair draw, `worn` at the district band and finer (a `BenchBarDef`); (T114-7) with no
    replay, every run's generation-time condition derives from the dossier's readiness and the wealth by §7.7's DR41
    at its table shares — a vulnerable poor fixture shows patched and breached runs, a fortified rich one stands
    whole — each fixture of the readiness × wealth grid within one run's length of its row's shares (a `BenchBarDef`);
    (T114-8) with the need and the means at their neutral values, every run at generation `standing` and V06 §3.7.3's
    neglect and V06 §3.7.5's repair reproduced over epochs, byte-identical to the build without item 114 (a `NoOpPin`,
    `item114.condition`); (T114-9) a way crosses an enceinte at a gate or at an opening of item 114 and nowhere else: a refounded
    village's tracker crossing a ruined former enceinte at a `breached` run and at a gate gap commits with 0 violations
    of §5.3's wall-crossing row, and a TOWN epoch beside a `breached` run grows no way through the breach (§5.3; §4.4
    S5c's legality); (T114-10) on a CITY fixture with an `on_enceinte` castle at a vulnerable, poor town's generation
    shares and over 10 epochs, the town enceinte's and the bailey's three profiles along `Castle.cityWeld` are equal at
    every commit (§2.7's welded stretch), §8.2 draws one state there, and §11.1's battle-map export gives one
    wall-or-opening answer per edge. The hand forms — T3 `wall`'s repair with a material and `wearWall` — are §7.4's fixtures of
    each kind in B-EDIT. Volume 6 runs T114-1 – T114-5 save T114-3's landfall clause, T114-8's and T114-10's epoch clauses
    on its engine, T114-4's replay case on its history-first fixture (T-V6-73), volume 5 T114-3's landfall clause on its
    landfall fixture (T-V5-14), volume 7 the palisade's (T-V7-62) and T114-9's village clause on its replay fixture (T-V7-59), volume 8 the readiness from the dossier (T-V8-52), volume 9 the repair tool and the legend
    (T-V9-74), volume 10 the story told (T-V10-47), volume 11 the rows and T114-8's registration (T-V11-40) and volume 12 the specs, the pin and the
    register lines (T-V12-47).
  * *The grandeur ceiling (item 115; §4.7 S10b, §10.2).* (T115-1) rich THORP, HAMLET and VILLAGE fixtures at the wealth
    maximum hold no dwelling with an `H` or `U` plan, a court, a tower or a turret but the manor, every other dwelling at
    most `single`, `L` or `T`, a richer settlement moving its dwellings only along their capped rows (`bldg.grandeur`,
    reported nightly at every rung); (T115-2) the manor count by rung: no manor at THORP or HAMLET unless specified —
    V08 §3.16 (3): a dossier-bound record of a class in `grandeur.ceiling`'s `settings.grandClasses` (V11 §3.25.4), or a
    dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1); a seigneurial
    government alone admits none — and at VILLAGE at most one, only with a lord (a seigneurial government) or when
    specified; the manor count never rises with the wealth (§4.7 S10b (3); V11's `grandeur.ceiling` rows); (T115-3) a grand building the dossier specifies (V08
    §3.16 (3)) and one the user places or reshapes by hand keep their full design above the ceiling, never
    refused (item 101 R2); (T115-4) TOWN rungs and above byte-identical to the build without the ceiling table (the rung
    pin `item115.ceiling`), and with every ceiling row's `enabled` false — V11 §3.24.0's off form — every rung
    byte-identical to the base (a `NoOpPin`). In the base they run on S10b's class mix and S11's site plans at the village
    rungs' ceiling rows on hook fixtures; volume 7 runs them at its rungs (T-V7-63), volume 2 on composed shapes
    and the rung pin on B-MASS (T-V2-58), volume 6 across a rung change (T-V6-74), volume 8 what "specified" reads (T-V8-53), volumes 9
    and 10 T115-3's hand and clerk forms (T-V9-75, T-V10-48), volume 11 the table and T115-4's registrations (T-V11-41) and volume 12 the statistic
    and the pins (T-V12-48).
  * *The zoom-out limit (item 116; §8.8, §9.5, §12.5).* (T116-1) at every rung from THORP to the METROPOLIS cap the view
    at the zoom-out limit shows the whole `bounds` — while a crisis look stands, the bounds of town and camps (item 122
    (i)) —, or is stop 0 where the bounds are wider than the window at stop 0 (§8.8), no stop beyond the limit is reachable in the view and the pyramid
    draws no tile past it — B-ZOOM over B-CITY-lite's seeds of every rung and volume 7's village fixtures (`view.limitStop`
    0); (T116-2) the first view is the one it was without the limit; (T116-3) a change that grows the bounds — an epoch
    (from M4), a Re-derive by a rung change or an Adjust of the population (from M2a) — moves the limit with them, and one
    that keeps them moves nothing; (T116-4) every export frames within the limit bounds (§8.7: the whole bounds — town and camps while a crisis look
    stands — at most), at any window size and with none; at the METROPOLIS cap a whole-bounds PNG, print and SVG export
    frames the whole bounds. T-ER-08's
    restatement — every rung draws every stop from its limit inward — is §8.11's. Volume 7 runs them at its rungs
    (T-V7-64), volume 9 the view controls (T-V9-76) and volume 12 the statistic (T-V12-48).
  * *Seasons (item 117; §2.9, §7.7, §4.2 S0, §10.2, §8.2, §11, §12.5).* (T117-1) the same document hashes identically in
    all 52 weeks — its model, its digests and its save (the pin `item117.season`); (T117-2) an autumn fixture shows at
    least five distinct crown colours across its deciduous trees at the leaf-colour weeks' middle week (a `BenchBarDef`),
    and the leaf cover on its ground deepens week by week through the leaf-fall weeks (volume 12's spec
    `T117i.leafCover`); (T117-3) every climate's season rows cover all 52 weeks with no gap (volume 11's compile check,
    T-V11-42); (T117-4) an arid fixture draws no ice and no snow in any of its 52 weeks (`T117i.arid`); (T117-5) on a
    cold fixture every still water's first ice week is at or before every flowing water's, and no ice is drawn on a mill
    race's or a weir's water (`T117i.ice`); (T117-6) a dossier-bound map opens on its present week — the dossier's latest stamped
    tick (§4.11 *The clock*; item 125) — at `week mod 52` under the follow flag (DR42), and a map with no stamped tick
    opens at midsummer; (T117-7) each season's look passes
    T112-1's contrast and colour-blind checks at each season's middle week (`T117i.styles`); (T117-8) switching the
    season re-skins the cached tiles within §12.5's budget (`time.reskin`, in the timing phase). Volume 7 runs them at its
    rungs (T-V7-65), volume 5 the islands through the year (T-V5-34), volume 8 the dossier's week and climate (T-V8-54), volume 9 the season control (T-V9-77), volume 10
    the explanations (T-V10-49), volume 11 the rows (T-V11-42) and volume 12 the specs and the pin (T-V12-49).
  * *Festival decorations (item 118; §2.9, §7.7, §10.2, §8.2, §11, §12.5).* (T118-1) the same document hashes
    identically with decorations on and off and in every week, and with no traditions and no preview its tiles are
    byte-identical to the base (the pin `item118.festival`, a `NoOpPin`); (T118-2) a festival shows exactly in its
    window's weeks, a window across the year's end wrapping; (T118-3) the same festival draws identically in the view and
    in every export, its tiles byte-stable per seed; (T118-4) each tier's fixture shows its tier's decoration kinds and
    none of a larger tier's; (T118-5) staging lands on the dossier's named place or the keyword table's place, else on
    the festival kind's fallback; (T118-6) no decoration stands in a gate's passage or over a label's keep-out
    (`festival.blocked` 0). T118-2 – T118-6 are `BenchBarDef`s on the festival fixtures. Volume 7 runs them at its rungs
    (T-V7-66), volume 8 the dossier's `traditions` (T-V8-55), volume 9 the festival list (T-V9-78), volume 10 the
    explanations (T-V10-49), volume 11 the tables (T-V11-43), volume 5 the sky islands' pennants (T-V5-35) and volume 12 the bench bars and the pin (T-V12-49).
  * *As fast as possible (item 119; §12, §1.1).* (T119-1) §12's target laws — §12.3's model budgets and §12.5's
    first-map law — measured at every rung's bottom, default and top and reported as *target met* or *target miss*, a
    miss gating nothing by itself (D-18); (T119-2) every one-time wait — generate, regenerate, open from SettlementForge,
    a dossier change applied, advance time, the history replay, an export, a migration — timed from the click to the
    complete result within 10 000 ms at p95 on §12.1's reference hardware, at every rung's top and at the metropolis cap
    (a `BenchBarDef`; V12 §3.15.9's runs); (T119-3) for every wait over one second, progress — the stage by name and the
    map filling in — within 1 000 ms of the click, and no frame of the wait an empty screen; (T119-4) every §12.10 row
    that declares a step slower than its target names its measured gain — a bar or a register entry — and the release's
    runs show it; (T119-5) no interaction row of §12.10 — frame, pan, zoom, drag, preview, hover, inspect, undo, the
    season and festival switches — relaxed against the previous release. The low tier's sizes that miss the comfort level
    are declared per device (§12.1). Volume 9 runs the progress view (T-V9-79), volume 12 the timer and the register
    check (T-V12-50), and each layer's volume its own waits: volume 1 the stage-2 waits (T-V1-29), volume 2 the stage-3
    waits (T-V2-22, T-V2-24), volume 3 the plan's (T-V3-37: T119-2 – T119-5), volume 4 the underground's (T-V4-32), volume 5 the
    islands' (T-V5-18) and volume 7 the village's (T-V7-67).
  * *Find (item 120; §2.9, §8.2, §9.5, §11.1, §11.2, §12.5) — a view, never a change; built at M5.* (T120-1) the model
    digest, the document's hash, its saved bytes and its edit log are identical with Find on and off, and turning every
    chip off — Clear, or closing the panel — restores byte-identical tiles (the pin `item120.find`, a `NoOpPin` of kind
    `view`); (T120-2) each chip's matches equal §11.2's gazetteer match listing at the viewer's effective key, by class,
    area and layer (`find.matches` 0); (T120-3) under a player view on T-V9-66's canary fixture no withheld thing appears
    in a suggestion, a count, a glow, a pin, a ghost pin, a gap outline or a legend chip (`find.leaks` 0); (T120-4) the
    chips survive every band and layer change and every commit, advance, undo, redo, regenerate, load and migration,
    re-evaluated at once, and a chip whose last match goes stays in the set at count 0, dark (`find.held` 0); (T120-5) at
    the city band every match has a pin or is counted in a bubble (`find.pins` 0), and every chip has its second cue — its
    glyph on its pins and its dash pattern on its halo's outline (`find.cues` 0; item 112); (T120-6) at the METROPOLIS cap
    on §12.1's reference hardware, suggestions within ≈ 50 ms of a key and a chip's glow within ≈ 100 ms of its click
    (`time.findSuggest`, `time.findGlow`, in the timing phase; §12.5). Volume 9 runs T120-2 – T120-5's interface clauses
    on its app harness (T-V9-83), volume 12 the pin, the statistics and the timings (T-V12-52: T120-1, T120-6), volume 1
    the town's areas and gaps (T-V1-59: T120-2 and T120-4), volume 3 the interior band (T-V3-38: T120-4), volume 4 Below
    (T-V4-81: T120-4 and T120-5), volume 5 Sky (T-V5-36: T120-1's registration, T120-4 and T120-5), volume 7 the village
    rungs (T-V7-68: T120-1's registration and T120-4), volume 8 the dossier's entries (T-V8-58: T120-2) and volume 10
    the clerk's "show me" (T-V10-51: T120-2's clerk clause).
  * *The resolution adjuster (item 121; §8.8, §8.4 (g), §12.1, §12.5, §12.8) — device state and drawing only; built at
    M4.* (T121-1) Auto is the level on a fresh install (`AppPrefs.resolution` absent); (T121-2) no level change while a
    pan, zoom or drag is in progress — a change lands only while the view is settled (§8.8): at once when no gesture
    runs, at the gesture's settle otherwise — and on a fixture loaded at its threshold at
    most one change per 10 s, with no oscillation (`resolution.changes` 0); (T121-3) Auto holds §12.5's frame budget at
    p95 on the reference and the low-end device over §12.5's reference viewports (`resolution.p95`); (T121-4) a manual level
    is drawn as chosen or, where the device cannot hold its canvas need, the nearest level that fits with item 121 (f)'s
    line — never a refusal or a crash; (T121-5) labels, text, the chrome and every overlay are drawn at the device's full
    pixel ratio at every level (a pixel test, `resolution.textPx` 0); (T121-6) every picture, print and battle-map export,
    and the document and its hash, byte-identical across every setting (the pin `item121.display`, kind `view`, its
    `exports` clause); (T121-7) a change of the device pixel ratio re-evaluates the level at once; (T121-8) native 4K, lit
    at full precision, holds on the ultra tier within its 512 MB canvas ceiling (§8.8, §12.8; `resolution.ultra4k`).
    Volume 9 runs T121-1, T121-4 and T121-7 on its app harness, where T121-5's captures are taken (T-V9-84), and volume
    12 T121-2, T121-3, T121-5, T121-6 and T121-8 (T-V12-53).
  * *Crisis looks (item 122, with (h)–(i); §2.7, §2.9, §7.7's DR44, §10.2, §8.2, §8.8, §11, §12.5) — a look, never a
    change; built at M3b, the dossier's reading at M-SF.* (T122-1) the same document hashes identically — its model, its
    digests and its save — with crises on, off and under every preview and in every week (the pin `item122.crises`, kind
    `view`); (T122-2) each look shows exactly in its condition's weeks — while §2.9's `week` lies in [`sinceWeek`,
    `untilWeek`), or from `sinceWeek` on while an overlay with no `untilWeek` stands (§2.7) — at every key for a
    look-bearing condition (`public`, DR44) and for no `none`-row one (`crisis.weeks` 0); (T122-3) a look draws identically in the view and in
    every picture export, its tiles byte-stable per seed (`crisis.stable` 0); (T122-4) every SettlementForge stressor
    type, condition archetype and crisis event at the pinned baseline has its row in §10.2's closed map — a look or an explicit `none`
    — and a word no row maps reads `none`, reported `unmapped_word` (a totality check over V08's census lists); (T122-5)
    the scale follows severity and tier — each tier's fixture at a low and a high severity within its look row's scale, a
    hamlet a war band's camp and a city a full siege line — and the dossier's headcounts where it gives them, at item
    122 (h)'s rates (`crisis.scale`); (T122-6) nothing stands on water, in a gate's passage or over a label's keep-out,
    and on a way's carriageway only a barrier across it (§10.2 (d)), and several crises share the outskirts by
    `priority` under `densityCap` (§10.2's placement; `crisis.blocked` 0 and `crisis.share` 0);
    (T122-7) with no condition and no preview, the tiles are byte-identical to the base (`item122.crises`, its `tiles`
    clause). Item 122 (h)–(i)'s four bars are volume 12's own (T-V12-55: the camped area by headcount, two armies twice
    one, every camp inside the opening view, Fit and the limit while a look stands, the limit restored when none stands).
    Volume 12 runs T122-1 – T122-3 and T122-5 – T122-7 (T-V12-54), volume 11 T122-4's compile check (T-V11-46) and
    volume 8 its census of the baseline's lists and T122-1 and T122-7's registration (T-V8-59), volume 9 T122-2's interface clause (T-V9-85), volume 6
    T122-1's hand-over clause (T-V6-75), volume 7 T122-5 and T122-6 at the village rungs (T-V7-69) and volume 3 the plan
    clauses of T122-1 – T122-3 and T122-7 (T-V3-40); volume 1's units and land (T-V1-60), volume 2's ruined look, with
    T122-1 and T122-7's registration (T-V2-60), volume 4's look below ground (T-V4-82 (i)), volume 8's forces (T-V8-60)
    and volume 10's explanations (T-V10-52) test
    their own parts.
  * *A ruined building's plans (item 123; §2.6 step 7, §6.3, §8.6, §11.1) — the plan as built, damaged, never redrawn;
    built with volume 3's P4 and P5, the decay level with M6-E.* (T123-1) room, wall and opening ids are identical
    between the intact and the damaged plan, and a building first met ruined — generated as a ruin, or reached by item
    113's replay — carries the plan it had when built; (T123-2) damage is monotone in the decay level: a higher level's
    damaged set ⊇ a lower's, on every element (`damage.nested` 0); (T123-3) for a seed each element breaks at one level —
    one threshold per element, keyed by lineage and element id (§6.3's `plan.damage`) — on every engine and across
    regeneration, load, undo and migration (`damage.breakLevel` 0; §6.5 (9)); (T123-4) restoring — a `reoccupy` back
    into use (item 123 (b)'s "reused") or a repair — lowers the level and removes the damage in reverse threshold order,
    each repaired element drawn in item 114's patch material; (T123-5) the exterior agrees with the plan: a roof hole over a room shows from above as an
    opening in its roof, and a fallen run of outer wall as an open stretch of the footprint's edge; (T123-6) battle-map exports' line of sight passes fallen
    wall runs, a doorless opening is a gap, and rubble heaps and floor holes are image only (§11.1); (T123-7) a never-decayed
    building keeps its plan byte for byte as it is without item 123 (the pin `item123.damage`, a `NoOpPin` of kind
    `entityScope`). Volume 3 runs the plan clauses of T123-1, T123-2, T123-4, T123-6 and T123-7 (T-V3-39), volume 4 T123-1, T123-2
    and T123-6 below ground (T-V4-82), volume 2 T123-5 and T123-7's exterior clause (T-V2-59), volume 6 T123-4's epoch clause (T-V6-76), determinism §6.5 (9)
    T123-3's engine clause and volume 12 T123-2, T123-3 and T123-7 (T-V12-56); volumes 9 and 10 test their lines
    (T-V9-86, T-V10-53).
  * *Light weather (item 124; §2.9, §6.1, §8.2, §8.4, §8.8, §11, §12.5) — a view layer only; built at M3b.* (T124-1)
    the document's hash and every tile are identical with the effects on and off, the tile cache untouched by a spell
    (the pin `item124.effects`, kind `view`, its `cache` clause); (T124-2) the effects' frame cost is within ≈ 1 ms a frame
    at the densest spell on §12.1's reference hardware (§12.5; `weather.frameMs`, in the timing phase); (T124-3) on an
    `arid` climate row and on every row whose winter does not freeze, no snow falls or lies in any week, a `snow` cover
    drawn `clear` there (§8.2; `weather.snow` 0); (T124-4) arid rain frequency lies within its row over a simulated year
    of the timeline (`weather.aridRain`); (T124-5) the effects are off by default on the low tier and under reduced
    motion; (T124-6) labels, the chrome and every overlay are never covered (a pixel test, `weather.cover` 0); (T124-7) no
    luminance step is faster than §8.4 (i)'s photosensitivity limit (`weather.luma` 0); (T124-8) picture, print and
    battle-map exports are byte-identical with the effects on and off (the pin's `exports` clause); (T124-9) the timeline
    replays from its session seed, clock and presses with the climate row, year position, sites, `light` mode and view
    hour in force at each moment (§6.1 *The weather stream*) — a year-position change from a week with no live kind into
    a live one and back, a press at a moment with no live kind and a view hour crossing a kind's `hours` among its
    fixtures (§6.1's `view.weather`, never a model stream; `weather.replay` 0). Volume 11
    runs T124-3's and T124-4's row clauses as compile checks (T-V11-48), volume 9 T124-5 (T-V9-87), determinism §6.5
    (9) T124-9's stream clause, and volume 12 T124-1 – T124-4 and T124-6 – T124-9 (T-V12-57).
  * *The dossier the only data input (item 125; §11.3, §11.4, §14, §7.7, §4.11, §2.9); its bars from M-SF.* (T125-1) a
    dossier holding only SettlementForge's required keys generates a full map at every rung, every field the port uses
    that it lacks reported with the fallback taken (`field_fallback`, V08 §2.4's fallback column) — with no stamped tick,
    §4.11's clock at week 0 and the year position at midsummer (`port.fallbacks` 0); (T125-2) the same dossier with and
    without a host context, and under each `HostContext` field (`audience`, `displayNames`, `line`), yields the identical
    document and hash (the pin `item125.host`, a `NoOpPin` of kind `input`); (T125-3) no code path of the port reads
    anything but the dossier — a static check of each adapter's imports and reads. Volume 8 runs T125-1 – T125-3 on its
    host harness (T-V8-61) and volume 12 T125-1 and T125-2 (T-V12-58).
  * *Tablets and desktops only (item 126 (a2); §1.1); built at M2a with the medium layout.* (T126-1) at the medium class
    every tool of V09 §4.12's list completes its canvas script under touch, with `AppPrefs.touch.editFabric` on;
    (T126-2) below the medium class the medium
    layout holds at its 600 × 480 minimum and the page scrolls, and the document, the view and the selection are
    byte-identical across a resize over the threshold (the pin `item126.resize`, kind `view`); (T126-3) no phone layout,
    screen, notice or catalogue row exists — a build-time scan of V09's layout classes and message catalogue. Volume 9
    runs them on its app harness (T-V9-22: T126-1's tablet half, T126-2 and T126-3), volume 8 T126-2's host-frame clause and
    T126-3's embed clause (T-V8-62) and volume 12 T126-1's medium-minimum clause and T126-2 (T-V12-59).
* **The volumes' tests and the base's hook bars.** A staged engine's bars bind it when it lands (the convention's (3));
  the volume family below re-runs them on the engine's output, each of its tests naming the base bar and the clauses it
  takes:

| base bars | the engine (volume, milestone) | the volume family that re-runs them |
|---|---|---|
| T8-1 – T8-7, T17-2, T17-3, T18-1 – T18-4's epoch-spread form, T20-2's and T20-6's epoch clauses, T25-1, T31-2, T31-3, T31-8 – T31-12, T67-1 – T67-6, T70-1 – T70-4 over epochs, T72-1 – T72-9's epoch clauses, T76-1's per-year clause, T81-1, T108-4 over epochs (T-V6-45), T110-2's epoch clauses (4) and (5) (T-V6-47), T111-1 – T111-5's epoch form (T-V6-72), T113-1 – T113-3, T113-6, T113-7 (T-V6-71), T114-1 – T114-5 save T114-3's landfall clause, T114-8's and T114-10's epoch clauses (T-V6-73), T115-1 and T115-2 across a rung change (T-V6-74), T122-1's hand-over clause (T-V6-75), T123-4's epoch clause (T-V6-76) | the evolution engine (volume 6, M6-E) | every T-V6 test (V06 §7), on the H-100, H-DOSSIER and other H fixtures |
| T10-1, T13-1, T15-1, T102-2, T114-3's landfall clause (T-V5-14), T117-1 – T117-8's and T118-1 – T118-6's island clauses (T-V5-34, T-V5-35), T119-2 – T119-5's island clauses (T-V5-18), T120-1's registration and T120-4's and T120-5's sky clauses (T-V5-36) | the sky layer (volume 5, M6-sky) | every T-V5 test (V05 §7) (T102-2 by T-V5-19 – T-V5-21) |
| T11-1, T12-1, T14-1, T63-4, T64-1 – T64-3, T65-1 – T65-8, T66-1 – T66-4, T66-6, T109-1 – T109-6, T113-4 (T-V4-77), T113-5 (T-V4-76), T119-2, T119-3 and T119-5's clauses on this layer (T-V4-32), T120-4's and T120-5's underground clauses (T-V4-81), T123-1's, T123-2's and T123-6's clauses below ground (T-V4-82) | the underground layer (volume 4, M6-U) | every T-V4 test (V04 §7) |
| T28-1 – T28-8, T28-10, T28-12's `plan` clause, T28-13 – T28-15, T28-17's F-PLAN clause, T28-18's `setRoomUnit` clause, T28-19, T63-3, T119-2 – T119-5's plan clauses (T-V3-37), T120-4's interior-band clause (T-V3-38), T122-1's, T122-2's, T122-3's and T122-7's plan clauses (T-V3-40), T123-1's, T123-2's, T123-4's, T123-6's and T123-7's plan clauses (T-V3-39) | the plan rung (volume 3, M6-P) | every T-V3 test (V03 §7) |
| T29-4 on stacked and solid wings, T110-4, T110-5, T115-1's composed shapes and T115-4's rung clause on B-MASS (T-V2-58), T119-2's stage-3 clauses (T-V2-22, T-V2-24), T122-1 and T122-7's `item122.crises` registration (T-V2-60), T123-5 and T123-7's exterior clause (T-V2-59) | stage 3 (volume 2, M6; its item-110 part at M3a) | every T-V2 test (V02 §7) |
| §15.2's stage-2 letters S1–S6, T119-2 and T119-3's stage-2 clauses (T-V1-29), T120-2's and T120-4's town clauses (T-V1-59) | stage 2 (volume 1, M5) | every T-V1 test (V01 §7) |
| the village rungs' clauses of T13-1, T14-1, T30-4, T65-2, T102-1, T110-7, T111-1 – T111-5 (T-V7-58), the village halves of T113-1 and T113-3 and T114-9's village clause (T-V7-59), and the village clauses of T114-1 – T114-8 (T-V7-62), T115-1 – T115-4 (T-V7-63), T116-1 – T116-4 (T-V7-64), T117-1 – T117-8 (T-V7-65), T118-1 – T118-6 (T-V7-66), T119-2 – T119-4 (T-V7-67), T120-1 and T120-4 (T-V7-68) and T122-5 and T122-6 (T-V7-69) | the village product (volume 7) | every T-V7 test (V07 §7), with B-VILLAGE and B-VG |
| T73-1 – T73-10, T75-1 – T75-5, T77-1, T81-2, T85-1 – T85-3, T88-1, T88-2, T108-1 – T108-3, and the port's clauses of T111-1 – T111-5 (T-V8-50), T113-1 and T113-6 (T-V8-51), T114-7 (T-V8-52), T115-2 and T115-3 (T-V8-53), T117-1 and T117-6 (T-V8-54) and T118-1, T118-2 and T118-5 (T-V8-55), T120-2's dossier clause (T-V8-58), T122-4's census clause and T122-1 and T122-7's `item122.crises` registration (T-V8-59), T125-1 – T125-3 (T-V8-61) and T126-2's host-frame clause and T126-3's embed clause (T-V8-62) | the SettlementForge connection (volume 8, M-SF) | every T-V8 test (V08 §7), on the host harness |
| T101-6's clerk path, T111-5's `item111.water` registration (T-V10-45), T115-3's clerk form (T-V10-48), T120-2's clerk clause (T-V10-51) | the built-in clerk (volume 10, M3c) | V10 §7's evaluation cases and every T-V10 test (V10 §7) |
| T101-1 – T101-9 on the canvas (T101-4 by T-V9-82, T101-7 by T-V9-81), §13.4's scripted tasks and first-five-minutes test, the screens of items 111–126 (T-V9-71 – T-V9-79, T-V9-83 – T-V9-87: T112-1's thematic-view clause and T112-2 (T-V9-72), T114-6's legend, T115-3's hand form, T116-1's view controls, T117-6, T118-2 and T119-3 among them, T120-2 – T120-5's interface clauses (T-V9-83), T121-1, T121-4 and T121-7 (T-V9-84), T122-2's interface clause (T-V9-85) and T124-5 (T-V9-87)), T126-1's tablet half, T126-2 and T126-3 (T-V9-22) | the application (volume 9, inside M1–M4b; its staged screens with their layers) | every T-V9 test (V09 §7) |
| every bar's register line and its spec, the specs, pins and bench bars of items 111–126: T111-1 – T111-5 (T-V12-44); T112-1's style line (T-V12-45); T113-2, T113-5's registration and T113-7's pin (T-V12-46); T114-4 – T114-8 (T-V12-47); T115-1, T115-4 and T116-1 (T-V12-48); T117-1, T117-2, T117-4, T117-5, T117-7 and T118-1 – T118-6 (T-V12-49); T119-1, T119-2, T119-4 and T119-5 (T-V12-50); T120-1 and T120-6 (T-V12-52); T121-2, T121-3, T121-5, T121-6 and T121-8 (T-V12-53); T122-1 – T122-3 and T122-5 – T122-7 (T-V12-54), beside item 122 (h)–(i)'s four bars (T-V12-55); T123-2, T123-3 and T123-7 (T-V12-56); T124-1 – T124-4 and T124-6 – T124-9 (T-V12-57); T125-1 and T125-2 (T-V12-58); T126-1's medium-minimum clause and T126-2 (T-V12-59) | calibration (volume 12) | every T-V12 test (V12 §7) (T-V12-35 checks the bar map) |
| every content row a bar reads, the registrations of T111-5 (T-V11-38), T113-7 (T-V11-39), T114-8 (T-V11-40) and T115-4 (T-V11-41), T117-3 (T-V11-42), T122-4 (T-V11-46), T124-3's compile clause and T124-4's row clause (T-V11-48) | the content (volume 11) | every T-V11 test (V11 §7) |
=== END ===

=== REPLACE ### 13.8 CI tiers and compute budgets (SCL-18; D-34) ===
### 13.8 CI tiers and compute budgets (SCL-18; D-34)

The full verification rig costs ≈ 10–20 CPU-hours (12 000 B-CITY generations ≈ 1.6 CPU-h before the suite; 10⁵ oracle
regenerations ≈ 8 CPU-h; 10⁶ fuzz inputs × ≈ 20 primitives ≈ 0.3–5.5 CPU-h), so it cannot gate a single change. It runs
in three tiers, each with a wall-clock budget on a stated runner (a 16-core x86-64 Linux machine; timings normalised by
§12.1's calibration score):

| tier | runs | budget | contents |
|---|---|---|---|
| **PR** | every change | ≤ 15 min on 8 cores | lint (the determinism allowlist, units, dependency direction, the repository path rule), type check, unit and contract tests; B-FUZZ with 10⁴ random inputs per primitive plus the whole constructive-degeneracy set; B-CITY-lite 50 seeds per rung × 4 water settings; B-EDIT 10³ sequences with the oracle once per sequence; stage-isolated goldens and the per-stop placement digests on Node x86 (§13.3); every shipped style sheet through §8.2's slot resolution at every band and the render keys across two B-CITY-lite seeds per rung (§8.3); the stamp-tile asset's loaded hashes and its seam check (§8.3, §8.10); the licence, notices and deny-list scans; the app's scripted and accessibility tasks on Chromium |
| **nightly** | every night | ≤ 4 h on 16 cores | B-CITY 1 000 seeds × 4 water settings × 3 rungs with the invariant suite and the screen of §12.3's model max clause on every generation; B-FUZZ 10⁶ per primitive; B-EDIT 10⁴ sequences; **the O9 (c) faithfulness campaign** (n = 800 scopes × K = 50, ≈ 12.5 CPU-min, §13.2); the five-engine golden run with one PNG per LOD and preset, the placement digests, the stamp-tile asset rebuilt on the five engines and its loaded hashes in both workers, the sliced-raster and sliced-placement census rows (§8.3), and from M3a the five-engine GeoJSON with trees (§13.3); visual regression and B-ZOOM; control sweeps at TOWN and CITY; the option matrix; the B-REF parity report; and, last and alone on the runner, **§12.1's timing phase** (≤ 20 min: the cost-model sweeps with the F-WORK flatness check, the first-map runs, the in-Chrome re-measure of the model budgets and the re-timing of the max clause's flagged generations) |
| **milestone** | every milestone exit, and weekly | ≤ 12 h on 16 cores | B-EDIT 10⁵ sequences; METROPOLIS control sweeps; the 20-epoch test; the parity report at 100 of our seeds per setting against the ten-seed references (V12 §3.5.5); the D-5 renders, including every earlier panel still *provisional — not rated* (§13.6 (7)); §12.3's pool comparison in the timing phase at every rung the milestone confirms; memory and document-size tests at every rung |

A tier whose normalised wall-clock exceeds its budget by more than 10 % fails with *over budget*; the answer is to split
the job or make it faster, never to raise the cap — a budget changes only by a recorded decision. **Measurement (M0):**
the harness times each tier on the runner. **Pre-decided fallback:** if the PR tier exceeds 15 min, B-CITY-lite drops to
25 seeds per rung and the random fuzz to 5 × 10³ inputs per primitive (the constructive set is never cut), and the
nightly tier absorbs the difference.

**The bar schedule** (the one statement of when a §13.2 bar runs; §16's exits cite it). *PR* runs a bar on the golden TOWN
and CITY fixtures and its hook fixtures, *nightly* on B-CITY-lite and, for a bar that says B-CITY, on B-CITY; a
seed sweep, a cross-engine digest or a many-seed statistic runs nightly, a sweep over epochs in the milestone tier. A
bar's first milestone is the one that lands its mechanism; a clause named separately starts at its own.

| bars | tier | first milestone |
|---|---|---|
| T34-1 – T41-1 (the bent cut) | PR on the M0 (b) faces and NG's recorded shapes; T34-1's 10 000-face mean nightly | M0 (b) |
| T13-1; T14-1 but its hidden-render clause; T16-4; T23-1's registry test; T43-1 – T43-5; T45-1; T54-1; T55-1; T111-2, T111-3, T111-5 | PR; T14-1's S0 draws, T16-4, T111-3 nightly | M1 |
| T46-1, T47-1 | nightly (walled B-CITY seeds) | M1 |
| T20-7, T20-11, T20-12, T20-13; T73-1 – T73-9; T77-1's slice clause; T81-2's creation clause; T85-1, T85-2 | PR (B-DOSSIER-lite: the nine at-rung births × 5 seeds, ≈ 45 generations beside B-CITY-lite's 600); T73-8 in the nightly five-engine run | M1 |
| T88-1 (each reader from the milestone that lands its stage) | PR on the golden suite | M1 |
| T20-10, T73-10 | nightly (the totality files and the culture towns) | M1 |
| T65-7 (its sky-island clause from M4) | nightly (the relief-class sweeps) | M1 |
| T101-2, T101-3, T101-5 for T9 `shape` and T10 `hold` | PR | M2a |
| T16-1, T16-2, T19-1 – T19-3, T19-4 but its dossier clause, T23-1's parity clauses, T24-1 – T24-3, T26-1 – T26-3, T27-1, T27-2, T29-1 – T29-4, T30-1, T30-2, T30-4, T44-1, T57-1, T70-1 – T70-6, T71-1 – T71-4, T72-1 – T72-8, T72-9 but its dossier clause, T77-1's weight clauses | PR; nightly on B-CITY | M2b |
| T88-2 | PR (B-DOSSIER-lite) | M2b |
| T63-1, T63-2's views and labels, T63-4 | PR; T63-4's 1 000 seeds nightly | M2b |
| T68-1 – T68-4, T68-7, T68-8 (the day model) | PR on the golden fixtures but T68-7; T68-4 and T68-7 nightly on the five engines | M2b |
| T102-1, T102-4, T103-3, T105-4, T106-5, T107-4 (the no-op pins and the term's budget) | PR on the two PR golden seeds; the off-state suites nightly; T102-4 in the timing phase | M2b |
| T102-3 | milestone | M2b |
| T103-1, T103-2, T104-2, T104-3, T105-1, T105-3, T107-1 – T107-3, T108-1, T111-1, T111-4 | nightly (the correlation specs and the pooled statistics, volume 12's budgets) | M2b |
| T104-1, T105-2, T106-1 – T106-4, T108-2, T108-3 | PR | M2b |
| T16-3, T17-1, T18-1 – T18-4, T19-4's dossier clause, T20-1, T20-2's dossier-event clause, T20-3 – T20-5, T20-6's refusal clause, T20-8, T20-9, T22-1 – T22-4, T25-1, T30-3, T30-5, T31-1, T31-4 – T31-7, T63-2's query and export clauses, T66-5, T72-9's dossier clause, T104-4, T108-4 | PR; nightly on B-CITY | M3a |
| T28-9, T28-11, T28-12's `wings` clause, T28-16, T28-17's housing clause, T28-18's `relet` and re-homing clauses | PR (the B-PLAN fixtures) | M3a |
| T75-1 – T75-5, T76-1's cadence clauses, T81-2's absorb clause, T85-3 | nightly (the absorb pairs) | M3a (T76-1's coarsened catch-up fixture with M6-E) |
| T101-1 – T101-5, T101-7 – T101-9 for T2 `ground` to T8 `fill` | PR | M3a |
| T101-6 (both known-city fixtures, three paths) | milestone (≤ 10 min wall) | M3a |
| T110-1 – T110-7; the specs `T110b.*` | PR; the four raised-way specs in the milestone and weekly run (≤ 20 CPU-min) | M3a (T110-2's epoch clauses — the frame growth, and (4)'s and (5)'s circuits, contraction, stage growth and route re-solve — from M4 on the hook fixtures, those of (4) and (5) on volume 6's engine with M6-E's E2 and E3) |
| T29-5; T68-5, T68-6 (the night view); T101-1 – T101-5 for T11 `name` and T12 `dress`; the lit-street warp fixture but its tunnel, access-point and Works clauses | PR; the warp fixture in B-EDIT | M3b |
| T112-1 (the style check) | nightly, in B-ZOOM on every checked variant | M3b (`hatched` at M5) |
| T8-1 – T8-7, T10-1, T11-1, T12-1, T15-1, T17-2, T17-3, T20-2's epoch and tolerance clauses, T20-6's epoch clause, T31-2, T31-3, T31-8 – T31-12, T64-1 – T64-3, T65-1 – T65-6, T65-8, T66-1 – T66-4, T66-6, T67-1 – T67-6, T68-9, T72's epoch clauses, T76-1's per-year clause; the lit-street warp fixture's tunnel, access-point and Works clauses; §8.3's hand-lantern row | PR on the hook fixtures; T10-1's and T15-1's CITY sweeps, T64-2's and T65-2's 500-seed sweeps nightly; the 20-epoch test, with the wealth ladder and the decline table, in the milestone tier | M4 |
| T81-1 | milestone | M4 |
| T14-1's hidden-render clause; T109-1 – T109-6; T113-4, T113-5 | PR on the layer's fixtures; the sweeps and pooled bars in the milestone and weekly run (≤ 60 CPU-min each) | M6-U (T113-4, T113-5 at the later of M6-U and M6-E) |
| T102-2 | nightly | M6-sky |
| T113-1 – T113-3, T113-6, T113-7 | PR on the history fixtures; T113-2's digest in the nightly five-engine run | M6-E |
| T28-1 – T28-8, T28-10, T28-12's `plan` clause, T28-13 – T28-15, T28-17's F-PLAN clause, T28-18's `setRoomUnit` clause, T28-19, T63-3 | PR (the B-PLAN fixtures, and the clicked buildings of B-CITY-lite nightly) | M6-P |
| T112-2 (the game-master trial) | a human trial, outside CI | the release gate (§16) |
| T114-6, T114-7, T114-8's generation clause | PR on the readiness × wealth fixture grid and the two PR golden seeds; T114-6 nightly with the render bars (V12 §6) | M2b |
| T114-1 – T114-5, T114-8's epoch clause | the milestone tier over H-100's epochs and H-AQUA's for T114-3's crossing clause and T114-3's regrowth clause on volume 6's engine, T114-3's landfall clause on volume 5's landfall fixture; T114-4's and T114-5's step scripts nightly on the wall fixtures (V12 §6) | M6-E (with V06's E3; T114-3's landfall clause with M6-sky) |
| T115-1 – T115-3 | PR on S10b's hook fixtures at the village rungs' ceiling rows; `bldg.grandeur` nightly | M2b (the village clauses with V07's V-M2, the composed shapes with M6) |
| T115-4 | PR on the two PR golden seeds; the pins' off-state suites nightly | M2b |
| T116-1, T116-2, T116-4 | PR on the golden fixtures; T116-1's sweep nightly in B-ZOOM | M1 (the village fixtures with volume 7) |
| T116-3 | PR on the hook fixtures | M2a (its epoch clause from M4) |
| T117-1, T118-1 (the pins) | PR on the two PR golden seeds (the landing gate); their suites nightly at every fourth week, all 52 weeks at milestones (V12 §6) | M3b |
| T117-2, T117-4, T117-5, T117-7; T118-2 – T118-6 | nightly on the season and festival fixtures, alternate nights (V12 §6) | M3b |
| T117-3 | PR (volume 11's compile check) | M3b |
| T117-6 | PR on B-DOSSIER-lite's births whose dossier carries a stamped tick (the week's source, item 125 (b)), and on one with none (the season control's midsummer) | M3b (the port's reading with M-SF) |
| T117-8 | §12.1's timing phase | M3b |
| T119-1, T119-2 | §12.1's timing phase | M1 (TOWN, CITY); M2b (METROPOLIS and the cap); each other wait from the milestone that lands it — M3a (a dossier change applied, a migration), M6-E (advance time and the history replay), M-SF (an open from SettlementForge) |
| T119-3 | §12.1's timing phase with the app harness's frame sampler | M3b (with volume 9's progress view) |
| T119-4, T119-5 | PR (the budget register against the previous release) | M2b |
| T20-14 (a dossier event over locks) | PR on B-DOSSIER-lite | M3a |
| T20-15, T20-16 (a dossier population fall over locked dwellings and households) | PR on B-DOSSIER-lite | M4 (with the epochs) |
| T114-9 | PR on the hook fixtures | M4 (its TOWN-epoch clause; the village clause with volume 7, T-V7-59) |
| T114-10 | PR on the CITY castle fixture at generation; its 10 epochs in the milestone tier | M2b (its epochs with M6-E's E3) |
| T120-1 (the pin) | PR on the two PR golden seeds (the landing gate); its off-state suite nightly | M5 (Find's milestone) |
| T120-2 – T120-5 | nightly on volume 9's app harness over B-CITY-lite's seeds of every rung, the village fixtures and a dossier fixture (V12 §6) | M5 (each volume's clause at the later of its step and M5) |
| T120-6 | §12.1's timing phase at the METROPOLIS cap | M5 |
| T121-1, T121-4 – T121-7 | PR on volume 9's app harness; T121-6's pin suites nightly | M4 |
| T121-2, T121-3, T121-8 | §12.1's timing phase on the reference, the low-end and an ultra-tier device | M4 |
| T122-1, T122-7 (the pin) | PR on the two PR golden seeds (the landing gate); its suites nightly, every week at milestones | M3b (the dossier's crisis fixtures with M-SF) |
| T122-2, T122-3, T122-5, T122-6 | nightly on the crisis fixtures — the previews from M3b, volume 8's dossier crisis and force fixtures from M-SF (V12 §6) | M3b (the `disaster` look's district clauses from M5) |
| T122-4 | PR (volume 11's compile check over volume 8's census lists) | M-SF (with the map rows) |
| T123-1 – T123-7 | PR on B-PLAN's damage fixtures; T123-3's engine clause in the nightly five-engine run | volume 3's P4, the step that draws a decayed or ruined plan (V03 §8, inside M6-P) — the decay level read from the existence state at V11's default age until M6-E, T123-4's epoch clause with M6-E, T123-5 at the later of that step and volume 2's exterior step (M6) |
| T124-1, T124-3 – T124-5, T124-8, T124-9 | PR; the pin's suites nightly | M3b |
| T124-2, T124-6, T124-7 | §12.1's timing phase and the visual-regression run | M3b |
| T125-1 – T125-3 | PR on B-DOSSIER-lite (T125-1's required-keys dossier at every rung nightly) | M-SF |
| T126-1 – T126-3 | PR on volume 9's app harness | M2a (with the medium layout); T126-1 each tool from the milestone that lands it, every tool from M3a |
| the first-five-minutes sessions (§13.4) | human sessions, outside CI | M2a (the pipeline session), M3a (midpoint and exit), M3c (the clerk task, T-V10-26) |
| B-EDGE (§4.13's EP rows and its combination cells) | PR on its fixtures; the rung and preset sweep nightly | the milestone that lands each row's mechanism |
| the T-ER rows of §8.11, §9.7 and §11.6 (the rendering, label and export edges) | PR on their fixtures; T-ER-01 (B-CITY at the cap) and T-ER-08's stop sweep nightly; T-ER-04 and T-ER-16 in B-EDIT | the milestone that lands each row's mechanism (the village-rung fixtures with volume 7) |
| T-RIG-1 – T-RIG-6 (the rig's own edges: §13.5, §13.6 (12), §13.7, §13.8, §13.9) | PR | M1 (T-RIG-3 with M1's first panel; T-RIG-6 at M-CAL) |

The budgets above do not change: the PR tier's added work is measured at M0 with the tiers, and the fallback above
applies to it like any other over-run (J-A83.02). The palette bar (§13.4) runs with visual regression nightly.

**The volumes in the tiers.** Each volume's §7 names the tier of each of its bars inside these budgets. Volume 7 adds
`B-VILLAGE` and `B-VG` (PR: 20 seeds per rung; nightly: the full bench) and the frozen small-dossier fixtures; volume 8
its host-harness bars in the tiers its §7.1 names. Volume 12: each bar in the tier its §7.1 column states, inside
V12 §6's budgets — the harness's cost by job: B-REF, the pooled and correlation specs, the web, comfort and chain bars,
the no-op and view pins, the render bars of items 114, 117, 118 and 120–124, the underground's and the raised-way bars, the
known-city paths, the milestone parity report — with item 119's wait timing (T-V12-50) and the Find, resolution and weather timings of items 120, 121 and
124 (T-V12-52, T-V12-53, T-V12-57) inside §12.1's timing phase.
Calibration and corpus runs and the tendency bars' confirmation re-runs are runner jobs outside the tiers, never during
a timing phase (V12 §6).

**Edges.** Every job reads the whole `plat/` tree at its commit, never a diff, so a change that touches nothing a job
reads still runs the tier's lint, type check and path rule; a suite whose seed family, fixture set or baseline file is
empty or missing fails naming it, never passes vacuously; a record or file that contradicts the store — a shift record
whose seeds or digests differ from the golden store, a milestone record naming a missing report — fails the golden CLI
naming both; a job over its budget fails *over budget* by the rule above (T-RIG-5).
=== END ===

=== REPLACE ## §14 Package and module layout, key interfaces, dependency rules, extension points ===
## §14 Package and module layout, key interfaces, dependency rules, extension points

*In plain words.* The code is split into small packages with one-way dependencies: the geometry kernel knows nothing
about towns; the town model knows nothing about drawing; the drawing code knows nothing about how the town was made;
the app sits on top of a headless library. New looks, new layout templates, new export formats, new building
generators, new layers and new rule tables plug into named registries without touching the pipeline, and each design
volume ships as its own package that registers there. All of it lives in one repository, `plat/`, that never reads the
research material (§17). A host's settlement record — SettlementForge's dossier — enters through one package, the port,
and only one folder inside it knows the host's field names; a person with the canvas tools, an AI clerk through the
tool API and a skeleton file all make and change a town with one set of twelve tools.

```
@plat/kernel   lattice, predicates, one arena per layer with the five levels as views (§2.2), role and owner tables, resolution of stored
               references, batched transactions, kernel invariants, arrangement booleans / buffers / bands (§3.7), the straight skeleton and
               its validator (§3.8), obb / hull / lir, delaunay (delaunator), poisson (the stamped ranked tiles' construction from a constant
               stream key, run at build time by `plat/tools/stamptiles/` and in a worker only as the fallback rebuild, §8.10), curves, index
               (flatbush / rbush / grid), noise, dmath (our fdlibm 5.3 port), rng (xoshiro + 128-bit keys; `rng.stream`, the one structured
               stream mixer of §6.1), concern registry, the composition rungs' transient arenas (`transientArena`, `readBack`, `release`, §3.4)
@plat/model    schema (zod), addresses and lineage (§6.3), layers, entity registry (CI path-coverage test), lifecycle, provenance, document,
               serialisation (.plat, CBOR twin), migrations, the Merkle model digest and the MurmurHash3 functions it and the seeds use
               (`H128`, §6.2; `H32`, §13.6), the core statistics record, the control registry; the label records `LabelEntity` and
               `QuarterNode` (§9.1); the shared view vocabulary `LodBand`, `Box`, `Role`, `ZoomStop` and the label-row tables `LabelTable`,
               `StringTable`, `GeomTable` with §9.2's `LabelRows` view (§8.1); every record §2.5–§2.9, §7.1, §7.7 and II.7.4 declare — the
               staged ones (§2.7) schema-complete and empty until their stage — with `FactTier` and the pure `factTier` over the registry's
               dossier paths (§2.8) and the document's `dossier` block (§2.9; its `DossierBinding` and `CarriedFacts` are §7.7's); stage 2's
               types (V01 §2): `HoodPlace`, `CloseupRecord`, `CloseupParams`, `HoodRecipe`, the views `DistrictContext`,
               `TypedBoundary`, `DistrictSignature`, `FabricSignature` and `WayNamingContext` (from M1, S13a's naming input), `TerraceState`
               with its function `terraceState` (from M3a) and `stepProfile`
@plat/tables   rule tables, presets, style sheets, rung profiles (`ladder.json`, §1.1), the work-limit coefficients (`workLimits.json`,
               §5.1 (5)), the wealth ladder (`wealthLadder.json`, §4.11) and the Works table (`works.json`: `WorksTable` with its calendar
               row, §4.11), the room programmes and the interior ladder (`roomProgram.json`: `RoomProgramRow` and the `interiorLadder` table
               of `InteriorLadderRow`s, §2.6, §10.2), with the plan rung's tables (V03 §2.4), the roster tables with the basement gate
               (`RosterTables`, `basementGate`, §10.2) and their class-mix, cluster, quarter-identity, power and sector link, band-range and
               cover rows (`RosterTables.covers`), the disruption budget rows (`DisruptionBudgetRow`, §7.7), the band set
               (`prosperity.bands`, §4.5), the light rules (`lights.json`, §4.7), the underground layer's `undercity`, `underground-systems`
               and `links` rows (II.7.5, II.7.6) and `tables/under/network.json`, `layout.json` and `fade.json` (volume 4), the stage-2 tables
               `hood.templates`, `hood.dispatch`, `hood.squares`, `hood.pins`, `hood.kinds`, `hood.placeKnowledge`, `hood.defaultCuts`,
               `hood.constants` (one settings row, holding the `NG` preset's entries, V01 §3.15) and `way.surface`, and the base
               table `squares.quota` (volume 1), the sugar expansion table (`sugar.json`, §7.1), the dossier row sets `tables/dossier/*`
               (below), the parity presets `MFCG` and `FTG` (§7.6), setting packs (§10.4), the default keymap, the toolkit's rows
               `toolkit.json` (the twelve tools, their modes, the parameters the volumes add, their `emits`, first-use hints and
               availability by layout; V09 §2.3) and the message catalogue `messages/<locale>.json` (every bend, refusal, fate,
               error, share condition and hint in plain words, keyed, with the engine codes each renders; V09 §2.9, V09 §4.9) as versioned
               JSON with provenance; loaders; the override layer. Every table the UI shows rows of (class rows, district kinds, goods, style
               presets) carries a display `label` cell and an optional `icon` cell, and the class rows also `synonyms` and `commonness`
               cells for the roster reader (V09 §4.16); volume 11 writes the rows (its §3.1 registry lists every table)
@plat/site     S1 terrain, hydrology, coast / lake / island outline routine, rivers by descent, islands, bank classes, water faces
@plat/content  S2 sequential roster, demand and its propagation through the supply edges, government and religion rows, S7b / S10a
               allocation, households and people derivation, the relation-store schema, the economy and personality schema stubs
               (D-32), naming engine + grammar
@plat/layout   S3 siting, reservations and gate sites, S4 backbone, S5 growth and regimes, S6 grower / typing / fields / the quarter merge tree,
               S7 fortification and water furniture, S7b claims, S8 infill (BentCutFabric), S9 corridors, S12a hinterland siting, the
               hinterland unit, S12b greenery, S12c the district character step (§4.5); the StrategyRegistry with its `products` and
               `LadderRouter` (file f item 202), and the ordering of registered StageDecls
@plat/plots    S10 granularity law, per-frontage regions, joins / splits / alleys and passages, boundary treatments, the incremental re-cut
               with fixed neighbours (§4.7 S10 (7), §4.11); S11 site plans, packer, heights, footprint templates, the entrance set and the
               basement decision (§2.6); the one placement solver with its relation and supply scoring (§4.7 S10b) and the designation
               mutator (§4.7 S11) with the class mix, the concealed pair and the `cluster` arrangement, and S11's light placement (§4.7);
               the BuildingGenerator interface (`outline` / `compose` / `plan`) + OutlineBuildingGenerator and the default implementation of
               `BuildingGenerator.plan` (§2.6); the base outline builder's item-110 building part — `massStepped`, `stairTreads`,
               `cryptSeedWings` and `facadeBays` with its two constants' reader (`bayM`, `endMarginM`), in every build order (volume 2
               §8.5) — and `basementDoor(b)` (V03 §3.7.1, from M3a)
@plat/hood     stage 2 (volume 1): TemplateFabric over the hood.templates rows (the four NG templates and seven context templates) and
               its seed primitives, S7c's FabricSelector (S7b's hook) with templateLandM2, S9b's BlockDispatcher (S10a's hook), the
               local-place step (an S13a registration with its opening pass), the refine close-up's CloseupDeriver (the outline close-up,
               the ground access symbols), the unit runner (standalone and sky), the DistrictContext and DistrictSignature builders, the
               services catchmentOf / districtsAbove / fabricSignature / skyDistrictCount / findAreas / gapUnits /
               disasterSource with disasterDistricts / campLand and the writer plantRimWalk (V01 §3.16, V01 §5.4), the
               WhyProviders and the hood.fabric epoch participant [built at M5 — where `campLand`, which item 122's camp
               placement reads, lands first at M3b, it creates the package with that one service (V01 §8.1); the interfaces
               live in @plat/layout and @plat/model]
@plat/buildings stage 3: the massing (outline), the composer (compose), composition.json's loaders, the roofscape and facadeBays (re-exported
               from @plat/plots), and the plan rung (volume 3: plan() — the programme, the anchors, the partition, openings, heads, the
               crypt's plan, furnishing and the plan report; its tables load through @plat/tables)   [built at M6 (volume 2); where M6-P
               lands first it creates the package with the plan rung alone and M6a adds its members; the BuildingGenerator interface lives
               in @plat/plots]
@plat/under    the underground layer (volume 4, M6-U): the network, its forecast, the sewer-front neighbourhoods, the void systems, the
               undercity, the connection stage, the closure generators, the fade — over @plat/kernel, @plat/model, @plat/tables, @plat/plots
               and @plat/content; registered in @plat/layout's registry; never imported by the ground's packages
@plat/sky      the sky layer (volume 5, M6-sky): S7b (5)'s gate, slots, fills, outline and placement, the `handover` of the S3
               reservations an institution island leaves (V05 §3.5), `SkyStrategy`, the access siting, the claim search with the crypt
               test, the island's gradient field, `undersideTiers`, `skyUnitInput` (the island's unit inputs, `SkyUnitInput`),
               `islandShadeStrip` with the shade basis, `skyRoute`, the rim's barrier circuit, `IslandEpochStep`, the landfall;
               registered into `StrategyRegistry.sky`, `IslandEpochStep` also as volume 6's epoch participant `sky.islands`;
               `islandShadeStrip` called at S10a once per shade evaluation by the strips' first reader (an `S10a.afterDrivers` hook,
               volume 1's S9b, else field pass 2) and at each epoch's re-evaluation, `skyRoute` by S10b's distance reads between arenas;
               depends on @plat/layout, @plat/site, @plat/content and @plat/kernel
@plat/evolve   the evolution engine (volume 6, M6-E): the `'history'` EvolutionStrategy, its phases, the history index, store and frames;
               depends on @plat/layout, @plat/plots, @plat/content and @plat/edit's operators; registers into `StrategyRegistry.evolution`;
               the participants of @plat/sky, @plat/under and @plat/hood register there too
@plat/village  the village product (volume 7): its `ProductDecl`, VS1–VS8, the `course-first` RiverStrategy, the `tracker` NetworkStrategy,
               the `palisade` EnceinteStrategy, the `village-ways` FabricStrategy, the `toft` PlotStrategy, the village field presets and
               epoch phases   [built at V-M0 – V-M4; depends on @plat/layout and @plat/plots through their interfaces only]
@plat/labels   S13a names (every node of the quarter tree), candidates and spines; S13b view placement over the parameters the renderer
               passes in (`ObstacleSource`, `RoleIndex`, below) — it never imports render; the font-metrics reader; collision; furniture
               incl. the ruler and the emblem generator; the knowledge filter over the label rows' `knownTo` (§9.2)
@plat/render   S14 columnar display-list builder, paint programs, style sheets, LOD, the tile pyramid and the tile worker (which runs S13b
               by calling `@plat/labels`), backends (Canvas2D, SVG, print tiles; the WebGL2 tile compositor as a fallback), the light
               pass — §8.4's lighting model as a post operation over the base raster, its CPU implementation the reference and a WebGL2
               (WebGPU where available) accelerator that draws no marks — with the vector rung as its fallback, decoration stamps over the
               bundled stamp-tile asset (§8.10), live layers (`live.stale` and the dry run's ghost `live.ghost` among them) and the
               `states` rows' programs (§8.2), the tile worker's queue of resumable raster jobs (§8.9)
@plat/edit     edit events (§7.1's kinds, each with its inverse, its fates and its migration, §7.4, §7.5), dry-run validation, undo and redo
               records, scoped regeneration, rebase, the dependency audit, event migrations, warp kernels; the epoch runner in its fold
               (§4.11)
@plat/export   geojson, svg, png / tiles (streaming), vtt (Foundry-class scene JSON, dd2vtt), gltf / obj, cityjson, csv, permalinks, the
               skeleton file (the declared subset, §11.1)
@plat/port     the one door for dossier facts (item 73): `DossierPort` — `digest`, `creation` (door 1's blueprint and the log's
               creation prefix) and `absorb` (door 2's events and epochs), §11.4 — over one adapter folder per SettlementForge product
               line, `adapters/sf/<line>/` (the first `fp-integration-2026-09-23`, pinned at commit `5d699cc68`), each a pure function
               from a host's whole dossier to the neutral `DossierDigest` with its `AdapterManifest`, selected through the
               `AdapterRegistry` (V08 §2.4); the host glue's audience table (below)
@plat/sim      optional, M4b: the relation store materialised, postings, occupancy and schedules, calendar, factions, events, economy,
               personality and the stat-block pack (D-32) — over @plat/content ids
@plat/api      the handle-based facade (§11.2), the generation worker host — which imports each staged package the build includes
               (@plat/hood, @plat/buildings, @plat/under, @plat/sky, @plat/evolve, @plat/village) and calls its registration into the
               StrategyRegistry at start — the derivation pool, the host bridge with its `report.changed` event (§11.3) and DocResolver
               (§11.5), the elaboration cache (`Document.elaborations`, held in the generation worker, §2.9), the clerk's tool API over the
               facade (§11.2, item 101), the headless CLI
@plat/clerk    the built-in clerk (volume 10, M3c): '@plat/clerk/core' — the brief's rendering, the spatial resolver, the twelve tools'
               encoders, drafts and proposals, the critique engine, the knowledge guard, the grounding check, transcripts, the usage
               meter, settings; '@plat/clerk/model' — the model backend, the request builder, the prompt and the turn loop, a lazily
               loaded chunk and the only importer of the provider's SDK
@plat/app      the reference UI (below): the shell, its screens and flows (volume 9); a second entry `embed.html` — host mode: no file
               operations, no `DocResolver`, bridge-driven (V08 §3.1, V08 §5.1)
@plat/bridge-client the host client a host page imports (volume 8): `MapHost`, `MapSession`, `MapStore`, `MapRecord`, `hashDossier`,
               the status texts; dependency-free, its message types generated from `@plat/api`'s bridge schema at build
               time (V08 §2.2)
@plat/cli      the command-line clerk `plat clerk <doc>` (V10 §3.17), built only where volume 10's spike S1 takes its pre-decided
               fallback; over @plat/api and @plat/clerk
@plat/docs     the user guide: generated reference pages from the control, entity and table registries plus written pages;
               `known-defects.json`; release notes generated from `plat/goldens/shifts/` and the milestone records (§13.3), the D-5
               statuses (§13.6) and the known defects
@plat/testkit  B-FUZZ generators (random and constructive), invariant runners, cost-model tests, the bench statistics and the `parity` CLI
               (reads `baselines/baselines.json` only), golden tooling with shift, cascade and milestone records and placement digests over
               `plat/goldens/` (§13.3) and the one `WaterSetting` type every record uses, the O9 (c) faithfulness campaign (§13.2), the boolean
               and buffer oracles (Clipper2-WASM in Node, polygon-clipping; §3.7), the clean-room scanner (§17.1 (5)), the D-5 seed list by
               `H32` and the export command (`plat d5 seeds`, PNGs for §13.6), which read only the committed numbers-only files of §17.1 (4);
               the frozen dossier fixtures `plat/tests/fixtures/dossier/` with their `manifest.json` and the B-DOSSIER-lite bench (§13.2);
               the metric registry `METRICS`, `measureInputOf` and `plat measure`; `plat baselines check / aggregate`; the seed families;
               `plat calibrate` (runs and the register); `plat nullmodel` and `plat statbar` with the expected-value functions of
               `@plat/testkit/expected` and the step runner; `undergroundInputOf`; the panel engine with `plat d5 verdict`; `plat known` (the
               known-city fixtures' engine) and `plat noop` with `@plat/testkit/noop` (the no-op pins); `@plat/testkit/bars` (the
               `BenchBarDef` registrations, §13.2's convention (7)) (V12 §2 – V12 §3); the clerk's
               evaluation cases, graders and cassettes (V10 §7)
```

Each stage's declared inputs and outputs are its `StageDecl` registration (§4.1–§4.12); the record types a registration
names are declared at their homes (§2.5–§2.7, §3.4, §4.8, §10.4, II.1, II.6, II.7.4, and each volume's §2).

**Dependency rules (enforced by lint):** `kernel ← model ← tables ← {site, content} ← layout ← plots ← buildings ← labels
← render ← edit ← export ← port ← api ← clerk ← app`; **labels ← render**: the tile worker in `render` runs S13b from
`labels`, and the drawn symbol extents and the display-list index that S13b reads reach it only as the parameters
`ObstacleSource` and `RoleIndex` — interfaces `labels` declares and `render` implements — so `labels` never imports
`render`, and the types both use (`LodBand`, `Box`, `Role`, `ZoomStop`, `LabelEntity`, the label-row tables and `LabelRows`)
come from `model`; `buildings` implements `plots`' `BuildingGenerator` and is imported by `render` and `export` for its
pure `roofscape` and `facadeBays`, and by `export` for the plan's pure readers (the JSON `plan` block, the `.dd2vtt` and
Foundry storey scenes, CityJSON storeys and glTF interiors), only; `render` and `export` may import `facadeBays` from
`plots` or `buildings`; `hood`, `village` and `evolve` depend on `layout` / `plots` only through their interfaces (and
`evolve` on `content` and `edit`'s operators); `under` depends on `kernel`, `model`, `tables`, `plots` and `content`, and
`sky` on `layout`, `site`, `content` and `kernel`; no ground package imports `hood`, `under`, `sky`, `evolve` or
`village` — `api`'s worker host alone imports them, to register them; `docs` reads the registries of `model` and
`tables` only; `sim` depends on `content` and `model` only; `port` depends on `model`, `tables`, `content` and `edit`
only and is imported only by `api` and the reference app's host glue; `clerk` depends on `api`, `model` and `tables`
only and is imported only by `app`, `cli` and `testkit`; `cli` depends on `api` and `clerk` and is imported by nothing;
`bridge-client` imports nothing of `plat/` and nothing in `plat/` imports it; `testkit` may import `api` and `export` and
is imported by nothing shipped; `render` never imports `layout`; nothing depends on `app`; no package imports a backend
it does not need; every adopted runtime library is imported in exactly one adapter file of the one package that uses it.
Model packages, `@plat/labels` and the renderer code that feeds S13b obey §6.5 (3)'s allowlist lint, which also scans
the vendored dependency sources (§6.5 (4)); it scans the dossier port's adapter boundary too: each adapter folder
declares its **key list** (`AdapterManifest.keyList`) — the host keys it reads, less the field names of `DossierDigest`
below, which are the module's own vocabulary even where one coincides with a host key — and no module of `plat/` outside
the adapter folders names a key on any adapter's list (§6.5 (3); J-A73.02). No import, fixture or script path may
resolve outside `plat/` (§17.1 (3)).

```ts
// @plat/layout — stages and strategies (StageDecl, NetworkStrategy and EnceinteStrategy are §4.12's)
interface Stage<I, O> extends StageDecl {   // StageDecl (§4.12): id, I/O, stream keys, invariants, ladder, workLimits, budgetMs, batch, lineageUnit, lazy, txForm
  version: string; inputsOf(model: Model, scope: Scope): I; run(input: I, ctx: StageContext): KernelResult<O> }
type ConcernId = number & { readonly __brand: 'ConcernId' };   // u16 from the concern registry (§6.1), generated as typed constants — never a string
interface StreamOpts { reroll: number /* the derivation unit's reroll (§6.1) */; attempt: number /* ladder retry, ≤ the concern's registered cap (§6.1, §9.6) */;
  epoch: number; salt: number /* the concern's current salt from the recipe and the log's rerollLayer events; 0 for geometry concerns */ }
interface StageContext { doc: Document; plats: Record<string /* PlatKey */, Plat>;
  stream(concern: ConcernId, entity: Handle /* its entity key is cached in the arena beside its lineage hash; TOWN_ROOT for town-level draws (§6.1) */, opts: StreamOpts): Stream;
  streamOpts(concern: ConcernId, entity: Handle, attempt?: number): StreamOpts /* the defaults: reroll from the entity's derivation unit, epoch from this context, salt from the document */;
  tables: TableView; rung: RungProfile /* §1.1 */; report: ReportSink; scope?: Scope; epoch: number }
type Scope = { kind: 'all' } | { kind: 'entities'; ids: Id[] } | { kind: 'region'; ring: Polygon; key: PlatKey; level: Level } | { kind: 'epoch'; epoch: number };   // no raw face ids at the API
interface StrategyRegistry { terrain: Map<string, TerrainStrategy>; coast: Map<string, CoastStrategy>; river: Map<string, RiverStrategy>; manifest: Map<string, ManifestStrategy>;
  network: Map<string, NetworkStrategy>; enceinte: Map<string, EnceinteStrategy>; fabric: Map<string, FabricStrategy>; plots: Map<string, PlotStrategy>;
  sitePlan: Map<string, SitePlanStrategy>; building: Map<string, BuildingGenerator>; evolution: Map<string, EvolutionStrategy>; sky: Map<string, SkyStrategy>; sewer: Map<string, SewerStrategy>;
  underground: Map<string, UndergroundStrategy | UndergroundSystemStrategy | AccessPassStrategy | UndercityStrategy | UndergroundLinkStrategy> /* II.7.4–II.7.6: registered after the network stage by declared I/O in their order (V04 §3.1) — the systems, the access pass (U-ACCESS), II.7.3's sewer-front neighbourhoods (U-FRONT), the undercity, then the connection stage — their outputs under.blocks, under.plots, under.buildings and under.access placed before the display list by §4.1's order */;
  hooks: Map<string, StageHookDecl[]> /* §4.12's hook points, keyed by host ('S7b.afterGreedy', 'S10a.afterDrivers'); volume 1's S7c and S9b the two registrations */;
  products: Map<'base'|'village', ProductDecl /* V07 §2.1's type; the base registers 'base', @plat/village 'village'; LadderRouter reads it (§1.1; file f item 202) */> }
interface FabricStrategy  { partition(district: District, seam: SeamContract, ctx: DistrictContext, sc: StageContext, k: Kernel): KernelResult<{ blocks: Block[]; ways: Way[] }>;
  levelledUnits(district: District, plots: Plot[], buildings: Building[]): LevelledUnit[];   // the units S10 and S11's levelling levels (item 110 (a))
  terracedEdges: boolean }   // the district-edge terrace source runs only where true: the bent cut true, `village-ways` false, the stage-2 fabrics their own (volume 1)
  // DistrictContext and TypedBoundary: @plat/model (V01 §2.3), assembled from committed state, draw-free, views over the context vector (§2.5); FabricStrategyId is §2.5's: the id of a registered fabric — `bent-cut`, a hood.templates row (V01 §2.2) or V07's `village-ways`
type LevelledUnit = { plot?: Id; block?: Id; outline: Polygon; excluded?: Polygon[] };
interface PlotStrategy    { subdivide(block: Block, ctx: BlockContext /* a view over the context vector, §2.5 */, claims: Claim[], sc: StageContext, k: Kernel): KernelResult<{ plots: Plot[]; alleys: Way[]; residue: Residue[] }> }
interface SitePlanStrategy{ plan(plot: Plot, ctx: ContextVector, tables: TableView, rng: Stream, k: Kernel): KernelResult<SitePlan> }
interface GranularityLaw  { bands(ctx: ContextVector, rung: RungProfile): { frontageM: [number, number]; depthM: [number, number]; areaM2: [number, number]; joinMax: number; vacancyRunShare: number } }   // the deep-interior choice is S8's (§4.6); the rows are keyed by §4.5's band set and read at the plot's manifested band (§4.11)
// @plat/kernel — the façade the stages see, and the one stream mixer every reader uses
interface Kernel { plat(key: PlatKey): Plat; view(key: ArenaKey, level: Level): LevelView /* a transient arena has level 0 only */; resolve(ref: GeomRef, key: PlatKey): Resolved /* role references exist only on plat arenas */; geom: GeomOps; index: SpatialIndex;
  // transientArena, readBack, release and a transient arena's services are §3.4's; ArenaKey = PlatKey | TransientKey (§3.3); a transient arena is read through readBack and view, never as a Plat
  tx<T>(tx: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<T>   // exactly one form: tx.ops (declared) or fn (callback), §3.3
}   // KernelTx (§3.3) carries `stage` and `rederivesFrom`; the services resolveVertexAt, signature and sampleProfile are §3.4's
interface Rng { stream(entityKey: Hash128, stage: number /* u16 stage id; STAGE_VIEW = 0xffff for paint programs and furniture */, concern: ConcernId, opts: StreamOpts): Stream }
// StageContext.stream is rng.stream with the calling stage's id and the entity's cached key; paint programs and furniture call rng.stream with STAGE_VIEW.
// No string reaches the mixer; the textual form of a key (§6.1) is rendered for reports only, and a lint rejects a stream call whose concern is not a ConcernId.
// @plat/content — a host's own roster or people; registered only after §11.4's double-run check, its outputs recorded in the document; its call points are §4.2 S2, §4.7 S10b and §10.3
interface ContentProvider { id: string; version: string; roster(pop: number, economy: EconomyShares /* the town-level character, §4.2 S2 (J-A72.43, J-A72.01); never item 72's district CharacterVector */, tables: TableView, rng: Stream): Roster;
  site(roster: Roster, plots: Plot[], ctx: SitingContext, rng: Stream): SitingResult; people(household: Id, rng: Stream): Person[] }
// @plat/port — the one door for dossier facts (item 73). The contract's own records — DossierBinding, CarriedFacts, DossierChange and the rows
// DerivationRow, ReceiptRow and StatusRow — are §7.7's; the port fills them. Nothing outside the adapter folders reads a host's JSON.
interface DossierPort {
  readonly adapter: { id: 'sf'; line: string /* the SettlementForge line's canonical id — its adapter folder's name, e.g. 'fp-integration-2026-09-23' (the git branch fp/integration-2026-09-23 at commit 5d699cc68); every place that names the line uses this spelling */; version: string };
  digest(raw: unknown, host?: HostContext): PortResult<DossierDigest>;   // the adapter, selected through AdapterRegistry (V08 §2.4), normalises one whole dossier; an unknown shape refused
  creation(d: DossierDigest, host?: HostContext): PortResult<{ blueprint: Blueprint /* §4.2 S0 */; prefix: EditEvent[] /* the `assign` events at log positions 0…k,
    `creation` and EditBase.dossier set (§7.7 One path) */; binding: DossierBinding; carried: CarriedFacts }>;
  absorb(doc: Document, d: DossierDigest, host?: HostContext): PortResult<{ changes: DossierChange[]; events: EditEvent[] /* dossier events at their weeks, in the
    host's order, decrees first */; epochs: EpochInputs[] /* by §4.11's cadence */; binding: DossierBinding; carried: CarriedFacts; report: PortReport }> }
// AdapterManifest (each adapter folder's: id, line, version, commit, requiredKeys, optionalKeys, keyList, recognise, limits, vocabulary, remaps, fromLines) and
// AdapterRegistry (register; select, whose order is V08 §2.4's) are V08 §2.4's
type PortResult<T> = { status: 'ok'; value: T; notes: PortNote[] }
  | { status: 'refused'; code: 'E_RUNG_UNAVAILABLE' /* a population outside a registered product's range: below 1 500 while no village product is registered (§7.7 item 15; §1.1), or above the 120 000 cap (§1.1; J-A81.01) */
      | 'E_UNKNOWN_SHAPE' | 'E_LINE_UNSUPPORTED' | 'E_OTHER_SETTLEMENT' /* an absorb whose digest's settlement key differs from the binding's — never for an offer whose `id` fell back, nor against a settlement key minted at the document's creation (`settlement:map:<mapId>`), which a later readable `id` is not checked against (§7.7 item 12; V08 §2.4) */;
      message: string; notes: PortNote[] };
interface PortNote { kind: 'unmapped_kind'|'unmapped_word'|'ignored_key'|'unreceipted_change'|'rename_without_receipt'|'duplicate_key'|'state_matches_absorbed'
    |'quarantined_record'|'quarantine_hold'|'adapter_remap'|'line_migrated'|'line_defaulted'|'held'|'size_limit'|'ladder_merged'|'ladder_promoted'|'ladder_unknown'
    |'chain_node_unjoined'|'unmapped_good'|'npc_rebound'|'calamity_unplaced'|'custom_resolved'|'custom_unversioned'|'custom_node_unjoined'|'library_mismatch'
    |'custom_library_dropped'|'low_confidence'|'uncatalogued_step'|'derived_landuse'|'name_unjoined'|'name_ambiguous'|'custom_unkeyed'|'count_over_range'|'not_placed'
    |'frozen_fact_changed'|'history_gap'|'field_fallback' /* item 125 (b): a field the port reads that the dossier lacks, leaves empty or gives unreadable (V08 §3.5: its path absent or its value of no form its row reads; an empty list is a value, compared as read), its fallback taken — at an absorb the carried fact standing (V08 §2.4, V08 §3.5) */
    |'line_differs' /* item 125 (e): `HostContext.line` names a registered, accepting line the dossier's own selection did not take (V08 §2.4) */;
  detail: string /* the English line, for logs and tests */; msg: MsgRef /* key 'host.note.<kind>' (a held note: a host.held.* row), args as V08 §4.6's table names */;
  keys: string[] /* the binding keys it concerns, [] when none */ }   // each kind's class — event, standing or report — and meaning are V08 §4.6's
interface HostContext {   // every field optional (item 20 (h) (iv)) and none a data input — the dossier is the port's only one (item 125 (a)); none changes a document a dossier makes (T125-2)
  audience?: { role: 'owner'|'editor'|'viewer'; knowledge?: 'public'|'local'|'secret' } /* the role and knowledge key the host sets per viewer by the host glue's audience table, below — view state that travels (§11.3; J-A30.82) */;
  displayNames?: Record<string /* binding key */, string> /* applied inside ONE export request (§11.2's `ExportOpts.displayNames`), never stored (item 85) */;
  line?: string /* the SettlementForge line the host runs: checked against the dossier's own selection (V08 §2.4), never chosen from; a line no adapter supports, or one the dossier's stamps contradict: E_LINE_UNSUPPORTED; a registered, accepting line that differs leaves the selection standing, both reported */ }
// the neutral digest — the module's own vocabulary; the adapter fills it, and every other module reads only this
interface DossierDigest {
  settlement: { key: string /* `settlement:<id>`, the dossier's own id, else V08 §2.4's `id` fallback (§7.7 item 12) */; name: string; tierWord: string /* the map's title word (§7.7 item 15) */;
    population: number /* persons */; seed: Seed /* H32("plat:sf-seed" ‖ the dossier's seed, else ‖ the settlement key — V08 §2.4's `_seed` row): derived, never the host's seed (below) */; line: string; versions: Record<string, string> };
  site: { terrain: string; access: string; threat: string; magic: string; culture: string /* the profile key */;
    deposits: { key: string; state: 'available'|'depleted'|'removed'|'discovered'; custom?: boolean }[]; isolation?: { status: string; paths: string[] } };
  walls: { records: string[] /* binding keys of the wall institutions */; citadel: boolean; flagged: boolean };
  wealth: { label: string /* the dossier's seven-step prosperity word */ };
  economy: { incomeSources: { source: string; percentage: number /* % of income */ }[]; exports: string[]; imports: string[]; transit: string[]; entrepot: boolean;
    foodImportPct?: number /* % */; foodChains: Record<string, boolean>; chains: { key: string; processors: string[]; status: string }[];
    dependencies: { institution: string; resource: string; severity: number }[];
    tradeLinks: { good: string; goodId: string; flow: 'import'|'export'; partner: string }[]; partners: { key: string; name: string; relationship: string }[] };
  government: { name: string; governingPower?: string };
  powers: { key: string; name: string; category: string; standing: number /* power ÷ Σ power */; governing: boolean;
    controlled: string[] /* binding keys, resolved through the line's stable part (§7.7 item 12) */; relations: { with: string; kind: string }[] }[];
  institutions: DossierInstitution[];
  quarters: { name: string; phrase: string; landmarks: string[] }[];
  notables: { key: string; name: string; role: string; category: string; power?: string; institution?: string; importance?: string; status?: string; replaced?: string }[];
  conditions: { key: string; archetype: string; severity: number; status: string; sinceWeek?: number; untilWeek?: number }[];
  stressors: string[]; religion?: { deityKey?: string; deityName?: string };
  history: { ageYears: number; events: { type: string; yearsAgo: number; severity: string; name: string; week?: number }[] };
  receipts: Record<string /* binding key */, { field: string /* a receipt field of §7.7's receipt table */; week?: number /* its own week */; ref?: string /* its event, outcome or decree id */ }[]>;
  custom: { definitions: { key: string; category: string; name: string }[] };
  ignored: string[] /* the top-level keys the adapter dropped by §7.7 item 1's never-read list, for the report */ }
  // at the SettlementForge stage the digest gains V08 §2.5's fields (typed there; file f item 509): security, government.legitimacy, notables[].workplaceKey and .powerKey,
  // powers[].relations' trend, conditions[]' source and severityBand (the stressors normalised into them), site.ruinEvidence, site.threats, site.latitudeDeg,
  // economy.chains extended, economy.dependencies keyed, economy.goods and calamities; and V08 §2.8's custom content (file f item 511): customChains, customDefs,
  // customResources and customServices beside `custom`
interface DossierInstitution { key: string /* the binding key (§7.7 item 12) */; name: string; kindLabel: string /* the name without its numeric count range */;
  kind?: string /* the catalogue kind, when present */; category: string; tags: string[]; count?: [number, number] /* a collective record's range */;
  districtScale: boolean; facets: { clandestine?: boolean; subterranean?: boolean }; forbidden: string[];
  state: 'active'|'impaired'|'remnant'|'ruined'|'removed'|'destroyed'|'vacant'; fate?: string; inactive: boolean /* the fate read first (§7.7 item 14) */;
  impairments: { type: string; severity: number; cause?: string; covert?: boolean }[]; knownTo?: 'public'|'local'|'secret'; founded?: { week: number };
  renamedFrom?: { name: string; receipt: 'demoted_by_disaster'|'upgraded_by_reconstruction' }; custom?: CustomRecordRef /* V08 §2.8 */; receipts: string[];
  order: number /* the record's position in the dossier: the tie-break of two records of one key */ }
  // at the SettlementForge stage it gains V08 §2.5's role, openTop, popQualifier, qualifiers, step, lesser and mergedInto (file f item 509)
interface PortReport { changes: number; events: number; epochs: number; unreceipted: number; renamesRebound: number; renamesAsRemoveAdd: number;
  ignoredKeys: string[]; stateMatchesAbsorbed?: number /* the index of the earlier absorbed state the incoming dossier equals (§7.7 item 5) */ }
// @plat/plots — the stage-3 hook: BuildingGenerator { outline(…); compose(…, lod); plan(…, prior?) } is §2.6's; PlacementSolver and DesignationMutator are §4.7's, RelationRule and SupplyEdge §10.2's
// @plat/labels — S13b's inputs from the renderer, declared here and implemented by @plat/render (labels never imports render)
interface ObstacleSource { protectedExtents(stop: ZoomStop, box: Box): { box: Box; entity: Handle; kind: 'gate'|'castle'|'plaza'|'bridge'|'wall'|'room' /* room: the building band's room-label boxes, from the plan draw's room-label marks (§8.5, §9.2) */ }[] /* drawn symbol extents at the stop, §9.2 */;
  coverage(stop: ZoomStop, box: Box): { labels: number; protected: number; buildings: number; ways: number; water: number } /* mark cover, for furniture placement, §9.5 */ }
interface RoleIndex { roleAt(p: Point, band: LodBand): Role /* the area mark under a point: halos, §9.4 */;
  snap(p: Point, radiusPx: number, stop: ZoomStop, roles?: Role[] /* the candidate roles, in priority order; absent: way centre-lines, face edges and vertices (the ruler) */): { p: Point; role: Role } | null
    /* the ruler and the authoring surfaces' feature snap, §9.5; V09 §3.4 lists each tool's roles, the natural-barrier edges of item 106 (a) among them */ }
// both are implemented by @plat/render over a display list: in the tile worker for S13b, furniture placement and the ruler (the main thread reaches coverage and snap
// through §8.9's queries), in the generation worker over an SVG export's transient list, and in the tile worker over a raster export's (§11.1); every implementation is under §6.5 (3)'s lint
// @plat/labels — LabelPlacer and PlacementJob, which take §9.2's LabelRows view: §9.2
// @plat/model — LabelEntity, QuarterNode: §9.1; LodBand, Box, Role, ZoomStop, LabelTable, StringTable, GeomTable: §8.1, §8.2, §8.8; LabelRows: §9.2
// @plat/render — DisplayList, MarkTable, DisplayDelta, DisplayListBuilder: §8.1; StyleSheet, Symbolisation, OrderSlot, LiveLayerProvider: §8.2; LayerSpec: §8.4;
//                backends, threads, TileAddress, TileRasterOpts, TileBackend, RasterJob, VectorBackend: §8.9
// @plat/edit
interface EditEngine { apply(doc: Document, e: EditEvent): ApplyResult /* Ok | Conflict(actions) | Confirm(token, fates, renames) — an event carrying fates and renames commits only when a fresh dry run computes the same fates and renames (§11.2) */;
  undo(doc: Document, session: string, of?: number): ApplyResult /* appends an undo event for the session, §7.4; `of` only for the owner role */;
  redo(doc: Document, session: string): ApplyResult /* appends a redo event */;
  replay(base: Base, log: EditEvent[], opts?: { toSeq?: number; mode: 'interactive'|'replay' }): Model; migrate(doc: Document, to: string): { doc: Document; diff: UpgradeDiff /* §7.5 */ };
  rebase(doc: Document, reason: RebaseReason, at?: number /* default: the log head; h₀ — the decoded snapshot's model.seq — when the saved town is kept after
    edits made during load verification (§2.9 step 4, §7.1): the only two states the engine holds materialised */): ApplyResult /* as apply, undo and
    redo report: 'ok' when the rebase event is appended at the head; any other `at` returns { status: 'conflict', actions: [{ kind: 'invalid', message:
    'E_REBASE_AT: at must be the log head or h₀' }] }, appends nothing and rebases nothing, on every host alike (§7.1, §11.2) */ }
// the event kinds, each with its inverse, its fates and its migration, are §7.1's (§7.4, §7.5)
// @plat/api — PlatApi and DocHandle: §11.2; BridgeTransport and BridgeMessage: §11.3; DocResolver: §11.5
// @plat/export
interface Exporter<Opts> { id: string; write(doc: Document, list: DisplayList | null, opts: Opts): Promise<Uint8Array | string> }
  /* `id` a `Format` and `Opts` §11.2's `ExportOpts` (the members a format reads); runs in the generation worker (§11.1): list = the transient export list for SVG and for raster formats (a raster format transfers it to the tile worker with its
     raster-export request, §8.9, §11.1); null for model formats (GeoJSON, glTF / OBJ, CityJSON, CSV, the document forms) */
// @plat/testkit — Baseline, ParityReport, FtgSize: §13.5; ShiftRecord, CascadeRecord, MilestoneRecord, WaterSetting: §13.3; D5Record, D5Pair, FtgCapture: §13.6 (its `H32` is `@plat/model`'s);
//                 CorpusAdapter, CalibrationRun: §13.9; the dossier fixtures' manifest (DossierFixtureRow) and B-DOSSIER-lite: §13.2;
//                 MetricDef, MeasureInput, SeedFamily, CalibrationEntry, NullModelSpec, StatBarSpec, PanelSpec, ReconciliationRecord, KnownCityFixture, StructureCheck, NoOpPin: V12 §2
// @plat/clerk — ClerkBackend (the extension point of its model backend): V10 §2.11
```

**The dossier port (items 73–88; owner: "it is one directional"; J86).** The port is the one producer of dossier facts
on the map: §11.4's door 1 receives its blueprint and creation prefix, door 2 its events and epochs, and no door opens
the other way (door 1 closed to the host's simulator, J86, §11.4). Its parts:

1. **Two halves and the wiring** (J-A73.03). *Digest and creation* are the base's from M1, exercised test-side only by
   B-DOSSIER-lite on the frozen fixtures (§13.2, items 83–84); *absorb* lands at M3a with §7.7's dossier contract; the
   wiring to a live host bridge is M-SF (volume 8). The first adapter is `adapters/sf/fp-integration-2026-09-23/`, pinned
   at SettlementForge commit `5d699cc68` (owner, J86 Q1; J-A73.01); a later SettlementForge line is one more adapter
   folder with its manifest and a re-cut of the fixtures by the same scripts — a registration, never a rewrite.
2. **`digest`** normalises one whole dossier — SettlementForge sends whole dossiers, never a change list — by the adapter
   `AdapterRegistry.select` picks (V08 §2.4). Its first act is the ONE-WAY SEED (item 85 (a); J-A85.01):
   `settlement.seed = H32("plat:sf-seed" ‖ the dossier's seed)` — an empty or unreadable seed read as the settlement key
   (V08 §2.4) — (§13.6's `H32`, from `@plat/model`), written into the
   recipe once at creation; the host's own seed never enters a document, a digest, a link or an export (§6.2); the
   protection is that the host's seed is never stored — `H32` is a 32-bit digest, not a cryptographic one-way function,
   so the host keeps its own seed secret as it already does. It then applies §7.7's key law and class rule (item 12, row
   DR24) — a kind without a class row falls to its category's generic class, noted `unmapped_kind`, a word without a
   table row `unmapped_word`, two records of one key `duplicate_key` —, resolves each power's controlled institutions
   through the line's stable part, and drops every key of §7.7 item 1's never-read list into `ignored` with an
   `ignored_key` note. `select` refuses a dossier that lacks a required key of every registered adapter — no dossier of
   any registered line, a hand-made teaching file among them — `E_UNKNOWN_SHAPE`, and one that holds every required key
   of a line but no registered adapter accepts `E_LINE_UNSUPPORTED` (V08 §2.4).
3. **`creation`** derives the blueprint (§4.2 S0) and the creation prefix — one `assign` per institution record, with
   `existence: 'dossier'`, `creation` and `EditBase.dossier` set — together with the binding and the carried facts, by
   §7.7's derivation table (item 10): the population chooses the rung, the wealth word the wealth level, the access,
   walls and threat rows the gates, walls and defence, the typed slices the trade partners, the sector shares and the
   power standings (§7.7 layer 2). A population outside every registered product's range is refused
   `E_RUNG_UNAVAILABLE` by §1.1's rule — below 1 500 naming the village product while none is registered, above the
   120 000 cap naming the cap (§7.7 item 15; J-A81.01).
4. **`absorb`** diffs the incoming digest against `Document.dossier.carried` by binding key — the map's own carried facts
   are the previous dossier, so no host history is needed — into one `DossierChange` per changed element (§7.7 item 13),
   dates each by §4.11 *The clock* (2)'s rungs (a tick on the change's receipt, then its outcome id's week suffix; an
   undated change applies finished, noted `unreceipted_change`), groups them by §4.11's cadence into standalone dossier events and `EpochInputs`, re-binds only
   on a receipt of §7.7's key-law table (else `rename_without_receipt`: a removal plus an addition), and returns its
   `PortReport`; a dossier that equals an earlier absorbed state is converged forward, never rewound
   (`state_matches_absorbed`, §7.7 item 5; item 87). The events enter through door 2 as `doc.apply` with `author: 'host'`.
   A digest whose population lies outside the ladder is refused as `creation` refuses it (item 3), a digest of another
   settlement `E_OTHER_SETTLEMENT` (never for an offer whose `id` fell back, nor against a key minted at the document's
   creation, which a later readable `id` is not checked against; §7.7 item 12, V08 §2.4), and nothing is absorbed (§1.1;
   J-A81.01).
5. **`HostContext`** is optional in every field (item 20 (h) (iv)) and carries no data input: the dossier is the port's
   only one (item 125 (a); J139), and no field of the three changes a document a dossier makes (T125-2). `audience`
   is the role and knowledge key the host sets per viewer by the table below — view state that travels (§11.3;
   J-A30.82); `displayNames` — dossier key → text — are applied inside ONE export request (§11.2's `ExportOpts.displayNames`) and never stored, the document
   keeping the dossier's names (item 85 (b); J-A85.02); `line` is checked against the dossier's own
   selection (V08 §2.4), never chosen from — a `line` no adapter supports, or one the stamps contradict, refuses with
   `E_LINE_UNSUPPORTED`. The week, the realm and a custom library are never host inputs: the week is the dossier's
   latest stamped tick (§4.11 *The clock* (1)), a realm fact the generator's default or the user's setting (§7.7's DR1,
   DR3, DR19, DR29), and a custom definition reaches the map only from the dossier's own `customContentRoster` and
   `customContentProvenance` entries (§7.7 item 1; V08 §2.8).
6. **The audience table** (item 85 (f); J-A85.03) is host glue in this package, never a model rule — the module's roles
   stay §11.3's and a viewer never raises its own knowledge tier (J-A30.82); it and the per-export display names are
   built at M3a, their use with a live host at M-SF:

| the host's audience | role (§11.3) | knowledge key (§9.2) | what it may receive |
|---|---|---|---|
| the game master | `owner` | `secret` | the document, every export |
| a co-game-master | `editor` | `secret` | the document, every export |
| a player | none — no document, no dossier, no session | the party key: `MapRecord.party`'s tier, raised place by place as the host records what the party learns | the stored party picture set and party gazetteer only, made by an editing session or the refresh frame under the party key (V08 §3.14; §11.1 *Knowledge*) |
| an anonymous or gallery viewer | none (no session) | `public` | picture exports (PNG, SVG, print) only |
| a full share by the game master | none (no session) | `secret` | picture exports only — never the document |

7. **The dossier row sets** `tables/dossier/*` in `@plat/tables` — `tiers`, `site`, `access`, `threat`, `deposits`,
   `quarters`, `landmarks`, `distribution`, `kinds`, `status`, `wealth`, `sectors` (the income categories' sector rows;
   the sector set itself is §10.2's `RosterTables.sectors`), `government`, `powers`, `conditions`, `calendar` (the
   `sf445` year: 52 weeks, 13-week seasons from spring), `receipts`, `derivation`, `tags`, `categories`, `crime`,
   `cultures`, `archetypes`, `categorySynonyms`, `keywords`, `relations`, `historyScars`, `magic`, `era`, `materials`,
   `customWeights`, `isolation`, `chainStatus`, `dependencySeverity`, `calamitySeverity`, `qualifiers`, `threats`,
   `ruinEvidence`, `ladders` (`LadderStepRow`, V11 §2.6, carrying `identity`) and `goodWords` — are versioned tables like
   every other (§7.6), provenance `own`, the SettlementForge line named in each table's header and SettlementForge's own
   words in the left column; §7.7 states the rules that read them; V08 §2.6 writes the default rows of every set
   §7.7 does not; the shapes of `kinds`, `archetypes`, `categorySynonyms` and `keywords` are volume 8's (the `archetypes`
   row's optional `village` cell typed by V11 §2.8), the shapes of `ladders` and `goodWords`, and the rows of all
   six, volume 11's (V11 §3.11–V11 §3.13); `dossier.catalogue`'s `ladderPairs` is volume 8's committed data (V11 §3.1 row 77).
   The inert-export bar is §11.1's and the bridge's reply correlation, source-window check and before-`ready` queue are
   §11.3's (item 85 (c)–(e)).

**The authoring surfaces and the clerk (item 101; owner: "an elegant set of tools for both an ai clerk and a user where
a dedicated user can build it or emulate it"; J-A101.02).** The three surfaces of §7.1's toolkit — the canvas tools of
`@plat/app` (below), the clerk's tool API (`@plat/api`, over §11.2's facade) and the skeleton file (`@plat/export`, and
§11.1's import as the log's creation prefix, §7.7) — emit the same events; no surface has a declaration the others lack.
A **clerk** is any program that drives the map through the tool API alone. In the SettlementForge module the clerk is
SettlementForge's own assistant, driving the tool API through the host seam (configuration C, volume 10; J122 V10 Q2);
the built-in clerk (volume 10) ships at M3c and runs only where the deployment's configuration enables it; the
provider, the model tier and the key path are configuration inputs read from SettlementForge's AI setup, never decided
by this design (J121). Its four roles are calls of §11.2's API: it READS through `query` and explains any element through
the oracle, `query({ kind: 'why' })` — the rule, the inputs and the alternatives read from the element's provenance and
derivation record; it AUTHORS by trying declarations on a scratch document and showing their `preview` on the user's
map — nothing committed — each shown to the user as a ghost (`live.ghost`, §8.2) with its one-line reason and up to
three variations where the rules give real alternatives, and committed only when the user accepts, as an `edit`
carrying `proposedBy: 'clerk'` with the user as its author (§7.1); it CRITIQUES a skeleton ahead of its application by
previewing it as a creation prefix and reporting the dry run's refusals and bends, the requested features the
generation report counts below full delivery (§5.4) and each declared quarter whose placed classes do not meet its
kind's identity row (§4.5) — a temple quarter without a temple, a harbour quarter without a quay, a quarter without road
access (a declared road through a declared wall is no finding: S7's operator makes the gate, §7.3); and it ITERATES on
instructions as further declarations. Its limits are the module's, not the clerk's courtesy: every call passes the dry
run and the undo as the canvas's do; a declaration that would contradict a dossier fact is refused `dossier-owned`
(§7.7 item 11), so no clerk invents or writes one; every read is filtered by the caller's knowledge key (§9.2, §11.2), so
a clerk reads only what its viewer may know; the API carries declarations and reads, never an image, so a clerk never
draws pixels; it receives no dossier prose (the port line carries none, V10 J-V10.31). The built-in clerk is opt-in and
labelled as AI in its drawer.

**`@plat/app`, the reference UI.** One click; the basic panel (≤ 12 controls, §7.8) and the advanced panel; the report
panel; the authoring tools — §7.1's twelve, each over the editing events, with the interactions and the contract below;
the history panel with restore points, "Go back to here" and "Open a copy from here", and the orphans list; the fates
sheet; the export dialog and the share sheet; settings; the local store with autosave and crash recovery (the file
`DocResolver`, §11.5); the clerk drawer; the tables editor and the style dialog; the ruler (§9.5); the gazetteer and the
"features in view" list, both withholding the names and purposes of local and secret places the viewer's knowledge key
does not hold (§9.2, §11.2); context help; the family-tree view (module); the timeline bar and the history panel's
chronicle (V06 §5.1). The application at build depth is volume 9 (`docs/volumes/V09-application.md`), one shell for
the standalone entry and the host entry (`embed.html`), installable and usable offline.

* **The authoring tools as interactions (item 101 (g), (i); J-A101.01).** Each tool is one declaration kind with one
  dry run and one undo (§7.1); its gesture yields a ghost — the dry run's `preview` (§11.2), drawn as `live.ghost` (§8.2) — with
  its handles and counts before commit, and its first-use hint closes once the user has made the gesture:

| tool (layer) | gesture | live feedback | preview and undo | first-use hint |
|---|---|---|---|---|
| T1 `intend` (L0 intent) | pick a site card and a size; drag the wealth slider and pick the walls chip (none · one ring · two rings) (§7.8's basic panel); the time card: advance N years by a shape (V06 §4.1) | the whole town regenerates under the hand within §12's budget | each change one undo step | "Change anything: click it." |
| T2 `ground` (L1 ground and bones) | brush strokes (raise, lower, cliff, flatten); a coast or a river drawn as a knotted curve, a river by its source and mouth; a lake by one point and a level, with a spring flag for an oasis (item 111); a harbour by a sea level, one shore point and a basin size (§7.1's points form) | terrain shades and water reflows live; roads and plots on the stroke re-derive on release | ghost, then commit; handles on knots, level and rim | "Paint hills; drag the river." |
| T3 `wall` (L1 ground and bones) | two or more points, or a drawn line; it snaps to crests, road crossings and natural barriers (item 106 (g)) and closes when its ends meet; its `retaining` kind draws a retaining wall (item 110 (a)) | towers and gates appear as ghosts at the crossings; the enclosed quarters tint | commit on release; gates are grips that slide | "Roads through the wall become gates." |
| T4 `road` (L1 ground and bones) | two points, or a drawn line, with a class from a short ring of chips (main, street, lane, pier, bridge) and a `raised` flag (item 110 (b)) | magnetism to roads and gates; a road over water shows a bridge ghost | commit on release | "Drag a road; it snaps." |
| T5 `quarter` (L1 ground and bones) | a kind card, then one seed point, two to four far-edge points, a lasso or a brush; a name | the area tints; the count badge shows the plots, households and buildings it will hold at its band, with plus and minus | ghost with counts and four to eight corner handles, then commit; the handles stay | "Paint a district, pick what it is." |
| T6 `place` (L2 programme) | drop a class stamp on a spot, a quarter or a road, or type a locus; name it | a ghost footprint at the best lawful site with a one-line reason; the alternatives faint | accept or nudge; one undo step | "Drop a tavern near the gate." |
| T7 `roster` (L2 programme) | paste or dictate a list of places | the map fills with ghost sites in one pass; the lines the rules cannot honour listed with their nearest options | accept all, or card by card | "Paste your list of places." |
| T8 `fill` (L3 fabric) | brush a density or a class mix over a quarter or a block | buildings re-derive under the brush; three variations in a tray and one density dial | reroll without limit; accept one | "Denser here; more gardens there." |
| T9 `shape` (L3 fabric) | click into a plot or a building: split, join, drag corners, set storeys, move the door | the site plan re-derives live inside the plot only | one undo step | shown only after a click: "Shape this one." |
| T10 `hold` (L3 fabric) | a lock on any thing, a pin on any placed thing; "keep this, re-roll the rest" on a lasso | locked and declared things dim under the reroll brush; a fates list shows what would move | one undo step | "Lock what you love." |
| T11 `name` (L4 finish) | click a label to rename it, drag it to move it; group quarters under a region name; the leader-line switch (§9.4) | labels re-flow around the change | one undo step | "Names are yours." |
| T12 `dress` (L4 finish) | a style card; the quarter tint; compass, scale bar and cartouche from a tray; an image under the map to trace (§9.5's underlay) | the map restyles live | one undo step | "Make it yours; export." |
| the clerk | a chat drawer beside the map | every reply that changes the map is a ghost with up to three variations where the rules give real alternatives (V10 §3.11) and accept / try again; "why?" on any element answers from the rules | nothing applies silently | "Ask for a walled harbour town with a temple quarter." |

* **The interaction contract (item 101 (f) as corrected by (f′); R1–R19).** The rules the reference UI keeps; their
  evidence is the breadth survey `research/ux/tool-survey.md`, and only the rules are stated here:
  R1 one gesture, one visible consequence, at once — a ghost while the hand moves, the real thing on release, never a
  dialog first; R2 no wrong answers — a declaration is bent to the nearest lawful one and the bend named in one line,
  and refused only against a dossier fact or a lock, always with the closest alternatives (§7.1); R3 preview the
  derived, adjust after — the ghost shows what a declaration will hold and what moves, and everything stays resizable,
  movable and re-rollable after commit; R4 paint, do not parametrise — areas are brushes and lassos with named presets,
  numbers behind "more", and lengths, areas and counts shown while drawing (R17 folded here and into R14); R5
  variations, one dial, reroll — three variations per derived fill, one density dial, every re-roll scoped ("this
  block", "this quarter", "trees only"; §7.3), an unscoped new city only the empty state's action; R6 layers the user
  never manages — draw order is §8.2's semantic order; R7 start from a finished town — the empty state is a generated
  town and the words "change anything"; R8 direct manipulation, no command grammar — pick and act in one motion; R9
  progressive depth — the first screen holds `intend`, `quarter`, `place` and `dress`, while `shape` and `hold` appear
  when a thing is clicked into; R10 the clerk speaks in previews (above); R11 undo is total and cheap, and no action is
  labelled "cannot be undone" (§7.4); R12 learn by doing — no manual needed, one-time first-use hints, tooltips on
  hover; R13 declared means held — what the author declared is pinned by its declaring event and no re-roll moves it
  (§7.2), the fates list saying so; R14 the count badge — every area declaration (quarter, fill, roster) previews its
  plots, households and buildings, with plus and minus; R15 never lose work — every declaration is in the log at once
  (the log is the document, §2.9), the history panel restores any earlier log position by logged undo events (§7.4),
  and the skeleton exports and re-opens at any time; R16 everything derived has a handle and move is first-class, singly
  and in groups (`moveFootprint`, `moveVertex`, `moveLabel`, instance moves, a multi-select move over any scope); R18
  hand off data, not a picture — a virtual-tabletop user gets one file, walled, lit and on the grid (§11.1); R19 the
  clerk is optional, labelled as AI and preview-first, never draws pixels, and every export carries which elements were
  declared, derived by rule or proposed by a clerk (§11.1). The three questions the survey could not answer from the references
  are answered by §13.4's first-five-minutes test, each with its pre-decided fallback (J-A101.03).
* **Input scheme** — MFCG's idiom kept and stated, held in `keymap.json` (data, editable, versioned like every table).
  Pointer: *click* selects and opens the context panel; *double-click* zooms to the entity's band (a district fills the
  view — MFCG's district view); *shift+click* is New random on the entity's scope, keeping its kind (MFCG's ward reroll);
  *ctrl / cmd+click* resets the entity to generated (one logged event that applies the inverses of the entity's own
  edits); *alt+click* toggles its lock; right-click or long-press opens the context actions (§7.4); dragging a selected
  vertex is `moveVertex`; wheel or pinch zooms; dragging empty map pans. Keys while the map has focus: **A** alleys at
  the city band, **B** buildings shown / hidden, **D** grid, **N** hairline mode, **L** labels, **T** trees, **M** ruler,
  **W** warp tool (then **1–8** choose the kernel), **G** gazetteer, **F** features in view, **R** New random on the
  selection, **Esc** cancel, **ctrl / cmd+Z** undo, **ctrl / cmd+shift+Z** redo, **+ / −** zoom, **0** fit, **?** the
  keymap overlay. V09 §4.13 adds the tool keys 1–9 (T1–T9, outside a warp session), alt+Enter (lock), F2 (rename),
  S (dress), Enter (accept), [ and ] (variations), Tab (handles), Delete (delete, or "not here" for a dossier element), H
  (history), E (export), ctrl / cmd+S (download a copy), ctrl / cmd+O (open), Space (pan) and X (the assistant).
  **PageUp / PageDown**: with a building's plan open (its storey switcher shown) they step the storey (V03 §4.5);
  otherwise, with the underground layer active, they step the depth band (V04 §5.1); otherwise nothing. Bindings are
  active only while the map region has focus; an embedding host can switch global bindings off; every bound action is
  also on a menu or a button.
* **Accessibility** — the app's chrome (panels, dialogs, menus, toolbars, the report, the gazetteer, the tables editor)
  meets WCAG 2.2 level AA. Landmarks: header (title and seed), navigation (panels), main (the map region,
  `role="application"` with an accessible name and a live description of the view — rung, band, the district under the
  pointer or the focused entity), complementary (report, gazetteer). Every control's accessible name and description
  come from the control registry (its label and documentation anchor); every icon button has a text label. Every action
  is reachable by keyboard in a focus order that follows the layout, with visible focus and no keyboard trap; the map
  region takes arrow-key panning and **+ / −** zoom; every authoring gesture has a keyboard form — a points form's points
  placed at the focus with the arrow keys and Enter, handles cycled with Tab, a brush applied to the focused entity's
  scope. **The non-visual route to the map** is the gazetteer (list and search over districts, quarters, streets,
  buildings, institutions and pinned people through `query`) and the "features in view" list (the entities whose marks
  are visible, grouped by kind, ordered by distance from the view centre, each announcing its name, kind and district);
  selecting in either list selects on the map and the reverse. UI text contrast ≥ 4.5 : 1 and UI components ≥ 3 : 1 (the
  map follows §8.2's contrast matrix); the reduced-motion preference turns off animated zoom; the UI scales 100–200 %
  without loss. The interface languages follow SettlementForge's (J121); the message catalogue is keyed per locale.
  Tests: §13.4.
* **Context help and the guide** — every control and panel carries a help link to its anchor in `@plat/docs` (§7.8's
  documentation anchor), opened in a side panel. The guide's reference pages are generated from the control registry
  (label, range, unit, output metric, consuming stage, locality class), the entity registry and the table schemas
  (columns, units, provenance); written pages cover getting started, each panel, each edit action, each export and the
  tables editor. Release notes are generated per release from the shift records (§13.3) and `known-defects.json` (id,
  symptom, affected rungs and presets, workaround, since, fixed-in). Tests: §13.2.
* **Family-tree view** (module tier, M4b) — reads `query(h, { kind: 'relations', person, up: n, down: m })` over the
  relation store (§10.3): generations in rows by birth epoch, partners side by side and children below; branches beyond
  two generations elided into a count that expands on click; re-root on any person; opening a person never pins it
  (§10.3); keyboard-operable as a tree grid.

**Extension points, each with its implementer:** every `Map` in `StrategyRegistry` — stage 2's template fabrics
and its S7c and S9b hook registrations (volume 1); the village product's `ProductDecl`, its `tracker` `NetworkStrategy`, `palisade` `EnceinteStrategy`, density
`StageDecl`, `village-ways` `FabricStrategy`, `toft` `PlotStrategy` and `course-first` `RiverStrategy` (volume 7); the
sky layer's `SkyStrategy` (volume 5); the underground's `SewerStrategy`, `UndergroundStrategy`,
`UndergroundSystemStrategy`, `AccessPassStrategy` (U-ACCESS), `UndercityStrategy` and `UndergroundLinkStrategy` (volume
4); the evolution engine's
`'history'` `EvolutionStrategy` with its phases and participants (volume 6; the base's `'grow-by-stage'`); the
`BuildingGenerator` (stage 3's `outline` / `compose`, volume 2; its `plan` step's default implementation the base's,
the plan rung volume 3); `StageDecl` registration by declared inputs and outputs; the `PaintProgram` and `StyleSheet` registries;
the `LiveLayerProvider` registry, whose registrations and what each draws §8.2 lists — `@plat/render`'s shipped
providers (`live.shade`, `live.links` and `live.voids`, the last reading volume 1's `districtsAbove`, and the base
layers `live.festival` and `live.crises`, the latter reading volume 1's `campLand` and `disasterDistricts`), volume 9's
`live.find` at M5 — Find's marks and Show gaps, the Coverage view's one successor, reading §11.2's match listing and
volume 1's `findAreas`, `gapUnits` and `catchmentOf` (item 120 (i)) —, `live.history` volume 6's at M6-E and `live.people` the simulation module's
(§10.3); `Exporter`s; rule tables, presets, rung profiles, setting packs and keymaps (data);
`EditEvent` kinds with migrations; `LayerSpec`s; `ContentProvider` (a third party's rosters, after the double-run check;
no volume implements one — §13.2's fixture provider exercises it); `BridgeTransport` and `DocResolver` (the host client,
volume 8); the `PlacementSolver` and the `DesignationMutator` (§4.7 S10b, S11); `CorpusAdapter` (§13.9; implemented
research-side by volume 12); an adapter folder per SettlementForge product line in `@plat/port` (volume 8); the light
rules and the sugar expansion table (data); `ClerkBackend` (V10 §2.11); and any clerk, through the tool API
(§11.2) — SettlementForge's assistant or the built-in one.
=== END ===

=== REPLACE ## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2 ===
## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

*In plain words.* Before building anything we measure what we still need from the recordings and take a few small new
ones (FTG towns at two sizes, MFCG towns at ten seeds per size), then build the riskiest pieces first as short spikes
with pass/fail numbers: the geometry kernel, the bent cut, the fused street layout with its speed gate, and the
determinism machinery. The first real milestone (M1) is a town the owner can look at next to MFCG and FTG. Because the
owner ranks editability first, editing comes next (M2a), before the second look and the rest of parity (M2b). Then full
editing and the API (M3a), the exports and the should-have extras (M3b), hardening (M4), the simulation module (M4b)
and stage 2 (M5). The design volumes' milestones follow in the order the owner's delegation fixed (J122): the village's
tracker spike right after M0, the built-in clerk beside M3b, and after M4 four streams side by side. Effort is stated
honestly as a range with its basis, and computed once here: two totals, the base with stage 2 and the whole program.

Person-weeks are expert estimates (PLAUSIBLE) for two implementers plus a verifier seat — about 115–158 calendar weeks
for the base with stage 2 at that staffing; staffing per the owner (architecture and rulings on Fable seats; build,
verify and measure on Opus seats). Every milestone ends on executed evidence, never on intention, and every exit writes
its `MilestoneRecord` with the milestone's declared shifts and fails on an undeclared one (§13.3). **The owner's panel
at every gating exit:** M2b ("the base at parity"), M4 ("mastered"), M5 (the stage-2 gate) and M6 (the stage-3 gate)
claim their D-5 verdict only by a rated pass of §13.6's protocol or by the owner's acceptance recorded in the
`D5Record`; the sittings and an unrated panel follow §13.6 (1) and (7). A milestone's bars are the ones §13.8's
schedule gives it, its volumes' bars are their §7's at the steps their §8 names, and a milestone that lands a
calibratable column exits with `plat calibrate register --check` green over it (V12 §3.11).

| milestone | content | exit criteria (executed, not asserted) | est. |
|---|---|---|---|
| **M-1 — calibration and the clean-room inputs** | `docs/CONFIDENCE.md` §6 **#5** FTG face recovery (block sizes inside rings, dividing-road position vs OBB, plot depth and frontage, FTG's plot share of land) and **#10** NG adjacent-footprint pairing; **#2** the NG size sweep; the NG baselines of `docs/IMPROVEMENTS.md` §7.2 (detour index, 4-way share, cycles per km², plot minimum-width distribution, streetwall gap per 100 m); NG's hollow-block frequency and MFCG's inner-lot removal; **the MFCG sweep at ten seeds per matched size by the capture plan's formula (V12 §3.2.1)** (40 / 80 / 130, plain options, plus a river-and-coast variant) with lot-orientation coherence, wall alignment, walled and ribbon shares, district areas, gates, towers, castle and plaza, and every ⟨M-1⟩ number of §13.5 — streetwall continuity on dense frontages, lots per block, T / Y share, intramural dead ends, blocks per ha, inner-lot removal and street-edge recoverability on its plain renders (the metric of §8.5, implemented research-side and cross-checked against the product's implementation on M1's golden renders within 0.01); **FTG captures at BIG_TOWN and BIG_CITY**, three of each — one with FTG's water options nearest to `none` and two nearest to `coast+river`, each capture's id (its folder name), `WaterSetting` and recorded population (the residents its decoded payload holds) recorded in its README for §13.6 (2)'s pairs — over six days on the free daily allowance, decoded with the existing tools; outline anisotropy and turning per 100 m after 10 m resampling on every FTG payload; NG block counts per template at `medium` from the vertex captures; the variety dispersions of MFCG and FTG; **`baselines.json`** generated research-side with `referenceBuild` on every row and committed into `plat/`; **the sanitised implementer digest**, written by one seat and checked by another; the hashed content deny-list; `CLEAN-ROOM.md`'s seat ledger (§17.1); the plot-depth rows and the regimes' block-depth minimums behind §4.6 step 1's per-face stop threshold re-fitted under that reading on NG's vertex captures and the MFCG sweep before any block band is signed (item 34; J-A34.01); volume 12's rig share (V12 §8) | every §13.5 baseline row present with its provenance — or, for an ⟨M-1⟩ number M-1 could not measure, the row made descriptive and entered in `known-defects.json` by §13.5's ⟨M-1⟩ rule — and every band computed by the band rule; a `docs/calibration/` record per experiment; FTG's six captures decoded, each with its resident count or §13.6 (2)'s nominal fallback, marked; the digest checker's report shows 0 code excerpts, 0 reference word lists, palettes or tables and 0 deny-list hits; the re-fitted depth rows recorded with provenance "M-1 ⟨date⟩" | 2.5–4 pw |
| **M0 — kernel, bent cut, fusion, determinism and site spikes** (risk retirement) | (a) `@plat/kernel`: lattice, predicates, one arena per layer with the levels as views, role and owner tables and reference resolution, attraction and contact semantics, batched transactions with stage-end index partitions, booleans / buffers / bands on the arrangement with the CI oracles, OBB / LIR, snap rounding, the straight skeleton with its validator and exact OBB roofs; (b) the **bent-cut transaction** with the hole slit — §4.6's restatement of NG 1.2.2's mechanism (items 34–40) — calibrated on NG's vertex captures after NG's signature is re-measured on curved, round-joined, triangular, C-shaped and holed faces: its comparison with NG's distributions on the same faces is the check of the adopted corner-first rule (the far-side fallback no longer exists), and `cut.flattenM` is calibrated there (J-A37.01); (c) the **fused-layout spike**: S4 routing + S5 growth + S8 infill on a flat synthetic site at CITY face counts; (d) the **determinism spike**: structured stream keys, lineage-hash minting, the Merkle digest, `dmath`, the time-dilation shim, the allowlist lint with its vendored scan; (e) the **site-and-fields spike**: S1 + S4 + S6 with §12.4's mechanisms; (f) the CI tiers timed on the runner (§13.8) | (a) B-FUZZ 0 crashes / hangs / invalid outputs on 10⁶ random inputs per primitive and on the whole constructive set (§13.1); insert + snap + attract + re-walk ≤ 8 µs per proposal, or §3.7's miss rule applied before M1; S11's geometry share ≤ 3 µs per plot median; §3.7's bars (i)–(ii) and §3.8's bar, with their pre-decided fallbacks applied before M1 if a bar fails; op-order determinism (§13.2); (b) σ — a measured output of step 2's position law, read in the frame NG's was measured in — within ± 0.02 of 0.066 (plain faces) and 0.098 (ring faces), corner within 0.10 of mid-course on ≥ 80 %, arrival ≥ 85° on ≥ 95 %, the fillet share within ± 0.05 of NG's (§13.5), block-area and cut-length KS by the band rule, and the item-34–41 bars §13.8's schedule gives M0 (b) — on curved, round-joined, triangular, C-shaped and holed faces; (c) **the fusion gate**: S4 + S5 + S8 ≤ 100 ms at CITY, block-area and junction-degree distributions inside the NG bands on the same district shapes and the MFCG street-signature rows of §13.5, no turn cliff, 0 whole-map restarts on 1 000 seeds — if it fails, §4.4's fallback applies before M1; (d) digests identical on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, 100 seeds; every stream key distinct; ≤ 0.1 µs per structured key; digest maintenance ≤ 5 % of stage time and a full recompute ≤ 150 ms at CITY; (e) S1 + S4 + S6 ≤ 50 ms at CITY, or §12.4's coarsening fallback applied and re-measured; (f) each CI tier inside its budget, or §13.8's fallback applied | 9–12 pw |
| **M1 — a viewable MFCG/FTG-class town** (the first product milestone) | S0–S11 with row / detached / hovel site plans and heights (compounds in M2b), at all three rungs (§1.1: METROPOLIS is in the goldens, B-CITY, the determinism tests and the diagnostic panel; M2b measures and tunes it); S3 reservations and gate sites; S5 with each trace before its stage's growth; S7 walls / gates / towers / castle; the eager allocation; S13a names with the quarter merge tree (quarter labels at the city band, district names at the district band); the `ink` preset at the city and district bands on the Canvas2D tile pyramid (its close-up and building bands at M2b); SVG / PNG export; **the `.plat` writer and reader for generated towns** (§2.9, §3.9) — the manifest, the content-addressed chunks with §3.9's geometry layout, gzip compression and an empty log, the root check of a document of the running output version with its corrupt-cache regeneration (§2.9 steps 3 and 5), and §2.9 step 2's frozen view of a document of another output version (its `frozenImport` rebase with M3a's rebases); the records digest joins the snapshot at M2a (§2.9 step 5); permalinks marked *preview* (§13.3); the report panel with delivery tiers; the B-CITY harness in the PR and nightly tiers; **the output-version stamp, the shift, cascade and milestone records in `plat/goldens/`, and the stage-isolated golden tooling with the per-stop placement digests (§13.3)**; `SeamContract` on every district; the derivation pool; the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1 (O2, O6, O3, O11 schema + PNG / SVG, O1, O4, O5, O18 with a flat field, O17 basic, O8 basic, O12 ink, O16-core). **Named work items:** the M1 content, authored fresh — roster rows for the M1 classes, households, the naming grammar and word lists, the era table, the `ink` palette (≈ 3–4 pw of the estimate); the app shell — one click, basic panel, report, gazetteer and "features in view", the keymap, the accessibility contract, context-help skeleton (≈ 2–3 pw); the transient arena's open, read-back and release (§3.4), `RungProfile.layers` with `Features.sewers` resolved at S0 (§1.1, II.7.1), the emulation marker on every default cell and the parity presets `MFCG` / `FTG` (§7.6) (≈ 1 pw); `factTier` over the registry's dossier paths, the derivation table as an index and its totality bar (item 20 (h), §7.7); the geology flag's S0 draw and S1 resolution with the relief toggle's S0 pick (item 65; §4.2 S0, S1 (10); J-A65.49, J-A65.02), so `Terrain.geology` and the relief class are in the first golden, as `Features.sewers` is; the `ink` palette on the owner-opened corpus targets with its measurement code (item 69, §8.2); `@plat/port` in the tests only — the `DossierDigest`, one SettlementForge adapter for the line `fp-integration-2026-09-23` and the creation half, the binding table's shape and key law, the `tables/dossier/*` rows, the typed circumstance slices, `Institution.powers` and `Assignment.state` as schema, the one-way seed and the inert-export bar, the ignore-list, the refusal below 1 500 and above the cap — with the frozen dossier fixtures and B-DOSSIER-lite (items 73–86, §14, §7.7) (≈ 2.5–3 pw); the oasis and spring features at S0–S1 (item 111); §8.8's per-map zoom-out limit on the pyramid with §9.5's framing and the exports framed within it (item 116); §12's comfort-level timing at TOWN and CITY (item 119); volume 1's M1 schema — `Block.content`, `Block.overrides`, `HoodPlace`'s registry row, `DistrictContext`, `Recipe.product`, the three concerns' ids and the `S8.seed` stage id (file f item 345) — and the way-naming context's features in S13a with `hood.constants`' row (V01 §8.1; ≈ 0.5 pw inside the O9 line and the content line's naming grammar); volume 12's rig share — the metric registry and the calibration register with its lint (V12 §8; +1.75–2.25 pw) | the **D-5 protocol's first run** (diagnostic, §13.6) with its threshold panel; on B-CITY-lite (200 seeds × 4 water settings): 0 tier-6 omissions of requested features and degraded ≤ 5 %, plots with access 100 %, population ± 5 %; **the fusion gate re-run on B-CITY-lite's river, coast and relief configurations with the reordered stages** — pre-decided fallbacks: on time, §4.4's class-boundary move (growth stops at district-scale secondaries everywhere; lanes infill-only), then the CITY model budget re-declared at the measured p95 as a D-18 amendment for the owner's veto; on statistics, the infill band table gains a slope class (face mean slope < 5 %, 5–15 %, > 15 %) calibrated on NG's faces, and the gate re-runs; model within §12.3 at TOWN and CITY with the pool measurement (§12.3's pool rule and its pre-decided outcomes); the label-composition measurement (§8.9); the figure-ground metrics against MFCG's M-1 recoverability, contrast matrix, `ink` symbolisation census, label floors and counts and hairline fidelity (§8.3, §8.5, §9.4); B-ZOOM's role continuity across `ink`'s city → district switch; placement digests identical on Node x86 and in the nightly five-engine run; the walled share and extramural ribbon share in MFCG's band (§13.5); the between-seed dispersion against MFCG's and FTG's; the B-EDIT-lite identity fixtures (≥ 99.9 %); the document-size test (≤ 320 B per building at CITY) and the generated-town round trip — save → load → save byte-identical over the canonical form on B-CITY-lite's towns (§2.9); **a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message**; the control-continuity sweep; the parity report by the band rule; every district carries a complete `SeamContract`; the scripted tasks of §13.4 that M1 supports, keyboard-only included; the first-map, settle and re-raster runs at TOWN and CITY band bottom / default / top (§12.5); the model max clause at TOWN and CITY, judged on confirmed outliers (§12.3); the furniture and snap query round trip (§8.9); the sliced-raster census rows (§8.3); the pan-and-zoom run during an A2 export (§8.9, §12.7); the stamp-tile asset load (§8.10, §12.7); the stamp tiles' seam check (§8.3); the sliced-placement census row, and the export's placement stepped in class 4 during the pan-and-zoom export run (§8.3, §8.9); the pin-pass B-ZOOM fixture (§9.2); the harbour pick's measurement on B-CITY walled coastal seeds — p99 of harbour route ÷ the least-cost path with the wall ignored ≤ 1.5, and if it fails the detour guard becomes the default (§4.2 S3 (4), (7)); the SVG export's transient-list peak (§12.8); memory within §12.8's lines at TOWN and CITY on generated towns at pool sizes 0 and 3 (the load-verification case is M2a's); the font-feature test (§9.2); the SVG and PNG export budgets (§12.7); the bars §13.8's schedule gives M1, B-DOSSIER-lite green among them; the `ink` palette inside its corpus targets on the measurement render (§13.4, item 69) | 40.25–52.25 pw |
| **M2a — the editing core** (D-7: before the second preset) | the log and the one replay fold over M1's document format; locks and pins; scoped faithful regeneration; the named actions (Regenerate keep settings, Adjust with the fate report, New random, Same kind new seed); undo / redo as logged events with per-session stacks, the independence check and unshared truncation (§7.4); per-document sessions (§7.4); load verification over M1's reader with both mismatch choices (§2.9 steps 3–4) and, with the keep, §6.4's link rule (a rebased town offered as its `.plat` file); replay with S13a per event (§7.3); dry-run validation with conflicts returned as actions; `setAttr`, `delete`, `merge`, `split`, `join`; the app's selection, context panel, lock and the keymap's pointer idioms; B-EDIT at 10³ (PR) and 10⁴ (nightly) with the oracle once per sequence; item 101's T9 `shape` and T10 `hold` on the canvas with the dry-run report's ghost, count badge and variations (≈ 1–1.5 pw); item 126's layout — the wide and medium classes only, the medium layout held at its 600 × 480 minimum (§1.1; volume 9's AP2) | O9 (a), (b), (d); the oracle's (i)–(iii) green on 10⁴ sequences; a CITY district undo ≤ 30 ms; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to CITY (METROPOLIS joins at M2b, which measures it); "recover from a mistaken regenerate" in one undo; the verification reference mix within §12.6's V + 10 %; open-to-editable within T(B) at TOWN and CITY, and the corrupt-cache fixture — a snapshot with one moved footprint and an unchanged `model.digest` reported and loaded by replay, never verified (§2.9 step 3); the records-mismatch fixture and the §6.2 (iii) keep-and-save gating fixture (§13.2); **a `keptSnapshot`-rebased town's link refused, its `.plat` file offered (§6.4)**; on the reference 300-edit CITY document, an edit made 100 ms after the state becomes editable applies within its §12.6 cost + 10 ms with pool size ≥ 1 (§2.9 step 3); memory at CITY while that document is load-verified, with a district regeneration and a Re-derive from S3 applied during it, within §12.8's line at pool sizes 0 and 3 — or §12.8's fallbacks applied; the rebased-document size test — a CITY document rebased by keeping the saved town, after 20 edits, ≤ 1.25 × the unrebased document, or §2.9's block-group fallback applied; the pipeline session of item 101's first-five-minutes test (§13.4), recorded and not gating | 10–13.5 pw |
| **M2b — the base at parity** | the prosperity field with drivers and the brush; the full granularity law with the rung modifiers (§1.1) — joins, splits, alleys, back lanes, the deep-interior shares; S10b placement from the roster; compound site plans with the packer; roofs; S12 hinterland presets, greenery rules, outskirts and the suburb regime; harbour, bridges, canals; O13-core street names; O14-core; the bench statistics; **`lit` on Canvas2D at all four bands** with our procedural texture set (≈ 1 pw); **`ink`'s neighbourhood close-up and building band** with the roofs (§8.2); the relief tier; METROPOLIS measured and tuned, with the single-thread METROPOLIS measurement (§4.1), the compositor measurement (§8.9) and the projected-shadow budget measurement (§8.4). **Named work items:** the rest of the base content — the remaining roster classes, institutions, government and religion rows, the greenery and hinterland tables, the `lit` palette (≈ 4–6 pw); the designation templates with specialisation and the one placement solver at generation with its relation rules and supply edges (§4.7 S10b, S11), the generation fill (§4.7; J-A28.46) within §2.6's one household capacity, with the programme rows' `circulation` share and the `room` form's least area it reads at the poorest band (§10.2), the default band set with the shanty rule and its median-household band (§4.5), the entrance set and the basement decision (§2.6) with the entrance-tick rows (§8.2, §8.3), exposure, the hidden-share rows and passages with the arch-glyph rows (§4.6, §8.2, §8.3), the `states` rows (§8.2), N markets with the principal-market score (§4.2), FTG's hinterland order and modes with the fuel and wood rows (§4.9) (≈ 3–4 pw); a clandestine institution's front and hidden modes in the one solver, with the cover rows (item 63, §4.7); the day lighting model — the cursor sun, height-aware gradient shadows, the CPU reference light pass, its GPU accelerator and the fallback ladder — with `lit` (item 68, §8.4); informal clusters with derived tenure (item 70); the class mix inside a band (item 71); the district character, identities, the three dials and the band range with S12c, the step after S11 (item 72, §4.5); the dossier vocabulary's class rows beside the remaining base content (the port) (≈ 6–9.5 pw); the daylight driver (item 102), the siting rulebook's families, coverage and signature pairs (item 103), custom-content siting (item 104), the supply web (item 105), walls closed by natural barriers (item 106), balance and spacing (item 107) and the institution ladders' member counts (item 108), with their rows (volume 11's C2 file-g share for items 102, 103, 105 and 107, +1.0–2.0 pw, and C4a's wall rows for item 106, +0.5 pw; the ladders' rows are C4b's, with M-SF, V11 §8); the water pull, the prosperity water term and wells by yield (item 111); item 114's generation-time condition — §7.7's DR41 from the readiness and the wealth on `Enceinte.condition`'s runs with their materials (§2.7) — with §8.2's `worn` and `patched` state rows and their legend; item 115's rung ceiling in S10b's class mix with §10.2's ceiling table; §12's comfort-level timing at METROPOLIS and the cap with the budget register's check (item 119); volume 1's M2b pieces — `Way.slopeP95` with the way-surface rule (file f item 207), S7b's and S10a's hook points (item 323) and `squares.quota` (item 301) (V01 §8.1; ≈ 0.25 pw inside the content line); `R(s)` in *One capacity function* (V03 §8's PE, file f item 233; +0.25 pw); volume 12's rig share (+2–2.75 pw) | every must-have letter run on B-CITY (1 000 seeds) against its §13.5 or §13.7 band — no letter without a number; every §13.7 threshold due at M2b confirmed or its fallback applied, O19 (g) city-zoom greenery for `ink` and `lit` among them; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS; B-ZOOM role continuity across every band switch of `ink` and `lit`; O17 / O18 / O19 runs; roster placed 100 %; site plans ≤ 5 µs per plot median; 300 dpi export; ≥ 60 fps at 40 k buildings; METROPOLIS first-map runs at 30 000 / 50 000 / 120 000 people (§12.5); the pool rule, the model max clause and the export-time peak at METROPOLIS (§12.3, §12.8); the query round trip at METROPOLIS (§8.9); open-to-editable within T(B) and memory within §12.8's line at METROPOLIS (§2.9 step 3, §12.8); the moving-sun step budget (§8.4); the daylight term's budget per rung on B-CITY-lite (§12.4; §12.10's row R12-29); the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7); the `lit` export beside a moving `path` sun (§12.7); the METROPOLIS SVG budget (§12.7); the rung-profile orderings of §1.1; **the D-5 protocol passes** against MFCG (`ink`) and FTG (`lit`) at TOWN and CITY (METROPOLIS per D-31), or the owner's acceptance is recorded — unrated: *provisional — not rated*, and "the base at parity" is not claimed; the bars §13.8's schedule gives M2b; §13.7's item-24, item-30 and item-71 thresholds confirmed or their fallbacks applied; S10b's scoring measured on B-CITY-lite and, if its pooled p50 exceeds 53 ms, restated with §12.3's p50 column (§12.4, J-A16.81) | 45.75–61 pw |
| **M3a — full editing, migration and the API** | warp kernels with whole-step validation; drawn constraints and the "rebuild around my drawings" rebase; assignments and the placement solver; rule-table overrides, the preference layer and the tables editor; migration and upgrade as undoable events with their diff; rebase; **retention of output versions N−1 and N−2** (§6.4); the dependency audit with the locality oracle at full scale; B-EDIT 10⁵ in the milestone tier; the handle-based embedding API (§11.2); the host bridge and `DocResolver` (§11.3, §11.5); S1's water and terrain operators with re-sited crossings and exact re-basing (§7.3), the water operator in §4.11's order with course-knot edits (§7.3 (b)); point-anchored records under a warp (§7.4); the carve edit with §4.11's way rule and the kernel's clear regions (§3.3); the `packs` block and the pack and host-content link refusals (§2.9, §6.4); the naming-input re-draws on table, pack and upgrade edits (§6.3 case (4)) with their renames stored in the events and carried by `confirm`, the dormant naming record of a protected name and field slices; the version-pinned checks of a rebased base across an upgrade and of a frozen view; packs held by a saved redo stack and packs a new version stops shipping; GeoJSON; the app's drawing, warp, brush, assignment and tables-editor tools; assignments through the solver after generation, the designation mutator with its record and inverse, `Use` with hand relocation (§4.7, §4.11), the dossier contract — dossier-backed existence, rejection, positive placement, the disruption budget and report (§7.7) — the wealth-ladder edit kinds `relet`, `densify`, `thin` and fusion and splitting as least-disruption re-cuts (§7.1), `relet` reading the household capacity M2b builds, every edit that lowers a capacity re-homing its excess by §4.7's overflow pass inside the edit (§2.6), and a dossier household's housing re-provided in its district (§4.7), and the interior ladder's rows (§2.6), sealing and opening a passage and the terrain-water conversions applied by hand; the plan rung's base hooks — its records, its `elaborate` view key, its `plan.*` concerns, its events and rung re-rolls, the elaboration cache (§2.6 beside §2.8's record, §2.9's cache, §6.1's streams and §7.1's events); the knowledge filter, key and reader with the exports' withholding (§9.2, §11.1–§11.3), `report.changed` (§11.3) and `live.stale` (§8.2) (≈ 7–8 pw); a concealed use's parts filtered and withheld (item 63); the closure rule (§7.3 item 9) with its first base instance, a concealed front's missing concealed door (item 63); the "dossier-owned" refusal and item 20 (h)'s coherence rows; the port's absorb half — the diff against carried facts, `DossierChange`, the dating rungs, the receipt tables, re-binding on receipts, the epoch cadence, a host undo's convergence, `Assignment.state`'s behaviour, named-feature targets and the `notice` pin, bridge correlation, the SettlementForge iframe configuration, per-export display names and the audience table (item 85 (b), (d)–(f)), and item 88's staged records schema-complete and empty (§2.7) (items 74–88); item 101's T2 `ground` to T8 `fill` with the sugar events and the points forms, the skeleton file, the underlay and the clerk's tool API (≈ 4.5–7.5 pw); item 110's base parts — retaining walls, raised-way generation with its arena parts, stairs and ramps, deck plots and the revised deck invariant (items 110 (a)–(d); file f items 244–246, 290) — with volume 2's item-110 building part in the base outline builder: `massStepped` and the tier construction, `massOval`, stacked and solid wings, the building datum pass and deck buildings (V02 §8.5; 2–2.75 pw); the second known-city fixture (item 110 (e)); volume 3's eager plan facts — `Entrance.storey` and rule 4's non-derivation (file f item 241), the wall walk-out (file f item 242 (a)) and `basementDoor(b)` (0.5–0.75 pw); the oracle at depth (volume 10's C1: `WhyAnswer` with sections and the kinds' explainers, the solver's explanation with the placement order, the field's drivers, the `brief`, `entity`, `sites`, `measure`, `frame`, `rule` and `profile` reader kinds, filtered and multiple previews with their effects, created addresses, the raised-way outcome, and both known-city fixtures' scripted transcripts; 3.5–5.25 pw — C1 3.25–5 and the second transcript 0.25, item 531); item 110's rows (volume 11's C3b; 0.75–1.25 pw); volume 1's M3a pieces — `District.terrace` (file f item 211), `terraceState`, `stepProfile` (item 245), the bent cut's `levelledUnits` / `terracedEdges` declaration (item 506) and `hood.templates`' `stepped` row (V01 §8.1; ≈ 0.25 pw inside the O17 + O18 + O19 line's item-110 share); T2 `ground`'s spring flag (item 111); T3 `wall`'s repair with a material and `wearWall` (item 114); volume 12's rig share (1–1.75 pw) | O9 (c) faithfulness — Regenerate (keep settings) byte-identical, and §13.2's rank campaign for New random passing in the nightly tier (a failed campaign is re-run once with the next seed; a second failure is a regeneration defect, fixed before exit) — (e) and (f), the thirteen MFCG asks as scripted scenarios; §7.3 item 7 (v)'s coarse-edit assertions on B-EDIT's terrain and water sequences; the carve fixtures of §13.1–§13.2 (§3.3's clear regions), or §3.3's pre-decided fallback applied before exit; B-EDIT 0 planarity violations and 0 lost faces over 10⁵ sequences; O2 (c)'s carry-over rates, or §13.7's fallback; goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped; the bridge convergence test (a host and three headless clients, 1 000 interleaved random events — undo and redo from every client and one owner undo through a chain among them, and one forced load mismatch settled by an owner's keep of the saved town while two editors edit on the replayed town — one digest, 0 lost accepted events; §11.3, §2.9 step 4); the naming-input fixtures of §13.2, in a fresh and in a rebased document (§6.3 case (4)); a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them; a kept-and-rebased CITY document upgraded across a field-driver change opens editable and replays to the session's digest, and a frozen o(N−3) fixture shows no mismatch message; a document using a pack the new version stops shipping reopens after `from` leaves the window; GeoJSON loads in QGIS with districts; the GeoJSON with trees byte-identical on the five engines (§13.3); the warp cost measurement — a 150 m brush over a CITY core on B-CITY-lite seeds, Apply within §12.6's budget with §2.6's wing carry and check counted, or §12.6's pre-decided fallback (one check after the final step, F-REDERIVE for a failure) applied before exit; the bars §13.8's schedule gives M3a — item 101's elegance bars with both known-city fixtures authored three ways among them —; T-V10-8, T-V10-9, T-V10-10, T-V10-30, T-V10-36 and T-V10-41, and T101-6 (iii) on both fixtures; both four-task sessions of item 101's first-five-minutes test (§13.4), at the milestone's midpoint and its exit | 35.25–47.25 pw |
| **M3b — exports, forms and the should-have tiers** | VTT (Foundry-class scene JSON and dd2vtt, one scene per layer); glTF / OBJ; CityJSON; the CBOR twin with its decoder; S0–S4 proxy thumbnails; O10 intent expansion and the forms catalogue with its classifier; O13 full (path labels, addresses, the annotation layer and legend sheet); O14 full (rings, presets, wildness, feasibility); O16 full (drafts, discoverable export, the responsive editor); O12 extras (the low tier); the `@plat/docs` guide and generated release notes; three candidate `house` style sheets (D-1); the ink-family variants `parchment`, `bw-print` and `night` at all four bands (the `night` sheet's occupancy-driven window lights arrive with the module at M4b); random styles with the bounded repair (§8.2); the night view in every family, the placed lights by their rule table and the exports' lights (item 68); item 101's T11 `name` leader-line switch and region groups and T12 `dress` furniture, with every export's declared, derived and clerk-proposed provenance (≈ 2–2.5 pw); the season and festival looks of items 117 and 118 — §2.9's year position with its "follow SettlementForge" flag and the festival display, §8.2's season rows (autumn's covers, ice and its leads, the fields and gardens through the year, snow by climate, the view sun by week) and decoration rows by tier and band with their keyed placement, §10.2's climate season columns and the decoration and staging-keyword tables, §7.7's DR42 and DR43, the exports drawing and naming them and §12.5's re-skin budget (≈ 1.5–2.5 pw: the season look 1–1.5, the festival look 0.5–1), their dossier readings — the calendar week, the climate and `traditions` — with M-SF (V08 §8's SF4); item 114's condition and material in every export; item 122's crisis looks — §2.9's `crises` key and the crisis framing, §10.2's crisis table and placement over item 118's decoration engine with volume 1's `campLand` (≈ 0.25 pw, V01 §8.1), §7.7's DR44, §8.2's look rows, §8.8's ring of massed marks and the exports drawing them (≈ 0.75–1.25 pw), the closed map's rows and the dossier's reading with M-SF — the `disaster` look's units (§10.2's `neighbourhoods`) with volume 1's `disasterSource` and `disasterDistricts` at M5 (W10) — at the village rungs volume 7's `villageDisasterUnits` and `villageUnitPlots`, V-M3 (V07 §5.6 (8)) —, its ruined exterior with M6 (V02 §8.6) and its plan damage with volume 3's P4, and until each lands that part draws nothing (§10.2 *Crisis looks*); item 124's weather effects — §2.9's switch and spell, §6.1's session-seeded stream, §8.2's marks, §8.4's dimming, scattering and night halos, §8.8's effects layer and §12.5's frame budget (≈ 0.75–1.25 pw) | VTT import with no manual steps; every format validator green; scripted intent tasks 10 / 10; the forms classifier ≥ 90 %; six thumbnails < 1 s at TOWN; every scripted task of §13.4; monotonicity sweeps green at every rung; documentation coverage 100 %; B-ZOOM role continuity across every band switch of the ink-family variants; the random-style shipped-palette fallback ≤ 2 % of 10 000 draws per family (§8.2); the anchored CityJSON file validated with PLAT's extension, or the sidecar fallback taken and reported (§11.1); the bars §13.8's schedule gives M3b; item 68's exports' lights | 21–28.5 pw |
| **M4 — hardening and the incremental path** | the performance tiers and the low-end tier measured on the named device (§12.1); item 121's resolution adjuster — §8.8's Resolution ladder with its two steps below 1, the 4K live-view ceiling, the ultra tier with its calibration bar (§12.1), the live Auto loop and the composition that keeps labels, chrome and overlays at the device's pixel ratio, §8.4 (g)'s order and §12.8's memory per tier (≈ 0.75–1.25 pw); the table-provenance audit, every default cell's `ref:` source and every extension's `extension` marker included (§7.6, §17.1 (6); item 23); **the one incremental path: add a growth stage to an existing town** (surviving entities byte-identical, new entities on epoch components, wall → ring road as `retypeEdges`; §4.11, D-25); output version 1 fixed, ending the *preview* label; release notes naming known defects; **the D-5 protocol's "mastered" run**, with the owner's pick among the three `house` sheets (§13.6 (8)); the staged engines' hooks — the decline table, the salvage ledger and the dwell lag, the regrowth-first siting order on the grow path, the tunnel and island conversion kinds with the underground tools `drawTunnel` and `placeAccess` (§7.1), S7b (5)'s island count draw and sky allocations under II.6's supply law, the terrain-water kinds, the due mark and the wealth ladder table, the floor's attributes with their migration, the lapse of a rejection at an epoch and the relocation of a dossier-backed use inside an epoch (§4.11's *Dossier content across epochs*, J-A20.43) — with their hook tests (§4.11, II.6 and II.7, with the migration of §7.5) (≈ 2–3 pw); the underground layer's hooks — basement accesses with their state and knowledge, the systems' records and parts, their links, the undercity's rung bound and `raiseGrade` (items 64, 65), `addUndergroundAccess` with its closure generators (the basement's requested-mode ladder of §2.6 the first) and its staged-layer refusal (item 66; §7.3 item 9 (d)) —, the Works record, `WorksTable`, the week and the stage drawing rows applied by hand (item 67), the character's recomputation, renames past the hysteresis and the pressure at an epoch (item 72), the lapse past the roster tolerance and the rung read at each epoch (items 76, 81) (≈ 3.5–4.5 pw); volume 12's rig share (0.5–0.75 pw) | nightly cross-platform goldens green for two weeks; the epoch test (0 re-rolled survivors); a document with interleaved edits and two epochs replays to the session digest; the conversion test; the 20-epoch heap and document budgets (§13.2); METROPOLIS first map within §12.5's law at 30 000, 50 000 and 120 000 people; "mastered" claimed only when the D-5 protocol passes, rated, at all three rungs (METROPOLIS per D-31) or the owner's acceptance is recorded — unrated: M4 closes with "mastered" *provisional — not rated* and the panel offered again at M4b, M5 and every release; every table value replaceable with provenance; the bars §13.8's schedule gives M4, item 81's frame growth (T81-1) and §8.3's hand-lantern row on the underground layer's hook fixture (§8.4 (f); J-A68.92) among them; the extreme-growth memory measurement that selects §3.2 (9)'s frame-growth path (a TOWN grown to the METROPOLIS cap in one epoch against §12.8's METROPOLIS line) | 17.75–25.5 pw |
| **M4b — the content module `@plat/sim`** (after the relation store's schema, which is in the base from M1) | the relation store materialised (family units, relations, memberships); postings and re-matching; occupancy and schedules as a query; the calendar; factions with roles, goals and reconciliation; religions' meetings; events as templates; the economy and personality content of D-32 with its authored tables; the family-tree view | O7's module letters (§15.2); one hour for 50 000 people ≤ 50 ms (§12.7); a scoped regeneration changes 0 relations outside its scope; the family-tree view keyboard-operable and pins nothing | 8–14 pw |
| **M5 — stage 2: neighbourhood composition** (V01 §8) | `@plat/hood` (V01 §8.2's work items): TemplateFabric over the four NG templates and the seven context templates; S7c's fabric selection with the template land in the allocation; S9b's block dispatch with its land accounting and pins; local places and openings; the standalone and sky unit runs; the refine and outline close-ups on any district and on an arbitrary boundary (sky context); the `NG` preset; the file-g neighbourhood reads; item 110's neighbourhood parts; the `hatched` family at all four bands (§8.2); the "same kind, new seed" per-district workflow with locks; item 120's Find — its base parts (§2.9's `find` key, §8.2's marks, §9.5's tool, §11.1's export, §11.2's match listing, §12.5's budget), volume 9's panel and `live.find`, volume 1's area and gap services `findAreas` and `gapUnits` (W10–W11); item 122's disaster districts — volume 1's `disasterSource` and `disasterDistricts` (W10; V01 §3.16) | every district of every B-CITY city opens as an NG-class close-up; portals connected 100 %; shared-edge geometry byte-equal across adjacent neighbourhoods (Hausdorff 0); per-district regeneration within §12.6's scoped law × its fabric's factor (≤ 30 ms for a `bent-cut` district of 450 buildings, ≤ 45 ms for a `ring` district; volume 1, J-V1.34) and opening a district within §12.5's neighbourhood band; footprint hash identical to city LOD; every stage-2 letter of §15.2 (S1–S6) run against its number, S4 (d)'s §13.7 band confirmed or its fallback applied; every T-V1 test at M5 (V01 §7) and the bars §13.8's schedule gives M5 (T120-1 – T120-6; the `disaster` look's district clauses of T122-2, T122-3, T122-5 and T122-6); B-ZOOM role continuity across every band switch of `hatched`; the stage-2 gate claimed only when **the D-5 protocol against NG** (twenty pairs over the four templates, §13.6 (2)) passes, rated, or the owner's acceptance is recorded — unrated: M5 closes *provisional — not rated* and the panel is offered with every release until it is rated | 27.5–36.75 pw |
| *carried in the rows' milestones outside their cells* | volume 9's application at build depth — AP1 (M1), AP2 (M2a), AP3 (M3a), AP4 (M3b), AP9 (M4b) and the host step AP5b built with M-SF, less the base's own shares, and AP11's base parts: the zoom-out stop (M1), the oasis toggle (M3a), Colour vision, the cue column, the progress view, the season control, the festival list, Show crises with the crisis preview and the weather switch (M3b), the resolution setting and its chip (M4), Find (M5) and the dossier's crisis numbers (with M-SF) (V09 §8.1); volume 11's C9, the rows of items 111, 113–119 and 122–124, each beside its item's base milestone, its item-113 and item-114 epoch rows with M6-E and item 123's with volume 3's P4 (V11 §8); volume 12's register share built at M6-U's U3–U5 (W6) and its W7 — the specs, pins and bench bars of items 114–126, the wait timer and the edge suite — at M1, M2a, M2b, M3b, M4, M5, volume 3's P4, M6-E, M6-U and M-SF (V12 §8.2) | their volumes' exits | 13.75–20.5 pw (7.5–11, 3.5–5, 1.25–2, 0.25–0.5 and 1.25–2) |

**The staged milestones, in the owner's order** (J122: `docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`). Each is built at
depth by its volume, whose §8 holds its content, steps, exits and risks; each is priced by its own line below and sits
outside the first total.

| milestone (volume) | starts after | runs beside | content and exits | est. |
|---|---|---|---|---|
| **V-M0 — the village's tracker spike** (V07 §8) | M0, on M0's kernel, M0 (b)'s tables and its own fixtures (no M2b input) | M1 | V07 §8's V-M0 | inside the village's line |
| **M3c — the built-in clerk** (V10 §8: C0, C2–C5; V09's AP8) | M3a (C1 is inside M3a) | M3b | V10 §8's exits (C4's item-120 content — the find form and read — landing with M5's exit), the clerk session of §13.4 (T-V10-26) among them; its live-evaluation spend within the budget cap of J122 V10 Q5, spent in stages, the smallest tier first and the full suite at M3c's exit, each spend shown to the owner first | 11.25–15 pw |
| **the village, V-M1 – V-M4** (V07 §8) | M4 | M5, M6-E, M6-P's first rungs | V07 §8; V-M3's epoch clauses exit with M6-E's E2–E4 (V07's dependency (14)); items 111, 113–120 and 122 at the village rungs | 30.5–43 pw with V-M0 and V-M2u |
| **M6-E — the evolution engine** (V06 §8: E0–E9) | M4 | M5, the village | V06 §8; E4 after item 105's S10b changes land, E8 after V04's U5, E7 after E1–E6; E9, the history replay at generation (item 113), after E8, V04's `BuriedFormer.lay` and V11's `history.*` cells; item 114's transitions at E3, item 115's ceiling across a rung change, item 122's hand-over and item 123's decay level at E2; the replay's and `advance`'s comfort-level timing (item 119; V12 §6) | 31–44 pw |
| **M6-P — the plan rung** (V03 §8: P0–P6) | P0, P1 and P3 after M4 on the base's buildings; P2 once volume 4's access records exist; the rest after M6 | M5, M6 | V03 §8's exits; item 123's damaged plan at P4 and its exports at P5, with §2.6 step 7's, §6.3's and §8.6's base parts; the owner's twenty-plan review | 18.25–25 pw |
| **M6 — stage 3: building composition** (V02 §8: M6a the massing, M6b the composer, rooms rung, rendering and exports, M6c editing, parity and the gate) | M5 | M6-U | V02 §8.3's exits, item 123's exterior and item 122's ruined look among them (V02 §8.6); the stage-3 panel (V02 §7.5; §13.6) | 21–30.75 pw with 2.25 pw of spikes |
| **M6-U — the underground layer** (V04 §8) | M5 — or beside it with a second pair, its U3 distinctness and U4 undercity parent then waiting on volume 1's W15 | M6 | V04 §8's exits; U4 carries the crypt derivation; the buried former settlement of item 113; item 123's damage below ground at the later of U5 and V03's P4 (V04 §5.6 (6)) | 28.5–39.5 pw |
| **V-M2u — the underground under a village** (V07 §8) | M6-U's tail | — | V07 §8 | inside the village's line |
| **M6-sky — the sky layer** (V05 §8: P0–P6) | M6-U (its P0 spike may run beside M5) | — | V05 §8's exits | 18–24.75 pw |
| **M-CAL — the corpus reconciliation** (V12 §8) | M6-sky; its inputs M4, M5, M6 and V-M4 | — | V12 §3.10's acceptance and the before-and-after sitting | 4.75–8 pw |
| **M-SF — the SettlementForge connection** (V08 §8: SF0–SF7; VH with the village) | M-CAL (SF0–SF3 may start earlier; VH when the village lands) | — | V08 §8's exits and release checklist, item 125's bars and item 122's map rows and crisis reading among them | 18.5–25.25 pw (map side) |
| the application's staged screens (V09: AP5 with M6-E's E6, AP6 with M6-U, AP7 with M6-sky, AP8 with M3c, AP10 with M6c; AP11's History chip, "What its past left", the lost-void line, Back in use, the last-change epoch and the ring's story with M6-E, its grandeur line with M6, the damage lines with M6-P's P4 and the game-master trial before the public release) | their layers | their layers | V09 §7 | 4.25–6.25 pw |
| the content's staged rows (V11: C4b at M-SF, C8 at M6-U) | their milestones | — | V11 §8 | ≈ 1.85–2.6 pw |

**The release gate.** The map's public release inside SettlementForge — its timing SettlementForge's (J121) — requires
the style check green on every shipped family's checked variants (T112-1) and the game-master trial's report (T112-2,
item 112 (b)): ten to twenty SettlementForge game masters, each using the map on their own settlements for at least two
sessions of play, recruited through SettlementForge's community and thanked by credit and early access, with no
payments; its findings enter volume 12's calibration record and the fix list; volume 9 runs it.

**Effort, with its basis (D-20).** Re-derived line by line (PLAUSIBLE; each line a range with its basis):

| line | pw | basis |
|---|---|---|
| parity floors after sharing: (MFCG 46 + FTG map subset 52) × 0.65–0.75 | 64–74 | `docs/CONFIDENCE.md` §1; sharing the kernel, the display list and the document removes 25–35 % of the two floors, not 50 % |
| O1 terrain and hydrology beyond the references' water | 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes; the geology flag's S0 draw and S1 resolution and the relief toggle's S0 pick (item 65) and the oasis and spring (item 111) absorbed |
| O9 document and edit system (events with inverses and undo records, dry run, locks, scoped regeneration, the named actions, rebase, migration with diff, retention, the locality oracle, B-EDIT) | 12–16.5 | neither reference has it; the `Use` record and hand relocation, the plan rung's base hooks, the wealth-ladder edit kinds and the regrowth-first order of the grow path (2); the closure rule and the access edit (item 66, 0.5); the sugar events, the points forms and declared-means-held (item 101, 0.5–1); volume 1's M1 schema (V01 §8.1) and item 114's `wearWall` and repair material absorbed |
| O12 renderer beyond the floors (columnar display list, paint programs, tile pyramid and tile worker, label composition, SVG, print bands, `lit` on Canvas2D, the relief tier) | 10.75–16.75 | one drawing path; no second backend; item 68's lighting model — the day model with the cursor sun, the CPU reference light pass, its GPU accelerator and the fallback ladder (2–3), the night view in every family (0.5–1); item 101's leader-line switch and region groups (0.5); item 117's season look (1–1.5) and item 118's festival look (0.5–1); item 121's resolution adjuster (0.75–1.25), item 122's crisis looks with volume 1's `campLand` (0.75–1.25) and item 124's weather effects (0.75–1.25); the `states`, entrance-tick and arch-glyph rows, item 114's `worn` and `patched` rows with their legend, item 116's per-map zoom-out limit, `live.stale`, items 54 and 55, item 112's second cues and checked variants and item 120's Find roles and marks absorbed (its overlay provider and panel are volume 9's, AP11) |
| O11 exports and interop beyond PNG / SVG / GeoJSON (VTT × 2 per layer, glTF / OBJ, CityJSON, CBOR, CSV, the handle API, the host bridge and resolver) | 12.5–17.25 | §11; the knowledge key and filter with the reader's and every export's withholding, `report.changed` (1); the host-input contract made concrete by the dossier port (1 at M1, 0.5–1 at M3a); the skeleton file and the clerk's tool API (item 101, 0.5–1); the exports' lights (item 68, 0.5); a concealed use's parts withheld (item 63, 0.5); the oracle at depth (volume 10's C1, 3.25–5) and the second fixture's transcript (0.25; item 531); item 114's condition and material, items 116–118's frame, season and festival and items 120, 122 and 124's Find, crisis looks and weather in the exports, §11.2's Find match listing and item 125's narrowed host contract absorbed |
| O17 + O18 + O19 (plot model, site plans, packer, heights; the field and the granularity law; greenery rules) | 15.75–23.75 | new in both references; the designation templates and the compatibility table, the band set, the entrance set and basements, exposure, the hidden shares and passages, and O14-core's farmland modes, fuel and timber rows and arable reserve (3–4); informal clusters (item 70, 1–1.5); the class mix inside a band (item 71, 0.5–1); the district character, identities, dials and band range (item 72, 1.5–2.5); volume 2's item-110 building part (2–2.75) and volume 3's eager plan facts (0.75–1); the plot, wall and field rules read in code (items 42–47, 57), the daylight and water terms (items 102, 111), item 110's base parts with volume 1's terrace declarations (V01 §8.1) and item 115's rung ceiling absorbed |
| O10 (intent expansion over ≈ 200 parameters, the forms catalogue, assignments, the placement solver) | 10–14.5 | forms tuned by eye and the D-5 panel; the one placement solver with its relation and supply data, the designation mutator, the dossier contract (4–5); fronts and concealment in the solver with the cover rows (item 63, 0.5–1); `factTier`, the derivation index and the refusals (item 20 (h), 0.5–1); the port's absorb half on the dossier contract (1–1.5); the siting families, coverage, custom-content siting, the supply web, balance and the ladders' counts (items 103–108), item 113's history rows, item 114's condition row, items 117 and 118's season and festival rows and item 125's re-sourced rows (DR1, DR3, DR19, DR29, DR42) absorbed |
| should-have "full" tiers (O13, O14, O16, O12 extras) | 4–6 | §15.2 should rows |
| original content under the clean room (≈ 180 roster classes and 45 profile families, institutions, households, government and religion rows, naming grammar and corpora, era tables, presets, the symbol set, the procedural textures) | 14–20.25 | ≈ 40–50 % of CONFIDENCE's 25 pw FTG content line (§3.4's re-pricing), plus presets and symbols; the parity presets and the marker on every default cell, the relation templates', room programmes' and interior ladder's rows (1); the `ink` palette on the owner-opened targets (item 69, 0.5), the light rows (item 68, 0.5), the dossier vocabulary's class rows (0.5); file g's rows in the first total — profiles, families, pairs, goods, coverage and balance (items 102, 103, 105 and 107; V11 §8's C2 g share, 1.0–2.0), the wall rows (item 106; C4a, 0.5) and item 110's rows (C3b, 0.75–1.25) — and the rows of items 111, 113–119 and 122–124 (V11 §8's C9, 1.25–2.0), the ladders, the 280 kind rows, item 122's mapping and item 109's rows being on the staged content line (V11 §8's C4b and C8); volume 1's naming-context grammar and `hood.constants` row (M1) and its `way.surface` and `squares.quota` rows (M2b) absorbed (V01 §8.1) |
| `@plat/sim` (relations, postings, schedules, calendar, factions, events, economy and personality) | 8–14 | inside FTG's 125 − 52 = 73 pw non-map scope; the relation schema already in the base |
| the reference app's UI and volume 9's build-depth additions — autosave with crash recovery, restore points, the message catalogue, the file-g interface (siting rows, the link view and edits, split merge-back, wall grades, record members, the shade view, the why card), the export dialog's estimates and tabletop details, touch and the two layout classes (wide and medium; item 126 retires the narrow class), the guided first town, the owner's sittings and the known-city canvas bars; the base edits, view keys, notes, pins and ruler, the context menu, View as, Recently deleted, people and the family tree; item 110 on the canvas and the second known-city canvas script; the screens of items 111, 112, 116–122 and 124 | 19.5–28.5 | no reference line covers it; the twelve tools with the ghost, the count badge, the variations and first-use hints, the handles and the underlay (item 101); V09 §8.1's base line (16.0–23.5, narrowed by item 126's 0.25–0.5; time's screens, AP5, with M6-E on the staged-screens line) and AP11's base parts (3.5–5: items 111–119's 1.25–1.75, Find's 1.25–1.75, the resolution setting's 0.25–0.5, the crisis looks' screens 0.5–0.75, the weather switch's 0.25) |
| the verification rig (five benches in three CI tiers, stage-isolated goldens with shift and cascade records, the five-engine nightly run, visual regression, the option matrix, control and cost-model sweeps, `baselines.json`, the clean-room scanner, the D-5 tooling) | 16.75–24 | §13; the hook, B-PLAN and underground fixtures and the parity-preset run (1); the dossier fixtures and B-DOSSIER-lite (0.5–1 at M1), the absorb pairs (0.5 at M3a), the toolkit's elegance fixtures and first-five-minutes sessions (item 101, 0.5); volume 12's metric registry with one implementation and the derived features, the calibration-run engine with its guards and fixture suites, the correlation, share and sweep harness with the rank rule, the pooled exact test and the confirmation stage, the register with its lint, evidence and owner stamps, drift, the panel engine and the sitting page, the known-city fixture engine and the no-op pin engine (V12 §8.2's W1 – W6, 6–9) and its W7 — the specs, pins and bench bars of items 114–126, the wait timer and the edge suite (1.25–2); the bars of items 33–62 and of file g's items, item 119's comfort-level timing and the style check absorbed |
| mechanisms the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine; the six components below) | 12–17 | 5–7 for the first group; 3–4 (≈ 14–22 working days) for the six components itemised below; the transient arena and the M4 hooks (1–2); the underground's hooks (items 64, 65, 1–1.5), the Works record with its table, week and drawing rows (item 67, 1–1.5), the character at an epoch (item 72, 0.5), the lapse threshold and the rung at an epoch (items 76, 81, 0.5) |
| **base subtotal (M-1 – M4b, with the shares the carried row builds at M5, M-SF, M6-E, M6-P and M6-U)** | **203.25–278.5** | |
| stage 2 (M5) | 27.5–36.75 | V01 §8.2 |
| **the base with stage 2 — the first total** | **230.75–315.25** | equal to the milestone rows above (J-A16.01; file f item 568) |
| stage 3 (volume 2) | 21–30.75 | V02 §8.3 (its 23–33.5 less the 2–2.75 inside M3a) |
| the plan rung (volume 3) | 18.25–25 | V03 §8 (its 19–26 less its PE row's 0.75–1 inside M2b and M3a) |
| the underground layer (volume 4) | 28.5–39.5 | V04 §8 |
| the sky layer (volume 5) | 18–24.75 | V05 §8 |
| the evolution engine (volume 6) | 31–44 | V06 §8 |
| the village product (volume 7) | 30.5–43 | V07 §8 |
| the SettlementForge connection (volume 8, map side) | 18.5–25.25 | V08 §8 |
| the built-in clerk (volume 10) | 11.25–15 | V10 §8 |
| the corpus reconciliation (volume 12) | 4.75–8 | V12 §8 |
| the application's staged screens (volume 9) | 4.25–6.25 | V09 §8.1 (AP5 – AP8, AP10 and AP11's staged parts, 1–1.25) |
| the content's staged rows (volume 11) | ≈ 1.85–2.6 | V11 §8 (C4b and C8) |
| **the staged milestones together** | **187.85–264.1** | |
| **the whole program — the second total** | **418.6–579.35** | the first total plus every staged line |

Outside both totals: each later corpus run (M-CAL/⟨layer⟩, 0.25–0.75 pw each), the command-line clerk where volume 10's
spike takes that fallback (0.5 pw), and SettlementForge's own side of the connection (1.5–2.5 pw, SettlementForge's
program). Every volume cites these two totals and states no total of its own (file f item 568).

**The six new components** priced by the last base line's 3–4 pw (≈ 14–22 working days; PLAUSIBLE): the per-name naming
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
PNG row-filter rule and the quantised light steps with their light pass (the O12 renderer and O11 export lines);
volume 1's early pieces (V01 §8.1) — at M1 its schema (`Block.content`, `Block.overrides`, `HoodPlace`'s registry row,
`DistrictContext`, `Recipe.product`, the three concerns' ids and the `S8.seed` stage id; file f item 345) under the O9
line and the way-naming context's features in S13a with `hood.constants`' row under the content line's naming grammar
(≈ 0.5), at M2b `Way.slopeP95` with the way-surface rule (item 207), S7b's and S10a's hook points (item 323) and
`squares.quota` (item 301) under the content line (≈ 0.25), at M3a `District.terrace` (item 211), `terraceState`,
`stepProfile` (item 245), the bent cut's `levelledUnits` / `terracedEdges` declaration (item 506) and `hood.templates`'
`stepped` row under the O17 + O18 + O19 line's item-110 share (≈ 0.25); and the base parts of items 114–116 and 119 —
item 114's condition row (the O10 line), its state rows and legend (the O12 line), its `wearWall` and repair material
(the O9 line) and its exports (the O11 line), item 115's rung ceiling (the O17 + O18 + O19 line), item 116's per-map
limit (the O12 line) and item 119's comfort-level timing (the rig line). Items 117 and 118 widen the O12 line by their
looks' itemised 1.5–2.5, and items 121, 122 and 124 by 2.25–3.75 (the resolution adjuster, the crisis looks and the
weather effects, 0.75–1.25 each); the base parts of items 120, 123 and 125 are absorbed — item 120's key, roles,
listing and exports by the O11 and O12 lines (its overlay provider and panel are volume 9's AP11), item 123's damage
layer by volume 3's P4 and P5, with which it lands (V03 §8), and item 125's re-sourced rows and narrowed host
contract by the O10 and O11 lines — and item 126 narrows the reference app's line with volume 9's base line. The milestone rows carry the six components where they are built, so the rows sum to the first total. **A change that adds
build work prices it here:** it names each new mechanism with the line that absorbs it, or widens a line by an itemised
amount and keeps the milestone rows equal to the first total.

The cuts that would shrink the first total are recorded for the owner's veto, not applied (J-S6, D-20): the module M4b
(8–14 pw); VTT, glTF / OBJ, CityJSON and the CBOR twin (≈ 3–5 pw); all but three forms (≈ 2–3 pw); the should-have
"full" tiers (4–6 pw) — together a first total of ≈ 213.75–287.25 pw.

The riskiest items, in order: the fusion timing and statistics on real terrain (M0 c, M1); the bent-cut engine on
concave and holed faces (M0 b); the kernel's own booleans and bands (M0 a; §3.7's pre-decided fallback); the straight
skeleton's robustness (M0 a); the content authoring cost (M1, M2b, M4b — CONFIDENCE §3.4's re-pricing is the warning);
the thin CITY budget headroom (§12); the lighting pass's frame budget under a moving cursor sun (M2b; §8.4's fallback
ladder answers it); the D-5 protocol's dependence on the owner's time (§13.6 (7) answers it: an unrated panel never
stops the build and never lets a gate be claimed). The risks that cross volumes, each with its spike and pre-decided
fallback, are `docs/volumes/INDEX.md` §5's.

Nothing is out of scope: CityJSON is built (§11.1), the host-input contract is decided (§11.4), sharing needs no hosted
service of our own (§11.5), setting packs have their format (§10.4), there is no WASM kernel (§3.7), and the relief tier
is a base program (§8.2); every staged subject has its milestone above and its volume (*Staged by the owner's roadmap*).
=== END ===

