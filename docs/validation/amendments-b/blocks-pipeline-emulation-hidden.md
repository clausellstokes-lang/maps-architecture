# blocks-pipeline-emulation-hidden — lane amendments-b/amend-pipeline-emulation-hidden (PIPELINE part; seat
# pipeline-emulation-hidden; HOME items 24, 25, 26, 27, 30 — the emulation and hidden rule families; REFERENCING item 23).
# Generated from the live docs/ARCHITECTURE.md (sha256 1dbfd9d4f39723ee…; its only difference from the route's snapshot
# 7a4e19db… is the banner line, which no block here touches) by scratchpad/peh/gen.py: each REPLACE block is the live
# subsection with asserted single substitutions, every untouched line verbatim. Text before the first "=== " line is ignored.
# ASSEMBLER NOTES: (1) the REPLACE of §4.2 CARRIES blocks-pipeline-assignments' APPEND to §4.2 ("S2 need propagation")
# verbatim at the end of S2, as that seat asked — do NOT re-apply that append after this file (it would duplicate);
# (2) the REPLACE of §4.5 carries blocks-pipeline-evolution-islands' replacement text for S7b (5) (its cross-note to this
# seat) and the sewers seat's S0 toggle entry; the sewers seat's APPENDs to §4.2 and §4.5 land after this file, as they
# expect; (3) §4.7 and §4.11 are other seats' REPLACE homes and get APPENDs only here — for §4.11 in particular, apply this
# file's APPEND block AFTER blocks-pipeline-prosperity-change-dossier-plan.md's REPLACE of §4.11 (that file's header asks
# exactly this: its REPLACE carries the assignments' and evolution-islands' §4.11 appends and expects this file's item-25
# block to be applied after it); in plain name order this file's §4.11 append would be overwritten without a report;
# (4) J-A ids are dotted, as the protocol states (the resolver's one-character widening is already flagged by the kernel seat).

