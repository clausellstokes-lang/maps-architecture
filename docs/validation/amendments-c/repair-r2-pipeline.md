# repair-r2-pipeline — lane amendments-c/repair-pipeline-r2 (PIPELINE part: §4, §10, PART II, PART III): block file per
# the BLOCK PROTOCOL. Text before the first "=== " line is ignored. The lane's report, ledger and receipts are
# docs/validation/amendments-c/repair-pipeline-r2-report.md.
# Base: docs/ARCHITECTURE.md sha256 024c57dabc6b93c8… and docs/ARCHITECTURE-RATIONALE.md sha256 33b21ca8cdc15789…
# (assemble-r1's output). Each REPLACE body is the live subsection with count-asserted substitutions (scratchpad
# rp2/gen.py over rp2/specs/*.py); every untouched line is verbatim.
#
# ASSEMBLER HAND-OFF
# (1) RESTATED ROWS. The J-ROWS and RATIONALE-A blocks carry four restated rows under their existing ids — J-A72.50,
#     J-A88.42, J-A65.46, J-A65.49 (index and Part A). apply-blocks.py appends them and notes "DUPLICATE ID inserted";
#     move each appended row into the older row's place and delete the older row (swap_restated), so one row per id
#     remains. No new id.
# (2) NO CROSS-PART SUBSTITUTION REMAINS. This file first asked for two substitutions in §5.2's F-SITING row so it
#     matches §4.5 (5) (VPR1-01, J-A72.50): the detection cell "finds no district whose capacity holds a household that
#     fills no dossier's population (a household no district's range admits housed at the nearest range, J-A72.50)" and
#     "reported with the capacities that refused it". repair-r2-determinism.md's REPLACE §5.2 now carries both texts
#     (its preamble (3)), so nothing is to be applied; if that block is not applied, the r2 verifier re-files them.
# (3) This file REPLACEs §4.2, §4.5, §4.7, §4.9, §4.10, §4.11, §10.2, II.7.3, II.7.5 and II.7.6 — all pipeline-owned. At
#     write time the other r2 block files on disk REPLACE §5.2, §5.4, §6.1, §7.1, §7.4, §7.5, §7.7 (determinism), §3.2,
#     §3.3 (kernel) and §2.2, §2.3, §2.6, §2.7, §2.8 (model) only, so no heading is replaced twice.

=== REPLACE ### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace ===
### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace

**S0 Blueprint.** `Blueprint = { version, seed, size: { rung: TOWN|CITY|METROPOLIS, population? | areaHa? | buildings?,
tolerance, aspect /* 0.5–2, default 1: frame width ÷ height, §3.2 (9) */ }, intent (§7.7), site request (relief: 'auto'|'plain'|'rolling'|'hilly'|'mountainous' /* item 65; J-A65.49: default 'auto' — the per-rung feature table's relief row, drawn on blueprint.features with the other auto features and recorded in autoResolved; our own weights plain 0.35, rolling 0.35, hilly 0.2, mountainous 0.1 (calibratable; read under every preset, since S1 (1) scales its amplitude by a relief class under each); a dossier's site.terrain sets it by §7.7 DR1; S1 (1), S1 (10)'s geology row and §4.9's farm modes read it */, coast side /
bearing with two arm rows, river with inflow bearing, islands and mouth, lake, hill, …), toggles (walls, castle:
'inside'|'on_enceinte'|'outside'|'auto'|'none', castles: 0–2, plaza, temple, harbour, farms, forests, shanty, greens,
waterfront: 'open'|'quay_wall'|'sea_wall', wallPlacement, moat: 'none'|'inner'|'all'|'auto' /* the innermost enceinte
(S3) or every enceinte (outer ones by S5a's carve, §4.4) */, sewers: 'auto'|'on'|'off' /* item 14: resolved by the
sewer-feature rule of this section (II.7.1) */ — MFCG's flags kept as intent), circumstances (era /* its
row also carries the public-lighting density the light rows read (item 68) */, government, biome, economy, magic:
'none'|'low'|'high' /* item 68: 'none' by default, a fantasy toggle under D-3; read by the light rows, §8.4 */,
landscape toggles: fertile land, mines, quarries, fishing, logging, geology: 'auto'|'ordinary'|'soluble'|'volcanic' /* item 65: default 'auto', resolved by S1 (10) */), style, assignments, edits }`.
Intent expansion, and the blueprint's assignments and edits entering the log, are §7.7's; the population
chooses the rung and the size within it (§1.1; AM-4). **Auto features (COV-MFCG-A03).** Every toggle left on `auto` is
resolved by a per-rung **feature table** — P(coast), P(river), P(castle), P(castle on the enceinte), P(temple),
P(harbour | coast), P(shanty), P(greens) … — drawn once from its own concern `blueprint.features` before any other stage
and never redrawn by a later rung, so "Enter" varies the structural features the way MFCG's master switch does; every
auto-resolved value is recorded in the report with its reason (O16 b). **What the base supports (COV-MFCG-Q01):** several
enceintes (§4.8); 0–2 castles (a second castle is a citadel on the outer enceinte, by request or by the METROPOLIS row);
islands, confluences and distributaries (S1); non-circular and multi-cluster (polycentric) settlements (S3); routed
non-radial arterials (§4.3); generated institutions (S2); multi-line labels (§9); continuous zoom, save and load (§8,
§2.9).

**S1 Site (O1; the mechanism that removes whole-map restarts).**
(1) **Heightfield:** 5-octave fBm (VG's measured character, `_critic-vg-ng.md` V7) with a low base frequency and a relief-character amplitude (by S0's relief class — plain / rolling / hilly / mountainous, the keys §4.9's farm modes and (10)'s geology row read — metres by class), plus **authored site primitives**
from the request (hill, spur, valley along the river bearing, terrace, cliff, ravine, hollow for a lake — VG's
idea of authored mount, hollow and ridge primitives). Heights are stored in the range and datum §2.3 declares; S1 sets `datumCm` to sea level
on a coastal site and to the site's base elevation otherwise (a 3 000 m relief is ordinary). *Mechanism (budget: §12.4):* the fBm is evaluated on a 32 m grid over
frame + margin; the stored raster (at §2.3's resolution per rung) is its bilinear refinement plus one fine octave
inside the built extent; slope queries at 2.5 m go through the `TerrainSampler`'s on-demand interpolation (§2.3).

(2) **Coast.** From a sea bearing (MFCG's `sea` angle, kept as the request's coast bearing) and an intent (bay / headland /
straight / fjord / islands), one **closed-outline routine** draws the sea polygon. *Arms (COV-FTG-H04):* the base line is
two arms from a point near the town toward two frame edges, each with its own **shape** row (smooth / gentle / sharp: the
lateral amplitude and count of the arm's 3–5 control points, then a centripetal Catmull-Rom through them) and **detail**
row (none / bays / deep bays / rough / jagged: fBm amplitude, frequency, warp strength and, for bays, the count and depth
of indentations) — our own values, calibratable. The base line is displaced by domain-warped fBm under an amplitude
envelope that damps detail near the town (FTG's "ease into detail") → resample → Chaikin. **Simplicity (GEO-13):** the
normal displacement at every sample is clamped to 0.8 × the local feature size on that side (the distance to the base
shape's medial axis: the clamp reads it through `skeleton(rings, 'spine')` (§3.4) as §3.8's `spine` reader, with its
sampled-medial-axis downgrade; for an open arm, the distance to the facing arm or the frame), which keeps small islands,
elongated ovals (end radius ≈ b²/a) and fjords simple for any fBm draw; a resampled ring that still
self-touches is repaired by a non-zero union — the component containing the anchor (the town side) keeps the outline's
id, and every other loop is typed by rule (a land loop in the sea above the minimum islet area an `islet`, a water loop on
land above the minimum pond area a `pond`, anything smaller absorbed) and reported (property test: §13.2).
**Contours and coast (GEO-14; J-P12):** the vector coast is authoritative — the raster is lowered below sea level on the sea
side, every land cell within two cells of the shore is raised to at least sea level + 10 cm and every sea cell held at
most sea level − 10 cm; contour lines are not model geometry: their extraction and clip to the land faces are §8.2's
relief tier (F-CONTOUR, §5.2), so a contour never crosses the shore, cliffs and sub-cell spits included (steep-coast and
cliff fixtures in the golden suite). The same routine with a closed base curve makes lakes (from sinks),
ponds, islands (a raised closed curve) and — with `elevationCm` set — **the floating-island outline** of the LAYER hook,
which gets its own arena, `Terrain`, datum and frame (§2.2, §2.3) and may carry its own terrain from the same S1 with a
request that echoes the ground (e.g. a conjured river with the ground river's bearing; AM-2); where it floats is II.6's
placement rule, its occlusion §8.4's `LayerSpec.occlusion`. For a standalone or sky outline the base curve comes from an
**outline template** row — disc, D-shape, lozenge, crescent, spindle — scaled to the requested area (COV-NG-N06).

(3) **Hydrology.** Sinks are filled by a bucket-queue priority flood on the integer heights of the hydrology grid
`Terrain.hydro` over frame and margin (16 m at TOWN, 25 m at CITY, 32 m at METROPOLIS; §2.3) with exact flat surfaces — a
filled depression keeps its spill height, never raised by ε — and a depression deeper than the table's lake threshold is
typed a lake; then D8 flow direction and accumulation. **Rivers by descent:** the inlet lies on the arena's upstream edge
(frame + margin; the requested bearing or the highest edge), so the drawn margin shows the river arriving; the course is
traced by steepest descent with a lateral meander term — a Chaikin-smoothed control polyline whose knots sit mostly on
alternating sides, our own construction — and **the terrain is carved to the course**, its bed descending monotonically
to the outfall so no depression is created and the flood is not repeated; after the carve, D8 is recomputed on the carved
corridor cells and their neighbours and accumulation once (≈ 2 ms at CITY), so the river always reaches the sea, a lake
or the frame. Width `w = w0 · acc^0.4`, clamped to the class band (FTG's ≈ 31 m mean river width at CITY is one
calibration point); tributaries by the same rule from secondary inlets. **Bounds (GEO-36):** knot offsets are clamped to
half the control spacing (`river.controlSpacingM`); S1 records the control knots in `WaterBody.controls` with ordinals in
course order (§2.3), the recorded input a `moveCourseKnot` edit addresses (§7.1); a self-touching course is re-traced
with the offsets halved; carving is capped at `carveMaxCm` (400 cm at TOWN and CITY, 600 cm at METROPOLIS) and a course
that would need more is re-routed by F-RIVER (§5.2), never trenched. **Mouths (IMP-9, COV-FTG-H11):** `mouth: 'estuary'`
is a widening width profile (MFCG's delta-river option is a widened mouth, `_critic.md` C15); `mouth: 'delta'` splits the
course inside the delta zone (within the table's distance of the sea, where the bed slope is below its threshold) into
2–4 **distributaries** at splits spaced ≥ 3 channel widths, each carrying a share of the accumulation drawn from the
`water.delta` stream (each ≥ 0.2), of width `w0 · (share · acc)^0.4`, traced by descent to the sea without rejoining; a
distributary that would meet another merges, and the land between becomes a river island under (4).

(4) **River islands** (the parity judge's shared repair): a `river: { islands: n }` request adds a branch that leaves the
course and rejoins it after k cells, typing the enclosed land as an `islet` L0 face, **only if** the branch's separation
from the main channel stays ≥ (w_main + w_branch)/2 + the minimum islet width (table: 20 m); otherwise the island is
reported as not built. Mid-channel islets appear at reaches wider than a table threshold with a per-reach probability.

(5) **Crossing sites and decks (GEO-17; J-P44).** One function, `siteCrossings(reaches, bandM, existingDecks)`, sites
crossings: S1 runs it over every reach, S1's water operator (§7.3 (b)) over the re-traced reach only. The narrowest and
shallowest reaches within the search band (`crossing.searchBandM`, default 120 m) become crossing sites, typed `ford`
(width < table) or `bridge_site`, with a minimum spacing (FTG's 40 m as the default). Each site is a **pinned deck**: a
bank-to-bank segment perpendicular to the local flow (the course tangent averaged over one channel width upstream and
downstream), its two ends inserted by S1's L0 batch into the shores as the `deck_end` vertices of a `Bridge` in state
`site`, pinned against every later smoothing. S3's decks on the water it carves (S3 (2), (10)) have the same form and the
same two states.
* **A site becomes a bridge only when a way uses it** — as FTG turns only its crossing road proposals into bridges,
  gated by its 40 m minimum distance, and MFCG draws one bridge per street crossing (1–4 per city;
  `research/findings/ftg-docs-params.md`, `profile-mfcg.md`). The way S4 or S5 routes through the two vertices lays the
  span — its own L1 edge between them, carrying the structural `deck` role beside `way` — the `Bridge` becomes `built`
  with that way, and S7 builds its furniture (§2.7, §4.8). No L0 edge crosses the water, no deck splits a reach's L0
  face, and every bridge has one structure (§2.2 rule 7; J-I12). S4 routes to a site's ends as a fixed graph edge
  (§4.3), so "bridges within ± 10° of the channel normal" holds on the way itself by construction.
* **A site no way uses by the end of S5 stays a `site`:** two pinned bank vertices and a record — no span, way or
  furniture; not drawn, named, labelled or exported (S13a names a bridge once built; renderers and exports draw deck spans
  only); outside §5.3's deck rows. An epoch's growth (§4.4, §4.11), a drawn bridge (§7.4) and F-ROUTE's move rung (§4.3)
  may use it later.
* **A deck where no site stands, on water that already stands** — F-ROUTE's extra-bridge rung (§5.2) in S4 at
  generation (after S1 and S3 committed every shore), in S5b at stages k ≥ 2 and in every epoch (§4.4), or in S4's
  operator in an edit that moves no water; or a drawn bridge with no site within `crossing.snapM` (20 m, half the minimum
  spacing) of the point where it crosses the channel's centreline — is placed by **one L0 batch of two same-level shore
  splits** before the way's L1 batch: `splitThrough` at L0 on each shore at the deck's bank point, perpendicular to the
  local flow, carrying the `deck_end` row of a fresh `Bridge` (`over: 'added'`), pinned. A street end already within
  `attractCm` of that point (a vertex carrying a `way` row) is attracted and promoted (§3.6); any other bank point keeps
  `attractCm` from every vertex on the shore's route, the map border's crossing included; nothing is cleared, and the
  finer faces whose rings run along the shore gain the vertex (§3.3's same-level-split rule). The way's L1 batch then lays
  its span through the two vertices, as at a site.
* **A deck placed before its water exists** is built by the batches of the operator that inserts the water — on a
  carve's kept way (§4.11), on an outer moat's arterial (S5a carves it by the carve path, §4.4), on a kept way of S1's
  water operator (§7.3 (b) 3), and for a deck F-ROUTE's extra-bridge rung sites inside one of these. Inside such an
  operator the rung only **sites** the deck, as data, with the operator's other crossings (§7.3 (b) 2): its two
  `deck_end` vertices are placed on the way's new route at the new bank points, under a fresh `Bridge`, by the operator's
  L1 batch (§7.3 (b) 3; §4.11 batch (1)), and promoted to L0 by its L0 batch when the water is inserted through them
  (§3.3; §7.3 (b) 4; §4.11 batch (2)). No shore split runs, because the shores that exist then are the ones that L0 batch
  removes.

(6) **Harbour candidates:** coast faces with depth ≥ threshold. (7) **Bank classes (COV-FTG-H06):** every shore segment
is classed `bay`, `headland` or `straight` (`WaterBody.shoreClass`, §2.3) by the signed curvature of the shoreline
smoothed over 200 m (thresholds in a table); its bank kind — beach / rock / cliff / quay / marsh — is drawn from a
per-class weight table (our own weights) conditioned on slope and exposure (G-R5), so bays tend to beaches and headlands
to rock and cliff; the class is kept per segment for §8's shore decoration. (8) Water faces enter L0 with `shore` / `bank`
edges; land components by flood fill (MFCG's land-component build), every one given uses later (O14 g). **Shore setback
(COV-FTG-H07):** a table `shoreSetback` per bank kind — plots: beach 6 m, marsh 10 m, rock 3 m, cliff 5 m from the edge,
quay 0 m (quay plots front the quay way); fields: 10 m — read by S10 and the hinterland unit (§4.9); the band is typed
`shore` greenery or commons. (9) Drainage stays queryable. (10) **Resources (COV-FTG-B09):** `SiteResources` rasters on
the terrain grid — stone from slope, rock class and cliffs; ore from relief × an fBm propensity (hills only); timber from
the forest propensity (slope and soil class; realised as woods by the hinterland unit, §4.9); fish from water adjacency
and reach width; clay from low damp river flats; fertile land from gentle, dry, non-rock ground. The S0 landscape toggles
clamp a kind to zero or raise its floor; S2's resource gates and S12a's outside sites read these rasters. S1 also writes the site's **geology flag** (`Terrain.geology`, §2.3; item 65; J-A65.49): the S0 toggle's value, or for `auto` the feature table's geology row at S0's relief class — P(soluble) plain 0.10, rolling 0.20, hilly 0.30, mountainous 0.30; P(volcanic) plain 0, rolling 0.02, hilly 0.05, mountainous 0.10 (our own rows, calibratable, `extension`) — read against one uniform that S0 draws for it on `blueprint.features` with the other auto features, before any other stage: `soluble` below P(soluble), `volcanic` at or above 1 − P(volcanic), else `ordinary`, recorded in `autoResolved` with its reason (§5.4). A sky island's terrain takes `ordinary`, as do the parity presets (no reference has an underground); only II.7.6's cavern rule reads the flag, and quarry voids read `SiteResources.stone` (item 65, II.7).

**Restart-free by design:** a requested feature infeasible on the drawn site is adjusted inside S1's own ladder (F-RIVER,
§5.2), never by regenerating the whole map.

**S2 Programme (the roster demand side; O7).** From `population` (or derived from area or buildings by the size tables)
— the dossier's population and circumstances when the map is bound to a dossier, the blueprint's own as the dossier's
stand-in when there is none (§7.7's derivation table; item 20 (h)):
households by wealth band (the band set of §4.5, whose default shares are FTG's captured lifestyle distribution; item 27);
institutions (the markets — one principal and secondaries by size, below — temple, churches per capita, guild halls, inn,
mill on water, tannery;
the seats the `government` circumstance forces, §10.2, COV-FTG-B13); building demand per class from **our own**
dependency tables run as §10.2's sequential, prefix-stable roster (FTG's idea, none of its values), with resource gates read
from `SiteResources` ("no farmland → no farms, shops instead"). Outside classes (farmsteads, mills, quarries, lumber yards,
fisheries, mines) are demanded here, sited by S12a and placed on the outside plots the hinterland unit builds (FTG-7).

*Markets — several, by size (item 24; emulation baseline: MFCG's central plaza doubles as its market and its later wards
may add secondary plazas, rarer since 0.9.2; FTG places market squares by its district rules, two in its captured city).* The
`market` class row (§10.2) demands `N_markets` for the population: the **principal** market (`min` 1 at every rung) and
the **secondary** markets — the row's `firstAtPopulation` (10 000, the CITY floor) and `perCapita` (one per 12 000
inhabitants beyond it; our own rows) — plus, our extension, one per growth nucleus beyond the first in a polycentric form
(S3 (1)) and the town-level character's mercantile shift (below); at TOWN a secondary market is drawn with the row's
`secondaryChance` (0.15) rather than by count, so towns rarely have one. A market is a `Reservation` of kind `market`
with a `rank` (§2.5): the principal one is sited by S3 (12), every secondary one is a district claim of S7b (§4.5 S7b
(3)) except a polycentric nucleus's plaza, which S3 (12) ranks secondary (S3 (1)), and each has its `market` district
(§4.5). The market hall's and the market trades' rows read a market's rank
(§10.2), and the roster's churches are demanded per capita as before (MFCG spawns several). The sequential roster keys
each market by ordinal, so an epoch's suffix may add a secondary market, which the epoch's S7b claims by the same rule
(§4.11).

*The hinterland's demand, decided with the town's (item 26; FTG-7).* The farm table of §4.9 turns the population into
farm households and arable land, and its fuel and timber rows into the wood the settlement burns and builds with —
`farmsteads` (none under §4.9's `perimeter` and `rivers` farm modes, whose farm households are housed in the town —
a mode that depends only on the rung, the climate row, S0's relief class and S1's resources), `coppiceHa` and `managedWoodHa`
are demanded here, the outside classes' `produces` and supply edges (§10.2)
carry them into the need propagation below, and the hinterland unit sizes the fields and woods it draws to them under
§4.9's mode and extent rules. The countryside is thus decided with the town and drawn after it, FTG's order.

*Demand in plot counts (FTG-2; J-P6).* Stage demand is **plot counts per class × band**: `n(c, b, k)` = the class's demand
× the band shares × stage k's quota share. Residential band shares are the roster's household wealth shares (shifted by
the town-level character, which S2 reads from the circumstances' economy slice — its sector shares — so one input drives
the roster and the economy dial; §10.2, item 72); workplace bands come from the class row's lifestyle band. Stage land is
`A_k = Σ_(c, b) n(c, b, k) · plotArea(c, b) / plotShare(regime_k)`, with `plotArea` the *plot* area of the granularity
table's band centre (§4.7; footprints and coverage are not in the formula) — for a residential class the expectation
over the class-mix weights at the band centre (§4.7 S10b, item 71), so demand and capacity keep agreeing when S10b draws
a larger class — and `plotShare` the measured share of a stage's
land that is plots (the rest is corridors, squares, greens and residue): **dense core 0.62** — MFCG's gross lot cover
inside the wall is 0.60–0.65 at sizes 40–250, its lots being plots in our sense
(`captures/mfcg/exports-sweep-2026-09-25/README.md`, CONFIRMED) — gapped rings 0.55, ribbon 0.45 (PLAUSIBLE).
**Measurement:** M-1 #5 (FTG face recovery, on its decoded road graphs) measures the share of FTG's land inside its
road-graph faces — FTG's client as captured on 25 September 2026 receives no lot or plot, FTG's subdivision running on its
server on those faces (item 49), so this bounds its plot share from above; M1 measures B-CITY's own per regime.
**Fallback:** if S5d's top-up fires on more than 10 % of B-CITY seeds at a rung, the `plotShare` rows are refitted from
B-CITY's measured share per regime by one scripted pass, with a declared golden shift (§13.3).

*Stages and the walled share (MFP-6; J-P5).* Stage rows per rung (a table, era-calibratable): **TOWN** 2 stages — walled
core 0.90 of buildings, ribbon 0.10; **CITY** 3 — inner walled 0.55, outer walled 0.33, ribbon 0.12; **METROPOLIS** 4 —
inner 0.30, middle 0.30, outer 0.28 (all walled), ribbon 0.12. FTG's cul-de-sac **suburb** regime is added only by the era
or form preset or by the shanty toggle. The share inside the outermost wall is thus ≈ 0.9 at TOWN and ≈ 0.88 at CITY and
METROPOLIS, anchored on MFCG's measured 0.87–0.92 inside the wall at sizes 40–250 with shanty towns off (sweep README,
CONFIRMED); FTG's ≈ 20 % walled preset stays reachable as a preset row, and the corpus phase recalibrates the rows. Each growth stage stands for `yearsPerStage` years of the town's age (50, a stage-row column; our own, calibratable), the age II.7.6's catacomb rule reads. **A staged history (item 88; J-A88.42).** When the dossier port fills the staged `Recipe.history` (`HistoryHint`, §2.7, §2.9; empty in the base), the stage count becomes K′ = min(K, max(1, ⌈`ageYears` ÷ `yearsPerStage`⌉)) — a young settlement is grown in fewer stages: stages 1 to K′ − 1 keep their rows, every later walled stage's share folds into stage K′ − 1 and the ribbon stage stays last (at K′ = 1 the one stage takes every share) — and only the rules that name a scar's type read it: a `fire` or `flood` scar (a `RaiseGrade.cause`) by II.7.6's buried old town, any other type by none, the creation week showing a finished town (J-A67.47). Empty, K is the rung row's.
**Output:** `Roster` (demand by class with area / frontage requirement classes, district affinities, wealth bands) and
`StageQuotas[]` (plot counts per class × band, land area and regime per stage: dense core → gapped rings → ribbon, plus
the optional suburb; FTG's zonal gradient, R4).

**S2 need propagation (item 16 (b); with §10.2's supply edges).** After the sequential roster has produced the manifest
for the population, S2 walks the supply graph: for every manifest building whose class has a `hard` supply edge it counts
the providers of that resource within reach — the site resources `SiteResources` provides (farmland → grain, and timber,
stone, ore, fish and clay; §4.2 S1 (10)), the harbour and the gates for the `import` resources (§4.7 S10b), and the
manifest's producing classes (`produces`) — at one provider per `perConsumers` consumers; where the count falls short, the
producing class of highest priority receives its next building through its own `roster/<class>/<ordinal>` draw, so the
addition is prefix-stable (the propagated demand is a monotone function of the manifest and enters the sequential run as
a `perOther` floor), to a table depth (default 3: brewery → maltings → farmstead). A resource no class produces and no
site provides takes the roster's existing substitution (no farmland → no farms, shops instead) and is reported as an
import; the hinterland's food, fuel and timber rows are the outside classes' edges (§4.9, item 26). The propagated
buildings are demanded here, allocated by S7b and S10a and placed by S10b, whose supply distances score how well the chain
was sited (§4.7).

**S3 Siting, reservations, the stage-1 boundary and its trace (J-P26).** S3 decides everything the first enceinte depends
on in one construction — the gate routes are solved first, the stage-1 boundary is the travel-cost level set over them,
the gates are where the routes cross it, and the castle weld and the moat are placed on the trace pulled from that
boundary, so no later stage recomputes a boundary they were fixed on — and commits it in two batches, L0 (every water body
it carves, with the decks its crossings need) then L1 (the land reservations), before S4 commits a single way.
1. **Centre(s).** Candidate centres on a coarse lattice inside the frame's middle third are scored by a rule table —
   distance to a crossing site (river towns sit at fords and bridges), to the harbour candidate, slope, elevation above the
   flood line, wind exposure, distance from the frame, and a controlled random term; the best is the **centre** — the
   nucleus the main plaza (2), the gate routes (5) and the field `T` (6) are rooted at; it is not by law the market,
   whose principal site is chosen at (12) by where trade meets, which is the plaza itself by default
   (MFCG's central market) and may be a bridgehead, the harbour, a gate or a main street instead (item 24; J-A24.41).
   **The site is placed relative to the river** (G-P14), so "no river through the core" cannot occur when a river is
   requested; the invariant is checked here and repaired by moving the centre, never by re-rolling. **Polycentric forms
   (IMP-9):** the `twin-town` and `polycentric` form rows site k = 2–3 nuclei (candidates inside the frame's middle half),
   each scored the same way, each with its own share `A_1,i` of stage 1's land (a form-row share), its own main plaza (2)
   and its own gates (4); the principal market is sited at (12) among every nucleus's candidate sites, and the plaza of
   a nucleus that does not win it is a secondary market when the roster's count allows (S2), ranked and committed with
   the principal at (12). Nuclei are sited at least the **separation
   floor** apart: `sep_ij = τ(a₁) · (R_i + R_j) + (outer setback + glacis)_i + (outer setback + glacis)_j + g`, with
   `R = √(A_1/π)` a nucleus's equal-area radius, `g` one ribbon plot depth (30 m) and `τ(a)` the tip factor of the
   anisotropic level set (its reach along a road over R): table 1.2 at a = 1.3 and 1.4 at a = 1.8 (above the executed
   1.13–1.18 and 1.24–1.34, receipt `docs/validation/bench/fixall_pipeline_r2_levelset.out`), τ = a for any other a (a safe
   bound). The form row's
   separation band runs from that floor to 400 m beyond it (≈ 800–1 200 m for two 29 ha nuclei at TOWN); the ground
   between the nuclei is grown as an extramural regime in S5.
2. **Plazas and the reservations that do not read the boundary (MFP-3, GEO-19).** The **main plaza** of every nucleus:
   area band TOWN 0.25–0.45 ha, CITY 0.35–0.6, METROPOLIS 0.45–0.8 (anchored on MFCG's 0.32–0.58 ha across sizes 40–250
   and the red team's 0.36–0.54 ha); a compact 4–6-vertex polygon at the nucleus aligned to the contours, compactness
   ≥ 0.8, whose vertices are the attach points arterials end at, so the plaza acts as MFCG's roundabout. The **temple or
   cathedral precinct** adjacent to the main plaza by score, sized from its institution row; the **markets** are not
   planned here — the principal market is sited at (12), once the sites where trade meets are fixed, and every secondary
   market is S7b's claim (§4.5 S7b (3); item 24) but a polycentric nucleus's plaza, which (12) ranks secondary (1); the **harbour basin** (a template shape — rectangle, semi-octagon,
   semi-hexagon, L wide or narrow — scaled to port demand) at the chosen harbour candidate; and **canals** along a
   least-cost line between two water bodies, each carrying decks of S1 (5)'s form at the spacing row `canalDeckSpacingM`
   (150 m inside the predicted built extent, 600 m outside it). These are planned polygons here: the lattice sees them as
   reservations and water (water impassable except along its decks), and they are committed in (10) and (12).
3. **Lattice and costs.** S4's candidate lattice and its edge costs (§4.3) are built here, once, over the planned water
   and reservations of (2).
4. **Gate picks and bearings (MFP-4, COV-MFCG-E04; J-P24).** `N₁` (per nucleus) = the request, or
   `round(1 + 0.47 · √A_ha)` with A the stage-1 land — a law that reproduces MFCG's 5 / 8 / 12 gates at sizes 40 / 80 / 130
   from their walled areas of 58 / 220 / 548 ha, and 18 at size 200 (receipt
   `docs/validation/bench/fixall_pipeline_mfcg_fits.out`). **The waterfront reduction (J-A46.41).** Where the nucleus
   has a waterfront — the pick contour below runs along a sea or lake shore for at least `gate.waterfrontShare` of its
   length (0.1; our own, calibratable) — the land law's value `N_land` becomes `N₁ = 2 + ⌊0.75 · (N_land − 2) + ½⌋`: fewer
   land gates where water takes part of the circuit, 4 / 7 / 10 / 14 where the land law gives 5 / 8 / 12 / 18, never
   more than `N_land` (provenance `ref:MFCG 12710731 coastal gate reduction (code)`, P11: MFCG 12710731's coded law
   counts mesh cells — 2 + ⌊0.75 × inner cells ÷ 12⌋, recorded 3 / 4 / 5 / 7 gates at sizes 26 / 39 / 51 / 80 — and this
   rounding of 0.75 applied to the land law's surplus over two gates is its metric restatement). A requested `N₁` is taken as
   given, and a river takes water gates, not this reduction. Picks are **sequential nested picks** from the `gate.pick`
   stream on the **pick contour** — the level set of stage 1's land in the terrain-only field (a = 1), which serves only to
   score candidates: pick i scores the contour's candidate points by angular gap to the earlier picks, nearness to a requested bearing (a bearing of the site request, or the bearing of a `road` partner of the trade slice — item 77 (b), §7.7 DR3), terrain (saddles and valley exits up, steep ground down) and a jitter, so a smaller N is always a
   prefix of a larger one. Each pick carries a **bearing**: the requested bearing it serves or, when none was requested,
   the least-cost outward direction from the pick to the frame; a bearing's **trade weight**, which (12) and §4.7 S10b's
   trade rows read, is its gate's weight in `TradeFlow.gates` (§4.3, computed at (7); J-A77.41, J-A77.42), read from the circumstances' trade slice (§7.7 item 2; items 72, 77). A polycentric nucleus's first picks are forced at the
   bearings of its adjacent nuclei.
   **The harbour pick (J-P45).** When the town has a harbour and `N₁ ≥ 1`, let `L*` be the path to the harbour's
   destination node (13) in the plaza-rooted Dijkstra tree over (3)'s lattice (the tree (5) routes the gates with,
   computed here once) from the plaza of the nucleus nearest the harbour — the least-cost lattice path, the wall ignored.
   When that node lies outside the pick contour, that nucleus's first unforced pick is **forced** at `L*`'s first node
   beyond the contour, after any polycentric forced picks, so the nested-prefix property and N are unchanged. If that
   nucleus has **no unforced pick left** — its `N₁` taken by polycentric forced picks (a nucleus of under about 10 ha
   between two neighbours, whose law gives `N₁` = 2, or a twin town's requested `N₁` = 1) — no pick is forced, its forced
   picks stay, and the detour guard of (7) applies to that town unconditionally. The forced pick's bearing is the
   least-cost outward direction to the frame; its gate route's inward part is `L*`'s own prefix, so a walled port has a
   main gate on its harbour side and the harbour route (11) leaves through it.
   *Measurement (M1):* the committed harbour route (11) against `L*` on every B-CITY walled coastal seed, p99 of the ratio
   ≤ 1.5, and ≤ 1.5 on every §13.2 walled coastal fixture. *Pre-decided fallback:* the detour guard of (7).
   Where the river crosses the boundary, **water gates** are added (not counted in N). `N = 0` produces no main gate and
   no external arterial through the wall — a harbour outside the stage-1 region still gets the harbour gate of (7); the
   sealed circuit is reported and the extramural stages are folded into the walled stage.
5. **Gate routes, solved (not committed).** For every pick: the route from its plaza's attach point through the pick to
   the frame at its bearing — the plaza-rooted Dijkstra tree to the pick, heap A\* beyond it — on (3)'s lattice with S4's
   cost function (§4.3); an island town routes to its landings and a polycentric pair gate to gate. S4 commits exactly
   these routes and reuses the plaza-rooted tree for its own plaza-anchored routes (§4.3). The harbour ↔ plaza route is
   **not** among them and never enters `T`'s road set; it is solved in (11), once the boundary and the trace exist
   (J-P35).
6. **The stage-1 field and boundary.** The one travel-cost field `T` of §4.4 S5a is computed here: a multi-source
   Dijkstra from the plaza(s) over (3)'s lattice with the road multiplier `1/a₁` (a₁ = stage 1's regime row: walled core
   1.3) on the lattice edges of (5)'s routes. Each node records its source nucleus, so a polycentric town's `T` is
   partitioned by nearest source; `t_1,i` is chosen so that nucleus i's nodes with `T ≤ t_1,i` hold its land `A_1,i`
   (exact to one cell), and the **stage-1 boundary** is that contour, Chaikin-smoothed and resampled. If two nuclei's
   regions come closer than their setbacks, glacis and `g`, the later-scored nucleus is re-sited to its next candidate
   (≤ 3 attempts); if they still come too close, the two are merged — one enceinte around their union and a **cross
   wall** along `T`'s partition line between them (an open wall chain anchored on that enceinte at both ends, with a gate
   where the inter-nucleus route crosses it) — and the merge is reported.
7. **Gates on the boundary.** Each gate is the **first point at which its solved route, walked outward from its plaza,
   reaches `T = t_1`** — on the boundary by construction; the gate keeps the pick's identity, ordinal, bearing and
   route. Two routes that cross the boundary at one point cannot both be gates: the
   later pick is re-drawn from its next candidate (≤ 3 attempts), then dropped and reported (F-WALL). **The harbour
   gate:** one gate of kind `water`, not counted in N, carrying a way like a quay-access water gate (§4.8) and reported,
   is placed where `L*` ((4)) first reaches `T = t_1`, so the trace (9) pins it and the harbour route (11) leaves through
   it — (a) for a sealed town (`N = 0`) whose harbour destination node (13) lies outside the stage-1 region `{T ≤ t_1}`;
   (b) as the **detour guard**, for a town with gates whose best gate-bound harbour route — solved as data on (3)'s lattice
   with the stage-1 boundary impassable except at the gates just placed — is longer than 1.5 × `L*`, applied when M1's
   measurement of the harbour pick (4) fails and, whatever it finds, when the harbour's nucleus had no unforced pick left to force. With the gates placed, §4.3's trade flow derives its gate weights, the harbour's share and the dominant bearing — they read no route — which (12) and S10b's trade rows read (§4.3 *Trade flow*; J-A77.42).
8. **The castle (MFP-3, COV-FTG-G09).** When a castle is requested or drawn, the **castle bailey** is sited by
   defensibility (height + water on ≥ 1 side + control of the main route, `docs/IMPROVEMENTS.md` O8 d), restricted by the
   `castle` option to inside / on / outside the stage-1 boundary, under a hard filter that no (5) route crosses the claim
   or, when water is within reach, the castle-moat band planned with it by (10)'s rule: a 5–7-vertex polygon on a jittered circle, area band TOWN 1.0–3.0 ha, CITY
   1.5–3.5, METROPOLIS 2.0–5.0 (anchored on MFCG's plain-size castles of 1.3–3.4 ha), compactness ≥ 0.75 (MFCG's
   threshold, checked and repaired here by §4.8's rule, before the trace welds to it). `on_enceinte` places it across the
   boundary so that exactly two of its vertices lie on the boundary — the **weld vertices** — and the bailey's **outer
   arc**, its boundary between the welds on the side outside the boundary, becomes the stretch of town wall the castle
   shares (9). The castle's **town-side gate** is fixed now, at the midpoint of the bailey side with the least-cost path to
   the plaza — for an `on_enceinte` castle, among the sides of its town-side arc — so the castle street is a routable
   destination and a ring castle moat can carry its deck.
9. **The stage-1 trace.** For a walled stage 1 the registered `EnceinteStrategy` traces the enceinte here by S5a's rules
   (§4.4): the boundary pulled to defensible ground within the 40 m band with the gates and the weld vertices pinned,
   then pinned-vertex smoothing and topology-preserving simplification. Between the weld vertices of an `on_enceinte`
   castle the trace is the bailey's outer arc itself, one wall carrying both enceintes' `wall` roles (§2.7
   `Castle.cityWeld`). The pull and the simplification treat the water planned in (2) and an `inside` or `outside`
   castle's planned ring moat (8) as water, which they never cross (§4.4), so no channel (10) carves can cut the trace.
   S5a commits this trace unchanged for k = 1; an unwalled town keeps the boundary itself as stage 1's boundary.
   **Test:** every gate and weld vertex lies on the committed trace exactly (lattice equality), and the trace departs
   from the boundary by ≤ 40 m everywhere except along an `on_enceinte` castle's shared stretch, which is the bailey's
   own outer arc and may bulge up to the bailey's width beyond the boundary. (One boundary removes the two-construction
   mismatch measured in receipt `fixall_pipeline_r2_levelset.out`.)
10. **Water carvings and their decks → the L0 batch (GEO-19; J-P36).** Carved into L0 here, before S4, and seen as water
   by every later stage: the harbour basin and the canals of (2) with their decks; a **castle moat** when water is within
   reach — around an `inside` or `outside` castle a ring band around the bailey, outside its curtain's outer half-band and
   a berm, with **one deck at the castle gate**, perpendicular to the moat; for an `on_enceinte` castle **only its outer
   arc** (8): the channel along the shared stretch between the weld vertices, outside the trace's outer half-band and a
   berm — the city moat's own stretch there when the town has one (one channel, at the wider of the two width rows),
   otherwise a channel clipped at each end by the trace ⊕ (outer half-band + berm), so it ends against the town wall's
   berm beside each weld — while the bailey's town-side arc takes its castle template row's `townSide` (§4.8) and the
   castle gate on that side needs no deck; a **city moat** when the blueprint's `moat` is `inner` or `all` — a channel of
   the era row's width along the (9) trace, outside its outer half-band and a berm (table 2–5 m) — with **one deck at every
   main gate and at a harbour gate (7)**, where the gate's route (for a harbour gate, the route that placed it) crosses the
   channel, perpendicular to it; and the hinterland's **decoration ponds** — the pond row of §4.9's decoration table
   (count by rung and biome), sites scored on hollows, flow accumulation and damp ground, each at least `pondClearM`
   (150 m) beyond the predicted built extent `{T ≤ t_K}` and at least 30 m from every (5) route and planned canal. No
   castle moat crosses the city trace — a ring surrounds a bailey the trace keeps off (9), and an outer arc runs beside the
   trace — so §4.4's rule that the trace crosses water only at a river's water gate holds with every castle option; and
   the hard filter of (8) keeps every solved route off a planned castle moat, so no castle moat needs a deck except at a
   ring moat's castle gate. Every deck has S1 (5)'s form and its two states. When a moat was carved, `T` is recomputed
   once over the new water (≈ 4 ms at CITY) for the stages k ≥ 2; stage 1's boundary is never re-derived from it.
11. **The harbour route (J-P35).** Once the L0 batch has committed, the harbour ↔ plaza route is solved on (3)'s lattice
   with the committed water impassable except along its decks, every reservation of (2) and (8) impassable and — for a
   walled stage 1 — the (9) trace impassable except at its gates. A harbour whose destination node lies inside the stage-1
   region `{T ≤ t_1}`, and any harbour of an unwalled town, is routed by heap A\* from the plaza of the nucleus whose
   partition of `T` holds it, and so stays inside the trace. A harbour outside the region is reached **through a gate**:
   one multi-source Dijkstra from every gate's exit — the far bank vertex of its moat deck where (10) carved a city moat,
   the gate itself otherwise — over the lattice outside the trace finds the **serving gate** (the least cost to the
   harbour; ties by gate ordinal; a harbour gate of (7) competes with the rest, and with `N = 0` it is the only gate) and
   the branch to the harbour at once. The harbour route is that gate's inward street, its passage and moat deck (its own
   route to the exit, which S4 re-solves through the deck, §4.3) and the branch: the harbour road leaves through a gate,
   crosses a moat only on that gate's deck and adds no road through the wall, so the roads leaving the walled stage stay
   N, plus a harbour gate of (7) where one was placed. The route is data, committed by S4 with the others, outside `T`'s
   road set (5); it costs one heap search of the castle street's size, inside S3's row of §12.4 (PLAUSIBLE). Its fixtures
   are §13.2's walled coastal harbour fixtures.
12. **The principal market, then the land reservations → the L1 batch.** *The principal market (item 24; owner: "the
   central market does not actually have to be central to the city").* Before the batch, with the gates (7), the trace (9)
   and the harbour route (11) fixed, the principal market's site is chosen by the **trade-convergence score** over the
   candidate sites — a rule table (`market.siting`, §7.6; our own rows) with a controlled random term of share 0.1 from
   the `reserve.market` concern (§6.1). The candidates, each with its form and its score terms (defaults):
   * the **main plaza** of each nucleus (2) — the plaza itself then carries `rank: 'principal'` (MFCG's central market;
     its attach points are the market's): kind 1.0, routes 0.5 × the fraction of gate routes (5) rooted at it;
   * each **gate**, inside or outside (7) — a flanking square around the gate route's stretch just inside or just outside
     the gate, beside the gate plaza (§4.8): kind 0.3 inside or 0.15 outside, trade 0.6 × the gate's trade weight (`TradeFlow.gates`, (4));
   * the **town bridge's landward ends** (13) — a flanking square around the bridge approach S4 routes to the deck's bank
     vertex (§4.3): kind 0.35, traffic 0.5 × the fraction of arterials whose bearings lie across the river;
   * the **harbour's landward attach** (11) — a flanking square between the basin's attach point and the harbour route:
     kind 1.0, trade 0.6 × min(1.5, p ÷ `portRef`) — `p` the **port demand fraction**, the share of the manifest's
     buildings whose class `requires: 'coast'` (§10.2), and `portRef` the table's **reference port**, the median `p` over
     B-CITY's harbour seeds — a stored cell of `market.siting` (§7.6) computed by running S0–S2 alone on every B-CITY
     harbour seed (no layout is needed): a scripted pass sets it at M1 and re-runs whenever a shipped roster row changes,
     the new value shipped as a table-version bump with its declared shift (§13.3), and a contract test recomputes the
     median and fails on a stored value that differs (§13.2); 0.12 (PLAUSIBLE) until the M1 receipt;
   * the **busiest inward street** — the middle third of the street of the gate of highest trade weight — a flanking
     square astride it, a widened main street: kind 0.25, trade 0.4 × that gate's trade weight.

   Slope, the flood band and wind exposure enter as (1)'s site penalties. **The defaults compared** (before those
   penalties and the random term; J-A24.43): in a single-nucleus town the plaza scores 1.5 (kind 1.0, routes 0.5), a
   gate at most 0.9 (kind 0.3, trade 0.6), the bridgehead at most 0.85 and the busiest street at most 0.65, so an
   inland walled town's plaza wins — the routes converge there — and the default reproduces MFCG; in a port the harbour
   scores 1.0 + 0.6 × min(1.5, p ÷ `portRef`) — 1.6 at the median port (`p` = `portRef`), above the plaza, 1.3 at half
   the median, below it, the two equal at `p` = ⅚ `portRef` — so the principal market leaves the plaza for the harbour in
   at least half of the port seeds before the penalties, the share §13.2's T24-1 and §13.7's row require (measured at
   M2b with §13.7's re-tune fallback), and stays on the plaza where a port's trade is mostly overland. The parity presets
   pin the plaza by setting every other kind weight to its off value (item 23); a port, a bridge town or a gate-focused
   trade may put the principal market at the water, the bridgehead or the gate. A **flanking square** is a `market` reservation of the principal row's area
   band (the plaza band of (2)) laid astride its way's stretch, that way passing through it as an arterial passes a gate
   plaza (§4.8): the reservation is impassable to every other route except at its `attach` points — the two points where
   its way enters and leaves and the midpoint of each flank, where a side street may end as at a plaza — and S4 places
   `width_knot` vertices at those two points (§4.3), so the square reads as the widening it is. The chosen site, its score
   and the runners-up are recorded in the report; `setAttr` on the reservation's `rank` or a `drawBoundary` moves the
   market by hand (§7.1). *The batch.* The plazas, the precinct, a flanking principal market's square, and the castle
   bailey enter L1 as barrier faces carrying the `reserved` role: no way crosses them (S4, S5) other than a
   flanking market's own way, S8 does not cut them, and the claimed entity is built inside them (§4.7, §4.8). Every other
   claim larger than a block is S7b's (§4.5 S7b (3)), every secondary market among them except a polycentric nucleus's
   plaza, which this step ranks secondary (1).
13. **Destinations** are typed entities: the plazas' attach points and a flanking principal market's (12); each gate and
   its bearing (an **external bearing** per
   gate for a walled town; an unwalled town derives its bearings by the same law on its own land); the **town bridge** —
   the crossing site nearest the centre when a river passes through the stage-1 region, which (1) scored the centre
   against, connected in town (§4.3) — while every other site becomes a bridge only when a route (S4) or a growth proposal
   (S5c) uses it (S1 (5)); the harbour (its destination node is its basin's landward attach point; its route, (11)); the
   castle's town-side gate; the precinct. **Island towns (FTG-19):** when the settlement's land component does not touch
   the frame, external destinations are shore points — the harbour, one **landing** per requested bearing (the shore point
   nearest the bearing with the best deep-water score) and a ferry point — and O4 (g) counts landings as the external
   connections.

**Dossier-backed elements at creation (item 22 (d); with §7.7; J-A22.41).** A brand-new map from an existing dossier
holds every dossier element from the start: the blueprint's assignments and the dossier-backed elements enter S2's
manifest as **fixed rows** — one (class, ordinal) each at the head of its class, present at every population and never
withdrawn by the roster's arithmetic, so prefix stability holds with them — and S7b allocates them before the roster's
free demand in each rank of its order (§4.5), S10 (3) claims them and S10b's `generation` request places them (§4.7).
The log's positions 0…k `assign` events (§7.7) record these placements as the generation run's own — they place nothing
a second time — and a replay reproduces them because the base derivation reads the same creation prefix of the log (§7.4). A dossier element that arrives after
creation is a `dossier` request on the current map (§4.7 S10b, §7.7), and one that arrives with an epoch's inputs a
mutation at that epoch (§4.11).

**S0's sewer feature (item 14; II.7.1).** `toggles.sewers ∈ { auto, on, off }` joins the blueprint's toggles: at TOWN an
`auto` is resolved by the feature table's P(sewers) row — II.7.1's law of the request's population and the intent's
`wealthLevel` — drawn from `blueprint.features` with the other auto features and recorded in `autoResolved`; at CITY and
METROPOLIS the rung row fixes existence on, and a requested `off` hides the underground layer instead, reported in
`requestedVsBuilt` (II.7.1). The resolved value is `Features.sewers`, which every dependant reads from the model (II.7).
=== REPLACE ### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims ===
### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims

**Perimeter and margin band.** S6's one L1 batch first inserts the **settlement perimeter** — the last stage's boundary
offset outward by the ribbon regime's block-depth band top (50 m) and rounded (FTG C17) — as a chain carrying
`district_bound`, closed against the arterials, shores and frame it meets. Every coarse face outside it belongs to the
hinterland pseudo-district and every face inside to a grown district, so the hinterland's faces are fixed before any
district is typed and no later stage splits a district face to make hinterland (§4.9). **The margin band (J-I9):** along
every L1 edge two face sets share without a way — the perimeter, and any reservation boundary two districts share (a
`reserve` seam run, II.1) — S10's eager step (0) (§4.7) lays a band of half-width 2 m (2 m on each side; a table value
≥ the residue class's minimum width), split by the edge into one unbuildable L3 part per side, typed `residue` with its
side's ground role (on the perimeter a backland strip inside and a headland outside), so the pooled districts and the
hinterland unit never write the edge they share (§3.3 pool step 3): their plot, alley and furlong lines end on the band's
inner edge inside their own set. A regeneration on either side re-lays its own side's part (§7.3 item 2); an edit that
moves the perimeter or changes which face sets share an L1 edge without corridors (`drawBoundary`, a merge or split,
`outskirtToDistrict`, a moved channel) re-lays the band on both sides of every such stretch and removes it where the
sharing ends, through S6's operator (§7.3's S6 row).

**Grower (CONFIDENCE B9).** Seeds = the sited features (every market — the principal's reservation and each secondary's
claim, one `market` district per market, item 24 — the harbour, gates, castle, temple precinct, river banks, the
bridgeheads — both landward ends of every bridge that carries an arterial, the town bridge among them — and parks) plus a
density-guided remainder, `N_d` seeds in all (below). A grower (MFCG 12710731's district-builder idea) claims adjacent coarse faces
of the L1 skeleton **in round-robin turns**: on each turn it skips with probability `1 − rate(kind)` — the
`district.growthRate` table, one row per seed kind: gate, castle and bridgehead seeds 0.1, riverbank seeds 0.5, every
other kind 1 (provenance `ref:MFCG 12710731 growth rate by seed kind (code)`, P13; J-A47.41) — and otherwise absorbs
one admissible neighbour, drawn uniformly among them. A neighbour is **admissible** when the edge it shares passes the
**edge test** = (no arterial of class ≥ primary, no wall trace, no water, no reservation boundary) unless the seed kind
allows it, and the grown patch passes the **patch test** = (area within the district band, compactness ≥ 0.5, no hole);
a hole check → split. A round gives every unfinished grower one turn, in seed-id order; a grower with no admissible
neighbour is finished, and growth ends when every grower is. Each turn's skip and pick draws come from `district.seed`,
keyed by the grower's seed lineage (its feature's; a remainder seed's first face) and the turn's number, so §7.3's S6
operator re-grows a scoped regroup by the same turns. Faces no grower could claim — enclosed by barriers or by band tops
— seed further districts in face-id order, grown by the same turns (MFCG 12710731's leftover rule). A district whose
area ends below the band's floor merges into the neighbour with the longest shared edge, except one grown from a seed
whose rate is below 1: it keeps at least its seed face, so the rates set its size (the small gate, castle and bridgehead
wards behind §13.5's MFCG anchors row, 2.4–17.6 ha at size 40; J-A47.42). The arterial barriers and the count law are
ours (J-A47.41). **One law for count and band (MFP-10):** `N_d = round(3.5 · √(A_ha / 10))` seeds over the settlement's
land A (FTG's 10 ha anchor sits in its middle; MFCG 12710731 keeps ⌊√(city cells)⌋ seeds, which this law matches in
metric terms on its size sweep), band `[0.5, 1.5] × A / N_d`, so the mean district grows as √(10A)/3.5 — ≈ 7 ha at 60 ha
of land, ≈ 14 ha at 250 ha, ≈ 22 ha at 600 ha. A district's `faces` is a `FaceRef` (§2.5): its L1 faces and every face nested in them (§3.3
pool step 3) — after S8 cuts lanes inside them, the finer faces inherit the district through `parent` (§2.8), so
containment is 100 % by construction (O11 b; §5.3's containment row checks it).

**Quarters (MFP-10, VIS-4; J-P2, J-P28, J-I1).** After typing, S6 builds §9.1's quarter merge tree (`QuarterNode`) once per
model: it repeatedly merges the adjacent pair of nodes with the smallest cost — combined area, plus 1 000 ha when their
kinds are of different families (central + market, docks + riverbank, gate + ribbon, craft + craft … share a family),
plus 10 000 ha when a wall or water barrier separates them — until one root remains, ties by id. The **quarters** are the
tree's cut at `min(N_q, L)` nodes — after `L − min(N_q, L)` merges, L the number of districts the grower produced, so
every district stands alone when `N_q ≥ L` (`QuarterNode.cityCut`; N_q can exceed the district count at TOWN) — with
`N_q = round(1.37 · B^0.267)`, B the roster's building count: the least-squares fit of MFCG's district counts on its size
sweep (9 / 12 / 18 / 22 / 24 districts at 1 475 / 5 242 / 13 091 / 31 951 / 48 379 buildings), giving N_q = 9–10 at TOWN
(1 200–1 500 buildings), 13–14 at CITY (4 500–6 000) and 17–18 at METROPOLIS (12 000–15 000) (receipts
`docs/validation/bench/fixall_pipeline_mfcg_fits.out`, `fixall_pipeline_r2_quarters.out`). S13a names every node of the
tree; the quarters are the city-band label unit (§9.4).

**Typing (G-P5; MFP-7; J-P1).** A data-driven scorer per district kind reads the roster's remaining demand per class,
the kind's relation rows (`RosterTables.districtKinds[].relations`, §10.2 — item 16's templates: docks at the harbour,
gate wards at gates, central → market / merchant, a `market` kind at every market reservation, noxious crafts downstream
and downwind, near the castle → military / administration, waterfront → docks) and a random term; faces are typed
**greedily from the largest** with a **mixed-use floor** (no single-use district unless requested, R5). Kinds are
**feature-named**; wealth is not a kind — "the rich quarter" is a description the naming engine derives from the
prosperity field (§10.4) — so no district is zoned residential or by class. The district's **identity**, read after
placement from its character vector, names and describes it (item 72's paragraphs of this section); the kinds stay this typing, which the later stages read. **A staged power relation (item 88; J-A88.42).** When the dossier port fills a staged `PowerRelation` (§2.7; empty in the base), the scorer gains one soft row between the S6 kinds the quarter-identity rows name for its two powers — the `kind` of each identity row whose `power` is that power's `PowerStanding.kind` (§10.2; §7.7 item 2) — an `adjacent` row for an alliance and an `avoid` row for a rivalry or a feud (any other pair type none), weight `relation.adjacencyWeight` (0.3; our own, `extension`, 0 in the parity presets) × its strength. **Shanty districts (FTG's rule as the
default; items 27 and 23).** A **shanty / squalid** kind is admitted only when the roster's **average band** — the
household shares' mean over the band set below — is `poor` or `squalid`, and only once the settlement's first half is
built (`shanty.trigger`, `shanty.afterStageShare` 0.5; provenance `ref:FTG shanty rule`); where admitted it replaces the
typing of the districts of lowest mean pass-1 band **among the districts of the stages whose cumulative quota share (§4.2 S2's stage rows) exceeds `shanty.afterStageShare`** (a district's stage is its `growthStage`, §2.5), as many as its demand fills, and takes the cluster row (§4.7 S11, item 70; FTG's tents row in the parity presets). Our preference that shanties lie outside the enceinte
is the `shanty` kind's `extramural` relation row — soft, `extension: true`, weight 0.6, zero in the parity presets — a
tendency, not a law (J-A27.43); the `shanty` toggle (S0) forces the kind on where FTG's trigger would not fire. MFCG's
"one prominent feature per named type" survives as the district's `namingFeature`. A district's `fabric` is `bent-cut`
unless a template is requested (II.1, II.2).

**Fields (owner: prosperity is a gradient and a band; AM-6).** The **prosperity field**
`P(x) = Σ_i w_i · kernel_i(x) + characterOffset(district) + ε(x)`, clamped once to [0, 1], with driver kernels from a
table: distance decay to the plaza and to every market — the principal at the row's full weight, a secondary at the
secondary row's (item 24) — to main streets, gates, water and the harbour (+); elevation above the flood line
and upwind (+); low, damp, downwind, flood-prone (−); walls (−); attractors at the reserved institutions (castle,
precinct, plaza); the three dials' driver terms and the district pressure (item 72); `ε` a low-frequency fBm from the field's own sub-stream with a declared share (default 0.15); smoothed
by a Gaussian of one block width (σ ≈ 60 m at CITY) so neighbours vary gradually; stored per coarse face and as a raster.
*Mechanism (budget: §12.4):* 32 m cells over frame + margin; each driver kernel splatted within its radius (or one
distance transform per driver class); the Gaussian an O(N) three-box blur. It is computed in **two declared eager passes**
(LC-2): **pass 1** at S6 — first the driver kernels that exist after S5 (the kernels S5d uses; S6's typing reads this
driver-only state), then, after typing, the district-type term `characterOffset(district)`, which completes pass 1 (S8's
block bands read pass 1 complete); **pass 2** at S10a (§4.7), adding the kernels around the noxious trades, prisons,
middens and institutions the block allocation placed. S10 onward reads pass 2.
* **The band set — the references' wealth models as the default (item 27; owner: "prosperity is a gradient and a band
  rather than binary").** The bands are one named, versioned table, `prosperity.bands` (`BandSet`; §7.6), read by every
  rule table that keys a row by band: granularity and the designation templates (§4.7; the site-plan table folded into
  them, J-A19.41), greenery (§4.9), the
  hidden-plot shares (§4.6), the island supply law (II.6), the ladder rows (§4.11), the interior ladder's rows, read at
  the occupants' band (§2.6, item 28 (f)), and the roster's household and lifestyle rows (§10.2). The default set has
  **six bands**, in order, each declared equivalent to the reference class it reproduces:

  | band | FTG lifestyle tier it reproduces | MFCG ward class it reproduces (the open-source model's) | default household share (FTG's captured distribution, weights 1 / 1 / 20 / 40 / 20 / 10; provenance `ref:FTG lifestyle distribution`) | rows of the four-row tables it reads |
  |---|---|---|---|---|
  | `squalid` | squalid | slum | 0.011 | poor / dense (with §4.7 S11's hovel and cluster rows — FTG's tents row in the parity presets) |
  | `poor` | poor | slum | 0.011 | poor / dense |
  | `modest` | modest | craftsmen | 0.217 | modest |
  | `comfortable` — **the middle band** | comfortable | craftsmen | 0.435 | interpolated between modest and prosperous |
  | `prosperous` | wealthy | merchant | 0.217 | prosperous |
  | `rich` | aristocratic | patriciate | 0.109 | rich |

  MFCG's ward-class shares — 0.70 / 0.17 / 0.07 / 0.07 of the open-source model's 30 class-typed ward-deck entries for
  craftsmen, slum, merchant and patriciate (receipt: `research/findings/os-model.md`, the deck's composition) —
  are the anchor of §13.5's built-land share per band group, never a district typing (J-P1). A rule table may carry rows
  for some bands only: a band without a row of its own takes the linear interpolation along the value between the
  nearest rowed bands' centres — the existing rule; that is how the four granularity rows serve six bands, and how
  the class-mix weights (§4.7 S10b, item 71) are read at a plot's value — and an end band takes the end row. The **middle band** — the band §4.11's geometry floor bounds a once-richer plot's manifested
  geometry to (item 31: the shell, never the interior, which follows its occupants' band through §2.6's interior
  ladder, item 28 (f)) — is designated per settlement as the band that holds its median household under the roster's
  wealth shares (`comfortable` under the default shares above, where the cumulative share first passes one half: 0.239
  after `modest`, 0.674 after `comfortable`), recorded on the town's `FieldBands` (`FieldBands.middle`) at S6 with the
  cuts and moved only as they move (J-A27.42, J-A31.45); each settlement's middle is its own because its shares and
  cuts are. The continuous gradient between and within the bands is our extension; a parity preset keeps the
  reference's tier count and shares and sets the interpolation's blend to a step at each cut (item 23; J-A27.41).
* **Bands (LC-6, FTG-2).** The cut points are computed **once per town** so that the share of built land in each band
  equals that band's share of the plot land the roster demands (household wealth shares × the band's plot areas, S2) —
  band capacity and demand agree by construction — and recorded as the town's `FieldBands` (§2.5), with the band set's
  ids in order and its middle designation. They move only by an explicit `setAttr` on that record, which re-derives every
  block whose band changes, or by an epoch; a field brush (§7.2) never moves them. A block keeps its recorded band unless
  its value crosses a cut point by more than the hysteresis (0.02), so a replay reproduces the session's bands; a block
  whose band changes past the hysteresis at an epoch is marked DUE for §4.11's survivors' ladder (item 31). Bands are
  used **only where a table needs a class**; continuous rules (coverage, plot size, greenery share, building scale)
  **interpolate linearly between band rows along the value**, so quarters blend at their edges.
* **Over time (LC-12).** An epoch re-evaluates the drivers with the new circumstances; surviving plots keep their built
  state and change only through §4.11's explicit, rate-limited transformation events — the survivors' wealth ladder,
  whose rungs a DUE block climbs by duration and by its stock's replaceability, bounded by the geometry floor (item 31);
  under decline the field contracts toward the survivors' core (§4.11).
* **The owner rule, clause by clause (AM-6).** Continuous field: `P(x)`. Predictable drivers: the kernel table. Controlled
  random component: `ε` with its declared share. Banded only where a table needs a class: `FieldBands`. Continuous rules
  interpolate: §4.7, §4.9. Dynamic over time yet predictable: epochs move the drivers, survivors transform by rule.
  Editable: the brush and `setAttr` on `FieldBands`.

The **density field** and the **greenery propensity field** follow the same construction with their own driver tables and
`FieldBands`. Each field's district-type term is applied after typing as the last step of its pass 1, as above.

**S7b Allocation and district claims (after S7; LC-2, FTG-1, FTG-3).** Everything that decides the town's content is
decided here, once for the whole town, before any lane is cut:
1. **Town → districts.** The roster's demand per class × band is allocated to the districts — and, for the outside classes
   (farmsteads, mills, quarries, mines, lumber yards, fisheries), to the **hinterland** pseudo-district (§4.9) — by
   capacity (each district's built land per band from pass 1) and affinity (the district kind's relation rows, §10.2,
   adjacency to features, resource sites from `SiteResources`), greedy in a declared order (institutions, then large workplaces, then
   households; classes by priority then id; districts by score then id) from the town's `alloc.district` stream, derived
   from the town's lineage on demand (no allocation record stores a stream key; §2.5, §6.1). A bounded reconcile (≤ 3
   rounds) moves counts between districts before any placement. The result is persisted as one `Allocation` per district
   and one for the hinterland.
2. **Sub-districts (COV-FTG-E02).** A class carrying a cluster tag (a trade group) whose allocation in a district exceeds a
   threshold share gets a `SubDistrict`; S10a gives it a contiguous group of blocks sized to its allocation, so industries
   clump inside their district as FTG's sub-districts make them.
3. **District claims (J-P41).** Every item larger than one block — institutions whose requirement exceeds the district's upper block area (`e_hi²`, as §4.6's stop test defines it), the district's share of the park and green quota (§4.9), area-bearing assignments, a castle's esplanade —
   is sized from its requirement table and cut out of the district's coarse faces **other than its `wall_strip` faces** by
   `claimSubFace` (its `within` is that face list, §3.4) at the best siting score among them, and entered as a
   `Reservation`; S8 cuts around it as a hole (the slit exists), S10 keeps only sub-block claims, and S12b builds parks
   only on reserved faces or residue. No S7b claim takes strip ground, as no S8 cut does (§4.6): a strip's ground is the
   band, setback and glacis S10's step (0) builds, where the hard invariant "footprints ∩ (band ⊕ setback) = ∅" leaves a
   claim nothing to stand on, and only S7's gate plazas use a strip's setback zone (§4.8); a castle's esplanade is
   therefore claimed beyond the bailey's outer strip, so the spacer reads as glacis, then green (§4.9). **Test:** 100 % of
   institutions and parks larger than one block placed at their requirement (O18 f), and 0 S7b claims meeting a wall strip.
   **Secondary markets (item 24).** The `N_markets − 1` secondary markets S2 demanded, less any polycentric plaza S3 (12)
   ranked secondary, are claims of this step: each is sited by the market row's district score — gate wards, the harbour
   and riverbank districts and the districts of later stages first (MFCG's secondary plazas arise in its later wards; FTG's
   market squares by its district rules), then any district by demand — under two rules whose defaults are MFCG's
   behaviour: **never touching** (`market.minSeparationM` 150 between market reservations, and no shared edge with another
   market or the plaza) and **small patches** (the claim takes the smallest coarse face of the chosen district that holds
   the secondary row's area band, 0.10–0.25 ha at CITY); it enters as a `market` reservation with `rank: 'secondary'`, its
   district is typed `market` (a feature name, J-P1), S8 cuts around it, and §4.7 S11's stall and centrepiece rules read
   its rank. A market that cannot be sited under the rules is reported and dropped (F-SITING), never forced (J-A24.42).
4. **Edge greens and orchards (§4.9).** For every district that touches the settlement perimeter and whose band row carries
   the edge-green-or-orchard rule, S7b draws the choice — before (3) cuts the claims — from that district's `alloc.district`
   stream with the rung's probability (`RungProfile.greenery.edgeGreenProb`, §1.1): a **green** becomes one of the
   district's claims (3), built by its own S12b on its own faces; an **orchard** becomes a row of the hinterland's
   allocation, `{ cls: 'orchard', areaM2, near: district }`, built by the hinterland unit's S10 in the first ring beside
   that district. No district stage ever writes a hinterland face.
5. **Sky pseudo-districts (owner-staged; AM-2, AM-10, AM-13, AM-15; II.6).** When the model setting
   `recipe.layers.islands` is on for a rung whose row admits islands (II.6 (1)–(2)), S7b first draws the island count on the
   `island.place` stream by II.6's count law and, for each open slot, creates its sky pseudo-district's `Allocation` —
   before (1), and before any island exists — filled from the richest band down under II.6's supply law: the allocation's
   plot land is the supported area `A(S_carried, S_town)` × the dense core's plot share (0.62, §4.2 S2), recomputed as
   households are added, until it is used or three districts' worth of households are allocated; a slot whose supported
   area is 0 gets no allocation. An `institution` island's allocation holds its one institution (the `IslandInstitution`
   row's, or the assignment's) and exists only where the town's supply admits it. The ground's districts are then
   allocated the remainder, so the population stays whole. `SkyStrategy`, registered after S7b by declared I/O, takes
   these allocations, each with its supported area and altitude, and sizes and places each island to hold them (II.6).
6. **The underground pseudo-district (owner-staged; item 12, II.7.3).** When `Features.sewers` is on and the preset yields
   navigable mains, S7b creates the underground pseudo-district's `Allocation` after (5) and before (1) — the poorest band's
   `undergroundShare`, the classes whose row is `underground: 'preferred'` and, in an epoch, the crowding hook — capped by
   the predicted navigable capacity; the rows, the law and the cap are II.7.3's; the ground's districts receive the
   remainder as they do for the sky.
7. **The undercity (owner-staged; item 65, II.7).** Where an undercity exists, S7b creates its allocation after (6) and
   before (1) — the H households of II.7.5's size law (the squalid band's first, then the poor band's), the outlawed and the clandestine institutions whose mode is
   underground — capped by the void's capacity; II.7 states the rows and the cap, and the districts above ground receive
   the remainder, so the population stays whole.

**The due mark and the dossier's rows (items 22 and 31; J-A31.45).** §4.11's geometry floor reads `FieldBands.middle`
as the band-set bullet above designates it (J-A27.42, J-A31.45). An epoch's re-evaluation acts on a block only by marking
it **due** when its value crosses a cut by more than the hysteresis above (`Block.due`, §2.5); §4.11's wealth ladder does
the rest, and the "Over time" bullet reads through it — surviving plots transform by the ladder's rungs, never by a
re-derivation. S7b allocates S2's fixed dossier rows before the free demand in each rank of its order (§4.2 S2,
item 22 (d)).

**Neighbourhood character, identity, the three dials and the band range (item 72; owner: "neighborhoods …
more or less defined by the mix of assigned lots within them and how they correlate to relevant political powers as well
as the spatial flow of trade … This assignment also helps to assign names to neighborhoods").** A district's kind (Typing,
above) is what the stages read to build it; its **character** is what it has become — derived from what was placed in it,
never assigned once. This paragraph is the one statement of the character vector, the quarter identities, the three dials,
the band range, the pressure and the partition. The records are §2.5's (`CharacterVector` — this derived profile, the one
meaning of "character"; the per-district input once also called character is `DistrictIntent`, §7.7; J-A72.41 —
`District.identity`,
`District.bandRange`, `District.pressure`, `District.nameHistory`) and §2.7's (`Institution.powers`); the row types are
§10.2's; the inputs are §7.7 item 2's circumstance slices — the dossier's facts, or the blueprint's own as their stand-in
(item 20 (h)).

1. **Value, not volume — significance (J-A72.45; owner: "each church individual value is greater than the lodging").**
   Every count, share and dial below weighs a placed instance — a use (workplace, shop, institution) or a residential
   building — by its **significance** `σ = BuildingClassRow.significance × rank × size × patronage`: the class's base value
   (a cathedral far above a church, a church far above a lodging house, a guildhall above a workshop; houses, lodging and
   common shops low — our own rows, §10.2), × the institution's rank (1 unless its institution row or the dossier gives
   one), × its size (its footprint area over its class's median footprint, clamped to [0.5, 2]), × its patronage (1 + the
   dossier's wealth or rank of the institution when it gives one, clamped to [1, 2]). So many lodgings never outweigh a
   few churches.
2. **The character vector — five components, derived (item 72 (a); `CharacterVector`, §2.5).** Written by **S12c
   Character** (§4.1: town-wide, on the generation worker after the pool's merge, before S13a) and by each epoch's
   character step (§4.11): a pure function of the placed lots, the slices and the geometry, draw-free, recomputed on load
   and equal on recomputation (J-DET-12). (1) **Lot mix** — for each class family `f` (a family is a `tags` value of the class,
   one of the families §10.2's identity rows name — religion, craft, trade, lodging, residential, military,
   administration, harbour, noxious, learning, arcane, crime …): `mix[f] = Σ_(i∈f) σ_i ÷ Σ_i σ_i` over the district's
   instances. (2) **Political alignment** — for each power `p` of the powers slice: `powers[p] = Σ_i σ_i · w_i(p) ÷ Σ_i σ_i`,
   `w_i(p)` the partition weight of (7); when the port fills a staged alliance (`PowerRelation`, §2.7; item 88), `powers[p]` gains `relation.spill × strength × powers₀[q]` and `powers[q]` the converse, from the unspilled values `powers₀`, the vector then scaled back to its unspilled sum (`relation.spill` 0.25; our own, `extension`), while a rivalry or a feud acts only through typing's row (above). (3) **Trade position** — `trade` = the district's frontage length on each way × the
   way's trade weight (§4.3's `TradeFlow`), summed and divided by the town's largest such sum (the busiest district 1);
   `tradeBearingCdeg` the weighted mean bearing of the gates whose routes cross it. (4) **Economic role** — for each
   sector `s`: `sectors[s] = Σ_(i∈d) σ_i · w_i(s) ÷ Σ_(all i) σ_i · w_i(s)`, the district's part in the town's weighted
   presence of that sector. (5) **Relations** — `mainRoad`, the share of its frontage on `through` and `primary` ways; and
   `anchors`, the significant institutions (σ ≥ `character.anchorSigma`, 5) within `character.anchorRadiusM` (400 m) from its
   boundary, each weighted `σ_anchor × (1 + c) ÷ (1 + distance ÷ radius)`, where `c` is the district's contribution share —
   its share of the anchor's suppliers (plots at the tail of the anchor's supply edges, §10.2) and of its members (the
   `Membership` records of the anchor's power housed in the district, §2.7, when the module has materialised them, else 0).
3. **Three distributions (item 72 (d′); `BuildingClassRow.distribution`, §10.2).** **`district-defining`** — a class that IS a
   district (a red-light district, the slums, a foreign quarter, a guild district: dossier institution kinds). Each dossier
   instance claims ONE district: S6's typing places the defining instances first — they are known before placement, S2's
   fixed dossier rows (§4.2 S2) — each taking the not-yet-claimed district that scores highest by the relation rows of its identity row's `kind` (§10.2) or, for a row without a kind, by its defining class's own relation rows (§10.2's brothel rows; J-A72.51) (a
   red-light district near the docks, the gates and the inns; the slums at the poorest edge, by the `shanty` kind's rows),
   one district per instance, and two instances in one district only when no unclaimed district scores above zero
   (reported). The instance shapes its district without filling it: S7b allocates it the ordinary demand for its band with
   the defining class's share raised to its identity row's `targetShare` (§10.2; more brothels — still a smith, an inn
   and houses); its
   band, granularity, greenery and lighting rows are the defining kind's (the slums: the squalid band through the kind's
   `characterOffset`, and §4.7 S11's cluster rows, item 70); its identity's source is `dossier`. A dossier that adds one to a
   town already drawn converts the district whose character vector lies nearest the kind's identity row toward it by item
   22's least-disruption mutation, as a dossier event at §4.11's step (e) (§7.7 item 5): its S6 kind re-typed, the
   allocation's delta placed in S10b's least-disruption order, nothing re-rolled. **`dispersed`** — every ordinary class
   (smiths, alchemists, chapels, bakers, inns, shops, houses): S7b (1) spreads it over all districts by capacity and
   affinity with a controlled random share of the affinity score (`dispersal.random`, 0.3; drawn on `alloc.district`, no
   new concern), so some districts hold several, some one, some none, and no rule gathers a dispersed class into one
   district (J-A72.46); FTG's sub-district clumping (S7b (2), COV-FTG-E02) stays the parity presets' behaviour and a
   cluster-tag option inside one district. **`singular`** — a one-off anchor (a cathedral, the palace, the university,
   the great market): sited by its own rules (S3's reservations, S7b (3)'s claims, its hard rows), weighing on its district
   through its σ and on the districts around it through (5)'s anchors.
4. **Quarter identities (item 72 (d′); `RosterTables.quarterIdentities`, §10.2).** Each row is a σ-weighted count of class
   families with a threshold (a count, or a count per hectare for the rows that scale with the district), an optional band
   condition, a priority and a `singular` flag — the religious quarter: chapels and churches weight 1, a cathedral or a great
   temple 3, threshold 3, so three churches or one cathedral alone suffice. S12c gives each district the highest-priority
   row whose threshold and band condition it meets (a `singular` row goes to its highest-scoring district only); else its
   **dominant component** — the family of its largest `mix` share, or the sector of its largest `sectors` share when that
   exceeds `identity.dominantMin` (0.35) — named by that family's or sector's row; else a **plain residential identity** by
   its band ("the modest quarter"): an identity, never an S6 kind, so typing stays feature-named and no district is zoned
   by class (J-P1 refined, J-A72.42). A dossier-declared identity — a district-defining instance's, or the kind bias of a
   naming claim matched to the district (§7.7, item 82) — wins over every emergent one. `District.identity` records the
   row, its source (`dossier`, `emergent`, `dominant`, `plain`) and the week it was taken (§2.5). The kind stays the
   typing the later stages read; the identity names and describes the district (§10.4; J-A72.42).
5. **The band range (item 72 (d‴); owner: "this neighborhood prosperities defines the bounds (floor, and ceiling) of what
   any building inside of it can be").** S10a writes each district's `bandRange = [floor, ceiling]` (§2.5) from its
   area-weighted mean pass-2 value by `RosterTables.bandRanges` (§10.2: a row per band of the band set, split at the band's
   middle — the rich band's upper half the rich band alone; a prosperous district spanning the middle band to rich, item
   71's mix; a poor one squalid to modest), so S10b and S11 read it before they place and build. Every prosperity-driven
   state of a building inside the district stays in the range: the class a new build or a re-designation takes (item 71's
   weights outside it are 0, the rest renormalised, §4.7 S10b), the template row's band it reads (a band outside the range
   read at the range's nearest end), its condition and upkeep, its extensions (the mutator's adapt and add steps, §4.7
   S11), its occupants' band (S7b (1) allocates by the range `RosterTables.bandRanges` gives at the district's area-weighted mean pass-1 value — a provisional reading, never stored; S10a, which writes `bandRange` from pass 2 at its step (ii), moves any household S7b allocated to a district whose written range excludes its band to the first district in S7b's order whose written range admits it and whose capacity holds it, before its step (iii) distributes the households to blocks — each move reported; a household no such district holds going to the district, in S7b's order, whose written range lies nearest its band and whose capacity holds it — or, when it fills a dossier's population and no district's capacity holds it, staying in its own, housed there by §4.7's re-provision (*Households per building*; J-A20.72) — its band read at that district's range's nearest end (a derived band, reported), never a shortfall, so the population stays whole (§7.7 item 2), as §13.2's T19-4 bars, and only a household that fills no dossier's population and that no district's capacity holds meeting F-SITING's ladder (§5.2); the range always holds the district's own band; J-A72.50) and its interior-ladder rung (§2.6, read at the occupants' band). Item 31's geometry
   floor still keeps a standing shell — a mansion in a district that fell keeps its geometry, while its condition,
   occupants and interior are bounded by the range (subdivided, worn). No informal cluster and no hovel goes up in any
   district whose range excludes the squalid band (§4.7's *Informal clusters*).
6. **The three dials (item 72 (d″), (d4)).** Driver terms of the prosperity field with declared weights, never replacing the
   other drivers, each moving a building's prosperity-driven state within its district's range and clamped there (5); they
   read the **applied** standings and shares of §4.11's hysteresis (`PowerStanding.appliedStanding`, §7.7 item 2, and each sector's applied share, the fold of §4.11's *The dials' inputs over epochs*, derived on replay and never stored). With `N` the powers of the slice, a power's amplification is `A_p = N × appliedStanding_p` (1 at an even standing). When the dossier port fills §10.2's staged rows (`PortRows`; item 88; J-A88.42), the governing power's `A_p` (the standing whose `governing` holds) is multiplied by `PortRows.legitimacy`, and a dossier institution's visible impairment (`DossierInstitution.impairments`, §14; §7.7's F4 row) whose type is a non-physical row of `PortRows.impairments` (`physical: false`) lowers that institution's own term (below) by `conditionSteps × severity × dial.conditionStep`, `severity` the impairment's; while the rows are empty legitimacy reads 1 and no impairment acts. **The institution dial:** every class and infrastructure element answers to its powers
   (`BuildingClassRow.powers`, `RosterTables.powerLinks`, §10.2; the dossier's `Institution.powers` override, §2.7); an
   instance's term `dial.institutionWeight × Σ_p w_i(p) × (A_p − 1)` scales its institution attractor kernel in field pass 2
   (the kernels S10a adds, above) and steps its condition by one step per `dial.conditionStep` of the term, and a rising
   power's institutions extend within the range (the mutator's adapt budget). **The quarter dial:** a district whose
   identity row names a power (`QuarterIdentityRow.power`) adds `dial.quarterWeight × (A_p − 1)` to its `characterOffset`
   in pass 1 — at generation only for a dossier-declared district-defining quarter (known at S6), for an emergent identity
   from the next epoch on (J-A72.40). **The economy dial (owner: "the market share affects their application"):** a
   sector's amplification is its applied share over the even share, `A_s = S × share_s` (S the sectors the slice lists: an
   even mix gives every `A_s` = 1), an instance's the blend `A_i = Σ_s w_i(s) × A_s` of (7); its term
   `dial.economyWeight × (A_i − 1)` scales its class's driver kernel in both passes (a trade-led town lifts its markets,
   warehouses and quays; a toll-led one its gates, bridges and roads) and steps its condition as above — so a 40 % sector
   amplifies its classes twice as strongly as a 20 % one, an even mix changes nothing and there is no term for rank
   (J-A72.49); the same shares shift the roster's town-level character (§4.2 S2, §10.2; J-A72.43). **Trade as a driver:** the gate and main-street kernels (above) scale by `1 + trade.kernelScale` × their
   gate's or way's trade weight (§4.3; `trade.kernelScale` 1.0). The map reads the make-up and the standings; it never
   models the economy or the powers (D-10, D-32; item 20). Defaults (our own, calibratable): `dial.institutionWeight`
   0.10, `dial.quarterWeight` 0.08, `dial.economyWeight` 0.10, `dial.conditionStep` 0.05, each an `extension` that the
   parity presets set to 0, as they do `trade.kernelScale`.
7. **Shared buildings are partitioned, never doubled (item 72 (d5); J-A72.48).** An instance serving several powers or
   sectors receives one amplification: its weight toward power p is `w_i(p) = link_i(p) × appliedStanding_p ÷ Σ_q link_i(q)
   × appliedStanding_q` over the powers it serves (`link` its class or override weights), toward sector s likewise with the
   applied shares; each set sums to one, its amplification is the weighted blend of theirs, never their sum, and its
   contributions — its σ in (2)'s mix, powers and sectors and in the pressure — split in the same proportions. A guild
   chapel serving the craft guild and the church counts once, split by their relative strength.
8. **The pressure (item 72 (d‴); J-A72.47).** What a dial or any building-specific amplifier would push past the range is
   kept: at each epoch's character step (§4.11) `District.pressure` (§2.5; in the model digest; written only by epochs)
   becomes `pressure.retain × pressure + Σ_i σ_i × excess_i ÷ Σ_i σ_i`, `excess_i` the amount by which instance i's
   amplified value would lie above the ceiling band's upper cut (positive) or below the floor band's lower cut (negative),
   `pressure.retain` 0.5; the next epoch's pass 1 adds `pressure.weight × pressure` (0.5) to the district's
   `characterOffset`. So a thriving institution lifts its neighbourhood over epochs until the district's value crosses its
   cut past the hysteresis (above), the range moves and the buildings may follow by §4.11's ladder. No brush writes it;
   with no epoch it is 0.
9. **Over time (item 72 (b)).** At each epoch the character step recomputes the vector, adds the clamped excess to the
   pressure and re-derives each identity with hysteresis: a district takes a new identity row only when that row's
   weighted count exceeds its threshold by `identity.hysteresis` (20 %) while the held row's has fallen below its own, for
   `identity.dwellEpochs` (2) epochs running; a district whose held identity row names an S6 kind
   (`QuarterIdentityRow.kind`) is re-typed to it by the epoch (a lifecycle `edit` of `District.kind`, cause the epoch) —
   later placements read the new kind's rows, nothing standing is re-rolled and the stock follows by §4.11's ladder. A new
   identity renames the district only by §6.3's epoch case (§10.4), the old name kept in `District.nameHistory`.
10. **Emulation and staging.** The vector, the identities, the range and the partition are derived and draw-free; the
   dispersal share, the identities' kinds, the dials and the pressure are `extension` rows, zero or off in the parity
   presets, where the kinds stay S6's and no dial enters the field (item 23). The dossier's standings, shares, partners and
   district-defining institutions are SettlementForge inputs, typed now as §7.7's slices and assignments; the epoch's
   recomputation, renames and pressure run on the staged evolution engine's epochs (§4.11), whose step and records the
   base carries. The bars are §13.2's (item 72).
=== REPLACE ### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model ===
### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model

**S9 Corridors (L2).** `corridorUnion(l1Faces)` (§3.7), the single kerb function, commits exactly the kerbs S8 cut
against — half-corridor strips, junction wedges and **built blocks**. It runs once per district and once for the
hinterland's faces; a wall strip's L2 is its half-corridor strips along the arterials at its gates (and along the
intervallum, where there is one) and one built block, the strip block (§4.8). The main plaza is S3's reservation, typed
as a `square` face; other squares come from S7b claims sized from population (O7); gate plazas and forecourts from S7
(§4.8). Streets exist as geometry from here on; "negative-space streets" is purely a style, and §8's figure-ground
contract fills blocks in a ground tone.

**S10a Block allocation and field pass 2 (eager, town-wide; LC-2, FTG-1).** Each district's `Allocation` (S7b) is
distributed to its blocks in three declared steps, from the district's `alloc.block` stream (keyed from the district's
lineage; §2.5, §6.1), blocks by score then id: (i) the **field-driving classes** — noxious trades, middens, prisons and
institutions below a block — first, by scores that need no prosperity (downstream, downwind, extramural, frontage class,
adjacency); (ii) **field pass 2** adds their kernels to pass 1 (§4.5), from which each district's band range is written and any household S7b allocated outside it re-homed (§4.5 (5)); (iii) every other class — households by band,
ordinary workplaces, shops — by capacity per band under pass 2, sub-districts receiving contiguous block groups sized to
their clusters (COV-FTG-E02). **The block score is S10b's rule score at block granularity (item 16):** a class's relation
rows and supply edges (§10.2) are evaluated against the block's context — its frontage classes, the distance rasters at
its centroid, the classes already allocated to it and to the other blocks of the town — so a brewery's block scores its distance
to the blocks that hold its maltings and granary and a tannery's block its downstream, downwind and extramural rows before
any plot exists; hard rows filter blocks, soft rows and supply distances weight them. The result is persisted as one
block-level `Allocation` per block. From here on every district's S10, S10b, S11 and S12b, and the hinterland unit's, is a
pure function of these records and its own sub-stream, writing only inside its own faces (§4.1), so the town's content
does not depend on derivation order, viewer order or worker count.

**S10 Plots (L3) — frontage-first with the granularity law (O5 / O18), per block.**
**(0) Shared-edge bands, eager (J-I9).** A block whose `interior` is `wall_strip` (§4.8) gets no plots. Its L3 content is
built **eagerly on the generation worker, after S10a and before the pool's freeze**, in one step that covers the strip
blocks on both sides of each trace at once — the band's cross edges split the trace, which the two sides' districts share,
so no district overlay may write it (§3.3 pool steps 1 and 3; cost §12.4). The batch commits, by `bandUnion` (§3.7), the
enceinte's half-band on each side of the wall edge; the rest of each strip — the inner setback, or the outer setback and
glacis, or the berm up to a moat — as typed unbuildable residue (`setback`, `glacis`; `ditch` in place of `glacis` on the
town side of an `on_enceinte` bailey whose castle template row asks for a dry ditch, §4.8); and each side's parts of every
tower and gatehouse on the trace. The same eager batch lays §4.5's **margin bands** along the settlement perimeter and
along any reservation boundary two districts share. The enceinte's `band` and `glacis` (its `ditch` parts included) and
each tower's and gate's `footprint` are the unions of these parts across the strip blocks (§2.7). S9 has already committed
the strip's corridors and nothing after S10 writes L1 or L2, so no batch ever clears or splits these faces. The step ends
by rebuilding the L3 static partitions it touched, so a pooled plot line finds the band's inner edge through the index
(§3.3 pool step 1). A regeneration re-runs this step one-sided for its own scope (§7.3 item 2). A castle's curtain band is
built the same way inside the bailey's blocks. The hinterland unit's S10 builds §4.9's hinterland recipe — furlongs,
outside lots, driveways, trails, woods and edge orchards — instead of frontage-first plots.

For every other built block: (1) classify each kerb edge as a frontage by way class; (2) read the block's context
(district kind, prosperity value and recorded band, density, growth stage) → the **granularity table** gives target
frontage-width and depth bands, a join maximum and a vacancy-run share, interpolated along the prosperity value and scaled
by the rung's `RungProfile.granularity` (frontage × and depth × on every band; the rich band's join maximum
+ `joinMaxDelta`; §1.1, AM-4) — `GranularityLaw.bands` takes the rung (§14). The band rows are §4.5's band set, whose
default cuts reproduce the references' wealth classes (item 27); every re-derivation other than a rung-3 event of §4.11's
ladder reads the block's **manifested band** — the field band raised to its plots' geometry floor by §4.11's block-level
reading (item 31; J-A31.43) — for every geometry row, and the field band for occupancy, condition and labels; the band row also carries the target share of
interior and hidden plots that S8's deep-interior rule and this stage's cut meet together (§4.6, item 30):

| band (default rows; all calibratable, J-T (§13.7)) | frontage width (m) | depth (m) | join max | vacancy-run share of frontage | reference anchors |
|---|---|---|---|---|---|
| poor / dense | 4–6 (log-normal, CV 0.25) | 12–20 | 1 | 0.03 | NG 95–99 % attached, party walls 39–43 % of perimeter |
| modest | 6–9 | 18–30 | 2 | 0.06 | FTG quad side median 10.3 m, footprint median 103 m² |
| prosperous | 9–14 | 25–40 | 3 | 0.08 | MFCG ≈ 18.6 lots per block |
| rich | 14–25 (joined) | 30–60 | 5 | 0.05 | "fewer, bigger buildings, bigger yards and courts" (owner) |
| institution / assigned | by requirement class | by requirement | whole block above a share threshold | — | FTG landmark-first |

(The block's `interior` — court, back lane, through-alley or rear plots — was chosen by S8, §4.6.) (3) **Claims first:**
institutions and assignments *smaller than a block* `claimSubFace` (which may span several faces, §3.4) the contiguous area
and frontage class their requirement demands — the requirement is the designation template's size budget (S11, item 19) —
before ordinary plots are cut (larger ones are S7b reservations already); claims-first covers every claim that exists at
generation: the roster's institutions and requirement classes, and every assignment or dossier element present in the
recipe when the town is generated (they enter S2's demand, so a brand-new map holds them from the start; §7.7, item 22 (d)).
An assignment or dossier element that arrives after the city is built is placed by S10b's solver and applied by S11's
mutation instead (§7.7). (4) **Per-frontage regions
(GEO-24; J-P13):** the block (minus claims and the S8 interior) is partitioned into one region per frontage run by its
straight skeleton, each region's depth capped by the skeleton height and the band depth — if the skeleton is downgraded
(F-SKELETON), a reflex pre-cut partition (a perpendicular cut from every reflex vertex, built exactly from `sideRuns` and
`splitFace`) is used instead; the validated skeleton arcs enter the arena through `insertChain` (§3.8) — and plots are laid
as strips perpendicular to each region's frontage, widths drawn from the band, depth = min(band depth, region depth); side
lines are bent lot cuts perpendicular to the frontage arriving at the region's rear line (the creator's stated use of the
primitive for buildings, `watabou-extra-a.md` §2.1); strips never leave their region, so reflex corners, notches round
cul-de-sacs and the inside of tight curves cannot produce overlapping or hourglass plots (property test: §13.2).
(5) **Corners and seams:** the corner plot takes the higher-class frontage and the shorter frontage's depth; the wedge left
between two regions becomes a corner plot when it meets the minimum width and angle, else a declared `wedge` class
(bounded < 0.5 %) or residue. (6) The residue is typed: `court` (from the S8 interior), `yard` (assigned to the adjacent
plot when its area < 1.5 × the plot), `green`, `vacant`, `shore` (the shore setback). (7) **Joins and splits, one law:**
strips are cut to the band's lower end, then a merge operator joins k adjacent plots (along a frontage, or back to back
keeping a frontage) up to the band's upper end, keeping `members`; poor bands stay at the lower end; both directions read
the same context vector — one code path (O18 g). **Orderings (item 31):** a join takes vacant or same-owner neighbours
first, then a rear plot into its front plot, then the frontage neighbour with the shorter frontage; a split takes the widest
frontage first, then the deepest yard. A designation's size budget (S11's template) is what a join is asked for — by this
stage at generation, by S10b's solver for a later placement (a JOIN request) and by S11's mutator when a designation
outgrows its plot; a larger class placed by S10b's class mix asks this law for its join (item 71). Across epochs the law runs in its incremental form — a due block re-cut with its neighbours fixed, under
§4.11's ladder, churn cap and geometry floor (item 31) — and a plot vacated by decline merges into a neighbour's garden or
a field by the same operator (`plotToGarden`, `amalgamate`; §4.11, item 8). (8) **Vacancy runs (COV-VG-VN-170):** runs of
frontage totalling the band's vacancy share, each at least one band frontage long, are left unbuilt from the
`plot.vacancy` stream — typed `vacant`, or a `garden` yard joined to the neighbour — so no built block is necessarily fully
ringed. (9) **Alleys:** slivers narrower than the minimum plot width that connect two ways become `alley` L3 faces, not
spines (GEO-25); where the frontage is continuous, §4.6's rule may reserve a covered **passage** under the front plot's
building instead of an open alley (item 30; the passage face is §2.5's).
(10) Every plot gets its `ContextVector`, its `DerivationRecord` and access edges (100 %, O5 a): every plot is built with an
access edge. The frontage-less lots of NG 1.2.2 — about 42 % of its lot leaves, its courts by construction rather than
by error — have no counterpart here outside the deep-interior rule (§4.6), which chooses a deep block's interior — a
court, a back lane, a through-alley or rear plots, and, with item 30's reach, its hidden plots — by band shares (J-P15,
J-A42.41). **Party walls** are shared L3 edges carrying the `party_wall` role in row classes, one edge per wall
(§2.2). **Unbuildable bands:** the shore setback (§4.2 S1 (8)), the wall strips — the band, the inner setback, the outer
setback and glacis (MFP-9; step (0)) — and reservations are never plotted; ribbon plots begin beyond the outer wall strip.
**Exact capacity check (FTG-2):** after the last block of a stage, plots per class × band are compared with the stage
quota; a shortfall goes to S10b's reconcile and the report (F-BUDGET-STAGE).

**S10b Placement (O7; per district; the allocation honoured) — the one placement solver (item 16).** Each block's allocated
classes are placed onto its plots by the **placement solver**, the one solver every path that puts a use on a plot calls:
this stage at generation, the hinterland unit's S10b on its outside plots, every `assign` event (§7.7), a dossier event
and a positive placement (§7.7, items 20 and 22) and the relocation of a use across epochs (§4.11, item 17). Its inputs are
data: the **relation templates** and **supply edges** of the class rows and the neighbourhood kinds (§10.2), the
per-assignment overrides of `PlacementCriteria` (§7.7) and the plot's `ContextVector` (§2.5).
* **Hard rows filter, soft rows score.** A relation row marked `hard` excludes every plot that fails it; the candidates
  that pass are scored `Σ_rows w_r · s_r(plot) + Σ_edges w_e · s_e(plot)`, each soft row's satisfaction `s_r ∈ [0, 1]` read
  from the context vector — a distance row decays by its `falloff` between `withinM` and `beyondM`; a `sameStreet` row is
  1 on the frontage way of the named class's nearest placed member, 0 otherwise; a `clustered` row rises with the number
  of the class's members within its radius; `band` and `exposure` rows compare the plot's band and `Plot.exposure` with the
  row's values (item 30) — and each supply edge's `s_e` decaying from 1 at the plot to 0 at the edge's `maxDistanceM` along
  its **mode** (below). Capacity rows (`plotArea`, `plotShape`, `frontageM`) read the template's size budget (S11): a hard
  capacity row a plot cannot meet is what a JOIN request answers (S10 (7)). Candidates are filled in descending score with
  capacity accounting, ties by plot id; households take residential plots of their band ± drift. The default rows are the
  references' own placement rules — noxious trades downstream and extramural (`upstream` high, outside the enceinte),
  mills and water trades on water, inns and the market hall at tier-1 junctions or gates (the market squares themselves are
  S3's and S7b's, item 24), religious precincts and faction turf as attractors, warehouses at the harbour, frontage class
  and area fit — and the rows the references lack (the supply edges, the upwind and high-ground rows, a trade clustering on
  one street) are soft rows whose weights the table's `placement.extensionWeight` cell scales (the default is 1; the parity
  presets that §13.6's side-by-sides run set it to 0; item 23).
* **Supply distances by mode (item 16 (b)).** `street` distance comes from the class distance rasters (16 m, one linear
  distance transform per class, below) as the land distance × the rung's detour factor (a table cell, default 1.3,
  calibrated at M1 against the way-graph Dijkstra on B-CITY; *pre-decided fallback:* the factor refitted per rung); `river`
  and `sea` distance is ∞ unless plot and provider both lie within the shore setback of one navigable water body (§4.2 S1
  (8)), else the distance along that body's bank chain; `road` distance is the `street` distance to the gate through which
  the provider is reached plus the provider's distance beyond it. A gate provides the `import` resources its bearing's
  trade row lists and the harbour those that arrive by sea, so warehouses and inns fall to the harbour and the gates by the
  same rows. Inside the pooled S10b a provider is **a block whose S10a allocation holds a producing class** (eager and
  town-wide, so the laziness contract of §4.1 holds) or a placed plot of this district; a post-build request measures to
  the placed plots themselves over the L1 way graph (one multi-source Dijkstra per provider class; budget §12.6). A hard
  supply edge with no provider inside `maxDistanceM` fails the plot; S2 has already demanded the producer (§4.2 S2's need
  propagation), so the failure is a siting shortfall, never a missing class.
* **Live-in (MFP-7):** craft and shop rows default to `liveIn`; a live-in household is sited first at its workplace and
  recorded as the building's `dwelling`, so the arterial frontages are shop-houses, not workplace strips, and
  residential-only blocks stay the exception (its block-level acceptance is §13.5's). **Outside classes, and under §4.9's
  `fill` farm mode the farm households,** are placed by the hinterland unit's own S10b (under `perimeter` and `rivers` the
  farm households are town households, placed by their districts' S10b) — the same solver over the outside plots its S10
  built at S12a's sites, whose seeding scores are the outside classes' relation rows (§4.9; FTG-7).
* **Requests after the city is built** — an assignment, a dossier element, a positive placement, a relocation — take the
  **least-disruption order**: vacant plots and vacancy runs first, then under-used plots (a yard part or an outbuilding
  the template can take), then plots whose present use can move within the same district (the displaced use re-placed by
  this solver with one further level of displacement at most — §7.7's `DisruptionBudgetRow.displacementDepth`,
  default 1 — never a cascade), then a JOIN with
  a neighbour by S10 (7)'s orderings. A rejected site (§7.7's rejection record, item 20) is excluded while its rejection
  holds, a locked plot always, and a pinned assignment's plot is fixed (§7.7's precedence). Among the candidates that pass
  the hard rows the order is lexicographic — disruption cost (§7.7's `DisruptionBudgetRow.weights` for the
  request's kind: per displaced use, per join, per subtracted part and per vacated plot), then score descending, then plot id — so the town changes as little as the rules allow. Every displacement, join
  and vacated plot is a lifecycle event of the causing edit (§2.8, §7.4), and the placed plot's buildings then mutate to
  the designation by S11's operator (item 18).
* **Concealed institutions (item 63).** A concealed institution is placed as one item with its front by the concealment
  rule of this section's *Concealed institutions* paragraph (item 63).
* **Reconcile and infeasibility (O18 f).** At generation a bounded **plan–fit–reconcile** loop (≤ 3 rounds) adjusts
  *inside the district's allocation* where a class finds no plot (one more JOIN; a class demoted within its band; surplus
  capacity typed as yards, greens or vacant plots); it never reaches into another district — moving demand between districts
  happens only in S7b's reconcile — and what it cannot place goes to F-SITING's ladder (§5.2), whose rungs this stage
  computes as: the reconcile above; then every **soft** row's weight set to 0 for the item; then the manifest reduced,
  lowest-priority classes first and never a dossier-backed item (item 20) — the report naming, for every unplaced item,
  the hard rows that blocked it and its **closest options** (the plots in order of the number of hard rows they fail,
  then score descending, then plot id — each with the rows it fails; J-A20.42). **A hard row is never relaxed
  silently:** a post-build request that no plot satisfies returns
  the same closest options as an F-EDIT action (§5.2) — choose one, relax a named row for this item, or withdraw — except a
  `dossier` request, which places at its first closest option with the hard rows it fails reported (§7.7's precedence,
  J-A20.71) — so placement never gives up silently (O18 f; FTG V1 "would regularly give up").
* *Mechanism (budget: §12.4):* context-vector distances come from per-feature-class distance rasters (16 m; one linear
  distance transform per class) computed once per model, and the provider rasters of the producing classes from S10a's
  block allocation the same way; S10b is a top-k over candidates pre-filtered by district affinity and requirement class,
  with incremental capacity. Both entry points exist, read from `recipe.entryMode` (§2.9): content-first (default) and
  layout-first (thumbnails, then populate). People are derived lazily from the household's key and pinned only by an
  explicit edit (§10.3).

```ts
interface PlacementItem { cls: string /* roster class id */; band?: string; designation?: Designation /* S11 */; count?: number /* generation: the block's allocation row */;
  id?: Id /* a Use, an assignment member or a dossier element being placed or re-placed */; criteria?: PlacementCriteria /* §7.7's per-assignment overrides of the class's relation rows */;
  pinnedTo?: Id /* a positive placement (§7.7, item 20 (g)) */ }
interface PlacementRequest { kind: 'generation'|'assignment'|'dossier'|'positive'|'relocation'; items: PlacementItem[]; scope: Scope /* the blocks or district the solver may use (§14) */;
  fixed: Id[] /* placed members kept (§7.7) */; exclude: Id[] /* locked entities */; rejected: Id[] /* plots under a live rejection (§7.7) */ }
interface PlacementResult { placed: { item: number; plot: Id; score: number; joined?: Id[]; displaced?: { use: Id; to: Id | null }[] }[];
  unplaced: { item: number; blockedBy: string[] /* relation-row and supply-edge keys */; closest: { plot: Id; fails: string[]; score: number }[] /* the closest options in S10b's order: fewest hard rows failed, then score, then plot id */ }[] }
interface PlacementSolver { place(req: PlacementRequest, ctx: StageContext, k: Kernel): KernelResult<PlacementResult> }   // one implementation, registered by name (§4.12, §14); its draws are the `siting` concern (§6.1)
```

**S11 Site plans and footprints (L4; O17; one batch per block) — the designation template and the designation mutator.** One
rule evaluation per plot, no search: the **designation template** — one per roster class (§10.2's `template` rows; item
19), keyed by band with its continuous columns interpolated along the plot's prosperity value and its discrete columns
switching at the band cut (§4.5) — gives the size budget (plot area, footprint area, floors), the structures (the slot list:
main building, workshop, forge, yard, court, stables, store, journeymen's rooms … by role and count), the arrangement,
coverage, setbacks, separation (party wall / slot / passage), the front-line jitter (an area-scaled recession of the main
slot's front, *Front-line jitter* below; item 43), the frontage treatment of the main slot (none, lean-to stall, stall, shopfront, arcaded front, gate, wall), the
yard partition, the **boundary treatments** and the **specialisation** — the designation's variant in this band, with its
room programme (item 28, §2.6): a farrier or nail-maker in a lean-to forge, a general smithy with a yard, and a master
armourer or cutler with a storefront, a court and journeymen's rooms are three rows of one smith template (our own rows).
Density is a modifier column on coverage and separation. Geometry columns read the plot's manifested band
(§4.11's plot-level read); the specialisation and the programme read the field band, so a poor smith in a once-rich
shell is a poor smith in a big house
(item 31). **Every path that creates or changes a building reads this one table** — this stage at generation, the mutator
below on every designation change, S10b's relocation (§4.11) and every assignment (§7.7), whose drift bounds bound the
mutator's adapt and add steps relative to the template. Two smiths a few streets apart differ by degree along the value,
never by switch; the default rows reproduce the references' banding — FTG's lifestyle-banded building pools and MFCG's
ward-type sizes and spacing (§4.5's band set, item 27) — and the interpolation between rows is our extension. J-A19.41
holds within a class; the class itself is S10b's class-mix draw (item 71). A front's building reads the front's template;
its concealed function adds only concealed rooms, a concealed door and a link down (item 63, *Concealed institutions*,
below). **Materials
are not template columns** — the material rule, texture and colour only, is §2.6's (J-A19.42).
The arrangement rows the template chooses among:

| arrangement | geometry | boundary treatment (default rows) | where |
|---|---|---|---|
| row | one or more footprints end to end along the frontage; **footprint = plot ∩ the frontage band of the row depth** (a boolean intersection, GEO-26; J-P14), the band set back by the plot's front-line jitter `h` (*Front-line jitter* below), so every party wall is the plot side line and, the block being one L4 batch, one shared edge even on bent or curved frontages; stored as one `quad` wing with its four corners recorded (`BaseWing.corners`; stepped quads on a slope, each with its own; J-P31, J-P39) and handed to `outline()` as fixed input (§2.6); depth from the coverage; rear yard | frontage none (the house is the frontage); rear wall (dense) or fence | dense and poor bands, shops, workshops (NG 95–99 % attached; FTG's warehouse rows) |
| set-back compound | hall or house set back behind a forecourt; **2–5 disjoint outbuildings** (stables, workshop, chapel, barn, brewhouse) placed by a small greedy packer on the plot's OBB grid around a court | **enclosure wall** (rich, prosperous; ours — NG 1.2.2 draws no enclosure — an `extension` the parity presets set to the fence, §7.6; J-A44.41) or fence, with a **gate on the access edge** | manors, inns, temples, guildhalls, farmsteads (FTG's farmstead with a driveway) |
| detached | one OBB-aligned footprint at the frontage with side yards and a path to the access edge | frontage fence, railing (rich) or hedge, with a gate; side hedges | prosperous / semi-rural bands, sparingly (R4/R5) |
| hovel | one small footprint on the frontage of a plot that is mostly bare yard | none or a hedge | squalid bands, outskirts |
| tents | 1–3 small round or rectangular footprints (6–15 m², class `tent`, roof `tent`) with a fire-pit pin, dirt surface | none | squalid and shanty districts after the first half of the stages (COV-FTG-E07) — FTG's row, which the parity presets keep; how the default preset shares these districts with the cluster row is item 70's (*Informal clusters*, below) |
| cluster | many small structures — shacks, tents or lean-to shelters by the cluster rows (§10.2) — packed across the plot, not in frontage rows, each with its own door on a footpath web of the plot's yard that reaches one of its access edges; the packing, the fire gap and the households per structure are *Informal clusters* (below; item 70) | none | informal plots of the lowest bands with no standing building, where *Informal clusters* admits them (item 70) |
| institution | the claim's own template (§2.6 footprint templates, the axis-locked composer, the `ring` partition recipe for a cloister) | wall with a gatehouse gap; churchyard wall | claims |
| vacant run | no footprint | wall (dense bands) or fence | vacancy runs (S10 (8)) |

Treatments are stored as §2.5's `PlotBound` records on the plot edges; they are drawn at district LOD as a stroke distinct
from buildings (§8.2's treatment row), **walled or fenced frontage counts toward O17 (d)'s streetwall continuity**, and walls and fences
export to VTT and GeoJSON (VIS-8).

**Front-line jitter — an area-scaled recession (item 43).** Each plot's main slot may stand back from its frontage by a
recession `h`, evaluated once per plot and stored, rounded to the centimetre, as `SitePlan.frontJitterCm` (§2.5):
`h = u · min(√(plot area) / 3, jitter.maxM)`, `u` uniform in [0, 1) — one draw of the plot's `siteplan` stream (§6.1;
no new concern) — and `h` kept only when `h ≥ jitter.minM`, else 0. The law's shape — area-scaled, uniform, floored — is
the emulated default (provenance `ref:MFCG 12710731 front recession (code)`, P9); its construction and its values are
ours. Under the default values below, the area term binds only on plots under ≈ 20 m², so the default recession is
in effect uniform up to the band's maximum. *Construction:* `h` is taken square to the frontage, on the frontage band's normal — a row
footprint is `plot ∩` the frontage band between the offsets `h` and `h +` the row depth, and a detached, hovel or
compound main slot's front stands `h` behind the template's setback — so the front stays parallel to a bent or curved
frontage, every party wall stays the plot side line (J-P14) and the strip in front of the recession is the plot's
`forecourt` yard part (§2.5). Where the plot's depth cannot hold `h` in front of a footprint that meets the class's
floors in width and area (§3.10), `h` falls to the largest value that can, and to 0 when that is below `jitter.minM`.
*Values:* `jitter.maxM` and `jitter.minM` are designation-template columns (§10.2), `jitter.maxM` interpolated along the
prosperity value like coverage — defaults ours (`own`): `jitter.maxM` 0.4 m (poor / dense), 0.7 m (modest), 1.0 m
(prosperous), 1.5 m (rich); `jitter.minM` 0.3 m for all bands — each of these band cells marked
`extension: { over: 'MFCG', mode: 'option' }` over the emulated law, whose values the `MFCG` parity preset reads through
§7.6's per-preset values: `jitter.maxM` 4.8 m and `jitter.minM` 2 m (J-A43.41). The institution, tents and cluster rows
carry `jitter.maxM` 0, unmarked, so no preset changes it and their plots draw no recession (a claim's building, a camp's
tents and a cluster's structures have no street front to recede); any row whose `jitter.maxM` lies below its
`jitter.minM` draws none. *Floor:* a front nearer its frontage than `attractCm` (26 cm, §3.2) would be shared with the
frontage by §3.6's stretch attraction and the recession would collapse to 0, so `jitter.minM` is bounded below by
`attractCm` + 1 cm — the column's declared range (§7.6), against which an `editTable` or `editPreset` setting it lower is
refused, naming the bound (F-EDIT, §5.2) — and the recessions drawn are {0} ∪ [`jitter.minM`, `jitter.maxM`]
(J-A43.42). *Changes:* a kept main slot keeps its stored recession through a designation change; an added
main slot evaluates `h` at the target template's columns with its draw from the mutation's `siteplan.mutate` stream, as
every added part does (the mutator's step 2, below); Regenerate (keep settings) re-evaluates the same draw, so it
reproduces the same fronts. The bars: §13.2 (item 43).

The row arrangement's footprints are made here by the boolean above and passed to `BuildingGenerator.outline()` as fixed
`quad` wings, which it returns with heights and roofs and never re-fits (§2.6); every other arrangement's footprints come
from `outline()` itself — rectangles and L / T compositions as `rect` wings with per-wing ridge axes (VIS-10), footprint
templates and the axis-locked composer for institutions (COV-FTG-F16, COV-MFCG-G05) — each shaped inside its slot's
working hint (`SlotPlan.hint`, §2.5, which S11 never stores). **The first carry (J-P42).** S11 inserts each footprint's
rings through every wing vertex on the wings' union boundary and, when the block's batch has committed, carries every wing
onto the committed face by §2.6's wing-carrying rule — from the ring it inserted to the ring the kernel committed
(attraction may have moved a vertex up to `attractCm`, §3.6), each boundary run re-read from the committed rings, a rect
whose sides now carry other vertices recording its `corners` — so every stored wing's boundary runs are its footprint's
rings vertex for vertex and the union of a building's wings is its footprint face exactly (§2.6's check).
**Scale (COV-FTG-F09):** footprint targets are multiplied by the district's `buildingScale` (0.5–2, continuous; FTG's
"smaller / bigger" as a district edit or an `Adjust` regeneration). **Heights** from the class tables on every wing (floors
× storey height + roof rise by pitch; eave and ridge per wing; tower heights for keeps and church towers), with the
**ground datum** `baseCm` from the terrain by §2.6's `deriveBase` (FTG-13; J-P19) — carried although the top-down view never
shows them.
**Entrances:** the building's entrance set by §2.6's rules — the main entrance on the footprint side facing the plot's frontage access edge, where §2.6's rule 1 places it (the owner's rule, item 29), side, rear and yard doors and the basement decision as §2.6 states — re-derived
whenever the designation mutates (below); roof kind by class per wing (the style sheet chooses the construction, §8.2);
**materials** from `MaterialRow` (COV-FTG-F20; §2.6); **description, opening
hours and sub-locations** from the class table and the naming engine (COV-FTG-F21, FTG-11); yards partitioned into typed
parts.

**The designation mutator (item 18).** A change of designation — an `assign` or `unassign`, a `setAttr` on a plot's use or
class, a relocated use (§4.11), a dossier re-designation (§7.7) — never replaces the plot's buildings with a fresh roll.
`mutate(plot, to)` derives the new design from the present one by a recorded delta toward the target template, evaluated
at the plot's current prosperity (item 19 (c)):
1. **Match.** The present design's parts — slots by `BuildingSlot.role`, wings, storeys, roofs, entrances, yard parts,
   treatments, and a stored composition's or plan's rings (§2.6) — are matched to the target template's structures by role
   through a **compatibility table** (a house and a hall, a shop's storefront and a house front, a stable and a store, a
   workshop and a forge … our own rows, editable): each part is **kept** (it fits the target's role within the template's
   tolerance on size), **adapted** (kept with an attribute change — a storey added within the floors band, a wing extended
   within the size budget, a frontage treatment or a roof kind changed), **converted** (kept as another role the table
   allows) or **subtracted** (no role in the target and no protection); each required structure without a match is
   **added**.
2. **Order and draws.** Subtract, convert, adapt, then add, so the added parts pack around the kept ones on the plot's OBB
   grid by the compound packer (above) from the plot's `siteplan.mutate` stream (§6.1: a geometry concern keyed by the
   plot's lineage, so the same change from the same state draws the same numbers on every host, and a New random of the
   plot changes nothing past); added parts are minted from the causing event's `seq` and ordinal (§6.3), kept parts keep
   their addresses, subtracted parts become tombstones with the event's `seq` (§2.8). The old house stays recognisable
   inside the new workshop.
3. **Land.** When the target's size budget exceeds the plot, the mutator asks S10b's solver for a JOIN with a neighbour by
   S10 (7)'s orderings, the neighbour's use relocated by the same solver; when no join is allowed — a locked neighbour, a
   hard row — the template's `underSize` column decides: the compact rows, or a refusal reported with the blocking rule.
4. **Protection.** A locked part or path is never subtracted, converted or adapted (fate *kept*, §7.3 item 4); a
   user-edited attribute is kept (implicitly pinned, §7.2); an added part that would overlap a kept part is placed elsewhere
   on the plot or reported; the entrance set and the basement decision are re-derived by §2.6's rules on the result (item
   29), and the elaboration cache of the plan rung is marked stale (item 28).
5. **Record and reversal.** The steps are one `MutationRecord`, persisted in the causing event beside its fates (§7.1, §7.4)
   and cited by the plot's lifecycle event; the event's undo record keeps the former parts. Reversing the change — a
   designation set back, an `unassign`, an `undo` — applies the **inverse** of the recorded steps when the plot's design is
   still the record's result (its leaf digest, §6.2), restoring the earlier design exactly; otherwise a fresh forward
   mutation toward the earlier template runs and is reported as such.
6. **Timing.** A host or user change decides and records the whole mutation at once; across epochs the evolution engine
   spreads the same steps — occupy if compatible, then adapt, then extend, and rebuild only what cannot be adapted — as
   recorded events (§4.11, item 18 (c)). How a recorded step is shown on the ground over the weeks it takes is §4.11's
   Works (item 67), which reads the steps and never re-decides them (J-A67.49).
7. **One path.** Generation is the mutation from the empty design: every structure an add, every draw from the plot's
   `siteplan` stream, so this stage's own batch and a later mutation are one code path (`@plat/plots`, §14); Regenerate
   (keep settings) and New random remain re-derivations (§7.1), and `rebuild` (§4.11) the whole replacement that a ruin or
   a redevelopment calls for (item 31's rung 3), never a designation change.

```ts
type Designation = { cls: BuildingClass; use: string /* the roster class id */; specialisation?: string /* the template's discrete row; absent: by band */; assignment?: Id }
interface MutationStep { op: 'keep'|'adapt'|'convert'|'add'|'subtract'; part: { kind: 'slot'|'wing'|'storey'|'roof'|'entrance'|'yard'|'bound'|'frontage'|'composition'|'plan'; id?: Id; role: string };
  from?: unknown; to?: unknown; rule: SliceRef /* the template or compatibility row read (§2.8) */ }
interface MutationRecord { plot: Id; from: Designation | null /* null: generation, from the empty design */; to: Designation; band: { field: string; manifested: string }; steps: MutationStep[];
  joined?: Id[]; displaced?: { use: Id; to: Id | null }[]; seq: number /* the causing event; 0 for the generation run */ }
interface DesignationMutator { mutate(plot: Id, to: Designation, cause: EditRef | RuleRef | 'generation', ctx: StageContext, k: Kernel): KernelResult<MutationRecord> }
// one implementation, registered by name (§4.12, §14); called by S11, by every assign, setAttr and dossier event (§7.7) and by §4.11's use step
```

**Furniture pins (COV-MFCG-I01, COV-FTG-J02, COV-FTG-J05; `pin.*` streams).** The main plaza always gets one centrepiece —
statue 0.6, fountain 0.3, market cross 0.1 by default weights (MFCG places one in every market square, 60 % statues) —
offset toward the plaza's longest edge for statues and for 30 % of fountains; each gate plaza gets a well, cross or trough
with probability 0.5; every block draws one **weighted decoration row** from a deck and applies it to its unused plots and
vacancy runs (wells, pumps, troughs, large trees); **singletons** — bandstand, statue, monument — are placed once per
district in an unused plot by a deck draw, campfires in squalid districts; **market stalls**, drawn as small tents, line each
market square's edge band and ring its market hall, by rank: the principal one per ≈ 150 m² of square (≤ 40), a
secondary one per ≈ 200 m² (≤ 20); a flanking principal market takes the main plaza's centrepiece rule and a secondary
market a centrepiece with probability 0.5 (our own rows, calibratable). What each band
draws — footprints, yards, treatments, pins, and the plot outline as an optional cadastral layer — is §8.5's.

**Markets and hidden plots in this stage (items 24 and 30; the rules are §4.2 S3 (12)'s, §4.5 S7b (3)'s and §4.6's).**
Every market square — the plaza when it carries the principal rank, a flanking principal market, each secondary claim —
takes the pins above by its rank; the market hall's `nearMarket` row (§10.2) binds it to the principal market by
default. A passage the block's reach names
(§4.6) is cut by S10 (9) as its `passage` face, and S11 gives the front building the wing that spans it; a hidden plot's
main entrance faces its access face — the court or the passage — as §2.6's entrance rules put a set-back building's on
the court that leads from its gate (item 29), so every plan roots at a door that opens onto the way its plot is reached
by.

**Vacant plots under decline (AM-8).** A plot whose last building is cleared or reused merges into a garden, orchard or
field by `plotToGarden`, or into its occupied neighbour by `amalgamate` (§4.11's ladders), through the merge operator of
S10 (7) with the neighbour's band; the band's vacancy-run share of S10 (8) is the design's deliberate vacancy: regrowth
never fills a run below its share, and decline's vacancies are counted apart from it.

**Households per building (item 28 (f); J-A28.46).** S10b places a residential plot's households — per residential slot
(a structure with `houses`, §10.2) of the plot's designation template row at least one household and at most the row's `households.built`, by band ±
drift, a plot's slots filled in its slot list's order, required slots first (the capacity accounting above; the
capacity itself cannot be read there, because the building and its wings do not exist before S11). A residential slot
the demand cannot fill is dropped from the plot's site plan, its ground typed as yard, never below its structure's least `count` where the structure is `required`; a residential plot whose required residential slots the demand cannot all fill is typed vacant by S10b's reconcile (above), its households placed on the next candidate — surplus capacity, never an empty residential
building; a residential slot on a workplace's or an institution's plot that is its main slot (a live-in class's among them) or within a `required` structure's least `count`, and that no household of its band or drift can fill, is neither dropped nor typed vacant — the workplace or institution and its use stand — and S11 builds it as a slot without `houses`, housing none, `Building.dwelling` absent, reported; its `BuildingSlot.unhoused` (§2.5) records that typing, written by every run of this fill and cleared by the designation mutator (above). S11,
which creates each building and its wings, writes each residential building's `Building.households` (a building S11 builds for a slot with `houses`; every other building's list is empty) from its slot's households in address order, clamped into [1, capacity], a locked or pinned household kept before the clamp drops any (§7.2; §2.6's capacity rule) — §2.6's one capacity function, the one item 31's `relet` (§4.11) and F-PLAN's never-omit
rule (§5.2) read, evaluated on the wings it has just made. A household the clamp leaves, or whose slot S11 builds no
residential building for, moves by §10.3's relocation (its address and its people's keys kept): after the district's
last S11 block batch, still inside the district's derivation (a pseudo-district's alike), the overflow households are
re-placed in address order by S10b's solver over the district's residential buildings that house fewer households
than their capacity — the household's band first, then the bands its drift admits; score descending, then building
address — each move reported, and a household no building of the district has room for is an unplaced item of
F-SITING (§5.2), reported with the capacities that refused it — except a household that fills the dossier's population (§7.7 item 2), which is never taken off the manifest: its housing is re-provided inside its district (item 20 (e); J-A20.72) by S10b's `dossier` request in the least-disruption order of a request after the city is built (above: vacant plots and vacancy runs first, then under-used plots, then a plot whose use can move, then a JOIN), its first closest option where no plot passes the hard rows (J-A20.42), and S11's operator builds there a residential slot of that plot's designation template (a structure with `houses`, §10.2) for it, within that building's capacity, in the same derivation or causing event — each such build and displacement reported, a hand edit's among its dry-run fates (§7.3 item 4). So the solver and the plan agree on how many households
a shell holds and no shell houses more than its capacity; the plan rung records the count among its inputs (§4.1). The
overflow pass runs inside every change §2.6's capacity rule lists — S11's operator building or changing a residential
shell (an epoch's new faces, a rung-3 re-cut, a designation mutation, item 18) among them — whenever the result's
capacity falls below its households, each move a lifecycle event of it (§2.8), as `relet` keeps to the capacity
(§4.11).

**Concealed institutions — a front and a hidden function (item 63; owner: "some criminal like institutions or buildings
have to be clandestine meaning there are certain lots and assignments that have two functions. A front which can be
anything and a second function").** A clandestine institution does not parade itself: its building stands on the map
like any other, and what it is, is withheld. This paragraph is the one statement of how such an institution is resolved,
placed and built; the records are §2.6–§2.7's, the knowledge filter §9.2's and the underground allocations II.7's.
1. **The value and its resolution (J-A63.41).** An institution, a use and an assignment carry
   `concealment: 'none'|'front'|'hidden'|'underground'` (`Institution.concealment`, `Use.concealment`, §2.7;
   `Assignment.concealment` with an optional named front, `Assignment.front`, §7.7), `none` by default. It is resolved
   once, when the institution is first placed, from the first source that gives one: the dossier's fact (a mode, and
   optionally a named front); an assignment's value; the class table's default-mode weights — `BuildingClassRow.concealment`
   (§10.2), rows only for the classes our tables mark clandestine (a thieves' den, an assassins' house, a smugglers' store,
   a forbidden cult, a black market, a spy ring … our own rows), read at the plot band's row and the district kind and
   drawn on `siting` keyed by the institution's lineage (§6.1; no new concern); else `none`. The resolved mode is stored on the concealed use, with its map-side source (`Use.concealmentSource`, §2.7) when the dossier gave none; a map edit sets a mode the dossier did not set by `setAttr` (§7.1), and one the dossier set is dossier-owned, a map `setAttr` of it refused (§7.7 items 7, 11; J-A20.77, J-A63.22); a dossier event that withdraws the mode it set re-resolves it by this order from the map-side sources (§2.7; J-A63.22).
2. **Feasibility and the fallback chain (J-A63.41).** A mode is feasible where its ground exists: `underground` where an
   underground allocation exists — II.7.3's sewer-front pseudo-district (S7b (6), which needs a navigable run, not only a
   network, J-A14.43) or an undercity neighbourhood (II.7.5, S7b (7)); `hidden` where the district holds a plot whose
   `exposure` is `hidden` (item 30, §4.6); `front` where a cover of the cover table has a plot whose hard rows pass. The
   chain is fixed — `underground` → `front` → `hidden`; `hidden` → `front`; `front` → `hidden` — and where none is
   feasible the front's closest options are F-SITING's (§5.2): a clandestine institution is never placed openly by a
   fallback and never dropped, and every step down the chain is reported with its reason in `requestedVsBuilt`, never
   silent (J-A16.43).
3. **FRONT — one item, two uses (J-A63.42).** The front is a cover class drawn from the cover table
   (`RosterTables.covers`, §10.2: for each concealed class, weighted plausible covers per band — a tavern, a funeral
   parlour, a fencing hall, an apothecary, a warehouse, a bathhouse, a tailor … our own rows; several per class, since a
   front "can be anything") on `siting` keyed by the concealed use's lineage, unless the dossier or an assignment names one;
   a named front is honoured where its hard rows pass, else F-SITING's closest options are offered for it — never a silent
   substitute. S10b's solver places the pair as ONE item (J-A16.41): its hard rows are the FRONT's, so the front is
   plausible where it stands (a tavern on a street, a warehouse at the docks); its soft rows are the true class's relation
   rows and supply edges (near its targets and markets, the waterfront, alleys, passages, an outfall) plus an `exposure` row
   preferring `alley`, `court` and `hidden` plots, at the true class's weights; both classes' band rows apply, so
   prosperity shapes which fronts and which districts are used. The placed building then carries two `Use` records: the
   FRONT's — `Building.use`, a working business with its households, opening hours, label and description — and the
   CONCEALED one (`Use.concealment`; `Use.front` names the front's use; listed in `Building.concealed`, §2.6–§2.7), whose
   `knownTo` is `secret` by default (item 30's values).
4. **S11 builds the front (J-A63.42).** S11 reads the FRONT's designation template row at the plot's band: class,
   footprint, site plan, labels and public room programme are the front's, so at every public zoom the building reads as
   the front. The concealed use adds three things only, each flagged `concealed` and carrying the concealed use's
   knowledge: (a) a **concealed programme** — the concealed class's room-programme rows marked `concealed` (§10.2's
   `RoomRuleRow.concealed`: back rooms, a strongroom, a cellar room, a hidden stair), which the plan rung (§2.6, stage 3)
   places away from the main entrance and off the public circulation hub, reached only through a service, yard or
   concealed door (`Room.concealed`, §2.6); (b) a **concealed entrance** (`Entrance.concealed`, §2.6) — where the plot has
   an access edge beyond its frontage onto an alley or a passage (§2.6's entrance rule 2's condition), `deriveEntrances`
   adds one `service` or `yard` door there on `siteplan.entrance`, flagged, never the `main` door; with no such edge there
   is none and the concealed programme is reached from the front's service side; (c) a **way down** — the basement decision
   (§2.6) reads the higher of the front's and the concealed class's `cellar.prob` at the band (the terrain gate unchanged),
   and over an underground element within reach the building's access lottery takes the concealed class's
   `accessMultiplier` (II.7.3's *Basement accesses*, item 64).
5. **HIDDEN.** The institution goes to a plot whose `exposure` is `hidden` (item 30's plots behind a passage or in a back
   court) — the `exposure` row is hard for this mode — with a front drawn by its class row's `hiddenWithFront` share on
   `siting` (a back-court workshop that also sells something), or bare, its building then of its true class with
   `knownTo: 'secret'`.
6. **UNDERGROUND.** The institution joins an underground allocation: a sewer-front dwelling of II.7.3 (U1–U3; the
   allocation's (b)) or, where one exists, a building of the undercity (II.7.5; its clandestine institutions prefer it),
   there with a front by the same `hiddenWithFront` share; its `knownTo` is `secret`.
7. **Mutation (items 17 and 18; J-A63.43).** A change of the front's designation — an `assign`, the front use's closing,
   a rung-3 rebuild — runs S11's designation mutator on the front: the concealed use persists, its concealed door is
   re-derived with the new entrance set where its access edge survives, and its concealed programme is re-fitted when the
   plan rung, marked `stale`, is next viewed. A relocation of the concealed use (item 17's use step; a dossier event) moves
   it by S10b's request like any use and leaves the front standing as an ordinary business: the building's
   `concealed` list loses it, its concealed door stays as an ordinary `service` door (the flag cleared) and its concealed
   rooms return to the front's programme at the next plan re-cut. The front and the concealed use are two records, so
   either can close without the other.
8. **The dossier stays the authority (items 20 and 22).** The dossier says that the institution exists and is
   clandestine; the map places it and never reveals it on its own. An exposure — a raid, a discovery — arrives as a dossier
   change and is applied as a least-disruption mutation (§7.7): the concealed use may relocate with its mode re-resolved,
   the front close, a passage be sealed (item 30). A map delete of such a place relocates it by `rejectSite` (§7.7 item 3),
   as for any dossier-backed element.
9. **Knowledge, not geometry.** The building's mass and every public part are always on the map (J-A30.83); the concealed
   use, its concealed rooms, its concealed door and its way down carry the concealed use's `knownTo`, so §9.2's filter
   draws them only for a view whose knowledge admits the concealed use (the rendering part's refinement of J-A30.83 for
   concealed parts), and every export and the reader withhold them (§11.1, §11.2) — the public sees the front's label,
   description and rows.
10. **Emulation (item 23; J-A63.44).** No reference has concealment: the non-`none` weights of the `concealment` column and
    the cover table are `extension` rows scaled by `placement.extensionWeight`, so the parity presets (weight 0) resolve
    every class to `none` and place every institution openly; with no clandestine class in the roster nothing here runs.
§5.3 holds the check rows (every clandestine institution in an allowed mode or a reported fallback; concealed rooms
reached only from a concealed door or the front's service side; the `underground` mode never without an underground
allocation) and §13.2's T63 group the bars.

**Light sources — placed by rule (item 68; owner: "a night time view with appropriately spaced and partitioned torches or
magical lights").** S11's furniture step (the furniture pins above) places the town's point lights as `LightSource`
records (§2.7; the lighting model that draws them, and the derived lights — lit windows, room lights, light shafts — are
§8.4's) by the light table's rows, each read against its context: the host kind, the way class, the prosperity value along
band rows, the era row, the `magic` circumstance (§4.2 S0) and the arena. A district places lights only on its own faces
and its own half-corridor strips, as §4.9's avenues are planted, so the laziness contract holds (§4.1):

```ts
interface LightRule { host: 'gate'|'bridge'|'plaza'|'market'|'door'|'castle'|'guardPost'|'way'|'shrine'|'pin'|'tunnel'|'gallery'|'chamber'|'accessPoint' /* 'pin': an emitting pin — lamp, campfire, fire_pit; the underground hosts (arena 'underground', (1)): 'tunnel' a tunnel run's junctions, 'gallery' a gallery at the way rows' spacing, 'chamber' a chamber's altar, hearth or market, 'accessPoint' an access point's foot; a 'door' row with arena 'underground' lights a sewer dwelling's or an undercity building's door */;
  cls?: string /* 'door' rows: the class id or tag whose main entrance carries it (inn, tavern, temple …) */; wayClass?: WayClass /* 'way' rows */; arena: 'ground'|'sky'|'underground'; system?: string /* underground rows: the system they light — sewer, undercity, catacomb, cavern … (II.7.3, II.7.5, II.7.6) */;
  kind: string /* LightSource.kind: torch, lantern, lamp post, brazier, fire pit, campfire, magical orb, shrine lamp … */; source: 'fire'|'magic';
  heightCm: Cm; intensityCd: number /* candela */; radiusCm: Cm /* the smooth cutoff of §8.4's falloff */; sizeCm: Cm /* the flame's or orb's own radius, §8.4's penumbra — own defaults: torch 5, lantern 8, lamp post 10, brazier, fire pit and campfire 25, magical orb 30, shrine lamp 5 */;
  colour: string /* sRGB, the colour the light pass lights with (§8.4 (c)) — own defaults: fire rows #FF9329 (warm), magic rows #A6C8FF (cool); §8.2's light roles tint only the vector rung's glyph and glow */; flicker: boolean /* default true for source 'fire', false for 'magic' */; count?: number /* per host; default 1 */;
  minLux?: { band: string; lux: number }[] /* 'way' rows: the target minimum ground illuminance at night, by band, interpolated along the value */;
  era?: string[] /* the era rows it belongs to; absent: every era */; magic?: ('low'|'high')[] /* magical rows: only under these values of the circumstance */;
  exposure?: ('street'|'lane'|'alley'|'court'|'hidden'|'sealed')[] /* the exposures it may light; absent: street, lane, alley and court */; extension: boolean }
```

1. **Hosts.** A `gate` row lights each gate (two torches flanking the passage by default); `bridge` each end of a built
   bridge; `plaza` and `market` a square's edge at the way rows' spacing and its centrepiece; `door` rows the main entrance
   (§2.6) of each building of the row's class — an inn's or a tavern's lantern, a temple's door lamp; `castle` its gate and
   ward; `guardPost` each post; `pin` rows every emitting pin, which then carries the light (§2.7); `shrine` a wayside shrine. Underground (arena `underground`, each row naming its `system`): `tunnel` rows each junction of a tunnel run, `gallery` rows a gallery at the way rows' spacing, `chamber` rows a chamber's altar, hearth or market, `accessPoint` rows each access point's foot, and `door` rows the doors of the sewer dwellings and the undercity's buildings (II.7.3, II.7.5, II.7.6). A light's address derives from its host's lineage — a door lantern from its building and entrance, a street
   light from its way strip and ordinal (§2.8, §6.3).
2. **Street lights, spaced by what they give (J-A68.41).** A `way` row lights each way of its class whose band row targets a
   minimum night illuminance `E*` (interpolated along the value of the plots fronting it — a gradient, never a switch). The
   spacing `s` is the largest at which two neighbouring lights of the row still give `E*` on the way's centre-line midway
   between them: `2 · I · h ÷ (h² + (s/2)²)^1.5 × f((s/2) ÷ r) ≥ E*`, with `I` the intensity, `h` the height, `r` the radius
   and `f` §8.4's cutoff, solved by bisection through `dmath` (§6.5 (3)) — a 25 cd lantern at 3 m and a target of 0.1 lx
   give lights about 22 m apart. Each district lights its own half-corridor strip at spacing `2s`, the strip on the way's
   left (by the chain's direction, §2.2) from `s/2` past the way's first junction and the right-hand strip from `3s/2`, so
   the two sides alternate and together meet the target without either district reading the other. A site on a door, a
   gate passage or a deck moves to the next; a light that cannot stand is skipped and reported (§5.4).
3. **How much light — "partitioned" (J-A68.41).** Read as distributed by way class, district and band through these rows:
   the era row sets the density of public lighting — sparse in the medieval default (the plaza, the principal market, the
   gates and the `through` and `primary` ways of the prosperous and rich bands), denser in later eras — so rich streets are
   well lit and poor alleys dark; the `magic` circumstance adds the magical rows (`none` by default under D-3: no magical
   light; `low`: orbs on the rich band's squares and the precinct; `high`: on every primary way and square); hidden and
   sealed plots, and the courts and doors of a concealed institution's building (*Concealed institutions*, item 63), stay
   dark unless a row names them; an informal cluster's light is its cooking fires — one `fire_pit` pin with its light per
   `lights.perStructures` (4) structures (item 70). The sky rows light an island by its supply (II.6); the underground
   rows light the underground layer by its system (II.7.3, II.7.5, II.7.6).
4. **Draws and presets.** Each choice reads a rule or a table; one thing only is drawn — a door lantern's side of its door — on the concern `pin.light` keyed by the host's lineage and the rule row (§6.1). Each record copies its row's `sizeCm`, `colour` and flicker flag, and a fire light flickers by §8.4 (f)'s pure function of its render key and the view's time, never by a draw (J-A68.61, J-A68.42). The default rows are
   our own (`extension`); the `MFCG` preset places no light; the `FTG` preset places one window light per lit building at
   its main entrance — the anchor at which FTG's client as captured on 25 September 2026 draws its night lights (item 50) —
   and no street light. A user adds, moves or removes a light by §7.1's edits.
5. **Over time.** A light follows its host's lifecycle (§2.8): removed with a demolished host, unlit on an abandoned or
   decayed one, unlit while its host's Works stands before FINISHED (§4.11); an epoch re-runs these rows on its new and
   changed faces only.

**Informal clusters — tenure and the cluster arrangement (item 70; owner: "some neighborhoods simply have a lot of for
example, shacks on one block no single individual owns it … each one deserving of a door. Sometimes they're just
tents").**

1. **Tenure (item 70 (a); J-A70.41).** A plot's `tenure` (§2.5) is derived, never drawn: `common` for commons, greens and
   market greens (ground no one owns); `informal` for a plot of the tenure table's bands (`RosterTables.tenure`, §10.2; by
   default squalid and poor) with no standing building but shacks, tents or lean-tos, and for vacant, cleared or ruined
   ground in a declining district (§4.11); `rented` for a residential plot whose buildings house more households than
   their template rows' `households.built` (let out by rung 1's `relet`, §4.11); `owned` otherwise. S10b and S11 write it with the plot — at generation a plot is `informal` only where (2) gives it the cluster row, "no standing building" being read over epochs, never before S11 has built (J-A70.49) — every event that changes its inputs re-derives it, and a `setAttr` overrides it (an edited path, §7.2).
2. **Where (item 70 (d); J-A70.43).** The designation template takes the `cluster` arrangement (§10.2) at generation, for the residential plots of the squalid and poor band rows of a shanty-typed district (§4.5's FTG trigger and staging) and for every residential plot of a block of such a district that the cluster row's `wholeBlock` share picks — over epochs, for the plots (1) makes informal — wherever the district's band range admits the squalid band (item 72, §4.5 (5)) — never on a plot whose
   geometry floor is the middle band or above while its stock stands (a standing large building is subdivided inside
   instead, §2.6's interior ladder, item 28 (f)). That is FTG's staging as the emulation default: the shanty districts of §4.5 (FTG's trigger — the roster's average band poor or squalid — after the first half of the stages) take the cluster row, and the class mix never draws a cluster structure's class (§10.2; J-A70.49); the `shanty` kind's `extramural` preference remains our soft extension row (J-A27.43 stands: the
   owner's words name no wall), and the cluster row's relation rows prefer, softly, riverbanks and marsh margins where
   S1's shore setback and flood line allow building, and the lee of walls and ruins. Over epochs the vacant, cleared and
   ruined plots of a declining district join them (§4.11). The undercity's chambers take clusters by II.7.5's rows (item
   65), while II.7.3's sewer-front plots keep "no compound, detached, hovel or tents". Where the cluster row's `wholeBlock` share picks a block — at generation a block of a shanty-typed district, over epochs a block whose residential plots (1) makes informal: one draw on the block's `plot.join` stream at S10 (7), which reads the district's kind and the block's band and no tenure — S10 (7) joins the block's residential plots into one cluster plot — the owner's "shacks on one block" — by its join law over every plot of the block.
3. **The packing — paths first, then structures (item 70 (b); J-A70.45).** S11 builds a cluster plot in one batch from its
   `siteplan` stream, and every structure gets its own door by construction, as frontage-first plots each get a way (O5
   a). (i) **The footpath web:** from the midpoint of every access edge of the plot a trunk path runs inward, square to that
   edge, ending one structure depth before the opposite side; branch paths leave the trunk on alternate
   sides every `2 × structure depth + path width`, each turned by up to ± 20° (drawn), stopping one structure depth
   inside the plot's boundary. The paths are yard parts of kind `footpath` (§2.5) of width `pathWidthM` (1.2 m, below an
   alley's) — plot-internal, never a way or a way class, so the plot keeps its access edges and its exposure (J-A30.42).
   (ii) **The structures:** lining each path left and right, every one fronting it; the kind drawn by the cluster row's
   weights by band × climate × era (tents in the squalid band, in camps and at the newest edge; shacks where the
   settlement has persisted; lean-tos against a standing wall), the footprint from the kind's band — a shack 6–20 m², a tent
   6–15 m², a lean-to 4–12 m² against a standing wall on its own plot (a ruin's, a party wall or a plot wall; never inside a
   wall strip, whose band, setback and glacis stay unbuildable, §4.8; J-A70.47) — and a clear gap of `fireGapM` (1.0 m,
   less in the larger rungs and the poorer bands by the row) between any two structures; the packing stops when no site
   fits or the plot's households are housed. (iii) **The doors:** every structure's main entrance lies on its path face —
   §2.6's rule 1 read for a structure whose access is a footpath, as a hidden plot's faces its access face (J-A70.44) — so
   every structure has its own door on a path that reaches an access edge; no basement (the rows' `cellar` 0), one storey,
   `RoofSpec.kind 'tent'` for a tent, a lean-to's back wall shared with its host wall. A plot too narrow for a trunk and
   one structure depth takes the `hovel` arrangement instead (reported).
4. **People per structure (item 70 (c); J-A70.46).** Each structure is a residential slot (`houses`) whose
   `households.built` is the cluster row's households per structure by rung × band (more in larger towns and poorer bands;
   our own rows); its capacity is §2.6's one capacity function — the shack, tent and lean-to programmes carry no circulation
   and the one-room unit, so the capacity is the floor area over the minimum room — and the generation fill above houses
   the households within it, the overflow pass re-homing any excess (never omitting a household, §5.2). The households that
   would crowd a partitioned shell under §2.6's interior ladder here fill many small structures: its outdoor twin.
5. **Presets, drawing and time (item 70 (e), (f); J-A70.42).** In the default preset the cluster row takes the squalid and
   shanty districts' informal plots; the parity presets keep FTG's tents row (1–3 tents) and MFCG's hovel, the cluster's
   packing an `extension` (item 23). The city band draws a cluster as a speckle of small roofs over its paths in the ground
   tone (§8.5's cluster exception), the district band each structure with its entrance tick (§8.2), and the naming engine
   names the cluster once, as a place (§10.4; one label, §9.1), never each structure. Accretion, fire and formalisation
   are §4.11's.

**Class mix inside a band — the gradient reaches the building mix (item 71; owner: "a prosperous neighborhood …
may have a mix … of middle class to rich man manors. Keeping with the idea that it is gradient").**

1. **A class draw above the template (item 71 (a); J-A71.41).** When S10b places the households of a block's residential
   plots, each plot's residential **class** — hovel, cottage, house, row house, town house, manor …, distinct class rows
   with their own templates — comes from the class-mix table `RosterTables.classMix` (§10.2): one row per band of §4.5's
   band set, weights over the residential classes, read at the plot's manifested value (J-A19.43) by §4.5's interpolation
   between the band rows' centres, an end row applying flat beyond its centre. The default rows raise the larger classes
   monotonically through every band — just above the prosperous cut mostly houses with a few manors, the manor share rising
   toward the rich row, which is all manors (the owner's "a very prosperous location may simply have all manors"); the same
   at every band edge (modest houses among the poor near the modest cut). J-A19.41 holds within a class — its template's
   discrete columns switch at the cut — while the class itself follows the gradient.
2. **The town's wealth shifts the weights (item 71 (b); J-A71.42).** Each class's weight is multiplied by
   `max(0, 1 + wealthShift × (wealthLevel − 0.5))`, after which the row is renormalised: `wealthLevel` the intent's (§7.7; with a
   dossier, the wealth §7.7's derivation table derives), `wealthShift` the class's column in the mix row (positive for the
   larger classes). The cuts stay the town's own (§4.5), so "rich" is relative to this settlement while a rich
   metropolis's prosperous quarter holds more manors than a poor town's.
3. **Largest classes on the prime frontages, not salt and pepper (item 71 (c); J-A71.43).** For each block S10b draws the
   multiset of classes — one per residential plot, at that plot's value, on `siting` keyed by the plot (§6.1; no new
   concern), its weights clamped into the band range of the district (item 72, §4.5 (5)) — and assigns them largest class first
   (by the class's template size budget, ties by class id) to the plots in descending **prestige**: the sum of the prestige
   rows' weights (`ClassMixRow.prestige`, §10.2 — a `through` or `primary` frontage, a square, a park edge, a corner, the
   waterfront) over the plot's frontages, ties by plot id; a hard relation row filters first (item 16's rows win). A mixed
   block so reads as a street of grand houses with modest ones behind. A class whose size budget exceeds its plot asks S10
   (7)'s law for a JOIN by its orderings (the reconcile's JOIN at generation), the joined neighbour's draw discarded, so
   manors stand on joined plots and houses on standard ones in one block.
4. **Households and buildings (item 71 (d); J-A71.44).** The households' bands are the roster's (with a dossier, the
   households that fill its population, §7.7); the mix decides only which building each takes — a household takes any class
   the mix gives a plot within its band ± drift. A manor that falls to the middle band keeps its shell (item 31's floor,
   §4.11) and is subdivided inside (item 28 (f)). S2's land estimate reads the mix's expected plot area at each band's
   centre (§4.2 S2), so demand and capacity keep agreeing.
5. **Emulation.** The mix is our extension: the parity presets set it to a step at each cut — one class per band row, the
   references' banded pools (item 23; T23-1 reads it) — with `wealthShift` and the prestige weights 0.

**Neighbourhood placement and the band range (item 72).** S10b places a class by its `distribution` (§10.2, read as §4.5 (3) states):
`dispersed` classes by S7b's allocation over all districts, never gathered into one by rule; a `district-defining`
instance's district taking its defining class up to its identity row's `targetShare` of its placed uses; a `singular` class by the rules
proper to it. Every prosperity-driven read of S10b and S11 — the class the mix draws, the template row's band, a new
building's condition, the occupants' band, the mutator's adapt and add steps — is clamped into the district's band range
(§4.5 (5)).

**A returning dossier element (item 80).** Among the *Requests after the city is built*, a `dossier` request for an element
whose assignment returns to `active` (§7.7, item 80) ranks first the plot of its former building — the building whose
`formerUses` names its use — ahead of the least-disruption order, so a reopened institution reopens where it stood,
repaired by §4.11's Works when the change is dated.

**Notice posts (item 82; J-A82.41).** The furniture step places a `notice` pin (§2.7) where §10.2's notice rule puts one — at the
principal market and at each gate plaza by default, at the main entrance of each class tagged `notice`, and wherever a
named-feature claim of the dossier names one (§7.7, item 82).
=== REPLACE ### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19) ===
### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19)

**S12a Hinterland siting (eager, no geometry; after S7b, before S8; O14-core; FTG-7).** S12a makes the hinterland's
content decisions once for the town and writes no plat edge: the field-system preset and its parameters, the land-use ring
radii, the outside sites and seeds of the count-driven outside plots below, the decoration sites (ponds excepted: carved at
S3, §4.2 S3 (10)) and the crop rotation, all recorded in the hinterland's `Allocation` and its derivation record. The
geometry is the **hinterland unit**'s (§4.1), at L3 inside the hinterland's L2 blocks — the faces outside the settlement
perimeter S6 inserted (§4.5), with the corridors S9 committed for them and the headland S10's step (0) laid along the
perimeter, on whose inner edge the unit's lines end. **The order is FTG's — decided with the town, drawn after it (item
26; J-A26.41):** the countryside's content is S2's demand, sited here after the town's districts are typed and its claims
cut; its geometry is drawn after the town's L1 and L2 fabric is complete, into the land the perimeter leaves, concurrently
with the districts' pooled stages — which changes no output, the unit's faces and every district's being disjoint (§4.1)
— so the town never reads the countryside and the countryside reads the whole town. A hinterland re-derivation (§7.3's
S12 row) first re-runs step (0) for its headland parts, restricted to its faces, then the unit's S10. The unit's S10
partitions those blocks under the **farm mode** (below) by the field-system preset: **open-field strips** (long narrow
faces perpendicular to lanes), **enclosed fields** (FTG-style, the hedgerows a `green_line` role on their L3 boundaries),
or the **sector look** as a style preset in either of its two recorded constructions — VG 1.6.9's (Voronoi cells seeded
along the main road, on the shores and on a ring, clipped to the land and to either side of that road and bisected at
right angles; provenance `ref:VG 1.6.9 field sectors claimed outward (code)`, P17) or MFCG 12710731's variant (a lobed farm belt
split recursively into 0.6–1.3 ha fields by square or skewed cuts with 8 m paths, a farmstead on one field in five;
provenance `ref:MFCG 12710731 farm-cell recursive split (code)`, P18). Either way the preset works inside the mode's
extent, and its cells become fields in **outward order** — the cells nearest the settlement's edge first, ties by
cell id: VG 1.6.9's greedy claim outward from its houses, re-derived for a town whose built extent is not a point — under
the mode's extent rule: under `demand` the claim stops when the arable demand is met, under `fill` it runs over all the
land the mode gives the fields (J-A57.41). The MFCG variant's split runs in the model down to the furlong-sized field
faces below and continues at render time to its 0.6–1.3 ha fields and 8 m paths, drawn from each furlong's
`render.instances` stream, as the strips are render-time segmentation (J-I6; J-A57.42); its farmsteads are the farm
table's count, as under every preset (J-A57.43); land-use rings (gardens / closes / orchards → fields → meadow / pasture / commons → coppice → wild
wood); managed woodland and coppice sized by the wood rows below and wild wood beyond, as L3 wood faces, with forest
edges by domain-warped density noise (a render-time property); every land component gets uses (both banks, islands); the
arterials continue to the frame at their bearings (S4). Fields keep the shore setback of §4.2 S1 (8). *Model and render split (SCL-3):* the model's field faces are FTG-sized furlongs (≈ 2.5 ha; ≈ 1 600 in
CITY's 39 km² margin), each carrying its crop, livestock and rotation slot — their ≈ 12 ms at CITY runs in the hinterland
unit, hidden behind the pool (§12.4); the open-field **strips** inside a furlong are render-time segmentation (their count
and width a style and era parameter), so the strip look costs no model faces.
* **One farm table (FTG-7; item 26).** `FarmTable { arableHaPerCapita (era, with provenance), householdsPerFarmstead,
  fieldHaPerFarmstead, fuelM3PerCapitaYear, timberM3PerCapitaYear, coppiceM3PerHaYear, woodM3PerHaYear, extent:
  'fill'|'demand', reserveArable: boolean }` is the only source of the countryside's numbers: S2 demands `farmsteads =
  round(arableHaPerCapita · P / fieldHaPerFarmstead)` farm plots and their households — under the `perimeter` and
  `rivers` modes (below) the same households, housed in the settlement, and no farmstead plot — and the hinterland unit's
  S10 gives each farmstead, or each such household group, its fields at the sites S12a chose, so farmland per capita and the farm classes' field area agree by
  construction (MFCG's "not enough farms" removed). **The staged import share (item 88; J-A88.42).** When the dossier port fills §10.2's staged hinterland row (`PortRows.hinterland`; empty in the base), the arable demand `arableHaPerCapita · P` — and with it the farmsteads and their fields — is multiplied by `max(0, 1 − importPct × farmlandScale)`, `importPct` the dossier's share of its food imported, in [0, 1]: food brought in needs no field of its own, and it is served through the gates' and the harbour's `import` rows (§4.7 S10b); while the row is empty the factor is 1. **Fuel and timber (item 26).** The same table turns the population
  into the wood it burns and builds with — `coppiceHa = fuelM3PerCapitaYear · P / coppiceM3PerHaYear` and `managedWoodHa
  = timberM3PerCapitaYear · P / woodM3PerHaYear` (era rows; defaults 1.0 and 0.15 m³ per head and year against yields of
  4 and 2 m³ per hectare and year; provenance `own`, calibratable) — which S2 demands with the farmsteads, and which the
  outside classes' `produces` (grain, fuel, timber …) and supply edges carry into S2's need propagation (§10.2; the
  lumber yards and charcoal burners are the providers). The unit lays coppice in ring 4 and managed woodland beyond it, up
  to the land the frame's wood propensity offers; what the frame cannot hold is the settlement's **import**, reported and
  served through the gates' and the harbour's `import` rows (§4.7 S10b), never a failure (J-A26.42). **Extent (our
  extension, `extent`; default `fill`, the references').** `fill`: the demand fixes the counts and the woods follow the
  landscape — the countryside fills the frame as both references fill it; `demand`: the fields and woods are sized to the
  demand and the frame's remainder stays wild wood, pasture and waste. **The arable reserve (`reserveArable`, default
  false):** when on, S2 records `arableReserveHa` and S5c prices growth onto fertile ground while the reserve is short
  (§4.4) — the hinterland is kept clear of suburb growth only when the demand requires it, and only as a tendency.
  **Test:** 100 % of outside-class buildings on outside plots with occupants; farmland per capita ± 20 % of the era row and
  equal to the farm classes' area; wood area against the fuel and timber rows with the import share reported (the bars
  are §13.2's).
* **Farm modes — FTG's three farmland layouts, chosen as its `Default` chooses them, by size and landscape (item 26;
  provenance `ref:FTG farmland modes`, the keys ours; J-A26.43, J-A26.44).** FTG has four farmland settings: three
  layouts — `Farmsteads`, `Around perimeter` and `Around rivers` — and a `Default` that picks among them by the
  settlement's size and landscape, its climate presets overriding. A `FarmModeRow { rung: Rung; relief:
  'plain'|'rolling'|'hilly'|'mountainous'; land: 'fertile'|'poor'; mode: 'fill'|'perimeter'|'rivers'; riverBandM: M }`
  per rung × landscape — S0's relief class (§4.2 S0) and the fertile share of the frame's land
  (`SiteResources.fertile` ≥ 0.4 on at least half the cells: fertile, else poor) — plays `Default` and chooses one mode:
  - `fill` — FTG's `Farmsteads`: farmsteads whose households live on their land, the farmsteads and their fields
    filling the remaining countryside from the perimeter outward, the lots larger where land is plentiful; each
    farmstead lot a count-driven outside plot, its driveway included (below);
  - `perimeter` — FTG's `Around perimeter`: no farmsteads — the farm households live in the settlement (S2 demands them
    as households of their band, which S7b allocates with the town's, §4.5 S7b (1)) — and their fields lie close to
    the settlement, laid ring by ring outward from the perimeter along the main roads out until the arable demand is
    met, the remaining frame in its landscape uses;
  - `rivers` — FTG's `Around rivers`: as `perimeter`, but the fields lie only on the land within the row's
    `riverBandM` (default 300 m; our own, calibratable) of a river's banks, on both banks; where the frame has no river
    the mode reads as `perimeter`, FTG's rule; where the band holds less land than the arable demand, the remaining
    fields are laid as `perimeter` lays them, on the land beyond the band, and the band's shortfall is reported (never
    a failure).

  Defaults: `fill` at TOWN and CITY on plain or rolling fertile land, `perimeter` at METROPOLIS and wherever the land is
  hilly, mountainous or poor; the `ClimateTable` row's `farmLayout: 'rows'|'perimeter'|'rivers'` (below) is FTG's
  climate override — the arid row sets `rivers` and the cold row `perimeter` (FTG's Desert and Polar presets), and a
  temperate row's `rows` leaves the rung × landscape choice. The mode depends only on the rung, the climate row, S0's relief class and S1's resources, so S2 reads it
  before it demands the farm plots (§4.2 S2); the hinterland's derivation record carries it; the field-system preset
  (above) lays the fields inside every mode. The village rungs take `fill` (PART III; VG's and MFCG's
  countryside).
* **Count-driven outside plots (COV-FTG-I03, COV-FTG-B09).** The hinterland allocation (S7b) lists the outside classes —
  farmsteads (under the `fill` mode), water and wind mills, quarries, mines, lumber yards, charcoal burners, fisheries,
  lodges — and the decorations
  below. Their sites are seeded by score on `SiteResources` — the outside classes' relation rows (§10.2), the same rows
  the placement solver reads (§4.7 S10b): quarries on stone, mines on ore, lumber at the woodland edge, fisheries on the
  shore, water mills at a reach with fall, windmills on exposed high ground, farmsteads on fertile land near a lane — with
  a **clustering term** (a seed's score rises for each seed of its own kind within the cluster radius, so
  similar features sit together, FTG's rule); S12a fixes the seeds, and the hinterland unit's S10 divides the outside land
  into exactly that many lots by a weighted Voronoi (power diagram with area targets) clipped to the land. Each lot is an
  outside plot (L3 in the hinterland's blocks) with its yard and a `driveway` face to the nearest way corridor (VG's lonely
  houses, on purpose); the edge orchards of §4.5 S7b (4) are lots of their allocated area in the first ring beside the
  district they serve. The unit's S10b places the allocated outside classes and, under the `fill`
  mode, the farm households on the outside plots.
* **Crops and livestock (COV-NG-VS27).** Every field face takes `crop` and `livestock` from the era / region crop table (our
  own rows) under a rotation scheme (three-field by default: winter grain, spring crop, fallow per furlong, each field's slot
  from its furlong index); pastures take livestock. The `lit` preset's field textures read these attributes.
* **Hinterland decorations (COV-FTG-I12).** A decoration table — rows `{kind, count by rung and biome, placement score,
  trail: yes / no, keepClearCm}` — places ponds (small closed outlines from S1's routine, carved at S3, §4.2 S3 (10)),
  copses (wood faces), stone circles, ruins (an outline footprint in the `ruined` lifecycle state), wayside shrines (one per
  through-road by default) and boundary stones at the margin crossings — sited by S12a and built by the hinterland unit; a
  row with `trail` links its decoration to the nearest way corridor by an L3 `path` face; fields and woods keep back by
  `keepClearCm`. Our own rows and counts, calibratable.

**S12b Greenery (after S11; O19; owner base ruling AM-1) — the rule table.** Greenery is a rule family that reads the
prosperity value, the district kind and the greenery propensity field, never leftover space. It is **the same rule family
as coverage and plot granularity**: every share below is a band row of §4.5's band set (a band without a row of its own
interpolates, item 27), and the value used for a plot is interpolated along its prosperity value between the band rows,
so a quarter's greenery blends at its edges. Rows are defaults with provenance
"owner ruling + O19 answers", all calibratable (J-T, §13.7), scaled by the rung's `RungProfile.greenery` (park area per
1 000 inhabitants ×, the edge-green or orchard probability, the private-green shift; §1.1, AM-4). S12b writes only inside
its own faces (§4.1): its L3 batch lays parks and groves on its own reserved green faces and residue, then its L4 batch
types yard-planting parts; avenue and street-tree rows are `Greenery` entities along its own half-corridor strips
(`Greenery.along`, §2.7) that write no plat edge; the hinterland's rows are the hinterland unit's.

| rule | reads | fires when | places (typed, owned entities) |
|---|---|---|---|
| yard planting by plot class | site plan, value | every plot | row → rear kitchen garden (≥ modest), else bare / midden; compound → formal or kitchen garden + orchard part; detached → garden; hovel → bare, pen or midden; cluster → bare ground, paths, a midden (item 70); institution → forecourt / churchyard |
| formal gardens | value | compound plots: share rising from 0 at the modest band's centre through 0.3 at the prosperous centre to ≥ 0.6 in the rich band | `formal_garden` yard parts (grid layout) |
| parks and ornamental grounds | value, institutions, `greens` | rich or planned districts: **0.4–0.8 ha of park per 1 000 inhabitants of the district**, only on S7b reserved faces or residue ≥ 0.3 ha; palace / cathedral close / monastery: an ornamental claim of 0.5–2 ha | `park`, `garden` faces owned by the institution or the commons |
| avenues | way class, value, planned flag | tier-1 ways (`through`, `primary`) bounding or crossing rich or planned districts; prosperous districts with probability 0.5 (the district's `greenery` stream) | `avenue` rows at 8–12 m spacing in each qualifying district's **own** half-corridor strip: a boundary way gets a row on each side whose district's rule fires — both, one or neither |
| street trees (COV-FTG-I09) | way class, value | `secondary` streets in prosperous and rich districts with probability 0.3 | `street_trees`: one row at 10–14 m in the half-corridor strip of the wider side (by corridor half-width; ties: the side left of the way's direction), planted only by that side's district when its rule fires |
| edge green or orchard | value, position | modest districts touching the settlement perimeter: S7b draws the choice (§4.5 S7b (4)) — a `green` / `commons` claim of 0.1–0.3 ha inside the district at its edge, **or** an `orchard` of 0.2–0.5 ha as a hinterland allocation row in the first ring beside it | the green: built by the district's S12b on its claim; the orchard: built by the hinterland unit's S10 — both owned by the commons |
| churchyard | institution | every church / temple plot: a `churchyard` part ≥ 30 % of the plot's yard | yard part |
| market green | era preset | an unpaved market square (era table) | `market_green` |
| castle esplanade (MFP-11) | castle surround row | an inside or inner castle: a 20–40 m green spacer between the bailey and the town | `esplanade` |
| poor quarters | value | little: yard planting on ≤ 15 % of plots; **a tree by the well** (a pin rule at squares and wells) — charm, not zero | yard parts, pins |
| hinterland ring supply | O14 rings | orchards in ring 1, commons in ring 3, coppice in ring 4 (the hinterland unit) | `orchard`, `commons`, `coppice` |
| ambient scatter (COV-FTG-I09) | land use, biome | pasture, meadow and commons: 0.5–2 single trees per ha by biome row, clumped by a cluster process — each unit on its own land-use faces | `ambient` |
| shoreline band (COV-FTG-I09) | bank kind, biome | round ponds and lakes where the bank is not a quay or a beach: a 5–15 m tree band — each unit on its own faces along the shore | `shore_band` |
| trees at render | ecology, species | every green entity: instanced by §8.10's layouts — the ranked tile stamp for areas (woods, gardens, parks, copses: wood 3–5 m, garden 4–6 m), a jittered grid for orchards (6–8 m), a jittered line for avenues and street trees (at their rows' spacings above) and for hedgerows (8–12 m) — keyed by entity and instance ordinal from the `render.instances/<entity>` stream (§6.1); positions independent of the LOD band; crown diameters in metres consistent with building sizes; species from the entity's mix | never stored; overrides are `instance` events (§7.1) |

* **The `greens` toggle (MFP-11).** `on`: the park row fires in every band at a floor rate (0.1 ha per 1 000 inhabitants in
  modest districts, 0.05 in poor) and one park district is seeded per 25 000 inhabitants regardless of wealth (MFCG grows its
  park districts independently of wealth); `off`: parks and park districts are not generated, yard planting and every other
  row unchanged; `auto`: the feature table (§4.2 S0). The resolved mapping is written to the report.
* **Park layout (COV-MFCG-I03, COV-MFCG-G03).** A park's inside is laid by a `PartitionRecipe` (§4.6): a radial `fan` of
  groves with alley-width paths when its compactness is ≥ 0.7, otherwise a `semiFan` from the vertex at its longest edge
  (MFCG's rule), plus a perimeter path (FTG's); groves are `grove` L3 faces and the paths L3 `path` faces (the fan's
  alley-width gaps and the perimeter band), not ways, so S12b never writes L1 after S9; formal gardens use a grid.
* **Species and climate (COV-FTG-I11, COV-FTG-I15).** A `ClimateTable` row per biome (temperate-deciduous,
  temperate-coniferous, mixed, maritime, arid, cold — the biome is a circumstance, §7.7) sets the ground-cover role, the
  tree-species mix with separate inner and outer shares for woods (e.g. a coniferous interior with a deciduous edge), the
  default field system and `farmLayout` (the farm modes' climate override, above), the default roof form and pitch, and the scatter densities; `Greenery.species`
  carries each entity's resulting mix, which the crown symbols and the orchard kinds read. Our own rows.

**Acceptance (O19, adopted):** (a) Spearman(prosperity, private green share) ≥ 0.7 within ± 5 points of the table mean,
σ ≤ 8 across seeds; (b) public-green rule satisfaction ≥ 95 % and park / green area per 1 000 inhabitants within its band,
reported; (c) 100 % of greenery typed and owned or common, untyped leftover green = 0; (d) tree scatter NN p1 above the
canopy threshold and a pair-correlation per class; (e) ≥ 10 000 trees within a 16 ms frame at district LOD (per rung and
tier in §12.7); (f) the greenery control monotone and continuous (§7.8); (g) city-zoom greenery passes the legibility check
and no option coupling drops the layer. Restraint at city zoom is §8.5's; the `grove` tag and VG's dramatic forest are kept
as options; trees are a layer toggle.

**The owner rule, clause by clause (AM-1).** Trees and greens here and there: the poor-quarter tree-by-the-well pin, edge
greens, street trees, ambient scatter. Parks: the park row with its per-capita band and the `greens` toggle. Artificial
landscapes — formal gardens, orchards, avenues, ornamental grounds: their rows. Placed by rules reading prosperity and
district type: every row's `reads` column and the interpolated band rows. Rich quarters gardens, parks and tree-lined ways;
modest ones a green or an orchard at the edge; poor ones little: the rows' band conditions. Yard planting follows the plot
class: the first row. Same rule family as coverage and plot granularity: band rows interpolated along the prosperity value.

**One more member of the family (AM-10).** II.6's island supply law is a band row of this family: an island's supported
area and altitude interpolate along the prosperity value between band rows exactly as coverage, granularity and greenery
do, read the same field, and are zero below the supporting threshold; its rows are II.6's `IslandRule`.

**Gardens over epochs (item 31).** The yard rows read the plot's manifested band for the yard parts that exist (S11's
yard partition is geometry, bounded by §4.11's floor) and the field value for what is planted in them: rung 1's
`densify … infill` builds over the garden part and `thin … infill` re-gardens it, re-running the yard-planting row for
that plot alone (§4.11).
=== REPLACE ### 4.10 S13 Names and labels · S14 Display list · S15 Simulation ===
### 4.10 S13 Names and labels · S14 Display list · S15 Simulation

S13 is two parts (§9.1). **S13a (model; eager for every district)** draws names from the naming concerns only, in §6.3's
cases (a successor keeps its predecessor's name) — quarters (every node of §4.5's merge tree), districts, ways, landmarks
and water, with their short forms — builds each labelled thing's `LabelEntity` with its candidate spines and anchors
(§9.3), numbers addresses, and writes each district's one-line **description** from its venue mix, features and
prosperity (§10.4; COV-FTG-E10). **S13b (view)** places labels per zoom stop (§9.1, §9.2; GEO-29), so the one-click first
paint is complete and the same for every viewer without any placement entering the model. **S14** builds the columnar
display list — the city band eagerly for the first paint, finer bands on demand per district, a transient list per drawing
export, a `DisplayDelta` after every edit (§8.1, §8.9, §11.1). **S15** is the optional module (§10), never in the one-click
path.

**Names and descriptions from character (items 67, 70 and 72).** Since S13a follows S12c (§4.1), a district's naming and
its one-line description read its identity and character vector beside its venue mix, features and prosperity (§4.5,
§10.4; item 72); an informal cluster takes one place name and one label, never one per structure (§4.7, §10.4; item 70);
and a building's description reads its Works stage at the drawn week (§4.11's *Which week is drawn*: the document's week unless the viewer's `week` key names another) — "being built", "being demolished", "ruined
since …" (§4.11, §10.4; item 67).
=== REPLACE ### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base) ===
### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)

**The one built path: add a growth stage (GEO-27, LC-12, FTG-4, FTG-14).** `grow(doc, epochInputs)` appends an `epoch`
event to the log and runs at that log position (§7.1, §7.4) on the persisted model with the epoch sub-stream: S2 (**delta
demand** = the suffix of the sequential roster between the old and the new population, §10.2 — prefix-stable, so no
survivor's use is withdrawn by arithmetic) → S5 for the new stage, when a residual remains after the regrowth-first order
below (S5a: the boundary grown from the previous one and, if walled, its trace and gates; **S5b**, the main-road step, so each epoch can add main roads; S5c with the built-face legality
below; S5d) → S6 (districts extend over the new faces, existing districts keep their ids; the field's drivers are
re-evaluated with the new circumstances, the brush strokes kept as Δ) → S7 (the new enceinte's furniture) → S7b (allocation
of the delta demand in the regrowth-first order below — the old plan's vacancies, ruins and traces first, new faces only for
the residual) → S12a (outside sites for new outside classes; the hinterland unit builds their plots) → S8–S13 on new faces only (S10–S12b in the derivation pool, over a copy frozen as §3.3
step 1 states). S5c's proposals cross water only on a deck — a built bridge, or a `site` the proposal builds (§4.4) — so an
epoch's growth uses the crossing sites S1 and S3 left unused (§4.2 S1 (5)).
* **Built-face legality (GEO-27).** In an epoch a growth proposal may not cross a face holding footprints unless it runs
  along plot boundaries or back lanes (§4.3's `existingFabricCost` applies to S5c too, pricing a route along plot lines far
  below one through buildings) or a declared `demolish` conversion is chosen at its table cost (by building class and age),
  recorded as events. Plots cut by a new corridor are re-cut through the conversion path — buildings that still fit are
  kept, the others demolished with lifecycle events — never re-derived from scratch.
* **Survivors — the wealth ladder and the geometry floor (LC-12; owner, 2026-09-26; item 31).** Surviving plots and
  buildings keep their built state. A re-evaluated field never re-derives them and never removes an occupied building: it
  acts on them only through the explicit, recorded, rate-limited events of the **wealth ladder** — three rungs by the
  time a block has spent in its new band and by what its standing stock allows — drawn from `…/epoch=e` streams (the
  ladder's own draws on `epoch.transform`; a rung-3 re-cut's `plot.*` and `siteplan` concerns keyed by the block's and
  the new plots' lineage with the epoch component, §6.1 — no new concern). The engine that schedules the ladder is the
  owner's staged evolution stage (DEF-8, below); the base carries now the due mark, the table, the operators, the floor
  and the edit kinds, each usable by hand (§7.1) and undoable (§7.4). With no epoch nothing here runs, so the static
  baseline is unchanged (item 23): neither reference evolves — MFCG fixes granularity by ward type and FTG by lifestyle
  tier at generation, and FTG's "regenerate area" is a re-roll, which this ladder never is.
  - **The trigger — a band change past the hysteresis marks the block DUE.** After S6 re-evaluates the drivers (§4.5)
    each block's band is read again against the town's `FieldBands` with their hysteresis (0.02, §4.5): a block whose value
    has crossed a cut by more than it is marked due — `Block.due = { band, since, epochs }` (§2.5): the band it must
    meet, the epoch of the crossing and the epochs spent in that band, counted up at every later epoch — until its stock
    meets the band or the band changes again (a new mark; a flicker inside the hysteresis marks nothing). The mark is per
    block and the memory per plot (`builtBand`, below): "the neighbourhood grew poor" is the aggregate of its blocks'
    marks and its plots' records, never a district switch (J-A31.43).
  - **The rungs.** Every rung acts through operators the base already has — item 18's designation mutator (`mutate`,
    §4.7 S11), item 17's use step (below), item 30's passage choice (§4.6), S10 (7)'s join-and-split law in its
    incremental form (§4.7) — as `LadderOp` conversion events (below), so **no occupied building is demolished by a band
    change** and nothing is re-rolled (J-A31.41).
    1. **Rung 1, at every due epoch — use, occupancy and condition.** *Growing poor:* buildings are let out — `relet`
       raises a building's household count within §2.6's **capacity** (its one capacity function, J-A28.23),
       the roster's households (with a dossier, the households that fill its population, §7.7 item 2; item 20 (h)) and item 17's
       relocation filling them (§10.3);
       the interior follows the occupants down §2.6's **interior ladder** (item 28 (f)): the plan rung re-cuts the
       programme for the new count inside the unchanged wing rings — from one household with its staff rooms to a
       lodging house, a tenement of one-family apartments off a corridor, or single rooms — inside the `relet` event
       itself for a stored plan (§7.3's stored-plan row; J-A28.72), otherwise when next clicked (the unstored rung goes
       `stale`, §2.8); F-PLAN never drops a household (§5.2);
       outbuildings convert to dwellings and workshops and sheds and hovels infill the yard (`mutate` toward the field
       band's use and specialisation columns; `densify … infill` inside the manifested band's yard rows); the garden is
       built over (§4.9); the fabric's **condition** steps down — `Building.condition` `kept → worn → neglected` (§2.6:
       wear and patched roofs, rendering classes of §8.2, never a shape change, item 19); the roof is lost only by the
       decline ladder's `decay`, after the building's last household has left (`vacate`; the derelict state of §2.8's
       ladder). *Growing rich:* renovation and extension by `mutate`'s adapt and add steps toward the
       richer template (item 18), households re-united (`relet` down to the row's built count; the interior re-cut back
       up the ladder removes what the subdivision added and restores the earlier plan where nothing else changed, §2.6),
       infill cleared once its households are re-homed and the garden reclaimed (`thin … infill`; infill whose
       households cannot be re-homed within the epoch's churn cap waits, as a court does in rung 2), condition restored.
       Use, condition and the interior read the field band; geometry reads the manifested band (the floor, below).
    2. **Rung 2, after the ladder table's duration in the band — tenure and yards.** The holding fragments or
       consolidates without its front changing. Growing poor, the yard becomes a back court of rear plots reached by a
       new passage (`densify … back_court`) where §4.6's passage choice allows one and the plot's manifested band's row
       carries a rear-plot or hidden share — a middle-floored plot's yard is infilled, not cut into tenements; growing
       rich, a back court is cleared and re-gardened (`thin … back_court`: its uses relocated by the use step, its
       households re-homed — item 17's relocation, or a `relet` up in a standing shell within §2.6's capacity — and its
       buildings vacated (`vacate`), then the rear buildings cleared (`clear`) and the passage sealed, item 30; a court
       whose households cannot be re-homed within the epoch's churn cap waits); and big houses change class keeping their
       shells — a mansion to a tenement, an inn, a workshop or a chapel — by `mutate` (item 18). Rung 2 keeps every
       frontage and every main shell; its one plot-line change is `densify … back_court`, which splits the yard off the
       plot into rear plots and a passage face by S10 (7)'s incremental re-cut — the front plot, the child that keeps the
       frontage anchor, keeping its address and `builtBand`, every child's lineage continued by §6.3's SPLIT rule (the
       parent's key with its child index), the rear plots taking their new stock's band as `builtBand` — admitted only as
       above, never on a middle-floored plot; a court
       `thin` has emptied and cleared is vacant, so its rear row returns to the front plot's garden by rung 3's
       `amalgamate` (J-A31.40).
    3. **Rung 3, on vacancy, ruin, a destructive circumstance event or redevelopment only — the geometry follows.** A
       vacant or ruined plot's ring is re-cut to the band: growing poor, an abandoned or ruined mansion's plot is split
       into row houses or tenements (`subdivide`), or the fallen house's plot is re-cut and rebuilt as lodgings; growing
       rich, a buyer joins two or three worn small plots and replaces their houses with one large building (`amalgamate`,
       then `rebuild` or `build`). **Redevelopment** is a composite the engine issues in order — purchase (the plots'
       uses closed or relocated by the use step under item 17's rules — a dossier-backed use relocated, never closed
       (*Dossier content across epochs*); a pinned assignment or a lock stops it),
       vacancy (`vacate`), then the re-cut and the new stock — so the invariant holds at every step (J-A31.47). The
       re-cut is S10 (7)'s law in its incremental form (§4.7): the due block re-cut with its neighbours fixed (§7.3: the
       block is the effective scope, with its seam exception), under the band's granularity target, fusing by S10 (7)'s
       orderings (vacant or same-owner neighbours first, then a rear plot into its front plot) and splitting by them
       (the widest frontage first, then the deepest yard), every survivor's plot byte-identical, the new plots' buildings
       by S11's mutator from the empty design, their residential classes by S10b's class mix at the new stock's value (§4.7,
       item 71). Slums arise where the stock was small and cheap to begin with, or from
       rungs 1 and 2 inside big shells; a district of mansions grows poor as tenements behind grand fronts, never as a
       cleared slum (the owner: "hard to imagine that it would be torn down into a slum if it was filled with
       mansions").
  - **Asymmetry — speed by direction and by the stock's replaceability (owner: "much easier for a poor neighborhood
    to grow rich and merge plots").** The rung durations are rows of the **ladder table** (`WealthLadderTable` in
    `@plat/tables`, §7.6, §14; our own rows, calibratable, §13.9; tendencies changeable per region and era, item 23),
    keyed by direction and by the stock's `replaceability` — a column of the template rows of the class table (§10.2), read
    at the plot's `builtBand` row: `immediate` (tents, sheds, hovels), `short` (cottages and the row houses of the
    poorer bands), `long` (the row and detached houses of the prosperous bands), `ruin_only` (manors, halls,
    institutions) (J-A31.42). Growing rich reaches rung 3 within a few epochs because it replaces cheap stock; growing
    poor stays at rungs 1 and 2 for generations, because expensive stock is not torn down, so splitting waits for
    vacancy, ruin or a destructive event. Every duration in years here is read on the weekly clock (*The clock*, below):
    the years a block has spent in its band are (the epoch's week − the week of the epoch that marked it, from its
    `EpochRecord`) ÷ 52. Default rows:

    | replaceability of the standing stock (at `builtBand`) | years in the band before rung 2, growing rich / poor | rung 3 growing rich: fusion after purchase and vacancy | rung 3 growing poor: splitting |
    |---|---|---|---|
    | `immediate` | 0 / 0 | in the due epoch | on vacancy, ruin, a destructive event or redevelopment |
    | `short` | 0 / 10 | after 10 years in the band | the same |
    | `long` | 10 / 20 | after 30 years in the band | the same |
    | `ruin_only` | 10 / 30 | on vacancy, ruin, a destructive event or redevelopment only | the same |

  - **Churn.** The table's **churn cap** rows bound every epoch, per kind — `geometry` (rung-3 re-cuts and rebuilds),
    `fabric` (the decline lottery's strikes, below), `use` (the use step's relocations, below) — as a share of a
    district's plots (or uses) per decade, scaled by the epoch's `years` — a fraction of a year allowed, the scaled cap's
    fractional part the chance of one more, drawn on `epoch.transform` keyed by the district, the kind and the epoch (no
    new concern; J-A76.44) — and a maximum per block per epoch; defaults
    0.05 / 0.10 / 0.10 per decade and 2 plots per block (the former "10 % of a district's plots per decade" is the
    `fabric` row). Candidates beyond a cap wait, in address order, so a neighbourhood changes over many epochs, never
    all at once; item 17's cap and the lottery's bound are rows of this one table (J-A31.46).
  - **The geometry floor (owner: "their floor is bounded to middle class … once a neighborhood generally gets to a
    middle class outcome, that forever remains its geometry until vacancy, ruin, fire, war, or redevelopment shifts
    things entirely. it would cycle … between rich and middle").** Each plot persists `builtBand` and
    `builtProsperity` — the band and field value its present stock was built for (§2.5; in the model digest, §6.2; never
    recomputed from the field, unlike the fields themselves, J-DET-12) — and derives, never stores, `geometryFloor =
    min(builtBand, FieldBands.middle)` by the band order: the settlement's middle band (§4.5 names it) for stock built
    at or above it, the stock's own band below it — a hovel cannot read poorer than a hovel; it can only be replaced
    upward. The plot's **manifested band** is `max(field band, geometryFloor)` and its manifested value `max(field
    value, floor value)`, the floor value being the middle band's lower cut, or `builtProsperity` when the floor is the
    built band. A **block-level read** — S10 (2)'s granularity rows, II.3's dispatch — takes the block's manifested band
    as `max(block band, the floor of its standing plots' area-weighted median)`: the plots ordered by `geometryFloor` in
    the band order (ties by address), the floor at which their cumulative area first reaches half their total; a
    plot-level read takes the plot's own (J-A31.43). Every change other than a rung-3 event reads the manifested band and value for what is BUILT — S10 (2)'s
    granularity rows, S11's template geometry columns (size budget, structures, storeys, heights, frontage, court and
    garden; J-A19.43), the yard partition (§4.9), II.3's block dispatch — and the field band and value for who is there
    and how it fares — households, condition, specialisation, the room programme, labels and descriptions (J-P1 stands:
    "the rich quarter" is still a description of the field). So a mansion district that grows poor reads as
    middle-class geometry — big plots, big shells, subdivided into lodgings, yards infilled — while its occupants,
    condition and names are as poor as the field says: **the interior has no floor** (item 28 (f)) — the shell keeps its
    floor while its rooms follow its occupants down §2.6's interior ladder, to single rooms off a corridor at the
    poorest, which is where the poor live when every area is developed (the same shells, a different interior; item 30's
    back courts behind them, the cheap stock of item 27's shanty rule at the edge, §4.5); between the rich and the middle
    manifestation it cycles freely and reversibly through rungs 1 and 2 (renovation and re-unification upward,
    subdivision and infill downward) with no frontage change and no shell falling toward a poorer band (renovation may
    extend a shell, item 18); the middle band is each settlement's own (§4.5's per-town cuts), so a town's middle and a
    metropolis's middle each bound their own districts (J-A31.43). **What writes `builtBand`** (J-A31.44): generation
    (the plot's band at S10); a rung-3 event, to the band of the new stock (an `amalgamate` that builds nothing — a
    thinned rear row or a cleared plot returned to its neighbour — keeps the `builtBand` and `builtProsperity` of the
    member whose frontage anchor the joined plot keeps, §6.3's JOIN); rung 2's `densify … back_court`, for the rear
    plots it creates only (their new stock's band; the front plot keeps its own); the hand edits of rung 3's kind, each
    re-deriving the stock by the user's act — `rebuild`, `demolish` then `build`, `amalgamate`, `subdivide`, `fill`, a
    `replace` close-up (II.4) and a New random of the block — and the authorial re-derivations
    that re-derive the stock itself: a field brush's or a `FieldBands` `setAttr`'s re-derivation and `Adjust` (§7.2,
    §7.4 — a brush is how a user designs the town, so it re-derives its scope to the current band; the floor governs
    wealth change over epochs); and a **completed upward refurbishment** — a `mutate` whose result meets a higher band's
    shape template raises `builtBand` to that band, so a renovated quarter keeps its floor (the owner's "refurbished
    housing"). Nothing else lowers it: rungs 1 and 2 never lower a standing plot's
    `builtBand`, and wealth change over epochs lowers it only through rung 3 (a completed upward refurbishment raises it,
    and rung 2's rear plots take their stock's band). Regenerate (keep settings) keeps it (a recorded input, §2.8); a member a split
    `resurrect`s takes it from the rung-3 event that re-cut it, not from its tombstone (§6.3); a document written before
    the attribute existed gets `builtBand` = its plot's `DerivationRecord.band` and `builtProsperity` = its recorded
    sample, exact for every document without an epoch (§7.5). The floor draws no random numbers. With no epoch the
    manifested band equals the field band everywhere.
  - **Lineage survives, so the seed survives (J-A31.48).** Fusion and splitting continue lineage by §6.3's JOIN and
    SPLIT rule (J-A31.73), so one seed with one history gives one town, and an undo returns the former plots exactly from
    the undo record's rings and records (§7.4). Every ladder event is a mutation that continues lineage; only a
    re-derivation takes fresh lineage (§6.3's succession rule; the owner: "It's not new rerolls its modifications and
    variations to the original seed").
  - **The epoch's order** (the engine's loop on the base's path). Before S2: the rung profile is read at the epoch's
    population target (*The rung at an epoch*, below), the dials' applied standings and shares move past their hysteresis
    (*The dials' inputs over epochs*, below) and `TradeFlow` is re-read from the epoch's trade slice on the current
    geometry (§4.3; item 77). After S2's delta demand: (a) S6 re-evaluates the
    drivers and the bands, re-bands every live plot's `fieldBand` against its own column by §4.5's rule (§2.5;
    J-A28.29) — before any rung reads the field band, the former values in the epoch's undo record — and marks the due
    blocks; (b) the use step (item 17, below) closes, opens and relocates uses;
    (c) when the target fell, the roster's suffix leaves in reverse ordinal order — a building whose household count
    falls but not to zero takes a `relet` down (an unstored plan rung `stale`, a stored plan re-cut in the event) and `vacate` fires only when its last household
    leaves; the decline lottery (below) draws per building, deciding whose households leave first, and strikes fabric by
    its exposure (item 28 (f) with item 8; J-A28.45); (d) the
    ladder runs its rungs on the due blocks under the churn cap; (e) the dossier events that arrive with the epoch's inputs
    (`EpochInputs.dossier`, below, in the host's order) are applied here as mutations at that epoch — S10b's `dossier` request and S11's mutator on the current map (§4.7,
    §7.7; item 22 (e)), never a re-roll — it remains what the seed, the ordered history and its own edits make it
    (J-A22.42); (f) siting places the delta in the regrowth-first order below, from its step (0) — a `relet` up in a
    standing shell before `reoccupy` of a vacant one (J-A28.45); (g) a
    residual grows a stage (S5); (h)
    every live placement rejection (§7.7's record, item 20) is re-checked by §7.7's lapse rule (J-A20.74, J-A20.41), the
    epoch writing `lapsedAt` inside its own touched set, and a lapsed site is eligible again from the next placement on;
    (i) the **character step** (item 72): §4.5's S12c on the grown town — each district's character vector, identity
    (past its hysteresis, re-typing a kind its identity row names) and band range re-derived, the clamped excess added
    to its pressure, a district whose identity changed renamed by §6.3's epoch case (§4.5 (8)–(9), §10.4) — and
    `TradeFlow` re-derived on the grown geometry (§4.3); (j) every physical change of steps (a)–(g) is shown on the
    ground by a Works started inside the epoch's span, and every Works that finished more than `works.retainWeeks`
    before the epoch's week is retired (*Works*, below; item 67).
    Each step's events cite the epoch; the whole is one `epoch` event's fold (§7.4). A dossier event between epochs is
    applied at its own log position by the same request and mutator (§7.7); a dated one — between epochs or carried by an
    epoch — keeps its `dossierChange` (§7.1, item 75) and starts its Works at the change's week.
  - **Regenerate, Adjust and the derivation record.** A transformed entity's `DerivationRecord` is updated; every other
    plot keeps its record, so "Regenerate (keep settings)" on an untouched block reproduces it byte for byte, and
    re-deriving it with the new field is the explicit `Adjust` (authorial, above). Siting across epochs places only delta
    demand, in the regrowth-first order below.
* **Test (M4).** On a town with walled, ribbon and suburb regimes, adding a stage re-rolls 0 survivors, adds ≥ 1 primary
  when its gate law asks for one, and replays from the log to the session hash. The ladder's, the floor's and the epoch order's hook tests are §13.2's
  (item 31), as are the Works', the clock's and the character step's (items 67, 72 and 76).

**Conversions** are typed plat operations with recorded events. `ConversionOp` is defined here, once, as one union: the
base's own kinds, the ladder's (`LadderOp`, item 31, the Survivors rule above), the decline hooks' (`DeclineOp`, item 8, below),
the use step's (`UseConversionOp`, item 17, below), the terrain and water conversions' (`TerrainWaterOp`, item 25, below)
the passage sealing's (`HiddenOp`, item 30 (e), below) and the underground's own kinds (item 65: the buried old town's
`RaiseGrade`, II.7.6, and the undercity's `ClearUndercity`, II.7.5, declared there); §7.1's `convert` event carries it, and
`build` below is §7.1's
`build` event:

```ts
type ConversionOp =
  | { op: 'wallToWay'; enceinte: Id; widthCm?: Cm } | { op: 'gateToJunction'; gate: Id; square?: boolean }
  | { op: 'outskirtToDistrict'; region: { ring: Polygon; key: PlatKey } /* the outskirt faces it covers; no stored slots, §2.2 rule 5 */ } | { op: 'demolish'; id: Id }
  | { op: 'rebuild'; building: Id; cls: BuildingClass /* the whole replacement a ruin or a redevelopment calls for (rung 3), never a designation change (§4.7 S11) */ }
  | { op: 'build'; plot: Id; cls: BuildingClass; footprint?: PolygonCm /* as §7.1's build event */ } | { op: 'carve'; kind: 'canal'|'moat'|'harbour_basin'; polygon: Polygon }
  | { op: 'abandon' | 'decay' | 'ruin' | 'robStone' | 'clear' /* removed to a footprint trace */; building: Id } | { op: 'plotToGarden'; plot: Id } | { op: 'contractWall'; enceinte: Id; trace: Polygon }
  | LadderOp | DeclineOp | UseConversionOp | TerrainWaterOp | HiddenOp | RaiseGrade | ClearUndercity;
type LadderOp =                                                                            // item 31's rungs (Survivors, above): each a mutation with an undo record (§7.4), usable by hand (§7.1)
  | { op: 'relet'; building: Id; households: number /* rung 1: the household count the roster fills, within §2.6's capacity (J-A28.23); a stored plan is re-cut inside this event, an unstored one goes stale and is re-cut on the click, both along §2.6's interior ladder (§7.3; item 28 (f)) */ }
  | { op: 'densify'; plot: Id; as: 'infill' | 'back_court' /* rung 1: sheds, hovels and a workshop in the yard, the garden built over; rung 2: rear plots in the yard reached by a new passage (§4.6, item 30) */ }
  | { op: 'thin'; plot: Id; what: 'infill' | 'back_court' /* the inverse: infill cleared and re-gardened (§4.9) after its uses relocate and its households are re-homed (item 17's relocation, or a `relet` up in a standing shell within §2.6's capacity) and its buildings vacated; a back court likewise, its passage sealed */ }
  | { op: 'subdivide' | 'amalgamate'; plots: Id[] /* rung 3 only, on vacated plots: S10 (7)'s law in its incremental form — the due block re-cut with its neighbours fixed; §7.1's plot split and join are the hand forms */ };
```

**`wallToWay(enceinte)`** is `retypeEdges(ChainRef('wall', enceinte), add ('way', the new ring road), remove 'wall')`: the
wall chain becomes the spine of a `primary` way with a ring-road width, on the same edges; the wall strips' setback and
glacis lines are removed, so the strips merge into the faces beside them, their band, tower and gatehouse faces are
cleared with the rest of their finer content, and S9's `corridorUnion` re-derives the ring road's corridor there; towers
are removed; gates become junctions with a `square` option. **Clearance (GEO-38):** the new corridor needs half its width
on each side of the old wall line; where the half-band plus setback on a side is narrower, plots meeting the new corridor
are clipped along its edge — a plot keeps its id when its frontage anchor survives (O8 g), and footprints that no longer
fit are demolished with lifecycle events (cause `convert:wallToWay`).

**`carve` — a canal, moat or basin added by an edit, or an outer moat by S5a (§4.4).** The dry run decides every way's fate
and the carve's one **footprint** before any batch runs. Let `S` be the channel ⊕ its bank setback. Every way whose corridor
meets `S` takes a fate by class (J-P30), recorded as lifecycle events with cause `convert:carve`:
* **kept with a pinned deck** — every `through` and `primary` way, and any other way that is the only connection of the
  streets on its far side to a gate or the plaza. Its deck (S1 (5)'s form, perpendicular to the channel) and its
  **re-route** are solved in the dry run by §7.3's S4 local operator — between the way's nearest pinned nodes on either side
  of `S`, on S3's lattice with `existingFabricCost` (so it keeps near its old line), through the deck as a fixed graph edge;
  a way that already meets the channel within ± 10° of its normal keeps its line and only its stretch across the channel
  changes. The old stretch between the re-route's two ends is the way's **replaced stretch**. S7's rules give the deck its
  `Bridge` (events: `altered` on the way, `built` on the bridge);
* **cut** — every other `secondary`, `lane`, `alley`, `cul_de_sac`, `track` and `path`: its stretch inside the channel ⊕
  max(bank setback, 1 m) is removed, so every cut end lies at least 1 m from the channel, and a remainder that now dangles
  shorter than one block depth is pruned (events: `altered`, `demolished`); `quay` and `pier` ways are cut the same way and,
  where they met the new water at ≥ 30°, extended from the cut end to the new bank as a quay or a landing.

**Other crossings (J-I13).** A wall trace that `S` crosses has its **run** — the trace between the nearest unaffected towers
on either side of the crossing — re-traced as data in the dry run, with a water gate where the channel crosses, as §7.3
(b) 2 re-traces a run a moved river crosses. The stretches of the run's strip lines alongside it — the inner setback line,
the glacis line (or the moat's inner bank, which is water and stays) and, where the era row has one, the intervallum —
between the feet of the perpendiculars from the run's two end towers leave with the old run, and S7's operator re-cuts them
along the re-traced run from those feet (batch (3)). Every way the re-traced run's new strips — the new run ⊕ (half its band
+ its setback, and + its glacis or berm on the field side) — will meet, other than a kept way through a gate of the run
(whose corridor ends each strip, §4.8), takes the `cut` fate at the strip's boundary, as `drawWall` cuts the ways its new
strips meet (§5.2, §7.4), and every plot inside the new strips is re-derived with the rest of `R`. A locked or pinned way,
wall or finer entity, or a reservation, inside `S` or inside a new strip returns to the dry run as an F-EDIT conflict (lock
> drawn geometry; Re-derive from S3 offered for a reservation, §5.2), as for S1's water operator.

**The footprint (J-P34).** `C` is the set of L1 cells (the faces of the L1 view) that (a) the channel ⊕ (`attractCm` + bank
setback) meets; (b) border a removed stretch, a pruned remainder or a stretch the new strips' cuts remove; (c) border a kept
way's replaced stretch or are crossed by its new route; (d) where the channel crosses a wall, border the old run or the
strip-line stretches batch (1) removes with it, or meet the re-traced run ⊕ (half its band + its setback, and + its glacis
or berm on the field side) — the ground its new strips will take. The **footprint** is `R` = ⋃ `C`, exactly: every point of
the arena lies in one L1 cell, so the channel's buffer lies inside the cells (a) names, and no cell outside `C` holds a face
any batch of the carve clears, splits or re-derives. `R` is the carve's one clear region: batches (1) and (2) declare it as
`KernelTx.clearRegion`, step (4) re-derives exactly its cells, the fate report lists exactly the protected entities inside
it, and the locality checks — §3.3's clear-region confirmation, §7.3's carve row, the §13.1 and §16 M3a fixtures and the
O18 (g) / O2 (c) perturbation test — require byte identity outside it, less the seam exception at its boundary (step (4)).
By (b)–(d) no plot outside `R` loses its access (a plot's access edge lies on a kerb of a way it fronts) and batch (1)
removes no edge a kept face uses (no `E_KEPT`); inside `R`, S10 gives every plot an access edge by construction (O5 a),
and S8's deep-interior rule and F-PLOT's alley rung act as in any block. The wall-crossing fixtures are §13.1's and
§13.2's.

**The batches**, each single-level (§3.3):
1. **L1, clear region `R`.** `clearFiner` on `R`'s cells; the cut stretches, the pruned remainders and the kept ways'
   replaced stretches are removed, each through its `StretchRef` (§3.4) — a way cut in two first hands its far part to a new
   way by `retypeEdges`' `rekey` on that part's `StretchRef`; each kept way's new route is inserted whole, across the line the
   channel will take, with its deck's two bank vertices placed on it at the new bank points — carrying `deck_end`, pinned —
   and the span between them carrying the structural `deck` role beside `way`, so every kept way stays one connected chain
   through every batch; each crossed wall run is replaced by its re-traced run, with its water gate's two bank vertices
   carrying `('gate_end', gate, 0 | 1)` under a fresh `Gate` (§2.2 rule 7), the old run leaving with the stretches of its
   strip lines alongside it (each through its `StretchRef`, its ends placed by `splitThrough` at the feet of the end towers'
   perpendiculars); the ways the new strips will meet are cut at the strips' boundaries; and every other L1 edge the
   channel's banks will cross that is no way — a settlement-perimeter or other district-boundary stretch, a wall strip's
   setback or glacis line outside a re-traced run — is split at its two bank points by `splitThrough`, each carrying an
   `anchor` contact name (§2.2 rule 7: the entity of the edge's first own-level row, the smallest free ordinal — from 2 on an
   enceinte), with the stretch between them removed through its `StretchRef`; the map's `border` line is split at its bank
   points the same way but kept whole across the channel (§3.3 clear regions, rule 2; the arena's outer ring is L0 and meets
   the channel at its own level, §4.1). Those `deck_end`, `gate_end` and contact-name vertices are the carve's **prepared**
   vertices; every cut end lies ≥ 1 m from the channel, so no way is prepared except at its deck.
2. **L0, clear region `R`, `KernelTx.prepared` = the `deck_end`, `gate_end` and contact-name vertices of (1) (J-P40).** The
   channel's ring is inserted and attracts onto and promotes the prepared vertices, stripping the contact names (§3.3 rule
   3, §3.6); each deck span — the kept way's own edge between its two promoted bank vertices — now crosses the water as the
   `Bridge`'s deck (§2.2 rule 7), and no L0 edge crosses the channel, so the water body stays one L0 face. Any other contact
   with finer geometry is `E_LEVEL` or `E_KEPT` and returns to the dry run.
3. **L1.** Each kept quay or pier is extended from its cut end to the new bank (its end a Steiner vertex on the L0 bank line,
   §2.2 rule 3); S7's operator re-cuts the wall strips' setback, glacis and intervallum lines along each re-traced run from
   the feet (1) left, closing them on the new banks, and builds its towers and the water gate's `Gate` record, whose `banks`
   name its two `gate_end` vertices (§7.3's S7 row).
4. **Re-derivation of `R` (J-P43).** S6's operator, restricted to `R`'s cells, after the L0 batch: each land face of `R`
   takes the district — or the hinterland pseudo-district, or the `wall_strip` typing — of the pre-edit L1 cell that held
   the larger part of its area (ties by id). A boundary stretch removed under the water lies between its two bank anchors,
   so the L0 batch re-separates the land on either bank along the boundary that remains and no land face spans it: a canal
   across the settlement perimeter leaves the land outside it with the hinterland on both banks (0 district faces outside the
   perimeter; fixture §13.2), and a block part beside a crossed glacis line keeps its own block's typing. The same rule
   settles a boundary stretch removed on land — a cut way that carried a district boundary — by the larger part. The new
   strips (3) cut are typed `wall_strip` and take their district as S7's strips do (§4.8), and the channel's water faces
   leave the district face sets they were cut from. Then S8–S12b re-derive `R`'s cells by tree scoping (§7.3 item 2) — S8
   first, because cuts and replaced stretches merge and reshape L1 cells — with S10's step (0) for `R`'s faces beside a wall
   trace, the settlement perimeter or a shared reservation boundary (§4.7). Where a batch of the carve adds or removes a
   junction vertex on a spine that bounds `R`, the far side takes II.1 (3)'s neighbour step or its reversal; those steps and
   the `Seam` records of `R`'s districts are the carve's seam exception, the same set a district's reroll has (§7.3 item 1),
   which the locality oracle computes from the commit records. A carve therefore costs its footprint, not the town.

At S5a nothing finer than L1 exists yet and the channel meets only the arterials through the stage's gates: every way is
kept with a deck, nothing is cut, and `R` clears nothing (§4.4). Every touched entity's lifecycle records the event with its
cause.

**A cut way's far part — the records that name a way (J-Fpipe-2, from Fable's review of 27 September 2026).** When the carve's batch (1)
hands a cut way's far part to a new way by `retypeEdges`' `rekey` — and S1's water operator, which cuts ways the same way
(§7.3 (b) 3), likewise — the rekey moves the far part's role rows, knot rows and vertex role rows and no record (§3.4), so the same batch
**re-points every record that names the way by id along the far part** to the new way: the `Frontage` records of the
blocks along it (`Frontage.way`, §2.5), `Bridge.way` of a built deck there, `Gate.way` of a gate there (§2.7),
the `Greenery.along.way` of its avenue and street-tree rows (§4.9; §2.7), `Junction.arms` at its junctions
(§2.4), `Tunnel.follows` of a main beneath (§2.7), and the `SeamEdge.chain`, `Portal.wayId` and `SeamAmendment.spine`
entries of the `Seam` records that name it (II.1). Those records lie outside the footprint `R` and change only by that id:
this is the carve's **identity exception**, which the locality oracle admits beside the seam exception (§7.3 item 1, item 7
(ii)) — every such record equals its prior record except that the new way's id replaces the old, and every other entity
outside `R` stays byte-identical. Which part keeps the old address is §6.3's anchor rule — the part keeping the old anchor
(§7.3 (b)); the far part is keyed by §6.3's SPLIT rule as a split plot's or tunnel's part is (J-A31.73, J-A11.43),
continues the lineage, and **keeps the parent's name and naming record without a draw** — a street a canal severs is one
street on both banks, so S13a draws nothing and its label candidates for the new way are built inside the carve's S13a
delta (§7.3 item 2). A `Frontage`'s `class` and `lengthCm` are unchanged (the class is the way's and moves with the
rekey). The carve's undo restores the one way and every re-pointed record (§7.4). *Test (§13.2, with §13.1's carve
fixtures):* after a canal that cuts a `lane` and a `secondary`, §5.3's reference-integrity row holds on every record that
named either way, 0 records outside `R` differ from their prior other than by the new way id, and both parts of each cut
way carry one name.

**Coherence from one seed (owner).** Epoch N+1 is derived from epoch N's persisted state, the inputs and the seed's epoch
sub-stream `…/epoch=<n>`: the same town under different inputs has different histories, under the same inputs the same
history, and nothing that survives is re-rolled, because a survivor keeps its lineage and its derivation record (§6.3,
§7.3).

**The evolution engine is the owner's later stage (DEF-8); its hooks are concrete now.** The owner's history — growth,
regression and growth again: houses emptied and robbed for stone, plots turned to gardens, a shorter wall ring inside the
old one, ruins left standing — is expressed with the base's own records: the transformation and conversion kinds above
(`abandon`, `decay`, `ruin`, `robStone`, `plotToGarden`, `contractWall`, the ladder's `LadderOp` and the `DeclineOp` kinds
below), which a user can also apply by hand in the base (§7.1); the lifecycle history on every entity; the epoch streams; the circumstances timeline (§7.7); and the sequential
roster (a population fall selects its suffix in reverse ordinal order; the decline table's exposure lottery, below,
chooses which buildings empty). A ruined building keeps its footprint and heights and draws with the ruin program and the `none` roof kind (§2.6, §8.2); when and where the engine
applies these kinds is its own rule table over the `…/epoch=e` streams. The engine plugs in behind one interface, and the
base registers only its own path:

```ts
interface EpochInputs { week?: number /* item 76: the absolute week at the epoch (The clock, below) — a dossier-bound map's is SettlementForge's calendar.elapsedWeeks; absent on a standalone call, then the previous week + round(52 × years) */;
  years: number /* derived from the weeks: (week − the previous epoch's week, or the creation week) ÷ 52, a fraction allowed */; populationTarget: number;
  circumstances: CircumstanceSlice /* §7.7 item 2 */; events: { kind: string; params: Record<string, number> }[];
  dossier?: EditEvent[] /* the host's dossier events (author 'host', EditBase.dossier set), in the host's order, applied at step (e) (§7.7 item 6); each keeps its EditBase.dossierChange (§7.1, item 75) */ }
interface EvolutionStrategy { plan(doc: Document, inputs: EpochInputs, tables: TableView, rng: Stream): KernelResult<(ConversionOp | EditEvent)[]> }   // registered by name (§4.12)
// base registration: 'grow-by-stage' — the path above; the owner-staged engine registers its own strategy and reuses every event kind
```

The base builds and tests exactly one path — **add a growth stage to an existing town** — at M4 (G-P13), because it is the
same path "regenerate this area" uses.

**The clock — weeks (item 76, with item 67's Works; owner: "our simulator advances by units of one week").** "Our
simulator" is the clock that changes the map's inputs — the host's (SettlementForge's) or the staged evolution engine's —
never `@plat/sim`'s `time` view key, which changes nothing (§10.3; J-A76.41).
1. **The week.** The map's time is an integer week. For a dossier-bound map it is SettlementForge's
   `calendar.elapsedWeeks` — no conversion; never `elapsedMonths`, never `history.age` — and its creation week is the
   port's `HostContext.week` (§14) or 0; a standalone map starts at week 0. `EpochInputs.week` is the absolute week at the
   epoch and `years` is derived from it (above); a standalone `grow` call that gives `years` only takes the previous week +
   round(52 × years) and re-derives `years` from the whole weeks, so every reader sees one clock. A dossier event carries
   its week in `dossierChange.week` (§7.1, item 75). The document's current week is derived — the week of the last folded
   event that carries one — never a stored counter (§2.9), and each epoch's week is its `EpochRecord`'s.
2. **Dating a dossier change.** The port (§14) dates each change it finds by the first of these rungs that gives a week: an
   explicit tick on the change's receipt (`foundedAt.tick`; lifecycle `institutionHistory[].tick`;
   `populationHistory[].tick`; `activeConditions[].triggeredAt.tick`; campaign-era `historicalEvents[].tick`;
   `decrees[].tickRef`; `calamityHistory[].tick`; `previousGovernments[].tick`; a news tick; the provenance ledger's tick),
   then the week suffix of the change's outcome id, then `HostContext.week`, then none: a change with no week applies
   finished, with no Works (§7.7 item 1 reads these rungs; the port counts an undated change in its report).
3. **The season — one calendar (J-A76.42).** `CalendarRow` gives the week of the year, `(week mod 52) + 1`, and its
   season: a dossier-bound map reads the row `sf445` (52 weeks; four seasons of 13 weeks from spring; month ends at weeks
   4, 8, 13, 17, 21, 26, 30, 34, 39, 43, 47, 52), a standalone map our own default row, shaped alike (month ends 4, 9,
   13, 17, 22, 26, 30, 35, 39, 43, 48, 52). The Works' pauses (below), §8.2's season rows for a campaign week and the
   module read it, and no second calendar exists (`tables/dossier/calendar`, §14).
4. **The cadence.** The port folds a dossier's discrete changes as standalone dossier events at their weeks, in
   SettlementForge's order (decrees first), and an `epoch` at each 52-week boundary crossed — or sooner, when the dossier's
   population has moved from the last epoch's `populationTarget` by more than the **roster tolerance**, ± 5 % (J-A76.43;
   the one number §7.7 item 3's lapse reads too) — carrying the target, the circumstance slices (§7.7 item 2), the event
   kinds and that week's dossier events in `EpochInputs.dossier`; a catch-up batch follows the same rule, gaps allowed.
   No epoch is folded per tick: the Works' stages are derived from the week at any drawing (below), so no weekly epoch is
   needed to show them. A standalone map's epochs are its circumstance timeline's (§7.7, dated in weeks) or a user's
   `grow` calls.
5. **Rates per year (J-A76.45).** Every chance this section states per unit of time is per year, applied over an epoch's
   span as `1 − (1 − p)^years` through `dmath` (§6.5 (3)); dwell bands and ladder durations are in years read as weeks ÷
   52; the churn caps scale by `years` (above) — so epochs a few weeks apart and one a decade long change the town at the
   same rate. II.6's island slots follow the same rule.

```ts
interface CalendarRow { id: string /* 'sf445' — the dossier's; 'plat-default' — ours */; weeksPerYear: 52;
  seasons: { season: 'spring'|'summer'|'autumn'|'winter'; fromWeek: number /* week of the year, 1-based */ }[]; monthEnds: number[] /* twelve week-of-year ends */ }
```

**The rung at an epoch (item 81 (b); J-A81.41).** At each epoch the rung profile is read at the epoch's
`populationTarget` (§1.1's ladder): a crossing of one of §1.1's bands changes the rung's row — its granularity,
greenery, layer and budget rows — for everything the epoch builds from then on, and the standing fabric survives exactly
as it survives a growth stage (§6.3). A crossing upward whose town the frame no longer holds grows the frame to the one §3.2 (9)
gives the new target: S1 derives terrain, water and the hinterland's ground on the ring between the old margin and its
successor — the same terrain field continued, each water body continued across the old margin with its inner reaches fixed
— and the kernel grows the frame by §3.2 (9)'s single-level batches over one clear region (J-A81.31) — an L1 batch clearing the finer content of the whole L1 faces beside a lapsing stretch of the old chains or under the new rectangle, an L0 batch replacing the `margin` chain, an L1 batch replacing the `border` chain — each raster growing by whole cells as §3.2 (9) states, every stored height unchanged and the flow fields recomputed over the grown grid. The pipeline then continues on that region and the ring: S4 continues every through-road from its old end to the new margin, S12a sites the hinterland on the ring; the stages that own the cleared faces re-derive them (the hinterland unit for the hinterland's, a district's S8–S12b for a district's; on each underground part §3.2 (9) grows, that part's stages for its cleared faces — part 0's network stage its bands by `corridorUnion` (II.7.2) and II.7.3's stage its plots, each other system's stage its own part's bands (II.7.6) and II.7.5's stage the undercity's plots there); every face outside the region, off a deleted stretch and off the ring keeps its ring, owner and nested faces. The frame never shrinks: a declining town keeps its frame and its hinterland.
II.6's island gate is one reader of the rung. A dossier outside the ladder — below 1 500, or above the 120 000 cap — is refused by the port (§7.7 item 15, item 81; §1.1; J-A81.01) and never reaches an epoch, so §3.2 (9)'s clamp of the frame's target at the cap serves only growth that carries no dossier.

**The dials' inputs over epochs (items 72, 78 and 79).** At each epoch, before S6 re-evaluates the drivers, a power's
applied standing (`PowerStanding.appliedStanding`, §7.7 item 2) moves to the epoch's standing, and a sector's applied share
to the epoch's share, only when they differ by more than `dial.hysteresis` (0.05, a dial-table row); both are folds over
the epochs' slices in log order, so a replay reproduces them and §4.5 (6)'s dials follow the dossier's powers and economy
without flickering at every small move.

**Uses across epochs (item 17) — the hooks now, the engine's step later.** A **use** — a shop, workshop, inn or
institution — is its own record (`Use`, §2.7), separate from the buildings that house it: a building references its
current use or none (vacant) and keeps `formerUses`, so a use can close in one building and open in another while the
building persists — vacant, re-let or converted. The base builds the hand path: the conversion kinds below, applied by a
`convert` event (§7.1) — `openUse` on a vacant plot or building (the building mutates to the designation by §4.7 S11's
operator), `closeUse` (the building stays, vacant — the first state of the decline hooks above — or converts to a named
designation), `relocateUse` (a `closeUse` here and an `openUse` there under one event, `detail.from` and `to` on the use's
lifecycle event, §2.8; `swapUse` is two relocations) and `mutate` (§4.7 S11) — each with its undo record (§7.4) and
reported to a host (§11.3). The staged engine's **use step** runs at each epoch after the roster's delta demand and before
siting, as the same events: (1) **re-score** — for every use, §4.7 S10b's solver scores its present plot and the best
alternative within its catchment (the district and its neighbours, `serviceRadiusM` of §10.2's `useRules`) against the
current field, distribution and supply graph; (2) **inertia** — a use moves only when the alternative beats the present
plot by more than the row's `inertia` and the row's `moveChance` draw falls (the `use.relocate` concern on the use's
`…/epoch=e` stream, §6.1), closes only when its catchment's demand (the households within its radius against the roster's
ratio) has been below `closeShare` for `closeAfterEpochs`, or a hard supply edge has had no provider in reach for
`starveAfterEpochs`; a dossier-backed use never closes by this rule (*Dossier content across epochs*, below); new demand (the roster's suffix) opens uses where the solver scores best — so markets and shops drift
toward where people live and inns toward the busiest gate, by distribution, never by a fixed order; (3) **cap** — at most
the churn cap's share of a district's uses relocates per epoch (the survivors' ladder's churn cap above carries one row
per kind — fabric transformation, use relocation; item 31); (4)
**assignments** — a host or owner assignment is a stable identity that moves with its use under the same rules unless
`pinned` (§7.7, item 20 (g)), in which case it stays and the town adapts around it; every change is reported; (5)
**traces** — a vacated building keeps its former use in `formerUses`, which a later opening prefers (a former inn reopens
as an inn first; a dossier element whose assignment returns to `active` reopens in its former building first, repaired by a
Works when the change is dated — item 80, §4.7) and the naming engine may read (§10.4); (6) **concealed uses** — a
concealed use (item 63) relocates by these rules like any use, and its front stays an ordinary business (§4.7's
*Concealed institutions*). Uses are visited in address order; one seed and one circumstance
timeline therefore give one history of openings, closings and moves; households and postings follow (§10.3).

**The epoch-spread mutation (item 18 (c)).** Across epochs a designation change is not applied at once: the engine issues
§4.7 S11's `MutationRecord` as a sequence of `mutate` events over the ladder's rung durations (item 31) — first occupy,
when the present design is compatible (every kept part, nothing added); then adapt; then extend (the adds); and rebuild
only the parts that cannot be adapted — the same steps and the same draws, spread in time, so a smith moving into a richer
street mutates toward the richer template over epochs. Each of those events decides and records its step at once, as a
host or user change does (§4.7 S11 step 6), and a Works shows it on the ground over the weeks it takes (*Works*, below;
J-A67.49), so the model never changes between events.

**Dossier content across epochs (item 20; J-A20.75, J-A20.43).** No step of an epoch closes a dossier-backed use (its
assignment's `existence: 'dossier'`, §7.7 item 2) or leaves one without a building; only a dossier event the epoch
applies at step (e) removes, adds or re-designates one (§7.7 item 2). The use step never closes one: where its catchment
or its supply fails, the use relocates to (1)'s best alternative by the solver's `dossier` request — its first closest
option where no plot passes the hard rows (J-A20.71) — or, where its catchment holds no candidate plot, stays in its
building; its moves by (2)'s inertia rule are any use's. Before any other step would empty or remove the building that
houses an unpinned one — a redevelopment's purchase, step (c)'s `vacate`, the decline lottery's strike, the growth
step's declared `demolish` or corridor re-cut, a carve, `wallToWay`'s clearance, `contractWall`, a terrain-and-water
repair, `fallIsland`, a tunnel's closing (II.7.3) or a passage's sealing — the use is first relocated the same way
inside the epoch, a `relocateUse` citing the epoch and counted outside the use cap, the request's scope its catchment
less the plots that step empties or removes, widened to the town where that scope holds no candidate plot; a pinned one
keeps its building, which the step treats as it treats any pinned entity (§7.2). So the dossier element is live and
placed at every step (§5.3's row). A dossier-listed ruin (`Assignment.state` `ruined`, §7.7, item 80) is present as its
ruin — its use closed, its building `ruined` — and no step repairs or clears it but a dossier event; a reopening returns
its use to its former building first (above).

The kinds these steps use join `ConversionOp`, defined above:

```ts
type UseConversionOp =
  | { op: 'openUse'; plot: Id; to: Designation /* §4.7 S11 */; building?: Id; assignment?: Id }
  | { op: 'closeUse'; use: Id; leave: 'vacant' | 'convert'; to?: Designation }
  | { op: 'relocateUse'; use: Id; to: Id /* the destination plot: a closeUse here and an openUse there under one event */ }
  | { op: 'mutate'; plot: Id; to: Designation; spread?: 'now' | 'epochs' /* §4.7 S11's operator; 'epochs' issues its steps over the ladder's durations */ };
```

**Decline and regrowth (owner, 2026-09-25: "growth, regression and growth where appropriate"; AM-8).** Regression is
growth read the other way: the population target falls, the roster's manifest shrinks by its suffix (§10.2), and the
fabric the suffix leaves behind steps down a ladder of states over epochs — never re-rolled, never removed by arithmetic
— until regrowth reoccupies it. The steps are scheduled by the owner's staged evolution engine (DEF-8, above); the base
carries now, stated here once: the ladders, the decline table with its exposure function, the salvage ledger, the lag
rule, the regrowth-first siting order — which binds the built `grow-by-stage` path today — and the conversion kinds, each
applicable by hand (§7.1) and undoable (§7.4). The states are §2.8's and the style classes that draw them §8.2's; §6.3
holds the identity rules, §13.2 the hook tests, §16 the price at M4.

* **The ladders** (§2.8's `Existence` value in brackets; every step is one conversion below, a lifecycle event with its
  cause). *Buildings:* occupied → vacant (`abandoned`: the use has left, the fabric stands) → derelict (`decayed`:
  roofless, `RoofSpec.kind 'none'`) → ruin (`ruined`: walls part-standing, the ruin program) → robbed or cleared
  (`cleared`: a footprint trace, its material in the ledger) → reused (`reused`: the trace, keeping its face, drawn as the
  garden, orchard or field it became — `Building.reusedAs`, §2.6 — or a successor building raised on the old
  foundations, which takes the trace's address, §6.3). Upward steps exist at every rung — reoccupy, repair, rebuild, reuse — and regrowth
  uses them first. *Walls and gates:* in use → neglected (`abandoned`) → breached or partly dismantled (`decayed`; the gap
  a `StretchRef`) → superseded by a shorter inner ring: `contractWall` traces and builds the new ring inside the old one
  through S5a's trace step and S7's operator, the old ring's record stays live with `Enceinte.supersededBy` naming the new
  one and its line persists as a trace — or becomes the ring road of the owner's original case by `wallToWay`. *Tunnels*
  (II.6's condition table), and the underground's galleries and chambers at the same persistence rate (II.7.5, II.7.6; item 65):
  in use → neglected, silted (`abandoned`) → partly caved in (`decayed`) → collapsed or sealed (`ruined`;
  `Tunnel.closure`), never demolished by the engine. *Islands* (II.6): floating → waning → settled → fallen. *Plots:* a
  plot whose last building is cleared or reused merges into a garden, orchard or field (`plotToGarden`) or into its
  occupied neighbour (`amalgamate`; §4.7 S10), so surviving households absorb the plots beside them and the plan coarsens
  where people are few — fewer, larger plots from loss, through the same merge operator as from wealth. Fields are their
  own layer: a struck farmstead's fields stay worked, their `LandUse.owner` passing to the nearest farmstead or to the
  commons.
* **The decline table** (`DeclineTable` in `@plat/tables`: an editable, versioned rule table with provenance, §7.6; our
  own rows, calibratable, §13.9). Its rows are tendencies — weights and chance, no fixed order (AM-23):

  | row | default | what it does |
  |---|---|---|
  | persistence rate per fabric layer | `use` 1.0 · `building` 0.6 · `plotBoundary` 0.3 · `street` 0.08 · `wall` 0.05 · `underground` 0.03 · `terrainWater` 0.005 | scales how readily a layer is struck: uses go first, then buildings, then plot boundaries; street and wall lines persist longest; the underground slower still (AM-11); terrain and water slowest (AM-25's conversions are the rarest events) |
  | exposure drivers | kernels over the context vector (§2.5) with weights, §4.5's construction: extramural (the district outside the outermost enceinte, as S10b reads it) +; `terrainClass` low, damp or flood +; downwind +; near the noxious kernels of field pass 2 +; the intramural periphery (`dist.wall` small inside the enceinte, `dist.centre` and `dist.market` large) +; low `prosperity` +; the resilient core (`dist.market` and `dist.plaza` small; the attractors at churches, the precinct and the castle) − | where decline strikes first, as weights |
  | chance share | 0.25 of the exposure field (the prosperity field's is 0.15) | causes vary and chance plays a part |
  | dwell bands (years; each drawn once as its step's `decay` Works duration, *Works* below) | vacant → derelict [10, 30]; derelict → ruin [20, 60]; ruin → cleared on salvage demand only; walls one band slower, tunnels two | the lag on the way down |
  | haul radius | 250 m | how far salvage travels |
  | exemptions | a locked or pinned entity is never struck; an assigned entity only through the use-relocation rule (AM-17); the building of a dossier-backed use only after that use is relocated (*Dossier content across epochs*) | the user's fixings hold |

* **The strike lottery** (the engine's step; the exposure function and the table are the base's). For an epoch whose
  target lies below the manifest, the suffix leaves in reverse ordinal order as the epoch's step (c) states — a `relet`
  down while households remain, `vacate` at a building's last household (J-A28.45); which
  standing fabric then steps down is drawn without replacement from a lottery over the candidates whose dwell band has
  run — for a building, whose `decay` Works has run its span (*Works*, below; J-A67.46) — weight `w = E(x) · rate(layer) · u`: `E(x) = clamp(Σ_j v_j · kernel_j(x) + ε_E(x), 0, 1)` the exposure field,
  computed per epoch on §4.5's 32 m cells from the current context vectors and prosperity field with its chance share;
  `rate` the layer's persistence row; `u` a draw from the `epoch.transform` stream keyed by the entity's lineage and the
  epoch (§6.1; no new concern); the draw bounded by the Survivors rule's churn cap per district and per epoch. An
  undefended suburb, a damp low quarter and the plot beside the tannery empty first as a tendency, the market core last,
  and a core house can still fall — a weighted tendency, not a law (J-A8.41).
* **Salvage — the material ledger.** `robStone`, `clear`, `dismantle` and `demolish` credit the town's `MaterialLedger`
  (§2.7) by the building's class-table yield (`salvageM3` per material, §10.2); `build`, `rebuild`, `reuse … build` and a
  repair (`reoccupy` from derelict) debit it by the new class's row from sources within the haul radius. The ledger is a
  flow record, never a hard constraint: a debit it cannot cover is built anyway and the shortfall is reported (J-A8.45).
  Its mark on the map: the lottery's weight for `robStone` and `clear` is multiplied by the salvage demand within the haul
  radius — the standing debits of planned building, repairs and a new stage's footprints — so cleared zones appear beside
  active building, and a ruin beyond any demand is left standing, the owner's "occasional old decrepit buildings or
  ruins".
* **Lag and memory.** Built extent follows population with a lag on the way down and none on the way up: a fall's
  households leave at once (step (c): a `relet` down, `vacate` at the last household) and the standing stock decays by the dwell bands over later epochs; a rise is met in the epoch it arrives by
  the regrowth-first order below, without a dwell (J-A8.47). Memory is the persistence order itself: plot lines, street
  lines, wall lines and traces outlast the buildings, so the old plan is there for regrowth to refill.
* **Regrowth-first — built now, on the one path.** In `grow-by-stage` (above) S2's delta demand is placed in this order,
  and only the residual grows a stage: (0) standing shells whose household count fell below what their occupants'
  band row houses relet up within §2.6's capacity (`relet`; J-A28.45); (1) vacant buildings reoccupied (`reoccupy`); (2) derelict ones repaired
  (`reoccupy`, a ledger debit); (3) ruins and cleared traces rebuilt or reused on their foundations (`rebuild`, `reuse …
  build`); (4) vacant plots of the old plan beyond the band's vacancy-run share (S10 (8) keeps the share; the design's own
  runs are never filled below it); (5) plots S10 cuts on the faces the old plan left unbuilt along its street lines inside
  the last boundary; (6) new faces of a new stage — where `Features.sewers` is on, the underground crowding hook first sends
  `crowdingShare` of the residual's poorest-band households underground (II.7.3 (c), II.7.4, §4.5 S7b (6)); S5a grows the boundary for the residual only, and an epoch whose
  residual is ≤ 0 grows no stage and adds no face. S7b allocates the delta first to (0)–(5) as each district's old-plan
  capacity and only the remainder to new faces; this replaces the rule that an epoch placed delta demand only on new or
  transformed plots (J-A8.44). **Test:** §13.2's T8-2 (M4).
* **The prosperity field under decline.** The drivers are re-evaluated per epoch (§4.5); under decline the market,
  harbour and main-street kernels shrink with their activity (§7.7's circumstance slice), and where plots merge the
  density field falls, so the field contracts toward the survivors' core and may concentrate there — the ladder's
  amalgamations are its footprint on the plan.
* **Islands and the underground over epochs** (their laws are II.6's). Each epoch re-reads the rung from its population
  target (§1.1; *The rung at an epoch*, above) and re-evaluates II.6's supply law: an island whose supported area shrinks past the hysteresis is resized
  (its rim's plots cleared with lifecycle events, cause `convert:resizeIsland`); one whose supply falls to zero — or whose
  settlement has left the CITY band (AM-13) — wanes, settles after its dwell band and falls: `fallIsland` archives its
  arena and lays a `ruin` decoration face (§2.7) over its projected outline on the ground through the carve path's
  clear-region protocol above, every entity under it demolished with that cause; regrowth re-floats a settled island
  before it raises a new one (J-A10.42). A tunnel silts, caves in and is sealed by the same lottery at the underground's
  rate, is never demolished by the engine (J-A11.41), and is reopened before a new one is dug.
* **Identity and determinism.** A vacant, derelict, ruined, cleared or reused building is a live record with its address
  and lineage (§6.3); it becomes a tombstone only by `demolish` or when a `reuse … build` successor takes its address
  (`supersede`, §2.8) (J-A8.42). Every draw above comes from `epoch.transform` or, for islands, `island.place`, keyed by
  lineage and epoch, so the same seed under the same circumstance timeline gives the same history of decline and regrowth
  and a different timeline a different one (§6.2, §7.7).
* **Emulation note.** Neither reference has time: with no epoch the static baseline is unchanged byte for byte (§13.3's
  goldens), and every rate above is a table value (AM-23).

The kinds this adds to `ConversionOp` — one list with the union above, which reads `… | DeclineOp`; §7.1's `convert` event
carries them all:

```ts
type DeclineOp =
  | { op: 'vacate' | 'reoccupy'; building: Id }                                          // occupied ⇄ vacant; reoccupy from derelict is a repair: roof restored, ledger debited
  | { op: 'reuse'; building: Id; as: 'garden'|'orchard'|'field' | { build: BuildingClass } } // a ruin or trace reused: the trace drawn as that kind (Building.reusedAs, §2.6), or a successor on the old foundations (Building.predecessor, §2.6)
  | { op: 'neglect' | 'breach' | 'dismantle'; enceinte: Id; stretch?: StretchRef }        // walls and gates; the old line persists as a trace; contractWall and wallToWay above supersede a ring
  | { op: 'silt' | 'caveIn' | 'seal' | 'reopen' | 'flood'; element: Id /* a tunnel, gallery or chamber (II.6's condition table); flood only on a gallery or chamber whose floor lies below the water table */; stretch?: StretchRef }   // the underground's ladder (II.6; J-A65.48); a `stretch` splits the record first; no engine plan contains demolish on a tunnel
  | { op: 'resizeIsland'; island: Id; areaHa: number; elevationCm: Cm }                    // the supply law's response: the outline re-drawn by §4.2's routine from the island's own stream; rim plots cleared, or new rim faces grown by the grow path on the island's arena
  | { op: 'settleIsland' | 'fallIsland' | 'refloatIsland'; island: Id }                    // waning → settled (elevation at the floor of its band, districts declined) → fallen (arena archived, a ruin face on the ground); a settled island re-floats first
  | { op: 'raiseIsland'; allocation: Id };                                                 // regrowth: a new island for a sky allocation the count law opened at this epoch, placed by SkyStrategy (II.6)
```

**Terrain and water change slowly (item 25; the engine is owner-staged, the kinds and the hand path are the base's).**
Reclamation, silting and river-course shifts are conversions on the one list — kinds `ConversionOp`'s union admits, the
slowest layer of the persistence order, never immutable — applied by hand in the base through §7.1's `convert` event and, in the staged engine, drawn at
the decline table's `terrainWater` rate by their own trigger rows (below). Each is a typed operation whose repair is an
operator the base already has (J-A25.41):

```ts
type TerrainWaterOp =
  | { op: 'reclaim'; kind: 'marsh'|'foreshore'; region: Polygon /* marsh: LandUse faces of kind 'marsh' or a damp or flood band re-typed as land; foreshore: a shallow water margin filled */ }
  | { op: 'siltReach'; water: Id; stretch?: StretchRef /* a reach or a basin: its width and depth profiles fall by the row's share; a basin below the harbour's draught loses its harbour use */ }
  | { op: 'shiftCourse'; water: Id; from: number; to: number /* control-knot ordinals (§2.3): the reach between them re-traced — a meander cut-off or an avulsion */ }
  | { op: 'digCanal'; polygon: Polygon /* the carve above, kind 'canal' */ };
```

* **Repair.** `reclaim` runs S1's terrain operator (§7.3 (a)) — the region's ground raised to the flood line plus the row's
  margin (`reclaim.raiseCm` 60), drained by a ditch water body and its `LandUse` faces re-typed with `reclaimed` set,
  as §2.3 states — and, for a foreshore, S1's water operator (§7.3 (b)) with the filled margin
  as the new shore; `siltReach` and `shiftCourse` are S1's water operator on the changed reach (the width and depth profiles,
  the shores as their buffer, the crossings re-sited, the kept ways re-routed, F-RIVER's re-trace confined to the reach,
  §7.3 (b) 1–2), so their footprint, fates and locality are the carve's and byte identity holds outside it; `digCanal` is
  `carve`. Every touched entity's lifecycle records the cause (`convert:reclaim` …); the record changes each kind makes
  are §2.3's.
* **Trigger rows (the engine's step; the rows are the decline table's `terrainWater` rows, §7.6).** Candidates and their
  chance per year — applied over the epoch's span as `1 − (1 − p)^years` (*The clock*, below; J-A76.45) — each × the layer's persistence rate (0.005) and drawn from `epoch.transform` keyed by the water body's
  or face's lineage and the epoch (§6.1; no new concern, J-A25.42): `siltReach` — a reach whose accumulation has fallen, or a
  basin whose harbour use has closed (the use step), 0.02 per year; `reclaim` — a marsh or foreshore face beside built
  land whose band's plot demand is short (S5d's shortfall record) and whose district's band is `modest` or above, 0.03
  per year — reclamation is bought by prosperity and pressed by demand; `shiftCourse` — a reach whose sinuosity exceeds
  `river.cutoffSinuosity` (1.8), or whose flood cells beside it exceed the row's share, 0.01 per year; `digCanal` only by
  demand (a `canal` row of the roster's institutions, a dossier element or a user's edit). Each fires at most once per body
  per epoch; AM-23's tendency wording holds — rates, not laws. Emulation note: neither reference has time, and both
  already let a user reshape water — MFCG's warp and FTG's water drawing — which the base keeps as §7.1's edits; nothing
  here runs without an epoch.

**Hidden plots over epochs (item 30 (e); the base carries the kinds).** A passage can be **sealed** — `sealPassage` sets
`Passage.sealed` (§2.5), so the access edges on its face read as sealed; every plot whose only reach passes it takes exposure `sealed` (§4.6), and
its buildings enter the decline ladder as vacant (`vacate`, cause `convert:sealPassage`) — and later **reopened**
(`openPassage`: the exposure returns to `hidden` and the buildings reoccupy by the regrowth-first order); both are hand
edits in the base and the engine's kinds later. Hidden plots **arise** by densification — the ladder's `densify …
back_court` (rung 2) cuts a plot's yard into rear plots reached by a new passage where §4.6's reach weights allow one,
through S10's incremental re-cut with the neighbours fixed (§4.7 S10 (7)) — and **vanish** by `thin … back_court` (the
rear plots cleared after their uses relocate, their households are re-homed and their buildings vacated, the passage
sealed and, on a rising band's re-cut, removed with the rear
row, `amalgamate` returning the land to the front plot's garden: item 31). The sealing kinds are the last kinds of this section the union admits
(`… | TerrainWaterOp | HiddenOp`):

```ts
type HiddenOp = { op: 'sealPassage' | 'openPassage'; passage: Id /* the L3 passage face (§2.5) */ };
```

**Works — every physical change on the ground as a timed project on the weekly clock (item 67; owner: "when a building
gets torn down, ruined, being built, being expanded, Lots need to merge or separate … we should show stages of it being
built. What do you think those stages should be?").**
1. **Decided at once, shown over weeks (J-A67.41).** Every physical change — a build, an extension, a demolition, a
   repair, a conversion, a decay step, a clearance — is decided and recorded by the event that makes it, as it is today
   (the designation mutator's record, a conversion, a ladder or decline op; §4.7 S11 step 6, J-A67.49), so the log alone still
   determines the model. When that event carries a week — an epoch, a dated dossier change (§7.7 item 1), a hand edit
   scheduled by `startWorks` (§7.1) — and the preset's `works.enabled` holds, the event also creates a **`Works`** record
   (§2.7): its kind, its target (a building, whose added or subtracted wings and storeys are the parts of the `MutationRecord` its `cause.mutation` names; or the plots of a join or a split — §2.7's `Works.target`), its start week, its duration in working weeks, the `WorksTable` row read, the event and mutation it shows, and
   what the ground held before that the model no longer holds (the removed parts' rings with their heights and roof kinds;
   the removed plot lines with their treatments). The drawn state at any week is DERIVED — computed from the record, never stored per
   week (2). An event with no week, a hand edit not scheduled, generation (the creation week shows a finished town;
   J-A67.47) and the parity presets create no Works, and the change is drawn finished. So a user's `build`, `demolish` or
   `convert` stays instant unless scheduled; an engine's `demolish` makes its tombstone at once while its Works draws the
   demolition from the kept shell; aborting a change is its undo (§7.4), which removes its Works; `cancelWorks` (§7.1) ends a
   running Works at once — the change it shows stands, drawn finished — and a `setAttr` on a Works moves its start or its
   duration.
2. **The stage at a week.** `stageAt(works, w)`: `e` = the working weeks in [start, w) — the weeks the calendar row does
   not pause for the Works' material in the town's climate (`WorksTable.pauses`: masonry, stone and brick, pauses in winter
   in temperate and cold climates; our own rows) — and `f = min(1, e ÷ duration)`; the stage is the kind's latest
   scheduled stage whose start fraction is ≤ `f`, `before` for w before the start and `finished` at `f` = 1. Weeks are integers,
   so a stage shorter than a week is never drawn (a tick shows the stage it lands in); a tent's zero-week duration applies
   finished in its week. At most one Works runs on a target: a new change on it ends the running one at the stage reached,
   which the new one takes as its `before` (a repair begun on a decaying house runs back from DECAYING).
3. **Durations (item 67 (b); J-A67.43).** `WorksTable` rows keyed by kind × class (or the designation template's `works`
   key, §10.2) × size (storeys, footprint) × material give a range of working weeks; the duration is drawn once, uniform in
   the range, × the labour factor of the plot's band (richer, faster; a row), on the `works` concern (its key is §6.1's;
   J-A67.61; J-A67.42). Defaults (our own, calibratable, §13.9): a hovel or shed 1–2 weeks; a small timber
   house 2–6 (the owner's "two weeks or a month"); a town house 8–17; a stone house 17–52; a manor 52–156; a church 520 or
   more; a cathedral built part by part — choir, transept, nave, towers, each its own Works in its programme's order, the
   choir in use under a temporary roof while the nave rises; a demolition a quarter of its build's range; a clearance 1–4;
   a `decay` Works the decline table's dwell band for its step (below), × 0.6 for timber and thatch. Material enters as a
   duration row only — time, never shape (the owner's materials rule, §2.6; J-A31.42 stands for replaceability).
4. **The stages — the answer to the owner's question (item 67 (c)–(f)).** Start fractions are per class row; what each
   stage draws is §8.2's `states` rows:

   | kind | stages (default start fractions) |
   |---|---|
   | build — and each wing or storey an extension or an adaptation adds | STAKED 0 (a dashed footprint, a material pile) · GROUND BROKEN 0.05 (bare earth, a spoil heap, a cellar pit) · FOUNDATIONS 0.15 (low walls or a sill frame) · WALLS RISING 0.25 (the walls up storey by storey, no roof, the interior open, a scaffold ring) · ROOF FRAMED 0.75 (rafters, no covering) · ROOFED 0.85 (covered, the scaffold still up, a work yard) · FINISHED 1 (the scaffold gone, the yard laid out) |
   | extension | the kept building in use throughout; the added wing through the build stages; at ROOF FRAMED the old roof opened where the two join; at FINISHED the joint wall opened and the wings united (item 18's add step, shown over time) |
   | demolition | EMPTIED 0 (doors and windows out) · STRIPPED 0.2 (the covering salvaged, rafters bare) · ROOFLESS SHELL 0.4 (rubble inside) · RUBBLE 0.7 (wall stubs, heaps, salvage piles) · CLEARED 1 |
   | decay — §2.8's ruin ladder on the way down (5) | toward `decayed`: ABANDONED 0 (shut up, the yard overgrowing, the roof whole) · DECAYING 0.5 (a holed roof, a sagging ridge); then `decayed` is ROOFLESS (weeds and saplings inside), `ruined` COLLAPSED (walls fallen in places, the stone gone to the salvage ledger), `cleared` or `reused` OVERGROWN (a grassy mound and a foundation line, until cleared or built over) |
   | repair | the decay stages backwards under a scaffold, to the building's former state |
   | fire | an instant destructive event (rung 3's trigger): the building `decayed` in its week and drawn CHARRED — a blackened roofless shell — until a clearance or a repair starts |
   | conversion with no geometry step | REFIT 0 (a scaffold on the frontage) · FINISHED 1 |

   The ruin stages are the existing ladder's drawn stages (J-A8.46 stands; no new `Existence` value): the target keeps its
   ladder state from the event on and carries its running Works by a link (`Building.works`, §2.6).
5. **The decay Works carries the dwell band (J-A67.46).** A `vacate` (the building `abandoned`) starts a `decay` Works toward
   `decayed` whose duration is its dwell band drawn once (the decline table, above); the lottery's `decay` candidates are
   the buildings whose `decay` Works has run its span, and the strike's `decay` event (the building `decayed`) starts the
   next toward `ruined` the same way; a `reoccupy` ends it and starts a `repair`. A building left `abandoned` or `decayed`
   by an undated event (a hand edit) gets its decay Works from the next epoch, starting at that epoch's week.
6. **Mutation steps (J-A67.49).** A Works shows its event's `MutationRecord` (§4.7 S11) in the record's order — subtracted
   parts by the demolition stages first, then adapted parts (an added storey's walls rising, an extended wing's build
   stages), then added parts by the build stages — each part's span a share of the duration by its footprint area; kept
   parts stand as they are. A `rebuild` is a demolition then a build, one Works; the epoch-spread mutation's events (above)
   each start their own.
7. **Plots in transition (item 67 (g); J-A67.44).** A join or a split is decided when its event lands — the plot rings
   change then (ownership) — and the ground follows the work: each removed boundary line is drawn from the Works' kept
   lines, dashed as pending removal, until the joined plot's build reaches GROUND BROKEN (or a demolition reaches
   RUBBLE), and a new dividing line is drawn as stakes, dashed, from STAKED and as its fence or wall from WALLS RISING.
   Item 31's `subdivide` and `amalgamate` run through the same stages. Access is the event's, so a Works never leaves a
   plot without access.
8. **What reads the stage.** Heights at a stage are derived, `heightsAt(works, w)`: WALLS RISING raises the eave storey by
   storey (the eave × the storeys reached ÷ the floors), no roof before ROOF FRAMED (drawn as a `framed` roof), the finished
   roof from ROOFED, a demolition lowering them in reverse; the stored heights stay the finished building's, so the shadows
   of §8.4 and §11.1's 3-D export follow the stage. The households an event placed are housed at a week only from
   FINISHED, and a demolition's have left before EMPTIED (item 17's relocation, J-A17.41): the module's occupancy, the lit
   windows (§10.3) and the light sources (§4.7, §8.4) read that. The plan rung of a building in progress draws walls
   without doors or furniture, and of a ruin its fallen walls and open rooms (§2.6); the stage counts among the plan rung's
   recorded inputs, so a stage change marks a derived plan stale and §8.5's change marker shows it (item 67 (j)).
   Descriptions say "being built", "being demolished", "ruined since …" (§10.4); the city band draws the stage glyph on the
   footprint, the neighbourhood band the walls, scaffolds, frames and rubble (§8.5, §8.2).
9. **Which week is drawn (J-A67.45).** Every drawing, export and reader draws the document's current week (*The clock*,
   above) unless the per-viewer view key `week` (§2.9) names another — a host setting its campaign week, or a user
   scrubbing — outside every digest. Scrubbing draws every live Works, and every Works finished within `works.retainWeeks`
   (52), at that week over the current model, forward and back, byte for byte; the full history at an earlier week is the
   log's replay (§7.4). An epoch retires the Works that finished more than `works.retainWeeks` before its week: the record
   leaves the model and its target's lifecycle event keeps the weeks.
10. **Restraint (item 67 (i); J-A67.48).** An epoch's Works start at weeks spread uniformly over its span (the weeks since
   the previous epoch; the offset is the `works` concern's draw before the duration's, §6.1), so the share of stock under works at the epoch's week
   follows the growth or decline rate by construction — a steady town shows a few scaffolds, a boom town many, a declining
   one ruins. A `ConditionOverlay` (§2.7; staged, empty in the base; item 88) scales the share of an epoch's changes it
   starts as Works once the port fills it (a siege stops building). With no epoch and no scheduled edit nothing here runs,
   and the static baseline is byte-identical (item 23: neither reference has time).

```ts
type WorksStage = 'before'|'staked'|'groundBroken'|'foundations'|'wallsRising'|'roofFramed'|'roofed'|'finished'
  | 'emptied'|'stripped'|'rooflessShell'|'rubble'|'cleared' | 'abandoned'|'decaying'|'roofless'|'collapsed'|'overgrown' | 'charred'|'refit';
interface WorksRow { key: string /* a class id, or a designation template's `works` key (§10.2) */; kind: 'build'|'extend'|'demolish'|'repair'|'convert'|'decay'|'clear';
  storeys?: [number, number]; footprintM2?: [number, number]; material?: string /* a duration row only (item 67 (b)); never a shape input */;
  weeks?: [number, number] /* working weeks, drawn once; absent on a decay row, whose span is the decline table's dwell band × 52 */; factor?: number /* a decay row's material factor: timber and thatch 0.6 */;
  stages: { stage: WorksStage; from: number /* a fraction of the duration */ }[] }
interface WorksTable { rows: WorksRow[]; labour: { band: string; factor: number }[] /* the duration × the factor of the plot's band */;
  pauses: { material: string; climate: string; seasons: ('spring'|'summer'|'autumn'|'winter')[] }[]; retainWeeks: number /* 52 */; enabled: boolean /* false in the parity presets */ }
```

`WorksTable` lives in `@plat/tables` (`works.json`, §14), editable with provenance (§7.6); its decay rows read the decline
table's dwell bands, never a second number.

**Markets over epochs (item 24).** A secondary market the roster's suffix adds is claimed by the epoch's S7b in the new
stage or in a due district by §4.5 S7b (3)'s rule; a market whose institution closes (the use step) keeps its square — a
plaza or a `market_green` — until a `clear` or a claim reuses it, so no market moves by wealth change alone.

**Informal clusters over epochs (item 70 (e); J-A70.48).** On the weekly clock a cluster grows by accretion: delta
households of its band placed on an informal plot add structures by §4.7's packing on the plot's free path sites, each a
`build` Works of days (a shack) or less than a week (a tent, finished in its week); rung 1's `densify … infill` on an
informal plot adds structures in that way too. A destructive circumstance event (rung 3's trigger) burns a cluster fast — its
structures `decayed` and drawn CHARRED in one week, then cleared. When its district's band rises past the hysteresis a
cluster is cleared or **formalised** by rung 3 in the due epoch (the replaceability of tents and shacks is `immediate`,
§10.2): its households re-homed by item 17's relocation or re-let, the plot cleared, re-cut by S10 (7) into row-house
plots and built by S11 at the new band. In decline, a vacant, cleared or ruined plot of a district whose value fell past
the hysteresis at the epoch takes tenure `informal` (§4.7) and may take a cluster. Each step is an event of this section's
kinds; the engine that schedules them is the staged one.

**Lights, deposits and conditions over epochs (items 68 and 88).** A light follows its host (§4.7's *Light sources*), and
an epoch re-runs the light rows on its new and changed faces only. A `DepositSite` (§2.7; staged, empty in the base) whose
state changes converts the land use it anchors: `depleted` or `removed` — its quarry, mine or claypit `abandoned` and
drawn worked out (a deposit depleted at creation drawn so from the start); `discovered` — a new outside site sited by
S12a's rows at that epoch. A `ConditionOverlay` is read as *Works* (10) states.
=== REPLACE ### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values) ===
### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)

```ts
interface RosterTables { classes: BuildingClassRow[]; districtKinds: DistrictKindRow[] /* the relation templates of the neighbourhood kinds (item 16 (a)) */;
  resources: ResourceRow[] /* {id, kind: 'site'|'made'|'import'} — the resource ids the supply edges name (grain, malt, hides, import …), our own rows */;
  institutions: InstitutionRow[]; government: GovernmentRow[] /* offices and seat classes per government kind */; religions: ReligionRow[];
  households: HouseholdRow[] /* size distributions by class */; professions: ProfessionRow[]; farm: FarmTable /* §4.9 */;
  roomProgram: RoomProgramRow[] /* item 28: the room programmes, below */; basementGate: BasementGateRow /* item 29 (b): the basement's terrain-gate values, one row, below */;
  covers: CoverRow[] /* item 63: the fronts a concealed class may take, below */;
  classMix: ClassMixRow[] /* item 71: the class mix inside a band, with its prestige rows */; clusters: ClusterRow[]; tenure: TenureRow[] /* item 70: the informal cluster's rows and the tenure defaults by band */;
  quarterIdentities: QuarterIdentityRow[]; powerLinks: PowerLinkRow[]; sectorLinks: SectorLinkRow[]; bandRanges: BandRangeRow[] /* item 72: a neighbourhood's identities, dials and band range */;
  sectors: SectorRow[] /* item 78: the sector set the economy slice is keyed by (§7.7 item 2) */; portRows: PortRows /* item 88: the staged rows the dossier port will fill — schema-complete, empty, extension */;
  names: NamePack; provenance: Provenance }   // the row types of items 70–72, 78, 79, 82 and 88 are declared, with their default rows, in the paragraphs that close this subsection
interface BuildingClassRow { id: string; use: string; perCapita: [number, number]; perOther?: { class: string; ratio: number }; min: number; max: number; firstAtPopulation: number;
  requires: ('water'|'coast'|'route'|'farmland'|'ore'|'stone'|'timber'|'fish'|'clay')[] /* the site-resource gates S2 reads from SiteResources (§4.2) */;
  outside: boolean; liveIn: boolean; cluster?: string; noxious: boolean; lifestyleBand: string; shopProb: number; priority: number;
  relations: RelationRule[] /* the class's relation template (item 16 (a)) */; produces: string[] /* resource ids */; supply: SupplyEdge[] /* its supply chain (item 16 (b)) */;
  template: DesignationTemplateRow[] /* one row per band: the designation template S11 reads (item 19; §4.7) */; useRules: UseRuleRow /* catchment, inertia and closing rows (item 17; §4.11) */;
  secondaryChance?: number /* market rows: the TOWN chance of a secondary market (§4.2 S2) */; salvageM3: Record<string, number> /* item 8: the material yield and debit §4.11's ledger reads (below) */;
  drain: 'none'|'pit'|'channel'; underground: 'never'|'allowed'|'preferred'; undercity: 'never'|'allowed'|'preferred' /* item 65 */;
  undergroundAccess: { prob: Record<string, number> /* item 64: per band row, interpolated along the value — the chance that a basement within reach of an underground element holds an access (II.7.3) */ } /* II.7's columns (below) */;
  concealment?: ConcealmentRow[] /* item 63: the default-mode weights of a class our tables mark clandestine; absent: never concealed unless the dossier or an assignment says so (below) */;
  distribution: 'district-defining'|'dispersed'|'singular'; significance: number; powers: { kind: string; weight: number }[]; sectors: { sector: string; weight: number }[] /* items 72, 78 and 79: how the class spreads over the town, its weight in a neighbourhood's reading, its association with the power kinds and the sectors (weights summing to 1 per column) — read by §4.5's neighbourhood character (below) */;
  subLocations: SubLocationRow[]; openingHours: OpeningRow[]; tags: string[] }
interface RelationRule {   // one row of a class's or a neighbourhood kind's relation template; read by the placement solver (§4.7 S10a, S10b) and, for district kinds, by §4.5's typing scorer
  kind: 'adjacent'|'near'|'far'|'sameStreet'|'clustered'|'avoid'                                  // to another class, cluster tag or feature class
      | 'upwind'|'downwind'|'upstream'|'downstream'|'nearWater'|'highGround'|'lowGround'|'dry'   // environmental: ContextVector.upwind, upstream, terrainClass, dist.water (§2.5)
      | 'frontage'|'nearGate'|'nearMarket'|'nearHarbour'|'nearCentre'|'extramural'|'intramural'  // access: roadClass, dist.* (the nearest of N markets, item 24)
      | 'plotArea'|'plotShape'|'frontageM'                                                        // capacity: areaM2, shape, frontageM, against the template's size budget
      | 'band'|'exposure';                                                                        // the prosperity band; Plot.exposure and knownTo (item 30)
  to?: string; withinM?: number; beyondM?: number; min?: number; max?: number; values?: string[]; falloff?: 'step'|'linear'|'smoothstep';
  strength: 'hard'|'soft'; weight: number /* soft rows: the score at full satisfaction; hard rows: 0 */; extension: boolean /* true: a row the references lack, scaled by placement.extensionWeight (§4.7 S10b) */ }
interface SupplyEdge { resource: string; maxDistanceM: number; mode: 'street'|'river'|'sea'|'road'; strength: 'hard'|'soft'; weight: number;
  perConsumers: number /* S2's need propagation: one provider per this many consumers (§4.2 S2) */; substitutes?: string[] }
interface DesignationTemplateRow {   // one per band of §4.5's band set; continuous columns interpolate along the prosperity value, discrete ones switch at the cut (§4.7 S11)
  band: string; specialisation?: string /* discrete: the designation's variant in this band; drives the use's specialisation, its description and its room programme (item 28) */;
  plotAreaM2: [number, number] /* the size budget a join is asked for (§4.7 S10 (7)) */; footprintM2: [number, number, number] /* p10, p50, p90 */; floors: [number, number]; heights: string /* the class heights row */;
  structures: { role: string; count: [number, number]; footprintShare: number; required: boolean; houses: boolean /* item 28 (f): a residential slot — its building houses households by §4.7's generation fill; a live-in class's (BuildingClassRow.liveIn) main slot is one whatever this cell holds (its flag read as true), unless §4.7's fill finds it no household (BuildingSlot.unhoused, §2.5) — its building houses the live-in household, Building.dwelling (§4.7 S10b) — so the two columns never disagree */ }[] /* the slot list: main building, workshop, forge, yard, court, stables, store, dwelling, journeymen's rooms … data-defined roles */;
  arrangement: 'row'|'compound'|'detached'|'hovel'|'tents'|'cluster' /* item 70: an informal cluster's many structures on one plot (§4.7 S11) */|'institution'; coverage: number; densityShift: number;
  jitter: { maxM: number; minM: number } /* m — item 43: the front-line recession's cap and floor (§4.7 S11's law); maxM interpolated along the value; minM's declared range ≥ attractCm + 1 cm; defaults maxM 0.4 / 0.7 / 1.0 / 1.5 m by band and minM 0.3 m, each an option extension over MFCG (the MFCG preset's values are §7.6's); maxM 0 in the institution, tents and cluster rows, unmarked */; separation: 'party_wall'|'slot'|'passage';
  frontage: 'none'|'lean_to'|'stall'|'shopfront'|'arcade'|'gate'|'wall' /* discrete: the main slot's frontage treatment; the entrance set is §2.6's */;
  yard: { part: string; share: number }[] /* court, garden, formal_garden, forecourt, orchard, midden, pen … (§2.5 YardPart) */; bounds: 'none'|'fence'|'hedge'|'wall'|'railing' /* the compound rows' 'wall' (prosperous, rich) is an extension (option) the parity presets set to 'fence' (item 44; §4.7 S11) */;
  programme: string /* item 28: the key of a RoomProgramRow (below), which the plan rung of §2.6 reads */; underSize: 'compact'|'refuse' /* what the mutator does when the plot cannot be joined to the size budget (§4.7 S11) */;
  replaceability: 'immediate'|'short'|'long'|'ruin_only' /* item 31: read at the plot's builtBand row — how soon §4.11's wealth ladder may replace the stock */;
  works?: string /* item 67: the key of the WorksTable row (§4.11) whose stages and durations this designation's builds, demolitions, repairs and decays read; absent: the class's default row */;
  households: { built: number; max: number } /* item 31: the households the design is built for, and the most it holds when let out (rung 1's relet) */;
  entrances: { side: number; rear: number; service: number; capSide: number; capRear: number; yardDoorMinM2: number } /* item 29: the probability of a side, rear or service door given an access edge beyond the frontage, their caps, and the yard or court area that recommends a yard door — §2.6's entrance rules read them */;
  cellar: { prob: number; kinds: { full: number; half: number; walkout: number }; slopeCm: Cm; rockCost: number; depthCm: Cm /* default 220: a full cellar's floor below the ground storey's baseCm */; insetCm: Cm /* default 60: the basement ring's inset inside the ground-storey wings */ } /* item 29 (b): the base probability §2.6's basement decision starts from, the kind weights, the fall under the footprint past which the decision turns to a half or walk-out cellar, the rock cost that lowers the probability, and the cellar's depth and inset; the terrain gate is §2.6's, its values the basementGate row below */; }
interface UseRuleRow { serviceRadiusM: number; closeShare: number; closeAfterEpochs: number; starveAfterEpochs: number; inertia: number; moveChance: number }   // §4.11's use step (item 17)
interface DistrictKindRow { kind: string; relations: RelationRule[] /* read by §4.5's typing scorer and S7b's affinity rows, and by the solver for a whole-neighbourhood assignment (§7.7) */ }
interface ConcealmentRow {   // item 63: one row of a clandestine class's default-mode weights (§4.7's Concealed institutions); our own rows, extension
  band?: string /* absent: every band; rows interpolate along the value like every band row (§4.5) */; districtKind?: string /* absent: every kind */;
  weights: { none: number; front: number; hidden: number; underground: number } /* the mode draw's weights; the non-none weights are extension, scaled by placement.extensionWeight (0 in the parity presets) */;
  hiddenWithFront: number /* the share of hidden and undercity placements that also take a front, drawn on siting */;
  accessMultiplier: number /* item 64: × the access probability of a surface building that carries this concealed use (II.7.3's Basement accesses); default 6 */ }
interface CoverRow {   // item 63: the plausible fronts of one concealed class; our own rows, extension
  trueCls: string /* the concealed class (BuildingClassRow.id) */; band?: string /* absent: every band */;
  covers: { cls: string /* a front class whose designation template has a row at the band */; weight: number }[] /* weighted, several per class: a front "can be anything" plausible */ }
```

**The sequential roster (FTG-14; J-P20).** FTG's documented *shape* (`ftg-docs-params.md` §3.3), none of its 209 types, 80
nodes, 299 professions or 323 items. A **virtual population** advances on a fixed grid of Δ = 10 people up to the rung's
maximum. At each grid point the target count of every class is a monotone step function of the virtual population —
`perCapita` or `perOther` ratios converted to per-person ratios, core versus shop pools, lifestyle-banded pools with rare
outliers (weights ours), hard `min` / `max`, **size gates** (`firstAtPopulation`), **resource gates** read from
`SiteResources` (no farmland → no farms, shops instead) — and every class below its target receives its next building, in
class-priority then class-id order. Every draw is keyed by the building's ordinal (`roster/<class>/<ordinal>`: shop or
core, lifestyle outlier), so the n-th chandler is the same chandler at any population. The run records each building's
**appearance population**; the manifest for population P is every (class, ordinal) that appeared at or below P. Hence
manifest(P₂) ⊇ manifest(P₁) whenever P₂ > P₁ (property test on 1 000 seeds, §13.2), an epoch's delta demand is exactly the
suffix, a population fall selects the suffix in reverse order, negative deltas arise only from declared circumstance
events, and §7.8's population control is monotone by construction. **Mode (COV-FTG-B06):** `rosterMode:
'minimiseUnemployment'` (default: at each grid point, when the unemployed share of the virtual population exceeds a table
threshold, the workplace class with the largest weighted job deficit receives one extra building) or `'matchRatios'` (the
configured ratios only, FTG's alternative); both are grid-sequential, so both are prefix-stable.

**Output:** demand per class with area / frontage requirement classes, district affinities, cluster tags, live-in flags,
outside flags and wealth bands; the **town-level character** shifts the ratios — read from the economy slice's sector
shares (`circumstances.economy`, §7.7 item 2) through each class's `sectors` weights, so one input drives both the roster
and the neighbourhoods' economy dial (items 72 and 78; an even mix, the neutral default, shifts nothing). **Government (COV-FTG-B13):** the blueprint's `government` circumstance selects a `GovernmentRow` whose
offices force seats — a crown seat a royal castle or palace, a seigneurial lordship a lord's castle or keep, an
ecclesiastical lordship a bishop's palace beside the cathedral, a chartered commune a town hall and guild halls, a merchant
oligarchy a merchants' hall — plus a military share (guard posts per 1 000 inhabitants; barracks at CITY and above near the
castle or the gates); the castle toggle `auto` reads it. **Religion (COV-FTG-B14):** religions come from `ReligionRow`s with
worshipper shares (shifted by the town-level character), a practice share and clergy per 1 000; temples per religion are
proportional to its practising worshippers; each religion has a faction (§2.7). S7b then allocates the demand and S10b
places it (§4.5, §4.7); where capacity is short, placement's reconcile and F-SITING's ladder decide, and surplus capacity is
typed as yards, greens or vacant plots (§4.7 S10b); population is honoured within tolerance and reported (O7 a, e).

**Relation templates, supply edges, designation templates and use rules (items 16, 17 and 19; rows are data, §7.6,
re-signed by the corpus phase, §13.9).** A class's `relations` are the rows the placement solver filters and scores by
(§4.7 S10a, S10b); its `produces` and `supply` are the resource and dependency graph S2's need propagation walks (§4.2 S2)
and the solver measures distance on; a neighbourhood kind's rows serve §4.5's typing scorer and a whole-neighbourhood
assignment (§7.7). Default rows are the references' placement rules where a reference has one and soft tendencies where it
has none (item 23; `extension: true`, scaled by §4.7 S10b's `placement.extensionWeight`) — for instance a tannery
`downstream` hard, `nearWater` hard and `extramural` soft, with supply `hides` 800 m by street and `bark` 2 000 m by road;
a brewery with supply `malt` 1 000 m by street (hard) and `nearWater` soft; a maltings with supply `grain` 3 000 m by
road; a bakery with supply `flour` 600 m by street; a warehouse `nearHarbour` 150 m hard with supply `import` by sea; an
inn `frontage` primary or through hard and `nearGate` 150 m soft; a market hall `nearMarket` 60 m hard; a trade group's
shops `sameStreet` and `clustered` soft; a mill `nearWater` hard with a fall (its outside row, §4.9). The `template` rows
are S11's (§4.7); the `useRules` are §4.11's use step's; the `produces` of the outside classes — grain, timber, fuel,
stone, ore, fish — are the hinterland's food, fuel and timber rows (§4.9, item 26). No row of this table names a
material: a material is a rendering attribute (§2.6), and §4.11's `WorksTable` alone reads it, for durations — time,
never shape (item 67).

**Markets, wealth bands and the countryside's rows (items 24, 26 and 27).** The `market` class row demands the markets by
size — `min` 1 (the principal), `firstAtPopulation` 10 000 and `perCapita` one per 12 000 inhabitants for the secondaries,
`secondaryChance` 0.15 at TOWN (our own rows; §4.2 S2; §13.5's anchors are MFCG's secondary plazas and FTG's two market
squares) — and the market hall's and the market trades' rows cite the market they serve by rank (`nearMarket`, the
principal by default). `HouseholdRow.band` and every class row's `lifestyleBand` name a band of §4.5's band set; the
household shares' default weights are FTG's captured lifestyle distribution (§4.5's table; provenance `ref:FTG lifestyle
distribution`), shifted by the town-level character, and every band-keyed row set of this table may omit bands, which
interpolate (§4.5, item 27). The farm table's fuel and timber rows, the farm modes and the outside classes' seeding rows
are §4.9's.

**Under a fall (AM-8).** A population fall selects the suffix in reverse ordinal order, as above, and its households leave
by §4.11's step (c) — a `relet` down, `vacate` at a building's last household — and it never removes a building by
arithmetic: the standing stock follows with §4.11's dwell lag, and a later rise reoccupies the same suffix
first. `BuildingClassRow.salvageM3` is the class's material yield when robbed, cleared or dismantled, and the debit of a
build or repair of that class — read by §4.11's ledger.

**Replaceability, households, entrances, cellars and the room programme (items 28, 29 and 31; J-A28.43, J-A29.41).**
`DesignationTemplateRow` — one per band of each `BuildingClassRow` — carries them in its `replaceability`, `households`,
`entrances` and `cellar` columns (above); `RosterTables.roomProgram` holds the room programmes and
`RosterTables.basementGate` the basement's terrain-gate values:

```ts
interface RoomProgramRow { for: { cls: BuildingClass; band: string; use?: string; era?: string } /* the designation and its band (item 19's rows) */; rooms: RoomRuleRow[] /* the programme */;
  pattern: Record<'basement'|'ground'|'upper'|'top', { weight: number; pattern: LayoutPattern }[]> /* §2.6's layout patterns, weighted per storey class */; circulation: { num: number; den: number } /* integers: the share num/den of a storey given to halls and corridors — §2.6's capacity reads it exactly */;
  stair: { placement: 'by_entrance'|'rear'|'centre'|'tower'; kind: StairCore['kind'] } /* the stair core §2.6 places before any cut */; basementAccess: 'core'|'trapdoor' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand — never external, which only a walk-out's fall derives; the plan rung reads Basement.access */; furnish: { density: number; wallBias: number } /* item 28's abstract furniture by role */ }
interface RoomRuleRow { role: RoomRole /* §2.6: data-defined */; scope: 'unit'|'shared'|'service'|'circulation' /* item 28 (f): a room of one household's dwelling unit, one the households share (a kitchen, a common room), the use's or the staff's rooms (a forge, a shop, a store, a staff chamber), or a corridor or stair hall — §2.6's interior ladder says which scopes a band's row allows */; count: { n: number; law: 'const'|'perHousehold'|'perStorey'|'perCapacity'|'perSubLocation' /* per household: item 31's relet; per capacity: a sub-location's */; capacity?: string; tag?: string };
  area: [number, number, number] /* m²: min, target, max */; storey: 'any'|'ground'|'upper'|'top'|'basement' /* the storey rule */; exterior: 'none'|'some'|'max' /* windows */; door: 'door'|'arch'|'open' /* the opening kind */; maxDoors?: number;
  adjacency: { kind: 'hard'|'soft'; to: 'core'|'entrance:main'|'entrance:yard'|RoomRole; via?: 'direct'|'corridor'|'under' }[]; priority: 'hard'|'soft'; hearth?: boolean;
  concealed?: boolean /* item 63: a room of a concealed use's programme — placed by §2.6's plan rung away from the main entrance and off the public circulation hub, reached only through a service, yard or concealed door (§4.7's Concealed institutions) */;
  furnish: { density: number; wallBias: number; glyphs: string[] } }
interface BasementGateRow {   // item 29 (b): the values §2.6's basement gate reads; one row per table version
  waterTableM: M /* default 40: within this distance of a shore the water table is the nearest water body's surface plus the freeboard */;
  freeboardCm: Cm /* default 50 */; drainageAccumCells: number /* default 100: the flowAccum at which a hydro cell is the drainage line elsewhere (§2.3; our own, calibratable) */ }
```

The **room programme** lists the rooms a building of that class, use and band must and may have — each with its
size band in m², its storey, its openings, its adjacencies and how many — a fixed number, a number per storey, one for each household of
item 31's `relet`, or a sub-location's capacity — which §2.6's plan rung writes first and then cuts the walls
to fit (item 28), so rooms are never cut before the programme is known. The programme rows follow §2.6's **interior
ladder** (item 28 (f)): the ladder's row for the occupants' band gives the cross-class structure — how many households
the shell holds, each unit's rooms, the shared rooms, the staff rooms and their size beside the owners' rooms, the
circulation form and how large the rooms may be — and a class's programme row adds what a smithy, an inn or a chapel needs; the
`programme` row is read at the occupants' band (the field band, J-A19.43) and the `households` column at the plot's
`builtBand` (the shell's capacity, §2.6), so the interior has no floor while the shell keeps its own (§4.11).
`LayoutPattern`, `StairCore` and `RoomRole` are §2.6's, the role names our own data rows (hall, chamber, solar, parlour,
kitchen, buttery, common room, cooking place, staff chamber, corridor, stair hall, forge, shop, store, undercroft,
chapel, nave, passage …). The plan rung's `plan.program` stream draws the fractional part of a count law (§6.1), as
`plot.join` draws a join (§7.7). Households per building follow the roster's households — where a dossier exists, the households that
fill its population, map facts derived from its population and circumstances (§7.7's derivation table; item 20 (h)) —
and item 17's relocation (§10.3); the `households` row and the shell's floor area bound the ladder's
`relet` through §2.6's one capacity function, which the generation fill (§4.7: S10b's placement, S11's clamped write),
`relet` and F-PLAN (§5.2) all read; with no epoch every residential building houses what §4.7's generation fill gives it — at
least one household and never above its capacity — so the static baseline is unchanged (item 23).
Every column is data with provenance, editable and calibratable (§7.6, §13.9). The entrance rows default to one street
entrance per building — the owner's rule (item 29; provenance `owner`): the FTG client of the 2026-09-25 capture sends no
door, its road-facing anchor being a night light (item 50), and MFCG 12710731's model, read in full, carries no door
record (an inference) — with side, rear and service doors as our tendencies (`extension`, 0 in the parity presets,
item 23); the cellar rows are item 29 (b)'s class rows, whose extensions §2.6's emulation note names; the reference's
basement share is a descriptive baseline only (§13.5).

**The `drain`, `underground`, `undercity` and `undergroundAccess` columns (II.7; items 12, 14, 64 and 65).**
`BuildingClassRow.drain` is the class's drainage need: `none` (tents, sheds, hovels), `pit` (households and most
workplaces: a cess pit or the street gutter of their own), `channel` (the trades and institutions that discharge foul
water: tanners, dyers, fullers, brewers, slaughterhouses, baths, hospitals, monasteries); `underground` names which
classes a sewer-front underground neighbourhood may hold or prefers (II.7.3); `undercity` names which classes the
undercity may hold or prefers (II.7.5) — `preferred` for its microcosm: the black market, a fence's hall, a criminal
guild's seat, a tavern, a forbidden shrine, a fighting pit, a healer; `allowed` for the dwellings of the squalid and poor
bands and the small trades that serve them; `never` for the rest; and `undergroundAccess.prob` is, per band row
interpolated along the value, the chance that a surface building of the class whose basement reaches an underground
element holds an access down to it (II.7.3's *Basement accesses*) — higher for breweries, bathhouses, warehouses and inns
(0.15–0.30 by band), low for houses (0.02, raised with the plot's age by II.7.3's age term), 0 for a barracks, a
courthouse and a temple; a user adds an access to any building by item 66's edit (§7.3 item 9). Which plots a network
connects, what a class does when none exists, and how the underground rows are used are II.7.1's, II.7.3's and II.7.5's
rules; the columns are data like every other, our own rows, and every non-`never`, non-zero cell is an `extension`
(no reference has an underground).

**The `concealment` column and the cover table (item 63).** `BuildingClassRow.concealment` gives, for a class our tables
mark clandestine — a thieves' den, an assassins' house, a smugglers' store, a forbidden cult, a black market, a spy ring —
its default-mode weights per band and district kind (`ConcealmentRow`: `front`, `hidden` and `underground` weighted
against `none`; the default rows weight `front` highest in every band, `hidden` next in the poor and squalid bands,
`underground` where an underground allocation may exist), the share of hidden and undercity placements that also take a
front, and the multiplier on the building's access lottery; `RosterTables.covers` gives each concealed class its weighted
plausible fronts per band (`CoverRow`: an assassins' house behind a tavern, a fencing hall or an apothecary; a smugglers'
store behind a warehouse or a chandler's; a thieves' den behind a tavern, a pawnshop or a bathhouse; a forbidden cult
behind an almshouse, a bathhouse or a bookbinder's …), and `RoomRuleRow.concealed` marks the rooms of a concealed
programme. Every row is our own and an `extension`, so the parity presets conceal nothing; how they are read is §4.7's
*Concealed institutions*.

**The rows of items 70–72, 78, 79, 82 and 88 — their types and default rows.** The fields `RosterTables` and
`BuildingClassRow` name above are typed here; how each is read is the section named beside it. Every row is our own,
calibratable (§13.9) and an `extension` — zero, a step or empty in the parity presets (item 23) — unless it says otherwise.

```ts
interface ClassMixRow {   // item 71 (§4.7's Class mix inside a band): one row per band of the band set; a band without a row interpolates (§4.5)
  band: string; weights: { cls: string /* a residential class id */; weight: number; wealthShift: number /* × (wealthLevel − 0.5), §4.7 */ }[];
  prestige: { frontage: 'tier1'|'square'|'park'|'corner'|'water'; weight: number }[] /* §4.7's prestige order */ }
interface ClusterRow {   // item 70 (§4.7's Informal clusters): by band × climate × era
  band: string; climate?: string; era?: string; kinds: { cls: 'shack'|'tent'|'lean_to_shelter'; weight: number; footprintM2: [number, number]; depthM: number }[];
  householdsPerStructure: { rung: string; range: [number, number] /* households.built of a structure, drawn in the range on siteplan */ }[];
  pathWidthM: number; fireGapM: number; wholeBlock: number /* the share of eligible blocks S10 (7) joins into one informal plot */; relations: RelationRule[] }
interface TenureRow { band: string; informal: boolean /* this band's plots with no standing building but shacks, tents or lean-tos are informal (§4.7) */ }
interface QuarterIdentityRow {   // item 72 (d′) (§4.5 (4)): an emergent or dossier-declared identity
  id: string; families: { family: string /* a class tag */; weight: number }[]; threshold: number; perHa?: boolean /* the threshold per hectare of the district */;
  bands?: [string, string] /* the district's band within */; priority: number; singular: boolean;
  power?: string /* the power kind its quarter dial follows */; sector?: string; kind?: string /* the S6 kind an epoch re-types a district to past the hysteresis */;
  definedBy?: string /* a district-defining class (BuildingClassRow.distribution): the identity a dossier instance of it claims */; targetShare?: number /* its share of that district's placed uses */;
  magicOnly?: boolean /* admitted only where the magic circumstance is not 'none' or the dossier lists an arcane power */; naming: string /* the naming slice its names draw from (§10.4) */ }
interface PowerLinkRow { element: 'gate'|'wall'|'tower'|'bridge'|'road'|'quay'|'market'|'tollHouse'|'customsHouse'; powers: { kind: string; weight: number }[] }   // item 72 (d″): the infrastructure's powers (the classes' are their `powers` column)
interface SectorLinkRow { element: PowerLinkRow['element']; sectors: { sector: string; weight: number }[] }   // item 72 (d4): the infrastructure's sectors (the classes' are their `sectors` column)
interface BandRangeRow { band: string; lower: [string, string] /* [floor, ceiling] for a district in the band's lower half */; upper: [string, string] /* in its upper half */ }   // item 72 (d‴) (§4.5 (5))
interface SectorRow { id: string; tags: string[] /* the class tags whose classes serve the sector by default */ }   // item 78: the sector set `CircumstanceSlice.economy` is keyed by (§7.7 item 2)
interface PortRows {   // item 88: the staged rows the dossier port fills (§14) — schema-complete and empty in the base
  impairments: { type: string; physical: boolean; conditionSteps: number /* a physical type's condition steps per severity band on the building (§7.7's F4 row); a non-physical type's steps per unit of severity on the impaired institution's own dial term, conditionSteps × severity × dial.conditionStep (§4.5 (6)) */ }[];
  hinterland: { importPct: number /* 0–1 */; foodChain: Record<string, boolean>; farmlandScale: number /* §4.9's arable demand × max(0, 1 − importPct × farmlandScale) */ } | null /* one row; null while empty */;
  crime: number | null /* in [0, 1]; the staged crime term of §4.6 — the factor of its hidden share, of II.7.3's access and of II.7.5's undercity demand */;
  customKinds: { kind: string; criticality?: number; economicWeight?: number; defenseRoles?: string[]; powerAuthorities?: string[]; fallbackClass: string /* the class a custom kind is built as */ }[];
  legitimacy: number | null /* on the government record: × the governing power's amplification in §4.5 (6)'s institution dial, 1 while empty */ }
```

* **Class mix (item 71).** Default weights over the residential classes — squalid: hovel 0.8, row house 0.2;
  poor: hovel 0.3, row house 0.6, cottage 0.1; modest: row house 0.6, cottage 0.2, house 0.2; comfortable: row house 0.3,
  house 0.6, town house 0.1; prosperous: house 0.5, town house 0.35, manor 0.15; rich: manor 1.0 — the manor share thus
  rises monotonically from the prosperous row to all manors in the rich row; `wealthShift` manor +1.0, town house +0.5,
  house 0, row house −0.3, hovel −0.6; prestige weights `tier1` 1.0, `square` 0.8, `park` 0.6, `water` 0.6,
  `corner` 0.4. The parity presets make each band row one class, its class rows' `lifestyleBand` pool (a step at each cut). The `shack`, `tent` and `lean_to_shelter` rows are the cluster's structure classes (§4.7's *Informal clusters*), never drawn by the class mix (J-A70.49).
* **Clusters and tenure (item 70).** Squalid: shacks 0.5, tents 0.4, lean-to shelters 0.1; poor: shacks 0.7, lean-to
  shelters 0.2, tents 0.1; footprints shack 6–20 m² (depth 3–4 m), tent 6–15 m² (round or oblong, depth 3 m), lean-to
  shelter 4–12 m² (depth 2 m); households per structure 1 at TOWN, up to 2 at CITY and up to 3 at METROPOLIS in the squalid
  row, while the poor row gives 1, 1 and up to 2;
  `pathWidthM` 1.2, `fireGapM` 1.0 (in the squalid row 0.8 at CITY and METROPOLIS), `wholeBlock` 0.2 in the squalid row, 0
  otherwise; relations `nearWater` and the lee of walls and ruins, soft. The `shack`, `tent` and `lean_to_shelter` class
  rows (distinct from the `lean_to` frontage treatment): `drain` `none`, `replaceability` `immediate`, cellar 0, one floor,
  a programme of the one-room unit with no circulation, `households` from the cluster row. Tenure: squalid and poor
  `informal: true`.
* **Distribution and significance (item 72).** `distribution`: `singular` for the cathedral, a great temple, the palace, the
  castle, the university and the principal market's hall; `district-defining` for the dossier kinds that are districts (a
  red-light district's brothels, the slums, a foreign quarter, a guild district); `dispersed` for every other class.
  `significance`: cathedral, great temple and palace 30; castle 20; university 15; church 8; guildhall, town hall and
  market hall 5; chapel 3; inn 1.5; workshop 1; shop 0.5; lodging house 0.3; house 0.2; cottage 0.1; shack and tent 0.05.
* **Quarter identities (item 72).** The religious quarter (families religion; chapels and churches 1, a cathedral or a
  great temple 3; threshold 3; power `religion`; kind `temple`); the craftsmen's quarter (craft 1; 0.6 per hectare; power
  `guild`; kind `craft`); the merchants' quarter (trade and warehouse 1; threshold 5; bands prosperous to rich; power
  `company`; sector trade); the harbour quarter (harbour 1; threshold 4; kind `docks`); the garrison quarter (military 2;
  threshold 4; power `military`); the learned quarter (learning 2, a university 5; threshold 5); the arcane quarter (arcane
  1, a mage tower 3; threshold 3; power `arcane`; `magicOnly` — the row a Mages' Quarter naming claim biases toward, item
  82); the defined districts (the red-light district `definedBy` its brothels, `targetShare` 0.15, with no `kind` — §4.5 (3) scores its district by the brothel class row's soft `nearHarbour` (within 300 m), `nearGate` (within 200 m) and `near` an inn (within 100 m) rows, our own and `extension` (J-A72.51); the slums `definedBy`
  the dossier's slum kind, kind `shanty`, the squalid band's rows); and the plain residential identities, one per band,
  lowest priority. Each row's `naming` slice is our naming pack's (§10.4).
* **Powers and sectors (items 72, 78 and 79).** The classes' `powers` column — guildhalls and workshops `guild`; merchant
  houses and warehouses `company`; churches, chapels and temples `religion`; the castle, manors and keeps `lordship`; the
  town hall and the courthouse `council`; barracks and guard posts `military` (item 79's kind); mage towers and alchemists
  `arcane` (item 79's kind, only where the magic circumstance or a dossier arcane power admits it); the clandestine
  classes `criminal` — each an association the dossier's `Institution.powers` overrides (§2.7). `powerLinks`: gates 0.5
  `military`, 0.5 `council`; walls and towers `military`; bridges, roads and quays `council`; the market square `council`;
  the toll and customs houses `council`. The sector set (`sectors`, item 78): trade, taxes and tolls, crafts, agriculture,
  extraction, fishing, finance, religion, military, magic, crime. The classes' `sectors` column and `sectorLinks` (the
  owner's examples as rows): markets, warehouses and quays → trade; gates, toll houses, bridges, roads, walls and the
  customs house → taxes and tolls (0.7) with trade (0.3) on gates, bridges and roads; workshops and guildhalls → crafts;
  farms, mills and granaries → agriculture; quarries and mines → extraction; fisheries → fishing; moneylenders → finance;
  churches → religion; barracks → military; mage towers → magic; the clandestine classes → crime.
* **Band ranges (item 72).** squalid: squalid–poor in both halves; poor: squalid–modest; modest: poor–comfortable;
  comfortable: modest–prosperous; prosperous: comfortable–rich (the middle band to rich, item 71's mix); rich: prosperous–
  rich in its lower half, rich alone in its upper half.
* **Notice posts (item 82).** A `notice` pin stands at the principal market and at each gate plaza by default (§4.7's
  furniture step), at the main entrance of every class whose `tags` hold `notice` (a town hall, a market hall, a
  guildhall), and wherever a named-feature claim of the dossier names one (§7.7).
* **The port's staged rows (item 88).** `portRows` is declared in full and empty; a row the port fills acts only through
  the reader its comment names (the hidden share of §4.6, the farmland of §4.9, the access of II.7.3, the undercity's demand of II.7.5 and the dials of §4.5 (6)), and while empty every factor is 1 and every list empty.
=== REPLACE ### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order ===
### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order

**The owner's rules, as hard invariants (their §5.3 check rows are the determinism part's).** U1–U3 are the sewer
network's rules: they hold on its arena, part 0 of the underground layer (J-A65.42) — the owner's "there are no sewer
alleys" stays true in the sewer — while the undercity (II.7.5) and the layer's other systems (II.7.6) are other parts with
rules of their own.
* **U1 — frontage on one tunnel, doors onto it.** Every underground plot's `frontage` rows lie on the kerb (the external
  wall) of exactly one navigable, open tunnel run, and its `access` rows are a subset of its `frontage` rows (§2.5): a door
  opens only onto the tunnel.
* **U2 — no sewer alleys.** The underground L1 carries `tunnel` chains only; no `way` chain, no `alley` face and no S8 lane
  exists underground, so no tunnel exists to give access alone. F-PLOT's alley rung is skipped on the underground arena
  (§5.2): a plot that cannot front a tunnel is not a plot but residue.
* **U3 — flush against the outer wall.** Every underground building's frontage side lies on its plot's frontage edge; the
  footprint is `plot ∩ the frontage band of the row depth` (§4.7 S11's boolean), so the room's wall is the tunnel's wall
  by construction.

**Who lives there, from the same tables and field (J-A12.44).** The underground is a **pseudo-district**
(`District.kind = 'underground'`, one per settlement, its `faces` the underground built blocks, its `allocation` an S7b
record), as the hinterland and the sky pseudo-districts are (§4.5, II.6). **S7b (6)** — after the sky pseudo-districts (5)
and before the districts (1) — creates its `Allocation` when `Features.sewers` is on and the preset yields navigable mains
(the `navigable` preset always; `historical` when the trunk law of II.7.2 gives at least one navigable run of `minRunM` =
60 m, predicted at S7b from the arterials' and main roads' served areas, which exist by then, since the mains follow
them): (a) households of the **poorest** band, a share `undergroundShare` of that band's demand (defaults TOWN 0.02, CITY
0.04, METROPOLIS 0.06 — the crowded, cheap, hidden stock); (b) the classes whose class-table row carries
`underground: 'preferred'` (crypts, cold stores, the cellar workshops of brewers and vintners, guild vaults) at their table
share, plus the clandestine institutions whose concealment mode is `underground` (§4.7's *Concealed institutions*,
item 63) — where an undercity exists they go to it first (II.7.5, S7b (7)), and where no underground allocation can take
them the mode falls back to a front (§4.7) — and any assigned or dossier institution whose `knownTo` is `secret` (item
30) for which the assignment templates prefer underground plots; (c) in an epoch, the evolution engine's crowding hook: a share `crowdingShare` (II.7.4) of the
poorest band's households in the epoch's residual demand — what §4.11's regrowth-first steps (0)–(5) leave — goes
underground before the boundary widens (§4.11 (6); J-A12.47) — the owner's "crowding on the surface pushes growth
underground",
staged with the engine. The allocation is capped by the predicted capacity — 2 sides × the navigable run length ÷ the
poorest band's mean frontage, less the excluded ground below — and the ground's districts receive the remainder, so the
population stays whole; a miss between the prediction and the built network is absorbed by S10b's plan–fit–reconcile and
F-SITING's ladder, reported, never re-rolled. **The prosperity underground is the ground's field, shifted:** a plot's
`ContextVector.prosperity` is the ground raster sampled at the plot's frontage midpoint plus `undergroundOffset` (default
−0.25, a table value), clamped to [0, 1] and banded by the town's own `FieldBands` (§4.5), so a vault under the cathedral
close reads richer than a cell under the tanners' lane; the density and greenery fields are read the same way, and
`ContextVector.arena = 'underground'` keys the arena-specific rows. The granularity table (§4.7 S10 (2)) then does what the
owner asked without a new law: the poor band's rows give many small cells, the institution row few large vaults; `UndergroundRule`
(II.7.4) scales their depth by `depthScale` 0.35 (a plot one or two rooms deep: poor 4–7 m, modest 6–10 m, institution
8–15 m) and sets the vacancy-run share to `vacancyRunShare` 0.25 (long bare stretches of wall), and on the underground arena
S11 admits only its `arrangements` — the designation templates' `row` and `institution` (§10.2's `arrangement`, read with
`ContextVector.arena`) — so no compound, detached, hovel, tents or cluster stands along the sewer (the undercity's
chambers admit hovels and informal clusters by their own rows, II.7.5; item 70).

**The cut is the ground's cut (J-A12.41).** On each underground built block the underground stage runs S9's and S10's own
machinery with the underground context (`PlotStrategy`, `SitePlanStrategy` and `BuildingGenerator.outline` unchanged,
§14): (1) a kerb edge is a frontage when its tunnel is `navigable` and open (the `open` column of II.6's condition table) —
drains, culverts and closed runs are not frontages, so a block bounded by drains alone holds only residue; the frontage's
`class` is the tunnel's `kind`; (2)–(3) as §4.7, claims first for the vaults; (4) per-frontage regions by the block's
straight skeleton, the depth capped by the underground depth band, so a plot's rear line is its region's rear line and
**no plot reaches a second tunnel by construction** — two tunnels close together share the medial line between their
regions, never a kerb; (5) corner plots at junctions as on the ground; (6) residue typed `rock`; (7) joins and splits under
the same law; (8) vacancy runs at the underground share; (9) no alleys (U2); (10) every plot gets its context vector, its
derivation record and access rows ⊆ frontage rows (U1). Then S10b places the allocation by the same scorer and S11 lays
`row` cells end to end along the wall with party walls, and vaults on their claims — the row boolean gives U3. Everything
is cut inside the sewer network's arena (part 0 of the underground layer): the stage writes only that arena — every
transaction it opens is keyed to part 0 (§3.4's isolation), and §13.2's reroll-isolation fixture proves the ground and
every other part byte-identical — while the ground's static index partitions are read, never touched.

**The surface constrains the underground — by reads, never by copied geometry (J-A12.42, J-A12.43).** Before a plot is
committed its ring is tested on the ground arena through `pointLocate` and `resolve` on the ground's `PlatKey` (§2.2 rule 1,
through §3.4's services: no cross-arena write, no ground ring copied into the underground) at its vertices, its frontage midpoint and
a 1 m sample of its rear line. A sample is **excluded** when it lies in: any L0 water face; a cell whose `terrainClass` is
`damp` or `flood` (the water table: low, damp ground stays empty, item 12 (c)); a `wall_strip` block's band, setback,
glacis or ditch part, a tower's or a gatehouse's footprint (§4.8); the castle's reservation; the main footprint of a
`precinct` reservation (the cathedral's foundations); and **every other L4 footprint** — a room under a surface building
is that building's own basement (item 29, §2.6), a record of the ground building that never opens onto a tunnel, never an
underground frontage plot (J-A12.42). Public ground (corridors, squares, gate plazas), yard parts, greens, residue and
vacant plots are allowed. An excluded sample steps the plot down the **F-UNDER ladder** (its §5.2 row is the determinism
part's; the rungs are these): the band's depth → the band's lower depth → the class minimum depth → the run is typed
`vacant` (a bare stretch of wall); the ladder is deterministic from the plot's stream and each use is counted in the
report. A rear line that stops a metre short of the house above is invisible underground, which is why the test is a
sample and not a boolean against ground rings (J-A12.43).

**Access, air and light (item 12 (d)).** An **`AccessPoint`** (II.7.4; in §2.7's entity registry) links the arenas by
entity ids — a kind (`stair`, `shaft`, `well`, `cellar_stair`, `grating`), a role (`access`, `air`, `light`), a ground
point with the host it opens in (the corridor, square, yard or building, resolved on the ground by `pointLocate`, never a
ground face slot) and a vertex on the tunnel's kerb — and is placed after the plots: every **underground
neighbourhood** — a connected component of open navigable tunnel edges carrying at least one plot — gets at least one
`access` point, at the nearest allowed ground point above its tunnels in a declared order: a street stair in a corridor
strip or a square; a well shaft in a yard or a square; a `cellar_stair` in a surface building whose basement lies within `accessReachM` of the neighbourhood's tunnels — the one on a `knownTo: 'secret'` plot (item 30) first, else the one whose class row has the highest access probability at its band (§10.2's `undergroundAccess.prob`), ties by address (J-A64.44) —
a stair to the tunnel from a basement that stays the building's own room (item 29; J-A12.42). Air and light shafts
(`grating`) are placed every `shaftSpacingM` of navigable tunnel that carries plots (60 m historical, 40 m navigable) on
public ground only; where none lies within reach the spacing doubles once, then the run has none, reported.
`AccessPoint.ground.at` moves with its host face under a warp as a pin's point does (§7.4). Every `grating`, well shaft
and street stair — every access that breaks the surface — is a light shaft for §8.4's lighting: a column of daylight by
day, of faint moonlight by night, on the floor below (item 68 (d′)). **The sewer's light rows (item 68 (d′)).** The
underground layer has no global light and near-zero ambient; along the sewer the rows of §4.7's light table (`LightRule`,
context `arena` underground and the system `sewer`) put a light at every sewer-front dwelling's door — its windows lit by §8.4's derived window lights — and at the tunnels' junctions and access points only, the tunnels between them dark, the fuel by the settlement's circumstances.

**Basement accesses (item 64; owner: "some buildings that have basements have accesses to the sewer grid or a dwelling
in a sewer grid where appropriate. higher chances if they are criminal as described above"; J-A64.41, J-A64.42).** Beside
the neighbourhood rule above, a surface building may hold its own way down — decided per building by the connection
stage (II.7.6), after the underground plots and the layer's other systems, never because a neighbourhood needs one.
1. **The gate.** The building has a basement (§2.6, item 29) and its `Basement.ring` lies within `accessReachM` (5 m;
   `UndergroundRule.access`, II.7.4) in plan of an open navigable tunnel's kerb (part 0), of an underground building's side
   or rear wall (a sewer dwelling — never its frontage, which is the tunnel's — or an undercity building), or, where they
   exist, of an open gallery or chamber of another system (II.7.6) or an undercity walkway (II.7.5); the test is a read
   through the kernel's services on each part by key (J-A12.32; no cross-arena write), the nearest element first, ties by
   address. The cellar stays a cellar (J-A12.42): the building gains an access record, never a room of the tunnel.
2. **The probability.** `p = min(accessCap, prob × (1 + ageGain × age) × multiplier × crime)` — `prob` the
   `undergroundAccess.prob` of the building's class at the plot's band, interpolated along the value (§10.2; the front's
   class where the building carries a concealed use), `age` ∈ [0, 1] the plot's growth-stage rank (1 for the first stage, 0 for
   the last: the "old houses"; `ageGain` 1), `multiplier` the concealed class's `accessMultiplier` where the building
   carries a concealed use (§4.7's *Concealed institutions*, item 63; default 6) and 1 otherwise, `crime` §4.6's access factor `1 + crime.accessScale × PortRows.crime` (item 88; 1 while the row is empty), `accessCap` 0.9 — one draw on `sewer`
   keyed by the building's lineage (§6.1; no new concern). A class row of 0 (a barracks, a courthouse, a temple) never
   draws; a user adds an access to any building by item 66's edit (§7.3 item 9; II.7.6).
3. **The kind** follows the drop from the basement's floor to the element's floor: a `door` through the basement wall
   where the element is an underground building's wall and the drop is within `doorDropCm` (60); a `stair` within
   `stairDropCm` (300); a `ladder` beyond; a `hatch` — the basement plan's trapdoor over a ladder — instead of a stair or
   ladder where the building carries a concealed use or its basement's own access is a trapdoor.
4. **State and knowledge.** `state` is `open`, `locked` or `bricked` by the row's weights (0.6 / 0.3 / 0.1 — a bricked-up
   door is the trace of an old one) or an edit, and reads `collapsed` or `bricked` while its element is closed (II.6);
   `knownTo` is `secret` where the building carries a concealed use (item 63) or its plot is `knownTo: 'secret'` (item 30), else `local` — the one statement of an access's knowledge in a building, which II.7.4 and II.7.6 cite — a brewery's cellar door to the
   sewer is known to its street (item 30's values).
5. **Its uses.** The access is a fixed anchor of the basement storey that the plan rung reserves — a stair, ladder,
   trapdoor or door in the basement plan (§2.6, item 28) — and a node of the connection graph (II.7.6): a lifeline where
   its element is the undercity's (II.7.5). The neighbourhood rule above keeps its cellar-stair case as the fallback for
   a neighbourhood that no basement access reaches.
§5.3's rows (no access without a basement and a reachable element; a concealed building's access `secret`) and §13.2's
T64 bars (the access rate by class within its row; a clandestine building over a network at least at its row's rate)
prove it.

**Depth and ceiling, drawn on their own level (item 12 (g); J-A12.45).** Every underground building's `Heights` (§2.6) is
populated as on the ground: `baseCm` = the tunnel's invert at the plot's frontage midpoint + `floorAboveInvertCm` (30,
above the flow); `floors` = 1, or 2 for a vault class in the `navigable` preset where the headroom row allows; `eaveCm` =
the ceiling = min(the class's storey height, the tunnel's `headroomCm` + `vaultAllowanceCm` (a table value: 80 for vaults,
0 for cells)); `ridgeCm = eaveCm`, roof kind `flat` (a vault is a style program over the flat kind, §8.2); `elevationCm`
(§2.1) = `baseCm`, the entity's depth below the ground datum. The sewer network is **one arena** (`PlatKey` part 0 of the
`underground` layer, §2.2), not one per depth: depth is per entity inside it (J-A12.45), so tunnels at different depths
keep their one topology, while the layer's other systems are parts of their own (II.7.6; J-A65.31, which amends J-A12.45
for systems). The view groups every part's items into **depth bands** of `depthBandCm` (250) for §8.4's cut-away and for
§11's virtual-tabletop scenes — one scene per depth band with its elevation — so a building sits on its own level.

**Lifecycle follows the tunnel (item 12 (f); the tunnel's states are item 11's, II.6).** When a tunnel run's condition
closes — the `open` column of II.6's condition table turns false: caved in, collapsed or sealed — every plot whose frontage rows lie on
it takes `existence: 'abandoned'` with cause `rule:tunnel-closed`, and its buildings step through §2.8's decline states by
§4.11's tendency table at the underground's rate (the persistence order places the underground after streets and walls
and before terrain, item 8); a closed run's plots keep their ids, rings and derivation records. Reopening — the `reopen` conversion, by the engine
or by hand (§7.1) — `resurrect`s (§2.8) the plots whose rings still exist, so nothing is
re-rolled. A tunnel deleted by a user (allowed: everything is editable) takes its plots with it as any way's deletion takes
the plots that fronted it (§7.3), and the underground blocks it bounded re-derive.

**Order, seed and locality (item 12 (h); J-A12.46).** The `UndergroundStrategy` registers after the network stage by declared
I/O — inputs `under.tunnels`, the ground plat (read), the three field rasters, the underground `Allocation` and the
tables; outputs `under.blocks`, `under.plots`, `under.buildings`, `under.access` — so the owner's order holds: city →
network → underground plots and buildings. It runs eagerly on the generation worker after the pool's merge, never in the
pool (it reads every district's committed L3 and L4 and writes another arena). It keys its streams from the underground
pseudo-district's lineage through the ordinary concerns (`plot.width`, `plot.join`, `plot.vacancy`, `siting`, `siteplan`,
`heights`; the network's own draws use `sewer`; §6.1); a seed therefore reproduces its underground exactly, and it names its
entities with S13a's naming engine for its own pseudo-district — a leaf of §9.1's quarter tree in a family of its own, its
labels drawn only when the layer is visible — as the hinterland unit runs its own stages (§4.1). The sewer-front blocks on
the tunnel runs that lead into an undercity are its **outskirts** (II.7.5): they keep every rule of this subsection and
belong, for naming, description and counts, to the undercity neighbourhood that lists them (`District.outskirts`, §2.5). **Locality:** the stage's
spatial reads are declared (§7.3's audit): each underground block records the ground cells over it, so an edit whose clear
region covers those cells re-derives those blocks by tree scoping onto the dependent arena, a tunnel edit re-derives the
blocks its edges bound, and a New random of the underground pseudo-district writes only the `under` arena (part 0) — the
ground and every other part are byte-identical (the reroll-isolation fixture, §13.2). **Editable like everything:** underground plots and buildings are
ordinary plots and buildings on the `under/` arena (§2.1's address prefix), so every edit kind, lock, pin, assignment and
label of §7 applies unchanged; tunnels and access points have their own edit-target rows (§7.1). **Stage 2:** the
underground pseudo-district opens as II.1's underground close-up (`layer: 'underground'`).

**Emulation note (item 23).** Neither MFCG nor FTG has sewers or an underground; the whole layer is our extension, staged
by the owner, hidden by default, and with `undergroundShare` 0 and the layer hidden a CITY reads exactly as the references'
city. Nothing stands in a village's way: the village rows carry `never` (PART III).
=== REPLACE ### II.7.5 The undercity (item 65): what it requires, existence and the 1–3 bound, a shadow of the settlement ===
### II.7.5 The undercity (item 65): what it requires, existence and the 1–3 bound, a shadow of the settlement

*In plain words.* The owner asked what an undercity would require. Not more dwellings along the sewer walls — those stay
standoffish — but a place with the four things that make any town a town: a void big enough to live in, its own square
and streets, its own institutions, and lifelines to the surface. It is one to three neighbourhoods at most, each the
underside of a real quarter above, peopled by the settlement's own poorest and outlawed, trading the town's goods — a
shadow of the settlement, never a second one.

**What an undercity requires — its existence test (item 65 (b); J-A65.41).** The undercity stage tests four conditions
before it builds anything, each a rule with its values in `UndercityRule` (below; our own, calibratable, `extension`):
1. **A void large enough to live in** — chambers from a source that explains them (II.7.6): a cavern hall, a quarry's
   gallery system, a catacomb, cisterns and vaults, or a buried old town (the settlement's own earlier street level under
   a raised grade, II.7.6's `raiseGrade`). A void's **capacity** is the floor area of one connected cluster of its chambers
   and galleries ÷ `m2PerHousehold` (40 m² with its walkways).
2. **Its own public space and streets** — a chamber of at least `mainChamberM2` (400 m²) to be its plaza and black
   market, and galleries or walkways joining its chambers: its streets, independent of the sewer's water channel.
3. **Its own institutions** — the microcosm: at least `minInstitutions` (2) institutions of `undercity: 'preferred'`
   classes placed (§10.2: the black market first, a fence's hall, a criminal guild's seat, a tavern, a forbidden shrine,
   a fighting pit, a healer), beside its warren of dwellings.
4. **Lifelines to the surface** — food, water and air: at least one access to the surface (a stair, a basement access of
   II.7.3 or a link to a system that has one), one air shaft surfacing at a well, a grate, a chimney or a ruin (an
   `AccessPoint` of role `air`), and water from the river, a cistern or a well; and a route to the outside where the site
   offers one (an outfall, a cave mouth beyond the walls).
A neighbourhood whose void, square, institutions or lifelines fail steps down the ladder below; the sewer-front dwellings
of II.7.3 along the tunnels that lead into it are its outskirts, and its core is the void.

**Existence and the 1–3 bound (item 65 (c); owner: "the undercity is at most 1-3 neighborhoods to keep it simple and
consistent"; J-A65.41).** One rule: an undercity exists in cities and metropolises, and in a large town only where a void
source exists — rarely; never below TOWN. The rung row `RungProfile.layers.undercity` (§1.1; `UndercityExistenceRow`,
below) reads `never` at THORP, HAMLET and VILLAGE (PART III); `law` at TOWN with `maxNeighbourhoods` 1, `minPopulation` 6 000
(the large town) and `chance` 0.2 (rare: one draw on `sewer`); `law` at CITY with 2; `law` at METROPOLIS with 3. Under
`law` it exists when (i) the rung admits it (and, at TOWN, its draw comes up), (ii) a void source with capacity for one
neighbourhood exists or is predicted, (iii) its household demand H (below) reaches `minHouseholds` (20) and (iv)
conditions 2–4 can be met; where the dossier port supplies the fact (an optional
input, §7.7), a dossier may require one — it then exists at TOWN and above with at least one neighbourhood, in the vaults
under the oldest district where no other void is found — or forbid one, and the dossier's word outranks the rule. It is
never more than three neighbourhoods; the sewer-front dwellings elsewhere in the network are not part of it and do not
count against the bound.

**The size law.** The household demand is `H = min(N × u × (P ÷ P_ref) × (1 + g × disorder) × c, maxBandShare × N_poor)` —
`N` the settlement's households; `u` the undercity share at the reference poverty by rung (TOWN 0.01, CITY 0.02,
METROPOLIS 0.03); `P` the poverty share, the share of households in the `squalid` and `poor` bands (§4.5), and `P_ref`
0.022 the default roster's; `disorder` the circumstance slice's scalar in [0, 1] (§7.7 item 2; 0 where absent) with gain `g` 1; `c` §4.6's undercity factor `1 + crime.undercityScale × PortRows.crime` (item 88; 1 while the row is empty); `N_poor` the households of
those two bands and `maxBandShare` 0.6, so the surface keeps poor households of its own — the H households taken from the
squalid band first, then the poor band. To them join the roster's `undercity: 'preferred'` institutions at their table
counts and the clandestine institutions whose mode is `underground` (§4.7). The neighbourhood count is
`n = clamp(⌈H ÷ householdsPerNeighbourhood⌉, 1, maxNeighbourhoods)` (120 households), none when `H < minHouseholds`; the
void's capacity caps both (n falls first, then H). At the default roster and the `navigable` preset a city holds one
neighbourhood and a metropolis two, a poorer or more disordered one up to the bound — so the undercity grows with population, poverty and disorder and
shrinks with prosperity and order, as the owner asked. **Realism or toggle (D-3; J-A65.43).** Under the sewer's
`historical` preset (realism, the default) the undercity is a modest warren: at most one neighbourhood at any rung, its
void sources vaults, catacombs, quarries and a buried old town only, its shares `u` × 0.5; the full microcosm with the
1 / 1–2 / ≤ 3 bound and cavern towns rides on the `navigable` preset, D-3's fantasy toggle.

**The allocation (S7b (7), §4.5).** Where an undercity exists — predicted at S7b, when every void source is predictable:
caverns from S1's geology flag, catacombs from the religious rows and their sources' ages, quarries from the stone
resource and the roster's predicted stone stock, vaults from the arterials and bridges S4 laid, a buried town from the log or, at generation, from the history scar II.7.6 reads — S7b creates its `Allocation` after (6) and before (1): the H households of the size law, the squalid band's first and
then the poor band's, the `undercity: 'preferred'` classes, and the clandestine institutions whose mode is `underground`, which prefer the
undercity over a sewer dwelling where both exist; capped by the predicted capacity; the ground's districts receive the
remainder, so the population stays whole — nobody is added by the underground (c′ (1)). A miss between the prediction and
the voids as built is absorbed by S10b's plan–fit–reconcile and F-SITING's ladder, reported, never re-rolled.

**A shadow, not a second city (item 65 (c′); owner: "while it is called an undercity, it is simply the less than savory
shadow and extension of the full settlement, not independent of it"; J-A65.44).**
1. **Its people and institutions are the settlement's own** — the roster's households and institutions (the dossier's
   where one exists); the settlement's population totals include them.
2. **Each neighbourhood shadows a surface district.** A neighbourhood is a pseudo-district (`District.kind = 'undercity'`,
   §2.5) in its void's part (below), with a `parent` link to the surface district above the largest share of its main
   chamber in plan (ties by address) — the district that feeds it: poor, dockside, market, the old core. It joins §9.1's
   quarter tree under its parent's quarter node and is named as the underside of that quarter by §10.4's undercity naming (J-A65.40), never as
   a rival town; its prosperity is the parent's field sampled at each plot, shifted by `undercityOffset` (−0.35) and
   banded by the town's own `FieldBands` (II.7.3's pattern).
3. **Its economy is the surface's shadow.** Its black market trades the town's goods and its trades serve the town: S10b's
   supply edges run to the surface markets, docks and outfalls, measured from each undercity plot along its walkways to
   its nearest lifeline and on from the lifeline's ground point (the solver's `street` mode through the lifeline).
4. **It has nothing of its own to govern it** — no government, walls, gates, rung or identity of its own; the
   settlement's circumstances (disorder, crime, government) drive it.
5. **It changes as the settlement above changes.** At each epoch its size law is re-read, a change taking effect only past
   `hysteresis` (0.1 of H) and a new neighbourhood opening only in its void's free capacity; its blocks follow their
   parent's due marks through §4.11's wealth ladder (item 31); its chambers and galleries flood, collapse or are sealed
   by II.6's condition table, a chamber's plots following it as II.7.3's follow their tunnel; and the conversion
   `clearUndercity` (below; the authorities' clearance, by an epoch or by hand) vacates one neighbourhood's plots — its
   households leaving by §4.11's step (c), its institutions relocating by the use step — while its chambers stay.

**Where it lives, and its streets, plots and buildings (item 65 (e); J-A65.44).** An undercity neighbourhood lives in the
arena part of its void source (a cavern, quarry, catacomb, vaults or buried-town part, II.7.6) — never in the sewer's
part 0, where U1–U3 hold, and never in a part of its own, because its chambers are its source's: nothing is copied between
parts (J-A12.43; J-A65.31). The undercity stage runs S9–S11 on that part by the kernel's one cut (J-A65.32): its streets
are `gallery` chains of its own — walkways laid across a chamber's floor and the source's galleries it adopts — banded by
`corridorUnion`; a chamber's floor is cut by S10's frontage-first machinery on those walkways' kerbs and on the chamber
wall (plots may end on the `chamber_wall`); the main chamber stays unplotted as its plaza, the black market's stalls its
pins (§4.7's market pins). S11 admits the arrangements `row`, `hovel`, `cluster` (item 70's informal clusters: the
shanty structures of the destitute, §4.7's *Informal clusters*) and `institution` (`UndercityRule.arrangements`), carved
rooms and repurposed vaults being `row` cells against the chamber wall; heights are ceiling-capped — `eaveCm` = min(the
class's storey height × its floors, the chamber's `ceilingCm` − `ceilingClearCm` (30)), one floor or more where the ceiling
allows, roof kind `flat`, no sky. Every district, plot and building is an ordinary record on its part, editable by every
edit kind of §7.

**Its outskirts.** The sewer-front blocks of II.7.3 whose tunnel runs lead into the undercity — within `outskirtsReachM`
(150 m) along open tunnels from a link that joins it — belong to its neighbourhoods: each undercity district lists them
(`District.outskirts`, §2.5), a link between records in two parts (J-A65.31); their plots, geometry and allocation stay
part 0's under U1–U3, and they are named, described and counted with the neighbourhood.

**Lifelines and light.** The connection stage (II.7.6) realises the undercity's lifelines before any lottery: the nearest
candidate access, air shaft and water link are made (`open`, or `secret` by the row) first; a neighbourhood left without
one fails condition 4 and is dropped, its allocation re-placed by the reconcile, and with none left there is no undercity
— each drop reported. **Light (item 68 (d′); owner: "the undercity and near dwellings underground has to have a lot of
light sources. they don't have the sun or moon").** The underground layer has no global light and near-zero ambient; the
undercity's rows of §4.7's light table (`LightRule`, context `arena` underground and the system `undercity`) are the
densest of the layer — a light at every door (the windows lit by §8.4's derived window lights), along walkways (`gallery` rows, arena `underground`) at a spacing tighter than any surface street,
clustered in the market chamber and around its institutions, braziers and fire pits in the larger chambers — the fuel by
the settlement's circumstances (tallow and pitch, lamp oil; magical lights only where the `magic` circumstance admits
them), and every lifeline that breaks the surface is a light shaft (§8.4), so its brightest spots at noon lie under its
shafts.

**Emulation (item 65 (f)).** No reference generator has an underground: every row here is an `extension`, and the parity
presets set `maxNeighbourhoods` to 0.

**Order, seed and locality.** `UndercityStrategy` registers after the void systems and the sewer-front neighbourhoods and
before the connection stage, by declared I/O — inputs: the void systems' parts, the ground plat (read), the three field
rasters, the undercity `Allocation` and the rows; outputs: its districts, blocks, plots, buildings and walkways — and runs
eagerly on the generation worker after the pool's merge, as II.7.3's stage does (J-A12.46). Its existence and size draws
are on `sewer`, keyed by the settlement's lineage; each neighbourhood's streams derive from its district's
lineage, itself from its parent's (§6.3), through the ordinary concerns (`plot.*`, `siting`, `siteplan`, `heights`; §6.1,
no new concern); it writes only its void's part, so a New random of an undercity neighbourhood leaves the ground and every other part byte-identical, but for the far `link_end` vertices of its links, which the connection stage re-derives by one transaction on each such part (§3.4).

```ts
interface UndercityExistenceRow { existence: 'never'|'law'; maxNeighbourhoods: 0|1|2|3; minPopulation?: number; chance?: number /* TOWN: 0.2 */ }   // RungProfile.layers.undercity (§1.1); the rule above
interface UndercityRule {   // II.7.5's values as one editable rule record (§7.6); our own, calibratable, extension (the parity presets: maxNeighbourhoods 0)
  share: Partial<Record<Rung, number>> /* u: TOWN 0.01, CITY 0.02, METROPOLIS 0.03 */; povertyRef: number /* 0.022 */; maxBandShare: number /* 0.6 */; disorderGain: number /* 1 */; householdsPerNeighbourhood: number /* 120 */; minHouseholds: number /* 20 */;
  m2PerHousehold: number /* 40 */; mainChamberM2: number /* 400 */; minInstitutions: number /* 2 */; undercityOffset: number /* −0.35 */; ceilingClearCm: Cm /* 30 */;
  outskirtsReachM: number /* 150 */; hysteresis: number /* 0.1 of H */;
  arrangements: DesignationTemplateRow['arrangement'][] /* default ['row', 'hovel', 'cluster', 'institution'] */;
  presets: Record<'historical'|'navigable', { maxNeighbourhoods: 0|1|2|3 /* a cap on the rung row: 1 and 3 */; sources: UndergroundSystem['kind'][] /* historical: vaults, catacomb, quarry, buried; navigable: all */; shareScale: number /* 0.5 and 1 */ }> }
interface ClearUndercity { op: 'clearUndercity'; district: Id /* one undercity neighbourhood */ }   // a conversion kind (§4.11's union names it): its plots vacated, households leaving by step (c), institutions relocating by the use step; chambers kept
interface UndercityStrategy { derive(doc: Document, systems: UndergroundSystem[], allocation: Allocation /* S7b (7)'s */, rules: UndercityRule, ctx: StageContext, k: Kernel):
  KernelResult<{ districts: District[]; blocks: Block[]; plots: Plot[]; buildings: Building[]; walkways: Gallery[] }> }
// a Stage registered after the void systems and II.7.3's stage by declared I/O; runs S9 → S10 → S10b → S11 on each neighbourhood's void part; the StrategyRegistry's `underground` map (§14)
```
=== REPLACE ### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65) ===
### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65)

**One layer, several systems (item 65 (a); J-A65.31, J-A65.42).** The underground layer holds the derived sewer network —
the central piece, system kind `sewer`, part 0 (II.7.1–II.7.4) — and beside it the systems below, each an
`UndergroundSystem` record (§2.7) with its kind, its source, its arena part and its depth range: `catacomb`, `cavern`,
`quarry` (quarries and mine voids), `vaults` (cisterns, street and bridge vaults), `buried` (a buried old town) and `dug`
(the private passages an access edit digs, item 66). Each is its own arena part of the `underground` layer (§3.4): the
sewer keeps part 0, and every further system takes the next unused part number when it is first created — at generation
in the stage order below, one system per kind; a `buried` system when a `raiseGrade` first makes one, or at generation from a history scar (*A buried old town*, below); a `dug` system at the
first access edit that needs one — stored on the record (`UndergroundSystem.part`), counted by the document's
`nextUndergroundPart` (§2.9) and never renumbered or reused, because the number is part of its entities' keys and
addresses (§6.3). One system per kind: two catacomb complexes that meet join, as galleries of one kind may; what passes over or under without meeting belongs to another kind and so to another part. Inside one part every plan crossing is a junction (§3.4), so no rule lays an element across another of its part without meeting it: a catacomb or quarry laid beside a complex of its kind joins it at a common depth band; a dug connector's path search treats every other building's dug passage as a foundation (step 3 below); and a drawn gallery or chamber that would cross one of its system's at another depth band is refused by its dry run, naming the crossing (F-EDIT, §5.2; J-A65.47). A system's elements are **galleries**
(`Gallery`, §2.7: a chain at the part's L1 with `widthCm`, `wallCm` and `headroomCm` from its system row below, banded by
`corridorUnion` as a tunnel is, §3.7) and **chambers** (`Chamber`, §2.7: a void wider than a band — an ossuary, a cavern
hall, a quarry room, a cistern — a closed outline chain carrying the `chamber_wall` role, its floor an L1 face;
J-A65.32), each with its floor `elevationCm` and its `ceilingCm`.

**Depth bands.** Every gallery and chamber keeps its own depth, laid inside its system row's `depthM` range (catacombs 3–10
m, vaults 3–8 m, quarries 10–30 m, caverns 5–60 m following the rock, a buried town at its old grade, dug passages 2.5–6 m)
and never above the ground less its system's `coverM`; inside one part depth is per entity (J-A12.45), and systems in
different parts pass over and under one another. The view groups every part's items into the depth bands of
`depthBandCm` (II.7.3), so the layer draws and exports as one (§8.4, §11.1), a crossing of two parts drawn over and under.

**The derivations.** Each system is a registered stage with declared I/O (§4.12) — `UndergroundSystemStrategy`, below —
running after the network stage in the order catacombs, caverns, quarries, vaults — then, at generation, a buried old town where a history scar makes one (below) — each reading the ground and part 0
through the services only (J-A12.32) and writing its own part; every draw is on `sewer`, keyed by the system's lineage
and the element's source (§6.1; no new concern). Every system is gated to TOWN and above (PART III) and by its row's chance
per rung; the chances are 0 in the parity presets.
- **Catacombs** — from cemeteries' and churchyards' sources: the churchyard parts of church and temple plots (§4.9's
  churchyard row), the crypted classes (`underground: 'preferred'`: crypts, §10.2) and the religious precincts and
  monasteries. A source qualifies when its ground is not `damp` or `flood` (the water table of §2.6's gate values) and its
  age reaches `minAgeYears` (100) — at generation `(K − k + 1) × yearsPerStage` for a source built in growth stage k of K
  (§4.4; `yearsPerStage`, the stage rows' 50 years, §4.2 S2), replaced by the staged `HistoryHint.ageYears` when the port fills it (item 88) and by the
  log's years since its use opened after epochs — and holds a catacomb with the row's chance by source kind and rung
  (crypted church 0.6; churchyard 0.25 at TOWN, 0.4 at CITY, 0.5 at METROPOLIS; precinct 0.4). Its extent is its
  ossuary need, `A = Σ_years servedPopulation × burialRate ÷ 1 000 × ossuaryShare × m2PerBurial` — the population its
  source serves (the town's population history × the source's share of its religion's temples, §10.2; at generation each
  growth stage's population at its built share), `burialRate` 30 per 1 000 a year, `ossuaryShare` 0.1, `m2PerBurial` 0.05 —
  laid as galleries on a grid of `gridM` (6 m) under and beside the source within `reachM` (80 m), an ossuary chamber at
  every fourth crossing, and an entrance stair from the source's building (an `AccessPoint` of source `system`); so a
  catacomb is as large as its town's dead and as old as its church.
- **Caverns** — from geology: where S1's geology flag (`Terrain.geology`, §2.3, written by S1, §4.2) is `soluble` or
  `volcanic`, over the frame's rock (S1's `rock`, `high` and `mid` terrain classes), a cavern system exists with the row's
  chance (soluble 0.7, volcanic 0.4). Soluble rock: galleries along the terrain's drainage lines beneath the rock (§2.3's
  `hydro` cells whose `flowAccum` passes the row's threshold), at the local water table — a gallery below it carries water
  (`Gallery.water`) — with a hall where two galleries meet under high relief; volcanic rock: one to three tubes descending
  from high ground along the steepest descent, with breakdown chambers. The extent is capped at `maxRockShare` (0.1) of the
  rock area, and a gallery that meets a slope's face or a bank opens there as a cave mouth (an `AccessPoint` of kind
  `mouth`).
- **Quarries and mine voids** — from S1's stone resource and the town's stone stock: the volume taken is the stone the town
  is built of — the wall volume of the stock whose material is stone (§2.6's material rule, read here as a quantity of
  stone, never as a shape; J-A65.45) and of the enceinte's walls and towers — × `wasteFactor` (1.6); the workings are laid on
  the frame's stone cells (`SiteResources.stone` ≥ 0.5) ranked by stone value, then nearness to the town, within `reachM`
  (2 km), under the town first where its own ground holds the stone (as the old quarries lay under Paris), as
  room-and-pillar galleries on a `roomM` (5 m) grid leaving `pillarShare` (0.35) of the rock, the area = volume ÷
  `headroomCm` (250); a working whose cover would be under `minCoverM` (6 m) is left to the hinterland's surface quarry
  (§4.9) and laid nowhere underground; a shaft opens at each working's centre (an `AccessPoint` of kind `shaft`). Mine
  voids read `SiteResources.ore` the same way, only where the roster holds a mining class.
- **Vaults** — cisterns and street and bridge vaults: under every bridge approach whose way rises over the ground beyond
  the banks, under way segments on slopes steeper than `vaultSlope` (0.12) where a street is carried on arches, and a
  cistern under the oldest precincts and the castle where `dist.water` exceeds `cisternDistM` (400 m) — each a chamber or a
  short run of vaults under its way or precinct, under public ground only (II.7.3's surface constraint applies).
- **A buried old town** — the settlement's own earlier street level under a raised grade (b (1)'s last source; item 65
  ruling 5; J-A65.46): the conversion kind `raiseGrade` (below; §4.11's union names it) is applied by an epoch (the
  evolution engine, staged) or by hand (a `convert`, §7.1). S1's terrain operator raises the region's ground by `raiseCm`
  (≥ 200 cm, a storey); the region's ways, plots and buildings at the old grade end on the ground (their existence `cleared`,
  §2.8) and fresh records of the `buried` part are the system's elements — each old way's centreline a gallery, each old building's ground storey a chamber, each new record a fresh entity of the `buried` part, minted from the conversion event's `seq` and ordinal as a mutation's added parts are (§6.3), the cleared records keeping their addresses on the ground: an address names its part and no batch writes two (§3.4) — while the ground above is
  re-derived on the new grade from the old centrelines (regrowth-first, §4.11: the streets keep their lines, the buildings
  rise on their plots). The conversion records the system it created or extended in `RaiseGrade.system`, so a replay after a log truncation reads its part number there, as a closure's `ClosureRecord.created` does (§2.9). So an undercity in it walks the old town's streets under the new. At generation none exists unless the port fills the staged `HistoryHint` (item 88) with a `fire` or `flood` scar (the `RaiseGrade.cause` types §4.2 S2 routes here) of `severity` ≥ the `buried` row's `scarSeverity` (0.5): the most severe such scar (ties: the oldest, by `yearsAgo`) makes one `buried` system, in the systems' stage order after vaults and gated to TOWN and above as every system is — its region the districts whose `growthStage` is 1 (its `sources`, §2.7), its galleries that region's way centrelines and its chambers their buildings' ground storeys, fresh records of the `buried` part (the system's lineage children, §6.3), laid `scarBaseCm + scarGainCm × severity` (200 + 200 × severity) cm below the present grade within *Depth bands*' cover rule (above); the town above is generated on the present grade as it stands, no `raiseGrade` event recorded and nothing cleared, and the rule draws nothing (our own rows, calibratable, an `extension` the parity presets turn off); with the hint empty, none.
- **Dug passages** — item 66's pieces (below).

**The connection graph (item 65 (d); J-A65.47).** A link (`UndergroundLink`, §2.7) joins two elements of different parts —
each end one vertex in its part carrying the `link_end` role (§2.2 rule 7), never a vertex two parts share (J-A65.31) —
with a `kind` (`open`, `gated`, `secret`, `collapsed`, `flooded`), a `via` (`breach`, `stair`, `shaft`, `door`) and a
`knownTo`; the surface links are `AccessPoint`s (II.7.4). The **connection stage** (`UndergroundLinkStrategy`, below)
runs last, after the undercity: (1) the undercity's lifelines (II.7.5) first; (2) for every pair of elements of different
systems within `linkReachM` (10 m) in plan and `linkDepthM` (8 m) in depth — found by reads across parts — one link per
pair within `linkSpacingM` (60 m), existing with the row's chance for the pair of kinds (sewer–vaults 0.6, catacomb–quarry
0.5, any–buried 0.5, sewer–catacomb 0.3, sewer–quarry 0.3, cavern–quarry 0.3, sewer–cavern 0.2, others 0.2; our own), so a
catacomb may meet the sewer or not; (3) its kind drawn by the row's weights (open 0.3, gated 0.25, secret 0.25, collapsed
0.15, flooded 0.05 — `flooded` only below the water table); (4) its `knownTo` `secret` for a `secret` link or a link into a
building with a concealed use, else `local`; (5) II.7.3's basement accesses (item 64). A link's kind follows the elements
it joins (II.6), and every link is an edit target (add, delete, `setAttr` on `kind` and `knownTo`, §7.1).

**The same engine, and the rest of the family's rules (item 65 (e)).** Every system is laid by the kernel's one cut
(J-A65.32): galleries as chains banded by `corridorUnion`, chambers as closed outline chains. Plots and buildings exist
only where a system hosts people — the sewer's frontage (II.7.3) and the undercity (II.7.5); a catacomb's, cavern's,
quarry's or vault's chambers carry none unless the undercity takes them. Every element is an edit target (draw, move,
delete, `setAttr` on kind, depth, width, state and `knownTo`; II.6's conversions and `flood`), every rule is a data row
(§7.6), the seed survives edits (§6.3), the dossier stays the authority for institutions (item 20), and every element
fades by II.6's condition table. **Light (item 68 (d′)):** catacombs are dark but for their shrine and ossuary lamps at the
chamber altars, caverns dark but where lived in (a glowing-fungus row only where the `magic` circumstance or the biome
allows), quarries and vaults dark but at their shafts and where lived in — §4.7's light table, context `arena`
underground and the system kind; every access or cave mouth that breaks the surface is a light shaft (§8.4).

**The pieces an access edit generates (item 66; owner: "if a user edits a building to have an access to the underground,
it generates all the necessary pieces"; the closure rule — one event whose batches commit together, the record of what it created,
exact undo, shared pieces kept — is §7.3 item 9's; J-A66.41).** `addUndergroundAccess(building, target?)` (§7.1) calls
these generators in dependency order at its dry run, each drawing on `sewer` keyed by the building's lineage, the
target's and the event's `seq` (§6.1; minted as J-A18.43 mints), so the same edit on the same seed gives the same pieces:
1. **The basement** — §2.6's basement decision with its probability forced: the request overrides the chance, never the
   terrain gate — a full cellar where the gate allows, else a half cellar or a walk-out on a slope, else a hatch to a
   crawl space under a raised floor (§2.6's requested-mode ladder), else a refusal naming the gate (F-EDIT, §5.2), never
   silent (J-A29.22 stands).
2. **The target** — the named element; else the most plausible reachable one: an open navigable sewer tunnel or an
   underground building's wall within `accessReachM` (II.7.3's targets), then within `digReachM` (60 m) the nearest open
   gallery or chamber of a catacomb, cavern, quarry or vaults, or an undercity walkway — ties by plan distance, then address.
3. **The connector** — when the target lies beyond `accessReachM`: a `dug` passage, a gallery chain in the `dug` system's
   part, routed by the kernel's path search (§3.1) on the frame's grid from the basement ring to the target — its cost infinite within `foundationClearM` (0.5 m) of every other building's footprint, basement ring and dug passage and wherever the water
   table (§2.6's gate values) lies above the passage's floor, rising with the rock class — inside the `dug` row's depth
   range, below the street's services (the network's `coverCm`, II.7.2) and above the water table; a route longer than
   2 × `digReachM` is a refusal with the reason.
4. **The system itself** — where no underground element lies within `digReachM` (a town without sewers, a village): the
   minimal private underground, the `dug` system with one passage to the most plausible outlet by the building's outlet
   row (default: another cellar of the same owner within reach, a catacomb or cave the site has, the riverbank, the shore,
   beyond the outermost enceinte; where the building carries a concealed use: beyond the walls, the riverbank, the shore, a
   catacomb or cave) — its outer end an `AccessPoint` of kind `mouth`, or a door into the other cellar. The settlement's
   sewer rows are unchanged — a dug passage is no network and `Features.sewers` is untouched — while `Features.underground`
   turns true (II.7.4).
5. **The access point** — II.7.4's record, its kind by the drop (II.7.3's *Basement accesses* (3)), `state` `open`,
   `knownTo` by II.7.3's *Basement accesses* (4), `source` `edit`.
6. **The plan** — the plan rung reserves the stair, ladder or hatch in the basement plan (§2.6, item 28), and the
   building's plan rung is marked `stale`.
7. **The links** — the connection graph gains the new links, typed (`open` at a dug passage's two ends).
The closure's other instances (§7.3 item 9 (d)) declare their own generators: a concealed front's missing door by §2.6's entrance rules (§4.7's *Concealed institutions* (4)), an undercity entrance's missing lifeline by the target, connector, access-point and link steps above (II.7.5). The bars are §13.2's T66
group.

```ts
interface UndergroundSystemRow {   // one per system kind; II.7.6's rules as data (§7.6); our own values, extension (every chance 0 in the parity presets)
  kind: 'catacomb'|'cavern'|'quarry'|'vaults'|'buried'|'dug'; chance: Partial<Record<Rung, Record<string /* source kind */, number>>> /* absent: none; never below TOWN */;
  depthM: [number, number]; coverM: number; gallery: { widthCm: Cm; wallCm: Cm; headroomCm: Cm } /* the kerb reads widthCm ÷ 2 + wallCm (§3.7) */; chamber: { minM2: number; ceilingCm: Cm };
  params: Record<string, number> /* the kind's own values named above: minAgeYears, burialRate, ossuaryShare, m2PerBurial, gridM, reachM; maxRockShare; wasteFactor, roomM, pillarShare, minCoverM; vaultSlope, cisternDistM; scarSeverity (0.5), scarBaseCm (200), scarGainCm (200) — the buried row's generation-time scar rule; digReachM, foundationClearM */;
  outlets?: { use: 'default'|'concealed'; order: ('cellar'|'void'|'riverbank'|'shore'|'beyondWalls')[] }[] /* dug only: the outlet rows of item 66's step 4 */ }
interface LinkRule { linkReachM: number /* 10 */; linkDepthM: number /* 8 */; linkSpacingM: number /* 60 */; chance: Record<string /* the sorted pair of system kinds, 'catacomb|sewer' … */, number>;
  kinds: Record<UndergroundLink['kind'], number> /* the kind weights */ }
interface RaiseGrade { op: 'raiseGrade'; region: Id[] /* the blocks or districts raised */; raiseCm: Cm /* ≥ 200 */; cause: 'fire'|'flood'|'rebuild'|'hand';
  system?: Id /* the buried system it created or extended, written when the conversion is applied; its address's under<n>/ prefix carries the part number a replay reads (§2.9) */ }   // a conversion kind (§4.11's union names it): the buried old town above
interface UndergroundSystemStrategy { derive(doc: Document, row: UndergroundSystemRow, ctx: StageContext, k: Kernel): KernelResult<{ system: UndergroundSystem; galleries: Gallery[]; chambers: Chamber[]; access: AccessPoint[] }> }
interface UndergroundLinkStrategy { link(doc: Document, rule: LinkRule, access: UndergroundRule['access'], ctx: StageContext, k: Kernel): KernelResult<{ links: UndergroundLink[]; access: AccessPoint[] }> }
// Stages registered after the network stage by declared I/O (§4.12): the systems in the order catacomb, cavern, quarry, vaults and, at generation, a history scar's buried system, each writing its own part; then II.7.3's and II.7.5's stages; then the connection stage last, which writes link records and access points and no geometry but their link_end and access_point vertices, one part per transaction; the StrategyRegistry's `underground` map (§14)
```
=== J-ROWS ===
| J-A72.50 | S7b allocates by a provisional, unstored band range, the one the district's pass-1 value gives; S10a writes the range from pass 2 and re-homes any household outside it before distributing to blocks, each move reported; a household no district's range admits housed in the district of the nearest range at that range's nearest band, reported, and one of a dossier's population that no capacity holds kept in its own district for §4.7's re-provision; F-SITING only for a household outside a dossier's population that no capacity holds | §4.5, §4.7 |
| J-A88.42 | the staged inputs' readers stated at their homes: `HistoryHint` the stage count (min(K, ⌈age ÷ yearsPerStage⌉)) and a fire or flood scar the buried old town only; `PowerRelation` a soft typing row and an alliance's spill in the political component; legitimacy on the governing power's amplification; a dossier institution's visible non-physical impairment on that institution's own dial term; the import share on the arable demand — each inert while empty | §4.2 S2, §4.5, §4.9, II.7.6 |
| J-A65.46 | a buried old town is the `raiseGrade` conversion: the old grade's records end on the ground and fresh records of the `buried` part become its galleries and chambers, the conversion recording the system it made; the ground above is re-derived on the new grade; at generation one exists only where the port's history hint names a fire or flood scar of severity ≥ 0.5 — the most severe laid under the growth-stage-1 districts at 200 + 200 × severity cm, the town above generated as it stands, no event recorded | II.7.6 |
| J-A65.49 | the geology flag an S0 toggle (auto, ordinary, soluble, volcanic); `auto` resolved at S1 by the feature table's geology row at S0's relief class, against one uniform S0 draws on `blueprint.features`; ordinary on a sky island and in the parity presets; the relief class itself an S0 site-request toggle (auto, plain, rolling, hilly, mountainous) whose `auto` the feature table's relief row draws (plain and rolling 0.35 each, hilly 0.2, mountainous 0.1), a dossier's `site.terrain` setting it by DR1 | §4.2, §4.9 |
=== RATIONALE-A ===
| J-A72.50 | Chose to let S7b allocate by the band range `bandRanges` gives at the district's pass-1 value — a provisional reading, never stored — and to have S10a, which writes the range from pass 2, re-home any household allocated outside it into the earliest district, in S7b's order, whose written range admits it and whose capacity holds it, before it distributes households to blocks, each move reported — a household no district's range admits going to the district, in the same order, of the nearest range whose capacity holds it, its band read at that range's nearest end (a derived band, reported), and one that fills a dossier's population and that no capacity holds staying in its own district, where §4.7's re-provision houses it (J-A20.72), F-SITING's ladder left only for a household outside a dossier's population that no capacity holds — over moving the range's writer to S7b, letting S10b's reconcile move households between districts, or sending every household no range admits to F-SITING's ladder, because S7b runs before pass 2 exists, pass 2's institution kernels may move a district's value, S10b's reconcile never reaches into another district (§4.7), S10a is the last eager town-wide step before the pooled districts read the range, and F-SITING's last rung reduces the manifest, which must never drop a household that fills a dossier's population (§7.7 item 2; §5.2; T19-4), while reading a band at the nearest range's end is the rule every prosperity-driven state of a building already obeys (§4.5's (5) and §4.7's S10a; item 72 (d‴); repair round 1, VPR0-03; repair round 2, VPR1-01). |
| J-A88.42 | Chose to state at each home the one reading of every staged dossier input item 88 declared — `HistoryHint` setting the stage count to min(K, ⌈ageYears ÷ yearsPerStage⌉), the later walled stages folding into the last kept one, its fire and flood scars read only by II.7.6's buried old town and every other scar by no rule, the creation week showing a finished town (J-A67.47); `PowerRelation` a soft `adjacent` or `avoid` typing row between the kinds its powers' identity rows name and, for an alliance, a spill of 0.25 × its strength between the two powers' political alignments; `PortRows.legitimacy` multiplying the governing power's amplification; a dossier institution's visible non-physical impairment lowering the impaired institution's own dial term, read from that institution's impairments and never from a settlement-wide `ConditionOverlay`; the hinterland row's import share multiplying the arable demand — each inert while the port leaves it empty, over naming the readers only in the records' comments, because a hook the design names must be a mechanism at the stage that reads it, each, while empty, leaves the base as it is, so no emulation changes, and an impairment is a fact of one institution (§7.7's F4 row), so it moves that institution's term alone (§4.2 S2, §4.5, §4.9, II.7.6; item 88; repair round 1, V-MC0-17, VPR0-15; repair round 2, VPR1-03). |
| J-A65.46 | Chose to make a buried old town the conversion `raiseGrade { region; raiseCm; cause }`, by an epoch or by hand: the region's ground is raised by S1's terrain operator, its records at the old grade end on the ground (`cleared`) and fresh records of the `buried` part — minted from the conversion event as a mutation's added parts are — become the `buried` system's galleries (the old streets) and chambers (the old ground storeys), the conversion recording the system it created or extended in `RaiseGrade.system` so that a replay reads its part number there, while the ground above is re-derived regrowth-first on the old centrelines, over copying the old town into the underground, succeeding each old record into another part or deriving buried towns at generation without a recorded cause, because no geometry may live in two arenas at once (J-A12.43), an address names its part and no batch writes two (§3.4), the cleared records keep each old place's history addressable, and "the evolution log supplies it" — a settlement without that history has none. Chose, where the staged port names such a history, that the most severe `fire` or `flood` scar of `HistoryHint` whose severity reaches the `buried` row's `scarSeverity` (0.5; ties the oldest) makes one `buried` system at generation, after vaults in the systems' order — its region the districts of growth stage 1, its galleries their way centrelines and its chambers their buildings' ground storeys, laid 200 + 200 × severity cm below the present grade, the town above generated on the present grade as it stands, no `raiseGrade` recorded and nothing cleared, our own calibratable rows and an `extension` — over a `raiseGrade` replayed at creation or no buried town before an epoch, because the creation week shows a finished town (J-A67.47), so nothing is cleared or re-derived at creation, a scar is the dossier's record of the earlier town, the oldest core is what a fire or a flood rebuilt over, and a rule that reads only the scar and the stage-1 geometry draws nothing, so a seed reproduces it (II.7.6; item 65 (b)(1), ruling 5; item 88; amendments-c, pipeline seat D; repair round 1, VKC-10, VPR0-09; repair round 2, VPR1-04). |
| J-A65.49 | Chose to make the site's geology an S0 landscape toggle whose `auto` S1 resolves from the feature table's geology row at S0's relief class — P(soluble) from 0.10 on plain ground to 0.30 on hilly and mountainous ground, P(volcanic) from 0 to 0.10, our own calibratable rows — against one uniform S0 draws on `blueprint.features` with the other auto features, and to give the relief class that row, S1 (1)'s amplitude and §4.9's farm modes read one source of its own — an S0 site-request toggle (`auto`, `plain`, `rolling`, `hilly`, `mountainous`) whose `auto` the feature table's relief row draws on the same stream (our own weights — plain and rolling 0.35 each, hilly 0.2, mountainous 0.1 — calibratable; not an `extension`, since S1 (1) scales its heightfield by a relief class under every preset), a dossier's `site.terrain` setting it by DR1 — over a draw at S1 on a terrain concern, a flag fixed by the biome or a relief class no rule chooses, because every auto feature is S0's single draw, taken ahead of all stages and never redrawn by a later rung, the geology chance depends on the relief, one uniform read against monotone thresholds changes the result only where the relief changes it, a key three rules read needs one writer, and a user or a dossier that knows the rock or the relief sets the toggle (§4.2 S0, S1 (1), S1 (10), §4.9; item 65; seat D note 9 (a); repair round 1, VPR0-12; repair round 2, VPR1-12). |
=== END ===
