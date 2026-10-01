# edits.py — the edits of lane coherence/repair-pipeline-r2, read by gen.py (exec). Each E(head, old, new, *ids):
# `old` must occur exactly once in the live subsection whose heading starts with `head` (base sha256 137ecc0e…).

# ───────────────────────────── §4.1 ─────────────────────────────
E(H41, "feet: [PointCm, PointCm] /* the two part-0 vertices where its ramps or stairs meet the ground (§3.4) */;",
       "feet: [PointCm, PointCm] /* the positions of the ground-part-0 ends of RaisedWayRecord.feet (§2.7) */;",
  'VKr1-04')

E(H41, "S9b's block dispatch (V01 §3.3, §3.5),", "S9b's block dispatch (V01 §3.3, V01 §3.5),", 'VKr1-08', 'VAL-R1-14')

# ───────────────────────────── §4.2 ─────────────────────────────
# S1 (10): the mining test stated once (R2-28 (a); VAL-R1-08).
E(H42, """**Mining** (item 109 (a) (2)): the site holds mining where
`SiteResources.ore` ≥ 0.5 over the frame, the roster holds a mining class, or the dossier lists a mining deposit (iron,
precious metals, gemstones, coal, copper);""",
"""**Mining** (item 109 (a) (2)): the site holds mining where
at least `miningCellShare` of the frame's land cells hold `SiteResources.ore` ≥ 0.5 (V11 §3.23.1's `under.systems`
cavern-row cell, II.7.6's `UndergroundSystemRow.params`), the roster holds a mining class, or the dossier lists a mining
deposit (iron, precious metals, gemstones, coal, copper) — this test's one statement, which every reader takes through
the flag;""", 'VAL-R1-08')

# S2: "specified" (R2-14; VAF-R1T-04).
E(H42, """`specified` a
specified one only (a dossier manor, hall or similar record, or a government's `villageSeat` naming the manor; V08
§3.16 (3)) — and""",
"""`specified` a
specified one only (V08 §3.16 (3): a dossier-bound record of a class in `grandeur.ceiling`'s `settings.grandClasses`
(V11 §3.25.4), or a dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1)) —
and""", 'VAF-R1T-04')

# S3 (4): which arcs are approachable (VPC-R1-02; VEW-r1-01).
E(H42, """**Closed arcs (item 106 (a)).** The barrier closure of §4.4 S5a step
   1 is classified on the pick contour before the picks, and the picks fall on its approachable arcs only. Where the arcs
   a barrier other than a sea or lake shore closes (a cliff, a gorge, a marsh, a sheer face, a river's banks round a loop)
   take at least `gate.waterfrontShare` of the contour, `N₁ = max(1, ⌊s · N′ + ½⌋)` — `N′` the value after the waterfront
   reduction, `s` the contour's approachable share (a sea or lake shore counted approachable, the waterfront reduction
   having priced it), so the land law's gates keep their density along the walled share — reported as the waterfront
   reduction is; a requested `N₁` keeps its count, its picks on the approachable arcs. A contour with no approachable arc
   walls nothing ((9)).""",
"""**Closed arcs (item 106 (a)).** The barrier closure of §4.4 S5a step
   1 is classified on the pick contour before the picks, each arc by its defensibility row (V11 §3.16.1), and the picks
   fall on its **approachable** arcs only: those whose row does not close (`open`, and `shallowWater` at the base's
   kinds). Where the arcs a barrier other than a sea or lake shore closes (a cliff, a steep slope, a gorge, a marsh, a sheer
   face, a river's banks round a loop) take at least `gate.waterfrontShare` of the contour, `N₁ = max(1, ⌊s · N′ + ½⌋)` —
   `N′` the value after the waterfront reduction, `s` the contour's approachable share (a sea or lake shore counted
   approachable here, the waterfront reduction having priced it), so the land law's gates keep their density along the
   walled share — reported as the waterfront reduction is; a requested `N₁` keeps its count, its picks on the approachable
   arcs. A contour with no approachable arc is (9)'s *every arc closed*.""", 'VPC-R1-02', 'VEW-r1-01')

# S3 (7): (9) (b)'s gate stands on a walled closing arc.
E(H42, """Two routes that cross the boundary at one point cannot both be gates, and a route that first reaches `T = t_1` on a
   closed arc ((4)) gives no gate:""",
"""Two routes that cross the boundary at one point cannot both be gates, and a route that first reaches `T = t_1` on a
   closed arc ((4)) gives no gate — save (9) (b)'s gate, which stands on a walled closing arc —:""", 'VPC-R1-02')

# S3 (9): every arc closed, split by whether a closing row carries a wall (VPC-R1-02 with VEW-r1-01: one text).
E(H42, """**Every arc closed** (a mesa town; an island town
   filling its island under an `open` waterfront, its shore closed by deep water): the stage walls nothing — no `Enceinte`
   is recorded for it and it has no gate — and reads as an unwalled stage for every rule (§5.3's walled-stage rows do not
   apply to it); its routes (5), picked by the land law on the whole contour as an unwalled town's are, enter across the
   barriers, and a requested wall is reported in `requestedVsBuilt` (S3's warning `W_WALLED_BY_BARRIERS`, §5.4).""",
"""**Every arc closed** (no approachable arc, (4)), by
   the closing rows' walls (V11 §3.16.1):
   (a) **every row's wall `none`** (`sheerCliff`, `deepWater`, `gorge`: a mesa ringed by sheer faces; an island town filling
   its island under an `open` waterfront, its shore closed by deep water): the stage walls nothing — no `Enceinte` is
   recorded for it and it has no gate — and reads as an unwalled stage for every rule (§5.3's walled-stage rows do not
   apply to it); its routes (5), picked by the land law on the whole contour as an unwalled town's are, enter across the
   barriers where §4.3's class grade limit admits an edge — a ramp or cleft in a cliff face, a crossing of a gorge (a
   viaduct over it at CITY and METROPOLIS, §4.3), an island town's landings ((13)) — and otherwise take F-ROUTE's last
   rung (`unserved`, reported; §5.2), so a mesa girt by faces steeper than `path`'s `rampMaxGrade` over one lattice step
   has no road in at generation and says so; a requested wall is reported in `requestedVsBuilt` (S3's warning
   `W_WALLED_BY_BARRIERS`, §5.4);
   (b) **some closing rows carry a parapet or a light wall** (the `cliff`, `steepSlope` and `marsh` rows: a mesa below the
   sheer test, a marsh-ringed town): the stage is walled on those arcs by §4.8's grade and records its `Enceinte`, the arcs
   with no wall its closing `arcs` (§4.4 S5a step 1); it takes N₁ = 1 gate (a requested `N₁` keeps its count), picked on
   its walled closing arcs, the least defensible row first — `steepSlope`, then `marsh`, then `cliff` — each pick scored
   among that row's candidates as (4) scores every pick; the gate's route reaches it within §4.3's class grade limit, else
   by F-ROUTE's ladder to `unserved` (§5.2), reported with the walling (`W_WALLED_BY_BARRIERS`).""", 'VPC-R1-02', 'VEW-r1-01')

