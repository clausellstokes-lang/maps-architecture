=== REPLACE ### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace ===
### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace

**S0 Blueprint.** `Blueprint = { version, seed, size: { rung: TOWN|CITY|METROPOLIS, population? | areaHa? | buildings?,
tolerance, aspect /* 0.5–2, default 1: frame width ÷ height, §3.2 (9) */ }, intent (§7.7), site request (coast side /
bearing with two arm rows, river with inflow bearing, islands and mouth, lake, hill, …), toggles (walls, castle:
'inside'|'on_enceinte'|'outside'|'auto'|'none', castles: 0–2, plaza, temple, harbour, farms, forests, shanty, greens,
waterfront: 'open'|'quay_wall'|'sea_wall', wallPlacement, moat: 'none'|'inner'|'all'|'auto' /* the innermost enceinte
(S3) or every enceinte (outer ones by S5a's carve, §4.4) */ — MFCG's flags kept as intent), circumstances (era,
government, biome, economy, landscape toggles: fertile land, mines, quarries, fishing, logging), style, assignments,
edits }`. Intent expansion, and the blueprint's assignments and edits entering the log, are §7.7's; the population
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
(1) **Heightfield:** 5-octave fBm (VG's measured character, `_critic-vg-ng.md` V7) with a low base frequency and a
relief-character amplitude (flat / rolling / hilly / mountainous, metres by class), plus **authored site primitives**
from the request (hill, spur, valley along the river bearing, terrace, cliff, ravine, hollow for a lake — VG's
`createMount/Hollow/Ridge` idea). Heights are stored in the range and datum §2.3 declares; S1 sets `datumCm` to sea level
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
is a widening width profile (MFCG's `deltaRiver` is a widened mouth, `_critic.md` C15); `mouth: 'delta'` splits the
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
edges; land components by flood fill (MFCG's `buildDomains`), every one given uses later (O14 g). **Shore setback
(COV-FTG-H07):** a table `shoreSetback` per bank kind — plots: beach 6 m, marsh 10 m, rock 3 m, cliff 5 m from the edge,
quay 0 m (quay plots front the quay way); fields: 10 m — read by S10 and the hinterland unit (§4.9); the band is typed
`shore` greenery or commons. (9) Drainage stays queryable. (10) **Resources (COV-FTG-B09):** `SiteResources` rasters on
the terrain grid — stone from slope, rock class and cliffs; ore from relief × an fBm propensity (hills only); timber from
the forest propensity (slope and soil class; realised as woods by the hinterland unit, §4.9); fish from water adjacency
and reach width; clay from low damp river flats; fertile land from gentle, dry, non-rock ground. The S0 landscape toggles
clamp a kind to zero or raise its floor; S2's resource gates and S12a's outside sites read these rasters.

**Restart-free by design:** a requested feature infeasible on the drawn site is adjusted inside S1's own ladder (F-RIVER,
§5.2), never by regenerating the whole map.

**S2 Programme (the roster demand side; O7).** From `population` (or derived from area or buildings by the size tables):
households by wealth band; institutions (market, temple, churches per capita, guild halls, inn, mill on water, tannery;
the seats the `government` circumstance forces, §10.2, COV-FTG-B13); building demand per class from **our own**
dependency tables run as §10.2's sequential, prefix-stable roster (FTG's idea, none of its values), with resource gates read
from `SiteResources` ("no farmland → no farms, shops instead"). Outside classes (farmsteads, mills, quarries, lumber yards,
fisheries, mines) are demanded here, sited by S12a and placed on the outside plots the hinterland unit builds (FTG-7).

*Demand in plot counts (FTG-2; J-P6).* Stage demand is **plot counts per class × band**: `n(c, b, k)` = the class's demand
× the band shares × stage k's quota share. Residential band shares are the roster's household wealth shares (shifted by
the character vector); workplace bands come from the class row's lifestyle band. Stage land is
`A_k = Σ_(c, b) n(c, b, k) · plotArea(c, b) / plotShare(regime_k)`, with `plotArea` the *plot* area of the granularity
table's band centre (§4.7; footprints and coverage are not in the formula) and `plotShare` the measured share of a stage's
land that is plots (the rest is corridors, squares, greens and residue): **dense core 0.62** — MFCG's gross lot cover
inside the wall is 0.60–0.65 at sizes 40–250, its lots being plots in our sense
(`captures/mfcg/exports-sweep-2026-09-25/README.md`, CONFIRMED) — gapped rings 0.55, ribbon 0.45 (PLAUSIBLE).
**Measurement:** M-1 #5 (FTG face recovery) measures FTG's plot share; M1 measures B-CITY's own per regime.
**Fallback:** if S5d's top-up fires on more than 10 % of B-CITY seeds at a rung, the `plotShare` rows are refitted from
B-CITY's measured share per regime by one scripted pass, with a declared golden shift (§13.3).

*Stages and the walled share (MFP-6; J-P5).* Stage rows per rung (a table, era-calibratable): **TOWN** 2 stages — walled
core 0.90 of buildings, ribbon 0.10; **CITY** 3 — inner walled 0.55, outer walled 0.33, ribbon 0.12; **METROPOLIS** 4 —
inner 0.30, middle 0.30, outer 0.28 (all walled), ribbon 0.12. FTG's cul-de-sac **suburb** regime is added only by the era
or form preset or by the shanty toggle. The share inside the outermost wall is thus ≈ 0.9 at TOWN and ≈ 0.88 at CITY and
METROPOLIS, anchored on MFCG's measured 0.87–0.92 inside the wall at sizes 40–250 with shanty towns off (sweep README,
CONFIRMED); FTG's ≈ 20 % walled preset stays reachable as a preset row, and the corpus phase recalibrates the rows.
**Output:** `Roster` (demand by class with area / frontage requirement classes, district affinities, wealth bands) and
`StageQuotas[]` (plot counts per class × band, land area and regime per stage: dense core → gapped rings → ribbon, plus
the optional suburb; FTG's zonal gradient, R4).

**S3 Siting, reservations, the stage-1 boundary and its trace (J-P26).** S3 decides everything the first enceinte depends
on in one construction — the gate routes are solved first, the stage-1 boundary is the travel-cost level set over them,
the gates are where the routes cross it, and the castle weld and the moat are placed on the trace pulled from that
boundary, so no later stage recomputes a boundary they were fixed on — and commits it in two batches, L0 (every water body
it carves, with the decks its crossings need) then L1 (the land reservations), before S4 commits a single way.
1. **Centre(s).** Candidate centres on a coarse lattice inside the frame's middle third are scored by a rule table —
   distance to a crossing site (river towns sit at fords and bridges), to the harbour candidate, slope, elevation above the
   flood line, wind exposure, distance from the frame, and a controlled random term; the best is the **centre / market**.
   **The site is placed relative to the river** (G-P14), so "no river through the core" cannot occur when a river is
   requested; the invariant is checked here and repaired by moving the centre, never by re-rolling. **Polycentric forms
   (IMP-9):** the `twin-town` and `polycentric` form rows site k = 2–3 nuclei (candidates inside the frame's middle half),
   each scored the same way, each with its own share `A_1,i` of stage 1's land (a form-row share), its own main plaza (2)
   and its own gates (4); the market sits at the highest-scoring nucleus. Nuclei are sited at least the **separation
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
   cathedral precinct** adjacent to the main plaza by score, sized from its institution row; a separate **market square**
   when the roster asks for one (CITY and above); the **harbour basin** (a template shape — rectangle, semi-octagon,
   semi-hexagon, L wide or narrow — scaled to port demand) at the chosen harbour candidate; and **canals** along a
   least-cost line between two water bodies, each carrying decks of S1 (5)'s form at the spacing row `canalDeckSpacingM`
   (150 m inside the predicted built extent, 600 m outside it). These are planned polygons here: the lattice sees them as
   reservations and water (water impassable except along its decks), and they are committed in (10) and (12).
3. **Lattice and costs.** S4's candidate lattice and its edge costs (§4.3) are built here, once, over the planned water
   and reservations of (2).
4. **Gate picks and bearings (MFP-4, COV-MFCG-E04; J-P24).** `N₁` (per nucleus) = the request, or
   `round(1 + 0.47 · √A_ha)` with A the stage-1 land — a law that reproduces MFCG's 5 / 8 / 12 gates at sizes 40 / 80 / 130
   from their walled areas of 58 / 220 / 548 ha, and 18 at size 200 (receipt
   `docs/validation/bench/fixall_pipeline_mfcg_fits.out`). Picks are **sequential nested picks** from the `gate.pick`
   stream on the **pick contour** — the level set of stage 1's land in the terrain-only field (a = 1), which serves only to
   score candidates: pick i scores the contour's candidate points by angular gap to the earlier picks, nearness to a
   requested bearing, terrain (saddles and valley exits up, steep ground down) and a jitter, so a smaller N is always a
   prefix of a larger one. Each pick carries a **bearing**: the requested bearing it serves or, when none was requested,
   the least-cost outward direction from the pick to the frame. A polycentric nucleus's first picks are forced at the
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
   measurement of the harbour pick (4) fails and, whatever it finds, when the harbour's nucleus had no unforced pick left
   to force.
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
12. **Land reservations → the L1 batch.** The plazas, the precinct, the market square and the castle bailey enter L1 as
   barrier faces carrying the `reserved` role: no way crosses them (S4, S5), S8 does not cut them, and the claimed entity is
   built inside them (§4.7, §4.8). Every other claim larger than a block is S7b's (§4.5 S7b (3)).
13. **Destinations** are typed entities: the plazas' attach points; each gate and its bearing (an **external bearing** per
   gate for a walled town; an unwalled town derives its bearings by the same law on its own land); the **town bridge** —
   the crossing site nearest the centre when a river passes through the stage-1 region, which (1) scored the centre
   against, connected in town (§4.3) — while every other site becomes a bridge only when a route (S4) or a growth proposal
   (S5c) uses it (S1 (5)); the harbour (its destination node is its basin's landward attach point; its route, (11)); the
   castle's town-side gate; the precinct. **Island towns (FTG-19):** when the settlement's land component does not touch
   the frame, external destinations are shore points — the harbour, one **landing** per requested bearing (the shore point
   nearest the bearing with the best deep-water score) and a ferry point — and O4 (g) counts landings as the external
   connections.

