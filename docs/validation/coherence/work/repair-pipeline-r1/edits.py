# edits.py — the edits of lane coherence/repair-pipeline-r1, read by gen.py (exec). Each E(head, old, new, *ids):
# `old` must occur exactly once in the live subsection whose heading starts with `head`.

# ───────────────────────────── §4.1 ─────────────────────────────
E(H41, """  off, SKY registers and writes nothing under either key. **The `raised` key** (item 110 (b); V07 §2.7's `RaisedRead`):
  the ground arena's parts from 1 — every raised way's deck strip, supports, feet, spans and an aqueduct's channel — read
  as one data key, produced by the commit of any raised part (a declaration, generation or an epoch) and published by the
  declaration layer, so a product's stage may declare it as an input and re-run when a raised part changes.""",
"""  off, SKY registers and writes nothing under either key. **The `raised` key** (item 110 (b); file f item 290 (4)):
  the ground arena's parts from 1 — every raised way's deck strip, supports, feet, spans and an aqueduct's channel — read
  as one data key, produced by the commit of any raised part (a declaration, generation or an epoch) and published by the
  declaration layer, so a product's stage may declare it as an input and re-run when a raised part changes. The key's
  value is one `RaisedRead` per raised way — a view derived on read from the way's `RaisedWayRecord` (§2.7) and its raised
  part, never stored — and every reader of the key reads it (V07's village stages among them, V07 §3.5a):

  ```ts
  interface RaisedRead {   // the `raised` data key's value per raised way; derived on read, never stored
    way: Id; kind: RaisedWayRecord['kind'];
    origin: 'declared'|'generated' /* derived (item 244): declared when the way's lifecycle cause is an edit or a skeleton file, else generated — at village rungs one carried down from a CITY epoch (V07 §3.12) */;
    reason?: RaisedReasonKey /* §2.7's: generated ways only (V06 §2.13) */;
    deck: PolygonCm /* the deck's plan footprint: the under-deck strip */;
    supports: { key: number; ring: Polygon; state?: 'ruined'|'cleared' }[] /* §2.7's supports, by their keys: footprints on ground part 0 */;
    feet: [PointCm, PointCm] /* the two part-0 vertices where its ramps or stairs meet the ground (§3.4) */;
    spans: { a: number; b: number; state: 'standing'|'ruined'|'cleared' }[] /* §2.7's spans, by their bounding support keys; an absent state reads 'standing' */;
    channel?: { unbroken: boolean /* no span ruined or cleared */; delivery: PointCm[] /* the fountain or basin pins and a cistern terminus it feeds (§2.7's terminal and feeds) */ } /* an aqueduct only */ }
  ```""", 'VAL-12')

E(H41, "`E_BELOW_MIN_EDGE`, `E_NON_SIMPLE` …)", "`E_BELOW_MIN_EDGE`, `E_SELF_INTERSECT`, `E_INVARIANT` …)", 'VK0-14')

E(H41, """  No rung shows a preview; first-map times are §12.5's (J-R7); the model digest covers the eager model (§6.2).
""", """  No rung shows a preview; first-map times are §12.5's (J-R7); the model digest covers the eager model (§6.2).
* **The quality budget (item 119; J130).** Every stage works to its §12 target, as fast as possible. A stage runs a
  quality path slower than its target only where a `perf.qualitySpend` row names it (`QualitySpendRow`, V11 §2.8d; its
  rows V11 §3.25.8, registry row 106, shipped empty, `calibratable: false`): the row records the stage (its `StageId`,
  §4.12), the use, the target and the measured extra time, the bar the gain is measured by with the gain, and the
  `CalibrationRun` that measured it (V12) — and the extra time is spent only inside the comfort level for one-time waits
  (item 119: ten seconds of total time; §12), never from an interaction budget (§12). With no row a stage runs its target
  path (the no-op pin), so the shipped empty table changes no output. A stage's `StageReport` (§5.4) names each quality
  path it took beside its §12.4 timing. The bars are §12.10's register rows and T-V11-44 (b).
""", 'VPC-04')

