Blocks of seat amendments-c/amend-pipeline-walls-districts-hinterland (items 45, 46, 47, 57), per the BLOCK
PROTOCOL; the report is amend-pipeline-walls-districts-hinterland.md. Text before the first header is ignored.

=== REPLACE ### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture ===
### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture

**The trace is S3's and S5a's** (§4.2 S3 (6)–(9), §4.4), always fixed before that stage's secondaries grow. S7 builds
everything that stands on the traced wall, once per enceinte, after S6 has typed the districts, in **one L1 batch** per
enceinte; its geometry at L3 and L4 is built inside the wall strips by S10 and S11 after S9.

**Wall strips, band, setbacks, intervallum (GEO-38, MFP-9, COV-FTG-G07; J-P29).** S7's L1 batch cuts two **wall strips**
off the L1 faces beside the trace. Inside: the band's half (wall thickness by era 2–3 m) plus the inner setback (table
6–10 m; MFCG's "buildings never touch the wall"), bounded by the **inner setback line** — or, where the era row asks for an
**intervallum** (`lane` on inner and outer enceintes at CITY and METROPOLIS in the high-medieval preset, `none` at TOWN),
by the intervallum spine itself, inserted here as an L1 `lane` whose kerb is the strip's edge. Outside: the band's half plus
the outer setback and glacis (table 10–20 m), bounded by the **glacis line** — or, where a moat runs along the wall, by the
moat's inner bank, the strip then being the band's half plus the berm. The lines carry the structural `setback` role (§2.2
rule 7), run from gate to gate, stop at each gate's plaza claim or arterial corridor, and close on the secondaries S5c
stopped at the setback band, so each strip is a face of its own; strip faces inherit their district from the faces they
were cut from and are typed `wall_strip`. S8 never cuts a strip and its lanes end on the strip's boundary (§4.6); S10's
eager step (0) builds inside each strip block the L3 half-band, the setback and glacis residue and its side's parts of every
tower and gatehouse (§4.7), so nesting holds and no later batch splits them. **Both faces are unbuildable:** no plot is cut
in a strip, so the hard invariant "footprints ∩ (band ⊕ setback) = ∅ on both faces" holds (§5.3), and ribbon plots start
beyond the outer strip (O8 b).

**Gates — exactly N, by construction (MFP-4).** Main gates are where S4's and S5b's arterials cross the trace: N₁ gate sites
were picked in S3 and the arterials routed through them, and each outer enceinte's gates are its S5b primaries' crossings,
so roads leaving each walled stage = its gate count and no arterial ends blind against a wall. Water gates sit where a river
passes (its two bank vertices named by `Gate.banks`, §2.7), at every quay access under a `quay_wall` or `sea_wall`
waterfront (§4.4), and at a harbour gate (§4.2 S3 (7)); the castle has one town-side gate; posterns are a separate,
road-less count added only on request; `N = 0` is honoured in S3. **Gate plazas (G-R1):** a small plaza is claimed in S7's
L1 batch at each main gate inside the wall, taking the inner strip's setback zone around the arterial (MFCG B14);
**forecourt squares** at churches and temples are typed open spaces sized by the institution's class. Gate passages stay
open by construction: a wall strip ends at the corridor of the way through each gate, so the band and gatehouse parts S10
builds never meet that corridor, and the intervallum's corridor is the strip's inner edge. The F-WALL ladder's last rung is
§5.2's.

**Towers** at every trace vertex whose turn exceeds a threshold and along straight runs at a spacing (35–60 m by rung and
era; FTG's 39 m median and MFCG's tower-per-vertex are the two reference points); kind (round, square, bastion, octagonal)
by era row; heights and a ground datum per tower; each tower's footprint is built per side of the wall by S10's step (0)
(§4.7).

