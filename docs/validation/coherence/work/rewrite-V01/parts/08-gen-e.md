### 3.11 Seams — what stage 2 adds to II.1

1. **Shared geometry** stays the base's (II.1 (1)): no seed or cut of D ever writes a chain outside D's faces except the
   T-junction vertices on shared spines and their neighbour steps (II.1 (3)).
2. **Portals and ends.** Every seed end and every lane end on a district-boundary spine is a `baseLane` amendment made by
   S8 (generation or a replace re-derivation), with §4.6 step 7's portal gap; a `tJunction` amendment is made only by an
   edit event that inserts a junction on a shared spine itself (a `drawWay` ending there), its `cause` the event (II.1
   (3), item 539). A seed never continues across a district boundary (§4.6 step 10).
3. **Field continuity** is the base's (§4.5: continuous fields, `hard` seams jump); S9b's seam guard (V01 §3.5.8) keeps
   the dispatch from making jumps the fields do not.
4. **Barrier runs** (item 106 (a), (f)): a boundary run on a barrier-closure arc types by its barrier kind by II.1's seam
   typing (item 541; J-VI.3), all hard; none carries a portal.
5. **Bounding ways' attributes**: a way on D's boundary reads both sides for its surface (V01 §3.7.3) and its naming
   context (V01 §3.7.2), so a re-derivation of D rewrites them; §7.3 item 1 puts the `surface` attribute and the naming
   record of D's bounding ways inside D's seam exception (item 369), and the locality oracle checks everything else as
   before.
6. **`SeamReport`** (II.1), written by every close-up, replace re-derivation and unit run: `portalsTotal` — the portals of
   D's seams; `portalsConnected` — those from which a walk along D's L1 ways reaches D's largest way component (a BFS over
   D's way graph — part 0 (V01 §2.3's parts table; on a sky arena the island's own part), each raised road one edge
   between its ends, never an aqueduct; portals on hard seams, which carry no way, excepted); `unconnected`;
   `addedPortals` — the amendments this run made; `sharedEdgeHausdorffCm` — the Hausdorff distance between each shared
   chain resolved before and after the run, 0 by construction (computed, not assumed); `fieldJumps` — at each boundary
   sample of D's soft seams, the difference between the field value sampled on each side's nearest block, flagged when it
   exceeds the seam's band (S3's, §13.7); `superseded` — §6.3's successions of the run: a replace re-derivation's, and a
   unit run's over an island that already holds content (V01 §3.10.3 (6) (b)); `landingsReached` — the landing attach
   vertices a walk along the run's ways joins to the district's largest way component, present where the run holds one.
   A standalone unit run reports `portalsTotal` 0; **a sky unit run reports `portalsTotal` 0** — its seams are `sky`,
   hard and portal-free (II.1 (5)) — its landing attaches being template portals of kind `landing` (V01 §2.3), reported
   as `landingsReached` beside `portalsConnected`; a ground district holding a ground landing's S8 destination
   (V01 §3.4.2 (a)) reports it in `landingsReached` likewise, its seam portals as before. A district with no way (every
   face below a block) reports `portalsConnected` 0 of `portalsTotal`, each portal `unconnected`.
