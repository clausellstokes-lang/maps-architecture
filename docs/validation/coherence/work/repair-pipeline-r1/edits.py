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
the sunlight cell (items 102, 111), and the season columns (item 117; J128: `ClimateRow.seasons`, V11 §2.8's
`ClimateSeasonCells` — the winter's severity and the weeks, 0–51 spring first, of leaf colour, leaf fall, blossom, growing, harvest, hay, ice and snow, a band
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

# ───────────────────────────── §4.6 ─────────────────────────────
E(H46, """district except its reservations (a reservation inside a face is a hole; a `landing` reservation's attach vertex that no""",
"""district except its reservations and its raised ground (a reservation inside a face is a hole; so is every committed
raised part's under-deck strip — the deck's ground projection over its piers and spans, widened by `raised.stripMarginM`
each side (a `hood.constants` cell in `@plat/tables`; V01 §3.17.3 (2) reads the same strip) — with its pier footprints on
ground part 0 (§2.7): no block interior, plot, seed or footprint lies in it, so S10 and S11, which build only inside S8's
blocks, never cut a plot or stand a building there, with or without stage 2, and a strip crossing a face from boundary to
boundary cuts it; a `landing` reservation's attach vertex that no""", 'VEW-08')

E(H46, """No rung restarts anything above F. Every district reports the share of its built
   land left as court or green by substitution (soft bound ≤ 5 %), so MFCG's "empty areas inside city walls" cannot return
   silently.""",
"""No rung restarts anything above F. Every district reports the share of its built
   land left as court or green by substitution (soft bound ≤ 5 %), so MFCG's "empty areas inside city walls" cannot return
   silently. **Bars (F-CUT, M0 (b); §5.2 cites them):** on 10⁵ random concave and holed faces the ladder ends in ≤ 6 kernel
   calls and the face count never decreases; each district reports its substitution residue share, soft bound ≤ 5 %.""",
  'VDC0-01', 'VPC-18')

E(H46, """**The deep-interior rule (IMP-8, GEO-25; J-P15).** When recursion stops and a block's local thickness exceeds twice its
band's plot depth, the district's band row chooses the interior **now, in S8**, by target shares:""",
"""**The deep-interior rule (IMP-8, GEO-25; J-P15).** When recursion stops, S8 writes each block's `Block.depthClass` (§2.5)
with its `interior`: `deep` when the block's local thickness exceeds twice its band's plot depth, else `standard`. For a
`deep` block the district's band row chooses the interior **now, in S8**, by target shares:""", 'VM-R0S-26', 'VPC-26')

# ───────────────────────────── §4.7 ─────────────────────────────
E(H47, """Every plot: `minPlotWidth` 2.5 m and `minInteriorAnglePlot` 12°; every way class c:""",
"""Every plot: `minPlotWidth` 2.5 m and `minInteriorAnglePlot` 12° (FTG's sheared quads, worst-corner p95 22.9°, stay
legal — invariants police validity, not regularity, §5.1 (4)); every way class c:""", 'VK0-02')

E(H47, """a slope steeper than `stepMaxCm ÷ minTerraceDepthM` is not levelled (the base's skirt and stepped wings, or no
plot, reported).""",
"""a slope steeper than `stepMaxCm ÷ minTerraceDepthM` is not levelled (the base's skirt and stepped wings, or no
plot, reported). **A step above `stepMaxCm`** takes ⌈step ÷ `stepMaxCm`⌉ − 1 intermediate terraces, each at least
`minTerraceDepthM` deep and each edge a wall of at most `stepMaxCm`, laid inside the two units; where they do not fit
inside the two units, those units are not levelled on that line (the base's skirt and stepped wings, reported). **A
levelled unit's edge against unlevelled ground** — a way corridor it does not front, a square, a green, an under-deck
strip, a field — takes one `RetainingWall` on the unit's side of the line where the step to the unlevelled ground there
exceeds `terrace.stepMinCm`, by the same rule (up to `stepMaxCm` one wall, above it the terraces, else not levelled), and
none below `stepMinCm` (the base's plinth). **A cliff inside a district** — a `SiteFeature` of kind `cliff` (§2.3) or
ground over the `walls.barriers` table's `cliff` threshold (V11 §3.16.1) — is a hard line as a cliff bank is: no
`RetainingWall` stands on it and no unit is levelled across it; S10's per-frontage regions ((4)) end `shoreSetback`'s
`cliff` distance (§4.2 S1 (8)) short of it, so plots back onto it at that setback from its top and from its foot and none
is cut across it, the band between typed as the shore setback is; so a building's massing stays off the cliff face (V02
§3.18 (f)).""", 'VEW-05')

E(H47, """already holds the ground), on a `reserve` run (the reservation levels itself, S11), or along a bank of kind `cliff` or a
closure arc of kind `cliff` or `sheer` (§4.4) — the cliff face holds the ground.""",
"""already holds the ground), on a `reserve` run (the reservation levels itself, S11), or along a bank of kind `cliff`, a
closure arc of kind `cliff` or `sheer` (§4.4) or a cliff inside a district (above) — the cliff face holds the ground.""",
  'VEW-05')

E(H47, """  `dossier` request, which places at its first closest option with the hard rows it fails reported (§7.7's precedence,
  J-A20.71);""",
"""  `dossier` request, which places at its first closest option with the hard rows it fails reported (§7.7's precedence,
  J-A20.71) — a plot holding a dossier-backed use is never a closest option for another dossier element, a building
  holding one use; **when the map has no seat for a dossier element** (every plot of the current map fails it after the
  displacement at depth 1 and a JOIN, as when a DM adds a few dozen custom institutions to a THORP or HAMLET dossier or a
  hamlet lists more institutions than plots), the element takes a new outside plot the hinterland unit's S10 cuts (§4.9)
  from the hinterland face nearest its affinity district along the busiest arterial leaving the settlement perimeter — the
  edge-belt placement of V06 §3.6 (2) (iii)'s overflow ladder — at its class's plot area, its building by S11's template,
  reported `dossier_edge`: the hinterland always has ground, so this last rung never fails and no dossier element is ever
  left unplaced (§7.7 item 2); a later epoch's siting may move it inward by the least-disruption order;""", 'VEL0-09')

E(H47, """keyed by band with its continuous columns interpolated along the plot's prosperity value and its discrete
columns switching at the band cut (§4.5)""",
"""keyed by band with its continuous columns interpolated along the plot's prosperity value and its discrete
columns read by §4.5's discrete-cell rule (a band without a row reads the nearest rowed band below)""", 'VAF-R0S-20')

E(H47, """and a detached, hovel or compound main
slot's front stands `h` behind the template's setback""",
"""and a detached, hovel or compound main
slot's front stands `h` behind the template's setback (the plot face inset by its per-edge setbacks with `offsetFace`,
§3.4, §3.7)""", 'VK0-12')

E(H47, """`attractCm` (26 cm, §3.2) would be shared""", """`attractCm` (§2.2's `LatticeSpec`; its meaning §3.2 (2)) would be shared""", 'VK0-18')

E(H47, """S11 passes in `BuildingInput` (§2.6) the slot's composition row key,""",
"""S11 passes in `BuildingInput` (§2.6) the slot's composition row key — for a dwelling other than the manor capped by the
rung's grandeur ceiling (S10b's class mix (3): the row's `dwellingFamilies`, `towers`, `turrets`, `gatehouse` and `courts`,
which V02's composition chain reads; item 115 (a), (b)) —""", 'VPC-01')

E(H47, """The default rows raise the larger classes
   monotonically through every band — just above the prosperous cut mostly houses with a few manors, the manor share rising
   toward the rich row, which is all manors (the owner's "a very prosperous location may simply have all manors"); the same
   at every band edge (modest houses among the poor near the modest cut). J-A19.41 holds within a class — its template's
   discrete columns switch at the cut — while the class itself follows the gradient.""",
"""The default rows raise the larger classes
   monotonically through every band — just above the prosperous cut mostly houses with a few manors, the manor share rising
   toward the rich row, which is all manors at TOWN and above (the owner's "a very prosperous location may simply have all
   manors"; below TOWN, the rung ceiling, (3)); the same at every band edge (modest houses among the poor near the modest
   cut). J-A19.41 holds within a class — its template's discrete columns read §4.5's discrete-cell rule — while the class
   itself follows the gradient.""", 'VPC-01', 'VAF-R0S-20')

E(H47, """   metropolis's prosperous quarter holds more manors than a poor town's.
3. **Largest classes on the prime frontages,""",
"""   metropolis's prosperous quarter holds more manors than a poor town's.
3. **The rung ceiling (item 115; J127).** Before the class draw, S10b reads the settlement's rung row of
   `grandeur.ceiling` (§10.2 *Grandeur ceiling*; its rows V11 §3.25.4). On a row that is `enabled` and not
   `allManorsRow` — the THORP, HAMLET and VILLAGE rows — the manor class is admitted only up to the row's `manor.max` and
   only where its `manor.requires` is met (`lordOrSpecified`: a `seigneurial` government or a specified manor;
   `specified`: a specified manor only — a dossier manor, hall or similar record, or a government whose `villageSeat`
   names the manor; V08 §3.16 (3)); the manor's weight in the drawn row goes to the row's largest admitted class, so the
   capped row's rich anchor is that class; `wealthShift` ((2)) moves a dwelling only along its capped row and never raises
   the manor count (item 115 (d)); and S11 caps every other dwelling's composition by the row (S11 *Footprints and
   heights*; item 115 (a), (b)). The "all manors" rich row stands only where the row's `allManorsRow` is true (TOWN and
   above). A dossier-named or hand-placed grand building keeps its design — the ceiling is a default, never a refusal
   (item 101 R2), explained by the clerk (V10). Across a rung change the ceiling applies to the buildings new or rebuilt
   from that epoch, the standing ones keeping their design (item 115 (e); V06 §3.8.5). A row `enabled` false is no
   ceiling — S10b reads the mix as at TOWN (the no-op pin; the parity presets disable every row). The bars are §13.2's
   item-115 rows and T-V11-41.
4. **Largest classes on the prime frontages,""", 'VPC-01')

E(H47, """4. **Households and buildings (item 71 (d); J-A71.44).**""", """5. **Households and buildings (item 71 (d); J-A71.44).**""", 'VPC-01')
E(H47, """5. **Emulation.** The mix is our extension:""", """6. **Emulation.** The mix is our extension:""", 'VPC-01')

# ───────────────────────────── §4.8 ─────────────────────────────
E(H48, """**Graded by stretch (item 106 (c)).** The wall's thickness, height, walk and tower spacing are a `ChainProfile` along the
trace (§2.7), keyed by each arc's defensibility class (§4.4):""",
"""**Graded by stretch (item 106 (c)).** The grade is `Enceinte.stretchClass` (§2.7), a `'full'|'parapet'` step profile on
`wall_class_knot` vertices that S7 writes with the trace's furniture; the wall's thickness, height, walk and tower spacing
read its class's row (V11's `walls.barriers`), keyed by each arc's defensibility class (§4.4):""", 'VPC-26')

E(H48, """At village kinds the light section reads `village.json`'s
`palisade.lightHeightCm`, and item 106 (b)'s reach cap reads `R_s` for the stage radius and `palisade.barrierReachShare`
for the share (V07 §2.2, §3.4).""",
"""At village kinds the light section reads `village.json`'s
`palisade.lightHeightCm`, and item 106 (b)'s reach cap reads `R_s` for the stage radius and `palisade.barrierReachShare`
for the share (V07 §2.2, §3.4).

**Condition at generation (item 114 (d); J127).** S3 and S5a lay every trace `standing`. With no history replay, S7 then
writes each run's `Enceinte.condition` and material (§2.7; item 114 (b)) from §7.7's condition row — the dossier's defence
readiness and wealth (or the blueprint's stand-ins) mapped to the table shares of `walls.condition`'s `generation` cells
(V11 §3.25.3), a `patched` run's material from `walls.patchMaterials` by the enceinte's kind and culture; with the
replay, the replay writes them (§4.11 *History-first generation*). With the row absent, its switch `atGeneration` false,
or its inputs neutral, every run stays `standing` in its robust material (the no-op pin).""", 'VPC-31')

E(H48, """piers as `pier` ways at 12–20 m spacing, straight or branching, on the
harbour and on the open coast (FTG's ≈ 75 m length as a reference), timber or stone by era, each pier carrying its deck
height like a bridge (read by the shadow pass and the 3-D export, §8.4, §11.1);""",
"""piers as `pier` ways at 12–20 m spacing, straight or branching, on the
harbour and on the open coast (FTG's ≈ 75 m length as a reference), timber or stone by era, each pier carrying its deck
height like a bridge (read by the projected shadows (`shadowPass`) and the 3-D export, §8.4, §11.1); no pier, mole or
breakwater arm is rooted on a bank of kind `cliff` (§4.2 S1 (7)) — a cliff-bound shore takes none, so it offers no deck
plot (§4.7 *Deck plots*; §4.13) — and a quay stands only where the bank class is `quay`;""", 'VPC-16', 'VEW-06')

# ───────────────────────────── §4.9 ─────────────────────────────
E(H49, """`FarmTable { arableHaPerCapita (era, with provenance), householdsPerFarmstead,
  fieldHaPerFarmstead, fuelM3PerCapitaYear, timberM3PerCapitaYear, coppiceM3PerHaYear, woodM3PerHaYear, extent:
  'fill'|'demand', reserveArable: boolean }` is the only source of the countryside's numbers:""",
"""`FarmTable { arableHaPerCapita (era, with provenance), householdsPerFarmstead,
  fieldHaPerFarmstead, fuelM3PerCapitaYear, timberM3PerCapitaYear, coppiceM3PerHaYear, woodM3PerHaYear,
  meadowHaPerCapita?, pastureHaPerCapita? /* ha per head of meadow, and of pasture and commons: the village rows' cells
  (V07 §3.9 (1)), read at the village rungs by V07 §3.2 (1)'s land law and V07 §3.9 (1)'s land budget (E-38's derived
  2.275 ha per head is the sum of the village rows' five land cells); absent on the base rungs' rows, where the land-use
  rings lay meadow, pasture and commons on the land the fields leave, as below */, extent: 'fill'|'demand', reserveArable:
  boolean }` is the only source of the countryside's numbers:""", 'VAL-14')

E(H49, """land: 'fertile'|'poor'; form?: PlanForm /* read only at village rungs */;""",
"""land: 'fertile'|'poor'; form?: PlanForm /* V07 §2.2's plan forms; read only at village rungs (V07 §3.2 (3)) */;""",
  'VAL-15')

E(H49, """Around an oasis (§4.2 S1 (2)) S12a sites irrigated gardens — `garden_irrigated`
  land-use faces (§2.7) fed by short channels from the spring, within the climate row's channel reach of the water, sized
  by the oasis's area band (V11) —""",
"""Around an oasis (§4.2 S1 (2)) S12a sites irrigated gardens — `LandUse` faces of
  kind `garden` (§2.7) whose `fedBy` names the oasis's water body, fed by short channels drawn from that link (§8.2),
  within the climate row's channel reach of the water, sized by the oasis's area band (V11) —""", 'VM-R0S-12', 'VPC-24')

E(H49, """| oasis grove (item 111 (a)) | climate row | the shore band of an oasis | `grove` of the climate row's grove trees (palms or the culture's) |""",
"""| oasis grove (item 111 (a)) | climate row | the shore band of an oasis | `grove` of the climate row's grove trees (palms or the culture's), its `Greenery` naming the water body in `fedBy` (§2.7) |""",
  'VPC-24')

E(H49, """scatter densities, and the dry-country cells (aridity, the arid water chances, the oasis rows, the water-pull weights,
  the sunlight cell; items 102, 111; V11);""",
"""scatter densities, the dry-country cells (aridity, the arid water chances, the oasis rows, the water-pull weights,
  the sunlight cell; items 102, 111; V11) and the season columns (item 117; J128: `ClimateRow.seasons`, the shape V11
  §2.8's `ClimateSeasonCells`, its values V11 §3.25.6 — the winter's severity and the leaf, blossom, growing, harvest,
  hay, ice and snow weeks; read only by §8.2's season rows, §11's exports and §7.7's season derivation row, never by a
  stage, so no season changes the model or its hash, item 117 (a));""", 'VPC-02')

# ───────────────────────────── §4.11 ─────────────────────────────
E(H411, """rung 2's `densify … back_court`, for the rear plots it creates only;""",
"""rung 2's `densify … back_court`, for the rear plots it creates only (their new stock's band; the front plot keeps its
    own);""", 'VPC-11')

E(H411, """`vacate` fires only when its last household leaves; the strike pool (below) draws per
    building, deciding whose households leave first, and strikes fabric by its exposure (item 28 (f) with item 8;
    J-A28.45);""",
"""`vacate` fires only when its last household leaves; which dwellings empty is decided by the
    evolution engine's departure matching (V06 §3.5.1: the roster's suffix matched to exposure-weighted dwellings by band),
    and the strike pool (below; V06 §3.5.2) strikes fabric only, by its exposure (item 28 (f) with item 8; J-A28.45);""",
  'VPC-22', 'VRC0S-12')

E(H411, """below), the passage sealing's (`HiddenOp`, item 30 (e), below) and the underground's own kinds (item 65: the buried old
town's `RaiseGrade`, II.7.6, and the undercity's `ClearUndercity`, II.7.5, declared there); §7.1's `convert` event carries
it, and `build` below is §7.1's `build` event:""",
"""below), the passage sealing's (`HiddenOp`, item 30 (e), below), the underground's own kinds (item 65: the buried old
town's `RaiseGrade`, II.7.6, and the undercity's `ClearUndercity`, II.7.5, declared there) and the evolution engine's
(`EvolveOp`, file f item 209, declared in V06 §2.8); §7.1's `convert` event carries it, and `build` below is §7.1's
`build` event:""", 'VPC-22')

E(H411, """  | LadderOp | DeclineOp | UseConversionOp | TerrainWaterOp | HiddenOp | RaiseGrade | ClearUndercity;""",
"""  | LadderOp | DeclineOp | UseConversionOp | TerrainWaterOp | HiddenOp | RaiseGrade | ClearUndercity | EvolveOp;
// EvolveOp as V06 §2.8 states it — absorbWall, downgradeWay, upgradeWay, burn, wearWall (item 114), repairWall { enceinte,
// stretch?, material? }, retypeLand, repairRaised, repairRetaining — each usable by hand through `convert` (§7.1) with an
// undo record (§7.4) and the cause `convert:<op>`; a hand repair of stone that is gone bends (item 101 R2) to a new
// stretch or part on its line""", 'VPC-22')

E(H411, """  dossier?: EditEvent[] /* the host's dossier events (author 'host', EditBase.dossier set), in the host's order, applied at step (e) (§7.7 item 6); each keeps its EditBase.dossierChange (§7.1, item 75) */ }""",
"""  dossier?: EditEvent[] /* the host's dossier events (author 'host', EditBase.dossier set), in the host's order, applied at step (e) (§7.7 item 6); each keeps its EditBase.dossierChange (§7.1, item 75) */;
  wealthLevel?: number /* file f item 343: the intent wealth level at the epoch (§7.7 layer 1) — a dossier's wealth.label through tables/dossier/wealth (DR6), or a standalone trajectory's; absent: the level in force; applied past dial.hysteresis before S6 (V06 §3.3.5) */;
  advance?: { group: string; index: number; of: number /* the planned count */; stoppedAt?: number /* on the group's last epoch only, when Stop ended it early: the count actually folded */; trajectory?: Trajectory /* index 0 only; V06 §2.3 */ } /* file f item 343: the provenance of an epoch an advance request appended (V06 §2.3) */;
  replay?: { index: number; of: number; fromYearsAgo: number; toYearsAgo: number; events: ReplayEventRef[]; destruction?: ReplayEpoch['destruction']; refound?: ReplayEpoch['refound'] } /* item 113: a replay epoch's provenance (V06 §2.14 declares ReplayEventRef and ReplayEpoch) */ }""",
  'VDC0-09', 'VPC-22')

E(H411, """reproducing the path above byte for byte; V06's `'history'` strategy adds the steps `prelude`, `hazards`, `fortification`,
`terrainWater`, `raisedWays`, `close` and the participant steps at V06 §3.2's places.""",
"""reproducing the path above byte for byte. V06's `'history'` strategy implements every step of V06 §3.2's order: it
reuses the base phases `demand`, `dossier`, `lapse` and `character`, wraps the base parts of `prelude`, `field`, `siting`,
`growth` and `works` with its own acts, and adds its own phases at `hazards`, `uses`, `departures`, `decline`,
`fortification`, `terrainWater`, `raisedWays`, `ladder` and `close` (V06 §3.1 (2)); participants run at `afterField`,
`decline` and `afterGrowth`.""", 'VAT0-06')

E(H411, """they draw on
   the ordinary `…/epoch=e` streams (§6.1), so the replay is deterministic from the seed and the history;""",
"""they draw on
   the concerns of the stages each epoch runs, keyed with the replay's own epoch component (§6.1 *The history replay*:
   the range reserved to the replay), so the replay is deterministic from the seed and the history and no replay draw
   equals a live epoch's;""", 'VAT0-07')

E(H411, """`CalendarRow` gives the week of the year, `(week mod 52) + 1`, and its season:""",
"""`CalendarRow` gives the week of the year, `floorMod(week, 52) + 1` (the floored modulo, so a negative week of the
   replayed past maps into 1 … 52; V06 §3.20.3), and its season:""", 'VPC-23')

E(H411, """routed to the village product when one is registered (V07
§2.1, §3.11), else refused""", """routed to the village product when one is registered (V07
§2.1, V07 §3.11), else refused""", 'VK0-22')

E(H411, """**The epoch-spread mutation (item 18 (c)).** Across epochs a designation change is not applied at once: the engine issues
§4.7 S11's `MutationRecord` as a sequence of `mutate` events over the ladder's rung durations (item 31) — first occupy,
when the present design is compatible (every kept part, nothing added); then adapt; then extend (the adds); and rebuild
only the parts that cannot be adapted — the same steps and the same draws, spread in time, so a smith moving into a richer
street mutates toward the richer template over epochs. Each of those events decides and records its step at once, as a host
or user change does (§4.7 S11 step 6), and a Works shows it on the ground over the weeks it takes (*Works*, below;
J-A67.49), so the model never changes between events.""",
"""**The epoch-spread mutation (item 18 (c), (e); file f item 266).** Across epochs a designation change is not applied at
once: the engine issues §4.7 S11's `MutationRecord`, **decided once at the creating op**, as a sequence of `mutate` events
each applying its own parts of that record, due at the evolution table's `mutation.stepYears` rows (V06 §2.2) — first
occupy, when the present design is compatible (every kept part, nothing added; an always-crypt target's crypt basement
exempt and laid then); otherwise the use opens at the first step whose result is compatible, a relocating use staying at
its former site until then; then adapt; then extend (the adds); and rebuild only the parts that cannot be adapted — the
same steps and the same draws, spread in time, so a smith moving into a richer street mutates toward the richer template
over epochs. A plan cancelled because its use left keeps its done steps; when the building next takes its former
designation, the mutator's record is the inverse of the done steps (item 18 (e)). Each of those events applies and records
its step at once, and a Works shows it on the ground over the weeks it takes (*Works*, below; J-A67.49), so the model
never changes between events.""", 'VPC-22')

E(H411, """ways instead, every existing entity kept (V06's `under.extend`); an epoch whose residual is ≤ 0 grows no stage and adds no
  face.""",
"""ways instead, every existing entity kept (V06's `under.extend`); an epoch whose residual is ≤ 0 grows no stage and adds no
  face — the owner-staged history engine's two exceptions excepted (V06 §3.6; file f item 336): a stage for the overflow
  backlog, whose households are those its overflow ladder housed in earlier epochs, and a decrowding stage, whose
  households are the crowded ones it moves. That engine places its own tiers between (5) and (6): (5′) the upgrade of
  downgraded ways and the reopening of retired ones (V07's hollow ways, `reopenWay`) and (5″) crowding within a factor of
  the band row (V06 §3.8); and every placement that engine makes on a plot whose access edge is a retired way reopens that
  way, with any retired way on its path to the ways in use, in the same batch first (V06 §3.8.2).""", 'VDC0-08', 'VPC-22')

E(H411, """repairRaised's deck form restores the host's former existence from the striking op's undo record""",
"""repairRaised's deck form restores the host's former existence from the striking op's undo record
  | { op: 'retireWay' | 'effaceWay' | 'reopenWay'; way: Id }                                // file f item 268 (b): a way of a land class on ground part 0 at a village rung (V07 §3.12): retire — in use → abandoned (a hollow way, read by no router, tracker or merge test); efface — abandoned → decayed; reopen — a hollow way back to built, regrowth first; issued through the product's epoch rows (V06's ProductDeclEpoch.rows) or by hand through `convert`; never on a deck, a ford or a raised part""",
  'VM-R0S-15', 'VPC-32')

# ───────────────────────────── §4.12 ─────────────────────────────
E(H412, """```ts
interface StageDecl { id: StageId;""",
"""```ts
type StageId = string /* a registered stage's id: 'S0' … 'S15' and their lettered stages, a hook's own id, a product's stage (V07 §3.0), a tail stage (II.7; V04 §3.1's U-NET … U-LINK) — the stream keys' stage component (§6.1); read by §3.3's BatchScope and §4.1's quality budget */;
interface StageDecl { id: StageId;""", 'VPC-29')

E(H412, """interface PlotStrategy     { plots(block: Block, alloc: Allocation, ctx: StageContext, k: Kernel): KernelResult<Plot[]> }        // S10 (1)–(10)
interface SitePlanStrategy { sitePlan(plot: Plot, to: Designation, ctx: StageContext, k: Kernel): KernelResult<MutationRecord> } // S11 (through the designation mutator)
""",
"""// PlotStrategy (S10 (1)–(10)) and SitePlanStrategy (S11, through the designation mutator) are §14's declarations
""", 'VPC-28')

E(H412, """type EditRef = { seq: number /* the causing event, §7.1 */ }; type RuleRef = SliceRef /* the rule row that caused it, §2.8 */;
type FabricStrategyId = 'bent-cut' | string /* the registered fabrics: BentCutFabric; V01's TemplateFabric rows; V07's 'village-ways' */;
```""",
"""// EditRef and RuleRef are §2.8's; FabricStrategyId is §2.5's
```""", 'VM-R0S-07', 'VM-R0S-18')

E(H412, """The owner-staged layers register the same way — `SkyStrategy` after S7b (SKY, §4.1), `SewerStrategy` after S11, and after
the network stage `UndergroundSystemStrategy` (the void systems), `UndergroundStrategy` (the sewer-front neighbourhoods),
`UndercityStrategy` and last `UndergroundLinkStrategy`, each by declared I/O and `phase: 'tail'` (II.6, II.7.3–II.7.6) —
and the base registers none of them.""",
"""The owner-staged layers register the same way — `SkyStrategy` after S7b (SKY, §4.1), and in the tail `SewerStrategy`
(U-NET), then `UndergroundSystemStrategy` (U-SYS, the void systems), `AccessPassStrategy` (U-ACCESS, the access pass),
`UndergroundStrategy` (U-FRONT, the sewer-front neighbourhoods), `UndercityStrategy` (U-CITY) and last
`UndergroundLinkStrategy` (U-LINK), each by declared I/O and `phase: 'tail'`, in V04 §3.1's order (II.6, II.7.2–II.7.6) —
and the base registers none of them.""", 'VAL-01', 'VPC-17')

# ───────────────────────────── §4.13 ─────────────────────────────
E(H413, """| EP-14 | an epoch | a target equal to the population; a residual ≤ 0 | §4.11 (the one path; regrowth-first) | — (defined) |
| EP-15 | history-first generation | no peak, a founding after the present, a peak below the present or above the cap | §4.11 *History-first generation* (7) | report |""",
"""| EP-14 | an epoch | a target equal to the population; a residual ≤ 0; a spring at `flow` 0 (it pulls nothing, its water body standing) | §4.11 (the one path; regrowth-first); §4.2 S3 (6) and §4.5's water term (`spring.flow`) | — (defined) |
| EP-15 | history-first generation | no peak, a founding after the present, a peak below the present or above the cap; a replay starting 300 years before a week-0 creation (a valid season at every epoch) | §4.11 *History-first generation* (7); *The clock* (3)'s floored week | report |""",
  'VPC-25', 'VPC-23')

E(H413, """| EP-19 | II.7.1 – II.7.6 | each edge the underground sections state (no network, one tunnel, the caps, every rung, the toggles and presets, the lifecycle) | II.7.1 – II.7.6 at each rule; II.7.4 *Limits* | F-UNDER, F-VOID |""",
"""| EP-19 | II.7.1 – II.7.6 | each edge the underground sections state (no network, one tunnel, the caps, every rung, the toggles and presets, the lifecycle) | II.7.1 – II.7.6 at each rule; II.7.4 *Limits* | F-UNDER, F-VOID |
| EP-20 | S3 (6), S5a, S5d | less reachable land than a stage asks — fixtures: an island town on an island of half the stage-1 land, a fjord site, a METROPOLIS at the cap in a narrow valley | §4.2 S3 (6) (the capped `t`, the frame arc); §4.4 S5a (a stage with no land folded), S5d (no top-up without land) | simpler shape (the capped level set) → leave out and report (`requestedVsBuilt`, F-BUDGET-STAGE) |
| EP-21 | S3 (4), (7), (9); S5a | a barrier closing the arcs a gate falls on, or every arc — fixtures: a river loop with N₁ = 5, a mesa town, an island town filling its island | §4.2 S3 (4) (the closed-arc reduction), (7), (9) (every arc closed); §4.4 S5a | retry that piece (the pick re-drawn, ≤ 3) → leave out and report (F-WALL; `walled_by_barriers`); F-CASTLE's re-site |
| EP-22 | S3 (10); S5a's outer moats | a wet moat with no water within reach or on sloping ground — fixtures: a hill town with `moat: 'all'`, an arid town with no river with `moat: 'inner'` | §4.2 S3 (10) *Where a moat holds water*; §4.4 *Outer moats* | simpler shape (the dry `ditch`), reported (`moat_dry`) |
| EP-23 | S3 (5), S4, S5b, S5c | the steepest ground — fixture: a mountainous site, arterials within their class grade or `unserved` | §4.3 *Lattice and costs* (the class grade limit); §5.2 F-ROUTE | simpler shape (the next class's grade) → leave out and report (`unserved`) |
| EP-24 | S10, S11 levelling | a cliff across a district; two plots at a cliff's top and foot; a step above 2 × `stepMaxCm`; a levelled unit beside unlevelled ground | §4.7 *Levelling and retaining walls* | simpler shape (terraces, else skirts and stepped wings) → report |
| EP-25 | S1 (6), S3 (2) | a harbour on a site with a river but no coast — fixtures: a river-only site with `harbour: 'on'`, and with `deep_harbour` | §4.2 S1 (6) (the river or lake harbour) | substitute (a river or lake harbour) → leave out and report (tier 6) |
| EP-26 | S10b's `dossier` request | no seat on the current map for a dossier element — fixture: a THORP dossier with 40 custom institutions absorbed at once, every one placed, the report naming each edge plot | §4.7 S10b *Reconcile and infeasibility* (the last rung) | substitute (a new outside plot), reported `dossier_edge` |""",
  'VEW-02', 'VEW-03', 'VEW-04', 'VEW-10', 'VEW-05', 'VEW-09', 'VEL0-09')

E(H413, """**Where features meet (the combination suite, §13.2, B-EDGE).** Each cell is the outcome where the row's feature meets the
column's; a raised way is generated only at CITY and METROPOLIS and declared at any rung (§4.3); a retaining wall and the
frame stand at every rung; a deck plot at VILLAGE and above (V07's village rows at village rungs).""",
"""**Where features meet (the combination suite, §13.2, B-EDGE).** Each cell is the outcome where the row's feature meets the
column's, then its rung on §5's ladder (*— (defined)* where the cell is a rule with no failure); a raised way is generated
only at CITY and METROPOLIS and declared at any rung (§4.3); a retaining wall and the frame stand at every rung; a deck plot
at VILLAGE and above (V07's village rows at village rungs).""", 'VEW-18')

_cs = [i for i, l in enumerate(lines) if l.startswith('| feature | a raised way (§4.3)')]
assert len(_cs) == 1
_ce = _cs[0]
while lines[_ce + 1].startswith('|'):
    _ce += 1
_combo_old = '\n'.join(lines[_cs[0]:_ce + 1])
_combo_new = open('docs/validation/coherence/work/repair-pipeline-r1/combo-new.txt', encoding='utf-8').read().rstrip('\n')
E(H413, _combo_old, _combo_new, 'VEW-18', 'VEW-05', 'VEW-06', 'VEW-08', 'VEW-02')