**The castle (MFP-3, COV-FTG-G09, COV-FTG-G10).** The S3 bailey reservation becomes the castle's plot; its curtain is its own
enceinte of kind `bailey` along the reservation polygon, with towers at its vertices and along its runs; an `on_enceinte`
castle is already welded into the town wall through its two weld vertices (the shared edge is one wall). A **castle
template table** places the **gatehouse** at the town-side gate S3 fixed (§4.2 S3 (8)), with an inward spur; the **keep** —
shape `rect` (by `lir`), `square`, `octagon`, `round` or `cruciform` with corner projections, by era and rank rows —
opposite the gate, on the highest ground or central, by row; an optional **inner ward** (an inset of the bailey by 30–40 %
with its own gate, its wall chain in S7's L1 batch) by rank; **internal paths** as `path` ways keep ↔ gatehouse ↔ wall
stairs (S7's L1 batch; the keep and gatehouse footprints are S11's); a **surround** row (`Castle.surround`, §2.7) — an
esplanade (MFCG's green spacer before an inner castle, §4.9, claimed by S7b beyond the bailey's outer strip, §4.5 S7b (3)),
a park with a perimeter path, a plaza, a cliff skirt on a cliff site, or none; a **moat** (`Castle.moat`; carved at S3 when
water is within reach — a ring with its gate deck around an `inside` or `outside` bailey, only the outer arc around an
`on_enceinte` bailey, §4.2 S3 (10)); and, for an `on_enceinte` castle, a **town-side** row, `townSide: 'dry_ditch' | 'none'`
by era and rank (default `dry_ditch`; J-P36): a dry ditch types the glacis part of the bailey's town-side outer strip
`ditch` (§4.7 S10 (0); the bailey enceinte's `glacis` holds it, drawn by §8.2's ditch role; `ditch` names only this dry
residue — a wet moat is a `WaterBody`, named by `Enceinte.moat` and `Castle.moat`, §2.7) and is broken at the castle gate by
the castle street's corridor, as every strip ends at a gate's corridor, so the street crosses on a causeway; `none` leaves
plain glacis. No castle moat crosses the town wall (§4.2 S3 (10)). **Compactness (F-CASTLE).** The 0.75 gate (MFCG's
threshold on the compactness `4πA / P²`, kept as a *shape check*) is checked when S3 sites the bailey, before the trace
welds to it, and **repaired in place first**, in MFCG 12710731's order — thinness first, then shape (provenance
`ref:MFCG 12710731 castle repair order and target (code)`, P10; J-A45.41). The **pinned vertices** — an `on_enceinte`
claim's two weld vertices, which stay on the boundary, and, once the town-side gate is fixed, the two end vertices of
the side that carries it — never move; at generation S3 (8) repairs the claim before it fixes the gate on the repaired polygon.
(1) **Bloat:** while the claim's nearest boundary vertex lies within `castle.minInnerM` of its centroid (a castle-table
row, 40 m: MFCG 12710731's coded 10 units at its 4 m unit), every free vertex moves radially away from the centroid by
5 % of its distance to it — a 5 % scale of the claim when nothing is pinned — step by step, stopping at the area band's
top. (2) **Equalise:** each pass moves every free vertex 20 % of the way to its place on the claim's best-fit regular
polygon (`regularFit`, §3.4 — as many vertices as the claim, centred on the centroid, radius and phase from the ring's first
Fourier component), for at most 20 passes; the claim is **repaired** when its compactness reaches 0.75 and **unrepaired**
when a pass gains less than 0.001 or the passes are spent. A repaired claim is checked again against S3 (8)'s hard filter
and counts as unrepaired if it fails it. Two parts are ours (J-A45.42): the bloat moves only the claim's own vertices
inside its reservation, where MFCG 12710731 pushes its committed mesh; and an unrepaired claim takes the ladder's next
rung — re-site to the next candidate (reported), and last a keep without a bailey (reported) — never a restart (§5.2),
where MFCG 12710731 restarts the city. The claim polygon is the target of the `warp` `equalize` and
`bloat` edits (MFCG's documented castle-resize workflow; the `equalize` brush takes the same step, §7.1).
**Acceptance:** castle area and compactness inside
the band on ≥ 99 % of seeds with a castle requested (0 ways through reservations; MFCG's census baseline of 178 equalise
passes and 11 bloats); every re-sited castle reported. Several enceintes (citadel, inner, outer, suburb, bailey,
palisade, earthwork) are stage rows in the table; up to two castles (§4.2 S0). Every wall carries a lifecycle for wall →
ring road conversion (§4.11's `wallToWay`, a `retypeEdges` on the wall's role set).

**Water furniture.** **Bridges** stand on pinned decks — S1's on rivers; S3's on the moats and canals it carves (§4.2 S3
(2), (10)); S5a's on outer moats; a carve edit's on its channel by its way rule (§4.11); one L0 shore-split batch's where
no site stood (§4.2 S1 (5)). S7 builds the furniture of every `built` bridge, when a way's span is first laid through its deck — at generation, or
by its operator after an epoch or an edit — and none for a `site` (§4.2 S1 (5)): the deck is perpendicular to the flow or
channel by construction and S4 or S5 routed the way to its ends; the class comes from the way; stone or timber by era and
prosperity rows; the deck height (`deckCm`) from the two bank elevations plus a clearance row; minimum spacing 40 m (FTG);
fords where the class allows. A deck S1's water operator re-sites keeps its `Bridge` address (§6.3); bridges and piers are
re-based by §2.6's datum step (`deriveBase`) after a terrain stroke (§7.3 (a)). **Harbour (GEO-19, COV-FTG-H17):** the basin
was reserved and carved at S3, before any street, so S7 builds only its furniture on the reserved shore: a **harbour-wall
row** — shape (none, one arm, two arms; following the coast or projecting) and type (wall, wall with rocks, detached
breakwater) — moles, quays as `quay` ways along the waterfront (bank class `quay`), piers as `pier` ways at 12–20 m spacing,
straight or branching, on the harbour and on the open coast (FTG's ≈ 75 m length as a reference), timber or stone by era,
each pier carrying its deck height like a bridge (read by the shadow pass and the 3-D export, §8.4, §11.1); moles,
breakwaters, quays and piers are `pier` / `quay` ways in S7's L1 batch. A pier, a mole, a breakwater arm rooted on one shore
and a detached breakwater are **harbour works** under §5.3's crossing invariant; MFCG's `1.2 ± t` pier casing is a style.
**Canals and moats** were carved with their decks at S3 (`canal` along the chosen line; MFCG 12710731's canal builder, which
also draws its rivers, is covered by S1), outer moats at S5a; S7 adds their quays, their bank classes and the bridges on their decks. A carve
requested later by an edit goes through §4.11's conversion path, whose way rule gives every arterial it meets a deck and
records every cut, never a silent overwrite.

=== REPLACE ### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace ===
### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace

**S0 Blueprint.** `Blueprint = { version, seed, size: { rung: TOWN|CITY|METROPOLIS, population? | areaHa? | buildings?,
tolerance, aspect /* 0.5–2, default 1: frame width ÷ height, §3.2 (9) */ }, intent (§7.7), site request (coast side /
bearing with two arm rows, river with inflow bearing, islands and mouth, lake, hill, …), toggles (walls, castle:
'inside'|'on_enceinte'|'outside'|'auto'|'none', castles: 0–2, plaza, temple, harbour, farms, forests, shanty, greens,
waterfront: 'open'|'quay_wall'|'sea_wall', wallPlacement, moat: 'none'|'inner'|'all'|'auto' /* the innermost enceinte
(S3) or every enceinte (outer ones by S5a's carve, §4.4) */, sewers: 'auto'|'on'|'off' /* item 14: resolved by the
sewer-feature rule of this section (II.7.1) */ — MFCG's flags kept as intent), circumstances (era /* its
row also carries the public-lighting density the light rows read (item 68) */, government, biome, economy, magic:
'none'|'low'|'high' /* item 68: 'none' by default, a fantasy toggle under D-3; read by the light rows, §8.4 */,
landscape toggles: fertile land, mines, quarries, fishing, logging), style, assignments, edits }`.
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
(1) **Heightfield:** 5-octave fBm (VG's measured character, `_critic-vg-ng.md` V7) with a low base frequency and a
relief-character amplitude (flat / rolling / hilly / mountainous, metres by class), plus **authored site primitives**
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
clamp a kind to zero or raise its floor; S2's resource gates and S12a's outside sites read these rasters. S1 also
writes the site's geology flag — soluble rock or volcanic — to §2.3 for the underground layer's caverns, and quarry voids
read `SiteResources.stone` (item 65, II.7).

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
a mode that depends only on the rung, the climate row and S1's relief and resources), `coppiceHa` and `managedWoodHa`
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
   score candidates: pick i scores the contour's candidate points by angular gap to the earlier picks, nearness to a
   requested bearing, terrain (saddles and valley exits up, steep ground down) and a jitter, so a smaller N is always a
   prefix of a larger one. Each pick carries a **bearing**: the requested bearing it serves or, when none was requested,
   the least-cost outward direction from the pick to the frame; a bearing's **trade weight**, which (12) and §4.7 S10b's
   trade rows read, comes from the circumstances' trade slice, whose partners §7.7's derivation row maps onto bearings
   (items 72 and 20 (h)). A polycentric nucleus's first picks are forced at the
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

=== REPLACE ### 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check ===
### 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check

Each growth stage k runs four sub-steps. Stage 1 commits the boundary, gates and trace S3 fixed (§4.2 S3 (6)–(9)); a stage
k ≥ 2 takes its boundary first, then its main roads, then its trace, so every gate lies on the boundary it was picked on.

**S5a Stage boundary and enceinte trace.** *Boundary (FTG-5, COV-FTG-D26; J-P7):* the boundary of stage k is a level set
of **network travel cost** `T(x)` — the least cost from the plaza(s) over the S3 / S4 lattice, where a lattice edge inside
an arterial's corridor costs ρ_road per metre and any other edge ρ_off per metre, both times the slope term; water is
impassable except along decks, reservations are impassable. The **anisotropy ratio** `a = ρ_off / ρ_road` is a
stage-regime and form row (our equivalent of FTG's spoke-priority control): walled core 1.3, walled rings 1.8, ribbon 4,
suburb 3, `linear-street` form 8 — our own values; FTG's measured road / non-road 90th-percentile radius ratio of
1.26–1.65 on its two captured cities is the calibration target for the extramural stages (B-REF, §13.5). `a` also
controls the wide-versus-elongated balance of ribbons and suburbs: on a flat, dry site a walled core is compact and the
outer stages stretch along the main roads. `T` is **one field**: computed at S3 (§4.2 S3 (6); ≈ 4 ms at CITY),
recomputed once after S3's L0 batch only when a moat was carved; S4's remaining routes and the harbour route are not in
its road set; each S5b's new main roads re-settle `T` incrementally, only at the nodes whose cost they lower, so no stage
computes a new field (SCL-3). **Stage 1's boundary is S3's contour, and S5a commits S3's trace for it unchanged.** For
k ≥ 2 the boundary is taken from `T` **as it stands when stage k begins**, before its own S5b: `t_k` is chosen so that
the land of `{T ≤ t_k}` ∪ the enclosure of stage k − 1 equals the land of stages 1…k from S2 (lattice nodes sorted by `T`,
their cell areas accumulated; exact to one cell) — the union keeps the stages nested even where a moat raised `T` just
outside the previous wall — and the boundary is that region's outer contour, Chaikin-smoothed and resampled. S5b then
picks and routes the stage's primaries on that boundary; their re-settlement of `T` serves stage k + 1 onward, so the
boundary a gate was picked on is the boundary the trace passes through.

*Trace (GEO-18, FTG-8).* For a walled stage the trace is fixed **before the stage's secondaries grow** (stage 1 by S3,
§4.2 S3 (9); k ≥ 2 right after S5b) by one rule set, the registered `EnceinteStrategy`: the boundary → pulled to
defensible ground within a 40 m search band (local ridges, slope breaks, river banks: a cost-surface path around the town
with a penalty for leaving high ground), with **the gates pinned** where the arterials cross the boundary (stage 1: S3's
gates; k ≥ 2: every crossing of an S4, earlier-S5b or this stage's S5b arterial) and an `on_enceinte` castle **welded
through its two weld vertices** (the shared edge is one wall; MFP-3) → pinned-vertex Laplacian smoothing in 3 passes
(`wall.smoothPasses`, a wall-table row; provenance `ref:MFCG 12710731 three pinned smoothing passes (code)`, P12;
J-A46.43), the gates, the weld vertices and the two shore anchors of an open chain never moving →
**topology-preserving** Visvalingam (the kernel's `simplify`, §3.4: minimum segment 20 m, no interior angle < 100°; a
removal that would make the trace touch itself, cross water, enter a reservation or move a pinned vertex is refused) →
inserted on L1 through `insertChain` as a `mandatory` chain carrying the `wall` role, gate vertices carrying `wall_gate`.
On a shore or bank the trace is attracted onto the outline, so the shared stretch is one edge carrying both roles (§3.6).
A second castle on an outer enceinte (the citadel of §4.2 S0) is sited by §4.2 S3 (8)'s rules against its stage's
boundary and entered as an L1 barrier face in that stage's trace batch, with its gate and any moat deck.
*Water and the waterfront (COV-MFCG-C07; J-P25).* The trace never crosses water except at a **water gate** where a river
passes: its two vertices on the river's banks carry `('gate_end', gate, 0 | 1)` and the `Gate` names them in `banks`
(§2.2 rule 7, §2.7). A generated gate's bank vertices are the trace's vertices on the shores, placed by S5a's L1 trace
batch after the water exists (L1 Steiner vertices on the L0 shores, or L0 shore vertices where the trace attracted); an
edited gate's (§4.11, §7.3 (b) 3) are promoted to L0 by the water's batch (§3.3 rule 3); every water gate names its bank vertices the
same way, and both kinds are held under a warp unless `fromLevel = 0`, as a deck's are (§3.6; J-K35). On a coast or a
river bank the trace may be an **open chain** whose ends are anchored on a shore, bank, cliff or another enceinte; its
enclosure is closed by the L0 shoreline for every "enclosed" and "sealed" test. The preset's `waterfront` row: `open` (the
default — MFCG's coastal wall stops at the water, FTG's captured wall is an open 17-tower chain from bank to coast: no
wall along quays and beaches), `quay_wall` (a wall along the waterfront) or `sea_wall` (a full wall); under either wall a
water gate stands at every quay access, so every quay stays reachable through a gate. `placement: 'aroundStage'` traces
only the stage's new ring, as an open chain anchored on the previous enceinte (FTG's "around stage lots"). Nothing grown
later crosses the trace except at a gate, and S6 treats it as a barrier. If an inward pull would leave the stage's land
short by more than the S5d tolerance, the pull is capped at the smoothing step (reported); F-WALL's ladder is §5.2's.

*Outer moats.* When the blueprint's `moat` is `all`, S5a carves stage k's moat (k ≥ 2) right after committing its trace,
through §4.11's carve path. Its way rule meets only arterials here — each just outside one of the stage's gates, the
stage's secondaries not yet grown — so every way is kept with a deck and nothing is cut: the L1 batch places each deck's
two pinned bank vertices on its arterial where the channel's banks will cross it — the `deck_end` rows of a fresh `Bridge`,
`built` with that arterial as its way (§2.7) — the span between them carrying `deck` (the arterial is re-routed between
the gate and its next pinned node beyond the channel where it would meet the channel more than 10° off its normal, as §4.3
re-solves S3's moat stretches); the L0 batch inserts the channel (the era row's width, outside the outer half-band and a
berm) through those prepared vertices, so each span becomes its deck, perpendicular to the channel and continuing its
gate's passage across. S7 builds the bridge furniture (§4.8) and S5c treats the moat as water. Nothing finer than L1
exists yet, so the carve's footprint clears nothing. The innermost enceinte's moat is S3's (§4.2 S3 (10)).

**S5b Main-road step (FTG-4; stages k ≥ 2 and every epoch stage).** The stage's primaries match its gates: `N_k` = the
gate law of §4.2 S3 (4) on the land inside the stage's enceinte, with its waterfront reduction where the stage's boundary
runs along a sea or lake shore for at least `gate.waterfrontShare` of its length (walled; J-A46.42), or one primary per `mainRoadSpacingM` of
boundary (unwalled; 450 m at CITY). The existing arterials all continue to the frame, so they cross the new boundary `c`
times; when `N_k > c`, S5b spawns `N_k − c` radial destinations on the boundary by nested picks (largest angular gaps
first, terrain-scored like gates) and routes each with the incremental S4 router (§4.3) from the nearest junction on an
existing primary *outside* the previous enceinte (never through an inner wall) to the frame at its bearing. It routes
under S4's F-ROUTE ladder (§5.2), extra-bridge rung included; where that rung fires on standing water, S5b's L0 batch of
two same-level shore splits precedes its L1 batch (§4.1's S5 row, §4.2 S1 (5)). The crossings become stage k's main
gates; posterns only for an explicitly requested remainder. An outer enceinte never gets fewer gates than arterials cross
it; a request below that is raised and reported (a requested gate count applies to the innermost enceinte, MFCG's
semantics). **Test:** primary length per km² and the share of gates on primaries in band from TOWN to METROPOLIS; each
epoch stage whose `N_k` exceeds its crossings adds ≥ 1 primary.

**S5c Growth of the secondaries.** Inside the boundary a priority queue of proposals grows streets FTG-style (CONFIDENCE
C5): each proposal `{origin junction, heading, curvature, goalHeading, class, remainingSegments, branchCounter,
priority}`, lowest priority first; step length by class (secondary 25–40 m, lane 15–25 m; FTG's district streets persist
at (L + 0.5)/2 ≈ 25–30 m, `_critic-ftg.md` F3, where our tables start).
* **Division of labour with the bent cut (MFP-2; J-P4).** In **walled regimes** S5c grows only the arterial-connecting
  secondary network at district scale — proposals seeded at arterial junctions and gate plazas, separation floor
  120 / 160 / 200 m at TOWN / CITY / METROPOLIS, destination bias toward other arterials — and every lane and finer
  intramural street comes from S8's recursive bent cut of the district polygon, which inherits the wall's and the shore's
  direction (the MFCG street-signature targets are §13.5's). In **extramural regimes** (ribbon, suburb, unwalled rings,
  the ground between polycentric nuclei) growth works at block scale as FTG's does.
* **Heading model per proposal class and preset (FTG-17, FTG-6; J-P8).** `ou`, a mean-reverting curvature walk:
  `κ ← ρ·κ + (1 − ρ)·κ_goal + s·√(1 − ρ²)·ξ` per step Δs, with `ρ = e^(−Δs/ℓ)` (correlation length ℓ),
  `κ_goal = (θ_goal − θ)/L_r` (reversion toward the proposal's goal heading over L_r), `s` from `headingSigma` in degrees
  per 100 m; organic defaults 20° per 100 m, ℓ = 90 m, L_r = 250 m; planned 5° per 100 m. At the organic defaults a 600 m
  street's net turn is p50 21°, p90 50°, 0.1 % beyond 90°, and the per-30 m-step turn p95 11.4°, p99 14.9° with Gaussian
  tails — no cliff and no curling (receipt `docs/validation/bench/fixall_pipeline_ou_heading.out`, 4 000 streets per
  setting). `radiusHold`: ring proposals keep the curvature 1/r of their radius about the centre with a small `s` (the
  `ringed` preset); `gridLock`: headings snap to the preset's grid table (`american`). CI tests the drift distribution per
  preset.
* **Branching** after `n` segments with a per-class probability, perpendicular ± jitter (FTG's `Continue`) or tangential to
  the centre (FTG's `Curve around origin`, the `ringed` preset's ring branch).
* **Destination bias**, switchable per class and preset: a proposal that can reach an unserved destination or an existing
  spine within ≈ 1.5 step lengths turns toward it (connecting the fabric, ending cul-de-sacs deliberately); off for suburb
  offshoots and ring proposals.
* **Legality (explicit, unlike FTG's unstated thresholds; GEO-37).** Minimum separation from parallel spines = the
  regime's separation, and the same clearance applies to shores, wall setback bands, reservations and the stage boundary:
  a proposal running within `max(minimum block depth of the regime, separation / 2) + half its corridor` of any of them
  and within 30° of parallel is deflected or rejected, so no strip thinner than a plot depth is left; a proposal meeting a
  shore or a reservation at ≥ 30° ends there (a street arriving at the quay). A wall is never crossed except at a gate: a
  proposal reaching the setback band stops there. Snap to a junction within `0.35 · step`. **Crossings follow the preset's
  crossing matrix** (proposal class × crossed class → stop in a T, cross with a materialised crossroads, or deflect):
  organic crosses only a lower-or-equal class collinear within 6° (the rare crossroads, O4 b); `ringed` crosses radials
  with rings; `american` crosses on the grid. **Water:** a proposal whose class row allows a bridge (`secondary` and `lane`
  by default) and that meets a river or canal bank within `0.35 · step` of a `site`'s bank vertex (§4.2 S1 (5)) snaps to it
  and continues across that deck to the far bank vertex, which builds the bridge (§2.7) — FTG's crossing proposals becoming
  bridges, the sites' 40 m minimum spacing playing its minimum distance between bridges; any other proposal meeting water
  ends there as at a shore. Slope ≤ class limit. Junction rules as §4.3, with T-preference in organic regimes; the
  junction-degree band is a preset row (organic 4-way 0–15 %, ringed 20–45 %, american 40–80 %).
* **Between stages:** prune dangling `secondary` chains shorter than one block width; trim only S5-grown provisional spines
  that run beyond the boundary (FTG-18) — **S4 and S5b arterials are never trimmed**. The boundary becomes the next stage's
  start.

**S5d Capacity check (FTG-2).** Right after S5c the stage's new coarse faces are priced: built land per face = face area
− the corridor reserve of its spines (declared half-widths) − reservations; each face's band is the driver-only prosperity
field at its centroid (S6 pass 1's kernels) cut by provisional cut points computed as §4.5 computes the recorded bands,
over the land grown so far (S6 then records the town's `FieldBands` once, over all stages). If the land per band falls
short of the stage's demand `Σ n(c, b, k) · plotArea(c, b) / plotShare` by more than 5 % in total, **one top-up** runs:
the level set grows to cover the shortfall, S5a re-traces only the affected arc between its pinned gates, and S5c grows
the added rim — except along a moat: a moated arc is never re-traced, so a moated stage's shortfall moves to the next
stage's quota (the last stage's to the exact check), reported. A remaining shortfall goes to the exact check after S10
(§4.7) and to the F-SITING reconcile, reported (F-BUDGET-STAGE, §5.2). **Test:** §13.2's B-CITY `wealthLevel` sweep.

**Stage regimes** (a table; `StageRegime` rows per rung, era and form):

| regime | where | block-depth band floor | separation | `a` | heading / bias | notes |
|---|---|---|---|---|---|---|
| dense core (walled) | stage 1 | 30–45 m (applied by S8) | 120–200 m (district-scale secondaries only) | 1.3 | `ou`, bias on | lanes come from S8; T-preference |
| walled rings | walled stages ≥ 2 | 45–70 m (S8) | 120–200 m | 1.8 | `ou`, bias on | courts and rear lanes (S8) |
| ribbon (default extramural) | outside the last enceinte along arterials | plots directly on the arterial, depth band 30–50 m, **starting beyond the outer setback / glacis** (MFP-9), density falloff by a distance-to-gate kernel (the idea of MFCG's outskirts filter) | — | 4 | — | MFCG's outskirts: 71–85 % of its extramural buildings lie within 100 m of a gate road (red-team EXP) |
| **suburb** (FTG C10; preset, era row or shanty toggle only — MFP-6) | a final regime outside the last enceinte | 40–60 m | 80 m | 3 | offshoots, bias off | an optional **perimeter lane** (FTG-20) — the previous enceinte's outer boundary offset by setback and glacis, typed `lane`, broken at arterials — seeds offshoots at a 60–90 m spacing row besides the arterial seeds; offshoots grow as `cul_de_sac` / `lane` proposals **without destination-bias termination** (deliberate dead ends), no infill below the band; plots **directly along the offshoots with small lots from the outset**, a per-plot density Bernoulli from the distance-to-gate kernel leaving gaps; calibration references: FTG's 83 cul-de-sacs, 30.00 m suburb streets, 14.70 m lot outlines (`research/ftg-capture/roadlength100/README.md`) |
| `american` / `ringed` presets | on request | — | preset | preset | `gridLock` / `radiusHold` | crossing matrix and junction band per preset; fixture: `ringed` on a flat site gives ≥ 3 closed rings with radius CV ≤ 10 % and ring × radial crossroads |

The alternatives rejected for this construction are recorded with J-P4 and J-3.

**The fusion risk gate (O4 f) and its fallbacks.** S4 + S5 + S8 infill ≤ 100 ms at CITY on reference hardware; the
infill's block-area and junction-degree distributions inside the NG-measured bands on the same district shapes **and**
MFCG's street-signature rows (orientation coherence at 60 / 120 / 250 m, wall and shore alignment by distance band, T/Y
share, intramural dead ends, blocks per ha, lots per block) inside their bands (§13.5). M0 measures this before anything
else is built (§16). If the gate fails on time, extramural growth also stops at `secondary` (`lane` becomes infill-only
everywhere) and the gate is re-run; if it fails on statistics, the infill constants are recalibrated against the NG vertex
captures and the MFCG size-sweep exports (spike M0-b) before M1. Neither fallback changes the architecture. The gate is
repeated at M1 on B-CITY-lite's river, coast and relief configurations with M1's pre-decided fallbacks (§16; IMP-13).

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
placement from its character vector, names and describes it (item 72's paragraphs of this section); the kinds stay this
typing, which the later stages read. **Shanty districts (FTG's rule as the
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
6. **The underground pseudo-district (owner-staged; item 12, II.7.3).** When `Features.sewers` is on and the preset yields
   navigable mains, S7b creates the underground pseudo-district's `Allocation` after (5) and before (1) — the poorest band's
   `undergroundShare`, the classes whose row is `underground: 'preferred'` and, in an epoch, the crowding hook — capped by
   the predicted navigable capacity; the rows, the law and the cap are II.7.3's; the ground's districts receive the
   remainder as they do for the sky.
7. **The undercity (owner-staged; item 65, II.7).** Where an undercity exists, S7b creates its allocation after (6) and
   before (1) — the poorest households (the `squalid` band), the outlawed and the clandestine institutions whose mode is
   underground — capped by the void's capacity; II.7 states the rows and the cap, and the districts above ground receive
   the remainder, so the population stays whole.

**The due mark and the dossier's rows (items 22 and 31; J-A31.45).** §4.11's geometry floor reads `FieldBands.middle`
as the band-set bullet above designates it (J-A27.42, J-A31.45). An epoch's re-evaluation acts on a block only by marking
it **due** when its value crosses a cut by more than the hysteresis above (`Block.due`, §2.5); §4.11's wealth ladder does
the rest, and the "Over time" bullet reads through it — surviving plots transform by the ladder's rungs, never by a
re-derivation. S7b allocates S2's fixed dossier rows before the free demand in each rank of its order (§4.2 S2,
item 22 (d)).

=== REPLACE ## II.1 The district → neighbourhood interface ===
## II.1 The district → neighbourhood interface

```ts
interface Seam {                               // one per boundary run, created by S6 and read by both districts it separates — from milestone 1 (G-P1)
  id: Id; sides: [Id, Id | null];              // the two districts in address order; null: a one-sided run (frame, water, cliff, sky)
  edges: SeamEdge[];                           // in the first side's ring order; each: { chain: ChainRef /* the shared way, shore, wall, reservation-boundary or perimeter chain */, type: 'way'|'water'|'wall'|'reserve'|'field'|'cliff'|'frame'|'sky', reservation?: Id /* 'reserve' only: the reservation whose `reserved` boundary the run follows */, wayClass?, widthCm?, frontageSide?, hard: boolean }
  portals: Portal[];                           // every way that crosses or meets the run: { id, wayId, class, widthCm, at: VertexRef /* ('portal', id) */, bearing, from: 'growth'|'baseLane'|'closeup', by?: Id /* the district whose lane or close-up added it */ } — every one must be connected
  amendments: SeamAmendment[];                 // the vertices inserted on a shared spine after S6: S8's lane ends and close-up T-junctions — one record, so both sides always agree
  boundarySamples: { prosperity: Sample[]; density: Sample[]; greenery: Sample[]; terrain: Sample[] };   // along the run; `hard` seams jump, soft seams interpolate
}
interface SeamAmendment { kind: 'baseLane'|'tJunction'; spine: Id /* the shared boundary way */; vertex: VertexRef /* ('junction', the new junction's id): inserted at level 1 by splitThrough or as a lane's end */; portal: Id; by: Id /* the district whose batch inserted it */; cause: 'generation' | EditId /* S8's run, a regenerate, or the close-up's event */ }
interface SeamContract {                       // a district's view, assembled on demand from its Seam records; never stored
  district: Id; seams: Id[] /* in ring order */; sharedGeometry: 'ownedByBase';   // shared edges are generated once by the base; neighbourhoods change them only through a SeamAmendment
  plotLinesOnBoundary: EdgeSetRef[]; alleysOnBoundary: Id[];   // resolved from the district's own plots and alleys
  interiorSamples: { prosperity: Sample[]; density: Sample[]; greenery: Sample[]; terrain: Sample[] };   // on an interior lattice
}
interface NeighbourhoodRequest {
  district: Id; key: PlatKey /* the ground, the sky island's arena, or the underground arena (layer 'underground') */; boundary: TypedBoundary; seam: SeamContract; context: DistrictContext /* kind, venue mix, character, prosperity band, growth stage, water, walls, slope */;
  laid: { blocks: Id[]; plots: Id[]; alleys: Id[] };   // the base's own L2/L3 fabric under this district (R's `laid`)
  layer: 'ground' | 'sky' | 'underground';     // sky: no portals, no roads in or out (the floating-island context); own terrain optional; underground: the underground close-up (below)
  mode: 'refine' | 'replace';                  // refine: presentation detail only (derived); replace: a template fabric (a model edit, II.4)
  strategy: FabricStrategyId; params: Record<string, number>;   // 'bent-cut' (refine; NG's `area` template) | 'ring' | 'square' | 'street' (replace)
  outlineTemplate?: 'disc'|'d_shape'|'lozenge'|'crescent'|'spindle';   // standalone and sky calls only (§4.2 S1 (2))
  // streams: keyed from the district's lineage on demand (§6.1); nothing stored
  lod: 'neighbourhood';
}
interface NeighbourhoodResult { blocks: Block[]; ways: Way[]; plots: Plot[]; buildings: Building[]; greens: Greenery[]; pins: Pin[]; labels: LabelEntity[] /* §9.1 */; seams: SeamReport; report: StageReport }
interface SeamReport {                         // written by every close-up; its numbers are stage-2 feature S1's acceptance (II.5)
  portalsTotal: number; portalsConnected: number /* must equal portalsTotal */; unconnected: Id[]; addedPortals: SeamAmendment[];
  sharedEdgeHausdorffCm: Cm /* must be 0: shared edges are read from the base; an amendment only inserts a vertex on them */;
  fieldJumps: { at: PointCm /* a sample position, not a vertex */; field: 'prosperity'|'density'|'greenery'; delta: number; hard: boolean }[] /* a jump on a soft seam outside its band is a soft-invariant failure */;
  superseded: { old: Id; new: Id }[];          // §6.3's successions for the entities a template replacement re-derived (anchor rule, §2.1, §6.3)
}
interface NeighbourhoodStrategy { generate(req: NeighbourhoodRequest, ctx: StageContext, k: Kernel): KernelResult<NeighbourhoodResult> }
// Pin is defined in §2.7 (the complete furniture vocabulary, in the entity registry from M1)
```

**Seam records (J-P33).** One `Seam` record per boundary run, read by both districts it separates, so the two contracts
cannot disagree and a district's re-derivation changes only the seams it is party to (§4.6, II.4). **Seam edge types
(J-P37).** An edge's type is the first its role rows give: `way` → `way`; `wall` → `wall`; `shore` or `bank` → `water`, or
`cliff` where the bank kind is cliff; `reserved` → `reserve`; `district_bound` alone (the settlement perimeter) → `field`;
`border` or `margin` → `frame`; a sky arena's outline → `sky`. A **`reserve`** run is a reservation boundary two districts
share with no way on it — a plaza's, precinct's or market's edge where the grower's edge test stopped (§4.5): its shared
geometry is the `reserved` chain and the two parts of §4.5's margin band along it; it has no portals; a close-up ends its
plot lines on its own part's inner edge and writes neither part (a `replace` close-up's scoped regeneration re-lays its own
side's part, §7.3 item 2). `hard` comes from the seam-type row of the editable tables (§7.6): `wall`, `water`, `cliff`,
`frame` and `sky` hard; `way` and `field` soft; `reserve` by the reservation's kind — castle and precinct hard; plaza,
market, park and institution soft.

Rules: (1) the base generates every shared edge once and both districts read it; (2) a close-up either **refines** — adds
the neighbourhood-LOD presentation detail (roof construction and hatching, surfaces, pins, trees, local street names) as a
pure function of the district's committed base state, its sub-seed, strategy and params, never changing L1–L4 geometry — or
**replaces** the base's plots with a template layout inside its boundary with `ring` / `square` / `street`; the templates are
`FabricStrategy` registrations selected per district (G-P2), so a template district is laid by the base's own engine with
seams by construction; (3) **seam amendment (GEO-30):** a close-up may end a street on a shared boundary spine (NG's cuts end
on existing roads, 361 / 361; the ring template's radials run to the edge); each such end is a T-junction inserted with
`splitThrough` at level 1, so the shared spine stays one chain, recorded as a `SeamAmendment` (kind `tJunction`) and a new
portal in the shared `Seam` record both districts' contracts read.
**The neighbour step (J-P38)** is the only write on the other side, the same for a close-up's T-junction and for a lane a
district's reroll adds or removes on a shared spine (§4.6 step 7): one L2 batch whose only face is the neighbour's
half-corridor strip along the split spine edge inserts one `corridor_split` edge from the junction vertex to the foot of its
perpendicular on the neighbour's kerb — the edge `corridorUnion` builds on a side the spine passes straight through (§3.7),
so each spine sub-edge keeps its own strip (§2.2 rule 1) and that side gets no wedge. A half-corridor strip holds no L3
content (avenue and street-tree rows are `Greenery.along` records, §2.7), so the batch clears and re-derives nothing: the
neighbour's blocks, plots, footprints and greenery are neither in its face nor re-derived. The edge's kerb end lands, by
§3.6's attraction, on a vertex of the kerb's route within `attractCm` — a plot-line end or footprint corner there is
promoted to L2 (§2.2 rule 3): every ring of the vertex's own level and finer stays as it was, and each coarser ring along the
kerb gains it (the neighbour's block at L2, and its plot at L3 when the promoted vertex is an L4 footprint corner) — or
otherwise splits the kerb at L2 by the placement rule, adding that one vertex to the rings through it and, by §2.6's
wing-carrying rule, to the wing ring of a building whose footprint fronts that stretch of kerb; either way each changed ring
equals its prior ring with the vertex removed (II.4's seam exception). Removing the street reverses the step, whether by an
undo, the district's reroll or any later edit: `removeEdges` takes the `corridor_split` out, the strip is one face again, a
kerb vertex the step created dissolves (`split` flag, no role) and leaves the wing ring it joined, and a plot-line end or
footprint corner the step promoted returns to its level by demotion — it kept its `split` flag, which only a warp that has
since moved it or the kerb vertices beside it clears, making the bend part of the kerb's true shape (§3.6) — so the kerb's
L2 route, index and digest, and every ring the step touched, are those before the step, with any later change to the kerb
kept (§2.2 rule 3; test §13.1). Every portal stays connected (stage-2 feature S1's acceptance: portal connection 100 %,
shared-edge Hausdorff 0; II.5).
(4) Footprint hashes at city LOD and neighbourhood LOD are identical for every entity a `refine` close-up covers
(refinement never changes geometry); the close-up's persistence is II.4's; a `replace` close-up re-derives its entities under
the anchor rule and records §6.3's successions in `SeamReport.superseded`. (5) The standalone no-portal mode is the same call
with a synthetic boundary drawn from an **outline template** (§4.2 S1 (2); NG's template outlines, our own shapes;
COV-NG-N06) through §4.2's closed-outline routine; the **sky-island call** is the same request with `layer: 'sky'`, an
outline from that routine, optional own terrain echoing the ground, no roads in or out, and a `reason` (II.6), its shadow
projected onto the ground layer by §8.4. (6) **Base lanes on shared spines:** the lanes the base's own S8 ends on a
district-boundary spine are the same kind of vertex, recorded in the same `Seam` record with kind `baseLane` and kept at
least a portal gap from every other portal on the spine (§4.6 step 7), so a close-up reads them like any portal and a reroll
of either district changes only the seam records it is party to, the vertices it inserts or removes and their neighbour
steps (3) (II.4).

**Close-ups and the geometry floor (item 31).** A `refine` close-up reads the committed plots and changes no plot
record — `builtBand` included; a `replace` close-up is a model edit of the redevelopment class (II.4): the plots its
template lays take `builtBand` and `builtProsperity` from the band and value the template read, as a rung-3 event of
§4.11 does.

**The underground close-up (II.7.3).** With `layer: 'underground'` the underground pseudo-district opens as a `refine`
close-up — `key` the underground arena's `PlatKey`, no portals and no roads in or out, its tunnels the ways its plots
front, no `replace` fabric.

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
* **Farm modes — FTG's three farmland layouts, chosen as its `Default` chooses them, by size and landscape (item 26;
  provenance `ref:FTG farmland modes`, the keys ours; J-A26.43, J-A26.44).** FTG has four farmland settings: three
  layouts — `Farmsteads`, `Around perimeter` and `Around rivers` — and a `Default` that picks among them by the
  settlement's size and landscape, its climate presets overriding. A `FarmModeRow { rung: Rung; relief:
  'plain'|'rolling'|'hilly'|'mountainous'; land: 'fertile'|'poor'; mode: 'fill'|'perimeter'|'rivers'; riverBandM: M }`
  per rung × landscape — the relief character S1 drew and the fertile share of the frame's land
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
  temperate row's `rows` leaves the rung × landscape choice. The mode depends only on the rung, the climate row and S1's relief and resources, so S2 reads it
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

=== J-ROWS ===
| J-A45.41 | the castle repair in MFCG 12710731's order and toward its target: a thinness bloat while the claim's nearest vertex lies within `castle.minInnerM` (40 m) of its centroid, then equalise passes moving each free vertex 20 % toward the claim's best-fit regular polygon (≤ 20; repaired at 0.75, unrepaired at a gain under 0.001); an `on_enceinte` claim's weld vertices and, once fixed, the gate side's ends pinned; at generation the gate fixed on the repaired claim | §4.8 |
| J-A45.42 | the bloat kept a move of the claim's own vertices inside its reservation, and an unrepaired claim sent to the F-CASTLE ladder's next rung, never a restart | §4.8, §5.2 |
| J-A46.41 | the waterfront reduction `N₁ = 2 + ⌊0.75 · (N_land − 2) + ½⌋` where the pick contour runs along a sea or lake shore for at least `gate.waterfrontShare` (0.1) of its length; the metric area law, the nested picks and a requested N kept; a river takes water gates | §4.2 S3 (4) |
| J-A46.42 | the waterfront reduction applied to a later walled stage's `N_k` by the same condition on that stage's boundary | §4.4 S5b |
| J-A46.43 | the trace's pinned Laplacian smoothing fixed at 3 passes (`wall.smoothPasses`), the gates, the weld vertices and the shore anchors of an open chain pinned | §4.4 |
| J-A47.41 | the grower's round-robin turns with a skip rate for each seed kind (`district.growthRate`: gate, castle and bridgehead 0.1, riverbank 0.5, others 1), the bridgeheads of arterial bridges among the seed features, each turn's draws on `district.seed` keyed by seed lineage and turn; the arterial barriers and the count law kept | §4.5 |
| J-A47.42 | a district grown from a seed whose rate is below 1 exempt from the band floor's merge (it keeps its seed face); faces no grower could claim seed further districts in face-id order | §4.5 |
| J-A57.41 | the sector-look preset named by its two builds, its cells made fields in outward order by nearness to the settlement's edge under the mode's extent rule — stopping at the arable demand under `demand`, over the mode's land under `fill` (J-A26.42 kept) | §4.9 |
| J-A57.42 | the MFCG variant's sub-furlong fields and paths drawn as render-time segmentation of the furlong faces (J-I6 kept) | §4.9 |
| J-A57.43 | the farmsteads the farm table's count under either sector variant; MFCG 12710731's one farmstead in five fields stays descriptive | §4.9 |

=== RATIONALE-A ===
| J-A45.41 | Chose to repair a thin or irregular castle claim in MFCG 12710731's order and toward its target — first a bloat while the claim's nearest boundary vertex lies within `castle.minInnerM` (40 m: MFCG's coded 10 units at its 4 m unit) of its centroid, every free vertex moving radially outward by 5 % of its distance per step up to the area band's top; then equalise passes moving every free vertex 20 % of the way to its place on the claim's best-fit regular polygon (as many vertices as the claim; centre, radius and phase from the ring's first Fourier component; at most 20 passes; repaired at compactness 0.75, unrepaired when a pass gains under 0.001) — with an `on_enceinte` claim's two weld vertices and, once the town-side gate is fixed, the two end vertices of the side that carries it pinned, over the former order (equalise the angles toward the regular polygon's, then bloat) and its equal-angles target, because the reading of MFCG 12710731's code (P10, CONFIRMED) shows it treats thinness before shape, and because "equal interior angles" is not a well-defined target — a thin rectangle has equal angles and still fails the compactness gate — while a regular polygon fitted to the claim is well defined and moves a claim toward compactness by construction; MFCG 12710731 pins its castle gate, which in our construction is a side's midpoint fixed at S3 (8), so at generation the claim is repaired first and the gate fixed on the repaired polygon, and a later repair (the `equalize` edit) pins the gate's side, which keeps the castle street's destination where it is; the weld vertices are pinned because they must stay on the boundary the trace welds to (§4.2 S3 (8) and §4.8; item 45). |
| J-A45.42 | Chose to keep two parts of our castle repair where MFCG 12710731's differs — the bloat moves only the claim's own vertices inside its reservation, where MFCG pushes its committed mesh radially, and a claim the passes cannot repair takes the F-CASTLE ladder's next rung (re-site, then a keep without a bailey, both reported), where MFCG restarts the whole city when a pass gains too little — because at S3 the claim is a reservation polygon with nothing committed inside it, so moving its own vertices is the whole effect MFCG's push has on the castle while no other geometry moves, and because the design's first failure principle is no whole-map discard-and-retry (§5.1): a restart would change every other entity of the map for one castle's shape (§5.2 and §4.8; item 45). |
| J-A46.41 | Chose to reduce the gate law's value where a nucleus has a waterfront — its pick contour running along a sea or lake shore for at least `gate.waterfrontShare` (0.1, our own, calibratable) of its length — to `N₁ = 2 + ⌊0.75 · (N_land − 2) + ½⌋`, keeping the metric area law and the nested terrain-scored picks, over adopting MFCG 12710731's coded law as it stands (2 + ⌊0.75 × inner cells ÷ 12⌋) or leaving coastal towns at the land law's count, because MFCG counts mesh cells whose size grows with the town, so its linear cell law and our √A law agree on the coastless sweep and its coastal factor is best restated on our law's surplus over two gates (P11; the wording the evidence gate's review corrected: MFCG's recorded coastal counts are 3 / 4 / 5 / 7 at sizes 26 / 39 / 51 / 80); because nested picks make the picks for a smaller N the first picks for any larger N, so the reduction changes no pick's identity; because the condition is read on the pick contour, which exists when the picks are made, and not on the stage-1 boundary, which S3 draws only after the gates' routes are solved; and a share rather than a touch, because a town meeting the water along a few metres has no water side to its circuit. A requested N and a river's water gates stay outside the reduction, as MFCG 12710731 applies its factor for a coast alone (§4.2 S3 (4); item 46). |
| J-A46.42 | Chose to apply the waterfront reduction to a later walled stage's main-road target `N_k`, by the same share condition read on that stage's boundary, over reducing the innermost enceinte only, because MFCG 12710731 walls one ring and so has no behaviour to emulate for outer rings, while the reduction's reason — part of the circuit is water and needs no land gate — holds for any ring; an outer ring still never gets fewer gates than the arterials that cross it (§4.4 S5b; item 46). |
| J-A46.43 | Chose to fix the trace's pinned Laplacian smoothing at three passes (`wall.smoothPasses`, a wall-table row with provenance P12) and to name its pinned vertices — the gates, the weld vertices and the two shore anchors of an open chain — over leaving the pass count unstated, because MFCG 12710731's code smooths its wall ring three times with its shore and citadel vertices pinned, and an unstated count can be neither implemented alike by two builders nor tested (§4.4; item 46). |
| J-A47.41 | Chose to grow districts in round-robin turns in which a grower sits out a turn with probability one minus its seed kind's rate (`district.growthRate`: gate, castle and bridgehead seeds 0.1, riverbank seeds 0.5, every other kind 1) and otherwise absorbs one admissible neighbour drawn uniformly, with the bridgeheads of arterial bridges joining the seed features and each turn's draws on `district.seed` keyed by the grower's seed lineage and the turn's number — over the former grower with no turn order or rates — and to keep our arterial barriers and the √A count law, because the reading of MFCG 12710731's code (P13, whose parameters the critic re-derived) shows these rates keep gate, castle and bridge wards small while the central districts spread, a realistic size variety the design lacked (§13.5's MFCG anchors span 2.4–17.6 ha at size 40); because keyed draws let §7.3's S6 operator re-grow a scoped regroup by the same turns; because quarters are bounded by main streets (realism, and our quarter tree needs the barriers); and because the count law matches MFCG's ⌊√(city cells)⌋ seeds in metric terms on its size sweep (§4.5; item 47). |
| J-A47.42 | Chose to exempt a district grown from a seed whose rate is below 1 from the band floor's merge — it keeps at least its seed face — and to let faces no grower could claim seed further districts in face-id order, grown by the same turns, over applying the floor to every district or leaving unclaimed faces unstated, because a gate or castle ward grown at a tenth of the others' pace ends below `0.5 × A / N_d` by design, so the floor would merge away exactly the small wards the rates exist to make, and because MFCG 12710731 seeds its leftovers the same way, while the band's top still bounds every district (§4.5; item 47). |
| J-A57.41 | Chose to name the sector-look preset's two constructions by build — VG 1.6.9's cells seeded along the main road, on the shores and on a ring and bisected at right angles, and MFCG 12710731's lobed belt split recursively into small fields with paths — and to make the preset's cells fields in outward order, the cells nearest the settlement's edge first, under the mode's extent rule (stopping at the arable demand under `demand`, running over the land the mode gives the fields under `fill`), over the former single "recorded construction" (ring seeds cut by the OBB bisector, which neither build does) and over ordering the cells by how far each lies from the town's centre, because the readings (P17, P18) show the two builds differ; because VG 1.6.9's greedy claim outward from its houses is our demand-sized land use in miniature, and realistic — the fields nearest the settlement are taken first; because a town's built extent is not a point, so its fields are reached across its edge rather than out of its middle; and because J-A26.42 keeps `fill` the default, so the outward order decides which cells become fields first in either mode without overriding it (§4.9; item 57). |
| J-A57.42 | Chose to run the MFCG variant's split in the model only down to the furlong-sized field faces and to draw its 0.6–1.3 ha fields and 8 m paths as render-time segmentation of each furlong from its `render.instances` stream, over model faces at the variant's field size, because J-I6 keeps the model's field faces furlong-sized for the hinterland unit's budget (≈ 1 600 faces at CITY; SCL-3) and the variant's fields would multiply them two- to fourfold for no change in what is drawn (§4.9; item 57). |
| J-A57.43 | Chose to keep the farmsteads the farm table's count under either sector variant, MFCG 12710731's one farmstead on one field in five staying a description of that build, over letting the preset set the count, because the farm table is the only source of the countryside's numbers (item 26, J-A26.42), and a style preset that changed the number of farm households would break the agreement between farmland per capita and the farm classes' field area that the table guarantees (§4.9; item 57). |
=== END ===