E(H41, "on the island's own arena, from V05's hand-over (V05 §3.1; V01 §3.10),",
       "on the island's own arena, from its `SkyUnitInput` (V05 §2.3; V01 §3.10),", 'VPC-16')

# ───────────────────────────── §4.2 ─────────────────────────────
E(H42, """biome /* its climate row: aridity, the arid water chances, the water pull and
the sunlight cell (items 102, 111; V11) */""",
"""biome /* its climate row: aridity, the arid water chances, the water pull and
the sunlight cell (items 102, 111), and the season columns (item 117: §10.2's `ClimateSeasonCells` — the winter's
severity and the weeks, 0–51 spring first, of leaf colour, leaf fall, blossom, growing, harvest, hay, ice and snow, a band
wrapping the year's end — read only by §8.2's season rows, §11's exports and §7.7's season derivation row, never by a
stage, so no season changes the model or its hash, item 117 (a)); V11 */""", 'VPC-02')

E(H42, """moat: 'none'|'inner'|'all'|'auto' /*
the innermost enceinte (S3) or every enceinte (outer ones by S5a's carve, §4.4) */""",
"""moat: 'none'|'inner'|'all'|'auto' /*
the innermost enceinte (S3) or every enceinte (outer ones by S5a's carve, §4.4); `auto` resolved by the feature table's
P(moat) row by rung and era to `inner` or `none`; wet only where water reaches it, S3 (10) */""", 'VEW-04')

E(H42, "P(harbour | coast), P(shanty), P(greens) …", "P(harbour | coast), P(shanty), P(greens), P(moat) by rung and era …", 'VEW-04')

E(H42, """For a standalone or sky outline the base curve comes from an **outline
template** row — star, star_round, street_strip and plaza_frame (a standalone neighbourhood's, drawn by its fabric,
V01 §3.10.2), disc, D-shape, lozenge, crescent, spindle — scaled to the requested area (COV-NG-N06).""",
"""For a standalone or sky outline the base curve comes from an **outline
template** row, `type OutlineTemplateId = 'star'|'star_round'|'street_strip'|'plaza_frame'|'disc'|'d_shape'|'lozenge'|'crescent'|'spindle'`:
`star`, `star_round`, `street_strip` and `plaza_frame` (item 285's: a standalone neighbourhood document's, drawn by its
fabric, V01 §3.10.2), `disc`, `d_shape` (the D-shape), `lozenge`, `crescent` and `spindle`, scaled to the requested area
(COV-NG-N06); V01's `HoodRecipe.outline`, `TemplateRow.outline` and `hood.kinds` and II.1's
`NeighbourhoodRequest.outlineTemplate` name a row by its id.""", 'VV12-05', 'VPC-16')

E(H42, "(6) **Harbour candidates:** coast faces with depth ≥ threshold.",
"""(6) **Harbour candidates:** coast faces with depth ≥ threshold; on a site with no coast face that passes it, the reaches
of a river (never a tributary, distributary or islet channel) and the shores of a lake whose depth passes the same
threshold — a **river or lake harbour**, its basin cut into the bank by S3 (2) and opening on the reach (a dossier's
`deep_harbour` reads it so, V08 §2.6); a site with neither has no candidate, and a `harbour` request or a `deep_harbour`
there is left out (§5.1 (7), tier 6) and reported.""", 'VEW-09')

E(H42, "A collective record (§7.7 T9, DR9)", "A collective record (DR9; V08 §2.6's `distribution` row set)", 'VPC-19')