=== APPEND TO SECTION ### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker ===
* **Emulation-first defaults, read once for every stage of this part (item 23; the rule's home is §7.6).** Every stage
  rule of §4 is a table row whose default cell reproduces the reference behaviour it emulates — MFCG's or FTG's, chosen
  under §1.4's tiebreaker where both have the behaviour — and carries §7.6's provenance marker; a row the references lack
  is marked `extension` with its chance, weight or option (§10.2's `RelationRule.extension` and §4.7 S10b's
  `placement.extensionWeight` are the placement family's version of that marker). Where a stage rule in this part says
  "always", "never" or "first … then", it states that row's default value, changeable per region, era and setting
  through §7.6's override chain — never a law of the generator; engineering invariants (planarity, "never re-rolled",
  "never stored", work limits) are not settlement rules and are not table values. The parity presets that §13.6's
  side-by-sides run set every `extension` row to its off value, so the default configuration lands inside §13.5's
  reference bands (J-A23.41).
* **The countryside is decided with the town and drawn after it (FTG's order; item 26).** S2 demands the hinterland's
  households and its food, fuel and timber with the town's (§4.2 S2; §4.9's farm table), S12a sites them once the town's
  districts are typed and its claims cut (S7b), and the hinterland unit draws fields and woods into the land the
  settlement perimeter leaves after S9 has committed the town's corridors — concurrently with the districts' pooled
  stages, which changes no output (§4.9; J-A26.41).

=== REPLACE ### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace ===
### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace

**S0 Blueprint.** `Blueprint = { version, seed, size: { rung: TOWN|CITY|METROPOLIS, population? | areaHa? | buildings?,
tolerance, aspect /* 0.5–2, default 1: frame width ÷ height, §3.2 (9) */ }, intent (§7.7), site request (coast side /
bearing with two arm rows, river with inflow bearing, islands and mouth, lake, hill, …), toggles (walls, castle:
'inside'|'on_enceinte'|'outside'|'auto'|'none', castles: 0–2, plaza, temple, harbour, farms, forests, shanty, greens,
waterfront: 'open'|'quay_wall'|'sea_wall', wallPlacement, moat: 'none'|'inner'|'all'|'auto' /* the innermost enceinte
(S3) or every enceinte (outer ones by S5a's carve, §4.4) */, sewers: 'auto'|'on'|'off' /* item 14: resolved by the
sewer-feature rule of this section (II.7.1) */ — MFCG's flags kept as intent), circumstances (era,
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
(S3 (1)) and the character vector's mercantile shift; at TOWN a secondary market is drawn with the row's
`secondaryChance` (0.15) rather than by count, so towns rarely have one. A market is a `Reservation` of kind `market`
with a `rank` (§2.5): the principal one is sited by S3 (12), every secondary one is a district claim of S7b (§4.5 S7b
(3)), and each has its `market` district (§4.5). The market hall's and the market trades' rows read a market's rank
(§10.2), and the roster's churches are demanded per capita as before (MFCG spawns several). The sequential roster keys
each market by ordinal, so an epoch's suffix may add a secondary market, which the epoch's S7b claims by the same rule
(§4.11).

*The hinterland's demand, decided with the town's (item 26; FTG-7).* The farm table of §4.9 turns the population into
farm households and arable land, and its fuel and timber rows into the wood the settlement burns and builds with —
`farmsteads`, `coppiceHa` and `managedWoodHa` are demanded here, the outside classes' `produces` and supply edges (§10.2)
carry them into the need propagation below, and the hinterland unit sizes the fields and woods it draws to them under
§4.9's mode and extent rules. The countryside is thus decided with the town and drawn after it, FTG's order.

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
   market is S7b's claim (§4.5 S7b (3); item 24); the **harbour basin** (a template shape — rectangle, semi-octagon,
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
12. **The principal market, then the land reservations → the L1 batch.** *The principal market (item 24; owner: "the
   central market does not actually have to be central to the city").* Before the batch, with the gates (7), the trace (9)
   and the harbour route (11) fixed, the principal market's site is chosen by the **trade-convergence score** over the
   candidate sites — a rule table (`market.siting`, §7.6; our own rows) with a controlled random term of share 0.1 from
   the `reserve.market` concern (§6.1). The candidates, each with its form and its score terms (defaults):
   * the **main plaza** of each nucleus (2) — the plaza itself then carries `rank: 'principal'` (MFCG's central market;
     its attach points are the market's): kind 1.0, routes 0.5 × the fraction of gate routes (5) rooted at it;
   * each **gate**, inside or outside (7) — a flanking square around the gate route's stretch just inside or just outside
     the gate, beside the gate plaza (§4.8): kind 0.3 inside or 0.15 outside, trade 0.6 × the gate bearing's trade weight
     (its trade row, §4.7 S10b);
   * the **town bridge's landward ends** (13) — a flanking square around the bridge approach S4 routes to the deck's bank
     vertex (§4.3): kind 0.35, traffic 0.5 × the fraction of arterials whose bearings lie across the river;
   * the **harbour's landward attach** (11) — a flanking square between the basin's attach point and the harbour route:
     kind 0.4, trade 0.6 × the port demand fraction (the manifest's classes with `requires: 'coast'`, §10.2);
   * the **busiest inward street** — the middle third of the street of the gate of highest trade weight — a flanking
     square astride it, a widened main street: kind 0.25, trade 0.4 × that gate's trade weight.

   Slope, the flood band and wind exposure enter as (1)'s site penalties. With these defaults an inland walled town's plaza
   wins — the routes converge there — so the default reproduces MFCG, and the parity presets pin the plaza by setting every
   other kind weight to its off value (item 23); a port, a bridge town or a gate-focused trade may put the principal market
   at the water, the bridgehead or the gate. A **flanking square** is a `market` reservation of the principal row's area
   band (the plaza band of (2)) laid astride its way's stretch, that way passing through it as an arterial passes a gate
   plaza (§4.8): the reservation is impassable to every other route except at its `attach` points — the two points where
   its way enters and leaves and the midpoint of each flank, where a side street may end as at a plaza — and S4 places
   `width_knot` vertices at those two points (§4.3), so the square reads as the widening it is. The chosen site, its score
   and the runners-up are recorded in the report; `setAttr` on the reservation's `rank` or a `drawBoundary` moves the
   market by hand (§7.1). *The batch.* The plazas, the precinct, a flanking principal market's square, and the castle
   bailey enter L1 as barrier faces carrying the `reserved` role: no way crosses them (S4, S5) other than a
   flanking market's own way, S8 does not cut them, and the claimed entity is built inside them (§4.7, §4.8). Every other
   claim larger than a block, every secondary market included, is S7b's (§4.5 S7b (3)).
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

=== APPEND TO SECTION ### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph ===
**Markets as destinations (item 24).** A flanking principal market (§4.2 S3 (12)) is on its way already: S4 commits that
way through the square between its two `attach` points and places a `width_knot` at each, so the square is a widening
of the street's profile (§2.2 rule 5); a side street may end at a flank's midpoint attach as at a plaza. Every
other market — the plaza when it carries the principal rank, and S7b's secondary markets (§4.5) — is reached as a plaza
or a claim is, at its attach points; no market re-roots the plaza-rooted tree or the field `T` (J-A24.41).

=== APPEND TO SECTION ### 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check ===
**Markets and `T` (item 24).** `T` keeps its root at the plaza(s) whatever site the principal market takes (§4.2 S3 (12)):
an off-centre market is a destination the routes already serve, and the stage boundaries and gates are the centre's
(J-A24.41). A secondary market S7b claims in a later stage (§4.5 S7b (3)) seeds that stage's district typing and its
prosperity kernel (§4.5), never its growth.

**The arable reserve (item 26; off by default).** When the farm table's `reserveArable` is on (§4.9), S5c's legality adds
one soft term in the extramural regimes — ribbon, suburb, unwalled rings and the ground between polycentric nuclei: while
the fertile land left outside the built extent (`SiteResources.fertile` cells of frame and margin outside the boundary,
§4.2 S1 (10)) is below the arable demand S2 recorded (`arableReserveHa`), a proposal onto a fertile cell is priced by
`reserveArable.penalty` (default 3, a multiplier on its cost), so growth prefers poorer ground and the countryside the
demand needs stays clear as a tendency; a shortfall S5d then finds is reported (F-BUDGET-STAGE), never repaired by a
restart. Off, the term is absent and growth ignores fertility, as both references do (J-A26.43).

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
claim, one `market` district per market, item 24 — the harbour, gates, castle, temple precinct, river banks, parks) plus a
density-guided remainder; a grower (MFCG's `DistrictBuilder` / `Grower` idea) claims adjacent coarse faces
of the L1 skeleton with `validateEdge` = (no arterial of class ≥ primary, no wall trace, no water, no reservation
boundary) unless the seed kind allows it and `validatePatch` = (area within the district band, compactness ≥ 0.5, no
hole); `check4holes` → split; faces below the floor merge into the neighbour with the longest shared edge. **One law for
count and band (MFP-10):** `N_d = round(3.5 · √(A_ha / 10))` over the settlement's land A (FTG's 10 ha anchor sits in its
middle), band `[0.5, 1.5] × A / N_d`, so the mean district grows as √(10A)/3.5 — ≈ 7 ha at 60 ha of land, ≈ 13 ha at
250 ha, ≈ 21 ha at 600 ha. A district's `faces` is a `FaceRef` (§2.5): its L1 faces and every face nested in them (§3.3
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
prosperity field (§10.4) — so no district is zoned residential or by class. **Shanty districts (FTG's rule as the
default; items 27 and 23).** A **shanty / squalid** kind is admitted only when the roster's **average band** — the
household shares' mean over the band set below — is `poor` or `squalid`, and only once the settlement's first half is
built (`shanty.trigger`, `shanty.afterStageShare` 0.5; provenance `ref:FTG shanty rule`); where admitted it replaces a
lower-class district's typing and takes the tents row (§4.7 S11). Our preference that shanties lie outside the enceinte
is the `shanty` kind's `extramural` relation row — soft, `extension: true`, weight 0.6, zero in the parity presets — a
tendency, not a law (J-A27.43); the `shanty` toggle (S0) forces the kind on where FTG's trigger would not fire. MFCG's
"one prominent feature per named type" survives as the district's `namingFeature`. A district's `fabric` is `bent-cut`
unless a template is requested (II.1, II.2).

**Fields (owner: prosperity is a gradient and a band; AM-6).** The **prosperity field**
`P(x) = Σ_i w_i · kernel_i(x) + characterOffset(district) + ε(x)`, clamped once to [0, 1], with driver kernels from a
table: distance decay to the plaza and to every market — the principal at the row's full weight, a secondary at the
secondary row's (item 24) — to main streets, gates, water and the harbour (+); elevation above the flood line
and upwind (+); low, damp, downwind, flood-prone (−); walls (−); attractors at the reserved institutions (castle,
precinct, plaza); `ε` a low-frequency fBm from the field's own sub-stream with a declared share (default 0.15); smoothed
by a Gaussian of one block width (σ ≈ 60 m at CITY) so neighbours vary gradually; stored per coarse face and as a raster.
*Mechanism (budget: §12.4):* 32 m cells over frame + margin; each driver kernel splatted within its radius (or one
distance transform per driver class); the Gaussian an O(N) three-box blur. It is computed in **two declared eager passes**
(LC-2): **pass 1** here, from the drivers that exist after S5 (the kernels S5d uses); **pass 2** at S10a (§4.7), adding
the kernels around the noxious trades, prisons, middens and institutions the block allocation placed. S6's typing and
S8's block bands read pass 1; S10 onward reads pass 2.
* **The band set — the references' wealth models as the default (item 27; owner: "prosperity is a gradient and a band
  rather than binary").** The bands are one named, versioned table, `prosperity.bands` (`BandSet`; §7.6), read by every
  rule table that keys a row by band: granularity, site plans and designation templates (§4.7), greenery (§4.9), the
  hidden-plot shares (§4.6), the island supply law (II.6), the ladder rows (§4.11), the interior ladder's rows, read at
  the occupants' band (§2.6, item 28 (f)), and the roster's household and lifestyle rows (§10.2). The default set has
  **six bands**, in order, each declared equivalent to the reference class it reproduces:

  | band | FTG lifestyle tier it reproduces | MFCG ward class it reproduces (the open-source model's) | default household share (FTG's captured distribution, weights 1 / 1 / 20 / 40 / 20 / 10; provenance `ref:FTG lifestyle distribution`) | rows of the four-row tables it reads |
  |---|---|---|---|---|
  | `squalid` | squalid | slum | 0.011 | poor / dense (with the hovel and tents rows, §4.7 S11) |
  | `poor` | poor | slum | 0.011 | poor / dense |
  | `modest` | modest | craftsmen | 0.217 | modest |
  | `comfortable` — **the middle band** | comfortable | craftsmen | 0.435 | interpolated between modest and prosperous |
  | `prosperous` | wealthy | merchant | 0.217 | prosperous |
  | `rich` | aristocratic | patriciate | 0.109 | rich |

  MFCG's ward-class shares — 0.70 / 0.17 / 0.07 / 0.07 of the open-source model's 30 class-typed ward-deck entries for
  craftsmen, slum, merchant and patriciate (receipt: `research/findings/os-model.md`, the deck's composition) —
  are the anchor of §13.5's built-land share per band group, never a district typing (J-P1). A rule table may carry rows
  for some bands only: a band without a row of its own takes the linear interpolation along the value between the
  nearest rowed bands' centres — the existing rule; that is how the four granularity rows serve six bands — and an end
  band takes the end row. The **middle band** — the band §4.11's geometry floor bounds a once-richer plot's manifested
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
`FieldBands`. A second S6 pass applies the district-type term after typing.

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
3. **District claims (J-P41).** Every item larger than one block — institutions whose requirement exceeds the district's
   block band, the district's share of the park and green quota (§4.9), area-bearing assignments, a castle's esplanade —
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

=== REPLACE ### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule ===
### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule

S8 runs per district (one batch each, districts in lineage order in the generation worker) on every coarse face of the
district except its reservations (a reservation inside a face is a hole) and its wall strips (faces S8 never cuts, §4.8)
whose kerb polygon — `kerb(F)`, the kernel's single kerb function: the face minus the buffered spines, §3.7 — is larger
than **the district class's block band** (the granularity table, §4.7, at the district's pass-1 band), floored by the
stage regime's band (§4.4). In walled regimes the faces are district-scale (S5c grew only arterial-connecting
secondaries), so this recursion produces every intramural lane and secondary and propagates the wall's and the shore's
direction into the fabric (MFP-2). S8 plans each cut on `kerb(F)` of the current L1 faces, inserts each accepted lane at
L1 in the district's transaction, extended to the crossed spine as a T-junction (step 7), and recurses on the children's
kerbs; S9's `corridorUnion` then commits exactly those kerbs (contract test "S8's working block ≡ S9's committed block,
Hausdorff 0", §13.2), so no `insetRing` by corridor half-widths is needed (GEO-20). **The wall is a barrier:** S7 has cut
each enceinte's wall strips off the faces beside the trace (§4.8), so the `kerb(F)` of a face beside a wall stops at the
strip's boundary — the inner setback line, or the intervallum's kerb where the era row has one — and no cut is planned
through a wall's band or setback; the band, tower and gatehouse faces are built later inside the strips by S10's step (0)
(§4.7), so S8 never meets an L3 face. **Test:** on every walled B-CITY seed, 0 lanes cross a wall strip and 0 L3 band
faces are cleared or split by an L1 batch.

**Sides (GEO-22).** Before any rule reads a side, the face boundary is reduced to **runs** (the kernel's `sideRuns`,
§3.4): maximal boundary chains whose cumulative turning stays within 10°, each with its chord direction; a crossing
street's fillet arc is replaced by its virtual corner (NG PF-1's method). "Perpendicular to a side" is measured against the
run's chord or, on a curved run, against the tangent over a ± 5 m window at the contact point — never against the one short
segment a cut happens to hit on a Chaikin-smoothed, round-joined kerb. M0 (b)'s face set is §16's.

**The recipe (MN-3; `profile-neighbourhood.md` AN-6, PF-2, BG-1 — the measured default).** Given a face F:

1. **Stop test.** `obb(F)`; if the OBB minor extent < the band's upper bound, F is a block. **Slope term (COV-MFCG-C05):** on
   a face whose mean slope exceeds 5 %, the working major axis is the OBB major axis rotated toward the contour direction
   by the weight `min(0.5, slope / 0.3)`, so cuts on a hillside run with the fall line and blocks lie along the contours
   (MFCG's one elevation effect is on exactly the alleys).
2. **Position.** Draw `f ~ N(0.5, σ)` as a fraction of the (working) major axis — σ = 0.066 on plain faces, 0.098 on holed
   or annular faces — with an outlier term: with probability 0.03 draw `f` uniform over [0.15, 0.85] instead (NG's 2–5 %
   tail); no clamp (the measured law is bell-shaped with no pile-up at a bound); `f` outside [0.1, 0.9] is redrawn once
   from the same stream. Stream `cut.t`.
3. **Start.** The minor-axis line at `f` meets F in one segment around the OBB centre's projection (for a concave face, the
   segment containing the point nearest to it); its two ends are the candidate starts, one on each long side, which
   defines the start and far sides for any face shape — triangles, C-shapes and curved faces included. A coin
   (`cut.side`, p = 0.5; the table row `cut.sideLongerBias` records NG's unconfirmed 2 : 1 lean in plain faces and
   defaults to 0.5) picks the start A. Leave A exactly perpendicular to its run.
4. **Far side (J-P16).** The side hit by the perpendicular ray from A (NG's R1: right in 66 % of cuts, the best face rule
   measured). `cut.farSideAlt` (default 0) is the probability of taking the next reachable side instead.
   **Measurement:** M0 (b) compares our block-area, cut-length and junction-angle distributions with NG's on the same
   faces. **Fallback:** if they fail the KS test with R1 alone, `cut.farSideAlt` is set to 0.34 (NG's measured mismatch
   rate) and the test re-run; if that also fails, the far side is taken from the minor-axis line through A (NG's R4) — each
   step a table value, not a code change.
5. **Straight or bent.** If a straight cut would reach the far side within 2° of perpendicular, keep it straight along the
   mean of the two run normals (NG: 83 of 86 straight cuts join roads within 4–6° of parallel); otherwise place **one corner
   at half the perpendicular projection A–F** (F = where the first leg's line meets the far side; NG AN-4: within 0.05
   chord of the course midpoint in 96 of 120 cuts) and drop the second leg perpendicular to the far side's run. Two bends
   never (3 / 519).
6. **Fillet (COV-NG-N19).** With probability 0.53 (NG: 201 / 379, no predictor found; stream `cut.arc`) replace the corner
   by an equal-chord circular arc whose **tangent length is `r_t` × the shorter leg**, `r_t ~ N(0.73, 0.10)` clipped to
   [0.54, 0.87] (NG PF-2 e: p10 0.54, p50 0.73, p90 0.87, ρ = 0.94 with the shorter leg) — the radius follows from the
   legs, never a constant; chord steps equal and ≥ the lattice minimum edge.
7. **Ends in the model (GEO-21).** Each junction end is extended along its arrival direction from the kerb to the crossed
   spine and inserted there as a T-junction (`splitThrough`, §3.4), so the L1 face splits and the lane joins the street
   graph, the junction census, betweenness and R3. NG's "stop half the crossed road's width short, square caps" is the
   renderer's stroke rule, which S9's corridor union and junction wedge produce without model trimming. A cut end that
   meets a dead end or a hole follows §3.6's contact semantics (an antenna end becomes a T-junction; a hole is joined by
   `connectHole`, §3.4). An end that arrives at a wall strip's setback line — a boundary with no spine — stays there,
   square to the line, as a lane ends at a reservation; an end at the intervallum is a T-junction like any other.
   **Seam portals (J-P32).** When the crossed spine bounds the district — an arterial or a boundary secondary — the
   T-junction's vertex lies on a chain two districts share, so S8 records it as a `baseLane` portal, with its
   `SeamAmendment`, in the shared `Seam` record of that boundary run (II.1), which both districts' contracts read. A
   planned end inside the **portal gap** of an existing portal on that spine — max(6 m, 2 × the wider lane's width), a
   table row — slides along the spine out of the gap, toward the side that keeps its arrival within 85–95°; if neither side
   does, the cut takes its next ladder rung. So two districts' lanes never meet at one boundary vertex (the crossroads step
   10 forbids) and each portal vertex carries exactly one lane. When a re-derivation removes a lane, its end vertex loses
   its `portal` role (`removeEdges` on its `VertexRef`, §3.4) and is dissolved, its portal and amendment leave the `Seam`
   record, so the spine reads exactly as it did before the lane, and the neighbour step's reversal restores the
   neighbour's kerb (II.1 (3)). A district's effective scope — its own faces plus this **seam exception** (the chains,
   corridors, strips, wedges, neighbouring rings and `Seam` records its lane ends touch) — is §7.3 item 1's; every other
   entity of every other district stays byte-identical, and the locality oracle checks exactly that (§7.3, II.4).
8. **Transaction and ladder (GEO-23).** Before step 1, on any face with a reflex vertex deeper than the band's plot depth
   (L- and C-shaped faces, faces wrapped round a cul-de-sac antenna), a **reflex pre-cut** splits the face perpendicular
   to the reflex vertex's longer run, and antennae are split off at their roots (FTG's fix for "internal corners"). Then
   `splitFace(F, cut)` as a transaction; reject if either child violates `minEdge`, min angle or the class's minimum block
   width. The **ladder**, each rung under an operation-count work limit: (a) redraw `f` (≤ 2 more candidates, ≤ 3 in all;
   NG's ≈ 4 % "Alternative cut"); (b) the straight cut on the mean normal; (c) **the always-succeeding cut** — a straight
   cut perpendicular to the longest run through its midpoint, clipped to F's own component by boolean intersection (a
   clipped line cannot make four crossings); (d) substitution — F becomes a court, green or landmark block chosen from the
   district allocation's pending claims (NG's substitution rule, K6) — **only for faces ≤ 2 × the band's upper block
   area**; a larger face reaching (d) is cut by (c) again. No rung restarts anything above F. Every district reports the
   share of its built land left as court or green by substitution (soft bound ≤ 5 %), so MFCG's "empty areas inside city
   walls" cannot return silently.
9. **Width (COV-NG-N20).** The new way's width, one scalar per lane: `w = a_district + b · (L + e · n_free)` — `a` drawn
   once per district (NG: a per-seed intercept), `b` a rung-table slope, L the final course length, `n_free` its free ends
   and `e = 0.025 ×` the district's median cut length (NG: ≈ 5 model units per free end against median lengths of
   150–250); metres: alleys 2–3 m, lanes 3–5 m, and a cut longer than the lane length band in a walled regime is typed
   `secondary`. Never narrower than a lower class (O4 c). Template roads take fixed per-district widths (II.2).
10. **Continuation (J-P11).** A cut may **continue across an existing lower-or-equal-class street** when collinear within
   6° (the rare crossroads) — **only inside its own district**, never across a district-boundary edge (GEO-42).
11. **Recurse** on both children with their own sub-streams.

**The deep-interior rule (IMP-8, GEO-25; J-P15).** When recursion stops and a block's local thickness exceeds twice its
band's plot depth, the district's band row chooses the interior **now, in S8**, by target shares: `court` (a hollow block,
perimeter plots around a shared court — MFCG's donut and NG's hollow block), `back_lane` (a lane spine through the middle,
parallel to the longer frontage), `through_alley` (an alley spine joining two opposite frontages), `rear_plots` (a second
row of plots reached from the frontage through the front row). Default shares — poor: court 0.35, back lane 0.25,
through-alley 0.30, rear plots 0.10; modest: 0.45 / 0.30 / 0.15 / 0.10; prosperous: 0.65 / 0.15 / 0.05 / 0.15; rich:
0.75 / 0.10 / 0 / 0.15 — our own values, calibrated at M-1 on NG's hollow-block frequency in the vertex captures and
MFCG's inner-lot removal in the size-sweep exports; the rows are keyed by §4.5's band set (a band without a row
interpolates, item 27). The lanes and alleys chosen here are inserted as L1 spines in S8's own district batch (S10 never
writes L1, §4.1), so no sibling block is left stale; dense poor quarters get many narrow alleys and still keep courts,
rich quarters keep gardens behind their houses. Keep-test: the court share of deep blocks within band per class (§13.5).

**Hidden plots, and how a court or a rear row is reached (item 30; owner: "plots that do not have a direct access to
streets … only accessible via alleys … slums or hidden or clandestine places outside of public view").** A `court` or
`rear_plots` interior is reached from the public way in one of three ways — the block's **reach**, drawn here with the
treatment and recorded beside it (`Block.reach`, §2.5) — and S10 builds what the reach names:
* `open` — an open slot between two front buildings, an alley face (§4.7 S10 (9)) or the L1 spine of a `back_lane` or a
  `through_alley`: the court or rear row is in view from the street. This is the references' every-plot-fronts-a-street
  baseline — MFCG and FTG give every building a street, NG's infill yields open back lanes and courts — and the parity
  presets' only value (item 23);
* `passage` — a **covered way under a front building**: an L3 face of kind `passage` (an alley-as-face, §4.7 S10 (9);
  §2.5) of width `passage.widthM` (2.4 to 3.5 m by band) that S10 cuts along one side line of the front plot the rule picks —
  the plot of widest frontage in the middle third of the run — from the kerb to the court or the rear row; the front plot
  keeps its identity and its footprint ends at the passage's edge, and S11 gives its building a wing that **spans** the
  passage at every storey above the ground (`Wing.spans`, §2.6: the passage takes the ground storey's cells, the storeys
  above keep the frontage continuous; the plan rung reserves those cells, item 28). A passage is chosen only where the
  front row is continuous — the band's arrangement is `row` (§4.7 S11) — so the arch sits in a streetwall; where the
  buildings stand apart the reach stays `open`;
* `gated` — an opening in a frontage enclosure: the `PlotBound` gate of a compound's wall or a gatehouse arch (§4.7 S11)
  into a **private court** — a rich house's hidden garden court, a guild's or an inn's court — chosen only where the band's
  arrangement is `compound` or `detached`.

The reach weights are band rows — squalid and poor: open 0.25, passage 0.75, gated 0; modest: 0.70 / 0.30 / 0;
comfortable: 0.80 / 0.15 / 0.05; prosperous: 0.60 / 0.05 / 0.35; rich: 0.30 / 0 / 0.70 — interpolated along the prosperity
value, the non-open weights scaled by the density value (× (0.5 + density), so the densest blocks hide the most) and by
the rung (TOWN 0.6, CITY 1.0, METROPOLIS 1.2; the village rung rows are 0, PART III); the draw is the block's interior
draw (`cut.interior`, one pair: treatment, reach). Each band row also states its **hidden-share target** — the district's
share of plots whose exposure is `hidden`, below: squalid 0.20, poor 0.12, modest 0.04, comfortable 0.02, prosperous
0.04, rich 0.08, ± 0.03 — to which the reach weights are fitted at M-1 on B-CITY and which §13.2's bar checks per district
(our own values, calibratable, J-T; 0 in the parity presets and at every village rung). The share is made deliberately,
never left over: the slum's back courts and rear tenements behind a passage at the bottom, private gated courts at the
top, few in between (J-A30.41).

**Exposure — how a plot's reach is named (item 30 (a)).** When S10 types a plot's access edges it sets `Plot.exposure`
(§2.5) by reading the block's **interior access graph** — its plots, alley faces, passage faces and court residues, with an edge
between two nodes that share an L3 edge, and the public kerbs (the corridor edges of every L1 way, `alley` and
`cul_de_sac` spines included) as the roots — by adjacency and reach depth, never by a sight line (J-A30.42): `street` —
an access edge on the kerb of a `through`, `primary`, `secondary` or `quay` way; `lane` — on a `lane`, `cul_de_sac`,
`track` or `path` kerb (S8's back lanes among them) and none on a street; `alley` — only on an alley face or a
`through_alley` spine's kerb, each open to a public kerb at its ends; `court` — only on a court residue whose own reach to
a public kerb is one `open` step; `hidden` — every access edge lies on a face whose reach to any public kerb passes
through a `passage` face or a `gated` opening, or through two or more interior faces; `sealed` — a hidden plot whose every
reach passes a sealed passage (§2.8, §4.11). The access guarantee is unchanged: every plot, hidden ones included, has ≥ 1
access edge and a chain of access faces to a public kerb (F-PLOT, §5.2; the chain-reachability bar is §13.2's). Knowledge
is a separate fact: `knownTo` on the plot, building and institution records (§2.5, §2.6) defaults from exposure (hidden →
`local`) and is otherwise a dossier fact; it moves label visibility and the reader's answers (§9.2), never geometry, and a `local` or `secret`
institution prefers hidden plots through the placement solver's `exposure` row (§4.7 S10b, item 16). At the city band a
hidden court draws as a court behind buildings — ground and `court` tones under the building masses (§8.5) — never as an
empty block. Hidden plots arise, are sealed and reopen over epochs by §4.11's kinds, and a user seals or opens a passage,
hides or reveals a place, by §7.1's events; villages have no hidden share by default (PART III).

**Holes (the `BisectorEx` case, C13 — ours).** A cut that would cross a hole is routed to the hole's boundary (a *slit*,
committed by `connectHole`, §3.4), the annulus becomes simply connected, and the same ladder applies (σ = 0.098); this is
the primitive the stage-2 ring template needs (II.2). Cuts are inserted as `lane` / `alley` / `secondary` spines, so lanes
are real ways in the same graph (NG's look on FTG's substrate). Junction fillets at street corners are a style-time
smoothing (Urban Places' arcs), not a model change.

**Partition recipes (COV-MFCG-G03).** The same module exposes `PartitionRecipe` rows built only from the kernel's
`splitFace`, `radialSplit`, `ringBand` and `insetRing` (§3.4): `fan` (k radial cuts from the centroid with alley-width
gaps), `semiFan` (from a boundary vertex) and `ring` (an inset band around a court, split into segments by slit cuts, short
sides first). Park layouts (§4.9) and institution templates (cloister, quadrangle; §4.7 S11) use them.

**The strategy slot.** S8 calls `FabricStrategy.partition(district)`; the base registers `BentCutFabric`; stage 2
registers `RingFabric`, `SquareFabric`, `StreetFabric` (G-P2, §14).

=== APPEND TO SECTION ### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model ===
**Markets and hidden plots in this stage (items 24 and 30; the rules are §4.2 S3 (12)'s, §4.5 S7b (3)'s and §4.6's).**
Every market square — the plaza when it carries the principal rank, a flanking principal market, each secondary claim —
takes the centrepiece and stall rules above by its rank: the principal the plaza's weights and one stall per ≈ 150 m²
(≤ 40), a secondary one stall per ≈ 200 m² (≤ 20) and a centrepiece with probability 0.5 (our own rows, calibratable);
the market hall's `nearMarket` row (§10.2) binds it to the principal market by default. A passage the block's reach names
(§4.6) is cut by S10 (9) as its `passage` face, and S11 gives the front building the wing that spans it; a hidden plot's
main entrance faces its access face — the court or the passage — as §2.6's entrance rules put a set-back building's on
the court that leads from its gate (item 29), so every plan roots at a door that opens onto the way its plot is reached
by.

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
**farmsteads** with driveways (an L3 `driveway` face from each farmstead lot to the nearest way corridor), **along
rivers**, or the MFCG/VG **sector look** (Voronoi of ring seeds ∩ land cut by the OBB bisector, the recorded construction)
as a style preset; land-use rings (gardens / closes / orchards → fields → meadow / pasture / commons → coppice → wild
wood); managed woodland and coppice sized by the wood rows below and wild wood beyond, as L3 wood faces, with forest
edges by domain-warped density noise (a render-time property); every land component gets uses (both banks, islands); the
arterials continue to the frame at their bearings (S4). Fields keep the shore setback of §4.2 S1 (8). *Model and render split (SCL-3):* the model's field faces are FTG-sized furlongs (≈ 2.5 ha; ≈ 1 600 in
CITY's 39 km² margin), each carrying its crop, livestock and rotation slot — their ≈ 12 ms at CITY runs in the hinterland
unit, hidden behind the pool (§12.4); the open-field **strips** inside a furlong are render-time segmentation (their count
and width a style and era parameter), so the strip look costs no model faces.
* **One farm table (FTG-7; item 26).** `FarmTable { arableHaPerCapita (era, with provenance), householdsPerFarmstead,
  fieldHaPerFarmstead, fuelM3PerCapitaYear, timberM3PerCapitaYear, coppiceM3PerHaYear, woodM3PerHaYear, extent:
  'fill'|'demand', reserveArable: boolean }` is the only source of the countryside's numbers: S2 demands `farmsteads =
  round(arableHaPerCapita · P / fieldHaPerFarmstead)` farm plots and their households, and the hinterland unit's S10 gives
  each farmstead its fields at the sites S12a chose, so farmland per capita and the farm classes' field area agree by
  construction (MFCG's "not enough farms" removed). **Fuel and timber (item 26).** The same table turns the population
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
* **Farm modes — FTG's two, chosen by size and landscape (item 26; provenance `ref:FTG farmland modes`, the keys ours).**
  A `FarmModeRow` per rung × landscape — the relief character S1 drew (plain, rolling, hilly, mountainous) and the
  fertile share of the frame's land (`SiteResources.fertile` ≥ 0.4 on at least half the cells: fertile, else poor) —
  chooses `fill` (farmsteads and their fields fill the remaining countryside from the perimeter outward, the lots larger
  where land is plentiful) or `perimeter` (farmsteads strung along the main roads out and round the perimeter, the
  fields behind them, the remaining frame in its landscape uses): defaults `fill` at TOWN and CITY on plain or rolling
  fertile land, `perimeter` at METROPOLIS and wherever the land is hilly, mountainous or poor; the mode is recorded in the
  hinterland's derivation record; the field-system preset (above) lays the fields inside either mode. The village rungs
  take `fill` (PART III; VG's and MFCG's countryside) (J-A26.43).
* **Count-driven outside plots (COV-FTG-I03, COV-FTG-B09).** The hinterland allocation (S7b) lists the outside classes —
  farmsteads, water and wind mills, quarries, mines, lumber yards, charcoal burners, fisheries, lodges — and the decorations
  below. Their sites are seeded by score on `SiteResources` — the outside classes' relation rows (§10.2), the same rows
  the placement solver reads (§4.7 S10b): quarries on stone, mines on ore, lumber at the woodland edge, fisheries on the
  shore, water mills at a reach with fall, windmills on exposed high ground, farmsteads on fertile land near a lane — with
  a **clustering term** (a seed's score rises for each seed of its own kind within the cluster radius, so
  similar features sit together, FTG's rule); S12a fixes the seeds, and the hinterland unit's S10 divides the outside land
  into exactly that many lots by a weighted Voronoi (power diagram with area targets) clipped to the land. Each lot is an
  outside plot (L3 in the hinterland's blocks) with its yard and a `driveway` face to the nearest way corridor (VG's lonely
  houses, on purpose); the edge orchards of §4.5 S7b (4) are lots of their allocated area in the first ring beside the
  district they serve. The unit's S10b places the allocated outside classes and farm households on the outside plots.
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
| yard planting by plot class | site plan, value | every plot | row → rear kitchen garden (≥ modest), else bare / midden; compound → formal or kitchen garden + orchard part; detached → garden; hovel → bare, pen or midden; institution → forecourt / churchyard |
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
  default field system and farm layout, the default roof form and pitch, and the scatter densities; `Greenery.species`
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

=== APPEND TO SECTION ### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base) ===
**Terrain and water change slowly (item 25; the engine is owner-staged, the kinds and the hand path are the base's).**
Reclamation, silting and river-course shifts are conversions on the one list — kinds `ConversionOp`'s union admits, the
slowest layer of the persistence order, never immutable — applied by hand in the base through §7.1's `convert` event and, in the staged engine, drawn at
the decline table's `terrainWater` rate by their own trigger rows (below). Each is a typed operation whose repair is an
operator the base already has (J-A25.41):

```ts
type TerrainWaterOp =
  | { op: 'reclaim'; kind: 'marsh'|'foreshore'; region: Polygon /* marsh: LandUse faces of kind 'marsh' or a damp or flood band re-typed as land; foreshore: a shallow water margin filled */ }
  | { op: 'silt'; water: Id; stretch?: StretchRef /* a reach or a basin: its width and depth profiles fall by the row's share; a basin below the harbour's draught loses its harbour use */ }
  | { op: 'shiftCourse'; water: Id; from: number; to: number /* control-knot ordinals (§2.3): the reach between them re-traced — a meander cut-off or an avulsion */ }
  | { op: 'digCanal'; polygon: Polygon /* the carve above, kind 'canal' */ };
```

* **Repair.** `reclaim` runs S1's terrain operator (§7.3 (a)) — the region's ground raised to the flood line plus the row's
  margin (`reclaim.raiseCm` 60), drained by a `drainage` ditch trace along its lowest line, its `LandUse` faces re-typed
  `meadow` or `arable` with `reclaimed: true` — and, for a foreshore, S1's water operator (§7.3 (b)) with the filled margin
  as the new shore; `silt` and `shiftCourse` are S1's water operator on the changed reach (the width and depth profiles,
  the shores as their buffer, the crossings re-sited, the kept ways re-routed, F-RIVER's re-trace confined to the reach,
  §7.3 (b) 1–2), so their footprint, fates and locality are the carve's and byte identity holds outside it; `digCanal` is
  `carve`. Every touched entity's lifecycle records the cause (`convert:reclaim` …); the record changes each kind makes
  are §2.3's.
* **Trigger rows (the engine's step; the rows are the decline table's `terrainWater` rows, §7.6).** Candidates and their
  chance per epoch, each × the layer's persistence rate (0.005) and drawn from `epoch.transform` keyed by the water body's
  or face's lineage and the epoch (§6.1; no new concern, J-A25.42): `silt` — a reach whose accumulation has fallen, or a
  basin whose harbour use has closed (the use step), 0.02 per epoch; `reclaim` — a marsh or foreshore face beside built
  land whose band's plot demand is short (S5d's shortfall record) and whose district's band is `modest` or above, 0.03
  per epoch — reclamation is bought by prosperity and pressed by demand; `shiftCourse` — a reach whose sinuosity exceeds
  `river.cutoffSinuosity` (1.8), or whose flood cells beside it exceed the row's share, 0.01 per epoch; `digCanal` only by
  demand (a `canal` row of the roster's institutions, a dossier element or a user's edit). Each fires at most once per body
  per epoch; AM-23's tendency wording holds — rates, not laws. Emulation note: neither reference has time, and both
  already let a user reshape water — MFCG's warp and FTG's water drawing — which the base keeps as §7.1's edits; nothing
  here runs without an epoch.

**Hidden plots over epochs (item 30 (e); the base carries the kinds).** A passage can be **sealed** — `sealPassage`: the
passage face's access edges are marked sealed, every plot whose only reach passes it takes exposure `sealed` (§4.6), and
its buildings enter the decline ladder as vacant (`vacate`, cause `convert:sealPassage`) — and later **reopened**
(`openPassage`: the exposure returns to `hidden` and the buildings reoccupy by the regrowth-first order); both are hand
edits in the base and the engine's kinds later. Hidden plots **arise** by densification — the ladder's `densify …
back_court` (rung 2) cuts a plot's yard into rear plots reached by a new passage where §4.6's reach weights allow one,
through S10's incremental re-cut with the neighbours fixed (§4.7 S10 (7)) — and **vanish** by `thin … back_court` (the
rear plots cleared after their uses relocate, the passage sealed and, on a rising band's re-cut, removed with the rear
row, `amalgamate` returning the land to the front plot's garden: item 31). The sealing kinds are the last the union admits
(`… | TerrainWaterOp | HiddenOp`):

```ts
type HiddenOp = { op: 'sealPassage' | 'openPassage'; passage: Id /* the L3 passage face (§2.5) */ };
```

**Markets over epochs (item 24).** A secondary market the roster's suffix adds is claimed by the epoch's S7b in the new
stage or in a due district by §4.5 S7b (3)'s rule; a market whose institution closes (the use step) keeps its square — a
plaza or a `market_green` — until a `clear` or a claim reuses it, so no market moves by wealth change alone.

=== APPEND TO SECTION ### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values) ===
**Markets, wealth bands and the countryside's rows (items 24, 26 and 27).** The `market` class row demands the markets by
size — `min` 1 (the principal), `firstAtPopulation` 10 000 and `perCapita` one per 12 000 inhabitants for the secondaries,
`secondaryChance` 0.15 at TOWN (our own rows; §4.2 S2; §13.5's anchors are MFCG's secondary plazas and FTG's two market
squares) — and the market hall's and the market trades' rows cite the market they serve by rank (`nearMarket`, the
principal by default). `HouseholdRow.band` and every class row's `lifestyleBand` name a band of §4.5's band set; the
household shares' default weights are FTG's captured lifestyle distribution (§4.5's table; provenance `ref:FTG lifestyle
distribution`), shifted by the character vector, and every band-keyed row set of this table may omit bands, which
interpolate (§4.5, item 27). The farm table's fuel and timber rows, the farm modes and the outside classes' seeding rows
are §4.9's.

=== APPEND TO SECTION # PART III — What a later village product needs from the base (one page; the hooks are concrete) ===
**Emulation baselines, markets and hidden plots at the village rungs (items 24–27 and 30).** The village rung rows carry
a hidden-share target of 0 and reach weights of `open` only (§4.6; VG's and MFCG's every-house-on-a-way), a `market` row
of `min` 0 with at most one market — a green or a widened street, sited by §4.2 S3 (12)'s score with the plaza kind absent
— the farm mode `fill` (§4.9), and the band set's cuts computed per village from its own roster shares over its one
district (§4.5); §4.11's terrain and water conversions apply unchanged. Each is a table row a village supplies, not code.

=== J-ROWS ===
| J-A23.41 | the reading rule for absolutes stated once for the pipeline part in §4.1, pointing to §7.6's marker; the parity presets set every `extension` row to its off value | §4.1, §7.6 |
| J-A24.41 | the centre stays the root of the plaza, the gate routes and `T`; the principal market is sited at S3 (12) by a trade-convergence score whose defaults land it on the plaza (MFCG), and as a flanking square at a bridgehead, the harbour, a gate or a main street otherwise | §4.2 S3 (12), §4.3, §4.4 S5a |
| J-A24.42 | secondary markets as S7b claims under MFCG's rules as defaults (never touching, small patches, rarer at TOWN; FTG's district-rule placement the same mechanism), one `market` district per market, the count from the roster's rows plus polycentric plazas | §4.5 S7b (3), §4.2 S2, §10.2 |
| J-A25.41 | reclamation, silting and course shifts as conversion kinds on the one list, repaired by S1's terrain and water operators and the carve path; hand-applicable now, engine-driven later at the terrain-water rate by trigger rows | §4.11, §7.3 |
| J-A25.42 | no new concern for terrain and water conversions: draws from `epoch.transform` keyed by the body's or face's lineage | §4.11, §6.1 |
| J-A26.41 | "drawn after" is a dependency order the pipeline already realises; the hinterland unit's concurrent execution stands (J-P27) and no budget row moves | §4.9, §4.1 |
| J-A26.42 | fuel and timber as farm-table demand rows whose provision is capped by the frame's wood land, the shortfall the import the supply edges serve; `extent` follows demand only as an option, `fill` the default | §4.9, §4.2 S2, §10.2 |
| J-A26.43 | FTG's two farmland modes as a rung × landscape row, the field-system presets laid inside a mode; the arable reserve off by default as an S5c pricing term | §4.9, §4.4 |
| J-A27.41 | one named band set of six bands equivalent to FTG's tiers, MFCG's ward-class shares as land-share anchors, the household shares' default weights FTG's captured distribution; tables with fewer rows serve every band by interpolation; districts stay feature-named | §4.5, §4.7, §10.2 |
| J-A27.42 | the middle band designated per settlement as the band of its median household under the wealth shares — `comfortable` under the default set — recorded on `FieldBands.middle` with the cuts | §4.5, §4.11 |
| J-A27.43 | FTG's shanty trigger (average band poor or squalid, after the first half of the stages) as the default; "only outside the enceinte" retired to a soft `extension` row | §4.5, §10.2 |
| J-A30.41 | hidden plots made deliberately by S8's reach draw and S10's cut against per-band hidden-share targets; 0 in the parity presets and at village rungs | §4.6, §4.7, PART III |
| J-A30.42 | exposure by reach depth on the block's interior access graph, by adjacency, never a sight line | §4.6, §2.5 |
| J-A30.43 | a passage as a covered L3 access face cut along a front plot's side line and spanned by the front building's upper storeys as a wing attribute; no way class, no kernel exception | §4.6, §4.7 S10 (9), §2.6, §2.5 |
| J-A30.44 | sealing and reopening as conversion kinds usable by hand now; a sealed plot decays through the ladder's vacant state | §4.11, §2.8 |

=== RATIONALE-A ===
| J-A23.41 | Chose to state item 23's reading rule for the pipeline part once, as a bullet of §4.1 that points to §7.6's provenance marker — every stage rule's default cell reproduces the reference behaviour it emulates or is marked `extension`, and an "always", "never" or "first … then" in §4 reads as that row's default value — and to have the parity presets set every `extension` row to its off value, over a per-section rewording of each absolute or a second statement of the principle in §4, because the principle's home is §7.6 (the route's ruling) and one pointer keeps single source, while the absolutes that carried a wrong claim (the centre fused with the market, the shanty rule's enceinte clause, §4.11's fixed decline order) are corrected where they stand; engineering invariants are named as outside the rule so no one reads "never re-rolled" as a table value (§4.1, §7.6; item 23). |
| J-A24.41 | Chose to keep the centre — the nucleus — as the root of the main plaza, the gate routes and the travel-cost field `T`, and to site the principal market separately at S3 (12) by a trade-convergence score over the plaza, the gates, the town bridge's ends, the harbour's attach and the busiest inward street, whose default weights make an inland walled town's plaza win, over fusing centre and market by law (the old "centre / market") and over re-rooting `T` at wherever the market lands, because the owner confirmed the central market "does not actually have to be central" while MFCG's plaza-as-market must stay the default (item 23) — a score whose defaults land on the plaza gives both — and because D-16, D-17, J-P3 and J-P26 build the boundary, gates, trace and moat on the plaza-rooted field, which an off-centre market must not disturb; a flanking square around a route reuses the gate plaza's construction, so no new geometry is needed (§4.2 S3 (12), §4.3, §4.4; item 24). |
| J-A24.42 | Chose to make every secondary market a S7b district claim sited by a district score under MFCG's own rules as defaults — never touching another market, taking the smallest face that fits, rare at TOWN — with FTG's district-rule placement being that same mechanism, one feature-named `market` district per market and the count from the roster's `market` rows plus a polycentric nucleus's plaza, over planning every market at S3 or drawing a fixed number per rung, because S3 knows only the nuclei and the trade sites while a secondary market belongs to the later wards the references put it in, S7b's claim step already cuts every item larger than a block out of a typed district, and the roster's sequential rows make the count follow size, character and an epoch's growth (item 24's extension) without a second count law; J-P1 is unchanged, since `market` names a feature (§4.5 S7b (3), §4.2 S2, §10.2; item 24). |
| J-A25.41 | Chose to add reclamation, silting, course shifts and canal digging as typed conversion kinds on §4.11's one list, each repaired by an operator the base already has — S1's terrain operator for reclaimed ground, S1's water operator for a moved shore or a re-traced reach, the carve path for a canal — so they are hand-applicable today and the engine's rows later, over leaving terrain and water to user edits alone or building a separate terrain-evolution path, because the owner's rule is that these layers change slowly, not never, the evolution family's contract is one conversion list with one repair discipline (footprint, fates, byte identity outside), and the water operator was already the local repair the route named (§4.11, §7.3 (b); item 25). |
| J-A25.42 | Chose to draw the terrain and water triggers from the existing `epoch.transform` concern, keyed by the water body's or face's lineage and the epoch, over registering an epoch terrain-water concern, because the draws are epoch transformations like any other, a new concern is a registry change that buys nothing here, and the route left the choice to the editor (§4.11, §6.1; item 25). |
| J-A26.41 | Chose to read FTG's "outer settlement last" as a dependency order — the countryside's content decided by S2's demand, sited at S12a after the districts are typed and claims cut, its geometry drawn after the town's L1 and L2 fabric is complete into the land the perimeter leaves — which the pipeline already realises, and to keep the hinterland unit's concurrent execution beside the pooled districts (J-P27) with no change to §12.4's row, over serialising the unit after the pool, because the unit's faces and every district's are disjoint and the model is identical in any derivation order (§4.1's laziness contract, the derived-complete digest test), so serialising would cost wall-clock and change no output; the order statement lands in §4.1 and §4.9 (§4.9, §4.1; item 26). |
| J-A26.42 | Chose to add fuel and timber to the one farm table as per-capita demand rows whose provision the hinterland unit sizes up to the wood land the frame offers, the shortfall becoming the settlement's reported import served through the gates' and harbour's `import` rows, and to make "extent follows demand" an option (`extent: 'demand'`) with `fill` — the references' countryside that fills the frame — as the default, over sizing the frame to the wood a medieval town burned or failing a generation whose frame is short, because a city's fuel came from far beyond any map (the numbers overrun a 25 km² frame at once) and the supply chain of item 16 already turns a missing provider into an import; the demand rows keep the countryside honest either way (§4.9, §4.2 S2, §10.2; item 26). |
| J-A26.43 | Chose to express FTG's two farmland modes — farmsteads filling the remaining countryside, or lots around the perimeter along the main roads out — as a `FarmModeRow` keyed by rung and by the site's relief and fertility, with the field-system presets laying fields inside either mode, and to make the minimum-hinterland clearance an off-by-default `reserveArable` flag whose only effect is a soft price on fertile cells in S5c's extramural growth, over choosing a mode per biome only or reserving arable land as a hard barrier, because the owner's item names size and landscape as the choosers and asks for the clearance only when demand requires it, and a hard reserve would be the fixed law item 23 forbids (§4.9, §4.4; item 26). |
| J-A27.41 | Chose one named band set of six bands — squalid, poor, modest, comfortable, prosperous, rich — each declared equivalent to the FTG lifestyle tier and the open-source MFCG ward class it reproduces, the household shares' default weights FTG's captured distribution and MFCG's ward-class deck shares the anchor of §13.5's built-land-share row, with every band-keyed rule table free to carry fewer rows (the four granularity rows anchored to poor, modest, prosperous and rich; a band without a row interpolating along the value), over re-keying every table to six rows or keeping four bands and mapping the tiers onto them, because the item asks the field's bands to reproduce those classes and distributions — which needs the tier count — while the tables' interpolation rule already serves any number of bands, and because the live MFCG dropped class-typed wards, so its ward mix can only be a share target, never a district kind (J-P1) (§4.5, §4.7, §10.2; item 27). |
| J-A27.42 | Chose to designate the middle band per settlement as the band that holds its median household under the roster's wealth shares — `comfortable` under the default set, FTG's tier between modest and wealthy, which is what the owner's "middle class outcome" reads as — recorded on each town's `FieldBands` (`middle`) at S6 with the cuts and moved only as they move (the same rule item 31's seat states, J-A31.45), over a fixed band id in the band set or the median band of the cuts by count, because a fixed id would name the same band for a town whose shares are shifted by its character vector, while the median household follows those shares, so a metropolis's middle and a town's middle each bound their own districts; a region or era moves it by moving the shares; item 28 (f)'s interior ladder reads the same designation for its middle row, so the shell's floor and the interior's rows agree on one middle per settlement (§4.5, §4.11; items 27, 31 and 28 (f)). |
| J-A27.43 | Chose FTG's shanty trigger as the default — a shanty kind admitted only when the roster's average band is poor or squalid and only after the first half of the stages — and to retire "only outside the enceinte" to a soft `extension` relation row of the `shanty` district kind, zero in the parity presets, over keeping the enceinte clause as part of the rule, because the clause was ours, not FTG's (the route's stale-text row), and item 23 lets our preference survive only as a weighted tendency (§4.5, §10.2; items 27 and 23). |
| J-A30.41 | Chose to make hidden plots deliberately — S8 draws a reach (`open`, `passage`, `gated`) with each court or rear-row interior from band rows, S10 cuts the passage face and the rear plots, and the band row states a hidden-share target the reach weights are fitted to and §13.2 checks — with 0 as the parity presets' and the village rungs' value, over leaving hidden plots to F-PLOT's residue or to a post-hoc pass, because the owner asks for "some plots" of a definite character (slums, clandestine places, private courts) in definite quarters, which only a target per band gives, and the references' every-plot-fronts-a-street baseline must stay the default (item 23) (§4.6, §4.7, PART III; item 30). |
| J-A30.42 | Chose to name a plot's exposure by adjacency and reach depth on the block's interior access graph — a plot is hidden when every reach to a public kerb passes a passage, a gated opening or two or more interior faces — over a sight-line test, because the plat holds that graph for free (F-PLOT already walks it, and the kernel's `faceNeighbours` walks passage, alley and court faces), a sight line is a render-time notion that would make exposure depend on building heights and viewpoints, and the owner's own definition is about access ("do not have a direct access to streets") (§4.6, §2.5; item 30). |
| J-A30.43 | Chose the passage's form for the pipeline as a covered L3 access face — an alley-as-face of §4.7 S10 (9) cut along one side line of the front plot the rule picks, the front plot keeping its identity, the front building's upper storeys spanning it as a wing attribute (`Wing.spans`) rather than as geometry — over an L1 `passage` way class or an L4 site-plan part inside the front plot, because S10 never writes L1 and an L1 corridor would cut the footprint above it (the kernel's J-A30.31), an L3 face lets the rear plots' access edges lie on it exactly as they lie on an open alley face, and the model's union contract holds on the ground ring while the storeys above keep the streetwall continuous; the kernel confirmed the face form needs no new operation (§4.6, §4.7, §2.5, §2.6; item 30). |
| J-A30.44 | Chose to carry sealing and reopening as two conversion kinds on §4.11's one list, applicable by hand in the base — a sealed passage marks its access edges sealed, the plots behind it take exposure `sealed` and their buildings enter the decline ladder as vacant, reopening reverses it and regrowth-first reoccupies them — over an attribute flip with no lifecycle effect or an engine-only mechanism, because the owner's picture is a lost place rediscovered, which needs the plots to decay while sealed and to come back when reopened, and the evolution family's rule is that the base carries every state and kind the engine will use (§4.11, §2.8; item 30). |

=== END ===