# ───────────────────────────── §4.3 ─────────────────────────────
E(H43, """and stands no support on a square, a reservation or an oasis's water; a river or canal it may
  span between supports on the two banks within `viaduct.maxSpanM`.""",
"""and stands no support on a square, a reservation or an oasis's water; a river or canal it may
  span between supports on the two banks within `viaduct.maxSpanM` and §2.7's clear-span bound
  (`raisedWays.structure.maxClearSpanM` by material class: a generated course past it drops, `raised_too_long`; a declared
  one bends); the obstacles a support slides off or is omitted over are §2.7's support step's.""", 'VPC-R1-21', 'VM-R1T-08')

# ───────────────────────────── §4.4 ─────────────────────────────
E(H44, """sheer cliff or deep water
   closes; a steep slope or marsh closes behind a light wall; open ground needs the full wall.""",
"""a sheer cliff, deep water or a
   gorge closes with no wall; a cliff closes behind a parapet, a steep slope or a marsh behind a light wall; open ground
   needs the full wall (V11 §3.16.1).""", 'VPC-R1-02')

E(H44, """The trace walls only the approachable arcs, each stretch's ends anchored on its barrier
   (the existing anchor kinds) with a tower at each anchor (§4.8); it records the closing arcs as `Enceinte.arcs` (each by its two anchor
   ends and its `BarrierKind`)""",
"""The trace walls the approachable arcs and the closing arcs whose row carries a wall (graded by §4.8),
   each stretch's ends anchored on its barrier (the existing anchor kinds) with a tower at each anchor (§4.8); it records
   the closing arcs no wall stands on (the closure features, V11 §3.16.1) as `Enceinte.arcs` (each by its two anchor ends
   and its `BarrierKind`)""", 'VPC-R1-02')

E(H44, """a stage whose every arc closes walls nothing
   and records no enceinte, and the arcs a land barrier closes are impassable to routes as the wall is (§4.2 S3 (7), (9)).""",
"""a stage with no approachable arc takes
   §4.2 S3 (9)'s *every arc closed* — walled on the closing arcs whose row carries a wall, with one gate there, or walling
   nothing and recording no enceinte where no closing row carries one — and the arcs a land barrier closes are impassable
   to routes as the wall is (§4.2 S3 (7), (9)).""", 'VPC-R1-02')

# ───────────────────────────── §4.5 ─────────────────────────────
E(H45, "by V05 §3.2–§3.7,", "by V05 §3.2–V05 §3.7,", 'VAL-R1-14', 'VKr1-08')

E(H45, "by its defining class's own relation rows (§10.2's brothel rows; J-A72.51)",
       "by its defining class's own relation rows (the `brothel` class row's soft `nearHarbour`, `nearGate` and `near` an inn rows, V11 §3.5; J-A72.51)",
  'VPC-R1-13')

# ───────────────────────────── §4.6 ─────────────────────────────
# The under-deck strip's margin (R2-26 (d); VPC-R1-24) and a cliff inside a district as S8's hole (VEW-r1-06).
E(H46, """widened by `raised.stripMarginM`
each side (a `hood.constants` cell in `@plat/tables`; V01 §3.17.3 (2) reads the same strip) — with its pier footprints on
ground part 0 (§2.7): no block interior, plot, seed or footprint lies in it, so S10 and S11, which build only inside S8's
blocks, never cut a plot or stand a building there, with or without stage 2, and a strip crossing a face from boundary to
boundary cuts it;""",
"""widened each side by
`raisedWays.structure.stripMarginM` (V11 §3.24.2, shipped with item 110's rows; V01 §3.17.3 (2) reads the same strip) —
with its pier footprints on ground part 0 (§2.7): no block interior, plot, seed or footprint lies in it, so S10 and S11,
which build only inside S8's blocks, never cut a plot or stand a building there, with or without stage 2, and a strip
crossing a face from boundary to boundary cuts it; so is every **cliff inside the district** — an S1 `cliff` `SiteFeature`
(§2.3) or ground over the `walls.barriers` table's `cliff` threshold (V11 §3.16.1), §4.7's hard line — widened above its
top and below its foot by `shoreSetback`'s `cliff` distance (§4.2 S1 (8)), before the face's first cut: no lane, seed,
block interior, plot or footprint lies in it or crosses it, a cliff crossing a face from boundary to boundary cuts it
into faces each cut on its own, their plots backing onto the band (§4.7 *Levelling and retaining walls*), and V01's
fabrics read the band's two edges as V01 §3.6 (7)'s hard `cliff` run;""", 'VPC-R1-24', 'VEW-r1-06')