E(H42, """A requested `N₁` is taken as given,
   and a river takes water gates, not this reduction. Picks are **sequential nested picks** from the `gate.pick` stream on""",
"""A requested `N₁` is taken as given,
   and a river takes water gates, not this reduction. **Closed arcs (item 106 (a)).** The barrier closure of §4.4 S5a step
   1 is classified on the pick contour before the picks, and the picks fall on its approachable arcs only. Where the arcs
   a barrier other than a sea or lake shore closes (a cliff, a gorge, a marsh, a sheer face, a river's banks round a loop)
   take at least `gate.waterfrontShare` of the contour, `N₁ = max(1, ⌊s · N′ + ½⌋)` — `N′` the value after the waterfront
   reduction, `s` the contour's approachable share (a sea or lake shore counted approachable, the waterfront reduction
   having priced it), so the land law's gates keep their density along the walled share — reported as the waterfront
   reduction is; a requested `N₁` keeps its count, its picks on the approachable arcs. A contour with no approachable arc
   walls nothing ((9)). Picks are **sequential nested picks** from the `gate.pick` stream on""", 'VEW-03')

E(H42, """`t_1,i` is chosen so that nucleus i's nodes with
   `T ≤ t_1,i` hold its land `A_1,i` (exact to one cell), and the **stage-1 boundary** is that contour, Chaikin-smoothed and
   resampled.""",
"""`t_1,i` is chosen so that nucleus i's nodes with
   `T ≤ t_1,i` hold its land `A_1,i` (exact to one cell), and the **stage-1 boundary** is that contour, Chaikin-smoothed and
   resampled. **Less land than the stage asks** (an island town on a small island, FTG-19; a narrow coast, fjord or
   valley; the METROPOLIS cap on high relief): `t_1,i` is capped at the largest `T` over the lattice nodes the nucleus
   reaches inside the frame (§3.2 (9); the context margin is never the town's land), and the shortfall is the stage's,
   reported in `requestedVsBuilt` and carried to S5d (§4.4). Where the capped region meets the frame, the boundary runs
   along the frame's inner line, inset by the outer wall strip's width for a walled stage (§4.8), so the trace and its
   strips stay inside the frame (§4.13); that arc is open ground, walled and gated as any other, and a gate on it has its
   outward arterial across the context margin (§4.3 *Result*), never of zero length.""", 'VEW-02')

E(H42, """Two routes that cross the boundary at one point cannot both be gates: the later pick is re-drawn from its next
   candidate (≤ 3 attempts), then dropped and reported (F-WALL).""",
"""Two routes that cross the boundary at one point cannot both be gates, and a route that first reaches `T = t_1` on a
   closed arc ((4)) gives no gate: the later pick, or that pick, is re-drawn from its next candidate (≤ 3 attempts), then
   dropped and reported (F-WALL). In a walled stage the arcs a land barrier closes (`cliff`, `gorge`, `marsh`, `sheer`)
   are impassable to S4's and S5's routes as the wall is (§4.3's `wallCrossingPenalty`), so a road leaves a walled stage
   only through a gate — through the gate on the nearest walled arc where its bearing lies across such an arc.""", 'VEW-03')

E(H42, """S5a commits this trace unchanged for k = 1;
   an unwalled town keeps the boundary itself as stage 1's boundary.""",
"""S5a commits this trace unchanged for k = 1;
   an unwalled town keeps the boundary itself as stage 1's boundary. **Every arc closed** (a mesa town; an island town
   filling its island under an `open` waterfront, its shore closed by deep water): the stage walls nothing — no `Enceinte`
   is recorded for it and it has no gate — and reads as an unwalled stage for every rule (§5.3's walled-stage rows do not
   apply to it); its routes (5), picked by the land law on the whole contour as an unwalled town's are, enter across the
   barriers, and a requested wall is reported in `requestedVsBuilt` (`walled_by_barriers`). An `on_enceinte` castle whose
   weld vertices would fall on a closed arc is re-sited along the walled arcs by F-CASTLE's re-site rung (§5.2), else kept
   `inside` (reported). The trace is laid `standing`; S7 writes each run's condition at generation (§4.8; item 114 (d)).""",
  'VEW-03', 'VPC-31')

# ───────────────────────────── §4.3 ─────────────────────────────
E(H43, """a jittered hexagonal point set at ≈ 25 m
spacing whose adjacency is known by construction (six neighbours per point, the jitter bounded so no edge crosses
another; no Poisson sampling, relaxation or triangulation).""",
"""a jittered hexagonal point set built by `hexLattice` (§3.4) at ≈ 25 m
spacing whose adjacency is known by construction (six neighbours per point, its jitter below half the spacing, so no edge
crosses another and §3.4's asserts hold; no Poisson sampling, relaxation or triangulation).""", 'VK0-12')