7. **Retaining walls** (item 110 (a); J-V1.63). Every `RetainingWall` lies inside the faces of the district whose
   re-derivation produces it — the ward-edge wall on D's boundary setback line and the plot and block walls inside D's
   blocks (item 302) — or, when declared (source `declared`), where the author drew it: a declared wall that meets a
   shared chain is snapped off it to the side it was drawn on by its half-width (§3.6's attraction rule) and belongs to
   that side's district for scoping. No wall lies on a shared chain, so none is inside two districts' scopes. Its **step
   profile is derived** on read from the committed levels on each side (`stepProfile`, §2.7), so a re-derivation of the
   low-side neighbour E writes nothing of D's; E's replace dry run lists, as information, each wall of D whose derived
   step changes by ≥ `terrace.profileNoticeCm` (V01 §3.9). A boundary run along a wall stays **soft**: never typed
   `wall`, never a barrier-closure run of item 106, never hard (a retaining wall is never an enclosure, item 110 (a)); its
   portals are its crossings, each a stair or a ramp.
8. **Raised ways never bound a district** (item 110 (b)): `TypedBoundary`'s runs are part-0 seams, and an under-deck
   strip is a hole of the faces it crosses, never a seam run (V01 §2.3's parts table).

### 3.12 Determinism

**Concerns** (§6.1, item 340; appended with the next u16 ids, so no key moves; each non-rerollable):
* `fabric.select` — S7c's draw (V01 §3.3.4): keyed by **the district's own lineage key with the reroll component forced
  to 0**, attempt cap 0; a merge or split successor inherits its anchor predecessor's key (§6.3's anchor rule carries each
  district's lineage); a district minted by an edit keys by its creating event's `seq` lineage (§6.3). So a New random on
  D, a declared quarter, a merge or split elsewhere, or a Re-derive that renumbers S6's seed order moves no district's
  draw but its own inputs'.
* `hood.dispatch` — S9b's picks (V01 §3.5): a block's own draws (phase 2's content, pick ordinal 0; a yard's paving, pick
  ordinal 1; a ring centre's pick, ordinal 0) keyed by the block's lineage (whose derivation unit carries D's reroll);
  the manor picks keyed by the district as derivation unit (its lineage with its current reroll) with the pick ordinal
  as the creation index; attempt cap 0; the void-junction choice draws nothing.
* `hood.template` — the seed primitives' draws (V01 §3.4.2 (f)): keyed by the template face's cell with the seed's
  creation index, attempt cap 3 (F-TEMPLATE's redraw rung).

The contour series, the thalweg path and the precinct rings draw nothing (level lines, flow lines and outline offsets
are deterministic), and neither do `terraceState`, the parts table, the strips or deck ownership. Existing concerns read:
`cut.*` (the bent cut; `cut.arc` also the ring courses, II.2 — the radii's u at index 0, the district's one growth factor
at index 1), `pin.decor` (hood pins, keyed by the block or hinterland face **with the stage component `STAGE_VIEW`**, so no
hood-pin draw aliases S11's decoration draws on the same concern), `pin.centrepiece` (square centrepieces, keyed by the
block), `greenery` (court greening, keyed by the block), `blueprint.features` (the standalone S0's draws, appended in
V01 §3.10.1's order), `naming` (place names), `epoch.transform` (the `hood.fabric` participant, V01 §3.3.6).

**Stage components** (§6.3's lineage key). Template seed ways and plazas take `S8.seed`, a registered stage id of their
own (item 345), so a seed's lineage key never equals a lane's minted by the same cell's S8 run; T-V1-36's
address-collision test runs per template row over B-FUZZ's faces.

**Reroll semantics.** New random on a district advances its reroll: S8's streams (`cut.*`, `hood.template`, the ring's
`cut.arc`), S9b's `hood.dispatch` (the blocks' lineage and the district's manor key carry the reroll) and everything
below re-draw; its fabric does not (V01 §3.3.4). New random on a block re-draws S10 onward for that block; its content
stays (S9b is upstream). Hood pins re-draw only when their block re-derives: `pin.decor` is a geometry concern, so no
`rerollLayer` reaches it — a user wanting other pins re-rolls the block or edits the pins.

**Order.** S7c and S9b visit districts in lineage order and blocks in lineage order; seeds in row order; ring courses
innermost first; hood-pin sites in V01 §3.8.2's order. The pool changes nothing (S7c and S9b are eager hooks on the
generation worker; the refine derivation is a pure function), so pool sizes 0–3 give one digest; §6.5 (9)'s
derived-complete test covers the close-up by deriving every district's close-up in two orders and comparing the chunks'
hashes.

### 3.13 Failure handling (§5.2, item 327)

| class | where | detection | ladder (in order) | report | tested by |
|---|---|---|---|---|---|
| F-TEMPLATE | S8 (a seed primitive), a replace re-derivation's dry run, a sky unit run | V01 §3.4.2 (d)'s validation fails (a degenerate course among its cases); a plaza does not fit (V01 §3.4.5 (b)); a parallel spine's longest piece < `2 × eHi`; no ring fits; the row's requirement fails on the committed template face (V01 §3.3.7); a sky landing's attach or an island crossing site's deck end unreached (V01 §3.10.3 (4)); a contour series' level 0 not laid (V01 §3.4.3); a seed crossing a strip outside a qualifying `open` span (V01 §3.17.3 (3)); no void junction (V01 §3.4.5 (c)) | (1) redraw the seed on `hood.template`'s attempt 1–3 (a spine's control point and jitter; a ring series' phase; a plaza's coin and aspect); (2) shrink — a plaza's area × 0.8 (≤ 3), the ring count − 1 per step down to one, a parallel spine's offset ± `eLo / 2`, a contour series' level 0 ± `eLo / 2` along the fall, a strip crossing shifted along the strip to the nearest qualifying span; (3) substitute the row's `fallback` templates in order, each from rung (1), **only those whose `templateLandM2` on the committed face is at most the land S7c reserved**; (4) `bent-cut`, whose §4.6 ladder always completes — and lays a lane to an unreached landing attach or deck end; a deck end still unreached leaves its site a `site`, its span removed after S8 (V01 §3.10.3 (4)); a void square not made is left out, reported | `requestedVsBuilt` per district: delivered, simplified (rung 2), substituted (rungs 3–4) — a substitution writes the row built to `D.fabric` and that row's defaults to `fabricParams`, the requested row staying in the report (the fabric why provider recovers it, V01 §4.5); in a replace dry run, the bend named in one line (V01 §3.9) | T-V1-9 (every rung's count on B-FUZZ's faces, 0 crashes), T-V1-7 and T-V1-8 (rungs 1–2 on each primitive), T-V1-18 and T-V1-48 (rungs 3–4 named in the dry run), T-V1-21 (the lane to an unreached attach or deck end), T-V1-38 (the void square left out) |
| F-DISPATCH | S9b; S10a (ii) | a quota with no eligible site; a manor with no compound class; the land check (V01 §3.5.9) short; a `manor` block whose district holds no household of its band range after S10a (ii) | the unmet quota rolls to the next type (squares) and is reported; the block stays ordinary; **the household-less manor block reverts to `ordinary`**, reported, never left empty; S10b's reconcile and F-SITING as usual | `stage2.dispatch`: quotas, met, unmet, manors reverted, per district | T-V1-11 (d) (a forced unmet quota rolls and is reported; a household-less manor block reverts), T-V1-12 (the land check) |
| F-UNIT | the unit run (V01 §3.10) | the outline not simple after F-OUTLINE's repair; its area below `4 × eLo²` (not one block's worth); the standalone allocation empty; an island's outline face below one district's size | F-OUTLINE's ladder (§5.2); **an outline too small is scaled up about its centroid to `4 × eLo²` and the bend named in one line** (item 101 R2) — never refused; an outline F-OUTLINE cannot repair replaced by the kind row's `auto` outline, named; an empty class demand → households only; an island with no district's worth of land → no district, its allocation to F-SKY-UNIT (volume 5) | the unit's report | T-V1-20 (d) (an outline below `4 × eLo²` scaled up with its bend line; a non-simple drawn outline replaced), T-V1-21 (the island without a district's worth of land) |

No rung restarts anything above its district or unit (§5): a template failure never re-rolls the town, a dispatch
shortfall never re-cuts a block, a unit failure never touches the ground.

### 3.14 Constants (with provenance and table home)

Every numeric constant of V01 §3 is a cell of a table (item 23; DEFINITION §5 "Rules are data"): of its own row's table
where it belongs to a row, else a column of **`hood.constants`** (V01 §2.2) — its one `settings` row, each key a column
with its own `ColumnSpec` — whose key the rule's text cites. Only `editTable` changes them (§7.6). Style values are §8.2's
style-sheet cells. Values another unit owns are cited, never restated: volume 11's `ways.crossing` (`rampMaxGrade`,
`stair`), `terrace` (`slopeMin`, `stepMinCm`, `enabled`), the relief rows' `terracedEdges`, `raisedWays.structure`
(`clearanceCm`, the material rows), `aqueduct.terminal`; the base's `character.anchorSigma` (§4.5) and §11.1's
`vtt.retainingMinCm`.

**Row cells.** Constants that belong to a row live in that row's table:

| constant | used in | table · key | provenance |
|---|---|---|---|
| S7c row weights and gains; eligibility shares (water, wall 0.2; slope 8 %; `landmarkSigma` `character.anchorSigma`) | V01 §3.3.2, §3.3.3 | `hood.templates` · `select.*`, `requires.*` | `own`, calibrate at M5 (non-bent share 15–35 % at CITY; S4 (b)) |
| standalone `auto` odds 0.7 / 0.3 / 0.1 / 0.1 | V01 §3.3.5 | `hood.templates` · `select.ngOdds` | `ref:NG 1.2.2 random template weights (code)` |
| ring radii law (one factor per district), `ringJitter` 0.15, `ringPasses` 3 | V01 §3.4.4, II.2 | `hood.templates` · `params` | `ref:NG 1.2.2 ring courses (code)` (II.2, item 543) |
| series spacing `2 × dBar + w_tpl` (range `1.5–3 × dBar + w_tpl`) | V01 §3.4.3 | `hood.templates` · the `stepped` row's `params.terraceSpacingM` | `own` (hill-town practice: two plot rows and a street to a terrace) |
| plaza aligned to the face's OBB | V01 §3.4.5 | — (a rule, no value) | `own` (J-V1.5) |
| square quota rows, kind factors | V01 §3.5.2 | `squares.quota` (base) | `own`, target S4 (d) 0.03–0.15, median 0.08 (§13.7) |
| `manorBlockShare` rows | V01 §3.5.2 | `hood.dispatch` · `manorBlockShare` | `own`, anchored on NG's 6–11 % |
| small-block weights, `yardPaved` | V01 §3.5.6, §3.5.10 | `hood.dispatch` · `small`, `yardPaved` | `own`, calibrate at M5 on the NG pairs |
| court-greening rows | V01 §3.5.7 | §4.9's table (item 313) · the court-greening row | `own`, anchored on NG's 23–58 % (item 58 (b)) |
| `way.surface` rows | V01 §3.7.3 | `way.surface` | `own` |
| hood-pin rows | V01 §3.8.2 | `hood.pins` | `own`; decay ÷ 10 `ref:NG 1.2.2 pin decay (code)`, P20 |
| `hood.kinds` rows, area bands, outline weights | V01 §3.10.1 | `hood.kinds` | `own` |
| default cuts `c → 0.1 + 0.75 c`; the six-band row | V01 §3.10.1 | `hood.defaultCuts` | `own` |
| place knowledge defaults | V01 §3.7.1 | `hood.placeKnowledge` | `own` |
| `star` (vertex count and angle laws, aspect `0.4 + 0.6 u`, ± 45° at 0.3), `star_round`, `street_strip`, `plaza_frame` | V01 §3.10.2 | the outline rows (§4.2 S1 (2), item 285) | `ref:NG 1.2.2 hood outline (code)` |

**The columns of `hood.constants`** (J-V1.99). The table is one row, key `settings`, in volume 11's settings form (V11
§2.1): each key below is a column, its dotted name the key the rules cite, with the `ColumnSpec` this table gives — its
`unit` and `calibratable` reach the compiled cell (V11 §2.2), its `range` clamps an edit (V11 §2.1), and
`extensionAllowed` is true exactly where the marker column names a mode. Each calibratable column takes its own register
entry `cal.hood.constants.*.<key>` (V12 §3.11; V01 §8.1). Angle columns hold centidegrees (`cdeg`, §2.1) — a key's `Deg`
suffix names the quantity and the table gives degrees; `Pct` columns hold percent (`none`). **Marker**: `weight` or
`option` — a switch cell (V01 §2.2), `extension` with that mode, 0 or off in the `MFCG` and `FTG` presets; `—` — a
geometry cell, read at its value in every preset. **`NG`**: the column's `presets.NG` entry (V01 §3.15); `—` — none, the
cell resolving under `NG` as under `MFCG`. Provenance `own` unless the row names another.

| column(s) | used in | default | type · unit | range | calibratable | marker | `NG` | provenance |
|---|---|---|---|---|---|---|---|---|
| `fabric.extensionWeight` — the stage-2 switch | V01 §3.3.3, §3.15 | 1 | number · `weight` | [0, 1] | no | `weight` | 1 (`own`; `fixed: the NG preset runs stage 2 (V01 §3.15)`) | `own` |
| `ng.fabric`, `ng.squares`, `ng.manors`, `ng.smallBlocks`, `ng.greens`, `ng.courts`, `ng.pins`, `ng.plazaByTag` — NG's rule switches | V01 §3.15 | off | bool · `none` | — | no | — | on (`ref:NG 1.2.2 ⟨the rule's behaviour⟩ (code)`, V01 §3.15's reference column) | `own` |
| `ng.plazaM2` — the plaza areas by size tag (small, medium, large), read wherever `ng.plazaByTag` is on | V01 §3.15 | 450, 1 800, 7 200 | list · `m2` | [100, 20 000] each | yes | — | — | `own`, calibrate at M5 on the NG pairs by T-V1-31's plaza share |
| `auto.contextFactor` | V01 §3.3.5 | 0.7 | number · `share` | [0, 1] | yes | `weight` | — | `own` |
| `elig.ringELo`, `elig.plazaFaceMult`, `elig.spineEHi`, `elig.runEHi` | V01 §3.3.2 | 2.5, 6, 3, 3 | number · `none` (multiples of `eLo`, of the plaza's area, of `eHi`) | [1, 5], [2, 12], [1.5, 6], [1.5, 6] | yes | — | — | `own` |
| `elig.crossAngleDeg`, `fan.sepDeg`, `hood.edgeDeg` | V01 §3.3.2, §3.4.2 (a), §3.4.6, §3.10.1 | 45°, 45°, 60° | number · `cdeg` | [30°, 90°] each | yes | — | — | `own` |
| `anchor.spanShare`, `tpl.widthLow`, `tpl.crossDelta` | V01 §3.4.2 (a)–(b), §3.4.3 | 0.7, 0.8, 0.05 | number · `share` | [0.3, 1], [0.5, 1], [0, 0.15] | yes | — | — | `own`; `tpl.widthLow`'s per-map template width idea `ref:NG 1.2.2 template widths (code)` (II.2) |
| `tpl.courseDelta`; `tpl.segMin`, `tpl.segSpan` | V01 §3.4.3 (δ ± 0.15, 3–7 segments, ½-segment jitter, passes 4 − ⌊n/2⌋) | 0.15; 3, 4 | number · `share`; integer · `none` | [0, 0.3]; [2, 6], [0, 6] | no (`ref:NG` code values) | — | — | `ref:NG 1.2.2 main street course (code)`, in metres |
| `tpl.arrivalDeg` | V01 §3.4.3, §3.4.4 | 85°–95° | range · `cdeg` | [60°, 120°] | yes | — | — | `own` |
| `ring.insetELo`; `ring.portalGapM` | V01 §3.4.4 (the fit inset `eLo + w_tpl / 2`; the portal gap `max(6 m, 2 × lane width)`) | 1 (× `eLo`); 6 m | number · `none`; number · `m` | [1, 2]; [4, 12] | yes | — | — | `own` (§4.6 step 7's law on rings) |
| `land.spineFactor`; `land.ringSlack`, `land.smallShare` | V01 §3.3.7, §3.5.9 | 1.15; 0.10, 0.12 | number · `none`; number · `share` | [1, 1.5]; [0, 0.3], [0, 0.4] | yes | — | — | `own`, calibrate at M5 (T-V1-12); the small share measured at M5 |
| `plaza.aspectMin`, `sq.smallDiv` | V01 §3.4.5 (aspect `1 + bell4` above 1.2), §3.5.3 (`smallBlockM2 = eLo² / 2`) | 1.2, 2 | number · `none` | [1, 2], [1, 4] | no (`ref:NG` code values) | — | — | `ref:NG 1.2.2 square plaza (code)`; `ref:NG 1.2.2 small-block rule (code)`, restated on our extents |
| `plaza.voidRadius`; `park.minM2`; `park.maxShareOfFace` | V01 §3.4.5 | 1.2; 3 000 m²; 0.4 | number · `none`; `m2`; `share` | [0.8, 2]; [1 000, 10 000]; [0.1, 0.8] | yes | — | — | `own`; the park floor §4.9's 0.3 ha |
| `sq.forecourtM`, `sq.bridgeM`; `sq.maxM2`; `sq.overTake`, `dispatch.overQuota` | V01 §3.5.3, §3.5.6 | 60 m, 40 m; 5 000 m²; 1.5, 1.5 | number · `m`; `m2`; `none` | [20, 120], [10, 80]; [1 000, 10 000]; [1, 3] each | yes | — | — | `own` |
| `green.maxMedian`, `green.spacingEHi`, `green.leafyCourt` | V01 §3.5.4, §3.5.7 | 1.5, 2, 1.5 | number · `none` | [0.5, 3], [1, 5], [1, 3] | yes | — | — | `own` |
| `manor.fitLow`, `manor.fitHigh`, `manor.spacingEHi` | V01 §3.5.5 | 1.0, 3.0, 2 | number · `none` | [0.5, 2], [1.5, 5], [1, 5] | yes | — | — | `own`; the spacing idea `ref:NG 1.2.2 manor spacing (code)` |
| `manor.sunWeight` | V01 §3.5.5 | 0.5 | number · `weight` | [0, 1] | yes | `weight` | — | `own`; item 102 (d) |
| `guard.softShare`; `guard.bands` | V01 §3.5.8 | 0.3; 1 | number · `share`; integer · `none` | [0, 1]; [0, 3] | yes; no | — | — | `own` |
| `feature.runM`, `name.landmarkM` | V01 §3.6, §3.7.2 | 60 m, 50 m | number · `m` | [20, 150], [10, 150] | yes | — | — | `own` |
| `name.tradeShare`, `name.curvedShare`; `name.bentDeg` | V01 §3.7.2 | 0.3, 0.3; 15° | number · `share`; `cdeg` | [0, 1] each; [5°, 45°] | yes | — | — | `own` |
| `terrace.askGain` | V01 §3.3.3 | 1 | number · `weight` | [0, 3] | yes | `weight` | — | `own`, calibrate at M5 (T-V1-50) |
| `terrace.siteShare`, `terrace.minGapShare` | V01 §2.3, §3.4.3 | 0.3, 0.6 | number · `share` | [0, 1], [0.3, 0.9] | yes | — (thresholds: `asks` is inert wherever `terrace.askGain` is 0 and volume 11's `terrace.enabled` off; J-V1.99) | — | `own`, calibrate at M5 (T-V1-50) |
| `terrace.maxLevels`; `terrace.profileNoticeCm` | V01 §3.4.3 (per flank); §3.9, §3.11 (7) | 15; 50 cm | integer · `none`; number · `cm` | [4, 31]; [10, 200] | no (a work limit); yes | — | — | `own` |
| `raised.stripMarginM`, `raised.clearWidthM`; `raised.squareDeg` | V01 §3.17.3 (strip margin; arch clear width + 1 m; ± 30° of square) | 1 m, 1 m; 30° | number · `m`; `cdeg` | [0, 3] each; [10°, 45°] | yes | — | — | `own` |
| `landmark.maxRings` | V01 §3.4.4 | 2 | integer · `none` | [1, 4] | no | `option` — the precinct multi-ring; its off value 1 is its `presets.MFCG` and `presets.FTG` entry (`own`; `fixed: the parity off value`) | — | `own` |
| `landmark.roundTol` | V01 §3.4.4 | 0.9 | number · `share` | [0.7, 1] | yes | — | — | `own` |
| `hood.hillsidePct`; `hood.hillsideMaxPct` | V01 §3.10.1, §4.1 | 20; 60 | number · `none` (percent) | [0, 60]; [20, 100] | yes; no | `weight` (the hillside default: a hood is flat under the parity presets and `NG`); — | — | `own` |
| `court.nameMinM2`, `pin.siteMinM2` | V01 §3.7.1, §3.8.2 | 200 m², 30 m² | number · `m2` | [50, 1 000], [5, 200] | yes | — | — | `own` |
| `pin.cap`, `pin.courtFactor`; `pin.edgeInsetM` | V01 §3.8.2 | 0.6, 0.2; 3 m | number · `share`; `m` | [0, 1] each; [0, 10] | yes | — | — | `own` (the court factor from NG C6's density) |
| `pin.decayScope` | V01 §3.8.2 | `'block'` | enum · `none` (`block`, `district`) | — | no | — (a categorical cell: `presets.MFCG` and `presets.FTG` `'block'`, `own`, `fixed: the parity value`, as §7.6 requires of one) | `'district'` (`ref:NG 1.2.2 pin decay (code)`, P20) | `own` |
| `access.<accessSymbolKind>M` — twelve columns, one per `AccessSymbolKind` value (V01 §3.8.8); the column set is held by T-V1-4's registry test (set equality with the enum), not by a `TotalityRule` — a `coversEnum` checks one column's values across a table's rows, and this is one settings row (V11 §2.1); V01 §3.8.8's kind list and these columns change together in one change | V01 §3.8.8, §5.1.2 | `stair` 2.5, `ladder` 1.2, `hatch` 1.2, `shaft` 1.5, `well` 1.6, `cellar_stair` 1.5, `grating` 1.0, `mouth` 3.0, `sinkhole` 4.0, `collapsed_shaft` 3.0, `ruin_entrance` 3.0, `catacomb` 2.5 (m) | number · `m` | [0.5, 8] each | no (drawing sizes) | — | — | `own` |
| `closeup.chunkKB` | V01 §3.8.3 | 32 | integer · `none` (KiB) | [8, 128] | no (an engineering budget) | — | — | `own` |
| `size.small`, `size.medium`, `size.large` | V01 §3.10.1, §3.15 | 85, 700, 1 050 | integer · `none` (buildings) | [20, 3 000] each | no (NG's measured bands) | — | — | NG's size bands (`docs/confidence/ng.md` C8) |
| `hood.frameMargin`, `hood.starRadiusFloor`, `sky.plotShare` | V01 §3.10.1, §3.10.2, §3.16 | 0.3, 0.35, 0.62 | number · `share` | [0.1, 1], [0.2, 0.6], [0.3, 0.9] | yes | — | — | `own`; `sky.plotShare`'s default the base's dense-core plot share (0.62, §4.2 S2) |

### 3.15 The `NG` preset — Neighbourhood's own rules (item 23; J-V1.98)

Emulation first: the reference that owns the close-up is Neighbourhood, so stage 2 carries an **`NG`** parity preset
whose entries select NG 1.2.2's own rules where NG has them (each `ref:NG 1.2.2 … (code)`, `code-neighbourhood.md`
§2.0–§2.8, mechanisms restated in our words and metres). T-V1-31 and T-V1-32 run under `NG`; the default preset keeps this
volume's rules as declared extensions, which T-V1-32 shows the owner beside the NG pairs, unrated. In §7.6's terms (item
584; J-V1.98):
* **Kind** — a zeroing parity preset beside `MFCG`, `FTG` and `VG` (§7.6): one more zeroing `PresetId` (V11 §2.2), and so
  one more `PresetArm` (V12 §2.1).
* **Resolution** — a cell resolves under `NG` to its own `presets.NG` entry, else to what it resolves to under `MFCG`:
  its `presets.MFCG` entry, else 0 or off for an `extension` switch cell, else its default (§7.6's order). So the base
  under `NG` is the base under `MFCG` — Neighbourhood's `area` fabric is the measured bent cut MFCG's code shares (II.2)
  — and no base table needs an `NG` entry; this volume's geometry cells, unmarked (V01 §2.2), keep their values (the
  templates' seed laws are already NG's), and its switch cells take `MFCG`'s off values unless the table below gives an
  entry.
* **Where the entries stand** — on `hood.constants` alone (V01 §3.14's column table): the stage-2 switch
  `fabric.extensionWeight`, the eight rule switches `ng.*` and `pin.decayScope`; never on another `hood.*` table, on
  `squares.quota`, on `way.surface` or on a base table's row (§4.9's court-greening row reads `ng.courts` instead). The
  schema requires an `NG` entry on no cell — every categorical cell already holds its `MFCG` entry (§7.6), which `NG`
  falls back to — and `pin.decayScope` carries one because NG's value differs.
* **The stage-2 switch** — `fabric.extensionWeight` (`weight`: 1 by default, 0 in `MFCG` and `FTG` by §7.6's zeroing, 1
  under `NG` by its entry) weights S7c's template rows (V01 §3.3.3), and S9b (V01 §3.5), its land in the programme
  (V01 §3.5.9: `λ_b` 0), the local-place step (V01 §3.7.1) and the hood-pin derivation (V01 §3.8.2) run only while it is
  > 0 — the `extension` marker of this volume's steps, which T-V1-4's registry test reads.
* **The switch's edit** (J-V1.101) — an `editTable` or `editPreset` that changes the resolved `fabric.extensionWeight`
  re-derives from the switch's first reader stage, S2, whose land estimate reads `λ_b` (V01 §3.5.9) — the first-reader
  re-derivation of V01 §2.7's `hood.constants` row, never §7.6's slice invalidation, for every change of the value (a
  change inside (0, 1] moves only S7c's weights, and the re-derivation reproduces the rest). The re-derivation uses
  §6.3's carry-over, with its fates in the dry run (V01 §2.7's `hood.constants` row; §7.6) and the confirmed fates
  stored in the event (§7.1). S7c's weights, S9b, the local-place step and the hood pins run, or do not, under the new
  value. What they made before and do not make again — template seeds and the ways they laid, typed blocks, places, pins
  — is retired by the carry-over, each a listed fate; a retired place's name goes to the archive with its tombstone
  (V01 §2.7). The held inputs stay (§7.2; V01 §3.5.12's fixed inputs): the switch gates what stage 2 *derives*, never
  what the author declared, so a declared `fabric` or `terrace`, a `setAttr` on a block's content and a place made by
  hand whose host still stands (V01 §2.7) are kept at 0 as at 1; the `Block.overrides` rows stay in their leaves, dormant
  while the switch is 0 — the close-up derives no pins then, so no row is applied, orphaned or reported — and resolve by
  V01 §3.8.5 again when it rises (a superseded block's rows moving to its successor as ever); the `CloseupRecord`s stay,
  and every close-up chunk is stale by its digest (V01 §3.8.3, §3.8.4). The underground tail runs after the ground, its
  T6 running the opening pass under the new gate (V04 §3.10; J-V4.121): raised above 0, the opening places made; lowered
  to 0, none made and the old ones retired by the carry-over; the underground consequences of any change of the value are
  V04 §4.3's switch row (inside (0, 1] its re-cut plots take the ground-edit row's). The edit's scope for the oracle is
  V01 §4.3's switch bullet; its cost §12.6's Re-derive-from-Sk line (V01 §6). The edit's undo restores the document as it
  stood (§7.4's `editTable` / `editPreset` row).
* **Scope** — read by B-REF's NG rows (T-V1-31, arm `preset: 'NG'`) and the M5 panel's NG pairs (T-V1-32; §13.6 (2))
  only: stage 2's parity setting, as `FM` is stage 3's.
* **Provenance and the register** — every `NG` entry is a reference value read in NG's code (`ref:NG 1.2.2 ⟨behaviour⟩
  (code)`, with its P-id where it has one), which V12 §3.11's lint passes with no register entry, or the switch's on
  value (`own`, note `fixed: the NG preset runs stage 2 (V01 §3.15)`), no provisional number either; so no `NG` entry
  takes a register entry and no id `…@NG` exists on this volume's account. The one metre reading `NG` needs — the plaza
  areas by size tag, since NG's unit-to-metre scale is HOLD (J-A58.43) — is no `NG` entry but the default-column cell
  `ng.plazaM2`, read wherever `ng.plazaByTag` is on: its register entry is the default line's (V01 §8.1), and W17 tunes
  it on the NG pairs before M5's exit to T-V1-31's scale-free plaza share (J-V1.97; *fallback*: where §13.5's NG rows
  carry no plaza share, that clause reads `notApplicable` and `ng.plazaM2` keeps its value, reported). The hood pins keep
  the rows' own `sizeM` under `NG` (T-V1-26 their draw-style bar).

| subject | the rule under `NG` | its `NG` entry | reference |
|---|---|---|---|
| stage 2 | S7c, the seed primitives, S9b, the local-place step and the hood pins run, each by the rows below | `fabric.extensionWeight` 1 | — |
| fabric (S7c, in town and standalone) | the four NG rows at their `select.ngOdds`, each kept only when eligible, in place of V01 §3.3.3's product; the seven context rows 0 | `ng.fabric` on | random template weights |
| typed squares | none: S9b types no square (the base's S3, S7 and S7b squares stand); `sq_b` 0 in V01 §3.5.9's `λ_b` | `ng.squares` on | the dispatch (§2.5) |
| manors | count `⌊1 + u × (⌊B ÷ 8⌋ − 1)⌋` over D's `B` candidate blocks (0 below 8 blocks; 0 when `secular`); weight 0 below the compound's minimum plot area, else `1 ÷ (block area × its OBB area)` (the smallest eligible blocks favoured); after each pick every remaining weight × its distance to the picked block — in place of V01 §3.5.5's quota and weights | `ng.manors` on | the manor count and choice |
| small blocks | every candidate of area ≤ `smallBlockM2` typed `yard` (NG's empty blocks); a yard paved with probability `area ÷ OBB area`, else grassed with a grove at the tree coverage; `yd_b` = `land.smallShare` in `λ_b` | `ng.smallBlocks` on | the empty-block rule |
| greens | only at a ring's centre (the centre rule's equal odds); no sub-block green quota; `gr_b` 0 in `λ_b` | `ng.greens` on | the ring centre |
| court greening | a court greened exactly when its block's frontage ring is complete (every plot fronts a way), in place of §4.9's court-greening row's band probability | `ng.courts` on | the court green (item 58 (b)'s anchor) |
| hood pins | only on `yardBlock` sites, one per yard block — the block's midline at half its short side from one end (a coin for the end) — one weighted pick among {none (a plain yard) 1, well 1, large tree at the tree coverage, fountain 1}, the district the decay's scope (each picked kind's weight ÷ 10 for the rest of the district), the pin placed with probability `(area ÷ OBB area)³`; each pin at its row's `sizeM` | `ng.pins` on; `pin.decayScope` `'district'` (P20) | the empty block's pin |
| plaza size | by the size tag — small, medium, large at the side ratio 1 : 2 : 4, areas `ng.plazaM2` in place of V01 §3.4.5 (a)'s law; a standalone hood's tag its size chip, an in-town district's the chip whose `size.*` count lies nearest its allocated household count (a building per household at NG's scale — S8 lays the plaza before any building exists) | `ng.plazaByTag` on | the plaza size by tag |
| item 110's neighbourhood rows (the series flag, `terrace.askGain`, the precinct multi-ring, the hillside default, the flatter-square tie-break) | off — the context rows are 0, S9b types no square and a hood is flat; these switch cells and the base's item-110 rows take `MFCG`'s off values (T-V1-4) | none | — |
| everything else | the base's rules and this volume's geometry, each cell as `MFCG` resolves it | none | — |

### 3.16 Services other volumes call (`@plat/hood`)

Pure, draw-free functions of committed state, memoised per commit, each ≤ 1 ms per call at CITY (V01 §6):
* **`catchmentOf(plot, unit, per?)`** — the plots in a plot's catchment for item 103 (f)'s coverage (V11's
  `CoverageSpec.unit`): **`district` and `neighbourhood` are one unit, the district a close-up opens** (J-V1.35) — the
  plots of the plot's district; `walk` — the plots whose front points lie within `per` metres of the plot's front point
  along the way graph (L1 spines and L2 corridors — part 0, each raised road one edge between its ends, never an
  aqueduct; V01 §2.3); `households` — the plots of the nearest `per` households by the same metric (ties by plot id);
  `settlement` — every plot of the town; `parish` — the plots whose nearest parish-church member (by the same metric) is
  the same member, or, before one is placed, the district. **On the other arenas**: for a plot on an underground arena,
  `walk` and `households` read volume 4's `underDistance` (V04 §3.6a (1)) in place of the way-graph metric, and each
  undercity neighbourhood and the underground pseudo-district (the sewer-front neighbourhoods and F6's void dwellings)
  is its own `district` unit (V04 §3.6a (5)); on a sky arena the island is one `walk` unit (V05 §3.5 (3): the route to
  the ground passes every walking radius), its districts its `district` units. A plot with no way within `per`
  (`walk`) or fewer than `per` households in its arena (`households`) has every plot it can reach as its catchment, and
  always itself. Callers: S10a / S10b's coverage term (V11's `cov/<class>` rows, the base solver), volume 10's
  explanations, volume 9's coverage view.
* **`districtsAbove(part, element)`** — the area overlap of an underground element's projected footprint with each
  surface district, shares descending, ties by district address; an element whose footprint lies under no district (the
  hinterland, water) returns the empty list. **An undercity neighbourhood's `parent`** is II.7.5 (2)'s — the surface
  district above the largest share of its main chamber in plan, ties by address — computed as the first entry of
  `districtsAbove(part, District.core)` (II.7.5 (2)'s one rule; this volume states no rule of its own); volume 4's U-CITY
  C5 writes it through this call. `DistrictContext.under` is this service's inverse for D. Callers: volume 4 (C5's
  parent), V11's `naming.ruin` rows ("the ruins under the old quarter"), volume 10, volume 9's voids view.
* **`fabricSignature(region)`** (J-V1.78) — the town side of volume 12's paired measures over a region
  (`FabricSignature`, V01 §2.3), each computed by V12 §3.4's definition, `null` where V12 reads `notApplicable` (a region
  with no built block or no part-0 way). V04 §3.5.0a (7) calls it with a ruin's outline and tests the ruin's plan
  against it by V12 §3.6b's `paired` margins, and V11's culture rows read it likewise (J-V11.30); the test and its
  margins are theirs, cited, never restated — template fabrics are measured like any (a ring over a radial citadel, a
  main street over a grid).
* **`skyDistrictCount(plotLandM2, districtHa)`** — `clamp(⌈plotLandM2 ÷ (sky.plotShare × districtHa × 10 000)⌉, 1, 3)`,
  `plotLandM2` in m², `districtHa` in hectares, `sky.plotShare` the `hood.constants` cell (V01 §3.14): the one count of a
  sky island's districts; `plotLandM2` 0 gives 1. Callers: the unit runner (V01 §3.10.3 (2)), volume 5's unit inputs (V05
  §2.3) and its coverage units (V05 §3.5 (3)'s k), each through this call, never a copy of the formula; volume 5's fill
  and coverage overshoot read the same `sky.plotShare` cell (V05 §3.5 (2)–(3)), not the count.

One **writer** other volumes call: **`plantRimWalk(doc, island)`** — the rim walk's one planting (V01 §3.10.3 step 4): it
writes the island's `esplanade` and `street_trees` pair into the calling commit's batch, a function of the committed rim
strip and §4.9's street-tree row, draw-free, ≤ 0.2 ms per call (V01 §6). Callers: the unit runner (V01 §3.10.3 step 4)
and volume 5's resize and rim reshape (V05 §4.2), each once per event; never a district's S12b.