# ───────────────────────────── §4.7 ─────────────────────────────
# Levelling: step regions with their own datums (VEW-r1-04); the cliff inside a district points at S8 (VEW-r1-06).
E(H47, """**A step above `stepMaxCm`** takes ⌈step ÷ `stepMaxCm`⌉ − 1 intermediate terraces, each at least
`minTerraceDepthM` deep and each edge a wall of at most `stepMaxCm`, laid inside the two units; where they do not fit
inside the two units, those units are not levelled on that line (the base's skirt and stepped wings, reported).""",
"""**A step above `stepMaxCm`** takes ⌈step ÷ `stepMaxCm`⌉ − 1 intermediate terraces, each at least
`minTerraceDepthM` deep and each edge a wall of at most `stepMaxCm`, laid inside the two units — the higher unit first, as
far as its depth allows, then the lower; where they do not fit inside the two units, those units are not levelled on that
line (the base's skirt and stepped wings, reported). **Step regions.** An intermediate terrace splits the unit it lies in
along the contour into step regions, each levelled at its own datum (as V07 §3.8a (2) splits a house platform): the
region fronting the unit's way keeps `platformCm`, and each region beyond an intermediate wall is one `platformSteps`
entry — that wall's line and the region's datum, in order away from the fronting way (`Plot.platformSteps`,
`Block.platformSteps`, §2.5) — written by the same levelling (S11 a plot's; S10 a block's or a ward's), in the unit's leaf
digest and re-derived with it. The datums divide the step into ⌈step ÷ `stepMaxCm`⌉ equal parts, so every wall on the
line retains more than `stepMaxCm` ÷ 2 and at most `stepMaxCm`; each intermediate wall is a `RetainingWall` on its line,
its high side the higher region, and a footprint across a step line is split by §2.6's stepped-wing rule.""", 'VEW-r1-04')

E(H47, """is, like a cliff bank, a hard line: no
`RetainingWall` stands on it and no unit is levelled across it; S10's per-frontage regions ((4)) end `shoreSetback`'s
`cliff` distance (§4.2 S1 (8)) short of it, so plots back onto it""",
"""is, like a cliff bank, a hard line: no
`RetainingWall` stands on it and no unit is levelled across it; it and its setback band are S8's hole (§4.6), so no lane,
seed or plot crosses it, S10's per-frontage regions ((4)) end `shoreSetback`'s `cliff` distance (§4.2 S1 (8)) short of it
and plots back onto it""", 'VEW-r1-06')

E(H47, """the
datum of the levelled plot, block or ward holding `p` on the arena `key`""",
"""the
datum of the step region of the levelled plot, block or ward holding `p` on the arena `key` (its `platformCm`, or the
`platformSteps` entry beyond whose line `p` lies)""", 'VEW-r1-04')

E(H47, """(V05 §3.9
(4)–(5), §3.10 (5))""", """(V05 §3.9
(4)–(5), V05 §3.10 (5))""", 'VAL-R1-14', 'VKr1-08')

# S11's culture specialisation: an exempt use is not counted toward the cap (VAF-R0S-19 = VPC-R1-22).
E(H47, """a user-set, declared or keyword
specialisation is exempt from the chance and the cap and never overwritten —""",
"""a user-set, declared or keyword
specialisation is exempt from the chance and the cap, is not counted toward the cap, and is never overwritten (item 101
R13) —""", 'VAF-R0S-19', 'VPC-R1-22')

E(H47, "(V07 §3.6 (5), §3.10)", "(V07 §3.6 (5), V07 §3.10)", 'VAL-R1-14', 'VKr1-08')

# R2-13: one class vocabulary (VM-R1T-13's pipeline end).
E(H47, "type Designation = { cls: BuildingClass; use: string /* the roster class id */;",
       "type Designation = { cls: BuildingClass; use: BuildingClass /* the roster class id */;", 'R2-13')
E(H47, "interface PlacementItem { cls: string /* roster class id */;",
       "interface PlacementItem { cls: BuildingClass /* roster class id */;", 'R2-13')

# S10b (3): "specified" (R2-14; VAF-R1T-04).
E(H47, """`specified`: a specified manor only — a dossier manor, hall or similar record, or a government whose `villageSeat`
   names the manor; V08 §3.16 (3));""",
"""`specified`: a specified manor only — V08 §3.16 (3): a dossier-bound record of a class in `grandeur.ceiling`'s
   `settings.grandClasses` (V11 §3.25.4), or a dossier government whose `villageSeat` names the manor house, seigneurial
   or crown (V11 §3.21.1));""", 'VAF-R1T-04')

# ───────────────────────────── §4.8 ─────────────────────────────
E(H48, "for the share (V07 §2.2, §3.4).", "for the share (V07 §2.2, V07 §3.4).", 'VAL-R1-14', 'VKr1-08')

E(H48, "`quay` ways along the waterfront (bank class `quay`)", "`quay` ways along the waterfront (bank kind `quay`)", 'VPC-R1-18')
E(H48, "and a quay stands only where the bank class is `quay`;",
       "and a quay stands only where the bank kind is `quay` (§4.2 S1 (7));", 'VPC-R1-18')

# Condition at generation cites §2.7's welded stretch (R2-27 (a)).
E(H48, """(V11 §3.25.3), a `patched` run's material from `walls.patchMaterials` by the enceinte's kind and culture; with the
replay, the replay writes them""",
"""(V11 §3.25.3), a `patched` run's material from `walls.patchMaterials` by the enceinte's kind and culture — along an
`on_enceinte` castle's shared stretch (`Castle.cityWeld`) one draw, on the town enceinte, sets the stretch's condition and
material and the bailey's profiles there mirror them in the same batch (§2.7 *An enceinte's condition by run*: the
castle's welded stretch); with the
replay, the replay writes them""", 'R2-27')

# ───────────────────────────── §4.11 ─────────────────────────────
# Step (c): the protected dwelling's exception (R2-18 (a); VEL1-02).
E(H411, """building whose household count falls but not to zero takes a `relet` down (an unstored plan rung `stale`, a stored plan
    re-cut in the event) and `vacate` fires only when its last household leaves;""",
"""building whose household count falls but not to zero takes a `relet` down (an unstored plan rung `stale`, a stored plan
    re-cut in the event) and `vacate` fires only when its last household leaves — save at a locked or pinned dwelling a
    dossier population fall emptied (§7.7's precedence), whose last household leaves by a `relet` down to 0 and which is
    never vacated (§13.2's T20-15);""", 'VEL1-02')

E(H411, """within §2.6's capacity (J-A28.23); a stored plan is re-cut inside this event""",
"""within §2.6's capacity (J-A28.23) — 0 only at a locked or pinned dwelling a dossier population fall emptied (§7.7's precedence; §2.6's clamp); a stored plan is re-cut inside this event""", 'VEL1-02')