E(H43, """× landValue (× S3 (6)'s water-pull factor on the field `T`, never on a route).""",
"""× landValue (× S3 (6)'s water-pull factor on the field `T`, never on a route). **The class grade limit.** An edge
steeper than the routed class's grade limit is impassable to that route. The limit is the class's `ways.crossing` row's
`rampMaxGrade` (V11 §3.24.5) — one value per class for the grade it is routed at and the ramps it climbs — read by S3 (5)'s
gate routes and S4's routes (`primary`'s inside the pick contour, `through`'s beyond it), by S5b and S5c (§4.4), by a raised
way's end ramps and by §7.3 (a) 5's steepness report; the field `T` reads no limit (it prices slope only). F-ROUTE's slope
rung (§5.2) relaxes a route's limit to the next class's in the order `through`, `primary`, `track`, `path`; a destination
no relaxation reaches takes F-ROUTE's last rung (`unserved`, reported).""", 'VEW-10')

E(H43, "whose attraction folds any residual near-duplicate within 26 cm into a shared",
       "whose attraction folds any residual near-duplicate within `attractCm` (§3.6) into a shared", 'VK0-18')

E(H43, """its deck, supports, feet, spans and an aqueduct's channel live
in their own arena part of the ground layer (ground parts from 1, allocated once and never reused, §3.4; the records are
§2.7's), so the ground's planar rule is untouched: it crosses the ways beneath without a junction, its two ends are ramps
or stairs joined to ground vertices, its supports are footprints on its part, the spaces between supports stay open or
hold II.7.6's vaults,""",
"""its deck, spans and an aqueduct's channel live
in their own arena part of the ground layer (ground parts from 1, allocated once and never reused, §3.4; the records are
§2.7's), so the ground's planar rule is untouched: it crosses the ways beneath without a junction, its two ends are ramps
or stairs joined to ground vertices — each of its two feet a vertex on part 0 joined by record to one on its part (§3.4) —,
its supports are footprints on ground part 0 (§2.7's `supports`), which with its under-deck strip are holes for S8, S10 and
S11 (§4.6), the spaces between supports stay open or hold II.7.6's vaults,""", 'VK0-04', 'VEW-08')

E(H43, "with one uniform per key on the raised-way stream (epoch component 0)",
       "with one uniform per key on `raised.reason` (§6.1; epoch component 0)", 'VDC0-23')

# ───────────────────────────── §4.4 ─────────────────────────────
E(H44, """outside the previous wall — and the boundary is that region's outer contour, Chaikin-smoothed and resampled.""",
"""outside the previous wall — and the boundary is that region's outer contour, Chaikin-smoothed and resampled. `t_k` is
capped as §4.2 S3 (6) caps `t_1` (the reachable land inside the frame; a frame arc open ground, inset as there): the
shortfall is the stage's, reported and carried to S5d, and a stage whose capped boundary adds no land to stage k − 1's
is folded into the last stage that holds land, its quota with it (reported), as `N = 0` folds the extramural stages into
the walled stage (§4.2 S3 (4)).""", 'VEW-02')

E(H44, """with a tower at each anchor (§4.8), and `Enceinte.closure` is `barrier` (§2.7) whenever an""",
"""with a tower at each anchor (§4.8); it records the closing arcs as `Enceinte.arcs` (each by its two anchor
   ends and its `BarrierKind`) with the stretch anchors `anchors[].end` (§2.7), and `Enceinte.closure` is `barrier` whenever an""",
  'VPC-26')

E(H44, """With `barrier` closure and the stretch profile off, the
   trace is the base's (a no-op pin).""",
"""With `barrier` closure and the stretch profile off, the
   trace is the base's (a no-op pin). A stage k ≥ 2 picks its gates on its approachable arcs and takes the closed-arc
   reduction of its gate count (§4.2 S3 (4), classified on its own boundary); a stage whose every arc closes walls nothing
   and records no enceinte, and the arcs a land barrier closes are impassable to routes as the wall is (§4.2 S3 (7), (9)).""",
  'VEW-03')