E(H411, """— a `relet` down
  while households remain, `vacate` at a building's last household (J-A28.45);""",
"""— a `relet` down
  while households remain, `vacate` at a building's last household (J-A28.45), save at a locked or pinned dwelling a
  dossier population fall emptied, which a `relet` down to 0 empties and which is never vacated (§7.7's precedence);""",
  'VEL1-02')

# EpochInputs.week and The clock (1)–(2): the week from the dossier's own ticks (item 125; R2-40 (1); G125-pipeline = VPC-R1-27).
E(H411, """week?: number /* item 76: the absolute week at the epoch (The clock, below) — a dossier-bound map's is SettlementForge's calendar.elapsedWeeks; absent""",
"""week?: number /* item 76: the absolute week at the epoch (The clock, below) — a dossier-bound map's from the dossier's own stamped ticks (The clock (1); item 125); absent""",
  'G125-pipeline', 'VPC-R1-27')

E(H411, """1. **The week.** The map's time is an integer week. For a dossier-bound map it is SettlementForge's `calendar.elapsedWeeks`
   — no conversion; never `elapsedMonths`, never `history.age` — and its creation week is the port's `HostContext.week`
   (§14) or 0; a standalone map starts at week 0.""",
"""1. **The week.** The map's time is an integer week, in SettlementForge's own weeks — no conversion; never
   `elapsedMonths`, never `history.age`. A dossier-bound map's present week is the dossier's own latest stamped tick — the
   greatest of its conditions' `triggeredAt`, its calamities' and its history's ticks (item 125 (a), (b)), never the
   campaign's calendar or any host input; with none, the clock starts at week 0 and the user's season control sets
   the year position (§2.9's `yearWeek`: midsummer, week 19, by default). Its creation week is the present week of the dossier it is
   created from; a standalone map starts at week 0.""", 'G125-pipeline', 'VPC-R1-27')

E(H411, """then the week suffix of the change's outcome id, then `HostContext.week`, then none:""",
"""then the week suffix of the change's outcome id, then none:""", 'G125-pipeline', 'VPC-R1-27')

# The clock (4): the catch-up coarsened under item 119 (R2-31 (a)).
E(H411, """a catch-up batch follows the same rule, gaps allowed.""",
"""a catch-up batch follows the same rule, gaps allowed, coarsened under item 119's comfort level by V06 §6.8 (6) (every
   dossier event still at its own week).""", 'R2-31')

# Works (9): a host's week is a view command (item 125 (c)).
E(H411, """— a host setting its campaign week, or a user scrubbing
   —""", """— a host's view command setting a week (item 125 (c); §11.3), or a user scrubbing
   —""", 'G125-pipeline')

# The walls ladder names item 114's worn and patched runs (R2-27 (c); VPC-R1-03).
E(H411, """(`decayed` while any run is
  not standing: the run's `Enceinte.condition` profile, `breached` or `dismantled`, §2.7, item 575)""",
"""(`decayed` while any run is
  not `standing` — `worn` or `patched` (item 114), `breached` or `dismantled`: the run's `Enceinte.condition` profile, §2.7,
  item 575)""", 'VPC-R1-03')

# Regrowth-first: hollow ways (VPC-R1-18 (b)).
E(H411, """the reopening of retired ones (V07's hollow ways, `reopenWay`)""",
       """the reopening of hollow ones (V07's hollow ways, `reopenWay`)""", 'VPC-R1-18')
E(H411, """whose access edge is a retired way reopens that
  way, with any retired way on its path""",
"""whose access edge is a hollow way reopens that
  way, with any hollow way on its path""", 'VPC-R1-18')

E(H411, """"Our
simulator" is the clock that changes the map's inputs — the host's (SettlementForge's) or the staged evolution engine's —""",
""""Our
simulator" is the clock that changes the map's inputs — the host's (SettlementForge's, read only through the dossier's
stamped ticks, item 125) or the staged evolution engine's —""", 'G125-pipeline')

# ───────────────────────────── §4.13 ─────────────────────────────
E(H413, """| EP-21 | S3 (4), (7), (9); S5a | a barrier closing the arcs a gate falls on, or every arc — fixtures: a river loop with N₁ = 5, a mesa town, an island town filling its island | §4.2 S3 (4)'s closed-arc reduction, (7), (9) (every arc closed); §4.4 S5a | retry that piece (the pick re-drawn, ≤ 3) → leave out and report (F-WALL; `W_WALLED_BY_BARRIERS`); F-CASTLE's re-site |""",
"""| EP-21 | S3 (4), (7), (9); S5a | a barrier closing the arcs a gate falls on, or every arc — fixtures: a river loop with N₁ = 5; a mesa ringed by sheer faces (every route in within its class grade, or `unserved` reported; 0 routes steeper than `path`'s limit); a mesa below the sheer test and a marsh-ringed town (walled on their `cliff`, `steepSlope` or `marsh` arcs with one gate, its route within its class grade or `unserved` reported); an island town filling its island | §4.2 S3 (4)'s closed-arc reduction, (7), (9) (every arc closed: (a) unwalled, (b) walled on its walled closing arcs); §4.4 S5a | retry that piece (the pick re-drawn, ≤ 3) → simpler shape (the next class's grade, F-ROUTE) → leave out and report (F-WALL; `unserved`; `W_WALLED_BY_BARRIERS`); F-CASTLE's re-site |""",
  'VEW-r1-01', 'VPC-R1-02')

E(H413, """| EP-24 | S10, S11 levelling | a cliff across a district; two plots at a cliff's top and foot; a step above 2 × `stepMaxCm`; a levelled unit beside unlevelled ground | §4.7 *Levelling and retaining walls* | simpler shape (terraces, else skirts and stepped wings) → report |""",
"""| EP-24 | S8's cliff band; S10, S11 levelling | a cliff across a district (0 lanes, seeds or ground way spines crossing the cliff line; the two sides' plots backing onto it at the `cliff` setback); two plots at a cliff's top and foot; a step of 2.5 × `stepMaxCm` (`levelledGroundCm` on each terrace equals its datum; every wall's `stepProfile` lies in (`stepMinCm`, `stepMaxCm`]); a levelled unit beside unlevelled ground | §4.6 (a cliff inside the district a hole); §4.7 *Levelling and retaining walls* (step regions) | simpler shape (terraces, else skirts and stepped wings) → report |""",
  'VEW-r1-04', 'VEW-r1-06')

E(H413, """| EP-26 | S10b's `dossier` request | no seat on the current map for a dossier element — fixture: a THORP dossier with 40 custom institutions absorbed at once, every one placed, the report naming each edge plot |""",
"""| EP-26 | S10b's `dossier` request | no seat on the current map for a dossier element — fixtures: a 1 500-person TOWN dossier listing more dossier institutions than its plots (every one placed, the report naming each edge plot); and, run with V07 registered (V07's village rows), a THORP dossier with 40 custom institutions absorbed at once, every one placed, the report naming each edge plot |""",
  'VPC-R1-25')

# EP-27: item 122's crisis looks at their limits (G122-pipeline, G122h-pipeline; principle (11)).
E(H413, """(the last rung) | substitute (a new outside plot), reported `W_DOSSIER_EDGE` |""",
"""(the last rung) | substitute (a new outside plot), reported `W_DOSSIER_EDGE` |
| EP-27 | §10.2's crisis looks (a look only) | no outskirts land left in the frame and margin; an island town; a siege of an unwalled place; a mesa whose every arc is a closure feature; THORP to the METROPOLIS cap; two and three crises at once; a force larger than the frame and margin; a headcount of 0 or none given; an unmapped stressor type or archetype; a condition whose `untilWeek` is not after its `sinceWeek`; no condition and no preview — at each, the document and its hash unchanged by the look, and nothing on water, a gate's passage or a label's keep-out | §10.2 *Crisis looks* (b)–(h) | simpler shape (what does not fit drawn as §8.8's massed marks; the severity-and-tier scale where no headcount is given) → report (`unmapped_word`) |""",
  'G122-pipeline', 'G122h-pipeline')

E(H413, """within `viaduct.maxSpanM`; never out over the sea (its ends are ground vertices); a moat spanned outside its wall strip. *Rung:* — (defined: §2.7's support step) |""",
"""within `viaduct.maxSpanM` and §2.7's clear-span bound (`raisedWays.structure.maxClearSpanM` by material) — a crossing wider than it drops a generated course (`raised_too_long`) and bends a declared one; never out over the sea (its ends are ground vertices); a moat spanned outside its wall strip. *Rung:* leave out and report (generated); simpler shape (declared, bent) |""",
  'VM-R1T-08', 'VPC-R1-21')

E(H413, """| wall | crosses only on a gate's line or as the aqueduct's arch; no support in a wall strip. *Rung:* — (defined) |""",
"""| wall | crosses only on a gate's line or as the aqueduct's arch; no support in a wall strip but the crossing's station on the band (§2.7's support step (3)). *Rung:* — (defined) |""",
  'R2-26')

# ───────────────────────────── §10.2 ─────────────────────────────
# RosterTables: the grandeur table with its settings row (VPC-01) and the crisis table (G122-pipeline; R2-37 (3)).
E(H102, """  grandeur: GrandeurCeilingRow[] /* item 115: one row per rung, below (*Grandeur ceiling*) */;""",
"""  grandeur: { ceiling: GrandeurCeilingRow[]; settings: GrandeurCeilingSettings } /* item 115: the table 'grandeur.ceiling', one row per rung and its named row 'settings', below (*Grandeur ceiling*) */;""",
  'VPC-01')

E(H102, """item 118: a look only, below (*Festival decorations*) */;""",
"""item 118: a look only, below (*Festival decorations*) */;
  crisis: { looks: CrisisLookRow[]; map: CrisisMapRow[]; settings: CrisisLookSettings } /* item 122: a look only, below (*Crisis looks*) */;""",
  'G122-pipeline')

E(H102, """and GrandeurCeilingRow, DecorationRow, StagingKeywordRow, StagingPlace, FestivalKind, MotifRow, GenericFestivalRow and QualitySpendRow (items 115, 118, 119) as V11 §2.8d gives them;""",
"""and DecorationRow, StagingKeywordRow, StagingPlace, FestivalKind, MotifRow, GenericFestivalRow and QualitySpendRow (items 118, 119) as V11 §2.8d gives them; GrandeurCeilingRow and GrandeurCeilingSettings (item 115) and the crisis look shapes (item 122) are declared below;""",
  'VPC-01', 'G122-pipeline')

E(H102, "PLaw and PresenceWhen are V07 §2.2's and §2.4's */;", "PLaw and PresenceWhen are V07 §2.2's and V07 §2.4's */;", 'VAL-R1-14', 'VKr1-08')