E(H44, """On a shore or bank the trace is attracted onto the outline, so the
   shared stretch is one edge carrying both roles (§3.6).""",
"""On a shore or bank the trace is attracted onto the outline, so the
   shared stretch is one edge carrying both roles (§3.6). The trace is laid `standing`; S7 writes each run's condition at
   generation (§4.8; item 114 (d)).""", 'VPC-31')

E(H44, """the L0 batch inserts the channel (the era row's width, outside the outer
half-band and a berm, along the walled arcs only) through those prepared vertices,""",
"""the L0 batch inserts the channel (the era row's width, outside the outer
half-band and a berm, along the walled arcs only, and only on the stretches §4.2 S3 (10)'s rule makes wet — every other
stretch a dry `ditch` (§4.7 S10 (0)) whose arterials take no deck) through those prepared vertices,""", 'VEW-04')

E(H44, "on its arterial where the channel's banks will cross it",
       "on its arterial where a wet stretch's banks will cross it", 'VEW-04')

E(H44, "The stage's primaries match its gates: `N_k` = the\ngate law of §4.2 S3 (4) on the land inside the stage's enceinte, with its waterfront reduction",
       "The stage's primaries match its gates: `N_k` = the\ngate law of §4.2 S3 (4) on the land inside the stage's enceinte, with its closed-arc reduction and its waterfront reduction",
  'VEW-03')

E(H44, "S5b spawns `N_k − c` radial destinations on the boundary by nested picks",
       "S5b spawns `N_k − c` radial destinations on the boundary's approachable arcs by nested picks", 'VEW-03')

E(H44, "Slope ≤ class limit.", "Slope ≤ the class's grade limit (§4.3 *Lattice and costs*: its `ways.crossing` row's `rampMaxGrade`).", 'VEW-10')

E(H44, "**one top-up** runs: the level set grows",
       "**one top-up** runs (skipped when no reachable land is left inside\nthe frame, §4.2 S3 (6)): the level set grows", 'VEW-02')

E(H42, "a **castle moat** when water is within\n   reach —", "a **castle moat** when water is within\n   reach (below) —", 'VEW-04')

E(H42, """never along a barrier arc the
   trace leaves unwalled — with **one deck at every main gate and at a harbour gate (7)**, where the gate's route (for a""",
"""never along a barrier arc the
   trace leaves unwalled, and wet only where water reaches it (below) — with **one deck at every main gate and at a
   harbour gate (7)** on a wet stretch, where the gate's route (for a""", 'VEW-04')

E(H42, """When
   a moat was carved, `T` is recomputed once over the new water (≈ 4 ms at CITY) for the stages k ≥ 2; stage 1's boundary
   is never re-derived from it.""",
"""When
   a moat was carved, `T` is recomputed once over the new water (≈ 4 ms at CITY) for the stages k ≥ 2; stage 1's boundary
   is never re-derived from it. **Where a moat holds water.** "Water within reach" is one rule for the castle moat and the
   city moat: a source — a river, a lake, a spring-fed pond or the sea — within `moat.waterReachM` of the moat's line (a
   cell of the `walls` table, §7.6: 400 m; our own, calibratable). The moat's `WaterBody` names that source in `flowFrom` (§2.3; the
   nearest, ties by id), and its water level is one value per moat, derived on read and never stored: the source's surface
   at its shore point nearest the moat (the terrain's height at that shore, as V04 §3.2 N7 reads a water surface), which
   every reader of the moat's water reads (§8.4's water at its level, V04 §3.2 N2 and N7, §2.6's water table). The channel
   is carved only along the stretches whose ground lies at or above that level by at most `moat.maxFallCm` (the same
   table: 400 cm; our own, calibratable); every
   other stretch, and the whole moat when no source lies within reach, is laid **dry** — no channel and no deck, its glacis
   part typed `ditch` residue by S10 (0) as the town side of an `on_enceinte` bailey is (§4.7, §4.8) — reported
   (`moat_dry`). An outer enceinte's moat takes the same rule (§4.4 *Outer moats*).""", 'VEW-04')