# After SquareQuotaRow: the grandeur shapes (VPC-01; R2-13) and the crisis look shapes (G122-pipeline, G122h-pipeline; R2-37 (3)).
E(H102, """  band: string; haPer1000: number /* typed-square target per 1 000 inhabitants of the district */; kind: Partial<Record<DistrictKind, number>> /* factor */ }
```""",
"""  band: string; haPer1000: number /* typed-square target per 1 000 inhabitants of the district */; kind: Partial<Record<DistrictKind, number>> /* factor */ }
interface GrandeurCeilingRow {   // table 'grandeur.ceiling' (V11 registry row 97); key 'rung'; its rows V11 §3.25.4 (item 115)
  rung: Rung; enabled: boolean /* false on every row = no ceiling (the no-op pin); the parity presets false */;
  dwellingFamilies: string[] | 'all' /* V02's composition families a dwelling other than the manor may take */;
  towers: boolean; turrets: boolean; gatehouse: boolean; courts: boolean /* on a dwelling other than the manor */;
  manor: { max: number | 'unbounded'; requires: 'specified'|'lordOrSpecified'|'none' }; allManorsRow: boolean /* S10b's rich row "all manors" applies */ }
interface GrandeurCeilingSettings {   // the named row 'settings' of the same table (V11 §2.1's settings form)
  grandClasses: BuildingClass[] /* the classes whose dossier-bound record SPECIFIES a grand building (V08 §3.16 (3)); live roster.classes keys, V11 §3.25.4 */ }
type CrisisLookKind = 'siege'|'blockade'|'refugeeCamp'|'quarantine'|'famine'|'beast'|'raiders'|'disaster'|'occupation'|'rebellion'|'boom'|'bust';   // item 122 (b)'s looks
type CrisisPlace = 'beyondWalls'|'approachRoads'|'approachByGate'|'outside'|'affectedQuarter'|'fields'|'edge'|'outlyingFarms'|'gatesAndKeep'|'streets'|'neighbourhoods';   // *Crisis looks* (d)
interface CrisisLookRow {   // table 'crisis.looks'; key 'kind'; its rows V11's (item 122; J135)
  kind: CrisisLookKind; place: CrisisPlace /* where its main part stands; a kind's further parts are (f)'s */;
  band: 'city'|'district'|'neighbourhood' /* the coarsest band it shows at (item 122 (d)); §8.2's look rows add detail at each finer band */;
  scale: Record<Rung, [number, number]> /* its extent at severity 0 and 1, linear between — m² of camped ground at a camp place, else the share of its place's units ((c)) */;
  priority: number /* the camp looks' turn on the outskirts, lowest first: siege, then quarantine, then refugees ((e)) */;
  lookLevel?: [number, number] /* the disaster row only: item 123's decay level its districts' buildings draw at severity 0 and 1, linear between */ }
interface CrisisMapRow {   // table 'crisis.map'; key 'from/key': the closed mapping, a dossier row set read at the pinned baseline (V08; its rows V11's)
  from: 'stressor'|'archetype'|'event' /* a SettlementForge stressor type, condition archetype or simulator event */; key: string; look: CrisisLookKind | 'none' }
interface CrisisLookSettings {   // the named row 'settings' of 'crisis.looks' (V11 §2.1's settings form); every cell V11's
  densityCap: number /* the share of the outskirts' free land the camp looks may take together */;
  siegeStandoffM: number /* item 122 (b)'s ≈ 300 m beyond bowshot */;
  areaPerHeadM2: number /* item 122 (h)'s 45 m²: a camp's ground per head, an army's or a travelling group's */;
  enginesPerBesiegers: number /* item 122 (h)'s 1 500: about one siege engine per this many besiegers */;
  previewSeverity: number /* the severity a preview draws its look at (§2.9's `crises`) */ }
```""", 'VPC-01', 'R2-13', 'G122-pipeline', 'G122h-pipeline')

E(H102, "(5) the definition fields when the port receives them (§7.7; optional)",
       "(5) the definition fields when the port receives them, which it does only through the dossier (item 125 (a); §7.7; optional)",
  'G125-pipeline')

E(H102, "**The supply web's rows (items 105, 107; V11 §2.5, §3.7).**", "**The supply web's rows (items 105, 107; V11 §2.5, V11 §3.7).**", 'VAL-R1-14', 'VKr1-08')
E(H102, "seatingExits?: boolean /* V03 §2.4, §3.3 S6 (d) */;", "seatingExits?: boolean /* V03 §2.4, V03 §3.3 S6 (d) */;", 'VAL-R1-14', 'VKr1-08')

# The grandeur bullet (VPC-01).
E(H102, """* **Grandeur ceiling (item 115; J127).** `RosterTables.grandeur` holds one `GrandeurCeilingRow` per rung (V11 §2.8d's
  shape; its rows V11 §3.25.4, registry row 97): `enabled`, the limits on every dwelling but the manor (`dwellingFamilies`,
  `towers`, `turrets`, `gatehouse`, `courts`), the manor's `max` and `requires`, and `allManorsRow`.""",
"""* **Grandeur ceiling (item 115; J127).** `RosterTables.grandeur` holds the table `grandeur.ceiling` (its shapes above;
  its rows V11 §3.25.4, registry row 97): one `GrandeurCeilingRow` per rung — `enabled`, the limits on every dwelling but
  the manor (`dwellingFamilies`, `towers`, `turrets`, `gatehouse`, `courts`), the manor's `max` and `requires`, and
  `allManorsRow` — and the named row `settings`, whose `grandClasses` are the classes whose dossier-bound record specifies
  a grand building (V08 §3.16 (3), the one home of "specified").""", 'VPC-01')