E(H42, """multiplied by `1 − w_water · q(x)`, with `q(x)` ∈ [0, 1] the proximity to reliable water — 1 on a river bank, a lake
   or oasis shore, a spring or ground of the top well-yield class (S1 (10)), falling linearly to 0 at the climate row's
   pull radius — and""",
"""multiplied by `1 − w_water · q(x)`, with `q(x)` ∈ [0, 1] the proximity to reliable water, the largest over the sources
   — `1 − d ÷ pullRadius` from a river bank, a lake shore or ground of the top well-yield class (S1 (10)), and
   `flow × (1 − d ÷ pullRadius)` from a water body carrying `spring` (an oasis's shore, a spring-fed pond's, its source
   point), `flow` that body's `spring.flow` (§2.3; 1 when made, lowered and restored by V06 §3.12.1), `d` the distance and
   `pullRadius` the climate row's pull radius (0 beyond it), so a spring at `flow` 0 pulls nothing while its water body
   stands — and""", 'VPC-25')

# §4.2 S2 — VPC-01's S2 reader (the manor count at the territory rungs)
E(H42, """A SIZE step is one
larger building by its template, a REPLACEMENT step the greater only.""",
"""A SIZE step is one
larger building by its template, a REPLACEMENT step the greater only.

*The grandeur ceiling's manor count (item 115; J127).* At the `territory` rungs S2 reads the rung's `grandeur.ceiling`
row (§10.2 *Grandeur ceiling*): an enabled row caps the manor class's count at its `manor.max` and admits a manor only
where its `manor.requires` is met — `lordOrSpecified` a `seigneurial` government or a specified manor, `specified` a
specified one only (a dossier manor, hall or similar record, or a government's `villageSeat` naming the manor; V08
§3.16 (3)) — and a specified manor is a fixed row above the cap (item 115 (c)); a disabled row, and every row at TOWN and
above, leaves S2's count as the roster gives it (V07 §3.8; §4.7 S10b *The rung ceiling*).""", 'VPC-01')

# ───────────────────────────── §4.5 ─────────────────────────────
E(H45, """  **The water term (item 111 (b)).** `q(x)` is S3 (6)'s proximity to reliable water (a river bank, a lake or oasis shore, a
  spring, the top well-yield ground); the term adds `w_waterP · q(x)`, `w_waterP` the climate row's prosperity water
  weight. Over epochs a spring or oasis that fails weakens its pull and the quarters around it may decline (V06).""",
"""  **The water term (item 111 (b)).** `q(x)` is S3 (6)'s proximity to reliable water, the same function (a river bank, a
  lake shore, the top well-yield ground, and a spring-fed body's shore and source weighted by its `spring.flow`); the term
  adds `w_waterP · q(x)`, `w_waterP` the climate row's prosperity water weight. A failing spring weakens its pull through
  `spring.flow` (§2.3; V06 §3.12.1), read at the field's next evaluation, so the quarters around it may decline (V06).""",
  'VPC-25')

E(H45, """(iv) the sampler's digest
  (§6.2's hash of the positions, the points and the layout) is recorded by every stored or derived mask that reads it, and
  a mask whose digest differs is recomputed whole;""",
"""(iv) the sampler's digest
  (§6.2's hash of the positions, the points and the layout) is recorded by every stored or derived mask that reads it, and
  a mask whose digest differs is recomputed whole by its writer — the terrain, wall and island masks by the pass that reads
  them; the building-shade mask, whose one writer is V06 §3.4's epoch field phase (file f item 275), counts as zero
  building shade until the next epoch's field phase recomputes it (J-V6.129);""", 'VPC-27')