# The crisis looks' rules (G122-pipeline, G122h-pipeline; R2-37; item 122 (a)–(i)).
E(H102, """* **Rows at their limits (EP-18).**""",
"""* **Crisis looks (item 122, with (h)–(i); J135, J138).** `RosterTables.crisis` (its shapes above): the look rows by
  kind (`looks`), the closed mapping from SettlementForge's words to a look (`map`) and the `settings` row — every value
  V11's: the look rows, the `map` rows (a dossier row set whose totality V08 checks at the pinned baseline), the density
  cap, the standoff, the preview severity and item 122 (h)'s rates. The look rows and settings land at M3b with item 118's
  decoration engine, the `map` rows with the port at M-SF (§16); before them the `map` set is empty and every condition
  reads `none`.
  (a) **A look only.** The table is read by §7.7's DR44, §8.2's crisis look rows, §11's picture exports (a battle map's
  image only, never its walls or obstacles), V09's Find listing and the placement services below — never by a stage — so
  no crisis moves, adds or removes a building, way, wall, plot or water edge or changes the model, a digest or the hash,
  and a look stores nothing. What stands in a view is DR44's: each `ConditionOverlay` whose weeks hold the view's week (§2.7's
  reader comment) and whose map row gives a look, admitted at the viewer's key (a withheld condition is never drawn, listed,
  counted or named); §2.9's `crises` key switches the looks off or previews one look with no condition, at
  `previewSeverity` and the map's rung. What a crisis leaves reaches the map only through the epoch path (V06's
  hand-over). An edited row (§7.6) redraws the looks and changes nothing else.
  (b) **The closed mapping.** An overlay reads the `map` row of its source — a `cond:stress:<type>` overlay the `stressor`
  row of its type, an overlay V08 made from a simulator event that event's row, any other the `archetype` row of its
  archetype (V08 §3.11) — and draws the look its row names, or nothing for `none`; the regional_* pressures are `none`. A
  source with no row reads `none`, reported `unmapped_word` (V08), so nothing falls through (T122-4).
  (c) **Scale.** A look's extent at the map's rung is its row's `scale` at severity 0 and 1, linear between (severity
  clamped into [0, 1]): camped ground in m² at a camp place (`beyondWalls`, `approachRoads`, `approachByGate`, `outside`,
  `gatesAndKeep`'s camp), else the share of its place's units ((d)). **By headcount** (item 122 (h)): where the dossier
  gives a force's or a group's size (V08's fields, in development, confirmed by item 125 (d)), its camp is sized by it,
  never by severity — each army its own camp of `areaPerHeadM2` × its heads, a travelling group's (migrants, pilgrims, a
  caravan) at the same rate, so two armies joined make twice the camped ground; where it gives none, the condition's or
  calamity's own count (`exodus`, arrivals) stands for the heads; a size of 0 or less reads as none given; with no count
  at all the scale by severity and tier holds.
  (d) **Placement** is by keyed draws on §8.10's render keys from the seed, the condition's id and the place (DR44; a
  preview keys on its look kind in the condition's stead), never a model stream, so a crisis draws the same in every view
  and export. A look stands only on the ground arena's part 0 and never on water, a way's carriageway, a gate's passage
  (its opening and 4 m along its way each side, as §8.2's festival rows keep it) or a label's keep-out. The outskirts'
  land is V01's `campLand(doc)` — the commons and fallow faces at the districts' outer edges and the approach roads'
  verges by the gates. The **main approach road** is the arterial out of the gate of greatest trade weight (§4.3's
  `TradeFlow`), else the way of greatest trade weight leaving the built edge. Each place ranks its land or units, ties by
  the keyed draw:
  * `beyondWalls` — the land faces at least `siegeStandoffM` beyond the outermost standing enceinte's outer strip
    (`campLand`'s and the hinterland's land-use faces there) along its walled arcs; a closure arc with no wall (V11
    §3.16.1) draws none;
  * `approachRoads` — the verges of each arterial leaving the settlement beyond its built edge, one camp per road; a place
    no road reaches (S3 (9) (a)'s `unserved` mesa) takes the `campLand` nearest its boundary;
  * `approachByGate` — the `campLand` faces along the main approach road by its gate, nearest V06's
    `frontierFor(doc, households)`: where the next growth would seat the camp's people (V06);
  * `outside` — the `campLand` faces furthest from the main approach road, beyond the outermost enceinte's outer strip or,
    unwalled, the built edge;
  * `affectedQuarter` — the district a calamity's `targets` name (matched as `disasterDistricts` matches them, below),
    else the district with the most households per hectare of its land;
  * `fields` — the hinterland's field and pasture faces with the farms' pens (§4.9);
  * `edge` — the outermost enceinte's walled arcs or, unwalled, the districts' outer boundary;
  * `outlyingFarms` — the hinterland's farmsteads (the farm classes' outside plots, §4.9), outermost first;
  * `gatesAndKeep` — the main gates and the castle, else the principal plaza, for its banners; its camp on the
    `campLand` faces nearest them;
  * `streets` — the junctions and frontages of the districts' ways, the principal market's first;
  * `neighbourhoods` — whole districts by V01's `disasterDistricts(doc, overlay, key)`: the calamity's `targets` first,
    else its pattern (fire through contiguous blocks downwind from a keyed seed district, flood on the low ground by the
    water, earthquake scattered), the `disaster` row's `scale` the share of districts; at THORP, HAMLET and VILLAGE V07's
    ends (V07). Every building of a returned district draws item 123's damage at the row's `lookLevel` by severity, or at
    its own decay level where that is higher (V02, V03, V04; nothing stored) — no second, per-building share.
  (e) **Several at once** (item 122 (c)). The camp looks take the outskirts in `priority` order (siege, then quarantine,
  then refugees; ties by condition id), each from what the earlier left, together at most `densityCap` of the outskirts'
  free land. A camp that cannot take its ground — the cap reached, the frame and its margin full, a force too large for
  that land (item 122 (i)) — fills what is left out to the margin, and the rest is drawn as §8.8's massed camp marks on
  the surrounding ring at the city band, the panel giving the full number (V09).
  (f) **The kinds' own parts** (item 122 (b)). `siege`: camps at the standoff, a line of trenches and earthworks round
  the walled arcs at it, burned farmsteads outside, and siege engines facing the weakest stretches first (`breached`, then
  `patched`, then `worn` runs, item 114), then the gates — one per `enginesPerBesiegers` heads (the heads its ground
  implies, ÷ `areaPerHeadM2`, where no size is given), capped at one per gate and per curtain run of the walled arcs; a
  coalition's armies each pitch their own camp in their own colours (§8.2), spread round the town at bearings evenly
  spaced from a keyed start, so the larger the coalition the fuller the ring; a `siege` of a place with no standing
  enceinte draws the `blockade` row. `quarantine`: a fenced camp with huts, a pest-house, fresh grave rows and smoke at
  its place, and inside, at the neighbourhood band, marked doors and a cordon in the `affectedQuarter`. `famine`: its
  fields bare, over item 117's crop stage (§8.2), empty pens and the principal market's stalls shuttered. `disaster`:
  (d)'s `neighbourhoods`, ending in the week its `reconstruction` Works begins (V06: no week draws both). `occupation`:
  foreign banners on the main gates and the castle (else the principal plaza) and a garrison camp on its place's camp
  land. The rest at their places: `refugeeCamp` tents, carts and cooking fires; `beast` torn palisade sections,
  watch-fires and stake barricades; `raiders` burned farms, smoke, abandoned carts and barricaded roads; `rebellion` street
  barricades; `boom` scaffolding; `bust` shuttered shops.
  (g) **Framing** (item 122 (i)). The placed camps' bounds are the camps §2.9's opening view, Fit and item 116's zoom-out
  limit take in with the town while a look stands (model §2.9; the limit's stop 0 where nothing fits, §8.8).
  (h) **At its limits** (EP-27). No outskirts land left, an island town with no land beyond its shore, or a force larger
  than the frame and its margin: the remainder drawn as (e)'s ring marks; a siege of a place with no standing enceinte (a
  mesa whose every arc is a closure feature among them): the `blockade` row by `approachRoads`' rule, no engines; THORP to
  the METROPOLIS cap: each rung's `scale` cell; a headcount of 0 or none: (c); an unmapped source: (b); a condition whose
  `untilWeek` is not after its `sinceWeek`: never stands; no condition and no preview: every tile byte-identical to the
  base (`item122.crises`).
  (i) **Bars**: §13.2's T122-1 – T122-7 and V12's item-122 (h)–(i) measurements.
* **Rows at their limits (EP-18).**""", 'G122-pipeline', 'G122h-pipeline')

# ───────────────────────────── §10.3 ─────────────────────────────
E(H103, """and of the person tables current
when its household was created (`Household.tableVersion`);""",
"""and of the person tables its
household's `tableVersion` names (those current at its creation, advanced only by the re-derive people action below,
§7.4);""", 'VDC1-21')

# ───────────────────────────── II.1 ─────────────────────────────
E(HII1, "// DistrictContext is V01 §2.3's and TypedBoundary V01 §2.5's; Pin is §2.7's",
        "// DistrictContext is V01 §2.3's and TypedBoundary §2.5's; Pin is §2.7's", 'VAF-R0S-08', 'VPC-R1-09', 'VV12-r1-02')

# ───────────────────────────── II.6 ─────────────────────────────
E(HII6, "(V05 §3.4–§3.7)", "(V05 §3.4–V05 §3.7)", 'VAL-R1-14', 'VKr1-08')

# ───────────────────────────── II.7.2 ─────────────────────────────
# The outfall fallbacks per bank (R2-25 (b); VAL-R1-07's text = VPC-R1-16).
E(HII72, """A settlement with no admitted water outfall takes a moat outfall at its penalty, else one field outfall beyond the
outermost enceinte's outer strip — the cess field of a dry town (V04 §3.2 N2; F-NET, §5.2) — reported; V04's T-V4-2
no-water fixture names the case.""",
"""Each bank of the network (V04 §3.2 N3: the parts the water divides, never crossed by a sewer) with no admitted water
outfall takes its own moat candidates at their penalty, else its own field outfall beyond the outermost enceinte's outer
strip — the cess field of a dry town — either reported, and a bank whose stretch of the boundary lies wholly on water and that holds no
candidate drains by gutter and pit, its area reported unsewered (V04 §3.2 N2, N3; J-V4.129; F-NET, §5.2); V04's T-V4-2
no-water fixture and T-V4-80 (j) name the cases.""", 'VAL-R1-07', 'VPC-R1-16')

# ───────────────────────────── II.7.4 ─────────────────────────────
E(HII74, """  accessForecastMin: number; forecastSafety: number /* 0.85 */ /* II.7.3 (d) and S7b (6)'s caps""",
"""  accessForecastMin: number /* 0.5: P7's forecast access chance at which a cavern or ruin void counts for S7b (6) (V04 §3.3 P7) */; forecastSafety: number /* 0.85 */ /* II.7.3 (d) and S7b (6)'s caps""",
  'VAL-05', 'VPC-R1-08')

# ───────────────────────────── II.7.6 ─────────────────────────────
E(HII76, """a route longer than 2 × `digReachM` is a
   refusal with the reason (§13.2's T66 group covers a target within `digReachM` whose route exceeds it).""",
"""a route longer than 2 × `digReachM` is a
   refusal with the reason, and so is a route the search does not find (`E_NO_PATH`, §3.1: the basement ring enclosed
   within `foundationClearM` by other footprints, basement rings or dug passages, or the water table above every floor
   between it and the target): the dry run refuses with its reason, naming the blocking building or the water table
   (F-EDIT, §5.2), never silently and never a whole-map retry, and the basement of step 1 is not laid (§13.2's T66 group
   covers a target within `digReachM` whose route exceeds it and an enclosed basement).""", 'VPC-R1-23')

E(HII76, """mineBoost, fissureChance, breachM, maxRockShare;""",
"""mineBoost, fissureChance, breachM, maxRockShare, miningCellShare (§4.2 S1 (10)'s mining test);""", 'VAL-R1-08')

E(HII76, """interface AccessPassStrategy { run(doc: Document, rules: { link: LinkRule; dig: DigRule; openings: OpeningRow[]; catacomb: CatacombRule }, ctx: StageContext, k: Kernel):
  KernelResult<{ links: UndergroundLink[]; access: AccessPoint[]; headings: Gallery[] }> }   // V04's U-ACCESS; DigRule, OpeningRow and CatacombRule are V04 §2.3's (their rows V11's)""",
"""interface AccessPassStrategy { run(doc: Document, rules: { link: LinkRule; dig: DigRule; openings: UnderOpeningRow[]; catacomb: CatacombRule }, ctx: StageContext, k: Kernel,
  scope?: EpochScope /* V06 §2.1's; absent at T2b (the whole document), V06's under.access passes the epoch's */):
  KernelResult<{ links: UndergroundLink[]; access: AccessPoint[]; headings: Gallery[]; reached: ExcavationRecord[] /* the ExcavationRecord entries the commit adds (V04 §2.2) */ }> }
  // V04's U-ACCESS (V04 §1b.2, V04 §3.5.7); DigRule, UnderOpeningRow and CatacombRule are V04 §2.3's (their rows V11's)""",
  'VAL-R1-02', 'VAL-08', 'VPC-R1-04')

# ───────────────────────────── PART III ─────────────────────────────
E(HIII, "(V07 §3.0, §3.5)", "(V07 §3.0, V07 §3.5)", 'VAL-R1-14', 'VKr1-08')

# Two more bare continuations of the VAL-R1-14 / VKr1-08 class (assemble-r1's ambiguous-refs.tsv, l. 14311, 14318).
E(H102, "declared as V11 §2.8 (and §2.4, §2.5) gives them", "declared as V11 §2.8 (and V11 §2.4, V11 §2.5) gives them", 'VAL-R1-14', 'VKr1-08')
E(H102, "a `v.` class key (V11 §2.3, §2.9)", "a `v.` class key (V11 §2.3, V11 §2.9)", 'VAL-R1-14', 'VKr1-08')

# The same term slip as VPC-R1-18 (a), once more in §4.8; and item 125's week in The clock (3).
E(H48, "S7 adds their quays, their bank classes and the bridges", "S7 adds their quays, their bank kinds and the bridges", 'VPC-R1-18')
E(H411, "§8.2's season rows for a campaign week", "§8.2's season rows for a dossier-bound map's week", 'G125-pipeline')