E(H45, """at an epoch the previous epoch's buildings do (V06 §3.4), so a quarter walled in by tall new""",
       """at an epoch the previous epoch's buildings do, through the building-shade mask V06 §3.4's epoch field phase writes
  ((iv)), so a quarter walled in by tall new""", 'VPC-27')

E(H45, """and how the class-mix weights
  (§4.7 S10b, item 71) are read at a plot's value — and an end band takes the end row.""",
"""and how the class-mix weights
  (§4.7 S10b, item 71) are read at a plot's value — and an end band takes the end row. A **discrete cell** (an
  enumeration, a flag, a key, or a count read whole: a value no interpolation can blend) at a band without a row reads
  the nearest rowed band below it, and an end band below every row the lowest row — under the four-row tables `squalid`
  reads the poor cell and `comfortable` the modest cell (V03's J-V3.28) — so a discrete column switches at the lower cut of
  the next rowed band above, the one reading §4.7 S11, §10.2's templates, V03 §3.2 and V11 §3.6.1 cite.""", 'VAF-R0S-20')

E(H45, """   area-bearing assignments, a castle's esplanade, and the squares larger than a block that `squares.quota` (§10.2; V01
   §3.5) sets —""",
"""   area-bearing assignments, a castle's esplanade, and the squares larger than a block that `squares.quota` sets (the base
   table `SquareQuotaRow`, §10.2, read from M2b; its rows V01 §3.5.2) —""", 'VAF-R0S-15')

E(H45, """(d) at every rung, the **void-dwelling part** —
   `voidDwellingHouseholds` of the poorest band for the cavern and ruin voids whose forecast access chance reaches
   `accessForecastMin` (V04 §3.3 P7), placed by V04's F6, its share an `extension` cell — and""",
"""(d) at every rung, the **void-dwelling part** —
   V04 §3.3 P7's derived `voidDwellingHouseholds` (its cells V04 §2.3's `voidDwellings`, `extension` cells) of the poorest
   band, for the cavern and ruin voids whose forecast access chance reaches `accessForecastMin` (V04 §3.3 P7), placed by
   V04's F6 — and""", 'VAL-06')

E(H45, """**Which districts:** S12c covers the ground's districts; a unit run (a sky island's, a standalone
neighbourhood document's) runs its own S12c over its districts (V01 §3.10).""",
"""**Which districts:** S12c covers the ground's districts and the districts of every sky island (the town's
S12c, after SKY-F; V01 §3.10.3 step 5, V05 §3.1); a standalone neighbourhood document's unit run runs its own S12c over
its districts (V01 §3.10).""", 'VAL-03')

E(H45, """**`district-defining`** — a class that
   IS a district (a red-light district, the slums, a foreign quarter, a guild district: dossier institution kinds), and a
   ladder QUARTER record (item 108 (a); §10.2's step table), which also owns its trade's members — inside its district at
   the raised share and, by the class's ordinary spread (item 107), outside it.""",
"""**`district-defining`** — a class that
   IS a district (a dossier QUARTER record's district — a red-light district over its brothels, V11 §3.12; item 108 (a),
   §10.2's step table — whose record also owns its trade's members): inside its district at the raised share and, by the
   class's ordinary spread (item 107), outside it.""", 'VPC-12')

E(H45, """(§10.2's brothel rows; J-A72.51) (a red-light
   district near the docks, the gates and the inns; the slums at the poorest edge, by the `shanty` kind's rows), one
   district per instance,""",
"""(§10.2's brothel rows; J-A72.51) (a red-light
   district near the docks, the gates and the inns), one district per instance,""", 'VPC-12')

E(H45, """its
   band, granularity, greenery and lighting rows are the defining kind's (the slums: the squalid band through the kind's
   `characterOffset`, and §4.7 S11's cluster rows, item 70); its identity's source is `dossier`.""",
"""its
   band, granularity, greenery and lighting rows are the defining kind's; its identity's source is `dossier`. The slums, a
   foreign quarter and a guild district are naming claims whose kind bias reaches their identity rows (§7.7 item 16; V11
   §3.10), never district-defining instances.""", 'VPC-12')
